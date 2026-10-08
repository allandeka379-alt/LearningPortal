import { describe, expect, it } from "vitest";
import { AppError } from "./errors";
import { REDACTED, createLogger, isSensitiveKey, redact, scrubString, type LogLevel } from "./logger";

const FIXED_TIME = new Date("2026-10-05T12:34:56.789Z");

function capture(options: Parameters<typeof createLogger>[0] = {}) {
  const lines: { level: LogLevel; line: string }[] = [];
  const logger = createLogger({
    level: "debug",
    format: "json",
    now: () => FIXED_TIME,
    write: (line, level) => lines.push({ level, line }),
    ...options,
  });
  const entries = () => lines.map(({ line }) => JSON.parse(line) as Record<string, unknown>);
  return { logger, lines, entries };
}

describe("isSensitiveKey", () => {
  it.each([
    "password",
    "passwordHash",
    "token",
    "code",
    "otp",
    "secret",
    "authorization",
    "Authorization",
    "cookie",
    "email",
    "phone",
    "phoneE164",
    "emailNormalized",
    "apiKey",
    "api_key",
    "x-api-key",
    "set-cookie",
    "newPassword",
    "accessToken",
    "refresh_token",
    "clientSecret",
    "STRIPE_WEBHOOK_SECRET",
    "parentEmail",
    "guardianPhone",
    "phoneNumber",
    "verificationCode",
    "otpCode",
  ])("redacts %s", (key) => {
    expect(isSensitiveKey(key)).toBe(true);
  });

  it.each(["errorCode", "statusCode", "subjectCode", "inputTokens", "outputTokens", "userId", "requestId", "route", "emailVerified", "durationMs", ""])(
    "keeps %s",
    (key) => {
      expect(isSensitiveKey(key)).toBe(false);
    },
  );
});

describe("scrubString", () => {
  it("masks email addresses and international phone numbers", () => {
    expect(scrubString("sent to tendai.moyo@example.co.zw ok")).toBe("sent to [EMAIL] ok");
    expect(scrubString("sms +263771234567 queued")).toBe("sms [PHONE] queued");
    expect(scrubString("call +263 77 123 4567")).toBe("call [PHONE]");
  });

  it("leaves ordinary text, versions and dates alone", () => {
    const text = "next@16.3.8 at 2026-10-05T10:00:00+02:00 offset UTC+2 2026-10-05, score 82%";
    expect(scrubString(text)).toBe(text);
  });
});

