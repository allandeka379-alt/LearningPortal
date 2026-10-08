// Builds the combined-science-o topic tests and mock exams (content/subjects/combined-science-o/assessments/**) and
// checks every rule against the question bank that Combined Science sees (its own cs.* questions plus the biology,
// chemistry, physics and mathematics questions it borrows through conceptFamilies): each rule needs at least `count`
// candidates after earlier rules have taken theirs (the validator's "guaranteed" condition).
// Inputs: .scratch/combined-science/inventory.json (npx tsx --conditions=react-server
// .scratch/combined-science/inventory.ts .scratch/combined-science/inventory.json) and the syllabus file.
// Run: node .scratch/combined-science/build-assessments.mjs [--write]
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SYL = "zimsec/o-level/combined-science/2015-2022";
const SUBJECT = "zimsec/o-level/combined-science";
const inv = JSON.parse(fs.readFileSync(path.join(ROOT, ".scratch/combined-science/inventory.json"), "utf8"))[SYL];
const FILE = JSON.parse(fs.readFileSync(path.join(ROOT, "content/syllabi/zimsec/o-level/combined-science/2015-2022.json"), "utf8"));

const NODES = new Map();
const walk = (n, parent) => {
  NODES.set(n.key, { node: n, parent });
  for (const c of n.children ?? []) walk(c, n.key);
};
FILE.topics.forEach((t) => walk(t, null));
const node = (key) => {
  const entry = NODES.get(key);
  if (!entry) throw new Error(`unknown node ${key}`);
  return entry.node;
};
const nameOf = (key) => node(key).name;
const inTopic = (r, key) => r.lineages.some((l) => l.includes(key));

/** Candidate questions of a rule, exactly as the validator filters them (PREMIUM tests accept every access tier). */
function pool(rule) {
  const topic = rule.topics[0];
  node(topic);
  return inv.filter((r) => {
    if (!inTopic(r, topic)) return false;
    const [lo, hi] = rule.difficulty ?? [1, 5];
    if (r.difficulty < lo || r.difficulty > hi) return false;
    if (rule.type && r.type !== rule.type) return false;
    if (rule.marksPerQuestion && r.marks !== rule.marksPerQuestion) return false;
    if (rule.examStyleOnly && !r.examStyle) return false;
    return true;
  });
}

