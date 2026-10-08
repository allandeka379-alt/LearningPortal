import { describe, expect, it } from "vitest";
import { z } from "zod";
import { db } from "@/server/db";
import { SETTINGS as PLATFORM_SETTINGS } from "../../../prisma/seed/data/platform";
import { EXTRA_SETTINGS } from "../../../prisma/seed/data/settings-extra";
import { createUser, uniqueSuffix } from "../../../tests/factories/index";
import { isAppError } from "./errors";
import {
  canWriteSetting,
  getAiEnabled,
  getKnownSetting,
  getSetting,
  getStudyDefaults,
  invalidateSetting,
  readSettingRow,
  SETTING_DEFINITIONS,
  setSetting,
  type KnownSettingKey,
} from "./settings";

const SEEDED_SETTINGS = [...PLATFORM_SETTINGS, ...EXTRA_SETTINGS];
const testKey = () => `test.setting_${uniqueSuffix()}`;
const objectSchema = z.object({ n: z.number().int() });

async function superAdmin() {
  const { user } = await createUser({ roles: ["SUPER_ADMIN"] });
  return { kind: "user" as const, userId: user.id, roles: user.roles };
}

describe("setting definitions", () => {
  it("accept every value the dev seed writes, and their own defaults", () => {
    for (const seeded of SEEDED_SETTINGS) {
      expect(Object.hasOwn(SETTING_DEFINITIONS, seeded.key), `missing definition for ${seeded.key}`).toBe(true);
      const definition = SETTING_DEFINITIONS[seeded.key as KnownSettingKey];
      expect(definition.schema.safeParse(seeded.value).success, seeded.key).toBe(true);
    }
    for (const [key, definition] of Object.entries(SETTING_DEFINITIONS)) {
      expect(definition.schema.safeParse(definition.default).success, key).toBe(true);
    }
  });

  it("register the engagement settings with safe defaults (scheduler bounds match the deck rules)", async () => {
    const { MAX_NEW_CARDS_PER_DAY } = await import("@/server/flashcards/decks");
    const { SCHEDULER_MAX_NEW_CARDS_PER_DAY } = await import("@/server/flashcards/scheduler-setting");
    expect(SCHEDULER_MAX_NEW_CARDS_PER_DAY).toBe(MAX_NEW_CARDS_PER_DAY);
    expect(SETTING_DEFINITIONS["flashcards.scheduler"].schema.safeParse({ newCardsPerDay: MAX_NEW_CARDS_PER_DAY + 1 }).success).toBe(false);
    expect(SETTING_DEFINITIONS["referrals.rules"].default).toMatchObject({ enabled: true });
    expect(SETTING_DEFINITIONS["safety.helplines"].schema.safeParse([{ name: "x", url: "not a url" }]).success).toBe(false);
    expect(SETTING_DEFINITIONS["safety.helplines"].default).toEqual([]);
  });

  it("register the AI gateway's ai.enabled shape, the parent-AI privacy switch and the content-generation caps", () => {
    const enabled = SETTING_DEFINITIONS["ai.enabled"].schema;
    expect(enabled.safeParse(false).success).toBe(true);
    expect(enabled.safeParse({ enabled: true, features: { SOLVER: false } }).success).toBe(true);
    expect(enabled.safeParse("yes").success).toBe(false);
    expect(SETTING_DEFINITIONS["privacy.parentAiAccess.enabled"].default).toBe(false);
    expect(SETTING_DEFINITIONS["ai.contentGeneration"].schema.safeParse({ editorDailyJobs: 5, editorDailyCostMicros: null }).success).toBe(true);
    expect(SETTING_DEFINITIONS["ai.contentGeneration"].schema.safeParse({ editorDailyJobs: -1, editorDailyCostMicros: 0 }).success).toBe(false);
    expect(SETTING_DEFINITIONS["ai.marking.minConfidence"].schema.safeParse(1.5).success).toBe(false);
  });

  it("let ADMIN write only the kill switch; SUPER_ADMIN and system actors write everything", () => {
    const admin = { kind: "user" as const, userId: "u-1", roles: ["ADMIN"] as const };
    expect(canWriteSetting(admin, "ai.enabled")).toBe(true);
    expect(canWriteSetting(admin, "ai.budget")).toBe(false);
    expect(canWriteSetting({ kind: "user", userId: "u-2", roles: ["CONTENT_EDITOR"] }, "ai.enabled")).toBe(false);
    expect(canWriteSetting({ kind: "user", userId: "u-3", roles: ["SUPER_ADMIN"] }, "ai.budget")).toBe(true);
    expect(canWriteSetting({ kind: "system", job: "seed" }, "rateLimits")).toBe(true);
  });
});

