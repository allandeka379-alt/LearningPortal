import "server-only";
import { z } from "zod";
import { FLASHCARD_TYPES } from "@/components/flashcards/types";
import {
  AbilityLevel,
  AchievementCategory,
  AttemptMode,
  AttemptStatus,
  AttemptSubmitReason,
  AuthMethod,
  CatalogueStatus,
  ContentAccessTier,
  EnrollmentSource,
  EnrollmentStatus,
  LessonKind,
  LessonProgressStatus,
  MarkingMode,
  MarkingStatus,
  MasteryBand,
  NotificationCategory,
  QuestionType,
  Role,
  SessionKind,
  StudyActivityType,
  StudyPlanItemReason,
  StudyPlanItemStatus,
  SyllabusStatus,
  TopicKind,
} from "@/generated/prisma/client";
import { questionResponseSchema } from "@/lib/questions/response";
import { codeSchema } from "@/server/auth/schemas";
import { enrolInSubjectsSchema } from "@/server/enrollment";
import { MAX_QUEUE_LIMIT, reviewInputSchema } from "@/server/flashcards/service";
import { answerSchema, selfAssessSchema, startPracticeSchema } from "@/server/practice";
import { optionalQuery, paginationQueryShape } from "./pagination";

/**
 * Zod schemas of the REST API v1 (§30, §38; ARCHITECTURE §3.3). ONE source of truth: route handlers validate their
 * params / query / body with the INPUT schemas below (through `./contract` + `v1Route`), and `./openapi` turns the
 * same schemas — plus the documented RESPONSE shapes — into the OpenAPI 3.1 document with `z.toJSONSchema`.
 *
 * Response schemas describe the `data` of the success envelope. They are documentation and test oracles (the
 * integration tests parse real responses with them); handlers do not re-validate their own output at runtime. Response
 * objects are open for extension: within v1 fields are only ever ADDED (docs/API.md "Versioning"), so clients must
 * ignore unknown fields — the OpenAPI document therefore never declares `additionalProperties: false` on responses.
 */

// =====================================================================================================================
// Primitives
// =====================================================================================================================

const isoDateTime = z.iso.datetime({ offset: true }).describe("ISO 8601 timestamp (UTC).");
const localDate = z.iso.date().describe("Calendar date (YYYY-MM-DD) in the student's time zone.");
const sanitizedHtml = z.string().describe("Sanitised HTML rendered server-side (KaTeX maths included). Safe to display as-is.");
const id = z.uuid();

export const roleSchema = z.enum(Role);
export const catalogueStatusSchema = z.enum(CatalogueStatus);
export const masteryBandSchema = z.enum(MasteryBand);

/** `{ id }` path parameter (a UUID). */
export const idParamsSchema = z.object({ id: z.uuid({ message: "Not found." }) });

// =====================================================================================================================
// Errors
// =====================================================================================================================

export const errorBodySchema = z.object({
  error: z.object({
    code: z.enum([
      "UNAUTHENTICATED",
      "FORBIDDEN",
      "NOT_FOUND",
      "VALIDATION",
      "CONFLICT",
      "RATE_LIMITED",
      "QUOTA_EXCEEDED",
      "PAYMENT_REQUIRED",
      "ENTITLEMENT_REQUIRED",
      "AI_UNAVAILABLE",
      "BAD_REQUEST",
      "INTERNAL",
    ]),
    message: z.string().describe("Safe to show to the user."),
    fieldErrors: z
      .record(z.string(), z.array(z.string()))
      .optional()
      .describe("Field path (dot-joined, e.g. `subjectIds.0`) to messages; `_form` for errors of the whole request."),
  }),
});

// =====================================================================================================================
// Auth
// =====================================================================================================================

const IDENTIFIER_MESSAGE = "Enter your email address or username.";
const deviceLabelSchema = z
  .string()
  .trim()
  .min(1, "Use 1-100 characters.")
  .max(100, "Use 1-100 characters.")
  .optional()
  .describe("Name of this device in the user's device list (e.g. \"Tendai's phone\"). Default: derived from User-Agent.");

export const tokenRequestSchema = z.strictObject({
  identifier: z
    .string({ error: IDENTIFIER_MESSAGE })
    .trim()
    .min(1, IDENTIFIER_MESSAGE)
    .max(254, IDENTIFIER_MESSAGE)
    .describe("Email address, or the username a school issued. Phone numbers are not sign-in identifiers."),
  password: z.string({ error: "Enter your password." }).min(1, "Enter your password.").max(1024),
  label: deviceLabelSchema,
});

export const otpRequestBodySchema = z.strictObject({
  identifier: z
    .string({ error: "Enter the email address on your account." })
    .trim()
    .min(1, "Enter the email address on your account.")
    .max(254, "Enter the email address on your account.")
    .describe("Email address (the code goes by email). The response is the same whether or not an account exists."),
});

