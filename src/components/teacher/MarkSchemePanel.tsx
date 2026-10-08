import { RichContent } from "@/components/content/RichContent";
import type { PresentedReveal } from "@/components/questions/types";

/**
 * The marker's view of a question's answer (teachers only): correct answer, mark-scheme points and levels, method
 * marks, model answer and worked solution — recursively for structured parts. Server-compatible.
 */
export function MarkSchemePanel({ reveal, headingLevel = 4 }: { reveal: PresentedReveal; headingLevel?: 3 | 4 }) {
  const Heading = headingLevel === 3 ? "h3" : "h4";
  const hasAnything =
    reveal.correctAnswerHtml || reveal.markScheme || reveal.modelAnswerHtml || reveal.methodMarks.length > 0 || reveal.workedSolutionHtml || reveal.parts.length > 0;
  if (!hasAnything) return <p className="text-sm text-muted">No mark scheme was written for this question.</p>;
  return (
    <div className="space-y-3 text-sm">
      {reveal.partLabel && <Heading className="font-semibold text-text">Part {reveal.partLabel}</Heading>}
      {reveal.correctAnswerHtml && (
        <p>
          <span className="font-semibold text-text">Correct answer: </span>
          <RichContent html={reveal.correctAnswerHtml} inline />
        </p>
      )}
      {reveal.markScheme && reveal.markScheme.points.length > 0 && (
        <div>
          <Heading className="font-semibold text-text">Mark scheme</Heading>
          <ul className="mt-1 list-disc space-y-1 pl-5">
            {reveal.markScheme.points.map((point) => (
              <li key={point.id}>
                <span className="font-mono text-xs text-muted">{point.id}</span> <RichContent html={point.descriptionHtml} inline />{" "}
                <span className="whitespace-nowrap text-muted">({point.marks} {point.marks === 1 ? "mark" : "marks"})</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {reveal.markScheme && reveal.markScheme.levels.length > 0 && (
        <div>
          <Heading className="font-semibold text-text">Levels</Heading>
          <ul className="mt-1 space-y-1">
            {reveal.markScheme.levels.map((level) => (
              <li key={level.level}>
                <span className="font-semibold">
                  Level {level.level} ({level.minMarks}–{level.maxMarks}):
                </span>{" "}
                <RichContent html={level.descriptorHtml} inline />
              </li>
            ))}
          </ul>
        </div>
      )}
      {reveal.methodMarks.length > 0 && (
        <div>
          <Heading className="font-semibold text-text">Method marks</Heading>
          <ul className="mt-1 list-disc space-y-1 pl-5">
            {reveal.methodMarks.map((point) => (
              <li key={point.id}>
                <span className="font-mono text-xs text-muted">{point.id}</span> <RichContent html={point.descriptionHtml} inline /> ({point.marks})
              </li>
            ))}
          </ul>
        </div>
      )}
      {reveal.modelAnswerHtml && (
        <div>
          <Heading className="font-semibold text-text">Model answer</Heading>
          <RichContent html={reveal.modelAnswerHtml} />
        </div>
      )}
      {reveal.workedSolutionHtml && (
        <details>
          <summary className="cursor-pointer font-semibold text-text">Worked solution</summary>
          <RichContent html={reveal.workedSolutionHtml} className="mt-2" />
        </details>
      )}
      {reveal.parts.map((part) => (
        <div key={part.questionId} className="border-l-2 border-border pl-3">
          <MarkSchemePanel reveal={part} headingLevel={headingLevel} />
        </div>
      ))}
    </div>
  );
}
