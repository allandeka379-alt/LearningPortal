// Authoring helpers for accounting-a questions and flashcards (adapted from .scratch/accounting/lib.mjs with the A-level
// structure of .scratch/biology-a/lib.mjs: sub-parts via P.group, exam-format plans EXAM, checkExam, reserved marks).
// Concept modules call concept(...) with a builder; build-content.mjs writes the JSON files. Money in Markdown is ALWAYS
// US\$ — in a JS string write "US\\$" (or use money(n) / the table helpers below, which do it for you). Never a bare $
// before a number. Checked helpers at the end: tables and statements that THROW when figures do not balance, ratios,
// depreciation, inventory (FIFO/AVCO), costing, CVP, variances, partnerships, investment appraisal.
//
// t`...` is String.raw with one convenience: a typed backslash-n that is NOT followed by a lower-case letter becomes a
// real line break (so t`line one\nline two` works); LaTeX commands such as \neq, \nu, \nabla are left alone. Plain "..."
// strings already treat \n as a newline. A literal backslash-n would show on screen as "\n"; the checker
// .scratch/tools/literal-newlines.mjs finds them.
export const t = (strings, ...values) => String.raw(strings, ...values).replace(/\\n(?![a-z])/g, "\n");

// Selectors for `applies` (an item is tagged only to the syllabi it names). Omit applies for content valid for both.
export const ZIM = ["zimsec"];
export const CAM = ["cambridge/a-level/accounting"];

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
//   plain (default): no decoration; tolerance 0 for integers unless `tol` is given.
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
// Exam-format plans (BRIEF.md, exam-format table). STRUCTURED items worth a reserved total (15, 25 or 30) must be
// examStyle, carry the plan's skill and (when the plan fixes it) its applies. Practice STRUCTURED items use 6, 8, 10, 12,
// 14, 16, 18 or 20 marks. (total, skill) pairs are unique, so the plan of an item is found from its marks and skill.
export const EXAM = {
  /** ZIMSEC Paper 2: one of four compulsory structured questions (25 marks): mixed ledger, statement and analysis parts. */
  ZIM_P2_STRUCT: { total: 25, skill: "APPLICATION", applies: ZIM, secs: 1575 },
  /** ZIMSEC Paper 3 (problem solving) and Cambridge Paper 3 (A Level financial accounting): a full financial accounting problem with analysis (25 marks). */
  FIN25: { total: 25, skill: "ANALYSIS", secs: 2000 },
  /** ZIMSEC Paper 3 (its cost and management question) and Cambridge Paper 4 (A Level cost and management accounting): 25 marks ending with an evaluation or recommendation. */
  COST25: { total: 25, skill: "EVALUATION", secs: 1900 },
  /** Cambridge Paper 2 question 1 (30 marks, AS financial accounting: statements and adjustments, with analysis). */
  CAM_P2_Q1: { total: 30, skill: "APPLICATION", applies: CAM, secs: 2100 },
  /** Cambridge Paper 2 questions 2 and 3 (15 marks each, AS financial accounting). */
  CAM_P2_SHORT: { total: 15, skill: "APPLICATION", applies: CAM, secs: 1050 },
  /** Cambridge Paper 2 question 4 (30 marks, AS cost and management accounting). */
  CAM_P2_COST: { total: 30, skill: "ANALYSIS", applies: CAM, secs: 2100 },
};
/** STRUCTURED totals reserved for exam-format items. */
export const RESERVED_MARKS = [15, 25, 30];

