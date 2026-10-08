// Builds the accounting-o topic tests and mock exams (ZIMSEC O-Level Principles of Accounting 2015-2022, Cambridge
// IGCSE Accounting 0452 2027-2029) with the shared helpers in .scratch/tools/assess-lib.mjs.
// Inputs: npx tsx --conditions=react-server .scratch/tools/inventory.ts accounting-o .scratch/accounting/inventory.json
// Run: node .scratch/accounting/build-assessments.mjs [--report] [--write]
import { setup, topicTest, autoTopicTests, examSpread, mcqSpread, mock, finish, SELF_MARK } from "../tools/assess-lib.mjs";

const S = setup("accounting-o", { zim: "zimsec/o-level/accounting/2015-2022", cam: "cambridge/igcse/accounting/2027-2029" });
const RESERVED = [20];

// ---------------------------------------------------------------------------------------------------------------------
// ZIMSEC: 21 small top-level topics, grouped into six topic tests.
const ZIM_GROUPS = [
  { key: "foundations", title: "Introduction, documents, the ledger and concepts", about: "the purpose of accounting, the accounting cycle, data processing, source documents, double entry, accounting concepts and business ethics", units: ["introduction", "accounting-cycle", "data-processing", "source-documents", "ledger", "accounting-concepts", "business-ethics"] },
  { key: "subsidiary-books", title: "Books of prime entry", about: "the journals, the cash book and the petty cash book", units: ["subsidiary-books"] },
  { key: "verification", title: "Trial balance, errors, control accounts and bank reconciliation", about: "the trial balance, correcting errors, suspense accounts, control accounts and bank reconciliation", units: ["trial-balance-errors", "control-accounts", "bank-reconciliation"] },
  { key: "statements", title: "Financial statements and adjustments", about: "income statements, statements of financial position, adjustments and capital and revenue expenditure", units: ["financial-statements", "adjustments", "capital-revenue"] },
  { key: "organisations", title: "Other organisations", about: "not-for-profit organisations, departmental and manufacturing accounts, partnerships and companies", units: ["not-for-profit", "departmental-accounts", "manufacturing-accounts", "partnerships", "company-accounts"] },
  { key: "analysis", title: "Incomplete records and ratios", about: "incomplete records and the analysis of accounts with ratios", units: ["incomplete-records", "ratios"] },
];
const zimTopTopics = S.zim.file.topics.map((t) => t.key);
const zimTests = [];
for (const g of ZIM_GROUPS) {
  try {
    zimTests.push(topicTest(S.zim, { key: g.key, title: g.title, about: g.about, topics: g.units, units: g.units.length > 1 ? g.units : undefined, keyPrefix: "zimsec", reserved: RESERVED }));
  } catch (error) {
    S.problems.push(`topic test ${g.key}@zimsec skipped: ${error.message}`);
  }
}

const paper1 = (s, board, label, code) =>
  mock(s, {
    key: `mock.${board}.paper-1`,
    title: `Mock exam in the style of ${label} Paper 1`,
    description: `A full-length practice paper modelled on ${label} Paper 1 (multiple choice): 40 questions, 40 marks, 1 hour 30 minutes, covering the whole syllabus. Questions are drawn from the bank, so every attempt is a new paper.`,
    instructions: `Answer **all** 40 questions. You have 1 hour 30 minutes.\n\n- Each question is worth 1 mark. Choose the one best answer; there are four options.\n- You may use a calculator. Work out each figure before you choose.\n- The paper is marked when you submit or when the time runs out.\n\nThe format follows Paper 1 as described in the syllabus (${code}). Check the instructions on your own examination papers.`,
    minutes: 90,
    sections: [{ title: "Paper 1: Multiple choice", component: "1", instructions: "Answer all the questions.", rules: mcqSpread(s, { n: 40, topics: s.file.topics.map((t) => t.key) }) }],
  });
const paper2 = (s, board, label, code, minutes) =>
  mock(s, {
    key: `mock.${board}.paper-2`,
    title: `Mock exam in the style of ${label} Paper 2`,
    description: `A full-length practice paper modelled on ${label} Paper 2: five compulsory 20-mark structured questions based on stimulus material, ${minutes === 90 ? "1 hour 30 minutes" : "1 hour 45 minutes"}, 100 marks.`,
    instructions: `Answer **all** five questions. You have ${minutes === 90 ? "1 hour 30 minutes" : "1 hour 45 minutes"}.\n\n- Each question is worth 20 marks. Show your workings: they are part of the mark scheme.\n- Numerical answers are marked automatically; ledger accounts, statements and written explanations are shown with our model layout and mark scheme after you submit, so that you can mark them yourself.\n- ${SELF_MARK}\n\nThe format follows Paper 2 as described in the syllabus (${code}). Check the instructions on your own examination papers.`,
    minutes,
    sections: [{ title: "Paper 2: Structured questions (100 marks)", component: "2", instructions: "Answer all the questions.", rules: examSpread(s, { type: "STRUCTURED", marks: 20, n: 5, topics: s.file.topics.map((t) => t.key) }) }],
  });

const zimMocks = [paper1(S.zim, "zimsec", "ZIMSEC O-Level Principles of Accounting", "2015-2022"), paper2(S.zim, "zimsec", "ZIMSEC O-Level Principles of Accounting", "2015-2022; the printed duration of 1 hour 30 minutes should be confirmed", 90)];

// ---------------------------------------------------------------------------------------------------------------------
// Cambridge 0452
const camTests = autoTopicTests(S.cam, { keyPrefix: "cambridge", reserved: RESERVED });
const camMocks = [paper1(S.cam, "cambridge", "Cambridge IGCSE Accounting", "0452, 2027-2029"), paper2(S.cam, "cambridge", "Cambridge IGCSE Accounting", "0452, 2027-2029", 105)];

void zimTopTopics;
finish(S, { zim: { tests: zimTests, mocks: zimMocks, file: "zimsec" }, cam: { tests: camTests, mocks: camMocks, file: "cambridge" } }, {
  expectedMarks: { "mock.zimsec.paper-1": 40, "mock.zimsec.paper-2": 100, "mock.cambridge.paper-1": 40, "mock.cambridge.paper-2": 100 },
});
