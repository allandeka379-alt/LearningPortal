// W3b exam-format items: ZIMSEC Paper 2 (ZIM_P2_STRUCT, 25 marks): (1) share issue and bonus issue; (2) ratio calculation and interpretation.
import { concept, P, EXAM, checkExam, ZIM, money, fmt, chk, r2, table, tAccount, statement } from "../lib.mjs";
import { coYear, R, F, usd } from "../tables/w3b-lib.mjs";

const p0 = (v) => String(Math.round(v));
const p1 = (v) => (Math.round(v * 10) / 10).toFixed(1);
const p2 = (v) => (Math.round(v * 100) / 100).toFixed(2);

concept("aacc.company.share-issue", { file: "exam/w3b-zimp2", keyPrefix: "exam.w3b-zimp2", applies: ZIM }, (b) => {
  const Z = EXAM.ZIM_P2_STRUCT;

  // ===================================================================================================
  // Item 1: Gwanda Quarries Ltd, share issue and bonus issue
  {
    const eq0 = { sc: 440000, sp: 56000, gr: 64000, re: 172000 };
    const n = 120000, price = 1.45, appPer = 0.55, alPer = 0.9, applied = 156000;
    chk(appPer + alPer, price);
    const appCash = r2(applied * appPer), refund = r2((applied - n) * appPer), prem = r2(n * (price - 1)), alCash = r2(n * alPer), net = r2(n * price);
    chk(appCash - refund + alCash, net);
    const cap1 = r2(n * 1), due = r2(n * price);
    const aa = tAccount("Application and allotment account", [["1 Mar", "Bank (refund)", refund], ["1 Mar", "Ordinary share capital", cap1], ["1 Mar", "Share premium", prem]], [["1 Mar", "Bank (application money)", appCash], ["1 Mar", "Bank (allotment money)", alCash]]);
    const inIssue = eq0.sc + n;
    const bonusSh = inIssue / 8, bonusAmt = r2(bonusSh * 1);
    const fromSP = r2(bonusAmt - eq0.gr);
    const scA = r2(inIssue + bonusSh), spA = r2(eq0.sp + prem - fromSP);
    const eqT0 = r2(eq0.sc + eq0.sp + eq0.gr + eq0.re), eqT1 = r2(scA + spA + 0 + eq0.re);
    chk(eqT1, eqT0 + net);
    b.struct({
      d: 4, examStyle: true, skill: Z.skill, secs: Z.secs, applies: Z.applies, calculator: true,
      paper: "ZIMSEC Paper 2", concepts: ["aacc.company.share-issue", "aacc.company.bonus-rights", "aacc.company.share-capital-reserves"],
      stem: `Gwanda Quarries Ltd, a company with a quarry near Gwanda, has the following equity at the start of its financial year, 1 January 2026.\n\n${table(["Item", "US\\$"], [["Ordinary shares of US\\$1 each, fully paid", eq0.sc], ["Share premium", eq0.sp], ["General reserve", eq0.gr], ["Retained earnings", eq0.re], ["**Total equity**", eqT0]])}\n\n**1 March 2026.** The company issued ${F(n)} new ordinary shares of US\\$1 at US\\$1.45, payable US\\$0.55 on application and US\\$0.90 on allotment (including the premium). Applications were received for ${F(applied)} shares. The directors allotted ${F(n)} shares and refunded the applicants for the other ${F(applied - n)} shares. All the allotment money was received.\n\n**1 July 2026.** The company made a bonus issue of one new share for every eight shares then in issue. The general reserve was used first, and the balance was taken from the share premium account.\n\nIgnore the profit for the year and any dividends.`,
      parts: checkExam(Z, [
        P.group({ label: "(a)", stem: "For the issue on 1 March 2026, calculate:", parts: [
          P.num({ label: "(i)", marks: 2, kind: "money", value: appCash, wrong: [r2(n * appPer), refund], stem: "the application money received", explanation: `${F(applied)} × US\\$0.55 = ${usd(appCash)}; every applicant pays with the application.` }),
          P.num({ label: "(ii)", marks: 2, kind: "money", value: refund, wrong: [r2(n * appPer), appCash], stem: "the refund to the unsuccessful applicants", explanation: `(${F(applied)} - ${F(n)}) × US\\$0.55 = ${usd(refund)}.` }),
          P.num({ label: "(iii)", marks: 2, kind: "money", value: prem, wrong: [net, cap1], stem: "the share premium credited", explanation: `${F(n)} × US\\$0.45 = ${usd(prem)}.` }),
          P.num({ label: "(iv)", marks: 2, kind: "money", value: net, wrong: [alCash, r2(applied * price)], stem: "the net cash received from the issue", explanation: `Application money kept ${F(appCash - refund)} + allotment money ${F(alCash)} = ${usd(net)} (= ${F(n)} × US\\$1.45).` }),
        ] }),
        P.manual({ label: "(b)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Prepare the application and allotment account.", points: [`Credit: bank, application money ${F(appCash)}`, `Debit: bank, refund ${F(refund)}`, `Debit: ordinary share capital ${F(cap1)} and share premium ${F(prem)} on allotment (total ${F(due)})`, `Credit: bank, allotment money ${F(alCash)}`, `Both sides total ${F(appCash + alCash)} so the account balances`], modelAnswer: aa, explanation: "One mark for each group of entries and one for the balance." }),
        P.group({ label: "(c)", stem: "For the bonus issue on 1 July 2026, calculate:", parts: [
          P.num({ label: "(i)", marks: 2, kind: "units", value: bonusSh, wrong: [eq0.sc / 8, inIssue / 5], stem: "the number of bonus shares issued", explanation: `Shares in issue after 1 March = ${F(eq0.sc)} + ${F(n)} = ${F(inIssue)}; ${F(inIssue)} ÷ 8 = ${F(bonusSh)}.` }),
          P.num({ label: "(ii)", marks: 3, kind: "money", value: fromSP, wrong: [bonusAmt, eq0.gr], stem: "the amount taken from the share premium account", explanation: `Total capitalised = ${F(bonusSh)} × US\\$1 = ${usd(bonusAmt)}; general reserve ${F(eq0.gr)} is used first, so the share premium provides ${F(bonusAmt)} - ${F(eq0.gr)} = ${usd(fromSP)}.` }),
        ] }),
        P.group({ label: "(d)", stem: "Calculate, at the end of the financial year (ignoring profit and dividends):", parts: [
          P.num({ label: "(i)", marks: 2, kind: "money", value: scA, wrong: [inIssue, r2(scA + eq0.sp)], stem: "the issued ordinary share capital", explanation: `${F(inIssue)} + ${F(bonusSh)} = ${usd(scA)}.` }),
          P.num({ label: "(ii)", marks: 2, kind: "money", value: eqT1, wrong: [eqT0, r2(eqT0 + net + bonusAmt)], stem: "total equity", explanation: `${F(eqT0)} + net cash from the issue ${F(net)} = ${usd(eqT1)}; the bonus issue does not change total equity.` }),
        ] }),
        P.manual({ label: "(e)", marks: 3, stem: "Explain why the bonus issue does not change total equity, although the market price of each share is expected to fall.", points: ["A bonus issue only transfers amounts from reserves to share capital within equity, and no cash is received", "The number of shares increases while the total value of the company is unchanged", "So the value of each share, and the market price per share, falls in proportion"], modelAnswer: "The bonus issue converts reserves into share capital, so equity moves from one part to another and no cash is received. There are more shares sharing the same value, so each share is worth less.", explanation: "One mark for each of the three points." }),
      ]),
      hints: ["Application money is received from all applicants.", "The bonus is based on the shares in issue after 1 March."],
      explanation: "This ZIMSEC Paper 2 style question combines an oversubscribed share issue, the application and allotment account and a bonus issue.",
    });
  }

  // ===================================================================================================
  // Item 2: Chitungwiza Furniture Ltd, ratio calculation and interpretation
  {
    const a = coYear({ name: "Chitungwiza Furniture Ltd", year: 2024, revenue: 572000, cos: 371800, distribution: 28600, admin: 80400, finance: 5400, tax: 17700, nca: 310000, inventory: 57300, receivables: 66800, bank: 35200, payables: 47900, otherCL: 13700, loan: 63000, shareCapital: 210000, creditSales: 514800, creditPurchases: 330000 });
    const c = coYear({ name: "Chitungwiza Furniture Ltd", year: 2025, revenue: 618000, cos: 438780, distribution: 31900, admin: 87300, finance: 11800, tax: 11700, nca: 385000, inventory: 88400, receivables: 97100, bank: 7300, payables: 78600, otherCL: 15400, loan: 127000, shareCapital: 210000, creditSales: 556200, creditPurchases: 415000 });
    const stemTable = table(["Item", "2024 US\\$", "2025 US\\$"], [
      ["Revenue", a.revenue, c.revenue], ["of which credit sales", a.creditSales, c.creditSales], ["Cost of sales", a.cos, c.cos], ["Profit from operations", a.pfo, c.pfo], ["Finance costs", a.finance, c.finance], ["Profit for the year", a.profit, c.profit],
      ["Inventory", a.inventory, c.inventory], ["Trade receivables", a.receivables, c.receivables], ["Cash and cash equivalents", a.bank, c.bank], ["Trade payables and other current liabilities", a.cl, c.cl],
      ["Loan notes (non-current)", a.loan, c.loan], ["Equity (shares and reserves)", a.equity, c.equity], ["Capital employed", a.capitalEmployed, c.capitalEmployed],
    ]);
    b.struct({
      d: 5, examStyle: true, skill: Z.skill, secs: Z.secs, applies: Z.applies, calculator: true,
      paper: "ZIMSEC Paper 2", concepts: ["aacc.ratios.profitability", "aacc.ratios.liquidity", "aacc.ratios.efficiency", "aacc.ratios.analysis-limits"],
      stem: `Chitungwiza Furniture Ltd makes beds and cupboards for schools and hostels. Extracts from its financial statements for the years 2024 and 2025 are given below. Use year-end figures. Give percentages to one decimal place, ratios as x : 1 to two decimal places and days to the nearest whole day. For return on equity use profit for the year divided by equity.\n\n${stemTable}`,
      parts: checkExam(Z, [
        P.group({ label: "(a)", stem: "Calculate the gross profit margin for:", parts: [
          P.num({ label: "(i)", marks: 1, kind: "pct", value: R.gpm(a), wrong: [R.markUp(a)], stem: "2024", explanation: `${F(a.gp)} ÷ ${F(a.revenue)} × 100 = ${p1(R.gpm(a))}%.` }),
          P.num({ label: "(ii)", marks: 1, kind: "pct", value: R.gpm(c), wrong: [R.markUp(c)], stem: "2025", explanation: `${F(c.gp)} ÷ ${F(c.revenue)} × 100 = ${p1(R.gpm(c))}%.` }),
        ] }),
        P.group({ label: "(b)", stem: "Calculate return on capital employed for:", parts: [
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
        P.group({ label: "(e)", stem: "Calculate trade receivables days for:", parts: [
          P.num({ label: "(i)", marks: 1, kind: "days", value: R.recDays(a, a.creditSales), wrong: [R.recDays(a, a.revenue)], stem: "2024", explanation: `${F(a.receivables)} ÷ ${F(a.creditSales)} × 365 = ${p0(R.recDays(a, a.creditSales))} days.` }),
          P.num({ label: "(ii)", marks: 1, kind: "days", value: R.recDays(c, c.creditSales), wrong: [R.recDays(c, c.revenue)], stem: "2025", explanation: `${F(c.receivables)} ÷ ${F(c.creditSales)} × 365 = ${p0(R.recDays(c, c.creditSales))} days.` }),
        ] }),
        P.group({ label: "(f)", stem: "Calculate return on equity for:", parts: [
          P.num({ label: "(i)", marks: 2, kind: "pct", value: R.roe(a), wrong: [R.roce(a)], stem: "2024", explanation: `${F(a.profit)} ÷ ${F(a.equity)} × 100 = ${p1(R.roe(a))}%.` }),
          P.num({ label: "(ii)", marks: 2, kind: "pct", value: R.roe(c), wrong: [R.roce(c)], stem: "2025", explanation: `${F(c.profit)} ÷ ${F(c.equity)} × 100 = ${p1(R.roe(c))}%.` }),
        ] }),
        P.manual({ label: "(g)", marks: 3, stem: "Comment on the profitability of the company in 2025 compared with 2024.", points: [`The gross profit margin fell from ${p1(R.gpm(a))}% to ${p1(R.gpm(c))}%, although revenue rose`, `ROCE fell from ${p1(R.roce(a))}% to ${p1(R.roce(c))}% and return on equity from ${p1(R.roe(a))}% to ${p1(R.roe(c))}%`, "Possible causes: lower selling prices or dearer materials, and higher finance costs and a bigger capital base from the extra loan"], modelAnswer: `Profitability has fallen. The gross margin dropped to ${p1(R.gpm(c))}% and ROCE and return on equity are both lower, probably because of price cuts or dearer materials, and because the extra loan has increased capital employed and finance costs without matching profit.`, explanation: "One mark each for the margin, the two returns and a cause." }),
        P.manual({ label: "(h)", marks: 3, stem: "Comment on the liquidity and the control of working capital in 2025.", points: [`The current ratio fell from ${p2(R.current(a))} to ${p2(R.current(c))} and the acid test from ${p2(R.acid(a))} to ${p2(R.acid(c))}`, `Receivables days rose from ${p0(R.recDays(a, a.creditSales))} to ${p0(R.recDays(c, c.creditSales))}: customers take longer to pay`, `Cash fell to ${usd(c.bank)} while inventory rose to ${usd(c.inventory)}`], modelAnswer: "Liquidity has weakened: both ratios fell, cash is very low and inventory has grown. Customers also take longer to pay, so working capital is absorbing cash.", explanation: "One mark each for the ratios, receivables and cash or inventory." }),
        P.manual({ label: "(i)", marks: 3, stem: "The directors ask a bank for a further loan. Advise the bank, giving two reasons.", points: ["Profitability and liquidity have both weakened, and gearing has risen with the previous loan", "Interest cover is falling because finance costs have doubled; a further loan adds to the risk", "Recommendation: decline or lend only with security and a plan to restore the margin and collect receivables"], modelAnswer: "The bank should be cautious: profit, ROCE and liquidity have all fallen and the finance costs are already high. It should lend only with security and a plan for a better margin and faster collection.", explanation: "One mark for the weakness, one for the interest burden and one for a recommendation." }),
      ]),
      hints: ["Capital employed is given in the table.", "For return on equity use the profit for the year."],
      explanation: "This ZIMSEC Paper 2 style question asks for profitability, liquidity, efficiency and return on equity ratios and for comments and advice.",
    });
  }
});
void money; void fmt; void statement;
