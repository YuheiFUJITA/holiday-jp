export type DayOfWeekShort =
  | "sun"
  | "mon"
  | "tue"
  | "wed"
  | "thu"
  | "fri"
  | "sat";

export type DayOfWeekFull =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

export type DayOfWeek = DayOfWeekShort | DayOfWeekFull;

export type Holiday = "holiday";
