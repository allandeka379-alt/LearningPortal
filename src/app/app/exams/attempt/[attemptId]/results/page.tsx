import { ClipboardList, RotateCcw, Target } from "lucide-react";
import type { Metadata } from "next";
import { notFound, redirect, unstable_rethrow } from "next/navigation";
import { cache } from "react";
import { practiceHref } from "@/components/dashboard/links";
import { ClearExamDraft } from "@/components/exam/ClearExamDraft";
import { RecommendedStudy, type StudyRecommendation } from "@/components/exam/results/RecommendedStudy";
import { ScoreSummary } from "@/components/exam/results/ScoreSummary";
import { ShareResultSlot } from "@/components/exam/results/ShareResultSlot";
import { TopicAreas } from "@/components/exam/results/TopicAreas";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ReviewList } from "@/components/questions/ReviewList";
import { SelfMarkingNotice } from "@/components/questions/SelfMarkingNotice";
import { WhatsAppGroupShare } from "@/components/share/WhatsAppGroupShare";
import { formatInstantDate } from "@/components/student/format";
import { Alert } from "@/components/ui/Alert";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { APP_NAME } from "@/lib/config";
import { formatCount } from "@/lib/format";
import { recommendationReason } from "@/lib/recommendations";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { isFeatureEnabled } from "@/server/features";
import { getExamResults } from "@/server/exams/service";
import { absoluteUrl } from "@/server/lib/env";
import { isAppError } from "@/server/lib/errors";
import { reportProblemAction } from "../../../../_actions/report-problem";
import { selfAssessExamAnswerAction } from "../../../actions";
import { isUuid } from "../../../_lib/params";

type Params = Promise<{ attemptId: string }>;

/** One read per request, shared by generateMetadata and the page. */
const loadResults = cache(async (attemptId: string) => {
  const actor = await requireOnboardedStudent({ next: `/app/exams/attempt/${attemptId}/results` });
  try {
    return { actor, loaded: await getExamResults(actor, attemptId) };
  } catch (error) {
    if (isAppError(error) && error.code === "NOT_FOUND") notFound();
    throw error;
  }
});

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { attemptId } = await params;
  if (!isUuid(attemptId)) return { title: "Results" };
  try {
    const { loaded } = await loadResults(attemptId);
    return { title: loaded.kind === "RESULTS" ? `Results: ${loaded.results.title}` : "Results" };
  } catch (error) {
    unstable_rethrow(error);
    return { title: "Results" };
  }
}

/**
 * Results of a test, mock exam or diagnostic (§12, §52): "You scored 68%.", marks and percentage, the grade ESTIMATE
 * (clearly labelled, never official), marking still pending, strong and weak areas by topic, recommended study with
 * working links, marks per paper, then every question with the student's answer, the correct answer and the
 * explanation (`QuestionView` in review mode). Written answers still waiting for marking can be self-marked there when
 * AI marking is not configured. "Share result" (`ShareResultSlot`) appears once the score is final (§46).
 */
