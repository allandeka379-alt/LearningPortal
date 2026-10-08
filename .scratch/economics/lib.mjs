// Authoring helpers for economics-o questions and flashcards (adapted from .scratch/accounting/lib.mjs, itself from
// .scratch/english/lib.mjs with the numeric builders of .scratch/combined-science/lib.mjs). Concept modules call
// concept(...) with a builder; build-content.mjs writes the JSON files. LaTeX is rarely needed (write it with t`...`);
// money in Markdown is ALWAYS US\$ — in a JS string write "US\\$" (or use money(n) / the table helpers below, which do
// it for you). Never a bare $ before a number.
export const t = String.raw;

// Selectors for `applies` (an item is tagged only to the syllabi it names). Omit applies for content valid for both.
export const ZIM = ["zimsec"];
export const CAM = ["cambridge/igcse/economics"];

const OPTION_KEYS = ["A", "B", "C", "D", "E", "F"];
const DEFAULT_NORMALISE = ["trim", "lowercase", "collapse_whitespace", "strip_punctuation"];

// ---------------------------------------------------------------------------------------------------------------------
// Numeric answers. kind sets the answer-box decoration and the default tolerance:
//   money: prefix "US$"; tolerance 0 for whole dollars, 0.005 for cents (so 1250 and 1,250.00 both score).
//   pct:   unit hint "%"; tolerance half a unit in the last of `dp` decimal places (dp default 1 → ±0.05).
//   elasticity: no decoration; dp default 2 → ±0.005 (PED, PES, YED, XED). Say in the stem whether the minus sign is
//              wanted ("include the minus sign"): the box accepts one value only, so -0.75 and 0.75 are different answers.
//   index: no decoration; dp default 1 → ±0.05 (price indices, terms of trade).
//   ratio: unit hint ": 1" (the student types the x of x : 1); dp default 2 → ±0.005.
//   times: unit hint "times"; dp default 1.
//   plain (default): no decoration; tolerance 0 for integers unless `tol` is given.
// The value must be the EXACT computed value (compute it in code); the model response is the correctly rounded one.
// The engine strips the prefix / unit hint if a student types them; no unit is ever required.
const KINDS = {
  money: { prefix: "US$" },
  pct: { unitHint: "%", dp: 1 },
  elasticity: { dp: 2 },
  index: { dp: 1 },
  ratio: { unitHint: ": 1", dp: 2 },
  times: { unitHint: "times", dp: 1 },
  plain: {},
};

const roundTo = (v, dp) => Number((Math.round((v + Number.EPSILON) * 10 ** dp) / 10 ** dp).toFixed(dp));

function numericSpec({ kind = "plain", value, dp, tol }) {
  const k = KINDS[kind];
  if (!k) throw new Error(`Unknown numeric kind ${kind}`);
  if (typeof value !== "number" || !Number.isFinite(value)) throw new Error(`numeric value must be a finite number (got ${value})`);
  const places = dp ?? k.dp ?? (kind === "money" ? (Number.isInteger(value) ? 0 : 2) : Number.isInteger(value) ? 0 : 2);
  if (tol === undefined) tol = kind === "money" ? (Number.isInteger(value) ? 0 : 0.005) : places === 0 && Number.isInteger(value) ? 0 : 0.5 * 10 ** -places;
  const spec = { value };
  if (tol) spec.tolerance = { kind: "absolute", amount: Number(tol.toPrecision(3)) };
  const payload = {};
  if (k.prefix) payload.answerPrefix = k.prefix;
  if (k.unitHint) payload.unitHint = k.unitHint;
  const shown = roundTo(value, places);
  return { spec, payload, model: places > 0 ? shown.toFixed(places) : String(shown) };
}

/** Part builders (used inside struct parts and to build top-level questions). Each returns { part, model, wrong[] }. */
export const P = {
  /**
   * Numerical answer (type NUMERICAL) or, with type "CALCULATION", a calculation whose working matters (needs a
   * workedSolution; defaults to the explanation). { kind, value, dp?, tol?, answer? (model text), wrong: [values] }.
   */
  num({ label, marks = 1, stem, kind = "plain", value, dp, tol, answer, wrong = [], explanation, workedSolution, hints, type = "NUMERICAL" }) {
    const { spec, payload, model } = numericSpec({ kind, value, dp, tol });
    const part = { label, type, marks, stem };
    if (Object.keys(payload).length) part.payload = payload;
    part.answerSpec = spec;
    if (explanation) part.explanation = explanation;
    const ws = workedSolution ?? (explanation ? `1. ${explanation}` : undefined);
    if (ws) part.workedSolution = ws;
    if (hints) part.hints = hints;
    return { part, model: { type, value: answer ?? model }, wrong: wrong.map((w) => ({ type, value: String(w) })) };
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
      estimatedSeconds: secs ?? Math.max(60, m * 70),
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
    /** Numerical answer: { kind: money|pct|elasticity|index|ratio|times|plain, value (exact), dp?, tol?, wrong: [...] }. */
    num: (o) => finish(P.num(o), o),
    /** Calculation (working shown in workedSolution, defaults to the explanation): same fields as num. */
    calc: (o) => finish(P.num({ ...o, type: "CALCULATION" }), o),
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
// a lesson, write a small script in .scratch/economics/tables/<prefix><name>.mjs (NOT in slices/: every .mjs there is
// imported by the build) that imports these helpers and console.logs the output, and paste it.
// Diagrams are never drawn: describe them in words ("the supply curve shifts to the left") and show the numbers in a
// schedule. Data is original and clearly fictional ("Country X", "a fictional town"), never real statistics.

const EPS = 0.004;
export const r2 = (v) => roundTo(v, 2);
export { roundTo };
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
