import { randomUUID } from "node:crypto";
import { Check, CircleCheck, Clock } from "lucide-react";
import type { Metadata } from "next";
import { notFound, unstable_rethrow } from "next/navigation";
import { cache } from "react";
import { z } from "zod";
import { RichContent } from "@/components/content/RichContent";
import { practiceHref } from "@/components/dashboard/links";
import { LessonNextSteps } from "@/components/learn/LessonNextSteps";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { codedName, lessonKindLabel, topicHref } from "@/components/lessons/labels";
import { LessonActivityTracker } from "@/components/lessons/LessonActivityTracker";
import { LessonAttributionFooter } from "@/components/lessons/LessonAttributionFooter";
import { LessonCheckSection } from "@/components/lessons/LessonCheckSection";
import { LessonPager } from "@/components/lessons/LessonPager";
import { LessonToc } from "@/components/lessons/LessonToc";
import { LockedLessonNotice } from "@/components/lessons/LockedLessonNotice";
import { MarkCompleteForm } from "@/components/lessons/MarkCompleteForm";
import { ReportProblemButton } from "@/components/questions/ReportProblem";
import { tocItems } from "@/components/lessons/toc";
import { formatInstantDate } from "@/components/student/format";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { AskTutorLink } from "@/components/tutor/AskTutorLink";
import { formatDuration } from "@/lib/format";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { isFeatureEnabled } from "@/server/features";
import { isAppError } from "@/server/lib/errors";
import { getLessonCheck, getLessonForStudent } from "@/server/lessons";
import { getLessonCourseContext } from "@/server/lessons/course";
import {
  answerLessonQuestionAction,
  completeLessonAction,
  recordLessonActivityAction,
  revealLessonHintAction,
  selfAssessLessonAnswerAction,
  startLessonCheckAction,
} from "./actions";
import { reportProblemAction } from "../../_actions/report-problem";

const paramsSchema = z.object({ lessonId: z.uuid() });
const topicParamSchema = z.uuid();

type Params = Promise<{ lessonId: string }>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function topicParam(searchParams: Record<string, string | string[] | undefined>): string | null {
  const raw = searchParams.topic;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return value && topicParamSchema.safeParse(value).success ? value : null;
}

/** Memoised per request: generateMetadata and the page share one read. */
const loadLesson = cache(async (lessonId: string, topicId: string | null) => {
  const actor = await requireOnboardedStudent({ next: `/app/lessons/${lessonId}` });
  try {
    return { actor, lesson: await getLessonForStudent(actor, lessonId, { topicId }) };
  } catch (error) {
    if (isAppError(error) && error.code === "NOT_FOUND") notFound();
    throw error;
  }
});

export async function generateMetadata({ params, searchParams }: { params: Params; searchParams: SearchParams }): Promise<Metadata> {
  const parsed = paramsSchema.safeParse(await params);
  if (!parsed.success) return { title: "Lesson" };
  try {
    const { lesson } = await loadLesson(parsed.data.lessonId, topicParam(await searchParams));
    // The bare title: the saved-lessons list (offline, §29) reads it back without the brand suffix.
    return { title: lesson.title };
  } catch (error) {
    unstable_rethrow(error);
    return { title: "Lesson" };
  }
}

/**
 * Lesson reader (§8): server-rendered body (KaTeX maths, definitions, key facts, worked solutions, common mistakes,
 * exam tips and formulas as styled blocks), an "On this page" table of contents (sticky sidebar on large screens,
 * collapsible bar on phones), the lesson's practice questions with instant feedback, "Mark as complete" plus
 * automatic time tracking, previous / next lesson in the topic, a "Practise this topic" call to action and the
 * licensing footer (§27). A lesson the plan does not cover shows an upgrade prompt and never its content (§31).
 */
