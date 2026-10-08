// Authoring helpers for physics-o content (questions + flashcards). Concept modules call concept(...) and use the
// builder; build-content.mjs writes the JSON. LaTeX is written with t`...` (String.raw), so backslashes are single here
// and JSON.stringify doubles them in the files.
export const t = String.raw;

// ---------------------------------------------------------------------------------------------------------------------
// Units: display hint + accepted spellings (optional units: a missing unit is fine, an unknown one costs a mark).
const UNITS = {
  "m": ["m", "metres", "metre", "meters"],
  "cm": ["cm", "centimetres"],
  "mm": ["mm", "millimetres"],
  "km": ["km", "kilometres"],
  "s": ["s", "seconds", "second", "sec", "secs"],
  "min": ["min", "minutes", "mins"],
  "h": ["h", "hours", "hour", "hrs", "hr"],
  "m/s": ["m/s", "m s^-1", "ms^-1", "metres per second"],
  "km/s": ["km/s", "km s^-1", "kilometres per second"],
  "s⁻¹": ["s⁻¹", "s^-1", "/s", "per second"],
  "km/h": ["km/h", "kmh^-1", "km h^-1", "kilometres per hour", "kph"],
  "m/s²": ["m/s²", "m/s^2", "m s^-2", "ms^-2", "m/s/s"],
  "N": ["N", "newtons", "newton"],
  "kN": ["kN", "kilonewtons"],
  "kg": ["kg", "kilograms", "kilogram"],
  "g": ["g", "grams", "gram"],
  "J": ["J", "joules", "joule"],
  "kJ": ["kJ", "kilojoules"],
  "MJ": ["MJ", "megajoules"],
  "W": ["W", "watts", "watt"],
  "kW": ["kW", "kilowatts"],
  "MW": ["MW", "megawatts"],
  "Pa": ["Pa", "N/m^2", "N/m²", "pascals", "pascal"],
  "kPa": ["kPa", "kilopascals"],
  "N/m": ["N/m", "N m^-1"],
  "N/cm": ["N/cm", "N cm^-1"],
  "kg/m³": ["kg/m³", "kg/m^3", "kg m^-3"],
  "g/cm³": ["g/cm³", "g/cm^3", "g cm^-3", "g/ml"],
  "N m": ["N m", "Nm", "N·m", "newton metres"],
  "N cm": ["N cm", "Ncm", "N·cm", "newton centimetres"],
  "kg m/s": ["kg m/s", "kg m s^-1", "N s", "Ns", "kgm/s"],
  "N s": ["N s", "Ns", "kg m/s", "kg m s^-1"],
  "N/kg": ["N/kg", "N kg^-1", "m/s^2"],
  "°C": ["°C", "degrees Celsius", "degrees C", "deg C", "degrees"],
  "K": ["K", "kelvin", "kelvins"],
  "Hz": ["Hz", "hertz"],
  "kHz": ["kHz", "kilohertz"],
  "MHz": ["MHz", "megahertz"],
  "GHz": ["GHz", "gigahertz"],
  "nm": ["nm", "nanometres", "nanometers"],
  "cm/s": ["cm/s", "cm s^-1", "cms^-1", "centimetres per second"],
  "ms": ["ms", "milliseconds", "millisecond"],
  "V": ["V", "volts", "volt"],
  "kV": ["kV", "kilovolts"],
  "A": ["A", "amperes", "amps", "amp", "ampere"],
  "mA": ["mA", "milliamps", "milliamperes"],
  "Ω": ["Ω", "ohm", "ohms"],
  "kΩ": ["kΩ", "kilohms", "kohm", "k ohm"],
  "C": ["C", "coulombs", "coulomb"],
  "kW h": ["kW h", "kWh", "kilowatt-hours", "kilowatt hours", "units"],
  "J/(kg °C)": ["J/(kg °C)", "J/kg°C", "J/kg/°C", "J kg^-1 °C^-1", "J/(kg K)", "J/kg K", "J/kgK"],
  "J/kg": ["J/kg", "J kg^-1"],
  "%": ["%", "percent", "per cent"],
  "m³": ["m³", "m^3", "cubic metres"],
  "cm³": ["cm³", "cm^3", "ml", "mL", "cubic centimetres"],
  "m²": ["m²", "m^2", "square metres"],
  "cm²": ["cm²", "cm^2", "square centimetres"],
  "°": ["°", "degrees", "deg"],
  "counts/min": ["counts/min", "counts per minute", "cpm", "counts min^-1"],
  "counts/s": ["counts/s", "counts per second", "cps"],
  "years": ["years", "year", "y", "yr"],
  "days": ["days", "day", "d"],
  "minutes": ["minutes", "min", "mins"],
  "hours": ["hours", "h", "hr", "hrs"],
  "light-years": ["light-years", "light years", "ly"],
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
  const s = Number(value.toPrecision(3));
  return String(s);
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
const OPTION_KEYS = ["A", "B", "C", "D", "E", "F"];

/** Part builders (used inside struct parts and to build top-level questions). Each returns { part, model, wrong[] }. */
export const P = {
  // Multi-select ("select all") questions are worth 2 marks, all or nothing (the platform default), so they are never
  // drawn as 1-mark MCQs in mock papers.
  mcq({ label, marks, stem, options, answer, multiple = false, explanation, hints, workedSolution }) {
    const answers = Array.isArray(answer) ? answer : [answer];
    marks ??= multiple ? 2 : 1;
    const opts = options.map(([content, rationale], i) => {
      const key = OPTION_KEYS[i];
      const o = { key, content };
      if (answers.includes(key)) o.correct = true;
      if (rationale) o.rationale = rationale;
      return o;
    });
    const wrongKey = OPTION_KEYS.slice(0, options.length).find((k) => !answers.includes(k));
    const part = { label, type: "MULTIPLE_CHOICE", marks, stem };
    if (multiple) part.payload = { selectMode: "multiple" };
    part.options = opts;
    if (explanation) part.explanation = explanation;
    if (workedSolution) part.workedSolution = workedSolution;
    if (hints) part.hints = hints;
    return { part, model: { type: "MULTIPLE_CHOICE", optionKeys: answers }, wrong: [{ type: "MULTIPLE_CHOICE", optionKeys: [wrongKey] }] };
  },
  tf({ label, marks = 1, stem, answer, feedbackTrue, feedbackFalse, explanation, hints }) {
    const part = { label, type: "TRUE_FALSE", marks, stem, answerSpec: { correct: answer } };
    if (feedbackTrue) part.answerSpec.feedbackTrue = feedbackTrue;
    if (feedbackFalse) part.answerSpec.feedbackFalse = feedbackFalse;
    if (explanation) part.explanation = explanation;
    if (hints) part.hints = hints;
    return { part, model: { type: "TRUE_FALSE", value: answer }, wrong: [{ type: "TRUE_FALSE", value: !answer }] };
  },
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
    return {
      part,
      model: { type, value: answer ?? fmt(value) },
      wrong: wrong.map((w) => ({ type, value: String(w) })),
    };
  },
  short({ label, marks = 1, stem, accepted, patterns, keywords, rejected, normalise, wrong = [], explanation, hints, maxLength }) {
    const spec = {};
    if (accepted) spec.accepted = accepted.map((a) => (typeof a === "string" ? { value: a } : a));
    if (patterns) spec.patterns = patterns;
    if (keywords) spec.keywords = keywords;
    if (rejected) spec.rejected = rejected.map((r) => (typeof r === "string" ? { value: r } : r));
    spec.normalise = normalise ?? ["trim", "lowercase", "collapse_whitespace", "strip_punctuation"];
    const part = { label, type: "SHORT_ANSWER", marks, stem };
    if (maxLength) part.payload = { maxLength };
    part.answerSpec = spec;
    if (explanation) part.explanation = explanation;
    if (hints) part.hints = hints;
    const first = accepted ? (typeof accepted[0] === "string" ? accepted[0] : accepted[0].value) : null;
    return { part, model: { type: "SHORT_ANSWER", text: first }, wrong: wrong.map((w) => ({ type: "SHORT_ANSWER", text: w })) };
  },
  /** Fill in the blank: template with {{blank:id}}; blanks: [{ id, accepted: [...], input, choices, tolerance }]. */
  fib({ label, marks, stem, template, blanks, wrong, explanation, hints }) {
    const part = { label, type: "FILL_IN_THE_BLANK", marks: marks ?? blanks.length, stem };
    part.payload = {
      template,
      blanks: blanks.map((b) => {
        const o = { id: b.id };
        if (b.input && b.input !== "text") o.input = b.input;
        if (b.choices) o.choices = b.choices;
        return o;
      }),
    };
    part.answerSpec = {
      blanks: blanks.map((b) => {
        const o = { id: b.id, accepted: b.accepted.map(String) };
        if (b.tolerance !== undefined) o.tolerance = b.tolerance;
        if (b.marks !== undefined) o.marks = b.marks;
        return o;
      }),
    };
    if (explanation) part.explanation = explanation;
    if (hints) part.hints = hints;
    const model = { type: "FILL_IN_THE_BLANK", blanks: blanks.map((b) => ({ blankId: b.id, text: String(b.accepted[0]) })) };
    const wrongResponses = (wrong ?? [blanks.map((b) => b.wrong ?? "?")]).map((w) => ({
      type: "FILL_IN_THE_BLANK",
      blanks: blanks.map((b, i) => ({ blankId: b.id, text: String(w[i]) })),
    }));
    return { part, model, wrong: wrongResponses };
  },
  /** Matching: pairs [[left, right], ...] matched by position; right items are shuffled for display by a fixed rotation. */
  match({ label, marks, stem, pairs, extraRight = [], explanation, hints, marksPerPair = 1 }) {
    const left = pairs.map(([l], i) => ({ id: `L${i + 1}`, content: l }));
    const rights = pairs.map(([, r], i) => ({ id: `R${i + 1}`, content: r }));
    extraRight.forEach((r, i) => rights.push({ id: `X${i + 1}`, content: r }));
    // deterministic display order: rotate by 2
    const rotated = rights.map((_, i) => rights[(i + 2) % rights.length]);
    const part = { label, type: "MATCHING", marks: marks ?? pairs.length * marksPerPair, stem };
    part.payload = { left, right: rotated };
    part.answerSpec = { pairs: pairs.map((_, i) => ({ leftId: `L${i + 1}`, rightId: `R${i + 1}` })), marksPerPair };
    if (explanation) part.explanation = explanation;
    if (hints) part.hints = hints;
    const model = { type: "MATCHING", pairs: pairs.map((_, i) => ({ leftId: `L${i + 1}`, rightId: `R${i + 1}` })) };
    const wrong = { type: "MATCHING", pairs: pairs.map((_, i) => ({ leftId: `L${i + 1}`, rightId: `R${((i + 1) % pairs.length) + 1}` })) };
    return { part, model, wrong: [wrong] };
  },
  /** Self-marked written part (explain / describe): points cover the marks. */
  manual({ label, marks, stem, points, modelAnswer, explanation, hints, type = "SHORT_ANSWER" }) {
    // points: "description" (1 mark) or [description, marks]; they must add up to the part's marks.
    const list = points.map((p, i) => (Array.isArray(p) ? { id: `p${i + 1}`, description: p[0], marks: p[1] } : { id: `p${i + 1}`, description: p, marks: 1 }));
    const total = list.reduce((s, p) => s + p.marks, 0);
    if (total !== marks) throw new Error(`manual part ${label}: points total ${total} != marks ${marks}`);
    const part = { label, type, marks, markingMode: "MANUAL", stem, answerSpec: { markScheme: { points: list } } };
    if (modelAnswer && (type === "EXTENDED_RESPONSE" || type === "ESSAY")) part.answerSpec.modelAnswer = modelAnswer;
    if (explanation) part.explanation = explanation;
    if (hints) part.hints = hints;
    return { part, model: null, wrong: [] };
  },
};

