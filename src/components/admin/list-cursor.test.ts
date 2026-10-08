import { describe, expect, it, vi } from "vitest";
import { AppError } from "@/server/lib/errors";
import { isStaleCursorError, loadFirstPageOnStaleCursor } from "./list-cursor";

describe("loadFirstPageOnStaleCursor", () => {
  it("retries from the first page when the service refuses the URL cursor", async () => {
    const load = vi.fn(async (filters: { q?: string; cursor?: string }) => {
      if (filters.cursor) throw new AppError("BAD_REQUEST", "This page link is no longer valid. Go back to the first page.");
      return { items: [filters.q], nextCursor: null };
    });
    await expect(loadFirstPageOnStaleCursor({ q: "maths", cursor: "garbage" }, load)).resolves.toEqual({ items: ["maths"], nextCursor: null });
    expect(load.mock.calls.map(([f]) => f)).toEqual([{ q: "maths", cursor: "garbage" }, { q: "maths", cursor: undefined }]);
  });

  it("treats a VALIDATION error on the cursor field as stale, but not other validation errors", async () => {
    expect(isStaleCursorError(AppError.validation({ cursor: ["Invalid page link."] }))).toBe(true);
    expect(isStaleCursorError(AppError.validation({ from: ["Not a date."] }))).toBe(false);
    expect(isStaleCursorError(AppError.forbidden())).toBe(false);
    expect(isStaleCursorError(new Error("boom"))).toBe(false);
  });

  it("never masks other failures, failures without a cursor, or a failing retry", async () => {
    await expect(loadFirstPageOnStaleCursor({ cursor: "x" }, async () => Promise.reject(AppError.forbidden()))).rejects.toMatchObject({ code: "FORBIDDEN" });
    const noCursor = vi.fn(async () => Promise.reject(new AppError("BAD_REQUEST", "Bad filter.")));
    await expect(loadFirstPageOnStaleCursor({ cursor: undefined }, noCursor)).rejects.toMatchObject({ code: "BAD_REQUEST" });
    expect(noCursor).toHaveBeenCalledTimes(1);
    const always = vi.fn(async () => Promise.reject(new AppError("BAD_REQUEST", "Bad filter.")));
    await expect(loadFirstPageOnStaleCursor({ cursor: "x" }, always)).rejects.toMatchObject({ message: "Bad filter." });
    expect(always).toHaveBeenCalledTimes(2);
  });
});
