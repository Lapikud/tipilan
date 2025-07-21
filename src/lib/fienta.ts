import { db } from "@/db/drizzle";
import { users, teams, members, tournamentTeams } from "@/db/schema";
import { eq, and, isNull } from "drizzle-orm";
import { RoleEnum, type Role } from "@/db/schema";

// Types based on the Fienta API response
export interface FientaApiResponse {
  success: {
    code: number;
    user_message: string;
    internal_message: string;
  };
  time: {
    timestamp: number;
    date: string;
    time: string;
    full_datetime: string;
    timezone: string;
    timezone_short: string;
    gmt: string;
  };
  count: number;
  tickets: FientaTicket[];
}

export interface FientaTicket {
  id: number;
  organizer_id: number;
  event_id: number;
  order_id: number;
  code: string;
  status: string;
  used_at: string | null;
  created_at: string;
  updated_at: string;
  validated_by_id: number | null;
  ip: string;
  is_parent: boolean;
  parent_id: number | null;
  order_email: string;
  order_phone: string;
  contents_html: string;
  nametag_html: string;
  qty: number;
  permissions: {
    update: boolean;
  };
  rows: FientaTicketRow[];
}

export interface FientaTicketRow {
  ticket_type: {
    id: number;
    title: string;
    attendance_mode: string;
  };
  attendee: {
    first_name: string;
    last_name: string;
    full_name: string;
    email: string;
    [key: string]: string; // To handle dynamic field names
  };
}

/**
 * Fetches tickets from the Fienta API for a specific event
 */
