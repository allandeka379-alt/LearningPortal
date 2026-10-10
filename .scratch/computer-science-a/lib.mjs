// Authoring helpers for computer-science-a questions and flashcards (the A-level structure of .scratch/biology-a/lib.mjs:
// sub-parts via P.group, exam-format plans EXAM, checkExam, reserved marks; the builders of .scratch/computer-science/lib.mjs:
// P.bits, P.truth, traceTable; and checked computer science helpers at the end). Concept modules call concept(...) with
// a builder; build-content.mjs writes the JSON files.
//
// EVERY conversion, sum, shift, file size, trace, truth table, SQL result, scheduling table and program output you
// print is COMPUTED by the helpers below (or by running Python with py(...)); never type a computed value by hand. Use
// chk(...) to assert a value you also write in prose. Pseudocode follows the Cambridge 9618 pseudocode guide (BRIEF.md).
//
// Strings are Markdown. Pseudocode and Python go in fenced code blocks; operators and identifiers in `inline code`. Outside
// code, a literal dollar sign must be written US\$ (a dollar starts maths).
//
// t`...` is String.raw with one convenience: a typed backslash-n that is NOT followed by a lower-case letter becomes a
// real line break (so t`line one\nline two` works); LaTeX commands such as \neq, \nu, \nabla are left alone. Plain "..."
// strings already treat \n as a newline. A literal backslash-n would show on screen as "\n"; the checker
// .scratch/tools/literal-newlines.mjs finds them. Prefer real line breaks in template literals.
import { spawnSync } from "node:child_process";
import { DatabaseSync } from "node:sqlite";

export const t = (strings, ...values) => String.raw(strings, ...values).replace(/\n(?![a-z])/g, "\n");

// Selectors for `applies` (an item is tagged only to the syllabi it names). Omit applies for content valid for both.
export const ZIM = ["zimsec"];
export const CAM = ["cambridge/a-level/computer-science"];

const OPTION_KEYS = ["A", "B", "C", "D", "E", "F"];
const DEFAULT_NORMALISE = ["trim", "lowercase", "collapse_whitespace", "strip_punctuation"];
const PART_LABEL = /^\((?:[a-z]{1,2}|[ivx]{1,6}|\d{1,2})\)$/;

// ---------------------------------------------------------------------------------------------------------------------
// Verification and rounding

/** Asserts |actual − expected| ≤ tol (default: float noise) and returns expected. */
export function chk(actual, expected, tol = 1e-9, label = "") {
  if (typeof actual !== "number" || !Number.isFinite(actual) || Math.abs(actual - expected) > tol + 1e-9 * Math.max(1, Math.abs(expected))) {
    throw new Error(`CHECK FAILED ${label}: computed ${actual}, written ${expected} (tol ${tol})`);
  }
  return expected;
}
/** Asserts deep equality of two JSON-able values and returns expected. */
export function same(actual, expected, label = "") {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) throw new Error(`CHECK FAILED ${label}: computed ${JSON.stringify(actual)}, written ${JSON.stringify(expected)}`);
  return expected;
}
/** Rounds to dp decimal places (half away from zero, robust to float noise). */
export function round(x, dp = 0) {
  const f = 10 ** dp;
  return (Math.sign(x) * Math.round(Math.abs(x) * f + 1e-9)) / f;
}

// ---------------------------------------------------------------------------------------------------------------------
// Units for NUMERICAL / CALCULATION answers: display hint + accepted spellings (a missing unit is fine, an unknown one
// throws: ask the coordinator to add it). Cambridge uses 1024-based KiB/MiB/GiB; ZIMSEC uses KB/MB/GB (state the factor
// 1024 in the stem when you use ZIMSEC names).
const UNITS = {
  bits: ["bits", "bit", "b"],
  bytes: ["bytes", "byte", "B"],
  KiB: ["KiB", "kibibytes", "kibibyte"],
  MiB: ["MiB", "mebibytes", "mebibyte"],
  GiB: ["GiB", "gibibytes", "gibibyte"],
  TiB: ["TiB", "tebibytes", "tebibyte"],
  KB: ["KB", "kB", "kilobytes", "kilobyte"],
  MB: ["MB", "megabytes", "megabyte"],
  GB: ["GB", "gigabytes", "gigabyte"],
  TB: ["TB", "terabytes", "terabyte"],
  "bit/s": ["bit/s", "bits/s", "bps", "bits per second"],
  "Mbit/s": ["Mbit/s", "Mb/s", "Mbps", "megabits per second"],
  s: ["s", "seconds", "second", "sec", "secs"],
  ms: ["ms", "milliseconds", "millisecond"],
  ns: ["ns", "nanoseconds", "nanosecond"],
  min: ["min", "minutes", "mins"],
  Hz: ["Hz", "hertz"],
  kHz: ["kHz", "kilohertz"],
  MHz: ["MHz", "megahertz"],
  GHz: ["GHz", "gigahertz"],
  pixels: ["pixels", "pixel", "px"],
  characters: ["characters", "character", "chars"],
  hosts: ["hosts", "host", "addresses", "devices"],
  "page faults": ["page faults", "faults", "page fault"],
  comparisons: ["comparisons", "comparison", "compares"],
  swaps: ["swaps", "swap"],
  passes: ["passes", "pass"],
  cycles: ["cycles", "cycle", "clock cycles"],
  "%": ["%", "percent", "per cent"],
  "×": ["×", "x", "times"],
  ohms: ["Ω", "ohm", "ohms"],
  V: ["V", "volts", "volt"],
  A: ["A", "amps", "amperes", "ampere"],
  mA: ["mA", "milliamps", "milliamperes"],
  "US$": ["US$", "USD", "dollars"],
};

function unitSpec(unit) {
  if (!unit) return {};
  const accepted = UNITS[unit];
  if (!accepted) throw new Error(`Unknown unit ${unit}`);
  return { payload: { unitHint: unit }, units: { required: false, accepted } };
}

/** Half a unit in the second significant figure: accepts correctly rounded 2- and 3-s.f. answers. */
export function tol2sf(value) {
  const magnitude = Math.floor(Math.log10(Math.abs(value)));
  return Number((0.5 * 10 ** (magnitude - 1)).toPrecision(2));
}

function fmt(value) {
  if (Number.isInteger(value)) return String(value);
  return String(Number(value.toPrecision(3)));
}

function numericSpec({ value, unit, tol, sf, dp, penalty }) {
  const spec = { value };
  if (tol === undefined) tol = Number.isInteger(value) ? 0 : tol2sf(value);
  if (tol) spec.tolerance = typeof tol === "number" ? { kind: "absolute", amount: tol } : tol;
  if (sf) {
    spec.sigFigs = typeof sf === "number" ? { min: sf, max: sf } : sf;
    spec.precisionPenaltyMarks = penalty ?? 1;
  }
  if (dp !== undefined) {
    spec.decimalPlaces = dp;
    spec.precisionPenaltyMarks = penalty ?? 1;
  }
  const u = unitSpec(unit);
  if (u.units) spec.units = u.units;
  return { spec, payload: u.payload };
}


// ---------------------------------------------------------------------------------------------------------------------
// Number bases, binary arithmetic and logic. Use these to COMPUTE answers, working and tables; never type a converted
// value by hand. All strings are upper case, no prefix, padded to `width` when given.

/** Non-negative integer → string in base 2, 8, 10 or 16, left-padded with zeros to `width`. */
export function toBase(n, base, width = 0) {
  if (!Number.isInteger(n) || n < 0) throw new Error(`toBase: ${n} is not a non-negative integer`);
  const s = n.toString(base).toUpperCase();
  if (width && s.length > width) throw new Error(`toBase: ${n} needs more than ${width} digits in base ${base}`);
  return s.padStart(width, "0");
}
/** String in base 2, 8 or 16 (spaces allowed) → integer; throws on an invalid digit. */
export function fromBase(s, base) {
  const clean = String(s).replace(/\s+/g, "").toUpperCase();
  const digits = "0123456789ABCDEF".slice(0, base);
  if (!clean || [...clean].some((ch) => !digits.includes(ch))) throw new Error(`fromBase: "${s}" is not base ${base}`);
  return parseInt(clean, base);
}
/** Integer → two's complement bit string of `bits` bits (default 8); throws if out of range. */
export function twos(n, bits = 8) {
  const min = -(2 ** (bits - 1));
  const max = 2 ** (bits - 1) - 1;
  if (!Number.isInteger(n) || n < min || n > max) throw new Error(`twos: ${n} is outside ${min}..${max}`);
  return toBase(n < 0 ? 2 ** bits + n : n, 2, bits);
}
/** Two's complement bit string → integer. */
export function fromTwos(s) {
  const clean = String(s).replace(/\s+/g, "");
  const v = fromBase(clean, 2);
  return clean[0] === "1" ? v - 2 ** clean.length : v;
}
/** Logical shift of a bit string (fixed width): places > 0 shifts left, < 0 shifts right; zeros fill in. */
export function shift(s, places) {
  const clean = String(s).replace(/\s+/g, "");
  const w = clean.length;
  if (places >= 0) return (clean + "0".repeat(places)).slice(places, places + w).padEnd(w, "0");
  const p = -places;
  return ("0".repeat(p) + clean).slice(0, w);
}
/** Adds two unsigned bit strings in a register of `width` bits: { sum (width bits, truncated), carries, overflow }. */
export function addBinary(a, b, width = 8) {
  const total = fromBase(a, 2) + fromBase(b, 2);
  const overflow = total >= 2 ** width;
  return { sum: toBase(total % 2 ** width, 2, width), value: total, overflow };
}
/** Groups a digit string for display: "01101100" → "0110 1100". */
export const group = (s, size = 4) => String(s).replace(new RegExp(`(.{${size}})(?=.)`, "g"), "$1 ");
/** Run-length encoding of a string or array as [[count, item], ...]. */
export function rle(items) {
  const out = [];
  for (const it of items) {
    const last = out[out.length - 1];
    if (last && last[1] === it) last[0]++;
    else out.push([1, it]);
  }
  return out;
}

