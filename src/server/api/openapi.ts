import "server-only";
import { z } from "zod";
import { APP_NAME } from "@/lib/config";
import { FEATURE_NAMES, type FeatureFlags, type FeatureName } from "@/lib/features";
import { API_V1_BASE_PATH, operations, type ApiOperation, type ErrorStatus } from "./contract";
import { externalOperations } from "./openapi-external";
import {
  boardSchema,
  codeFlowSchema,
  dashboardSchema,
  enrollmentSchema,
  errorBodySchema,
  flashcardQueueMetaSchema,
  flashcardSchema,
  lessonSchema,
  meSchema,
  notificationSchema,
  practiceSessionSchema,
  practiceSlotSchema,
  presentedFeedbackSchema,
  presentedQuestionSchema,
  qualificationSchema,
  subjectSchema,
  tokenIssuedSchema,
  topicNodeSchema,
} from "./schemas";
import { questionResponseSchema } from "@/lib/questions/response";

/**
 * The OpenAPI 3.1 document of `/api/v1` (served at `GET /api/v1/openapi.json`), generated from the contract registry
 * (./contract, ./openapi-external) and the SAME Zod schemas the route handlers validate with, converted by Zod 4's
 * `z.toJSONSchema` (JSON Schema draft 2020-12, the dialect OpenAPI 3.1 uses).
 *
 * - Request bodies are converted with `io: "input"` (what a client may send: defaults make fields optional), responses
 *   with `io: "output"` (what the server sends). Response objects never declare `additionalProperties: false`:
 *   v1 grows by adding fields, and clients must ignore unknown ones.
 * - Every request / response schema becomes a named component (`#/components/schemas/...`); recursive schemas
 *   (topic trees, structured questions) are named too, so every `$ref` resolves inside this document.
 * - Built once per process (pure function of the code) and cached.
 */

export interface OpenApiDocument {
  openapi: "3.1.0";
  jsonSchemaDialect: string;
  info: { title: string; version: string; description: string };
  servers: { url: string; description: string }[];
  tags: { name: string; description?: string }[];
  paths: Record<string, Record<string, OpenApiOperationObject>>;
  components: {
    schemas: Record<string, JsonSchema>;
    responses: Record<string, unknown>;
    securitySchemes: Record<string, unknown>;
  };
}

export type JsonSchema = Record<string, unknown>;

interface OpenApiParameter {
  name: string;
  in: "path" | "query" | "header";
  required: boolean;
  description?: string;
  schema: JsonSchema;
}

export interface OpenApiOperationObject {
  operationId: string;
  summary: string;
  description?: string;
  tags: string[];
  security: Record<string, string[]>[];
  parameters?: OpenApiParameter[];
  requestBody?: { required: boolean; content: Record<string, { schema: JsonSchema }> };
  responses: Record<string, unknown>;
  "x-roles"?: string[];
  "x-rate-limit"?: string;
}

/** Semantic version of the v1 contract: the minor version grows with additive changes (docs/API.md "Versioning"). */
export const API_CONTRACT_VERSION = "1.1.0";

const COMPONENT_REF = "#/components/schemas/";
const ERROR_RESPONSES: Readonly<Record<ErrorStatus, { name: string; description: string }>> = {
  400: { name: "BadRequest", description: "Malformed request (not JSON, body too large, wrong flow)." },
  401: { name: "Unauthenticated", description: "Missing, invalid, expired or revoked credentials; or wrong sign-in details." },
  402: { name: "PaymentRequired", description: "A payment is required." },
  403: {
    name: "Forbidden",
    description:
      "Not allowed: wrong role, cross-site cookie request (CSRF), a school-set password that must be changed first (`password_change_required`), or ENTITLEMENT_REQUIRED (the plan does not include the feature: show an upgrade prompt).",
  },
  404: { name: "NotFound", description: "Not found — including other users' resources, which are never reported as forbidden." },
  409: { name: "Conflict", description: "The resource changed state (e.g. the session is already closed, the review id was reused)." },
  422: { name: "ValidationFailed", description: "Invalid input; `fieldErrors` maps fields to messages." },
  429: { name: "RateLimited", description: "RATE_LIMITED or QUOTA_EXCEEDED (plan allowance used up). Honour `Retry-After`." },
  503: { name: "Unavailable", description: "A dependency (e.g. AI) is unavailable." },
};

