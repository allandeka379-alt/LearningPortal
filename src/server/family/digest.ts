import "server-only";
import { z } from "zod";
import type { Prisma } from "@/generated/prisma/client";
import { addDays, dateColumnFromLocalDate, localDateString, parseLocalDate, startOfLocalDay, type LocalDate } from "@/lib/dates";
import { formatCount, formatDuration } from "@/lib/format";
import { DEFAULT_TIMEZONE } from "@/lib/config";
import { SCORED_ASSESSMENT_MODES } from "@/server/analytics/core";
import { db } from "@/server/db";
import { AppError } from "@/server/lib/errors";
import { createNotification } from "@/server/notifications/service";
import { assertParent, personName, type FamilyActor } from "./common";
import { childHasParentReports } from "./queries";
import { parentDigestSchema, type LinkPermissions, type ParentDigestPreference } from "./schemas";

/**
 * Parent summary messages (§21 "weekly summary"; `Profile.notificationPrefs.parentDigest`: OFF | WEEKLY | MONTHLY).
 *
 * - The preference is opt-in (missing = OFF): no unsolicited messages.
 * - `family.parentDigest` runs weekly (Sunday 18:00 CAT). Every run sends WEEKLY summaries; the run in the first seven
 *   days of a month also sends MONTHLY ones. Each parent gets ONE in-app notification per run, deduplicated by
 *   `parent.digest:<kind>:<date>`, so a retried job never notifies twice.
 * - Content honours each link's flags: study time only when the student shares activity, test counts and averages
 *   only when they share results. Real numbers only (an inactive week says so). AI data is never read.
 * - The summary is a detailed parent report (§31 `parentReports`): a child is included only when THEIR plan includes
 *   parent reports (`childHasParentReports`); a parent none of whose children qualify gets no message at all.
 * - Delivery beyond the in-app inbox (email, SMS, WhatsApp) is the notifications delivery step's job.
 */

export const PARENT_DIGEST_JOB = "family.parentDigest";
/** Weekly at Sunday 16:00 UTC (18:00 CAT): epoch weeks start on Thursday 00:00 UTC, + 3 days 16 hours. */
export const PARENT_DIGEST_EVERY_MINUTES = 7 * 24 * 60;
export const PARENT_DIGEST_OFFSET_MINUTES = 3 * 24 * 60 + 16 * 60;
const BATCH_SIZE = 200;

// =====================================================================================================================
// Preference
// =====================================================================================================================

const prefsSchema = z.looseObject({ parentDigest: z.enum(["OFF", "WEEKLY", "MONTHLY"]).optional() });

/** Reads `parentDigest` from a stored `notificationPrefs` document; anything unreadable counts as OFF. */
export function readDigestPreference(prefs: unknown): ParentDigestPreference {
  const parsed = prefsSchema.safeParse(prefs ?? {});
  return parsed.success ? (parsed.data.parentDigest ?? "OFF") : "OFF";
}

/** Returns `prefs` with `parentDigest` set, keeping every other key (version defaults to 1). Pure. */
export function withDigestPreference(prefs: unknown, value: ParentDigestPreference): Prisma.InputJsonObject {
  const base = typeof prefs === "object" && prefs !== null && !Array.isArray(prefs) ? (prefs as Record<string, unknown>) : {};
  return { version: 1, ...base, parentDigest: value } as Prisma.InputJsonObject;
}

export async function getParentDigestPreference(actor: FamilyActor): Promise<ParentDigestPreference> {
  assertParent(actor);
  const profile = await db.profile.findUnique({ where: { userId: actor.userId }, select: { notificationPrefs: true } });
  return readDigestPreference(profile?.notificationPrefs);
}

export async function setParentDigestPreference(actor: FamilyActor, value: unknown): Promise<ParentDigestPreference> {
  assertParent(actor);
  const parsed = parentDigestSchema.safeParse(value);
  if (!parsed.success) throw AppError.fromZod(parsed.error);
  await db.$transaction(async (tx) => {
    // Row lock so a concurrent preference write (another settings form) is not lost in the JSON merge.
    await tx.$queryRaw`SELECT 1 FROM "Profile" WHERE "userId" = ${actor.userId}::uuid FOR UPDATE`;
    const profile = await tx.profile.findUnique({ where: { userId: actor.userId }, select: { notificationPrefs: true } });
    if (!profile) throw AppError.notFound("Your profile was not found.");
    await tx.profile.update({
      where: { userId: actor.userId },
      data: { notificationPrefs: withDigestPreference(profile.notificationPrefs, parsed.data) },
    });
  });
  return parsed.data;
}

// =====================================================================================================================
// Composition (pure)
// =====================================================================================================================

export type DigestKind = "WEEKLY" | "MONTHLY";

