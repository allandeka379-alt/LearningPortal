import "server-only";
import { z } from "zod";
import { Prisma } from "@/generated/prisma/client";
import { APP_NAME } from "@/lib/config";
import { db } from "@/server/db";
import { absoluteUrl } from "@/server/lib/env";
import { describeJobError, registerJobHandler } from "@/server/lib/jobs";
import { logger } from "@/server/lib/logger";
import { isChannelSwitchedOn, sendMessage } from "@/server/messaging";
import { createNotification } from "@/server/notifications/service";
import type { AiBudgetExceededEvent } from "./gateway";

/**
 * AI budget trip alert (§40, ARCHITECTURE §6.7): when the daily platform AI spend ceiling (`ai.budget`) first refuses a
 * call on a platform day (Africa/Harare), every ACTIVE SUPER_ADMIN gets ONE in-app notification and ONE email for
 * that day.
 *
 * Once per day, three layers deep:
 *   1. an in-process memo per date (the gateway refuses many calls once the ceiling is hit; only the first one per
 *      process reaches the database);
 *   2. {@link enqueueBudgetAlert} inserts the `ai.budgetAlert` job only if NO job with the day's dedupe key exists in
 *      any status (a finished alert is not re-sent; a DEAD one can be retried from /admin/jobs);
 *   3. the handler is idempotent: the notification has a per-user dedupe key for the day, and an email already
 *      recorded as SENT on it is never sent again (provider idempotency key on retries).
 *
 * The email goes straight through the messaging adapters, not `notifications.send`: it is an operational alert to
 * staff, so student-facing preferences and quiet hours do not apply. SUPER_ADMINs without a verified email get the
 * in-app notification only (logged).
 */

export const AI_BUDGET_ALERT_JOB = "ai.budgetAlert";
export const AI_BUDGET_ALERT_TYPE = "ops.ai_budget_tripped";

export const budgetAlertPayloadSchema = z.object({
  platformDate: z.iso.date(),
  spentMicros: z.number().int().nonnegative(),
  ceilingMicros: z.number().int().nonnegative(),
});
export type BudgetAlertPayload = z.output<typeof budgetAlertPayloadSchema>;

export function budgetAlertDedupeKey(platformDate: string): string {
  return `ai.budgetAlert:${platformDate}`;
}

/** USD micro-dollars as "US$12.34". */
export function formatUsdMicros(micros: number): string {
  return `US$${(micros / 1_000_000).toFixed(2)}`;
}

/** Title and body of the alert (plain text, no personal data). Pure. */
export function composeBudgetAlert(payload: BudgetAlertPayload, appName: string = APP_NAME): { title: string; body: string } {
  return {
    title: "AI daily budget reached",
    body:
      `${appName} paused AI help (tutor, solver, AI marking) for the rest of ${payload.platformDate} (Africa/Harare time): ` +
      `today's AI spend reached ${formatUsdMicros(payload.spentMicros)} against the daily ceiling of ${formatUsdMicros(payload.ceilingMicros)}. ` +
      `Students see "AI help is paused for the rest of today"; staff content generation still runs. ` +
      `AI resumes at midnight, or sooner if you raise the ceiling in AI settings. Check AI usage for the cause.`,
  };
}

const alerted = new Set<string>();

/** Test hook: forgets the in-process memo. */
export function resetBudgetAlertMemo(): void {
  alerted.clear();
}

/**
 * Queues the day's alert unless one was ever queued for that day. Never throws (a failure is logged and the next
 * refused call tries again). Returns true when a job was created.
 */
export async function enqueueBudgetAlert(event: AiBudgetExceededEvent): Promise<boolean> {
  if (alerted.has(event.platformDate)) return false;
  const parsed = budgetAlertPayloadSchema.safeParse(event);
  if (!parsed.success) {
    logger.error("ai budget alert: invalid event", { issues: parsed.error.issues.map((issue) => issue.message) });
    return false;
  }
  const dedupeKey = budgetAlertDedupeKey(parsed.data.platformDate);
  try {
    const rows = await db.$queryRaw<{ id: string }[]>`
      INSERT INTO "Job" ("id", "queue", "type", "payload", "status", "priority", "runAt", "maxAttempts", "dedupeKey",
                         "createdAt", "updatedAt")
      SELECT uuidv7(), 'notifications', ${AI_BUDGET_ALERT_JOB}, ${JSON.stringify(parsed.data)}::jsonb, 'PENDING', 0::smallint,
             now(), 5::smallint, ${dedupeKey}, now(), now()
       WHERE NOT EXISTS (SELECT 1 FROM "Job" j WHERE j."dedupeKey" = ${dedupeKey})
      ON CONFLICT ("dedupeKey") WHERE "dedupeKey" IS NOT NULL AND "status" = 'PENDING' DO NOTHING
      RETURNING "id"`;
    alerted.add(parsed.data.platformDate);
    if (rows.length > 0) logger.warn("ai budget alert queued", { platformDate: parsed.data.platformDate, jobId: rows[0]?.id });
    return rows.length > 0;
  } catch (error) {
    logger.error("ai budget alert: could not queue the alert", { platformDate: parsed.data.platformDate, err: error });
    return false;
  }
}

