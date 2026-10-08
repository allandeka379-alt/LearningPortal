/**
 * Model families and the request rules each one needs (ARCHITECTURE §6.2, §6.3 step 9).
 *
 * Model ids come from Setting `ai.routing` (admin-editable), so request shaping is keyed on the model FAMILY detected
 * from the id, never on a tier name. Rules (verified against the Anthropic API for these models):
 *
 * | Family     | Surface              | `thinking`        | `output_config.effort`         | Refusal fallbacks          |
 * |------------|----------------------|-------------------|--------------------------------|----------------------------|
 * | haiku-4-5  | `client.messages`    | omitted (off)     | NOT sent (unsupported, 400)    | none                       |
 * | sonnet-5-5 | `client.beta.messages` | omitted (adaptive) | sent (default `low` for chat) | `fallbacks: "default"`     |
 * | opus-5-5   | `client.beta.messages` | omitted: thinking cannot be disabled and `budget_tokens` is a 400 | sent (default `medium`) | `fallbacks: "default"` |
 * | unknown    | `client.messages`    | omitted           | not sent                       | none                       |
 *
 * No family ever gets an assistant prefill or a forced `tool_choice` (both 400 on the 5.5 models); JSON output uses
 * structured outputs (`output_config.format`).
 *
 * Pure module: no I/O.
 */

export const EFFORTS = ["low", "medium", "high", "xhigh", "max"] as const;
export type Effort = (typeof EFFORTS)[number];

/** Beta flag for the scalar `fallbacks: "default"` form (the array form uses a different, older flag). */
export const SERVER_SIDE_FALLBACK_BETA = "server-side-fallback-2026-07-01";

export type ModelFamilyId = "haiku-4-5" | "sonnet-5-5" | "opus-5-5" | "unknown";

export interface ModelFamily {
  id: ModelFamilyId;
  /** Which SDK namespace the request goes through. */
  surface: "messages" | "beta";
  /** `output_config.effort` is accepted. */
  supportsEffort: boolean;
  /** Effort used when neither the route nor the tier configures one (always sent explicitly where supported). */
  defaultEffort: Effort | null;
  /** Server-side refusal fallbacks (`fallbacks: "default"` + beta flag). */
  supportsServerFallback: boolean;
  /** Minimum cacheable prefix in tokens; shorter prefixes silently do not cache (ARCHITECTURE §6.3 step 8). */
  minCacheablePrefixTokens: number;
}

const FAMILIES: Readonly<Record<ModelFamilyId, ModelFamily>> = {
  "haiku-4-5": {
    id: "haiku-4-5",
    surface: "messages",
    supportsEffort: false,
    defaultEffort: null,
    supportsServerFallback: false,
    minCacheablePrefixTokens: 4096,
  },
  "sonnet-5-5": {
    id: "sonnet-5-5",
    surface: "beta",
    supportsEffort: true,
    // API default is `high`; chat routes want `low` (ARCHITECTURE §6.2), so it is always sent explicitly.
    defaultEffort: "low",
    supportsServerFallback: true,
    minCacheablePrefixTokens: 512,
  },
  "opus-5-5": {
    id: "opus-5-5",
    surface: "beta",
    supportsEffort: true,
    defaultEffort: "medium",
    supportsServerFallback: true,
    minCacheablePrefixTokens: 512,
  },
  unknown: {
    id: "unknown",
    surface: "messages",
    supportsEffort: false,
    defaultEffort: null,
    supportsServerFallback: false,
    minCacheablePrefixTokens: 4096,
  },
};

/** Exact ids plus optional dated-snapshot suffixes (e.g. `claude-haiku-4-5-20251001`). */
const FAMILY_PATTERNS: ReadonlyArray<readonly [RegExp, ModelFamilyId]> = [
  [/^claude-haiku-4-5(?:-\d{8})?$/, "haiku-4-5"],
  [/^claude-sonnet-5-5(?:-\d{8})?$/, "sonnet-5-5"],
  [/^claude-opus-5-5(?:-\d{8})?$/, "opus-5-5"],
];

/**
 * Detects the request family of a model id. Unknown ids get the most conservative shape (no effort, no thinking, no
 * fallbacks), which every Messages API model accepts.
 */
export function modelFamily(model: string): ModelFamily {
  for (const [pattern, id] of FAMILY_PATTERNS) {
    if (pattern.test(model)) return FAMILIES[id];
  }
  return FAMILIES.unknown;
}
