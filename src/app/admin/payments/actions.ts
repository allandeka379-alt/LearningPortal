"use server";

import type { AdminActionState } from "@/components/admin/form-state";
import { formatMoneyMinor } from "@/components/admin/format";
import { requireAdminAction, requireAdminStepUpAction } from "@/components/admin/guards";
import { adminRequestMeta, formText, runAdminAction } from "@/components/admin/server-action";
import { markPaymentDisputed, refundPayment } from "@/server/cms/commerce/payments";
import { auditRequestFrom } from "@/server/cms/users/service";
import { AppError } from "@/server/lib/errors";

/**
 * Payment Server Actions (thin). Refunds need `payments.refund` (ADMIN / SUPER_ADMIN) AND a password confirmation
 * within the last 15 minutes (ARCHITECTURE §5.2 "step-up"); disputes need `payments.refund`. The services run the
 * payment state machine, write the PaymentEvent and audit.
 */

async function auditRequest() {
  return auditRequestFrom(await adminRequestMeta());
}

function paths(paymentId: string | undefined): string[] {
  return paymentId ? ["/admin/payments", `/admin/payments/${paymentId}`] : ["/admin/payments"];
}

export async function refundPaymentAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.payments.refund", formData, async () => {
    const actor = await requireAdminStepUpAction("payments.refund");
    const paymentId = formText(formData, "paymentId");
    const result = await refundPayment(
      actor,
      {
        paymentId: paymentId ?? "",
        method: (formText(formData, "method") ?? "") as never,
        amount: formText(formData, "amount"),
        reason: formText(formData, "reason") ?? "",
        externalReference: formText(formData, "externalReference"),
      },
      await auditRequest(),
    );
    if (result.outcome === "MANUAL_REQUIRED") {
      throw new AppError(
        "BAD_REQUEST",
        "No refund was made: this provider cannot refund through its API. Refund the payer in the provider's dashboard, then record it here as a manual refund.",
      );
    }
    const currency = formText(formData, "currency") ?? "";
    const amount = formatMoneyMinor(result.refundedMinor, currency || null);
    const message = result.full
      ? `Refund of ${amount} recorded. The payment is fully refunded${result.needsReview ? " and flagged for review: check the subscription's access" : ""}.`
      : `Partial refund of ${amount} recorded${result.providerStatus === "PENDING" ? " (the provider is still processing it)" : ""}.`;
    return { data: result, message, revalidate: paths(paymentId) };
  });
}

export async function markDisputedAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.payments.dispute", formData, async () => {
    const actor = await requireAdminAction("payments.refund");
    const paymentId = formText(formData, "paymentId");
    const result = await markPaymentDisputed(actor, { paymentId: paymentId ?? "", reason: formText(formData, "reason") ?? "" }, await auditRequest());
    return { data: result, message: "Payment marked as disputed.", revalidate: paths(paymentId) };
  });
}
