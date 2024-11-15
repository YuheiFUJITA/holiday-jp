import { z } from "@hono/zod-openapi";
import { HolidaySchema } from "./holiday";

export const HolidayListSchema = z.array(HolidaySchema).openapi("HolidayList");
