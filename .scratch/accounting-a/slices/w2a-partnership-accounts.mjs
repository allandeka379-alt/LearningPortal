// W2a: partnership.accounts
import { concept, P, table, r2, fmt, money, chk, appropriation } from "../lib.mjs";
import { mc, approTable, colLedger } from "../tables/w2a-lib.mjs";

concept("aacc.partnership.accounts", { file: "partnership/accounts", keyPrefix: "partnership.accounts" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "A partner lends US\\$10,000 to the partnership at 8% interest a year. The interest of US\\$800 is:",
    ok: ["an expense in the statement of profit or loss", "Correct: a loan creates a creditor, so the interest is a cost of the business."],
    bad: [["an appropriation of profit", "Only interest on capital is an appropriation."], ["added to the partner's capital account", "Loan interest is an expense, not an addition to capital."], ["deducted from the partner's drawings", "Interest on drawings is a different item."]],
    explanation: "Interest on a partner's loan is an expense of the business; interest on capital is an appropriation.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In a partnership with fixed capital accounts, partners' drawings are debited to:",
    ok: ["the partner's current account", "Correct: capital accounts are kept at their fixed amounts."],
    bad: [["the partner's capital account", "That would make the capital account fluctuate."], ["the appropriation account", "Drawings are not an appropriation of profit."], ["the statement of profit or loss", "Drawings are not an expense of the business."]],
    explanation: "With fixed capital, salaries, interest, profit shares and drawings all go through the current account.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Interest on partners' capital is shown in the:",
    ok: ["appropriation account", "Correct: it is a division of profit between the partners."],
    bad: [["statement of financial position as a liability", "It is not a liability until credited to the partners' accounts, and then as part of their funds."], ["statement of profit or loss as an expense", "It is not a cost of running the business."], ["trading section as part of cost of sales", "It has nothing to do with the cost of goods sold."]],
    explanation: "Interest on capital, like salaries, is an appropriation of profit and is not deducted in arriving at profit for the year.",
  });
  const cap = 37500;
  const ic = r2(cap * 0.06);
  chk(ic, 2250);
  mc(b, {
    d: 2, skill: "APPLICATION", calculator: true,
    stem: `A partner's capital is ${money(cap)} and interest on capital is allowed at 6% a year. How much interest is credited for the full year?`,
    ok: [money(ic), "Correct: 6% × 37,500."],
    bad: [[money(r2(cap * 0.006)), "The percentage has been taken as 0.6%."], [money(r2(cap * 0.16)), "The rate has been misread as 16%."], [money(r2(cap + ic)), "Interest has been added to capital instead of being calculated alone."]],
    explanation: "Interest on capital = 37,500 × 6 ÷ 100 = 2,250.",
  });
  const prof = 28500;
  const sal = 3000;
  const intc = 2100;
  const resid = r2(prof - sal - intc);
  const share2 = r2((resid * 2) / 3);
  chk(share2, 15600);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A partnership has profit for the year of ${money(prof)}, a partner's salary of ${money(sal)} and total interest on capital of ${money(intc)}. The partners share the remainder 2 : 1. What is the larger partner's share of the remainder?`,
    ok: [money(share2), "Correct: residual 23,400 × 2/3."],
    bad: [[money(r2((prof * 2) / 3)), "The whole profit has been shared; salary and interest come first."], [money(r2(resid / 2)), "The remainder was shared equally instead of 2 : 1."], [money(r2((resid * 1) / 3)), "This is the smaller partner's share."]],
    hints: ["Deduct the salary and interest first."],
    explanation: "Residual = 28,500 - 3,000 - 2,100 = 23,400. Share = 23,400 × 2 ÷ 3 = 15,600.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "A partner's current account has a debit balance at the year end. This means the partner has:",
    ok: ["drawn more than his or her share of profit and any balance owed", "Correct: the partner is overdrawn and owes the firm that amount."],
    bad: [["invested more capital than agreed", "Capital is recorded in the capital account."], ["lent money to the partnership", "A loan is a separate liability account."], ["earned more profit than the other partners did in the year", "A credit balance would show profit exceeding drawings."]],
    hints: ["Which side shows what has been taken out?"],
    explanation: "A debit balance on the current account means drawings (and interest on drawings) exceeded the partner's credits.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Interest charged to partners on their drawings is entered in the appropriation account as:",
    ok: ["an addition to the profit available, with a debit to each partner's current account", "Correct: it is income to the partners as a group and a charge to the individual who drew."],
    bad: [["a deduction from profit, with a credit to each partner's current account", "That describes interest on capital."], ["an expense in the statement of profit or loss", "It is a division of profit, not a cost of the business."], ["a reduction in the partners' capital accounts under fixed capital", "Under fixed capital the capital account does not change."]],
    hints: ["Does the partner gain or lose from the interest?"],
    explanation: "Interest on drawings increases the profit to be divided and is charged to the partner who drew.",
  });
  const pr2 = 5100;
  const sl = 4000;
  const ics = 3000;
  const res2 = r2(pr2 - sl - ics);
  chk(res2, -1900);
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Two partners share profits and losses equally. Profit is US\\$5,100, the salary appropriated is US\\$4,000 and interest on capital is US\\$3,000. Which statement is correct?",
    ok: ["There is a residual loss of US\\$1,900, shared US\\$950 each", "Correct: 5,100 - 4,000 - 3,000 = -1,900."],
    bad: [["The business made a loss of US\\$1,900", "The business made a profit of 5,100; the loss arises only after the appropriations."], ["The salary and interest are not paid because there is not enough profit", "The agreement applies in full unless it says otherwise."], ["The partners share US\\$5,100 equally", "Salary and interest are allocated before the sharing."]],
    hints: ["The residual is negative."],
    explanation: "Appropriations exceed the profit by 1,900. The residual deficit is shared equally, 950 each.",
  });

  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Partners' salaries are charged in the statement of profit or loss as an expense of the business.", answer: false, explanation: "False. A partner's salary is an appropriation of profit, shown in the appropriation account." });
  b.tf({ d: 3, skill: "UNDERSTANDING", stem: "If capital accounts fluctuate, no separate current accounts are kept.", answer: true, hints: ["Where do the profit shares and drawings go?"], explanation: "True. All entries go through the capital accounts." });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each item to where it is recorded in a partnership with fixed capital accounts.",
    pairs: ["Partner's salary", "Interest on a partner's loan", "Interest charged on drawings", "Partner's drawings"],
    right: ["Appropriation account; credit to the current account", "Statement of profit or loss as an expense", "Appropriation account; debit to the current account", "Debit to the current account"],
    rightIndex: [0, 1, 2, 3],
    explanation: "Salary and interest on capital are credited to current accounts; interest on drawings and drawings are debited; loan interest is an expense.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentence about current accounts.",
    template: "Salary and interest on capital are {{blank:a}} to the current account, while drawings are {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["credited"], choices: ["credited", "debited"] },
      { id: "b", accepted: ["debited"], choices: ["credited", "debited"] },
    ],
    explanation: "A partner's earnings are credited; amounts taken out are debited.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What type of capital account is used when profit shares, salaries and drawings are all recorded in the capital account itself?",
    accepted: ["fluctuating capital", "fluctuating", "fluctuating capital account"],
    explanation: "Under fluctuating capital there are no current accounts.",
  });

  // numerical
  const A = approTable({ biz: "x", when: "x", profit: 52360, partners: [
    { name: "P", salary: 8000, capital: 31500, interestOnCapitalPct: 5, share: 3 },
    { name: "Q", salary: 0, capital: 18500, interestOnCapitalPct: 5, share: 2 },
  ] });
  chk(A.residual, 41860, 0.001);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: A.residual, calculator: true, wrong: [r2(52360 - 8000), r2(52360 - 2500)],
    stem: `Profit for the year is ${money(52360)}. Partner P receives a salary of ${money(8000)}. Interest on capital is 5% a year on capitals of ${money(31500)} (P) and ${money(18500)} (Q). Calculate the residual profit to be shared.`,
    hints: ["Interest on capital is 5% of each capital."],
    explanation: "Interest: 5% × 31,500 = 1,575 and 5% × 18,500 = 925, total 2,500. Residual = 52,360 - 8,000 - 2,500 = 41,860.",
  });
  const sh = r2((A.residual * 3) / 5);
  void sh;
  const open = 1430;
  const sal2 = 4200;
  const ic2 = 1650;
  const res3 = 9630;
  const dr = 11200;
  const id = 380;
  const closeCur = r2(open + sal2 + ic2 + res3 - dr - id);
  chk(closeCur, 5330, 0.001);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: closeCur, calculator: true, wrong: [r2(open + sal2 + ic2 + res3 - dr), r2(open + sal2 + ic2 + res3 + dr + id)],
    stem: `A partner's current account had a credit balance of ${money(open)} at 1 January. During the year the partner was credited with a salary of ${money(sal2)}, interest on capital ${money(ic2)} and a share of the residual profit of ${money(res3)}. Drawings were ${money(dr)} and interest charged on drawings was ${money(id)}. Calculate the closing balance of the current account (credit).`,
    hints: ["Credits increase the balance; drawings and interest on drawings reduce it."],
    explanation: `1,430 + 4,200 + 1,650 + 9,630 - 11,200 - 380 = ${fmt(closeCur)}. Leaving out the interest on drawings gives ${fmt(r2(open + sal2 + ic2 + res3 - dr))}.`,
  });
  const targetTotal = 9000;
  const icR = 1350;
  const resNeeded = r2(((targetTotal - icR) * 5) / 2);
  const profNeeded = r2(resNeeded + 4500 + 1800 + 1350);
  chk(profNeeded, 26775);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: profNeeded, calculator: true, wrong: [r2((targetTotal * 5) / 2 + 4500 + 1800 + 1350), r2(resNeeded)],
    stem: `Tafara and Rudo share the residual profit 3 : 2. Tafara has a salary of ${money(4500)} and interest on capital is ${money(1800)} for Tafara and ${money(1350)} for Rudo (there is no interest on drawings). What profit for the year would give Rudo a total appropriation of exactly ${money(targetTotal)}?`,
    hints: ["Rudo's total = interest + 2/5 of the residual.", "Then add back the salary and interest to find the profit."],
    explanation: "Rudo needs 9,000 - 1,350 = 7,650 from the residual, which is 2/5 of it, so the residual is 19,125. Profit = 19,125 + 4,500 + 1,800 + 1,350 = 26,775.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why interest on capital is allowed in a partnership agreement.",
    points: ["A partner who invests more capital takes more risk and gives up the use of the money", "Interest rewards the extra capital before the remaining profit is shared in the ratio"],
    modelAnswer: "A partner with more capital invested gives up the use of that money and carries more risk. Interest on capital rewards this before the rest of the profit is shared.",
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain the difference between a partner's capital account and current account when capital is fixed.",
    points: ["The capital account records the agreed investment and does not change unless the partners agree", "The current account records salary, interest, share of profit and drawings", "A debit balance on the current account shows the partner has overdrawn"],
    modelAnswer: "The capital account shows the fixed investment. The current account is updated each year for salary, interest, profit share and drawings. A debit balance means the partner has taken out more than has been earned.",
    hints: ["Which account changes each year?"],
    explanation: "One mark for each of the three distinctions.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Nyasha works full time in the partnership while Farai, a sleeping partner, has invested more capital. Evaluate whether a salary for Nyasha and interest on capital for Farai is fair.",
    points: ["A salary rewards Nyasha's time and effort that the ratio alone would not", "Interest on capital rewards Farai for his larger investment and risk", "Together they can balance the contributions, but the amounts must be agreed and reasonable", "Judgement: fair if both are set at levels reflecting real contributions; if not, one partner may subsidise the other"],
    modelAnswer: "A salary compensates Nyasha for her time, and interest on capital compensates Farai for his larger investment. Together they reflect different contributions, so they are fair if set at reasonable levels. If either is too high the other partner will effectively subsidise it.",
    hints: ["What does each partner contribute?"],
    explanation: "One mark for each reasoned point and a supported judgement.",
  });

  // Structured 1 (10 marks)
  const partners1 = [
    { name: "Sipho", salary: 5200, capital: 36400, interestOnCapitalPct: 5, drawings: 8650, interestOnDrawingsPct: 4, share: 2 },
    { name: "Thandeka", salary: 0, capital: 21600, interestOnCapitalPct: 5, drawings: 7150, interestOnDrawingsPct: 4, share: 1 },
  ];
  let profit1 = 0;
  for (let p = 40010; p < 40100; p += 1) {
    const c = appropriation({ profit: p, partners: partners1 });
    if (Number.isInteger(c.residual) && c.residual % 3 === 0) { profit1 = p; break; }
  }
  const A1 = approTable({ biz: "x", when: "x", profit: profit1, partners: partners1 });
  const L1 = A1.calc.lines;
  const open1 = [1760, -415];
  const close1 = [r2(open1[0] + L1[0].total - 8650), r2(open1[1] + L1[1].total - 7150)];
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Sipho and Thandeka are partners in a transport business in Bulawayo. Their agreement provides for a salary of ${money(5200)} for Sipho, interest on capital at 5% a year, interest charged on drawings at 4% of drawings, and residual profit shared 2 : 1. Capitals are fixed at ${money(36400)} (Sipho) and ${money(21600)} (Thandeka). Drawings for 2025 were ${money(8650)} (Sipho) and ${money(7150)} (Thandeka). Profit for the year ended 31 December 2025 was ${money(profit1)}. Current accounts at 1 January 2025 were Sipho ${money(1760)} credit and Thandeka ${money(415)} debit.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: r2(L1[0].interestOnCapital + L1[1].interestOnCapital), wrong: [r2(L1[0].interestOnCapital)], stem: "Calculate the total interest on capital.", explanation: `5% × 36,400 = ${fmt(L1[0].interestOnCapital)} and 5% × 21,600 = ${fmt(L1[1].interestOnCapital)}.` }),
      P.num({ label: "(b)", marks: 3, kind: "money", value: A1.residual, wrong: [r2(A1.residual - L1[0].interestOnDrawings - L1[1].interestOnDrawings), r2(profit1 - 5200)], stem: "Calculate the residual profit to be shared.", explanation: `Profit ${fmt(profit1)} + interest on drawings (${fmt(L1[0].interestOnDrawings)} + ${fmt(L1[1].interestOnDrawings)}) - salary 5,200 - interest on capital = ${fmt(A1.residual)}.` }),
      P.num({ label: "(c)", marks: 3, kind: "money", value: r2(L1[1].total), wrong: [L1[1].residualShare, r2(L1[1].residualShare + L1[1].interestOnDrawings)], stem: "Calculate the total profit appropriated to Thandeka (interest on capital plus share of residual, less interest on drawings).", explanation: `${fmt(L1[1].interestOnCapital)} + ${fmt(L1[1].residualShare)} - ${fmt(L1[1].interestOnDrawings)} = ${fmt(L1[1].total)}.` }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: close1[0], wrong: [r2(close1[0] + 8650)], stem: "Calculate the balance on Sipho's current account at 31 December 2025 (credit).", explanation: `${fmt(open1[0])} + ${fmt(L1[0].total)} - ${fmt(8650)} = ${fmt(close1[0])}.` }),
    ],
    hints: ["Interest on drawings is added to the profit available.", "Total appropriated = salary + interest on capital + residual share - interest on drawings."],
    explanation: "This item tests the appropriation account and the current accounts of a two-partner firm.",
  });

  // Structured 2 (16 marks): three partners
  const partners2 = [
    { name: "Nyasha", salary: 0, capital: 30000, interestOnCapitalPct: 5, drawings: 8200, interestOnDrawingsPct: 4, share: 3 },
    { name: "Farai", salary: 5500, capital: 20000, interestOnCapitalPct: 5, drawings: 9600, interestOnDrawingsPct: 4, share: 2 },
    { name: "Chipo", salary: 0, capital: 10000, interestOnCapitalPct: 5, drawings: 5400, interestOnDrawingsPct: 4, share: 1 },
  ];
  const profit2 = 51846;
  const A2 = approTable({ biz: "Nyasha, Farai and Chipo", when: "for the year ended 31 December 2025", profit: profit2, partners: partners2 });
  const L2 = A2.calc.lines;
  const open2 = [1960, -745, 2310];
  const close2 = partners2.map((p, i) => r2(open2[i] + L2[i].total - p.drawings));
  const intDr = r2(L2.reduce((s, l) => s + l.interestOnDrawings, 0));
  chk(intDr, 928);
  chk(A2.residual, 44274);
  b.struct({
    d: 5, skill: "ANALYSIS", calculator: true,
    stem: `Nyasha, Farai and Chipo run a hardware store in Gweru. They share residual profits and losses 3 : 2 : 1. Capital accounts are fixed at ${money(30000)}, ${money(20000)} and ${money(10000)}. Farai is entitled to a salary of ${money(5500)}. Interest on capital is 5% a year and interest on drawings is 4% of drawings. Drawings for 2025 were ${money(8200)} (Nyasha), ${money(9600)} (Farai) and ${money(5400)} (Chipo). Profit for the year ended 31 December 2025 was ${money(profit2)}. Current accounts at 1 January 2025: Nyasha ${money(1960)} credit, Farai ${money(745)} debit and Chipo ${money(2310)} credit.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: intDr, wrong: [r2(A2.residual)], stem: "Calculate the total interest charged on drawings.", explanation: "4% × (8,200 + 9,600 + 5,400) = 4% × 23,200 = 928." }),
      P.num({ label: "(b)", marks: 3, kind: "money", value: A2.residual, wrong: [r2(A2.residual - 2 * intDr), r2(profit2 - 5500 - 3500)], stem: "Calculate the residual profit to be shared.", explanation: `Interest on capital: 1,500 + 1,000 + 500 = 3,000. Residual = 51,846 + 928 - 5,500 - 3,000 = ${fmt(A2.residual)}.` }),
      P.num({ label: "(c)", marks: 3, kind: "money", value: L2[1].total, wrong: [L2[1].residualShare, r2(L2[1].total + 2 * L2[1].interestOnDrawings)], stem: "Calculate the total profit appropriated to Farai.", explanation: `Salary 5,500 + interest 1,000 + share ${fmt(L2[1].residualShare)} - interest on drawings ${fmt(L2[1].interestOnDrawings)} = ${fmt(L2[1].total)}.` }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: close2[2], wrong: [r2(close2[2] + 5400)], stem: "Calculate the balance on Chipo's current account at 31 December 2025 (credit).", explanation: `${fmt(open2[2])} + ${fmt(L2[2].total)} - 5,400 = ${fmt(close2[2])}.` }),
      P.manual({ label: "(e)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare the appropriation account for the year ended 31 December 2025.", points: ["Heading and profit for the year with interest on drawings added", "Salary and interest on capital deducted for each partner", `Residual profit ${fmt(A2.residual)}`, "Residual shared 3 : 2 : 1 with totals agreeing"], modelAnswer: A2.md, explanation: "One mark per point; allow follow-through." }),
      P.manual({ label: "(f)", marks: 2, stem: "Farai's drawings exceed those of Chipo. Comment on whether his current account suggests he is taking too much from the business.", points: [`Farai's current account moved from a debit of 745 to ${close2[1] >= 0 ? "a credit of " : "a debit of "}${fmt(Math.abs(close2[1]))}, so he earned more than he drew in 2025`, "Drawings of 9,600 are covered by his appropriation, so the level is sustainable at present, but he should avoid drawing more than his share"], modelAnswer: `Farai earned ${fmt(L2[1].total)} and drew 9,600, so his account improved to ${fmt(close2[1])}. His drawings are sustainable at this level.`, explanation: "One mark for the figures and one for the judgement." }),
    ],
    hints: ["Add interest on drawings to the profit before deducting salary and interest on capital.", "Share the residual in the ratio 3 : 2 : 1."],
    explanation: "This item tests a three-partner appropriation account with interest on drawings and current accounts.",
  });
  const curCheck = colLedger("x", ["N", "F", "C"], [["Drawings", 8200, 9600, 5400]], [["b/d", 1960, 0, 2310], ["Appropriation", L2[0].total, L2[1].total, L2[2].total]]);
  void curCheck;

  b.card("DEFINITION", "What is an **appropriation account**?", "The account showing how the profit of a partnership is divided: salaries, interest on capital less interest on drawings, then the residual in the ratio.");
  b.card("FORMULA", "Appropriation account order", "Profit + interest on drawings - salaries - interest on capital = residual profit shared in the ratio.");
  b.card("FACT", "Fixed capital partnership", "Capital accounts stay constant; salaries, interest, profit shares and drawings go through current accounts.");
  b.card("FACT", "Fluctuating capital partnership", "No current accounts; all entries go through the capital accounts, so the balances change every year.");
  b.card("FACT", "Interest on partner's loan", "An expense of the business in the statement of profit or loss, not an appropriation.");
  b.card("FACT", "Debit balance on a current account", "The partner has overdrawn; it is deducted in the partners' funds.");
  b.card("CONCEPT", "Why allow interest on capital?", "To reward partners who invest more capital and bear more risk before the remainder is shared in the ratio.");
  b.card("CONCEPT", "Why allow a partner's salary?", "To reward a partner who works full time or contributes more effort than the ratio would reflect.");
  b.card("FACT", "Residual loss", "If salaries and interest exceed the profit, the deficit is shared in the profit-sharing ratio.");
});
