import { afterEach, describe, expect, it, vi } from "vitest";
import {
  AI_SETTING_KEYS,
  DEFAULT_AI_CONFIG,
  isFeatureEnabled,
  loadAiConfig,
  parseAiConfig,
  resetAiConfigCache,
  resolveRoute,
  type SettingRow,
} from "./config";

/**
 * Mirror of the AI rows seeded by prisma/seed/data/platform.ts (SETTINGS). Copied, not imported: the seed is owned by
 * another module and may change shape; this fixture pins what parseAiConfig must accept.
 */
const SEEDED_AI_SETTINGS: SettingRow[] = [
  { key: "ai.enabled", value: true },
  {
    key: "ai.routing",
    value: {
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
    },
  },
  {
    key: "ai.limits",
    value: { maxTurnsPerConversation: 40, maxInputCharsPerMessage: 4000, maxImageBytes: 5_000_000, cacheTtlHours: 168 },
  },
  { key: "ai.budget", value: { dailyCostCeilingMicros: 50_000_000 } },
];

afterEach(() => {
  resetAiConfigCache();
});

describe("parseAiConfig", () => {
  it("accepts the seeded defaults without issues", () => {
    const { config, issues } = parseAiConfig(SEEDED_AI_SETTINGS);
    expect(issues).toEqual([]);
    expect(config.enabled).toBe(true);
    expect(config.routing.tiers.STANDARD).toEqual({ model: "claude-sonnet-5-5", effort: "low" });
    expect(resolveRoute(config, "tutor")).toEqual({ tier: "STANDARD", maxTokens: 2048, cacheable: false });
    expect(config.limits.maxImagesPerMessage).toBe(1);
    expect(config.budget.dailyCostCeilingMicros).toBe(50_000_000);
    expect(config.marking.minConfidence).toBe(0.75);
    // Code-defined routes missing from the setting stay available.
    expect(resolveRoute(config, "markingEssay").tier).toBe("DEEP");
  });

  it("uses defaults when rows are missing or null", () => {
    const { config, issues } = parseAiConfig([{ key: "ai.routing", value: null }]);
    expect(issues).toEqual([]);
    expect(config).toEqual(DEFAULT_AI_CONFIG);
  });

  it("fails CLOSED when ai.enabled is invalid, and falls back to defaults for other invalid keys", () => {
    const { config, issues } = parseAiConfig([
      { key: "ai.enabled", value: "yes" },
      { key: "ai.routing", value: { tiers: { FAST: { model: "Bad Model!" } }, routes: {} } },
      { key: "ai.budget", value: { dailyCostCeilingMicros: -5 } },
    ]);
    expect(config.enabled).toBe(false);
    expect(config.routing.tiers).toEqual(DEFAULT_AI_CONFIG.routing.tiers);
    expect(config.budget.dailyCostCeilingMicros).toBe(DEFAULT_AI_CONFIG.budget.dailyCostCeilingMicros);
    expect(issues.map((issue) => issue.key).sort()).toEqual(["ai.budget", "ai.enabled", "ai.routing"]);
  });

  it("supports per-feature kill switches, price overrides, route effort and a null budget ceiling", () => {
    const { config, issues } = parseAiConfig([
      { key: "ai.enabled", value: { enabled: true, features: { SOLVER: false } } },
      {
        key: "ai.routing",
        value: {
          tiers: DEFAULT_AI_CONFIG.routing.tiers,
          routes: { marking: { tier: "STANDARD", maxTokens: 1200, effort: "medium", cacheable: false } },
          pricing: { "claude-sonnet-5-5": { inputPerMTok: 2.5, outputPerMTok: 12 } },
        },
      },
      { key: "ai.budget", value: { dailyCostCeilingMicros: null } },
      { key: "ai.marking.minConfidence", value: 0.9 },
    ]);
    expect(issues).toEqual([]);
    expect(isFeatureEnabled(config, "SOLVER")).toBe(false);
    expect(isFeatureEnabled(config, "TUTOR")).toBe(true);
    expect(resolveRoute(config, "marking").effort).toBe("medium");
    expect(config.routing.pricing["claude-sonnet-5-5"]).toEqual({ inputPerMTok: 2.5, outputPerMTok: 12 });
    expect(config.budget.dailyCostCeilingMicros).toBeNull();
    expect(config.marking.minConfidence).toBe(0.9);
  });

  it("throws for an unknown route (programming error)", () => {
    expect(() => resolveRoute(DEFAULT_AI_CONFIG, "nope")).toThrow(/Unknown AI route/);
  });
});

describe("loadAiConfig", () => {
  it("reads the AI keys and caches the result for 60 s", async () => {
    let now = 1_000;
    const readSettings = vi.fn(async (keys: readonly string[]) => {
      expect([...keys].sort()).toEqual([...AI_SETTING_KEYS].sort());
      return SEEDED_AI_SETTINGS;
    });
    const first = await loadAiConfig({ readSettings, now: () => now });
    now += 59_000;
    const second = await loadAiConfig({ readSettings, now: () => now });
    expect(second).toBe(first);
    expect(readSettings).toHaveBeenCalledTimes(1);
    now += 2_000;
    await loadAiConfig({ readSettings, now: () => now });
    expect(readSettings).toHaveBeenCalledTimes(2);
  });

  it("reads real Setting rows from the database (whatever is seeded parses or falls back safely)", async () => {
    const config = await loadAiConfig({ fresh: true });
    expect(["FAST", "STANDARD", "DEEP"].every((tier) => tier in config.routing.tiers)).toBe(true);
    expect(typeof config.enabled).toBe("boolean");
  });
});
