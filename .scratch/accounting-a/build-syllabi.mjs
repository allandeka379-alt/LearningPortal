// Builds content/concepts/accounting-a.json and the two A-Level Accounting syllabus files:
//   content/syllabi/zimsec/a-level/accounting/2015-2022.json     (ZIMSEC A-Level Accounting, Forms 5-6)
//   content/syllabi/cambridge/a-level/accounting/2026-2028.json  (Cambridge International AS & A Level Accounting 9706)
// Sources (local only, not in git): .scratch/accounting-a/sources/zimsec-accounting-a.pdf (+ .txt) and
// 9706-2026-2028.pdf (+ .txt). The concept registry lives in ./concepts.mjs; this script prepends each concept's
// coverage label. Run from the repo root: node .scratch/accounting-a/build-syllabi.mjs
import fs from "node:fs";
import path from "node:path";
import { CONCEPTS } from "./concepts.mjs";

const ROOT = process.cwd();
const CONCEPT_KEYS = new Set(CONCEPTS.map(([k]) => k));
if (CONCEPT_KEYS.size !== CONCEPTS.length) throw new Error("duplicate concept key in concepts.mjs");
for (const [k] of CONCEPTS) if (!/^aacc\.[a-z0-9-]+\.[a-z0-9-]+$/.test(k)) throw new Error(`bad concept key ${k}`);

// ---------------------------------------------------------------------------------------------------------------------
// Node helpers. `form` (ZIMSEC: "Form 5" / "Form 6") and `stage` (Cambridge: "AS Level" / "A Level only") are
// build-time metadata used for the concept labels; keys starting with "_" are not written.
const node = (kind, key, code, name, { description, covers = [], objectives = [], components, optional, optionGroup, children, form, stage } = {}) => {
  const n = { key, code, name, kind };
  if (description) n.description = description;
  if (covers.length) n.covers = covers.map((c) => `aacc.${c}`);
  if (objectives.length) n.objectives = objectives.map((o, i) => (Array.isArray(o) ? { code: o[0], text: o[1] } : { code: `${code}.${i + 1}`, text: o }));
  if (components) n.components = components;
  if (optional) n.optional = true;
  if (optionGroup) n.optionGroup = optionGroup;
  if (children) n.children = children;
  if (form) n._form = form;
  if (stage) n._stage = stage;
  return n;
};
const section = (key, code, name, opts) => node("SECTION", key, code, name, opts);
const topic = (key, code, name, opts) => node("TOPIC", key, code, name, opts);
const sub = (key, code, name, opts) => node("SUBTOPIC", key, code, name, opts);

// =====================================================================================================================
// ZIMSEC A-Level Accounting, Forms 5-6, 2015-2022. The four topics are those of the topic list (6.0): 1 Financial
// Accounting, 2 Financial Reporting, 3 Cost Accounting, 4 Management Accounting. Sub-topics are the sub-topic headings
// of the scope and sequence (7.0) and competency matrix (8.0), in the matrix order (Form 5 sub-topics, then the Form 6
// ones). The document prints no numbers below the topic level, so the sub-topic codes (1.1 ...) and all objective codes
// are ours.
const THEORY = ["1", "2", "3"];
const F5 = "Form 5";
const F6 = "Form 6";

