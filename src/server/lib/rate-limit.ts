import "server-only";
import { db, type DbClient } from "@/server/db";
import { hmacSha256 } from "./crypto";
import { AppError } from "./errors";
import { logger } from "./logger";
import { getRateLimitOverrides } from "./settings";

/**
 * Shared rate limiting (§38, §39; ARCHITECTURE §5.5) on Postgres `RateLimitBucket` rows, so limits hold across every
 * web instance and the worker. CDN/WAF limits sit in front of this in production.
 *
 * Algorithm: fixed windows aligned to the epoch (`date_bin`) with a sliding-window approximation,
 * `estimate = prevCount × (1 − elapsed/window) + count`, which smooths the burst a plain fixed window allows at the
 * boundary. One atomic `INSERT … ON CONFLICT (key) DO UPDATE … RETURNING` per hit (no read-modify-write race); times
 * come from the database clock so app-server clock skew cannot matter. Every hit counts, including denied ones, so a
 * client hammering a limited endpoint stays limited.
 *
 * Keys are `<limiter>:<subject>`. Subjects that are personal data (IP addresses, emails, phone numbers) are keyed
 * HMACs ({@link rateLimitSubject}), never raw values; ids such as user ids are used as-is.
 *
 * Expired buckets are deleted by the `maintenance.purgeRateLimitBuckets` job ({@link purgeExpiredRateLimitBuckets}).
 */

export interface RateLimitRule {
  /** Hits allowed per window. */
  limit: number;
  windowSeconds: number;
}

export interface RateLimitInput extends RateLimitRule {
  /** `<limiter>:<subject>`, at most 255 characters. */
  key: string;
  /** Preset name; when set, the `rateLimits` setting may override `limit` / `windowSeconds` without a deploy. */
  preset?: RateLimitPresetName;
}

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  /** Hits left before the limit (0 when denied). */
  remaining: number;
  /** When allowed: end of the current window. When denied: the earliest time a retry can succeed. */
  resetAt: Date;
  /** 0 when allowed; otherwise whole seconds to wait (≥ 1), for the `Retry-After` header. */
  retryAfterSeconds: number;
}

const MAX_WINDOW_SECONDS = 31 * 24 * 3600;
const MAX_KEY_LENGTH = 255;

