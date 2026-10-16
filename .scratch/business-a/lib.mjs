// Authoring helpers for business-a questions and flashcards (A-level Business: ZIMSEC Business Studies and Business
// Enterprise Skills, Forms 5-6, and Cambridge AS & A Level Business 9609). Adapted from .scratch/accounting-a/lib.mjs
// (A-level structure, sub-parts via P.group, exam-format plans EXAM with reserved marks, numeric kinds) with business
// calculators at the end: ratios, break-even, investment appraisal, decision trees, critical path analysis, elasticity,
// moving-average forecasts, EOQ and inventory levels, productivity, capacity, labour turnover, market share, statistics,
// cash flow forecasts and checked statement layouts. Concept modules call concept(...) with a builder;
// build-content.mjs writes the JSON files. Money in Markdown is ALWAYS US\$ - in a JS string write "US\$" (or use
// money(n) / the table helpers below, which do it for you). Never a bare $ before a number.
//
// t`...` is String.raw with one convenience: a typed backslash-n that is NOT followed by a lower-case letter becomes a
// real line break (so t`line one\nline two` works); LaTeX commands such as \neq, \nu, \nabla are left alone. Plain "..."
// strings already treat \n as a newline. A literal backslash-n would show on screen as "\n"; the checker
// .scratch/tools/literal-newlines.mjs finds them (writers may also simply use real line breaks inside template literals).
export const t = (strings, ...values) => String.raw(strings, ...values).replace(/\\n(?![a-z])/g, "\n");

// Selectors for `applies` (an item is tagged only to the syllabi it names). Omit applies for content valid for both.
export const ZIM = ["zimsec"];
export const ZBS = ["zimsec/a-level/business-studies"]; // ZIMSEC Business Studies only
export const ZBE = ["zimsec/a-level/business-enterprise-skills"]; // ZIMSEC Business Enterprise Skills only
export const CAM = ["cambridge/a-level/business"];

const OPTION_KEYS = ["A", "B", "C", "D", "E", "F"];
const DEFAULT_NORMALISE = ["trim", "lowercase", "collapse_whitespace", "strip_punctuation"];
const PART_LABEL = /^\((?:[a-z]{1,2}|[ivx]{1,6}|\d{1,2})\)$/;

// ---------------------------------------------------------------------------------------------------------------------
// Numeric answers. kind sets the answer-box decoration and the default tolerance:
//   money: prefix "US$"; tolerance 0 for whole dollars, 0.005 for cents (so 1250 and 1,250.00 both score).
//   pct:   unit hint "%"; tolerance half a unit in the last of `dp` decimal places (dp default 1 → ±0.05).
//   ratio: unit hint ": 1" (the student types the x of x : 1); dp default 2 → ±0.005.
//   days / times: unit hint "days" / "times"; dp default 0 → ±0.5 (whole days); give dp: 1 for 1 d.p. answers.
//   years / months / units / hours / cents: unit hint of that name (payback in years dp 2; cents for EPS or DPS in cents).
//   weeks / index: unit hint "weeks"; index = a pure number to 2 d.p. (elasticity, a ratio of totals, a factor).
//   plain (default): no decoration; tolerance 0 for integers unless `tol` is given. Add `unit: "kg"` (any short unit
//   such as "units per hour", "minutes", "km") to show a unit hint on any numeric answer box.
// The value must be the EXACT computed value (compute it in code); the model response is the correctly rounded one.
// The engine strips the prefix / unit hint if a student types them; no unit is ever required.
const KINDS = {
  money: { prefix: "US$" },
  pct: { unitHint: "%", dp: 1 },
  ratio: { unitHint: ": 1", dp: 2 },
  days: { unitHint: "days", dp: 0 },
  times: { unitHint: "times", dp: 1 },
  years: { unitHint: "years", dp: 2 },
  months: { unitHint: "months", dp: 0 },
  units: { unitHint: "units", dp: 0 },
  hours: { unitHint: "hours", dp: 1 },
  cents: { unitHint: "cents", dp: 1 },
  weeks: { unitHint: "weeks", dp: 1 },
  // index = a pure number (elasticity, an index, a factor): dp 2 unless the stem says otherwise
  index: { dp: 2 },
  plain: {},
};

const roundTo = (v, dp) => Number((Math.round((v + Number.EPSILON) * 10 ** dp) / 10 ** dp).toFixed(dp));

function numericSpec({ kind = "plain", value, dp, tol, unit }) {
  const k = KINDS[kind];
  if (!k) throw new Error(`Unknown numeric kind ${kind}`);
  if (typeof value !== "number" || !Number.isFinite(value)) throw new Error(`numeric value must be a finite number (got ${value})`);
  const places = dp ?? k.dp ?? (kind === "money" ? (Number.isInteger(value) ? 0 : 2) : Number.isInteger(value) ? 0 : 2);
  if (tol === undefined) tol = kind === "money" ? (Number.isInteger(value) ? 0 : 0.005) : places === 0 && Number.isInteger(value) ? 0 : 0.5 * 10 ** -places;
  const spec = { value };
  if (tol) spec.tolerance = { kind: "absolute", amount: Number(tol.toPrecision(3)) };
  const payload = {};
  if (k.prefix) payload.answerPrefix = k.prefix;
  if (unit) payload.unitHint = unit;
  else if (k.unitHint) payload.unitHint = k.unitHint;
  const shown = roundTo(value, places);
  return { spec, payload, model: places > 0 ? shown.toFixed(places) : String(shown) };
}

