import { DEFAULT_OTP_TEMPLATE } from "@/server/messaging/whatsapp-driver";

/**
 * Approved WhatsApp message templates (ARCHITECTURE §8: outside the 24-hour window only templates may be sent).
 *
 * Every template here MUST be created and approved in Meta Business Manager (WhatsApp Manager → Message templates) with
 * exactly this name, language and number of body variables before go-live; Meta bills each template conversation by
 * category. docs/WHATSAPP.md lists the suggested wording. The text below is what the operator registers; the code only
 * sends the name, language and parameters.
 */

export interface WhatsAppTemplateDefinition {
  name: string;
  language: string;
  category: "AUTHENTICATION" | "UTILITY" | "MARKETING";
  /** Number of `{{n}}` body variables, in order. */
  bodyParams: number;
  /** Authentication templates: the code is also the dynamic suffix of the copy-code / URL button. */
  codeButton?: boolean;
  /** Suggested registered wording (documentation; Meta stores the real text). */
  suggestedBody: string;
}

export const WHATSAPP_TEMPLATES = {
  /** One-time code to link a number (sent by `issueOtp` through the messaging adapter). */
  linkCode: {
    name: DEFAULT_OTP_TEMPLATE.name,
    language: DEFAULT_OTP_TEMPLATE.language,
    category: "AUTHENTICATION",
    bodyParams: 1,
    codeButton: true,
    suggestedBody: "{{1}} is your verification code. For your security, do not share this code.",
  },
  /** Proactive reminder that today's daily question is ready (opted-in users only). */
  dailyQuestionReady: {
    name: "daily_question_ready",
    language: "en",
    category: "UTILITY",
    bodyParams: 1,
    suggestedBody: "Your daily {{1}} question is ready. Reply QUESTION to get it, or STOP to stop reminders.",
  },
  /** Proactive streak reminder (opted-in users only). */
  streakReminder: {
    name: "streak_reminder",
    language: "en",
    category: "UTILITY",
    bodyParams: 1,
    suggestedBody: "You're on a {{1}}-day study streak. Reply QUESTION to keep it going today, or STOP to stop reminders.",
  },
} as const satisfies Record<string, WhatsAppTemplateDefinition>;

export type WhatsAppTemplateKey = keyof typeof WHATSAPP_TEMPLATES;

export const WHATSAPP_TEMPLATE_KEYS = Object.keys(WHATSAPP_TEMPLATES) as WhatsAppTemplateKey[];
