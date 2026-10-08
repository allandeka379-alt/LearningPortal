import "server-only";
import { z } from "zod";
import { APP_NAME } from "@/lib/config";
import { addDays, localDateString, startOfLocalDay } from "@/lib/dates";
import { db } from "@/server/db";
import { absoluteUrl } from "@/server/lib/env";
import { AppError } from "@/server/lib/errors";
import { describeJobError, enqueue, registerJobHandler } from "@/server/lib/jobs";
import { logger } from "@/server/lib/logger";
import { getKnownSetting } from "@/server/lib/settings";
import { createNotification } from "@/server/notifications/service";
import type { SmsBudgetSetting } from "./sms-budget-setting";
import type { OutboundMessage } from "./types";

/**
 * Platform SMS budget against toll fraud (SECURITY.md AUTH-05 residual; setting `messaging.smsBudget`,
 * ./sms-budget-setting.ts). Per-target and per-IP code limits (src/server/auth/otp.ts) stop one attacker hammering one
 * number; they do not stop SMS pumping across thousands of numbers and addresses, which is billed per message. Two
 * platform-wide rules, applied by `sendMessage` (./send.ts) to every SMS sent through a real (paid) adapter, before the
 * provider is called:
 *
 * 1. **Country prefixes**: the recipient must start with one of `allowedCountryPrefixes` (default `+263`). Anything else
 *    is refused (BAD_REQUEST, reason `SMS_COUNTRY_NOT_ALLOWED`; the notification job fails at once instead of retrying).
 * 2. **Daily cap**: at most `dailyMax` SMS per platform day (Africa/Harare). Each send reserves one slot atomically in a
 *    per-day counter row (`RateLimitBucket` key `smsBudget:<date>`, purged with the other buckets); over the cap the
 *    send is refused (RATE_LIMITED until the next platform day, reason `SMS_DAILY_BUDGET`). The FIRST refusal of a day
 *    (one winner across every web node and worker, `smsBudgetAlert:<date>`) queues `messaging.smsBudgetAlert`: every
 *    ACTIVE SUPER_ADMIN gets one in-app notification and one email for that day.
 *
 * A slot counts a send ATTEMPT (a provider failure after the reservation still uses it): the cap bounds spend, not
 * deliveries. Multi-part messages count once (bodies are capped at 6 segments, ./sms.ts). The console driver (dev and
 * tests) is exempt: nothing is paid. SMS only runs while `features.sms` is on (owner decision 2026-10-07: off by
 * default; sign-in codes go by email), so with SMS switched off this budget is never reached.
 */

export const SMS_BUDGET_SETTING = "messaging.smsBudget";
export const SMS_BUDGET_ALERT_JOB = "messaging.smsBudgetAlert";
export const SMS_BUDGET_ALERT_TYPE = "ops.sms_budget_reached";
/** The platform day boundary (Zimbabwe). */
export const SMS_BUDGET_TIMEZONE = "Africa/Harare";

export type SmsBudgetRefusal = "SMS_COUNTRY_NOT_ALLOWED" | "SMS_DAILY_BUDGET";

/** Pure: may an SMS go to this E.164 number under these prefixes? */
export function smsPrefixAllowed(e164: string, allowedCountryPrefixes: readonly string[]): boolean {
  return allowedCountryPrefixes.some((prefix) => e164.startsWith(prefix));
}

/** Pure: the platform day of an instant and the seconds until the next one starts. */
export function smsBudgetDay(now: Date): { day: string; secondsLeft: number } {
  const day = localDateString(now, SMS_BUDGET_TIMEZONE);
  const next = startOfLocalDay(addDays(day, 1), SMS_BUDGET_TIMEZONE);
  return { day, secondsLeft: Math.max(1, Math.ceil((next.getTime() - now.getTime()) / 1000)) };
}

function budgetKey(day: string): string {
  return `smsBudget:${day}`;
}

/**
 * Reserves one slot of the day's budget: true when the send may go ahead. Atomic across processes (one upsert that
 * only increments below the cap).
 */
async function reserveSlot(day: string, dailyMax: number): Promise<boolean> {
  const rows = await db.$queryRaw<{ count: number }[]>`
    INSERT INTO "RateLimitBucket" AS b ("key", "windowStart", "windowSeconds", "count", "prevCount", "expiresAt", "updatedAt")
    VALUES (${budgetKey(day)}, now(), 86400, 1, 0, now() + interval '3 days', now())
    ON CONFLICT ("key") DO UPDATE SET "count" = b."count" + 1, "updatedAt" = now()
      WHERE b."count" < ${dailyMax}
    RETURNING "count"`;
  return rows.length > 0;
}

