import {
  sqliteTable,
  text,
  integer,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

import { createId } from "@paralleldrive/cuid2";
import { teams } from "./teams";

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
