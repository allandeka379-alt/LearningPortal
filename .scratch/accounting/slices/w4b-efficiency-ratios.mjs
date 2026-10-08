// W4b: efficiency ratios (rate of inventory turnover; Cambridge: inventory, receivables and payables days).
import { concept, P, money, CAM } from "../lib.mjs";
import { ratios, table, fmt, r2, check, d1, d0 } from "../tables/w4b-lib.mjs";

concept("acc.analysis.efficiency-ratios", { file: "analysis/efficiency-ratios", keyPrefix: "analysis.efficiency-ratios" }, (b) => {
  // ---------------------------------------------------------------- MCQs
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "The rate of inventory turnover is calculated as …",
    options: [
      ["cost of sales ÷ average inventory", "Correct: the syllabus formula."],
      ["revenue ÷ average inventory", "Inventory is at cost, so it is compared with cost of sales, not revenue."],
      ["cost of sales ÷ closing inventory", "The formula uses average inventory."],
      ["average inventory ÷ revenue × 365", "This mixes the inventory days formula with revenue."],
    ],
    answer: "A",
    explanation: "Rate of inventory turnover = cost of sales ÷ average inventory, where average = (opening + closing) ÷ 2.",
  });
  {
    const cos = 54600, oi = 7200, ci = 8400;
    const v = ratios.inventoryTurnover(cos, oi, ci);
    check("ef mcq1", v, 7);
    b.mcq({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: `Cost of sales was ${money(cos)}. Inventory was ${money(oi)} at the start of the year and ${money(ci)} at the end. What was the rate of inventory turnover?`,
      options: [
        ["7.0 times", "Correct: 54,600 ÷ 7,800."],
        [`${d1(cos / ci)} times`, "Closing inventory has been used instead of average inventory."],
        [`${d1(cos / oi)} times`, "Opening inventory has been used instead of average inventory."],
        [`${d1(cos / (oi + ci))} times`, "Opening and closing inventory have been added but not divided by 2."],
      ],
      answer: "A",
      explanation: `Average inventory = (${fmt(oi)} + ${fmt(ci)}) ÷ 2 = ${fmt((oi + ci) / 2)}. Turnover = ${fmt(cos)} ÷ ${fmt((oi + ci) / 2)} = ${d1(v)} times.`,
    });
  }
  {
    const recv = 6300, cs = 46000;
    const v = ratios.receivablesDays(recv, cs);
    b.mcq({
      d: 2, skill: "APPLICATION", calculator: true, applies: CAM,
      stem: `Trade receivables are ${money(recv)} and credit sales for the year were ${money(cs)}. What is the trade receivables turnover in days (to the nearest day)?`,
      options: [
        [`${d0(v)} days`, "Correct: 6,300 ÷ 46,000 × 365."],
        [`${d0((cs / recv) * 365 / 100)} days`, "The fraction has been turned upside down."],
        [`${d0((recv / cs) * 52)} days`, "This multiplies by 52 (weeks), not 365."],
        [`${d0((recv / cs) * 100)} days`, "This multiplies by 100, giving a percentage, not days."],
      ],
      answer: "A",
      explanation: `${fmt(recv)} ÷ ${fmt(cs)} × 365 = ${d1(v)}, so ${d0(v)} days.`,
    });
  }
  {
    const pay = 5840, cp = 38400;
    const v = ratios.payablesDays(pay, cp);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true, applies: CAM,
      stem: `Trade payables are ${money(pay)}. Purchases for the year were ${money(cp + 4800)}, of which ${money(4800)} were cash purchases. What is the trade payables turnover in days (to the nearest day)?`,
      options: [
        [`${d0(v)} days`, "Correct: 5,840 ÷ 38,400 × 365."],
        [`${d0(ratios.payablesDays(pay, cp + 4800))} days`, "Total purchases have been used; cash purchases never create a trade payable."],
        [`${d0(ratios.payablesDays(pay, cp - 4800))} days`, "Cash purchases have been deducted twice."],
        [`${d0((pay / cp) * 12)} days`, "This multiplies by 12, which would give months, not days."],
      ],
      answer: "A",
      hints: ["Use credit purchases only."],
      explanation: `Credit purchases = ${fmt(cp + 4800)} − 4,800 = ${fmt(cp)}. ${fmt(pay)} ÷ ${fmt(cp)} × 365 = ${d1(v)}, so ${d0(v)} days.`,
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A trader's rate of inventory turnover fell from 9 times to 6 times a year. What does this most likely mean?",
    options: [
      ["Goods are taking longer to sell", "Correct: inventory is replaced fewer times a year."],
      ["Goods are selling more quickly", "That would raise the rate."],
      ["Customers are paying more slowly", "That is shown by trade receivables days."],
      ["The gross profit margin has risen", "Inventory turnover measures speed of sale, not margin."],
    ],
    answer: "A",
    explanation: "A lower rate means average inventory is sold fewer times: goods stay on the shelves longer.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", applies: CAM,
    stem: "A business allows customers 30 days' credit. Its trade receivables turnover is 52 days. Which action would most directly improve this?",
    options: [
      ["Offering a discount for prompt payment", "Correct: it encourages customers to pay sooner."],
      ["Taking longer to pay its own suppliers", "This affects payables days, not receivables days."],
      ["Buying inventory in smaller quantities", "This affects inventory turnover."],
      ["Raising its selling prices", "This does not make customers pay faster."],
    ],
    answer: "A",
    hints: ["Which ratio is about customers?"],
    explanation: "Receivables days fall when customers pay faster: cash discounts, prompt invoicing and chasing overdue accounts all help.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", applies: CAM,
    stem: "Trade payables turnover has risen from 35 days to 75 days while suppliers allow 45 days. What is the main risk?",
    options: [
      ["Suppliers may stop giving credit", "Correct: the business is paying well outside the agreed terms."],
      ["Inventory will become obsolete", "This relates to inventory turnover."],
      ["Customers will stop paying on time", "Customers' payments are not affected by when the business pays its suppliers."],
      ["The gross profit margin will rise", "Delaying payment does not change buying or selling prices."],
    ],
    answer: "A",
    hints: ["Compare the payment period with the credit period allowed."],
    explanation: "Paying late keeps cash in the business for a while but damages goodwill with suppliers, who may stop giving credit.",
  });
  {
    const cos = 73000, avg = 10000;
    const days = (avg / cos) * 365;
    check("ef mcq inv days", days, 50);
    b.mcq({
      d: 2, skill: "APPLICATION", applies: CAM, calculator: true,
      stem: `Average inventory is ${money(avg)} and cost of sales ${money(cos)}. What is the inventory turnover in days?`,
      options: [
        ["50 days", "Correct: 10,000 ÷ 73,000 × 365."],
        ["7 days", "This is roughly the rate in times (7.3), not days."],
        ["137 days", "This is 10,000 ÷ 73,000 × 1,000, not × 365."],
        ["2,665 days", "The fraction has been inverted before multiplying by 365."],
      ],
      answer: "A",
      explanation: "Inventory days = average inventory ÷ cost of sales × 365 = 50 days (or 365 ÷ 7.3 times).",
    });
  }

  // ---------------------------------------------------------------- TF
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Inventory turnover uses cost of sales rather than revenue because inventory is valued at cost.",
    answer: true,
    explanation: "True. Comparing a cost figure with a selling-price figure would overstate the rate.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", applies: CAM,
    stem: "Cash sales should be included in the sales figure used to calculate trade receivables days.",
    answer: false,
    explanation: "False. Only credit sales create trade receivables, so the formula uses credit sales.",
  });

  // ---------------------------------------------------------------- Match
  b.match({
    d: 2, skill: "RECALL", applies: CAM,
    stem: "Match each ratio with its formula.",
    pairs: [
      ["Rate of inventory turnover", "Cost of sales ÷ average inventory"],
      ["Inventory turnover (days)", "Average inventory ÷ cost of sales × 365"],
      ["Trade receivables turnover (days)", "Trade receivables ÷ credit sales × 365"],
      ["Trade payables turnover (days)", "Trade payables ÷ credit purchases × 365"],
    ],
    explanation: "The 'times' ratio has cost of sales on top; the 'days' ratios have the balance on top and multiply by 365.",
  });

  // ---------------------------------------------------------------- FIB
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Average inventory = (opening inventory + {{blank:a}} inventory) ÷ {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["closing"], choices: ["closing", "opening", "average"] },
      { id: "b", accepted: ["2"], choices: ["2", "12", "365"] },
    ],
    explanation: "Average inventory is the simple average of the opening and closing figures.",
  });

  // ---------------------------------------------------------------- Numerical
  {
    const oi = 11650, ci = 13350, cos = 88750;
    const v = ratios.inventoryTurnover(cos, oi, ci);
    b.num({
      d: 2, kind: "times", value: v, calculator: true, wrong: [d1(cos / ci)],
      stem: `Inventory at 1 January 2025 was ${money(oi)} and at 31 December 2025 ${money(ci)}. Cost of sales was ${money(cos)}. Calculate the rate of inventory turnover, to one decimal place.`,
      explanation: `Average = (${fmt(oi)} + ${fmt(ci)}) ÷ 2 = ${fmt((oi + ci) / 2)}. ${fmt(cos)} ÷ ${fmt((oi + ci) / 2)} = ${d1(v)} times. Using closing inventory gives ${d1(cos / ci)}.`,
    });
  }
  {
    const rev = 96000, mu = 25, oi = 9400, ci = 10800;
    const cos = r2((rev * 100) / (100 + mu));
    const v = ratios.inventoryTurnover(cos, oi, ci);
    b.calc({
      d: 4, kind: "times", value: v, calculator: true, wrong: [d1(rev / ((oi + ci) / 2)), d1((rev * 0.75) / ((oi + ci) / 2))],
      stem: `Farai's revenue was ${money(rev)}; he sells at a mark-up of ${mu}%. Inventory was ${money(oi)} at the start of the year and ${money(ci)} at the end. Calculate his rate of inventory turnover, to one decimal place.`,
      hints: ["Find cost of sales from the mark-up first: revenue × 100/125."],
      explanation: `Cost of sales = ${fmt(rev)} × 100/125 = ${fmt(cos)}. Average inventory = ${fmt((oi + ci) / 2)}. Turnover = ${d1(v)} times. Using revenue gives ${d1(rev / ((oi + ci) / 2))}; treating 25% as a margin gives ${d1((rev * 0.75) / ((oi + ci) / 2))}.`,
    });
  }
  {
    const recv = 8920, cash = 12500, total = 71400;
    const cs = total - cash;
    const v = ratios.receivablesDays(recv, cs);
    b.calc({
      d: 3, kind: "days", value: v, calculator: true, applies: CAM, wrong: [d0(ratios.receivablesDays(recv, total))],
      stem: `Chipo's total sales were ${money(total)}, of which ${money(cash)} were cash sales. Trade receivables at the year end were ${money(recv)}. Calculate her trade receivables turnover in days, to the nearest whole day.`,
      hints: ["Use credit sales only."],
      explanation: `Credit sales = ${fmt(total)} − ${fmt(cash)} = ${fmt(cs)}. ${fmt(recv)} ÷ ${fmt(cs)} × 365 = ${d1(v)} → ${d0(v)} days. Using total sales gives ${d0(ratios.receivablesDays(recv, total))} days.`,
    });
  }

  // ---------------------------------------------------------------- manual short
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Give **two** ways a shop could increase its rate of inventory turnover.",
    points: ["Buy smaller quantities more often / hold less inventory", "Clear slow-moving or old lines (sales, promotions) / stock only goods that sell well / advertise to increase sales"],
    modelAnswer: "Order smaller amounts more often so less inventory is held, and clear slow-selling lines with a sale.",
    explanation: "Either reduce average inventory or increase cost of sales (sell more).",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3, applies: CAM,
    stem: "Sipho collects from customers in 25 days and pays his suppliers in 60 days. His suppliers allow 30 days. Evaluate this position.",
    points: ["Positive: cash comes in long before it goes out, helping liquidity", "Negative: paying 30 days late breaks suppliers' terms; risk of losing credit, discounts or goodwill", "Conclusion: he should move towards paying within 30 days while keeping his good collection period"],
    modelAnswer: "Collecting in 25 days but paying in 60 means he holds the cash for a long time, which helps his bank balance. But he is paying twice as slowly as his suppliers allow, so they may stop his credit or charge more. He should pay within the 30 days and still keep a comfortable cash position because his customers pay quickly.",
    hints: ["Consider both the cash benefit and the supplier relationship."],
    explanation: "A balanced answer weighs liquidity against supplier goodwill.",
  });

  // ---------------------------------------------------------------- Practice structured 1 (Cambridge, all four)
  {
    const d = { cos: 112420, oi: 14600, ci: 16200, cs: 128500, recv: 15840, cp: 113900, pay: 8420 };
    const it = ratios.inventoryTurnover(d.cos, d.oi, d.ci);
    const id = ratios.inventoryDays(d.cos, d.oi, d.ci);
    const rd = ratios.receivablesDays(d.recv, d.cs);
    const pd = ratios.payablesDays(d.pay, d.cp);
    const stim = table(["Item for 2025", "US\\$"], [["Credit sales", d.cs], ["Cost of sales", d.cos], ["Credit purchases", d.cp], ["Inventory at 1 January 2025", d.oi], ["Inventory at 31 December 2025", d.ci], ["Trade receivables at 31 December 2025", d.recv], ["Trade payables at 31 December 2025", d.pay]]);
    b.struct({
      d: 4, examStyle: true, skill: "APPLICATION", calculator: true, applies: CAM,
      stem: `Tendai Mupfumi sells hardware to builders on credit in Harare. He allows customers 30 days and his suppliers allow him 30 days. Figures for 2025:\n\n${stim}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "times", value: it, wrong: [d1(d.cos / d.ci)], stem: "Calculate the rate of inventory turnover, to one decimal place.", explanation: `Average inventory ${fmt((d.oi + d.ci) / 2)}; ${fmt(d.cos)} ÷ ${fmt((d.oi + d.ci) / 2)} = ${d1(it)} times.` }),
        P.num({ label: "(b)", marks: 1, kind: "days", value: id, stem: "Calculate the inventory turnover in days, to the nearest whole day.", explanation: `${fmt((d.oi + d.ci) / 2)} ÷ ${fmt(d.cos)} × 365 = ${d1(id)} → ${d0(id)} days.` }),
        P.num({ label: "(c)", marks: 2, kind: "days", value: rd, stem: "Calculate the trade receivables turnover in days, to the nearest whole day.", explanation: `${fmt(d.recv)} ÷ ${fmt(d.cs)} × 365 = ${d1(rd)} → ${d0(rd)} days.` }),
        P.num({ label: "(d)", marks: 2, kind: "days", value: pd, stem: "Calculate the trade payables turnover in days, to the nearest whole day.", explanation: `${fmt(d.pay)} ÷ ${fmt(d.cp)} × 365 = ${d1(pd)} → ${d0(pd)} days.` }),
        P.manual({ label: "(e)", marks: 3, stem: "Comment on Tendai's management of receivables and payables, and advise him.", points: [`Customers take about ${d0(rd)} days against 30 allowed: credit control is weak`, `He pays suppliers in about ${d0(pd)} days, within their 30 days`, "Advice: chase debts / offer cash discounts / vet customers, so that he does not pay out cash before he collects it"], modelAnswer: `Customers take about ${d0(rd)} days to pay although they are allowed 30, so his credit control is weak. He pays his suppliers in about ${d0(pd)} days, within their terms, so he is paying out cash well before he collects it. He should chase overdue accounts and offer a small discount for payment within 30 days.`, explanation: "Compare each period with the terms." }),
      ],
      hints: ["Use average inventory with cost of sales.", "Days = balance ÷ annual figure × 365."],
      explanation: `Inventory turnover ${d1(it)} times (${d0(id)} days); receivables ${d0(rd)} days; payables ${d0(pd)} days.`,
    });
  }

  // ---------------------------------------------------------------- Practice structured 2 (both boards: two years of inventory turnover)
  {
    const y = [{ yr: "2024", cos: 46800, oi: 5400, ci: 6600 }, { yr: "2025", cos: 49950, oi: 6600, ci: 9050 }];
    const v = y.map((o) => ratios.inventoryTurnover(o.cos, o.oi, o.ci));
    b.struct({
      d: 3, examStyle: true, skill: "ANALYSIS", calculator: true,
      stem: `Rudo Makoni sells shoes in Gweru. Figures for two years:\n\n${table(["", "2024 US\\$", "2025 US\\$"], [["Cost of sales", 46800, 49950], ["Opening inventory", 5400, 6600], ["Closing inventory", 6600, 9050]])}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "times", value: v[0], stem: "Calculate the rate of inventory turnover for 2024, to one decimal place.", explanation: `(5,400 + 6,600) ÷ 2 = 6,000; 46,800 ÷ 6,000 = ${d1(v[0])} times.` }),
        P.num({ label: "(b)", marks: 2, kind: "times", value: v[1], wrong: [d1(49950 / 9050)], stem: "Calculate the rate of inventory turnover for 2025, to one decimal place.", explanation: `(6,600 + 9,050) ÷ 2 = 7,825; 49,950 ÷ 7,825 = ${d1(v[1])} times.` }),
        P.mcq({ label: "(c)", stem: "Which statement best describes the change?", options: [["Shoes are selling more slowly as inventory grew faster than sales", "Correct: closing inventory rose by about 37% while cost of sales rose by under 7%."], ["Shoes are selling faster because cost of sales has increased this year", "The rate fell, so goods sell more slowly."], ["The gross profit margin has fallen because inventory is higher", "Inventory turnover gives no information about the margin."], ["Customers are taking longer to pay for the shoes they buy", "Inventory turnover does not measure customer payments."]], answer: "A", explanation: `The rate fell from ${d1(v[0])} to ${d1(v[1])} times.` }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain **two** problems caused by a falling rate of inventory turnover and suggest **one** remedy.", points: ["Money tied up in inventory, so less cash for paying debts (worse liquidity)", "Risk of goods going out of fashion, damage or theft; higher storage/insurance costs", "Remedy: buy smaller quantities more often / clearance sale of slow lines"], modelAnswer: "Cash is tied up in shoes on the shelves, so there is less to pay suppliers; and older styles may go out of fashion and have to be sold below cost. Rudo should order smaller quantities more often and hold a sale to clear slow lines.", explanation: "Two problems plus one practical remedy." }),
      ],
      hints: ["Average inventory = (opening + closing) ÷ 2."],
      explanation: `2024: ${d1(v[0])} times; 2025: ${d1(v[1])} times.`,
    });
  }

  // ---------------------------------------------------------------- Flashcards
  b.card("FORMULA", "Rate of inventory turnover", "Cost of sales ÷ average inventory (times a year).");
  b.card("FORMULA", "Average inventory", "(Opening inventory + closing inventory) ÷ 2.");
  b.card("FORMULA", "Inventory turnover (days)", "Average inventory ÷ cost of sales × 365.", null, { applies: CAM });
  b.card("FORMULA", "Trade receivables turnover (days)", "Trade receivables ÷ credit sales × 365.", null, { applies: CAM });
  b.card("FORMULA", "Trade payables turnover (days)", "Trade payables ÷ credit purchases × 365.", null, { applies: CAM });
  b.card("CONCEPT", "Falling rate of inventory turnover", "Goods are selling more slowly or too much is being bought: cash is tied up and goods may become obsolete.");
  b.card("CONCEPT", "Receivables days above the credit period", "Customers are paying late: credit control should be tightened (chase debts, cash discounts, credit checks).");
  b.card("CONCEPT", "Paying suppliers very late", "Keeps cash longer but risks losing credit, discounts and goodwill.");
  b.card("FACT", "Why use credit sales for receivables days?", "Cash sales never create a trade receivable.", null, { applies: CAM });
});
