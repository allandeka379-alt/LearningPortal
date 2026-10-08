import { notFound, redirect } from "next/navigation";
import { describe, expect, it } from "vitest";
import { z } from "zod";
import {
  AppError,
  DEFAULT_ERROR_MESSAGES,
  ERROR_CODES,
  FORM_ERROR_KEY,
  HTTP_STATUS_BY_CODE,
  fail,
  fromZodError,
  isAppError,
  normalizeError,
  ok,
  safeAction,
  toHttpResponse,
  type ActionResult,
} from "./errors";
import { createLogger, type LogLevel } from "./logger";

function captureLogger() {
  const lines: { level: LogLevel; entry: Record<string, unknown> }[] = [];
  const logger = createLogger({
    level: "debug",
    format: "json",
    write: (line, level) => lines.push({ level, entry: JSON.parse(line) as Record<string, unknown> }),
  });
  return { logger, lines };
}

function zodErrorFor(schema: z.ZodType, input: unknown): z.ZodError {
  const result = schema.safeParse(input);
  if (result.success) throw new Error("expected a validation failure");
  return result.error;
}

describe("AppError", () => {
  it("maps every code to an HTTP status and a default message", () => {
    for (const code of ERROR_CODES) {
      const error = new AppError(code);
      expect(error.code).toBe(code);
      expect(error.httpStatus).toBe(HTTP_STATUS_BY_CODE[code]);
      expect(error.message).toBe(DEFAULT_ERROR_MESSAGES[code]);
      expect(error).toBeInstanceOf(Error);
      expect(error.name).toBe("AppError");
    }
  });

  it("uses the documented status codes", () => {
    expect(HTTP_STATUS_BY_CODE).toMatchObject({
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
    });
  });

  it("keeps optional fields only when provided", () => {
    const plain = new AppError("CONFLICT", "Already exists.");
    expect(plain.fieldErrors).toBeUndefined();
    expect(plain.details).toBeUndefined();
    expect(Object.keys(plain)).not.toContain("fieldErrors");

    const cause = new Error("db");
    const rich = new AppError("RATE_LIMITED", "Slow down.", {
      retryAfterSeconds: 30,
      details: { bucket: "login" },
      cause,
    });
    expect(rich.retryAfterSeconds).toBe(30);
    expect(rich.details).toEqual({ bucket: "login" });
    expect(rich.cause).toBe(cause);
  });

  it("has factory helpers", () => {
    expect(AppError.notFound().code).toBe("NOT_FOUND");
    expect(AppError.forbidden("No.").message).toBe("No.");
    expect(AppError.unauthenticated().httpStatus).toBe(401);
    expect(AppError.conflict().code).toBe("CONFLICT");
    expect(AppError.rateLimited(10).retryAfterSeconds).toBe(10);
    expect(AppError.validation({ name: ["Required"] }).fieldErrors).toEqual({ name: ["Required"] });
    const fromZod = AppError.fromZod(zodErrorFor(z.object({ age: z.number() }), { age: "x" }));
    expect(fromZod.code).toBe("VALIDATION");
    expect(Object.keys(fromZod.fieldErrors ?? {})).toEqual(["age"]);
  });

  it("is recognised by isAppError, including copies from another module instance", () => {
    expect(isAppError(new AppError("FORBIDDEN"))).toBe(true);
    expect(isAppError(new Error("x"))).toBe(false);
    expect(isAppError(null)).toBe(false);
    expect(isAppError("FORBIDDEN")).toBe(false);
    const foreign = Object.assign(new Error("x"), { [Symbol.for("dzidza.AppError")]: true });
    expect(isAppError(foreign)).toBe(true);
  });
});

