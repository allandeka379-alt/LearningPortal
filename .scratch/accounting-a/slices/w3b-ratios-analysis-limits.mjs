// W3b: ratios.analysis-limits
import { concept, P, table, chk, r2, rd, ratios } from "../lib.mjs";
import { coYear, R, mc, F, usd } from "../tables/w3b-lib.mjs";

const p0 = (v) => String(Math.round(v));
const p1 = (v) => (Math.round(v * 10) / 10).toFixed(1);
const p2 = (v) => (Math.round(v * 100) / 100).toFixed(2);

concept("aacc.ratios.analysis-limits", { file: "ratios/analysis-limits", keyPrefix: "ratios.analysis-limits" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of the following is a limitation of ratio analysis?",
    ok: ["The ratios are based on past results and may not predict the future", "Correct: they are historical."],
    bad: [["Ratios cannot be calculated from the published accounts of a company", "They are calculated from the statements."], ["Ratios show every non-financial factor that affects the business", "Non-financial factors are not shown."], ["Ratios are the same for every business in every industry and year", "There is no universal benchmark."]],
    explanation: "Ratios are calculated from historical figures, so they describe the past; they ignore non-financial factors and have no universal benchmark.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which user of accounts is most interested in gearing and interest cover?",
    ok: ["A bank considering a long-term loan", "Correct: it needs to know that interest and the loan can be repaid."],
    bad: [["A customer buying one item for cash", "A cash customer has little interest in the borrowing."], ["A trade union negotiating a pay rise", "A union is more interested in profit and cash than in gearing."], ["A tax authority checking the VAT return", "It checks the tax figures, not borrowing ratios."]],
    explanation: "Lenders judge the risk of default using gearing, interest cover and liquidity.",
  });
  mc(b, {
    d: 2, skill: "APPLICATION",
    stem: "Expenses to revenue is unchanged, but the gross profit margin has fallen. What happens to the profit margin before finance costs and tax?",
    ok: ["It falls by the same number of percentage points", "Correct: the lower margin passes straight through."],
    bad: [["It rises, because revenue has grown", "Growth does not offset a lower margin."], ["It stays the same, because expenses are unchanged", "The gross margin has fallen, so less is left."], ["It falls by a larger amount than the gross margin", "Expenses to revenue is unchanged, so the fall is equal."]],
    explanation: "Profit before finance and tax as a percentage of revenue = gross margin minus expenses to revenue, so a fall in the first with no change in the second lowers it by the same points.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "ROCE can be shown as which product?",
    ok: ["Operating profit margin multiplied by capital turnover", "Correct: (profit from operations ÷ revenue) × (revenue ÷ capital employed)."],
    bad: [["Gross profit margin multiplied by the mark-up on cost", "These share the same profit and have no link to capital."], ["Current ratio multiplied by the acid test ratio of the year", "These are liquidity ratios."], ["Gearing multiplied by the interest cover of the company", "These are solvency measures."]],
    hints: ["Cancel revenue from the two fractions."],
    explanation: "Revenue cancels: profit from operations ÷ revenue × revenue ÷ capital employed = profit from operations ÷ capital employed.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which action is window dressing?",
    ok: ["Delaying purchases until after the year end to keep payables low", "Correct: the action changes the year-end figures, not the underlying position."],
    bad: [["Writing off a debt that the customer has refused to pay at all", "This is normal accounting for a loss."], ["Paying a dividend that the directors declared during the year", "A normal distribution."], ["Charging depreciation each year on the delivery vans and plant", "A normal accounting requirement."]],
    hints: ["Window dressing improves the picture at one date only."],
    explanation: "Window dressing is arranging transactions around the year end to make the position look better than normal.",
  });
  mc(b, {
    d: 3, skill: "EVALUATION",
    stem: "Why is it useful to compare a company's ratios with the average for its industry?",
    ok: ["No fixed standard exists for a good ratio; the level depends on the industry", "Correct: a benchmark gives a context for judging the figures."],
    bad: [["Every company in the industry must have identical ratios every year", "Companies differ in size, policy and age."], ["The industry average is always the best possible result for a firm", "It is an average, not an upper limit."], ["It removes the need to read the financial statements in detail", "The ratios are calculated from the statements."]],
    hints: ["What does a ratio mean without a comparison?"],
    explanation: "Because there is no universal benchmark, ratios are meaningful only against earlier years, targets or similar businesses.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Two similar shops use different methods of depreciation for their vehicles. What does this do to a comparison of their ROCE?",
    ok: ["The ratios are not strictly comparable, as profit and asset values differ", "Correct: policies change both the profit and the capital employed."],
    bad: [["There is no effect, because depreciation is not a cash flow", "Depreciation changes profit and carrying amounts."], ["The comparison is fairer, because both shops have vehicles", "The different policies make it less fair."], ["Only the current ratio is affected by the difference in policy", "It affects profit, assets and capital employed."]],
    hints: ["Think of what depreciation changes in the statements."],
    explanation: "Different depreciation policies change the profit and the carrying amounts of non-current assets, so ROCE and asset turnover are not like for like.",
  });

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A business with a lower profit margin than another business must have a lower ROCE.", answer: false, explanation: "False. A high capital turnover can offset a low margin, so ROCE can be equal or higher." });
  b.tf({ d: 3, skill: "UNDERSTANDING", daily: true, stem: "Ratios calculated from two years of figures give strong evidence of a long-term trend.", answer: false, hints: ["How many observations make a trend?"], explanation: "False. Two years show a change, not a trend; more periods and the reasons for the change are needed." });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each user of accounts to the ratios in which they have the greatest interest.",
    pairs: ["A bank asked for a long-term loan", "A supplier giving 60 days' credit", "A shareholder seeking growth", "A manager reviewing credit control"],
    right: ["Gearing and interest cover", "Current ratio and trade payables days", "Earnings per share and ROCE", "Trade receivables days"],
    rightIndex: [0, 1, 2, 3],
    explanation: "Lenders look at long-term risk, suppliers at the ability to pay soon, shareholders at returns and managers at the efficiency of operations.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "ROCE can be split into the operating {{blank:a}} multiplied by capital {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["margin"], choices: ["margin", "cover", "yield"] }, { id: "b", accepted: ["turnover"], choices: ["turnover", "gearing", "cover"] }],
    explanation: "ROCE = (profit from operations ÷ revenue) × (revenue ÷ capital employed).",
  });
  b.short({ d: 1, skill: "RECALL", stem: "What term describes actions taken around the year end so that the statement of financial position looks better than the position during the year?", accepted: ["window dressing"], explanation: "This is window dressing." });

  // numerical items on their own figures
  const om = (86400 / 960000) * 100;
  b.num({
    d: 2, skill: "APPLICATION", kind: "pct", value: (62500 / 780000) * 100, calculator: true, daily: true, wrong: [(48300 / 780000) * 100, (62500 / 310000) * 100],
    stem: `A company's revenue was ${usd(780000)}, its profit from operations was ${usd(62500)} and its profit for the year was ${usd(48300)}. Calculate the operating profit margin (profit from operations ÷ revenue × 100) as a percentage to one decimal place.`,
    explanation: `${F(62500)} ÷ ${F(780000)} × 100 = ${p1((62500 / 780000) * 100)}%. Using profit for the year would give the profit margin, ${p1((48300 / 780000) * 100)}%.`,
  });
  void om;
  const ct = 640000 / 256000;
  b.num({
    d: 2, skill: "APPLICATION", kind: "times", value: ct, dp: 2, calculator: true, wrong: [256000 / 640000, 640000 / 320000],
    stem: `A company's revenue was ${usd(640000)} and its capital employed was ${usd(256000)}. Calculate its capital turnover (revenue ÷ capital employed) in times to two decimal places.`,
    explanation: `${F(640000)} ÷ ${F(256000)} = ${p2(ct)} times. Dividing the other way gives ${p2(256000 / 640000)}.`,
  });
  const rc = (0.072) * (410000 / 205000) * 100;
  chk(rc, 14.4, 1e-9);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "pct", value: rc, calculator: true, wrong: [7.2, 7.2 + 2],
    stem: `A company has an operating profit margin of 7.2% and revenue of ${usd(410000)}. Its capital employed is ${usd(205000)}. Calculate ROCE as a percentage to one decimal place.`,
    hints: ["Capital turnover = revenue ÷ capital employed."],
    explanation: `Capital turnover = ${F(410000)} ÷ ${F(205000)} = 2.0 times. ROCE = 7.2% × 2.0 = ${p1(rc)}%. The margin alone (7.2%) ignores how fast capital is used.`,
  });
  const need = (12 / 2.5);
  chk(need, 4.8, 1e-9);
  b.calc({
    d: 4, skill: "APPLICATION", kind: "pct", value: need, calculator: true, wrong: [12 * 2.5, 12],
    stem: "A retailer turns its capital employed over 2.5 times a year. The directors want a ROCE of 12%. Calculate the operating profit margin that is needed, as a percentage to one decimal place.",
    hints: ["ROCE = operating margin × capital turnover, so rearrange."],
    explanation: `Operating margin = ROCE ÷ capital turnover = 12 ÷ 2.5 = ${p1(need)}%. Multiplying the two (30%) is the usual error.`,
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why ratios calculated for one year are of limited use.",
    points: ["A single figure has no standard to compare with, so it cannot show whether the result is good or bad", "Comparison with earlier years, with a budget or with similar businesses is needed to see a trend or a weakness"],
    modelAnswer: "One year's ratio cannot be judged without a comparison. A comparison with earlier years, a target or another business shows whether the result is an improvement or a weakness.",
    explanation: "One mark for the lack of a standard and one for the need for comparison.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 4,
    stem: "Explain two reasons why the ratios of two businesses in the same trade may not be strictly comparable.",
    points: ["Different accounting policies (for example depreciation or inventory valuation) change profit and asset values", "Explained: the same trading gives different profit and capital employed under different policies", "Different financing or size (for example one leases and one owns its premises)", "Explained: gearing, ROCE and asset turnover differ because of how the assets are financed, not the trading"],
    modelAnswer: "Different depreciation or inventory policies change profit and the value of assets, so ROCE differs for the same trading. A business that leases premises has lower assets than one that owns them, so its turnover and ROCE are not like for like.",
    hints: ["Think of policies and of how assets are acquired."],
    explanation: "Two marks for each reason, one for the statement and one for the explanation.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 5,
    stem: "A company's ratios for the year all look better than last year's. The directors paid many of their suppliers early in the last week of the year. Explain how this action might affect the ratios and why users should be careful.",
    points: ["Paying suppliers early reduces payables and cash by the same amount", "When the current ratio is above 1, this raises the current ratio at the year end", "The improvement exists only at the year-end date and may reverse after the year end", "This is window dressing: it hides the real position through the year", "Users should look at trends, cash flow and the position at other dates before they rely on the ratios"],
    modelAnswer: "Paying suppliers early lowers both cash and payables, which raises a current ratio above 1 at the year end. This is window dressing: the improvement may reverse soon after the year end. Users should look at the cash flow and the trend as well.",
    hints: ["Which two items change, and by how much?"],
    explanation: "One mark each for the entries, the effect on the ratio, the temporary nature, the name and the caution.",
  });

  // Structured 1: 12 marks
  const a = coYear({ name: "Sengwa Bakery Ltd", year: 2024, revenue: 462000, cos: 277200, distribution: 18500, admin: 58300, finance: 3800, tax: 15000, nca: 205000, inventory: 22800, receivables: 18400, bank: 21000, payables: 25900, otherCL: 6400, loan: 40000, shareCapital: 120000 });
  const c = coYear({ name: "Sengwa Bakery Ltd", year: 2025, revenue: 498000, cos: 318700, distribution: 20400, admin: 62100, finance: 7300, tax: 9500, nca: 247000, inventory: 31600, receivables: 29300, bank: 4000, payables: 35800, otherCL: 5100, loan: 90000, shareCapital: 120000 });
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Sengwa Bakery Ltd supplies bread to schools in Gweru. Extracts from its statements for two years follow. Give percentages to one decimal place.\n\n${table(["Item", "2024 US\\$", "2025 US\\$"], [["Revenue", a.revenue, c.revenue], ["Gross profit", a.gp, c.gp], ["Profit from operations", a.pfo, c.pfo], ["Capital employed", a.capitalEmployed, c.capitalEmployed]])}`,
    parts: [
      P.group({ label: "(a)", stem: "Calculate the gross profit margin for:", parts: [
        P.num({ label: "(i)", marks: 1, kind: "pct", value: R.gpm(a), wrong: [R.markUp(a)], stem: "2024", explanation: `${F(a.gp)} ÷ ${F(a.revenue)} × 100 = ${p1(R.gpm(a))}%.` }),
        P.num({ label: "(ii)", marks: 1, kind: "pct", value: R.gpm(c), wrong: [R.markUp(c)], stem: "2025", explanation: `${F(c.gp)} ÷ ${F(c.revenue)} × 100 = ${p1(R.gpm(c))}%.` }),
      ] }),
      P.group({ label: "(b)", stem: "Calculate ROCE for:", parts: [
        P.num({ label: "(i)", marks: 2, kind: "pct", value: R.roce(a), wrong: [(a.profit / a.capitalEmployed) * 100], stem: "2024", explanation: `${F(a.pfo)} ÷ ${F(a.capitalEmployed)} × 100 = ${p1(R.roce(a))}%.` }),
        P.num({ label: "(ii)", marks: 2, kind: "pct", value: R.roce(c), wrong: [(c.profit / c.capitalEmployed) * 100], stem: "2025", explanation: `${F(c.pfo)} ÷ ${F(c.capitalEmployed)} × 100 = ${p1(R.roce(c))}%.` }),
      ] }),
      P.manual({ label: "(c)", marks: 4, stem: "Comment on the change in profitability between 2024 and 2025.", points: [`The gross margin fell from ${p1(R.gpm(a))}% to ${p1(R.gpm(c))}%`, `Profit from operations fell from ${F(a.pfo)} to ${F(c.pfo)} although revenue grew`, `ROCE fell from ${p1(R.roce(a))}% to ${p1(R.roce(c))}% as capital employed rose`, "A possible cause: higher costs of ingredients or lower prices, and extra capital not yet earning"], modelAnswer: "Revenue grew but the gross margin fell, so profit from operations fell. Capital employed rose, so ROCE fell. Dearer ingredients or price cuts could explain the margin, and the new capital has not yet earned a return.", explanation: "One mark each for the margin, the profit, ROCE and a cause." }),
      P.manual({ label: "(d)", marks: 2, stem: "State two limitations of using these ratios to judge the bakery.", points: ["Only two years of data, so no trend can be seen", "Non-financial factors, such as customer contracts and management, are not shown"], modelAnswer: "Two years of figures are not a trend, and the ratios do not show non-financial factors such as customer contracts.", explanation: "One mark for each valid limitation." }),
    ],
    hints: ["ROCE uses profit from operations."],
    explanation: "This item tests profitability ratios for two years with a comment and the limits of the analysis.",
  });

  // Structured 2: 16 marks
  const A = coYear({ name: "Gweru Wholesale Foods Ltd", year: "Business A", revenue: 960000, cos: 768000, distribution: 30000, admin: 66000, finance: 6000, tax: 22500, nca: 330000, inventory: 60000, receivables: 38000, bank: 12000, payables: 70000, otherCL: 15000, loan: 60000, shareCapital: 120000, creditSales: 864000, creditPurchases: 780000 });
  const B = coYear({ name: "Kadoma Retail Foods Ltd", year: "Business B", revenue: 552000, cos: 353280, distribution: 36000, admin: 99000, finance: 15000, tax: 9000, nca: 420000, inventory: 70000, receivables: 62000, bank: 4000, payables: 48000, otherCL: 12000, loan: 190000, shareCapital: 150000, creditSales: 486000, creditPurchases: 360000 });
  const rowsAB = [
    ["Revenue (US\\$)", A.revenue, B.revenue], ["Profit from operations (US\\$)", A.pfo, B.pfo], ["Capital employed (US\\$)", A.capitalEmployed, B.capitalEmployed],
    ["Gross profit margin (%)", p1(R.gpm(A)), p1(R.gpm(B))], ["ROCE (%)", p1(R.roce(A)), p1(R.roce(B))],
    ["Current ratio (x : 1)", p2(R.current(A)), p2(R.current(B))], ["Acid test ratio (x : 1)", p2(R.acid(A)), p2(R.acid(B))],
    ["Trade receivables days", p0(R.recDays(A, A.creditSales)), p0(R.recDays(B, B.creditSales))], ["Gearing (%)", p1(R.gearing(A)), p1(R.gearing(B))], ["Interest cover (times)", p1(R.cover(A)), p1(R.cover(B))],
  ];
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: `A bank has been asked for a loan of US\\$80,000 by two food distributors. Business A is Gweru Wholesale Foods Ltd and Business B is Kadoma Retail Foods Ltd. Extracts from their financial statements for the year ended 31 December 2025 and the ratios already calculated are below.\n\n${table(["Item", "Business A", "Business B"], rowsAB)}`,
    parts: [
      P.group({ label: "(a)", stem: "Calculate capital turnover (revenue ÷ capital employed) in times, to two decimal places, for:", parts: [
        P.num({ label: "(i)", marks: 2, kind: "times", dp: 2, value: A.revenue / A.capitalEmployed, wrong: [A.capitalEmployed / A.revenue], stem: "Business A", explanation: `${F(A.revenue)} ÷ ${F(A.capitalEmployed)} = ${p2(A.revenue / A.capitalEmployed)} times.` }),
        P.num({ label: "(ii)", marks: 2, kind: "times", dp: 2, value: B.revenue / B.capitalEmployed, wrong: [B.capitalEmployed / B.revenue], stem: "Business B", explanation: `${F(B.revenue)} ÷ ${F(B.capitalEmployed)} = ${p2(B.revenue / B.capitalEmployed)} times.` }),
      ] }),
      P.manual({ label: "(b)", marks: 4, stem: "Explain why Business A earns a higher ROCE than Business B although its gross profit margin is lower.", points: [`Business A's gross margin is lower (${p1(R.gpm(A))}% against ${p1(R.gpm(B))}%)`, `A's operating margin (${p1((A.pfo / A.revenue) * 100)}%) is no higher than B's (${p1((B.pfo / B.revenue) * 100)}%), so the margin is not the reason`, `A's capital turnover (${p2(A.revenue / A.capitalEmployed)} times) is far higher than B's (${p2(B.revenue / B.capitalEmployed)} times)`, "A sells a high volume at low prices using little capital; ROCE = margin × turnover"], modelAnswer: `Business A earns a thin gross margin but sells much more for each dollar of capital: its capital turnover is ${p2(A.revenue / A.capitalEmployed)} times against ${p2(B.revenue / B.capitalEmployed)} times for B. ROCE is operating margin multiplied by turnover, so A's turnover gives it the higher ROCE.`, explanation: "One mark each for the gross margin, the operating margins, the turnover and the link." }),
      P.manual({ label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", stem: "Evaluate which business is the better prospect for the loan and advise the bank. Use the ratios and refer to the limitations of the information.", points: [`A's ROCE of ${p1(R.roce(A))}% is much higher than B's ${p1(R.roce(B))}%: it earns more on its capital`, `A's gearing is ${p1(R.gearing(A))}% against ${p1(R.gearing(B))}% for B: the extra loan would add less risk to A`, `A's interest cover is ${p1(R.cover(A))} times against ${p1(R.cover(B))} for B: B has little room if profit falls`, `Liquidity: A's current ratio is ${p2(R.current(A))} and acid test ${p2(R.acid(A))} against ${p2(R.current(B))} and ${p2(R.acid(B))} for B: A is less liquid (low acid test), B is stronger in the short term`, "A's low acid test ratio means it relies on selling inventory; the bank should check its supplier terms and cash flow", "A collects receivables in " + p0(R.recDays(A, A.creditSales)) + " days against " + p0(R.recDays(B, B.creditSales)) + " for B, so A's credit control is good or its customers pay quickly", "Limit: one year only, and the businesses differ in the type of trade (wholesale or retail), policies and size", "Recommendation: lend to A (with security and a check on liquidity); B is the riskier because of its high gearing and low cover"], modelAnswer: `Business A is the better prospect: it earns ${p1(R.roce(A))}% on capital against ${p1(R.roce(B))}% for B, has lower gearing (${p1(R.gearing(A))}% against ${p1(R.gearing(B))}%) and a high interest cover. B is highly geared and its cover is low, so an extra loan would add risk. A's acid test ratio is low, so the bank should check cash flow and take security. One year of figures and the different trades are limits, but on these ratios the loan should go to A.`, explanation: "One point per creditworthy statement, up to 8; allow follow-through from the calculations." }),
    ],
    hints: ["ROCE = operating margin × capital turnover.", "Use gearing and interest cover for a lender."],
    explanation: "This item tests capital turnover, the margin and turnover link and an evaluation of two businesses for a lender.",
  });

  b.card("CONCEPT", "Steps of a ratio analysis", "Calculate, compare, explain, link, conclude and advise, state the limits.");
  b.card("FORMULA", "ROCE as a product", "ROCE = operating profit margin × capital turnover = (profit from operations ÷ revenue) × (revenue ÷ capital employed).");
  b.card("FACT", "Which ratios for which user?", "Lender: gearing, interest cover, liquidity. Supplier: current ratio, payables days. Shareholder: profitability and investment ratios. Manager: all, especially efficiency.");
  b.card("CONCEPT", "Limitations of ratios", "Historical; window dressing; different policies; inflation; no benchmark; seasonal trade; non-financial factors ignored; few periods.");
  b.card("DEFINITION", "What is **window dressing**?", "Arranging transactions near the year end so the statement of financial position looks better than the position through the year.");
  b.card("CONCEPT", "Why can a low margin be good?", "A high capital turnover can give a good ROCE: supermarkets earn thin margins on high volume.");
  b.card("FACT", "A report needs more than calculations", "Direction, cause, effect on the user, a conclusion with a recommendation and a stated limit.");
  b.card("CONCEPT", "Inter-firm comparison", "Comparing ratios with another business or the industry average; useful because there is no fixed standard for a good ratio.");
});
void r2; void rd; void ratios;
