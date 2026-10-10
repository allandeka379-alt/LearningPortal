// Authoring helpers for economics-a questions and flashcards (A-level structure from .scratch/biology-a/lib.mjs: exam
// plans, sub-parts; numeric kinds and economics helpers from .scratch/economics/lib.mjs, itself from
// .scratch/accounting/lib.mjs and the unit-aware numeric builders of .scratch/combined-science/lib.mjs). Concept modules
// call concept(...) with a builder; build-content.mjs writes the JSON files. Economics helpers at the end: money and
// table formatting, elasticities, linear markets (surplus, tax incidence), costs and revenue, labour markets,
// monopoly and price discrimination, game theory, national income, multiplier, banking, trade, development, Gini/HDI,
// cost-benefit, descriptive statistics, and the exam-format plans (EXAM).
//
// TEXT: write Markdown with t`...` (String.raw), so backslashes are single in the source (t`$\Delta Q$`) and
// JSON.stringify doubles them in the files. In a normal "..." string you would have to write "\\Delta". t also turns a
// typed "\n" that is NOT followed by a lower-case letter into a real line break (so "\n\nNext" works, while LaTeX such
// as \neq, \nu and \nabla stays intact). A "\n" followed by a lower-case letter (a break before a lower-case word) would
// stay literal: use a real line break in the template there. Check built text with
// `node .scratch/tools/literal-newlines.mjs economics-a`. Money is US\$ (a bare $ starts maths).
//
// EVERY number in an answer, a mark scheme or a data table you invent is computed in code with these helpers and passed
// EXACT to the builders; the builders round for display and set a tolerance that accepts every correctly rounded answer.
// Never type a computed value by hand: use chk(...) to assert a value you also write in prose. All data is ILLUSTRATIVE
// (original, plausible and labelled "illustrative" or "fictional"): never present invented figures as real statistics.
export const t = (strings, ...values) => String.raw(strings, ...values).replace(/\\n(?![a-z])/g, "\n");

// Selectors for `applies` (an item is tagged only to the syllabi it names). Omit applies for content valid for both.
export const ZIM = ["zimsec"];
export const CAM = ["cambridge/a-level/economics"];

const OPTION_KEYS = ["A", "B", "C", "D", "E", "F"];
const DEFAULT_NORMALISE = ["trim", "lowercase", "collapse_whitespace", "strip_punctuation"];
const PART_LABEL = /^\((?:[a-z]{1,2}|[ivx]{1,6}|\d{1,2})\)$/;

// ---------------------------------------------------------------------------------------------------------------------
// Rounding and verification

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
/** Number of decimal places that gives n significant figures for x. */
export function dpFor(x, n) {
  if (x === 0) return n - 1;
  return n - 1 - Math.floor(Math.log10(Math.abs(x)));
}
function guardBoundary(x, dp, margin, label) {
  const scaled = Math.abs(x) * 10 ** dp;
  const frac = scaled - Math.floor(scaled);
  if (Math.abs(frac - 0.5) < margin) throw new Error(`BOUNDARY ${label}: ${x} is too close to a rounding boundary at ${dp} d.p.; change the data`);
}
/** Rounds x to dp d.p. (throws near a rounding boundary); asserts `written` when given. */
export function rnd(x, dp, written, label = "") {
  guardBoundary(x, dp, 0.08, label);
  const v = round(x, dp);
  if (written !== undefined) chk(v, written, 1e-9, label);
  return v;
}
/** Rounds x to n significant figures (throws near a rounding boundary); asserts `written` when given. */
export function sf(x, n = 3, written, label = "") {
  const dp = dpFor(x, n);
  guardBoundary(x, dp, 0.08, label);
  const v = Number(x.toPrecision(n));
  if (written !== undefined) chk(v, written, 1e-9, label);
  return v;
}
export const halfUnit = (dp) => 0.5 * 10 ** -dp;
/** Display string of x to n s.f. (no exponent notation; trailing zeros kept, e.g. 2.50). */
export function sfStr(x, n = 3) {
  const dp = dpFor(x, n);
  return dp > 0 ? round(x, dp).toFixed(dp) : String(round(x, dp));
}
/** Display string of x to dp decimal places, with a true minus sign for negatives (−0.25). */
export const dpStr = (x, dp) => {
  const s = round(x, dp).toFixed(dp);
  return s.startsWith("-") ? `−${s.slice(1)}` : s;
};

// ---------------------------------------------------------------------------------------------------------------------
// Numeric answers. `kind` (optional) sets the answer-box decoration and the default rounding:
//   money: prefix "US$"; whole dollars exact, otherwise cents (±0.005).
//   pct: unit hint "%"; dp default 1.        elasticity: dp default 2 (PED, PES, YED, XED, multiplier, Gini, HDI use dp 2-3).
//   index: dp default 1 (price indices, terms of trade).     ratio: unit hint ": 1"; dp default 2.
//   times: unit hint "times"; dp default 1.  plain (default): integers exact, other values 3 significant figures.
// `dp` fixes decimal places, `sf` significant figures, `tol` overrides everything (absolute). `unit` (a key of UNITS)
// adds a unit hint and the accepted spellings (units optional for the student); `prefix` e.g. "US$". Say in the stem
// whether the minus sign is wanted for a PED ("include the minus sign"): the box accepts one value only, so -0.75 and
// 0.75 are different answers. The value must be the EXACT computed value; the model response is the correctly rounded one.
// Throws when the value sits too close to a rounding boundary (change the data).
const KINDS = {
  money: { prefix: "US$" },
  pct: { unitHint: "%", dp: 1 },
  elasticity: { dp: 2 },
  index: { dp: 1 },
  ratio: { unitHint: ": 1", dp: 2 },
  times: { unitHint: "times", dp: 1 },
  plain: {},
};
export const roundTo = (v, dp) => Number((Math.round((v + Number.EPSILON) * 10 ** dp) / 10 ** dp).toFixed(dp));

// Units: display hint + accepted spellings (units optional: a missing unit is fine). Ask the coordinator to add one.
const UNITS = {
  "%": ["%", "percent", "per cent"],
  "percentage points": ["percentage points", "percentage point", "pp", "ppt"],
  "US$": ["US$", "USD", "$", "dollars", "US dollars"],
  "US$ thousand": ["US$ thousand", "US$000", "$000", "thousand dollars", "US$ thousands"],
  "US$ million": ["US$ million", "US$m", "$m", "million dollars", "USD million", "US$ millions"],
  "US$ billion": ["US$ billion", "US$bn", "$bn", "billion dollars", "USD billion"],
  "US$ per unit": ["US$ per unit", "US$/unit", "$ per unit", "dollars per unit"],
  "US$ per tonne": ["US$ per tonne", "US$/tonne", "$ per tonne", "dollars per tonne"],
  "US$ per hour": ["US$ per hour", "US$/hour", "$ per hour", "dollars per hour"],
  "currency units": ["currency units", "LCU", "units of currency", "units"],
  units: ["units", "unit", "items"],
  "units per week": ["units per week", "units/week", "per week"],
  "units per hour": ["units per hour", "units/hour", "per hour"],
  tonnes: ["tonnes", "tonne", "t", "metric tonnes"],
  kg: ["kg", "kilograms", "kilogram"],
  litres: ["litres", "litre", "l", "L"],
  workers: ["workers", "worker", "people", "persons", "employees"],
  hours: ["hours", "hour", "h", "hrs"],
  months: ["months", "month"],
  years: ["years", "year", "y", "yr"],
  "index points": ["index points", "points", "index"],
  "per 1,000": ["per 1,000", "per 1000", "per thousand", "‰"],
  "people": ["people", "persons", "individuals"],
  "months of imports": ["months of imports", "months"],
  "× 100": ["× 100", "x 100"],
};