/** Truth-table rows in binary order for inputs ["A","B",...]; fn receives 0/1 values and returns a boolean or 0/1. */
export function truthRows(inputs, fn) {
  const n = inputs.length;
  return Array.from({ length: 2 ** n }, (_, r) => {
    const vals = toBase(r, 2, n).split("").map(Number);
    return { vals, out: fn(...vals) ? 1 : 0 };
  });
}
/** Logic operators on 0/1 for truth functions: e.g. (A, B, C) => L.or(L.and(A, B), L.not(C)). */
export const L = {
  not: (a) => (a ? 0 : 1),
  and: (a, b) => (a && b ? 1 : 0),
  or: (a, b) => (a || b ? 1 : 0),
  nand: (a, b) => (a && b ? 0 : 1),
  nor: (a, b) => (a || b ? 0 : 1),
  xor: (a, b) => (!!a !== !!b ? 1 : 0),
};
/** Markdown truth table. columns: [[header, fn], ...] extra computed columns (intermediates, then the output). */
export function truthTableMd(inputs, columns) {
  const rows = truthRows(inputs, () => 0);
  const head = `| ${[...inputs, ...columns.map(([h]) => h)].join(" | ")} |`;
  const sep = `|${[...inputs, ...columns].map(() => ":-:").join("|")}|`;
  const body = rows.map(({ vals }) => `| ${[...vals, ...columns.map(([, f]) => (f(...vals) ? 1 : 0))].join(" | ")} |`);
  return [head, sep, ...body].join("\n");
}

/**
 * Runs a trace: `step(state)` is called repeatedly and must return the next state (or null to stop); `cols` are the
 * column names to record. Returns a Markdown trace table (blank cells where a value did not change, as in mark schemes)
 * and the rows. Use it to verify every trace table you print.
 */
export function traceTable(cols, initial, step, { maxSteps = 200, showUnchanged = false } = {}) {
  const rows = [];
  let state = { ...initial };
  let prev = {};
  for (let i = 0; state && i < maxSteps; i++) {
    rows.push(cols.map((c) => (state[c] === undefined || (!showUnchanged && prev[c] === state[c]) ? "" : String(state[c]))));
    prev = { ...prev, ...state };
    state = step({ ...state });
    if (i === maxSteps - 1 && state) throw new Error("traceTable: maxSteps reached (infinite loop?)");
  }
  const md = [`| ${cols.join(" | ")} |`, `|${cols.map(() => ":-:").join("|")}|`, ...rows.map((r) => `| ${r.join(" | ")} |`)].join("\n");
  return { md, rows };
}

/** Part builders (used inside struct parts and to build top-level questions). Each returns { part, model, wrong[] }. */
export const P = {
  /**
   * NUMERICAL (or CALCULATION with type) answer. value: the exact number (compute it); unit: a key of UNITS;
   * tol/sf/dp as in combined-science. answer: the full-marks text if it differs from the value.
   */
  num({ label, marks = 1, stem, value, answer, unit, tol, sf, dp, penalty, wrong = [], explanation, workedSolution, hints, type = "NUMERICAL", prefix }) {
    const { spec, payload } = numericSpec({ value, unit, tol, sf, dp, penalty });
    const part = { label, type, marks, stem };
    const pl = { ...(payload ?? {}) };
    if (prefix) pl.answerPrefix = prefix;
    if (Object.keys(pl).length) part.payload = pl;
    part.answerSpec = spec;
    if (explanation) part.explanation = explanation;
    const ws = workedSolution ?? (type === "CALCULATION" && explanation ? `1. ${explanation}` : undefined);
    if (ws) part.workedSolution = ws;
    if (hints) part.hints = hints;
    return { part, model: { type, value: answer ?? fmt(value) }, wrong: wrong.map((w) => ({ type, value: String(w) })) };
  },
  /**
   * A binary / octal / hexadecimal / two's complement answer, COMPUTED from `value` (a JS integer):
   * base 2, 8 or 16; width pads with leading zeros (8 for a byte); twosComplement: value may be negative (base 2).
   * Spaces in the student's answer are ignored, case is ignored. acceptUnpadded also accepts the answer without
   * leading zeros (use it unless the question says "8-bit"). Marked as SHORT_ANSWER.
   */
  bits({ label, marks = 1, stem, value, base = 2, width = 0, twosComplement = false, acceptUnpadded = false, wrong, explanation, hints }) {
    const expected = twosComplement ? twos(value, width || 8) : toBase(value, base, width);
    const accepted = [expected];
    const unpadded = expected.replace(/^0+(?=.)/, "");
    if (acceptUnpadded && unpadded !== expected) accepted.push(unpadded);
    const wrongList = wrong ?? [twosComplement ? twos(value === (2 ** ((width || 8) - 1)) - 1 ? value - 1 : value + 1, width || 8) : toBase(value + 1, base, width)];
    const built = P.short({ label, marks, stem, accepted, normalise: ["trim", "lowercase", "remove_whitespace"], wrong: wrongList, explanation, hints, maxLength: 64 });
    if (wrongList.some((w) => accepted.includes(String(w).replace(/\s+/g, "").toUpperCase()))) throw new Error(`bits ${stem.slice(0, 40)}: a wrong answer is accepted`);
    return built;
  },
  /**
   * Truth table to complete: one select blank (0/1) per row for the output, computed from fn. stem should describe
   * the circuit or expression; the template lists the input values row by row. marks default: one per row
   * (Cambridge often gives 4 marks for 8 rows: pass marks: 4; blanks share the marks equally, floored).
   */
  truth({ label, marks, stem, inputs, fn, out = "X", explanation, hints }) {
    const rows = truthRows(inputs, fn);
    const template = rows.map((r, i) => `${inputs.map((n, j) => `${n} = ${r.vals[j]}`).join(", ")}: ${out} = {{blank:r${i + 1}}}`).join("\n\n");
    return P.fib({
      label,
      marks: marks ?? rows.length,
      stem,
      template,
      blanks: rows.map((r, i) => ({ id: `r${i + 1}`, accepted: [String(r.out)], choices: ["0", "1"] })),
      wrong: [rows.map((r) => String(1 - r.out))],
      explanation,
      hints,
    });
  },
  /** options: [[content, rationale], ...]; answer: "A" or ["A","C"] (multiple: 2 marks, all or nothing). */
  mcq({ label, marks, stem, options, answer, multiple = false, explanation, hints, scoring }) {
    const answers = Array.isArray(answer) ? answer : [answer];
    marks ??= multiple ? 2 : 1;
    const opts = options.map(([content, rationale], i) => {
      const o = { key: OPTION_KEYS[i], content };
      if (answers.includes(OPTION_KEYS[i])) o.correct = true;
      if (rationale) o.rationale = rationale;
      return o;
    });
    const wrongKey = OPTION_KEYS.slice(0, options.length).find((k) => !answers.includes(k));
    const part = { label, type: "MULTIPLE_CHOICE", marks, stem };
    if (multiple) part.payload = { selectMode: "multiple" };
    part.options = opts;
    if (scoring) part.answerSpec = { scoring };
    if (explanation) part.explanation = explanation;
    if (hints) part.hints = hints;
    return { part, model: { type: "MULTIPLE_CHOICE", optionKeys: answers }, wrong: [{ type: "MULTIPLE_CHOICE", optionKeys: [wrongKey] }] };
  },
  tf({ label, marks = 1, stem, answer, feedbackTrue, feedbackFalse, explanation, hints, yesNo = false }) {
    const part = { label, type: "TRUE_FALSE", marks, stem };
    if (yesNo) part.payload = { statementStyle: "yes_no" };
    part.answerSpec = { correct: answer };
    if (feedbackTrue) part.answerSpec.feedbackTrue = feedbackTrue;
    if (feedbackFalse) part.answerSpec.feedbackFalse = feedbackFalse;
    if (explanation) part.explanation = explanation;
    if (hints) part.hints = hints;
    return { part, model: { type: "TRUE_FALSE", value: answer }, wrong: [{ type: "TRUE_FALSE", value: !answer }] };
  },
  /**
   * Short answer, auto-marked (a term, a name, a base sequence). accepted: exact answers (strings or {value, marks,
   * feedback}); keywords: {all, any, minAny}; patterns: anchored regexes; rejected: answers that never score. List every
   * accepted spelling (haemoglobin/hemoglobin is NOT accepted: British spelling, but add common variants such as
   * "Krebs cycle"/"citric acid cycle" where both are correct). model defaults to the first accepted answer.
   */
  short({ label, marks = 1, stem, accepted, patterns, keywords, rubric, rejected, normalise, model, wrong = [], explanation, hints, maxLength }) {
    const spec = {};
    if (accepted) spec.accepted = accepted.map((a) => (typeof a === "string" ? { value: a } : a));
    if (patterns) spec.patterns = patterns;
    if (keywords) spec.keywords = keywords;
    if (rubric) spec.rubric = rubric;
    if (rejected) spec.rejected = rejected.map((r) => (typeof r === "string" ? { value: r } : r));
    spec.normalise = normalise ?? DEFAULT_NORMALISE;
    const part = { label, type: "SHORT_ANSWER", marks, stem };
    if (maxLength) part.payload = { maxLength };
    part.answerSpec = spec;
    if (explanation) part.explanation = explanation;
    if (hints) part.hints = hints;
    const first = model ?? (accepted ? (typeof accepted[0] === "string" ? accepted[0] : accepted[0].value) : null);
    if (!first) throw new Error(`short ${label ?? stem.slice(0, 40)}: model response needed`);
    return { part, model: { type: "SHORT_ANSWER", text: first }, wrong: wrong.map((w) => ({ type: "SHORT_ANSWER", text: w })) };
  },
  /**
   * Fill in the blank. template uses {{blank:id}} (never inside $…$); blanks: [{ id, accepted: [...], input? "number",
   * choices? (drop-down), tolerance? (number blanks), marks?, wrong? }]. Text blanks ignore case and punctuation.
   */
  fib({ label, marks, stem, template, blanks, wrong, explanation, hints }) {
    const part = { label, type: "FILL_IN_THE_BLANK", marks: marks ?? blanks.length, stem };
    part.payload = {
      template,
      blanks: blanks.map((b) => {
        const o = { id: b.id };
        if (b.choices) {
          o.input = "select";
          o.choices = b.choices;
        } else if (b.input === "number") o.input = "number";
        return o;
      }),
    };
    part.answerSpec = {
      blanks: blanks.map((b) => {
        const o = { id: b.id, accepted: b.accepted.map(String) };
        if (b.marks !== undefined) o.marks = b.marks;
        if (b.tolerance !== undefined) o.tolerance = b.tolerance;
        if (b.normalise) o.normalise = b.normalise;
        else if (!b.choices && b.input !== "number") o.normalise = ["trim", "lowercase", "collapse_whitespace", "strip_punctuation"];
        return o;
      }),
    };
    if (explanation) part.explanation = explanation;
    if (hints) part.hints = hints;
    const model = { type: "FILL_IN_THE_BLANK", blanks: blanks.map((b) => ({ blankId: b.id, text: String(b.accepted[0]) })) };
    const wrongRows = wrong ?? [blanks.map((b) => b.wrong ?? (b.choices ? b.choices.find((c) => !b.accepted.includes(c)) : b.input === "number" ? "999" : "xyz"))];
    const wrongResponses = wrongRows.map((w) => ({ type: "FILL_IN_THE_BLANK", blanks: blanks.map((b, i) => ({ blankId: b.id, text: String(w[i]) })) }));
    return { part, model, wrong: wrongResponses };
  },
  /**
   * Matching: pairs [[left, right], ...] matched by position. `right` + `rightIndex` (optional) for multiple matching:
   * several left items share right items (rightIndex maps each left item to an index of `right`).
   */
  match({ label, marks, stem, pairs, right, rightIndex, extraRight = [], explanation, hints, marksPerPair = 1, shuffle }) {
    let left;
    let rights;
    let answerPairs;
    if (right) {
      left = pairs.map((l, i) => ({ id: `L${i + 1}`, content: l }));
      rights = right.map((r, i) => ({ id: `R${i + 1}`, content: r }));
      answerPairs = rightIndex.map((ri, i) => ({ leftId: `L${i + 1}`, rightId: `R${ri + 1}` }));
    } else {
      left = pairs.map(([l], i) => ({ id: `L${i + 1}`, content: l }));
      const base = pairs.map(([, r], i) => ({ id: `R${i + 1}`, content: r }));
      extraRight.forEach((r, i) => base.push({ id: `X${i + 1}`, content: r }));
      rights = base.map((_, i) => base[(i + 2) % base.length]); // deterministic display order
      answerPairs = pairs.map((_, i) => ({ leftId: `L${i + 1}`, rightId: `R${i + 1}` }));
    }
    const part = { label, type: "MATCHING", marks: marks ?? left.length * marksPerPair, stem };
    part.payload = { left, right: rights };
    if (shuffle !== undefined) part.payload.shuffle = shuffle;
    part.answerSpec = { pairs: answerPairs, marksPerPair };
    if (explanation) part.explanation = explanation;
    if (hints) part.hints = hints;
    const model = { type: "MATCHING", pairs: answerPairs };
    const wrongPairs = answerPairs.map((p, i) => ({ leftId: p.leftId, rightId: answerPairs[(i + 1) % answerPairs.length].rightId }));
    const wrongModel = { type: "MATCHING", pairs: wrongPairs.every((p, i) => p.rightId === answerPairs[i].rightId) ? answerPairs.map((p) => ({ leftId: p.leftId, rightId: rights.find((r) => r.id !== p.rightId).id })) : wrongPairs };
    return { part, model, wrong: [wrongModel] };
  },
  /**
   * Self-marked part (describe, explain, suggest, discuss, a drawing or a graph described in words): points are
   * "description" (1 mark) or [description, marks, indicators?]; they must add up to the part's marks (put
   * alternatives inside one point as "A or B"). type SHORT_ANSWER (default) or EXTENDED_RESPONSE (with wordLimit and
   * modelAnswer). levels: [[level, min, max, descriptor], ...] for an essay part marked by levels.
   */
  manual({ label, marks, stem, points, modelAnswer, explanation, hints, type = "SHORT_ANSWER", wordLimit, levels }) {
    const list = points.map((p, i) => {
      if (!Array.isArray(p)) return { id: `p${i + 1}`, description: p, marks: 1 };
      const o = { id: `p${i + 1}`, description: p[0], marks: p[1] };
      if (p[2]) o.indicators = p[2];
      return o;
    });
    const total = list.reduce((s, p) => s + p.marks, 0);
    if (total !== marks) throw new Error(`manual part ${label ?? stem.slice(0, 50)}: points total ${total} != marks ${marks}`);
    const part = { label, type, marks, markingMode: "MANUAL", stem };
    if (wordLimit && type !== "SHORT_ANSWER") part.payload = { wordLimit };
    part.answerSpec = { markScheme: { points: list } };
    if (levels) part.answerSpec.markScheme.levels = levels.map(([level, minMarks, maxMarks, descriptor]) => ({ level, minMarks, maxMarks, descriptor }));
    if (modelAnswer && type !== "SHORT_ANSWER") part.answerSpec.modelAnswer = modelAnswer;
    if (modelAnswer && type === "SHORT_ANSWER") part.answerSpec.markingNotes = `Example answer: ${modelAnswer}`;
    if (explanation) part.explanation = explanation;
    if (hints) part.hints = hints;
    return { part, model: null, wrong: [] };
  },
  /**
   * A part with sub-parts: P.group({ label: "(b)", stem, parts: [P.num({ label: "(i)", ... }), ...] }). One level only;
   * its marks are the sum of the sub-parts. Responses are keyed "(b)(i)". (Items may instead use "(1)" … with sub-parts
   * "(a)" …; never labels like "1(a)", which the validator rejects.)
   */
  group({ label, stem, parts, explanation, hints }) {
    for (const p of parts) if (p.subs) throw new Error(`group ${label}: sub-parts cannot have sub-parts`);
    const part = { label, type: "STRUCTURED", marks: parts.reduce((s, p) => s + p.part.marks, 0), stem, parts: parts.map((p) => p.part) };
    if (explanation) part.explanation = explanation;
    if (hints) part.hints = hints;
    return { part, model: null, wrong: [], subs: parts.map((p) => ({ label: p.part.label, model: p.model, wrong: p.wrong })) };
  },
};

