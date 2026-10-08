import "server-only";
import { z } from "zod";
import { Prisma } from "@/generated/prisma/client";
import { fxRatesSchema } from "@/lib/billing/fx";
import { aiEnabledSchema, aiMarkingMinConfidenceSchema, DEFAULT_MARKING_MIN_CONFIDENCE } from "@/server/ai/config";
import { contentGenerationLimitsSchema, DEFAULT_CONTENT_GENERATION_LIMITS } from "@/server/cms/ai-drafts/limits";
import { db } from "@/server/db";
import { schedulerSettingSchema } from "@/server/flashcards/scheduler-setting";
import { DEFAULT_SMS_BUDGET, smsBudgetSchema } from "@/server/messaging/sms-budget-setting";
import type { XpRulesOverride } from "@/server/gamification/xp";
import { DEFAULT_REFERRAL_RULES, referralRulesSchema } from "@/server/referrals/core";
import { helplinesSettingSchema } from "@/server/tutor/helplines-setting";
import { AUDIT_ACTIONS, auditActorFields, auditInTx, type InfraActor } from "./audit";
import { createCache } from "./cache";
import { AppError } from "./errors";
import { logger } from "./logger";

/**
 * Runtime settings (§36 Settings, §40 admin-configurable quotas): the `Setting` table, edited by SUPER_ADMIN.
 *
 * - Values are JSON validated per key with Zod. Unknown or invalid stored values never crash a request: readers get
 *   the code default and an `error` log (an admin typo must not take the platform down).
 * - Reads are cached per process for {@link SETTINGS_CACHE_TTL_MS} (60 s). A write invalidates the writing instance
 *   immediately; other instances (web nodes, worker) pick it up within the TTL. Do not use settings for anything that
 *   must change everywhere instantly.
 * - Settings NEVER hold secrets (those live in env, ./env.ts).
 * - Every change writes an `AuditLog` entry (`setting.update`) in the same transaction and bumps `version`
 *   (optimistic concurrency for the admin editor).
 */

export const SETTINGS_CACHE_TTL_MS = 60_000;

/** Format enforced by `Setting_key_chk`. */
export const SETTING_KEY_PATTERN = /^[A-Za-z0-9_]+(\.[A-Za-z0-9_]+)*$/;

// ---------------------------------------------------------------------------------------------------------------------
// Schemas for the known keys (shapes mirror prisma/seed/data/platform.ts). Objects are "loose" so fields added by a
// newer release are preserved when an older instance reads them.
// ---------------------------------------------------------------------------------------------------------------------

const positiveInt = z.number().int().positive();
const nonNegativeInt = z.number().int().nonnegative();
const minutesOfDay = z.number().int().min(0).max(1440);

export const AI_MODEL_TIERS = ["FAST", "STANDARD", "DEEP"] as const;
const aiTier = z.enum(AI_MODEL_TIERS);
const aiTierConfig = z.looseObject({ model: z.string().min(1).max(100), effort: z.string().min(1).max(32).optional() });

export const aiRoutingSchema = z.looseObject({
  tiers: z.looseObject({ FAST: aiTierConfig, STANDARD: aiTierConfig, DEEP: aiTierConfig }),
  routes: z.record(z.string().regex(/^[A-Za-z0-9_]+$/), z.looseObject({ tier: aiTier, maxTokens: positiveInt.max(200_000) })),
});
export type AiRoutingSetting = z.output<typeof aiRoutingSchema>;

export const aiLimitsSchema = z.looseObject({
  maxTurnsPerConversation: positiveInt,
  maxInputCharsPerMessage: positiveInt,
  maxImageBytes: positiveInt,
  cacheTtlHours: nonNegativeInt,
});
export type AiLimitsSetting = z.output<typeof aiLimitsSchema>;

export const aiBudgetSchema = z.looseObject({ dailyCostCeilingMicros: nonNegativeInt });
export type AiBudgetSetting = z.output<typeof aiBudgetSchema>;

const xpInt = nonNegativeInt;
/** Partial XP rule overrides; resolve with `resolveXpRules()` from `@/server/gamification/xp`. `null` = code defaults. */
export const xpRulesOverrideSchema = z
  .object({
    questionAnswered: xpInt.optional(),
    correctAnswerByDifficulty: z
      .object({ 1: xpInt.optional(), 2: xpInt.optional(), 3: xpInt.optional(), 4: xpInt.optional(), 5: xpInt.optional() })
      .optional(),
    partialCreditFraction: z.number().min(0).max(1).optional(),
    lessonCompleted: xpInt.optional(),
    flashcardSession: xpInt.optional(),
    flashcardSessionMinCards: xpInt.optional(),
    mockExamCompleted: xpInt.optional(),
    dailyGoalMet: xpInt.optional(),
    weeklyGoalMet: xpInt.optional(),
    streakMilestones: z.record(z.string().regex(/^[1-9]\d*$/), xpInt).optional(),
  })
  .nullable();

