import { ArrowRight, BookOpen, ChevronDown, ClipboardList, FileText, Lightbulb, Target } from "lucide-react";
import type { Metadata } from "next";
import { notFound, unstable_rethrow } from "next/navigation";
import { cache } from "react";
import { z } from "zod";
import { practiceHref } from "@/components/dashboard/links";
import { RecommendedSessions } from "@/components/dashboard/RecommendedSessions";
import { CourseOutline } from "@/components/learn/CourseOutline";
import { continueVerb, lessonsProgressText, nextLessonCaption, qualificationLine } from "@/components/learn/format";
import { MasteryTabsCard } from "@/components/learn/MasteryTabsCard";
import { TopicJump } from "@/components/learn/TopicJump";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { codedName, lessonHref } from "@/components/lessons/labels";
import { countdownSentence, formatLocalDate } from "@/components/student/format";
import { RecentTests } from "@/components/subjects/RecentTests";
import { SyllabusUpgradeNotice } from "@/components/subjects/SyllabusUpgradeNotice";
import { TopicTree } from "@/components/subjects/TopicTree";
import { Alert } from "@/components/ui/Alert";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatTile } from "@/components/ui/StatTile";
import { formatCount, formatDuration, formatNumber, formatPercent } from "@/lib/format";
import { MASTERY_BAND_MIN_SCORE } from "@/lib/mastery-band";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { hasEntitlement } from "@/server/billing/entitlements";
import { getSyllabusUpgradeOffer } from "@/server/enrollment";
import { getCourse } from "@/server/lessons/course";
import { isAppError } from "@/server/lib/errors";
import { getSubjectDashboard } from "@/server/progress/service";
import { getSubjectTopicTree } from "@/server/progress/student-overview";
import { moveSyllabusVersionAction } from "./actions";

const paramsSchema = z.object({ subjectId: z.uuid() });

type Params = Promise<{ subjectId: string }>;

/** Memoised per request: generateMetadata and the page share one read. */
const loadDashboard = cache(async (subjectId: string) => {
  const actor = await requireOnboardedStudent({ next: `/app/subjects/${subjectId}` });
  try {
    const [dashboard, course, tree, countdownIncluded, upgrade] = await Promise.all([
      getSubjectDashboard(actor, subjectId),
      getCourse(actor, subjectId),
      getSubjectTopicTree(actor, subjectId),
      hasEntitlement(actor, "examCountdown"),
      getSyllabusUpgradeOffer(actor, subjectId),
    ]);
    return { actor, dashboard, course, tree, countdownIncluded, upgrade };
  } catch (error) {
    if (isAppError(error) && error.code === "NOT_FOUND") notFound();
    throw error;
  }
});

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const parsed = paramsSchema.safeParse(await params);
  if (!parsed.success) return { title: "Subject" };
  try {
    const { dashboard } = await loadDashboard(parsed.data.subjectId);
    return { title: dashboard.subject.name };
  } catch (error) {
    unstable_rethrow(error);
    return { title: "Subject" };
  }
}

/**
 * Course page (design brief "Learn"; §7 subject dashboard): the subject as a course. A primary "Continue" call to
 * action opens the next lesson; the syllabus topics follow in syllabus order, each listing its published lessons with
 * completion state; secondary actions lead to practice, topic tests and mock exams. Mastery (§11), statistics, recent
 * tests and recommendations stay on the page as the secondary column, and the full mastery tree sits in a collapsed
 * panel at the end. Pinned syllabus version (§26) with the audited move to a newer version.
 */
