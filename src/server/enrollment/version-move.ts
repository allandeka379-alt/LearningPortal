import "server-only";
import { z } from "zod";
import type { EnrollmentStatus, Prisma, SyllabusStatus } from "@/generated/prisma/client";
import { localDateFromDateColumn, type LocalDate } from "@/lib/dates";
import { hasPermission } from "@/server/auth/permissions";
import { PUBLISHED_SYLLABUS_STATUSES } from "@/server/curriculum/core";
import { db, type DbClient } from "@/server/db";
import { AUDIT_ACTIONS, auditInTx, type AuditRequestInfo } from "@/server/lib/audit";
import { AppError } from "@/server/lib/errors";
import { refreshSubjectProgress } from "@/server/progress/service";
import { requestPlanAdaptation } from "@/server/studyplan/service";
import type { EnrollmentActor } from "./service";
import {
  mapTopicLineage,
  newerCurrentVersion,
  pickTargetRoute,
  planChoiceCarryOver,
  planMasteryCarryOver,
  versionCoversDate,
  type CarriedMastery,
  type SourceMastery,
  type TargetTopic,
  type VersionFacts,
} from "./version-move-core";

/**
 * "A newer syllabus is available" (§26, ARCHITECTURE §4.3): a student pinned to an older syllabus version chooses to
 * move one subject enrolment to the subject's CURRENT version.
 *
 * The move is ONE transaction under a row lock on the enrolment:
 *   1. the enrolment's optional-topic choices are deleted (their composite FK forbids a version mismatch) and re-made
 *      for the new version where the chosen topic still exists as an optional topic (lineage);
 *   2. the pin moves: `syllabusId`, the award route (same code, else the default route) and a strictly later
 *      `syllabusPinnedAt` (the `SubjectEnrollment_pin_guard` trigger refuses a move that does not advance it, and any
 *      DRAFT / ARCHIVED target);
 *   3. mastery carries over: each LEAF topic of the new version that descends (`Topic.originTopicId`, through any
 *      intermediate versions) from a practised topic of the old version gets a copy of that evidence. Old-version rows
 *      are never touched: they stay as history (every read filters the pinned version);
 *   4. SubjectProgress and the ancestor rollup rows are recomputed for the new version, the study plan is queued for
 *      adaptation, and the move is audited (`enrollment.syllabus_move`) in the same transaction.
 *
 * Attempts, results, flashcards and study time are per subject, not per version, and are unaffected.
 */

const uuid = z.uuid();

export const moveSyllabusSchema = z.strictObject({
  subjectId: uuid,
  /** The version the student saw as pinned (stale-form guard: a second submit after a move is refused). */
  fromSyllabusId: uuid,
  /** The CURRENT version offered. */
  toSyllabusId: uuid,
});
export type MoveSyllabusInput = z.input<typeof moveSyllabusSchema>;

export interface SyllabusVersionSummary {
  id: string;
  title: string;
  versionLabel: string;
  status: SyllabusStatus;
  effectiveFrom: LocalDate;
  effectiveTo: LocalDate | null;
}

/** What the subject page shows when a newer version is available. */
export interface SyllabusUpgradeOffer {
  subjectId: string;
  enrollmentStatus: EnrollmentStatus;
  pinned: SyllabusVersionSummary;
  current: SyllabusVersionSummary;
  /** Practised topics of the pinned version (leaf evidence). */
  practisedTopics: number;
  /** Topics of the new version that would start with carried-over progress. */
  carriedTopics: number;
  /** Optional-topic choices that have no equivalent in the new version (to choose again). */
  droppedChoices: number;
  /** The student's target examination, when the new version does not cover its date (moving is then usually wrong). */
  examWarning: { sessionName: string; startsOn: LocalDate; coveredByPinned: boolean } | null;
}

export interface SyllabusMoveResult {
  enrollmentId: string;
  subjectId: string;
  from: { id: string; versionLabel: string };
  to: { id: string; versionLabel: string };
  carriedTopics: number;
  carriedChoices: number;
  droppedChoices: number;
  routeId: string | null;
}

function assertStudent(actor: EnrollmentActor): void {
  if (!hasPermission({ roles: [...actor.roles] }, "learn.study", "all")) {
    throw AppError.forbidden("Only students can change their syllabus version.");
  }
}

