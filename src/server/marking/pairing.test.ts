import { describe, expect, it } from "vitest";
import { markResponse } from "./mark";

// ------------------------------------------------------------------------------------------------------------------
// FILL_IN_THE_BLANK
// ------------------------------------------------------------------------------------------------------------------

const blanksPayload = {
  template: "The capital is {{blank:b1}}; water boils at {{blank:b2}} °C; the gas is {{blank:b3}}.",
  blanks: [
    { id: "b1", input: "text" },
    { id: "b2", input: "number" },
    { id: "b3", input: "select", choices: ["Oxygen", "Nitrogen", "Argon"] },
  ],
};
const blanksSpec = {
  blanks: [
    { id: "b1", accepted: ["Harare", "Salisbury"] },
    { id: "b2", accepted: ["100"], tolerance: 0.5 },
    { id: "b3", accepted: ["Oxygen"] },
  ],
};

function blanks(entries: { blankId: string; text: string }[] | null, marks = 3, spec: unknown = blanksSpec, payload: unknown = blanksPayload) {
  return markResponse({
    type: "FILL_IN_THE_BLANK",
    marks,
    payload,
    answerSpec: spec,
    response: entries === null ? null : { type: "FILL_IN_THE_BLANK", blanks: entries },
  });
}

describe("fill in the blank", () => {
  it("marks every blank", () => {
    const r = blanks([
      { blankId: "b1", text: "harare" },
      { blankId: "b2", text: "100.4" },
      { blankId: "b3", text: "Oxygen" },
    ]);
    expect(r).toMatchObject({ status: "MARKED", marksAwarded: 3, isCorrect: true });
    expect(r.feedback.correctAnswerDisplay).toBe("(1) Harare (2) 100 (3) Oxygen");
  });

  it("awards per-blank credit", () => {
    const r = blanks([
      { blankId: "b1", text: "Bulawayo" },
      { blankId: "b2", text: "99.6" },
      { blankId: "b3", text: "Argon" },
    ]);
    expect(r).toMatchObject({ marksAwarded: 1, isCorrect: null });
    expect(r.feedback.items?.map((i) => i.correct)).toEqual([false, true, false]);
    expect(r.feedback.flags).toContain("PARTIAL_ANSWER");
  });

  it("accepts alternatives and numeric forms", () => {
    expect(blanks([{ blankId: "b1", text: "SALISBURY" }]).marksAwarded).toBe(1);
    expect(blanks([{ blankId: "b2", text: "1.0e2" }]).marksAwarded).toBe(1);
    expect(blanks([{ blankId: "b2", text: "101" }]).marksAwarded).toBe(0);
  });

  it("matches select blanks exactly (case-insensitive by default)", () => {
    expect(blanks([{ blankId: "b3", text: "oxygen" }]).marksAwarded).toBe(1);
    expect(blanks([{ blankId: "b3", text: "Oxygen gas" }]).marksAwarded).toBe(0);
  });

  it("floors equal shares to whole marks", () => {
    expect(blanks([{ blankId: "b1", text: "Harare" }, { blankId: "b2", text: "100" }], 2).marksAwarded).toBe(1);
  });

  it("honours explicit per-blank marks", () => {
    const weighted = { blanks: blanksSpec.blanks.map((b, i) => ({ ...b, marks: i + 1 })) };
    expect(blanks([{ blankId: "b3", text: "Oxygen" }], 6, weighted).marksAwarded).toBe(3);
  });

  it("marks the first of duplicate entries and ignores unknown blanks", () => {
    const r = blanks([
      { blankId: "b1", text: "Mutare" },
      { blankId: "b1", text: "Harare" },
      { blankId: "zz", text: "Harare" },
    ]);
    expect(r.marksAwarded).toBe(0);
    expect(r.feedback.flags).toEqual(expect.arrayContaining(["DUPLICATE_ENTRY", "UNKNOWN_TARGET"]));
  });

  it("treats all-empty blanks as unanswered", () => {
    expect(blanks([{ blankId: "b1", text: "  " }])).toMatchObject({ status: "UNANSWERED" });
    expect(blanks([])).toMatchObject({ status: "UNANSWERED" });
    expect(blanks(null)).toMatchObject({ status: "UNANSWERED" });
  });

  it("refuses a spec whose blanks do not match the payload", () => {
    const r = blanks([{ blankId: "b1", text: "Harare" }], 3, { blanks: [{ id: "b1", accepted: ["Harare"] }] });
    expect(r).toMatchObject({ status: "NEEDS_REVIEW" });
    expect(r.feedback.flags).toContain("SPEC_INVALID");
  });

  it("refuses a template that references undeclared blanks", () => {
    const payload = { ...blanksPayload, template: `${blanksPayload.template} {{blank:b9}}` };
    expect(blanks([{ blankId: "b1", text: "Harare" }], 3, blanksSpec, payload).feedback.flags).toContain("SPEC_INVALID");
  });
});

