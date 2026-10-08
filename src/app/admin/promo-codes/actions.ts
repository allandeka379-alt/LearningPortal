"use server";

import type { AdminActionState } from "@/components/admin/form-state";
import { requireAdminAction, requireAdminStepUpAction } from "@/components/admin/guards";
import { adminRequestMeta, formFlag, formList, formText, runAdminAction } from "@/components/admin/server-action";
import { createPromoCode, deletePromoCode, updatePromoCode } from "@/server/cms/commerce/promo-codes";
import { auditRequestFrom } from "@/server/cms/users/service";

/**
 * Promo code Server Actions (thin): `billing.manage` at scope "all"; creating or changing a code (discounts, free days)
 * also needs a recent password confirmation (step-up, PAY-8). The service validates within the DB CHECKs and audits.
 */

async function auditRequest() {
  return auditRequestFrom(await adminRequestMeta());
}

function ruleFields(formData: FormData) {
  return {
    description: formText(formData, "description"),
    audience: formText(formData, "audience") as never,
    appliesToStudyPacks: formFlag(formData, "appliesToStudyPacks"),
    newCustomersOnly: formFlag(formData, "newCustomersOnly"),
    maxRedemptions: formText(formData, "maxRedemptions"),
    validFrom: formText(formData, "validFrom"),
    validTo: formText(formData, "validTo"),
    isActive: formFlag(formData, "isActive"),
    planIds: formList(formData, "planIds"),
  };
}

/** Value fields are only sent while the discount may still change (unused codes). */
function valueFields(formData: FormData) {
  if (!formData.has("discountType")) return {};
  return {
    code: formText(formData, "code") ?? "",
    discountType: (formText(formData, "discountType") ?? "") as never,
    percentOff: formText(formData, "percentOff"),
    amountOff: formText(formData, "amountOff"),
    currency: formText(formData, "currency"),
    freeDays: formText(formData, "freeDays"),
    grantPlanId: formText(formData, "grantPlanId"),
  };
}

export async function createPromoCodeAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.promoCodes.create", formData, async () => {
    const actor = await requireAdminStepUpAction("billing.manage");
    const created = await createPromoCode(
      actor,
      { code: "", discountType: "" as never, ...valueFields(formData), ...ruleFields(formData) },
      await auditRequest(),
    );
    return { data: created, message: `Promo code ${created.code} created.`, redirectTo: `/admin/promo-codes/${created.id}`, revalidate: ["/admin/promo-codes"] };
  });
}

export async function updatePromoCodeAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.promoCodes.update", formData, async () => {
    const actor = await requireAdminStepUpAction("billing.manage");
    const promoCodeId = formText(formData, "promoCodeId");
    const result = await updatePromoCode(
      actor,
      { promoCodeId: promoCodeId ?? "", expectedUpdatedAt: formText(formData, "expectedUpdatedAt") ?? "", ...valueFields(formData), ...ruleFields(formData) },
      await auditRequest(),
    );
    return {
      data: result,
      message: result.changed.length === 0 ? "Nothing changed." : "Promo code saved.",
      revalidate: promoCodeId ? ["/admin/promo-codes", `/admin/promo-codes/${promoCodeId}`] : ["/admin/promo-codes"],
    };
  });
}

export async function deletePromoCodeAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.promoCodes.delete", formData, async () => {
    const actor = await requireAdminAction("billing.manage");
    const result = await deletePromoCode(actor, { promoCodeId: formText(formData, "promoCodeId") ?? "", reason: formText(formData, "reason") }, await auditRequest());
    return { data: result, message: `Promo code ${result.code} deleted.`, redirectTo: "/admin/promo-codes", revalidate: ["/admin/promo-codes"] };
  });
}
