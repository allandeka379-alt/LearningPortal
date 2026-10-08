import "server-only";
import { z } from "zod";
import type { PresentedFeedback, PresentedQuestion, PresentedReveal } from "@/components/questions/types";
import type { CatalogueStatus, ContentAccessTier, Prisma, QuestionType } from "@/generated/prisma/client";
import { toAnswerReveal, toStudentView, type StudentQuestionView } from "@/lib/questions";
import { LISTED_CATALOGUE_STATUSES } from "@/server/curriculum/core";
import { db } from "@/server/db";
import { AppError } from "@/server/lib/errors";
import { logger } from "@/server/lib/logger";
import { assertAnonymousAnswerAllowed, markAnonymousAnswer, type PublicAnswerContext } from "@/server/marketing/daily";
import { loadRevealAssets, presentQuestions, presentReveal } from "@/server/practice/present";
import { getQuestionsForAttempt, type AttemptQuestion } from "@/server/questions/repository";

/**
 * Free sample questions for public pages (§44, ARCHITECTURE §3.3: "1–3 free sample questions"; "never shows answer
 * explanations beyond samples"). Two kinds:
 *
 * - STATIC samples (subject pages, {@link loadSampleQuestions}): `accessTier = PUBLIC` only, with the answer and
 *   explanation revealed on the page behind a native `<details>` (no client JavaScript).
 * - PRACTICE samples (topic pages, {@link loadPracticeSamples}): PUBLIC or FREE (product decision: FREE content may be
 *   shown publicly as a sample; PREMIUM never). Only the answer-free question reaches the page; the answer and
 *   explanation come back from {@link answerSampleQuestion}, the same rate-limited, nothing-stored anonymous marking
 *   as the public daily question, so FREE answers are never in the HTML.
 *
 * Either way only questions an anonymous visitor may see are loaded: PUBLISHED, live (not a draft copy), root (not a
 * part), platform bank (no school / tutor owner).
 */

/** Root types that render well without the interactive answer UI. */
export const SAMPLE_QUESTION_TYPES = [
  "MULTIPLE_CHOICE",
  "TRUE_FALSE",
  "SHORT_ANSWER",
  "NUMERICAL",
  "CALCULATION",
  "STRUCTURED",
  "ESSAY",
  "EXTENDED_RESPONSE",
] as const satisfies readonly QuestionType[];

export const MAX_SAMPLE_QUESTIONS = 3;

export interface SampleQuestion {
  /** Rendered, answer-free question (stems, options). */
  question: PresentedQuestion;
  /** Correct answer, explanation, worked solution and mark scheme (PUBLIC questions only). */
  reveal: PresentedReveal;
  difficulty: number;
  isExamStyle: boolean;
}

export interface SampleQuestionScope {
  /** The syllabus version whose topic tags count (the subject's CURRENT version). */
  syllabusId: string;
  /** Restrict to these topic nodes (a topic and its subtree); omit for the whole syllabus. */
  topicIds?: readonly string[];
  limit: number;
}

/** Static samples reveal their answer in the HTML: PUBLIC only. */
export const STATIC_SAMPLE_TIERS = ["PUBLIC"] as const satisfies readonly ContentAccessTier[];
/** Practice samples are answered through anonymous marking: PUBLIC or FREE, never PREMIUM. */
export const PRACTICE_SAMPLE_TIERS = ["PUBLIC", "FREE"] as const satisfies readonly ContentAccessTier[];

/** Platform-bank, live, published root questions of a type the sample renderers support. */
function sampleWhere(tiers: readonly ContentAccessTier[]) {
  return {
    accessTier: { in: [...tiers] },
    status: "PUBLISHED",
    draftOfId: null,
    parentId: null,
    schoolId: null,
    ownerUserId: null,
    type: { in: [...SAMPLE_QUESTION_TYPES] },
  } satisfies Prisma.QuestionWhereInput;
}

/**
 * Ids of sample questions in scope, best first: PUBLIC before FREE (editors mark PUBLIC what they want shown), then
 * exam style, then easier, then oldest.
 */
async function sampleQuestionIds(scope: SampleQuestionScope, tiers: readonly ContentAccessTier[]): Promise<string[]> {
  const rows = await db.question.findMany({
    where: {
      ...sampleWhere(tiers),
      topics: { some: { syllabusId: scope.syllabusId, ...(scope.topicIds ? { topicId: { in: [...scope.topicIds] } } : {}) } },
    },
    select: { id: true },
    orderBy: [{ accessTier: "asc" }, { isExamStyle: "desc" }, { difficulty: "asc" }, { id: "asc" }],
    take: Math.min(Math.max(scope.limit, 0), MAX_SAMPLE_QUESTIONS),
  });
  return rows.map((row) => row.id);
}

/** Loads questions by id and keeps those whose stored payload yields a student view (invalid ones are logged). */
async function loadViews(ids: readonly string[], scope: SampleQuestionScope, tiers: readonly ContentAccessTier[]) {
  if (ids.length === 0) return [];
  const loaded = await getQuestionsForAttempt(ids, { syllabusId: scope.syllabusId });
  // Defence in depth: re-check the tier and tenancy on what was actually loaded.
  const questions = loaded.filter((question) => tiers.includes(question.accessTier) && question.schoolId === null && question.ownerUserId === null);
  const usable: { question: AttemptQuestion; view: StudentQuestionView }[] = [];
  for (const question of questions) {
    try {
      usable.push({ question, view: toStudentView(question) });
    } catch (error) {
      logger.warn("seo.sample_question.invalid", { questionId: question.id, err: error });
    }
  }
  return usable;
}

