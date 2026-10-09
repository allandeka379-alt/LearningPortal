// Authoring helpers for religious-studies-o (ZIMSEC O-Level Family and Religious Studies) questions and flashcards
// (adapted from .scratch/heritage-studies/lib.mjs, itself from .scratch/history/lib.mjs and .scratch/english/lib.mjs).
// Concept modules call concept(...) with a builder; build-content.mjs writes the JSON files. Strings are plain JSON
// text: there is no LaTeX in this subject, but a literal dollar sign must be written US\$ (in a normal JS string) so it
// is not read as maths. Helpers at the end: source(), sources(), table(), timeline(), levels(), ref() (scripture
// references), and the exam-format mark plans (EXAM) with checkExam().

// Selector for `applies`. The family has one syllabus (ZIMSEC O-Level Family and Religious Studies 2015-2022), so every item is
// tagged to it anyway: writers normally omit `applies`; the EXAM plans carry ZIM for clarity.
export const ZIM = ["zimsec"];

const OPTION_KEYS = ["A", "B", "C", "D", "E", "F"];
const DEFAULT_NORMALISE = ["trim", "lowercase", "collapse_whitespace", "strip_punctuation"];

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
      const part = { type: "STRUCTURED", stem: o.stem, marks: parts.reduce((s, p) => s + p.part.marks, 0) };
      // Reserved totals belong to the exam-format items only (BRIEF.md); those must match an EXAM plan.
      if (RESERVED_MARKS.includes(part.marks)) {
        const plan = Object.values(EXAM).find((p) => p.total === part.marks && p.skill === o.skill && JSON.stringify(p.marks) === JSON.stringify(parts.map((x) => x.part.marks)));
        if (!o.examStyle || !plan) throw new Error(`${keyPrefix}: a STRUCTURED item worth ${part.marks} marks must be an exam-format item (examStyle, skill and parts as in EXAM)`);
      }
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
// Family and Religious Studies helpers.

/**
 * An ORIGINAL source for a question, as Markdown: a bold label line saying what it is and that it was written for the
 * question, then the text as a block quote. kind describes the (fictional or anonymous) origin, e.g. "a letter written
 * by a fictional villager in Masvingo Province, 2026" or "a poster (described in words) of the kind used in a clean-up
 * campaign". NEVER attribute invented words to a real, named person; never present an invented source as a
 * real document. `described: true` for a visual source: the text then describes the picture in words.
 */
export function source(label, kind, text, { described = false } = {}) {
  if (!/^Source [A-Z]$/.test(label)) throw new Error(`source label "${label}" should look like "Source A"`);
  if (!kind || !text) throw new Error(`${label}: kind and text are required`);
  const tag = described ? "described in words; invented for this question" : "invented for this question";
  const body = text.trim().split("\n").map((l) => `> ${l}`).join("\n");
  return `**${label}** — ${kind} (${tag})\n\n${body}`;
}

/** Several sources joined with blank lines. Labels must run A, B, C ... in order (at most seven). */
export function sources(list) {
  if (list.length > 7) throw new Error("at most seven sources per question");
  list.forEach((s, i) => {
    const want = `**Source ${String.fromCharCode(65 + i)}**`;
    if (!s.startsWith(want)) throw new Error(`sources(): item ${i + 1} should start with ${want}`);
  });
  return list.join("\n\n");
}