/** Default limits (ARCHITECTURE §5.5). Tunable per environment through the `rateLimits` setting. */
export const RATE_LIMIT_PRESETS = {
  /** Password login attempts per (IP, identifier). */
  login: { limit: 10, windowSeconds: 15 * 60 },
  /**
   * Credential attempts per client IP, whatever the identifier (password sign-in, one-time-code request and verify,
   * password-reset completion; web and REST API). Asserted IN ADDITION to the per-(IP, identifier) limits so one IP
   * cannot rotate identifiers (password spraying, code guessing across destinations). Sized for a school class signing
   * in together behind one NAT address; tune through the `rateLimits` setting.
   */
  loginIp: { limit: 60, windowSeconds: 15 * 60 },
  /** OTP sends to one phone/email. */
  otpSendTarget: { limit: 3, windowSeconds: 15 * 60 },
  /** OTP sends to one phone/email per day. */
  otpSendTargetDaily: { limit: 10, windowSeconds: 24 * 3600 },
  /** OTP sends from one IP. */
  otpSendIp: { limit: 20, windowSeconds: 3600 },
  /** Verification attempts against one issued code (the code's own `maxAttempts` is the primary control). */
  otpVerify: { limit: 5, windowSeconds: 3600 },
  /** REST one-time-code verification (POST /api/v1/auth/otp/verify) per (IP, destination). */
  apiOtpVerify: { limit: 10, windowSeconds: 15 * 60 },
  /** Registrations from one IP. */
  register: { limit: 10, windowSeconds: 3600 },
  /** AI tutor / solver messages per user (plan quotas apply on top, §6). */
  aiMessage: { limit: 10, windowSeconds: 60 },
  /** Public search per IP. */
  publicSearch: { limit: 60, windowSeconds: 60 },
  /** Anonymous daily-question answers per IP. */
  dailyQuestionAnon: { limit: 30, windowSeconds: 3600 },
  /** REST / JSON API calls per signed-in user, bearer token or session cookie alike (`apiRoute`). */
  publicApi: { limit: 600, windowSeconds: 60 },
  /** WhatsApp inbound messages per phone number (counted once per NEW message: redeliveries are not counted). */
  whatsappInbound: { limit: 30, windowSeconds: 60 },
  /** WhatsApp messages sent to one phone number (the channel's outbound job). */
  whatsappOutbound: { limit: 20, windowSeconds: 60 },
  /**
   * Webhook deliveries per (endpoint, client IP), checked BEFORE signature verification so unsigned floods cannot make
   * the server hash large bodies or touch the database without bound. Generous: providers deliver from a few IPs.
   */
  webhookReceipt: { limit: 300, windowSeconds: 60 },
  /** File uploads per user. */
  uploads: { limit: 30, windowSeconds: 3600 },
  /** Checkout starts per user (§32). */
  checkout: { limit: 10, windowSeconds: 600 },
  /** Unauthenticated provider-return polls per IP (/billing/return). */
  billingReturnPoll: { limit: 30, windowSeconds: 600 },
  /** Rejected (bad-signature) webhook records per provider + IP, so forgeries cannot flood PaymentEvent. */
  paymentWebhookRejected: { limit: 30, windowSeconds: 3600 },
  /** Lesson progress writes per student (heartbeats every 30 s per open lesson tab, views, completions; §8). */
  lessonProgress: { limit: 30, windowSeconds: 60 },
  /** Study-plan generations / manual adaptations per student (§16). */
  studyPlanGenerate: { limit: 30, windowSeconds: 3600 },
  /**
   * Staff-triggered messages to one recipient (password-reset instructions, verification reminders, school
   * invitations), whoever sends them. Separate from the OTP buckets so staff sends never use up a user's own codes.
   */
  adminContactSend: { limit: 3, windowSeconds: 15 * 60 },
  /** Staff-triggered messages to one recipient per day (pair with {@link RATE_LIMIT_PRESETS.adminContactSend}). */
  adminContactSendDaily: { limit: 10, windowSeconds: 24 * 3600 },
  /** "Report a problem" content flags per user (§42). */
  contentFlag: { limit: 20, windowSeconds: 3600 },
  // Family (§21 parent links). Keys keep the module's `family.<name>:<subject>` shape.
  /** Parent-link codes created per user. */
  familyCodeIssue: { limit: 10, windowSeconds: 3600 },
  /** Parent-link code redemption attempts per user (brute-force guard). */
  familyCodeRedeem: { limit: 10, windowSeconds: 15 * 60 },
  /** Parent-link code redemption attempts per user per day. */
  familyCodeRedeemDaily: { limit: 30, windowSeconds: 24 * 3600 },
  /** Parent-link code redemption attempts per client IP. */
  familyCodeRedeemIp: { limit: 30, windowSeconds: 3600 },
  /** Parent link requests sent per parent (enumeration / spam guard). */
  familyLinkRequest: { limit: 5, windowSeconds: 3600 },
  /** Parent link requests sent per parent per day. */
  familyLinkRequestDaily: { limit: 20, windowSeconds: 24 * 3600 },
  /** "Check payment status" polls per parent. */
  familyPaymentPoll: { limit: 20, windowSeconds: 600 },
  // Classes (§22).
  /** Join-code attempts per student. */
  classJoin: { limit: 10, windowSeconds: 15 * 60 },
  /** Class invitations sent to one recipient (email / phone), whoever sends them. */
  classInviteTarget: { limit: 3, windowSeconds: 24 * 3600 },
  /** Class invitations sent by one teacher. */
  classInviteSender: { limit: 100, windowSeconds: 3600 },
  // School administration (§23). Keys keep the module's `school.<name>:<id>` shape.
  /** Invitations sent by one school admin. */
  schoolInvite: { limit: 200, windowSeconds: 3600 },
  /** Roster dry runs by one school admin. */
  schoolRosterValidate: { limit: 30, windowSeconds: 3600 },
  /** Roster commit chunks by one school admin (a 1,000-row file is 20 chunks). */
  schoolRosterCommit: { limit: 60, windowSeconds: 600 },
  /** Single student password resets by one school admin. */
  schoolPasswordReset: { limit: 100, windowSeconds: 3600 },
  /** Bulk password resets (up to 50 students each) by one school admin. */
  schoolPasswordResetBulk: { limit: 20, windowSeconds: 3600 },
  /** Report requests per school. */
  schoolReportRequest: { limit: 10, windowSeconds: 3600 },
  /** Plan change requests per school. */
  schoolPlanRequest: { limit: 3, windowSeconds: 24 * 3600 },
  // Engagement.
  /** Personal flashcards created or edited per user (§15). */
  flashcardWrite: { limit: 120, windowSeconds: 3600 },
  /** Share links created per user (§46). */
  shareCreate: { limit: 20, windowSeconds: 3600 },
  /** Referral landings (/r/[code]) per IP that may set the referral cookie (§46). */
  referralLanding: { limit: 60, windowSeconds: 3600 },
  /** New AI tutor conversations per user (no model call; turns are limited by `aiMessage`). */
  aiConversationCreate: { limit: 30, windowSeconds: 3600 },
  /**
   * FAST-tier routing of free-text WhatsApp messages per user per day (the classifier reserves no plan allowance, so
   * this caps its spend; over it the message gets the HELP menu).
   */
  whatsappIntentDaily: { limit: 60, windowSeconds: 24 * 3600 },
  /**
   * Current-password checks per signed-in user (change password, step-up re-authentication), whatever the client IP:
   * a hijacked session cannot multiply its guesses by rotating addresses.
   */
  currentPassword: { limit: 10, windowSeconds: 15 * 60 },
  /**
   * Attempt starts (and resumes) per student, every channel (web, REST, WhatsApp), checked before any lock or
   * transaction (AI-04 / PAY-3, src/server/attempts/throttle.ts). A diagnostic over many subjects is one start each.
   */
  attemptStart: { limit: 30, windowSeconds: 10 * 60 },
  /**
   * Answer saves and submissions per student, every channel (exam autosave is debounced to about one every 2 s, so a
   * normal paper stays far below this). Checked before any lock or transaction (AI-04 / PAY-3).
   */
  answerSubmit: { limit: 120, windowSeconds: 60 },
} as const satisfies Record<string, RateLimitRule>;

