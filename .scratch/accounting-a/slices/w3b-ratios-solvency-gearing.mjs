// W3b: ratios.solvency-gearing
import { concept, P, ZIM, CAM, table, chk, r2, rd, ratios } from "../lib.mjs";
import { coYear, R, mc, F, usd } from "../tables/w3b-lib.mjs";

const p0 = (v) => String(Math.round(v));
const p1 = (v) => (Math.round(v * 10) / 10).toFixed(1);
const p2 = (v) => (Math.round(v * 100) / 100).toFixed(2);

concept("aacc.ratios.solvency-gearing", { file: "ratios/solvency-gearing", keyPrefix: "ratios.solvency-gearing" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which amount is the numerator of the gearing ratio?",
    ok: ["Non-current liabilities", "Correct: the long-term borrowing carrying fixed interest."],
    bad: [["Current liabilities", "These are short-term and are not part of capital employed."], ["Ordinary share capital", "Shares form part of the denominator."], ["Total liabilities including trade payables", "Trade payables are current liabilities and are not part of gearing."]],
    explanation: "Gearing = non-current liabilities ÷ (ordinary shares + all reserves + non-current liabilities) × 100.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What does an interest cover of 4 times mean?",
    ok: ["Profit from operations is four times the interest payable", "Correct: profit could fall a long way before interest is not covered."],
    bad: [["Interest is four times as large as the profit from operations", "The ratio is the other way round."], ["The company has paid its interest four times during the year", "Interest cover is a ratio, not a count of payments."], ["The loan notes are four times as large as the equity", "That would be a debt to equity ratio."]],
    explanation: "Interest cover = profit from operations ÷ interest payable, so 4 times means profit is four times the interest.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Which action would reduce a company's gearing?",
    ok: ["Issuing new ordinary shares for cash", "Correct: equity rises while the loan notes stay the same."],
    bad: [["Issuing new loan notes for cash", "That would raise the numerator."], ["Paying a larger dividend out of reserves", "That would reduce reserves and increase gearing."], ["Revaluing no assets and borrowing from the bank", "Borrowing adds to non-current liabilities."]],
    explanation: "Gearing falls when equity rises or when borrowing falls; a share issue raises the denominator's equity part without raising debt.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Why can a highly geared company produce a higher return for its shareholders in a good year?",
    ok: ["Interest is a fixed cost, so extra profit from operations goes to the shareholders", "Correct: loan interest does not increase with profit."],
    bad: [["Loan interest is automatically lower in a good year of trading for the company", "Interest is fixed by the loan agreement."], ["The shareholders pay no tax on the profit made from gearing", "Gearing is not a tax matter."], ["Lenders agree to share in the profit made by the company", "Lenders receive interest only, not a share of profit."]],
    hints: ["What happens to interest when profit rises?"],
    explanation: "With fixed interest, all the growth in profit from operations belongs to the shareholders; the same fixed cost hurts them in a poor year.",
  });
  mc(b, {
    d: 2, skill: "RECALL",
    stem: "How is the working capital cycle calculated?",
    ok: ["Inventory days plus trade receivables days minus trade payables days", "Correct: the days cash is tied up in trading."],
    bad: [["Inventory days minus trade receivables days minus trade payables days", "Receivables days are added, not subtracted."], ["Trade receivables days plus trade payables days minus inventory days", "Payables days reduce the cycle; inventory days increase it."], ["Current assets divided by current liabilities in days", "That is the current ratio."]],
    explanation: "Working capital cycle = inventory days + trade receivables days - trade payables days.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A company redeems US\\$100,000 of its 8% loan notes using cash it has been holding. What is the effect on gearing and interest cover?",
    ok: ["Gearing falls and interest cover rises", "Correct: less debt and less interest."],
    bad: [["Gearing falls and interest cover falls", "Lower interest raises the cover."], ["Gearing rises and interest cover rises", "Less debt lowers gearing."], ["Both are unchanged because cash is used", "Repaying the loan changes both ratios."]],
    hints: ["Which items in each ratio change?"],
    explanation: "Non-current liabilities fall, so gearing falls; interest payable falls, so cover rises.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Company P has gearing of 62% and interest cover of 1.4 times. Company Q has gearing of 28% and interest cover of 6.5 times. Both are in the same trade. Which statement is best supported?",
    ok: ["P is riskier, as a small fall in profit could leave interest uncovered", "Correct: low cover and high gearing leave little margin."],
    bad: [["Q is the riskier because its interest cover is much higher", "A higher cover means a larger safety margin."], ["Both have the same risk because they are in the same trade", "The financing risk differs even in the same trade."], ["P is safer because it has been able to borrow more money", "More borrowing increases the fixed interest burden."]],
    hints: ["Use both ratios together."],
    explanation: "High gearing and low cover mean the interest could not be paid after a small fall in profit, so P carries more financial risk.",
  });

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Interest cover is calculated using profit for the year, after interest and tax.", answer: false, explanation: "False. It uses profit from operations, which is before interest, so the interest is compared with the profit available to pay it." });
  b.tf({ d: 3, skill: "UNDERSTANDING", daily: true, stem: "Paying trade payables sooner shortens the working capital cycle.", answer: false, hints: ["Which way do payables days move the cycle?"], explanation: "False. Paying sooner reduces payables days, and the cycle is inventory days plus receivables days minus payables days, so the cycle becomes longer." });

  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each ratio to its formula.",
    pairs: ["Gearing", "Interest cover", "Net working assets to revenue", "Debt to equity (ZIMSEC)"],
    right: ["Non-current liabilities ÷ capital employed × 100", "Profit from operations ÷ interest payable", "(Inventory + receivables - payables) ÷ revenue × 100", "Debt ÷ equity"],
    rightIndex: [0, 1, 2, 3],
    explanation: "Gearing uses capital employed; interest cover compares profit with interest; net working assets are compared with revenue; debt to equity compares debt with the owners' funds.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences.",
    template: "Gearing is the proportion of capital employed that is financed by {{blank:a}}. A fall in interest cover means a {{blank:b}} margin of safety for the lenders.",
    blanks: [{ id: "a", accepted: ["non-current liabilities"], choices: ["non-current liabilities", "current liabilities", "retained earnings"] }, { id: "b", accepted: ["smaller"], choices: ["smaller", "larger"] }],
    explanation: "Gearing measures the share of long-term borrowing; lower cover means profit is closer to the interest.",
  });
  b.short({ d: 1, skill: "RECALL", stem: "Name the ratio that shows how many times profit from operations covers the interest payable.", accepted: ["interest cover", "times interest earned"], explanation: "This is interest cover." });

  // numerical items on their own figures
  const gearV = ratios.gearing(120000, 200000, 80000);
  b.num({
    d: 2, skill: "APPLICATION", kind: "pct", value: gearV, calculator: true, daily: true, wrong: [(120000 / 280000) * 100, (120000 / 200000) * 100],
    stem: `A company has issued ordinary shares of ${usd(200000)}, reserves of ${usd(80000)} and non-current liabilities of ${usd(120000)}. Calculate its gearing as a percentage to one decimal place.`,
    explanation: `Capital employed = ${F(200000)} + ${F(80000)} + ${F(120000)} = ${F(400000)}. Gearing = ${F(120000)} ÷ ${F(400000)} × 100 = ${p1(gearV)}%. Dividing by equity alone (${F(280000)}) would give ${p1((120000 / 280000) * 100)}%.`,
  });
  const ic = ratios.interestCover(91000, 14000);
  b.num({
    d: 2, skill: "APPLICATION", kind: "times", value: ic, dp: 1, calculator: true, wrong: [(91000 - 14000) / 14000, 14000 / 91000],
    stem: `A company's profit from operations was ${usd(91000)}, its finance costs were ${usd(14000)} and its profit for the year was ${usd(60200)}. Calculate interest cover in times to one decimal place.`,
    explanation: `${F(91000)} ÷ ${F(14000)} = ${p1(ic)} times. Using the profit after interest would deduct the interest twice, and inverting gives ${p2(14000 / 91000)}.`,
  });
  const wccV = rd((28000 / 255500) * 365) + rd((57000 / 365000) * 365) - rd((35200 / 292000) * 365);
  chk(wccV, 53);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "days", value: wccV, calculator: true, wrong: [40 + 57 + 44, 57 + 44 - 40],
    stem: `A company's cost of sales was ${usd(255500)}, credit sales ${usd(365000)} and credit purchases ${usd(292000)}. Its year-end inventory was ${usd(28000)}, trade receivables ${usd(57000)} and trade payables ${usd(35200)}. Calculate the working capital cycle in days, working to the nearest whole day for each component.`,
    hints: ["Find inventory days, receivables days and payables days first."],
    explanation: `Inventory days = ${F(28000)} ÷ ${F(255500)} × 365 = 40. Receivables days = ${F(57000)} ÷ ${F(365000)} × 365 = 57. Payables days = ${F(35200)} ÷ ${F(292000)} × 365 = 44. Cycle = 40 + 57 - 44 = 53 days. Adding the payables days gives 141 days.`,
  });
  const nwaV = ratios.netWorkingAssetsToRevenue(31400 + 44900 - 27500, 305000);
  b.num({
    d: 3, skill: "APPLICATION", kind: "pct", value: nwaV, calculator: true, applies: CAM, wrong: [((31400 + 44900) / 305000) * 100, (48800 / 305000)],
    stem: `Cambridge A Level. A company's year-end inventory was ${usd(31400)}, trade receivables ${usd(44900)} and trade payables ${usd(27500)}. Revenue for the year was ${usd(305000)}. Calculate net working assets to revenue as a percentage to one decimal place.`,
    hints: ["Net working assets = inventory + receivables - payables."],
    explanation: `Net working assets = ${F(31400)} + ${F(44900)} - ${F(27500)} = ${F(48800)}. ${F(48800)} ÷ ${F(305000)} × 100 = ${p1(nwaV)}%. Forgetting to deduct the payables gives ${p1(((31400 + 44900) / 305000) * 100)}%.`,
  });
  const de = ratios.debtToEquity(84000, 240000);
  b.num({
    d: 3, skill: "APPLICATION", kind: "ratio", value: de, calculator: true, applies: ZIM, hints: ["Divide the loan notes by equity, not by capital employed."], wrong: [84000 / 324000, (84000 / 240000) * 100],
    stem: `ZIMSEC style. Debt to equity = loan notes ÷ equity. A company has loan notes of ${usd(84000)} and equity of ${usd(240000)}. Calculate the ratio as x : 1 to two decimal places (enter x).`,
    explanation: `${F(84000)} ÷ ${F(240000)} = ${p2(de)} : 1. Dividing by capital employed (${F(324000)}) would give the gearing ratio, ${p2(84000 / 324000)}.`,
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why interest cover is important to a lender.",
    points: ["It shows how many times the profit from operations covers the interest due", "A low cover means a small fall in profit could leave the borrower unable to pay"],
    modelAnswer: "Interest cover shows how comfortably profit pays the interest. A low cover warns the lender that the interest may not be paid if profit falls.",
    explanation: "One mark for the meaning and one for the risk to the lender.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 4,
    stem: "A company reduced its gearing from 55% to 30% by issuing new shares. Explain one advantage and one disadvantage for the existing shareholders.",
    points: ["Advantage: lower financial risk, because less fixed interest has to be paid", "Advantage explained: the company is more likely to survive a poor year", "Disadvantage: their share of profit and voting control is diluted if they do not buy the new shares", "Disadvantage explained: dividends are not a fixed cost, but the return per share may be lower in a good year"],
    modelAnswer: "Lower gearing means less fixed interest, so the company is safer in a poor year. The existing shareholders, however, own a smaller share of the company, and in a good year the profit is spread over more shares.",
    hints: ["Think about risk, control and the return per share."],
    explanation: "Two marks for the advantage with development and two for the disadvantage with development.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 5,
    stem: "A bank is asked to lend a further US\\$80,000 to a company whose gearing is already 58% and whose interest cover has fallen from 6.2 times to 2.1 times. Advise the bank.",
    points: ["Gearing is already high, so a further loan adds to the fixed interest", "Interest cover has fallen sharply, so profit is a small multiple of the interest", "Another US\\$80,000 would reduce cover further and raise the risk of default", "Possible conditions: security over assets, a lower amount or a guarantee", "Judgement: the bank should decline or lend only a smaller amount with security"],
    modelAnswer: "The company is already highly geared and its interest cover has fallen to 2.1 times, so extra borrowing adds fixed interest to a thin margin of safety. The bank should decline, or lend less against security.",
    hints: ["Use both ratios."],
    explanation: "One mark for each of the two ratio points, the effect of more borrowing, a condition and a judgement.",
  });

  // Structured 1: 12 marks
  const a = coYear({ name: "Mazowe Citrus Ltd", year: 2024, revenue: 418000, cos: 267500, distribution: 21300, admin: 63700, finance: 6200, tax: 12600, nca: 332000, inventory: 29400, receivables: 36600, bank: 8000, payables: 24700, otherCL: 7300, loan: 74000, shareCapital: 160000 });
  const c = coYear({ name: "Mazowe Citrus Ltd", year: 2025, revenue: 436000, cos: 285800, distribution: 24100, admin: 66900, finance: 13900, tax: 7400, nca: 441000, inventory: 33100, receivables: 41200, bank: 5000, payables: 27800, otherCL: 6200, loan: 155000, shareCapital: 160000 });
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Mazowe Citrus Ltd farms oranges near Mutare and borrowed in 2025 to plant more trees. Give gearing as a percentage and interest cover in times, each to one decimal place.\n\n${table(["Item", "2024 US$", "2025 US$"], [["Profit from operations", a.pfo, c.pfo], ["Finance costs (interest payable)", a.finance, c.finance], ["Issued ordinary shares", a.shareCapital, c.shareCapital], ["Retained earnings", a.retained, c.retained], ["Loan notes (non-current)", a.loan, c.loan]])}`,
    parts: [
      P.group({ label: "(a)", stem: "Calculate gearing for:", parts: [
        P.num({ label: "(i)", marks: 2, kind: "pct", value: R.gearing(a), wrong: [(a.loan / a.equity) * 100], stem: "2024", explanation: `${F(a.loan)} ÷ ${F(a.capitalEmployed)} × 100 = ${p1(R.gearing(a))}%.` }),
        P.num({ label: "(ii)", marks: 2, kind: "pct", value: R.gearing(c), wrong: [(c.loan / c.equity) * 100], stem: "2025", explanation: `${F(c.loan)} ÷ ${F(c.capitalEmployed)} × 100 = ${p1(R.gearing(c))}%.` }),
      ] }),
      P.group({ label: "(b)", stem: "Calculate interest cover for:", parts: [
        P.num({ label: "(i)", marks: 2, kind: "times", dp: 1, value: R.cover(a), wrong: [a.pbt / a.finance], stem: "2024", explanation: `${F(a.pfo)} ÷ ${F(a.finance)} = ${p1(R.cover(a))} times.` }),
        P.num({ label: "(ii)", marks: 2, kind: "times", dp: 1, value: R.cover(c), wrong: [c.pbt / c.finance], stem: "2025", explanation: `${F(c.pfo)} ÷ ${F(c.finance)} = ${p1(R.cover(c))} times.` }),
      ] }),
      P.manual({ label: "(c)", marks: 4, stem: "Comment on the change in the financial risk of the company between 2024 and 2025.", points: [`Gearing rose from ${p1(R.gearing(a))}% to ${p1(R.gearing(c))}%`, `Interest cover fell from ${p1(R.cover(a))} to ${p1(R.cover(c))} times`, "The company must pay much more fixed interest and its profit gives less protection", "Risk has increased; the new trees will take time to earn, so the position may improve later if the expansion is successful"], modelAnswer: `Gearing rose and interest cover fell sharply, so the company carries more fixed interest with less safety margin. Risk has increased, although the new trees may raise profit later.`, explanation: "One mark each for the two ratio movements, the meaning and a conclusion." }),
    ],
    hints: ["Capital employed = shares + reserves + loan notes.", "Interest cover uses profit from operations."],
    explanation: "This item tests gearing and interest cover for two years with a comment on risk.",
  });

  // Structured 2: 16 marks, loan or share issue
  const sh = 280000, rs = 130000, ln0 = 70000, need = 160000, intr0 = 7000, newPfo = 95000;
  const gA = ratios.gearing(ln0 + need, sh, rs), gB = ratios.gearing(ln0, sh + need, rs);
  const cA = newPfo / (intr0 + need * 0.1), cB = newPfo / intr0;
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: `Masvingo Dairies Ltd needs ${usd(need)} to build a cheese factory. The directors can either issue 10% loan notes for ${usd(need)} or issue ordinary shares for ${usd(need)} at par. Before the expansion the company has issued ordinary shares of ${usd(sh)}, reserves of ${usd(rs)} and 10% loan notes of ${usd(ln0)}, so interest payable is ${usd(intr0)} a year. Profit from operations is expected to be ${usd(newPfo)} after the expansion whichever method is chosen. Give percentages and times to one decimal place.`,
    parts: [
      P.group({ label: "(a)", stem: "Calculate the gearing if the company raises the finance by:", parts: [
        P.num({ label: "(i)", marks: 2, kind: "pct", value: gA, wrong: [(ln0 / (sh + rs + ln0)) * 100], stem: "issuing loan notes", explanation: `Non-current liabilities = ${F(ln0 + need)}; capital employed = ${F(sh)} + ${F(rs)} + ${F(ln0 + need)} = ${F(sh + rs + ln0 + need)}; gearing = ${p1(gA)}%.` }),
        P.num({ label: "(ii)", marks: 2, kind: "pct", value: gB, wrong: [(ln0 / (sh + rs + ln0)) * 100], stem: "issuing shares", explanation: `Non-current liabilities = ${F(ln0)}; capital employed = ${F(sh + need)} + ${F(rs)} + ${F(ln0)} = ${F(sh + need + rs + ln0)}; gearing = ${p1(gB)}%.` }),
      ] }),
      P.group({ label: "(b)", stem: "Calculate the interest cover if the company raises the finance by:", parts: [
        P.num({ label: "(i)", marks: 2, kind: "times", dp: 1, value: cA, wrong: [newPfo / intr0], stem: "issuing loan notes", explanation: `Interest = ${F(intr0)} + 10% × ${F(need)} = ${F(intr0 + need * 0.1)}; cover = ${F(newPfo)} ÷ ${F(intr0 + need * 0.1)} = ${p1(cA)} times.` }),
        P.num({ label: "(ii)", marks: 2, kind: "times", dp: 1, value: cB, wrong: [cA], stem: "issuing shares", explanation: `Interest stays at ${F(intr0)}; cover = ${F(newPfo)} ÷ ${F(intr0)} = ${p1(cB)} times.` }),
      ] }),
      P.manual({ label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", stem: "Advise the directors which method of raising the finance they should choose. Use your calculations and consider both financial and non-financial factors.", points: [`Loan notes would raise gearing to ${p1(gA)}% against ${p1(gB)}% for shares`, `Interest cover would be ${p1(cA)} times with loan notes and ${p1(cB)} times with shares`, "Loan interest is a fixed cost that must be paid even if the cheese factory takes time to earn", "Loan notes do not dilute the control or the earnings per share of existing shareholders", "Interest is deductible before tax, so the cost of the loan is lower than it looks (stem tax rate not given)", "New shares carry no fixed payment, so the risk is lower, but new shareholders share future profits", "The profit forecast is uncertain; high gearing is dangerous if the forecast is not met", "Recommendation with a reason, for example a mixture or shares if profit is uncertain"], modelAnswer: `Loan notes keep control with the present shareholders but would raise gearing to ${p1(gA)}% and cut interest cover to ${p1(cA)} times, so the company would depend on the forecast profit to pay interest. Shares keep gearing at ${p1(gB)}% and cover at ${p1(cB)} times, but dilute the present owners. Because the forecast is uncertain, a share issue, or a mixture of the two, is the safer choice.`, explanation: "One point per creditworthy statement, up to 8; allow follow-through from the calculations." }),
    ],
    hints: ["Raise the right part of the denominator for each method.", "New loan notes add 10% interest."],
    explanation: "This item compares a loan and a share issue using gearing and interest cover and asks for a reasoned recommendation.",
  });

  b.card("FORMULA", "Gearing", "Non-current liabilities ÷ (issued ordinary shares + all reserves + non-current liabilities) × 100.");
  b.card("FORMULA", "Interest cover", "Profit from operations ÷ interest payable, in times.");
  b.card("FORMULA", "Working capital cycle", "Inventory days + trade receivables days - trade payables days.");
  b.card("FORMULA", "Net working assets to revenue", "(Inventory + trade receivables - trade payables) ÷ revenue × 100.");
  b.card("FORMULA", "Debt to equity", "Debt ÷ equity; the question defines the debt.", undefined, { applies: ZIM });
  b.card("CONCEPT", "Why does gearing magnify results?", "Interest is fixed, so in a good year extra profit goes to the shareholders, and in a poor year the interest still has to be paid.");
  b.card("FACT", "How to reduce gearing", "Issue shares, retain profit, repay loan notes or convert loan notes to shares.");
  b.card("CONCEPT", "Judging gearing", "Read gearing with interest cover and the stability of profit; a steady business can carry more debt than one with swings in profit.");
  b.card("FACT", "Which profit for interest cover?", "Profit from operations (before interest). Using profit after interest deducts the interest twice.");
});
void r2;
