// Builds the chemistry-o topic tests and mock exams (content/subjects/chemistry-o/assessments/**) from a compact spec
// and prints every rule's candidate pool plus the validator's "guaranteed" overlap check per assessment.
// Inputs: .scratch/chem-assemble2/inventory.json (npx tsx --conditions=react-server .scratch/chem-assemble2/inventory.ts
// .scratch/chem-assemble2/inventory.json) and the two syllabus files.
// Run: node .scratch/chem-assemble2/build-assessments.mjs [--write]
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const inv = JSON.parse(fs.readFileSync(path.join(ROOT, ".scratch/chem-assemble2/inventory.json"), "utf8"));
const ZIM = "zimsec/o-level/chemistry/2015-2022";
const CAM = "cambridge/igcse/chemistry/2026-2028";
const FILES = {
  [ZIM]: JSON.parse(fs.readFileSync(path.join(ROOT, "content/syllabi/zimsec/o-level/chemistry/2015-2022.json"), "utf8")),
  [CAM]: JSON.parse(fs.readFileSync(path.join(ROOT, "content/syllabi/cambridge/igcse/chemistry/2026-2028.json"), "utf8")),
};
const SUBJECT = { [ZIM]: "zimsec/o-level/chemistry", [CAM]: "cambridge/igcse/chemistry" };

// Node lineage per syllabus (ZIMSEC topics sit under SECTION nodes whose keys are not prefixes of the topic keys).
const parentOf = {};
const nodeOf = {};
for (const [syl, file] of Object.entries(FILES)) {
  const parents = new Map();
  const nodes = new Map();
  const walk = (n, parent) => {
    if (parents.has(n.key)) throw new Error(`${syl}: duplicate node ${n.key}`);
    parents.set(n.key, parent);
    nodes.set(n.key, n);
    for (const c of n.children ?? []) walk(c, n.key);
  };
  file.topics.forEach((t) => walk(t, null));
  parentOf[syl] = parents;
  nodeOf[syl] = nodes;
}
const within = (syl, nodeKey, ancestor) => {
  for (let k = nodeKey; k; k = parentOf[syl].get(k)) if (k === ancestor) return true;
  return false;
};
/** TOPIC-level nodes: children of SECTION nodes (ZIMSEC), top-level nodes otherwise (Cambridge). */
const topicNodes = (syl) => FILES[syl].topics.flatMap((t) => (t.kind === "SECTION" ? t.children : [t]));

/** Candidate questions of a rule, exactly as the validator filters them (PREMIUM tests accept every access tier). */
function pool(syl, rule, scopeTopic = null) {
  const topic = rule.topics?.[0] ?? scopeTopic;
  if (topic && !nodeOf[syl].has(topic)) throw new Error(`${syl}: unknown topic ${topic}`);
  return inv[syl].filter((r) => {
    if (topic && !r.nodes.some((n) => within(syl, n, topic))) return false;
    const [lo, hi] = rule.difficulty ?? [1, 5];
    if (r.difficulty < lo || r.difficulty > hi) return false;
    if (rule.type && r.type !== rule.type) return false;
    if (rule.skill && r.skill !== rule.skill) return false;
    if (rule.marksPerQuestion && r.marks !== rule.marksPerQuestion) return false;
    if (rule.examStyleOnly && !r.examStyle) return false;
    return true;
  });
}