describe("ok / fail", () => {
  it("builds success results", () => {
    expect(ok({ id: 1 })).toEqual({ ok: true, data: { id: 1 } });
    expect(ok()).toEqual({ ok: true, data: undefined });
  });

  it("builds failure results and omits fieldErrors when absent", () => {
    const withoutFields = fail("FORBIDDEN", "No.");
    expect(withoutFields).toEqual({ ok: false, error: { code: "FORBIDDEN", message: "No." } });
    expect("fieldErrors" in withoutFields.error).toBe(false);
    expect(fail("VALIDATION", "Fix it.", { email: ["Invalid"] })).toEqual({
      ok: false,
      error: { code: "VALIDATION", message: "Fix it.", fieldErrors: { email: ["Invalid"] } },
    });
    expect(fail("NOT_FOUND").error.message).toBe(DEFAULT_ERROR_MESSAGES.NOT_FOUND);
  });

  it("is assignable to ActionResult", () => {
    const results: ActionResult<number>[] = [ok(1), fail("CONFLICT")];
    expect(results).toHaveLength(2);
  });
});

describe("fromZodError", () => {
  const schema = z
    .object({
      name: z.string().min(2, "Too short"),
      answers: z.array(z.object({ value: z.string().min(1, "Required") })),
      password: z.string(),
      confirm: z.string(),
    })
    .refine((data) => data.password === data.confirm, { message: "Passwords do not match" });

  it("joins nested paths with dots", () => {
    const error = zodErrorFor(schema, { name: "a", answers: [{ value: "" }], password: "x", confirm: "x" });
    expect(fromZodError(error)).toEqual({ name: ["Too short"], "answers.0.value": ["Required"] });
  });

  it("puts root-level issues under _form", () => {
    const error = zodErrorFor(schema, { name: "abc", answers: [], password: "x", confirm: "y" });
    expect(fromZodError(error)).toEqual({ [FORM_ERROR_KEY]: ["Passwords do not match"] });
  });

  it("deduplicates messages per field", () => {
    const error = zodErrorFor(
      z.string().superRefine((_value, ctx) => {
        ctx.addIssue({ code: "custom", message: "Bad" });
        ctx.addIssue({ code: "custom", message: "Bad" });
      }),
      "x",
    );
    expect(fromZodError(error)).toEqual({ [FORM_ERROR_KEY]: ["Bad"] });
  });
});

describe("normalizeError", () => {
  it("passes AppErrors through without logging", () => {
    const { logger, lines } = captureLogger();
    const normalized = normalizeError(new AppError("QUOTA_EXCEEDED", "Daily limit reached.", { retryAfterSeconds: 60 }), {
      logger,
    });
    expect(normalized).toEqual({
      code: "QUOTA_EXCEEDED",
      message: "Daily limit reached.",
      httpStatus: 429,
      retryAfterSeconds: 60,
    });
    expect(lines).toHaveLength(0);
  });

  it("logs AI_UNAVAILABLE at warn level but keeps its message", () => {
    const { logger, lines } = captureLogger();
    const normalized = normalizeError(new AppError("AI_UNAVAILABLE", "AI is not configured."), { logger });
    expect(normalized.message).toBe("AI is not configured.");
    expect(lines.map((line) => line.level)).toEqual(["warn"]);
  });

  it("treats INTERNAL AppErrors as unexpected", () => {
    const { logger, lines } = captureLogger();
    const normalized = normalizeError(new AppError("INTERNAL", "Ledger mismatch for payment 42"), { logger });
    expect(normalized.code).toBe("INTERNAL");
    expect(normalized.message).not.toContain("Ledger");
    expect(lines).toHaveLength(1);
  });
});

