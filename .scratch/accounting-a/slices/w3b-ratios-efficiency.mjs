// W3b: ratios.efficiency
import { concept, P, ZIM, table, chk, r2, ratios } from "../lib.mjs";
import { coYear, R, mc, F, usd } from "../tables/w3b-lib.mjs";

const p0 = (v) => String(Math.round(v));
const p1 = (v) => (Math.round(v * 10) / 10).toFixed(1);
const p2 = (v) => (Math.round(v * 100) / 100).toFixed(2);

concept("aacc.ratios.efficiency", { file: "ratios/efficiency", keyPrefix: "ratios.efficiency" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which figure is used as the base when calculating inventory turnover in days?",
    ok: ["Cost of sales", "Correct: inventory is valued at cost."],
    bad: [["Revenue", "Revenue includes profit; inventory is held at cost."], ["Credit purchases", "That is the base for payables days."], ["Gross profit", "Gross profit is not the cost of the goods."]],
    explanation: "Inventory days = average (or closing) inventory ÷ cost of sales × 365.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Trade receivables days are calculated by dividing trade receivables by:",
    ok: ["credit sales, then multiplying by 365", "Correct: only credit sales create trade receivables."],
    bad: [["cost of sales, then multiplying by 365", "Cost of sales is the base for inventory days."], ["credit purchases, then multiplying by 365", "That is the base for payables days."], ["total assets, then multiplying by 365", "Total assets are not related to credit customers."]],
    explanation: "Trade receivables days = trade receivables ÷ credit sales × 365.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Trade payables days measure the average time taken to:",
    ok: ["pay suppliers for goods bought on credit", "Correct: calculated from trade payables and credit purchases."],
    bad: [["collect cash from customers who bought on credit", "That is trade receivables days."], ["sell the inventory held at the year end", "That is inventory days."], ["repay the loan notes that are due in five years", "Loan notes are not trade payables."]],
    explanation: "Trade payables days = trade payables ÷ credit purchases × 365.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "A company's trade receivables days rose from 35 to 58 although its credit terms are 30 days. What is the most likely cause?",
    ok: ["Weak credit control, with customers paying late", "Correct: collection is far slower than the terms allow."],
    bad: [["Better credit control, with customers paying early", "Early payment would reduce the days."], ["A fall in the volume of credit purchases", "Purchases do not affect receivables days."], ["A fall in the cost of sales", "Cost of sales is not used in this ratio."]],
    hints: ["Compare the figure with the credit period given."],
    explanation: "Receivables days well above the credit period suggest customers are not paying on time, so credit control is weak.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A shop's inventory turnover rose from 6 times to 8 times a year. Which statement is most likely to be true?",
    ok: ["Inventory is being sold more quickly, so inventory days have fallen", "Correct: higher turnover means fewer days to sell."],
    bad: [["Inventory is being sold more slowly, so inventory days have risen", "That would reduce the number of times."], ["The shop is holding more inventory to support the same level of sales", "More inventory for the same cost of sales lowers the turnover."], ["Credit customers are paying more slowly than in the earlier year", "Receivables do not affect inventory turnover."]],
    hints: ["Times and days move in opposite directions."],
    explanation: "Inventory turnover in times and in days are two views of the same speed: more times a year means fewer days.",
  });
  mc(b, {
    d: 3, skill: "EVALUATION",
    stem: "Which action is most likely to reduce a company's trade receivables days?",
    ok: ["Offering a discount to customers who pay within 10 days", "Correct: it encourages earlier payment, at a cost."],
    bad: [["Extending the credit period given to customers from 30 to 60 days", "That would increase the days."], ["Paying suppliers earlier in the month than before", "That affects payables days, not receivables."], ["Buying more inventory from suppliers on credit terms", "That affects inventory and payables."]],
    hints: ["Which action gets customers to pay sooner?"],
    explanation: "A cash discount gives customers a reason to pay early; it shortens receivables days but costs the discount.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Revenue rose by 5% but non-current asset turnover fell, because a new factory was completed late in the year. What is the best explanation?",
    ok: ["The carrying amount of non-current assets rose faster than revenue", "Correct: the new factory raised the denominator before it produced sales."],
    bad: [["Revenue fell relative to the cost of sales in the same year", "The ratio uses revenue and non-current assets only."], ["Depreciation was not charged on the new factory in the year", "That would raise the carrying amount, but it is not the stated cause."], ["The company collected its trade receivables more quickly", "Receivables are current assets and are not in this ratio."]],
    hints: ["Which part of the fraction increased most?"],
    explanation: "A new asset adds to non-current assets at once, while its revenue builds up only gradually, so the turnover falls at first.",
  });

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A longer time to sell inventory always means higher profit because prices can be raised.", answer: false, explanation: "False. A longer holding period ties up cash and risks damage or obsolescence; it does not raise profit." });
  b.tf({ d: 3, skill: "UNDERSTANDING", daily: true, stem: "A rise in trade payables days improves a business's cash position in the short term.", answer: true, hints: ["Who is financing the business?"], explanation: "True. Paying suppliers later keeps cash in the business, although suppliers may withdraw credit or discounts." });

  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each ratio to its formula.",
    pairs: ["Inventory turnover (days)", "Trade receivables days", "Trade payables days", "Non-current asset turnover"],
    right: ["Inventory ÷ cost of sales × 365", "Trade receivables ÷ credit sales × 365", "Trade payables ÷ credit purchases × 365", "Revenue ÷ non-current assets"],
    rightIndex: [0, 1, 2, 3],
    explanation: "Each ratio compares a balance with the flow that creates it: cost of sales for inventory, credit sales for receivables, credit purchases for payables.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences.",
    template: "Rate of inventory turnover is cost of sales divided by {{blank:a}} inventory. A longer period of {{blank:b}} days means customers are paying more slowly.",
    blanks: [{ id: "a", accepted: ["average"], choices: ["average", "opening", "gross"] }, { id: "b", accepted: ["receivables"], choices: ["receivables", "payables", "inventory"] }],
    explanation: "The Cambridge appendix divides cost of sales by average inventory; slower collection shows as higher receivables days.",
  });
  b.short({ d: 1, skill: "RECALL", stem: "By what number are inventory, receivables and payables ratios multiplied to give a figure in days?", accepted: ["365"], explanation: "The balance is divided by the annual flow and multiplied by 365 days." });

  // numerical items, each on its own figures
  const invDays = (3800 + 4100) / 2; void invDays;
  const idv = (47300 / 311000) * 365;
  b.num({
    d: 2, skill: "APPLICATION", kind: "days", value: idv, calculator: true, daily: true, wrong: [(47300 / 428000) * 365, 311000 / 47300],
    stem: `A company's cost of sales for the year was ${usd(311000)} and its revenue was ${usd(428000)}. Closing inventory was ${usd(47300)}. Using the closing inventory, calculate inventory turnover in days to the nearest whole day.`,
    explanation: `${F(47300)} ÷ ${F(311000)} × 365 = ${p0(idv)} days. Using revenue as the base would give ${p0((47300 / 428000) * 365)} days.`,
  });
  const rdv = (63400 / 352000) * 365;
  b.num({
    d: 2, skill: "APPLICATION", kind: "days", value: rdv, calculator: true, wrong: [(63400 / 470000) * 365, (352000 / 63400)],
    stem: `A company had revenue of ${usd(470000)}, of which ${usd(352000)} was on credit. Trade receivables at the year end were ${usd(63400)}. Calculate trade receivables days to the nearest whole day.`,
    hints: ["Use credit sales, not total revenue."],
    explanation: `${F(63400)} ÷ ${F(352000)} × 365 = ${p0(rdv)} days. Using total revenue would give ${p0((63400 / 470000) * 365)} days and understate the delay.`,
  });
  const avgInv = (38600 + 45400) / 2;
  const turn = 301140 / avgInv;
  b.calc({
    d: 3, skill: "APPLICATION", kind: "times", value: turn, dp: 1, calculator: true, wrong: [301140 / 45400, 301140 / 38600],
    stem: `Inventory was ${usd(38600)} at 1 January and ${usd(45400)} at 31 December. Cost of sales for the year was ${usd(301140)}. Calculate the rate of inventory turnover in times, using average inventory, to one decimal place.`,
    hints: ["Average inventory = (opening + closing) ÷ 2."],
    explanation: `Average inventory = (${F(38600)} + ${F(45400)}) ÷ 2 = ${F(avgInv)}. Turnover = ${F(301140)} ÷ ${F(avgInv)} = ${p1(turn)} times. Using the closing figure alone gives ${p1(301140 / 45400)} times.`,
  });
  const tat = ratios.totalAssetsTurnover(560800, 412000);
  b.num({
    d: 3, skill: "APPLICATION", kind: "times", value: tat, dp: 2, calculator: true, applies: ZIM, wrong: [560800 / 138000, 412000 / 560800],
    stem: `ZIMSEC style. Total assets turnover = revenue ÷ total assets. A company's revenue was ${usd(560800)} and its total assets were ${usd(412000)}, of which current assets were ${usd(138000)}. Calculate total assets turnover in times to two decimal places.`,
    hints: ["Use total assets, not current assets."],
    explanation: `${F(560800)} ÷ ${F(412000)} = ${p2(tat)} times. Dividing by current assets would give current assets turnover, ${p2(560800 / 138000)} times.`,
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why a business may want its trade payables days to be longer than its trade receivables days.",
    points: ["It receives cash from customers before it has to pay its suppliers", "Suppliers then finance part of the working capital, so less bank finance is needed"],
    modelAnswer: "If customers pay before the suppliers are paid, the supplier credit finances the business, and the business needs less cash or overdraft to run.",
    explanation: "One mark for the timing and one for the effect on finance.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 4,
    stem: "A company's inventory days fell from 62 to 40. Give two possible benefits and one possible danger.",
    points: ["Benefit 1: less cash is tied up in inventory", "Benefit 2: lower storage costs and less risk of damage or obsolescence", "Danger: running out of items, losing sales and customers", "A judgement that the improvement is worthwhile only if sales are not lost"],
    modelAnswer: "Faster stock turnover frees cash and cuts storage costs and the risk of obsolete items. The danger is stock-outs that lose sales, so it is good only if customers can still buy what they want.",
    hints: ["Think of both cash and customers."],
    explanation: "Two marks for benefits, one for the danger and one for the judgement.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 5,
    stem: "A company reduced its trade payables days from 48 to 31 in a year when its receivables days rose from 40 to 55. Explain the effect on the company and suggest one action.",
    points: ["Customers take longer to pay while suppliers are paid sooner", "Cash is absorbed twice: less supplier finance and more cash tied up in receivables", "The company may need an overdraft, which has a finance cost", "Suppliers may now be demanding earlier payment, or the company is taking early-payment discounts", "Action: stricter credit control or a discount for early payment; or negotiate longer supplier terms"],
    modelAnswer: "The company is paid more slowly and pays more quickly, so cash is squeezed from both sides and it may have to borrow. It should improve credit control or offer an early-payment discount, or ask suppliers for longer terms.",
    hints: ["Consider the cash effect of each change."],
    explanation: "One mark each for the two movements, the effect on cash and finance, a possible cause and an action.",
  });

  // Structured 1: 12 marks
  const a = coYear({ name: "Gokwe Cotton Ltd", year: 2024, revenue: 385000, cos: 262000, distribution: 0, admin: 0, finance: 0, tax: 0, nca: 214000, inventory: 41800, receivables: 52300, bank: 7000, payables: 33600, otherCL: 6900, loan: 0, shareCapital: 120000, creditSales: 331000, creditPurchases: 249500 });
  const c = coYear({ name: "Gokwe Cotton Ltd", year: 2025, revenue: 421000, cos: 291400, distribution: 0, admin: 0, finance: 0, tax: 0, nca: 233000, inventory: 63700, receivables: 81900, bank: 2000, payables: 37800, otherCL: 7800, loan: 0, shareCapital: 120000, creditSales: 368000, creditPurchases: 317500 });
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Gokwe Cotton Ltd buys seed cotton from farmers and sells lint to spinners. Use year-end balances and give days to the nearest whole day.\n\n${table(["Item", "2024 US\\$", "2025 US\\$"], [["Cost of sales", a.cos, c.cos], ["Credit sales", a.creditSales, c.creditSales], ["Credit purchases", a.creditPurchases, c.creditPurchases], ["Inventory", a.inventory, c.inventory], ["Trade receivables", a.receivables, c.receivables], ["Trade payables", a.payables, c.payables]])}`,
    parts: [
      P.group({ label: "(a)", stem: "Calculate inventory turnover in days for:", parts: [
        P.num({ label: "(i)", marks: 2, kind: "days", value: R.invDays(a), wrong: [R.invTimes(a)], stem: "2024", explanation: `${F(a.inventory)} ÷ ${F(a.cos)} × 365 = ${p0(R.invDays(a))} days.` }),
        P.num({ label: "(ii)", marks: 2, kind: "days", value: R.invDays(c), wrong: [R.invTimes(c)], stem: "2025", explanation: `${F(c.inventory)} ÷ ${F(c.cos)} × 365 = ${p0(R.invDays(c))} days.` }),
      ] }),
      P.group({ label: "(b)", stem: "Calculate trade receivables days for:", parts: [
        P.num({ label: "(i)", marks: 2, kind: "days", value: R.recDays(a, a.creditSales), wrong: [R.recDays(a, a.revenue)], stem: "2024", explanation: `${F(a.receivables)} ÷ ${F(a.creditSales)} × 365 = ${p0(R.recDays(a, a.creditSales))} days.` }),
        P.num({ label: "(ii)", marks: 2, kind: "days", value: R.recDays(c, c.creditSales), wrong: [R.recDays(c, c.revenue)], stem: "2025", explanation: `${F(c.receivables)} ÷ ${F(c.creditSales)} × 365 = ${p0(R.recDays(c, c.creditSales))} days.` }),
      ] }),
      P.manual({ label: "(c)", marks: 4, stem: "Explain why the company's cash balance fell during 2025.", points: [`Inventory days rose from ${p0(R.invDays(a))} to ${p0(R.invDays(c))}, so more cash was tied up in inventory`, `Receivables days rose from ${p0(R.recDays(a, a.creditSales))} to ${p0(R.recDays(c, c.creditSales))}, so customers took longer to pay`, "Inventory rose by US\\$" + F(c.inventory - a.inventory) + " and receivables by US\\$" + F(c.receivables - a.receivables) + ", much faster than the rise in revenue", "These increases in working capital used cash, which fell from US\\$" + F(a.bank) + " to US\\$" + F(c.bank)], modelAnswer: `Both inventory and receivables took longer to turn into cash. Inventory days rose to ${p0(R.invDays(c))} and receivables days to ${p0(R.recDays(c, c.creditSales))}, so the extra working capital absorbed cash and the balance fell to US\\$${F(c.bank)}.`, explanation: "One mark for each piece of evidence linked to cash." }),
    ],
    hints: ["Use cost of sales for inventory and credit sales for receivables."],
    explanation: "This item tests inventory days and receivables days for two years and links them to cash.",
  });

  // Structured 2: 16 marks, working capital management and evaluation
  const e = coYear({ name: "Hwange Fresh Foods Ltd", year: 2024, revenue: 524000, cos: 366800, distribution: 0, admin: 0, finance: 0, tax: 0, nca: 280000, inventory: 27300, receivables: 61200, bank: 12500, payables: 48700, otherCL: 9400, loan: 0, shareCapital: 150000, creditSales: 458000, creditPurchases: 351000 });
  const f = coYear({ name: "Hwange Fresh Foods Ltd", year: 2025, revenue: 566000, cos: 407500, distribution: 0, admin: 0, finance: 0, tax: 0, nca: 342000, inventory: 33800, receivables: 74100, bank: 4600, payables: 39400, otherCL: 8600, loan: 0, shareCapital: 150000, creditSales: 491000, creditPurchases: 405000 });
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: `Hwange Fresh Foods Ltd supplies packed vegetables to hotels and shops. Use year-end balances. Give days to the nearest whole day and turnover to two decimal places.\n\n${table(["Item", "2024 US\\$", "2025 US\\$"], [["Revenue", e.revenue, f.revenue], ["Credit sales", e.creditSales, f.creditSales], ["Cost of sales", e.cos, f.cos], ["Credit purchases", e.creditPurchases, f.creditPurchases], ["Inventory", e.inventory, f.inventory], ["Trade receivables", e.receivables, f.receivables], ["Trade payables", e.payables, f.payables], ["Non-current assets (carrying amount)", e.nca, f.nca]])}`,
    parts: [
      P.group({ label: "(a)", stem: "Calculate trade payables days for:", parts: [
        P.num({ label: "(i)", marks: 2, kind: "days", value: R.payDays(e, e.creditPurchases), wrong: [R.payDays(e, e.cos)], stem: "2024", explanation: `${F(e.payables)} ÷ ${F(e.creditPurchases)} × 365 = ${p0(R.payDays(e, e.creditPurchases))} days.` }),
        P.num({ label: "(ii)", marks: 2, kind: "days", value: R.payDays(f, f.creditPurchases), wrong: [R.payDays(f, f.cos)], stem: "2025", explanation: `${F(f.payables)} ÷ ${F(f.creditPurchases)} × 365 = ${p0(R.payDays(f, f.creditPurchases))} days.` }),
      ] }),
      P.group({ label: "(b)", stem: "Calculate non-current asset turnover (times) for:", parts: [
        P.num({ label: "(i)", marks: 1, kind: "times", dp: 2, value: R.ncaTurn(e), wrong: [e.nca / e.revenue], stem: "2024", explanation: `${F(e.revenue)} ÷ ${F(e.nca)} = ${p2(R.ncaTurn(e))} times.` }),
        P.num({ label: "(ii)", marks: 1, kind: "times", dp: 2, value: R.ncaTurn(f), wrong: [f.nca / f.revenue], stem: "2025", explanation: `${F(f.revenue)} ÷ ${F(f.nca)} = ${p2(R.ncaTurn(f))} times.` }),
      ] }),
      P.group({ label: "(c)", stem: "Calculate trade receivables days for:", parts: [
        P.num({ label: "(i)", marks: 1, kind: "days", value: R.recDays(e, e.creditSales), wrong: [R.recDays(e, e.revenue)], stem: "2024", explanation: `${F(e.receivables)} ÷ ${F(e.creditSales)} × 365 = ${p0(R.recDays(e, e.creditSales))} days.` }),
        P.num({ label: "(ii)", marks: 1, kind: "days", value: R.recDays(f, f.creditSales), wrong: [R.recDays(f, f.revenue)], stem: "2025", explanation: `${F(f.receivables)} ÷ ${F(f.creditSales)} × 365 = ${p0(R.recDays(f, f.creditSales))} days.` }),
      ] }),
      P.manual({ label: "(d)", marks: 8, type: "EXTENDED_RESPONSE", stem: "Evaluate the management of working capital and of non-current assets by the company in 2025 and recommend two improvements. Use your calculations and the data in the table.", points: [`Payables days fell from ${p0(R.payDays(e, e.creditPurchases))} to ${p0(R.payDays(f, f.creditPurchases))}: suppliers now finance less of the business`, `Receivables days rose from ${p0(R.recDays(e, e.creditSales))} to ${p0(R.recDays(f, f.creditSales))}: customers pay more slowly`, `Inventory days moved from ${p0(R.invDays(e))} to ${p0(R.invDays(f))}`, "The combined effect: cash fell (from US\\$" + F(e.bank) + " to US\\$" + F(f.bank) + ")", `Non-current asset turnover fell from ${p2(R.ncaTurn(e))} to ${p2(R.ncaTurn(f))}: new assets not yet earning`, "Recommendation 1: stricter credit control or an early-settlement discount", "Recommendation 2: monitor inventory or renegotiate supplier terms", "Judgement: on balance working capital management has weakened in 2025, with a reason"], modelAnswer: `Working capital management weakened. Customers take longer to pay (${p0(R.recDays(f, f.creditSales))} days), suppliers are paid sooner (${p0(R.payDays(f, f.creditPurchases))} days) and cash fell to US\\$${F(f.bank)}. Non-current asset turnover fell to ${p2(R.ncaTurn(f))} times because the new assets have not yet produced proportionate revenue. The company should tighten credit control and renegotiate supplier terms.`, explanation: "One point per creditworthy statement, up to 8; allow follow-through from the calculations." }),
    ],
    hints: ["Use credit purchases for payables days.", "Compare each ratio with the earlier year."],
    explanation: "This item tests payables and receivables days and asset turnover and asks for an evaluation of working capital.",
  });

  b.card("FORMULA", "Inventory turnover (days)", "Average (or closing) inventory ÷ cost of sales × 365.");
  b.card("FORMULA", "Rate of inventory turnover (times)", "Cost of sales ÷ average inventory.");
  b.card("FORMULA", "Trade receivables days", "Trade receivables ÷ credit sales × 365.");
  b.card("FORMULA", "Trade payables days", "Trade payables ÷ credit purchases × 365.");
  b.card("FORMULA", "Non-current asset turnover", "Revenue ÷ non-current assets (carrying amount).");
  b.card("FACT", "Which base for which ratio?", "Inventory: cost of sales. Receivables: credit sales. Payables: credit purchases. Use year-end figures unless the question says average.");
  b.card("CONCEPT", "Why are rising receivables days a concern?", "Customers pay more slowly, so cash is tied up; it may mean weak credit control or looser terms.");
  b.card("CONCEPT", "Why can longer payables days help and hurt?", "It keeps cash in the business, but suppliers may withdraw credit or discounts.");
  b.card("FORMULA", "ZIMSEC turnovers", "Total assets turnover = revenue ÷ total assets; current assets turnover = revenue ÷ current assets; capital employed turnover = revenue ÷ capital employed.", undefined, { applies: ZIM });
});
void chk; void r2;
