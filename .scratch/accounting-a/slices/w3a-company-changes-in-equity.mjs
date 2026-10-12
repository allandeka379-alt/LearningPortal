// W3a: company.changes-in-equity
import { concept, P, table, check, sum, r2, fmt, money, chk, company } from "../lib.mjs";
import { mc } from "../tables/w3a-lib.mjs";
import { soce } from "../tables/w3a-models.mjs";

const cols = ["Share capital", "Share premium", "Revaluation reserve", "General reserve", "Retained earnings"];

concept("aacc.company.changes-in-equity", { file: "company/changes-in-equity", keyPrefix: "company.changes-in-equity" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "In which column of the statement of changes in equity is a gain on the revaluation of land entered?",
    ok: ["Revaluation reserve", "Correct: it is an unrealised gain held in its own reserve."],
    bad: [["Retained earnings", "Retained earnings receive profit for the year, not revaluation gains."], ["Share premium", "Share premium arises when shares are issued above par."], ["Share capital", "Share capital records the nominal value of shares."]],
    explanation: "A revaluation gain is other comprehensive income and is credited to the revaluation reserve.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A company transfers US\\$6,500 from retained earnings to the general reserve. What is the effect on total equity?",
    ok: ["No change", "Correct: one component rises and another falls by the same amount."],
    bad: [["It rises by US\\$6,500", "The transfer moves money within equity; nothing is added."], ["It falls by US\\$6,500", "Nothing leaves the company."], ["It rises by US\\$13,000", "The transfer is not counted twice."]],
    explanation: "The general reserve increases and retained earnings decrease by the same amount, so the total is unchanged.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Which statement about a bonus issue of shares is correct?",
    ok: ["Reserves are capitalised and no cash is received", "Correct: it is paid up from reserves."],
    bad: [["Cash is received from shareholders at par", "That describes a normal issue for cash."], ["Total equity increases by the nominal value", "Reserves fall by the same amount, so total equity is unchanged."], ["The revaluation reserve must always be used first", "The share premium is normally used first."]],
    explanation: "A bonus issue moves part of the reserves into share capital without bringing in cash, so total equity is the same.",
  });
  const rOpen = 41350, pf = 27860, dv = 12470, tr = 5230;
  const rClose = r2(rOpen + pf - dv - tr);
  chk(rClose, 51510);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Retained earnings at the start of the year were ${money(rOpen)}. Profit for the year was ${money(pf)}, dividends declared ${money(dv)} and ${money(tr)} was transferred to the general reserve. What are the retained earnings at the end of the year?`,
    ok: [money(rClose), "Correct: 41,350 + 27,860 - 12,470 - 5,230."],
    bad: [[money(r2(rClose + tr)), "The transfer to the general reserve has been ignored."], [money(r2(rOpen + pf + dv - tr)), "The dividends have been added instead of deducted."], [money(r2(rOpen + pf)), "Dividends and the transfer have both been left out."]],
    hints: ["Dividends and transfers both reduce retained earnings."],
    explanation: "41,350 + 27,860 - 12,470 - 5,230 = 51,510.",
  });
  const iss = company.shareIssue({ shares: 16000, par: 1, issuePrice: 1.75 });
  chk(iss.premium, 12000);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A company issues 16,000 ordinary shares of US\\$1 nominal value at US\\$1.75 each, all for cash. What amount is credited to the share premium?",
    ok: [money(iss.premium), "Correct: 16,000 × US\\$0.75."],
    bad: [[money(iss.capital), "That is the nominal value, credited to share capital."], [money(iss.cash), "That is the total cash received."], [money(0.75), "That is the premium on one share, not on all 16,000."]],
    hints: ["Premium = issue price - nominal value, for each share."],
    explanation: "The premium is 0.75 per share on 16,000 shares = 12,000; share capital is credited with 16,000.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which event does NOT change the total of equity?",
    ok: ["A bonus issue from the share premium", "Correct: reserves are converted to share capital."],
    bad: [["A dividend paid in cash", "A dividend reduces retained earnings and so reduces total equity."], ["A rights issue for cash at a premium", "Cash is received, so equity rises."], ["A loss for the year", "A loss reduces retained earnings."]],
    hints: ["Does cash come in or go out?"],
    explanation: "A bonus issue moves amounts between components of equity only.",
  });
  const op = 210800, tci = 51200, dvd = 18400, cashIssue = 36500;
  const cl = r2(op + tci - dvd + cashIssue);
  chk(cl, 280100);
  mc(b, {
    d: 4, skill: "APPLICATION", calculator: true,
    stem: `Equity at the start of the year was ${money(op)}. During the year total comprehensive income was ${money(tci)}, dividends of ${money(dvd)} were paid and shares were issued for ${money(cashIssue)} in cash. What is the equity at the end of the year?`,
    ok: [money(cl), "Correct: 210,800 + 51,200 - 18,400 + 36,500."],
    bad: [[money(r2(op + tci - dvd)), "The cash from the share issue has been left out."], [money(r2(op + tci + dvd + cashIssue)), "The dividend has been added instead of deducted."], [money(r2(op + tci - dvd - cashIssue)), "Cash received from shareholders increases equity."]],
    hints: ["List what increases and what decreases the owners' interest."],
    explanation: "210,800 + 51,200 - 18,400 + 36,500 = 280,100.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "The directors recommend a final dividend after the year end, before the statements are authorised. What is shown in the statement of changes in equity for the year just ended?",
    ok: ["Nothing; the dividend is disclosed in a note", "Correct: there was no obligation at the year end."],
    bad: [["A deduction from retained earnings for the year", "It would be deducted only if declared before the year end."], ["An increase in the general reserve account", "A recommendation does not create a reserve."], ["A deduction from the share capital account", "Dividends are never paid from share capital."]],
    hints: ["Was there a liability at the reporting date?"],
    explanation: "A dividend declared after the reporting date is a non-adjusting event; it is disclosed and recognised in the next year.",
  });

  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "A bonus issue increases the total equity of a company.", answer: false, explanation: "False. A bonus issue brings in no cash. Share capital increases and the reserves used decrease by the same amount." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "The share premium account is a capital reserve and cannot be paid out as a dividend.", answer: true, explanation: "True. Share premium is capital paid in by shareholders; it can be used for a bonus issue but not for dividends." });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each event to the column of the statement of changes in equity that it changes.",
    pairs: ["Interim dividend paid", "Gain on revaluation of buildings", "Excess of issue price over nominal value", "Nominal value of new shares issued for cash"],
    right: ["Retained earnings", "Revaluation reserve", "Share premium", "Share capital"],
    rightIndex: [0, 1, 2, 3],
    explanation: "Dividends reduce retained earnings; revaluation gains go to the revaluation reserve; the excess over par is share premium; the nominal value is share capital.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentence about a transfer to the general reserve.",
    template: "A transfer to the general reserve {{blank:a}} the general reserve and {{blank:b}} retained earnings by the same amount.",
    blanks: [
      { id: "a", accepted: ["increases"], choices: ["increases", "decreases"] },
      { id: "b", accepted: ["decreases"], choices: ["increases", "decreases"] },
    ],
    explanation: "The transfer moves profit that has been earned from retained earnings into the general reserve.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the column of the statement of changes in equity that records profit for the year.",
    accepted: ["retained earnings", "retained profits", "retained profit", "retained earning"],
    explanation: "Profit for the year increases retained earnings.",
  });

  // numerical
  const bsh = 60000, bnew = [1, 4];
  const bn = company.bonusIssue({ held: bsh, newPerOld: bnew, par: 2 });
  chk(bn.newShares, 15000);
  chk(bn.fromReserves, 30000);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: bn.fromReserves, calculator: true, wrong: [bn.newShares, r2(bsh * 2)],
    stem: `A company has ${bsh.toLocaleString("en-GB")} ordinary shares of US\\$2 each. It makes a bonus issue of 1 new share for every 4 held. Calculate the amount transferred from reserves to share capital.`,
    explanation: "New shares = 60,000 ÷ 4 = 15,000; amount = 15,000 × US\\$2 = US\\$30,000. The number of shares (15,000) is not an amount.",
  });
  const op3 = 88650, p3 = 41720, d3 = 23400, g3 = 9350;
  const ret3 = r2(op3 + p3 - d3 - g3);
  chk(ret3, 97620);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: ret3, calculator: true, wrong: [r2(op3 + p3 - d3), r2(op3 + p3 - d3 + g3)],
    stem: `Retained earnings at 1 January were ${money(op3)}. Profit for the year was ${money(p3)}. Dividends of ${money(d3)} were paid and ${money(g3)} was transferred to the general reserve. Calculate the retained earnings at 31 December.`,
    hints: ["Both the dividends and the transfer reduce retained earnings."],
    explanation: "88,650 + 41,720 - 23,400 - 9,350 = 97,620. Leaving out the transfer gives 106,970.",
  });
  const sp = 7200, ish = company.shareIssue({ shares: 15000, par: 1, issuePrice: 1.4 });
  const prem3 = r2(sp + ish.premium);
  chk(prem3, 13200);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: prem3, calculator: true, wrong: [ish.premium, ish.capital],
    stem: `Share premium at the start of the year was ${money(sp)}. During the year the company issued 15,000 ordinary shares of US\\$1 at US\\$1.40 each. Calculate the share premium at the end of the year (no other movements).`,
    hints: ["The new premium is added to the old balance."],
    explanation: "New premium = 15,000 × 0.40 = 6,000; closing balance = 7,200 + 6,000 = 13,200. The new premium alone is 6,000.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why a revaluation reserve cannot be used to pay a cash dividend.",
    points: ["The gain is unrealised: the asset has not been sold, so no cash has been received", "It is a capital reserve held to show the higher value, not a profit available for distribution"],
    modelAnswer: "The gain on the revaluation has not been realised because the asset has not been sold, so there is no cash behind it. It is a capital reserve and not distributable profit.",
    explanation: "One mark for unrealised or no cash and one for capital reserve.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Distinguish between a bonus issue and an issue of shares for cash.",
    points: ["A bonus issue is paid up from reserves, but shares for cash are paid for by investors", "A bonus issue brings in no cash, but an issue for cash increases the bank balance", "Total equity is unchanged by a bonus issue, but it rises when shares are issued for cash"],
    modelAnswer: "A bonus issue is paid up from reserves and brings in no cash, so total equity stays the same. An issue for cash is paid for by investors, so cash and total equity both rise.",
    hints: ["Think about where the money comes from."],
    explanation: "One mark each for source, cash and total equity.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "A company's retained earnings fell from US\\$54,000 to US\\$31,000 although it made a profit for the year of US\\$12,000. Suggest reasons and advise the shareholders what to check.",
    points: ["Retained earnings fell by US\\$23,000 even though profit was positive, so deductions must have exceeded US\\$12,000", "Possible deductions: dividends greater than profit, a transfer to a reserve, or a bonus issue paid from retained earnings", "A dividend above profit uses up past profit and may weaken the company", "Advice: check the statement of changes in equity for dividends and transfers, and whether the company can afford to continue"],
    modelAnswer: "Retained earnings fell by US\\$23,000, so deductions were US\\$35,000. The cause may be dividends larger than profit, a transfer to reserves or a bonus issue. Shareholders should check the statement for the amounts and whether the dividends are sustainable.",
    hints: ["Work out the total deductions: 12,000 + 23,000."],
    explanation: "One mark for the size of the deductions, one for possible causes, one for the consequence and one for advice.",
  });

  // Structured 1 (10 marks)
  const oA = [152000, 12500, 0, 22000, 47500];
  const pA = 38640, dA = 16500, trA = 8200;
  const isA = company.shareIssue({ shares: 45000, par: 1, issuePrice: 1.25 });
  const sA = soce({
    name: "Rusape Dairies Ltd", when: "for the year ended 31 December 2025", cols, opening: oA, openLabel: "Balance at 1 January 2025", closeLabel: "Balance at 31 December 2025",
    events: [["Profit for the year", 0, 0, 0, 0, pA], ["Dividend paid", 0, 0, 0, 0, -dA], ["Issue of 45,000 shares at US\\$1.25", isA.capital, isA.premium, 0, 0, 0], ["Transfer to general reserve", 0, 0, 0, trA, -trA]],
  });
  chk(sA.closing[1], 23750);
  chk(sA.closing[4], 61440);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Rusape Dairies Ltd had these equity balances at 1 January 2025: share capital US\\$${fmt(oA[0])} (ordinary shares of US\\$1), share premium US\\$${fmt(oA[1])}, general reserve US\\$${fmt(oA[3])} and retained earnings US\\$${fmt(oA[4])}. In 2025 the company made a profit for the year of US\\$${fmt(pA)}, paid a dividend of US\\$${fmt(dA)}, issued 45,000 shares at US\\$1.25 for cash and transferred US\\$${fmt(trA)} to the general reserve.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: sA.closing[1], wrong: [isA.premium, isA.cash], stem: "Calculate the share premium at 31 December 2025.", explanation: `Premium on the issue 45,000 × 0.25 = ${fmt(isA.premium)}; ${fmt(oA[1])} + ${fmt(isA.premium)} = ${fmt(sA.closing[1])}.` }),
      P.num({ label: "(b)", marks: 3, kind: "money", value: sA.closing[4], wrong: [r2(sA.closing[4] + trA), r2(oA[4] + pA)], stem: "Calculate the retained earnings at 31 December 2025.", explanation: `${fmt(oA[4])} + ${fmt(pA)} - ${fmt(dA)} - ${fmt(trA)} = ${fmt(sA.closing[4])}.` }),
      P.num({ label: "(c)", marks: 3, kind: "money", value: sA.total, wrong: [r2(sA.total - isA.cash), r2(sA.total + dA)], stem: "Calculate the total equity at 31 December 2025.", explanation: `Opening equity ${fmt(sum(oA))} + profit ${fmt(pA)} - dividend ${fmt(dA)} + cash from the issue ${fmt(isA.cash)} = ${fmt(sA.total)}. The transfer does not change the total.` }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why the transfer to the general reserve does not change the total equity.", points: ["The general reserve increases by the amount transferred", "Retained earnings decrease by the same amount, so the total is unchanged"], modelAnswer: "The general reserve rises by US\\$8,000 and retained earnings fall by US\\$8,000, so total equity is the same.", explanation: "One mark for each side of the transfer." }),
    ],
    hints: ["Add the premium to the opening premium.", "The transfer reduces retained earnings."],
    explanation: "This item tests share premium, retained earnings and total equity in a statement of changes in equity.",
  });
  chk(sum(sA.closing), sA.total);

  // Structured 2 (16 marks)
  const oB = [186000, 24000, 17500, 33000, 61400];
  const pB = 46850, revB = 8400, dB2 = 21600;
  const bonusB = company.bonusIssue({ held: 186000, newPerOld: [1, 6], par: 1 });
  chk(bonusB.newShares, 31000);
  const sB = soce({
    name: "Marondera Packaging Ltd", when: "for the year ended 31 December 2025", cols, opening: oB, openLabel: "Balance at 1 January 2025", closeLabel: "Balance at 31 December 2025",
    events: [["Profit for the year", 0, 0, 0, 0, pB], ["Gain on revaluation of land", 0, 0, revB, 0, 0], ["Dividend paid", 0, 0, 0, 0, -dB2], ["Bonus issue of 1 share for every 6 held", bonusB.fromReserves, -24000, 0, -7000, 0]],
  });
  chk(sB.closing[0], 217000);
  chk(sB.closing[3], 26000);
  chk(sB.closing[4], 61400 + 46850 - 21600);
  b.struct({
    d: 5, skill: "ANALYSIS", calculator: true,
    stem: `Marondera Packaging Ltd has issued 186,000 ordinary shares of US\\$1 each. Its equity at 1 January 2025 was: share premium US\\$${fmt(oB[1])}, revaluation reserve US\\$${fmt(oB[2])}, general reserve US\\$${fmt(oB[3])} and retained earnings US\\$${fmt(oB[4])}. During 2025:\n\n- profit for the year was US\\$${fmt(pB)};\n- land was revalued upwards by US\\$${fmt(revB)};\n- a dividend of US\\$${fmt(dB2)} was paid;\n- a bonus issue of 1 new share for every 6 held was made, paid up from the whole of the share premium and the balance from the general reserve.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: bonusB.fromReserves, wrong: [bonusB.newShares, 186000], stem: "Calculate the nominal value of the bonus shares issued.", explanation: "186,000 ÷ 6 = 31,000 shares of US\\$1 = US\\$31,000." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: r2(bonusB.fromReserves - oB[1]), wrong: [oB[1], bonusB.fromReserves], stem: "Calculate the amount taken from the general reserve.", explanation: `${fmt(bonusB.fromReserves)} - share premium ${fmt(oB[1])} = ${fmt(r2(bonusB.fromReserves - oB[1]))}.` }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: sB.closing[2], wrong: [oB[2], pB], stem: "Calculate the revaluation reserve at 31 December 2025.", explanation: `${fmt(oB[2])} + ${fmt(revB)} = ${fmt(sB.closing[2])}.` }),
      P.manual({ label: "(d)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Prepare the statement of changes in equity for the year ended 31 December 2025.", points: ["Heading and column headings (share capital, share premium, revaluation reserve, general reserve, retained earnings, total)", "Opening balances entered", `Profit for the year ${fmt(pB)} and dividend ${fmt(dB2)} in retained earnings`, `Revaluation gain ${fmt(revB)} in the revaluation reserve`, "Bonus issue: share capital up, share premium and general reserve down", `Closing balances correct, with total ${fmt(sB.total)}`], modelAnswer: sB.md, explanation: "One mark for each line; allow follow-through." }),
      P.num({ label: "(e)", marks: 2, kind: "money", value: sB.total, wrong: [r2(sB.total + 31000), r2(sB.total - revB)], stem: "Calculate the total equity at 31 December 2025.", explanation: `Opening equity ${fmt(sum(oB))} + profit ${fmt(pB)} + revaluation ${fmt(revB)} - dividend ${fmt(dB2)} = ${fmt(sB.total)}; the bonus issue does not change the total.` }),
      P.manual({ label: "(f)", marks: 2, stem: "A shareholder says the bonus issue makes the company US\\$31,000 richer. Comment.", points: ["No cash or assets were received: reserves were converted into share capital", "Each shareholder holds more shares, but the total equity is the same, so the value per share is lower"], modelAnswer: "The statement is wrong. The bonus issue only moves US\\$31,000 from reserves to share capital. The shareholders own more shares, but total equity is unchanged.", explanation: "One mark for no new resources and one for the unchanged total." }),
    ],
    hints: ["The share premium is used first.", "The bonus issue leaves the total unchanged."],
    explanation: "This item tests a statement of changes in equity with a revaluation and a bonus issue.",
  });
  void check; void table;

  b.card("DEFINITION", "What is the **statement of changes in equity**?", "A columnar statement showing opening balance, each movement and closing balance for every component of equity.");
  b.card("FACT", "Columns of the statement", "Share capital, share premium, revaluation reserve, general reserve, retained earnings and a total column.");
  b.card("FORMULA", "Closing retained earnings", "Opening retained earnings + profit for the year - dividends - transfers to other reserves.");
  b.card("FACT", "Which events leave total equity unchanged?", "A transfer between reserves and a bonus issue.");
  b.card("FACT", "Issue of shares above par", "Share capital is credited with the nominal value and share premium with the excess over the nominal value.");
  b.card("DEFINITION", "What is a **bonus issue**?", "Free new shares to existing shareholders, paid up from reserves; no cash is received.");
  b.card("CONCEPT", "Capital reserves against revenue reserves", "Share premium and revaluation reserve cannot be distributed as dividends; the general reserve and retained earnings can.");
  b.card("FACT", "Where is a revaluation gain recorded?", "As other comprehensive income, credited to the revaluation reserve; it is not part of profit for the year.");
  b.card("CONCEPT", "Check the statement", "Closing totals of the columns must equal the equity in the statement of financial position.");
});
