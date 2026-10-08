import { randomUUID } from "node:crypto";
import { CircleCheckBig } from "lucide-react";
import type { Metadata } from "next";
import { notFound, unstable_rethrow } from "next/navigation";
import { cache } from "react";
import { RichContent } from "@/components/content/RichContent";
import { AttemptHistoryList } from "@/components/exam/AttemptHistoryList";
import { ExamAccessNotice } from "@/components/exam/ExamAccessNotice";
import { formatTimeLimit } from "@/components/exam/exam-model";
import { durationText } from "@/components/exam/labels";
import { StartExamForm } from "@/components/exam/StartExamForm";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { formatCount } from "@/lib/format";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { UPGRADE_PATH } from "@/server/billing/entitlements";
import { getExamInstructions, type ExamInstructions } from "@/server/exams/service";
import { isAppError } from "@/server/lib/errors";
import { isUuid, parseStartOrigin, type SearchParams } from "../_lib/params";
import { startExamAction } from "../actions";

type Params = Promise<{ assessmentId: string }>;

/** One read per request, shared by generateMetadata and the page. */
const loadInstructions = cache(async (assessmentId: string) => {
  const actor = await requireOnboardedStudent({ next: `/app/exams/${assessmentId}` });
  try {
    return { actor, exam: await getExamInstructions(actor, assessmentId) };
  } catch (error) {
    if (isAppError(error) && error.code === "NOT_FOUND") notFound();
    throw error;
  }
});

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { assessmentId } = await params;
  if (!isUuid(assessmentId)) return { title: "Test" };
  try {
    return { title: (await loadInstructions(assessmentId)).exam.title };
  } catch (error) {
    unstable_rethrow(error);
    return { title: "Test" };
  }
}

function startLabel(kind: ExamInstructions["kind"]): string {
  switch (kind) {
    case "MOCK_EXAM":
      return "Start mock exam";
    case "TIMED_EXAM":
      return "Start exam";
    case "QUIZ":
      return "Start quiz";
    default:
      return "Start test";
  }
}

/** The rules of exam mode as they apply to this test (§13 "exam instructions"). */
function examRules(exam: ExamInstructions): string[] {
  const rules: string[] = [];
  const timed = exam.timeLimitSeconds !== null;
  if (exam.timedPaperCount > 1) {
    rules.push("Each paper has its own timer. A paper's timer starts when you start that paper, and you sit one paper at a time.");
    rules.push("When you finish a paper early, its answers are locked and you can start the next one.");
  }
  if (timed) rules.push("The timer runs on our server, so it keeps going if you leave the page or lose your connection.");
  rules.push("Your answers save automatically as you go. If your connection drops, they are kept on this device and saved when you're back online.");
  if (exam.allowNavigation) {
    rules.push("You can move between questions, flag any you want to come back to, and see unanswered and flagged questions on the review screen.");
  } else {
    rules.push("Questions come one at a time, in order. You can't go back to an earlier question.");
  }
  if (timed) rules.push("When time runs out, your saved answers are submitted automatically.");
  rules.push(
    exam.immediateFeedback
      ? "You see the mark, the correct answer and an explanation after each question."
      : "Marks, correct answers and explanations appear after you submit. Written answers may take a little longer to mark.",
  );
  rules.push("Afterwards you get your score, a grade estimate (not an official grade) and what to study next.");
  return rules;
}

/**
 * Exam instructions (§13): title, subject, papers and their time limits (with the student's extra time), total marks,
 * number of questions, the rules of exam mode, what the plan allows, earlier attempts and the start button.
 */
