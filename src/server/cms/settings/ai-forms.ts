import { parseUsdToMicros } from "../commerce/money";
import { readDecimal, readFlag, readInt, type FieldErrorMap, type SettingFormResult, type SettingFormValues } from "./forms";

/**
 * Form → value converters for the AI settings editors (/admin/ai/settings; §40 admin-configurable routing, quotas and
 * budget). Pure and isomorphic. The values are then validated with the Zod schemas exported by src/server/ai/config.ts
 * (in ./ai-settings.ts); {@link aiFieldForIssue} maps a schema error path back to the editor field that caused it.
 */

export const AI_TIERS = ["FAST", "STANDARD", "DEEP"] as const;
const ROUTE_FIELD = /^routes\.([A-Za-z][A-Za-z0-9_.-]{0,63})\.tier$/;
const PRICING_FIELD = /^pricing\.(\d{1,2})\.(model|inputPerMTok|outputPerMTok|cacheReadPerMTok|cacheWritePerMTok)$/;

function text(values: SettingFormValues, name: string): string | undefined {
  const value = values[name]?.trim();
  return value === undefined || value === "" ? undefined : value;
}

/** `ai.enabled` kill switch: the global on/off flag. */
export function parseKillSwitchForm(values: SettingFormValues): SettingFormResult {
  return { ok: true, value: readFlag(values, "enabled") };
}

export interface RoutingFormResultExtras {
  /** Model id per submitted pricing row index (maps `pricing.<model>.*` schema errors back to `pricing.<i>.*`). */
  pricingRows: (string | null)[];
}

/**
 * `ai.routing`: tiers (`tiers.<TIER>.model`, `.effort`), routes (`routes.<name>.tier`, `.maxTokens`, `.effort`,
 * `.cacheable`, `.timeoutSeconds`) and optional price overrides per model (`pricing.<i>.model`, `.inputPerMTok`,
 * `.outputPerMTok`, `.cacheReadPerMTok`, `.cacheWritePerMTok`, `.remove`; USD per million tokens). Rows marked
 * `remove` or left completely empty are dropped.
 */
export function parseRoutingForm(values: SettingFormValues): SettingFormResult & RoutingFormResultExtras {
  const errors: FieldErrorMap = {};
  const tiers: Record<string, { model: string | undefined; effort?: string }> = {};
  for (const tier of AI_TIERS) {
    const model = text(values, `tiers.${tier}.model`);
    if (model === undefined) (errors[`tiers.${tier}.model`] ??= []).push("Enter the model id for this tier.");
    const effort = text(values, `tiers.${tier}.effort`);
    tiers[tier] = { model, ...(effort ? { effort } : {}) };
  }

  const routes: Record<string, Record<string, unknown>> = {};
  for (const key of Object.keys(values)) {
    const match = ROUTE_FIELD.exec(key);
    if (!match?.[1]) continue;
    const name = match[1];
    const prefix = `routes.${name}`;
    const maxTokens = readInt(values, `${prefix}.maxTokens`, errors, { required: true });
    const effort = text(values, `${prefix}.effort`);
    const timeoutSeconds = readInt(values, `${prefix}.timeoutSeconds`, errors);
    routes[name] = {
      tier: text(values, `${prefix}.tier`),
      maxTokens,
      cacheable: readFlag(values, `${prefix}.cacheable`),
      ...(effort ? { effort } : {}),
      ...(timeoutSeconds !== undefined ? { timeoutMs: timeoutSeconds * 1000 } : {}),
    };
  }
  if (Object.keys(routes).length === 0) (errors._form ??= []).push("No routes were submitted. Reload the page and try again.");

  const rowIndexes = new Set<number>();
  for (const key of Object.keys(values)) {
    const match = PRICING_FIELD.exec(key);
    if (match?.[1]) rowIndexes.add(Number(match[1]));
  }
  const pricing: Record<string, Record<string, number>> = {};
  const pricingRows: (string | null)[] = [];
  for (const index of [...rowIndexes].sort((a, b) => a - b)) {
    const prefix = `pricing.${index}`;
    const model = text(values, `${prefix}.model`);
    const numbers = ["inputPerMTok", "outputPerMTok", "cacheReadPerMTok", "cacheWritePerMTok"].map((field) => text(values, `${prefix}.${field}`));
    pricingRows[index] = model ?? null;
    if (readFlag(values, `${prefix}.remove`)) continue;
    if (model === undefined) {
      if (numbers.some((value) => value !== undefined)) (errors[`${prefix}.model`] ??= []).push("Enter the model id these prices are for.");
      continue;
    }
    if (pricing[model]) {
      (errors[`${prefix}.model`] ??= []).push("This model already has a price row.");
      continue;
    }
    const input = readDecimal(values, `${prefix}.inputPerMTok`, errors, { required: true });
    const output = readDecimal(values, `${prefix}.outputPerMTok`, errors, { required: true });
    const cacheRead = readDecimal(values, `${prefix}.cacheReadPerMTok`, errors);
    const cacheWrite = readDecimal(values, `${prefix}.cacheWritePerMTok`, errors);
    pricing[model] = {
      ...(input !== undefined ? { inputPerMTok: input } : {}),
      ...(output !== undefined ? { outputPerMTok: output } : {}),
      ...(cacheRead !== undefined ? { cacheReadPerMTok: cacheRead } : {}),
      ...(cacheWrite !== undefined ? { cacheWritePerMTok: cacheWrite } : {}),
    };
  }

  const value = { tiers, routes, ...(Object.keys(pricing).length > 0 ? { pricing } : {}) };
  return Object.keys(errors).length > 0 ? { ok: false, fieldErrors: errors, pricingRows } : { ok: true, value, pricingRows };
}