export type RateLimitPresetName = keyof typeof RATE_LIMIT_PRESETS;

/**
 * Keyed, non-reversible subject for personal data in rate-limit keys (32 hex chars of an HMAC with `SESSION_SECRET`).
 * Emails are lower-cased and trimmed first so `A@x.com` and `a@x.com ` share a bucket. `null`/blank becomes `"none"`.
 */
export function rateLimitSubject(value: string | null | undefined): string {
  const normalized = value?.trim().toLowerCase();
  if (!normalized) return "none";
  return hmacSha256(`rl:${normalized}`).slice(0, 32);
}

function preset(name: RateLimitPresetName, ...subjects: string[]): RateLimitInput {
  return { ...RATE_LIMIT_PRESETS[name], key: [name, ...subjects].join(":"), preset: name };
}

/** A preset under a module's established key (`family.<name>:<subject>`), so existing buckets keep counting. */
function presetWithKey(name: RateLimitPresetName, key: string): RateLimitInput {
  return { ...RATE_LIMIT_PRESETS[name], key, preset: name };
}

/**
 * Ready-made limiter inputs for the hot spots of ARCHITECTURE §5.5. Pass the result to {@link assertRateLimit}.
 *
 * @example await assertRateLimit(rateLimits.login(ip, identifier));
 */
