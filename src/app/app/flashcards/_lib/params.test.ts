import { describe, expect, it } from "vitest";
import { parseDeckParams, uuidParam } from "./params";

const ID = "0199A1B2-0000-7000-8000-AAAAAAAAAAAA";

describe("flashcard deep-link parameters", () => {
  it("keeps well-formed ids (lower-cased) and drops everything else", () => {
    expect(parseDeckParams({ subjectId: ID, topicId: "nope", cardId: [ID, "x"], other: "1" })).toEqual({
      subjectId: ID.toLowerCase(),
      cardId: ID.toLowerCase(),
    });
    expect(parseDeckParams({})).toEqual({});
    expect(uuidParam({ cursor: ` ${ID} ` }, "cursor")).toBe(ID.toLowerCase());
    expect(uuidParam({ cursor: "'; drop table" }, "cursor")).toBeUndefined();
  });
});
