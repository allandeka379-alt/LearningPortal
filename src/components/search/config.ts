import type { SearchableEntityType } from "@/server/search/types";

/**
 * In-app search UI configuration (§28). Pure and isomorphic (safe for client bundles): tab definitions, labels and
 * the shape of an autocomplete suggestion as the `/api/v1/search/suggest` route returns it.
 */

export type { SearchableEntityType };

/** URL values of the result tabs (`/app/search?type=…`). */
export const SEARCH_TAB_KEYS = ["all", "lessons", "questions", "flashcards", "exams", "packs", "topics"] as const;
export type SearchTabKey = (typeof SEARCH_TAB_KEYS)[number];

export interface SearchTab {
  key: SearchTabKey;
  label: string;
  /** Entity types shown in this tab; `null` = every type. */
  types: readonly SearchableEntityType[] | null;
}

/** Result tabs in display order (UI copy, not content). */
export const SEARCH_TABS: readonly SearchTab[] = [
  { key: "all", label: "All", types: null },
  { key: "lessons", label: "Lessons", types: ["LESSON"] },
  { key: "questions", label: "Questions", types: ["QUESTION"] },
  { key: "flashcards", label: "Flashcards", types: ["FLASHCARD"] },
  { key: "exams", label: "Mock exams & tests", types: ["ASSESSMENT"] },
  { key: "packs", label: "Study packs", types: ["STUDY_PACK"] },
  { key: "topics", label: "Topics", types: ["TOPIC", "SUBJECT"] },
];

export function isSearchTabKey(value: unknown): value is SearchTabKey {
  return typeof value === "string" && (SEARCH_TAB_KEYS as readonly string[]).includes(value);
}

export function searchTab(key: SearchTabKey): SearchTab {
  return SEARCH_TABS.find((tab) => tab.key === key) ?? (SEARCH_TABS[0] as SearchTab);
}

/** Short type label shown on each result and suggestion. */
export const ENTITY_TYPE_LABELS: Readonly<Record<SearchableEntityType, string>> = {
  SUBJECT: "Subject",
  TOPIC: "Topic",
  LESSON: "Lesson",
  QUESTION: "Question",
  FLASHCARD: "Flashcard",
  ASSESSMENT: "Test",
  STUDY_PACK: "Study pack",
};

/** Detected-filter chip kinds (query understanding), worded for the chip's accessible name. */
export const FILTER_KIND_LABELS: Readonly<Record<"board" | "level" | "qualification" | "subject" | "topic" | "type", string>> = {
  board: "Exam board",
  level: "Level",
  qualification: "Qualification",
  subject: "Subject",
  topic: "Topic",
  type: "Type",
};

/** One autocomplete suggestion (titles only: safe for premium items). */
export interface SuggestionView {
  title: string;
  entityType: SearchableEntityType;
  entityId: string;
  subtitle: string | null;
  path: string;
  accessTier: "PUBLIC" | "FREE" | "PREMIUM";
}

/** Shortest text the autocomplete asks the server about (the service returns nothing below it). */
export const SUGGEST_MIN_LENGTH = 2;
/** Longest query the search page accepts (mirrors the service's MAX_QUERY_LENGTH). */
export const SEARCH_QUERY_MAX_LENGTH = 200;
