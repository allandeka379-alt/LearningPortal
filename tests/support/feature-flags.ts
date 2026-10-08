import type { FeatureName } from "@/lib/features";
import type * as SettingsModule from "@/server/lib/settings";

/** Mutable flags a test owns (create it with `vi.hoisted`). A flag left out reads as off, like a missing stored key. */
export type TestFeatureFlags = Partial<Record<FeatureName, boolean>>;

/**
 * Factory body for `vi.mock("@/server/lib/settings", …)`: serves the `features` setting (docs/ARCHITECTURE.md §3.14)
 * from `flags`, which the test may change between cases; every other setting is read for real. The real
 * `src/server/features.ts` helpers (getFeatures, notFoundUnlessFeature, requireFeature, withFeature), the messaging
 * channel switches and the AI gateway wiring then see these flags.
 *
 * Test files run in parallel against ONE database, so tests must never write the shared `features` Setting row.
 *
 * @example
 * const flags = vi.hoisted(() => ({ ai: true, whatsapp: false, email: false, sms: false, stripe: false }));
 * vi.mock("@/server/lib/settings", async (importOriginal) =>
 *   (await import("../../../tests/support/feature-flags")).settingsWithFeatureFlags(await importOriginal(), flags),
 * );
 */
export function settingsWithFeatureFlags(actual: typeof SettingsModule, flags: TestFeatureFlags): typeof SettingsModule {
  const getKnownSetting = ((key: SettingsModule.KnownSettingKey) =>
    key === "features" ? Promise.resolve({ ...flags }) : actual.getKnownSetting(key)) as typeof SettingsModule.getKnownSetting;
  return { ...actual, getKnownSetting };
}
