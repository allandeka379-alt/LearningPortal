// Authoring helpers for physics-a questions and flashcards (adapted from .scratch/biology-a/lib.mjs, itself from
// .scratch/additional-mathematics/lib.mjs, .scratch/economics/lib.mjs and .scratch/english/lib.mjs, with the unit-aware
// numeric builders of .scratch/combined-science/lib.mjs). Concept modules call concept(...) with a builder;
// build-content.mjs writes the JSON files. Physics helpers at the end: the Cambridge data-sheet constants (DATA),
// standard-form display (sciPlain, sciTex), uncertainty arithmetic, straight-line fits and worst lines, logarithms, and
// small formula helpers; the exam-format plans (EXAM) are in the middle.
//
// LaTeX: write it with t`...` (String.raw), so backslashes are single in the source (t`$1.60 \times 10^{-19}$`) and
// JSON.stringify doubles them in the files. In a normal "..." string you would have to write "\\times". Money is US\$
// (a bare $ starts maths). Units: upright, never italic: t`$v = 3.2\ \text{m s}^{-1}$` or plain "3.2 m s⁻¹".
//
// EVERY number in an answer, a mark scheme or a data table you invent is computed in code with these helpers and passed
// EXACT to the builders; the builders round for display and set a tolerance that accepts every correctly rounded answer.
// Never type a computed value by hand: use chk(...) to assert a value you also write in prose. Use the DATA constants
// (the values printed on the Cambridge data sheet) in every calculation and quote them in stems when needed.
export const t = String.raw;