export default async function ExamInstructionsPage({ params, searchParams }: { params: Params; searchParams: Promise<SearchParams> }) {
  const { assessmentId } = await params;
  if (!isUuid(assessmentId)) notFound();
  const origin = parseStartOrigin(await searchParams);
  const { actor, exam } = await loadInstructions(assessmentId);
  const idempotencyKey = randomUUID();
  const timedPapers = exam.papers.filter((p) => p.timeLimitSeconds !== null);
  const showPapers = exam.papers.length > 1 || timedPapers.length > 0 || exam.papers.some((p) => p.instructionsHtml || p.answerCount !== null);
  const attemptsLeft = exam.maxAttempts === null ? null : Math.max(0, exam.maxAttempts - exam.attemptsUsed);

  return (
    <Container size="reading" className="space-y-6 pb-12">
      <PageHeader
        eyebrow={`${exam.kindLabel} · ${exam.subject.name}`}
        title={exam.title}
        description={exam.description}
        breadcrumbs={[{ label: "Tests and exams", href: "/app/exams" }, { label: exam.title }]}
        className="pb-0"
      />

      <Card as="section" aria-labelledby="facts-heading">
        <CardHeader titleAs="h2" title={<span id="facts-heading">At a glance</span>} />
        <CardBody>
          <dl className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-4">
            <div>
              <dt className="text-sm text-muted">Time allowed</dt>
              <dd className="text-base font-semibold text-text">{durationText(exam.adjustedTimeLimitSeconds, exam.timedPaperCount)}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted">Questions</dt>
              <dd className="text-base font-semibold text-text tabular-nums">{exam.questionCount}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted">Total marks</dt>
              <dd className="text-base font-semibold text-text tabular-nums">{exam.totalMarks}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted">Attempts</dt>
              <dd className="text-base font-semibold text-text">
                {attemptsLeft === null ? (exam.attemptsUsed > 0 ? `${exam.attemptsUsed} so far` : "Unlimited") : `${attemptsLeft} of ${exam.maxAttempts} left`}
              </dd>
            </div>
          </dl>
          {exam.extraTimePercent !== null && exam.timeLimitSeconds !== null && (
            <p className="mt-4 text-sm text-text">
              Your extra time ({exam.extraTimePercent}%) is included. The standard time is {durationText(exam.timeLimitSeconds, exam.timedPaperCount)}.
            </p>
          )}
          {exam.topics.length > 0 && <p className="mt-4 text-sm text-text">Covers: {exam.topics.join(", ")}</p>}
        </CardBody>
      </Card>

      {showPapers && (
        <Card as="section" aria-labelledby="papers-heading">
          <CardHeader titleAs="h2" title={<span id="papers-heading">{exam.papers.length > 1 ? "Papers" : "Paper"}</span>} />
          <CardBody>
            <ol className="space-y-5">
              {exam.papers.map((paper, index) => (
                <li key={`${paper.title}-${index}`} className="space-y-1.5">
                  <h3 className="font-semibold text-text">{paper.title}</h3>
                  <p className="text-sm text-muted">
                    {[
                      formatCount(paper.questionCount, "question"),
                      paper.marks !== null ? formatCount(paper.marks, "mark") : null,
                      paper.adjustedTimeLimitSeconds !== null ? formatTimeLimit(paper.adjustedTimeLimitSeconds) : null,
                      paper.answerCount !== null ? `Answer any ${paper.answerCount}` : null,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                  {paper.instructionsHtml && <RichContent html={paper.instructionsHtml} className="text-sm" />}
                </li>
              ))}
            </ol>
          </CardBody>
        </Card>
      )}

      {exam.instructionsHtml && (
        <Card as="section" aria-labelledby="instructions-heading">
          <CardHeader titleAs="h2" title={<span id="instructions-heading">Instructions</span>} />
          <CardBody>
            <RichContent html={exam.instructionsHtml} />
          </CardBody>
        </Card>
      )}

      <Card as="section" aria-labelledby="rules-heading">
        <CardHeader titleAs="h2" title={<span id="rules-heading">How exam mode works</span>} />
        <CardBody>
          <ul className="space-y-2.5">
            {examRules(exam).map((rule) => (
              <li key={rule} className="flex gap-2.5 text-sm text-text">
                <CircleCheckBig aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>

      <section aria-label="Start" className="space-y-3">
        <ExamAccessNotice access={exam.access} />
        {exam.access.status === "AVAILABLE" && (
          <>
            {exam.access.allowance && (
              <p className="text-sm text-muted">
                {exam.access.allowance.remaining} of {exam.access.allowance.limit} {exam.access.allowance.label}. Starting uses one.
              </p>
            )}
            <StartExamForm
              assessmentId={exam.id}
              idempotencyKey={idempotencyKey}
              origin={origin}
              label={startLabel(exam.kind)}
              upgradeHref={UPGRADE_PATH}
              action={startExamAction}
            />
          </>
        )}
      </section>

      {exam.previousAttempts.length > 0 && (
        <section aria-labelledby="previous-heading" className="space-y-3">
          <h2 id="previous-heading" className="text-lg font-semibold text-text">
            Your earlier attempts
          </h2>
          <AttemptHistoryList items={exam.previousAttempts} timeZone={actor.timeZone} showSubject={false} />
        </section>
      )}
    </Container>
  );
}
