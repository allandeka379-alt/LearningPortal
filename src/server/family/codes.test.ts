import { describe, expect, it } from "vitest";
import {
  formatLinkCode,
  generateLinkCode,
  hashLinkCode,
  LINK_CODE_ALPHABET,
  LINK_CODE_LENGTH,
  LINK_CODE_TTL_HOURS,
  linkCodeExpiry,
  linkRequestExpiry,
  normalizeLinkCode,
} from "./codes";

describe("parent-link codes", () => {
  it("generates 8 characters from the look-alike-free alphabet", () => {
    for (let i = 0; i < 200; i += 1) {
      const code = generateLinkCode();
      expect(code).toHaveLength(LINK_CODE_LENGTH);
      expect([...code].every((char) => LINK_CODE_ALPHABET.includes(char))).toBe(true);
    }
    expect(LINK_CODE_ALPHABET).not.toMatch(/[01OIL]/);
  });

  it("uses the injected random source (deterministic)", () => {
    expect(generateLinkCode(() => 0)).toBe("AAAAAAAA");
    expect(generateLinkCode((max) => max - 1)).toBe("99999999");
  });

  it("formats for display and accepts what people type", () => {
    expect(formatLinkCode("ABCDEFGH")).toBe("ABCD-EFGH");
    expect(normalizeLinkCode("abcd-efgh")).toBe("ABCDEFGH");
    expect(normalizeLinkCode(" ab cd ef gh ")).toBe("ABCDEFGH");
    expect(normalizeLinkCode("ABCD–EFGH")).toBe("ABCDEFGH");
  });

  it("rejects anything that cannot be a code", () => {
    expect(normalizeLinkCode("ABCDEFG")).toBeNull(); // too short
    expect(normalizeLinkCode("ABCDEFGHJ")).toBeNull(); // too long
    expect(normalizeLinkCode("ABCDEFG0")).toBeNull(); // 0 is not in the alphabet
    expect(normalizeLinkCode("ABCD<EFG")).toBeNull();
    expect(normalizeLinkCode(12345678)).toBeNull();
    expect(normalizeLinkCode(undefined)).toBeNull();
    expect(normalizeLinkCode("A".repeat(40))).toBeNull();
  });

  it("stores only a keyed, hex HMAC of the code", () => {
    const hash = hashLinkCode("ABCDEFGH", "secret-one-for-tests-only-0123456789");
    expect(hash).toMatch(/^[0-9a-f]{64}$/);
    expect(hash).toBe(hashLinkCode("ABCDEFGH", "secret-one-for-tests-only-0123456789"));
    expect(hash).not.toBe(hashLinkCode("ABCDEFGH", "secret-two-for-tests-only-0123456789"));
    expect(hash).not.toContain("ABCDEFGH");
  });

  it("codes are short-lived; requests last two weeks", () => {
    const now = new Date("2026-10-05T10:00:00Z");
    expect(linkCodeExpiry(now).getTime() - now.getTime()).toBe(LINK_CODE_TTL_HOURS * 3_600_000);
    expect(linkRequestExpiry(now).toISOString()).toBe("2026-10-19T10:00:00.000Z");
  });
});