// ------------------------------------------------------------------------------------------------------------------
// MATCHING
// ------------------------------------------------------------------------------------------------------------------

const matchingPayload = {
  left: [
    { id: "l1", content: "Mitochondrion" },
    { id: "l2", content: "Ribosome" },
    { id: "l3", content: "Nucleus" },
  ],
  right: [
    { id: "r1", content: "Respiration" },
    { id: "r2", content: "Protein synthesis" },
    { id: "r3", content: "Genetic material" },
    { id: "r4", content: "Photosynthesis" },
  ],
};
const matchingSpec = {
  pairs: [
    { leftId: "l1", rightId: "r1" },
    { leftId: "l2", rightId: "r2" },
    { leftId: "l3", rightId: "r3" },
  ],
};

function match(pairs: [string, string][] | null, marks = 3, spec: unknown = matchingSpec) {
  return markResponse({
    type: "MATCHING",
    marks,
    payload: matchingPayload,
    answerSpec: spec,
    response: pairs === null ? null : { type: "MATCHING", pairs: pairs.map(([leftId, rightId]) => ({ leftId, rightId })) },
  });
}

describe("matching", () => {
  it("awards full marks for every correct pair", () => {
    const r = match([
      ["l1", "r1"],
      ["l2", "r2"],
      ["l3", "r3"],
    ]);
    expect(r).toMatchObject({ status: "MARKED", marksAwarded: 3, isCorrect: true });
    expect(r.feedback.correctAnswerDisplay).toBe("Mitochondrion → Respiration; Ribosome → Protein synthesis; Nucleus → Genetic material");
  });

  it("awards per-pair credit", () => {
    expect(match([["l1", "r1"], ["l2", "r4"]]).marksAwarded).toBe(1);
  });

  it("floors shares when marks are not a multiple of the items", () => {
    expect(match([["l1", "r1"]], 2).marksAwarded).toBe(0);
    expect(match([["l1", "r1"], ["l2", "r2"]], 2).marksAwarded).toBe(1);
  });

  it("uses marksPerPair and caps at the question's marks", () => {
    expect(match([["l1", "r1"], ["l2", "r2"]], 3, { ...matchingSpec, marksPerPair: 2 }).marksAwarded).toBe(3);
  });

  it("accepts alternative right items listed for the same left item", () => {
    const spec = { pairs: [...matchingSpec.pairs, { leftId: "l1", rightId: "r4" }] };
    expect(match([["l1", "r4"]], 3, spec).marksAwarded).toBe(1);
  });

  it("does not reward hedging with several right items for one left item", () => {
    const r = match([
      ["l1", "r1"],
      ["l1", "r4"],
    ]);
    expect(r.marksAwarded).toBe(0);
    expect(r.feedback.flags).toContain("DUPLICATE_ENTRY");
  });

  it("ignores unknown ids and treats no valid pair as unanswered", () => {
    expect(match([["lx", "r1"]])).toMatchObject({ status: "UNANSWERED" });
    expect(match([])).toMatchObject({ status: "UNANSWERED" });
    expect(match([["l1", "rx"], ["l2", "r2"]]).feedback.flags).toContain("UNKNOWN_TARGET");
  });

  it("sends a spec whose pairs reference nothing to review", () => {
    expect(match([["l1", "r1"]], 3, { pairs: [{ leftId: "zz", rightId: "r1" }] }).feedback.flags).toContain("SPEC_INVALID");
  });
});

// ------------------------------------------------------------------------------------------------------------------
// DIAGRAM_LABELLING
// ------------------------------------------------------------------------------------------------------------------

