import { describe, expect, it } from "vitest";
import { z } from "zod";
import { sealAuthFlow, unsealAuthFlow } from "./flow-cookie";
import { seal, unseal } from "./sealed";

const SECRET = "unit-test-secret-0123456789abcdef";
const schema = z.object({ target: z.string(), n: z.number() });

describe("sealed values", () => {
  it("round-trips a payload and hides its contents", () => {
    const value = seal("auth-flow", { target: "rudo@example.test", n: 7 }, 60_000, { secret: SECRET });
    expect(value).not.toContain("rudo");
    expect(Buffer.from(value, "base64url").toString("utf8")).not.toContain("rudo");
    expect(unseal("auth-flow", value, schema, { secret: SECRET })).toEqual({ target: "rudo@example.test", n: 7 });
  });

  it("refuses expired, tampered, foreign-purpose, wrong-key and malformed values", () => {
    const now = new Date("2026-10-05T08:00:00Z");
    const value = seal("auth-flow", { target: "x", n: 1 }, 60_000, { secret: SECRET, now });
    expect(unseal("auth-flow", value, schema, { secret: SECRET, now: new Date(now.getTime() + 60_001) })).toBeNull();
    const tampered = `${value.slice(0, -2)}${value.endsWith("AA") ? "BB" : "AA"}`;
    expect(unseal("auth-flow", tampered, schema, { secret: SECRET, now })).toBeNull();
    expect(unseal("oauth", value, schema, { secret: SECRET, now })).toBeNull();
    expect(unseal("auth-flow", value, schema, { secret: `${SECRET}x`, now })).toBeNull();
    expect(unseal("auth-flow", "not base64 !", schema, { secret: SECRET, now })).toBeNull();
    expect(unseal("auth-flow", "", schema, { secret: SECRET, now })).toBeNull();
    expect(unseal("auth-flow", value, z.object({ other: z.string() }), { secret: SECRET, now })).toBeNull();
  });

  it("seals the pending auth flow with the app secret", () => {
    const flow = { purpose: "LOGIN_OTP" as const, channel: "SMS" as const, target: "+263771234567", next: "/app", sentAt: 1 };
    const opened = unsealAuthFlow(sealAuthFlow(flow));
    expect(opened).toEqual(flow);
    expect(unsealAuthFlow("garbage")).toBeNull();
  });
});
