import { createRequire } from "module";
import * as schema from "./schema/schema";

let database: any = null;

const require = createRequire(import.meta.url);

function getDatabase() {
	if (!database) {
		const { drizzle } = require("drizzle-orm/bun-sqlite") as typeof import("drizzle-orm/bun-sqlite");
		const { Database } = require("bun:sqlite") as typeof import("bun:sqlite");
		const sqlite = new Database("data/tipilan.db");
		database = drizzle(sqlite, { schema });
	}

	return database;
}

export const db: any = new Proxy({}, {
	get(_target, property, receiver) {
		const instance = getDatabase() as unknown as Record<PropertyKey, unknown>;
		const value = Reflect.get(instance, property, receiver);

		if (typeof value === "function") {
			return value.bind(instance);
		}

		return value;
	},
});
