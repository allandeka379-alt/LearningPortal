import { ArrowLeft, ArrowRight, BookOpen, Layers, RotateCcw, Target } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { LESSON_PRACTICE_ANCHOR, lessonHref } from "@/components/lessons/labels";
import { PageHeader } from "@/components/layout/PageHeader";
import { ReviewList } from "@/components/questions/ReviewList";
import { SelfMarkingNotice } from "@/components/questions/SelfMarkingNotice";
import { Alert } from "@/components/ui/Alert";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { MasteryBadge } from "@/components/ui/MasteryBadge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatTile } from "@/components/ui/StatTile";
import { formatCount, formatPercent } from "@/lib/format";
import { recommendationLabel, recommendationReason } from "@/lib/recommendations";
import { attemptResultsHref, isPracticeLike, type RecommendationView } from "@/server/attempts";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { isFeatureEnabled } from "@/server/features";
import { isAppError } from "@/server/lib/errors";
import { getPracticeSummary, type PracticeSummary } from "@/server/practice";
import { reportProblemAction } from "../../../_actions/report-problem";
import { selfAssessAction } from "../../actions";
import { MasteryChangeNote } from "./_components/MasteryChangeNote";

export const metadata: Metadata = { title: "Session results" };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function loadSummary(attemptId: string): Promise<PracticeSummary> {
  if (!UUID.test(attemptId)) notFound();
  const actor = await requireOnboardedStudent({ next: `/app/practice/${attemptId}/summary` });
  try {
    return await getPracticeSummary(actor, attemptId);
  } catch (error) {
    if (isAppError(error) && error.code === "NOT_FOUND") notFound();
    throw error;
  }
}

const RECOMMENDATION_ICON: Record<RecommendationView["kind"], typeof BookOpen> = {
  LESSON: BookOpen,
  PRACTICE: Target,
  TOPIC_TEST: RotateCcw,
  FLASHCARDS: Layers,
};

/**
 * Practice session summary (§10, §11, §19): score, per-topic results with the topic's mastery now and the band change
 * this session made (recorded on the attempt by the server), the engine's recommended next steps (lessons, re-tests),
 * XP from the ledger, and every question for review — written answers still waiting for marking can be self-marked
 * there when AI marking is not configured. A lesson's practice questions (LESSON_CHECK) lead back to the lesson.
 */
