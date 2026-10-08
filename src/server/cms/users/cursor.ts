import { z } from "zod";
import { AppError } from "@/server/lib/errors";

/**
 * Opaque keyset cursors for admin lists ordered newest first by (`createdAt` DESC, `id` DESC) — rule 11 cursor
 * pagination, shared by the users, schools, announcements and audit-log services. Pure.
 */

const cursorSchema = z.object({ t: z.number().int().nonnegative(), id: z.uuid() });

export interface KeysetCursor {
  createdAt: Date;
  id: string;
}

/** Encodes the last row of a page as an opaque URL-safe cursor. */
export function encodeCursor(row: { createdAt: Date; id: string }): string {
  return Buffer.from(JSON.stringify({ t: row.createdAt.getTime(), id: row.id })).toString("base64url");
}

/** Decodes a cursor from the URL; a tampered or stale cursor is a 400, never a crash. */
export function decodeCursor(cursor: string): KeysetCursor {
  try {
    const parsed = cursorSchema.parse(JSON.parse(Buffer.from(cursor, "base64url").toString("utf8")));
    return { createdAt: new Date(parsed.t), id: parsed.id };
  } catch {
    throw new AppError("BAD_REQUEST", "This page link is no longer valid. Go back to the first page.");
  }
}

/** Prisma `where` fragment selecting rows strictly after `cursor` in (createdAt DESC, id DESC) order. */
export function afterCursorWhere(cursor: KeysetCursor | null): Record<string, unknown> {
  if (cursor === null) return {};
  return {
    OR: [{ createdAt: { lt: cursor.createdAt } }, { createdAt: cursor.createdAt, id: { lt: cursor.id } }],
  };
}

/** Splits `limit + 1` fetched rows into the page and the next cursor. */
export function pageOf<T extends { createdAt: Date; id: string }>(rows: readonly T[], limit: number): { items: T[]; nextCursor: string | null } {
  const items = rows.slice(0, limit);
  const last = items.at(-1);
  return { items, nextCursor: rows.length > limit && last ? encodeCursor(last) : null };
}

export const DEFAULT_PAGE_SIZE = 25;
export const MAX_PAGE_SIZE = 100;

/** Zod for `limit` (1-100, default 25). */
export const pageSizeSchema = z.coerce.number().int().min(1).max(MAX_PAGE_SIZE).default(DEFAULT_PAGE_SIZE);
