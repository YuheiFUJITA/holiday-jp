import { z } from "@hono/zod-openapi";

const isIncludeFirstDay = z
  .union([z.literal("true"), z.literal("false")])
  .optional()
  .default("true")
  .transform((str) => str === "true");

isIncludeFirstDay.openapi({
  param: {
    name: "is-include-first-day",
    in: "query",
  },
  description: "開始日を含めるか",
  example: "true",
});

export { isIncludeFirstDay };