export const studyDefaultsSchema = z.looseObject({
  dailyGoalMinutes: minutesOfDay.min(1),
  availability: z.object({
    mon: minutesOfDay,
    tue: minutesOfDay,
    wed: minutesOfDay,
    thu: minutesOfDay,
    fri: minutesOfDay,
    sat: minutesOfDay,
    sun: minutesOfDay,
  }),
});
export type StudyDefaultsSetting = z.output<typeof studyDefaultsSchema>;

/** Per-preset overrides for `src/server/lib/rate-limit.ts` (ARCHITECTURE §5.5: tunable without a deploy). */
export const rateLimitOverridesSchema = z.record(
  z.string().regex(/^[A-Za-z0-9_]+$/),
  z.object({ limit: positiveInt.max(1_000_000), windowSeconds: positiveInt.max(31 * 24 * 3600) }),
);
export type RateLimitOverrides = z.output<typeof rateLimitOverridesSchema>;

export const notificationRetentionSchema = z.object({ days: z.number().int().min(7).max(3650) });

/**
 * `features` (owner decision 2026-10-07, ARCHITECTURE §3.14): one switch per paid / external service, all OFF by
 * default. A missing field reads as off; unknown fields written by a newer release are kept. Read it through
 * `getFeatures()` / `isFeatureEnabled()` in src/server/features.ts (types in src/lib/features.ts).
 */
export const featureFlagsSchema = z.looseObject({
  ai: z.boolean().default(false),
  whatsapp: z.boolean().default(false),
  email: z.boolean().default(false),
  sms: z.boolean().default(false),
  stripe: z.boolean().default(false),
});
export type FeatureFlagsSetting = z.output<typeof featureFlagsSchema>;

/**
 * Registry of known settings with their schema and CODE DEFAULT (used when the row is missing or invalid). The dev
 * seed (prisma/seed/data/platform.ts) writes the initial rows; keep the shapes in sync (a unit test checks this).
 */