/** SMS reserved so far on `day` (admin display, tests). */
export async function smsSentOn(day: string): Promise<number> {
  const row = await db.rateLimitBucket.findUnique({ where: { key: budgetKey(day) }, select: { count: true } });
  return row?.count ?? 0;
}

/**
 * Claims the day's alert: true for exactly one caller per day across every process (insert-if-absent), which then
 * queues the alert job.
 */
async function claimDailyAlert(day: string): Promise<boolean> {
  const rows = await db.$queryRaw<{ key: string }[]>`
    INSERT INTO "RateLimitBucket" ("key", "windowStart", "windowSeconds", "count", "prevCount", "expiresAt", "updatedAt")
    VALUES (${`smsBudgetAlert:${day}`}, now(), 86400, 1, 0, now() + interval '3 days', now())
    ON CONFLICT ("key") DO NOTHING
    RETURNING "key"`;
  return rows.length > 0;
}

export const smsBudgetAlertPayloadSchema = z.object({ day: z.iso.date(), dailyMax: z.number().int().positive() });
export type SmsBudgetAlertPayload = z.output<typeof smsBudgetAlertPayloadSchema>;

async function raiseDailyAlert(day: string, dailyMax: number): Promise<void> {
  try {
    if (!(await claimDailyAlert(day))) return;
    await enqueue(SMS_BUDGET_ALERT_JOB, { day, dailyMax }, { queue: "notifications", dedupeKey: `${SMS_BUDGET_ALERT_JOB}:${day}`, maxAttempts: 5 });
    logger.warn("sms budget reached; alert queued", { day, dailyMax });
  } catch (error) {
    logger.error("sms budget: could not queue the alert", { day, err: error });
  }
}

function refusal(reason: SmsBudgetRefusal, message: string, retryAfterSeconds?: number): AppError {
  return reason === "SMS_DAILY_BUDGET"
    ? new AppError("RATE_LIMITED", message, { details: { reason }, ...(retryAfterSeconds !== undefined ? { retryAfterSeconds } : {}) })
    : new AppError("BAD_REQUEST", message, { details: { reason } });
}

/**
 * Applies the budget to one SMS about to be sent through a paid adapter (module docs). Call it right before the
 * provider, after the recipient has been validated as E.164.
 *
 * @throws AppError BAD_REQUEST (`SMS_COUNTRY_NOT_ALLOWED`) | RATE_LIMITED (`SMS_DAILY_BUDGET`, Retry-After = next day)
 */
export async function assertSmsBudget(
  message: Pick<OutboundMessage, "to" | "tag">,
  options: { now?: Date; budget?: SmsBudgetSetting } = {},
): Promise<void> {
  const budget = options.budget ?? (await getKnownSetting(SMS_BUDGET_SETTING));
  if (!smsPrefixAllowed(message.to, budget.allowedCountryPrefixes)) {
    // Never the number: the tag and the leading digits only.
    logger.warn("sms refused: country not allowed", { tag: message.tag, prefix: message.to.slice(0, 4) });
    throw refusal("SMS_COUNTRY_NOT_ALLOWED", "Text messages can't be sent to numbers in that country.");
  }
  if (budget.dailyMax === null) return;
  const { day, secondsLeft } = smsBudgetDay(options.now ?? new Date());
  if (await reserveSlot(day, budget.dailyMax)) return;
  logger.warn("sms refused: daily platform budget reached", { tag: message.tag, day, dailyMax: budget.dailyMax });
  await raiseDailyAlert(day, budget.dailyMax);
  throw refusal("SMS_DAILY_BUDGET", "Text messages are paused for the rest of today. Please try again tomorrow or use email.", secondsLeft);
}

// =====================================================================================================================
// Alert job
// =====================================================================================================================

/** Title and body of the alert (plain text, no personal data). Pure. */
export function composeSmsBudgetAlert(payload: SmsBudgetAlertPayload, appName: string = APP_NAME): { title: string; body: string } {
  return {
    title: "Daily SMS budget reached",
    body:
      `${appName} stopped sending text messages for the rest of ${payload.day} (Africa/Harare time): the platform sent its daily maximum of ` +
      `${payload.dailyMax} SMS. Text messages are not delivered until midnight; sign-in and account email are not affected. ` +
      "If this is normal growth, raise the daily maximum in Settings. If not, it may be SMS pumping (toll fraud): check the code-request volume and the SMS provider's dashboard before raising it.",
  };
}

export interface SmsBudgetAlertResult {
  recipients: number;
  emailed: number;
  withoutEmail: number;
  emailFailed: number;
}

