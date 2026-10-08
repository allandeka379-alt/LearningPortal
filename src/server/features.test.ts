import { beforeEach, describe, expect, it, vi } from "vitest";
import { DEFAULT_FEATURE_FLAGS } from "@/lib/features";
import { isAppError } from "@/server/lib/errors";

// The stored `features` value (or a read failure) is controlled here; nothing touches the shared Setting row.
const stored = vi.hoisted(() => ({ value: undefined as unknown, fail: false }));
vi.mock("@/server/lib/settings", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/server/lib/settings")>();
  return {
    ...actual,
    getKnownSetting: async (key: string) => {
      if (key !== "features") throw new Error(`unexpected setting ${key}`);
      if (stored.fail) throw new Error("database unavailable");
      // Mirrors the real reader: a missing row yields the registry default.
      return stored.value === undefined ? actual.SETTING_DEFINITIONS.features.default : stored.value;
    },
  };
});
vi.mock("next/navigation", async (importOriginal) => ({
  ...(await importOriginal<typeof import("next/navigation")>()),
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
}));

const { getFeatures, isFeatureEnabled, notFoundUnlessFeature, requireFeature, withFeature } = await import("./features");
const { SETTING_DEFINITIONS } = await import("@/server/lib/settings");

beforeEach(() => {
  stored.value = undefined;
  stored.fail = false;
});

describe("the features setting", () => {
  it("is registered with every flag off by default, and its schema keeps that shape", () => {
    const definition = SETTING_DEFINITIONS.features;
    expect(definition.default).toEqual({ ai: false, whatsapp: false, email: false, sms: false, stripe: false });
    expect(definition.schema.parse({})).toEqual({ ai: false, whatsapp: false, email: false, sms: false, stripe: false });
    expect(definition.schema.parse({ ai: true })).toMatchObject({ ai: true, whatsapp: false });
    expect(definition.schema.safeParse({ ai: "yes" }).success).toBe(false);
  });
});

describe("getFeatures / isFeatureEnabled", () => {
  it("reads every flag as off when nothing is stored", async () => {
    expect(await getFeatures()).toEqual(DEFAULT_FEATURE_FLAGS);
    expect(await isFeatureEnabled("ai")).toBe(false);
  });

  it("returns the stored switches", async () => {
    stored.value = { ai: true, whatsapp: false, email: true, stripe: false };
    // A row stored before the sms flag existed reads it as off.
    expect(await getFeatures()).toEqual({ ai: true, whatsapp: false, email: true, sms: false, stripe: false });
    expect(await isFeatureEnabled("ai")).toBe(true);
    expect(await isFeatureEnabled("whatsapp")).toBe(false);
  });

  it("fails closed when the setting cannot be read", async () => {
    stored.value = { ai: true, whatsapp: true, email: true, stripe: true };
    stored.fail = true;
    expect(await getFeatures()).toEqual(DEFAULT_FEATURE_FLAGS);
  });
});

describe("guards", () => {
  it("notFoundUnlessFeature renders the not-found page while the flag is off", async () => {
    await expect(notFoundUnlessFeature("ai")).rejects.toThrow("NEXT_NOT_FOUND");
    stored.value = { ai: true };
    await expect(notFoundUnlessFeature("ai")).resolves.toBeUndefined();
  });

  it("requireFeature throws AppError NOT_FOUND while the flag is off", async () => {
    const error = await requireFeature("stripe").then(
      () => null,
      (caught: unknown) => caught,
    );
    expect(isAppError(error) && error.code).toBe("NOT_FOUND");
    stored.value = { stripe: true };
    await expect(requireFeature("stripe")).resolves.toBeUndefined();
  });

  it("withFeature answers 404 without calling the handler, and passes through when on", async () => {
    const handler = vi.fn(async (_request: Request, context: { id: string }) => Response.json({ ok: context.id }));
    const route = withFeature("ai", handler);
    const off = await route(new Request("http://localhost/api/v1/tutor/conversations", { method: "POST" }), { id: "x" });
    expect(off.status).toBe(404);
    expect(await off.json()).toMatchObject({ error: { code: "NOT_FOUND" } });
    expect(off.headers.get("cache-control")).toBe("no-store");
    expect(handler).not.toHaveBeenCalled();

    stored.value = { ai: true };
    const on = await route(new Request("http://localhost/api/v1/tutor/conversations"), { id: "y" });
    expect(on.status).toBe(200);
    expect(await on.json()).toEqual({ ok: "y" });
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
