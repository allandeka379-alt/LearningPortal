// Builds the agriculture-o topic tests and mock exams (ZIMSEC O-Level Agriculture 2015-2022, Cambridge IGCSE
// Agriculture 0600 2027-2028) with the shared helpers in .scratch/tools/assess-lib.mjs.
// Inputs: npx tsx --conditions=react-server .scratch/tools/inventory.ts agriculture-o .scratch/agriculture/inventory.json
// Run: node .scratch/agriculture/build-assessments.mjs [--report] [--write]
import { setup, topicTest, autoTopicTests, examSpread, mcqSpread, mock, finish, SELF_MARK } from "../tools/assess-lib.mjs";

const S = setup("agriculture-o", { zim: "zimsec/o-level/agriculture/2015-2022", cam: "cambridge/igcse/agriculture/2027-2028" }, ".scratch/agriculture/inventory.json");
const RESERVED = [10, 15, 20];
const confirm = "Check the instructions on your own examination papers.";
const tops = (s) => s.file.topics.map((t) => t.key);
const safeTests = (s, keyPrefix, merge = []) => {
  const out = autoTopicTests(s, { keyPrefix, reserved: RESERVED, skip: merge.flatMap((m) => m.units) });
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
const ZIM = "ZIMSEC O-Level Agriculture";
const zimTests = safeTests(S.zim, "zimsec");
const zimMocks = [
  mock(S.zim, {
    key: "mock.zimsec.paper-1",
    title: `Mock exam in the style of ${ZIM} Paper 1`,
    description: `A full-length practice paper modelled on ${ZIM} Paper 1 (multiple choice): 40 questions, 40 marks, 1 hour, on the whole syllabus.`,
    instructions: `Answer **all** 40 questions. You have 1 hour.\n\n- Each question is worth 1 mark. Choose the one best answer. You may use a calculator.\n- The paper is marked when you submit or when the time runs out.\n\nThe format follows Paper 1 as described in the 2015-2022 syllabus. ${confirm}`,
    minutes: 60,
    sections: [{ title: "Paper 1: Multiple choice", component: "1", instructions: "Answer all the questions.", rules: mcqSpread(S.zim, { n: 40, topics: tops(S.zim) }) }],
  }),
  mock(S.zim, {
    key: "mock.zimsec.paper-2",
    title: `Mock exam in the style of ${ZIM} Paper 2`,
    description: `A full-length practice paper modelled on ${ZIM} Paper 2 (structured questions): six compulsory 10-mark questions in Section A and, in Section B, one crop-production and one animal-husbandry question chosen from three each, 2 hours, 100 marks.`,
    instructions: `Answer **all** six questions in Section A, **one** crop-production question and **one** animal-husbandry question in Section B. You have 2 hours.\n\n- Section A questions are worth 10 marks; Section B questions 20 marks.\n- Show your working in calculations and give units.\n- ${SELF_MARK}\n\nThe format follows Paper 2 as described in the 2015-2022 syllabus; the coursework paper is not simulated. ${confirm}`,
    minutes: 120,
    sections: [
      { title: "Section A (60 marks)", component: "2", instructions: "Answer all the questions.", rules: examSpread(S.zim, { type: "STRUCTURED", marks: 10, n: 6, topics: tops(S.zim) }) },
      { title: "Section B: Crop production (20 marks)", component: "2", instructions: "Answer one question.", answerCount: 1, marks: 20, rules: examSpread(S.zim, { type: "STRUCTURED", marks: 20, n: 3, topics: ["crops", "soil-water", "general", "structures", "business"] }) },
      { title: "Section B: Animal husbandry (20 marks)", component: "2", instructions: "Answer one question.", answerCount: 1, marks: 20, rules: examSpread(S.zim, { type: "STRUCTURED", marks: 20, n: 3, topics: ["animals"] }) },
    ],
  }),
];

// Cambridge 0600
const CAM = "Cambridge IGCSE Agriculture";
const camTests = safeTests(S.cam, "cambridge", [
  { key: "livestock-anatomy", title: "Livestock and animal anatomy", about: "livestock species, digestion and reproduction in farm animals", units: ["livestock", "anatomy"] },
]);
const camMocks = [
  mock(S.cam, {
    key: "mock.cambridge.paper-1",
    title: `Mock exam in the style of ${CAM} Paper 1 (Theory)`,
    description: `A full-length practice paper modelled on ${CAM} 0600 Paper 1 (Theory): seven compulsory 10-mark structured questions in Section A and a choice of 15-mark questions in Section B, answer two, 1 hour 45 minutes, 100 marks.`,
    instructions: `Answer **all** the questions in Section A and **two** questions from Section B. You have 1 hour 45 minutes.\n\n- If you answer more than two questions in Section B, your best two count.\n- Show your working in calculations.\n- ${SELF_MARK}\n\nThe format follows Paper 1 of the 2027-2028 syllabus; Section A question lengths in the real paper vary. The practical coursework is not simulated. ${confirm}`,
    minutes: 105,
    sections: [
      { title: "Section A (70 marks)", component: "1", instructions: "Answer all the questions.", rules: examSpread(S.cam, { type: "STRUCTURED", marks: 10, n: 7, topics: tops(S.cam) }) },
      { title: "Section B (30 marks)", component: "1", instructions: "Answer two questions.", answerCount: 2, marks: 30, rules: examSpread(S.cam, { type: "STRUCTURED", marks: 15, n: 5, topics: tops(S.cam) }) },
    ],
  }),
];

finish(S, { zim: { tests: zimTests, mocks: zimMocks, file: "zimsec" }, cam: { tests: camTests, mocks: camMocks, file: "cambridge" } }, {
  expectedMarks: { "mock.zimsec.paper-1": 40, "mock.zimsec.paper-2": 100, "mock.cambridge.paper-1": 100 },
});
