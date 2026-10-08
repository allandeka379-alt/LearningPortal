import "server-only";
import type { AbilityLevel, AssessmentAssembly, ContentAccessTier, QuestionType } from "@/generated/prisma/client";
import { createRng, selectQuestions, shuffled, type CandidateQuestion, type DifficultyMode } from "@/server/adaptive/core";
import { dateColumnFromLocalDate, localDateString } from "@/lib/dates";
import type { DbClient } from "@/server/db";
import { AppError } from "@/server/lib/errors";
import { logger } from "@/server/lib/logger";
import { loadMasteryStates } from "@/server/progress/service";
import { candidatePool, type QuestionTenancy } from "@/server/questions";
import type { Difficulty } from "@/server/progress/core";
import { diagnosticDifficultyTargets, planDiagnosticQuestions } from "./policy";

/**
 * Which questions an attempt contains (§10 practice sessions, §11 adaptive selection, §12 assessments, §46 daily
 * question, §52 diagnostic). Reads only: the plan is turned into rows by start.ts.
 *
 * - Generated modes (PRACTICE, RETEST, generated TIMED_EXAM): `candidatePool` (PUBLISHED platform questions tagged in
 *   the PINNED syllabus version, narrowed to the access tiers the student may use) → adaptive `selectQuestions` (topic
 *   weights from mastery, difficulty targeting, recently-seen avoidance).
 * - Generated DIAGNOSTIC ({@link planDiagnostic}): the same pool, but placed rather than adapted (§52): coverage across
 *   top-level topics first, then their leaves, at a third each below / at / above the self-reported ability
 *   (`planDiagnosticQuestions` in ./policy). Mastery is ignored.
 * - Assessments: fixed items in section order, plus blueprint rules (BLUEPRINT / ADAPTIVE assembly: assembled once
 *   at start from the rule's topic subtree or learning objective, difficulty window, type, cognitive skill, marks per
 *   question and exam-style filter, exactly what the admin builder validates (src/server/cms/assessments/service.ts
 *   `ruleCandidates`); seeded so a resumed attempt never changes). `shuffleQuestions` shuffles within each section
 *   with the attempt seed.
 * - LESSON_CHECK: the lesson's linked practice questions; DAILY_QUESTION: today's DailyQuestion.
 */

export interface PlannedSlot {
  questionId: string;
  /** Section number (1-based, by AssessmentSection.sortOrder) for assessment attempts. */
  sectionNumber: number | null;
  /** AssessmentItem.marks override; null = the question's marks. */
  marks: number | null;
  /** Topic the selector chose the question under (fallback for QuestionAttempt.topicId). */
  candidateTopicId: string | null;
  /** Seen before by the student (null = unknown; resolved by the caller). */
  isRepeat: boolean | null;
}

export interface PlannedSection {
  sectionNumber: number;
  title: string;
  /** Base per-paper limit (before extra time). */
  timeLimitSeconds: number | null;
  answerCount: number | null;
  maxMarks: number | null;
}

export interface SelectionPlan {
  slots: PlannedSlot[];
  sections: PlannedSection[];
  /** Requested minus selected. */
  shortfall: number;
}

/** Topic ids of `syllabusId` named in `topicIds` plus all their descendants (materialised path). */
export async function expandTopicScope(client: DbClient, syllabusId: string, topicIds: readonly string[]): Promise<string[]> {
  if (topicIds.length === 0) return [];
  const roots = await client.topic.findMany({ where: { id: { in: [...new Set(topicIds)] }, syllabusId }, select: { id: true, path: true } });
  if (roots.length !== new Set(topicIds).size) {
    throw AppError.validation({ topicIds: ["Choose topics from your syllabus."] });
  }
  const descendants = await client.topic.findMany({
    where: { syllabusId, OR: roots.map((r) => ({ path: { startsWith: `${r.path}/` } })) },
    select: { id: true },
  });
  return [...new Set([...roots.map((r) => r.id), ...descendants.map((d) => d.id)])];
}