describe("safeAction", () => {
  it("wraps return values in ok()", async () => {
    const action = safeAction(async (a: number, b: number) => a + b);
    await expect(action(2, 3)).resolves.toEqual({ ok: true, data: 5 });
  });

  it("maps AppError to a failure result", async () => {
    const action = safeAction(async () => {
      throw AppError.validation({ title: ["Required"] }, "Check the form.");
    });
    await expect(action()).resolves.toEqual({
      ok: false,
      error: { code: "VALIDATION", message: "Check the form.", fieldErrors: { title: ["Required"] } },
    });
  });

  it("maps ZodError to VALIDATION with field errors", async () => {
    const schema = z.object({ email: z.email("Enter a valid email") });
    const action = safeAction(async (input: unknown) => schema.parse(input));
    await expect(action({ email: "nope" })).resolves.toEqual({
      ok: false,
      error: {
        code: "VALIDATION",
        message: DEFAULT_ERROR_MESSAGES.VALIDATION,
        fieldErrors: { email: ["Enter a valid email"] },
      },
    });
  });

  it("hides unexpected errors behind a generic message and logs them with a correlation id", async () => {
    const { logger, lines } = captureLogger();
    const action = safeAction(
      async () => {
        throw new Error("relation \"User\" does not exist at /srv/app/db.ts:12");
      },
      { logger, operation: "profile.update" },
    );
    const result = await action();
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error.code).toBe("INTERNAL");
    expect(result.error.message).not.toMatch(/relation|db\.ts|at /);
    const reference = /Reference: ([0-9a-f]{12})/.exec(result.error.message)?.[1];
    expect(reference).toBeDefined();

    expect(lines).toHaveLength(1);
    const [logged] = lines;
    expect(logged?.level).toBe("error");
    expect(logged?.entry).toMatchObject({ operation: "profile.update", errorId: reference });
    expect((logged?.entry.err as Record<string, unknown>).message).toContain("relation");
    expect((logged?.entry.err as Record<string, unknown>).stack).toBeTypeOf("string");
  });

  it("rethrows Next.js redirect() and notFound() so navigation still works", async () => {
    const redirecting = safeAction(async () => {
      redirect("/login");
    });
    await expect(redirecting()).rejects.toMatchObject({ digest: expect.stringContaining("NEXT_REDIRECT") });

    const missing = safeAction(async () => {
      notFound();
    });
    await expect(missing()).rejects.toThrow();
  });
});

describe("toHttpResponse", () => {
  it("renders AppErrors as JSON problems with the mapped status", async () => {
    const response = toHttpResponse(AppError.notFound("Subject not found."), { requestId: "req-12345678" });
    expect(response.status).toBe(404);
    expect(response.headers.get("content-type")).toContain("application/json");
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(response.headers.get("x-request-id")).toBe("req-12345678");
    await expect(response.json()).resolves.toEqual({ error: { code: "NOT_FOUND", message: "Subject not found." } });
  });

  it("includes field errors and Retry-After when relevant", async () => {
    const validation = toHttpResponse(AppError.validation({ q: ["Too long"] }));
    expect(validation.status).toBe(422);
    await expect(validation.json()).resolves.toEqual({
      error: { code: "VALIDATION", message: DEFAULT_ERROR_MESSAGES.VALIDATION, fieldErrors: { q: ["Too long"] } },
    });

    const limited = toHttpResponse(AppError.rateLimited(12.2));
    expect(limited.status).toBe(429);
    expect(limited.headers.get("retry-after")).toBe("13");
  });

  it("maps ZodError to 422", async () => {
    const response = toHttpResponse(zodErrorFor(z.object({ limit: z.number().max(100) }), { limit: 500 }));
    expect(response.status).toBe(422);
    const body = (await response.json()) as { error: { fieldErrors: Record<string, string[]> } };
    expect(Object.keys(body.error.fieldErrors)).toEqual(["limit"]);
  });

  it("never leaks unexpected error details", async () => {
    const { logger, lines } = captureLogger();
    const response = toHttpResponse(new TypeError("Cannot read properties of undefined (reading 'secretKey')"), {
      logger,
    });
    expect(response.status).toBe(500);
    const text = await response.text();
    expect(text).not.toContain("secretKey");
    expect(text).not.toContain("TypeError");
    expect(JSON.parse(text)).toMatchObject({ error: { code: "INTERNAL" } });
    expect(lines).toHaveLength(1);
  });

  it("rethrows Next.js control-flow errors", () => {
    let thrown: unknown;
    try {
      redirect("/login");
    } catch (error) {
      thrown = error;
    }
    expect(() => toHttpResponse(thrown)).toThrow();
  });
});
