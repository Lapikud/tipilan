import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";

// User table
export const users = sqliteTable("user", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => createId()),
  email: text("email").notNull(),

  // Other information
  steamId: text("steam_id"),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  ticketId: text("ticket_id").unique(),
  ticketType: text("ticket_type"),
});
