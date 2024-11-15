import { OpenAPIHono } from "@hono/zod-openapi";
import json from "./route/v1/holiday.json";
import csv from "./route/v1/holiday.csv";
import xml from "./route/v1/holiday.xml";
import count from "./route/v1/count";
import { swaggerUI } from "@hono/swagger-ui";
import { Bindings } from "./bindings";
import { insertHolidays } from "./db/client";
import { drizzle } from "drizzle-orm/d1";
import { stringToDate } from "./utils/date";
import { cors } from "hono/cors";

const app = new OpenAPIHono().basePath("/v1");

app.use("*", cors({ origin: "*" }));

app.route("/", json);
app.route("/", csv);
app.route("/", xml);
app.route("/", count);
app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Japan Holiday API",
    description:
      "内閣府（ https://www8.cao.go.jp/chosei/shukujitsu/gaiyou.html ）が公開している祝日一覧を下に、日本の祝日を取得するAPIです。",
  },
});

app.get("/ui", swaggerUI({ url: "/v1/doc" }));

const scheduled: ExportedHandlerScheduledHandler<Bindings> = async (_, env) => {
  const response = await fetch(
    "https://www8.cao.go.jp/chosei/shukujitsu/syukujitsu.csv"
  );
  const buffer = await response.arrayBuffer();
  const decoder = new TextDecoder("shift-jis");
  const csv = decoder.decode(buffer);

  await insertHolidays(
    drizzle(env.DB),
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
};

export default {
  fetch: app.fetch,
  scheduled,
};