export async function fetchFientaTickets(
  eventId: string,
  apiKey: string,
): Promise<FientaApiResponse> {
  const response = await fetch(
    `https://fienta.com/api/v1/events/${eventId}/tickets/?attendees`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch tickets: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Extracts Steam ID from a Steam profile URL
 */
export function extractSteamId(steamUrl: string): string | null {
  if (!steamUrl) return null;

  // Use regex to handle both escaped and unescaped URLs, with or without trailing slash
  const regex = /(?:\/|\\\/)(id|profiles)\/([^\/\\]+)(?:\/|\\"\/)?$/;
  const match = steamUrl.match(regex);

  // Return the matched ID or null if no match
  return match && match[2] ? match[2] : null;
}

/**
 * Finds an attendee field by prefix in the attendee data
 * Fienta's API can return custom form fields with dynamic names
 */
function findAttendeeFieldByPrefix(
  attendee: { [key: string]: string },
  prefix: string,
): string | null {
  // Find the first field that starts with the given prefix
  const fieldKey = Object.keys(attendee).find((key) => key.startsWith(prefix));

  // Return the value if found, or null otherwise
  return fieldKey ? attendee[fieldKey] : null;
}

/**
 * Determines the appropriate user role based on ticket type and captain status
 */
function determineUserRole(
  ticketType: string,
  isCaptain: boolean,
  isTeamMember: boolean,
): Role {
  // Case-insensitive check for tournament participants
  const isTournamentParticipant = ticketType
    .toLowerCase()
    .includes("põhiturniiri osaleja");

  const isParticipant = ticketType.toLowerCase().includes("arvutiga osaleja");

  if (!isTeamMember && isParticipant) {
    return RoleEnum.PARTICIPANT;
  }

  if (isTournamentParticipant) {
    if (isCaptain) {
      return RoleEnum.CAPTAIN;
    } else if (isTeamMember) {
      return RoleEnum.TEAMMATE;
    }
    return RoleEnum.PARTICIPANT;
  }

  return RoleEnum.VISITOR;
}

/**
 * Upserts a user in the database (create or update)
 */
async function upsertUser(userData: {
  email: string;
  firstName: string;
  lastName: string;
  steamId: string | null;
  ticketId: string;
  ticketType: string;
}) {
  // Try to find existing user by ticket ID (primary unique identifier)
  const existingUser = await db.query.users.findFirst({
    where: eq(users.ticketId, userData.ticketId),
  });

  if (existingUser) {
    // Update existing user
    await db
      .update(users)
      .set({
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        steamId: userData.steamId,
        ticketType: userData.ticketType,
      })
      .where(eq(users.id, existingUser.id));

    return existingUser;
  } else {
    // Create new user
    const [newUser] = await db.insert(users).values(userData).returning();
    return newUser;
  }
}

/**
 * Upserts a team member relationship
 */
async function upsertMember(userId: string, teamId: string | null, role: Role) {
  // Try to find existing member
  const whereCondition = teamId
    ? and(eq(members.userId, userId), eq(members.teamId, teamId))
    : and(eq(members.userId, userId), isNull(members.teamId));

  const existingMember = await db.query.members.findFirst({
    where: whereCondition,
  });

  if (existingMember) {
    // Update existing member
    await db
      .update(members)
      .set({ role })
      .where(eq(members.id, existingMember.id));
  } else {
    // Create new member
    await db.insert(members).values({
      userId,
      teamId,
      role,
    });
  }
}

/**
 * Processes tickets from Fienta and updates the database
 */
export async function syncFientaTickets(
  tickets: FientaTicket[],
): Promise<void> {
  // Process each ticket to extract user and team information
  for (const ticket of tickets) {
    // Skip tickets with CANCELLED status or empty rows
    if (ticket.rows.length === 0 || ticket.status === "CANCELLED") continue;

    const ticketRow = ticket.rows[0];
    const attendee = ticketRow.attendee;
    const ticketType = ticketRow.ticket_type.title;

    // Extract data
    const email = attendee.email || ticket.order_email;
    const firstName = attendee.first_name;
    const lastName = attendee.last_name;
    const steamUrl = findAttendeeFieldByPrefix(attendee, "steam_konto_link");
    const teamName = findAttendeeFieldByPrefix(attendee, "tiimi_nimi");
    const captainName = findAttendeeFieldByPrefix(
      attendee,
      "tiimi_kapteni_nimi",
    );

    const steamId = steamUrl ? extractSteamId(steamUrl) : null;
    // Check if user is captain - captain name must exist and match user's name
    const isCaptain = captainName !== null && steamId === captainName;

    // Create or update user
    const user = await upsertUser({
      email,
      firstName,
      lastName,
      steamId,
      ticketId: ticket.code,
      ticketType,
    });

    // Handle team association if there is a team name
    if (teamName) {
      // Find the team by name first
      let team = await db.query.teams.findFirst({
        where: eq(teams.name, teamName),
      });

      // Create the team if it doesn't exist
      if (!team) {
        const [newTeam] = await db
          .insert(teams)
          .values({ name: teamName })
          .returning();
        team = newTeam;
      }

      // Determine appropriate role
      const role = determineUserRole(ticketType, isCaptain, true);

      // Create or update membership with appropriate role
      await upsertMember(user.id, team.id, role);
    } else {
      // For users without a team, handle membership without team association
      const role = determineUserRole(ticketType, false, false);
      await upsertMember(user.id, null, role);
    }
  }
}

/**
 * Main function to fetch and sync tickets from Fienta to the database
 */
export async function syncFientaEvent(
  eventId: string,
  apiKey: string,
): Promise<void> {
  try {
    const response = await fetchFientaTickets(eventId, apiKey);
    await syncFientaTickets(response.tickets);
  } catch (error) {
    console.error("Error syncing Fienta tickets:", error);
    throw error;
  }
}

/**
 * Gets teams with their members from the database
 */
export async function getTeamsWithMembers() {
  return await db.query.teams.findMany({
    with: {
      members: {
        with: {
          user: true,
        },
      },
    },
  });
}

/**
 * Gets a specific team with its members
 */
export async function getTeamWithMembers(teamId: string) {
  return await db.query.teams.findFirst({
    where: eq(teams.id, teamId),
    with: {
      members: {
        with: {
          user: true,
        },
      },
    },
  });
}

/**
 * Gets tournament teams with related data
 */
export async function getTournamentTeams(tournamentId: string) {
  return await db.query.tournamentTeams.findMany({
    where: eq(tournamentTeams.tournamentId, tournamentId),
    with: {
      team: {
        with: {
          members: {
            with: {
              user: true,
            },
          },
        },
      },
    },
  });
}
