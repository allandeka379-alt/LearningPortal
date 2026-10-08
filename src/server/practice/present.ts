import "server-only";
import type {
  FillSegment,
  PresentedFeedback,
  PresentedImage,
  PresentedInteraction,
  PresentedItem,
  PresentedPartResult,
  PresentedPoint,
  PresentedQuestion,
  PresentedReveal,
  QuestionResponse,
} from "@/components/questions/types";
import { feedbackOutcome } from "@/components/questions/response-model";
import type { SanitizedHtml } from "@/lib/content/types";
import { BLANK_PLACEHOLDER, safeParseResponse, type AnswerReveal, type QuestionType, type StudentQuestionView } from "@/lib/questions";
import type { AnswerFeedback, AttemptSlotView } from "@/server/attempts";
import { renderContent, renderInline, toPlainText, trustPersistedHtml, type AssetResolver } from "@/server/content/render";
import { loadAssetResolver } from "@/server/content/service";
import type { AttemptFeedbackJson } from "@/server/marking";

/**
 * Presentation of questions and marking results for the shared question renderers (`src/components/questions`).
 *
 * Input is always the answer-safe projection (`toStudentView` via the attempt engine) or a post-marking result, so
 * nothing here can leak an answer before marking. Every authored Markdown/LaTeX fragment is rendered SERVER-SIDE with
 * the content pipeline (sanitised; KaTeX), using the write-time `renderedHtml` cache when the question has one;
 * `asset:<id>` images are resolved in ONE query per call (`loadAssetResolver`). Used by practice, the daily question
 * and — through the exported functions — exam mode, lesson checks and the diagnostic.
 */

const NO_ASSETS: AssetResolver = () => null;
const MAX_OPTION_LABEL = 120;

/** Distinct, valid id prefix per question (uuid v7 tails are random; heads are timestamps shared within a ms). */
function idPrefixFor(id: string): string {
  return `q-${id.replace(/[^0-9a-z]/gi, "").slice(-12).toLowerCase()}-`;
}

function block(source: string, id: string, resolveAsset: AssetResolver): SanitizedHtml {
  return renderContent(source, { idPrefix: idPrefixFor(id), baseHeadingLevel: 3, resolveAsset }).html;
}

function inline(source: string, id: string, resolveAsset: AssetResolver): SanitizedHtml {
  return renderInline(source, { idPrefix: idPrefixFor(id), resolveAsset }).html;
}

function cachedOr(cached: string | null | undefined, render: () => SanitizedHtml): SanitizedHtml {
  return cached ? trustPersistedHtml(cached) : render();
}

/** One-line plain text for native `<option>` labels. */
function optionLabel(source: string): string {
  const text = toPlainText(source).replace(/\s+/g, " ").trim();
  return text.length > MAX_OPTION_LABEL ? `${text.slice(0, MAX_OPTION_LABEL - 1).trimEnd()}…` : text;
}

function imageFor(assetId: string | null, resolveAsset: AssetResolver, fallbackAlt: string): PresentedImage | null {
  if (!assetId) return null;
  const asset = resolveAsset(assetId);
  if (!asset) return null;
  return { src: asset.src, alt: asset.alt?.trim() || fallbackAlt, width: asset.width ?? null, height: asset.height ?? null };
}

function letterFor(index: number): string {
  return index < 26 ? String.fromCharCode(65 + index) : String(index + 1);
}

// ---------------------------------------------------------------------------------------------------------------------
// Fill-in-the-blank templates
// ---------------------------------------------------------------------------------------------------------------------

type BlankDefinition = Extract<StudentQuestionView["interaction"], { type: "FILL_IN_THE_BLANK" }>["blanks"][number];

