import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { RichContent } from "@/components/content/RichContent";
import { MarksLabel } from "@/components/questions/MarksLabel";
import { QuestionImage } from "@/components/questions/QuestionImage";
import type { PresentedQuestion, PresentedReveal } from "@/components/questions/types";
import { Badge } from "@/components/ui/Badge";
import type { SampleQuestion } from "@/server/seo/samples";

export interface SampleQuestionCardProps {
  sample: SampleQuestion;
  /** Visible heading, e.g. "Sample question" or "Sample question 2". */
  heading: string;
  headingLevel?: "h3" | "h4";
  /** Call to action under the answer (e.g. a link to practise this topic). */
  footer?: ReactNode;
}

const letterFor = (index: number): string => (index < 26 ? String.fromCharCode(65 + index) : String(index + 1));

/**
 * A free (PUBLIC-tier) sample question on a public page (§44): the question read-only, then its answer and explanation
 * behind a native `<details>` disclosure, so it works with no client JavaScript. Only PUBLIC questions ever reach this
 * component (`src/server/seo/samples.ts`). Server component.
 */
export function SampleQuestionCard({ sample, heading, headingLevel = "h3", footer }: SampleQuestionCardProps) {
  const { question, reveal } = sample;
  const Heading = headingLevel;
  const headingId = `sample-${question.id}`;
  return (
    <article aria-labelledby={headingId} className="rounded-card border border-border bg-surface p-4 shadow-xs sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <Heading id={headingId} className="text-base font-semibold text-text">
          {heading}
        </Heading>
        <div className="flex items-center gap-2">
          {sample.isExamStyle && (
            <Badge tone="primary" size="sm">
              Exam style
            </Badge>
          )}
          <MarksLabel marks={question.marks} />
        </div>
      </div>

      <div className="mt-3">
        <QuestionBody question={question} />
      </div>

      <details className="group mt-5 rounded-control border border-border bg-bg">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 rounded-control px-4 py-2 font-semibold text-primary hover:bg-subtle [&::-webkit-details-marker]:hidden">
          <span>
            Show answer and explanation
            <span className="sr-only"> ({heading})</span>
          </span>
          <ChevronDown aria-hidden="true" className="size-4 shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none" />
        </summary>
        <div className="space-y-4 border-t border-border px-4 py-4">
          <RevealBody reveal={reveal} question={question} />
        </div>
      </details>

      {footer && <div className="mt-4">{footer}</div>}
    </article>
  );
}