/** Question ids the student has been presented before (QuestionAttempt (userId, …) index). */
export async function previouslySeen(client: DbClient, userId: string, questionIds: readonly string[]): Promise<Set<string>> {
  if (questionIds.length === 0) return new Set();
  const rows = await client.$queryRaw<{ questionId: string }[]>`
    SELECT DISTINCT qa."questionId"::text AS "questionId"
    FROM "QuestionAttempt" qa
    WHERE qa."userId" = ${userId}::uuid AND qa."questionId" = ANY(${[...new Set(questionIds)]}::uuid[])`;
  return new Set(rows.map((r) => r.questionId));
}

const POOL_LIMIT = 1_000;

export interface GeneratedPlanInput {
  userId: string;
  subjectId: string;
  syllabusId: string;
  /** Expanded topic scope; empty = the whole pinned version. */
  topicIds: readonly string[];
  count: number;
  difficulty: DifficultyMode;
  /** Highest access tier the student may use (null = all). */
  accessTier: ContentAccessTier | null;
  seed: string;
  now: Date;
  initialDifficulty: Difficulty;
  /** Use the student's mastery to weight topics (false: even coverage). Diagnostics use {@link planDiagnostic}. */
  useMastery: boolean;
  types?: readonly QuestionType[];
}

/** Adaptive generated session (module header). */
export async function planGenerated(client: DbClient, input: GeneratedPlanInput): Promise<SelectionPlan> {
  const pool = await candidatePool(
    {
      subjectId: input.subjectId,
      syllabusId: input.syllabusId,
      ...(input.topicIds.length > 0 ? { topicIds: [...input.topicIds] } : {}),
      ...(input.types ? { types: [...input.types] } : {}),
      limit: POOL_LIMIT,
      ...(input.accessTier ? { accessTier: input.accessTier } : {}),
      userId: input.userId,
      seed: input.seed,
    },
    client,
  );
  const mastery = input.useMastery ? await loadMasteryStates(client, input.userId, [...new Set(pool.map((c) => c.topicId))], input.now) : new Map();
  const result = selectQuestions({
    pool,
    mastery,
    request: { count: input.count, difficulty: input.difficulty },
    seed: input.seed,
    now: input.now,
    config: { initialDifficulty: input.initialDifficulty },
  });
  const byId = new Map(pool.map((c) => [c.id, c]));
  return {
    slots: result.items.map((item) => ({
      questionId: item.questionId,
      sectionNumber: null,
      marks: null,
      candidateTopicId: item.topicId,
      isRepeat: (byId.get(item.questionId)?.timesSeen ?? 0) > 0,
    })),
    sections: [],
    shortfall: Math.max(0, input.count - result.items.length),
  };
}

export interface DiagnosticPlanInput {
  userId: string;
  subjectId: string;
  syllabusId: string;
  /** Expanded topic scope; empty = the whole pinned version. */
  topicIds: readonly string[];
  count: number;
  /** Self-reported ability on the enrolment (null = unknown: centred on the middle level). */
  abilityLevel: AbilityLevel | null;
  accessTier: ContentAccessTier | null;
  seed: string;
}

/** A generated diagnostic (module header): spread over top-level topics, then leaves, around the student's ability. */
export async function planDiagnostic(client: DbClient, input: DiagnosticPlanInput): Promise<SelectionPlan> {
  const pool = await candidatePool(
    {
      subjectId: input.subjectId,
      syllabusId: input.syllabusId,
      ...(input.topicIds.length > 0 ? { topicIds: [...input.topicIds] } : {}),
      limit: POOL_LIMIT,
      ...(input.accessTier ? { accessTier: input.accessTier } : {}),
      userId: input.userId,
      seed: input.seed,
    },
    client,
  );
  const topicIds = [...new Set(pool.map((c) => c.topicId))];
  const topics = topicIds.length ? await client.topic.findMany({ where: { id: { in: topicIds }, syllabusId: input.syllabusId }, select: { id: true, path: true } }) : [];
  const rootOf = new Map(topics.map((t) => [t.id, t.path.split("/").find((segment) => segment !== "") ?? t.id]));
  const picks = planDiagnosticQuestions(
    pool.map((c) => ({ id: c.id, topicId: c.topicId, rootTopicId: rootOf.get(c.topicId) ?? c.topicId, difficulty: c.difficulty, timesSeen: c.timesSeen })),
    diagnosticDifficultyTargets(input.abilityLevel, input.count),
    input.seed,
  );
  const seen = new Map(pool.map((c) => [c.id, c.timesSeen]));
  return {
    slots: picks.map((pick) => ({
      questionId: pick.questionId,
      sectionNumber: null,
      marks: null,
      candidateTopicId: pick.topicId,
      isRepeat: (seen.get(pick.questionId) ?? 0) > 0,
    })),
    sections: [],
    shortfall: Math.max(0, input.count - picks.length),
  };
}

