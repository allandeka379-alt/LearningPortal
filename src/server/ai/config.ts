import "server-only";
import { z } from "zod";
import { AiFeature } from "@/generated/prisma/client";
import { AI_MODEL_TIERS, type AiModelTier } from "@/lib/billing/entitlements";
import { db } from "@/server/db";
import { logger as rootLogger, type Logger } from "@/server/lib/logger";
import { EFFORTS, type Effort } from "./models";
import type { PriceTable } from "./pricing";

/**
 * AI runtime configuration (§40 admin-configurable quotas and routing; ARCHITECTURE §6.2, §6.3).
 *
 * Read from `Setting` rows (SUPER_ADMIN-editable, audited). Code ships defaults identical to the seeded values
 * (prisma/seed/data/platform.ts) and uses them per key when a row is missing. A row that fails validation is logged
 * and replaced by the default, except `ai.enabled`, which fails CLOSED (AI off) because a broken kill switch must not
 * silently re-enable AI.
 *
 * NOTE: `src/server/lib/settings.ts` (generic typed settings registry, built in parallel) may replace the loader below;
 * {@link parseAiConfig} stays the single source of the AI setting shapes either way.
 */

export const AI_SETTING_KEYS = ["ai.enabled", "ai.routing", "ai.limits", "ai.budget", "ai.marking.minConfidence"] as const;
export type AiSettingKey = (typeof AI_SETTING_KEYS)[number];

const MODEL_ID = z
  .string()
  .regex(/^[a-z0-9][a-z0-9.@-]{2,63}$/, { error: "must be an exact API model id, e.g. claude-sonnet-5-5" });

const ROUTE_NAME = z.string().regex(/^[a-zA-Z][a-zA-Z0-9_.-]{0,63}$/, { error: "invalid route name" });

export const aiTierConfigSchema = z.object({
  model: MODEL_ID,
  /** Ignored for models that do not accept `output_config.effort` (Haiku 4.5). */
  effort: z.enum(EFFORTS).optional(),
});

export const aiRouteConfigSchema = z.object({
  tier: z.enum(AI_MODEL_TIERS),
  /** Output cap (includes thinking tokens on models that think). */
  maxTokens: z.number().int().min(16).max(128_000),
  /** Per-route effort override (e.g. `medium` for marking on STANDARD). */
  effort: z.enum(EFFORTS).optional(),
  /** Generic answers on this route may be served from / written to AiResponseCache (§6.3 step 6). */
  cacheable: z.boolean().default(false),
  /** Per-call timeout passed to the SDK (it retries twice on top). */
  timeoutMs: z.number().int().min(1_000).max(600_000).optional(),
});

export const aiPriceOverrideSchema = z.object({
  inputPerMTok: z.number().min(0).max(1_000),
  outputPerMTok: z.number().min(0).max(1_000),
  cacheReadPerMTok: z.number().min(0).max(1_000).optional(),
  cacheWritePerMTok: z.number().min(0).max(1_000).optional(),
});

export const aiRoutingSchema = z.object({
  tiers: z.object({
    FAST: aiTierConfigSchema,
    STANDARD: aiTierConfigSchema,
    DEEP: aiTierConfigSchema,
  }),
  routes: z.record(ROUTE_NAME, aiRouteConfigSchema),
  /** Price overrides keyed by model id (USD per MTok); see pricing.ts for the defaults. */
  pricing: z.record(MODEL_ID, aiPriceOverrideSchema).optional(),
});

/** `ai.enabled`: a boolean (seeded) or `{ enabled, features: { TUTOR: false, ... } }` for per-feature switches. */
export const aiEnabledSchema = z.union([
  z.boolean(),
  z.object({ enabled: z.boolean(), features: z.partialRecord(z.enum(AiFeature), z.boolean()).optional() }),
]);

/** Default per-student daily AI marking allowance (units; see `aiLimitsSchema.markingUnitsPerUserPerDay`). */
export const DEFAULT_MARKING_UNITS_PER_USER_PER_DAY = 200;

export const aiLimitsSchema = z.object({
  maxTurnsPerConversation: z.number().int().min(1).max(10_000),
  maxInputCharsPerMessage: z.number().int().min(1).max(200_000),
  maxImageBytes: z.number().int().min(1).max(20_000_000),
  /** Response-cache entry lifetime; 0 disables the response cache. */
  cacheTtlHours: z.number().min(0).max(24 * 365),
  /** One image per message (ARCHITECTURE §6.3 step 3). */
  maxImagesPerMessage: z.number().int().min(0).max(4).default(1),
  /**
   * AI marking units one student's answers may use per local day (AI-04): 1 unit per started 3,000 characters of the
   * answer, at most 10 per answer (`markingQuotaCost`). Over it, answers go to human review instead of the model, so
   * one account cannot spend the platform's daily AI budget. null = no per-student cap.
   */
  markingUnitsPerUserPerDay: z.number().int().min(0).max(1_000_000).nullable().default(DEFAULT_MARKING_UNITS_PER_USER_PER_DAY),
});

