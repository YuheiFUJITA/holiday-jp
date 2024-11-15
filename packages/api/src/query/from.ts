import { z } from "@hono/zod-openapi";
import { stringToDate } from "../utils/date";

const from = z
  .string()
  .regex(/^\d{4}-\d{1,2}-\d{1,2}$/, "日付は YYYY-MM-DD 形式で入力してください")
  .transform((str) => stringToDate(str))
  .refine((date) => date !== null, "無効な日付です");

from.openapi({
  param: {
    name: "from",
    in: "query",
  },
  description: "開始日",
  example: "2024-01-01",
});

export { from };