export const otpVerifyBodySchema = z.strictObject({
  flowToken: z
    .string({ error: "Your code request has expired. Please start again." })
    .min(16, "Your code request has expired. Please start again.")
    .max(4096, "Your code request has expired. Please start again.")
    .regex(/^[A-Za-z0-9_-]+$/, "Your code request has expired. Please start again.")
    .describe("`flowToken` from POST /auth/otp/request (or a 202 from POST /auth/token). Valid for 15 minutes."),
  code: codeSchema.describe("The 6-digit code that was sent."),
  label: deviceLabelSchema,
});

export const tokenIssuedSchema = z.object({
  status: z.literal("authenticated"),
  token: z.string().describe("Bearer token (`dz_` prefix). Returned ONCE: keep it in the platform's secure storage."),
  tokenType: z.literal("Bearer"),
  sessionId: id,
  userId: id,
  expiresAt: isoDateTime.describe("Idle expiry. Each authenticated request slides it forward (written at most every 5 minutes)."),
  absoluteExpiresAt: isoDateTime.nullable().describe("Hard limit: sign in again after this, however active the token is."),
});

export const codeFlowSchema = z.object({
  status: z
    .enum(["code_sent", "verification_required"])
    .describe("`code_sent`: answer of /auth/otp/request (identical whether or not an account exists). `verification_required`: the password was right but the account's email address was never verified; a code was emailed."),
  flowToken: z.string().describe("Opaque, encrypted, expires in 15 minutes. Send it back with the code to /auth/otp/verify."),
  channel: z.enum(["EMAIL"]).describe("Codes always go by email."),
  destination: z.string().describe("Masked email address the code goes to (for display)."),
  expiresInSeconds: z.int(),
  resendAfterSeconds: z.int().describe("Wait this long before asking for another code."),
});

export const meSchema = z.object({
  id,
  displayName: z.string(),
  roles: z.array(roleSchema).describe("Effective roles (SCHOOL_ADMIN when the user administers a school)."),
  timeZone: z.string().describe("IANA time zone used for day boundaries (streaks, daily goals)."),
  email: z.string().nullable(),
  emailVerified: z.boolean(),
  phone: z.string().nullable().describe("Optional profile phone number. Never used to sign in and never verified."),
  phoneVerified: z.boolean().describe("Always false for new accounts: phone numbers are not verified."),
  passwordMustChange: z
    .boolean()
    .describe("True while the user signs in with a password their school set: other endpoints answer 403 until it is changed on the web."),
  student: z.object({ onboardingCompleted: z.boolean() }).nullable(),
  session: z.object({
    id,
    kind: z.enum(SessionKind),
    via: z.enum(["bearer", "cookie"]),
    authMethod: z.enum(AuthMethod),
    label: z.string().nullable(),
    createdAt: isoDateTime,
    expiresAt: isoDateTime,
    absoluteExpiresAt: isoDateTime.nullable(),
  }),
});

// =====================================================================================================================
// Catalogue
// =====================================================================================================================

export const boardsQuerySchema = z.object({
  ...paginationQueryShape,
  countryId: optionalQuery(z.uuid({ message: "Unknown country." })).describe("Only boards offered in this country (default: every country)."),
});

export const qualificationsQuerySchema = z.object({
  ...paginationQueryShape,
  boardId: optionalQuery(z.uuid({ message: "Unknown examination board." })).describe("Only this examination board's qualifications."),
});

export const subjectsQuerySchema = z.object({
  ...paginationQueryShape,
  qualificationId: z.uuid({ message: "Choose a qualification." }).describe("The qualification whose subjects to list."),
});

export const boardSchema = z.object({
  id,
  slug: z.string(),
  code: z.string(),
  name: z.string(),
  shortName: z.string(),
  description: z.string().nullable(),
  websiteUrl: z.string().nullable(),
  catalogueStatus: catalogueStatusSchema,
});

export const qualificationSchema = z.object({
  id,
  slug: z.string(),
  code: z.string().nullable(),
  name: z.string(),
  shortName: z.string(),
  description: z.string().nullable(),
  catalogueStatus: catalogueStatusSchema,
  isEnrollable: z.boolean().describe("False for COMING_SOON: list it, but students cannot enrol yet."),
  board: z.object({ id, slug: z.string(), shortName: z.string() }),
  level: z.object({ id, slug: z.string(), name: z.string(), shortName: z.string().nullable() }).describe("Cross-board level, e.g. O-Level."),
});

export const subjectSchema = z.object({
  id,
  slug: z.string(),
  name: z.string(),
  shortName: z.string().nullable(),
  officialCode: z.string().nullable(),
  iconKey: z.string().nullable(),
  languageCode: z.string(),
  catalogueStatus: catalogueStatusSchema,
  isEnrollable: z.boolean(),
  category: z.object({ id, slug: z.string(), name: z.string(), iconKey: z.string().nullable() }),
});

// =====================================================================================================================
// Enrolments
// =====================================================================================================================

