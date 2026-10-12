// W2b: club.subscriptions
import { concept, P, money, fmt, chk, r2, sum } from "../lib.mjs";
import { mc, U, subs } from "../tables/w2b-lib.mjs";

concept("aacc.club.subscriptions", { file: "club/subscriptions", keyPrefix: "club.subscriptions" }, (b) => {
  // --- MCQ
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What are subscriptions in arrears?",
    right: ["Subscriptions due for the year that members have not yet paid", "Correct: they are earned but not yet received."],
    wrong: [["Subscriptions that members have paid for a future year", "That describes subscriptions received in advance."], ["Subscriptions that the club has decided it will never collect", "Those are irrecoverable subscriptions."], ["Subscriptions paid by the club to a national association", "That is an expense of the club."]],
    explanation: "Arrears are subscriptions owing from members at the end of the period.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How are subscriptions received in advance shown in the club's statement of financial position?",
    right: ["As a current liability", "Correct: the club owes the members future membership."],
    wrong: [["As a current asset", "Arrears, not advances, are current assets."], ["As part of the accumulated fund", "They belong to the next period and are not yet income."], ["They are not shown", "All balances at the year end appear in the statement."]],
    explanation: "An advance is an amount owed to members for a future period, a current liability.",
  });
  const q3 = { rec: 5200, ao: 160, ac: 220, po: 90, pc: 130 };
  mc(b, {
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: `A club received subscriptions of ${money(q3.rec)}. Arrears were ${money(q3.ao)} at the start and ${money(q3.ac)} at the end; there were no advances. What is the subscriptions income?`,
    right: [money(q3.rec + q3.ac - q3.ao), "Correct: 5,200 + 220 − 160."],
    wrong: [[money(q3.rec + q3.ao - q3.ac), "Closing arrears are added; opening arrears are deducted."], [money(q3.rec), "Arrears must be adjusted for."], [money(q3.rec + q3.ao + q3.ac), "Opening arrears must be deducted."]],
    hints: ["Arrears at the end are earned but not received."],
    explanation: "Income = 5,200 + 220 − 160 = 5,260.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "A club writes off subscriptions of US\\$90 as irrecoverable. How is this treated?",
    right: ["It is an expense in the income and expenditure account", "Correct: the amount will never be received, so it is a loss."],
    wrong: [["It is deducted from the subscriptions income", "The income is found first; the loss is a separate expense."], ["It is added to the accumulated fund", "A loss reduces the fund; it never increases it."], ["It is ignored until the member leaves", "Once it is known to be irrecoverable it must be written off."]],
    hints: ["Is the amount a gain or a loss?"],
    explanation: "A write-off is charged as an expense; the arrears are reduced by the same amount.",
  });
  const q5 = { rec: 7340, wo: 80, ao: 260, ac: 310, po: 140, pc: 90 };
  const q5a = chk(q5.rec + q5.wo + q5.ac + q5.po - q5.ao - q5.pc, 7520);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A club received subscriptions of ${money(q5.rec)} and wrote off ${money(q5.wo)} of arrears. Arrears were ${money(q5.ao)} at the start and ${money(q5.ac)} at the end; subscriptions in advance were ${money(q5.po)} at the start and ${money(q5.pc)} at the end. What is the subscriptions income, found as the balancing figure of the subscriptions account?`,
    right: [money(q5a), "Correct: 7,340 + 80 + 310 + 140 − 260 − 90."],
    wrong: [[money(q5a - q5.wo - q5.wo), "The write-off has been deducted instead of added to the credit side."], [money(q5.rec + q5.ac - q5.ao), "The advances and write-off are missing."], [money(q5a + 2 * q5.pc), "The advance at the end is added instead of deducted."]],
    hints: ["Total the credit side and deduct the opening arrears and closing advance."],
    explanation: "Credit side: 140 + 7,340 + 80 + 310 = 7,870. Less debits 260 + 90 = 350. Income 7,520.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "A member pays this year's fee in the previous December. How is the amount treated this year?",
    right: ["It is an opening advance, so it adds to this year's income", "Correct: it was received last year but belongs to this year."],
    wrong: [["It is part of the arrears at the start, so it is deducted", "Arrears are amounts not yet received."], ["It is ignored because the cash was received last year", "It is income of this year."], ["It is an expense of this year and reduces the surplus", "Receipts are never expenses."]],
    hints: ["Which year does the payment belong to?"],
    explanation: "Opening advances are added when finding the income of the year to which they relate.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "The balance of the subscriptions account is transferred to the income and expenditure account. On which side of the subscriptions account does this balancing figure appear?",
    right: ["The debit side", "Correct: the income account is credited in the income and expenditure account, so subscriptions is debited."],
    wrong: [["The credit side", "The cash received is on the credit side."], ["It appears on both sides", "It is a single figure."], ["It does not appear in the account", "The account always shows the transfer."]],
    hints: ["Double entry: the other account is credited."],
    explanation: "The subscriptions account is debited and the income and expenditure account is credited with the income.",
  });
  const q8 = { members: 150, fee: 48, rec: 7100, ao: 250, ac: 300, po: 0, pc: 100, wo: 0 };
  const q8inc = chk(q8.members * q8.fee, 7200);
  const q8chk = chk(q8.rec + q8.ac - q8.ao - q8.pc, 7050);
  mc(b, {
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `A club has ${q8.members} members who each pay ${money(q8.fee)} a year. Cash received was ${money(q8.rec)}, arrears were ${money(q8.ao)} at the start and ${money(q8.ac)} at the end, and subscriptions received in advance were ${money(q8.pc)} at the end (none at the start). The treasurer expects the income to equal members × fee. What does the check show?`,
    right: [`The income (${money(q8chk)}) is ${money(q8inc - q8chk)} below members × fee, so a payment may be missing`, "Correct: the difference suggests an error or a member who has not been charged."],
    wrong: [["The income from the account equals members × fee, so the records are correct", "The two figures differ."], [`The income from the account is ${money(q8inc - q8chk)} above members × fee, so it is overstated`, "It is lower, not higher."], ["The check cannot be made because advances are received at the year end", "Advances are included in the calculation."]],
    hints: ["Calculate the income from the account and compare with 150 × 48."],
    explanation: "Income = 7,100 + 300 − 250 − 100 = 7,050. Members × fee = 7,200. The 150 difference needs investigating.",
  });

  // --- True / false
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Subscriptions in arrears at the end of the year are added to the cash received when finding the income of the year.",
    answer: true,
    explanation: "True. They are earned in the year but not yet received.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "Irrecoverable subscriptions written off are deducted from the subscriptions income.",
    answer: false,
    hints: ["Where does the loss go?"],
    explanation: "False. They are an expense; the income is found with the write-off on the credit side of the account.",
  });

  // --- Matching
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each subscription balance with its treatment at the year end.",
    pairs: [["Subscriptions in arrears", "Current asset"], ["Subscriptions received in advance", "Current liability"], ["Irrecoverable subscriptions", "Expense in the income and expenditure account"], ["Subscriptions income", "Balancing figure of the subscriptions account"]],
    explanation: "Each balance has a defined place in the statements.",
  });

  // --- Fill in the blank
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the statements about the subscriptions account.",
    template: "Arrears at the end of the year are {{blank:a}} to the cash received. Subscriptions received in advance at the end of the year are {{blank:b}}. The balancing figure is transferred to the income and {{blank:c}} account.",
    blanks: [
      { id: "a", accepted: ["added"], choices: ["added", "deducted"] },
      { id: "b", accepted: ["deducted"], choices: ["deducted", "added"] },
      { id: "c", accepted: ["expenditure"], choices: ["expenditure", "appropriation", "trading"] },
    ],
    explanation: "Arrears are added, advances deducted, and the income goes to the income and expenditure account.",
  });

  // --- Numerical / calculations
  const n1 = subs({ o: { arrears: 380, advance: 120 }, c: { arrears: 440, advance: 90 }, received: 9260 });
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", calculator: true,
    value: n1.income, wrong: [9260, r2(9260 + 380 - 440 + 120 - 90)],
    stem: `Opening arrears ${money(380)}, opening advance ${money(120)}, closing arrears ${money(440)} and closing advance ${money(90)}. Cash received was ${money(9260)}. Calculate the subscriptions income for the year.`,
    hints: ["Add the closing arrears and opening advance; deduct the opening arrears and closing advance."],
    explanation: "9,260 + 440 + 120 − 380 − 90 = 9,350.",
  });
  chk(n1.income, 9350);
  const n2 = { members: 85, fee: 120 };
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", daily: true, calculator: true,
    value: chk(n2.members * n2.fee, 10200), wrong: [n2.members + n2.fee, n2.fee],
    stem: `A club has ${n2.members} members who each pay ${money(n2.fee)} a year. Calculate the expected subscriptions income.`,
    explanation: "85 × 120 = 10,200.",
  });
  const n3 = { inc: 6480, wo: 60, ao: 220, ac: 300, po: 95, pc: 125 };
  const n3rec = chk(n3.inc - n3.wo - n3.ac - n3.po + n3.ao + n3.pc, 6370);
  b.calc({
    d: 4, skill: "APPLICATION", kind: "money", calculator: true,
    value: n3rec, wrong: [n3.inc, r2(n3.inc + n3.wo + n3.ac + n3.po - n3.ao - n3.pc)],
    stem: `The subscriptions income for the year is ${money(n3.inc)}. Arrears were ${money(n3.ao)} at the start and ${money(n3.ac)} at the end; advances were ${money(n3.po)} at the start and ${money(n3.pc)} at the end; ${money(n3.wo)} was written off. Calculate the cash received from members.`,
    hints: ["Rearrange: cash = income − write-off − closing arrears − opening advance + opening arrears + closing advance."],
    explanation: "6,480 − 60 − 300 − 95 + 220 + 125 = 6,370.",
  });
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", calculator: true,
    value: 4560, wrong: [4620, 4500],
    stem: "At the end of the year a club has 38 members who have not paid their annual fee of US\\$120. Calculate the subscriptions in arrears shown as a current asset.",
    hints: ["Number of members × fee."],
    explanation: "38 × 120 = 4,560.",
  });

  // --- Short answer
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the account of a club that finds the subscription income for the year by balancing.",
    accepted: ["subscriptions account", "subscriptions"],
    explanation: "The subscriptions account matches the cash received to the year.",
  });

  // --- Self-marked short answers
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why the cash received for subscriptions is not the same as the subscription income of the year.",
    points: ["Some members pay late (arrears) or early (advance), so cash and income fall in different years", "Income belongs to the year in which it is earned (the accruals concept)", "The subscriptions account adjusts the cash received for the opening and closing balances"],
    modelAnswer: "Some members pay late or early, so cash and income fall in different years. Income belongs to the year in which it is earned, so the cash received is adjusted for opening and closing arrears and advances in the subscriptions account.",
    hints: ["Think about members who pay late."],
    explanation: "One mark each for timing differences, the accruals concept and the adjustment.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "State and explain how subscriptions in arrears and subscriptions received in advance are classified in the statement of financial position.",
    points: ["Arrears are a current asset, because the club expects to receive the money soon", "Advances are a current liability, because the club owes members future membership", "Both are shown at the end of the year at the amounts in the subscriptions account"],
    modelAnswer: "Arrears are a current asset because the club expects to receive the cash soon. Advances are a current liability because the club owes members future membership.",
    hints: ["Who owes whom?"],
    explanation: "One mark each for the asset, the liability and the amounts.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "A club's subscriptions in arrears have risen from US\\$300 to US\\$1,200 over two years. Evaluate what this might mean and suggest an action.",
    points: ["More members are paying late, which may reduce cash for expenses", "Some of the arrears may become irrecoverable and have to be written off", "The club may have lost control of collection or members may be in difficulty", "Action: send reminders and set a deadline after which membership lapses"],
    modelAnswer: "The rise shows more members are paying late, so cash is lower and some arrears may be written off. The club should send reminders and set a deadline after which membership lapses.",
    hints: ["What risk do arrears carry?"],
    explanation: "A balanced answer states the risks and a suitable action.",
  });

  // --- Practice structured 1 (10 marks)
  const s1 = subs({ date0: "1 Jan 2025", date1: "31 Dec 2025", o: { arrears: 560, advance: 230 }, c: { arrears: 600, advance: 330 }, received: 15600, writeOff: 180, title: "Subscriptions account for the year ended 31 December 2025" });
  chk(s1.income, 15720); chk(262 * 60, 15720);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Harare Golf Club has 262 members who each pay an annual subscription of ${money(60)}. At 1 January 2025 subscriptions in arrears were ${money(560)} and subscriptions received in advance ${money(230)}. During 2025 the club received ${money(15600)} and wrote off ${money(180)} of arrears as irrecoverable. At 31 December 2025 arrears were ${money(600)} and subscriptions received in advance ${money(330)}.`,
    parts: [
      P.num({ label: "(a)", marks: 3, kind: "money", value: s1.income, wrong: [15600, 15600 + 600 - 560], stem: "Calculate the subscriptions income for the year.", explanation: "15,600 + 180 + 600 + 230 − 560 − 330 = 15,720." }),
      P.manual({ label: "(b)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare the subscriptions account for the year.", points: ["Debit: arrears b/d 560 and advance c/d 330", "Debit: income and expenditure account 15,720 (own figure)", "Credit: advance b/d 230, bank 15,600 and irrecoverable subscriptions 180", "Credit: arrears c/d 600, with totals of 16,610 on both sides"], modelAnswer: s1.md, explanation: "The income is the balancing figure on the debit side." }),
      P.mcq({ label: "(c)", marks: 1, stem: "Where is the balance of US\\$600 carried down shown in the statement of financial position at 31 December 2025?", options: [["Current assets", "Correct: arrears are owed to the club."], ["Current liabilities", "Arrears are not owed by the club."], ["Accumulated fund", "It is an asset, not part of the fund."], ["Non-current assets", "It will be received within a year."]], answer: "A", explanation: "Subscriptions in arrears are a current asset." }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: 262 * 60, wrong: [s1.income - 60], stem: "Use the number of members to check the income. Calculate members × annual fee.", explanation: "262 × 60 = 15,720, which agrees with the income from the account." }),
    ],
    hints: ["The write-off is on the credit side of the account.", "The income is a balancing figure."],
    explanation: "This item practises a full subscriptions account with a write-off.",
  });

  // --- Practice structured 2 (14 marks): working back to cash
  const s2 = { members: 200, fee: 48, ao: 480, po: 144, ac: 336, pc: 192, wo: 96 };
  const s2inc = chk(s2.members * s2.fee, 9600);
  const s2rec = chk(s2inc - s2.wo - s2.ac - s2.po + s2.ao + s2.pc, 9696);
  const s2s = subs({ date0: "1 Jul 2025", date1: "30 Jun 2026", o: { arrears: s2.ao, advance: s2.po }, c: { arrears: s2.ac, advance: s2.pc }, received: s2rec, writeOff: s2.wo, title: "Subscriptions account for the year ended 30 June 2026" });
  chk(s2s.income, 9600);
  b.struct({
    d: 5, skill: "ANALYSIS", calculator: true,
    stem: `Bulawayo Swimming Club had 200 members throughout the year ended 30 June 2026, each paying an annual fee of ${money(48)}. At 1 July 2025 subscriptions in arrears were ${money(s2.ao)} and subscriptions received in advance ${money(s2.po)}. At 30 June 2026 arrears were ${money(s2.ac)} and advances ${money(s2.pc)}. Arrears of ${money(s2.wo)} from members who had left were written off during the year. The treasurer lost the record of the cash received.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: s2inc, wrong: [200 + 48], stem: "Calculate the subscriptions income for the year.", explanation: "200 × 48 = 9,600." }),
      P.num({ label: "(b)", marks: 3, kind: "money", value: s2rec, wrong: [s2inc, r2(s2inc + s2.wo + s2.ac + s2.po - s2.ao - s2.pc)], stem: "Calculate the cash received from members during the year.", explanation: "Income 9,600 = cash + 96 + 336 + 144 − 480 − 192, so cash = 9,600 − 96 − 336 − 144 + 480 + 192 = 9,696." }),
      P.manual({ label: "(c)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Prepare the subscriptions account for the year.", points: ["Debit side: arrears b/d 480 and advance c/d 192", "Credit side: advance b/d 144 and bank 9,696 (own figure)", "Irrecoverable subscriptions written off 96", "Arrears c/d 336", "Income and expenditure account 9,600 as the balancing figure, totals agreeing at 10,272"], modelAnswer: s2s.md, explanation: "Both sides total 10,272." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain how the write-off of US\\$96 is shown in the income and expenditure account.", points: ["It is an expense (irrecoverable subscriptions)", "It is not deducted from the subscriptions income of 9,600"], modelAnswer: "The US\\$96 is an expense in the income and expenditure account. It is not deducted from the subscriptions income of US\\$9,600.", explanation: "One mark each." }),
      P.manual({ label: "(e)", marks: 2, stem: "Suggest one reason for, and one effect of, the club having both arrears and advances at the year end.", points: ["Some members pay late and others pay early because there is no strict payment deadline", "Cash received differs from income, so the treasurer must adjust to avoid misstating the surplus"], modelAnswer: "Some members pay late and some early because there is no strict deadline. The cash received therefore differs from income, so the treasurer must adjust for arrears and advances to avoid misstating the surplus.", explanation: "One mark for the reason and one for the effect." }),
    ],
    hints: ["Work backwards from the income to the cash.", "Check that both sides of the account agree."],
    explanation: "This item practises working back from the income to the cash received and preparing the account.",
  });

  // --- Flashcards
  b.card("DEFINITION", "Subscriptions in arrears", "Subscriptions due that members have not yet paid; a current asset.");
  b.card("DEFINITION", "Subscriptions received in advance", "Subscriptions paid for a later period; a current liability.");
  b.card("FORMULA", "Subscriptions income", "Cash received + write-offs + closing arrears + opening advance − opening arrears − closing advance.");
  b.card("FACT", "Subscriptions account balancing figure", "Income, on the debit side, transferred to the income and expenditure account.");
  b.card("FACT", "Irrecoverable subscription", "Written off from the arrears; charged as an expense, not deducted from income.");
  b.card("CONCEPT", "Check on subscription income", "If the fee is constant: members × fee should equal the income from the account.");
  b.card("CONCEPT", "Matching", "Income belongs to the year in which it is earned, not the year in which the cash is received.");
  b.card("FACT", "Arrears at the start", "Deducted: the income was recorded in the previous year.");
  b.card("FACT", "Advance at the start", "Added: received last year but earned this year.");
});
