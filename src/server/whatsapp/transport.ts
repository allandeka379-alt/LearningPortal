import "server-only";
import { isProd } from "@/server/lib/env";
import { getMessagingChannel, type SendResult } from "@/server/messaging";
import { whatsappDriverFromEnv, type WhatsAppSendRequest } from "@/server/messaging/whatsapp-driver";
import { requestAsText } from "./messages";

/**
 * How the outbound job reaches WhatsApp:
 * - production / configured: the Cloud API driver (`src/server/messaging/whatsapp-driver.ts`);
 * - development and tests without credentials: the console messaging driver (nothing is sent; the dev outbox captures
 *   a text rendering, buttons as `[Title]`);
 * - production without credentials: `null` (messages are marked FAILED, never silently dropped).
 * Tests replace it with {@link setWhatsAppTransport} (e.g. the Cloud API driver over a mocked `fetch`).
 */

export interface WhatsAppTransport {
  readonly driver: string;
  send(to: string, request: WhatsAppSendRequest, tag: string): Promise<SendResult>;
}

let override: WhatsAppTransport | null = null;
let resolved: WhatsAppTransport | null | undefined;

export function setWhatsAppTransport(transport: WhatsAppTransport | null): void {
  override = transport;
  resolved = undefined;
}

function consoleTransport(): WhatsAppTransport {
  return {
    driver: "console",
    send: (to, request, tag) => getMessagingChannel("whatsapp").send({ channel: "whatsapp", to, text: requestAsText(request), tag }),
  };
}

export function getWhatsAppTransport(): WhatsAppTransport | null {
  if (override) return override;
  if (resolved !== undefined) return resolved;
  const driver = whatsappDriverFromEnv();
  resolved = driver ? { driver: driver.driver, send: (to, request, tag) => driver.sendRequest(to, request, tag) } : isProd() ? null : consoleTransport();
  return resolved;
}