export const rateLimits = {
  /** Password login per client IP AND identifier (email / phone / username). */
  login: (ip: string | null, identifier: string) =>
    preset("login", rateLimitSubject(ip), rateLimitSubject(identifier)),
  /** Every credential attempt from one client IP (assert after the per-identifier limit; see the preset). */
  loginIp: (ip: string | null) => preset("loginIp", rateLimitSubject(ip)),
  /** OTP sends to one target (phone or email): call both this and {@link rateLimits.otpSendTargetDaily}. */
  otpSendTarget: (target: string) => preset("otpSendTarget", rateLimitSubject(target)),
  otpSendTargetDaily: (target: string) => preset("otpSendTargetDaily", rateLimitSubject(target)),
  /** OTP sends from one client IP. */
  otpSendIp: (ip: string | null) => preset("otpSendIp", rateLimitSubject(ip)),
  /** Verification attempts against one issued code (VerificationCode id). */
  otpVerify: (verificationCodeId: string) => preset("otpVerify", verificationCodeId),
  /** REST code verification per client IP AND destination (normalised email / E.164 phone). */
  apiOtpVerify: (ip: string | null, destination: string) =>
    preset("apiOtpVerify", rateLimitSubject(ip), rateLimitSubject(destination)),
  register: (ip: string | null) => preset("register", rateLimitSubject(ip)),
  aiMessage: (userId: string) => preset("aiMessage", userId),
  publicSearch: (ip: string | null) => preset("publicSearch", rateLimitSubject(ip)),
  dailyQuestionAnon: (ip: string | null) => preset("dailyQuestionAnon", rateLimitSubject(ip)),
  /** REST / JSON API per signed-in user (all of the user's tokens and cookie sessions share one bucket). */
  publicApi: (userId: string) => preset("publicApi", userId),
  whatsappInbound: (phoneE164: string) => preset("whatsappInbound", rateLimitSubject(phoneE164)),
  whatsappOutbound: (phoneE164: string) => preset("whatsappOutbound", rateLimitSubject(phoneE164)),
  /** Webhook deliveries per endpoint (`whatsapp`, `payments.paynow`, ...) and client IP. */
  webhookReceipt: (endpoint: string, ip: string | null) => preset("webhookReceipt", endpoint, rateLimitSubject(ip)),
  uploads: (userId: string) => preset("uploads", userId),
  checkout: (userId: string) => preset("checkout", userId),
  billingReturnPoll: (ip: string | null) => preset("billingReturnPoll", rateLimitSubject(ip)),
  paymentWebhookRejected: (provider: string, ip: string | null) =>
    preset("paymentWebhookRejected", provider, rateLimitSubject(ip)),
  lessonProgress: (userId: string) => preset("lessonProgress", userId),
  studyPlanGenerate: (userId: string) => preset("studyPlanGenerate", userId),
  /**
   * Staff-triggered message to one recipient (phone or email): assert both this and
   * {@link rateLimits.adminContactSendDaily}, or use {@link adminContactSendLimits}.
   */
  adminContactSend: (recipient: string) => preset("adminContactSend", rateLimitSubject(recipient)),
  adminContactSendDaily: (recipient: string) => preset("adminContactSendDaily", rateLimitSubject(recipient)),
  contentFlag: (userId: string) => preset("contentFlag", userId),
  /** Family limiters: `subject` is a user id, or an IP already passed through {@link rateLimitSubject}. */
  familyCodeIssue: (userId: string) => presetWithKey("familyCodeIssue", `family.codeIssue:${userId}`),
  familyCodeRedeem: (userId: string) => presetWithKey("familyCodeRedeem", `family.codeRedeem:${userId}`),
  familyCodeRedeemDaily: (userId: string) => presetWithKey("familyCodeRedeemDaily", `family.codeRedeemDaily:${userId}`),
  familyCodeRedeemIp: (ipSubject: string) => presetWithKey("familyCodeRedeemIp", `family.codeRedeemIp:${ipSubject}`),
  familyLinkRequest: (userId: string) => presetWithKey("familyLinkRequest", `family.linkRequest:${userId}`),
  familyLinkRequestDaily: (userId: string) => presetWithKey("familyLinkRequestDaily", `family.linkRequestDaily:${userId}`),
  familyPaymentPoll: (userId: string) => presetWithKey("familyPaymentPoll", `family.paymentPoll:${userId}`),
  classJoin: (userId: string) => preset("classJoin", userId),
  /** Per recipient (email or phone; hashed here). */
  classInviteTarget: (target: string) => preset("classInviteTarget", rateLimitSubject(target)),
  classInviteSender: (teacherUserId: string) => preset("classInviteSender", teacherUserId),
  schoolInvite: (adminUserId: string) => presetWithKey("schoolInvite", `school.invite:${adminUserId}`),
  schoolRosterValidate: (adminUserId: string) => presetWithKey("schoolRosterValidate", `school.rosterValidate:${adminUserId}`),
  schoolRosterCommit: (adminUserId: string) => presetWithKey("schoolRosterCommit", `school.rosterCommit:${adminUserId}`),
  schoolPasswordReset: (adminUserId: string) => presetWithKey("schoolPasswordReset", `school.passwordReset:${adminUserId}`),
  schoolPasswordResetBulk: (adminUserId: string) => presetWithKey("schoolPasswordResetBulk", `school.passwordResetBulk:${adminUserId}`),
  schoolReportRequest: (schoolId: string) => presetWithKey("schoolReportRequest", `school.reportRequest:${schoolId}`),
  schoolPlanRequest: (schoolId: string) => presetWithKey("schoolPlanRequest", `school.planRequest:${schoolId}`),
  flashcardWrite: (userId: string) => preset("flashcardWrite", userId),
  shareCreate: (userId: string) => preset("shareCreate", userId),
  referralLanding: (ip: string | null) => preset("referralLanding", rateLimitSubject(ip)),
  aiConversationCreate: (userId: string) => preset("aiConversationCreate", userId),
  whatsappIntentDaily: (userId: string) => preset("whatsappIntentDaily", userId),
  /** Current-password checks per user (change password, step-up). Keyed on the user only, never the IP. */
  currentPassword: (userId: string) => preset("currentPassword", userId),
  /** Attempt starts per student (all channels share the bucket). */
  attemptStart: (userId: string) => preset("attemptStart", userId),
  /** Answer saves / submissions per student (all channels share the bucket). */
  answerSubmit: (userId: string) => preset("answerSubmit", userId),
} satisfies Record<RateLimitPresetName, (...args: never[]) => RateLimitInput>;

