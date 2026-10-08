import "server-only";
import { z } from "zod";
import type { Role } from "@/generated/prisma/client";
import { assertPasswordSettled, type Actor } from "@/server/auth/actor";
import { hasPermission, type Permission } from "@/server/auth/permissions";
import { authenticateRequest, type RequestAuth } from "@/server/auth/request-auth";
import { AppError, toHttpResponse } from "./errors";
import { logger as rootLogger, type Logger } from "./logger";
import { assertRateLimit, rateLimits, type RateLimitInput } from "./rate-limit";
import { requestContextFromHeaders } from "./request";

/**
 * Route-handler wrapper for `/api/v1` and other JSON endpoints (ARCHITECTURE §3.3 REST conventions, §5.4 CSRF, §5.5
 * rate limits). One place for: request id, authentication (bearer token or same-origin cookie), coarse authorization,
 * the "school-set password must be changed first" refusal, rate limiting, Zod validation of params / query / body,
 * JSON envelopes and error mapping.
 *
 * Signed-in callers (bearer token OR session cookie) are always limited per user (`rateLimits.publicApi`, 600/min)
 * unless `rateLimit: false`, and a caller whose password was set by their school (`Actor.passwordMustChange`) is
 * refused with 403 FORBIDDEN (`details.reason = "password_change_required"`) unless the route opts out with
 * `allowPendingPasswordChange` (sign-out, `/me`).
 *
 * Envelopes: success `{ data }` (or `{ data, nextCursor }` via {@link paginated}); errors
 * `{ error: { code, message, fieldErrors? } }` with the status from `toHttpResponse`. Responses default to
 * `Cache-Control: private, no-store`; pass `cacheControl` for public catalogue endpoints.
 *
 * @example
 * export const GET = apiRoute(
 *   { auth: "required", input: { query: z.object({ cursor: z.string().optional(), limit: z.coerce.number().optional() }) } },
 *   async ({ actor, request }) => {
 *     const { cursor, limit } = parseCursorParams(request);
 *     const page = await notifications.list(actor, { cursor, limit });
 *     return paginated(page.items, page.nextCursor);
 *   },
 * );
 */

export type ApiAuthMode = "required" | "optional" | "none";

type ActorFor<M extends ApiAuthMode> = M extends "required" ? Actor : M extends "optional" ? Actor | null : null;
type AuthFor<M extends ApiAuthMode> = M extends "required" ? RequestAuth : M extends "optional" ? RequestAuth | null : null;

export interface ApiInputSchemas {
  params?: z.ZodType;
  query?: z.ZodType;
  body?: z.ZodType;
}

type InputOf<I, K extends keyof ApiInputSchemas> = I extends { [P in K]: infer S }
  ? S extends z.ZodType
    ? z.output<S>
    : undefined
  : undefined;

/** What a custom rate-limit function receives. */
export interface ApiRateLimitContext {
  request: Request;
  ip: string | null;
  actor: Actor | null;
  auth: RequestAuth | null;
}

export interface ApiRouteOptions<M extends ApiAuthMode, I extends ApiInputSchemas> {
  /** `required`: 401 without credentials; `optional`: actor may be null; `none`: credentials are not read. */
  auth: M;
  /** Coarse permission check (implies authentication). Resource checks stay in the service. */
  permission?: Permission;
  /** Require at least one of these effective roles (implies authentication). */
  roles?: readonly Role[];
  input?: I;
  /**
   * Extra limiters to assert (e.g. per IP for anonymous endpoints). Signed-in calls — bearer token or session cookie —
   * are always limited per user (`rateLimits.publicApi`, 600/min) unless this is `false`.
   */
  rateLimit?: false | ((context: ApiRateLimitContext) => RateLimitInput | readonly RateLimitInput[] | null);
  /**
   * Serve callers who still have to replace a school-set password (`Actor.passwordMustChange`). Default `false`: such
   * callers get 403 FORBIDDEN (`password_change_required`), exactly like the web guards. Only endpoints the client
   * needs meanwhile opt in (sign-out, `/me`).
   */
  allowPendingPasswordChange?: boolean;
  /** Name for logs (defaults to the path). */
  operation?: string;
  /** JSON body cap in bytes (default 1 MB). */
  maxBodyBytes?: number;
  /** `Cache-Control` for successful responses (default `private, no-store`). */
  cacheControl?: string;
}

export interface ApiContext<M extends ApiAuthMode, I extends ApiInputSchemas> {
  request: Request;
  requestId: string;
  ip: string | null;
  userAgent: string | null;
  auth: AuthFor<M>;
  actor: ActorFor<M>;
  params: InputOf<I, "params">;
  query: InputOf<I, "query">;
  body: InputOf<I, "body">;
  logger: Logger;
}

/** Second argument Next passes to route handlers. */
export interface RouteHandlerContext {
  params?: Promise<Record<string, string | string[] | undefined>>;
}