/** Part builders (used inside struct parts and to build top-level questions). Each returns { part, model, wrong[] }. */
export const P = {
  /**
   * Numerical answer (type NUMERICAL) or, with type "CALCULATION", a calculation whose working matters (needs a
   * workedSolution; defaults to the explanation). { kind, value, dp?, tol?, answer? (model text), wrong: [values] }.
   */
  num({ label, marks = 1, stem, kind = "plain", value, dp, tol, unit, answer, wrong = [], explanation, workedSolution, hints, type = "NUMERICAL" }) {
    const { spec, payload, model } = numericSpec({ kind, value, dp, tol, unit });
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
// Exam-format plans (BRIEF.md, exam-format table). A STRUCTURED item worth a reserved total (5, 8, 10, 12, 16, 20, 25,
// 30) - and an EXTENDED_RESPONSE worth 12 - must be an exam-format item: examStyle, the skill of an EXAM plan, the plan's
// `applies` (ZIMSEC plans: ZIM, ZBS or ZBE; Cambridge plans: CAM) and, where the plan fixes them, its part labels and
// marks. Practice STRUCTURED items use 6, 9, 14, 15 or 18 marks. (type, total, skill) triples are unique, so the plan of
// an item is found from its type, marks and skill.
export const EXAM = {
  /** ZIMSEC Business Studies Paper 1 section A and Business Enterprise Skills Paper 1 section A: one structured question (10 marks). */
  ZIM_STRUCT10: { type: "STRUCTURED", total: 10, skill: "APPLICATION", appliesAny: [ZIM, ZBS, ZBE], secs: 1080 },
  /** ZIMSEC Business Studies Paper 2 section A: the data response question (25 marks) on a data stimulus. */
  ZIM_DATA25: { type: "STRUCTURED", total: 25, skill: "ANALYSIS", appliesAny: [ZIM, ZBS], secs: 2700 },
  /** ZIMSEC Business Studies Paper 2 section B and Business Enterprise Skills Paper 2: an essay question (25 marks): (a) 10 + (b) 15, both self-marked. */
  ZIM_ESSAY25: { type: "STRUCTURED", total: 25, skill: "EVALUATION", labels: ["(a)", "(b)"], marks: [10, 15], appliesAny: [ZIM, ZBS, ZBE], secs: 2700 },
  /** ZIMSEC Business Studies Paper 1 section B (one case study) and Business Enterprise Skills Paper 1 section B (two case studies): 30 marks on a case study. */
  ZIM_CASE30: { type: "STRUCTURED", total: 30, skill: "ANALYSIS", appliesAny: [ZIM, ZBS, ZBE], secs: 3240 },
  /** Cambridge Paper 1 section A: a five-mark short-answer question (two parts). */
  CAM_SHORT5: { type: "STRUCTURED", total: 5, skill: "APPLICATION", appliesAny: [CAM], secs: 560 },
  /** Cambridge Paper 1 section B (AS content) and Paper 4 (A Level content, case study): a 20-mark essay question, (a) 8 + (b) 12 evaluation. */
  CAM_ESSAY20: { type: "STRUCTURED", total: 20, skill: "EVALUATION", labels: ["(a)", "(b)"], marks: [8, 12], appliesAny: [CAM], secs: 2250 },
  /** Cambridge Paper 2: a data response question (30 marks, six parts, last part evaluation) on AS content. */
  CAM_DATA30: { type: "STRUCTURED", total: 30, skill: "APPLICATION", appliesAny: [CAM], secs: 2700 },
  /** Cambridge Paper 3 questions 1 and 2: an 8-mark question on A Level content with a short case extract. */
  CAM_P3_8: { type: "STRUCTURED", total: 8, skill: "APPLICATION", appliesAny: [CAM], secs: 840 },
  /** Cambridge Paper 3 questions 3 (three parts) and 4 (two parts): a 16-mark question on A Level content, ending with evaluation. */
  CAM_P3_16: { type: "STRUCTURED", total: 16, skill: "ANALYSIS", appliesAny: [CAM], secs: 1680 },
  /** Cambridge Paper 3 question 5: a 12-mark extended response (one answer, levels of response) with evaluation. */
  CAM_P3_12: { type: "EXTENDED_RESPONSE", total: 12, skill: "EVALUATION", appliesAny: [CAM], secs: 1260 },
};
/** STRUCTURED totals reserved for exam-format items (EXTENDED_RESPONSE: only 12). */
export const RESERVED_MARKS = [5, 8, 10, 12, 16, 20, 25, 30];
export const RESERVED_EXT_MARKS = [12];

/** Throws when an exam item's parts do not match its plan: the total and, for plans that fix them, the labels and marks. Returns the parts. */
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
    if (![1, 2, 3, 4, 5].includes(d)) throw new Error(`${q.key}: difficulty 1-5 required (d)`);
    if (d >= 3 && !q.hints) throw new Error(`${q.key}: difficulty ${d} needs hints`);
    if (daily && (d < 2 || d > 3)) throw new Error(`${q.key}: daily questions need difficulty 2-3`);
    const reserved = (q.type === "STRUCTURED" && RESERVED_MARKS.includes(m)) || (q.type === "EXTENDED_RESPONSE" && RESERVED_EXT_MARKS.includes(m));
    if (reserved) {
      const plan = Object.entries(EXAM).find(([, p]) => p.type === q.type && p.total === m && p.skill === q.skill);
      if (!examStyle || !plan) throw new Error(`${q.key}: a ${q.type} item worth ${m} marks must be an exam-format item (examStyle and the skill of an EXAM plan); practice STRUCTURED items use 6, 9, 14, 15 or 18 marks`);
      if (!plan[1].appliesAny.some((a) => JSON.stringify(q.applies) === JSON.stringify(a))) throw new Error(`${q.key}: ${plan[0]} items need applies ${plan[1].appliesAny.map((a) => JSON.stringify(a)).join(" or ")}`);
    }
    questions.push(q);
    return q;
  }

  const b = {
    mcq: (o) => finish(P.mcq(o), o),
    /** Numerical answer: { kind: money|pct|ratio|days|times|plain, value (exact), dp?, tol?, wrong: [...] }. */
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
// Business calculators and checked layouts. Everything returns EXACT numbers (round only for display with r2 / rd /
// fmt, or let b.num round); the helpers that build tables throw when figures do not agree. To print a table for a
// lesson, write a small script in .scratch/business-a/tables/<prefix><name>.mjs (NOT in slices/: every .mjs there is
// imported by the build) that imports these helpers and console.logs the tables, then paste the output. Amounts are
// numbers in US dollars; null/undefined = empty cell. Brackets in a table mean a deduction: (1,200).

const EPS = 0.004;
export const r2 = (v) => roundTo(v, 2);
export const sum = (xs) => r2(xs.reduce((s, x) => s + (Number(x) || 0), 0));
/** Throws unless a and b are equal to the cent. */
export function check(label, a, b) {
  if (Math.abs(r2(a) - r2(b)) > EPS) throw new Error(`check failed: ${label}: ${a} != ${b}`);
  return true;
}
/** Asserts |actual - expected| <= tol (default half a cent) and returns expected: use it for any value you also write in prose. */
export function chk(actual, expected, tol = 0.005, label = "") {
  if (typeof actual !== "number" || !Number.isFinite(actual) || Math.abs(actual - expected) > tol) {
    throw new Error(`CHECK FAILED ${label}: computed ${actual}, written ${expected} (tol ${tol})`);
  }
  return expected;
}
/** Rounds to dp places (half away from zero) and returns a number. */
export const rd = (v, dp = 0) => roundTo(v, dp);
/** Percentage change from old to new. */
export const pctChange = (oldV, newV) => ((newV - oldV) / oldV) * 100;

/** 1250 -> "1,250"; 1250.5 -> "1,250.50"; negative -> "(1,250)" (brackets = deduct / loss). Strings pass through. */
export function fmt(n) {
  if (n === null || n === undefined || n === "") return "";
  if (typeof n === "string") return n;
  const neg = n < 0;
  const a = Math.abs(r2(n));
  const s = a.toLocaleString("en-GB", { minimumFractionDigits: Number.isInteger(a) ? 0 : 2, maximumFractionDigits: 2 });
  return neg ? `(${s})` : s;
}
/** Money in running text: money(1250) -> "US\$1,250". Pass a positive amount; say loss / overdraft in words. */
export function money(n) {
  if (typeof n !== "number" || n < 0) throw new Error(`money(): pass a positive number (got ${n})`);
  return `US\\$${fmt(n)}`;
}

const row = (cells) => `| ${cells.join(" | ")} |`;
/** Markdown table from headers and rows (numbers pass through fmt; strings as written). align: ["l","r",...] (default: first column left, others right). */
export function table(headers, rows, align) {
  const al = align ?? headers.map((_, i) => (i === 0 ? "l" : "r"));
  const lines = [row(headers), row(al.map((a) => (a === "r" ? "---:" : "---")))];
  for (const r of rows) lines.push(row(r.map((c) => (typeof c === "number" ? fmt(c) : (c ?? "")))));
  return lines.join("\n");
}
/**
 * Vertical statement. rows are [label, col1?, col2?, ...] (numbers formatted; strings pass through) or null for a
 * blank row. `checks` = [[label, a, b], ...] asserts every subtotal and total you show. cols: column headings.
 */
export function statement(title, rows, { cols = ["US\\$", "US\\$"], checks = [] } = {}) {
  for (const [label, a, b] of checks) check(`${title}: ${label}`, a, b);
  const lines = [`**${title}**`, "", row(["", ...cols]), row(["---", ...cols.map(() => "---:")])];
  for (const r of rows) {
    if (!r) {
      lines.push(row(["", ...cols.map(() => "")]));
      continue;
    }
    const [label, ...vals] = r;
    lines.push(row([label, ...cols.map((_, i) => fmt(vals[i]))]));
  }
  return lines.join("\n");
}

// ---- Ratios: formulas exactly as the Cambridge 9609 appendix prints them (the ZIMSEC ones are the same families).
// Use year-end balances unless the stem says "average". Never print a ratio's formula-answer in the stem of an item that
// asks for it. Percentages are returned unrounded (b.num rounds); current ratio and acid test are x : 1.
export const ratios = {
  grossMargin: (grossProfit, revenue) => (grossProfit / revenue) * 100,
  /** Operating profit margin (the syllabus's "profit margin") = profit from operations / revenue x 100. */
  operatingMargin: (profitFromOperations, revenue) => (profitFromOperations / revenue) * 100,
  /** ZIMSEC "net profit margin" = profit for the year / revenue x 100 (state the numerator in the stem). */
  netMargin: (profitForYear, revenue) => (profitForYear / revenue) * 100,
  /** Capital employed = issued shares + reserves + non-current liabilities. */
  capitalEmployed: (shares, reserves, nonCurrentLiabilities) => shares + reserves + nonCurrentLiabilities,
  /** ROCE (%) = profit from operations / capital employed x 100. */
  roce: (profitFromOperations, capitalEmployed) => (profitFromOperations / capitalEmployed) * 100,
  currentRatio: (currentAssets, currentLiabilities) => currentAssets / currentLiabilities,
  acidTest: (currentAssets, inventory, currentLiabilities) => (currentAssets - inventory) / currentLiabilities,
  /** Rate of inventory turnover (times) = cost of sales / average inventory. */
  inventoryTurnover: (costOfSales, averageInventory) => costOfSales / averageInventory,
  /** Inventory days = average inventory / cost of sales x 365 (ZIMSEC "stock days"; not printed in the Cambridge appendix). */
  inventoryDays: (averageInventory, costOfSales) => (averageInventory / costOfSales) * 365,
  /** Trade receivables turnover (days) = trade receivables / credit sales x 365. */
  receivablesDays: (tradeReceivables, creditSales) => (tradeReceivables / creditSales) * 365,
  /** Trade payables turnover (days) = trade payables / credit purchases x 365. */
  payablesDays: (tradePayables, creditPurchases) => (tradePayables / creditPurchases) * 365,
  /** Gearing (%) = non-current liabilities / capital employed x 100. */
  gearing: (nonCurrentLiabilities, capitalEmployed) => (nonCurrentLiabilities / capitalEmployed) * 100,
  /** Earnings per share in the currency unit of profit / shares (multiply by 100 for cents). */
  earningsPerShare: (profitForYear, ordinaryShares) => profitForYear / ordinaryShares,
  priceEarnings: (marketPrice, earningsPerShare) => marketPrice / earningsPerShare,
  dividendPerShare: (annualDividend, ordinaryShares) => annualDividend / ordinaryShares,
  /** Dividend yield (%) = dividend per share / market price per share x 100. */
  dividendYield: (dividendPerShare, marketPrice) => (dividendPerShare / marketPrice) * 100,
  /** Dividend cover = profit for the year / annual dividend. */
  dividendCover: (profitForYear, annualDividend) => profitForYear / annualDividend,
  /** Working capital (net current assets). */
  workingCapital: (currentAssets, currentLiabilities) => currentAssets - currentLiabilities,
  /** Gross margin <-> mark-up. */
  marginFromMarkUp: (m) => (m / (100 + m)) * 100,
  markUpFromMargin: (g) => (g / (100 - g)) * 100,
};

// ---- Depreciation. Cambridge: straight line only; ZIMSEC: straight line and reducing balance.
export const depreciation = {
  straightLine: (cost, residual, years) => (cost - residual) / years,
  /** Reducing balance: [{ year, charge, nbv }] rounded to cents. */
  reducingBalance(cost, ratePct, years) {
    const out = [];
    let nbv = cost;
    for (let y = 1; y <= years; y += 1) {
      const charge = r2((nbv * ratePct) / 100);
      nbv = r2(nbv - charge);
      out.push({ year: y, charge, nbv });
    }
    return out;
  },
};

// ---- Inventory valuation. transactions: [{ type: "receipt", qty, unitCost } | { type: "issue", qty }]; opening: { qty, unitCost }.
// ZIMSEC: FIFO, LIFO and AVCO. Cambridge: lower of cost and net realisable value only (no method names beyond that).
function layersFrom(txs, opening) {
  const layers = [];
  if (opening?.qty) layers.push({ qty: opening.qty, unitCost: opening.unitCost });
  for (const tx of txs) if (tx.type === "receipt") layers.push({ qty: tx.qty, unitCost: tx.unitCost });
  return layers;
}
function perpetual(txs, opening, order) {
  const layers = opening && opening.qty ? [{ qty: opening.qty, unitCost: opening.unitCost }] : [];
  const issues = [];
  for (const tx of txs) {
    if (tx.type === "receipt") layers.push({ qty: tx.qty, unitCost: tx.unitCost });
    else {
      let need = tx.qty;
      let cost = 0;
      while (need > 0) {
        const idx = order === "fifo" ? 0 : layers.length - 1;
        const l = layers[idx];
        if (!l) throw new Error("perpetual: issue exceeds the inventory held");
        const take = Math.min(need, l.qty);
        cost += take * l.unitCost;
        l.qty -= take;
        need -= take;
        if (l.qty === 0) layers.splice(idx, 1);
      }
      issues.push({ qty: tx.qty, cost: r2(cost) });
    }
  }
  const closingQty = layers.reduce((s, l) => s + l.qty, 0);
  const closingValue = r2(layers.reduce((s, l) => s + l.qty * l.unitCost, 0));
  return { costOfIssues: r2(issues.reduce((s, i) => s + i.cost, 0)), closingQty, closingValue, layers, issues };
}
function periodic(txs, opening, order) {
  const layers = layersFrom(txs, opening);
  const issued = txs.filter((x) => x.type === "issue").reduce((s, x) => s + x.qty, 0);
  const total = layers.reduce((s, l) => s + l.qty, 0);
  const closingQty = total - issued;
  if (closingQty < 0) throw new Error("periodic: more units sold than available");
  // FIFO: closing stock is the latest purchases; LIFO: the earliest layers.
  const seq = order === "fifo" ? [...layers].reverse() : layers;
  let need = closingQty;
  let closingValue = 0;
  for (const l of seq) {
    if (need <= 0) break;
    const take = Math.min(need, l.qty);
    closingValue += take * l.unitCost;
    need -= take;
  }
  const goodsAvailable = layers.reduce((s, l) => s + l.qty * l.unitCost, 0);
  return { closingQty, closingValue: r2(closingValue), costOfSales: r2(goodsAvailable - closingValue), goodsAvailable: r2(goodsAvailable) };
}
export const inventory = {
  fifoPerpetual: (txs, opening) => perpetual(txs, opening, "fifo"),
  lifoPerpetual: (txs, opening) => perpetual(txs, opening, "lifo"),
  fifoPeriodic: (txs, opening) => periodic(txs, opening, "fifo"),
  lifoPeriodic: (txs, opening) => periodic(txs, opening, "lifo"),
  /** AVCO, perpetual: the average is recalculated after every receipt (roundAvgDp rounds the average, e.g. 2). */
  avcoPerpetual(txs, opening, { roundAvgDp } = {}) {
    let qty = opening?.qty ?? 0;
    let value = (opening?.qty ?? 0) * (opening?.unitCost ?? 0);
    const issues = [];
    for (const tx of txs) {
      if (tx.type === "receipt") {
        qty += tx.qty;
        value += tx.qty * tx.unitCost;
      } else {
        if (tx.qty > qty) throw new Error("avcoPerpetual: issue exceeds the inventory held");
        let avg = value / qty;
        if (roundAvgDp !== undefined) avg = roundTo(avg, roundAvgDp);
        const cost = tx.qty * avg;
        issues.push({ qty: tx.qty, cost: r2(cost) });
        qty -= tx.qty;
        value -= cost;
      }
    }
    return { costOfIssues: r2(issues.reduce((s, i) => s + i.cost, 0)), closingQty: qty, closingValue: r2(value), issues };
  },
  /** AVCO, periodic: weighted average of opening stock and all receipts. */
  avcoPeriodic(txs, opening) {
    let qty = opening?.qty ?? 0;
    let value = (opening?.qty ?? 0) * (opening?.unitCost ?? 0);
    for (const tx of txs) if (tx.type === "receipt") { qty += tx.qty; value += tx.qty * tx.unitCost; }
    const issued = txs.filter((x) => x.type === "issue").reduce((s, x) => s + x.qty, 0);
    const closingQty = qty - issued;
    if (closingQty < 0) throw new Error("avcoPeriodic: more units sold than available");
    const avg = value / qty;
    return { average: avg, closingQty, closingValue: r2(closingQty * avg), costOfSales: r2(value - closingQty * avg), goodsAvailable: r2(value) };
  },
  /** Lower of cost and net realisable value (NRV = selling price - costs to complete and sell). */
  lowerOfCostAndNrv: (cost, sellingPrice, costsToSell = 0) => Math.min(cost, sellingPrice - costsToSell),
};

// ---- Costs, contribution and break-even (Cambridge 5.4; ZIMSEC production costing and break-even analysis).
export const costing = {
  contributionPerUnit: (price, variableCost) => price - variableCost,
  /** Total cost of an output: fixed + variable per unit x output. */
  totalCost: (fixed, variablePerUnit, units) => fixed + variablePerUnit * units,
  /** Full (absorption) cost per unit = direct costs per unit + overheads absorbed per unit. */
  fullCostPerUnit: (directPerUnit, overheadsAbsorbed, units) => directPerUnit + overheadsAbsorbed / units,
  /** Overheads shared on a stated basis: bases [[name, amount]] -> [{ name, share }] summing to the overhead. */
  apportion(overhead, bases) {
    const total = bases.reduce((s, b) => s + b[1], 0);
    const out = bases.map(([name, amount]) => ({ name, share: (overhead * amount) / total }));
    check("apportion: shares add up", out.reduce((s, x) => s + x.share, 0), overhead);
    return out;
  },
  /** Price from a mark-up on cost (percentage). */
  priceFromMarkUp: (cost, markUpPct) => cost * (1 + markUpPct / 100),
  /** Special order: accept if the price per unit exceeds variable cost per unit (when spare capacity and no effect on normal sales). Returns extra profit. */
  specialOrderProfit: (units, price, variablePerUnit, extraFixed = 0) => units * (price - variablePerUnit) - extraFixed,
  /** Contribution per scarce resource, ranking products: items [{ name, contributionPerUnit, resourcePerUnit }]. */
  rankByLimitingFactor: (items) => items.map((i) => ({ ...i, perResource: i.contributionPerUnit / i.resourcePerUnit })).sort((a, b) => b.perResource - a.perResource),
};
/**
 * Cost-volume-profit. cvp({ price, variable, fixed }) -> contribution, csRatio (fraction), breakEvenUnits/Revenue,
 * profitAt(units), marginOfSafety..., unitsForProfit(target). Break-even is interpreted from a table, never drawn.
 */
export function cvp({ price, variable, fixed }) {
  const contribution = price - variable;
  const csRatio = contribution / price;
  return {
    contribution,
    csRatio,
    breakEvenUnits: fixed / contribution,
    breakEvenRevenue: fixed / csRatio,
    unitsForProfit: (target) => (fixed + target) / contribution,
    revenueForProfit: (target) => (fixed + target) / csRatio,
    profitAt: (units) => units * contribution - fixed,
    marginOfSafetyUnits: (actualUnits) => actualUnits - fixed / contribution,
    marginOfSafetyPct: (actualUnits) => ((actualUnits - fixed / contribution) / actualUnits) * 100,
    /** Table of output, revenue, total cost and profit/(loss) for the given outputs (a chart is described from this). */
    table(outputs) {
      const rows = outputs.map((u) => [u, u * price, fixed + variable * u, u * price - (fixed + variable * u)]);
      return table(["Output (units)", "Revenue (US\\$)", "Total cost (US\\$)", "Profit / (loss) (US\\$)"], rows);
    },
  };
}

// ---- Budgets and variances (Cambridge 5.5.2). Signed value: + favourable, - adverse.
const fa = (raw) => {
  const v = roundTo(raw, 6);
  return { value: v, amount: Math.abs(v), fa: v === 0 ? "nil" : v > 0 ? "F" : "A" };
};
export const variances = {
  /** Revenue or profit: actual above budget is favourable. */
  revenue: (budget, actual) => fa(actual - budget),
  /** A cost: actual below budget is favourable. */
  cost: (budget, actual) => fa(budget - actual),
  /** Flexed budget for a variable-cost line: perUnit x actual output (+ fixed). */
  flex: (perUnit, actualUnits, fixed = 0) => perUnit * actualUnits + fixed,
};

// ---- Cash flow forecast (Cambridge 5.3; ZIMSEC cash flow forecasts and the BES cash budget).
/**
 * cashForecast({ opening, periods: [{ label, receipts: [[name, amt]], payments: [[name, amt]] }] }) -> { md, closing, rows }.
 * Each period: total receipts, total payments, net cash flow, opening and closing balance (carried forward). The table
 * shows every receipt and payment line and throws if a line's period is missing. Negative balances show in brackets.
 */
export function cashForecast({ opening, periods, title = "Cash flow forecast" }) {
  let bal = opening;
  const rows = [];
  const names = (key) => [...new Set(periods.flatMap((p) => (p[key] ?? []).map((x) => x[0])))];
  const recNames = names("receipts");
  const payNames = names("payments");
  const out = periods.map((p) => {
    const rec = (p.receipts ?? []).reduce((s, x) => s + x[1], 0);
    const pay = (p.payments ?? []).reduce((s, x) => s + x[1], 0);
    const net = r2(rec - pay);
    const open = r2(bal);
    bal = r2(bal + net);
    return { label: p.label, rec: r2(rec), pay: r2(pay), net, open, close: bal, p };
  });
  const lines = (list, key) => list.map((n) => [n, ...out.map((o) => (o.p[key] ?? []).filter((x) => x[0] === n).reduce((s, x) => s + x[1], 0) || "")]);
  const headers = ["US\\$", ...out.map((o) => o.label)];
  rows.push(["**Receipts**", ...out.map(() => "")], ...lines(recNames, "receipts"), ["**Total receipts**", ...out.map((o) => o.rec)]);
  rows.push(["**Payments**", ...out.map(() => "")], ...lines(payNames, "payments"), ["**Total payments**", ...out.map((o) => o.pay)]);
  rows.push(["**Net cash flow**", ...out.map((o) => o.net)], ["Opening balance", ...out.map((o) => o.open)], ["**Closing balance**", ...out.map((o) => o.close)]);
  return { md: `**${title}**\n\n${table(headers, rows)}`, closing: bal, rows: out.map(({ p, ...rest }) => rest) };
}

// ---- Investment appraisal (Cambridge 10.3; ZIMSEC payback, ARR, NPV). outlay = initial cost at time 0 (a positive number);
// flows = net cash inflows for years 1..n. No residual values, no discounted payback, no IRR in either syllabus.
export const invest = {
  /** Payback in years, inflows arising evenly within each year; null if never recovered. Months = fraction x 12. */
  payback(outlay, flows) {
    let left = outlay;
    for (let i = 0; i < flows.length; i += 1) {
      if (flows[i] >= left) return i + left / flows[i];
      left -= flows[i];
    }
    return null;
  },
  /**
   * ARR (%) = average annual profit / investment x 100, where average annual profit = (total net cash inflows -
   * outlay) / years. basis is REQUIRED so the choice is explicit in every item: "initial" (divide by the initial
   * outlay - the usual Cambridge mark-scheme convention) or "average" (divide by outlay / 2, the syllabus wording
   * "average investment"). State the formula in the stem.
   */
  arr(outlay, flows, { basis } = {}) {
    if (basis !== "initial" && basis !== "average") throw new Error('invest.arr: pass { basis: "initial" | "average" } and state the formula in the stem');
    const avgProfit = (flows.reduce((s, x) => s + x, 0) - outlay) / flows.length;
    return (avgProfit / (basis === "initial" ? outlay : outlay / 2)) * 100;
  },
  /** Discount factor at ratePct for the year; dp rounds it (a supplied table uses 3 d.p.). */
  df: (ratePct, year, dp) => (dp === undefined ? 1 / (1 + ratePct / 100) ** year : roundTo(1 / (1 + ratePct / 100) ** year, dp)),
  /** NPV with factors rounded to dp (default 3, as a supplied table). */
  npv(ratePct, outlay, flows, { dp = 3 } = {}) {
    return flows.reduce((s, f, i) => s + f * invest.df(ratePct, i + 1, dp), 0) - outlay;
  },
  /** Markdown table of the discounted cash flows at ratePct (factors to dp d.p.), with the NPV row. */
  npvTable(ratePct, outlay, flows, { dp = 3 } = {}) {
    const lines = flows.map((f, i) => {
      const d = invest.df(ratePct, i + 1, dp);
      return [`Year ${i + 1}`, f, d.toFixed(dp), r2(f * d)];
    });
    const pv = r2(lines.reduce((s, l) => s + l[3], 0));
    const rows = [["Year 0", -outlay, "1.000", -outlay], ...lines, ["**Net present value**", "", "", r2(pv - outlay)]];
    return table(["Year", "Net cash flow (US\\$)", `Discount factor (${ratePct}%)`, "Present value (US\\$)"], rows);
  },
};

// ---- Decision trees (Cambridge 6.2.1; ZIMSEC tools for decision making). Money outcomes are net of the option's cost.
/** Expected value of [[probability, value], ...]; throws unless the probabilities sum to 1. */
export function expectedValue(branches) {
  const p = branches.reduce((s, b) => s + b[0], 0);
  if (Math.abs(p - 1) > 1e-9) throw new Error(`expectedValue: probabilities sum to ${p}, not 1`);
  return branches.reduce((s, [pr, v]) => s + pr * v, 0);
}
/**
 * Evaluates a (multi-stage) tree. node = { kind: "decision", options: [{ name, cost?, node }] } |
 * { kind: "chance", branches: [{ p, node }] } | { kind: "leaf", value }. A decision picks the option with the highest
 * (EV - cost); a chance node returns the probability-weighted EV. Returns { ev, choice? , detail } where detail
 * lists every chance/decision node evaluated (name them with `name`) so that a lesson can print the working.
 */
export function evaluateTree(node, path = "root") {
  if (node.kind === "leaf") return { ev: node.value, detail: [] };
  if (node.kind === "chance") {
    const kids = node.branches.map((b, i) => ({ p: b.p, r: evaluateTree(b.node, `${path}.${node.name ?? "chance"}${i + 1}`) }));
    const total = kids.reduce((s, k) => s + k.p, 0);
    if (Math.abs(total - 1) > 1e-9) throw new Error(`evaluateTree: ${path} probabilities sum to ${total}`);
    const ev = kids.reduce((s, k) => s + k.p * k.r.ev, 0);
    return { ev, detail: [...kids.flatMap((k) => k.r.detail), { name: node.name ?? path, kind: "chance", ev }] };
  }
  if (node.kind === "decision") {
    const results = node.options.map((o) => {
      const r = evaluateTree(o.node, `${path}.${o.name}`);
      return { name: o.name, cost: o.cost ?? 0, ev: r.ev, net: r.ev - (o.cost ?? 0), detail: r.detail };
    });
    const best = results.reduce((a, b) => (b.net > a.net ? b : a));
    return { ev: best.net, choice: best.name, options: results.map(({ name, cost, ev, net }) => ({ name, cost, ev, net })), detail: [...results.flatMap((r) => r.detail), { name: node.name ?? path, kind: "decision", choice: best.name, ev: best.net }] };
  }
  throw new Error(`evaluateTree: unknown node kind at ${path}`);
}

// ---- Critical path analysis (Cambridge 9.3.5; ZIMSEC network analysis; BES critical path analysis).
/**
 * Precedence-table form: activities [{ id, dur, after: [ids] }] (dummy activities have dur 0). Returns
 * { rows: [{ id, dur, es, ef, ls, lf, totalFloat, freeFloat, critical }], duration, critical: [ids] } where es/ef are
 * earliest start/finish and ls/lf latest start/finish. Free float = earliest start of the following activities (min) -
 * ef, or duration - ef for an activity with no successor. Throws on a cycle or an unknown predecessor.
 */
export function cpa(activities) {
  const byId = new Map(activities.map((a) => [a.id, a]));
  if (byId.size !== activities.length) throw new Error("cpa: duplicate activity id");
  for (const a of activities) for (const p of a.after ?? []) if (!byId.has(p)) throw new Error(`cpa: ${a.id} follows unknown ${p}`);
  const succ = new Map(activities.map((a) => [a.id, []]));
  for (const a of activities) for (const p of a.after ?? []) succ.get(p).push(a.id);
  const es = new Map();
  const ef = new Map();
  const visiting = new Set();
  const forward = (id) => {
    if (ef.has(id)) return;
    if (visiting.has(id)) throw new Error("cpa: cycle in the network");
    visiting.add(id);
    const a = byId.get(id);
    let start = 0;
    for (const p of a.after ?? []) {
      forward(p);
      start = Math.max(start, ef.get(p));
    }
    es.set(id, start);
    ef.set(id, start + a.dur);
    visiting.delete(id);
  };
  activities.forEach((a) => forward(a.id));
  const duration = Math.max(...activities.map((a) => ef.get(a.id)));
  const lf = new Map();
  const ls = new Map();
  const backward = (id) => {
    if (lf.has(id)) return;
    let finish = duration;
    for (const s of succ.get(id)) {
      backward(s);
      finish = Math.min(finish, ls.get(s));
    }
    lf.set(id, finish);
    ls.set(id, finish - byId.get(id).dur);
  };
  activities.forEach((a) => backward(a.id));
  const rows = activities.map((a) => {
    const totalFloat = ls.get(a.id) - es.get(a.id);
    const nextStarts = succ.get(a.id).map((s) => es.get(s));
    const freeFloat = (nextStarts.length ? Math.min(...nextStarts) : duration) - ef.get(a.id);
    return { id: a.id, dur: a.dur, after: a.after ?? [], es: es.get(a.id), ef: ef.get(a.id), ls: ls.get(a.id), lf: lf.get(a.id), totalFloat, freeFloat, critical: totalFloat === 0 };
  });
  return { rows, duration, critical: rows.filter((r) => r.critical).map((r) => r.id) };
}
/**
 * Activity-on-arrow form: arcs [{ id, from, to, dur }] between numbered event nodes (a dummy has dur 0 and an id such
 * as "D1"). Returns { nodes: [{ node, est, lft }], rows: [{ id, from, to, dur, totalFloat, freeFloat, critical }],
 * duration, critical } using the usual rules: EST = longest path from the start node, LFT = duration minus the longest
 * path to the end node; total float = LFT(to) - EST(from) - dur; free float = EST(to) - EST(from) - dur.
 */
export function cpaNodes(arcs) {
  const nodes = [...new Set(arcs.flatMap((a) => [a.from, a.to]))].sort((x, y) => x - y);
  const est = new Map(nodes.map((n) => [n, 0]));
  for (let pass = 0; pass < nodes.length; pass += 1) for (const a of arcs) est.set(a.to, Math.max(est.get(a.to), est.get(a.from) + a.dur));
  const end = Math.max(...nodes);
  const duration = est.get(end);
  const lft = new Map(nodes.map((n) => [n, duration]));
  for (let pass = 0; pass < nodes.length; pass += 1) for (const a of arcs) lft.set(a.from, Math.min(lft.get(a.from), lft.get(a.to) - a.dur));
  const rows = arcs.map((a) => {
    const totalFloat = lft.get(a.to) - est.get(a.from) - a.dur;
    const freeFloat = est.get(a.to) - est.get(a.from) - a.dur;
    return { id: a.id, from: a.from, to: a.to, dur: a.dur, totalFloat, freeFloat, critical: totalFloat === 0 };
  });
  return { nodes: nodes.map((n) => ({ node: n, est: est.get(n), lft: lft.get(n) })), rows, duration, critical: rows.filter((r) => r.critical).map((r) => r.id) };
}
/** Markdown table of a cpa() or cpaNodes() result. */
export function cpaTable(res) {
  if (res.nodes) return table(["Activity", "From", "To", "Duration", "Total float", "Free float", "Critical?"], res.rows.map((r) => [r.id, String(r.from), String(r.to), String(r.dur), String(r.totalFloat), String(r.freeFloat), r.critical ? "yes" : "no"]));
  return table(["Activity", "Duration", "Earliest start", "Earliest finish", "Latest start", "Latest finish", "Total float", "Free float"], res.rows.map((r) => [r.id, String(r.dur), String(r.es), String(r.ef), String(r.ls), String(r.lf), String(r.totalFloat), String(r.freeFloat)]));
}

// ---- Marketing numbers: elasticity, market share, sales forecasting (Cambridge 8.1; ZIMSEC elasticity and forecasting).
export const elasticity = {
  /** Price elasticity of demand = % change in quantity demanded / % change in price (negative for a normal good). */
  price: (p0, p1, q0, q1) => pctChange(q0, q1) / pctChange(p0, p1),
  /** Income elasticity of demand = % change in quantity demanded / % change in income. */
  income: (y0, y1, q0, q1) => pctChange(q0, q1) / pctChange(y0, y1),
  /** Promotional elasticity of demand = % change in quantity demanded / % change in promotional spending. */
  promotional: (a0, a1, q0, q1) => pctChange(q0, q1) / pctChange(a0, a1),
  /** Cross elasticity (ZIMSEC detail) = % change in quantity of A / % change in price of B. */
  cross: (pB0, pB1, qA0, qA1) => pctChange(qA0, qA1) / pctChange(pB0, pB1),
  /** Revenue after a price change = new price x new quantity. */
  revenue: (p, q) => p * q,
};
export const market = {
  share: (firmSales, marketSales) => (firmSales / marketSales) * 100,
  growth: (oldMarket, newMarket) => pctChange(oldMarket, newMarket),
  /** Relative market share (Boston Matrix): firm's share / share of the largest competitor. */
  relativeShare: (firmSales, largestCompetitorSales) => firmSales / largestCompetitorSales,
};
/**
 * Four-period centred moving average for quarterly data (Cambridge 8.1.3). values = [v1, v2, ...] (quarters in order,
 * first value is quarter 1 of the first year unless startQuarter given). Returns { rows: [{ i, value, movingTotal,
 * movingAverage, centred, seasonal }], seasonalAverage: [q1..q4 average variation, adjusted to sum to 0 if adjust],
 * trendChange (mean change in the centred average per quarter), forecast(n) for the n-th period after the data }.
 * The seasonal variation is actual - centred average (additive model).
 */
export function movingAverage4(values, { startQuarter = 1, adjust = true } = {}) {
  if (values.length < 5) throw new Error("movingAverage4: need at least five periods");
  const rows = values.map((v, i) => ({ i: i + 1, value: v, q: ((startQuarter - 1 + i) % 4) + 1 }));
  for (let i = 0; i + 3 < values.length; i += 1) {
    const tot = values[i] + values[i + 1] + values[i + 2] + values[i + 3];
    rows[i + 1].movingTotal = tot; // aligned between periods i+2 and i+3; stored on i+1 (the second of the four), used to centre
    rows[i + 1].movingAverage = tot / 4;
  }
  for (let i = 2; i < values.length - 1; i += 1) {
    const a = rows[i - 1]?.movingAverage;
    const b = rows[i]?.movingAverage;
    if (a !== undefined && b !== undefined) {
      rows[i].centred = (a + b) / 2;
      rows[i].seasonal = values[i] - rows[i].centred;
    }
  }
  const bySeason = [[], [], [], []];
  for (const r of rows) if (r.seasonal !== undefined) bySeason[r.q - 1].push(r.seasonal);
  let seasonalAverage = bySeason.map((x) => (x.length ? x.reduce((s, y) => s + y, 0) / x.length : 0));
  if (adjust) {
    const mean = seasonalAverage.reduce((s, x) => s + x, 0) / 4;
    seasonalAverage = seasonalAverage.map((x) => x - mean);
  }
  const cs = rows.filter((r) => r.centred !== undefined);
  const trendChange = (cs[cs.length - 1].centred - cs[0].centred) / (cs[cs.length - 1].i - cs[0].i);
  const last = cs[cs.length - 1];
  return {
    rows,
    seasonalAverage,
    trendChange,
    forecast: (n) => {
      const idx = values.length + n; // period number being forecast
      const q = ((startQuarter - 1 + idx - 1) % 4) + 1;
      return last.centred + trendChange * (idx - last.i) + seasonalAverage[q - 1];
    },
  };
}

// ---- Operations numbers (Cambridge 4 and 9; ZIMSEC production, inventory control, capacity).
export const operations = {
  labourProductivity: (output, employees) => output / employees,
  capitalProductivity: (output, capitalEmployed) => output / capitalEmployed,
  unitLabourCost: (labourCost, output) => labourCost / output,
  capacityUtilisation: (actualOutput, maxCapacity) => (actualOutput / maxCapacity) * 100,
  /** Spare capacity in units. */
  spareCapacity: (actualOutput, maxCapacity) => maxCapacity - actualOutput,
  /** Economic order quantity = sqrt(2 x annual demand x ordering cost per order / holding cost per unit per year). */
  eoq: (annualDemand, costPerOrder, holdingCostPerUnit) => Math.sqrt((2 * annualDemand * costPerOrder) / holdingCostPerUnit),
  /** Annual inventory cost at an order size: ordering + holding (average stock = Q / 2). */
  annualInventoryCost: (annualDemand, costPerOrder, holdingCostPerUnit, q) => (annualDemand / q) * costPerOrder + (q / 2) * holdingCostPerUnit,
  /** Re-order level = maximum usage per day x maximum lead time (days), or usage during lead time + buffer. */
  reorderLevel: ({ usagePerDay, leadTimeDays, buffer = 0 }) => usagePerDay * leadTimeDays + buffer,
  /** Maximum stock level = re-order level + re-order quantity - (minimum usage x minimum lead time). */
  maxStock: ({ reorderLevel, reorderQty, minUsage, minLead }) => reorderLevel + reorderQty - minUsage * minLead,
};

// ---- Human resource numbers (Cambridge 2.1.2).
export const hr = {
  /** Labour turnover (%) = number of employees leaving in the year / average number of employees x 100. */
  labourTurnover: (leavers, averageEmployees) => (leavers / averageEmployees) * 100,
  /** Labour retention (%) = 100 - labour turnover. */
  retention: (leavers, averageEmployees) => 100 - (leavers / averageEmployees) * 100,
  /** Average employees = (opening + closing) / 2. */
  average: (opening, closing) => (opening + closing) / 2,
};

// ---- Statistics for market research (ZIMSEC: central tendency, dispersion, sampling).
export const stats = {
  mean: (xs) => xs.reduce((s, x) => s + x, 0) / xs.length,
  median(xs) {
    const s = [...xs].sort((a, b) => a - b);
    const m = Math.floor(s.length / 2);
    return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
  },
  /** Mode(s): array (several values if tied). */
  mode(xs) {
    const c = new Map();
    for (const x of xs) c.set(x, (c.get(x) ?? 0) + 1);
    const top = Math.max(...c.values());
    return [...c].filter(([, n]) => n === top).map(([x]) => x);
  },
  range: (xs) => Math.max(...xs) - Math.min(...xs),
  /** Standard deviation: population by default; { sample: true } divides by n - 1. */
  stdDev(xs, { sample = false } = {}) {
    const m = stats.mean(xs);
    return Math.sqrt(xs.reduce((s, x) => s + (x - m) ** 2, 0) / (xs.length - (sample ? 1 : 0)));
  },
  /** Mean of grouped data: classes [[midpoint, frequency], ...]. */
  groupedMean: (classes) => classes.reduce((s, [m, f]) => s + m * f, 0) / classes.reduce((s, [, f]) => s + f, 0),
  /** Proportional (stratified) sample: strata [[name, size], ...] and a sample size n -> [{ name, size, sample }] (exact, unrounded). */
  stratified(strata, n) {
    const total = strata.reduce((s, x) => s + x[1], 0);
    return strata.map(([name, size]) => ({ name, size, sample: (size / total) * n }));
  },
};

// ---- Checked financial statements (Cambridge 10.1; ZIMSEC / BES financial statements). Layouts follow the Cambridge
// wording (statement of profit or loss, statement of financial position, profit for the year); ZIMSEC titles
// (income statement, net profit) go in the terminology box of the lesson. Statements here are for internal use.
/**
 * profitLoss({ business, period, revenue, costOfSales, expenses: [[name, amt]], financeCosts?, tax?, dividends? })
 * -> { md, grossProfit, profitFromOperations, profitBeforeTax, profitForYear, retained }.
 */
export function profitLoss({ business, period, revenue, costOfSales, expenses, financeCosts = 0, tax = 0, dividends = 0, otherIncome = 0 }) {
  const grossProfit = r2(revenue - costOfSales);
  const totalExpenses = sum(expenses.map((e) => e[1]));
  const profitFromOperations = r2(grossProfit + otherIncome - totalExpenses);
  const profitBeforeTax = r2(profitFromOperations - financeCosts);
  const profitForYear = r2(profitBeforeTax - tax);
  const retained = r2(profitForYear - dividends);
  const rows = [
    ["Revenue", null, revenue],
    ["Cost of sales", null, -costOfSales],
    ["**Gross profit**", null, grossProfit],
  ];
  if (otherIncome) rows.push(["Other income", null, otherIncome]);
  for (const [n, a] of expenses) rows.push([n, -a, null]);
  rows.push(["Total expenses", null, -totalExpenses], ["**Profit from operations**", null, profitFromOperations]);
  if (financeCosts) rows.push(["Finance costs", null, -financeCosts]);
  rows.push(["**Profit before tax**", null, profitBeforeTax]);
  if (tax) rows.push(["Tax", null, -tax]);
  rows.push(["**Profit for the year**", null, profitForYear]);
  if (dividends) rows.push(["Dividends", null, -dividends], ["**Retained profit for the year**", null, retained]);
  const md = `**${business}**\n\n**Statement of profit or loss for the year ended ${period}**\n\n${statement("", rows, { cols: ["US\\$", "US\\$"] }).split("\n").slice(2).join("\n")}`;
  return { md, grossProfit, profitFromOperations, profitBeforeTax, profitForYear, retained };
}
/**
 * positionStatement({ business, date, nonCurrentAssets: [[n,a]], inventories, receivables, cash, otherCurrentAssets?: [[n,a]],
 * currentLiabilities: [[n,a]], nonCurrentLiabilities: [[n,a]], shareCapital, reserves: [[n,a]] })
 * -> { md, totalAssets, netCurrentAssets, netAssets, capitalEmployed, equity } and throws unless net assets = equity.
 */
export function positionStatement({ business, date, nonCurrentAssets, currentAssets, currentLiabilities, nonCurrentLiabilities = [], equity }) {
  const nca = sum(nonCurrentAssets.map((x) => x[1]));
  const ca = sum(currentAssets.map((x) => x[1]));
  const cl = sum(currentLiabilities.map((x) => x[1]));
  const ncl = sum(nonCurrentLiabilities.map((x) => x[1]));
  const eq = sum(equity.map((x) => x[1]));
  const netCurrentAssets = r2(ca - cl);
  const netAssets = r2(nca + netCurrentAssets - ncl);
  check(`${business}: net assets equal equity (the statement must balance)`, netAssets, eq);
  const rows = [
    ["**Non-current assets**"],
    ...nonCurrentAssets.map(([n, a]) => [n, a]),
    ["Total non-current assets", null, nca],
    ["**Current assets**"],
    ...currentAssets.map(([n, a]) => [n, a]),
    ["Total current assets", null, ca],
    ["**Current liabilities**"],
    ...currentLiabilities.map(([n, a]) => [n, -a]),
    ["Total current liabilities", null, -cl],
    ["**Net current assets**", null, netCurrentAssets],
    ["**Total assets less current liabilities**", null, r2(nca + netCurrentAssets)],
  ];
  if (ncl) rows.push(["**Non-current liabilities**"], ...nonCurrentLiabilities.map(([n, a]) => [n, -a]), ["Total non-current liabilities", null, -ncl]);
  rows.push(["**Net assets**", null, netAssets], ["**Equity**"], ...equity.map(([n, a]) => [n, a]), ["**Total equity**", null, eq]);
  const md = `**${business}**\n\n**Statement of financial position at ${date}**\n\n${statement("", rows, { cols: ["US\\$", "US\\$"] }).split("\n").slice(2).join("\n")}`;
  return { md, totalAssets: r2(nca + ca), netCurrentAssets, netAssets, equity: eq, capitalEmployed: r2(eq + ncl), nonCurrentAssets: nca, currentAssets: ca, currentLiabilities: cl, nonCurrentLiabilities: ncl };
}
/**
 * Statement of cash flows, indirect method (ZIMSEC Business Studies). operating: profit before tax + adjustments
 * [[name, amt]] (signed: depreciation positive, increase in inventories negative ...), tax paid, interest paid,
 * investing [[n, amt]] signed, financing [[n, amt]] signed. Throws unless opening + net = closing cash.
 */
export function cashFlowIndirect({ business, period, profitBeforeTax, adjustments, taxPaid = 0, interestPaid = 0, investing, financing, openingCash, closingCash }) {
  const adj = sum(adjustments.map((x) => x[1]));
  const operating = r2(profitBeforeTax + adj - taxPaid - interestPaid);
  const inv = sum(investing.map((x) => x[1]));
  const fin = sum(financing.map((x) => x[1]));
  const net = r2(operating + inv + fin);
  check(`${business}: opening cash + net change = closing cash`, openingCash + net, closingCash);
  const rows = [
    ["**Cash flows from operating activities**"],
    ["Profit before tax", null, profitBeforeTax],
    ...adjustments.map(([n, a]) => [n, a]),
    ...(interestPaid ? [["Interest paid", -interestPaid]] : []),
    ...(taxPaid ? [["Tax paid", -taxPaid]] : []),
    ["**Net cash from operating activities**", null, operating],
    ["**Cash flows from investing activities**"],
    ...investing.map(([n, a]) => [n, a]),
    ["**Net cash from (used in) investing activities**", null, inv],
    ["**Cash flows from financing activities**"],
    ...financing.map(([n, a]) => [n, a]),
    ["**Net cash from (used in) financing activities**", null, fin],
    ["**Net increase (decrease) in cash and cash equivalents**", null, net],
    ["Cash and cash equivalents at the start of the year", null, openingCash],
    ["**Cash and cash equivalents at the end of the year**", null, closingCash],
  ];
  const md = `**${business}**\n\n**Statement of cash flows for the year ended ${period}**\n\n${statement("", rows, { cols: ["US\\$", "US\\$"] }).split("\n").slice(2).join("\n")}`;
  return { md, operating, investing: inv, financing: fin, net };
}
/**
 * Statement of cash flows, direct method (ZIMSEC Business Studies): operating receipts and payments are listed
 * directly. receipts / payments: [[name, amt]] positive numbers; investing and financing signed. Throws unless
 * opening + net = closing cash.
 */
export function cashFlowDirect({ business, period, receipts, payments, investing, financing, openingCash, closingCash }) {
  const rec = sum(receipts.map((x) => x[1]));
  const pay = sum(payments.map((x) => x[1]));
  const operating = r2(rec - pay);
  const inv = sum(investing.map((x) => x[1]));
  const fin = sum(financing.map((x) => x[1]));
  const net = r2(operating + inv + fin);
  check(`${business}: opening cash + net change = closing cash`, openingCash + net, closingCash);
  const rows = [
    ["**Cash flows from operating activities**"],
    ...receipts.map(([n, a]) => [n, a]),
    ...payments.map(([n, a]) => [n, -a]),
    ["**Net cash from operating activities**", null, operating],
    ["**Cash flows from investing activities**"],
    ...investing.map(([n, a]) => [n, a]),
    ["**Net cash from (used in) investing activities**", null, inv],
    ["**Cash flows from financing activities**"],
    ...financing.map(([n, a]) => [n, a]),
    ["**Net cash from (used in) financing activities**", null, fin],
    ["**Net increase (decrease) in cash and cash equivalents**", null, net],
    ["Cash and cash equivalents at the start of the year", null, openingCash],
    ["**Cash and cash equivalents at the end of the year**", null, closingCash],
  ];
  const md = `**${business}**\n\n**Statement of cash flows for the year ended ${period}** (direct method)\n\n${statement("", rows, { cols: ["US\\$", "US\\$"] }).split("\n").slice(2).join("\n")}`;
  return { md, operating, investing: inv, financing: fin, net };
}
