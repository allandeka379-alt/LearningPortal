// Builds the history-a topic tests and mock exams (ZIMSEC A-Level History 2015-2022, Cambridge International AS & A Level
// History 9489 2027-2029) with the shared helpers in .scratch/tools/assess-lib.mjs. Paper plan: .scratch/history-a/BRIEF.md.
// Inputs: npx tsx --conditions=react-server .scratch/tools/inventory.ts history-a .scratch/history-a/inventory.json
// Run: node .scratch/history-a/build-assessments.mjs [--report] [--write]
// Written BEFORE the content exists: the first --report will list thin banks; fill MERGE and the topic lists then.
import { setup, autoTopicTests, topicTest, examSpread, mcqSpread, mock, finish, SELF_MARK } from "../tools/assess-lib.mjs";

const S = setup("history-a", { zim: "zimsec/a-level/history/2015-2022", cam: "cambridge/a-level/history/2027-2029" }, ".scratch/history-a/inventory.json");
const RES = [25, 30, 40];
const ZIM = "ZIMSEC A-Level History";
const CAM = "Cambridge International AS & A Level History 9489";
const confirm = "Check the instructions on your own examination papers.";
const conv = "Question sizes and part splits are our convention; real papers vary.";
const instr = (body) => `${body}\n\n- ${SELF_MARK}\n\n${conv} ${confirm}`;

// ZIMSEC topic keys by paper (specification grids: Paper 1 Zimbabwe, Paper 2 Africa and the world). Topic 2 is in both.
const ZP1 = ["sources-of-history", "precolonial", "early-contacts", "colonisation", "first-chimurenga", "colonial-administration", "second-chimurenga", "post-independence", "indigenisation-land", "constitution"];
const ZP2 = ["precolonial", "slave-trade-to-legitimate-trade", "imperialism", "primary-resistance-africa", "french-revolution", "nationalism-europe", "ww1-peace", "fascism-ww2", "communist-revolutions", "regional-international"];
const essay = (n, topics) => examSpread(S.zim, { type: "ESSAY", marks: 25, n, topics, skill: "EVALUATION", difficulty: [4, 5] });
const zimPaper = (n, name, topics, offered, about) =>
  mock(S.zim, {
    key: `mock.zimsec.paper-${n}`,
    title: `Mock exam in the style of ${ZIM} Paper ${n}`,
    description: `A full-length practice paper modelled on ${ZIM} Paper ${n} (${name}): a choice of ${offered} 25-mark essay questions on ${about}, answer any four, 3 hours, 100 marks. The real paper offers four questions in each of ${n === 1 ? "four sections" : "five sections"}.`,
    instructions: instr(`Answer **any four** questions, from at least three of the topics. You have 3 hours.\n\n- Each question is worth 25 marks. Plan each answer: explain, use precise dates, names and examples, and reach a judgement where the question asks how far or to what extent.\n- If you answer more than four questions, your best four count.`),
    minutes: 180,
    sections: [{ title: `Paper ${n}: answer any four questions`, component: String(n), instructions: "Answer any four questions.", answerCount: 4, marks: 100, rules: essay(offered, topics) }],
  });
const zimMocks = [
  zimPaper(1, "History of Zimbabwe", ZP1, 8, "Zimbabwe from pre-colonial times to the present"),
  zimPaper(2, "Regional and International History", ZP2, 10, "Africa, Europe and the world, and regional and international organisations"),
];

// Cambridge: the AS European option topics (Paper 1 prescribed topic rotates), Paper 3 topics and Paper 4 European topics.
const AS_EU = { france: "as-european.france", germany: "as-european.germany", russia: "as-european.russia" };
const P3T = { ww1: "paper-3.ww1", holocaust: "paper-3.holocaust", "cold-war": "paper-3.cold-war" };
const P4T = ["p4-european.mussolini", "p4-european.stalin", "p4-european.hitler"];
const one = (marks, type, skill, topics) => examSpread(S.cam, { type, marks, n: 1, topics, skill, difficulty: [3, 5] });
const p1 = (label, topic) =>
  mock(S.cam, {
    key: `mock.9489.paper-1.${label}`,
    title: `Mock exam in the style of ${CAM} Paper 1 (${label[0].toUpperCase()}${label.slice(1)})`,
    description: `A practice paper modelled on ${CAM} Paper 1 (Historical Sources) for the European option topic ${label[0].toUpperCase()}${label.slice(1)}: one 40-mark question on four invented sources, 1 hour 15 minutes. The sources are written for this platform; they are not real historical documents.`,
    instructions: instr("Answer **both** parts of the question. You have 1 hour 15 minutes.\n\n- Part (a) is worth 15 marks: compare two sources. Part (b) is worth 25 marks: use all four sources and your own knowledge to decide how far they support the statement."),
    minutes: 75,
    sections: [{ title: "Paper 1 (40 marks)", component: "1", instructions: "Answer both parts.", rules: one(40, "STRUCTURED", "ANALYSIS", [topic]) }],
  });
