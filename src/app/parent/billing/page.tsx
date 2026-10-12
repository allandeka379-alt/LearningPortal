import { BadgeCheck, CreditCard, Receipt } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { formatMoney, PAYMENT_STATUS_LABELS, PAYMENT_STATUS_TONES } from "@/components/parent/format";
import { formatInstantDate } from "@/components/student/format";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { requireRole } from "@/server/auth/guards";
import { childrenWithLifetimeAccess, listParentChildren, listParentPayments } from "@/server/family";

export const metadata: Metadata = { title: "Payments" };

/**
 * /parent/billing (§21, §31): pay once for any linked child's full access (owner decision 2026-10-07), and the payments
 * this parent made (payer-scoped).
 */
export default async function ParentBillingPage() {
  const actor = await requireRole("PARENT", { next: "/parent/billing" });
  const [children, payments] = await Promise.all([listParentChildren(actor), listParentPayments(actor)]);
  const owned = await childrenWithLifetimeAccess(actor, children.map((child) => child.studentUserId));

  return (
    <Container size="reading" className="space-y-6 pb-10">
      <PageHeader title="Payments" description="Pay for a child's full access and see what you've paid." className="pb-0" />

      <Card as="section" aria-labelledby="billing-children">
        <CardHeader titleAs="h2" title={<span id="billing-children">Pay for a child</span>} />
        <CardBody>
          {children.length === 0 ? (
            <p className="text-sm text-muted">
              Link a child first. <Link href="/parent/link" className="font-semibold text-primary underline-offset-4 hover:underline">Link a child</Link>
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {children.map((child) => (
                <li key={child.linkId} className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                  <span className="font-medium text-text">{child.name}</span>
                  {owned.has(child.studentUserId) ? (
                    <Badge tone="success" size="sm" icon={<BadgeCheck aria-hidden="true" />}>
                      Has full access
                    </Badge>
                  ) : (
                    <ButtonLink href={`/parent/children/${child.studentUserId}/subscribe`} variant="outline" size="sm" iconStart={<CreditCard aria-hidden="true" />}>
                      Pay <span className="sr-only">for {child.name}</span>
                    </ButtonLink>
                  )}
                </li>
              ))}
            </ul>
          )}
        </CardBody>
      </Card>

      <section aria-labelledby="billing-history" className="space-y-3">
        <h2 id="billing-history" className="text-lg font-semibold text-text">
          Your payments
        </h2>
        {payments.length === 0 ? (
          <EmptyState titleAs="h3" icon={<Receipt aria-hidden="true" />} title="No payments yet" description="Payments you make for a child appear here." />
        ) : (
          <ul className="divide-y divide-border rounded-card border border-border bg-surface">
            {payments.map((payment) => (
              <li key={payment.id}>
                <Link
                  href={`/parent/billing/result?paymentId=${payment.id}`}
                  className="flex min-h-11 flex-wrap items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-subtle"
                >
                  <span className="min-w-0">
                    <span className="block font-medium text-text">
                      {payment.itemName ?? "Plan"} for {payment.childName}
                    </span>
                    <span className="block text-sm text-muted">
                      {formatInstantDate(payment.createdAt, actor.timeZone)}
                      {payment.receiptNumber ? ` · Receipt ${payment.receiptNumber}` : ""}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-3">
                    <span className="font-semibold text-text tabular-nums">{formatMoney(payment.amountMinor, payment.currency)}</span>
                    <Badge tone={PAYMENT_STATUS_TONES[payment.status]} size="sm">
                      {PAYMENT_STATUS_LABELS[payment.status]}
                    </Badge>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </Container>
  );
}