export type ApiHandler<M extends ApiAuthMode, I extends ApiInputSchemas> = (
  context: ApiContext<M, I>,
) => Promise<unknown> | unknown;

export const DEFAULT_MAX_BODY_BYTES = 1024 * 1024;
const DEFAULT_CACHE_CONTROL = "private, no-store";

/** Turns URLSearchParams into a plain object; repeated keys become arrays (`?tag=a&tag=b` → `{ tag: ["a", "b"] }`). */
export function searchParamsToObject(params: URLSearchParams): Record<string, string | string[]> {
  const result: Record<string, string | string[]> = {};
  for (const key of new Set(params.keys())) {
    const values = params.getAll(key);
    result[key] = values.length === 1 ? (values[0] ?? "") : values;
  }
  return result;
}

function parseWith<S extends z.ZodType>(schema: S, value: unknown): z.output<S> {
  const result = schema.safeParse(value);
  if (!result.success) throw AppError.fromZod(result.error);
  return result.data;
}

/** Reads a JSON request body with a byte cap (checked against Content-Length and while streaming). */
export async function readJsonBody(request: Request, maxBytes: number = DEFAULT_MAX_BODY_BYTES): Promise<unknown> {
  const contentType = request.headers.get("content-type") ?? "";
  if (!/^application\/(?:[\w.+-]+\+)?json\b/i.test(contentType.trim())) {
    throw new AppError("BAD_REQUEST", "Send the request body as JSON (Content-Type: application/json).");
  }
  const tooLarge = () => new AppError("BAD_REQUEST", `The request body is too large (limit ${maxBytes} bytes).`);
  const declared = Number(request.headers.get("content-length"));
  if (Number.isFinite(declared) && declared > maxBytes) throw tooLarge();
  if (request.body === null) throw new AppError("BAD_REQUEST", "The request body is empty.");

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > maxBytes) {
      await reader.cancel();
      throw tooLarge();
    }
    chunks.push(value);
  }
  const text = new TextDecoder().decode(Buffer.concat(chunks));
  try {
    return JSON.parse(text) as unknown;
  } catch {
    throw new AppError("BAD_REQUEST", "The request body is not valid JSON.");
  }
}

