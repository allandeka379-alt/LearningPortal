import { describe, expect, it, vi } from "vitest";

const TEST_SECRET = "unit-test-session-secret-0123456789abcdef";

vi.mock("./env", () => ({ getEnv: () => ({ SESSION_SECRET: TEST_SECRET }) }));

const { generateNumericCode, hashIp, hmacSha256, randomToken, sha256Hex, timingSafeEqualStr } = await import("./crypto");

describe("randomToken", () => {
  it("returns base64url of the requested entropy", () => {
    const token = randomToken();
    expect(token).toMatch(/^[A-Za-z0-9_-]+$/);
    expect(Buffer.from(token, "base64url")).toHaveLength(32);
    expect(Buffer.from(randomToken(16), "base64url")).toHaveLength(16);
  });

  it("does not repeat", () => {
    const tokens = new Set(Array.from({ length: 1000 }, () => randomToken()));
    expect(tokens.size).toBe(1000);
  });

  it.each([0, -1, 1.5, 2048, Number.NaN])("rejects bytes=%s", (bytes) => {
    expect(() => randomToken(bytes)).toThrow(RangeError);
  });
});

describe("sha256Hex", () => {
  it("matches the FIPS 180-2 test vector", () => {
    expect(sha256Hex("abc")).toBe("ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad");
    expect(sha256Hex(new TextEncoder().encode("abc"))).toBe(sha256Hex("abc"));
  });
});

describe("hmacSha256", () => {
  it("matches the RFC 4231 test vector with an explicit key", () => {
    expect(hmacSha256("what do ya want for nothing?", "Jefe")).toBe(
      "5bdcc146bf60754e6a042426089575c75a003f089d2739839dec58b964ec3843",
    );
  });

  it("defaults the key to SESSION_SECRET", () => {
    expect(hmacSha256("otp:login:+263771234567:123456")).toBe(
      hmacSha256("otp:login:+263771234567:123456", TEST_SECRET),
    );
    expect(hmacSha256("a")).not.toBe(hmacSha256("a", "another-key"));
  });
});

describe("timingSafeEqualStr", () => {
  it("compares strings of any length without throwing", () => {
    expect(timingSafeEqualStr("123456", "123456")).toBe(true);
    expect(timingSafeEqualStr("123456", "123457")).toBe(false);
    expect(timingSafeEqualStr("short", "a much longer string")).toBe(false);
    expect(timingSafeEqualStr("", "")).toBe(true);
    expect(timingSafeEqualStr("", "x")).toBe(false);
    expect(timingSafeEqualStr("Mhoro 👋", "Mhoro 👋")).toBe(true);
  });
});

describe("generateNumericCode", () => {
  it("returns fixed-length digit strings, keeping leading zeros", () => {
    for (let i = 0; i < 200; i += 1) expect(generateNumericCode()).toMatch(/^\d{6}$/);
    expect(generateNumericCode(1)).toMatch(/^\d$/);
    expect(generateNumericCode(12)).toMatch(/^\d{12}$/);
  });

  it("produces roughly uniform digits", () => {
    const counts = new Array<number>(10).fill(0);
    const sample = Array.from({ length: 4000 }, () => generateNumericCode(10)).join("");
    for (const digit of sample) counts[Number(digit)] = (counts[Number(digit)] ?? 0) + 1;
    // 40,000 digits, expected 4,000 each; ±10% is > 6 standard deviations, so this never flakes.
    for (const count of counts) {
      expect(count).toBeGreaterThan(3600);
      expect(count).toBeLessThan(4400);
    }
  });

  it.each([0, 33, 2.5])("rejects length=%s", (length) => {
    expect(() => generateNumericCode(length)).toThrow(RangeError);
  });
});

describe("hashIp", () => {
  it("is deterministic, keyed and not the raw address", () => {
    const hash = hashIp("196.27.10.5");
    expect(hash).toMatch(/^[0-9a-f]{64}$/);
    expect(hash).toBe(hashIp("196.27.10.5"));
    expect(hash).not.toContain("196");
    expect(hash).not.toBe(sha256Hex("196.27.10.5"));
    expect(hash).not.toBe(hashIp("196.27.10.5", "other-key"));
  });

  it("normalises case, whitespace and IPv4-mapped IPv6", () => {
    expect(hashIp(" ::FFFF:196.27.10.5 ")).toBe(hashIp("196.27.10.5"));
    expect(hashIp("2001:DB8::1")).toBe(hashIp("2001:db8::1"));
    expect(hashIp("196.27.10.5")).not.toBe(hashIp("196.27.10.6"));
  });

  it("is domain-separated from plain HMACs of the same value", () => {
    expect(hashIp("196.27.10.5")).not.toBe(hmacSha256("196.27.10.5"));
  });
});
