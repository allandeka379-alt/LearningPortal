import { describe, expect, it } from "vitest";
import { NO_ENTITLEMENTS } from "@/lib/billing/entitlements";
import { currencyDigits, parsePackEntitlements, pdfBlockReason, toMinorUnits, unlocksAnything } from "./core";

describe("parsePackEntitlements", () => {
  it("validates with the plan entitlement schema, defaulting missing keys to not included", () => {
    const parsed = parsePackEntitlements({ mockExams: true, aiTutor: true, aiMessagesPerDay: 30 });
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;
    expect(parsed.value).toMatchObject({ mockExams: true, aiTutor: true, aiMessagesPerDay: 30, flashcards: false, lessonAccess: "FREE_ONLY" });
    expect(unlocksAnything(parsed.value)).toBe(true);
    expect(unlocksAnything({ ...NO_ENTITLEMENTS })).toBe(false);
  });

  it("refuses unknown keys and invalid values", () => {
    expect(parsePackEntitlements({ mockExam: true })).toEqual({ ok: false, errors: { entitlements: ["Unknown entitlement: mockExam."] } });
    const invalid = parsePackEntitlements({ aiMessagesPerDay: -1 });
    expect(invalid.ok).toBe(false);
    if (!invalid.ok) expect(Object.keys(invalid.errors)).toEqual(["entitlements.aiMessagesPerDay"]);
    expect(parsePackEntitlements(null).ok).toBe(false);
  });
});

describe("pdfBlockReason", () => {
  const today = new Date("2026-10-05T00:00:00Z");
  const source = { permitsPdfExport: true, isActive: true, validUntil: null };

  it("allows the platform's own and public-domain items without a source", () => {
    expect(pdfBlockReason({ copyrightStatus: "OWNED", source: null }, today)).toBeNull();
    expect(pdfBlockReason({ copyrightStatus: "PUBLIC_DOMAIN", source: null }, today)).toBeNull();
  });

  it("requires a permitting, active, in-date source for licensed items", () => {
    expect(pdfBlockReason({ copyrightStatus: "LICENSED", source }, today)).toBeNull();
    expect(pdfBlockReason({ copyrightStatus: "LICENSED", source: null }, today)).toBe("licence_without_source");
    expect(pdfBlockReason({ copyrightStatus: "OPEN_LICENSE", source: null }, today)).toBe("licence_without_source");
    expect(pdfBlockReason({ copyrightStatus: "OWNED", source: { ...source, permitsPdfExport: false } }, today)).toBe("source_forbids_pdf");
    expect(pdfBlockReason({ copyrightStatus: "LICENSED", source: { ...source, isActive: false } }, today)).toBe("source_inactive");
    expect(pdfBlockReason({ copyrightStatus: "LICENSED", source: { ...source, validUntil: new Date("2026-10-04T00:00:00Z") } }, today)).toBe("source_expired");
    expect(pdfBlockReason({ copyrightStatus: "LICENSED", source: { ...source, validUntil: today } }, today)).toBeNull();
  });

  it("never allows unverified copyright", () => {
    expect(pdfBlockReason({ copyrightStatus: "UNVERIFIED", source }, today)).toBe("copyright_unverified");
  });
});

describe("prices", () => {
  it("converts decimal amounts to minor units with the currency's precision", () => {
    expect(currencyDigits("USD")).toBe(2);
    expect(currencyDigits("JPY")).toBe(0);
    expect(toMinorUnits("12.5", "USD")).toBe(1250);
    expect(toMinorUnits("12.50", "USD")).toBe(1250);
    expect(toMinorUnits("0", "USD")).toBe(0);
    expect(toMinorUnits("12.505", "USD")).toBeNull();
    expect(toMinorUnits("500", "JPY")).toBe(500);
    expect(toMinorUnits("5.5", "JPY")).toBeNull();
    expect(toMinorUnits("abc", "USD")).toBeNull();
    expect(toMinorUnits("99999999999", "USD")).toBeNull();
  });
});
