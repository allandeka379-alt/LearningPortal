import { describe, expect, it } from "vitest";
import { buildHref, enumParam, firstParam, hrefWith } from "@/components/admin/search-params";
import { afterCursorWhere, decodeCursor, encodeCursor, pageOf } from "./cursor";

describe("keyset cursors", () => {
  it("round-trips the last row and rejects tampered cursors", () => {
    const row = { createdAt: new Date("2026-10-05T10:00:00.123Z"), id: "0192f1a0-0000-7000-8000-000000000001" };
    const cursor = encodeCursor(row);
    expect(cursor).toMatch(/^[A-Za-z0-9_-]+$/);
    expect(decodeCursor(cursor)).toEqual(row);
    expect(() => decodeCursor("garbage")).toThrowError(/no longer valid/);
    expect(() => decodeCursor(Buffer.from(JSON.stringify({ t: 1, id: "x" })).toString("base64url"))).toThrow();
  });

  it("selects rows after the cursor in (createdAt desc, id desc) order and splits pages", () => {
    expect(afterCursorWhere(null)).toEqual({});
    const at = new Date("2026-10-05T00:00:00Z");
    expect(afterCursorWhere({ createdAt: at, id: "b" })).toEqual({ OR: [{ createdAt: { lt: at } }, { createdAt: at, id: { lt: "b" } }] });
    const rows = [1, 2, 3].map((n) => ({ createdAt: new Date(n), id: `0192f1a0-0000-7000-8000-00000000000${n}` }));
    const page = pageOf(rows, 2);
    expect(page.items).toHaveLength(2);
    expect(decodeCursor(page.nextCursor!)).toEqual(rows[1]);
    expect(pageOf(rows, 3).nextCursor).toBeNull();
  });
});

describe("admin search params", () => {
  it("reads, allow-lists and rebuilds URL filters", () => {
    const params = { q: "  tendai ", status: "ACTIVE", role: ["ADMIN", "STUDENT"], cursor: "abc", empty: "" };
    expect(firstParam(params, "q")).toBe("tendai");
    expect(firstParam(params, "role")).toBe("ADMIN");
    expect(firstParam(params, "empty")).toBeUndefined();
    expect(enumParam(params, "status", ["ACTIVE", "SUSPENDED"] as const)).toBe("ACTIVE");
    expect(enumParam(params, "status", ["SUSPENDED"] as const)).toBeUndefined();
    expect(buildHref("/admin/users", { status: "ACTIVE", q: "a b", cursor: null })).toBe("/admin/users?q=a+b&status=ACTIVE");
    expect(hrefWith("/admin/users", params, { cursor: null })).toBe("/admin/users?q=tendai&role=ADMIN&status=ACTIVE");
  });
});
