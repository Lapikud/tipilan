import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema/schema.ts",
  out: "./migrations",
  dialect: "sqlite",
  dbCredentials: {
    url: "data/tipilan.db",
  },
});
