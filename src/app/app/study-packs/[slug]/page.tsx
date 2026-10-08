import { CircleCheck, Info, ShoppingBag } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EntitlementList } from "@/components/billing/EntitlementList";
import { RichContent } from "@/components/content/RichContent";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ownershipText, packPriceText } from "@/components/study-packs/StudyPackCard";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { StatTile } from "@/components/ui/StatTile";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { getStudyPackForStudent, studyPackPath, STUDY_PACKS_PATH } from "@/server/study-packs/catalogue";

export const metadata: Metadata = { title: "Study pack" };

type Props = { params: Promise<{ slug: string }> };

/**
 * One study pack (§24): what it covers, what is inside (counts of PUBLISHED content), what it unlocks, its prices
 * and "Buy" through the existing checkout (`/app/billing/checkout?pack=`). Unknown or unpublished slugs are 404.
 */
export default async function StudyPackPage({ params }: Props) {
  const { slug } = await params;
  const actor = await requireOnboardedStudent({ next: studyPackPath(slug) });
  const pack = await getStudyPackForStudent(actor, slug);
  if (!pack) notFound();
  const owned = ownershipText(pack.ownership, actor.timeZone);

  const buy = pack.checkoutHref ? (
    <ButtonLink href={pack.checkoutHref} iconStart={<ShoppingBag aria-hidden="true" />}>
      Buy this pack
    </ButtonLink>
  ) : null;

  return (
    <Container size="reading" className="space-y-6 pb-10">
      <PageHeader
        title={pack.title}
        description={pack.subtitle ?? undefined}
        eyebrow={pack.scopes.map((scope) => scope.label).join(" · ")}
        breadcrumbs={[
          { label: "Study packs", href: STUDY_PACKS_PATH },
          { label: pack.title },
        ]}
        actions={buy}
        className="pb-0"
      />

      <div className="flex flex-wrap gap-2">
        {owned && (
          <Badge tone="primary" icon={<CircleCheck aria-hidden="true" />}>
            {owned}
          </Badge>
        )}
        {pack.isDemo && <Badge tone="info">Demo data</Badge>}
      </div>

      {!pack.forYourQualification && (
        <Alert tone="neutral" icon={<Info aria-hidden="true" />}>
          This pack is for a qualification you don&rsquo;t study yet. It only unlocks content inside what it covers.
        </Alert>
      )}

      <Card as="section" aria-labelledby="pack-inside">
        <CardHeader
          titleAs="h2"
          title={<span id="pack-inside">What&rsquo;s inside</span>}
          description={`Published content for ${pack.scopes.map((scope) => scope.label).join("; ")}. Packs grow as new content is published.`}
        />
        <CardBody>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatTile label="Lessons" value={pack.contents.lessons} />
            <StatTile label="Practice questions" value={pack.contents.questions} />
            <StatTile label="Flashcards" value={pack.contents.flashcards} />
            <StatTile label="Tests and mocks" value={pack.contents.assessments} />
          </div>
        </CardBody>
      </Card>

      <Card as="section" aria-labelledby="pack-unlocks">
        <CardHeader titleAs="h2" title={<span id="pack-unlocks">What it unlocks</span>} description="Inside the subjects the pack covers." />
        <CardBody>
          <EntitlementList lines={pack.unlocks} />
        </CardBody>
      </Card>

      {pack.descriptionHtml && (
        <Card as="section" aria-labelledby="pack-about">
          <CardHeader titleAs="h2" title={<span id="pack-about">About this pack</span>} />
          <CardBody>
            <RichContent html={pack.descriptionHtml} />
          </CardBody>
        </Card>
      )}

      <Card as="section" aria-labelledby="pack-price">
        <CardHeader titleAs="h2" title={<span id="pack-price">Price</span>} />
        <CardBody className="space-y-4">
          {pack.ownership.state === "active" ? (
            <p className="text-sm text-text">{owned}. Open its subjects from your subject list to study it.</p>
          ) : pack.prices.length === 0 ? (
            <p className="text-sm text-muted">This pack isn&rsquo;t on sale right now.</p>
          ) : (
            <>
              <ul className="space-y-1 text-sm text-text">
                {pack.prices.map((price) => (
                  <li key={price.planPriceId} className="tabular-nums">
                    {packPriceText(price)}
                    {price.label ? <span className="text-muted"> · {price.label}</span> : null}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted">One payment; nothing renews automatically. You choose the price and how to pay at checkout.</p>
              {buy}
            </>
          )}
        </CardBody>
      </Card>
    </Container>
  );
}
