import { randomUUID } from "node:crypto";
import { BadgeCheck, CreditCard } from "lucide-react";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { formatInstantDate } from "@/components/student/format";
import { CheckoutForm } from "@/components/parent/CheckoutForm";
import { orNotFound } from "@/components/parent/not-found";
import { Alert } from "@/components/ui/Alert";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { requireRole } from "@/server/auth/guards";
import { getChildCheckoutOptions } from "@/server/family";
import { startChildCheckoutAction } from "./actions";

export const metadata: Metadata = { title: "Pay for your child" };

/**
 * "Pay for this child" (§21, §31, §32; owner decision 2026-10-07): the parent pays once, the child's account gets full
 * access (no subscription, nothing renews). Plans and prices come from the admin-managed catalogue (never hard-coded);
 * methods are the enabled providers (Paynow: EcoCash, OneMoney, cards). A child who already owns full access is shown
 * as such instead of a form.
 */
export default async function SubscribeForChildPage({ params }: { params: Promise<{ studentId: string }> }) {
  const { studentId } = await params;
  const actor = await requireRole("PARENT", { next: `/parent/children/${studentId}/subscribe` });
  const options = await orNotFound(getChildCheckoutOptions(actor, studentId));
  const { child, plans, methods, currentSubscription, purchase } = options;
  const date = (value: Date) => formatInstantDate(value, actor.timeZone);
  const backHref = `/parent/children/${child.studentUserId}`;

  return (
    <Container size="reading" className="space-y-6 pb-10">
      <PageHeader
        title={`Pay for ${child.name}`}
        breadcrumbs={[{ label: "Your children", href: "/parent" }, { label: child.name, href: backHref }, { label: "Pay" }]}
        description={`You pay once; ${child.name}'s account gets full access. Nothing renews and nothing is charged again.`}
        className="pb-0"
      />

      {purchase && (
        <Alert tone="success" icon={<BadgeCheck aria-hidden="true" />} title={`${child.name} has ${purchase.planName}`}>
          {`Since ${date(purchase.since)}${purchase.endsAt ? `, until ${date(purchase.endsAt)}` : ", for good"}.`}
          {purchase.paidByYou ? " You paid for it." : ""}
        </Alert>
      )}

      {currentSubscription && currentSubscription.accessEndsAt && (
        <Alert tone="neutral" title={`Earlier plan: ${currentSubscription.planName}`}>
          {`Access runs until ${date(currentSubscription.accessEndsAt)}. It does not renew.`}
          {currentSubscription.paidByYou ? " You paid for it." : ""}
        </Alert>
      )}

      {plans.length === 0 && purchase && !purchase.endsAt ? (
        <EmptyState
          icon={<BadgeCheck aria-hidden="true" />}
          title="Nothing more to pay"
          description={`${child.name} already has full access for good.`}
          action={
            <ButtonLink href={backHref} variant="outline">
              Back to {child.name}
            </ButtonLink>
          }
        />
      ) : plans.length === 0 || methods.length === 0 ? (
        <EmptyState
          icon={<CreditCard aria-hidden="true" />}
          title={plans.length === 0 ? "Full access isn't on sale right now" : "Online payment isn't available right now"}
          description="Please try again later, or contact us if you need help."
          action={
            <ButtonLink href={backHref} variant="outline">
              Back to {child.name}
            </ButtonLink>
          }
        />
      ) : (
        <Card>
          <CardBody>
            <CheckoutForm
              studentUserId={child.studentUserId}
              childName={child.name}
              plans={plans}
              methods={methods}
              action={startChildCheckoutAction}
              idempotencyKey={randomUUID()}
            />
          </CardBody>
        </Card>
      )}
    </Container>
  );
}
