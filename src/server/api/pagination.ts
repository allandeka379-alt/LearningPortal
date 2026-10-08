import "server-only";
import { z } from "zod";
import { decodeCursor, DEFAULT_PAGE_LIMIT, encodeCursor, MAX_PAGE_LIMIT, type CursorParams } from "@/server/lib/api";
import { AppError } from "@/server/lib/errors";

/**
 * Cursor pagination for the REST API's small, bounded lists (ARCHITECTURE §9.4: "offset pagination only for small
 * bounded sets" — we still hand out opaque cursors so every `/api/v1` list has the same `{ data, nextCursor }` contract
 * and can move to keyset pagination in SQL without a client change).
 *
 * The services behind these endpoints return the whole, stably ordered list (catalogue levels, a student's enrolments,
 * the roots of a topic tree), usually from a per-process cache. The cursor names the KEY of the last item returned
 * (`{ after: id }`), not an offset, so an item inserted before the cursor never causes a duplicate on the next page.
 * When the anchor item has disappeared (archived between two requests) the cursor is refused with a VALIDATION error
 * and the client restarts from the first page.
 */

export const LIST_CURSOR_EXPIRED_MESSAGE = "This page link has expired. Load the list again from the start.";

const listCursorSchema = z.strictObject({ after: z.string().min(1).max(200) });

/** `?x=` (empty) means "not given", like an absent parameter. */
const emptyAsAbsent = (value: unknown) => (value === "" ? undefined : value);
const LIMIT_MESSAGE = `limit must be a whole number between 1 and ${MAX_PAGE_LIMIT}.`;

/** Query-string fields shared by every paginated endpoint (documented in the OpenAPI document). */
export const paginationQueryShape = {
  cursor: optionalQuery(z.string().regex(/^[A-Za-z0-9_-]{1,512}$/, { message: "Invalid cursor." })).describe(
    "Opaque `nextCursor` from the previous page. Omit for the first page.",
  ),
  limit: optionalQuery(
    z.coerce.number({ message: LIMIT_MESSAGE }).int({ message: LIMIT_MESSAGE }).min(1, { message: LIMIT_MESSAGE }).max(MAX_PAGE_LIMIT, { message: LIMIT_MESSAGE }),
  ).describe(`Page size, 1-${MAX_PAGE_LIMIT} (default ${DEFAULT_PAGE_LIMIT}).`),
};

/**
 * An optional query-string parameter where an empty value (`?x=`) counts as absent. Optional on the outside too, so
 * the OpenAPI document does not list it as required.
 */
export function optionalQuery<S extends z.ZodType>(schema: S) {
  return z.preprocess(emptyAsAbsent, schema.optional()).optional();
}

/** `CursorParams` from validated query fields (see {@link paginationQueryShape}). */
export function pageParams(query: { cursor?: string | undefined; limit?: number | undefined }, maxLimit: number = MAX_PAGE_LIMIT): CursorParams {
  const limit = query.limit ?? Math.min(DEFAULT_PAGE_LIMIT, maxLimit);
  if (limit > maxLimit) throw AppError.validation({ limit: [`limit must be a whole number between 1 and ${maxLimit}.`] });
  return { cursor: query.cursor ?? null, limit };
}

/** Opaque cursor pointing after the item with `key`. */
export function listCursor(key: string): string {
  return encodeCursor({ after: key });
}

/**
 * One page of an already ordered list. `keyOf` must be unique per item and stable between requests (an id).
 *
 * @throws AppError VALIDATION (`cursor`) for a malformed cursor or one whose anchor item is gone.
 */
export function paginateList<T>(items: readonly T[], keyOf: (item: T) => string, page: CursorParams): { items: T[]; nextCursor: string | null } {
  let start = 0;
  if (page.cursor !== null) {
    const { after } = decodeCursor(page.cursor, listCursorSchema);
    const index = items.findIndex((item) => keyOf(item) === after);
    if (index < 0) throw AppError.validation({ cursor: [LIST_CURSOR_EXPIRED_MESSAGE] }, LIST_CURSOR_EXPIRED_MESSAGE);
    start = index + 1;
  }
  const slice = items.slice(start, start + page.limit);
  const last = slice[slice.length - 1];
  const hasMore = start + page.limit < items.length;
  return { items: slice, nextCursor: hasMore && last !== undefined ? listCursor(keyOf(last)) : null };
}
