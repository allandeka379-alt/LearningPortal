import "server-only";
import { z } from "zod";
import { Prisma } from "@/generated/prisma/client";
import { absoluteUrl } from "@/server/lib/env";
import { db, type DbClient } from "@/server/db";
import { isFeatureEnabled } from "@/server/features";
import { withAiScope } from "@/server/lib/db-context";
import { AppError, isAppError } from "@/server/lib/errors";
import { describeJobError, enqueue, PermanentJobError } from "@/server/lib/jobs";
import { logger as rootLogger, type Logger } from "@/server/lib/logger";
import { RATE_LIMIT_PRESETS, rateLimit, rateLimits } from "@/server/lib/rate-limit";
import { WhatsAppApiError } from "@/server/messaging/whatsapp-driver";
import { fromStoredMessage, outboundPayloadSchema, toSendRequest, toStoredMessage, type WhatsAppMessageSpec } from "./messages";
import { decideDelivery, guardianConsentAllows, isOptedIn, isOptedOut, isWithinServiceWindow, type OutboundPurpose } from "./policy";
import { formatExplanation } from "./render";
import type { WhatsAppTemplateKey } from "./templates";
import { getWhatsAppTransport, type WhatsAppTransport } from "./transport";

/**
 * Outbound WhatsApp messages (ARCHITECTURE §8 step 9): every reply is a `ChannelMessage` (OUTBOUND, QUEUED) written in
 * the same transaction as the work that produced it, plus a `whatsapp.send` job (outbox). The job applies the channel
 * rules at send time (24-hour window, opt-out, guardian consent, per-recipient rate limit), calls the Cloud API and
 * records SENT with the provider message id (wamid) that delivery receipts later match. Retries use the queue's backoff;
 * permanent failures (invalid number, outside the window, Meta rejects the content) are FAILED with a reason.
 *
 * Delivery is at-least-once: a crash after Meta accepted a message but before SENT is recorded can repeat it.
 *
 * While the channel is switched off (`features.whatsapp`, docs/ARCHITECTURE.md §3.14) the send job never reaches a
 * transport: queued rows are closed as FAILED ("WhatsApp is switched off").
 */

export const WHATSAPP_SEND_JOB = "whatsapp.send";
export const WHATSAPP_QUEUE = "notifications";
export const SEND_MAX_ATTEMPTS = 5;
export const sendPayloadSchema = z.object({ messageId: z.uuid() });

/**
 * Per-recipient send limit: the `whatsappOutbound` preset (tunable through the `rateLimits` setting); Meta also throttles
 * pairs (error 131056).
 */
export const WHATSAPP_OUTBOUND_LIMIT = RATE_LIMIT_PRESETS.whatsappOutbound;

export interface OutboundDraft {
  /** STANDARD message; `null` with `aiMessageId` = the text lives in AiMessage (AI_PRIVATE). */
  spec: WhatsAppMessageSpec | null;
  aiMessageId?: string;
  fallback?: { key: WhatsAppTemplateKey; params: string[] };
}

/** Writes outbound rows and their send jobs (inside the caller's transaction). Returns the new row ids. */
export async function queueOutbound(
  tx: DbClient,
  input: { identityId: string; drafts: readonly OutboundDraft[]; inReplyToId?: string | null; purpose: Exclude<OutboundPurpose, "otp"> },
): Promise<string[]> {
  const ids: string[] = [];
  for (const [index, draft] of input.drafts.entries()) {
    const common = {
      identityId: input.identityId,
      channel: "WHATSAPP" as const,
      direction: "OUTBOUND" as const,
      status: "QUEUED" as const,
      inReplyToId: input.inReplyToId ?? null,
    };
    let row: { id: string };
    if (draft.spec === null) {
      if (!draft.aiMessageId) throw new Error("whatsapp: an AI reply needs its AiMessage id");
      row = await tx.channelMessage.create({
        data: { ...common, contentClass: "AI_PRIVATE", aiMessageId: draft.aiMessageId, messageType: "text" },
        select: { id: true },
      });
    } else {
      const stored = toStoredMessage(draft.spec, { purpose: input.purpose, ...(draft.fallback ? { fallback: draft.fallback } : {}) });
      row = await tx.channelMessage.create({
        data: {
          ...common,
          contentClass: "STANDARD",
          body: stored.body,
          payload: stored.payload as Prisma.InputJsonObject,
          messageType: stored.messageType,
          templateName: stored.templateName,
        },
        select: { id: true },
      });
    }
    // Small stagger keeps multi-part replies in order on a busy queue.
    await enqueue(WHATSAPP_SEND_JOB, { messageId: row.id }, { client: tx, dedupeKey: `${WHATSAPP_SEND_JOB}:${row.id}`, queue: WHATSAPP_QUEUE, maxAttempts: SEND_MAX_ATTEMPTS, ...(index > 0 ? { delayMs: index * 1_500 } : {}) });
    ids.push(row.id);
  }
  return ids;
}

