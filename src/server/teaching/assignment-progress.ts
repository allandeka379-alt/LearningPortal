import "server-only";
import type { DbClient } from "@/server/db";
import { assignsToNewMembers } from "./core";

/**
 * AssignmentProgress bookkeeping shared by the class roster and assignment services (§22): one row per (assignment,
 * targeted student) is what the attempt engine and the lesson reader look for before they accept assignment work,
 * and the Assignment's cached counters ("18/25 submitted, average 64%") are recomputed from those rows.
 *
 * The attempt engine (`src/server/attempts/finalize.ts` `updateAssignmentProgress`, `start.ts`) and the lesson reader
 * (`src/server/lessons/progress.ts`) update the per-student rows themselves; they may call
 * {@link refreshAssignmentCounters} after doing so to keep the cached counters current (teacher views compute live
 * aggregates and never depend on the cache).
 */

/**
 * Recomputes `assignedCount` / `startedCount` / `submittedCount` / `averageScorePercent` of the given assignments from
 * their progress rows in ONE statement (excused students are not counted as assigned).
 */
export async function refreshAssignmentCounters(client: DbClient, assignmentIds: readonly string[]): Promise<void> {
  const ids = [...new Set(assignmentIds)];
  if (ids.length === 0) return;
  await client.$executeRaw`
    UPDATE "Assignment" a SET
      "assignedCount" = s.assigned,
      "startedCount" = s.started,
      "submittedCount" = s.submitted,
      "averageScorePercent" = s.average,
      "updatedAt" = now()
    FROM (
      SELECT x.id,
        count(p."userId") FILTER (WHERE p."status" <> 'EXCUSED')::int AS assigned,
        count(p."userId") FILTER (WHERE p."status" NOT IN ('EXCUSED', 'NOT_STARTED', 'MISSED'))::int AS started,
        count(p."userId") FILTER (WHERE p."status" IN ('SUBMITTED', 'LATE'))::int AS submitted,
        round((avg(p."scorePercent") FILTER (WHERE p."status" IN ('SUBMITTED', 'LATE')))::numeric, 1)::float8 AS average
      FROM unnest(${ids}::uuid[]) AS x(id)
      LEFT JOIN "AssignmentProgress" p ON p."assignmentId" = x.id
      GROUP BY x.id
    ) s
    WHERE a."id" = s.id`;
}

/**
 * Gives students who just became ACTIVE members of a class the class-wide work that is still live (published, not
 * closed): one NOT_STARTED progress row per assignment (idempotent). Targeted practice set for chosen students is
 * not handed to later joiners. Returns the assignment ids that gained rows.
 */
export async function assignLiveWorkToMembers(client: DbClient, classId: string, userIds: readonly string[], now: Date): Promise<string[]> {
  const students = [...new Set(userIds)];
  if (students.length === 0) return [];
  const live = await client.assignment.findMany({
    where: { classId, status: "PUBLISHED", OR: [{ closesAt: null }, { closesAt: { gt: now } }] },
    select: { id: true, type: true, practiceConfig: true },
  });
  const targets = live.filter(assignsToNewMembers).map((a) => a.id);
  if (targets.length === 0) return [];
  const result = await client.assignmentProgress.createMany({
    data: targets.flatMap((assignmentId) => students.map((userId) => ({ assignmentId, userId, createdAt: now }))),
    skipDuplicates: true,
  });
  if (result.count > 0) await refreshAssignmentCounters(client, targets);
  return result.count > 0 ? targets : [];
}
