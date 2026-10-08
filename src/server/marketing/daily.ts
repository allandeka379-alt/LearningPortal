import "server-only";
import { z } from "zod";
import type { CatalogueStatus, ContentAccessTier } from "@/generated/prisma/client";
import type { PresentedFeedback, PresentedQuestion } from "@/components/questions/types";
import { DEFAULT_TIMEZONE } from "@/lib/config";
import { dateColumnFromLocalDate, localDateFromDateColumn, localDateString, type LocalDate } from "@/lib/dates";
import { safeParseResponse, toAnswerReveal, toStudentView, type StudentQuestionView } from "@/lib/questions";
import { LISTED_CATALOGUE_STATUSES } from "@/server/curriculum/core";
import { db, type DbClient } from "@/server/db";
import { AppError } from "@/server/lib/errors";
import { logger } from "@/server/lib/logger";
import { assertRateLimit, rateLimits } from "@/server/lib/rate-limit";
import { markQuestion, toAttemptFeedback } from "@/server/marking";
import { loadRevealAssets, partResultsFrom, presentQuestions, presentReveal } from "@/server/practice/present";
import { getQuestionsForAttempt, type AttemptQuestion } from "@/server/questions";
import type { CatalogueScope } from "./catalogue";
import { qualificationLabel } from "./catalogue-core";
import { isAnswerableDailyDate, publicFeedbackFromMarking } from "./daily-core";

/**
 * The public daily question (§46 free acquisition): today's question(s) per qualification for signed-out visitors,
 * marked server-side with the deterministic marking engine and NEVER stored (no AssessmentAttempt, no streak, no
 * mastery; ARCHITECTURE §3.3). Signed-in students use /app/daily, which records a DAILY_QUESTION attempt.
 *
 * Visibility: PUBLISHED platform-bank questions (no school or tutor questions), scheduled for a LISTED qualification
 * (and, for subject-specific rows, a LISTED subject). PREMIUM-tier questions are not shown publicly (§44 "do not
 * expose premium content"): they remain for signed-in students only.
 *
 * Abuse control: anonymous answers are rate-limited per IP (`rateLimits.dailyQuestionAnon`, ARCHITECTURE §5.5).
 */

const LISTED: { in: CatalogueStatus[] } = { in: [...LISTED_CATALOGUE_STATUSES] };
const PUBLIC_TIERS: ContentAccessTier[] = ["PUBLIC", "FREE"];
/** Daily rows per qualification per day are few (one qualification-wide + one per subject); cap defensively. */
const MAX_QUESTIONS_PER_PAGE = 12;
const MAX_RESPONSE_BYTES = 20_000;

/** Today's calendar date in the platform's default time zone (DailyQuestion.date is a local calendar day). */
export function dailyToday(now: Date = new Date()): LocalDate {
  return localDateString(now, DEFAULT_TIMEZONE);
}

/** Visible-question filter shared by the listing and the answer path. */
function publicDailyWhere(date: LocalDate) {
  return {
    date: dateColumnFromLocalDate(date),
    qualification: { catalogueStatus: LISTED, examBoard: { catalogueStatus: LISTED } },
    OR: [{ subjectId: null }, { subject: { catalogueStatus: LISTED } }],
    question: { status: "PUBLISHED" as const, accessTier: { in: PUBLIC_TIERS }, schoolId: null, ownerUserId: null, parentId: null },
  };
}

export interface DailyQualificationOption {
  qualificationId: string;
  boardSlug: string;
  qualificationSlug: string;
  /** "ZIMSEC O-Level". */
  label: string;
  /** `/daily/[board]/[qualification]`. */
  href: string;
  /** Subjects with a question today (empty for a qualification-wide question only). */
  subjects: string[];
  /** Number of public questions today. */
  questionCount: number;
}

export interface DailyIndex {
  date: LocalDate;
  /** Every listed qualification, in board and qualification order, with today's public question count. */
  options: DailyQualificationOption[];
}

const QUALIFICATION_SELECT = {
  id: true,
  slug: true,
  shortName: true,
  sortOrder: true,
  examBoard: { select: { slug: true, shortName: true, sortOrder: true } },
} as const;

const MAX_QUALIFICATIONS = 500;

/** Listed qualifications of listed boards, as daily-question selector entries (no counts), in board and admin order. */
async function listedQualifications(scope: CatalogueScope, client: DbClient) {
  return client.qualification.findMany({
    where: {
      catalogueStatus: LISTED,
      examBoard: { catalogueStatus: LISTED },
      ...(scope.examBoardIds ? { examBoardId: { in: [...scope.examBoardIds] } } : {}),
    },
    select: QUALIFICATION_SELECT,
    orderBy: [{ examBoard: { sortOrder: "asc" } }, { examBoard: { slug: "asc" } }, { sortOrder: "asc" }, { slug: "asc" }],
    take: MAX_QUALIFICATIONS,
  });
}

