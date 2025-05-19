import { z } from "@hono/zod-openapi";

export const HolidaySchema = z
  .object({
    date: z.date().openapi({
      description: "日付",
      example: "2024-02-11",
    }),
    name: z.string().openapi({
      description: "名称",
      example: "建国記念の日",
    }),
  })
  .openapi("Holiday");
