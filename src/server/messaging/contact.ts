import "server-only";
import { logger } from "@/server/lib/logger";
import { isMessageSwitchedOn, sendMessage } from "./send";

/**
 * Delivery of an account message to a person's own contact (an invitation, password-reset instructions or a
 * verification reminder from staff): email for an address, SMS for a phone number. These are account email (owner
 * decision 2026-10-07): an email address is always sent to. A phone number gets an SMS only while SMS is switched on
 * (`features.sms`, off by default); otherwise nothing is sent and the caller shows the inviter a link to share
 * (docs/ARCHITECTURE.md §3.14).
 */

export type ContactChannel = "sms" | "email";

/** Why a contact message was not sent. */
export type ContactNotSentReason = "sms_switched_off" | "failed";

export type ContactDelivery =
  | { status: "sent"; channel: ContactChannel }
  /** Nothing was sent: the contact is a phone number and SMS is switched off (no provider was contacted). */
  | { status: "not_sent"; channel: "sms"; reason: "sms_switched_off" }
  /** The provider refused or failed (logged); the caller may offer "send again". */
  | { status: "not_sent"; channel: ContactChannel; reason: "failed" };

export interface ContactMessage {
  subject: string;
  text: string;
  /** Template / purpose tag for logs (never personal data). */
  tag: string;
  /** The text carries a secret (an invitation link): adapters must not log it. */
  sensitive?: boolean;
}

/** The channel for a normalised contact: email when it contains "@", otherwise SMS (E.164). */
export function contactChannel(target: string): ContactChannel {
  return target.includes("@") ? "email" : "sms";
}

/** Sends `message` to `target` (normalised email or E.164 phone) as an account message. Never throws. */
export async function sendToContact(target: string, message: ContactMessage): Promise<ContactDelivery> {
  const channel = contactChannel(target);
  const outbound = { channel, to: target, ...message, transactional: true } as const;
  try {
    if (channel === "sms" && !(await isMessageSwitchedOn(outbound))) return { status: "not_sent", channel, reason: "sms_switched_off" };
    const sent = await sendMessage(outbound, { channelSwitchedOn: true });
    if (sent.switchedOff && channel === "sms") return { status: "not_sent", channel, reason: "sms_switched_off" };
    return { status: "sent", channel };
  } catch (error) {
    logger.warn("contact delivery failed", { channel, tag: message.tag, err: error });
    return { status: "not_sent", channel, reason: "failed" };
  }
}
