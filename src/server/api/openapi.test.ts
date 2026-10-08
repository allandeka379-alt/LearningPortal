import { describe, expect, it, vi } from "vitest";
import { GET } from "@/app/api/v1/openapi.json/route";
import { getEnv } from "@/server/lib/env";
import { operations } from "./contract";
import {
  allOperations,
  buildOpenApiDocument,
  getOpenApiDocument,
  withoutSwitchedOffFeatures,
  type JsonSchema,
  type OpenApiDocument,
} from "./openapi";

// The served document follows the feature flags (the AI tutor operations are left out while `features.ai` is off).
const flags = vi.hoisted(() => ({ ai: false }));
vi.mock("@/server/lib/settings", async (importOriginal) =>
  (await import("../../../tests/support/feature-flags")).settingsWithFeatureFlags(await importOriginal(), flags),
);

/**
 * The OpenAPI 3.1 document (GET /api/v1/openapi.json): structurally valid, JSON-serialisable, every `$ref` resolvable,
 * every required path present, parameters consistent with the path templates, and generated from the same Zod
 * schemas the routes validate with.
 */

const ORIGIN = new URL(getEnv().APP_URL).origin;
const METHODS = ["get", "post", "put", "patch", "delete"] as const;

/** Resolves a local JSON pointer (`#/a/b`) against the document. */
function resolvePointer(document: unknown, ref: string): unknown {
  if (!ref.startsWith("#/")) return undefined;
  let node: unknown = document;
  for (const raw of ref.slice(2).split("/")) {
    const key = raw.replace(/~1/g, "/").replace(/~0/g, "~");
    if (node === null || typeof node !== "object" || !(key in node)) return undefined;
    node = (node as Record<string, unknown>)[key];
  }
  return node;
}

function collectRefs(node: unknown, out: string[] = []): string[] {
  if (Array.isArray(node)) node.forEach((item) => collectRefs(item, out));
  else if (node !== null && typeof node === "object") {
    for (const [key, value] of Object.entries(node)) {
      if (key === "$ref" && typeof value === "string") out.push(value);
      else collectRefs(value, out);
    }
  }
  return out;
}

function hasKeyDeep(node: unknown, predicate: (key: string, value: unknown) => boolean): boolean {
  if (Array.isArray(node)) return node.some((item) => hasKeyDeep(item, predicate));
  if (node === null || typeof node !== "object") return false;
  return Object.entries(node).some(([key, value]) => predicate(key, value) || hasKeyDeep(value, predicate));
}

function operationAt(document: OpenApiDocument, method: string, path: string) {
  const operation = document.paths[path]?.[method];
  if (!operation) throw new Error(`missing ${method.toUpperCase()} ${path}`);
  return operation;
}

/** The resolved JSON schema of an operation's success response body. */
function responseSchema(document: OpenApiDocument, method: string, path: string, status: number): JsonSchema {
  const response = operationAt(document, method, path).responses[String(status)] as { content?: Record<string, { schema: { $ref: string } }> };
  const ref = response.content?.["application/json"]?.schema.$ref;
  if (!ref) throw new Error(`no JSON body for ${method} ${path} ${status}`);
  return resolvePointer(document, ref) as JsonSchema;
}