const ZIMSEC_TOPICS = [
  topic("financial-accounting", "1", "Financial Accounting", {
    description: "Form 5 and Form 6 (competency matrix: Form 5 sub-topics to Non-profit making organisations; Form 6 Issue and redemption of shares and loan notes).",
    components: THEORY,
    children: [
      sub("financial-accounting.introduction", "1.1", "Introduction to Accounting and Business Ethics", {
        form: F5,
        covers: ["intro.users-information", "intro.business-entities", "intro.branches-accounting", "intro.ethics"],
        objectives: [
          "Identify the users of accounting information and their information needs.",
          "List the types of business organisation (formal and non-formal) and explain the branches of accounting: financial accounting, financial reporting, cost accounting and management accounting.",
          "Explain the importance of good business ethics and apply it in day-to-day business transactions.",
        ],
      }),
      sub("financial-accounting.concepts", "1.2", "Accounting Concepts", {
        form: F5,
        covers: ["concepts.recording", "concepts.reporting"],
        objectives: [
          "State and explain the historical cost, money measurement, substance over form, realisation, prudence, matching (accruals), materiality, consistency and going concern concepts.",
          "Apply the accounting concepts in preparing financial statements and analyse their importance.",
        ],
      }),
      sub("financial-accounting.double-entry", "1.3", "Double entry up to the Trial Balance", {
        form: F5,
        covers: ["ledger.double-entry", "ledger.accruals-prepayments", "ledger.irrecoverable-debts", "ledger.depreciation", "ledger.nca-disposal", "ledger.trial-balance"],
        objectives: [
          "Explain double entry, identify the two accounts in a transaction and record business transactions in the ledger, balancing off accounts.",
          "Record expenses and income with prepayments and accruals, non-current assets, liabilities and capital.",
          "Prepare accounts for disposals of non-current assets, provision for depreciation, bad debts and allowances for doubtful debts.",
          "Draft adjusting journal entries for accruals, prepayments and depreciation and extract a trial balance from the ledger.",
        ],
      }),
      sub("financial-accounting.trial-balance-errors", "1.4", "Trial Balance and Errors", {
        form: F5,
        covers: ["verification.errors", "verification.suspense"],
        objectives: [
          "Identify errors revealed and not revealed by the trial balance and examine their effects.",
          "Correct errors with journal entries, prepare suspense accounts and corrected trial balances.",
          "Draw up statements of corrected gross profit, net profit or loss and working capital.",
        ],
      }),
      sub("financial-accounting.control-applications", "1.5", "Control Applications", {
        form: F5,
        covers: ["verification.control-accounts", "verification.bank-reconciliation"],
        description: "The matrix names this sub-topic 'Control Applications'; its rows cover control accounts and the cash book and bank reconciliation.",
        objectives: [
          "Explain the importance of control applications and the differences between control accounts and personal ledger accounts.",
          "Prepare control accounts, adjust them and personal accounts for errors and reconcile personal ledger balances to control account balances.",
          "Update the cash book, prepare bank reconciliation statements, treat a bank overdraft and correct errors in the cash book and on bank statements.",
        ],
      }),
      sub("financial-accounting.valuation-of-assets", "1.6", "Valuation of Assets", {
        form: F5,
        covers: ["valuation.inventory", "valuation.nca-models"],
        objectives: [
          "State the provisions of IAS 2 and value inventory at the lower of cost and net realisable value by FIFO and weighted average cost, perpetual and periodic.",
          "Outline IAS 16 and explain and calculate non-current asset values by replacement cost and disposal (net realisable) value.",
        ],
      }),
      sub("financial-accounting.financial-statements", "1.7", "Financial statements: IAS 1", {
        form: F5,
        description: "The matrix row 'Financial statements' (in accordance with IAS 1 and IAS 7) for sole proprietors, partnerships and companies, small to medium or large businesses.",
        covers: ["statements.adjustments", "statements.sole-trader", "partnership.accounts", "company.profit-or-loss", "company.changes-in-equity", "company.financial-position", "company.notes-schedules", "company.cash-flow-operating", "company.cash-flow-statement", "company.audit-stewardship"],
        objectives: [
          "Effect year-end adjustments using the accruals concept.",
          "Prepare statements of profit and loss and other comprehensive income and of financial position for sole proprietors, partnerships (appropriation, capital and current accounts) and companies in accordance with IAS 1.",
          "Prepare statements of changes in equity of a company and explain revenue (distributable) and capital (non-distributable) reserves.",
          "Prepare statements of cash flows under IAS 7 for sole proprietors, partnerships and companies and notes to the financial statements.",
          "Summarise the contents of the directors' and auditors' reports.",
        ],
      }),
      sub("financial-accounting.incomplete-records", "1.8", "Incomplete Records Accounting", {
        form: F5,
        covers: ["incomplete.statement-of-affairs", "incomplete.missing-figures", "incomplete.final-accounts"],
        objectives: [
          "Calculate capital from statements of affairs and profit or loss from the accounting equation.",
          "Calculate missing figures using ratios and ledger accounts and estimate profit.",
          "Prepare statements of profit and loss and other comprehensive income and of financial position from incomplete records.",
        ],
      }),
      sub("financial-accounting.business-purchase", "1.9", "Business Purchase", {
        form: F5,
        covers: ["acquisition.purchase-consideration-goodwill", "acquisition.vendor-books", "acquisition.purchaser-books", "acquisition.merger-statements"],
        objectives: [
          "Explain business purchase by a company of a sole proprietor or partnership and calculate goodwill.",
          "Record entries to close the books of the business taken over and entries for purchase by cash, issue of shares and loan notes.",
          "Prepare business purchase accounts and the statement of financial position after the purchase.",
        ],
      }),
      sub("financial-accounting.sources-of-capital", "1.10", "Sources of Capital", {
        form: F5,
        covers: ["capital.sources-of-capital", "company.share-capital-reserves"],
        objectives: [
          "List and distinguish the types of shares (ordinary, preference, redeemable ordinary and redeemable preference) and loan notes (redeemable and irredeemable).",
          "Differentiate loan notes from convertible loan stock and describe the advantages and disadvantages of the various sources of capital.",
        ],
      }),
      sub("financial-accounting.partnership-changes", "1.11", "Further considerations in Partnership Accounting", {
        form: F5,
        covers: ["partnership.goodwill", "partnership.revaluation", "partnership.new-partner", "partnership.retirement", "partnership.mid-year-changes", "partnership.dissolution"],
        description: "Questions are not set on piecemeal realisation or the rule in Garner v Murray.",
        objectives: [
          "Explain the reasons for partnership changes and account for goodwill and revaluation of assets.",
          "Prepare journal entries, revaluation accounts and capital and current accounts to show the effects of changes in a partnership, and the statement of financial position after the change.",
          "Prepare realisation accounts and ledger accounts to close the books of a partnership on dissolution.",
        ],
      }),
      sub("financial-accounting.manufacturing", "1.12", "Manufacturing Businesses", {
        form: F5,
        covers: ["manufacturing.account", "manufacturing.profit-unrealised", "manufacturing.statements"],
        objectives: [
          "Classify manufacturing costs and draw up a manufacturing account.",
          "Explain manufacturing profit and unrealised profit.",
          "Prepare financial statements for manufacturing businesses.",
        ],
      }),
      sub("financial-accounting.departmental", "1.13", "Departmental Accounting", {
        form: F5,
        covers: ["departmental.apportionment", "departmental.statements"],
        objectives: [
          "Apportion expenses and ancillary incomes to departments using appropriate bases.",
          "Prepare departmental statements of profit and loss and other comprehensive income and of financial position.",
        ],
      }),
      sub("financial-accounting.non-profit", "1.14", "Non-Profit making Organisations", {
        form: F5,
        covers: ["club.receipts-payments-fund", "club.subscriptions", "club.income-generating", "club.income-expenditure", "club.sources-fundraising"],
        objectives: [
          "State the sources of income of not-for-profit organisations (subscriptions, life membership fees, donations, income-generating activities).",
          "Prepare subscriptions accounts with advance and arrears, income statements for income-generating activities and income and expenditure accounts.",
          "Calculate the accumulated fund and draft the statement of financial position.",
        ],
      }),
      sub("financial-accounting.shares", "1.15", "Issue and Redemption of Shares", {
        form: F6,
        covers: ["company.share-issue", "company.bonus-rights", "company.redemption-shares"],
        objectives: [
          "State the types of shares, record the raising and repayment of share capital and analyse the effects of an issue of shares on the statement of financial position.",
          "Calculate bonus and rights issues, distinguish between them and examine the uses of share premium.",
          "Explain why companies redeem or purchase their own shares and create capital redemption reserve accounts.",
        ],
      }),
      sub("financial-accounting.loan-notes", "1.16", "Issue and Redemption of Loan Notes", {
        form: F6,
        covers: ["company.loan-notes"],
        objectives: [
          "Explain the purposes of loan notes and their effects on the statement of financial position.",
          "Draft extracts of the statement of financial position after the issue or redemption of loan notes.",
        ],
      }),
    ],
  }),
  topic("financial-reporting", "2", "Financial Reporting", {
    description: "Form 6 (competency matrix).",
    components: THEORY,
    children: [
      sub("financial-reporting.standards", "2.1", "International Accounting Standards", {
        form: F6,
        covers: ["standards.ias-1-2", "standards.ias-8-10", "standards.ias-16-36-38"],
        description: "The syllabus lists IAS 1, 2, 7, 8, 10, 16, 36 and 38 (IAS 7 is covered with the statements of cash flows).",
        objectives: [
          "Explain the purposes and importance of the international accounting standards and state their provisions.",
          "Apply IAS 1 Presentation, IAS 2 Inventories, IAS 8 Accounting policies, estimates and errors, IAS 10 Events after the reporting period, IAS 16 Property, plant and equipment, IAS 36 Impairment and IAS 38 Intangible assets when preparing financial statements.",
        ],
      }),
      sub("financial-reporting.ratios", "2.2", "Interpretation and analysis of financial statements", {
        form: F6,
        covers: ["ratios.profitability", "ratios.liquidity", "ratios.efficiency", "ratios.solvency-gearing", "ratios.investment", "ratios.analysis-limits"],
        objectives: [
          "List, explain and calculate profitability ratios (gross and net profit margin, return on assets, return on equity, return on capital employed, operating expenses to sales).",
          "Calculate financial ratios (current, quick, receivables collection and payables payment periods, rate of inventory turnover) and resource utilisation ratios (total assets, non-current assets, current assets and capital employed turnover).",
          "Calculate investment ratios (earnings per share, price earnings, debt to equity, dividend yield, cover and per share, gearing, earnings yield).",
          "Interpret the ratios and analyse the financial statements of businesses or projects.",
        ],
      }),
    ],
  }),
  topic("cost-accounting", "3", "Cost Accounting", {
    description: "Form 6 (competency matrix). Questions on overhead variances will not be set.",
    components: THEORY,
    children: [
      sub("cost-accounting.cost-terms", "3.1", "Cost terms and purpose", {
        form: F6,
        covers: ["cost.terms-purpose", "cost.behaviour"],
        objectives: [
          "Define cost terminology (cost, costing, cost coding, cost unit, cost centre) and explain the purposes of cost accounting.",
          "Classify costs (period and product, relevant and irrelevant, opportunity, sunk) and separate fixed, variable, semi-fixed and semi-variable costs.",
          "Distinguish between cost accounting and management accounting.",
        ],
      }),
      sub("cost-accounting.absorption", "3.2", "Absorption Costing", {
        form: F6,
        covers: ["cost.overhead-allocation", "cost.overhead-absorption", "cost.over-under-absorption", "cost.absorption-statements"],
        objectives: [
          "Apportion, allocate and allot costs to cost centres and prepare an overhead analysis sheet.",
          "Calculate overhead absorption rates, under- and over-absorption and explain their causes.",
          "Prepare absorption profit statements, calculate closing inventory and explain the uses and limitations of absorption costing.",
        ],
      }),
      sub("cost-accounting.marginal", "3.3", "Marginal Costing", {
        form: F6,
        covers: ["cost.marginal-costing", "cost.profit-reconciliation", "cost.break-even", "cost.decisions"],
        objectives: [
          "Value inventory using marginal costing, calculate contribution and prepare marginal profit statements.",
          "Explain the differences between marginal and absorption costing and reconcile the profits calculated by the two methods.",
          "Calculate and interpret the margin of safety and use the contribution to sales ratio to find profits or losses at various activity levels.",
          "Apply marginal costing and cost-volume-profit analysis to short-run tactical or operational decisions.",
        ],
      }),
      sub("cost-accounting.job-batch", "3.4", "Job and Batch Costing", {
        form: F6,
        covers: ["cost.job-batch"],
        objectives: [
          "Explain the elements of job and batch costing: prime cost, absorption of overheads, total cost and selling price.",
          "Calculate costs and profit for a job or a batch.",
        ],
      }),
      sub("cost-accounting.standard-costing", "3.5", "Standard Costing", {
        form: F6,
        covers: ["cost.standards-basics", "cost.variances-direct", "cost.variances-sales", "cost.variances-analysis"],
        objectives: [
          "Explain standard costing, set standards and identify the types of standard.",
          "Calculate material, labour and sales variances, explain their causes and interpret them.",
          "Reconcile standard to actual costs and standard to actual profit.",
        ],
      }),
    ],
  }),
  topic("management-accounting", "4", "Management Accounting", {
    description: "Form 6 (competency matrix).",
    components: THEORY,
    children: [
      sub("management-accounting.budgeting", "4.1", "Budgeting and Budgetary Control", {
        form: F6,
        covers: ["budget.purpose-behaviour", "budget.operating-budgets", "budget.cash-budget", "budget.master-budget", "budget.flexible-budgets"],
        objectives: [
          "Explain the importance of budgeting and budgetary control systems and their behavioural aspects.",
          "Prepare sales, production and purchases (units and value), cash and master budgets and explain the effect of limiting factors.",
          "Prepare flexed budget statements, explain the causes of differences between actual and flexed budgets and make recommendations using supporting data.",
        ],
      }),
      sub("management-accounting.investment-appraisal", "4.2", "Investment Appraisal", {
        form: F6,
        covers: ["invest.payback-arr", "invest.npv-irr", "invest.evaluation"],
        objectives: [
          "Use accounting rate of return, payback period, net present value and internal rate of return to assess the viability of investment projects.",
          "State the decision criterion of each technique and analyse its advantages and disadvantages.",
        ],
      }),
    ],
  }),
];