function guardBoundary2(x, dp, margin, label) {
  const scaled = Math.abs(x) * 10 ** dp;
  const frac = scaled - Math.floor(scaled);
  if (Math.abs(frac - 0.5) < margin) throw new Error(`BOUNDARY ${label}: ${x} is too close to a rounding boundary at ${dp} d.p.; change the data`);
}

function numericSpec({ kind, value, unit, dp, sf: nsf, tol }) {
  if (typeof value !== "number" || !Number.isFinite(value)) throw new Error(`numeric value must be a finite number (got ${value})`);
  if (unit && !UNITS[unit]) throw new Error(`Unknown unit ${unit} (ask the coordinator to add it to UNITS in lib.mjs)`);
  if (kind && !KINDS[kind]) throw new Error(`Unknown numeric kind ${kind}`);
  const k = kind ? KINDS[kind] : {};
  const isInt = Math.abs(value - Math.round(value)) < 1e-12;
  let model;
  const places = dp ?? (nsf === undefined ? k.dp ?? (kind === "money" && !isInt ? 2 : undefined) : undefined);
  if (tol === undefined) {
    if (places !== undefined) {
      if (!isInt) guardBoundary2(value, places, 0.05, `value ${value}`);
      tol = isInt && places === 0 ? 0 : kind === "money" && isInt ? 0 : halfUnit(places);
      model = dpStr(value, places).replace("−", "-");
    } else if (nsf !== undefined || !isInt) {
      const n = nsf ?? 3;
      const pl = dpFor(value, n);
      guardBoundary2(value, pl, 0.05, `value ${value}`);
      tol = halfUnit(pl);
      model = sfStr(value, n);
    } else {
      tol = 0;
      model = String(Math.round(value));
    }
  }
  if (model === undefined) model = isInt ? String(Math.round(value)) : sfStr(value, 3);
  const spec = { value: isInt ? Math.round(value) : value };
  if (tol) spec.tolerance = { kind: "absolute", amount: Number(tol.toPrecision(3)) };
  const payload = {};
  if (k.prefix) payload.answerPrefix = k.prefix;
  if (k.unitHint) payload.unitHint = k.unitHint;
  if (unit) {
    payload.unitHint = unit;
    spec.units = { required: false, accepted: UNITS[unit] };
  }
  return { spec, payload, model };
}

