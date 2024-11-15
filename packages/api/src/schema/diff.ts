import { z } from "@hono/zod-openapi";

export const DiffSchema = z
  .object({
    total: z.number().openapi({
      description: "総日数",
      example: 365,
    }),
    years: z.number().openapi({
      description: "年数",
      example: 1,
    }),
    months: z.number().openapi({
      description: "月数",
      example: 1,
    }),
    days: z.number().openapi({
      description: "日数",
      example: 1,
    }),
  })
  .openapi("Diff");
