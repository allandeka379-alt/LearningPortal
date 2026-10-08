// Builds the physics-o topic tests, the Cambridge mock exams and the ZIMSEC practice exam
// (content/subjects/physics-o/assessments/**) and checks every rule against the question bank: each rule needs at
// least `count` candidates after earlier rules have taken theirs (the validator's "guaranteed" condition).
// Inputs: .scratch/physics/inventory.json (npx tsx --conditions=react-server .scratch/physics/inventory.ts
// .scratch/physics/inventory.json) and the two syllabus files.
// Run: node .scratch/physics/build-assessments.mjs [--write]
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const inv = JSON.parse(fs.readFileSync(path.join(ROOT, ".scratch/physics/inventory.json"), "utf8"));
const CAM = "cambridge/igcse/physics/2026-2028";
const ZIM = "zimsec/o-level/physics/2015-2022";
const SUBJECT = { [CAM]: "cambridge/igcse/physics", [ZIM]: "zimsec/o-level/physics" };
const FILES = {
  [CAM]: JSON.parse(fs.readFileSync(path.join(ROOT, "content/syllabi/cambridge/igcse/physics/2026-2028.json"), "utf8")),
  [ZIM]: JSON.parse(fs.readFileSync(path.join(ROOT, "content/syllabi/zimsec/o-level/physics/2015-2022.json"), "utf8")),
};

// Node index per syllabus: key -> { node, parent }.
const NODES = {};
for (const [syl, file] of Object.entries(FILES)) {
  const index = new Map();
  const walk = (n, parent) => {
    index.set(n.key, { node: n, parent });
    for (const c of n.children ?? []) walk(c, n.key);
  };
  file.topics.forEach((t) => walk(t, null));
  NODES[syl] = index;
}
const node = (syl, key) => {
  const entry = NODES[syl].get(key);
  if (!entry) throw new Error(`${syl}: unknown node ${key}`);
  return entry.node;
};
const nameOf = (syl, key) => node(syl, key).name;
const inTopic = (r, key) => r.lineages.some((l) => l.includes(key));

