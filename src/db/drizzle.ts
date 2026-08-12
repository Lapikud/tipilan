import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import * as schema from "./schema/schema";

let database: any = null;

function getDatabase() {
	if (!database) {
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
