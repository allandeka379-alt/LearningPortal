// Authoring helpers for biology-a questions and flashcards (adapted from .scratch/additional-mathematics/lib.mjs, itself
// from .scratch/economics/lib.mjs and .scratch/english/lib.mjs, with the unit-aware numeric builders of
// .scratch/combined-science/lib.mjs). Concept modules call concept(...) with a builder; build-content.mjs writes the
// JSON files. Biology helpers at the end: rounding and checks, table(), statistics (chi-squared, t-test, SD, SE, 95% CI,
// Pearson, Spearman, Simpson, Lincoln, Hardy-Weinberg) with critical values, microscopy, RQ, Rf, SA:V, water potential,
// PCR, and the exam-format plans (EXAM).
//
// LaTeX: write it with t`...` (String.raw), so backslashes are single in the source (t`$\chi^2$`) and JSON.stringify
// doubles them in the files. In a normal "..." string you would have to write "\\chi". Money is US\$ (a bare $ starts
// maths).
//
// EVERY number in an answer, a mark scheme or a data table you invent is computed in code with these helpers and passed
// EXACT to the builders; the builders round for display and set a tolerance that accepts every correctly rounded answer.
// Never type a computed value by hand: use chk(...) to assert a value you also write in prose.
export const t = String.raw;

// Selectors for `applies` (an item is tagged only to the syllabi it names). Omit applies for content valid for both.
export const ZIM = ["zimsec"];
export const CAM = ["cambridge/a-level/biology"];

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
// Units: display hint + accepted spellings (units optional: a missing unit is fine). Ask the coordinator to add one.
const UNITS = {
  nm: ["nm", "nanometres", "nanometre", "nanometers"],
  "µm": ["µm", "μm", "um", "micrometres", "micrometre", "micrometers", "microns", "micron"],
  mm: ["mm", "millimetres", "millimetre"],
  cm: ["cm", "centimetres", "centimetre"],
  m: ["m", "metres", "metre"],
  "µm²": ["µm²", "µm^2", "um^2", "um2", "square micrometres"],
  "mm²": ["mm²", "mm^2", "mm2", "square millimetres"],
  "cm²": ["cm²", "cm^2", "cm2", "square centimetres"],
  "m²": ["m²", "m^2", "m2", "square metres"],
  "mm³": ["mm³", "mm^3", "mm3", "cubic millimetres"],
  "cm³": ["cm³", "cm^3", "cm3", "ml", "mL", "cubic centimetres"],
  "dm³": ["dm³", "dm^3", "dm3", "litres", "litre", "l", "L"],
  "µg": ["µg", "ug", "micrograms"],
  mg: ["mg", "milligrams", "milligram"],
  g: ["g", "grams", "gram"],
  kg: ["kg", "kilograms", "kilogram"],
  s: ["s", "seconds", "second", "sec", "secs"],
  ms: ["ms", "milliseconds", "millisecond"],
  min: ["min", "minutes", "minute", "mins"],
  h: ["h", "hours", "hour", "hrs", "hr"],
  days: ["days", "day", "d"],
  years: ["years", "year", "y", "yr"],
  "°C": ["°C", "degrees Celsius", "degrees C", "deg C", "C", "degrees"],
  "%": ["%", "percent", "per cent"],
  kJ: ["kJ", "kilojoules"],
  J: ["J", "joules", "joule"],
  "kJ/g": ["kJ/g", "kJ g^-1", "kJ g-1", "kilojoules per gram"],
  "kJ/mol": ["kJ/mol", "kJ mol^-1", "kJ mol-1"],
  mV: ["mV", "millivolts", "millivolt"],
  mmHg: ["mmHg", "mm Hg", "millimetres of mercury"],
  kPa: ["kPa", "kilopascals"],
  "m/s": ["m/s", "m s^-1", "m s-1", "ms^-1", "metres per second"],
  "mm/s": ["mm/s", "mm s^-1", "mm s-1"],
  "mm/min": ["mm/min", "mm min^-1", "mm min-1", "mm per minute"],
  "cm³/min": ["cm³/min", "cm^3/min", "cm3/min", "cm³ min^-1", "cm3 min-1", "ml/min"],
  "mm³/min": ["mm³/min", "mm^3/min", "mm3/min", "mm³ min^-1", "mm3 min-1"],
  "cm³/h": ["cm³/h", "cm^3/h", "cm3/h", "cm3 h-1"],
  "dm³/min": ["dm³/min", "dm^3/min", "dm3/min", "dm3 min-1", "litres per minute", "l/min"],
  "g/dm³": ["g/dm³", "g dm^-3", "g dm-3", "g/l"],
  "mol/dm³": ["mol/dm³", "mol dm^-3", "mol dm-3", "M", "mol/l"],
  "mg/dm³": ["mg/dm³", "mg dm^-3", "mg dm-3", "mg/l"],
  "beats/min": ["beats/min", "beats per minute", "bpm", "beats min-1"],
  "breaths/min": ["breaths/min", "breaths per minute", "breaths min-1"],
  "per min": ["per min", "/min", "min^-1", "min-1", "per minute"],
  "s⁻¹": ["s⁻¹", "s^-1", "s-1", "/s", "per second"],
  "individuals": ["individuals", "individual", "animals", "organisms"],
  "per m²": ["per m²", "per m^2", "/m^2", "/m²", "m^-2", "m-2"],
  "arbitrary units": ["arbitrary units", "au", "a.u.", "units"],
  "copies": ["copies", "molecules", "copy"],
};

