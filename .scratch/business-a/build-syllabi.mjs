// Builds content/concepts/business-a.json and the three A-Level Business syllabus files:
//   content/syllabi/zimsec/a-level/business-studies/2015-2022.json            (ZIMSEC A-Level Business Studies, Forms 5-6)
//   content/syllabi/zimsec/a-level/business-enterprise-skills/2015-2022.json  (ZIMSEC A-Level Business Enterprise Skills, Forms 5-6)
//   content/syllabi/cambridge/a-level/business/2026-2028.json                 (Cambridge International AS & A Level Business 9609)
// Sources (local only, not in git): .scratch/business-a/sources/zimsec-business-studies-a.pdf (+ .txt),
// zimsec-business-enterprise-a.pdf (+ .txt) and 9609-2026-2028.pdf (+ .txt). The concept registry lives in ./concepts.mjs;
// this script prepends each concept's coverage label. Run from the repo root: node .scratch/business-a/build-syllabi.mjs
import fs from "node:fs";
import path from "node:path";
import { CONCEPTS } from "./concepts.mjs";

const ROOT = process.cwd();
const CONCEPT_KEYS = new Set(CONCEPTS.map(([k]) => k));
if (CONCEPT_KEYS.size !== CONCEPTS.length) throw new Error("duplicate concept key in concepts.mjs");
for (const [k] of CONCEPTS) if (!/^abus\.[a-z0-9-]+\.[a-z0-9-]+$/.test(k)) throw new Error(`bad concept key ${k}`);

