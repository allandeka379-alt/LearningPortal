"use server";

import type { AdminActionState } from "@/components/admin/form-state";
import { requireAdminAction, requireAdminStepUpAction } from "@/components/admin/guards";
import { adminRequestMeta, formText, runAdminAction } from "@/components/admin/server-action";
import { FEATURE_DEPENDENT_PATHS, FEATURES_SETTING, findPlatformSetting } from "@/server/cms/settings/catalogue";
import type { SettingFormValues } from "@/server/cms/settings/forms";
import { parsePlatformSettingForm, updatePlatformSetting } from "@/server/cms/settings/service";
import { auditRequestFrom } from "@/server/cms/users/service";
import { AppError } from "@/server/lib/errors";

/**
 * Platform settings Server Action (thin): `settings.manage` (SUPER_ADMIN). Every setting write also needs a password
 * confirmation within the last 15 minutes (ARCHITECTURE §5.1 step-up: settings include the request limits that guard
 * sign-in and codes, billing rules and the parent-AI privacy switch). The editor form is converted here, validated
 * with the setting's schema and written by the service (version check + `setting.update` audit).
 */

function formRecord(formData: FormData): SettingFormValues {
  const values: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string" && !key.startsWith("$ACTION")) values[key] = value.slice(0, 2000);
  }
  return values;
}

export async function savePlatformSettingAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.settings.save", formData, async () => {
    // Permission first: callers without settings.manage learn nothing about which keys exist.
    await requireAdminAction("settings.manage");
    const key = formText(formData, "key") ?? "";
    const definition = findPlatformSetting(key);
    if (!definition) throw new AppError("BAD_REQUEST", "Unknown setting.");
    const actor = await requireAdminStepUpAction("settings.manage");
    const parsed = parsePlatformSettingForm(key, formRecord(formData));
    if (!parsed.ok) throw AppError.validation(parsed.fieldErrors, "Some values are not valid.");
    const written = await updatePlatformSetting(
      actor,
      { key, value: parsed.value, expectedVersion: formText(formData, "expectedVersion") ?? "" },
      auditRequestFrom(await adminRequestMeta()),
    );
    return {
      data: { key: written.key, version: written.version },
      message: `${definition.label} saved.`,
      // Feature flags change public copy (home, pricing...) and every area's menu: regenerate those pages now.
      revalidate: key === FEATURES_SETTING ? ["/admin/settings", ...FEATURE_DEPENDENT_PATHS] : ["/admin/settings"],
    };
  });
}
