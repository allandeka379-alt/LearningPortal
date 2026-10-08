/**
 * Change detection for the importer (pure): every content row is projected onto the fields the content SOURCE
 * controls, from the database row and from the document the importer would save, and the canonical JSON of both is
 * compared. Equal projections = "unchanged" (no write, no new revision), which is what makes re-imports idempotent.
 * Provenance, workflow columns and render caches are deliberately not compared.
 */

/** Stable JSON: object keys sorted, `undefined` dropped, Dates as ISO strings. */
export function canonical(value: unknown): string {
  if (value === undefined) return "null";
  if (value === null || typeof value !== "object") return JSON.stringify(value) ?? "null";
  if (value instanceof Date) return JSON.stringify(value.toISOString());
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  const entries = Object.entries(value as Record<string, unknown>)
    .filter(([, v]) => v !== undefined)
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
  return `{${entries.map(([k, v]) => `${JSON.stringify(k)}:${canonical(v)}`).join(",")}}`;
}

export function same(a: unknown, b: unknown): boolean {
  return canonical(a) === canonical(b);
}

/** Sorted `topicId:primary` list (tags are compared as a set). */
export function tagKey(tags: readonly { topicId: string; isPrimary: boolean }[]): string {
  return tags
    .map((t) => `${t.topicId.toLowerCase()}:${t.isPrimary ? 1 : 0}`)
    .sort()
    .join(",");
}

export function idSetKey(ids: readonly string[]): string {
  return [...new Set(ids.map((id) => id.toLowerCase()))].sort().join(",");
}

// ---------------------------------------------------------------------------------------------------------------------
// Questions
// ---------------------------------------------------------------------------------------------------------------------

export interface OptionLike {
  key: string;
  content: string;
  isCorrect: boolean;
  rationale?: string | null;
}

export interface QuestionNodeLike {
  type: string;
  markingMode: string;
  stem: string;
  payload: unknown;
  answerSpec: unknown;
  marks: number;
  explanation?: string | null;
  workedSolution?: string | null;
  hints: readonly string[];
  options: readonly OptionLike[];
  partLabel?: string | null;
  parts?: readonly QuestionNodeLike[];
}

export interface QuestionRootLike extends QuestionNodeLike {
  subjectId: string;
  conceptSummary?: string | null;
  difficulty: number;
  estimatedSeconds?: number | null;
  paperLabel?: string | null;
  cognitiveSkill?: string | null;
  isExamStyle: boolean;
  isDailyEligible: boolean;
  calculatorAllowed?: boolean | null;
  accessTier: string;
}

function nodeProjection(node: QuestionNodeLike): Record<string, unknown> {
  return {
    type: node.type,
    markingMode: node.markingMode,
    stem: node.stem,
    payload: node.payload ?? null,
    answerSpec: node.answerSpec ?? null,
    marks: node.marks,
    explanation: node.explanation ?? null,
    workedSolution: node.workedSolution ?? null,
    hints: [...node.hints],
    partLabel: node.partLabel ?? null,
    options: node.options.map((o) => ({ key: o.key, content: o.content, isCorrect: o.isCorrect, rationale: o.rationale ?? null })),
    parts: (node.parts ?? []).map(nodeProjection),
  };
}

export function questionProjection(root: QuestionRootLike): string {
  return canonical({
    ...nodeProjection({ ...root, partLabel: null }),
    subjectId: root.subjectId,
    conceptSummary: root.conceptSummary ?? null,
    difficulty: root.difficulty,
    estimatedSeconds: root.estimatedSeconds ?? null,
    paperLabel: root.paperLabel ?? null,
    cognitiveSkill: root.cognitiveSkill ?? null,
    isExamStyle: root.isExamStyle,
    isDailyEligible: root.isDailyEligible,
    calculatorAllowed: root.calculatorAllowed ?? null,
    accessTier: root.accessTier,
  });
}