// ---------------------------------------------------------------------------------------------------------------------
const MODULES = [];

/**
 * Declares one concept's items. `objectives`: { zimsec: [...codes], cambridge: [...codes] } attached to every item
 * (filtered by the item's `applies`). The callback receives the builder.
 */
export function concept(conceptKey, { file, keyPrefix, objectives = {}, extraConcepts = [] }, body) {
  const questions = [];
  const cards = [];
  let qn = 0;
  let cn = 0;
  const objectiveRefs = (applies) => {
    const out = [];
    for (const [board, codes] of Object.entries(objectives)) {
      if (applies && !applies.some((a) => a.startsWith(board))) continue;
      const prefix = board === "zimsec" ? "zimsec/o-level/physics" : "cambridge/igcse/physics";
      for (const code of codes) out.push(`${prefix}:${code}`);
    }
    return out;
  };

  function finish(base, built, opts) {
    const { d, marks, secs, skill, daily, examStyle, applies, calculator, access, concepts, hints, explanation, workedSolution, conceptSummary, paper, objectives: objOverride } = opts;
    const q = {
      key: `${keyPrefix}.q${String(++qn).padStart(2, "0")}`,
      type: built.part.type,
      concepts: concepts ?? [conceptKey, ...extraConcepts],
      difficulty: d,
      marks: marks ?? built.part.marks,
      estimatedSeconds: secs ?? Math.max(30, (marks ?? built.part.marks) * 75),
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
    const refs = objOverride ? objOverride : objectiveRefs(applies);
    if (refs.length) q.objectives = refs;
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
    mcq: (o) => finish(null, P.mcq(o), o),
    tf: (o) => finish(null, P.tf(o), o),
    num: (o) => finish(null, P.num(o), o),
    calc: (o) => finish(null, P.num({ ...o, type: "CALCULATION" }), o),
    short: (o) => finish(null, P.short(o), o),
    fib: (o) => finish(null, P.fib(o), o),
    match: (o) => finish(null, P.match(o), o),
    /** Structured: parts = [P.xxx({...label...}), ...]; marks = sum of parts. */
    struct(o) {
      const parts = o.parts;
      const part = {
        type: "STRUCTURED",
        stem: o.stem,
        marks: parts.reduce((s, p) => s + p.part.marks, 0),
      };
      const q = finish(null, { part, model: null, wrong: [] }, { ...o, marks: part.marks });
      q.parts = parts.map((p) => p.part);
      const modelParts = {};
      const wrongParts = {};
      for (const p of parts) {
        if (p.model) modelParts[p.part.label] = p.model;
        if (p.wrong[0]) wrongParts[p.part.label] = p.wrong[0];
      }
      // re-order keys: parts before explanation
      const ordered = {};
      for (const [k, v] of Object.entries(q)) {
        if (k === "explanation") ordered.parts = q.parts;
        if (k !== "parts") ordered[k] = v;
      }
      if (Object.keys(modelParts).length) ordered.modelResponse = { type: "STRUCTURED", parts: modelParts };
      if (Object.keys(wrongParts).length) ordered.wrongResponses = [{ type: "STRUCTURED", parts: wrongParts }];
      // keep skill etc. after responses
      for (const k of ["skill", "dailyEligible", "examStyle", "applies", "objectives", "calculator", "paper", "access"]) {
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
      if (extra.applies) c.applies = extra.applies;
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