// Selectors for `applies` (an item is tagged only to the syllabi it names). Omit applies for content valid for both.
export const ZIM = ["zimsec"];
export const CAM = ["cambridge/a-level/physics"];

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
  // length, area, volume
  pm: ["pm", "picometres"],
  nm: ["nm", "nanometres", "nanometre", "nanometers"],
  "µm": ["µm", "μm", "um", "micrometres", "micrometre"],
  mm: ["mm", "millimetres", "millimetre"],
  cm: ["cm", "centimetres", "centimetre"],
  m: ["m", "metres", "metre", "meters"],
  km: ["km", "kilometres"],
  "mm²": ["mm²", "mm^2", "mm2"],
  "cm²": ["cm²", "cm^2", "cm2"],
  "m²": ["m²", "m^2", "m2", "square metres"],
  "cm³": ["cm³", "cm^3", "cm3", "ml", "mL"],
  "m³": ["m³", "m^3", "m3", "cubic metres"],
  // mass, time, angle, frequency
  g: ["g", "grams", "gram"],
  kg: ["kg", "kilograms", "kilogram"],
  u: ["u", "unified atomic mass units"],
  s: ["s", "seconds", "second", "sec", "secs"],
  ms: ["ms", "milliseconds"],
  "µs": ["µs", "μs", "us", "microseconds"],
  min: ["min", "minutes", "mins"],
  h: ["h", "hours", "hour", "hr", "hrs"],
  days: ["days", "day", "d"],
  years: ["years", "year", "y", "yr"],
  Hz: ["Hz", "hertz", "s^-1", "s-1"],
  kHz: ["kHz", "kilohertz"],
  MHz: ["MHz", "megahertz"],
  GHz: ["GHz", "gigahertz"],
  "s⁻¹": ["s⁻¹", "s^-1", "s-1", "/s", "per second"],
  "rad/s": ["rad/s", "rad s^-1", "rad s-1", "s^-1"],
  rad: ["rad", "radians", "radian"],
  "°": ["°", "degrees", "deg"],
  // motion and momentum
  "m/s": ["m/s", "m s^-1", "m s-1", "ms^-1", "ms-1", "metres per second"],
  "km/s": ["km/s", "km s^-1", "km s-1"],
  "m/s²": ["m/s²", "m/s^2", "m s^-2", "m s-2", "ms^-2", "ms-2"],
  "N s": ["N s", "Ns", "kg m/s", "kg m s^-1", "kg m s-1"],
  // force, energy, power, pressure, materials, thermal
  N: ["N", "newtons", "newton"],
  mN: ["mN", "millinewtons"],
  kN: ["kN", "kilonewtons"],
  "N m": ["N m", "Nm", "N·m"],
  "N/m": ["N/m", "N m^-1", "N m-1"],
  "N/kg": ["N/kg", "N kg^-1", "N kg-1"],
  J: ["J", "joules", "joule"],
  kJ: ["kJ", "kilojoules"],
  MJ: ["MJ", "megajoules"],
  eV: ["eV", "electronvolts", "electron volts"],
  keV: ["keV", "kiloelectronvolts"],
  MeV: ["MeV", "megaelectronvolts"],
  "kW h": ["kW h", "kWh", "kilowatt-hours"],
  W: ["W", "watts", "watt"],
  mW: ["mW", "milliwatts"],
  kW: ["kW", "kilowatts"],
  MW: ["MW", "megawatts"],
  "W/m²": ["W/m²", "W m^-2", "W m-2", "W/m^2"],
  Pa: ["Pa", "pascals", "N/m^2", "N m^-2"],
  kPa: ["kPa", "kilopascals"],
  MPa: ["MPa", "megapascals"],
  GPa: ["GPa", "gigapascals"],
  "kg/m³": ["kg/m³", "kg/m^3", "kg m^-3", "kg m-3"],
  "J/(kg K)": ["J/(kg K)", "J kg^-1 K^-1", "J kg-1 K-1", "J/kg K", "J/(kg °C)", "J kg^-1 °C^-1"],
  "J/kg": ["J/kg", "J kg^-1", "J kg-1"],
  "J/K": ["J/K", "J K^-1", "J K-1"],
  "W/(m K)": ["W/(m K)", "W m^-1 K^-1", "W m-1 K-1"],
  mol: ["mol", "moles", "mole"],
  K: ["K", "kelvin", "kelvins"],
  "°C": ["°C", "degrees Celsius", "deg C"],
  // electricity and magnetism
  C: ["C", "coulombs", "coulomb"],
  "µC": ["µC", "μC", "uC", "microcoulombs"],
  A: ["A", "amperes", "amps", "amp"],
  mA: ["mA", "milliamperes", "milliamps"],
  "µA": ["µA", "μA", "uA", "microamperes"],
  V: ["V", "volts", "volt", "J/C"],
  mV: ["mV", "millivolts"],
  kV: ["kV", "kilovolts"],
  "Ω": ["Ω", "ohm", "ohms"],
  "kΩ": ["kΩ", "kilohms", "kohm"],
  "MΩ": ["MΩ", "megohms"],
  "Ω m": ["Ω m", "ohm m", "ohm metre", "Ωm"],
  F: ["F", "farads", "farad"],
  "µF": ["µF", "μF", "uF", "microfarads"],
  nF: ["nF", "nanofarads"],
  pF: ["pF", "picofarads"],
  "N/C": ["N/C", "N C^-1", "N C-1", "V/m", "V m^-1"],
  "V/m": ["V/m", "V m^-1", "V m-1", "N/C", "N C^-1"],
  T: ["T", "tesla", "teslas"],
  mT: ["mT", "millitesla"],
  "µT": ["µT", "μT", "uT", "microtesla"],
  Wb: ["Wb", "webers", "weber", "T m^2"],
  // nuclear, waves, medical, astronomy, communication
  Bq: ["Bq", "becquerels", "s^-1"],
  "counts/min": ["counts/min", "counts per minute", "min^-1"],
  "counts/s": ["counts/s", "counts per second", "s^-1"],
  "m⁻¹": ["m⁻¹", "m^-1", "m-1", "per metre"],
  "mm⁻¹": ["mm⁻¹", "mm^-1", "mm-1", "per mm"],
  "cm⁻¹": ["cm⁻¹", "cm^-1", "cm-1"],
  "kg m⁻² s⁻¹": ["kg m⁻² s⁻¹", "kg m^-2 s^-1", "kg m-2 s-1"],
  dB: ["dB", "decibels", "decibel"],
  "dB/km": ["dB/km", "dB km^-1", "dB km-1"],
  "lines/mm": ["lines/mm", "lines per mm", "mm^-1"],
  "bit/s": ["bit/s", "bits per second", "bps", "bit s^-1"],
  "light-years": ["light-years", "light years", "ly"],
  "%": ["%", "percent", "per cent"],
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
  // Integers are marked exactly, but only below 10^6: tiny values (1.6e-19) are not integers, and large computed
  // values (6.02e23 × 2) are marked to significant figures like any other value.
  const isInt = Math.abs(value) < 1e6 && (Number.isInteger(value) || (Math.abs(value) >= 1 && Math.abs(value - Math.round(value)) < 1e-9));
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
  // Very large or very small values: show the model answer in standard form (the marker accepts 1.60e-19,
  // 1.60 × 10^-19 and 1.60*10^-19 as well as the decimal form).
  {
    const a = Math.abs(value);
    if (a !== 0 && (a < 1e-3 || a >= 1e6) && dp === undefined) model = sciPlain(value, nsf ?? 3);
  }
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
  /** ZIMSEC Paper 3 (format assumed, see BRIEF): a longer free-response question mixing explanation, derivation and calculation. */
  ZIM_P3_FREE: { total: 20, skill: "APPLICATION", applies: ZIM, secs: 1800 },
  /** Cambridge Paper 3 question 1 and ZIMSEC Paper 4 style: an experiment with given readings, table, graph, gradient, constant. */
  PRACTICAL_GRAPH: { total: 20, skill: "ANALYSIS", secs: 3600 },
  /** Cambridge Paper 3 question 2 and ZIMSEC Paper 4 style: few readings, constant test against uncertainty, limitations, improvements. */
  PRACTICAL_EVALUATION: { total: 20, skill: "EVALUATION", secs: 3600 },
  /** Cambridge Paper 5 question 1 (ZIMSEC Paper 4 planning to be confirmed): planning an investigation. */
  PLANNING: { total: 15, skill: "EVALUATION", secs: 1800 },
  /** Cambridge Paper 5 question 2 (ZIMSEC Paper 4 to be confirmed): data analysis with logarithms, error bars, worst lines. */
  DATA_ANALYSIS: { total: 15, skill: "ANALYSIS", secs: 1800 },
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
// Physics helpers. All return exact values; round only for display (sfStr, dpStr, sciPlain, sciTex) or let the builders
// do it. Data you invent is ORIGINAL and physically plausible (a 2 m steel wire extending 40 cm under 10 N is not). To
// print a table or a worked example for a lesson, write a small script in .scratch/physics-a/tables/<prefix><name>.mjs
// (NOT in slices/: every .mjs there is imported by the build) that imports these helpers and console.logs the output,
// and paste it.

