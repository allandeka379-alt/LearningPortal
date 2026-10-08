/**
 * Structured logger (§39, ARCHITECTURE §5.12, §11 observability).
 *
 * - JSON lines in production and test, a compact single-line format in development.
 * - Child loggers carry bindings such as `requestId`, `route`, `userId`.
 * - Sensitive keys are REDACTED recursively before anything is written, and email addresses / E.164 phone numbers
 *   are masked inside every string. Student data is sensitive and most students are minors: logs carry ids, never
 *   names, contact details, secrets or answer text.
 *
 * Deliberately free of `server-only` and `getEnv()`: the worker and scripts import it under plain Node, and logging
 * must keep working while reporting an invalid environment. The level comes straight from `process.env.LOG_LEVEL`.
 */

export type LogLevel = "debug" | "info" | "warn" | "error";
export type LogLevelSetting = LogLevel | "silent";
export type LogFormat = "json" | "pretty";
export type LogFields = Record<string, unknown>;

export interface Logger {
  debug(msg: string, fields?: LogFields): void;
  info(msg: string, fields?: LogFields): void;
  warn(msg: string, fields?: LogFields): void;
  error(msg: string, fields?: LogFields): void;
  /** Returns a logger that adds `bindings` to every entry (later fields win over bindings). */
  child(bindings: LogFields): Logger;
  isLevelEnabled(level: LogLevel): boolean;
}

export interface LoggerOptions {
  level?: LogLevelSetting;
  format?: LogFormat;
  bindings?: LogFields;
  /** Output sink; defaults to stdout (debug/info) and stderr (warn/error). */
  write?: (line: string, level: LogLevel) => void;
  /** Clock, injectable for tests. */
  now?: () => Date;
}

const LEVEL_VALUES: Record<LogLevelSetting, number> = { debug: 20, info: 30, warn: 40, error: 50, silent: Infinity };

export const REDACTED = "[REDACTED]";

/**
 * Keys redacted on exact match after normalisation (lower-case, non-alphanumerics removed, so `api_key`,
 * `x-api-key` and `apiKey` compare equal). `code` is exact-only: OTP and OAuth codes are secrets, while `errorCode`,
 * `statusCode` and subject codes are useful and harmless.
 */
const SENSITIVE_EXACT = new Set([
  "password",
  "passwordhash",
  "token",
  "code",
  "otp",
  "secret",
  "authorization",
  "cookie",
  "email",
  "phone",
  "phonee164",
  "phonenumber",
  "emailnormalized",
  "apikey",
  "otpcode",
  "verificationcode",
  "authcode",
  "authorizationcode",
  "resetcode",
  // Postgres error DETAIL ("Failing row contains (…)", "Key (email)=(…) already exists"): the whole offending row,
  // names, birth year, password hash included. Kept off logs wherever it appears (pg errors, Prisma driver-adapter
  // payloads under `meta.driverAdapterError.cause`); code, constraint, table and message stay.
  "detail",
  // People's names and identifying facts (minors): logs carry ids, never these.
  "firstname",
  "lastname",
  "fullname",
  "displayname",
  "birthyear",
  "dateofbirth",
  "studentnumber",
]);

/**
 * Suffixes that mark a key as sensitive (`newPassword`, `accessToken`, `clientSecret`, `x-api-key`, `set-cookie`,
 * `parentEmail`). `token` is suffix-matched in the singular only so AI metering fields like `inputTokens` survive.
 */
const SENSITIVE_SUFFIXES = [
  "password",
  "passwordhash",
  "token",
  "secret",
  "apikey",
  "cookie",
  "authorization",
  "email",
  "phone",
  "phonee164",
  "otp",
];

const EMAIL_PATTERN = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;
/** `+` followed by 8–15 digits, optionally space-separated (E.164 and "+263 77 123 4567"). Hyphens excluded so
 * dates such as "+2 2026-10-05" are not mistaken for numbers. */
const PHONE_PATTERN = /\+\d(?: ?\d){7,14}/g;

