import { beforeAll, describe, expect, it, vi } from "vitest";
import type { Role } from "@/generated/prisma/client";
import { REAUTH_REQUIRED_CODE } from "@/components/admin/form-state";
import { AppError } from "@/server/lib/errors";
import { createUser } from "../../../../tests/factories/index";

// The AI settings actions answer NOT_FOUND unless AI is switched on: `features.ai` is on for this file (never written to the shared DB).
const featureFlags = vi.hoisted(() => ({ ai: true, whatsapp: false, email: false, stripe: false }));
vi.mock("@/server/lib/settings", async (importOriginal) =>
  (await import("../../../../tests/support/feature-flags")).settingsWithFeatureFlags(await importOriginal(), featureFlags),
);

/**
 * Wiring tests for the settings and AI settings Server Actions: permission (SUPER_ADMIN), step-up for the kill switch,
 * the budget and the parent-AI privacy switch, and validation errors named after the editor fields. Settings are
 * global rows, so these tests never store a changed value.
 */

type Actor = { kind: "user"; userId: string; roles: Role[] };
let currentActor: Actor | null = null;
let recentlyAuthenticated = false;

vi.mock("@/server/auth/guards", async (importOriginal) => {
  const original = await importOriginal<typeof import("@/server/auth/guards")>();
  return {
    ...original,
    requirePermissionForAction: async (permission: Parameters<typeof import("@/server/auth/permissions").hasPermission>[1]) => {
      if (!currentActor) throw AppError.unauthenticated();
      const { hasPermission } = await import("@/server/auth/permissions");
      if (!hasPermission(currentActor, permission)) throw AppError.forbidden();
      return currentActor;
    },
    requireRecentAuthForAction: async () => {
      if (!currentActor) throw AppError.unauthenticated();
      if (!recentlyAuthenticated) throw AppError.forbidden(original.REAUTH_REQUIRED_MESSAGE, { reason: "reauth_required" });
      return currentActor;
    },
  };
});
vi.mock("@/server/lib/request", () => ({ getRequestContext: async () => ({ requestId: "test-request", ip: "10.0.0.1", userAgent: "vitest" }) }));
vi.mock("next/cache", () => ({ revalidatePath: vi.fn(), revalidateTag: vi.fn(), refresh: vi.fn(), updateTag: vi.fn() }));

const { savePlatformSettingAction } = await import("./actions");
const { saveAiSettingAction } = await import("../ai/settings/actions");
const { enqueueAiUsageBackfillAction } = await import("../ai/usage/actions");

function form(fields: Record<string, string>): FormData {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
}

let admin: Actor;
let superAdmin: Actor;

beforeAll(async () => {
  const [a, s] = await Promise.all([createUser({ roles: ["ADMIN"] }), createUser({ roles: ["SUPER_ADMIN"] })]);
  admin = { kind: "user", userId: a.user.id, roles: ["ADMIN"] };
  superAdmin = { kind: "user", userId: s.user.id, roles: ["SUPER_ADMIN"] };
});

describe("platform settings action", () => {
  it("is SUPER_ADMIN only, converts the typed form and reports field errors", async () => {
    currentActor = admin;
    expect(await savePlatformSettingAction(null, form({ key: "billing.graceDays", expectedVersion: "0", value: "5" }))).toMatchObject({ ok: false, error: { code: "FORBIDDEN" } });

    currentActor = superAdmin;
    recentlyAuthenticated = true;
    expect(await savePlatformSettingAction(null, form({ key: "billing.graceDays", expectedVersion: "0", value: "five" }))).toMatchObject({
      ok: false,
      error: { code: "VALIDATION", fieldErrors: { value: ["Enter a whole number."] } },
    });
    expect(await savePlatformSettingAction(null, form({ key: "billing.graceDays", expectedVersion: "0", value: "99" }))).toMatchObject({
      ok: false,
      error: { code: "VALIDATION", fieldErrors: { value: expect.any(Array) } },
    });
    expect(await savePlatformSettingAction(null, form({ key: "secret.thing", expectedVersion: "0" }))).toMatchObject({ ok: false, error: { code: "BAD_REQUEST" } });
    // The parent-AI privacy switch asks for the password again.
    recentlyAuthenticated = false;
    expect(await savePlatformSettingAction(null, form({ key: "privacy.parentAiAccess.enabled", expectedVersion: "0", value: "on" }))).toMatchObject({
      ok: false,
      error: { code: REAUTH_REQUIRED_CODE },
    });
  });

  it("asks for the password again before ANY setting is written, including the sign-in rate limits (AUTH-07)", async () => {
    currentActor = superAdmin;
    recentlyAuthenticated = false;
    // A stale (or hijacked) SUPER_ADMIN session cannot switch off brute-force protection without re-authenticating.
    expect(
      await savePlatformSettingAction(null, form({ key: "rateLimits", expectedVersion: "0", value: JSON.stringify({ login: { limit: 1_000_000, windowSeconds: 60 } }) })),
    ).toMatchObject({ ok: false, error: { code: REAUTH_REQUIRED_CODE } });
    expect(await savePlatformSettingAction(null, form({ key: "billing.graceDays", expectedVersion: "0", value: "five" }))).toMatchObject({
      ok: false,
      error: { code: REAUTH_REQUIRED_CODE },
    });
  });
});

