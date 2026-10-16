// Builds the business-a topic tests and mock exams (ZIMSEC A-Level Business Studies and Business Enterprise and Skills
// 2015-2022, Cambridge International AS & A Level Business 9609 2026-2028) with the shared helpers in
// .scratch/tools/assess-lib.mjs. Paper plan: .scratch/business-a/BRIEF.md ("Mock exams (built later by the lead)").
// Inputs: npx tsx --conditions=react-server .scratch/tools/inventory.ts business-a .scratch/business-a/inventory.json
// Run: node .scratch/business-a/build-assessments.mjs [--report] [--write]
import { disambiguateTitles, setup, autoTopicTests, topicTest, examSpread, mock, finish, SELF_MARK } from "../tools/assess-lib.mjs";

const S = setup("business-a", {
  zbs: "zimsec/a-level/business-studies/2015-2022",
  zbe: "zimsec/a-level/business-enterprise-skills/2015-2022",
  cam: "cambridge/a-level/business/2026-2028",
}, ".scratch/business-a/inventory.json");
const RES = [5, 8, 10, 12, 16, 20, 25, 30];
const tops = (s) => s.file.topics.map((t) => t.key);
const kids = (k) => S.cam.file.topics.find((t) => t.key === k).children.map((c) => c.key);
const ZBS = tops(S.zbs), ZBE = tops(S.zbe), AS = kids("as-content"), AL = kids("a-content");
const BS = "ZIMSEC A-Level Business Studies", BES = "ZIMSEC A-Level Business Enterprise and Skills", CAM = "Cambridge International AS & A Level Business 9609";
const confirm = "Check the instructions on your own examination papers.";
const conv = "Question sizes and part splits are our convention; real papers vary.";
const instr = (body) => `${body}\n\n- ${SELF_MARK}\n\n${conv} ${confirm}`;
const X = (s, type, marks, n, topics, skill) => examSpread(s, { type, marks, n, topics, skill, difficulty: [3, 5], full: true });

const zbsMocks = [
  mock(S.zbs, {
    key: "mock.zimsec-bs.paper-1", title: `Mock exam in the style of ${BS} Paper 1`, minutes: 180,
    description: `A practice paper modelled on ${BS} Paper 1: seven 10-mark structured questions and one 30-mark case study, 100 marks, 3 hours.`,
    instructions: instr("Answer **all** the questions. You have 3 hours. A calculator may be used."),
    sections: [
      { title: "Section A: Structured questions (70 marks)", component: "1", instructions: "Answer all the questions.", rules: X(S.zbs, "STRUCTURED", 10, 7, ZBS, "APPLICATION") },
      { title: "Section B: Case study (30 marks)", component: "1", instructions: "Answer the question.", rules: X(S.zbs, "STRUCTURED", 30, 1, ZBS, "ANALYSIS") },
    ],
  }),
  mock(S.zbs, {
    key: "mock.zimsec-bs.paper-2", title: `Mock exam in the style of ${BS} Paper 2`, minutes: 180,
    description: `A practice paper modelled on ${BS} Paper 2: a compulsory 25-mark data-response question, then three 25-mark essays chosen from nine, 100 marks, 3 hours.`,
    instructions: instr("Answer the question in **Section A** and **any three** questions from Section B. You have 3 hours.\n\n- Each essay is worth 25 marks: part (a) 10 marks, part (b) 15 marks."),
    sections: [
      { title: "Section A: Data response (25 marks)", component: "2", instructions: "Answer the question.", rules: X(S.zbs, "STRUCTURED", 25, 1, ZBS, "ANALYSIS") },
      { title: "Section B: Essays (75 marks)", component: "2", instructions: "Answer any three questions.", answerCount: 3, marks: 75, rules: X(S.zbs, "STRUCTURED", 25, 9, ZBS, "EVALUATION") },
    ],
  }),
];

const zbeMocks = [
  mock(S.zbe, {
    key: "mock.zimsec-bes.paper-1", title: `Mock exam in the style of ${BES} Paper 1`, minutes: 180,
    description: `A practice paper modelled on ${BES} Paper 1: four 10-mark structured questions and two 30-mark case studies, 100 marks, 3 hours.`,
    instructions: instr("Answer **all** the questions. You have 3 hours. A calculator may be used."),
    sections: [
      { title: "Section A: Structured questions (40 marks)", component: "1", instructions: "Answer all the questions.", rules: X(S.zbe, "STRUCTURED", 10, 4, ZBE, "APPLICATION") },
      { title: "Section B: Case studies (60 marks)", component: "1", instructions: "Answer both questions.", rules: X(S.zbe, "STRUCTURED", 30, 2, ZBE, "ANALYSIS") },
    ],
  }),
  mock(S.zbe, {
    key: "mock.zimsec-bes.paper-2", title: `Mock exam in the style of ${BES} Paper 2`, minutes: 180,
    description: `A practice paper modelled on ${BES} Paper 2: ten 25-mark essay questions, of which you answer any four, 100 marks, 3 hours.`,
    instructions: instr("Answer **any four** questions. You have 3 hours.\n\n- Each question is worth 25 marks: part (a) 10 marks, part (b) 15 marks.\n- If you answer more than four questions, your best four count."),
    sections: [{ title: "Paper 2: Essays (answer four)", component: "2", instructions: "Answer any four questions.", answerCount: 4, marks: 100, rules: X(S.zbe, "STRUCTURED", 25, 10, ZBE, "EVALUATION") }],
  }),
];

