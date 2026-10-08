import { humanizeEnum } from "@/components/admin/format";
import type { DailyQuestionSummary } from "@/server/cms/daily-questions/service";

/** "Thu 8 Oct" for a `YYYY-MM-DD` calendar day (no time-zone shift). */
export function dayLabel(date: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
  return new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
}

/** "Multiple choice · difficulty 2 · Algebra". */
export function questionMeta(question: Pick<DailyQuestionSummary, "type" | "difficulty" | "topicName">): string {
  return [humanizeEnum(question.type), `difficulty ${question.difficulty}`, question.topicName].filter(Boolean).join(" · ");
}