describe("redact", () => {
  it("redacts sensitive keys recursively without mutating the input", () => {
    const input = {
      userId: "u1",
      password: "hunter2",
      profile: { email: "a@b.co", locale: "en-ZW", contacts: [{ phoneE164: "+263771234567", kind: "mobile" }] },
      headers: { authorization: "Bearer abc", cookie: "dz_session=xyz", "user-agent": "Mozilla" },
    };
    const snapshot = structuredClone(input);
    expect(redact(input)).toEqual({
      userId: "u1",
      password: REDACTED,
      profile: { email: REDACTED, locale: "en-ZW", contacts: [{ phoneE164: REDACTED, kind: "mobile" }] },
      headers: { authorization: REDACTED, cookie: REDACTED, "user-agent": "Mozilla" },
    });
    expect(input).toEqual(snapshot);
  });

  it("redacts whole subtrees under sensitive keys", () => {
    expect(redact({ token: { value: "abc", expiresAt: 1 } })).toEqual({ token: REDACTED });
  });

  it("masks contact details inside free-text values", () => {
    expect(redact({ note: "parent is jane@example.com" })).toEqual({ note: "parent is [EMAIL]" });
  });

  it("handles cycles, depth, special objects and functions", () => {
    const cyclic: Record<string, unknown> = { id: 1 };
    cyclic.self = cyclic;
    expect(redact(cyclic)).toEqual({ id: 1, self: "[Circular]" });

    let deep: Record<string, unknown> = { leaf: true };
    for (let i = 0; i < 12; i += 1) deep = { next: deep };
    expect(JSON.stringify(redact(deep))).toContain("[Truncated]");

    const shared = { a: 1 };
    expect(redact({ x: shared, y: shared })).toEqual({ x: { a: 1 }, y: { a: 1 } });

    expect(
      redact({
        at: new Date("2026-01-01T00:00:00Z"),
        big: 10n,
        fn: () => 1,
        bytes: new Uint8Array(4),
        url: new URL("https://example.com/reset?token=abc"),
        map: new Map([["secret", "s"], ["ok", "v"]]),
        set: new Set([1, 2]),
      }),
    ).toEqual({
      at: "2026-01-01T00:00:00.000Z",
      big: "10",
      bytes: "[Binary 4 bytes]",
      url: "https://example.com/reset",
      map: { secret: REDACTED, ok: "v" },
      set: [1, 2],
    });
  });

  it("caps long arrays", () => {
    const result = redact(Array.from({ length: 60 }, (_, i) => i)) as unknown[];
    expect(result).toHaveLength(51);
    expect(result.at(-1)).toBe("[10 more]");
  });

  it("serialises errors, keeping error codes but redacting sensitive extras", () => {
    const cause = new Error("connect ECONNREFUSED");
    const error = new AppError("FORBIDDEN", "No access for teacher@example.com", {
      details: { classId: "c1", token: "abc" },
      cause,
    });
    const result = redact({ err: error }) as { err: Record<string, unknown> };
    expect(result.err).toMatchObject({
      name: "AppError",
      code: "FORBIDDEN",
      httpStatus: 403,
      message: "No access for [EMAIL]",
      details: { classId: "c1", token: REDACTED },
      cause: { name: "Error", message: "connect ECONNREFUSED" },
    });
    expect(result.err.stack).toBeTypeOf("string");

    const prismaLike = Object.assign(new Error("Unique constraint failed"), { code: "P2002", meta: { target: ["email"] } });
    expect(redact(prismaLike)).toMatchObject({ code: "P2002", meta: { target: ["email"] } });
  });

  // LOG-01 regression: a CHECK violation (SQLSTATE 23514) reaches the logs as a Prisma error whose
  // `meta.driverAdapterError.cause` is @prisma/adapter-pg's payload, and that payload carries Postgres' DETAIL, the
  // whole failing row (names, birth year, password hash, login username). It used to be logged verbatim.
  it("drops Postgres DETAIL (the failing row) from Prisma driver-adapter errors and raw pg errors", () => {
    const checkMessage = 'new row for relation "Profile" violates check constraint "Profile_leaderboard_username_chk"';
    const failingRow = "Failing row contains (019a0000-uuid, Tendai, Moyo, Tendai M, 2011, $argon2id$v=19$m=19456$abc, t.moyo7).";
    // Shaped like @prisma/driver-adapter-utils' DriverAdapterError: the adapter payload lives in `cause`.
    const adapterError = Object.assign(new Error(checkMessage), { name: "DriverAdapterError" });
    adapterError.cause = { kind: "postgres", code: "23514", severity: "ERROR", message: checkMessage, detail: failingRow, originalCode: "23514", originalMessage: checkMessage };
    const prismaError = Object.assign(new Error("Database error. Code: `23514`."), {
      name: "PrismaClientKnownRequestError",
      code: "P2039",
      clientVersion: "7.0.0",
      meta: { driverAdapterError: adapterError },
    });
    const pgError = Object.assign(new Error('duplicate key value violates unique constraint "User_loginUsername_key"'), {
      code: "23505",
      detail: "Key (loginUsername)=(t.moyo7) already exists.",
      constraint: "User_loginUsername_key",
      table: "User",
    });

    const logged = redact({ err: prismaError, pg: pgError }) as { err: Record<string, unknown>; pg: Record<string, unknown> };
    const out = JSON.stringify(logged);
    expect(out).not.toContain("Failing row");
    expect(out).not.toContain("Tendai");
    expect(out).not.toContain("argon2id");
    expect(out).not.toContain("t.moyo7");
    // What operators need to diagnose the failure survives.
    expect(logged.err).toMatchObject({
      code: "P2039",
      meta: { driverAdapterError: { cause: { originalCode: "23514", detail: REDACTED, originalMessage: checkMessage } } },
    });
    expect(logged.pg).toMatchObject({ code: "23505", detail: REDACTED, constraint: "User_loginUsername_key", table: "User" });
  });

  it("redacts people's names and identifying facts by key", () => {
    expect(redact({ firstName: "Tendai", lastName: "Moyo", displayName: "Tendai M", birthYear: 2011, studentNumber: "A123", userId: "u1" })).toEqual({
      firstName: REDACTED,
      lastName: REDACTED,
      displayName: REDACTED,
      birthYear: REDACTED,
      studentNumber: REDACTED,
      userId: "u1",
    });
  });
});