const problems = [];
const report = [];
function checkAssessment(a) {
  const rules = a.sections.flatMap((s, si) => s.rules.map((rule, ri) => ({ rule, label: `s${si + 1}r${ri + 1}` })));
  const sets = rules.map(({ rule }) => new Set(pool(rule).map((r) => r.key)));
  rules.forEach(({ rule, label }, i) => {
    let mayBeTaken = 0;
    for (let j = 0; j < i; j += 1) {
      let overlap = 0;
      for (const k of sets[j]) if (sets[i].has(k)) overlap += 1;
      mayBeTaken += Math.min(rules[j].rule.count, overlap);
    }
    const n = sets[i].size;
    const desc = `${a.key} ${label} ${rule.topics[0]} n=${rule.count} m=${rule.marksPerQuestion ?? "*"} d=${(rule.difficulty ?? [1, 5]).join("-")}${rule.type ? " " + rule.type : ""}${rule.examStyleOnly ? " exam" : ""}`;
    report.push(`${desc} -> pool ${n}${mayBeTaken ? ` (overlap ${mayBeTaken})` : ""}`);
    if (n < rule.count) problems.push(`${desc}: needs ${rule.count}, pool ${n}`);
    else if (n - mayBeTaken < rule.count) problems.push(`${desc}: not guaranteed (pool ${n}, earlier rules may take ${mayBeTaken})`);
  });
}
const sectionMarks = (s) => (s.answerCount ? s.marks : s.rules.reduce((u, r) => u + r.count * r.marksPerQuestion, 0));
const marksOf = (a) => a.sections.reduce((t, s) => t + sectionMarks(s), 0);
const countOf = (a) => a.sections.reduce((t, s) => t + s.rules.reduce((u, r) => u + r.count, 0), 0);
const list = (items) => (items.length <= 1 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`);
const SCIENCE = { biology: "Biology", chemistry: "Chemistry", physics: "Physics" };

const BORROWED_NOTE =
  " Most questions come from the platform's O-Level Biology, Chemistry and Physics banks, so a few go into more depth than the Combined Science syllabus requires.";

// ---------------------------------------------------------------------------------------------------------------------
// Topic tests: one per Combined Science topic (7.1.1 ... 7.3.6), 20 marks in 25 minutes.
//   Section A: one-mark questions (difficulty 1-3) spread over the subtopics.
//   Section B: one medium question (2-4 marks, difficulty 2-4) and one exam-style structured question (4-7 marks,
//              difficulty 3-5), with different marks so the two rules never compete for the same question.
// ---------------------------------------------------------------------------------------------------------------------
const TOPICS = FILE.topics.flatMap((science) => (science.children ?? []).map((t) => ({ science: science.key, key: t.key, title: t.name.replace(/^\d+(\.\d+)*\s*/, "") })));

function spreadOnes(unitKeys, n1) {
  const one = (key, count) => ({ topics: [key], count, difficulty: [1, 3], marksPerQuestion: 1 });
  const pools = unitKeys.map((key) => ({ key, n: pool(one(key, 1)).length })).filter((p) => p.n > 0);
  if (pools.length > n1) {
    pools.sort((a, b) => b.n - a.n);
    pools.length = n1;
  }
  const alloc = new Map(pools.map((p) => [p.key, 1]));
  let left = n1 - pools.length;
  const order = [...pools];
  for (let guard = 0; left > 0 && guard < 10000; guard += 1) {
    order.sort((a, b) => b.n / alloc.get(b.key) - a.n / alloc.get(a.key));
    const p = order[0];
    if (alloc.get(p.key) >= Math.floor(p.n / 2)) break;
    alloc.set(p.key, alloc.get(p.key) + 1);
    left -= 1;
  }
  if (left > 0) throw new Error(`${unitKeys.join(",")}: cannot spread ${n1} one-mark questions`);
  return unitKeys.filter((k) => alloc.has(k)).map((k) => one(k, alloc.get(k)));
}

function sectionB(topicKey, total, minOnes) {
  const nodes = [topicKey, ...(node(topicKey).children ?? []).map((c) => c.key)];
  const options = [];
  for (const medNode of nodes) {
    for (const m of [2, 3, 4]) {
      const med = { topics: [medNode], count: 1, difficulty: [2, 4], marksPerQuestion: m };
      const nMed = pool(med).length;
      if (nMed < 1) continue;
      for (const longNode of nodes) {
        for (const l of [4, 5, 6, 7]) {
          if (l === m) continue;
          const long = { topics: [longNode], count: 1, difficulty: [3, 5], marksPerQuestion: l, examStyleOnly: true };
          const nLong = pool(long).length;
          if (nLong < 1) continue;
          const n1 = total - m - l;
          if (n1 < minOnes) continue;
          // Prefer the whole topic as the pool (variety), bigger pools, a 5- or 6-mark structured question and about
          // 11-12 one-mark items.
          let score = Math.min(Math.log2(nMed + 1), 3) + Math.min(Math.log2(nLong + 1), 3) * 1.5;
          if (medNode === topicKey) score += 0.5;
          if (longNode === topicKey) score += 0.5;
          if (l === 5 || l === 6) score += 0.8;
          if (m === 3) score += 0.3;
          score -= Math.abs(n1 - 12) * 0.25;
          options.push({ med, long, n1, score });
        }
      }
    }
  }
  options.sort((a, b) => b.score - a.score);
  if (options.length === 0) throw new Error(`${topicKey}: no Section B combination`);
  return options[0];
}

function topicTest(spec) {
  const children = (node(spec.key).children ?? []).map((c) => c.key);
  const unitKeys = children.length > 0 ? children : [spec.key];
  const b = sectionB(spec.key, 20, Math.min(unitKeys.length, 8));
  const ones = spreadOnes(unitKeys, b.n1);
  const unitNames = unitKeys.map((k) => nameOf(k).replace(/^\d+(\.\d+)*\s*/, ""));
  const marksB = [b.med.marksPerQuestion, b.long.marksPerQuestion];
  const a = {
    key: `zimsec.${spec.key}.topic-test`,
    kind: "TOPIC_TEST",
    title: `${spec.title}: topic test`,
    description: `A 25-minute ${SCIENCE[spec.science]} test on ${unitKeys.length > 1 ? list(unitNames) : spec.title}: ${b.n1 + 2} questions, 20 marks, from quick recall to an exam-style structured question. Questions are drawn at random from the question bank, so every attempt is different.${BORROWED_NOTE}`,
    instructions: "Answer every question. You have 25 minutes.\n\n- Give units with numerical answers and show your working in longer calculations.\n- Multiple-choice, true/false, numerical and most short answers are marked automatically when you submit.\n- Written explanations cannot be marked automatically: after you submit, each one is shown with our mark scheme so that you can mark your own answer.\n- A question labelled (Supplement) or written for another syllabus may go beyond Combined Science: answer it if you can, and use its explanation to learn.",
    timeLimitMinutes: 25,
    access: "PREMIUM",
    feedback: "AFTER_SUBMIT",
    shuffleQuestions: false,
    shuffleOptions: true,
    syllabus: SUBJECT,
    scope: { topics: [spec.key] },
    sections: [
      { title: "Section A: short questions", instructions: "Each question is worth 1 mark.", rules: ones },
      { title: "Section B: longer questions", instructions: `These questions are worth ${marksB[0]} and ${marksB[1]} marks. Use the marks as a guide to how much to write.`, rules: [b.med, b.long] },
    ],
  };
  if (marksOf(a) !== 20) throw new Error(`${a.key}: ${marksOf(a)} marks`);
  return a;
}

const topicTests = TOPICS.map(topicTest);

// ---------------------------------------------------------------------------------------------------------------------
// Mock exams in the style of ZIMSEC Combined Science Paper 1 and Paper 2 (2015-2022 syllabus, section 9.0).
// ---------------------------------------------------------------------------------------------------------------------
const mcq = (key, count) => ({ topics: [key], count, difficulty: [1, 4], type: "MULTIPLE_CHOICE", marksPerQuestion: 1 });
// Paper 1: 40 one-mark multiple-choice items over the topics of the specification grid (section 9.0), 13 Biology,
// 13 Chemistry and 14 Physics.
const paper1Rules = [
  mcq("biology.cells", 2), mcq("biology.nutrition", 3), mcq("biology.respiratory", 2), mcq("biology.transport", 2),
  mcq("biology.reproduction", 2), mcq("biology.health", 2),
  mcq("chemistry.matter", 4), mcq("chemistry.acids", 2), mcq("chemistry.industry", 3), mcq("chemistry.redox", 2),
  mcq("chemistry.organic", 2),
  mcq("physics.measurement", 2), mcq("physics.force", 4), mcq("physics.energy", 4), mcq("physics.magnetism", 2),
  mcq("physics.electricity", 2),
];
const paper1 = {
  key: "mock.zimsec.paper-1",
  kind: "MOCK_EXAM",
  title: "Mock exam in the style of ZIMSEC O-Level Combined Science Paper 1",
  description: "A full-length practice paper modelled on ZIMSEC O-Level Combined Science Paper 1 (multiple choice): 40 questions, 40 marks, 1 hour, covering Biology, Chemistry and Physics. Questions are drawn from the question bank, so every attempt is a new paper. This is an original practice paper written for this platform in the style of the real examination. It is not an official ZIMSEC paper, and its questions are not past-paper questions.",
  instructions: "Answer **all** 40 questions. You have 1 hour.\n\n- Each question is worth 1 mark. Choose the one best answer.\n- There is no penalty for a wrong answer, so answer every question.\n- You may use a calculator.\n- The paper is marked when you submit or when the time runs out. You then see your score and the answers with explanations.\n\nThe timing and marks follow the format of ZIMSEC O-Level Combined Science Paper 1 as described in the 2015-2022 syllabus (1 hour, 40 compulsory multiple-choice items, 40 marks). Check the instructions on your own examination papers.",
  timeLimitMinutes: 60,
  access: "PREMIUM",
  feedback: "AFTER_SUBMIT",
  shuffleQuestions: false,
  shuffleOptions: true,
  syllabus: SUBJECT,
  sections: [{ title: "Paper 1: Multiple choice", component: "1", instructions: "Answer all the questions.", rules: paper1Rules }],
};

const ex = (key, marks, difficulty = [3, 5]) => ({ topics: [key], count: 1, difficulty, marksPerQuestion: marks, examStyleOnly: true });
// Paper 2. Real paper: Section A six compulsory structured questions (40 marks); Sections B, C and D (Biology,
// Chemistry, Physics) three free-response questions each, answer any two (20 marks per section). The bank has few
// questions of 10 marks, so each of B, C and D offers five 5-mark questions, of which the student answers any four.
const paper2 = {
  key: "mock.zimsec.paper-2",
  kind: "MOCK_EXAM",
  title: "Mock exam in the style of ZIMSEC O-Level Combined Science Paper 2",
  description: "A full-length practice paper modelled on ZIMSEC O-Level Combined Science Paper 2 (theory): six compulsory structured questions in Section A, then a choice of questions in the Biology, Chemistry and Physics sections, 2 hours, 100 marks. Questions are drawn from the question bank, so every attempt is a new paper. This is an original practice paper written for this platform in the style of the real examination. It is not an official ZIMSEC paper, and its questions are not past-paper questions.",
  instructions: "Answer **all** the questions in Section A, and **any four** of the five questions in each of Sections B (Biology), C (Chemistry) and D (Physics). You have 2 hours.\n\n- Section A is worth 40 marks; Sections B, C and D are worth 20 marks each. If you answer more than four questions in a section, your best four count.\n- The marks for each part are shown with it: use them to judge how many points to make. Show your working in calculations and give units.\n- Multiple-choice, numerical and most short answers are marked automatically. Written explanations cannot be: after you submit, each one is shown with our mark scheme so that you can mark your own answer.\n- The paper is marked when you submit or when the time runs out. You then see your score and the answers with explanations.\n\nIn the real Paper 2 (as described in the 2015-2022 syllabus), Sections B, C and D each have three free-response questions of which you answer two. This practice paper uses shorter questions from the bank with the same marks per section and time, and still lets you choose, so it practises the same skills and pacing. Some questions come from the platform's Biology, Chemistry and Physics banks and may go into more depth than Combined Science requires. Check the instructions on your own examination papers.",
  timeLimitMinutes: 120,
  access: "PREMIUM",
  feedback: "AFTER_SUBMIT",
  shuffleQuestions: false,
  shuffleOptions: true,
  syllabus: SUBJECT,
  sections: [
    {
      title: "Paper 2, Section A (40 marks)",
      component: "2",
      instructions: "Answer all the questions in this section.",
      rules: [ex("biology.nutrition", 7), ex("biology.health", 7), ex("chemistry.industry", 7), ex("chemistry.organic", 7), ex("physics.energy", 6), ex("physics.force", 6)],
    },
    {
      title: "Paper 2, Section B: Biology (20 marks)",
      component: "2",
      instructions: "Answer any four questions in this section. Each question is worth 5 marks.",
      answerCount: 4,
      marks: 20,
      rules: [ex("biology.cells", 5), ex("biology.respiratory", 5), ex("biology.transport", 5), ex("biology.reproduction", 5), ex("biology.nutrition", 5)],
    },
    {
      title: "Paper 2, Section C: Chemistry (20 marks)",
      component: "2",
      instructions: "Answer any four questions in this section. Each question is worth 5 marks.",
      answerCount: 4,
      marks: 20,
      rules: [{ ...ex("chemistry.matter", 5), count: 2 }, ex("chemistry.acids", 5), ex("chemistry.redox", 5, [2, 5]), ex("chemistry.organic", 5)],
    },
    {
      title: "Paper 2, Section D: Physics (20 marks)",
      component: "2",
      instructions: "Answer any four questions in this section. Each question is worth 5 marks.",
      answerCount: 4,
      marks: 20,
      rules: [ex("physics.measurement", 5, [2, 5]), ex("physics.force", 5, [2, 5]), ex("physics.energy", 5, [2, 5]), ex("physics.magnetism", 5, [2, 5]), ex("physics.electricity", 5, [2, 5])],
    },
  ],
};

for (const a of [...topicTests, paper1, paper2]) checkAssessment(a);
if (marksOf(paper1) !== 40 || countOf(paper1) !== 40) throw new Error(`paper 1: ${countOf(paper1)} questions, ${marksOf(paper1)} marks`);
if (marksOf(paper2) !== 100) throw new Error(`paper 2: ${marksOf(paper2)} marks`);

const args = process.argv.slice(2);
if (args.includes("--report")) console.log(report.join("\n"));
for (const a of topicTests) console.log(`${a.key}: ${countOf(a)} q, ${marksOf(a)} marks; B ${a.sections[1].rules.map((r) => `${r.topics[0]}:${r.marksPerQuestion}`).join(" ")}`);
console.log(`${paper1.key}: ${countOf(paper1)} q, ${marksOf(paper1)} marks; ${paper2.key}: ${countOf(paper2)} q, ${marksOf(paper2)} marks`);
if (problems.length) {
  console.log(`\n${problems.length} problem(s):\n${problems.join("\n")}`);
  process.exitCode = 1;
} else console.log("every rule guaranteed");
if (args.includes("--write") && problems.length === 0) {
  const dir = path.join(ROOT, "content/subjects/combined-science-o/assessments");
  fs.mkdirSync(path.join(dir, "topic-tests"), { recursive: true });
  fs.mkdirSync(path.join(dir, "mocks"), { recursive: true });
  fs.writeFileSync(path.join(dir, "topic-tests/zimsec-topic-tests.json"), JSON.stringify(topicTests, null, 2) + "\n");
  fs.writeFileSync(path.join(dir, "mocks/zimsec-mocks.json"), JSON.stringify([paper1, paper2], null, 2) + "\n");
  console.log("written");
}