/**
 * Splits a FILL_IN_THE_BLANK template into paragraphs (blank lines) of inline-rendered text pieces and blanks, so the
 * UI can put real form controls in place of `{{blank:id}}` without injecting markup into sanitised HTML. Whitespace
 * around blanks is kept as explicit "space" segments (inline rendering trims it). Limitation: a blank must not sit
 * inside a math expression or span emphasis (`**a {{blank:x}} b**`); authoring docs keep blanks in plain prose.
 */
export function splitFillTemplate(
  template: string,
  blanks: readonly BlankDefinition[],
  render: (source: string) => SanitizedHtml,
): { paragraphs: FillSegment[][]; blankCount: number } {
  const byId = new Map(blanks.map((blank) => [blank.id, blank]));
  let number = 0;
  const paragraphs: FillSegment[][] = [];
  for (const paragraph of template.split(/\n[ \t]*\n/)) {
    if (paragraph.trim() === "") continue;
    const segments: FillSegment[] = [];
    const pushText = (text: string) => {
      if (text === "") return;
      const trimmed = text.trim();
      if (/^\s/.test(text) && segments.length > 0) segments.push({ kind: "space" });
      if (trimmed !== "") {
        segments.push({ kind: "html", html: render(trimmed) });
        if (/\s$/.test(text)) segments.push({ kind: "space" });
      }
    };
    let last = 0;
    for (const match of paragraph.matchAll(new RegExp(BLANK_PLACEHOLDER.source, "g"))) {
      const index = match.index ?? 0;
      pushText(paragraph.slice(last, index));
      const blank = byId.get(match[1] as string);
      if (blank) {
        number += 1;
        segments.push({ kind: "blank", id: blank.id, number, input: blank.input, choices: blank.choices ? [...blank.choices] : null });
      }
      last = index + match[0].length;
    }
    pushText(paragraph.slice(last));
    if (segments.length > 0) paragraphs.push(segments);
  }
  return { paragraphs, blankCount: number };
}

// ---------------------------------------------------------------------------------------------------------------------
// Questions
// ---------------------------------------------------------------------------------------------------------------------

function presentInteraction(view: StudentQuestionView, resolveAsset: AssetResolver): PresentedInteraction {
  const interaction = view.interaction;
  const html = view.payloadHtml ?? {};
  switch (interaction.type) {
    case "MULTIPLE_CHOICE":
      return {
        type: "MULTIPLE_CHOICE",
        selectMode: interaction.selectMode,
        options: interaction.options.map((option) => ({
          key: option.key,
          html: cachedOr(option.html, () => inline(option.content, view.id, resolveAsset)),
          image: imageFor(option.mediaAssetId, resolveAsset, `Picture for option ${option.key}`),
        })),
      };
    case "MATCHING": {
      const item = (side: "left" | "right", value: { id: string; content: string }): PresentedItem => ({
        id: value.id,
        html: cachedOr(html[`${side}:${value.id}`], () => inline(value.content, view.id, resolveAsset)),
        label: optionLabel(value.content),
      });
      return {
        type: "MATCHING",
        left: interaction.left.map((value) => item("left", value)),
        right: interaction.right.map((value, index) => ({ ...item("right", value), letter: letterFor(index) })),
      };
    }
    case "FILL_IN_THE_BLANK":
      return { type: "FILL_IN_THE_BLANK", ...splitFillTemplate(interaction.template, interaction.blanks, (source) => inline(source, view.id, resolveAsset)) };
    case "DIAGRAM_LABELLING":
      return {
        type: "DIAGRAM_LABELLING",
        image: imageFor(interaction.mediaAssetId, resolveAsset, "Diagram to label"),
        labels:
          interaction.labels?.map((label) => ({
            id: label.id,
            html: cachedOr(html[`label:${label.id}`], () => inline(label.text, view.id, resolveAsset)),
            label: optionLabel(label.text),
          })) ?? null,
        hotspots: interaction.hotspots.map((hotspot, index) => ({ ...hotspot, number: index + 1 })),
      };
    default:
      return interaction;
  }
}

