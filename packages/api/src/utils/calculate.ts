import { z } from "@hono/zod-openapi";
import { DiffSchema } from "../schema";

export const countDate = (from: Date, to: Date): z.infer<typeof DiffSchema> => {
  const diffTime = to.getTime() - from.getTime();
  return {
    total: Math.floor(diffTime / (1000 * 60 * 60 * 24)),
    years: Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365)),
    months: Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30)),
    days: Math.floor(diffTime / (1000 * 60 * 60 * 24)),
  };
};
