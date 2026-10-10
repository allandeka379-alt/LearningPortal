import "server-only";
import { z } from "zod";

/**
 * Server environment contract (§39, ARCHITECTURE §5.11). Every key in `.env.example` is declared here.
 *
 * - Parsed lazily on the first `getEnv()` call and cached; the result is frozen.
 * - Empty or whitespace-only values are treated as unset, so `ANTHROPIC_API_KEY=` in `.env` means "not configured".
 * - Errors list every missing/invalid key at once and never echo values (they may be secrets).
 * - Production adds safety rules: long `SESSION_SECRET`, `https` `APP_URL`, no sandbox payments, no console
 *   email/SMS providers (console adapters print OTP codes, which must never reach production logs), a REAL email adapter
 *   ({@link EMAIL_PROVIDERS}: accounts are email-based, so verification codes, sign-in codes, password resets, security
 *   notices and invitations go by email; owner decision 2026-10-07), an SMS adapter only when SMS is used
 *   ({@link SMS_PROVIDERS}, or {@link SMS_PROVIDER_NONE}, the production default: SMS is switched off by
 *   `features.sms` and nothing in sign-in depends on it), the keys of every adapter named (in every environment), and
 *   an explicit client-IP source (`TRUSTED_PROXY_HOPS` or `CLIENT_IP_HEADER`).
 * - Payment providers are opt-in through `PAYMENTS_ENABLED_PROVIDERS`; production needs only Paynow. The dormant
 *   Stripe adapter is never offered while `features.stripe` is off, even when its keys are present.
 *
 * `APP_URL` lives here (not in `src/lib/config.ts`) because it is server configuration; pass absolute URLs down to
 * client code explicitly (see {@link getAppUrl} / {@link absoluteUrl}).
 */

export const PAYMENT_PROVIDERS = ["sandbox", "paynow", "stripe"] as const;
export type PaymentProvider = (typeof PAYMENT_PROVIDERS)[number];

export const LOG_LEVELS = ["debug", "info", "warn", "error", "silent"] as const;
export type LogLevelSetting = (typeof LOG_LEVELS)[number];

export const STORAGE_DRIVERS = ["local", "s3"] as const;

/**
 * Real outbound messaging adapters (src/server/messaging/providers.ts). `console` is the dev/test capture driver and is
 * refused in production; any other name resolves to a fail-loud stub in dev/test and is refused in production.
 */
export const EMAIL_PROVIDERS = ["resend"] as const;
export type EmailProviderName = (typeof EMAIL_PROVIDERS)[number];
export const SMS_PROVIDERS = ["twilio", "africastalking"] as const;
export type SmsProviderName = (typeof SMS_PROVIDERS)[number];
/**
 * `SMS_PROVIDER=none`: no SMS provider on this server (SMS is switched off, `features.sms`; owner decision
 * 2026-10-07). The production default when `SMS_PROVIDER` is unset; switching SMS on later needs a real adapter here
 * first. Sign-in never depends on SMS.
 */
export const SMS_PROVIDER_NONE = "none";

/** `addr@domain` or `Display Name <addr@domain>` (optionally quoted); no line breaks (header injection). */
const FROM_ADDRESS_PATTERN =
  /^(?:(?:"[^"\r\n<>]{1,78}"|[^"\r\n<>@]{1,78})\s*<[^\s<>@"]+@[^\s<>@"]+\.[^\s<>@"]+>|[^\s<>@"]+@[^\s<>@"]+\.[^\s<>@"]+)$/;
/** RFC 2606 placeholder domains (the `.env.example` sender); rejected in production. */
const PLACEHOLDER_EMAIL_DOMAIN = /@(?:[a-z0-9-]+\.)*example\.(?:com|net|org)>?$/i;

/** The placeholder shipped in `.env.example`; rejected in production. */
const EXAMPLE_SESSION_SECRET = "replace-with-a-long-random-string";
const PRODUCTION_MIN_SECRET_LENGTH = 32;

const postgresUrl = z
  .string()
  .regex(/^postgres(?:ql)?:\/\/\S+$/, { error: "must be a postgresql:// connection URL" });