/** Leaf topics whose re-test is due (§11 "re-test later"), most overdue first. */
export async function dueRetestTopics(client: DbClient, userId: string, subjectId: string, syllabusId: string, now: Date, limit = 5): Promise<string[]> {
  const rows = await client.topicMastery.findMany({
    where: { userId, subjectId, syllabusId, isLeaf: true, questionsAttempted: { gt: 0 }, nextReviewAt: { lte: now } },
    orderBy: [{ nextReviewAt: "asc" }, { topicId: "asc" }],
    take: limit,
    select: { topicId: true },
  });
  return rows.map((r) => r.topicId);
}

/** The lesson's linked practice questions in order (§8). */
export async function planLessonCheck(client: DbClient, lessonId: string, subjectId: string): Promise<SelectionPlan & { lessonId: string }> {
  const lesson = await client.lesson.findFirst({
    where: { id: lessonId, status: "PUBLISHED", draftOfId: null },
    select: { id: true, subjectId: true, practiceLinks: { select: { questionId: true, sortOrder: true }, orderBy: [{ sortOrder: "asc" }, { questionId: "asc" }] } },
  });
  if (!lesson) throw AppError.notFound("Lesson not found.");
  if (lesson.subjectId !== null && lesson.subjectId !== subjectId) throw AppError.validation({ lessonId: ["This lesson belongs to another subject."] });
  return {
    lessonId: lesson.id,
    slots: lesson.practiceLinks.map((l) => ({ questionId: l.questionId, sectionNumber: null, marks: null, candidateTopicId: null, isRepeat: null })),
    sections: [],
    shortfall: 0,
  };
}

/**
 * Today's daily question for the subject's qualification (subject-specific first), or the named one. The date is the
 * student's local day (DailyQuestion dates are calendar days).
 */
export async function resolveDailyQuestion(
  client: DbClient,
  input: { subjectId: string; qualificationId: string; dailyQuestionId?: string; now: Date; timeZone: string },
): Promise<{ id: string; questionId: string; subjectId: string | null }> {
  const today = localDateString(input.now, input.timeZone);
  const rows = await client.dailyQuestion.findMany({
    where: {
      ...(input.dailyQuestionId ? { id: input.dailyQuestionId } : {}),
      qualificationId: input.qualificationId,
      date: dateColumnFromLocalDate(today),
      OR: [{ subjectId: input.subjectId }, { subjectId: null }],
    },
    select: { id: true, questionId: true, subjectId: true },
  });
  const chosen = rows.find((r) => r.subjectId === input.subjectId) ?? rows[0];
  if (!chosen) throw AppError.notFound("There is no daily question for today yet.");
  return chosen;
}

const ASSESSMENT_PLAN_SELECT = {
  id: true,
  assembly: true,
  syllabusId: true,
  shuffleQuestions: true,
  topics: { select: { topicId: true } },
  sections: {
    orderBy: [{ sortOrder: "asc" as const }, { id: "asc" as const }],
    select: {
      id: true,
      title: true,
      timeLimitSeconds: true,
      answerCount: true,
      marks: true,
      items: { orderBy: [{ sortOrder: "asc" as const }, { id: "asc" as const }], select: { questionId: true, marks: true } },
      rules: {
        orderBy: [{ sortOrder: "asc" as const }, { id: "asc" as const }],
        select: {
          topicId: true,
          objectiveId: true,
          includeSubtopics: true,
          questionType: true,
          cognitiveSkill: true,
          difficultyMin: true,
          difficultyMax: true,
          questionCount: true,
          marksPerQuestion: true,
          examStyleOnly: true,
        },
      },
    },
  },
};

export interface AssessmentPlanInput {
  assessmentId: string;
  subjectId: string;
  /** Version used for blueprint pools when the assessment names none (the student's pinned version). */
  fallbackSyllabusId: string;
  userId: string;
  seed: string;
  accessTier: ContentAccessTier | null;
  tenancy: QuestionTenancy | undefined;
}

