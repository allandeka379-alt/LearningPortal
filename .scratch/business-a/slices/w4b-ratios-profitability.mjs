// W4b: ratios.profitability
import { concept, P, ZIM, table, r2, rd, ratios, chk } from "../lib.mjs";
import { mc } from "../tables/w4b-lib.mjs";

concept("abus.ratios.profitability", { file: "ratios/profitability", keyPrefix: "ratios.profitability" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which formula gives the **gross profit margin**?",
    ok: ["Gross profit ÷ revenue × 100", "Correct: gross profit as a percentage of revenue."],
    bad: [["Profit from operations ÷ revenue × 100", "That is the operating profit margin."], ["Gross profit ÷ cost of sales × 100", "That is a mark-up on cost, not a margin on revenue."], ["Profit from operations ÷ capital employed × 100", "That is ROCE."]],
    explanation: "The gross profit margin is gross profit divided by revenue, multiplied by 100.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which items make up **capital employed** in the standard formula for ROCE?",
    ok: ["Issued shares, reserves and non-current liabilities", "Correct: long-term finance from owners and lenders."],
    bad: [["Issued shares, reserves and all current liabilities", "Current liabilities are short-term and are not included."], ["Non-current assets and current assets", "That is total assets, not capital employed."], ["Reserves and inventory held at the year end", "Inventory is an asset, not a source of finance."]],
    explanation: "Capital employed = issued shares + reserves + non-current liabilities.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which profit figure is used as the numerator when ROCE is calculated?",
    ok: ["Profit from operations", "Correct: profit before finance costs and tax."],
    bad: [["Profit for the year after tax", "That is after finance costs and tax; the appendix uses profit from operations."], ["Gross profit", "Gross profit is before the expenses of running the business."], ["Retained profit", "Retained profit is after tax and dividends."]],
    explanation: "ROCE = profit from operations ÷ capital employed × 100.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "A fictional company's gross profit margin is unchanged from last year, but its operating profit margin has fallen. What is the most likely cause?",
    ok: ["Expenses rose faster than revenue", "Correct: the problem lies between gross profit and profit from operations."],
    bad: [["The cost of sales rose faster than revenue", "That would also lower the gross margin."], ["The company repaid a long-term loan", "Repaying a loan affects finance costs and capital employed, not the operating margin."], ["The tax rate was increased", "Tax is deducted after profit from operations."]],
    hints: ["Which costs lie between gross profit and profit from operations?"],
    explanation: "With the gross margin steady, the extra fall in the operating margin comes from expenses such as wages, rent, marketing or depreciation growing faster than revenue.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "A fictional farm-supply company earns a ROCE of 9%. It is considering a bank loan at an interest rate of 12% to buy more equipment, expecting the new equipment to earn the same return as its existing capital. What is the best comment?",
    ok: ["The extra capital would earn less than the loan costs", "Correct: 9% earned against 12% paid reduces the owners' return."],
    bad: [["The loan will raise profit because capital employed rises", "More capital helps only if it earns more than the cost of borrowing."], ["ROCE cannot be compared with an interest rate", "Comparing the two is a standard use of ROCE."], ["The loan is sensible because 12% is greater than 9%", "Paying 12% to earn 9% loses money on each dollar borrowed."]],
    hints: ["Compare the return on the new capital with its cost."],
    explanation: "If the return on capital (9%) is below the cost of borrowing (12%), debt-financed expansion lowers the owners' wealth, other things equal.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A fictional bakery uses surplus cash to repay a long-term loan. Profit from operations is unchanged. What happens to ROCE, and what is the cost of this action?",
    ok: ["ROCE rises as capital employed falls, but cash falls", "Correct: the same profit is earned on less capital, but liquidity is lower."],
    bad: [["ROCE falls as capital employed falls, and cash rises", "Repaying the loan uses cash, so cash falls."], ["ROCE is unchanged, because the loan is a liability", "Non-current liabilities are part of capital employed, so it changes."], ["ROCE rises because profit from operations rises", "The question says profit from operations is unchanged."]],
    hints: ["Which part of capital employed falls when a loan is repaid?"],
    explanation: "The loan is a non-current liability, so repayment lowers capital employed. ROCE rises, but the cash used is no longer available for day-to-day needs.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING", applies: ZIM,
    stem: "Which formula gives the **net profit margin** (net profit as a percentage of turnover)?",
    ok: ["Profit for the year ÷ turnover (revenue) × 100", "Correct: net profit as a percentage of revenue."],
    bad: [["Gross profit ÷ turnover (revenue) × 100", "That is the gross profit margin."], ["Profit for the year ÷ capital employed × 100", "That is a return on capital, not a margin on revenue."], ["Turnover (revenue) ÷ profit for the year × 100", "This inverts the fraction."]],
    hints: ["Net means after finance costs and tax."], explanation: "Net profit margin = profit for the year ÷ revenue × 100. Some syllabi use the operating margin instead.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A business can have a high gross profit margin and a low operating profit margin.",
    answer: true,
    explanation: "True. If its expenses (wages, rent, marketing) are very high, much of the gross profit is used up before profit from operations.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "ROCE is calculated using profit for the year, after tax and finance costs.",
    answer: false,
    hints: ["Which profit is before interest and tax?"], explanation: "False. ROCE uses profit from operations, which is before finance costs and tax, so that it measures the return on all long-term capital however it was raised.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each ratio to the question it helps to answer.",
    pairs: [["Gross profit margin", "How much is left from each dollar of sales after the direct cost of goods?"], ["Operating profit margin", "How much is left after all running expenses?"], ["ROCE", "How well is the long-term finance used?"]],
    extraRight: ["How quickly are customers paying?"],
    explanation: "Each profitability ratio answers a different question; receivables days measure collection of debts.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "ROCE is profit from {{blank:a}} divided by capital {{blank:b}}, multiplied by 100.",
    blanks: [
      { id: "a", accepted: ["operations"], choices: ["operations", "the year", "tax"] },
      { id: "b", accepted: ["employed"], choices: ["employed", "invested in inventory", "owed"] },
    ],
    explanation: "ROCE = profit from operations ÷ capital employed × 100.",
  });

  // ---- numerical items
  const gm = ratios.grossMargin(240000 - 156000, 240000);
  chk(gm, 35, 1e-9);
  b.num({
    d: 2, skill: "APPLICATION", kind: "pct", value: gm, calculator: true, daily: true, wrong: [r2((156000 / 240000) * 100), r2((84000 / 156000) * 100)],
    stem: "A fictional shop in Mutare had revenue of US\\$240,000 and cost of sales of US\\$156,000. Calculate its gross profit margin, to one decimal place.",
    hints: ["First find gross profit."],
    explanation: "Gross profit = 240,000 − 156,000 = 84,000. Margin = 84,000 ÷ 240,000 × 100 = 35.0%. Using cost of sales as the numerator gives 65.0%, and dividing by cost of sales gives the mark-up, 53.8%.",
  });
  const op = 360000 - 216000 - 100800;
  const om = ratios.operatingMargin(op, 360000);
  chk(op, 43200); chk(om, 12, 1e-9);
  b.num({
    d: 3, skill: "APPLICATION", kind: "pct", value: om, calculator: true, wrong: [r2(((360000 - 216000) / 360000) * 100), r2((43200 / 216000) * 100)],
    stem: "A fictional printing company in Bulawayo had revenue of US\\$360,000, cost of sales of US\\$216,000 and total expenses of US\\$100,800. Calculate its operating profit margin, to one decimal place.",
    hints: ["Profit from operations = gross profit − expenses."],
    explanation: "Gross profit = 144,000. Profit from operations = 144,000 − 100,800 = 43,200. Margin = 43,200 ÷ 360,000 × 100 = 12.0%. The gross margin (40.0%) is the wrong answer to this question.",
  });
  const ce1 = ratios.capitalEmployed(180000, 140000, 80000);
  const roce1 = ratios.roce(57600, ce1);
  chk(ce1, 400000); chk(roce1, 14.4, 1e-9);
  b.num({
    d: 3, skill: "APPLICATION", kind: "pct", value: roce1, calculator: true, wrong: [r2((57600 / 320000) * 100), r2((57600 / 180000) * 100)],
    stem: "A fictional haulage company has profit from operations of US\\$57,600, issued shares of US\\$180,000, reserves of US\\$140,000 and non-current liabilities of US\\$80,000. Calculate its ROCE, to one decimal place.",
    hints: ["Add all three items to find capital employed."],
    explanation: "Capital employed = 180,000 + 140,000 + 80,000 = 400,000. ROCE = 57,600 ÷ 400,000 × 100 = 14.4%. Leaving out the non-current liabilities gives 18.0%, and using shares alone gives 32.0%.",
  });
  const op2 = 650000 - 390000 - 195000;
  const pfy2 = op2 - 7500 - 14000;
  const ce2 = ratios.capitalEmployed(250000, 180000, 70000);
  const roce2 = ratios.roce(op2, ce2);
  chk(op2, 65000); chk(pfy2, 43500); chk(ce2, 500000); chk(roce2, 13, 1e-9);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "pct", value: roce2, calculator: true, wrong: [r2((pfy2 / ce2) * 100), r2((op2 / 430000) * 100)],
    stem: "A fictional company's statement of profit or loss shows: revenue US\\$650,000; cost of sales US\\$390,000; expenses US\\$195,000; finance costs US\\$7,500; tax US\\$14,000. Its statement of financial position shows issued shares of US\\$250,000, reserves of US\\$180,000, non-current liabilities of US\\$70,000 and current liabilities of US\\$85,000. Calculate the ROCE, to one decimal place.",
    hints: ["Which profit figure is used? Is the current liability part of capital employed?"],
    explanation: "Profit from operations = 650,000 − 390,000 − 195,000 = 65,000. Capital employed = 250,000 + 180,000 + 70,000 = 500,000 (current liabilities are excluded). ROCE = 65,000 ÷ 500,000 × 100 = 13.0%. Using profit for the year (43,500) gives 8.7%, and omitting the non-current liabilities gives 15.1%.",
    workedSolution: "1. Profit from operations = 650,000 − 390,000 − 195,000 = 65,000.\n2. Capital employed = 250,000 + 180,000 + 70,000 = 500,000.\n3. ROCE = 65,000 ÷ 500,000 × 100 = 13.0%.",
  });
  const roce3 = ratios.roce(op2, 500000 - 70000);
  chk(roce3, 15.116, 0.001);
  b.num({
    d: 4, skill: "ANALYSIS", kind: "pct", value: roce3, calculator: true, wrong: [13, r2(((op2 + 7500) / 430000) * 100)],
    stem: "The company above repays its US\\$70,000 non-current liability from cash. Profit from operations is unchanged at US\\$65,000. Calculate the new ROCE, to one decimal place.",
    hints: ["Capital employed falls by the amount repaid."],
    explanation: "New capital employed = 500,000 − 70,000 = 430,000. ROCE = 65,000 ÷ 430,000 × 100 = 15.1%, up from 13.0%. Adding back the interest saved is not part of ROCE because it uses profit from operations.",
  });
  const npm = ratios.netMargin(pfy2, 650000);
  chk(npm, 6.692, 0.001);
  b.num({
    d: 3, skill: "APPLICATION", kind: "pct", value: npm, calculator: true, applies: ZIM, wrong: [10, 13],
    stem: "Using the figures in the previous question, calculate the company's net profit margin (profit for the year ÷ turnover × 100), to one decimal place.",
    hints: ["Profit for the year is after finance costs and tax."],
    explanation: "Profit for the year = 65,000 − 7,500 − 14,000 = 43,500. Net profit margin = 43,500 ÷ 650,000 × 100 = 6.7%. The operating margin is 10.0% and the gross margin is 40.0%.",
  });


  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why a gross profit margin on its own does not show how profitable a business is.",
    points: ["The gross margin is calculated before the running expenses are deducted", "A business may have a high gross margin but high wages, rent or marketing costs", "So profit from operations may be low, which only the operating margin or ROCE shows"],
    modelAnswer: "The gross margin is found before wages, rent and marketing are deducted. A business can have a high gross margin and still be unprofitable if its expenses are high, which is shown only by the operating margin or by ROCE.",
    hints: ["What is deducted after gross profit?"],
    explanation: "The gross margin ignores expenses.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "A fictional furniture company's revenue rose by 12% but its ROCE fell from 16% to 12%. Analyse two possible reasons.",
    points: ["Cost of sales or expenses rose faster than revenue", "So profit from operations rose by less than revenue, or fell", "Capital employed rose, for example through a new loan or share issue", "The new capital has not yet earned a return, so the profit is divided by a larger figure"],
    modelAnswer: "Costs of sales or expenses may have risen faster than revenue, so profit from operations rose by less than revenue or fell. Alternatively capital employed may have risen, for example through a new loan, and the new capital has not yet earned a return, so the same profit is divided by a larger figure.",
    hints: ["Think about both the numerator and the denominator."],
    explanation: "Two reasons: profit or capital.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A fictional company has a ROCE of 8%, below the 11% interest rate on its loans. Evaluate whether it should sell some under-used equipment and repay part of the loan.",
    points: ["Selling idle equipment reduces capital employed, so ROCE should rise", "Repaying the loan stops interest at 11%, more than the 8% the capital earns", "The equipment may be needed for future growth or peak demand", "The sale price may be low, or the sale may reduce output and profit from operations", "Repayment uses cash, which could weaken liquidity", "Judgement and reason, for example sell only what is truly idle and keep enough cash"],
    modelAnswer: "Selling under-used equipment lowers capital employed, so ROCE should rise, and repaying the loan saves interest at 11%, which is more than the capital earns at 8%. However, the equipment may be needed at peak times or for growth, the sale price may be poor, and using cash to repay the loan could weaken liquidity. The company should sell only equipment that is genuinely idle and keep enough cash for its daily needs.",
    hints: ["Compare the return with the cost of borrowing, then look at the risks."],
    explanation: "Benefits weighed against the costs, with a judgement.",
  });

  // ---- practice structured items
  const T = { y24: { rev: 420000, cos: 252000, exp: 118000, sh: 120000, res: 80000, ncl: 40000 }, y25: { rev: 504000, cos: 322560, exp: 131000, sh: 120000, res: 100000, ncl: 90000 } };
  const calc = (y) => {
    const gp = y.rev - y.cos;
    const opf = gp - y.exp;
    const ce = ratios.capitalEmployed(y.sh, y.res, y.ncl);
    return { gp, opf, ce, gm: ratios.grossMargin(gp, y.rev), om: ratios.operatingMargin(opf, y.rev), roce: ratios.roce(opf, ce) };
  };
  const c24 = calc(T.y24), c25 = calc(T.y25);
  chk(c24.gm, 40, 1e-9); chk(c25.gm, 36, 1e-9); chk(c24.roce, 20.833, 0.001); chk(c25.roce, 16.271, 0.001); chk(c25.opf, 50440); chk(c24.opf, 50000);
  const tbl1 = table(["US\\$", "2024", "2025"], [["Revenue", T.y24.rev, T.y25.rev], ["Cost of sales", T.y24.cos, T.y25.cos], ["Expenses", T.y24.exp, T.y25.exp], ["Issued shares", T.y24.sh, T.y25.sh], ["Reserves", T.y24.res, T.y25.res], ["Non-current liabilities", T.y24.ncl, T.y25.ncl]]);
  b.struct({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: `Tendai's Bakery Ltd is a fictional company in Harare. Its figures for two years are shown below. In 2025 it borrowed money to buy a second oven and opened a stall at a bus terminus.\n\n${tbl1}`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "pct", value: c25.gm, wrong: [64, 40], stem: "Calculate the gross profit margin for 2025, to one decimal place.", explanation: "Gross profit = 504,000 − 322,560 = 181,440. Margin = 181,440 ÷ 504,000 × 100 = 36.0%." }),
      P.num({ label: "(b)", marks: 3, kind: "pct", value: c25.roce, wrong: [r2((c25.opf / 220000) * 100), 10], stem: "Calculate the ROCE for 2025, to one decimal place.", type: "CALCULATION", explanation: "Profit from operations = 181,440 − 131,000 = 50,440. Capital employed = 120,000 + 100,000 + 90,000 = 310,000. ROCE = 50,440 ÷ 310,000 × 100 = 16.3%.", workedSolution: "1. Profit from operations = 181,440 − 131,000 = 50,440.\n2. Capital employed = 120,000 + 100,000 + 90,000 = 310,000.\n3. ROCE = 50,440 ÷ 310,000 × 100 = 16.3%." }),
      P.manual({ label: "(c)", marks: 4, stem: "The ROCE for 2024 was 20.8%. Analyse why ROCE fell although revenue and profit from operations both rose.", points: ["Profit from operations rose only slightly, from US\\$50,000 to US\\$50,440", "Application: revenue rose by 20% but the cost of sales rose faster, lowering the gross margin from 40.0% to 36.0%", "Capital employed rose from US\\$240,000 to US\\$310,000", "Application: the new loan (non-current liabilities up US\\$50,000) and retained profit increased the capital, which has not yet earned a return"], modelAnswer: "Profit from operations rose only slightly, from US\\$50,000 to US\\$50,440, because the cost of sales rose faster than revenue and the gross margin fell from 40.0% to 36.0%. At the same time capital employed rose from US\\$240,000 to US\\$310,000, partly because of the new loan, so the almost unchanged profit was divided by a much larger figure and ROCE fell.", explanation: "Profit barely rose while capital rose by 29%." }),
    ],
    hints: ["Gross profit first, then profit from operations.", "Compare the growth of profit with the growth of capital employed."],
    explanation: "Gross margin 36.0%; ROCE 16.3%; ROCE fell because profit barely rose while capital employed rose by 29%.",
  });
  const X = { rev: 900000, cos: 585000, exp: 238500, sh: 160000, res: 170000, ncl: 120000 };
  const Y = { rev: 500000, cos: 255000, exp: 160000, sh: 140000, res: 100000, ncl: 25000 };
  const cx = calc(X), cy = calc(Y);
  chk(cx.opf, 76500); chk(cx.ce, 450000); chk(cx.roce, 17, 1e-9); chk(cy.opf, 85000); chk(cy.om, 17, 1e-9); chk(cy.roce, 32.075, 0.001); chk(cx.om, 8.5, 1e-9);
  const tbl2 = table(["US\\$", "Chinhoyi Fuel Services", "Gweru Auto Parts"], [["Revenue", X.rev, Y.rev], ["Cost of sales", X.cos, Y.cos], ["Expenses", X.exp, Y.exp], ["Issued shares", X.sh, Y.sh], ["Reserves", X.res, Y.res], ["Non-current liabilities", X.ncl, Y.ncl]]);
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: `Two fictional private companies are compared by a bank that has one loan to offer. Their figures for the same year are shown below.\n\n${tbl2}`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "pct", value: cx.roce, wrong: [cx.om, r2((76500 / 320000) * 100)], stem: "Calculate the ROCE of Chinhoyi Fuel Services, to one decimal place.", explanation: "Profit from operations = 900,000 − 585,000 − 238,500 = 76,500. Capital employed = 160,000 + 170,000 + 120,000 = 450,000. ROCE = 76,500 ÷ 450,000 × 100 = 17.0%." }),
      P.num({ label: "(b)", marks: 2, kind: "pct", value: cy.om, wrong: [50, cy.roce], stem: "Calculate the operating profit margin of Gweru Auto Parts, to one decimal place.", explanation: "Profit from operations = 500,000 − 255,000 − 160,000 = 85,000. Margin = 85,000 ÷ 500,000 × 100 = 17.0%." }),
      P.manual({ label: "(c)", marks: 4, stem: "Analyse one difference between the two companies' profitability.", points: ["Gweru Auto Parts has a much higher gross margin (49.0% against 35.0%)", "Application: it keeps US\\$0.49 of each dollar of sales after cost of sales against US\\$0.35", "Chinhoyi Fuel Services has lower margins but sells nearly twice as much", "Application: its volume gives profit from operations of US\\$76,500 on lower margins, but its ROCE (17.0%) is below Gweru's (32.1%)"], modelAnswer: "Gweru Auto Parts has a much higher gross margin, 49.0% against 35.0%, so it keeps US\\$0.49 of each dollar of sales after cost of sales compared with US\\$0.35. Chinhoyi Fuel Services sells nearly twice as much but on lower margins, and its profit from operations of US\\$76,500 is earned on US\\$450,000 of capital, giving a ROCE of 17.0% against Gweru's 32.1%.", explanation: "Margins and ROCE differ; Gweru earns more on its capital." }),
      P.manual({ label: "(d)", marks: 6, stem: "Evaluate which company the bank should lend to.", points: [["Gweru has the higher ROCE (32.1% against 17.0%) and operating margin (17.0% against 8.5%)", 2], ["Gweru has far lower non-current liabilities (US\\$25,000 against US\\$120,000), so it already has little debt and more capacity to borrow", 1], ["Gweru's profit from operations of US\\$85,000 exceeds Chinhoyi's US\\$76,500, so Gweru is also better in absolute profit", 1], ["Limitation: one year of data; the trend, the industry and the purpose of the loan are unknown", 1], ["Judgement with a reason, for example lend to Gweru, subject to the trend and security", 1]], levels: [[3, 5, 6, "Uses figures from both companies and the bank's viewpoint; a justified decision with a condition"], [2, 3, 4, "Compares some figures with some analysis; judgement weakly supported"], [1, 1, 2, "States figures with little analysis"]], modelAnswer: "Gweru Auto Parts has the higher ROCE, 32.1% against 17.0%, and the higher operating margin, 17.0% against 8.5%. Its profit from operations of US\\$85,000 is also larger than Chinhoyi's US\\$76,500, and it has only US\\$25,000 of non-current liabilities against US\\$120,000, so it has more capacity to borrow safely. The limits are that only one year is shown and the trend, the industry and the purpose of the loan are unknown. On these figures the bank should lend to Gweru, subject to checking the trend and the security offered.", hints: ["Compare ROCE, margins, absolute profit and existing debt."], explanation: "Gweru is stronger on every measure shown; the decision is qualified by one year of data." }),
    ],
    hints: ["Work out profit from operations for each firm first."],
    explanation: "Chinhoyi ROCE 17.0%; Gweru operating margin 17.0%; Gweru is stronger and the bank should lend to it, subject to the trend.",
  });

  b.card("DEFINITION", "Profitability", "The ability of a business to earn profit from its revenue and from the capital invested in it.");
  b.card("FORMULA", "Gross profit margin", "Gross profit ÷ revenue × 100.");
  b.card("FORMULA", "Operating profit margin", "Profit from operations ÷ revenue × 100.");
  b.card("FORMULA", "ROCE", "Profit from operations ÷ capital employed × 100.");
  b.card("FORMULA", "Capital employed", "Issued shares + reserves + non-current liabilities.");
  b.card("FORMULA", "Net profit margin", "Profit for the year ÷ revenue (turnover) × 100.", "Some syllabi use the operating margin instead.", { applies: ZIM });
  b.card("CONCEPT", "Why a gross margin falls", "Higher cost of sales, discounting, waste or theft, or a shift to low-margin products.");
  b.card("CONCEPT", "Why ROCE falls although profit rises", "Capital employed rose faster than profit: new loans or shares have not yet earned a return.");
  b.card("CONCEPT", "Comparing ROCE with the interest rate", "If ROCE is below the cost of borrowing, debt-financed expansion reduces the owners' return.");
  b.card("FACT", "Ways of improving profitability", "Raise prices or the sales mix, cut cost of sales, cut expenses, or earn the same profit from less capital; each has a trade-off.");
});