// ---------------------------------------------------------------------------------------------------------------------
/** Part builders (used inside struct parts and to build top-level questions). Each returns { part, model, wrong[] }. */
export const P = {
  /**
   * Numerical answer (NUMERICAL) or, with type "CALCULATION", a multi-step calculation (workedSolution defaults to the
   * explanation). { kind?, value (exact), dp?, sf?, tol?, unit?, prefix?, answer? (model text),
   * wrong: [values] }.
   */
  num({ label, marks = 1, stem, kind, value, dp, sf: nsf, tol, unit, prefix, answer, wrong = [], explanation, workedSolution, hints, type = "NUMERICAL" }) {
    const { spec, payload, model } = numericSpec({ kind, value, unit, dp, sf: nsf, tol });
    const part = { label, type, marks, stem };
    if (prefix) payload.answerPrefix = prefix;
    if (Object.keys(payload).length) part.payload = payload;
    part.answerSpec = spec;
    if (explanation) part.explanation = explanation;
    const ws = workedSolution ?? (explanation ? `1. ${explanation}` : undefined);
    if (ws) part.workedSolution = ws;
    if (hints) part.hints = hints;
    return { part, model: { type, value: answer ?? model }, wrong: wrong.map((w) => ({ type, value: String(w) })) };
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
// Exam-format plans (BRIEF.md, exam-format table). Items worth a reserved total (STRUCTURED 20 or 25 marks, ESSAY 20
// marks) must be examStyle, carry the plan's skill and applies, and (when the plan fixes them) its part labels, marks or
// number of parts. Practice STRUCTURED items use 6, 8, 10, 12, 14 or 16 marks; practice essays use b.ext (EXTENDED_RESPONSE).
export const EXAM = {
  /** ZIMSEC Paper 2: one of the two compulsory 20-mark data-response questions; 4-6 parts (a), (b), ... on a data stimulus. */
  ZIM_P2_DATA: { type: "STRUCTURED", total: 20, skill: "ANALYSIS", applies: ZIM, minParts: 4, maxParts: 6, secs: 1800 },
  /** ZIMSEC Paper 3: one of 12 essays (answer 4, 100 marks): (a) 10 explain/analyse + (b) 15 discuss/evaluate, self-marked. */
  ZIM_P3_ESSAY: { type: "STRUCTURED", total: 25, skill: "EVALUATION", labels: ["(a)", "(b)"], marks: [10, 15], applies: ZIM, secs: 2700 },
  /** Cambridge Paper 2 Section A: the AS data-response question, approximately six parts (a)-(f). AS concepts only. */
  CAM_P2_DATA: { type: "STRUCTURED", total: 20, skill: "ANALYSIS", applies: CAM, nParts: 6, secs: 2100 },
  /** Cambridge Paper 2 Sections B and C: an AS essay in two parts, (a) 8 + (b) 12, levels-marked. AS concepts only. */
  CAM_P2_ESSAY: { type: "STRUCTURED", total: 20, skill: "EVALUATION", labels: ["(a)", "(b)"], marks: [8, 12], applies: CAM, secs: 2100 },
  /** Cambridge Paper 4 Section A: the A Level data-response question, four parts (a)-(d). A Level concepts. */
  CAM_P4_DATA: { type: "STRUCTURED", total: 20, skill: "ANALYSIS", applies: CAM, nParts: 4, secs: 2100 },
  /** Cambridge Paper 4 Sections B and C: an unstructured A Level essay of 20 marks (one ESSAY item, no parts), levels-marked. */
  CAM_P4_ESSAY: { type: "ESSAY", total: 20, skill: "EVALUATION", applies: CAM, secs: 2100 },
};
/** Reserved totals by item type: only exam-format items may use them. */
export const RESERVED_MARKS = { STRUCTURED: [20, 25], ESSAY: [20] };

/** Throws when an exam item's parts do not match its plan's fixed labels, marks or number of parts (total always). */
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
  if (plan.nParts !== undefined && parts.length !== plan.nParts) throw new Error(`exam item has ${parts.length} parts, plan needs ${plan.nParts}`);
  if (plan.minParts !== undefined && (parts.length < plan.minParts || parts.length > plan.maxParts)) throw new Error(`exam item has ${parts.length} parts, plan needs ${plan.minParts}-${plan.maxParts}`);
  return parts;
}


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
    if ((RESERVED_MARKS[q.type] ?? []).includes(m)) {
      const plans = Object.entries(EXAM).filter(([, p]) => p.type === q.type && p.total === m && p.skill === q.skill);
      if (!examStyle || !plans.length) throw new Error(`${q.key}: a ${q.type} item worth ${m} marks must be an exam-format item (examStyle and the skill of an EXAM plan); practice STRUCTURED items use 6, 8, 10, 12, 14 or 16 marks and practice essays use b.ext`);
      if (!plans.some(([, p]) => JSON.stringify(q.applies) === JSON.stringify(p.applies))) throw new Error(`${q.key}: exam items worth ${m} marks need applies ${plans.map(([n, p]) => n + " " + JSON.stringify(p.applies)).join(" or ")}`);
    }
    questions.push(q);
    return q;
  }

  const b = {
    mcq: (o) => finish(P.mcq(o), o),
    /** Numerical answer: { kind? (money|pct|elasticity|index|ratio|times|plain), value (exact), dp?, sf?, tol?, unit?, prefix?, wrong: [...] }. */
    num: (o) => finish(P.num(o), o),
    /** Calculation (working shown in workedSolution, defaults to the explanation): same fields as num. */
    calc: (o) => finish(P.num({ ...o, type: "CALCULATION" }), o),
    tf: (o) => finish(P.tf(o), o),
    short: (o) => finish(P.short(o), o),
    fib: (o) => finish(P.fib(o), o),
    match: (o) => finish(P.match(o), o),
    /** Short self-marked answer (explain / describe / suggest): { stem, marks, points, modelAnswer }. */
    manualShort: (o) => finish(P.manual({ ...o, label: undefined, type: "SHORT_ANSWER" }), o),
    /** Extended response, self-marked: { stem, marks, points, levels?, modelAnswer, wordLimit: {min?, max?} }. */
    ext: (o) => finish(P.manual({ ...o, label: undefined, type: "EXTENDED_RESPONSE" }), o),
    /** Essay (composition), self-marked: same fields as ext. The Cambridge Paper 4 essay is b.essay with the CAM_P4_ESSAY plan. */
    essay: (o) => finish(P.manual({ ...o, label: undefined, type: "ESSAY" }), o),
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

// ---------------------------------------------------------------------------------------------------------------------
// Economics helpers with built-in arithmetic checks. Every helper returns Markdown (money written US\$ with a single
// backslash, which is right both pasted into a lesson .md file and inside a JSON string, since JSON.stringify doubles
// it). They THROW when the figures are inconsistent, so a table that renders is a table that adds up. To print one for
// a lesson, write a small script in .scratch/economics-a/tables/<prefix><name>.mjs (NOT in slices/: every .mjs there is
// imported by the build) that imports these helpers and console.logs the output, and paste it.
// Diagrams are never drawn: describe them in words ("the supply curve shifts to the left") and show the numbers in a
// schedule. Data is original and clearly fictional ("Country X", "a fictional town"), never real statistics.

const EPS = 0.004;
export const r2 = (v) => roundTo(v, 2);
export const sum = (xs) => r2(xs.reduce((s, x) => s + (Number(x) || 0), 0));
/** Throws unless a and b are equal to the cent (or within `eps`). */
export function check(label, a, b, eps = EPS) {
  if (Math.abs(a - b) > eps) throw new Error(`check failed: ${label}: ${a} != ${b}`);
  return true;
}

/** 1250 → "1,250"; 1250.5 → "1,250.50"; -300 → "−300" (true minus sign). Strings pass through. dp fixes decimals. */
export function fmt(n, dp) {
  if (n === null || n === undefined || n === "") return "";
  if (typeof n === "string") return n;
  const neg = n < 0;
  const a = Math.abs(dp === undefined ? r2(n) : roundTo(n, dp));
  const places = dp ?? (Number.isInteger(a) ? 0 : 2);
  const s = a.toLocaleString("en-GB", { minimumFractionDigits: places, maximumFractionDigits: places });
  return neg ? `−${s}` : s;
}
/** Money in running text: money(1250) → "US\$1,250"; money(-300) → "−US\$300" (say deficit / loss in words too). */
export function money(n, dp) {
  if (typeof n !== "number" || !Number.isFinite(n)) throw new Error(`money(): pass a number (got ${n})`);
  return `${n < 0 ? "−" : ""}US\\$${fmt(Math.abs(n), dp)}`;
}
/** Percentage in running text: pct(12.5) → "12.5%"; pct(3, 1) → "3.0%". */
export const pct = (n, dp) => `${fmt(n, dp)}%`;
/** Signed percentage for changes: signedPct(-4.2) → "−4.2%", signedPct(5) → "+5%". */
export const signedPct = (n, dp) => `${n > 0 ? "+" : ""}${fmt(n, dp)}%`;

const mdRow = (cells) => `| ${cells.join(" | ")} |`;
/**
 * Markdown table. headers: ["Price (US\\$)", "Quantity demanded (kg per week)"]; rows: arrays of cells (numbers are
 * formatted with fmt; strings pass through). align: "l"/"r" per column (default: numbers right, first column left).
 */
export function table(headers, rows, { align, dp } = {}) {
  const al = align ?? headers.map((_, i) => (i === 0 ? "l" : "r"));
  const sep = al.map((a) => (a === "r" ? "---:" : a === "c" ? ":---:" : "---"));
  for (const r of rows) if (r.length !== headers.length) throw new Error(`table(): row has ${r.length} cells, header ${headers.length}`);
  return [mdRow(headers), mdRow(sep), ...rows.map((r) => mdRow(r.map((c, i) => fmt(c, typeof c === "number" ? dp?.[i] : undefined))))].join("\n");
}

/** Percentage change from a to b (exact). */
export const pctChange = (a, b) => {
  if (a === 0) throw new Error("pctChange: base is zero");
  return ((b - a) / a) * 100;
};

/**
 * Elasticities, by the simple percentage-change method used by both boards (base = the ORIGINAL value, not the
 * midpoint). Each returns the exact value; round only for display. PED is normally negative: state in the stem whether
 * the sign is wanted ("include the minus sign") because a numerical answer box accepts one value only.
 */
export const elasticity = {
  /** PED = %ΔQd ÷ %ΔP. */
  ped: ({ p1, p2, q1, q2 }) => pctChange(q1, q2) / pctChange(p1, p2),
  /** PES = %ΔQs ÷ %ΔP. */
  pes: ({ p1, p2, q1, q2 }) => pctChange(q1, q2) / pctChange(p1, p2),
  /** YED = %ΔQd ÷ %ΔY (ZIMSEC). */
  yed: ({ y1, y2, q1, q2 }) => pctChange(q1, q2) / pctChange(y1, y2),
  /** XED = %ΔQd of good A ÷ %ΔP of good B (ZIMSEC). */
  xed: ({ pb1, pb2, qa1, qa2 }) => pctChange(qa1, qa2) / pctChange(pb1, pb2),
  /** From given percentage changes. */
  fromPct: (pctQ, pctP) => pctQ / pctP,
  /** Words for a PED/PES value (uses the absolute value). */
  describe(v) {
    const a = Math.abs(v);
    if (a === 0) return "perfectly inelastic";
    if (!Number.isFinite(a)) return "perfectly elastic";
    if (Math.abs(a - 1) < 1e-9) return "unitary elastic";
    return a < 1 ? "inelastic" : "elastic";
  },
};

/**
 * Demand and supply schedule. prices: [..]; qd / qs: arrays of the same length (either may be omitted). Checks the law
 * of demand (qd falls as price rises) and of supply (qs rises), unless lawCheck: false. Returns { md, equilibrium,
 * excess } where equilibrium is { price, quantity } when one row has qd = qs (null otherwise) and excess[i] = qd − qs
 * (positive = shortage, negative = surplus). requireEquilibrium: true throws if no row clears the market.
 */
export function schedule({ prices, qd, qs, priceHeader = "Price (US\\$)", qdHeader = "Quantity demanded", qsHeader = "Quantity supplied", lawCheck = true, requireEquilibrium = false, extra = [] }) {
  const n = prices.length;
  for (const [name, arr] of [["qd", qd], ["qs", qs]]) if (arr && arr.length !== n) throw new Error(`schedule(): ${name} has ${arr.length} values, prices ${n}`);
  if (lawCheck) {
    for (let i = 1; i < n; i++) {
      const up = prices[i] > prices[i - 1];
      if (qd && (up ? qd[i] > qd[i - 1] : qd[i] < qd[i - 1])) throw new Error(`schedule(): quantity demanded rises with price at row ${i + 1}`);
      if (qs && (up ? qs[i] < qs[i - 1] : qs[i] > qs[i - 1])) throw new Error(`schedule(): quantity supplied falls as price rises at row ${i + 1}`);
    }
  }
  const headers = [priceHeader, ...(qd ? [qdHeader] : []), ...(qs ? [qsHeader] : []), ...extra.map((e) => e.header)];
  const rows = prices.map((p, i) => [p, ...(qd ? [qd[i]] : []), ...(qs ? [qs[i]] : []), ...extra.map((e) => e.values[i])]);
  let equilibrium = null;
  const excess = qd && qs ? prices.map((_, i) => qd[i] - qs[i]) : null;
  if (excess) {
    const i = excess.findIndex((x) => x === 0);
    if (i >= 0) equilibrium = { price: prices[i], quantity: qd[i] };
  }
  if (requireEquilibrium && !equilibrium) throw new Error("schedule(): no price in the schedule clears the market");
  return { md: table(headers, rows), equilibrium, excess };
}

/** Adds individual schedules into a market schedule: marketSum([[10, 8, 6], [5, 4, 3]]) → [15, 12, 9]. */
export const marketSum = (lists) => lists[0].map((_, i) => lists.reduce((s, l) => s + l[i], 0));

/**
 * Cost table from output levels, total fixed cost and total variable costs. Returns { md, rows } with TFC, TVC, TC,
 * AFC, AVC, ATC (to 2 d.p. in the table, exact in rows) and MC (ZIMSEC) when marginal: true. Output 0 shows "–" for
 * averages.
 */
export function costTable({ output, fc, vc, marginal = false, dp = 2 }) {
  if (output.length !== vc.length) throw new Error("costTable(): output and vc lengths differ");
  const rows = output.map((q, i) => {
    const tc = fc + vc[i];
    const r = { q, tfc: fc, tvc: vc[i], tc, afc: q ? fc / q : null, avc: q ? vc[i] / q : null, atc: q ? tc / q : null };
    if (marginal && i > 0) r.mc = (tc - (fc + vc[i - 1])) / (q - output[i - 1]);
    return r;
  });
  const avg = (v) => (v === null ? "–" : fmt(roundTo(v, dp), dp));
  const headers = ["Output (units)", "TFC (US\\$)", "TVC (US\\$)", "TC (US\\$)", "AFC (US\\$)", "AVC (US\\$)", "ATC (US\\$)", ...(marginal ? ["MC (US\\$)"] : [])];
  const md = table(headers, rows.map((r) => [r.q, r.tfc, r.tvc, r.tc, avg(r.afc), avg(r.avc), avg(r.atc), ...(marginal ? [r.mc === undefined ? "–" : avg(r.mc)] : [])]));
  return { md, rows };
}

/** Revenue table: price per unit at each quantity → TR, AR (and MR when marginal: true). */
export function revenueTable({ quantity, price, marginal = false }) {
  if (quantity.length !== price.length) throw new Error("revenueTable(): lengths differ");
  const rows = quantity.map((q, i) => {
    const r = { q, p: price[i], tr: q * price[i], ar: q ? (q * price[i]) / q : null };
    if (marginal && i > 0) r.mr = (r.tr - quantity[i - 1] * price[i - 1]) / (q - quantity[i - 1]);
    return r;
  });
  for (const r of rows) if (r.ar !== null) check(`AR = price at q=${r.q}`, r.ar, r.p);
  const headers = ["Quantity (units)", "Price (US\\$)", "TR (US\\$)", "AR (US\\$)", ...(marginal ? ["MR (US\\$)"] : [])];
  const md = table(headers, rows.map((r) => [r.q, r.p, r.tr, r.ar === null ? "–" : r.ar, ...(marginal ? [r.mr === undefined ? "–" : r.mr] : [])]));
  return { md, rows };
}

/** Productivity: output per worker (or per hour); average and marginal product from total product (ZIMSEC). */
export const productivity = {
  perWorker: (output, workers) => output / workers,
  table({ workers, tp }) {
    const rows = workers.map((w, i) => ({ w, tp: tp[i], ap: w ? tp[i] / w : null, mp: i > 0 ? (tp[i] - tp[i - 1]) / (w - workers[i - 1]) : null }));
    const md = table(["Workers", "Total product (units)", "Average product", "Marginal product"], rows.map((r) => [r.w, r.tp, r.ap === null ? "–" : fmt(roundTo(r.ap, 2)), r.mp === null ? "–" : fmt(roundTo(r.mp, 2))]));
    return { md, rows };
  },
};

/**
 * Price index and inflation. weightedIndex: items [{ name, weight, p0, p1 }] → index = Σ(weight × p1/p0 × 100) ÷ Σweight.
 * inflationRate(i0, i1) = (i1 − i0) ÷ i0 × 100. realValue(nominal, index) = nominal ÷ index × 100.
 */
export const prices = {
  simpleIndex: (p0, p1) => (p1 / p0) * 100,
  weightedIndex(items) {
    const w = items.reduce((s, x) => s + x.weight, 0);
    return items.reduce((s, x) => s + x.weight * (x.p1 / x.p0) * 100, 0) / w;
  },
  /** Markdown table for a weighted index: Item | Weight | Price index | Weight × index, with the total row. */
  weightedTable(items, { dp = 1 } = {}) {
    const rows = items.map((x) => [x.name, x.weight, fmt(roundTo((x.p1 / x.p0) * 100, dp), dp), fmt(roundTo(x.weight * (x.p1 / x.p0) * 100, dp), dp)]);
    const tw = items.reduce((s, x) => s + x.weight, 0);
    const tot = items.reduce((s, x) => s + x.weight * (x.p1 / x.p0) * 100, 0);
    rows.push(["**Total**", `**${fmt(tw)}**`, "", `**${fmt(roundTo(tot, dp), dp)}**`]);
    return { md: table(["Item", "Weight", "Price index", "Weight × index"], rows), index: tot / tw };
  },
  inflationRate: (i0, i1) => ((i1 - i0) / i0) * 100,
  realValue: (nominal, index) => (nominal / index) * 100,
};

/** National income (ZIMSEC): GDP by expenditure = C + I + G + (X − M); GNP = GDP + net income from abroad. */
export const nationalIncome = {
  expenditure: ({ c, i, g, x, m }) => c + i + g + (x - m),
  gnp: (gdp, netIncomeFromAbroad) => gdp + netIncomeFromAbroad,
  perHead: (gdp, population) => gdp / population,
  realGrowth: (realGdp0, realGdp1) => pctChange(realGdp0, realGdp1),
};

/**
 * Current account. Pass flows as positive credits and debits: { goods: [exports, imports], services: [x, m],
 * primary: [credits, debits], secondary: [credits, debits] }. Returns the balances (negative = deficit) and a table.
 */
export function currentAccount({ goods, services, primary, secondary, unit = "US\\$ million" }) {
  const bal = (pair) => (pair ? pair[0] - pair[1] : null);
  const b = { goods: bal(goods), services: bal(services), primary: bal(primary), secondary: bal(secondary) };
  b.total = Object.values(b).reduce((s, v) => s + (v ?? 0), 0);
  const line = (name, pair, v) => (pair ? [[name, pair[0], pair[1], v < 0 ? `${fmt(v)} (deficit)` : v > 0 ? `${fmt(v)} (surplus)` : "0"]] : []);
  const rows = [
    ...line("Trade in goods", goods, b.goods),
    ...line("Trade in services", services, b.services),
    ...line("Primary income", primary, b.primary),
    ...line("Secondary income", secondary, b.secondary),
    ["**Current account balance**", "", "", `**${fmt(b.total)}**`],
  ];
  return { ...b, md: table(["Section", `Credits (${unit})`, `Debits (${unit})`, `Balance (${unit})`], rows) };
}

/** Terms of trade (ZIMSEC) = export price index ÷ import price index × 100. */
export const termsOfTrade = (exportIndex, importIndex) => (exportIndex / importIndex) * 100;

/** Government budget balance = revenue − spending (negative = deficit). */
export const budgetBalance = (revenue, spending) => revenue - spending;

/** Unemployment rate = unemployed ÷ labour force × 100 (labour force = employed + unemployed). */
export const unemploymentRate = ({ unemployed, labourForce, employed }) => {
  const lf = labourForce ?? employed + unemployed;
  return (unemployed / lf) * 100;
};
/** Dependency ratio (as used in many textbooks) = dependants ÷ working-age population × 100. */
export const dependencyRatio = (dependants, workingAge) => (dependants / workingAge) * 100;
/** Natural increase rate per 1,000 = birth rate − death rate; population change = natural increase + net migration. */
export const population = {
  naturalIncrease: (birthRate, deathRate) => birthRate - deathRate,
  netMigration: (immigrants, emigrants) => immigrants - emigrants,
  /** Rates per 1,000 from counts. */
  ratePerThousand: (count, pop) => (count / pop) * 1000,
};

/**
 * Comparative advantage from an output table: { A: { x, y }, B: { x, y } } = what each country produces of goods x and
 * y with the same resources. Returns the opportunity costs and which country has the comparative advantage in each good.
 */
export function comparativeAdvantage({ A, B }) {
  const oc = { A: { x: A.y / A.x, y: A.x / A.y }, B: { x: B.y / B.x, y: B.x / B.y } };
  if (Math.abs(oc.A.x - oc.B.x) < 1e-12) throw new Error("comparativeAdvantage(): equal opportunity costs, no gains from trade");
  return {
    oc,
    absolute: { x: A.x > B.x ? "A" : A.x < B.x ? "B" : "neither", y: A.y > B.y ? "A" : A.y < B.y ? "B" : "neither" },
    comparative: { x: oc.A.x < oc.B.x ? "A" : "B", y: oc.A.y < oc.B.y ? "A" : "B" },
  };
}

/** Exchange-rate conversion: convert(amount, rate) where rate = units of the other currency per 1 unit of this one. */
export const forex = {
  convert: (amount, rate) => amount * rate,
  /** Percentage appreciation (+) or depreciation (−) of a currency whose price in another currency moves r0 → r1. */
  change: (r0, r1) => pctChange(r0, r1),
};

/** Tax helpers: average tax rate (%) and tax due under bands [[upTo, ratePct], ..., [Infinity, ratePct]]. */
export const tax = {
  averageRate: (taxPaid, income) => (taxPaid / income) * 100,
  banded(income, bands) {
    let prev = 0;
    let due = 0;
    for (const [upTo, rate] of bands) {
      if (income > prev) due += (Math.min(income, upTo) - prev) * (rate / 100);
      prev = upTo;
    }
    return due;
  },
};



// =====================================================================================================================
// A-LEVEL ECONOMICS HELPERS (added for economics-a). All return exact values; round only for display (fmt, dpStr, sfStr)
// or let the builders do it. Diagrams are never drawn: describe curves in words and print the schedule. To print a table
// or a worked calculation for a lesson, write a small script in .scratch/economics-a/tables/<prefix><name>.mjs (NOT in
// slices/: every .mjs there is imported by the build) that imports these helpers and console.logs the output.

const total = (xs) => xs.reduce((s, x) => s + x, 0);

// ---- Descriptive statistics (ZIMSEC Tools of Economic Analysis)
export const mean = (xs) => total(xs) / xs.length;
export const sortedAsc = (xs) => [...xs].sort((a, b) => a - b);
export function median(xs) {
  const s = sortedAsc(xs);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}
/** All modes (a list); throws when every value occurs equally often (no mode). */
export function modes(xs) {
  const count = new Map();
  for (const x of xs) count.set(x, (count.get(x) ?? 0) + 1);
  const max = Math.max(...count.values());
  const out = [...count].filter(([, c]) => c === max).map(([x]) => x);
  if (out.length === count.size && count.size > 1) throw new Error("modes(): no mode (all values equally common)");
  return out.sort((a, b) => a - b);
}
export const range = (xs) => Math.max(...xs) - Math.min(...xs);
export const weightedMean = (values, weights) => total(values.map((v, i) => v * weights[i])) / total(weights);
/** Mean of a grouped frequency table: classes [[lower, upper, frequency], ...] using class mid-points. */
export function groupedMean(classes) {
  const n = total(classes.map((c) => c[2]));
  return total(classes.map(([lo, hi, f]) => ((lo + hi) / 2) * f)) / n;
}
/** Modal class of a grouped table (highest frequency; throws on a tie). */
export function modalClass(classes) {
  const max = Math.max(...classes.map((c) => c[2]));
  const top = classes.filter((c) => c[2] === max);
  if (top.length > 1) throw new Error("modalClass(): tie");
  return top[0];
}
/** Pie chart angles (degrees) from values; checks they add to 360. */
export function pieAngles(values) {
  const tot = total(values);
  return values.map((v) => (v / tot) * 360);
}
/** Arc (mid-point) elasticity: %change in Q over %change in P, both measured from the mid-points (ZIMSEC checklist: point/arc). */
export const arcElasticity = ({ p1, p2, q1, q2 }) => ((q2 - q1) / ((q1 + q2) / 2)) / ((p2 - p1) / ((p1 + p2) / 2));

// ---- Linear markets: demand P = a − b·Q, supply P = c + d·Q
/** Equilibrium and surpluses for linear demand/supply. Throws when there is no positive equilibrium. */
export function linearMarket({ a, b, c, d }) {
  if (!(b > 0) || !(d >= 0)) throw new Error("linearMarket(): need b > 0 and d >= 0");
  const quantity = (a - c) / (b + d);
  const price = a - b * quantity;
  if (!(quantity > 0)) throw new Error("linearMarket(): no positive equilibrium");
  const consumerSurplus = 0.5 * (a - price) * quantity;
  const producerSurplus = 0.5 * (price - c) * quantity;
  return { price, quantity, consumerSurplus, producerSurplus, totalSurplus: consumerSurplus + producerSurplus };
}
/** Quantity demanded and supplied at a price for linear curves (negative results are floored at 0). */
export const linearAt = ({ a, b, c, d }, price) => ({ qd: Math.max(0, (a - price) / b), qs: d > 0 ? Math.max(0, (price - c) / d) : null });
/** Point elasticity of demand on P = a − b·Q at price p: −p / (a − p). */
export const pedPoint = ({ a, p }) => -p / (a - p);
/** Price at which PED = −1 on a straight-line demand curve (the mid-point of the price axis): a / 2. */
export const unitaryPrice = ({ a }) => a / 2;
/** Specific indirect tax per unit: supply shifts up by the tax. Incidence, revenue and deadweight loss. */
export function taxIncidence({ a, b, c, d, tax }) {
  const before = linearMarket({ a, b, c, d });
  const after = linearMarket({ a, b, c: c + tax, d });
  const consumerPerUnit = after.price - before.price;
  const producerPerUnit = tax - consumerPerUnit;
  return {
    before,
    after,
    consumerPerUnit,
    producerPerUnit,
    revenue: tax * after.quantity,
    consumerBurden: consumerPerUnit * after.quantity,
    producerBurden: producerPerUnit * after.quantity,
    deadweightLoss: 0.5 * tax * (before.quantity - after.quantity),
  };
}
/** Specific subsidy per unit: supply shifts down by the subsidy. Cost to government, gains and excess burden. */
export function subsidyEffect({ a, b, c, d, subsidy }) {
  const before = linearMarket({ a, b, c, d });
  const after = linearMarket({ a, b, c: c - subsidy, d });
  const consumerPerUnit = before.price - after.price;
  return {
    before,
    after,
    consumerPerUnit,
    producerPerUnit: subsidy - consumerPerUnit,
    cost: subsidy * after.quantity,
    consumerGain: consumerPerUnit * after.quantity,
    producerGain: (subsidy - consumerPerUnit) * after.quantity,
    welfareLoss: 0.5 * subsidy * (after.quantity - before.quantity),
  };
}
/** Maximum (below equilibrium) or minimum (above) price: quantities demanded and supplied, shortage or surplus. */
export function priceControl({ a, b, c, d, price }) {
  const eq = linearMarket({ a, b, c, d });
  const { qd, qs } = linearAt({ a, b, c, d }, price);
  return { eq, qd, qs, traded: Math.min(qd, qs), shortage: Math.max(0, qd - qs), surplus: Math.max(0, qs - qd), type: price < eq.price ? "maximum (below equilibrium: binding)" : price > eq.price ? "minimum (above equilibrium: binding)" : "at equilibrium" };
}
/** Area of a triangle (welfare-loss triangles): ½ × base × height. */
export const triangleArea = (base, height) => 0.5 * base * height;

// ---- Consumer theory
export const utility = {
  /** Marginal utility from total utility for 1, 2, 3 ... units (TU of 0 units = 0). */
  marginal: (tu) => tu.map((v, i) => v - (i === 0 ? 0 : tu[i - 1])),
  /** Markdown table: Units | TU | MU. */
  table(tu, { unitHeader = "Units consumed" } = {}) {
    const mu = utility.marginal(tu);
    return table([unitHeader, "Total utility", "Marginal utility"], tu.map((v, i) => [i + 1, v, mu[i]]));
  },
  /** Equi-marginal bundle: buy the unit with the highest MU per dollar until the budget cannot buy the next unit. Throws on ties. */
  bestBundle({ budget, px, py, muX, muY }) {
    let x = 0;
    let y = 0;
    let spent = 0;
    for (;;) {
      const cx = x < muX.length && spent + px <= budget + 1e-9 ? muX[x] / px : -Infinity;
      const cy = y < muY.length && spent + py <= budget + 1e-9 ? muY[y] / py : -Infinity;
      if (cx === -Infinity && cy === -Infinity) break;
      if (cx === cy) throw new Error(`bestBundle(): tie in MU per dollar at x=${x + 1}, y=${y + 1}; change the data`);
      if (cx > cy) {
        spent += px;
        x++;
      } else {
        spent += py;
        y++;
      }
    }
    return { x, y, spent, totalUtility: total(muX.slice(0, x)) + total(muY.slice(0, y)), left: budget - spent };
  },
};
/** Budget line for income and two prices: intercepts and slope (= px / py). */
export const budgetLine = ({ income, px, py }) => ({ maxX: income / px, maxY: income / py, slope: px / py });

// ---- Firm: revenue, cost and profit tables; market structures
/**
 * Profit schedule from output, price at each output (demand schedule), fixed cost and total variable costs. Returns the
 * table with TR, TC, MR, MC and profit, and the profit-maximising row (throws on a tie). Check that MC and MR bracket it.
 */
export function profitSchedule({ output, price, fc, vc, dp = 2 }) {
  if (output.length !== price.length || output.length !== vc.length) throw new Error("profitSchedule(): lengths differ");
  const rows = output.map((q, i) => {
    const tr = q * price[i];
    const tc = fc + vc[i];
    const r = { q, p: price[i], tr, tc, profit: tr - tc, mr: null, mc: null };
    if (i > 0) {
      r.mr = (tr - output[i - 1] * price[i - 1]) / (q - output[i - 1]);
      r.mc = (tc - (fc + vc[i - 1])) / (q - output[i - 1]);
    }
    return r;
  });
  const maxProfit = Math.max(...rows.map((r) => r.profit));
  const best = rows.filter((r) => Math.abs(r.profit - maxProfit) < 1e-9);
  if (best.length > 1) throw new Error("profitSchedule(): two outputs give the same maximum profit; change the data");
  const f = (v) => (v === null ? "–" : fmt(roundTo(v, dp), dp));
  const md = table(
    ["Output (units)", "Price (US\\$)", "TR (US\\$)", "TC (US\\$)", "MR (US\\$)", "MC (US\\$)", "Profit (US\\$)"],
    rows.map((r) => [r.q, r.p, r.tr, r.tc, f(r.mr), f(r.mc), r.profit]),
  );
  return { md, rows, best: best[0] };
}
/** n-firm concentration ratio (%): share of the largest n firms from sales or market shares. */
export function concentrationRatio(sales, n) {
  const s = [...sales].sort((x, y) => y - x);
  return (total(s.slice(0, n)) / total(s)) * 100;
}
/** Monopolist with linear demand P = a − b·Q and linear marginal cost MC = c + d·Q: MR = a − 2bQ = MC. Also the competitive outcome P = MC and the welfare loss. */
export function monopolyLinear({ a, b, c, d = 0 }) {
  const qm = (a - c) / (2 * b + d);
  const pm = a - b * qm;
  const mcm = c + d * qm;
  const qc = (a - c) / (b + d);
  const pc = a - b * qc;
  return { monopoly: { quantity: qm, price: pm, mc: mcm, profitOverMC: (pm - mcm) * qm }, competitive: { quantity: qc, price: pc }, welfareLoss: 0.5 * (qc - qm) * (pm - mcm) };
}
/** Third-degree price discrimination with constant MC: for each market P = a_i − b_i·Q, sell where MR_i = MC. */
export function thirdDegree({ markets, mc }) {
  const rows = markets.map(({ a, b }) => {
    const q = (a - mc) / (2 * b);
    const p = a - b * q;
    return { q, p, revenue: p * q, ped: pedPoint({ a, p }) };
  });
  return { rows, quantity: total(rows.map((r) => r.q)), revenue: total(rows.map((r) => r.revenue)) };
}
/** 2×2 game: payoffs[i][j] = [row player's payoff, column player's]; returns the pure-strategy Nash equilibria [i, j] and a Markdown pay-off table. */
export function game2x2({ rowName = "Firm A", colName = "Firm B", rowStrategies, colStrategies, payoffs }) {
  const eq = [];
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      const rowBest = payoffs[i][j][0] >= payoffs[1 - i][j][0];
      const colBest = payoffs[i][j][1] >= payoffs[i][1 - j][1];
      if (rowBest && colBest) eq.push([i, j]);
    }
  }
  const cell = (i, j) => `${payoffs[i][j][0]}, ${payoffs[i][j][1]}`;
  const md = table([`${rowName} \\ ${colName}`, colStrategies[0], colStrategies[1]], [[rowStrategies[0], cell(0, 0), cell(0, 1)], [rowStrategies[1], cell(1, 0), cell(1, 1)]], { align: ["l", "c", "c"] });
  return { equilibria: eq, md, describe: eq.map(([i, j]) => `${rowStrategies[i]} / ${colStrategies[j]}`) };
}