const providerName = z
  .string()
  .regex(/^[a-z0-9_-]+$/, { error: "must be a lowercase provider name (e.g. console)" });

const shape = {
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),

  APP_URL: z
    .url({ protocol: /^https?$/, error: "must be an absolute http(s) URL, e.g. http://localhost:3000" })
    .transform((value) => value.replace(/\/+$/, "")),
  NEXT_PUBLIC_APP_NAME: z.string().optional(),
  NEXT_PUBLIC_SUPPORT_EMAIL: z.email({ error: "must be an email address" }).optional(),

  DATABASE_URL: postgresUrl,
  DATABASE_URL_TEST: postgresUrl.optional(),
  /** Owner-role URLs used only by the Prisma CLI / grant scripts (migrations). The app never connects with them. */
  MIGRATION_DATABASE_URL: postgresUrl.optional(),
  MIGRATION_DATABASE_URL_TEST: postgresUrl.optional(),

  SESSION_SECRET: z.string().min(16, { error: "must be at least 16 characters" }),

  LOG_LEVEL: z.enum(LOG_LEVELS).optional(),
  /** Set by Next.js itself (e.g. "phase-production-build" while `next build` prerenders). Never set it manually. */
  NEXT_PHASE: z.string().optional(),

  ANTHROPIC_API_KEY: z.string().optional(),

  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),

  EMAIL_PROVIDER: providerName.default("console"),
  /** Sender, e.g. `BvunzoHub <no-reply@mail.example.org>`; the domain must be verified at the email provider. */
  EMAIL_FROM: z
    .string()
    .trim()
    .regex(FROM_ADDRESS_PATTERN, { error: "must be an address or Name <address> (one line)" })
    .optional(),
  /** Optional Reply-To for outbound email (e.g. the support mailbox). */
  EMAIL_REPLY_TO: z.email({ error: "must be an email address" }).optional(),
  /** Resend API key (`EMAIL_PROVIDER=resend`). */
  RESEND_API_KEY: z.string().optional(),
  SMS_PROVIDER: providerName.default("console"),
  /** Twilio (`SMS_PROVIDER=twilio`): account SID + auth token, and a sender (`TWILIO_FROM` or a Messaging Service). */
  TWILIO_ACCOUNT_SID: z.string().regex(/^AC[0-9a-fA-F]{32}$/, { error: "must be a Twilio account SID (AC + 32 hex)" }).optional(),
  TWILIO_AUTH_TOKEN: z.string().optional(),
  /** E.164 number or alphanumeric sender ID (1-11 letters/digits/spaces, at least one letter). */
  TWILIO_FROM: z
    .string()
    .regex(/^(?:\+[1-9]\d{6,14}|(?=[A-Za-z0-9 ]*[A-Za-z])[A-Za-z0-9 ]{1,11})$/, {
      error: "must be an E.164 number (+…) or an alphanumeric sender ID of at most 11 characters",
    })
    .optional(),
  TWILIO_MESSAGING_SERVICE_SID: z
    .string()
    .regex(/^MG[0-9a-fA-F]{32}$/, { error: "must be a Twilio Messaging Service SID (MG + 32 hex)" })
    .optional(),
  /** Africa's Talking (`SMS_PROVIDER=africastalking`): app username (`sandbox` = sandbox API, refused in production). */
  AFRICASTALKING_USERNAME: z.string().regex(/^[A-Za-z0-9_.-]{1,64}$/, { error: "must be an Africa's Talking username" }).optional(),
  AFRICASTALKING_API_KEY: z.string().optional(),
  /** Registered alphanumeric sender ID or short code; unset = the provider's default sender. */
  AFRICASTALKING_SENDER_ID: z
    .string()
    .regex(/^(?:\d{3,8}|(?=[A-Za-z0-9 .-]*[A-Za-z])[A-Za-z0-9 .-]{1,11})$/, {
      error: "must be a short code or an alphanumeric sender ID of at most 11 characters",
    })
    .optional(),

  PAYMENTS_ENABLED_PROVIDERS: z
    .string()
    .default("")
    .transform(splitCsv)
    .pipe(z.array(z.enum(PAYMENT_PROVIDERS, { error: `unknown provider (allowed: ${PAYMENT_PROVIDERS.join(", ")})` }))),
  PAYNOW_INTEGRATION_ID: z.string().optional(),
  PAYNOW_INTEGRATION_KEY: z.string().optional(),
  /** ISO currency of the Paynow integration (Paynow integrations are per currency). */
  PAYNOW_CURRENCY: z.string().regex(/^[A-Z]{3}$/, { error: "must be an ISO 4217 code, e.g. USD" }).default("USD"),
  /** Merchant account email: Paynow requires it as `authemail` in test mode. */
  PAYNOW_MERCHANT_EMAIL: z.email({ error: "must be an email address" }).optional(),
  PAYNOW_TEST_MODE: z.enum(["true", "false"]).default("false").transform((v) => v === "true"),
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  /** Pins the Stripe-Version header (recommended before go-live), e.g. 2025-09-30.clover. */
  STRIPE_API_VERSION: z.string().optional(),

  WHATSAPP_VERIFY_TOKEN: z.string().optional(),
  WHATSAPP_ACCESS_TOKEN: z.string().optional(),
  WHATSAPP_PHONE_NUMBER_ID: z.string().optional(),
  WHATSAPP_APP_SECRET: z.string().optional(),
  /** Graph API version of the WhatsApp Cloud API (e.g. v23.0); defaults to the driver's DEFAULT_GRAPH_VERSION. */
  WHATSAPP_GRAPH_VERSION: z.string().regex(/^v\d{1,3}\.\d{1,2}$/, "must look like v23.0").optional(),

  /**
   * Shared secret for scheduled requests to /api/cron/jobs (Vercel sends `Authorization: Bearer <CRON_SECRET>`). Unset:
   * the route refuses every request (deployments with a worker process do not need it).
   */
  CRON_SECRET: z.string().min(32, { error: "must be at least 32 characters" }).optional(),

  STORAGE_DRIVER: z.enum(STORAGE_DRIVERS).default("local"),
  /**
   * S3-compatible object storage (`STORAGE_DRIVER=s3`; src/server/lib/s3.ts). One PRIVATE bucket: every object is
   * served through /api/media. Bucket, region and both keys are required together when the driver is `s3`.
   */
  S3_BUCKET: z.string().regex(/^[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]$/, { error: "must be an S3 bucket name" }).optional(),
  /** e.g. af-south-1 (AWS Cape Town); `auto` for Cloudflare R2. */
  S3_REGION: z.string().regex(/^[a-z0-9-]{2,32}$/, { error: "must be a region id such as af-south-1 (or auto for R2)" }).optional(),
  /** Origin of a non-AWS provider, e.g. https://<account>.r2.cloudflarestorage.com. Unset for AWS S3. */
  S3_ENDPOINT: z.url({ protocol: /^https?$/, error: "must be an absolute http(s) URL" }).optional(),
  S3_ACCESS_KEY_ID: z.string().optional(),
  S3_SECRET_ACCESS_KEY: z.string().optional(),
  /** Only for temporary (STS) credentials. */
  S3_SESSION_TOKEN: z.string().optional(),
  /** `true` for path-style URLs (MinIO and some S3-compatible providers). */
  S3_FORCE_PATH_STYLE: z.enum(["true", "false"]).default("false").transform((v) => v === "true"),

  /**
   * Client IP resolution (src/server/lib/request.ts; every IP rate limit depends on it). The number of reverse proxies
   * in front of the app that APPEND to `X-Forwarded-For` (CDN + load balancer = 2): the client address is the entry
   * this many places from the right, and anything a client sends to the left of it is ignored. Default 1.
   */
  TRUSTED_PROXY_HOPS: z
    .string()
    .regex(/^\d{1,2}$/, { error: "must be a whole number from 1 to 10" })
    .transform(Number)
    .pipe(z.number().int().min(1, { error: "must be a whole number from 1 to 10" }).max(10, { error: "must be a whole number from 1 to 10" }))
    .optional(),
  /** Header the edge SETS (overwrites) to the client address, e.g. `cf-connecting-ip`; used instead of X-Forwarded-For. */
  CLIENT_IP_HEADER: z
    .string()
    .regex(/^[A-Za-z0-9-]{1,64}$/, { error: "must be a header name, e.g. cf-connecting-ip" })
    .transform((value) => value.toLowerCase())
    .optional(),
};

