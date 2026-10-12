import { UpgradeButton } from "@/components/billing/UpgradeOffer";
import { BookOpen, ClipboardList, Layers, Lightbulb, Target } from "lucide-react";
import type { Metadata } from "next";
import { notFound, unstable_rethrow } from "next/navigation";
import { cache } from "react";
import { z } from "zod";
import { practiceHref } from "@/components/dashboard/links";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { RichContent } from "@/components/content/RichContent";
import { accuracyPercent, codedName, topicHref, topicKindLabel, topicTestHref } from "@/components/lessons/labels";
import { LessonList } from "@/components/lessons/LessonList";
import { formatInstantDate } from "@/components/student/format";
import { STUDENT_NAV } from "@/components/student/nav";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { MasteryBadge } from "@/components/ui/MasteryBadge";
import { MasteryBar } from "@/components/ui/MasteryBar";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { formatCount, formatDuration, formatPercent } from "@/lib/format";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { isAppError } from "@/server/lib/errors";
import { getTopicPageForStudent } from "@/server/lessons";

const paramsSchema = z.object({ subjectId: z.uuid(), topicId: z.uuid() });
type Params = Promise<{ subjectId: string; topicId: string }>;

/** Memoised per request: generateMetadata and the page share one read. */
const loadTopic = cache(async (subjectId: string, topicId: string) => {
  const actor = await requireOnboardedStudent({ next: topicHref(subjectId, topicId) });
  try {
    return { actor, view: await getTopicPageForStudent(actor, subjectId, topicId) };
  } catch (error) {
    if (isAppError(error) && error.code === "NOT_FOUND") notFound();
    throw error;
  }
});

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const parsed = paramsSchema.safeParse(await params);
  if (!parsed.success) return { title: "Topic" };
  try {
    const { view } = await loadTopic(parsed.data.subjectId, parsed.data.topicId);
    return { title: `${view.topic.name} · ${view.subject.name}` };
  } catch (error) {
    unstable_rethrow(error);
    return { title: "Topic" };
  }
}

const flashcardsAvailable = STUDENT_NAV.some((item) => item.href === "/app/flashcards" && item.available);

/**
 * Topic page (§2 hierarchy, §8 lessons, §11 mastery band, §26 pinned version, §31 free vs paid): the topic in the
 * student's pinned syllabus version, its lessons in order with completion and lock state, subtopics with mastery,
 * learning objectives, and the next steps (practise, topic test, flashcards when available).
 */
