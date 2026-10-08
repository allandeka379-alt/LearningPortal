import "server-only";
import { z } from "zod";
import type { Role } from "@/generated/prisma/client";
import {
  attemptResultSchema,
  boardSchema,
  boardsQuerySchema,
  codeFlowSchema,
  dailyAnswerBodySchema,
  dailyAnswerResultSchema,
  dailyCurrentSchema,
  dailyOverviewSchema,
  dailyQuestionQuerySchema,
  dailyStartBodySchema,
  dashboardSchema,
  enrollmentSchema,
  enrollmentsQuerySchema,
  enrollRequestSchema,
  flashcardQueueMetaSchema,
  flashcardReviewBodySchema,
  flashcardReviewOutcomeSchema,
  flashcardSchema,
  flashcardsDueQuerySchema,
  flashcardSyncBodySchema,
  flashcardSyncResultSchema,
  idParamsSchema,
  lessonQuerySchema,
  lessonSchema,
  meSchema,
  notificationSchema,
  notificationsQuerySchema,
  notificationsReadBodySchema,
  notificationsReadResultSchema,
  otpRequestBodySchema,
  otpVerifyBodySchema,
  practiceAnswerBodySchema,
  practiceHintBodySchema,
  practiceSelfAssessBodySchema,
  practiceSessionSchema,
  practiceStartBodySchema,
  practiceStartedSchema,
  practiceSummarySchema,
  presentedFeedbackSchema,
  presentedHintSchema,
  progressOverviewSchema,
  qualificationSchema,
  qualificationsQuerySchema,
  studyPlanTodaySchema,
  subjectSchema,
  subjectsQuerySchema,
  tokenIssuedSchema,
  tokenRequestSchema,
  topicNodeSchema,
  topicsQuerySchema,
} from "./schemas";

/**
 * The REST API v1 contract (§30, §38; ARCHITECTURE §3.3, §3.5, §3.6): every operation's method, path, auth, input
 * schemas and documented responses, in ONE registry.
 *
 * - Route handlers are built FROM these entries (`v1Route(operations.x, handler)` in ./route), so the auth mode, role
 *   gate, body cap and the Zod schemas that validate params / query / body are exactly the ones documented.
 * - `./openapi` renders the registry (plus the pre-existing tutor, search and upload routes, ./openapi-external) as the
 *   OpenAPI 3.1 document served at `GET /api/v1/openapi.json`.
 *
 * Versioning (docs/API.md): within v1 only additive changes are allowed (new operations, new optional inputs, new
 * response fields, new enum values clients must tolerate). Anything else ships as `/api/v2`.
 */

export const API_V1_BASE_PATH = "/api/v1";

export type HttpMethod = "get" | "post" | "delete";

/** Documented error statuses (all use the `{ error: { code, message, fieldErrors? } }` envelope). */
export type ErrorStatus = 400 | 401 | 402 | 403 | 404 | 409 | 422 | 429 | 503;

export type ApiTag =
  | "Auth"
  | "Account"
  | "Catalogue"
  | "Enrolments"
  | "Progress"
  | "Study plan"
  | "Lessons"
  | "Practice"
  | "Daily question"
  | "Flashcards"
  | "Notifications"
  | "AI tutor"
  | "Search"
  | "Uploads"
  | "Meta";

export interface ApiResponseSpec {
  status: number;
  description: string;
  /** Schema of the envelope's `data` (the item schema when `paginated`). Omitted for 204 / non-JSON bodies. */
  data?: z.ZodType;
  /** `{ data: item[], nextCursor }` list envelope. */
  paginated?: boolean;
  /** Extra top-level `meta` object next to `data` (e.g. the flashcard queue's counts). */
  meta?: z.ZodType;
  /** Body that is NOT wrapped in `{ data }` (the OpenAPI document itself). */
  raw?: z.ZodType;
  /** Defaults to application/json. */
  contentType?: "application/json" | "text/event-stream";
}

export interface ApiHeaderSpec {
  name: string;
  description: string;
  pattern?: string;
}