// ---- Labour markets
/** Marginal revenue product table for a price-taking firm: workers, total product, MPP, MRP = MPP × price; hire while MRP ≥ wage. */
export function mrpTable({ workers, tp, price, wage }) {
  const rows = workers.map((w, i) => {
    const mpp = (tp[i] - (i === 0 ? 0 : tp[i - 1])) / (w - (i === 0 ? 0 : workers[i - 1]));
    return { w, tp: tp[i], mpp, mrp: mpp * price };
  });
  const hire = rows.filter((r) => r.mrp >= wage - 1e-9).length ? rows.filter((r) => r.mrp >= wage - 1e-9).slice(-1)[0].w : 0;
  const md = table(["Workers", "Total product (units)", "MPP (units)", "MRP (US\\$)"], rows.map((r) => [r.w, r.tp, fmt(roundTo(r.mpp, 2), 2), fmt(roundTo(r.mrp, 2), 2)]));
  return { md, rows, hire };
}
/** Labour market with linear MRP (demand) W = m − n·L and linear supply W = s + k·L: competitive outcome, monopsony outcome (MCL = s + 2k·L) and the effect of a minimum wage. */
export function labourMarket({ m, n, s, k, minimumWage }) {
  const lc = (m - s) / (n + k);
  const wc = m - n * lc;
  const lm = (m - s) / (n + 2 * k);
  const wm = s + k * lm;
  const out = { competitive: { employment: lc, wage: wc }, monopsony: { employment: lm, wage: wm } };
  if (minimumWage !== undefined) {
    const demand = Math.max(0, (m - minimumWage) / n);
    const supply = Math.max(0, (minimumWage - s) / k);
    out.minimumWage = { wage: minimumWage, demanded: demand, supplied: supply, employed: Math.min(demand, supply), unemployed: Math.max(0, supply - demand) };
  }
  return out;
}

