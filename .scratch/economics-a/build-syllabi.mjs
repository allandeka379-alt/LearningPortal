// Builds content/concepts/economics-a.json and the two A-Level Economics syllabus files:
//   content/syllabi/zimsec/a-level/economics/2015-2022.json      (ZIMSEC A-Level Economics, Forms 5-6)
//   content/syllabi/cambridge/a-level/economics/2026-2028.json   (Cambridge International AS & A Level Economics 9708)
// Sources (local only, not in git): .scratch/economics-a/sources/zimsec-economics-a.pdf (+ .txt) and 9708-2026-2028.pdf
// (+ .txt). The concept registry lives in ./concepts.mjs; this script prepends each concept's coverage label.
// Run from the repo root: node .scratch/economics-a/build-syllabi.mjs
import fs from "node:fs";
import path from "node:path";
import { CONCEPTS } from "./concepts.mjs";

const ROOT = process.cwd();
const CONCEPT_KEYS = new Set(CONCEPTS.map(([k]) => k));
if (CONCEPT_KEYS.size !== CONCEPTS.length) throw new Error("duplicate concept key in concepts.mjs");
for (const [k] of CONCEPTS) if (!/^aecon\.[a-z0-9-]+\.[a-z0-9-]+$/.test(k)) throw new Error(`bad concept key ${k}`);

// ---------------------------------------------------------------------------------------------------------------------
// Node helpers. `form` (ZIMSEC: "Form 5" / "Form 6" / "Forms 5-6") and `stage` (Cambridge: "AS Level" / "A Level only")
// are build-time metadata used for the concept labels; keys starting with "_" are not written.
const node = (kind, key, code, name, { description, covers = [], objectives = [], components, children, form, stage } = {}) => {
  const n = { key, code, name, kind };
  if (description) n.description = description;
  if (covers.length) n.covers = covers.map((c) => `aecon.${c}`);
  if (objectives.length) n.objectives = objectives.map((o, i) => (Array.isArray(o) ? { code: o[0], text: o[1] } : { code: `${code}.${i + 1}`, text: o }));
  if (components) n.components = components;
  if (children) n.children = children;
  if (form) n._form = form;
  if (stage) n._stage = stage;
  return n;
};
const section = (key, code, name, opts) => node("SECTION", key, code, name, opts);
const topic = (key, code, name, opts) => node("TOPIC", key, code, name, opts);
const sub = (key, code, name, opts) => node("SUBTOPIC", key, code, name, opts);
const o = (code, text) => [code, text];

// =====================================================================================================================
// ZIMSEC A-Level Economics, Forms 5-6, 2015-2022. Top-level topics are the eleven topics of the topic list (6.1-6.11),
// numbered 1-11. The competency matrix lists key concepts without numbers, so every sub-topic code (1.1, 2.1 ...) and
// every objective code is ours; the form (5 or 6) comes from the matrix (8.1.x Form 5, 8.2.x Form 6) and the scope and
// sequence (7.0). The Examination skills node S is ours.
const F5 = "Form 5";
const F6 = "Form 6";
const F56 = "Forms 5-6";
const P123 = ["1", "2", "3"];

