// W2a: ZIMSEC Business Enterprise and Skills exam-format items: 1 × 17-mark Paper 1 structured question and
// 2 × 20-mark Paper 2 Section B essays. Mark splits within items are ours (the syllabus does not print them).
import { concept, P, f, money, fmt, sum, r2, table, check, BES } from "../lib.mjs";

const L10 = [[3, 7, 10, "Detailed, accurate explanation of a full range of points, each developed with examples."], [2, 4, 6, "Several relevant points with some development."], [1, 1, 3, "A few points listed, little development."]];
const L8 = [[3, 6, 8, "Well-developed description of several relevant points, applied with examples."], [2, 3, 5, "Some description of relevant points; limited examples."], [1, 1, 2, "Points listed with little or no explanation."]];
const L12 = [[3, 9, 12, "Balanced evaluation, well developed and applied, with a justified conclusion."], [2, 5, 8, "Some evaluation of both sides, or one side well developed; weak conclusion."], [1, 1, 4, "Simple points on one side, little explanation, no conclusion."]];

concept("bus.enterprise.entrepreneurship", { file: "exam/w2a-bes", keyPrefix: "exam.w2a-bes", applies: BES }, (b) => {
  // 17 marks: start-up of a detergent-making enterprise.
  const items = [["Mixing drums and tools", 640], ["Raw materials (first month)", 910], ["Containers and labels", 350], ["Registration and licence", 180]];
  const total = sum(items.map((x) => x[1]));
  const savings = 1200, gap = r2(total - savings);
  const price = 2.4, vc = 1.1, fixed = 520, units = 700;
  const profit = r2(f.profit(f.revenue(price, units), f.totalCost(fixed, f.totalVariableCost(vc, units))));
  check("profit", profit, r2((price - vc) * units - fixed));
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, secs: 1080, calculator: true, paper: "Paper 1",
    concepts: ["bus.enterprise.entrepreneurship", "bus.enterprise.start-up-support", "bus.enterprise.business-plan", "bus.organisation.sole-traders-partnerships", "bus.organisation.limited-companies"],
    stem: `Rudo and Thandeka, both 19, plan to make liquid dish-washing detergent in Mutare and sell it to tuck shops. They noticed that shops often run out of cheap detergent. Their mini business plan shows these start-up costs:\n\n${table(["Start-up cost", "US\\$"], items)}\n\nTogether they have savings of ${money(savings)}. They plan to sell ${fmt(units)} bottles a month at ${money(price)} each. Variable cost is ${money(vc)} a bottle and fixed costs are ${money(fixed)} a month.`,
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "State **two** qualities of an enterpriser that Rudo and Thandeka show.",
        points: ["Spotting opportunities / initiative (shops run out of detergent) (1)", "Risk-taking (investing savings) / planning (business plan) (1)"],
      }),
      P.num({
        label: "(b)", marks: 2, kind: "money", value: total,
        stem: "Calculate the total start-up costs.",
        wrong: [r2(total - 180), r2(total - 910)],
        explanation: `${items.map((x) => fmt(x[1])).join(" + ")} = ${money(total)}.`,
      }),
      P.num({
        label: "(c)", marks: 2, kind: "money", value: gap,
        stem: "Calculate how much finance they need in addition to their savings.",
        wrong: [savings, total],
        explanation: `${fmt(total)} − ${fmt(savings)} = ${money(gap)}.`,
      }),
      P.num({
        label: "(d)", marks: 2, kind: "money", value: profit,
        stem: "Calculate the forecast monthly profit.",
        wrong: [r2(price * units - fixed), r2((price - vc) * units)],
        explanation: `Revenue ${fmt(units)} × ${fmt(price)} = ${fmt(r2(price * units))}; total costs ${fmt(fixed)} + ${fmt(units)} × ${fmt(vc)} = ${fmt(r2(fixed + vc * units))}; profit = ${money(profit)}.`,
      }),
      P.manual({
        label: "(e)", marks: 4,
        stem: "Explain **two** ways the government could support their start-up.",
        points: ["Way 1, e.g. youth loan at low interest / loan guarantee (1)", `Developed: covers the ${money(gap)} gap without collateral (1)`, "Way 2, e.g. training / advice / workspace / simpler registration (1)", "Developed: better costing and records / lower costs, so less risk of failure (1)"],
      }),
      P.manual({
        label: "(f)", marks: 5,
        stem: "Recommend whether they should form a partnership or a private limited company. Justify your answer.",
        points: [
          "Partnership: cheap and simple to form; suits a small business (1)",
          "Partnership: unlimited liability and possible disputes (1)",
          "Company: limited liability and continuity (1)",
          "Company: formation costs and formalities large compared with small capital (1)",
          "Justified recommendation using case evidence (1)",
        ],
      }),
    ],
    explanation: `Start-up costs ${money(total)}; finance needed ${money(gap)}; forecast profit ${money(profit)} a month. A partnership with a written deed suits their small, low-risk start-up; a company can come later.`,
    hints: ["Add the start-up costs, then subtract the savings.", "Profit = revenue − (fixed costs + variable costs)."],
  });

  // Essay 1 (20 marks): role of the enterpriser and drivers.
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 1500, paper: "Paper 2",
    concepts: ["bus.enterprise.role-drivers", "bus.enterprise.entrepreneurship"],
    stem: "Answer both parts.",
    parts: [
      P.manual({
        label: "(a)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 },
        stem: "Explain the role of an enterpriser in an enterprise.",
        points: [
          ["Scanning the environment to find needs, gaps and threats", 2],
          ["Identifying business opportunities customers will pay for", 2],
          ["Mobilising resources: capital, premises, equipment, labour, information", 2],
          "Allocating resources to avoid waste (1)",
          "Setting up the business: form, registration, licences, launch (1)",
          ["Managing: planning, organising, leading, controlling", 2],
        ],
        levels: L10,
        modelAnswer: "The enterpriser first scans the environment, studying customers, competitors, prices, technology and government policy to find gaps in the market and threats to avoid. From this the enterpriser identifies an opportunity: a need that customers will pay for and that the enterpriser can meet. Next, the enterpriser mobilises resources, raising capital from savings, family or loans, finding premises and equipment, recruiting workers with the right skills and gathering information and licences. These resources are limited, so the enterpriser allocates them carefully, for example deciding how much to spend on stock rather than equipment, to avoid waste. The enterpriser then sets up the business, choosing the form of ownership, registering it and launching the product. Finally, the enterpriser manages the business: planning targets, organising work, leading and motivating staff, keeping records and controlling cash, and looking for opportunities to grow.",
      }),
      P.manual({
        label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 },
        stem: "Evaluate the drivers towards enterprising in Zimbabwe.",
        points: [
          "Government policies: youth/women loans, SME workspace, training, simpler registration (1)",
          "Developed: lower cost and risk of starting (1)",
          "Demographic and economic change: young population, urbanisation, unemployment, retrenchments (1)",
          "Developed: pushes people into self-employment / new demand in towns (1)",
          "Self-actualisation: wish for independence and fulfilment (1)",
          "Community enterprising heroes: role models, mentoring (1)",
          "Evaluation: push drivers create many small, similar businesses (1)",
          "Evaluation: drivers work together; finance and skills turn push into growth (1)",
          ["Justified judgement on the most important driver", 2],
        ],
        levels: L10,
        modelAnswer: "Government policies encourage enterprise through youth and women's loan schemes, SME workspace, training and simpler registration, which lower the cost and risk of starting. Demographic and economic changes are powerful: a young, growing urban population creates demand for food, transport and services, while unemployment and retrenchments push many people into self-employment. Self-actualisation drives some people who want independence and to use their talents, and community enterprising heroes inspire young people and often mentor them. Push drivers such as unemployment create very many small, similar businesses that struggle to grow, whereas pull drivers such as role models and support lead to stronger ones. The drivers work together. Economic change is probably the strongest driver in Zimbabwe because so many people need an income, but government support and role models decide whether those enterprises grow.",
      }),
    ],
    explanation: "(a) The six roles in order, each explained. (b) The four drivers explained and weighed, with a justified judgement.",
    hints: ["(a) Follow the roles from idea to running business.", "(b) Explain each driver, then judge which matters most."],
  });

  // Essay 2 (20 marks): planning process and business plan.
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 1500, paper: "Paper 2",
    concepts: ["bus.enterprise.planning-process", "bus.enterprise.business-plan"],
    stem: "Answer both parts.",
    parts: [
      P.manual({
        label: "(a)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 },
        stem: "Describe the steps in the business planning process.",
        points: [
          "Environmental analysis: internal strengths/weaknesses and external opportunities/threats (1)",
          "Purpose: destiny (vision), cause (need served) and calling (passion) (1)",
          "Objective setting: SMART targets (1)",
          "Options generation (1)",
          "Options evaluation against criteria and selection (1)",
          "Implementation: action plan, tasks, people, deadlines, resources (1)",
          "Review: compare actual results with targets (1)",
          "Control: corrective action; feeds next plan (1)",
        ],
        levels: L8,
        modelAnswer: "Planning begins with environmental analysis, often a SWOT analysis of the business's strengths and weaknesses and the opportunities and threats it faces. The enterprise then defines its purpose: its destiny (where it wants to be in the future), its cause (the need it serves) and its calling (the founders' passion). Next it sets SMART objectives, such as selling 500 units a month by June. Planners generate several options for reaching the objectives, evaluate them against criteria such as cost, demand, risk and skills, and select the best. The chosen option is implemented through an action plan listing tasks, responsible people, deadlines and resources. Finally, results are reviewed against the targets and controlled: differences are investigated and corrected, and the lessons feed into the next round of planning.",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", wordLimit: { max: 500 },
        stem: "A youth group wants a loan to start a poultry project. Evaluate the importance of a business plan to the group.",
        points: [
          "Needed to obtain the loan: lender judges repayment (1)",
          "Financial plan shows start-up costs, finance needed, profit and cash flow (1)",
          "Market research tests demand for chickens and eggs locally (1)",
          "Reduces risk: problems such as feed costs and disease identified in advance (1)",
          "Sets objectives and assigns roles among group members (1)",
          "Guides decisions and allows monitoring of actual against planned results (1)",
          "Communicates with suppliers, buyers and supporters (1)",
          "Limitation: forecasts may be wrong (prices, disease) (1)",
          "Limitation: takes time and skill; plan must be updated (1)",
          "Limitation: a plan does not guarantee success (1)",
          ["Justified conclusion", 2],
        ],
        levels: L12,
        modelAnswer: "For the youth group, a business plan is essential to obtain the loan, because the lender will judge from its forecasts whether the project can repay. The financial plan shows the cost of housing, chicks and feed, how much must be borrowed and the expected profit and cash flow. Writing the market research section forces the group to check that local buyers will take their chickens and eggs, and planning reveals risks such as rising feed prices and disease in advance, so they can budget for vaccines. The plan sets objectives and gives each member a role, and once the project starts it lets them compare actual sales and costs with the plan. However, forecasts may be wrong if feed prices rise or disease strikes, writing a good plan takes time and skill, and a plan alone does not guarantee success. Overall the plan is very important: without it the group would not get the loan and would face avoidable risks, but it must be reviewed regularly.",
      }),
    ],
    explanation: "(a) The planning steps in order. (b) The plan's importance for finance, risk, objectives and monitoring, weighed against its limitations.",
    hints: ["(a) Start with analysis, end with review and control.", "(b) Consider the lender and the group, then the limits of a plan."],
  });
});
