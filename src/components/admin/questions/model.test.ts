import { describe, expect, it } from "vitest";
import { QUESTION_TYPES, safeParseAnswerSpec, safeParseQuestionPayload } from "@/lib/questions";
import {
  compact,
  errorsUnder,
  linesToList,
  newDocument,
  newPart,
  nextId,
  nextPartLabel,
  parseNumber,
  parseWhole,
  partsTotal,
  syncBlanks,
  templateBlankIds,
  templateFor,
  withType,
} from "./model";

describe("question editor model", () => {
  it("templates produce payloads that parse for every type (answer specs may still need filling in)", () => {
    for (const type of QUESTION_TYPES) {
      const template = templateFor(type);
      if (type === "DIAGRAM_LABELLING") continue; // needs an image chosen by the editor
      const parsed = safeParseQuestionPayload(type, template.payload);
      // Text placeholders are left blank for the editor to write; nothing else may be wrong.
      const problems = parsed.success ? [] : parsed.error.issues.filter((issue) => issue.message !== "Must not be blank.");
      expect(problems, type).toEqual([]);
    }
    expect(safeParseAnswerSpec("TRUE_FALSE", templateFor("TRUE_FALSE").answerSpec).success).toBe(true);
    expect(safeParseAnswerSpec("MATCHING", templateFor("MATCHING").answerSpec).success).toBe(true);
    expect(templateFor("STRUCTURED").parts?.map((p) => p.partLabel)).toEqual(["(a)", "(b)"]);
  });

  it("builds a new document with honest defaults", () => {
    const doc = newDocument("ESSAY", "subject-1");
    expect(doc).toMatchObject({ subjectId: "subject-1", type: "ESSAY", markingMode: "AI_ASSISTED", copyrightStatus: "OWNED", accessTier: "PREMIUM", topics: [] });
  });

  it("changes type by restarting the answer from the new template", () => {
    const part = newPart("(a)", "SHORT_ANSWER");
    const changed = withType(part, "MULTIPLE_CHOICE", 1);
    expect(changed.options).toHaveLength(4);
    expect(changed.answerSpec).toEqual({ scoring: "all_or_nothing" });
    // Sub-parts cannot become structured.
    expect(withType(part, "STRUCTURED", 2).type).toBe("SHORT_ANSWER");
    expect(withType(part, "STRUCTURED", 1).parts?.map((p) => p.partLabel)).toEqual(["(i)", "(ii)"]);
  });

  it("labels parts and ids without collisions", () => {
    expect(nextPartLabel(["(a)", "(b)"], 1)).toBe("(c)");
    expect(nextPartLabel(["(i)"], 2)).toBe("(ii)");
    expect(nextId("h", ["h1", "h3"])).toBe("h2");
    expect(partsTotal([{ marks: 2, type: "SHORT_ANSWER" }, { marks: 99, type: "STRUCTURED", parts: [{ marks: 1 }, { marks: 3 }] }])).toBe(6);
  });

  it("keeps blanks in step with the template", () => {
    expect(templateBlankIds("A {{blank:b2}} and {{blank:b1}} then {{blank:b2}}")).toEqual(["b2", "b1"]);
    const synced = syncBlanks("x {{blank:b1}} y {{blank:b3}}", [{ id: "b1", input: "number" }, { id: "b2", input: "text" }], [{ id: "b1", accepted: ["4"] }]);
    expect(synced.payload).toEqual([{ id: "b1", input: "number" }, { id: "b3", input: "text" }]);
    expect(synced.spec).toEqual([{ id: "b1", accepted: ["4"] }, { id: "b3", accepted: [""] }]);
  });

  it("cleans optional values for the strict schemas", () => {
    expect(compact({ a: 1, b: undefined, c: null, d: "", e: [], f: false, g: [1] })).toEqual({ a: 1, f: false, g: [1] });
    expect(parseNumber(" 1.5 ")).toBe(1.5);
    expect(parseNumber("x")).toBeUndefined();
    expect(parseWhole("2.5")).toBeUndefined();
    expect(linesToList("a\n\n b \r\nc")).toEqual(["a", "b", "c"]);
    expect(errorsUnder({ "options.0.content": ["Write it."], "options.1.key": ["Bad"] }, "options.0", false)).toEqual(["Write it."]);
  });
});
