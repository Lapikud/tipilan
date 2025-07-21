import {
  sqliteTable,
  text,
  integer,
  primaryKey,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

// Roles enum equivalent
export const RoleEnum = {
  VISITOR: "VISITOR",
  PARTICIPANT: "PARTICIPANT",
  TEAMMATE: "TEAMMATE",
  CAPTAIN: "CAPTAIN",
  ADMIN: "ADMIN",
} as const;

export type Role = (typeof RoleEnum)[keyof typeof RoleEnum];

// User table
export const users = sqliteTable("user", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => createId()),
  email: text("email").notNull(),
  steamId: text("steam_id").unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  ticketId: text("ticket_id").unique(),
  ticketType: text("ticket_type"),
});

// Team table
export const teams = sqliteTable("team", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => createId()),
  name: text("name").notNull(),
});

// Member table (join table for User and Team with role)
export const members = sqliteTable(
  "member",
  {
    id: text("id")
      .primaryKey()
      .notNull()
      .$defaultFn(() => createId()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    teamId: text("team_id").references(() => teams.id, { onDelete: "cascade" }),
    role: text("role", {
      enum: Object.values(RoleEnum) as [string, ...string[]],
    }).notNull(),
  },
  (table) => {
    return {
      userTeamUnique: uniqueIndex("user_team_unique").on(
        table.userId,
        table.teamId,
      ),
    };
  },
);

// Tournament table
export const tournaments = sqliteTable("tournament", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => createId()),
  name: text("name").notNull(),
});

// TournamentTeam join table
export const tournamentTeams = sqliteTable(
  "tournament_team",
  {
    id: text("id")
      .primaryKey()
      .notNull()
      .$defaultFn(() => createId()),
    tournamentId: text("tournament_id")
      .notNull()
      .references(() => tournaments.id, { onDelete: "cascade" }),
    teamId: text("team_id")
      .notNull()
      .references(() => teams.id, { onDelete: "cascade" }),
    registrationDate: integer("registration_date", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (table) => {
    return {
      tournamentTeamUnique: uniqueIndex("tournament_team_unique").on(
        table.tournamentId,
        table.teamId,
      ),
    };
  },
);

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  members: many(members),
}));

export const teamsRelations = relations(teams, ({ many }) => ({
  members: many(members),
  tournamentTeams: many(tournamentTeams),
}));

export const membersRelations = relations(members, ({ one }) => ({
  user: one(users, { fields: [members.userId], references: [users.id] }),
  team: one(teams, { fields: [members.teamId], references: [teams.id] }),
}));

export const tournamentsRelations = relations(tournaments, ({ many }) => ({
  tournamentTeams: many(tournamentTeams),
}));

export const tournamentTeamsRelations = relations(
  tournamentTeams,
  ({ one }) => ({
    tournament: one(tournaments, {
      fields: [tournamentTeams.tournamentId],
      references: [tournaments.id],
    }),
    team: one(teams, {
      fields: [tournamentTeams.teamId],
      references: [teams.id],
    }),
  }),
);
