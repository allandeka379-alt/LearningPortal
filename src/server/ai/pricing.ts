/**
 * AI cost metering (§40 token tracking; ARCHITECTURE §6.7). Pure: no I/O.
 *
 * Prices are USD per million tokens. The defaults below seed behaviour only; admins override them with the optional
 * `pricing` table of Setting `ai.routing` (so metering survives price changes without a deploy).
 *
 * Cost is computed in integer nano-dollars per token (1 USD/MTok = 1 micro-dollar per token = 1,000 nano-dollars per
 * token), summed exactly, then rounded UP to whole micro-dollars (the unit of every `costMicros` column), so the spend
 * guard never under-counts.
 */

export interface ModelPrice {
  /** Uncached input tokens. */
  inputPerMTok: number;
  outputPerMTok: number;
  /** Prompt-cache reads (~0.1x input). */
  cacheReadPerMTok: number;
  /** 5-minute prompt-cache writes (1.25x input). */
  cacheWritePerMTok: number;
}

/** Token counts of one call, as reported by the API (`input_tokens` excludes cached tokens). */
export interface TokenUsage {
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens: number;
  cacheWriteTokens: number;
}

export const ZERO_USAGE: Readonly<TokenUsage> = Object.freeze({
  inputTokens: 0,
  outputTokens: 0,
  cacheReadTokens: 0,
  cacheWriteTokens: 0,
});

/** Partial override as stored in Setting `ai.routing.pricing` (cache prices default to 0.1x / 1.25x input). */
export interface ModelPriceOverride {
  inputPerMTok: number;
  outputPerMTok: number;
  cacheReadPerMTok?: number | undefined;
  cacheWritePerMTok?: number | undefined;
}

export type PriceTable = Readonly<Record<string, ModelPriceOverride>>;

/**
 * Default first-party API prices (2026-10). The three routed models plus the models Anthropic's server-side refusal
 * fallback can hand a turn to (`fallbacks: "default"`), which bill at their own rates.
 */
export const DEFAULT_MODEL_PRICES: Readonly<Record<string, ModelPrice>> = Object.freeze({
  "claude-haiku-4-5": { inputPerMTok: 1, outputPerMTok: 5, cacheReadPerMTok: 0.1, cacheWritePerMTok: 1.25 },
  "claude-sonnet-5-5": { inputPerMTok: 2, outputPerMTok: 10, cacheReadPerMTok: 0.2, cacheWritePerMTok: 2.5 },
  "claude-opus-5-5": { inputPerMTok: 4, outputPerMTok: 20, cacheReadPerMTok: 0.2, cacheWritePerMTok: 5 },
  // Refusal-fallback targets.
  "claude-sonnet-5": { inputPerMTok: 2, outputPerMTok: 10, cacheReadPerMTok: 0.2, cacheWritePerMTok: 2.5 },
  "claude-opus-5": { inputPerMTok: 5, outputPerMTok: 25, cacheReadPerMTok: 0.5, cacheWritePerMTok: 6.25 },
  "claude-opus-4-8": { inputPerMTok: 5, outputPerMTok: 25, cacheReadPerMTok: 0.5, cacheWritePerMTok: 6.25 },
});

/**
 * Price used for a model that is in neither table: the most expensive known rate per component, so an unpriced model
 * can only over-count spend (the budget guard stays safe) and is logged by the caller.
 */
export const UNKNOWN_MODEL_PRICE: Readonly<ModelPrice> = Object.freeze({
  inputPerMTok: 5,
  outputPerMTok: 25,
  cacheReadPerMTok: 0.5,
  cacheWritePerMTok: 6.25,
});

const CACHE_READ_FACTOR = 0.1;
const CACHE_WRITE_FACTOR = 1.25;

function completePrice(override: ModelPriceOverride): ModelPrice {
  return {
    inputPerMTok: override.inputPerMTok,
    outputPerMTok: override.outputPerMTok,
    cacheReadPerMTok: override.cacheReadPerMTok ?? override.inputPerMTok * CACHE_READ_FACTOR,
    cacheWritePerMTok: override.cacheWritePerMTok ?? override.inputPerMTok * CACHE_WRITE_FACTOR,
  };
}

/** Longest table key that `model` equals or starts with followed by `-` (dated snapshot ids). */
function lookup<T>(table: Readonly<Record<string, T>>, model: string): T | undefined {
  if (Object.hasOwn(table, model)) return table[model];
  let best: string | undefined;
  for (const key of Object.keys(table)) {
    if (model.startsWith(`${key}-`) && (best === undefined || key.length > best.length)) best = key;
  }
  return best === undefined ? undefined : table[best];
}

export interface ResolvedPrice {
  price: ModelPrice;
  /** False when the conservative {@link UNKNOWN_MODEL_PRICE} was used. */
  known: boolean;
}

/** Admin overrides first, then the defaults, then the conservative unknown-model price. */
export function resolveModelPrice(model: string, overrides: PriceTable = {}): ResolvedPrice {
  const override = lookup(overrides, model);
  if (override) return { price: completePrice(override), known: true };
  const builtIn = lookup(DEFAULT_MODEL_PRICES, model);
  if (builtIn) return { price: builtIn, known: true };
  return { price: UNKNOWN_MODEL_PRICE, known: false };
}

function nanosPerToken(perMTok: number): number {
  if (!Number.isFinite(perMTok) || perMTok < 0) throw new RangeError(`Invalid price ${String(perMTok)} per MTok`);
  return Math.round(perMTok * 1000);
}

function assertCount(name: string, value: number): void {
  if (!Number.isInteger(value) || value < 0) throw new RangeError(`${name} must be a non-negative integer`);
}

/**
 * Cost of `usage` on `model` in USD micro-dollars (integer, rounded up), including prompt-cache reads and writes.
 *
 * @example costMicros("claude-sonnet-5-5", { inputTokens: 1000, outputTokens: 500, cacheReadTokens: 0, cacheWriteTokens: 0 })
 *          // 1000 x $2 + 500 x $10 per MTok = $0.007 = 7000 micro-dollars
 */
export function costMicros(model: string, usage: TokenUsage, overrides: PriceTable = {}): number {
  assertCount("inputTokens", usage.inputTokens);
  assertCount("outputTokens", usage.outputTokens);
  assertCount("cacheReadTokens", usage.cacheReadTokens);
  assertCount("cacheWriteTokens", usage.cacheWriteTokens);
  const { price } = resolveModelPrice(model, overrides);
  const nanos =
    usage.inputTokens * nanosPerToken(price.inputPerMTok) +
    usage.outputTokens * nanosPerToken(price.outputPerMTok) +
    usage.cacheReadTokens * nanosPerToken(price.cacheReadPerMTok) +
    usage.cacheWriteTokens * nanosPerToken(price.cacheWritePerMTok);
  return Math.ceil(nanos / 1000);
}

/** Component-wise sum of token usages. */
export function addUsage(a: TokenUsage, b: TokenUsage): TokenUsage {
  return {
    inputTokens: a.inputTokens + b.inputTokens,
    outputTokens: a.outputTokens + b.outputTokens,
    cacheReadTokens: a.cacheReadTokens + b.cacheReadTokens,
    cacheWriteTokens: a.cacheWriteTokens + b.cacheWriteTokens,
  };
}