// ---- Macroeconomy
/** Nominal ↔ real GDP with the deflator (base 100). */
export const deflator = {
  index: (nominal, real) => (nominal / real) * 100,
  real: (nominal, index) => (nominal / index) * 100,
  nominal: (real, index) => (real * index) / 100,
};
/** National accounts: GDP at market prices → basic prices, GNI (GNP) and NNI (NNP). */
export function nationalAccounts({ gdpMarket, taxesOnProducts = 0, subsidiesOnProducts = 0, netPrimaryIncome = 0, depreciation = 0 }) {
  const gdpBasic = gdpMarket - taxesOnProducts + subsidiesOnProducts;
  const gni = gdpMarket + netPrimaryIncome;
  return { gdpBasic, gdpMarket, gni, nni: gni - depreciation };
}
/** Growth rate (%) between two real values, and the average annual rate over n years (compound). */
export const growthRate = (v0, v1) => ((v1 - v0) / v0) * 100;
export const compoundRate = (v0, v1, years) => ((v1 / v0) ** (1 / years) - 1) * 100;
/** Keynesian model: C = Ca + c·Yd, Yd = Y − tY, M = M0 + mY. Equilibrium Y = (Ca + I + G + X − M0) / (1 − c(1 − t) + m). */
export const keynes = {
  /** k = 1 / (1 − mpc(1 − mrt) + mpm); mrt and mpm default to 0 (the simple 1/(1 − mpc) multiplier). */
  multiplier: ({ mpc, mrt = 0, mpm = 0 }) => 1 / (1 - mpc * (1 - mrt) + mpm),
  /** The syllabus form k = 1/(mps + mpt + mpm) with every propensity measured as a fraction of national income. */
  multiplierFromWithdrawals: ({ mps, mpt = 0, mpm = 0 }) => 1 / (mps + mpt + mpm),
  equilibriumIncome({ autonomous, mpc, mrt = 0, mpm = 0 }) {
    return autonomous / (1 - mpc * (1 - mrt) + mpm);
  },
  /** Change in equilibrium income for a change in autonomous spending. */
  change: ({ delta, mpc, mrt = 0, mpm = 0 }) => delta * keynes.multiplier({ mpc, mrt, mpm }),
  /** Gap between equilibrium and full-employment income, and the change in injections needed (gap ÷ k). */
  gap({ fullEmployment, equilibrium, k }) {
    const income = fullEmployment - equilibrium;
    return { type: income > 0 ? "deflationary" : income < 0 ? "inflationary" : "none", incomeGap: Math.abs(income), injectionChange: Math.abs(income) / k };
  },
  propensity: (change, totalChange) => change / totalChange,
  /** Accelerator: induced investment = capital–output ratio × change in output. */
  accelerator: (capitalOutputRatio, deltaOutput) => capitalOutputRatio * deltaOutput,
};
/** Quantity theory MV = PT: pass three of M, V, P, T and get the fourth. */
export function quantityTheory({ M, V, P, T }) {
  const missing = ["M", "V", "P", "T"].filter((k) => ({ M, V, P, T })[k] === undefined);
  if (missing.length !== 1) throw new Error("quantityTheory(): pass exactly three of M, V, P, T");
  if (M === undefined) return (P * T) / V;
  if (V === undefined) return (P * T) / M;
  if (P === undefined) return (M * V) / T;
  return (M * V) / P;
}
/** Fisher: real interest rate ≈ nominal − inflation (approximate) and exact ((1+i)/(1+π) − 1) × 100. Rates in %. */
export const realInterest = (nominal, inflation) => ({ approx: nominal - inflation, exact: ((1 + nominal / 100) / (1 + inflation / 100) - 1) * 100 });