// ---------------------------------------------------------------------------------------------------------------------
// Exam-format plans (BRIEF.md, exam-format table). STRUCTURED items worth a reserved total must be examStyle, carry the
// plan's skill and (when the plan fixes them) its applies. Practice STRUCTURED items use 4, 6, 8, 9, 14 or 16 marks.
export const EXAM = {
  /** ZIMSEC Paper 1 (9 per mock), Cambridge Paper 1 (AS topics, 5 per mock) and Paper 3 (A Level topics, 5 per mock): a structured theory question. */
  THEORY10: { total: 10, skill: "ANALYSIS", secs: 900 },
  /** The same papers: a short structured theory question (ZIMSEC 2 per mock, Cambridge 5 per paper). */
  THEORY5: { total: 5, skill: "UNDERSTANDING", secs: 420 },
  /** Cambridge Paper 2: one structured question on topics 9-12 (trace, find errors, write pseudocode). 5 per mock. */
  CAM_P2_SHORT: { total: 12, skill: "APPLICATION", applies: CAM, secs: 1080 },
  /** Cambridge Paper 4 (written practice of the practical): one programming task in Python. 3 per mock. */
  CAM_P4_TASK: { total: 25, skill: "CREATION", applies: CAM, secs: 2250 },
  /** ZIMSEC Paper 2 section A (Computer Architecture, 30 marks). 1 per mock. */
  ZIM_P2_ARCH: { total: 30, skill: "APPLICATION", applies: ZIM, secs: 2700 },
  /** ZIMSEC Paper 2 section B (Programming, Algorithm design and Databases, 40 marks). 1 per mock. */
  ZIM_P2_PROG: { total: 40, skill: "CREATION", applies: ZIM, secs: 3600 },
  /** ZIMSEC Paper 2 section C (Networking, 30 marks). 1 per mock. */
  ZIM_P2_NET: { total: 30, skill: "ANALYSIS", applies: ZIM, secs: 2700 },
};
/** Single-question EXTENDED_RESPONSE plan: Cambridge Paper 2 final scenario question (15 marks, self-marked, levels). 1 per mock. */
export const CAM_P2_SCENARIO = { total: 15, skill: "CREATION", applies: CAM, secs: 2700 };
/** STRUCTURED totals reserved for exam-format items (EXTENDED_RESPONSE 15 is reserved for the scenario question). */
export const RESERVED_MARKS = [5, 10, 12, 25, 30, 40];

/** Throws when an exam item's parts do not match its plan's total (and fixed labels/marks when the plan has them). */
export function checkExam(plan, parts) {
  const total = parts.reduce((s, p) => s + p.part.marks, 0);
  if (total !== plan.total) throw new Error(`exam item parts total ${total}, plan needs ${plan.total}`);
  if (plan.labels) {
    const labels = parts.map((p) => p.part.label);
    const marks = parts.map((p) => p.part.marks);
    if (JSON.stringify(labels) !== JSON.stringify(plan.labels) || JSON.stringify(marks) !== JSON.stringify(plan.marks)) {
      throw new Error(`exam item parts ${JSON.stringify(labels)} ${JSON.stringify(marks)} do not match the plan ${JSON.stringify(plan.labels)} ${JSON.stringify(plan.marks)}`);
    }
  }
  return parts;
}

/**
 * Levels for the self-marked 15-mark Cambridge Paper 2 scenario question (our own wording, in the style of a levels
 * mark scheme). Returns [level, min, max, descriptor]. Use with points that add up to 15.
 */
export const SCENARIO_LEVELS = [
  [4, 13, 15, "A complete, well-structured algorithm or program: every requirement is met, data structures are used correctly, loops and selection are correct, input is validated where asked, and output is clear and in the requested format."],
  [3, 9, 12, "Most requirements met with a clear structure; one or two minor logic errors or omissions."],
  [2, 5, 8, "Some requirements met; an attempt at the main loop or processing, but with logic errors or missing parts."],
  [1, 1, 4, "A few relevant statements (declarations, inputs or outputs) without a working overall algorithm."],
  [0, 0, 0, "No creditable response."],
];

const MODULES = [];