/**
 * Numeric spec. Default rule (Cambridge convention, also used for ZIMSEC): integers exact; other values to 3
 * significant figures — the tolerance is half a unit in the 3rd significant figure, so 3 s.f. and anything more accurate
 * scores. `dp` fixes decimal places instead; `sf` another number of significant figures; `tol` overrides everything
 * (absolute). Throws when the value sits too close to a rounding boundary (change the data).
 */
function numericSpec({ value, unit, dp, sf: nsf, tol }) {
  if (typeof value !== "number" || !Number.isFinite(value)) throw new Error(`numeric value must be a finite number (got ${value})`);
  if (unit && !UNITS[unit]) throw new Error(`Unknown unit ${unit} (ask the coordinator to add it to UNITS in lib.mjs)`);
  let model;
  const isInt = Math.abs(value - Math.round(value)) < 1e-12;
  if (tol === undefined) {
    if (dp !== undefined) {
      if (!isInt) guardBoundary(value, dp, 0.05, `value ${value}`);
      tol = isInt && dp === 0 ? 0 : halfUnit(dp);
      model = dpStr(value, dp).replace("−", "-");
    } else if (nsf !== undefined || !isInt) {
      const n = nsf ?? 3;
      const places = dpFor(value, n);
      guardBoundary(value, places, 0.05, `value ${value}`);
      tol = halfUnit(places);
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
   * explanation). { value (exact), dp?, sf?, tol?, unit?, prefix? ("×" for a magnification), answer? (model text),
   * wrong: [values] }.
   */
  num({ label, marks = 1, stem, value, dp, sf: nsf, tol, unit, prefix, answer, wrong = [], explanation, workedSolution, hints, type = "NUMERICAL" }) {
    const { spec, payload, model } = numericSpec({ value, unit, dp, sf: nsf, tol });
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
// Exam-format plans (BRIEF.md, exam-format table). STRUCTURED items worth a reserved total must be examStyle, carry the
// plan's skill and (when the plan fixes them) its part labels and marks. Practice STRUCTURED items use 6, 8, 12, 14 or
// 16 marks.
export const EXAM = {
  /** ZIMSEC Paper 2, Cambridge Paper 2 (AS concepts) and Cambridge Paper 4 (A Level concepts): one structured question. */
  THEORY10: { total: 10, skill: "APPLICATION", secs: 900 },
  /** ZIMSEC Paper 3: short free-response essay, (a) 8 + (b) 12, self-marked with points and a model answer. */
  ZIM_P3_ESSAY: { total: 20, skill: "EVALUATION", labels: ["(a)", "(b)"], marks: [8, 12], applies: ZIM, secs: 1440 },
  /** ZIMSEC Paper 4 style, question 1: an investigation (results, processing, graph, conclusion, evaluation). */
  ZIM_P4_INVESTIGATION: { total: 20, skill: "ANALYSIS", applies: ZIM, secs: 3000 },
  /** Cambridge Paper 3 style, question 1: an investigation. */
  CAM_P3_INVESTIGATION: { total: 25, skill: "ANALYSIS", applies: CAM, secs: 3600 },
  /** ZIMSEC Paper 4 and Cambridge Paper 3 style: microscopy, drawing and measurement (both boards unless stated). */
  PRACTICAL_MICROSCOPY: { total: 15, skill: "APPLICATION", secs: 2700 },
  /** ZIMSEC Paper 4 (planning) and Cambridge Paper 5 question 1 style: planning an investigation. */
  PLANNING: { total: 15, skill: "EVALUATION", secs: 1800 },
  /** Cambridge Paper 5 question 2 style: analysis, statistics and evaluation of given data. */
  CAM_P5_ANALYSIS: { total: 15, skill: "ANALYSIS", applies: CAM, secs: 1800 },
};
/** STRUCTURED totals reserved for exam-format items. */
export const RESERVED_MARKS = [10, 15, 20, 25];

/** Throws when an exam item's parts do not match its plan's fixed labels and marks (plans without labels: total only). */
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
    if (q.type === "STRUCTURED" && RESERVED_MARKS.includes(m)) {
      const plan = Object.entries(EXAM).find(([, p]) => p.total === m && p.skill === q.skill);
      if (!examStyle || !plan) throw new Error(`${q.key}: a STRUCTURED item worth ${m} marks must be an exam-format item (examStyle and the skill of an EXAM plan); practice items use 6, 8, 12, 14 or 16 marks`);
      if (plan[1].applies && JSON.stringify(q.applies) !== JSON.stringify(plan[1].applies)) throw new Error(`${q.key}: ${plan[0]} items need applies ${JSON.stringify(plan[1].applies)}`);
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
// Biology helpers. All return exact values; round only for display (sfStr, dpStr) or let the builders do it. Data you
// invent is ORIGINAL and plausible (check it against real biology: a resting heart rate of 300 beats/min is not
// plausible). To print a table or a worked statistic for a lesson, write a small script in
// .scratch/biology-a/tables/<prefix><name>.mjs (NOT in slices/: every .mjs there is imported by the build) that imports
// these helpers and console.logs the output, and paste it.

/** Markdown table from headers and rows (cells are strings or numbers; format numbers first with dpStr / sfStr). */
export function table(headers, rows) {
  for (const r of rows) if (r.length !== headers.length) throw new Error(`table row has ${r.length} cells, expected ${headers.length}`);
  const esc = (c) => String(c).replace(/\|/g, "\\|");
  return [`| ${headers.map(esc).join(" | ")} |`, `|${headers.map(() => "---").join("|")}|`, ...rows.map((r) => `| ${r.map(esc).join(" | ")} |`)].join("\n");
}

// ---- Descriptive statistics (Cambridge Mathematical requirements; sample SD with n − 1)
export const sum = (xs) => xs.reduce((s, x) => s + x, 0);
export const mean = (xs) => sum(xs) / xs.length;
export const sorted = (xs) => [...xs].sort((a, b) => a - b);
export function median(xs) {
  const s = sorted(xs);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}
export const range = (xs) => Math.max(...xs) - Math.min(...xs);
/** Sample standard deviation s = √(Σ(x − x̄)² / (n − 1)). */
export function sd(xs) {
  if (xs.length < 2) throw new Error("sd: need at least two values");
  const m = mean(xs);
  return Math.sqrt(sum(xs.map((x) => (x - m) ** 2)) / (xs.length - 1));
}
/** Standard error SE = s / √n. */
export const se = (xs) => sd(xs) / Math.sqrt(xs.length);
/** 95% confidence interval by the syllabus approximation x̄ ± 2 × SE: { mean, se, lower, upper }. */
export function ci95(xs) {
  const m = mean(xs);
  const e = se(xs);
  return { mean: m, se: e, lower: m - 2 * e, upper: m + 2 * e };
}
/** Percentage change from a to b (exact). */
export const pctChange = (a, b) => {
  if (a === 0) throw new Error("pctChange: base is zero");
  return ((b - a) / a) * 100;
};
/** Percentage error of a measurement: (uncertainty / value) × 100. */
export const pctError = (uncertainty, value) => (uncertainty / value) * 100;

// ---- Probability distributions (for critical values; checked against published tables in the self-test below)
function lnGamma(z) {
  const g = 7;
  const c = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
  if (z < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * z)) - lnGamma(1 - z);
  z -= 1;
  let x = c[0];
  for (let i = 1; i < g + 2; i++) x += c[i] / (z + i);
  const tt = z + g + 0.5;
  return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(tt) - tt + Math.log(x);
}
/** Regularised lower incomplete gamma P(a, x). */
function gammaP(a, x) {
  if (x <= 0) return 0;
  if (x < a + 1) {
    let s = 1 / a;
    let term = s;
    for (let n = 1; n < 500; n++) {
      term *= x / (a + n);
      s += term;
      if (Math.abs(term) < Math.abs(s) * 1e-15) break;
    }
    return s * Math.exp(-x + a * Math.log(x) - lnGamma(a));
  }
  let b = x + 1 - a;
  let c = 1 / 1e-300;
  let d = 1 / b;
  let h = d;
  for (let i = 1; i < 500; i++) {
    const an = -i * (i - a);
    b += 2;
    d = an * d + b;
    if (Math.abs(d) < 1e-300) d = 1e-300;
    c = b + an / c;
    if (Math.abs(c) < 1e-300) c = 1e-300;
    d = 1 / d;
    const del = d * c;
    h *= del;
    if (Math.abs(del - 1) < 1e-15) break;
  }
  return 1 - Math.exp(-x + a * Math.log(x) - lnGamma(a)) * h;
}
/** Regularised incomplete beta I_x(a, b). */
function betaI(x, a, b) {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  const bt = Math.exp(lnGamma(a + b) - lnGamma(a) - lnGamma(b) + a * Math.log(x) + b * Math.log(1 - x));
  const cf = (x2, a2, b2) => {
    let c = 1;
    let d = 1 - ((a2 + b2) * x2) / (a2 + 1);
    if (Math.abs(d) < 1e-300) d = 1e-300;
    d = 1 / d;
    let h = d;
    for (let m = 1; m < 500; m++) {
      const m2 = 2 * m;
      let aa = (m * (b2 - m) * x2) / ((a2 + m2 - 1) * (a2 + m2));
      d = 1 + aa * d;
      if (Math.abs(d) < 1e-300) d = 1e-300;
      c = 1 + aa / c;
      if (Math.abs(c) < 1e-300) c = 1e-300;
      d = 1 / d;
      h *= d * c;
      aa = (-(a2 + m) * (a2 + b2 + m) * x2) / ((a2 + m2) * (a2 + m2 + 1));
      d = 1 + aa * d;
      if (Math.abs(d) < 1e-300) d = 1e-300;
      c = 1 + aa / c;
      if (Math.abs(c) < 1e-300) c = 1e-300;
      d = 1 / d;
      const del = d * c;
      h *= del;
      if (Math.abs(del - 1) < 1e-15) break;
    }
    return h;
  };
  return x < (a + 1) / (a + b + 2) ? (bt * cf(x, a, b)) / a : 1 - (bt * cf(1 - x, b, a)) / b;
}
/** P(χ² ≥ x) with v degrees of freedom. */
export const chiSquaredP = (x, v) => 1 - gammaP(v / 2, x / 2);
/** Two-tailed P(|T| ≥ t) with v degrees of freedom. */
export const tTwoTailedP = (tv, v) => betaI(v / (v + tv * tv), v / 2, 0.5);
function bisect(f, lo, hi) {
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    if (f(mid) > 0) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}
/** Critical value of χ² for v degrees of freedom at significance p (default 0.05), as printed in tables (2 d.p.). */
export const chiCrit = (v, p = 0.05) => round(bisect((x) => chiSquaredP(x, v) - p, 0, 200), 2);
/** Two-tailed critical value of t for v degrees of freedom at p (default 0.05), as printed in tables (2 d.p.). */
export const tCrit = (v, p = 0.05) => round(bisect((x) => tTwoTailedP(x, v) - p, 0, 1000), 2);

// ---- Chi-squared test (one row of data; Cambridge: formula provided, degrees of freedom = classes − 1)
/** Expected numbers from a ratio, e.g. expectedFromRatio(160, [9, 3, 3, 1]) → [90, 30, 30, 10]. */
export function expectedFromRatio(total, ratio) {
  const r = sum(ratio);
  return ratio.map((x) => (total * x) / r);
}
/**
 * χ² = Σ (O − E)² / E. Returns { rows: [{o, e, diff, diff2, term}], chi2, df, crit, p, significant } where crit is the
 * table value at p = 0.05 (2 d.p.) and significant means the difference is significant (reject the null hypothesis).
 * Throws if any expected value is below 5 (the test is unreliable: change the data).
 */
export function chiSquared(observed, expected, { p = 0.05 } = {}) {
  if (observed.length !== expected.length) throw new Error("chiSquared: observed and expected differ in length");
  if (Math.abs(sum(observed) - sum(expected)) > 1e-9) throw new Error(`chiSquared: totals differ (${sum(observed)} vs ${sum(expected)})`);
  if (expected.some((e) => e < 5)) throw new Error("chiSquared: an expected value is below 5; use larger numbers");
  const rows = observed.map((o, i) => {
    const e = expected[i];
    const diff = o - e;
    return { o, e, diff, diff2: diff * diff, term: (diff * diff) / e };
  });
  const chi2 = sum(rows.map((r) => r.term));
  const df = observed.length - 1;
  const crit = chiCrit(df, p);
  if (Math.abs(chi2 - crit) < 0.05) throw new Error(`chiSquared: χ² = ${chi2} is too close to the critical value ${crit}; change the data`);
  return { rows, chi2, df, crit, p: chiSquaredP(chi2, df), significant: chi2 > crit };
}

// ---- t-test (two independent samples, unpooled form as in the Cambridge formula; df = n1 + n2 − 2)
/** Returns { mean1, mean2, s1, s2, n1, n2, t, df, crit, p, significant } (t positive: |x̄1 − x̄2|). */
export function tTest(a, b, { p = 0.05 } = {}) {
  const m1 = mean(a);
  const m2 = mean(b);
  const s1 = sd(a);
  const s2 = sd(b);
  const tv = Math.abs(m1 - m2) / Math.sqrt((s1 * s1) / a.length + (s2 * s2) / b.length);
  const df = a.length + b.length - 2;
  const crit = tCrit(df, p);
  if (Math.abs(tv - crit) < 0.05) throw new Error(`tTest: t = ${tv} is too close to the critical value ${crit}; change the data`);
  return { mean1: m1, mean2: m2, s1, s2, n1: a.length, n2: b.length, t: tv, df, crit, p: tTwoTailedP(tv, df), significant: tv > crit };
}

// ---- Correlation
/** Pearson's r = (Σxy − n x̄ ȳ) / ((n − 1) sx sy), with the critical value at p = 0.05 (two-tailed, df = n − 2). */
export function pearson(xs, ys, { p = 0.05 } = {}) {
  if (xs.length !== ys.length) throw new Error("pearson: lengths differ");
  const n = xs.length;
  if (n < 5) throw new Error("pearson: at least five pairs");
  const r = (sum(xs.map((x, i) => x * ys[i])) - n * mean(xs) * mean(ys)) / ((n - 1) * sd(xs) * sd(ys));
  const tc = bisect((x) => tTwoTailedP(x, n - 2) - p, 0, 1000);
  const crit = round(tc / Math.sqrt(n - 2 + tc * tc), 3);
  return { r, n, crit, significant: Math.abs(r) > crit };
}
/** Ranks (1 = smallest), ties given the mean of the ranks they span. */
export function ranks(xs) {
  const idx = xs.map((x, i) => [x, i]).sort((a, b) => a[0] - b[0]);
  const out = new Array(xs.length);
  for (let i = 0; i < idx.length; ) {
    let j = i;
    while (j + 1 < idx.length && idx[j + 1][0] === idx[i][0]) j++;
    const r = (i + j) / 2 + 1;
    for (let k = i; k <= j; k++) out[idx[k][1]] = r;
    i = j + 1;
  }
  return out;
}
/**
 * Two-tailed critical values of Spearman's rs at p = 0.05 for n = 5-20 (n = 5-10 checked by exact enumeration of all
 * permutations; n = 11-20 from the widely used table of Zar). Always print the critical value you use in the stem.
 */
export const SPEARMAN_CRIT_05 = { 5: 1.0, 6: 0.886, 7: 0.786, 8: 0.738, 9: 0.7, 10: 0.648, 11: 0.618, 12: 0.587, 13: 0.56, 14: 0.538, 15: 0.521, 16: 0.503, 17: 0.485, 18: 0.472, 19: 0.46, 20: 0.447 };
/** Spearman's rs = 1 − 6ΣD² / (n³ − n), with ranks, D and D² per pair and the critical value at p = 0.05. */
export function spearman(xs, ys) {
  if (xs.length !== ys.length) throw new Error("spearman: lengths differ");
  const n = xs.length;
  const crit = SPEARMAN_CRIT_05[n];
  if (crit === undefined) throw new Error("spearman: use 5-20 pairs");
  const rx = ranks(xs);
  const ry = ranks(ys);
  const rows = xs.map((x, i) => ({ x, y: ys[i], rx: rx[i], ry: ry[i], d: rx[i] - ry[i], d2: (rx[i] - ry[i]) ** 2 }));
  const sumD2 = sum(rows.map((r) => r.d2));
  const rs = 1 - (6 * sumD2) / (n ** 3 - n);
  if (Math.abs(Math.abs(rs) - crit) < 0.01) throw new Error(`spearman: rs = ${rs} is too close to the critical value ${crit}; change the data`);
  return { rows, sumD2, rs, n, crit, significant: Math.abs(rs) > crit };
}

// ---- Ecology
/** Simpson's index of diversity D = 1 − Σ(n/N)². counts: numbers of each species. */
export function simpson(counts) {
  const N = sum(counts);
  const rows = counts.map((n) => ({ n, frac: n / N, frac2: (n / N) ** 2 }));
  return { N, rows, sumFrac2: sum(rows.map((r) => r.frac2)), D: 1 - sum(rows.map((r) => r.frac2)) };
}
/** Lincoln index N = n1 × n2 ÷ m2. */
export const lincoln = (n1, n2, m2) => {
  if (m2 <= 0 || m2 > n2 || m2 > n1) throw new Error("lincoln: need 0 < m2 ≤ n2 and m2 ≤ n1");
  return (n1 * n2) / m2;
};
/**
 * Hardy-Weinberg from the frequency of the homozygous recessive genotype q² (or from counts { AA, Aa, aa } when the
 * genotypes are distinguishable): returns { p, q, p2, twoPQ, q2 }.
 */
export function hardyWeinberg({ q2, counts }) {
  let q;
  if (counts) {
    const n = counts.AA + counts.Aa + counts.aa;
    q = (2 * counts.aa + counts.Aa) / (2 * n);
  } else {
    if (!(q2 > 0 && q2 < 1)) throw new Error("hardyWeinberg: q2 must be between 0 and 1");
    q = Math.sqrt(q2);
  }
  const p = 1 - q;
  return { p, q, p2: p * p, twoPQ: 2 * p * q, q2: q * q };
}

// ---- Cells and microscopy (lengths in µm unless named)
export const UM_PER = { nm: 0.001, "µm": 1, mm: 1000, cm: 10000, m: 1e6 };
/** Converts a length between nm, µm, mm, cm and m. */
export const convert = (value, from, to) => {
  if (!(from in UM_PER) || !(to in UM_PER)) throw new Error(`convert: unknown unit ${from} or ${to}`);
  return (value * UM_PER[from]) / UM_PER[to];
};
/** Magnification = image size ÷ actual size (both converted to the same unit first). */
export const magnification = (image, imageUnit, actual, actualUnit) => convert(image, imageUnit, "µm") / convert(actual, actualUnit, "µm");
/** Actual size (in `outUnit`) = image size ÷ magnification. */
export const actualSize = (image, imageUnit, mag, outUnit = "µm") => convert(image / mag, imageUnit, outUnit);
/** Value of one eyepiece-graticule division in µm: stage divisions × µm per stage division ÷ eyepiece divisions. */
export const graticuleUnit = ({ stageDivisions, umPerStageDivision = 10, eyepieceDivisions }) => (stageDivisions * umPerStageDivision) / eyepieceDivisions;
/** Mitotic index = cells in mitosis ÷ total cells (as a fraction; × 100 for a percentage). */
export const mitoticIndex = (inMitosis, total) => inMitosis / total;
/** Surface area, volume and SA:V of a cube (side), cuboid ([l, w, h]) or cylinder ({ r, h }). */
export function sav(shape) {
  let area;
  let vol;
  if (typeof shape === "number") {
    area = 6 * shape * shape;
    vol = shape ** 3;
  } else if (Array.isArray(shape)) {
    const [l, w, h] = shape;
    area = 2 * (l * w + l * h + w * h);
    vol = l * w * h;
  } else {
    const { r, h } = shape;
    area = 2 * Math.PI * r * r + 2 * Math.PI * r * h;
    vol = Math.PI * r * r * h;
  }
  return { area, vol, ratio: area / vol };
}
/**
 * Water potential (or concentration) at which a tissue neither gains nor loses mass: the x-intercept of percentage
 * change in mass against x, by linear interpolation between the two readings either side of zero.
 */
export function zeroCrossing(xs, ys) {
  for (let i = 0; i + 1 < xs.length; i++) {
    if (ys[i] === 0) return xs[i];
    if (Math.sign(ys[i]) !== Math.sign(ys[i + 1])) return xs[i] + ((0 - ys[i]) * (xs[i + 1] - xs[i])) / (ys[i + 1] - ys[i]);
  }
  throw new Error("zeroCrossing: the data never cross zero");
}

// ---- Energy, respiration and photosynthesis
/** RQ = CO2 produced ÷ O2 taken in. */
export const rq = (co2, o2) => co2 / o2;
/** RQ for complete aerobic respiration of CxHyOz: O2 needed = x + y/4 − z/2; RQ = x ÷ O2. */
export const rqFormula = ({ C, H, O }) => C / (C + H / 4 - O / 2);
/** Volume of gas in a capillary tube from the distance moved by the meniscus: πr²l (same length unit for r and l). */
export const capillaryVolume = (r, l) => Math.PI * r * r * l;
/** Rf = distance moved by the spot ÷ distance moved by the solvent front. */
export const rf = (spot, front) => {
  if (spot > front) throw new Error("rf: the spot cannot move further than the solvent front");
  return spot / front;
};
/** Light intensity by the inverse square law (relative): 1 / d². */
export const inverseSquare = (d) => 1 / (d * d);

// ---- Transport and genetics
/** Cardiac output = stroke volume × heart rate. */
export const cardiacOutput = (strokeVolume, heartRate) => strokeVolume * heartRate;
/** Number of DNA molecules after n PCR cycles from n0 starting molecules (ideal doubling). */
export const pcrCopies = (n0, cycles) => n0 * 2 ** cycles;
/** Number of genetically different gametes from independent assortment alone: 2^n (n = haploid number). */
export const assortmentCombos = (n) => 2 ** n;
/** Chargaff: from the percentage of one base in double-stranded DNA, the percentages of all four. */
export function chargaff(base, pct) {
  const pair = { A: "T", T: "A", C: "G", G: "C" }[base];
  if (!pair) throw new Error("chargaff: base must be A, T, C or G");
  const other = (100 - 2 * pct) / 2;
  const out = { A: 0, T: 0, C: 0, G: 0 };
  out[base] = pct;
  out[pair] = pct;
  for (const k of Object.keys(out)) if (k !== base && k !== pair) out[k] = other;
  return out;
}
/** Complementary DNA strand (5'→3' reading kept in the same direction as given), or mRNA from a template strand. */
export const complement = (seq, { rna = false } = {}) =>
  seq
    .toUpperCase()
    .split("")
    .map((b) => ({ A: rna ? "U" : "T", T: "A", U: "A", C: "G", G: "C" })[b] ?? b)
    .join("");

// ---------------------------------------------------------------------------------------------------------------------
// Self-test against published table values (runs at import; cheap). If it fails, the distributions above are wrong.
chk(chiCrit(1), 3.84, 0, "chi2 df1");
chk(chiCrit(2), 5.99, 0, "chi2 df2");
chk(chiCrit(3), 7.81, 0, "chi2 df3");
chk(chiCrit(1, 0.01), 6.63, 0, "chi2 df1 p0.01");
chk(tCrit(10), 2.23, 0, "t df10");
chk(tCrit(18), 2.1, 0, "t df18");
chk(tCrit(4), 2.78, 0, "t df4");
chk(round(pearson([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [2, 1, 4, 3, 6, 5, 8, 7, 10, 9]).crit, 3), 0.632, 0, "pearson crit n10");
