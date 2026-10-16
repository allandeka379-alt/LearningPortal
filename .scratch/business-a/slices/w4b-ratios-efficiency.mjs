// W4b: ratios.efficiency
import { concept, P, table, r2, ratios, chk, fmt, ZIM } from "../lib.mjs";
import { mc } from "../tables/w4b-lib.mjs";

concept("abus.ratios.efficiency", { file: "ratios/efficiency", keyPrefix: "ratios.efficiency" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which formula gives the **rate of inventory turnover**?",
    ok: ["Cost of sales ÷ average inventory", "Correct: the number of times inventory is sold and replaced in a year."],
    bad: [["Revenue ÷ average inventory", "Inventory is valued at cost, so cost of sales is used, not revenue."], ["Average inventory ÷ cost of sales", "This inverts the fraction; it is the basis of inventory days when multiplied by 365."], ["Cost of sales ÷ closing receivables", "Receivables have nothing to do with inventory turnover."]],
    explanation: "Rate of inventory turnover = cost of sales ÷ average inventory, measured in times a year.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which figure should be used as the denominator when **trade receivables days** are calculated?",
    ok: ["Credit sales for the year", "Correct: only credit sales create receivables."],
    bad: [["Cost of sales for the year", "Cost of sales is used for inventory, not for receivables."], ["Credit purchases for the year", "Credit purchases are used for payables days."], ["Profit from operations for the year", "Profit has no direct link to money owed by customers."]],
    explanation: "Trade receivables days = trade receivables ÷ credit sales × 365.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "A fictional wholesaler's trade receivables days rose from 35 to 55 and its trade payables days fell from 50 to 40. What is the combined effect on its cash?",
    ok: ["Cash is received later and paid out sooner, so cash tightens", "Correct: the gap between receipts and payments has widened."],
    bad: [["Cash is received sooner and paid out later, so cash improves", "That is the opposite of what the figures show."], ["Cash is unaffected, because the two changes cancel out", "The changes work in the same direction and add together."], ["Only profit is affected, because days are not about cash", "Days of credit directly affect the timing of cash."]],
    hints: ["Customers take longer; the business pays sooner."],
    explanation: "Longer receivables days delay cash coming in and shorter payables days bring forward cash going out, so working capital is squeezed from both sides.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING", applies: ZIM,
    stem: "What do **debtor days** measure?",
    ok: ["The average time customers take to pay for credit sales", "Correct: the same idea as trade receivables days."],
    bad: [["The average time the business takes to pay its suppliers", "That is creditor days."], ["The average time goods are held before they are sold", "That is stock days."], ["The number of days the business is open each year", "Debtor days has nothing to do with opening hours."]],
    hints: ["Debtors are customers who owe money."],
    explanation: "Debtor days = debtors ÷ credit sales × 365, the collection period.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A fictional furniture firm offers customers 3% off if they pay within 10 days, to cut its receivables days. What is the main risk?",
    ok: ["The discount costs more than the interest saved on the cash released", "Correct: a 3% discount for paying about 20 days earlier is expensive."],
    bad: [["Customers will pay later than before, because they get discounts", "A discount encourages earlier payment, not later."], ["The firm's cost of sales will rise by 3% on every sale", "The discount reduces revenue, not cost of sales."], ["The firm will have to hold more inventory as a result", "A discount on payment does not affect inventory holding."]],
    hints: ["Compare 3% with the interest on 20 days of borrowing."],
    explanation: "3% for 20 days earlier payment equals more than 50% a year, far above normal borrowing rates, so the discount is costly unless many customers would otherwise pay very late.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A longer period of trade payables days always harms a business.",
    answer: false,
    hints: ["Who finances the inventory while the supplier waits to be paid?"],
    explanation: "False. Longer payables days mean the business keeps its cash longer and uses suppliers' credit as finance. The risk is that goodwill or discounts are lost.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A higher rate of inventory turnover usually means that less money is tied up in inventory.",
    answer: true,
    explanation: "True. Inventory is sold and replaced more often, so less is held at any time, although too high a rate may cause stock-outs.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each ratio to the formula that gives it.",
    pairs: [["Rate of inventory turnover", "Cost of sales ÷ average inventory"], ["Trade receivables days", "Trade receivables ÷ credit sales × 365"], ["Trade payables days", "Trade payables ÷ credit purchases × 365"], ["Average inventory", "(Opening inventory + closing inventory) ÷ 2"]],
    explanation: "Each ratio uses its own base: cost of sales, credit sales or credit purchases.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "Trade receivables days use credit {{blank:a}}, while trade payables days use credit {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["sales"], choices: ["sales", "purchases", "profit"] },
      { id: "b", accepted: ["purchases"], choices: ["sales", "purchases", "profit"] },
    ],
    explanation: "Receivables come from credit sales; payables from credit purchases.",
  });

  // ---- numerical items
  const t1 = ratios.inventoryTurnover(315000, 42000);
  chk(t1, 7.5, 1e-9);
  b.num({
    d: 2, skill: "APPLICATION", kind: "times", value: t1, calculator: true, wrong: [r2(42000 / 315000), r2(315000 / 21000)],
    stem: "A fictional grocery wholesaler in Bulawayo has cost of sales of US\\$315,000 and average inventory of US\\$42,000. Calculate the rate of inventory turnover, to one decimal place.",
    hints: ["Cost of sales ÷ average inventory."],
    explanation: "315,000 ÷ 42,000 = 7.5 times. Inverting the fraction gives 0.13, and using half the average inventory (21,000) gives 15.0.",
  });
  const rd1 = ratios.receivablesDays(38400, 262800);
  chk(rd1, 53.3333, 1e-3);
  b.num({
    d: 3, skill: "APPLICATION", kind: "days", value: rd1, calculator: true, daily: true, wrong: [r2((262800 / 38400) * 365), 365 - 53],
    stem: "A fictional office-supplies company has trade receivables of US\\$38,400 and credit sales of US\\$262,800 for the year. Calculate the trade receivables turnover in days, to the nearest day.",
    hints: ["Receivables ÷ credit sales × 365."],
    explanation: "38,400 ÷ 262,800 × 365 = 53.3, which is 53 days. Dividing the other way round gives 2,498 days.",
  });
  const pd1 = ratios.payablesDays(21000, 175200);
  chk(pd1, 43.75, 1e-9);
  b.num({
    d: 3, skill: "APPLICATION", kind: "days", value: pd1, calculator: true, wrong: [r2((21000 / 262800) * 365), 12],
    stem: "A fictional bakery has trade payables of US\\$21,000 and credit purchases of US\\$175,200 for the year. Calculate the trade payables turnover in days, to the nearest day.",
    hints: ["Payables ÷ credit purchases × 365."],
    explanation: "21,000 ÷ 175,200 × 365 = 43.75, which is 44 days. Using credit sales of US\\$262,800 by mistake gives 29 days.",
  });
  const t4 = ratios.inventoryTurnover(410000, (28000 + 41000) / 2);
  chk(t4, 11.8841, 1e-3);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "times", value: t4, calculator: true, wrong: [r2(410000 / 41000), r2(410000 / 28000)],
    stem: "A fictional paint company in Gweru has cost of sales of US\\$410,000. Its inventory was US\\$28,000 at the start of the year and US\\$41,000 at the end. Calculate the rate of inventory turnover, to one decimal place.",
    hints: ["Find the average inventory first."],
    explanation: "Average inventory = (28,000 + 41,000) ÷ 2 = 34,500. Turnover = 410,000 ÷ 34,500 = 11.9 times. Using the closing inventory gives 10.0 and the opening inventory 14.6.",
    workedSolution: "1. Average inventory = (28,000 + 41,000) ÷ 2 = 34,500.\n2. Turnover = 410,000 ÷ 34,500 = 11.9 times.",
  });
  const id5 = ratios.inventoryDays(27000, 328500);
  chk(id5, 30, 1e-9);
  b.num({
    d: 3, skill: "APPLICATION", kind: "days", value: id5, calculator: true, applies: ZIM, wrong: [r2(328500 / 27000), 12],
    stem: "A fictional tuck-shop supplier has average stock of US\\$27,000 and cost of sales of US\\$328,500 for the year. Using stock days = average stock ÷ cost of sales × 365, calculate the stock days to the nearest day.",
    hints: ["Average stock ÷ cost of sales × 365."],
    explanation: "27,000 ÷ 328,500 × 365 = 30.0 days. Inverting the fraction gives 12.2, which is the turnover rate, not days.",
  });
  const recNow = 94000, cs = 584000;
  const rec45 = (cs * 45) / 365;
  chk(rec45, 72000, 1e-6);
  b.calc({
    d: 5, skill: "ANALYSIS", kind: "money", value: recNow - rec45, calculator: true, wrong: [recNow, rec45],
    stem: "A fictional timber merchant has credit sales of US\\$584,000 a year and trade receivables of US\\$94,000. It plans to tighten credit control so that customers pay in 45 days on average. Assuming credit sales do not change, calculate the cash that would be released from receivables.",
    hints: ["Find the receivables balance that corresponds to 45 days."],
    explanation: "Receivables at 45 days = 584,000 × 45 ÷ 365 = 72,000. Cash released = 94,000 − 72,000 = US\\$22,000. The current balance represents 58.75 days of credit sales.",
    workedSolution: "1. Receivables at 45 days = 584,000 × 45 ÷ 365 = 72,000.\n2. Cash released = 94,000 − 72,000 = 22,000.",
  });

  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "State one way in which a business could reduce its trade receivables days.",
    accepted: ["offer a discount for early payment", "stricter credit control", "shorter credit terms", "credit checks on customers", "debt factoring", "chase late payers", "early payment discount"],
    keywords: { any: ["discount", "credit control", "credit terms", "credit check", "factoring", "chase", "collect", "reminders"], minAny: 1 },
    explanation: "Accept early-payment discounts, stricter credit control, shorter terms, credit checks, factoring or chasing late payers.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why a very high rate of inventory turnover may not be good for a business.",
    points: ["A very high rate may mean that inventory levels are kept too low", "So the business may run out of goods (stock-outs) when customers want to buy", "Sales and customer goodwill are lost, and frequent small orders may raise ordering costs"],
    modelAnswer: "A very high rate may mean that inventory is kept too low, so the business runs out of goods when customers want them. Sales and goodwill are then lost, and frequent small orders may raise ordering costs.",
    hints: ["What happens when the shelves are empty?"],
    explanation: "Too little inventory has costs too.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "A fictional clothing factory's trade receivables days are 62 while its trade payables days are 30. Analyse the problem this creates.",
    points: ["Customers take about two months to pay but the factory pays its suppliers in one month", "So the factory must finance about a month of trading from its own funds", "It may need an overdraft, which adds interest cost", "Its liquidity ratios and its relations with suppliers may suffer if cash runs short"],
    modelAnswer: "Customers take about 62 days to pay but the factory pays its suppliers in 30, so it must finance about a month of trading from its own funds. It may need an overdraft, which adds interest, and if cash runs short its liquidity and its relations with suppliers may suffer.",
    hints: ["Compare the two periods."],
    explanation: "The gap between receipts and payments must be financed.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "Evaluate whether a fictional retailer with slow-moving inventory should reduce its stock by selling items at a discount.",
    points: ["Selling slow lines frees cash and reduces storage and obsolescence costs", "It raises the rate of inventory turnover and improves liquidity", "Discounts reduce the profit on these items and may damage the brand", "Customers may learn to wait for sales, hurting normal sales", "The size of the discount must be compared with the cost of holding the stock", "Judgement and reason, for example clear old lines, then improve ordering so the problem does not return"],
    modelAnswer: "Selling slow lines at a discount frees cash and cuts storage and obsolescence costs, so the rate of inventory turnover and liquidity improve. But the discounts reduce profit on these items and may damage the brand, and customers may learn to wait for sales. The retailer should clear the oldest lines, provided the discount is smaller than the cost of holding them, and then improve its ordering so the problem does not return.",
    hints: ["Weigh the cash freed against the profit given up."],
    explanation: "Benefits and costs weighed, with a conditional judgement.",
  });

  // ---- practice structured items
  const S1 = { cos: 258000, open: 31000, close: 39000, cs: 219000, rec: 33000 };
  const avg1 = (S1.open + S1.close) / 2;
  const turn1 = ratios.inventoryTurnover(S1.cos, avg1), rd2 = ratios.receivablesDays(S1.rec, S1.cs);
  chk(avg1, 35000); chk(turn1, 7.37143, 1e-4); chk(rd2, 55, 1e-9);
  const tbl1 = table(["US\\$", "2025"], [["Cost of sales", S1.cos], ["Inventory at 1 January", S1.open], ["Inventory at 31 December", S1.close], ["Credit sales", S1.cs], ["Trade receivables at 31 December", S1.rec]]);
  b.struct({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: `Chipo's Wholesale is a fictional trading company in Harare. It sells to shops on 30 days' credit. Its figures for 2025 are shown.\n\n${tbl1}`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "times", value: turn1, wrong: [r2(S1.cos / S1.close), r2(S1.cos / S1.open)], stem: "Calculate the rate of inventory turnover, to one decimal place.", explanation: "Average inventory = (31,000 + 39,000) ÷ 2 = 35,000. Turnover = 258,000 ÷ 35,000 = 7.4 times." }),
      P.num({ label: "(b)", marks: 3, kind: "days", value: rd2, type: "CALCULATION", wrong: [30, r2((S1.cs / S1.rec) * 365)], stem: "Calculate the trade receivables turnover in days, to the nearest day.", explanation: "33,000 ÷ 219,000 × 365 = 55 days.", workedSolution: "1. Trade receivables ÷ credit sales = 33,000 ÷ 219,000 = 0.1507.\n2. × 365 = 55 days." }),
      P.manual({ label: "(c)", marks: 4, stem: "Analyse the effect on the company's cash of the receivables result in part (b).", points: ["Customers take 55 days to pay although the credit term is 30 days", "So customers are paying 25 days late", "About 25 days of sales are tied up in receivables, which the company must finance", "This may force it into an overdraft or delay payments to its own suppliers"], modelAnswer: "Customers take 55 days to pay although the credit term is 30 days, so they are paying 25 days late. About 25 days of credit sales are tied up in receivables and the company must finance them, which may force it into an overdraft or to delay payments to its own suppliers.", explanation: "Late payment ties up cash." }),
    ],
    hints: ["Find the average inventory first.", "Compare the result with the 30-day term."],
    explanation: "Turnover 7.4 times; receivables 55 days against 30 days allowed; cash is tied up.",
  });
  const cs2 = 730000, cp2 = 438000;
  const R = { 2024: { rec: 94000, pay: 48000 }, 2025: { rec: 118000, pay: 42000 } };
  const rd24 = ratios.receivablesDays(R[2024].rec, cs2), rd25 = ratios.receivablesDays(R[2025].rec, cs2), pd24 = ratios.payablesDays(R[2024].pay, cp2), pd25 = ratios.payablesDays(R[2025].pay, cp2);
  chk(rd24, 47, 1e-9); chk(rd25, 59, 1e-9); chk(pd24, 40, 1e-9); chk(pd25, 35, 1e-9);
  const rec40 = (cs2 * 40) / 365, released = R[2025].rec - rec40, interest = released * 0.13, discCost = 0.02 * 0.6 * cs2;
  chk(rec40, 80000, 1e-6); chk(released, 38000, 1e-6); chk(interest, 4940, 1e-6); chk(discCost, 8760, 1e-6);
  const tbl2 = table(["US\\$", "2024", "2025"], [["Credit sales", cs2, cs2], ["Credit purchases", cp2, cp2], ["Trade receivables at year end", R[2024].rec, R[2025].rec], ["Trade payables at year end", R[2024].pay, R[2025].pay]]);
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: `Kudzai Foods is a fictional food distributor in Masvingo. It pays 13% a year interest on its overdraft. The managing director proposes a 2% discount to customers who pay within 14 days, which the finance manager expects 60% of the credit sales to take up. If this works, average receivables days should fall to 40.\n\n${tbl2}`,
    parts: [
      P.group({ label: "(a)", stem: "Calculate, to the nearest day, the trade receivables days for 2025 and the trade payables days for 2025:", parts: [
        P.num({ label: "(i)", marks: 2, kind: "days", value: rd25, wrong: [47, r2((cs2 / R[2025].rec) * 365)], stem: "trade receivables days;", explanation: "118,000 ÷ 730,000 × 365 = 59 days." }),
        P.num({ label: "(ii)", marks: 2, kind: "days", value: pd25, wrong: [40, r2((R[2025].pay / cs2) * 365)], stem: "trade payables days.", explanation: "42,000 ÷ 438,000 × 365 = 35 days." }),
      ] }),
      P.manual({ label: "(b)", marks: 4, stem: "Analyse what the changes between 2024 and 2025 in receivables days (47 to 59) and payables days (40 to 35) mean for the company's cash.", points: ["Customers take 12 days longer to pay, so cash comes in later", "The company pays its suppliers 5 days sooner, so cash goes out earlier", "The gap between receipts and payments has widened from 7 days to 24 days", "More of the company's own money is tied up and an overdraft may be needed"], modelAnswer: "Customers take 12 days longer to pay, so cash comes in later, while the company pays its suppliers 5 days sooner, so cash goes out earlier. The gap between receipts and payments has widened from 7 days to 24 days, so more of the company's own money is tied up and an overdraft may be needed.", explanation: "Gap widened from 7 to 24 days." }),
      P.manual({ label: "(c)", marks: 6, stem: "Evaluate whether the proposed discount is worthwhile.", points: [["At 40 days receivables would be US\\$80,000, so US\\$38,000 of cash is released from US\\$118,000", 1], ["Interest saved at 13% = US\\$4,940 a year", 1], ["The discount costs 2% × 60% × US\\$730,000 = US\\$8,760 a year, which exceeds the interest saved", 2], ["Other benefits: less risk of bad debts and better planning; but customers who would have paid on time also take the discount", 1], ["Judgement and reason, for example not worthwhile at this rate; try credit control first", 1]], levels: [[3, 5, 6, "Uses cash released, interest saved and discount cost correctly; weighs other effects; a justified decision"], [2, 3, 4, "Calculates some figures with some analysis; judgement weakly supported"], [1, 1, 2, "States ideas with little use of data"]], modelAnswer: "At 40 days receivables would be US\\$80,000, so US\\$38,000 of cash would be released, and at 13% this saves US\\$4,940 a year in interest. The discount would cost 2% of 60% of US\\$730,000, which is US\\$8,760 a year, so it costs more than it saves. The discount also goes to customers who would have paid on time anyway. There would be some benefit from lower bad-debt risk, but on these figures the discount is not worthwhile, and the company should first try stricter credit control and only use a discount if the cost can be reduced.", hints: ["Compare the interest saved with the cost of the discount."], explanation: "Discount costs US\\$8,760 against interest saved of US\\$4,940." }),
    ],
    hints: ["Use credit sales for receivables and credit purchases for payables."],
    explanation: "Receivables 59 days; payables 35 days; the discount costs US\\$8,760 and saves US\\$4,940, so it is not worthwhile.",
  });

  b.card("FORMULA", "Rate of inventory turnover", "Cost of sales ÷ average inventory (times).");
  b.card("FORMULA", "Trade receivables days", "Trade receivables ÷ credit sales × 365.");
  b.card("FORMULA", "Trade payables days", "Trade payables ÷ credit purchases × 365.");
  b.card("FORMULA", "Average inventory", "(Opening inventory + closing inventory) ÷ 2.");
  b.card("FORMULA", "Inventory (stock) days", "Average inventory ÷ cost of sales × 365.", undefined, { applies: ZIM });
  b.card("CONCEPT", "Faster inventory turnover", "Less money tied up and less risk of wastage; too fast may mean stock-outs.");
  b.card("CONCEPT", "Receivables days versus payables days", "If customers pay more slowly than the business pays suppliers, the gap must be financed.");
  b.card("CONCEPT", "Ways to reduce receivables days", "Credit checks, shorter terms, early-payment discounts, debt collection, factoring.");
  b.card("CONCEPT", "Cost of an early-payment discount", "Compare the discount cost with the interest saved on the cash released.");
});
