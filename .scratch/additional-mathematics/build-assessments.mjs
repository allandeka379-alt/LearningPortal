// Builds the additional-mathematics-o topic tests and mock exams (ZIMSEC O-Level Additional Mathematics 2015-2022 and
// Cambridge IGCSE Additional Mathematics 0606 2025-2027) with the shared helpers in .scratch/tools/assess-lib.mjs.
// Inputs: npx tsx --conditions=react-server .scratch/tools/inventory.ts additional-mathematics-o .scratch/additional-mathematics/inventory.json
// Run: node .scratch/additional-mathematics/build-assessments.mjs [--report] [--write]
import { setup, autoTopicTests, topicTest, examRule, examSpread, mock, finish, SELF_MARK } from "../tools/assess-lib.mjs";

const S = setup(
  "additional-mathematics-o",
  { zim: "zimsec/o-level/additional-mathematics/2015-2022", cam: "cambridge/igcse/additional-mathematics/2025-2027" },
  ".scratch/additional-mathematics/inventory.json",
);
const RES = [8, 10, 12, 13];
const kids = (s, k) => s.file.topics.find((t) => t.key === k).children.map((c) => c.key);
const PURE = kids(S.zim, "pure");
const CAMT = S.cam.file.topics.map((t) => t.key);
const ZIM = "ZIMSEC O-Level Additional Mathematics", CAM = "Cambridge IGCSE Additional Mathematics 0606";
const confirm = "Check the instructions on your own examination papers.";
const conv = "The marks per question are our convention; real papers vary question by question.";

const zimMocks = [
  mock(S.zim, {
    key: "mock.zimsec.paper-1",
    title: `Mock exam in the style of ${ZIM} Paper 1`,
    description: `A full-length practice paper modelled on ${ZIM} Paper 1 (Pure Mathematics): four compulsory 13-mark questions and four 12-mark questions chosen from six, 2 hours 30 minutes, 100 marks.`,
    instructions: `Answer **all** questions in Section A and **any four** questions in Section B. You have 2 hours 30 minutes.\n\n- Show all your working. A calculator may be used.\n- If you answer more than four questions in Section B, your best four count.\n- ${SELF_MARK}\n\n${conv} ${confirm}`,
    minutes: 150,
    sections: [
      { title: "Section A (52 marks)", component: "1", instructions: "Answer all the questions.", rules: examSpread(S.zim, { type: "STRUCTURED", marks: 13, n: 4, topics: PURE }) },
      { title: "Section B (48 marks)", component: "1", instructions: "Answer any four questions.", answerCount: 4, marks: 48, rules: examSpread(S.zim, { type: "STRUCTURED", marks: 12, n: 6, topics: PURE }) },
    ],
  }),
  mock(S.zim, {
    key: "mock.zimsec.paper-2",
    title: `Mock exam in the style of ${ZIM} Paper 2`,
    description: `A full-length practice paper modelled on ${ZIM} Paper 2 (Mechanics and Statistics): four compulsory 10-mark questions and five 12-mark questions chosen from fourteen, 2 hours 30 minutes, 100 marks.`,
    instructions: `Answer **all** questions in Section A and **any five** questions from Sections B and C. You have 2 hours 30 minutes.\n\n- Show all your working. A calculator may be used. Take $g = 9.8$ m s$^{-2}$ unless a question says otherwise.\n- If you answer more than five questions from Sections B and C, your best five count.\n- ${SELF_MARK}\n\n${conv} ${confirm}`,
    minutes: 150,
    sections: [
      { title: "Section A (40 marks)", component: "2", instructions: "Answer all the questions.", rules: [examRule("mechanics", "STRUCTURED", 10, 2), examRule("statistics", "STRUCTURED", 10, 2)] },
      { title: "Sections B and C (60 marks)", component: "2", instructions: "Answer any five questions: Section B is Mechanics, Section C is Probability and Statistics.", answerCount: 5, marks: 60, rules: [examRule("mechanics", "STRUCTURED", 12, 7), examRule("statistics", "STRUCTURED", 12, 7)] },
    ],
  }),
];
const camMocks = [
  mock(S.cam, {
    key: "mock.0606.paper-1",
    title: `Mock exam in the style of ${CAM} Paper 1`,
    description: `A full-length practice paper modelled on ${CAM} Paper 1 (non-calculator): ten 8-mark structured questions, 2 hours, 80 marks.`,
    instructions: `Answer **all** the questions. You have 2 hours.\n\n- **No calculator** is allowed on this paper: give exact answers.\n- Show all your working.\n- ${SELF_MARK}\n\n${conv} ${confirm}`,
    minutes: 120,
    sections: [{ title: "Paper 1 (80 marks)", component: "1", instructions: "Answer all the questions.", rules: examSpread(S.cam, { type: "STRUCTURED", marks: 8, n: 10, topics: CAMT }) }],
  }),
  mock(S.cam, {
    key: "mock.0606.paper-2",
    title: `Mock exam in the style of ${CAM} Paper 2`,
    description: `A full-length practice paper modelled on ${CAM} Paper 2 (calculator): eight 10-mark structured questions, 2 hours, 80 marks.`,
    instructions: `Answer **all** the questions. You have 2 hours.\n\n- A calculator may be used. Give non-exact answers to 3 significant figures, angles in degrees to 1 decimal place.\n- Show all your working.\n- ${SELF_MARK}\n\n${conv} ${confirm}`,
    minutes: 120,
    sections: [{ title: "Paper 2 (80 marks)", component: "2", instructions: "Answer all the questions.", rules: examSpread(S.cam, { type: "STRUCTURED", marks: 10, n: 8, topics: CAMT }) }],
  }),
];
// Topics too small for a 20-mark test on their own are merged.
const tests = (s, keyPrefix, merge) => {
  const out = autoTopicTests(s, { keyPrefix, reserved: RES, skip: merge.flatMap((m) => m.units) });
  for (const m of merge) out.push(topicTest(s, { ...m, topics: m.units, keyPrefix, reserved: RES }));
  return out;
};
const zimMerge = [
  { key: "coordinate-functions-quadratics", title: "Coordinate geometry, functions and quadratics", about: "coordinate geometry, functions and quadratics", units: ["coordinate", "functions", "quadratics"] },
  { key: "normal-sampling-estimation", title: "The normal distribution, sampling and estimation", about: "the normal distribution, sampling and estimation", units: ["normal", "sampling", "estimation"] },
];
const camMerge = [
  { key: "equations-simultaneous", title: "Equations, inequalities and simultaneous equations", about: "modulus equations and inequalities, substitution, cubics and simultaneous equations", units: ["equations", "simultaneous"] },
];
finish(
  S,
  {
    zim: { tests: tests(S.zim, "zimsec", zimMerge), mocks: zimMocks, file: "zimsec" },
    cam: { tests: tests(S.cam, "0606", camMerge), mocks: camMocks, file: "cambridge" },
  },
  { expectedMarks: { "mock.zimsec.paper-1": 100, "mock.zimsec.paper-2": 100, "mock.0606.paper-1": 80, "mock.0606.paper-2": 80 } },
);