/** The qualification selector of /daily: listed qualifications with today's public question counts. */
export async function getDailyIndex(now: Date = new Date(), scope: CatalogueScope = {}, client: DbClient = db): Promise<DailyIndex> {
  const date = dailyToday(now);
  const qualifications = await listedQualifications(scope, client);
  const rows =
    qualifications.length === 0
      ? []
      : await client.dailyQuestion.findMany({
          where: { ...publicDailyWhere(date), qualificationId: { in: qualifications.map((q) => q.id) } },
          select: { qualificationId: true, subject: { select: { name: true } } },
          take: 2_000,
        });
  return {
    date,
    options: qualifications.map((q) => {
      const own = rows.filter((row) => row.qualificationId === q.id);
      return {
        qualificationId: q.id,
        boardSlug: q.examBoard.slug,
        qualificationSlug: q.slug,
        label: qualificationLabel(q.examBoard.shortName, q.shortName),
        href: `/daily/${q.examBoard.slug}/${q.slug}`,
        subjects: [...new Set(own.map((row) => row.subject?.name).filter((name): name is string => Boolean(name)))].sort((a, b) =>
          a.localeCompare(b, "en"),
        ),
        questionCount: own.length,
      };
    }),
  };
}

/** Static params for `/daily/[board]/[qualification]` (every listed qualification). */
export async function listDailyQualificationParams(scope: CatalogueScope = {}, client: DbClient = db): Promise<{ board: string; qualification: string }[]> {
  return (await listedQualifications(scope, client)).map((q) => ({ board: q.examBoard.slug, qualification: q.slug }));
}

export interface PublicDailyItem {
  /** DailyQuestion id: what the answer action receives. */
  dailyQuestionId: string;
  /** Subject name, or null for a qualification-wide question. */
  subjectName: string | null;
  question: PresentedQuestion;
  /** Development seed question (flagged in the UI; never in production). */
  isDemo: boolean;
}

export interface PublicDailyPage {
  date: LocalDate;
  qualification: { id: string; slug: string; label: string; boardSlug: string };
  items: PublicDailyItem[];
}

const SLUG = z.string().min(1).max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

/**
 * Today's public questions of one qualification (qualification-wide first, then by subject), presented for the shared
 * question renderers (rendered server-side, no answer data). Null when the qualification is unknown or not listed.
 */
export async function getPublicDailyPage(boardSlug: string, qualificationSlug: string, now: Date = new Date(), client: DbClient = db): Promise<PublicDailyPage | null> {
  if (!SLUG.safeParse(boardSlug).success || !SLUG.safeParse(qualificationSlug).success) return null;
  const qualification = await client.qualification.findFirst({
    where: { slug: qualificationSlug, catalogueStatus: LISTED, examBoard: { slug: boardSlug, catalogueStatus: LISTED } },
    select: QUALIFICATION_SELECT,
  });
  if (!qualification) return null;

  const date = dailyToday(now);
  const rows = await client.dailyQuestion.findMany({
    where: { ...publicDailyWhere(date), qualificationId: qualification.id },
    select: { id: true, questionId: true, subject: { select: { name: true } }, question: { select: { isDemo: true } } },
    take: MAX_QUESTIONS_PER_PAGE,
  });
  rows.sort((a, b) => (a.subject === null ? -1 : 0) - (b.subject === null ? -1 : 0) || (a.subject?.name ?? "").localeCompare(b.subject?.name ?? "", "en"));

  const questions = await getQuestionsForAttempt(rows.map((row) => row.questionId), { client });
  const byId = new Map(questions.map((q) => [q.id, q]));
  const views: { row: (typeof rows)[number]; view: StudentQuestionView }[] = [];
  for (const row of rows) {
    const question = byId.get(row.questionId);
    if (!question || question.accessTier === "PREMIUM") continue;
    try {
      views.push({ row, view: toStudentView(question) });
    } catch (error) {
      // A broken stored payload must not take the page down: skip it (editors see it in the CMS checks).
      logger.warn("daily: skipping a question with an invalid payload", { dailyQuestionId: row.id, err: error });
    }
  }
  const presented = await presentQuestions(views.map((v) => v.view));

  return {
    date,
    qualification: {
      id: qualification.id,
      slug: qualification.slug,
      label: qualificationLabel(qualification.examBoard.shortName, qualification.shortName),
      boardSlug: qualification.examBoard.slug,
    },
    items: views.flatMap(({ row }, index) => {
      const question = presented[index];
      return question ? [{ dailyQuestionId: row.id, subjectName: row.subject?.name ?? null, question, isDemo: row.question.isDemo }] : [];
    }),
  };
}

