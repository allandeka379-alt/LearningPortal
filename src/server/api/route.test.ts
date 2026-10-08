import { describe, expect, it } from "vitest";
import { isAppError } from "@/server/lib/errors";
import { idempotencyKeyOf, mergeIdempotencyKey, requestMetaOf } from "./route";

function codeOf(fn: () => unknown): string {
  try {
    fn();
  } catch (error) {
    return isAppError(error) ? error.code : "UNEXPECTED";
  }
  return "RESOLVED";
}

const request = (headers: Record<string, string> = {}) => new Request("http://localhost:3000/api/v1/x", { method: "POST", headers });

describe("Idempotency-Key", () => {
  it("is optional and trimmed", () => {
    expect(idempotencyKeyOf(request())).toBeUndefined();
    expect(idempotencyKeyOf(request({ "idempotency-key": "  review:2026-10-06.1  " }))).toBe("review:2026-10-06.1");
  });

  it("must match the pattern of the field it feeds", () => {
    expect(codeOf(() => idempotencyKeyOf(request({ "idempotency-key": "short" })))).toBe("VALIDATION");
    expect(codeOf(() => idempotencyKeyOf(request({ "idempotency-key": "has spaces in it" })))).toBe("VALIDATION");
    expect(codeOf(() => idempotencyKeyOf(request({ "idempotency-key": "with.dot.key" }), /^[A-Za-z0-9_-]{8,64}$/))).toBe("VALIDATION");
  });

  it("merges with the body field: either one, or both when equal", () => {
    expect(mergeIdempotencyKey(undefined, undefined, "k")).toBeUndefined();
    expect(mergeIdempotencyKey("body-key-1", undefined, "k")).toBe("body-key-1");
    expect(mergeIdempotencyKey(undefined, "head-key-1", "k")).toBe("head-key-1");
    expect(mergeIdempotencyKey("same-key-1", "same-key-1", "k")).toBe("same-key-1");
    expect(codeOf(() => mergeIdempotencyKey("body-key-1", "head-key-1", "k"))).toBe("VALIDATION");
  });
});

describe("requestMetaOf", () => {
  it("passes on ip, user agent and request id only", () => {
    expect(requestMetaOf({ ip: "10.0.0.1", userAgent: "UA", requestId: "r1" })).toEqual({ ip: "10.0.0.1", userAgent: "UA", requestId: "r1" });
  });
});
