// Authoring helpers for chemistry-a questions and flashcards (adapted from .scratch/biology-a/lib.mjs, itself from
// .scratch/additional-mathematics/lib.mjs, .scratch/economics/lib.mjs and .scratch/english/lib.mjs, with the
// unit-aware numeric builders of .scratch/combined-science/lib.mjs). Concept modules call concept(...) with a builder;
// build-content.mjs writes the JSON files. Chemistry helpers at the end: rounding and checks, table(), the data-booklet
// constants and relative atomic masses, Mr from a formula, moles and gases, titrations, energetics (q = mcΔT, Hess,
// bond energies, Born-Haber, entropy and Gibbs), electrochemistry (E⦵cell, Nernst, ΔG = −nFE, Faraday), equilibria (Kc,
// Kp, mole fractions), acids (pH, Ka, buffers, Ksp), kinetics (orders, rate constants, half-life), partition,
// chromatography, mass spectrometry, uncertainties, and the exam-format plans (EXAM).
//
// LaTeX and mhchem: write them with t`...` (String.raw), so backslashes are single in the source (t`$\ce{H2SO4}$`,
// t`$K_\mathrm{c}$`) and JSON.stringify doubles them in the files. In a normal "..." string you would have to write
// "\\ce". ce("SO4^2-") returns the string $\ce{SO4^2-}$. Money is US\$ (a bare $ starts maths).
//
// EVERY number in an answer, a mark scheme or a data table you invent is computed in code with these helpers and passed
// EXACT to the builders; the builders round for display and set a tolerance that accepts every correctly rounded answer.
// Never type a computed value by hand: use chk(...) to assert a value you also write in prose.
export const t = String.raw;
/** mhchem inline: ce("2H2 + O2 -> 2H2O") → "$\ce{2H2 + O2 -> 2H2O}$". */
export const ce = (s) => `$\\ce{${s}}$`;

