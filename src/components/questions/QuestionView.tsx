"use client";

import { useId, type ReactNode } from "react";
import { RichContent } from "@/components/content/RichContent";
import { cn } from "@/lib/cn";
import { DiagramLabellingInput } from "./inputs/DiagramLabellingInput";
import { FillInTheBlankInput } from "./inputs/FillInTheBlankInput";
import { MatchingInput } from "./inputs/MatchingInput";
import { MultipleChoiceInput } from "./inputs/MultipleChoiceInput";
import { NumericInput } from "./inputs/NumericInput";
import { OpenResponseInput } from "./inputs/OpenResponseInput";
import { ShortAnswerInput } from "./inputs/ShortAnswerInput";
import { TrueFalseInput } from "./inputs/TrueFalseInput";
import { MarksLabel } from "./MarksLabel";
import { leafPartIds, partResponseOf, responseOfType, setPartResponse } from "./response-model";
import type { PartResponse, PresentedFeedback, PresentedQuestion, PresentedReveal, QuestionMode, QuestionResponse } from "./types";

export interface QuestionViewProps {
  /** Server-presented question (`presentQuestion` in src/server/practice); never contains answers. */
  question: PresentedQuestion;
  mode: QuestionMode;
  /** The current answer (`null` = not answered). Serialises exactly to `@/lib/questions` response schemas. */
  response: QuestionResponse | null;
  /** Called on every edit. Omit (or set `disabled`) for a read-only view. */
  onChange?: (response: QuestionResponse | null) => void;
  /** After marking (practice, review): annotates the inputs (MCQ correct options, part marks). Ignored in exam mode. */
  feedback?: PresentedFeedback | null;
  disabled?: boolean;
  /** Visible heading, e.g. "Question 3". Default "Question". */
  heading?: ReactNode;
  /** Level of the heading in the page outline; parts use the next level down. */
  headingLevel?: 2 | 3;
  /** Next to the heading (exam mode: flag button, answered state). */
  headerAside?: ReactNode;
  /**
   * Id of an error message about the answer (e.g. "Enter a number"), rendered by the owner. It is added to every answer
   * control's `aria-describedby`, so the message is read again when the student returns to the answer (§43).
   */
  errorId?: string;
  className?: string;
}

/**
 * Renders any §9 question type with its answer controls:
 *
 * ```tsx
 * <QuestionView question={presented} mode="practice" response={response} onChange={setResponse} />
 * <QuestionView question={presented} mode="exam" response={saved} onChange={autosave} heading="Question 4" />
 * <QuestionView question={presented} mode="review" response={given} feedback={feedback} />
 * ```
 *
 * Controlled: the owner keeps the response and decides when to mark or save it. STRUCTURED questions render each
 * part — "(a)", "(b)(i)" — with its own marks and input, and combine the parts into one STRUCTURED response.
 */
export function QuestionView({
  question,
  mode,
  response,
  onChange,
  feedback,
  disabled = false,
  heading = "Question",
  headingLevel = 2,
  headerAside,
  errorId,
  className,
}: QuestionViewProps) {
  const reactId = useId();
  const prefix = `q${reactId.replace(/[^A-Za-z0-9]/g, "")}`;
  const readOnly = disabled || mode === "review" || onChange === undefined;
  const reveal = mode === "exam" ? null : (feedback?.reveal ?? null);
  const Heading = `h${headingLevel}` as "h2" | "h3";
  const headingId = `${prefix}-heading`;
  const stemId = `${prefix}-stem`;
  const awarded = mode === "exam" || !feedback || feedback.outcome === "pending" ? null : feedback.marksAwarded;

  return (
    <section aria-labelledby={headingId} className={cn("min-w-0 space-y-4", className)}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <Heading id={headingId} className="text-lg font-semibold text-text">
          {heading}
        </Heading>
        <div className="flex items-center gap-3">
          <MarksLabel marks={question.marks} awarded={awarded} />
          {headerAside}
        </div>
      </div>
      <RichContent id={stemId} html={question.stemHtml} className="text-base text-text" />
      <AnswerArea
        key={question.id}
        question={question}
        response={response}
        onChange={(next) => onChange?.(next)}
        disabled={readOnly}
        prefix={prefix}
        describedBy={describedByIds(stemId, errorId)}
        errorId={errorId}
        reveal={reveal}
        partLevel={headingLevel + 1}
      />
    </section>
  );
}

/** Space-separated `aria-describedby` value of the ids that are set. */
function describedByIds(...ids: (string | undefined)[]): string {
  return ids.filter(Boolean).join(" ");
}

interface AnswerAreaProps {
  question: PresentedQuestion;
  response: QuestionResponse | null;
  onChange: (response: QuestionResponse | null) => void;
  disabled: boolean;
  prefix: string;
  describedBy: string;
  /** The owner's answer error (structured parts pass it on to each part's controls). */
  errorId: string | undefined;
  reveal: PresentedReveal | null;
  partLevel: number;
}