const ZIMSEC_TOPICS = [
  topic("tools", "1", "Tools of Economic Analysis", {
    description: "Form 5 (competency matrix 8.1.1). Not listed among the topics of Paper 3.",
    components: ["1", "2"],
    children: [
      sub("tools.research-techniques", "1.1", "Research techniques in economics", {
        form: F5,
        covers: ["tools.research-methods"],
        objectives: [
          "Explain the methods of collecting economic data: interviews, questionnaires, surveys, observation, sampling and experiments.",
          "Compare and contrast the methods and state the strengths and weaknesses of each.",
          "Draft a short questionnaire for a simple economic enquiry.",
        ],
      }),
      sub("tools.analysis-presentation", "1.2", "Measures of central tendency, and presentation and analysis of economic data", {
        form: F5,
        description: "The matrix lists 'Measures of central tendency' and 'Presentation and analysis of economic data' as two key concepts; they are taught together in one lesson and transcribed as one node.",
        covers: ["tools.data-analysis"],
        objectives: [
          "Calculate the mean, mode and median.",
          "Compile data from a schedule and present it in pie charts, bar charts, frequency polygons, line graphs, tables and pictorial form.",
          "Interpret and compare economic data given in graphical, pictorial and numerical form.",
        ],
      }),
    ],
  }),
  topic("economic-resources", "2", "Economic Resources", {
    description: "Form 5 (competency matrix 8.1.2).",
    components: P123,
    children: [
      sub("economic-resources.factors", "2.1", "Factors of production", {
        form: F5,
        covers: ["basics.factors-of-production"],
        objectives: ["Explain the factors of production (land, labour, capital, enterprise) and distinguish renewable from non-renewable resources."],
      }),
      sub("economic-resources.scarcity", "2.2", "Scarcity, choice and opportunity cost", {
        form: F5,
        covers: ["basics.scarcity-choice"],
        objectives: ["Analyse the relationship between wants and available resources (scarcity), and explain choice and opportunity cost."],
      }),
      sub("economic-resources.ppc", "2.3", "The production possibility curve", {
        form: F5,
        covers: ["basics.ppc"],
        objectives: [
          "Use production possibility curves to show scarcity, choice, opportunity cost and efficiency.",
          "Illustrate efficiency, inefficiency and unattainable points, and explain increasing, decreasing and constant opportunity cost and the different shapes of the curve.",
        ],
      }),
      sub("economic-resources.systems", "2.4", "Economic systems and the role of price", {
        form: F5,
        covers: ["basics.economic-systems", "market.price-mechanism"],
        objectives: [
          "Compare resource allocation in market, planned and mixed economies and analyse the Zimbabwean system.",
          "Discuss the role of price in signalling, rationing and rewarding.",
        ],
      }),
      sub("economic-resources.enterprising", "2.5", "Enterprising", {
        form: F5,
        covers: ["basics.entrepreneur-specialisation"],
        objectives: [
          "Explain the characteristics of a successful entrepreneur (risk-taking, using opportunities).",
          "Assess the requirements for business formation: idea generation, a business proposal, licensing and registration.",
        ],
      }),
      sub("economic-resources.capital", "2.6", "Sources of capital", {
        form: F5,
        covers: ["enterprise.sources-capital"],
        objectives: ["Explain sources of capital (loans, shares, leasing, hire purchase, personal savings) and analyse the procedures for acquiring capital."],
      }),
      sub("economic-resources.business-organisations", "2.7", "Business organisations and business ethics", {
        form: F5,
        description: "The matrix lists 'Business organisations' and 'Business ethics' as two key concepts; transcribed as one node because one lesson covers both.",
        covers: ["enterprise.business-forms-ethics"],
        objectives: [
          "Examine and select the type of business organisation (sole trader, partnership, cooperative, private and public limited company) suited to one's environment.",
          "Explain business ethics: Unhu/Ubuntu/Vumunhu, accountability, social responsibility and environmental consciousness.",
        ],
      }),
    ],
  }),
  topic("demand-theory", "3", "Demand Theory", {
    description: "Form 5 (competency matrix 8.1.3: demand and elasticity) and Form 6 (8.2.1: utility and indifference curve theories).",
    components: P123,
    children: [
      sub("demand-theory.determinants", "3.1", "Determinants of demand", {
        form: F5,
        covers: ["market.demand"],
        objectives: ["Analyse the causes of movements along the demand curve and shifts of the demand curve, for individuals and the market."],
      }),
      sub("demand-theory.elasticity", "3.2", "Elasticity concepts", {
        form: F5,
        covers: ["market.ped", "market.ped-revenue", "market.yed-xed"],
        objectives: [
          "Explain and calculate price, income and cross elasticities of demand and interpret the numerical values.",
          "Explain the factors affecting elasticity of demand.",
          "Evaluate the importance of elasticity for households, firms and government, including its implications for revenue.",
        ],
      }),
      sub("demand-theory.marginal-utility", "3.3", "Marginal utility theory", {
        form: F6,
        covers: ["utility.marginal-utility"],
        objectives: ["Explain diminishing marginal utility and the equi-marginal principle, and examine the limitations of marginal utility theory."],
      }),
      sub("demand-theory.indifference", "3.4", "Indifference curve theory", {
        form: F6,
        covers: ["utility.indifference-curves"],
        objectives: ["Distinguish normal from inferior goods using the substitution and income effects of a price change, with indifference curve analysis."],
      }),
    ],
  }),
  topic("supply-theory", "4", "Supply Theory", {
    description: "Form 5 (competency matrix 8.1.4) and Form 6 (8.2.2: growth of firms and small and medium enterprises).",
    components: P123,
    children: [
      sub("supply-theory.determinants", "4.1", "Determinants of supply", {
        form: F5,
        covers: ["market.supply"],
        objectives: ["Explain the determinants of supply and distinguish movements along from shifts of the supply curve, for individuals and the market."],
      }),
      sub("supply-theory.equilibrium", "4.2", "Equilibrium price and quantity, consumer and producer surplus", {
        form: F5,
        covers: ["market.equilibrium", "market.surplus"],
        objectives: [
          "Explain how equilibrium price and quantity are established and show the effects of shifts of demand and supply.",
          "Distinguish between consumer surplus and producer surplus.",
        ],
      }),
      sub("supply-theory.pes", "4.3", "Price elasticity of supply", {
        form: F5,
        covers: ["market.pes"],
        objectives: ["Calculate price elasticity of supply, analyse its determinants and evaluate its importance."],
      }),
      sub("supply-theory.costs", "4.4", "Production costs", {
        form: F5,
        covers: ["costs.short-run-production", "costs.short-run-costs", "costs.long-run-costs-scale"],
        objectives: [
          "Explain the short run and the long run and calculate total, marginal and average costs.",
          "Distinguish between internal and external economies and diseconomies of scale.",
        ],
      }),
      sub("supply-theory.growth-of-firms", "4.5", "Growth of firms", {
        form: F6,
        covers: ["firms.growth-integration", "dev.mncs-fdi"],
        objectives: [
          "Explain the reasons for the growth of firms and analyse the methods of growth: integration, mergers and diversification.",
          "Assess the benefits and costs of large firms, including multinational firms, to the economy.",
        ],
      }),
      sub("supply-theory.smes", "4.6", "Survival of small and medium enterprises", {
        form: F6,
        covers: ["firms.sme"],
        objectives: [
          "Justify the survival of small and medium enterprises and evaluate their benefits.",
          "Analyse the reasons for government involvement in the creation of small and medium enterprises.",
        ],
      }),
    ],
  }),
  topic("theory-of-the-firm", "5", "Theory of the Firm", {
    description: "Form 5 (competency matrix 8.1.5) and Form 6 (8.2.3).",
    components: P123,
    children: [
      sub("theory-of-the-firm.objectives", "5.1", "Objectives of firms", {
        form: F5,
        covers: ["firms.objectives"],
        objectives: ["Explain the objectives of firms: profit maximisation, survival, growth and sales maximisation."],
      }),
      sub("theory-of-the-firm.price-output", "5.2", "Price and output determination", {
        form: F5,
        covers: ["costs.revenue-curves"],
        objectives: ["Describe the equilibrium conditions of the firm (such as MC = MR) and apply demand and supply analysis to its price and output."],
      }),
      sub("theory-of-the-firm.market-structures", "5.3", "Market structures", {
        form: F5,
        covers: ["firms.structures-features", "firms.perfect-competition", "firms.monopoly", "firms.monopolistic-competition", "firms.oligopoly", "firms.collusion-game-theory"],
        objectives: [
          "Explain the concept of market structure and the features of perfect competition, monopoly, monopolistic competition, oligopoly and contestable markets.",
          "Analyse the factors that influence the pricing and output decisions of firms in each structure.",
          "Compare and contrast market structures.",
        ],
      }),
      sub("theory-of-the-firm.profits-losses", "5.4", "Profits and losses", {
        form: F6,
        covers: ["costs.profit-types"],
        objectives: ["Explain normal and abnormal profits, losses, cost minimisation and profit maximisation."],
      }),
      sub("theory-of-the-firm.efficiency", "5.5", "Economic efficiency", {
        form: F6,
        covers: ["firms.efficiency"],
        objectives: ["Assess allocative, productive and technical efficiency, and evaluate the efficiency of firms in different market structures."],
      }),
      sub("theory-of-the-firm.price-discrimination", "5.6", "Price discrimination", {
        form: F6,
        covers: ["firms.price-discrimination"],
        objectives: ["Explain price discrimination and analyse the conditions for it and its effects."],
      }),
    ],
  }),
  topic("theory-of-distribution", "6", "Theory of Distribution", {
    description: "Form 5 (competency matrix 8.1.6) and Form 6 (8.2.4). The matrix also lists interest rate determination (Loanable Funds and Liquidity Preference theories) here and under Money and the Price Level; it is transcribed once, as 10.5.",
    components: P123,
    children: [
      sub("theory-of-distribution.rewards", "6.1", "Rewards for factors of production", {
        form: F5,
        covers: ["distribution.factor-rewards", "distribution.rent-transfer-earnings"],
        objectives: [
          "Explain the rewards to the factors of production: rent, wages, interest and profit.",
          "Distinguish between economic rent, quasi-rent and transfer earnings.",
        ],
      }),
      sub("theory-of-distribution.determination", "6.2", "Determination of rewards: marginal revenue productivity and demand and supply", {
        form: F56,
        covers: ["labour.demand-mrp", "labour.supply", "labour.wage-determination"],
        objectives: [
          "Apply the Marginal Revenue Productivity Theory to the demand for land, capital and labour.",
          "Explain the determination of rewards using the theory of demand and supply of factors of production.",
          "Analyse imperfections in the labour market and apply the theories to an economy such as Zimbabwe.",
        ],
      }),
      sub("theory-of-distribution.wage-differentials", "6.3", "Wage differentials", {
        form: F5,
        covers: ["labour.wage-differentials"],
        objectives: ["Explain wage differentials and justify their existence using economic and non-economic theories."],
      }),
    ],
  }),
  topic("government-intervention", "7", "Government Intervention in the Economy", {
    description: "Form 5 (competency matrix 8.1.7) and Form 6 (8.2.5).",
    components: P123,
    children: [
      sub("government-intervention.market-failure", "7.1", "Sources of market failure", {
        form: F5,
        covers: ["intervention.market-failure", "basics.goods-classification", "intervention.externalities"],
        objectives: [
          "Explain the reasons for government intervention: public goods, externalities, market imperfections, merit and demerit goods and common property.",
          "Identify market failure in the learner's own environment.",
        ],
      }),
      sub("government-intervention.taxes-subsidies", "7.2", "Taxation and subsidies", {
        form: F5,
        covers: ["intervention.taxes-subsidies"],
        objectives: ["Explain how taxation and subsidies are used to correct market failure."],
      }),
      sub("government-intervention.price-controls", "7.3", "Price controls, production quotas and buffer stock", {
        form: F5,
        covers: ["intervention.price-controls-buffer-stocks"],
        objectives: ["Explain price controls and buffer stock schemes as methods of government intervention."],
      }),
      sub("government-intervention.provision-regulation", "7.4", "Direct provision and regulation", {
        form: F5,
        covers: ["intervention.direct-provision-information", "intervention.regulation-permits-nudge"],
        objectives: ["Explain direct provision, regulation and quotas as methods of government intervention."],
      }),
      sub("government-intervention.privatisation", "7.5", "Privatisation, commercialisation and nationalisation", {
        form: F5,
        covers: ["intervention.privatisation"],
        objectives: ["Explain privatisation, commercialisation and nationalisation as methods of intervention."],
      }),
      sub("government-intervention.wages-land", "7.6", "Wages legislation, incomes policy and land reform", {
        form: F5,
        covers: ["intervention.wages-land-policies"],
        objectives: ["Explain wages legislation, incomes policy, controls on trade unions and the land reform programme as interventions, and suggest solutions to market failure in the community."],
      }),
      sub("government-intervention.solutions", "7.7", "Strengths and weaknesses of solutions to market failure", {
        form: F6,
        covers: ["intervention.government-failure"],
        objectives: ["Analyse the effectiveness of government intervention in an economy such as Zimbabwe, with the strengths and weaknesses of each solution."],
      }),
      sub("government-intervention.central-planning", "7.8", "Central planning and decision-making in Zimbabwe", {
        form: F6,
        covers: ["intervention.central-planning-zimbabwe"],
        objectives: [
          "Assess the effectiveness (strengths and weaknesses) of central planning in an economy.",
          "Analyse the decision-making process in Zimbabwe.",
        ],
      }),
      sub("government-intervention.cost-benefit", "7.9", "Cost-benefit analysis", {
        form: F6,
        covers: ["intervention.cost-benefit"],
        objectives: ["Analyse the applicability of cost-benefit analysis as a decision-making tool."],
      }),
    ],
  }),
  topic("international-trade", "8", "International Trade", {
    description: "Form 5 (competency matrix 8.1.8) and Form 6 (8.2.6).",
    components: P123,
    children: [
      sub("international-trade.advantage", "8.1", "Absolute and comparative advantage", {
        form: F5,
        covers: ["trade.absolute-comparative"],
        objectives: ["Explain absolute and comparative advantage and the reasons for trade, including Zimbabwe's position."],
      }),
      sub("international-trade.free-trade", "8.2", "Free trade and the determinants of trade flows", {
        form: F5,
        covers: ["trade.free-trade"],
        objectives: ["Explain the determinants of trade flows, including political factors, and justify free trade by weighing the arguments for and against it."],
      }),
      sub("international-trade.protectionism", "8.3", "Protectionism", {
        form: F5,
        covers: ["trade.protectionism"],
        objectives: ["Explain and evaluate the types of protectionism, such as tariffs and quotas."],
      }),
      sub("international-trade.integration", "8.4", "Economic integration and commodity agreements", {
        form: F5,
        covers: ["trade.economic-integration"],
        objectives: [
          "Explain economic integration (free trade area, customs union, economic union) and assess the merits and demerits of each.",
          "Examine commodity agreements (including GATT and bilateral agreements).",
        ],
      }),
      sub("international-trade.bop", "8.5", "Balance of payments", {
        form: F6,
        covers: ["trade.bop-current-account", "trade.bop-accounts"],
        objectives: [
          "Examine the components of the balance of payments: current account, capital account and balance for official financing.",
          "Calculate balance of payments figures and assess surplus and deficit.",
        ],
      }),
      sub("international-trade.bop-policies", "8.6", "Balance of payments disequilibrium and trade policies", {
        form: F6,
        covers: ["trade.bop-policies"],
        objectives: ["Evaluate policy measures to correct disequilibrium: exchange rate policy, import substitution, protectionism, export promotion and the Look East policy."],
      }),
      sub("international-trade.terms-of-trade", "8.7", "Terms of trade", {
        form: F6,
        covers: ["trade.terms-of-trade"],
        objectives: ["Calculate the terms of trade from export and import price indices and interpret them."],
      }),
      sub("international-trade.exchange-rates", "8.8", "Exchange rates and exchange rate regimes", {
        form: F6,
        covers: ["trade.exchange-rates-floating", "trade.exchange-rate-systems"],
        objectives: ["Assess the operation of exchange rates and of fixed, floating and managed regimes."],
      }),
    ],
  }),
  topic("economic-performance", "9", "Measurement of Economic Performance", {
    description: "Form 5 (competency matrix 8.1.9) and Form 6 (8.2.7).",
    components: P123,
    children: [
      sub("economic-performance.circular-flow", "9.1", "The circular flow of income", {
        form: F5,
        covers: ["macro.circular-flow"],
        objectives: ["Explain the flow of national income in closed and open economies."],
      }),
      sub("economic-performance.national-income", "9.2", "National income statistics", {
        form: F5,
        covers: ["macro.national-income-statistics"],
        objectives: [
          "Calculate national income using the output, income and expenditure approaches (GDP, GNP, NNP, per capita income).",
          "Compare national income statistics between countries and within the same country, and assess their usefulness.",
        ],
      }),
      sub("economic-performance.real-nominal", "9.3", "GDP deflator, nominal and real income", {
        form: F5,
        covers: ["macro.price-indices-real-values"],
        objectives: ["Distinguish nominal from real income and calculate real income using the GDP deflator."],
      }),
      sub("economic-performance.living-standards", "9.4", "Comparison of living standards", {
        form: F5,
        covers: ["dev.living-standards-indicators"],
        objectives: ["Compare living standards between countries and over time."],
      }),
      sub("economic-performance.determination", "9.5", "National income determination", {
        form: F6,
        covers: ["macro.consumption-saving-investment", "macro.multiplier", "macro.income-gaps"],
        objectives: [
          "Explain national income determination from consumption, investment, government expenditure and net exports, and illustrate equilibrium national income.",
          "Explain inflationary and deflationary gaps.",
        ],
      }),
      sub("economic-performance.schools-of-thought", "9.6", "Main schools of thought", {
        form: F6,
        covers: ["macro.schools-of-thought"],
        objectives: ["Discuss the main schools of thought: Keynesians and monetarists."],
      }),
      sub("economic-performance.ad-as", "9.7", "Aggregate demand and supply analysis", {
        form: F6,
        covers: ["macro.aggregate-demand", "macro.aggregate-supply", "macro.ad-as-equilibrium"],
        objectives: ["Analyse the components of aggregate demand and aggregate supply and their interaction."],
      }),
    ],
  }),
  topic("money-price-level", "10", "Money and the Price Level", {
    description: "Form 5 (competency matrix 8.1.10) and Form 6 (8.2.8).",
    components: P123,
    children: [
      sub("money-price-level.money", "10.1", "Characteristics and functions of money", {
        form: F5,
        covers: ["money.functions-characteristics"],
        objectives: ["Explain the characteristics of money and examine its functions."],
      }),
      sub("money-price-level.institutions", "10.2", "Money market institutions", {
        form: F5,
        covers: ["money.banking-institutions"],
        objectives: ["Explain the functions and role of the central bank, commercial banks, building societies and merchant banks in an economy."],
      }),
      sub("money-price-level.credit-creation", "10.3", "Credit creation", {
        form: F5,
        covers: ["money.credit-creation"],
        objectives: [
          "Illustrate how banks create money and calculate the money multiplier.",
          "Discuss the impact of credit creation in an economy.",
        ],
      }),
      sub("money-price-level.money-demand-supply", "10.4", "Demand and supply for money", {
        form: F6,
        covers: ["money.money-demand-supply"],
        objectives: ["Explain the determinants of the demand for and the supply of money."],
      }),
      sub("money-price-level.interest-rates", "10.5", "Interest rate determination", {
        form: F6,
        description: "Also listed in the matrix under Theory of Distribution (8.2.4).",
        covers: ["money.interest-rates"],
        objectives: ["Examine and evaluate the Loanable Funds and Liquidity Preference theories, and non-economic determinants, in explaining interest rates in an economy."],
      }),
      sub("money-price-level.inflation", "10.6", "Inflation", {
        form: F6,
        covers: ["macro.inflation", "money.quantity-theory"],
        description: "Includes the Consumer Price Index and Retail Price Index (measurement is taught in the lesson covered at 9.3).",
        objectives: [
          "Explain how inflation is measured (CPI and RPI) and the relationship between the money supply and the price level (Quantity Theory of Money).",
          "Discuss the causes and effects of inflation and the effectiveness of measures used to control it.",
        ],
      }),
    ],
  }),
  topic("macro-problems-policies", "11", "Macroeconomic Problems and Policies", {
    description: "Form 5 (competency matrix 8.1.11) and Form 6 (8.2.9).",
    components: P123,
    children: [
      sub("macro-problems-policies.problems", "11.1", "Macroeconomic problems", {
        form: F5,
        covers: ["macro.unemployment"],
        description: "The matrix names unemployment, inflation, balance of payments and exchange rates as the problems; inflation, the balance of payments and exchange rates are covered at 10.6, 8.5-8.6 and 8.8.",
        objectives: ["Analyse the causes of macroeconomic problems such as unemployment and assess their effects."],
      }),
      sub("macro-problems-policies.developing-developed", "11.2", "Characteristics of developing and developed countries", {
        form: F5,
        covers: ["dev.population", "dev.economic-structure"],
        objectives: ["Distinguish between developing and developed economies by their characteristics."],
      }),
      sub("macro-problems-policies.objectives", "11.3", "Macroeconomic objectives", {
        form: F6,
        covers: ["policy.objectives", "macro.growth-measurement-causes"],
        objectives: ["Explain the macroeconomic objectives: price stability, full employment, economic growth and development, and equity."],
      }),
      sub("macro-problems-policies.conflicts", "11.4", "Conflicting macroeconomic objectives", {
        form: F6,
        covers: ["policy.interrelated-problems-phillips"],
        objectives: ["Examine the relationship among macroeconomic objectives, such as the trade-off between price stability and unemployment."],
      }),
      sub("macro-problems-policies.policies", "11.5", "Macroeconomic policies: fiscal, monetary and exchange rate", {
        form: F6,
        covers: ["policy.taxes", "policy.fiscal-policy", "policy.monetary-policy", "trade.exchange-rate-effects"],
        objectives: ["Analyse fiscal policy, monetary policy and exchange rate policy and their effects."],
      }),
      sub("macro-problems-policies.evaluation", "11.6", "Evaluating policies and conflicting policy objectives", {
        form: F6,
        covers: ["policy.effectiveness-conflicts"],
        objectives: ["Evaluate the effectiveness of macroeconomic policies, with emphasis on the Zimbabwean economy, and the conflicts among policy objectives."],
      }),
    ],
  }),
  topic("examination-skills", "S", "Examination skills", {
    description: "Not a content topic of the syllabus: this node is ours, from the assessment objectives and the skill distribution (knowledge and understanding, interpretation and application, analysis, evaluation, organisation and communication).",
    components: ["2", "3"],
    children: [
      sub("examination-skills.data-response", "S.1", "Data response: diagrams, data and calculations", {
        form: F56,
        covers: ["skills.diagrams-and-data"],
        objectives: [
          "Interpret and comment on economic phenomena presented in scenarios, tables and graphs.",
          "Apply theory and calculations to data to solve economic problems.",
        ],
      }),
      sub("examination-skills.essays", "S.2", "Essays: analysis and evaluation", {
        form: F56,
        covers: ["skills.essay-evaluation"],
        objectives: [
          "Organise, present and communicate economic ideas and make informed judgements in a clear, logical and appropriate form.",
          "Analyse and evaluate arguments, proposals and policies in the light of economic theory and social values.",
        ],
      }),
    ],
  }),
];

