import { describe, expect, it } from "vitest";
import { AI_MESSAGE_FEATURES, AI_SOLVER_FEATURES } from "@/server/billing/usage";
import { InMemoryUsageMeter, quotaFeatures } from "./meter";

describe("shared quota buckets (PAY-5)", () => {
  it("TUTOR and WHATSAPP share the aiMessagesPerDay bucket the billing counters sum; other features stand alone", () => {
    expect([...quotaFeatures("TUTOR")].sort()).toEqual([...AI_MESSAGE_FEATURES].sort());
    expect([...quotaFeatures("WHATSAPP")].sort()).toEqual([...AI_MESSAGE_FEATURES].sort());
    expect(quotaFeatures("SOLVER")).toEqual([...AI_SOLVER_FEATURES]);
    expect(quotaFeatures("MARKING")).toEqual(["MARKING"]);
    expect(quotaFeatures("CONTENT_GEN")).toEqual(["CONTENT_GEN"]);
  });

  it("the in-memory meter enforces the shared bucket like the database meter", async () => {
    const meter = new InMemoryUsageMeter();
    const base = { userId: "u1", date: "2026-10-05" as const, cost: 1 };
    expect(await meter.reserve({ ...base, feature: "TUTOR" }, 2)).toBe(true);
    expect(await meter.reserve({ ...base, feature: "WHATSAPP" }, 2)).toBe(true);
    expect(await meter.reserve({ ...base, feature: "WHATSAPP" }, 2)).toBe(false);
    expect(await meter.reserve({ ...base, feature: "TUTOR" }, 2)).toBe(false);
    expect(await meter.reserve({ ...base, feature: "SOLVER" }, 1)).toBe(true);
  });
});
