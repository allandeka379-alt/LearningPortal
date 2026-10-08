import { describe, expect, it } from "vitest";
import { aiFieldForIssue, parseBudgetForm, parseKillSwitchForm, parseLimitsForm, parseMarkingForm, parseRoutingForm } from "./ai-forms";

const tiers = {
  "tiers.FAST.model": "claude-haiku-4-5",
  "tiers.STANDARD.model": "claude-sonnet-5-5",
  "tiers.STANDARD.effort": "low",
  "tiers.DEEP.model": "claude-opus-5-5",
  "tiers.DEEP.effort": "medium",
};

describe("AI routing form", () => {
  it("builds tiers, routes and price overrides; drops removed and empty price rows", () => {
    const result = parseRoutingForm({
      ...tiers,
      "routes.tutor.tier": "STANDARD",
      "routes.tutor.maxTokens": "2048",
      "routes.tutor.effort": "",
      "routes.solverHard.tier": "DEEP",
      "routes.solverHard.maxTokens": "8,192",
      "routes.solverHard.cacheable": "on",
      "routes.solverHard.timeoutSeconds": "90",
      "pricing.0.model": "claude-sonnet-5-5",
      "pricing.0.inputPerMTok": "2",
      "pricing.0.outputPerMTok": "10",
      "pricing.1.model": "claude-haiku-4-5",
      "pricing.1.inputPerMTok": "1",
      "pricing.1.outputPerMTok": "5",
      "pricing.1.remove": "on",
      "pricing.2.model": "",
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value).toEqual({
      tiers: {
        FAST: { model: "claude-haiku-4-5" },
        STANDARD: { model: "claude-sonnet-5-5", effort: "low" },
        DEEP: { model: "claude-opus-5-5", effort: "medium" },
      },
      routes: {
        tutor: { tier: "STANDARD", maxTokens: 2048, cacheable: false },
        solverHard: { tier: "DEEP", maxTokens: 8192, cacheable: true, timeoutMs: 90_000 },
      },
      pricing: { "claude-sonnet-5-5": { inputPerMTok: 2, outputPerMTok: 10 } },
    });
    expect(result.pricingRows).toEqual(["claude-sonnet-5-5", "claude-haiku-4-5", null]);
  });

  it("reports conversion problems under the submitted field names", () => {
    const result = parseRoutingForm({
      ...tiers,
      "tiers.FAST.model": "",
      "routes.tutor.tier": "STANDARD",
      "routes.tutor.maxTokens": "",
      "pricing.0.inputPerMTok": "2",
      "pricing.1.model": "claude-x",
      "pricing.1.inputPerMTok": "cheap",
      "pricing.1.outputPerMTok": "5",
    });
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(Object.keys(result.fieldErrors).sort()).toEqual(["pricing.0.model", "pricing.1.inputPerMTok", "routes.tutor.maxTokens", "tiers.FAST.model"]);
  });

  it("maps schema error paths back to editor fields", () => {
    const rows = ["claude-sonnet-5-5", null, "my-model"];
    expect(aiFieldForIssue("ai.routing", ["pricing", "my-model", "outputPerMTok"], rows)).toBe("pricing.2.outputPerMTok");
    expect(aiFieldForIssue("ai.routing", ["pricing", "my-model"], rows)).toBe("pricing.2.model");
    expect(aiFieldForIssue("ai.routing", ["routes", "tutor", "timeoutMs"])).toBe("routes.tutor.timeoutSeconds");
    expect(aiFieldForIssue("ai.routing", ["tiers", "DEEP", "model"])).toBe("tiers.DEEP.model");
    expect(aiFieldForIssue("ai.routing", [])).toBe("_form");
    expect(aiFieldForIssue("ai.budget", ["dailyCostCeilingMicros"])).toBe("dailyCostCeilingUsd");
    expect(aiFieldForIssue("ai.marking.minConfidence", [])).toBe("minConfidence");
    expect(aiFieldForIssue("ai.limits", ["maxImageBytes"])).toBe("maxImageBytes");
    expect(aiFieldForIssue("ai.enabled", [])).toBe("enabled");
  });
});

describe("other AI forms", () => {
  it("parses the kill switch, limits, budget and marking threshold", () => {
    expect(parseKillSwitchForm({ enabled: "on" })).toEqual({ ok: true, value: true });
    expect(parseKillSwitchForm({})).toEqual({ ok: true, value: false });
    expect(
      parseLimitsForm({ maxTurnsPerConversation: "40", maxInputCharsPerMessage: "4000", maxImageBytes: "5,000,000", cacheTtlHours: "168", maxImagesPerMessage: "1" }),
    ).toEqual({ ok: true, value: { maxTurnsPerConversation: 40, maxInputCharsPerMessage: 4000, maxImageBytes: 5_000_000, cacheTtlHours: 168, maxImagesPerMessage: 1 } });
    expect(parseLimitsForm({ maxTurnsPerConversation: "x" }).ok).toBe(false);
    expect(parseBudgetForm({ dailyCostCeilingUsd: "75.5" })).toEqual({ ok: true, value: { dailyCostCeilingMicros: 75_500_000 } });
    expect(parseBudgetForm({ dailyCostCeilingUsd: "" })).toMatchObject({ ok: false });
    expect(parseBudgetForm({ dailyCostCeilingUsd: "-3" })).toMatchObject({ ok: false });
    expect(parseMarkingForm({ minConfidence: "0.8" })).toEqual({ ok: true, value: 0.8 });
    expect(parseMarkingForm({ minConfidence: "high" })).toMatchObject({ ok: false });
  });
});
