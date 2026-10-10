// Authoring helpers for history-a questions and flashcards (adapted from .scratch/history/lib.mjs, with the sub-part
// support of .scratch/biology-a/lib.mjs). Concept modules call concept(...) with a builder; build-content.mjs writes the
// JSON files. Strings are plain JSON text: there is no LaTeX in history content, but a literal dollar sign must be
// written US\$ (in a normal JS string) so it is not read as maths. There is NO String.raw helper in this kit: write real
// line breaks (a template literal with an actual new line), never a typed backslash-n, which would show on screen as
// those two characters (the builder refuses it; .scratch/tools/literal-newlines.mjs checks the built files too).
// History helpers at the end: source(), sources(), paper1Sources(), extract(), table(), timeline(), levels(), and the
// exam-format mark plans (EXAM).

// Selectors for `applies` (an item is tagged only to the syllabi it names). Omit `applies` for items that suit both.
// For a concept covered by only one syllabus, `applies` changes nothing (the item can only be tagged there).
export const ZIM = ["zimsec"];
export const CAM = ["cambridge/a-level/history"];

const OPTION_KEYS = ["A", "B", "C", "D", "E", "F"];
const DEFAULT_NORMALISE = ["trim", "lowercase", "collapse_whitespace", "strip_punctuation"];
const PART_LABEL = /^\((?:[a-z]{1,2}|[ivx]{1,6}|\d{1,2})\)$/;
const LITERAL_BACKSLASH_N = /\\n(?![a-z])/;
function assertNoLiteralNewlines(value, where) {
  if (typeof value === "string") {
    if (LITERAL_BACKSLASH_N.test(value)) throw new Error(`${where}: a typed backslash-n in text (use a real line break): ${value.slice(0, 60)}`);
  } else if (Array.isArray(value)) value.forEach((v) => assertNoLiteralNewlines(v, where));
  else if (value && typeof value === "object") Object.values(value).forEach((v) => assertNoLiteralNewlines(v, where));
}