export interface ApiOperation {
  operationId: string;
  method: HttpMethod;
  /** OpenAPI path relative to {@link API_V1_BASE_PATH}, with `{param}` placeholders. */
  path: string;
  tag: ApiTag;
  summary: string;
  description?: string;
  /** `bearer`: a bearer token or a same-origin session cookie is required. `optional`: either works, or neither. */
  auth: "bearer" | "optional" | "none";
  /** Effective roles allowed (at least one). Omitted = any signed-in user. */
  roles?: readonly Role[];
  params?: z.ZodObject;
  query?: z.ZodObject;
  body?: z.ZodType;
  bodyContentType?: "application/json" | "multipart/form-data";
  headers?: readonly ApiHeaderSpec[];
  responses: readonly ApiResponseSpec[];
  errors: readonly ErrorStatus[];
  /** `Cache-Control` of successful responses (default `private, no-store`). */
  cacheControl?: string;
  /** JSON body cap (default 1 MB in apiRoute). */
  maxBodyBytes?: number;
  /** Skip the "school-set password must be changed first" refusal (account endpoints the client needs meanwhile). */
  allowPendingPasswordChange?: boolean;
  /** One-line rate-limit note for the document. */
  rateLimit?: string;
}

const STUDENT = ["STUDENT"] as const satisfies readonly Role[];
const IDEMPOTENCY_KEY: ApiHeaderSpec = {
  name: "Idempotency-Key",
  description: "8-64 characters. Repeating the request with the same key returns the original result instead of creating a second one.",
  pattern: "^[A-Za-z0-9_.:-]{8,64}$",
};
/** Every signed-in call (bearer token or session cookie) counts against one per-user bucket. */
const PER_USER = "600 requests per minute per user (`publicApi`), shared by all of the user's tokens and cookie sessions.";
/** IP-wide credential budget (`loginIp`), shared by POST /auth/token, /auth/otp/request, /auth/otp/verify and the web sign-in. */
const LOGIN_IP = "60 attempts per 15 minutes per IP across all identifiers and sign-in endpoints (`loginIp`)";
const CATALOGUE_CACHE = "private, max-age=300";

