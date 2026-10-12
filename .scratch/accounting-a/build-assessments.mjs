// Builds the accounting-a topic tests and mock exams (ZIMSEC A-Level Accounting 2015-2022, Cambridge International AS & A Level
// Accounting 9706 2026-2028) with the shared helpers in .scratch/tools/assess-lib.mjs. Paper plan: .scratch/accounting-a/BRIEF.md.
// Inputs: npx tsx --conditions=react-server .scratch/tools/inventory.ts accounting-a .scratch/accounting-a/inventory.json
// Run: node .scratch/accounting-a/build-assessments.mjs [--report] [--write]
import { disambiguateTitles, setup, autoTopicTests, topicTest, examSpread, mcqSpread, mock, finish, SELF_MARK } from "../tools/assess-lib.mjs";

const S = setup("accounting-a", { zim: "zimsec/a-level/accounting/2015-2022", cam: "cambridge/a-level/accounting/2026-2028" }, ".scratch/accounting-a/inventory.json");
const RES = [15, 25, 30];
const kids = (k) => S.cam.file.topics.find((t) => t.key === k).children.map((c) => c.key);
const AS = kids("as-content"), AL = kids("a-level-content");
const AS_COST = ["costs", "traditional-costing"], AS_FIN = AS.filter((k) => !AS_COST.includes(k));
const AL_COST = ["abc", "standard-costing", "budgeting", "investment-appraisal"], AL_FIN = AL.filter((k) => !AL_COST.includes(k));
const ZIM_FIN = ["financial-accounting", "financial-reporting"], ZIM_COST = ["cost-accounting", "management-accounting"];
const ZIM_ALL = [...ZIM_FIN, ...ZIM_COST];
const ZIM = "ZIMSEC A-Level Accounting", CAM = "Cambridge International AS & A Level Accounting 9706";
const confirm = "Check the instructions on your own examination papers.";
const conv = "Question sizes and part splits are our convention; real papers vary.";
const instr = (body) => `${body}\n\n- ${SELF_MARK}\n\n${conv} ${confirm}`;
const mcqInstr = (n, time) => `Answer **all** ${n} questions. You have ${time}.\n\n- Each question is worth 1 mark. Choose the one best answer.\n\n${confirm}`;
const X = (s, marks, n, topics, skill, type = "STRUCTURED") => examSpread(s, { type, marks, n, topics, skill, difficulty: [3, 5], full: true });

const zimMocks = [
  mock(S.zim, {
    key: "mock.zimsec.paper-1", title: `Mock exam in the style of ${ZIM} Paper 1`, minutes: 80,
    description: `A practice paper modelled on ${ZIM} Paper 1: 40 multiple-choice questions, 40 marks, 1 hour 20 minutes.`,
    instructions: mcqInstr(40, "1 hour 20 minutes"),
    sections: [{ title: "Paper 1: Multiple choice", component: "1", instructions: "Answer all the questions.", rules: [...mcqSpread(S.zim, { n: 30, topics: ZIM_FIN }), ...mcqSpread(S.zim, { n: 10, topics: ZIM_COST })] }],
  }),
  mock(S.zim, {
    key: "mock.zimsec.paper-2", title: `Mock exam in the style of ${ZIM} Paper 2`, minutes: 105,
    description: `A practice paper modelled on ${ZIM} Paper 2: four compulsory 25-mark structured questions (three financial, one cost and management), 100 marks, 1 hour 45 minutes.`,
    instructions: instr("Answer **all** four questions. You have 1 hour 45 minutes. A calculator may be used."),
    sections: [{ title: "Paper 2: Structured questions", component: "2", instructions: "Answer all the questions.", rules: [...X(S.zim, 25, 3, ZIM_FIN, "APPLICATION"), ...X(S.zim, 25, 1, ZIM_COST, "APPLICATION")] }],
  }),
  mock(S.zim, {
    key: "mock.zimsec.paper-3", title: `Mock exam in the style of ${ZIM} Paper 3`, minutes: 150,
    description: `A practice paper in the style of ${ZIM} Paper 3: three 25-mark financial accounting problems and one 25-mark cost question, 100 marks, 2 hours 30 minutes. Continuous assessment is not simulated.`,
    instructions: instr("Answer **all** four questions. You have 2 hours 30 minutes. A calculator may be used."),
    sections: [{ title: "Paper 3: Problem solving", component: "3", instructions: "Answer all the questions.", rules: [...X(S.zim, 25, 3, ZIM_FIN, "ANALYSIS"), ...X(S.zim, 25, 1, ZIM_COST, "EVALUATION")] }],
  }),
];