/**
 * Declares one concept's items in one file. opts: { file, keyPrefix, applies? (default for every item), extraConcepts? }.
 */
export function concept(conceptKey, { file, keyPrefix, applies: defaultApplies, extraConcepts = [] }, body) {
  const questions = [];
  const cards = [];
  let qn = 0;
  let cn = 0;

  function finish(built, opts) {
    const { d, marks, secs, skill, daily, examStyle, access, concepts, hints, explanation, conceptSummary, paper, workedSolution, calculator } = opts;
    const applies = opts.applies === null ? undefined : (opts.applies ?? defaultApplies);
    const m = marks ?? built.part.marks;
    const q = {
      key: `${keyPrefix}.q${String(++qn).padStart(2, "0")}`,
      type: built.part.type,
      concepts: concepts ?? [conceptKey, ...extraConcepts],
      difficulty: d,
      marks: m,
      estimatedSeconds: secs ?? Math.max(60, m * 80),
      stem: built.part.stem,
    };
    for (const k of ["payload", "answerSpec", "options", "markingMode"]) if (built.part[k] !== undefined) q[k] = built.part[k];
    q.explanation = explanation ?? built.part.explanation;
    if (workedSolution ?? built.part.workedSolution) q.workedSolution = workedSolution ?? built.part.workedSolution;
    if (conceptSummary) q.conceptSummary = conceptSummary;
    if (hints ?? built.part.hints) q.hints = hints ?? built.part.hints;
    if (built.model) q.modelResponse = built.model;
    if (built.wrong?.length) q.wrongResponses = built.wrong;
    q.skill = skill ?? "APPLICATION";
    if (daily) q.dailyEligible = true;
    if (examStyle) q.examStyle = true;
    if (applies) q.applies = applies;
    if (calculator !== undefined) q.calculator = calculator;
    if (paper) q.paper = paper;
    if (access) q.access = access;
    if (!q.explanation) throw new Error(`${q.key}: explanation required`);
    if (![1, 2, 3, 4, 5].includes(d)) throw new Error(`${q.key}: difficulty 1-5 required (d)`);
    if (d >= 3 && !q.hints) throw new Error(`${q.key}: difficulty ${d} needs hints`);
    if (daily && (d < 2 || d > 3)) throw new Error(`${q.key}: daily questions need difficulty 2-3`);
    if (q.type === "STRUCTURED" && RESERVED_MARKS.includes(m)) {
      const plan = Object.entries(EXAM).find(([, p]) => p.total === m && p.skill === q.skill);
      if (!examStyle || !plan) throw new Error(`${q.key}: a STRUCTURED item worth ${m} marks must be an exam-format item (examStyle and the skill of an EXAM plan); practice items use 4, 6, 8, 9, 14 or 16 marks`);
      if (plan[1].applies && JSON.stringify(q.applies) !== JSON.stringify(plan[1].applies)) throw new Error(`${q.key}: ${plan[0]} items need applies ${JSON.stringify(plan[1].applies)}`);
    }
    if (q.type === "EXTENDED_RESPONSE" && m === CAM_P2_SCENARIO.total) {
      if (!examStyle || q.skill !== CAM_P2_SCENARIO.skill || JSON.stringify(q.applies) !== JSON.stringify(CAM_P2_SCENARIO.applies)) throw new Error(`${q.key}: an EXTENDED_RESPONSE item worth 15 marks is the Cambridge Paper 2 scenario question (examStyle, skill CREATION, applies CAM)`);
    }
    questions.push(q);
    return q;
  }

  const b = {
    mcq: (o) => finish(P.mcq(o), o),
    /** Numerical answer: { value (exact), dp?, sf?, tol?, unit?, prefix?, wrong: [...] }. */
    num: (o) => finish(P.num(o), o),
    /** Calculation (working shown in workedSolution, defaults to the explanation): same fields as num. */
    calc: (o) => finish(P.num({ ...o, type: "CALCULATION" }), o),
    /** A binary / octal / hexadecimal / two's complement answer COMPUTED from value (see P.bits). */
    bits: (o) => finish(P.bits(o), o),
    /** Truth table to complete, computed from fn (see P.truth). */
    truth: (o) => finish(P.truth(o), o),
    tf: (o) => finish(P.tf(o), o),
    short: (o) => finish(P.short(o), o),
    fib: (o) => finish(P.fib(o), o),
    match: (o) => finish(P.match(o), o),
    /** Short self-marked answer (explain / describe / suggest): { stem, marks, points, modelAnswer }. */
    manualShort: (o) => finish(P.manual({ ...o, label: undefined, type: "SHORT_ANSWER" }), o),
    /** Extended response, self-marked: { stem, marks, points, levels?, modelAnswer, wordLimit: {min?, max?} }. */
    ext: (o) => finish(P.manual({ ...o, label: undefined, type: "EXTENDED_RESPONSE" }), o),
    /** Structured: parts = [P.xxx({ label, ... }), P.group(...), ...]; marks = sum of parts. */
    struct(o) {
      const parts = o.parts;
      const labels = new Set();
      for (const p of parts) {
        if (!PART_LABEL.test(p.part.label ?? "")) throw new Error(`struct "${o.stem.slice(0, 40)}": bad part label ${p.part.label} (use (a), (b) … or (1), (2) …)`);
        if (labels.has(p.part.label)) throw new Error(`struct: duplicate part label ${p.part.label}`);
        labels.add(p.part.label);
        for (const s of p.subs ?? []) if (!PART_LABEL.test(s.label ?? "")) throw new Error(`struct: bad sub-part label ${s.label} in ${p.part.label}`);
      }
      const part = { type: "STRUCTURED", stem: o.stem, marks: parts.reduce((s, p) => s + p.part.marks, 0) };
      const q = finish({ part, model: null, wrong: [] }, { ...o, marks: part.marks });
      const modelParts = {};
      const wrongParts = {};
      for (const p of parts) {
        if (p.subs) {
          for (const s of p.subs) {
            if (s.model) modelParts[`${p.part.label}${s.label}`] = s.model;
            if (s.wrong[0]) wrongParts[`${p.part.label}${s.label}`] = s.wrong[0];
          }
        } else {
          if (p.model) modelParts[p.part.label] = p.model;
          if (p.wrong[0]) wrongParts[p.part.label] = p.wrong[0];
        }
      }
      const ordered = {};
      for (const [k, v] of Object.entries(q)) {
        if (k === "explanation") ordered.parts = parts.map((p) => p.part);
        ordered[k] = v;
      }
      if (Object.keys(modelParts).length) ordered.modelResponse = { type: "STRUCTURED", parts: modelParts };
      if (Object.keys(wrongParts).length) ordered.wrongResponses = [{ type: "STRUCTURED", parts: wrongParts }];
      for (const k of ["skill", "dailyEligible", "examStyle", "applies", "calculator", "paper", "access"]) {
        if (k in ordered) {
          const v = ordered[k];
          delete ordered[k];
          ordered[k] = v;
        }
      }
      questions[questions.length - 1] = ordered;
      return ordered;
    },
    card(cardType, front, back, notes, extra = {}) {
      const c = { key: `${keyPrefix}.c${String(++cn).padStart(2, "0")}`, cardType, front, back };
      if (notes) c.notes = notes;
      c.concepts = extra.concepts ?? [conceptKey];
      const applies = extra.applies ?? defaultApplies;
      if (applies) c.applies = applies;
      cards.push(c);
    },
  };
  body(b);
  MODULES.push({ conceptKey, file, questions, cards });
  return { conceptKey, file, questions, cards };
}

export function allModules() {
  return MODULES;
}

// =====================================================================================================================
// Computer science helpers. All return exact values; round only for display. To print a table or a trace for a lesson,
// write a small script in .scratch/computer-science-a/tables/<prefix><name>.mjs (NOT in slices/: every .mjs there is
// imported by the build) that imports these helpers and console.logs the output, and paste it.

/** Markdown table from headers and rows (cells are strings or numbers). */
export function mdTable(headers, rows) {
  const head = `| ${headers.join(" | ")} |`;
  const sep = `|${headers.map(() => ":-:").join("|")}|`;
  return [head, sep, ...rows.map((r) => `| ${r.map((c) => String(c)).join(" | ")} |`)].join("\n");
}
/** Fenced code block for pseudocode or other text (no language tag). */
export const codeBlock = (text, lang = "") => `\`\`\`${lang}\n${String(text).replace(/\n$/, "")}\n\`\`\``;
/** Binary of n padded to `w` bits (default 8). */
export const bin = (n, w = 8) => toBase(n, 2, w);
/** XNOR joins the logic operators of L. */
L.xnor = (a, b) => (!!a === !!b ? 1 : 0);

// ---------------------------------------------------------------------------------------------------------------------
// Binary integers

