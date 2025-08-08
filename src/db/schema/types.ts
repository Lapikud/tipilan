// Roles enum equivalent
export const RoleEnum = {
  VISITOR: "VISITOR",
  PARTICIPANT: "PARTICIPANT",
  TEAMMATE: "TEAMMATE",
  CAPTAIN: "CAPTAIN",
  ADMIN: "ADMIN",
} as const;

export type Role = (typeof RoleEnum)[keyof typeof RoleEnum];