const camMocks = [
  mock(S.cam, {
    key: "mock.9706.paper-1", title: `Mock exam in the style of ${CAM} Paper 1`, minutes: 60,
    description: `A practice paper modelled on ${CAM} Paper 1 (AS Level multiple choice): 30 questions, 30 marks, 1 hour.`,
    instructions: mcqInstr(30, "1 hour"),
    sections: [{ title: "Paper 1: Multiple choice", component: "1", instructions: "Answer all the questions.", rules: [...mcqSpread(S.cam, { n: 22, topics: AS_FIN }), ...mcqSpread(S.cam, { n: 8, topics: AS_COST })] }],
  }),
  mock(S.cam, {
    key: "mock.9706.paper-2", title: `Mock exam in the style of ${CAM} Paper 2`, minutes: 105,
    description: `A practice paper modelled on ${CAM} Paper 2 (AS Level structured questions): a 30-mark financial statements question, two 15-mark financial accounting questions and a 30-mark cost and management question, 90 marks, 1 hour 45 minutes.`,
    instructions: instr("Answer **all** the questions. You have 1 hour 45 minutes. A calculator may be used."),
    sections: [{
      title: "Paper 2: AS Level structured questions", component: "2", instructions: "Answer all the questions.",
      rules: [...X(S.cam, 30, 1, AS_FIN, "APPLICATION"), ...X(S.cam, 15, 2, AS_FIN, "APPLICATION"), ...X(S.cam, 30, 1, AS_COST, "ANALYSIS")],
    }],
  }),
  mock(S.cam, {
    key: "mock.9706.paper-3", title: `Mock exam in the style of ${CAM} Paper 3`, minutes: 90,
    description: `A practice paper modelled on ${CAM} Paper 3 (A Level financial accounting): three 25-mark questions, 75 marks, 1 hour 30 minutes.`,
    instructions: instr("Answer **all** the questions. You have 1 hour 30 minutes. A calculator may be used."),
    sections: [{ title: "Paper 3: A Level financial accounting", component: "3", instructions: "Answer all the questions.", rules: X(S.cam, 25, 3, AL_FIN, "ANALYSIS") }],
  }),
  mock(S.cam, {
    key: "mock.9706.paper-4", title: `Mock exam in the style of ${CAM} Paper 4`, minutes: 60,
    description: `A practice paper modelled on ${CAM} Paper 4 (A Level cost and management accounting): two 25-mark questions, 50 marks, 1 hour.`,
    instructions: instr("Answer **all** the questions. You have 1 hour. A calculator may be used."),
    sections: [{ title: "Paper 4: A Level cost and management accounting", component: "4", instructions: "Answer all the questions.", rules: X(S.cam, 25, 2, AL_COST, "EVALUATION") }],
  }),
];

// Topics too small for a 20-mark test on their own are merged (filled in after the first --report).
const MERGE = {
  zim: [],
  cam: [
    { key: "computerised-analysis-a", title: "Computerised accounting and financial analysis (A Level)", about: "computerised accounting and financial analysis (A Level)", units: ["computerised", "analysis-a"] },
    { key: "abc-standard-costing", title: "Activity-based and standard costing (A Level)", about: "activity-based and standard costing (A Level)", units: ["abc", "standard-costing"] },
  ],
};
const tests = (s, keyPrefix, merge) => {
  const out = autoTopicTests(s, { keyPrefix, reserved: RES, skip: merge.flatMap((m) => m.units) });
  for (const m of merge) {
    try {
      out.push(topicTest(s, { ...m, topics: m.units, keyPrefix, reserved: RES }));
    } catch (error) {
      s.S.problems.push(`merged topic test ${m.key}@${s.ref} skipped: ${error.message}`);
    }
  }
  return out;
};

finish(
  S,
  {
    zim: { tests: tests(S.zim, "zimsec", MERGE.zim), mocks: zimMocks, file: "zimsec" },
    cam: { tests: disambiguateTitles(tests(S.cam, "9706", MERGE.cam), (t) => (AL.some((k) => t.key.startsWith(`9706.${k}.`)) ? "A Level" : "AS")), mocks: camMocks, file: "cambridge" },
  },
  {
    expectedMarks: {
      "mock.zimsec.paper-1": 40, "mock.zimsec.paper-2": 100, "mock.zimsec.paper-3": 100,
      "mock.9706.paper-1": 30, "mock.9706.paper-2": 90, "mock.9706.paper-3": 75, "mock.9706.paper-4": 50,
    },
  },
);