const envSchema = z.object(shape);

/** Validated, typed server environment. Optional provider keys are `undefined` when unset or empty. */
export type ServerEnv = Readonly<z.output<typeof envSchema>>;

/** Anything shaped like `process.env`. */
export type EnvSource = Readonly<Record<string, string | undefined>>;

export const ENV_KEYS = Object.keys(shape) as ReadonlyArray<keyof typeof shape>;

export interface EnvIssue {
  key: string;
  message: string;
}

/** Thrown when the environment is invalid. `message` lists every problem; values are never included. */
export class EnvValidationError extends Error {
  readonly issues: readonly EnvIssue[];

  constructor(issues: readonly EnvIssue[]) {
    const lines = issues.map((issue) => `  - ${issue.key}: ${issue.message}`);
    super(
      `Invalid server environment (${issues.length} problem${issues.length === 1 ? "" : "s"}):\n` +
        `${lines.join("\n")}\nSee .env.example for the full list of variables.`,
    );
    this.name = "EnvValidationError";
    this.issues = issues;
  }
}

function splitCsv(value: string): string[] {
  const items = value
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter((item) => item.length > 0);
  return [...new Set(items)];
}

/** Copies only known keys and maps blank strings to `undefined`. */
function cleanSource(source: EnvSource): Record<string, string | undefined> {
  const cleaned: Record<string, string | undefined> = {};
  for (const key of ENV_KEYS) {
    const value = source[key];
    cleaned[key] = value === undefined || value.trim() === "" ? undefined : value;
  }
  return cleaned;
}

