// Builds the english-language-o topic tests and mock exams (content/subjects/english-language-o/assessments/**) for
// the three syllabi and checks every rule against the bank each syllabus sees: each rule needs at least `count`
// candidates after earlier rules have taken theirs (the validator's "guaranteed" condition).
// Inputs: .scratch/english/inventory.json (npx tsx --conditions=react-server .scratch/english/inventory.ts
// .scratch/english/inventory.json) and the syllabus files.
// Run: node .scratch/english/build-assessments.mjs [--report] [--write]
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const INV = JSON.parse(fs.readFileSync(path.join(ROOT, ".scratch/english/inventory.json"), "utf8"));
const SYLLABI = {
  zim: { ref: "zimsec/o-level/english-language", version: "2015-2022", short: "ZIMSEC O-Level English Language" },
  fle: { ref: "cambridge/igcse/english-language", version: "2027-2029", short: "Cambridge IGCSE First Language English (0500)" },
  esl: { ref: "cambridge/igcse/english-second-language", version: "2027-2029", short: "Cambridge IGCSE English as a Second Language (0510)" },
};
for (const s of Object.values(SYLLABI)) {
  s.file = JSON.parse(fs.readFileSync(path.join(ROOT, `content/syllabi/${s.ref}/${s.version}.json`), "utf8"));
  s.inv = INV[`${s.ref}/${s.version}`] ?? [];
  s.nodes = new Map();
  const walk = (n) => {
    s.nodes.set(n.key, n);
    (n.children ?? []).forEach(walk);
  };
  s.file.topics.forEach(walk);
}

const problems = [];
const report = [];

/** Candidate questions of a rule, as the validator filters them (PREMIUM tests accept every access tier). */
function pool(s, rule) {
  const topic = rule.topics[0];
  if (!s.nodes.has(topic)) throw new Error(`${s.ref}: unknown node ${topic}`);
  return s.inv.filter((r) => {
    if (!r.lineages.some((l) => l.includes(topic))) return false;
    const [lo, hi] = rule.difficulty ?? [1, 5];
    if (r.difficulty < lo || r.difficulty > hi) return false;
    if (rule.type && r.type !== rule.type) return false;
    if (rule.marksPerQuestion && r.marks !== rule.marksPerQuestion) return false;
    if (rule.examStyleOnly && !r.examStyle) return false;
    return true;
  });
}

