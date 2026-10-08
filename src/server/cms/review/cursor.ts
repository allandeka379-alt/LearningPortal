import { z } from "zod";
import { AppError } from "@/server/lib/errors";

/**
 * Opaque keyset cursors for the editorial lists (rule 11: cursor pagination, no OFFSET, no total counts), over any
 * timestamp column with `id` as the tie-breaker, in either direction: the review queue and open flags are served
 * oldest first, the lesson / flashcard / media libraries newest first. Pure.
 */

export type KeysetField = "createdAt" | "updatedAt";
export type KeysetDirection = "asc" | "desc";

const cursorSchema = z.object({ t: z.number().int().nonnegative(), id: z.uuid() });

export interface Keyset {
  at: Date;
  id: string;
}

export const LIST_PAGE_SIZE = 25;

/** Encodes a row position as an opaque, URL-safe cursor. */
export function encodeKeyset(at: Date, id: string): string {
  return Buffer.from(JSON.stringify({ t: at.getTime(), id })).toString("base64url");
}

/** Decodes a cursor from the URL (`null` for none); a tampered or stale cursor is a 400, never a crash. */
export function decodeKeyset(cursor: string | null | undefined): Keyset | null {
  if (!cursor) return null;
  try {
    const parsed = cursorSchema.parse(JSON.parse(Buffer.from(cursor, "base64url").toString("utf8")));
    return { at: new Date(parsed.t), id: parsed.id };
  } catch {
    throw new AppError("BAD_REQUEST", "This page link is no longer valid. Go back to the first page.");
  }
}

/** Prisma `where` fragment for rows strictly after `cursor` in (`field`, id) order. */
export function keysetWhere(field: KeysetField, cursor: Keyset | null, direction: KeysetDirection): Record<string, unknown> {
  if (cursor === null) return {};
  const op = direction === "asc" ? "gt" : "lt";
  return { OR: [{ [field]: { [op]: cursor.at } }, { [field]: cursor.at, id: { [op]: cursor.id } }] };
}

/** Prisma `orderBy` for (`field`, id). */
export function keysetOrder(field: KeysetField, direction: KeysetDirection): Record<string, KeysetDirection>[] {
  return [{ [field]: direction }, { id: direction }];
}

/** Splits `limit + 1` fetched rows into the page and the next cursor. */
export function keysetPage<T extends { id: string }>(rows: readonly T[], limit: number, at: (row: T) => Date): { items: T[]; nextCursor: string | null } {
  const items = rows.slice(0, limit);
  const last = items.at(-1);
  return { items, nextCursor: rows.length > limit && last ? encodeKeyset(at(last), last.id) : null };
}

/** Compares two rows in (`at`, id) order for merging pages from several tables. */
export function compareKeyset(a: Keyset, b: Keyset, direction: KeysetDirection): number {
  const diff = a.at.getTime() - b.at.getTime() || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
  return direction === "asc" ? diff : -diff;
}