/** Both per-recipient limits for a staff-triggered message (15-minute burst, then daily), in assertion order. */
export function adminContactSendLimits(recipient: string): readonly RateLimitInput[] {
  return [rateLimits.adminContactSend(recipient), rateLimits.adminContactSendDaily(recipient)];
}

/** Bucket state returned by the upsert, fed to {@link evaluateRateLimit}. */
export interface RateLimitBucketState {
  count: number;
  prevCount: number;
  windowStart: Date;
  now: Date;
}

/**
 * Pure decision for one hit (already included in `count`): allowed, remaining and when a retry can succeed assuming no
 * other hits arrive. Exported for unit tests.
 */
export function evaluateRateLimit(state: RateLimitBucketState, rule: RateLimitRule): RateLimitResult {
  const windowMs = rule.windowSeconds * 1000;
  const nowMs = state.now.getTime();
  const elapsedMs = Math.min(Math.max(nowMs - state.windowStart.getTime(), 0), windowMs);
  const weight = 1 - elapsedMs / windowMs;
  const estimate = state.prevCount * weight + state.count;
  const windowEnd = new Date(state.windowStart.getTime() + windowMs);

  if (estimate <= rule.limit) {
    return {
      allowed: true,
      limit: rule.limit,
      remaining: Math.max(0, Math.floor(rule.limit - estimate)),
      resetAt: windowEnd,
      retryAfterSeconds: 0,
    };
  }
  return deniedResult(state, rule);
}

