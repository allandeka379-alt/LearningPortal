// Authoring helpers for computer-science-o questions and flashcards (adapted from .scratch/english/lib.mjs, with the
// numeric builders of .scratch/combined-science/lib.mjs and number-base / logic helpers that COMPUTE every answer).
// Concept modules call concept(...) with a builder; build-content.mjs writes the JSON files.
// Strings are Markdown. Pseudocode goes in fenced code blocks (```), operators and identifiers in `inline code`.
// Outside code, a literal dollar sign must be written US\\$ (a dollar starts maths). Template literals: t`...` keeps
// backslashes as typed.
export const t = String.raw;

// Selectors for `applies` (an item is tagged only to the syllabi it names). Default (no applies): every syllabus that
// covers the item's concepts, so items on single-board concepts need no selector.
export const ZIM = ["zimsec"];
export const CAM = ["cambridge/igcse/computer-science"];

const OPTION_KEYS = ["A", "B", "C", "D", "E", "F"];
const DEFAULT_NORMALISE = ["trim", "lowercase", "collapse_whitespace", "strip_punctuation"];

// ---------------------------------------------------------------------------------------------------------------------
// Units for NUMERICAL / CALCULATION answers: display hint + accepted spellings (a missing unit is fine, an unknown one
// costs a mark). Cambridge uses 1024-based KiB/MiB/GiB; ZIMSEC uses KB/MB/GB (state the factor in the stem).
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
  s: ["s", "seconds", "second", "sec", "secs"],
  min: ["min", "minutes", "mins"],
  Hz: ["Hz", "hertz"],
  kHz: ["kHz", "kilohertz"],
  pixels: ["pixels", "pixel", "px"],
  characters: ["characters", "character", "chars"],
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
  /** options: [[content, rationale], ...]; answer: "A" or ["A","C"] (multiple). */
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
   * Short answer, auto-marked. accepted: exact answers (strings or {value, marks, feedback}); keywords: {all, any, minAny};
   * patterns: anchored regexes; rejected: answers that never score. model: the response that must score full marks
   * (defaults to the first accepted answer).
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
   * Fill in the blank. template uses {{blank:id}}; blanks: [{ id, accepted: [...], choices?, wrong? }]. Text blanks
   * ignore case and punctuation. A blank with `choices` is a drop-down (select).
   */
  fib({ label, marks, stem, template, blanks, wrong, explanation, hints }) {
    const part = { label, type: "FILL_IN_THE_BLANK", marks: marks ?? blanks.length, stem };
    part.payload = {
      template,
      blanks: blanks.map((b) => {
        const o = { id: b.id };
        if (b.input === "number") o.input = "number";
        if (b.choices) {
          o.input = "select";
          o.choices = b.choices;
        }
        return o;
      }),
    };
    part.answerSpec = {
      blanks: blanks.map((b) => {
        const o = { id: b.id, accepted: b.accepted.map(String) };
        if (b.marks !== undefined) o.marks = b.marks;
        if (b.normalise) o.normalise = b.normalise;
        else if (!b.choices) o.normalise = ["trim", "collapse_whitespace", "strip_punctuation"];
        return o;
      }),
    };
    if (explanation) part.explanation = explanation;
    if (hints) part.hints = hints;
    const model = { type: "FILL_IN_THE_BLANK", blanks: blanks.map((b) => ({ blankId: b.id, text: String(b.accepted[0]) })) };
    const wrongRows = wrong ?? [blanks.map((b) => b.wrong ?? (b.choices ? b.choices.find((c) => !b.accepted.includes(c)) : "xyz"))];
    const wrongResponses = wrongRows.map((w) => ({ type: "FILL_IN_THE_BLANK", blanks: blanks.map((b, i) => ({ blankId: b.id, text: String(w[i]) })) }));
    return { part, model, wrong: wrongResponses };
  },
  /**
   * Matching: pairs [[left, right], ...] matched by position. `rightIndex` (optional) maps each left item to an index
   * of `right` when several left items share right items (multiple matching): then `right` lists the options.
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
   * Self-marked written part: points are "description" (1 mark) or [description, marks, indicators?]; they must add up
   * to the part's marks. type SHORT_ANSWER (default) or EXTENDED_RESPONSE (with wordLimit and modelAnswer).
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
};

// ---------------------------------------------------------------------------------------------------------------------
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
      estimatedSeconds: secs ?? Math.max(30, m * 60),
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
    if (paper) q.paper = paper;
    if (calculator !== undefined) q.calculator = calculator;
    if (access) q.access = access;
    if (!q.explanation) throw new Error(`${q.key}: explanation required`);
    if (d >= 3 && !q.hints) throw new Error(`${q.key}: difficulty ${d} needs hints`);
    if (daily && (d < 2 || d > 3)) throw new Error(`${q.key}: daily questions need difficulty 2-3`);
    questions.push(q);
    return q;
  }

  const b = {
    mcq: (o) => finish(P.mcq(o), o),
    num: (o) => finish(P.num(o), o),
    /** CALCULATION: like num, with a workedSolution (numbered steps) shown after marking. */
    calc: (o) => finish(P.num({ ...o, type: "CALCULATION" }), o),
    bits: (o) => finish(P.bits(o), o),
    truth: (o) => finish(P.truth(o), o),
    tf: (o) => finish(P.tf(o), o),
    short: (o) => finish(P.short(o), o),
    fib: (o) => finish(P.fib(o), o),
    match: (o) => finish(P.match(o), o),
    /** Short self-marked answer (explain / suggest): { stem, marks, points, modelAnswer }. */
    manualShort: (o) => finish(P.manual({ ...o, label: undefined, type: "SHORT_ANSWER" }), o),
    /** Extended response, self-marked: { stem, marks, points, levels?, modelAnswer, wordLimit: {min?, max?} }. */
    ext: (o) => finish(P.manual({ ...o, label: undefined, type: "EXTENDED_RESPONSE" }), o),
    /** Essay (composition), self-marked: same fields as ext. */
    essay: (o) => finish(P.manual({ ...o, label: undefined, type: "ESSAY" }), o),
    /** Structured (passage-based): parts = [P.xxx({ label, ... }), ...]; marks = sum of parts. */
    struct(o) {
      const parts = o.parts;
      const part = { type: "STRUCTURED", stem: o.stem, marks: parts.reduce((s, p) => s + p.part.marks, 0) };
      const q = finish({ part, model: null, wrong: [] }, { ...o, marks: part.marks });
      const modelParts = {};
      const wrongParts = {};
      for (const p of parts) {
        if (p.model) modelParts[p.part.label] = p.model;
        if (p.wrong[0]) wrongParts[p.part.label] = p.wrong[0];
      }
      const ordered = {};
      for (const [k, v] of Object.entries(q)) {
        if (k === "explanation") ordered.parts = parts.map((p) => p.part);
        ordered[k] = v;
      }
      if (Object.keys(modelParts).length) ordered.modelResponse = { type: "STRUCTURED", parts: modelParts };
      if (Object.keys(wrongParts).length) ordered.wrongResponses = [{ type: "STRUCTURED", parts: wrongParts }];
      for (const k of ["skill", "dailyEligible", "examStyle", "applies", "paper", "calculator", "access"]) {
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

// ---------------------------------------------------------------------------------------------------------------------
/**
 * Levels for the self-marked 15-mark Cambridge Paper 2 scenario question (our own wording, in the style of a levels
 * mark scheme). Returns [level, min, max, descriptor]. Use with points that add up to 15.
 */
export const SCENARIO_LEVELS = [
  [4, 13, 15, "A complete, well-structured algorithm: every requirement is met, data structures are used correctly, loops and selection are correct, input is validated where asked, and output is clear and in the requested format."],
  [3, 9, 12, "Most requirements met with a clear structure; one or two minor logic errors or omissions."],
  [2, 5, 8, "Some requirements met; an attempt at the main loop or processing, but with logic errors or missing parts."],
  [1, 1, 4, "A few relevant statements (declarations, inputs or outputs) without a working overall algorithm."],
  [0, 0, 0, "No creditable response."],
];
