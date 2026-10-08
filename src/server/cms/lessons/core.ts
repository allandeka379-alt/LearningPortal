import type { FieldErrors } from "@/server/lib/errors";

/**
 * Pure rules of lesson authoring (§8, §44). No I/O: unit tested in core.test.ts; the service wraps them with database
 * reads.
 */

export const LESSON_KINDS = ["LESSON", "REVISION_NOTES", "WORKED_EXAMPLES", "EXAM_TIPS", "STUDY_GUIDE", "ARTICLE"] as const;
export type LessonKindValue = (typeof LESSON_KINDS)[number];

/** Public SEO pages that may exist without a home subject (Lesson_scope_chk, §44). */
export const SUBJECTLESS_KINDS: ReadonlySet<LessonKindValue> = new Set<LessonKindValue>(["ARTICLE", "STUDY_GUIDE"]);

/** Kinds students reach through the topic tree: they need a primary topic before review. */
export const TOPIC_BOUND_KINDS: ReadonlySet<LessonKindValue> = new Set<LessonKindValue>(["LESSON", "REVISION_NOTES", "WORKED_EXAMPLES", "EXAM_TIPS"]);

export const LESSON_SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;
export const MAX_SLUG_LENGTH = 80;

/** "Solving Quadratics: Part 2!" → "solving-quadratics-part-2" (ASCII, hyphenated, at most 80 chars). */
export function slugify(title: string, fallback = "lesson"): string {
  const slug = title
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, MAX_SLUG_LENGTH)
    .replace(/-+$/g, "");
  return slug === "" ? fallback : slug;
}

/** `base`, or `base-2`, `base-3`… — the first one not in `taken` (kept within the slug length limit). */
export function nextFreeSlug(base: string, taken: ReadonlySet<string>): string {
  if (!taken.has(base)) return base;
  for (let n = 2; n < 10_000; n += 1) {
    const suffix = `-${n}`;
    const candidate = `${base.slice(0, MAX_SLUG_LENGTH - suffix.length).replace(/-+$/g, "")}${suffix}`;
    if (!taken.has(candidate)) return candidate;
  }
  return `${base.slice(0, MAX_SLUG_LENGTH - 13)}-${Date.now().toString(36)}`;
}

export interface TopicTagInput {
  topicId: string;
  isPrimary: boolean;
  sortOrder: number;
}

/**
 * Normalises tag input: de-duplicated topic ids in the given order, exactly one primary when there is at least one
 * tag (the requested primary, else the first tag). Returns null for the primary when there are no tags.
 */
export function normaliseTopicTags(topicIds: readonly string[], primaryTopicId: string | null | undefined, sortOrder = 0): TopicTagInput[] {
  const unique = [...new Set(topicIds.map((id) => id.toLowerCase()))];
  if (unique.length === 0) return [];
  const primary = primaryTopicId && unique.includes(primaryTopicId.toLowerCase()) ? primaryTopicId.toLowerCase() : unique[0];
  return unique.map((topicId) => ({ topicId, isPrimary: topicId === primary, sortOrder }));
}

export interface LessonShape {
  kind: LessonKindValue | string;
  title: string;
  body: string;
  subjectId: string | null;
  topicCount: number;
  hasPrimaryTopic: boolean;
}

/** Structural problems that block review (empty = none). */
export function lessonStructureIssues(lesson: LessonShape): FieldErrors {
  const errors: FieldErrors = {};
  if (lesson.title.trim() === "") (errors.title ??= []).push("Give the lesson a title.");
  if (lesson.body.trim() === "") (errors.body ??= []).push("Write the lesson before submitting it for review.");
  if (lesson.subjectId === null && !SUBJECTLESS_KINDS.has(lesson.kind as LessonKindValue)) {
    (errors.subjectId ??= []).push("Choose the lesson's home subject.");
  }
  if (TOPIC_BOUND_KINDS.has(lesson.kind as LessonKindValue) && !lesson.hasPrimaryTopic) {
    (errors.topicIds ??= []).push("Tag the lesson to its primary topic so students can find it.");
  }
  return errors;
}

/** True when `objectiveTopicPath` is a tagged topic or lies below one (materialised paths "a/b/c"). */
export function isWithinTaggedTopics(objectiveTopicPath: string, taggedTopicPaths: readonly string[]): boolean {
  return taggedTopicPaths.some((path) => objectiveTopicPath === path || objectiveTopicPath.startsWith(`${path}/`));
}
