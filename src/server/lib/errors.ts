import { randomBytes } from "node:crypto";
// The standalone module, not "next/navigation": that entry loads React client-context code and crashes outside Next
// under `tsx --conditions=react-server` (worker, seed). It is the same function Next re-exports.
import { unstable_rethrow } from "next/dist/client/components/unstable-rethrow";
import { z } from "zod";
import { logger as rootLogger, type Logger } from "./logger";

/**
 * Error contract (CLAUDE.md rule 4, ARCHITECTURE §3.1).
 *
 * Services throw {@link AppError} for expected failures with a message that is SAFE TO SHOW USERS. Routes map errors
 * to {@link ActionResult} (Server Actions, via {@link safeAction}) or HTTP problem responses (route handlers, via
 * {@link toHttpResponse}). Unexpected errors are logged with a correlation id and surface only as a generic
 * `INTERNAL` message: stack traces and internal messages never reach clients.
 *
 * Not `server-only`: the worker imports it under plain Node. Client components may `import type` from here.
 */

export const ERROR_CODES = [
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
] as const;

export type ErrorCode = (typeof ERROR_CODES)[number];

/** HTTP status for each code. `ENTITLEMENT_REQUIRED` is 403 (the `code` tells clients to show an upgrade prompt). */
export const HTTP_STATUS_BY_CODE: Readonly<Record<ErrorCode, number>> = {
  UNAUTHENTICATED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  VALIDATION: 422,
  CONFLICT: 409,
  RATE_LIMITED: 429,
  QUOTA_EXCEEDED: 429,
  PAYMENT_REQUIRED: 402,
  ENTITLEMENT_REQUIRED: 403,
  AI_UNAVAILABLE: 503,
  BAD_REQUEST: 400,
  INTERNAL: 500,
};

/** Default user-facing messages, used when a throw site does not supply one. */
export const DEFAULT_ERROR_MESSAGES: Readonly<Record<ErrorCode, string>> = {
  UNAUTHENTICATED: "Please sign in to continue.",
  FORBIDDEN: "You don't have permission to do that.",
  NOT_FOUND: "We couldn't find what you were looking for.",
  VALIDATION: "Please check the highlighted fields and try again.",
  CONFLICT: "This was changed by someone else or already exists. Refresh and try again.",
  RATE_LIMITED: "Too many attempts. Please wait a moment and try again.",
  QUOTA_EXCEEDED: "You've reached your limit for now. Please try again later.",
  PAYMENT_REQUIRED: "A payment is required to continue.",
  ENTITLEMENT_REQUIRED: "This feature isn't included in your current plan.",
  AI_UNAVAILABLE: "AI help is not available right now.",
  BAD_REQUEST: "The request could not be processed.",
  INTERNAL: "Something went wrong on our side. Please try again.",
};

/** Field path (dot-joined, e.g. `answers.0.value`) to messages. Form-level errors use the `_form` key. */
export type FieldErrors = Record<string, string[]>;

/** Key used in {@link FieldErrors} for errors that do not belong to a single field. */
export const FORM_ERROR_KEY = "_form";

export interface AppErrorOptions {
  fieldErrors?: FieldErrors;
  /** Diagnostic context for logs only. Never sent to clients; redacted by the logger. */
  details?: Record<string, unknown>;
  /** For `RATE_LIMITED` / `QUOTA_EXCEEDED`: sent as the `Retry-After` header by {@link toHttpResponse}. */
  retryAfterSeconds?: number;
  cause?: unknown;
}

const APP_ERROR_BRAND = Symbol.for("dzidza.AppError");

/** Expected, user-presentable failure. `message` must be safe to show to end users. */
export class AppError extends Error {
  readonly code: ErrorCode;
  readonly httpStatus: number;
  // `declare`: optional fields become own properties only when set (no `fieldErrors: undefined` in logs/JSON).
  declare readonly fieldErrors?: FieldErrors;
  declare readonly details?: Record<string, unknown>;
  declare readonly retryAfterSeconds?: number;
  readonly [APP_ERROR_BRAND] = true;

