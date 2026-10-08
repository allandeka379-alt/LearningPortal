/**
 * The WhatsApp channel (§30; ARCHITECTURE §8, docs/WHATSAPP.md). Server-only.
 *
 * - Webhook: `handleVerification(url)` (GET handshake), `handleWebhookPost(request)` (signature, dedupe, store, enqueue)
 * - Linking (Settings → WhatsApp): `getWhatsAppLinkStatus`, `requestWhatsAppLinkCode`, `confirmWhatsAppLink`,
 *   `unlinkWhatsApp`, `setWhatsAppReminders`
 * - Worker: `registerWhatsAppJobs()` -> `whatsapp.process`, `whatsapp.send`, `whatsapp.purge`
 * - Other modules: `queueProactiveWhatsApp(userId, draft)` for reminders (24-hour window / template / opt-out rules)
 */
export { handleVerification, handleWebhookPost, WHATSAPP_PROCESS_JOB, type WebhookHttpResult } from "./inbound";
export {
  confirmLinkSchema,
  confirmWhatsAppLink,
  getWhatsAppLinkStatus,
  requestLinkCodeSchema,
  requestWhatsAppLinkCode,
  setWhatsAppReminders,
  unlinkWhatsApp,
  type WhatsAppLinkStatus,
} from "./identity";
export { queueProactiveWhatsApp, WHATSAPP_SEND_JOB, type OutboundDraft } from "./outbound";
export { purgeWhatsAppData, registerWhatsAppJobs, WHATSAPP_PURGE_JOB } from "./jobs";
export { processInboundMessage } from "./router";
export { WHATSAPP_TEMPLATES, type WhatsAppTemplateKey } from "./templates";
export { whatsappChannelAvailable } from "./config";