/**
 * Queues a proactive message to a student's linked number (reminders from other modules). The send job decides at send
 * time: free-form inside the 24-hour window, the `fallback` template outside it, nothing after STOP / without opt-in.
 * Returns `null` when the student has no linked number.
 */
export async function queueProactiveWhatsApp(userId: string, draft: OutboundDraft & { spec: WhatsAppMessageSpec }): Promise<string | null> {
  return db.$transaction(async (tx) => {
    const identity = await tx.channelIdentity.findUnique({
      where: { userId_channel: { userId, channel: "WHATSAPP" } },
      select: { id: true, verifiedAt: true },
    });
    if (!identity?.verifiedAt) return null;
    const [id] = await queueOutbound(tx, { identityId: identity.id, drafts: [draft], purpose: "proactive" });
    return id ?? null;
  });
}

export type SendOutcome =
  | { status: "sent"; providerRef: string }
  | { status: "skipped"; reason: string }
  | { status: "failed"; reason: string }
  | { status: "noop"; reason: string };

export interface SendDeps {
  transport?: WhatsAppTransport | null;
  now?: () => Date;
  logger?: Logger;
  /** 1-based attempt and budget of the running job: the last failed attempt records FAILED. */
  attempt?: number;
  maxAttempts?: number;
}

const AI_FALLBACK_TEXT = "I can't help with that one here. Try a school topic, for example: EXPLAIN photosynthesis";

async function markFailed(id: string, reason: string, now: Date): Promise<void> {
  await db.channelMessage.updateMany({ where: { id, status: "QUEUED" }, data: { status: "FAILED", failedAt: now, error: reason.slice(0, 1000) } });
}

/**
 * Handler of {@link WHATSAPP_SEND_JOB}. Idempotent: anything but a QUEUED row is left alone.
 *
 * @throws for retryable failures (network, 429, 5xx, rate limit) so the job backs off; PermanentJobError never escapes
 *   for content the provider rejected (the row is FAILED instead).
 */
