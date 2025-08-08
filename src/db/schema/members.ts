import { sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";
import { users } from "./users";
import { teams } from "./teams";
import { RoleEnum } from "./types";

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