export const operations = {
  // -------------------------------------------------------------------------------------------------------------------
  // Auth
  // -------------------------------------------------------------------------------------------------------------------
  createToken: {
    operationId: "createToken",
    method: "post",
    path: "/auth/token",
    tag: "Auth",
    summary: "Sign in with a password and receive a bearer token",
    description:
      "Creates an API session (kind API) and returns its token ONCE. Wrong identifier and wrong password give the same 401. " +
      "If the password is right but the account's email / phone was never verified, a code is sent and the answer is 202 with a " +
      "`flowToken`: finish with POST /auth/otp/verify.",
    auth: "none",
    body: tokenRequestSchema,
    maxBodyBytes: 8 * 1024,
    responses: [
      { status: 201, description: "Signed in.", data: tokenIssuedSchema },
      { status: 202, description: "Password accepted; verify the email / phone with the code that was sent.", data: codeFlowSchema },
    ],
    errors: [400, 401, 403, 422, 429],
    rateLimit: `10 attempts per 15 minutes per (IP, identifier); ${LOGIN_IP}; 5 wrong passwords lock the account for 15 minutes.`,
  },
  revokeToken: {
    operationId: "revokeToken",
    method: "delete",
    path: "/auth/token",
    tag: "Auth",
    summary: "Sign out: revoke the bearer token used for this request",
    auth: "bearer",
    allowPendingPasswordChange: true,
    responses: [{ status: 204, description: "Revoked. The token no longer works." }],
    errors: [400, 401, 429],
    rateLimit: PER_USER,
  },
  requestOtp: {
    operationId: "requestLoginCode",
    method: "post",
    path: "/auth/otp/request",
    tag: "Auth",
    summary: "Passwordless sign-in, step 1: send a one-time code",
    description:
      "Sends a 6-digit code to the email / phone when it belongs to an account. The answer is identical either way (no account " +
      "enumeration). Ask again after `resendAfterSeconds` to resend.",
    auth: "none",
    body: otpRequestBodySchema,
    maxBodyBytes: 4 * 1024,
    responses: [{ status: 202, description: "A code was sent if the account exists.", data: codeFlowSchema }],
    errors: [400, 422, 429],
    rateLimit: `One code per 60 s per destination; 3 per 15 minutes and 10 per day per destination; 20 per hour per IP; ${LOGIN_IP}.`,
  },
  verifyOtp: {
    operationId: "verifyLoginCode",
    method: "post",
    path: "/auth/otp/verify",
    tag: "Auth",
    summary: "Passwordless sign-in, step 2: exchange the code for a bearer token",
    auth: "none",
    body: otpVerifyBodySchema,
    maxBodyBytes: 8 * 1024,
    responses: [{ status: 201, description: "Signed in.", data: tokenIssuedSchema }],
    errors: [400, 403, 422, 429],
    rateLimit: `5 tries per code; 10 per 15 minutes per destination and per (IP, destination) (\`apiOtpVerify\`); ${LOGIN_IP}.`,
  },
  getMe: {
    operationId: "getMe",
    method: "get",
    path: "/me",
    tag: "Account",
    summary: "The signed-in user and the current session",
    auth: "bearer",
    allowPendingPasswordChange: true,
    responses: [{ status: 200, description: "The current user.", data: meSchema }],
    errors: [401, 429],
    rateLimit: PER_USER,
  },

  // -------------------------------------------------------------------------------------------------------------------
  // Catalogue (onboarding pickers)
  // -------------------------------------------------------------------------------------------------------------------
  listBoards: {
    operationId: "listBoards",
    method: "get",
    path: "/catalogue/boards",
    tag: "Catalogue",
    summary: "Examination boards (ZIMSEC, Cambridge, ...)",
    description:
      "Only listed boards (AVAILABLE or COMING_SOON), in the country's display order. The catalogue endpoints need a signed-in " +
      "user (any role) and are cached privately for 5 minutes; they stay off the public internet until an edge rate limit exists " +
      "(ARCHITECTURE §3.4). Public catalogue pages are on the website.",
    auth: "bearer",
    query: boardsQuerySchema,
    cacheControl: CATALOGUE_CACHE,
    responses: [{ status: 200, description: "One page of boards.", data: boardSchema, paginated: true }],
    errors: [401, 403, 422, 429],
    rateLimit: PER_USER,
  },
  listQualifications: {
    operationId: "listQualifications",
    method: "get",
    path: "/catalogue/qualifications",
    tag: "Catalogue",
    summary: "Qualifications (O-Level, A-Level, IGCSE, ...), ordered by level, then board",
    auth: "bearer",
    query: qualificationsQuerySchema,
    cacheControl: CATALOGUE_CACHE,
    responses: [{ status: 200, description: "One page of qualifications.", data: qualificationSchema, paginated: true }],
    errors: [401, 403, 422, 429],
    rateLimit: PER_USER,
  },
  listSubjects: {
    operationId: "listSubjects",
    method: "get",
    path: "/catalogue/subjects",
    tag: "Catalogue",
    summary: "Subjects of a qualification, in category order",
    auth: "bearer",
    query: subjectsQuerySchema,
    cacheControl: CATALOGUE_CACHE,
    responses: [{ status: 200, description: "One page of subjects.", data: subjectSchema, paginated: true }],
    errors: [401, 403, 422, 429],
    rateLimit: PER_USER,
  },

  // -------------------------------------------------------------------------------------------------------------------
  // Enrolments
  // -------------------------------------------------------------------------------------------------------------------
  listEnrollments: {
    operationId: "listEnrollments",
    method: "get",
    path: "/enrollments",
    tag: "Enrolments",
    summary: "The student's subjects, each with its pinned syllabus version",
    auth: "bearer",
    roles: STUDENT,
    query: enrollmentsQuerySchema,
    responses: [{ status: 200, description: "One page of enrolments.", data: enrollmentSchema, paginated: true }],
    errors: [401, 403, 422, 429],
    rateLimit: PER_USER,
  },
  createEnrollments: {
    operationId: "createEnrollments",
    method: "post",
    path: "/enrollments",
    tag: "Enrolments",
    summary: "Enrol in subjects (pins each subject's current syllabus version)",
    description: "Idempotent: an active enrolment is returned unchanged; a paused or dropped one is re-activated with its history.",
    auth: "bearer",
    roles: STUDENT,
    body: enrollRequestSchema,
    maxBodyBytes: 16 * 1024,
    responses: [{ status: 201, description: "The enrolments, in request order.", data: z.array(enrollmentSchema) }],
    errors: [400, 401, 403, 422, 429],
    rateLimit: PER_USER,
  },

  // -------------------------------------------------------------------------------------------------------------------
  // Progress
  // -------------------------------------------------------------------------------------------------------------------
  getDashboard: {
    operationId: "getDashboard",
    method: "get",
    path: "/dashboard",
    tag: "Progress",
    summary: "The student dashboard: progress, countdown, streak, weak topics, today's target and recommendations",
    description: "Read from rollup tables; values are real or explicitly null / zero (never estimated).",
    auth: "bearer",
    roles: STUDENT,
    responses: [{ status: 200, description: "The dashboard.", data: dashboardSchema }],
    errors: [401, 403, 429],
    rateLimit: PER_USER,
  },
  getProgress: {
    operationId: "getProgress",
    method: "get",
    path: "/progress",
    tag: "Progress",
    summary: "Progress overview: mastery per subject, the last 30 days of activity, XP and level, streak, achievements",
    description: "The student's own rollups only; values are real or explicitly zero / null (never estimated).",
    auth: "bearer",
    roles: STUDENT,
    responses: [{ status: 200, description: "The overview.", data: progressOverviewSchema }],
    errors: [401, 403, 429],
    rateLimit: PER_USER,
  },
  listSubjectTopics: {
    operationId: "listSubjectTopics",
    method: "get",
    path: "/subjects/{id}/topics",
    tag: "Progress",
    summary: "The topic tree of the student's PINNED syllabus version, with mastery on every node",
    description: "Pages over the top-level topics; each item carries its whole subtree in `children`.",
    auth: "bearer",
    roles: STUDENT,
    params: idParamsSchema,
    query: topicsQuerySchema,
    responses: [{ status: 200, description: "One page of top-level topics.", data: topicNodeSchema, paginated: true }],
    errors: [401, 403, 404, 422, 429],
    rateLimit: PER_USER,
  },

  // -------------------------------------------------------------------------------------------------------------------
  // Lessons
  // -------------------------------------------------------------------------------------------------------------------
  getLesson: {
    operationId: "getLesson",
    method: "get",
    path: "/lessons/{id}",
    tag: "Lessons",
    summary: "A lesson, rendered server-side (HTML with KaTeX) and as plain text",
    description:
      "Only published lessons of the student's pinned syllabus versions. When the plan does not include the lesson, the answer " +
      "is still 200 with `locked: true` and `content: null` (show an upgrade prompt).",
    auth: "bearer",
    roles: STUDENT,
    params: idParamsSchema,
    query: lessonQuerySchema,
    responses: [{ status: 200, description: "The lesson.", data: lessonSchema }],
    errors: [401, 403, 404, 422, 429],
    rateLimit: PER_USER,
  },

  // -------------------------------------------------------------------------------------------------------------------
  // Practice
  // -------------------------------------------------------------------------------------------------------------------
  startPracticeSession: {
    operationId: "startPracticeSession",
    method: "post",
    path: "/practice/sessions",
    tag: "Practice",
    summary: "Start an adaptive practice session in an enrolled subject",
    description:
      "Selects questions adaptively from the pinned syllabus version within today's practice allowance (plan). Questions are " +
      "answer-safe: no correct answers, explanations or hint texts are sent before an answer is marked.",
    auth: "bearer",
    roles: STUDENT,
    body: practiceStartBodySchema,
    headers: [IDEMPOTENCY_KEY],
    maxBodyBytes: 16 * 1024,
    responses: [
      { status: 201, description: "Started.", data: practiceStartedSchema },
      { status: 200, description: "The session of this idempotency key already existed and was returned.", data: practiceStartedSchema },
    ],
    errors: [400, 401, 403, 404, 422, 429],
    rateLimit: PER_USER,
  },
  getPracticeSession: {
    operationId: "getPracticeSession",
    method: "get",
    path: "/practice/sessions/{id}",
    tag: "Practice",
    summary: "A practice session: every question (answer-safe) with the student's answers and the feedback of marked ones",
    auth: "bearer",
    roles: STUDENT,
    params: idParamsSchema,
    responses: [{ status: 200, description: "The session.", data: practiceSessionSchema }],
    errors: [401, 403, 404, 422, 429],
    rateLimit: PER_USER,
  },
  answerPracticeQuestion: {
    operationId: "answerPracticeQuestion",
    method: "post",
    path: "/practice/sessions/{id}/answers",
    tag: "Practice",
    summary: "Answer one question and get it marked immediately",
    description:
      "Returns correct / incorrect, the correct answer, explanation, concept and a lesson to study (§10). Idempotent per position: " +
      "answering an already marked question returns its stored result. The session closes after its last question.",
    auth: "bearer",
    roles: STUDENT,
    params: idParamsSchema,
    body: practiceAnswerBodySchema,
    maxBodyBytes: 256 * 1024,
    responses: [{ status: 200, description: "The marking result.", data: presentedFeedbackSchema }],
    errors: [400, 401, 403, 404, 409, 422, 429],
    rateLimit: PER_USER,
  },
  revealPracticeHint: {
    operationId: "revealPracticeHint",
    method: "post",
    path: "/practice/sessions/{id}/hints",
    tag: "Practice",
    summary: "Reveal the next hint of an unanswered question",
    description:
      "Hints come one at a time (`hintCount` on the question says how many exist). A revealed hint is stored: it appears in the " +
      "slot's `hints` from then on, and the number used is recorded with the answer. Only practice-style sessions with immediate feedback.",
    auth: "bearer",
    roles: STUDENT,
    params: idParamsSchema,
    body: practiceHintBodySchema,
    maxBodyBytes: 4 * 1024,
    responses: [{ status: 200, description: "The hint.", data: presentedHintSchema }],
    errors: [400, 401, 403, 404, 409, 422, 429],
    rateLimit: PER_USER,
  },
  selfAssessPracticeAnswer: {
    operationId: "selfAssessPracticeAnswer",
    method: "post",
    path: "/practice/sessions/{id}/self-assessment",
    tag: "Practice",
    summary: "Mark your own open answer against the mark scheme (when AI marking is not available)",
    description:
      "For an answer whose feedback is `pending` with a `selfAssessment` block: send the mark-scheme `pointIds` the student made " +
      "(or `marks` for a holistic scheme). The server totals and caps the marks and records them as SELF_ASSESSED.",
    auth: "bearer",
    roles: STUDENT,
    params: idParamsSchema,
    body: practiceSelfAssessBodySchema,
    maxBodyBytes: 16 * 1024,
    responses: [{ status: 200, description: "The answer's feedback with the new mark.", data: presentedFeedbackSchema }],
    errors: [400, 401, 403, 404, 409, 422, 429],
    rateLimit: PER_USER,
  },
  endPracticeSession: {
    operationId: "endPracticeSession",
    method: "post",
    path: "/practice/sessions/{id}/end",
    tag: "Practice",
    summary: "End a practice session early: answered questions are scored, unanswered ones left out",
    description: "Idempotent: ending a session that is already closed returns its results unchanged. No request body.",
    auth: "bearer",
    roles: STUDENT,
    params: idParamsSchema,
    responses: [{ status: 200, description: "The session's results.", data: attemptResultSchema }],
    errors: [401, 403, 404, 422, 429],
    rateLimit: PER_USER,
  },
  getPracticeSummary: {
    operationId: "getPracticeSummary",
    method: "get",
    path: "/practice/sessions/{id}/summary",
    tag: "Practice",
    summary: "Results of a session: score, per-topic results and mastery change, XP and every answer for review",
    auth: "bearer",
    roles: STUDENT,
    params: idParamsSchema,
    responses: [{ status: 200, description: "The summary.", data: practiceSummarySchema }],
    errors: [401, 403, 404, 422, 429],
    rateLimit: PER_USER,
  },

  // -------------------------------------------------------------------------------------------------------------------
  // Daily question (§46, the "Give me today's study question" flow of §30)
  // -------------------------------------------------------------------------------------------------------------------
  getDailyQuestion: {
    operationId: "getDailyQuestion",
    method: "get",
    path: "/daily-question",
    tag: "Daily question",
    summary: "Today's daily questions for the student's subjects, and the selected one once opened",
    description: "Read-only: open a subject's question with POST /daily-question/start (GET never creates anything).",
    auth: "bearer",
    roles: STUDENT,
    query: dailyQuestionQuerySchema,
    responses: [{ status: 200, description: "Today's overview.", data: dailyOverviewSchema }],
    errors: [401, 403, 422, 429],
    rateLimit: PER_USER,
  },
  startDailyQuestion: {
    operationId: "startDailyQuestion",
    method: "post",
    path: "/daily-question/start",
    tag: "Daily question",
    summary: "Open today's question for a subject (idempotent: once per day and subject)",
    auth: "bearer",
    roles: STUDENT,
    body: dailyStartBodySchema,
    maxBodyBytes: 4 * 1024,
    responses: [
      { status: 201, description: "Opened.", data: dailyCurrentSchema },
      { status: 200, description: "Already opened today; returned as it is.", data: dailyCurrentSchema },
    ],
    errors: [400, 401, 403, 404, 422, 429],
    rateLimit: PER_USER,
  },
  answerDailyQuestion: {
    operationId: "answerDailyQuestion",
    method: "post",
    path: "/daily-question/answer",
    tag: "Daily question",
    summary: "Answer today's question for a subject; marked immediately (counts for the streak)",
    description: "Opens the question first when needed. Answering again returns the stored result.",
    auth: "bearer",
    roles: STUDENT,
    body: dailyAnswerBodySchema,
    maxBodyBytes: 256 * 1024,
    responses: [{ status: 200, description: "The marking result.", data: dailyAnswerResultSchema }],
    errors: [400, 401, 403, 404, 409, 422, 429],
    rateLimit: PER_USER,
  },

  // -------------------------------------------------------------------------------------------------------------------
  // Flashcards (§18)
  // -------------------------------------------------------------------------------------------------------------------
  listDueFlashcards: {
    operationId: "listDueFlashcards",
    method: "get",
    path: "/flashcards/due",
    tag: "Flashcards",
    summary: "The review queue: due cards first, then today's new cards",
    description:
      "A study session, not an archive: the queue holds at most `limit` cards and `nextCursor` is always null. Review the cards, " +
      "then ask again for the next session. Counts are in `meta`.",
    auth: "bearer",
    roles: STUDENT,
    query: flashcardsDueQuerySchema,
    responses: [{ status: 200, description: "The queue.", data: flashcardSchema, paginated: true, meta: flashcardQueueMetaSchema }],
    errors: [401, 403, 404, 422, 429],
    rateLimit: PER_USER,
  },
  reviewFlashcard: {
    operationId: "reviewFlashcard",
    method: "post",
    path: "/flashcards/{id}/review",
    tag: "Flashcards",
    summary: "Rate a card Again / Hard / Good / Easy (spaced repetition)",
    auth: "bearer",
    roles: STUDENT,
    params: idParamsSchema,
    body: flashcardReviewBodySchema,
    headers: [IDEMPOTENCY_KEY],
    maxBodyBytes: 4 * 1024,
    responses: [{ status: 200, description: "The card's new schedule.", data: flashcardReviewOutcomeSchema }],
    errors: [401, 403, 404, 409, 422, 429],
    rateLimit: PER_USER,
  },

  syncFlashcardReviews: {
    operationId: "syncFlashcardReviews",
    method: "post",
    path: "/flashcards/reviews",
    tag: "Flashcards",
    summary: "Replay queued reviews in one request (offline sync)",
    description:
      "Applies up to 200 queued Again / Hard / Good / Easy presses in press order (`reviewedAt`). Each item is validated and applied " +
      "on its own, exactly like POST /flashcards/{id}/review, and is idempotent per `clientReviewId` (a replay answers " +
      "`replayed: true`); one bad item never blocks the others: its failure is reported in its own slot (`ok: false`). " +
      "Send a `clientReviewId` with every queued item so retries of a partially delivered batch are safe.",
    auth: "bearer",
    roles: STUDENT,
    body: flashcardSyncBodySchema,
    maxBodyBytes: 128 * 1024,
    responses: [{ status: 200, description: "One result per review, in press order.", data: z.array(flashcardSyncResultSchema) }],
    errors: [400, 401, 403, 422, 429],
    rateLimit: PER_USER,
  },

  // -------------------------------------------------------------------------------------------------------------------
  // Study plan (§16)
  // -------------------------------------------------------------------------------------------------------------------
  getStudyPlanToday: {
    operationId: "getStudyPlanToday",
    method: "get",
    path: "/study-plan/today",
    tag: "Study plan",
    summary: "Today's study-plan items and the plan they belong to",
    description:
      "Credits the student's latest work to the plan first, so finished items show as DONE. Without an active plan the answer is " +
      "200 with `plan: null` and `todayPlan: null` (plans are created on the website; `entitled` says whether the plan allows it).",
    auth: "bearer",
    roles: STUDENT,
    responses: [{ status: 200, description: "Today's plan.", data: studyPlanTodaySchema }],
    errors: [401, 403, 429],
    rateLimit: PER_USER,
  },

  // -------------------------------------------------------------------------------------------------------------------
  // Notifications
  // -------------------------------------------------------------------------------------------------------------------
  listNotifications: {
    operationId: "listNotifications",
    method: "get",
    path: "/notifications",
    tag: "Notifications",
    summary: "The in-app inbox, newest first",
    auth: "bearer",
    query: notificationsQuerySchema,
    responses: [{ status: 200, description: "One page of notifications.", data: notificationSchema, paginated: true }],
    errors: [400, 401, 403, 422, 429],
    rateLimit: PER_USER,
  },
  markNotificationsRead: {
    operationId: "markNotificationsRead",
    method: "post",
    path: "/notifications/read",
    tag: "Notifications",
    summary: "Mark notifications read: `{ ids: [...] }` or `{ all: true }`",
    description: "Only the caller's own notifications change; unknown ids are ignored.",
    auth: "bearer",
    body: notificationsReadBodySchema,
    maxBodyBytes: 16 * 1024,
    responses: [{ status: 200, description: "How many changed.", data: notificationsReadResultSchema }],
    errors: [400, 401, 403, 422, 429],
    rateLimit: PER_USER,
  },

  // -------------------------------------------------------------------------------------------------------------------
  // Meta
  // -------------------------------------------------------------------------------------------------------------------
  getOpenApiDocument: {
    operationId: "getOpenApiDocument",
    method: "get",
    path: "/openapi.json",
    tag: "Meta",
    summary: "This OpenAPI 3.1 document",
    auth: "none",
    cacheControl: "public, max-age=300",
    responses: [{ status: 200, description: "The document (not wrapped in `{ data }`).", raw: z.looseObject({ openapi: z.string() }) }],
    errors: [],
  },
} as const satisfies Record<string, ApiOperation>;

export type OperationName = keyof typeof operations;