// ---------------------------------------------------------------------------------------------------------------------
// Lessons, flashcards
// ---------------------------------------------------------------------------------------------------------------------

export interface LessonLike {
  title: string;
  kind: string;
  subjectId: string | null;
  summary: string | null;
  body: string;
  estimatedMinutes: number;
  accessTier: string;
  /** Compared only when the source sets an explicit slug. */
  slug?: string | null;
}

export function lessonProjection(lesson: LessonLike, compareSlug: boolean): string {
  return canonical({
    title: lesson.title,
    kind: lesson.kind,
    subjectId: lesson.subjectId,
    summary: lesson.summary,
    body: lesson.body,
    estimatedMinutes: lesson.estimatedMinutes,
    accessTier: lesson.accessTier,
    ...(compareSlug ? { slug: lesson.slug ?? null } : {}),
  });
}

export interface FlashcardLike {
  subjectId: string;
  cardType: string;
  front: string;
  back: string;
  notes: string | null;
  accessTier: string;
}

export function flashcardProjection(card: FlashcardLike): string {
  return canonical({ subjectId: card.subjectId, cardType: card.cardType, front: card.front, back: card.back, notes: card.notes, accessTier: card.accessTier });
}

// ---------------------------------------------------------------------------------------------------------------------
// Assessments
// ---------------------------------------------------------------------------------------------------------------------

export interface AssessmentLike {
  kind: string;
  assembly: string;
  subjectId: string;
  syllabusId: string | null;
  title: string;
  description: string | null;
  instructions: string | null;
  timeLimitSeconds: number | null;
  maxAttempts: number | null;
  feedbackTiming: string;
  shuffleQuestions: boolean;
  shuffleOptions: boolean;
  allowNavigation: boolean;
  accessTier: string;
  sections: {
    title: string;
    instructions: string | null;
    componentId: string | null;
    timeLimitSeconds: number | null;
    answerCount: number | null;
    /** Only compared for "answer any N" sections (otherwise derived from the items and rules). */
    marks: number | null;
    items: { questionId: string; label: string | null; marks: number | null }[];
    rules: {
      topicId: string | null;
      objectiveId: string | null;
      includeSubtopics: boolean;
      questionType: string | null;
      cognitiveSkill: string | null;
      difficultyMin: number;
      difficultyMax: number;
      questionCount: number;
      marksPerQuestion: number | null;
      examStyleOnly: boolean;
    }[];
  }[];
}

export function assessmentProjection(a: AssessmentLike): string {
  return canonical({
    kind: a.kind,
    assembly: a.assembly,
    subjectId: a.subjectId,
    syllabusId: a.syllabusId,
    title: a.title,
    description: a.description,
    instructions: a.instructions,
    timeLimitSeconds: a.timeLimitSeconds,
    maxAttempts: a.maxAttempts,
    feedbackTiming: a.feedbackTiming,
    shuffleQuestions: a.shuffleQuestions,
    shuffleOptions: a.shuffleOptions,
    allowNavigation: a.allowNavigation,
    accessTier: a.accessTier,
    sections: a.sections.map((s) => ({
      title: s.title,
      instructions: s.instructions,
      componentId: s.componentId,
      timeLimitSeconds: s.timeLimitSeconds,
      answerCount: s.answerCount,
      marks: s.answerCount !== null ? s.marks : null,
      items: s.items.map((i) => ({ questionId: i.questionId, label: i.label, marks: i.marks })),
      rules: s.rules.map((r) => ({
        topicId: r.topicId,
        objectiveId: r.objectiveId,
        includeSubtopics: r.includeSubtopics,
        questionType: r.questionType,
        cognitiveSkill: r.cognitiveSkill,
        difficultyMin: r.difficultyMin,
        difficultyMax: r.difficultyMax,
        questionCount: r.questionCount,
        marksPerQuestion: r.marksPerQuestion,
        examStyleOnly: r.examStyleOnly,
      })),
    })),
  });
}
