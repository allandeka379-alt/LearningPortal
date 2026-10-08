/**
 * Countdown arithmetic for the free exam countdown (§17, §46). Isomorphic and pure: the client island computes the
 * days from the VISITOR's current date (the page itself is cached), in the platform time zone, so the number is right
 * even when the cached HTML is a day old. Unit tested.
 */
import { daysBetween, type LocalDate } from "@/lib/dates";
import { formatCount } from "@/lib/format";

export type CountdownState =
  | { kind: "upcoming"; days: number }
  | { kind: "starts_today" }
  | { kind: "in_progress" }
  | { kind: "ended" };

/** Where `today` stands relative to a session that runs from `startsOn` to `endsOn` (inclusive calendar dates). */
export function countdownState(today: LocalDate, startsOn: LocalDate, endsOn: LocalDate): CountdownState {
  const untilStart = daysBetween(today, startsOn);
  if (untilStart > 0) return { kind: "upcoming", days: untilStart };
  if (untilStart === 0) return { kind: "starts_today" };
  return daysBetween(today, endsOn) >= 0 ? { kind: "in_progress" } : { kind: "ended" };
}

/** Headline for a state: "124 days", "Today", "In progress", "Ended". */
export function countdownHeadline(state: CountdownState): string {
  switch (state.kind) {
    case "upcoming":
      return formatCount(state.days, "day");
    case "starts_today":
      return "Today";
    case "in_progress":
      return "In progress";
    case "ended":
      return "Ended";
  }
}

const longDate = new Intl.DateTimeFormat("en-ZW", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
// en-GB: en-ZW renders short dates as "01 Jan, 2027".
const shortDate = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

/** "Thursday, 1 October 2026" for a calendar date (formatted in UTC so the date never shifts). */
export function formatLongDate(date: LocalDate): string {
  return longDate.format(new Date(`${date}T00:00:00Z`));
}

/** "1 Oct 2026". */
export function formatShortDate(date: LocalDate): string {
  return shortDate.format(new Date(`${date}T00:00:00Z`));
}
