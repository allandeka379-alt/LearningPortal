import "server-only";
import { addDays, daysBetween, isLocalDate, localDateString, type LocalDate } from "@/lib/dates";
import { DEFAULT_TIMEZONE } from "@/lib/config";
import type { Actor } from "@/server/auth/actor";
import { hasPermission } from "@/server/auth/permissions";
import { getAdminAnalytics, type AdminAnalytics } from "@/server/analytics/admin";
import { AppError } from "@/server/lib/errors";

/**
 * Platform reporting centre (§35 / §36 / management blueprint module 12). The data source is the existing
 * DailyMetric rollups and source-of-truth payment/activity tables used by /admin and /admin/analytics, so exports
 * reconcile with the dashboard and keep the "no fake numbers" rule.
 */

export const ADMIN_REPORTS = [
  {
    id: "executive-summary",
    title: "Executive summary",
    description: "Headline funnel, revenue, engagement and assessment totals for the selected range.",
    source: "DailyMetric rollups plus live payment and activity aggregates",
  },
  {
    id: "registrations",
    title: "Registration report",
    description: "Daily sign-ups and active-user counts.",
    source: "DailyMetric users.* rollups",
  },
  {
    id: "learning-engagement",
    title: "Learning engagement report",
    description: "Daily active students, questions answered and study minutes.",
    source: "DailyMetric students.*, questions.* and study.* rollups",
  },
  {
    id: "assessment-performance",
    title: "Assessment performance report",
    description: "Average marked test scores and completed mock exams by day.",
    source: "DailyMetric assessments.* and mock.* rollups",
  },
  {
    id: "revenue",
    title: "Payment and revenue report",
    description: "Gross, refunds, net and payment counts by currency.",
    source: "Verified Payment records rolled up by analytics jobs",
  },
  {
    id: "retention",
    title: "Retention report",
    description: "Day 1, day 7 and day 30 retained-student cohorts.",
    source: "DailyMetric retention rollups",
  },
  {
    id: "topic-weakness",
    title: "Topic weakness report",
    description: "Lowest correct-rate topics with enough answered questions in the range.",
    source: "DailyMetric topic answer rollups",
  },
  {
    id: "ai-usage",
    title: "AI usage report",
    description: "Requests and metered spend by AI feature. Empty while AI is switched off or unused.",
    source: "AiUsage ledger rolled up into DailyMetric",
  },
] as const;

export type AdminReportId = (typeof ADMIN_REPORTS)[number]["id"];

export interface AdminReportRange {
  from: LocalDate;
  to: LocalDate;
}

export interface AdminReportsOverview {
  range: AdminReportRange;
  analytics: AdminAnalytics;
}

export interface AdminReportCsv {
  id: AdminReportId;
  title: string;
  fileName: string;
  csv: string;
  rowCount: number;
}

type CsvValue = string | number | null | undefined;

export function getAdminReport(id: string): (typeof ADMIN_REPORTS)[number] {
  const report = ADMIN_REPORTS.find((item) => item.id === id);
  if (!report) throw AppError.notFound("That report does not exist.");
  return report;
}

function assertCanViewReports(actor: Pick<Actor, "roles">): void {
  if (!hasPermission(actor, "analytics.platform", "all")) throw AppError.forbidden();
}

export function defaultAdminReportRange(now: Date = new Date()): AdminReportRange {
  const to = addDays(localDateString(now, DEFAULT_TIMEZONE), -1);
  return { from: addDays(to, -29), to };
}

/**
 * Report ranges are inclusive platform-local dates, capped at 366 days to match analytics query bounds. Invalid URL
 * edits fall back to the standard 30-day window rather than throwing on page load.
 */
export function parseAdminReportRange(from: string | null | undefined, to: string | null | undefined, now: Date = new Date()): AdminReportRange {
  const fallback = defaultAdminReportRange(now);
  if (!from || !to || !isLocalDate(from) || !isLocalDate(to) || from > to) return fallback;
  if (daysBetween(from, to) > 365) return fallback;
  return { from, to };
}

export async function getAdminReportsOverview(actor: Actor, range: AdminReportRange): Promise<AdminReportsOverview> {
  assertCanViewReports(actor);
  return { range, analytics: await getAdminAnalytics(range, { topN: 50 }) };
}