// ---------------------------------------------------------------------------------------------------------------------
// Node helpers. `form` (ZIMSEC: "Form 5" / "Form 6" / "Forms 5-6") and `stage` (Cambridge: "AS Level" / "A Level only")
// are build-time metadata used for the concept labels; keys starting with "_" are not written. `covers` are written
// without the "abus." prefix and expanded here.
const node = (kind, key, code, name, { description, covers = [], objectives = [], components, optional, optionGroup, children, form, stage } = {}) => {
  const n = { key, code, name, kind };
  if (description) n.description = description;
  if (covers.length) n.covers = covers.map((c) => `abus.${c}`);
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
// ZIMSEC A-Level Business Studies, Forms 5-6, 2015-2022. The eight top-level topics are those of the topic list (3.0):
// Business and its Environment; ICT in Business; Business Planning and Project Development; Human Resources Management
// (headed People in Organisations in the scope and sequence and matrix); Business Communication; Marketing; Operations
// Management; Business Finance and Accounting. Sub-topics are the topic rows of the competency matrix (5.0) with the form
// (5 or 6) in which each is taught. The document prints no numbers below the topic level: all topic and sub-topic codes
// (1 ... 8, 1.1 ...) and all objective codes are ours.
const THEORY = ["1", "2"];
const F5 = "Form 5";
const F6 = "Form 6";
const F56 = "Forms 5-6";

const ZBS_TOPICS = [
  topic("business-environment", "1", "Business and its Environment", {
    description: "Forms 5 and 6 (matrix 5.1 for Form 5, 5.7 for Form 6).",
    components: THEORY,
    children: [
      sub("business-environment.introduction", "1.1", "Introduction to Business", {
        form: F5,
        description: "The matrix row covers the need for business, levels of activity, industrialisation, sectors, types of business organisation, how a business is formed, changes in ownership (privatisation and nationalisation) and economic systems.",
        covers: ["enterprise.business-activity", "structure.sectors", "structure.unincorporated", "structure.companies", "structure.economic-systems"],
        objectives: [
          "Explain why businesses are needed and classify business activity into the primary, secondary and tertiary levels; describe industrialisation.",
          "Classify organisations into the public and private sectors and describe sole traders, partnerships, co-operatives and public limited companies, the legal process of forming a business and the advantages and disadvantages of each.",
          "Explain privatisation and nationalisation and the characteristics, advantages and disadvantages of free, command and mixed economic systems.",
        ],
      }),
      sub("business-environment.types", "1.2", "Types of Business Environments", {
        form: F5,
        covers: ["strategy.environment-scanning", "environment.political-legal", "environment.technology-competitors", "stakeholders.roles-influence"],
        objectives: [
          "Identify and explain the macro environment (political, economic, legal, technological) and the micro environment (capital, skills, workers) with examples.",
          "Identify business stakeholders and discuss examples.",
        ],
      }),
      sub("business-environment.size-growth", "1.3", "Size and Growth of Business", {
        form: F5,
        covers: ["size.measuring", "size.small-business", "size.mergers-takeovers", "environment.government-economy"],
        objectives: [
          "Measure the size of a business by capital, number of employees and market share and apply one method to a business of choice.",
          "Explain the importance of small and medium enterprises in Zimbabwe, the problems they face and possible solutions; evaluate state interventions that assist or constrain businesses of different sizes.",
          "Explain the advantages and disadvantages of being small or large and the methods of business growth: merger, takeover, vertical and horizontal integration.",
        ],
      }),
      sub("business-environment.aims-objectives", "1.4", "Business Aims and Objectives", {
        form: F5,
        covers: ["objectives.aims-types"],
        objectives: [
          "Explain business aims and objectives, the hierarchy of objectives (strategic, tactical, operational), their characteristics and types (survival, growth, profit maximisation).",
          "Discuss the importance of business objectives and examine conflict between them.",
        ],
      }),
      sub("business-environment.constraints-ethics", "1.5", "Business Constraints, Ethics and Corporate Social Responsibility", {
        form: F5,
        covers: ["objectives.decisions-ethics"],
        objectives: [
          "Explain constraints that influence business objectives.",
          "Explain business ethics and corporate social responsibility and assess their importance to a business and the community.",
        ],
      }),
      sub("business-environment.international-trade", "1.6", "International Trade", {
        form: F6,
        covers: ["international.trade-integration", "international.multinationals-globalisation"],
        objectives: [
          "Outline the importance of international trade and describe imports, exports and the balance of payments.",
          "Explain the importance of regional economic integration (such as SADC, COMESA, ECOWAS) and the effect of trade barriers on business, and analyse ways of reducing their effects.",
          "Examine the benefits and problems of multinational companies for host and home countries and the advantages and disadvantages of globalisation.",
        ],
      }),
      sub("business-environment.mbo", "1.7", "Management by Objectives", {
        form: F6,
        description: "The matrix places this row in Form 6 'Business and its Environment'.",
        covers: ["hrm.performance-mbo"],
        objectives: [
          "Explain management by objectives and examine its benefits, limitations and appropriateness to given situations.",
        ],
      }),
      sub("business-environment.failure", "1.8", "Causes of Business Failure", {
        form: F6,
        covers: ["enterprise.success-failure"],
        objectives: [
          "Identify causes of business failure and analyse ways of reducing it, using cases of failed businesses.",
        ],
      }),
    ],
  }),
  topic("ict", "2", "ICT in Business", {
    description: "Form 5 (matrix 5.1, last row). ICT in marketing and in operations are in topics 6 and 7.",
    components: THEORY,
    children: [
      sub("ict.role", "2.1", "ICT in Business", {
        form: F5,
        covers: ["ict.role-in-business"],
        objectives: [
          "Identify ICT resources and explain the role of ICT in the functional areas of a business.",
          "Analyse the advantages and disadvantages of ICT in business.",
        ],
      }),
    ],
  }),
  topic("planning-projects", "3", "Business Planning and Project Development", {
    description: "Forms 5 and 6 (matrix 5.2). The scope and sequence lists the formulation of projects and the tools for decision making in the Form 6 column, the matrix prints them in the Form 5 section: the node form is given as Forms 5-6.",
    components: THEORY,
    children: [
      sub("planning-projects.business-plan", "3.1", "Business Plan", {
        form: F5,
        covers: ["enterprise.business-plans"],
        objectives: [
          "Explain the purpose of a business plan, analyse its components (executive summary, organisational background, products, market analysis, strategy and implementation, management, financial plan) and develop a plan.",
        ],
      }),
      sub("planning-projects.project", "3.2", "Business Project and Project Formulation", {
        form: F56,
        covers: ["project.formulation"],
        objectives: [
          "Explain a business project and design a project plan: project identification, project proposal, project plan, implementation and evaluation.",
          "Develop a business project from a business idea of the learner's choice.",
        ],
      }),
      sub("planning-projects.decision-tools", "3.3", "Tools for Decision Making", {
        form: F56,
        covers: ["operations.critical-path", "strategy.decision-trees", "project.cost-benefit"],
        objectives: [
          "Construct a network diagram with dummy activities and nodes and calculate earliest starting times, latest finishing times, the minimum project duration and the critical path.",
          "Construct a decision tree, evaluate the alternatives and make a decision.",
          "Tabulate the costs and benefits of a project (cost-benefit analysis) and evaluate the usefulness of each decision-making tool.",
        ],
      }),
    ],
  }),
  topic("people", "4", "Human Resources Management", {
    description: "Forms 5 and 6 (headed People in Organisations in the scope and sequence and matrix 5.3 and 5.8).",
    components: THEORY,
    children: [
      sub("people.management", "4.1", "Management", {
        form: F5,
        covers: ["management.functions-roles-theories"],
        objectives: [
          "Describe the functions and roles of management and apply them in business cases.",
          "Analyse management theories and apply them to today's business.",
        ],
      }),
      sub("people.leadership", "4.2", "Leadership", {
        form: F5,
        covers: ["leadership.nature-qualities", "management.styles-mcgregor", "leadership.theories-eq"],
        objectives: [
          "Distinguish leadership from management, identify leadership qualities and roles and discuss informal leadership.",
          "Explain leadership styles, recommend styles for different situations and analyse the relevance of leadership theories such as McGregor's Theory X and Theory Y.",
        ],
      }),
      sub("people.motivation", "4.3", "Motivation", {
        form: F5,
        covers: ["motivation.scientific-human-relations", "motivation.needs-maslow-herzberg", "motivation.financial", "motivation.non-financial"],
        objectives: [
          "Identify the needs people seek to satisfy at work, explain the importance of motivation and describe theories of motivation (Maslow, Taylor, Herzberg, Mayo).",
          "Distinguish financial from non-financial methods of motivation, evaluate them and suggest appropriate methods for given circumstances.",
        ],
      }),
      sub("people.structure", "4.4", "Organisational Structure", {
        form: F6,
        covers: ["organisation.structure-features", "organisation.structure-types", "organisation.delegation-control", "organisation.centralisation-line-staff"],
        objectives: [
          "Explain the need for and nature of an organisational structure, illustrate an organisational chart and outline its features: span of control, chain of command, authority, delegation, centralisation.",
          "Distinguish formal from informal organisations and examine functional, divisional and matrix structures in relation to local organisations.",
        ],
      }),
      sub("people.hrm", "4.5", "Human Resources Management", {
        form: F6,
        covers: ["hrm.purpose-planning", "hrm.recruitment-selection", "hrm.redundancy-dismissal", "hrm.morale-welfare-safety", "hrm.training-development", "hrm.labour-relations"],
        objectives: [
          "Explain the functions of human resources management: planning, job descriptions and advertisements, employment contracts, recruitment, selection, discipline, welfare and dismissal.",
          "Analyse labour and management relations: labour legislation, collective bargaining, dispute settlement and cooperation.",
          "Distinguish training from development, evaluate training methods (induction, on-the-job, off-the-job) and assess health and safety issues in the workplace and the role of human resources management.",
        ],
      }),
    ],
  }),
  topic("communication", "5", "Business Communication", {
    description: "Form 5 (matrix 5.4); the scope and sequence lists barriers to communication and the role of management in facilitating communication in Form 6.",
    components: THEORY,
    children: [
      sub("communication.business-communication", "5.1", "Business Communication", {
        form: F56,
        covers: ["communication.purposes-methods", "communication.channels-barriers"],
        objectives: [
          "Explain the situations in which communication is essential, examine the communication process and evaluate channels (horizontal, vertical, one-way, two-way) and methods and media of communication.",
          "Examine barriers to effective communication and the role of management in reducing them; distinguish formal from informal communication.",
        ],
      }),
    ],
  }),
  topic("marketing", "6", "Marketing", {
    description: "Forms 5 and 6 (matrix 5.5 and the Form 6 marketing pages).",
    components: THEORY,
    children: [
      sub("marketing.markets", "6.1", "Marketing and Markets", {
        form: F5,
        covers: ["marketing.role-objectives", "marketing.markets", "marketing.segmentation-niche"],
        objectives: [
          "Describe marketing and e-marketing and analyse the relationship between marketing and other functional departments.",
          "Analyse the market (size, share, competitors, location), calculate market share, apply market segmentation and distinguish niche from mass marketing.",
        ],
      }),
      sub("marketing.research", "6.2", "Market Research", {
        form: F5,
        covers: ["research.purposes-methods", "research.data-analysis"],
        objectives: [
          "Evaluate the market research process: primary and secondary research, sampling methods (random, stratified, quota) and methods of gathering information (questionnaires, interviews).",
          "Calculate measures of central tendency and dispersion, present data in tables, graphs and pie charts and make decisions from research results.",
        ],
      }),
      sub("marketing.forecasting-demand", "6.3", "Sales Forecasting, Demand and Supply, and Elasticity", {
        form: F5,
        covers: ["marketing.sales-forecasting", "marketing.demand-supply", "marketing.elasticity"],
        objectives: [
          "Explain quantitative (time series) and qualitative (Delphi) sales forecasting techniques.",
          "Analyse the determinants of demand and supply and calculate and apply elasticity of demand concepts (price, income, cross, promotional spending) to marketing decisions.",
        ],
      }),
      sub("marketing.mix", "6.4", "Marketing Mix and Marketing Strategies", {
        form: F6,
        covers: ["mix.product", "mix.life-cycle-portfolio", "mix.pricing", "mix.promotion", "mix.place", "marketing.product-development", "strategy.models"],
        objectives: [
          "Analyse the marketing mix: classify products, explain product development, packaging and branding, evaluate the product life cycle, the Boston Consulting Group matrix and the Ansoff matrix.",
          "Explain pricing objectives, factors influencing price and pricing strategies; apply promotion mix elements, determine promotional budgets and assess the effect of a campaign on sales.",
          "Evaluate distribution channels and explain the importance of physical evidence, people and processes in services marketing.",
        ],
      }),
      sub("marketing.icts", "6.5", "Impact of ICTs in Marketing", {
        form: F6,
        covers: ["mix.digital"],
        objectives: [
          "Assess the impact of ICTs in marketing (electronic, mobile and social media marketing) and apply ICT tools in marketing.",
        ],
      }),
    ],
  }),
  topic("operations", "7", "Operations Management", {
    description: "Forms 5 and 6 (matrix 5.6 and the Form 6 operations pages).",
    components: THEORY,
    children: [
      sub("operations.nature", "7.1", "Nature of Operations", {
        form: F5,
        covers: ["operations.transformation", "operations.productivity", "operations.methods-intensity", "operations.capacity-outsourcing", "operations.location-scale"],
        objectives: [
          "Evaluate the stages of production and the production function (inputs, processes, outputs); calculate labour and capital productivity and explain how to increase productivity, effectiveness and efficiency, and value analysis.",
          "Evaluate job, batch and flow production methods, organising production (kaizen) and capacity utilisation and how to increase it.",
          "Identify the factors that determine location and relocation of production.",
        ],
      }),
      sub("operations.costing", "7.2", "Production Costing and Break-even Analysis", {
        form: F5,
        covers: ["finance.cost-types", "finance.costing-methods", "finance.break-even"],
        objectives: [
          "Justify the need for cost data and apply absorption and contribution costing.",
          "Construct the break-even chart, determine the break-even point, margin of safety and profit or loss region, and discuss the benefits and limitations of break-even analysis.",
        ],
      }),
      sub("operations.efficiency", "7.3", "Operational Efficiency: Inventory Control and Work Study", {
        form: F6,
        covers: ["operations.inventory-control", "operations.inventory-eoq-jit", "operations.work-study"],
        objectives: [
          "Evaluate methods of inventory control (just in time, stock control chart, economic order quantity), calculate EOQ and assess the costs and benefits of holding stock.",
          "Explain work study (method study and work measurement) and assess the usefulness of its results for efficiency and productivity.",
        ],
      }),
      sub("operations.lean-quality", "7.4", "Lean Production and Quality Management", {
        form: F6,
        covers: ["operations.lean", "operations.quality"],
        objectives: [
          "Evaluate the appropriateness of lean production techniques (just in time, total quality management, quality circles) in different circumstances.",
          "Discuss and evaluate quality control techniques (inspection, random sampling, testing, involving workers, TQM, kaizen groups) and methods (feed forward, concurrent, feedback) and assess the importance of quality assurance.",
        ],
      }),
      sub("operations.icts", "7.5", "Impact of ICTs on Operations Management", {
        form: F6,
        covers: ["operations.erp-ict"],
        objectives: [
          "Apply ICTs in operations activities (production, inventory control, quality control, costing) and describe computer aided design and manufacturing.",
        ],
      }),
    ],
  }),
  topic("finance", "8", "Business Finance and Accounting", {
    description: "Forms 5 and 6 (Form 5: business finance and financial markets; Form 6: topic 7 Finance and Accounting).",
    components: THEORY,
    children: [
      sub("finance.business-finance", "8.1", "Business Finance", {
        form: F5,
        covers: ["finance.need", "finance.working-capital"],
        objectives: [
          "Explain the importance of finance in business (start-up capital, expansion) and distinguish capital expenditure from revenue expenditure.",
          "Explain the significance of working capital and assess how to manage and control it.",
        ],
      }),
      sub("finance.financial-markets", "8.2", "Sources of Finance and Financial Markets", {
        form: F5,
        covers: ["finance.sources-internal", "finance.sources-external", "finance.choosing-source", "finance.financial-markets"],
        objectives: [
          "Evaluate short-term and long-term, internal and external sources of finance and the drivers of the choice of finance.",
          "Distinguish money from capital markets (including the Zimbabwe Stock Exchange and commercial banks), explain their functions and the role of international financial institutions such as the African Development Bank, World Bank and IMF.",
        ],
      }),
      sub("finance.accounting", "8.3", "Accounting", {
        form: F6,
        covers: ["accounts.users-reports-concepts", "accounts.profit-loss", "accounts.financial-position", "accounts.cash-flow-statement", "accounts.depreciation-inventory"],
        objectives: [
          "Identify users of financial statements and draw up a straightforward income statement, statement of financial position and statement of cash flow (direct and indirect methods); interpret them and use them in decisions.",
          "Calculate depreciation by the straight-line and reducing-balance methods and explain the advantages and disadvantages of FIFO, LIFO and AVCO stock valuation.",
        ],
      }),
      sub("finance.ratios", "8.4", "Ratio Analysis", {
        form: F6,
        description: "The matrix names financial efficiency ratios (stock turnover, debtor days, creditor days) and investor ratios (dividend yield, dividend cover, price earnings ratio); liquidity and profitability ratios are assumed from the other syllabi and are covered here too (see notes).",
        covers: ["ratios.efficiency", "ratios.gearing-investor", "ratios.liquidity", "ratios.profitability", "ratios.interpretation-limits"],
        objectives: [
          "Calculate and interpret financial efficiency ratios and investor ratios.",
          "Evaluate the usefulness and limitations of ratio analysis, trend analysis and inter-firm comparisons in decision making.",
        ],
      }),
      sub("finance.investment", "8.5", "Investment Appraisal", {
        form: F6,
        covers: ["invest.payback-arr", "invest.npv-decisions"],
        objectives: [
          "Calculate the payback period, average rate of return and net present value and evaluate the usefulness of each technique.",
          "Discuss factors influencing investment decisions: political, legal, economic and investor confidence.",
        ],
      }),
      sub("finance.cash-flow", "8.6", "Cash Flow Forecasts", {
        form: F6,
        covers: ["finance.cash-flow-forecast"],
        objectives: [
          "Draw up a simple cash flow forecast from given data, amend it for changed circumstances and use it to make decisions.",
        ],
      }),
      sub("finance.budgeting", "8.7", "Budgeting", {
        form: F6,
        covers: ["finance.budgets-variances"],
        objectives: [
          "Explain the purpose of budgets and budgetary control, prepare a budget (flexible and zero-based budgets) and assess the benefits and drawbacks of using budgets.",
        ],
      }),
    ],
  }),
];

const zbs = {
  board: "zimsec",
  qualification: "a-level",
  subject: "business-studies",
  versionLabel: "2015-2022",
  family: "business-a",
  title: "ZIMSEC A-Level Business Studies",
  code: null,
  effectiveFrom: "2018-01-01",
  effectiveTo: null,
  publishAs: "CURRENT",
  officialDocument: {
    title: "Business Studies Syllabus, Forms 5 - 6, 2015 - 2022 (Ministry of Primary and Secondary Education, Curriculum Development and Technical Services), examined by ZIMSEC at A Level",
    url: "https://www.zimsake.co.zw/softidrive/",
    publisher: "Ministry of Primary and Secondary Education (Curriculum Development and Technical Services) / Zimbabwe School Examinations Council (ZIMSEC)",
  },
  sourceNote: "The eight topics are transcribed from the topic list (3.0) of the Ministry's Business Studies Syllabus Forms 5 - 6 (2015 - 2022). Sub-topics are the topic rows of the competency matrix (5.0), grouped by the scope-and-sequence headings, with the form (5 or 6) in which each is taught. The document prints no numbers below topic level: all topic and sub-topic codes and all objective codes are ours. Learning-objective statements are our own paraphrase; no syllabus text is reproduced.",
  notes: [
    "Source (read 2026-10-10): Ministry document, copy obtained from zimsake.co.zw softidrive (the zimsake.co.zw document library; the URL recorded is the library's address because the file has no stable direct link). The cover prints 'Business Studies Syllabus Forms 5 - 6 2015 - 2022' (Curriculum Development and Technical Services, Mount Pleasant, Harare). It was read through a pdftotext rendering in which the scope-and-sequence and competency-matrix tables come out with columns interleaved and several blocks overprinted (the assessment pages in particular); check every heading, the form of each item, each objective and the assessment figures against a clean copy from ZIMSEC.",
    "Subject code: not printed in the document. The commonly cited ZIMSEC code for A-Level Business Studies could not be confirmed from the document; left null. Confirm with ZIMSEC.",
    "Heritage-Based Curriculum: ZIMSEC introduced Heritage-Based Curriculum syllabi for Forms 5-6 (new versions for some subjects from about 2024). Confirm which Business Studies syllabus November 2026 and later A-Level candidates sit, set effectiveTo, and create a new version file when a new syllabus replaces this one. Version dates assumed: first examined in November 2018 (effectiveFrom 2018-01-01).",
    "Topics: the topic list (3.0) names eight topics (ICT in Business is a separate bullet); the scope and sequence and the matrix list seven (ICT is the last row of Business and its Environment, Form 5). This tree follows the topic list and puts the ICT row under its own topic. The matrix headings are 5.1-5.8 per page (not per topic); the Form 6 pages repeat the headings of the topics they continue.",
    "Placement of forms: the matrix pages headed FORM 5 and FORM 6 settle the form of each row; the scope and sequence lists 'Formulation of project', 'Tools for decision making' and 'Project' under Form 6 and 'Barriers to communication' under Form 6, while the matrix prints them in the Form 5 section. Those nodes are tagged Forms 5-6 for that reason. Management by objectives is a row of Form 6 'Business and its Environment'.",
    "Coverage choices: liquidity and profitability ratios are not named in the Ratio Analysis row (efficiency ratios and investor ratios are) but are covered by the node because candidates are expected to calculate and interpret ratios in general and they appear in the sister syllabi; the cash flow statement (direct and indirect methods) and LIFO stock valuation are named in the Accounting row. Concepts that this syllabus does not list (for example entrepreneurs, organic growth, strategic management, McClelland and Vroom, marketing plans) are not covered here.",
    "Assessment (5.9-5.12) as read: continuous assessment 30% (theory tests, assignments and practical projects across five terms; the weighting column reads 20, 20 and 60, apparently the shares of the continuous assessment mark) and a summative examination 70%: Paper 1 Structured and Case Study (3 hours, 100 marks, printed weighting 50% of the summative examination): Section A structured questions totalling 70 marks and Section B a case study totalling 30 marks; Paper 2 Data Response and Essays (3 hours, 100 marks, 50%): Section A a data response question totalling 25 marks and Section B three essay questions totalling 75 marks answered out of nine. weightingPercent records the share of the whole qualification (35% each). Continuous assessment is not a component here and is not simulated.",
    "Specification grid as read (percent of the whole qualification): Paper 1 knowledge with understanding 15, application 10, analysis 5, evaluation 5 (35); Paper 2 11, 9, 8, 7 (35); the totals row prints 26, 19, 14 and 12, and 14 does not equal 5 + 8. Check against a clean copy.",
    "Question structure inside the papers is not printed beyond the totals above: our convention for exam-format items is seven structured questions of 10 marks in Paper 1 Section A, 25 marks for each essay (a 10-mark part and a 15-mark evaluation part) and one 30-mark case study in Paper 1. A reviewer must check these against recent ZIMSEC papers. Calculator use is not stated; assumed allowed.",
    "Not printed and therefore assumed from earlier study: the 7Ps (people, processes, physical evidence) beyond a one-line mention, ratio formulas, the discount factor method for NPV, and statutory detail (labour law, company law, health and safety). Lessons mark ZIMSEC detail explicitly.",
  ],
  overview: "The ZIMSEC A-Level Business Studies syllabus (Forms 5-6) develops skills in decision making, problem solving, communication, leadership and enterprising. It has eight topics: Business and its Environment (business and economic systems, forms of business, size and growth, aims and objectives, ethics, international trade and failure), ICT in Business, Business Planning and Project Development (business plans, projects, network analysis, decision trees and cost-benefit analysis), Human Resources Management (management, leadership, motivation, organisational structure and HRM), Business Communication, Marketing (research, forecasting, the marketing mix and ICTs), Operations Management (production, costing and break-even, inventory, work study, lean production and quality) and Business Finance and Accounting (finance, financial statements, ratios, investment appraisal, cash flow forecasts and budgets).",
  assessmentOverview: "Continuous assessment (theory tests, assignments and practical projects) carries 30%. The examination carries 70%: Paper 1 Structured and Case Study (3 hours, 100 marks: structured questions 70 marks and a case study 30 marks) and Paper 2 Data Response and Essays (3 hours, 100 marks: a data response question of 25 marks and three essays of 25 marks from nine), each 35% of the whole.",
  components: [
    { code: "1", name: "Paper 1: Structured and Case Study", kind: "WRITTEN", description: "Section A: structured questions totalling 70 marks. Section B: a case study totalling 30 marks. Both sections are compulsory (3 hours; 50% of the summative examination).", durationMinutes: 180, maxMarks: 100, weightingPercent: 35, calculatorAllowed: true },
    { code: "2", name: "Paper 2: Data Response and Essays", kind: "WRITTEN", description: "Section A: a data response question totalling 25 marks. Section B: three essay questions totalling 75 marks, answered out of nine (3 hours; 50% of the summative examination).", durationMinutes: 180, maxMarks: 100, weightingPercent: 35, calculatorAllowed: true },
  ],
  topics: ZBS_TOPICS,
};

// =====================================================================================================================
// ZIMSEC A-Level Business Enterprise Skills, Forms 5-6, 2015-2022. The seven top-level topics are those of the topic list
// (6.0, numbered 6.1-6.7 as printed): The Enterprising Environment; Enterprise Formulation and Growth; Business
// Planning; Enterprise Finance and Accounting; People in Business Enterprises; Markets and Marketing; Operations
// Management. Sub-topics are the topic rows of the competency matrix (8.1 Form 5, 8.2 Form 6) in the matrix order, with
// the form in which each is taught. The document prints no numbers below the topic level (the matrix numbers 8.1.1 ...
// are its own section numbers): sub-topic codes (6.1.1 ...) and all objective codes are ours.
const BES_TOPICS = [
  topic("enterprising-environment", "6.1", "The Enterprising Environment", {
    description: "Forms 5 and 6 (matrix 8.1.1 and 8.2.1).",
    components: THEORY,
    children: [
      sub("enterprising-environment.economic-systems", "6.1.1", "Economic Systems", {
        form: F5,
        covers: ["structure.economic-systems"],
        objectives: [
          "Identify the command, free-market and mixed economic systems and explain the philosophies associated with each (capitalism, socialism, communism, indigenisation).",
          "Evaluate the implications of each system for a business enterprise.",
        ],
      }),
      sub("enterprising-environment.overview", "6.1.2", "Overview of Enterprising", {
        form: F5,
        covers: ["enterprise.entrepreneurs"],
        objectives: [
          "Explain the concepts of enterprising, an enterprising person and an enterprise; demonstrate a culture of enterprising.",
          "Discuss the characteristics of a successful enterpriser and the benefits and drawbacks of enterprising.",
        ],
      }),
      sub("enterprising-environment.environment", "6.1.3", "The Internal and External Environment", {
        form: F5,
        covers: ["strategy.environment-scanning"],
        objectives: [
          "Analyse the internal and external environment of an enterprise and apply SWOT, PESTEL and Porter's five forces to a local enterprise.",
        ],
      }),
      sub("enterprising-environment.mncs", "6.1.4", "Multinational Companies and Globalisation", {
        form: F5,
        covers: ["international.multinationals-globalisation"],
        objectives: [
          "Describe the objectives of multinational companies and the challenges they face in host countries; evaluate their impact on host countries.",
          "Evaluate the effects of globalisation on an enterprise.",
        ],
      }),
      sub("enterprising-environment.integration", "6.1.5", "Economic Integration", {
        form: F5,
        covers: ["international.trade-integration"],
        objectives: [
          "Discuss the concept and forms of economic integration (bilateral, multilateral, regional) and evaluate its importance for enterprises.",
        ],
      }),
      sub("enterprising-environment.stakeholders", "6.1.6", "Business Stakeholders", {
        form: F5,
        covers: ["stakeholders.roles-influence"],
        objectives: [
          "Identify the internal and external stakeholders of an enterprise and explain the role of each.",
        ],
      }),
      sub("enterprising-environment.resources", "6.1.7", "Resources and Capabilities", {
        form: F56,
        covers: ["enterprise.resources-capabilities"],
        objectives: [
          "Distinguish resources from capabilities and explain the need for them in an enterprise.",
          "Explain ways of acquiring resources (hire, purchase, build-own-transfer, build-own-operate-transfer) and their efficient and sustainable use.",
        ],
      }),
      sub("enterprising-environment.ventures", "6.1.8", "Ways of Enterprising, Opportunities and Risks", {
        form: F6,
        covers: ["enterprise.ventures-risks"],
        objectives: [
          "Discuss ways of enterprising (such as bee farming, mushroom farming, vending, software) and analyse enterprise opportunities, risks and constraints.",
        ],
      }),
      sub("enterprising-environment.constraints-ethics", "6.1.9", "Enterprise Constraints and Ethical Issues", {
        form: F6,
        covers: ["objectives.decisions-ethics"],
        objectives: [
          "Analyse political, legal, social, ecological and economic constraints and evaluate the importance of being ethical in business.",
        ],
      }),
    ],
  }),
  topic("enterprise-formulation", "6.2", "Enterprise Formulation and Growth", {
    description: "Forms 5 and 6 (matrix 8.1.2 and 8.2.2).",
    components: THEORY,
    children: [
      sub("enterprise-formulation.forms", "6.2.1", "Forms and Features of Business Enterprises", {
        form: F5,
        covers: ["structure.sectors", "structure.unincorporated", "structure.companies"],
        objectives: [
          "Describe the forms of business enterprise and how to start them: private and public sector, unincorporated and incorporated, limited liability, separate legal personality, continuity.",
          "Evaluate the different forms of business enterprise.",
        ],
      }),
      sub("enterprise-formulation.privatisation", "6.2.2", "Privatisation, Commercialisation and Nationalisation", {
        form: F5,
        description: "Taught in the lesson attached to 6.1.1 Economic Systems (privatisation and nationalisation sit in the same concept).",
        objectives: [
          "Explain the forms of privatisation and evaluate privatisation, commercialisation and nationalisation.",
        ],
      }),
      sub("enterprise-formulation.start-ups", "6.2.3", "Assistance to New Enterprise Start-ups", {
        form: F5,
        covers: ["size.small-business"],
        objectives: [
          "Explain the problems faced by business start-ups and identify the forms of assistance available to them.",
        ],
      }),
      sub("enterprise-formulation.size", "6.2.4", "Measurement of Business Size and Small to Medium Sized Enterprises", {
        form: F6,
        covers: ["size.measuring"],
        objectives: [
          "Identify the criteria for measuring the size of an enterprise and analyse the role of SMEs in an economy.",
        ],
      }),
      sub("enterprise-formulation.growth", "6.2.5", "Survival and Growth Strategies", {
        form: F6,
        covers: ["size.mergers-takeovers"],
        objectives: [
          "Identify survival and growth strategies of an enterprise, including external growth.",
        ],
      }),
      sub("enterprise-formulation.foreign-markets", "6.2.6", "Strategies of Breaking into Foreign Markets", {
        form: F6,
        covers: ["marketing.international-marketing"],
        objectives: [
          "Explain strategies that an enterprise can use to break into foreign markets and evaluate the benefits and challenges of foreign markets.",
        ],
      }),
    ],
  }),
  topic("business-planning", "6.3", "Business Planning", {
    description: "Forms 5 and 6 (matrix 8.1.3 and 8.2.3).",
    components: THEORY,
    children: [
      sub("business-planning.objectives", "6.3.1", "Enterprise Objectives", {
        form: F5,
        covers: ["objectives.aims-types"],
        objectives: [
          "Analyse enterprise objectives such as growth, profit and survival and evaluate their importance.",
        ],
      }),
      sub("business-planning.plan", "6.3.2", "Business Plan and Enterprise Project", {
        form: F56,
        covers: ["enterprise.business-plans", "project.formulation"],
        objectives: [
          "Explain the purpose of a business plan, describe the stages in designing and implementing one and design a plan.",
          "Carry out an enterprise project: draft a plan and implementation scheme and undertake the project.",
        ],
      }),
      sub("business-planning.growing", "6.3.3", "Managing a Growing Business Enterprise", {
        form: F6,
        covers: ["size.organic-growth"],
        objectives: [
          "Describe ways of managing a growing business enterprise.",
        ],
      }),
      sub("business-planning.laws", "6.3.4", "Laws and Regulations Governing Enterprise Start-up and Operations", {
        form: F6,
        covers: ["environment.political-legal"],
        objectives: [
          "Analyse the laws and regulations that govern the start-up and operation of an enterprise and apply practical skills in running it effectively.",
        ],
      }),
    ],
  }),
  topic("enterprise-finance", "6.4", "Enterprise Finance and Accounting", {
    description: "Forms 5 and 6 (matrix 8.1.4 and 8.2.4).",
    components: THEORY,
    children: [
      sub("enterprise-finance.finance", "6.4.1", "Enterprise Finance", {
        form: F5,
        covers: ["finance.need", "finance.working-capital"],
        objectives: [
          "Analyse the need for finance in an enterprise (revenue and capital expenditure) and assess ways of managing working capital.",
        ],
      }),
      sub("enterprise-finance.sources", "6.4.2", "Sources of Finance for an Enterprise", {
        form: F5,
        covers: ["finance.sources-internal", "finance.sources-external", "finance.choosing-source"],
        objectives: [
          "Assess internal and external sources of finance and discuss the factors to consider when choosing among them.",
        ],
      }),
      sub("enterprise-finance.accounting", "6.4.3", "Accounting Concepts, Users and Financial Statements", {
        form: F5,
        covers: ["accounts.users-reports-concepts", "accounts.profit-loss", "accounts.financial-position"],
        objectives: [
          "Describe accounting concepts (double entry, accruals, money measurement, prudence, realisation, business entity) and the users of accounting information.",
          "Explain the importance of accurate financial records and prepare the income statement and statement of financial position of an enterprise.",
        ],
      }),
      sub("enterprise-finance.depreciation-stock", "6.4.4", "Depreciation and Stock Valuation", {
        form: F5,
        covers: ["accounts.depreciation-inventory"],
        objectives: [
          "Explain depreciation and provision for depreciation, calculate depreciation by the straight-line and reducing-balance methods and evaluate them.",
          "Value stock by FIFO, LIFO and AVCO and evaluate the methods.",
        ],
      }),
      sub("enterprise-finance.cash-flow", "6.4.5", "Cash Flow Forecast", {
        form: F5,
        covers: ["finance.cash-flow-forecast"],
        objectives: [
          "Discuss the importance of a cash flow forecast and ways of improving cash flow: debt factoring, leasing, sale and leaseback, extended credit and shortening debtors' payment periods.",
        ],
      }),
      sub("enterprise-finance.ratios", "6.4.6", "Ratio Analysis", {
        form: F6,
        covers: ["ratios.liquidity", "ratios.profitability", "ratios.gearing-investor", "ratios.interpretation-limits"],
        objectives: [
          "Explain profitability, liquidity, investment and capital structure ratios, calculate them from given data and apply them in decisions.",
          "Evaluate the importance of ratio analysis in an enterprise.",
        ],
      }),
      sub("enterprise-finance.investment-appraisal", "6.4.7", "Investment Appraisal Techniques", {
        form: F6,
        covers: ["invest.payback-arr", "invest.npv-decisions"],
        objectives: [
          "Calculate payback period, net present value and average rate of return and evaluate the appraisal methods.",
          "Explain the influence of qualitative factors on final investment decisions.",
        ],
      }),
      sub("enterprise-finance.decision-trees", "6.4.8", "Decision Trees", {
        form: F6,
        covers: ["strategy.decision-trees"],
        objectives: [
          "Draw a decision tree, calculate expected values, make a decision from the tree and evaluate decision trees as a business tool.",
        ],
      }),
      sub("enterprise-finance.cba", "6.4.9", "Cost-Benefit Analysis", {
        form: F6,
        covers: ["project.cost-benefit"],
        objectives: [
          "Describe cost-benefit analysis (economic and social benefits and costs), apply it to local projects and evaluate its importance.",
        ],
      }),
      sub("enterprise-finance.budgeting", "6.4.10", "Budgeting", {
        form: F6,
        covers: ["finance.budgets-variances"],
        objectives: [
          "Discuss the importance of budgeting and explain the cash, sales, purchases and master budgets.",
        ],
      }),
    ],
  }),
  topic("people-enterprises", "6.5", "People in Business Enterprises", {
    description: "Forms 5 and 6 (matrix 8.1.5 and 8.2.5).",
    components: THEORY,
    children: [
      sub("people-enterprises.management-motivation", "6.5.1", "Management and Motivation", {
        form: F5,
        covers: ["management.functions-roles-theories", "motivation.scientific-human-relations", "motivation.needs-maslow-herzberg", "motivation.financial", "motivation.non-financial"],
        objectives: [
          "Explain management, the functions of managers (planning, leading, organising, controlling) and their roles (Mintzberg), and evaluate management theories (scientific, behavioural, administrative, bureaucratic).",
          "Discuss theories of motivation (Maslow, Herzberg, Taylor, McGregor) and evaluate financial and non-financial methods of motivating employees.",
        ],
      }),
      sub("people-enterprises.leadership", "6.5.2", "Leadership", {
        form: F5,
        covers: ["leadership.nature-qualities", "management.styles-mcgregor", "leadership.theories-eq"],
        objectives: [
          "Describe the concept of leadership and the qualities of a good leader; discuss leadership styles (democratic, autocratic, laissez-faire) and assess leadership theories (McGregor, Mouton and Blake) and formal and informal leadership.",
        ],
      }),
      sub("people-enterprises.structure", "6.5.3", "Organisational Structure", {
        form: F5,
        covers: ["organisation.structure-features", "organisation.structure-types", "organisation.delegation-control", "organisation.centralisation-line-staff"],
        objectives: [
          "Explain the need for and nature of an organisational structure, illustrate it on a chart and evaluate functional, divisional and matrix structures.",
          "Distinguish formal from informal organisations, explain the features of a formal structure (span of control, hierarchy, chain of command, authority, delegation, centralisation) and the conflict between line and staff managers.",
        ],
      }),
      sub("people-enterprises.communication", "6.5.4", "Communication in the Business Enterprise", {
        form: F5,
        covers: ["communication.purposes-methods", "communication.channels-barriers"],
        objectives: [
          "Analyse the importance of business communication and evaluate internal and external methods (written, oral, electronic, formal and informal) and lines of communication.",
          "Explain barriers to effective communication and ways of reducing them.",
        ],
      }),
      sub("people-enterprises.hrm", "6.5.5", "Human Resource Management", {
        form: F6,
        covers: ["hrm.purpose-planning", "hrm.recruitment-selection", "hrm.redundancy-dismissal", "hrm.morale-welfare-safety", "hrm.training-development", "hrm.labour-relations", "hrm.performance-mbo"],
        objectives: [
          "Explain the functions of HRM: planning, job descriptions, specifications and advertisements, employment contracts, discipline, recruitment, selection, training and development, job evaluation, remuneration and performance appraisal.",
          "Explain the function of HR managers in labour and management relations and the stages in the negotiation process; discuss health and safety and the role of HRM.",
        ],
      }),
    ],
  }),
  topic("markets-marketing", "6.6", "Markets and Marketing", {
    description: "Forms 5 and 6 (matrix 8.1.6 and 8.2.6).",
    components: THEORY,
    children: [
      sub("markets-marketing.markets", "6.6.1", "Purpose of Marketing, Markets and Demand", {
        form: F5,
        covers: ["marketing.role-objectives", "marketing.markets", "marketing.demand-supply"],
        objectives: [
          "Explain the meaning of market and marketing and analyse the role of marketing in an enterprise.",
          "Describe types of markets (local, regional, global; physical and virtual) and discuss demand concepts.",
        ],
      }),
      sub("markets-marketing.research", "6.6.2", "Market Research", {
        form: F5,
        covers: ["research.purposes-methods", "research.data-analysis"],
        objectives: [
          "Discuss qualitative and quantitative research techniques, primary and secondary sources, probability and non-probability sampling and instruments (questionnaires, interviews, observation, document review).",
          "Carry out a market survey, present and analyse the data and use findings in decisions.",
        ],
      }),
      sub("markets-marketing.segmentation", "6.6.3", "Market Segmentation and Marketing Strategies", {
        form: F5,
        covers: ["marketing.segmentation-niche"],
        objectives: [
          "Evaluate the bases of segmenting a market (demographic, geographic, psychographic, behavioural) and identify marketing strategies: target marketing, product positioning, differentiation, mass and niche marketing.",
        ],
      }),
      sub("markets-marketing.mix", "6.6.4", "Marketing Mix", {
        form: F6,
        covers: ["mix.product", "mix.pricing", "mix.promotion", "mix.place", "marketing.product-development"],
        objectives: [
          "Explain the 7Ps, new product development, the product life cycle, packaging and branding.",
          "Evaluate factors influencing pricing and pricing strategies (penetration, skimming, price discrimination, competitive); evaluate promotional tools, budgets, media and agencies and distribution channels.",
          "Integrate the marketing mix variables and identify suitable marketing strategies for a local project.",
        ],
      }),
      sub("markets-marketing.portfolio", "6.6.5", "Product Portfolio Planning", {
        form: F6,
        covers: ["mix.life-cycle-portfolio", "strategy.models"],
        objectives: [
          "Explain product portfolio planning, evaluate the Boston and Ansoff matrices and apply them to enterprises.",
        ],
      }),
      sub("markets-marketing.e-business", "6.6.6", "E-business and the Enterprise", {
        form: F6,
        covers: ["mix.digital"],
        objectives: [
          "Explain e-business and e-commerce (B2B, B2C, B2G) and e-marketing; evaluate the importance of e-business for an enterprise.",
        ],
      }),
    ],
  }),
  topic("operations", "6.7", "Operations Management", {
    description: "Forms 5 and 6 (matrix 8.1.7 and 8.2.7).",
    components: THEORY,
    children: [
      sub("operations.production", "6.7.1", "Nature of Production", {
        form: F5,
        covers: ["operations.transformation", "operations.productivity", "operations.methods-intensity", "operations.location-scale"],
        objectives: [
          "Explain the stages of production and the production process; distinguish value addition from beneficiation and explain their importance.",
          "Explain capital and labour productivity and ways of improving productivity; evaluate job, batch and flow production methods and capital-intensive against labour-intensive production.",
          "Discuss factors influencing plant location and relocation and the advantages and disadvantages of small and large scale operation.",
        ],
      }),
      sub("operations.costing", "6.7.2", "Production Costing and Break-even Analysis", {
        form: F5,
        covers: ["finance.cost-types", "finance.costing-methods", "finance.break-even"],
        objectives: [
          "Classify fixed, variable, marginal, direct and indirect costs and evaluate absorption and contribution costing.",
          "Determine the break-even output, margin of safety and profit or loss region and use break-even analysis in decisions.",
        ],
      }),
      sub("operations.inventory", "6.7.3", "Inventory Management", {
        form: F6,
        covers: ["operations.inventory-control", "operations.inventory-eoq-jit"],
        objectives: [
          "Explain the role and purpose of stock control, the benefits and costs of holding stock and ways of reducing holding costs without stock-outs (just in time, economic order quantity, stock control chart).",
        ],
      }),
      sub("operations.quality", "6.7.4", "Quality Control and Quality Assurance", {
        form: F6,
        covers: ["operations.quality"],
        objectives: [
          "Distinguish quality control from quality assurance and evaluate methods: total quality management, benchmarking, training, inspection and testing, quality circles, kaizen.",
        ],
      }),
      sub("operations.cpa", "6.7.5", "Critical Path Analysis", {
        form: F6,
        covers: ["operations.critical-path"],
        objectives: [
          "Explain the features of a network diagram (nodes, activities, dummies, critical and non-critical activities, critical path, float), calculate the minimum project duration and evaluate critical path analysis.",
        ],
      }),
      sub("operations.work-study", "6.7.6", "Work Study", {
        form: F6,
        covers: ["operations.work-study"],
        objectives: [
          "Explain work study (method study and time or work measurement) and evaluate its importance to an enterprise.",
        ],
      }),
    ],
  }),
];

const bes = {
  board: "zimsec",
  qualification: "a-level",
  subject: "business-enterprise-skills",
  versionLabel: "2015-2022",
  family: "business-a",
  title: "ZIMSEC A-Level Business Enterprise Skills",
  code: null,
  effectiveFrom: "2018-01-01",
  effectiveTo: null,
  publishAs: "CURRENT",
  officialDocument: {
    title: "Business Enterprise Skills Syllabus, Forms 5 - 6, 2015 - 2022 (Ministry of Primary and Secondary Education, Curriculum Development and Technical Services), examined by ZIMSEC at A Level",
    url: "https://www.zimsake.co.zw/softidrive/",
    publisher: "Ministry of Primary and Secondary Education (Curriculum Development and Technical Services) / Zimbabwe School Examinations Council (ZIMSEC)",
  },
  sourceNote: "The seven topics (6.1-6.7) are transcribed with their printed numbers from the topic list (6.0) of the Ministry's Business Enterprise Skills Syllabus Forms 5 - 6 (2015 - 2022). Sub-topics are the topic rows of the competency matrix (8.1 Form 5, 8.2 Form 6), with the form in which each is taught. The document prints no numbers below topic level (the matrix's 8.1.1 ... are section numbers): all sub-topic codes (6.1.1 ...) and all objective codes are ours. Learning-objective statements are our own paraphrase; no syllabus text is reproduced.",
  notes: [
    "Source (read 2026-10-10): Ministry document, copy obtained from zimsake.co.zw softidrive (the zimsake.co.zw document library; the URL recorded is the library's address because the file has no stable direct link). The cover prints 'Business Enterprise Skills Syllabus Forms 5 - 6 2015 - 2022' (Curriculum Development and Technical Services, Mount Pleasant, Harare). It was read through a pdftotext rendering in which the tables come out with interleaved columns and the assessment pages are overprinted; check every heading, the form of each row, each objective and the assessment figures against a clean copy from ZIMSEC.",
    "Subject code: not printed in the document; left null. Confirm with ZIMSEC. This subject has no entry in the catalogue (prisma/seed/data/catalogue.ts lists the ZIMSEC A-level subject 'business-studies' only; 'Business Enterprise and Skills' appears there under the O-level slug business-studies): a catalogue subject 'business-enterprise-skills' for ZIMSEC A Level must exist before this file is imported.",
    "Heritage-Based Curriculum: ZIMSEC introduced Heritage-Based Curriculum syllabi for Forms 5-6 (new versions for some subjects from about 2024). Confirm which Business Enterprise Skills syllabus November 2026 and later A-Level candidates sit, set effectiveTo, and create a new version file when a new syllabus replaces this one. Version dates assumed: first examined in November 2018 (effectiveFrom 2018-01-01).",
    "One family serves this syllabus and ZIMSEC Business Studies: the two documents share most of their content (economic systems, SMEs, finance and accounting, people, marketing, operations); concepts are shared wherever the content is the same. BES-only content: enterprising, ways of enterprising and ventures, resources and capabilities, acquiring resources (build-own-transfer), the cash, sales, purchases and master budgets and the negotiation stages. ZBS-only content: ICT in business, management by objectives, the cash flow statement, financial markets, elasticity and sales forecasting, market share, capacity utilisation, lean production and ICT in operations. The enterprise project and the continuous assessment are practical and are not simulated.",
    "Placement: the scope and sequence and the matrix agree on the form of each row; the matrix places 'Privatisation, Commercialisation and Nationalisation' in Enterprise Formulation (Form 5) and 'Economic systems' in the Enterprising Environment (Form 5); both are taught in one concept covered at 6.1.1. Rows without covers carry only objectives.",
    "Assessment (9.0) as read: continuous assessment 40% (theory tests 10%, assignments 10% and a practical project 20%, over five terms) and a summative examination 60%: Paper 1 Case Study (3 hours, 100 marks, 30%): Section A structured questions totalling 40 marks and Section B two case studies totalling 60 marks; Paper 2 Essays (3 hours, 100 marks, 30%): four essays answered out of ten. The scheme-of-assessment page is overprinted in the copy read; the figures above agree with the examinations table and the assessment model.",
    "Specification grid as read (percent of the whole qualification): Paper 1 knowledge with understanding 10, application 10, analysis 6, evaluation 4 (30); Paper 2 10, 8, 7, 5 (30); totals 20, 18, 13, 9 (60). The grid is partly garbled in the copy read; check it against a clean copy.",
    "Question structure inside the papers is not printed beyond the totals above: our convention for exam-format items is four structured questions of 10 marks in Paper 1 Section A, two 30-mark case studies in Section B, and 25 marks per essay (a 10-mark part and a 15-mark evaluation part) in Paper 2. A reviewer must check these against recent ZIMSEC papers. Calculator use is not stated; assumed allowed.",
    "Not printed and therefore assumed: ratio formulas, the discount factor method for NPV, the content of the 7Ps beyond the list, and statutory detail (laws governing enterprise start-up, labour law). Lessons mark ZIMSEC detail explicitly.",
  ],
  overview: "The ZIMSEC A-Level Business Enterprise Skills syllabus (Forms 5-6) develops enterprise, leadership, decision-making and technological skills for learners who want to run their own enterprises, with a strong practical element (an enterprise project). Its seven topics are The Enterprising Environment (economic systems, enterprising, the environment, multinationals, integration, stakeholders, resources, opportunities and ethics), Enterprise Formulation and Growth (forms of enterprise, privatisation, start-ups, size, SMEs and growth), Business Planning (objectives, business plans, laws, managing growth), Enterprise Finance and Accounting (finance, sources, statements, depreciation, stock valuation, cash flow, ratios, investment appraisal, decision trees, cost-benefit analysis and budgets), People in Business Enterprises, Markets and Marketing, and Operations Management (production, costing and break-even, inventory, quality, critical path analysis and work study).",
  assessmentOverview: "Continuous assessment (theory tests, assignments and a practical enterprise project) carries 40%. The examination carries 60%: Paper 1 Case Study (3 hours, 100 marks: structured questions 40 marks and two case studies 60 marks) and Paper 2 Essays (3 hours, 100 marks: four essays from ten), each 30% of the whole.",
  components: [
    { code: "1", name: "Paper 1: Case Study", kind: "WRITTEN", description: "Section A: structured questions totalling 40 marks. Section B: two case studies totalling 60 marks. Both sections are compulsory (3 hours; 50% of the summative examination).", durationMinutes: 180, maxMarks: 100, weightingPercent: 30, calculatorAllowed: true },
    { code: "2", name: "Paper 2: Essays", kind: "WRITTEN", description: "Four essay questions totalling 100 marks (25 marks each in our reading), answered out of ten (3 hours; 50% of the summative examination).", durationMinutes: 180, maxMarks: 100, weightingPercent: 30, calculatorAllowed: true },
  ],
  topics: BES_TOPICS,
};

// =====================================================================================================================
// Cambridge International AS & A Level Business 9609, 2026-2028 (version 2, published December 2025). The topics 1.1 to
// 10.4 and sub-topics 1.1.1 ... 10.4.2 are numbered as printed; the objective codes below them (1.1.1.1 ...) are ours (the
// syllabus gives the bullets without numbers). The two sections (AS and A) are ours, following the syllabus's own split
// of AS Level topics 1.1-5.5 (Papers 1 and 2) and A Level topics 6.1-10.4 (Papers 3 and 4). Where one lesson covers
// several printed sub-topics the concept is covered on the first or the main one and the others say so in their
// description (nodes without covers carry only objectives).
const AS = ["1", "2"];
const AL = ["3", "4"];
const ASL = "AS Level";
const ALO = "A Level only";
const taught = (code) => `Taught in the lesson attached to ${code}.`;

const C9609_TOPICS = [
  section("as-content", "AS", "AS Level subject content (topics 1.1-5.5)", {
    description: "Assessed by Papers 1 and 2 and assumed knowledge for Papers 3 and 4. Content areas: 1 Business and its environment, 2 Human resource management, 3 Marketing, 4 Operations management, 5 Finance and accounting.",
    children: [
      topic("enterprise", "1.1", "Enterprise (1 Business and its environment)", {
        components: AS,
        children: [
          sub("enterprise.nature", "1.1.1", "The nature of business activity", {
            stage: ASL,
            covers: ["enterprise.business-activity", "enterprise.success-failure"],
            objectives: [
              "Explain the purpose of business activity, the factors of production, adding value, scarcity, choice and opportunity cost.",
              "Explain the dynamic business environment, why businesses succeed or fail, and the differences between local, national, international and multinational businesses.",
            ],
          }),
          sub("enterprise.entrepreneurs", "1.1.2", "The role of entrepreneurs and intrapreneurs", {
            stage: ASL,
            covers: ["enterprise.entrepreneurs"],
            objectives: [
              "Assess the qualities and roles of entrepreneurs and intrapreneurs, barriers to entrepreneurship, risk and uncertainty and the role of enterprise in a country's development.",
            ],
          }),
          sub("enterprise.plans", "1.1.3", "Business plans", {
            stage: ASL,
            covers: ["enterprise.business-plans"],
            objectives: [
              "Explain the meaning, purpose, key elements, benefits and limitations of business plans.",
            ],
          }),
        ],
      }),
      topic("structure", "1.2", "Business structure", {
        components: AS,
        children: [
          sub("structure.sectors", "1.2.1", "Economic sectors", {
            stage: ASL,
            covers: ["structure.sectors"],
            objectives: [
              "Distinguish the primary, secondary, tertiary and quaternary sectors and the public and private sectors, and explain the reasons for and consequences of changes in their relative importance.",
            ],
          }),
          sub("structure.ownership", "1.2.2", "Business ownership", {
            stage: ASL,
            covers: ["structure.unincorporated", "structure.companies", "structure.franchise-jv-social"],
            objectives: [
              "Describe sole traders, partnerships, private and public limited companies, franchises, co-operatives, joint ventures and social enterprises and judge which suits a business.",
              "Explain unlimited and limited liability and the advantages and disadvantages of changing from one type of ownership to another.",
            ],
          }),
        ],
      }),
      topic("size", "1.3", "Size of business", {
        components: AS,
        children: [
          sub("size.measurement", "1.3.1", "Measurements of business size", {
            stage: ASL,
            covers: ["size.measuring"],
            objectives: ["Judge the appropriateness of different methods of measuring the size of a business."],
          }),
          sub("size.small", "1.3.2", "Significance of small businesses", {
            stage: ASL,
            covers: ["size.small-business"],
            objectives: [
              "Assess the advantages and disadvantages of being small, the strengths and weaknesses of family businesses, and the importance and role of small businesses in the economy and in some industries.",
            ],
          }),
          sub("size.growth", "1.3.3", "Business growth", {
            stage: ASL,
            covers: ["size.organic-growth", "size.mergers-takeovers"],
            objectives: [
              "Explain why and how a business grows internally and the types of external growth: horizontal, vertical (backward and forward) and conglomerate mergers, friendly mergers and hostile takeovers.",
              "Assess the impact of mergers and takeovers on stakeholders, why they may or may not achieve their objectives, and the role of joint ventures and strategic alliances.",
            ],
          }),
        ],
      }),
      topic("objectives", "1.4", "Business objectives", {
        components: AS,
        children: [
          sub("objectives.sectors", "1.4.1", "Business objectives in the private sector and public sector", {
            stage: ASL,
            covers: ["objectives.aims-types"],
            objectives: [
              "Explain the objectives of private-sector, public-sector and social-enterprise organisations, the importance of objectives, corporate social responsibility and the triple bottom line.",
              "Explain the relationship between mission statement, aims, objectives, strategy and tactics.",
            ],
          }),
          sub("objectives.decisions", "1.4.2", "Objectives and business decisions", {
            stage: ASL,
            covers: ["objectives.decisions-ethics"],
            objectives: [
              "Explain the stages of decision-making, how objectives change, the translation of objectives into targets and budgets and SMART objectives.",
              "Assess the need to communicate objectives and the way ethics influence objectives and activities.",
            ],
          }),
        ],
      }),
      topic("stakeholders", "1.5", "Stakeholders in a business", {
        components: AS,
        children: [
          sub("stakeholders.business", "1.5.1", "Business stakeholders", {
            stage: ASL,
            covers: ["stakeholders.roles-influence"],
            objectives: [
              "Distinguish internal from external stakeholders and explain their roles, rights and responsibilities.",
            ],
          }),
          sub("stakeholders.influence", "1.5.2", "The relative importance and influence of stakeholders on business activities", {
            description: taught("1.5.1"),
            objectives: [
              "Assess the impact of decisions on stakeholders and of stakeholder aims on decisions, accountability to stakeholders and conflict between stakeholders' aims.",
            ],
          }),
        ],
      }),
      topic("hrm", "2.1", "Human resource management (2 Human resource management)", {
        components: AS,
        children: [
          sub("hrm.purpose", "2.1.1", "Purpose and roles of HRM", {
            description: taught("2.1.2"),
            objectives: ["Explain the role of HRM in meeting organisational objectives."],
          }),
          sub("hrm.workforce-planning", "2.1.2", "Workforce planning", {
            stage: ASL,
            covers: ["hrm.purpose-planning"],
            objectives: [
              "Explain the reasons for and role of a workforce plan and measure labour turnover.",
              "Assess the implications of high and low labour turnover.",
            ],
          }),
          sub("hrm.recruitment", "2.1.3", "Recruitment and selection", {
            stage: ASL,
            covers: ["hrm.recruitment-selection"],
            objectives: [
              "Explain the recruitment process (job descriptions, person specifications, methods, internal and external recruitment), selection methods and employment contracts.",
            ],
          }),
          sub("hrm.redundancy", "2.1.4", "Redundancy and dismissal", {
            stage: ASL,
            covers: ["hrm.redundancy-dismissal"],
            objectives: ["Distinguish redundancy (voluntary and involuntary) from dismissal (fair and unfair)."],
          }),
          sub("hrm.morale", "2.1.5", "Morale and welfare", {
            stage: ASL,
            covers: ["hrm.morale-welfare-safety"],
            objectives: [
              "Explain the relationship between HRM, morale and welfare, including work-life balance, and the impact of diversity and equality on a business.",
            ],
          }),
          sub("hrm.training", "2.1.6", "Training and development", {
            stage: ASL,
            covers: ["hrm.training-development"],
            objectives: [
              "Distinguish induction, on-the-job and off-the-job training and assess the impact of training and development, including for intrapreneurship, multi-skilling and flexibility.",
            ],
          }),
          sub("hrm.relations", "2.1.7", "Management and workforce relations", {
            stage: ASL,
            covers: ["hrm.labour-relations"],
            objectives: [
              "Explain how cooperation between management and workforce benefits both, and the impact of trade unions and collective bargaining on employers and employees.",
            ],
          }),
        ],
      }),
      topic("motivation", "2.2", "Motivation", {
        components: AS,
        children: [
          sub("motivation.tool", "2.2.1", "Motivation as a tool of management and leadership", {
            description: taught("2.2.2"),
            objectives: ["Explain the need to motivate employees to achieve business objectives."],
          }),
          sub("motivation.needs", "2.2.2", "Human needs", {
            stage: ASL,
            covers: ["motivation.needs-maslow-herzberg"],
            objectives: [
              "Explain human need and how needs may or may not be satisfied at work.",
            ],
          }),
          sub("motivation.theories", "2.2.3", "Motivation theories", {
            stage: ASL,
            covers: ["motivation.scientific-human-relations", "motivation.mcclelland-vroom"],
            objectives: [
              "Explain the content theories of Taylor, Mayo, Maslow, Herzberg and McClelland and the process theory of Vroom.",
            ],
          }),
          sub("motivation.methods", "2.2.4", "Motivation methods in practice: financial motivators, non-financial motivators", {
            stage: ASL,
            covers: ["motivation.financial", "motivation.non-financial"],
            objectives: [
              "Apply the theories to practical situations and assess payment methods (time based, salary, piece rates, commission, bonuses, profit sharing, performance-related pay, fringe benefits).",
              "Assess non-financial motivators (training, promotion, status, job re-design, team working, empowerment, participation, job enrichment) and ways of employee participation.",
            ],
          }),
        ],
      }),
      topic("management", "2.3", "Management", {
        components: AS,
        children: [
          sub("management.managers", "2.3.1", "Management and managers", {
            stage: ASL,
            covers: ["management.functions-roles-theories", "management.styles-mcgregor"],
            objectives: [
              "Explain the functions of managers (planning, organising, directing, controlling), the roles of managers (Fayol, Mintzberg) and their contribution to performance.",
              "Distinguish autocratic, democratic, laissez-faire and paternalistic styles and McGregor's Theory X and Theory Y managers.",
            ],
          }),
        ],
      }),
      topic("marketing-nature", "3.1", "The nature of marketing (3 Marketing)", {
        components: AS,
        children: [
          sub("marketing-nature.role", "3.1.1", "The role of marketing and its relationship with other business activities", {
            stage: ASL,
            covers: ["marketing.role-objectives"],
            objectives: [
              "Explain marketing objectives and their link to corporate objectives (with customer relationship marketing, 3.1.7).",
            ],
          }),
          sub("marketing-nature.demand-supply", "3.1.2", "Demand and supply", {
            stage: ASL,
            covers: ["marketing.demand-supply"],
            objectives: [
              "Explain the factors influencing demand and supply and the interactions between demand, supply and price.",
            ],
          }),
          sub("marketing-nature.markets", "3.1.3", "Markets", {
            stage: ASL,
            covers: ["marketing.markets"],
            objectives: [
              "Explain how markets differ, product against customer orientation, the measurement of market share and growth, and the implications of changes in them.",
            ],
          }),
          sub("marketing-nature.consumer-industrial", "3.1.4", "Consumer and industrial marketing", {
            description: taught("3.1.3"),
            objectives: ["Classify products and explain how marketing differs for consumer (B2C) and industrial (B2B) products."],
          }),
          sub("marketing-nature.mass-niche", "3.1.5", "Mass marketing and niche marketing", {
            description: taught("3.1.6"),
            objectives: ["Explain the features, advantages and disadvantages of mass and niche marketing."],
          }),
          sub("marketing-nature.segmentation", "3.1.6", "Market segmentation", {
            stage: ASL,
            covers: ["marketing.segmentation-niche"],
            objectives: [
              "Explain geographic, demographic and psychographic segmentation and its advantages and disadvantages.",
            ],
          }),
          sub("marketing-nature.crm", "3.1.7", "Customer relationship marketing (CRM)", {
            description: taught("3.1.1"),
            objectives: ["Explain the aims, costs and benefits of customer relationship marketing."],
          }),
        ],
      }),
      topic("market-research", "3.2", "Market research", {
        components: AS,
        children: [
          sub("market-research.purposes", "3.2.1", "The purposes of market research", {
            description: taught("3.2.2"),
            objectives: ["Explain how research identifies the features of a market and customers' characteristics, wants and needs."],
          }),
          sub("market-research.primary-secondary", "3.2.2", "Primary research and secondary research", {
            stage: ASL,
            covers: ["research.purposes-methods"],
            objectives: [
              "Distinguish primary from secondary research and assess the usefulness of data from each.",
            ],
          }),
          sub("market-research.sampling", "3.2.3", "Sampling", {
            description: taught("3.2.2"),
            objectives: ["Explain the need for and limitations of sampling."],
          }),
          sub("market-research.data", "3.2.4", "Market research data", {
            stage: ASL,
            covers: ["research.data-analysis"],
            objectives: [
              "Judge the reliability of data, analyse quantitative and qualitative data and interpret tables, charts and graphs.",
            ],
          }),
        ],
      }),
      topic("marketing-mix", "3.3", "The marketing mix", {
        components: AS,
        children: [
          sub("marketing-mix.elements", "3.3.1", "The elements of the marketing mix (the 4Ps)", {
            description: taught("3.3.2"),
            objectives: ["Identify the 4Ps: product, price, promotion and place (distribution channels)."],
          }),
          sub("marketing-mix.product", "3.3.2", "Product", {
            stage: ASL,
            covers: ["mix.product"],
            objectives: [
              "Distinguish goods from services and tangible from intangible attributes; explain the importance of product development, product differentiation and the unique selling point.",
            ],
          }),
          sub("marketing-mix.portfolio", "3.3.3", "Product portfolio analysis", {
            stage: ASL,
            covers: ["mix.life-cycle-portfolio"],
            objectives: [
              "Use the product life cycle and extension strategies and the Boston Matrix and assess their impact on marketing decisions.",
            ],
          }),
          sub("marketing-mix.pricing", "3.3.4", "Pricing methods", {
            stage: ASL,
            covers: ["mix.pricing"],
            objectives: [
              "Assess the objectives and usefulness of competitive, penetration, skimming, price discrimination, dynamic, cost-based and psychological pricing.",
            ],
          }),
          sub("marketing-mix.promotion", "3.3.5", "Promotion methods", {
            stage: ASL,
            covers: ["mix.promotion", "mix.digital"],
            objectives: [
              "Assess advertising, sales promotion, direct promotion and developments in digital promotion, and the roles of packaging and branding in promotion.",
            ],
          }),
          sub("marketing-mix.place", "3.3.6", "Place (channels of distribution)", {
            stage: ASL,
            covers: ["mix.place"],
            objectives: [
              "Assess the objectives and usefulness of different channels of distribution, digital and physical.",
            ],
          }),
        ],
      }),
      topic("operations-nature", "4.1", "The nature of operations (4 Operations management)", {
        components: AS,
        children: [
          sub("operations-nature.transformation", "4.1.1", "The transformational process", {
            stage: ASL,
            covers: ["operations.transformation"],
            objectives: [
              "Explain the use of the factors of production, the stages from inputs to outputs and the contribution of operations to added value.",
            ],
          }),
          sub("operations-nature.productivity", "4.1.2", "Efficiency, effectiveness, productivity and sustainability", {
            stage: ASL,
            covers: ["operations.productivity"],
            objectives: [
              "Explain the importance of efficiency, effectiveness, productivity and sustainability, measure labour productivity and assess the impact of measures to improve sustainability.",
            ],
          }),
          sub("operations-nature.intensity", "4.1.3", "Capital intensive and labour intensive operations", {
            description: taught("4.1.4"),
            objectives: ["Assess the benefits and limitations of capital-intensive and labour-intensive operations."],
          }),
          sub("operations-nature.methods", "4.1.4", "Operations methods: job, batch, flow, mass customisation", {
            stage: ASL,
            covers: ["operations.methods-intensity"],
            objectives: [
              "Distinguish job, batch, flow and mass customisation methods, assess their advantages and disadvantages and the problems of changing from one to another.",
            ],
          }),
        ],
      }),
      topic("inventory", "4.2", "Inventory management", {
        components: AS,
        children: [
          sub("inventory.managing", "4.2.1", "Managing inventory", {
            stage: ASL,
            covers: ["operations.inventory-control"],
            objectives: [
              "Explain the purpose, costs and benefits of inventory, buffer inventory, re-order level, lead time, simple inventory control charts and the importance of supply chain management.",
            ],
          }),
          sub("inventory.jit", "4.2.2", "Just in Time (JIT)", {
            stage: ASL,
            covers: ["operations.inventory-eoq-jit"],
            objectives: [
              "Explain the purpose of JIT and JIC and the impact of adopting JIT on a business.",
            ],
          }),
        ],
      }),
      topic("capacity", "4.3", "Capacity utilisation and outsourcing", {
        components: AS,
        children: [
          sub("capacity.utilisation", "4.3.1", "Significance and measurement of capacity utilisation", {
            stage: ASL,
            covers: ["operations.capacity-outsourcing"],
            objectives: [
              "Measure capacity utilisation, assess the impact of operating under or over capacity and explain methods of improving utilisation.",
            ],
          }),
          sub("capacity.outsourcing", "4.3.2", "Outsourcing", {
            description: taught("4.3.1"),
            objectives: ["Assess the impact of outsourcing on a business."],
          }),
        ],
      }),
      topic("business-finance", "5.1", "Business finance (5 Finance and accounting)", {
        components: AS,
        children: [
          sub("business-finance.need", "5.1.1", "The need for business finance", {
            stage: ASL,
            covers: ["finance.need"],
            objectives: [
              "Explain why businesses need finance to start up, grow and survive, short and long term needs, the difference between cash and profit, and failure through lack of finance.",
            ],
          }),
          sub("business-finance.working-capital", "5.1.2", "Working capital", {
            stage: ASL,
            covers: ["finance.working-capital"],
            objectives: [
              "Explain the meaning and importance of working capital, the management of trade receivables and payables, and the difference between capital and revenue expenditure.",
            ],
          }),
        ],
      }),
      topic("sources-finance", "5.2", "Sources of finance", {
        components: AS,
        children: [
          sub("sources-finance.ownership", "5.2.1", "Business ownership and sources of finance", {
            description: taught("5.2.4"),
            objectives: ["Explain the relationship between the form of ownership and the sources of finance available."],
          }),
          sub("sources-finance.internal-external", "5.2.2", "Internal and external sources of finance", {
            stage: ASL,
            covers: ["finance.sources-internal", "finance.sources-external"],
            objectives: [
              "Assess internal sources (owner's investment, retained earnings, sale of assets, sale and leaseback, working capital).",
              "Assess external sources (share capital, debentures, new partners, venture capital, overdrafts, leasing, hire purchase, loans, mortgages, debt factoring, trade credit, micro-finance, crowd funding, grants).",
            ],
          }),
          sub("sources-finance.factors", "5.2.3", "Factors affecting the sources of finance", {
            description: taught("5.2.4"),
            objectives: ["Explain the influence of cost, flexibility, control, use of funds and existing debt on the choice of finance."],
          }),
          sub("sources-finance.selecting", "5.2.4", "Selecting the source of finance", {
            stage: ASL,
            covers: ["finance.choosing-source"],
            objectives: ["Judge the appropriateness of each possible source of finance in a given situation."],
          }),
        ],
      }),
      topic("cash-flow", "5.3", "Forecasting and managing cash flows", {
        components: AS,
        children: [
          sub("cash-flow.forecasts", "5.3.1", "Cash flow forecasts", {
            stage: ASL,
            covers: ["finance.cash-flow-forecast"],
            objectives: [
              "Explain the meaning and purpose of cash flow forecasts, interpret and amend simple forecasts (opening and closing balances) and assess methods of improving cash flow.",
            ],
          }),
        ],
      }),
      topic("costs", "5.4", "Costs", {
        components: AS,
        children: [
          sub("costs.information", "5.4.1", "Cost information", {
            stage: ASL,
            covers: ["finance.cost-types"],
            objectives: ["Explain the need for accurate cost information and classify fixed, variable, direct and indirect costs."],
          }),
          sub("costs.approaches", "5.4.2", "Approaches to costing: full, contribution", {
            stage: ASL,
            covers: ["finance.costing-methods"],
            objectives: [
              "Distinguish full from contribution costing, their uses and limitations, contribution from profit, and when each is used.",
            ],
          }),
          sub("costs.uses", "5.4.3", "Uses of cost information", {
            description: taught("5.4.2"),
            objectives: [
              "Use average, marginal and total cost in decisions, in pricing and to monitor performance, and use contribution costing in special order decisions.",
            ],
          }),
          sub("costs.break-even", "5.4.4", "Break-even analysis", {
            stage: ASL,
            covers: ["finance.break-even"],
            objectives: [
              "Calculate and interpret break-even output, contribution, margin of safety and profit in numeric and graphic form, and assess the uses and limitations of break-even analysis.",
            ],
          }),
        ],
      }),
      topic("budgets", "5.5", "Budgets", {
        components: AS,
        children: [
          sub("budgets.purpose", "5.5.1", "The meaning and purpose of budgets", {
            stage: ASL,
            covers: ["finance.budgets-variances"],
            objectives: [
              "Explain budgets and the measurement of performance, benefits and drawbacks, incremental, flexible and zero budgeting, and the uses of budgets in allocating resources and controlling a business.",
            ],
          }),
          sub("budgets.variances", "5.5.2", "Variances", {
            description: taught("5.5.1"),
            objectives: ["Calculate and interpret adverse and favourable variances."],
          }),
        ],
      }),
    ],
  }),
  section("a-content", "A", "A Level subject content (topics 6.1-10.4)", {
    description: "A Level only: assessed by Papers 3 and 4 (the AS Level content is assumed knowledge). Content areas: 6 Business and its environment, 7 Human resource management, 8 Marketing, 9 Operations management, 10 Finance and accounting.",
    children: [
      topic("external-influences", "6.1", "External influences on business activity (6 Business and its environment)", {
        components: AL,
        children: [
          sub("external-influences.political-legal", "6.1.1", "Political and legal", {
            stage: ALO,
            covers: ["environment.political-legal", "structure.economic-systems"],
            objectives: [
              "Assess the advantages and disadvantages of privatisation and nationalisation in a given situation.",
              "Explain how a government may use the law to control employment practices, conditions of work, wages, marketing behaviour, competition, location and particular goods, and the impact of political and legal change.",
            ],
          }),
          sub("external-influences.economic", "6.1.2", "Economic", {
            stage: ALO,
            covers: ["environment.government-economy"],
            objectives: [
              "Explain how government helps or constrains business, deals with market failure, and the macroeconomic objectives and policies (monetary, fiscal, supply-side, exchange rate) and their impact on business.",
            ],
          }),
          sub("external-influences.social", "6.1.3", "Social and demographic", {
            stage: ALO,
            covers: ["environment.social-environmental"],
            objectives: [
              "Assess corporate social responsibility issues, the needs of the community and pressure groups, and the impact of social and demographic change (see also 6.1.7).",
            ],
          }),
          sub("external-influences.technological", "6.1.4", "Technological", {
            stage: ALO,
            covers: ["environment.technology-competitors"],
            objectives: ["Assess the impact of technological change on business and decisions (competitors and suppliers, 6.1.5)."],
          }),
          sub("external-influences.competitors", "6.1.5", "Competitors and suppliers", {
            description: taught("6.1.4"),
            objectives: ["Assess the impact of competitors and suppliers on business and decisions."],
          }),
          sub("external-influences.international", "6.1.6", "International", {
            stage: ALO,
            covers: ["international.trade-integration", "international.multinationals-globalisation"],
            objectives: [
              "Assess the importance of international trading links and trade agreements, the role of technology in trade, and the advantages and disadvantages of multinationals and their relationships with governments.",
            ],
          }),
          sub("external-influences.environmental", "6.1.7", "Environmental", {
            description: taught("6.1.3"),
            objectives: ["Explain how physical environmental issues influence behaviour, environmental audits and the growing importance of sustainability."],
          }),
        ],
      }),
      topic("business-strategy", "6.2", "Business strategy", {
        components: AL,
        children: [
          sub("business-strategy.developing", "6.2.1", "Developing business strategy", {
            stage: ALO,
            covers: ["strategy.environment-scanning", "strategy.models", "strategy.decision-trees"],
            objectives: [
              "Apply SWOT, PEST, Porter's five forces, blue ocean strategy, scenario planning, the core competence framework, the Ansoff matrix, force field analysis and decision trees to develop strategy.",
            ],
          }),
          sub("business-strategy.planning", "6.2.2", "Corporate planning and implementation", {
            stage: ALO,
            covers: ["strategy.strategic-management"],
            objectives: [
              "Explain the meaning and purpose of strategy and strategic management (analysis, choice, implementation), corporate planning, corporate culture and transformational leadership.",
              "Assess the management and control of strategic change and contingency planning and crisis management.",
            ],
          }),
        ],
      }),
      topic("organisational-structure", "7.1", "Organisational structure (7 Human resource management)", {
        components: AL,
        children: [
          sub("organisational-structure.objectives", "7.1.1", "The relationship between business objectives and organisational structure", {
            stage: ALO,
            covers: ["organisation.structure-features"],
            objectives: ["Explain the purpose and attributes of an organisational structure and its features: hierarchy, chain of command, span of control, responsibility and authority."],
          }),
          sub("organisational-structure.types", "7.1.2", "Types of structure: functional, hierarchical (flat and narrow), matrix", {
            stage: ALO,
            covers: ["organisation.structure-types"],
            objectives: ["Assess the advantages and disadvantages of each type, structuring by product, function or area, and why and how structures change (growth, delayering)."],
          }),
          sub("organisational-structure.delegation", "7.1.3", "Delegation and accountability", {
            stage: ALO,
            covers: ["organisation.delegation-control"],
            objectives: ["Explain the relationship between delegation and accountability and the impact of delegation (with 7.1.4)."],
          }),
          sub("organisational-structure.control", "7.1.4", "Control, authority and trust", {
            description: taught("7.1.3"),
            objectives: ["Explain span of control against levels of hierarchy, authority against responsibility, and the conflict between control and trust."],
          }),
          sub("organisational-structure.centralisation", "7.1.5", "Centralisation and decentralisation", {
            description: taught("7.1.6"),
            objectives: ["Assess the impact of centralisation and decentralisation on a business."],
          }),
          sub("organisational-structure.line-staff", "7.1.6", "Line and staff", {
            stage: ALO,
            covers: ["organisation.centralisation-line-staff"],
            objectives: ["Distinguish line from staff functions and explain the conflicts between them."],
          }),
        ],
      }),
      topic("communication", "7.2", "Business communication", {
        components: AL,
        children: [
          sub("communication.purposes", "7.2.1", "Purposes of communication", {
            description: taught("7.2.2"),
            objectives: ["Identify situations in which communication is essential."],
          }),
          sub("communication.methods", "7.2.2", "Methods of communication", {
            stage: ALO,
            covers: ["communication.purposes-methods"],
            objectives: ["Assess the strengths and weaknesses of spoken, written, electronic and visual methods of communication."],
          }),
          sub("communication.channels", "7.2.3", "Channels of communication", {
            stage: ALO,
            covers: ["communication.channels-barriers"],
            objectives: ["Explain one- and two-way and vertical and horizontal communication and the problems of each channel (with barriers and the role of management, 7.2.4 and 7.2.5)."],
          }),
          sub("communication.barriers", "7.2.4", "Barriers to communication", {
            description: taught("7.2.3"),
            objectives: ["Explain barriers to communication and how to overcome them."],
          }),
          sub("communication.management", "7.2.5", "The role of management in facilitating communication", {
            description: taught("7.2.3"),
            objectives: ["Assess informal communication, the effect of communication on efficiency and ways of improving communication in a situation."],
          }),
        ],
      }),
      topic("leadership", "7.3", "Leadership", {
        components: AL,
        children: [
          sub("leadership.nature", "7.3.1", "Leadership", {
            stage: ALO,
            covers: ["leadership.nature-qualities"],
            objectives: ["Explain the purpose of leadership, leadership roles (directors, managers, supervisors, worker representatives) and the qualities of a good leader."],
          }),
          sub("leadership.theories", "7.3.2", "Theories of leadership", {
            stage: ALO,
            covers: ["leadership.theories-eq"],
            objectives: ["Assess trait, behavioural, contingency, power and influence, and transformational theories of leadership (with Goleman's emotional intelligence, 7.3.3)."],
          }),
          sub("leadership.eq", "7.3.3", "Emotional intelligence / emotional quotient (EQ)", {
            description: taught("7.3.2"),
            objectives: ["Explain Goleman's four competencies: self-awareness, social awareness, self-management and social skills."],
          }),
        ],
      }),
      topic("hrm-strategy", "7.4", "Human resource management (HRM) strategy", {
        components: AL,
        children: [
          sub("hrm-strategy.approaches", "7.4.1", "Approaches to human resource management (HRM)", {
            stage: ALO,
            covers: ["hrm.hard-soft-flexible", "hrm.performance-mbo"],
            objectives: [
              "Distinguish hard from soft HRM and assess flexible working contracts (temporary, zero hours, part-time, annualised hours, flexi-time, home working, shift working, job sharing, compressed hours, the gig economy).",
              "Assess the measurement, causes and consequences of poor employee performance, strategies for improvement, management by objectives and the changing role of IT and AI in HRM.",
            ],
          }),
        ],
      }),
      topic("marketing-analysis", "8.1", "Marketing analysis (8 Marketing)", {
        components: AL,
        children: [
          sub("marketing-analysis.elasticity", "8.1.1", "Elasticity", {
            stage: ALO,
            covers: ["marketing.elasticity"],
            objectives: ["Calculate and interpret price, income and promotional elasticity of demand and assess their impact on decisions and limitations."],
          }),
          sub("marketing-analysis.development", "8.1.2", "Product development", {
            stage: ALO,
            covers: ["marketing.product-development"],
            objectives: ["Explain the process of product development, sources of new ideas and the importance of R&D."],
          }),
          sub("marketing-analysis.forecasting", "8.1.3", "Sales forecasting", {
            stage: ALO,
            covers: ["marketing.sales-forecasting"],
            objectives: ["Explain the need to forecast sales, calculate and use the four-period centred moving average, and assess qualitative forecasting and the impact on decisions."],
          }),
        ],
      }),
      topic("marketing-strategy", "8.2", "Marketing strategy", {
        components: AL,
        children: [
          sub("marketing-strategy.planning", "8.2.1", "Planning the marketing strategy", {
            stage: ALO,
            covers: ["marketing.plan-strategy"],
            objectives: ["Explain the contents of a marketing plan and its benefits and limitations (with approaches to strategy and the role of IT and AI, 8.2.2)."],
          }),
          sub("marketing-strategy.approaches", "8.2.2", "Approaches to marketing strategy", {
            description: taught("8.2.1"),
            objectives: ["Assess the need for a coordinated marketing strategy consistent with the business, product and market and the changing role of IT and AI in marketing."],
          }),
          sub("marketing-strategy.international", "8.2.3", "Strategies for international marketing", {
            stage: ALO,
            covers: ["marketing.international-marketing"],
            objectives: ["Assess the implications of globalisation, identification, selection and entry into international markets, pan-global marketing against local differences and the method of entry."],
          }),
        ],
      }),
      topic("location-scale", "9.1", "Location and scale (9 Operations management)", {
        components: AL,
        children: [
          sub("location-scale.location", "9.1.1", "Location", {
            stage: ALO,
            covers: ["operations.location-scale"],
            objectives: ["Explain the factors that determine location and relocation, local, national and international decisions, offshoring and reshoring and the impact of globalisation (scale of operations, 9.1.2)."],
          }),
          sub("location-scale.scale", "9.1.2", "Scale of operations", {
            description: taught("9.1.1"),
            objectives: ["Explain the factors that influence the scale of a business, internal and external economies and diseconomies of scale and their links to unit costs."],
          }),
        ],
      }),
      topic("quality", "9.2", "Quality management", {
        components: AL,
        children: [
          sub("quality.control", "9.2.1", "Quality control and quality assurance", {
            stage: ALO,
            covers: ["operations.quality"],
            objectives: ["Explain quality as meeting customer expectations and the impact of quality control, quality assurance and total quality management (with benchmarking, 9.2.2)."],
          }),
          sub("quality.benchmarking", "9.2.2", "Benchmarking", {
            description: taught("9.2.1"),
            objectives: ["Explain the importance of benchmarking in quality management."],
          }),
        ],
      }),
      topic("operations-strategy", "9.3", "Operations strategy", {
        components: AL,
        children: [
          sub("operations-strategy.decisions", "9.3.1", "Operational decisions", {
            stage: ALO,
            covers: ["operations.strategy-flexibility"],
            objectives: ["Explain the influence of human, marketing and finance resources on operations decisions and the changing role of IT and AI (with flexibility and innovation, 9.3.2)."],
          }),
          sub("operations-strategy.flexibility", "9.3.2", "Flexibility and innovation", {
            description: taught("9.3.1"),
            objectives: ["Explain the need for flexibility in volume, delivery time and specification and process innovation."],
          }),
          sub("operations-strategy.erp", "9.3.3", "Enterprise resource planning (ERP)", {
            stage: ALO,
            covers: ["operations.erp-ict"],
            objectives: ["Explain the main features of ERP and how it improves efficiency in inventory control, costing, capacity utilisation, response to change, workforce flexibility and management information."],
          }),
          sub("operations-strategy.lean", "9.3.4", "Lean production", {
            stage: ALO,
            covers: ["operations.lean"],
            objectives: ["Explain the aims of lean production, the strategies used (kaizen, quality circles, simultaneous engineering, cell production, JIT, waste management) and their limitations and links to other functions."],
          }),
          sub("operations-strategy.planning", "9.3.5", "Operations planning", {
            stage: ALO,
            covers: ["operations.critical-path"],
            objectives: ["Draw and use network diagrams for critical path analysis: minimum duration, critical path, total and free float, use in project management, benefits and limitations."],
          }),
        ],
      }),
      topic("financial-statements", "10.1", "Financial statements (10 Finance and accounting)", {
        components: AL,
        children: [
          sub("financial-statements.profit-loss", "10.1.1", "Statement of profit or loss", {
            stage: ALO,
            covers: ["accounts.profit-loss"],
            objectives: ["Explain the purpose and contents of the statement of profit or loss, amend it and assess the impact of a given change."],
          }),
          sub("financial-statements.position", "10.1.2", "Statement of financial position", {
            stage: ALO,
            covers: ["accounts.financial-position"],
            objectives: ["Explain the purpose and contents of the statement of financial position, amend it and explain the relationships with the statement of profit or loss."],
          }),
          sub("financial-statements.inventory", "10.1.3", "Inventory valuation", {
            description: taught("10.1.4"),
            objectives: ["Explain the difficulties of valuing inventory and the net realisable value method."],
          }),
          sub("financial-statements.depreciation", "10.1.4", "Depreciation", {
            stage: ALO,
            covers: ["accounts.depreciation-inventory"],
            objectives: ["Explain the role of depreciation in the accounts and its impact (straight-line method only) on the statements."],
          }),
        ],
      }),
      topic("ratios", "10.2", "Analysis of published accounts", {
        components: AL,
        children: [
          sub("ratios.liquidity", "10.2.1", "Liquidity ratios", {
            stage: ALO,
            covers: ["ratios.liquidity"],
            objectives: ["Calculate and interpret the current ratio and acid test ratio and assess methods of improving liquidity."],
          }),
          sub("ratios.profitability", "10.2.2", "Profitability ratios", {
            stage: ALO,
            covers: ["ratios.profitability"],
            objectives: ["Calculate and interpret return on capital employed, gross profit margin and profit margin and assess methods of improving profitability."],
          }),
          sub("ratios.efficiency", "10.2.3", "Financial efficiency ratios", {
            stage: ALO,
            covers: ["ratios.efficiency"],
            objectives: ["Calculate and interpret rate of inventory turnover, trade receivables turnover (days) and trade payables turnover (days) and assess methods of improving efficiency."],
          }),
          sub("ratios.gearing", "10.2.4", "Gearing ratio", {
            description: taught("10.2.5"),
            objectives: ["Calculate and interpret the gearing ratio and assess methods of improving gearing."],
          }),
          sub("ratios.investment", "10.2.5", "Investment ratios", {
            stage: ALO,
            covers: ["ratios.gearing-investor"],
            objectives: ["Calculate and interpret dividend yield, dividend cover and the price/earnings ratio and assess methods of improving investor return."],
          }),
        ],
      }),
      topic("investment-appraisal", "10.3", "Investment appraisal", {
        components: AL,
        children: [
          sub("investment-appraisal.concept", "10.3.1", "The concept of investment appraisal", {
            description: taught("10.3.2"),
            objectives: ["Explain the need for investment appraisal."],
          }),
          sub("investment-appraisal.basic", "10.3.2", "Basic methods: payback, accounting rate of return (ARR)", {
            stage: ALO,
            covers: ["invest.payback-arr"],
            objectives: ["Calculate and interpret payback and the accounting rate of return."],
          }),
          sub("investment-appraisal.npv", "10.3.3", "Discounted cash flow method: net present value (NPV)", {
            stage: ALO,
            covers: ["invest.npv-decisions"],
            objectives: ["Calculate and interpret net present value (with investment decisions, 10.3.4)."],
          }),
          sub("investment-appraisal.decisions", "10.3.4", "Investment appraisal decisions", {
            description: taught("10.3.3"),
            objectives: ["Assess quantitative results and qualitative factors in investment decisions and compare the methods and their limitations."],
          }),
        ],
      }),
      topic("accounting-strategy", "10.4", "Finance and accounting strategy", {
        components: AL,
        children: [
          sub("accounting-strategy.data", "10.4.1", "The use of accounting data to enable strategic decision-making", {
            stage: ALO,
            covers: ["accounts.users-reports-concepts"],
            objectives: ["Explain how financial statements are used to develop strategies and the contents of an annual report and their usefulness to the business and other stakeholders."],
          }),
          sub("accounting-strategy.ratios", "10.4.2", "The use of accounting data and ratio analysis in strategic decision-making", {
            stage: ALO,
            covers: ["ratios.interpretation-limits"],
            objectives: ["Assess performance over time and against competitors, the impact of debt or equity, dividend, growth and other strategies on ratio results, and the limitations of published accounts and ratio analysis."],
          }),
        ],
      }),
    ],
  }),
];

const c9609 = {
  board: "cambridge",
  qualification: "a-level",
  subject: "business",
  versionLabel: "2026-2028",
  family: "business-a",
  title: "Cambridge International AS & A Level Business (9609)",
  code: "9609",
  effectiveFrom: "2026-01-01",
  effectiveTo: "2028-12-31",
  publishAs: "CURRENT",
  officialDocument: {
    title: "Cambridge International AS & A Level Business 9609 syllabus for 2026, 2027 and 2028 (version 2, published December 2025)",
    url: "https://www.cambridgeinternational.org/Images/697371-2026-2028-syllabus.pdf",
    publisher: "Cambridge University Press & Assessment (Cambridge International Education)",
  },
  sourceNote: "Topic and sub-topic headings (1.1 Enterprise ... 10.4.2 The use of accounting data and ratio analysis in strategic decision-making) are transcribed with their printed numbers. The syllabus lists bullets without numbers: objective codes (1.1.1.1 ...) are ours, and the bullets are paraphrased in our own words. The two sections (AS and A) are ours, following the syllabus's own split of AS Level topics 1.1-5.5 and A Level topics 6.1-10.4. No syllabus text is reproduced.",
  notes: [
    "Source (read 2026-10-10): the official PDF 'Cambridge International AS & A Level Business 9609 syllabus for 2026, 2027 and 2028', version 2 (published December 2025, no significant changes affecting teaching), read through a pdftotext rendering. Exams in the June and November series (March for India). Check headings and the notes against the PDF.",
    "Routes as printed: AS Level only (Papers 1 and 2 in one series; grades a-e); A Level staged over two years (AS in year 1, carried forward, then Papers 3 and 4); A Level in one series (all four papers; grades A*-E). Route A here covers both A Level routes.",
    "Weightings: Paper 1 40% of AS and 20% of A Level; Paper 2 60% and 30%; Paper 3 30% of A Level; Paper 4 20% of A Level. weightingPercent records the A Level share; the AS shares are in each paper's description. Assessment objectives by qualification: AS AO1 30%, AO2 30%, AO3 20%, AO4 20%; A Level 25% each. By component: Paper 1 AO1 35, AO2 30, AO3 20, AO4 15; Paper 2 30, 30, 20, 20; Paper 3 20, 27, 23, 30; Paper 4 10, 35, 15, 40.",
    "Papers: Paper 1 (1 hour 15 minutes, 40 marks): Section A four compulsory questions of 5 marks (the first three have two parts), Section B two essay questions of 20 marks, answer one (two parts, the second showing evaluation). Paper 2 (1 hour 30 minutes, 60 marks): two compulsory data response questions of 30 marks, six parts each, the last part evaluation. Paper 3 (1 hour 45 minutes, 60 marks): five compulsory questions on a case study (insert): Q1 and Q2 8 marks, Q3 and Q4 16 marks (three and two parts), Q5 12 marks; the last part of Q3 and Q4 and Q5 show evaluation. Paper 4 (1 hour 15 minutes, 40 marks): two compulsory essay questions of 20 marks on a case study, both showing evaluation. Papers 1 and 2 test the AS content (topics 1.1-5.5); Papers 3 and 4 the A Level content (6.1-10.4) with AS content assumed. The division of each essay into parts of 8 and 12 marks is our convention (the syllabus gives only totals).",
    "Topics 1.1-5.5 are AS content; topics 6.1-10.4 are A Level only. Several ZIMSEC topics that are Form 5 or Form 6 content fall in the A Level part for Cambridge (political and legal environment, government and the economy, business strategy, organisational structure, communication, leadership, elasticity, forecasting, location and scale, quality, ERP, lean production, critical path analysis, the statements, ratio analysis and investment appraisal): write them once at A Level depth.",
    "Formulae: the Appendix (Ratios to support analysis of published accounts) gives the only accepted ratio formulae: gross profit margin, operating (profit from operations) margin, ROCE with capital employed = issued shares + reserves + non-current liabilities, current ratio, acid test, trade receivables and payables turnover in days (credit sales and credit purchases x 365), rate of inventory turnover (cost of sales over average inventory), gearing (non-current liabilities over capital employed), price/earnings, dividend yield and dividend cover. Ratios are not printed in question papers.",
    "Accounting Rate of Return: the syllabus prints 'ARR = (average profit/average investment) x 100' without saying how the average investment is found. Past mark schemes are commonly read as average annual profit over the initial investment; the kit therefore requires every item to state the formula and the basis used. A reviewer must confirm the intended basis with the Cambridge teacher guide (not in the repository).",
    "Not examined (stated in the syllabus): drawing up a full set of accounts (candidates calculate ratios and use them); the straight-line method only for depreciation. No other exclusions are printed.",
    "The syllabus runs from 2026 to 2028 inclusive, so effectiveFrom 2026-01-01 and effectiveTo 2028-12-31. Candidates from 2029 will follow a later syllabus (not in the repository); check the Cambridge website for it and add a new version file.",
  ],
  overview: "Cambridge International AS & A Level Business (9609) focuses on how decisions are made in businesses, with six key concepts: change, context, decision-making, enterprise, innovation and strategy. The AS Level content covers business and its environment (enterprise, structure, size, objectives, stakeholders), human resource management and motivation, marketing (the nature of marketing, market research and the marketing mix), operations management (the transformational process, inventory, capacity) and finance and accounting (finance, sources, cash flow, costs, break-even, budgets). The A Level content adds the external environment and business strategy, organisational structure, communication, leadership and HRM strategy, marketing analysis and strategy, location, scale, quality and operations strategy, and finance and accounting (financial statements, ratio analysis, investment appraisal and accounting strategy).",
  assessmentOverview: "AS Level candidates take Paper 1 Business Concepts 1 (1 hour 15 minutes, 40 marks) and Paper 2 Business Concepts 2 (1 hour 30 minutes, 60 marks). A Level candidates also take Paper 3 Business Decision-Making (1 hour 45 minutes, 60 marks, a case study) and Paper 4 Business Strategy (1 hour 15 minutes, 40 marks, a case study), in the same series or a later one, carrying forward their AS result.",
  components: [
    { code: "1", name: "Paper 1: Business Concepts 1", kind: "WRITTEN", description: "Section A: four short-answer questions of five marks (the first three have two parts). Section B: one essay from a choice of two (20 marks, two parts). AS Level content (topics 1.1-5.5). 40% of AS Level, 20% of A Level.", durationMinutes: 75, maxMarks: 40, weightingPercent: 20, calculatorAllowed: true },
    { code: "2", name: "Paper 2: Business Concepts 2", kind: "WRITTEN", description: "Two compulsory data response questions of 30 marks, six parts each, the last part showing evaluation. AS Level content (topics 1.1-5.5). 60% of AS Level, 30% of A Level.", durationMinutes: 90, maxMarks: 60, weightingPercent: 30, calculatorAllowed: true },
    { code: "3", name: "Paper 3: Business Decision-Making", kind: "WRITTEN", description: "Five compulsory questions based on a case study (insert): questions 1 and 2 of 8 marks, questions 3 and 4 of 16 marks (three and two parts) and question 5 of 12 marks. A Level content (topics 6.1-10.4), AS Level assumed. 30% of A Level.", durationMinutes: 105, maxMarks: 60, weightingPercent: 30, calculatorAllowed: true },
    { code: "4", name: "Paper 4: Business Strategy", kind: "WRITTEN", description: "Two compulsory essay questions of 20 marks each based on a case study, both showing evaluation. A Level content (topics 6.1-10.4), AS Level assumed. 20% of A Level.", durationMinutes: 75, maxMarks: 40, weightingPercent: 20, calculatorAllowed: true },
  ],
  routes: [
    { code: "AS", name: "AS Level", description: "Papers 1 and 2 (grades a-e). Also the first year of the staged A Level route.", components: ["1", "2"] },
    { code: "A", name: "A Level", description: "All four papers, in one series or staged (AS Level carried forward, then Papers 3 and 4) (grades A*-E).", isDefault: true, components: ["1", "2", "3", "4"] },
  ],
  topics: C9609_TOPICS,
};

// =====================================================================================================================
// Checks: every covered concept exists, each concept is covered at most once per syllabus (on the most specific node),
// every concept is covered by at least one syllabus, node keys and objective codes are unique; report what each
// syllabus leaves out. Then label each concept description with its coverage.
const coverage = new Map(); // concept -> { zbs?: form, bes?: form, cambridge?: stage }
const SYLLABI = [
  [zbs, "zbs"],
  [bes, "bes"],
  [c9609, "cambridge"],
];
for (const [s, tag] of SYLLABI) {
  const seen = new Map();
  const codes = new Set();
  const keys = new Set();
  let nodes = 0;
  let emptyLeaves = 0;
  const walk = (list) => {
    for (const n of list) {
      nodes++;
      if (keys.has(n.key)) throw new Error(`${s.subject}: duplicate node key ${n.key}`);
      keys.add(n.key);
      if ((n.covers ?? []).length && (n.children ?? []).length) throw new Error(`${s.subject}: ${n.key} covers concepts and has children (cover on the most specific node)`);
      if ((n.covers ?? []).length && !(n._form || n._stage)) throw new Error(`${s.subject}: ${n.key} covers concepts but has no form/stage`);
      if (!(n.children ?? []).length && !(n.covers ?? []).length) emptyLeaves++;
      for (const c of n.covers ?? []) {
        if (!CONCEPT_KEYS.has(c)) throw new Error(`${s.board}/${s.subject}/${s.versionLabel}: unknown concept ${c} on ${n.key}`);
        if (seen.has(c)) throw new Error(`${s.board}/${s.subject}/${s.versionLabel}: ${c} covered on ${seen.get(c)} and ${n.key}`);
        seen.set(c, n.key);
        coverage.set(c, { ...(coverage.get(c) ?? {}), [tag]: n._form ?? n._stage });
      }
      for (const ob of n.objectives ?? []) {
        if (codes.has(ob.code)) throw new Error(`${s.subject}: duplicate objective code ${ob.code}`);
        codes.add(ob.code);
      }
      walk(n.children ?? []);
    }
  };
  walk(s.topics);
  const missing = [...CONCEPT_KEYS].filter((k) => !seen.has(k));
  console.log(`${s.board}/${s.qualification}/${s.subject}/${s.versionLabel}: ${s.topics.length} top-level nodes, ${nodes} nodes (${emptyLeaves} without covers), ${seen.size} concepts covered, ${codes.size} objectives; not covered (${missing.length}): ${missing.map((k) => k.replace("abus.", "")).join(", ") || "none"}\n`);
}
const orphans = [...CONCEPT_KEYS].filter((k) => !coverage.has(k));
if (orphans.length) throw new Error(`concepts no syllabus covers: ${orphans.join(", ")}`);

const label = (cv) => {
  const zim = [];
  if (cv.zbs) zim.push(`Business Studies ${cv.zbs}`);
  if (cv.bes) zim.push(`Business Enterprise Skills ${cv.bes}`);
  const z = zim.join(", ");
  if (z && cv.cambridge) return `Both boards (ZIMSEC ${z}; Cambridge ${cv.cambridge}).`;
  if (z) return `ZIMSEC only (${z}).`;
  return `Cambridge only (${cv.cambridge}).`;
};
const shared = [...coverage.values()].filter((c) => (c.zbs || c.bes) && c.cambridge).length;
const zimOnly = [...coverage.values()].filter((c) => !c.cambridge).length;
const camOnly = [...coverage.values()].filter((c) => !c.zbs && !c.bes).length;
const bothZim = [...coverage.values()].filter((c) => c.zbs && c.bes).length;
console.log(`${CONCEPTS.length} concepts in the registry (${shared} shared with Cambridge, ${zimOnly} ZIMSEC only, ${camOnly} Cambridge only; ${bothZim} in both ZIMSEC syllabi)`);

const registry = {
  family: "business-a",
  name: "Business (A-Level / AS & A Level)",
  level: "A",
  prefix: "abus",
  subjects: ["zimsec/a-level/business-studies", "zimsec/a-level/business-enterprise-skills", "cambridge/a-level/business"],
  concepts: CONCEPTS.map(([key, name, description]) => ({ key, name, description: `${label(coverage.get(key))} ${description}` })),
};

const strip = (k, v) => (k.startsWith("_") ? undefined : v);
const write = (rel, data) => {
  const file = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, strip, 2) + "\n");
  console.log("wrote", rel);
};
write("content/concepts/business-a.json", registry);
write("content/syllabi/zimsec/a-level/business-studies/2015-2022.json", zbs);
write("content/syllabi/zimsec/a-level/business-enterprise-skills/2015-2022.json", bes);
write("content/syllabi/cambridge/a-level/business/2026-2028.json", c9609);
