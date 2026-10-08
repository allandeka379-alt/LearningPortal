import { z } from "zod";

/**
 * Parsing of WhatsApp Cloud API webhook payloads (pure). VERIFY AGAINST CURRENT META DOCS BEFORE GO-LIVE.
 *
 *   { object: "whatsapp_business_account",
 *     entry: [{ id, changes: [{ field: "messages", value: {
 *       messaging_product: "whatsapp", metadata: { display_phone_number, phone_number_id },
 *       contacts?: [{ profile: { name }, wa_id }],           <- never read or stored (data minimisation)
 *       messages?: [{ from, id, timestamp, type, text?: { body }, interactive?: { type: "button_reply" | "list_reply",
 *                     button_reply?: { id, title }, list_reply?: { id, title, description } }, button?: { payload, text },
 *                     context?: { from, id } }],
 *       statuses?: [{ id, status: "sent" | "delivered" | "read" | "failed", timestamp, recipient_id,
 *                     errors?: [{ code, title }], pricing?: { category }, conversation?: { origin: { type } } }] } }] }] }
 *
 * Each message / status is validated on its own: one malformed item never drops the rest of a delivery.
 */

export const WEBHOOK_OBJECT = "whatsapp_business_account";
const E164 = /^\+[1-9]\d{6,14}$/;
/** WhatsApp text messages are at most 4096 characters; anything longer is cut, never stored in full. */
export const MAX_INBOUND_TEXT = 4096;

const webhookSchema = z.looseObject({
  object: z.string(),
  entry: z
    .array(
      z.looseObject({
        changes: z
          .array(
            z.looseObject({
              field: z.string().optional(),
              value: z.looseObject({
                metadata: z.looseObject({ phone_number_id: z.string().optional() }).optional(),
                messages: z.array(z.unknown()).optional(),
                statuses: z.array(z.unknown()).optional(),
              }),
            }),
          )
          .default([]),
      }),
    )
    .default([]),
});

const messageSchema = z.looseObject({
  from: z.string().regex(/^\d{7,15}$/),
  id: z.string().min(1).max(128),
  timestamp: z.string().regex(/^\d{1,12}$/),
  type: z.string().min(1).max(32),
  text: z.looseObject({ body: z.string() }).optional(),
  interactive: z
    .looseObject({
      type: z.string(),
      button_reply: z.looseObject({ id: z.string().max(256), title: z.string().max(100) }).optional(),
      list_reply: z.looseObject({ id: z.string().max(256), title: z.string().max(100) }).optional(),
    })
    .optional(),
  button: z.looseObject({ payload: z.string().max(256).optional(), text: z.string().max(256).optional() }).optional(),
  context: z.looseObject({ id: z.string().max(128).optional() }).optional(),
});

const statusSchema = z.looseObject({
  id: z.string().min(1).max(128),
  status: z.enum(["sent", "delivered", "read", "failed"]),
  timestamp: z.string().regex(/^\d{1,12}$/),
  errors: z.array(z.looseObject({ code: z.number().optional(), title: z.string().optional() })).optional(),
  pricing: z.looseObject({ category: z.string().max(32).optional() }).optional(),
  conversation: z.looseObject({ origin: z.looseObject({ type: z.string().max(32).optional() }).optional() }).optional(),
});

export type InboundReplyKind = "button" | "list" | "template_button";

export interface ParsedInboundMessage {
  externalMessageId: string;
  /** Sender as E.164 (`wa_id` with "+"). */
  from: string;
  sentAt: Date;
  /** Provider type: "text", "interactive", "button", "image", "reaction", "system", ... */
  type: string;
  /** Text body, or the title of the tapped button / list row. Cut to {@link MAX_INBOUND_TEXT}. */
  text: string | null;
  reply: { kind: InboundReplyKind; id: string; title: string } | null;
  phoneNumberId: string | null;
}

export interface ParsedStatus {
  externalMessageId: string;
  status: "sent" | "delivered" | "read" | "failed";
  at: Date;
  errorCode: number | null;
  errorTitle: string | null;
  pricingCategory: string | null;
  phoneNumberId: string | null;
}

export interface ParsedWebhook {
  /** False for objects other than a WhatsApp Business Account (acknowledged and ignored). */
  relevant: boolean;
  messages: ParsedInboundMessage[];
  statuses: ParsedStatus[];
  /** Items that failed validation (logged as a count only). */
  invalid: number;
}

function epochSeconds(value: string): Date {
  return new Date(Number(value) * 1000);
}

function inboundOf(raw: unknown, phoneNumberId: string | null): ParsedInboundMessage | null {
  const parsed = messageSchema.safeParse(raw);
  if (!parsed.success) return null;
  const message = parsed.data;
  const from = `+${message.from}`;
  if (!E164.test(from)) return null;
  let reply: ParsedInboundMessage["reply"] = null;
  let text: string | null = null;
  if (message.type === "text" && message.text) {
    text = message.text.body;
  } else if (message.type === "interactive" && message.interactive) {
    const button = message.interactive.button_reply;
    const row = message.interactive.list_reply;
    if (button) reply = { kind: "button", id: button.id, title: button.title };
    else if (row) reply = { kind: "list", id: row.id, title: row.title };
    text = reply?.title ?? null;
  } else if (message.type === "button" && message.button) {
    // Quick-reply button of a TEMPLATE message.
    reply = { kind: "template_button", id: message.button.payload ?? message.button.text ?? "", title: message.button.text ?? "" };
    text = reply.title || null;
  }
  return {
    externalMessageId: message.id,
    from,
    sentAt: epochSeconds(message.timestamp),
    type: message.type,
    text: text === null ? null : [...text].slice(0, MAX_INBOUND_TEXT).join(""),
    reply,
    phoneNumberId,
  };
}

function statusOf(raw: unknown, phoneNumberId: string | null): ParsedStatus | null {
  const parsed = statusSchema.safeParse(raw);
  if (!parsed.success) return null;
  const status = parsed.data;
  const error = status.errors?.[0];
  return {
    externalMessageId: status.id,
    status: status.status,
    at: epochSeconds(status.timestamp),
    errorCode: error?.code ?? null,
    errorTitle: error?.title?.slice(0, 200) ?? null,
    pricingCategory: status.pricing?.category ?? status.conversation?.origin?.type ?? null,
    phoneNumberId,
  };
}

/** Parses a webhook body (already JSON-decoded). Never throws for a well-formed but unexpected payload. */
export function parseWebhookPayload(body: unknown): ParsedWebhook {
  const parsed = webhookSchema.safeParse(body);
  if (!parsed.success) return { relevant: false, messages: [], statuses: [], invalid: 1 };
  if (parsed.data.object !== WEBHOOK_OBJECT) return { relevant: false, messages: [], statuses: [], invalid: 0 };
  const result: ParsedWebhook = { relevant: true, messages: [], statuses: [], invalid: 0 };
  for (const entry of parsed.data.entry) {
    for (const change of entry.changes) {
      if (change.field !== undefined && change.field !== "messages") continue;
      const phoneNumberId = change.value.metadata?.phone_number_id ?? null;
      for (const raw of change.value.messages ?? []) {
        const message = inboundOf(raw, phoneNumberId);
        if (message) result.messages.push(message);
        else result.invalid += 1;
      }
      for (const raw of change.value.statuses ?? []) {
        const status = statusOf(raw, phoneNumberId);
        if (status) result.statuses.push(status);
        else result.invalid += 1;
      }
    }
  }
  return result;
}