const zimsec = {
  board: "zimsec",
  qualification: "a-level",
  subject: "accounting",
  versionLabel: "2015-2022",
  family: "accounting-a",
  title: "ZIMSEC A-Level Accounting",
  code: null,
  effectiveFrom: "2018-01-01",
  effectiveTo: null,
  publishAs: "CURRENT",
  officialDocument: {
    title: "Accounting Syllabus, Forms 5 - 6, 2015 - 2022 (Ministry of Primary and Secondary Education, Curriculum Development and Technical Services), examined by ZIMSEC at A Level",
    url: "https://www.zimsake.co.zw/softidrive/",
    publisher: "Ministry of Primary and Secondary Education (Curriculum Development and Technical Services) / Zimbabwe School Examinations Council (ZIMSEC)",
  },
  sourceNote: "The four topics (1 Financial Accounting, 2 Financial Reporting, 3 Cost Accounting, 4 Management Accounting) are transcribed from the topic list (6.0) of the Ministry's Accounting Syllabus Forms 5 - 6 (2015 - 2022). Sub-topics are the sub-topic headings of the scope and sequence (7.0) and competency matrix (8.0) in the matrix order, with the form (Form 5 or Form 6) in which each is taught. The document prints no numbers below topic level: all sub-topic codes (1.1 to 4.2) and all objective codes are ours. Learning-objective statements are our own paraphrase; no syllabus text is reproduced.",
  notes: [
    "Source (read 2026-10-10): Ministry document, copy obtained from zimsake.co.zw softidrive (the zimsake.co.zw document library; the URL recorded is the library's address because the file has no stable direct link). The cover prints 'Accounting Syllabus, Forms 5 - 6, 2015 - 2022' (Curriculum Development and Technical Services, Mount Pleasant, Harare). It was read through a pdftotext rendering in which the scope-and-sequence and competency-matrix tables come out with their columns interleaved and several text blocks overprinted (for example in the scheme of assessment); check every heading, the form of each item and each objective against a clean copy from ZIMSEC.",
    "Subject code: not printed in the syllabus document. ZIMSEC A-Level Accounting is commonly cited as 6001 (O-Level Principles of Accounting 7112); confirm it (code left null).",
    "Heritage-Based Curriculum: ZIMSEC introduced Heritage-Based Curriculum syllabi for Forms 5-6 (new versions for some subjects, 2024 onwards). Confirm which Accounting syllabus November 2026 and later A-Level candidates sit, set effectiveTo, and create a new version file when a new syllabus replaces this one. Version dates assumed: first examined in November 2018 (effectiveFrom 2018-01-01).",
    "Form of teaching: the competency matrix teaches Topic 1 Financial Accounting in Form 5 from Introduction to Accounting and Business Ethics to Non-profit making Organisations (sub-topics 1.1-1.14), and Issue and Redemption of Shares and of Loan Notes (1.15-1.16) in Form 6; Topics 2, 3 and 4 are all Form 6. The scope-and-sequence table was read with its Form 5 and Form 6 columns interleaved; the matrix pages (headed FORM 5 and FORM 6) settle the placement. The scope and sequence prints 'Sources of Capital' and 'Further considerations in Partnership Accounting' as Form 5, matching the matrix.",
    "Matrix placement choices: sub-topic labels in the matrix page headers overlap (for example 'Valuation of Assets' and 'Financial statements' are printed in the same cell); this tree follows the rows. 'Control Applications' carries both control accounts and the cash book and bank reconciliation rows. The financial statements row covers sole proprietors, partnerships (appropriation account, capital and current accounts) and companies (small to medium or large businesses) and states that these statements are for internal use and not for publication.",
    "Exclusions printed in the matrix: questions will not be set on piecemeal realisation and the rule in Garner versus Murray (partnership dissolution); questions on overhead variances will not be set (standard costing covers material, labour and sales variances only).",
    "Assessment (9.0) as read: continuous assessment 30% (theory tests 10%, practical assignments 10% and a project 10%, one theory test and one practical assignment per term except one term each year, and a project per year) and a summative examination 70%: Paper 1 multiple choice (40 items, four options each, 40 marks, 1 hour 20 minutes, 15%); Paper 2 structured questions (4 compulsory questions, 100 marks, 1 hour 45 minutes, 25%); Paper 3 problem solving (4 compulsory questions, 100 marks, 2 and a half hours, 30%; the character for the half hour is garbled in the copy read). All papers are compulsory. 20-25% of the marks go to questions on the Cost and Management Accounting section. Specification grid: Paper 1 knowledge and understanding 60%, application and analysis 40%; Paper 2 60%, 20%, synthesis and evaluation 20%; Paper 3 50%, 30%, 20%. Continuous assessment is not a component here and is not simulated.",
    "Question structure inside Papers 2 and 3 (marks per question, parts) is not printed: 100 marks over 4 questions is read as 25 marks each. This is a convention for our exam-format items and a reviewer must check it against recent ZIMSEC papers.",
    "Unlisted detail: the syllabus does not name the books of prime entry, capital and revenue expenditure, the partnership agreement, IAS 37, computerised-system transfer, activity based costing or fixed overhead variances; those are assumed from Form 4 Principles of Accounting or are Cambridge-only. Several ZIMSEC items go beyond the Cambridge AS content (departmental accounting, redemption of shares and capital redemption reserve, convertible loan stock, preference shares, return on assets and equity, earnings yield). Lessons are written to the depth of the deeper board and mark ZIMSEC detail explicitly.",
  ],
  overview: "The ZIMSEC A-Level Accounting syllabus (Forms 5-6) has four topics. Topic 1 Financial Accounting covers business ethics and the accounting concepts, double entry to the trial balance, errors and suspense accounts, control accounts and bank reconciliations, valuation of inventory and non-current assets, financial statements of sole proprietors, partnerships and companies (with statements of cash flows), incomplete records, business purchase, sources of capital, partnership changes and dissolution, manufacturing and departmental accounts, not-for-profit organisations (Form 5) and the issue and redemption of shares and loan notes (Form 6). Topic 2 Financial Reporting covers international accounting standards and ratio analysis; Topic 3 Cost Accounting covers absorption, marginal, job and batch and standard costing; Topic 4 Management Accounting covers budgeting and investment appraisal. Topics 2-4 are taught in Form 6.",
  assessmentOverview: "Continuous assessment (theory tests, practical assignments and a project) carries 30%. The examination carries 70%: Paper 1 multiple choice (40 items, 1 hour 20 minutes, 40 marks, 15%), Paper 2 structured questions (4 compulsory questions, 1 hour 45 minutes, 100 marks, 25%) and Paper 3 problem solving (4 compulsory questions, 2 and a half hours, 100 marks, 30%); 20-25% of the marks are on Cost and Management Accounting.",
  components: [
    { code: "1", name: "Paper 1: Multiple choice", kind: "MULTIPLE_CHOICE", description: "40 compulsory four-option multiple-choice items testing across the whole syllabus.", durationMinutes: 80, maxMarks: 40, weightingPercent: 15, calculatorAllowed: true },
    { code: "2", name: "Paper 2: Structured questions", kind: "WRITTEN", description: "Four compulsory structured questions testing across the whole syllabus, answered on the question paper.", durationMinutes: 105, maxMarks: 100, weightingPercent: 25, calculatorAllowed: true },
    { code: "3", name: "Paper 3: Problem solving", kind: "WRITTEN", description: "Four compulsory problem-solving questions on any area of the syllabus, testing the ability to organise and present information in an appropriate accounting form (statements, reconciliations, budgets, appraisals) and to analyse and evaluate it.", durationMinutes: 150, maxMarks: 100, weightingPercent: 30, calculatorAllowed: true },
  ],
  topics: ZIMSEC_TOPICS,
};

