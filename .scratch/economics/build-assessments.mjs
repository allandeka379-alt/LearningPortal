// Builds the economics-o topic tests and mock exams (ZIMSEC O-Level Economics 2015-2022, Cambridge IGCSE Economics
// 0455 2027-2029) with the shared helpers in .scratch/tools/assess-lib.mjs.
// Inputs: npx tsx --conditions=react-server .scratch/tools/inventory.ts economics-o .scratch/economics/inventory.json
// Run: node .scratch/economics/build-assessments.mjs [--report] [--write]
import { setup, topicTest, autoTopicTests, examSpread, mcqSpread, mock, finish, SELF_MARK } from "../tools/assess-lib.mjs";

const S = setup("economics-o", { zim: "zimsec/o-level/economics/2015-2022", cam: "cambridge/igcse/economics/2027-2029" });
const RESERVED = [10, 20];

// ---------------------------------------------------------------------------------------------------------------------
// ZIMSEC: 18 topics; small ones are grouped.
const ZIM_GROUPS = [
  { key: "basics", title: "The economic problem and economic systems", about: "scarcity, choice, opportunity cost, production possibility curves and economic systems", units: ["intro", "systems"] },
  { key: "production-labour", title: "Production and labour", about: "production, productivity, location of industry and the labour market", units: ["production", "labour"] },
  { key: "markets", title: "Demand, supply and price", about: "demand, supply, equilibrium, elasticity and price changes", units: ["demand", "supply", "equilibrium"] },
  { key: "firms", title: "Costs, market structures and business", about: "costs and revenue, market structures and business organisations", units: ["costs", "structures", "business"] },
  { key: "macro", title: "National income, money and inflation", about: "national income, money and banking, and inflation", units: ["national-income", "money", "inflation"] },
  { key: "population-unemployment", title: "Population and unemployment", about: "population and unemployment", units: ["population", "unemployment"] },
  { key: "trade-growth", title: "Trade, growth and development", about: "international trade, exchange rates, the balance of payments, growth and development", units: ["trade", "growth"] },
  { key: "market-failure", title: "Market failure", about: "public and merit goods, externalities and government intervention", units: ["market-failure"] },
];
const zimTests = [];
for (const g of ZIM_GROUPS) {
  try {
    zimTests.push(topicTest(S.zim, { key: g.key, title: g.title, about: g.about, topics: g.units, units: g.units.length > 1 ? g.units : undefined, keyPrefix: "zimsec", reserved: RESERVED }));
  } catch (error) {
    S.problems.push(`topic test ${g.key}@zimsec skipped: ${error.message}`);
  }
}
const zimTops = S.zim.file.topics.map((t) => t.key);
const P2_TOPICS = zimTops.filter((k) => !["intro", "systems", "business", "money", "market-failure"].includes(k));
const ZIM = "ZIMSEC O-Level Economics";
const confirm = "Check the instructions on your own examination papers.";
const zimMocks = [
  mock(S.zim, {
    key: "mock.zimsec.paper-1",
    title: `Mock exam in the style of ${ZIM} Paper 1`,
    description: `A full-length practice paper modelled on ${ZIM} Paper 1 (multiple choice): 40 questions, 40 marks, 1 hour 15 minutes, on all 18 topics.`,
    instructions: `Answer **all** 40 questions. You have 1 hour 15 minutes.\n\n- Each question is worth 1 mark. Choose the one best answer.\n- Diagrams are described in words and tables: read them carefully. You may use a calculator.\n- The paper is marked when you submit or when the time runs out.\n\nThe format follows Paper 1 as described in the 2015-2022 syllabus. ${confirm}`,
    minutes: 75,
    sections: [{ title: "Paper 1: Multiple choice", component: "1", instructions: "Answer all the questions.", rules: mcqSpread(S.zim, { n: 40, topics: zimTops }) }],
  }),
  mock(S.zim, {
    key: "mock.zimsec.paper-2",
    title: `Mock exam in the style of ${ZIM} Paper 2`,
    description: `A full-length practice paper modelled on ${ZIM} Paper 2 (data response): two compulsory 20-mark questions on economic data, 1 hour 15 minutes, 40 marks.`,
    instructions: `Answer **both** questions. You have 1 hour 15 minutes.\n\n- Each question is worth 20 marks. Use the data in your answers and show your working in calculations.\n- ${SELF_MARK}\n\nThe format follows Paper 2 as described in the 2015-2022 syllabus. ${confirm}`,
    minutes: 75,
    sections: [{ title: "Paper 2: Data response (40 marks)", component: "2", instructions: "Answer both questions.", rules: examSpread(S.zim, { type: "STRUCTURED", marks: 20, n: 2, topics: P2_TOPICS, skill: "ANALYSIS" }) }],
  }),
  mock(S.zim, {
    key: "mock.zimsec.paper-3",
    title: `Mock exam in the style of ${ZIM} Paper 3`,
    description: `A full-length practice paper modelled on ${ZIM} Paper 3 (essays): ten 10-mark essay questions, answer four, 40 marks.`,
    instructions: `Answer **four** questions. You have 1 hour 15 minutes.\n\n- Each question is worth 10 marks: part (a) asks you to explain or describe, part (b) to discuss or evaluate.\n- If you answer more than four questions, your best four count.\n- ${SELF_MARK}\n\nThe syllabus prints the duration of Paper 3 as 1 hour 15 minutes in its assessment table and 2 hours in its description of the papers; this practice paper uses 1 hour 15 minutes. ${confirm}`,
    minutes: 75,
    sections: [{ title: "Paper 3: Essays (answer four)", component: "3", instructions: "Answer any four questions.", answerCount: 4, marks: 40, rules: examSpread(S.zim, { type: "STRUCTURED", marks: 10, n: 10, topics: zimTops, skill: "EVALUATION", difficulty: [3, 5] }) }],
  }),
];

