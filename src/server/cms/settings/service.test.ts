import { describe, expect, it } from "vitest";
import type { Role } from "@/generated/prisma/client";
import { db } from "@/server/db";
import { invalidateSetting } from "@/server/lib/settings";
import { createUser } from "../../../../tests/factories/index";
import type { CmsActor } from "../users/access";
import { getParentAiAccessEnabled, PARENT_AI_ACCESS_SETTING, PLATFORM_SETTINGS } from "./catalogue";
import { listPlatformSettings, parsePlatformSettingForm, updatePlatformSetting } from "./service";

/**
 * Platform settings admin against Postgres. Settings are GLOBAL rows shared by every test file, so writes here only
 * ever store the value already in force (version, audit and concurrency are still exercised) or fail validation.
 */

async function actorWith(roles: Exclude<Role, "SCHOOL_ADMIN">[]): Promise<CmsActor> {
  const { user } = await createUser({ roles });
  return { kind: "user", userId: user.id, roles };
}

describe("platform settings", () => {
  it("lists every catalogue key with its effective value; only SUPER_ADMIN may open it", async () => {
    const superAdmin = await actorWith(["SUPER_ADMIN"]);
    const settings = await listPlatformSettings(superAdmin);
    expect(settings.map((setting) => setting.key)).toEqual(PLATFORM_SETTINGS.map((definition) => definition.key));
    const privacy = settings.find((setting) => setting.key === PARENT_AI_ACCESS_SETTING);
    expect(privacy).toMatchObject({ editor: "boolean", group: "Privacy", isValid: true });
    expect(typeof privacy?.value).toBe("boolean");
    expect(settings.every((setting) => !("schema" in setting))).toBe(true);

    for (const roles of [["ADMIN"], ["CONTENT_EDITOR"], ["STUDENT"]] as Exclude<Role, "SCHOOL_ADMIN">[][]) {
      await expect(listPlatformSettings(await actorWith(roles))).rejects.toMatchObject({ code: "FORBIDDEN" });
    }
    await expect(updatePlatformSetting(await actorWith(["ADMIN"]), { key: PARENT_AI_ACCESS_SETTING, value: false, expectedVersion: 0 })).rejects.toMatchObject({
      code: "FORBIDDEN",
    });
  });

  it("writes through setSetting with a version check and an audit entry", async () => {
    const superAdmin = await actorWith(["SUPER_ADMIN"]);
    const current = (await listPlatformSettings(superAdmin)).find((setting) => setting.key === PARENT_AI_ACCESS_SETTING);
    if (!current) throw new Error("missing setting");
    const value = current.value as boolean;

    const written = await updatePlatformSetting(superAdmin, { key: PARENT_AI_ACCESS_SETTING, value, expectedVersion: current.version }, { requestId: "req-settings-test" });
    expect(written).toEqual({ key: PARENT_AI_ACCESS_SETTING, version: current.version + 1, value });
    await expect(updatePlatformSetting(superAdmin, { key: PARENT_AI_ACCESS_SETTING, value, expectedVersion: current.version })).rejects.toMatchObject({ code: "CONFLICT" });

    const audit = await db.auditLog.findFirstOrThrow({ where: { entityType: "Setting", entityId: PARENT_AI_ACCESS_SETTING, actorUserId: superAdmin.userId } });
    expect(audit).toMatchObject({ action: "setting.update", requestId: "req-settings-test" });
    expect(audit.after).toMatchObject({ value, version: current.version + 1 });
    invalidateSetting(PARENT_AI_ACCESS_SETTING);
    expect(await getParentAiAccessEnabled()).toBe(value);

    const row = await db.setting.findUniqueOrThrow({ where: { key: PARENT_AI_ACCESS_SETTING } });
    expect(row.description).toMatch(/parent/i);
  });

  it("validates values with the setting's schema and names the editor fields", async () => {
    const superAdmin = await actorWith(["SUPER_ADMIN"]);
    await expect(updatePlatformSetting(superAdmin, { key: PARENT_AI_ACCESS_SETTING, value: "yes", expectedVersion: 0 })).rejects.toMatchObject({
      code: "VALIDATION",
      fieldErrors: { value: expect.any(Array) },
    });
    await expect(updatePlatformSetting(superAdmin, { key: "billing.graceDays", value: 61, expectedVersion: 0 })).rejects.toMatchObject({
      fieldErrors: { value: expect.any(Array) },
    });
    const study = parsePlatformSettingForm("study.defaults", {
      dailyGoalMinutes: "0",
      "availability.mon": "60",
      "availability.tue": "60",
      "availability.wed": "60",
      "availability.thu": "60",
      "availability.fri": "60",
      "availability.sat": "2000",
      "availability.sun": "60",
    });
    expect(study.ok).toBe(true);
    if (!study.ok) return;
    await expect(updatePlatformSetting(superAdmin, { key: "study.defaults", value: study.value, expectedVersion: 0 })).rejects.toMatchObject({
      fieldErrors: { dailyGoalMinutes: expect.any(Array), "availability.sat": expect.any(Array) },
    });
    const rate = parsePlatformSettingForm("rateLimits", { "login.limit": "0" });
    expect(rate).toEqual({ ok: true, value: { login: { limit: 0, windowSeconds: 900 } } });
    if (rate.ok) {
      await expect(updatePlatformSetting(superAdmin, { key: "rateLimits", value: rate.value, expectedVersion: 0 })).rejects.toMatchObject({
        fieldErrors: { "login.limit": expect.any(Array) },
      });
    }
    await expect(updatePlatformSetting(superAdmin, { key: "ai.enabled", value: true, expectedVersion: 0 })).rejects.toMatchObject({ code: "BAD_REQUEST" });
    expect(() => parsePlatformSettingForm("nope", {})).toThrow();
  });

  it("stores the current study defaults again (no behaviour change) with a version bump", async () => {
    const superAdmin = await actorWith(["SUPER_ADMIN"]);
    const current = (await listPlatformSettings(superAdmin)).find((setting) => setting.key === "study.defaults");
    if (!current) throw new Error("missing setting");
    const written = await updatePlatformSetting(superAdmin, { key: "study.defaults", value: current.value, expectedVersion: current.version });
    expect(written.version).toBe(current.version + 1);
    expect(written.value).toEqual(current.value);
  });
});
