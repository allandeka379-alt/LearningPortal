import { describe, expect, it } from "vitest";
import { parseSearchPageParams } from "./params";

const ID = "0f8fad5b-d9cb-469f-a165-70867728950e";

describe("parseSearchPageParams", () => {
  it("reads a full URL state", () => {
    expect(parseSearchPageParams({ q: "  o level   maths ", type: "lessons", subjectId: ID, detect: "0", cursor: "abc_DEF-1" })).toEqual({
      q: "o level maths",
      type: "lessons",
      subjectId: ID,
      detect: false,
      cursor: "abc_DEF-1",
    });
  });

  it("drops anything malformed instead of failing", () => {
    expect(parseSearchPageParams({ q: ["first", "second"], type: "everything", subjectId: "not-a-uuid", detect: "1", cursor: "x".repeat(600) })).toEqual({
      q: "first",
      type: "all",
      subjectId: null,
      detect: true,
      cursor: null,
    });
    expect(parseSearchPageParams({}).q).toBe("");
    expect(parseSearchPageParams({ q: "y".repeat(500) }).q).toHaveLength(200);
  });
});