/** Candidate questions of a rule, exactly as the validator filters them (PREMIUM tests accept every access tier). */
function pool(syl, rule) {
  const topic = rule.topics[0];
  node(syl, topic);
  return inv[syl].filter((r) => {
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
function checkAssessment(a, syl) {
  const rules = a.sections.flatMap((s, si) => s.rules.map((rule, ri) => ({ rule, label: `s${si + 1}r${ri + 1}` })));
  const sets = rules.map(({ rule }) => new Set(pool(syl, rule).map((r) => r.key)));
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
const marksOf = (a) => a.sections.reduce((t, s) => t + s.rules.reduce((u, r) => u + r.count * r.marksPerQuestion, 0), 0);
const countOf = (a) => a.sections.reduce((t, s) => t + s.rules.reduce((u, r) => u + r.count, 0), 0);
const list = (items) => (items.length <= 1 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`);

// ---------------------------------------------------------------------------------------------------------------------
// Topic tests: 20 marks in 25 minutes.
//   Section A: one-mark questions (difficulty 1-3) spread over the units (the sub-topics of the test).
//   Section B: one medium question (2-4 marks, difficulty 2-4) and one exam-style structured question (4-7 marks,
//              difficulty 3-5), with different marks so the two rules never compete for the same question.
// ---------------------------------------------------------------------------------------------------------------------
const TOPIC_TESTS = {
  [CAM]: [
    { key: "measurement-motion", title: "Measurement and motion", nodes: ["motion-forces-energy.measurement", "motion-forces-energy.motion"] },
    { key: "forces-pressure", title: "Mass, weight, density, forces, momentum and pressure", nodes: ["motion-forces-energy.mass-weight", "motion-forces-energy.density", "motion-forces-energy.forces", "motion-forces-energy.momentum", "motion-forces-energy.pressure"] },
    { key: "energy-work-power", title: "Energy, work and power", nodes: ["motion-forces-energy.energy-work-power"] },
    { key: "thermal-physics", title: "Thermal physics", nodes: ["thermal-physics"] },
    { key: "waves", title: "Waves, light and sound", nodes: ["waves"] },
    { key: "electricity", title: "Electrical quantities, circuits and electrical safety", nodes: ["electricity-magnetism.quantities", "electricity-magnetism.circuits", "electricity-magnetism.safety"] },
    { key: "magnetism-electromagnetism", title: "Magnetism and electromagnetic effects", nodes: ["electricity-magnetism.magnetism", "electricity-magnetism.electromagnetic-effects"] },
    { key: "nuclear-physics", title: "Nuclear physics", nodes: ["nuclear-physics"] },
    { key: "space-physics", title: "Space physics", nodes: ["space-physics"] },
  ],
  [ZIM]: [
    { key: "measurement", title: "Measurement", nodes: ["measurement"] },
    { key: "kinematics", title: "Kinematics", nodes: ["kinematics"] },
    { key: "forces", title: "Forces", nodes: ["forces"] },
    { key: "structures", title: "Structures", nodes: ["structures"] },
    { key: "machines-energy-engines", title: "Machines, energy and engines", nodes: ["machines", "energy", "engines"] },
    { key: "thermal", title: "Thermal physics", nodes: ["thermal"] },
    { key: "waves", title: "Waves and sound", nodes: ["waves"] },
    { key: "optics", title: "Optics", nodes: ["optics"] },
    { key: "electricity", title: "Electricity", nodes: ["electricity"] },
    { key: "magnetism-electromagnetism", title: "Magnetism and electromagnetism", nodes: ["magnetism", "electromagnetism"] },
    { key: "electronics", title: "Electronics", nodes: ["electronics"] },
    { key: "atomic-nuclear", title: "Atomic and nuclear physics", nodes: ["atomic-nuclear"] },
  ],
};

function units(syl, nodes) {
  return nodes.flatMap((k) => {
    const children = node(syl, k).children ?? [];
    return children.length > 0 && nodes.length === 1 ? children.map((c) => c.key) : [k];
  });
}

function spreadOnes(syl, unitKeys, n1) {
  const one = (key, count) => ({ topics: [key], count, difficulty: [1, 3], marksPerQuestion: 1 });
  const pools = unitKeys.map((key) => ({ key, n: pool(syl, one(key, 1)).length })).filter((p) => p.n > 0);
  if (pools.length > n1) {
    // More units than questions: keep the units with the biggest pools.
    pools.sort((a, b) => b.n - a.n);
    pools.length = n1;
  }
  const alloc = new Map(pools.map((p) => [p.key, 1]));
  let left = n1 - pools.length;
  const order = [...pools].sort((a, b) => b.n - a.n);
  for (let guard = 0; left > 0 && guard < 10000; guard += 1) {
    // Give the next question to the unit with the most candidates per question already allocated.
    order.sort((a, b) => b.n / alloc.get(b.key) - a.n / alloc.get(a.key));
    const p = order[0];
    if (alloc.get(p.key) >= Math.floor(p.n / 2)) break;
    alloc.set(p.key, alloc.get(p.key) + 1);
    left -= 1;
  }
  if (left > 0) throw new Error(`${syl} ${unitKeys.join(",")}: cannot spread ${n1} one-mark questions`);
  return unitKeys.filter((k) => alloc.has(k)).map((k) => one(k, alloc.get(k)));
}

function sectionB(syl, nodes, total, minOnes) {
  const options = [];
  for (const medNode of nodes) {
    for (const m of [2, 3, 4]) {
      const med = { topics: [medNode], count: 1, difficulty: [2, 4], marksPerQuestion: m };
      const nMed = pool(syl, med).length;
      if (nMed < 1) continue;
      for (const longNode of nodes) {
        for (const l of [4, 5, 6, 7]) {
          if (l === m) continue;
          const long = { topics: [longNode], count: 1, difficulty: [3, 5], marksPerQuestion: l, examStyleOnly: true };
          const nLong = pool(syl, long).length;
          if (nLong < 1) continue;
          const n1 = total - m - l;
          if (n1 < minOnes) continue;
          // Prefer bigger pools (variety), a 5- or 6-mark structured question, and about 11-12 one-mark items.
          let score = Math.min(Math.log2(nMed + 1), 3) + Math.min(Math.log2(nLong + 1), 3) * 1.5;
          if (l === 5 || l === 6) score += 0.8;
          if (m === 3) score += 0.3;
          score -= Math.abs(n1 - 12) * 0.25;
          options.push({ med, long, n1, score });
        }
      }
    }
  }
  options.sort((a, b) => b.score - a.score);
  if (options.length === 0) throw new Error(`${syl} ${nodes.join(",")}: no Section B combination`);
  return options[0];
}

function topicTest(syl, spec) {
  const board = syl === CAM ? "cambridge" : "zimsec";
  const unitKeys = units(syl, spec.nodes);
  const b = sectionB(syl, spec.nodes, 20, Math.min(unitKeys.length, 8));
  const ones = spreadOnes(syl, unitKeys, b.n1);
  const unitNames = unitKeys.map((k) => nameOf(syl, k));
  const marksB = [b.med.marksPerQuestion, b.long.marksPerQuestion];
  const a = {
    key: `${board}.${spec.key}.topic-test`,
    kind: "TOPIC_TEST",
    title: `${spec.title}: topic test`,
    description: `A 25-minute test on ${list(unitNames)}: ${b.n1 + 2} questions, 20 marks, from quick recall to an exam-style structured question. Questions are drawn at random from the question bank, so every attempt is different.${syl === CAM ? " It includes Supplement content (examined on the Extended papers 2 and 4)." : ""}`,
    instructions: "Answer every question. You have 25 minutes.\n\n- Give units with numerical answers and show your working in longer calculations.\n- Multiple-choice, true/false, numerical and most short answers are marked automatically when you submit.\n- Written explanations cannot be marked automatically: after you submit, each one is shown with our mark scheme so that you can mark your own answer.",
    timeLimitMinutes: 25,
    access: "PREMIUM",
    feedback: "AFTER_SUBMIT",
    shuffleQuestions: false,
    shuffleOptions: true,
    syllabus: SUBJECT[syl],
    scope: { topics: spec.nodes },
    sections: [
      { title: "Section A: short questions", instructions: "Each question is worth 1 mark.", rules: ones },
      { title: "Section B: longer questions", instructions: `These questions are worth ${marksB[0]} and ${marksB[1]} marks. Use the marks as a guide to how much to write.`, rules: [b.med, b.long] },
    ],
  };
  if (marksOf(a) !== 20) throw new Error(`${a.key}: ${marksOf(a)} marks`);
  return a;
}

// ---------------------------------------------------------------------------------------------------------------------
// Cambridge mocks.
// ---------------------------------------------------------------------------------------------------------------------
const MOCK_NOTE = "Questions are drawn from the question bank, so every attempt is a new paper. This is an original practice paper written for this platform in the style of the real examination. It is not an official Cambridge paper, and its questions are not past-paper questions.";

function camPaper2() {
  // 40 one-mark MCQs, weighted roughly by the size of each topic in the syllabus.
  const plan = [
    ["motion-forces-energy", 13], ["thermal-physics", 5], ["waves", 7], ["electricity-magnetism", 9], ["nuclear-physics", 4], ["space-physics", 2],
  ];
  const rules = plan.map(([topic, count]) => ({ topics: [topic], count, difficulty: [1, 5], type: "MULTIPLE_CHOICE", marksPerQuestion: 1 }));
  return {
    key: "mock.cambridge.paper-2",
    kind: "MOCK_EXAM",
    title: "Mock exam in the style of Cambridge IGCSE Physics Paper 2 (Multiple Choice, Extended)",
    description: `A full-length practice paper modelled on Cambridge IGCSE Physics (0625) Paper 2, the Extended multiple-choice paper: 40 questions on the Core and Supplement content of all six topics, 45 minutes, 40 marks. ${MOCK_NOTE}`,
    instructions: "Answer **all** 40 questions. You have 45 minutes.\n\n- Each question is worth 1 mark and has one correct answer.\n- There is no penalty for a wrong answer, so answer every question.\n- You may use a calculator. Take the gravitational field strength g = 9.8 N/kg unless a question gives another value.\n- The paper is marked when you submit or when the time runs out. You then see your score and the answers with explanations.\n\nThe structure follows the assessment overview of the Cambridge IGCSE Physics 0625 syllabus for 2026 to 2028 (Paper 2: Multiple Choice (Extended), 45 minutes, 40 four-option questions, 40 marks).",
    timeLimitMinutes: 45,
    access: "PREMIUM",
    feedback: "AFTER_SUBMIT",
    shuffleQuestions: false,
    shuffleOptions: true,
    syllabus: SUBJECT[CAM],
    sections: [{ title: "Paper 2: Multiple Choice (Extended)", component: "2", instructions: "Answer all the questions.", rules }],
  };
}

function camPaper4() {
  // About 80 marks of structured questions, 75 minutes. Each rule takes one exam-style structured question of a fixed
  // mark value from one topic, so every attempt has the same total.
  const s = (topic, marks, count = 1) => ({ topics: [topic], count, difficulty: [3, 5], type: "STRUCTURED", marksPerQuestion: marks, examStyleOnly: true });
  const rules = [
    s("motion-forces-energy", 6), s("motion-forces-energy", 5, 2), s("motion-forces-energy", 4), s("motion-forces-energy", 3),
    s("thermal-physics", 5), s("thermal-physics", 4),
    s("waves", 6), s("waves", 5), s("waves", 4),
    s("electricity-magnetism", 6), s("electricity-magnetism", 5, 2), s("electricity-magnetism", 4),
    s("nuclear-physics", 5), s("nuclear-physics", 4),
    s("space-physics", 4),
  ];
  return {
    key: "mock.cambridge.paper-4",
    kind: "MOCK_EXAM",
    title: "Mock exam in the style of Cambridge IGCSE Physics Paper 4 (Theory, Extended)",
    description: `A practice theory paper modelled on Cambridge IGCSE Physics (0625) Paper 4: structured questions on the Core and Supplement content of all six topics, 75 minutes, 80 marks. ${MOCK_NOTE}`,
    instructions: "Answer **all** the questions. You have 1 hour 15 minutes.\n\n- Show your working in calculations and give units with your answers.\n- Take g = 9.8 N/kg unless a question gives another value.\n- Numerical, multiple-choice and most short answers are marked automatically. Written explanations are shown with our mark scheme after you submit, so that you can mark your own answers.\n\nThe real Paper 4 has fewer, longer questions, each covering several parts of a topic; this practice paper uses shorter structured questions so that every attempt draws a fresh mix.",
    timeLimitMinutes: 75,
    access: "PREMIUM",
    feedback: "AFTER_SUBMIT",
    shuffleQuestions: false,
    shuffleOptions: true,
    syllabus: SUBJECT[CAM],
    sections: [{ title: "Paper 4: Theory (Extended)", component: "4", instructions: "Answer all the questions in the spaces provided.", rules }],
  };
}

// ---------------------------------------------------------------------------------------------------------------------
// ZIMSEC whole-syllabus practice exam (the paper formats in our ZIMSEC syllabus file are not confirmed, so this is a
// subject test, not a mock of a named paper).
// ---------------------------------------------------------------------------------------------------------------------
function zimPractice() {
  const mcq = (topic, count) => ({ topics: [topic], count, difficulty: [1, 5], type: "MULTIPLE_CHOICE", marksPerQuestion: 1 });
  const s = (topic, marks) => ({ topics: [topic], count: 1, difficulty: [3, 5], type: "STRUCTURED", marksPerQuestion: marks, examStyleOnly: true });
  return {
    key: "zimsec.practice-exam",
    kind: "SUBJECT_TEST",
    title: "Physics practice exam: the whole O-Level syllabus",
    description: "A two-hour practice exam on the whole ZIMSEC O-Level Physics syllabus: 40 multiple-choice questions and 10 structured questions (88 marks). Questions are drawn from the question bank, so every attempt is a new paper. It is an original practice exam, not a ZIMSEC paper, and it does not copy the format of any particular ZIMSEC paper.",
    instructions: "Answer **all** the questions. You have 2 hours.\n\n- Section A: 40 multiple-choice questions, 1 mark each.\n- Section B: 10 structured questions. Show your working and give units.\n- Take g = 9.8 N/kg unless a question gives another value.\n- Written explanations are shown with our mark scheme after you submit, so that you can mark your own answers.",
    timeLimitMinutes: 120,
    access: "PREMIUM",
    feedback: "AFTER_SUBMIT",
    shuffleQuestions: false,
    shuffleOptions: true,
    syllabus: SUBJECT[ZIM],
    sections: [
      {
        title: "Section A: multiple choice",
        instructions: "Each question is worth 1 mark.",
        rules: [
          mcq("measurement", 3), mcq("kinematics", 3), mcq("forces", 4), mcq("structures", 2), mcq("energy", 2), mcq("engines", 1),
          mcq("thermal", 4), mcq("waves", 3), mcq("optics", 3), mcq("electricity", 5), mcq("magnetism", 2), mcq("electromagnetism", 3),
          mcq("electronics", 3), mcq("atomic-nuclear", 2),
        ],
      },
      {
        title: "Section B: structured questions",
        instructions: "Answer all the questions. The marks are shown for each part.",
        rules: [
          s("measurement", 5), s("kinematics", 5), s("forces", 4), s("energy", 5), s("thermal", 4),
          s("waves", 6), s("optics", 4), s("electricity", 6), s("electromagnetism", 5), s("electronics", 4),
        ],
      },
    ],
  };
}

// ---------------------------------------------------------------------------------------------------------------------
const out = { [CAM]: [], [ZIM]: [] };
for (const syl of [CAM, ZIM]) for (const spec of TOPIC_TESTS[syl]) out[syl].push(topicTest(syl, spec));
const mocks = { cambridge: [camPaper2(), camPaper4()], zimsec: [zimPractice()] };

for (const a of out[CAM]) checkAssessment(a, CAM);
for (const a of out[ZIM]) checkAssessment(a, ZIM);
for (const a of mocks.cambridge) checkAssessment(a, CAM);
for (const a of mocks.zimsec) checkAssessment(a, ZIM);

for (const line of report) console.log(line);
console.log("");
for (const a of [...out[CAM], ...out[ZIM], ...mocks.cambridge, ...mocks.zimsec]) console.log(`${a.key}: ${countOf(a)} questions, ${marksOf(a)} marks, ${a.timeLimitMinutes} min`);
console.log(problems.length ? `\nPROBLEMS (${problems.length}):\n${problems.join("\n")}` : "\nAll rules guaranteed.");

if (process.argv.includes("--write")) {
  const dir = path.join(ROOT, "content/subjects/physics-o/assessments");
  fs.mkdirSync(path.join(dir, "topic-tests"), { recursive: true });
  fs.mkdirSync(path.join(dir, "mocks"), { recursive: true });
  const write = (rel, data) => fs.writeFileSync(path.join(dir, rel), JSON.stringify(data, null, 2) + "\n");
  write("topic-tests/cambridge-topic-tests.json", out[CAM]);
  write("topic-tests/zimsec-topic-tests.json", out[ZIM]);
  write("mocks/cambridge-mocks.json", mocks.cambridge);
  write("mocks/zimsec-practice-exam.json", mocks.zimsec);
  console.log("written");
}
