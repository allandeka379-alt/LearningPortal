import { describe, expect, it } from "vitest";
import { decodeKeyset, encodeKeyset, keysetWhere } from "./cursor";
import { editorHref, reviewHref, revisionsHref, typeFromSegment, typeSegment } from "./labels";
import { FLASHCARD_PROVENANCE_REQUIREMENTS, LESSON_PROVENANCE_REQUIREMENTS, mergeIssues, provenanceIssues, warningIssues } from "./provenance";

describe("provenanceIssues", () => {
  const cleared = { sourceId: "s", author: "Team", copyrightStatus: "OWNED", licenceCode: "PROPRIETARY", publicationDate: "2026-10-01" };

  it("requires every lesson licensing field and accepts cleared provenance", () => {
    expect(provenanceIssues(cleared, LESSON_PROVENANCE_REQUIREMENTS)).toEqual({});
    const issues = provenanceIssues({ sourceId: null, author: " ", copyrightStatus: "UNVERIFIED", licenceCode: null, publicationDate: null }, LESSON_PROVENANCE_REQUIREMENTS);
    expect(Object.keys(issues).sort()).toEqual(["author", "copyrightStatus", "licenceCode", "publicationDate", "sourceId"]);
  });

  it("asks less of flashcards but always enforces the licence evidence rules", () => {
    expect(provenanceIssues({ ...cleared, licenceCode: null, publicationDate: null }, FLASHCARD_PROVENANCE_REQUIREMENTS)).toEqual({});
    expect(provenanceIssues({ ...cleared, copyrightStatus: "LICENSED", sourceId: null }, []).sourceId).toHaveLength(1);
    expect(provenanceIssues({ ...cleared, copyrightStatus: "OPEN_LICENSE", sourceId: null, licenceCode: null }, []).licenceCode).toHaveLength(1);
  });

  it("turns blocking renderer warnings into field errors and merges issues", () => {
    const errors = warningIssues({}, "body", [
      { code: "image-missing-alt", message: "Image without alt text", line: 3 },
      { code: "math-currency", message: "Money?", line: 4 },
    ]);
    expect(errors).toEqual({ body: ["Line 3: Image without alt text"] });
    expect(mergeIssues({ a: ["x"] }, { a: ["x", "y"], b: ["z"] })).toEqual({ a: ["x", "y"], b: ["z"] });
  });
});

describe("keyset cursors and links", () => {
  it("round-trips cursors and rejects tampered ones", () => {
    const at = new Date("2026-10-05T10:00:00.000Z");
    const id = "0199a000-0000-7000-8000-000000000001";
    expect(decodeKeyset(encodeKeyset(at, id))).toEqual({ at, id });
    expect(decodeKeyset(null)).toBeNull();
    expect(() => decodeKeyset("garbage")).toThrow(/no longer valid/);
    expect(keysetWhere("updatedAt", { at, id }, "asc")).toEqual({ OR: [{ updatedAt: { gt: at } }, { updatedAt: at, id: { gt: id } }] });
  });

  it("maps content types to URL segments and admin links", () => {
    expect(typeSegment("STUDY_PLAN_TEMPLATE")).toBe("study-plan-template");
    expect(typeFromSegment("study-plan-template")).toBe("STUDY_PLAN_TEMPLATE");
    expect(typeFromSegment("syllabus")).toBeNull();
    expect(reviewHref("LESSON", "x")).toBe("/admin/review/lesson/x");
    expect(revisionsHref("FLASHCARD", "x", 2)).toBe("/admin/review/flashcard/x/revisions/2");
    expect(editorHref("QUESTION", "x")).toBe("/admin/questions/x");
  });
});
