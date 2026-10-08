import "server-only";
import { DEFAULT_FEATURE_FLAGS, toFeatureFlags, type FeatureFlags, type FeatureName } from "@/lib/features";
import { AppError, toHttpResponse } from "@/server/lib/errors";
import { logger } from "@/server/lib/logger";
import { getKnownSetting } from "@/server/lib/settings";

/**
 * Feature flags on the server (owner decision 2026-10-07; docs/ARCHITECTURE.md §3.14). Setting `features`
 * (SETTING_DEFINITIONS, SUPER_ADMIN-editable on /admin/settings with step-up, audited) read through the shared settings
 * cache: a change applies on the saving instance at once and everywhere within 60 s.
 *
 * Fail closed: a missing row, an invalid value or a failed read means every flag is OFF (each flag guards a service
 * that costs money; "off" is always safe).
 *
 * Use:
 * - pages:          `await notFoundUnlessFeature("ai")` first thing (renders the nearest not-found page);
 * - Server Actions / services: `await requireFeature("ai")` (AppError NOT_FOUND, so the action reports it like any
 *                   other missing resource);
 * - route handlers: `export const POST = withFeature("ai", apiRoute(...))` (404 JSON envelope before auth or parsing);
 * - layouts that render client components: `const features = await getFeatures()` and pass booleans as props.
 */

/** The current flags (cached setting; never throws). */
export async function getFeatures(): Promise<FeatureFlags> {
  try {
    return toFeatureFlags(await getKnownSetting("features"));
  } catch (error) {
    logger.error("feature flags unavailable; every optional feature is treated as off", { err: error });
    return DEFAULT_FEATURE_FLAGS;
  }
}

/** Whether `name` is switched on right now. */
export async function isFeatureEnabled(name: FeatureName): Promise<boolean> {
  return (await getFeatures())[name];
}

/**
 * Page guard: renders the nearest `not-found` page when `name` is off. `next/navigation` is imported lazily so scripts
 * outside Next (the seed and the worker reach this module through shared services) can load it.
 */
export async function notFoundUnlessFeature(name: FeatureName): Promise<void> {
  if (!(await isFeatureEnabled(name))) {
    const { notFound } = await import("next/navigation");
    notFound();
  }
}

/** Action / service guard: AppError NOT_FOUND when `name` is off (a switched-off feature looks like a missing one). */
export async function requireFeature(name: FeatureName): Promise<void> {
  if (!(await isFeatureEnabled(name))) throw AppError.notFound();
}

/**
 * Route-handler guard: answers 404 (the standard JSON error envelope) while `name` is off, before the wrapped handler
 * authenticates, rate-limits or reads the body.
 */
export function withFeature<C>(
  name: FeatureName,
  handler: (request: Request, context: C) => Promise<Response>,
): (request: Request, context: C) => Promise<Response> {
  return async (request, context) => {
    if (!(await isFeatureEnabled(name))) return toHttpResponse(AppError.notFound());
    return handler(request, context);
  };
}