export const publicDailyAnswerSchema = z.object({
  dailyQuestionId: z.uuid({ error: "This question is not available." }),
  response: z.unknown(),
});

export type PublicDailyAnswerInput = z.input<typeof publicDailyAnswerSchema>;

/**
 * Untrusted `{ id, response }` from the public question island (`PublicDailyQuestion`), unpacked for the services'
 * own Zod schemas (which validate both fields). Anything that is not an object yields undefined fields.
 */
export function publicAnswerFields(input: unknown): { id: unknown; response: unknown } {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return { id: undefined, response: undefined };
  const record = input as Record<string, unknown>;
  return { id: record.id, response: record.response };
}

export interface PublicAnswerContext {
  /** Client IP for the anonymous rate limit (null when unknown: one shared "none" bucket). */
  ip: string | null;
  now?: Date;
  client?: DbClient;
}

const NOT_AVAILABLE = "This daily question is no longer available. Reload the page for today's question.";

/**
 * The gate shared by every anonymous marking path (this public daily question and the SEO sample questions,
 * `src/server/seo/samples.ts`): a size cap on the answer, then ONE per-IP anonymous budget
 * (`rateLimits.dailyQuestionAnon`, ARCHITECTURE §5.5), so the two entry points cannot be combined to mark more.
 *
 * @throws AppError VALIDATION (answer too long) | RATE_LIMITED
 */
export async function assertAnonymousAnswerAllowed(response: unknown, ip: string | null): Promise<void> {
  const size = JSON.stringify(response ?? null)?.length ?? 0;
  if (size > MAX_RESPONSE_BYTES) throw AppError.validation({ response: ["That answer is too long."] });
  await assertRateLimit(
    rateLimits.dailyQuestionAnon(ip),
    "You've checked a lot of answers in a short time. Please wait a while, or create a free account to keep practising.",
  );
}

/**
 * Marks an anonymous answer with the deterministic marking engine and returns the same feedback the signed-in
 * renderers use (mark, correct answer, explanation, worked solution). Stores nothing. The caller has already checked
 * that the question may be shown publicly (never PREMIUM).
 *
 * @throws AppError VALIDATION (no answer, or one that does not fit the question type)
 */
export async function markAnonymousAnswer(question: AttemptQuestion, response: unknown): Promise<PresentedFeedback> {
  const answer = safeParseResponse(question.type, response);
  if (!answer.success || answer.data === null) throw AppError.validation({ response: ["Answer the question before checking."] });

  const result = markQuestion(question, answer.data);
  const reveal = toAnswerReveal(question);
  const resolveAsset = await loadRevealAssets([reveal]);
  const presented = presentReveal(reveal, partResultsFrom(toAttemptFeedback(result)), resolveAsset);
  return publicFeedbackFromMarking(result, presented);
}

/**
 * Marks an anonymous answer to a public daily question and returns the feedback. Writes nothing except the rate-limit
 * counter: no attempt, no XP, no streak (sign-up is what unlocks tracking).
 *
 * @throws AppError RATE_LIMITED | VALIDATION (no or malformed answer) | NOT_FOUND (unknown, expired or not public)
 */
export async function answerPublicDailyQuestion(input: unknown, context: PublicAnswerContext): Promise<PresentedFeedback> {
  const parsed = publicDailyAnswerSchema.safeParse(input);
  if (!parsed.success) throw AppError.fromZod(parsed.error);
  const { dailyQuestionId, response } = parsed.data;
  await assertAnonymousAnswerAllowed(response, context.ip);

  const client = context.client ?? db;
  const now = context.now ?? new Date();
  const row = await client.dailyQuestion.findFirst({
    where: { id: dailyQuestionId, qualification: { catalogueStatus: LISTED, examBoard: { catalogueStatus: LISTED } }, OR: [{ subjectId: null }, { subject: { catalogueStatus: LISTED } }] },
    select: { date: true, questionId: true },
  });
  if (!row || !isAnswerableDailyDate(localDateFromDateColumn(row.date), dailyToday(now))) throw AppError.notFound(NOT_AVAILABLE);

  const [question] = await getQuestionsForAttempt([row.questionId], { client });
  if (!question || question.accessTier === "PREMIUM") throw AppError.notFound(NOT_AVAILABLE);
  return markAnonymousAnswer(question, response);
}