export const enrollmentsQuerySchema = z.object({
  ...paginationQueryShape,
  includeDropped: optionalQuery(z.enum(["true", "false"])).describe("Also list dropped and completed subjects (default false)."),
});

/** Reused from the enrolment service: the web onboarding wizard validates with the same schema. */
export const enrollRequestSchema = enrolInSubjectsSchema;

export const enrollmentSchema = z.object({
  id,
  status: z.enum(EnrollmentStatus),
  enrolledVia: z.enum(EnrollmentSource),
  subject: z.object({
    id,
    name: z.string(),
    slug: z.string(),
    qualification: z.object({ id, name: z.string(), shortName: z.string().nullable() }),
  }),
  syllabus: z.object({ id, title: z.string(), versionLabel: z.string(), status: z.enum(SyllabusStatus) }).describe("The PINNED syllabus version."),
  route: z.object({ id, code: z.string(), name: z.string() }).nullable(),
  targetExamSession: z.object({ id, name: z.string(), startsOn: localDate, isProvisional: z.boolean() }).nullable(),
  targetGrade: z.string().nullable(),
  abilityLevel: z.enum(AbilityLevel).nullable(),
  diagnosticCompletedAt: isoDateTime.nullable(),
  createdAt: isoDateTime,
});

// =====================================================================================================================
// Dashboard and topic tree
// =====================================================================================================================

const examCountdownSchema = z.object({
  examSessionId: id,
  name: z.string(),
  startsOn: localDate,
  endsOn: localDate,
  daysUntil: z.int().describe("Negative once the session has started."),
  isProvisional: z.boolean(),
  isDemo: z.boolean(),
  subjectIds: z.array(id),
});

const topicMasteryItemSchema = z.object({
  topicId: id,
  name: z.string(),
  subjectId: id,
  subjectName: z.string(),
  score: z.number(),
  band: masteryBandSchema,
});

export const dashboardSchema = z.object({
  greeting: z.object({ name: z.string().nullable(), partOfDay: z.enum(["MORNING", "AFTERNOON", "EVENING"]) }),
  today: localDate,
  timeZone: z.string(),
  examCountdown: examCountdownSchema.nullable(),
  diagnosticOffer: z.enum(["OFFER", "SKIPPED"]).nullable(),
  overall: z.object({
    progressPercent: z.number().nullable(),
    coveragePercent: z.number().nullable(),
    topicsTotal: z.int(),
    topicsCompleted: z.int(),
    topicsRemaining: z.int(),
  }),
  subjects: z.array(
    z.object({
      subjectId: id,
      name: z.string(),
      slug: z.string(),
      qualificationName: z.string(),
      syllabusVersion: z.string(),
      progressPercent: z.number().nullable(),
      syllabusCoveragePercent: z.number().nullable(),
      topicsTotal: z.int(),
      topicsCompleted: z.int(),
      topicsRemaining: z.int(),
      weakTopicsCount: z.int(),
      questionsAttempted: z.int(),
      accuracyPercent: z.number().nullable(),
      averageScorePercent: z.number().nullable(),
      lastMockPercent: z.number().nullable(),
      predictedGrade: z.string().nullable().describe("A grade ESTIMATE: always label it as such."),
      countdown: examCountdownSchema.nullable(),
    }),
  ),
  weakTopics: z.array(topicMasteryItemSchema),
  strongTopics: z.array(topicMasteryItemSchema),
  streak: z.object({ current: z.int(), longest: z.int(), status: z.enum(["INACTIVE", "AT_RISK", "DONE_TODAY"]) }),
  questionsAttempted: z.int(),
  questionsCorrect: z.int(),
  accuracyPercent: z.number().nullable(),
  averageScorePercent: z.number().nullable(),
  recentMocks: z.array(
    z.object({
      attemptId: id,
      subjectId: id,
      subjectName: z.string(),
      title: z.string().nullable(),
      percentage: z.number().nullable(),
      gradeEstimate: z.string().nullable(),
      isProvisional: z.boolean(),
      submittedAt: isoDateTime.nullable(),
    }),
  ),
  dailyTarget: z.object({ minutes: z.int(), source: z.enum(["PLAN", "GOAL", "DEFAULT"]), minutesStudiedToday: z.number(), goalMet: z.boolean() }),
  studyPlan: z
    .object({
      planId: id,
      items: z.array(
        z.looseObject({
          id,
          subjectId: id,
          subjectName: z.string(),
          topicId: id.nullable(),
          topicName: z.string().nullable(),
          activityType: z.string(),
          targetMinutes: z.int(),
          status: z.string(),
        }),
      ),
    })
    .nullable(),
  recommended: z.array(
    z.looseObject({
      kind: z.string(),
      topicId: id,
      topicName: z.string().nullable(),
      subjectId: id,
      subjectName: z.string(),
      href: z.string().describe("Web path of the recommended activity."),
    }),
  ),
  xp: z.object({ total: z.int() }),
});

export const topicsQuerySchema = z.object({ ...paginationQueryShape });

