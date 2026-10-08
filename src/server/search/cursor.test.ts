import { randomUUID } from "node:crypto";
import { describe, expect, it } from "vitest";
import { decodeCursor, encodeCursor, queryFingerprint } from "./cursor";

describe("search cursor", () => {
  it("round-trips", () => {
    const cursor = { score: "1.104512", id: randomUUID(), mode: "relaxed" as const, fingerprint: "0123456789abcdef" };
    expect(decodeCursor(encodeCursor(cursor))).toEqual(cursor);
    expect(decodeCursor(encodeCursor({ ...cursor, score: "-0.020000", mode: "detected" }))).toMatchObject({
      score: "-0.020000",
      mode: "detected",
    });
  });

  it("rejects malformed or tampered cursors without throwing", () => {
    expect(decodeCursor("")).toBeNull();
    expect(decodeCursor("not a cursor!")).toBeNull();
    expect(decodeCursor(Buffer.from("{}").toString("base64url"))).toBeNull();
    const forged = Buffer.from(
      JSON.stringify({ v: 1, s: "1; DROP TABLE x", i: randomUUID(), m: "d", f: "0123456789abcdef" }),
    ).toString("base64url");
    expect(decodeCursor(forged)).toBeNull();
  });

  it("refuses to encode a non-numeric score", () => {
    expect(() => encodeCursor({ score: "NaN", id: randomUUID(), mode: "detected", fingerprint: "0123456789abcdef" })).toThrow(
      RangeError,
    );
  });
});

describe("queryFingerprint", () => {
  it("ignores key order and undefined values, and differs for different queries", () => {
    const a = queryFingerprint({ q: "moles", filters: { subjectId: "s", types: ["LESSON"] }, x: undefined });
    const b = queryFingerprint({ filters: { types: ["LESSON"], subjectId: "s" }, q: "moles" });
    expect(a).toBe(b);
    expect(a).toMatch(/^[0-9a-f]{16}$/);
    expect(queryFingerprint({ q: "mole" })).not.toBe(queryFingerprint({ q: "moles" }));
  });
});