describe("OpenAPI document", () => {
  const document = JSON.parse(JSON.stringify(buildOpenApiDocument())) as OpenApiDocument;

  it("is an OpenAPI 3.1 document with info, servers, security schemes and tags", () => {
    expect(document.openapi).toBe("3.1.0");
    expect(document.info.title).toMatch(/API$/);
    expect(document.info.version).toMatch(/^\d+\.\d+\.\d+$/);
    expect(document.servers[0]?.url).toBe("/api/v1");
    expect(Object.keys(document.components.securitySchemes).sort()).toEqual(["bearerAuth", "sessionCookie"]);
    const tagNames = new Set(document.tags.map((tag) => tag.name));
    for (const operation of allOperations()) expect(tagNames.has(operation.tag)).toBe(true);
  });

  it("documents every required path and method", () => {
    const required: [string, string][] = [
      ["post", "/auth/token"],
      ["delete", "/auth/token"],
      ["post", "/auth/otp/request"],
      ["post", "/auth/otp/verify"],
      ["get", "/me"],
      ["get", "/catalogue/boards"],
      ["get", "/catalogue/qualifications"],
      ["get", "/catalogue/subjects"],
      ["get", "/enrollments"],
      ["post", "/enrollments"],
      ["get", "/dashboard"],
      ["get", "/subjects/{id}/topics"],
      ["get", "/lessons/{id}"],
      ["post", "/practice/sessions"],
      ["get", "/practice/sessions/{id}"],
      ["post", "/practice/sessions/{id}/answers"],
      ["get", "/practice/sessions/{id}/summary"],
      ["post", "/practice/sessions/{id}/hints"],
      ["post", "/practice/sessions/{id}/self-assessment"],
      ["post", "/practice/sessions/{id}/end"],
      ["post", "/flashcards/reviews"],
      ["get", "/study-plan/today"],
      ["get", "/progress"],
      ["get", "/daily-question"],
      ["post", "/daily-question/answer"],
      ["get", "/flashcards/due"],
      ["post", "/flashcards/{id}/review"],
      ["get", "/notifications"],
      ["post", "/notifications/read"],
      ["get", "/openapi.json"],
      ["post", "/tutor/conversations/{conversationId}/messages"],
    ];
    for (const [method, path] of required) expect(() => operationAt(document, method, path), `${method} ${path}`).not.toThrow();
  });

  it("has unique operation ids, responses on every operation and path parameters matching the templates", () => {
    const ids = new Set<string>();
    for (const [path, item] of Object.entries(document.paths)) {
      expect(path.startsWith("/")).toBe(true);
      const placeholders = [...path.matchAll(/\{([^}]+)\}/g)].map((match) => match[1]).sort();
      for (const method of METHODS) {
        const operation = item[method];
        if (!operation) continue;
        expect(ids.has(operation.operationId), operation.operationId).toBe(false);
        ids.add(operation.operationId);
        expect(Object.keys(operation.responses).length).toBeGreaterThan(0);
        const pathParams = (operation.parameters ?? []).filter((p) => p.in === "path");
        expect(pathParams.map((p) => p.name).sort(), `${method} ${path}`).toEqual(placeholders);
        for (const parameter of pathParams) expect(parameter.required).toBe(true);
      }
    }
    expect(ids.size).toBe(allOperations().length);
  });

  it("resolves every $ref inside the document and carries no stray JSON Schema roots", () => {
    const refs = collectRefs(document);
    expect(refs.length).toBeGreaterThan(20);
    for (const ref of new Set(refs)) expect(resolvePointer(document, ref), ref).toBeDefined();
    expect(document.components.schemas).not.toHaveProperty("__shared");
    expect(hasKeyDeep(document.components, (key) => key === "$schema" || key === "$id")).toBe(false);
  });

  it("generates request schemas from the routes' Zod input schemas", () => {
    const tokenBody = resolvePointer(document, "#/components/schemas/CreateTokenRequest") as JsonSchema;
    expect(tokenBody).toMatchObject({ type: "object", required: expect.arrayContaining(["identifier", "password"]) });
    expect(tokenBody.additionalProperties).toBe(false); // strict input: unknown fields are rejected

    // Defaults make fields optional for the client (io: input): only subjectId is required to start practice.
    const start = resolvePointer(document, "#/components/schemas/StartPracticeSessionRequest") as JsonSchema;
    expect(start.required).toEqual(["subjectId"]);

    const answer = resolvePointer(document, "#/components/schemas/AnswerPracticeQuestionRequest") as { properties: Record<string, JsonSchema> };
    expect(JSON.stringify(answer.properties.response)).toContain("MULTIPLE_CHOICE");

    const boards = operationAt(document, "get", "/catalogue/boards").parameters ?? [];
    expect(boards.map((p) => [p.name, p.in, p.required])).toEqual([
      ["cursor", "query", false],
      ["limit", "query", false],
      ["countryId", "query", false],
    ]);
    const subjects = operationAt(document, "get", "/catalogue/subjects").parameters ?? [];
    expect(subjects.find((p) => p.name === "qualificationId")).toMatchObject({ required: true, schema: { type: "string", format: "uuid" } });
    const review = operationAt(document, "post", "/flashcards/{id}/review").parameters ?? [];
    expect(review.find((p) => p.in === "header")?.name).toBe("Idempotency-Key");

    // The batch sync documents its item shape; the self-assessment body is the practice service's schema minus the path id.
    const batch = resolvePointer(document, "#/components/schemas/SyncFlashcardReviewsRequest") as { required: string[]; properties: Record<string, JsonSchema> };
    expect(batch.required).toEqual(["reviews"]);
    expect(batch.properties.reviews).toMatchObject({ type: "array", minItems: 1, maxItems: 200 });
    const selfAssess = resolvePointer(document, "#/components/schemas/SelfAssessPracticeAnswerRequest") as { required: string[]; properties: Record<string, JsonSchema> };
    expect(selfAssess.required).toEqual(["position"]);
    expect(Object.keys(selfAssess.properties).sort()).toEqual(["marks", "pointIds", "position"]);
    expect(operationAt(document, "post", "/practice/sessions/{id}/end").requestBody).toBeUndefined();
    expect(operationAt(document, "get", "/study-plan/today").tags).toEqual(["Study plan"]);
  });

  it("documents envelopes: { data }, { data, nextCursor } and the error shape; responses stay open for additive fields", () => {
    const list = responseSchema(document, "get", "/notifications", 200);
    expect(list).toMatchObject({ type: "object", required: ["data", "nextCursor"] });
    expect((list.properties as Record<string, JsonSchema>).data).toMatchObject({ type: "array", items: { $ref: "#/components/schemas/Notification" } });
    const me = responseSchema(document, "get", "/me", 200);
    expect((me.properties as Record<string, JsonSchema>).data).toEqual({ $ref: "#/components/schemas/Me" });
    expect(hasKeyDeep(document.components.schemas.Me, (key, value) => key === "additionalProperties" && value === false)).toBe(false);

    const error = document.components.schemas.Error as { properties: { error: { properties: Record<string, unknown>; required: string[] } } };
    expect(error.properties.error.required).toEqual(["code", "message"]);
    const unauthorized = operationAt(document, "get", "/dashboard").responses["401"];
    expect(unauthorized).toEqual({ $ref: "#/components/responses/Unauthenticated" });
    expect(document.components.responses).toHaveProperty("RateLimited.headers.retry-after");

    // Recursive schemas are named components referencing themselves.
    expect(JSON.stringify(document.components.schemas.TopicNode)).toContain("#/components/schemas/TopicNode");
    expect(JSON.stringify(document.components.schemas.PresentedQuestion)).toContain("#/components/schemas/PresentedQuestion");
  });

  it("states the auth requirement of every operation", () => {
    for (const operation of allOperations()) {
      const documented = operationAt(document, operation.method, operation.path);
      if (operation.auth === "none") expect(documented.security).toEqual([]);
      else expect(documented.security).toEqual(expect.arrayContaining([{ bearerAuth: [] }]));
      if (operation.auth === "bearer") expect(documented.responses["401"]).toBeDefined();
    }
    expect(operationAt(document, "get", "/dashboard")["x-roles"]).toEqual(["STUDENT"]);
  });

  it("documents the tutor stream as text/event-stream", () => {
    const stream = operationAt(document, "post", "/tutor/conversations/{conversationId}/messages").responses["200"] as { content: Record<string, unknown> };
    expect(Object.keys(stream.content)).toEqual(["text/event-stream"]);
  });

  it("is cached per process", () => {
    expect(getOpenApiDocument()).toBe(getOpenApiDocument());
  });
});

