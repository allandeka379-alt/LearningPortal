/**
 * Outbound messaging (email, SMS, WhatsApp): adapters, provider selection and OTP templates.
 *
 * - `sendMessage()` / `resolveMessagingChannel()` / `isChannelSwitchedOn()` / `isMessageSwitchedOn()` — ./send.ts.
 *   Account email (`transactional: true`: codes, resets, security notices, invitations) is always sent; optional
 *   email, SMS and WhatsApp are no-ops while their feature flag is off (docs/ARCHITECTURE.md §3.14).
 * - `sendOtpMessage()` / `renderOtpMessage()` — ./otp.ts
 * - `sendToContact()` — ./contact.ts (account messages to a person's own email / phone)
 * - real providers (Resend, Twilio, Africa's Talking) — ./providers.ts; failures are `MessagingProviderError` (./http.ts)
 * - dev / test capture: `getDevOutbox()` — ./console-driver.ts
 */
export type { ChannelName, MessagingChannel, OutboundMessage, SendResult } from "./types";
export { CHANNEL_NAMES } from "./types";
export {
  getMessagingChannel,
  isAlwaysOn,
  isChannelSwitchedOn,
  isMessageSwitchedOn,
  isValidRecipient,
  resolveMessagingChannel,
  sendMessage,
  setMessagingChannel,
  SWITCHED_OFF_RESULT,
  type SendOptions,
} from "./send";
export { renderOtpMessage, sendOtpMessage, type OtpMessageInput, type OtpPurpose } from "./otp";
export {
  contactChannel,
  sendToContact,
  type ContactChannel,
  type ContactDelivery,
  type ContactMessage,
  type ContactNotSentReason,
} from "./contact";
export { isMessagingProviderError, MessagingProviderError, type ProviderFailureReason } from "./http";
export { clearDevOutbox, getDevOutbox, latestDevMessage, maskRecipient, type DevOutboxMessage } from "./console-driver";