describe("feature flags (owner decision 2026-10-07)", () => {
  it("only a SUPER_ADMIN who re-entered their password may change them; a stale editor is refused", async () => {
    const all = { key: "features", ai: "on", whatsapp: "on", email: "on", stripe: "on" };
    currentActor = admin;
    expect(await savePlatformSettingAction(null, form({ ...all, expectedVersion: "0" }))).toMatchObject({ ok: false, error: { code: "FORBIDDEN" } });

    currentActor = superAdmin;
    recentlyAuthenticated = false;
    expect(await savePlatformSettingAction(null, form({ ...all, expectedVersion: "0" }))).toMatchObject({ ok: false, error: { code: REAUTH_REQUIRED_CODE } });

    // With step-up, the write reaches setSetting (version check): an out-of-date form changes nothing.
    recentlyAuthenticated = true;
    expect(await savePlatformSettingAction(null, form({ ...all, expectedVersion: "987654" }))).toMatchObject({ ok: false, error: { code: "CONFLICT" } });
  });

  it("the AI admin actions answer NOT_FOUND while features.ai is off", async () => {
    featureFlags.ai = false;
    try {
      currentActor = superAdmin;
      recentlyAuthenticated = true;
      expect(await saveAiSettingAction(null, form({ key: "ai.enabled", expectedVersion: "0" }))).toMatchObject({ ok: false, error: { code: "NOT_FOUND" } });
      expect(await enqueueAiUsageBackfillAction(null, form({ from: "2026-10-01", to: "2026-10-02" }))).toMatchObject({ ok: false, error: { code: "NOT_FOUND" } });
    } finally {
      featureFlags.ai = true;
    }
  });
});

describe("AI settings actions", () => {
  it("lets ADMIN view only; the kill switch needs step-up; invalid values map to editor fields", async () => {
    currentActor = admin;
    expect(await saveAiSettingAction(null, form({ key: "ai.limits", expectedVersion: "0" }))).toMatchObject({ ok: false, error: { code: "FORBIDDEN" } });

    currentActor = superAdmin;
    recentlyAuthenticated = false;
    expect(await saveAiSettingAction(null, form({ key: "ai.enabled", expectedVersion: "0" }))).toMatchObject({ ok: false, error: { code: REAUTH_REQUIRED_CODE } });
    expect(await saveAiSettingAction(null, form({ key: "ai.budget", expectedVersion: "0", dailyCostCeilingUsd: "10" }))).toMatchObject({ ok: false, error: { code: REAUTH_REQUIRED_CODE } });

    const limits = await saveAiSettingAction(
      null,
      form({ key: "ai.limits", expectedVersion: "0", maxTurnsPerConversation: "0", maxInputCharsPerMessage: "4000", maxImageBytes: "x", cacheTtlHours: "1", maxImagesPerMessage: "1" }),
    );
    expect(limits).toMatchObject({ ok: false, error: { code: "VALIDATION", fieldErrors: { maxImageBytes: ["Enter a whole number."] } } });
    const turns = await saveAiSettingAction(
      null,
      form({ key: "ai.limits", expectedVersion: "0", maxTurnsPerConversation: "0", maxInputCharsPerMessage: "4000", maxImageBytes: "100", cacheTtlHours: "1", maxImagesPerMessage: "1" }),
    );
    expect(turns).toMatchObject({ ok: false, error: { code: "VALIDATION", fieldErrors: { maxTurnsPerConversation: expect.any(Array) } } });

    recentlyAuthenticated = true;
    expect(await saveAiSettingAction(null, form({ key: "ai.budget", expectedVersion: "0", dailyCostCeilingUsd: "lots" }))).toMatchObject({
      ok: false,
      error: { code: "VALIDATION", fieldErrors: { dailyCostCeilingUsd: expect.any(Array) } },
    });
    recentlyAuthenticated = false;
    expect(await saveAiSettingAction(null, form({ key: "ai.unknown", expectedVersion: "0" }))).toMatchObject({ ok: false, error: { code: "BAD_REQUEST" } });
  });

  it("queues the AI usage rollup for ADMIN with a date range", async () => {
    currentActor = admin;
    expect(await enqueueAiUsageBackfillAction(null, form({ from: "2999-01-02", to: "2999-01-01" }))).toMatchObject({ ok: false, error: { code: "VALIDATION" } });
    expect(await enqueueAiUsageBackfillAction(null, form({ from: "2999-01-01", to: "2999-01-02" }))).toMatchObject({ ok: false, error: { code: "VALIDATION" } });
  });
});
