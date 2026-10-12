import { CalendarClock, CheckCircle2, Package, Receipt, Smartphone } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { summariseEntitlements } from "@/components/billing/entitlement-summary";
import { EntitlementList } from "@/components/billing/EntitlementList";
import { PaymentHistory } from "@/components/billing/PaymentHistory";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { formatInstantDate } from "@/components/student/format";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Pagination } from "@/components/ui/Pagination";
import { unlockEverythingLabel } from "@/lib/billing/offer";
import type { Actor } from "@/server/auth/actor";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { getFeatures } from "@/server/features";
import { isAppError } from "@/server/lib/errors";
import { getBillingOverview, type BillingOfferView, type BillingOverview } from "./_lib/service";

export const metadata: Metadata = { title: "Plan & billing" };

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function cursorParam(raw: string | string[] | undefined): string | null {
  const value = Array.isArray(raw) ? raw[0] : raw;
  return value && /^[A-Za-z0-9_-]{1,512}$/.test(value) ? value : null;
}

async function loadOverview(actor: Actor, paymentsCursor: string | null): Promise<{ overview: BillingOverview; cursorExpired: boolean }> {
  try {
    return { overview: await getBillingOverview(actor, { paymentsCursor }), cursorExpired: false };
  } catch (error) {
    // A malformed or stale payments cursor: show the first page instead of failing.
    if (paymentsCursor !== null && isAppError(error) && error.code === "VALIDATION") {
      return { overview: await getBillingOverview(actor, { paymentsCursor: null }), cursorExpired: true };
    }
    throw error;
  }
}