/** Components named in the document (response side). Recursive schemas MUST be listed so their refs resolve. */
const NAMED_RESPONSE_SCHEMAS: readonly (readonly [string, z.ZodType])[] = [
  ["Error", errorBodySchema],
  ["TokenIssued", tokenIssuedSchema],
  ["CodeFlow", codeFlowSchema],
  ["Me", meSchema],
  ["Board", boardSchema],
  ["Qualification", qualificationSchema],
  ["Subject", subjectSchema],
  ["Enrollment", enrollmentSchema],
  ["Dashboard", dashboardSchema],
  ["TopicNode", topicNodeSchema],
  ["Lesson", lessonSchema],
  ["QuestionResponse", questionResponseSchema],
  ["PresentedQuestion", presentedQuestionSchema],
  ["Feedback", presentedFeedbackSchema],
  ["PracticeSlot", practiceSlotSchema],
  ["PracticeSession", practiceSessionSchema],
  ["Flashcard", flashcardSchema],
  ["FlashcardQueueMeta", flashcardQueueMetaSchema],
  ["Notification", notificationSchema],
];

const TAGS: readonly { name: string; description: string }[] = [
  { name: "Auth", description: "Bearer tokens: password or one-time-code sign-in, sign-out." },
  { name: "Account", description: "The signed-in user." },
  { name: "Catalogue", description: "Boards, qualifications and subjects for onboarding." },
  { name: "Enrolments", description: "The student's subjects; each pins a syllabus version." },
  { name: "Progress", description: "Dashboard, progress overview and topic mastery." },
  { name: "Study plan", description: "Today's study-plan items (§16)." },
  { name: "Lessons", description: "Server-rendered lessons." },
  { name: "Practice", description: "Adaptive practice with immediate marking, hints, self-assessment and ending early." },
  { name: "Daily question", description: "One question a day per subject (§46)." },
  { name: "Flashcards", description: "Spaced-repetition review (§18), including batch offline sync." },
  { name: "Notifications", description: "In-app inbox." },
  { name: "AI tutor", description: "Socratic AI tutor with a streamed reply (§14, §15)." },
  { name: "Search", description: "Search suggestions." },
  { name: "Uploads", description: "Streamed file uploads." },
  { name: "Meta", description: "This document." },
];

/** Every documented operation: the v1 contract plus the pre-existing routes. */
export function allOperations(): ApiOperation[] {
  return [...Object.values(operations), ...Object.values(externalOperations)];
}

function pascal(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/**
 * Removes keys a component / parameter schema must not carry inside an OpenAPI document (`$schema`, and the fragment
 * `$id` the registry conversion adds — a component is addressed by its location), then drops noise that adds no
 * information: Zod's uuid regex next to `format: "uuid"`, and the ±2^53 bounds of every `z.int()`.
 */
function clean(schema: JsonSchema): JsonSchema {
  const rest: JsonSchema = { ...schema };
  for (const key of ["$schema", "$id", "id"]) delete rest[key];
  tidy(rest);
  return rest;
}

function tidy(node: unknown): void {
  if (Array.isArray(node)) {
    node.forEach(tidy);
    return;
  }
  if (node === null || typeof node !== "object") return;
  const record = node as Record<string, unknown>;
  if (record.format === "uuid" && typeof record.pattern === "string") delete record.pattern;
  if (record.minimum === Number.MIN_SAFE_INTEGER) delete record.minimum;
  if (record.maximum === Number.MAX_SAFE_INTEGER) delete record.maximum;
  Object.values(record).forEach(tidy);
}

function stripClosedObjects(node: unknown): void {
  if (Array.isArray(node)) {
    node.forEach(stripClosedObjects);
    return;
  }
  if (node === null || typeof node !== "object") return;
  const record = node as Record<string, unknown>;
  if (record.additionalProperties === false) delete record.additionalProperties;
  Object.values(record).forEach(stripClosedObjects);
}

function errorRefs(statuses: readonly ErrorStatus[]): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const status of statuses) out[String(status)] = { $ref: `#/components/responses/${ERROR_RESPONSES[status].name}` };
  return out;
}

function security(operation: ApiOperation): Record<string, string[]>[] {
  if (operation.auth === "none") return [];
  const signedIn: Record<string, string[]>[] = [{ bearerAuth: [] }, { sessionCookie: [] }];
  return operation.auth === "optional" ? [{}, ...signedIn] : signedIn;
}

/** Path / query parameters from an object schema (descriptions and required-ness taken from its JSON Schema). */
function parametersOf(schema: z.ZodObject | undefined, location: "path" | "query"): OpenApiParameter[] {
  if (!schema) return [];
  const json = z.toJSONSchema(schema, { target: "draft-2020-12", io: "input", unrepresentable: "any" }) as JsonSchema;
  const properties = (json.properties ?? {}) as Record<string, JsonSchema>;
  const required = new Set((json.required ?? []) as string[]);
  return Object.entries(properties).map(([name, property]) => {
    const { description, ...rest } = property;
    return {
      name,
      in: location,
      required: location === "path" || required.has(name),
      ...(typeof description === "string" ? { description } : {}),
      schema: clean(rest),
    };
  });
}