// Selectors for `applies` (an item is tagged only to the syllabi it names). Omit applies for content valid for both.
export const ZIM = ["zimsec"];
export const CAM = ["cambridge/a-level/chemistry"];

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
// pH, pKa, Kpc, Rf, relative masses and other ratios have NO unit: omit `unit`.
const UNITS = {
  nm: ["nm", "nanometres", "nanometre"],
  cm: ["cm", "centimetres", "centimetre"],
  m: ["m", "metres", "metre"],
  "cm⁻¹": ["cm⁻¹", "cm^-1", "cm-1", "per cm", "/cm"],
  "cm³": ["cm³", "cm^3", "cm3", "ml", "mL", "cubic centimetres"],
  "dm³": ["dm³", "dm^3", "dm3", "litres", "litre", "l", "L"],
  "m³": ["m³", "m^3", "m3", "cubic metres"],
  mg: ["mg", "milligrams", "milligram"],
  g: ["g", "grams", "gram"],
  kg: ["kg", "kilograms", "kilogram"],
  tonnes: ["tonnes", "tonne", "t"],
  mol: ["mol", "moles", "mole"],
  "mol⁻¹": ["mol⁻¹", "mol^-1", "mol-1", "per mole", "/mol"],
  "g/mol": ["g/mol", "g mol^-1", "g mol-1", "g mol⁻¹", "grams per mole"],
  "g/cm³": ["g/cm³", "g cm^-3", "g cm-3", "g/cm3"],
  "g/dm³": ["g/dm³", "g dm^-3", "g dm-3", "g/dm3", "g/l"],
  "mol/dm³": ["mol/dm³", "mol dm^-3", "mol dm-3", "mol dm⁻³", "mol/dm3", "M", "mol/l"],
  "mol²/dm⁶": ["mol²/dm⁶", "mol^2 dm^-6", "mol2 dm-6", "mol² dm⁻⁶"],
  "mol³/dm⁹": ["mol³/dm⁹", "mol^3 dm^-9", "mol3 dm-9", "mol³ dm⁻⁹"],
  "dm³/mol": ["dm³/mol", "dm^3 mol^-1", "dm3 mol-1", "dm³ mol⁻¹"],
  "dm⁶/mol²": ["dm⁶/mol²", "dm^6 mol^-2", "dm6 mol-2", "dm⁶ mol⁻²"],
  "mol/dm³/s": ["mol/dm³/s", "mol dm^-3 s^-1", "mol dm-3 s-1", "mol dm⁻³ s⁻¹"],
  "dm³/mol/s": ["dm³/mol/s", "dm^3 mol^-1 s^-1", "dm3 mol-1 s-1", "dm³ mol⁻¹ s⁻¹"],
  "dm⁶/mol²/s": ["dm⁶/mol²/s", "dm^6 mol^-2 s^-1", "dm6 mol-2 s-1", "dm⁶ mol⁻² s⁻¹"],
  Pa: ["Pa", "pascals", "pascal", "N/m^2", "N m-2"],
  kPa: ["kPa", "kilopascals"],
  "kPa⁻¹": ["kPa⁻¹", "kPa^-1", "kPa-1"],
  "kPa⁻²": ["kPa⁻²", "kPa^-2", "kPa-2"],
  atm: ["atm", "atmospheres", "atmosphere"],
  K: ["K", "kelvin", "kelvins"],
  "°C": ["°C", "degrees Celsius", "degrees C", "deg C", "C", "degrees"],
  J: ["J", "joules", "joule"],
  kJ: ["kJ", "kilojoules", "kilojoule"],
  "J/g/K": ["J/g/K", "J g^-1 K^-1", "J g-1 K-1", "J g⁻¹ K⁻¹"],
  "kJ/mol": ["kJ/mol", "kJ mol^-1", "kJ mol-1", "kJ mol⁻¹"],
  "J/K/mol": ["J/K/mol", "J K^-1 mol^-1", "J K-1 mol-1", "J K⁻¹ mol⁻¹", "J/(K mol)"],
  "kJ/K/mol": ["kJ/K/mol", "kJ K^-1 mol^-1", "kJ K-1 mol-1", "kJ K⁻¹ mol⁻¹"],
  V: ["V", "volts", "volt"],
  C: ["C", "coulombs", "coulomb"],
  "C/mol": ["C/mol", "C mol^-1", "C mol-1", "C mol⁻¹"],
  A: ["A", "amperes", "ampere", "amps", "amp"],
  mA: ["mA", "milliamperes", "milliamps"],
  s: ["s", "seconds", "second", "sec", "secs"],
  "s⁻¹": ["s⁻¹", "s^-1", "s-1", "/s", "per second"],
  min: ["min", "minutes", "minute", "mins"],
  h: ["h", "hours", "hour", "hrs", "hr"],
  "%": ["%", "percent", "per cent"],
  ppm: ["ppm", "parts per million"],
  "cm³/s": ["cm³/s", "cm^3/s", "cm3/s", "cm³ s⁻¹", "cm3 s-1"],
  "cm³/min": ["cm³/min", "cm^3/min", "cm3/min", "cm³ min⁻¹", "cm3 min-1"],
  "g/s": ["g/s", "g s^-1", "g s-1"],
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
  // Very large or very small values (Avogadro-sized counts, Ka, Ksp, rate constants) are treated as 3 s.f. decimals and
  // shown in standard form; students may type 1.8e-5, 1.8x10^-5 or 1.8×10^-5.
  const tiny = value !== 0 && (Math.abs(value) < 1e-3 || Math.abs(value) >= 1e6);
  const isInt = !tiny && Math.abs(value - Math.round(value)) < 1e-12;
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
  if (tiny && dp === undefined) model = sciModel(value, nsf ?? 3);
  const spec = { value: isInt ? Math.round(value) : value };
  if (tol) spec.tolerance = { kind: "absolute", amount: Number(tol.toPrecision(3)) };
  const payload = {};
  if (unit) {
    payload.unitHint = unit;
    spec.units = { required: false, accepted: UNITS[unit] };
  }
  return { spec, payload, model };
}

