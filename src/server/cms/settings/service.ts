import "server-only";
import { z } from "zod";
import { invalidateEntitlements } from "@/server/billing/entitlements";
import { db } from "@/server/db";
import type { AuditRequestInfo } from "@/server/lib/audit";
import { AppError } from "@/server/lib/errors";
import { setSetting } from "@/server/lib/settings";
import { assertCmsPermission, infraActor, type CmsActor } from "../users/access";
import { personName, PROFILE_NAME_SELECT } from "../commerce/shared";
import {
  findPlatformSetting,
  isRegisteredSetting,
  PLATFORM_SETTINGS,
  rateLimitPresetDefaults,
  type PlatformSettingDefinition,
} from "./catalogue";
import {
  parseBooleanSettingForm,
  parseFeaturesForm,
  parseFxRatesForm,
  parseIntegerSettingForm,
  parseRateLimitsForm,
  parseRetentionDaysForm,
  parseSmsBudgetForm,
  parseStudyDefaultsForm,
  parseXpForm,
  type SettingFormResult,
  type SettingFormValues,
} from "./forms";

/**
 * Platform settings administration (/admin/settings; §36 Settings, §40 admin-configurable values). SUPER_ADMIN only
 * (`settings.manage`). Reads show the stored value (or the code default when the row is missing), whether the stored
 * value is valid, its version and who changed it last. Writes go through `setSetting` (src/server/lib/settings.ts):
 * schema validation, optimistic concurrency on `version`, the `setting.update` audit entry in the same transaction and
 * the cache drop on this instance (other instances within 60 s).
 */

export interface SettingRowView {
  isStored: boolean;
  /** The stored JSON parses with the setting's schema. When false the code default is in force. */
  isValid: boolean;
  /** What readers get right now: the stored value when valid, else the default. */
  value: unknown;
  storedValue: unknown;
  version: number;
  updatedAt: Date | null;
  updatedBy: string | null;
}

export interface PlatformSettingView extends Omit<PlatformSettingDefinition, "schema">, SettingRowView {}

/** Reads `keys` in one query and resolves each against its schema / default. */
export async function readSettingRows(
  definitions: readonly { key: string; schema: z.ZodType; default: unknown }[],
): Promise<Map<string, SettingRowView>> {
  const rows = await db.setting.findMany({
    where: { key: { in: definitions.map((definition) => definition.key) } },
    select: { key: true, value: true, version: true, updatedAt: true, updatedBy: { select: { profile: PROFILE_NAME_SELECT } } },
  });
  const byKey = new Map(rows.map((row) => [row.key, row]));
  const views = new Map<string, SettingRowView>();
  for (const definition of definitions) {
    const row = byKey.get(definition.key);
    if (!row) {
      views.set(definition.key, { isStored: false, isValid: true, value: definition.default, storedValue: undefined, version: 0, updatedAt: null, updatedBy: null });
      continue;
    }
    const parsed = definition.schema.safeParse(row.value);
    views.set(definition.key, {
      isStored: true,
      isValid: parsed.success,
      value: parsed.success ? parsed.data : definition.default,
      storedValue: row.value,
      version: row.version,
      updatedAt: row.updatedAt,
      updatedBy: row.updatedBy ? personName(row.updatedBy.profile) : null,
    });
  }
  return views;
}

/** Every editable platform setting with its current state. */
export async function listPlatformSettings(actor: CmsActor): Promise<PlatformSettingView[]> {
  assertCmsPermission(actor, "settings.manage");
  const rows = await readSettingRows(PLATFORM_SETTINGS);
  return PLATFORM_SETTINGS.map(({ schema: _schema, ...definition }) => {
    void _schema;
    const row = rows.get(definition.key);
    if (!row) throw new Error(`settings: missing row view for ${definition.key}`);
    return { ...definition, ...row };
  });
}

/** Converts a submitted editor form into the setting's value (conversion errors only; the schema validates later). */
export function parsePlatformSettingForm(key: string, values: SettingFormValues): SettingFormResult {
  const definition = findPlatformSetting(key);
  if (!definition) throw new AppError("BAD_REQUEST", "Unknown setting.");
  switch (definition.editor) {
    case "features":
      return parseFeaturesForm(values);
    case "boolean":
      return parseBooleanSettingForm(values);
    case "integer":
      return parseIntegerSettingForm(values);
    case "retentionDays":
      return parseRetentionDaysForm(values);
    case "studyDefaults":
      return parseStudyDefaultsForm(values);
    case "xp":
      return parseXpForm(values);
    case "rateLimits":
      return parseRateLimitsForm(values, rateLimitPresetDefaults());
    case "fxRates":
      return parseFxRatesForm(values);
    case "smsBudget":
      return parseSmsBudgetForm(values);
  }
}

const updateInputSchema = z.object({
  key: z.string().min(1).max(128),
  value: z.unknown(),
  expectedVersion: z.coerce.number({ error: "Reload the page and try again." }).int().min(0),
});

/** Field errors for an integer editor are reported on its single "value" control. */
function editorFieldErrors(definition: PlatformSettingDefinition, error: z.ZodError): Record<string, string[]> {
  const fieldErrors: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const path = issue.path.map(String).join(".");
    if (definition.editor === "fxRates") {
      // One textarea: name the currency (and field) in the message instead.
      (fieldErrors.rates ??= []).push(path ? `${path}: ${issue.message}` : issue.message);
      continue;
    }
    if (definition.editor === "smsBudget" && path.startsWith("allowedCountryPrefixes")) {
      // One text field for the list.
      (fieldErrors.allowedCountryPrefixes ??= []).push(issue.message);
      continue;
    }
    // The features editor names each checkbox after its flag, which is also the error path ("ai", "email"...).
    const field = definition.editor === "integer" || definition.editor === "boolean" ? "value" : path || "_form";
    (fieldErrors[field] ??= []).push(issue.message);
  }
  return fieldErrors;
}

/**
 * Saves one platform setting.
 *
 * @throws AppError FORBIDDEN (not SUPER_ADMIN) | BAD_REQUEST (unknown key) | VALIDATION | CONFLICT (stale version)
 */
export async function updatePlatformSetting(
  actor: CmsActor,
  input: { key: string; value: unknown; expectedVersion: number | string },
  request: AuditRequestInfo | null = null,
): Promise<{ key: string; version: number; value: unknown }> {
  assertCmsPermission(actor, "settings.manage");
  const parsedInput = updateInputSchema.safeParse(input);
  if (!parsedInput.success) throw AppError.fromZod(parsedInput.error);
  const { key, value, expectedVersion } = parsedInput.data;
  const definition = findPlatformSetting(key);
  if (!definition) throw new AppError("BAD_REQUEST", "Unknown setting.");
  const parsed = definition.schema.safeParse(value);
  if (!parsed.success) throw AppError.validation(editorFieldErrors(definition, parsed.error), "That value is not valid for this setting.");
  const written = await setSetting(infraActor(actor), key, parsed.data, {
    expectedVersion,
    ...(isRegisteredSetting(key) ? {} : { schema: definition.schema, description: definition.description }),
    request: request ?? undefined,
  });
  // Grace days / term length change who has access right now: drop this instance's entitlement cache.
  if (definition.group === "Billing") invalidateEntitlements();
  return { key: written.key, version: written.version, value: written.value };
}