const MAX_DEPTH = 8;
const MAX_ARRAY_ITEMS = 50;

/** True when a field with this key must never be written to logs. */
export function isSensitiveKey(key: string): boolean {
  const normalized = key.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (normalized.length === 0) return false;
  if (SENSITIVE_EXACT.has(normalized)) return true;
  return SENSITIVE_SUFFIXES.some((suffix) => normalized.endsWith(suffix));
}

/** Masks email addresses and international phone numbers embedded in free text. */
export function scrubString(value: string): string {
  return value.replace(EMAIL_PATTERN, "[EMAIL]").replace(PHONE_PATTERN, "[PHONE]");
}

/**
 * Returns a JSON-safe deep copy of `value` with sensitive keys replaced by `[REDACTED]`, contact details masked in
 * strings, `Error`s serialised (name, message, stack, code, cause, AppError details), and cycles / excessive depth
 * cut off. Never mutates the input.
 */
export function redact(value: unknown): unknown {
  return redactValue(value, 0, new WeakSet<object>());
}

function redactValue(value: unknown, depth: number, seen: WeakSet<object>): unknown {
  if (value === null || value === undefined) return value;
  switch (typeof value) {
    case "string":
      return scrubString(value);
    case "number":
    case "boolean":
      return value;
    case "bigint":
      return value.toString();
    case "symbol":
      return value.toString();
    case "function":
      return undefined;
    default:
      break;
  }

  const object = value as object;
  if (seen.has(object)) return "[Circular]";
  if (depth >= MAX_DEPTH) return "[Truncated]";
  if (object instanceof Date) return Number.isNaN(object.getTime()) ? "Invalid Date" : object.toISOString();
  if (object instanceof URL) return scrubString(object.origin + object.pathname);
  if (ArrayBuffer.isView(object) || object instanceof ArrayBuffer) return `[Binary ${object.byteLength} bytes]`;

  seen.add(object);
  try {
    if (object instanceof Error) return serializeError(object, depth, seen);
    if (Array.isArray(object)) {
      const items = object.slice(0, MAX_ARRAY_ITEMS).map((item) => redactValue(item, depth + 1, seen));
      if (object.length > MAX_ARRAY_ITEMS) items.push(`[${object.length - MAX_ARRAY_ITEMS} more]`);
      return items;
    }
    if (object instanceof Map) {
      return redactRecord(Object.fromEntries(object), depth, seen);
    }
    if (object instanceof Set) {
      return redactValue([...object], depth, seen);
    }
    return redactRecord(object as Record<string, unknown>, depth, seen);
  } finally {
    seen.delete(object);
  }
}

function redactRecord(record: Record<string, unknown>, depth: number, seen: WeakSet<object>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, item] of Object.entries(record)) {
    if (isSensitiveKey(key)) {
      out[key] = REDACTED;
      continue;
    }
    const redacted = redactValue(item, depth + 1, seen);
    if (redacted !== undefined) out[key] = redacted;
  }
  return out;
}

/**
 * Serialises an error for logs. `code` on an Error (`ENOENT`, Prisma `P2002`, AppError `NOT_FOUND`) is an error
 * identifier, not a secret, so it is kept; everything else extra (details, meta, cause) is redacted like any value,
 * which drops a Postgres `detail` (the failing row) at any depth, including inside a Prisma driver-adapter error.
 */
function serializeError(error: Error, depth: number, seen: WeakSet<object>): Record<string, unknown> {
  const out: Record<string, unknown> = {
    name: error.name,
    message: scrubString(error.message),
  };
  const extra = error as Error & Record<string, unknown>;
  if (typeof extra.code === "string" || typeof extra.code === "number") out.code = extra.code;
  if (typeof extra.httpStatus === "number") out.httpStatus = extra.httpStatus;
  if (error.stack) out.stack = scrubString(error.stack);

  for (const [key, item] of Object.entries(extra)) {
    if (key === "code" || key === "httpStatus" || key === "message" || key === "stack" || key === "name") continue;
    out[key] = isSensitiveKey(key) ? REDACTED : redactValue(item, depth + 1, seen);
  }
  if (error.cause !== undefined) out.cause = redactValue(error.cause, depth + 1, seen);
  return out;
}

