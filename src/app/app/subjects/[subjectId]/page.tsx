import { ClipboardList, Lightbulb, Target } from "lucide-react";
import type { Metadata } from "next";
import { notFound, unstable_rethrow } from "next/navigation";
import { cache } from "react";
import { z } from "zod";
import { practiceHref } from "@/components/dashboard/links";
import { RecommendedSessions } from "@/components/dashboard/RecommendedSessions";
import { TopicMasteryList } from "@/components/dashboard/TopicMasteryList";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { countdownSentence, formatLocalDate } from "@/components/student/format";
import { RecentTests } from "@/components/subjects/RecentTests";
import { SyllabusUpgradeNotice } from "@/components/subjects/SyllabusUpgradeNotice";
import { TopicTree } from "@/components/subjects/TopicTree";
import { Alert } from "@/components/ui/Alert";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { StatTile } from "@/components/ui/StatTile";
import { formatCount, formatNumber, formatPercent } from "@/lib/format";
import { MASTERY_BAND_MIN_SCORE } from "@/lib/mastery-band";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { hasEntitlement } from "@/server/billing/entitlements";
import { getSyllabusUpgradeOffer } from "@/server/enrollment";
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
    const [dashboard, tree, countdownIncluded, upgrade] = await Promise.all([
      getSubjectDashboard(actor, subjectId),
      getSubjectTopicTree(actor, subjectId),
      hasEntitlement(actor, "examCountdown"),
      getSyllabusUpgradeOffer(actor, subjectId),
    ]);
    return { actor, dashboard, tree, countdownIncluded, upgrade };
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
 * Subject dashboard (§7): syllabus progress over the PINNED version (§26; "A newer syllabus is available" offers the
 * audited move to the CURRENT version), topic tree with mastery bands, average
 * score, questions completed, weakest and strongest topics ("Your weakest area is X." only with evidence), recent
 * tests and recommended topics, with links into practice, tests and topic pages.
 */
export default async function SubjectDashboardPage({ params }: { params: Params }) {
  const parsed = paramsSchema.safeParse(await params);
  if (!parsed.success) notFound();
  const { subjectId } = parsed.data;
  const { actor, dashboard, tree, countdownIncluded, upgrade } = await loadDashboard(subjectId);
  const { subject, enrollment, progress } = dashboard;
  const countdown = countdownIncluded && dashboard.examCountdown && dashboard.examCountdown.daysUntil >= 0 ? dashboard.examCountdown : null;
  const coverage = new Map(dashboard.topics.map((t) => [t.topicId, { leavesStarted: t.leavesStarted, leavesTotal: t.leavesTotal }]));
  const strongest =
    dashboard.strongest && dashboard.strongest.score !== null && dashboard.strongest.score >= MASTERY_BAND_MIN_SCORE.STRONG && dashboard.strongest.topicId !== dashboard.weakest?.topicId
      ? dashboard.strongest
      : null;
  const toRow = (t: (typeof dashboard.weakTopics)[number]) => ({ topicId: t.topicId, name: t.name, subjectId: subject.id, subjectName: subject.name, score: t.score ?? 0 });

  return (
    <Container className="space-y-6 pb-10">
      <PageHeader
        breadcrumbs={[{ label: "Subjects", href: "/app/subjects" }, { label: subject.name }]}
        eyebrow={subject.qualification.name}
        title={subject.name}
        description={
          <>
            {enrollment.syllabus.title} · version {enrollment.syllabus.versionLabel}
            {enrollment.status === "PAUSED" ? " · paused" : ""}
          </>
        }
        actions={
          <>
            <ButtonLink href={practiceHref({ subjectId: subject.id })} iconStart={<Target aria-hidden="true" />}>
              Practise
            </ButtonLink>
            <ButtonLink href={`/app/exams?subjectId=${encodeURIComponent(subject.id)}`} variant="outline" iconStart={<ClipboardList aria-hidden="true" />}>
              Tests and exams
            </ButtonLink>
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

      {countdown && (
        <p className="text-sm text-muted">
          <span className="font-semibold text-text">{countdownSentence(countdown.daysUntil)}</span> · {countdown.name}
          {countdown.isProvisional ? " (provisional date)" : ""}, starts {formatLocalDate(countdown.startsOn)}
          {enrollment.targetGrade ? ` · target grade ${enrollment.targetGrade}` : ""}
        </p>
      )}

      <section aria-labelledby="subject-stats-title" className="space-y-3">
        <h2 id="subject-stats-title" className="sr-only">
          Subject statistics
        </h2>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
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
            label="Topics started"
            value={progress ? formatPercent(progress.syllabusCoveragePercent) : null}
            hint={progress ? `${formatNumber(progress.topicsRemaining)} remaining` : undefined}
          />
          <StatTile
            label="Average score"
            value={progress?.averageScorePercent == null ? null : formatPercent(progress.averageScorePercent)}
            hint={progress?.assessmentsCompleted ? formatCount(progress.assessmentsCompleted, "test") : "Shown after your first test"}
          />
          <StatTile
            label="Questions completed"
            value={progress?.questionsAttempted ?? 0}
            hint={progress?.accuracyPercent == null ? "No answers yet" : `${formatPercent(progress.accuracyPercent)} accuracy`}
          />
        </div>
        {progress?.predictedGrade && (
          <p className="text-sm text-muted">
            Estimated grade: <span className="font-semibold text-text">{progress.predictedGrade}</span>. An estimate from your mock exams and
            topic mastery, not an official result.
          </p>
        )}
      </section>

      {dashboard.weakestMessage && dashboard.weakest && (
        <Alert
          tone="accent"
          icon={<Lightbulb aria-hidden="true" />}
          title={dashboard.weakestMessage}
          action={
            <ButtonLink href={practiceHref({ subjectId: subject.id, topicId: dashboard.weakest.topicId, count: 10, origin: "RECOMMENDATION" })} variant="outline" size="md">
              Practise {dashboard.weakest.name}
            </ButtonLink>
          }
        >
          {strongest ? `Your strongest area is ${strongest.name}.` : "A short practice session on it now will help most."}
        </Alert>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <Card as="section" aria-labelledby="topic-progress-title">
          <CardHeader titleAs="h2" title={<span id="topic-progress-title">Topic progress</span>} description="Mastery in each topic of your syllabus version." />
          <CardBody>
            <TopicTree subjectId={subject.id} nodes={tree} coverage={coverage} />
          </CardBody>
        </Card>

        <div className="space-y-6">
          <TopicMasteryList
            id="subject-weak-title"
            title="Weakest topics"
            variant="weak"
            topics={dashboard.weakTopics.map(toRow)}
            empty={progress?.questionsAttempted ? "No weak topics right now." : "Practise this subject and the topics that need work will show here."}
          />
          <TopicMasteryList
            id="subject-strong-title"
            title="Strongest topics"
            variant="strong"
            topics={dashboard.strongTopics.map(toRow)}
            empty="Topics reach this list at the Strong band (75% mastery)."
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
        title="Recommended topics"
        items={dashboard.recommended}
        emptyDescription="Recommendations appear once this syllabus has published topics."
      />
    </Container>
  );
}
