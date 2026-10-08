/**
 * Deep-link parameters of the flashcard pages: `/app/flashcards?subjectId=…&topicId=…` (topic page "Flashcards"),
 * `/app/flashcards?cardId=…` (search results), `/app/flashcards/review?subjectId=…&topicId=…` (dashboard, study plan),
 * `/app/flashcards/new?subjectId=…&topicId=…` and list cursors. Pure; malformed values are dropped (never an error page).
 */

export type SearchParams = Record<string, string | string[] | undefined>;

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** First value of a parameter when it is a UUID, else undefined. */
export function uuidParam(params: SearchParams, key: string): string | undefined {
  const raw = params[key];
  const value = (Array.isArray(raw) ? raw[0] : raw)?.trim();
  return value && UUID.test(value) ? value.toLowerCase() : undefined;
}

export interface DeckParams {
  subjectId?: string;
  topicId?: string;
  cardId?: string;
}

/** Subject / topic / card ids from the query string (only well-formed UUIDs). */
export function parseDeckParams(params: SearchParams): DeckParams {
  const out: DeckParams = {};
  for (const key of ["subjectId", "topicId", "cardId"] as const) {
    const value = uuidParam(params, key);
    if (value) out[key] = value;
  }
  return out;
}
