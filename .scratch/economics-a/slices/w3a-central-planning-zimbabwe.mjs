// W3a: central planning and economic decision-making in Zimbabwe (ZIMSEC only, Form 6; factual and neutral).
import { concept, P, chk, table, fmt, round, pieAngles } from "../lib.mjs";
import { mc, LV5, LV8, LV12 } from "../tables/w3a-kit.mjs";

concept("aecon.intervention.central-planning-zimbabwe", { file: "intervention/central-planning-zimbabwe", keyPrefix: "intervention.central-planning-zimbabwe" }, (b) => {
  mc(b, [1, "RECALL"], "In a centrally planned economy, resources are mainly allocated by",
    ["a state planning authority", "Correct: planners decide what is produced and for whom."],
    [["the price mechanism acting on supply and demand", "That describes a market economy."], ["households acting as independent consumers", "Households may buy, but they do not allocate resources in a plan."], ["private firms competing with each other for profit", "That describes market competition."]],
    "A central planning authority, not prices, allocates resources in a planned economy.");

  mc(b, [2, "UNDERSTANDING"], "Which of the following is a recognised strength of central planning?",
    ["It can direct resources to national priorities such as basic services", "Correct: planners can mobilise resources for chosen aims."],
    [["It provides detailed price signals about scarcity", "Price signals are a feature of markets, not of planning."], ["It gives managers strong incentives to innovate and to reduce production costs", "Weak incentives are a typical weakness of planning."], ["It responds quickly to changes in consumer demand", "Planning is usually slow to respond."]],
    "Directing resources to national priorities and basic needs is a strength of planning.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "The information problem in central planning refers to the difficulty that",
    ["planners cannot collect all the information that prices carry", "Correct: millions of decisions cannot be co-ordinated centrally without prices."],
    [["consumers have too little information about the plan", "The problem concerns the planners' information."], ["firms cannot read the government's published budget", "The problem is not about reading budgets."], ["there is too much information on the internet for students", "This is unrelated to economic planning."]],
    "Without prices, planners lack the dispersed information needed to allocate resources efficiently.");

  mc(b, [2, "UNDERSTANDING"], "Which statement best describes the economy of Zimbabwe?",
    ["A mixed economy with both state and private decision-makers", "Correct: private and public decision-makers coexist."],
    [["A pure command economy in which the state takes all production decisions", "Most production is carried out by private households, firms and farmers."], ["A pure market economy with no role for government planning", "The government uses plans, budgets and regulations."], ["A traditional economy based only on custom and barter", "Modern markets and money are widely used."]],
    "Zimbabwe is a mixed economy; plans and budgets guide the public sector while private agents take most production decisions.");

  mc(b, [3, "UNDERSTANDING"], "Which is the main way in which a medium-term national development plan is turned into spending on projects?",
    ["The annual budget", "Correct: the budget allocates money each year to implement the plan."],
    [["The exchange rate announced by commercial banks", "The exchange rate does not allocate public spending."], ["The stock market's daily prices for company shares", "Share prices do not allocate the public budget."], ["The profits earned by private farmers in a season", "Private profits are not a way of financing the plan."]],
    "The annual budget allocates revenue to the priorities set out in the plan.", { hints: ["What document sets out the government's spending for a year?"] });

  mc(b, [3, "APPLICATION"], "In a plan, the output target for electricity is 8,000 GWh and the actual output is 7,200 GWh. Actual output as a percentage of the target is",
    ["90%", "Correct: 7,200 ÷ 8,000 × 100 = 90."],
    [["10%", "That is the shortfall as a percentage of the target, not the achievement."], ["111%", "That divides the target by the actual output."], ["800%", "That confuses the GWh shortfall with a percentage."]],
    "7,200 ÷ 8,000 × 100 = 90%, a shortfall of 10%.", { hints: ["Divide actual by target."], calculator: true });

  mc(b, [3, "EVALUATION"], "A planner sets a fixed price for bread below the equilibrium price. Which outcome is most likely?",
    ["Queues and a black market, as demand exceeds supply", "Correct: a binding maximum price causes a shortage."],
    [["A surplus of bread, because suppliers expand output", "A price below equilibrium reduces supply."], ["No change, because planners can set prices at any level", "Setting a price does not make people supply more."], ["A fall in demand, because consumers want less bread", "A lower price raises quantity demanded."]],
    "A price fixed below equilibrium leads to excess demand, queues and illegal trading.", { hints: ["Compare quantity demanded and supplied at a price below equilibrium."] });

  mc(b, [3, "ANALYSIS"], "Which of these would most weaken the success of a national development plan in a mixed economy?",
    ["Output targets that are not matched by funds in the annual budget", "Correct: a plan without finance cannot be carried out."],
    [["A budget that is debated and approved by Parliament each year", "Parliamentary approval gives accountability, not weakness."], ["A set of clearly stated priorities for each sector of the economy", "Clear priorities help the plan."], ["Regular monitoring of results by the planning authority and ministries", "Monitoring improves a plan."]],
    "A plan needs financing; targets without budget support are unlikely to be met.", { hints: ["What does a plan need to be carried out?"] });

  {
    const t = 320, a = 256;
    chk(a / t * 100, 80);
    b.num({ d: 2, skill: "APPLICATION", kind: "pct", value: a / t * 100, dp: 1, calculator: true, daily: true,
      stem: "A plan sets a target for tea of 320 thousand tonnes. The actual harvest is 256 thousand tonnes. Calculate actual output as a percentage of the target, to one decimal place.",
      wrong: [20, 125, 64], explanation: "256 ÷ 320 × 100 = 80.0%. (20% is the shortfall; 125% divides target by actual.)" });
    const bud = [["Education", 3.9], ["Health", 2.1], ["Infrastructure", 2.7]];
    const tot = 15.0, ang = pieAngles([3.9, 2.1, 2.7, tot - 3.9 - 2.1 - 2.7]);
    chk(2.1 / tot * 100, 14); chk(ang[1], 50.4);
    b.num({ d: 3, skill: "APPLICATION", kind: "plain", value: ang[1], dp: 1, calculator: true, hints: ["Angle = allocation ÷ total × 360."],
      stem: "A fictional budget totals US\\$15.0 billion. Health receives US\\$2.1 billion. In a pie chart of the budget, what angle (in degrees) represents health, to one decimal place?",
      wrong: [14, 2.1, 126], explanation: "Share = 2.1 ÷ 15.0 = 14%. Angle = 0.14 × 360 = 50.4 degrees. (14 is the percentage, not the angle.)" });
    b.num({ d: 2, skill: "APPLICATION", kind: "pct", value: 3.9 / tot * 100, dp: 1, calculator: true,
      stem: "In the same budget of US\\$15.0 billion, education receives US\\$3.9 billion. What percentage of the budget is spent on education?",
      wrong: [3.9, 38.5, 74], explanation: "3.9 ÷ 15.0 × 100 = 26.0%." });
    const diff = 690 - 600;
    b.calc({ d: 3, skill: "APPLICATION", kind: "pct", value: 690 / 600 * 100 - 100, dp: 1, calculator: true, hints: ["Over-fulfilment = (actual − target) ÷ target × 100."],
      stem: "A plan targets 600 thousand tonnes of steel and the actual output is 690 thousand tonnes. By what percentage did output exceed the target, to one decimal place?",
      wrong: [115, 13, 87], explanation: "1. Excess = 690 − 600 = 90 thousand tonnes.\n2. Excess as a percentage of the target = 90 ÷ 600 × 100 = 15.0%. (115% is actual as a percentage of target.)" });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "In indicative planning, firms are legally forced to meet the output targets set by the government.", answer: false,
    explanation: "False. Indicative planning sets targets and gives incentives and information, but firms are not compelled." });
  b.tf({ d: 3, skill: "EVALUATION", hints: ["Does a plan replace the whole market in a mixed economy?"], stem: "A national development plan means that the government makes all production decisions in an economy.", answer: false,
    explanation: "False. In a mixed economy the plan guides public spending and priorities, but private households, firms and farmers take most production decisions." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term with its meaning.",
    pairs: [["Central planning", "The state authority sets targets and allocates resources"], ["Indicative planning", "Targets and incentives that private firms are not compelled to follow"], ["National development plan", "A medium-term statement of priorities and targets"], ["Budget", "The annual plan of government revenue and spending"]],
    explanation: "Each term refers to a different part of planning and public decision-making." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "A central planner lacks the {{blank:a}} that prices provide, so shortages and {{blank:b}} are likely.",
    blanks: [{ id: "a", accepted: ["information"], choices: ["information", "workers", "taxes"] }, { id: "b", accepted: ["surpluses"], choices: ["surpluses", "profits", "competition"] }],
    explanation: "Prices carry information about scarcity; without them targets can be wrong, producing shortages and surpluses." });

  b.short({ d: 2, skill: "RECALL", stem: "Name the document in which the Minister of Finance presents the government's planned revenue and spending for the year to Parliament.",
    accepted: ["budget statement", "the budget statement", "budget", "the budget", "national budget", "budget speech"], wrong: ["development plan"],
    explanation: "The Budget Statement (the national budget)." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Distinguish between a national development plan and the annual budget.",
    points: ["A national development plan sets medium-term priorities and targets.", "The annual budget allocates actual revenue and spending for one year, which implements the plan."],
    modelAnswer: "A national development plan sets medium-term priorities and targets for the economy, while the annual budget allocates the actual revenue and spending for one year, which is how the plan is carried out.",
    explanation: "One mark for the medium-term plan and one for the annual budget." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Think about information and incentives."],
    stem: "Explain two weaknesses of central planning.",
    points: ["Information problem: planners cannot collect and process the information on costs and preferences that prices give.", "So targets may be wrong, leading to shortages of some goods and surpluses of others.", "Weak incentives: managers and workers do not gain from higher efficiency or innovation.", "So productivity and quality may be low."],
    modelAnswer: "Planners cannot collect and process all the information on costs and consumer preferences that prices give automatically, so their targets may be wrong and shortages of some goods and surpluses of others result. In addition, managers and workers may not gain from working harder or innovating, so productivity and quality may be low.",
    explanation: "Two weaknesses, each with a development." });
  b.manualShort({ d: 4, skill: "UNDERSTANDING", marks: 5, hints: ["Use the stages of the budget cycle in order."],
    stem: "Describe the main stages of the annual budget process in Zimbabwe.",
    points: ["Preparation: the Ministry of Finance sets ceilings and ministries submit spending requests.", "Consultation with stakeholders such as business, labour and parliamentary committees.", "Cabinet approval of the proposals.", "Presentation of the Budget Statement to Parliament, followed by debate and approval of the appropriation and finance legislation.", "Implementation by ministries with funds released by the Treasury, followed by audit and review."],
    modelAnswer: "The Ministry of Finance prepares the budget by setting spending ceilings, and ministries submit their requests. Business, labour and parliamentary committees are consulted. Cabinet approves the proposals, and the Minister of Finance presents the Budget Statement to Parliament, which debates it and passes the legislation that authorises spending and sets taxes. The Treasury then releases funds to ministries to carry out the programmes, and the accounts are audited and reviewed.",
    explanation: "Preparation, consultation, Cabinet, Parliament, implementation and audit." });

  {
    const items = [["Wheat (thousand tonnes)", 250, 190], ["Sugar (thousand tonnes)", 420, 441], ["Fertiliser (thousand tonnes)", 160, 112], ["Water supply (million cubic metres)", 300, 270]];
    const pc = items.map(([, t, a]) => a / t * 100);
    chk(pc[0], 76); chk(pc[1], 105); chk(pc[2], 70); chk(pc[3], 90);
    const t1 = table(["Item (Country Y plan)", "Target", "Actual"], items.map(([n, t, a]) => [n, t, a]));
    b.struct({ d: 3, skill: "ANALYSIS", examStyle: true, calculator: true, hints: ["Actual as a percentage of target = actual ÷ target × 100.", "Think about how shortfalls in one item affect others."],
      stem: `**A plan for a fictional economy (illustrative data)**\n\nThe planning commission of Country Y sets annual targets for four items. Fertiliser is needed by the wheat and sugar farms, and water is needed for fertiliser production.\n\n${t1}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "pct", value: pc[2], dp: 1, stem: "Calculate fertiliser output as a percentage of its target, to one decimal place.", wrong: [30, 142.9, 48], explanation: "112 ÷ 160 × 100 = 70.0%." }),
        P.num({ label: "(b)", marks: 1, kind: "plain", value: items[1][2] - items[1][1], stem: "By how many thousand tonnes did sugar output exceed its target?", unit: "tonnes", wrong: [5, 21.0, 441], explanation: "441 − 420 = 21 thousand tonnes." }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain how the shortfall in fertiliser might affect other items in the plan.",
          points: ["Fertiliser is an input into wheat and sugar farming.", "Less fertiliser means lower yields, so wheat output may fall short of the target (76% achieved).", "Targets in a plan are linked, so a failure in one sector spreads to others and lowers national output."],
          modelAnswer: "Fertiliser is an input into wheat and sugar farming. With less fertiliser than planned, yields may fall, which helps to explain why wheat reached only 76% of its target. Because targets in a plan depend on one another, a shortfall in one sector spreads to others and lowers national output." }),
        P.manual({ label: "(d)", marks: 4, stem: "Discuss whether a market system would have co-ordinated the production of fertiliser and wheat better than the plan.",
          points: ["In a market, rising prices for fertiliser would signal scarcity and encourage firms to supply more.", "Farmers would economise on fertiliser or switch crops in response to price signals.", "But a market may not provide infrastructure such as water supplies, or may leave poor farmers unable to afford inputs.", "A judgement: prices are a good guide for ordinary inputs, but some co-ordination or support may be needed."],
          modelAnswer: "In a market, a shortage of fertiliser would raise its price, which would encourage firms to produce more and farmers to economise or switch crops, so production could be co-ordinated through prices instead of by planners. However, a market might not provide water infrastructure, and poor farmers might not be able to afford the higher prices. Overall, prices are a good guide for ordinary inputs such as fertiliser, but some public co-ordination or support may still be needed for infrastructure and for poor farmers." }),
      ],
      explanation: "Fertiliser 70.0% of target; sugar 21 thousand tonnes above; shortfall in an input spreads; markets use prices but infrastructure and equity need public action." });
  }
  {
    const lines = [["Education", 3.9], ["Health", 2.1], ["Infrastructure", 2.7], ["Debt service", 1.5], ["Other", 4.8]];
    const tot = lines.reduce((s, x) => s + x[1], 0); chk(tot, 15);
    const t1 = table(["Spending area", "Allocation (US\\$ billion)"], lines.map(([n, v]) => [n, fmt(v, 1)]));
    b.struct({ d: 4, skill: "EVALUATION", examStyle: true, calculator: true, hints: ["Share = allocation ÷ total × 100.", "Think about opportunity cost."],
      stem: `**The budget of Country Y (illustrative data)**\n\nThe Minister of Finance of a fictional country presents the budget to Parliament. The government's national plan lists improving rural roads, health care and schools as its main aims. Revenue is expected to be US\\$13.5 billion, so there is a deficit.\n\n${t1}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "pct", value: 2.7 / 15 * 100, dp: 1, stem: "Calculate the share of the budget allocated to infrastructure, to one decimal place.", wrong: [2.7, 18.5, 20], explanation: "2.7 ÷ 15.0 × 100 = 18.0%." }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: 15 - 13.5, dp: 1, unit: "US$ billion", stem: "Calculate the budget deficit, in US\\$ billion.", wrong: [28.5, 13.5, 2.5], explanation: "Spending 15.0 − revenue 13.5 = US\\$1.5 billion." }),
        P.manual({ label: "(c)", marks: 2, stem: "Explain what is meant by the opportunity cost of spending more on health in this budget.",
          points: ["The other uses of the money (for example education or roads) that have to be given up.", "Because the budget is limited, more for health means less for another area, or more borrowing."],
          modelAnswer: "The opportunity cost is the next best use of the money that is given up, such as spending on roads or schools, because the budget is limited. More for health means less for another area unless the government borrows more." }),
        P.manual({ label: "(d)", marks: 4, stem: "Assess how far an annual budget like this can achieve the aims of a national plan.",
          points: ["The budget allocates money to the plan's aims (health, schools and roads receive US\\$8.7 billion).", "But the deficit and debt service limit the funds available, so not every target can be met.", "Most production is by the private sector, so results also depend on incentives and the business environment, not just on public spending.", "A judgement: the budget is the main tool for the plan's public programmes, but success depends on realistic targets, finance and private response."],
          modelAnswer: "The budget directs US\\$8.7 billion to the plan's aims of health, schools and roads, so it is the main tool for carrying out its public programmes. However, a deficit of US\\$1.5 billion and debt service of US\\$1.5 billion limit the money available, so not every target can be met. Most production is carried out by private firms and farmers, so success also depends on incentives and the business environment. Overall the budget can achieve the public part of the plan if the targets are realistic and financed, but it cannot by itself deliver the whole plan." }),
      ],
      explanation: "Infrastructure 18.0%; deficit US\\$1.5 billion; opportunity cost; the budget implements the public part of a plan." });
  }

  b.ext({ d: 5, skill: "EVALUATION", marks: 12, hints: ["Give both sides.", "Apply to a mixed economy such as Zimbabwe.", "Reach a justified judgement."],
    stem: "Discuss the extent to which resources in an economy such as Zimbabwe should be allocated by central planning rather than by the price mechanism.",
    points: ["Central planning can direct resources to national priorities and provide basic services to all.", "Planning can co-ordinate large infrastructure projects that private firms would not undertake.", "Prices give signals about scarcity and preferences that planners cannot easily collect.", "Without price signals, planned economies tend to have shortages, surpluses and waste.", "Incentives: markets reward efficiency and innovation; plans may weaken incentives.", "Markets fail for public goods, externalities and merit goods, which is where planning and public provision are strongest.", "Markets may produce unequal outcomes, so the state may plan the supply of basic needs.", "Planning needs institutions with capacity to collect data, set realistic targets and monitor results.", "Plans must be financed through a budget that is credible and consistent.", "The informal sector and private farmers make many decisions that the plan cannot control.", "Different groups hold different views on how far the state should direct the economy.", "A justified judgement, such as a mixed system with planning for public goods and prices for ordinary markets."],
    levels: LV12,
    modelAnswer: "Central planning allows the state to direct resources to national priorities, provide basic services to everyone and co-ordinate large infrastructure projects that private firms would not undertake. However, planners cannot easily collect the information that prices give automatically about scarcity and preferences, so shortages, surpluses and waste are likely, and weak incentives can reduce efficiency and innovation. Markets, on the other hand, fail for public goods, externalities and merit goods, and may leave unequal outcomes, which is where planning and public provision are strongest. Planning also needs institutions able to collect data, set realistic targets and finance them in a credible budget, and in an economy with a large informal sector and many private farmers the plan cannot control all decisions. Different groups hold different views about how far the state should direct the economy. Overall, a mixed approach seems best: planning and public spending for public goods, infrastructure and basic needs, with prices guiding ordinary goods and services, and the balance adjusted to the capacity of institutions.",
    wordLimit: { min: 150, max: 400 },
    explanation: "Weigh planning's strengths in public goods and equity against information and incentive problems; mixed economy judgement." });

  b.card("DEFINITION", "Define **central planning**.", "Allocation of resources by a state planning authority using targets, quotas and fixed prices, instead of the price mechanism.");
  b.card("CONCEPT", "Give two strengths of central planning.", "It can direct resources to national priorities and basic needs, and co-ordinate large projects such as infrastructure.");
  b.card("CONCEPT", "Give three weaknesses of central planning.", "The information problem, no price signals (shortages and surpluses), weak incentives; also rigidity and black markets.");
  b.card("DEFINITION", "Define **indicative planning**.", "Planning in a mixed economy in which targets and incentives guide private decisions, without compelling firms to follow them.");
  b.card("CONCEPT", "What type of economy is Zimbabwe?", "A mixed economy: the state sets plans and budgets and runs some enterprises, while most production decisions are taken by private households, firms and farmers.");
  b.card("CONCEPT", "What is the difference between a national plan and the budget?", "The plan sets medium-term priorities and targets; the annual budget allocates the money for one year to carry them out.");
  b.card("CONCEPT", "List the main stages of the annual budget cycle.", "Preparation (Ministry of Finance), consultation, Cabinet approval, presentation to and approval by Parliament, implementation, audit and review.");
  b.card("FORMULA", "How do you calculate actual output as a percentage of a target?", "Actual ÷ target × 100.");
  b.card("FORMULA", "How do you find a pie chart angle for a budget item?", "Allocation ÷ total × 360 degrees.");
});