describe("createLogger", () => {
  it("writes one JSON line per entry with time, level and message first", () => {
    const { logger, lines, entries } = capture();
    logger.info("user signed in", { userId: "u1", durationMs: 12 });
    expect(lines).toHaveLength(1);
    expect(lines[0]?.line.startsWith('{"time":"2026-10-05T12:34:56.789Z","level":"info","msg":"user signed in"')).toBe(
      true,
    );
    expect(entries()[0]).toEqual({
      time: "2026-10-05T12:34:56.789Z",
      level: "info",
      msg: "user signed in",
      userId: "u1",
      durationMs: 12,
    });
  });

  it("filters by level and routes levels to the sink", () => {
    const { logger, lines } = capture({ level: "warn" });
    logger.debug("d");
    logger.info("i");
    logger.warn("w");
    logger.error("e");
    expect(lines.map((line) => line.level)).toEqual(["warn", "error"]);
    expect(logger.isLevelEnabled("info")).toBe(false);
    expect(logger.isLevelEnabled("error")).toBe(true);
  });

  it("is completely quiet when silent", () => {
    const { logger, lines } = capture({ level: "silent" });
    logger.error("boom");
    expect(lines).toHaveLength(0);
  });

  it("supports child loggers with redacted bindings", () => {
    const { logger, entries } = capture();
    const child = logger.child({ requestId: "r1", route: "/login", email: "kid@example.com" });
    child.child({ userId: "u9" }).warn("login failed", { password: "nope", attempt: 3 });
    expect(entries()[0]).toEqual({
      time: "2026-10-05T12:34:56.789Z",
      level: "warn",
      msg: "login failed",
      requestId: "r1",
      route: "/login",
      email: REDACTED,
      userId: "u9",
      password: REDACTED,
      attempt: 3,
    });
  });

  it("scrubs the message and protects reserved keys", () => {
    const { logger, entries } = capture();
    logger.info("otp sent to +263771234567", { level: "fake", msg: "spoof", time: 0 });
    expect(entries()[0]).toMatchObject({
      level: "info",
      msg: "otp sent to [PHONE]",
      field_level: "fake",
      field_msg: "spoof",
      field_time: 0,
    });
  });

  it("formats a readable single line in pretty mode, with the stack below", () => {
    const { logger, lines } = capture({ format: "pretty" });
    logger.info("job done", { job: "metrics", took: 5, note: "two words" });
    expect(lines[0]?.line).toBe('12:34:56.789 INFO  job done job=metrics took=5 note="two words"');

    logger.error("failed", { err: new Error("bad") });
    const [first, ...rest] = (lines[1]?.line ?? "").split("\n");
    expect(first).toMatch(/^12:34:56\.789 ERROR failed err=\{"name":"Error","message":"bad"\}$/);
    expect(rest.length).toBeGreaterThan(0);
    expect(rest.every((line) => line.startsWith("    "))).toBe(true);
  });

  it("never throws from a broken sink", () => {
    const logger = createLogger({
      level: "debug",
      write: () => {
        throw new Error("EPIPE");
      },
    });
    expect(() => logger.error("x")).not.toThrow();
  });
});
