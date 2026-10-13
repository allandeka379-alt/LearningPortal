import { describe, expect, it } from "vitest";
import { getAdminReport, parseAdminReportRange, toCsv } from "./admin";

describe("admin reports", () => {
  it("parses safe report ranges and falls back for invalid or over-long ranges", () => {
    const now = new Date("2026-10-13T12:00:00Z");
    expect(parseAdminReportRange("2026-10-01", "2026-10-12", now)).toEqual({ from: "2026-10-01", to: "2026-10-12" });
    expect(parseAdminReportRange("bad", "2026-10-12", now)).toEqual({ from: "2026-09-13", to: "2026-10-12" });
    expect(parseAdminReportRange("2026-10-12", "2026-10-01", now)).toEqual({ from: "2026-09-13", to: "2026-10-12" });
    expect(parseAdminReportRange("2025-01-01", "2026-10-12", now)).toEqual({ from: "2026-09-13", to: "2026-10-12" });
  });

  it("exports CSV with escaping and spreadsheet-formula protection", () => {
    expect(toCsv(["name", "note"], [["Alice", "plain"], ["Bob, Jr", "said \"yes\""], ["Eve", "=HYPERLINK(\"https://example.test\")"]])).toBe(
      'name,note\r\nAlice,plain\r\n"Bob, Jr","said ""yes"""\r\nEve,"\'=HYPERLINK(""https://example.test"")"\r\n',
    );
  });

  it("keeps report ids explicit", () => {
    expect(getAdminReport("revenue")).toMatchObject({ title: "Payment and revenue report" });
    expect(() => getAdminReport("made-up")).toThrow("That report does not exist.");
  });
});