/**
 * Loads and presents up to `limit` STATIC (PUBLIC-tier) sample questions with their answer reveal. A question whose
 * stored payload is invalid is skipped and logged (never shown half-broken).
 */
export async function loadSampleQuestions(scope: SampleQuestionScope): Promise<SampleQuestion[]> {
  if (scope.limit <= 0 || (scope.topicIds && scope.topicIds.length === 0)) return [];
  const usable = await loadViews(await sampleQuestionIds(scope, STATIC_SAMPLE_TIERS), scope, STATIC_SAMPLE_TIERS);
  if (usable.length === 0) return [];

  const reveals = usable.map(({ question }) => toAnswerReveal(question));
  const [presented, revealAssets] = await Promise.all([presentQuestions(usable.map(({ view }) => view)), loadRevealAssets(reveals)]);
  return usable.flatMap(({ question }, index) => {
    const view = presented[index];
    const reveal = reveals[index];
    if (!view || !reveal) return [];
    return [
      {
        question: view,
        reveal: presentReveal(reveal, new Map(), revealAssets),
        difficulty: question.difficulty,
        isExamStyle: question.isExamStyle,
      },
    ];
  });
}

/** A sample the visitor answers on the page (no answer data: the reveal comes from {@link answerSampleQuestion}). */
export interface PracticeSample {
  /** Rendered, answer-free question (stems, options). Its `id` is what the answer action receives. */
  question: PresentedQuestion;
  difficulty: number;
  isExamStyle: boolean;
}

/** Loads and presents up to `limit` PRACTICE samples (PUBLIC first, then FREE; never PREMIUM). */
export async function loadPracticeSamples(scope: SampleQuestionScope): Promise<PracticeSample[]> {
  if (scope.limit <= 0 || (scope.topicIds && scope.topicIds.length === 0)) return [];
  const usable = await loadViews(await sampleQuestionIds(scope, PRACTICE_SAMPLE_TIERS), scope, PRACTICE_SAMPLE_TIERS);
  if (usable.length === 0) return [];
  const presented = await presentQuestions(usable.map(({ view }) => view));
  return usable.flatMap(({ question }, index) => {
    const view = presented[index];
    return view ? [{ question: view, difficulty: question.difficulty, isExamStyle: question.isExamStyle }] : [];
  });
}

const LISTED: { in: CatalogueStatus[] } = { in: [...LISTED_CATALOGUE_STATUSES] };

/**
 * Where a practice sample may be answered: a PUBLIC/FREE platform question tagged in the CURRENT syllabus of a listed,
 * public subject of a listed qualification and board, i.e. one that some public topic page could show.
 */
function answerableSampleWhere(questionId: string): Prisma.QuestionWhereInput {
  return {
    id: questionId,
    ...sampleWhere(PRACTICE_SAMPLE_TIERS),
    topics: {
      some: {
        syllabus: {
          status: "CURRENT",
          subject: { isPublic: true, catalogueStatus: LISTED, qualification: { catalogueStatus: LISTED, examBoard: { catalogueStatus: LISTED } } },
        },
      },
    },
  };
}

export const sampleAnswerSchema = z.object({
  questionId: z.uuid({ error: "This question is not available." }),
  response: z.unknown(),
});

export type SampleAnswerInput = z.input<typeof sampleAnswerSchema>;

const SAMPLE_NOT_AVAILABLE = "This sample question has changed. Reload the page to try the current one.";

/**
 * Marks an anonymous answer to a practice sample (topic pages, §44/§46) and returns the feedback, exactly like the public
 * daily question: deterministic marking, the shared per-IP anonymous budget, nothing stored.
 *
 * @throws AppError VALIDATION (malformed input, no answer, answer too long) | RATE_LIMITED | NOT_FOUND (unknown id,
 *   PREMIUM, school / tutor question, draft or archived, not on any public subject)
 */
export async function answerSampleQuestion(input: unknown, context: PublicAnswerContext): Promise<PresentedFeedback> {
  const parsed = sampleAnswerSchema.safeParse(input);
  if (!parsed.success) throw AppError.fromZod(parsed.error);
  const { questionId, response } = parsed.data;
  await assertAnonymousAnswerAllowed(response, context.ip);

  const client = context.client ?? db;
  const eligible = await client.question.findFirst({ where: answerableSampleWhere(questionId), select: { id: true } });
  if (!eligible) throw AppError.notFound(SAMPLE_NOT_AVAILABLE);

  const [question] = await getQuestionsForAttempt([questionId], { client });
  const tiers: readonly ContentAccessTier[] = PRACTICE_SAMPLE_TIERS;
  if (!question || !tiers.includes(question.accessTier) || question.schoolId !== null || question.ownerUserId !== null) {
    throw AppError.notFound(SAMPLE_NOT_AVAILABLE);
  }
  return markAnonymousAnswer(question, response);
}