// =====================================================================================================================
// Cambridge International AS & A Level Accounting 9706, 2026-2028 (version 2, published December 2025). Topics 1.1 to
// 4.4 and sub-topics 1.1.1 ... 4.4.1 are numbered as printed; the objective codes below them (1.1.1.1 ...) are ours (the
// syllabus gives the 'candidates should have an understanding of' bullets without numbers). The two sections (AS and A)
// are ours.
const AS = ["1", "2"];
const P3 = ["3"];
const P4 = ["4"];
const ASL = "AS Level";
const ALO = "A Level only";

const C9706_TOPICS = [
  section("as-content", "AS", "AS Level subject content (topics 1.1-2.2)", {
    description: "Assessed by Papers 1 and 2 and assumed knowledge for Papers 3 and 4.",
    children: [
      topic("entity", "1.1", "Types of business entity", {
        components: AS,
        children: [
          sub("entity.types", "1.1.1", "Types of business entity", {
            stage: ASL,
            covers: ["intro.business-entities", "capital.short-term-finance"],
            objectives: [
              "Describe sole traders, partnerships and limited companies (including plcs) and the advantages and disadvantages of each.",
              "Explain sources of finance and methods of funding for these entities: secured and unsecured loans, overdrafts, instalments, renting or leasing and trade credit.",
              "Use understanding of types of entity to take relevant decisions (limited liability partnerships are not examined).",
            ],
          }),
        ],
      }),
      topic("system", "1.2", "The accounting system", {
        components: AS,
        children: [
          sub("system.system", "1.2.1", "The accounting system", {
            stage: ASL,
            covers: ["ledger.double-entry", "ledger.books-prime-entry", "concepts.recording", "concepts.reporting", "systems.computerised"],
            objectives: [
              "Apply the principles of double entry and the accounting equation to record transactions in the books of prime entry (sales, sales returns, purchases, purchases returns journals, cash book and general journal) and ledger accounts.",
              "Explain the purpose of a trial balance and the advantages and disadvantages of keeping full accounting records.",
              "Apply the concepts of business entity, historic cost, money measurement, going concern, consistency, prudence, realisation, duality, materiality, objectivity, matching/accruals and substance over form.",
              "Explain the use, advantages and disadvantages of computerised accounting systems and ways of securing data (no specific software).",
            ],
          }),
        ],
      }),
      topic("non-current-assets", "1.3", "Accounting for non-current assets", {
        components: AS,
        children: [
          sub("non-current-assets.capital-revenue", "1.3.1", "Capital and revenue income and expenditure", {
            stage: ASL,
            covers: ["ledger.capital-revenue"],
            objectives: [
              "Distinguish capital from revenue income and expenditure.",
              "Explain the effect on profit or loss and asset value of treating capital and revenue expenditure incorrectly.",
            ],
          }),
          sub("non-current-assets.changing-values", "1.3.2", "Changing asset values", {
            stage: ASL,
            covers: ["ledger.depreciation", "ledger.nca-disposal", "valuation.nca-models"],
            objectives: [
              "Explain the causes and purpose of depreciation and calculate it by the straight-line and reducing-balance methods, choosing the more appropriate method.",
              "Measure non-current assets by the cost model or the revaluation model.",
              "Prepare ledger accounts and journal entries for acquisition, revaluation, depreciation and disposal (including part exchange) and calculate profit or loss on disposal.",
              "Record the effect of depreciation in the statement of profit or loss and the statement of financial position.",
            ],
          }),
        ],
      }),
      topic("verification", "1.4", "Reconciliation and verification", {
        components: AS,
        children: [
          sub("verification.need", "1.4.1", "Reconciliation and verification", {
            stage: ASL,
            covers: ["verification.principles"],
            objectives: [
              "Explain the need to reconcile and verify ledger accounts with internal and external documentation.",
              "Evaluate the benefits and limitations of reconciliation and verification procedures.",
            ],
          }),
          sub("verification.trial-balance", "1.4.2", "Trial balance", {
            stage: ASL,
            covers: ["ledger.trial-balance", "verification.errors", "verification.suspense"],
            objectives: [
              "Identify errors that affect and that do not affect the trial balance (omission, commission, principle, original entry, reversal, compensating).",
              "Prepare ledger accounts and journal entries to correct errors using a suspense account and show the effect on the financial statements.",
              "Explain the benefits and limitations of a trial balance.",
            ],
          }),
          sub("verification.bank-reconciliation", "1.4.3", "Bank reconciliation statements", {
            stage: ASL,
            covers: ["verification.bank-reconciliation"],
            objectives: [
              "Update the cash book and prepare bank reconciliation statements.",
              "Explain the benefits and limitations of a bank reconciliation statement.",
            ],
          }),
          sub("verification.control-accounts", "1.4.4", "Control accounts", {
            stage: ASL,
            covers: ["verification.control-accounts"],
            objectives: [
              "Prepare sales ledger and purchases ledger control accounts and reconcile control account balances with ledger balances.",
              "Explain the effects on the financial statements of correcting errors and the benefits and limitations of control accounts.",
            ],
          }),
        ],
      }),
      topic("statements", "1.5", "Preparation of financial statements", {
        components: AS,
        children: [
          sub("statements.adjustments", "1.5.1", "Adjustments to draft financial statements", {
            stage: ASL,
            covers: ["ledger.accruals-prepayments", "ledger.irrecoverable-debts", "statements.adjustments"],
            objectives: [
              "Calculate and record adjustments for accruals and prepayments of income and expenses, irrecoverable debts, debts recovered and allowances for irrecoverable debts.",
              "Calculate and record adjustments for depreciation, inventory valuation and correction of errors and show their effect on the statements.",
            ],
          }),
          sub("statements.sole-traders", "1.5.2", "Sole traders", {
            stage: ASL,
            covers: ["statements.sole-trader", "incomplete.statement-of-affairs", "incomplete.missing-figures", "incomplete.final-accounts"],
            objectives: [
              "Prepare a statement of profit or loss and statement of financial position for a sole trader (trading or service business) from full or incomplete accounting records.",
            ],
          }),
          sub("statements.partnerships", "1.5.3", "Partnerships", {
            stage: ASL,
            covers: ["partnership.accounts", "partnership.agreement"],
            objectives: [
              "Prepare a statement of profit or loss, appropriation account and statement of financial position for a partnership from full or incomplete records, and partners' capital and current accounts.",
              "Explain why partners keep separate capital and current accounts, the contents and advantages and disadvantages of a partnership agreement and the provisions of the Partnership Act 1890.",
            ],
          }),
          sub("statements.limited-companies", "1.5.4", "Limited companies", {
            stage: ASL,
            covers: ["capital.sources-of-capital", "company.share-capital-reserves", "company.share-issue", "company.bonus-rights", "company.loan-notes", "company.profit-or-loss", "company.changes-in-equity", "company.financial-position"],
            description: "Questions will not be set on preference shares. The revaluation reserve is not used for a bonus issue.",
            objectives: [
              "Explain the features and accounting treatment of ordinary shares, bonus issues, rights issues, debentures, dividends and reserves.",
              "Evaluate for the company and its shareholders bonus and rights issues, and issuing shares against debentures; distinguish capital from revenue reserves.",
              "Prepare ledger accounts for an issue of shares at par or at a premium, a rights issue and a bonus issue.",
              "Prepare a statement of profit or loss, statement of financial position and statement of changes in equity for a company, and identify sources of finance for specified purposes.",
            ],
          }),
        ],
      }),
      topic("analysis", "1.6", "Analysis and communication of accounting information", {
        components: AS,
        children: [
          sub("analysis.users", "1.6.1", "Users of accounting information", {
            stage: ASL,
            covers: ["intro.users-information"],
            objectives: [
              "Explain the differing information requirements of owners, managers, employees, investors, lenders, suppliers, customers, government and public and environmental bodies.",
              "Communicate and analyse the information these stakeholders need.",
            ],
          }),
          sub("analysis.ratios", "1.6.2", "Calculation and evaluation of ratios", {
            stage: ASL,
            covers: ["ratios.profitability", "ratios.liquidity", "ratios.efficiency", "ratios.analysis-limits"],
            description: "Candidates must use the formulae in the appendix to section 3 (reproduced in the syllabus); no other formulae are accepted.",
            objectives: [
              "Calculate profitability (gross profit margin, mark-up, profit margin, ROCE, expenses to revenue), liquidity (current and acid test) and efficiency ratios (non-current asset turnover, receivables, payables and inventory turnover in days, rate of inventory turnover).",
              "Evaluate profitability, liquidity and efficiency by interpreting ratios and suggest measures to improve them.",
              "Explain the limitations of accounting information.",
            ],
          }),
        ],
      }),
      topic("costs", "2.1", "Costs and cost behaviour", {
        components: AS,
        children: [
          sub("costs.materials-labour", "2.1.1", "Materials and labour", {
            stage: ASL,
            covers: ["cost.terms-purpose", "cost.behaviour", "cost.materials-labour-jit", "valuation.inventory"],
            objectives: [
              "Account for material and labour costs and identify and calculate direct and indirect costs.",
              "Identify and calculate fixed, variable, semi-variable and stepped costs.",
              "Calculate the value of closing inventory by FIFO and weighted average cost (AVCO), perpetual and periodic, and explain the principles of just in time (JIT).",
            ],
          }),
        ],
      }),
      topic("traditional-costing", "2.2", "Traditional costing methods", {
        components: AS,
        children: [
          sub("traditional-costing.applications", "2.2.1", "Costing applications", {
            stage: ASL,
            covers: ["cost.job-batch"],
            objectives: ["Prepare costing statements using unit, job and batch costing in manufacturing and service businesses."],
          }),
          sub("traditional-costing.absorption", "2.2.2", "Absorption costing", {
            stage: ASL,
            covers: ["cost.overhead-allocation", "cost.overhead-absorption", "cost.over-under-absorption", "cost.absorption-statements"],
            objectives: [
              "Distinguish a cost centre from a cost unit and allocate and apportion overheads between production and service departments.",
              "Calculate overhead absorption rates and the under- or over-absorption of overheads, and prepare costing and profit statements using absorption costing.",
              "Explain the uses and limitations of absorption costing, its usefulness for decisions and the significance of non-financial factors.",
            ],
          }),
          sub("traditional-costing.marginal", "2.2.3", "Marginal costing", {
            stage: ASL,
            covers: ["cost.marginal-costing", "cost.profit-reconciliation", "cost.break-even"],
            description: "Candidates will not be asked to prepare a break-even chart.",
            objectives: [
              "Calculate contribution, the break-even point, contribution to sales ratio, the output or sales for a target profit and the margin of safety, and interpret a break-even chart.",
              "Prepare costing and profit statements using marginal costing and a statement reconciling marginal and absorption costing profits.",
              "Explain the uses and limitations of marginal costing and break-even analysis.",
            ],
          }),
          sub("traditional-costing.cvp", "2.2.4", "Cost-volume-profit analysis", {
            stage: ASL,
            covers: ["cost.decisions"],
            objectives: [
              "Explain the advantages and limitations of cost-volume-profit analysis and its usefulness as a support for decisions (make-or-buy, special orders, closure of a unit, limiting factors, target profit).",
              "Apply costing concepts to make business decisions and recommendations using supporting data, with the significance of non-financial factors.",
            ],
          }),
        ],
      }),
    ],
  }),
  section("a-level-content", "A", "A Level subject content (topics 3.1-4.4)", {
    description: "A Level only: Paper 3 (section 3) and Paper 4 (section 4), with the AS content assumed.",
    children: [
      topic("fin-statements", "3.1", "Preparation of financial statements", {
        components: P3,
        children: [
          sub("fin-statements.purpose", "3.1.1", "Financial statements", {
            stage: ALO,
            description: "No separate concept: the need for and purpose of financial statements for specific types of business is taught inside the lessons on partnerships, clubs, manufacturing businesses and companies.",
            objectives: ["Explain the need for and purpose of financial statements for specific types of business."],
          }),
          sub("fin-statements.partnerships", "3.1.2", "Partnerships", {
            stage: ALO,
            covers: ["partnership.goodwill", "partnership.revaluation", "partnership.new-partner", "partnership.retirement", "partnership.mid-year-changes", "partnership.dissolution"],
            objectives: [
              "Explain goodwill and distinguish purchased from inherent goodwill.",
              "Prepare partners' capital and current accounts to record goodwill and revaluation on a change in the profit-sharing ratio, the introduction of a partner, the retirement of a partner and dissolution.",
              "Prepare the appropriation account, statement of profit or loss and statement of financial position including changes part-way through a year, and realisation and revaluation accounts.",
            ],
          }),
          sub("fin-statements.clubs", "3.1.3", "Clubs and societies", {
            stage: ALO,
            covers: ["club.receipts-payments-fund", "club.subscriptions", "club.income-generating", "club.income-expenditure", "club.sources-fundraising"],
            objectives: [
              "Distinguish a receipts and payments account from an income and expenditure account and define and calculate the accumulated fund.",
              "Prepare receipts and payments accounts, accounts for trading and revenue-generating activities, subscriptions accounts, income and expenditure accounts and statements of financial position from full or incomplete records.",
              "Account for life memberships and donations, make year-end adjustments and evaluate sources of finance and methods of fundraising.",
            ],
          }),
          sub("fin-statements.manufacturing", "3.1.4", "Manufacturing businesses", {
            stage: ALO,
            covers: ["manufacturing.account", "manufacturing.profit-unrealised", "manufacturing.statements"],
            objectives: [
              "Prepare a manufacturing account, differentiating direct and indirect expenses and including factory profit.",
              "Prepare the statement of profit or loss and statement of financial position of a manufacturing business, accounting for manufacturing profit and eliminating unrealised profit in unsold inventory.",
              "Explain why a business may account for manufacturing profit.",
            ],
          }),
          sub("fin-statements.companies", "3.1.5", "Limited companies", {
            stage: ALO,
            covers: ["company.notes-schedules", "company.cash-flow-operating", "company.cash-flow-statement"],
            objectives: [
              "Prepare for a limited company, in line with international accounting standards and legal requirements, the statement of profit or loss, statement of financial position, statement of cash flows, statement of changes in equity and schedule of non-current assets.",
            ],
          }),
        ],
      }),
      topic("regulation", "3.2", "Regulatory and ethical considerations", {
        components: P3,
        children: [
          sub("regulation.standards", "3.2.1", "International Accounting Standards", {
            stage: ALO,
            covers: ["standards.ias-1-2", "standards.ias-8-10", "standards.ias-16-36-38", "standards.ias-37"],
            description: "The scope of each standard is set out in the Teacher Guidance for 9706 (not in the repository). IAS 7 is covered with the statement of cash flows.",
            objectives: [
              "State the main provisions of IAS 1, IAS 2, IAS 7, IAS 8, IAS 10, IAS 16, IAS 36, IAS 37 and IAS 38.",
            ],
          }),
          sub("regulation.ethics", "3.2.2", "Ethical considerations", {
            stage: ALO,
            covers: ["intro.ethics"],
            objectives: [
              "Explain the need for an ethical framework in accounting and the fundamental principles: integrity, objectivity, professional competence and due care, confidentiality and professional behaviour.",
              "Explain how the ethical behaviour of accountants and auditors affects the business and other stakeholders and the social implications of decision-making.",
            ],
          }),
          sub("regulation.auditing", "3.2.3", "Auditing and stewardship of limited companies", {
            stage: ALO,
            covers: ["company.audit-stewardship"],
            objectives: [
              "Explain the role and responsibilities of the auditor, external against internal audit and qualified against unqualified audit reports.",
              "Explain stewardship, the responsibilities of directors to shareholders and the importance of a true and fair view.",
            ],
          }),
        ],
      }),
      topic("acquisition", "3.3", "Business acquisition and merger", {
        components: P3,
        children: [
          sub("acquisition.acquisition", "3.3.1", "Business acquisition and merger", {
            stage: ALO,
            covers: ["acquisition.purchase-consideration-goodwill", "acquisition.vendor-books", "acquisition.purchaser-books", "acquisition.merger-statements"],
            objectives: [
              "Explain the nature and purpose of the merger of businesses to form a new entity.",
              "Prepare journal entries and ledger entries for the merger of sole traders into a partnership or company, a sole trader with an existing partnership, and the acquisition of a sole trader or partnership by a company.",
              "Calculate goodwill on acquisition, prepare statements of profit or loss and financial position for the new entity and evaluate the advantages and disadvantages.",
            ],
          }),
        ],
      }),
      topic("computerised", "3.4", "Computerised accounting systems", {
        components: P3,
        children: [
          sub("computerised.transfer", "3.4.1", "Computerised accounting systems", {
            stage: ALO,
            covers: ["systems.data-transfer"],
            objectives: [
              "Describe the process of transferring business accounts to a computerised accounting system.",
              "Explain ways in which the integrity of accounting data can be ensured during the transfer.",
            ],
          }),
        ],
      }),
      topic("analysis-a", "3.5", "Analysis and communication of accounting information", {
        components: P3,
        children: [
          sub("analysis-a.ratios", "3.5.1", "Analysis and communication of accounting information", {
            stage: ALO,
            covers: ["ratios.solvency-gearing", "ratios.investment"],
            objectives: [
              "Calculate the working capital cycle, net working assets to revenue, interest cover, gearing, earnings per share, price/earnings, dividend per share, dividend yield and dividend cover using the appendix formulae.",
              "Analyse and evaluate the results, draw conclusions, explain the interrelationships between ratios and make recommendations to stakeholders.",
            ],
          }),
        ],
      }),
      topic("abc", "4.1", "Activity based costing (ABC)", {
        components: P4,
        children: [
          sub("abc.abc", "4.1.1", "Activity based costing", {
            stage: ALO,
            covers: ["cost.activity-based"],
            objectives: [
              "Explain activity based costing, cost drivers and the uses and limitations of ABC.",
              "Use ABC to identify the cost driver, apportion and allocate overheads and calculate the total cost and selling price of a unit, and compare it with other methods of overhead absorption.",
              "Apply ABC to make business decisions and recommendations.",
            ],
          }),
        ],
      }),
      topic("standard-costing", "4.2", "Standard costing", {
        components: P4,
        children: [
          sub("standard-costing.standard", "4.2.1", "Standard costing", {
            stage: ALO,
            covers: ["cost.standards-basics", "cost.variances-direct", "cost.variances-sales", "cost.variances-fixed-overhead", "cost.variances-analysis"],
            objectives: [
              "Explain a system of standard costing and its advantages and disadvantages and how it improves business performance.",
              "Calculate direct material price and usage, direct labour rate and efficiency, fixed overhead expenditure and volume (with capacity and efficiency sub-variances) and sales price and volume variances.",
              "Explain the possible causes of favourable and adverse variances and their relationships, and make decisions and recommendations, noting non-financial factors.",
            ],
          }),
        ],
      }),
      topic("budgeting", "4.3", "Budgeting and budgetary control", {
        components: P4,
        children: [
          sub("budgeting.budgeting", "4.3.1", "Budgeting and budgetary control", {
            stage: ALO,
            covers: ["budget.purpose-behaviour", "budget.operating-budgets", "budget.cash-budget", "budget.master-budget", "budget.flexible-budgets"],
            objectives: [
              "Explain the advantages and disadvantages of budgetary control and of using spreadsheets, the master budget, limiting factors and the behavioural aspects of budgeting.",
              "Prepare sales, production, purchases, labour, trade receivables, trade payables and cash budgets and budgeted statements of profit or loss and financial position.",
              "Prepare a flexible budget statement and statements reconciling flexible budgeted with actual cost of production and profit, explain differences and make recommendations.",
            ],
          }),
        ],
      }),
      topic("investment-appraisal", "4.4", "Investment appraisal", {
        components: P4,
        children: [
          sub("investment-appraisal.appraisal", "4.4.1", "Investment appraisal", {
            stage: ALO,
            covers: ["invest.payback-arr", "invest.npv-irr", "invest.evaluation"],
            description: "Questions on discounted payback and on residual values of an investment will not be set.",
            objectives: [
              "Identify the future net cash inflows and outflows of a project and apply payback, accounting rate of return, net present value and internal rate of return.",
              "Explain the advantages and disadvantages of the techniques and make investment decisions and recommendations, noting non-financial factors.",
            ],
          }),
        ],
      }),
    ],
  }),
];