function describe(operation: ApiOperation): string | undefined {
  const parts: string[] = [];
  if (operation.description) parts.push(operation.description);
  if (operation.roles?.length) parts.push(`Roles: ${operation.roles.join(", ")}.`);
  if (operation.rateLimit) parts.push(`Rate limit: ${operation.rateLimit}`);
  return parts.length > 0 ? parts.join("\n\n") : undefined;
}

/** Builds the document (uncached). Exported for tests; routes use {@link getOpenApiDocument}. */
export function buildOpenApiDocument(): OpenApiDocument {
  const requestRegistry = z.registry<{ id: string }>();
  const responseRegistry = z.registry<{ id: string }>();
  const register = (registry: typeof requestRegistry, schema: z.ZodType, id: string): string => {
    const existing = registry.get(schema)?.id;
    if (existing) return existing;
    registry.add(schema, { id });
    return id;
  };
  for (const [id, schema] of NAMED_RESPONSE_SCHEMAS) register(responseRegistry, schema, id);

  const ops = allOperations();
  const operationIds = new Set<string>();
  const paths: OpenApiDocument["paths"] = {};

  for (const operation of ops) {
    if (operationIds.has(operation.operationId)) throw new Error(`openapi: duplicate operationId ${operation.operationId}`);
    operationIds.add(operation.operationId);
    const name = pascal(operation.operationId);

    const parameters = [
      ...parametersOf(operation.params, "path"),
      ...parametersOf(operation.query, "query"),
      ...(operation.headers ?? []).map((header) => ({
        name: header.name,
        in: "header" as const,
        required: false,
        description: header.description,
        schema: { type: "string", ...(header.pattern ? { pattern: header.pattern } : {}) },
      })),
    ];

    let requestBody: OpenApiOperationObject["requestBody"];
    if (operation.bodyContentType === "multipart/form-data") {
      requestBody = {
        required: true,
        content: {
          "multipart/form-data": {
            schema: { type: "object", required: ["file"], properties: { file: { type: "string", contentMediaType: "application/octet-stream" } } },
          },
        },
      };
    } else if (operation.body) {
      const id = register(requestRegistry, operation.body, `${name}Request`);
      requestBody = { required: true, content: { "application/json": { schema: { $ref: `${COMPONENT_REF}${id}` } } } };
    }

    const responses: Record<string, unknown> = {};
    for (const response of operation.responses) {
      const headers = {
        "x-request-id": { description: "Correlation id; quote it when reporting a problem.", schema: { type: "string" } },
      };
      let bodySchema: z.ZodType | undefined;
      if (response.raw) bodySchema = response.raw;
      else if (response.data && response.paginated) {
        bodySchema = z.object({
          data: z.array(response.data),
          nextCursor: z.string().nullable().describe("Pass as `cursor` to get the next page; null on the last page."),
          ...(response.meta ? { meta: response.meta } : {}),
        });
      } else if (response.data) bodySchema = z.object({ data: response.data });

      if (!bodySchema) {
        responses[String(response.status)] = { description: response.description, headers };
        continue;
      }
      const id = register(responseRegistry, bodySchema, `${name}${response.status}Response`);
      responses[String(response.status)] = {
        description: response.description,
        headers,
        content: { [response.contentType ?? "application/json"]: { schema: { $ref: `${COMPONENT_REF}${id}` } } },
      };
    }
    Object.assign(responses, errorRefs(operation.errors));
    if (operation.auth !== "none" && !operation.errors.includes(401)) Object.assign(responses, errorRefs([401]));
    responses.default = { $ref: "#/components/responses/InternalError" };

    const description = describe(operation);
    const item: OpenApiOperationObject = {
      operationId: operation.operationId,
      summary: operation.summary,
      ...(description ? { description } : {}),
      tags: [operation.tag],
      security: security(operation),
      ...(parameters.length > 0 ? { parameters } : {}),
      ...(requestBody ? { requestBody } : {}),
      responses,
      ...(operation.roles?.length ? { "x-roles": [...operation.roles] } : {}),
      ...(operation.rateLimit ? { "x-rate-limit": operation.rateLimit } : {}),
    };
    const pathItem = (paths[operation.path] ??= {});
    if (pathItem[operation.method]) throw new Error(`openapi: duplicate ${operation.method.toUpperCase()} ${operation.path}`);
    pathItem[operation.method] = item;
  }

  const uri = (id: string) => `${COMPONENT_REF}${id}`;
  const requestSchemas = z.toJSONSchema(requestRegistry, { target: "draft-2020-12", io: "input", unrepresentable: "any", uri }).schemas;
  const responseSchemas = z.toJSONSchema(responseRegistry, { target: "draft-2020-12", io: "output", unrepresentable: "any", uri }).schemas;
  if ("__shared" in requestSchemas || "__shared" in responseSchemas) {
    throw new Error("openapi: a recursive schema is not named; add it to NAMED_RESPONSE_SCHEMAS");
  }
  const schemas: Record<string, JsonSchema> = {};
  for (const [id, schema] of Object.entries(requestSchemas)) schemas[id] = clean(schema as JsonSchema);
  for (const [id, schema] of Object.entries(responseSchemas)) {
    if (id in schemas) throw new Error(`openapi: component ${id} is both a request and a response schema`);
    const cleaned = clean(schema as JsonSchema);
    stripClosedObjects(cleaned);
    schemas[id] = cleaned;
  }

  const errorResponses: Record<string, unknown> = {};
  for (const [status, { name, description }] of Object.entries(ERROR_RESPONSES)) {
    errorResponses[name] = {
      description: `${status}: ${description}`,
      ...(status === "429"
        ? { headers: { "retry-after": { description: "Seconds to wait before retrying.", schema: { type: "integer" } } } }
        : {}),
      content: { "application/json": { schema: { $ref: `${COMPONENT_REF}Error` } } },
    };
  }
  errorResponses.InternalError = {
    description: "Unexpected error. The message carries a reference to quote; nothing internal is exposed.",
    content: { "application/json": { schema: { $ref: `${COMPONENT_REF}Error` } } },
  };

  return {
    openapi: "3.1.0",
    jsonSchemaDialect: "https://spec.openapis.org/oas/3.1/dialect/base",
    info: {
      title: `${APP_NAME} API`,
      version: API_CONTRACT_VERSION,
      description:
        "REST API v1 for the native app and integrations. JSON envelopes `{ data }` / `{ data, nextCursor }` and " +
        "`{ error: { code, message, fieldErrors? } }`; cursor pagination (`?cursor=&limit=`, default 20, max 100); bearer " +
        "tokens from POST /auth/token. Within v1 changes are additive only — ignore unknown fields. See docs/API.md.",
    },
    servers: [{ url: API_V1_BASE_PATH, description: "This deployment" }],
    tags: TAGS.map((tag) => ({ ...tag })),
    paths,
    components: {
      schemas,
      responses: errorResponses,
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "opaque",
          description: "`Authorization: Bearer dz_...` from POST /auth/token or /auth/otp/verify. Revoke with DELETE /auth/token.",
        },
        sessionCookie: {
          type: "apiKey",
          in: "cookie",
          name: "__Host-dz_session",
          description: "The website's session cookie (same-origin only: unsafe methods must send a matching Origin).",
        },
      },
    },
  };
}