const zimsec = {
  board: "zimsec",
  qualification: "a-level",
  subject: "economics",
  versionLabel: "2015-2022",
  family: "economics-a",
  title: "ZIMSEC A-Level Economics",
  code: null,
  effectiveFrom: "2018-01-01",
  effectiveTo: null,
  publishAs: "CURRENT",
  officialDocument: {
    title: "Economics Syllabus, Forms 5 - 6, 2015 - 2022 (Ministry of Primary and Secondary Education, Curriculum Development and Technical Services), examined by ZIMSEC at A Level",
    url: "https://www.zimsake.co.zw/softidrive/",
    publisher: "Ministry of Primary and Secondary Education (Curriculum Development and Technical Services) / Zimbabwe School Examinations Council (ZIMSEC)",
  },
  sourceNote: "Topic names and their order (1 to 11) are transcribed from the topic list (6.0) of the Ministry's Economics Syllabus Forms 5 - 6 (2015 - 2022). Sub-topics are the key concepts of the competency matrix (8.0), which prints them without numbers, so all sub-topic codes (1.1 ...), all objective codes and the Examination skills node S are ours; the form in which each is taught comes from the matrix (8.1 Form 5, 8.2 Form 6) and the scope and sequence (7.0). Learning-objective statements are our own paraphrase; no syllabus text is reproduced.",
  notes: [
    "Source (read 2026-10-08): Ministry document, copy obtained from zimsake.co.zw softidrive (the zimsake.co.zw document library; the URL recorded is the library's https address because the file has no stable direct link). The cover prints 'Economics Syllabus Forms 5 - 6, 2015 - 2022' (Curriculum Development and Technical Services, Harare, 2015). It was read through a pdftotext rendering in which the scope-and-sequence and competency-matrix tables come out with their columns interleaved, and parts of the assessment pages (the description of papers and a pie chart) are overprinted; check every heading, the form of each item and each objective against a clean copy from ZIMSEC.",
    "Subject code: not printed in the document and not verified by us; code left null. Confirm the examination code with ZIMSEC.",
    "Heritage-Based Curriculum: ZIMSEC introduced Heritage-Based Curriculum syllabi for Forms 5-6, and newer versions exist for some subjects. The version of Economics that November 2026 and later A-Level candidates sit must be confirmed; set effectiveTo and add a new version file when a new syllabus replaces this one. Version dates assumed: first examined in November 2018 (effectiveFrom 2018-01-01).",
    "Numbering: the topic list numbers the eleven topics 6.1-6.11, the scope and sequence 7.1-7.11, and the competency matrix numbers them by form (Form 5: 8.1.1-8.1.11; Form 6: 8.2.1-8.2.9, which has no Tools of Economic Analysis or Economic Resources topic and starts with Demand Theory). This tree follows the topic list (1-11) and puts each key concept under its topic with the form that teaches it. Interest rate determination appears in the matrix under both Theory of Distribution (8.2.4) and Money and the Price Level (8.2.8); it is transcribed once, at 10.5.",
    "Gaps and doubts in the copy read: the headers and footers of the assessment pages say 'Economics Syllabus Forms 1 - 4' (a copy-and-paste slip in the document). Form 6 key concepts have no objectives for some scope-and-sequence items (comparison and evaluation of market structures, advantages and disadvantages of each market structure, application to an economy); they are attached to 5.3 and 5.5. The multiplier, the accelerator and the Phillips curve appear in the checklist of terms (10.0) but not in the matrix; they are covered at 9.5, 11.4 and the lesson on consumption, saving and investment. The checklist also names point elasticity, Marshall-Lerner, the J-curve, cartels, natural monopoly, purchasing power parity and the quantity theory of money. Cambridge-style game theory (Prisoner's Dilemma) is not printed in the ZIMSEC copy; the collusion lesson covers cartels for ZIMSEC and game theory for Cambridge.",
    "Assessment (9.0) as read: continuous assessment 30% (Form 5 10%, Form 6 20%: an assignment and a theory test per term and a practical assignment per year) and a summative examination 70%: Paper 1 multiple choice (40 items with four options, 1 hour 30 minutes, 40 marks, 20%), Paper 2 data response (two compulsory questions of 20 marks each, 1 hour 15 minutes, 40 marks, 20%) and Paper 3 theory essays (12 questions, candidates answer 4, 3 hours, 100 marks, 30%). The pie chart on the same page appears to show 25% for Paper 3; the table and the description both say 30%, which is what is recorded. Papers 1 and 2 list all eleven topics; Paper 3 lists ten (Tools of Economic Analysis is not examined in Paper 3). Skill distribution as printed: Paper 1 knowledge and understanding 20-25%, interpretation and application 50-55%, analysis 20-25%; Paper 2 knowledge 20%, interpretation and application 40%, analysis 30%, organisation, presentation and communication 10%; Paper 3 knowledge 28%, interpretation and application 16%, analysis 20%, evaluation 36%.",
    "Marks per essay: the document gives 100 marks for four answered questions, so we assume 25 marks per essay; whether the essays have parts is not stated (our practice convention uses (a) and (b)). The part structure of Paper 2 is not stated either. A reviewer must check both against recent papers. Continuous assessment (Paper 4) is not a component here and is not simulated.",
    "Many concepts are shared with Cambridge 9708 (concepts aecon.*). Lessons are written to the depth of the deeper board; parts named only by ZIMSEC (data collection and presentation, business organisation and ethics, sources of capital, small and medium enterprises, wages legislation, land reform, the Zimbabwean decision-making process, schools of thought, commodity agreements, the Look East policy) are marked as ZIMSEC detail. Zimbabwean content is factual and politically neutral, and every data set is illustrative.",
  ],
  overview: "The ZIMSEC A-Level Economics syllabus (Forms 5-6) has eleven topics. Form 5 covers the tools of economic analysis (research techniques, averages and data presentation), economic resources, enterprise and business organisation, demand, supply and elasticity, production costs, the theory of the firm and market structures, rewards to the factors of production, market failure and government intervention, international trade, national income measurement, money and banking and macroeconomic problems. Form 6 adds utility and indifference curve theory, growth of firms and small enterprises, profits, efficiency and price discrimination, theories of distribution, cost-benefit analysis and central planning, the balance of payments, terms of trade and exchange rates, national income determination and aggregate demand and supply, interest rates and inflation, and macroeconomic objectives and policies, with emphasis on Zimbabwe.",
  assessmentOverview: "Continuous assessment (assignments, theory tests and a practical assignment) carries 30%. The examination carries 70%: Paper 1 multiple choice (40 items, 1 hour 30 minutes, 20%), Paper 2 data response (two compulsory questions of 20 marks, 1 hour 15 minutes, 20%) and Paper 3 theory essays (12 questions, answer 4, 3 hours, 100 marks, 30%).",
  components: [
    { code: "1", name: "Paper 1: Multiple choice", kind: "MULTIPLE_CHOICE", description: "40 compulsory four-option multiple-choice items on all eleven topics.", durationMinutes: 90, maxMarks: 40, weightingPercent: 20 },
    { code: "2", name: "Paper 2: Data response", kind: "WRITTEN", description: "Two compulsory data-response questions of 20 marks each, testing knowledge, understanding and problem solving, on all eleven topics.", durationMinutes: 75, maxMarks: 40, weightingPercent: 20 },
    { code: "3", name: "Paper 3: Theory essays", kind: "WRITTEN", description: "Twelve essay questions; candidates answer four (100 marks, so about 25 each). Topics 2-11 (Tools of Economic Analysis is not listed for this paper).", durationMinutes: 180, maxMarks: 100, weightingPercent: 30 },
  ],
  topics: ZIMSEC_TOPICS,
};