/** Standard-form model answer text such as "1.80×10^-5" (parsed by the marker). */
function sciModel(x, n) {
  let e = Math.floor(Math.log10(Math.abs(x)));
  let m = Number((x / 10 ** e).toPrecision(n));
  if (Math.abs(m) >= 10) { m /= 10; e += 1; }
  return `${m.toFixed(n - 1)}×10^${e}`;
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
   * accepted spelling (British spelling: sulfur, aluminium; add common correct variants such as "sulphuric acid" for
   * ZIMSEC, "ethanoic acid"/"acetic acid", "propan-2-ol"/"2-propanol"). model defaults to the first accepted answer.
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
// Exam-format plans (BRIEF.md, exam-format table). STRUCTURED items worth a reserved total must be examStyle and carry
// the plan's skill; (total, skill) pairs are unique, so the plan is found from them. Practice STRUCTURED items use 6, 8,
// 12, 14 or 16 marks.
export const EXAM = {
  /** ZIMSEC Paper 2 (six compulsory 10-mark questions), Cambridge Paper 2 (AS concepts) and Paper 4 (A Level concepts). */
  THEORY10: { total: 10, skill: "APPLICATION", secs: 900 },
  /** ZIMSEC Paper 3: one free-response question (sections A physical, B inorganic, C organic, D applied). */
  ZIM_P3_FREE: { total: 15, skill: "UNDERSTANDING", applies: ZIM, secs: 1500 },
  /** ZIMSEC Paper 4 question style: quantitative analysis (a titration or a measured quantity). */
  ZIM_P4_QUANTITATIVE: { total: 20, skill: "ANALYSIS", applies: ZIM, secs: 3600 },
  /** Cambridge Paper 3 quantitative question style (titration, or rate, thermometric, gravimetric or gas-volume work). */
  CAM_P3_QUANTITATIVE: { total: 25, skill: "ANALYSIS", applies: CAM, secs: 4200 },
  /** ZIMSEC Paper 4 and Cambridge Paper 3 style: qualitative analysis of an unknown (both boards unless stated). */
  QUALITATIVE_ANALYSIS: { total: 15, skill: "APPLICATION", secs: 2700 },
  /** ZIMSEC Paper 4 planning/design and Cambridge Paper 5 question 1 style: planning an experiment. */
  PLANNING: { total: 15, skill: "EVALUATION", secs: 1800 },
  /** Cambridge Paper 5 question 2 style: analysis and evaluation of given data. */
  CAM_P5_ANALYSIS: { total: 15, skill: "ANALYSIS", applies: CAM, secs: 1800 },
};
for (const [a, p] of Object.entries(EXAM)) for (const [b, q] of Object.entries(EXAM)) if (a < b && p.total === q.total && p.skill === q.skill) throw new Error(`EXAM plans ${a} and ${b} share total and skill`);
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
// Chemistry helpers. All return exact values; round only for display (sfStr, dpStr, sciStr) or let the builders do it.
// Data you invent is ORIGINAL and plausible (a titre of 95 cm³ from a 50 cm³ burette is not). Use the data-booklet
// constants below (the Cambridge 9701 Data section; state the values in ZIMSEC stems). To print a table or a worked
// calculation for a lesson, write a small script in .scratch/chemistry-a/tables/<prefix><name>.mjs (NOT in slices/:
// every .mjs there is imported by the build) that imports these helpers and console.logs the output, and paste it.

/** Markdown table from headers and rows (cells are strings or numbers; format numbers first with dpStr / sfStr). */
export function table(headers, rows) {
  for (const r of rows) if (r.length !== headers.length) throw new Error(`table row has ${r.length} cells, expected ${headers.length}`);
  const esc = (c) => String(c).replace(/\|/g, "\\|");
  return [`| ${headers.map(esc).join(" | ")} |`, `|${headers.map(() => "---").join("|")}|`, ...rows.map((r) => `| ${r.map(esc).join(" | ")} |`)].join("\n");
}

/** "1.80 × 10⁻⁵"-style display string to n s.f. as LaTeX ($1.80 \times 10^{-5}$ when latex = true). */
export function sciStr(x, n = 3, { latex = false } = {}) {
  if (x === 0) return "0";
  const e = Math.floor(Math.log10(Math.abs(x)));
  let m = x / 10 ** e;
  let ee = e;
  if (Math.abs(Number(m.toPrecision(n))) >= 10) { m /= 10; ee += 1; }
  const ms = Number(m.toPrecision(n)).toFixed(n - 1);
  if (latex) return `$${ms.replace("-", "-")} \\times 10^{${ee}}$`;
  const sup = String(ee).replace(/-/g, "⁻").replace(/\d/g, (d) => "⁰¹²³⁴⁵⁶⁷⁸⁹"[d]);
  return `${ms.replace("-", "−")} × 10${sup}`;
}

// ---- Constants (Cambridge 9701 Data section, 2025-2027)
export const R = 8.31; // J K⁻¹ mol⁻¹
export const F = 9.65e4; // C mol⁻¹
export const L = 6.022e23; // mol⁻¹
export const E_CHARGE = 1.6e-19; // C (magnitude)
export const VM_RTP = 24.0; // dm³ mol⁻¹ at room conditions
export const VM_STP = 22.4; // dm³ mol⁻¹ at s.t.p. (273 K, 101 kPa)
export const KW = 1.0e-14; // mol² dm⁻⁶ at 298 K
export const C_WATER = 4.18; // J g⁻¹ K⁻¹
export const NERNST = 0.059; // V, at 298 K, in E = E⦵ + (0.059/z) log([ox]/[red])

// ---- Relative atomic masses as printed in the Cambridge 9701 Periodic Table (1 d.p.). ZIMSEC stems should state the
// values used when they matter (older papers use Cl 35.5, Cu 63.5 as here, but some use whole numbers).
export const AR = {
  H: 1.0, He: 4.0, Li: 6.9, Be: 9.0, B: 10.8, C: 12.0, N: 14.0, O: 16.0, F: 19.0, Ne: 20.2, Na: 23.0, Mg: 24.3, Al: 27.0,
  Si: 28.1, P: 31.0, S: 32.1, Cl: 35.5, Ar: 39.9, K: 39.1, Ca: 40.1, Sc: 45.0, Ti: 47.9, V: 50.9, Cr: 52.0, Mn: 54.9,
  Fe: 55.8, Co: 58.9, Ni: 58.7, Cu: 63.5, Zn: 65.4, Ga: 69.7, Ge: 72.6, As: 74.9, Se: 79.0, Br: 79.9, Kr: 83.8, Rb: 85.5,
  Sr: 87.6, Ag: 107.9, Cd: 112.4, Sn: 118.7, I: 126.9, Xe: 131.3, Cs: 132.9, Ba: 137.3, Pt: 195.1, Au: 197.0, Hg: 200.6,
  Pb: 207.2, Pd: 106.4, Rh: 102.9, U: 238.0, D: 2.0,
};

/**
 * Relative formula mass from a formula string: "H2SO4", "Ca(OH)2", "CuSO4.5H2O" (or "CuSO4·5H2O"), "[Cu(NH3)4]SO4",
 * "C2H5OH". Ar values from AR (override with a second argument, e.g. { Cu: 64 }).
 */
export function Mr(formula, ar = {}) {
  const table_ = { ...AR, ...ar };
  const parts = formula.replace(/\s/g, "").split(/[.·]/);
  let total = 0;
  for (const part of parts) {
    const m = /^(\d+)(.*)$/.exec(part);
    const mult = m ? Number(m[1]) : 1;
    const body = m ? m[2] : part;
    let i = 0;
    const parse = () => {
      let sum = 0;
      while (i < body.length) {
        const ch = body[i];
        if (ch === "(" || ch === "[") {
          i++;
          const inner = parse();
          const n = /^\d+/.exec(body.slice(i));
          i += n ? n[0].length : 0;
          sum += inner * (n ? Number(n[0]) : 1);
        } else if (ch === ")" || ch === "]") {
          i++;
          return sum;
        } else {
          const el = /^[A-Z][a-z]?/.exec(body.slice(i));
          if (!el) throw new Error(`Mr: cannot parse "${formula}" at "${body.slice(i)}"`);
          if (table_[el[0]] === undefined) throw new Error(`Mr: no Ar for ${el[0]}`);
          i += el[0].length;
          const n = /^\d+/.exec(body.slice(i));
          i += n ? n[0].length : 0;
          sum += table_[el[0]] * (n ? Number(n[0]) : 1);
        }
      }
      return sum;
    };
    total += mult * parse();
  }
  return total;
}

// ---- Amounts
export const moles = (mass, M) => mass / M;
export const massOf = (n, M) => n * M;
/** Amount in mol from a volume in cm³ and a concentration in mol dm⁻³. */
export const molesFromSolution = (volumeCm3, conc) => (volumeCm3 / 1000) * conc;
/** Concentration in mol dm⁻³ from an amount and a volume in cm³. */
export const concFrom = (n, volumeCm3) => n / (volumeCm3 / 1000);
export const gasVolumeRTP = (n) => n * VM_RTP; // dm³
export const particles = (n) => n * L;
export const percentYield = (actual, theoretical) => (actual / theoretical) * 100;
export const percentPurity = (pureMass, sampleMass) => (pureMass / sampleMass) * 100;

/** Relative atomic mass from isotopes: [[mass, abundance], ...] (abundances in any consistent unit). */
export function arFromIsotopes(isotopes) {
  const total = isotopes.reduce((s, [, a]) => s + a, 0);
  return isotopes.reduce((s, [m, a]) => s + m * a, 0) / total;
}

/**
 * Empirical formula from masses or percentages: { C: 85.7, H: 14.3 } → { ratio: { C: 1, H: 2 }, raw: {...} }. Throws
 * unless the mole ratio is within tol of a small whole-number ratio (multipliers 1-6 tried), so invented data must fit.
 */
export function empiricalFormula(byMass, { tol = 0.03, ar = {} } = {}) {
  const table_ = { ...AR, ...ar };
  const raw = Object.fromEntries(Object.entries(byMass).map(([el, m]) => [el, m / table_[el]]));
  const min = Math.min(...Object.values(raw));
  for (let k = 1; k <= 6; k++) {
    const r = Object.fromEntries(Object.entries(raw).map(([el, v]) => [el, (v / min) * k]));
    if (Object.values(r).every((v) => Math.abs(v - Math.round(v)) <= tol * Math.max(1, Math.round(v)))) {
      return { ratio: Object.fromEntries(Object.entries(r).map(([el, v]) => [el, Math.round(v)])), raw };
    }
  }
  throw new Error(`empiricalFormula: ratio ${JSON.stringify(raw)} is not close to whole numbers: change the data`);
}

// ---- Gases (SI units: p in Pa, V in m³, T in K)
export const idealGasMoles = (pPa, Vm3, TK) => (pPa * Vm3) / (R * TK);
/** Mr of a gas or vapour: mass (g), p (Pa), V (m³), T (K). */
export const mrFromGas = (massG, pPa, Vm3, TK) => (massG * R * TK) / (pPa * Vm3);
export const cm3ToM3 = (v) => v * 1e-6;
export const dm3ToM3 = (v) => v * 1e-3;
export const cToK = (c) => c + 273;
export const kPaToPa = (p) => p * 1000;

// ---- Titrations
/** Mean of concordant titres: the largest set of accurate titres whose range is within 0.10 cm³ (at least two). */
export function meanTitre(titres, { within = 0.1 } = {}) {
  const s = [...titres].sort((a, b) => a - b);
  let best = null;
  for (let i = 0; i < s.length; i++) {
    let j = i;
    while (j + 1 < s.length && s[j + 1] - s[i] <= within + 1e-9) j++;
    if (j > i && (!best || j - i + 1 > best.length)) best = s.slice(i, j + 1);
  }
  if (!best) throw new Error(`meanTitre: no two titres within ${within} cm³ in ${titres.join(", ")}`);
  return { mean: best.reduce((a, x) => a + x, 0) / best.length, used: best };
}
/** Burette titre from initial and final readings (cm³, to 0.05). */
export function titre(initial, final) {
  for (const r of [initial, final]) if (Math.abs(r * 20 - Math.round(r * 20)) > 1e-9) throw new Error(`burette reading ${r} is not to the nearest 0.05 cm³`);
  return final - initial;
}

// ---- Energetics
/** Heat energy q in J: mass (g) × c (J g⁻¹ K⁻¹, default water) × ΔT (K). */
export const heatQ = (massG, dT, c = C_WATER) => massG * c * dT;
/** ΔH in kJ mol⁻¹ from q (J) and amount (mol); exothermic (temperature rise) gives a negative value. */
export const deltaHFromQ = (qJ, n, { exothermic = true } = {}) => ((exothermic ? -1 : 1) * qJ) / 1000 / n;
/** Σ(n × value) for a list of [coefficient, value]. */
export const sumTerms = (terms) => terms.reduce((s, [n, v]) => s + n * v, 0);
/** ΔH from enthalpies of formation: products and reactants as [[coefficient, ΔHf], ...]. */
export const hessFormation = (products, reactants) => sumTerms(products) - sumTerms(reactants);
/** ΔH from enthalpies of combustion: reactants minus products. */
export const hessCombustion = (reactants, products) => sumTerms(reactants) - sumTerms(products);
/** ΔH from bond energies: bonds broken minus bonds made, each [[count, bond energy], ...]. */
export const bondEnergyDH = (broken, made) => sumTerms(broken) - sumTerms(made);
/**
 * Born-Haber: lattice energy = ΔHf − (sum of the other terms on the route from the elements to the gaseous ions).
 * terms: atomisations, ionisation energies, electron affinities (with signs), all in kJ mol⁻¹.
 */
export const latticeEnergyFromCycle = (dHf, terms) => dHf - terms.reduce((s, x) => s + x, 0);
/** ΔHsol = −ΔHlatt (lattice energy as formation from gaseous ions) + ΣΔHhyd. */
export const solutionEnthalpy = (latticeEnergy, hydrations) => -latticeEnergy + hydrations.reduce((s, x) => s + x, 0);
/** ΔS (J K⁻¹ mol⁻¹) = ΣS(products) − ΣS(reactants), each [[coefficient, S], ...]. */
export const entropyChange = (products, reactants) => sumTerms(products) - sumTerms(reactants);
/** ΔG in kJ mol⁻¹ from ΔH (kJ mol⁻¹), T (K) and ΔS (J K⁻¹ mol⁻¹): the unit conversion is built in. */
export const gibbs = (dH_kJ, TK, dS_J) => dH_kJ - (TK * dS_J) / 1000;
/** Temperature (K) at which ΔG = 0. */
export const feasibilityT = (dH_kJ, dS_J) => (dH_kJ * 1000) / dS_J;

// ---- Electrochemistry
/** E⦵cell = E⦵(reduction at the positive electrode) − E⦵(the other). */
export const ecell = (ePositive, eNegative) => ePositive - eNegative;
/** Nernst: E = E⦵ + (0.059/z) log10([oxidised]/[reduced]) (for a metal/ion couple pass reduced = 1). */
export const nernst = (e0, z, oxidised, reduced = 1) => e0 + (NERNST / z) * Math.log10(oxidised / reduced);
/** ΔG⦵ in kJ mol⁻¹ from n electrons and E⦵cell (V). */
export const gibbsFromE = (n, eCell) => (-n * eCell * F) / 1000;
/** Charge Q = It (A, s). */
export const charge = (I, tSeconds) => I * tSeconds;
export const molesElectrons = (Q) => Q / F;
/** Mass (g) liberated: Q (C), molar mass (g mol⁻¹), z electrons per ion or atom. */
export const massLiberated = (Q, M, z) => (Q / (z * F)) * M;
/** Gas volume (dm³ at room conditions) liberated: Q (C), z electrons per molecule (2 for H₂, 4 for O₂, 2 for Cl₂). */
export const gasLiberatedRTP = (Q, z) => (Q / (z * F)) * VM_RTP;
/** Avogadro constant from an electrolysis experiment: Q (C), mass change (g), M, z. */
export const avogadroFromElectrolysis = (Q, massChange, M, z) => Q / (z * (massChange / M)) / E_CHARGE;

// ---- Equilibria
/** Equilibrium constant from [[coefficient, concentration or partial pressure], ...] of products and reactants. */
export const kEq = (products, reactants) => products.reduce((p, [n, c]) => p * c ** n, 1) / reactants.reduce((p, [n, c]) => p * c ** n, 1);
/** Mole fractions and partial pressures from amounts and total pressure: { A: n, B: n }, p → { A: { x, p } ... }. */
export function partialPressures(amounts, total) {
  const sum = Object.values(amounts).reduce((s, x) => s + x, 0);
  return Object.fromEntries(Object.entries(amounts).map(([k, n]) => [k, { x: n / sum, p: (n / sum) * total }]));
}
/**
 * Equilibrium amounts from initial amounts, the equation coefficients (negative for reactants) and the change in
 * amount of one species: ice({ N2: 1, H2: 3, NH3: 0 }, { N2: -1, H2: -3, NH3: 2 }, "NH3", 0.4) → amounts at equilibrium.
 * Throws if any amount goes negative.
 */
export function ice(initial, coeffs, species, change) {
  const extent = change / coeffs[species];
  const out = {};
  for (const [k, n0] of Object.entries(initial)) {
    out[k] = n0 + coeffs[k] * extent;
    if (out[k] < -1e-12) throw new Error(`ice: negative amount of ${k}`);
  }
  return out;
}

// ---- Acids, bases, buffers, solubility (concentrations in mol dm⁻³, 298 K)
export const pH = (h) => -Math.log10(h);
export const hFromPH = (p) => 10 ** -p;
export const pOH = (oh) => -Math.log10(oh);
export const pKa = (Ka) => -Math.log10(Ka);
export const kaFromPKa = (pk) => 10 ** -pk;
/** pH of a strong alkali from [OH⁻]. */
export const pHStrongBase = (oh, kw = KW) => pH(kw / oh);
/** pH of a weak acid with the usual approximation [H⁺] = √(Ka c). */
export const pHWeakAcid = (Ka, c) => pH(Math.sqrt(Ka * c));
/** Ka from pH and concentration of a weak acid (same approximation). */
export const kaFromPH = (pHv, c) => hFromPH(pHv) ** 2 / c;
/** pH of an acidic buffer: Ka, [acid], [salt anion] (or amounts in the same volume). */
export const bufferPH = (Ka, acid, salt) => pH((Ka * acid) / salt);
/** Ksp of a salt AxBy from its solubility s (mol dm⁻³): (xs)^x (ys)^y. */
export const kspFromSolubility = (s, x = 1, y = 1) => (x * s) ** x * (y * s) ** y;
/** Solubility (mol dm⁻³) of AxBy from Ksp. */
export const solubilityFromKsp = (Ksp, x = 1, y = 1) => (Ksp / (x ** x * y ** y)) ** (1 / (x + y));
/**
 * Solubility of AxBy in a solution that already contains the common ion at concentration c (mol dm⁻³), using the
 * usual approximation that c is unchanged: commonIon = "anion" (B present) or "cation" (A present).
 */
export function solubilityCommonIon(Ksp, c, { x = 1, y = 1, commonIon = "anion" } = {}) {
  return commonIon === "anion" ? (Ksp / c ** y) ** (1 / x) / x : (Ksp / c ** x) ** (1 / y) / y;
}

// ---- Kinetics
/** Order from two initial-rate experiments where only [X] changes: ratio of rates against ratio of concentrations. */
export function orderFrom(rate1, rate2, conc1, conc2) {
  const n = Math.log(rate2 / rate1) / Math.log(conc2 / conc1);
  if (Math.abs(n - Math.round(n)) > 0.05) throw new Error(`orderFrom: order ${n} is not 0, 1 or 2: change the data`);
  return Math.round(n);
}
/** Rate constant from a rate and [[conc, order], ...]. */
export const rateConstant = (rate, terms) => rate / terms.reduce((p, [c, n]) => p * c ** n, 1);
/** Rate from k and [[conc, order], ...]. */
export const rateFrom = (k, terms) => k * terms.reduce((p, [c, n]) => p * c ** n, 1);
/** First-order k from half-life (Cambridge uses k = 0.693/t½). */
export const kFromHalfLife = (tHalf) => 0.693 / tHalf;
export const halfLifeFromK = (k) => 0.693 / k;
/** Concentration after t for a first-order reaction (whole half-lives: c0 / 2^(t/t½)). */
export const firstOrderRemaining = (c0, t, tHalf) => c0 / 2 ** (t / tHalf);
/** Units of k for overall order 0, 1, 2, 3 (time in s). */
export const kUnits = (order) => ["mol/dm³/s", "s⁻¹", "dm³/mol/s", "dm⁶/mol²/s"][order];

// ---- Partition, chromatography, spectroscopy
/** Partition coefficient Kpc = [solute in solvent A]/[solute in solvent B]. */
export const partitionK = (concA, concB) => concA / concB;
/**
 * Mass (g) of solute left in the aqueous layer after k successive extractions with volume vOrg (cm³) of organic solvent,
 * starting with m0 (g) in vAq (cm³) of water; Kpc = [organic]/[aqueous].
 */
export const remainingAfterExtractions = (m0, Kpc, vAq, vOrg, k = 1) => m0 * (vAq / (vAq + Kpc * vOrg)) ** k;
export const rf = (spot, front) => {
  const v = spot / front;
  if (!(v > 0 && v < 1)) throw new Error(`Rf ${v} must be between 0 and 1`);
  return v;
};
/** Percentage composition of a mixture from GLC peak areas { A: area, ... } (equal response assumed). */
export function glcPercent(areas) {
  const total = Object.values(areas).reduce((s, x) => s + x, 0);
  return Object.fromEntries(Object.entries(areas).map(([k, a]) => [k, (a / total) * 100]));
}
/** Number of carbon atoms from the M+1 and M peak heights: n = 100 × (M+1) / (1.1 × M). */
export const carbonsFromM1 = (abundM1, abundM) => (100 * abundM1) / (1.1 * abundM);
/** Wavelength-free check that an IR wavenumber lies in a range [lo, hi] (cm⁻¹). */
export const inRange = (x, [lo, hi]) => x >= lo && x <= hi;

// ---- Uncertainty and statistics
export const mean = (xs) => xs.reduce((s, x) => s + x, 0) / xs.length;
export const range = (xs) => Math.max(...xs) - Math.min(...xs);
/** Percentage uncertainty: absolute uncertainty / value × 100. */
export const pctError = (uncertainty, value) => (uncertainty / value) * 100;
/** Percentage uncertainty of a difference of two readings each ± u (e.g. a titre or a temperature change). */
export const pctErrorDifference = (u, difference) => ((2 * u) / difference) * 100;
/** Percentage difference between an experimental and an accepted value. */
export const pctDifference = (experimental, accepted) => (Math.abs(experimental - accepted) / Math.abs(accepted)) * 100;
/** Least-squares line y = mx + c through [[x, y], ...] (for Paper 5 style analysis). */
export function linearFit(points) {
  const n = points.length;
  const sx = points.reduce((s, [x]) => s + x, 0);
  const sy = points.reduce((s, [, y]) => s + y, 0);
  const sxx = points.reduce((s, [x]) => s + x * x, 0);
  const sxy = points.reduce((s, [x, y]) => s + x * y, 0);
  const m = (n * sxy - sx * sy) / (n * sxx - sx * sx);
  return { m, c: (sy - m * sx) / n };
}

// ---------------------------------------------------------------------------------------------------------------------
// Self-test (runs at import; cheap). If it fails, a helper above is wrong.
chk(Mr("H2SO4"), 98.1, 1e-9, "Mr H2SO4");
chk(Mr("CuSO4.5H2O"), 249.6, 1e-9, "Mr CuSO4.5H2O");
chk(Mr("Ca(OH)2"), 74.1, 1e-9, "Mr Ca(OH)2");
chk(Mr("[Cu(NH3)4]SO4"), 227.6, 1e-9, "Mr complex");
same(empiricalFormula({ C: 85.7, H: 14.3 }).ratio, { C: 1, H: 2 }, "empirical CH2");
chk(arFromIsotopes([[35, 75], [37, 25]]), 35.5, 1e-9, "Ar Cl");
chk(gibbs(178, 298, 161), 130.022, 1e-9, "gibbs");
chk(rnd(pHWeakAcid(1.74e-5, 0.1), 2), 2.88, 0, "pH weak acid");
chk(rnd(bufferPH(1.74e-5, 0.1, 0.1), 2), 4.76, 0, "buffer pH");
chk(rnd(nernst(0.34, 2, 0.01), 3), 0.281, 0, "nernst");
chk(orderFrom(1e-3, 4e-3, 0.1, 0.2), 2, 0, "order");
chk(sf(solubilityFromKsp(1.8e-10), 3), 1.34e-5, 1e-12, "solubility AgCl");
same(meanTitre([24.3, 23.95, 24.05, 24.0]).used, [23.95, 24.0, 24.05], "concordant");
chk(Math.round(avogadroFromElectrolysis(charge(0.5, 3600), 0.5926, 63.5, 2) / 1e21), 603, 0, "Avogadro");
