"use server";

import type { FamilyFormState } from "@/components/family/action-state";
import { formString, runFamilyAction } from "@/components/family/server-action";
import { PAYMENT_STATUS_LABELS } from "@/components/parent/format";
import { requireRoleForAction } from "@/server/auth/guards";
import { refreshParentPayment } from "@/server/family";

/** "Check again" on the payment status page: asks the provider (verified path; rate-limited) and refreshes. */
export async function refreshPaymentAction(_state: FamilyFormState, formData: FormData): Promise<FamilyFormState> {
  return runFamilyAction(
    "family.parent.paymentRefresh",
    async () => {
      const actor = await requireRoleForAction("PARENT");
      const payment = await refreshParentPayment(actor, formString(formData, "paymentId"));
      return { message: `Status: ${PAYMENT_STATUS_LABELS[payment.status]}.` };
    },
    { revalidate: ["/parent/billing"] },
  );
}