export default async function PracticeSummaryPage({ params }: { params: Promise<{ attemptId: string }> }) {
  const { attemptId } = await params;
  const summary = await loadSummary(attemptId);
  // "Ask the tutor" only while AI is switched on (`features.ai`, owner decision 2026-10-07).
  const askTutor = await isFeatureEnabled("ai");

  if (summary.status === "IN_PROGRESS") redirect(`/app/practice/${attemptId}`);
  if (summary.mode === "DAILY_QUESTION" || !isPracticeLike(summary.mode)) redirect(attemptResultsHref(summary.mode, attemptId));

  const result = summary.result;
  const score = result?.score ?? null;
  const nothingAnswered = !score || score.answeredCount === 0;
  const practiseAgainHref = `/app/practice?subjectId=${summary.subject.id}`;
  // A lesson's practice questions belong to the lesson: link back there instead of to the practice builder.
  const lesson = summary.mode === "LESSON_CHECK" && summary.lesson ? { title: summary.lesson.title, href: lessonHref(summary.lesson.id, { hash: LESSON_PRACTICE_ANCHOR }) } : null;

  return (
    <Container size="reading" className="space-y-8 pb-12">
      <PageHeader
        eyebrow={summary.subject.name}
        title={lesson ? "Lesson practice results" : "Session results"}
        breadcrumbs={lesson ? [{ label: lesson.title, href: lesson.href }, { label: "Results" }] : [{ label: "Practice", href: "/app/practice" }, { label: "Results" }]}
        className="pb-0"
      />

      {nothingAnswered ? (
        <EmptyState
          icon={<Target aria-hidden="true" />}
          title="No answers to score"
          description="This session ended before any question was answered."
          action={lesson ? <ButtonLink href={lesson.href}>Back to the lesson</ButtonLink> : <ButtonLink href={practiseAgainHref}>Start a new session</ButtonLink>}
        />
      ) : (
        <>
          <section aria-labelledby="score-heading" className="space-y-4">
            <h2 id="score-heading" className="sr-only">
              Your score
            </h2>
            {summary.selfAssessableCount > 0 ? (
              <SelfMarkingNotice count={summary.selfAssessableCount} />
            ) : (
              score.isProvisional && (
                <Alert tone="info" title="Some answers are still being marked">
                  Your score will update when marking is finished.
                </Alert>
              )
            )}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <StatTile label="Score" value={score.percentage === null ? null : formatPercent(score.percentage)} className="col-span-2 sm:col-span-1" />
              <StatTile label="Marks" value={`${score.marksAwarded} / ${score.totalMarks}`} />
              <StatTile
                label="Correct"
                value={`${score.correctCount} / ${score.answeredCount}`}
                hint={score.answeredCount < score.questionCount ? `${score.questionCount - score.answeredCount} not answered` : undefined}
              />
            </div>
            {summary.xpEarned !== null && summary.xpEarned > 0 && (
              <p className="text-sm font-medium text-accent-text">+{summary.xpEarned} XP for this session</p>
            )}
          </section>

          {summary.topics.length > 0 && (
            <Card as="section" aria-labelledby="topics-heading">
              <CardHeader titleAs="h2" title={<span id="topics-heading">By topic</span>} description="Your score in each topic this session, and the topic's mastery now." />
              <CardBody>
                <ul className="space-y-5">
                  {summary.topics.map((topic) => (
                    <li key={topic.topicId} className="space-y-2">
                      <ProgressBar
                        label={topic.topicName ?? "Topic"}
                        value={topic.percent}
                        valueText={`${topic.marksAwarded} of ${formatCount(topic.marksAvailable, "mark")}`}
                        size="sm"
                      />
                      <div className="flex flex-wrap items-center gap-2 text-sm">
                        <span className="text-muted">Mastery now:</span>
                        {topic.mastery ? <MasteryBadge band={topic.mastery.band} size="sm" /> : <MasteryBadge size="sm" />}
                        <MasteryChangeNote change={topic.change} />
                      </div>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          )}

          {result && result.recommendations.length > 0 && (
            <section aria-labelledby="next-heading" className="space-y-3">
              <h2 id="next-heading" className="text-lg font-semibold text-text">
                What to do next
              </h2>
              <ul className="space-y-3">
                {result.recommendations.map((rec, index) => {
                  const Icon = RECOMMENDATION_ICON[rec.kind];
                  return (
                    <li key={`${rec.kind}-${rec.topicId}-${index}`}>
                      <Card interactive={rec.href !== null} className="p-4">
                        <div className="flex items-start gap-3">
                          <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-soft text-on-primary-soft">
                            <Icon aria-hidden="true" className="size-4.5" />
                          </span>
                          <div className="min-w-0 flex-1 space-y-1">
                            {rec.href ? (
                              <Link href={rec.href} className="font-semibold text-text after:absolute after:inset-0 hover:text-primary">
                                {recommendationLabel(rec)}
                              </Link>
                            ) : (
                              <p className="font-semibold text-text">{recommendationLabel(rec)}</p>
                            )}
                            {recommendationReason(rec.reason) && <p className="text-sm text-muted">{recommendationReason(rec.reason)}</p>}
                          </div>
                          {rec.href && <ArrowRight aria-hidden="true" className="mt-1 size-4 shrink-0 text-muted" />}
                        </div>
                      </Card>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
        </>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        {lesson ? (
          <ButtonLink href={lesson.href} iconStart={<ArrowLeft aria-hidden="true" />}>
            Back to the lesson
          </ButtonLink>
        ) : (
          <ButtonLink href={practiseAgainHref} iconStart={<RotateCcw aria-hidden="true" />}>
            Practise again
          </ButtonLink>
        )}
        <ButtonLink href="/app" variant="outline">
          Back to home
        </ButtonLink>
      </div>

      {!nothingAnswered && summary.review.length > 0 && (
        <section aria-labelledby="review-heading" className="space-y-3">
          <h2 id="review-heading" className="text-lg font-semibold text-text">
            Review your answers
          </h2>
          <ReviewList
            items={summary.review}
            selfAssess={{ attemptId: summary.attemptId, action: selfAssessAction }}
            report={{ attemptId: summary.attemptId, action: reportProblemAction }}
            askTutor={askTutor}
          />
        </section>
      )}
    </Container>
  );
}
