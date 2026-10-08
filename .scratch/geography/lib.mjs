// Authoring helpers for geography-o questions and flashcards (adapted from .scratch/english/lib.mjs, with the numeric
// builders of .scratch/combined-science/lib.mjs). Concept modules call concept(...) with a builder; build-content.mjs
// writes the JSON files. Strings are plain JSON text. LaTeX (rare in geography: gradients, formulae) is written with
// t`...` (String.raw), so backslashes are single in the slice and JSON.stringify doubles them in the files. A literal
// dollar sign must be written US\\$ (in a normal JS string) so it is not read as maths.
export const t = String.raw;

// Selectors for `applies` (an item is tagged only to the syllabi it names). Omit `applies` for items that suit both.
export const ZIM = ["zimsec"];
export const CAM = ["cambridge/igcse/geography"];

const OPTION_KEYS = ["A", "B", "C", "D", "E", "F"];
const DEFAULT_NORMALISE = ["trim", "lowercase", "collapse_whitespace", "strip_punctuation"];

// ---------------------------------------------------------------------------------------------------------------------
// Units for numerical answers: display hint + accepted spellings (optional units: a missing unit is fine, an unknown
// one costs a mark). Add a unit here only if a slice needs it (tell the lead; this file is shared).
const UNITS = {
  "m": ["m", "metres", "metre", "meters"],
  "km": ["km", "kilometres", "kilometre", "kilometers"],
  "cm": ["cm", "centimetres"],
  "mm": ["mm", "millimetres"],
  "m²": ["m²", "m^2", "square metres", "sq m"],
  "km²": ["km²", "km^2", "square kilometres", "sq km"],
  "ha": ["ha", "hectares", "hectare"],
  "m/s": ["m/s", "m s^-1", "ms^-1", "metres per second"],
  "km/h": ["km/h", "km h^-1", "kilometres per hour", "kph"],
  "m³/s": ["m³/s", "m^3/s", "m3/s", "cumecs", "cubic metres per second"],
  "°C": ["°C", "degrees Celsius", "degrees C", "deg C", "C", "degrees"],
  "°": ["°", "degrees", "deg"],
  "%": ["%", "percent", "per cent"],
  "‰": ["‰", "per 1000", "per thousand", "per mille"],
  "people/km²": ["people/km²", "people/km^2", "people per km²", "people per square kilometre", "persons/km²", "/km²", "per km²"],
  "h": ["h", "hours", "hour", "hrs", "hr"],
  "min": ["min", "minutes", "mins"],
  "s": ["s", "seconds", "second", "sec", "secs"],
  "years": ["years", "year", "yrs", "y"],
  "days": ["days", "day"],
  "t": ["t", "tonnes", "tonne", "metric tons"],
  "MW": ["MW", "megawatts", "megawatt"],
  "kWh": ["kWh", "kW h", "kilowatt-hours", "kilowatt hours", "units"],
  "hPa": ["hPa", "mb", "millibars", "hectopascals"],
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
   * Numerical answer (gradient, scale, distance, area, time from longitude, rates, statistics). value: the exact
   * answer computed with code; tol: absolute tolerance (default: exact for integers, half a unit in the 2nd s.f.
   * otherwise); unit: a key of UNITS; prefix: text shown before the box (e.g. "1 in" for gradients); type NUMERICAL or
   * CALCULATION (with working: give workedSolution as numbered steps).
   */
  num({ label, marks = 1, stem, value, answer, unit, tol, sf, dp, penalty, wrong = [], explanation, workedSolution, hints, type = "NUMERICAL", prefix }) {
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
// Levels-of-response mark scheme for extended geography answers (our own wording). Use it for "evaluate",
// "discuss", "to what extent" and long "explain" parts, usually 6-9 marks, together with indicative content points
// that add up to the marks. Returns [level, min, max, descriptor] rows for P.manual / b.ext `levels`.
export function geographyLevels(total) {
  if (total < 4) throw new Error("geographyLevels: use point marking below 4 marks");
  const l1 = Math.max(1, Math.round(total / 3));
  const l2 = Math.max(l1 + 1, Math.round((2 * total) / 3));
  return [
    [3, l2 + 1, total, "Developed, accurate explanation of several relevant points, supported by a located example or the resource, with a clear judgement or conclusion where the question asks for one."],
    [2, l1 + 1, l2, "Some explanation of relevant points, partly developed; an example or resource evidence is used in general terms; any judgement is simple or one-sided."],
    [1, 1, l1, "Simple statements or a list of points with little explanation; no example or only a name."],
    [0, 0, 0, "Nothing creditworthy."],
  ];
}