export const SETTING_DEFINITIONS = {
  // Owner decision 2026-10-07: AI, WhatsApp, optional email, SMS and Stripe stay dormant (no provider calls) until
  // switched on here. Account email (codes, resets, security notices, invitations) is not behind a flag.
  features: {
    schema: featureFlagsSchema,
    default: { ai: false, whatsapp: false, email: false, sms: false, stripe: false },
    description:
      "Platform feature flags: { ai, whatsapp, email, sms, stripe }. Off = the service is never called and its pages are hidden. `email` covers optional email only (digests, announcements, receipts, reminders); account email is always sent.",
  },
  "ai.enabled": {
    // The gateway's own shape (src/server/ai/config.ts): a boolean, or `{ enabled, features }` for per-feature switches.
    // The gateway fails CLOSED on an invalid stored value; this registry's readers fall back to the default.
    schema: aiEnabledSchema,
    default: true,
    description: "Global AI kill switch.",
  },
  "ai.routing": {
    schema: aiRoutingSchema,
    default: {
      tiers: {
        FAST: { model: "claude-haiku-4-5" },
        STANDARD: { model: "claude-sonnet-5-5", effort: "low" },
        DEEP: { model: "claude-opus-5-5", effort: "medium" },
      },
      routes: {
        intent: { tier: "FAST", maxTokens: 256 },
        tutor: { tier: "STANDARD", maxTokens: 2048 },
        solver: { tier: "STANDARD", maxTokens: 4096 },
        solverHard: { tier: "DEEP", maxTokens: 8192 },
        marking: { tier: "STANDARD", maxTokens: 1024 },
        whatsapp: { tier: "FAST", maxTokens: 512 },
        contentGeneration: { tier: "DEEP", maxTokens: 16000 },
      },
    } satisfies AiRoutingSetting,
    description: "Model per tier and per-route parameters.",
  },
  "ai.limits": {
    schema: aiLimitsSchema,
    default: { maxTurnsPerConversation: 40, maxInputCharsPerMessage: 4000, maxImageBytes: 5_000_000, cacheTtlHours: 168 },
    description: "Hard per-conversation limits independent of plan quotas.",
  },
  "ai.budget": {
    schema: aiBudgetSchema,
    default: { dailyCostCeilingMicros: 50_000_000 },
    description: "Daily platform-wide AI spend ceiling (USD micro-dollars).",
  },
  "ai.marking.minConfidence": {
    schema: aiMarkingMinConfidenceSchema,
    default: DEFAULT_MARKING_MIN_CONFIDENCE,
    description: "AI marks below this confidence go to human review.",
  },
  "ai.contentGeneration": {
    schema: contentGenerationLimitsSchema,
    default: DEFAULT_CONTENT_GENERATION_LIMITS,
    description: "Per-editor daily caps for CMS AI draft generation (jobs, and metered spend in USD micro-dollars; null = no cap).",
  },
  "gamification.xp": {
    schema: xpRulesOverrideSchema,
    default: null,
    description: "XP rule overrides (null = code defaults).",
  },
  "study.defaults": {
    schema: studyDefaultsSchema,
    default: { dailyGoalMinutes: 45, availability: { mon: 60, tue: 60, wed: 60, thu: 60, fri: 45, sat: 90, sun: 45 } },
    description: "Default daily study goal and weekly availability for new students.",
  },
  rateLimits: {
    schema: rateLimitOverridesSchema,
    default: {},
    description: "Rate-limit preset overrides: { [preset]: { limit, windowSeconds } }.",
  },
  "notifications.retention": {
    schema: notificationRetentionSchema,
    default: { days: 180 },
    description: "How long in-app notifications are kept.",
  },
  // §21: parents never see AI conversations unless this switch is on AND the student gave separate consent.
  "privacy.parentAiAccess.enabled": {
    schema: z.boolean(),
    default: false,
    description: "Lets a linked parent read a child's AI tutor conversations where the student has separately consented. Off by default.",
  },
  // §5.12 (src/server/family/consent-gate.ts): WITHDRAWN guardian consent always stops AI processing of a minor's text
  // and photos; this switch also stops it while consent is still PENDING (legal TBC, so off by default).
  "privacy.minorAiConsentRequired": {
    schema: z.boolean(),
    default: false,
    description: "Requires guardian consent before a minor's messages and photos are sent to the AI provider (PENDING consent refused). Withdrawn consent is always refused.",
  },
  // Billing reads these through getSetting with the same bounds (src/server/billing/entitlements.ts, subscriptions.ts).
  "billing.graceDays": {
    schema: z.number().int().min(0).max(60),
    default: 3,
    description: "Days of access kept after a subscription period ends unpaid (PAST_DUE grace).",
  },
  "billing.termMonths": {
    schema: z.number().int().min(1).max(12),
    default: 4,
    description: "Length in months of a TERM billing interval when a price has no explicit periodDays.",
  },
  // Engagement (read with getSetting + the same schema and a safe fallback by their modules).
  "flashcards.scheduler": {
    schema: schedulerSettingSchema,
    default: {},
    description: "Spaced-repetition overrides (§18): newCardsPerDay, learning / relearning steps, intervals, ease. Empty = code defaults.",
  },
  "referrals.rules": {
    schema: referralRulesSchema,
    default: DEFAULT_REFERRAL_RULES,
    description: "Referral programme (§46): on/off, qualifying event, reward plan and days, caps. Switching it off pauses (never rejects) pending referrals.",
  },
  "safety.helplines": {
    schema: helplinesSettingSchema,
    default: [],
    description: "Help contacts shown with a safeguarding reply from the tutor or solver (§6.4). Maintained by platform staff; never hard-coded.",
  },
  // §32 / §35 revenue normalisation (src/lib/billing/fx.ts): never seeded; empty = revenue shown per currency only.
  "fx.rates": {
    schema: fxRatesSchema,
    default: {},
    description: "Exchange rates to USD for revenue reporting: { [currency]: { USD: <dollars per unit>, asOf: YYYY-MM-DD, source? } }. Empty = no USD totals.",
  },
  // AUTH-05 residual (src/server/messaging/sms-budget.ts): toll-fraud guard on every paid SMS send.
  "messaging.smsBudget": {
    schema: smsBudgetSchema,
    default: DEFAULT_SMS_BUDGET,
    description: "Platform SMS budget: { dailyMax: SMS per platform day (null = no cap), allowedCountryPrefixes: E.164 prefixes SMS may go to }.",
  },
} as const satisfies Record<string, { schema: z.ZodType; default: unknown; description: string }>;

export type KnownSettingKey = keyof typeof SETTING_DEFINITIONS;
export type KnownSettingValue<K extends KnownSettingKey> = z.output<(typeof SETTING_DEFINITIONS)[K]["schema"]>;