/** Throws when an exam item's parts do not total the plan's marks. Returns the parts. */
export function checkExam(plan, parts) {
  const total = parts.reduce((s, p) => s + p.part.marks, 0);
  if (total !== plan.total) throw new Error(`exam item parts total ${total}, plan needs ${plan.total}`);
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
    if (q.type === "STRUCTURED" && RESERVED_MARKS.includes(m)) {
      const plan = Object.entries(EXAM).find(([, p]) => p.total === m && p.skill === q.skill);
      if (!examStyle || !plan) throw new Error(`${q.key}: a STRUCTURED item worth ${m} marks must be an exam-format item (examStyle and the skill of an EXAM plan); practice items use 6, 8, 10, 12, 14, 16, 18 or 20 marks`);
      if (plan[1].applies && JSON.stringify(q.applies) !== JSON.stringify(plan[1].applies)) throw new Error(`${q.key}: ${plan[0]} items need applies ${JSON.stringify(plan[1].applies)}`);
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
// Accounting layouts with built-in arithmetic checks. Every helper returns Markdown with a single backslash in US\$,
// which is correct both pasted into a lesson .md file and inside a JSON string (JSON.stringify doubles it). They THROW
// when the figures do not add up, so a table that renders is a table that balances. To print one for a lesson, write a
// small script in .scratch/accounting-a/tables/<prefix>-<name>.mjs (NOT in slices/: every .mjs there is imported by the build)
// that imports these helpers and console.logs the tables, and paste the output.
// Amounts are numbers in US dollars; null/undefined = empty cell.

const EPS = 0.004;
export const r2 = (v) => roundTo(v, 2);
export const sum = (xs) => r2(xs.reduce((s, x) => s + (Number(x) || 0), 0));
/** Throws unless a and b are equal to the cent. */
export function check(label, a, b) {
  if (Math.abs(r2(a) - r2(b)) > EPS) throw new Error(`check failed: ${label}: ${a} != ${b}`);
  return true;
}

/** 1250 → "1,250"; 1250.5 → "1,250.50"; negative → "(1,250)" (brackets = deduct / loss). Strings pass through. */
export function fmt(n) {
  if (n === null || n === undefined || n === "") return "";
  if (typeof n === "string") return n;
  const neg = n < 0;
  const a = Math.abs(r2(n));
  const s = a.toLocaleString("en-GB", { minimumFractionDigits: Number.isInteger(a) ? 0 : 2, maximumFractionDigits: 2 });
  return neg ? `(${s})` : s;
}
/** Money in running text: money(1250) → "US\$1,250". Pass a positive amount; say loss / overdraft in words. */
export function money(n) {
  if (typeof n !== "number" || n < 0) throw new Error(`money(): pass a positive number (got ${n})`);
  return `US\\$${fmt(n)}`;
}

const row = (cells) => `| ${cells.join(" | ")} |`;

/**
 * Two-sided ledger (T) account. dr / cr: arrays of [date, details, amount]. balance "auto" (default) adds the balance
 * c/d on the smaller side, totals both sides and brings the balance down (b/d); false shows the entries only.
 * Example: tAccount("Bank account", [["1 Jan", "Capital", 5000]], [["3 Jan", "Rent", 400]], { cdDate: "31 Jan", bdDate: "1 Feb" })
 */
export function tAccount(title, dr, cr, { balance = "auto", cdDate = "", bdDate = "", cd = "Balance c/d", bd = "Balance b/d" } = {}) {
  const D = dr.map((x) => [...x]);
  const C = cr.map((x) => [...x]);
  let after = null;
  if (balance === "auto") {
    const td = sum(D.map((x) => x[2]));
    const tc = sum(C.map((x) => x[2]));
    const diff = r2(td - tc);
    if (diff > 0) C.push([cdDate, cd, diff]);
    if (diff < 0) D.push([cdDate, cd, -diff]);
    const total = Math.max(td, tc);
    check(`${title} totals`, sum(D.map((x) => x[2])), sum(C.map((x) => x[2])));
    after = { total, diff };
  }
  const n = Math.max(D.length, C.length);
  const lines = [`**${title}**`, "", row(["Date", "Details", "US\\$", "Date", "Details", "US\\$"]), row(["---", "---", "---:", "---", "---", "---:"])];
  for (let i = 0; i < n; i += 1) {
    const a = D[i] ?? ["", "", null];
    const b = C[i] ?? ["", "", null];
    lines.push(row([a[0], a[1], fmt(a[2]), b[0], b[1], fmt(b[2])]));
  }
  if (after) {
    lines.push(row(["", "", `**${fmt(after.total)}**`, "", "", `**${fmt(after.total)}**`]));
    if (after.diff > 0) lines.push(row([bdDate, bd, fmt(after.diff), "", "", ""]));
    if (after.diff < 0) lines.push(row(["", "", "", bdDate, bd, fmt(-after.diff)]));
  }
  return lines.join("\n");
}
/** Balance of a T account: { side: "Dr" | "Cr" | null, amount }. */
export function balanceOf(dr, cr) {
  const d = r2(sum(dr.map((x) => x[2])) - sum(cr.map((x) => x[2])));
  return { side: d > 0 ? "Dr" : d < 0 ? "Cr" : null, amount: Math.abs(d) };
}

/**
 * Three-column running balance account. rows: [date, details, debit, credit]; opening: signed opening balance
 * (+ = debit). Computes the balance column ("1,200 Dr"). Returns { md, closing } (closing signed, + = debit).
 */
export function runningBalance(title, rows, { opening = 0 } = {}) {
  let bal = opening;
  const lines = [`**${title}**`, "", row(["Date", "Details", "Debit US\\$", "Credit US\\$", "Balance US\\$"]), row(["---", "---", "---:", "---:", "---:"])];
  for (const [date, details, d, c] of rows) {
    bal = r2(bal + (d ?? 0) - (c ?? 0));
    lines.push(row([date, details, fmt(d), fmt(c), bal === 0 ? "0" : `${fmt(Math.abs(bal))} ${bal > 0 ? "Dr" : "Cr"}`]));
  }
  return { md: lines.join("\n"), closing: bal };
}

/**
 * Trial balance. rows: [account, debit, credit]. Throws if the totals differ unless allowDifference (for "find the
 * error" questions; the difference is returned). Returns { md, debit, credit, difference }.
 */
export function trialBalance(title, rows, { allowDifference = false } = {}) {
  const debit = sum(rows.map((x) => x[1]));
  const credit = sum(rows.map((x) => x[2]));
  if (!allowDifference) check(`${title}: trial balance totals`, debit, credit);
  const lines = [`**${title}**`, "", row(["Account", "Debit US\\$", "Credit US\\$"]), row(["---", "---:", "---:"])];
  for (const [a, d, c] of rows) lines.push(row([a, fmt(d), fmt(c)]));
  lines.push(row(["**Total**", `**${fmt(debit)}**`, `**${fmt(credit)}**`]));
  return { md: lines.join("\n"), debit, credit, difference: r2(debit - credit) };
}

/** General journal. entries: [{ date?, lines: [[account, debit, credit], ...], narrative }]. Each entry must balance. */
export function journal(entries, { title = "Journal" } = {}) {
  const lines = [`**${title}**`, "", row(["Date", "Details", "Debit US\\$", "Credit US\\$"]), row(["---", "---", "---:", "---:"])];
  for (const e of entries) {
    check(`journal entry "${e.narrative ?? ""}"`, sum(e.lines.map((l) => l[1])), sum(e.lines.map((l) => l[2])));
    e.lines.forEach(([acc, d, c], i) => lines.push(row([i === 0 ? (e.date ?? "") : "", acc, fmt(d), fmt(c)])));
    if (e.narrative) lines.push(row(["", `*${e.narrative}*`, "", ""]));
  }
  return lines.join("\n");
}

/**
 * Vertical statement (income statement, statement of financial position, appropriation account, ...). rows are
 * [label, col1?, col2?, ...] (numbers are formatted; strings pass through) or null for a blank row. Supply
 * `checks` as [[label, a, b], ...] to assert every subtotal and total you show (each goes through check()).
 * cols: column headings after the label (default two US\$ columns).
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

/** Ratio formulas exactly as the Cambridge syllabus prints them (ZIMSEC uses the same ones it lists). */
export const ratios = {
  grossMargin: (gp, revenue) => (gp / revenue) * 100,
  markUp: (gp, costOfSales) => (gp / costOfSales) * 100,
  profitMargin: (profit, revenue) => (profit / revenue) * 100,
  roce: (profitBeforeInterest, capitalEmployed) => (profitBeforeInterest / capitalEmployed) * 100,
  current: (ca, cl) => ca / cl,
  acidTest: (ca, inventory, cl) => (ca - inventory) / cl,
  inventoryTurnover: (costOfSales, openingInv, closingInv) => costOfSales / ((openingInv + closingInv) / 2),
  inventoryDays: (costOfSales, openingInv, closingInv) => ((openingInv + closingInv) / 2 / costOfSales) * 365,
  receivablesDays: (tradeReceivables, creditSales) => (tradeReceivables / creditSales) * 365,
  payablesDays: (tradePayables, creditPurchases) => (tradePayables / creditPurchases) * 365,
  marginFromMarkUp: (m) => (m / (100 + m)) * 100,
  markUpFromMargin: (g) => (g / (100 - g)) * 100,
};
/** Depreciation: straight line → annual charge; reducing balance → [{ year, charge, nbv }] rounded to cents. */
export const depreciation = {
  straightLine: (cost, residual, years) => (cost - residual) / years,
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


// =====================================================================================================================
// A-level additions. Everything returns EXACT numbers (round only for display with r2 / fmt, or let b.num round); the
// helpers that build tables throw when figures do not agree. Variances: a positive signed value is favourable.

/** Asserts |actual − expected| ≤ tol (default half a cent) and returns expected: use it for any value you also write in prose. */
export function chk(actual, expected, tol = 0.005, label = "") {
  if (typeof actual !== "number" || !Number.isFinite(actual) || Math.abs(actual - expected) > tol) {
    throw new Error(`CHECK FAILED ${label}: computed ${actual}, written ${expected} (tol ${tol})`);
  }
  return expected;
}
/** Rounds to dp places (half away from zero) and returns a number. */
export const rd = (v, dp = 0) => roundTo(v, dp);
/** Markdown table from headers and rows (cells are strings or numbers; numbers pass through fmt unless the cell is a string). Right-align numeric columns with align: ["l","r",...]. */
export function table(headers, rows, align) {
  const al = align ?? headers.map((_, i) => (i === 0 ? "l" : "r"));
  const lines = [row(headers), row(al.map((a) => (a === "r" ? "---:" : "---")))];
  for (const r of rows) lines.push(row(r.map((c) => (typeof c === "number" ? fmt(c) : (c ?? "")))));
  return lines.join("\n");
}

// ---- Ratios beyond the AS set (formulas as in the Cambridge appendix and the ZIMSEC list)
Object.assign(ratios, {
  expensesToRevenue: (expenses, revenue) => (expenses / revenue) * 100,
  nonCurrentAssetTurnover: (revenue, nbvNonCurrentAssets) => revenue / nbvNonCurrentAssets,
  /** Working capital cycle (days) = receivables days + inventory days − payables days. */
  workingCapitalCycle: (receivablesDays, inventoryDays, payablesDays) => receivablesDays + inventoryDays - payablesDays,
  netWorkingAssets: (inventories, tradeReceivables, tradePayables) => inventories + tradeReceivables - tradePayables,
  netWorkingAssetsToRevenue: (nwa, revenue) => (nwa / revenue) * 100,
  interestCover: (profitFromOperations, interestPayable) => profitFromOperations / interestPayable,
  /** Gearing (%) = non-current liabilities / (issued ordinary share capital + all reserves + non-current liabilities) × 100. */
  gearing: (nonCurrentLiabilities, shareCapital, reserves) => (nonCurrentLiabilities / (shareCapital + reserves + nonCurrentLiabilities)) * 100,
  earningsPerShare: (profitForYear, ordinaryShares) => profitForYear / ordinaryShares,
  priceEarnings: (marketPrice, eps) => marketPrice / eps,
  dividendPerShare: (annualOrdinaryDividend, ordinaryShares) => annualOrdinaryDividend / ordinaryShares,
  dividendYield: (dps, marketPrice) => (dps / marketPrice) * 100,
  dividendCover: (profitAvailable, annualOrdinaryDividend) => profitAvailable / annualOrdinaryDividend,
  // ZIMSEC list (not in the Cambridge appendix)
  returnOnAssets: (profit, totalAssets) => (profit / totalAssets) * 100,
  returnOnEquity: (profit, equity) => (profit / equity) * 100,
  debtToEquity: (debt, equity) => debt / equity,
  earningsYield: (eps, marketPrice) => (eps / marketPrice) * 100,
  totalAssetsTurnover: (revenue, totalAssets) => revenue / totalAssets,
  currentAssetsTurnover: (revenue, currentAssets) => revenue / currentAssets,
  capitalEmployedTurnover: (revenue, capitalEmployed) => revenue / capitalEmployed,
});

// ---- Inventory valuation. transactions: [{ type: "receipt", qty, unitCost } | { type: "issue", qty }]; opening: { qty, unitCost }.
export const inventory = {
  /** FIFO, perpetual: returns { costOfIssues, closingQty, closingValue, layers, issues: [{ qty, cost }] }. Throws on an issue larger than the stock. */
  fifoPerpetual(txs, opening) {
    const layers = opening && opening.qty ? [{ qty: opening.qty, unitCost: opening.unitCost }] : [];
    const issues = [];
    for (const tx of txs) {
      if (tx.type === "receipt") layers.push({ qty: tx.qty, unitCost: tx.unitCost });
      else {
        let need = tx.qty;
        let cost = 0;
        while (need > 0) {
          const l = layers[0];
          if (!l) throw new Error("fifoPerpetual: issue exceeds the inventory held");
          const take = Math.min(need, l.qty);
          cost += take * l.unitCost;
          l.qty -= take;
          need -= take;
          if (l.qty === 0) layers.shift();
        }
        issues.push({ qty: tx.qty, cost: r2(cost) });
      }
    }
    const closingQty = layers.reduce((s, l) => s + l.qty, 0);
    const closingValue = r2(layers.reduce((s, l) => s + l.qty * l.unitCost, 0));
    return { costOfIssues: r2(issues.reduce((s, i) => s + i.cost, 0)), closingQty, closingValue, layers, issues };
  },
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
  /** Periodic systems: only the opening inventory, the receipts and the units sold in the period are used. */
  fifoPeriodic(txs, opening) {
    const layers = [];
    if (opening?.qty) layers.push({ qty: opening.qty, unitCost: opening.unitCost });
    for (const tx of txs) if (tx.type === "receipt") layers.push({ qty: tx.qty, unitCost: tx.unitCost });
    const issued = txs.filter((x) => x.type === "issue").reduce((s, x) => s + x.qty, 0);
    const total = layers.reduce((s, l) => s + l.qty, 0);
    let closingQty = total - issued;
    if (closingQty < 0) throw new Error("fifoPeriodic: more units sold than available");
    let need = closingQty;
    let closingValue = 0;
    for (let i = layers.length - 1; i >= 0 && need > 0; i -= 1) {
      const take = Math.min(need, layers[i].qty);
      closingValue += take * layers[i].unitCost;
      need -= take;
    }
    const goodsAvailable = layers.reduce((s, l) => s + l.qty * l.unitCost, 0);
    return { closingQty, closingValue: r2(closingValue), costOfSales: r2(goodsAvailable - closingValue), goodsAvailable: r2(goodsAvailable) };
  },
  avcoPeriodic(txs, opening) {
    let qty = opening?.qty ?? 0;
    let value = (opening?.qty ?? 0) * (opening?.unitCost ?? 0);
    for (const tx of txs) if (tx.type === "receipt") { qty += tx.qty; value += tx.qty * tx.unitCost; }
    const issued = txs.filter((x) => x.type === "issue").reduce((s, x) => s + x.qty, 0);
    const closingQty = qty - issued;
    if (closingQty < 0) throw new Error("avcoPeriodic: more units sold than available");
    const avg = value / qty;
    const closingValue = closingQty * avg;
    return { average: avg, closingQty, closingValue: r2(closingValue), costOfSales: r2(value - closingValue), goodsAvailable: r2(value) };
  },
  /** IAS 2: lower of cost and net realisable value (NRV = selling price − costs to complete and sell). */
  lowerOfCostAndNrv: (cost, sellingPrice, costsToSell = 0) => Math.min(cost, sellingPrice - costsToSell),
};

// ---- Cost and management accounting
export const costing = {
  /** Overhead absorption rate = budgeted overhead / budgeted activity (hours, units, US$ of labour ...). */
  oar: (budgetedOverhead, budgetedActivity) => budgetedOverhead / budgetedActivity,
  /** Over(+)/under(−) absorption = absorbed − actual. Positive means over-absorbed (credit to profit). */
  overUnder: (absorbed, actual) => r2(absorbed - actual),
  /** High-low method: points [[activity, cost], ...] → { variablePerUnit, fixed }. */
  highLow(points) {
    const s = [...points].sort((a, b) => a[0] - b[0]);
    const lo = s[0];
    const hi = s[s.length - 1];
    const variablePerUnit = (hi[1] - lo[1]) / (hi[0] - lo[0]);
    return { variablePerUnit, fixed: hi[1] - variablePerUnit * hi[0] };
  },
  /** Profit under absorption − profit under marginal = (closing − opening units) × fixed overhead absorbed per unit. */
  profitDifference: (openingUnits, closingUnits, fixedPerUnit) => (closingUnits - openingUnits) * fixedPerUnit,
  /** Contribution per scarce resource, ranking products: items [{ name, contributionPerUnit, resourcePerUnit }]. */
  rankByLimitingFactor: (items) => items.map((i) => ({ ...i, perResource: i.contributionPerUnit / i.resourcePerUnit })).sort((a, b) => b.perResource - a.perResource),
  /** Flexed budget: rows [{ name, perUnit?, fixed? }] → [{ name, amount }] at the given activity. */
  flex: (rows, activity) => rows.map((x) => ({ name: x.name, amount: (x.fixed ?? 0) + (x.perUnit ?? 0) * activity })),
};
/** Cost-volume-profit. cvp({ price, variable, fixed }) → contribution, csRatio (fraction), breakEven..., marginOfSafety(...). */
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
  };
}

/** Variances: each returns { value (signed, + favourable), amount (absolute), fa: "F" | "A" | "nil" }. */
const fa = (raw) => {
  const v = roundTo(raw, 6);
  return { value: v, amount: Math.abs(v), fa: v === 0 ? "nil" : v > 0 ? "F" : "A" };
};
export const variances = {
  materialPrice: ({ stdPrice, actualPrice, actualQty }) => fa((stdPrice - actualPrice) * actualQty),
  materialUsage: ({ stdQtyForActualOutput, actualQty, stdPrice }) => fa((stdQtyForActualOutput - actualQty) * stdPrice),
  labourRate: ({ stdRate, actualRate, actualHours }) => fa((stdRate - actualRate) * actualHours),
  labourEfficiency: ({ stdHoursForActualOutput, actualHours, stdRate }) => fa((stdHoursForActualOutput - actualHours) * stdRate),
  salesPrice: ({ stdPrice, actualPrice, actualUnits }) => fa((actualPrice - stdPrice) * actualUnits),
  /** Sales volume (profit) variance at the standard profit (or contribution) per unit the question names. */
  salesVolume: ({ budgetUnits, actualUnits, stdProfitPerUnit }) => fa((actualUnits - budgetUnits) * stdProfitPerUnit),
  fixedOverheadExpenditure: ({ budgetedOverhead, actualOverhead }) => fa(budgetedOverhead - actualOverhead),
  /** Volume = absorbed − budgeted = (actual output − budgeted output) × absorption rate per unit. */
  fixedOverheadVolume: ({ budgetedUnits, actualUnits, ratePerUnit }) => fa((actualUnits - budgetedUnits) * ratePerUnit),
  /** Capacity = (actual hours − budgeted hours) × rate per hour; efficiency = (standard hours for actual output − actual hours) × rate per hour. */
  fixedOverheadCapacity: ({ budgetedHours, actualHours, ratePerHour }) => fa((actualHours - budgetedHours) * ratePerHour),
  fixedOverheadEfficiency: ({ stdHoursForActualOutput, actualHours, ratePerHour }) => fa((stdHoursForActualOutput - actualHours) * ratePerHour),
};

// ---- Investment appraisal. outlay is the initial investment at time 0 (positive number); flows are net cash inflows for years 1..n.
export const invest = {
  /** Payback in years, assuming inflows arise evenly within each year; null if never recovered. */
  payback(outlay, flows) {
    let left = outlay;
    for (let i = 0; i < flows.length; i += 1) {
      if (flows[i] >= left) return i + left / flows[i];
      left -= flows[i];
    }
    return null;
  },
  /** Cambridge ARR = average profit / average investment × 100; average profit = (total inflows − outlay − residual 0) / years; average investment = outlay / 2 (no residual values are set). */
  arr(outlay, flows) {
    const avgProfit = (flows.reduce((s, x) => s + x, 0) - outlay) / flows.length;
    return (avgProfit / (outlay / 2)) * 100;
  },
  /** Discount factor, exact or rounded to dp decimal places (tables supplied in questions use 3). */
  df: (ratePct, year, dp) => (dp === undefined ? 1 / (1 + ratePct / 100) ** year : roundTo(1 / (1 + ratePct / 100) ** year, dp)),
  /** NPV with factors rounded to dp (default 3, as a supplied table). */
  npv(ratePct, outlay, flows, { dp = 3 } = {}) {
    return flows.reduce((s, f, i) => s + f * invest.df(ratePct, i + 1, dp), 0) - outlay;
  },
  /** IRR by bisection on the exact (unrounded) NPV, in per cent. */
  irr(outlay, flows) {
    const f = (r) => flows.reduce((s, x, i) => s + x / (1 + r) ** (i + 1), 0) - outlay;
    let lo = -0.99;
    let hi = 10;
    if (f(lo) * f(hi) > 0) return null;
    for (let i = 0; i < 200; i += 1) {
      const mid = (lo + hi) / 2;
      if (f(lo) * f(mid) <= 0) hi = mid; else lo = mid;
    }
    return ((lo + hi) / 2) * 100;
  },
  /** IRR by linear interpolation between two trial rates (the method examiners use): low + (npvLow / (npvLow − npvHigh)) × (high − low). */
  irrInterpolated: (lowPct, highPct, npvLow, npvHigh) => lowPct + (npvLow / (npvLow - npvHigh)) * (highPct - lowPct),
};

// ---- Partnerships, goodwill, companies
/**
 * Appropriation account. partners: [{ name, salary?, capital?, interestOnCapitalPct?, drawings?, interestOnDrawingsPct?, share (e.g. 3 for 3:2) }].
 * Returns { profit, lines: per partner { salary, interestOnCapital, interestOnDrawings, residualShare, total }, residual }
 * and throws unless the amounts credited to the partners add up to the profit.
 */
export function appropriation({ profit, partners }) {
  const shareTotal = partners.reduce((s, p) => s + p.share, 0);
  const lines = partners.map((p) => ({
    name: p.name,
    salary: p.salary ?? 0,
    interestOnCapital: ((p.capital ?? 0) * (p.interestOnCapitalPct ?? 0)) / 100,
    interestOnDrawings: ((p.drawings ?? 0) * (p.interestOnDrawingsPct ?? 0)) / 100,
  }));
  const fixed = lines.reduce((s, l) => s + l.salary + l.interestOnCapital - l.interestOnDrawings, 0);
  const residual = profit - fixed;
  lines.forEach((l, i) => {
    l.residualShare = (residual * partners[i].share) / shareTotal;
    l.total = l.salary + l.interestOnCapital - l.interestOnDrawings + l.residualShare;
  });
  check("appropriation: partners' totals equal the profit", lines.reduce((s, l) => s + l.total, 0), profit);
  return { profit, lines, residual };
}
export const goodwill = {
  /** Goodwill as a multiple of average profits. */
  averageProfits: (profits, multiple) => (profits.reduce((s, x) => s + x, 0) / profits.length) * multiple,
  /** Super-profits = average profit − normal return on net assets; goodwill = super-profits × number of years' purchase. */
  superProfits: (avgProfit, netAssets, normalReturnPct, years) => (avgProfit - (netAssets * normalReturnPct) / 100) * years,
  /** Sacrifice/gain: old ratio and new ratio as arrays of fractions → gain(+)/sacrifice(−) per partner = new − old. */
  gainSacrifice: (oldShares, newShares) => {
    const so = oldShares.reduce((a, b) => a + b, 0);
    const sn = newShares.reduce((a, b) => a + b, 0);
    return oldShares.map((o, i) => newShares[i] / sn - o / so);
  },
};
export const company = {
  /** Issue of shares: { capital (nominal), premium, cash }. */
  shareIssue: ({ shares, par, issuePrice }) => ({ capital: shares * par, premium: shares * (issuePrice - par), cash: shares * issuePrice }),
  /** Bonus issue of `newPerOld[0]` new shares for every `newPerOld[1]` held: new shares and the amount taken from reserves at par. */
  bonusIssue: ({ held, newPerOld, par }) => {
    const newShares = (held * newPerOld[0]) / newPerOld[1];
    return { newShares, fromReserves: newShares * par };
  },
  /** Rights issue of `newPerOld[0]` new shares for every `newPerOld[1]` held at `price`. */
  rightsIssue: ({ held, newPerOld, par, price }) => {
    const newShares = (held * newPerOld[0]) / newPerOld[1];
    return { newShares, capital: newShares * par, premium: newShares * (price - par), cash: newShares * price };
  },
};
