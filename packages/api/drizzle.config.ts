import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  driver: "d1-http",
  dialect: "sqlite",
  dbCredentials: {
    wranglerConfigPath: "wrangler.toml",
    dbName: "holiday-jp",
  },
} satisfies Config;