/** One's complement of a bit string. */
export const onesComp = (s) => String(s).replace(/\s+/g, "").split("").map((c) => (c === "0" ? "1" : "0")).join("");
/** Two's complement negation of a bit string (same width; the most negative value cannot be negated and throws). */
export function negateTwos(s) {
  const clean = String(s).replace(/\s+/g, "");
  const v = fromTwos(clean);
  return twos(-v, clean.length);
}
/** Adds two two's complement strings of equal width: { sum, value, trueValue, carryOut, overflow (signed) }. */
export function addTwos(a, b) {
  const w = a.length;
  if (b.length !== w) throw new Error("addTwos: widths differ");
  const total = fromBase(a, 2) + fromBase(b, 2);
  const sum = toBase(total % 2 ** w, 2, w);
  const trueValue = fromTwos(a) + fromTwos(b);
  const overflow = trueValue < -(2 ** (w - 1)) || trueValue > 2 ** (w - 1) - 1;
  return { sum, value: fromTwos(sum), trueValue, carryOut: total >= 2 ** w, overflow };
}
/** a − b in two's complement (a + the negation of b): { sum, value, trueValue, overflow, negated }. */
export function subTwos(a, b) {
  const negated = negateTwos(b);
  return { ...addTwos(a, negated), negated };
}
/** Shift-and-add multiplication of non-negative integers: the partial products (binary strings) and the product. */
export function binaryMultiply(a, b) {
  const bb = toBase(b, 2);
  const partials = [];
  for (let i = bb.length - 1, k = 0; i >= 0; i--, k++) if (bb[i] === "1") partials.push(toBase(a, 2) + "0".repeat(k));
  return { partials, product: a * b, productBin: toBase(a * b, 2) };
}
/** Quotient and remainder of non-negative integers, also in binary. */
export const binaryDivide = (a, b) => ({ quotient: Math.floor(a / b), remainder: a % b, quotientBin: toBase(Math.floor(a / b), 2), remainderBin: toBase(a % b, 2) });
/** Binary Coded Decimal: each denary digit as 4 bits, e.g. 259 → "0010 0101 1001". */
export const bcd = (n) => String(n).split("").map((d) => toBase(Number(d), 2, 4)).join(" ");
/** Value of a BCD string (groups of 4 bits); throws on a group above 9. */
export function fromBcd(s) {
  const clean = String(s).replace(/\s+/g, "");
  let out = "";
  for (let i = 0; i < clean.length; i += 4) {
    const d = fromBase(clean.slice(i, i + 4), 2);
    if (d > 9) throw new Error(`fromBcd: ${clean.slice(i, i + 4)} is not a BCD digit`);
    out += d;
  }
  return Number(out);
}
/** Decimal fraction → first n binary places (0.1 → 0.000110011001…): { bits, remainder, text } (shows recurring fractions). */
export function fracToBinary(x, n = 12) {
  let f = x - Math.floor(x);
  let bits = "";
  for (let i = 0; i < n; i++) {
    f *= 2;
    if (f >= 1) {
      bits += "1";
      f -= 1;
    } else bits += "0";
  }
  return { bits, remainder: f, text: `${toBase(Math.floor(x), 2)}.${bits}` };
}

// ---------------------------------------------------------------------------------------------------------------------
// Floating point (Cambridge A Level format): a two's complement mantissa with the binary point after the sign bit, and a
// two's complement exponent. value = mantissa × 2^exponent. Normalised: the first two mantissa bits differ (01… or 10…).

/** Decodes a mantissa string and an exponent string. */
export function fpDecode(mant, exp) {
  const m = String(mant).replace(/\s+/g, "");
  const e = String(exp).replace(/\s+/g, "");
  return (fromTwos(m) / 2 ** (m.length - 1)) * 2 ** fromTwos(e);
}
/** Mantissa as a value in [−1, 1). */
export function fpMantissaValue(mant) {
  const m = String(mant).replace(/\s+/g, "");
  return fromTwos(m) / 2 ** (m.length - 1);
}
/**
 * Encodes x as a NORMALISED floating-point number with mBits mantissa bits and eBits exponent bits: { mant, exp, value,
 * error }. By default x must be exactly representable (throws otherwise); { approx: true } rounds the mantissa to the
 * nearest value (error = x − stored value). Throws on overflow (exponent too large) or underflow (too small) unless x is 0.
 */
export function fpEncode(x, mBits, eBits, { approx = false } = {}) {
  const emin = -(2 ** (eBits - 1));
  const emax = 2 ** (eBits - 1) - 1;
  if (x === 0) return { mant: "0".repeat(mBits), exp: twos(emin, eBits), value: 0, error: 0 };
  const e = x > 0 ? Math.floor(Math.log2(x)) + 1 : Math.ceil(Math.log2(-x));
  if (e > emax) throw new Error(`fpEncode: overflow, exponent ${e} > ${emax}`);
  if (e < emin) throw new Error(`fpEncode: underflow, exponent ${e} < ${emin}`);
  const scaled = (x / 2 ** e) * 2 ** (mBits - 1);
  const isInt = Math.abs(scaled - Math.round(scaled)) < 1e-9;
  if (!isInt && !approx) throw new Error(`fpEncode: ${x} is not exactly representable with ${mBits} mantissa bits (needs ${scaled})`);
  const r = Math.round(scaled);
  if (x > 0 && r >= 2 ** (mBits - 1)) throw new Error("fpEncode: rounding carried out of the mantissa, change the data");
  if (x < 0 && r < -(2 ** (mBits - 1))) throw new Error("fpEncode: rounding overflow, change the data");
  const mant = twos(r, mBits);
  const exp = twos(e, eBits);
  const value = fpDecode(mant, exp);
  return { mant, exp, value, error: x - value };
}
/** Normalises a (possibly unnormalised) pair by shifting the mantissa left and lowering the exponent: { mant, exp, shifts }. */
export function fpNormalise(mant, exp) {
  let m = String(mant).replace(/\s+/g, "");
  const eClean = String(exp).replace(/\s+/g, "");
  const eBits = eClean.length;
  let e = fromTwos(eClean);
  let shifts = 0;
  if (/^0+$/.test(m)) return { mant: m, exp: twos(e, eBits), shifts };
  while (m[0] === m[1]) {
    m = m.slice(1) + "0";
    e -= 1;
    shifts++;
    if (e < -(2 ** (eBits - 1))) throw new Error("fpNormalise: underflow");
  }
  return { mant: m, exp: twos(e, eBits), shifts };
}
/** Largest and smallest normalised magnitudes for a format, and the relative spacing near 1. */
export function fpRange(mBits, eBits) {
  const emax = 2 ** (eBits - 1) - 1;
  const emin = -(2 ** (eBits - 1));
  return {
    maxPositive: (1 - 2 ** -(mBits - 1)) * 2 ** emax,
    minPositive: 0.5 * 2 ** emin,
    mostNegative: -1 * 2 ** emax,
    relativeSpacingAtOne: 2 ** -(mBits - 1),
  };
}

// ---------------------------------------------------------------------------------------------------------------------
// Sizes, media and storage

const UNIT_BYTES = { bytes: 1, KiB: 1024, MiB: 1024 ** 2, GiB: 1024 ** 3, TiB: 1024 ** 4, KB: 1024, MB: 1024 ** 2, GB: 1024 ** 3, TB: 1024 ** 4, "kB(dec)": 1000, "MB(dec)": 1e6, "GB(dec)": 1e9 };
/** Converts bytes to a unit (1024-based for KiB…TiB and for the ZIMSEC names KB…TB; decimal units are the "(dec)" keys). */
export const bytesTo = (bytes, unit) => bytes / UNIT_BYTES[unit];
export const toBytes = (value, unit) => value * UNIT_BYTES[unit];
/** Bitmap size in bits for width × height pixels at colourDepth bits per pixel (plus a header of headerBytes). */
export const bitmapBits = (w, h, colourDepth, headerBytes = 0) => w * h * colourDepth + headerBytes * 8;
/** Colour depth (bits) needed for `colours` different colours. */
export const depthFor = (colours) => Math.ceil(Math.log2(colours));
/** Sound size in bits: rate (Hz) × resolution (bits) × seconds × channels. */
export const soundBits = (rate, resolution, seconds, channels = 1) => rate * resolution * seconds * channels;
/** Seconds to transfer `bits` at `bitRate` bits per second. */
export const transferSeconds = (bits, bitRate) => bits / bitRate;
/** Run-length encoding as text: [[3,"A"],[2,"B"]] → "3A2B" (use rle(items) from above to get the pairs). */
export const rleText = (pairs) => pairs.map(([n, c]) => `${n}${c}`).join("");

// ---------------------------------------------------------------------------------------------------------------------
// Data integrity, hashing, ciphers

/** Parity bit for a bit string: "even" makes the total number of 1s even, "odd" makes it odd. */
export function parityBit(bitsStr, kind = "even") {
  const ones = String(bitsStr).replace(/[^1]/g, "").length;
  return kind === "even" ? String(ones % 2) : String((ones + 1) % 2);
}
/** Modulus-11 check digit for digits with weights from the left (default ISBN-10 weights 10, 9, … 2): { sum, remainder, check } (check "X" for 10). */
export function mod11CheckDigit(digits, weights) {
  const d = String(digits).split("").map(Number);
  const w = weights ?? d.map((_, i) => d.length + 1 - i);
  const sum = d.reduce((s, x, i) => s + x * w[i], 0);
  const check = (11 - (sum % 11)) % 11;
  return { sum, remainder: sum % 11, check: check === 10 ? "X" : String(check) };
}
/** 8-bit checksum of byte values: the sum modulo 256. */
export const checksum8 = (bytes) => bytes.reduce((s, b) => s + b, 0) % 256;
/** Sum of the ASCII codes of a string. */
export const asciiSum = (s) => [...String(s)].reduce((a, ch) => a + ch.charCodeAt(0), 0);
/** Hash by remainder: key mod size (a string key is first reduced to the sum of its ASCII codes). */
export const hashMod = (key, size) => (typeof key === "number" ? key : asciiSum(key)) % size;
/** Caesar cipher on letters (shift may be negative); other characters unchanged. */
export function caesar(text, k) {
  return [...String(text)]
    .map((ch) => {
      const c = ch.charCodeAt(0);
      if (c >= 65 && c <= 90) return String.fromCharCode((((c - 65 + k) % 26) + 26) % 26 + 65);
      if (c >= 97 && c <= 122) return String.fromCharCode((((c - 97 + k) % 26) + 26) % 26 + 97);
      return ch;
    })
    .join("");
}
/** Modular exponentiation (small RSA-style examples): base^exp mod m. */
export function modPow(base, exp, m) {
  let r = 1n;
  let b = BigInt(base) % BigInt(m);
  let e = BigInt(exp);
  while (e > 0n) {
    if (e & 1n) r = (r * b) % BigInt(m);
    b = (b * b) % BigInt(m);
    e >>= 1n;
  }
  return Number(r);
}

// ---------------------------------------------------------------------------------------------------------------------
// Networking

