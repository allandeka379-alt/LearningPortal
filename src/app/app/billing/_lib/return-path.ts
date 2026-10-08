import "server-only";
import { z } from "zod";
import { CHECKOUT_RESULT_PATH } from "@/server/billing/checkout";
import { db } from "@/server/db";
import { PARENT_PAYMENT_RESULT_PATH } from "@/server/family/billing";

/**
 * Where the provider-return route sends the payer's browser (ARCHITECTURE §7.3): the student result page, or the
 * parent's when a parent paid for a child (payer ≠ beneficiary; the student area would bounce a parent away).
 *
 * The parties always come from the Payment row, never from the URL. The caller (the browser's signed-in user, when the
 * session cookie came along) only narrows the choice: a signed-in caller who is NOT the payer (e.g. the student who
 * benefits, opening the parent's return link) gets the student page, which shows nothing to strangers. An anonymous
 * caller (session expired during checkout) is assumed to be the payer the provider sent back: the parent page asks
 * them to sign in and then shows the payment to its payer only.
 */

/** The payment parties the decision needs. */
export interface PaymentParties {
  payerUserId: string;
  beneficiaryUserId: string | null;
}

/**
 * Pure: the result page for a payment's parties and the caller (`undefined`/`null` = not signed in). Unknown payment →
 * the student page, which shows nothing to strangers.
 */
export function resultPathForParties(parties: PaymentParties | null, callerUserId: string | null = null): string {
  const parentCheckout = parties !== null && parties.beneficiaryUserId !== null && parties.payerUserId !== parties.beneficiaryUserId;
  if (!parentCheckout) return CHECKOUT_RESULT_PATH;
  return callerUserId === null || callerUserId === parties.payerUserId ? PARENT_PAYMENT_RESULT_PATH : CHECKOUT_RESULT_PATH;
}

const uuid = z.uuid();

export async function resultPathForPayment(paymentId: string, callerUserId: string | null = null): Promise<string> {
  if (!uuid.safeParse(paymentId).success) return CHECKOUT_RESULT_PATH;
  const parties = await db.payment.findUnique({ where: { id: paymentId }, select: { payerUserId: true, beneficiaryUserId: true } });
  return resultPathForParties(parties, callerUserId);
}
