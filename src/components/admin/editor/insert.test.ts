import { describe, expect, it } from "vitest";
import { insertContentBlock, insertDisplayMath, insertHeading, insertList, insertParagraph, insertTable, offsetOfLine, wrapSelection } from "./insert";

describe("insertContentBlock", () => {
  it("wraps the selection in a block on its own lines", () => {
    const value = "Intro.\nPhotosynthesis makes glucose.\nOutro.";
    const start = value.indexOf("Photosynthesis");
    const end = start + "Photosynthesis makes glucose.".length;
    const edit = insertContentBlock(value, start, end, "definition");
    expect(edit.value).toBe('Intro.\n\n:::definition{term="Term"}\nPhotosynthesis makes glucose.\n:::\n\nOutro.');
  });

  it("inserts a placeholder body and selects it when nothing is selected", () => {
    const edit = insertContentBlock("", 0, 0, "exam-tip");
    expect(edit.value).toBe(":::exam-tip\nExam technique advice.\n:::\n");
    expect(edit.value.slice(edit.selectionStart, edit.selectionEnd)).toBe("Exam technique advice.");
  });
});

describe("inline helpers", () => {
  it("wraps selections and selects placeholders", () => {
    expect(wrapSelection("a b c", 2, 3, "**", "**", "bold")).toMatchObject({ value: "a **b** c" });
    const empty = wrapSelection("x", 1, 1, "$", "$", "x^2");
    expect(empty.value).toBe("x$x^2$");
    expect(empty.value.slice(empty.selectionStart, empty.selectionEnd)).toBe("x^2");
  });

  it("inserts display maths, tables, headings, lists and paragraphs as blocks", () => {
    const math = insertDisplayMath("Text", 4, 4);
    expect(math.value.startsWith("Text\n\n$$\n")).toBe(true);
    expect(math.value.endsWith("\n$$\n")).toBe(true);
    expect(insertTable("", 0, 0).value).toContain("| Quantity | Symbol | Unit |");
    expect(insertHeading("Para\n", 5, 5, 2).value).toBe("Para\n\n## Section title\n");
    expect(insertList("one\ntwo", 0, 7, true).value).toBe("1. one\n2. two\n");
    expect(insertParagraph("A\n\nB", 3, 3, "![x](asset:1)").value).toBe("A\n\n![x](asset:1)\n\nB");
  });
});

describe("offsetOfLine", () => {
  it("finds the start of a 1-based line", () => {
    const text = "a\nbc\ndef";
    expect(offsetOfLine(text, 1)).toBe(0);
    expect(offsetOfLine(text, 3)).toBe(5);
    expect(offsetOfLine(text, 9)).toBe(text.length);
  });
});
