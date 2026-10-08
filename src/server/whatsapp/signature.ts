import "server-only";
import { createHmac } from "node:crypto";
import { timingSafeEqualStr } from "@/server/lib/crypto";

/**
 * Webhook authenticity (ARCHITECTURE §8 step 1, §5). Pure apart from hashing. VERIFY AGAINST CURRENT META DOCS
 * BEFORE GO-LIVE.
 *
 * - Subscription handshake: `GET ?hub.mode=subscribe&hub.verify_token=...&hub.challenge=...`; the token is compared in
 *   constant time with `WHATSAPP_VERIFY_TOKEN` and the challenge echoed as plain text.
 * - Event delivery: `X-Hub-Signature-256: sha256=<hex HMAC-SHA256(raw body, WHATSAPP_APP_SECRET)>`, computed over the
 *   EXACT raw bytes (never a re-serialised JSON object), compared in constant time. Anything else is rejected.
 */

export const SIGNATURE_HEADER = "x-hub-signature-256";
const SIGNATURE_PATTERN = /^sha256=([0-9a-f]{64})$/i;
/** Meta sends a numeric challenge; anything outside this shape is refused so the echo can never carry markup. */
const CHALLENGE_PATTERN = /^[A-Za-z0-9_.-]{1,128}$/;

/** `sha256=<hex>` for a raw body. */
export function computeSignature(rawBody: Uint8Array | string, appSecret: string): string {
  return `sha256=${createHmac("sha256", appSecret).update(rawBody).digest("hex")}`;
}

/** True when `header` is a valid signature of `rawBody` under `appSecret` (constant-time comparison). */
export function verifySignature(rawBody: Uint8Array | string, header: string | null | undefined, appSecret: string): boolean {
  if (!header || appSecret.length === 0) return false;
  const match = SIGNATURE_PATTERN.exec(header.trim());
  if (!match?.[1]) return false;
  return timingSafeEqualStr(`sha256=${match[1].toLowerCase()}`, computeSignature(rawBody, appSecret));
}

export type SubscriptionCheck = { ok: true; challenge: string } | { ok: false };

/** Decides the GET handshake (pure). */
export function checkSubscription(params: URLSearchParams, verifyToken: string): SubscriptionCheck {
  const mode = params.get("hub.mode");
  const token = params.get("hub.verify_token");
  const challenge = params.get("hub.challenge");
  if (mode !== "subscribe" || token === null || challenge === null || verifyToken.length === 0) return { ok: false };
  if (!CHALLENGE_PATTERN.test(challenge)) return { ok: false };
  return timingSafeEqualStr(token, verifyToken) ? { ok: true, challenge } : { ok: false };
}
