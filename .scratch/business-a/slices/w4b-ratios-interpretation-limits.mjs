// W4b: ratios.interpretation-limits
import { concept, P, table, r2, ratios, chk, fmt, pctChange } from "../lib.mjs";
import { mc } from "../tables/w4b-lib.mjs";

concept("abus.ratios.interpretation-limits", { file: "ratios/interpretation-limits", keyPrefix: "ratios.interpretation-limits" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What is **window dressing**?",
    ok: ["Making accounts look better than the real position", "Correct: figures are improved temporarily, often just before the year end."],
    bad: [["Changing the display in the windows of a retail shop", "In accounting the term has nothing to do with shop displays."], ["Comparing a firm's accounts with those of a rival", "That is inter-firm comparison."], ["Checking the accounts independently for errors", "That is an audit, which is designed to find such practices."]],
    explanation: "Window dressing means arranging figures, for example by delaying payments or collecting debts early, to make the accounts look stronger.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What does **trend analysis** involve?",
    ok: ["Comparing a firm's ratios over several years", "Correct: it shows whether performance is improving or declining."],
    bad: [["Comparing a firm's ratios with those of its rivals", "That is inter-firm comparison."], ["Forecasting next year's sales from market research", "That is sales forecasting, not trend analysis of accounts."], ["Adding up all the ratios to give one score", "Ratios are not added together."]],
    explanation: "Trend analysis compares the same ratios across years to see the direction and size of change.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of the following is a **limitation** of ratio analysis?",
    ok: ["It ignores non-financial factors such as morale", "Correct: these affect success but do not appear in the accounts."],
    bad: [["It can only be used by large public companies", "Any business with accounts can calculate ratios."], ["It shows the future position of a business exactly", "Ratios use historic data and cannot show the future exactly."], ["It cannot be used to compare different years", "Comparing years is one of its main uses."]],
    explanation: "Ratios are based on past financial data and omit quality of management, morale, reputation and similar factors.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "A fictional company finances an expansion by issuing new shares instead of borrowing. Compared with borrowing, what is the likely effect?",
    ok: ["Gearing is lower, but earnings per share may be diluted", "Correct: no new interest, but profit is shared among more shares."],
    bad: [["Gearing is higher, because the shares must be repaid", "Shares are not repaid and are not part of non-current liabilities."], ["Interest costs rise, because shares pay interest", "Shares pay dividends, not interest, and dividends are not compulsory."], ["Gearing is unchanged, because capital employed is unchanged", "Capital employed rises and the proportion that is borrowed falls."]],
    hints: ["Think about what happens to the proportion of capital that is borrowed."],
    explanation: "Equity finance lowers gearing and avoids compulsory interest, but the profit is shared among more shares, so earnings per share may fall.",
  });
  mc(b, {
    d: 3, skill: "EVALUATION",
    stem: "Why might a comparison of the ratios of two fictional rival firms be unfair?",
    ok: ["They may value inventory and depreciate assets differently", "Correct: different policies make the figures not strictly comparable."],
    bad: [["Rivals always have identical ratios in a given year", "Rivals' ratios differ."], ["Ratios cannot be calculated for businesses in the same industry", "Ratios can be calculated for any business."], ["The firms must be using different currencies in the same town", "This is not the usual problem; policies and year-ends are."]],
    hints: ["Think about how the accounts are prepared."],
    explanation: "Differences in accounting policies, year-ends and product mix reduce the comparability of ratios.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A fictional company raises its dividend by 50% while profit stays the same. What is the effect on its investor ratios?",
    ok: ["Dividend yield rises and dividend cover falls", "Correct: more is paid out against the same price and profit."],
    bad: [["Dividend yield and dividend cover both rise", "Cover = profit ÷ dividend, so a bigger dividend lowers cover."], ["Dividend yield falls and dividend cover rises", "This is the effect of a smaller dividend."], ["Neither ratio changes, because profit is unchanged", "Both ratios use the dividend."]],
    hints: ["The dividend is in the numerator of the yield and the denominator of the cover."],
    explanation: "A higher dividend raises the yield (dividend ÷ price) and reduces cover (profit ÷ dividend), leaving less profit for retention.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A single year's ratios are enough to identify a trend in a business's performance.",
    answer: false,
    explanation: "False. A trend needs at least two, and preferably several, years so that direction and size of change can be seen.",
  });
  b.tf({
    d: 3, skill: "EVALUATION",
    stem: "A ratio that is poor compared with a rival always shows that the business is badly managed.",
    answer: false,
    hints: ["What else could explain the difference?"],
    explanation: "False. Differences may arise from accounting policies, the size or age of the firm, the product mix or a growth strategy that has not yet paid off.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each limitation to its description.",
    pairs: [["Historic data", "Accounts show the past, not the future"], ["Window dressing", "Figures arranged to look better at the year end"], ["Different accounting policies", "Depreciation or inventory valued in different ways"], ["Non-financial factors", "Morale and reputation are not in the accounts"]],
    explanation: "Each limitation reduces the reliability of ratio analysis in a different way.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "Comparing a firm's ratios with a rival's is called inter-{{blank:a}} comparison, while comparing its own ratios over several years is {{blank:b}} analysis.",
    blanks: [
      { id: "a", accepted: ["firm"], choices: ["firm", "year", "market"] },
      { id: "b", accepted: ["trend"], choices: ["trend", "cost", "break-even"] },
    ],
    explanation: "Inter-firm comparison looks across businesses; trend analysis looks across years.",
  });

  // ---- numerical items
  const g = pctChange(480000, 546000);
  chk(g, 13.75, 1e-9);
  b.num({
    d: 2, skill: "APPLICATION", kind: "pct", value: g, calculator: true, wrong: [r2(pctChange(546000, 480000)), r2((66000 / 546000) * 100)],
    stem: "A fictional company's revenue was US\\$480,000 in 2024 and US\\$546,000 in 2025. Calculate the percentage increase in revenue, to one decimal place.",
    hints: ["Change ÷ original value × 100."],
    explanation: "Increase = 546,000 − 480,000 = 66,000. 66,000 ÷ 480,000 × 100 = 13.75%, which is 13.8% to one decimal place. Using the new value as the base gives 12.1%.",
  });
  const gm24 = ratios.grossMargin(192000, 480000), gm25 = ratios.grossMargin(207000, 546000);
  chk(gm24, 40, 1e-9); chk(gm25, 37.9121, 1e-3);
  b.calc({
    d: 3, skill: "ANALYSIS", kind: "plain", dp: 1, unit: "percentage points", value: gm24 - gm25, calculator: true, daily: false, wrong: [r2(gm25), 15000],
    stem: "For the company above, gross profit was US\\$192,000 in 2024 and US\\$207,000 in 2025. Calculate the fall in the gross profit margin between the two years, in percentage points, to one decimal place.",
    hints: ["Calculate each year's margin first."],
    explanation: "2024: 192,000 ÷ 480,000 × 100 = 40.0%. 2025: 207,000 ÷ 546,000 × 100 = 37.9%. The fall is 40.0 − 37.9 = 2.1 percentage points. Gross profit actually rose by US\\$15,000, so the fall is in the margin, not the amount.",
    workedSolution: "1. 2024 margin = 192,000 ÷ 480,000 × 100 = 40.0%.\n2. 2025 margin = 207,000 ÷ 546,000 × 100 = 37.9%.\n3. Fall = 2.1 percentage points.",
  });
  const needOp = 0.18 * 530000;
  chk(needOp, 95400, 1e-6);
  const extra = needOp - 82000;
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: extra, calculator: true, wrong: [needOp, 18000],
    stem: "A fictional company has opened a second branch. Its capital employed has risen to US\\$530,000 and its profit from operations is US\\$82,000. The directors want the ROCE to reach 18.0%. Calculate the further profit from operations needed.",
    hints: ["Find the profit that gives 18.0% on the new capital employed."],
    explanation: "Profit needed = 18.0% × 530,000 = US\\$95,400. Extra needed = 95,400 − 82,000 = US\\$13,400. The current ROCE is only 15.5%.",
    workedSolution: "1. Required profit from operations = 0.18 × 530,000 = 95,400.\n2. Extra needed = 95,400 − 82,000 = 13,400.",
  });
  const cov = ratios.dividendCover(84000, 28000 * 1.5);
  chk(cov, 2, 1e-9);
  b.num({
    d: 3, skill: "APPLICATION", kind: "times", dp: 2, value: cov, calculator: true, wrong: [3, 126000 / 84000],
    stem: "A fictional company has a profit for the year of US\\$84,000 and pays a dividend of US\\$28,000. It decides to raise the dividend by 50% while profit stays the same. Calculate the new dividend cover, in times to two decimal places.",
    hints: ["Work out the new total dividend first."],
    explanation: "New dividend = 28,000 × 1.5 = 42,000. Cover = 84,000 ÷ 42,000 = 2.00 times, down from 3.00. The same profit now covers the dividend fewer times.",
  });
  const gnew = ratios.gearing(120000 - 50000, 400000);
  chk(gnew, 17.5, 1e-9);
  b.num({
    d: 3, skill: "APPLICATION", kind: "pct", value: gnew, calculator: true, wrong: [30, r2((70000 / 350000) * 100)],
    stem: "A fictional company has non-current liabilities of US\\$120,000 and capital employed of US\\$400,000. It issues US\\$50,000 of new shares and uses the cash to repay US\\$50,000 of the loan. Calculate its new gearing ratio, to one decimal place.",
    hints: ["Capital employed does not change: shares rise and the loan falls by the same amount."],
    explanation: "New non-current liabilities = 120,000 − 50,000 = 70,000. Capital employed remains 400,000 (shares up 50,000, loan down 50,000). Gearing = 70,000 ÷ 400,000 × 100 = 17.5%, down from 30.0%.",
  });

  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "State one limitation of using published accounts to judge a business.",
    accepted: ["historic data", "window dressing", "different accounting policies", "ignores non-financial factors", "out of date", "based on past figures", "does not show future performance"],
    keywords: { any: ["historic", "past", "window", "policies", "non-financial", "out of date", "future", "inflation", "different year"], minAny: 1 },
    explanation: "Accept historic data, window dressing, different accounting policies or the omission of non-financial factors.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why ratios from one year are of limited use on their own.",
    points: ["One figure cannot show whether performance is improving or worsening", "It must be compared with earlier years, with a rival or with a target to be meaningful", "A single year may be unusual because of a one-off event or season"],
    modelAnswer: "One figure cannot show whether performance is improving or worsening. It has to be compared with earlier years, a rival or a target before it means anything, and a single year may be unusual because of a one-off event or the season.",
    hints: ["Ask: compared with what?"],
    explanation: "Ratios need a comparison.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "A fictional company's ROCE falls after it opens a new factory. Analyse why this fall might be temporary.",
    points: ["Capital employed rises as soon as the factory is built", "Profit from the factory takes time to arrive as production and sales build up", "So the profit is divided by a larger figure at first, lowering ROCE", "As output grows, profit from operations should rise and ROCE recover"],
    modelAnswer: "Capital employed rises as soon as the factory is built, but the profit from it arrives slowly as production and sales build up. At first, profit is divided by a larger figure, so ROCE falls; as output grows, profit from operations should rise and ROCE should recover.",
    hints: ["Which comes first, the capital or the profit?"],
    explanation: "Investment comes before the return.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "Evaluate how reliable ratio analysis is as a basis for a bank's decision to lend to a business.",
    points: ["Ratios give an objective measure of liquidity, gearing and profitability", "Trends and comparisons with rivals show strengths and weaknesses", "They are based on past data and say little about future cash flow", "Window dressing and different policies may distort the figures", "Non-financial factors such as management quality and security are not shown", "Judgement and reason, for example use ratios with the cash flow forecast and other information"],
    modelAnswer: "Ratios give an objective measure of liquidity, gearing and profitability, and trends and comparisons show strengths and weaknesses. But they use past data and say little about future cash flow, they can be distorted by window dressing and different accounting policies, and they omit non-financial factors such as the quality of management and the security offered. A bank should use ratios together with the cash flow forecast and other information, rather than as the sole basis for its decision.",
    hints: ["Weigh what ratios show against what they leave out."],
    explanation: "Strengths and limitations weighed, with a conditional judgement.",
  });

  // ---- practice structured items
  const M = { op: 64000, sh: 160000, res: 100000, ncl: 140000 };
  const ceM = ratios.capitalEmployed(M.sh, M.res, M.ncl), rocM = ratios.roce(M.op, ceM), gM = ratios.gearing(M.ncl, ceM);
  chk(ceM, 400000); chk(rocM, 16, 1e-9); chk(gM, 35, 1e-9);
  b.struct({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: `Masvingo Hardware Ltd is a fictional company. In 2025 it built a second shop, financed mainly by a bank loan. Its profit from operations in 2025 was US\\$64,000. At the end of 2025 it had issued shares of US\\$160,000, reserves of US\\$100,000 and non-current liabilities of US\\$140,000. In 2024 its ROCE was 18.0% and its gearing was 15.0%.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "pct", value: rocM, wrong: [r2((64000 / 260000) * 100), 18], stem: "Calculate the ROCE for 2025, to one decimal place.", explanation: "Capital employed = 160,000 + 100,000 + 140,000 = 400,000. ROCE = 64,000 ÷ 400,000 × 100 = 16.0%." }),
      P.num({ label: "(b)", marks: 2, kind: "pct", value: gM, wrong: [r2((140000 / 260000) * 100), 15], stem: "Calculate the gearing ratio for 2025, to one decimal place.", explanation: "140,000 ÷ 400,000 × 100 = 35.0%." }),
      P.manual({ label: "(c)", marks: 5, stem: "Analyse what the changes in the two ratios between 2024 and 2025 show, and whether they are cause for concern.", points: ["ROCE fell from 18.0% to 16.0%", "Gearing rose from 15.0% to 35.0%, because of the loan for the second shop", "The new shop adds capital employed at once, but its profit takes time to build up", "Higher gearing means more compulsory interest and more risk if sales are weak", "The fall may be temporary, so the 2026 figures and the new shop's sales are needed before judging"], modelAnswer: "ROCE fell from 18.0% to 16.0% and gearing rose from 15.0% to 35.0% because of the loan for the second shop. The new shop adds capital employed at once, but its profit takes time to build up, so ROCE may recover. Higher gearing means more compulsory interest and more risk if sales are weak. The change is not necessarily a cause for concern yet, but the 2026 figures and the new shop's sales are needed before a judgement can be made.", explanation: "Investment lowers ROCE and raises gearing at first." }),
    ],
    hints: ["Capital employed is shares + reserves + non-current liabilities."],
    explanation: "ROCE 16.0% (down from 18.0%); gearing 35.0% (up from 15.0%); a possibly temporary effect of expansion.",
  });
  const A = { rev: 600000, op: 54000, ce: 270000 }, B = { rev: 450000, op: 63000, ce: 420000 };
  const omA = ratios.operatingMargin(A.op, A.rev), omB = ratios.operatingMargin(B.op, B.rev), rA = ratios.roce(A.op, A.ce), rB = ratios.roce(B.op, B.ce);
  chk(omA, 9, 1e-9); chk(omB, 14, 1e-9); chk(rA, 20, 1e-9); chk(rB, 15, 1e-9);
  const tbl = table(["US\\$", "Zuva Transport Ltd", "Dube Logistics Ltd"], [["Revenue", A.rev, B.rev], ["Profit from operations", A.op, B.op], ["Capital employed", A.ce, B.ce]]);
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: `A fictional bank is deciding which of two transport companies in Harare to lend to. Their figures for the same year are shown.\n\n${tbl}\n\nDube Logistics changed its method of depreciating vehicles during the year, and in the last week of December it delayed paying several suppliers so that its bank balance looked healthy at the year end. Zuva Transport is a younger company with older vehicles.`,
    parts: [
      P.group({ label: "(a)", stem: "Calculate the operating profit margin, to one decimal place, of:", parts: [
        P.num({ label: "(i)", marks: 2, kind: "pct", value: omA, wrong: [20, r2((54000 / 270000) * 100)], stem: "Zuva Transport Ltd;", explanation: "54,000 ÷ 600,000 × 100 = 9.0%." }),
        P.num({ label: "(ii)", marks: 2, kind: "pct", value: omB, wrong: [15, r2((63000 / 420000) * 100)], stem: "Dube Logistics Ltd.", explanation: "63,000 ÷ 450,000 × 100 = 14.0%." }),
      ] }),
      P.group({ label: "(b)", stem: "Calculate the ROCE, to one decimal place, of:", parts: [
        P.num({ label: "(i)", marks: 2, kind: "pct", value: rA, wrong: [9, r2((54000 / 600000) * 100 * 2)], stem: "Zuva Transport Ltd;", explanation: "54,000 ÷ 270,000 × 100 = 20.0%." }),
        P.num({ label: "(ii)", marks: 2, kind: "pct", value: rB, wrong: [14, r2((63000 / 450000) * 100 * 2)], stem: "Dube Logistics Ltd.", explanation: "63,000 ÷ 420,000 × 100 = 15.0%." }),
      ] }),
      P.manual({ label: "(c)", marks: 6, stem: "Evaluate which company the bank should lend to, using the ratios and the other information.", points: [["Dube has the higher operating margin (14.0% against 9.0%) but Zuva has the higher ROCE (20.0% against 15.0%), because Zuva uses its capital more efficiently", 2], ["Dube's figures may be unreliable: the change in depreciation affects profit, and delaying payments to suppliers is window dressing that hides weaker liquidity", 2], ["Zuva's older vehicles may need replacing soon, which would raise its capital employed and costs", 1], ["Judgement with a reason and condition, for example Zuva, subject to a look at its vehicle replacement plans; or Dube only after examining liquidity throughout the year", 1]], levels: [[3, 5, 6, "Uses both margins and ROCE and the limitations in the case; a justified decision with a condition"], [2, 3, 4, "Compares some ratios with some use of the case; judgement weakly supported"], [1, 1, 2, "States ratios with little analysis"]], modelAnswer: "Dube has the higher operating margin, 14.0% against 9.0%, but Zuva has the higher ROCE, 20.0% against 15.0%, so Zuva uses its capital more efficiently. Dube's figures are less reliable: it changed its depreciation method, which affects profit, and by delaying payments to suppliers it window-dressed its year-end bank balance, hiding weaker liquidity. Zuva's older vehicles may need replacing soon, which would raise its capital employed and costs. On balance the bank should lend to Zuva, subject to examining its plans for replacing vehicles, and should look at Dube's liquidity during the year before considering it.", hints: ["Compare the ratios, then ask how reliable each company's figures are."], explanation: "Zuva has the better ROCE and more reliable figures; Dube's accounts show signs of window dressing." }),
    ],
    hints: ["Operating margin uses revenue; ROCE uses capital employed."],
    explanation: "Operating margins 9.0% and 14.0%; ROCE 20.0% and 15.0%; Zuva is the better choice, subject to its replacement plans.",
  });

  b.card("DEFINITION", "Trend analysis", "Comparing a business's ratios over several years to see whether performance is improving or declining.");
  b.card("DEFINITION", "Inter-firm comparison", "Comparing a business's ratios with a competitor's or the industry average.");
  b.card("DEFINITION", "Window dressing", "Arranging the figures, often just before the year end, to make the accounts look stronger than the real position.");
  b.card("FACT", "Limitations of ratio analysis", "Historic data; different accounting policies; window dressing; no non-financial factors; inflation and different year-ends; ratios show symptoms, not causes.");
  b.card("CONCEPT", "Financing growth with a loan", "Gearing and interest rise, dividend cover falls; ROCE rises only if the project earns more than the interest.");
  b.card("CONCEPT", "Financing growth with shares", "Gearing falls and there is no compulsory interest, but earnings per share may be diluted.");
  b.card("CONCEPT", "Raising the dividend", "Dividend yield rises, dividend cover falls and less profit is retained.");
  b.card("CONCEPT", "Why ROCE may fall after expansion", "Capital employed rises at once but the profit takes time to arrive.");
  b.card("CONCEPT", "Writing a ratio report", "Group the ratios, explain each change using the case, compare with a rival or earlier year, state limitations and end with a conditional recommendation.");
});