// =====================================================================================================================
// Cambridge International AS & A Level Economics 9708, 2026-2028 (version 2, December 2025). Topics 1-11 and
// sub-topics (1.1 ...) are numbered as printed; objective codes are the printed learning-outcome references
// (2.2.3 = topic 2.2, outcome 3), paraphrased. Where the printed numbering runs several outcomes together (4.1.2-4.1.4,
// 7.4.x, 7.6.x, 7.8.x, 9.1.x) the codes below are sequential and ours. The two sections, the stage labels and the
// Examination skills section are ours.
const AS = ["1", "2"];
const AL = ["3", "4"];
const ASL = "AS Level";
const ALO = "A Level only";

const C9708_TOPICS = [
  section("as-content", "AS", "AS Level subject content", {
    description: "Topics 1-6: studied by all candidates; examined in Papers 1 and 2 and assumed knowledge for Papers 3 and 4.",
    children: [
      topic("basic-ideas", "1", "Basic economic ideas and resource allocation (AS Level)", {
        components: AS,
        children: [
          sub("basic-ideas.scarcity", "1.1", "Scarcity, choice and opportunity cost", {
            stage: ASL,
            covers: ["basics.scarcity-choice"],
            objectives: [
              o("1.1.1", "Explain the fundamental economic problem of scarcity."),
              o("1.1.2", "Explain the need to make choices at the level of individuals, firms and governments."),
              o("1.1.3", "Define opportunity cost and show how it arises from choices."),
              o("1.1.4", "Explain the basic questions of resource allocation: what, how and for whom to produce."),
            ],
          }),
          sub("basic-ideas.methodology", "1.2", "Economic methodology", {
            stage: ASL,
            covers: ["tools.economic-method"],
            objectives: [
              o("1.2.1", "Describe economics as a social science."),
              o("1.2.2", "Distinguish positive from normative statements (facts from value judgements)."),
              o("1.2.3", "Explain the meaning of ceteris paribus."),
              o("1.2.4", "Explain the importance of the time period: short run, long run and very long run."),
            ],
          }),
          sub("basic-ideas.factors", "1.3", "Factors of production", {
            stage: ASL,
            description: "Rewards to the factors (1.3.3) are taught in the distribution lesson covered here; specialisation and the entrepreneur (1.3.4-1.3.5) in one lesson.",
            covers: ["basics.factors-of-production", "distribution.factor-rewards", "basics.entrepreneur-specialisation"],
            objectives: [
              o("1.3.1", "Define the factors of production: land, labour, capital and enterprise."),
              o("1.3.2", "Distinguish human capital from physical capital."),
              o("1.3.3", "Identify the rewards to the factors of production."),
              o("1.3.4", "Explain the division of labour and specialisation."),
              o("1.3.5", "Explain the role of the entrepreneur in contemporary economies: bearing risk and organising the other factors."),
            ],
          }),
          sub("basic-ideas.systems", "1.4", "Resource allocation in different economic systems", {
            stage: ASL,
            covers: ["basics.economic-systems"],
            objectives: [
              o("1.4.1", "Explain decision-making in market, planned and mixed economies."),
              o("1.4.2", "Explain how resources are allocated in these systems."),
            ],
          }),
          sub("basic-ideas.ppc", "1.5", "Production possibility curves", {
            stage: ASL,
            covers: ["basics.ppc"],
            objectives: [
              o("1.5.1", "Explain the nature and meaning of a production possibility curve."),
              o("1.5.2", "Explain the shape of the PPC: constant and increasing opportunity costs."),
              o("1.5.3", "Explain the causes and consequences of shifts in a PPC."),
              o("1.5.4", "Explain the significance of a position within a PPC."),
            ],
          }),
          sub("basic-ideas.goods", "1.6", "Classification of goods and services", {
            stage: ASL,
            covers: ["basics.goods-classification"],
            objectives: [
              o("1.6.1", "Define free goods and private (economic) goods."),
              o("1.6.2", "Define public goods."),
              o("1.6.3", "Define merit goods and explain under-consumption through imperfect information."),
              o("1.6.4", "Define demerit goods and explain over-consumption through imperfect information."),
            ],
          }),
        ],
      }),
      topic("price-system-as", "2", "The price system and the microeconomy (AS Level)", {
        components: AS,
        children: [
          sub("price-system-as.demand-supply", "2.1", "Demand and supply curves", {
            stage: ASL,
            covers: ["market.demand", "market.supply"],
            objectives: [
              o("2.1.1", "Explain effective demand."),
              o("2.1.2", "Distinguish individual from market demand and supply."),
              o("2.1.3", "Identify the determinants of demand."),
              o("2.1.4", "Identify the determinants of supply."),
              o("2.1.5", "Explain the causes of a shift in the demand curve."),
              o("2.1.6", "Explain the causes of a shift in the supply curve."),
              o("2.1.7", "Distinguish a shift of a curve from a movement along it."),
            ],
          }),
          sub("price-system-as.elasticity", "2.2", "Price elasticity, income elasticity and cross elasticity of demand", {
            stage: ASL,
            covers: ["market.ped", "market.ped-revenue", "market.yed-xed"],
            objectives: [
              o("2.2.1", "Define PED, YED and XED."),
              o("2.2.2", "State the formulae for and calculate PED, YED and XED."),
              o("2.2.3", "Explain the significance of relative percentage changes and of the size and sign of each coefficient."),
              o("2.2.4", "Describe elasticity values: perfectly elastic, highly elastic, unitary, highly inelastic and perfectly inelastic."),
              o("2.2.5", "Explain how PED varies along a straight-line demand curve."),
              o("2.2.6", "Explain the factors affecting PED, YED and XED."),
              o("2.2.7", "Explain the relationship between PED and total expenditure on a product."),
              o("2.2.8", "Explain the implications of PED, YED and XED for decision-making."),
            ],
          }),
          sub("price-system-as.pes", "2.3", "Price elasticity of supply", {
            stage: ASL,
            covers: ["market.pes"],
            objectives: [
              o("2.3.1", "Define PES."),
              o("2.3.2", "State the formula for and calculate PES."),
              o("2.3.3", "Explain the significance of relative percentage changes and of the size and sign of the coefficient."),
              o("2.3.4", "Explain the factors affecting PES."),
              o("2.3.5", "Explain the implications for the speed and ease with which firms react to changed market conditions."),
            ],
          }),
          sub("price-system-as.interaction", "2.4", "The interaction of demand and supply", {
            stage: ASL,
            covers: ["market.equilibrium", "market.price-mechanism"],
            objectives: [
              o("2.4.1", "Define market equilibrium and disequilibrium."),
              o("2.4.2", "Explain the effects of shifts in demand and supply on equilibrium price and quantity."),
              o("2.4.3", "Explain relationships between markets: joint demand, alternative demand, derived demand and joint supply."),
              o("2.4.4", "Explain the functions of price in resource allocation: rationing, signalling and incentivising."),
            ],
          }),
          sub("price-system-as.surplus", "2.5", "Consumer and producer surplus", {
            stage: ASL,
            covers: ["market.surplus"],
            objectives: [
              o("2.5.1", "Explain the meaning and significance of consumer surplus."),
              o("2.5.2", "Explain the meaning and significance of producer surplus."),
              o("2.5.3", "Explain the causes of changes in consumer and producer surplus."),
              o("2.5.4", "Explain how PED and PES determine the extent of these changes."),
            ],
          }),
        ],
      }),
      topic("government-micro-as", "3", "Government microeconomic intervention (AS Level)", {
        components: AS,
        children: [
          sub("government-micro-as.reasons", "3.1", "Reasons for government intervention in markets", {
            stage: ASL,
            description: "Market failure (defined at 7.3.5-7.3.6 for A Level) is taught in the lesson covered here.",
            covers: ["intervention.market-failure"],
            objectives: [
              o("3.1.1", "Explain intervention to address the non-provision of public goods."),
              o("3.1.2", "Explain intervention to address over-consumption of demerit goods and under-consumption of merit goods."),
              o("3.1.3", "Explain why governments control prices in markets."),
            ],
          }),
          sub("government-micro-as.methods", "3.2", "Methods and effects of government intervention in markets", {
            stage: ASL,
            covers: ["intervention.taxes-subsidies", "intervention.price-controls-buffer-stocks", "intervention.direct-provision-information"],
            objectives: [
              o("3.2.1", "Explain the impact and incidence of specific indirect taxes."),
              o("3.2.2", "Explain the impact and incidence of subsidies."),
              o("3.2.3", "Explain direct provision of goods and services."),
              o("3.2.4", "Explain maximum and minimum prices."),
              o("3.2.5", "Explain buffer stock schemes."),
              o("3.2.6", "Explain the provision of information."),
            ],
          }),
          sub("government-micro-as.inequality", "3.3", "Addressing income and wealth inequality", {
            stage: ASL,
            covers: ["equity.inequality-redistribution"],
            objectives: [
              o("3.3.1", "Distinguish income as a flow from wealth as a stock."),
              o("3.3.2", "Describe the Gini coefficient as a measure of inequality (calculation not required)."),
              o("3.3.3", "Explain the economic reasons for inequality of income and wealth."),
              o("3.3.4", "Evaluate policies to redistribute income and wealth: minimum wage, transfer payments, progressive income taxes, inheritance and capital taxes, state provision of essential goods and services."),
            ],
          }),
        ],
      }),
      topic("macroeconomy-as", "4", "The macroeconomy (AS Level)", {
        components: AS,
        children: [
          sub("macroeconomy-as.national-income", "4.1", "National income statistics", {
            stage: ASL,
            covers: ["macro.national-income-statistics"],
            objectives: [
              o("4.1.1", "Explain the meaning of national income."),
              o("4.1.2", "Explain the measurement of national income: GDP, GNI and NNI."),
              o("4.1.3", "Explain the adjustment of measures from market prices to basic prices."),
              o("4.1.4", "Explain the adjustment of measures from gross values to net values."),
            ],
          }),
          sub("macroeconomy-as.circular-flow", "4.2", "Introduction to the circular flow of income", {
            stage: ASL,
            covers: ["macro.circular-flow"],
            objectives: [
              o("4.2.1", "Describe the circular flow of income in a closed and an open economy, including the international sector."),
              o("4.2.2", "Explain injections and leakages (the multiplier is not required at AS)."),
              o("4.2.3", "Explain equilibrium and disequilibrium in the flow (marginal and average propensities are not required at AS)."),
            ],
          }),
          sub("macroeconomy-as.ad-as", "4.3", "Aggregate demand and aggregate supply analysis", {
            stage: ASL,
            covers: ["macro.aggregate-demand", "macro.aggregate-supply", "macro.ad-as-equilibrium"],
            objectives: [
              o("4.3.1", "Define aggregate demand."),
              o("4.3.2", "Explain the components of AD: AD = C + I + G + (X - M)."),
              o("4.3.3", "Explain the determinants of AD (detailed knowledge of components is not required)."),
              o("4.3.4", "Explain the downward-sloping shape of the AD curve."),
              o("4.3.5", "Explain the causes of a shift in the AD curve."),
              o("4.3.6", "Define aggregate supply."),
              o("4.3.7", "Explain the determinants of AS."),
              o("4.3.8", "Describe the shape of SRAS and of LRAS (a vertical line, or in three sections)."),
              o("4.3.9", "Explain the causes of a shift in SRAS and in LRAS."),
              o("4.3.10", "Distinguish a movement along from a shift in AD and AS."),
              o("4.3.11", "Explain how equilibrium real output, the price level and employment are established in the AD/AS model."),
              o("4.3.12", "Explain the effects of shifts in AD and AS on real output, the price level and employment."),
            ],
          }),
          sub("macroeconomy-as.growth", "4.4", "Economic growth", {
            stage: ASL,
            covers: ["macro.growth-measurement-causes"],
            objectives: [
              o("4.4.1", "Explain the meaning of economic growth."),
              o("4.4.2", "Explain the measurement of economic growth."),
              o("4.4.3", "Distinguish growth in nominal GDP from growth in real GDP."),
              o("4.4.4", "Explain the causes of economic growth."),
              o("4.4.5", "Explain the consequences of economic growth."),
            ],
          }),
          sub("macroeconomy-as.unemployment", "4.5", "Unemployment", {
            stage: ASL,
            covers: ["macro.unemployment"],
            objectives: [
              o("4.5.1", "Explain the meaning of unemployment."),
              o("4.5.2", "Explain the measures of unemployment and the difficulties of measurement."),
              o("4.5.3", "Explain the causes and types of unemployment: frictional, structural, cyclical, seasonal and technological."),
              o("4.5.4", "Explain the consequences of unemployment."),
            ],
          }),
          sub("macroeconomy-as.price-stability", "4.6", "Price stability", {
            stage: ASL,
            covers: ["macro.price-indices-real-values", "macro.inflation"],
            objectives: [
              o("4.6.1", "Define inflation, deflation and disinflation."),
              o("4.6.2", "Explain the measurement of changes in the price level with the CPI and the difficulties of measurement."),
              o("4.6.3", "Distinguish money (nominal) values from real data."),
              o("4.6.4", "Explain the causes of inflation: cost-push and demand-pull."),
              o("4.6.5", "Explain the consequences of inflation."),
            ],
          }),
        ],
      }),
      topic("government-macro-as", "5", "Government macroeconomic intervention (AS Level)", {
        components: AS,
        children: [
          sub("government-macro-as.objectives", "5.1", "Government macroeconomic policy objectives", {
            stage: ASL,
            covers: ["policy.objectives"],
            objectives: [o("5.1.1", "Explain the use of government policy to achieve price stability, low unemployment and economic growth (conflicts and trade-offs are not required at AS).")],
          }),
          sub("government-macro-as.fiscal", "5.2", "Fiscal policy", {
            stage: ASL,
            covers: ["policy.taxes", "policy.fiscal-policy"],
            objectives: [
              o("5.2.1", "Explain the meaning of the government budget."),
              o("5.2.2", "Distinguish a budget deficit from a budget surplus."),
              o("5.2.3", "Explain the meaning and significance of the national debt."),
              o("5.2.4", "Explain taxation: direct and indirect, progressive, regressive and proportional taxes; marginal and average tax rates; reasons for taxation."),
              o("5.2.5", "Explain government spending: capital and current, and the reasons for it."),
              o("5.2.6", "Distinguish expansionary from contractionary fiscal policy."),
              o("5.2.7", "Use AD/AS analysis to show the impact of fiscal policy on national income, real output, the price level and employment."),
            ],
          }),
          sub("government-macro-as.monetary", "5.3", "Monetary policy", {
            stage: ASL,
            covers: ["policy.monetary-policy"],
            objectives: [
              o("5.3.1", "Define monetary policy."),
              o("5.3.2", "Explain the tools of monetary policy: interest rates, the money supply and credit regulations."),
              o("5.3.3", "Distinguish expansionary from contractionary monetary policy."),
              o("5.3.4", "Use AD/AS analysis to show the impact of monetary policy on national income, real output, the price level and employment."),
            ],
          }),
          sub("government-macro-as.supply-side", "5.4", "Supply-side policy", {
            stage: ASL,
            covers: ["policy.supply-side"],
            objectives: [
              o("5.4.1", "Explain the meaning of supply-side policy in terms of its effect on LRAS."),
              o("5.4.2", "Explain its objectives: increasing productivity and productive capacity."),
              o("5.4.3", "Explain its tools, such as training, infrastructure and support for technological improvement."),
              o("5.4.4", "Use AD/AS analysis to show the impact of supply-side policy on national income, real output, the price level and employment."),
            ],
          }),
        ],
      }),
      topic("international-as", "6", "International economic issues (AS Level)", {
        components: AS,
        children: [
          sub("international-as.reasons", "6.1", "The reasons for international trade", {
            stage: ASL,
            covers: ["trade.absolute-comparative", "trade.free-trade", "trade.terms-of-trade"],
            objectives: [
              o("6.1.1", "Distinguish absolute from comparative advantage."),
              o("6.1.2", "Explain the benefits of specialisation and free trade, including the trading possibility curve."),
              o("6.1.3", "Explain exports, imports and the terms of trade, including their measurement, the causes of changes and the impact of changes."),
              o("6.1.4", "Explain the limitations of the theories of absolute and comparative advantage."),
            ],
          }),
          sub("international-as.protectionism", "6.2", "Protectionism", {
            stage: ASL,
            covers: ["trade.protectionism"],
            objectives: [
              o("6.2.1", "Explain the meaning of protectionism."),
              o("6.2.2", "Explain tariffs, import quotas, export subsidies, embargoes and excessive administrative burdens, and their impact."),
              o("6.2.3", "Evaluate the arguments for and against protectionism."),
            ],
          }),
          sub("international-as.current-account", "6.3", "Current account of the balance of payments", {
            stage: ASL,
            covers: ["trade.bop-current-account"],
            objectives: [
              o("6.3.1", "Explain the components of the current account: trade in goods, trade in services, primary income and secondary income; define balance, deficit and surplus."),
              o("6.3.2", "Calculate the balance of trade in goods, in services, in goods and services, and the current account balance."),
              o("6.3.3", "Explain the causes of imbalances in the current account."),
              o("6.3.4", "Explain the consequences of imbalances for the domestic and external economy."),
            ],
          }),
          sub("international-as.exchange-rates", "6.4", "Exchange rates", {
            stage: ASL,
            description: "The Marshall-Lerner condition and the J-curve (11.2.5) are taught in the lesson covered here.",
            covers: ["trade.exchange-rates-floating", "trade.exchange-rate-effects"],
            objectives: [
              o("6.4.1", "Define an exchange rate."),
              o("6.4.2", "Explain the determination of a floating exchange rate."),
              o("6.4.3", "Distinguish depreciation from appreciation of a floating rate."),
              o("6.4.4", "Explain the causes of changes in a floating rate: the demand for and supply of the currency."),
              o("6.4.5", "Use AD/AS analysis to show the impact of exchange rate changes on national income, real output, the price level and employment."),
            ],
          }),
          sub("international-as.correcting", "6.5", "Policies to correct imbalances in the current account of the balance of payments", {
            stage: ASL,
            covers: ["trade.bop-policies"],
            objectives: [
              o("6.5.1", "Explain stability of the current account as a policy objective."),
              o("6.5.2", "Explain the effect of fiscal, monetary, supply-side and protectionist policies on the current account."),
            ],
          }),
        ],
      }),
    ],
  }),
  section("a-content", "A", "A Level subject content", {
    description: "Topics 7-11: A Level only; examined in Papers 3 and 4 (AS content is assumed knowledge and is not the direct focus).",
    children: [
      topic("price-system-a", "7", "The price system and the microeconomy (A Level)", {
        components: AL,
        children: [
          sub("price-system-a.utility", "7.1", "Utility", {
            stage: ALO,
            covers: ["utility.marginal-utility"],
            objectives: [
              o("7.1.1", "Define and calculate total utility and marginal utility."),
              o("7.1.2", "Explain diminishing marginal utility."),
              o("7.1.3", "Explain the equi-marginal principle."),
              o("7.1.4", "Derive an individual demand curve."),
              o("7.1.5", "Evaluate marginal utility theory and its assumption of rational behaviour."),
            ],
          }),
          sub("price-system-a.indifference", "7.2", "Indifference curves and budget lines", {
            stage: ALO,
            covers: ["utility.indifference-curves"],
            objectives: [
              o("7.2.1", "Explain an indifference curve and a budget line."),
              o("7.2.2", "Explain the causes of a shift in the budget line."),
              o("7.2.3", "Explain income, substitution and price effects for normal, inferior and Giffen goods."),
              o("7.2.4", "Evaluate the model of indifference curves."),
            ],
          }),
          sub("price-system-a.efficiency", "7.3", "Efficiency and market failure", {
            stage: ALO,
            description: "Market failure (7.3.5-7.3.6) is taught in the lesson covered at 3.1.",
            covers: ["firms.efficiency"],
            objectives: [
              o("7.3.1", "Define productive efficiency and allocative efficiency."),
              o("7.3.2", "Explain the conditions for productive and allocative efficiency."),
              o("7.3.3", "Explain Pareto optimality."),
              o("7.3.4", "Define dynamic efficiency."),
              o("7.3.5", "Define market failure."),
              o("7.3.6", "Explain the reasons for market failure."),
            ],
          }),
          sub("price-system-a.externalities", "7.4", "Private costs and benefits, externalities and social costs and benefits", {
            stage: ALO,
            covers: ["intervention.externalities", "intervention.cost-benefit"],
            objectives: [
              o("7.4.1", "Define and calculate social cost as private plus external cost, including the marginal versions."),
              o("7.4.2", "Define and calculate social benefit as private plus external benefit, including the marginal versions."),
              o("7.4.3", "Define positive and negative externalities."),
              o("7.4.4", "Explain positive and negative externalities of consumption and production."),
              o("7.4.5", "Explain the deadweight welfare losses arising from positive and negative externalities."),
              o("7.4.6", "Explain asymmetric information and moral hazard."),
              o("7.4.7", "Use costs and benefits to analyse decisions (net present value is not required)."),
            ],
          }),
          sub("price-system-a.costs", "7.5", "Types of cost, revenue and profit, short-run and long-run production", {
            stage: ALO,
            covers: ["costs.short-run-production", "costs.short-run-costs", "costs.long-run-costs-scale", "costs.revenue-curves", "costs.profit-types"],
            objectives: [
              o("7.5.1", "Explain the short-run production function: fixed and variable factors, total, average and marginal product, and diminishing returns."),
              o("7.5.2", "Define and calculate fixed, variable, total, average and marginal costs and explain the shape of the short-run cost curves."),
              o("7.5.3", "Explain the long-run production function: no fixed factors, and returns to scale."),
              o("7.5.4", "Explain the shape of the long-run average cost curve and the minimum efficient scale."),
              o("7.5.5", "Explain the relationship between economies of scale and decreasing average costs."),
              o("7.5.6", "Explain internal and external economies of scale."),
              o("7.5.7", "Explain internal and external diseconomies of scale."),
              o("7.5.8", "Define and calculate total, average and marginal revenue."),
              o("7.5.9", "Define normal, subnormal and supernormal profit."),
              o("7.5.10", "Calculate supernormal and subnormal profit."),
            ],
          }),
          sub("price-system-a.market-structures", "7.6", "Different market structures", {
            stage: ALO,
            description: "Cartels (7.7.4) are taught in the collusion lesson covered here.",
            covers: ["firms.structures-features", "firms.perfect-competition", "firms.monopoly", "firms.monopolistic-competition", "firms.oligopoly", "firms.collusion-game-theory"],
            objectives: [
              o("7.6.1", "Distinguish perfect competition from imperfect competition: monopoly, monopolistic competition, oligopoly and natural monopoly."),
              o("7.6.2", "Describe each market by the number of buyers and sellers, product differentiation, freedom of entry and availability of information."),
              o("7.6.3", "Explain legal, market, cost and physical barriers to entry and exit."),
              o("7.6.4", "Explain the performance of firms in each structure: revenue curves, short- and long-run output and profit, shutdown price and the supply curve under perfect competition."),
              o("7.6.5", "Explain efficiency and X-inefficiency, contestable markets, price and non-price competition, collusion and the Prisoner's Dilemma with a two-player pay-off matrix."),
              o("7.6.6", "Define and calculate the concentration ratio."),
            ],
          }),
          sub("price-system-a.growth", "7.7", "Growth and survival of firms", {
            stage: ALO,
            covers: ["firms.growth-integration"],
            objectives: [
              o("7.7.1", "Explain the reasons for different sizes of firm."),
              o("7.7.2", "Explain internal growth: organic growth and diversification."),
              o("7.7.3", "Explain external growth by horizontal, vertical and conglomerate integration: methods, reasons and consequences."),
              o("7.7.4", "Explain cartels: the conditions for an effective cartel and its consequences."),
              o("7.7.5", "Explain the principal-agent problem arising from differing objectives of owners and managers."),
            ],
          }),
          sub("price-system-a.objectives", "7.8", "Differing objectives and policies of firms", {
            stage: ALO,
            description: "The principal-agent problem (7.7.5) is taught in the objectives lesson covered here.",
            covers: ["firms.objectives", "firms.price-discrimination"],
            objectives: [
              o("7.8.1", "Explain the traditional profit-maximising objective."),
              o("7.8.2", "Explain other objectives: survival, profit satisficing, sales maximisation and revenue maximisation."),
              o("7.8.3", "Explain first-, second- and third-degree price discrimination, the conditions for it and its consequences."),
              o("7.8.4", "Explain other pricing policies: limit pricing, predatory pricing and price leadership."),
              o("7.8.5", "Explain the relationship between PED and a firm's revenue, for a normal and a kinked demand curve."),
            ],
          }),
        ],
      }),
      topic("government-micro-a", "8", "Government microeconomic intervention (A Level)", {
        components: AL,
        children: [
          sub("government-micro-a.policies", "8.1", "Government policies to achieve efficient resource allocation and correct market failure", {
            stage: ALO,
            covers: ["intervention.regulation-permits-nudge", "intervention.privatisation", "intervention.government-failure"],
            objectives: [
              o("8.1.1", "Apply and assess measures to tackle market failure: specific and ad valorem taxes, subsidies, price controls, production quotas, prohibitions and licences, regulation and deregulation, direct provision, pollution permits, property rights, nationalisation and privatisation, provision of information, and behavioural insights and 'nudge' theory."),
              o("8.1.2", "Define government failure and explain its causes and consequences in microeconomic intervention."),
            ],
          }),
          sub("government-micro-a.equity", "8.2", "Equity and redistribution of income and wealth", {
            stage: ALO,
            covers: ["equity.poverty-equity"],
            objectives: [
              o("8.2.1", "Distinguish equity from equality."),
              o("8.2.2", "Distinguish equity from efficiency."),
              o("8.2.3", "Distinguish absolute from relative poverty."),
              o("8.2.4", "Explain the poverty trap."),
              o("8.2.5", "Evaluate policies towards equity and equality: negative income tax, universal and means-tested benefits, universal basic income."),
            ],
          }),
          sub("government-micro-a.labour", "8.3", "Labour market forces and government intervention", {
            stage: ALO,
            covers: ["labour.demand-mrp", "labour.supply", "labour.wage-determination", "labour.wage-differentials", "distribution.rent-transfer-earnings"],
            objectives: [
              o("8.3.1", "Explain the demand for labour as a derived demand."),
              o("8.3.2", "Explain the factors affecting the demand for labour in a firm or an occupation."),
              o("8.3.3", "Explain shifts in and movements along the demand curve for labour."),
              o("8.3.4", "Define and calculate marginal revenue product and derive a firm's demand for labour from it."),
              o("8.3.5", "Explain the wage and non-wage factors affecting the supply of labour."),
              o("8.3.6", "Explain shifts in and movements along the supply curve of labour."),
              o("8.3.7", "Explain wage determination in perfect markets: equilibrium wage and employment."),
              o("8.3.8", "Explain wage determination in imperfect markets: trade unions, a national minimum wage and monopsony."),
              o("8.3.9", "Explain how labour market forces determine wage differentials."),
              o("8.3.10", "Define transfer earnings and economic rent and explain the factors affecting them."),
            ],
          }),
        ],
      }),
      topic("macroeconomy-a", "9", "The macroeconomy (A Level)", {
        components: AL,
        children: [
          sub("macroeconomy-a.circular-flow", "9.1", "The circular flow of income", {
            stage: ALO,
            covers: ["macro.consumption-saving-investment", "macro.multiplier", "macro.income-gaps"],
            objectives: [
              o("9.1.1", "Define the multiplier and state the formulae for it in a closed and open economy, with and without a government sector."),
              o("9.1.2", "Calculate the propensities to save, consume and import and the rates of tax (average and marginal)."),
              o("9.1.3", "Use the multiplier to calculate the effect of a change in AD on national income."),
              o("9.1.4", "Explain the components of AD and their determinants: consumption and savings functions, autonomous and induced investment, the accelerator, government spending and net exports."),
              o("9.1.5", "Explain the full employment and equilibrium levels of national income, and inflationary and deflationary gaps."),
            ],
          }),
          sub("macroeconomy-a.growth", "9.2", "Economic growth and sustainability", {
            stage: ALO,
            covers: ["macro.growth-cycles-gaps", "macro.growth-inclusive-sustainable"],
            objectives: [
              o("9.2.1", "Distinguish actual from potential growth."),
              o("9.2.2", "Explain positive and negative output gaps."),
              o("9.2.3", "Explain the business cycle: phases, causes and automatic stabilisers."),
              o("9.2.4", "Evaluate policies to promote economic growth."),
              o("9.2.5", "Explain inclusive economic growth, its effect on equity and equality, and policies to promote it."),
              o("9.2.6", "Explain sustainable economic growth, resource use and conservation, the effects of growth on the environment and climate change, and policies to mitigate them."),
            ],
          }),
          sub("macroeconomy-a.employment", "9.3", "Employment/unemployment", {
            stage: ALO,
            covers: ["macro.unemployment-natural-rate"],
            objectives: [
              o("9.3.1", "Define full employment."),
              o("9.3.2", "Explain equilibrium and disequilibrium unemployment, including hysteresis."),
              o("9.3.3", "Distinguish voluntary from involuntary unemployment."),
              o("9.3.4", "Define the natural rate of unemployment and explain its determinants and policy implications."),
              o("9.3.5", "Describe patterns and trends in employment and unemployment."),
              o("9.3.6", "Explain geographical and occupational mobility of labour and the factors affecting it."),
              o("9.3.7", "Evaluate policies to reduce unemployment."),
            ],
          }),
          sub("macroeconomy-a.money", "9.4", "Money and banking", {
            stage: ALO,
            description: "Policies to reduce inflation (9.4.6) are taught in the inflation lesson covered at 4.6.",
            covers: ["money.functions-characteristics", "money.banking-institutions", "money.credit-creation", "money.money-demand-supply", "money.quantity-theory", "money.interest-rates"],
            objectives: [
              o("9.4.1", "Define money and explain its functions and characteristics."),
              o("9.4.2", "Define the money supply."),
              o("9.4.3", "Explain the quantity theory of money (MV = PT)."),
              o("9.4.4", "Explain the functions and objectives of commercial banks: deposits, lending, balance sheet items, reserve and capital ratios, liquidity, security and profitability."),
              o("9.4.5", "Explain the causes of changes in the money supply in an open economy: credit creation and the bank credit multiplier, the central bank, deficit financing, quantitative easing and the balance of payments."),
              o("9.4.6", "Evaluate policies to reduce inflation."),
              o("9.4.7", "Explain the demand for money using liquidity preference theory."),
              o("9.4.8", "Explain interest rate determination using the loanable funds and Keynesian theories."),
            ],
          }),
        ],
      }),
      topic("government-macro-a", "10", "Government macroeconomic intervention (A Level)", {
        components: AL,
        children: [
          sub("government-macro-a.objectives", "10.1", "Government macroeconomic policy objectives", {
            stage: ALO,
            description: "Objectives in terms of inflation, the balance of payments, unemployment, growth, development, sustainability and redistribution (10.1.1) are taught in the policy-objectives lesson covered at 5.1.",
            objectives: [o("10.1.1", "Explain macroeconomic objectives for inflation, the balance of payments, unemployment, growth, development, sustainability and the redistribution of income and wealth.")],
          }),
          sub("government-macro-a.links", "10.2", "Links between macroeconomic problems and their interrelatedness", {
            stage: ALO,
            covers: ["policy.interrelated-problems-phillips"],
            objectives: [
              o("10.2.1", "Explain the relationship between the internal and the external value of money."),
              o("10.2.2", "Explain the relationship between the balance of payments and inflation."),
              o("10.2.3", "Explain the relationship between growth and inflation."),
              o("10.2.4", "Explain the relationship between growth and the balance of payments."),
              o("10.2.5", "Explain the relationship between inflation and unemployment: the traditional and the expectations-augmented (short- and long-run) Phillips curves."),
            ],
          }),
          sub("government-macro-a.effectiveness", "10.3", "Effectiveness of policy options to meet all macroeconomic objectives", {
            stage: ALO,
            covers: ["policy.effectiveness-conflicts"],
            objectives: [
              o("10.3.1", "Evaluate the effectiveness of fiscal (including the Laffer curve), monetary, supply-side (market-based and interventionist), exchange rate and international trade policies against the different objectives."),
              o("10.3.2", "Explain problems and conflicts arising from the outcomes of these policies."),
              o("10.3.3", "Explain government failure in macroeconomic policies."),
            ],
          }),
        ],
      }),
      topic("international-a", "11", "International economic issues (A Level)", {
        components: AL,
        children: [
          sub("international-a.bop", "11.1", "Policies to correct disequilibrium in the balance of payments", {
            stage: ALO,
            description: "The effects of policies (11.1.2) and expenditure-switching against expenditure-reducing policies (11.1.3) are taught in the lesson covered at 6.5.",
            covers: ["trade.bop-accounts"],
            objectives: [
              o("11.1.1", "Explain the components of the balance of payments accounts: current account, financial account and capital account."),
              o("11.1.2", "Explain the effect of fiscal, monetary, supply-side, protectionist and exchange rate policies on the balance of payments."),
              o("11.1.3", "Distinguish expenditure-switching from expenditure-reducing policies."),
            ],
          }),
          sub("international-a.exchange-rates", "11.2", "Exchange rates at A Level", {
            stage: ALO,
            description: "The effects of exchange rate changes, including Marshall-Lerner and the J-curve (11.2.5), are taught in the lesson covered at 6.4.",
            covers: ["trade.exchange-rate-systems"],
            objectives: [
              o("11.2.1", "Distinguish nominal from real exchange rates and explain trade-weighted exchange rates."),
              o("11.2.2", "Explain the determination of exchange rates under fixed and managed systems."),
              o("11.2.3", "Distinguish revaluation from devaluation of a fixed exchange rate."),
              o("11.2.4", "Explain changes in the exchange rate under different exchange rate systems."),
              o("11.2.5", "Explain the effects of changing exchange rates on the external economy using Marshall-Lerner and J-curve analysis."),
            ],
          }),
          sub("international-a.development", "11.3", "Economic development", {
            stage: ALO,
            covers: ["dev.living-standards-indicators"],
            objectives: [
              o("11.3.1", "Classify economies by level of development."),
              o("11.3.2", "Classify economies by level of national income."),
              o("11.3.3", "Evaluate indicators of living standards and development: real per capita national income, purchasing power parity, issues of comparison, non-monetary indicators, composite indicators (HDI, MEW, MPI) and the Kuznets curve."),
              o("11.3.4", "Compare economic growth rates and living standards over time and between countries."),
            ],
          }),
          sub("international-a.characteristics", "11.4", "Characteristics of countries at different levels of development", {
            stage: ALO,
            covers: ["dev.population", "dev.economic-structure", "dev.income-distribution-lorenz"],
            objectives: [
              o("11.4.1", "Explain population growth and structure: birth rate, death rate, infant mortality, net migration, optimum population and urbanisation."),
              o("11.4.2", "Calculate the Gini coefficient and use Lorenz curve analysis of income distribution."),
              o("11.4.3", "Explain economic structure: employment composition by sector and the pattern of trade at different levels of development."),
            ],
          }),
          sub("international-a.relationships", "11.5", "Relationship between countries at different levels of development", {
            stage: ALO,
            covers: ["dev.aid-debt-institutions", "dev.mncs-fdi"],
            objectives: [
              o("11.5.1", "Explain international aid: forms, reasons for giving, effects and importance."),
              o("11.5.2", "Explain trade and investment between countries at different levels of development."),
              o("11.5.3", "Define multinational companies and explain their activities and consequences."),
              o("11.5.4", "Define foreign direct investment and explain its consequences."),
              o("11.5.5", "Explain the causes and consequences of external debt."),
              o("11.5.6", "Explain the role of the International Monetary Fund."),
              o("11.5.7", "Explain the role of the World Bank."),
            ],
          }),
          sub("international-a.globalisation", "11.6", "Globalisation", {
            stage: ALO,
            covers: ["dev.globalisation", "trade.economic-integration"],
            objectives: [
              o("11.6.1", "Explain the meaning of globalisation and its causes and consequences."),
              o("11.6.2", "Distinguish a free trade area, a customs union, a monetary union and a full economic union."),
              o("11.6.3", "Explain trade creation and trade diversion."),
            ],
          }),
        ],
      }),
    ],
  }),
  section("examination-skills", "SK", "Examination skills", {
    description: "Not a content section of the syllabus: our grouping of the assessment objectives (AO1 knowledge and understanding, AO2 analysis, AO3 evaluation), the command words and the structure of the data-response and essay papers.",
    children: [
      topic("examination-skills.data-response", "SK1", "Data response: diagrams, data and calculations", {
        components: ["2", "4"],
        children: [
          sub("examination-skills.data-response.source", "SK1.1", "Using source material, diagrams and calculations", {
            stage: "AS and A Level",
            covers: ["skills.diagrams-and-data"],
            objectives: [
              o("SK1.1.1", "Select, interpret and organise economic information in written, numerical and diagrammatic form."),
              o("SK1.1.2", "Use clearly labelled diagrams and calculations to support an answer."),
            ],
          }),
        ],
      }),
      topic("examination-skills.essays", "SK2", "Essays: analysis and evaluation", {
        components: ["2", "4"],
        children: [
          sub("examination-skills.essays.evaluation", "SK2.1", "Writing and evaluating arguments", {
            stage: "AS and A Level",
            covers: ["skills.essay-evaluation"],
            objectives: [
              o("SK2.1.1", "Recognise assumptions and limitations of economic information and models, and assess the strengths and weaknesses of arguments."),
              o("SK2.1.2", "Communicate reasoned judgements and conclusions, recognising that some decisions involve priorities and value judgements."),
            ],
          }),
        ],
      }),
    ],
  }),
];