/** Copies a response with extra headers (headers of `Response.redirect()` and fetched responses are immutable). */
function withDefaultHeaders(response: Response, requestId: string, cacheControl: string): Response {
  const headers = new Headers(response.headers);
  if (!headers.has("x-request-id")) headers.set("x-request-id", requestId);
  if (!headers.has("cache-control")) headers.set("cache-control", cacheControl);
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

/**
 * Wraps a route handler. The handler returns a `Response` (sent as-is plus default headers), `undefined` (204), or
 * any JSON-serialisable value (sent as `{ data: value }` with status 200).
 */
export function apiRoute<M extends ApiAuthMode, I extends ApiInputSchemas = Record<never, never>>(
  options: ApiRouteOptions<M, I>,
  handler: ApiHandler<M, I>,
): (request: Request, context?: RouteHandlerContext) => Promise<Response> {
  return async (request, routeContext) => {
    const meta = requestContextFromHeaders(request.headers);
    const operation = options.operation ?? safePathname(request.url);
    const log = rootLogger.child({ requestId: meta.requestId, operation });
    try {
      const auth: RequestAuth | null = options.auth === "none" ? null : await authenticateRequest(request);
      const needsUser = options.auth === "required" || options.permission !== undefined || options.roles !== undefined;
      if (needsUser && auth === null) throw AppError.unauthenticated();
      if (auth !== null && options.permission !== undefined && !hasPermission(auth.actor, options.permission)) {
        throw AppError.forbidden();
      }
      if (auth !== null && options.roles !== undefined && !options.roles.some((role) => auth.actor.roles.includes(role))) {
        throw AppError.forbidden();
      }
      if (auth !== null && options.allowPendingPasswordChange !== true) assertPasswordSettled(auth.actor);

      if (options.rateLimit !== false) {
        const limits: RateLimitInput[] = [];
        // Per user, whichever credential (every token and cookie session of the user shares one bucket).
        if (auth !== null) limits.push(rateLimits.publicApi(auth.actor.userId));
        const extra = options.rateLimit?.({ request, ip: meta.ip, actor: auth?.actor ?? null, auth });
        if (extra) limits.push(...(Array.isArray(extra) ? extra : [extra as RateLimitInput]));
        for (const limit of limits) await assertRateLimit(limit);
      }

      const schemas = options.input;
      const params = schemas?.params ? parseWith(schemas.params, (await routeContext?.params) ?? {}) : undefined;
      const query = schemas?.query ? parseWith(schemas.query, searchParamsToObject(new URL(request.url).searchParams)) : undefined;
      const body = schemas?.body ? parseWith(schemas.body, await readJsonBody(request, options.maxBodyBytes)) : undefined;

      const result = await handler({
        request,
        requestId: meta.requestId,
        ip: meta.ip,
        userAgent: meta.userAgent,
        auth: auth as AuthFor<M>,
        actor: (auth?.actor ?? null) as ActorFor<M>,
        params: params as InputOf<I, "params">,
        query: query as InputOf<I, "query">,
        body: body as InputOf<I, "body">,
        logger: log,
      });
      const cacheControl = options.cacheControl ?? DEFAULT_CACHE_CONTROL;
      if (result instanceof Response) return withDefaultHeaders(result, meta.requestId, cacheControl);
      if (result === undefined) return withDefaultHeaders(new Response(null, { status: 204 }), meta.requestId, cacheControl);
      return withDefaultHeaders(Response.json({ data: result }), meta.requestId, cacheControl);
    } catch (error) {
      return toHttpResponse(error, { requestId: meta.requestId, operation, logger: log });
    }
  };
}

function safePathname(url: string): string {
  try {
    return new URL(url).pathname;
  } catch {
    return "api";
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// Responses and cursor pagination (ARCHITECTURE §3.3: `?cursor=&limit=`, default 20, max 100)
// ---------------------------------------------------------------------------------------------------------------------

export const DEFAULT_PAGE_LIMIT = 20;
export const MAX_PAGE_LIMIT = 100;
const CURSOR_PATTERN = /^[A-Za-z0-9_-]{1,512}$/;

export interface CursorParams {
  /** Opaque cursor from the previous page's `nextCursor`, or `null` for the first page. */
  cursor: string | null;
  limit: number;
}

/**
 * Reads `cursor` and `limit` from a request / URL / query string. `limit` defaults to 20 and must be 1-100.
 *
 * @throws AppError VALIDATION (`limit`, `cursor`).
 */
export function parseCursorParams(
  source: Request | URL | URLSearchParams | string,
  options: { defaultLimit?: number; maxLimit?: number } = {},
): CursorParams {
  const params =
    source instanceof URLSearchParams
      ? source
      : source instanceof URL
        ? source.searchParams
        : typeof source === "string"
          ? new URLSearchParams(source.startsWith("?") ? source.slice(1) : source)
          : new URL(source.url).searchParams;
  const maxLimit = options.maxLimit ?? MAX_PAGE_LIMIT;
  const defaultLimit = Math.min(options.defaultLimit ?? DEFAULT_PAGE_LIMIT, maxLimit);
  const rawLimit = params.get("limit");
  let limit = defaultLimit;
  if (rawLimit !== null && rawLimit !== "") {
    const parsed = Number(rawLimit);
    if (!Number.isInteger(parsed) || parsed < 1 || parsed > maxLimit) {
      throw AppError.validation({ limit: [`limit must be a whole number between 1 and ${maxLimit}.`] });
    }
    limit = parsed;
  }
  const rawCursor = params.get("cursor");
  if (rawCursor === null || rawCursor === "") return { cursor: null, limit };
  if (!CURSOR_PATTERN.test(rawCursor)) throw AppError.validation({ cursor: ["Invalid cursor."] });
  return { cursor: rawCursor, limit };
}

/** Encodes a cursor payload (e.g. `{ createdAt, id }` of the last row) as opaque base64url JSON. */
export function encodeCursor(value: unknown): string {
  return Buffer.from(JSON.stringify(value), "utf8").toString("base64url");
}

/**
 * Decodes a cursor produced by {@link encodeCursor} and validates its shape.
 *
 * @throws AppError VALIDATION (`cursor`) for anything malformed or tampered.
 */
export function decodeCursor<S extends z.ZodType>(cursor: string, schema: S): z.output<S> {
  try {
    const result = schema.safeParse(JSON.parse(Buffer.from(cursor, "base64url").toString("utf8")) as unknown);
    if (result.success) return result.data;
  } catch {
    // fall through
  }
  throw AppError.validation({ cursor: ["Invalid cursor."] });
}

/**
 * Splits a "fetch limit + 1" result into a page and the next cursor (built from the last returned row).
 *
 * @example const rows = await db.x.findMany({ take: limit + 1, ... }); const page = pageOf(rows, limit, (r) => encodeCursor({ id: r.id }));
 */
export function pageOf<T>(rows: readonly T[], limit: number, cursorOf: (last: T) => string): { items: T[]; nextCursor: string | null } {
  const items = rows.slice(0, limit);
  const last = items[items.length - 1];
  return { items, nextCursor: rows.length > limit && last !== undefined ? cursorOf(last) : null };
}

/** `{ data }` JSON response. */
export function apiJson<T>(data: T, init: ResponseInit = {}): Response {
  return Response.json({ data }, init);
}

/** `{ data, nextCursor }` JSON response for cursor-paginated lists. */
export function paginated<T>(items: readonly T[], nextCursor: string | null, init: ResponseInit = {}): Response {
  return Response.json({ data: items, nextCursor }, init);
}
