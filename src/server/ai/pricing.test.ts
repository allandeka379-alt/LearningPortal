import { describe, expect, it } from "vitest";
import { addUsage, costMicros, DEFAULT_MODEL_PRICES, resolveModelPrice, UNKNOWN_MODEL_PRICE, ZERO_USAGE } from "./pricing";

const usage = (inputTokens: number, outputTokens: number, cacheReadTokens = 0, cacheWriteTokens = 0) => ({
  inputTokens,
  outputTokens,
  cacheReadTokens,
  cacheWriteTokens,
});

describe("costMicros", () => {
  it("prices input and output per model (USD per MTok = micro-dollars per token)", () => {
    expect(costMicros("claude-haiku-4-5", usage(1000, 500))).toBe(1000 * 1 + 500 * 5);
    expect(costMicros("claude-sonnet-5-5", usage(1000, 500))).toBe(1000 * 2 + 500 * 10);
    expect(costMicros("claude-opus-5-5", usage(1000, 500))).toBe(1000 * 4 + 500 * 20);
  });

  it("includes prompt-cache reads (~0.1x) and 5-minute writes (1.25x)", () => {
    // Sonnet 5.5: 2000 cached reads x $0.20 + 400 writes x $2.50 + 1000 in x $2 + 500 out x $10.
    expect(costMicros("claude-sonnet-5-5", usage(1000, 500, 2000, 400))).toBe(400 + 1000 + 2000 + 5000);
    // Opus 5.5 reads at $0.20, writes at $5.
    expect(costMicros("claude-opus-5-5", usage(0, 0, 10_000, 1_000))).toBe(2000 + 5000);
    // Haiku reads at $0.10.
    expect(costMicros("claude-haiku-4-5", usage(0, 0, 10, 0))).toBe(1);
  });

  it("matches the ARCHITECTURE §6.7 warm tutor turn on Sonnet 5.5 ($0.0069)", () => {
    expect(costMicros("claude-sonnet-5-5", usage(0, 500, 3000, 500))).toBe(6850);
  });

  it("rounds fractional micro-dollars UP so the budget guard never under-counts", () => {
    // 3 cache-read tokens on Haiku = 0.3 micro-dollars.
    expect(costMicros("claude-haiku-4-5", usage(0, 0, 3, 0))).toBe(1);
    expect(costMicros("claude-haiku-4-5", ZERO_USAGE)).toBe(0);
  });

  it("applies admin price overrides, deriving missing cache prices from the input price", () => {
    const overrides = { "claude-sonnet-5-5": { inputPerMTok: 3, outputPerMTok: 15 } };
    expect(costMicros("claude-sonnet-5-5", usage(1000, 100, 1000, 1000), overrides)).toBe(
      3000 + 1500 + Math.ceil(1000 * 0.3) + Math.ceil(1000 * 3.75),
    );
  });

  it("prices dated snapshot ids like their base model", () => {
    expect(resolveModelPrice("claude-haiku-4-5-20251001")).toEqual({
      price: DEFAULT_MODEL_PRICES["claude-haiku-4-5"],
      known: true,
    });
  });

  it("prices unknown models conservatively (never under-counts) and reports them", () => {
    const resolved = resolveModelPrice("claude-future-9");
    expect(resolved.known).toBe(false);
    expect(resolved.price).toEqual(UNKNOWN_MODEL_PRICE);
    for (const price of Object.values(DEFAULT_MODEL_PRICES)) {
      expect(UNKNOWN_MODEL_PRICE.inputPerMTok).toBeGreaterThanOrEqual(price.inputPerMTok);
      expect(UNKNOWN_MODEL_PRICE.outputPerMTok).toBeGreaterThanOrEqual(price.outputPerMTok);
    }
  });

  it("rejects negative or fractional token counts", () => {
    expect(() => costMicros("claude-haiku-4-5", usage(-1, 0))).toThrow(RangeError);
    expect(() => costMicros("claude-haiku-4-5", usage(1.5, 0))).toThrow(RangeError);
  });

  it("adds usages component-wise", () => {
    expect(addUsage(usage(1, 2, 3, 4), usage(10, 20, 30, 40))).toEqual(usage(11, 22, 33, 44));
  });
});