/** Cambridge 9702 data sheet values (2025-2027). Use these, not more precise values, so answers match the papers. */
export const DATA = Object.freeze({
  g: 9.81, // m s^-2
  c: 3.0e8, // m s^-1
  e: 1.6e-19, // C
  u: 1.66e-27, // kg
  mp: 1.67e-27, // kg
  me: 9.11e-31, // kg
  NA: 6.02e23, // mol^-1
  R: 8.31, // J K^-1 mol^-1
  k: 1.38e-23, // J K^-1
  G: 6.67e-11, // N m^2 kg^-2
  eps0: 8.85e-12, // F m^-1
  k_e: 8.99e9, // 1/(4 pi eps0), m F^-1
  h: 6.63e-34, // J s
  sigma: 5.67e-8, // W m^-2 K^-4
});
/** Kelvin from degrees Celsius with the syllabus offset (273.15; questions usually give data to 0.1 K or less precise). */
export const toK = (celsius) => celsius + 273.15;

// ---- Standard form
/** { mantissa, exponent } of x rounded to n significant figures (mantissa as a string with trailing zeros kept). */
export function sciParts(x, n = 3) {
  if (x === 0) return { mantissa: (0).toFixed(n - 1), exponent: 0 };
  const [m, e] = x.toExponential(n - 1).split("e");
  return { mantissa: m.replace("-", "−"), exponent: Number(e) };
}
/** Plain-text standard form: "1.60 × 10^-19" (accepted by the marker; use it in model answers and options). */
export function sciPlain(x, n = 3) {
  const { mantissa, exponent } = sciParts(x, n);
  return exponent === 0 ? mantissa : `${mantissa.replace("−", "-")} × 10^${exponent}`;
}
/** LaTeX standard form for prose and options: "1.60 \\times 10^{-19}" (wrap in $...$ yourself). */
export function sciTex(x, n = 3) {
  const { mantissa, exponent } = sciParts(x, n);
  const m = mantissa.replace("−", "-");
  return exponent === 0 ? m : `${m} \\times 10^{${exponent}}`;
}

