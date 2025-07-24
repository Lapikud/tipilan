import type { InferSelectModel } from "drizzle-orm";
import { users, teams, members } from "@/db/schema";

// Base types from schema
export type User = InferSelectModel<typeof users>;
export type Team = InferSelectModel<typeof teams>;
export type Member = InferSelectModel<typeof members>;

// Extended types for queries with relations
export type TeamWithMembers = Team & {
  members: (Member & {
    user: User;
  })[];
};

export type MemberWithUser = Member & {
  user: User;
};

export type UserWithMembers = User & {
  members: Member[];
};