// ---------------------------------------------------------------------------------------------------------------------
// Cambridge 0455
const camTests = autoTopicTests(S.cam, { keyPrefix: "cambridge", reserved: RESERVED });
const camTops = S.cam.file.topics.map((t) => t.key);
const CAM = "Cambridge IGCSE Economics";
const camMocks = [
  mock(S.cam, {
    key: "mock.cambridge.paper-1",
    title: `Mock exam in the style of ${CAM} Paper 1`,
    description: `A full-length practice paper modelled on ${CAM} 0455 Paper 1 (multiple choice): 40 questions, 40 marks, 1 hour, on all the subject content.`,
    instructions: `Answer **all** 40 questions. You have 1 hour.\n\n- Each question is worth 1 mark. Choose the one best answer.\n- Diagrams are described in words and tables. You may use a calculator.\n- The paper is marked when you submit or when the time runs out.\n\nThe format follows Paper 1 of the 2027-2029 syllabus. ${confirm}`,
    minutes: 60,
    sections: [{ title: "Paper 1: Multiple choice", component: "1", instructions: "Answer all the questions.", rules: mcqSpread(S.cam, { n: 40, topics: camTops }) }],
  }),
  mock(S.cam, {
    key: "mock.cambridge.paper-2",
    title: `Mock exam in the style of ${CAM} Paper 2`,
    description: `A full-length practice paper modelled on ${CAM} 0455 Paper 2 (structured questions): one compulsory 20-mark question on unseen information in Section A and a choice of 20-mark questions in Section B, answer three, 2 hours, 80 marks.`,
    instructions: `Answer the question in Section A and **three** questions from Section B. You have 2 hours.\n\n- Each question is worth 20 marks. In Section B, part (d) asks you to discuss: consider both sides and reach a conclusion.\n- If you answer more than three questions in Section B, your best three count.\n- ${SELF_MARK}\n\nThe format follows Paper 2 of the 2027-2029 syllabus; the part marks in Section B are our own convention. ${confirm}`,
    minutes: 120,
    sections: [
      { title: "Section A (20 marks)", component: "2", instructions: "Answer this question.", rules: examSpread(S.cam, { type: "STRUCTURED", marks: 20, n: 1, topics: camTops, skill: "ANALYSIS" }) },
      { title: "Section B (60 marks)", component: "2", instructions: "Answer three questions.", answerCount: 3, marks: 60, rules: examSpread(S.cam, { type: "STRUCTURED", marks: 20, n: 4, topics: camTops, skill: "EVALUATION" }) },
    ],
  }),
];

finish(S, { zim: { tests: zimTests, mocks: zimMocks, file: "zimsec" }, cam: { tests: camTests, mocks: camMocks, file: "cambridge" } }, {
  expectedMarks: { "mock.zimsec.paper-1": 40, "mock.zimsec.paper-2": 40, "mock.zimsec.paper-3": 40, "mock.cambridge.paper-1": 40, "mock.cambridge.paper-2": 80 },
});
