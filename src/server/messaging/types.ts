/**
 * Outbound messaging contracts (email, SMS, WhatsApp). Adapters implement {@link MessagingChannel}; services call
 * `sendMessage()` / `sendOtpMessage()` / `sendToContact()` from `src/server/messaging`, never a provider SDK directly.
 */

export const CHANNEL_NAMES = ["email", "sms", "whatsapp"] as const;
export type ChannelName = (typeof CHANNEL_NAMES)[number];

export interface OutboundMessage {
  channel: ChannelName;
  /** Email address (email) or E.164 phone number (sms, whatsapp). */
  to: string;
  /** Email subject (ignored by SMS / WhatsApp). */
  subject?: string;
  /** Plain-text body. Keep it short (SMS segments cost money) and free of marketing. */
  text: string;
  /** Template / purpose tag for logs and metrics, e.g. "otp.LOGIN_OTP" (never contains personal data). */
  tag: string;
  /** The body contains a secret (OTP code, invitation link): adapters must never log it. */
  sensitive?: boolean;
  /**
   * Account email (owner decision 2026-10-07; docs/ARCHITECTURE.md §3.14): a verification or sign-in code, a password
   * reset, a security notice or an invitation. On the EMAIL channel such a message is always sent, whatever
   * `features.email` says, because signing in depends on it. Everything else (the default, fail closed) is OPTIONAL and
   * goes only while its channel's flag is on. SMS and WhatsApp have no transactional exception: they are sent only
   * while `features.sms` / `features.whatsapp` is on.
   */
  transactional?: boolean;
  /**
   * Stable key for one logical message (e.g. `notification:<id>:email`), so a retried job does not send twice where the
   * provider supports idempotency (Resend: `Idempotency-Key`, 24 h). Ids only, never personal data.
   */
  idempotencyKey?: string;
}

export interface SendResult {
  /** Provider message id (or a local id for the console driver; "switched-off" when nothing was sent). */
  providerRef: string;
  /** Adapter that sent it, e.g. "console" ("switched-off" when the channel's feature flag is off). */
  driver: string;
  /**
   * True when NOTHING was sent because the channel is switched off for this message (`features.email` for optional
   * email, `features.sms`, `features.whatsapp`; docs/ARCHITECTURE.md §3.14): no provider was contacted. Callers that
   * tell a person "we sent you…" must check it.
   */
  switchedOff?: true;
}

/** One outbound channel backed by one provider. */
export interface MessagingChannel {
  readonly channel: ChannelName;
  /** Provider name, e.g. "console", "resend", "whatsapp-cloud". */
  readonly driver: string;
  send(message: OutboundMessage): Promise<SendResult>;
}