function resolveLevel(value: string | undefined, nodeEnv: string | undefined): LogLevelSetting {
  const normalized = value?.trim().toLowerCase();
  if (normalized && Object.hasOwn(LEVEL_VALUES, normalized)) return normalized as LogLevelSetting;
  if (nodeEnv === "production") return "info";
  // Quiet by default under Vitest; set LOG_LEVEL=debug to see logs while debugging a test.
  if (nodeEnv === "test") return "silent";
  return "debug";
}

function defaultWrite(line: string, level: LogLevel): void {
  if (level === "warn" || level === "error") process.stderr.write(`${line}\n`);
  else process.stdout.write(`${line}\n`);
}

const RESERVED_KEYS = new Set(["time", "level", "msg"]);

function formatPrettyValue(value: unknown): string {
  if (typeof value === "string") return /\s/.test(value) ? JSON.stringify(value) : value;
  return JSON.stringify(value) ?? String(value);
}

function formatPretty(entry: Record<string, unknown>): string {
  const time = String(entry.time).slice(11, 23);
  const level = String(entry.level).toUpperCase().padEnd(5);
  let stack: string | undefined;
  const parts: string[] = [];
  for (const [key, value] of Object.entries(entry)) {
    if (RESERVED_KEYS.has(key)) continue;
    if (value && typeof value === "object" && "stack" in value && typeof value.stack === "string") {
      const { stack: errorStack, ...rest } = value as Record<string, unknown> & { stack: string };
      stack = errorStack;
      parts.push(`${key}=${formatPrettyValue(rest)}`);
      continue;
    }
    parts.push(`${key}=${formatPrettyValue(value)}`);
  }
  const line = `${time} ${level} ${String(entry.msg)}${parts.length > 0 ? ` ${parts.join(" ")}` : ""}`;
  return stack ? `${line}\n${stack.replace(/^/gm, "    ")}` : line;
}

/**
 * Creates a logger. Most code should use the shared {@link logger} or a `logger.child({ requestId, route })`;
 * `createLogger` exists for tests and for processes that need a different sink.
 */
export function createLogger(options: LoggerOptions = {}): Logger {
  const level = options.level ?? resolveLevel(process.env.LOG_LEVEL, process.env.NODE_ENV);
  const format = options.format ?? (process.env.NODE_ENV === "development" ? "pretty" : "json");
  const write = options.write ?? defaultWrite;
  const now = options.now ?? (() => new Date());
  const bindings = options.bindings ?? {};
  const threshold = LEVEL_VALUES[level];

  const isLevelEnabled = (candidate: LogLevel): boolean => LEVEL_VALUES[candidate] >= threshold;

  const log = (entryLevel: LogLevel, msg: string, fields?: LogFields): void => {
    if (!isLevelEnabled(entryLevel)) return;
    try {
      const merged = redact({ ...bindings, ...fields }) as Record<string, unknown>;
      const entry: Record<string, unknown> = { time: now().toISOString(), level: entryLevel, msg: scrubString(msg) };
      for (const [key, value] of Object.entries(merged)) {
        entry[RESERVED_KEYS.has(key) ? `field_${key}` : key] = value;
      }
      write(format === "pretty" ? formatPretty(entry) : JSON.stringify(entry), entryLevel);
    } catch {
      // Logging must never take the request down with it.
    }
  };

  return {
    debug: (msg, fields) => log("debug", msg, fields),
    info: (msg, fields) => log("info", msg, fields),
    warn: (msg, fields) => log("warn", msg, fields),
    error: (msg, fields) => log("error", msg, fields),
    child: (childBindings) => createLogger({ level, format, write, now, bindings: { ...bindings, ...childBindings } }),
    isLevelEnabled,
  };
}

/** Process-wide logger configured from `LOG_LEVEL` / `NODE_ENV`. */
export const logger: Logger = createLogger();
