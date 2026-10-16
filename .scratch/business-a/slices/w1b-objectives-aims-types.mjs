// W1b: objectives.aims-types
import { concept, P, chk, money, pctChange, ZIM } from "../lib.mjs";
import { mc } from "../tables/w1b-lib.mjs";

concept("abus.objectives.aims-types", { file: "objectives/aims-types", keyPrefix: "objectives.aims-types" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of these is the best description of a **mission statement**?",
    ok: ["A statement of the overall purpose and values of the organisation", "Correct: it says what the organisation is for."],
    bad: [["A forecast of next year's profit and sales figures for each department", "Forecasts are targets or budgets, not a mission."], ["A list of the daily tasks that each worker in a department must carry out", "That is a job description."], ["A plan of the advertising and promotion for a new product launch", "That belongs to the marketing plan and tactics."]],
    explanation: "The mission statement sets out why the business exists and the values that guide it.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which objective is most likely to be the **main** aim of a newly opened tuck shop in a recession?",
    ok: ["Survival", "Correct: a new firm must first cover costs to stay open."],
    bad: [["Profit maximisation", "A new firm in a recession is unlikely to find the maximum profit."], ["Market leadership", "Leadership is a later, growth objective."], ["Overseas expansion", "Expanding abroad is unrealistic for a new tuck shop."]],
    explanation: "Survival is the usual first objective of new and small businesses.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which statement is an **objective** rather than an aim?",
    ok: ["Raise yearly sales by 12% within two years", "Correct: it is measurable and has a time limit."],
    bad: [["Become a respected brand in the district", "That is a broad, long-term aim."], ["Be a good employer to local families", "That is a general aim with no measure."], ["Offer the best quality in the market", "That is a general aim; it has no target figure."]],
    explanation: "Objectives are specific and measurable; aims are broad and long term.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Which organisation is **most likely** to have a service objective as its main purpose?",
    ok: ["A government-owned clinic in a rural district", "Correct: public-sector bodies exist to provide a service to the public."],
    bad: [["A private company that sells mining equipment", "A private company aims mainly at profit and growth."], ["A newly formed private taxi business", "A new taxi business seeks survival and profit."], ["A shop owned by one trader to earn a living", "A trader mainly seeks income and profit."]],
    explanation: "Public-sector organisations are mainly service providers.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional tour operator in Victoria Falls cuts its prices sharply to gain customers from rivals. Which objective is it pursuing, and what is the main risk?",
    ok: ["Market share; profit may fall because each sale earns less", "Correct: lower prices raise share but reduce the margin on every sale."],
    bad: [["Profit maximisation; costs will rise because prices fall", "Cutting prices is not a profit-maximising move, and prices do not raise costs."], ["Survival; the firm will certainly gain customers", "No firm can be sure that lower prices will win customers."], ["Social responsibility; the firm has no risk at all", "Price cutting is a commercial move, and every strategy carries risk."]],
    hints: ["Think about what a price cut does to the amount earned on each sale."],
    explanation: "Price cutting to win customers is a market-share objective whose risk is lower profit.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "A firm's directors set a target of 15% profit growth while its managers want to spend more on staff training. What does this show?",
    ok: ["A possible conflict, because training raises costs in the short run", "Correct: spending on training reduces profit in the short run."],
    bad: [["A legal constraint, because the law makes staff training compulsory for all firms", "Nothing in the case says that the law requires the training."], ["A change of mission, because the firm has become a social enterprise", "Wanting training does not change the firm's mission."], ["Proof that the profit objective is unrealistic and must be dropped at once", "Conflict does not by itself prove the objective is unrealistic."]],
    hints: ["Does training cost money now, and when does it pay back?"],
    explanation: "Higher training costs lower profit now, so the profit and development objectives conflict.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which is a **benefit** to a business of accepting corporate social responsibility?",
    ok: ["It may improve the firm's reputation and the loyalty of customers", "Correct: a good image can attract customers and staff."],
    bad: [["It always raises profit in the first year of adopting it", "CSR often adds costs and may not raise profit at once."], ["It removes the need to obey the law", "A firm must always obey the law; CSR goes beyond it."], ["It guarantees that no pressure group will criticise the firm", "Pressure groups may still criticise a firm that practises CSR."]],
    hints: ["Which option is a possible gain rather than a certainty?"],
    explanation: "CSR can improve reputation and loyalty, but it usually adds costs and guarantees nothing.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which conclusion is the **best-supported** judgement on whether a profitable firm should focus only on profit?",
    ok: ["Not necessarily: profit alone may harm its reputation and survival", "Correct: it recognises the trade-off and links to long-term outcomes."],
    bad: [["Yes, because shareholders never care about anything else except profit", "Many shareholders also value reputation and long-term returns."], ["No, because profit is never important to a business of any kind", "Without profit most firms cannot survive."], ["Yes, because social goals are always illegal for a private-sector firm", "Social goals are not illegal; the claim is false."]],
    hints: ["Choose the answer that gives a balanced view with a reason."],
    explanation: "A judgement should recognise both profit and social goals and give a reason about the long term.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A social enterprise trades to meet a social or environmental aim and reinvests most of its profit in that aim.",
    answer: true,
    explanation: "True. Social enterprises trade like businesses but their main purpose is social or environmental benefit.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "All private-sector firms have profit maximisation as their only objective.",
    answer: false,
    explanation: "False. Private firms also seek survival, growth, market share and social goals, and many are content with a satisfactory profit.",
    hints: ["Think of a small firm trying to survive in a recession."],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term to its meaning.",
    pairs: [["Mission statement", "The purpose and values of the organisation"], ["Objective", "A specific, measurable target with a time limit"], ["Strategy", "The long-term plan for achieving the objectives"], ["Tactics", "Short-term actions that carry out the strategy"]],
    explanation: "These form the hierarchy from the purpose of the business to its day-to-day actions.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "The triple bottom line judges a business on its {{blank:a}}, social and {{blank:b}} results.",
    blanks: [
      { id: "a", accepted: ["economic"], choices: ["economic", "political", "technical"] },
      { id: "b", accepted: ["environmental"], choices: ["environmental", "legal", "financial"] },
    ],
    explanation: "The three results are economic, social and environmental.",
  });

  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "State the name of the objective in which a firm tries to increase its percentage of total sales in a market.",
    accepted: ["market share", "increase market share", "growth in market share"],
    explanation: "A market share objective aims at a larger percentage of the total market.",
  });

  {
    const oldS = 180000, newS = 207000;
    const g = pctChange(oldS, newS);
    chk(g, 15, 1e-9);
    b.num({
      d: 2, skill: "APPLICATION", daily: true,
      stem: `A fictional bakery sold goods worth ${money(oldS)} last year and sets itself an objective of ${money(newS)} next year. What percentage increase in sales does the objective require? Give your answer to one decimal place.`,
      kind: "pct", value: g, wrong: [(newS - oldS) / newS * 100, (newS / oldS) * 100],
      explanation: `The increase is ${newS} − ${oldS} = ${newS - oldS}. Percentage change = ${newS - oldS} ÷ ${oldS} × 100 = 15.0%. Dividing by the new figure gives 13.0%.`,
    });
  }
  {
    const market = 640000, target = 25;
    const need = (market * target) / 100;
    chk(need, 160000, 1e-6);
    b.calc({
      d: 3, skill: "APPLICATION",
      stem: `A fictional dairy sets a market share objective of ${target}% in a local market worth ${money(market)} a year. What yearly sales does it need to reach the objective?`,
      kind: "money", value: need, wrong: [market * (1 - target / 100), market / target],
      hints: ["Market share is the firm's sales as a percentage of the market, so work backwards."],
      explanation: `Sales needed = 25% of 640,000 = 640,000 × 25 ÷ 100 = US\\$160,000. Taking 75% of the market gives US\\$480,000, which is the share of all other firms.`,
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING", applies: ZIM,
    stem: "In the ZIMSEC syllabus, which objectives are set by the directors and cover the long term for the whole organisation?",
    options: [["Strategic objectives", "Correct: they set the long-term direction of the organisation."], ["Tactical objectives", "Tactical objectives are medium-term and set by middle managers."], ["Operational objectives", "Operational objectives cover day-to-day work and are set by supervisors."], ["Constraints", "Constraints are limits on objectives, not a level of objective."]],
    answer: "A",
    explanation: "Strategic objectives are long term and set by the directors.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why objectives are important to a business.",
    points: ["They give direction and a common purpose to staff and managers", "They provide a standard against which performance is measured"],
    modelAnswer: "Objectives give the business a clear direction so that all staff work for the same purpose. They also provide a standard, so managers can compare results with the target and take action.",
    explanation: "Two reasons, each developed.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Farai has just opened a hardware shop in Masvingo. Explain **two** objectives that he is likely to set in the first year.",
    points: ["Survival: covering costs while customers learn about the shop", "Application: income must cover rent, wages and stock", "Building a customer base or market share in a new market", "Application: through low prices or good service to win first customers"],
    modelAnswer: "His first objective is probably survival, because the shop must earn enough to cover rent, wages and stock. He will also want to build a customer base by offering good service so that people in the town learn to use the shop.",
    hints: ["Think about what a new business needs before it can grow."],
    explanation: "Two objectives, each applied to the new shop.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse how a firm's objective of growth could conflict with its objective of high quality.",
    points: ["Growth means higher output and more staff or branches", "Rapid expansion can strain supervision and training", "Quality control may weaken, so defects or complaints rise", "Customers may leave, which harms reputation and growth"],
    modelAnswer: "Growth means producing more and recruiting staff quickly. If supervision and training do not keep pace, quality control weakens and more faulty goods reach customers. Complaints rise and customers leave, so the growth objective is damaged by the very expansion that was meant to achieve it.",
    hints: ["Follow what happens to supervision when a firm expands quickly."],
    explanation: "A chain from growth to weaker quality and back to customers.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 5,
    stem: "Assess whether a private-sector firm should pursue social and environmental objectives as well as profit.",
    points: ["Benefits: better reputation, loyal customers, easier recruitment", "Benefits: fewer conflicts with pressure groups and regulators", "Costs: higher expenses that may reduce profit or raise prices", "Small or struggling firms may not be able to afford it", "Judgement with a reason or condition"],
    modelAnswer: "Social and environmental objectives improve reputation, attract loyal customers and staff and reduce conflict with pressure groups. They also cost money, which may lower profit or raise prices. A firm that is losing money may not be able to afford them. On balance, a firm should pursue them where the cost is modest and the customers value it, and should first make sure that the business survives.",
    hints: ["Weigh the benefits against the costs and say what the choice depends on."],
    explanation: "Both sides and a conditional judgement.",
  });

  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "A fictional business: Rudo's Orchard (Mutare) sells fruit juice. The owner's mission is \"to bring healthy drinks to every household\". Last year sales were US\\$120,000. This year the objective is to raise sales by 20%. The strategy is to supply two supermarket chains, and this month's tactic is to design new labels.",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Which part of the statement is the tactic?", options: [["Designing new labels this month", "Correct: a short-term action."], ["Raising sales by 20%", "That is the objective."], ["Supplying two supermarket chains", "That is the long-term strategy."], ["Bringing healthy drinks to every household", "That is the mission."]], answer: "A", explanation: "The tactic is the immediate action." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the sales needed to meet the objective.", kind: "money", value: (120000 * 120) / 100, wrong: [24000, 100000], explanation: "20% of 120,000 = 24,000, so the target is 120,000 + 24,000 = US\\$144,000." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain **one** reason why the objective should be communicated to the workers.", points: ["Workers need to know what they are working towards", "Application: knowing the 20% target lets packers and drivers plan their effort", "Result: a shared target improves coordination and motivation"], modelAnswer: "Workers need to know the 20% target so that they understand what the business is trying to achieve. Packers and drivers can then plan their work to supply the supermarkets, and the shared target improves motivation.", explanation: "A reason, applied, with a result." }),
      P.manual({ label: "(d)", marks: 3, stem: "Assess whether survival could still be the more important objective for a small firm like this.", points: ["Survival is vital if cash is short or sales are uncertain", "Growth needs finance that a young firm may not have", "Judgement with a reason: survival comes first until the firm is secure"], modelAnswer: "If cash is short or the supermarkets do not renew orders, the firm could fail, so survival comes first. Growth needs money for stock and labels. Until the firm is secure, survival is more important than a 20% growth target.", hints: ["What happens to growth if the firm closes?"], explanation: "A reasoned judgement." }),
    ],
    hints: ["Match each statement to a step in the hierarchy."],
    explanation: "The tactic is identified, the target is calculated and communication and priorities are assessed.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "A fictional business: Chipo runs Sunrise Clinic (Gweru), a private health clinic. Her mission is \"quality care for all\". The accountant wants to raise fees by 30% to increase profit. Chipo also has a plan to offer free check-ups on Saturdays. The local council, which pays for some patients, warns that it may take its patients elsewhere if fees rise.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Identify **two** different objectives shown in the case.", points: ["Profit (raising fees to increase profit)", "A social or service objective (free check-ups, quality care for all)"], modelAnswer: "Profit, shown by the plan to raise fees, and a social or service objective, shown by the free check-ups.", explanation: "One mark for each objective." }),
      P.manual({ label: "(b)", marks: 4, stem: "Analyse how the two objectives conflict.", points: ["Higher fees raise income per patient", "Higher fees may make care unaffordable, against the mission of care for all", "Free check-ups cost staff time and supplies with no income", "The council's threat shows lost patients could lower profit too"], modelAnswer: "Higher fees raise income per patient but make care less affordable for poorer patients, which conflicts with the mission of care for all. Free check-ups cost staff time and supplies without income. If the council takes its patients away, profit could fall in spite of the higher fees.", hints: ["Look at what each plan does to income and to patients."], explanation: "The conflict analysed with the case." }),
      P.manual({ label: "(c)", marks: 8, stem: "Evaluate how Chipo should decide between the two objectives.", points: ["Profit is needed for survival and investment in equipment", "A 30% rise may be too large and cause patients to leave", "Free check-ups build reputation and may bring paying patients", "The council is a stakeholder with influence on income", "Compromise: smaller rise or tiered fees", ["Recommendation that gives priority to one objective with a reason", 2], ["A condition or time-frame, such as review after six months", 1]], modelAnswer: "Profit is needed for equipment and for the clinic's survival, but a 30% rise is large and the council could remove its patients, which would reduce income. Free check-ups build reputation and may bring paying patients later, though they cost money now. A compromise such as a smaller fee rise combined with fewer free sessions would protect both income and mission. Chipo should give priority to the mission of care for all as long as income covers costs, and review the position after six months.", hints: ["Compare the plans, bring in the council and end with a recommendation and a condition."], explanation: "Both objectives weighed, a compromise considered and a recommendation made.", levels: [[1, 1, 3, "Describes the objectives with little use of the case."], [2, 4, 6, "Applies the case and weighs both objectives."], [3, 7, 8, "A reasoned recommendation with a condition."]] }),
    ],
    hints: ["Use the case in every part."],
    explanation: "Objectives are identified, their conflict analysed and a decision evaluated.",
  });

  b.card("DEFINITION", "Mission statement", "A short statement of the overall purpose and values of an organisation.");
  b.card("DEFINITION", "Aim and objective", "An aim is a broad long-term goal. An objective is a specific, measurable target that normally has a time limit.");
  b.card("CONCEPT", "Hierarchy of goals", "Mission statement, aims, objectives, strategy, tactics: each level supports the one above.");
  b.card("CONCEPT", "Strategic, tactical and operational objectives", "Strategic: long term, set by directors. Tactical: medium term, set by middle managers. Operational: day to day, set by supervisors.", undefined, { applies: ZIM });
  b.card("FACT", "Common business objectives", "Survival, profit (and profit maximisation), growth, market share, social and environmental goals, and service.");
  b.card("DEFINITION", "Triple bottom line", "Judging a business on economic, social and environmental results, not only on profit.");
  b.card("CONCEPT", "Corporate social responsibility", "Acceptance by a firm of its duty to act in the interests of society. Benefits: reputation and loyalty. Costs: higher expenses.");
  b.card("CONCEPT", "Conflicts between objectives", "Profit against social goals, growth against quality, market share against margin: managers must prioritise.");
  b.card("FACT", "Why objectives change", "Stage of the business, changes in the economy, competition, technology or law, new owners or managers, and results against target.");
});
