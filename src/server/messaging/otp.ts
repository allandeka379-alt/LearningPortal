import "server-only";
import type { VerificationPurpose } from "@/generated/prisma/client";
import { APP_NAME } from "@/lib/config";
import { AppError } from "@/server/lib/errors";
import { isMessagingProviderError } from "./http";
import { sendMessage, type SendOptions } from "./send";
import type { ChannelName, OutboundMessage, SendResult } from "./types";

/**
 * One-time-code messages (§33). Plain, short, transactional: no marketing, no links, nothing personal besides the code,
 * and always "don't share this code". The message is flagged `sensitive` so no adapter ever logs it, and
 * `transactional` so an emailed code is sent even while optional email (`features.email`) is off. Codes by SMS or
 * WhatsApp go only while that channel is switched on (owner decision 2026-10-07: account codes go by email).
 *
 * Rate limiting (per target and per IP) is the caller's job (`rateLimits.otpSendTarget/otpSendIp` in the auth service),
 * as is storing only the HMAC of the code.
 */

export type OtpPurpose = VerificationPurpose;

export interface OtpMessageInput {
  channel: ChannelName;
  /** Email address or E.164 phone number. */
  to: string;
  /** Digits or upper-case letters/digits, 4-12 characters. */
  code: string;
  purpose: OtpPurpose;
  /** Shown in the message (default 10). */
  expiresInMinutes?: number;
}

const CODE_PATTERN = /^[A-Z0-9]{4,12}$/;

const PURPOSE_TEXT: Readonly<Record<OtpPurpose, string>> = {
  LOGIN_OTP: "sign-in code",
  EMAIL_VERIFY: "email verification code",
  PHONE_VERIFY: "phone verification code",
  PASSWORD_RESET: "password reset code",
  PARENT_LINK: "parent link code",
  CHANNEL_LINK: "code to link this number",
  STEP_UP: "confirmation code",
  GUARDIAN_CONSENT: "guardian consent code",
};

/** Builds the subject (email) and plain-text body for an OTP message. Pure. */
export function renderOtpMessage(input: Pick<OtpMessageInput, "code" | "purpose" | "expiresInMinutes">): {
  subject: string;
  text: string;
} {
  if (!CODE_PATTERN.test(input.code)) throw new AppError("BAD_REQUEST", "Invalid one-time code format.");
  const minutes = input.expiresInMinutes ?? 10;
  if (!Number.isInteger(minutes) || minutes < 1 || minutes > 24 * 60) throw new RangeError("expiresInMinutes must be 1-1440");
  const what = PURPOSE_TEXT[input.purpose];
  const expiry = `It expires in ${minutes} minute${minutes === 1 ? "" : "s"}.`;
  const lines = [`Your ${APP_NAME} ${what} is ${input.code}.`, expiry, "Never share this code with anyone."];
  if (input.purpose === "PASSWORD_RESET") lines.push("If you did not ask to reset your password, you can ignore this message.");
  if (input.purpose === "GUARDIAN_CONSENT") {
    lines.splice(0, 1, `A student asked you to approve their ${APP_NAME} account. Your ${what} is ${input.code}.`);
  }
  const subject = input.purpose === "PASSWORD_RESET" ? `Reset your ${APP_NAME} password` : `Your ${APP_NAME} code`;
  return { subject, text: lines.join(" ") };
}

/** Longest pause before the single in-process OTP retry (a provider Retry-After above this is not waited for). */
export const OTP_RETRY_MAX_DELAY_MS = 2_000;
const OTP_RETRY_DEFAULT_DELAY_MS = 750;

/**
 * Whether a failed OTP send is worth one immediate retry: transient provider failures only (network, 429, 5xx). Not
 * timeouts (the provider may have accepted the first request: the user would get two texts, and can ask for a resend
 * after the cooldown anyway), not credential / configuration problems (a retry cannot fix them), never permanent ones.
 */
export function otpRetryDelayMs(error: unknown): number | null {
  if (!isMessagingProviderError(error) || !error.retryable) return null;
  if (error.reason !== "network" && error.reason !== "rate_limited" && error.reason !== "unavailable") return null;
  if (error.retryAfterSeconds === undefined) return OTP_RETRY_DEFAULT_DELAY_MS;
  const delay = error.retryAfterSeconds * 1000;
  return delay <= OTP_RETRY_MAX_DELAY_MS ? Math.max(delay, 100) : null;
}

/**
 * Sends a one-time code over email (always), or SMS / WhatsApp (only while that channel is switched on).
 *
 * Codes are never queued (job payloads must not carry secrets), so instead of the jobs system's backoff a transient
 * provider failure is retried ONCE in-process ({@link otpRetryDelayMs}); the second failure propagates. WhatsApp
 * business-initiated messages use the approved authentication template (the WhatsApp adapter maps this text onto it).
 */
export async function sendOtpMessage(
  input: OtpMessageInput,
  options: { sleep?: (ms: number) => Promise<void> } & SendOptions = {},
): Promise<SendResult> {
  const { subject, text } = renderOtpMessage(input);
  const message: OutboundMessage = {
    channel: input.channel,
    to: input.to,
    subject,
    text,
    tag: `otp.${input.purpose}`,
    sensitive: true,
    transactional: true,
  };
  const sendOptions: SendOptions = options.channelSwitchedOn === undefined ? {} : { channelSwitchedOn: options.channelSwitchedOn };
  try {
    return await sendMessage(message, sendOptions);
  } catch (error) {
    const delay = otpRetryDelayMs(error);
    if (delay === null) throw error;
    await (options.sleep ?? defaultSleep)(delay);
    return sendMessage(message, sendOptions);
  }
}

function defaultSleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
