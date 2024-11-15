import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { Bindings } from "../../bindings";
import { stringToDate } from "../../utils/date";
import { insertHolidays } from "../../db/client";

const app = new Hono<{ Bindings: Bindings }>();

app.post("/", async (c) => {
  const response = await fetch(
    "https://www8.cao.go.jp/chosei/shukujitsu/syukujitsu.csv"
  );
  const buffer = await response.arrayBuffer();
  const decoder = new TextDecoder("shift-jis");
  const csv = decoder.decode(buffer);

  await insertHolidays(
    drizzle(c.env.DB),
    csv
      .split("\n")
      .slice(1)
      .filter((row) => row.trim() !== "")
      .map((row) => {
        const [date, name] = row.split(",");
        return {
          date: stringToDate(date),
          name: name.trim(),
        };
      })
  );

  return c.text("登録が完了しました", 201);
});

export default app;
