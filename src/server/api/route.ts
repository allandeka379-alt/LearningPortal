import "server-only";
import type { z } from "zod";
import type { RequestMeta } from "@/server/auth/sessions";
import { apiRoute, type ApiContext, type ApiRouteOptions, type RouteHandlerContext } from "@/server/lib/api";
import { AppError } from "@/server/lib/errors";
import type { ApiOperation } from "./contract";

/**
 * `v1Route(operation, handler)`: builds a `/api/v1` route handler from its contract entry (./contract), on top of the
 * shared `apiRoute` wrapper (`src/server/lib/api.ts`: bearer token or same-origin cookie, CSRF, per-token rate limit,
 * Zod validation, envelopes, error mapping).
 *
 * From the operation it takes the auth mode, the role gate, the params / query / body schemas, the body cap and the
 * `Cache-Control` of successful responses — the same values the OpenAPI document publishes, so the two cannot drift.
 * `apiRoute` refuses (403, `password_change_required`) users who still have to replace a school-set password, exactly
 * like the web guards, except on operations flagged `allowPendingPasswordChange` (`/me`, sign-out).
 */

type AuthModeOf<O> = O extends { auth: "none" } ? "none" : O extends { auth: "optional" } ? "optional" : "required";
type SchemaOf<O, K extends "params" | "query" | "body"> = O extends { [P in K]: infer S } ? (S extends z.ZodType ? S : undefined) : undefined;

/** The `apiRoute` input-schema record of an operation. */
export interface InputsOf<O> {
  params: SchemaOf<O, "params">;
  query: SchemaOf<O, "query">;
  body: SchemaOf<O, "body">;
}

export type V1Context<O extends ApiOperation> = ApiContext<AuthModeOf<O>, InputsOf<O>>;
export type V1Handler<O extends ApiOperation> = (context: V1Context<O>) => Promise<unknown> | unknown;

export function v1Route<const O extends ApiOperation>(
  operation: O,
  handler: V1Handler<O>,
  overrides: Pick<ApiRouteOptions<AuthModeOf<O>, InputsOf<O>>, "rateLimit"> = {},
): (request: Request, context?: RouteHandlerContext) => Promise<Response> {
  const auth = (operation.auth === "bearer" ? "required" : operation.auth) as AuthModeOf<O>;
  const input = {
    ...(operation.params ? { params: operation.params } : {}),
    ...(operation.query ? { query: operation.query } : {}),
    ...(operation.body ? { body: operation.body } : {}),
  } as InputsOf<O>;
  const options: ApiRouteOptions<AuthModeOf<O>, InputsOf<O>> = {
    auth,
    input,
    operation: `api.v1.${operation.operationId}`,
    ...(operation.roles ? { roles: operation.roles } : {}),
    ...(operation.cacheControl ? { cacheControl: operation.cacheControl } : {}),
    ...(operation.maxBodyBytes ? { maxBodyBytes: operation.maxBodyBytes } : {}),
    ...(operation.allowPendingPasswordChange ? { allowPendingPasswordChange: true } : {}),
    ...overrides,
  };
  return apiRoute(options, handler);
}

/** Request metadata for auth flows and audit entries (IP is hashed before storage by the callers). */
export function requestMetaOf(context: { ip: string | null; userAgent: string | null; requestId: string }): RequestMeta {
  return { ip: context.ip, userAgent: context.userAgent, requestId: context.requestId };
}

const IDEMPOTENCY_KEY_PATTERN = /^[A-Za-z0-9_.:-]{8,64}$/;

/**
 * The `Idempotency-Key` header (ARCHITECTURE §3.3), or `undefined` when absent. `pattern` narrows what the target
 * field accepts (e.g. practice keys allow no dots).
 *
 * @throws AppError VALIDATION (`Idempotency-Key`) for a malformed key.
 */
export function idempotencyKeyOf(request: Request, pattern: RegExp = IDEMPOTENCY_KEY_PATTERN): string | undefined {
  const raw = request.headers.get("idempotency-key");
  if (raw === null) return undefined;
  const key = raw.trim();
  if (!pattern.test(key)) {
    throw AppError.validation({ "Idempotency-Key": ["Use an Idempotency-Key of 8-64 characters: letters, digits, '-' or '_'."] });
  }
  return key;
}

/**
 * Merges a body field with the `Idempotency-Key` header: either may be given; both must agree when both are.
 *
 * @throws AppError VALIDATION when they differ.
 */
export function mergeIdempotencyKey(bodyKey: string | undefined, headerKey: string | undefined, field: string): string | undefined {
  if (bodyKey !== undefined && headerKey !== undefined && bodyKey !== headerKey) {
    throw AppError.validation({ [field]: [`${field} and the Idempotency-Key header must be the same.`] });
  }
  return bodyKey ?? headerKey;
}
