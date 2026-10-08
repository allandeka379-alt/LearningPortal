import "server-only";
import type { z } from "zod";
import { RATE_LIMIT_PRESETS } from "@/server/lib/rate-limit";
import { getKnownSetting, SETTING_DEFINITIONS, type KnownSettingKey } from "@/server/lib/settings";

/**
 * The platform settings editable from /admin/settings (§36 Settings; SUPER_ADMIN `settings.manage`). AI settings
 * (`ai.*`) have their own page (/admin/ai/settings, ./ai-settings.ts).
 *
 * Each entry names its typed editor, a description shown next to it, the Zod schema that validates the value and the
 * code default used when the row is missing. Schema and default always come from the shared registry
 * (`SETTING_DEFINITIONS`, src/server/lib/settings.ts) via {@link registered}, so the editor, the seed and every reader
 * agree; `setSetting` re-validates with the same registry schema on write.
 *
 * Settings never hold secrets (env only); every write is audited (`setting.update`) by `setSetting`.
 */

/** §21: parents never see AI conversations unless this platform switch is on AND the student gave separate consent. */
export const PARENT_AI_ACCESS_SETTING = "privacy.parentAiAccess.enabled" satisfies KnownSettingKey;

export const PLATFORM_SETTING_GROUPS = ["Features", "Learning", "Privacy", "Billing", "Platform"] as const;
export type PlatformSettingGroup = (typeof PLATFORM_SETTING_GROUPS)[number];

export type PlatformSettingEditor =
  | "features"
  | "boolean"
  | "integer"
  | "studyDefaults"
  | "xp"
  | "rateLimits"
  | "retentionDays"
  | "fxRates"
  | "smsBudget";

/** The feature-flags setting (src/lib/features.ts). Saving it also revalidates the public pages whose copy depends on it. */
export const FEATURES_SETTING = "features" satisfies KnownSettingKey;

/** Statically generated public pages whose copy depends on the feature flags (revalidated when the flags are saved). */
export const FEATURE_DEPENDENT_PATHS: readonly string[] = ["/", "/pricing", "/about", "/schools", "/faq"];

export interface PlatformSettingDefinition {
  key: string;
  label: string;
  description: string;
  group: PlatformSettingGroup;
  editor: PlatformSettingEditor;
  schema: z.ZodType;
  default: unknown;
  /** `integer` editor bounds and unit. */
  min?: number;
  max?: number;
  unit?: string;
  /** Labels of a `boolean` editor's two states. */
  onLabel?: string;
  offLabel?: string;
  /** Extra guidance under the editor. */
  help?: string;
}

/** Key, schema and code default of a registered setting. */
function registered(key: KnownSettingKey): Pick<PlatformSettingDefinition, "key" | "schema" | "default"> {
  const definition = SETTING_DEFINITIONS[key];
  return { key, schema: definition.schema, default: definition.default };
}

export const PLATFORM_SETTINGS: readonly PlatformSettingDefinition[] = [
  {
    // Owner decision 2026-10-07 (ARCHITECTURE §3.14): every flag defaults to off.
    ...registered(FEATURES_SETTING),
    label: "Optional features",
    description:
      "Services that cost money or depend on an outside provider. While a feature is off its provider is never called, and its pages, menu entries and marketing copy are hidden. Nothing is deleted: switching it back on restores it.",
    group: "Features",
    editor: "features",
    help: "Check the provider account, keys and budget before switching a feature on. Changes apply on this server at once and everywhere within a minute.",
  },
  {
    ...registered("study.defaults"),
    label: "Study defaults",
    description: "Daily study goal and weekly availability given to new students before they set their own.",
    group: "Learning",
    editor: "studyDefaults",
    help: "Minutes per day (0-1440). Students can change their own goal and availability at any time.",
  },
  {
    ...registered("gamification.xp"),
    label: "XP rules",
    description: "Experience points awarded per study event. Empty fields use the built-in defaults.",
    group: "Learning",
    editor: "xp",
    help: "XP rewards effort, not talent: keep answer XP small and completion XP steady. Changes apply to new events only.",
  },
  {
    ...registered(PARENT_AI_ACCESS_SETTING),
    label: "Parent access to AI conversations",
    description:
      "Lets a linked parent read a child's AI tutor conversations, only where the student has separately consented. Off by default; when off, no parent can read any conversation.",
    group: "Privacy",
    editor: "boolean",
    onLabel: "Allowed with the student's consent",
    offLabel: "Off: parents never see AI conversations",
    help: "Teachers and school admins never see AI conversations, whatever this switch says.",
  },
  {
    ...registered("privacy.minorAiConsentRequired"),
    label: "Guardian consent before AI help for minors",
    description:
      "When on, a student under 18 can use the AI tutor and solver only after a parent or guardian has given consent. When off, only a withdrawn consent blocks AI help.",
    group: "Privacy",
    editor: "boolean",
    onLabel: "Required: pending consent blocks AI help",
    offLabel: "Not required: only withdrawn consent blocks AI help",
    help: "AI help sends the student's messages and photos to the AI provider abroad. Confirm the legal requirement before changing this.",
  },
  {
    ...registered("billing.graceDays"),
    label: "Grace period after a missed renewal",
    description: "Days a subscriber keeps access after the paid period ends without a renewal payment.",
    group: "Billing",
    editor: "integer",
    min: 0,
    max: 60,
    unit: "days",
  },
  {
    ...registered("billing.termMonths"),
    label: "School term length",
    description: "Months in a TERM billing interval when a price does not set its own period in days.",
    group: "Billing",
    editor: "integer",
    min: 1,
    max: 12,
    unit: "months",
  },
  {
    ...registered("fx.rates"),
    label: "Exchange rates for revenue reports",
    description:
      "US dollars per one unit of each other currency you are paid in, with the date the rate applies to. Analytics then add a USD-equivalent total next to the per-currency revenue, labelled with this date. Leave empty to report each currency on its own.",
    group: "Billing",
    editor: "fxRates",
    help: "One rate per currency is applied to the whole reporting range (not each payment's date). Never enter a rate you have not checked against its source.",
  },
  {
    ...registered("notifications.retention"),
    label: "In-app notification retention",
    description: "How long in-app notifications are kept before the nightly purge deletes them.",
    group: "Platform",
    editor: "retentionDays",
    min: 7,
    max: 3650,
    unit: "days",
  },
  {
    ...registered("messaging.smsBudget"),
    label: "SMS budget",
    description:
      "Protects against SMS toll fraud while SMS is switched on (Optional features): text messages (opt-in notifications, invitations to a phone number) go only to the listed country prefixes, and at most the daily maximum are sent per day (Africa/Harare). When the maximum is reached, SMS stop until midnight and every super admin is alerted once.",
    group: "Platform",
    editor: "smsBudget",
    help: "Every SMS costs money. Add a country only when you expect users there; raise the maximum for real growth, not for a sudden spike (that is often SMS pumping).",
  },
  {
    ...registered("rateLimits"),
    label: "Rate limits",
    description: "Overrides for the built-in request limits (sign-in, codes, AI messages, uploads, checkout…).",
    group: "Platform",
    editor: "rateLimits",
    help: "Leave a row empty to keep the built-in limit. Lower limits protect against abuse; higher ones help busy schools.",
  },
];