  constructor(code: ErrorCode, message: string = DEFAULT_ERROR_MESSAGES[code], options: AppErrorOptions = {}) {
    super(message, options.cause === undefined ? undefined : { cause: options.cause });
    this.name = "AppError";
    this.code = code;
    this.httpStatus = HTTP_STATUS_BY_CODE[code];
    if (options.fieldErrors !== undefined) this.fieldErrors = options.fieldErrors;
    if (options.details !== undefined) this.details = options.details;
    if (options.retryAfterSeconds !== undefined) this.retryAfterSeconds = options.retryAfterSeconds;
  }

  static unauthenticated(message?: string): AppError {
    return new AppError("UNAUTHENTICATED", message);
  }

  static forbidden(message?: string, details?: Record<string, unknown>): AppError {
    return new AppError("FORBIDDEN", message, details ? { details } : {});
  }

  static notFound(message?: string, details?: Record<string, unknown>): AppError {
    return new AppError("NOT_FOUND", message, details ? { details } : {});
  }

  static validation(fieldErrors: FieldErrors, message?: string): AppError {
    return new AppError("VALIDATION", message, { fieldErrors });
  }

  static conflict(message?: string, details?: Record<string, unknown>): AppError {
    return new AppError("CONFLICT", message, details ? { details } : {});
  }

  static rateLimited(retryAfterSeconds?: number, message?: string): AppError {
    return new AppError("RATE_LIMITED", message, retryAfterSeconds === undefined ? {} : { retryAfterSeconds });
  }

  /** Builds a `VALIDATION` error whose field errors come from a Zod error. */
  static fromZod(error: z.core.$ZodError, message?: string): AppError {
    return new AppError("VALIDATION", message, { fieldErrors: fromZodError(error), cause: error });
  }
}

/**
 * True for {@link AppError} instances. Also recognises the brand symbol so the check survives the same module being
 * bundled twice (e.g. RSC and SSR layers), where `instanceof` alone would fail.
 */
export function isAppError(error: unknown): error is AppError {
  return (
    error instanceof AppError ||
    (typeof error === "object" && error !== null && (error as Record<symbol, unknown>)[APP_ERROR_BRAND] === true)
  );
}

/** Result of every Server Action (CLAUDE.md rule 4). */
export type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: { code: string; message: string; fieldErrors?: Record<string, string[]> } };

export type ActionSuccess<T> = Extract<ActionResult<T>, { ok: true }>;
export type ActionFailure = Extract<ActionResult<never>, { ok: false }>;

/** Successful action result. `ok()` with no argument is the result of a `void` action. */
export function ok(): ActionSuccess<undefined>;
export function ok<T>(data: T): ActionSuccess<T>;
export function ok<T>(data?: T): ActionSuccess<T | undefined> {
  return { ok: true, data };
}

/** Failed action result. `fieldErrors` is omitted from the payload when not given. */
export function fail(code: ErrorCode, message: string = DEFAULT_ERROR_MESSAGES[code], fieldErrors?: FieldErrors): ActionFailure {
  return {
    ok: false,
    error: fieldErrors === undefined ? { code, message } : { code, message, fieldErrors },
  };
}

/**
 * Converts a Zod error into {@link FieldErrors}. Paths are dot-joined (`answers.0.value`) so nested form fields map
 * one-to-one; issues without a path go under {@link FORM_ERROR_KEY}. Duplicate messages per field are dropped.
 */
export function fromZodError(error: z.core.$ZodError): FieldErrors {
  const fieldErrors: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path.length === 0 ? FORM_ERROR_KEY : issue.path.map((part) => String(part)).join(".");
    const messages = (fieldErrors[key] ??= []);
    if (!messages.includes(issue.message)) messages.push(issue.message);
  }
  return fieldErrors;
}

/** Short random id that ties a generic client message to the full server log entry. */
export function newErrorId(): string {
  return randomBytes(6).toString("hex");
}

/** Client-safe description of any thrown value. */
export interface NormalizedError {
  code: ErrorCode;
  message: string;
  httpStatus: number;
  fieldErrors?: FieldErrors;
  retryAfterSeconds?: number;
  /** Set only for unexpected errors (the ones that were logged). */
  errorId?: string;
}

export interface ErrorHandlingOptions {
  logger?: Logger;
  /** Name of the action / route, added to the log entry. */
  operation?: string;
}

