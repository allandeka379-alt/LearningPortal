import type { ChannelMessageStatus, GuardianConsentStatus } from "@/generated/prisma/client";

/**
 * Pure channel rules (ARCHITECTURE §8 "24-hour window", opt-out, delivery receipts; §5.12 minors). No I/O.
 */

/**
 * The 24-hour customer-service window: free-form messages are allowed only within 24 h of the user's LAST inbound
 * message (`ChannelIdentity.lastInboundAt`); outside it only approved templates. Same value as the notifications
 * module's `WHATSAPP_SESSION_MS`. Verify against current Meta docs before go-live.
 */
export const SERVICE_WINDOW_MS = 24 * 3_600_000;

export function isWithinServiceWindow(lastInboundAt: Date | null, now: Date): boolean {
  return lastInboundAt !== null && now.getTime() - lastInboundAt.getTime() < SERVICE_WINDOW_MS;
}

interface OptFacts {
  optedInAt: Date | null;
  optedOutAt: Date | null;
}

/** STOP wins until a later START: opted out when `optedOutAt` is set and not older than `optedInAt`. */
export function isOptedOut(facts: OptFacts): boolean {
  return facts.optedOutAt !== null && (facts.optedInAt === null || facts.optedOutAt.getTime() >= facts.optedInAt.getTime());
}

/** Opted in to proactive (template) messages: an opt-in that no later STOP cancelled. */
export function isOptedIn(facts: OptFacts): boolean {
  return facts.optedInAt !== null && !isOptedOut(facts);
}

/**
 * Minors (§5.12, Student.isMinor): processing a minor's study data through WhatsApp (Meta is an additional processor)
 * needs guardian consent (`guardianConsentStatus = GRANTED`). Adults (`NOT_REQUIRED`) are always allowed; a user
 * without a Student row (not a student) is not served by the channel at all.
 */
export function guardianConsentAllows(student: { isMinor: boolean; guardianConsentStatus: GuardianConsentStatus } | null): boolean {
  if (student === null) return false;
  if (!student.isMinor) return true;
  return student.guardianConsentStatus === "GRANTED";
}

export type OutboundPurpose = "reply" | "proactive" | "otp";

export type DeliveryDecision =
  | { action: "send" }
  | { action: "template" }
  | { action: "skip"; reason: "outside_service_window" | "opted_out" | "not_opted_in" | "consent_required" };

/**
 * What the send job may do with one queued message (pure):
 * - replies: free-form inside the window; outside it the template fallback (if the message has one AND the user opted
 *   in to proactive messages), otherwise skipped;
 * - proactive messages: never after STOP, only with an opt-in, and as a template outside the window;
 * - one-time codes: always (an authentication template the user just asked for).
 */
export function decideDelivery(input: {
  purpose: OutboundPurpose;
  /** The message itself is a template. */
  isTemplate: boolean;
  hasTemplateFallback: boolean;
  windowOpen: boolean;
  optedIn: boolean;
  optedOut: boolean;
  consentOk: boolean;
}): DeliveryDecision {
  if (input.purpose === "otp") return { action: "send" };
  if (input.purpose === "proactive") {
    if (input.optedOut) return { action: "skip", reason: "opted_out" };
    if (!input.optedIn) return { action: "skip", reason: "not_opted_in" };
    if (!input.consentOk) return { action: "skip", reason: "consent_required" };
    if (input.isTemplate) return { action: "send" };
    if (input.windowOpen) return { action: "send" };
    return input.hasTemplateFallback ? { action: "template" } : { action: "skip", reason: "outside_service_window" };
  }
  if (input.isTemplate) return input.optedOut ? { action: "skip", reason: "opted_out" } : { action: "send" };
  if (input.windowOpen) return { action: "send" };
  if (input.hasTemplateFallback && input.optedIn && input.consentOk) return { action: "template" };
  return { action: "skip", reason: "outside_service_window" };
}

const OUTBOUND_RANK: Partial<Record<ChannelMessageStatus, number>> = { QUEUED: 0, SENT: 1, DELIVERED: 2, READ: 3 };

/**
 * The next status of an OUTBOUND message for a delivery receipt (pure): receipts only move forward (a late "delivered"
 * never overwrites "read"), and "failed" applies only before delivery. `null` = no change.
 */
export function nextOutboundStatus(current: ChannelMessageStatus, incoming: "sent" | "delivered" | "read" | "failed"): ChannelMessageStatus | null {
  const currentRank = OUTBOUND_RANK[current];
  if (currentRank === undefined) return null;
  if (incoming === "failed") return currentRank <= 1 ? "FAILED" : null;
  const target = incoming === "sent" ? "SENT" : incoming === "delivered" ? "DELIVERED" : "READ";
  return (OUTBOUND_RANK[target] ?? 0) > currentRank ? target : null;
}
