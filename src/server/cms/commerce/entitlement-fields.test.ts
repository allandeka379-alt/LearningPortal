import { describe, expect, it } from "vitest";
import { entitlementsSchema, NO_ENTITLEMENTS } from "@/lib/billing/entitlements";
import { changedEntitlementKeys, describeEntitlementFields, ENTITLEMENT_GROUPS } from "./entitlement-fields";

describe("describeEntitlementFields", () => {
  it("generates one descriptor per contract key, typed from the schema", () => {
    const fields = describeEntitlementFields();
    expect(fields.map((field) => field.key)).toEqual(Object.keys(entitlementsSchema.shape));
    for (const field of fields) {
      expect(field.label.length).toBeGreaterThan(0);
      expect(ENTITLEMENT_GROUPS).toContain(field.group);
    }
    const byKey = new Map(fields.map((field) => [field.key, field]));
    expect(byKey.get("mockExams")).toMatchObject({ kind: "boolean" });
    expect(byKey.get("aiMessagesPerDay")).toMatchObject({ kind: "limit", min: 0, unit: "per day" });
    expect(byKey.get("lessonAccess")).toMatchObject({
      kind: "choice",
      options: [
        { value: "FREE_ONLY", label: expect.any(String) },
        { value: "ALL", label: expect.any(String) },
      ],
    });
    expect(byKey.get("aiMaxModelTier")).toMatchObject({ kind: "choice" });
    const tier = byKey.get("aiMaxModelTier");
    expect(tier?.kind === "choice" ? tier.options.map((option) => option.value) : []).toEqual(["FAST", "STANDARD", "DEEP"]);
  });

  it("covers every boolean and limit key of the empty document", () => {
    const fields = describeEntitlementFields();
    for (const [key, value] of Object.entries(NO_ENTITLEMENTS)) {
      const field = fields.find((candidate) => candidate.key === key);
      if (typeof value === "boolean") expect(field?.kind).toBe("boolean");
      else if (typeof value === "number" || value === null) expect(field?.kind).toBe("limit");
      else expect(field?.kind).toBe("choice");
    }
  });
});

describe("changedEntitlementKeys", () => {
  it("lists keys whose values differ, in schema order", () => {
    const after = { ...NO_ENTITLEMENTS, mockExams: true, practiceQuestionsPerDay: null, aiMaxModelTier: "DEEP" as const };
    expect(changedEntitlementKeys(NO_ENTITLEMENTS, after)).toEqual(["practiceQuestionsPerDay", "mockExams", "aiMaxModelTier"]);
    expect(changedEntitlementKeys(after, after)).toEqual([]);
  });
});