export default async function TopicPage({ params }: { params: Params }) {
  const parsed = paramsSchema.safeParse(await params);
  if (!parsed.success) notFound();
  const { subjectId, topicId } = parsed.data;
  const { actor, view } = await loadTopic(subjectId, topicId);
  const { subject, topic, mastery, lessons, lessonCounts } = view;
  const practise = practiceHref({ subjectId: subject.id, topicId: topic.id, count: 10 });
  const accuracy = mastery ? accuracyPercent(mastery.questionsCorrect, mastery.questionsAttempted) : null;

  return (
    <Container className="space-y-6 pb-10">
      <PageHeader
        breadcrumbs={[
          { label: "Learn", href: "/app/subjects" },
          { label: subject.name, href: `/app/subjects/${subject.id}` },
          ...view.ancestors.map((a) => ({ label: a.name, href: topicHref(subject.id, a.id) })),
          { label: topic.name },
        ]}
        eyebrow={`${subject.name} · ${topicKindLabel(topic.kind)}`}
        title={codedName(topic.name, topic.code)}
        description={
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {topic.estimatedStudyMinutes ? <span>About {formatDuration(topic.estimatedStudyMinutes)} of study</span> : null}
            <span>
              {view.syllabus.title} · version {view.syllabus.versionLabel}
            </span>
            {topic.isOptional && (
              <Badge tone="neutral" size="sm">
                Optional
              </Badge>
            )}
            {view.syllabus.isDemo && (
              <Badge tone="warning" size="sm">
                Demo content (development only)
              </Badge>
            )}
          </span>
        }
        actions={
          <>
            <ButtonLink href={practise} iconStart={<Target aria-hidden="true" />}>
              Practise this topic
            </ButtonLink>
            <ButtonLink href={topicTestHref(subject.id, topic.id)} variant="outline" iconStart={<ClipboardList aria-hidden="true" />}>
              Topic test
            </ButtonLink>
            {flashcardsAvailable && (
              <ButtonLink
                href={`/app/flashcards?${new URLSearchParams({ subjectId: subject.id, topicId: topic.id }).toString()}`}
                variant="outline"
                iconStart={<Layers aria-hidden="true" />}
              >
                Flashcards
              </ButtonLink>
            )}
          </>
        }
        className="pb-0"
      />

      {view.enrollmentStatus === "DROPPED" && (
        <Alert
          tone="neutral"
          title={`${subject.name} is no longer on your list`}
          action={
            <ButtonLink href="/app/subjects/manage" variant="outline">
              Add it back
            </ButtonLink>
          }
        >
          Your progress is kept. Add the subject back to practise it again.
        </Alert>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div className="min-w-0 space-y-6">
          <Card as="section" aria-labelledby="topic-lessons-title">
            <CardHeader
              titleAs="h2"
              title={<span id="topic-lessons-title">Lessons</span>}
              description={
                lessonCounts.total > 0
                  ? view.lessonsFrom
                    ? `These lessons cover ${view.lessonsFrom.name}, which includes this ${topicKindLabel(topic.kind).toLowerCase()}.`
                    : `${lessonCounts.completed} of ${formatCount(lessonCounts.total, "lesson")} completed`
                  : undefined
              }
            />
            <CardBody className="space-y-4">
              {lessons.length > 0 ? (
                <>
                  {!view.lessonsFrom && (
                    <ProgressBar
                      label="Lessons completed"
                      labelHidden
                      value={lessonCounts.completed}
                      max={lessonCounts.total}
                      valueText={`${lessonCounts.completed} of ${lessonCounts.total} lessons completed`}
                      tone="success"
                      size="sm"
                    />
                  )}
                  <LessonList lessons={lessons} topicId={view.lessonsFrom?.id ?? topic.id} />
                  {lessonCounts.locked > 0 && (
                    <Alert
                      tone="accent"
                      title={`${formatCount(lessonCounts.locked, "lesson")} ${lessonCounts.locked === 1 ? "is" : "are"} part of the full course`}
                      action={
                        <UpgradeButton fallbackHref={view.upgradePath} variant="accent" />
                      }
                    >
                      Unlock full access to open every lesson in this topic.
                    </Alert>
                  )}
                </>
              ) : (
                <EmptyState
                  appearance="plain"
                  titleAs="h3"
                  icon={<BookOpen aria-hidden="true" />}
                  title="No lessons published for this topic yet"
                  description="You can still practise it: questions adapt to your level as you go."
                  action={<ButtonLink href={practise}>Practise this topic</ButtonLink>}
                />
              )}
            </CardBody>
          </Card>

          {view.subtopics.length > 0 && (
            <Card as="section" aria-labelledby="topic-subtopics-title">
              <CardHeader titleAs="h2" title={<span id="topic-subtopics-title">Subtopics</span>} description="Your mastery in each part of this topic." />
              <CardBody>
                <ul className="space-y-4">
                  {view.subtopics.map((sub) => (
                    <li key={sub.id}>
                      <MasteryBar label={codedName(sub.name, sub.code)} score={sub.score} href={topicHref(subject.id, sub.id)} />
                      <p className="mt-1 flex flex-wrap gap-x-3 text-xs text-muted">
                        <span>{sub.lessonCount > 0 ? formatCount(sub.lessonCount, "lesson") : "No lessons yet"}</span>
                        {sub.questionsAttempted > 0 && <span>{formatCount(sub.questionsAttempted, "question")} answered</span>}
                        {sub.isOptional && <span>Optional</span>}
                      </p>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          )}
        </div>

        <div className="min-w-0 space-y-6">
          <Card as="section" aria-labelledby="topic-mastery-title">
            <CardHeader titleAs="h2" title={<span id="topic-mastery-title">Your mastery</span>} />
            <CardBody className="space-y-4">
              {mastery ? (
                <>
                  <div className="flex flex-wrap items-center gap-3">
                    <MasteryBadge band={mastery.band} score={mastery.score} showScore />
                  </div>
                  <ProgressBar label="Mastery score" labelHidden value={mastery.score} valueText={formatPercent(mastery.score)} size="sm" />
                  <dl className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <dt className="text-muted">Questions answered</dt>
                      <dd className="font-semibold text-text tabular-nums">{mastery.questionsAttempted}</dd>
                    </div>
                    <div>
                      <dt className="text-muted">Accuracy</dt>
                      <dd className="font-semibold text-text tabular-nums">{accuracy === null ? "—" : formatPercent(accuracy)}</dd>
                    </div>
                    {mastery.lastPracticedAt && (
                      <div className="col-span-2">
                        <dt className="text-muted">Last practised</dt>
                        <dd className="font-semibold text-text">{formatInstantDate(mastery.lastPracticedAt, actor.timeZone)}</dd>
                      </div>
                    )}
                  </dl>
                  {mastery.inRemediation && (
                    <Alert tone="accent" icon={<Lightbulb aria-hidden="true" />} title="Start with a lesson">
                      A few answers here were wrong in a row. Read a lesson first; practice questions will start a little easier.
                    </Alert>
                  )}
                  {!mastery.inRemediation && mastery.retestDue && (
                    <Alert
                      tone="info"
                      title="Due for a re-test"
                      action={
                        <ButtonLink href={practiceHref({ subjectId: subject.id, topicId: topic.id, mode: "RETEST" })} variant="outline">
                          Re-test now
                        </ButtonLink>
                      }
                    >
                      A short re-test now helps you remember it for the exam.
                    </Alert>
                  )}
                </>
              ) : (
                <div className="space-y-3">
                  <MasteryBadge />
                  <p className="text-sm text-muted">
                    Answer a few questions on this topic and your mastery band will show here.
                  </p>
                  <ButtonLink href={practise} variant="outline" iconStart={<Target aria-hidden="true" />}>
                    Practise this topic
                  </ButtonLink>
                </div>
              )}
            </CardBody>
          </Card>

          {view.objectives.length > 0 && (
            <Card as="section" aria-labelledby="topic-objectives-title">
              <CardHeader titleAs="h2" title={<span id="topic-objectives-title">Learning objectives</span>} description="What the syllabus expects you to be able to do." />
              <CardBody>
                <ul className="space-y-2.5 text-sm">
                  {view.objectives.map((objective) => (
                    <li key={objective.id} className="flex gap-2">
                      {objective.code ? (
                        <span className="w-12 shrink-0 font-semibold text-muted tabular-nums">{objective.code}</span>
                      ) : (
                        <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-border-strong" />
                      )}
                      <span className="min-w-0 text-text">{objective.statement}</span>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          )}

          {topic.descriptionHtml && (
            <Card as="section" aria-labelledby="topic-about-title">
              <CardHeader titleAs="h2" title={<span id="topic-about-title">About this topic</span>} />
              <CardBody>
                <RichContent html={topic.descriptionHtml} className="text-sm" />
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </Container>
  );
}