export interface DigestChild {
  name: string;
  permissions: LinkPermissions;
  /** Present when the student shares study activity. */
  activity?: { minutes: number; activeDays: number };
  /** Present when the student shares results. */
  results?: { marked: number; averagePct: number | null };
}

/** Kinds sent by the run whose local date is `runDate`: WEEKLY always, MONTHLY in the month's first seven days. */
export function digestKindsFor(runDate: LocalDate): DigestKind[] {
  return parseLocalDate(runDate).day <= 7 ? ["WEEKLY", "MONTHLY"] : ["WEEKLY"];
}

/** Days covered by a summary. */
export function digestWindowDays(kind: DigestKind): number {
  return kind === "WEEKLY" ? 7 : 30;
}

/** Title and body of one parent's summary. Real values only; unshared sections are not mentioned. */
export function composeDigest(kind: DigestKind, children: readonly DigestChild[]): { title: string; body: string } {
  const period = kind === "WEEKLY" ? "this week" : "in the last 30 days";
  const lines = children.map((child) => {
    const parts: string[] = [];
    if (child.permissions.activity && child.activity) {
      parts.push(
        child.activity.activeDays === 0
          ? `${child.name} did not study on the app ${period}.`
          : `${child.name} studied ${formatDuration(child.activity.minutes, { style: "long" })} on ${formatCount(child.activity.activeDays, "day")} ${period}.`,
      );
    }
    if (child.permissions.results && child.results && child.results.marked > 0) {
      const average = child.results.averagePct === null ? "" : `, average ${Math.round(child.results.averagePct)}%`;
      parts.push(`${formatCount(child.results.marked, "test")} marked${average}.`);
    }
    if (parts.length === 0) {
      return child.permissions.activity || child.permissions.results
        ? `${child.name}: no tests marked ${period}.`
        : `${child.name} shares subjects and exam dates with you. Open the dashboard to see them.`;
    }
    return parts.join(" ");
  });
  const body = lines.join("\n").slice(0, 2000) || "No linked children to report on.";
  return { title: kind === "WEEKLY" ? "Your weekly summary" : "Your monthly summary", body };
}

// =====================================================================================================================
// Job
// =====================================================================================================================

export interface ParentDigestRunResult {
  runDate: LocalDate;
  kinds: DigestKind[];
  parentsScanned: number;
  notified: number;
}

/**
 * One run of `family.parentDigest` for the period starting at `periodStart` (the scheduler's period). Walks parents
 * with ACTIVE links in id order (index-backed keyset), loads opted-in parents' children in batches and writes one
 * deduplicated notification each. Idempotent.
 */
export async function runParentDigest(
  options: { periodStart?: Date; now?: Date; signal?: AbortSignal } = {},
): Promise<ParentDigestRunResult> {
  const now = options.now ?? new Date();
  const runDate = localDateString(options.periodStart ?? now, DEFAULT_TIMEZONE);
  const kinds = digestKindsFor(runDate);
  let cursor: string | null = null;
  let parentsScanned = 0;
  let notified = 0;

  for (;;) {
    if (options.signal?.aborted) throw new Error("family.parentDigest aborted");
    const after: string = cursor ?? "00000000-0000-0000-0000-000000000000";
    // ParentStudentLink(parentUserId, status) index: distinct parents with an ACTIVE link, keyset by id.
    const page = await db.$queryRaw<{ parentUserId: string }[]>`
      SELECT DISTINCT l."parentUserId"::text AS "parentUserId"
        FROM "ParentStudentLink" l
       WHERE l."status" = 'ACTIVE' AND l."parentUserId" > ${after}::uuid
       ORDER BY 1
       LIMIT ${BATCH_SIZE}`;
    if (page.length === 0) break;
    cursor = page[page.length - 1]?.parentUserId ?? null;
    parentsScanned += page.length;
    notified += await digestBatch(
      page.map((row) => row.parentUserId),
      kinds,
      runDate,
      now,
    );
    if (page.length < BATCH_SIZE) break;
  }
  return { runDate, kinds, parentsScanned, notified };
}

/** Entitlement lookups in flight at once (each is a few indexed reads, cached per user for a minute). */
const ENTITLEMENT_CONCURRENCY = 20;

/** The students (of `studentIds`) whose own plan includes detailed parent reports (§31 `parentReports`). */
async function childrenWithParentReports(studentIds: readonly string[]): Promise<Set<string>> {
  const unique = [...new Set(studentIds)];
  const out = new Set<string>();
  for (let start = 0; start < unique.length; start += ENTITLEMENT_CONCURRENCY) {
    const chunk = unique.slice(start, start + ENTITLEMENT_CONCURRENCY);
    const flags = await Promise.all(chunk.map((id) => childHasParentReports(id)));
    chunk.forEach((id, index) => {
      if (flags[index]) out.add(id);
    });
  }
  return out;
}