const c9708 = {
  board: "cambridge",
  qualification: "a-level",
  subject: "economics",
  versionLabel: "2026-2028",
  family: "economics-a",
  title: "Cambridge International AS & A Level Economics (9708)",
  code: "9708",
  effectiveFrom: "2026-01-01",
  effectiveTo: "2028-12-31",
  publishAs: "CURRENT",
  officialDocument: {
    title: "Cambridge International AS & A Level Economics 9708 syllabus for 2026, 2027 and 2028 (version 2, published December 2025)",
    url: "https://www.cambridgeinternational.org/Images/697423-2026-2028-syllabus.pdf",
    publisher: "Cambridge University Press & Assessment (Cambridge International Education)",
  },
  sourceNote: "Topic and sub-topic headings (1 Basic economic ideas and resource allocation ... 11.6 Globalisation) are transcribed with their printed numbers; objective codes are the printed learning-outcome references (topic, sub-topic, outcome number, e.g. 2.2.3), paraphrased in our own words. Where the printed numbering runs several outcomes together (4.1.2-4.1.4, 7.4, 7.6, 7.8, 9.1) the codes are sequential and ours. The two sections (AS and A), the stage labels and the Examination skills section (codes SK1.1 ...) are ours. No syllabus text is reproduced.",
  notes: [
    "Source (read 2026-10-08): the official PDF 'Cambridge International AS & A Level Economics 9708 syllabus for 2026, 2027 and 2028', version 2, published December 2025, read through a pdftotext rendering. Exams are in the June and November series (March for India). Check headings and objective codes against the PDF.",
    "Routes as printed: AS Level only (Papers 1 and 2 in one series; grades a-e); A Level staged over two years (AS in year 1, carried forward, then Papers 3 and 4); A Level in one series (all four papers; grades A*-E). Route A here covers both A Level routes.",
    "Weightings: Paper 1 33% of AS and 17% of A Level; Paper 2 67% and 33%; Paper 3 17% of A Level; Paper 4 33% of A Level. weightingPercent records the A Level share; the AS shares are in each paper's description. Assessment objectives: AO1 knowledge and understanding 35% of AS and 40% of A Level (Paper 1 47%, Paper 2 33%, Paper 3 47%, Paper 4 37%); AO2 analysis 40% and 35%; AO3 evaluation 25% of both (Paper 1 13%, Paper 2 30%, Paper 3 13%, Paper 4 30%) as read from a table whose numbers came out partly scrambled; check them.",
    "Question forms: Papers 1 and 3 are 30 multiple-choice questions of 1 mark each. Paper 2 (60 marks, 2 hours): Section A one compulsory data-response question of 20 marks with approximately six parts; Section B one essay from two (microeconomics) and Section C one from two (macroeconomics), each essay 20 marks in two parts. Paper 4 (60 marks, 2 hours): Section A one compulsory data-response question of 20 marks with four parts; Sections B and C as in Paper 2 but the essays are unstructured, with no parts. Sections B and C are marked with a levels-based mark scheme. The sizes of the parts are not printed; our practice convention (essay parts 8 and 12 marks in Paper 2) must be checked against specimen and recent papers.",
    "Calculators may be used in all papers; formulae are not given in the question papers. AS content is assumed knowledge for Papers 3 and 4 and is not their direct focus. The syllabus limits AS depth in places (the multiplier, marginal and average propensities and policy conflicts are not required at AS; calculation of the Gini coefficient is not required at AS; net present value is not required).",
    "Stage labels: a concept is labelled with the stage of the node that covers it. Several AS-labelled lessons carry an A Level extension taught in the same lesson (market failure 7.3.5-7.3.6, the Marshall-Lerner condition and the J-curve 11.2.5, the full list of intervention measures 8.1.1 in separate lessons, policies to reduce inflation 9.4.6, expenditure-switching and expenditure-reducing policies 11.1.2-11.1.3); the node descriptions say where. Node 10.1 (A Level policy objectives) has no concept of its own: its content is taught in the lesson covered at 5.1.",
    "This syllabus is for examination in 2026, 2027 and 2028; the document says textbooks endorsed for examination from 2023 remain suitable, so it follows a 2023-2025 syllabus (not in the repository). Candidates from 2029 will follow a later syllabus (not in the repository); check the Cambridge website for it and add a new version file.",
  ],
  overview: "Cambridge International AS & A Level Economics (9708) is a two-stage course. The AS Level content (topics 1-6) covers basic economic ideas and resource allocation, the price system (demand, supply, elasticity, equilibrium, surplus), government microeconomic intervention, the macroeconomy (national income, the circular flow, AD/AS, growth, unemployment, price stability), macroeconomic policy (fiscal, monetary and supply-side) and international trade, protectionism, the current account and exchange rates. The A Level content (topics 7-11) adds utility and indifference curves, efficiency and market failure, costs, revenue and market structures, the growth and objectives of firms, policies to correct market failure, equity and labour markets, the multiplier, growth and sustainability, unemployment, money and banking, policy interrelationships and effectiveness, the balance of payments and exchange rate systems, economic development, aid, multinational companies and globalisation.",
  assessmentOverview: "AS Level candidates take Paper 1 Multiple Choice (1 hour, 30 marks) and Paper 2 Data Response and Essays (2 hours, 60 marks). A Level candidates also take Paper 3 A Level Multiple Choice (1 hour 15 minutes, 30 marks) and Paper 4 A Level Data Response and Essays (2 hours, 60 marks), either in the same series or in a later one, carrying forward their AS result.",
  components: [
    { code: "1", name: "Paper 1: AS Level Multiple Choice", kind: "MULTIPLE_CHOICE", description: "30 multiple-choice questions on the AS Level content (AO1, AO2 and AO3). 33% of AS Level, 17% of A Level.", durationMinutes: 60, maxMarks: 30, weightingPercent: 17, calculatorAllowed: true },
    { code: "2", name: "Paper 2: AS Level Data Response and Essays", kind: "WRITTEN", description: "Section A one compulsory data-response question (20 marks, approximately six parts); Section B one essay from two on microeconomics and Section C one essay from two on macroeconomics (20 marks each, two parts each). AS Level content. 67% of AS Level, 33% of A Level.", durationMinutes: 120, maxMarks: 60, weightingPercent: 33, calculatorAllowed: true },
    { code: "3", name: "Paper 3: A Level Multiple Choice", kind: "MULTIPLE_CHOICE", description: "30 multiple-choice questions on the A Level content; AS Level content assumed (AO1, AO2 and AO3). 17% of A Level.", durationMinutes: 75, maxMarks: 30, weightingPercent: 17, calculatorAllowed: true },
    { code: "4", name: "Paper 4: A Level Data Response and Essays", kind: "WRITTEN", description: "Section A one compulsory data-response question (20 marks, four parts); Section B one essay from two on microeconomics and Section C one essay from two on macroeconomics (20 marks each, unstructured with no parts). A Level content; AS Level content assumed. 33% of A Level.", durationMinutes: 120, maxMarks: 60, weightingPercent: 33, calculatorAllowed: true },
  ],
  routes: [
    { code: "AS", name: "AS Level", description: "Papers 1 and 2 (grades a-e). Also the first year of the staged A Level route.", components: ["1", "2"] },
    { code: "A", name: "A Level", description: "All four papers, in one series or staged (AS Level carried forward, then Papers 3 and 4) (grades A*-E).", isDefault: true, components: ["1", "2", "3", "4"] },
  ],
  topics: C9708_TOPICS,
};

