// W4b: profitability ratios (COM 6.6.9, CAM 5.5.1): gross profit margin, profit margin, ROCE.
import { concept, P, money, fmt, round, table, f } from "../lib.mjs";

concept("bus.finance.profitability-ratios", { file: "finance/profitability-ratios", keyPrefix: "finance.profitability-ratios" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which formula gives the gross profit margin?",
    options: [
      ["Gross profit ÷ revenue × 100", "Correct: gross profit as a percentage of sales."],
      ["Gross profit ÷ cost of sales × 100", "That is the mark-up, not the margin."],
      ["Profit ÷ capital employed × 100", "That is the return on capital employed."],
      ["Revenue ÷ gross profit × 100", "The figures are the wrong way round."],
    ],
    answer: "A",
    explanation: "Gross profit margin = gross profit ÷ revenue × 100.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Return on capital employed (ROCE) compares profit with:",
    options: [
      ["the capital employed in the business", "Correct: ROCE = profit ÷ capital employed × 100."],
      ["the revenue of the business", "Profit ÷ revenue gives the profit margin."],
      ["the current liabilities of the business", "Current liabilities are used in liquidity ratios."],
      ["the cost of sales of the business", "Cost of sales is used in gross profit."],
    ],
    answer: "A",
    explanation: "ROCE measures the return on the long-term finance invested.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A business has revenue of US\\$80,000 and profit of US\\$6,000. What is its profit margin?",
    options: [
      ["7.5%", "Correct: 6,000 ÷ 80,000 × 100."],
      ["13.3%", "This divides revenue by profit instead of profit by revenue."],
      ["92.5%", "This is the costs as a percentage of revenue, not the profit."],
      ["0.075%", "This forgets to multiply by 100."],
    ],
    answer: "A",
    explanation: "Profit margin = 6,000 ÷ 80,000 × 100 = 7.5%.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", daily: true,
    stem: "A shop's gross profit margin stayed at 35% but its profit margin fell from 12% to 8%. What is the **most** likely cause?",
    options: [
      ["Its expenses rose faster than its revenue", "Correct: expenses explain the gap between the two margins."],
      ["Its suppliers raised the prices of goods", "That would lower the gross profit margin too."],
      ["It reduced the selling prices of its goods", "That would lower the gross profit margin too."],
      ["It sold more goods than in the year before", "More sales at the same margins would not cause this."],
    ],
    answer: "A",
    explanation: "With a steady gross margin, a falling profit margin means expenses (rent, wages, etc.) have grown faster than sales.",
    hints: ["What is deducted from gross profit to give profit?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which action would **most** directly improve a business's gross profit margin?",
    options: [
      ["Buying stock from a cheaper supplier of equal quality", "Correct: lower cost of sales raises gross profit per dollar of sales."],
      ["Moving to a cheaper office to reduce rent", "Rent is an expense; it affects the profit margin, not the gross margin."],
      ["Borrowing money to buy more delivery vehicles", "This changes capital employed, not the gross margin."],
      ["Paying lower dividends to its shareholders this year", "Dividends do not affect gross profit."],
    ],
    answer: "A",
    explanation: "The gross margin depends only on revenue and cost of sales.",
    hints: ["Which costs are deducted to find gross profit?"],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A company's ROCE is 5%. Savings accounts at banks pay interest of 7% a year (assume this rate). What does this suggest?",
    options: [
      ["The owners could earn more by saving their capital in a bank", "Correct: the business returns less than a risk-free alternative."],
      ["The company is more profitable than a bank savings account", "5% is lower than 7%."],
      ["The company must have a very high gross profit margin", "ROCE does not show the gross margin."],
      ["The company has no long-term loans at all", "ROCE does not show this."],
    ],
    answer: "A",
    explanation: "ROCE should be compared with the return available elsewhere; here the business earns less than savings would.",
    hints: ["Compare the two percentages."],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why are profitability ratios more useful than profit figures alone when comparing two businesses?",
    options: [
      ["They allow for differences in the size of the businesses", "Correct: profit is compared with sales or capital."],
      ["They show exactly how much cash each business holds", "Ratios of profit do not measure cash."],
      ["They predict accurately what profit will be next year", "Ratios use past data and cannot predict accurately."],
      ["They include the views of customers and employees", "Ratios ignore non-financial factors."],
    ],
    answer: "A",
    explanation: "A large business usually makes more profit; ratios show how well each uses its sales or capital.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "If a business's profit rises, its profit margin must also rise.",
    answer: false,
    explanation: "False. If revenue rises faster than profit, the profit margin falls even though profit rose.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The profit margin is always lower than or equal to the gross profit margin.",
    answer: true,
    explanation: "True. Profit is gross profit minus expenses, so it cannot be larger than gross profit (expenses are not negative).",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each change with the ratio it affects **first**.",
    pairs: [
      ["A supplier raises the price of goods for resale", "Gross profit margin falls"],
      ["The business moves to premises with a higher rent", "Profit margin falls, gross margin unchanged"],
      ["The business sells an unused building and repays a loan", "Capital employed falls, so ROCE rises"],
    ],
    explanation: "Cost of sales affects the gross margin; expenses affect the profit margin; capital employed affects ROCE.",
  });
  b.fib({
    d: 2,
    stem: "Complete the formula.",
    template: "Return on capital employed (%) = {{blank:a}} ÷ {{blank:b}} × 100",
    blanks: [
      { id: "a", accepted: ["profit"], choices: ["profit", "revenue", "gross profit", "current assets"] },
      { id: "b", accepted: ["capital employed"], choices: ["capital employed", "revenue", "current liabilities", "cost of sales"] },
    ],
    explanation: "ROCE = profit ÷ capital employed × 100.",
  });
  const rv1 = 64000, gp1 = 22400;
  b.num({
    d: 2, skill: "APPLICATION", kind: "pct", value: f.grossMargin(gp1, rv1), daily: true,
    stem: `A pharmacy has revenue of ${money(rv1)} and gross profit of ${money(gp1)}. Calculate its gross profit margin, to one decimal place.`,
    wrong: [round(f.markUp(gp1, rv1 - gp1), 1)],
    explanation: `${fmt(gp1)} ÷ ${fmt(rv1)} × 100 = ${round(f.grossMargin(gp1, rv1), 1)}%.`,
  });
  const p2 = 13500, ce2 = 112500;
  b.calc({
    d: 3, skill: "APPLICATION", kind: "pct", value: f.roce(p2, ce2), calculator: true,
    stem: `A bus company made a profit of ${money(p2)} on capital employed of ${money(ce2)}. Calculate its return on capital employed, to one decimal place.`,
    wrong: [round(ce2 / p2, 1)],
    explanation: `${fmt(p2)} ÷ ${fmt(ce2)} × 100 = ${round(f.roce(p2, ce2), 1)}%.`,
    workedSolution: `1. ROCE = profit ÷ capital employed × 100.\n2. = ${fmt(p2)} ÷ ${fmt(ce2)} × 100 = ${round(f.roce(p2, ce2), 1)}%.`,
    hints: ["Divide profit by capital employed."],
  });
  const rv3 = 95000, pm3 = 8;
  b.calc({
    d: 4, skill: "APPLICATION", kind: "money", value: (rv3 * pm3) / 100,
    stem: `A furniture maker expects revenue of ${money(rv3)} next year and aims for a profit margin of ${pm3}%. Calculate the profit it is aiming for.`,
    wrong: [rv3 / pm3],
    explanation: `${pm3}% × ${fmt(rv3)} = ${money((rv3 * pm3) / 100)}.`,
    workedSolution: `1. Profit margin = profit ÷ revenue × 100, so profit = margin × revenue ÷ 100.\n2. = ${pm3} × ${fmt(rv3)} ÷ 100 = ${money((rv3 * pm3) / 100)}.`,
    hints: ["Rearrange the profit margin formula."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Explain **two** ways a business could increase its profit margin.",
    points: [
      "Way 1, e.g. raise prices / find cheaper suppliers (1)",
      "Explained: more profit kept from each dollar of sales; drawback e.g. customers may switch (1)",
      "Way 2, e.g. cut expenses such as rent, energy, wages (1)",
      "Explained: lower costs raise profit with the same revenue; drawback e.g. service quality may suffer (1)",
    ],
    modelAnswer: "The business could buy from a cheaper supplier, which lowers cost of sales so that more of each dollar of sales becomes profit, as long as quality does not fall. It could also cut expenses, for example by moving to cheaper premises, so profit rises even if revenue stays the same.",
    explanation: "Raise revenue per unit or reduce costs; each method has a risk.",
    hints: ["Profit margin = profit ÷ revenue × 100."],
  });
  // Structured 1 (8-15 marks): two years.
  const y1 = { rev: 200000, gp: 70000, p: 24000, ce: 160000 }, y2 = { rev: 240000, gp: 72000, p: 21600, ce: 180000 };
  const tbl = table(["US\\$", "Year 1", "Year 2"], [["Revenue", y1.rev, y2.rev], ["Gross profit", y1.gp, y2.gp], ["Profit for the year", y1.p, y2.p], ["Capital employed", y1.ce, y2.ce]]);
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 900, calculator: true,
    stem: `Sakubva Bakeries Ltd sells bread and cakes to shops in Mutare. It opened a second bakery during Year 2.\n\n${tbl}`,
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", kind: "pct", value: f.grossMargin(y2.gp, y2.rev), stem: "Calculate the gross profit margin for Year 2, to one decimal place.", wrong: [round(f.grossMargin(y1.gp, y1.rev), 1)], explanation: `${fmt(y2.gp)} ÷ ${fmt(y2.rev)} × 100 = ${round(f.grossMargin(y2.gp, y2.rev), 1)}%.` }),
      P.num({ label: "(b)", marks: 2, type: "CALCULATION", kind: "pct", value: f.profitMargin(y2.p, y2.rev), stem: "Calculate the profit margin for Year 2, to one decimal place.", wrong: [round(f.profitMargin(y1.p, y1.rev), 1)], explanation: `${fmt(y2.p)} ÷ ${fmt(y2.rev)} × 100 = ${round(f.profitMargin(y2.p, y2.rev), 1)}%.` }),
      P.num({ label: "(c)", marks: 2, type: "CALCULATION", kind: "pct", value: f.roce(y2.p, y2.ce), stem: "Calculate the ROCE for Year 2, to one decimal place.", wrong: [round(f.roce(y1.p, y1.ce), 1)], explanation: `${fmt(y2.p)} ÷ ${fmt(y2.ce)} × 100 = ${round(f.roce(y2.p, y2.ce), 1)}%.` }),
      P.manual({ label: "(d)", marks: 3, stem: `In Year 1 the ratios were: gross profit margin ${round(f.grossMargin(y1.gp, y1.rev), 1)}%, profit margin ${round(f.profitMargin(y1.p, y1.rev), 1)}%, ROCE ${round(f.roce(y1.p, y1.ce), 1)}%. Explain what the changes show.`, points: ["All three ratios fell: profitability worsened despite higher revenue (1)", "Gross margin fall: flour/ingredient costs rose or prices cut (1)", "ROCE fall: the extra capital for the second bakery has not yet produced extra profit (1)"] }),
      P.manual({ label: "(e)", marks: 4, stem: "The directors say opening the second bakery was a mistake. Evaluate this view.", points: ["Evidence for: profit fell by US\\$2,400 while capital employed rose by US\\$20,000 (1)", "Evidence against: revenue rose 20%; new bakeries take time to build sales; set-up costs in the first year (1)", "Other causes: rising ingredient costs affect both bakeries (1)", "Justified judgement, e.g. too early to decide; review next year (1)"] }),
    ],
    explanation: `Year 2: gross margin ${round(f.grossMargin(y2.gp, y2.rev), 1)}%, profit margin ${round(f.profitMargin(y2.p, y2.rev), 1)}%, ROCE ${round(f.roce(y2.p, y2.ce), 1)}%: all lower than Year 1.`,
    hints: ["Margins divide by revenue; ROCE divides by capital employed."],
  });
  // Structured 2: compare two businesses.
  const A = { rev: 56000, gp: 33600, p: 12600, ce: 63000 }, B = { rev: 420000, gp: 105000, p: 42000, ce: 525000 };
  const tb = table(["US\\$", "Hair salon", "Supermarket"], [["Revenue", A.rev, B.rev], ["Gross profit", A.gp, B.gp], ["Profit", A.p, B.p], ["Capital employed", A.ce, B.ce]]);
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 780, calculator: true,
    stem: `Tendai inherited money and wants to buy one of two fictional businesses in Gweru. Their latest results are shown below.\n\n${tb}`,
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", kind: "pct", value: f.roce(A.p, A.ce), stem: "Calculate the ROCE of the hair salon, to one decimal place.", wrong: [round(f.profitMargin(A.p, A.rev), 1)], explanation: `${fmt(A.p)} ÷ ${fmt(A.ce)} × 100 = ${round(f.roce(A.p, A.ce), 1)}%.` }),
      P.num({ label: "(b)", marks: 2, type: "CALCULATION", kind: "pct", value: f.roce(B.p, B.ce), stem: "Calculate the ROCE of the supermarket, to one decimal place.", wrong: [round(f.profitMargin(B.p, B.rev), 1)], explanation: `${fmt(B.p)} ÷ ${fmt(B.ce)} × 100 = ${round(f.roce(B.p, B.ce), 1)}%.` }),
      P.manual({ label: "(c)", marks: 2, stem: "The supermarket makes more profit. Explain why ROCE is a better way to compare the two businesses.", points: ["The businesses are very different sizes (1)", "ROCE shows profit earned for each dollar invested (1)"] }),
      P.manual({ label: "(d)", marks: 4, stem: "Recommend which business Tendai should buy. Justify your answer.", points: [`Salon has the higher ROCE (${round(f.roce(A.p, A.ce), 1)}% v ${round(f.roce(B.p, B.ce), 1)}%) and higher margins (1)`, "But salon depends on skilled staff / smaller, so profit is less certain (1)", "Supermarket gives a larger total profit; the price Tendai pays matters (1)", "Justified recommendation with a condition (1)"] }),
    ],
    explanation: `Salon ROCE ${round(f.roce(A.p, A.ce), 1)}%; supermarket ${round(f.roce(B.p, B.ce), 1)}%. Ratios allow for size.`,
    hints: ["ROCE = profit ÷ capital employed × 100."],
  });
  b.card("FORMULA", "Gross profit margin", "Gross profit ÷ revenue × 100.");
  b.card("FORMULA", "Profit margin (net profit margin)", "Profit ÷ revenue × 100.");
  b.card("FORMULA", "ROCE", "Profit ÷ capital employed × 100.");
  b.card("CONCEPT", "Falling gross margin", "Cost of sales rising faster than revenue: dearer supplies or lower selling prices.");
  b.card("CONCEPT", "Gap between gross and profit margins", "Caused by expenses; a widening gap means expenses are rising faster than sales.");
  b.card("CONCEPT", "Comparing ratios", "Compare with previous years, competitors in the same industry and, for ROCE, interest rates.");
  b.card("CONCEPT", "Improving profitability", "Raise prices, cheaper suppliers, cut expenses, sell unused assets, improve efficiency; each has drawbacks.");
  b.card("DEFINITION", "Profitability", "How well a business turns its sales or capital into profit.");
});
