import type { SearchableEntityType } from "@/server/search/types";
import { SEARCH_QUERY_MAX_LENGTH, type SearchTabKey } from "./config";

/**
 * URL helpers for in-app search (pure, isomorphic, unit-tested).
 *
 * Result destinations: questions, flashcards, tests and study packs (`/app/study-packs/{slug}`) already have in-app
 * paths in the index. Topics, subjects and public guide lessons are indexed with their PUBLIC (SEO) paths, but a
 * signed-in student should land in the app (their pinned syllabus version, progress, locks). Those go through
 * `/app/search/open`, which resolves the in-app page server-side and falls back to the indexed path when the student
 * is not enrolled (one redirect on click instead of extra queries for every result on the page).
 */

export const SEARCH_PATH = "/app/search";
export const SEARCH_OPEN_PATH = "/app/search/open";
/** Where locked (premium) teasers send students: plans on the billing page. */
export const UPGRADE_HREF = "/app/billing#plans";

/** Entity types resolved by the open route. */
export const OPENABLE_TYPES = ["SUBJECT", "TOPIC", "LESSON"] as const satisfies readonly SearchableEntityType[];
export type OpenableType = (typeof OPENABLE_TYPES)[number];

export function isOpenableType(value: unknown): value is OpenableType {
  return typeof value === "string" && (OPENABLE_TYPES as readonly string[]).includes(value);
}

/**
 * True for an app-relative path that is safe to redirect to: one leading "/", no scheme, no backslashes or control
 * characters (blocks `//evil.example`, `/\evil.example` and `javascript:`).
 */
export function isSafeInternalPath(path: unknown): path is string {
  if (typeof path !== "string" || path.length === 0 || path.length > 512) return false;
  if (!path.startsWith("/") || path.startsWith("//")) return false;
  if (/[\\\u0000-\u001f\u007f]/.test(path)) return false;
  return true;
}

export interface ResultLinkInput {
  entityType: SearchableEntityType;
  entityId: string;
  /** The indexed path (SearchDocument.path). */
  path: string;
}

function openHref(type: OpenableType, id: string, fallback: string): string {
  const params = new URLSearchParams({ type, id });
  if (isSafeInternalPath(fallback)) params.set("fallback", fallback);
  return `${SEARCH_OPEN_PATH}?${params.toString()}`;
}

const LEGACY_STUDY_PACK_PREFIX = "/study-packs/";

/** Where a search result or suggestion links for a signed-in student. */
export function resultHref(item: ResultLinkInput): string {
  switch (item.entityType) {
    case "SUBJECT":
    case "TOPIC":
      return openHref(item.entityType, item.entityId, item.path);
    case "LESSON":
      return item.path.startsWith("/app/") && isSafeInternalPath(item.path) ? item.path : openHref("LESSON", item.entityId, item.path);
    case "STUDY_PACK":
      // Documents indexed before 2026-10-07 carry `/study-packs/{slug}` (never a route) until `search.reindexAll` runs.
      if (item.path.startsWith(LEGACY_STUDY_PACK_PREFIX) && isSafeInternalPath(item.path)) return `/app${item.path}`;
      return isSafeInternalPath(item.path) ? item.path : SEARCH_PATH;
    case "QUESTION":
    case "FLASHCARD":
    case "ASSESSMENT":
      return isSafeInternalPath(item.path) ? item.path : SEARCH_PATH;
  }
}

/** State of the search page that lives in the URL. */
export interface SearchPageState {
  q: string;
  type: SearchTabKey;
  subjectId: string | null;
  /** Query understanding on (default) or off ("search my exact words"). */
  detect: boolean;
  cursor: string | null;
}

export const DEFAULT_SEARCH_STATE: SearchPageState = { q: "", type: "all", subjectId: null, detect: true, cursor: null };

/** `/app/search?…` for a state; defaults are omitted so URLs stay short and shareable. */
export function searchHref(state: Partial<SearchPageState>): string {
  const full = { ...DEFAULT_SEARCH_STATE, ...state };
  const params = new URLSearchParams();
  const q = full.q.trim().slice(0, SEARCH_QUERY_MAX_LENGTH);
  if (q !== "") params.set("q", q);
  if (full.type !== "all") params.set("type", full.type);
  if (full.subjectId) params.set("subjectId", full.subjectId);
  if (!full.detect) params.set("detect", "0");
  if (full.cursor) params.set("cursor", full.cursor);
  const query = params.toString();
  return query === "" ? SEARCH_PATH : `${SEARCH_PATH}?${query}`;
}