function QuestionBody({ question }: { question: PresentedQuestion }) {
  return (
    <div className="space-y-4">
      <RichContent html={question.stemHtml} />
      <Interaction question={question} />
      {question.parts.length > 0 && (
        <ol role="list" className="space-y-5">
          {question.parts.map((part) => (
            <li key={part.id} className="border-l-2 border-border pl-4">
              <div className="mb-2 flex items-baseline justify-between gap-3">
                <span className="font-semibold text-text">{part.partLabel ?? "Part"}</span>
                <MarksLabel marks={part.marks} />
              </div>
              <QuestionBody question={part} />
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

function Interaction({ question }: { question: PresentedQuestion }) {
  const interaction = question.interaction;
  switch (interaction.type) {
    case "MULTIPLE_CHOICE":
      return (
        <div>
          <p className="mb-2 text-sm font-medium text-muted">{interaction.selectMode === "multiple" ? "Select all that apply" : "Choose one answer"}</p>
          <ol role="list" className="space-y-2">
            {interaction.options.map((option, index) => (
              <li key={option.key} className="flex items-start gap-3 rounded-card border border-border bg-surface p-3">
                <span
                  aria-hidden="true"
                  className="flex size-7 shrink-0 items-center justify-center rounded-full border border-border-strong text-sm font-semibold text-text"
                >
                  {letterFor(index)}
                </span>
                <span className="sr-only">Option {letterFor(index)}: </span>
                <div className="min-w-0 flex-1 space-y-2 pt-0.5">
                  <RichContent inline html={option.html} />
                  {option.image && <QuestionImage image={option.image} sizes="(min-width: 768px) 20rem, 80vw" />}
                </div>
              </li>
            ))}
          </ol>
        </div>
      );
    case "TRUE_FALSE": {
      const labels = interaction.statementStyle === "yes_no" ? ["Yes", "No"] : ["True", "False"];
      return (
        <ul role="list" className="flex flex-wrap gap-2" aria-label="Answer options">
          {labels.map((label) => (
            <li key={label} className="inline-flex min-h-11 min-w-24 items-center justify-center rounded-control border border-border bg-surface px-4 text-sm font-semibold">
              {label}
            </li>
          ))}
        </ul>
      );
    }
    case "SHORT_ANSWER":
      return <AnswerLine>Write a short answer.</AnswerLine>;
    case "NUMERICAL":
    case "CALCULATION":
      return (
        <AnswerLine>
          {interaction.expectsWorking ? "Show your working and give your final answer" : "Give your answer"}
          {interaction.unitHint ? ` in ${interaction.unitHint}` : ""}.
        </AnswerLine>
      );
    case "ESSAY":
    case "EXTENDED_RESPONSE":
      return (
        <AnswerLine>
          Write a structured answer
          {interaction.wordLimit?.max ? ` of up to ${interaction.wordLimit.max} words` : ""}.
        </AnswerLine>
      );
    case "STRUCTURED":
      return null;
    default:
      return <AnswerLine>Answer this question in the app to see it in full.</AnswerLine>;
  }
}

function AnswerLine({ children }: { children: ReactNode }) {
  return <p className="rounded-control border border-dashed border-border-strong px-3 py-2.5 text-sm text-muted">{children}</p>;
}

function RevealBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-1 text-sm font-semibold text-text">{title}</p>
      {children}
    </div>
  );
}

function RevealBody({ reveal, question }: { reveal: PresentedReveal; question: PresentedQuestion }) {
  const blocks: ReactNode[] = [];
  const interaction = question.interaction;

  if (interaction.type === "MULTIPLE_CHOICE") {
    const correct = new Set(reveal.options.filter((option) => option.isCorrect).map((option) => option.key));
    const shown = interaction.options.map((option, index) => ({ option, letter: letterFor(index) })).filter(({ option }) => correct.has(option.key));
    if (shown.length > 0) {
      blocks.push(
        <RevealBlock key="answer" title={shown.length > 1 ? "Correct answers" : "Correct answer"}>
          <ul role="list" className="space-y-1">
            {shown.map(({ option, letter }) => (
              <li key={option.key} className="flex items-start gap-2">
                <span className="font-semibold text-text">{letter}.</span>
                <RichContent inline html={option.html} />
              </li>
            ))}
          </ul>
        </RevealBlock>,
      );
    }
  } else if (reveal.correctAnswerHtml) {
    blocks.push(
      <RevealBlock key="answer" title="Answer">
        <RichContent inline html={reveal.correctAnswerHtml} />
      </RevealBlock>,
    );
  }
  if (reveal.explanationHtml) {
    blocks.push(
      <RevealBlock key="why" title="Why">
        <RichContent html={reveal.explanationHtml} />
      </RevealBlock>,
    );
  }
  if (reveal.workedSolutionHtml) {
    blocks.push(
      <RevealBlock key="worked" title="Worked solution">
        <RichContent html={reveal.workedSolutionHtml} />
      </RevealBlock>,
    );
  }
  const points = [...(reveal.markScheme?.points ?? []), ...reveal.methodMarks];
  if (points.length > 0) {
    blocks.push(
      <RevealBlock key="scheme" title="Mark scheme">
        <ul role="list" className="space-y-1 text-sm">
          {points.map((point) => (
            <li key={point.id} className="flex items-start justify-between gap-3">
              <RichContent inline html={point.descriptionHtml} />
              <MarksLabel marks={point.marks} />
            </li>
          ))}
        </ul>
      </RevealBlock>,
    );
  }
  if (reveal.modelAnswerHtml) {
    blocks.push(
      <RevealBlock key="model" title="Model answer">
        <RichContent html={reveal.modelAnswerHtml} />
      </RevealBlock>,
    );
  }
  if (reveal.conceptHtml) {
    blocks.push(
      <RevealBlock key="concept" title="Key idea">
        <RichContent html={reveal.conceptHtml} />
      </RevealBlock>,
    );
  }
  const partsById = new Map(question.parts.map((part) => [part.id, part]));
  for (const part of reveal.parts) {
    const presented = partsById.get(part.questionId);
    if (!presented) continue;
    blocks.push(
      <div key={`part-${part.questionId}`} className="border-l-2 border-border pl-4">
        <p className="mb-2 font-semibold text-text">{part.partLabel ?? presented.partLabel ?? "Part"}</p>
        <div className="space-y-3">
          <RevealBody reveal={part} question={presented} />
        </div>
      </div>,
    );
  }
  if (blocks.length === 0) return <p className="text-sm text-muted">The full worked answer is available in the app.</p>;
  return <>{blocks}</>;
}