/** Renders a student view for the client (pure apart from the render cache). Resolve images with {@link loadQuestionAssets}. */
export function presentQuestion(view: StudentQuestionView, resolveAsset: AssetResolver = NO_ASSETS): PresentedQuestion {
  return {
    id: view.id,
    type: view.type,
    markingMode: view.markingMode,
    marks: view.marks,
    partLabel: view.partLabel,
    stemHtml: cachedOr(view.stemHtml, () => block(view.stem, view.id, resolveAsset)),
    interaction: presentInteraction(view, resolveAsset),
    hintCount: view.hintCount,
    calculatorAllowed: view.calculatorAllowed,
    estimatedSeconds: view.estimatedSeconds,
    parts: view.parts.map((part) => presentQuestion(part, resolveAsset)),
  };
}

const assetRef = (id: string) => `![](asset:${id})`;

function questionSources(view: StudentQuestionView, into: string[]): void {
  if (!view.stemHtml) into.push(view.stem);
  const interaction = view.interaction;
  if (interaction.type === "MULTIPLE_CHOICE") {
    for (const option of interaction.options) {
      if (!option.html) into.push(option.content);
      if (option.mediaAssetId) into.push(assetRef(option.mediaAssetId));
    }
  }
  if (interaction.type === "MATCHING") for (const item of [...interaction.left, ...interaction.right]) into.push(item.content);
  if (interaction.type === "FILL_IN_THE_BLANK") into.push(interaction.template);
  if (interaction.type === "DIAGRAM_LABELLING") into.push(assetRef(interaction.mediaAssetId));
  for (const part of view.parts) questionSources(part, into);
}

/** Loads every image the questions reference (stems, options, diagrams) in one query. */
export function loadQuestionAssets(views: readonly StudentQuestionView[]): Promise<AssetResolver> {
  const sources: string[] = [];
  for (const view of views) questionSources(view, sources);
  return loadAssetResolver(sources);
}

/** Presents several questions with one asset query. */
export async function presentQuestions(views: readonly StudentQuestionView[]): Promise<PresentedQuestion[]> {
  const resolveAsset = await loadQuestionAssets(views);
  return views.map((view) => presentQuestion(view, resolveAsset));
}

/** A saved response in the question's shape, or null (a malformed or mismatched stored value is ignored). */
export function normalizeResponse(type: QuestionType, raw: unknown): QuestionResponse | null {
  const parsed = safeParseResponse(type, raw);
  return parsed.success ? (parsed.data as QuestionResponse | null) : null;
}

// ---------------------------------------------------------------------------------------------------------------------
// Reveals and feedback
// ---------------------------------------------------------------------------------------------------------------------

/** Per-part marks from the stored marking detail (`QuestionAttempt.feedback.parts`). */
export function partResultsFrom(feedback: AttemptFeedbackJson | null | undefined): Map<string, PresentedPartResult> {
  return new Map(
    (feedback?.parts ?? []).map((part) => [
      part.partId,
      { awarded: part.awarded, max: part.max, correct: part.correct, pending: part.pending === true },
    ]),
  );
}

function revealSources(reveal: AnswerReveal, into: string[]): void {
  if (!reveal.html.explanation && reveal.explanation) into.push(reveal.explanation);
  if (!reveal.html.workedSolution && reveal.workedSolution) into.push(reveal.workedSolution);
  if (!reveal.html.conceptSummary && reveal.conceptSummary) into.push(reveal.conceptSummary);
  for (const option of reveal.options) if (option.rationale) into.push(option.rationale);
  if (reveal.modelAnswer) into.push(reveal.modelAnswer);
  for (const part of reveal.parts) revealSources(part, into);
}

/** Loads the images referenced by reveal texts (explanations, worked solutions, model answers). */
export function loadRevealAssets(reveals: readonly (AnswerReveal | null)[]): Promise<AssetResolver> {
  const sources: string[] = [];
  for (const reveal of reveals) if (reveal) revealSources(reveal, sources);
  return loadAssetResolver(sources);
}

