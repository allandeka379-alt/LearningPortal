import { BookMarked } from "lucide-react";
import { RichContent } from "@/components/content/RichContent";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatCount } from "@/lib/format";
import { qualificationCrumbs, qualificationJsonLd, toBreadcrumbItems, type SiteContext } from "@/server/seo/page-seo";
import type { QualificationPageData } from "@/server/seo/pages";
import { describeQualification } from "@/server/seo/text";
import { CtaBand } from "../CtaBand";
import { CurriculumHero } from "../CurriculumHero";
import { ExamSessionList } from "../ExamSessionList";
import { GuideList } from "../GuideList";
import { IndependenceNote } from "../IndependenceNote";
import { JsonLd } from "../JsonLd";
import { LinkCard } from "../LinkCard";
import { PUBLIC_ROUTES } from "../routes";
import { Section } from "../Section";

/** `/[board]/[qualification]`: subjects by category, upcoming exam sessions and guides (§44). Server component. */
export function QualificationView({ data, site }: { data: QualificationPageData; site: SiteContext }) {
  const { board, qualification } = data.path;
  const comingSoon = qualification.catalogueStatus !== "AVAILABLE";
  return (
    <>
      <JsonLd data={qualificationJsonLd(data, site)} />
      <CurriculumHero
        breadcrumbs={toBreadcrumbItems(qualificationCrumbs(data))}
        eyebrow={qualification.level.name}
        title={`${data.label} subjects`}
        lead={data.summaryText ?? describeQualification(data.label)}
        meta={
          <>
            {data.subjectCount > 0 && (
              <Badge tone="neutral" icon={<BookMarked aria-hidden="true" />}>
                {formatCount(data.subjectCount, "subject")}
              </Badge>
            )}
            {comingSoon && <Badge tone="accent">Coming soon</Badge>}
          </>
        }
        actions={
          <>
            <ButtonLink href={PUBLIC_ROUTES.register} size="lg">
              Create a free account
            </ButtonLink>
            <ButtonLink href={PUBLIC_ROUTES.daily} variant="outline" size="lg">
              Try today&apos;s question
            </ButtonLink>
          </>
        }
      />

      <Container className="grid gap-10 py-10 sm:py-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-12">
        <div className="min-w-0 space-y-12">
          {data.categories.length === 0 ? (
            <EmptyState title={`${data.label} subjects are being added`} description="Check back soon, or create a free account to be ready when they open." />
          ) : (
            data.categories.map((group) => (
              <Section key={group.category.id} id={`category-${group.category.id}`} title={group.category.name}>
                <ul role="list" className="grid gap-4 sm:grid-cols-2">
                  {group.subjects.map((subject) => (
                    <LinkCard
                      key={subject.id}
                      href={subject.href}
                      kicker={subject.officialCode ? `Code ${subject.officialCode}` : undefined}
                      title={subject.name}
                      description={subject.summary}
                      footer={
                        !subject.isEnrollable ? (
                          <Badge tone="accent" size="sm">
                            Coming soon
                          </Badge>
                        ) : (
                          <span>Topics, exam dates and samples</span>
                        )
                      }
                    />
                  ))}
                </ul>
              </Section>
            ))
          )}

          {data.summaryHtml && (
            <Section id="about" title={`About ${data.label}`}>
              <RichContent html={data.summaryHtml} className="max-w-reading" />
            </Section>
          )}

          {data.guides.length > 0 && (
            <Section id="guides" title="Guides and articles">
              <GuideList guides={data.guides} />
            </Section>
          )}
        </div>

        <aside aria-label={`${data.label} exam sessions`} className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <section aria-labelledby="sessions-heading" className="rounded-card border border-border bg-surface p-5">
            <h2 id="sessions-heading" className="mb-3 text-lg font-semibold text-text">
              Upcoming exam sessions
            </h2>
            <ExamSessionList sessions={data.examSessions} label={data.label} />
          </section>
          <IndependenceNote boardName={board.name} />
        </aside>
      </Container>

      <CtaBand
        title={`Prepare for ${data.label} with a plan that fits your exam date.`}
        description="Pick your subjects, practise topic by topic and track what you have mastered."
        primary={{ href: PUBLIC_ROUTES.register, label: "Get started free" }}
        secondary={{ href: PUBLIC_ROUTES.pricing, label: "See plans" }}
      />
    </>
  );
}