export default async function LessonPage({ params, searchParams }: { params: Params; searchParams: SearchParams }) {
  const parsed = paramsSchema.safeParse(await params);
  if (!parsed.success) notFound();
  const { lessonId } = parsed.data;
  const { actor, lesson } = await loadLesson(lessonId, topicParam(await searchParams));

  const [check, askTutor, course] = await Promise.all([
    !lesson.locked && lesson.practiceQuestionCount > 0 ? getLessonCheck(actor, lesson.id, { topicId: lesson.topic.id }) : Promise.resolve(null),
    // The AI tutor link only while AI is switched on (`features.ai`, owner decision 2026-10-07).
    isFeatureEnabled("ai"),
    // Where the lesson sits in the student's course (null for a lesson read only through a teacher assignment).
    getLessonCourseContext(actor, lesson.subject.id, lesson.id),
  ]);
  const toc = lesson.content ? tocItems(lesson.content.headings) : [];
  const topicPage = topicHref(lesson.subject.id, lesson.topic.id);
  const practise = practiceHref({ subjectId: lesson.subject.id, topicId: lesson.topic.id, count: 10 });
  const completed = lesson.progress?.status === "COMPLETED";
  // Next steps: the next lesson in the COURSE (it may start the next topic); the topic's own order otherwise.
  const nextLesson = course
    ? course.next
    : lesson.next
      ? { id: lesson.next.id, title: lesson.next.title, topicId: lesson.topic.id, locked: lesson.next.locked }
      : null;
  const quickCheck =
    check && check.status !== "UNAVAILABLE"
      ? check.status === "COMPLETED"
        ? { status: check.status, questionCount: check.questionCount, answeredCount: check.answeredCount, percentage: check.percentage }
        : check.status === "IN_PROGRESS"
          ? { status: check.status, questionCount: check.questionCount, answeredCount: check.answeredCount }
          : { status: check.status, questionCount: check.questionCount }
      : null;
  const completedLabel = completed && lesson.progress?.completedAt ? `Completed on ${formatInstantDate(lesson.progress.completedAt, actor.timeZone)}` : null;

  return (
    <Container className="pb-12">
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_14rem] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_16rem] xl:gap-14">
        <article className="mx-auto max-w-reading min-w-0 lg:mx-0 [&_[id]]:scroll-mt-32 lg:[&_[id]]:scroll-mt-24">
          <PageHeader
            breadcrumbs={[
              { label: "Learn", href: "/app/subjects" },
              { label: lesson.subject.name, href: `/app/subjects/${lesson.subject.id}` },
              { label: lesson.topic.name, href: topicPage },
              { label: lesson.title },
            ]}
            eyebrow={
              <>
                {codedName(lesson.topic.name, lesson.topic.code)}
                {lesson.position !== null && lesson.totalInTopic > 1 ? ` · Lesson ${lesson.position} of ${lesson.totalInTopic}` : ""}
              </>
            }
            title={lesson.title}
            description={lesson.summary ?? undefined}
            className="pb-4"
          />

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted">
            <span className="inline-flex items-center gap-1.5">
              <Clock aria-hidden="true" className="size-4" />
              {formatDuration(lesson.estimatedMinutes)} read
            </span>
            {lesson.kind !== "LESSON" && (
              <Badge tone="primary" size="sm">
                {lessonKindLabel(lesson.kind)}
              </Badge>
            )}
            {completed ? (
              <Badge tone="success" size="sm" icon={<CircleCheck aria-hidden="true" />}>
                Completed
              </Badge>
            ) : (
              lesson.progress && (
                <Badge tone="neutral" size="sm">
                  In progress
                </Badge>
              )
            )}
            {lesson.assigned && (
              <Badge tone="info" size="sm">
                Assigned by your teacher
              </Badge>
            )}
            {lesson.isDemo && (
              <Badge tone="warning" size="sm">
                Demo content (development only)
              </Badge>
            )}
          </div>

          {lesson.progress?.revisedSinceCompletion && (
            <Alert tone="info" className="mt-4">
              This lesson was updated after you completed it.
            </Alert>
          )}

          {toc.length > 0 && <LessonToc variant="compact" items={toc} className="mt-5 lg:hidden" />}

          {lesson.objectives.length > 0 && (
            <section aria-labelledby="lesson-objectives-title" className="mt-6 rounded-card border border-border bg-subtle p-4 sm:p-5">
              <h2 id="lesson-objectives-title" className="text-sm font-semibold text-text">
                What this lesson covers
              </h2>
              <ul className="mt-2 space-y-1.5 text-sm text-text">
                {lesson.objectives.map((objective) => (
                  <li key={objective.id} className="flex gap-2">
                    <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span className="min-w-0">{objective.statement}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {lesson.locked || !lesson.content ? (
            <LockedLessonNotice upgradeHref={lesson.upgradePath} backHref={topicPage} backLabel={`Back to ${lesson.topic.name}`} className="mt-8" />
          ) : (
            <>
              <RichContent html={lesson.content.html} lang={lesson.languageCode !== "en" ? lesson.languageCode : undefined} className="mt-8 text-base sm:text-[1.0625rem]" />

              {check && check.status !== "UNAVAILABLE" && (
                <LessonCheckSection
                  className="mt-10"
                  state={check}
                  lessonId={lesson.id}
                  topicId={lesson.topic.id}
                  topicName={lesson.topic.name}
                  idempotencyKey={randomUUID()}
                  upgradeHref={lesson.upgradePath}
                  askTutor={askTutor}
                  actions={{
                    start: startLessonCheckAction,
                    answer: answerLessonQuestionAction,
                    hint: revealLessonHintAction,
                    selfAssess: selfAssessLessonAnswerAction,
                    report: reportProblemAction,
                  }}
                />
              )}

              <section aria-labelledby="lesson-complete-title" className="mt-10 space-y-3 rounded-card border border-border bg-surface p-4 sm:p-6 print:hidden">
                <h2 id="lesson-complete-title" className="text-lg font-semibold text-text">
                  {completed ? "Your progress" : "Finished reading?"}
                </h2>
                {!completed && <p className="text-sm text-muted">Mark the lesson as complete so it counts towards your progress in {lesson.topic.name}.</p>}
                <MarkCompleteForm lessonId={lesson.id} action={completeLessonAction} completed={completed} completedLabel={completedLabel} />
              </section>

              <LessonActivityTracker lessonId={lesson.id} record={recordLessonActivityAction} />
            </>
          )}

          <LessonNextSteps
            className="mt-8"
            check={quickCheck}
            practise={{ href: practise, topicName: lesson.topic.name }}
            next={nextLesson}
            unit={course?.unit ?? null}
            courseHref={`/app/subjects/${lesson.subject.id}`}
            extra={<AskTutorLink enabled={askTutor} subjectId={lesson.subject.id} topicId={lesson.topic.id} label="Ask the tutor about this topic" />}
          />

          {/* The next lesson is the last of the next steps; the pager keeps "previous" (and "next" when the steps lack one). */}
          <LessonPager previous={lesson.previous} next={nextLesson ? null : lesson.next} topicId={lesson.topic.id} className="mt-6" />

          {lesson.attribution && <LessonAttributionFooter attribution={lesson.attribution} className="mt-10" />}

          {!lesson.locked && lesson.content && (
            <footer className="mt-6 border-t border-border pt-2 print:hidden">
              <ReportProblemButton action={reportProblemAction} entityType="LESSON" entityId={lesson.id} itemLabel="this lesson" />
            </footer>
          )}
        </article>

        {toc.length > 0 && (
          <aside className="hidden lg:block print:hidden">
            <div className="sticky top-24 max-h-[calc(100dvh-7rem)] overflow-y-auto pt-8 pb-6">
              <LessonToc variant="sidebar" items={toc} />
            </div>
          </aside>
        )}
      </div>
    </Container>
  );
}