export default async function ExamResultsPage({ params }: { params: Params }) {
  const { attemptId } = await params;
  if (!isUuid(attemptId)) notFound();
  const { actor, loaded } = await loadResults(attemptId);
  if (loaded.kind === "REDIRECT") redirect(loaded.href);
  const results = loaded.results;
  // "Ask the tutor" only while AI is switched on (`features.ai`, owner decision 2026-10-07).
  const askTutor = await isFeatureEnabled("ai");

  const recommendations: StudyRecommendation[] = results.recommendations.map((rec) => ({
    kind: rec.kind,
    topicName: rec.topicName,
    lessonTitle: rec.lessonTitle,
    questionCount: rec.questionCount,
    reason: recommendationReason(rec.reason),
    href: rec.href,
  }));
  const weakest = results.weakAreas[0];
  const selfAssess = { attemptId: results.attemptId, action: selfAssessExamAnswerAction };
  const report = { attemptId: results.attemptId, action: reportProblemAction };
  const showSections = results.sections.length > 1;
  const sectionTitle = new Map(results.sections.map((s) => [s.sectionNumber, s.title]));
  const joinUrl = absoluteUrl("/register");
  const finalScore = results.score !== null && results.score.percentage !== null && !results.score.isProvisional;

  return (
    <Container size="reading" className="space-y-8 pb-12">
      <ClearExamDraft attemptId={results.attemptId} />
      <PageHeader
        eyebrow={`${results.modeLabel} · ${results.subject.name}`}
        title={results.title}
        description={results.submittedAt ? `Submitted ${formatInstantDate(results.submittedAt, actor.timeZone, "long")}` : undefined}
        breadcrumbs={[{ label: "Tests and exams", href: "/app/exams" }, { label: "Results" }]}
        className="pb-0"
      />

      {results.nothingAnswered ? (
        <EmptyState
          icon={<ClipboardList aria-hidden="true" />}
          title={results.status === "EXPIRED" ? "Time ran out before any answers were saved" : "No answers were saved in this attempt"}
          description="There is nothing to mark, so there is no score for this attempt."
          action={
            <>
              {results.retakeHref && <ButtonLink href={results.retakeHref}>Try the test again</ButtonLink>}
              <ButtonLink href="/app/exams" variant="outline">
                Back to tests
              </ButtonLink>
            </>
          }
        />
      ) : (
        <>
          <ScoreSummary
            results={results}
            actions={
              <>
                <ShareResultSlot attemptId={results.attemptId} mode={results.mode} isFinal={finalScore} />
                {results.mode === "MOCK_EXAM" && finalScore && (
                  <WhatsAppGroupShare
                    url={joinUrl}
                    message={`I just finished a ${results.subject.name} mock exam on ${APP_NAME}. Join our class/group here: ${joinUrl}`}
                    size="sm"
                  />
                )}
              </>
            }
          />
          <SelfMarkingNotice count={results.selfAssessableCount} />

          {showSections && (
            <Card as="section" aria-labelledby="papers-heading">
              <CardHeader titleAs="h2" title={<span id="papers-heading">By paper</span>} />
              <CardBody>
                <ul className="space-y-4">
                  {results.sections.map((section) => (
                    <li key={section.sectionNumber}>
                      <ProgressBar
                        label={section.title}
                        value={section.marksAwarded}
                        max={Math.max(1, section.marks)}
                        valueText={section.marksAwarded === null ? "Not marked yet" : `${section.marksAwarded} of ${formatCount(section.marks, "mark")}`}
                        size="sm"
                      />
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          )}

          <TopicAreas strong={results.strongAreas} weak={results.weakAreas} all={results.topics} />

          <RecommendedStudy items={recommendations} />

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {weakest && (
              <ButtonLink href={practiceHref({ subjectId: results.subject.id, topicId: weakest.topicId, origin: "RECOMMENDATION" })} iconStart={<Target aria-hidden="true" />}>
                Practise {weakest.topicName ?? "your weakest topic"}
              </ButtonLink>
            )}
            {results.retakeHref && (
              <ButtonLink href={results.retakeHref} variant="outline" iconStart={<RotateCcw aria-hidden="true" />}>
                Take this test again
              </ButtonLink>
            )}
            <ButtonLink href="/app/exams" variant="ghost">
              Back to tests
            </ButtonLink>
          </div>
        </>
      )}

      {results.answersWithheld && (
        <Alert tone="info" title="Answers come later">
          The correct answers and explanations for this test are shown after the assignment closes. Your score is above.
        </Alert>
      )}

      {results.review.length > 0 && (
        <section aria-labelledby="review-heading" className="space-y-3">
          <div className="space-y-1">
            <h2 id="review-heading" className="text-lg font-semibold text-text">
              Question by question
            </h2>
            <p className="text-sm text-muted">Open a question to see your answer, the correct answer and the explanation.</p>
          </div>
          {showSections
            ? results.sections.map((section) => {
                const items = results.review.filter((item) => item.sectionNumber === section.sectionNumber);
                if (items.length === 0) return null;
                return (
                  <div key={section.sectionNumber} className="space-y-2">
                    <h3 className="text-base font-semibold text-text">{sectionTitle.get(section.sectionNumber)}</h3>
                    <ReviewList items={items} headingLevel={3} selfAssess={selfAssess} report={report} askTutor={askTutor} />
                  </div>
                );
              })
            : <ReviewList items={results.review} headingLevel={3} selfAssess={selfAssess} report={report} askTutor={askTutor} />}
          {showSections && results.review.some((item) => item.sectionNumber === null || !sectionTitle.has(item.sectionNumber)) && (
            <ReviewList
              items={results.review.filter((item) => item.sectionNumber === null || !sectionTitle.has(item.sectionNumber))}
              headingLevel={3}
              selfAssess={selfAssess}
              report={report}
              askTutor={askTutor}
            />
          )}
        </section>
      )}
    </Container>
  );
}