/**
 * Cross-field and production-only rules. They run on the cleaned raw strings (not the parsed output) so they are
 * reported together with schema errors, giving one complete list instead of fix-one-rerun cycles.
 */
function policyIssues(raw: Record<string, string | undefined>): EnvIssue[] {
  const issues: EnvIssue[] = [];
  const isProduction = raw.NODE_ENV === "production";
  const providers = splitCsv(raw.PAYMENTS_ENABLED_PROVIDERS ?? "");

  const requireTogether = (keys: readonly string[], feature: string): void => {
    const present = keys.filter((key) => raw[key] !== undefined);
    if (present.length > 0 && present.length < keys.length) {
      for (const key of keys.filter((k) => raw[k] === undefined)) {
        issues.push({ key, message: `required when ${feature} is configured (set all of ${keys.join(", ")})` });
      }
    }
  };
  requireTogether(["GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET"], "Google login");
  requireTogether(
    ["WHATSAPP_VERIFY_TOKEN", "WHATSAPP_ACCESS_TOKEN", "WHATSAPP_PHONE_NUMBER_ID", "WHATSAPP_APP_SECRET"],
    "WhatsApp",
  );

  const requireForProvider = (provider: PaymentProvider, keys: readonly string[]): void => {
    if (!providers.includes(provider)) return;
    for (const key of keys) {
      if (raw[key] === undefined) {
        issues.push({ key, message: `required because PAYMENTS_ENABLED_PROVIDERS includes "${provider}"` });
      }
    }
  };
  requireForProvider("paynow", ["PAYNOW_INTEGRATION_ID", "PAYNOW_INTEGRATION_KEY"]);
  requireForProvider("stripe", ["STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET"]);

  if (raw.STORAGE_DRIVER === "s3") {
    for (const key of ["S3_BUCKET", "S3_REGION", "S3_ACCESS_KEY_ID", "S3_SECRET_ACCESS_KEY"] as const) {
      if (raw[key] === undefined) issues.push({ key, message: 'required because STORAGE_DRIVER is "s3"' });
    }
  }

  // Messaging adapters need their credentials in every environment (a half-configured provider would fail every send).
  const requireForMessaging = (setting: "EMAIL_PROVIDER" | "SMS_PROVIDER", provider: string, keys: readonly string[]): void => {
    if (raw[setting] !== provider) return;
    for (const key of keys) {
      if (raw[key] === undefined) issues.push({ key, message: `required because ${setting} is "${provider}"` });
    }
  };
  requireForMessaging("EMAIL_PROVIDER", "resend", ["RESEND_API_KEY", "EMAIL_FROM"]);
  requireForMessaging("SMS_PROVIDER", "twilio", ["TWILIO_ACCOUNT_SID", "TWILIO_AUTH_TOKEN"]);
  if (raw.SMS_PROVIDER === "twilio" && raw.TWILIO_FROM === undefined && raw.TWILIO_MESSAGING_SERVICE_SID === undefined) {
    issues.push({ key: "TWILIO_FROM", message: 'required because SMS_PROVIDER is "twilio" (or set TWILIO_MESSAGING_SERVICE_SID)' });
  }
  requireForMessaging("SMS_PROVIDER", "africastalking", ["AFRICASTALKING_USERNAME", "AFRICASTALKING_API_KEY"]);

  if (!isProduction) return issues;

  const secret = raw.SESSION_SECRET;
  if (secret !== undefined) {
    if (secret.length < PRODUCTION_MIN_SECRET_LENGTH) {
      issues.push({
        key: "SESSION_SECRET",
        message: `must be at least ${PRODUCTION_MIN_SECRET_LENGTH} characters in production`,
      });
    } else if (secret === EXAMPLE_SESSION_SECRET) {
      issues.push({ key: "SESSION_SECRET", message: "still has the .env.example placeholder value" });
    }
  }
  if (raw.APP_URL !== undefined && !raw.APP_URL.startsWith("https://")) {
    issues.push({ key: "APP_URL", message: "must use https:// in production" });
  }
  // `next build` prerenders static pages with NODE_ENV=production but never takes payments or sends messages, so the
  // runtime-only rules below are enforced when the server or worker starts (instrumentation calls getEnv at boot),
  // not while prerendering. APP_URL and SESSION_SECRET rules above still apply: static pages embed APP_URL.
  if (raw.NEXT_PHASE === "phase-production-build") return issues;
  if (providers.includes("sandbox")) {
    issues.push({ key: "PAYMENTS_ENABLED_PROVIDERS", message: 'must not include "sandbox" in production' });
  }
  if (raw.S3_ENDPOINT !== undefined && !raw.S3_ENDPOINT.startsWith("https://")) {
    issues.push({ key: "S3_ENDPOINT", message: "must use https:// in production (object keys and bodies are not encrypted otherwise)" });
  }
  // Email is the account channel (verification and sign-in codes, password resets, security notices, invitations):
  // a real adapter is required. The schema defaults it to "console", so unset is refused too.
  const emailProvider = raw.EMAIL_PROVIDER ?? "console";
  if (emailProvider === "console") {
    issues.push({
      key: "EMAIL_PROVIDER",
      message: `must name an email adapter in production (allowed: ${EMAIL_PROVIDERS.join(", ")}): sign-in codes and password resets go by email, and "console" would log them`,
    });
  } else if (!(EMAIL_PROVIDERS as readonly string[]).includes(emailProvider)) {
    // Only real adapters in production: an unknown name would boot and then fail every code / notification send.
    issues.push({ key: "EMAIL_PROVIDER", message: `must name an email adapter in production (allowed: ${EMAIL_PROVIDERS.join(", ")})` });
  }
  const realEmailAdapter = (EMAIL_PROVIDERS as readonly string[]).includes(emailProvider);
  // SMS is optional (`features.sms`, off by default): unset means "none" (parseEnv), never the console driver.
  const smsProvider = raw.SMS_PROVIDER;
  if (smsProvider === "console") {
    issues.push({ key: "SMS_PROVIDER", message: 'must not be "console" in production (it would log message contents)' });
  } else if (smsProvider !== undefined && smsProvider !== SMS_PROVIDER_NONE && !(SMS_PROVIDERS as readonly string[]).includes(smsProvider)) {
    issues.push({
      key: "SMS_PROVIDER",
      message: `must be "${SMS_PROVIDER_NONE}" (no SMS) or name an SMS adapter in production (allowed: ${SMS_PROVIDERS.join(", ")})`,
    });
  }
  if (realEmailAdapter && raw.EMAIL_FROM !== undefined && PLACEHOLDER_EMAIL_DOMAIN.test(raw.EMAIL_FROM.trim())) {
    issues.push({ key: "EMAIL_FROM", message: "still uses a placeholder domain (example.com); use your verified sending domain" });
  }
  if (smsProvider === "africastalking" && raw.AFRICASTALKING_USERNAME === "sandbox") {
    issues.push({ key: "AFRICASTALKING_USERNAME", message: 'must not be "sandbox" in production (the sandbox delivers nothing)' });
  }
  // Fail closed: guessing the proxy chain wrong lets clients forge their IP (every IP rate limit bypassed) or puts all
  // users behind one CDN address in one bucket. Production must say how the edge reports the client address.
  if (raw.TRUSTED_PROXY_HOPS === undefined && raw.CLIENT_IP_HEADER === undefined) {
    issues.push({
      key: "TRUSTED_PROXY_HOPS",
      message: "must be set in production (proxies that append to X-Forwarded-For, e.g. 2 for CDN + load balancer), or set CLIENT_IP_HEADER",
    });
  }
  return issues;
}

