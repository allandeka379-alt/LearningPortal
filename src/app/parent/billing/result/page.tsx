import { CircleCheck, Clock, Smartphone } from "lucide-react";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { formatMoney, PAYMENT_STATUS_LABELS, PAYMENT_STATUS_TONES } from "@/components/parent/format";
import { orNotFound } from "@/components/parent/not-found";
import { RefreshPaymentForm } from "@/components/parent/RefreshPaymentForm";
import { formatInstantDate } from "@/components/student/format";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { requireRole } from "@/server/auth/guards";
import { getParentPayment } from "@/server/family";
import { refreshPaymentAction } from "../actions";

export const metadata: Metadata = { title: "Payment status" };

/**
 * Status of one payment the parent made (§32): shows the stored status (only a verified webhook or provider poll
 * changes it), mobile-money instructions while waiting, and "Check again".
 */
export default async function ParentPaymentResultPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const paymentId = typeof query.paymentId === "string" ? query.paymentId : "";
  const actor = await requireRole("PARENT", { next: `/parent/billing/result?paymentId=${encodeURIComponent(paymentId)}` });
  const payment = await orNotFound(getParentPayment(actor, paymentId));
  const childHref = payment.beneficiaryUserId ? `/parent/children/${payment.beneficiaryUserId}` : "/parent";

  return (
    <Container size="reading" className="space-y-6 pb-10">
      <PageHeader
        title="Payment status"
        breadcrumbs={[{ label: "Payments", href: "/parent/billing" }, { label: "Payment status" }]}
        className="pb-0"
      />

      {payment.status === "SUCCESSFUL" && (
        <Alert tone="success" icon={<CircleCheck aria-hidden="true" />} title="Payment received">
          Thank you. {payment.childName}&rsquo;s plan updates automatically.
        </Alert>
      )}
      {payment.status === "PENDING" && (
        <Alert tone="info" icon={payment.instructions ? <Smartphone aria-hidden="true" /> : <Clock aria-hidden="true" />} title="Waiting for the payment to be confirmed">
          {payment.instructions ?? "If you've paid, confirmation usually arrives within a minute or two."}
        </Alert>
      )}
      {(payment.status === "FAILED" || payment.status === "CANCELLED") && (
        <Alert tone="neutral" title="This payment didn't go through">
          This payment wasn&rsquo;t completed. You can try again with the same or another payment method.
        </Alert>
      )}

      <Card>
        <CardBody>
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-muted">For</dt>
              <dd className="font-medium text-text">
                {payment.itemName ?? "Plan"} · {payment.childName}
              </dd>
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
              <dt className="text-muted">Started</dt>
              <dd className="text-text">{formatInstantDate(payment.createdAt, actor.timeZone)}</dd>
            </div>
            {payment.maskedMsisdn && (
              <div>
                <dt className="text-muted">Mobile money number</dt>
                <dd className="text-text tabular-nums">{payment.maskedMsisdn}</dd>
              </div>
            )}
            {payment.receiptNumber && (
              <div>
                <dt className="text-muted">Receipt</dt>
                <dd className="text-text">{payment.receiptNumber}</dd>
              </div>
            )}
          </dl>
        </CardBody>
      </Card>

      <div className="flex flex-wrap items-center gap-3">
        {payment.status === "PENDING" && <RefreshPaymentForm paymentId={payment.id} action={refreshPaymentAction} />}
        {(payment.status === "FAILED" || payment.status === "CANCELLED") && payment.beneficiaryUserId && (
          <ButtonLink href={`/parent/children/${payment.beneficiaryUserId}/subscribe`}>Try again</ButtonLink>
        )}
        <ButtonLink href={childHref} variant="ghost">
          Back to {payment.childName}
        </ButtonLink>
      </div>
    </Container>
  );
}
