// Authoring helpers for accounting-o questions and flashcards (adapted from .scratch/english/lib.mjs, numeric builders
// from .scratch/combined-science/lib.mjs). Concept modules call concept(...) with a builder; build-content.mjs writes
// the JSON files. LaTeX is rarely needed (write it with t`...`); money in Markdown is ALWAYS US\$ — in a JS string write
// "US\\$" (or use money(n) / the table helpers below, which do it for you). Never a bare $ before a number.
export const t = String.raw;

// Selectors for `applies` (an item is tagged only to the syllabi it names). Omit applies for content valid for both.
export const ZIM = ["zimsec"];
export const CAM = ["cambridge/igcse/accounting"];

const OPTION_KEYS = ["A", "B", "C", "D", "E", "F"];
const DEFAULT_NORMALISE = ["trim", "lowercase", "collapse_whitespace", "strip_punctuation"];

// ---------------------------------------------------------------------------------------------------------------------
// Numeric answers. kind sets the answer-box decoration and the default tolerance:
//   money: prefix "US$"; tolerance 0 for whole dollars, 0.005 for cents (so 1250 and 1,250.00 both score).
//   pct:   unit hint "%"; tolerance half a unit in the last of `dp` decimal places (dp default 1 → ±0.05).
//   ratio: unit hint ": 1" (the student types the x of x : 1); dp default 2 → ±0.005.
//   days / times: unit hint "days" / "times"; dp default 0 → ±0.5 (whole days); give dp: 1 for 1 d.p. answers.
//   plain (default): no decoration; tolerance 0 for integers unless `tol` is given.
// The value must be the EXACT computed value (compute it in code); the model response is the correctly rounded one.
// The engine strips the prefix / unit hint if a student types them; no unit is ever required.
const KINDS = {
  money: { prefix: "US$" },
  pct: { unitHint: "%", dp: 1 },
  ratio: { unitHint: ": 1", dp: 2 },
  days: { unitHint: "days", dp: 0 },
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
// Accounting layouts with built-in arithmetic checks. Every helper returns Markdown with a single backslash in US\$,
// which is correct both pasted into a lesson .md file and inside a JSON string (JSON.stringify doubles it). They THROW
// when the figures do not add up, so a table that renders is a table that balances. To print one for a lesson, write a
// small script in .scratch/accounting/tables/<prefix>-<name>.mjs (NOT in slices/: every .mjs there is imported by the build)
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

