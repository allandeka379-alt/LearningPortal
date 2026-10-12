import { randomUUID } from "node:crypto";
import { BadgeCheck, CreditCard, PackageCheck } from "lucide-react";
import type { Metadata } from "next";
import { z } from "zod";
import { CheckoutForm } from "@/components/billing/CheckoutForm";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { checkPaymentStatusAction, startCheckoutAction } from "../actions";
import { getCheckoutChoices } from "../_lib/service";

export const metadata: Metadata = { title: "Checkout" };

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const uuid = z.uuid();

function idParam(raw: string | string[] | undefined): string | null {
  const value = Array.isArray(raw) ? raw[0] : raw;
  return value !== undefined && uuid.safeParse(value).success ? value : null;
}

/**
 * Checkout (§31, §32; ARCHITECTURE §3.3): choose a plan price (or a study pack price), then EcoCash / OneMoney (phone
 * prompt), a card on the Paynow page, or (development only) the sandbox. `?price=` preselects a price from the billing
 * page and every upgrade prompt; `?pack=` buys a study pack (§24). Prices and methods come from the database and the
 * enabled providers; nothing about the amount is taken from the browser. One-off "Full access" (owner decision
 * 2026-10-07) is paid once through Paynow; a student who already owns it is told so instead of being asked to pay.
 */
export default async function CheckoutPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const priceId = idParam(params.price);
  const packId = idParam(params.pack);
  const next = `/app/billing/checkout${packId ? `?pack=${packId}` : priceId ? `?price=${priceId}` : ""}`;
  const actor = await requireOnboardedStudent({ next });
  const choices = await getCheckoutChoices(actor, { studyPackId: packId });

  // One-off plan prices only (the usual case: "Full access"): one payment through Paynow, nothing renews.
  const oneOff = choices.kind === "plans" && choices.items.every((item) => item.prices.every((price) => price.interval === "ONE_OFF"));
  const single = choices.kind === "plans" && choices.items.length === 1 ? choices.items[0] : undefined;
  const title =
    choices.kind === "pack" || choices.kind === "pack-owned"
      ? `Buy ${choices.pack.title}`
      : choices.kind === "owned"
        ? choices.planName
        : oneOff && single
          ? `Unlock ${single.name}`
          : "Choose your plan";
  const description =
    choices.kind === "owned"
      ? "Already unlocked on your account."
      : choices.kind === "pack"
      ? (choices.pack.subtitle ?? "A one-off purchase that unlocks this pack's content.")
      : oneOff
        ? "Pay through Paynow. Each payment adds its period of full access; nothing is charged without you."
        : "Pay for the period you choose. Nothing renews automatically.";

  return (
    <Container size="reading" className="space-y-6 pb-10">
      <PageHeader
        title={title}
        breadcrumbs={[{ label: "Plan & billing", href: "/app/billing" }, { label: "Checkout" }]}
        description={description}
        className="pb-0"
      />

      {choices.kind === "owned" && (
        <EmptyState
          icon={<BadgeCheck aria-hidden="true" />}
          title={`You already have ${choices.planName}`}
          description="It's unlocked on your account for good. There is nothing more to pay."
          action={
            <ButtonLink href="/app/billing" variant="outline">
              Back to Plan & billing
            </ButtonLink>
          }
        />
      )}

      {choices.kind === "unavailable" && (
        <EmptyState
          icon={<CreditCard aria-hidden="true" />}
          title={packId ? "This study pack isn't on sale right now" : "No plans are available to buy right now"}
          description="Please try again later."
          action={
            <ButtonLink href="/app/billing" variant="outline">
              Back to Plan & billing
            </ButtonLink>
          }
        />
      )}

      {choices.kind === "pack-owned" && (
        <EmptyState
          icon={<PackageCheck aria-hidden="true" />}
          title="You already have this study pack"
          description="It's unlocked on your account."
          action={
            <ButtonLink href="/app/billing" variant="outline">
              Back to Plan & billing
            </ButtonLink>
          }
        />
      )}

      {(choices.kind === "plans" || choices.kind === "pack") &&
        (choices.methods.length === 0 ? (
          <EmptyState
            icon={<CreditCard aria-hidden="true" />}
            title="Online payment isn't available right now"
            description="Please try again later. A parent or guardian can also pay for you from their own account."
            action={
              <ButtonLink href="/app/billing" variant="outline">
                Back to Plan & billing
              </ButtonLink>
            }
          />
        ) : (
          <Card>
            <CardBody>
              <CheckoutForm
                purpose={choices.kind === "pack" ? "STUDY_PACK" : oneOff ? "PLAN_PURCHASE" : "SUBSCRIPTION"}
                items={choices.items}
                methods={choices.methods}
                {...(choices.kind === "pack" ? { studyPackId: choices.pack.id } : {})}
                defaultPriceId={priceId}
                action={startCheckoutAction}
                checkStatus={checkPaymentStatusAction}
                idempotencyKey={randomUUID()}
              />
            </CardBody>
          </Card>
        ))}
    </Container>
  );
}
