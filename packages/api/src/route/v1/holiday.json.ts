import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { HolidayListSchema } from "../../schema/holiday-list";
import { Bindings } from "../../bindings";
import { from, to, minify } from "../../query";
import { getHolidays } from "../../db/client";
import { dateToString } from "../../utils/date";
import { drizzle } from "drizzle-orm/d1";

const QuerySchema = z
  .object({
    from,
    to,
    minify,
  })
  .refine((data) => {
    if (data.from === undefined || data.to === undefined) {
      return true;
    }
    const tmp = new Date(data.to);
    tmp.setDate(tmp.getDate() + 1);
    return data.from <= tmp;
  }, "from は to よりも前の日付である必要があります");

const route = createRoute({
  method: "get",
  path: "/holiday.json",
  tags: ["祝日API"],
  request: {
    query: QuerySchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: HolidayListSchema,
        },
      },
      description: "祝日一覧",
    },
  },
});

const app = new OpenAPIHono<{ Bindings: Bindings }>();

app.openapi(route, async (c) => {
  const { from, to, minify } = c.req.valid("query");
  const holidays = await getHolidays(drizzle(c.env.DB), from, to);
  const data = holidays.map((holiday) => ({
    date: dateToString(holiday.date),
    name: holiday.name,
  }));
  
  if (minify) {
    // Return minified JSON
    return c.json(data);
  }
  
  // Return formatted JSON (default)
  return new Response(JSON.stringify(data, null, 2), {
    headers: { "Content-Type": "application/json" },
  });
});

export default app;
