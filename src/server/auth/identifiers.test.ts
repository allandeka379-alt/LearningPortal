import { describe, expect, it } from "vitest";
import {
  canonicalEmailMailbox,
  maskIdentifier,
  normalizeEmail,
  normalizeLoginUsername,
  normalizePhone,
  parseContactIdentifier,
  parseLoginIdentifier,
} from "./identifiers";

describe("normalizeEmail", () => {
  it("trims and lower-cases valid addresses", () => {
    expect(normalizeEmail("  Tendai.Moyo@Example.COM ")).toBe("tendai.moyo@example.com");
  });

  it("keeps provider-specific tricks (dots, +tags)", () => {
    expect(normalizeEmail("a.b+zimsec@gmail.com")).toBe("a.b+zimsec@gmail.com");
  });

  it("rejects invalid or over-long addresses", () => {
    expect(normalizeEmail("not-an-email")).toBeNull();
    expect(normalizeEmail("a@")).toBeNull();
    expect(normalizeEmail("")).toBeNull();
    expect(normalizeEmail(`${"a".repeat(250)}@x.co`)).toBeNull();
  });
});

describe("canonicalEmailMailbox (abuse checks only, PAY-4)", () => {
  it("maps sub-addressed and Gmail dot variants of one inbox to the same mailbox", () => {
    const mailbox = canonicalEmailMailbox("Tendai.Moyo@gmail.com");
    expect(mailbox).toBe("tendaimoyo@gmail.com");
    for (const variant of ["tendaimoyo+1@gmail.com", "t.e.n.d.a.i.moyo+zimsec@GMAIL.com", "tendai.moyo@googlemail.com"]) {
      expect(canonicalEmailMailbox(variant)).toBe(mailbox);
    }
    expect(canonicalEmailMailbox("rufaro+school@example.co.zw")).toBe("rufaro@example.co.zw");
  });

  it("keeps dots outside Gmail, distinct mailboxes distinct, and rejects invalid input", () => {
    expect(canonicalEmailMailbox("a.b@example.com")).toBe("a.b@example.com");
    expect(canonicalEmailMailbox("ab@example.com")).not.toBe(canonicalEmailMailbox("a.b@example.com"));
    expect(canonicalEmailMailbox("not-an-email")).toBeNull();
  });
});

describe("normalizePhone", () => {
  it.each([
    ["+263771234567", "+263771234567"],
    ["+263 77 123 4567", "+263771234567"],
    ["0771234567", "+263771234567"],
    ["077 123 4567", "+263771234567"],
    ["(077) 123-4567", "+263771234567"],
    ["263771234567", "+263771234567"],
    ["00263771234567", "+263771234567"],
    ["771234567", "+263771234567"],
    ["+27821234567", "+27821234567"],
    ["+44 7700 900123", "+447700900123"],
  ])("normalises %s to %s", (input, expected) => {
    expect(normalizePhone(input)).toBe(expected);
  });

  it.each(["", "12345", "+0771234567", "07712345678901234", "phone", "+26377123456", "+2637712345678", "077-abc-4567"])(
    "rejects %s",
    (input) => {
      expect(normalizePhone(input)).toBeNull();
    },
  );
});

describe("normalizeLoginUsername", () => {
  it("accepts the school username format, lower-cased", () => {
    expect(normalizeLoginUsername("HHS.TMoyo27")).toBe("hhs.tmoyo27");
  });

  it("rejects too short or badly formed usernames", () => {
    expect(normalizeLoginUsername("ab")).toBeNull();
    expect(normalizeLoginUsername(".abc")).toBeNull();
    expect(normalizeLoginUsername("has space")).toBeNull();
  });
});

describe("parseLoginIdentifier / parseContactIdentifier", () => {
  it("classifies email, phone and username", () => {
    expect(parseLoginIdentifier("Rudo@Example.com")).toEqual({ kind: "email", value: "rudo@example.com" });
    expect(parseLoginIdentifier("0782 000 111")).toEqual({ kind: "phone", value: "+263782000111" });
    expect(parseLoginIdentifier("hhs.rudo")).toEqual({ kind: "username", value: "hhs.rudo" });
  });

  it("returns null for invalid values of the detected kind", () => {
    expect(parseLoginIdentifier("rudo@")).toBeNull();
    expect(parseLoginIdentifier("12")).toBeNull();
    expect(parseLoginIdentifier("   ")).toBeNull();
  });

  it("contact identifiers exclude usernames (they cannot receive codes)", () => {
    expect(parseContactIdentifier("hhs.rudo")).toBeNull();
    expect(parseContactIdentifier("0771234567")).toEqual({ kind: "phone", value: "+263771234567" });
  });
});

describe("maskIdentifier", () => {
  it("masks emails and phones for display", () => {
    expect(maskIdentifier("tendai@example.com")).toBe("te***@example.com");
    expect(maskIdentifier("t@example.com")).toBe("t***@example.com");
    expect(maskIdentifier("+263771234567")).toBe("+26377***67");
    expect(maskIdentifier("short")).toBe("***");
  });
});