// ---- Money and banking
/** Credit creation: the first deposit, the reserve ratio r and the rounds. Returns the table, the money multiplier 1/r and the maximum total deposits. */
export function creditCreation({ deposit, reserveRatio, rounds = 6 }) {
  const rows = [];
  let d = deposit;
  let cumulative = 0;
  for (let i = 1; i <= rounds; i++) {
    const reserve = d * reserveRatio;
    const lend = d - reserve;
    cumulative += d;
    rows.push({ round: i, deposit: d, reserve, lend, cumulative });
    d = lend;
  }
  const multiplier = 1 / reserveRatio;
  const md = table(["Round", "New deposit (US\\$)", "Kept as reserves (US\\$)", "Lent out (US\\$)", "Total deposits so far (US\\$)"], rows.map((r) => [r.round, fmt(roundTo(r.deposit, 2), 2), fmt(roundTo(r.reserve, 2), 2), fmt(roundTo(r.lend, 2), 2), fmt(roundTo(r.cumulative, 2), 2)]));
  return { rows, md, multiplier, maxDeposits: deposit * multiplier, newLoans: deposit * multiplier - deposit };
}

// ---- International trade and payments
/** Tariff on a small open economy: P_d = a − b·Q, P_s = c + d·Q, world price pw. Imports, revenue and welfare changes. */
export function tariffEffect({ a, b, c, d, pw, tariff }) {
  const at = (p) => ({ price: p, qd: (a - p) / b, qs: (p - c) / d });
  const free = at(pw);
  const tar = at(pw + tariff);
  if (free.qs < 0 || tar.qs < 0 || tar.qd < 0) throw new Error("tariffEffect(): negative quantity; change the data");
  const imports = (x) => x.qd - x.qs;
  const rev = tariff * imports(tar);
  const consumerLoss = (free.qd + tar.qd) / 2 * tariff;
  const producerGain = (free.qs + tar.qs) / 2 * tariff;
  const productionLoss = 0.5 * tariff * (tar.qs - free.qs);
  const consumptionLoss = 0.5 * tariff * (free.qd - tar.qd);
  return { free, tariff: tar, importsFree: imports(free), importsTariff: imports(tar), revenue: rev, consumerLoss, producerGain, productionLoss, consumptionLoss, welfareLoss: productionLoss + consumptionLoss, check: consumerLoss - producerGain - rev - (productionLoss + consumptionLoss) };
}
/** Weighted trade index: items [{ weight, index }] → Σ weight × index / Σ weight (trade-weighted exchange rate index). */
export const tradeWeightedIndex = (items) => total(items.map((x) => x.weight * x.index)) / total(items.map((x) => x.weight));
/**
 * Real exchange rate index = nominal index × (home price index ÷ foreign price index), where the nominal index measures
 * foreign currency per unit of home currency (a rise is an appreciation); a rise in the result is a real appreciation.
 */