const VERSION_SELECT = {
  id: true,
  title: true,
  versionLabel: true,
  status: true,
  effectiveFrom: true,
  effectiveTo: true,
  supersedesId: true,
} as const satisfies Prisma.SyllabusSelect;

type VersionRow = Prisma.SyllabusGetPayload<{ select: typeof VERSION_SELECT }>;

function versionFacts(row: VersionRow): VersionFacts & SyllabusVersionSummary {
  return {
    id: row.id,
    title: row.title,
    versionLabel: row.versionLabel,
    status: row.status,
    effectiveFrom: localDateFromDateColumn(row.effectiveFrom),
    effectiveTo: row.effectiveTo ? localDateFromDateColumn(row.effectiveTo) : null,
    supersedesId: row.supersedesId,
  };
}

function summary(version: SyllabusVersionSummary): SyllabusVersionSummary {
  return {
    id: version.id,
    title: version.title,
    versionLabel: version.versionLabel,
    status: version.status,
    effectiveFrom: version.effectiveFrom,
    effectiveTo: version.effectiveTo,
  };
}

const ENROLLMENT_SELECT = {
  id: true,
  status: true,
  syllabusId: true,
  routeId: true,
  syllabusPinnedAt: true,
  route: { select: { code: true } },
  targetExamSession: { select: { name: true, startsOn: true } },
  topicChoices: { select: { topicId: true } },
  syllabus: { select: VERSION_SELECT },
} as const satisfies Prisma.SubjectEnrollmentSelect;

const MASTERY_SELECT = {
  topicId: true,
  isLeaf: true,
  score: true,
  recentAccuracy: true,
  questionsAttempted: true,
  questionsCorrect: true,
  marksAwarded: true,
  marksAvailable: true,
  currentDifficulty: true,
  consecutiveCorrect: true,
  consecutiveIncorrect: true,
  algorithmVersion: true,
  firstPracticedAt: true,
  lastPracticedAt: true,
  nextReviewAt: true,
  remediationStartedAt: true,
  seededByDiagnostic: true,
} as const satisfies Prisma.TopicMasterySelect;

interface MovePlan {
  enrollment: Prisma.SubjectEnrollmentGetPayload<{ select: typeof ENROLLMENT_SELECT }>;
  pinned: VersionFacts & SyllabusVersionSummary;
  target: (VersionFacts & SyllabusVersionSummary) | null;
  sourceRows: SourceMastery[];
  carried: CarriedMastery[];
  choices: { carried: string[]; dropped: string[] };
  routeId: string | null;
}

/**
 * Loads everything the move needs and plans it (pure core). `client` is the move transaction (rows locked by the
 * caller) or the plain client for the read-only offer. Sequential queries: a transaction has one connection.
 */
async function planMove(client: DbClient, userId: string, subjectId: string): Promise<MovePlan | null> {
  const enrollment = await client.subjectEnrollment.findUnique({ where: { userId_subjectId: { userId, subjectId } }, select: ENROLLMENT_SELECT });
  if (!enrollment) return null;
  const pinned = versionFacts(enrollment.syllabus);
  const versionRows = await client.syllabus.findMany({
    where: { subjectId, status: { in: [...PUBLISHED_SYLLABUS_STATUSES] } },
    select: VERSION_SELECT,
  });
  const target = newerCurrentVersion(pinned, versionRows.map(versionFacts));
  const base: MovePlan = { enrollment, pinned, target, sourceRows: [], carried: [], choices: { carried: [], dropped: [] }, routeId: null };
  if (!target) return base;

  // Every topic of the subject's versions: lineage may run through intermediate versions (v1 → v2 → v3).
  const topics = await client.topic.findMany({
    where: { syllabus: { subjectId } },
    select: { id: true, syllabusId: true, originTopicId: true, parentId: true, kind: true, depth: true, isOptional: true },
  });
  const lineage = mapTopicLineage(target.id, pinned.id, topics);
  const parents = new Set(topics.filter((topic) => topic.syllabusId === target.id && topic.parentId !== null).map((topic) => topic.parentId));
  const targetTopics: TargetTopic[] = topics
    .filter((topic) => topic.syllabusId === target.id)
    .map((topic) => ({ id: topic.id, kind: topic.kind, depth: topic.depth, isLeaf: !parents.has(topic.id), isOptional: topic.isOptional }));

  const sourceRows = await client.topicMastery.findMany({ where: { userId, subjectId, syllabusId: pinned.id }, select: MASTERY_SELECT });
  const existing = await client.topicMastery.findMany({ where: { userId, subjectId, syllabusId: target.id }, select: { topicId: true } });
  const carried = planMasteryCarryOver({
    lineage,
    sourceRows,
    targetTopics,
    existingTargetTopicIds: new Set(existing.map((row) => row.topicId)),
  });
  const choices = planChoiceCarryOver({ lineage, chosenSourceTopicIds: enrollment.topicChoices.map((c) => c.topicId), targetTopics });
  const routes = await client.syllabusRoute.findMany({ where: { syllabusId: target.id }, select: { id: true, code: true, isDefault: true } });
  const routeId = pickTargetRoute(enrollment.route?.code ?? null, routes);
  return { enrollment, pinned, target, sourceRows, carried, choices, routeId };
}

