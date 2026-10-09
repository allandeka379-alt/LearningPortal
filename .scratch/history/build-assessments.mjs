// Builds the history-o topic tests and mock exams (ZIMSEC O-Level History 2015-2022, Cambridge IGCSE History 0470
// 2027-2028) with the shared helpers in .scratch/tools/assess-lib.mjs.
// Inputs: npx tsx --conditions=react-server .scratch/tools/inventory.ts history-o .scratch/history/inventory.json
// Run: node .scratch/history/build-assessments.mjs [--report] [--write]
import { setup, topicTest, autoTopicTests, examSpread, examRule, mock, finish, SELF_MARK } from "../tools/assess-lib.mjs";

const S = setup("history-o", { zim: "zimsec/o-level/history/2015-2022", cam: "cambridge/igcse/history/2027-2028" }, ".scratch/history/inventory.json");
const RESERVED = [20, 25, 40];
const confirm = "Check the instructions on your own examination papers.";
const safeTests = (s, keyPrefix, merge = [], skip = []) => {
  const out = autoTopicTests(s, { keyPrefix, reserved: RESERVED, skip: [...skip, ...merge.flatMap((m) => m.units)] });
  for (const m of merge) {
    try {
      out.push(topicTest(s, { ...m, topics: m.units, keyPrefix, reserved: RESERVED }));
    } catch (error) {
      S.problems.push(`topic test ${m.key}@${s.ref} skipped: ${error.message}`);
    }
  }
  return out;
};

// ZIMSEC
const ZIM = "ZIMSEC O-Level History";
const zimTests = safeTests(S.zim, "zimsec", [
  { key: "origins-egypt", title: "Sources, human origins and ancient Egypt", about: "the meaning and sources of history, the origins of humankind and ancient Egyptian civilisation", units: ["conceptualisation", "origins", "egypt"] },
  { key: "contacts-colonisation", title: "European contacts and colonisation", about: "the Portuguese, missionaries and concession-seekers, and the colonisation of Zimbabwe", units: ["european-contacts", "colonisation"] },
  { key: "nationalism-struggle", title: "Nationalism and the armed struggle", about: "African nationalism and the liberation struggle", units: ["nationalism", "armed-struggle"] },
]);
const P1 = ["conceptualisation", "zimbabwean-societies", "european-contacts", "colonisation", "colonial-administration", "armed-struggle", "post-independence", "constitution"];
const P2 = ["slavery", "post-independence", "world-wars", "cooperation", "socialism"];
const zimPaper = (n, name, topics, about) =>
  mock(S.zim, {
    key: `mock.zimsec.paper-${n}`,
    title: `Mock exam in the style of ${ZIM} Paper ${n} (${name})`,
    description: `A full-length practice paper modelled on ${ZIM} Paper ${n} (${name}): a choice of 25-mark structured questions on ${about}, answer any four, 2 hours, 100 marks. This practice paper offers ${n === 1 ? "ten" : "eight"} questions where the real paper offers ${n === 1 ? "22" : "20"}.`,
    instructions: `Answer **any four** questions. You have 2 hours.\n\n- Each question is worth 25 marks; part (b) and part (c) ask you to explain and to evaluate. Use precise dates, names and examples.\n- If you answer more than four questions, your best four count.\n- ${SELF_MARK}\n\nThe format follows Paper ${n} as described in the 2015-2022 syllabus; the part marks are our convention. ${confirm}`,
    minutes: 120,
    sections: [{ title: `Paper ${n}: answer any four questions`, component: String(n), instructions: "Answer any four questions.", answerCount: 4, marks: 100, rules: examSpread(S.zim, { type: "STRUCTURED", marks: 25, n: n === 1 ? 10 : 8, topics }) }],
  });
const zimMocks = [
  zimPaper(1, "History of Zimbabwe", P1, "Zimbabwe from pre-colonial times to after independence, including one source-based question"),
  zimPaper(2, "Regional and International History", P2, "the slave trade, the world wars, regional and international co-operation, socialism and Zimbabwe's foreign policy"),
];

