// Builds the computer-science-o topic tests and mock exams (ZIMSEC O-Level Computer Science 2015-2022, Cambridge
// IGCSE Computer Science 0478 2026-2028) with the shared helpers in .scratch/tools/assess-lib.mjs.
// Inputs: npx tsx --conditions=react-server .scratch/tools/inventory.ts computer-science-o .scratch/computer-science/inventory.json
// Run: node .scratch/computer-science/build-assessments.mjs [--report] [--write]
import { setup, topicTest, autoTopicTests, examSpread, mcqSpread, mock, finish, SELF_MARK } from "../tools/assess-lib.mjs";

const S = setup("computer-science-o", { zim: "zimsec/o-level/computer-science/2015-2022", cam: "cambridge/igcse/computer-science/2026-2028" }, ".scratch/computer-science/inventory.json");
const RESERVED = [10, 12, 15];
const confirm = "Check the instructions on your own examination papers.";

// ZIMSEC
const zimTops = S.zim.file.topics.map((t) => t.key);
const zimTests = autoTopicTests(S.zim, { keyPrefix: "zimsec", reserved: RESERVED });
const zimMocks = [
  mock(S.zim, {
    key: "mock.zimsec.paper-1",
    title: "Mock exam in the style of ZIMSEC O-Level Computer Science Paper 1",
    description: "A full-length practice paper modelled on ZIMSEC O-Level Computer Science Paper 1 (multiple choice): 40 questions, 40 marks, 1 hour, on the whole syllabus.",
    instructions: `Answer **all** 40 questions. You have 1 hour.\n\n- Each question is worth 1 mark. Choose the one best answer.\n- The paper is marked when you submit or when the time runs out.\n\nThe format follows Paper 1 as described in the 2015-2022 syllabus. ${confirm}`,
    minutes: 60,
    sections: [{ title: "Paper 1: Multiple choice", component: "1", instructions: "Answer all the questions.", rules: mcqSpread(S.zim, { n: 40, topics: zimTops }) }],
  }),
  mock(S.zim, {
    key: "mock.zimsec.paper-2",
    title: "Mock exam in the style of ZIMSEC O-Level Computer Science Paper 2",
    description: "A full-length practice paper modelled on ZIMSEC O-Level Computer Science Paper 2 (structured): ten compulsory 10-mark structured questions on the whole syllabus, 2 hours, 100 marks.",
    instructions: `Answer **all** the questions. You have 2 hours.\n\n- Each question is worth 10 marks. Show your working in conversions and calculations.\n- ${SELF_MARK}\n\nThe syllabus describes Paper 2 as 10 to 12 compulsory structured questions; this practice paper uses ten. The practical paper, school-based assessment and project are not simulated. ${confirm}`,
    minutes: 120,
    sections: [{ title: "Paper 2: Structured questions (100 marks)", component: "2", instructions: "Answer all the questions.", rules: examSpread(S.zim, { type: "STRUCTURED", marks: 10, n: 10, topics: zimTops }) }],
  }),
];

// Cambridge 0478
const camTops = S.cam.file.topics.map((t) => t.key);
const P1_TOPICS = ["data-representation", "data-transmission", "hardware", "software", "internet", "automated-emerging"];
const P2_TOPICS = ["algorithm-design", "programming", "databases", "boolean-logic"];
const camTests = autoTopicTests(S.cam, { keyPrefix: "cambridge", reserved: RESERVED, skip: ["databases"] });
camTests.push(topicTest(S.cam, { key: "databases", title: "Databases and Boolean logic", about: "single-table databases, SQL, logic gates and truth tables", topics: ["databases", "boolean-logic"], units: ["databases", "boolean-logic"], keyPrefix: "cambridge", reserved: RESERVED }));
const camMocks = [
  mock(S.cam, {
    key: "mock.cambridge.paper-1",
    title: "Mock exam in the style of Cambridge IGCSE Computer Science Paper 1 (Computer Systems)",
    description: "A full-length practice paper modelled on Cambridge IGCSE Computer Science 0478 Paper 1 (Computer Systems): five compulsory 15-mark structured questions on topics 1-6, 1 hour 45 minutes, 75 marks.",
    instructions: `Answer **all** the questions. You have 1 hour 45 minutes. Calculators are not allowed.\n\n- Each question is worth 15 marks.\n- ${SELF_MARK}\n\nThe format follows Paper 1 of the 2026-2028 syllabus; the real paper's questions vary in length. ${confirm}`,
    minutes: 105,
    sections: [{ title: "Paper 1 (75 marks)", component: "1", instructions: "Answer all the questions.", rules: examSpread(S.cam, { type: "STRUCTURED", marks: 15, n: 5, topics: P1_TOPICS }) }],
  }),
  mock(S.cam, {
    key: "mock.cambridge.paper-2",
    title: "Mock exam in the style of Cambridge IGCSE Computer Science Paper 2 (Algorithms, Programming and Logic)",
    description: "A full-length practice paper modelled on Cambridge IGCSE Computer Science 0478 Paper 2 (Algorithms, Programming and Logic): five 12-mark structured questions on topics 7-10 and a 15-mark scenario question, 1 hour 45 minutes, 75 marks.",
    instructions: `Answer **all** the questions. You have 1 hour 45 minutes. Calculators are not allowed.\n\n- Write algorithms in pseudocode (or Python, Visual Basic or Java for the scenario question).\n- The final scenario question is worth 15 marks: plan your solution before you write it.\n- ${SELF_MARK}\n\nThe format follows Paper 2 of the 2026-2028 syllabus; the real paper's questions vary in length. ${confirm}`,
    minutes: 105,
    sections: [
      { title: "Structured questions (60 marks)", component: "2", instructions: "Answer all the questions.", rules: examSpread(S.cam, { type: "STRUCTURED", marks: 12, n: 5, topics: P2_TOPICS }) },
      { title: "Scenario question (15 marks)", component: "2", instructions: "Answer this question.", rules: examSpread(S.cam, { type: "EXTENDED_RESPONSE", marks: 15, n: 1, topics: P2_TOPICS }) },
    ],
  }),
];

void camTops;
finish(S, { zim: { tests: zimTests, mocks: zimMocks, file: "zimsec" }, cam: { tests: camTests, mocks: camMocks, file: "cambridge" } }, {
  expectedMarks: { "mock.zimsec.paper-1": 40, "mock.zimsec.paper-2": 100, "mock.cambridge.paper-1": 75, "mock.cambridge.paper-2": 75 },
});
