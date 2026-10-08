import "server-only";
import { z } from "zod";
import type { AiFeature } from "@/generated/prisma/client";
import { DEFAULT_TIMEZONE } from "@/lib/config";
import { dateColumnFromLocalDate, localDateString, type LocalDate } from "@/lib/dates";
import {
  aiBudgetSchema,
  aiEnabledSchema,
  aiLimitsSchema,
  aiMarkingMinConfidenceSchema,
  aiRoutingSchema,
  DEFAULT_AI_LIMITS,
  DEFAULT_AI_ROUTING,
  DEFAULT_DAILY_COST_CEILING_MICROS,
  DEFAULT_MARKING_MIN_CONFIDENCE,
  loadAiConfig,
  parseAiConfig,
  resetAiConfigCache,
  type AiConfig,
  type AiConfigIssue,
} from "@/server/ai/config";
import { EFFORTS, modelFamily } from "@/server/ai/models";
import { DEFAULT_MODEL_PRICES, UNKNOWN_MODEL_PRICE, type ModelPrice } from "@/server/ai/pricing";
import { hasPermission } from "@/server/auth/permissions";
import { db } from "@/server/db";
import type { AuditRequestInfo } from "@/server/lib/audit";
import { getEnv } from "@/server/lib/env";
import { AppError } from "@/server/lib/errors";
import { setSetting } from "@/server/lib/settings";
import { assertCmsPermission, infraActor, type CmsActor } from "../users/access";
import { aiFieldForIssue } from "./ai-forms";
import { readSettingRows, type SettingRowView } from "./service";

/**
 * AI configuration administration (/admin/ai/settings; §40 AI cost control, ARCHITECTURE §6.2-6.3, §5.2 `ai.admin`:
 * ADMIN views and operates the kill switch, SUPER_ADMIN edits everything). Values are validated with the Zod schemas exported by src/server/ai/config.ts (the
 * gateway's own parser), then written with `setSetting` (version check, audit, cache drop) and the gateway's 60 s
 * config cache on this instance is reset with `resetAiConfigCache()`. Other instances pick changes up within 60 s.
 *
 * Secrets never appear: the page only learns whether ANTHROPIC_API_KEY is configured (a boolean).
 *
 * Note: `ai.enabled` is edited here as the global boolean. The gateway and the shared settings registry also accept
 * `{ enabled, features }` for per-feature switches (shown read-only here; saving the global switch replaces them).
 */

export const AI_EDITABLE_KEYS = ["ai.enabled", "ai.routing", "ai.limits", "ai.budget", "ai.marking.minConfidence"] as const;
export type AiEditableKey = (typeof AI_EDITABLE_KEYS)[number];

/** What each key may hold when written from the admin (stricter than what readers tolerate). */
const WRITE_SCHEMAS: Readonly<Record<AiEditableKey, z.ZodType>> = {
  "ai.enabled": z.boolean({ error: "Choose on or off." }),
  "ai.routing": aiRoutingSchema,
  "ai.limits": aiLimitsSchema,
  // The registry requires a number (no "no ceiling" null) so a typo can never remove the spend guard.
  "ai.budget": aiBudgetSchema.extend({ dailyCostCeilingMicros: z.number().int().min(0, { error: "Use 0 or more." }) }),
  "ai.marking.minConfidence": aiMarkingMinConfidenceSchema,
};

/** Read-side definitions (what readers accept) with the gateway defaults. */
const READ_DEFINITIONS: readonly { key: AiEditableKey; schema: z.ZodType; default: unknown }[] = [
  { key: "ai.enabled", schema: aiEnabledSchema, default: true },
  { key: "ai.routing", schema: aiRoutingSchema, default: DEFAULT_AI_ROUTING },
  { key: "ai.limits", schema: aiLimitsSchema, default: DEFAULT_AI_LIMITS },
  { key: "ai.budget", schema: aiBudgetSchema, default: { dailyCostCeilingMicros: DEFAULT_DAILY_COST_CEILING_MICROS } },
  { key: "ai.marking.minConfidence", schema: aiMarkingMinConfidenceSchema, default: DEFAULT_MARKING_MIN_CONFIDENCE },
];

/** Keys ADMIN (`ai.admin` "restricted") may change: the kill switch (ARCHITECTURE §5.2 "view + kill switch"). */
export const AI_ADMIN_EDITABLE_KEYS: ReadonlySet<AiEditableKey> = new Set<AiEditableKey>(["ai.enabled"]);

/** Minimum `ai.admin` scope needed to change `key`. */
export function aiSettingWriteScope(key: AiEditableKey): "restricted" | "all" {
  return AI_ADMIN_EDITABLE_KEYS.has(key) ? "restricted" : "all";
}

/** Keys whose change needs a recent password confirmation (kill switch, spend ceiling). */
export const AI_STEP_UP_KEYS: ReadonlySet<AiEditableKey> = new Set<AiEditableKey>(["ai.enabled", "ai.budget"]);

export function isAiEditableKey(key: string): key is AiEditableKey {
  return (AI_EDITABLE_KEYS as readonly string[]).includes(key);
}

export interface TierModelView {
  tier: "FAST" | "STANDARD" | "DEEP";
  model: string;
  effort: string | null;
  /** Request family detected from the id; "unknown" means requests are sent without effort or fallbacks. */
  family: string;
  supportsEffort: boolean;
  price: ModelPrice;
  priceSource: "override" | "default" | "unknown";
}