/** `ai.limits`: per-conversation hard limits. */
export function parseLimitsForm(values: SettingFormValues): SettingFormResult {
  const errors: FieldErrorMap = {};
  const value = {
    maxTurnsPerConversation: readInt(values, "maxTurnsPerConversation", errors, { required: true }),
    maxInputCharsPerMessage: readInt(values, "maxInputCharsPerMessage", errors, { required: true }),
    maxImageBytes: readInt(values, "maxImageBytes", errors, { required: true }),
    cacheTtlHours: readInt(values, "cacheTtlHours", errors, { required: true }),
    maxImagesPerMessage: readInt(values, "maxImagesPerMessage", errors, { required: true }),
    // Per-student AI marking allowance (units per day; empty = no limit); kept only when the editor sent the field.
    ...("markingUnitsPerUserPerDay" in values
      ? { markingUnitsPerUserPerDay: readInt(values, "markingUnitsPerUserPerDay", errors) ?? null }
      : {}),
  };
  return Object.keys(errors).length > 0 ? { ok: false, fieldErrors: errors } : { ok: true, value };
}

/** `ai.budget`: the daily platform-wide ceiling, typed in USD ("50" → 50,000,000 micro-dollars). */
export function parseBudgetForm(values: SettingFormValues): SettingFormResult {
  const raw = text(values, "dailyCostCeilingUsd");
  if (raw === undefined) return { ok: false, fieldErrors: { dailyCostCeilingUsd: ["Enter the daily ceiling in USD."] } };
  const micros = parseUsdToMicros(raw);
  if (micros === null) return { ok: false, fieldErrors: { dailyCostCeilingUsd: ["Enter an amount in USD, like 50 or 12.50."] } };
  return { ok: true, value: { dailyCostCeilingMicros: micros } };
}

/** `ai.marking.minConfidence`: 0-1 (AI marks below it go to human review). */
export function parseMarkingForm(values: SettingFormValues): SettingFormResult {
  const errors: FieldErrorMap = {};
  const value = readDecimal(values, "minConfidence", errors, { required: true });
  return Object.keys(errors).length > 0 ? { ok: false, fieldErrors: errors } : { ok: true, value };
}

/** Maps a schema error path of an AI setting value to the editor field name that produced it. Pure. */
export function aiFieldForIssue(key: string, path: readonly PropertyKey[], pricingRows: readonly (string | null)[] = []): string {
  const parts = path.map((part) => String(part));
  switch (key) {
    case "ai.enabled":
      return "enabled";
    case "ai.budget":
      return "dailyCostCeilingUsd";
    case "ai.marking.minConfidence":
      return "minConfidence";
    case "ai.routing": {
      if (parts[0] === "pricing" && parts[1] !== undefined) {
        const index = pricingRows.indexOf(parts[1]);
        if (index >= 0) return parts.length > 2 ? `pricing.${index}.${parts[2]}` : `pricing.${index}.model`;
      }
      if (parts[0] === "routes" && parts[2] === "timeoutMs") return `routes.${parts[1]}.timeoutSeconds`;
      return parts.length > 0 ? parts.join(".") : "_form";
    }
    default:
      return parts.length > 0 ? parts.join(".") : "_form";
  }
}