export interface TopicNodeJson {
  topicId: string;
  name: string;
  code: string | null;
  kind: TopicKind;
  isOptional: boolean;
  score: number | null;
  band: MasteryBand | null;
  questionsAttempted: number;
  children: TopicNodeJson[];
}

export const topicNodeSchema: z.ZodType<TopicNodeJson> = z.object({
  topicId: id,
  name: z.string(),
  code: z.string().nullable(),
  kind: z.enum(TopicKind),
  isOptional: z.boolean(),
  score: z.number().nullable().describe("Mastery score 0-100; null = not started."),
  band: masteryBandSchema.nullable(),
  questionsAttempted: z.int(),
  get children() {
    return z.array(topicNodeSchema);
  },
});

// =====================================================================================================================
// Lessons
// =====================================================================================================================

export const lessonQuerySchema = z.object({
  topicId: optionalQuery(z.uuid({ message: "Unknown topic." })).describe("The topic the lesson is read in (for previous / next); default: its primary topic."),
});

const lessonNavSchema = z.object({ id, title: z.string(), locked: z.boolean(), state: z.enum(["NOT_STARTED", "IN_PROGRESS", "COMPLETED"]) });

export const lessonSchema = z.object({
  id,
  title: z.string(),
  summary: z.string().nullable(),
  kind: z.enum(LessonKind),
  estimatedMinutes: z.int(),
  languageCode: z.string(),
  accessTier: z.enum(ContentAccessTier),
  isDemo: z.boolean(),
  subject: z.object({ id, name: z.string() }),
  topic: z.object({ id, name: z.string(), code: z.string().nullable() }),
  locked: z.boolean().describe("True when the plan does not include this lesson: `content` is null; show an upgrade prompt."),
  assigned: z.boolean(),
  content: z
    .object({
      html: sanitizedHtml,
      plainText: z.string().describe("The lesson as plain text (maths kept as LaTeX source), for text-only clients and screen readers."),
      headings: z.array(z.object({ id: z.string(), text: z.string(), depth: z.int() })),
      hasMath: z.boolean(),
    })
    .nullable(),
  objectives: z.array(z.object({ id, code: z.string().nullable(), statement: z.string() })),
  attribution: z
    .looseObject({ statement: z.string(), author: z.string().nullable(), attribution: z.string().nullable() })
    .nullable()
    .describe("Licensing footer; show it under the lesson (null when locked)."),
  progress: z
    .object({
      status: z.enum(LessonProgressStatus),
      completedAt: isoDateTime.nullable(),
      timeSpentSeconds: z.int(),
      revisedSinceCompletion: z.boolean(),
    })
    .nullable(),
  position: z.int().nullable(),
  totalInTopic: z.int(),
  previous: lessonNavSchema.nullable(),
  next: lessonNavSchema.nullable(),
  practiceQuestionCount: z.int(),
  upgradePath: z.string(),
});

// =====================================================================================================================
// Questions, feedback and practice sessions
// =====================================================================================================================

export interface PresentedQuestionJson {
  id: string;
  type: string;
  markingMode: string;
  marks: number;
  partLabel: string | null;
  stemHtml: string;
  interaction: { type: string; [key: string]: unknown };
  hintCount: number;
  calculatorAllowed: boolean | null;
  estimatedSeconds: number | null;
  parts: PresentedQuestionJson[];
}

export const presentedQuestionSchema: z.ZodType<PresentedQuestionJson> = z.object({
  id,
  type: z.enum(QuestionType),
  markingMode: z.enum(MarkingMode),
  marks: z.number(),
  partLabel: z.string().nullable(),
  stemHtml: sanitizedHtml,
  interaction: z
    .looseObject({ type: z.enum(QuestionType) })
    .describe(
      "What the answer UI needs for the type: MULTIPLE_CHOICE `{ selectMode, options: [{ key, html, image }] }`; " +
        "MATCHING `{ left, right }`; FILL_IN_THE_BLANK `{ paragraphs, blankCount }`; DIAGRAM_LABELLING `{ image, labels, hotspots }`; " +
        "NUMERICAL / CALCULATION `{ unitHint, answerPrefix, expectsWorking }`; SHORT_ANSWER `{ maxLength }`; ESSAY `{ wordLimit }`. " +
        "Never contains answer data (no correct flags, keys, explanations or hint texts).",
    ),
  hintCount: z.int(),
  calculatorAllowed: z.boolean().nullable(),
  estimatedSeconds: z.int().nullable(),
  get parts() {
    return z.array(presentedQuestionSchema).describe("STRUCTURED parts in order.");
  },
});