/** Renders an answer reveal (§10: correct answer, why, concept, mark scheme, model answer), recursively for parts. */
export function presentReveal(
  reveal: AnswerReveal,
  partResults: ReadonlyMap<string, PresentedPartResult> = new Map(),
  resolveAsset: AssetResolver = NO_ASSETS,
): PresentedReveal {
  const id = reveal.questionId;
  const points = (list: readonly { id: string; description: string; marks: number }[]): PresentedPoint[] =>
    list.map((point) => ({ id: point.id, descriptionHtml: inline(point.description, id, resolveAsset), marks: point.marks }));
  return {
    questionId: id,
    partLabel: reveal.partLabel,
    correctAnswerHtml: reveal.correctAnswerDisplay ? inline(reveal.correctAnswerDisplay, id, resolveAsset) : null,
    explanationHtml: reveal.html.explanation ? trustPersistedHtml(reveal.html.explanation) : reveal.explanation ? block(reveal.explanation, id, resolveAsset) : null,
    workedSolutionHtml: reveal.html.workedSolution
      ? trustPersistedHtml(reveal.html.workedSolution)
      : reveal.workedSolution
        ? block(reveal.workedSolution, id, resolveAsset)
        : null,
    conceptHtml: reveal.html.conceptSummary
      ? trustPersistedHtml(reveal.html.conceptSummary)
      : reveal.conceptSummary
        ? block(reveal.conceptSummary, id, resolveAsset)
        : null,
    options: reveal.options.map((option) => ({
      key: option.key,
      isCorrect: option.isCorrect,
      rationaleHtml: option.rationale ? block(option.rationale, id, resolveAsset) : null,
    })),
    markScheme: reveal.markScheme
      ? {
          points: points(reveal.markScheme.points),
          levels: (reveal.markScheme.levels ?? []).map((level) => ({
            level: level.level,
            minMarks: level.minMarks,
            maxMarks: level.maxMarks,
            descriptorHtml: block(level.descriptor, id, resolveAsset),
          })),
        }
      : null,
    modelAnswerHtml: reveal.modelAnswer ? block(reveal.modelAnswer, id, resolveAsset) : null,
    methodMarks: points(reveal.methodMarks),
    partResult: partResults.get(id) ?? null,
    parts: reveal.parts.map((part) => presentReveal(part, partResults, resolveAsset)),
  };
}

export interface FeedbackExtras {
  /** Self-assessment offer (automatic marking unavailable). */
  selfAssessment?: PresentedFeedback["selfAssessment"];
  resolveAsset?: AssetResolver;
}

/**
 * Immediate feedback after `answerAndMark` (§10), ready for `<FeedbackPanel>`: the engine's result carries the stored
 * per-part detail (STRUCTURED parts, marker comment) and the topic's band before and after the answer (§11).
 */
