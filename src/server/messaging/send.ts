import "server-only";
import { z } from "zod";
import type { FeatureName } from "@/lib/features";
import { isFeatureEnabled } from "@/server/features";
import { AppError } from "@/server/lib/errors";
import { getEnv, type ServerEnv } from "@/server/lib/env";
import { logger } from "@/server/lib/logger";
import { ConsoleDriver } from "./console-driver";
import { emailProviderFromEnv, smsProviderFromEnv, UnconfiguredProvider } from "./providers";
import { assertSmsBudget } from "./sms-budget";
import type { ChannelName, MessagingChannel, OutboundMessage, SendResult } from "./types";
import { whatsappDriverFromEnv } from "./whatsapp-driver";

/**
 * Outbound messaging entry point (email, SMS, WhatsApp). Provider selection comes from the environment:
 *
 * | Channel  | Setting                              | Dev / test (default) | Production                                       |
 * |----------|--------------------------------------|----------------------|--------------------------------------------------|
 * | email    | `EMAIL_PROVIDER`                     | `console`            | `resend` (required: accounts are email-based)    |
 * | sms      | `SMS_PROVIDER`                       | `console`            | `none` (default: SMS off) or `twilio` / `africastalking` |
 * | whatsapp | `WHATSAPP_*` credentials (all four)  | console when unset   | WhatsApp Cloud API (`whatsapp-cloud`)            |
 *
 * Feature flags come first (owner decision 2026-10-07; docs/ARCHITECTURE.md §3.14):
 * - EMAIL: account email (`OutboundMessage.transactional`: verification and sign-in codes, password resets, security
 *   notices, invitations) is ALWAYS sent. Optional email (digests, announcements, receipts, reminders, staff alerts) is
 *   sent only while `features.email` is on.
 * - SMS: only while `features.sms` is on (default off). Nothing in sign-in depends on SMS.
 * - WHATSAPP: only while `features.whatsapp` is on.
 * A message whose channel is switched off is a logged no-op: no adapter is resolved and no provider is contacted (the
 * result says `switchedOff: true`).
 *
 * Real adapters are listed in ./providers.ts. Dev / test may name a real provider too (with its keys): messages are then
 * really sent, so the test suite forces `console` (tests/setup.ts). An unknown name (and `none`) resolves to a fail-loud
 * stub (env.ts refuses unknown names in production; `SMS_PROVIDER=none` is how production says "no SMS provider").
 *
 * A console driver is never returned in production (env.ts refuses the configuration; this resolver refuses it too).
 * WhatsApp: with all four `WHATSAPP_*` keys set, every environment uses the real Cloud API driver
 * (./whatsapp-driver); without them dev / test capture messages in the console outbox and production gets an
 * "unconfigured" adapter whose sends fail loudly (INTERNAL), never a silent console send.
 *
 * Every SMS through a real (paid) adapter first passes the platform SMS budget (./sms-budget.ts, setting
 * `messaging.smsBudget`): allowed country prefixes and a daily cap with a once-a-day SUPER_ADMIN alert.
 */

/** The feature flag that switches each channel (for email: OPTIONAL email only; account email is always on). */
const CHANNEL_FEATURE: Readonly<Record<ChannelName, FeatureName>> = { email: "email", sms: "sms", whatsapp: "whatsapp" };

/**
 * Whether OPTIONAL messages may go on `channel` right now: its feature flag (fail closed: an unreadable flag counts as
 * off). Account email ({@link OutboundMessage.transactional}) does not depend on this: use
 * {@link isMessageSwitchedOn} for a concrete message.
 */
export async function isChannelSwitchedOn(channel: ChannelName): Promise<boolean> {
  return isFeatureEnabled(CHANNEL_FEATURE[channel]);
}

/** True when `message` is always sent whatever the flags say: account email. Pure. */
export function isAlwaysOn(message: Pick<OutboundMessage, "channel" | "transactional">): boolean {
  return message.channel === "email" && message.transactional === true;
}

/** Whether `message` may be sent right now ({@link isAlwaysOn}, otherwise its channel's flag). */
export async function isMessageSwitchedOn(message: Pick<OutboundMessage, "channel" | "transactional">): Promise<boolean> {
  return isAlwaysOn(message) || isChannelSwitchedOn(message.channel);
}