export const ipToInt = (ip) => ip.split(".").reduce((a, o) => a * 256 + Number(o), 0);
export const intToIp = (n) => [24, 16, 8, 0].map((s) => Math.floor(n / 2 ** s) % 256).join(".");
/** Subnet facts for an IPv4 address and prefix length: mask, network, broadcast, first/last host, usable hosts, addresses. */
export function subnet(ip, prefix) {
  const size = 2 ** (32 - prefix);
  const net = Math.floor(ipToInt(ip) / size) * size;
  return {
    mask: intToIp(2 ** 32 - size),
    network: intToIp(net),
    broadcast: intToIp(net + size - 1),
    first: intToIp(net + 1),
    last: intToIp(net + size - 2),
    hosts: Math.max(0, size - 2),
    addresses: size,
  };
}
/** Dotted-binary form of an IPv4 address ("192.168.1.10" → "11000000.10101000.00000001.00001010"). */
export const ipBinary = (ip) => ip.split(".").map((o) => toBase(Number(o), 2, 8)).join(".");
/** Abbreviates a full IPv6 address (eight groups): drops leading zeros, replaces the longest run of 2+ zero groups with "::". */
export function ipv6Abbrev(full) {
  const g = full.split(":").map((x) => x.replace(/^0+(?=.)/, "").toLowerCase());
  if (g.length !== 8) throw new Error("ipv6Abbrev: need eight groups");
  let best = { start: -1, len: 0 };
  for (let i = 0; i < 8; ) {
    if (g[i] === "0") {
      let j = i;
      while (j < 8 && g[j] === "0") j++;
      if (j - i > best.len) best = { start: i, len: j - i };
      i = j;
    } else i++;
  }
  if (best.len < 2) return g.join(":");
  return `${g.slice(0, best.start).join(":")}::${g.slice(best.start + best.len).join(":")}`;
}

// ---------------------------------------------------------------------------------------------------------------------
// Operating systems: scheduling and page replacement

/**
 * CPU scheduling. procs: [{ id: "P1", arrival: 0, burst: 5 }, …]; algo: "FCFS" | "SJF" (non-preemptive) | "SRT" (shortest
 * remaining time, preemptive) | "RR" (round robin with `quantum`; processes arriving during a slice join the queue before
 * the pre-empted process). Returns { gantt: [{ id, start, end }], table: [{ id, arrival, burst, completion, turnaround,
 * waiting }], avgWaiting, avgTurnaround }. Ties go to the earlier arrival, then the lower id; idle time is skipped.
 */
export function schedule(procs, algo, quantum = 2) {
  const ps = procs.map((p) => ({ ...p, rem: p.burst }));
  const done = new Map();
  const slices = [];
  const push = (id, start, end) => {
    const last = slices[slices.length - 1];
    if (last && last.id === id && last.end === start) last.end = end;
    else slices.push({ id, start, end });
  };
  const byArr = (a, b) => a.arrival - b.arrival || String(a.id).localeCompare(String(b.id), undefined, { numeric: true });
  let time = 0;
  if (algo === "FCFS" || algo === "SJF") {
    const pending = [...ps].sort(byArr);
    while (pending.length) {
      const ready = pending.filter((p) => p.arrival <= time);
      if (!ready.length) {
        time = Math.min(...pending.map((p) => p.arrival));
        continue;
      }
      const pick = algo === "FCFS" ? ready.sort(byArr)[0] : ready.sort((a, b) => a.burst - b.burst || byArr(a, b))[0];
      pending.splice(pending.indexOf(pick), 1);
      push(pick.id, time, time + pick.burst);
      time += pick.burst;
      done.set(pick.id, time);
    }
  } else if (algo === "SRT") {
    let left = ps.length;
    let last = null;
    while (left) {
      const ready = ps.filter((p) => p.arrival <= time && p.rem > 0);
      if (!ready.length) {
        time++;
        continue;
      }
      ready.sort((a, b) => a.rem - b.rem || (a.id === last ? -1 : b.id === last ? 1 : 0) || byArr(a, b));
      const p = ready[0];
      push(p.id, time, time + 1);
      p.rem--;
      time++;
      last = p.id;
      if (p.rem === 0) {
        done.set(p.id, time);
        left--;
      }
    }
  } else if (algo === "RR") {
    const incoming = [...ps].sort(byArr);
    const queue = [];
    let idx = 0;
    const admit = () => {
      while (idx < incoming.length && incoming[idx].arrival <= time) queue.push(incoming[idx++]);
    };
    let left = ps.length;
    admit();
    while (left) {
      if (!queue.length) {
        time = incoming[idx].arrival;
        admit();
        continue;
      }
      const p = queue.shift();
      const run = Math.min(quantum, p.rem);
      push(p.id, time, time + run);
      time += run;
      p.rem -= run;
      admit();
      if (p.rem > 0) queue.push(p);
      else {
        done.set(p.id, time);
        left--;
      }
    }
  } else throw new Error(`schedule: unknown algorithm ${algo}`);
  const table = procs.map((p) => {
    const completion = done.get(p.id);
    return { id: p.id, arrival: p.arrival, burst: p.burst, completion, turnaround: completion - p.arrival, waiting: completion - p.arrival - p.burst };
  });
  const avg = (k) => table.reduce((s, r) => s + r[k], 0) / table.length;
  return { gantt: slices, table, avgWaiting: avg("waiting"), avgTurnaround: avg("turnaround") };
}
/** Gantt chart as a Markdown table: one cell per slice with its time span. */
export function ganttMd(gantt) {
  return mdTable(gantt.map((g) => g.id), [gantt.map((g) => `${g.start}–${g.end}`)]);
}
/** Page replacement on a reference string: algo "FIFO" | "LRU" | "OPT". Returns { faults, rows: [{ ref, frames, fault }] }. */
export function pageReplace(refs, frames, algo = "FIFO") {
  const mem = [];
  const rows = [];
  let faults = 0;
  const lastUsed = new Map();
  refs.forEach((r, i) => {
    let fault = false;
    if (!mem.includes(r)) {
      fault = true;
      faults++;
      if (mem.length < frames) mem.push(r);
      else {
        let victim;
        if (algo === "FIFO") victim = mem[0];
        else if (algo === "LRU") victim = [...mem].sort((a, b) => lastUsed.get(a) - lastUsed.get(b))[0];
        else {
          const next = (p) => {
            const j = refs.indexOf(p, i + 1);
            return j < 0 ? Infinity : j;
          };
          victim = [...mem].sort((a, b) => next(b) - next(a))[0];
        }
        mem.splice(mem.indexOf(victim), 1);
        mem.push(r);
      }
    }
    lastUsed.set(r, i);
    rows.push({ ref: r, frames: [...mem], fault });
  });
  return { faults, rows };
}

// ---------------------------------------------------------------------------------------------------------------------
// Assembly language: the Cambridge 9618 instruction set (one accumulator ACC and an index register IX).

/**
 * Assembles and runs a program. source: array of lines such as "START: LDD Count", "      ADD #1", "Count: 0",
 * "Mask: B00001111". Every line takes one memory location, in order, from `base` (default 200); a line is an instruction
 * (LDM LDD LDI LDX LDR MOV STO ADD SUB INC DEC JMP CMP CMI JPE JPN IN OUT END AND OR XOR LSL LSR) or a data value
 * (a number, #n, Bn or &n). Operands: #n denary, Bn binary, &n hexadecimal (do not name a label B followed only by 0 and
 * 1), labels, or absolute addresses. `// comment` is allowed at the end of a line. opts: { input (string for IN), base,
 * width (bits that LSL, LSR and the bitwise instructions keep, default 8), watch ([label|address] cells shown in the
 * trace), maxSteps }. Returns { trace: [{ addr, text, acc, ix, flag, mem }], output, mem (address → value), labels,
 * listing, acc, ix, steps }. Reading an empty location throws.
 */
