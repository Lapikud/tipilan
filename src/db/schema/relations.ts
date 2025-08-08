import { relations } from "drizzle-orm";
import { users } from "./users";
import { teams } from "./teams";
import { members } from "./members";
import { tournaments, tournamentTeams } from "./tournaments";

// User relations
export const usersRelations = relations(users, ({ many }) => ({
  members: many(members),
}));

// Team relations
export const teamsRelations = relations(teams, ({ many }) => ({
  members: many(members),
  tournamentTeams: many(tournamentTeams),
}));

// Member relations
export const membersRelations = relations(members, ({ one }) => ({
  user: one(users, { fields: [members.userId], references: [users.id] }),
  team: one(teams, { fields: [members.teamId], references: [teams.id] }),
}));

// Tournament relations
export const tournamentsRelations = relations(tournaments, ({ many }) => ({
  tournamentTeams: many(tournamentTeams),
}));

// Tournament team relations
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
