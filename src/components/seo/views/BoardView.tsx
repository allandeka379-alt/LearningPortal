import { ExternalLink, GraduationCap } from "lucide-react";
import { RichContent } from "@/components/content/RichContent";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatCount } from "@/lib/format";
import { boardCrumbs, boardJsonLd, toBreadcrumbItems, type SiteContext } from "@/server/seo/page-seo";
import type { BoardPageData } from "@/server/seo/pages";
import { CtaBand } from "../CtaBand";
import { CurriculumHero } from "../CurriculumHero";
import { GuideList } from "../GuideList";
import { IndependenceNote } from "../IndependenceNote";
import { JsonLd } from "../JsonLd";
import { LinkCard } from "../LinkCard";
import { PUBLIC_ROUTES } from "../routes";
import { Section } from "../Section";

/** `/[board]`: the qualifications a board offers, grouped by level (§44). Server component. */
export function BoardView({ data, site }: { data: BoardPageData; site: SiteContext }) {
  const { board } = data;
  const qualificationCount = data.levels.reduce((sum, group) => sum + group.qualifications.length, 0);
  const website = board.websiteUrl && /^https?:\/\//i.test(board.websiteUrl) ? board.websiteUrl : null;
  return (
    <>
      <JsonLd data={boardJsonLd(data, site)} />
      <CurriculumHero
        breadcrumbs={toBreadcrumbItems(boardCrumbs(data))}
        eyebrow={board.name}
        title={`${board.shortName} qualifications and subjects`}
        lead={data.summaryText ?? "Choose your qualification to see its subjects, syllabus topics, exam dates and sample questions."}
        meta={
          <>
            {qualificationCount > 0 && (
              <Badge tone="neutral" icon={<GraduationCap aria-hidden="true" />}>
                {formatCount(qualificationCount, "qualification")}
              </Badge>
            )}
            {website && (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                Official {board.shortName} website
                <ExternalLink aria-hidden="true" className="size-3.5" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
          </>
        }
        actions={
          <>
            <ButtonLink href={PUBLIC_ROUTES.register} size="lg">
              Start learning
            </ButtonLink>
            <ButtonLink href={PUBLIC_ROUTES.daily} variant="outline" size="lg">
              Try today&apos;s question
            </ButtonLink>
          </>
        }
      />

      <Container className="space-y-12 py-10 sm:space-y-14 sm:py-12">
        {data.levels.length === 0 ? (
          <EmptyState
            title={`${board.shortName} qualifications are being added`}
            description="Check back soon, or join now to be ready when they open."
          />
        ) : (
          data.levels.map((group) => (
            <Section key={group.level.id} id={`level-${group.level.id}`} title={group.level.name}>
              <ul role="list" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.qualifications.map((qualification) => (
                  <LinkCard
                    key={qualification.id}
                    href={qualification.href}
                    kicker={qualification.label}
                    title={qualification.name}
                    description={qualification.summary}
                    footer={
                      <>
                        {qualification.subjectCount > 0 && <span className="tabular-nums">{formatCount(qualification.subjectCount, "subject")}</span>}
                        {!qualification.isEnrollable && (
                          <Badge tone="accent" size="sm">
                            Coming soon
                          </Badge>
                        )}
                      </>
                    }
                  />
                ))}
              </ul>
            </Section>
          ))
        )}

        {data.summaryHtml && (
          <Section id="about" title={`About ${board.shortName}`}>
            <RichContent html={data.summaryHtml} className="max-w-reading" />
          </Section>
        )}

        {data.guides.length > 0 && (
          <Section id="guides" title="Guides and articles" description={`Free reading on ${board.shortName} exams and how to prepare.`}>
            <GuideList guides={data.guides} />
          </Section>
        )}

        <IndependenceNote boardName={board.name} />
      </Container>

      <CtaBand
        title="Master your exams, one topic at a time."
        description="Lessons, practice questions with instant marking, mock exams and a study plan built around your exam date."
        primary={{ href: PUBLIC_ROUTES.register, label: "Start learning" }}
        secondary={{ href: PUBLIC_ROUTES.pricing, label: "See plans" }}
      />
    </>
  );
}