const c9706 = {
  board: "cambridge",
  qualification: "a-level",
  subject: "accounting",
  versionLabel: "2026-2028",
  family: "accounting-a",
  title: "Cambridge International AS & A Level Accounting (9706)",
  code: "9706",
  effectiveFrom: "2026-01-01",
  effectiveTo: "2028-12-31",
  publishAs: "CURRENT",
  officialDocument: {
    title: "Cambridge International AS & A Level Accounting 9706 syllabus for 2026, 2027 and 2028 (version 2, published December 2025)",
    url: "https://www.cambridgeinternational.org/Images/697417-2026-2028-syllabus.pdf",
    publisher: "Cambridge University Press & Assessment (Cambridge International Education)",
  },
  sourceNote: "Topic and sub-topic headings (1.1 Types of business entity ... 4.4.1 Investment appraisal) are transcribed with their printed numbers. The syllabus lists 'candidates should have an understanding of' bullets without numbers: objective codes (1.1.1.1 ...) are ours, and the bullets are paraphrased in our own words. The two sections (AS and A) are ours, following the syllabus's own split of AS Level topics 1.1-2.2 and A Level topics 3.1-4.4. No syllabus text is reproduced.",
  notes: [
    "Source (read 2026-10-10): the official PDF 'Cambridge International AS & A Level Accounting 9706 syllabus for 2026, 2027 and 2028', version 2, published December 2025 (version 2 differs from version 1 only by an updated weblink), read through a pdftotext rendering. Exams in the June and November series (March for India). Check headings and the notes against the PDF.",
    "Routes as printed: AS Level only (Papers 1 and 2 in one series; grades a-e); A Level staged over two years (AS in year 1, carried forward, then Papers 3 and 4); A Level in one series (all four papers; grades A*-E). Route A here covers both A Level routes.",
    "Weightings: Paper 1 28% of AS and 14% of A Level; Paper 2 72% and 36%; Paper 3 30% of A Level; Paper 4 20% of A Level. weightingPercent records the A Level share; the AS shares are in each paper's description. Assessment objectives: AO1 63% (AS) and 55% (A Level), AO2 25% and 30%, AO3 12% and 15%.",
    "Topics 1.1-2.2 are AS content (Papers 1 and 2, assumed knowledge for Papers 3 and 4); topics 3.1-4.4 are A Level only (Paper 3: financial accounting, Paper 4: cost and management accounting). Partnership changes, clubs and societies, manufacturing accounts, the statement of cash flows, business acquisition, computerised-system transfer, activity based costing, standard costing, budgeting and investment appraisal are therefore A Level only for Cambridge although ZIMSEC teaches most of them in Form 5 or Form 6.",
    "Paper 1 (1 hour, 30 marks, 30 questions): 22 on financial accounting, 8 on cost and management accounting, AS content only. Paper 2 (1 hour 45 minutes, 90 marks): Q1 30 marks, Q2 and Q3 15 marks each (financial accounting), Q4 30 marks (cost and management accounting). Paper 3 (1 hour 30 minutes, 75 marks): three structured questions of 25 marks with source material on an insert. Paper 4 (1 hour, 50 marks): two structured questions of 25 marks with an insert.",
    "Notes that bound the content: questions on limited liability partnerships are not set; questions on preference shares are not set; the revaluation reserve is not used for a bonus issue; no break-even chart is to be prepared (only interpreted); no specific software; discounted payback and residual values of investments are not set. The syllabus Appendix (profitability, liquidity, efficiency and the A Level solvency and investment ratios) gives the only accepted formulae; ratios are not printed in question papers. The expected formats of the financial statements are in the separate Teacher Guidance for 9706 (not in the repository); our layouts follow IAS 1.",
    "The syllabus runs from 2026 to 2028 inclusive, so effectiveFrom 2026-01-01 and effectiveTo 2028-12-31. Candidates from 2029 will follow a later syllabus (not in the repository); check the Cambridge website for it and add a new version file.",
  ],
  overview: "Cambridge International AS & A Level Accounting (9706) is a two-stage course. The AS Level content (topics 1.1-2.2) covers business entities and their finance, the accounting system and accounting concepts, non-current assets and depreciation, reconciliation and verification (errors and suspense accounts, bank reconciliations, control accounts), financial statements of sole traders, partnerships and limited companies, ratio analysis and users of accounting information, and costs, absorption costing, marginal costing and cost-volume-profit analysis. The A Level content (topics 3.1-4.4) adds partnership changes, clubs and societies, manufacturing accounts, company statements including cash flows, regulation, ethics and auditing, business acquisition and merger, computerised systems, investment ratios, activity based costing, standard costing, budgeting and investment appraisal.",
  assessmentOverview: "AS Level candidates take Paper 1 Multiple Choice (1 hour, 30 marks) and Paper 2 Fundamentals of Accounting (1 hour 45 minutes, 90 marks, four structured questions). A Level candidates also take Paper 3 Financial Accounting (1 hour 30 minutes, 75 marks, three structured questions) and Paper 4 Cost and Management Accounting (1 hour, 50 marks, two structured questions), in the same series or a later one, carrying forward their AS result.",
  components: [
    { code: "1", name: "Paper 1: Multiple Choice", kind: "MULTIPLE_CHOICE", description: "30 multiple-choice questions on the AS Level content: 22 on financial accounting and 8 on cost and management accounting (AO1 and AO2). 28% of AS Level, 14% of A Level.", durationMinutes: 60, maxMarks: 30, weightingPercent: 14, calculatorAllowed: true },
    { code: "2", name: "Paper 2: Fundamentals of Accounting", kind: "WRITTEN", description: "Four compulsory structured questions on the AS Level content: Q1 (30 marks), Q2 and Q3 (15 marks each) on financial accounting and Q4 (30 marks) on cost and management accounting (AO1, AO2 and AO3). 72% of AS Level, 36% of A Level.", durationMinutes: 105, maxMarks: 90, weightingPercent: 36, calculatorAllowed: true },
    { code: "3", name: "Paper 3: Financial Accounting", kind: "WRITTEN", description: "Three compulsory structured questions of 25 marks each on the A Level financial accounting content (section 3), with source material on an insert and AS Level content assumed (AO1, AO2 and AO3). 30% of A Level.", durationMinutes: 90, maxMarks: 75, weightingPercent: 30, calculatorAllowed: true },
    { code: "4", name: "Paper 4: Cost and Management Accounting", kind: "WRITTEN", description: "Two compulsory structured questions of 25 marks each on the A Level cost and management accounting content (section 4), with source material on an insert and AS Level content assumed (AO1, AO2 and AO3). 20% of A Level.", durationMinutes: 60, maxMarks: 50, weightingPercent: 20, calculatorAllowed: true },
  ],
  routes: [
    { code: "AS", name: "AS Level", description: "Papers 1 and 2 (grades a-e). Also the first year of the staged A Level route.", components: ["1", "2"] },
    { code: "A", name: "A Level", description: "All four papers, in one series or staged (AS Level carried forward, then Papers 3 and 4) (grades A*-E).", isDefault: true, components: ["1", "2", "3", "4"] },
  ],
  topics: C9706_TOPICS,
};

