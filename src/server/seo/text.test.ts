import { describe, expect, it } from "vitest";
import {
  boardTitle,
  formatCalendarDate,
  formatDateRange,
  joinNames,
  META_DESCRIPTION_MAX,
  metaDescription,
  qualificationLabel,
  qualificationTitle,
  subjectTitle,
  topicTitle,
  truncateText,
  withBrand,
} from "./text";

describe("titles", () => {
  it("labels qualifications with the board name once", () => {
    expect(qualificationLabel("ZIMSEC", "O-Level")).toBe("ZIMSEC O-Level");
    expect(qualificationLabel("Cambridge", "IGCSE")).toBe("Cambridge IGCSE");
    expect(qualificationLabel("Cambridge", "Cambridge IGCSE")).toBe("Cambridge IGCSE");
  });

  it("builds the subject title pattern of §44", () => {
    const title = subjectTitle("ZIMSEC O-Level", { name: "Mathematics", metaTitle: null });
    expect(title).toBe("ZIMSEC O-Level Mathematics — topics, lessons and practice");
    expect(withBrand(title, "BvunzoHub")).toBe("ZIMSEC O-Level Mathematics — topics, lessons and practice · BvunzoHub");
  });

  it("prefers an editor's meta title and never doubles the brand", () => {
    expect(subjectTitle("ZIMSEC O-Level", { name: "Mathematics", metaTitle: "  O-Level Maths revision  " })).toBe("O-Level Maths revision");
    expect(withBrand("Maths revision on BvunzoHub", "BvunzoHub")).toBe("Maths revision on BvunzoHub");
  });

  it("builds board, qualification and topic titles", () => {
    expect(boardTitle({ shortName: "ZIMSEC", metaTitle: null })).toBe("ZIMSEC qualifications, subjects and practice");
    expect(qualificationTitle("Cambridge IGCSE", { metaTitle: null })).toBe("Cambridge IGCSE subjects — syllabus topics and practice");
    expect(topicTitle("ZIMSEC O-Level", "Mathematics", { name: "Quadratic equations", metaTitle: null })).toBe(
      "Quadratic equations — ZIMSEC O-Level Mathematics",
    );
  });
});

describe("descriptions", () => {
  it("takes the first non-blank candidate and clamps it at a word boundary", () => {
    expect(metaDescription(null, "  ", "Second  choice.")).toBe("Second choice.");
    const long = "word ".repeat(80);
    const out = metaDescription(long);
    expect(out.length).toBeLessThanOrEqual(META_DESCRIPTION_MAX);
    expect(out.endsWith("…")).toBe(true);
    expect(out).not.toMatch(/\s…$/);
  });

  it("truncates without cutting when the text fits", () => {
    expect(truncateText("Short text", 20)).toBe("Short text");
    expect(truncateText("Alpha beta gamma delta", 12)).toBe("Alpha beta…");
  });

  it("joins names naturally", () => {
    expect(joinNames([])).toBe("");
    expect(joinNames(["O-Level"])).toBe("O-Level");
    expect(joinNames(["O-Level", "A-Level", "IGCSE"])).toBe("O-Level, A-Level and IGCSE");
  });
});

describe("exam session dates", () => {
  it("formats calendar ranges without time-zone shifts", () => {
    expect(formatDateRange("2027-11-03", "2027-11-03")).toBe("3 Nov 2027");
    expect(formatDateRange("2027-10-20", "2027-11-30")).toBe("20 Oct – 30 Nov 2027");
    expect(formatDateRange("2027-11-30", "2028-01-12")).toBe("30 Nov 2027 – 12 Jan 2028");
    expect(formatCalendarDate("2026-01-01")).toBe("1 Jan 2026");
  });

  it("falls back to the raw value for malformed dates", () => {
    expect(formatDateRange("not-a-date", "2027-01-01")).toBe("not-a-date");
  });
});
