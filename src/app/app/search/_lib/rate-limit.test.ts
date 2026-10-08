import { describe, expect, it } from "vitest";
import { RATE_LIMIT_PRESETS } from "@/server/lib/rate-limit";
import { searchRateLimit } from "./rate-limit";

describe("searchRateLimit", () => {
  it("counts signed-in students per account and anonymous callers per (hashed) IP, with the publicSearch preset", () => {
    const user = searchRateLimit("0f8fad5b-d9cb-469f-a165-70867728950e", "10.0.0.1");
    expect(user).toMatchObject({ ...RATE_LIMIT_PRESETS.publicSearch, preset: "publicSearch", key: "publicSearch:user:0f8fad5b-d9cb-469f-a165-70867728950e" });
    const anonymous = searchRateLimit(null, "10.0.0.1");
    expect(anonymous.preset).toBe("publicSearch");
    expect(anonymous.key.startsWith("publicSearch:")).toBe(true);
    expect(anonymous.key).not.toContain("10.0.0.1");
  });
});