/**
 * Denied result for `state`: the earliest time a NEW hit on top of `state` would be admitted, within the current
 * window if the previous window's weight can decay enough, otherwise in the next window once this window's count has
 * decayed enough.
 */
function deniedResult(state: RateLimitBucketState, rule: RateLimitRule): RateLimitResult {
  const windowMs = rule.windowSeconds * 1000;
  const nowMs = state.now.getTime();
  const elapsedMs = Math.min(Math.max(nowMs - state.windowStart.getTime(), 0), windowMs);
  let waitMs: number;
  const headroom = rule.limit - state.count - 1;
  if (headroom >= 0 && state.prevCount > 0) {
    waitMs = Math.max(0, windowMs * (1 - headroom / state.prevCount) - elapsedMs);
  } else {
    const intoNext = state.count > 0 ? Math.max(0, windowMs * (1 - (rule.limit - 1) / state.count)) : 0;
    waitMs = windowMs - elapsedMs + intoNext;
  }
  const retryAfterSeconds = Math.max(1, Math.ceil(waitMs / 1000));
  return {
    allowed: false,
    limit: rule.limit,
    remaining: 0,
    resetAt: new Date(nowMs + retryAfterSeconds * 1000),
    retryAfterSeconds,
  };
}

/**
 * Decision for a hit that is NOT recorded when denied ({@link reserveRateLimits}, {@link peekRateLimit}). `state`
 * includes the would-be hit. When denied, the retry time is computed without it, since it never counted.
 */
export function evaluateUncountedHit(state: RateLimitBucketState, rule: RateLimitRule): RateLimitResult {
  const result = evaluateRateLimit(state, rule);
  if (result.allowed) return result;
  return deniedResult({ ...state, count: Math.max(0, state.count - 1) }, rule);
}

function validateRule(rule: RateLimitRule): void {
  if (!Number.isInteger(rule.limit) || rule.limit < 1) throw new RangeError("rateLimit: limit must be a positive integer");
  if (!Number.isInteger(rule.windowSeconds) || rule.windowSeconds < 1 || rule.windowSeconds > MAX_WINDOW_SECONDS) {
    throw new RangeError(`rateLimit: windowSeconds must be an integer between 1 and ${MAX_WINDOW_SECONDS}`);
  }
}

async function resolveRule(input: RateLimitInput): Promise<RateLimitRule> {
  if (input.preset === undefined) return { limit: input.limit, windowSeconds: input.windowSeconds };
  try {
    const override = (await getRateLimitOverrides())[input.preset];
    if (override) return override;
  } catch (error) {
    logger.warn("rate-limit overrides unavailable; using defaults", { preset: input.preset, err: error });
  }
  return { limit: input.limit, windowSeconds: input.windowSeconds };
}

/**
 * Counts one hit against `key` and reports whether it is within the limit. Atomic and shared across instances.
 *
 * @param options.client - run on a transaction client (rarely needed; the hit then rolls back with the transaction).
 */
export async function rateLimit(input: RateLimitInput, options: { client?: DbClient } = {}): Promise<RateLimitResult> {
  const rule = await checkedRule(input);
  return evaluateRateLimit(await hitBucket(input.key, rule, options.client ?? db), rule);
}

async function checkedRule(input: RateLimitInput): Promise<RateLimitRule> {
  if (input.key.length === 0 || input.key.length > MAX_KEY_LENGTH) {
    throw new RangeError(`rateLimit: key must be 1-${MAX_KEY_LENGTH} characters`);
  }
  const rule = await resolveRule(input);
  validateRule(rule);
  return rule;
}