export const realExchangeIndex = ({ nominal, homePrices, foreignPrices }) => nominal * (homePrices / foreignPrices);
/** Marshall–Lerner: a depreciation improves the trade balance (in the long run) when |PEDx| + |PEDm| > 1. */
export const marshallLerner = (pedX, pedM) => Math.abs(pedX) + Math.abs(pedM) > 1;
/** Purchasing power parity rate: price of the same basket at home ÷ its price in the US (local currency per US$). */
export const pppRate = (homeBasketPrice, usBasketPrice) => homeBasketPrice / usBasketPrice;
/** Debt service ratio (%) = debt service payments ÷ export earnings × 100. */
export const debtServiceRatio = (service, exports) => (service / exports) * 100;

// ---- Development and distribution
/** Lorenz table and Gini coefficient from group income shares (poorest first, shares sum to 1 or 100). Equal-sized population groups. */
export function lorenz(shares, { groupName = "Population group" } = {}) {
  const tot = total(shares);
  const n = shares.length;
  let cum = 0;
  const points = [[0, 0]];
  const rows = shares.map((s, i) => {
    cum += s / tot;
    points.push([(i + 1) / n, cum]);
    return [`${groupName} ${i + 1}`, fmt(roundTo((s / tot) * 100, 1), 1), fmt(roundTo(((i + 1) / n) * 100, 1), 1), fmt(roundTo(cum * 100, 1), 1)];
  });
  let area = 0;
  for (let i = 1; i < points.length; i++) area += ((points[i][0] - points[i - 1][0]) * (points[i][1] + points[i - 1][1])) / 2;
  const gini = 1 - 2 * area;
  const md = table([groupName, "Share of income (%)", "Cumulative population (%)", "Cumulative income (%)"], rows);
  return { md, points, gini, areaUnderLorenz: area };
}
/** Human Development Index, UNDP method from 2010 (geometric mean). Goalposts: life expectancy 20–85, mean years 0–15, expected years 0–18, GNI per head US$100–75,000 (PPP). Data in lessons is illustrative; check goalposts if real figures are ever quoted. */
export function hdi({ lifeExpectancy, meanYears, expectedYears, gniPerCapita }) {
  const health = (lifeExpectancy - 20) / (85 - 20);
  const education = (Math.min(meanYears, 15) / 15 + Math.min(expectedYears, 18) / 18) / 2;
  const income = (Math.log(gniPerCapita) - Math.log(100)) / (Math.log(75000) - Math.log(100));
  return { health, education, income, hdi: Math.cbrt(health * education * income) };
}

