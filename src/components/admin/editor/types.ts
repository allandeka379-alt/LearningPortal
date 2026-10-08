import type { ContentHeading, ContentWarning, ContentWarningCode, SanitizedHtml } from "@/lib/content/types";
import type { AdminActionState } from "../form-state";

/**
 * Types shared by the editorial client components and the Server Actions that feed them (isomorphic, types and plain
 * constants only).
 */

export type PreviewMode = "lesson" | "card" | "inline";

export interface PreviewPayload {
  html: SanitizedHtml;
  warnings: readonly ContentWarning[];
  headings: readonly ContentHeading[];
  hasMath: boolean;
}

/** Server Action rendering markdown for the live preview (`renderContent` on the server). */
export type PreviewAction = (source: string, mode: PreviewMode) => Promise<AdminActionState<PreviewPayload>>;

export interface MediaPick {
  id: string;
  src: string;
  altText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  snippet: string;
}

/** Server Action searching the media library for the "Insert image" dialog. */
export type MediaSearchAction = (query: string) => Promise<AdminActionState<MediaPick[]>>;

export interface TopicChoice {
  id: string;
  label: string;
  depth: number;
  kind: string;
  path: string;
}

export interface ObjectiveChoice {
  id: string;
  topicId: string;
  topicPath: string;
  label: string;
}

export interface SyllabusTopicsPayload {
  syllabusId: string;
  topics: TopicChoice[];
  objectives: ObjectiveChoice[];
}

/** Server Action loading the topic tree (and objectives) of one syllabus version. */
export type LoadTopicsAction = (syllabusId: string) => Promise<AdminActionState<SyllabusTopicsPayload>>;

export interface TaggedTopicChoice {
  id: string;
  label: string;
  syllabusId: string;
  syllabusLabel: string;
  path: string;
  isPrimary: boolean;
}

export interface QuestionChoice {
  id: string;
  excerpt: string;
  type: string;
  difficulty: number;
  marks: number;
  subject: string;
  status: string;
}

/** Server Action searching published platform questions to attach to a lesson. */
export type QuestionSearchAction = (query: string, subjectId: string | null) => Promise<AdminActionState<QuestionChoice[]>>;

export interface Choice {
  value: string;
  label: string;
}

/** Short names for renderer warnings (docs/CONTENT_AUTHORING.md §7). */
export const WARNING_LABELS: Readonly<Record<ContentWarningCode, string>> = {
  "image-missing-alt": "Image without description",
  "image-external": "External image",
  "image-unresolved": "Unknown image",
  "raw-html": "HTML removed",
  "unknown-directive": "Unknown block",
  "directive-attribute": "Unsupported block attribute",
  "math-error": "Maths error",
  "math-currency": "Dollar sign",
  "inline-flattened": "Simplified inline text",
};

/** Warnings that block submitting for review (mirrors REVIEW_BLOCKING_WARNINGS on the server). */
export const BLOCKING_WARNING_CODES: ReadonlySet<ContentWarningCode> = new Set<ContentWarningCode>([
  "image-missing-alt",
  "image-unresolved",
  "image-external",
  "math-error",
  "unknown-directive",
]);
