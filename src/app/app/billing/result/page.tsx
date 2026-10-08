import { CircleCheck, Clock, Smartphone } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EntitlementList } from "@/components/billing/EntitlementList";
import { formatMoney, PAYMENT_STATUS_LABELS, PAYMENT_STATUS_TONES } from "@/components/billing/format";
import { PaymentStatusWatcher } from "@/components/billing/PaymentStatusWatcher";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { formatInstantDate } from "@/components/student/format";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { isAppError } from "@/server/lib/errors";
import { checkPaymentStatusAction } from "../actions";
import { getStudentPaymentResult } from "../_lib/service";

export const metadata: Metadata = { title: "Payment status" };

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value) ?? "";
}

/**
 * Payment result (§32; where /billing/return sends the payer). Shows the STORED status only: the return URL never
 * fulfils, a verified webhook or provider poll does. PENDING keeps checking by itself (then "Check again");
 * SUCCESSFUL shows what was unlocked and until when; FAILED / CANCELLED explain why and offer a retry. Only the payer
 * or the beneficiary can see a payment (anyone else gets "not found").
 */
export default async function PaymentResultPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const paymentId = first(params.paymentId);
  const actor = await requireOnboardedStudent({ next: `/app/billing/result?paymentId=${encodeURIComponent(paymentId)}` });
  let payment;
  try {
    payment = await getStudentPaymentResult(actor, paymentId);
  } catch (error) {
    if (isAppError(error) && error.code === "NOT_FOUND") notFound();
    throw error;
  }
  const userCancelled = first(params.cancelled) === "1";
  // The provider sent the payer back with "cancelled" (e.g. Stripe's cancel link) and nothing is confirmed yet.
  const leftProviderPage = userCancelled && payment.status === "PENDING" && payment.paidByYou;
  const canRetry = payment.paidByYou && (payment.status === "FAILED" || payment.status === "CANCELLED" || leftProviderPage);
  const date = (value: Date) => formatInstantDate(value, actor.timeZone);
  const retryHref = payment.studyPack ? `/app/billing/checkout?pack=${payment.studyPack.id}` : "/app/billing/checkout";

  return (
    <Container size="reading" className="space-y-6 pb-10">
      <PageHeader
        title="Payment status"
        breadcrumbs={[{ label: "Plan & billing", href: "/app/billing" }, { label: "Payment status" }]}
        className="pb-0"
      />

      {payment.status === "SUCCESSFUL" && (
        <Alert tone="success" icon={<CircleCheck aria-hidden="true" />} title="Payment received">
          {payment.purpose === "STUDY_PACK"
            ? `Thank you. ${payment.itemName ?? "Your study pack"} is unlocked on your account.`
            : payment.purpose === "PLAN_PURCHASE" && !payment.servicePeriodEnd
              ? `Thank you. ${payment.itemName ?? "Full access"} is unlocked on your account for good: nothing renews and nothing is charged again.`
              : payment.servicePeriodEnd
              ? `Thank you. ${payment.itemName ?? "Your plan"} is active until ${date(payment.servicePeriodEnd)}.`
              : `Thank you. ${payment.itemName ?? "Your plan"} is now active.`}
        </Alert>
      )}

      {payment.status === "PENDING" && leftProviderPage && (
        <Alert tone="neutral" title="Payment not finished">
          You left the payment page before paying, so nothing has been charged. You can try again with the same or another
          payment method. If you did pay, it shows as paid under Payments on Plan &amp; billing once it&rsquo;s confirmed.
        </Alert>
      )}

      {payment.status === "PENDING" && !leftProviderPage && (
        <div className="space-y-3">
          <Alert
            tone="info"
            icon={payment.instructions ? <Smartphone aria-hidden="true" /> : <Clock aria-hidden="true" />}
            title={payment.instructions ? "Approve the payment on your phone" : "Waiting for the payment to be confirmed"}
          >
            {payment.instructions ?? "If you've paid, confirmation usually arrives within a minute or two."}
          </Alert>
          <PaymentStatusWatcher paymentId={payment.id} check={checkPaymentStatusAction} />
        </div>
      )}

      {(payment.status === "FAILED" || payment.status === "CANCELLED") && (
        <Alert tone="neutral" title={userCancelled || payment.status === "CANCELLED" ? "Payment cancelled" : "Payment not completed"}>
          {payment.failureMessage}
        </Alert>
      )}

      {payment.status === "REFUNDED" && (
        <Alert tone="neutral" title="Payment refunded">
          This payment was refunded in full.
        </Alert>
      )}

      <Card as="section" aria-labelledby="payment-details-heading">
        <CardHeader titleAs="h2" title={<span id="payment-details-heading">Details</span>} />
        <CardBody>
          <dl className="grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-muted">For</dt>
              <dd className="font-medium text-text">{payment.itemName ?? (payment.purpose === "STUDY_PACK" ? "Study pack" : "Plan")}</dd>
            </div>
            <div>
              <dt className="text-muted">Amount</dt>
              <dd className="font-medium text-text tabular-nums">{formatMoney(payment.amountMinor, payment.currency)}</dd>
            </div>
            <div>
              <dt className="text-muted">Status</dt>
              <dd>
                <Badge tone={PAYMENT_STATUS_TONES[payment.status]} size="sm">
                  {PAYMENT_STATUS_LABELS[payment.status]}
                </Badge>
              </dd>
            </div>
            <div>
              <dt className="text-muted">Method</dt>
              <dd className="text-text">
                {payment.methodLabel}
                {payment.maskedMsisdn ? ` · ${payment.maskedMsisdn}` : ""}
              </dd>
            </div>
            <div>
              <dt className="text-muted">Started</dt>
              <dd className="text-text">{date(payment.createdAt)}</dd>
            </div>
            {payment.paidAt && (
              <div>
                <dt className="text-muted">Paid</dt>
                <dd className="text-text">{date(payment.paidAt)}</dd>
              </div>
            )}
            {payment.receiptNumber && (
              <div>
                <dt className="text-muted">Receipt number</dt>
                <dd className="font-medium text-text tabular-nums">{payment.receiptNumber}</dd>
              </div>
            )}
            {!payment.paidByYou && (
              <div>
                <dt className="text-muted">Paid by</dt>
                <dd className="text-text">Your parent or guardian</dd>
              </div>
            )}
            {payment.refundedAmountMinor > 0 && (
              <div>
                <dt className="text-muted">Refunded</dt>
                <dd className="text-text tabular-nums">{formatMoney(payment.refundedAmountMinor, payment.currency)}</dd>
              </div>
            )}
          </dl>
        </CardBody>
      </Card>

      {payment.unlocked && payment.unlocked.length > 0 && (
        <Card as="section" aria-labelledby="unlocked-heading">
          <CardHeader titleAs="h2" title={<span id="unlocked-heading">What you&rsquo;ve unlocked</span>} />
          <CardBody>
            <EntitlementList lines={payment.unlocked} />
            {payment.studyPack && <p className="mt-4 text-sm text-muted">Study pack content is unlocked in the subjects the pack covers.</p>}
          </CardBody>
        </Card>
      )}

      <div className="flex flex-wrap items-center gap-3">
        {payment.status === "SUCCESSFUL" && <ButtonLink href="/app">Start studying</ButtonLink>}
        {canRetry && <ButtonLink href={retryHref}>Try again</ButtonLink>}
        <ButtonLink href="/app/billing" variant={payment.status === "SUCCESSFUL" ? "outline" : "ghost"}>
          Plan & billing
        </ButtonLink>
      </div>
    </Container>
  );
}
