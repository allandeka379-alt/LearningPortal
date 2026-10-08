import "server-only";
import { getEnv, type ServerEnv } from "@/server/lib/env";
import { resolveGraphVersion, whatsappCloudConfigured } from "@/server/messaging/whatsapp-driver";

/**
 * WhatsApp channel configuration (§30, ARCHITECTURE §8), from the environment contract (`src/server/lib/env.ts`):
 * `WHATSAPP_VERIFY_TOKEN` (webhook handshake), `WHATSAPP_APP_SECRET` (webhook signatures), `WHATSAPP_ACCESS_TOKEN` and
 * `WHATSAPP_PHONE_NUMBER_ID` (sending). env.ts requires all four together. `WHATSAPP_GRAPH_VERSION` is optional.
 */

export interface WhatsAppConfig {
  verifyToken: string;
  appSecret: string;
  accessToken: string;
  phoneNumberId: string;
  graphVersion: string;
}

/** The configuration, or `null` when WhatsApp is not configured on this server. */
export function whatsappConfigFromEnv(env: ServerEnv = getEnv()): WhatsAppConfig | null {
  if (!whatsappCloudConfigured(env)) return null;
  return {
    verifyToken: env.WHATSAPP_VERIFY_TOKEN as string,
    appSecret: env.WHATSAPP_APP_SECRET as string,
    accessToken: env.WHATSAPP_ACCESS_TOKEN as string,
    phoneNumberId: (env.WHATSAPP_PHONE_NUMBER_ID as string).trim(),
    graphVersion: resolveGraphVersion(env.WHATSAPP_GRAPH_VERSION),
  };
}

/**
 * Whether students can link a number on this server: the Cloud API is configured, or (outside production) the console
 * messaging driver captures the messages for development and tests.
 */
export function whatsappChannelAvailable(env: ServerEnv = getEnv()): boolean {
  return whatsappCloudConfigured(env) || env.NODE_ENV !== "production";
}