const camMocks = [
  mock(S.cam, {
    key: "mock.9609.paper-1", title: `Mock exam in the style of ${CAM} Paper 1`, minutes: 75,
    description: `A practice paper modelled on ${CAM} Paper 1 (AS Level business concepts 1): four 5-mark short-answer questions, then one 20-mark essay chosen from two, 40 marks, 1 hour 15 minutes.`,
    instructions: instr("Answer **all** the questions in Section A and **one** question from Section B. You have 1 hour 15 minutes."),
    sections: [
      { title: "Section A (20 marks)", component: "1", instructions: "Answer all the questions.", rules: X(S.cam, "STRUCTURED", 5, 4, AS, "APPLICATION") },
      { title: "Section B (20 marks)", component: "1", instructions: "Answer one question.", answerCount: 1, marks: 20, rules: X(S.cam, "STRUCTURED", 20, 2, AS, "EVALUATION") },
    ],
  }),
  mock(S.cam, {
    key: "mock.9609.paper-2", title: `Mock exam in the style of ${CAM} Paper 2`, minutes: 90,
    description: `A practice paper modelled on ${CAM} Paper 2 (AS Level business concepts 2): two compulsory 30-mark data-response questions, 60 marks, 1 hour 30 minutes.`,
    instructions: instr("Answer **both** questions. You have 1 hour 30 minutes. A calculator may be used."),
    sections: [{ title: "Paper 2: Data response", component: "2", instructions: "Answer both questions.", rules: X(S.cam, "STRUCTURED", 30, 2, AS, "APPLICATION") }],
  }),
  mock(S.cam, {
    key: "mock.9609.paper-3", title: `Mock exam in the style of ${CAM} Paper 3`, minutes: 105,
    description: `A practice paper modelled on ${CAM} Paper 3 (A Level business decision-making): two 8-mark questions, two 16-mark questions and a 12-mark extended response on case material, 60 marks, 1 hour 45 minutes.`,
    instructions: instr("Answer **all** the questions. You have 1 hour 45 minutes. A calculator may be used."),
    sections: [
      { title: "Questions 1 and 2 (16 marks)", component: "3", instructions: "Answer both questions.", rules: X(S.cam, "STRUCTURED", 8, 2, AL, "APPLICATION") },
      { title: "Questions 3 and 4 (32 marks)", component: "3", instructions: "Answer both questions.", rules: X(S.cam, "STRUCTURED", 16, 2, AL, "ANALYSIS") },
      { title: "Question 5 (12 marks)", component: "3", instructions: "Answer the question.", rules: X(S.cam, "EXTENDED_RESPONSE", 12, 1, AL, "EVALUATION") },
    ],
  }),
  mock(S.cam, {
    key: "mock.9609.paper-4", title: `Mock exam in the style of ${CAM} Paper 4`, minutes: 75,
    description: `A practice paper modelled on ${CAM} Paper 4 (A Level business strategy): two 20-mark essays, 40 marks, 1 hour 15 minutes.`,
    instructions: instr("Answer **both** questions. You have 1 hour 15 minutes.\n\n- Each question is worth 20 marks: part (a) 8 marks, part (b) 12 marks."),
    sections: [{ title: "Paper 4: Essays", component: "4", instructions: "Answer both questions.", rules: X(S.cam, "STRUCTURED", 20, 2, AL, "EVALUATION") }],
  }),
];

// Topics too small for a 20-mark test on their own are merged (filled in after the first --report).
const M = (key, title, units) => ({ key, title, about: title.charAt(0).toLowerCase() + title.slice(1), units });
const MERGE = {
  zbs: [M("ict-communication", "ICT in business and business communication", ["ict", "communication"])],
  zbe: [],
  cam: [
    M("objectives-stakeholders", "Business objectives and stakeholders", ["objectives", "stakeholders"]),
    M("marketing-research", "The nature of marketing and market research", ["marketing-nature", "market-research"]),
    M("inventory-capacity", "Inventory management and capacity utilisation", ["inventory", "capacity"]),
    M("cash-flow-budgets", "Cash flow forecasting and budgets", ["cash-flow", "budgets"]),
    M("communication-leadership", "Communication and leadership (A Level)", ["communication", "leadership"]),
    M("structure-hrm-strategy", "Organisational structure and human resource strategy (A Level)", ["organisational-structure", "hrm-strategy"]),
    M("location-quality", "Location, scale and quality management (A Level)", ["location-scale", "quality"]),
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
    zbs: { tests: tests(S.zbs, "zimsec-bs", MERGE.zbs), mocks: zbsMocks, file: "zimsec-bs" },
    zbe: { tests: tests(S.zbe, "zimsec-bes", MERGE.zbe), mocks: zbeMocks, file: "zimsec-bes" },
    cam: { tests: disambiguateTitles(tests(S.cam, "9609", MERGE.cam), (t) => (AL.some((k) => t.key.startsWith(`9609.${k}.`)) ? "A Level" : "AS")), mocks: camMocks, file: "cambridge" },
  },
  {
    expectedMarks: {
      "mock.zimsec-bs.paper-1": 100, "mock.zimsec-bs.paper-2": 100, "mock.zimsec-bes.paper-1": 100, "mock.zimsec-bes.paper-2": 100,
      "mock.9609.paper-1": 40, "mock.9609.paper-2": 60, "mock.9609.paper-3": 60, "mock.9609.paper-4": 40,
    },
  },
);