export const aiBudgetSchema = z.object({
  /** Platform-wide daily spend ceiling (USD micro-dollars, Africa/Harare day); null = no ceiling. */
  dailyCostCeilingMicros: z.number().int().min(0).nullable(),
});

export const aiMarkingMinConfidenceSchema = z.number().min(0).max(1);

export type AiTierConfig = z.output<typeof aiTierConfigSchema>;
export type AiRouteConfig = z.output<typeof aiRouteConfigSchema>;
export type AiRouting = z.output<typeof aiRoutingSchema>;
export type AiLimits = z.output<typeof aiLimitsSchema>;

export interface AiConfig {
  /** Global kill switch (Setting `ai.enabled`). */
  enabled: boolean;
  /** Per-feature switches; a feature absent here follows `enabled`. */
  features: Partial<Record<AiFeature, boolean>>;
  routing: {
    tiers: Record<AiModelTier, AiTierConfig>;
    routes: Record<string, AiRouteConfig>;
    pricing: PriceTable;
  };
  limits: AiLimits;
  budget: { dailyCostCeilingMicros: number | null };
  marking: { minConfidence: number };
}

/** Defaults identical to the seeded Setting rows (plus `markingEssay`, ARCHITECTURE §6.5 DEEP essay marking). */
export const DEFAULT_AI_ROUTING: AiRouting = {
  tiers: {
    FAST: { model: "claude-haiku-4-5" },
    STANDARD: { model: "claude-sonnet-5-5", effort: "low" },
    DEEP: { model: "claude-opus-5-5", effort: "medium" },
  },
  routes: {
    intent: { tier: "FAST", maxTokens: 256, cacheable: false },
    tutor: { tier: "STANDARD", maxTokens: 2048, cacheable: false },
    solver: { tier: "STANDARD", maxTokens: 4096, cacheable: false },
    solverHard: { tier: "DEEP", maxTokens: 8192, cacheable: false },
    marking: { tier: "STANDARD", maxTokens: 1024, cacheable: false },
    markingEssay: { tier: "DEEP", maxTokens: 3000, cacheable: false },
    whatsapp: { tier: "FAST", maxTokens: 512, cacheable: false },
    contentGeneration: { tier: "DEEP", maxTokens: 16000, cacheable: false },
  },
};

export const DEFAULT_AI_LIMITS: AiLimits = {
  maxTurnsPerConversation: 40,
  maxInputCharsPerMessage: 4000,
  maxImageBytes: 5_000_000,
  cacheTtlHours: 168,
  maxImagesPerMessage: 1,
  markingUnitsPerUserPerDay: DEFAULT_MARKING_UNITS_PER_USER_PER_DAY,
};

export const DEFAULT_DAILY_COST_CEILING_MICROS = 50_000_000;
export const DEFAULT_MARKING_MIN_CONFIDENCE = 0.75;

export const DEFAULT_AI_CONFIG: AiConfig = {
  enabled: true,
  features: {},
  routing: { tiers: DEFAULT_AI_ROUTING.tiers, routes: DEFAULT_AI_ROUTING.routes, pricing: {} },
  limits: DEFAULT_AI_LIMITS,
  budget: { dailyCostCeilingMicros: DEFAULT_DAILY_COST_CEILING_MICROS },
  marking: { minConfidence: DEFAULT_MARKING_MIN_CONFIDENCE },
};

export interface SettingRow {
  key: string;
  value: unknown;
}

export interface AiConfigIssue {
  key: AiSettingKey;
  message: string;
}

function describe(error: z.ZodError): string {
  return error.issues
    .slice(0, 5)
    .map((issue) => `${issue.path.map(String).join(".") || "(root)"}: ${issue.message}`)
    .join("; ");
}

/**
 * Builds the AI config from Setting rows. Pure. Missing keys (or JSON null) use the defaults; invalid values are
 * reported in `issues` and replaced by defaults, except `ai.enabled`, which fails closed.
 */
