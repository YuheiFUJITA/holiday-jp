import { int, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const holiday = sqliteTable("holiday", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  date: integer("date", { mode: "timestamp" }).unique().notNull(),
  name: text("name").notNull(),
});
