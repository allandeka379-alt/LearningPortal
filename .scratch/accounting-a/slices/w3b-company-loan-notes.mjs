// W3b: company.loan-notes
import { concept, P, ZIM, table, tAccount, journal, chk, r2, ratios } from "../lib.mjs";
import { mc, F, usd } from "../tables/w3b-lib.mjs";

const p1 = (v) => (Math.round(v * 10) / 10).toFixed(1);

concept("aacc.company.loan-notes", { file: "company/loan-notes", keyPrefix: "company.loan-notes" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Where is the interest on loan notes shown in the statement of profit or loss?",
    ok: ["In finance costs", "Correct: interest on borrowing is a finance cost."],
    bad: [["In cost of sales", "Cost of sales is the cost of the goods sold."], ["In distribution costs", "Distribution costs are the costs of delivering goods."], ["In the statement of changes in equity", "Interest is an expense, not a distribution of profit."]],
    explanation: "Interest on loan notes is a finance cost, deducted to reach profit before tax.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Loan notes that are repayable within 12 months of the year end are shown as:",
    ok: ["a current liability", "Correct: they will be paid within a year."],
    bad: [["a non-current liability", "That is for notes repayable after more than 12 months."], ["part of the share capital", "Loan notes are not share capital."], ["a deduction from retained earnings", "Repaying a liability is not a distribution."]],
    explanation: "Loan notes become a current liability when they fall due within 12 months of the year end.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the main difference between loan notes and ordinary shares from the company's view?",
    ok: ["Interest on loan notes must be paid whether or not there is a profit", "Correct: the interest is a fixed commitment."],
    bad: [["Loan notes give the holders a vote at the annual general meeting", "Loan note holders do not vote."], ["Ordinary shares must be repaid on a fixed date", "Shares are not repaid."], ["Dividends on ordinary shares are paid before loan note interest", "Interest ranks before dividends."]],
    explanation: "Interest on loan notes is a fixed commitment, while dividends are paid only if the directors declare them.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A company issues US\\$50,000 of 8% loan notes on 1 October. Its year end is 31 December. What is the interest charge for the year?",
    ok: ["US\\$1,000", "Correct: 50,000 × 8% × 3/12."],
    bad: [["US\\$4,000", "This is a full year's interest."], ["US\\$3,000", "This uses nine months instead of three."], ["US\\$2,000", "This uses six months instead of three."]],
    hints: ["Interest runs from the date of issue."],
    explanation: "50,000 × 8% = 4,000 a year; for three months, 4,000 × 3/12 = US\\$1,000.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "Which entry records the redemption of loan notes at par out of the bank?",
    ok: ["Debit loan notes, credit bank", "Correct: the liability is cleared and cash falls."],
    bad: [["Debit bank, credit loan notes", "That is the entry for the issue."], ["Debit loan note interest, credit bank", "The principal is not an expense."], ["Debit retained earnings, credit loan notes", "Retained earnings are not involved."]],
    hints: ["Which account falls when a liability is repaid?"],
    explanation: "Repaying a liability debits the liability account and credits Bank.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "What does it mean when loan notes are secured?",
    ok: ["The holders have a charge over named assets of the company", "Correct: they can claim the assets if the company defaults."],
    bad: [["The interest is guaranteed by the government", "Security means a charge on assets."], ["The notes can be converted into shares at any time", "That describes convertible loan stock."], ["The holders cannot lose any of their money", "Even secured notes can lose value if the assets are worth less."]],
    hints: ["Think of what the lender can claim if the company defaults."],
    explanation: "Secured loan notes are backed by a charge over specified assets, which the holders can claim if the company defaults.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A company issues loan notes to buy an asset that has not yet produced any profit. What happens to its gearing and interest cover?",
    ok: ["Gearing rises and interest cover falls", "Correct: debt and interest rise while profit has not yet changed."],
    bad: [["Gearing falls and interest cover rises", "More debt raises gearing."], ["Gearing rises and interest cover rises", "The extra interest lowers the cover."], ["Neither changes because the asset equals the debt", "The ratios depend on debt and interest, not on assets."]],
    hints: ["Which items in each ratio change?"],
    explanation: "Non-current liabilities rise, so gearing rises. The extra interest with no extra profit lowers interest cover.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION", applies: ZIM,
    stem: "ZIMSEC style. Holders convert US\\$30,000 of loan notes into ordinary shares of US\\$1 each at the rate of one share for every US\\$1.20 of loan notes. How much is credited to share premium?",
    ok: ["US\\$5,000", "Correct: 25,000 shares; 30,000 less 25,000."],
    bad: [["US\\$30,000", "This is the whole loan converted."], ["US\\$25,000", "This is the share capital, not the premium."], ["Nil, because no cash is received", "The amount above nominal value is share premium."]],
    hints: ["Number of shares = 30,000 ÷ 1.20."],
    explanation: "Shares issued = 30,000 ÷ 1.20 = 25,000, with nominal value US\\$25,000. The balance of the loan converted, US\\$5,000, is share premium.",
  });

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "The repayment of the principal of loan notes is an expense in the statement of profit or loss.", answer: false, explanation: "False. Repayment clears a liability; only the interest is an expense." });
  b.tf({ d: 3, skill: "APPLICATION", daily: true, stem: "Interest owing on loan notes at the year end is a current liability.", answer: true, hints: ["Is the interest due within a year?"], explanation: "True. The accrued interest is due within 12 months, so it is a current liability." });

  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each statement to the view from which it is an advantage of issuing loan notes instead of shares.",
    pairs: ["Control of the company is not shared with new owners", "A fixed return that is paid before dividends", "Interest is deducted before tax is calculated", "A better claim if the company closes"],
    right: ["Company", "Investor"],
    rightIndex: [0, 1, 0, 1],
    hints: ["Ask who benefits."],
    explanation: "Control and the tax treatment of interest help the company; a fixed return and priority in closing help the investor.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "Interest on loan notes is shown as a {{blank:a}} cost. Loan notes repayable in the next year are shown as a {{blank:b}} liability.",
    blanks: [{ id: "a", accepted: ["finance"], choices: ["finance", "distribution", "administrative"] }, { id: "b", accepted: ["current"], choices: ["current", "non-current"] }],
    explanation: "Interest is a finance cost; amounts due within 12 months are current liabilities.",
  });
  b.short({ d: 1, skill: "RECALL", stem: "What word describes the repayment of loan notes by a company at the end of their term?", accepted: ["redemption", "redeeming", "redeem"], explanation: "The repayment of loan notes is their redemption." });

  // numerical items, each on its own figures
  const ip = r2((75000 * 0.12 * 8) / 12);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: ip, calculator: true, daily: true, wrong: [r2(75000 * 0.12), r2((75000 * 0.12 * 4) / 12)],
    stem: `A company issued ${usd(75000)} of 12% loan notes on 1 May. Its year end is 31 December. Calculate the interest charge for the year.`,
    explanation: `75,000 × 12% × 8/12 = ${usd(ip)}. A full year would be ${usd(75000 * 0.12)}.`,
  });
  const ac = r2((64000 * 0.09 * 5) / 12);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: ac, calculator: true, wrong: [r2(64000 * 0.09), r2((64000 * 0.09 * 7) / 12)],
    stem: `A company has ${usd(64000)} of 9% loan notes in issue all year. Interest is paid on 31 July and 31 January. The year end is 31 December. Calculate the interest accrued at the year end.`,
    hints: ["Count the months since the last payment."],
    explanation: `The last payment was on 31 July, so five months (August to December) are owing: 64,000 × 9% × 5/12 = ${usd(ac)}.`,
  });
  const sh = r2(45000 / 1.5);
  b.num({
    d: 3, skill: "APPLICATION", kind: "units", value: sh, applies: ZIM, wrong: [45000, r2(45000 * 1.5)],
    stem: `ZIMSEC style. Holders convert ${usd(45000)} of loan notes into ordinary shares of US\\$1 each at the rate of one share for every US\\$1.50 of loan notes. Calculate the number of shares issued.`,
    hints: ["Divide the loan by the conversion price."],
    explanation: `${F(45000)} ÷ 1.50 = ${F(sh)} shares. Multiplying would give ${F(45000 * 1.5)}.`,
  });
  const gr = ratios.gearing(0, 220000, 130000);
  const gr0 = ratios.gearing(100000, 220000, 130000);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "pct", value: ratios.gearing(40000, 220000, 130000), calculator: true, wrong: [gr0, 40000 / 350000 * 100],
    stem: `A company has ordinary shares of ${usd(220000)}, reserves of ${usd(130000)} and ${usd(100000)} of loan notes. It then redeems ${usd(60000)} of the loan notes out of the bank balance. Calculate gearing after the redemption as a percentage to one decimal place.`,
    hints: ["Capital employed also falls by the amount redeemed."],
    explanation: `After redemption the loan notes are ${usd(40000)}. Capital employed = ${F(220000)} + ${F(130000)} + ${F(40000)} = ${F(390000)}. Gearing = ${F(40000)} ÷ ${F(390000)} × 100 = ${p1(ratios.gearing(40000, 220000, 130000))}%. Before redemption it was ${p1(gr0)}%.`,
  });
  void gr;

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why interest on loan notes must be accrued at the year end.",
    points: ["Interest is a cost of the year in which the money was borrowed, whether or not it has been paid", "The unpaid amount is a liability at the year end, so profit and liabilities would be misstated without it"],
    modelAnswer: "The cost belongs to the year, so it must be charged even though it is unpaid. Leaving it out would overstate profit and understate liabilities.",
    explanation: "One mark for the accruals idea and one for the effect on profit and liabilities.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 4,
    stem: "Give two advantages and two disadvantages to a company of raising finance by loan notes instead of ordinary shares.",
    points: ["Advantage: the existing shareholders keep control", "Advantage: the interest is deducted before tax and the cost may be lower than dividends", "Disadvantage: interest must be paid even if profit is low, and the notes must be repaid", "Disadvantage: gearing rises and security may have to be given over assets"],
    modelAnswer: "Loan notes leave control with the present owners and the interest is deductible before tax. However, the interest and repayment are compulsory, gearing rises and assets may have to be pledged.",
    hints: ["Think of control, tax, risk and security."],
    explanation: "One mark each for the four points.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 5,
    stem: "A company with gearing of 55% and interest cover of 2.0 times plans to finance a new factory by issuing further loan notes. Advise the directors.",
    points: ["Gearing is already high, so more borrowing adds to financial risk", "Interest cover of 2.0 times leaves little margin if profit falls", "The new factory will not earn profit at once, so interest cover may fall below 2 times in the first year", "A share issue or a mixture would lower the risk, though it dilutes the owners", "Recommendation: use shares or a smaller loan unless the profit from the factory is certain"],
    modelAnswer: "Gearing is already high and the interest cover of 2.0 times leaves a thin margin. A new loan would raise interest before the factory earns, so the risk of default would rise. The directors should raise at least part of the money by issuing shares.",
    hints: ["Use gearing and interest cover together."],
    explanation: "One mark each for gearing, cover, timing of the profit, the alternative and a recommendation.",
  });

  // Structured 1: 12 marks
  const L = 90000, rt = 12;
  const iy = r2((L * rt * 10) / 1200), ipd = r2((L * rt * 6) / 1200), iac = r2(iy - ipd);
  chk(iac, 3600);
  const intMd = tAccount("Loan note interest account", [["31 Aug", "Bank", ipd]], [["31 Dec", "Statement of profit or loss", iy]], { cd: "Accrued interest c/d", bd: "Accrued interest b/d", cdDate: "31 Dec", bdDate: "1 Jan" });
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Rushinga Cotton Ltd issued ${usd(L)} of ${rt}% loan notes at par on 1 March 2025. Interest is payable half-yearly on 31 August and 28 February. The year end is 31 December.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: iy, wrong: [r2(L * rt / 100), ipd], stem: "Calculate the interest charge for the year ended 31 December 2025.", explanation: `${F(L)} × ${rt}% × 10/12 = ${usd(iy)}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: ipd, wrong: [iy, r2(L * rt / 100)], stem: "Calculate the interest paid on 31 August 2025.", explanation: `${F(L)} × ${rt}% × 6/12 = ${usd(ipd)}.` }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: iac, wrong: [ipd, iy], stem: "Calculate the interest accrued at 31 December 2025.", explanation: `${F(iy)} - ${F(ipd)} = ${usd(iac)}, four months from 1 September.` }),
      P.mcq({ label: "(d)", marks: 2, stem: "How is the accrued interest shown at 31 December 2025?", options: [["As a current liability", "Correct: it is due within a year."], ["As part of the loan notes in non-current liabilities", "Interest owing is a separate accrual."], ["As an asset", "It is owed by the company."], ["As a deduction from retained earnings", "It is an expense of the year."]], answer: "A", explanation: "Accrued interest is due within 12 months, so it is a current liability." }),
      P.manual({ label: "(e)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare the loan note interest account for the year ended 31 December 2025, showing the transfer to the statement of profit or loss.", points: ["Debit: bank " + F(ipd) + " (interest paid)", "Credit: transfer to the statement of profit or loss " + F(iy), "Debit: accrued interest c/d " + F(iac) + " to balance the account", "Both sides total " + F(iy) + " and the balance b/d is shown on 1 January"], modelAnswer: intMd, explanation: "One mark for each point." }),
    ],
    hints: ["Interest runs from 1 March, ten months."],
    explanation: "This item tests the interest charge, the payment, the accrual and the ledger account.",
  });

  // Structured 2: 16 marks
  const LN = 200000, SH = 350000, RS = 250000, BK = 260000;
  const g0 = ratios.gearing(LN, SH, RS), g1 = ratios.gearing(0, SH, RS);
  const saved = r2(LN * 0.08);
  const jr = journal([{ date: "31 Dec", lines: [["8% loan notes", LN, null], ["Bank", null, LN]], narrative: "Redemption of the 8% loan notes at par" }], { title: "Journal" });
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: `Tsholotsho Quarry Ltd has ordinary shares of ${usd(SH)}, reserves of ${usd(RS)}, ${usd(LN)} of 8% loan notes redeemable at par on 31 December 2026, and cash of ${usd(BK)}. The directors are deciding whether to redeem the notes from the bank on the due date. Give percentages to one decimal place.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "pct", value: g0, wrong: [(LN / (SH + RS)) * 100], stem: "Calculate gearing before the redemption.", explanation: `${F(LN)} ÷ ${F(SH + RS + LN)} × 100 = ${p1(g0)}%.` }),
      P.num({ label: "(b)", marks: 2, kind: "pct", value: g1, wrong: [g0], stem: "Calculate gearing after the redemption.", explanation: "No loan notes remain, so gearing is 0.0%." }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: saved, wrong: [LN, r2(LN * 0.8)], stem: "Calculate the interest that the company saves in a full year.", explanation: `8% × ${F(LN)} = ${usd(saved)}.` }),
      P.mcq({ label: "(d)", marks: 1, stem: "How are the loan notes shown at 31 December 2025?", options: [["As a current liability, because they are repayable within 12 months", "Correct: the due date is 31 December 2026."], ["As a non-current liability, because they were issued some time ago", "They fall due within a year."], ["As part of equity", "Loan notes are a liability."], ["They are not shown until they are repaid", "A liability is shown until it is repaid."]], answer: "A", explanation: "Notes repayable within 12 months of the year end are current liabilities." }),
      P.manual({ label: "(e)", marks: 3, stem: "Prepare the journal entry for the redemption.", points: ["Debit 8% loan notes " + F(LN), "Credit Bank " + F(LN), "A narrative"], modelAnswer: jr, explanation: "One mark for each line." }),
      P.manual({ label: "(f)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Evaluate the decision to redeem the loan notes from the bank balance. Refer to cash, gearing, interest and the liquidity of the company.", points: [`Gearing falls from ${p1(g0)}% to 0.0%: the company is much safer`, `The company saves ${usd(saved)} of interest a year`, `Cash falls from ${usd(BK)} to ${usd(BK - LN)}, which reduces liquidity`, "The current ratio is lower after the redemption unless the notes were already counted as a current liability", "The company has less cash for expansion, though the interest saved is a permanent benefit", "Judgement: redeem if enough cash remains for working capital; otherwise redeem part or refinance"], modelAnswer: `Redemption removes the debt, so gearing falls to 0.0% and ${usd(saved)} of interest is saved each year. However, cash falls from ${usd(BK)} to ${usd(BK - LN)}, which reduces the liquidity and the funds for expansion. If the remaining cash is enough for working capital, the company should redeem; otherwise it could redeem part.`, explanation: "One mark per creditworthy point, up to 6; allow follow-through." }),
    ],
    hints: ["Capital employed falls when the notes are redeemed.", "Compare the cash left with the needs of the business."],
    explanation: "This item tests gearing, interest saving, classification and the journal for a redemption and asks for an evaluation.",
  });

  b.card("DEFINITION", "What are **loan notes (debentures)**?", "A long-term loan to a company on which fixed interest is paid and which is repaid on a stated date.");
  b.card("FACT", "Interest on loan notes", "A finance cost for the period in issue (nominal value × rate × fraction of year); unpaid interest is an accrual in current liabilities.");
  b.card("FACT", "Classification of loan notes", "Non-current liability until the last 12 months; then a current liability.");
  b.card("FACT", "Entry for redemption", "Debit loan notes, credit bank. The principal is not an expense.");
  b.card("DEFINITION", "What does **secured** mean for loan notes?", "The holders have a charge over named assets that they can claim if the company defaults.");
  b.card("CONCEPT", "Debentures against shares: the company", "Debentures keep control and the interest is deducted before tax, but the interest and repayment are compulsory and gearing rises.");
  b.card("CONCEPT", "Debentures against shares: the investor", "Fixed income and a better claim on closure, but no vote and no share in growth.");
  b.card("FORMULA", "Shares from conversion", "Loan converted ÷ conversion price per share; credit nominal value to share capital and the rest to share premium.", undefined, { applies: ZIM });
  b.card("CONCEPT", "Effect of redemption on gearing", "Non-current liabilities and capital employed fall, so gearing falls; interest saved raises profit before tax.");
});
void table;
