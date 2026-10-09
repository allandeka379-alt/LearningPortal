// Builds the business-commerce-o topic tests and mock exams (ZIMSEC O-Level Commerce and Business Enterprise and
// Skills 2015-2022, Cambridge IGCSE Business 0264 2027-2029) with the shared helpers in .scratch/tools/assess-lib.mjs.
// Inputs: npx tsx --conditions=react-server .scratch/tools/inventory.ts business-commerce-o .scratch/business/inventory.json
// Run: node .scratch/business/build-assessments.mjs [--report] [--write]
import { setup, topicTest, autoTopicTests, examSpread, mcqSpread, mock, finish, SELF_MARK } from "../tools/assess-lib.mjs";

const S = setup("business-commerce-o", {
  com: "zimsec/o-level/commerce/2015-2022",
  bes: "zimsec/o-level/business-studies/2015-2022",
  cam: "cambridge/igcse/business-studies/2027-2029",
}, ".scratch/business/inventory.json");
const RESERVED = [6, 7, 16, 17, 20, 40, 80];
const confirm = "Check the instructions on your own examination papers.";
const tops = (s) => s.file.topics.map((t) => t.key);
const tests = (s, keyPrefix, merge = []) => {
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

// ZIMSEC Commerce
const comTests = tests(S.com, "zimsec-commerce", [
  { key: "transport-warehousing", title: "Transport and warehousing", about: "transport and warehousing", units: ["transport", "warehousing"] },
]);
const COM = "ZIMSEC O-Level Commerce";
const comMocks = [
  mock(S.com, {
    key: "mock.zimsec-commerce.paper-1",
    title: `Mock exam in the style of ${COM} Paper 1`,
    description: `A full-length practice paper modelled on ${COM} Paper 1 (multiple choice): 40 questions, 40 marks, 1 hour 15 minutes, on the whole syllabus.`,
    instructions: `Answer **all** 40 questions. You have 1 hour 15 minutes.\n\n- Each question is worth 1 mark. Choose the one best answer.\n- The paper is marked when you submit or when the time runs out.\n\nThe format follows Paper 1 as described in the 2015-2022 syllabus. ${confirm}`,
    minutes: 75,
    sections: [{ title: "Paper 1: Multiple choice", component: "1", instructions: "Answer all the questions.", rules: mcqSpread(S.com, { n: 40, topics: tops(S.com) }) }],
  }),
  mock(S.com, {
    key: "mock.zimsec-commerce.paper-2",
    title: `Mock exam in the style of ${COM} Paper 2`,
    description: `A full-length practice paper modelled on ${COM} Paper 2: six compulsory structured questions (Section A, 40 marks) and three essays chosen from seven (Section B, 60 marks), 2 hours, 100 marks.`,
    instructions: `Answer **all** the questions in Section A and **three** questions from Section B. You have 2 hours.\n\n- Section A questions are worth 6 or 7 marks; Section B essays are worth 20 marks each. If you answer more than three essays, your best three count.\n- ${SELF_MARK}\n\nThe format follows Paper 2 as described in the 2015-2022 syllabus; the marks of each Section A question are our convention. ${confirm}`,
    minutes: 120,
    sections: [
      { title: "Section A (40 marks)", component: "2", instructions: "Answer all the questions.", rules: [...examSpread(S.com, { type: "STRUCTURED", marks: 7, n: 4, topics: tops(S.com) }), ...examSpread(S.com, { type: "STRUCTURED", marks: 6, n: 2, topics: tops(S.com) })] },
      { title: "Section B (60 marks)", component: "2", instructions: "Answer three questions.", answerCount: 3, marks: 60, rules: examSpread(S.com, { type: "STRUCTURED", marks: 20, n: 7, topics: tops(S.com) }) },
    ],
  }),
];

// ZIMSEC Business Enterprise and Skills
const besTests = tests(S.bes, "zimsec-bes", [
  { key: "enterprise-environment", title: "Enterprise and the business environment", about: "enterprise, entrepreneurs and the business environment", units: ["enterprise", "environment"] },
]);
const BES = "ZIMSEC O-Level Business Enterprise and Skills";
const besMocks = [
  mock(S.bes, {
    key: "mock.zimsec-bes.paper-1",
    title: `Mock exam in the style of ${BES} Paper 1`,
    description: `A full-length practice paper modelled on ${BES} Paper 1: six compulsory structured questions on short scenarios, 1 hour 45 minutes, 100 marks.`,
    instructions: `Answer **all** six questions. You have 1 hour 45 minutes.\n\n- The questions are worth 16 or 17 marks. Show your working in calculations.\n- ${SELF_MARK}\n\nThe format follows Paper 1 as described in the 2015-2022 syllabus; the marks of each question are our convention. ${confirm}`,
    minutes: 105,
    sections: [{ title: "Paper 1 (100 marks)", component: "1", instructions: "Answer all the questions.", rules: [...examSpread(S.bes, { type: "STRUCTURED", marks: 17, n: 4, topics: tops(S.bes) }), ...examSpread(S.bes, { type: "STRUCTURED", marks: 16, n: 2, topics: tops(S.bes) })] }],
  }),
  mock(S.bes, {
    key: "mock.zimsec-bes.paper-2",
    title: `Mock exam in the style of ${BES} Paper 2`,
    description: `A full-length practice paper modelled on ${BES} Paper 2: one compulsory case study (Section A, 40 marks) and three essays chosen from six (Section B, 60 marks), 2 hours 15 minutes, 100 marks.`,
    instructions: `Answer the case study in Section A and **three** questions from Section B. You have 2 hours 15 minutes.\n\n- Read the case study carefully and use its data in your answers.\n- Section B essays are worth 20 marks each; if you answer more than three, your best three count.\n- ${SELF_MARK}\n\nThe format follows Paper 2 as described in the 2015-2022 syllabus. ${confirm}`,
    minutes: 135,
    sections: [
      { title: "Section A: Case study (40 marks)", component: "2", instructions: "Answer all parts.", rules: examSpread(S.bes, { type: "STRUCTURED", marks: 40, n: 1, topics: tops(S.bes) }) },
      { title: "Section B (60 marks)", component: "2", instructions: "Answer three questions.", answerCount: 3, marks: 60, rules: examSpread(S.bes, { type: "STRUCTURED", marks: 20, n: 6, topics: tops(S.bes) }) },
    ],
  }),
];

// Cambridge IGCSE Business 0264
const camTests = tests(S.cam, "cambridge");
const CAM = "Cambridge IGCSE Business";
const camMocks = [
  mock(S.cam, {
    key: "mock.cambridge.paper-1",
    title: `Mock exam in the style of ${CAM} Paper 1 (Short Answer and Data Response)`,
    description: `A full-length practice paper modelled on ${CAM} 0264 Paper 1: four compulsory 20-mark questions with stimulus material, 1 hour 30 minutes, 80 marks.`,
    instructions: `Answer **all** four questions. You have 1 hour 30 minutes.\n\n- Each question is worth 20 marks; the last part of each asks you to justify a decision.\n- ${SELF_MARK}\n\nThe format follows Paper 1 of the 2027-2029 syllabus; the part marks are our convention. ${confirm}`,
    minutes: 90,
    sections: [{ title: "Paper 1 (80 marks)", component: "1", instructions: "Answer all the questions.", rules: examSpread(S.cam, { type: "STRUCTURED", marks: 20, n: 4, topics: tops(S.cam) }) }],
  }),
  mock(S.cam, {
    key: "mock.cambridge.paper-2",
    title: `Mock exam in the style of ${CAM} Paper 2 (Case Study)`,
    description: `A full-length practice paper modelled on ${CAM} 0264 Paper 2: four compulsory 20-mark questions on one case study with appendices, 1 hour 30 minutes, 80 marks.`,
    instructions: `Read the case study and its appendices, then answer **all** four questions. You have 1 hour 30 minutes.\n\n- Apply every answer to the business in the case; part (b) of each question asks you to justify a decision.\n- ${SELF_MARK}\n\nThe format follows Paper 2 of the 2027-2029 syllabus. ${confirm}`,
    minutes: 90,
    sections: [{ title: "Paper 2: Case study (80 marks)", component: "2", instructions: "Answer all the questions.", rules: examSpread(S.cam, { type: "STRUCTURED", marks: 80, n: 1, topics: tops(S.cam) }) }],
  }),
];

finish(S, {
  com: { tests: comTests, mocks: comMocks, file: "zimsec-commerce" },
  bes: { tests: besTests, mocks: besMocks, file: "zimsec-bes" },
  cam: { tests: camTests, mocks: camMocks, file: "cambridge" },
}, {
  expectedMarks: { "mock.zimsec-commerce.paper-1": 40, "mock.zimsec-commerce.paper-2": 100, "mock.zimsec-bes.paper-1": 100, "mock.zimsec-bes.paper-2": 100, "mock.cambridge.paper-1": 80, "mock.cambridge.paper-2": 80 },
});