let cached: OpenApiDocument | null = null;

/** The document, built on first use and cached for the life of the process. */
export function getOpenApiDocument(): OpenApiDocument {
  cached ??= buildOpenApiDocument();
  return cached;
}

/** Tags whose operations belong to a switchable feature (src/lib/features.ts). */
const FEATURE_TAGS: Readonly<Partial<Record<FeatureName, readonly string[]>>> = { ai: ["AI tutor"] };

/** The tags left out of the served document under `features` (their routes return 404 while the feature is off). */
export function switchedOffTags(features: FeatureFlags): string[] {
  return FEATURE_NAMES.flatMap((name) => (features[name] ? [] : [...(FEATURE_TAGS[name] ?? [])]));
}

/** `document` without the operations and tags of switched-off features, so clients are never offered a 404. */
export function withoutSwitchedOffFeatures(document: OpenApiDocument, features: FeatureFlags): OpenApiDocument {
  const hidden = new Set(switchedOffTags(features));
  if (hidden.size === 0) return document;
  const paths: OpenApiDocument["paths"] = {};
  for (const [path, item] of Object.entries(document.paths)) {
    const kept = Object.entries(item).filter(([, operation]) => !operation.tags.some((tag) => hidden.has(tag)));
    if (kept.length > 0) paths[path] = Object.fromEntries(kept);
  }
  return { ...document, tags: document.tags.filter((tag) => !hidden.has(tag.name)), paths };
}
