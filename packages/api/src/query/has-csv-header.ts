import { z } from "@hono/zod-openapi";

const hasCsvHeader = z
  .union([z.literal("true"), z.literal("false")])
  .transform((value) => value === "true")
  .optional()
  .default("true");

hasCsvHeader.openapi({
  param: {
    name: "has-csv-header",
    in: "query",
  },
  description: "CSV ヘッダーを含むかどうか",
  example: "true",
});

export { hasCsvHeader };
