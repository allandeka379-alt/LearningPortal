import "server-only";
import { dateColumnFromLocalDate, DEFAULT_TIMEZONE, isValidTimeZone, localDateFromDateColumn, localDateString, startOfLocalDay, addDays } from "@/lib/dates";
import { hasPermission } from "@/server/auth/permissions";
import { assertEntitlement, hasEntitlement } from "@/server/billing/entitlements";
import { db } from "@/server/db";
import { AppError } from "@/server/lib/errors";
import {
  buildDetailedAnalytics,
  DETAILED_WEEKS,
  TOPIC_TREND_LIMIT,
  windowStart,
  type AttemptAggregateRow,
  type DetailedAnalytics,
} from "./detailed-analytics-core";
import type { ProgressActor } from "./service";

/**
 * "Detailed analytics" on /app/progress (§6, §11), gated by the `advancedAnalytics` entitlement (§31, CLAUDE.md rule 9:
 * `assertEntitlement(actor, "analytics.advanced")` here at the service boundary, not only in the page). Reads the
 * acting student's OWN rows only, in three queries:
 *
 * 1. QuestionAttempt aggregated in SQL per (subject, topic, difficulty, week) over the last {@link DETAILED_WEEKS}
 *    weeks: marked, answered rows only (`isCorrect` set, a response saved). Uses the (userId, topicId, createdAt)
 *    index; at most a few hundred groups per student.
 * 2. DailyActivity by primary key (userId, date) for the weekly overview.
 * 3. Names of the listed topics and of the subjects involved (primary keys).
 *
 * The arithmetic is the pure core (./detailed-analytics-core.ts).
 */

function assertOwnProgress(actor: ProgressActor): void {
  if (!hasPermission({ roles: [...actor.roles] }, "progress.viewOwn")) throw AppError.forbidden("Only students have a progress dashboard.");
}

async function zoneOf(actor: ProgressActor): Promise<string> {
  if (actor.timeZone && isValidTimeZone(actor.timeZone)) return actor.timeZone;
  const profile = await db.profile.findUnique({ where: { userId: actor.userId }, select: { timezone: true } });
  return profile?.timezone && isValidTimeZone(profile.timezone) ? profile.timezone : DEFAULT_TIMEZONE;
}

/** Whether the student's plan includes the section (the page shows an upgrade card otherwise). */
export function detailedAnalyticsIncluded(actor: ProgressActor): Promise<boolean> {
  return hasEntitlement(actor, "analytics.advanced");
}

/**
 * The detailed analytics of the acting student.
 *
 * @throws AppError FORBIDDEN (not a student) | EntitlementRequiredError ENTITLEMENT_REQUIRED (plan without
 *         `advancedAnalytics`)
 */
export async function getDetailedAnalytics(actor: ProgressActor, now: Date = new Date()): Promise<DetailedAnalytics> {
  assertOwnProgress(actor);
  await assertEntitlement(actor, "analytics.advanced");
  const userId = actor.userId;
  const timeZone = await zoneOf(actor);
  const today = localDateString(now, timeZone);
  const from = windowStart(today, DETAILED_WEEKS);
  const since = startOfLocalDay(from, timeZone);
  const until = startOfLocalDay(addDays(today, 1), timeZone);

  const [attempts, activity] = await Promise.all([
    db.$queryRaw<AttemptAggregateRow[]>`
      SELECT qa."subjectId"::text AS "subjectId",
             qa."topicId"::text AS "topicId",
             qa."difficulty"::int AS "difficulty",
             ((${today}::date - (qa."createdAt" AT TIME ZONE ${timeZone})::date) / 7)::int AS "weekIndex",
             count(*)::int AS "answered",
             (count(*) FILTER (WHERE qa."isCorrect"))::int AS "correct",
             (count(*) FILTER (WHERE qa."timeSpentSeconds" > 0))::int AS "timed",
             coalesce(sum(qa."timeSpentSeconds") FILTER (WHERE qa."timeSpentSeconds" > 0), 0)::float8 AS "seconds"
        FROM "QuestionAttempt" qa
       WHERE qa."userId" = ${userId}::uuid
         AND qa."createdAt" >= ${since}
         AND qa."createdAt" < ${until}
         AND qa."isCorrect" IS NOT NULL
         AND qa."response" IS NOT NULL
       GROUP BY 1, 2, 3, 4`,
    db.dailyActivity.findMany({
      where: { userId, date: { gte: dateColumnFromLocalDate(from), lte: dateColumnFromLocalDate(today) } },
      select: { date: true, studySeconds: true, questionsAttempted: true, questionsCorrect: true },
    }),
  ]);

  // Names only for what is shown: the most-answered topics and every subject involved.
  const answeredByTopic = new Map<string, number>();
  for (const row of attempts) answeredByTopic.set(row.topicId, (answeredByTopic.get(row.topicId) ?? 0) + row.answered);
  const topicIds = [...answeredByTopic.entries()]
    .sort(([a, x], [b, y]) => y - x || (a < b ? -1 : a > b ? 1 : 0))
    .slice(0, TOPIC_TREND_LIMIT)
    .map(([id]) => id);
  const subjectIds = [...new Set(attempts.map((row) => row.subjectId))];
  const [topics, subjects] = await Promise.all([
    topicIds.length ? db.topic.findMany({ where: { id: { in: topicIds } }, select: { id: true, name: true } }) : Promise.resolve([]),
    subjectIds.length ? db.subject.findMany({ where: { id: { in: subjectIds } }, select: { id: true, name: true } }) : Promise.resolve([]),
  ]);

  return buildDetailedAnalytics({
    today,
    weeks: DETAILED_WEEKS,
    attempts,
    activity: activity.map((row) => ({ ...row, date: localDateFromDateColumn(row.date) })),
    topicNames: new Map(topics.map((topic) => [topic.id, topic.name])),
    subjectNames: new Map(subjects.map((subject) => [subject.id, subject.name])),
  });
}