// =====================================================================================================================
// Checks: every covered concept exists, each concept is covered at most once per syllabus (on the most specific node),
// every concept is covered by at least one syllabus, node keys and objective codes are unique; report what each
// syllabus leaves out. Then label each concept description with its coverage.
const coverage = new Map(); // concept -> { zimsec?: form, cambridge?: stage }
for (const s of [zimsec, c9708]) {
  const seen = new Map();
  const codes = new Set();
  const keys = new Set();
  const names = new Map();
  let nodes = 0;
  const walk = (list) => {
    for (const n of list) {
      nodes++;
      if (keys.has(n.key)) throw new Error(`${s.board}: duplicate node key ${n.key}`);
      keys.add(n.key);
      names.set(n.name, [...(names.get(n.name) ?? []), n]);
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
  // Two nodes with the same name would get the same slug: give the later ones an explicit slug from their key.
  for (const list of names.values()) if (list.length > 1) for (const n of list) n.slug = n.key.replace(/[^a-z0-9]+/g, "-");
  const missing = [...CONCEPT_KEYS].filter((k) => !seen.has(k));
  const noCover = [];
  const leaf = (list) => list.forEach((n) => ((n.children ?? []).length ? leaf(n.children) : !(n.covers ?? []).length && noCover.push(n.key)));
  leaf(s.topics);
  console.log(`${s.board}/${s.qualification}/${s.subject}/${s.versionLabel}: ${s.topics.length} top-level nodes, ${nodes} nodes, ${seen.size} concepts covered, ${codes.size} objectives; not covered (${missing.length}): ${missing.join(", ") || "none"}\n  leaf nodes without concepts: ${noCover.join(", ") || "none"}\n`);
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
  family: "economics-a",
  name: "Economics (A-Level / AS & A Level)",
  level: "A",
  prefix: "aecon",
  subjects: ["zimsec/a-level/economics", "cambridge/a-level/economics"],
  concepts: CONCEPTS.map(([key, name, description]) => ({ key, name, description: `${label(coverage.get(key))} ${description}` })),
};

const strip = (k, v) => (k.startsWith("_") ? undefined : v);
const write = (rel, data) => {
  const file = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, strip, 2) + "\n");
  console.log("wrote", rel);
};
write("content/concepts/economics-a.json", registry);
write("content/syllabi/zimsec/a-level/economics/2015-2022.json", zimsec);
write("content/syllabi/cambridge/a-level/economics/2026-2028.json", c9708);
