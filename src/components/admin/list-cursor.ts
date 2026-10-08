import "server-only";
import { isAppError } from "@/server/lib/errors";

/**
 * Cursor-paginated admin lists keep their `cursor` in the URL, so a bookmarked, hand-edited or out-of-date link can
 * carry a cursor the service refuses (BAD_REQUEST, or VALIDATION on the `cursor` field). That must not send the whole
 * page to the error boundary ("This page couldn't load", with a retry that can never succeed): the list simply starts
 * again from its first page. Any other failure, including one on the retry, still propagates.
 */

/** True for the services' "this page link is no longer valid" refusals. */
export function isStaleCursorError(error: unknown): boolean {
  if (!isAppError(error)) return false;
  if (error.code === "BAD_REQUEST") return true;
  return error.code === "VALIDATION" && error.fieldErrors?.cursor !== undefined;
}

/**
 * Runs `load(filters)`; when `filters.cursor` is set and refused as stale, runs it again from the first page.
 *
 * @example const page = await loadFirstPageOnStaleCursor(filters, (f) => listUsers(actor, f));
 */
export async function loadFirstPageOnStaleCursor<F extends { cursor?: string | null }, T>(filters: F, load: (filters: F) => Promise<T>): Promise<T> {
  try {
    return await load(filters);
  } catch (error) {
    if (filters.cursor === undefined || filters.cursor === null || !isStaleCursorError(error)) throw error;
    return load({ ...filters, cursor: undefined });
  }
}
