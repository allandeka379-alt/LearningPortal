import { describe, expect, it } from "vitest";
import type { Role } from "@/generated/prisma/client";
import { loadAiConfig } from "@/server/ai/config";
import { db } from "@/server/db";
import { createUser } from "../../../../tests/factories/index";
import type { CmsActor } from "../users/access";
import { parseRoutingForm } from "./ai-forms";
import { AI_EDITABLE_KEYS, getAiSettingsOverview, updateAiSetting } from "./ai-settings";

/**
 * AI settings admin against Postgres. The ai.* rows are GLOBAL and read by the gateway in other test files, so writes
 * here only store the value already in force (version, audit and cache reset are still exercised); everything else is
 * a validation failure that writes nothing.
 */

async function actorWith(roles: Exclude<Role, "SCHOOL_ADMIN">[]): Promise<CmsActor> {
  const { user } = await createUser({ roles });
  return { kind: "user", userId: user.id, roles };
}

describe("AI settings overview", () => {
  it("is visible to ADMIN (read-only) and SUPER_ADMIN (editable); never exposes the API key", async () => {
    const admin = await actorWith(["ADMIN"]);
    const superAdmin = await actorWith(["SUPER_ADMIN"]);
    const adminView = await getAiSettingsOverview(admin);
    expect(adminView.canEdit).toBe(false);
    expect((await getAiSettingsOverview(superAdmin)).canEdit).toBe(true);
    expect(typeof adminView.apiKeyConfigured).toBe("boolean");
    expect(Object.keys(adminView.rows).sort()).toEqual([...AI_EDITABLE_KEYS].sort());
    expect(adminView.tierModels.map((tier) => tier.tier)).toEqual(["FAST", "STANDARD", "DEEP"]);
    expect(adminView.routeNames).toContain("tutor");
    expect(adminView.efforts).toContain("medium");
    const key = process.env.ANTHROPIC_API_KEY?.trim();
    if (key) expect(JSON.stringify(adminView)).not.toContain(key);

    await expect(getAiSettingsOverview(await actorWith(["CONTENT_EDITOR"]))).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});

describe("updating AI settings", () => {
  it("is SUPER_ADMIN only and writes with a version check, an audit entry and a fresh gateway config", async () => {
    const superAdmin = await actorWith(["SUPER_ADMIN"]);
    const overview = await getAiSettingsOverview(superAdmin);
    await expect(
      updateAiSetting(await actorWith(["ADMIN"]), { key: "ai.limits", value: overview.rows["ai.limits"].value, expectedVersion: overview.rows["ai.limits"].version }),
    ).rejects.toMatchObject({ code: "FORBIDDEN" });

    const limits = overview.rows["ai.limits"];
    const written = await updateAiSetting(superAdmin, { key: "ai.limits", value: limits.value, expectedVersion: limits.version }, { requestId: "req-ai-limits" });
    expect(written.version).toBe(limits.version + 1);
    await expect(updateAiSetting(superAdmin, { key: "ai.limits", value: limits.value, expectedVersion: limits.version })).rejects.toMatchObject({ code: "CONFLICT" });
    const audit = await db.auditLog.findFirstOrThrow({ where: { entityType: "Setting", entityId: "ai.limits", actorUserId: superAdmin.userId } });
    expect(audit).toMatchObject({ action: "setting.update", requestId: "req-ai-limits" });
    const config = await loadAiConfig();
    expect(config.limits).toMatchObject(limits.value as object);

    // Not in the shared registry: written with its own schema.
    const marking = overview.rows["ai.marking.minConfidence"];
    const markingWritten = await updateAiSetting(superAdmin, { key: "ai.marking.minConfidence", value: marking.value, expectedVersion: marking.version });
    expect(markingWritten.value).toBe(marking.value);
  });

  it("validates with the gateway schemas and reports errors under the editor field names", async () => {
    const superAdmin = await actorWith(["SUPER_ADMIN"]);
    const overview = await getAiSettingsOverview(superAdmin);
    const limits = overview.rows["ai.limits"].value as Record<string, number>;
    await expect(
      updateAiSetting(superAdmin, { key: "ai.limits", value: { ...limits, maxTurnsPerConversation: 0, maxImagesPerMessage: 9 }, expectedVersion: 0 }),
    ).rejects.toMatchObject({ code: "VALIDATION", fieldErrors: { maxTurnsPerConversation: expect.any(Array), maxImagesPerMessage: expect.any(Array) } });

    const routing = parseRoutingForm({
      "tiers.FAST.model": "Not A Model!",
      "tiers.STANDARD.model": "claude-sonnet-5-5",
      "tiers.DEEP.model": "claude-opus-5-5",
      "tiers.DEEP.effort": "extreme",
      "routes.tutor.tier": "STANDARD",
      "routes.tutor.maxTokens": "2",
      "pricing.0.model": "claude-sonnet-5-5",
      "pricing.0.inputPerMTok": "2",
      "pricing.0.outputPerMTok": "5000",
    });
    expect(routing.ok).toBe(true);
    if (!routing.ok) return;
    await expect(
      updateAiSetting(superAdmin, { key: "ai.routing", value: routing.value, expectedVersion: 0 }, null, { pricingRows: routing.pricingRows }),
    ).rejects.toMatchObject({
      code: "VALIDATION",
      fieldErrors: {
        "tiers.FAST.model": expect.any(Array),
        "tiers.DEEP.effort": expect.any(Array),
        "routes.tutor.maxTokens": expect.any(Array),
        "pricing.0.outputPerMTok": expect.any(Array),
      },
    });

    await expect(updateAiSetting(superAdmin, { key: "ai.budget", value: { dailyCostCeilingMicros: null }, expectedVersion: 0 })).rejects.toMatchObject({
      fieldErrors: { dailyCostCeilingUsd: expect.any(Array) },
    });
    await expect(updateAiSetting(superAdmin, { key: "ai.enabled", value: "maybe", expectedVersion: 0 })).rejects.toMatchObject({
      fieldErrors: { enabled: expect.any(Array) },
    });
    await expect(updateAiSetting(superAdmin, { key: "ai.secret", value: 1, expectedVersion: 0 })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });

  it("re-stores the routing and kill switch in force (no behaviour change)", async () => {
    const superAdmin = await actorWith(["SUPER_ADMIN"]);
    const overview = await getAiSettingsOverview(superAdmin);
    const routing = overview.rows["ai.routing"];
    const routingWritten = await updateAiSetting(superAdmin, { key: "ai.routing", value: routing.value, expectedVersion: routing.version });
    expect(routingWritten.version).toBe(routing.version + 1);
    const enabled = overview.rows["ai.enabled"];
    if (typeof enabled.storedValue !== "object" || enabled.storedValue === null) {
      const value = typeof enabled.value === "boolean" ? enabled.value : true;
      const written = await updateAiSetting(superAdmin, { key: "ai.enabled", value, expectedVersion: enabled.version });
      expect(written.value).toBe(value);
    }
  });
});