/** Records one hit on `key` (atomic upsert) and returns the bucket state including it. */
async function hitBucket(key: string, rule: RateLimitRule, client: DbClient): Promise<RateLimitBucketState> {
  const window = rule.windowSeconds;

  // Times are returned as epoch milliseconds: raw timestamptz reads are not offset-safe under a non-UTC session zone.
  const rows = await client.$queryRaw<{ count: number; prevCount: number; windowStartMs: number; nowMs: number }[]>`
    WITH win AS (
      SELECT date_bin(make_interval(secs => ${window}::double precision), now(), TIMESTAMPTZ '2000-01-01 00:00:00+00') AS start,
             now() AS now
    )
    INSERT INTO "RateLimitBucket" AS b ("key", "windowStart", "windowSeconds", "count", "prevCount", "expiresAt", "updatedAt")
    SELECT ${key}, win.start, ${window}::int, 1, 0, win.start + make_interval(secs => ${2 * window}::double precision), win.now
      FROM win
    ON CONFLICT ("key") DO UPDATE SET
      "prevCount" = CASE
        WHEN b."windowSeconds" <> EXCLUDED."windowSeconds" THEN 0
        WHEN b."windowStart" = EXCLUDED."windowStart" THEN b."prevCount"
        WHEN b."windowStart" = EXCLUDED."windowStart" - make_interval(secs => EXCLUDED."windowSeconds"::double precision)
          THEN b."count"
        ELSE 0 END,
      "count" = CASE
        WHEN b."windowSeconds" = EXCLUDED."windowSeconds" AND b."windowStart" = EXCLUDED."windowStart" THEN b."count" + 1
        ELSE 1 END,
      "windowStart" = EXCLUDED."windowStart",
      "windowSeconds" = EXCLUDED."windowSeconds",
      "expiresAt" = EXCLUDED."expiresAt",
      "updatedAt" = EXCLUDED."updatedAt"
    RETURNING "count", "prevCount",
              (extract(epoch FROM "windowStart") * 1000)::float8 AS "windowStartMs",
              (extract(epoch FROM "updatedAt") * 1000)::float8 AS "nowMs"`;

  const row = rows[0];
  if (!row) throw new Error("rateLimit: upsert returned no row");
  return { count: row.count, prevCount: row.prevCount, windowStart: new Date(row.windowStartMs), now: new Date(row.nowMs) };
}

/**
 * Counts a hit and throws `AppError("RATE_LIMITED")` (HTTP 429 with `Retry-After`) when over the limit.
 *
 * @example await assertRateLimit(rateLimits.otpSendTarget(phone), "Too many codes requested. Try again later.");
 */
export async function assertRateLimit(input: RateLimitInput, message?: string): Promise<RateLimitResult> {
  const result = await rateLimit(input);
  if (!result.allowed) {
    logger.warn("rate limit exceeded", { limiter: limiterName(input), retryAfter: result.retryAfterSeconds });
    throw AppError.rateLimited(result.retryAfterSeconds, message);
  }
  return result;
}

function limiterName(input: RateLimitInput): string {
  return input.preset ?? input.key.split(":")[0] ?? "unknown";
}

/**
 * Whether one more hit on `input` would be allowed, WITHOUT recording anything (same window arithmetic as
 * {@link rateLimit}). For budgets that only count failures: peek before the expensive check, hit after a failure.
 */
export async function peekRateLimit(input: RateLimitInput): Promise<RateLimitResult> {
  const rule = await checkedRule(input);
  const window = rule.windowSeconds;
  // Mirrors the upsert in hitBucket: the state this key would have after one more hit.
  const rows = await db.$queryRaw<{ count: number; prevCount: number; windowStartMs: number; nowMs: number }[]>`
    WITH win AS (
      SELECT date_bin(make_interval(secs => ${window}::double precision), now(), TIMESTAMPTZ '2000-01-01 00:00:00+00') AS start,
             now() AS now
    )
    SELECT
      COALESCE(CASE WHEN b."windowSeconds" = ${window}::int AND b."windowStart" = win.start THEN b."count" END, 0) + 1 AS "count",
      COALESCE(CASE
        WHEN b."windowSeconds" <> ${window}::int THEN 0
        WHEN b."windowStart" = win.start THEN b."prevCount"
        WHEN b."windowStart" = win.start - make_interval(secs => ${window}::double precision) THEN b."count"
        ELSE 0 END, 0) AS "prevCount",
      (extract(epoch FROM win.start) * 1000)::float8 AS "windowStartMs",
      (extract(epoch FROM win.now) * 1000)::float8 AS "nowMs"
    FROM win LEFT JOIN "RateLimitBucket" b ON b."key" = ${input.key}`;
  const row = rows[0];
  if (!row) throw new Error("peekRateLimit: query returned no row");
  return evaluateUncountedHit(
    { count: row.count, prevCount: row.prevCount, windowStart: new Date(row.windowStartMs), now: new Date(row.nowMs) },
    rule,
  );
}

