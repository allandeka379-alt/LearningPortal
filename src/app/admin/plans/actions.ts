"use server";

import type { AdminActionState } from "@/components/admin/form-state";
import { requireAdminStepUpAction } from "@/components/admin/guards";
import { adminRequestMeta, formFlag, formText, runAdminAction } from "@/components/admin/server-action";
import { createPlanPrice, setPlanPriceActive, updatePlanDetails, updatePlanEntitlements } from "@/server/cms/commerce/plans";
import { auditRequestFrom } from "@/server/cms/users/service";
import { AppError } from "@/server/lib/errors";

/**
 * Plans & prices Server Actions (thin): `billing.manage` at scope "all" (ADMIN / SUPER_ADMIN) re-checked on every
 * call, with a password confirmation within the last 15 minutes (step-up, ARCHITECTURE §5.1, PAY-8: prices, trial days
 * and entitlements decide what is given away); the services in src/server/cms/commerce validate, enforce the
 * price-history rules and audit.
 */

async function auditRequest() {
  return auditRequestFrom(await adminRequestMeta());
}

function planPaths(planId: string | undefined): string[] {
  return planId ? ["/admin/plans", `/admin/plans/${planId}`] : ["/admin/plans"];
}

export async function updatePlanDetailsAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.plans.updateDetails", formData, async () => {
    const actor = await requireAdminStepUpAction("billing.manage");
    const planId = formText(formData, "planId");
    const highlights = formData.get("highlights");
    const result = await updatePlanDetails(
      actor,
      {
        planId: planId ?? "",
        expectedUpdatedAt: formText(formData, "expectedUpdatedAt") ?? "",
        name: formText(formData, "name") ?? "",
        tagline: formText(formData, "tagline"),
        description: formText(formData, "description"),
        highlights: typeof highlights === "string" ? highlights : "",
        isPublic: formFlag(formData, "isPublic"),
        isActive: formFlag(formData, "isActive"),
        sortOrder: formText(formData, "sortOrder") ?? "",
        trialDays: formText(formData, "trialDays") ?? "",
      },
      await auditRequest(),
    );
    return {
      data: { changed: result.changed },
      message: result.changed.length === 0 ? "Nothing changed." : "Plan details saved.",
      revalidate: planPaths(planId),
    };
  });
}

export async function updatePlanEntitlementsAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.plans.updateEntitlements", formData, async () => {
    const actor = await requireAdminStepUpAction("billing.manage");
    const planId = formText(formData, "planId");
    let entitlements: unknown;
    try {
      entitlements = JSON.parse(formText(formData, "entitlements") ?? "");
    } catch {
      throw AppError.validation({ entitlements: ["The entitlements could not be read. Reload the page and try again."] });
    }
    const result = await updatePlanEntitlements(
      actor,
      { planId: planId ?? "", expectedUpdatedAt: formText(formData, "expectedUpdatedAt") ?? "", entitlements: entitlements as never },
      await auditRequest(),
    );
    const count = result.changed.length;
    return {
      data: { changed: result.changed },
      message: count === 0 ? "Nothing changed." : `Entitlements saved (${count} ${count === 1 ? "change" : "changes"}).`,
      revalidate: planPaths(planId),
    };
  });
}

export async function createPlanPriceAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.plans.createPrice", formData, async () => {
    const actor = await requireAdminStepUpAction("billing.manage");
    const planId = formText(formData, "planId");
    const result = await createPlanPrice(
      actor,
      {
        planId: planId ?? "",
        currency: formText(formData, "currency") ?? "",
        amount: formText(formData, "amount") ?? "",
        interval: (formText(formData, "interval") ?? "") as never,
        intervalCount: formText(formData, "intervalCount"),
        periodDays: formText(formData, "periodDays"),
        perSeat: formFlag(formData, "perSeat"),
        minSeats: formText(formData, "minSeats"),
        label: formText(formData, "label"),
        countryId: formText(formData, "countryId"),
        validFrom: formText(formData, "validFrom"),
        validTo: formText(formData, "validTo"),
        sortOrder: formText(formData, "sortOrder"),
        replacesPriceId: formText(formData, "replacesPriceId"),
      },
      await auditRequest(),
    );
    return {
      data: result,
      message: result.replacedPriceId ? "New price added; the old price is replaced." : "Price added.",
      revalidate: planPaths(planId),
    };
  });
}

export async function setPlanPriceActiveAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.plans.setPriceActive", formData, async () => {
    const actor = await requireAdminStepUpAction("billing.manage");
    const planId = formText(formData, "planId");
    const active = formText(formData, "active") === "true";
    const result = await setPlanPriceActive(actor, { priceId: formText(formData, "priceId") ?? "", active, reason: formText(formData, "reason") }, await auditRequest());
    return {
      data: result,
      message: !result.changed ? "Nothing changed." : active ? "Price is on sale again." : "Price taken off sale. Existing subscriptions keep their price.",
      revalidate: planPaths(planId),
    };
  });
}