function isKnownKey(key: string): key is KnownSettingKey {
  return Object.hasOwn(SETTING_DEFINITIONS, key);
}

// ---------------------------------------------------------------------------------------------------------------------
// Reads
// ---------------------------------------------------------------------------------------------------------------------

type CachedSetting = { found: false } | { found: true; value: unknown };

const cache = createCache<string, CachedSetting>({ maxEntries: 1_000, ttlMs: SETTINGS_CACHE_TTL_MS });

function assertKey(key: string): void {
  if (key.length > 128 || !SETTING_KEY_PATTERN.test(key)) {
    throw new AppError("BAD_REQUEST", "Invalid setting key.", { details: { key } });
  }
}

async function loadRaw(key: string): Promise<CachedSetting> {
  const row = await db.setting.findUnique({ where: { key }, select: { value: true } });
  return row ? { found: true, value: row.value } : { found: false };
}

/**
 * Reads a setting, validated with `schema`, from the 60 s in-process cache. Returns `fallback` when the row is missing
 * or its value does not match the schema (logged at `error`, value not logged).
 *
 * @example const enabled = await getSetting("ai.enabled", z.boolean(), true);
 */
export async function getSetting<S extends z.ZodType>(key: string, schema: S, fallback: z.output<S>): Promise<z.output<S>> {
  assertKey(key);
  const cached = await cache.getOrLoad(key, () => loadRaw(key));
  if (!cached.found) return fallback;
  const parsed = schema.safeParse(cached.value);
  if (parsed.success) return parsed.data;
  logger.error("invalid setting value; using code default", {
    key,
    issues: parsed.error.issues.map((issue) => `${issue.path.join(".") || "(root)"}: ${issue.message}`),
  });
  return fallback;
}

/** Reads a registered setting ({@link SETTING_DEFINITIONS}) with its schema and code default. */
export function getKnownSetting<K extends KnownSettingKey>(key: K): Promise<KnownSettingValue<K>> {
  const definition = SETTING_DEFINITIONS[key];
  // Clone the default so a caller mutating its result can never corrupt the shared registry object.
  const fallback = structuredClone(definition.default) as KnownSettingValue<K>;
  const schema = definition.schema as unknown as z.ZodType<KnownSettingValue<K>>;
  return getSetting(key, schema, fallback);
}

/** Uncached read for admin editors: the raw stored value and its version, or `null` when unset. */
export async function readSettingRow(
  key: string,
): Promise<{ key: string; value: unknown; version: number; updatedAt: Date; updatedById: string | null } | null> {
  assertKey(key);
  return db.setting.findUnique({
    where: { key },
    select: { key: true, value: true, version: true, updatedAt: true, updatedById: true },
  });
}

/** Drops one key (or every key) from this instance's settings cache. */
export function invalidateSetting(key?: string): void {
  if (key === undefined) cache.clear();
  else cache.delete(key);
}

// ---- typed accessors for the seeded keys ----

/**
 * `ai.enabled`: global AI kill switch (default true). Per-feature switches stored with it are applied by the AI gateway
 * (`parseAiConfig` in src/server/ai/config.ts), which is authoritative for whether a call may run.
 */
export const getAiEnabled = async (): Promise<boolean> => {
  const value = await getKnownSetting("ai.enabled");
  return typeof value === "boolean" ? value : value.enabled;
};
/** `ai.routing`: model per tier and per-route parameters. */
export const getAiRouting = (): Promise<AiRoutingSetting> => getKnownSetting("ai.routing");
/** `ai.limits`: per-conversation hard limits. */
export const getAiLimits = (): Promise<AiLimitsSetting> => getKnownSetting("ai.limits");
/** `ai.budget`: daily platform-wide AI spend ceiling. */
export const getAiBudget = (): Promise<AiBudgetSetting> => getKnownSetting("ai.budget");
/** `gamification.xp`: XP rule overrides (`null` = code defaults); pass to `resolveXpRules()`. */
export const getXpRulesOverride = async (): Promise<XpRulesOverride | null> => getKnownSetting("gamification.xp");
/** `study.defaults`: default daily goal and weekly availability. */
export const getStudyDefaults = (): Promise<StudyDefaultsSetting> => getKnownSetting("study.defaults");
/** `rateLimits`: per-preset rate-limit overrides. */
export const getRateLimitOverrides = (): Promise<RateLimitOverrides> => getKnownSetting("rateLimits");

// ---------------------------------------------------------------------------------------------------------------------
// Writes
// ---------------------------------------------------------------------------------------------------------------------