/** One limit of a {@link reserveRateLimits} call and the message shown when it is the one that refuses. */
export interface RateLimitReservation {
  input: RateLimitInput;
  message?: string | ((retryAfterSeconds: number) => string);
}

class ReservationDenied extends Error {
  constructor(
    readonly entry: RateLimitReservation,
    readonly result: RateLimitResult,
  ) {
    super("rate limit reservation denied");
  }
}

/**
 * All-or-nothing: counts one hit in EVERY bucket of `entries` only when all of them allow it, in one transaction. A
 * refused attempt leaves no trace in any bucket, so nobody can keep a budget that belongs to someone else (for example
 * the resend cooldown or daily code budget of a victim's phone number) exhausted with requests that are refused anyway.
 * Concurrent reservations on the same keys serialise on the bucket rows, so the limits stay exact.
 *
 * @throws AppError RATE_LIMITED for the first entry (in order) that refuses, with its message.
 */
export async function reserveRateLimits(entries: readonly RateLimitReservation[]): Promise<void> {
  const rules = await Promise.all(entries.map((entry) => checkedRule(entry.input)));
  try {
    await db.$transaction(async (tx) => {
      for (const [index, entry] of entries.entries()) {
        const rule = rules[index]!;
        const result = evaluateUncountedHit(await hitBucket(entry.input.key, rule, tx), rule);
        if (!result.allowed) throw new ReservationDenied(entry, result);
      }
    });
  } catch (error) {
    if (!(error instanceof ReservationDenied)) throw error;
    const { entry, result } = error;
    logger.warn("rate limit exceeded", { limiter: limiterName(entry.input), retryAfter: result.retryAfterSeconds });
    const message = typeof entry.message === "function" ? entry.message(result.retryAfterSeconds) : entry.message;
    throw AppError.rateLimited(result.retryAfterSeconds, message);
  }
}

/** Standard `RateLimit-*` response headers for REST routes (IETF draft names). */
export function rateLimitHeaders(result: RateLimitResult, now: Date = new Date()): Record<string, string> {
  const headers: Record<string, string> = {
    "ratelimit-limit": String(result.limit),
    "ratelimit-remaining": String(result.remaining),
    "ratelimit-reset": String(Math.max(0, Math.ceil((result.resetAt.getTime() - now.getTime()) / 1000))),
  };
  if (!result.allowed) headers["retry-after"] = String(result.retryAfterSeconds);
  return headers;
}

/**
 * Deletes buckets whose window and its successor have both passed (an expired bucket would reset on its next hit
 * anyway, so deletion loses nothing). Batched to keep each statement short. Returns the number of rows deleted.
 */
export async function purgeExpiredRateLimitBuckets(options: { batchSize?: number; maxBatches?: number } = {}): Promise<number> {
  const batchSize = options.batchSize ?? 5_000;
  const maxBatches = options.maxBatches ?? 100;
  let total = 0;
  for (let i = 0; i < maxBatches; i += 1) {
    const deleted = await db.$executeRaw`
      DELETE FROM "RateLimitBucket"
       WHERE "key" IN (SELECT "key" FROM "RateLimitBucket" WHERE "expiresAt" < now() LIMIT ${batchSize})`;
    total += deleted;
    if (deleted < batchSize) break;
  }
  return total;
}
