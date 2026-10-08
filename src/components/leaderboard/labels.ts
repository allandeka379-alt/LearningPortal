import type { LeaderboardMetric, LeaderboardScope } from "@/generated/prisma/client";
import { formatCount, formatNumber } from "@/lib/format";

/** UI copy for the leaderboard metrics (§20). Pure and isomorphic. */
export const METRIC_COPY: Readonly<Record<LeaderboardMetric, { label: string; description: string }>> = {
  WEEKLY_XP: { label: "XP this week", description: "XP earned since Monday. Effort counts, not only right answers." },
  WEEKLY_QUESTIONS: { label: "Questions this week", description: "Questions answered since Monday." },
  STREAK: { label: "Study streak", description: "Days in a row with the daily goal met." },
  MOCK_AVERAGE: { label: "Mock average", description: "Average mock exam score this month. You need at least two marked mocks to appear." },
  SUBJECT_MASTERY: { label: "Subject mastery", description: "How far through the syllabus your mastery reaches." },
};

export const SCOPE_COPY: Readonly<Record<LeaderboardScope, string>> = {
  GLOBAL: "Everyone",
  COUNTRY: "Country",
  SCHOOL: "School",
  CLASS: "Class",
  SUBJECT: "Subject",
};

/** A board value with its unit: "1,240 XP", "86 questions", "12 days", "74.5%", "62%". */
export function formatBoardValue(metric: LeaderboardMetric, value: number): string {
  switch (metric) {
    case "WEEKLY_XP":
      return `${formatNumber(value)} XP`;
    case "WEEKLY_QUESTIONS":
      return formatCount(value, "question");
    case "STREAK":
      return formatCount(value, "day");
    case "MOCK_AVERAGE":
    case "SUBJECT_MASTERY":
      return `${formatNumber(value, { maximumFractionDigits: 1 })}%`;
  }
}

/** URL of a board (search params, so every board has its own link and the page needs no client JavaScript). */
export function leaderboardHref(board: { metric: LeaderboardMetric; scope?: LeaderboardScope; scopeId?: string | null }): string {
  const params = new URLSearchParams({ metric: board.metric });
  if (board.scope) params.set("scope", board.scope);
  if (board.scopeId) params.set("scopeId", board.scopeId);
  return `/app/leaderboard?${params.toString()}`;
}