export interface SetSettingOptions {
  /** Version the editor loaded; a different stored version raises CONFLICT. Omit for unconditional writes. */
  expectedVersion?: number;
  /** Schema for keys outside {@link SETTING_DEFINITIONS} (registered keys always use their own schema). */
  schema?: z.ZodType;
  description?: string;
  /** Request metadata for the audit entry. */
  request?: { requestId?: string | null; ip?: string | null; userAgent?: string | null };
}

function toJsonInput(value: unknown): Prisma.InputJsonValue | typeof Prisma.JsonNull {
  if (value === null) return Prisma.JsonNull;
  const serialised = JSON.stringify(value);
  if (serialised === undefined) throw AppError.validation({ value: ["Value must be JSON."] });
  return JSON.parse(serialised) as Prisma.InputJsonValue;
}

/**
 * Keys an ADMIN (not only SUPER_ADMIN) may write: the AI kill switch (ARCHITECTURE §5.2: `ai.admin` for ADMIN is
 * "view + kill switch"). Callers still enforce their own permission and step-up checks.
 */
export const ADMIN_WRITABLE_SETTING_KEYS: ReadonlySet<string> = new Set<string>(["ai.enabled"]);

/** Whether `actor` may write `key` through {@link setSetting} (role check only). */
export function canWriteSetting(actor: InfraActor, key: string): boolean {
  if (actor.kind === "system") return true;
  if (actor.roles.includes("SUPER_ADMIN")) return true;
  return actor.roles.includes("ADMIN") && ADMIN_WRITABLE_SETTING_KEYS.has(key);
}

/**
 * Creates or updates a setting. Only SUPER_ADMIN users (or system actors such as seeds/migrations) may write, except
 * the {@link ADMIN_WRITABLE_SETTING_KEYS}, which ADMIN may also write. The value is validated with the key's registered
 * schema (or `options.schema`), the version is bumped, and a `setting.update` audit entry is written in the same
 * transaction. Invalidates this instance's cache.
 *
 * @throws AppError FORBIDDEN | VALIDATION | CONFLICT (stale `expectedVersion` or a concurrent write)
 */
export async function setSetting(
  actor: InfraActor,
  key: string,
  value: unknown,
  options: SetSettingOptions = {},
): Promise<{ key: string; value: unknown; version: number }> {
  if (!canWriteSetting(actor, key)) {
    throw AppError.forbidden("Only a super admin can change platform settings.");
  }
  assertKey(key);
  const schema: z.ZodType | undefined = isKnownKey(key) ? SETTING_DEFINITIONS[key].schema : options.schema;
  let validated: unknown = value;
  if (schema) {
    const parsed = schema.safeParse(value);
    if (!parsed.success) throw AppError.fromZod(parsed.error, "That value is not valid for this setting.");
    validated = parsed.data;
  }
  const jsonValue = toJsonInput(validated);
  const updatedById = actor.kind === "user" ? actor.userId : null;
  const description = options.description ?? (isKnownKey(key) ? SETTING_DEFINITIONS[key].description : undefined);

  const result = await db
    .$transaction(async (tx) => {
      const existing = await tx.setting.findUnique({ where: { key }, select: { value: true, version: true } });
      if (options.expectedVersion !== undefined && (existing?.version ?? 0) !== options.expectedVersion) {
        throw AppError.conflict("This setting was changed by someone else. Reload and try again.");
      }
      let version: number;
      if (existing) {
        const updated = await tx.setting.updateMany({
          where: { key, version: existing.version },
          data: { value: jsonValue, version: existing.version + 1, updatedById, ...(description ? { description } : {}) },
        });
        if (updated.count !== 1) throw AppError.conflict("This setting was changed by someone else. Reload and try again.");
        version = existing.version + 1;
      } else {
        await tx.setting.create({ data: { key, value: jsonValue, version: 1, updatedById, description: description ?? null } });
        version = 1;
      }
      await auditInTx(tx, {
        ...auditActorFields(actor),
        action: AUDIT_ACTIONS.SETTING_UPDATE,
        entityType: "Setting",
        entityId: key,
        before: existing ? { value: existing.value, version: existing.version } : undefined,
        after: { value: validated, version },
        metadata: actor.kind === "system" ? { job: actor.job } : undefined,
        request: options.request ?? null,
      });
      return { key, value: validated, version };
    })
    .catch((error: unknown) => {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
        throw AppError.conflict("This setting was changed by someone else. Reload and try again.");
      }
      throw error;
    });

  invalidateSetting(key);
  return result;
}
