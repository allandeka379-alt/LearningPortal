import "server-only";
import { addDays, localDateString } from "@/lib/dates";
import { activeDayPredicate } from "@/server/analytics/queries";
import { db } from "@/server/db";
import type { TeachingActor } from "./access";
import { listUpcomingAssignments, type AssignmentListItem } from "./assignments";
import { listTeacherClasses, type TeacherClassSummary } from "./classes";
import { SCOPE_ASSIGNMENT_STATUSES } from "./core";
import { listMarkingQueue } from "./marking";

/**
 * The teacher home (/teacher, §22): each class with its class average (members' average score in the class's subject
 * scope, from SubjectProgress), active students (learning activity in the last 7 days), what is due soon and how many
 * answers wait for marking. Aggregates run in SQL over the teacher's classes in a fixed number of queries.
 */

export interface DashboardClass extends TeacherClassSummary {
  /** Mean of members' average scores in the class's subject scope; null without evidence. */
  classAveragePct: number | null;
  activeLast7Days: number;
}

export interface TeacherDashboard {
  classes: DashboardClass[];
  /** Published work due in the next 14 days (and overdue work still open), soonest first. */
  upcoming: AssignmentListItem[];
  marking: { attempts: number; answers: number };
}

/** Builds the teacher dashboard. */
export async function getTeacherDashboard(actor: TeachingActor, options: { now?: Date } = {}): Promise<TeacherDashboard> {
  const now = options.now ?? new Date();
  const classes = await listTeacherClasses(actor);
  const classIds = classes.map((c) => c.id);
  const weekStart = addDays(localDateString(now), -6);

  const [averages, active, upcoming, marking] = await Promise.all([
    classIds.length
      ? db.$queryRaw<{ classId: string; average: number | null }[]>`
          WITH my AS (SELECT c."id", c."subjectId" FROM "Class" c WHERE c."id" = ANY(${classIds}::uuid[])),
          scope AS (
            SELECT my."id" AS "classId", my."subjectId" FROM my WHERE my."subjectId" IS NOT NULL
            UNION
            SELECT DISTINCT a."classId", a."subjectId" FROM "Assignment" a JOIN my ON my."id" = a."classId"
            WHERE my."subjectId" IS NULL AND a."status"::text = ANY(${[...SCOPE_ASSIGNMENT_STATUSES]}::text[])
          )
          SELECT sc."classId"::text AS "classId", round(avg(sp."averageScorePercent")::numeric, 1)::float8 AS average
          FROM scope sc
          JOIN "ClassMember" cm ON cm."classId" = sc."classId" AND cm."status" = 'ACTIVE'
          JOIN "SubjectEnrollment" e ON e."userId" = cm."userId" AND e."subjectId" = sc."subjectId" AND e."status" IN ('ACTIVE', 'PAUSED')
          JOIN "SubjectProgress" sp ON sp."userId" = e."userId" AND sp."subjectId" = e."subjectId"
          GROUP BY sc."classId"`
      : Promise.resolve([]),
    classIds.length
      ? db.$queryRaw<{ classId: string; active: number }[]>`
          SELECT cm."classId"::text AS "classId", count(DISTINCT cm."userId")::int AS active
          FROM "ClassMember" cm
          JOIN "DailyActivity" d ON d."userId" = cm."userId"
          WHERE cm."classId" = ANY(${classIds}::uuid[]) AND cm."status" = 'ACTIVE'
            AND d."date" >= ${weekStart}::date AND ${activeDayPredicate()}
          GROUP BY cm."classId"`
      : Promise.resolve([]),
    listUpcomingAssignments(actor, { now, days: 14, limit: 8 }),
    listMarkingQueue(actor, { limit: 50 }),
  ]);
  const averageByClass = new Map(averages.map((row) => [row.classId, row.average]));
  const activeByClass = new Map(active.map((row) => [row.classId, row.active]));
  return {
    classes: classes.map((c) => ({ ...c, classAveragePct: averageByClass.get(c.id) ?? null, activeLast7Days: activeByClass.get(c.id) ?? 0 })),
    upcoming,
    marking: { attempts: marking.items.length, answers: marking.totalPendingAnswers },
  };
}
