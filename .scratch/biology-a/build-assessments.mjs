// Builds the biology-a topic tests and mock exams (ZIMSEC A-Level Biology 2015-2022, Cambridge AS & A Level Biology 9700
// 2025-2027) with the shared helpers in .scratch/tools/assess-lib.mjs. Paper plan: .scratch/biology-a/BRIEF.md.
// Inputs: npx tsx --conditions=react-server .scratch/tools/inventory.ts biology-a .scratch/biology-a/inventory.json
// Run: node .scratch/biology-a/build-assessments.mjs [--report] [--write]
import { setup, autoTopicTests, topicTest, examSpread, mcqSpread, mock, finish, SELF_MARK } from "../tools/assess-lib.mjs";

const S = setup("biology-a", { zim: "zimsec/a-level/biology/2015-2022", cam: "cambridge/a-level/biology/2025-2027" }, ".scratch/biology-a/inventory.json");
const RES = [10, 15, 20, 25];
const ZT = S.zim.file.topics.map((t) => t.key);
const kids = (k) => S.cam.file.topics.find((t) => t.key === k).children.map((c) => c.key);
const AS = kids("as-content"), AL = kids("a-level-content"), CAM_ALL = [...AS, ...AL, ...kids("practical-skills")];
const ZIM = "ZIMSEC A-Level Biology", CAM = "Cambridge International AS & A Level Biology 9700";
const confirm = "Check the instructions on your own examination papers.";
const conv = "Question sizes and part splits are our convention; real papers vary.";
const S10 = (s, n, topics) => examSpread(s, { type: "STRUCTURED", marks: 10, n, topics, skill: "APPLICATION" });
const one = (s, marks, skill, topics) => examSpread(s, { type: "STRUCTURED", marks, n: 1, topics, skill, difficulty: [3, 5] });
const instr = (body) => `${body}\n\n- ${SELF_MARK}\n\n${conv} ${confirm}`;
const mcqInstr = (n, time) => `Answer **all** ${n} questions. You have ${time}.\n\n- Each question is worth 1 mark. Choose the one best answer.\n\n${confirm}`;

const zimMocks = [
  mock(S.zim, {
    key: "mock.zimsec.paper-1", title: `Mock exam in the style of ${ZIM} Paper 1`, minutes: 60,
    description: `A practice paper modelled on ${ZIM} Paper 1: 40 multiple-choice questions, 40 marks, 1 hour.`,
    instructions: mcqInstr(40, "1 hour"),
    sections: [{ title: "Paper 1: Multiple choice", component: "1", instructions: "Answer all the questions.", rules: mcqSpread(S.zim, { n: 40, topics: ZT }) }],
  }),
  mock(S.zim, {
    key: "mock.zimsec.paper-2", title: `Mock exam in the style of ${ZIM} Paper 2`, minutes: 90,
    description: `A practice paper modelled on ${ZIM} Paper 2: six compulsory 10-mark structured questions, 60 marks, 1 hour 30 minutes.`,
    instructions: instr("Answer **all** the questions. You have 1 hour 30 minutes. A calculator may be used."),
    sections: [{ title: "Paper 2: Structured questions", component: "2", instructions: "Answer all the questions.", rules: S10(S.zim, 6, ZT) }],
  }),
  mock(S.zim, {
    key: "mock.zimsec.paper-3", title: `Mock exam in the style of ${ZIM} Paper 3`, minutes: 120,
    description: `A practice paper modelled on ${ZIM} Paper 3: five 20-mark free-response questions chosen from seven, 100 marks, 2 hours.`,
    instructions: instr("Answer **any five** questions. You have 2 hours. If you answer more than five, your best five count."),
    sections: [{ title: "Paper 3: Free response", component: "3", instructions: "Answer any five questions.", answerCount: 5, marks: 100, rules: examSpread(S.zim, { type: "STRUCTURED", marks: 20, n: 7, topics: ZT, skill: "EVALUATION", difficulty: [4, 5] }) }],
  }),
  mock(S.zim, {
    key: "mock.zimsec.paper-4", title: `Mock exam in the style of ${ZIM} Paper 4 (written practical skills)`, minutes: 150,
    description: `A written practice paper in the style of ${ZIM} Paper 4: an investigation, a microscopy question and a planning question, 50 marks. The hands-on practical is not simulated.`,
    instructions: instr("Answer **all** the questions. You have 2 hours 30 minutes. Describe in words what your tables and drawings would show."),
    sections: [{
      title: "Paper 4: Practical skills (written)", component: "4", instructions: "Answer all the questions.",
      rules: [...one(S.zim, 20, "ANALYSIS", ZT), ...one(S.zim, 15, "APPLICATION", ZT), ...one(S.zim, 15, "EVALUATION", ZT)],
    }],
  }),
];

