import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { z } from "zod";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { MAIN_CONTENT_ID } from "@/components/layout/SkipLink";
import { Alert } from "@/components/ui/Alert";
import { Badge, type BadgeTone } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import type { PaymentStatus } from "@/generated/prisma/client";
import { DEFAULT_LOCALE } from "@/lib/config";
import { requireUser } from "@/server/auth/guards";
import { getSandboxCheckoutView } from "@/server/billing/checkout";
import { simulateSandboxPaymentAction } from "./actions";

/**
 * DEV-ONLY sandbox gateway page (ARCHITECTURE §7.1): where the sandbox provider "redirects" the payer. The payer picks
 * an outcome; the action delivers a signed sandbox webhook through the real webhook path and continues to the return
 * URL. 404 in production (here, in `src/app/dev/layout.tsx` and in the service).
 */

export const metadata: Metadata = {
  title: "Sandbox checkout",
  robots: { index: false, follow: false },
};

const STATUS_TONE: Record<PaymentStatus, BadgeTone> = {
  PENDING: "warning",
  SUCCESSFUL: "success",
  FAILED: "danger",
  CANCELLED: "neutral",
  REFUNDED: "info",
};

const STATUS_LABEL: Record<PaymentStatus, string> = {
  PENDING: "Waiting for you",
  SUCCESSFUL: "Paid",
  FAILED: "Failed",
  CANCELLED: "Cancelled",
  REFUNDED: "Refunded",
};

function formatAmount(amountMinor: number, currency: string): string {
  try {
    return new Intl.NumberFormat(DEFAULT_LOCALE, { style: "currency", currency }).format(amountMinor / 100);
  } catch {
    return `${currency} ${(amountMinor / 100).toFixed(2)}`;
  }
}

export default async function SandboxCheckoutPage({ params }: { params: Promise<{ paymentId: string }> }) {
  if (process.env.NODE_ENV === "production") notFound();
  const { paymentId } = await params;
  if (!z.uuid().safeParse(paymentId).success) notFound();
  const actor = await requireUser({ next: `/dev/sandbox-checkout/${paymentId}` });
  const view = await getSandboxCheckoutView(actor.userId, paymentId);
  if (!view) notFound();
  const mobile = view.method === "ecocash" || view.method === "onemoney";

  return (
    <main id={MAIN_CONTENT_ID} tabIndex={-1}>
      <Container size="reading" className="pb-12">
        <PageHeader
          eyebrow="Developer sandbox"
          title="Test payment"
          description="Development only. No money moves: choose what the payment provider should report."
        />
        <Card as="section" aria-labelledby="sandbox-payment-title">
          <CardHeader
            title={<span id="sandbox-payment-title">{view.itemLabel}</span>}
            titleAs="h2"
            description={mobile ? "Simulated mobile-money prompt" : "Simulated card / web checkout"}
            action={<Badge tone={STATUS_TONE[view.status]}>{STATUS_LABEL[view.status]}</Badge>}
          />
          <CardBody className="space-y-5">
            <p className="text-3xl font-bold tracking-tight text-text tabular-nums">{formatAmount(view.amountMinor, view.currency)}</p>
            {view.status === "PENDING" ? (
              <form action={simulateSandboxPaymentAction} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input type="hidden" name="paymentId" value={view.paymentId} />
                <Button type="submit" name="outcome" value="PAID" variant="primary" fullWidth>
                  Approve payment
                </Button>
                <Button type="submit" name="outcome" value="FAILED" variant="outline" fullWidth>
                  Decline (insufficient funds)
                </Button>
                <Button type="submit" name="outcome" value="CANCELLED" variant="outline" fullWidth>
                  Cancel payment
                </Button>
                <Button type="submit" name="outcome" value="PENDING" variant="ghost" fullWidth>
                  Leave it pending
                </Button>
              </form>
            ) : (
              <Alert tone="neutral" title="This test payment is finished">
                It can no longer be changed here. Start a new checkout to try another outcome.
              </Alert>
            )}
          </CardBody>
        </Card>
      </Container>
    </main>
  );
}