/** Fixed items + blueprint picks of an assessment, per section (module header). */
export async function planAssessment(client: DbClient, input: AssessmentPlanInput): Promise<SelectionPlan & { assembly: AssessmentAssembly }> {
  const assessment = await client.assessment.findUnique({ where: { id: input.assessmentId }, select: ASSESSMENT_PLAN_SELECT });
  if (!assessment) throw AppError.notFound("Assessment not found.");
  const syllabusId = assessment.syllabusId ?? input.fallbackSyllabusId;
  const random = createRng(input.seed);
  const chosen = new Set<string>();
  const slots: PlannedSlot[] = [];
  const sections: PlannedSection[] = [];
  let shortfall = 0;
  const scopeTopicIds = assessment.topics.length > 0 ? await expandTopicScope(client, syllabusId, assessment.topics.map((t) => t.topicId)).catch(() => []) : [];

  for (const [index, section] of assessment.sections.entries()) {
    const sectionNumber = index + 1;
    const sectionSlots: PlannedSlot[] = [];
    for (const item of section.items) {
      if (chosen.has(item.questionId)) continue;
      chosen.add(item.questionId);
      sectionSlots.push({ questionId: item.questionId, sectionNumber, marks: item.marks, candidateTopicId: null, isRepeat: null });
    }
    if (assessment.assembly !== "FIXED") {
      for (const rule of section.rules) {
        let topicIds: string[] = scopeTopicIds;
        if (rule.topicId) {
          topicIds = rule.includeSubtopics ? await expandTopicScope(client, syllabusId, [rule.topicId]).catch(() => [rule.topicId as string]) : [rule.topicId];
        }
        // Every rule filter is applied in SQL before the seeded sample is taken, so a narrow rule is not starved by a
        // sample of questions it would reject.
        const pool: CandidateQuestion[] = await candidatePool(
          {
            subjectId: input.subjectId,
            syllabusId,
            ...(topicIds.length > 0 ? { topicIds } : {}),
            difficultyRange: { min: rule.difficultyMin, max: rule.difficultyMax },
            ...(rule.questionType ? { types: [rule.questionType] } : {}),
            ...(rule.cognitiveSkill ? { cognitiveSkill: rule.cognitiveSkill } : {}),
            ...(rule.marksPerQuestion ? { marks: rule.marksPerQuestion } : {}),
            ...(rule.objectiveId ? { objectiveIds: [rule.objectiveId] } : {}),
            ...(rule.examStyleOnly ? { examStyleOnly: true } : {}),
            ...(chosen.size > 0 ? { excludeIds: [...chosen] } : {}),
            limit: Math.min(500, rule.questionCount * 10),
            ...(input.accessTier ? { accessTier: input.accessTier } : {}),
            userId: input.userId,
            ...(input.tenancy ? { tenancy: input.tenancy } : {}),
            seed: `${input.seed}:${sectionNumber}`,
          },
          client,
        );
        // Prefer questions the student has not seen; the pool order is already a seeded random sample.
        const ordered = [...pool].sort((a, b) => Number(a.timesSeen > 0) - Number(b.timesSeen > 0));
        const picks = ordered.filter((c) => !chosen.has(c.id)).slice(0, rule.questionCount);
        shortfall += rule.questionCount - picks.length;
        for (const pick of picks) {
          chosen.add(pick.id);
          sectionSlots.push({ questionId: pick.id, sectionNumber, marks: null, candidateTopicId: pick.topicId, isRepeat: pick.timesSeen > 0 });
        }
      }
    }
    slots.push(...(assessment.shuffleQuestions ? shuffled(sectionSlots, random) : sectionSlots));
    sections.push({
      sectionNumber,
      title: section.title.slice(0, 200),
      timeLimitSeconds: section.timeLimitSeconds,
      answerCount: section.answerCount,
      maxMarks: section.marks,
    });
  }
  if (shortfall > 0) logger.warn("attempts: blueprint could not be filled completely", { assessmentId: assessment.id, shortfall });
  return { slots, sections, shortfall, assembly: assessment.assembly };
}