describe("GET /api/v1/openapi.json", () => {
  it("serves the document publicly, cacheable, with a request id", async () => {
    const response = await GET(new Request(`${ORIGIN}/api/v1/openapi.json`));
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("application/json");
    expect(response.headers.get("cache-control")).toBe(operations.getOpenApiDocument.cacheControl);
    expect(response.headers.get("x-request-id")).toBeTruthy();
    const body = (await response.json()) as OpenApiDocument;
    expect(body.openapi).toBe("3.1.0");
    // AI is off: everything but the tutor operations.
    const expected = Object.keys(getOpenApiDocument().paths).filter((path) => !path.startsWith("/tutor/"));
    expect(Object.keys(body.paths)).toEqual(expected);
    expect(body.tags.map((tag) => tag.name)).not.toContain("AI tutor");
  });

  it("lists the tutor operations again while AI is switched on", async () => {
    flags.ai = true;
    try {
      const body = (await (await GET(new Request(`${ORIGIN}/api/v1/openapi.json`))).json()) as OpenApiDocument;
      expect(Object.keys(body.paths)).toEqual(Object.keys(getOpenApiDocument().paths));
    } finally {
      flags.ai = false;
    }
  });
});

describe("withoutSwitchedOffFeatures", () => {
  it("drops only the operations and tags of switched-off features", () => {
    const full = getOpenApiDocument();
    const off = withoutSwitchedOffFeatures(full, { ai: false, whatsapp: false, email: false, sms: false, stripe: false });
    expect(Object.keys(off.paths).some((path) => path.startsWith("/tutor/"))).toBe(false);
    expect(Object.keys(off.paths).length).toBeGreaterThan(10);
    expect(off.components).toBe(full.components);
    expect(withoutSwitchedOffFeatures(full, { ai: true, whatsapp: false, email: false, sms: false, stripe: false })).toBe(full);
  });
});