export function parseAiConfig(rows: readonly SettingRow[]): { config: AiConfig; issues: AiConfigIssue[] } {
  const values = new Map<string, unknown>();
  for (const row of rows) {
    if (row.value !== null && row.value !== undefined) values.set(row.key, row.value);
  }
  const issues: AiConfigIssue[] = [];

  let enabled = DEFAULT_AI_CONFIG.enabled;
  let features: AiConfig["features"] = {};
  if (values.has("ai.enabled")) {
    const parsed = aiEnabledSchema.safeParse(values.get("ai.enabled"));
    if (!parsed.success) {
      issues.push({ key: "ai.enabled", message: `invalid, AI disabled (fail closed): ${describe(parsed.error)}` });
      enabled = false;
    } else if (typeof parsed.data === "boolean") {
      enabled = parsed.data;
    } else {
      enabled = parsed.data.enabled;
      features = { ...parsed.data.features };
    }
  }

  let routing = DEFAULT_AI_ROUTING;
  if (values.has("ai.routing")) {
    const parsed = aiRoutingSchema.safeParse(values.get("ai.routing"));
    if (parsed.success) routing = parsed.data;
    else issues.push({ key: "ai.routing", message: `invalid, using defaults: ${describe(parsed.error)}` });
  }

  let limits = DEFAULT_AI_LIMITS;
  if (values.has("ai.limits")) {
    const parsed = aiLimitsSchema.safeParse(values.get("ai.limits"));
    if (parsed.success) limits = parsed.data;
    else issues.push({ key: "ai.limits", message: `invalid, using defaults: ${describe(parsed.error)}` });
  }

  let dailyCostCeilingMicros: number | null = DEFAULT_DAILY_COST_CEILING_MICROS;
  if (values.has("ai.budget")) {
    const parsed = aiBudgetSchema.safeParse(values.get("ai.budget"));
    if (parsed.success) dailyCostCeilingMicros = parsed.data.dailyCostCeilingMicros;
    else issues.push({ key: "ai.budget", message: `invalid, using defaults: ${describe(parsed.error)}` });
  }

  let minConfidence = DEFAULT_MARKING_MIN_CONFIDENCE;
  if (values.has("ai.marking.minConfidence")) {
    const parsed = aiMarkingMinConfidenceSchema.safeParse(values.get("ai.marking.minConfidence"));
    if (parsed.success) minConfidence = parsed.data;
    else issues.push({ key: "ai.marking.minConfidence", message: `invalid, using default: ${describe(parsed.error)}` });
  }

  return {
    config: {
      enabled,
      features,
      routing: {
        tiers: routing.tiers,
        // Code-defined routes stay available until an admin overrides them; the setting wins per route.
        routes: { ...DEFAULT_AI_ROUTING.routes, ...routing.routes },
        pricing: routing.pricing ?? {},
      },
      limits,
      budget: { dailyCostCeilingMicros },
      marking: { minConfidence },
    },
    issues,
  };
}

/** Whether `feature` may call the model right now (global switch AND per-feature switch). */
export function isFeatureEnabled(config: AiConfig, feature: AiFeature): boolean {
  return config.enabled && config.features[feature] !== false;
}

/** The route's configuration; throws for an unknown route (a programming error, surfaced as INTERNAL). */
export function resolveRoute(config: AiConfig, route: string): AiRouteConfig {
  const found = Object.hasOwn(config.routing.routes, route) ? config.routing.routes[route] : undefined;
  if (!found) throw new Error(`Unknown AI route "${route}" (configure it in Setting ai.routing.routes)`);
  return found;
}

/** The effective effort for a route on a tier (route override, then tier); `null` means "family default". */
export function configuredEffort(config: AiConfig, route: AiRouteConfig, tier: AiModelTier): Effort | null {
  return route.effort ?? config.routing.tiers[tier].effort ?? null;
}

// ---------------------------------------------------------------------------------------------------------------
// Loader (DB-backed, tiny in-process cache)
// ---------------------------------------------------------------------------------------------------------------

export const AI_CONFIG_CACHE_MS = 60_000;

let cache: { config: AiConfig; expiresAt: number } | null = null;

export interface LoadAiConfigOptions {
  /** Defaults to reading `Setting` with the shared Prisma client. */
  readSettings?: (keys: readonly string[]) => Promise<SettingRow[]>;
  now?: () => number;
  logger?: Logger;
  /** Skip the 60 s cache (admin "test settings" screens). */
  fresh?: boolean;
}

async function readSettingsFromDb(keys: readonly string[]): Promise<SettingRow[]> {
  return db.setting.findMany({ where: { key: { in: [...keys] } }, select: { key: true, value: true } });
}

/**
 * Loads the AI config from `Setting`, cached in-process for 60 s (admin changes apply within a minute on every node).
 */
export async function loadAiConfig(options: LoadAiConfigOptions = {}): Promise<AiConfig> {
  const now = options.now ?? Date.now;
  if (!options.fresh && cache && cache.expiresAt > now()) return cache.config;
  const rows = await (options.readSettings ?? readSettingsFromDb)(AI_SETTING_KEYS);
  const { config, issues } = parseAiConfig(rows);
  const log = (options.logger ?? rootLogger).child({ module: "ai.config" });
  for (const issue of issues) log.error("Invalid AI setting", { settingKey: issue.key, problem: issue.message });
  cache = { config, expiresAt: now() + AI_CONFIG_CACHE_MS };
  return config;
}

/** Clears the loader cache (tests, and after an admin saves an AI setting on this node). */
export function resetAiConfigCache(): void {
  cache = null;
}
