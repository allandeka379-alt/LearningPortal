import "server-only";
import { Prisma } from "@/generated/prisma/client";
import { db } from "@/server/db";
import { enqueue } from "@/server/lib/jobs";
import { logger as rootLogger, type Logger } from "@/server/lib/logger";
import { rateLimit, rateLimits } from "@/server/lib/rate-limit";
import { isStorableCommandForUnlinked } from "./commands";
import { whatsappConfigFromEnv, type WhatsAppConfig } from "./config";
import { WHATSAPP_QUEUE } from "./outbound";
import { parseWebhookPayload, type ParsedInboundMessage, type ParsedStatus } from "./payload";
import { nextOutboundStatus } from "./policy";
import { checkSubscription, SIGNATURE_HEADER, verifySignature } from "./signature";

/**
 * `/api/webhooks/whatsapp` (ARCHITECTURE §8 steps 1-4). VERIFY AGAINST CURRENT META DOCS BEFORE GO-LIVE.
 *
 * GET  subscription handshake: `hub.verify_token` compared in constant time, `hub.challenge` echoed as text/plain.
 * POST 1 read the RAW body (capped) and verify `X-Hub-Signature-256` over those exact bytes -> 401 on mismatch
 *      2 parse; for each message, in one transaction: upsert the ChannelIdentity (24-hour window anchor
 *        `lastInboundAt`), insert the INBOUND ChannelMessage with ON CONFLICT DO NOTHING on (channel,
 *        externalMessageId) = dedupe, THEN count the per-number inbound rate limit (only for a newly stored message, so
 *        Meta's redeliveries of a message we already have never use up the sender's allowance; the hit commits or
 *        rolls back with the row), and enqueue `whatsapp.process` (over the limit: stored as IGNORED, no job)
 * (A per-IP receipt limit runs before all of this, in the route: `limitWebhookReceipt`.)
 *      3 status receipts (sent / delivered / read / failed) move OUTBOUND rows forward
 *      4 200 `{ received: true }` quickly; the work happens in the worker. A database failure is 500 (Meta retries).
 *
 * Data minimisation (§5.12): the sender's profile name is never read; an UNLINKED number's text is stored only when it
 * is a short command (HELP, STOP, LINK...); media is never downloaded or stored.
 */

export const WHATSAPP_PROCESS_JOB = "whatsapp.process";
export const MAX_WEBHOOK_BODY_BYTES = 512 * 1024;

export interface WebhookHttpResult {
  status: number;
  body: string | { received: boolean; error?: string };
  contentType: "text/plain" | "application/json";
}

const json = (status: number, body: { received: boolean; error?: string }): WebhookHttpResult => ({ status, body, contentType: "application/json" });

export interface WebhookOptions {
  /** Defaults to the environment; `null` = not configured. */
  config?: WhatsAppConfig | null;
  now?: Date;
  logger?: Logger;
}

function resolveConfig(options: WebhookOptions): WhatsAppConfig | null {
  return options.config === undefined ? whatsappConfigFromEnv() : options.config;
}

/** GET handshake. */
export function handleVerification(url: URL, options: WebhookOptions = {}): WebhookHttpResult {
  const config = resolveConfig(options);
  if (!config) return { status: 404, body: "Not found", contentType: "text/plain" };
  const check = checkSubscription(url.searchParams, config.verifyToken);
  return check.ok ? { status: 200, body: check.challenge, contentType: "text/plain" } : { status: 403, body: "Forbidden", contentType: "text/plain" };
}

async function readRawBody(request: Request, maxBytes: number): Promise<Uint8Array | null> {
  const declared = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(declared) && declared > maxBytes) return null;
  if (request.body === null) return new Uint8Array();
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maxBytes) {
      await reader.cancel().catch(() => undefined);
      return null;
    }
    chunks.push(value);
  }
  return Buffer.concat(chunks);
}

/** POST delivery. */
export async function handleWebhookPost(request: Request, options: WebhookOptions = {}): Promise<WebhookHttpResult> {
  const log = (options.logger ?? rootLogger).child({ module: "whatsapp.webhook" });
  const config = resolveConfig(options);
  if (!config) return json(404, { received: false, error: "not_found" });
  const raw = await readRawBody(request, MAX_WEBHOOK_BODY_BYTES);
  if (raw === null) return json(413, { received: false, error: "payload_too_large" });
  if (!verifySignature(raw, request.headers.get(SIGNATURE_HEADER), config.appSecret)) {
    log.warn("whatsapp: rejected a webhook with a missing or invalid signature");
    return json(401, { received: false, error: "invalid_signature" });
  }
  let body: unknown;
  try {
    body = JSON.parse(new TextDecoder("utf-8").decode(raw)) as unknown;
  } catch {
    return json(400, { received: false, error: "invalid_json" });
  }
  const parsed = parseWebhookPayload(body);
  if (!parsed.relevant) return json(200, { received: true });
  if (parsed.invalid > 0) log.warn("whatsapp: webhook items failed validation", { count: parsed.invalid });
  const now = options.now ?? new Date();
  try {
    const summary = await ingest(parsed.messages.filter((m) => m.phoneNumberId === null || m.phoneNumberId === config.phoneNumberId), parsed.statuses.filter((s) => s.phoneNumberId === null || s.phoneNumberId === config.phoneNumberId), now);
    log.info("whatsapp webhook processed", { ...summary });
    return json(200, { received: true });
  } catch (error) {
    log.error("whatsapp: webhook processing failed", { err: error });
    return json(500, { received: false, error: "processing_failed" });
  }
}

export interface IngestSummary {
  stored: number;
  duplicates: number;
  rateLimited: number;
  statusesApplied: number;
}

