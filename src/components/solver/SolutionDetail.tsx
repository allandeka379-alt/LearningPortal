import { BookOpenCheck, MessageCircleQuestion, Plus } from "lucide-react";
import { RichContent } from "@/components/content/RichContent";
import { QuestionImage } from "@/components/questions/QuestionImage";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { SolutionView } from "@/server/solver/types";
import { AI_PRACTICE_LABEL, initialRevealed, modeLabel, SOLVER_DISCLAIMER } from "./labels";
import { SolutionRating, type RateSolutionAction } from "./SolutionRating";
import { SolutionSteps } from "./SolutionSteps";

export interface SolutionDetailProps {
  view: SolutionView;
  /** `?step=` of the page (TEACH: where the student had got to). */
  stepParam?: string | string[] | undefined;
  rateAction: RateSolutionAction;
  /** Where "Ask another question" goes. */
  newHref?: string;
}

/**
 * One solved question (§15): what the student asked (text and / or photo, with the solver's reading of a photo), the
 * concept, the steps (progressive in "Teach me"), the final answer, common mistakes and similar questions: PUBLISHED
 * bank questions on the matched topic (with a practice link) and AI-generated practice, always labelled as such.
 * Calm states for an unreadable photo, a declined question or a failed solve. Server component; all HTML is rendered
 * by the server's content pipeline.
 */
export function SolutionDetail({ view, stepParam, rateAction, newHref = "/app/solver" }: SolutionDetailProps) {
  const complete = view.outcome === "COMPLETE";
  const basePath = `/app/solver/${view.id}`;

  return (
    <div className="space-y-8">
      <QuestionSection view={view} />

      {view.outcome === "UNREADABLE" && (
        <Alert
          tone="warning"
          title="We couldn't read this question clearly"
          action={
            <ButtonLink href={newHref} variant="outline">
              Try again
            </ButtonLink>
          }
        >
          {view.unreadableReason ?? "Some of the question is missing or unclear."} Try a sharper photo with the whole question in it,
          or type the question instead.
        </Alert>
      )}
      {view.outcome === "REFUSED" && (
        <Alert
          tone="neutral"
          title="The solver can't help with this one"
          action={
            <ButtonLink href={newHref} variant="outline">
              Ask another question
            </ButtonLink>
          }
        >
          Ask about a question from your schoolwork or exam practice, and the solver will take you through it step by step.
        </Alert>
      )}
      {(view.outcome === "ERROR" || view.outcome === "TRUNCATED") && (
        <Alert
          tone="danger"
          title="Something went wrong while solving this question"
          action={
            <ButtonLink href={newHref} variant="outline">
              Try again
            </ButtonLink>
          }
        >
          Please try again in a moment. If the question is very long, try splitting it into parts.
        </Alert>
      )}

      {complete && view.conceptHtml && (
        <section aria-labelledby="solution-concept-title" className="space-y-2">
          <h2 id="solution-concept-title" className="text-lg font-semibold text-text">
            The idea behind it
          </h2>
          <RichContent html={view.conceptHtml} />
        </section>
      )}

      {complete && (
        <SolutionSteps
          mode={view.mode}
          steps={view.steps}
          finalAnswerHtml={view.finalAnswerHtml}
          initialRevealed={initialRevealed(stepParam, view.steps.length)}
          basePath={basePath}
        />
      )}

      {complete && view.commonMistakesHtml.length > 0 && (
        <section aria-labelledby="solution-mistakes-title" className="space-y-2">
          <h2 id="solution-mistakes-title" className="text-lg font-semibold text-text">
            Common mistakes to avoid
          </h2>
          <ul className="list-disc space-y-1 pl-5">
            {view.commonMistakesHtml.map((html, index) => (
              <li key={`mistake-${index}`}>
                <RichContent html={html} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {complete && <SimilarQuestions view={view} />}

      <Card variant="sunken" className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-text">Still stuck? The tutor can explain this topic in a different way.</p>
        <div className="flex flex-wrap gap-2">
          <ButtonLink href={view.tutorHref} variant="secondary" iconStart={<MessageCircleQuestion aria-hidden="true" />}>
            Ask the tutor
          </ButtonLink>
          <ButtonLink href={newHref} variant="outline" iconStart={<Plus aria-hidden="true" />}>
            Ask another question
          </ButtonLink>
        </div>
      </Card>

      {complete && view.messageId && <SolutionRating messageId={view.messageId} initialRating={view.rating} rateAction={rateAction} />}
      <p className="text-xs text-muted">{SOLVER_DISCLAIMER} Your questions are private to you.</p>
    </div>
  );
}

function QuestionSection({ view }: { view: SolutionView }) {
  const { question } = view;
  return (
    <section aria-labelledby="solution-question-title" className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <h2 id="solution-question-title" className="text-lg font-semibold text-text">
          Your question
        </h2>
        <Badge size="sm" tone={view.mode === "ANSWER" ? "neutral" : "primary"}>
          {modeLabel(view.mode)}
        </Badge>
        {view.topic && (
          <Badge size="sm" tone="neutral">
            Topic: {view.topic.name}
          </Badge>
        )}
      </div>
      <Card className="space-y-3 p-4">
        {question.text && <p className="break-words whitespace-pre-wrap text-text">{question.text}</p>}
        {question.imageUrl && (
          <QuestionImage
            image={{ src: question.imageUrl, alt: "Your photo of the question", width: question.imageWidth, height: question.imageHeight }}
            className="max-h-[28rem] rounded-control object-contain"
            eager
          />
        )}
        {question.readHtml && (
          <div className="rounded-control bg-subtle p-3 text-sm">
            <p className="font-semibold text-text">How the solver read your photo</p>
            <RichContent html={question.readHtml} className="mt-1" />
            <p className="mt-2 text-muted">If this doesn&apos;t match your question, try a clearer photo or type it in.</p>
          </div>
        )}
      </Card>
    </section>
  );
}

function SimilarQuestions({ view }: { view: SolutionView }) {
  const { bank, generatedHtml } = view.similar;
  if (bank.length === 0 && generatedHtml.length === 0 && !view.practiceHref) return null;
  return (
    <section aria-labelledby="solution-similar-title" className="space-y-4">
      <h2 id="solution-similar-title" className="text-lg font-semibold text-text">
        Practise similar questions
      </h2>

      {bank.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-text">From the question bank</h3>
          <ol className="space-y-3">
            {bank.map((question) => (
              <Card as="li" key={question.id} className="p-4">
                <RichContent html={question.stemHtml} />
                <p className="mt-2 text-sm text-muted">
                  {question.marks} {question.marks === 1 ? "mark" : "marks"}
                </p>
              </Card>
            ))}
          </ol>
        </div>
      )}
      {view.practiceHref && (
        <ButtonLink href={view.practiceHref} iconStart={<BookOpenCheck aria-hidden="true" />}>
          {view.topic ? `Practise ${view.topic.name}` : "Practise this subject"}
        </ButtonLink>
      )}

      {generatedHtml.length > 0 && (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold text-text">Try these yourself</h3>
            <Badge size="sm" tone="accent">
              {AI_PRACTICE_LABEL}
            </Badge>
          </div>
          <ol className="list-decimal space-y-2 pl-5">
            {generatedHtml.map((html, index) => (
              <li key={`generated-${index}`}>
                <RichContent html={html} />
              </li>
            ))}
          </ol>
          <p className="text-sm text-muted">No answers are shown. Work them out, then ask the tutor to check your working.</p>
        </div>
      )}
    </section>
  );
}
