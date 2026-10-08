/**
 * Query parameters of the exams pages (§12): `/app/exams?subjectId=…&topicId=…&cursor=…` (topic-test deep links from
 * results recommendations, subject dashboards and the study plan) and `/app/exams/[assessmentId]?origin=PLAN_ITEM`.
 * Pure; malformed values are ignored (never an error page).
 */

export type SearchParams = Record<string, string | string[] | undefined>;

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export const START_ORIGINS = ["BUILDER", "PLAN_ITEM", "RECOMMENDATION"] as const;
export type StartOrigin = (typeof START_ORIGINS)[number];

function first(value: string | string[] | undefined): string | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  const trimmed = raw?.trim();
  return trimmed ? trimmed : undefined;
}

function uuidOrNull(value: string | string[] | undefined): string | null {
  const raw = first(value);
  return raw && UUID.test(raw) ? raw.toLowerCase() : null;
}

export interface CatalogueParams {
  subjectId: string | null;
  topicId: string | null;
  /** History page cursor (an attempt id). */
  cursor: string | null;
}

export function parseCatalogueParams(params: SearchParams): CatalogueParams {
  return { subjectId: uuidOrNull(params.subjectId), topicId: uuidOrNull(params.topicId), cursor: uuidOrNull(params.cursor) };
}

/** Where an instructions page was opened from (recorded on the attempt for analytics). */
export function parseStartOrigin(params: SearchParams): StartOrigin {
  const raw = first(params.origin)?.toUpperCase();
  return (START_ORIGINS as readonly string[]).includes(raw ?? "") ? (raw as StartOrigin) : "BUILDER";
}

/** `/app/exams` with the given filters (empty values dropped). */
export function catalogueHref(filters: { subjectId?: string | null; topicId?: string | null; cursor?: string | null }): string {
  const params = new URLSearchParams();
  if (filters.subjectId) params.set("subjectId", filters.subjectId);
  if (filters.topicId) params.set("topicId", filters.topicId);
  if (filters.cursor) params.set("cursor", filters.cursor);
  const query = params.toString();
  return query ? `/app/exams?${query}` : "/app/exams";
}

/** The UUID shape check shared by the exam routes (anything else is a 404 without a database round trip). */
export function isUuid(value: string): boolean {
  return UUID.test(value);
}