/** Markdown table from headers and rows (cells are strings or numbers; format numbers first with dpStr / sfStr). */
export function table(headers, rows) {
  const line = (cells) => `| ${cells.join(" | ")} |`;
  return [line(headers), line(headers.map(() => "---")), ...rows.map(line)].join("\n");
}

// ---- Descriptive statistics and uncertainties (Cambridge Paper 3 and Paper 5 conventions)
export const sum = (xs) => xs.reduce((s, x) => s + x, 0);
export const mean = (xs) => sum(xs) / xs.length;
export const range = (xs) => Math.max(...xs) - Math.min(...xs);
/** Absolute uncertainty of a repeated reading: half the range. */
export const halfRange = (xs) => range(xs) / 2;
/** Percentage uncertainty from an absolute uncertainty. */
export const pctUnc = (abs, value) => (Math.abs(abs) / Math.abs(value)) * 100;
/** Absolute uncertainty from a percentage uncertainty. */
export const absFromPct = (pct, value) => (pct / 100) * Math.abs(value);
/** Percentage difference between two values of a constant, as Cambridge Paper 3 tests it: |k1 − k2| / mean × 100. */
export const pctDifference = (k1, k2) => (Math.abs(k1 - k2) / ((k1 + k2) / 2)) * 100;
/** Absolute uncertainty of a sum or difference: the absolute uncertainties add. */
export const uncSum = (...abs) => sum(abs.map(Math.abs));
/**
 * Fractional uncertainty of a product/quotient/power: terms [[value, absUnc, power], ...]; returns the sum of
 * |power| × absUnc/value (simple addition, as the syllabus requires). Multiply by 100 for a percentage.
 */
export const fracUnc = (terms) => sum(terms.map(([v, dv, p = 1]) => Math.abs(p) * Math.abs(dv / v)));

// ---- Straight lines, worst lines and logarithms
/** Least-squares line through points (a stand-in for a carefully drawn best-fit line). */
export function linFit(xs, ys) {
  const n = xs.length;
  const mx = mean(xs);
  const my = mean(ys);
  let sxy = 0;
  let sxx = 0;
  for (let i = 0; i < n; i++) {
    sxy += (xs[i] - mx) * (ys[i] - my);
    sxx += (xs[i] - mx) ** 2;
  }
  const m = sxy / sxx;
  return { m, c: my - m * mx };
}
/** Gradient between two points [x, y] (use points more than half the line apart, read off the line, not data). */
export const gradient = ([x1, y1], [x2, y2]) => (y2 - y1) / (x2 - x1);
/** y-intercept of the line with gradient m through [x, y] (y = mx + c rearranged, for false origins). */
export const interceptThrough = (m, [x, y]) => y - m * x;
/**
 * Steepest and shallowest straight lines that pass through every error bar (points [{ x, y, dy }]), found from lines
 * through the ends of the error bars of two points. Returns { steep: {m, c}, shallow: {m, c} } or throws when no line
 * passes through all bars (change the data).
 */