/** Picks the adapter for `channel` from an environment (pure apart from constructing the adapter). */
export function resolveMessagingChannel(channel: ChannelName, env: ServerEnv = getEnv()): MessagingChannel {
  const production = env.NODE_ENV === "production";
  const pick = (provider: string): MessagingChannel => {
    if (provider === "console") {
      if (production) throw new AppError("INTERNAL", `The console ${channel} driver cannot be used in production.`);
      return new ConsoleDriver(channel);
    }
    const adapter = channel === "email" ? emailProviderFromEnv(env) : channel === "sms" ? smsProviderFromEnv(env) : null;
    return adapter ?? new UnconfiguredProvider(channel, provider);
  };
  switch (channel) {
    case "email":
      return pick(env.EMAIL_PROVIDER);
    case "sms":
      return pick(env.SMS_PROVIDER);
    case "whatsapp": {
      const cloud = whatsappDriverFromEnv(env);
      if (cloud) return cloud;
      return production ? new UnconfiguredProvider("whatsapp", "none") : new ConsoleDriver("whatsapp");
    }
  }
}

const channels = new Map<ChannelName, MessagingChannel>();

/** The process-wide adapter for `channel` (resolved once from the environment). */
export function getMessagingChannel(channel: ChannelName): MessagingChannel {
  let adapter = channels.get(channel);
  if (!adapter) {
    adapter = resolveMessagingChannel(channel);
    channels.set(channel, adapter);
  }
  return adapter;
}

/** Overrides the adapter for `channel` (tests); `null` restores environment-based resolution. */
export function setMessagingChannel(channel: ChannelName, adapter: MessagingChannel | null): void {
  if (adapter) channels.set(channel, adapter);
  else channels.delete(channel);
}

const E164 = /^\+[1-9]\d{6,14}$/;
const emailSchema = z.email();

/** Validates a recipient for a channel: an email address for email, an E.164 number for SMS / WhatsApp. */
export function isValidRecipient(channel: ChannelName, to: string): boolean {
  return channel === "email" ? emailSchema.safeParse(to).success : E164.test(to);
}

/** The result of a send that did not happen because the channel is switched off. */
export const SWITCHED_OFF_RESULT: Readonly<SendResult> = Object.freeze({ providerRef: "switched-off", driver: "switched-off", switchedOff: true });

export interface SendOptions {
  /**
   * The caller already read the switch for this message ({@link isMessageSwitchedOn}) and passes the answer, so the
   * send starts without another flag read (one-time codes sent in the background). Omit it to let sendMessage read it.
   */
  channelSwitchedOn?: boolean;
}

/**
 * Sends one message through the configured adapter. While the message's channel is switched off (see the module
 * header: optional email, SMS and WhatsApp each have a flag; account email has none) nothing is sent: the call is
 * logged (tag and channel only, never the recipient or body) and resolves to {@link SWITCHED_OFF_RESULT} without
 * resolving an adapter. Account email reaches its adapter without any extra asynchronous step.
 *
 * @throws AppError BAD_REQUEST for an invalid recipient or empty body, or an SMS to a country outside the budget's
 *         prefixes; RATE_LIMITED when the day's SMS budget is used up; INTERNAL when the provider is not configured.
 */
export async function sendMessage(message: OutboundMessage, options: SendOptions = {}): Promise<SendResult> {
  if (!isValidRecipient(message.channel, message.to)) {
    throw new AppError("BAD_REQUEST", "That address can't receive messages.", { details: { channel: message.channel } });
  }
  if (message.text.trim().length === 0) throw new AppError("BAD_REQUEST", "Message text is empty.");
  if (!isAlwaysOn(message) && !(options.channelSwitchedOn ?? (await isChannelSwitchedOn(message.channel)))) {
    logger.info("messaging: channel is switched off; message not sent", { channel: message.channel, tag: message.tag });
    return { ...SWITCHED_OFF_RESULT };
  }
  const adapter = getMessagingChannel(message.channel);
  // Paid SMS only: the console capture driver (dev and tests) costs nothing.
  if (message.channel === "sms" && adapter.driver !== "console") await assertSmsBudget(message);
  return adapter.send(message);
}
