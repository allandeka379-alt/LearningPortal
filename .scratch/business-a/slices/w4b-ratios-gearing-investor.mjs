// W4b: ratios.gearing-investor
import { concept, P, table, r2, ratios, chk, fmt, ZIM } from "../lib.mjs";
import { mc } from "../tables/w4b-lib.mjs";

concept("abus.ratios.gearing-investor", { file: "ratios/gearing-investor", keyPrefix: "ratios.gearing-investor" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which formula gives the **gearing ratio**?",
    ok: ["Non-current liabilities ÷ capital employed × 100", "Correct: the share of long-term capital that is borrowed."],
    bad: [["Current liabilities ÷ capital employed × 100", "Gearing uses non-current (long-term) liabilities, not current ones."], ["Non-current liabilities ÷ issued shares × 100", "The denominator must be the whole of capital employed."], ["Profit from operations ÷ capital employed × 100", "That is ROCE, a profitability ratio."]],
    explanation: "Gearing (%) = non-current liabilities ÷ capital employed × 100.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the main risk to a company with **high gearing**?",
    ok: ["Interest must be paid even when profits are low", "Correct: borrowing creates fixed commitments whatever the profit."],
    bad: [["The owners lose control to every new shareholder", "New shares dilute control; borrowing does not."], ["Dividends must be paid whether or not profit is made", "Dividends are not compulsory; interest is."], ["The company cannot make profit from its borrowed money", "Borrowed money can earn profit; the risk is the commitment."]],
    explanation: "Interest and loan repayments are fixed commitments, so a fall in profit can threaten a highly geared company.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Which action would **lower** the gearing of a fictional company?",
    ok: ["Issuing new shares and using the cash to repay a loan", "Correct: long-term liabilities fall while capital employed is largely unchanged."],
    bad: [["Taking out a new long-term bank loan to buy equipment", "Non-current liabilities rise, which increases gearing."], ["Buying back some of its own shares using a loan", "This lowers equity and raises debt, increasing gearing."], ["Paying out all of the profit for the year as dividends", "Lower reserves reduce equity, so gearing rises."]],
    hints: ["Gearing falls when long-term borrowing falls relative to capital employed."],
    explanation: "Replacing debt with equity reduces non-current liabilities relative to capital employed.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A company's dividend per share is unchanged, but its market share price rises. What happens to its dividend yield?",
    ok: ["It falls, as the same dividend is divided by a higher price", "Correct: yield = dividend per share ÷ market price × 100."],
    bad: [["It rises, because a higher price means a better company", "A higher price in the denominator lowers the yield."], ["It is unchanged, because the dividend per share is unchanged", "The yield depends on the price too."], ["It rises, as the dividend cover must have increased", "Dividend cover is not affected by the share price."]],
    hints: ["The price is the denominator."],
    explanation: "With the same dividend and a higher price, the yield falls. Shareholders then rely more on the share price rising for their return.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A dividend cover of less than 1 means that the company paid out more in dividends than it earned in profit for the year.",
    answer: true,
    explanation: "True. Cover = profit for the year ÷ dividend; below 1 means the dividend exceeded the profit and was paid partly from reserves.",
  });
  b.tf({
    d: 3, skill: "EVALUATION",
    stem: "A highly geared company is always a poor investment.",
    answer: false,
    hints: ["When might borrowed money earn more than it costs?"],
    explanation: "False. If borrowed money earns more than the interest it costs, high gearing raises returns to shareholders. The danger is the fixed commitment if profit falls.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each ratio to the question it answers.",
    pairs: [["Gearing", "How much of the long-term capital is borrowed?"], ["Dividend yield", "What cash return does a share pay compared with its price?"], ["Dividend cover", "How safe is the dividend from the year's profit?"], ["Price/earnings ratio", "How many years of earnings does the price represent?"]],
    explanation: "Each ratio looks at a different aspect of risk or return.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "The dividend yield compares the dividend per share with the {{blank:a}} price, while dividend cover compares the {{blank:b}} with the total dividend.",
    blanks: [
      { id: "a", accepted: ["market"], choices: ["market", "nominal", "cost"] },
      { id: "b", accepted: ["profit"], choices: ["profit", "revenue", "reserves"] },
    ],
    explanation: "Dividend yield uses the market price; dividend cover uses the profit for the year.",
  });

  // ---- numerical items
  const g1 = ratios.gearing(54000, 240000);
  chk(g1, 22.5, 1e-9);
  b.num({
    d: 2, skill: "APPLICATION", kind: "pct", value: g1, calculator: true, wrong: [r2((54000 / (240000 - 54000)) * 100), r2((240000 / 54000) * 100)],
    stem: "A fictional bakery company has non-current liabilities of US\\$54,000 and capital employed of US\\$240,000. Calculate its gearing ratio, to one decimal place.",
    hints: ["Non-current liabilities ÷ capital employed."],
    explanation: "54,000 ÷ 240,000 × 100 = 22.5%. Dividing by the equity alone (186,000) gives 29.0%.",
  });
  const ce2 = ratios.capitalEmployed(150000, 85000, 115000);
  const g2 = ratios.gearing(115000, ce2);
  chk(ce2, 350000); chk(g2, 32.8571, 1e-3);
  b.num({
    d: 3, skill: "APPLICATION", kind: "pct", value: g2, calculator: true, daily: true, wrong: [r2((115000 / 235000) * 100), r2((115000 / 150000) * 100)],
    stem: "A fictional haulage company has issued shares of US\\$150,000, reserves of US\\$85,000 and non-current liabilities of US\\$115,000. Calculate its gearing ratio, to one decimal place.",
    hints: ["Add all three items to find capital employed."],
    explanation: "Capital employed = 150,000 + 85,000 + 115,000 = 350,000. Gearing = 115,000 ÷ 350,000 × 100 = 32.9%. Using only the shares and reserves as the denominator gives 48.9%.",
  });
  const dy = ratios.dividendYield(0.14, 2.0);
  chk(dy, 7, 1e-9);
  b.num({
    d: 3, skill: "APPLICATION", kind: "pct", value: dy, calculator: true, wrong: [r2((0.14 / 1) * 100), r2((2.0 / 0.14))],
    stem: "A fictional company paid a dividend of 14 cents per share. The market price of a share is US\\$2.00. Calculate the dividend yield, to one decimal place.",
    hints: ["Dividend per share ÷ market price × 100, in the same units."],
    explanation: "0.14 ÷ 2.00 × 100 = 7.0%. Dividing 2.00 by 0.14 inverts the fraction and gives 14.3.",
  });
  const dc = ratios.dividendCover(72000, 32000);
  chk(dc, 2.25, 1e-9);
  b.num({
    d: 3, skill: "APPLICATION", kind: "times", dp: 2, value: dc, calculator: true, wrong: [r2(32000 / 72000), 44.4],
    stem: "A fictional company made a profit for the year of US\\$72,000 and paid dividends of US\\$32,000. Calculate the dividend cover, in times to two decimal places.",
    hints: ["Profit for the year ÷ total dividend."],
    explanation: "72,000 ÷ 32,000 = 2.25 times. Inverting the fraction gives 0.44.",
  });
  const eps = ratios.earningsPerShare(45000, 150000);
  const pe = ratios.priceEarnings(3.15, eps);
  chk(eps, 0.3, 1e-9); chk(pe, 10.5, 1e-9);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "times", value: pe, calculator: true, wrong: [r2(3.15 / 0.045), r2(0.3 / 3.15)],
    stem: "A fictional company made a profit for the year of US\\$45,000. It has 150,000 ordinary shares and the market price per share is US\\$3.15. Calculate the price/earnings ratio, to one decimal place.",
    hints: ["Find the earnings per share first."],
    explanation: "Earnings per share = 45,000 ÷ 150,000 = US\\$0.30. P/E = 3.15 ÷ 0.30 = 10.5. A common error is to divide the price by the total profit instead of the earnings per share.",
    workedSolution: "1. EPS = 45,000 ÷ 150,000 = US\\$0.30.\n2. P/E = 3.15 ÷ 0.30 = 10.5.",
  });
  const epsz = ratios.earningsPerShare(57600, 240000) * 100;
  chk(epsz, 24, 1e-9);
  b.num({
    d: 3, skill: "APPLICATION", kind: "cents", value: epsz, calculator: true, applies: ZIM, wrong: [r2(57600 / 240), 0.24],
    stem: "A fictional company has a profit for the year of US\\$57,600 and 240,000 ordinary shares. Calculate the earnings per share in cents, to one decimal place.",
    hints: ["Profit for the year ÷ number of ordinary shares; then multiply by 100 for cents."],
    explanation: "57,600 ÷ 240,000 = US\\$0.24, which is 24.0 cents. Leaving the answer in dollars (0.24) is a unit error.",
  });
  const g7 = ratios.gearing(140000 - 45000, 480000 - 45000);
  chk(g7, 21.8391, 1e-3);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "pct", value: g7, calculator: true, wrong: [r2((140000 / 480000) * 100), r2((95000 / 480000) * 100)],
    stem: "A fictional company has non-current liabilities of US\\$140,000 and capital employed of US\\$480,000, a gearing of 29.2%. It repays US\\$45,000 of the loan using cash. Calculate the new gearing ratio, to one decimal place.",
    hints: ["Both the loan and capital employed fall by the amount repaid."],
    explanation: "New non-current liabilities = 140,000 − 45,000 = 95,000. New capital employed = 480,000 − 45,000 = 435,000. Gearing = 95,000 ÷ 435,000 × 100 = 21.8%. Reducing only the loan (95,000 ÷ 480,000) gives 19.8%.",
    workedSolution: "1. Non-current liabilities = 95,000.\n2. Capital employed = 435,000.\n3. Gearing = 95,000 ÷ 435,000 × 100 = 21.8%.",
  });
  const maxDiv = 126000 / 3.5;
  chk(maxDiv, 36000, 1e-9);
  b.calc({
    d: 5, skill: "ANALYSIS", kind: "money", value: maxDiv, calculator: true, wrong: [126000 * 3.5, 126000 - 36000],
    stem: "The directors of a fictional company want its dividend cover to be at least 3.5 times. Its profit for the year is US\\$126,000. Calculate the largest total dividend that meets this target.",
    hints: ["Rearrange: dividend = profit ÷ cover."],
    explanation: "Dividend cover = profit ÷ dividend, so the dividend = 126,000 ÷ 3.5 = US\\$36,000. Multiplying by 3.5 gives US\\$441,000, which is more than the profit.",
    workedSolution: "1. Dividend = profit ÷ cover.\n2. 126,000 ÷ 3.5 = 36,000.",
  });

  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "State one way in which a company could reduce its gearing.",
    accepted: ["repay a loan", "issue new shares", "retain more profit", "pay off long-term debt", "sell shares", "raise equity", "keep more profit as reserves"],
    keywords: { any: ["repay", "pay off", "issue", "shares", "retain", "reserves", "equity", "reduce borrowing"], minAny: 1 },
    explanation: "Accept repaying loans, issuing shares or retaining more profit.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why a low dividend cover may worry shareholders.",
    points: ["A low cover means the dividend takes most of the profit", "A fall in profit could force the company to cut the dividend", "Little profit is kept for growth, so future earnings may suffer"],
    modelAnswer: "A low cover means that the dividend takes most of the profit, so a fall in profit could force the company to cut the dividend. Little profit is kept for growth, so future earnings and the share price may suffer.",
    hints: ["Think about safety and growth."],
    explanation: "Low cover means a less safe dividend and less retained profit.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "A fictional company raises its gearing from 20% to 45% to build a new factory. Analyse one advantage and one disadvantage for its shareholders.",
    points: ["Advantage: shareholders keep control because no new shares are issued", "If the factory earns more than the interest, profit available to shareholders rises", "Disadvantage: interest is a fixed cost that must be paid even if profit is low", "A fall in profit could threaten dividends and the survival of the company"],
    modelAnswer: "The shareholders keep control because no new shares are issued, and if the factory earns more than the interest on the loan, the profit available to them rises. However, interest is a fixed cost that must be paid even if profit is low, so a fall in profit could threaten dividends and even the survival of the company.",
    hints: ["Compare the return on the factory with the interest rate."],
    explanation: "Benefit and risk of higher gearing.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "Evaluate whether a growing company should raise its dividend to increase investor return.",
    points: ["A higher dividend raises the yield and may attract investors", "It signals confidence and may raise the share price", "It lowers dividend cover and leaves less profit for growth", "If profit then falls, the dividend may have to be cut, damaging confidence", "Shareholders in growing firms may prefer reinvestment that raises the share price", "Judgement and reason, for example raise it modestly while keeping cover above 2"],
    modelAnswer: "A higher dividend raises the yield, signals confidence and may raise the share price. But it lowers dividend cover and leaves less profit for growth, and if profit falls the dividend may have to be cut, damaging confidence. Shareholders in a growing firm may prefer reinvestment that raises the share price. The company should raise the dividend modestly, while keeping cover above about 2.",
    hints: ["Weigh the signal of confidence against less retained profit."],
    explanation: "Benefits weighed against growth, with a conditional judgement.",
  });

  // ---- practice structured items
  const G = { 2024: { sh: 200000, res: 120000, ncl: 80000 }, 2025: { sh: 200000, res: 130000, ncl: 220000 } };
  const ceA = ratios.capitalEmployed(G[2025].sh, G[2025].res, G[2025].ncl), ceB = ratios.capitalEmployed(G[2024].sh, G[2024].res, G[2024].ncl);
  const gA = ratios.gearing(G[2025].ncl, ceA), gB = ratios.gearing(G[2024].ncl, ceB), yA = ratios.dividendYield(0.09, 1.2);
  chk(ceA, 550000); chk(gA, 40, 1e-9); chk(gB, 20, 1e-9); chk(yA, 7.5, 1e-9);
  const tbl1 = table(["US\\$", "2024", "2025"], [["Issued shares", G[2024].sh, G[2025].sh], ["Reserves", G[2024].res, G[2025].res], ["Non-current liabilities", G[2024].ncl, G[2025].ncl]]);
  b.struct({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: `Mhofu Properties Ltd is a fictional company in Harare. In 2025 it borrowed US\\$140,000 to buy a block of rental flats. The dividend for 2025 was 9 cents per share and the market price of a share at the year end was US\\$1.20.\n\n${tbl1}`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "pct", value: gA, wrong: [r2((220000 / 330000) * 100), 20], stem: "Calculate the gearing ratio for 2025, to one decimal place.", explanation: "Capital employed = 200,000 + 130,000 + 220,000 = 550,000. Gearing = 220,000 ÷ 550,000 × 100 = 40.0%." }),
      P.num({ label: "(b)", marks: 2, kind: "pct", value: yA, wrong: [r2((1.2 / 0.09)), 9], stem: "Calculate the dividend yield for 2025, to one decimal place.", explanation: "0.09 ÷ 1.20 × 100 = 7.5%." }),
      P.manual({ label: "(c)", marks: 5, stem: "Gearing was 20.0% in 2024. Analyse the effect of the rise in gearing on the company and its shareholders.", points: ["Gearing doubled from 20.0% to 40.0% because of the US\\$140,000 loan", "Interest on the loan is a fixed cost that must be paid whatever the profit", "Rent from the flats may raise profit above the interest, increasing returns to shareholders", "No new shares were issued, so ownership and control are unchanged", "If rents or occupancy fall, profit may not cover the interest and the dividend could be at risk"], modelAnswer: "Gearing doubled from 20.0% to 40.0% because of the US\\$140,000 loan. Interest is a fixed cost that must be paid whatever the profit. If the rent from the flats is more than the interest, the profit available to shareholders will rise, and since no new shares were issued, ownership and control are unchanged. But if rents or occupancy fall, profit may not cover the interest and the dividend could be at risk.", explanation: "Higher gearing raises both return and risk." }),
    ],
    hints: ["Capital employed includes the new loan.", "Yield compares the dividend with the market price."],
    explanation: "Gearing 40.0%; yield 7.5%; the loan brings fixed interest and more risk but may raise returns.",
  });
  const A = { pfy: 96000, div: 48000, sh: 400000, price: 2.4 }, B = { pfy: 84000, div: 63000, sh: 300000, price: 3.5 };
  const yAa = ratios.dividendYield(ratios.dividendPerShare(A.div, A.sh), A.price), yBb = ratios.dividendYield(ratios.dividendPerShare(B.div, B.sh), B.price);
  const cA = ratios.dividendCover(A.pfy, A.div), cB = ratios.dividendCover(B.pfy, B.div);
  chk(yAa, 5, 1e-9); chk(yBb, 6, 1e-9); chk(cA, 2, 1e-9); chk(cB, 1.33333, 1e-4);
  const tbl2 = table(["", "Gweru Dairy Ltd", "Bulawayo Quarry Ltd"], [["Profit for the year (US\\$)", A.pfy, B.pfy], ["Total dividend (US\\$)", A.div, B.div], ["Ordinary shares issued", A.sh, B.sh], ["Market price per share (US\\$)", A.price.toFixed(2), B.price.toFixed(2)]]);
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: `A fictional investor in Harare can buy shares in only one of two companies. The figures for the latest year are shown. Bulawayo Quarry Ltd supplies the construction industry, whose demand varies strongly from year to year; Gweru Dairy Ltd sells milk products with steady demand.\n\n${tbl2}`,
    parts: [
      P.group({ label: "(a)", stem: "Calculate the dividend yield, to one decimal place, of:", parts: [
        P.num({ label: "(i)", marks: 2, kind: "pct", value: yAa, wrong: [48000 / 96000 * 100, 12], stem: "Gweru Dairy Ltd;", explanation: "Dividend per share = 48,000 ÷ 400,000 = US\\$0.12. Yield = 0.12 ÷ 2.40 × 100 = 5.0%." }),
        P.num({ label: "(ii)", marks: 2, kind: "pct", value: yBb, wrong: [21, r2((63000 / 84000) * 100)], stem: "Bulawayo Quarry Ltd.", explanation: "Dividend per share = 63,000 ÷ 300,000 = US\\$0.21. Yield = 0.21 ÷ 3.50 × 100 = 6.0%." }),
      ] }),
      P.group({ label: "(b)", stem: "Calculate the dividend cover, in times to two decimal places, of:", parts: [
        P.num({ label: "(i)", marks: 2, kind: "times", dp: 2, value: cA, wrong: [0.5, 1.33], stem: "Gweru Dairy Ltd;", explanation: "96,000 ÷ 48,000 = 2.00 times." }),
        P.num({ label: "(ii)", marks: 2, kind: "times", dp: 2, value: cB, wrong: [0.75, 2], stem: "Bulawayo Quarry Ltd.", explanation: "84,000 ÷ 63,000 = 1.33 times." }),
      ] }),
      P.manual({ label: "(c)", marks: 6, stem: "Evaluate which company's shares the investor should buy.", points: [["Bulawayo Quarry pays the higher yield (6.0% against 5.0%)", 1], ["But its dividend cover is only 1.33 against 2.00, so the dividend takes three-quarters of profit and is less safe", 2], ["Quarry profit depends on the construction industry, which varies from year to year, so the dividend may be cut in a poor year", 1], ["Dairy retains half of its profit for growth and has steady demand", 1], ["Judgement and reason, for example Dairy for safety and growth, Quarry for income if the investor accepts risk", 1]], levels: [[3, 5, 6, "Uses yield and cover for both firms with the nature of their markets; a justified choice with a condition"], [2, 3, 4, "Compares some ratios with some analysis; judgement weakly supported"], [1, 1, 2, "States ratios with little analysis"]], modelAnswer: "Bulawayo Quarry pays the higher yield, 6.0% against 5.0%, but its cover is only 1.33 against 2.00, so the dividend takes three-quarters of its profit and is less safe. The quarry's profit depends on construction, which varies from year to year, so the dividend could be cut in a poor year. Gweru Dairy keeps half its profit for growth and has steady demand. An investor who values safety and growth should buy the dairy; one who wants income and accepts the risk might prefer the quarry.", hints: ["Compare yield with cover and think about the stability of each business."], explanation: "Quarry gives more income but with more risk; the dairy is safer. The choice depends on the investor's aim." }),
    ],
    hints: ["Find dividend per share first.", "Cover = profit ÷ total dividend."],
    explanation: "Yields 5.0% and 6.0%; cover 2.00 and 1.33. The quarry pays more but the dairy's dividend is safer.",
  });

  b.card("FORMULA", "Gearing ratio", "Non-current liabilities ÷ capital employed × 100.");
  b.card("FORMULA", "Dividend yield", "Dividend per share ÷ market price per share × 100.");
  b.card("FORMULA", "Dividend cover", "Profit for the year ÷ annual dividend (times).");
  b.card("FORMULA", "Price/earnings ratio", "Market price per share ÷ earnings per share.");
  b.card("FORMULA", "Earnings per share", "Profit for the year ÷ number of ordinary shares.", undefined, { applies: ZIM });
  b.card("CONCEPT", "High gearing", "Raises risk because interest is compulsory, but can raise returns to shareholders when profit is good.");
  b.card("CONCEPT", "Ways to lower gearing", "Repay loans, issue shares, retain more profit as reserves.");
  b.card("CONCEPT", "Dividend cover below 1", "The dividend exceeded the year's profit and was paid partly from reserves.");
  b.card("CONCEPT", "Improving investor return", "Raise profit, raise the dividend (lower cover), raise confidence and the share price; each has a cost.");
  b.card("CONCEPT", "Debt or equity for new finance", "Debt keeps control but adds fixed interest; shares add no compulsory cost but dilute control and earnings per share.");
});