async function ingest(messages: readonly ParsedInboundMessage[], statuses: readonly ParsedStatus[], now: Date): Promise<IngestSummary> {
  const summary: IngestSummary = { stored: 0, duplicates: 0, rateLimited: 0, statusesApplied: 0 };
  for (const message of messages) {
    const outcome = await storeInbound(message, now);
    if (outcome === "duplicate") summary.duplicates += 1;
    else summary.stored += 1;
    if (outcome === "rate_limited") summary.rateLimited += 1;
  }
  for (const status of statuses) if (await applyStatus(status)) summary.statusesApplied += 1;
  return summary;
}

/** Message types that never get a reply (reactions, edits, system notices). */
const SILENT_TYPES = new Set(["reaction", "system", "ephemeral", "revoke", "edit", "unsupported", "request_welcome"]);

/**
 * Stores one inbound message and queues its processing. Exported for tests.
 *
 * Dedupe comes first: the per-number limit (`rateLimits.whatsappInbound`) is counted only when the message row is new,
 * inside the same transaction (`rateLimit(..., { client: tx })`), so a retried delivery of a stored message is a pure
 * no-op and never counts against the sender.
 */
export async function storeInbound(message: ParsedInboundMessage, now: Date): Promise<"stored" | "duplicate" | "rate_limited"> {
  // The window starts at the user's message; never in the future (provider clock skew).
  const inboundAt = new Date(Math.min(message.sentAt.getTime(), now.getTime()));
  return db.$transaction(async (tx) => {
    const identities = await tx.$queryRaw<{ id: string; linked: boolean }[]>`
      INSERT INTO "ChannelIdentity" ("id", "channel", "externalId", "lastInboundAt", "createdAt", "updatedAt")
      VALUES (uuidv7(), 'WHATSAPP'::"ChannelType", ${message.from}, ${inboundAt.toISOString()}::timestamptz, now(), now())
      ON CONFLICT ("channel", "externalId") DO UPDATE
        SET "lastInboundAt" = GREATEST(COALESCE("ChannelIdentity"."lastInboundAt", EXCLUDED."lastInboundAt"), EXCLUDED."lastInboundAt"),
            "updatedAt" = now()
      RETURNING "id"::text AS "id", ("userId" IS NOT NULL AND "verifiedAt" IS NOT NULL) AS "linked"`;
    const identity = identities[0];
    if (!identity) throw new Error("whatsapp: identity upsert returned no row");

    const silent = SILENT_TYPES.has(message.type);
    const keepText = identity.linked || isStorableCommandForUnlinked(message.text);
    const body = keepText ? message.text : null;
    const payload = { type: message.type, ...(message.reply ? { reply: { kind: message.reply.kind, id: message.reply.id.slice(0, 256) } } : {}) };
    const status = silent ? "IGNORED" : "RECEIVED";
    const inserted = await tx.$queryRaw<{ id: string }[]>`
      INSERT INTO "ChannelMessage" ("id", "identityId", "channel", "direction", "status", "contentClass", "externalMessageId",
                                    "messageType", "body", "payload", "createdAt", "updatedAt")
      VALUES (uuidv7(), ${identity.id}::uuid, 'WHATSAPP'::"ChannelType", 'INBOUND'::"MessageDirection",
              ${status}::"ChannelMessageStatus", 'STANDARD'::"ChannelContentClass", ${message.externalMessageId},
              ${message.type.slice(0, 32)}, ${body}, ${JSON.stringify(payload)}::jsonb, now(), now())
      ON CONFLICT ("channel", "externalMessageId") DO NOTHING
      RETURNING "id"::text AS "id"`;
    const row = inserted[0];
    if (!row) return "duplicate";
    // A NEW message: count it against the sender (silent types too: reactions can flood as well).
    const limit = await rateLimit(rateLimits.whatsappInbound(message.from), { client: tx });
    if (!limit.allowed) {
      if (status === "RECEIVED") {
        await tx.channelMessage.updateMany({ where: { id: row.id, status: "RECEIVED" }, data: { status: "IGNORED" } });
      }
      return "rate_limited";
    }
    if (status === "RECEIVED") {
      await enqueue(WHATSAPP_PROCESS_JOB, { messageId: row.id }, { client: tx, queue: WHATSAPP_QUEUE, dedupeKey: `${WHATSAPP_PROCESS_JOB}:${row.id}`, maxAttempts: 3 });
    }
    return "stored";
  });
}

/** Applies one delivery receipt to its OUTBOUND row (forward-only). Returns true when the row changed. */
export async function applyStatus(status: ParsedStatus): Promise<boolean> {
  const row = await db.channelMessage.findUnique({
    where: { channel_externalMessageId: { channel: "WHATSAPP", externalMessageId: status.externalMessageId } },
    select: { id: true, direction: true, status: true },
  });
  if (!row || row.direction !== "OUTBOUND") return false;
  const next = nextOutboundStatus(row.status, status.status);
  const data: Prisma.ChannelMessageUpdateManyMutationInput = {
    ...(status.pricingCategory ? { pricingCategory: status.pricingCategory.slice(0, 32) } : {}),
  };
  if (next === "SENT") data.sentAt = status.at;
  if (next === "DELIVERED") data.deliveredAt = status.at;
  if (next === "READ") data.readAt = status.at;
  if (next === "FAILED") {
    data.failedAt = status.at;
    data.error = `provider ${status.errorCode ?? "error"}${status.errorTitle ? `: ${status.errorTitle}` : ""}`.slice(0, 1000);
  }
  if (next !== null) data.status = next;
  if (Object.keys(data).length === 0) return false;
  const updated = await db.channelMessage.updateMany({ where: { id: row.id, status: row.status }, data });
  return updated.count === 1 && next !== null;
}
