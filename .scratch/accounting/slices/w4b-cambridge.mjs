// W4b: Cambridge 0452 Paper 2 exam-format item (20 marks): ratios with evaluation.
import { concept, P, money, CAM } from "../lib.mjs";
import { ratios, table, fmt, r2, check, d1, d2, d0 } from "../tables/w4b-lib.mjs";

concept("acc.analysis.interpretation", { file: "exam/w4b-cambridge", keyPrefix: "exam.w4b-cambridge", applies: CAM }, (b) => {
  const Y = [
    { yr: "2024", rev: 186000, cos: 122760, exp: 41100, int: 2100, openInv: 12200, inv: 14700, recv: 15800, bank: 4300, od: 0, pay: 9900, cap: 72000, loan: 21000 },
    { yr: "2025", rev: 211000, cos: 145590, exp: 46420, int: 2100, openInv: 14700, inv: 20600, recv: 23120, bank: 0, od: 3700, pay: 14100, cap: 78000, loan: 21000 },
  ];
  const R = Y.map((y) => {
    const gp = r2(y.rev - y.cos), np = r2(gp - y.exp);
    const ca = r2(y.inv + y.recv + y.bank), cl = r2(y.pay + y.od);
    const creditPurchases = r2(y.cos + y.inv - y.openInv);
    return {
      gp, np, ca, cl, creditPurchases,
      gpm: ratios.grossMargin(gp, y.rev), pm: ratios.profitMargin(np, y.rev), roce: ratios.roce(np + y.int, y.cap + y.loan),
      cr: ratios.current(ca, cl), at: ratios.acidTest(ca, y.inv, cl), it: ratios.inventoryTurnover(y.cos, y.openInv, y.inv),
      rd: ratios.receivablesDays(y.recv, y.rev), pd: ratios.payablesDays(y.pay, creditPurchases),
    };
  });
  check("w4b cam np 2025", R[1].np, 18990);
  const [y0, y1] = Y;
  const growth = ((y1.rev - y0.rev) / y0.rev) * 100;
  const [a, c] = R;
  const stim = table(["", "2024 US\\$", "2025 US\\$"], [
    ["Revenue (all on credit)", y0.rev, y1.rev], ["Cost of sales", y0.cos, y1.cos], ["Expenses (including loan interest)", y0.exp, y1.exp], ["Loan interest", y0.int, y1.int],
    [`Inventory at 31 December (1 January 2024: ${fmt(y0.openInv)})`, y0.inv, y1.inv], ["Trade receivables", y0.recv, y1.recv], ["Bank", y0.bank, "–"], ["Bank overdraft", "–", y1.od], ["Trade payables", y0.pay, y1.pay],
    ["Capital at 31 December", y0.cap, y1.cap], ["10% loan (repayable 2032)", y0.loan, y1.loan],
  ]);
  const prev = table(["Ratio (2024)", "Result"], [["Gross profit margin", `${d1(a.gpm)}%`], ["Profit margin", `${d1(a.pm)}%`], ["Return on capital employed", `${d1(a.roce)}%`], ["Acid test ratio", `${d2(a.at)} : 1`], ["Rate of inventory turnover", `${d1(a.it)} times`], ["Trade receivables turnover", `${d0(a.rd)} days`]]);
  b.struct({
    d: 5, secs: 1260, examStyle: true, skill: "EVALUATION", calculator: true,
    concepts: ["acc.analysis.interpretation", "acc.analysis.profitability-ratios", "acc.analysis.liquidity-ratios", "acc.analysis.efficiency-ratios"],
    stem: `Chipo Sibanda sells farm equipment to smallholders around Marondera. She allows customers 30 days' credit. In 2025 she lowered her prices to win more customers. Extracts from her financial statements:\n\n${stim}\n\nRatios for 2024:\n\n${prev}`,
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "pct", value: c.gpm, stem: "Calculate the gross profit margin for 2025, to one decimal place.", explanation: `${fmt(c.gp)} ÷ ${fmt(y1.rev)} × 100 = ${d1(c.gpm)}%.` }),
      P.num({ label: "(b)", marks: 1, kind: "pct", value: c.pm, stem: "Calculate the profit margin for 2025, to one decimal place.", explanation: `Profit for the year ${fmt(c.np)} ÷ ${fmt(y1.rev)} × 100 = ${d1(c.pm)}%.` }),
      P.num({ label: "(c)", marks: 2, kind: "pct", value: c.roce, wrong: [d1(ratios.roce(c.np, y1.cap + y1.loan)), d1(ratios.roce(c.np + y1.int, y1.cap))], stem: "Calculate the return on capital employed for 2025, to one decimal place.", explanation: `Profit before interest ${fmt(c.np)} + ${fmt(y1.int)} = ${fmt(c.np + y1.int)}; capital employed ${fmt(y1.cap)} + ${fmt(y1.loan)} = ${fmt(y1.cap + y1.loan)}; ROCE ${d1(c.roce)}%.` }),
      P.num({ label: "(d)", marks: 2, kind: "ratio", value: c.at, wrong: [d2(c.cr)], stem: "Calculate the acid test ratio at 31 December 2025, as x : 1 to two decimal places.", explanation: `Current assets ${fmt(c.ca)} − inventory ${fmt(y1.inv)} = ${fmt(r2(c.ca - y1.inv))}; current liabilities ${fmt(c.cl)} (including the overdraft); ${d2(c.at)} : 1.` }),
      P.num({ label: "(e)", marks: 2, kind: "times", value: c.it, wrong: [d1(y1.cos / y1.inv)], stem: "Calculate the rate of inventory turnover for 2025, to one decimal place.", explanation: `Average inventory (${fmt(y1.openInv)} + ${fmt(y1.inv)}) ÷ 2 = ${fmt((y1.openInv + y1.inv) / 2)}; ${fmt(y1.cos)} ÷ ${fmt((y1.openInv + y1.inv) / 2)} = ${d1(c.it)} times.` }),
      P.num({ label: "(f)", marks: 2, kind: "days", value: c.rd, stem: "Calculate the trade receivables turnover in days for 2025, to the nearest whole day.", explanation: `${fmt(y1.recv)} ÷ ${fmt(y1.rev)} × 365 = ${d1(c.rd)} → ${d0(c.rd)} days.` }),
      P.manual({ label: "(g)", marks: 3, stem: "Comment on the change in Chipo's profitability between 2024 and 2025.", points: [`Gross margin fell from ${d1(a.gpm)}% to ${d1(c.gpm)}%, consistent with the price cuts`, `Profit margin fell from ${d1(a.pm)}% to ${d1(c.pm)}% and ROCE from ${d1(a.roce)}% to ${d1(c.roce)}%`, `Revenue rose by ${d1(growth)}% but profit for the year fell from ${fmt(a.np)} to ${fmt(c.np)}: higher volume did not make up for lower margins and higher expenses`], modelAnswer: `Profitability has worsened. The price cuts lowered the gross margin from ${d1(a.gpm)}% to ${d1(c.gpm)}%. Expenses also rose, so the profit margin fell from ${d1(a.pm)}% to ${d1(c.pm)}% and ROCE from ${d1(a.roce)}% to ${d1(c.roce)}%. Revenue grew by ${d1(growth)}%, but profit for the year fell from US\\$${fmt(a.np)} to US\\$${fmt(c.np)}.`, explanation: "Direction, figures and cause." }),
      P.manual({ label: "(h)", marks: 3, stem: "Comment on Chipo's liquidity and her management of inventory and trade receivables in 2025.", points: [`Acid test fell from ${d2(a.at)} : 1 to ${d2(c.at)} : 1 and the bank balance became an overdraft`, `Inventory turnover slowed from ${d1(a.it)} to ${d1(c.it)} times: more cash tied up in equipment`, `Customers took ${d0(c.rd)} days against 30 allowed (${d0(a.rd)} days in 2024): weaker credit control`], modelAnswer: `Liquidity has weakened: the acid test fell from ${d2(a.at)} : 1 to ${d2(c.at)} : 1 and the bank is overdrawn. Inventory rose to ${money(y1.inv)} and turnover slowed to ${d1(c.it)} times, while customers now take ${d0(c.rd)} days to pay instead of ${d0(a.rd)}, well beyond the 30 days allowed. Cash is tied up in stock and debts.`, explanation: "Link efficiency to liquidity." }),
      P.manual({ label: "(i)", marks: 4, stem: "Evaluate Chipo's decision to lower her prices in 2025. Advise her whether she should continue with the lower prices.", points: ["For: revenue and customer numbers increased; may build market share / loyalty for the future", "Against: lower margins, lower profit and ROCE, weaker liquidity as more stock and debts are carried", "Other considerations: non-financial factors (competition, customers' ability to pay, the farming season)", "Justified conclusion, e.g. raise prices partly and tighten credit control, or keep low prices only if expenses and debts are controlled"], modelAnswer: "The lower prices did attract customers: revenue rose by about one-eighth, which may build loyalty among smallholders. But the extra sales were less profitable, so profit and ROCE fell, and Chipo now carries more stock and slower debts, leaving her overdrawn. Unless competitors are also cutting prices, she should restore part of the price cut, enforce her 30-day credit terms and reduce inventory; continuing as in 2025 would keep weakening both profit and cash.", explanation: "Two sides, a non-financial point and a justified conclusion." }),
    ],
    hints: ["ROCE uses profit before interest and capital employed = capital + non-current liabilities.", "The overdraft is a current liability; all sales are on credit."],
    explanation: `2025 ratios: gross margin ${d1(c.gpm)}%, profit margin ${d1(c.pm)}%, ROCE ${d1(c.roce)}%, acid test ${d2(c.at)} : 1, inventory turnover ${d1(c.it)} times, receivables ${d0(c.rd)} days (2024: ${d1(a.gpm)}%, ${d1(a.pm)}%, ${d1(a.roce)}%, ${d2(a.at)} : 1, ${d1(a.it)} times, ${d0(a.rd)} days).`,
  });
});
