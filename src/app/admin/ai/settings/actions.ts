"use server";

import type { AdminActionState } from "@/components/admin/form-state";
import { requireAdminAction, requireAdminStepUpAction } from "@/components/admin/guards";
import { adminRequestMeta, formText, runAdminAction } from "@/components/admin/server-action";
import { requireFeature } from "@/server/features";
import { parseBudgetForm, parseKillSwitchForm, parseLimitsForm, parseMarkingForm, parseRoutingForm } from "@/server/cms/settings/ai-forms";
import { AI_STEP_UP_KEYS, aiSettingWriteScope, isAiEditableKey, updateAiSetting, type AiEditableKey } from "@/server/cms/settings/ai-settings";
import type { SettingFormResult, SettingFormValues } from "@/server/cms/settings/forms";
import { auditRequestFrom } from "@/server/cms/users/service";
import { AppError } from "@/server/lib/errors";

/**
 * AI settings Server Action (thin). `ai.admin` at scope "all" = SUPER_ADMIN; ADMIN ("restricted") may operate only the
 * kill switch (ARCHITECTURE §5.2). The kill switch and the daily budget also need a password confirmation within the
 * last 15 minutes (step-up). The form is converted here, validated with the
 * gateway's Zod schemas and written by the service (version check, audit, config cache reset).
 */

const MESSAGES: Readonly<Record<AiEditableKey, string>> = {
  "ai.enabled": "Kill switch saved.",
  "ai.routing": "Model routing saved. New requests use it within a minute on every server.",
  "ai.limits": "Conversation limits saved.",
  "ai.budget": "Daily budget saved.",
  "ai.marking.minConfidence": "Marking threshold saved.",
};

function formRecord(formData: FormData): SettingFormValues {
  const values: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string" && !key.startsWith("$ACTION")) values[key] = value.slice(0, 2000);
  }
  return values;
}

function parseForKey(key: AiEditableKey, values: SettingFormValues): SettingFormResult & { pricingRows?: (string | null)[] } {
  switch (key) {
    case "ai.enabled":
      return parseKillSwitchForm(values);
    case "ai.routing":
      return parseRoutingForm(values);
    case "ai.limits":
      return parseLimitsForm(values);
    case "ai.budget":
      return parseBudgetForm(values);
    case "ai.marking.minConfidence":
      return parseMarkingForm(values);
  }
}

export async function saveAiSettingAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.ai.saveSetting", formData, async () => {
    await requireFeature("ai"); // 404 while AI is switched off (features.ai)
    // Permission first: callers without ai.admin learn nothing about which keys exist.
    let actor = await requireAdminAction("ai.admin", "restricted");
    const key = formText(formData, "key") ?? "";
    if (!isAiEditableKey(key)) throw new AppError("BAD_REQUEST", "Unknown AI setting.");
    const scope = aiSettingWriteScope(key);
    actor = AI_STEP_UP_KEYS.has(key) ? await requireAdminStepUpAction("ai.admin", scope) : await requireAdminAction("ai.admin", scope);
    const parsed = parseForKey(key, formRecord(formData));
    if (!parsed.ok) throw AppError.validation(parsed.fieldErrors, "Some values are not valid.");
    const written = await updateAiSetting(
      actor,
      { key, value: parsed.value, expectedVersion: formText(formData, "expectedVersion") ?? "" },
      auditRequestFrom(await adminRequestMeta()),
      parsed.pricingRows ? { pricingRows: parsed.pricingRows } : {},
    );
    const message = key === "ai.enabled" ? (written.value === true ? "AI is switched on." : "AI is switched off for every feature.") : MESSAGES[key];
    return { data: { key: written.key, version: written.version }, message, revalidate: ["/admin/ai/settings", "/admin/ai/usage"] };
  });
}
