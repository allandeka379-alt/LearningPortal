import { randomUUID } from "node:crypto";
import { CheckCircle2, CreditCard, ShieldCheck, Smartphone, Users } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CheckoutForm } from "@/components/billing/CheckoutForm";
import type { CheckoutItemGroup } from "@/components/billing/checkout-state";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { isLifetimePrice, priceWithPeriod, RENEWAL_NOTE } from "@/lib/billing/offer";
import { APP_NAME } from "@/lib/config";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { hasStudentAppAccess } from "@/server/billing/entitlements";
import { formatMoneyMinor } from "@/server/marketing/pricing-format";
import { checkPaymentStatusAction, startCheckoutAction } from "../billing/actions";
import { getCheckoutChoices } from "../billing/_lib/service";

export const metadata: Metadata = { title: "Unlock full access" };

/** What Full access opens, in plain words (UI copy; the plan's own highlights from the database come first). */
const INCLUDED = [
  "Every lesson in every subject, in syllabus order",
  "Practice questions with instant marking and feedback",
  "Topic tests and timed mock exams with grade estimates",
  "Flashcards, a study plan around your exam dates and your progress",
] as const;

/** The plan to offer: the one with a lifetime one-off price (Full access), else whatever is on sale. */
function offeredItems(items: readonly CheckoutItemGroup[]): CheckoutItemGroup[] {
  const lifetime = items.find((item) => item.prices.some((price) => isLifetimePrice(price)));
  return lifetime ? [lifetime] : [...items];
}

/**
 * /app/unlock — the student-area paywall page (owner decision 2026-10-12: no free tier). Every learning page sends a
 * student without full access here (src/app/app/layout.tsx). It says what Full access includes, its DATABASE price
 * ("pay once, keep it") and starts the existing Paynow checkout in place (CheckoutForm + startCheckoutAction, the same
 * flow as /app/billing/checkout). A student who already has access goes straight to the dashboard.
 */
export default async function UnlockPage() {
  const actor = await requireOnboardedStudent({ next: "/app/unlock" });
  if (await hasStudentAppAccess(actor.userId)) redirect("/app");
  const choices = await getCheckoutChoices(actor);

  if (choices.kind === "owned") redirect("/app");

  const items = choices.kind === "plans" ? offeredItems(choices.items) : [];
  const offer = items[0];
  const price = offer?.prices.find((p) => isLifetimePrice(p)) ?? offer?.prices[0];
  const amount = price ? formatMoneyMinor(price.amountMinor, price.currency) : null;
  const lifetime = price ? isLifetimePrice(price) : false;
  const highlights = offer && offer.highlights.length > 0 ? offer.highlights.slice(0, 6) : [...INCLUDED];

  return (
    <Container size="reading" className="space-y-6 pb-10">
      <PageHeader
        title={`Unlock ${APP_NAME}`}
        description={
          amount
            ? `${offer?.name ?? "Full access"} — ${lifetime ? `${amount}, pay once.` : `${priceWithPeriod(amount, price as NonNullable<typeof price>)}.`}`
            : "Full access to every lesson, practice question and exam in your subjects."
        }
        className="pb-0"
      />

      <Card as="section" aria-labelledby="unlock-includes-heading">
        <CardHeader titleAs="h2" title={<span id="unlock-includes-heading">What you get</span>} />
        <CardBody className="space-y-4">
          <ul className="space-y-2">
            {highlights.map((line) => (
              <li key={line} className="flex items-start gap-2 text-sm text-text">
                <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <p className="flex items-start gap-2 text-sm text-muted">
            <ShieldCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            <span>
              {lifetime
                ? "One payment covers every subject and level on your account, for good. No subscription and no automatic charges."
                : RENEWAL_NOTE}
            </span>
          </p>
        </CardBody>
      </Card>

      {choices.kind === "plans" && price && choices.methods.length > 0 ? (
        <Card as="section" aria-labelledby="unlock-pay-heading">
          <CardHeader titleAs="h2" title={<span id="unlock-pay-heading">Pay with Paynow</span>} />
          <CardBody className="space-y-4">
            <p className="flex items-start gap-2 text-sm text-muted">
              <Smartphone aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              <span>EcoCash, OneMoney or a card. Your access opens as soon as Paynow confirms the payment.</span>
            </p>
            <CheckoutForm
              purpose="PLAN_PURCHASE"
              items={items}
              methods={choices.methods}
              defaultPriceId={price.planPriceId}
              action={startCheckoutAction}
              checkStatus={checkPaymentStatusAction}
              idempotencyKey={randomUUID()}
            />
          </CardBody>
        </Card>
      ) : (
        <EmptyState
          icon={<CreditCard aria-hidden="true" />}
          title={choices.kind === "plans" ? "Online payment isn't available right now" : "Full access isn't on sale right now"}
          description="Please try again a little later. A parent or guardian can also pay for you from their own account."
          action={
            <ButtonLink href="/app/billing" variant="outline">
              Plan &amp; billing
            </ButtonLink>
          }
        />
      )}

      <section aria-labelledby="unlock-other-heading" className="space-y-2 text-sm text-muted">
        <h2 id="unlock-other-heading" className="flex items-center gap-2 text-base font-semibold text-text">
          <Users aria-hidden="true" className="size-4" />
          Other ways in
        </h2>
        <p>
          A parent or guardian can pay for you once you{" "}
          <Link href="/app/family" className="font-semibold text-primary underline-offset-4 hover:underline">
            link your accounts
          </Link>
          . If your school gave you a class invite, open it to join your class.
        </p>
        <p>
          Already paid? See{" "}
          <Link href="/app/billing" className="font-semibold text-primary underline-offset-4 hover:underline">
            Plan &amp; billing
          </Link>{" "}
          for your payments and receipts.
        </p>
      </section>
    </Container>
  );
}
