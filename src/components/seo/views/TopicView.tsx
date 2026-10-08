import { ArrowLeft, BookOpen, Target } from "lucide-react";
import Link from "next/link";
import { RichContent } from "@/components/content/RichContent";
import { Container } from "@/components/layout/Container";
import { PublicDailyQuestion, type PublicDailyAction } from "@/components/marketing/PublicDailyQuestion";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { formatCount } from "@/lib/format";
import { toBreadcrumbItems, topicCrumbs, topicJsonLd, type SiteContext } from "@/server/seo/page-seo";
import type { TopicPageData } from "@/server/seo/pages";
import { describeTopic } from "@/server/seo/text";
import { CtaBand } from "../CtaBand";
import { CurriculumHero } from "../CurriculumHero";
import { IndependenceNote } from "../IndependenceNote";
import { JsonLd } from "../JsonLd";
import { LessonPreviewList } from "../LessonPreviewList";
import { PUBLIC_ROUTES } from "../routes";
import { Section } from "../Section";

const KIND_LABEL = { SECTION: "Syllabus section", TOPIC: "Topic", SUBTOPIC: "Subtopic" } as const;

/**
 * `/[board]/[qualification]/[subject]/[topic]` (§44): the topic's public summary, learning objectives, subtopics, its
 * lessons (PUBLIC ones as free previews, the rest as locked titles), one practice sample question (PUBLIC or FREE)
 * that visitors answer on the page, and calls to action. Server component; the sample is the public question island
 * shared with /daily, posting to `answerSample` (anonymous, rate-limited marking; nothing stored).
 */
export function TopicView({ data, site, answerSample }: { data: TopicPageData; site: SiteContext; answerSample: PublicDailyAction }) {
  const { board, subject } = data.path;
  const { topic } = data.path.topic;
  return (
    <>
      <JsonLd data={topicJsonLd(data, site)} />
      <CurriculumHero
        breadcrumbs={toBreadcrumbItems(topicCrumbs(data))}
        eyebrow={data.fullName}
        title={
          <>
            {topic.code && <span className="mr-3 text-muted tabular-nums">{topic.code}</span>}
            {topic.name}
          </>
        }
        lead={describeTopic(data.label, subject.name, topic.name)}
        meta={
          <>
            <Badge tone="neutral">{KIND_LABEL[topic.kind]}</Badge>
            {topic.isOptional && <Badge tone="neutral">Optional</Badge>}
            {data.counts.questions > 0 && (
              <Badge tone="primary" icon={<Target aria-hidden="true" />}>
                {formatCount(data.counts.questions, "practice question")}
              </Badge>
            )}
            {data.counts.lessons > 0 && (
              <Badge tone="primary" icon={<BookOpen aria-hidden="true" />}>
                {formatCount(data.counts.lessons, "lesson")}
              </Badge>
            )}
          </>
        }
        actions={
          <>
            <ButtonLink href={PUBLIC_ROUTES.register} size="lg">
              Practise this topic
            </ButtonLink>
            <ButtonLink href={`${data.subjectHref}#topics`} variant="outline" size="lg" iconStart={<ArrowLeft aria-hidden="true" />}>
              All {subject.name} topics
            </ButtonLink>
          </>
        }
      />

      <Container className="grid gap-10 py-10 sm:py-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-12">
        <div className="min-w-0 space-y-12 sm:space-y-14">
          {data.summaryHtml && (
            <Section id="overview" title="Overview">
              <RichContent html={data.summaryHtml} className="max-w-reading" />
            </Section>
          )}

          {data.objectives.length > 0 && (
            <Section id="objectives" title="Learning objectives" description="What the syllabus expects you to be able to do.">
              <ol role="list" className="max-w-reading space-y-3">
                {data.objectives.map((objective, index) => (
                  <li key={objective.id} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex min-w-9 shrink-0 justify-center rounded-control bg-subtle px-1.5 py-0.5 text-xs font-semibold text-muted tabular-nums">
                      {objective.code ?? index + 1}
                    </span>
                    <span className="text-text">{objective.statement}</span>
                  </li>
                ))}
              </ol>
            </Section>
          )}

          {data.children.length > 0 && (
            <Section id="subtopics" title="In this topic">
              <ul role="list" className="flex flex-wrap gap-2">
                {data.children.map((child) => (
                  <li key={child.id} className="max-w-full">
                    <Tag href={child.href}>{child.code ? `${child.code} ${child.name}` : child.name}</Tag>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          <Section id="lessons" title="Lessons">
            {data.lessonTotal > 0 ? (
              <LessonPreviewList
                previews={data.previews}
                lessons={data.lessons}
                total={data.lessonTotal}
                signUpHref={PUBLIC_ROUTES.register}
                pricingHref={PUBLIC_ROUTES.pricing}
              />
            ) : (
              <p className="text-sm text-muted">Lessons for this topic are being prepared.</p>
            )}
          </Section>

          {data.sample && (
            <Section id="sample" title="Sample question" description="A free question on this topic. Answer it, check it, then read the worked answer.">
              <div className="rounded-card border border-border bg-surface p-4 shadow-xs sm:p-6">
                {data.sample.isExamStyle && (
                  <Badge tone="primary" size="sm" className="mb-3">
                    Exam style
                  </Badge>
                )}
                <PublicDailyQuestion
                  answerId={data.sample.question.id}
                  question={data.sample.question}
                  heading={`${topic.name}: sample question`}
                  headingLevel={3}
                  action={answerSample}
                  signUpHref={PUBLIC_ROUTES.register}
                  signUpLabel={`Practise more ${topic.name} questions`}
                  signInHref={PUBLIC_ROUTES.login}
                />
              </div>
            </Section>
          )}
        </div>

        <aside aria-label={`Practise ${topic.name}`} className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <section aria-labelledby="practice-heading" className="rounded-card border border-border bg-surface p-5 shadow-xs">
            <h2 id="practice-heading" className="text-lg font-semibold text-text">
              Practise {topic.name}
            </h2>
            <p className="mt-1 text-sm text-muted">
              {data.counts.questions > 0
                ? `${formatCount(data.counts.questions, "question")} on this topic, marked instantly with explanations.`
                : "Practice questions for this topic are being prepared."}
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <ButtonLink href={PUBLIC_ROUTES.register} fullWidth>
                Create a free account
              </ButtonLink>
              <ButtonLink href={PUBLIC_ROUTES.pricing} variant="outline" fullWidth>
                See plans and pricing
              </ButtonLink>
            </div>
            <p className="mt-4 border-t border-border pt-4 text-sm text-muted">
              Part of{" "}
              <Link href={data.subjectHref} className="font-medium text-primary underline underline-offset-4">
                {data.fullName}
              </Link>
              .
            </p>
          </section>
          <IndependenceNote boardName={board.name} />
        </aside>
      </Container>

      <CtaBand
        title={`Turn ${topic.name} into a strength.`}
        description="Practise with instant marking, see your mastery grow and get a study plan built around your exam date."
        primary={{ href: PUBLIC_ROUTES.register, label: "Get started free" }}
        secondary={{ href: data.subjectHref, label: `${subject.name} topics` }}
      />
    </>
  );
}
