// Authoring helpers for agriculture-o questions and flashcards (adapted from .scratch/geography/lib.mjs, itself from
// .scratch/english/lib.mjs with the numeric builders of .scratch/combined-science/lib.mjs). Concept modules call
// concept(...) with a builder; build-content.mjs writes the JSON files. Strings are plain JSON text. LaTeX (chemical and
// photosynthesis equations, fractions in calculations) is written with t`...` (String.raw), so backslashes are single
// in the slice and JSON.stringify doubles them in the files. A literal dollar sign must be written US\\$ in a normal JS
// string (Markdown "US\$") so it is not read as maths; numeric money answers use prefix: "US$" (a payload field, not
// Markdown). The checked agriculture helpers at the end of this file compute and verify the numbers you print.
export const t = String.raw;

// Selectors for `applies` (an item is tagged only to the syllabi it names). Omit `applies` for items that suit both.
export const ZIM = ["zimsec"];
export const CAM = ["cambridge/igcse/agriculture"];

const OPTION_KEYS = ["A", "B", "C", "D", "E", "F"];
const DEFAULT_NORMALISE = ["trim", "lowercase", "collapse_whitespace", "strip_punctuation"];

// ---------------------------------------------------------------------------------------------------------------------
// Units for numerical answers: display hint + accepted spellings (optional units: a missing unit is fine, an unknown
// one costs a mark). Add a unit here only if a slice needs it (tell the lead; this file is shared).
const UNITS = {
  "kg": ["kg", "kilograms", "kilogram", "kgs"],
  "g": ["g", "grams", "gram"],
  "t": ["t", "tonnes", "tonne", "metric tons"],
  "kg/ha": ["kg/ha", "kg ha^-1", "kg per ha", "kg per hectare", "kilograms per hectare"],
  "t/ha": ["t/ha", "t ha^-1", "tonnes per hectare", "tonnes/ha", "t per ha"],
  "g/m²": ["g/m²", "g/m^2", "g/m2", "g per m²", "grams per square metre"],
  "g/plant": ["g/plant", "g per plant", "grams per plant", "g"],
  "kg/day": ["kg/day", "kg per day", "kg/d", "kilograms per day"],
  "g/day": ["g/day", "g per day", "g/d", "grams per day"],
  "bags": ["bags", "bag"],
  "plants/ha": ["plants/ha", "plants per ha", "plants per hectare", "plants"],
  "plants": ["plants", "plant", "seedlings"],
  "posts": ["posts", "post", "poles", "pole"],
  "ha": ["ha", "hectares", "hectare"],
  "m²": ["m²", "m^2", "m2", "square metres", "sq m"],
  "km²": ["km²", "km^2", "km2", "square kilometres", "sq km"],
  "m": ["m", "metres", "metre", "meters"],
  "cm": ["cm", "centimetres", "centimetre"],
  "mm": ["mm", "millimetres", "millimetre"],
  "km": ["km", "kilometres", "kilometre"],
  "m³": ["m³", "m^3", "m3", "cubic metres"],
  "L": ["L", "l", "litres", "litre", "liters"],
  "mL": ["mL", "ml", "millilitres", "millilitre"],
  "L/ha": ["L/ha", "l/ha", "litres per hectare", "L per ha"],
  "mL/L": ["mL/L", "ml/l", "ml per litre", "millilitres per litre"],
  "%": ["%", "percent", "per cent"],
  "°C": ["°C", "degrees Celsius", "degrees C", "deg C", "C", "degrees"],
  "days": ["days", "day"],
  "weeks": ["weeks", "week"],
  "months": ["months", "month"],
  "years": ["years", "year", "yrs"],
  "h": ["h", "hours", "hour", "hrs", "hr"],
  "min": ["min", "minutes", "mins"],
  "LU": ["LU", "livestock units", "livestock unit"],
  "LU/ha": ["LU/ha", "LU per ha", "livestock units per hectare"],
  "ha/LU": ["ha/LU", "ha per LU", "hectares per livestock unit"],
  "animals": ["animals", "animal", "head", "head of cattle"],
  "birds": ["birds", "bird", "chickens", "chicks"],
  "eggs": ["eggs", "egg"],
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

/** Part builders (used inside struct parts and to build top-level questions). Each returns { part, model, wrong[] }. */
export const P = {
  /**
   * Numerical answer (fertiliser and seed quantities, plant populations, rations, feed conversion, dressing
   * percentage, gross margins, stocking rates, fencing materials, dilutions, ratios). value: the exact answer computed
   * with code; tol: absolute tolerance (default: exact for integers, half a unit in the 2nd s.f. otherwise; with
   * prefix "US$" the default is exact for whole dollars and 0.005 for cents); unit: a key of UNITS; prefix: text shown
   * before the box ("US$" for money); type NUMERICAL or CALCULATION (with working: give workedSolution as numbered
   * steps). State the rounding in the stem ("to one decimal place", "to the nearest whole bag") and set tol to match.
   */
  num({ label, marks = 1, stem, value, answer, unit, tol, sf, dp, penalty, wrong = [], explanation, workedSolution, hints, type = "NUMERICAL", prefix }) {
    if (tol === undefined && prefix === "US$") tol = Number.isInteger(value) ? 0 : 0.005;
    const { spec, payload } = numericSpec({ value, unit, tol, sf, dp, penalty });
    const part = { label, type, marks, stem };
    const pl = { ...(payload ?? {}) };
    if (prefix) pl.answerPrefix = prefix;
    if (Object.keys(pl).length) part.payload = pl;
    part.answerSpec = spec;
    if (explanation) part.explanation = explanation;
    // Calculations need a worked solution; default to the explanation (which shows the full calculation) as one step.
    const ws = workedSolution ?? (explanation ? `1. ${explanation}` : undefined);
    if (ws) part.workedSolution = ws;
    if (hints) part.hints = hints;
    // Default model answer: 3 s.f. when the tolerance accepts it, otherwise the value to 6 s.f. (pass `answer` to show
    // the exact form a student would write, e.g. "118.3").
    const tolAmount = typeof spec.tolerance?.amount === "number" ? spec.tolerance.amount : 0;
    const model = answer ?? (Math.abs(Number(fmt(value)) - value) <= tolAmount ? fmt(value) : String(Number(value.toPrecision(6))));
    return { part, model: { type, value: model }, wrong: wrong.map((w) => ({ type, value: String(w) })) };
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
    if (calculator !== undefined) q.calculator = calculator;
    if (paper) q.paper = paper;
    if (access) q.access = access;
    if (!q.explanation) throw new Error(`${q.key}: explanation required`);
    if (d >= 3 && !q.hints) throw new Error(`${q.key}: difficulty ${d} needs hints`);
    if (daily && (d < 2 || d > 3)) throw new Error(`${q.key}: daily questions need difficulty 2-3`);
    questions.push(q);
    return q;
  }

  const b = {
    mcq: (o) => finish(P.mcq(o), o),
    tf: (o) => finish(P.tf(o), o),
    /** Numerical answer, auto-marked: { stem, value, unit?, tol?, prefix?, wrong?, explanation }. */
    num: (o) => finish(P.num(o), o),
    /** Calculation with working shown (type CALCULATION): same fields as num plus workedSolution. */
    calc: (o) => finish(P.num({ ...o, type: "CALCULATION" }), o),
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
// Levels-of-response mark scheme for longer self-marked answers (our own wording). Use it for "discuss", "evaluate",
// "suggest and explain" and long "describe/explain" parts of 6 or more marks, together with indicative points that add
// up to the marks. Returns [level, min, max, descriptor] rows for P.manual / b.ext `levels`.
export function agricultureLevels(total) {
  if (total < 4) throw new Error("agricultureLevels: use point marking below 4 marks");
  const l1 = Math.max(1, Math.round(total / 3));
  const l2 = Math.max(l1 + 1, Math.round((2 * total) / 3));
  return [
    [3, l2 + 1, total, "Accurate, well-developed explanation of several relevant points using correct agricultural terms, applied to the crop, animal or situation in the question, with a clear judgement where one is asked for."],
    [2, l1 + 1, l2, "Some relevant points explained, partly developed or only partly applied to the situation; any judgement is simple or one-sided."],
    [1, 1, l1, "Simple statements or a list of points with little explanation or application."],
    [0, 0, 0, "Nothing creditworthy."],
  ];
}

// ---------------------------------------------------------------------------------------------------------------------
// Checked agriculture helpers. Compute every printed figure and every answer with these (or with your own code in
// .scratch/agriculture/tables/), pass the EXACT value to b.num / b.calc / P.num and print tables from the same objects.
// They throw when the data are inconsistent. All quantities are plain numbers in the units named in the parameter.

export function check(condition, message) {
  if (!condition) throw new Error(`check failed: ${message}`);
}
/** Round half away from zero to dp decimal places (for model answers and printed tables). */
export function round(value, dp = 2) {
  const f = 10 ** dp;
  return (Math.sign(value) * Math.round(Math.abs(value) * f + 1e-9)) / f;
}
/** 12345.5 -> "12,345.50" (dp fixed); for Markdown text and tables. */
export function fmtNum(value, dp = 0) {
  return round(value, dp).toLocaleString("en-GB", { minimumFractionDigits: dp, maximumFractionDigits: dp });
}
/** Money for Markdown text: money(1250) -> "US\$1,250"; money(12.5) -> "US\$12.50"; negative -> "-US\$…". */
export function money(value, dp) {
  const places = dp ?? (Number.isInteger(round(value, 2)) ? 0 : 2);
  return `${value < 0 ? "-" : ""}US\\$${fmtNum(Math.abs(value), places)}`;
}
/** Markdown table from a header row and body rows (cells are strings or numbers). */
export function table(header, rows) {
  for (const r of rows) check(r.length === header.length, `table row has ${r.length} cells, header has ${header.length}`);
  const line = (cells) => `| ${cells.map(String).join(" | ")} |`;
  return [line(header), line(header.map(() => "---")), ...rows.map(line)].join("\n");
}
export function pct(part, whole) {
  check(whole !== 0, "pct: whole is zero");
  return (100 * part) / whole;
}
export const pctChange = (from, to) => pct(to - from, from);
export function mean(values) {
  check(values.length > 0, "mean of nothing");
  return values.reduce((s, v) => s + v, 0) / values.length;
}

// Areas and volumes ---------------------------------------------------------------------------------------------------
export const m2ToHa = (m2) => m2 / 10_000;
export const haToM2 = (ha) => ha * 10_000;
/** Rectangular field: area in m² and ha, perimeter in m. */
export function field(lengthM, widthM) {
  check(lengthM > 0 && widthM > 0, "field: positive sides");
  const m2 = lengthM * widthM;
  return { m2, ha: m2ToHa(m2), perimeterM: 2 * (lengthM + widthM) };
}
/** Water to apply a depth over an area: depthMm over areaM2 -> litres and m³ (1 mm over 1 m² = 1 L). */
export function waterVolume({ areaM2, depthMm }) {
  check(areaM2 > 0 && depthMm > 0, "waterVolume: positive inputs");
  const litres = areaM2 * depthMm;
  return { litres, m3: litres / 1000 };
}

// Fertiliser, seed and plant population -------------------------------------------------------------------------------
/**
 * Fertiliser for an area at a rate: { rateKgHa, areaHa | areaM2, bagKg = 50 } -> { kg, bags (whole bags to buy),
 * exactBags, gPerM2 }. Analyses to state with "assume" (textbooks vary): ammonium nitrate 34.5% N; a compound such as
 * Compound D 7:14:7 (% N : P2O5 : K2O); single superphosphate about 18-20% P2O5; muriate of potash 60% K2O.
 */
export function fertiliser({ rateKgHa, areaHa, areaM2, bagKg = 50 }) {
  const ha = areaHa ?? m2ToHa(areaM2);
  check(rateKgHa > 0 && ha > 0, "fertiliser: positive rate and area");
  const kg = rateKgHa * ha;
  return { kg, bags: Math.ceil(kg / bagKg - 1e-9), exactBags: kg / bagKg, gPerM2: (rateKgHa * 1000) / 10_000 };
}
/** Fertiliser per planting station or plant: { rateKgHa, population (per ha) } -> grams per station. */
export function perStation({ rateKgHa, population }) {
  check(rateKgHa > 0 && population > 0, "perStation: positive inputs");
  return (rateKgHa * 1000) / population;
}
/** Nutrient in a fertiliser: kg of product × nutrient % ÷ 100. */
export const nutrientKg = (productKg, nutrientPct) => (productKg * nutrientPct) / 100;
/** Product needed to supply a mass of nutrient: nutrient kg ÷ (nutrient % ÷ 100). */
export function productForNutrient(nutrientKgNeeded, nutrientPct) {
  check(nutrientPct > 0 && nutrientPct <= 100, "productForNutrient: pct 0-100");
  return nutrientKgNeeded / (nutrientPct / 100);
}
/** Plant population from spacing: { rowCm (between rows), inRowCm (within the row), perStation = 1, areaHa = 1 }. */
export function plantPopulation({ rowCm, inRowCm, perStation: n = 1, areaHa = 1 }) {
  check(rowCm > 0 && inRowCm > 0 && n >= 1, "plantPopulation: positive spacing");
  const perHa = (10_000 / ((rowCm / 100) * (inRowCm / 100))) * n;
  return { perHa, total: perHa * areaHa, m2PerStation: (rowCm / 100) * (inRowCm / 100) };
}
/** Seed rate: { population (plants/ha), thousandSeedMassG, germinationPct = 100 } -> seeds and kg/ha. */
export function seedRate({ population, thousandSeedMassG, germinationPct = 100 }) {
  check(population > 0 && thousandSeedMassG > 0 && germinationPct > 0 && germinationPct <= 100, "seedRate inputs");
  const seeds = population / (germinationPct / 100);
  return { seeds, kgPerHa: (seeds * thousandSeedMassG) / 1000 / 1000 };
}
export function germinationPct(germinated, sown) {
  check(germinated <= sown, "germinated > sown");
  return pct(germinated, sown);
}
/** Yield: total kg harvested from an area -> kg/ha and t/ha. */
export function yieldPerHa({ kg, areaHa }) {
  check(kg >= 0 && areaHa > 0, "yieldPerHa inputs");
  return { kgPerHa: kg / areaHa, tPerHa: kg / areaHa / 1000 };
}

// Livestock -----------------------------------------------------------------------------------------------------------
/** Feed conversion ratio = feed eaten ÷ live-weight gain (both kg). Lower is better. */
export function fcr({ feedKg, gainKg }) {
  check(feedKg > 0 && gainKg > 0, "fcr: positive feed and gain");
  return feedKg / gainKg;
}
/** Dressing (killing-out) percentage = carcass mass ÷ live mass × 100. */
export function dressingPct({ carcassKg, liveKg }) {
  check(carcassKg > 0 && liveKg > carcassKg, "dressingPct: carcass must be lighter than the live animal");
  return pct(carcassKg, liveKg);
}
/** Hen-day laying percentage = eggs ÷ (hens × days) × 100. */
export function layingPct({ eggs, hens, days = 1 }) {
  check(eggs <= hens * days, "more eggs than hen-days");
  return pct(eggs, hens * days);
}
export const mortalityPct = ({ died, started }) => pct(died, started);
/** Average daily gain in kg/day. */
export function dailyGain({ startKg, endKg, days }) {
  check(days > 0 && endKg >= startKg, "dailyGain inputs");
  return (endKg - startKg) / days;
}
/**
 * Pearson square: two feeds with crude protein % ({ name, cp }) mixed to a target %. -> parts of each, % of each in the
 * mix and (with totalKg) kg of each. Throws unless low.cp < target < high.cp.
 */
export function pearsonSquare({ target, high, low, totalKg }) {
  check(low.cp < target && target < high.cp, `Pearson square: target ${target} must lie between ${low.cp} and ${high.cp}`);
  const partsHigh = target - low.cp;
  const partsLow = high.cp - target;
  const parts = partsHigh + partsLow;
  const out = { partsHigh, partsLow, parts, pctHigh: pct(partsHigh, parts), pctLow: pct(partsLow, parts) };
  if (totalKg !== undefined) {
    out.kgHigh = (totalKg * partsHigh) / parts;
    out.kgLow = (totalKg * partsLow) / parts;
    check(Math.abs((out.kgHigh * high.cp + out.kgLow * low.cp) / totalKg - target) < 1e-9, "Pearson square check");
  }
  return out;
}
/** Stocking rate: livestock units on an area -> LU/ha and ha/LU (LU factors are given in the question). */
export function stockingRate({ lu, areaHa }) {
  check(lu > 0 && areaHa > 0, "stockingRate inputs");
  return { luPerHa: lu / areaHa, haPerLu: areaHa / lu };
}
/** Carrying capacity: area ÷ hectares needed per livestock unit -> exact LU and whole LU (rounded down). */
export function carryingCapacity({ areaHa, haPerLu }) {
  check(areaHa > 0 && haPerLu > 0, "carryingCapacity inputs");
  const lu = areaHa / haPerLu;
  return { lu, wholeLu: Math.floor(lu + 1e-9) };
}

// Chemicals and sprayers ----------------------------------------------------------------------------------------------
/**
 * Concentrate for a tank: { mlPerL, tankL } -> mL of concentrate; or { ratio: n, tankL } meaning 1 part concentrate to
 * n parts water, the mixture filling the tank -> mL of concentrate and water.
 */
export function dilution({ mlPerL, ratio, tankL }) {
  check(tankL > 0, "dilution: tank volume");
  check((mlPerL === undefined) !== (ratio === undefined), "dilution: give mlPerL or ratio, not both");
  if (mlPerL !== undefined) return { concentrateMl: mlPerL * tankL };
  return { concentrateMl: (tankL * 1000) / (ratio + 1), waterMl: (tankL * 1000 * ratio) / (ratio + 1) };
}
/** Knapsack calibration: litres used on a measured area -> spray volume in L/ha and tanks per ha. */
export function sprayVolume({ litresUsed, areaM2, tankL }) {
  check(litresUsed > 0 && areaM2 > 0, "sprayVolume inputs");
  const lPerHa = (litresUsed / areaM2) * 10_000;
  return { lPerHa, tanksPerHa: tankL ? lPerHa / tankL : undefined };
}

// Fencing -------------------------------------------------------------------------------------------------------------
/**
 * Materials for a closed fence: { perimeterM, postSpacingM, strands, rollM?, droppersPerSpan? } -> posts (one per span
 * on a closed loop), wire metres, whole rolls, droppers. Extra corner or straining posts are added by the writer.
 */
export function fence({ perimeterM, postSpacingM, strands, rollM, droppersPerSpan = 0 }) {
  check(perimeterM > 0 && postSpacingM > 0 && strands > 0, "fence inputs");
  const spans = perimeterM / postSpacingM;
  check(Math.abs(spans - Math.round(spans)) < 1e-9, `fence: ${perimeterM} m is not a whole number of ${postSpacingM} m spans`);
  const n = Math.round(spans);
  const wireM = perimeterM * strands;
  return { posts: n, spans: n, wireM, rolls: rollM ? Math.ceil(wireM / rollM - 1e-9) : undefined, droppers: n * droppersPerSpan };
}

// Money: gross margins, profit and loss, budgets ----------------------------------------------------------------------
/**
 * Gross margin: { output: [[item, quantity, unitPrice], ...], variable: [[item, amount], ...], areaHa?, head? } ->
 * { grossOutput, variableCosts, grossMargin, perHa, perHead, outputRows (with value), variableRows }.
 */
export function grossMargin({ output, variable, areaHa, head }) {
  check(variable.every(([, a]) => a >= 0), "variable costs must be positive amounts");
  const outputRows = output.map(([item, q, p]) => [item, q, p, q * p]);
  const grossOutput = outputRows.reduce((s, r) => s + r[3], 0);
  const variableCosts = variable.reduce((s, [, a]) => s + a, 0);
  const gm = grossOutput - variableCosts;
  return { grossOutput, variableCosts, grossMargin: gm, perHa: areaHa ? gm / areaHa : undefined, perHead: head ? gm / head : undefined, outputRows, variableRows: variable };
}
/** Profit and loss: { income: [[item, amount]], expenses: [[item, amount]] } -> totals and profit (negative = loss). */
export function profitLoss({ income, expenses }) {
  const totalIncome = income.reduce((s, [, a]) => s + a, 0);
  const totalExpenses = expenses.reduce((s, [, a]) => s + a, 0);
  return { totalIncome, totalExpenses, profit: totalIncome - totalExpenses };
}
/** Partial budget: { extraIncome, costsSaved, extraCosts, incomeLost } (each [[item, amount]]) -> gains, losses, net. */
export function partialBudget({ extraIncome = [], costsSaved = [], extraCosts = [], incomeLost = [] }) {
  const sum = (rows) => rows.reduce((s, [, a]) => s + a, 0);
  const gains = sum(extraIncome) + sum(costsSaved);
  const losses = sum(extraCosts) + sum(incomeLost);
  return { gains, losses, net: gains - losses };
}
/** Total, average and marginal product rows from input levels and total outputs (diminishing returns tables). */
export function productTable(inputs, totals) {
  check(inputs.length === totals.length && inputs.length > 1, "productTable: matching arrays");
  return inputs.map((x, i) => ({
    input: x,
    total: totals[i],
    average: x === 0 ? null : totals[i] / x,
    marginal: i === 0 ? null : (totals[i] - totals[i - 1]) / (x - inputs[i - 1]),
  }));
}

// Genetics ------------------------------------------------------------------------------------------------------------
/**
 * Monohybrid cross: monohybrid("Tt", "tt"), dominant allele upper case -> { gametes1, gametes2, genotypes (counts out
 * of 4, e.g. { Tt: 2, tt: 2 }), phenotypes: { dominant, recessive } out of 4 }.
 */
export function monohybrid(p1, p2) {
  check(/^[A-Za-z]{2}$/.test(p1) && /^[A-Za-z]{2}$/.test(p2), "monohybrid: genotypes like Tt");
  const letter = p1[0].toLowerCase();
  for (const g of [p1, p2]) check([...g].every((c) => c.toLowerCase() === letter), "monohybrid: one gene only");
  const counts = {};
  for (const a of p1) {
    for (const b of p2) {
      const g = [a, b].sort((x, y) => (x === y ? 0 : x === x.toUpperCase() ? -1 : 1)).join("");
      counts[g] = (counts[g] ?? 0) + 1;
    }
  }
  const dominant = Object.entries(counts).filter(([g]) => /[A-Z]/.test(g)).reduce((s, [, n]) => s + n, 0);
  return { gametes1: [...new Set(p1)], gametes2: [...new Set(p2)], genotypes: counts, phenotypes: { dominant, recessive: 4 - dominant } };
}