export default async function SubjectDashboardPage({ params }: { params: Params }) {
  const parsed = paramsSchema.safeParse(await params);
  if (!parsed.success) notFound();
  const { subjectId } = parsed.data;
  const { actor, dashboard, course, tree, countdownIncluded, upgrade } = await loadDashboard(subjectId);
  const { subject, enrollment, progress } = dashboard;
  const countdown = countdownIncluded && dashboard.examCountdown && dashboard.examCountdown.daysUntil >= 0 ? dashboard.examCountdown : null;
  const coverage = new Map(dashboard.topics.map((t) => [t.topicId, { leavesStarted: t.leavesStarted, leavesTotal: t.leavesTotal }]));
  const strongest =
    dashboard.strongest && dashboard.strongest.score !== null && dashboard.strongest.score >= MASTERY_BAND_MIN_SCORE.STRONG && dashboard.strongest.topicId !== dashboard.weakest?.topicId
      ? dashboard.strongest
      : null;
  const toRow = (t: (typeof dashboard.weakTopics)[number]) => ({ topicId: t.topicId, name: t.name, subjectId: subject.id, subjectName: subject.name, score: t.score ?? 0 });
  const next = course.next;
  const finished = course.totalLessons > 0 && next === null;
  const examsHref = `/app/exams?subjectId=${encodeURIComponent(subject.id)}`;
  const { topicTests, mockExams } = course.assessments;

  return (
    <Container className="space-y-6 pb-10">
      <PageHeader
        breadcrumbs={[{ label: "Learn", href: "/app/subjects" }, { label: subject.name }]}
        eyebrow={qualificationLine(course.qualificationName, course.boardName)}
        title={subject.name}
        description={
          <>
            {enrollment.syllabus.title} · version {enrollment.syllabus.versionLabel}
            {enrollment.status === "PAUSED" ? " · paused" : ""}
          </>
        }
        className="pb-0"
      />

      {enrollment.status === "DROPPED" && (
        <Alert
          tone="neutral"
          title="This subject is no longer on your list"
          action={
            <ButtonLink href="/app/subjects/manage" variant="outline">
              Add it back
            </ButtonLink>
          }
        >
          Your progress below is kept. Add the subject back to continue where you left off.
        </Alert>
      )}

      {upgrade && (
        <SyllabusUpgradeNotice
          subjectId={subject.id}
          fromSyllabusId={upgrade.pinned.id}
          toSyllabusId={upgrade.current.id}
          pinnedLabel={upgrade.pinned.versionLabel}
          currentLabel={upgrade.current.versionLabel}
          currentTitle={upgrade.current.title}
          currentFrom={formatLocalDate(upgrade.current.effectiveFrom)}
          practisedTopics={upgrade.practisedTopics}
          carriedTopics={upgrade.carriedTopics}
          droppedChoices={upgrade.droppedChoices}
          examWarning={
            upgrade.examWarning
              ? { ...upgrade.examWarning, startsOn: formatLocalDate(upgrade.examWarning.startsOn) }
              : null
          }
          action={moveSyllabusVersionAction}
        />
      )}

      <Card as="section" aria-labelledby="course-continue-title">
        <div className="grid gap-5 p-4 sm:p-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:items-center">
          <div className="min-w-0 space-y-3">
            <h2 id="course-continue-title" className="text-sm font-semibold text-primary">
              {course.totalLessons === 0 ? "Lessons" : finished ? "Course completed" : nextLessonCaption(next?.reason ?? "START")}
            </h2>
            {next ? (
              <>
                <p className="text-xl leading-snug font-bold tracking-tight break-words text-text sm:text-2xl">{next.title}</p>
                <p className="text-sm text-muted">
                  {next.unitName ? `${next.unitName} · ` : ""}
                  {formatDuration(next.estimatedMinutes)} read
                </p>
              </>
            ) : course.totalLessons === 0 ? (
              <p className="flex items-start gap-2 text-base text-text">
                <BookOpen aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-muted" />
                <span>Lessons for this subject are being added. Its topics are listed below.</span>
              </p>
            ) : (
              <p className="text-base text-text">You have completed every lesson in this course. Revisit any topic below, or test yourself.</p>
            )}
            {course.totalLessons > 0 && (
              <ProgressBar
                label="Course progress"
                value={course.completedLessons}
                max={course.totalLessons}
                valueText={lessonsProgressText(course.completedLessons, course.totalLessons)}
                tone={finished ? "success" : "primary"}
                size="sm"
              />
            )}
          </div>
          <div className="flex flex-col gap-2">
            {next && (
              <ButtonLink
                href={lessonHref(next.id, { topicId: next.topicId })}
                size="lg"
                iconEnd={<ArrowRight aria-hidden="true" />}
                aria-label={`${continueVerb(next.reason)}: ${next.title}`}
              >
                {continueVerb(next.reason)} lesson
              </ButtonLink>
            )}
            <ButtonLink href={practiceHref({ subjectId: subject.id })} variant={next ? "outline" : "primary"} iconStart={<Target aria-hidden="true" />}>
              Practise this subject
            </ButtonLink>
            {(topicTests > 0 || mockExams > 0) && (
              <div className="grid grid-cols-1 gap-2 min-[400px]:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {topicTests > 0 && (
                  <ButtonLink href={`${examsHref}#group-TOPIC_TEST`} variant="ghost" iconStart={<FileText aria-hidden="true" />}>
                    Topic tests ({formatNumber(topicTests)})
                  </ButtonLink>
                )}
                {mockExams > 0 && (
                  <ButtonLink href={`${examsHref}#group-MOCK_EXAM`} variant="ghost" iconStart={<ClipboardList aria-hidden="true" />}>
                    Mock exams ({formatNumber(mockExams)})
                  </ButtonLink>
                )}
              </div>
            )}
          </div>
        </div>
      </Card>

      {countdown && (
        <p className="text-sm text-muted">
          <span className="font-semibold text-text">{countdownSentence(countdown.daysUntil)}</span> · {countdown.name}
          {countdown.isProvisional ? " (provisional date)" : ""}, starts {formatLocalDate(countdown.startsOn)}
          {enrollment.targetGrade ? ` · target grade ${enrollment.targetGrade}` : ""}
        </p>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <section aria-labelledby="course-topics-title" className="min-w-0 space-y-3">
          <div className="space-y-1">
            <h2 id="course-topics-title" className="text-lg font-semibold text-text">
              Topics and lessons
            </h2>
            <p className="text-sm text-muted">
              {course.unitsTotal > 0
                ? `${formatCount(course.unitsTotal, "topic")} in syllabus order${
                    course.unitsWithLessons < course.unitsTotal ? `, ${formatNumber(course.unitsWithLessons)} with lessons so far` : ""
                  }. Study them in any order: Continue only suggests where you left off.`
                : "The topics of this syllabus will show here."}
            </p>
          </div>
          <TopicJump
            subjectId={subject.id}
            topics={course.units.map((unit) => ({ id: unit.id, label: codedName(unit.name, unit.code), section: unit.section ? codedName(unit.section.name, unit.section.code) : null }))}
          />
          <CourseOutline subjectId={subject.id} units={course.units} nextLessonId={next?.id ?? null} />
        </section>

        <div className="min-w-0 space-y-6">
          {dashboard.weakestMessage && dashboard.weakest && (
            <Alert
              tone="accent"
              icon={<Lightbulb aria-hidden="true" />}
              title={dashboard.weakestMessage}
              action={
                <ButtonLink
                  href={practiceHref({ subjectId: subject.id, topicId: dashboard.weakest.topicId, count: 10, origin: "RECOMMENDATION" })}
                  variant="outline"
                  size="md"
                >
                  Practise {dashboard.weakest.name}
                </ButtonLink>
              }
            >
              {strongest ? `Your strongest area is ${strongest.name}.` : "A short practice session on it now will help most."}
            </Alert>
          )}

          <section aria-labelledby="subject-stats-title" className="space-y-3">
            <h2 id="subject-stats-title" className="text-lg font-semibold text-text">
              Practice and results
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <StatTile
                label="Syllabus progress"
                value={progress ? formatPercent(progress.progressPercent) : null}
                hint={
                  progress && progress.topicsTotal > 0
                    ? `${formatNumber(progress.topicsCompleted)} of ${formatCount(progress.topicsTotal, "topic")} completed`
                    : "Not started yet"
                }
              />
              <StatTile
                label="Questions completed"
                value={progress?.questionsAttempted ?? 0}
                hint={progress?.accuracyPercent == null ? "No answers yet" : `${formatPercent(progress.accuracyPercent)} accuracy`}
              />
              <StatTile
                label="Topics started"
                value={progress ? formatPercent(progress.syllabusCoveragePercent) : null}
                hint={progress ? `${formatNumber(progress.topicsRemaining)} remaining` : undefined}
              />
              <StatTile
                label="Average score"
                value={progress?.averageScorePercent == null ? null : formatPercent(progress.averageScorePercent)}
                hint={progress?.assessmentsCompleted ? formatCount(progress.assessmentsCompleted, "test") : "Shown after your first test"}
              />
            </div>
            {progress?.predictedGrade && (
              <p className="text-sm text-muted">
                Estimated grade: <span className="font-semibold text-text">{progress.predictedGrade}</span>. An estimate from your mock exams and
                topic mastery, not an official result.
              </p>
            )}
          </section>

          <MasteryTabsCard
            id="subject-mastery-title"
            weak={dashboard.weakTopics.map(toRow)}
            strong={dashboard.strongTopics.map(toRow)}
            hideSubject
            weakEmpty={progress?.questionsAttempted ? "No weak topics right now." : "Practise this subject and the topics that need work will show here."}
            strongEmpty="Topics reach this list at the Strong band (75% mastery)."
          />

          <Card as="section" aria-labelledby="recent-tests-title">
            <CardHeader titleAs="h2" title={<span id="recent-tests-title">Recent tests</span>} />
            <CardBody>
              <RecentTests tests={dashboard.recentTests} subjectId={subject.id} timeZone={actor.timeZone} />
            </CardBody>
          </Card>
        </div>
      </div>

      <RecommendedSessions
        headingId="subject-recommended-title"
        title="Recommended practice"
        items={dashboard.recommended}
        emptyDescription="Recommendations appear once this syllabus has published topics."
      />

      <details className="group rounded-card border border-border bg-surface">
        <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 rounded-card px-4 py-3 hover:bg-subtle sm:px-5 [&::-webkit-details-marker]:hidden">
          <span className="min-w-0">
            <span className="block font-semibold text-text">Mastery by topic</span>
            <span className="block text-sm text-muted">Mastery in each topic of your syllabus version, from your practice and tests.</span>
          </span>
          <ChevronDown aria-hidden="true" className="size-5 shrink-0 text-muted transition-transform group-open:rotate-180 motion-reduce:transition-none" />
        </summary>
        <div className="border-t border-border p-4 sm:p-5">
          <TopicTree subjectId={subject.id} nodes={tree} coverage={coverage} />
        </div>
      </details>
    </Container>
  );
}
