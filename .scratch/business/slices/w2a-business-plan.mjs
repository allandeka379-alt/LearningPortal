// W2a: the business plan, with a simple financial forecast (COM, BES, CAM).
import { concept, P, f, money, fmt, sum, r2, table, check, BES } from "../lib.mjs";

concept("bus.enterprise.business-plan", { file: "enterprise/business-plan", keyPrefix: "enterprise.business-plan" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which section of a business plan gives a short overview of the whole plan?",
    options: [
      ["Executive summary", "Correct: it lets a reader grasp the idea quickly."],
      ["Financial plan", "This contains forecasts and finance needed."],
      ["Operations plan", "This covers premises, equipment and production."],
      ["Market analysis", "This covers customers and competitors."],
    ],
    answer: "A",
    explanation: "The executive summary comes first and summarises the idea, objectives, market, finance needed and expected profit.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which section would you find a forecast of sales, costs and profit?",
    options: [
      ["Financial plan", "Correct: it contains the financial forecasts."],
      ["Business background", "This describes the owners and the business."],
      ["Products or services", "This describes what will be sold."],
      ["Management and people", "This covers managers and staff."],
    ],
    answer: "A",
    explanation: "The financial plan shows start-up costs, sources of finance and forecasts of revenue, costs, profit and cash flow.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the **main** reason a bank asks for a business plan before lending?",
    options: [
      ["To judge whether the loan can be repaid", "Correct: the plan shows forecast profit and cash."],
      ["To decide the owner's tax rate", "Tax rates are not set by banks."],
      ["To register the business as a company", "Registration is done by the Registrar."],
      ["To advertise the business to customers", "A business plan is not an advert."],
    ],
    answer: "A",
    explanation: "Lenders use the plan's forecasts and market evidence to judge the risk and the ability to repay.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a **limitation** of a business plan?",
    options: [
      ["Its forecasts may turn out to be wrong", "Correct: forecasts are estimates."],
      ["It helps the owner set objectives", "This is a benefit."],
      ["It helps the business obtain finance", "This is a benefit."],
      ["It allows actual results to be compared with targets", "This is a benefit."],
    ],
    answer: "A",
    explanation: "Forecasts are estimates; conditions change, so the plan must be reviewed. A plan does not guarantee success.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A plan states: \"A survey of 120 households found that 70% buy bread daily and the nearest bakery is 4 km away.\" Which section does this belong in?",
    options: [
      ["Market research and analysis", "Correct: survey evidence about customers and competitors."],
      ["Operations plan", "Operations covers premises and production."],
      ["Executive summary", "The summary would only mention the conclusion briefly."],
      ["Management and people", "This covers staff and managers."],
    ],
    answer: "A",
    explanation: "Survey results about customers and competitors belong in market research and analysis.",
    hints: ["Where does evidence about customers go?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why should a business compare its actual results with the forecasts in its plan?",
    options: [
      ["To spot problems early and take action", "Correct: the plan becomes a control tool."],
      ["To make the forecasts more accurate after the event", "Changing the forecasts does not fix problems."],
      ["Because the law requires it every day", "There is no such legal requirement."],
      ["To avoid paying tax on profits", "Comparison does not affect tax."],
    ],
    answer: "A",
    explanation: "Comparing actual with planned results shows where the business is falling short so that action can be taken.",
    hints: ["What is a plan for once the business starts?"],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A business plan is only useful for obtaining a bank loan.",
    answer: false,
    explanation: "False. It also helps the owner think things through, set objectives, guide decisions and monitor performance.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The financial plan should include a cash flow forecast as well as a forecast of profit.",
    answer: true,
    explanation: "True. Profit does not show whether there will be enough cash each month to pay bills.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each piece of information with the section of the business plan where it belongs.",
    pairs: [
      ["Rent, equipment and suppliers for the workshop", "Operations plan"],
      ["Price, advertising and where products will be sold", "Marketing plan"],
      ["Qualifications of the owner and two supervisors", "Management and people"],
      ["Start-up costs and the loan required", "Financial plan"],
    ],
    explanation: "Each section answers a different question a reader will ask.",
  });
  b.fib({
    d: 2,
    stem: "Complete the formulas used in a financial plan.",
    template: "Contribution per unit = selling price − {{blank:a}} cost per unit. Break-even output = {{blank:b}} costs ÷ contribution per unit.",
    blanks: [
      { id: "a", accepted: ["variable"], choices: ["variable", "fixed", "total", "average"] },
      { id: "b", accepted: ["fixed"], choices: ["fixed", "variable", "total", "average"] },
    ],
    explanation: "Contribution = price − variable cost per unit; break-even output = fixed costs ÷ contribution per unit.",
  });
  b.short({
    d: 2,
    stem: "Name the section of a business plan that describes the owners, the location and the form of ownership.",
    accepted: ["business background", "organisational background", "background", "the business background", "organizational background", "company background"],
    wrong: ["executive summary", "financial plan"],
    explanation: "The **business (organisational) background** section.",
  });
  // Financial forecasts (different figures from the lesson's worked examples).
  const price = 2.5, vc = 1.5, fixed = 2400;
  const cpu = r2(f.contribution(price, vc));
  const be = f.breakEvenOutput(fixed, price, vc);
  // Profit item uses a different business so no two items share figures.
  const p2 = 3.2, v2 = 1.8, fx2 = 2800, s2 = 2500;
  const rev = r2(f.revenue(p2, s2));
  const tc = r2(f.totalCost(fx2, f.totalVariableCost(v2, s2)));
  const profit = r2(f.profit(rev, tc));
  check("profit via contribution", profit, (p2 - v2) * s2 - fx2);
  b.num({
    d: 2, skill: "APPLICATION", kind: "units", value: be, calculator: true, daily: true,
    stem: `A planned juice business will sell bottles at ${money(price)} each. Variable cost is ${money(vc)} a bottle and fixed costs are ${money(fixed)} a month. Calculate the break-even output per month.`,
    wrong: [fixed / price, fixed / vc],
    explanation: `Contribution = ${fmt(price)} − ${fmt(vc)} = ${money(cpu)}; break-even = ${fmt(fixed)} ÷ ${fmt(cpu)} = ${fmt(be)} bottles.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: profit, calculator: true,
    stem: `Tatenda's business plan for a car-wash forecasts ${fmt(s2)} washes a month at ${money(p2)} each. Variable cost is ${money(v2)} a wash and fixed costs are ${money(fx2)} a month. Calculate the forecast monthly profit.`,
    wrong: [r2(rev - v2 * s2), r2(rev - fx2)],
    explanation: `Revenue = ${fmt(s2)} × ${fmt(p2)} = ${money(rev)}. Total costs = ${fmt(fx2)} + ${fmt(s2)} × ${fmt(v2)} = ${money(tc)}. Profit = ${fmt(rev)} − ${fmt(tc)} = ${money(profit)}.`,
    hints: ["Revenue = price × quantity.", "Total costs = fixed costs + variable cost per unit × quantity."],
  });
  {
    const items = [["Industrial blender", 1850], ["Bottles and labels (first batch)", 620], ["Cool box and stand", 480], ["Market licence", 150]];
    const total = sum(items.map((x) => x[1])), own = 1700, gap = r2(total - own);
    b.calc({
      d: 3, skill: "APPLICATION", kind: "money", value: gap, calculator: true, applies: BES,
      stem: `Nyasha's mini business plan lists these start-up costs:\n\n${table(["Start-up cost", "US\\$"], items)}\n\nShe has ${money(own)} of her own money. Calculate the amount she must raise from other sources.`,
      wrong: [total, r2(total - own - 150)],
      explanation: `Total = ${items.map((x) => fmt(x[1])).join(" + ")} = ${money(total)}; needed = ${fmt(total)} − ${fmt(own)} = ${money(gap)}.`,
      hints: ["Add all the start-up costs first.", "Subtract the money she already has."],
    });
  }
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why a business plan is important to an entrepreneur.",
    points: [
      "Reason 1, e.g. needed to obtain finance (1)",
      "Explained, e.g. banks and investors judge repayment from forecasts (1)",
      "Reason 2, e.g. reduces risk / sets objectives / monitors performance (1)",
      "Explained, e.g. research reveals problems before money is spent / actual results compared with targets (1)",
    ],
    modelAnswer: "A business plan helps the entrepreneur obtain finance, because lenders use its forecasts to judge whether a loan can be repaid. Writing it also reduces risk, because researching the market and costs reveals problems before any money is spent.",
    explanation: "Give reasons from the owner's point of view, not only the bank's.",
    hints: ["Think about finance and about planning."],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 900, calculator: true,
    stem: "Rudo plans a phone-accessory stall in Chinhoyi. Her plan forecasts selling 900 items a month at an average price of US\\$4. Variable cost averages US\\$2.50 an item and fixed costs (stall rent, licence, loan repayment) are US\\$1,080 a month. Her executive summary says: \"Profitable from month 1.\"",
    parts: [
      P.num({
        label: "(a)", marks: 1, kind: "money", value: 4 - 2.5,
        stem: "Calculate the contribution per item.",
        wrong: [4, 2.5],
        explanation: "4.00 − 2.50 = US\\$1.50.",
      }),
      P.num({
        label: "(b)", marks: 2, kind: "units", value: f.breakEvenOutput(1080, 4, 2.5),
        stem: "Calculate the break-even output per month.",
        wrong: [1080 / 4, 1080 / 2.5],
        explanation: "1,080 ÷ 1.50 = 720 items.",
      }),
      P.num({
        label: "(c)", marks: 2, kind: "money", value: f.profit(f.revenue(4, 900), f.totalCost(1080, 2.5 * 900)),
        stem: "Calculate the forecast monthly profit at 900 items.",
        wrong: [900 * 4 - 1080, 900 * 1.5],
        explanation: "Revenue 3,600 − total costs (1,080 + 2,250 = 3,330) = US\\$270.",
      }),
      P.manual({
        label: "(d)", marks: 6, type: "EXTENDED_RESPONSE",
        stem: "A bank officer reads Rudo's plan. Evaluate how far the plan supports the claim \"Profitable from month 1.\"",
        points: [
          "Forecast profit of US\\$270 supports the claim if 900 items are sold (1)",
          "Margin of safety 180 items: sales can fall 20% before a loss (1)",
          "But 900 sales in month 1 is optimistic for a new stall with no customers (1)",
          "Forecast depends on market research evidence in the plan (1)",
          "Bank would want a cash flow forecast too (1)",
          "Justified judgement (1)",
        ],
        modelAnswer: "The figures give a profit of US\\$270 at 900 items, and break-even is 720 items, so sales could fall by 180 items (20%) before a loss. But a new stall rarely sells at its full level in month 1, and the claim depends on how good her market research is. The bank should also see a cash flow forecast. The claim is possible but optimistic; profit is more likely after a few months.",
      }),
    ],
    explanation: "Contribution US\\$1.50; break-even 720 items; forecast profit US\\$270. The claim depends on reaching 900 sales immediately.",
    hints: ["Contribution = price − variable cost.", "Break-even = fixed costs ÷ contribution."],
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 720, applies: BES,
    stem: "Form 3 pupils at a school in Gweru are writing a mini business plan to sell freshly made popcorn at sports events. They will sell 300 packets per event at US\\$0.50, and each packet costs US\\$0.20 to make.",
    parts: [
      P.num({
        label: "(a)", marks: 2, kind: "money", value: r2(300 * (0.5 - 0.2)),
        stem: "Calculate the profit per event, ignoring fixed costs.",
        wrong: [300 * 0.5, r2(300 * 0.2)],
        explanation: "300 × (0.50 − 0.20) = 300 × 0.30 = US\\$90.",
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "List **four** items the pupils' mini business plan should include.",
        points: ["Idea and objectives (1)", "Market: customers and competitors (1)", "Resources and tasks (who does what) (1)", "Finance: costs, revenue, profit / timeline (1)"],
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain **two** ways writing the plan will help the project succeed.",
        points: ["Way 1: forces them to research demand at events (1)", "Developed: avoids making too much popcorn (1)", "Way 2: assigns tasks and deadlines / sets targets (1)", "Developed: everyone knows their job; progress can be checked (1)"],
      }),
    ],
    explanation: "Profit per packet US\\$0.30, so US\\$90 per event before any fixed costs. A plan clarifies market, tasks and finance.",
    hints: ["Profit per packet = price − cost per packet."],
  });
  b.card("DEFINITION", "Business plan", "A written document describing a business, its objectives, market and strategies, with financial forecasts.");
  b.card("DEFINITION", "Executive summary", "Short overview at the start of a plan: idea, objectives, market, finance needed, expected profit.");
  b.card("FACT", "Sections of a business plan", "Executive summary, background, products, market analysis, marketing, operations, management and people, financial plan.");
  b.card("CONCEPT", "Why a business plan matters", "Obtain finance, think things through, set objectives, guide decisions, monitor performance.");
  b.card("CONCEPT", "Limitations of a business plan", "Forecasts may be wrong, conditions change, takes time and skill, no guarantee of success.");
  b.card("FORMULA", "Contribution per unit", "Selling price − variable cost per unit.");
  b.card("FORMULA", "Break-even output", "Fixed costs ÷ contribution per unit.");
  b.card("FORMULA", "Profit", "Revenue − total costs (total costs = fixed costs + total variable costs).");
  b.card("CONCEPT", "Financial plan contents", "Start-up costs, sources of finance, forecast income statement (profit), cash flow forecast, break-even.");
});