// =====================================================================================================================
// Checks: every covered concept exists, each concept is covered at most once per syllabus (on the most specific node),
// every concept is covered by at least one syllabus, node keys and objective codes are unique; report what each
// syllabus leaves out. Then label each concept description with its coverage.
const coverage = new Map(); // concept -> { zimsec?: form, cambridge?: stage }
for (const s of [zimsec, c9706]) {
  const seen = new Map();
  const codes = new Set();
  const keys = new Set();
  let nodes = 0;
  const walk = (list) => {
    for (const n of list) {
      nodes++;
      if (keys.has(n.key)) throw new Error(`${s.board}: duplicate node key ${n.key}`);
      keys.add(n.key);
      if ((n.covers ?? []).length && (n.children ?? []).length) throw new Error(`${s.board}: ${n.key} covers concepts and has children (cover on the most specific node)`);
      if ((n.covers ?? []).length && !(n._form || n._stage)) throw new Error(`${s.board}: ${n.key} covers concepts but has no form/stage`);
      for (const c of n.covers ?? []) {
        if (!CONCEPT_KEYS.has(c)) throw new Error(`${s.board}/${s.subject}/${s.versionLabel}: unknown concept ${c} on ${n.key}`);
        if (seen.has(c)) throw new Error(`${s.board}/${s.subject}/${s.versionLabel}: ${c} covered on ${seen.get(c)} and ${n.key}`);
        seen.set(c, n.key);
        coverage.set(c, { ...(coverage.get(c) ?? {}), [s.board]: n._form ?? n._stage });
      }
      for (const ob of n.objectives ?? []) {
        if (codes.has(ob.code)) throw new Error(`${s.board}: duplicate objective code ${ob.code}`);
        codes.add(ob.code);
      }
      walk(n.children ?? []);
    }
  };
  walk(s.topics);
  const missing = [...CONCEPT_KEYS].filter((k) => !seen.has(k));
  console.log(`${s.board}/${s.qualification}/${s.subject}/${s.versionLabel}: ${s.topics.length} top-level nodes, ${nodes} nodes, ${seen.size} concepts covered, ${codes.size} objectives; not covered (${missing.length}): ${missing.join(", ") || "none"}\n`);
}
const orphans = [...CONCEPT_KEYS].filter((k) => !coverage.has(k));
if (orphans.length) throw new Error(`concepts no syllabus covers: ${orphans.join(", ")}`);

