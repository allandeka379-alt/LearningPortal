import type { ReactNode } from "react";
import { AiDraftBadge, ContentStatusBadge } from "@/components/admin/StatusBadge";
import { RichContent } from "@/components/content/RichContent";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";
import type { ReviewQuestionView, TopicReviewItem } from "@/server/cms/review/topics";

/**
 * Read-only renderings for /admin/review/topics/[topicId] (server components): everything a reviewer must check,
 * answers included — options with the correct ones marked and their rationales, matching pairs, blank answers, the
 * answer students will be shown, mark-scheme points, the stored marking specification, explanations, worked
 * solutions and hints; lessons in full; flashcard sides; test blueprints in words.
 */

function Labelled({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("space-y-1", className)}>
      <p className="text-xs font-semibold tracking-wide text-muted uppercase">{label}</p>
      {children}
    </div>
  );
}

function humanize(value: string): string {
  return value.toLowerCase().replace(/_/g, " ");
}

export function QuestionReview({ view }: { view: ReviewQuestionView }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
        {view.label && <span className="font-semibold text-text">{view.label}</span>}
        <span>{humanize(view.type)}</span>
        <span>·</span>
        <span>
          {view.marks} mark{view.marks === 1 ? "" : "s"}
        </span>
        <span>·</span>
        <span>{view.markingMode === "AUTO" ? "marked automatically" : view.markingMode === "MANUAL" ? "marked against the mark scheme" : humanize(view.markingMode)}</span>
      </div>
      <RichContent html={view.stemHtml} />
      {view.options.length > 0 && (
        <ol className="space-y-2" aria-label="Options">
          {view.options.map((option) => (
            <li
              key={option.key}
              className={cn("rounded-control border px-3 py-2", option.isCorrect ? "border-success bg-success-soft" : "border-border")}
            >
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="font-semibold">{option.key}.</span>
                <RichContent html={option.html} inline />
                {option.isCorrect && (
                  <Badge tone="success" size="sm">
                    Correct
                  </Badge>
                )}
              </div>
              {option.rationaleHtml && <RichContent html={option.rationaleHtml} className="mt-1 text-sm text-muted" />}
            </li>
          ))}
        </ol>
      )}
      {view.pairs.length > 0 && (
        <Labelled label="Correct pairs">
          <ul className="space-y-1">
            {view.pairs.map((pair, index) => (
              <li key={index} className="flex flex-wrap items-baseline gap-2">
                <RichContent html={pair.leftHtml} inline />
                <span aria-hidden="true">→</span>
                <span className="sr-only">matches</span>
                <RichContent html={pair.rightHtml} inline />
              </li>
            ))}
          </ul>
        </Labelled>
      )}
      {view.blanks && (
        <Labelled label="Gaps and accepted answers">
          <RichContent html={view.blanks.templateHtml} />
          <ul className="list-disc pl-5 text-sm">
            {view.blanks.answers.map((answer) => (
              <li key={answer.number}>
                Gap {answer.number}: {answer.accepted.join(" | ")}
              </li>
            ))}
          </ul>
        </Labelled>
      )}
      {view.correctAnswerHtml && (
        <Labelled label="Answer shown to students">
          <RichContent html={view.correctAnswerHtml} inline />
        </Labelled>
      )}
      {view.markScheme.length > 0 && (
        <Labelled label="Mark scheme">
          <ul className="list-disc space-y-1 pl-5 text-sm">
            {view.markScheme.map((point) => (
              <li key={point.id}>
                <RichContent html={point.descriptionHtml} inline /> <span className="text-muted">[{point.marks}]</span>
              </li>
            ))}
          </ul>
        </Labelled>
      )}
      {view.modelAnswerHtml && (
        <Labelled label="Model answer">
          <RichContent html={view.modelAnswerHtml} />
        </Labelled>
      )}
      {view.parts.length > 0 && (
        <div className="space-y-4 border-l-2 border-border pl-4">
          {view.parts.map((part, index) => (
            <QuestionReview key={`${part.label ?? ""}-${index}`} view={part} />
          ))}
        </div>
      )}
      {view.explanationHtml && (
        <Labelled label="Explanation">
          <RichContent html={view.explanationHtml} />
        </Labelled>
      )}
      {view.workedSolutionHtml && (
        <Labelled label="Worked solution">
          <RichContent html={view.workedSolutionHtml} />
        </Labelled>
      )}
      {view.hintsHtml.length > 0 && (
        <Labelled label="Hints">
          <ol className="list-decimal space-y-1 pl-5">
            {view.hintsHtml.map((hint, index) => (
              <li key={index}>
                <RichContent html={hint} />
              </li>
            ))}
          </ol>
        </Labelled>
      )}
      {view.specJson && (
        <details className="rounded-control border border-border px-3 py-2 text-sm">
          <summary className="cursor-pointer font-semibold">Marking specification (stored answer key)</summary>
          <pre className="mt-2 overflow-x-auto font-mono text-xs whitespace-pre-wrap">{view.specJson}</pre>
        </details>
      )}
    </div>
  );
}