export const presentedFeedbackSchema = z
  .looseObject({
    position: z.int(),
    status: z.enum(MarkingStatus),
    outcome: z.enum(["correct", "partial", "incorrect", "pending", "review", "unanswered"]),
    marksAwarded: z.number().nullable(),
    marksAvailable: z.number(),
    notes: z.array(z.string()),
    reveal: z
      .looseObject({ questionId: id, correctAnswerHtml: sanitizedHtml.nullable(), explanationHtml: sanitizedHtml.nullable() })
      .nullable()
      .describe("Correct answer, explanation, worked solution, concept, MCQ rationales, mark scheme. Only present once the answer is marked."),
    markerComment: z.string().nullable(),
    topic: z.object({ id, name: z.string() }).nullable(),
    studyLesson: z.object({ title: z.string(), href: z.string(), premium: z.boolean() }).nullable(),
    mastery: z.object({ before: masteryBandSchema.nullable(), after: masteryBandSchema, score: z.number() }).nullable(),
    selfAssessment: z.looseObject({ maxMarks: z.number() }).nullable(),
    attemptCompleted: z.boolean(),
    nextPosition: z.int().nullable(),
  })
  .describe("Marking result of one answer (§10).");

export const presentedHintSchema = z.object({
  hintNumber: z.int().describe("1-based number of this hint."),
  totalHints: z.int(),
  html: sanitizedHtml,
});

export const practiceSlotSchema = z.object({
  position: z.int().describe("1-based question number; answer with POST .../answers { position }."),
  marksAvailable: z.number(),
  answered: z.boolean().describe("Marked, or queued for marking."),
  question: presentedQuestionSchema.nullable().describe("Null when the question was archived after the session started."),
  response: questionResponseSchema.nullable().describe("The student's own saved / marked answer."),
  feedback: presentedFeedbackSchema.nullable().describe("Null until the slot is marked."),
  hints: z.array(presentedHintSchema).describe("Hints already revealed (never unrevealed ones)."),
});

export const practiceSessionSchema = z.object({
  id,
  mode: z.enum(AttemptMode),
  status: z.enum(AttemptStatus),
  subject: z.object({ id, name: z.string() }),
  isOpen: z.boolean(),
  immediateFeedback: z.boolean(),
  questionCount: z.int(),
  markedCount: z.int(),
  nextPosition: z.int().nullable().describe("The next question to answer; null when the session is finished."),
  startedAt: isoDateTime,
  submittedAt: isoDateTime.nullable(),
  slots: z.array(practiceSlotSchema),
});

/**
 * Reused from the practice service (the web practice builder validates with the same schema). `idempotencyKey` may
 * also be sent as the `Idempotency-Key` header: repeating a start with the same key returns the same session.
 */
export const practiceStartBodySchema = startPracticeSchema;

export const practiceStartedSchema = z.object({
  resumed: z.boolean().describe("An existing session was returned (same idempotency key)."),
  shortfall: z.int().describe("Requested minus selected questions (the bank had fewer matches)."),
  session: practiceSessionSchema,
});

/** The practice service's answer schema, with the attempt id taken from the path and a typed `response`. */
export const practiceAnswerBodySchema = answerSchema.omit({ attemptId: true }).extend({
  response: questionResponseSchema.describe("The answer, shaped by question type (e.g. `{ type: \"MULTIPLE_CHOICE\", optionKeys: [\"B\"] }`)."),
});

export const practiceSummarySchema = z.looseObject({
  attemptId: id,
  mode: z.enum(AttemptMode),
  status: z.enum(AttemptStatus),
  subject: z.object({ id, name: z.string() }),
  result: z
    .looseObject({
      attemptId: id,
      status: z.enum(AttemptStatus),
      submittedAt: isoDateTime.nullable(),
      submitReason: z.enum(AttemptSubmitReason).nullable(),
      score: z.looseObject({ marksAwarded: z.number(), totalMarks: z.number(), percentage: z.number().nullable(), answeredCount: z.int(), correctCount: z.int() }),
    })
    .nullable()
    .describe("Null while the session is still open."),
  topics: z.array(
    z.object({
      topicId: id,
      topicName: z.string().nullable(),
      marksAwarded: z.number(),
      marksAvailable: z.number(),
      percent: z.number().nullable(),
      mastery: z.object({ band: masteryBandSchema, score: z.number() }).nullable(),
      change: z.object({ before: masteryBandSchema.nullable(), after: masteryBandSchema }).nullable(),
    }),
  ),
  xpEarned: z.int().nullable(),
  selfAssessableCount: z.int(),
  review: z.array(
    z.object({
      position: z.int(),
      question: presentedQuestionSchema.nullable(),
      response: questionResponseSchema.nullable(),
      feedback: presentedFeedbackSchema.nullable(),
    }),
  ),
});

/** POST /practice/sessions/{id}/hints: the question whose next hint to reveal. */
export const practiceHintBodySchema = selfAssessSchema.pick({ position: true });

/**
 * POST /practice/sessions/{id}/self-assessment: the practice service's self-assessment schema with the attempt id
 * taken from the path (the web runner validates with the same schema).
 */
export const practiceSelfAssessBodySchema = selfAssessSchema.omit({ attemptId: true });

