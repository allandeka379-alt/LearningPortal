/**
 * Display names and admin links per content type (isomorphic, pure). Shared by the review queue, flags and revision
 * pages so every place names and links content the same way.
 */

export const REVIEWABLE_TYPES = ["LESSON", "QUESTION", "FLASHCARD", "ASSESSMENT", "STUDY_PACK", "STUDY_PLAN_TEMPLATE"] as const;
export type ReviewableType = (typeof REVIEWABLE_TYPES)[number];

export const CONTENT_TYPE_LABELS: Readonly<Record<ReviewableType, { singular: string; plural: string }>> = {
  LESSON: { singular: "Lesson", plural: "Lessons" },
  QUESTION: { singular: "Question", plural: "Questions" },
  FLASHCARD: { singular: "Flashcard", plural: "Flashcards" },
  ASSESSMENT: { singular: "Exam / test", plural: "Exams & tests" },
  STUDY_PACK: { singular: "Study pack", plural: "Study packs" },
  STUDY_PLAN_TEMPLATE: { singular: "Study plan template", plural: "Study plan templates" },
};

/** URL segment for a type in /admin/review/[type]/[id] (lower-case, hyphenated). */
export function typeSegment(type: ReviewableType): string {
  return type.toLowerCase().replace(/_/g, "-");
}

/** Inverse of {@link typeSegment}; `null` for anything else (route params are untrusted). */
export function typeFromSegment(segment: string): ReviewableType | null {
  const upper = segment.toUpperCase().replace(/-/g, "_");
  return (REVIEWABLE_TYPES as readonly string[]).includes(upper) ? (upper as ReviewableType) : null;
}

/** The authoring page of an item (owned by the editor of that content type). */
export function editorHref(type: ReviewableType, id: string): string {
  switch (type) {
    case "LESSON":
      return `/admin/lessons/${id}`;
    case "FLASHCARD":
      return `/admin/flashcards/${id}`;
    case "QUESTION":
      return `/admin/questions/${id}`;
    case "ASSESSMENT":
      return `/admin/exams/${id}`;
    case "STUDY_PACK":
      return `/admin/study-packs/${id}`;
    case "STUDY_PLAN_TEMPLATE":
      return `/admin/study-packs`;
  }
}

/** The review page of an item (diff against the last published revision, workflow actions). */
export function reviewHref(type: ReviewableType, id: string): string {
  return `/admin/review/${typeSegment(type)}/${id}`;
}

/** The read-only revision history of an item. */
export function revisionsHref(type: ReviewableType, id: string, revision?: number): string {
  return revision === undefined ? `${reviewHref(type, id)}/revisions` : `${reviewHref(type, id)}/revisions/${revision}`;
}