/** Markdown table from headers and rows (cells are strings or numbers). */
export function table(headers, rows) {
  for (const r of rows) if (r.length !== headers.length) throw new Error(`table row has ${r.length} cells, expected ${headers.length}`);
  const esc = (c) => String(c).replace(/\|/g, "\|");
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
 * Levels of response for a self-marked evaluative part (our wording, in the style of both boards' level mark
 * schemes). Returns [level, min, max, descriptor] rows for P.manual({ levels }). Fixed bands for 6, 8, 10, 12, 16 and
 * 24 marks (the Paper 2 Section B essay part (b) is 12); thirds otherwise.
 */
export function levels(total) {
  const D = {
    top: "Developed explanation of several relevant points or arguments, supported by accurate, specific knowledge and examples, considering more than one side and reaching a supported judgement that answers the question.",
    upper: "Developed explanation of some factors or arguments with relevant supporting detail; a judgement is attempted but is only partly supported, or the other side is thin.",
    middle: "Some explanation of one or two relevant factors, or several points described with limited explanation; little or no judgement.",
    lower: "Simple, general or narrative statements with limited relevance to the question; little explanation.",
    basic: "One or two relevant but undeveloped points.",
    none: "Nothing creditworthy.",
  };
  const bands = {
    6: [[4, 5, 6, D.top], [3, 3, 4, D.middle], [2, 2, 2, D.lower], [1, 1, 1, D.basic], [0, 0, 0, D.none]],
    8: [[4, 7, 8, D.top], [3, 5, 6, D.upper], [2, 3, 4, D.middle], [1, 1, 2, D.lower], [0, 0, 0, D.none]],
    10: [[5, 10, 10, D.top], [4, 7, 9, D.upper], [3, 4, 6, D.middle], [2, 2, 3, D.lower], [1, 1, 1, D.basic], [0, 0, 0, D.none]],
    12: [[4, 10, 12, D.top], [3, 7, 9, D.upper], [2, 4, 6, D.middle], [1, 1, 3, D.lower], [0, 0, 0, D.none]],
    16: [[5, 14, 16, D.top], [4, 10, 13, D.upper], [3, 6, 9, D.middle], [2, 3, 5, D.lower], [1, 1, 2, D.basic], [0, 0, 0, D.none]],
    24: [[5, 21, 24, D.top], [4, 15, 20, D.upper], [3, 9, 14, D.middle], [2, 4, 8, D.lower], [1, 1, 3, D.basic], [0, 0, 0, D.none]],
  };
  if (bands[total]) return bands[total];
  if (total < 4) throw new Error("levels(): use point marking below 4 marks");
  const l1 = Math.max(1, Math.round(total / 3));
  const l2 = Math.max(l1 + 1, Math.round((2 * total) / 3));
  return [[3, l2 + 1, total, D.top], [2, l1 + 1, l2, D.middle], [1, 1, l1, D.lower], [0, 0, 0, D.none]];
}

/**
 * Exam-format plans (see BRIEF.md, exam-format table). Each gives the part labels, marks, total, skill and applies for
 * the question builder; `checkExam(plan, parts)` throws when a STRUCTURED item's parts do not match its plan. The
 * paper structure and part marks are OUR CONVENTION (the only source read is the Ministry Teacher's Guide, which prints
 * no paper structure): a reviewer checks them against the syllabus assessment section and recent ZIMSEC papers.
 *   ZIM_P1  Paper 1 (Religions, topics 1-5) structured essay question: (a) describe/outline 15 (tickable points),
 *           (b) explain the significance / lessons / relevance today 10 (levels(10)). ANALYSIS.
 *   ZIM_P2  Paper 2 (Contemporary issues, topics 6-15) structured essay question: (a) describe/explain 15 (points),
 *           (b) discuss / assess / "how far" from more than one religious perspective 10 (levels(10)). EVALUATION.
 */
export const EXAM = {
  ZIM_P1: { labels: ["(a)", "(b)"], marks: [15, 10], total: 25, skill: "ANALYSIS", applies: ZIM, secs: 2100 },
  ZIM_P2: { labels: ["(a)", "(b)"], marks: [15, 10], total: 25, skill: "EVALUATION", applies: ZIM, secs: 2100 },
};
export function checkExam(plan, parts) {
  const labels = parts.map((p) => p.part.label);
  const marks = parts.map((p) => p.part.marks);
  if (JSON.stringify(labels) !== JSON.stringify(plan.labels) || JSON.stringify(marks) !== JSON.stringify(plan.marks)) {
    throw new Error(`exam item parts ${JSON.stringify(labels)} ${JSON.stringify(marks)} do not match the plan ${JSON.stringify(plan.labels)} ${JSON.stringify(plan.marks)}`);
  }
  return parts;
}

/** Practice STRUCTURED items must avoid the reserved total (25: the Paper 1 and Paper 2 exam-format items). */
export const RESERVED_MARKS = [25];

/**
 * Scripture reference in the house style: ref("Genesis", 12, "1-3") -> "Genesis 12:1-3"; ref("Qur'an", 2, 255) ->
 * "Qur'an 2:255" (surah:ayah); ref("Exodus", 20) -> "Exodus 20". Book names are checked against a list so spellings
 * stay consistent; references are cited and PARAPHRASED, never quoted at length.
 */
const BOOKS = new Set([
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel",
  "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther", "Job", "Psalm", "Psalms",
  "Proverbs", "Ecclesiastes", "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos",
  "Jonah", "Micah", "Malachi", "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians",
  "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy",
  "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "Revelation", "Qur'an",
]);
export function ref(book, chapter, verses) {
  if (!BOOKS.has(book)) throw new Error(`ref(): unknown book "${book}" (add it to BOOKS in lib.mjs only if it is right; report it)`);
  if (!Number.isInteger(chapter) || chapter < 1) throw new Error(`ref(): bad chapter ${chapter} for ${book}`);
  if (book === "Qur'an" && chapter > 114) throw new Error("ref(): the Qur'an has 114 surahs");
  return verses === undefined ? `${book} ${chapter}` : `${book} ${chapter}:${verses}`;
}
