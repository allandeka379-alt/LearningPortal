"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { requireUserForAction } from "@/server/auth/guards";
import { SANDBOX_PAGE_OUTCOMES, simulateSandboxCheckout } from "@/server/billing/checkout";

const inputSchema = z.object({
  paymentId: z.uuid(),
  outcome: z.enum(SANDBOX_PAGE_OUTCOMES),
});

/**
 * DEV-ONLY: the payer's choice on the sandbox gateway page. Delivers the signed sandbox webhook through the real
 * webhook path, then sends the browser to the return URL like a real provider would. The service refuses in
 * production (404) and for payments that are not the caller's sandbox payments.
 */
export async function simulateSandboxPaymentAction(formData: FormData): Promise<void> {
  const actor = await requireUserForAction();
  const input = inputSchema.parse({ paymentId: formData.get("paymentId"), outcome: formData.get("outcome") });
  const { returnPath } = await simulateSandboxCheckout(actor.userId, input.paymentId, input.outcome);
  redirect(returnPath);
}
