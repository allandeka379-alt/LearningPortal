import { describe, expect, it } from "vitest";
import { z } from "zod";
import { encodeCursor } from "@/server/lib/api";
import { isAppError, type AppError } from "@/server/lib/errors";
import { LIST_CURSOR_EXPIRED_MESSAGE, listCursor, pageParams, paginateList, paginationQueryShape } from "./pagination";

function appErrorOf(fn: () => unknown): AppError {
  try {
    fn();
  } catch (error) {
    if (isAppError(error)) return error;
    throw error;
  }
  throw new Error("expected an AppError");
}

const items = Array.from({ length: 7 }, (_, index) => ({ id: `id-${index}` }));
const key = (item: { id: string }) => item.id;

describe("paginateList", () => {
  it("walks the whole list page by page, without gaps or duplicates", () => {
    const seen: string[] = [];
    let cursor: string | null = null;
    let pages = 0;
    do {
      const page: { items: { id: string }[]; nextCursor: string | null } = paginateList(items, key, { cursor, limit: 3 });
      seen.push(...page.items.map(key));
      cursor = page.nextCursor;
      pages += 1;
    } while (cursor !== null && pages < 10);
    expect(pages).toBe(3);
    expect(seen).toEqual(items.map(key));
  });

  it("returns no cursor when the page ends exactly at the end of the list", () => {
    const first = paginateList(items.slice(0, 4), key, { cursor: null, limit: 2 });
    const second = paginateList(items.slice(0, 4), key, { cursor: first.nextCursor, limit: 2 });
    expect(second.items.map(key)).toEqual(["id-2", "id-3"]);
    expect(second.nextCursor).toBeNull();
    expect(paginateList([], key, { cursor: null, limit: 5 })).toEqual({ items: [], nextCursor: null });
  });

  it("anchors on the last key, so an item inserted before the cursor causes no duplicate", () => {
    const first = paginateList(items, key, { cursor: null, limit: 3 });
    const grown = [{ id: "new-first" }, ...items];
    const second = paginateList(grown, key, { cursor: first.nextCursor, limit: 3 });
    expect(second.items.map(key)).toEqual(["id-3", "id-4", "id-5"]);
  });

  it("refuses malformed cursors and cursors whose anchor is gone", () => {
    expect(appErrorOf(() => paginateList(items, key, { cursor: "not-a-cursor", limit: 3 })).fieldErrors).toEqual({ cursor: ["Invalid cursor."] });
    expect(appErrorOf(() => paginateList(items, key, { cursor: encodeCursor({ id: "x" }), limit: 3 })).code).toBe("VALIDATION");
    const gone = appErrorOf(() => paginateList(items, key, { cursor: listCursor("deleted"), limit: 3 }));
    expect(gone.fieldErrors).toEqual({ cursor: [LIST_CURSOR_EXPIRED_MESSAGE] });
  });
});

describe("pagination query fields", () => {
  const schema = z.object(paginationQueryShape);

  it("treats empty values as absent and coerces the limit", () => {
    expect(schema.parse({})).toEqual({});
    expect(schema.parse({ cursor: "", limit: "" })).toEqual({ cursor: undefined, limit: undefined });
    expect(schema.parse({ cursor: "abc_-1", limit: "100" })).toEqual({ cursor: "abc_-1", limit: 100 });
  });

  it("rejects out-of-range limits and malformed cursors", () => {
    for (const limit of ["0", "101", "2.5", "x"]) expect(schema.safeParse({ limit }).success, limit).toBe(false);
    expect(schema.safeParse({ cursor: "a b" }).success).toBe(false);
    expect(schema.safeParse({ limit: ["1", "2"] }).success).toBe(false);
  });

  it("defaults the page size and enforces a smaller maximum", () => {
    expect(pageParams({})).toEqual({ cursor: null, limit: 20 });
    expect(pageParams({ cursor: "c", limit: 5 })).toEqual({ cursor: "c", limit: 5 });
    expect(pageParams({}, 10)).toEqual({ cursor: null, limit: 10 });
    expect(appErrorOf(() => pageParams({ limit: 60 }, 50)).code).toBe("VALIDATION");
  });
});
