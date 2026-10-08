"use server";

import { formString, runFamilyAction } from "@/components/family/server-action";
import type { CheckoutFormState } from "@/components/parent/checkout-state";
import { requireRoleForAction } from "@/server/auth/guards";
import { PARENT_PAYMENT_RESULT_PATH, startChildCheckout } from "@/server/family";

/**
 * "Subscribe for this child" (§21, §31): starts (or resumes) a checkout the parent pays for a linked child. Returns
 * where to go (the client navigates with GET, CSP `form-action 'self'`) or the mobile-money instructions.
 */
export async function startChildCheckoutAction(_state: CheckoutFormState, formData: FormData): Promise<CheckoutFormState> {
  return runFamilyAction("family.parent.checkout", async () => {
    const actor = await requireRoleForAction("PARENT");
    const result = await startChildCheckout(actor, {
      studentUserId: formString(formData, "studentUserId"),
      planPriceId: formString(formData, "planPriceId"),
      methodId: formString(formData, "methodId"),
      phone: formString(formData, "phone"),
      idempotencyKey: formString(formData, "idempotencyKey"),
    });
    return result.kind === "redirect"
      ? { kind: "redirect" as const, url: result.url, paymentId: result.paymentId }
      : {
          kind: "mobile" as const,
          instructions: result.instructions,
          paymentId: result.paymentId,
          resultHref: `${PARENT_PAYMENT_RESULT_PATH}?paymentId=${encodeURIComponent(result.paymentId)}`,
        };
  });
}