export interface BudgetAlertResult {
  recipients: number;
  emailed: number;
  alreadyEmailed: number;
  withoutEmail: number;
  emailFailed: number;
}

interface DeliveryEntry {
  status: "SENT" | "FAILED" | "SKIPPED";
  at: string;
  providerRef?: string;
  error?: string;
}

/** Same `Notification.deliveries` shape as the notifications.send job (per channel: status, time, provider ref). */
async function recordEmailDelivery(notificationId: string, entry: DeliveryEntry): Promise<void> {
  await db.$executeRaw`
    UPDATE "Notification"
       SET "deliveries" = COALESCE("deliveries", '{}'::jsonb) || jsonb_build_object('EMAIL'::text, ${JSON.stringify(entry)}::jsonb)
     WHERE "id" = ${notificationId}::uuid`;
}

function emailSent(deliveries: Prisma.JsonValue | null): boolean {
  if (typeof deliveries !== "object" || deliveries === null || Array.isArray(deliveries)) return false;
  const email = (deliveries as Record<string, unknown>).EMAIL;
  return typeof email === "object" && email !== null && (email as { status?: unknown }).status === "SENT";
}

/**
 * Handler of {@link AI_BUDGET_ALERT_JOB}: notifies every ACTIVE SUPER_ADMIN (in-app + email). Idempotent. Throws after
 * trying everyone when any email failed, so the job retries only the missing emails.
 */
export async function sendBudgetAlert(raw: unknown, options: { onlyUserIds?: readonly string[] } = {}): Promise<BudgetAlertResult> {
  const payload = budgetAlertPayloadSchema.parse(raw);
  const { title, body } = composeBudgetAlert(payload);
  const admins = await db.user.findMany({
    // `onlyUserIds` narrows the audience (tests share one database with many SUPER_ADMIN fixtures).
    where: { roles: { has: "SUPER_ADMIN" }, status: "ACTIVE", ...(options.onlyUserIds ? { id: { in: [...options.onlyUserIds] } } : {}) },
    select: { id: true, emailNormalized: true, emailVerifiedAt: true },
    orderBy: { id: "asc" },
    take: 100,
  });
  const result: BudgetAlertResult = { recipients: admins.length, emailed: 0, alreadyEmailed: 0, withoutEmail: 0, emailFailed: 0 };
  if (admins.length === 0) {
    logger.error("ai budget alert: no active SUPER_ADMIN to notify", { platformDate: payload.platformDate });
    return result;
  }
  // An ops alert is OPTIONAL email: while `features.email` is off (the default) the alert is in-app only.
  const emailOn = await isChannelSwitchedOn("email");
  let firstError: unknown = null;
  for (const admin of admins) {
    const email = emailOn && admin.emailNormalized && admin.emailVerifiedAt ? admin.emailNormalized : null;
    const notification = await createNotification(admin.id, {
      type: AI_BUDGET_ALERT_TYPE,
      category: "SYSTEM",
      title,
      body,
      data: { href: "/admin/ai/usage", platformDate: payload.platformDate },
      channels: email ? ["IN_APP", "EMAIL"] : ["IN_APP"],
      dedupeKey: `ai.budget:${payload.platformDate}`,
    });
    if (!email) {
      result.withoutEmail += 1;
      logger.warn("ai budget alert: SUPER_ADMIN has no verified email; in-app only", { userId: admin.id });
      continue;
    }
    if (emailSent(notification.deliveries)) {
      result.alreadyEmailed += 1;
      continue;
    }
    try {
      const sent = await sendMessage({
        channel: "email",
        to: email,
        subject: `${APP_NAME}: ${title} (${payload.platformDate})`,
        text: `${body}\n\nAI usage: ${absoluteUrl("/admin/ai/usage")}\nAI settings: ${absoluteUrl("/admin/ai/settings")}\n\n—\nOperational alert for platform super admins. Sent at most once per day.`,
        tag: `notification.${AI_BUDGET_ALERT_TYPE}`,
        idempotencyKey: `notification:${notification.id}:EMAIL`,
      });
      await recordEmailDelivery(notification.id, { status: "SENT", at: new Date().toISOString(), providerRef: sent.providerRef });
      result.emailed += 1;
    } catch (error) {
      result.emailFailed += 1;
      firstError ??= error;
      await recordEmailDelivery(notification.id, { status: "FAILED", at: new Date().toISOString(), error: describeJobError(error).slice(0, 300) }).catch(
        (recordError: unknown) => logger.error("ai budget alert: could not record the failure", { notificationId: notification.id, err: recordError }),
      );
    }
  }
  if (firstError !== null) throw firstError;
  return result;
}

/** Registers `ai.budgetAlert` (notifications queue, 5 attempts). Enqueued by the gateway hook, never scheduled. */
export function registerAiBudgetAlertJobs(): void {
  registerJobHandler(AI_BUDGET_ALERT_JOB, budgetAlertPayloadSchema, (payload) => sendBudgetAlert(payload), { queue: "notifications", maxAttempts: 5 });
}
