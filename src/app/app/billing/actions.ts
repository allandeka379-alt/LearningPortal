"use server";

import { z } from "zod";
import type { CheckoutFormState, PaymentStatusView } from "@/components/billing/checkout-state";
import type { FormActionState } from "@/components/student/action-state";
import { requireOnboardedStudentForAction } from "@/server/auth/guards";
import type { ActionResult } from "@/server/lib/errors";
import { formString, runBillingAction } from "./_lib/action";
import { cancelStudentPlan, getStudentPaymentStatus, resumeStudentPlan, startStudentCheckout } from "./_lib/service";

/**
 * Student billing Server Actions (§31, §32). Thin: guard → service → `ActionResult`. The checkout returns where to
 * go (the client follows a provider page with a GET navigation, CSP `form-action 'self'`) or the mobile-money
 * instructions; it never accepts an amount.
 */

export async function startCheckoutAction(_state: CheckoutFormState, formData: FormData): Promise<CheckoutFormState> {
  return runBillingAction("billing.student.checkout", async () => {
    const actor = await requireOnboardedStudentForAction();
    return startStudentCheckout(actor, {
      purpose: formString(formData, "purpose"),
      planPriceId: formString(formData, "planPriceId"),
      studyPackId: formString(formData, "studyPackId"),
      methodId: formString(formData, "methodId"),
      phone: formString(formData, "phone"),
      idempotencyKey: formString(formData, "idempotencyKey"),
    });
  });
}

const statusOptionsSchema = z.object({ refresh: z.boolean().default(false) }).default({ refresh: false });

/**
 * Polled by the "check your phone" and result screens: the payment's stored status; with `refresh`, the provider is
 * asked first (rate-limited). Only the payer or the beneficiary may read it (NOT_FOUND otherwise).
 */
export async function checkPaymentStatusAction(paymentId: string, options?: { refresh: boolean }): Promise<ActionResult<PaymentStatusView>> {
  return runBillingAction("billing.student.paymentStatus", async () => {
    const actor = await requireOnboardedStudentForAction();
    const { refresh } = statusOptionsSchema.parse(options);
    return getStudentPaymentStatus(actor, paymentId, { refresh });
  });
}

/** "Cancel plan": stops at the end of the paid period (access continues until then). */
export async function cancelPlanAction(_state: FormActionState, formData: FormData): Promise<FormActionState> {
  return runBillingAction(
    "billing.student.cancel",
    async () => {
      const actor = await requireOnboardedStudentForAction();
      await cancelStudentPlan(actor, formString(formData, "subscriptionId"));
      return { message: "Your plan won't continue after the current period. You keep access until then." };
    },
    { revalidate: ["/app/billing"] },
  );
}

/** "Keep my plan": undoes a cancel-at-period-end while the plan is still running. */
export async function resumePlanAction(_state: FormActionState, formData: FormData): Promise<FormActionState> {
  return runBillingAction(
    "billing.student.resume",
    async () => {
      const actor = await requireOnboardedStudentForAction();
      await resumeStudentPlan(actor, formString(formData, "subscriptionId"));
      return { message: "Your plan will continue. Renew it before it ends to keep access." };
    },
    { revalidate: ["/app/billing"] },
  );
}
