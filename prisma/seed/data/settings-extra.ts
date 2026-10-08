import { DEFAULT_REFERRAL_RULES } from "@/server/referrals/core";

/**
 * Setting rows not listed in `platform.ts` (extension file). Values mirror the code defaults in
 * src/server/lib/settings.ts (SETTING_DEFINITIONS); the seed validates every known key against its schema.
 */
export const EXTRA_SETTINGS: { key: string; description: string; value: unknown }[] = [
  {
    // Owner decision 2026-10-07: AI, WhatsApp, optional email, SMS and Stripe are dormant in EVERY environment until a
    // super admin switches them on in /admin/settings (docs/ARCHITECTURE.md §3.14). Account email (verification codes,
    // password resets, security notices, invitations) is always sent and is not a flag. The seed only creates missing
    // rows, so a database that already has the row keeps its value (a flag missing from it reads as off).
    key: "features",
    description:
      "Platform feature flags: { ai, whatsapp, email, sms, stripe }. Off = the service is never called and its pages, menu entries and copy are hidden. `email` covers optional email only (digests, announcements, receipts, reminders); account email is always sent.",
    value: { ai: false, whatsapp: false, email: false, sms: false, stripe: false },
  },
  {
    key: "rateLimits",
    description: "Rate-limit preset overrides: { [preset]: { limit, windowSeconds } }. Empty = code defaults.",
    value: {},
  },
  {
    key: "notifications.retention",
    description: "How long in-app notifications are kept, in days.",
    value: { days: 180 },
  },
  {
    key: "billing.graceDays",
    description: "Days of access kept after a subscription period ends unpaid (PAST_DUE grace).",
    value: 3,
  },
  {
    key: "billing.termMonths",
    description: "Length in months of a TERM billing interval when a price has no explicit periodDays.",
    value: 4,
  },
  {
    key: "privacy.parentAiAccess.enabled",
    description:
      "Lets a linked parent read a child's AI tutor conversations, only where the student has separately consented (§21). Off by default; teachers and school admins never see AI conversations.",
    value: false,
  },
  {
    key: "flashcards.scheduler",
    description: "Spaced-repetition overrides (§18). Empty = code defaults (20 new cards a day, SM-2 style steps).",
    value: {},
  },
  {
    key: "referrals.rules",
    description:
      "Referral programme (§46): on/off, qualifying event, reward plan and days, caps. Switching it off pauses pending referrals; they qualify normally once it is back on.",
    value: DEFAULT_REFERRAL_RULES,
  },
  {
    // Shown with a safeguarding reply (tutor, solver). Verify the numbers with the organisation before launch.
    key: "safety.helplines",
    description: "Help contacts shown with a safeguarding reply from the AI tutor or solver. Maintained by platform staff.",
    value: [
      {
        name: "Childline Zimbabwe",
        phone: "116",
        url: "https://childline.org.zw",
        description: "Free, confidential help for children and young people, any time.",
      },
    ],
  },
  {
    key: "ai.contentGeneration",
    description:
      "Per-editor daily caps for CMS AI draft generation: jobs per Africa/Harare day and metered spend in USD micro-dollars (null = no spend cap).",
    value: { editorDailyJobs: 20, editorDailyCostMicros: 5_000_000 },
  },
];
