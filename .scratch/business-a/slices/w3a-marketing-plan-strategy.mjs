// W3a: marketing.plan-strategy (Cambridge only, A Level)
import { concept, P, table, r2, pctChange, money, chk } from "../lib.mjs";
import { mc } from "../tables/w3a-lib.mjs";

concept("abus.marketing.plan-strategy", { file: "marketing/plan-strategy", keyPrefix: "marketing.plan-strategy" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of the following is normally included in a **marketing plan**?",
    ok: ["Objectives, target market, mix, budget and timetable", "Correct: these are the core sections of a plan."],
    bad: [["Only the names of the staff in the sales department", "A plan sets out actions, not just names."], ["The detailed final accounts for the previous five years", "Accounts are a different document."], ["The wages paid to every worker in the whole business", "Wages are not part of a marketing plan."]],
    explanation: "A plan sets out objectives, the target market, the mix, the budget, the timetable and how results will be checked.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What is the difference between a marketing **strategy** and marketing **tactics**?",
    ok: ["Strategy is long term; tactics are short-term actions", "Correct: tactics carry out the strategy."],
    bad: [["Strategy is short term; tactics are long-term plans", "This reverses the meaning of the terms."], ["Strategy concerns price only; tactics concern product", "Both cover the whole mix."], ["There is no difference, as the two terms mean the same thing", "The terms have different meanings."]],
    explanation: "A strategy is a long-term approach to achieve objectives; tactics are the short-term actions that carry it out.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is a **limitation** of a detailed marketing plan?",
    ok: ["It may become out of date if the market changes quickly", "Correct: plans rely on forecasts and can be inflexible."],
    bad: [["It prevents the business from setting a marketing budget", "A plan helps to set the budget."], ["It makes the objectives of the business less clear", "A plan makes objectives clearer."], ["It stops the departments from coordinating their work", "A plan helps coordination."]],
    explanation: "Plans use forecasts, so they can be wrong or inflexible when conditions change.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "A fictional luxury hotel in Victoria Falls wants to position itself as exclusive. Which set of marketing decisions would be MOST coordinated with this strategy?",
    ok: ["High price, quality service and selective advertising", "Correct: the mix supports an exclusive image."],
    bad: [["Low price, basic service and mass-market discounts", "This conflicts with an exclusive image."], ["High price, poor service and heavy discounts to all", "A high price with poor service and discounting is inconsistent."], ["Average price, no advertising and unreliable bookings", "No coordinated message is sent to the target market."]],
    explanation: "A premium strategy needs a premium product, price, promotion and place.",
  });
  const cur = 300000, tgt = 360000, bud = 36000;
  const share = (bud / tgt) * 100;
  chk(share, 10, 1e-9);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A marketing plan for a fictional bakery in Gweru has a budget of US\\$18,000 and a target sales figure of US\\$240,000. What percentage of target sales is the budget?",
    ok: ["7.5%", "Correct: 18,000 ÷ 240,000 × 100 = 7.5%."],
    bad: [["13.3%", "This divides the target by the budget."], ["75.0%", "This misplaces the decimal point."], ["1.3%", "This divides 18 by 1,440, not 240,000."]],
    hints: ["Budget ÷ target × 100."],
    explanation: "18,000 ÷ 240,000 × 100 = 7.5%.",
  });
  chk((18000 / 240000) * 100, 7.5, 1e-9);
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional small hardware shop in Chinhoyi has limited cash and sells to local builders. Which strategy is MOST consistent with its resources and market?",
    ok: ["Personal service and credit terms for the local builders", "Correct: it uses the shop's strengths at low cost."],
    bad: [["National television advertising to attract all households", "This is too costly and wasteful for a small local shop."], ["Opening ten new shops across Zimbabwe in a single year", "This is far beyond its resources."], ["Selling only to overseas buyers through an online shop", "This does not fit its local, small-scale business."]],
    hints: ["Match the strategy to the size of the business."],
    explanation: "A strategy must fit the business's resources, product and market.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A fictional online clothing shop uses AI to recommend items based on each customer's past purchases. What is the MOST likely benefit?",
    ok: ["Higher sales and loyalty from offers that fit each buyer", "Correct: personalisation targets individual tastes."],
    bad: [["No need for any data about customers, so lower costs overall", "Personalisation depends on customer data."], ["Guaranteed loyalty from every customer in the shop", "There is no guarantee of loyalty."], ["Lower costs because no software or skills are needed at all", "The software and skills are a cost."]],
    hints: ["What does the AI use to make recommendations?"],
    explanation: "Personalisation raises relevance, but needs data and software.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A fictional small tourist lodge is advised to spend half its marketing budget on a chatbot. Which judgement is BEST?",
    ok: ["Worth trying on routine questions if bookings rise by more than the cost", "Correct: it links the decision to costs and benefits."],
    bad: [["Always the best use of money, since technology can never fail", "Technology can fail and has costs."], ["A waste in every case, since customers never use any chatbots", "Many customers do use them."], ["Of no importance, since marketing never affects the bookings", "Marketing does affect bookings."]],
    hints: ["Which answer compares benefit with cost?"],
    explanation: "A sound judgement weighs the likely gain in bookings against the cost and the risk.",
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "A marketing strategy should be consistent with the business's objectives and resources.",
    answer: true,
    explanation: "True. A strategy that the business cannot afford or that conflicts with its image will fail.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Marketing tactics change less often than marketing strategy.",
    answer: false,
    explanation: "False. Tactics are short-term actions and change quickly; strategy is a long-term approach and changes slowly.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each AI or IT tool to its use in marketing.",
    pairs: [["Data analysis", "Finding buying patterns in sales and website data"], ["Personalisation", "Recommending products based on a customer's past purchases"], ["Automation", "Scheduling messages and reminders without manual effort"], ["Chatbot", "Answering simple customer questions at any hour"]],
    explanation: "Each tool saves time or improves targeting but has costs and limits.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "A marketing {{blank:a}} is the detailed document for a period, while a marketing {{blank:b}} is the long-term approach to reach the objectives.",
    blanks: [
      { id: "a", accepted: ["plan"], choices: ["plan", "strategy", "tactic"] },
      { id: "b", accepted: ["strategy"], choices: ["plan", "strategy", "tactic"] },
    ],
    explanation: "The plan sets out the actions, budget and timetable; the strategy is the broader approach.",
  });

  const budgetItems = [4000, 18000, 6000, 8000];
  const total = budgetItems.reduce((s, x) => s + x, 0);
  chk(total, 36000, 1e-9);
  b.num({
    d: 2, skill: "APPLICATION", kind: "pct", value: 25, calculator: true, daily: true, wrong: [20, 4],
    stem: "A fictional dairy plans to raise sales from US\\$400,000 to US\\$500,000. Calculate the percentage rise in sales required, to one decimal place.",
    hints: ["Rise ÷ original × 100."],
    explanation: "Rise = 100,000. 100,000 ÷ 400,000 × 100 = 25.0%. Dividing by the new figure gives 20.0%.",
  });
  chk(pctChange(400000, 500000), 25, 1e-9);
  const curB = 250000, tgtB = 300000, budB = 27000;
  const extraGp = (tgtB - curB) * 0.4;
  chk(extraGp, 20000, 1e-9);
  const yr1 = extraGp - budB;
  chk(yr1, -7000, 1e-9);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: -yr1, calculator: true, wrong: [extraGp, budB],
    stem: "A marketing plan for a fictional bakery chain in Mutare has a budget of US\\$27,000 and aims to raise sales from US\\$250,000 to US\\$300,000. Gross profit is 40% of sales. By how much does the budget exceed the extra gross profit in the first year? Give a positive amount in US dollars.",
    hints: ["Extra gross profit = 40% of the extra sales."],
    explanation: "Extra sales = 50,000. Extra gross profit = 40% × 50,000 = US\\$20,000. The budget of US\\$27,000 exceeds this by US\\$7,000. The plan makes a first-year loss of US\\$7,000, though repeat sales in later years may repay it.",
    workedSolution: "1. Extra sales = 300,000 − 250,000 = US\\$50,000.\n2. Extra gross profit = 40% × 50,000 = US\\$20,000.\n3. Budget − extra gross profit = 27,000 − 20,000 = US\\$7,000.",
  });
  const yr2 = 0.7 * (tgtB - curB) * 0.4;
  chk(yr2, 14000, 1e-9);
  b.num({
    d: 4, skill: "ANALYSIS", kind: "money", value: yr2, calculator: true, wrong: [20000, 0.7 * 27000],
    stem: "In the bakery plan above, 70% of the extra US\\$50,000 sales are repeated in the second year, with no further budget. Gross profit is 40%. Calculate the extra gross profit in the second year.",
    hints: ["Repeat sales first, then 40% of them."],
    explanation: "Repeat sales = 70% × 50,000 = US\\$35,000. Gross profit = 40% × 35,000 = US\\$14,000. This more than covers the first-year shortfall of US\\$7,000, leaving +US\\$7,000.",
  });

  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the short-term actions that put a marketing strategy into effect.",
    accepted: ["tactics", "marketing tactics", "tactic"],
    explanation: "Tactics.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain **one** benefit to a business of writing a marketing plan.",
    points: ["It sets clear, measurable objectives", "It coordinates the mix and the departments", "So effort and money are directed to the same goal and results can be checked"],
    modelAnswer: "A plan sets clear objectives and coordinates the mix and departments. This directs effort and money to the same goal and lets managers check results against targets.",
    hints: ["Think about direction, coordination and control."],
    explanation: "A benefit developed to its effect.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional bakery in Masvingo has a niche product (gluten-free bread) and limited cash. Explain **two** features that its marketing strategy should have.",
    points: ["It should target a clearly defined segment, such as people with dietary needs", "Application: promotion through clinics and social media groups reaches them cheaply", "It should be affordable and coordinated with the product", "Application: a high-quality, higher-priced product with careful packaging fits a niche"],
    modelAnswer: "The strategy should target a clearly defined segment, such as people with dietary needs, using cheap promotion through clinics and social media groups. It should also be coordinated and affordable: a high-quality product at a higher price with careful packaging fits a niche, so it need not copy mass-market advertising.",
    hints: ["Link the strategy to the size and niche."],
    explanation: "Two features, each applied.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse why a marketing strategy must be consistent with the product's stage in its life cycle.",
    points: ["A new product needs awareness and promotion", "A mature product needs defence of share and cost control", "A strategy for the wrong stage wastes money", "So sales or profit may fall short of the objective"],
    modelAnswer: "A new product needs heavy promotion to build awareness, while a mature product needs defence of its share and tight cost control. A strategy that suits the wrong stage wastes money, so sales or profit fall short of the objective.",
    hints: ["Compare the needs of a new and a mature product."],
    explanation: "Strategy should fit the stage of the product.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A fictional chain of six supermarkets plans to spend US\\$30,000 on AI to personalise offers for loyalty-card holders. Evaluate this decision.",
    points: ["Personalised offers can raise sales per customer and loyalty", "Analysis of data can improve stock decisions", "The cost of software and skilled staff is high", "Customers may object to the use of their data", "Benefit depends on the number of card holders and their spending", "Judgement with a condition, e.g. worthwhile if extra gross profit exceeds the cost within a reasonable time"],
    modelAnswer: "Personalised offers can raise sales per customer and loyalty, and the data can also improve stock decisions. However, US\\$30,000 plus skilled staff is a large cost, and customers may object to the use of their data. The benefit depends on how many card holders there are and how much they spend. The decision is worthwhile if the extra gross profit exceeds the cost within a reasonable time, so the chain should first test it in one or two stores.",
    hints: ["Weigh benefit and cost, then add a condition."],
    explanation: "A balanced judgement about AI in marketing.",
  });

  b.struct({
    d: 3, skill: "APPLICATION", calculator: true, examStyle: true,
    stem: "A fictional soap maker in Mutare has a marketing plan with these budget items for next year.\n\n" + table(["Item", "US\\$"], [["Market research", 2500], ["Promotion", 9000], ["Packaging redesign", 3500], ["Distribution", 5000]]) + "\n\nIts target sales for next year are US\\$250,000.",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: 20000, stem: "Calculate the total budget.", wrong: [15000, 17500], explanation: "2,500 + 9,000 + 3,500 + 5,000 = US\\$20,000." }),
      P.num({ label: "(b)", marks: 2, kind: "pct", value: 8, stem: "Calculate the budget as a percentage of target sales, to one decimal place.", wrong: [12.5, 80], explanation: "20,000 ÷ 250,000 × 100 = 8.0%." }),
      P.manual({ label: "(c)", marks: 2, stem: "State **two** limitations of this marketing plan for the business.", points: ["It relies on forecasts of sales that may be wrong", "It may be inflexible if the market changes during the year"], modelAnswer: "The plan relies on sales forecasts which may be wrong, and it may be inflexible if the market changes during the year.", explanation: "Two limitations of planning." }),
    ],
    hints: ["Add the items first."],
    explanation: "Budget US\\$20,000, which is 8.0% of target sales.",
  });
  chk(2500 + 9000 + 3500 + 5000, 20000, 1e-9);
  chk((20000 / 250000) * 100, 8, 1e-9);
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true,
    stem: "Read the extract. Sipho Safaris is a fictional tour operator in Victoria Falls. Its marketing plan aims to raise bookings by 30% in two years. The plan uses a new website with an AI chatbot, social media advertisements aimed at tourists aged 25 to 40 and a loyalty discount for repeat clients. The owner is worried that the plan costs a fifth of expected extra revenue and that staff do not understand the new system.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Explain **one** way in which the plan is consistent with the business's market.", points: ["The advertisements target a clear segment of tourists aged 25 to 40", "Tourists use social media and websites to choose operators", "So promotion reaches likely buyers at low waste"], modelAnswer: "The advertisements target tourists aged 25 to 40, a clear segment who use social media and websites to choose operators. Promotion therefore reaches likely buyers with little waste.", explanation: "The mix fits the target market." }),
      P.manual({ label: "(b)", marks: 6, stem: "Evaluate whether Sipho Safaris should go ahead with the plan.", points: ["A clear objective and a coordinated mix aimed at a target segment", "The chatbot gives quick answers and may increase bookings", "The loyalty discount encourages repeat clients", "Cost is a fifth of expected extra revenue, which reduces profit", "Staff do not understand the system, so errors and lost bookings are possible", "Judgement with reason, e.g. proceed with staff training and a review after six months"], modelAnswer: "The plan has a clear objective and a coordinated mix aimed at a target segment. The chatbot should answer enquiries quickly and the loyalty discount should bring repeat clients. However, the cost is a fifth of the expected extra revenue, which cuts profit, and untrained staff could cause errors and lost bookings. The owner should go ahead only with staff training and a review after six months to check that the extra bookings cover the cost.", explanation: "Benefits and risks of the plan, with a conditional judgement." }),
    ],
    hints: ["Compare the plan's aims with its cost and risks."],
    explanation: "The plan fits the target market but has a cost and a staff-training risk.",
  });

  b.card("DEFINITION", "Marketing plan", "A detailed document setting out objectives, target market, mix, budget and timetable for a period.");
  b.card("DEFINITION", "Marketing strategy", "A long-term approach for achieving marketing objectives, consistent with the business, product and market.");
  b.card("DEFINITION", "Marketing tactics", "Short-term actions that put the strategy into effect.");
  b.card("FACT", "Contents of a marketing plan", "Situation analysis, objectives, target market, mix, budget, timetable and control.");
  b.card("CONCEPT", "Benefits of a marketing plan", "Clear goals, coordination of the mix, budget basis, early problem spotting and a measure of results.");
  b.card("CONCEPT", "Limitations of a marketing plan", "Costly to prepare, based on forecasts, may be inflexible and may not be followed.");
  b.card("CONCEPT", "A coordinated strategy", "The four Ps support the same objective and positioning.");
  b.card("FACT", "IT and AI in marketing", "Data analysis, personalisation, automation and chatbots.");
  b.card("CONCEPT", "Limits of AI in marketing", "Cost, skills, data protection, and loss of the human touch.");
});