const camMocks = [
  mock(S.cam, {
    key: "mock.9700.paper-1", title: `Mock exam in the style of ${CAM} Paper 1`, minutes: 75,
    description: `A practice paper modelled on ${CAM} Paper 1 (AS Level): 40 multiple-choice questions, 40 marks, 1 hour 15 minutes.`,
    instructions: mcqInstr(40, "1 hour 15 minutes"),
    sections: [{ title: "Paper 1: Multiple choice", component: "1", instructions: "Answer all the questions.", rules: mcqSpread(S.cam, { n: 40, topics: AS }) }],
  }),
  mock(S.cam, {
    key: "mock.9700.paper-2", title: `Mock exam in the style of ${CAM} Paper 2`, minutes: 75,
    description: `A practice paper modelled on ${CAM} Paper 2 (AS Level structured questions): six 10-mark questions, 60 marks, 1 hour 15 minutes.`,
    instructions: instr("Answer **all** the questions. You have 1 hour 15 minutes."),
    sections: [{ title: "Paper 2: AS Level structured questions", component: "2", instructions: "Answer all the questions.", rules: S10(S.cam, 6, AS) }],
  }),
  mock(S.cam, {
    key: "mock.9700.paper-3", title: `Mock exam in the style of ${CAM} Paper 3 (written)`, minutes: 120,
    description: `A written practice paper in the style of ${CAM} Paper 3 (Advanced Practical Skills): an investigation and a microscopy question, 40 marks. The hands-on practical is not simulated.`,
    instructions: instr("Answer **all** the questions. You have 2 hours. Describe in words what your tables and drawings would show."),
    sections: [{
      title: "Paper 3: Practical skills (written)", component: "3", instructions: "Answer all the questions.",
      rules: [...one(S.cam, 25, "ANALYSIS", CAM_ALL), ...one(S.cam, 15, "APPLICATION", CAM_ALL)],
    }],
  }),
  mock(S.cam, {
    key: "mock.9700.paper-4", title: `Mock exam in the style of ${CAM} Paper 4`, minutes: 120,
    description: `A practice paper modelled on ${CAM} Paper 4 (A Level structured questions): ten 10-mark questions, 100 marks, 2 hours.`,
    instructions: instr("Answer **all** the questions. You have 2 hours."),
    sections: [{ title: "Paper 4: A Level structured questions", component: "4", instructions: "Answer all the questions.", rules: S10(S.cam, 10, AL) }],
  }),
  mock(S.cam, {
    key: "mock.9700.paper-5", title: `Mock exam in the style of ${CAM} Paper 5`, minutes: 75,
    description: `A practice paper modelled on ${CAM} Paper 5 (Planning, Analysis and Evaluation): a planning question and a data-analysis question, 30 marks, 1 hour 15 minutes.`,
    instructions: instr("Answer **all** the questions. You have 1 hour 15 minutes. A calculator may be used."),
    sections: [{
      title: "Paper 5: Planning, analysis and evaluation", component: "5", instructions: "Answer all the questions.",
      rules: [...one(S.cam, 15, "EVALUATION", CAM_ALL), ...one(S.cam, 15, "ANALYSIS", CAM_ALL)],
    }],
  }),
];

// Topics too small for a 20-mark test on their own are merged (filled in after the first --report).
const MERGE = {
  zim: [],
  cam: [{ key: "mammal-transport-gas-exchange", title: "Transport in mammals and gas exchange", about: "transport in mammals and the gas exchange system", units: ["mammal-transport", "gas-exchange"] }],
};
const tests = (s, keyPrefix, merge) => {
  const out = autoTopicTests(s, { keyPrefix, reserved: RES, skip: merge.flatMap((m) => m.units) });
  for (const m of merge) out.push(topicTest(s, { ...m, topics: m.units, keyPrefix, reserved: RES }));
  return out;
};

finish(
  S,
  {
    zim: { tests: tests(S.zim, "zimsec", MERGE.zim), mocks: zimMocks, file: "zimsec" },
    cam: { tests: tests(S.cam, "9700", MERGE.cam), mocks: camMocks, file: "cambridge" },
  },
  {
    expectedMarks: {
      "mock.zimsec.paper-1": 40, "mock.zimsec.paper-2": 60, "mock.zimsec.paper-3": 100, "mock.zimsec.paper-4": 50,
      "mock.9700.paper-1": 40, "mock.9700.paper-2": 60, "mock.9700.paper-3": 40, "mock.9700.paper-4": 100, "mock.9700.paper-5": 30,
    },
  },
);