export interface AiSettingsOverview {
  /** SUPER_ADMIN (ai.admin "all"): may change every setting. */
  canEdit: boolean;
  /** ADMIN or SUPER_ADMIN: may operate the kill switch (`ai.enabled`). */
  canEditKillSwitch: boolean;
  /** Whether ANTHROPIC_API_KEY is set on this server (never the key). */
  apiKeyConfigured: boolean;
  /** The configuration the gateway uses now (defaults for missing rows; `ai.enabled` fails closed when invalid). */
  config: AiConfig;
  issues: AiConfigIssue[];
  rows: Record<AiEditableKey, SettingRowView>;
  /** Per-feature switches stored in `ai.enabled` (read-only here). */
  featureSwitches: Partial<Record<AiFeature, boolean>>;
  platformDate: LocalDate;
  todaySpendMicros: number;
  tierModels: TierModelView[];
  efforts: readonly string[];
  routeNames: string[];
}

function priceFor(model: string, overrides: AiConfig["routing"]["pricing"]): Pick<TierModelView, "price" | "priceSource"> {
  const override = overrides[model];
  if (override) {
    return {
      priceSource: "override",
      price: {
        inputPerMTok: override.inputPerMTok,
        outputPerMTok: override.outputPerMTok,
        cacheReadPerMTok: override.cacheReadPerMTok ?? override.inputPerMTok * 0.1,
        cacheWritePerMTok: override.cacheWritePerMTok ?? override.inputPerMTok * 1.25,
      },
    };
  }
  const known = DEFAULT_MODEL_PRICES[model];
  return known ? { priceSource: "default", price: known } : { priceSource: "unknown", price: UNKNOWN_MODEL_PRICE };
}

/** Sum of today's spend shards (Africa/Harare platform day). */
export async function platformSpendMicros(date: LocalDate): Promise<number> {
  const result = await db.aiSpendDaily.aggregate({ where: { date: dateColumnFromLocalDate(date) }, _sum: { costMicros: true } });
  return Number(result._sum.costMicros ?? 0n);
}

/** Everything the AI settings page shows. `ai.admin` at any scope (ADMIN views, SUPER_ADMIN edits). */
export async function getAiSettingsOverview(actor: CmsActor, now: Date = new Date()): Promise<AiSettingsOverview> {
  assertCmsPermission(actor, "ai.admin", "restricted");
  const rows = await readSettingRows(READ_DEFINITIONS);
  const stored = [...rows.entries()].filter(([, row]) => row.isStored).map(([key, row]) => ({ key, value: row.storedValue }));
  const { config, issues } = parseAiConfig(stored);
  const platformDate = localDateString(now, DEFAULT_TIMEZONE);
  const todaySpendMicros = await platformSpendMicros(platformDate);
  const tierModels: TierModelView[] = (["FAST", "STANDARD", "DEEP"] as const).map((tier) => {
    const { model, effort } = config.routing.tiers[tier];
    const family = modelFamily(model);
    return { tier, model, effort: effort ?? null, family: family.id, supportsEffort: family.supportsEffort, ...priceFor(model, config.routing.pricing) };
  });
  const rowRecord = Object.fromEntries(AI_EDITABLE_KEYS.map((key) => [key, rows.get(key)])) as Record<AiEditableKey, SettingRowView>;
  return {
    canEdit: hasPermission(actor, "ai.admin", "all"),
    canEditKillSwitch: hasPermission(actor, "ai.admin", aiSettingWriteScope("ai.enabled")),
    apiKeyConfigured: Boolean(getEnv().ANTHROPIC_API_KEY?.trim()),
    config,
    issues,
    rows: rowRecord,
    featureSwitches: config.features,
    platformDate,
    todaySpendMicros,
    tierModels,
    efforts: EFFORTS,
    routeNames: Object.keys(config.routing.routes).sort(),
  };
}

export interface UpdateAiSettingOptions {
  /** Model ids per pricing row of the routing editor (maps price errors to the right row). */
  pricingRows?: readonly (string | null)[];
}

/**
 * Saves one AI setting (SUPER_ADMIN; ADMIN only the kill switch, {@link AI_ADMIN_EDITABLE_KEYS}). Validates with the gateway schema, writes through `setSetting` (version check,
 * `setting.update` audit), then resets the gateway config cache on this instance.
 *
 * @throws AppError FORBIDDEN | BAD_REQUEST (unknown key) | VALIDATION (field errors named after the editor fields) |
 *         CONFLICT (stale version)
 */
export async function updateAiSetting(
  actor: CmsActor,
  input: { key: string; value: unknown; expectedVersion: number | string },
  request: AuditRequestInfo | null = null,
  options: UpdateAiSettingOptions = {},
): Promise<{ key: AiEditableKey; version: number; value: unknown }> {
  assertCmsPermission(actor, "ai.admin", "restricted");
  const key = input.key;
  if (!isAiEditableKey(key)) throw new AppError("BAD_REQUEST", "Unknown AI setting.");
  assertCmsPermission(actor, "ai.admin", aiSettingWriteScope(key));
  const expectedVersion = Number(input.expectedVersion);
  if (!Number.isInteger(expectedVersion) || expectedVersion < 0) throw AppError.conflict("This form is out of date. Reload the page and try again.");
  const parsed = WRITE_SCHEMAS[key].safeParse(input.value);
  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const field = aiFieldForIssue(key, issue.path, options.pricingRows);
      const messages = (fieldErrors[field] ??= []);
      if (!messages.includes(issue.message)) messages.push(issue.message);
    }
    throw AppError.validation(fieldErrors, "Some values are not valid.");
  }
  const written = await setSetting(infraActor(actor), key, parsed.data, {
    expectedVersion,
    request: request ?? undefined,
  });
  resetAiConfigCache();
  // Warm the cache from the database so this instance serves the new value at once.
  await loadAiConfig({ fresh: true });
  return { key, version: written.version, value: written.value };
}