/** The one-off offer: what it adds, its DATABASE price and the Buy button (Paynow only). */
function FullAccessOffer({ offer }: { offer: BillingOfferView }) {
  return (
    <div className="space-y-3 rounded-card border border-primary p-4">
      <div className="space-y-1">
        <p className="flex flex-wrap items-baseline gap-x-2 text-base font-semibold text-text">
          <span>{offer.planName}</span>
          <span className="tabular-nums">{offer.amountLabel}</span>
          {offer.lifetime && <span className="text-sm font-normal text-muted">pay once, keep it</span>}
        </p>
        {offer.tagline && <p className="text-sm text-muted">{offer.tagline}</p>}
      </div>
      {offer.highlights.length > 0 && (
        <ul className="list-disc space-y-1 pl-5 text-sm text-text">
          {offer.highlights.slice(0, 6).map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      )}
      <ButtonLink href={offer.checkoutHref} variant="primary">
        {unlockEverythingLabel(offer.amountLabel)}
      </ButtonLink>
      <p className="flex items-start gap-2 text-sm text-muted">
        <Smartphone aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
        <span>
          Pay through Paynow with EcoCash, OneMoney or a card. One payment: nothing renews and nothing is charged again. A parent or guardian can also
          pay for you from their own account.
        </span>
      </p>
    </div>
  );
}

/**
 * Plan & billing (§31, §32; ARCHITECTURE §3.3 `/app/billing`; owner decisions 2026-10-07 and 2026-10-12): the student's
 * access (none yet: there is no free tier, or "Full access since <date>" bought once with its receipt, or access through a school / a grant /
 * an older subscription), what it includes in plain words, the one-off Buy button (price from the database), study
 * packs and their payments with receipt numbers. One-off access never renews, so there is nothing to cancel or resume.
 */
export default async function BillingPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const paymentsCursor = cursorParam(params.payments);
  const actor = await requireOnboardedStudent({ next: "/app/billing" });
  const [{ overview, cursorExpired }, features] = await Promise.all([loadOverview(actor, paymentsCursor), getFeatures()]);
  const { subscription, purchase, offer } = overview;
  const date = (value: Date | null) => (value ? formatInstantDate(value, actor.timeZone) : null);
  const paidSources = overview.sources.filter((source) => source.kind !== "FREE");
  const noAccess = purchase === null && paidSources.length === 0;

  return (
    <Container className="space-y-8 pb-10">
      <PageHeader title="Plan & billing" description="Your access, what it includes and your payments." className="pb-0" />

      <Card as="section" aria-labelledby="current-plan-heading">
        <CardHeader
          titleAs="h2"
          title={<span id="current-plan-heading">{noAccess ? "Your access" : `Your plan: ${purchase ? purchase.planName : overview.planName}`}</span>}
        />
        <CardBody className="space-y-5">
          {purchase && (
            <div className="space-y-1 rounded-card border border-border p-4 text-sm">
              <p className="flex items-start gap-2 font-medium text-text">
                <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>
                  {purchase.planName} since {date(purchase.since)}
                  {purchase.endsAt ? `, until ${date(purchase.endsAt)}` : ". Paid once, yours to keep: nothing renews."}
                </span>
              </p>
              {purchase.paidByParent && <p className="text-muted">Your parent or guardian paid for it.</p>}
              {purchase.receiptNumber && (
                <p className="text-muted">
                  Receipt <span className="font-mono text-text">{purchase.receiptNumber}</span>
                  {purchase.receiptHref && (
                    <>
                      {" · "}
                      <Link href={purchase.receiptHref} className="font-semibold text-primary underline-offset-4 hover:underline">
                        View receipt
                      </Link>
                    </>
                  )}
                </p>
              )}
            </div>
          )}

          {paidSources.length > 0 && (
            <ul className="space-y-2">
              {paidSources.map((source) => (
                <li key={source.key} className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                  <span className="font-medium text-text">{source.planName ?? source.label}</span>
                  {source.planName && <Badge size="sm">{source.label}</Badge>}
                  <span className="text-muted">
                    {source.endsAt ? `until ${date(source.endsAt)}` : source.kind === "SCHOOL" ? "while your school's plan is active" : "no end date"}
                  </span>
                </li>
              ))}
            </ul>
          )}
          {noAccess && (
            <p className="text-sm text-muted">
              You don&rsquo;t have full access yet. Full access opens every lesson, practice question, topic test and mock exam in your subjects.
            </p>
          )}

          {subscription && subscription.live && (
            // Older prepaid subscriptions (before one-off Full access) run to the end of their paid period; they never renew.
            <p className="flex items-start gap-2 rounded-card border border-border p-4 text-sm text-text">
              <CalendarClock aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-muted" />
              <span>
                {`${subscription.planName} is paid until ${date(subscription.currentPeriodEnd) ?? date(subscription.accessEndsAt)}. It does not renew and nothing is charged automatically.`}
                {subscription.paidByParent ? " Your parent or guardian paid for this plan." : ""}
              </span>
            </p>
          )}

          {offer && <FullAccessOffer offer={offer} />}
          {!offer && noAccess && <p className="text-sm text-muted">Full access isn&rsquo;t on sale right now. Please check back soon.</p>}

          {/* AI entitlements are listed only while AI features are switched on (`features.ai`). */}
          <EntitlementList lines={summariseEntitlements(overview.entitlements, { ai: features.ai })} showExcluded />
        </CardBody>
      </Card>

      {overview.packs.length > 0 && (
        <section aria-labelledby="packs-heading" className="space-y-3">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 id="packs-heading" className="text-lg font-semibold text-text">
              Your study packs
            </h2>
            <Link href="/app/study-packs" className="inline-flex min-h-11 items-center text-sm font-semibold text-primary underline-offset-4 hover:underline">
              Browse study packs
            </Link>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {overview.packs.map((pack) => (
              <li key={pack.grantId}>
                <Card variant="flat" className="h-full">
                  <CardBody className="flex items-start gap-3">
                    <Package aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
                    <div className="min-w-0">
                      <p className="font-medium text-text">
                        <Link href={`/app/study-packs/${encodeURIComponent(pack.slug)}`} className="underline-offset-4 hover:underline">
                          {pack.title}
                        </Link>
                      </p>
                      <p className="text-sm text-muted">
                        {pack.state === "active"
                          ? pack.endsAt
                            ? `Unlocked until ${date(pack.endsAt)}`
                            : "Unlocked, no end date"
                          : pack.state === "ended"
                            ? `Ended ${date(pack.endsAt)}`
                            : `Starts ${date(pack.startsAt)}`}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="payments-heading" className="space-y-3">
        <h2 id="payments-heading" className="flex items-center gap-2 text-lg font-semibold text-text">
          <Receipt aria-hidden="true" className="size-5 text-muted" />
          Payments
        </h2>
        {cursorExpired && (
          <Alert tone="neutral">
            That page of payments is no longer available, so you&rsquo;re seeing the latest ones.
          </Alert>
        )}
        <PaymentHistory rows={overview.payments.items} timeZone={actor.timeZone} />
        <Pagination
          label="Payment pages"
          prevHref={paymentsCursor && !cursorExpired ? "/app/billing" : null}
          nextHref={overview.payments.nextCursor ? `/app/billing?payments=${encodeURIComponent(overview.payments.nextCursor)}` : null}
          prevLabel="Latest payments"
          nextLabel="Older payments"
        />
        <p className="text-sm text-muted">
          Questions about a payment? See{" "}
          <Link href="/faq" className="font-semibold text-primary underline-offset-2 hover:underline">
            help and FAQ
          </Link>
          , and quote the receipt number if you contact us.
        </p>
      </section>
    </Container>
  );
}