const MEDIA = "01990000-0000-7000-8000-000000000001";
const bankPayload = {
  mediaAssetId: MEDIA,
  labels: [
    { id: "L1", text: "Nucleus" },
    { id: "L2", text: "Cell membrane" },
    { id: "L3", text: "Cytoplasm" },
    { id: "L4", text: "nucleus" },
  ],
  hotspots: [
    { id: "h1", x: 42.5, y: 30 },
    { id: "h2", x: 10, y: 50 },
    { id: "h3", x: 70, y: 60, w: 5, h: 5 },
  ],
};
const bankSpec = {
  hotspots: [
    { hotspotId: "h1", labelId: "L1" },
    { hotspotId: "h2", labelId: "L2", accepted: ["plasma membrane"] },
    { hotspotId: "h3", labelId: "L3", marks: 2 },
  ],
};

function label(labels: { targetId: string; labelId?: string; text?: string }[] | null, marks = 4, payload: unknown = bankPayload, spec: unknown = bankSpec) {
  return markResponse({
    type: "DIAGRAM_LABELLING",
    marks,
    payload,
    answerSpec: spec,
    response: labels === null ? null : { type: "DIAGRAM_LABELLING", labels },
  });
}

describe("diagram labelling", () => {
  it("marks word-bank labels with per-hotspot weights", () => {
    const r = label([
      { targetId: "h1", labelId: "L1" },
      { targetId: "h2", labelId: "L2" },
      { targetId: "h3", labelId: "L3" },
    ]);
    expect(r).toMatchObject({ marksAwarded: 4, isCorrect: true });
    expect(label([{ targetId: "h3", labelId: "L3" }]).marksAwarded).toBe(2);
    expect(label([{ targetId: "h1", labelId: "L1" }]).marksAwarded).toBe(1);
  });

  it("treats bank entries with the same wording as interchangeable", () => {
    expect(label([{ targetId: "h1", labelId: "L4" }]).marksAwarded).toBe(1);
  });

  it("accepts typed alternatives", () => {
    expect(label([{ targetId: "h2", text: "Plasma  Membrane" }]).marksAwarded).toBe(1);
    expect(label([{ targetId: "h2", text: "cell membrane" }]).marksAwarded).toBe(1);
    expect(label([{ targetId: "h2", text: "cell wall" }]).marksAwarded).toBe(0);
  });

  it("marks free-text labelling against accepted texts", () => {
    const payload = { mediaAssetId: MEDIA, hotspots: [{ id: "h1", x: 1, y: 1 }] };
    const spec = { hotspots: [{ hotspotId: "h1", accepted: ["xylem"] }] };
    expect(label([{ targetId: "h1", text: "Xylem" }], 1, payload, spec).marksAwarded).toBe(1);
    expect(label([{ targetId: "h1", text: "phloem" }], 1, payload, spec).marksAwarded).toBe(0);
  });

  it("flags unknown targets and labels, and duplicates", () => {
    const r = label([
      { targetId: "hx", labelId: "L1" },
      { targetId: "h1", labelId: "LX" },
      { targetId: "h2", labelId: "L2" },
      { targetId: "h2", labelId: "L3" },
    ]);
    expect(r.marksAwarded).toBe(1);
    expect(r.feedback.flags).toEqual(expect.arrayContaining(["UNKNOWN_TARGET", "DUPLICATE_ENTRY"]));
  });

  it("treats nothing labelled as unanswered", () => {
    expect(label([])).toMatchObject({ status: "UNANSWERED" });
    expect(label([{ targetId: "h1", text: "  " }])).toMatchObject({ status: "UNANSWERED" });
  });

  it("displays the expected label per hotspot", () => {
    expect(label([]).feedback.correctAnswerDisplay).toBe("1: Nucleus; 2: Cell membrane; 3: Cytoplasm");
  });

  it("refuses a spec that does not cover every hotspot", () => {
    expect(label([{ targetId: "h1", labelId: "L1" }], 4, bankPayload, { hotspots: [{ hotspotId: "h1", labelId: "L1" }] }).feedback.flags).toContain("SPEC_INVALID");
  });

  it("rejects a payload whose media id is not a uuid", () => {
    expect(label([{ targetId: "h1", labelId: "L1" }], 4, { ...bankPayload, mediaAssetId: "../../etc/passwd" }).feedback.flags).toContain("SPEC_INVALID");
  });
});
