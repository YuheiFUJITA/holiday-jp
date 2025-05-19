import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { Bindings } from "../../bindings";
import { from, to } from "../../query";
import { DiffSchema } from "../../schema";
import { countDate } from "../../utils/calculate";

const QuerySchema = z.object({
  from: from.required(),
  to: to.required(),
});

const route = createRoute({
  method: "get",
  path: "/count",
  request: {
    query: QuerySchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: DiffSchema,
        },
      },
      description: "計算結果",
    },
  },
});

const app = new OpenAPIHono<{ Bindings: Bindings }>();

app.openapi(route, async (c) => {
  const { from, to } = c.req.valid("query");
  return c.json(countDate(from, to));
});

export default app;