function AnswerArea({ question, response, onChange, disabled, prefix, describedBy, errorId, reveal, partLevel }: AnswerAreaProps) {
  const common = { disabled, idPrefix: prefix, describedBy };
  const interaction = question.interaction;
  switch (interaction.type) {
    case "MULTIPLE_CHOICE":
      return <MultipleChoiceInput {...common} interaction={interaction} value={responseOfType(response, "MULTIPLE_CHOICE")} onChange={onChange} reveal={reveal} />;
    case "TRUE_FALSE":
      return <TrueFalseInput {...common} interaction={interaction} value={responseOfType(response, "TRUE_FALSE")} onChange={onChange} />;
    case "SHORT_ANSWER":
      return <ShortAnswerInput {...common} interaction={interaction} value={responseOfType(response, "SHORT_ANSWER")} onChange={onChange} />;
    case "NUMERICAL":
    case "CALCULATION":
      return <NumericInput {...common} interaction={interaction} value={responseOfType(response, interaction.type)} onChange={onChange} />;
    case "MATCHING":
      return <MatchingInput {...common} interaction={interaction} value={responseOfType(response, "MATCHING")} onChange={onChange} />;
    case "FILL_IN_THE_BLANK":
      return <FillInTheBlankInput {...common} interaction={interaction} value={responseOfType(response, "FILL_IN_THE_BLANK")} onChange={onChange} />;
    case "DIAGRAM_LABELLING":
      return <DiagramLabellingInput {...common} interaction={interaction} value={responseOfType(response, "DIAGRAM_LABELLING")} onChange={onChange} />;
    case "ESSAY":
    case "EXTENDED_RESPONSE":
      return <OpenResponseInput {...common} interaction={interaction} value={responseOfType(response, interaction.type)} onChange={onChange} />;
    case "STRUCTURED":
      return (
        <StructuredParts
          question={question}
          response={responseOfType(response, "STRUCTURED")}
          onChange={onChange}
          disabled={disabled}
          prefix={prefix}
          errorId={errorId}
          reveal={reveal}
          level={partLevel}
        />
      );
  }
}

interface StructuredPartsProps {
  question: PresentedQuestion;
  response: Extract<QuestionResponse, { type: "STRUCTURED" }> | null;
  onChange: (response: QuestionResponse | null) => void;
  disabled: boolean;
  prefix: string;
  errorId: string | undefined;
  reveal: PresentedReveal | null;
  level: number;
  /** Leaf part ids of the ROOT question (response entry order). */
  leafOrder?: string[];
}

function StructuredParts({ question, response, onChange, disabled, prefix, errorId, reveal, level, leafOrder }: StructuredPartsProps) {
  const order = leafOrder ?? leafPartIds(question);
  const Heading = `h${Math.min(6, level)}` as "h3" | "h4" | "h5" | "h6";
  const revealById = new Map((reveal?.parts ?? []).map((part) => [part.questionId, part]));

  return (
    <ol className="space-y-6">
      {question.parts.map((part, index) => {
        const partPrefix = `${prefix}-p${index}`;
        const headingId = `${partPrefix}-heading`;
        const stemId = `${partPrefix}-stem`;
        const partReveal = revealById.get(part.id) ?? null;
        const label = part.partLabel ?? `Part ${index + 1}`;
        return (
          <li key={part.id}>
            <section aria-labelledby={headingId} className="space-y-3 border-l-2 border-border pl-3 sm:pl-4">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <Heading id={headingId} className="text-base font-semibold text-text">
                  {label}
                </Heading>
                <MarksLabel marks={part.marks} awarded={partReveal?.partResult && !partReveal.partResult.pending ? partReveal.partResult.awarded : null} />
              </div>
              <RichContent id={stemId} html={part.stemHtml} className="text-base text-text" />
              {part.parts.length > 0 ? (
                <StructuredParts
                  question={part}
                  response={response}
                  onChange={onChange}
                  disabled={disabled}
                  prefix={partPrefix}
                  errorId={errorId}
                  reveal={partReveal}
                  level={level + 1}
                  leafOrder={order}
                />
              ) : (
                <AnswerArea
                  question={part}
                  response={partResponseOf(response, part.id)}
                  onChange={(next) =>
                    onChange(setPartResponse(response, part.id, next && next.type !== "STRUCTURED" ? (next as PartResponse) : null, order))
                  }
                  disabled={disabled}
                  prefix={partPrefix}
                  describedBy={describedByIds(stemId, errorId)}
                  errorId={errorId}
                  reveal={partReveal}
                  partLevel={level + 1}
                />
              )}
            </section>
          </li>
        );
      })}
    </ol>
  );
}