/**
 * Validates an environment object and returns the typed result. Pure: does not read `process.env` or cache.
 *
 * @throws {EnvValidationError} listing every missing or invalid key.
 */
export function parseEnv(source: EnvSource): ServerEnv {
  const raw = cleanSource(source);
  // Production without an SMS provider means "no SMS" (features.sms off), never the console capture driver.
  if (raw.NODE_ENV === "production" && raw.SMS_PROVIDER === undefined) raw.SMS_PROVIDER = SMS_PROVIDER_NONE;
  const result = envSchema.safeParse(raw);
  const issues: EnvIssue[] = [];

  if (!result.success) {
    for (const issue of result.error.issues) {
      const key = String(issue.path[0] ?? "(root)");
      const missing = issue.code === "invalid_type" && raw[key] === undefined;
      issues.push({ key, message: missing ? "is required but not set" : issue.message });
    }
  }
  for (const issue of policyIssues(raw)) {
    if (!issues.some((existing) => existing.key === issue.key && existing.message === issue.message)) {
      issues.push(issue);
    }
  }

  if (issues.length > 0 || !result.success) throw new EnvValidationError(issues);
  return Object.freeze(result.data);
}

let cachedEnv: ServerEnv | undefined;

/**
 * Returns the validated server environment.
 *
 * Without arguments it parses `process.env` once and caches the frozen result for the life of the process. Passing
 * `source` parses that object instead and bypasses the cache, which is how tests inject environments.
 *
 * @throws {EnvValidationError} when the environment is invalid.
 */
