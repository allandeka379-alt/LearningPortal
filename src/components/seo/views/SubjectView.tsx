import { ExternalLink, FileText } from "lucide-react";
import Link from "next/link";
import { RichContent } from "@/components/content/RichContent";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatCount } from "@/lib/format";
import { subjectCrumbs, subjectJsonLd, toBreadcrumbItems, type SiteContext } from "@/server/seo/page-seo";
import type { SubjectPageData } from "@/server/seo/pages";
import { describeSubject, formatCalendarDate } from "@/server/seo/text";
import { CtaBand } from "../CtaBand";
import { CurriculumHero } from "../CurriculumHero";
import { ExamSessionList } from "../ExamSessionList";
import { GuideList } from "../GuideList";
import { IndependenceNote } from "../IndependenceNote";
import { JsonLd } from "../JsonLd";
import { PlatformOffer } from "../PlatformOffer";
import { PUBLIC_ROUTES } from "../routes";
import { SampleQuestionCard } from "../SampleQuestionCard";
import { Section } from "../Section";
import { TopicOutline } from "../TopicOutline";

/**
 * `/[board]/[qualification]/[subject]` (§44): syllabus version and code, the public topic list, the syllabus overview,
 * upcoming exam sessions (provisional dates labelled), free PUBLIC sample questions, what the platform offers (real
 * counts) and calls to action. Never shows lesson bodies or non-public questions. Server component.
 */
export function SubjectView({ data, site }: { data: SubjectPageData; site: SiteContext }) {
  const { board, subject, syllabus } = data.path;
  const code = syllabus?.code ?? subject.officialCode;
  const officialUrl = syllabus?.officialDocumentUrl && /^https?:\/\//i.test(syllabus.officialDocumentUrl) ? syllabus.officialDocumentUrl : null;
  return (
    <>
      <JsonLd data={subjectJsonLd(data, site)} />
      <CurriculumHero
        breadcrumbs={toBreadcrumbItems(subjectCrumbs(data))}
        eyebrow={subject.category.name}
        title={data.fullName}
        lead={data.summaryText ?? describeSubject(data.label, subject)}
        meta={
          <>
            {code && <Badge tone="primary">Syllabus {code}</Badge>}
            {syllabus && <Badge tone="neutral">{syllabus.versionLabel} version</Badge>}
            {!subject.isEnrollable && <Badge tone="accent">Coming soon</Badge>}
            {syllabus?.isDemo && <Badge tone="info">Demo data</Badge>}
          </>
        }
        actions={
          <>
            <ButtonLink href={PUBLIC_ROUTES.register} size="lg">
              Start studying {subject.name}
            </ButtonLink>
            <ButtonLink href={PUBLIC_ROUTES.daily} variant="outline" size="lg">
              Try today&apos;s question
            </ButtonLink>
          </>
        }
      />

      <Container className="grid gap-10 py-10 sm:py-12 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-12">
        <div className="min-w-0 space-y-12 sm:space-y-14">
          <Section
            id="topics"
            title="Syllabus topics"
            description={
              syllabus && data.topicCount > 0
                ? `${formatCount(data.topicCount, "topic and subtopic", "topics and subtopics")} in the ${syllabus.versionLabel} syllabus${
                    syllabus.effectiveFrom ? `, examined from ${formatCalendarDate(syllabus.effectiveFrom)}` : ""
                  }.`
                : undefined
            }
          >
            {data.topics.length > 0 ? (
              <TopicOutline nodes={data.topics} />
            ) : (
              <EmptyState
                titleAs="p"
                title={syllabus ? "The topic list is being prepared" : "The syllabus for this subject is being prepared"}
                description="Join now to be ready when it is published."
              />
            )}
          </Section>

          {(data.html.summary || data.html.overview || data.html.assessment) && (
            <Section id="syllabus" title="About this syllabus">
              <div className="max-w-reading space-y-6">
                {data.html.summary && <RichContent html={data.html.summary} />}
                {data.html.overview && <RichContent html={data.html.overview} />}
                {data.html.assessment && (
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-text">How you are assessed</h3>
                    <RichContent html={data.html.assessment} />
                  </div>
                )}
                {officialUrl && (
                  <a
                    href={officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline"
                  >
                    <FileText aria-hidden="true" className="size-4" />
                    Read the official syllabus
                    <ExternalLink aria-hidden="true" className="size-3.5" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                )}
              </div>
            </Section>
          )}

          {data.samples.length > 0 && (
            <Section id="samples" title="Try a sample question" description="Free questions in exam style. Answer them on paper, then check the worked answer.">
              <div className="space-y-5">
                {data.samples.map((sample, index) => (
                  <SampleQuestionCard key={sample.question.id} sample={sample} heading={data.samples.length > 1 ? `Sample question ${index + 1}` : "Sample question"} />
                ))}
                <p className="text-sm text-muted">
                  Want more?{" "}
                  <Link href={PUBLIC_ROUTES.register} className="font-medium text-primary underline underline-offset-4">
                    Start learning
                  </Link>{" "}
                  to practise {subject.name} with instant marking.
                </p>
              </div>
            </Section>
          )}

          {data.guides.length > 0 && (
            <Section id="guides" title={`${subject.name} guides`} description="Free study guides you can read without an account.">
              <GuideList guides={data.guides} />
            </Section>
          )}
        </div>

        <aside aria-label={`Study ${subject.name}`} className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <PlatformOffer
            headingId="offer-heading"
            subjectName={subject.name}
            counts={data.counts}
            isEnrollable={subject.isEnrollable}
            signUpHref={PUBLIC_ROUTES.register}
            pricingHref={PUBLIC_ROUTES.pricing}
          />
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
        title={`Ready to master ${data.fullName}?`}
        description="Study each topic, practise with instant marking and see exactly what to revise next."
        primary={{ href: PUBLIC_ROUTES.register, label: `Start studying ${subject.name}` }}
        secondary={{ href: PUBLIC_ROUTES.pricing, label: "See plans" }}
      />
    </>
  );
}