function examWarningFor(plan: MovePlan): SyllabusUpgradeOffer["examWarning"] {
  const session = plan.enrollment.targetExamSession;
  if (!session || !plan.target) return null;
  const startsOn = localDateFromDateColumn(session.startsOn);
  if (versionCoversDate(plan.target, startsOn)) return null;
  return { sessionName: session.name, startsOn, coveredByPinned: versionCoversDate(plan.pinned, startsOn) };
}

/**
 * The "newer syllabus available" offer for the student's enrolment in `subjectId`, or null when there is none (not
 * enrolled, dropped, already on the current version, or the current version is not newer). Read-only.
 *
 * @throws AppError FORBIDDEN (not a student) | VALIDATION (malformed id)
 */
export async function getSyllabusUpgradeOffer(actor: EnrollmentActor, subjectId: string): Promise<SyllabusUpgradeOffer | null> {
  assertStudent(actor);
  if (!uuid.safeParse(subjectId).success) throw AppError.validation({ subjectId: ["Invalid subject."] });
  // Cheap pre-check first: most students are on the current version and never pay for the lineage queries.
  const pin = await db.subjectEnrollment.findUnique({
    where: { userId_subjectId: { userId: actor.userId, subjectId } },
    select: { status: true, syllabus: { select: { status: true } } },
  });
  if (!pin || pin.status === "DROPPED" || !(pin.syllabus.status === "SUPERSEDED" || pin.syllabus.status === "ARCHIVED")) return null;

  const plan = await planMove(db, actor.userId, subjectId);
  if (!plan?.target) return null;
  return {
    subjectId,
    enrollmentStatus: plan.enrollment.status,
    pinned: summary(plan.pinned),
    current: summary(plan.target),
    practisedTopics: plan.sourceRows.filter((row) => row.isLeaf && row.questionsAttempted > 0).length,
    carriedTopics: plan.carried.length,
    droppedChoices: plan.choices.dropped.length,
    examWarning: examWarningFor(plan),
  };
}

const TX_OPTIONS = { maxWait: 10_000, timeout: 30_000 } as const;

/**
 * Moves the student's enrolment in a subject to the subject's CURRENT syllabus version (see the module comment).
 *
 * @throws AppError FORBIDDEN (not a student) | VALIDATION | NOT_FOUND (not enrolled) | CONFLICT (dropped subject, no
 *         newer version, or the form is stale: already moved / a different version became current)
 */