export function worstLines(points) {
  const cands = [];
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      for (const si of [-1, 1]) {
        for (const sj of [-1, 1]) {
          const a = [points[i].x, points[i].y + si * points[i].dy];
          const b = [points[j].x, points[j].y + sj * points[j].dy];
          const m = gradient(a, b);
          const c = interceptThrough(m, a);
          if (points.every((p) => Math.abs(m * p.x + c - p.y) <= p.dy + 1e-12)) cands.push({ m, c });
        }
      }
    }
  }
  if (!cands.length) throw new Error("worstLines: no straight line passes through every error bar; change the data");
  cands.sort((p, q) => p.m - q.m);
  return { shallow: cands[0], steep: cands[cands.length - 1] };
}
/** Uncertainty in a gradient (or intercept): |best − worst|. */
export const lineUnc = (best, worst) => Math.abs(best - worst);
export const lg = Math.log10;
export const ln = Math.log;
/** Decimal places for a logarithm of a value given to n significant figures (Cambridge: n or n + 1). */
export const logDp = (nSigFigs) => nSigFigs;

// ---- Small formula helpers (SI units in, SI units out). Check each use against the physics you write.
export const seriesR = (...rs) => sum(rs);
export const parallelR = (...rs) => 1 / sum(rs.map((r) => 1 / r));
export const seriesC = (...cs) => 1 / sum(cs.map((c) => 1 / c));
export const parallelC = (...cs) => sum(cs);
export const potentialDivider = (vin, r1, r2) => (vin * r2) / (r1 + r2); // output across r2
export const eVtoJ = (eV) => eV * DATA.e;
export const JtoeV = (J) => J / DATA.e;
export const photonEnergy = (lambda) => (DATA.h * DATA.c) / lambda; // J
export const deBroglie = (p) => DATA.h / p; // m, p in kg m s^-1
export const decayLambda = (halfLife) => 0.693 / halfLife; // syllabus form ln 2 ≈ 0.693
export const decayAt = (x0, lambda, t) => x0 * Math.exp(-lambda * t);
export const capDischarge = (x0, R, C, t) => x0 * Math.exp(-t / (R * C));
export const rms = (peak) => peak / Math.SQRT2;
export const gField = (M, r) => (DATA.G * M) / r ** 2;
export const gPotential = (M, r) => (-DATA.G * M) / r;
export const coulombForce = (q1, q2, r) => (DATA.k_e * q1 * q2) / r ** 2;
export const ePotential = (Q, r) => (DATA.k_e * Q) / r;
export const dopplerSource = (fs, v, vs, approaching) => (fs * v) / (approaching ? v - vs : v + vs);
export const malus = (I0, thetaDeg) => I0 * Math.cos((thetaDeg * Math.PI) / 180) ** 2;
export const reflectionCoeff = (Z1, Z2) => (Z1 - Z2) ** 2 / (Z1 + Z2) ** 2;
export const attenuate = (I0, mu, x) => I0 * Math.exp(-mu * x);
export const luminosity = (r, T) => 4 * Math.PI * r ** 2 * DATA.sigma * T ** 4;
export const fluxIntensity = (L, d) => L / (4 * Math.PI * d ** 2);
export const decibels = (P1, P2) => 10 * Math.log10(P1 / P2);
export const deg = (rad) => (rad * 180) / Math.PI;
export const rad = (degrees) => (degrees * Math.PI) / 180;

// ---------------------------------------------------------------------------------------------------------------------
// Self-test (runs at import; cheap).
same(sciPlain(1.6e-19), "1.60 × 10^-19", "sciPlain");
same(sciTex(6.63e-34), "6.63 \\times 10^{-34}", "sciTex");
chk(parallelR(6, 3), 2, 1e-12, "parallelR");
chk(JtoeV(photonEnergy(500e-9)), 2.486, 0.001, "photon 500 nm");
chk(fracUnc([[2.0, 0.1, 1], [4.0, 0.2, 2]]), 0.15, 1e-12, "fracUnc");
{
  const pts = [{ x: 1, y: 2.1, dy: 0.2 }, { x: 2, y: 3.9, dy: 0.2 }, { x: 3, y: 6.0, dy: 0.2 }, { x: 4, y: 8.1, dy: 0.2 }];
  const w = worstLines(pts);
  if (!(w.steep.m > linFit(pts.map((p) => p.x), pts.map((p) => p.y)).m && w.shallow.m < w.steep.m)) throw new Error("worstLines self-test");
}
