import { z } from "@hono/zod-openapi";

const to = z
  .string()
  .regex(/^\d{4}-\d{1,2}-\d{1,2}$/, "日付は YYYY-MM-DD 形式で入力してください")
  .transform((str) => {
    const [year, month, day] = str.split("-").map(Number);
    return new Date(year, month - 1, day);
  })
  .refine((date) => date !== null, "無効な日付です");

to.openapi({
  param: {
    name: "to",
    in: "query",
  },
  description: "終了日",
  example: "2024-12-31",
});

export { to };