async function digestBatch(parentIds: string[], kinds: DigestKind[], runDate: LocalDate, now: Date): Promise<number> {
  const profiles = await db.profile.findMany({
    where: { userId: { in: parentIds }, user: { status: "ACTIVE", roles: { has: "PARENT" } } },
    select: { userId: true, notificationPrefs: true },
  });
  const wanted = new Map<string, DigestKind>();
  for (const profile of profiles) {
    const preference = readDigestPreference(profile.notificationPrefs);
    if (preference !== "OFF" && kinds.includes(preference)) wanted.set(profile.userId, preference);
  }
  if (wanted.size === 0) return 0;

  const links = await db.parentStudentLink.findMany({
    where: { parentUserId: { in: [...wanted.keys()] }, status: "ACTIVE", studentUserId: { not: null } },
    orderBy: [{ activatedAt: "asc" }, { id: "asc" }],
    select: {
      parentUserId: true,
      studentUserId: true,
      canViewProgress: true,
      canViewStudyActivity: true,
      canViewTestResults: true,
      student: { select: { status: true, profile: { select: { displayName: true, firstName: true, lastName: true } } } },
    },
  });

  const reportable = await childrenWithParentReports(
    links.filter((link) => link.student?.status === "ACTIVE").map((link) => link.studentUserId as string),
  );

  let notified = 0;
  for (const kind of kinds) {
    const parents = [...wanted].filter(([, preference]) => preference === kind).map(([id]) => id);
    if (parents.length === 0) continue;
    const kindLinks = links.filter(
      (link) =>
        link.parentUserId !== null &&
        parents.includes(link.parentUserId) &&
        link.student?.status === "ACTIVE" &&
        reportable.has(link.studentUserId as string),
    );
    const window = { from: addDays(runDate, -(digestWindowDays(kind) - 1)), to: runDate };
    const activityIds = [...new Set(kindLinks.filter((l) => l.canViewStudyActivity).map((l) => l.studentUserId as string))];
    const resultIds = [...new Set(kindLinks.filter((l) => l.canViewTestResults).map((l) => l.studentUserId as string))];
    const [activity, results] = await Promise.all([
      activityIds.length
        ? db.dailyActivity.groupBy({
            by: ["userId"],
            where: {
              userId: { in: activityIds },
              date: { gte: dateColumnFromLocalDate(window.from), lte: dateColumnFromLocalDate(window.to) },
              OR: [
                { studySeconds: { gt: 0 } },
                { questionsAttempted: { gt: 0 } },
                { flashcardsReviewed: { gt: 0 } },
                { lessonsCompleted: { gt: 0 } },
                { assessmentsCompleted: { gt: 0 } },
              ],
            },
            _sum: { studySeconds: true },
            _count: { _all: true },
          })
        : Promise.resolve([]),
      resultIds.length
        ? db.assessmentAttempt.groupBy({
            by: ["userId"],
            where: {
              userId: { in: resultIds },
              // AssessmentAttempt(userId, startedAt) index.
              startedAt: { gte: startOfLocalDay(window.from, DEFAULT_TIMEZONE), lte: now },
              status: "MARKED",
              mode: { in: [...SCORED_ASSESSMENT_MODES] },
            },
            _count: { _all: true },
            _avg: { percentage: true },
          })
        : Promise.resolve([]),
    ]);
    const activityBy = new Map(activity.map((row) => [row.userId, row]));
    const resultsBy = new Map(results.map((row) => [row.userId, row]));

    for (const parentUserId of parents) {
      const children: DigestChild[] = kindLinks
        .filter((link) => link.parentUserId === parentUserId)
        .map((link) => {
          const studentId = link.studentUserId as string;
          const permissions: LinkPermissions = {
            progress: link.canViewProgress,
            activity: link.canViewStudyActivity,
            results: link.canViewTestResults,
          };
          const act = activityBy.get(studentId);
          const res = resultsBy.get(studentId);
          return {
            name: personName(link.student?.profile, "Your child"),
            permissions,
            ...(permissions.activity
              ? { activity: { minutes: Math.round((act?._sum.studySeconds ?? 0) / 60), activeDays: act?._count._all ?? 0 } }
              : {}),
            ...(permissions.results ? { results: { marked: res?._count._all ?? 0, averagePct: res?._avg.percentage ?? null } } : {}),
          };
        });
      if (children.length === 0) continue;
      const { title, body } = composeDigest(kind, children);
      await createNotification(parentUserId, {
        type: "parent.digest",
        title,
        body,
        data: { href: "/parent", kind },
        dedupeKey: `parent.digest:${kind}:${runDate}`,
      });
      notified += 1;
    }
  }
  return notified;
}
