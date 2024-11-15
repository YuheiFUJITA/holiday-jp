import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { Bindings } from "../../bindings";
import { from, hasCsvHeader, to } from "../../query";
import { getHolidays } from "../../db/client";
import { dateToString } from "../../utils/date";
import { drizzle } from "drizzle-orm/d1";

const QuerySchema = z
  .object({
    from,
    to,
    "has-csv-header": hasCsvHeader,
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
  path: "/holiday.csv",
  tags: ["祝日API"],
  request: {
    query: QuerySchema,
  },
  responses: {
    200: {
      content: {
        "text/csv": {
          schema: z.string(),
        },
      },
      description: "祝日一覧",
    },
  },
});

const app = new OpenAPIHono<{ Bindings: Bindings }>();

app.openapi(route, async (c) => {
  const { from, to, "has-csv-header": hasCsvHeader } = c.req.valid("query");
  const holidays = await getHolidays(drizzle(c.env.DB), from, to);
  const csv = holidays
    .map((holiday) => `${dateToString(holiday.date)},${holiday.name}`)
    .join("\n");

  if (hasCsvHeader) {
    return c.text(`date,name\n${csv}`, 200, {
      "Content-Type": "text/csv; charset=UTF-8",
    });
  }

  return c.text(csv, 200, {
    "Content-Type": "text/csv; charset=UTF-8",
  });
});

export default app;