// ---- Cost–benefit analysis
export const discount = (value, ratePct, years) => value / (1 + ratePct / 100) ** years;
/** Present values of cost and benefit streams (year 0 first) at a discount rate (%): PV, net present value and benefit–cost ratio. */
export function cba({ costs, benefits, ratePct }) {
  const pv = (xs) => total(xs.map((x, i) => discount(x, ratePct, i)));
  const pvCosts = pv(costs);
  const pvBenefits = pv(benefits);
  return { pvCosts, pvBenefits, npv: pvBenefits - pvCosts, bcr: pvBenefits / pvCosts };
}

// ---------------------------------------------------------------------------------------------------------------------
// Self-test of the helpers (runs at import; cheap). If it fails, a helper is wrong.
{
  const m = linearMarket({ a: 100, b: 1, c: 20, d: 1 });
  chk(m.quantity, 40, 1e-9, "linearMarket q");
  chk(m.price, 60, 1e-9, "linearMarket p");
  chk(m.consumerSurplus, 800, 1e-9, "consumer surplus");
  chk(m.producerSurplus, 800, 1e-9, "producer surplus");
  const tx = taxIncidence({ a: 100, b: 1, c: 20, d: 1, tax: 10 });
  chk(tx.after.price, 65, 1e-9, "tax price");
  chk(tx.revenue, 350, 1e-9, "tax revenue");
  chk(tx.consumerPerUnit + tx.producerPerUnit, 10, 1e-9, "incidence adds to tax");
  chk(tx.deadweightLoss, 25, 1e-9, "tax dwl");
  chk(pedPoint({ a: 100, p: 50 }), -1, 1e-9, "PED at mid-point");
  chk(keynes.multiplier({ mpc: 0.8 }), 5, 1e-9, "multiplier");
  chk(keynes.multiplier({ mpc: 0.8, mrt: 0.25, mpm: 0.1 }), 1 / (1 - 0.6 + 0.1), 1e-9, "open multiplier");
  chk(creditCreation({ deposit: 1000, reserveRatio: 0.1 }).maxDeposits, 10000, 1e-9, "credit creation");
  chk(lorenz([20, 20, 20, 20, 20]).gini, 0, 1e-9, "equal Gini");
  chk(roundTo(lorenz([5, 10, 15, 25, 45]).gini, 3), 0.38, 1e-9, "Gini");
  chk(quantityTheory({ M: 100, V: 4, T: 200 }), 2, 1e-9, "QTM P");
  chk(concentrationRatio([40, 30, 20, 10], 2), 70, 1e-9, "CR2");
  chk(roundTo(hdi({ lifeExpectancy: 85, meanYears: 15, expectedYears: 18, gniPerCapita: 75000 }).hdi, 6), 1, 1e-9, "HDI maximum");
  const mono = monopolyLinear({ a: 100, b: 1, c: 20 });
  chk(mono.monopoly.quantity, 40, 1e-9, "monopoly q");
  chk(mono.welfareLoss, 800, 1e-9, "monopoly welfare loss");
  chk(game2x2({ rowStrategies: ["Cheat", "Keep"], colStrategies: ["Cheat", "Keep"], payoffs: [[[2, 2], [8, 1]], [[1, 8], [5, 5]]] }).equilibria.length, 1, 0, "prisoner's dilemma has one equilibrium");
  const te = tariffEffect({ a: 100, b: 1, c: 10, d: 1, pw: 40, tariff: 10 });
  chk(te.check, 0, 1e-9, "tariff welfare accounting");
}
