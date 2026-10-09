// Builds the heritage-studies-o topic tests and mock exams (ZIMSEC O-Level Heritage Studies 2015-2022) with the shared
// helpers in .scratch/tools/assess-lib.mjs.
// Inputs: npx tsx --conditions=react-server .scratch/tools/inventory.ts heritage-studies-o .scratch/heritage-studies/inventory.json
// Run: node .scratch/heritage-studies/build-assessments.mjs [--report] [--write]
import { setup, autoTopicTests, examSpread, mcqSpread, mock, finish, SELF_MARK } from "../tools/assess-lib.mjs";

const S = setup("heritage-studies-o", { zim: "zimsec/o-level/heritage-studies/2015-2022" }, ".scratch/heritage-studies/inventory.json");
const tops = S.zim.file.topics.map((t) => t.key);
const ZIM = "ZIMSEC O-Level Heritage Studies";
const confirm = "Check the instructions on your own examination papers.";
const tests = autoTopicTests(S.zim, { keyPrefix: "zimsec", reserved: [10, 20] });
const mocks = [
  mock(S.zim, {
    key: "mock.zimsec.paper-1",
    title: `Mock exam in the style of ${ZIM} Paper 1`,
    description: `A full-length practice paper modelled on ${ZIM} Paper 1 (multiple choice): 40 questions, 40 marks, 1 hour 15 minutes, on all nine topics.`,
    instructions: `Answer **all** 40 questions. You have 1 hour 15 minutes.\n\n- Each question is worth 1 mark. Choose the one best answer.\n- The paper is marked when you submit or when the time runs out.\n\nThe format follows Paper 1 as described in the 2015-2022 syllabus. ${confirm}`,
    minutes: 75,
    sections: [{ title: "Paper 1: Multiple choice", component: "1", instructions: "Answer all the questions.", rules: mcqSpread(S.zim, { n: 40, topics: tops }) }],
  }),
  mock(S.zim, {
    key: "mock.zimsec.paper-2",
    title: `Mock exam in the style of ${ZIM} Paper 2`,
    description: `A full-length practice paper modelled on ${ZIM} Paper 2: six compulsory 10-mark structured questions (Section A) and a choice of 20-mark essays, answer two (Section B), 2 hours, 100 marks.`,
    instructions: `Answer **all** six questions in Section A and **two** essays from Section B. You have 2 hours.\n\n- Section A questions are worth 10 marks; Section B essays 20 marks. If you answer more than two essays, your best two count.\n- Use examples from Zimbabwe and refer to the Constitution where relevant.\n- ${SELF_MARK}\n\nThe format follows Paper 2 as described in the 2015-2022 syllabus; the number of essays offered is our assumption. ${confirm}`,
    minutes: 120,
    sections: [
      { title: "Section A (60 marks)", component: "2", instructions: "Answer all the questions.", rules: examSpread(S.zim, { type: "STRUCTURED", marks: 10, n: 6, topics: tops }) },
      { title: "Section B (40 marks)", component: "2", instructions: "Answer two questions.", answerCount: 2, marks: 40, rules: examSpread(S.zim, { type: "STRUCTURED", marks: 20, n: 4, topics: tops }) },
    ],
  }),
];
finish(S, { zim: { tests, mocks, file: "zimsec" } }, { expectedMarks: { "mock.zimsec.paper-1": 40, "mock.zimsec.paper-2": 100 } });