const label = (cv) => {
  if (cv.zimsec && cv.cambridge) return `Both boards (ZIMSEC ${cv.zimsec}; Cambridge ${cv.cambridge}).`;
  if (cv.zimsec) return `ZIMSEC only (${cv.zimsec}).`;
  return `Cambridge only (${cv.cambridge}).`;
};
const shared = [...coverage.values()].filter((c) => c.zimsec && c.cambridge).length;
console.log(`${CONCEPTS.length} concepts in the registry (${shared} shared, ${[...coverage.values()].filter((c) => !c.cambridge).length} ZIMSEC only, ${[...coverage.values()].filter((c) => !c.zimsec).length} Cambridge only)`);

const registry = {
  family: "accounting-a",
  name: "Accounting (A-Level / AS & A Level)",
  level: "A",
  prefix: "aacc",
  subjects: ["zimsec/a-level/accounting", "cambridge/a-level/accounting"],
  concepts: CONCEPTS.map(([key, name, description]) => ({ key, name, description: `${label(coverage.get(key))} ${description}` })),
};

const strip = (k, v) => (k.startsWith("_") ? undefined : v);
const write = (rel, data) => {
  const file = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, strip, 2) + "\n");
  console.log("wrote", rel);
};
write("content/concepts/accounting-a.json", registry);
write("content/syllabi/zimsec/a-level/accounting/2015-2022.json", zimsec);
write("content/syllabi/cambridge/a-level/accounting/2026-2028.json", c9706);