/** Results of a closed attempt (`AttemptResult`, §12 / §52): POST /practice/sessions/{id}/end. */
export const attemptResultSchema = z.looseObject({
  attemptId: id,
  mode: z.enum(AttemptMode),
  status: z.enum(AttemptStatus),
  submittedAt: isoDateTime.nullable(),
  submitReason: z.enum(AttemptSubmitReason).nullable(),
  score: z.looseObject({
    marksAwarded: z.number(),
    totalMarks: z.number(),
    percentage: z.number().nullable().describe("0-100 of the ANSWERED questions' marks (practice); null when nothing was marked."),
    isProvisional: z.boolean().describe("Some answers still wait for marking: the score can change."),
    pendingReviewCount: z.int(),
    answeredCount: z.int(),
    correctCount: z.int(),
    questionCount: z.int(),
  }),
  grade: z
    .looseObject({ grade: z.string(), isPass: z.boolean(), isEstimate: z.literal(true), schemeId: id, schemeName: z.string(), disclaimer: z.string().nullable() })
    .nullable()
    .describe("A grade ESTIMATE (never official): always show `disclaimer` with it. Null for practice."),
  topics: z.array(
    z.looseObject({
      topicId: id,
      topicName: z.string().nullable(),
      marksAwarded: z.number(),
      marksAvailable: z.number(),
      percent: z.number().nullable(),
      band: masteryBandSchema.nullable(),
    }),
  ),
  strongTopicIds: z.array(id),
  weakTopicIds: z.array(id),
  recommendations: z.array(
    z.looseObject({
      kind: z.enum(["LESSON", "PRACTICE", "TOPIC_TEST", "FLASHCARDS"]),
      topicId: id,
      topicName: z.string().nullable(),
      lessonId: id.nullable(),
      lessonTitle: z.string().nullable(),
      questionCount: z.int().nullable(),
      reason: z.string(),
      href: z.string().nullable().describe("Web path of the recommended activity."),
    }),
  ),
  analysis: z.unknown().describe("The stored results analysis (version 1), or null."),
});

// =====================================================================================================================
// Daily question
// =====================================================================================================================

export const dailyQuestionQuerySchema = z.object({
  subjectId: optionalQuery(z.uuid({ message: "Choose one of your subjects." })).describe("Which subject's question to show in `current` (default: the first one still to answer)."),
});

export const dailyStartBodySchema = z.strictObject({ subjectId: z.uuid({ message: "Choose one of your subjects." }) });

/** The practice answer schema for the daily question's single slot, addressed by subject. */
export const dailyAnswerBodySchema = answerSchema.omit({ attemptId: true, position: true }).extend({
  subjectId: z.uuid({ message: "Choose one of your subjects." }),
  response: questionResponseSchema,
});

export const dailyCurrentSchema = z.object({
  subjectId: id,
  attemptId: id,
  status: z.enum(AttemptStatus),
  slot: practiceSlotSchema.nullable(),
});

export const dailyOverviewSchema = z.object({
  date: localDate,
  streak: z.int(),
  items: z.array(
    z.object({
      subject: z.object({ id, name: z.string() }),
      qualificationName: z.string(),
      dailyQuestionId: id.nullable().describe("Null when no question is scheduled for this subject today."),
      entitled: z.boolean().describe("The plan includes the daily question for this subject."),
      attempt: z.object({ id, status: z.enum(AttemptStatus) }).nullable(),
    }),
  ),
  current: dailyCurrentSchema.nullable().describe("The selected subject's question, once it has been opened (POST /daily-question/start)."),
});

export const dailyAnswerResultSchema = z.object({ attemptId: id, feedback: presentedFeedbackSchema });

// =====================================================================================================================
// Flashcards
// =====================================================================================================================

export const flashcardsDueQuerySchema = z.object({
  subjectId: optionalQuery(z.uuid({ message: "That subject isn't on your list." })),
  topicId: optionalQuery(z.uuid({ message: "That topic isn't part of your subjects." })),
  limit: optionalQuery(z.coerce.number().int().min(1).max(MAX_QUEUE_LIMIT)).describe(`Cards in this session, 1-${MAX_QUEUE_LIMIT} (default 100).`),
});

const intervalsSchema = z.object({ AGAIN: z.string(), HARD: z.string(), GOOD: z.string(), EASY: z.string() });

export const flashcardSchema = z.object({
  flashcardId: id,
  subjectId: id,
  subjectName: z.string(),
  topicName: z.string().nullable(),
  cardType: z.enum(FLASHCARD_TYPES),
  frontHtml: sanitizedHtml,
  backHtml: sanitizedHtml,
  notesHtml: sanitizedHtml.nullable(),
  languageCode: z.string(),
  isPersonal: z.boolean(),
  isNew: z.boolean(),
  phase: z.enum(["NEW", "LEARNING", "REVIEW", "RELEARNING"]),
  intervals: intervalsSchema.describe("What each rating would schedule, e.g. GOOD: \"10m\"."),
});

