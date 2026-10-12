// W3b: company.redemption-shares (ZIMSEC only; items are tagged to ZIMSEC automatically)
import { concept, P, table, journal, statement, chk, r2 } from "../lib.mjs";
import { mc, F, usd } from "../tables/w3b-lib.mjs";

concept("aacc.company.redemption-shares", { file: "company/redemption-shares", keyPrefix: "company.redemption-shares" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "When is a capital redemption reserve created?",
    ok: ["When shares are redeemed out of distributable profits", "Correct: it replaces the capital that is repaid."],
    bad: [["When shares are issued at a premium to investors", "A premium is credited to share premium."], ["When non-current assets are revalued upwards", "That creates a revaluation reserve."], ["When an interim dividend is paid to shareholders", "A dividend reduces retained earnings only."]],
    explanation: "The CRR is credited when shares are redeemed or bought back from distributable profits, to maintain the capital of the company.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Out of which sources may a company lawfully redeem its shares?",
    ok: ["Distributable profits or the proceeds of a fresh issue of shares", "Correct: neither source reduces the protection of creditors."],
    bad: [["The share premium account and the revaluation reserve together", "These are capital reserves and are not used to repay shares."], ["The proceeds of new loan notes issued to the bank only", "Loan notes are not a permitted source."], ["Any bank balance that the company holds at the time of redemption", "Cash alone is not a source of lawful funds."]],
    explanation: "Redemption is allowed from distributable profits or from the proceeds of a fresh issue of shares made for that purpose.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the capital redemption reserve?",
    ok: ["A non-distributable reserve that maintains the capital of the company", "Correct: it cannot be paid out as a dividend."],
    bad: [["A distributable reserve that may be paid out as a dividend each year", "The CRR is not distributable."], ["A liability owed to the former preference shareholders after redemption", "The shareholders have been paid; it is not a liability."], ["An asset representing the cash that was set aside for the redemption", "It is part of equity, not an asset."]],
    explanation: "The CRR is part of equity, is not distributable and may only be used for a bonus issue.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A company redeems 60,000 preference shares of US\\$1 at par wholly out of distributable profits, without a new issue. What is credited to the capital redemption reserve?",
    ok: ["US\\$60,000", "Correct: the nominal value redeemed."],
    bad: [["Nil", "A transfer is needed because no fresh issue was made."], ["US\\$120,000", "The amount is not doubled."], ["The cash paid less the premium", "This is the cash, not the CRR; here the two are equal, but the rule is the nominal value."]],
    hints: ["Nominal value redeemed less the proceeds of any fresh issue."],
    explanation: "With no fresh issue the CRR equals the nominal value redeemed, US\\$60,000.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A company redeems 94,000 preference shares of US\\$1 at par and finances part of this by issuing 38,000 ordinary shares of US\\$1 at par. What is credited to the capital redemption reserve?",
    ok: ["US\\$56,000", "Correct: 94,000 less 38,000."],
    bad: [["US\\$94,000", "This ignores the fresh issue."], ["US\\$38,000", "This is the fresh issue only."], ["US\\$132,000", "The two amounts are added in error."]],
    hints: ["CRR = nominal value redeemed - nominal value of the new shares."],
    explanation: "CRR = 94,000 - 38,000 = US\\$56,000.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "For which purpose may a company use its capital redemption reserve?",
    ok: ["To issue fully paid bonus shares", "Correct: this keeps the capital in the company."],
    bad: [["To pay an interim dividend", "The CRR is not distributable."], ["To repay the loan notes", "The CRR is not cash and cannot repay debt."], ["To write off the cost of a fresh issue", "Share premium may do that, not the CRR."]],
    hints: ["The reserve may be capitalised."],
    explanation: "The CRR is used for a bonus issue; it cannot be distributed or used to repay liabilities.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A company pays US\\$50,000 in cash to redeem preference shares wholly from profits and credits US\\$50,000 to the CRR. What is the effect on total equity?",
    ok: ["It falls by US\\$50,000, the cash paid out", "Correct: the transfer to the CRR does not change the total."],
    bad: [["It is unchanged, because the CRR replaces the shares", "Cash has left the company."], ["It rises by US\\$50,000, because a reserve is created", "The reserve replaces the shares and retained earnings fall."], ["It falls by US\\$100,000, because of both entries", "The transfer is within equity."]],
    hints: ["Which entry moves cash?"],
    explanation: "Redeeming the shares removes US\\$50,000 of share capital and cash. The transfer from retained earnings to the CRR only moves value within equity.",
  });

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "The capital redemption reserve can be used to pay a dividend to ordinary shareholders.", answer: false, explanation: "False. It is a non-distributable reserve; it can only be used for a bonus issue." });
  b.tf({ d: 3, skill: "APPLICATION", daily: true, stem: "If shares are redeemed entirely from the proceeds of a fresh issue of the same nominal value, no capital redemption reserve is needed.", answer: true, hints: ["How much capital has left the company?"], explanation: "True. The capital is replaced by the new shares, so there is nothing to transfer to the CRR." });

  b.match({
    d: 3, skill: "APPLICATION",
    stem: "Match each entry in a redemption to the account that is credited.",
    pairs: ["Cash paid to the holders of the redeemed shares", "Transfer to protect capital when shares are redeemed from profits", "Proceeds of a fresh issue of shares at par", "Cancellation of the redeemed shares"],
    right: ["Bank", "Capital redemption reserve", "Ordinary share capital"],
    rightIndex: [0, 1, 2, 0],
    hints: ["Redeemed share capital is debited when it is cancelled."],
    explanation: "Cash paid credits Bank; the transfer credits the CRR; a fresh issue credits share capital; cancelling the shares debits their capital and credits Bank.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences.",
    template: "The capital redemption reserve is created by a transfer from {{blank:a}}. It is a {{blank:b}} reserve and cannot be paid as a dividend.",
    blanks: [{ id: "a", accepted: ["retained earnings"], choices: ["retained earnings", "share premium", "bank"] }, { id: "b", accepted: ["non-distributable"], choices: ["non-distributable", "distributable"] }],
    explanation: "Profits are transferred from retained earnings to the CRR; the CRR is not distributable.",
  });
  b.short({ d: 1, skill: "RECALL", stem: "What are the initials commonly used for the reserve created when shares are redeemed out of profits?", accepted: ["CRR", "crr"], explanation: "It is the capital redemption reserve (CRR)." });

  // numerical items, each on its own figures
  const crr1 = 85000;
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: crr1, daily: true, wrong: [0, 170000],
    stem: `A company redeems ${F(85000)} 6% redeemable preference shares of US\\$1 each at par, paying from the bank, with no fresh issue. Calculate the amount transferred to the capital redemption reserve.`,
    explanation: `With no fresh issue, the CRR equals the nominal value redeemed, ${usd(crr1)}.`,
  });
  const crr2 = r2(140000 - 55000);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: crr2, calculator: true, wrong: [140000, 55000],
    stem: `A company redeems ${F(140000)} redeemable preference shares of US\\$1 at par. To help pay, it issues ${F(55000)} new ordinary shares of US\\$1 at par. The remainder is paid from distributable profits. Calculate the amount transferred to the capital redemption reserve.`,
    hints: ["CRR = nominal value redeemed - nominal value of the new issue."],
    explanation: `${F(140000)} - ${F(55000)} = ${usd(crr2)}. Using the whole redemption ignores the fresh issue, and using only the fresh issue is the wrong way round.`,
  });
  const reAfter = r2(112000 - 48000);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: reAfter, calculator: true, wrong: [112000, r2(112000 - 96000)],
    stem: `A company's retained earnings were ${usd(112000)}. It redeems ${F(48000)} preference shares of US\\$1 at par out of profits with no fresh issue. Calculate retained earnings after the transfer to the capital redemption reserve.`,
    hints: ["Retained earnings fall by the amount transferred."],
    explanation: `Transfer = ${usd(48000)}, so retained earnings = ${F(112000)} - ${F(48000)} = ${usd(reAfter)}.`,
  });
  const dv = r2(72000 * 0.09);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: dv, calculator: true, wrong: [r2(72000 * 0.9), r2(72000 / 0.09)],
    stem: `A company redeems ${F(72000)} 9% preference shares of US\\$1 each. Calculate the annual preference dividend that it no longer has to pay.`,
    explanation: `9% × ${usd(72000)} = ${usd(dv)} a year.`,
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why a company must create a capital redemption reserve when it redeems shares out of profits.",
    points: ["The redemption repays share capital, which reduces the cushion that protects creditors", "Transferring profits to a non-distributable reserve keeps the total capital protection the same"],
    modelAnswer: "Repaying the shares reduces the capital that protects creditors. The transfer from distributable profits to the non-distributable CRR keeps the protection at the same level.",
    explanation: "One mark for the reduction in protection and one for the effect of the CRR.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 4,
    stem: "Give two reasons why a company might prefer to redeem preference shares partly from a fresh issue of ordinary shares instead of wholly from cash.",
    points: ["It keeps cash in the business for operating needs or investment", "Less distributable profit has to be converted to the non-distributable CRR, so more can be paid as dividends", "Ordinary shares carry no compulsory dividend, unlike the preference shares replaced", "The cost is that ownership and earnings are shared with new shareholders"],
    modelAnswer: "The cash stays in the business and less profit is locked into the CRR, so more is available for dividends. The ordinary shares have no fixed dividend, but the existing owners share their profits with the new shareholders.",
    hints: ["Think about cash and about distributable reserves."],
    explanation: "One mark for each point, up to four.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 5,
    stem: "A company with US\\$150,000 in the bank and distributable reserves of US\\$170,000 plans to redeem 100,000 preference shares of US\\$1 from profits. Evaluate the effect on the company and advise the directors.",
    points: ["Cash falls to US\\$50,000, which may leave too little for operations and for paying creditors", "Distributable reserves fall to US\\$70,000 because US\\$100,000 is moved to the CRR, so future dividends are limited", "The company saves the fixed preference dividend", "The CRR keeps the capital protection for creditors", "Judgement: redeem only if enough cash remains for working capital, or use a fresh issue for part of the redemption"],
    modelAnswer: "Cash falls to US\\$50,000, which may leave too little for working capital, and distributable reserves fall to US\\$70,000, which limits dividends. The company saves the preference dividend and creditors stay protected. The directors should redeem only if cash remains adequate, or finance part with a fresh issue.",
    hints: ["Work out the new cash and reserves first."],
    explanation: "One mark each for cash, reserves, the dividend saving, creditor protection and a judgement.",
  });

  // Structured 1: 12 marks
  const S1 = { ord: 200000, pref: 60000, sp: 15000, re: 85000, bank: 95000 };
  const crrS = S1.pref, reS = r2(S1.re - crrS), bankS = r2(S1.bank - S1.pref), divS = r2(S1.pref * 0.09);
  const jS = journal([
    { date: "31 Oct", lines: [["9% redeemable preference share capital", S1.pref, null], ["Bank", null, S1.pref]], narrative: "Redemption of 60,000 preference shares of US\\$1 at par" },
    { date: "31 Oct", lines: [["Retained earnings", crrS, null], ["Capital redemption reserve", null, crrS]], narrative: "Transfer to the capital redemption reserve" },
  ], { title: "Journal" });
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Lupane Packaging Ltd has ordinary shares ${usd(S1.ord)}, ${F(S1.pref)} 9% redeemable preference shares of US\\$1 each, share premium ${usd(S1.sp)}, retained earnings ${usd(S1.re)} and bank ${usd(S1.bank)}. On 31 October 2026 it redeems all the preference shares at par, paying from the bank. There is no new issue.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: crrS, wrong: [0, S1.re], stem: "Calculate the amount transferred to the capital redemption reserve.", explanation: `No fresh issue, so the CRR is the nominal value redeemed, ${usd(crrS)}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: reS, wrong: [S1.re, r2(S1.re + crrS)], stem: "Calculate retained earnings after the redemption.", explanation: `${F(S1.re)} - ${F(crrS)} = ${usd(reS)}.` }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: bankS, wrong: [S1.bank, r2(S1.bank + S1.pref)], stem: "Calculate the bank balance after the redemption.", explanation: `${F(S1.bank)} - ${F(S1.pref)} = ${usd(bankS)}.` }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: divS, wrong: [r2(S1.pref * 0.9), crrS], stem: "Calculate the annual preference dividend saved.", explanation: `9% × ${F(S1.pref)} = ${usd(divS)}.` }),
      P.manual({ label: "(e)", marks: 4, stem: "Prepare the journal entries for the redemption.", points: ["Debit preference share capital " + F(S1.pref) + " and credit Bank " + F(S1.pref), "A narrative for the redemption", "Debit Retained earnings " + F(crrS) + " and credit Capital redemption reserve " + F(crrS), "A narrative for the transfer"], modelAnswer: jS, explanation: "One mark for each entry and each narrative." }),
    ],
    hints: ["With no fresh issue the CRR equals the nominal value redeemed."],
    explanation: "This item tests the capital redemption reserve, retained earnings and cash after a redemption from profits.",
  });

  // Structured 2: 16 marks
  const T = { ord: 320000, pref: 120000, sp: 25000, gr: 35000, re: 170000, newOrd: 45000 };
  const crrT = r2(T.pref - T.newOrd), cashT = r2(T.pref - T.newOrd), reT = r2(T.re - crrT);
  const eqB = r2(T.ord + T.pref + T.sp + T.gr + T.re), eqA = r2(T.ord + T.newOrd + T.sp + T.gr + crrT + reT);
  chk(eqB - eqA, cashT);
  const jT = journal([
    { date: "1 Dec", lines: [["Bank", T.newOrd, null], ["Ordinary share capital", null, T.newOrd]], narrative: "Issue of 45,000 ordinary shares of US\\$1 at par" },
    { date: "1 Dec", lines: [["8% redeemable preference share capital", T.pref, null], ["Bank", null, T.pref]], narrative: "Redemption of 120,000 preference shares at par" },
    { date: "1 Dec", lines: [["Retained earnings", crrT, null], ["Capital redemption reserve", null, crrT]], narrative: "Transfer of the nominal value redeemed less the new issue" },
  ], { title: "Journal" });
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: `Kwekwe Plastics Ltd has ordinary shares of ${usd(T.ord)}, ${F(T.pref)} 8% redeemable preference shares of US\\$1 each, share premium ${usd(T.sp)}, general reserve ${usd(T.gr)} and retained earnings ${usd(T.re)}. On 1 December 2026 it issues ${F(T.newOrd)} ordinary shares of US\\$1 at par and uses the proceeds, together with other cash, to redeem all the preference shares at par. Any transfer is made from retained earnings.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: crrT, wrong: [T.pref, T.newOrd], stem: "Calculate the amount transferred to the capital redemption reserve.", explanation: `${F(T.pref)} - ${F(T.newOrd)} = ${usd(crrT)}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: cashT, wrong: [T.pref, T.newOrd], stem: "Calculate the net cash paid out by the company in the redemption, after the proceeds of the new issue.", explanation: `${F(T.pref)} paid out less ${F(T.newOrd)} received = ${usd(cashT)}.` }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: reT, wrong: [T.re, r2(T.re - T.pref)], stem: "Calculate retained earnings after the redemption.", explanation: `${F(T.re)} - ${F(crrT)} = ${usd(reT)}.` }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: eqA, wrong: [eqB, r2(eqB - T.pref)], stem: "Calculate total equity after the redemption, excluding the preference shares.", explanation: `${F(T.ord + T.newOrd)} + ${F(T.sp)} + ${F(T.gr)} + ${F(crrT)} + ${F(reT)} = ${usd(eqA)}; it is ${usd(eqB)} - ${usd(cashT)}.` }),
      P.manual({ label: "(e)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Prepare the journal entries for the new issue, the redemption and the transfer.", points: ["Debit Bank " + F(T.newOrd) + " and credit Ordinary share capital " + F(T.newOrd), "A narrative for the issue", "Debit preference share capital " + F(T.pref) + " and credit Bank " + F(T.pref), "A narrative for the redemption", "Debit Retained earnings " + F(crrT) + " and credit Capital redemption reserve " + F(crrT), "A narrative for the transfer"], modelAnswer: jT, explanation: "One mark for each entry and each narrative." }),
      P.manual({ label: "(f)", marks: 2, stem: "Explain why the capital redemption reserve is smaller than it would be with no fresh issue.", points: ["The new shares replace part of the capital that was repaid", "Only the part of the nominal value redeemed that is not replaced needs to be protected by a transfer from profits"], modelAnswer: "The fresh issue replaces part of the capital repaid, so only the balance has to be protected by a transfer from profits.", explanation: "One mark for each of the two points." }),
    ],
    hints: ["CRR = nominal value redeemed - nominal value of the new shares.", "The transfer is within equity."],
    explanation: "This item tests a redemption partly financed by a fresh issue, the CRR and the journal entries.",
  });

  b.card("DEFINITION", "What is the **capital redemption reserve**?", "A non-distributable reserve credited when shares are redeemed out of profits, to keep the company's capital intact for creditors.");
  b.card("FORMULA", "CRR amount", "Nominal value of shares redeemed less the nominal value of new shares issued to finance the redemption.");
  b.card("FACT", "Lawful sources of redemption", "Distributable profits, or the proceeds of a fresh issue of shares made for the purpose.");
  b.card("FACT", "Journal for a redemption from profits", "Debit redeemed share capital, credit Bank; debit Retained earnings, credit Capital redemption reserve.");
  b.card("FACT", "Use of the CRR", "Only for a bonus issue of fully paid shares; never for dividends.");
  b.card("CONCEPT", "Effect of redemption on equity", "Total equity falls by the net cash paid out; the transfer to the CRR only moves value within equity.");
  b.card("CONCEPT", "Premium on redemption (outline)", "Charged to share premium (if allowed) or retained earnings; the CRR is based on nominal value.");
  b.card("CONCEPT", "Why redeem preference shares?", "Surplus cash, end of the fixed term, or to remove the fixed preference dividend.");
});
void table; void statement;
