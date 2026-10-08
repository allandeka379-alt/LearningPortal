import { describe, expect, it } from "vitest";
import { MAX_PASTE_ROWS, parseFlashcardPaste, splitTsv } from "./paste";

describe("splitTsv", () => {
  it("splits rows and cells, honouring quoted cells with tabs, newlines and doubled quotes", () => {
    expect(splitTsv('a\tb\r\n"multi\nline"\t"say ""hi"""\n"tab\there"\tc')).toEqual([
      ["a", "b"],
      ["multi\nline", 'say "hi"'],
      ["tab\there", "c"],
    ]);
  });
});

describe("parseFlashcardPaste", () => {
  it("parses front/back/notes rows, skips a header and blank rows", () => {
    const result = parseFlashcardPaste("Front\tBack\tNotes\n\nOsmosis\tWater movement\t\nSpeed\t$v = d/t$\tUnits m/s\n");
    expect(result.problems).toEqual([]);
    expect(result.cards).toEqual([
      { front: "Osmosis", back: "Water movement", notes: null, row: 3 },
      { front: "Speed", back: "$v = d/t$", notes: "Units m/s", row: 4 },
    ]);
  });

  it("reports rows with one column, empty sides or too many columns", () => {
    const result = parseFlashcardPaste("only one\n\tback only\nfront only\t\na\tb\tc\td\nok\tfine");
    expect(result.cards.map((c) => c.front)).toEqual(["ok"]);
    expect(result.problems.map((p) => p.row)).toEqual([1, 2, 3, 4]);
    expect(result.problems[0]?.message).toMatch(/one column/i);
  });

  it("caps the batch size", () => {
    const text = Array.from({ length: MAX_PASTE_ROWS + 3 }, (_, i) => `f${i}\tb${i}`).join("\n");
    const result = parseFlashcardPaste(text);
    expect(result.cards).toHaveLength(MAX_PASTE_ROWS);
    expect(result.problems).toHaveLength(1);
  });
});