function csvCell(value: CsvValue): string {
  let text = value === null || value === undefined ? "" : String(value);
  if (/^[=+\-@]/.test(text)) text = `'${text}`;
  if (/[",\r\n]/.test(text)) text = `"${text.replaceAll('"', '""')}"`;
  return text;
}

export function toCsv(headers: readonly string[], rows: readonly (readonly CsvValue[])[]): string {
  return [headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\r\n") + "\r\n";
}

interface ReportTable {
  headers: string[];
  rows: CsvValue[][];
}

function executiveRows(analytics: AdminAnalytics, range: AdminReportRange): CsvValue[][] {
  const rows: CsvValue[][] = [
    ["range_from", range.from, "date", "Inclusive platform-local start date"],
    ["range_to", range.to, "date", "Inclusive platform-local end date"],
    ["registered_users", analytics.funnel.users, "count", analytics.funnel.asOf ? `As of ${analytics.funnel.asOf}` : "No rolled-up day in range"],
    ["active_students_30d", analytics.funnel.activeStudents, "count", analytics.funnel.asOf ? `30-day active students as of ${analytics.funnel.asOf}` : "No rolled-up day in range"],
    ["paid_students", analytics.funnel.paidStudents, "count", analytics.funnel.asOf ? `As of ${analytics.funnel.asOf}` : "No rolled-up day in range"],
    ["signups", analytics.totals.signups, "count", "Sum over rolled-up days in range"],
    ["questions_attempted", analytics.totals.questionsAttempted, "count", "Sum over rolled-up days in range"],
    ["questions_correct", analytics.totals.questionsCorrect, "count", "Sum over rolled-up days in range"],
    ["correct_rate_pct", analytics.totals.correctRatePct, "percent", "questions_correct / questions_attempted"],
    ["study_minutes", analytics.totals.studyMinutes, "minutes", "Sum over rolled-up days in range"],
    ["mock_exams_completed", analytics.totals.mockCompleted, "count", "Completed mock exams in range"],
    ["mock_average_pct", analytics.totals.mockAvgPct, "percent", "Weighted mean of scored mock attempts"],
    ["new_paid_students", analytics.totals.conversions, "count", "Students whose first paid conversion fell in range"],
    ["ai_requests", analytics.totals.aiRequests, "count", "Zero or blank while AI is disabled or unused"],
    ["ai_cost_micros_usd", analytics.totals.aiCostMicros, "micros", "Metered AI cost in USD micro-units"],
  ];
  for (const row of analytics.totals.revenue) {
    rows.push([`gross_revenue_${row.currency.toLowerCase()}_minor`, row.amountMinor, row.currency, "Confirmed successful payments"]);
    rows.push([`refunds_${row.currency.toLowerCase()}_minor`, row.refundsMinor, row.currency, "Recorded refunds"]);
    rows.push([`net_revenue_${row.currency.toLowerCase()}_minor`, row.netMinor, row.currency, "Gross minus refunds"]);
  }
  return rows;
}

function reportTable(id: AdminReportId, analytics: AdminAnalytics, range: AdminReportRange): ReportTable {
  switch (id) {
    case "executive-summary":
      return {
        headers: ["metric", "value", "unit", "notes"],
        rows: executiveRows(analytics, range),
      };
    case "registrations":
      return {
        headers: ["date", "signups", "daily_active_users", "weekly_active_users", "monthly_active_users"],
        rows: analytics.series.map((row) => [row.date, row.signups, row.dau, row.wau, row.mau]),
      };
    case "learning-engagement":
      return {
        headers: ["date", "active_students_30d", "questions_attempted", "questions_correct", "study_minutes"],
        rows: analytics.series.map((row) => [row.date, row.activeStudents, row.questionsAttempted, row.questionsCorrect, row.studyMinutes]),
      };
    case "assessment-performance":
      return {
        headers: ["date", "average_test_score_pct", "mock_exams_completed", "mock_average_pct"],
        rows: analytics.series.map((row) => [row.date, row.avgScorePct, row.mockCompleted, row.mockAvgPct]),
      };
    case "revenue":
      return {
        headers: ["currency", "payments", "gross_minor", "refunds_minor", "net_minor"],
        rows: analytics.totals.revenue.map((row) => [row.currency, row.payments, row.amountMinor, row.refundsMinor, row.netMinor]),
      };
    case "retention":
      return {
        headers: ["retention_day", "cohort", "retained", "rate"],
        rows: analytics.funnel.retention.map((row) => [row.days, row.cohort, row.retained, row.rate]),
      };
    case "topic-weakness":
      return {
        headers: ["topic_id", "topic", "subject_id", "subject", "answers", "correct", "correct_rate_pct"],
        rows: analytics.topLists.mostDifficultTopics.map((row) => [row.topicId, row.name, row.subjectId, row.subjectName, row.attempts, row.correct, row.correctRatePct]),
      };
    case "ai-usage":
      return {
        headers: ["feature", "requests", "cost_micros_usd", "cost_usd"],
        rows: analytics.topLists.aiByFeature.map((row) => [row.feature, row.requests, row.costMicros, row.costMicros / 1_000_000]),
      };
  }
}

export async function buildAdminReportCsv(actor: Actor, id: string, range: AdminReportRange): Promise<AdminReportCsv> {
  assertCanViewReports(actor);
  const report = getAdminReport(id);
  const analytics = await getAdminAnalytics(range, { topN: 50 });
  const table = reportTable(report.id, analytics, range);
  return {
    id: report.id,
    title: report.title,
    fileName: `bvunzohub-${report.id}-${range.from}-to-${range.to}.csv`,
    csv: toCsv(table.headers, table.rows),
    rowCount: table.rows.length,
  };
}