export const flashcardQueueMetaSchema = z.object({
  entitled: z.boolean().describe("False when the plan does not include flashcards: `data` is empty; show an upgrade prompt."),
  scope: z.object({ subjectId: id.nullable(), subjectName: z.string().nullable(), topicId: id.nullable(), topicName: z.string().nullable() }),
  dueTotal: z.int(),
  newAvailable: z.int(),
  newRemainingToday: z.int(),
  newCardsPerDay: z.int(),
  nextDueAt: isoDateTime.nullable(),
});

/**
 * The flashcards service's review schema without `flashcardId` (the path parameter). `clientReviewId` may also be sent
 * as the `Idempotency-Key` header: a retry / offline replay with the same id is applied once.
 */
export const flashcardReviewBodySchema = reviewInputSchema.omit({ flashcardId: true });

/**
 * One queued review of POST /flashcards/reviews. Only the SHAPE is checked for the whole batch; each item is then
 * validated and applied on its own exactly like POST /flashcards/{id}/review (`flashcardId` a UUID, `rating` AGAIN /
 * HARD / GOOD / EASY, `clientReviewId` 8-64 of `A-Z a-z 0-9 - _ . :`, `reviewedAt` the press time), so one bad item is
 * reported in its own result slot and never blocks the rest of an offline outbox.
 */
export const flashcardSyncItemSchema = z.looseObject({
  flashcardId: z.string().describe("The card (UUID)."),
  rating: z.string().describe("AGAIN, HARD, GOOD or EASY."),
  durationMs: z.number().nullable().optional().describe("Time from card shown to rating."),
  clientReviewId: z.string().optional().describe("Client id of this press: replays with the same id apply once (`replayed: true`)."),
  reviewedAt: z.string().optional().describe("ISO 8601 press time (offline replays; clamped to now and 30 days back)."),
  subjectId: z.string().optional(),
});

export const flashcardSyncBodySchema = z.strictObject({
  reviews: z
    .array(flashcardSyncItemSchema)
    .min(1, "Send at least one review.")
    .max(MAX_QUEUE_LIMIT, `Send at most ${MAX_QUEUE_LIMIT} reviews at a time.`)
    .describe(`1-${MAX_QUEUE_LIMIT} queued reviews, in any order: they are applied in press order (\`reviewedAt\`).`),
});

export const flashcardReviewOutcomeSchema = z.object({
  flashcardId: id,
  replayed: z.boolean(),
  phase: z.enum(["NEW", "LEARNING", "REVIEW", "RELEARNING"]),
  dueAt: isoDateTime,
  intervalDays: z.number(),
  isLearningStep: z.boolean(),
  isLeech: z.boolean(),
  nextIntervals: intervalsSchema.nullable(),
  xpAwarded: z.int(),
});

/** One slot of the POST /flashcards/reviews answer, in press order. */
export const flashcardSyncResultSchema = z.union([
  z.object({ clientReviewId: z.string().nullable(), ok: z.literal(true), outcome: flashcardReviewOutcomeSchema }),
  z.object({
    clientReviewId: z.string().nullable(),
    ok: z.literal(false),
    code: z
      .string()
      .describe("Error code of this item (e.g. VALIDATION, NOT_FOUND, CONFLICT, ENTITLEMENT_REQUIRED). Drop the item from the outbox unless it is RATE_LIMITED or INTERNAL."),
    message: z.string(),
  }),
]);

// =====================================================================================================================
// Progress overview and study plan
// =====================================================================================================================

const streakStatusSchema = z.enum(["INACTIVE", "AT_RISK", "DONE_TODAY"]);
const distributionSchema = z.object({
  NOT_STARTED: z.int(),
  ...(Object.fromEntries(Object.values(MasteryBand).map((band) => [band, z.int()])) as Record<MasteryBand, z.ZodInt>),
});

export const progressOverviewSchema = z.object({
  today: localDate,
  timeZone: z.string(),
  xp: z.object({
    total: z.int(),
    thisWeek: z.int(),
    level: z.looseObject({ level: z.int(), xpIntoLevel: z.number(), xpForNextLevel: z.number(), xpToNextLevel: z.number(), progress: z.number() }),
  }),
  streak: z.object({ current: z.int(), longest: z.int(), status: streakStatusSchema, freezesAvailable: z.int() }),
  activity: z.object({
    days: z
      .array(
        z.object({
          date: localDate,
          studyMinutes: z.int(),
          questionsAttempted: z.int(),
          questionsCorrect: z.int(),
          xpEarned: z.int(),
          goalMet: z.boolean(),
          streakCredited: z.boolean(),
          streakFreezeUsed: z.boolean(),
        }),
      )
      .describe("The last 30 local days, oldest first. Days without activity are real zeros."),
    activeDays: z.int(),
    goalDays: z.int(),
    studyMinutes: z.int(),
    questionsAttempted: z.int(),
    questionsCorrect: z.int(),
    accuracyPercent: z.number().nullable(),
  }),
  subjects: z.array(
    z.object({
      subjectId: id,
      name: z.string(),
      qualificationName: z.string(),
      topicsTotal: z.int(),
      assessed: z.int(),
      counts: distributionSchema.describe("Topics per mastery band in the PINNED syllabus version; NOT_STARTED = no evidence yet."),
    }),
  ),
  achievements: z.object({
    earned: z.array(
      z.object({
        achievementId: id,
        code: z.string(),
        name: z.string(),
        description: z.string(),
        category: z.enum(AchievementCategory),
        tier: z.int(),
        iconKey: z.string(),
        unlockedAt: isoDateTime,
      }),
    ),
    totalAvailable: z.int(),
  }),
});

