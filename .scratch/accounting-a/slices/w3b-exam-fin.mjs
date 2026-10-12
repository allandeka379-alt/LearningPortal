// W3b FIN25 items (25 marks, ANALYSIS): (1) investment and gearing analysis for two years; (2) ZIMSEC: redemption and loan-note effects on gearing;
// (3) a full ratio report for two years.
import { concept, P, EXAM, checkExam, ZIM, fmt, chk, r2, table, journal, ratios } from "../lib.mjs";
import { coYear, R, splMd, sofpMd, F, usd } from "../tables/w3b-lib.mjs";

const p0 = (v) => String(Math.round(v));
const p1 = (v) => (Math.round(v * 10) / 10).toFixed(1);
const p2 = (v) => (Math.round(v * 100) / 100).toFixed(2);

concept("aacc.ratios.investment", { file: "exam/w3b-fin", keyPrefix: "exam.w3b-fin" }, (b) => {
  const X = EXAM.FIN25;

  // ===================================================================================================
  // Item 1: investment and gearing analysis for two years (both boards)
  {
    const D = {
      24: { profit: 109800, pfo: 158400, fin: 20700, shares: 744000, div: 46800, price: 1.12, sc: 372000, res: 233000, loan: 207000 },
      25: { profit: 94320, pfo: 143100, fin: 36900, shares: 744000, div: 50400, price: 0.91, sc: 372000, res: 276920, loan: 369000 },
    };
    const m = (x) => ({
      eps: (x.profit / x.shares) * 100, dps: (x.div / x.shares) * 100,
      pe: (x.price * 100) / ((x.profit / x.shares) * 100), yld: ((x.div / x.shares) * 100) / (x.price * 100) * 100,
      cover: x.profit / x.div, gear: ratios.gearing(x.loan, x.sc, x.res), ic: x.pfo / x.fin, ce: x.sc + x.res + x.loan,
    });
    const a = m(D[24]), c = m(D[25]);
    b.struct({
      d: 5, examStyle: true, skill: X.skill, secs: X.secs,
      paper: "ZIMSEC and Cambridge Paper 3", calculator: true,
      concepts: ["aacc.ratios.investment", "aacc.ratios.solvency-gearing", "aacc.ratios.analysis-limits"],
      stem: `Mberengwa Bakeries Ltd has 744,000 ordinary shares of US\\$0.50 each in issue in both years. In 2025 the company borrowed to build a second bakery in Zvishavane. Extracts from its financial statements are given below. Use year-end figures. Give per-share figures in cents to one decimal place, percentages to one decimal place and other ratios to one decimal place.\n\n${table(["Item", "2024", "2025"], [
        ["Profit for the year (US\\$)", D[24].profit, D[25].profit], ["Profit from operations (US\\$)", D[24].pfo, D[25].pfo], ["Finance costs (US\\$)", D[24].fin, D[25].fin], ["Ordinary dividends for the year (US\\$)", D[24].div, D[25].div],
        ["Market price per share at the year end (US\\$)", "1.12", "0.91"], ["Ordinary share capital (US\\$)", D[24].sc, D[25].sc], ["Reserves, including retained earnings (US\\$)", D[24].res, D[25].res], ["10% loan notes (non-current) (US\\$)", D[24].loan, D[25].loan],
      ])}`,
      parts: checkExam(X, [
        P.group({ label: "(a)", stem: "Calculate earnings per share (in cents) for:", parts: [
          P.num({ label: "(i)", marks: 1, kind: "cents", dp: 1, value: a.eps, wrong: [D[24].profit / D[24].shares, (D[24].profit / (D[24].shares * 0.5)) * 100], stem: "2024", explanation: `${F(D[24].profit)} ÷ ${F(D[24].shares)} = ${p1(a.eps)} cents.` }),
          P.num({ label: "(ii)", marks: 1, kind: "cents", dp: 1, value: c.eps, wrong: [D[25].profit / D[25].shares, c.dps], stem: "2025", explanation: `${F(D[25].profit)} ÷ ${F(D[25].shares)} = ${p1(c.eps)} cents.` }),
        ] }),
        P.group({ label: "(b)", stem: "Calculate dividend per share (in cents) for:", parts: [
          P.num({ label: "(i)", marks: 1, kind: "cents", dp: 1, value: a.dps, wrong: [D[24].div / D[24].profit * 100], stem: "2024", explanation: `${F(D[24].div)} ÷ ${F(D[24].shares)} = ${p1(a.dps)} cents.` }),
          P.num({ label: "(ii)", marks: 1, kind: "cents", dp: 1, value: c.dps, wrong: [D[25].div / D[25].profit * 100], stem: "2025", explanation: `${F(D[25].div)} ÷ ${F(D[25].shares)} = ${p1(c.dps)} cents.` }),
        ] }),
        P.group({ label: "(c)", stem: "Calculate the price/earnings ratio (in times) for:", parts: [
          P.num({ label: "(i)", marks: 1, kind: "times", dp: 1, value: a.pe, wrong: [D[24].price / a.eps], stem: "2024", explanation: `Price 112 cents ÷ EPS ${p1(a.eps)} cents = ${p1(a.pe)} times.` }),
          P.num({ label: "(ii)", marks: 1, kind: "times", dp: 1, value: c.pe, wrong: [D[25].price / c.eps], stem: "2025", explanation: `Price 91 cents ÷ EPS ${p1(c.eps)} cents = ${p1(c.pe)} times.` }),
        ] }),
        P.group({ label: "(d)", stem: "Calculate the dividend yield for:", parts: [
          P.num({ label: "(i)", marks: 1, kind: "pct", value: a.yld, wrong: [(a.dps / 1.12)], stem: "2024", explanation: `${p1(a.dps)} cents ÷ 112 cents × 100 = ${p1(a.yld)}%.` }),
          P.num({ label: "(ii)", marks: 1, kind: "pct", value: c.yld, wrong: [(c.dps / 0.91)], stem: "2025", explanation: `${p1(c.dps)} cents ÷ 91 cents × 100 = ${p1(c.yld)}%.` }),
        ] }),
        P.group({ label: "(e)", stem: "Calculate dividend cover (in times) for:", parts: [
          P.num({ label: "(i)", marks: 1, kind: "times", dp: 1, value: a.cover, wrong: [D[24].div / D[24].profit], stem: "2024", explanation: `${F(D[24].profit)} ÷ ${F(D[24].div)} = ${p1(a.cover)} times.` }),
          P.num({ label: "(ii)", marks: 1, kind: "times", dp: 1, value: c.cover, wrong: [D[25].div / D[25].profit], stem: "2025", explanation: `${F(D[25].profit)} ÷ ${F(D[25].div)} = ${p1(c.cover)} times.` }),
        ] }),
        P.group({ label: "(f)", stem: "Calculate gearing for:", parts: [
          P.num({ label: "(i)", marks: 2, kind: "pct", value: a.gear, wrong: [(D[24].loan / (D[24].sc + D[24].res)) * 100], stem: "2024", explanation: `${F(D[24].loan)} ÷ ${F(a.ce)} × 100 = ${p1(a.gear)}%.` }),
          P.num({ label: "(ii)", marks: 2, kind: "pct", value: c.gear, wrong: [(D[25].loan / (D[25].sc + D[25].res)) * 100], stem: "2025", explanation: `${F(D[25].loan)} ÷ ${F(c.ce)} × 100 = ${p1(c.gear)}%.` }),
        ] }),
        P.group({ label: "(g)", stem: "Calculate interest cover (in times) for:", parts: [
          P.num({ label: "(i)", marks: 1, kind: "times", dp: 1, value: a.ic, wrong: [D[24].fin / D[24].pfo], stem: "2024", explanation: `${F(D[24].pfo)} ÷ ${F(D[24].fin)} = ${p1(a.ic)} times.` }),
          P.num({ label: "(ii)", marks: 1, kind: "times", dp: 1, value: c.ic, wrong: [D[25].fin / D[25].pfo], stem: "2025", explanation: `${F(D[25].pfo)} ÷ ${F(D[25].fin)} = ${p1(c.ic)} times.` }),
        ] }),
        P.manual({ label: "(h)", marks: 4, stem: "Analyse the performance of the company from the point of view of an ordinary shareholder.", points: [`Earnings per share fell from ${p1(a.eps)} to ${p1(c.eps)} cents although the dividend per share rose from ${p1(a.dps)} to ${p1(c.dps)} cents`, `Dividend cover fell from ${p1(a.cover)} to ${p1(c.cover)} times: more of the profit is paid out and less is kept`, `The market price fell from US\\$1.12 to US\\$0.91, so investors expect weaker returns; the yield rose from ${p1(a.yld)}% to ${p1(c.yld)}% only because the price fell`, "Conclusion: the shareholder receives more income but the earnings and the share price have weakened"], modelAnswer: "Earnings per share fell while the dividend per share rose, so the cover fell and less profit is kept. The share price fell, which lifted the yield, but shows that investors expect less. The income has risen but the underlying performance has weakened.", explanation: "One mark each for earnings against dividend, cover, price and yield, and the conclusion." }),
        P.manual({ label: "(i)", marks: 3, stem: "Explain how the borrowing in 2025 has changed the risk for the shareholders.", points: [`Gearing rose from ${p1(a.gear)}% to ${p1(c.gear)}%`, `Interest cover fell from ${p1(a.ic)} to ${p1(c.ic)} times, so profit gives less protection for the interest`, "Higher fixed interest makes the profit for shareholders more sensitive to changes in trading, so the risk is higher until the second bakery earns"], modelAnswer: `Gearing rose and interest cover fell sharply, so the shareholders' profit is more exposed to a fall in operating profit. The risk is higher until the new bakery earns a return.`, explanation: "One mark for each of the three points." }),
        P.manual({ label: "(j)", marks: 2, stem: "Advise the directors on the dividend for 2026, giving a reason.", points: ["Do not raise the dividend further, or hold it, as cover has fallen to below two times and interest payments are higher", "Retain more profit until the new bakery earns, which protects liquidity and the ability to pay the interest"], modelAnswer: "The dividend should be held or reduced until the second bakery earns, because cover is low and interest costs are higher.", explanation: "One mark for the recommendation and one for the reason." }),
      ]),
      hints: ["Convert the price to cents for P/E and yield.", "Capital employed = shares + reserves + loan notes."],
      explanation: "This FIN25 item asks for investment ratios, gearing and interest cover for two years, with an analysis for shareholders and advice on the dividend.",
    });
  }

  // ===================================================================================================
  // Item 2: ZIMSEC, effects of redeeming preference shares or loan notes on gearing
  {
    const Z = { ord: 436000, sp: 38000, re: 274000, pref: 84000, loan: 172000, bank: 158000, pfo: 126000, rate: 0.11, prefRate: 0.08 };
    const eq = r2(Z.ord + Z.sp + Z.re);
    const ce0 = r2(eq + Z.pref + Z.loan), fix0 = r2(Z.pref + Z.loan);
    const g = (fix, ce) => (fix / ce) * 100;
    const g0 = g(fix0, ce0);
    const fixA = r2(Z.loan), ceA = r2(ce0 - Z.pref), gA = g(fixA, ceA);
    const redB = 115000;
    const fixB = r2(Z.pref + Z.loan - redB), ceB = r2(ce0 - redB), gB = g(fixB, ceB);
    const int0 = r2(Z.loan * Z.rate), intB = r2((Z.loan - redB) * Z.rate);
    const ic0 = Z.pfo / int0, icB = Z.pfo / intB;
    const prefDiv = r2(Z.pref * Z.prefRate), intSaved = r2(redB * Z.rate);
    const crr = Z.pref, reA = r2(Z.re - crr), bankA = r2(Z.bank - Z.pref), bankB = r2(Z.bank - redB);
    const jr = journal([
      { date: "30 Sep", lines: [["8% redeemable preference share capital", Z.pref, null], ["Bank", null, Z.pref]], narrative: `Redemption of ${F(Z.pref)} preference shares of US\\$1 at par` },
      { date: "30 Sep", lines: [["Retained earnings", crr, null], ["Capital redemption reserve", null, crr]], narrative: "Transfer to the capital redemption reserve (no fresh issue)" },
    ], { title: "Journal" });
    b.struct({
      d: 5, examStyle: true, skill: X.skill, secs: X.secs, applies: ZIM, calculator: true,
      paper: "ZIMSEC Paper 3", concepts: ["aacc.company.redemption-shares", "aacc.company.loan-notes", "aacc.ratios.solvency-gearing"],
      stem: `Mazowe Foods Ltd has the following long-term finance. The company holds ${usd(Z.bank)} in the bank, which it does not need for trading.\n\n${table(["Item", "US\\$"], [["Ordinary share capital (US\\$1 shares)", Z.ord], ["Share premium", Z.sp], ["Retained earnings", Z.re], ["8% redeemable preference shares of US\\$1 each", Z.pref], ["11% loan notes", Z.loan]])}\n\nProfit from operations is ${usd(Z.pfo)} a year. The directors are considering two alternatives, each using the bank balance: **Option A** is to redeem all the preference shares at par out of distributable profits, with no new issue; **Option B** is to redeem ${usd(redB)} of the loan notes at par. For this question gearing is defined as (loan notes + preference shares) ÷ (ordinary shares + all reserves + loan notes + preference shares) × 100. Give percentages and times to one decimal place.`,
      parts: checkExam(X, [
        P.num({ label: "(a)", marks: 3, kind: "pct", value: g0, wrong: [(Z.loan / ce0) * 100, (fix0 / eq) * 100], stem: "Calculate gearing before either option.", explanation: `Fixed-cost capital = ${F(Z.pref)} + ${F(Z.loan)} = ${F(fix0)}; capital employed = ${F(eq)} + ${F(fix0)} = ${F(ce0)}; gearing = ${p1(g0)}%.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: crr, wrong: [Z.loan, Z.re], stem: "Calculate the amount transferred to the capital redemption reserve under Option A.", explanation: `No fresh issue, so the CRR equals the nominal value redeemed, ${usd(crr)}.` }),
        P.group({ label: "(c)", stem: "Calculate gearing after:", parts: [
          P.num({ label: "(i)", marks: 3, kind: "pct", value: gA, wrong: [g0, (Z.loan / eq) * 100], stem: "Option A", explanation: `Fixed-cost capital = ${F(fixA)}; capital employed = ${F(ce0)} - ${F(Z.pref)} = ${F(ceA)} (the CRR stays in equity); gearing = ${p1(gA)}%.` }),
          P.num({ label: "(ii)", marks: 3, kind: "pct", value: gB, wrong: [g0, (fixB / ce0) * 100], stem: "Option B", explanation: `Fixed-cost capital = ${F(fixB)}; capital employed = ${F(ce0)} - ${F(redB)} = ${F(ceB)}; gearing = ${p1(gB)}%.` }),
        ] }),
        P.group({ label: "(d)", stem: "Calculate interest cover (profit from operations ÷ loan note interest) in times:", parts: [
          P.num({ label: "(i)", marks: 2, kind: "times", dp: 1, value: ic0, wrong: [Z.pfo / (int0 + prefDiv)], stem: "before either option", explanation: `Interest = 11% × ${F(Z.loan)} = ${F(int0)}; ${F(Z.pfo)} ÷ ${F(int0)} = ${p1(ic0)} times.` }),
          P.num({ label: "(ii)", marks: 2, kind: "times", dp: 1, value: icB, wrong: [ic0], stem: "after Option B", explanation: `Interest = 11% × ${F(Z.loan - redB)} = ${F(intB)}; ${F(Z.pfo)} ÷ ${F(intB)} = ${p1(icB)} times.` }),
        ] }),
        P.group({ label: "(e)", stem: "Calculate the annual saving of:", parts: [
          P.num({ label: "(i)", marks: 1, kind: "money", value: prefDiv, wrong: [crr], stem: "preference dividend under Option A", explanation: `8% × ${F(Z.pref)} = ${usd(prefDiv)}.` }),
          P.num({ label: "(ii)", marks: 1, kind: "money", value: intSaved, wrong: [redB], stem: "loan note interest under Option B", explanation: `11% × ${F(redB)} = ${usd(intSaved)}.` }),
        ] }),
        P.manual({ label: "(f)", marks: 4, stem: "Prepare the journal entries for Option A.", points: ["Debit preference share capital " + F(Z.pref) + " and credit Bank " + F(Z.pref), "A narrative for the redemption", "Debit Retained earnings " + F(crr) + " and credit Capital redemption reserve " + F(crr), "A narrative for the transfer"], modelAnswer: jr, explanation: "One mark for each entry and each narrative." }),
        P.manual({ label: "(g)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Evaluate the two options and advise the directors which to choose. Refer to gearing, interest, cash and distributable reserves.", points: [`Option B reduces gearing more (${p1(gB)}% against ${p1(gA)}% for Option A, from ${p1(g0)}%) and raises interest cover to ${p1(icB)} times`, `Option B saves ${usd(intSaved)} of interest, which must be paid; Option A saves a preference dividend of ${usd(prefDiv)}`, `Option A reduces distributable reserves from ${usd(Z.re)} to ${usd(reA)} through the transfer to the CRR; both options use cash (${usd(bankA)} and ${usd(bankB)} left)`, "Judgement: Option B is the better choice for risk if enough cash remains for working capital, otherwise a smaller redemption"], modelAnswer: `Option B reduces gearing to ${p1(gB)}% and raises interest cover to ${p1(icB)} times, saving ${usd(intSaved)} of interest a year. Option A removes the preference shares and their dividend of ${usd(prefDiv)} but locks ${usd(crr)} of retained earnings into the CRR. Because interest must be paid whatever the profit, Option B is the stronger choice if enough cash remains for working capital.`, explanation: "One point per creditworthy statement, up to 4; allow follow-through." }),
      ]),
      hints: ["The CRR stays in equity.", "Both options use cash, so capital employed falls."],
      explanation: "This ZIMSEC FIN25 item compares redeeming preference shares with redeeming loan notes using gearing, interest cover, the capital redemption reserve and a journal.",
    });
  }

  // ===================================================================================================
  // Item 3: a full ratio report for two years (both boards)
  {
    const base = { name: "Hurungwe Tea Packers Ltd", sharePremium: 36000, shareCapital: 280000 };
    const a = coYear({ ...base, year: 2024, revenue: 718000, cos: 466700, distribution: 39700, admin: 113900, finance: 8800, tax: 20400, nca: 471000, inventory: 76300, receivables: 89700, bank: 41400, payables: 62900, otherCL: 18300, loan: 94000, creditSales: 646200, creditPurchases: 478000 });
    const c = coYear({ ...base, year: 2025, revenue: 789000, cos: 560190, distribution: 43700, admin: 119800, finance: 17900, tax: 9300, nca: 551000, inventory: 121400, receivables: 142600, bank: 7400, payables: 111800, otherCL: 13600, loan: 184000, creditSales: 710100, creditPurchases: 570000 });
    const extra = table(["Other information", "2024 US\\$", "2025 US\\$"], [["Credit sales", a.creditSales, c.creditSales], ["Credit purchases", a.creditPurchases, c.creditPurchases]]);
    b.struct({
      d: 5, examStyle: true, skill: X.skill, secs: X.secs, calculator: true,
      paper: "ZIMSEC and Cambridge Paper 3", concepts: ["aacc.ratios.profitability", "aacc.ratios.liquidity", "aacc.ratios.efficiency", "aacc.ratios.solvency-gearing", "aacc.ratios.analysis-limits"],
      stem: `Hurungwe Tea Packers Ltd buys tea from growers in Hurungwe and packs it for supermarkets. The directors expanded the packing plant in 2025. Its summarised financial statements are below. Use year-end figures. Give percentages and times to one decimal place, current and acid test ratios as x : 1 to two decimal places, and days to the nearest whole day.\n\n${splMd(a, c, { title: "Statement of profit or loss for the year" })}\n\n${sofpMd(a, c, { title: "Statement of financial position at the year end" })}\n\n${extra}`,
      parts: checkExam(X, [
        P.group({ label: "(a)", stem: "Calculate the gross profit margin for:", parts: [
          P.num({ label: "(i)", marks: 1, kind: "pct", value: R.gpm(a), wrong: [R.markUp(a)], stem: "2024", explanation: `${F(a.gp)} ÷ ${F(a.revenue)} × 100 = ${p1(R.gpm(a))}%.` }),
          P.num({ label: "(ii)", marks: 1, kind: "pct", value: R.gpm(c), wrong: [R.markUp(c)], stem: "2025", explanation: `${F(c.gp)} ÷ ${F(c.revenue)} × 100 = ${p1(R.gpm(c))}%.` }),
        ] }),
        P.group({ label: "(b)", stem: "Calculate ROCE for:", parts: [
          P.num({ label: "(i)", marks: 2, kind: "pct", value: R.roce(a), wrong: [(a.profit / a.capitalEmployed) * 100], stem: "2024", explanation: `${F(a.pfo)} ÷ ${F(a.capitalEmployed)} × 100 = ${p1(R.roce(a))}%.` }),
          P.num({ label: "(ii)", marks: 2, kind: "pct", value: R.roce(c), wrong: [(c.profit / c.capitalEmployed) * 100], stem: "2025", explanation: `${F(c.pfo)} ÷ ${F(c.capitalEmployed)} × 100 = ${p1(R.roce(c))}%.` }),
        ] }),
        P.group({ label: "(c)", stem: "Calculate the current ratio for:", parts: [
          P.num({ label: "(i)", marks: 1, kind: "ratio", value: R.current(a), wrong: [R.acid(a)], stem: "2024", explanation: `${F(a.ca)} ÷ ${F(a.cl)} = ${p2(R.current(a))} : 1.` }),
          P.num({ label: "(ii)", marks: 1, kind: "ratio", value: R.current(c), wrong: [R.acid(c)], stem: "2025", explanation: `${F(c.ca)} ÷ ${F(c.cl)} = ${p2(R.current(c))} : 1.` }),
        ] }),
        P.group({ label: "(d)", stem: "Calculate the acid test ratio for:", parts: [
          P.num({ label: "(i)", marks: 1, kind: "ratio", value: R.acid(a), wrong: [R.current(a)], stem: "2024", explanation: `(${F(a.ca)} - ${F(a.inventory)}) ÷ ${F(a.cl)} = ${p2(R.acid(a))} : 1.` }),
          P.num({ label: "(ii)", marks: 1, kind: "ratio", value: R.acid(c), wrong: [R.current(c)], stem: "2025", explanation: `(${F(c.ca)} - ${F(c.inventory)}) ÷ ${F(c.cl)} = ${p2(R.acid(c))} : 1.` }),
        ] }),
        P.group({ label: "(e)", stem: "Calculate inventory turnover in days for:", parts: [
          P.num({ label: "(i)", marks: 1, kind: "days", value: R.invDays(a), wrong: [R.invTimes(a)], stem: "2024", explanation: `${F(a.inventory)} ÷ ${F(a.cos)} × 365 = ${p0(R.invDays(a))} days.` }),
          P.num({ label: "(ii)", marks: 1, kind: "days", value: R.invDays(c), wrong: [R.invTimes(c)], stem: "2025", explanation: `${F(c.inventory)} ÷ ${F(c.cos)} × 365 = ${p0(R.invDays(c))} days.` }),
        ] }),
        P.group({ label: "(f)", stem: "Calculate trade receivables days for:", parts: [
          P.num({ label: "(i)", marks: 1, kind: "days", value: R.recDays(a, a.creditSales), wrong: [R.recDays(a, a.revenue)], stem: "2024", explanation: `${F(a.receivables)} ÷ ${F(a.creditSales)} × 365 = ${p0(R.recDays(a, a.creditSales))} days.` }),
          P.num({ label: "(ii)", marks: 1, kind: "days", value: R.recDays(c, c.creditSales), wrong: [R.recDays(c, c.revenue)], stem: "2025", explanation: `${F(c.receivables)} ÷ ${F(c.creditSales)} × 365 = ${p0(R.recDays(c, c.creditSales))} days.` }),
        ] }),
        P.group({ label: "(g)", stem: "Calculate trade payables days for:", parts: [
          P.num({ label: "(i)", marks: 1, kind: "days", value: R.payDays(a, a.creditPurchases), wrong: [R.payDays(a, a.cos)], stem: "2024", explanation: `${F(a.payables)} ÷ ${F(a.creditPurchases)} × 365 = ${p0(R.payDays(a, a.creditPurchases))} days.` }),
          P.num({ label: "(ii)", marks: 1, kind: "days", value: R.payDays(c, c.creditPurchases), wrong: [R.payDays(c, c.cos)], stem: "2025", explanation: `${F(c.payables)} ÷ ${F(c.creditPurchases)} × 365 = ${p0(R.payDays(c, c.creditPurchases))} days.` }),
        ] }),
        P.group({ label: "(h)", stem: "Calculate gearing for:", parts: [
          P.num({ label: "(i)", marks: 1, kind: "pct", value: R.gearing(a), wrong: [(a.loan / a.equity) * 100], stem: "2024", explanation: `${F(a.loan)} ÷ ${F(a.capitalEmployed)} × 100 = ${p1(R.gearing(a))}%.` }),
          P.num({ label: "(ii)", marks: 1, kind: "pct", value: R.gearing(c), wrong: [(c.loan / c.equity) * 100], stem: "2025", explanation: `${F(c.loan)} ÷ ${F(c.capitalEmployed)} × 100 = ${p1(R.gearing(c))}%.` }),
        ] }),
        P.group({ label: "(i)", stem: "Calculate interest cover (in times) for:", parts: [
          P.num({ label: "(i)", marks: 1, kind: "times", dp: 1, value: R.cover(a), wrong: [a.pbt / a.finance], stem: "2024", explanation: `${F(a.pfo)} ÷ ${F(a.finance)} = ${p1(R.cover(a))} times.` }),
          P.num({ label: "(ii)", marks: 1, kind: "times", dp: 1, value: R.cover(c), wrong: [c.pbt / c.finance], stem: "2025", explanation: `${F(c.pfo)} ÷ ${F(c.finance)} = ${p1(R.cover(c))} times.` }),
        ] }),
        P.manual({ label: "(j)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Write a report to the board on the performance and position of the company in 2025 compared with 2024. Your report should cover profitability, liquidity, efficiency and risk, and end with a recommendation. State one limitation of your analysis.", points: [`Profitability: the gross margin fell from ${p1(R.gpm(a))}% to ${p1(R.gpm(c))}% and ROCE from ${p1(R.roce(a))}% to ${p1(R.roce(c))}% although revenue grew`, `Liquidity: the current ratio fell from ${p2(R.current(a))} to ${p2(R.current(c))} and the acid test from ${p2(R.acid(a))} to ${p2(R.acid(c))}; cash is only ${usd(c.bank)}`, `Efficiency: inventory days rose to ${p0(R.invDays(c))} and receivables days to ${p0(R.recDays(c, c.creditSales))}, while payables days rose to ${p0(R.payDays(c, c.creditPurchases))}: suppliers finance the expansion`, `Risk: gearing rose from ${p1(R.gearing(a))}% to ${p1(R.gearing(c))}% and interest cover fell from ${p1(R.cover(a))} to ${p1(R.cover(c))} times`, "Recommendation (restore the gross margin, collect receivables, control inventory, slow further borrowing) and one limit (two years only, year-end balances, non-financial factors)"], modelAnswer: `Report to the board. Profitability has weakened: the gross margin fell to ${p1(R.gpm(c))}% and ROCE to ${p1(R.roce(c))}% although revenue grew. Liquidity is poor: the current ratio is ${p2(R.current(c))} and cash is ${usd(c.bank)}. Inventory and receivables days have risen sharply, and payables days show that suppliers are financing the growth. Gearing rose to ${p1(R.gearing(c))}% and interest cover fell to ${p1(R.cover(c))} times, so the risk is higher. The board should restore the margin, tighten credit control, cut inventory and borrow no more until the new plant earns. This analysis uses only two years of year-end figures and ignores non-financial factors.`, explanation: "One point for each paragraph of the report and for the recommendation and limit; allow follow-through." }),
      ]),
      hints: ["Use the credit sales and credit purchases given.", "Capital employed = equity + loan notes."],
      explanation: "This FIN25 item asks for a full set of ratios for two years and a board report with a recommendation.",
    });
  }
});
void fmt; void chk;