export async function sendQueuedMessage(messageId: string, deps: SendDeps = {}): Promise<SendOutcome> {
  const now = deps.now?.() ?? new Date();
  const log = (deps.logger ?? rootLogger).child({ module: "whatsapp.send", channelMessageId: messageId });
  const row = await db.channelMessage.findUnique({
    where: { id: messageId },
    select: {
      id: true,
      direction: true,
      status: true,
      contentClass: true,
      aiMessageId: true,
      body: true,
      payload: true,
      inReplyToId: true,
      identity: {
        select: {
          id: true,
          userId: true,
          externalId: true,
          lastInboundAt: true,
          optedInAt: true,
          optedOutAt: true,
          user: { select: { student: { select: { isMinor: true, guardianConsentStatus: true } } } },
        },
      },
    },
  });
  if (!row || row.direction !== "OUTBOUND") return { status: "noop", reason: "missing" };
  if (row.status !== "QUEUED") return { status: "noop", reason: `already ${row.status.toLowerCase()}` };
  // Switched off (`features.whatsapp`): a message queued before the switch is closed, never sent later.
  if (!(await isFeatureEnabled("whatsapp"))) {
    await markFailed(row.id, "WhatsApp is switched off", now);
    log.info("whatsapp message dropped: the channel is switched off");
    return { status: "skipped", reason: "switched_off" };
  }
  const identity = row.identity;
  if (!identity) {
    await markFailed(row.id, "recipient identity deleted", now);
    return { status: "failed", reason: "no_recipient" };
  }

  // --- what to send ---
  let spec: WhatsAppMessageSpec | null = null;
  let purpose: OutboundPurpose = row.inReplyToId ? "reply" : "proactive";
  let fallback: { key: WhatsAppTemplateKey; params: string[] } | undefined;
  if (row.contentClass === "AI_PRIVATE") {
    purpose = "reply";
    const message = row.aiMessageId
      ? await withAiScope("system", null, (tx) => tx.aiMessage.findUnique({ where: { id: row.aiMessageId as string }, select: { content: true, status: true } }))
      : null;
    const text = message && message.status !== "REFUSED" && message.content.trim() !== "" ? formatExplanation(message.content, absoluteUrl("/app/tutor")) : AI_FALLBACK_TEXT;
    spec = { kind: "text", text };
  } else if (row.contentClass === "STANDARD") {
    const payload = outboundPayloadSchema.safeParse(row.payload);
    if (payload.success) {
      spec = fromStoredMessage(row.body, payload.data);
      purpose = payload.data.purpose;
      fallback = payload.data.fallback;
    }
  }
  if (!spec) {
    await markFailed(row.id, "unreadable message content", now);
    return { status: "failed", reason: "unreadable" };
  }

  // --- channel rules ---
  const consentOk = identity.userId === null || guardianConsentAllows(identity.user?.student ?? null);
  const decision = decideDelivery({
    purpose,
    isTemplate: spec.kind === "template",
    hasTemplateFallback: fallback !== undefined,
    windowOpen: isWithinServiceWindow(identity.lastInboundAt, now),
    optedIn: isOptedIn(identity),
    optedOut: isOptedOut(identity),
    consentOk,
  });
  if (decision.action === "skip") {
    await markFailed(row.id, `skipped: ${decision.reason}`, now);
    log.info("whatsapp message skipped", { reason: decision.reason, purpose });
    return { status: "skipped", reason: decision.reason };
  }
  if (decision.action === "template" && fallback) spec = { kind: "template", template: fallback.key, params: fallback.params };

  const transport = deps.transport === undefined ? getWhatsAppTransport() : deps.transport;
  if (!transport) {
    await markFailed(row.id, "WhatsApp is not configured", now);
    return { status: "failed", reason: "not_configured" };
  }
  const lastAttempt = (deps.attempt ?? 1) >= (deps.maxAttempts ?? SEND_MAX_ATTEMPTS);
  const limited = await rateLimit(rateLimits.whatsappOutbound(identity.externalId));
  if (!limited.allowed) {
    if (lastAttempt) {
      await markFailed(row.id, "recipient rate limit", now);
      return { status: "failed", reason: "rate_limited" };
    }
    throw AppError.rateLimited(limited.retryAfterSeconds, "WhatsApp recipient rate limit");
  }

  // --- send ---
  const request = toSendRequest(spec);
  try {
    const sent = await transport.send(identity.externalId, request, `whatsapp.${purpose}`);
    await db.$transaction([
      db.channelMessage.updateMany({
        where: { id: row.id, status: "QUEUED" },
        data: {
          status: "SENT",
          sentAt: now,
          externalMessageId: sent.providerRef.slice(0, 128),
          messageType: spec.kind === "template" ? "template" : spec.kind === "text" ? "text" : "interactive",
          ...(spec.kind === "template" ? { templateName: request.kind === "template" ? request.name : null } : {}),
        },
      }),
      db.channelIdentity.update({ where: { id: identity.id }, data: { lastOutboundAt: now } }),
    ]);
    return { status: "sent", providerRef: sent.providerRef };
  } catch (error) {
    const retryable =
      error instanceof WhatsAppApiError ? error.retryable : isAppError(error) ? error.code === "RATE_LIMITED" : !(error instanceof PermanentJobError);
    if (retryable && !lastAttempt) throw error;
    await markFailed(row.id, describeJobError(error), now);
    log.warn("whatsapp message failed", { retryable, err: error });
    return { status: "failed", reason: error instanceof WhatsAppApiError && error.code !== null ? `provider_${error.code}` : "provider_error" };
  }
}