function checkAssessment(s, a) {
  const rules = a.sections.flatMap((sec, si) => sec.rules.map((rule, ri) => ({ rule, label: `s${si + 1}r${ri + 1}` })));
  const sets = rules.map(({ rule }) => new Set(pool(s, rule).map((r) => r.key)));
  rules.forEach(({ rule, label }, i) => {
    let mayBeTaken = 0;
    for (let j = 0; j < i; j += 1) {
      let overlap = 0;
      for (const k of sets[j]) if (sets[i].has(k)) overlap += 1;
      mayBeTaken += Math.min(rules[j].rule.count, overlap);
    }
    const n = sets[i].size;
    const desc = `${a.key}@${s.ref} ${label} ${rule.topics[0]} n=${rule.count} m=${rule.marksPerQuestion ?? "*"} d=${(rule.difficulty ?? [1, 5]).join("-")}${rule.type ? " " + rule.type : ""}${rule.examStyleOnly ? " exam" : ""}`;
    report.push(`${desc} -> pool ${n}${mayBeTaken ? ` (overlap ${mayBeTaken})` : ""}`);
    if (n < rule.count) problems.push(`${desc}: needs ${rule.count}, pool ${n}`);
    else if (n - mayBeTaken < rule.count) problems.push(`${desc}: not guaranteed (pool ${n}, earlier rules may take ${mayBeTaken})`);
  });
}
const sectionMarks = (sec) => (sec.answerCount ? sec.marks : sec.rules.reduce((u, r) => u + r.count * r.marksPerQuestion, 0));
const marksOf = (a) => a.sections.reduce((t, sec) => t + sectionMarks(sec), 0);
const countOf = (a) => a.sections.reduce((t, sec) => t + sec.rules.reduce((u, r) => u + r.count, 0), 0);
const list = (items) => (items.length <= 1 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`);

// ---------------------------------------------------------------------------------------------------------------------
// Topic tests: 20 marks in 25 minutes.
//   Section A: one-mark questions (difficulty 1-3) spread over the units (child nodes or the listed topics).
//   Section B: one medium question (2-4 marks) and one longer question (5-12 marks; self-marked writing is allowed),
//              with different marks so the two rules never compete.
// ---------------------------------------------------------------------------------------------------------------------
function spreadOnes(s, unitKeys, n1) {
  const one = (key, count) => ({ topics: [key], count, difficulty: [1, 3], marksPerQuestion: 1 });
  const pools = unitKeys.map((key) => ({ key, n: pool(s, one(key, 1)).length })).filter((p) => p.n > 0);
  if (pools.length > n1) {
    pools.sort((a, b) => b.n - a.n);
    pools.length = n1;
  }
  const alloc = new Map(pools.map((p) => [p.key, 1]));
  let left = n1 - pools.length;
  for (let guard = 0; left > 0 && guard < 10000; guard += 1) {
    const order = [...pools].sort((a, b) => b.n / alloc.get(b.key) - a.n / alloc.get(a.key));
    const p = order[0];
    if (alloc.get(p.key) >= Math.floor(p.n / 2)) break;
    alloc.set(p.key, alloc.get(p.key) + 1);
    left -= 1;
  }
  if (left > 0) throw new Error(`${s.ref} ${unitKeys.join(",")}: cannot spread ${n1} one-mark questions`);
  return unitKeys.filter((k) => alloc.has(k)).map((k) => one(k, alloc.get(k)));
}

function sectionB(s, nodes, total, minOnes) {
  const options = [];
  for (const medNode of nodes) {
    for (const m of [2, 3, 4]) {
      const med = { topics: [medNode], count: 1, difficulty: [2, 4], marksPerQuestion: m };
      const nMed = pool(s, med).length;
      if (nMed < 1) continue;
      for (const longNode of nodes) {
        for (const l of [5, 6, 8, 10, 12]) {
          const long = { topics: [longNode], count: 1, difficulty: [3, 5], marksPerQuestion: l };
          const nLong = pool(s, long).length;
          if (nLong < 1) continue;
          const n1 = total - m - l;
          if (n1 < minOnes) continue;
          let score = Math.min(Math.log2(nMed + 1), 3) + Math.min(Math.log2(nLong + 1), 3) * 1.5;
          if (medNode !== longNode) score += 0.5;
          if (l === 5 || l === 6) score += 0.8;
          score -= Math.abs(n1 - 12) * 0.25;
          options.push({ med, long, n1, score });
        }
      }
    }
  }
  options.sort((a, b) => b.score - a.score);
  return options[0] ?? null;
}

function topicTest(s, spec) {
  const unitKeys = spec.units ?? ((s.nodes.get(spec.topics[0]).children ?? []).map((c) => c.key).length ? (s.nodes.get(spec.topics[0]).children ?? []).map((c) => c.key) : spec.topics);
  const b = sectionB(s, [...new Set([...spec.topics, ...unitKeys])], 20, Math.min(unitKeys.length, 8));
  const total = 20;
  const n1 = b ? b.n1 : total;
  const ones = spreadOnes(s, unitKeys, n1);
  const sections = [{ title: "Section A: short questions", instructions: "Each question is worth 1 mark.", rules: ones }];
  if (b) {
    sections.push({
      title: "Section B: longer questions",
      instructions: `These questions are worth ${b.med.marksPerQuestion} and ${b.long.marksPerQuestion} marks. Use the marks as a guide to how much to write.`,
      rules: [b.med, b.long],
    });
  }
  const a = {
    key: `${spec.board}.${spec.key}.topic-test`,
    kind: "TOPIC_TEST",
    title: `${spec.title}: topic test`,
    description: `A 25-minute test on ${spec.about}: ${countOf({ sections })} questions, 20 marks, from quick questions to ${b ? "longer answers" : "exam-style items"}. Questions are drawn at random from the question bank, so every attempt is different.`,
    instructions: "Answer every question. You have 25 minutes.\n\n- Multiple-choice, true/false, matching, gap-fill and most short answers are marked automatically when you submit.\n- Written answers cannot be marked automatically: after you submit, each one is shown with our mark scheme so that you can mark your own answer honestly.",
    timeLimitMinutes: 25,
    access: "PREMIUM",
    feedback: "AFTER_SUBMIT",
    shuffleQuestions: false,
    shuffleOptions: true,
    syllabus: s.ref,
    scope: { topics: spec.topics },
    sections,
  };
  if (marksOf(a) !== 20) throw new Error(`${a.key}: ${marksOf(a)} marks`);
  return a;
}

const TOPIC_TESTS = {
  zim: [
    { key: "verbs", title: "Verbs", about: "tenses, subject-verb agreement, modals, phrasal verbs and the passive", topics: ["structures.verbs"] },
    { key: "word-classes", title: "Nouns, pronouns, adjectives and adverbs", about: "nouns, pronouns, adjectives and adverbs", topics: ["structures.nouns"], units: ["structures.nouns", "structures.pronouns", "structures.adjectives", "structures.adverbs"] },
    { key: "sentences", title: "Sentence construction and direct speech", about: "sentence types, conjunctions, determiners, prepositions, punctuation, questions and direct and indirect speech", topics: ["structures.sentences", "structures.speech"], units: ["structures.sentences.types", "structures.sentences.conjunctions", "structures.sentences.determiners", "structures.sentences.prepositions", "structures.sentences.punctuation", "structures.sentences.questions", "structures.speech"] },
    { key: "spelling-vocabulary", title: "Spelling and word formation", about: "word formation, homophones, spelling, synonyms, opposites and idioms", topics: ["structures.spelling"] },
    { key: "comprehension", title: "Reading and comprehension skills", about: "recall, inference, word meaning, tone, note making, summary, reading fiction and reference sources", topics: ["reading"], units: ["reading.intensive.recall", "reading.intensive.inference", "reading.intensive.word-meaning", "reading.intensive.tone-style", "reading.intensive.notes", "reading.intensive.summary", "reading.extensive", "reading.referencing"] },
    { key: "composition-skills", title: "Composition skills", about: "paragraphing, register, figurative language and the types of composition", topics: ["writing.aspects"], units: ["writing.aspects.paragraphs", "writing.aspects.registers", "writing.aspects.figurative", "writing.free"] },
    { key: "guided-composition", title: "Guided compositions", about: "letters, memos, reports, speeches, articles, curricula vitae and writing from notes", topics: ["writing.guided"] },
    { key: "oral", title: "Oral work", about: "listening, pronunciation, conversations, speeches and debates", topics: ["speaking", "listening"], units: ["listening.comprehension", "speaking.pronunciation", "speaking.registers", "speaking.debates-speeches"] },
  ],
  fle: [
    { key: "reading", title: "Reading skills", about: "explicit and implicit meanings, analysis, writers' effects and summary", topics: ["reading"] },
    { key: "grammar", title: "Spelling, punctuation and grammar", about: "accurate grammar, spelling and punctuation", topics: ["writing.accuracy"] },
    { key: "vocabulary-sentences", title: "Vocabulary and sentence structures", about: "sentence structures, linking words and vocabulary", topics: ["writing.vocabulary"] },
    { key: "writing", title: "Writing skills", about: "text types, audience and register, description, narrative and argument", topics: ["writing"], units: ["writing.text-types", "writing.audience", "writing.descriptive", "writing.narrative", "writing.argument", "writing.directed"] },
  ],
  esl: [
    { key: "reading", title: "Reading skills", about: "factual information, opinions and attitudes, implied meaning and note completion", topics: ["reading"] },
    { key: "grammar", title: "Grammar, punctuation and spelling", about: "grammatical structures, punctuation and spelling", topics: ["writing.grammar"] },
    { key: "vocabulary", title: "Vocabulary and linking", about: "vocabulary, collocations, idioms and linking devices", topics: ["writing.vocabulary"], units: ["writing.vocabulary", "writing.organising"] },
    { key: "writing", title: "Writing for a purpose", about: "register, style and format of emails, articles, reports, reviews and essays", topics: ["writing.register"], units: ["writing.register", "writing.communicating"] },
  ],
};

const DISCLAIMER = "This is an original practice paper written for this platform in the style of the real examination. It is not an official paper, and its texts and questions are not past-paper material.";
const SELF_MARK = "Written answers cannot be marked automatically: after you submit, each one is shown with our mark scheme so that you can mark your own answer honestly. Multiple-choice, matching and short factual answers are marked automatically.";
const ex = (topic, type, marks, count = 1, difficulty = [3, 5]) => ({ topics: [topic], count, difficulty, type, marksPerQuestion: marks, examStyleOnly: true });
const mock = (s, key, title, description, instructions, minutes, sections) => ({
  key,
  kind: "MOCK_EXAM",
  title,
  description: `${description} ${DISCLAIMER}`,
  instructions,
  timeLimitMinutes: minutes,
  access: "PREMIUM",
  feedback: "AFTER_SUBMIT",
  shuffleQuestions: false,
  shuffleOptions: false,
  syllabus: s.ref,
  sections,
});

const MOCKS = {
  zim: (s) => [
    mock(s, "mock.zimsec.paper-1", "Mock exam in the style of ZIMSEC O-Level English Language Paper 1",
      "A full-length practice paper modelled on ZIMSEC O-Level English Language Paper 1 (Composition): choose one composition from seven titles (30 marks) and write one guided composition (20 marks), 1 hour 30 minutes, 50 marks. Titles and tasks are drawn from the bank, so every attempt is a new paper.",
      `Answer **one** question from Section A and the question in Section B. You have 1 hour 30 minutes.\n\n- Section A (30 marks): write a composition of about 450-600 words on one of the seven titles.\n- Section B (20 marks): write the guided composition in the format the task asks for.\n- Plan before you write, paragraph your work and check your spelling and punctuation.\n- ${SELF_MARK}\n\nThe format follows ZIMSEC O-Level English Language Paper 1 as described in the 2015-2022 syllabus. Check the instructions and word lengths on your own examination papers.`,
      90,
      [
        { title: "Section A: Composition (30 marks)", component: "1", instructions: "Answer one question. Each title is worth 30 marks.", answerCount: 1, marks: 30, rules: [ex("writing.free", "ESSAY", 30, 7)] },
        { title: "Section B: Guided composition (20 marks)", component: "1", instructions: "Answer the question in this section.", rules: [ex("writing.guided", "EXTENDED_RESPONSE", 20)] },
      ]),
    mock(s, "mock.zimsec.paper-2", "Mock exam in the style of ZIMSEC O-Level English Language Paper 2",
      "A full-length practice paper modelled on ZIMSEC O-Level English Language Paper 2: a prose passage with comprehension questions and a summary (Section A, 40 marks) and language-structure questions set in the context of the passage (Section B, 10 marks), 2 hours, 50 marks. A different passage may be drawn each attempt.",
      `Read the passage carefully, then answer **all** the questions. You have 2 hours.\n\n- Section A (40 marks): comprehension questions and a summary. Answer in your own words where the question asks you to.\n- Section B (10 marks): language questions based on the passage.\n- ${SELF_MARK}\n\nThe format follows ZIMSEC O-Level English Language Paper 2 as described in the 2015-2022 syllabus. Check the instructions on your own examination papers.`,
      120,
      [{ title: "Paper 2: Comprehension, summary and language structures (50 marks)", component: "2", instructions: "Answer all the questions.", rules: [ex("reading", "STRUCTURED", 50)] }]),
  ],
  fle: (s) => [
    mock(s, "mock.cambridge.0500.paper-1", "Mock exam in the style of Cambridge IGCSE First Language English Paper 1 (Reading)",
      "A full-length practice paper modelled on Cambridge IGCSE First Language English 0500 Paper 1 (Reading): comprehension of Text A (20 marks), a summary of Text B (20 marks), and short answers, a language task and an extended response on Text C (40 marks), 2 hours, 80 marks.",
      `Answer **all** the questions. You have 2 hours; spend about 15 minutes reading the texts.\n\n- Question 1 (20 marks): Text A. Question 2 (20 marks): Text B, a summary of no more than 120 words in your own words. Questions 3 and 4 (40 marks): Text C.\n- Dictionaries may not be used.\n- ${SELF_MARK}\n\nThe format follows Paper 1 of the 2027-2029 syllabus. Check the instructions on your own examination papers.`,
      120,
      [
        { title: "Question 1: Text A (20 marks)", component: "1", instructions: "Answer all parts.", rules: [ex("reading.meanings", "STRUCTURED", 20)] },
        { title: "Question 2: Text B (20 marks)", component: "1", instructions: "Answer both parts.", rules: [ex("reading.summary", "STRUCTURED", 20)] },
        { title: "Questions 3 and 4: Text C (40 marks)", component: "1", instructions: "Answer all parts.", rules: [ex("reading.extended", "STRUCTURED", 40)] },
      ]),
    mock(s, "mock.cambridge.0500.paper-2", "Mock exam in the style of Cambridge IGCSE First Language English Paper 2 (Directed Writing and Composition)",
      "A full-length practice paper modelled on Cambridge IGCSE First Language English 0500 Paper 2: directed writing based on one or two texts (Section A, 40 marks) and one composition from a choice of four titles, two descriptive and two narrative (Section B, 40 marks), 2 hours, 80 marks.",
      `Answer the question in Section A and **one** question from Section B. You have 2 hours.\n\n- Section A (40 marks): read the text(s) and answer both parts; part (b) asks for 250-350 words.\n- Section B (40 marks): write 350-450 words on one title.\n- Dictionaries may not be used.\n- ${SELF_MARK}\n\nThe format follows Paper 2 of the 2027-2029 syllabus. Check the instructions on your own examination papers.`,
      120,
      [
        { title: "Section A: Directed writing (40 marks)", component: "2", instructions: "Answer both parts of the question.", rules: [ex("writing.directed", "STRUCTURED", 40)] },
        { title: "Section B: Composition (40 marks)", component: "2", instructions: "Answer one question: two descriptive and two narrative titles.", answerCount: 1, marks: 40, rules: [ex("writing.descriptive", "ESSAY", 40, 2), ex("writing.narrative", "ESSAY", 40, 2)] },
      ]),
  ],
  esl: (s) => [
    mock(s, "mock.cambridge.0510.component-1", "Mock exam in the style of Cambridge IGCSE English as a Second Language Component 1 (Reading and Writing)",
      "A full-length practice paper modelled on Cambridge IGCSE English as a Second Language 0510 Component 1 (Reading and Writing): four reading exercises and two writing exercises, 2 hours, 60 marks. The multiple-choice exercise uses four options where the real paper uses three.",
      `Answer **all** the exercises. You have 2 hours.\n\n- Exercises 1 to 4 (30 marks) test reading; Exercises 5 and 6 (15 marks each) ask for 120-160 words of continuous writing: an informal email and a more formal piece.\n- Dictionaries may not be used.\n- ${SELF_MARK}\n\nThe format follows Component 1 of the 2027-2029 syllabus. The Listening component (Component 2) and the Speaking test cannot be simulated here. Check the instructions on your own examination papers.`,
      120,
      [
        { title: "Exercise 1 (8 marks)", component: "1", rules: [ex("reading", "STRUCTURED", 8)] },
        { title: "Exercise 2 (9 marks)", component: "1", rules: [ex("reading", "MATCHING", 9)] },
        { title: "Exercise 3 (7 marks)", component: "1", rules: [ex("reading", "STRUCTURED", 7)] },
        { title: "Exercise 4 (6 marks)", component: "1", rules: [ex("reading", "STRUCTURED", 6)] },
        { title: "Exercise 5 (15 marks)", component: "1", rules: [ex("writing", "EXTENDED_RESPONSE", 15)] },
        { title: "Exercise 6 (15 marks)", component: "1", rules: [ex("writing", "ESSAY", 15)] },
      ]),
  ],
};

const EXPECTED = { "mock.zimsec.paper-1": 50, "mock.zimsec.paper-2": 50, "mock.cambridge.0500.paper-1": 80, "mock.cambridge.0500.paper-2": 80, "mock.cambridge.0510.component-1": 60 };
const BOARD = { zim: "zimsec", fle: "cambridge-0500", esl: "cambridge-0510" };
const out = {};
for (const [id, s] of Object.entries(SYLLABI)) {
  const tests = [];
  for (const spec of TOPIC_TESTS[id]) {
    try {
      tests.push(topicTest(s, { ...spec, board: BOARD[id] }));
    } catch (error) {
      problems.push(`${s.ref} ${spec.key}: ${error.message}`);
    }
  }
  const mocks = MOCKS[id](s);
  for (const a of [...tests, ...mocks]) checkAssessment(s, a);
  for (const m of mocks) if (marksOf(m) !== EXPECTED[m.key]) problems.push(`${m.key}: ${marksOf(m)} marks, expected ${EXPECTED[m.key]}`);
  out[id] = { tests, mocks };
  for (const a of tests) console.log(`${a.key}: ${countOf(a)} q, ${marksOf(a)} marks${a.sections[1] ? `; B ${a.sections[1].rules.map((r) => `${r.topics[0]}:${r.marksPerQuestion}`).join(" ")}` : ""}`);
  for (const m of mocks) console.log(`${m.key}: ${countOf(m)} q, ${marksOf(m)} marks`);
}
const args = process.argv.slice(2);
if (args.includes("--report")) console.log(report.join("\n"));
if (problems.length) {
  console.log(`\n${problems.length} problem(s):\n${problems.join("\n")}`);
  process.exitCode = 1;
} else console.log("every rule guaranteed");
if (args.includes("--write") && problems.length === 0) {
  const dir = path.join(ROOT, "content/subjects/english-language-o/assessments");
  fs.mkdirSync(path.join(dir, "topic-tests"), { recursive: true });
  fs.mkdirSync(path.join(dir, "mocks"), { recursive: true });
  for (const [id, { tests, mocks }] of Object.entries(out)) {
    fs.writeFileSync(path.join(dir, `topic-tests/${BOARD[id]}-topic-tests.json`), JSON.stringify(tests, null, 2) + "\n");
    fs.writeFileSync(path.join(dir, `mocks/${BOARD[id]}-mocks.json`), JSON.stringify(mocks, null, 2) + "\n");
  }
  console.log("written");
}