const problems = [];
const report = [];
/** Pools per rule and the validator's guarantee: each rule keeps `count` candidates after earlier rules take theirs. */
function checkAssessment(a) {
  const syl = Object.keys(SUBJECT).find((s) => SUBJECT[s] === a.syllabus);
  const scopeTopic = a.scope?.topics?.[0] ?? null;
  const rules = a.sections.flatMap((s, si) => s.rules.map((rule, ri) => ({ rule, label: `s${si + 1}r${ri + 1}` })));
  const sets = rules.map(({ rule }) => new Set(pool(syl, rule, scopeTopic).map((r) => r.key)));
  rules.forEach(({ rule, label }, i) => {
    let mayBeTaken = 0;
    for (let j = 0; j < i; j += 1) {
      let overlap = 0;
      for (const k of sets[j]) if (sets[i].has(k)) overlap += 1;
      mayBeTaken += Math.min(rules[j].rule.count, overlap);
    }
    const n = sets[i].size;
    const desc = `${a.key} ${label} ${rule.topics?.[0] ?? "(scope)"} n=${rule.count} m=${rule.marksPerQuestion ?? "*"} d=${(rule.difficulty ?? [1, 5]).join("-")}${rule.type ? " " + rule.type : ""}${rule.skill ? " " + rule.skill : ""}${rule.examStyleOnly ? " exam" : ""}`;
    report.push(`${desc} -> pool ${n}${mayBeTaken ? ` (overlap ${mayBeTaken})` : ""}`);
    if (n < rule.count) problems.push(`${desc}: needs ${rule.count}, pool ${n}`);
    else if (n - mayBeTaken < rule.count) problems.push(`${desc}: not guaranteed (pool ${n}, earlier rules may take ${mayBeTaken})`);
  });
}

const marksOf = (sections) =>
  sections.reduce((t, s) => t + (s.answerCount ? s.marks : s.rules.reduce((u, r) => u + r.count * r.marksPerQuestion, 0)), 0);