const p2 = (label, topics) =>
  mock(S.cam, {
    key: `mock.9489.paper-2.${label}`,
    title: `Mock exam in the style of ${CAM} Paper 2 (${label})`,
    description: `A practice paper modelled on ${CAM} Paper 2 (Outline Study) for the European option: two 30-mark questions on the topics rotated into Paper 2 in ${label}, 1 hour 45 minutes.`,
    instructions: instr("Answer **both** questions, each in two parts. You have 1 hour 45 minutes.\n\n- Part (a) is worth 10 marks: explain why. Part (b) is worth 20 marks: weigh the given view against other factors and reach a judgement."),
    minutes: 105,
    sections: [{ title: "Paper 2 (60 marks)", component: "2", instructions: "Answer both questions.", rules: examSpread(S.cam, { type: "STRUCTURED", marks: 30, n: 2, topics, skill: "EVALUATION", difficulty: [3, 5] }) }],
  });
const p3 = (label, topic, about) =>
  mock(S.cam, {
    key: `mock.9489.paper-3.${label}`,
    title: `Mock exam in the style of ${CAM} Paper 3 (${about})`,
    description: `A practice paper modelled on ${CAM} Paper 3 (Historical Interpretations) on ${about}: one 40-mark question on an invented, unattributed extract, 1 hour 15 minutes.`,
    instructions: instr("Answer the question. You have 1 hour 15 minutes.\n\n- Use the extract and your own knowledge to explain what you can learn about the historian's interpretation and approach."),
    minutes: 75,
    sections: [{ title: "Paper 3 (40 marks)", component: "3", instructions: "Answer the question.", rules: one(40, "ESSAY", "ANALYSIS", [topic]) }],
  });
const camMocks = [
  p1("france", AS_EU.france),
  p1("germany", AS_EU.germany),
  p1("russia", AS_EU.russia),
  p2("2027", [AS_EU.germany, AS_EU.russia]),
  p2("2028", [AS_EU.france, AS_EU.russia]),
  p2("2029", [AS_EU.france, AS_EU.germany]),
  p3("ww1", P3T.ww1, "the origins of the First World War"),
  p3("holocaust", P3T.holocaust, "the Holocaust"),
  p3("cold-war", P3T["cold-war"], "the origins and development of the Cold War"),
  mock(S.cam, {
    key: "mock.9489.paper-4.european",
    title: `Mock exam in the style of ${CAM} Paper 4 (European history, 1919-41)`,
    description: `A practice paper modelled on ${CAM} Paper 4 (Depth Study), European option: a choice of three 30-mark questions (Mussolini's Italy, Stalin's Russia, Hitler's Germany), answer two, 1 hour 45 minutes.`,
    instructions: instr("Answer **two** of the three questions. You have 1 hour 45 minutes.\n\n- Each question is worth 30 marks. Build a balanced argument with precise knowledge and reach a supported judgement."),
    minutes: 105,
    sections: [{ title: "Paper 4 (60 marks)", component: "4", instructions: "Answer two questions.", answerCount: 2, marks: 60, rules: examSpread(S.cam, { type: "ESSAY", marks: 30, n: 3, topics: P4T, skill: "EVALUATION", difficulty: [3, 5] }) }],
  }),
];

// Topic tests. Topics too small for a 20-mark test on their own are merged (filled in after the first --report).
const MERGE = { zim: [], cam: [] };
const tests = (s, keyPrefix, merge, skip = []) => {
  const out = autoTopicTests(s, { keyPrefix, reserved: RES, skip: [...skip, ...merge.flatMap((m) => m.units)] });
  for (const m of merge) out.push(topicTest(s, { ...m, topics: m.units, keyPrefix, reserved: RES }));
  return out;
};
const camTests = [
  ...Object.entries(AS_EU).map(([k, key]) => topicTest(S.cam, { key, title: `${k[0].toUpperCase()}${k.slice(1)} (AS European option)`, about: `the AS European option topic ${k}`, topics: [key], keyPrefix: "9489", reserved: RES })),
  ...Object.entries(P3T).map(([k, key]) => topicTest(S.cam, { key, title: `Paper 3: ${k}`, about: `the Paper 3 topic ${k}`, topics: [key], keyPrefix: "9489", reserved: RES })),
  ...P4T.map((key) => topicTest(S.cam, { key, title: `Paper 4: ${key.split(".")[1]}`, about: `the Paper 4 European topic ${key.split(".")[1]}`, topics: [key], keyPrefix: "9489", reserved: RES })),
];

finish(
  S,
  {
    zim: { tests: tests(S.zim, "zimsec", MERGE.zim), mocks: zimMocks, file: "zimsec" },
    cam: { tests: camTests, mocks: camMocks, file: "cambridge" },
  },
  {
    expectedMarks: {
      "mock.zimsec.paper-1": 100, "mock.zimsec.paper-2": 100,
      "mock.9489.paper-1.france": 40, "mock.9489.paper-1.germany": 40, "mock.9489.paper-1.russia": 40,
      "mock.9489.paper-2.2027": 60, "mock.9489.paper-2.2028": 60, "mock.9489.paper-2.2029": 60,
      "mock.9489.paper-3.ww1": 40, "mock.9489.paper-3.holocaust": 40, "mock.9489.paper-3.cold-war": 40,
      "mock.9489.paper-4.european": 60,
    },
  },
);