describe("getSetting / setSetting", () => {
  it("returns the fallback for a missing key and the stored value after a write", async () => {
    const actor = await superAdmin();
    const key = testKey();
    expect(await getSetting(key, objectSchema, { n: 0 })).toEqual({ n: 0 });

    const written = await setSetting(actor, key, { n: 5 }, { schema: objectSchema });
    expect(written.version).toBe(1);
    expect(await getSetting(key, objectSchema, { n: 0 })).toEqual({ n: 5 });

    const audit = await db.auditLog.findFirstOrThrow({ where: { entityType: "Setting", entityId: key } });
    expect(audit.action).toBe("setting.update");
    expect(audit.actorUserId).toBe(actor.userId);
  });

  it("caches reads per process until invalidated", async () => {
    const actor = await superAdmin();
    const key = testKey();
    await setSetting(actor, key, { n: 1 }, { schema: objectSchema });
    expect(await getSetting(key, objectSchema, { n: 0 })).toEqual({ n: 1 });

    await db.setting.update({ where: { key }, data: { value: { n: 2 } } }); // behind the cache's back
    expect(await getSetting(key, objectSchema, { n: 0 })).toEqual({ n: 1 });
    invalidateSetting(key);
    expect(await getSetting(key, objectSchema, { n: 0 })).toEqual({ n: 2 });
  });

  it("falls back to the default when the stored value is invalid", async () => {
    const actor = await superAdmin();
    const key = testKey();
    await setSetting(actor, key, { n: "not a number" });
    expect(await getSetting(key, objectSchema, { n: 9 })).toEqual({ n: 9 });
  });

  it("enforces optimistic concurrency and bumps the version", async () => {
    const actor = await superAdmin();
    const key = testKey();
    await setSetting(actor, key, { n: 1 }, { schema: objectSchema, expectedVersion: 0 });
    const second = await setSetting(actor, key, { n: 2 }, { schema: objectSchema, expectedVersion: 1 });
    expect(second.version).toBe(2);
    const stale = await setSetting(actor, key, { n: 3 }, { schema: objectSchema, expectedVersion: 1 }).catch((e: unknown) => e);
    expect(isAppError(stale) && stale.code).toBe("CONFLICT");
    expect((await readSettingRow(key))?.version).toBe(2);
  });

  it("refuses non super-admins and invalid values", async () => {
    const { user } = await createUser({ roles: ["ADMIN"] });
    const admin = { kind: "user" as const, userId: user.id, roles: user.roles };
    const forbidden = await setSetting(admin, testKey(), 1).catch((e: unknown) => e);
    expect(isAppError(forbidden) && forbidden.code).toBe("FORBIDDEN");

    const actor = await superAdmin();
    const invalid = await setSetting(actor, testKey(), "x", { schema: objectSchema }).catch((e: unknown) => e);
    expect(isAppError(invalid) && invalid.code).toBe("VALIDATION");

    const badKey = await setSetting(actor, "bad key!", 1).catch((e: unknown) => e);
    expect(isAppError(badKey) && badKey.code).toBe("BAD_REQUEST");
  });

  it("system actors can write and are audited as SYSTEM", async () => {
    const key = testKey();
    await setSetting({ kind: "system", job: "seed" }, key, null);
    expect(await getSetting(key, z.null(), null)).toBeNull();
    const audit = await db.auditLog.findFirstOrThrow({ where: { entityType: "Setting", entityId: key } });
    expect(audit.actorKind).toBe("SYSTEM");
  });
});

describe("typed accessors", () => {
  it("return schema-valid values (stored or default) without mutating the registry", async () => {
    expect(typeof (await getAiEnabled())).toBe("boolean");
    const study = await getStudyDefaults();
    expect(study.dailyGoalMinutes).toBeGreaterThan(0);
    const limits = await getKnownSetting("rateLimits");
    expect(typeof limits).toBe("object");
  });
});
