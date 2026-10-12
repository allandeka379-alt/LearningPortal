// W3b: ratios.profitability
import { concept, P, ZIM, CAM, r2, chk, ratios, table } from "../lib.mjs";
import { coYear, R, splMd, sofpMd, mc, F, usd } from "../tables/w3b-lib.mjs";

const p1 = (v) => (Math.round(v * 10) / 10).toFixed(1);

concept("aacc.ratios.profitability", { file: "ratios/profitability", keyPrefix: "ratios.profitability" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which profit figure is used in the numerator of return on capital employed (ROCE)?",
    ok: ["Profit from operations", "Correct: it is the profit before finance costs and tax."],
    bad: [["Profit for the year", "That is after finance costs and tax; it is used for profit margin."], ["Gross profit", "Gross profit is before the operating expenses."], ["Profit before tax and after interest", "That is after finance costs, which reward the lenders whose capital is included."]],
    explanation: "ROCE = profit from operations ÷ capital employed × 100. Capital employed includes the loan notes, so the profit must be before their interest.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which ratio is calculated by dividing gross profit by cost of sales?",
    ok: ["Mark-up", "Correct: cost of sales is the base for mark-up."],
    bad: [["Gross profit margin", "Margin divides gross profit by revenue."], ["Expenses to revenue", "That ratio divides operating expenses by revenue."], ["Profit margin", "Profit margin divides profit for the year by revenue."]],
    explanation: "Mark-up = gross profit ÷ cost of sales × 100. Margin uses revenue as the base.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Capital employed, as used in ROCE, is made up of:",
    ok: ["issued shares, all reserves and non-current liabilities", "Correct: this equals total assets less current liabilities."],
    bad: [["issued shares and all reserves only", "That is equity; it excludes the loan notes."], ["total assets and current liabilities", "Current liabilities are deducted, not added."], ["non-current assets and working capital less all reserves", "Reserves are part of the capital employed."]],
    explanation: "Capital employed = issued shares + all reserves + non-current liabilities = total assets less current liabilities.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A trader adds a mark-up of 60% to cost. What is the gross profit margin on sales?",
    ok: ["37.5%", "Correct: 60 ÷ 160 × 100."],
    bad: [["60.0%", "That is the mark-up; margin uses revenue as the base."], ["40.0%", "This subtracts the mark-up from 100 instead of dividing by 160."], ["66.7%", "This is the mark-up that goes with a 40% margin; the two ratios have been reversed."]],
    hints: ["If cost is 100, the selling price is 160."],
    explanation: "Cost 100, profit 60, selling price 160, so the margin is 60 ÷ 160 = 37.5%.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Revenue and operating expenses both rose by 10%, but gross profit margin fell from 35% to 32%. What happened to the profit margin?",
    ok: ["It fell, because the lower margin on sales was not offset by cost control", "Correct: expenses grew in line with revenue so the full fall in margin passed through."],
    bad: [["It rose, because the higher revenue gave the business more profit in total", "Higher revenue helps only if the margin is kept."], ["It stayed the same, because expenses rose in line with revenue", "The gross margin fell, so less profit remains from each dollar."], ["It cannot be judged without knowing the rate of income tax", "A fall in gross margin with proportionate expenses lowers the profit margin whatever the tax."]],
    hints: ["Expenses to revenue stayed the same, so only the gross margin changed."],
    explanation: "With expenses to revenue unchanged, a fall of three percentage points in gross margin lowers the profit margin by the same amount before tax.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which change would most directly improve a company's gross profit margin?",
    ok: ["Buying inventory from a cheaper supplier at the same quality", "Correct: a lower cost of sales raises gross profit for the same revenue."],
    bad: [["Reducing the salaries of the administration staff and office costs", "Administrative expenses are below gross profit."], ["Repaying part of the loan notes from the bank balance", "That affects finance costs, which are below gross profit."], ["Selling surplus land to raise cash for the business", "A sale of land does not change the cost of goods sold."]],
    hints: ["Gross profit is revenue less cost of sales only."],
    explanation: "Gross margin depends on the selling price and the cost of goods sold; the other changes affect expenses or finance, which are deducted later.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "At the year end a company raises new loan notes and holds the cash unspent. Profit from operations is unchanged. What happens to ROCE?",
    ok: ["It falls, because capital employed increases", "Correct: the numerator is unchanged and the denominator rises."],
    bad: [["It rises, because the company has more cash", "Cash does not add to operating profit."], ["It is unchanged, because profit from operations is unchanged", "The denominator has increased."], ["It rises, because loan notes are cheaper than shares", "The cost of finance is not part of ROCE."]],
    hints: ["Capital employed includes non-current liabilities."],
    explanation: "Loan notes are part of capital employed. With the same profit from operations a larger base gives a lower return.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Two bakeries have the same ROCE. Bakery P has a high margin and slow capital turnover; Bakery Q has a low margin and fast capital turnover. Which statement is correct?",
    ok: ["Both can earn the same return by different routes", "Correct: ROCE = margin × capital turnover."],
    bad: [["Bakery P must be better managed", "Equal ROCE shows equal overall return; management quality is not shown."], ["Bakery Q must have lower costs", "A low margin does not prove lower costs."], ["The ratios cannot be equal when the margins differ", "Different margins can be offset by different turnover."]],
    hints: ["Think of ROCE as margin multiplied by turnover."],
    explanation: "A high margin with slow turnover and a low margin with fast turnover can give the same ROCE.",
  });

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A mark-up of 50% on cost is the same as a gross profit margin of 50% on sales.", answer: false, explanation: "False. A mark-up of 50% gives a margin of 50 ÷ 150 = 33.3%." });
  b.tf({ d: 3, skill: "UNDERSTANDING", daily: true, stem: "ROCE can fall in a year when profit from operations rises.", answer: true, hints: ["What happens to the denominator?"], explanation: "True. If capital employed rises faster than profit from operations, ROCE falls." });

  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each ratio to its formula.",
    pairs: ["Gross profit margin", "Mark-up", "Profit margin", "ROCE"],
    right: ["Gross profit ÷ revenue × 100", "Gross profit ÷ cost of sales × 100", "Profit for the year ÷ revenue × 100", "Profit from operations ÷ capital employed × 100"],
    rightIndex: [0, 1, 2, 3],
    explanation: "Margins use revenue as the base, mark-up uses cost of sales and ROCE uses the capital employed.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences.",
    template: "Gross profit margin is calculated as gross profit divided by {{blank:a}}. Expenses to revenue shows the control of {{blank:b}} costs.",
    blanks: [{ id: "a", accepted: ["revenue"], choices: ["revenue", "cost of sales", "capital employed"] }, { id: "b", accepted: ["operating"], choices: ["operating", "direct", "finance"] }],
    explanation: "Gross profit margin uses revenue as the base; expenses to revenue measures distribution and administrative expenses against revenue.",
  });
  b.short({ d: 1, skill: "RECALL", stem: "Name the ratio calculated as profit from operations ÷ capital employed × 100.", accepted: ["ROCE", "return on capital employed"], explanation: "It is return on capital employed (ROCE)." });

  // Numerical items on a fresh data set
  const k1 = coYear({ name: "Kadoma Cables Ltd", year: 2024, revenue: 218000, cos: 141700, distribution: 9100, admin: 27400, finance: 3300, tax: 6400, nca: 98000, inventory: 21000, receivables: 17500, bank: "plug", payables: 14200, otherCL: 3900, loan: 33000, shareCapital: 70000, retained: 52000 });
  const k = coYear({ name: "Kadoma Cables Ltd", year: 2025, revenue: 241500, cos: 169050, distribution: 10300, admin: 28900, finance: 5600, tax: 4100, nca: 128000, inventory: 24000, receivables: 20600, bank: "plug", payables: 16800, otherCL: 3100, loan: 62000, shareCapital: 70000, retained: 69550 });
  const a = coYear({ name: "Chinhoyi Plastics Ltd", year: 2024, revenue: 312500, cos: 203125, distribution: 16300, admin: 44700, finance: 5200, tax: 9920, nca: 154000, inventory: 31400, receivables: 27600, bank: "plug", payables: 21900, otherCL: 5800, loan: 51000, shareCapital: 90000, retained: 72000 });
  const c = coYear({ name: "Chinhoyi Plastics Ltd", year: 2025, revenue: 346800, cos: 236000, distribution: 18200, admin: 49100, finance: 7900, tax: 8700, nca: 196000, inventory: 39600, receivables: 33400, bank: "plug", payables: 27200, otherCL: 4900, loan: 78000, shareCapital: 90000, retained: 89900 });
  b.num({
    d: 2, skill: "APPLICATION", kind: "pct", value: R.gpm(k), calculator: true, daily: true, wrong: [R.markUp(k), (k.cos / k.revenue) * 100],
    stem: `A company's revenue was ${usd(k.revenue)} and its cost of sales was ${usd(k.cos)}. Calculate the gross profit margin as a percentage to one decimal place.`,
    explanation: `Gross profit = ${F(k.revenue)} - ${F(k.cos)} = ${F(k.gp)}. Margin = ${F(k.gp)} ÷ ${F(k.revenue)} × 100 = ${p1(R.gpm(k))}%. Using cost of sales as the base would give the mark-up of ${p1(R.markUp(k))}%.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", kind: "pct", value: R.roce(k), calculator: true, wrong: [(k.pfo / k.equity) * 100, (k.profit / k.capitalEmployed) * 100],
    stem: `At 31 December 2025 a company had issued share capital of ${usd(k.shareCapital)}, retained earnings of ${usd(k.retained)} and loan notes of ${usd(k.loan)}. Its profit from operations for the year was ${usd(k.pfo)} and its profit for the year was ${usd(k.profit)}. Calculate ROCE as a percentage to one decimal place.`,
    hints: ["Capital employed includes the loan notes.", "Use profit before finance costs and tax."],
    explanation: `Capital employed = ${F(k.shareCapital)} + ${F(k.retained)} + ${F(k.loan)} = ${F(k.capitalEmployed)}. ROCE = ${F(k.pfo)} ÷ ${F(k.capitalEmployed)} × 100 = ${p1(R.roce(k))}%. Dividing by equity alone or using profit for the year are the usual errors.`,
  });
  const mm = ratios.marginFromMarkUp(40);
  b.num({
    d: 3, skill: "APPLICATION", kind: "pct", value: mm, calculator: true, wrong: [40, ratios.markUpFromMargin(40)],
    stem: "A shop marks up all goods by 40% on cost. Calculate the gross profit margin as a percentage to one decimal place.",
    hints: ["Let cost be 100."],
    explanation: "Cost 100, selling price 140, profit 40. Margin = 40 ÷ 140 × 100 = 28.6%. The mark-up (40%) uses cost as the base.",
  });
  b.num({
    d: 3, skill: "APPLICATION", kind: "pct", value: R.roe(k), calculator: true, applies: ZIM, wrong: [R.roa(k), R.roce(k)],
    stem: `ZIMSEC style. Return on equity = profit for the year ÷ equity × 100. A company's profit for the year was ${usd(k.profit)} and its equity was ${usd(k.equity)}. Calculate return on equity as a percentage to one decimal place.`,
    hints: ["Equity is shares plus all reserves."],
    explanation: `${F(k.profit)} ÷ ${F(k.equity)} × 100 = ${p1(R.roe(k))}%. Dividing by total assets would give return on assets.`,
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why ROCE uses profit from operations and not profit for the year.",
    points: ["Capital employed includes the non-current liabilities, whose lenders are paid through finance costs", "So the profit must be before finance costs (and tax) to give a fair return on all the capital"],
    modelAnswer: "Capital employed includes loan notes. The lenders' reward is the interest, so profit is taken before finance costs to match the capital it is compared with.",
    explanation: "One mark for the loan notes being in capital employed and one for profit before interest matching it.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 4,
    stem: `A trader's gross profit margin fell from 38.0% to 34.0% while revenue rose by 15%. Suggest two possible reasons and comment on whether the higher revenue was worthwhile.`,
    points: ["Reason 1: the selling price was reduced (discounts) to win sales", "Reason 2: the cost of goods or ingredients rose and was not passed on, or the sales mix moved to low-margin items", "Gross profit rose by much less than revenue (about 2.9% against 15%)", "Judgement: the extra sales were worthwhile only if the extra gross profit exceeded the extra expenses"],
    modelAnswer: "A price cut to win customers or dearer goods could explain the lower margin. Gross profit rose by only about 2.9% on revenue growth of 15%, so each extra dollar of sales earned less. The growth was worthwhile only if the extra gross profit covered the extra expenses.",
    hints: ["Link each reason to the margin, not to revenue."],
    explanation: "Two marks for reasons, one for the comparison of growth rates and one for a judgement.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 5,
    stem: `The directors of Kadoma Cables Ltd note that ROCE fell from ${p1(R.roce(k1))}% in 2024 to ${p1(R.roce(k))}% in 2025 although revenue rose. Use the figures to explain the fall: revenue ${F(k1.revenue)} to ${F(k.revenue)}; gross profit margin ${p1(R.gpm(k1))}% to ${p1(R.gpm(k))}%; capital employed ${F(k1.capitalEmployed)} to ${F(k.capitalEmployed)}.`,
    points: [`The gross profit margin fell from ${p1(R.gpm(k1))}% to ${p1(R.gpm(k))}%`, `Profit from operations fell from ${F(k1.pfo)} to ${F(k.pfo)} although revenue rose`, `Capital employed increased from ${F(k1.capitalEmployed)} to ${F(k.capitalEmployed)}`, "A lower numerator over a larger denominator lowers ROCE", "Conclusion: the new capital (loan notes) has not yet earned a return; the directors should restore the margin"],
    modelAnswer: `Revenue rose but the gross margin fell, so profit from operations fell from ${F(k1.pfo)} to ${F(k.pfo)}. At the same time capital employed rose to ${F(k.capitalEmployed)} because of extra loan notes. A smaller profit over a bigger base gives the lower ROCE; the directors should restore the margin.`,
    hints: ["Treat ROCE as a fraction: what happened to the top and to the bottom?"],
    explanation: "One mark each for the margin, the fall in profit from operations, the rise in capital, the effect on the fraction and the conclusion.",
  });

  // Structured 1: 12 marks
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Chinhoyi Plastics Ltd sells buckets and water tanks. Extracts from its statements are given for two years. Use year-end figures and give percentages to one decimal place.\n\n${splMd(a, c, { title: "Statement of profit or loss (extract)" })}\n\n${table(["Capital employed at 31 December", "2024 US\\$", "2025 US\\$"], [["Issued share capital", a.shareCapital, c.shareCapital], ["Retained earnings", a.retained, c.retained], ["Loan notes", a.loan, c.loan], ["**Capital employed**", a.capitalEmployed, c.capitalEmployed]])}`,
    parts: [
      P.group({ label: "(a)", stem: "Calculate the gross profit margin for:", parts: [
        P.num({ label: "(i)", marks: 1, kind: "pct", value: R.gpm(a), wrong: [R.markUp(a)], stem: "2024", explanation: `${F(a.gp)} ÷ ${F(a.revenue)} × 100 = ${p1(R.gpm(a))}%.` }),
        P.num({ label: "(ii)", marks: 1, kind: "pct", value: R.gpm(c), wrong: [R.markUp(c)], stem: "2025", explanation: `${F(c.gp)} ÷ ${F(c.revenue)} × 100 = ${p1(R.gpm(c))}%.` }),
      ] }),
      P.group({ label: "(b)", stem: "Calculate ROCE for:", parts: [
        P.num({ label: "(i)", marks: 2, kind: "pct", value: R.roce(a), wrong: [R.roce(a) * 0.8], stem: "2024", explanation: `${F(a.pfo)} ÷ ${F(a.capitalEmployed)} × 100 = ${p1(R.roce(a))}%.` }),
        P.num({ label: "(ii)", marks: 2, kind: "pct", value: R.roce(c), wrong: [(c.profit / c.capitalEmployed) * 100], stem: "2025", explanation: `${F(c.pfo)} ÷ ${F(c.capitalEmployed)} × 100 = ${p1(R.roce(c))}%.` }),
      ] }),
      P.num({ label: "(c)", marks: 2, kind: "pct", value: R.pm(c), wrong: [R.pm(a)], stem: "Calculate the profit margin for 2025.", explanation: `${F(c.profit)} ÷ ${F(c.revenue)} × 100 = ${p1(R.pm(c))}%.` }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why ROCE fell between 2024 and 2025.", points: [`Profit from operations fell (${F(a.pfo)} to ${F(c.pfo)}) because the gross margin fell`, `Capital employed rose (${F(a.capitalEmployed)} to ${F(c.capitalEmployed)}) because of the extra loan notes`, "A lower profit on a larger capital base gives a lower return"], modelAnswer: `Profit from operations fell because the gross margin fell from ${p1(R.gpm(a))}% to ${p1(R.gpm(c))}%, and capital employed rose through extra loan notes, so the return fell.`, explanation: "One mark each for the profit, the capital and the combined effect." }),
    ],
    hints: ["Capital employed is given in the table.", "ROCE uses profit from operations."],
    explanation: "This item tests gross margin, ROCE and profit margin with an explanation of the movement.",
  });

  // Structured 2: 16 marks, two businesses
  const x = coYear({ name: "Bulawayo Tuck Supplies Ltd", year: "Bulawayo", revenue: 480000, cos: 384000, distribution: 18000, admin: 36500, finance: 3000, tax: 7500, nca: 110000, inventory: 40000, receivables: 20000, bank: "plug", payables: 30000, otherCL: 4000, loan: 30000, shareCapital: 100000, retained: 50000 });
  const y = coYear({ name: "Masvingo Wholesale Ltd", year: "Masvingo", revenue: 270000, cos: 175500, distribution: 11000, admin: 27500, finance: 4500, tax: 12000, nca: 140000, inventory: 45000, receivables: 38000, bank: "plug", payables: 25000, otherCL: 5000, loan: 60000, shareCapital: 100000, retained: 65000 });
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: `Two wholesalers, Bulawayo Tuck Supplies Ltd and Masvingo Wholesale Ltd, report the following for the year ended 31 December 2025. Use year-end figures and give percentages to one decimal place.\n\n${table(["Item", "Bulawayo US\\$", "Masvingo US\\$"], [["Revenue", x.revenue, y.revenue], ["Cost of sales", x.cos, y.cos], ["Distribution costs and administrative expenses", x.opex, y.opex], ["Profit from operations", x.pfo, y.pfo], ["Profit for the year", x.profit, y.profit], ["Capital employed", x.capitalEmployed, y.capitalEmployed]])}`,
    parts: [
      P.group({ label: "(a)", stem: "Calculate the gross profit margin of:", parts: [
        P.num({ label: "(i)", marks: 1, kind: "pct", value: R.gpm(x), wrong: [R.markUp(x)], stem: "Bulawayo", explanation: `${F(x.gp)} ÷ ${F(x.revenue)} × 100 = ${p1(R.gpm(x))}%.` }),
        P.num({ label: "(ii)", marks: 1, kind: "pct", value: R.gpm(y), wrong: [R.markUp(y)], stem: "Masvingo", explanation: `${F(y.gp)} ÷ ${F(y.revenue)} × 100 = ${p1(R.gpm(y))}%.` }),
      ] }),
      P.group({ label: "(b)", stem: "Calculate ROCE of:", parts: [
        P.num({ label: "(i)", marks: 2, kind: "pct", value: R.roce(x), wrong: [(x.profit / x.capitalEmployed) * 100], stem: "Bulawayo", explanation: `${F(x.pfo)} ÷ ${F(x.capitalEmployed)} × 100 = ${p1(R.roce(x))}%.` }),
        P.num({ label: "(ii)", marks: 2, kind: "pct", value: R.roce(y), wrong: [(y.profit / y.capitalEmployed) * 100], stem: "Masvingo", explanation: `${F(y.pfo)} ÷ ${F(y.capitalEmployed)} × 100 = ${p1(R.roce(y))}%.` }),
      ] }),
      P.group({ label: "(c)", stem: "Calculate expenses to revenue (distribution costs and administrative expenses) of:", parts: [
        P.num({ label: "(i)", marks: 1, kind: "pct", value: R.e2r(x), wrong: [R.gpm(x)], stem: "Bulawayo", explanation: `${F(x.opex)} ÷ ${F(x.revenue)} × 100 = ${p1(R.e2r(x))}%.` }),
        P.num({ label: "(ii)", marks: 1, kind: "pct", value: R.e2r(y), wrong: [R.gpm(y)], stem: "Masvingo", explanation: `${F(y.opex)} ÷ ${F(y.revenue)} × 100 = ${p1(R.e2r(y))}%.` }),
      ] }),
      P.manual({ label: "(d)", marks: 8, type: "EXTENDED_RESPONSE", stem: "Evaluate the profitability of the two businesses and advise a bank which should receive a loan for expansion. Use your calculations.", points: [`Masvingo has the higher gross margin (${p1(R.gpm(y))}% against ${p1(R.gpm(x))}%)`, `Bulawayo spends a lower share of revenue on expenses (${p1(R.e2r(x))}% against ${p1(R.e2r(y))}%)`, "Bulawayo's low margin suggests a high-volume, low-price strategy", `ROCE: ${p1(R.roce(x))}% for Bulawayo and ${p1(R.roce(y))}% for Masvingo`, "Identifies the business with the better ROCE and links it to margin and capital", "Notes that Masvingo has more loan notes already, so more finance cost and risk", "Recommends one business with a reason", "A limit: one year only, or different accounting policies, or non-financial factors such as management and location"], modelAnswer: `Masvingo earns the higher gross margin (${p1(R.gpm(y))}%) but spends more of its revenue on expenses. ROCE is ${p1(R.roce(y))}% against ${p1(R.roce(x))}% for Bulawayo, so Masvingo gives the better return on its capital although it already carries more loan notes. On profitability alone Masvingo is the better borrower, but one year's figures are not enough; the bank should also consider cash flow, security and the quality of management.`, explanation: "One point per creditworthy comparison or judgement, up to 8; allow follow-through from calculated ratios." }),
    ],
    hints: ["Compute the same ratios for both businesses first.", "Link ROCE to margin and capital."],
    explanation: "This item compares two businesses on margin, expenses and ROCE and asks for a reasoned recommendation.",
  });

  b.card("FORMULA", "Gross profit margin", "Gross profit ÷ revenue × 100.");
  b.card("FORMULA", "Mark-up", "Gross profit ÷ cost of sales × 100.");
  b.card("FORMULA", "Profit margin", "Profit for the year ÷ revenue × 100.");
  b.card("FORMULA", "ROCE", "Profit from operations ÷ capital employed × 100. Capital employed = issued shares + all reserves + non-current liabilities.");
  b.card("FACT", "Capital employed check", "Capital employed also equals total assets less current liabilities. Use it to check your figure.");
  b.card("FORMULA", "Margin from mark-up", "Margin = mark-up ÷ (100 + mark-up) × 100. A 25% mark-up is a 20% margin.");
  b.card("FORMULA", "Expenses to revenue", "Expenses ÷ revenue × 100. Shows how well operating costs are controlled.");
  b.card("CONCEPT", "Why is profit before interest used in ROCE?", "Because capital employed includes the loan notes, whose reward is the interest; profit must be before finance costs and tax.");
  b.card("FORMULA", "Return on equity (ZIMSEC)", "Profit for the year ÷ equity × 100. Return on assets divides by total assets. State the formula you use.", undefined, { applies: ZIM });
  b.card("CONCEPT", "Explaining a fall in profit margin", "Check gross margin first, then expenses to revenue, then finance costs and tax. Name the cause and quote the figures.");
});
void CAM; void sofpMd; void r2;