export function runAsm(source, opts = {}) {
  const base = opts.base ?? 200;
  const width = opts.width ?? 8;
  const maxSteps = opts.maxSteps ?? 5000;
  const mask = 2 ** width - 1;
  const lines = source.map((raw) => {
    const m = /^\s*(?:([A-Za-z_]\w*)\s*:)?\s*(.*?)\s*(?:\/\/.*)?$/.exec(raw);
    return { label: m[1] ?? null, body: m[2], raw };
  });
  const labels = {};
  lines.forEach((l, i) => {
    if (l.label) {
      if (l.label in labels) throw new Error(`runAsm: duplicate label ${l.label}`);
      labels[l.label] = base + i;
    }
  });
  const num = (tok) => {
    if (/^#-?\d+$/.test(tok)) return Number(tok.slice(1));
    if (/^B[01]+$/.test(tok)) return parseInt(tok.slice(1), 2);
    if (/^&[0-9A-Fa-f]+$/.test(tok)) return parseInt(tok.slice(1), 16);
    return null;
  };
  const addr = (tok) => {
    if (tok in labels) return labels[tok];
    if (/^\d+$/.test(tok)) return Number(tok);
    throw new Error(`runAsm: unknown address "${tok}"`);
  };
  const OPS = new Set("LDM LDD LDI LDX LDR MOV STO ADD SUB INC DEC JMP CMP CMI JPE JPN IN OUT END AND OR XOR LSL LSR".split(" "));
  const mem = {};
  const prog = {};
  lines.forEach((l, i) => {
    const a = base + i;
    const [op, ...rest] = l.body.split(/\s+/);
    if (OPS.has(op)) prog[a] = { op, arg: rest.join(" "), text: l.body };
    else {
      const v = /^-?\d+$/.test(l.body) ? Number(l.body) : num(l.body);
      if (v === null) throw new Error(`runAsm: cannot read line "${l.raw}"`);
      mem[a] = v;
    }
  });
  const listing = lines.map((l, i) => ({ addr: base + i, label: l.label, body: l.body }));
  let acc = 0;
  let ix = 0;
  let flag = false;
  let pc = base;
  let out = "";
  let input = opts.input ?? "";
  const trace = [];
  const watch = (opts.watch ?? []).map((w) => (typeof w === "number" ? w : addr(w)));
  const operand = (arg) => {
    const v = num(arg);
    return v !== null ? v : rd(addr(arg));
  };
  const rd = (a) => {
    if (!(a in mem)) throw new Error(`runAsm: read of empty location ${a}`);
    return mem[a];
  };
  let steps = 0;
  for (;;) {
    if (++steps > maxSteps) throw new Error("runAsm: too many steps (infinite loop?)");
    const ins = prog[pc];
    if (!ins) throw new Error(`runAsm: no instruction at ${pc}`);
    const here = pc;
    pc++;
    const { op, arg } = ins;
    switch (op) {
      case "LDM": acc = num(arg); break;
      case "LDD": acc = rd(addr(arg)); break;
      case "LDI": acc = rd(rd(addr(arg))); break;
      case "LDX": acc = rd(addr(arg) + ix); break;
      case "LDR": ix = num(arg); break;
      case "MOV": ix = acc; break;
      case "STO": mem[addr(arg)] = acc; break;
      case "ADD": acc += operand(arg); break;
      case "SUB": acc -= operand(arg); break;
      case "INC": if (arg === "IX") ix++; else acc++; break;
      case "DEC": if (arg === "IX") ix--; else acc--; break;
      case "JMP": pc = addr(arg); break;
      case "CMP": flag = acc === operand(arg); break;
      case "CMI": flag = acc === rd(rd(addr(arg))); break;
      case "JPE": if (flag) pc = addr(arg); break;
      case "JPN": if (!flag) pc = addr(arg); break;
      case "IN": acc = input.length ? input.charCodeAt(0) : 0; input = input.slice(1); break;
      case "OUT": out += String.fromCharCode(acc); break;
      case "AND": acc = (acc & operand(arg)) & mask; break;
      case "OR": acc = (acc | operand(arg)) & mask; break;
      case "XOR": acc = (acc ^ operand(arg)) & mask; break;
      case "LSL": acc = (acc << num(arg)) & mask; break;
      case "LSR": acc = (acc & mask) >>> num(arg); break;
      case "END": break;
      default: throw new Error(`runAsm: unknown opcode ${op}`);
    }
    trace.push({ addr: here, text: ins.text, acc, ix, flag, mem: Object.fromEntries(watch.map((w) => [w, mem[w]])) });
    if (op === "END") break;
  }
  return { trace, output: out, mem, labels, listing, acc, ix, steps };
}
/**
 * Markdown trace of runAsm: Address | Instruction | ACC | IX | (watched cells). opts: { watch: [label|address] (the same
 * cells given to runAsm), ix: false hides IX, flag: true adds the compare flag, bin: true shows ACC as 8-bit binary }.
 */
export function asmTraceMd(result, opts = {}) {
  const watch = (opts.watch ?? []).map((w) => (typeof w === "number" ? w : result.labels[w]));
  const heads = ["Address", "Instruction", "ACC", ...(opts.ix === false ? [] : ["IX"]), ...(opts.flag ? ["Flag"] : []), ...(opts.watch ?? []).map(String)];
  const rows = result.trace.map((t) => [
    t.addr,
    `\`${t.text}\``,
    opts.bin ? toBase(((t.acc % 256) + 256) % 256, 2, 8) : t.acc,
    ...(opts.ix === false ? [] : [t.ix]),
    ...(opts.flag ? [t.flag ? "TRUE" : "FALSE"] : []),
    ...watch.map((w) => (t.mem[w] === undefined ? "" : t.mem[w])),
  ]);
  return mdTable(heads, rows);
}
/** Program listing as Markdown: address, label, instruction or data. */
export function asmListingMd(result) {
  return mdTable(["Address", "Label", "Instruction / data"], result.listing.map((l) => [l.addr, l.label ?? "", `\`${l.body}\``]));
}

// ---------------------------------------------------------------------------------------------------------------------
// Algorithms: traces of searches and sorts, Big O tables, RPN

/** Bubble sort of a copy of arr; improved = stop when a pass makes no swap. Returns { passes: [{ pass, state, swaps, comparisons }], comparisons, swaps, sorted }. */
export function bubbleSort(arr, { improved = true } = {}) {
  const a = [...arr];
  const passes = [];
  let comparisons = 0;
  let swaps = 0;
  const n = a.length;
  for (let p = 1; p < n; p++) {
    let pass = 0;
    let c = 0;
    for (let i = 0; i < n - p; i++) {
      c++;
      if (a[i] > a[i + 1]) {
        [a[i], a[i + 1]] = [a[i + 1], a[i]];
        pass++;
      }
    }
    comparisons += c;
    swaps += pass;
    passes.push({ pass: p, state: [...a], swaps: pass, comparisons: c });
    if (improved && pass === 0) break;
  }
  return { passes, comparisons, swaps, sorted: a };
}
/** Insertion sort: { passes: [{ key, state, shifts, comparisons }], comparisons, shifts, sorted } (one pass per element from the second). */
export function insertionSort(arr) {
  const a = [...arr];
  const passes = [];
  let comparisons = 0;
  let shifts = 0;
  for (let i = 1; i < a.length; i++) {
    const key = a[i];
    let j = i - 1;
    let c = 0;
    let s = 0;
    while (j >= 0) {
      c++;
      if (a[j] > key) {
        a[j + 1] = a[j];
        s++;
        j--;
      } else break;
    }
    a[j + 1] = key;
    comparisons += c;
    shifts += s;
    passes.push({ key, state: [...a], shifts: s, comparisons: c });
  }
  return { passes, comparisons, shifts, sorted: a };
}
/** Quick sort (Lomuto partition, pivot = last element of the sub-list). Returns { steps: [{ sub, pivot, result, pivotIndex }], comparisons, sorted }. */
export function quickSort(arr) {
  const a = [...arr];
  const steps = [];
  let comparisons = 0;
  const qs = (lo, hi) => {
    if (lo >= hi) return;
    const pivot = a[hi];
    let i = lo;
    const before = a.slice(lo, hi + 1);
    for (let j = lo; j < hi; j++) {
      comparisons++;
      if (a[j] < pivot) {
        [a[i], a[j]] = [a[j], a[i]];
        i++;
      }
    }
    [a[i], a[hi]] = [a[hi], a[i]];
    steps.push({ sub: before, pivot, result: a.slice(lo, hi + 1), pivotIndex: i - lo });
    qs(lo, i - 1);
    qs(i + 1, hi);
  };
  qs(0, a.length - 1);
  return { steps, comparisons, sorted: a };
}
/** Linear search: { found, index (0-based), comparisons }. */
export function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) if (arr[i] === target) return { found: true, index: i, comparisons: i + 1 };
  return { found: false, index: -1, comparisons: arr.length };
}
/** Binary search on a sorted array (0-based): { found, index, comparisons, steps: [{ low, high, mid, value }] }. */
export function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;
  const steps = [];
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    steps.push({ low, high, mid, value: arr[mid] });
    if (arr[mid] === target) return { found: true, index: mid, comparisons: steps.length, steps };
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return { found: false, index: -1, comparisons: steps.length, steps };
}
/** Growth table for Big O: rows of { n, log2n, nlog2n, n2, pow2 }. */
export const growthTable = (ns) => ns.map((n) => ({ n, log2n: Math.log2(n), nlog2n: n * Math.log2(n), n2: n * n, pow2: 2 ** n }));
/** Infix tokens (e.g. ["3","+","4","*","2"]) → postfix tokens; operators + - * / ^ and brackets. */
export function toRpn(tokens) {
  const prec = { "+": 1, "-": 1, "*": 2, "/": 2, "^": 3 };
  const right = { "^": true };
  const out = [];
  const ops = [];
  for (const tk of tokens) {
    if (tk in prec) {
      while (ops.length && ops[ops.length - 1] in prec && (prec[ops[ops.length - 1]] > prec[tk] || (prec[ops[ops.length - 1]] === prec[tk] && !right[tk]))) out.push(ops.pop());
      ops.push(tk);
    } else if (tk === "(") ops.push(tk);
    else if (tk === ")") {
      while (ops.length && ops[ops.length - 1] !== "(") out.push(ops.pop());
      if (!ops.length) throw new Error("toRpn: unbalanced brackets");
      ops.pop();
    } else out.push(tk);
  }
  while (ops.length) {
    const o = ops.pop();
    if (o === "(") throw new Error("toRpn: unbalanced brackets");
    out.push(o);
  }
  return out;
}
/** Evaluates postfix tokens of numbers: { value, steps: [{ token, stack }] }. */
export function evalRpn(tokens) {
  const st = [];
  const steps = [];
  for (const tk of tokens) {
    if (["+", "-", "*", "/", "^"].includes(tk)) {
      const b = st.pop();
      const a = st.pop();
      st.push(tk === "+" ? a + b : tk === "-" ? a - b : tk === "*" ? a * b : tk === "/" ? a / b : a ** b);
    } else st.push(Number(tk));
    steps.push({ token: tk, stack: [...st] });
  }
  if (st.length !== 1) throw new Error("evalRpn: malformed expression");
  return { value: st[0], steps };
}

// ---------------------------------------------------------------------------------------------------------------------
// Data structures