/**
 * Maps any thrown value to a client-safe {@link NormalizedError}. Unexpected errors (anything that is not an AppError
 * or a ZodError) and `INTERNAL` AppErrors are logged at `error` level with a fresh `errorId`, and their message is
 * replaced by a generic one that includes the reference.
 *
 * Next.js control-flow errors (`redirect()`, `notFound()`, dynamic-usage bailouts) are rethrown, never converted.
 */
export function normalizeError(error: unknown, options: ErrorHandlingOptions = {}): NormalizedError {
  unstable_rethrow(error);
  const log = options.logger ?? rootLogger;

  if (isAppError(error) && error.code !== "INTERNAL") {
    if (error.code === "AI_UNAVAILABLE") {
      log.warn("AI unavailable", { operation: options.operation, err: error });
    }
    const normalized: NormalizedError = { code: error.code, message: error.message, httpStatus: error.httpStatus };
    if (error.fieldErrors !== undefined) normalized.fieldErrors = error.fieldErrors;
    if (error.retryAfterSeconds !== undefined) normalized.retryAfterSeconds = error.retryAfterSeconds;
    return normalized;
  }

  if (error instanceof z.core.$ZodError) {
    return {
      code: "VALIDATION",
      message: DEFAULT_ERROR_MESSAGES.VALIDATION,
      httpStatus: HTTP_STATUS_BY_CODE.VALIDATION,
      fieldErrors: fromZodError(error),
    };
  }

  const errorId = newErrorId();
  log.error("Unexpected error", { operation: options.operation, errorId, err: error });
  return {
    code: "INTERNAL",
    message: `${DEFAULT_ERROR_MESSAGES.INTERNAL} (Reference: ${errorId})`,
    httpStatus: HTTP_STATUS_BY_CODE.INTERNAL,
    errorId,
  };
}

/**
 * Wraps a Server Action body so it always resolves to an {@link ActionResult}.
 *
 * - Return value `T` becomes `{ ok: true, data: T }`.
 * - `AppError` becomes `{ ok: false, error: { code, message, fieldErrors? } }`.
 * - `ZodError` (e.g. from `schema.parse(input)`) becomes a `VALIDATION` failure with field errors.
 * - Anything else is logged with a correlation id and returned as `INTERNAL` with a generic message.
 * - `redirect()` / `notFound()` still work: Next.js control-flow errors are rethrown.
 *
 * @example
 * export const updateProfile = safeAction(async (input: unknown) => {
 *   const actor = await requireUser();
 *   return profileService.update(actor, profileSchema.parse(input));
 * }, { operation: "profile.update" });
 */
export function safeAction<Args extends unknown[], T>(
  fn: (...args: Args) => Promise<T>,
  options: ErrorHandlingOptions = {},
): (...args: Args) => Promise<ActionResult<T>> {
  return async (...args: Args): Promise<ActionResult<T>> => {
    try {
      return ok(await fn(...args));
    } catch (error) {
      const normalized = normalizeError(error, options);
      return fail(normalized.code, normalized.message, normalized.fieldErrors);
    }
  };
}

export interface HttpErrorOptions extends ErrorHandlingOptions {
  /** Echoed as `x-request-id` so clients can quote it. */
  requestId?: string;
}

/** JSON body of every error response from route handlers. */
export interface HttpErrorBody {
  error: { code: string; message: string; fieldErrors?: Record<string, string[]> };
}

/**
 * Converts any thrown value into a JSON error `Response` for route handlers (`/api/v1`, webhooks):
 * `{ error: { code, message, fieldErrors? } }` with the mapped status, `Cache-Control: no-store`, `Retry-After` for
 * rate limits and quotas, and `x-request-id` when known. Next.js control-flow errors are rethrown.
 */
export function toHttpResponse(error: unknown, options: HttpErrorOptions = {}): Response {
  const normalized = normalizeError(error, options);
  const body: HttpErrorBody = {
    error:
      normalized.fieldErrors === undefined
        ? { code: normalized.code, message: normalized.message }
        : { code: normalized.code, message: normalized.message, fieldErrors: normalized.fieldErrors },
  };
  const headers = new Headers({ "cache-control": "no-store" });
  if (normalized.retryAfterSeconds !== undefined) {
    headers.set("retry-after", String(Math.max(0, Math.ceil(normalized.retryAfterSeconds))));
  }
  if (options.requestId !== undefined) headers.set("x-request-id", options.requestId);
  return Response.json(body, { status: normalized.httpStatus, headers });
}