const weeklyAvailabilitySchema = z
  .object({ mon: z.int(), tue: z.int(), wed: z.int(), thu: z.int(), fri: z.int(), sat: z.int(), sun: z.int() })
  .describe("Study minutes available per weekday.");

export const studyPlanSummarySchema = z.object({
  id,
  startsOn: localDate,
  endsOn: localDate,
  examDate: localDate.nullable(),
  examDateSource: z.enum(["INPUT", "TARGET_SESSION", "STUDENT_TARGET", "NONE"]),
  exam: z.object({ name: z.string(), isProvisional: z.boolean(), isDemo: z.boolean() }).nullable().describe("Label provisional / demo dates as such."),
  daysUntilExam: z.int().nullable(),
  mode: z.enum(["EXAM_PREP", "MAINTENANCE"]),
  availability: weeklyAvailabilitySchema,
  dailyTargetMinutes: z.int(),
  weeklyTargetMinutes: z.int(),
  generatedAt: isoDateTime,
  lastAdaptedAt: isoDateTime.nullable(),
  subjects: z.array(z.object({ subjectId: id, name: z.string() })),
});

export const studyPlanItemSchema = z.object({
  id,
  date: localDate,
  sortOrder: z.int(),
  subjectId: id,
  subjectName: z.string(),
  topicId: id.nullable(),
  topicName: z.string().nullable(),
  lessonId: id.nullable(),
  lessonTitle: z.string().nullable(),
  assessmentId: id.nullable(),
  assessmentTitle: z.string().nullable(),
  activityType: z.enum(StudyActivityType),
  reason: z.enum(StudyPlanItemReason),
  plannerReason: z.string().nullable().describe("Detailed planner reason (e.g. WEAK_TOPIC_PRACTICE); tolerate new values."),
  masteryScore: z.number().nullable(),
  daysToExam: z.int().nullable(),
  targetMinutes: z.int(),
  targetQuestions: z.int().nullable(),
  completedQuestions: z.int(),
  status: z.enum(StudyPlanItemStatus),
  completedAt: isoDateTime.nullable(),
});

export const studyPlanTodaySchema = z.object({
  today: localDate,
  timeZone: z.string(),
  entitled: z.boolean().describe("The plan includes study plans (creating / changing one). Without a plan: point to the web planner."),
  plan: studyPlanSummarySchema.nullable().describe("Null when the student has no active study plan."),
  todayPlan: z
    .object({
      date: localDate,
      items: z.array(studyPlanItemSchema),
      availableMinutes: z.int(),
      plannedMinutes: z.int(),
      doneMinutes: z.int(),
    })
    .nullable()
    .describe("Today's items (empty on a rest day). Null without a plan."),
});

// =====================================================================================================================
// Notifications
// =====================================================================================================================

export const NOTIFICATIONS_MAX_LIMIT = 50;

export const notificationsQuerySchema = z.object({
  cursor: paginationQueryShape.cursor,
  limit: optionalQuery(
    z.coerce
      .number({ message: `limit must be a whole number between 1 and ${NOTIFICATIONS_MAX_LIMIT}.` })
      .int({ message: `limit must be a whole number between 1 and ${NOTIFICATIONS_MAX_LIMIT}.` })
      .min(1, { message: `limit must be a whole number between 1 and ${NOTIFICATIONS_MAX_LIMIT}.` })
      .max(NOTIFICATIONS_MAX_LIMIT, { message: `limit must be a whole number between 1 and ${NOTIFICATIONS_MAX_LIMIT}.` }),
  ).describe(`Page size, 1-${NOTIFICATIONS_MAX_LIMIT} (default 20).`),
  unreadOnly: optionalQuery(z.enum(["true", "false"])),
});

export const notificationSchema = z.object({
  id,
  type: z.string(),
  category: z.enum(NotificationCategory),
  title: z.string(),
  body: z.string(),
  data: z.unknown().describe("Type-specific JSON (e.g. a web path to open). May be null."),
  readAt: isoDateTime.nullable(),
  createdAt: isoDateTime,
});

export const notificationsReadBodySchema = z.union([
  z.strictObject({ ids: z.array(z.uuid()).min(1, "Choose at least one notification.").max(100, "Mark at most 100 at a time.") }),
  z.strictObject({ all: z.literal(true) }),
]);

export const notificationsReadResultSchema = z.object({ updated: z.int().describe("Notifications that changed from unread to read.") });