export function getEnv(source?: EnvSource): ServerEnv {
  if (source !== undefined) return parseEnv(source);
  cachedEnv ??= parseEnv(process.env);
  return cachedEnv;
}

/** Clears the `getEnv()` cache. Tests only. */
export function resetEnvCache(): void {
  cachedEnv = undefined;
}

/**
 * Environment checks read `NODE_ENV` directly instead of going through `getEnv()`: they must never throw (the logger
 * and error handlers use them while reporting an invalid environment), and Next.js inlines `process.env.NODE_ENV`.
 */
export function isProd(source: EnvSource = process.env): boolean {
  return source.NODE_ENV === "production";
}

export function isDev(source: EnvSource = process.env): boolean {
  const nodeEnv = source.NODE_ENV;
  return nodeEnv === undefined || nodeEnv === "" || nodeEnv === "development";
}

export function isTest(source: EnvSource = process.env): boolean {
  return source.NODE_ENV === "test";
}

/** Public base URL of the app without a trailing slash, e.g. `https://dzidza.example`. */
export function getAppUrl(): string {
  return getEnv().APP_URL;
}

/**
 * Builds an absolute URL on the app's public origin, e.g. for emails, share links and metadata.
 *
 * @param path - an app-relative path starting with `/` (query and hash allowed).
 */
export function absoluteUrl(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) {
    throw new Error(`absoluteUrl expects an app-relative path starting with a single "/", got "${path}"`);
  }
  return `${getAppUrl()}${path}`;
}
