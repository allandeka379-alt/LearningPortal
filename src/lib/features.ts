/**
 * Platform feature flags (owner decision 2026-10-07; docs/ARCHITECTURE.md §3.14). Isomorphic and dependency-free so
 * client components can import the TYPES; the values are read on the server (`getFeatures()` in
 * src/server/features.ts, Setting `features`, 60 s cache) and handed to client components as props. Clients never
 * fetch flags themselves.
 *
 * Every flag switches a service that costs money or talks to an outside provider. Each defaults to OFF: while a flag is
 * off, no code path may call that provider for it, and the routes, menu entries and copy that advertise it are hidden.
 * Turning a flag back on (SUPER_ADMIN, /admin/settings, step-up + audit) restores the feature without a deploy;
 * nothing is deleted while it is off.
 *
 * Accounts are email-based: account email (verification codes, password resets, security notices, invitations) is
 * ALWAYS sent and is deliberately not behind a flag, because signing in depends on it. `email` only covers OPTIONAL
 * email (notification digests, announcements, receipts, reminders, staff alerts).
 */

export const FEATURE_NAMES = ["ai", "whatsapp", "email", "sms", "stripe"] as const;
export type FeatureName = (typeof FEATURE_NAMES)[number];

/** The resolved flags: one boolean per {@link FEATURE_NAMES} entry. */
export type FeatureFlags = Readonly<Record<FeatureName, boolean>>;

/** Code defaults (and the seeded value in every environment): everything off. */
export const DEFAULT_FEATURE_FLAGS: FeatureFlags = Object.freeze({ ai: false, whatsapp: false, email: false, sms: false, stripe: false });

/** Admin-facing names and what switching each flag on means (UI copy for /admin/settings). */
export const FEATURE_LABELS: Readonly<Record<FeatureName, { label: string; description: string }>> = {
  ai: {
    label: "AI features",
    description:
      "AI tutor, question solver, AI marking of written answers and AI content drafts. Off: no AI provider is called, the pages return 404 and written answers are self-marked against the mark scheme or marked by a teacher.",
  },
  whatsapp: {
    label: "WhatsApp channel",
    description: "Study by WhatsApp (daily question, reminders, linking). Off: nothing is sent to or accepted from WhatsApp.",
  },
  email: {
    label: "Optional email",
    description:
      "Non-essential email: notification digests, announcements, receipts, reminders and staff alerts. Off: these stay in the app only. Account email (sign-up and sign-in codes, password resets, security notices and invitations) is always sent and is not affected by this switch.",
  },
  sms: {
    label: "SMS text messages",
    description:
      "Text messages to phone numbers (opt-in notifications, invitations to a phone number). Off: no SMS provider is called. Accounts never depend on SMS: sign-in and password resets use email, and a phone number is optional profile data that is never verified.",
  },
  stripe: {
    label: "Stripe card payments",
    description: "Card checkout through Stripe. Off: payments go through Paynow (EcoCash, OneMoney and cards via Paynow).",
  },
};

/** Normalises any stored value to {@link FeatureFlags}: only a literal `true` switches a flag on (fail closed). */
export function toFeatureFlags(value: unknown): FeatureFlags {
  const record = typeof value === "object" && value !== null ? (value as Record<string, unknown>) : {};
  return Object.freeze({
    ai: record.ai === true,
    whatsapp: record.whatsapp === true,
    email: record.email === true,
    sms: record.sms === true,
    stripe: record.stripe === true,
  });
}
