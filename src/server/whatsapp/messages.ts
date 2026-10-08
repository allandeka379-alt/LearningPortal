import { z } from "zod";
import type { WhatsAppSendRequest } from "@/server/messaging/whatsapp-driver";
import { WHATSAPP_LIMITS } from "@/server/messaging/whatsapp-driver";
import { WHATSAPP_TEMPLATE_KEYS, WHATSAPP_TEMPLATES, type WhatsAppTemplateKey } from "./templates";

/**
 * The channel's outbound message model: what the router produces, what `ChannelMessage` stores (body = the text,
 * payload = the rest, Zod-validated) and what the send job turns into a Cloud API request.
 */

export type WhatsAppMessageSpec =
  | { kind: "text"; text: string }
  | { kind: "buttons"; text: string; buttons: { id: string; title: string }[]; footer?: string }
  | { kind: "list"; text: string; buttonText: string; rows: { id: string; title: string; description?: string }[]; footer?: string }
  | { kind: "template"; template: WhatsAppTemplateKey; params: string[] };

const L = WHATSAPP_LIMITS;

/**
 * `ChannelMessage.payload` of a STANDARD outbound row. Shape (schema doc): `{ type, interactive?, template?, purpose,
 * fallback? }`; the message text is `ChannelMessage.body`.
 */
export const outboundPayloadSchema = z.object({
  type: z.enum(["text", "interactive", "template"]),
  purpose: z.enum(["reply", "proactive"]),
  interactive: z
    .discriminatedUnion("kind", [
      z.object({
        kind: z.literal("buttons"),
        buttons: z.array(z.object({ id: z.string().min(1).max(L.buttonId), title: z.string().min(1).max(L.buttonTitle) })).min(1).max(L.maxButtons),
        footer: z.string().max(L.footer).optional(),
      }),
      z.object({
        kind: z.literal("list"),
        buttonText: z.string().min(1).max(L.listButtonText),
        rows: z
          .array(
            z.object({
              id: z.string().min(1).max(L.listRowId),
              title: z.string().min(1).max(L.listRowTitle),
              description: z.string().max(L.listRowDescription).optional(),
            }),
          )
          .min(1)
          .max(L.maxListRows),
        footer: z.string().max(L.footer).optional(),
      }),
    ])
    .optional(),
  template: z.object({ key: z.enum(WHATSAPP_TEMPLATE_KEYS), params: z.array(z.string().max(L.templateParam)).max(10) }).optional(),
  /** Template to use instead when the 24-hour window has closed (opted-in users only). */
  fallback: z.object({ key: z.enum(WHATSAPP_TEMPLATE_KEYS), params: z.array(z.string().max(L.templateParam)).max(10) }).optional(),
});

export type OutboundPayload = z.output<typeof outboundPayloadSchema>;

/** Text stored in `ChannelMessage.body` for a spec. */
export function specBody(spec: WhatsAppMessageSpec): string | null {
  return spec.kind === "template" ? null : spec.text;
}

/** Splits a spec into the stored body + payload. */
export function toStoredMessage(
  spec: WhatsAppMessageSpec,
  options: { purpose: "reply" | "proactive"; fallback?: { key: WhatsAppTemplateKey; params: string[] } },
): { body: string | null; payload: OutboundPayload; messageType: string; templateName: string | null } {
  const base = { purpose: options.purpose, ...(options.fallback ? { fallback: options.fallback } : {}) };
  switch (spec.kind) {
    case "text":
      return { body: spec.text, payload: { type: "text", ...base }, messageType: "text", templateName: null };
    case "buttons":
      return {
        body: spec.text,
        payload: { type: "interactive", interactive: { kind: "buttons", buttons: spec.buttons, ...(spec.footer ? { footer: spec.footer } : {}) }, ...base },
        messageType: "interactive",
        templateName: null,
      };
    case "list":
      return {
        body: spec.text,
        payload: {
          type: "interactive",
          interactive: { kind: "list", buttonText: spec.buttonText, rows: spec.rows, ...(spec.footer ? { footer: spec.footer } : {}) },
          ...base,
        },
        messageType: "interactive",
        templateName: null,
      };
    case "template":
      return {
        body: null,
        payload: { type: "template", template: { key: spec.template, params: spec.params }, ...base },
        messageType: "template",
        templateName: WHATSAPP_TEMPLATES[spec.template].name,
      };
  }
}

/** Rebuilds the spec of a stored STANDARD row; `null` when the row is unusable. */
export function fromStoredMessage(body: string | null, payload: OutboundPayload): WhatsAppMessageSpec | null {
  if (payload.type === "template") return payload.template ? { kind: "template", template: payload.template.key, params: payload.template.params } : null;
  if (!body) return null;
  if (payload.type === "interactive" && payload.interactive) {
    return payload.interactive.kind === "buttons"
      ? { kind: "buttons", text: body, buttons: payload.interactive.buttons, ...(payload.interactive.footer ? { footer: payload.interactive.footer } : {}) }
      : {
          kind: "list",
          text: body,
          buttonText: payload.interactive.buttonText,
          rows: payload.interactive.rows,
          ...(payload.interactive.footer ? { footer: payload.interactive.footer } : {}),
        };
  }
  return { kind: "text", text: body };
}

/** Cloud API request for a spec (templates resolved from the registry). */
export function toSendRequest(spec: WhatsAppMessageSpec): WhatsAppSendRequest {
  if (spec.kind !== "template") return spec;
  const template = WHATSAPP_TEMPLATES[spec.template];
  return { kind: "template", name: template.name, language: template.language, bodyParams: spec.params };
}

/**
 * A text rendering of any request, for the console driver in development (buttons and rows become numbered lines).
 * Pure.
 */
export function requestAsText(request: WhatsAppSendRequest): string {
  switch (request.kind) {
    case "text":
      return request.text;
    case "buttons":
      return `${request.text}\n\n${request.buttons.map((button) => `[${button.title}]`).join(" ")}`;
    case "list":
      return `${request.text}\n\n${request.rows.map((row) => `[${row.title}]${row.description ? ` ${row.description}` : ""}`).join("\n")}`;
    case "template":
      return `[template ${request.name}] ${(request.bodyParams ?? []).join(" | ")}`.trim();
  }
}