export async function moveEnrollmentToCurrentSyllabus(
  actor: EnrollmentActor & { timeZone?: string },
  input: MoveSyllabusInput,
  options: { now?: Date; request?: AuditRequestInfo | null } = {},
): Promise<SyllabusMoveResult> {
  assertStudent(actor);
  const parsed = moveSyllabusSchema.safeParse(input);
  if (!parsed.success) throw AppError.fromZod(parsed.error);
  const { subjectId, fromSyllabusId, toSyllabusId } = parsed.data;
  const now = options.now ?? new Date();

  return db.$transaction(async (tx) => {
    // Serialises concurrent submits (two tabs) and answers being folded into mastery for this enrolment.
    const locked = await tx.$queryRaw<{ id: string }[]>`
      SELECT "id" FROM "SubjectEnrollment" WHERE "userId" = ${actor.userId}::uuid AND "subjectId" = ${subjectId}::uuid FOR UPDATE`;
    if (locked.length === 0) throw AppError.notFound("You're not enrolled in this subject.");

    const plan = await planMove(tx, actor.userId, subjectId);
    if (!plan) throw AppError.notFound("You're not enrolled in this subject.");
    const { enrollment, pinned, target } = plan;
    if (enrollment.status === "DROPPED") throw AppError.conflict("Add this subject again before changing its syllabus version.");
    if (enrollment.syllabusId !== fromSyllabusId) {
      throw AppError.conflict(enrollment.syllabusId === toSyllabusId ? "You are already on this syllabus version." : "Your syllabus version changed. Reload the page.");
    }
    if (!target) throw AppError.conflict("There is no newer syllabus version for this subject.");
    if (target.id !== toSyllabusId) throw AppError.conflict("A different syllabus version is now current. Reload the page.");

    // 1. Choices reference (enrollmentId, syllabusId) with ON UPDATE RESTRICT: they go before the pin moves.
    await tx.enrollmentTopicChoice.deleteMany({ where: { enrollmentId: enrollment.id } });

    // 2. The pin. The trigger requires syllabusPinnedAt to advance strictly (clock skew or a same-millisecond pin).
    const pinnedAt = new Date(Math.max(now.getTime(), enrollment.syllabusPinnedAt.getTime() + 1));
    await tx.subjectEnrollment.update({
      where: { id: enrollment.id },
      data: { syllabusId: target.id, routeId: plan.routeId, syllabusPinnedAt: pinnedAt },
    });

    // 3. Carried-over mastery (new rows in the new version; old rows stay as history).
    if (plan.carried.length > 0) {
      await tx.topicMastery.createMany({
        data: plan.carried.map((row) => ({
          userId: actor.userId,
          subjectId,
          syllabusId: target.id,
          topicId: row.topicId,
          topicKind: row.topicKind,
          topicDepth: row.topicDepth,
          isLeaf: true,
          score: row.score,
          band: row.band,
          recentAccuracy: row.recentAccuracy,
          questionsAttempted: row.questionsAttempted,
          questionsCorrect: row.questionsCorrect,
          marksAwarded: row.marksAwarded,
          marksAvailable: row.marksAvailable,
          currentDifficulty: row.currentDifficulty,
          consecutiveCorrect: Math.min(32_767, row.consecutiveCorrect),
          consecutiveIncorrect: Math.min(32_767, row.consecutiveIncorrect),
          algorithmVersion: row.algorithmVersion,
          firstPracticedAt: row.firstPracticedAt,
          lastPracticedAt: row.lastPracticedAt,
          nextReviewAt: row.nextReviewAt,
          remediationStartedAt: row.remediationStartedAt,
          seededByDiagnostic: row.seededByDiagnostic,
          createdAt: now,
        })),
        skipDuplicates: true,
      });
    }
    if (plan.choices.carried.length > 0) {
      await tx.enrollmentTopicChoice.createMany({
        data: plan.choices.carried.map((topicId) => ({ enrollmentId: enrollment.id, topicId, syllabusId: target.id, createdAt: now })),
        skipDuplicates: true,
      });
    }

    // 4. Rollups for the new version, plan adaptation, audit.
    await refreshSubjectProgress(tx, actor.userId, subjectId, { now });
    await requestPlanAdaptation(tx, actor.userId, { now, ...(actor.timeZone ? { timeZone: actor.timeZone } : {}) });
    await auditInTx(tx, {
      actorUserId: actor.userId,
      actorRoles: actor.roles,
      action: AUDIT_ACTIONS.ENROLLMENT_SYLLABUS_MOVE,
      entityType: "SubjectEnrollment",
      entityId: enrollment.id,
      targetUserId: actor.userId,
      before: { syllabusId: pinned.id, versionLabel: pinned.versionLabel, routeId: enrollment.routeId, syllabusPinnedAt: enrollment.syllabusPinnedAt.toISOString() },
      after: { syllabusId: target.id, versionLabel: target.versionLabel, routeId: plan.routeId, syllabusPinnedAt: pinnedAt.toISOString() },
      metadata: {
        subjectId,
        carriedTopics: plan.carried.length,
        carriedChoices: plan.choices.carried.length,
        droppedChoices: plan.choices.dropped.length,
      },
      request: options.request ?? null,
    });

    return {
      enrollmentId: enrollment.id,
      subjectId,
      from: { id: pinned.id, versionLabel: pinned.versionLabel },
      to: { id: target.id, versionLabel: target.versionLabel },
      carriedTopics: plan.carried.length,
      carriedChoices: plan.choices.carried.length,
      droppedChoices: plan.choices.dropped.length,
      routeId: plan.routeId,
    };
  }, TX_OPTIONS);
}
