// Builds the religious-studies-o topic tests and mock exams (ZIMSEC O-Level Family and Religious Studies 2015-2022) with
// the shared helpers in .scratch/tools/assess-lib.mjs. Paper plan: .scratch/religious-studies/BRIEF.md (our convention).
// Inputs: npx tsx --conditions=react-server .scratch/tools/inventory.ts religious-studies-o .scratch/religious-studies/inventory.json
// Run: node .scratch/religious-studies/build-assessments.mjs [--report] [--write]
import { setup, autoTopicTests, examSpread, mock, finish, SELF_MARK } from "../tools/assess-lib.mjs";

const S = setup("religious-studies-o", { zim: "zimsec/o-level/religious-studies/2015-2022" }, ".scratch/religious-studies/inventory.json");
const kids = (k) => S.zim.file.topics.find((t) => t.key === k).children.map((c) => c.key);
const REL = kids("religions"), ISS = kids("contemporary-issues");
const ZIM = "ZIMSEC O-Level Family and Religious Studies";
const confirm = "Check the instructions on your own examination papers.";
const instr = (scope) =>
  `Answer **any four** questions. You have 2 hours 30 minutes. Each question is worth 25 marks: part (a) 15 marks and part (b) 10 marks.\n\n- ${scope}\n- If you answer more than four questions, your best four count.\n- ${SELF_MARK}\n\nThe paper structure and the 15 + 10 split are our convention: the syllabus gives only the paper totals. ${confirm}`;

const mocks = [
  mock(S.zim, {
    key: "mock.zimsec.paper-1", title: `Mock exam in the style of ${ZIM} Paper 1`, minutes: 150,
    description: `A practice paper in the style of ${ZIM} Paper 1 (religions): four 25-mark questions chosen from eight, 100 marks, 2 hours 30 minutes.`,
    instructions: instr("The questions cover the concept of religion, Indigenous Religion, Judaism, Christianity and Islam."),
    sections: [{ title: "Paper 1: Religions", component: "1", instructions: "Answer any four questions.", answerCount: 4, marks: 100, rules: examSpread(S.zim, { type: "STRUCTURED", marks: 25, n: 8, topics: REL, difficulty: [3, 5], full: true }) }],
  }),
  mock(S.zim, {
    key: "mock.zimsec.paper-2", title: `Mock exam in the style of ${ZIM} Paper 2`, minutes: 150,
    description: `A practice paper in the style of ${ZIM} Paper 2 (contemporary issues): four 25-mark questions chosen from eight, 100 marks, 2 hours 30 minutes.`,
    instructions: instr("The questions cover family, education, gender, ethics, disability, the environment, enterprise, the liberation struggle, rights and conflict."),
    sections: [{ title: "Paper 2: Contemporary issues", component: "2", instructions: "Answer any four questions.", answerCount: 4, marks: 100, rules: examSpread(S.zim, { type: "STRUCTURED", marks: 25, n: 8, topics: ISS, difficulty: [3, 5], full: true }) }],
  }),
];
finish(S, { zim: { tests: autoTopicTests(S.zim, { keyPrefix: "zimsec", reserved: [25] }), mocks, file: "zimsec" } }, { expectedMarks: { "mock.zimsec.paper-1": 100, "mock.zimsec.paper-2": 100 } });
