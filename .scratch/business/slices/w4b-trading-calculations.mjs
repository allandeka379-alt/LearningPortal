// W4b: ZIMSEC Commerce business calculations (6.6.9, Form 4): turnover, cost of goods sold, profit, stock turn,
// mark-up and margin. Every figure is computed below.
import { concept, P, money, fmt, r2, round, table, f } from "../lib.mjs";

concept("bus.finance.trading-calculations", { file: "finance/trading-calculations", keyPrefix: "finance.trading-calculations" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "How is the cost of goods sold calculated?",
    options: [
      ["Opening stock + purchases − closing stock", "Correct: goods available for sale less those still unsold."],
      ["Opening stock + closing stock − purchases", "The stocks and purchases are in the wrong places."],
      ["Turnover − purchases − closing stock", "Turnover is a selling-price figure; it is not used here."],
      ["Purchases + closing stock − opening stock", "This adds closing stock instead of subtracting it."],
    ],
    answer: "A",
    explanation: "Cost of goods sold = opening stock + purchases − closing stock.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Mark-up is gross profit expressed as a percentage of:",
    options: [
      ["the cost price", "Correct: mark-up is added to cost."],
      ["the selling price", "Gross profit as a percentage of selling price is the margin."],
      ["the net profit", "Net profit is not used in mark-up."],
      ["the average stock", "Average stock is used in the rate of stock turnover."],
    ],
    answer: "A",
    explanation: "Mark-up = gross profit ÷ cost of goods sold × 100.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A trader's opening stock was US\\$2,000 and closing stock US\\$3,000. The cost of goods sold was US\\$15,000. What is the rate of stock turnover?",
    options: [
      ["6 times", "Correct: average stock = 2,500 and 15,000 ÷ 2,500 = 6."],
      ["3 times", "This divides by the total of the two stocks without halving it."],
      ["7.5 times", "This divides by the opening stock only, not the average stock."],
      ["5 times", "This divides by the closing stock only, not the average stock."],
    ],
    answer: "A",
    explanation: "Rate of stock turnover = cost of goods sold ÷ average stock = 15,000 ÷ 2,500 = 6 times.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A shop buys a kettle for US\\$40 and sells it for US\\$50. What is the margin?",
    options: [
      ["20%", "Correct: profit 10 ÷ selling price 50 × 100."],
      ["25%", "That is the mark-up: profit ÷ cost price."],
      ["10%", "US\\$10 is the profit in dollars, not a percentage."],
      ["80%", "That is cost as a percentage of selling price."],
    ],
    answer: "A",
    explanation: "Margin = 10 ÷ 50 × 100 = 20%. The mark-up is 10 ÷ 40 × 100 = 25%.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A trader adds a mark-up of 25% to all goods. What is the margin?",
    options: [
      ["20%", "Correct: 25 ÷ 125 × 100 = 20%."],
      ["25%", "Margin is always less than mark-up when there is a profit."],
      ["33.3%", "That would be the mark-up for a margin of 25%."],
      ["75%", "This subtracts the mark-up from 100."],
    ],
    answer: "A",
    explanation: "Margin = mark-up ÷ (100 + mark-up) × 100 = 25 ÷ 125 × 100 = 20%.",
    hints: ["Take the cost as 100. What is the selling price?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", daily: true,
    stem: "A grocer's rate of stock turnover has fallen from 12 times to 8 times a year. What does this show?",
    options: [
      ["Stock is selling more slowly than before", "Correct: average stock is replaced fewer times a year."],
      ["The grocer's net profit has definitely risen", "Stock turn alone does not show profit."],
      ["Stock is now selling faster than before", "A lower rate means slower selling."],
      ["The grocer now holds no stock at all", "A rate of 8 times shows stock is still held."],
    ],
    answer: "A",
    explanation: "A lower rate of stock turnover means stock stays longer on the shelves; cash is tied up and goods may spoil.",
    hints: ["What does 'times a year' measure?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which business is likely to have the **highest** rate of stock turnover?",
    options: [
      ["A bakery selling fresh bread", "Correct: bread is sold and replaced daily."],
      ["A furniture showroom selling beds", "Furniture sells slowly, so its rate is low."],
      ["A jewellery shop", "Jewellery sells slowly at high mark-ups."],
      ["A car dealer", "Cars are expensive and sell slowly."],
    ],
    answer: "A",
    explanation: "Perishable, low-priced, frequently bought goods have a very high rate of stock turnover.",
    hints: ["Which goods must be sold quickly?"],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which action would help a trader to **increase** the rate of stock turnover?",
    options: [
      ["Holding a sale to clear slow-moving goods", "Correct: stock sells faster and less is held."],
      ["Buying much larger quantities of every item", "More stock held lowers the rate."],
      ["Raising the prices of goods that sell slowly", "Higher prices usually slow sales further."],
      ["Reducing advertising and window displays", "Less promotion usually means slower sales."],
    ],
    answer: "A",
    explanation: "Promotions, clearance sales, smaller and more frequent orders and stocking popular goods raise the rate.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Turnover is US\\$30,000, gross profit is US\\$9,000 and expenses are US\\$4,000. What is the net profit?",
    options: [
      ["US\\$5,000", "Correct: 9,000 − 4,000."],
      ["US\\$26,000", "This subtracts expenses from turnover, ignoring cost of goods sold."],
      ["US\\$21,000", "That is the cost of goods sold (30,000 − 9,000)."],
      ["US\\$13,000", "This adds expenses to gross profit."],
    ],
    answer: "A",
    explanation: "Net profit = gross profit − expenses = US\\$5,000.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "For the same goods, the margin is always smaller than the mark-up.",
    answer: true,
    explanation: "True. Both use the same gross profit, but margin divides by the larger selling price.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The rate of stock turnover is calculated by dividing turnover by average stock.",
    answer: false,
    explanation: "False. Stock is valued at cost, so use cost of goods sold ÷ average stock.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each calculation with its formula.",
    pairs: [
      ["Gross profit", "Turnover − cost of goods sold"],
      ["Net profit", "Gross profit − expenses"],
      ["Average stock", "(Opening stock + closing stock) ÷ 2"],
      ["Margin", "Gross profit ÷ turnover × 100"],
      ["Mark-up", "Gross profit ÷ cost of goods sold × 100"],
    ],
    explanation: "Learn these five formulas; they appear in almost every business-calculations question.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentence.",
    template: "The rate of stock turnover is measured in {{blank:a}}, while mark-up and margin are measured as {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["times"], choices: ["times", "dollars", "percentages", "units"] },
      { id: "b", accepted: ["percentages"], choices: ["percentages", "times", "dollars", "days"] },
    ],
    explanation: "Stock turn is a number of times a period; mark-up and margin are percentages.",
  });
  // Numerical items.
  const o1 = 4400, p1 = 25600, c1 = 3600;
  const cos1 = f.costOfSales(o1, p1, c1), avg1 = f.averageStock(o1, c1), rst1 = f.rateOfStockTurnover(cos1, o1, c1);
  b.num({
    d: 2, skill: "APPLICATION", kind: "times", dp: 1, value: rst1, daily: true,
    stem: `A hardware shop had opening stock of ${money(o1)} and closing stock of ${money(c1)}. Its cost of goods sold for the year was ${money(cos1)}. Calculate the rate of stock turnover, to one decimal place.`,
    wrong: [round(avg1 / cos1, 2), round(cos1 / o1, 1)],
    explanation: `Average stock = (${fmt(o1)} + ${fmt(c1)}) ÷ 2 = ${fmt(avg1)}; rate = ${fmt(cos1)} ÷ ${fmt(avg1)} = ${round(rst1, 1)} times.`,
  });
  const cost2 = 64, mu2 = 35;
  const sp2 = r2(cost2 * (1 + mu2 / 100));
  b.calc({
    d: 2, skill: "APPLICATION", kind: "money", value: sp2,
    stem: `A shoe shop buys a pair of shoes for ${money(cost2)} and adds a mark-up of ${mu2}%. Calculate the selling price.`,
    wrong: [r2(cost2 / (1 - mu2 / 100)), r2((cost2 * mu2) / 100)],
    explanation: `Mark-up = ${mu2}% × ${fmt(cost2)} = ${fmt(r2((cost2 * mu2) / 100))}; selling price = ${money(sp2)}.`,
    workedSolution: `1. Mark-up in dollars = ${mu2} ÷ 100 × ${fmt(cost2)} = ${fmt(r2((cost2 * mu2) / 100))}.\n2. Selling price = ${fmt(cost2)} + ${fmt(r2((cost2 * mu2) / 100))} = ${money(sp2)}.`,
  });
  const g3 = 40;
  b.calc({
    d: 4, skill: "APPLICATION", kind: "pct", value: f.markUpFromMargin(g3),
    stem: `A trader works on a margin of ${g3}%. Calculate the equivalent mark-up, to one decimal place.`,
    wrong: [g3, round(f.marginFromMarkUp(g3), 1)],
    explanation: `Selling price 100, profit ${g3}, cost ${100 - g3}; mark-up = ${g3} ÷ ${100 - g3} × 100 = ${round(f.markUpFromMargin(g3), 1)}%.`,
    workedSolution: `1. Take the selling price as 100: gross profit = ${g3}, cost = ${100 - g3}.\n2. Mark-up = ${g3} ÷ ${100 - g3} × 100 = ${round(f.markUpFromMargin(g3), 1)}%.`,
    hints: ["Take the selling price as 100.", "Mark-up divides profit by cost."],
  });
  const t4 = 45000, m4 = 32;
  const gp4 = r2((t4 * m4) / 100), cos4 = t4 - gp4;
  b.calc({
    d: 4, skill: "APPLICATION", kind: "money", value: cos4, calculator: true,
    stem: `A clothing shop's turnover for the year was ${money(t4)} and it works on a margin of ${m4}%. Calculate the cost of goods sold.`,
    wrong: [gp4, r2(t4 / (1 + m4 / 100))],
    explanation: `Gross profit = ${m4}% × ${fmt(t4)} = ${fmt(gp4)}; cost of goods sold = ${fmt(t4)} − ${fmt(gp4)} = ${money(cos4)}.`,
    workedSolution: `1. Margin is a percentage of turnover: gross profit = ${m4}% × ${fmt(t4)} = ${fmt(gp4)}.\n2. Cost of goods sold = turnover − gross profit = ${fmt(t4)} − ${fmt(gp4)} = ${money(cos4)}.`,
    hints: ["Margin is based on turnover (selling price).", "Find gross profit first."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Explain **two** ways a retailer could increase its rate of stock turnover.",
    points: [
      "Way 1, e.g. sales promotion / advertising / price reductions (1)",
      "Explained: more customers buy, so stock sells faster (1)",
      "Way 2, e.g. buy smaller quantities more often / stock only popular lines / clear slow-moving goods (1)",
      "Explained: average stock falls, so the rate rises; less money tied up (1)",
    ],
    modelAnswer: "The retailer could advertise and run special offers, so more customers buy and goods leave the shelves faster. It could also order smaller quantities more often and stop stocking slow-selling lines, so average stock falls and the rate of stock turnover rises.",
    explanation: "Either sell faster (promotion, price, display) or hold less stock (smaller, more frequent orders).",
    hints: ["Rate = cost of goods sold ÷ average stock: raise the top or lower the bottom."],
  });
  // Structured 1: full calculation set.
  const s = { open: 6200, purch: 41400, close: 5800, turnover: 56000, exp: 8300 };
  const cosS = f.costOfSales(s.open, s.purch, s.close), gpS = s.turnover - cosS, npS = gpS - s.exp;
  const avgS = f.averageStock(s.open, s.close), rstS = f.rateOfStockTurnover(cosS, s.open, s.close);
  const muS = f.markUp(gpS, cosS), mgS = f.grossMargin(gpS, s.turnover);
  const tS = table(["Item for the year", "US\\$"], [["Opening stock", s.open], ["Purchases", s.purch], ["Closing stock", s.close], ["Turnover (sales)", s.turnover], ["Expenses", s.exp]]);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, secs: 900, calculator: true,
    stem: `Farai owns a wholesale grocery business in Mutare. The following figures relate to the year.\n\n${tS}`,
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "money", value: cosS, stem: "Calculate the cost of goods sold.", wrong: [s.purch], explanation: `${fmt(s.open)} + ${fmt(s.purch)} − ${fmt(s.close)} = ${money(cosS)}.` }),
      P.num({ label: "(b)", marks: 1, kind: "money", value: gpS, stem: "Calculate the gross profit.", wrong: [s.turnover - s.purch], explanation: `${fmt(s.turnover)} − ${fmt(cosS)} = ${money(gpS)}.` }),
      P.num({ label: "(c)", marks: 1, kind: "money", value: npS, stem: "Calculate the net profit.", wrong: [s.turnover - s.exp], explanation: `${fmt(gpS)} − ${fmt(s.exp)} = ${money(npS)}.` }),
      P.num({ label: "(d)", marks: 2, type: "CALCULATION", kind: "times", dp: 1, value: rstS, stem: "Calculate the rate of stock turnover, to one decimal place.", wrong: [round(s.turnover / avgS, 1)], explanation: `Average stock = (${fmt(s.open)} + ${fmt(s.close)}) ÷ 2 = ${fmt(avgS)}; ${fmt(cosS)} ÷ ${fmt(avgS)} = ${round(rstS, 1)} times.` }),
      P.num({ label: "(e)", marks: 2, type: "CALCULATION", kind: "pct", value: muS, stem: "Calculate the mark-up, to one decimal place.", wrong: [round(mgS, 1)], explanation: `${fmt(gpS)} ÷ ${fmt(cosS)} × 100 = ${round(muS, 1)}%.` }),
      P.num({ label: "(f)", marks: 2, type: "CALCULATION", kind: "pct", value: mgS, stem: "Calculate the margin, to one decimal place.", wrong: [round(muS, 1)], explanation: `${fmt(gpS)} ÷ ${fmt(s.turnover)} × 100 = ${round(mgS, 1)}%.` }),
      P.manual({ label: "(g)", marks: 3, stem: "Last year Farai's rate of stock turnover was 9 times. Explain what the change shows and suggest **one** action he could take.", points: [`Rate has fallen (to ${round(rstS, 1)} times): stock is selling more slowly (1)`, "Effect: more cash tied up in stock / risk of goods expiring (1)", "Action, e.g. promotions / smaller, more frequent orders / drop slow lines (1)"] }),
    ],
    explanation: `Cost of goods sold ${money(cosS)}; gross profit ${money(gpS)}; net profit ${money(npS)}; stock turn ${round(rstS, 1)} times; mark-up ${round(muS, 1)}%; margin ${round(mgS, 1)}%.`,
    workedSolution: `1. Cost of goods sold = ${fmt(s.open)} + ${fmt(s.purch)} − ${fmt(s.close)} = ${fmt(cosS)}.\n2. Gross profit = ${fmt(s.turnover)} − ${fmt(cosS)} = ${fmt(gpS)}; net profit = ${fmt(gpS)} − ${fmt(s.exp)} = ${fmt(npS)}.\n3. Average stock = ${fmt(avgS)}; rate = ${fmt(cosS)} ÷ ${fmt(avgS)} = ${round(rstS, 1)} times.\n4. Mark-up = ${fmt(gpS)} ÷ ${fmt(cosS)} × 100 = ${round(muS, 1)}%; margin = ${fmt(gpS)} ÷ ${fmt(s.turnover)} × 100 = ${round(mgS, 1)}%.`,
    hints: ["Work in order: cost of goods sold first.", "Mark-up divides by cost; margin by turnover."],
  });
  // Structured 2: pricing with mark-up, margin and discounts.
  const c5 = 120, mu5 = 50;
  const sp5 = c5 * (1 + mu5 / 100), mg5 = f.marginFromMarkUp(mu5);
  const units5 = 40;
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 720, calculator: true,
    stem: `Thandeka sells solar lanterns from a shop in Victoria Falls. Each lantern costs her ${money(c5)} and she adds a mark-up of ${mu5}%. A rival shop sells the same lantern for ${money(165)}.`,
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", kind: "money", value: sp5, stem: "Calculate Thandeka's selling price for one lantern.", wrong: [c5 + mu5], explanation: `${fmt(c5)} + ${mu5}% × ${fmt(c5)} = ${money(sp5)}.` }),
      P.num({ label: "(b)", marks: 2, type: "CALCULATION", kind: "pct", value: mg5, stem: "Calculate her margin, to one decimal place.", wrong: [mu5], explanation: `${fmt(sp5 - c5)} ÷ ${fmt(sp5)} × 100 = ${round(mg5, 1)}%.` }),
      P.num({ label: "(c)", marks: 2, type: "CALCULATION", kind: "money", value: units5 * (165 - c5), stem: `If she cut her price to match the rival, calculate her total gross profit on ${units5} lanterns.`, wrong: [units5 * (sp5 - c5)], explanation: `${units5} × (${fmt(165)} − ${fmt(c5)}) = ${money(units5 * (165 - c5))}.` }),
      P.manual({ label: "(d)", marks: 4, stem: "Discuss whether Thandeka should cut her price to match the rival.", points: ["Lower price may raise sales and the rate of stock turnover (1)", `But gross profit per lantern falls from ${money(sp5 - c5)} to ${money(165 - c5)} (1)`, "She needs enough extra sales to make up the lower profit per unit / other factors: service, location, tourists (1)", "Justified conclusion (1)"] }),
    ],
    explanation: `Selling price ${money(sp5)}; margin ${round(mg5, 1)}%; at ${money(165)} gross profit per lantern falls to ${money(165 - c5)}.`,
    hints: ["Mark-up is a percentage of cost.", "Margin = profit ÷ selling price × 100."],
  });
  b.card("FORMULA", "Cost of goods sold", "Opening stock + purchases − closing stock.");
  b.card("FORMULA", "Gross and net profit", "Gross profit = turnover − cost of goods sold; net profit = gross profit − expenses.");
  b.card("FORMULA", "Average stock", "(Opening stock + closing stock) ÷ 2.");
  b.card("FORMULA", "Rate of stock turnover", "Cost of goods sold ÷ average stock (answer in times).");
  b.card("FORMULA", "Mark-up", "Gross profit ÷ cost of goods sold × 100.");
  b.card("FORMULA", "Margin", "Gross profit ÷ turnover (selling price) × 100.");
  b.card("FORMULA", "Converting mark-up and margin", "Margin = mark-up ÷ (100 + mark-up) × 100; mark-up = margin ÷ (100 − margin) × 100.");
  b.card("CONCEPT", "Interpreting stock turnover", "Higher rate: stock sells faster, less cash tied up, fresher goods. Improve by promotion, clearance sales, smaller frequent orders.");
  b.card("FACT", "Mark-up v margin", "Same gross profit; margin divides by the larger selling price, so the margin is always smaller.");
});
