import "server-only";
import { randomUUID } from "node:crypto";
import { isProd } from "@/server/lib/env";
import { logger as rootLogger, type Logger } from "@/server/lib/logger";
import type { ChannelName, MessagingChannel, OutboundMessage, SendResult } from "./types";

/**
 * Development / test messaging driver. It sends nothing: it logs ONE redacted line (channel, tag, masked recipient,
 * length — never the body, so OTP codes never reach logs) and keeps the last {@link DEV_OUTBOX_CAPACITY} messages in
 * memory, where tests and the dev tools can read them with {@link getDevOutbox} (e.g. to complete an OTP login).
 *
 * Production never uses it: `env.ts` refuses `EMAIL_PROVIDER` / `SMS_PROVIDER = console` in production, the resolver
 * refuses it again, and {@link getDevOutbox} throws in production.
 */

export const DEV_OUTBOX_CAPACITY = 50;

export interface DevOutboxMessage {
  id: string;
  channel: ChannelName;
  to: string;
  subject: string | null;
  text: string;
  tag: string;
  sentAt: Date;
}

// On globalThis so the outbox survives Next.js dev hot reloads (module re-evaluation) within one process.
const globalOutbox = globalThis as unknown as { __dzDevOutbox?: DevOutboxMessage[] };

function outbox(): DevOutboxMessage[] {
  globalOutbox.__dzDevOutbox ??= [];
  return globalOutbox.__dzDevOutbox;
}

/** Masks a recipient for logs: `t***@example.test`, `+26377***67`. */
export function maskRecipient(to: string): string {
  const at = to.indexOf("@");
  if (at > 0) return `${to[0]}***${to.slice(at)}`;
  if (to.length > 7) return `${to.slice(0, 6)}***${to.slice(-2)}`;
  return "***";
}

export class ConsoleDriver implements MessagingChannel {
  readonly driver = "console";
  readonly channel: ChannelName;
  readonly #logger: Logger;

  constructor(channel: ChannelName, options: { logger?: Logger } = {}) {
    this.channel = channel;
    this.#logger = options.logger ?? rootLogger;
  }

  async send(message: OutboundMessage): Promise<SendResult> {
    const id = `console-${randomUUID()}`;
    const box = outbox();
    box.push({
      id,
      channel: this.channel,
      to: message.to,
      subject: message.subject ?? null,
      text: message.text,
      tag: message.tag,
      sentAt: new Date(),
    });
    if (box.length > DEV_OUTBOX_CAPACITY) box.splice(0, box.length - DEV_OUTBOX_CAPACITY);
    this.#logger.info("message captured by console driver (not sent)", {
      channel: this.channel,
      tag: message.tag,
      recipient: maskRecipient(message.to),
      chars: message.text.length,
      sensitive: message.sensitive ?? false,
      outboxId: id,
    });
    return { providerRef: id, driver: this.driver };
  }
}

/**
 * Messages captured by the console driver in this process, newest first, optionally filtered by recipient / channel.
 *
 * @throws Error in production.
 */
export function getDevOutbox(filter: { to?: string; channel?: ChannelName } = {}): DevOutboxMessage[] {
  if (isProd()) throw new Error("The dev outbox is not available in production.");
  return outbox()
    .filter((message) => (filter.to === undefined || message.to === filter.to) && (filter.channel === undefined || message.channel === filter.channel))
    .reverse()
    .map((message) => ({ ...message }));
}

/** The most recent captured message to `to` (tests: read the OTP just sent). */
export function latestDevMessage(to: string, channel?: ChannelName): DevOutboxMessage | null {
  return getDevOutbox({ to, ...(channel ? { channel } : {}) })[0] ?? null;
}

/** Empties the dev outbox. */
export function clearDevOutbox(): void {
  outbox().length = 0;
}