export function findPlatformSetting(key: string): PlatformSettingDefinition | undefined {
  return PLATFORM_SETTINGS.find((definition) => definition.key === key);
}

/** True when `key` is validated by the shared registry (setSetting then re-validates with that schema). */
export function isRegisteredSetting(key: string): boolean {
  return Object.hasOwn(SETTING_DEFINITIONS, key);
}

/** Built-in rate-limit presets the `rateLimits` editor lists (name → default rule). */
export function rateLimitPresetDefaults(): Readonly<Record<string, { limit: number; windowSeconds: number }>> {
  return RATE_LIMIT_PRESETS;
}

/** Plain-language names for the rate-limit presets (UI copy). Unknown presets show their key. */
export const RATE_LIMIT_LABELS: Readonly<Record<string, string>> = {
  login: "Password sign-in attempts (per IP and account)",
  loginIp: "Sign-in and code attempts per IP address (all accounts)",
  otpSendTarget: "Codes sent to one email address",
  otpSendTargetDaily: "Codes sent to one email address per day",
  otpSendIp: "Codes requested from one IP address",
  otpVerify: "Attempts to enter one code",
  apiOtpVerify: "App code entries per IP address and email address",
  register: "Registrations from one IP address",
  aiMessage: "AI messages per student",
  publicSearch: "Public searches per IP address",
  dailyQuestionAnon: "Anonymous daily-question answers per IP address",
  publicApi: "API calls per signed-in user",
  whatsappInbound: "WhatsApp messages per phone number",
  whatsappOutbound: "WhatsApp messages sent to one phone number",
  webhookReceipt: "Webhook deliveries per IP address",
  uploads: "File uploads per user",
  checkout: "Checkout starts per user",
  billingReturnPoll: "Payment status checks per IP address",
  paymentWebhookRejected: "Rejected payment callbacks stored per provider and IP",
  lessonProgress: "Lesson progress updates per student",
  studyPlanGenerate: "Study-plan generations per student",
  adminContactSend: "Staff messages to one person (resets, reminders, invitations)",
  adminContactSendDaily: "Staff messages to one person per day",
  contentFlag: "Problem reports per user",
  familyCodeIssue: "Parent-link codes created per user",
  familyCodeRedeem: "Parent-link code attempts per user",
  familyCodeRedeemDaily: "Parent-link code attempts per user per day",
  familyCodeRedeemIp: "Parent-link code attempts per IP address",
  familyLinkRequest: "Parent link requests sent per parent",
  familyLinkRequestDaily: "Parent link requests sent per parent per day",
  familyPaymentPoll: "Parent payment status checks",
  classJoin: "Class join-code attempts per student",
  classInviteTarget: "Class invitations to one phone or email",
  classInviteSender: "Class invitations sent per teacher",
  schoolInvite: "School invitations sent per admin",
  schoolRosterValidate: "Roster file checks per school admin",
  schoolRosterCommit: "Roster import steps per school admin",
  schoolPasswordReset: "Student password resets per school admin",
  schoolPasswordResetBulk: "Bulk password resets per school admin",
  schoolReportRequest: "Report requests per school",
  schoolPlanRequest: "Plan change requests per school",
  flashcardWrite: "Personal flashcards saved per user",
  shareCreate: "Share links created per user",
  referralLanding: "Referral link visits per IP address",
  aiConversationCreate: "New AI tutor conversations per user",
  whatsappIntentDaily: "WhatsApp free-text messages routed by AI per user per day",
  currentPassword: "Current-password checks per user (password change, re-authentication)",
  attemptStart: "Practice sessions, tests and exams started per student",
  answerSubmit: "Answers saved or submitted per student",
};

/**
 * `privacy.parentAiAccess.enabled` (default OFF). The parent AI-conversation path (`withAiScope("parent", …)`) must
 * check this before opening a conversation for a parent, in addition to the database policy's per-student consent.
 */
export function getParentAiAccessEnabled(): Promise<boolean> {
  return getKnownSetting(PARENT_AI_ACCESS_SETTING);
}