/** Part builders (used inside struct parts and to build top-level questions). Each returns { part, model, wrong[] }. */
export const P = {
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
   * A part with sub-parts: P.group({ label: "(b)", stem, parts: [P.mcq({ label: "(i)", ... }), ...] }). One level only; its
   * marks are the sum of the sub-parts. Responses are keyed "(b)(i)". (Items may instead use "(1)" ... with sub-parts
   * "(a)" ...; never labels like "1(a)", which the validator rejects.)
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
    const { d, marks, secs, skill, daily, examStyle, access, concepts, hints, explanation, conceptSummary, paper, workedSolution } = opts;
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
    if (workedSolution) q.workedSolution = workedSolution;
    if (conceptSummary) q.conceptSummary = conceptSummary;
    if (hints ?? built.part.hints) q.hints = hints ?? built.part.hints;
    if (built.model) q.modelResponse = built.model;
    if (built.wrong?.length) q.wrongResponses = built.wrong;
    q.skill = skill ?? "APPLICATION";
    if (daily) q.dailyEligible = true;
    if (examStyle) q.examStyle = true;
    if (applies) q.applies = applies;
    if (paper) q.paper = paper;
    if (access) q.access = access;
    assertNoLiteralNewlines(q, q.key);
    if (RESERVED_MARKS.includes(m)) {
      // Reserved totals belong to the exam-format items only (BRIEF.md): type, marks and skill must match an EXAM plan.
      const plan = Object.values(EXAM).find((p) => p.type === q.type && p.total === m && p.skill === q.skill);
      if (!examStyle || !plan) throw new Error(`${q.key}: an item worth ${m} marks must be an exam-format item (examStyle, type and skill as in EXAM)`);
    }
    if (!q.explanation) throw new Error(`${q.key}: explanation required`);
    if (d >= 3 && !q.hints) throw new Error(`${q.key}: difficulty ${d} needs hints`);
    if (daily && (d < 2 || d > 3)) throw new Error(`${q.key}: daily questions need difficulty 2-3`);
    questions.push(q);
    return q;
  }

  const b = {
    mcq: (o) => finish(P.mcq(o), o),
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
        if (!PART_LABEL.test(p.part.label ?? "")) throw new Error(`struct "${o.stem.slice(0, 40)}": bad part label ${p.part.label} (use (a), (b) ... or (1), (2) ...)`);
        if (labels.has(p.part.label)) throw new Error(`struct: duplicate part label ${p.part.label}`);
        labels.add(p.part.label);
        for (const s of p.subs ?? []) if (!PART_LABEL.test(s.label ?? "")) throw new Error(`struct: bad sub-part label ${s.label} in ${p.part.label}`);
      }
      const part = { type: "STRUCTURED", stem: o.stem, marks: parts.reduce((s, p) => s + p.part.marks, 0) };
      // Reserved totals belong to the exam-format items only (BRIEF.md); those must match an EXAM plan.
      if (RESERVED_MARKS.includes(part.marks)) {
        const plan = Object.values(EXAM).find((p) => p.type === "STRUCTURED" && p.total === part.marks && p.skill === o.skill && JSON.stringify(p.marks) === JSON.stringify(parts.map((x) => x.part.marks)) && JSON.stringify(p.labels) === JSON.stringify(parts.map((x) => x.part.label)));
        if (!o.examStyle || !plan) throw new Error(`${keyPrefix}: a STRUCTURED item worth ${part.marks} marks must be an exam-format item (examStyle, skill and parts as in EXAM)`);
      }
      const q = finish({ part, model: null, wrong: [] }, { ...o, marks: part.marks });
      const modelParts = {};
      const wrongParts = {};
      for (const p of parts) {
        if (p.subs) {
          for (const sp of p.subs) {
            if (sp.model) modelParts[`${p.part.label}${sp.label}`] = sp.model;
            if (sp.wrong[0]) wrongParts[`${p.part.label}${sp.label}`] = sp.wrong[0];
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
      for (const k of ["skill", "dailyEligible", "examStyle", "applies", "paper", "access"]) {
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
// History helpers.

/**
 * An ORIGINAL source for a question, as Markdown: a bold label line saying what it is and that it was written for the
 * question, then the text as a block quote. kind describes the (fictional or anonymous) origin, e.g. "a letter written
 * by a fictional settler in Bulawayo, 1896" or "a cartoon (described in words) of the kind published in British
 * newspapers in 1919". NEVER attribute invented words to a real, named person; never present an invented source as a
 * real document. `described: true` for a visual source: the text then describes the picture in words.
 */
export function source(label, kind, text, { described = false } = {}) {
  if (!/^Source [A-Z]$/.test(label)) throw new Error(`source label "${label}" should look like "Source A"`);
  if (!kind || !text) throw new Error(`${label}: kind and text are required`);
  const tag = described ? "described in words; invented for this question" : "invented for this question";
  const body = text.trim().split("\n").map((l) => `> ${l}`).join("\n");
  return `**${label}** — ${kind} (${tag})\n\n${body}`;
}

/** Several sources joined with blank lines. Labels must run A, B, C ... in order (at most seven, as in 0470 Paper 2). */
export function sources(list) {
  if (list.length > 7) throw new Error("at most seven sources per question");
  list.forEach((s, i) => {
    const want = `**Source ${String.fromCharCode(65 + i)}**`;
    if (!s.startsWith(want)) throw new Error(`sources(): item ${i + 1} should start with ${want}`);
  });
  return list.join("\n\n");
}

/** The four sources of a Cambridge Paper 1 question: exactly four, at least three written, at most one visual (described in words), 600 words in total at most. */
export function paper1Sources(list) {
  if (list.length !== 4) throw new Error("a Paper 1 question has exactly four sources");
  const visual = list.filter((s) => s.includes("described in words")).length;
  if (visual > 1) throw new Error("at most one visual source in a Paper 1 question");
  const words = list.map((s) => s.split("\n").filter((l) => l.startsWith(">")).join(" ").split(/\s+/).filter(Boolean).length).reduce((a, b) => a + b, 0);
  if (words > 600) throw new Error(`the four sources total ${words} words (limit 600)`);
  return sources(list);
}

/**
 * The extract of a Cambridge Paper 3 question: an ORIGINAL passage written in the style of a historian's writing, at most
 * 600 words, unattributed (no author, title or date of a real work) and labelled as invented. Never a real historian's
 * words. Returns Markdown: a bold label line and the passage as a block quote.
 */
export function extract(text) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  if (words > 600) throw new Error(`the extract has ${words} words (limit 600)`);
  const body = text.trim().split("\n").map((l) => `> ${l}`).join("\n");
  return `**Extract** — a passage written in the style of a historian's work (invented for this question; not the words of any real historian)\n\n${body}`;
}

/** Markdown table from headers and rows (cells are strings or numbers). */
export function table(headers, rows) {
  for (const r of rows) if (r.length !== headers.length) throw new Error(`table row has ${r.length} cells, expected ${headers.length}`);
  const esc = (c) => String(c).replace(/\|/g, "\\|");
  return [`| ${headers.map(esc).join(" | ")} |`, `|${headers.map(() => "---").join("|")}|`, ...rows.map((r) => `| ${r.map(esc).join(" | ")} |`)].join("\n");
}

/**
 * Chronology table [[year or "1893-94", event], ...]. Checks the events are in order of their first year, so a timeline
 * (and any ordering question built from it) cannot be shuffled by mistake. Returns { md, events }.
 */
export function timeline(events, { headers = ["Date", "Event"] } = {}) {
  const first = (d) => {
    const m = String(d).match(/(\d{3,4})/);
    if (!m) throw new Error(`timeline: no year in "${d}"`);
    return Number(m[1]);
  };
  for (let i = 1; i < events.length; i++) {
    if (first(events[i][0]) < first(events[i - 1][0])) throw new Error(`timeline out of order at "${events[i][0]}"`);
  }
  return { md: table(headers, events), events };
}

/**
 * Levels of response for a self-marked evaluative part (our wording, in the style of both boards' level mark schemes;
 * Cambridge's own grids are in its specimen mark schemes and a reviewer must compare). Returns [level, min, max,
 * descriptor] rows for P.manual({ levels }). `kind`: "argument" (default: explanation and judgement, used for ZIMSEC
 * essays, Cambridge Paper 2 and Paper 4), "sources" (Paper 1 part (b): use of all sources and knowledge to support and
 * challenge a statement) or "interpretation" (Paper 3: interpretation and approach of an extract). Fixed bands for the
 * small sizes (6, 8, 10, 16, 24); five proportional levels for 15, 20, 25, 30 and 40; thirds otherwise.
 */
export function levels(total, kind = "argument") {
  const SETS = {
    argument: {
      top: "Developed, well-supported explanation of several relevant factors or arguments, using accurate and specific knowledge, weighing them against each other and against alternative views, with a sustained line of argument and a supported judgement that answers the question.",
      upper: "Developed explanation of some factors or arguments with relevant supporting detail; balance is attempted and a judgement is reached, but it is only partly supported or the other side is thin.",
      middle: "Some explanation of one or two relevant factors, or several points described with limited explanation; limited balance and little or no judgement.",
      lower: "Simple, general or narrative statements with limited relevance to the question; little explanation.",
      basic: "One or two relevant but undeveloped points.",
    },
    sources: {
      top: "Uses all four sources, interpreting each in context and weighing their provenance, to show how far they support and how far they challenge the statement, with accurate own knowledge used to test them, and reaches a supported judgement about the extent of support.",
      upper: "Uses all four sources to support and to challenge the statement, with some use of provenance and own knowledge; a judgement about the extent is reached but only partly supported.",
      middle: "Uses most sources, mainly for support or for challenge; some inference and some own knowledge; limited weighing and little judgement.",
      lower: "Describes or paraphrases the sources, or uses own knowledge without the sources; little link to the statement.",
      basic: "Copies or summarises a source with little relevance to the statement.",
    },
    interpretation: {
      top: "Identifies the main interpretation of the extract as a whole and the historian's approach (the questions asked, assumptions and ideology), explains how the extract shows them with specific reference to it, and tests and explains them with accurate, detailed own knowledge of the topic.",
      upper: "Identifies the interpretation and some features of the approach with references to the extract, supported by relevant knowledge, but with less explanation of how the approach shapes the interpretation.",
      middle: "Identifies parts of the extract's message and gives some knowledge, with limited analysis of interpretation or approach.",
      lower: "Summarises the extract or describes the events with little analysis of the historian's interpretation.",
      basic: "A few relevant statements about the extract or the topic.",
    },
  };
  const D = SETS[kind];
  if (!D) throw new Error(`levels(): unknown kind ${kind}`);
  const none = "Nothing creditworthy.";
  const fixed = {
    6: [[4, 5, 6, D.top], [3, 3, 4, D.middle], [2, 2, 2, D.lower], [1, 1, 1, D.basic], [0, 0, 0, none]],
    8: [[4, 7, 8, D.top], [3, 5, 6, D.upper], [2, 3, 4, D.middle], [1, 1, 2, D.lower], [0, 0, 0, none]],
    10: [[5, 10, 10, D.top], [4, 7, 9, D.upper], [3, 4, 6, D.middle], [2, 2, 3, D.lower], [1, 1, 1, D.basic], [0, 0, 0, none]],
    16: [[5, 14, 16, D.top], [4, 10, 13, D.upper], [3, 6, 9, D.middle], [2, 3, 5, D.lower], [1, 1, 2, D.basic], [0, 0, 0, none]],
    24: [[5, 21, 24, D.top], [4, 15, 20, D.upper], [3, 9, 14, D.middle], [2, 4, 8, D.lower], [1, 1, 3, D.basic], [0, 0, 0, none]],
  };
  if (fixed[total]) return fixed[total];
  if ([15, 20, 25, 30, 40].includes(total)) {
    const c = [0.2, 0.45, 0.65, 0.85].map((x) => Math.round(total * x));
    return [[5, c[3] + 1, total, D.top], [4, c[2] + 1, c[3], D.upper], [3, c[1] + 1, c[2], D.middle], [2, c[0] + 1, c[1], D.lower], [1, 1, c[0], D.basic], [0, 0, 0, none]];
  }
  if (total < 4) throw new Error("levels(): use point marking below 4 marks");
  const l1 = Math.max(1, Math.round(total / 3));
  const l2 = Math.max(l1 + 1, Math.round((2 * total) / 3));
  return [[3, l2 + 1, total, D.top], [2, l1 + 1, l2, D.middle], [1, 1, l1, D.lower], [0, 0, 0, none]];
}

/**
 * Exam-format plans (see BRIEF.md, exam-format table). `type`, `total` and `skill` identify the item for the mocks;
 * STRUCTURED plans also fix the part labels and marks, which checkExam(plan, parts) enforces. ESSAY plans are single
 * self-marked answers (points that add up to the marks, `levels`, a model answer).
 */
export const EXAM = {
  /** ZIMSEC Paper 1 and Paper 2: one 25-mark essay question (candidates answer four of the offered questions in 3 hours). */
  ZIM_ESSAY: { type: "ESSAY", total: 25, skill: "EVALUATION", applies: ZIM, secs: 2700 },
  /** Cambridge Paper 1: four invented sources; (a) compare two sources 15, (b) how far do the sources support a statement 25. */
  CAM_P1: { type: "STRUCTURED", labels: ["(a)", "(b)"], marks: [15, 25], total: 40, skill: "ANALYSIS", applies: CAM, secs: 4500 },
  /** Cambridge Paper 2: (a) explain why 10, (b) a balanced judgement between given and alternative perspectives 20. */
  CAM_P2: { type: "STRUCTURED", labels: ["(a)", "(b)"], marks: [10, 20], total: 30, skill: "EVALUATION", applies: CAM, secs: 3150 },
  /** Cambridge Paper 3: one 40-mark question on an invented, unattributed extract (interpretation and approach). */
  CAM_P3: { type: "ESSAY", total: 40, skill: "ANALYSIS", applies: CAM, secs: 4500 },
  /** Cambridge Paper 4: one 30-mark 'Assess' or 'Evaluate' question. */
  CAM_P4: { type: "ESSAY", total: 30, skill: "EVALUATION", applies: CAM, secs: 3150 },
};

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

/** Totals reserved for the exam-format items above; practice items use 6, 8, 12, 14 or 16 marks (single parts 1-6). */
export const RESERVED_MARKS = [25, 30, 40];