/** Binary search tree insert (duplicates go right). Returns the root; nodes are { key, left, right }. */
export function bstInsert(root, key) {
  if (!root) return { key, left: null, right: null };
  if (key < root.key) root.left = bstInsert(root.left, key);
  else root.right = bstInsert(root.right, key);
  return root;
}
export const bstFrom = (keys) => keys.reduce((r, k) => bstInsert(r, k), null);
export const inorder = (n) => (n ? [...inorder(n.left), n.key, ...inorder(n.right)] : []);
export const preorder = (n) => (n ? [n.key, ...preorder(n.left), ...preorder(n.right)] : []);
export const postorder = (n) => (n ? [...postorder(n.left), ...postorder(n.right), n.key] : []);
export const bstHeight = (n) => (n ? 1 + Math.max(bstHeight(n.left), bstHeight(n.right)) : 0);
/** Deletes a key (a node with two children takes the smallest key of its right sub-tree). */
export function bstDelete(root, key) {
  if (!root) return null;
  if (key < root.key) root.left = bstDelete(root.left, key);
  else if (key > root.key) root.right = bstDelete(root.right, key);
  else {
    if (!root.left) return root.right;
    if (!root.right) return root.left;
    let s = root.right;
    while (s.left) s = s.left;
    root.key = s.key;
    root.right = bstDelete(root.right, s.key);
  }
  return root;
}
/** Array representation of a tree built by inserting keys in order: rows { index, key, left, right } (1-based; 0 = null pointer). */
export function bstTable(keys) {
  const rows = keys.map((k) => ({ key: k, left: 0, right: 0 }));
  for (let i = 1; i < keys.length; i++) {
    let j = 0;
    for (;;) {
      const goLeft = keys[i] < rows[j].key;
      const next = goLeft ? rows[j].left : rows[j].right;
      if (next === 0) {
        if (goLeft) rows[j].left = i + 1;
        else rows[j].right = i + 1;
        break;
      }
      j = next - 1;
    }
  }
  return rows.map((r, i) => ({ index: i + 1, ...r }));
}
/** Dijkstra on graph { A: { B: 4, C: 2 }, … } (list undirected edges both ways): { dist, prev, order }; ties by name. */
export function dijkstra(graph, start) {
  const dist = {};
  const prev = {};
  for (const v of Object.keys(graph)) dist[v] = Infinity;
  dist[start] = 0;
  const done = new Set();
  const order = [];
  while (done.size < Object.keys(graph).length) {
    const cand = Object.keys(graph).filter((v) => !done.has(v) && dist[v] < Infinity).sort((a, b) => dist[a] - dist[b] || a.localeCompare(b));
    if (!cand.length) break;
    const u = cand[0];
    done.add(u);
    order.push(u);
    for (const [v, w] of Object.entries(graph[u])) {
      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        prev[v] = u;
      }
    }
  }
  return { dist, prev, order };
}
/** The path from start to end following a prev map, as an array of nodes (null if unreachable). */
export function pathTo(prev, start, end) {
  const p = [end];
  while (p[0] !== start) {
    if (!(p[0] in prev)) return null;
    p.unshift(prev[p[0]]);
  }
  return p;
}
/** A*: h is { node: estimate }. Returns { path, cost, expanded: [node], log: [{ node, g, h, f }] }; ties by lower h then name. */
export function aStar(graph, start, goal, h) {
  const g = { [start]: 0 };
  const prev = {};
  const open = new Set([start]);
  const closed = new Set();
  const expanded = [];
  const log = [];
  while (open.size) {
    const u = [...open].sort((a, b) => g[a] + h[a] - (g[b] + h[b]) || h[a] - h[b] || a.localeCompare(b))[0];
    open.delete(u);
    expanded.push(u);
    log.push({ node: u, g: g[u], h: h[u], f: g[u] + h[u] });
    if (u === goal) return { path: pathTo(prev, start, goal), cost: g[u], expanded, log };
    closed.add(u);
    for (const [v, w] of Object.entries(graph[u])) {
      if (closed.has(v)) continue;
      if (g[v] === undefined || g[u] + w < g[v]) {
        g[v] = g[u] + w;
        prev[v] = u;
        open.add(v);
      }
    }
  }
  return { path: null, cost: Infinity, expanded, log };
}

// ---------------------------------------------------------------------------------------------------------------------
// Logic: equivalence, Karnaugh maps and minimisation

/** True when two truth functions agree on every input row. */
export function equivalent(inputs, f, g) {
  return truthRows(inputs, f).every((r) => r.out === (g(...r.vals) ? 1 : 0));
}
/** Minterm numbers (first input = most significant bit) where fn is 1. */
export const minterms = (inputs, fn) => truthRows(inputs, fn).flatMap((r, i) => (r.out ? [i] : []));
const GRAY = ["00", "01", "11", "10"];
/** Karnaugh map as a Markdown table (2, 3 or 4 variables): rows use the first variable(s), columns the rest, in Gray order. */
export function kmapMd(inputs, fn) {
  const n = inputs.length;
  if (n < 2 || n > 4) throw new Error("kmapMd: 2 to 4 variables");
  const rowBits = n === 4 ? 2 : 1;
  const colBits = n - rowBits;
  const rowLabels = rowBits === 2 ? GRAY : ["0", "1"];
  const colLabels = colBits === 2 ? GRAY : ["0", "1"];
  const rows = rowLabels.map((rl) => [rl, ...colLabels.map((cl) => (fn(...(rl + cl).split("").map(Number)) ? 1 : 0))]);
  return mdTable([`${inputs.slice(0, rowBits).join("")} ↓ / ${inputs.slice(rowBits).join("")} →`, ...colLabels], rows);
}
/** Quine-McCluskey minimisation to a sum of products (≤ 5 variables). Returns { terms, expression, primes } written with AND, OR and NOT. A minimal cover is not always unique. */
export function minimise(inputs, ones, dontCares = []) {
  const n = inputs.length;
  let terms = [...new Set([...ones, ...dontCares])].map((m) => ({ bits: toBase(m, 2, n), covers: new Set([m]) }));
  const primes = [];
  while (terms.length) {
    const used = new Set();
    const next = new Map();
    for (let i = 0; i < terms.length; i++) {
      for (let j = i + 1; j < terms.length; j++) {
        const a = terms[i].bits;
        const b = terms[j].bits;
        let diff = -1;
        let ok = true;
        for (let k = 0; k < n; k++) {
          if (a[k] !== b[k]) {
            if (a[k] === "-" || b[k] === "-" || diff >= 0) {
              ok = false;
              break;
            }
            diff = k;
          }
        }
        if (ok && diff >= 0) {
          const bits = a.slice(0, diff) + "-" + a.slice(diff + 1);
          used.add(i);
          used.add(j);
          next.set(bits, { bits, covers: new Set([...terms[i].covers, ...terms[j].covers]) });
        }
      }
    }
    terms.forEach((tm, i) => {
      if (!used.has(i) && !primes.some((p) => p.bits === tm.bits)) primes.push(tm);
    });
    terms = [...next.values()];
  }
  const need = new Set(ones);
  const chosen = [];
  const covered = new Set();
  for (const m of ones) {
    const ps = primes.filter((p) => p.covers.has(m));
    if (ps.length === 1 && !chosen.includes(ps[0])) {
      chosen.push(ps[0]);
      ps[0].covers.forEach((c) => covered.add(c));
    }
  }
  while ([...need].some((m) => !covered.has(m))) {
    const gain = (p) => [...p.covers].filter((c) => need.has(c) && !covered.has(c)).length;
    const best = primes.filter((p) => !chosen.includes(p)).sort((a, b) => gain(b) - gain(a))[0];
    chosen.push(best);
    best.covers.forEach((c) => covered.add(c));
  }
  const fmt = (p) => {
    const lits = [];
    for (let k = 0; k < n; k++) if (p.bits[k] !== "-") lits.push(p.bits[k] === "1" ? inputs[k] : `NOT ${inputs[k]}`);
    return lits.length ? lits.join(" AND ") : "1";
  };
  const termsOut = chosen.map(fmt).sort();
  const expression = ones.length === 0 ? "0" : termsOut.length > 1 ? termsOut.map((x) => (x.includes(" AND ") ? `(${x})` : x)).join(" OR ") : termsOut[0];
  return { terms: termsOut, expression, primes: primes.map(fmt).sort() };
}

// ---------------------------------------------------------------------------------------------------------------------
// Machine learning, electronics

/** Least-squares line through (xs, ys): { slope, intercept }. */
export function leastSquares(xs, ys) {
  const n = xs.length;
  const sx = xs.reduce((a, b) => a + b, 0);
  const sy = ys.reduce((a, b) => a + b, 0);
  const sxy = xs.reduce((a, x, i) => a + x * ys[i], 0);
  const sxx = xs.reduce((a, x) => a + x * x, 0);
  const slope = (n * sxy - sx * sy) / (n * sxx - sx * sx);
  return { slope, intercept: (sy - slope * sx) / n };
}
/** A neuron: weighted sum + bias through an activation ("step" | "sigmoid" | "relu"). Returns { sum, output }. */
export function neuron(inputs, weights, bias, activation = "step") {
  const sum = inputs.reduce((s, x, i) => s + x * weights[i], 0) + bias;
  const output = activation === "step" ? (sum >= 0 ? 1 : 0) : activation === "relu" ? Math.max(0, sum) : 1 / (1 + Math.exp(-sum));
  return { sum, output };
}
export const seriesR = (...rs) => rs.reduce((a, b) => a + b, 0);
export const parallelR = (...rs) => 1 / rs.reduce((a, b) => a + 1 / b, 0);

// ---------------------------------------------------------------------------------------------------------------------
// Running real code: Python programs and SQL queries. Use these so every printed output is the real output.

/**
 * Runs Python 3 code and returns its standard output (final newline removed). stdin is optional input text. Throws with
 * stderr if the program fails or takes more than 10 seconds. Console-mode programs only.
 */
export function py(code, stdin = "") {
  const r = spawnSync("python", ["-X", "utf8", "-c", code], { input: stdin, encoding: "utf8", timeout: 10000, env: { ...process.env, PYTHONIOENCODING: "utf-8" } });
  if (r.error) throw new Error(`py: ${r.error.message}`);
  if (r.status !== 0) throw new Error(`py: exit ${r.status}\n${r.stderr}`);
  return r.stdout.replace(/\r\n/g, "\n").replace(/\n$/, "");
}
/** Runs Python and returns { code: fenced python block, output: fenced output block, text } ready to paste into a lesson. */
export function pyBlock(code, stdin = "") {
  const text = py(code, stdin);
  return { code: codeBlock(code, "python"), output: codeBlock(text), text };
}
/**
 * Runs SQL on a throw-away in-memory SQLite database: sql(setupStatements, query) → { columns, rows (arrays), count, md
 * (Markdown table) }. SQLite differs from the 9618 SQL in small ways (flexible types; no separate BOOLEAN or DATE
 * storage); keep queries to the 9618 subset (SELECT … FROM … WHERE … ORDER BY … GROUP BY … INNER JOIN, SUM, COUNT, AVG,
 * INSERT INTO, UPDATE, DELETE FROM). Node prints an "ExperimentalWarning" for node:sqlite once: ignore it.
 */
export function sql(setup, query) {
  const db = new DatabaseSync(":memory:");
  try {
    db.exec(setup);
    const stmt = db.prepare(query);
    const objs = stmt.all();
    let columns;
    try {
      columns = stmt.columns().map((c) => c.name);
    } catch {
      columns = objs.length ? Object.keys(objs[0]) : [];
    }
    const rows = objs.map((o) => columns.map((c) => o[c]));
    return { columns, rows, count: rows.length, md: mdTable(columns, rows.map((r) => r.map((v) => (v === null ? "NULL" : v)))) };
  } finally {
    db.close();
  }
}
/** Runs the setup, then a data-changing statement (INSERT/UPDATE/DELETE), then a SELECT that shows the table afterwards. */
export const sqlAfter = (setup, change, select) => sql(`${setup};\n${change};`, select);
