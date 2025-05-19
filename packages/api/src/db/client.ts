import { DrizzleD1Database } from "drizzle-orm/d1";
import { and, gte, lte, desc } from "drizzle-orm";
import { holiday } from "./schema";

export const getHolidays = (
  db: DrizzleD1Database<Record<string, never>> & {
    $client: D1Database;
  },
  from?: Date,
  to?: Date
) => {
  if (to) {
    to.setDate(to.getDate() + 1);
  }

  return db
    .select({
      date: holiday.date,
      name: holiday.name,
    })
    .from(holiday)
    .where(
      and(
        from ? gte(holiday.date, from) : undefined,
        to ? lte(holiday.date, to) : undefined
      )
    );
};

export const insertHolidays = async (
  db: DrizzleD1Database<Record<string, never>> & {
    $client: D1Database;
  },
  holidays: { date: Date; name: string }[]
) => {
  const latestHoliday = await db
    .select({ date: holiday.date })
    .from(holiday)
    .orderBy(desc(holiday.date))
    .limit(1);
  let previousName = "";

  for (const h of holidays) {
    let currentName = h.name;

    // 「休日」の場合、前の祝日名を使用して「振替休日」とする
    if (h.name === "休日" && previousName) {
      currentName = `${previousName} 振替休日`;
    }

    if (h.date <= latestHoliday[0].date) {
      continue;
    }

    await db
      .insert(holiday)
      .values({ ...h, name: currentName })
      .onConflictDoUpdate({
        target: [holiday.date],
        set: {
          date: h.date,
          name: currentName,
        },
      });

    // 「休日」でない場合のみ、前の祝日名として保存
    if (h.name !== "休日") {
      previousName = h.name;
    }
  }
};