/** Badges describing an item's state (status, AI, own work, edit of published content). */
export function ItemBadges({ item }: { item: TopicReviewItem }) {
  return (
    <span className="flex flex-wrap items-center gap-1">
      <ContentStatusBadge status={item.status} />
      {item.aiGenerated && <AiDraftBadge />}
      {item.draftOfId && (
        <Badge size="sm" tone="info" appearance="outline">
          Edit of published (rev. {item.revision})
        </Badge>
      )}
      {item.isOwnWork && (
        <Badge size="sm" tone="warning" appearance="outline">
          Your work
        </Badge>
      )}
    </span>
  );
}

/** The type-specific body of an item. */
export function ItemBody({ item }: { item: TopicReviewItem }) {
  switch (item.entityType) {
    case "QUESTION":
      return (
        <div className="space-y-3">
          <p className="text-sm text-muted">
            Difficulty {item.difficulty}/5
            {item.estimatedSeconds ? ` · about ${Math.max(1, Math.round(item.estimatedSeconds / 60))} min` : ""}
            {item.skill ? ` · ${humanize(item.skill)}` : ""}
            {item.isExamStyle ? " · exam style" : ""}
            {item.isDailyEligible ? " · can be a daily question" : ""}
            {` · ${humanize(item.accessTier)}`}
          </p>
          <QuestionReview view={item.question} />
        </div>
      );
    case "FLASHCARD":
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          <Labelled label={`Front (${humanize(item.cardType)})`}>
            <RichContent html={item.frontHtml} />
          </Labelled>
          <Labelled label="Back">
            <RichContent html={item.backHtml} />
          </Labelled>
          {item.notesHtml && (
            <Labelled label="Notes" className="sm:col-span-2">
              <RichContent html={item.notesHtml} />
            </Labelled>
          )}
        </div>
      );
    case "LESSON":
      return (
        <div className="space-y-3">
          <p className="text-sm text-muted">
            About {item.estimatedMinutes} minutes · {item.accessTier === "PREMIUM" ? "full access" : "free preview"}
          </p>
          {item.summaryHtml && (
            <p className="text-base">
              <RichContent html={item.summaryHtml} inline />
            </p>
          )}
          <RichContent html={item.bodyHtml} />
        </div>
      );
    case "ASSESSMENT":
      return (
        <div className="space-y-3">
          <p className="text-sm text-muted">
            {humanize(item.kind)} · {humanize(item.assembly)} · {item.totalMarks} marks
            {item.timeLimitMinutes ? ` · ${item.timeLimitMinutes} minutes` : " · untimed"} · {humanize(item.accessTier)}
          </p>
          {item.descriptionHtml && <RichContent html={item.descriptionHtml} />}
          {item.instructionsHtml && (
            <Labelled label="Instructions">
              <RichContent html={item.instructionsHtml} />
            </Labelled>
          )}
          {item.sections.map((section, index) => (
            <Labelled key={index} label={section.title}>
              <ul className="list-disc space-y-1 pl-5 text-sm">
                {section.lines.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </Labelled>
          ))}
        </div>
      );
  }
}