// Cambridge 0470
const CAM = "Cambridge IGCSE History";
const camTests = safeTests(S.cam, "cambridge", [], ["skills"]);
const DEPTH = ["depth-a", "depth-b", "depth-c", "depth-d", "depth-e"];
const camMocks = [
  mock(S.cam, {
    key: "mock.cambridge.paper-1",
    title: `Mock exam in the style of ${CAM} Paper 1 (Structured Questions)`,
    description: `A full-length practice paper modelled on ${CAM} 0470 Paper 1: Section A on the Core content (answer two) and Section B on the depth studies (answer one), 2 hours, 60 marks. Answer the Section A questions on the option you studied (A: the nineteenth century, or B: the twentieth century).`,
    instructions: `Answer **two** questions from Section A and **one** question from Section B. You have 2 hours.\n\n- Each question is worth 20 marks: (a) 4, (b) 6 and (c) 10.\n- In part (c) explain both sides and reach a supported judgement.\n- ${SELF_MARK}\n\nThe format follows Paper 1 of the 2027-2028 syllabus. ${confirm}`,
    minutes: 120,
    sections: [
      { title: "Section A: Core content (40 marks)", component: "1", instructions: "Answer two questions on the option you studied.", answerCount: 2, marks: 40, rules: [examRule("option-a", "STRUCTURED", 20, 2, [3, 5], { skill: "EVALUATION" }), examRule("option-b", "STRUCTURED", 20, 2, [3, 5], { skill: "EVALUATION" })] },
      { title: "Section B: Depth studies (20 marks)", component: "1", instructions: "Answer one question on the depth study you studied.", answerCount: 1, marks: 20, rules: DEPTH.map((d) => examRule(d, "STRUCTURED", 20, 1, [3, 5], { skill: "EVALUATION" })) },
    ],
  }),
  mock(S.cam, {
    key: "mock.cambridge.paper-2",
    title: `Mock exam in the style of ${CAM} Paper 2 (Document Questions)`,
    description: `A full-length practice paper modelled on ${CAM} 0470 Paper 2: one 40-mark question on a prescribed topic with several sources, 1 hour 45 minutes. The sources are written for this platform; they are not real historical documents.`,
    instructions: `Answer **all** parts of the question. You have 1 hour 45 minutes.\n\n- Use the sources and your own knowledge; explain how far you trust each source.\n- ${SELF_MARK}\n\nThe format follows Paper 2 of the 2027-2028 syllabus; the prescribed topic changes each series, so this paper may be on a different topic from yours. ${confirm}`,
    minutes: 105,
    sections: [{ title: "Paper 2 (40 marks)", component: "2", instructions: "Answer all parts.", rules: examSpread(S.cam, { type: "STRUCTURED", marks: 40, n: 1, topics: ["option-a", "option-b"], skill: "ANALYSIS" }) }],
  }),
  mock(S.cam, {
    key: "mock.cambridge.paper-4",
    title: `Mock exam in the style of ${CAM} Paper 4 (Alternative to Coursework)`,
    description: `A full-length practice paper modelled on ${CAM} 0470 Paper 4: one 40-mark question on a depth study, chosen from one per depth study, 1 hour.`,
    instructions: `Answer **one** question, on the depth study you studied. You have 1 hour.\n\n- Part (a) asks for an account; part (b) asks how important a person, organisation, development or event was.\n- ${SELF_MARK}\n\nThe format follows Paper 4 of the 2027-2028 syllabus. ${confirm}`,
    minutes: 60,
    sections: [{ title: "Paper 4 (40 marks)", component: "4", instructions: "Answer one question.", answerCount: 1, marks: 40, rules: examSpread(S.cam, { type: "STRUCTURED", marks: 40, n: 5, topics: DEPTH, skill: "EVALUATION" }) }],
  }),
];

finish(S, { zim: { tests: zimTests, mocks: zimMocks, file: "zimsec" }, cam: { tests: camTests, mocks: camMocks, file: "cambridge" } }, {
  expectedMarks: { "mock.zimsec.paper-1": 100, "mock.zimsec.paper-2": 100, "mock.cambridge.paper-1": 60, "mock.cambridge.paper-2": 40, "mock.cambridge.paper-4": 40 },
});
