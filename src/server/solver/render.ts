import "server-only";
import type { SanitizedHtml } from "@/lib/content/types";
import { renderContent } from "@/server/content/render";
import type { StoredSolution } from "./core";
import type { SolutionStepView } from "./types";

/**
 * Server-side rendering of a stored solution (§8 "do not render formulas as plain text": KaTeX through the strict
 * content pipeline). Every field gets its own id prefix so several blocks can sit on one page without id clashes.
 */

function prefixFor(messageId: string): string {
  return `s${messageId.replace(/[^a-z0-9]/gi, "").slice(-10)}-`;
}

export interface RenderedSolution {
  readHtml: SanitizedHtml | null;
  conceptHtml: SanitizedHtml | null;
  steps: SolutionStepView[];
  finalAnswerHtml: SanitizedHtml | null;
  commonMistakesHtml: SanitizedHtml[];
  generatedHtml: SanitizedHtml[];
}

/** Renders every Markdown / LaTeX field of a solution once (the content renderer memoises per source). */
export function renderSolution(messageId: string, solution: StoredSolution): RenderedSolution {
  const prefix = prefixFor(messageId);
  const block = (source: string, slot: string): SanitizedHtml =>
    renderContent(source, { idPrefix: `${prefix}${slot}-`, baseHeadingLevel: 4 }).html;
  const optional = (source: string | null, slot: string): SanitizedHtml | null => (source && source.trim() ? block(source, slot) : null);
  return {
    readHtml: optional(solution.questionText, "q"),
    conceptHtml: optional(solution.concept, "c"),
    steps: solution.steps.map((step, index) => ({
      title: step.title,
      explanationHtml: block(step.explanation || " ", `s${index}`),
      formulaHtml: step.formula ? block(`$$\n${step.formula}\n$$`, `f${index}`) : null,
      tryThisHtml: optional(step.tryThis, `t${index}`),
    })),
    finalAnswerHtml: optional(solution.finalAnswer, "a"),
    commonMistakesHtml: solution.commonMistakes.map((item, index) => block(item, `m${index}`)),
    generatedHtml: solution.practiceQuestions.map((item, index) => block(item, `p${index}`)),
  };
}
