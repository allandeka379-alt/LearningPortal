import "server-only";
import { z } from "zod";
import { MAX_SUGGESTIONS } from "@/server/search/suggest";
import { TUTOR_ERROR_CODES } from "@/server/tutor/protocol";
import { createConversationSchema, sendTutorMessageSchema } from "@/server/tutor/service";
import { UPLOAD_ROUTE_PURPOSES } from "@/server/uploads/service";
import type { ApiOperation } from "./contract";
import { optionalQuery, paginationQueryShape } from "./pagination";

/**
 * Contract entries of the `/api/v1` routes that predate the contract and are implemented by their own modules
 * (reused as-is, never rewritten here): the AI tutor (with its Server-Sent Events stream), search suggestions and
 * uploads. They are DOCUMENTATION ONLY — the route files validate with the same service schemas imported below — and
 * are kept apart from ./contract so ordinary v1 routes do not load the tutor, search and upload modules.
 */

const STUDENT = ["STUDENT"] as const;
const PER_USER = "600 requests per minute per user (`publicApi`), shared by all of the user's tokens and cookie sessions.";

const tutorConversationSummarySchema = z.object({
  id: z.uuid(),
  title: z.string().nullable(),
  status: z.enum(["ACTIVE", "LOCKED", "ARCHIVED"]),
  subjectName: z.string().nullable(),
  topicName: z.string().nullable(),
  userMessageCount: z.int(),
  lastMessageAt: z.iso.datetime({ offset: true }).nullable(),
  createdAt: z.iso.datetime({ offset: true }),
});

/** One Server-Sent Event (`data: <json>\n\n`) of the tutor stream (src/server/tutor/protocol.ts). */
export const tutorStreamEventSchema = z
  .discriminatedUnion("type", [
    z.object({ type: z.literal("start"), turnMode: z.string(), hintLevel: z.int().nullable() }),
    z.object({ type: z.literal("delta"), text: z.string().describe("Plain-text chunk; append while streaming.") }),
    z.object({ type: z.literal("restart") }).describe("A fallback model took over: discard the text received so far."),
    z
      .looseObject({
        type: z.literal("done"),
        messageId: z.uuid(),
        userMessageId: z.uuid(),
        html: z.string().describe("The final answer rendered server-side (sanitised, KaTeX): replace the streamed text with it."),
        status: z.enum(["COMPLETE", "TRUNCATED", "REFUSED", "ABORTED"]),
        replayed: z.boolean(),
      })
      .describe("The persisted reply; also carries quota, turnsRemaining, title and helplines."),
    z.object({
      type: z.literal("error"),
      code: z.enum(TUTOR_ERROR_CODES),
      message: z.string(),
      upgradeHref: z.string().optional(),
      retryAfterSeconds: z.int().optional(),
    }),
  ])
  .describe("One event of the tutor stream, in order: start, delta..., done — or a single error.");

const suggestionSchema = z.object({
  title: z.string(),
  entityType: z.string(),
  entityId: z.string(),
  subtitle: z.string().nullable(),
  path: z.string(),
  accessTier: z.enum(["PUBLIC", "FREE", "PREMIUM"]),
});

export const externalOperations = {
  listTutorConversations: {
    operationId: "listTutorConversations",
    method: "get",
    path: "/tutor/conversations",
    tag: "AI tutor",
    summary: "The student's AI tutor conversations, most recently active first",
    description: "Private to the student (database row-level security): never visible to parents, teachers or staff.",
    auth: "bearer",
    roles: STUDENT,
    query: z.object({ ...paginationQueryShape }),
    responses: [{ status: 200, description: "One page of conversations.", data: tutorConversationSummarySchema, paginated: true }],
    errors: [401, 403, 422, 429],
    rateLimit: PER_USER,
  },
  createTutorConversation: {
    operationId: "createTutorConversation",
    method: "post",
    path: "/tutor/conversations",
    tag: "AI tutor",
    summary: "Start a tutor conversation, optionally about a subject, topic or answered question",
    auth: "bearer",
    roles: STUDENT,
    body: createConversationSchema,
    maxBodyBytes: 4 * 1024,
    responses: [{ status: 201, description: "Created.", data: z.object({ id: z.uuid(), title: z.string().nullable() }) }],
    errors: [400, 401, 403, 404, 422, 429],
    rateLimit: "30 new conversations per hour per student, plus the per-user limit.",
  },
  sendTutorMessage: {
    operationId: "sendTutorMessage",
    method: "post",
    path: "/tutor/conversations/{conversationId}/messages",
    tag: "AI tutor",
    summary: "Send one message; the reply streams back as Server-Sent Events",
    description:
      "Auth, CSRF and body errors are ordinary JSON errors. Once the turn starts the response is `text/event-stream`: one " +
      "JSON event per `data:` line (start, delta..., done) or a single `error` event (quota, plan, AI not configured, exam in " +
      "progress...). Closing the connection stops the model; the partial answer is kept as ABORTED. Retrying with the same " +
      "`clientMessageId` replays the stored reply without charging again. Without an AI key on the server the stream is one " +
      "`AI_NOT_CONFIGURED` error event — never a made-up answer.",
    auth: "bearer",
    roles: STUDENT,
    params: z.object({ conversationId: z.uuid({ message: "Unknown conversation." }) }),
    body: sendTutorMessageSchema,
    maxBodyBytes: 64 * 1024,
    responses: [{ status: 200, description: "The event stream.", contentType: "text/event-stream", raw: tutorStreamEventSchema }],
    errors: [400, 401, 403, 422, 429],
    rateLimit: "10 messages per minute per student plus the plan's daily AI allowance.",
  },
  searchSuggest: {
    operationId: "searchSuggest",
    method: "get",
    path: "/search/suggest",
    tag: "Search",
    summary: "Autocomplete titles for the search field",
    auth: "optional",
    query: z.object({
      q: z.string().max(200).default(""),
      subjectId: optionalQuery(z.uuid()),
      limit: optionalQuery(z.coerce.number().int().min(1).max(MAX_SUGGESTIONS)),
    }),
    responses: [{ status: 200, description: "Suggestions (titles only).", data: z.array(suggestionSchema) }],
    errors: [401, 403, 422, 429],
    rateLimit: "60 per minute per account (or per IP when signed out), plus the per-user limit when signed in.",
  },
  uploadFile: {
    operationId: "uploadFile",
    method: "post",
    path: "/uploads",
    tag: "Uploads",
    summary: "Upload a file (multipart/form-data with one `file` part)",
    description:
      "`?purpose=` media (content editors), import (CSV / Excel imports) or solver (a photo of a question). Size is capped per " +
      "purpose while streaming; types are checked by magic bytes, never by name.",
    auth: "bearer",
    query: z.object({ purpose: z.enum(UPLOAD_ROUTE_PURPOSES) }),
    bodyContentType: "multipart/form-data",
    responses: [{ status: 201, description: "Stored.", data: z.looseObject({ kind: z.string(), id: z.string() }) }],
    errors: [400, 401, 403, 422, 429],
    rateLimit: "30 uploads per hour per user.",
  },
} as const satisfies Record<string, ApiOperation>;