export function presentAnswerFeedback(feedback: AnswerFeedback, extras: FeedbackExtras = {}): PresentedFeedback {
  const resolveAsset = extras.resolveAsset ?? NO_ASSETS;
  const reveal = feedback.reveal ? presentReveal(feedback.reveal, partResultsFrom(feedback.feedback), resolveAsset) : null;
  if (reveal) {
    // The engine already rendered the root texts (write-time cache or pipeline); prefer them.
    if (feedback.explanationHtml) reveal.explanationHtml = trustPersistedHtml(feedback.explanationHtml);
    if (feedback.workedSolutionHtml) reveal.workedSolutionHtml = trustPersistedHtml(feedback.workedSolutionHtml);
    if (feedback.conceptHtml) reveal.conceptHtml = trustPersistedHtml(feedback.conceptHtml);
    if (!reveal.correctAnswerHtml && feedback.correctAnswerDisplay) reveal.correctAnswerHtml = inline(feedback.correctAnswerDisplay, feedback.reveal?.questionId ?? "fb", resolveAsset);
  }
  const pending = feedback.status === "PENDING";
  return {
    position: feedback.position,
    status: feedback.status,
    outcome: feedbackOutcome({
      status: feedback.status,
      marksAwarded: feedback.marksAwarded,
      marksAvailable: feedback.marksAvailable,
      isCorrect: feedback.isCorrect,
    }),
    marksAwarded: pending ? null : feedback.marksAwarded,
    marksAvailable: feedback.marksAvailable,
    notes: [...feedback.notes],
    reveal,
    markerComment: feedback.feedback?.comment ?? null,
    topic: feedback.topic,
    studyLesson: feedback.studyLesson
      ? { title: feedback.studyLesson.title, href: feedback.studyLesson.href, premium: feedback.studyLesson.accessTier === "PREMIUM" }
      : null,
    mastery: feedback.mastery ? { before: feedback.mastery.before?.band ?? null, after: feedback.mastery.band, score: feedback.mastery.score } : null,
    selfAssessment: extras.selfAssessment ?? null,
    attemptCompleted: feedback.attemptCompleted,
    nextPosition: feedback.nextPosition,
  };
}

/**
 * The self-assessment offer of an answer the student may mark themselves (`selfAssessable` from the attempt engine):
 * the allocation and the mark-scheme points, rendered server-side. Null when self-marking is not allowed.
 */
export function presentSelfAssessment(input: {
  selfAssessable: boolean;
  marksAvailable: number;
  markScheme: { points: readonly { id: string; description: string; marks: number }[] } | null;
  questionId: string;
}): PresentedFeedback["selfAssessment"] {
  if (!input.selfAssessable) return null;
  const prefix = `sa-${input.questionId.replace(/[^0-9a-z]/gi, "").slice(-12).toLowerCase()}-`;
  return {
    maxMarks: input.marksAvailable,
    points: (input.markScheme?.points ?? []).map((point) => ({
      id: point.id,
      descriptionHtml: renderInline(point.description, { idPrefix: prefix }).html,
      marks: point.marks,
    })),
  };
}

/** {@link presentSelfAssessment} for a slot of the attempt view. */
export function slotSelfAssessment(slot: Pick<AttemptSlotView, "position" | "marksAvailable" | "result" | "question">): PresentedFeedback["selfAssessment"] {
  return presentSelfAssessment({
    selfAssessable: slot.result?.selfAssessable ?? false,
    marksAvailable: slot.marksAvailable,
    markScheme: slot.result?.reveal?.markScheme ?? null,
    questionId: slot.question?.id ?? `${slot.position}`,
  });
}

/**
 * Feedback of an already-marked slot (resumed sessions, summaries, the answered daily question). Null while the slot
 * has no visible result.
 */
export function presentSlotFeedback(
  slot: Pick<AttemptSlotView, "position" | "marksAvailable" | "result">,
  extras: Pick<FeedbackExtras, "selfAssessment" | "resolveAsset"> & { topic?: PresentedFeedback["topic"] } = {},
): PresentedFeedback | null {
  const result = slot.result;
  if (!result) return null;
  const pending = result.status === "PENDING";
  return {
    position: slot.position,
    status: result.status,
    outcome: feedbackOutcome({ status: result.status, marksAwarded: result.marksAwarded, marksAvailable: slot.marksAvailable, isCorrect: result.isCorrect }),
    marksAwarded: pending ? null : result.marksAwarded,
    marksAvailable: slot.marksAvailable,
    notes: [],
    reveal: result.reveal ? presentReveal(result.reveal, partResultsFrom(result.feedback), extras.resolveAsset ?? NO_ASSETS) : null,
    markerComment: result.feedback?.comment ?? null,
    topic: extras.topic ?? null,
    studyLesson: null,
    mastery: null,
    selfAssessment: extras.selfAssessment ?? null,
    attemptCompleted: false,
    nextPosition: null,
  };
}