/**
 * Handler of {@link SMS_BUDGET_ALERT_JOB}: one in-app notification and one email per ACTIVE SUPER_ADMIN for the day.
 * Idempotent: notifications carry a per-day dedupe key, and an email already recorded on it is not sent again. Throws
 * after trying everyone when an email failed, so the job retries the missing ones. While email is switched off
 * (`features.email`) the alert is in-app only (every admin counts as `withoutEmail`).
 */
export async function sendSmsBudgetAlert(raw: unknown, options: { onlyUserIds?: readonly string[] } = {}): Promise<SmsBudgetAlertResult> {
  const payload = smsBudgetAlertPayloadSchema.parse(raw);
  const { title, body } = composeSmsBudgetAlert(payload);
  const admins = await db.user.findMany({
    // `onlyUserIds` narrows the audience (tests share one database with many SUPER_ADMIN fixtures).
    where: { roles: { has: "SUPER_ADMIN" }, status: "ACTIVE", ...(options.onlyUserIds ? { id: { in: [...options.onlyUserIds] } } : {}) },
    select: { id: true, emailNormalized: true, emailVerifiedAt: true },
    orderBy: { id: "asc" },
    take: 100,
  });
  const result: SmsBudgetAlertResult = { recipients: admins.length, emailed: 0, withoutEmail: 0, emailFailed: 0 };
  if (admins.length === 0) {
    logger.error("sms budget alert: no active SUPER_ADMIN to notify", { day: payload.day });
    return result;
  }
  // Imported lazily: ./send.ts imports this module.
  const { isChannelSwitchedOn, sendMessage } = await import("./send");
  const emailOn = await isChannelSwitchedOn("email");
  let firstError: unknown = null;
  for (const admin of admins) {
    const email = emailOn && admin.emailNormalized && admin.emailVerifiedAt ? admin.emailNormalized : null;
    const notification = await createNotification(admin.id, {
      type: SMS_BUDGET_ALERT_TYPE,
      category: "SYSTEM",
      title,
      body,
      data: { href: "/admin/settings", day: payload.day },
      channels: email ? ["IN_APP", "EMAIL"] : ["IN_APP"],
      dedupeKey: `sms-budget:${payload.day}`,
    });
    if (!email) {
      result.withoutEmail += 1;
      continue;
    }
    if (emailSent(notification.deliveries)) continue;
    try {
      const sent = await sendMessage({
        channel: "email",
        to: email,
        subject: `${APP_NAME}: ${title} (${payload.day})`,
        text: `${body}\n\nSettings: ${absoluteUrl("/admin/settings")}\n\n—\nOperational alert for platform super admins. Sent at most once per day.`,
        tag: `notification.${SMS_BUDGET_ALERT_TYPE}`,
        idempotencyKey: `notification:${notification.id}:EMAIL`,
      });
      await recordEmailDelivery(notification.id, { status: "SENT", at: new Date().toISOString(), providerRef: sent.providerRef });
      result.emailed += 1;
    } catch (error) {
      result.emailFailed += 1;
      firstError ??= error;
      await recordEmailDelivery(notification.id, { status: "FAILED", at: new Date().toISOString(), error: describeJobError(error).slice(0, 300) }).catch(
        (recordError: unknown) => logger.error("sms budget alert: could not record the failure", { notificationId: notification.id, err: recordError }),
      );
    }
  }
  if (firstError !== null) throw firstError;
  return result;
}

function emailSent(deliveries: unknown): boolean {
  if (typeof deliveries !== "object" || deliveries === null || Array.isArray(deliveries)) return false;
  const email = (deliveries as Record<string, unknown>).EMAIL;
  return typeof email === "object" && email !== null && (email as { status?: unknown }).status === "SENT";
}

/** Same `Notification.deliveries` shape as the notifications.send job (per channel: status, time, provider ref). */
async function recordEmailDelivery(notificationId: string, entry: { status: "SENT" | "FAILED"; at: string; providerRef?: string; error?: string }): Promise<void> {
  await db.$executeRaw`
    UPDATE "Notification"
       SET "deliveries" = COALESCE("deliveries", '{}'::jsonb) || jsonb_build_object('EMAIL'::text, ${JSON.stringify(entry)}::jsonb)
     WHERE "id" = ${notificationId}::uuid`;
}

/** Registers `messaging.smsBudgetAlert` (notifications queue, 5 attempts). Queued by {@link assertSmsBudget}, never scheduled. */
export function registerSmsBudgetJobs(): void {
  registerJobHandler(SMS_BUDGET_ALERT_JOB, smsBudgetAlertPayloadSchema, (payload) => sendSmsBudgetAlert(payload), { queue: "notifications", maxAttempts: 5 });
}
