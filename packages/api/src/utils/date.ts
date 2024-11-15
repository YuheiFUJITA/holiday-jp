export const stringToDate = (str: string): Date => {
  const [year, month, day] = str.split(/[-\/]/).map(Number);
  const utcDate = new Date(Date.UTC(year, month - 1, day));
  const jstOffset = 9 * 60 * 60 * 1000;
  return new Date(utcDate.getTime() + jstOffset);
};

export const dateToString = (date: Date): string => {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Tokyo",
  })
    .format(date)
    .replace(/\//g, "-");
};