const countOf = (sections) => sections.reduce((t, s) => t + s.rules.reduce((u, r) => u + r.count, 0), 0);
const listJoin = (items) => (items.length <= 1 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`);

// ---------------------------------------------------------------------------------------------------------------------
// Topic tests: one per topic (TOPIC node) per syllabus.
//   Section A: one-mark questions (difficulty 1-3), spread over the subtopics.
//   Section B: one or two medium questions (2-5 marks, difficulty 2-4) and one or two exam-style structured or
//              extended questions (5-8 marks, difficulty 4-5).
// 20 marks in 25 minutes; topics with 150 or more questions 25 marks in 30 minutes; topics with fewer than 25
// questions 15 marks in 20 minutes (so that repeated attempts still vary).
// ---------------------------------------------------------------------------------------------------------------------
function pickSectionB(syl, top, total, min1, max1, target1, big) {
  // Prefer rules with at least three candidates; accept two, then one, only when nothing else fits.
  for (const minPool of [3, 2, 1]) {
    const picked = pickSectionBWith(syl, top, total, min1, max1, target1, big, minPool);
    if (picked) return picked;
  }
  throw new Error(`${syl} ${top.key}: no Section B combination fits`);
}

function pickSectionBWith(syl, top, total, min1, max1, target1, big, minPool) {
  const long = (m) => ({ topics: [top.key], count: 1, difficulty: [4, 5], marksPerQuestion: m, examStyleOnly: true });
  const med = (m) => ({ topics: [top.key], count: 1, difficulty: [2, 4], marksPerQuestion: m });
  const longs = [5, 6, 7, 8].map((m) => ({ rule: long(m), n: pool(syl, long(m)).length, m, kind: "long" })).filter((x) => x.n >= minPool);
  const meds = [2, 3, 4, 5].map((m) => ({ rule: med(m), n: pool(syl, med(m)).length, m, kind: "med" })).filter((x) => x.n >= minPool);
  const options = [];
  const consider = (parts) => {
    const marks = parts.reduce((s, p) => s + p.m, 0);
    const n1 = total - marks;
    if (n1 < min1 || n1 > max1) return;
    const ms = parts.map((p) => p.m);
    if (new Set(ms).size !== ms.length) return; // different marks per rule (no overlap between Section B rules)
    // Variety: log of the pool per drawn question (capped); prefer a 6- or 7-mark long question and about
    // `target1` one-mark items; large topics should have two exam-style questions.
    let score = parts.reduce((s, p) => s + Math.min(Math.log2(p.n), 3), 0);
    if (parts.some((p) => p.kind === "long" && (p.m === 6 || p.m === 7))) score += 1;
    if (big && parts.filter((p) => p.kind === "long").length >= 2) score += 2;
    score -= Math.abs(n1 - target1) * 0.3;
    options.push({ parts, n1, score });
  };
  for (const l of longs) {
    for (const m1 of meds) {
      consider([m1, l]);
      for (const m2 of meds) if (m2.m > m1.m) consider([m1, m2, l]);
      for (const l2 of longs) if (l2.m > l.m) consider([m1, l, l2]);
    }
  }
  // Small topics with no medium question to spare: one exam-style question only.
  if (options.length === 0) for (const l of longs) consider([l]);
  options.sort((a, b) => b.score - a.score);
  return options[0] ?? null;
}

function spreadOnes(syl, top, n1) {
  const one = (key, count) => ({ topics: [key], count, difficulty: [1, 3], marksPerQuestion: 1 });
  // Only subtopics with a real choice of one-mark questions get their own rule.
  const children = (top.children ?? []).filter((c) => pool(syl, one(c.key, 1)).length >= 3);
  if (children.length >= 2 && children.length <= 12 && n1 >= children.length) {
    const pools = children.map((c) => ({ key: c.key, n: pool(syl, one(c.key, 1)).length }));
    // Keep a margin so every rule still has a choice: at most a third of a subtopic's pool, else at most half.
    for (const divisor of [3, 2]) {
      const alloc = new Map(pools.map((p) => [p.key, 1]));
      let left = n1 - children.length;
      const order = [...pools].sort((a, b) => b.n - a.n);
      for (let i = 0, guard = 0; left > 0 && guard < 1000; i = (i + 1) % order.length, guard += 1) {
        const p = order[i];
        if (alloc.get(p.key) < Math.floor(p.n / divisor)) {
          alloc.set(p.key, alloc.get(p.key) + 1);
          left -= 1;
        }
      }
      if (left === 0) return children.map((c) => one(c.key, alloc.get(c.key)));
    }
    console.error(`note: ${syl} ${top.key}: ${n1} one-mark questions drawn from the whole topic (subtopic pools too small to spread)`);
  }
  return [one(top.key, n1)];
}

function topicTest(board, syl, top) {
  const size = pool(syl, { topics: [top.key] }).length;
  const big = size >= 150;
  const small = size < 25;
  const total = big ? 25 : small ? 15 : 20;
  const minutes = big ? 30 : small ? 20 : 25;
  const b = pickSectionB(syl, top, total, big ? 11 : small ? 6 : 8, big ? 14 : small ? 10 : 11, big ? 11 : small ? 7 : 10, big);
  const ones = spreadOnes(syl, top, b.n1);
  const bRules = b.parts.map((p) => p.rule);
  const bMarks = b.parts.map((p) => p.m).sort((x, y) => x - y);
  const name = top.name.trim();
  const children = (top.children ?? []).map((c) => c.name.trim());
  const supplementOnly = (top.children ?? []).filter((c) => (c.components ?? []).length > 0).map((c) => `${c.code} ${c.name}`);
  const objectives = [];
  const collect = (n) => {
    for (const o of n.objectives ?? []) objectives.push(o.text);
    (n.children ?? []).forEach(collect);
  };
  collect(top);
  const hasSupplement = supplementOnly.length > 0 || objectives.some((t) => /^Supplement:/i.test(t));
  // Share of the topic's questions labelled as Supplement content (stem "**Supplement.**" or a syllabus note).
  const topicRows = pool(syl, { topics: [top.key] });
  const share = topicRows.filter((r) => r.supplementText).length / Math.max(1, topicRows.length);
  const whole = supplementOnly.length > 0 ? `, among it the whole of ${listJoin(supplementOnly)}` : "";
  const supplementNote =
    board === "cambridge" && hasSupplement
      ? share >= 0.5
        ? ` Many of its questions are on Supplement content (examined only on the Extended papers 2 and 4)${whole}, so Core candidates will meet a good number of questions beyond their syllabus.`
        : share >= 0.2
          ? ` It includes Supplement content (examined only on the Extended papers 2 and 4)${whole}, so Core candidates will meet some questions beyond their syllabus.`
          : ` It includes Supplement content (examined only on the Extended papers 2 and 4)${whole}, so Core candidates may meet a few questions beyond their syllabus.`
      : "";
  const single = bMarks.length === 1;
  const sections = [
    { title: "Section A: short questions", instructions: "Each question is worth 1 mark.", rules: ones },
    {
      title: single ? "Section B: longer question" : "Section B: longer questions",
      instructions: single
        ? `This question is worth ${bMarks[0]} marks. Use the marks as a guide to how many separate points to make.`
        : `These questions are worth ${listJoin(bMarks.map(String))} marks. Use the marks as a guide to how many separate points to make.`,
      rules: bRules,
    },
  ];
  const key = `${board}.${top.key}.topic-test`;
  const test = {
    key,
    kind: "TOPIC_TEST",
    title: `${name}: topic test`,
    description:
      `A ${minutes}-minute test on the whole ${name} topic${children.length > 1 && children.length <= 7 ? ` (${children.join("; ")})` : ""}: ${countOf(sections)} questions, ${marksOf(sections)} marks, from quick recall to an exam-style question. ` +
      `Questions are drawn at random from the question bank, so every attempt is different.${supplementNote}`,
    instructions: [
      `Answer every question. You have ${minutes} minutes.`,
      "",
      "- Use the correct chemical terms and formulae, balance equations, and give units with numerical answers.",
      "- Multiple-choice, true/false, numerical and most short answers are marked automatically when you submit.",
      "- Written explanations cannot be marked automatically: after you submit, each one is shown with our mark scheme so that you can mark your own answer.",
    ].join("\n"),
    timeLimitMinutes: minutes,
    access: "PREMIUM",
    feedback: "AFTER_SUBMIT",
    shuffleQuestions: false,
    shuffleOptions: true,
    syllabus: SUBJECT[syl],
    scope: { topics: [top.key] },
    sections,
  };
  checkAssessment(test);
  return test;
}

const topicTests = {
  zimsec: topicNodes(ZIM).map((t) => topicTest("zimsec", ZIM, t)),
  cambridge: topicNodes(CAM).map((t) => topicTest("cambridge", CAM, t)),
};

// ---------------------------------------------------------------------------------------------------------------------
// Mock exams. R(node, count, marks, [dmin, dmax], { type, exam, skill })
// ---------------------------------------------------------------------------------------------------------------------
const R = (node, count, marks, difficulty, opts = {}) => ({
  topics: [node],
  count,
  difficulty,
  ...(opts.type ? { type: opts.type } : {}),
  ...(opts.skill ? { skill: opts.skill } : {}),
  marksPerQuestion: marks,
  ...(opts.exam ? { examStyleOnly: true } : {}),
});
const MCQ = { type: "MULTIPLE_CHOICE" };
const EXAM = { exam: true };

// ZIMSEC Paper 1: 40 compulsory four-option multiple-choice items, 1 hour. Spread in proportion to the number of
// subtopics of each section of the syllabus (physical 36, inorganic 10, organic 11, environmental 7 of 64).
const zimP1 = [
  R("laboratory-techniques", 3, 1, [1, 5], MCQ),
  R("matter", 2, 1, [1, 5], MCQ),
  R("atoms-elements-compounds", 2, 1, [1, 5], MCQ),
  R("chemical-bonding", 2, 1, [1, 5], MCQ),
  R("mole-concept", 2, 1, [1, 5], MCQ),
  R("stoichiometry", 2, 1, [1, 5], MCQ),
  R("acids-bases-salts", 2, 1, [1, 5], MCQ),
  R("electrochemistry", 2, 1, [1, 5], MCQ),
  R("chemical-energetics", 2, 1, [1, 5], MCQ),
  R("equilibria", 3, 1, [1, 5], MCQ),
  R("reaction-kinetics", 1, 1, [1, 5], MCQ),
  R("periodic-table", 2, 1, [1, 5], MCQ),
  R("metals-and-non-metals", 4, 1, [1, 5], MCQ),
  R("fuels", 2, 1, [1, 5], MCQ),
  R("organic-nomenclature", 1, 1, [1, 5], MCQ),
  R("hydrocarbons", 1, 1, [1, 5], MCQ),
  R("alcohols", 1, 1, [1, 5], MCQ),
  R("carboxylic-acids", 1, 1, [1, 5], MCQ),
  R("polymers", 1, 1, [1, 5], MCQ),
  R("waste-management", 1, 1, [1, 5], MCQ),
  R("pollution", 1, 1, [1, 5], MCQ),
  R("water-purification", 1, 1, [1, 5], MCQ),
  R("herbs", 1, 1, [1, 5], MCQ),
];

// ZIMSEC Paper 2 (theory, 2 hours, 100 marks). The real Section A has five compulsory 8-mark structured questions and
// Section B five 15-mark questions of which candidates answer four. The bank's longest questions are 8-10 marks (20 of
// them), so Section A uses seven compulsory exam-style questions of 5-8 marks (40 marks; mark values chosen with
// .scratch/chem-assemble2/optimise.cjs: every pool >= 3) and Section B twelve 6-mark questions of which candidates
// answer any ten (60 marks; best ten count), keeping the totals, the time and a choice of questions.
const zimP2A = [
  R("chemical-bonding", 1, 5, [3, 5], EXAM),
  R("mole-concept", 1, 5, [3, 5], EXAM),
  R("acids-bases-salts", 1, 5, [3, 5], EXAM),
  R("electrochemistry", 1, 7, [3, 5], EXAM),
  R("reaction-kinetics", 1, 8, [3, 5], EXAM),
  R("metals-and-non-metals", 1, 5, [3, 5], EXAM),
  R("hydrocarbons", 1, 5, [3, 5], EXAM),
];
const zimP2B = [
  R("laboratory-techniques", 1, 6, [4, 5], EXAM),
  R("matter", 1, 6, [4, 5], EXAM),
  R("stoichiometry", 1, 6, [4, 5], EXAM),
  R("chemical-energetics", 1, 6, [4, 5], EXAM),
  R("equilibria", 1, 6, [4, 5], EXAM),
  R("periodic-table", 1, 6, [4, 5], EXAM),
  R("metals-and-non-metals", 1, 6, [4, 5], EXAM),
  R("fuels", 1, 6, [4, 5], EXAM),
  R("polymers", 1, 6, [4, 5], EXAM),
  R("organic-chemistry", 1, 6, [4, 5], EXAM),
  R("environmental-chemistry", 2, 6, [4, 5], EXAM),
];

// Cambridge Paper 2: 40 four-option multiple-choice questions on the Core and Supplement content, 45 minutes.
const camP2 = [
  R("states-of-matter", 2, 1, [2, 5], MCQ),
  R("atoms-elements-compounds", 5, 1, [2, 5], MCQ),
  R("stoichiometry", 4, 1, [2, 5], MCQ),
  R("electrochemistry", 3, 1, [2, 5], MCQ),
  R("chemical-energetics", 2, 1, [2, 5], MCQ),
  R("chemical-reactions", 5, 1, [2, 5], MCQ),
  R("acids-bases-salts", 4, 1, [2, 5], MCQ),
  R("periodic-table", 3, 1, [2, 5], MCQ),
  R("metals", 3, 1, [2, 5], MCQ),
  R("environment", 2, 1, [2, 5], MCQ),
  R("organic", 5, 1, [2, 5], MCQ),
  R("experimental", 2, 1, [2, 5], MCQ),
];

// Cambridge Paper 4: structured questions on the Core and Supplement content, 1 hour 15 minutes, 80 marks. Fourteen
// exam-style questions over topics 1-11 in syllabus order (mark values chosen with optimise.cjs: every pool >= 4).
const camP4 = [
  R("states-of-matter", 1, 6, [3, 5], EXAM),
  R("atoms-elements-compounds", 1, 5, [3, 5], EXAM),
  R("stoichiometry", 1, 4, [3, 5], EXAM),
  R("stoichiometry", 1, 5, [3, 5], EXAM),
  R("electrochemistry", 1, 7, [3, 5], EXAM),
  R("chemical-energetics", 1, 5, [3, 5], EXAM),
  R("chemical-reactions", 1, 7, [3, 5], EXAM),
  R("chemical-reactions", 1, 8, [3, 5], EXAM),
  R("acids-bases-salts", 1, 6, [3, 5], EXAM),
  R("periodic-table", 1, 6, [3, 5], EXAM),
  R("metals", 1, 5, [3, 5], EXAM),
  R("environment", 1, 7, [3, 5], EXAM),
  R("organic", 1, 4, [3, 5], EXAM),
  R("organic", 1, 5, [3, 5], EXAM),
];

// Cambridge Paper 6: Alternative to Practical, 1 hour, 40 marks: a rates experiment, a qualitative-analysis question,
// four questions on experimental techniques (apparatus, separation, chromatography, titration, purity, planning) and
// two 2-mark calculations from practical data.
const camP6 = [
  R("chemical-reactions.rate", 1, 8, [4, 5], EXAM),
  R("experimental.identification", 1, 6, [3, 5], EXAM),
  R("experimental", 1, 6, [3, 5], EXAM),
  R("experimental", 1, 7, [3, 5], EXAM),
  R("experimental", 1, 5, [3, 5], EXAM),
  R("experimental", 1, 4, [3, 5], EXAM),
  R("experimental", 2, 2, [2, 4], { type: "NUMERICAL" }),
];

const ZIM_NOTE =
  "This is an original practice paper written for this platform in the style of the real examination. It is not an official ZIMSEC paper, and its questions are not past-paper questions.";
const CAM_NOTE =
  "This is an original practice paper written for this platform in the style of the real examination. It is not an official Cambridge paper, and its questions are not past-paper questions.";
const MARKING_LINE =
  "- Multiple-choice, numerical and most short answers are marked automatically. Written explanations cannot be: after you submit, each one is shown with our mark scheme so that you can mark your own answer.";
const SUBMIT_LINE = "- The paper is marked when you submit or when the time runs out. You then see your score and the answers with explanations.";

function mock(key, syllabus, meta, sections) {
  const a = { key, kind: "MOCK_EXAM", ...meta, access: "PREMIUM", feedback: "AFTER_SUBMIT", shuffleQuestions: false, shuffleOptions: true, syllabus, sections };
  checkAssessment(a);
  return a;
}

const mocks = {
  zimsec: [
    mock(
      "mock.zimsec.paper-1",
      SUBJECT[ZIM],
      {
        title: "Mock exam in the style of ZIMSEC O-Level Chemistry Paper 1",
        description:
          `A full-length practice paper modelled on ZIMSEC O-Level Chemistry Paper 1 (multiple choice): ${countOf([{ rules: zimP1 }])} compulsory questions across the whole syllabus (physical, inorganic, organic and environmental chemistry), 1 hour, ${marksOf([{ rules: zimP1 }])} marks. ` +
          `Questions are drawn from the question bank, so every attempt is a new paper. ${ZIM_NOTE}`,
        instructions: [
          "Answer **all** 40 questions. You have 1 hour.",
          "",
          "- Each question is worth 1 mark. Most have one correct answer; a few ask you to select **every** correct option and say so in the question.",
          "- There is no penalty for a wrong answer, so answer every question.",
          "- Use a copy of the Periodic Table for relative atomic masses and other data, as you would in the examination.",
          SUBMIT_LINE,
          "",
          "The timing and marks follow the format of ZIMSEC O-Level Chemistry Paper 1 as described in the 2015-2022 syllabus (1 hour, 40 compulsory four-option multiple-choice items, 40 marks). Check the instructions on your own examination papers.",
        ].join("\n"),
        timeLimitMinutes: 60,
      },
      [{ title: "Paper 1: Multiple choice", component: "1", instructions: "Answer all the questions.", rules: zimP1 }],
    ),
    mock(
      "mock.zimsec.paper-2",
      SUBJECT[ZIM],
      {
        title: "Mock exam in the style of ZIMSEC O-Level Chemistry Paper 2",
        description:
          "A full-length practice paper modelled on ZIMSEC O-Level Chemistry Paper 2 (theory): compulsory structured questions in Section A and a choice of questions in Section B, 2 hours, 100 marks. " +
          `Questions are drawn from the question bank, so every attempt is a new paper. ${ZIM_NOTE}`,
        instructions: [
          "Answer **all** the questions in Section A and **any ten** of the twelve questions in Section B. You have 2 hours.",
          "",
          `- Section A is worth ${marksOf([{ rules: zimP2A }])} marks and Section B 60 marks (ten questions of 6 marks). If you answer more than ten questions in Section B, your best ten count.`,
          "- The marks for each part are shown with it: use them to judge how many points to make. Write balanced equations (with state symbols where asked), show your working in calculations and give units.",
          "- Use a copy of the Periodic Table for relative atomic masses, as you would in the examination.",
          MARKING_LINE,
          SUBMIT_LINE,
          "",
          "In the real Paper 2 (as described in the 2015-2022 syllabus), Section A has five compulsory structured questions of 8 marks and Section B asks you to choose four of five questions of 15 marks. This practice paper uses shorter questions from the bank with the same total marks and time, and still lets you choose in Section B, so it practises the same skills and pacing. Check the instructions on your own examination papers.",
        ].join("\n"),
        timeLimitMinutes: 120,
      },
      [
        { title: `Paper 2, Section A (${marksOf([{ rules: zimP2A }])} marks)`, component: "2", instructions: "Answer all the questions in this section.", rules: zimP2A },
        {
          title: "Paper 2, Section B (60 marks)",
          component: "2",
          instructions: "Answer any ten questions in this section. Each question is worth 6 marks.",
          answerCount: 10,
          marks: 60,
          rules: zimP2B,
        },
      ],
    ),
  ],
  cambridge: [
    mock(
      "mock.cambridge.paper-2",
      SUBJECT[CAM],
      {
        title: "Mock exam in the style of Cambridge IGCSE Chemistry Paper 2 (Multiple Choice, Extended)",
        description:
          `A full-length practice paper modelled on Cambridge IGCSE Chemistry (0620) Paper 2, the Extended multiple-choice paper: ${countOf([{ rules: camP2 }])} questions on the Core and Supplement content of all 12 topics, 45 minutes, ${marksOf([{ rules: camP2 }])} marks. ` +
          `Questions are drawn from the question bank, so every attempt is a new paper. ${CAM_NOTE}`,
        instructions: [
          "Answer **all** 40 questions. You have 45 minutes.",
          "",
          "- Each question is worth 1 mark. Most have one correct answer; a few ask you to select **every** correct option and say so in the question.",
          "- There is no penalty for a wrong answer, so answer every question.",
          "- You may use a calculator. Use a copy of the Periodic Table for relative atomic masses, as you would in the examination.",
          SUBMIT_LINE,
          "",
          "The structure follows the assessment overview of the Cambridge IGCSE Chemistry 0620 syllabus for 2026 to 2028 (Paper 2: Multiple Choice (Extended), 45 minutes, 40 four-option questions, 40 marks).",
        ].join("\n"),
        timeLimitMinutes: 45,
      },
      [{ title: "Paper 2: Multiple Choice (Extended)", component: "2", instructions: "Answer all the questions.", rules: camP2 }],
    ),
    mock(
      "mock.cambridge.paper-4",
      SUBJECT[CAM],
      {
        title: "Mock exam in the style of Cambridge IGCSE Chemistry Paper 4 (Theory, Extended)",
        description:
          `A full-length practice paper modelled on Cambridge IGCSE Chemistry (0620) Paper 4, the Extended theory paper: ${countOf([{ rules: camP4 }])} structured and extended questions on the Core and Supplement content of topics 1 to 11, 1 hour 15 minutes, ${marksOf([{ rules: camP4 }])} marks. ` +
          `Questions are drawn from the question bank, so every attempt is a new paper. ${CAM_NOTE}`,
        instructions: [
          "Answer **all** the questions. You have 1 hour 15 minutes.",
          "",
          "- The marks for each part are shown with it: use them to judge how many points to make. Write balanced equations (with state symbols where asked), show your working in calculations and give units.",
          "- You may use a calculator. Use a copy of the Periodic Table for relative atomic masses, as you would in the examination.",
          MARKING_LINE,
          SUBMIT_LINE,
          "",
          "The structure follows the assessment overview of the Cambridge IGCSE Chemistry 0620 syllabus for 2026 to 2028 (Paper 4: Theory (Extended), 1 hour 15 minutes, short-answer and structured questions, 80 marks). The real paper has fewer, longer questions that each range over several topics; this practice paper uses more, shorter questions from the bank with the same total marks and time.",
        ].join("\n"),
        timeLimitMinutes: 75,
      },
      [{ title: "Paper 4: Theory (Extended)", component: "4", instructions: "Answer all the questions.", rules: camP4 }],
    ),
    mock(
      "mock.cambridge.paper-6",
      SUBJECT[CAM],
      {
        title: "Mock exam in the style of Cambridge IGCSE Chemistry Paper 6 (Alternative to Practical)",
        description:
          `A practice paper modelled on Cambridge IGCSE Chemistry (0620) Paper 6, Alternative to Practical: ${countOf([{ rules: camP6 }])} questions on experimental techniques, a rates experiment, tests for ions and gases, handling results and planning, 1 hour, ${marksOf([{ rules: camP6 }])} marks. ` +
          `Questions are drawn from the question bank, so every attempt is a new paper. ${CAM_NOTE}`,
        instructions: [
          "Answer **all** the questions. You have 1 hour.",
          "",
          "- Read each description of the experiment carefully before you answer. Use the marks as a guide to how many points to make.",
          "- Give units with numerical answers, record readings to the precision of the apparatus, and round only at the end of a calculation.",
          "- You may use a calculator. The notes for use in qualitative analysis (tests for ions and gases) are provided in the real paper.",
          MARKING_LINE,
          SUBMIT_LINE,
          "",
          "The timing and marks follow the assessment overview of the Cambridge IGCSE Chemistry 0620 syllabus for 2026 to 2028 (Paper 6: Alternative to Practical, 1 hour, 40 marks). The real paper also asks you to complete tables, read apparatus diagrams and plot graphs on paper; practise those by hand, because this online paper can only ask about them.",
        ].join("\n"),
        timeLimitMinutes: 60,
      },
      [{ title: "Paper 6: Alternative to Practical", component: "6", instructions: "Answer all the questions.", rules: camP6 }],
    ),
  ],
};

// ---------------------------------------------------------------------------------------------------------------------
console.log(report.join("\n"));
const summary = (list) =>
  list.map((a) => `${a.key}: ${countOf(a.sections)} q, ${marksOf(a.sections)} marks, ${a.timeLimitMinutes} min (${(a.timeLimitMinutes / marksOf(a.sections)).toFixed(2)} min/mark)`).join("\n");
console.log("\n" + summary([...topicTests.zimsec, ...topicTests.cambridge, ...mocks.zimsec, ...mocks.cambridge]));
console.log(problems.length ? `\nPROBLEMS:\n${problems.join("\n")}` : "\nAll rule pools are large enough and every rule is guaranteed.");

if (process.argv.includes("--write")) {
  const dir = path.join(ROOT, "content/subjects/chemistry-o/assessments");
  const write = (rel, value) => {
    const file = path.join(dir, rel);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, JSON.stringify(value, null, 2) + "\n");
    console.log("wrote", path.relative(ROOT, file));
  };
  write("topic-tests/zimsec-topic-tests.json", topicTests.zimsec);
  write("topic-tests/cambridge-topic-tests.json", topicTests.cambridge);
  write("mocks/zimsec-mocks.json", mocks.zimsec);
  write("mocks/cambridge-mocks.json", mocks.cambridge);
}
