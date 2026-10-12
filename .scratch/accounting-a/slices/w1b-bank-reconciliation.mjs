// W1b: verification.bank-reconciliation
import { concept, P, money, fmt, check, chk, r2, sum, rd, table, statement, tAccount } from "../lib.mjs";
import { mc, U } from "../tables/w1b-lib.mjs";

concept("aacc.verification.bank-reconciliation", { file: "verification/bank-reconciliation", keyPrefix: "verification.bank-reconciliation" }, (b) => {
  // --- MCQ
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What is an unpresented cheque?",
    right: ["A cheque written by the business that the bank has not yet paid", "Correct: it is in the cash book but not yet on the bank statement."],
    wrong: [["A cheque received from a customer that the bank has refused to pay", "That is a dishonoured cheque."], ["A deposit that the bank has not yet credited", "That is an outstanding lodgement."], ["A cheque written by a customer and not yet received", "It is not the business's own cheque."]],
    explanation: "An unpresented cheque has been recorded in the cash book but has not yet reached the bank.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which item on the bank statement requires an entry in the cash book?",
    right: ["Bank charges", "Correct: the business has not recorded them."],
    wrong: [["An unpresented cheque", "It is already in the cash book."], ["An outstanding lodgement", "It is already in the cash book."], ["A cheque written by the business last month and paid this month", "The cash book recorded it when it was written."]],
    explanation: "Bank charges, interest, direct debits, standing orders, direct credits and dishonoured cheques update the cash book.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A customer's cheque is returned by the bank as dishonoured. What entry is made in the business's books?",
    right: ["Debit trade receivables; credit bank", "Correct: the customer owes the money again."],
    wrong: [["Debit bank; credit trade receivables", "This would repeat the original receipt."], ["Debit bad debts; credit bank", "It is not an irrecoverable debt until the customer fails to pay."], ["Debit sales; credit bank", "The sale remains valid; only the payment has failed."]],
    explanation: "The receipt is reversed: credit bank and debit the customer's account.",
  });
  const m4 = { stmt: 8420, unp: 1130, lodg: 760 };
  const m4v = chk(m4.stmt + m4.lodg - m4.unp, 8050);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `The bank statement shows a balance of ${money(m4.stmt)} in favour of the business. There are unpresented cheques of ${money(m4.unp)} and an outstanding lodgement of ${money(m4.lodg)}. What is the balance in the updated cash book?`,
    right: [money(m4v), "Correct: 8,420 + 760 − 1,130."],
    wrong: [[money(m4.stmt - m4.lodg + m4.unp), "The adjustments are reversed."], [money(m4.stmt + m4.lodg + m4.unp), "Unpresented cheques must be deducted."], [money(m4.stmt - m4.lodg - m4.unp), "The lodgement must be added."]],
    hints: ["Add lodgements not yet credited; deduct cheques not yet paid."],
    explanation: "Statement balance + outstanding lodgement − unpresented cheques = updated cash book balance.",
  });
  const m5 = { od: 3000, unp: 900 };
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: `The bank statement shows an overdraft of ${money(m5.od)}. There are unpresented cheques of ${money(m5.unp)} and no other differences. What is the overdraft in the cash book?`,
    right: [money(m5.od + m5.unp), "Correct: the cheques will increase the overdraft when presented."],
    wrong: [[money(m5.od - m5.unp), "Unpresented cheques increase, not reduce, the overdraft."], [money(m5.unp), "The overdraft on the statement must be included."], [money(m5.od), "The unpresented cheques change the cash book balance."]],
    hints: ["Will the bank balance get worse or better when the cheques are presented?"],
    explanation: "The cash book already includes the cheques, so it is more overdrawn: 3,000 + 900 = 3,900.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "The bank statement balance is US\\$315 higher than the cash book balance. Which item could explain this difference?",
    right: ["A direct credit of US\\$315 not yet entered in the cash book", "Correct: the bank has added money the cash book does not show."],
    wrong: [["Bank charges of US\\$315 not yet entered in the cash book", "Charges reduce the statement balance below the cash book."], ["A dishonoured cheque of US\\$315 not yet entered in the cash book", "That reduces the statement balance."], ["A direct debit of US\\$315 not yet entered in the cash book", "That reduces the statement balance."]],
    hints: ["Which items increase the bank's balance without being in the cash book?"],
    explanation: "Direct credits and interest received increase the bank balance; charges, direct debits and dishonoured cheques reduce it.",
  });
  mc(b, {
    d: 4, skill: "UNDERSTANDING",
    stem: "Which item appears in the bank reconciliation statement but needs **no entry** in the cash book?",
    right: ["An outstanding lodgement", "Correct: it is already in the cash book and only a timing difference."],
    wrong: [["A standing order paid by the bank", "It must be entered in the cash book."], ["Interest charged by the bank", "It must be entered in the cash book."], ["An error in recording a cheque in the cash book", "The error is corrected in the cash book."]],
    hints: ["Which items are timing differences?"],
    explanation: "Timing differences (outstanding lodgements and unpresented cheques) appear only in the reconciliation.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "What bank figure is shown in the statement of financial position after a bank reconciliation?",
    right: ["The balance in the updated cash book", "Correct."],
    wrong: [["The balance on the bank statement", "It does not include unpresented cheques or outstanding lodgements."], ["The balance in the cash book before updating", "It does not include charges or direct debits."], ["The average of the two balances", "No averaging is done."]],
    hints: ["Which record includes all of the business's transactions?"],
    explanation: "The updated cash book includes all of the business's transactions and the items from the statement.",
  });

  // --- True / false
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "An unpresented cheque must be entered in the cash book when the bank statement is received.",
    answer: false,
    hints: ["Was the cheque recorded when it was written?"],
    explanation: "False. It is already in the cash book; it appears only in the reconciliation statement.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A bank reconciliation statement can start with either the bank statement balance or the cash book balance.",
    answer: true,
    explanation: "True. The reconciliation can start from either balance and arrive at the other, if the signs are correct.",
  });

  // --- Matching
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each item to the action required.",
    pairs: ["Bank charges", "Unpresented cheque", "Direct debit for insurance", "Outstanding lodgement", "Standing order received from a tenant"],
    right: ["Enter in the cash book", "Show only in the reconciliation statement"],
    rightIndex: [0, 1, 0, 1, 0],
    explanation: "Items first recorded by the bank must be entered in the cash book. Items already in the cash book are timing differences.",
  });

  // --- Fill in the blank
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements.",
    template: "A cheque recorded in the cash book that has not yet been paid by the bank is called an {{blank:a}} cheque. A deposit not yet credited by the bank is an {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["unpresented"], choices: ["unpresented", "dishonoured", "outstanding"] },
      { id: "b", accepted: ["outstanding lodgement"], choices: ["outstanding lodgement", "direct credit", "bank charge"] },
    ],
    explanation: "Both are timing differences between the cash book and the bank statement.",
  });

  // --- Numerical
  const n1 = { cb: 3740, charges: 65, dd: 180 };
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", 
    value: n1.cb - n1.charges - n1.dd, wrong: [n1.cb],
    stem: `Rudo's cash book shows a balance of ${money(n1.cb)}. The bank statement shows bank charges of ${money(n1.charges)} and a direct debit of ${money(n1.dd)}, neither recorded in the cash book. What is the updated cash book balance?`,
    explanation: "3,740 − 65 − 180 = 3,495.",
  });
  const n2 = { upd: 7260, unp: 1430, lodg: 880 };
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", calculator: true,
    value: chk(n2.upd - n2.lodg + n2.unp, 7810), wrong: [r2(n2.upd + n2.lodg - n2.unp)],
    stem: `Farai's updated cash book balance is ${money(n2.upd)}. Cheques of ${money(n2.unp)} have not been presented and a lodgement of ${money(n2.lodg)} has not yet been credited by the bank. What balance will the bank statement show?`,
    hints: ["Work backwards from the updated cash book to the statement."],
    explanation: "Statement balance = updated cash book − outstanding lodgement + unpresented cheques = 7,260 − 880 + 1,430 = 7,810.",
  });
  const n3 = { od: 1940, chq: 820, chqWrong: 280, interest: 95, dish: 360 };
  const n3v = chk(n3.od + (n3.chq - n3.chqWrong) + n3.interest + n3.dish, 2935);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", calculator: true,
    value: n3v, wrong: [r2(n3.od + n3.interest + n3.dish), r2(n3.od - (n3.chq - n3.chqWrong) + n3.interest + n3.dish)],
    stem: `Chipo's cash book shows an overdraft of ${money(n3.od)}. The following have not been dealt with: a cheque for ${money(n3.chq)} was entered in the cash book as ${money(n3.chqWrong)}; bank interest of ${money(n3.interest)} is not recorded; and a customer's cheque for ${money(n3.dish)} has been dishonoured. Calculate the overdraft in the updated cash book.`,
    hints: ["Which of the three items make the overdraft larger?"],
    explanation: "The cheque error increases the overdraft by 820 − 280 = 540; interest 95; dishonoured cheque 360. Overdraft = 1,940 + 540 + 95 + 360 = 2,935.",
  });
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", calculator: true,
    value: 246, wrong: [210, 74],
    stem: `When Sipho updates his cash book, he enters bank charges of ${money(74)}, a direct debit of ${money(210)} for insurance and interest received of ${money(38)}. By what amount does this reduce his profit for the year?`,
    hints: ["Charges and insurance are expenses; interest received is income."],
    explanation: "Expenses 74 + 210 = 284 less income 38 = 246 reduction in profit.",
  });

  // --- Short answer
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the statement prepared to explain the difference between the balance in the cash book and the balance on the bank statement.",
    accepted: ["bank reconciliation statement", "bank reconciliation", "reconciliation statement", "bank rec"],
    explanation: "A bank reconciliation statement explains the difference item by item.",
  });

  // --- Self-marked
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why the balance in the cash book may differ from the balance on the bank statement.",
    points: ["Timing differences, such as unpresented cheques or outstanding lodgements", "Explained: the business has recorded the item but the bank has not yet", "Items recorded by the bank first, such as bank charges, direct debits or interest", "Explained: the business has not yet entered these in the cash book"],
    modelAnswer: "Unpresented cheques and outstanding lodgements are in the cash book but not yet on the statement because the bank has not yet processed them. Bank charges and direct debits are on the statement but not in the cash book because the business does not know of them until it receives the statement.",
    hints: ["One timing difference, one item the bank records first."],
    explanation: "Give each reason and explain it.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why an unpresented cheque is not entered in the cash book when the bank statement arrives.",
    points: ["The cheque was recorded in the cash book on the date it was written", "The bank has not yet paid it, so it is not yet on the statement", "It is a timing difference and appears only in the reconciliation"],
    modelAnswer: "The cheque was already entered in the cash book when it was written. The bank has not paid it yet, so the difference is a timing difference shown only in the reconciliation statement.",
    hints: ["When does the business record a cheque it writes?"],
    explanation: "Timing differences need no cash book entry.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Evaluate the usefulness of preparing a bank reconciliation statement every month for a small shop.",
    points: ["Finds errors in the cash book and bank statement", "Helps to detect unauthorised payments or fraud early", "Takes time and the same error in both records is not found", "Justified conclusion, for example that it is worth doing monthly because cash is the asset most open to loss"],
    modelAnswer: "A monthly reconciliation finds errors and unauthorised payments early, which is important because cash is easily lost. It takes time, and an error made in both records would not be found. For a small shop the control is still worthwhile because the time taken is small.",
    hints: ["A benefit, a limitation and a conclusion."],
    explanation: "A balanced evaluation compares the value of the control with its cost.",
  });

  // --- Practice structured 1 (12 marks)
  const s1 = { cb: 12350, chg: 142, dd: 800, so: 1200, dish: 520, unp: 2790, lodg: 1350 };
  const s1upd = chk(s1.cb - s1.chg - s1.dd + s1.so - s1.dish, 12088);
  const s1stmt = chk(s1upd - s1.lodg + s1.unp, 13528);
  const s1cbMd = tAccount("Cash book (bank account) before and after updating",
    [["1 Dec", "Balance b/d", s1.cb], ["31 Dec", "Standing order received", s1.so]],
    [["31 Dec", "Bank charges", s1.chg], ["31 Dec", "Direct debit: loan repayment", s1.dd], ["31 Dec", "Dishonoured cheque", s1.dish]],
    { cdDate: "31 Dec", bdDate: "1 Jan" });
  const s1recMd = statement("Bank reconciliation statement at 31 December 2025", [
    ["Balance per bank statement", s1stmt],
    ["Add outstanding lodgement", s1.lodg],
    ["Less unpresented cheques", -s1.unp],
    ["Balance per updated cash book", s1upd],
  ], { cols: [U], checks: [["rec", s1stmt + s1.lodg - s1.unp, s1upd]] });
  b.struct({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: `Sipho runs a pharmacy in Chinhoyi. At 31 December 2025 his cash book shows a bank balance of ${money(s1.cb)}. The bank statement shows ${money(s1stmt)}. Comparison shows:\n\n- bank charges of ${money(s1.chg)} not in the cash book;\n- a direct debit of ${money(s1.dd)} for a loan repayment not in the cash book;\n- a standing order of ${money(s1.so)} from a customer, not in the cash book;\n- a customer's cheque of ${money(s1.dish)} dishonoured;\n- cheques written for ${money(s1.unp)} not yet presented;\n- a lodgement of ${money(s1.lodg)} not yet credited by the bank.`,
    parts: [
      P.manual({ label: "(a)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare the updated cash book (bank account).", points: ["Debit: balance b/d 12,350 and standing order 1,200", "Credit: bank charges 142 and direct debit 800", "Credit: dishonoured cheque 520", "Balance c/d 12,088 with totals agreeing"], modelAnswer: s1cbMd, explanation: "Only the items first recorded by the bank are entered." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: s1upd, wrong: [s1.cb], stem: "State the balance in the updated cash book.", explanation: "12,350 + 1,200 − 142 − 800 − 520 = 12,088." }),
      P.manual({ label: "(c)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare a bank reconciliation statement starting with the balance on the bank statement.", points: ["Starts with bank statement balance 13,528", "Adds outstanding lodgement 1,350", "Deducts unpresented cheques 2,790", "Ends with the updated cash book balance 12,088"], modelAnswer: s1recMd, explanation: "The statement ends with the updated balance." }),
      P.manual({ label: "(d)", marks: 2, stem: "State the bank figure to be shown in the statement of financial position and give a reason.", points: ["12,088 (the updated cash book balance)", "It includes all of the business's transactions, including cheques written and lodgements made"], modelAnswer: "The updated cash book balance of 12,088, because it includes all the business's own transactions, including unpresented cheques and outstanding lodgements.", explanation: "The statement of financial position uses the updated cash book." }),
    ],
    hints: ["Which items are not in the cash book?", "Start the reconciliation with the statement balance."],
    explanation: "This item practises updating a cash book and preparing a reconciliation statement.",
  });

  // --- Practice structured 2 (10 marks): overdraft and a bank error
  const s2 = { cbOd: 3820, chg: 130, dc: 600, stOd: 4120, bankErr: 250, unp: 1480, lodg: 2000 };
  const s2upd = chk(s2.cbOd + s2.chg - s2.dc, 3350);
  const s2recMd = statement("Bank reconciliation statement at 31 December 2025", [
    ["Balance per bank statement (overdrawn)", -s2.stOd],
    ["Add bank error: another customer's cheque debited to the account", s2.bankErr],
    ["Add outstanding lodgement", s2.lodg],
    ["Less unpresented cheques", -s2.unp],
    ["Balance per updated cash book (overdrawn)", -s2upd],
  ], { cols: [U], checks: [["rec", -s2.stOd + s2.bankErr + s2.lodg - s2.unp, -s2upd]] });
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: `Thandeka runs a poultry business in Gweru. At 31 December 2025 her cash book shows an overdraft of ${money(s2.cbOd)}. The bank statement shows an overdraft of ${money(s2.stOd)}. Comparison shows:\n\n- bank charges of ${money(s2.chg)} not in the cash book;\n- a direct credit of ${money(s2.dc)} from a customer, not in the cash book;\n- unpresented cheques of ${money(s2.unp)};\n- an outstanding lodgement of ${money(s2.lodg)};\n- the bank has wrongly debited her account with ${money(s2.bankErr)} for a cheque that belongs to another customer.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: s2upd, wrong: [s2.cbOd], stem: "Calculate the overdraft in the updated cash book.", explanation: "3,820 + 130 − 600 = 3,350 overdrawn." }),
      P.manual({ label: "(b)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare a bank reconciliation statement starting with the overdraft on the bank statement. Show overdrafts as negative figures.", points: ["Starts with (4,120) overdrawn", "Adds the bank error 250 and the outstanding lodgement 2,000", "Deducts unpresented cheques 1,480", "Ends with (3,350), the updated cash book balance"], modelAnswer: s2recMd, explanation: "The bank error is corrected on the reconciliation, not in the cash book." }),
      P.manual({ label: "(c)", marks: 2, stem: "State what Thandeka should do about the bank's error.", points: ["Tell the bank so that it corrects the statement", "Do not change the cash book, because the error is the bank's"], modelAnswer: "She should tell the bank so it can correct the statement, and she should not change her cash book because the error is the bank's.", explanation: "Errors by the bank are corrected by the bank." }),
      P.mcq({ label: "(d)", marks: 2, stem: "How is the bank balance shown in the statement of financial position?", options: [["As a current liability of US\\$3,350", "Correct: an overdraft is a current liability, at the updated balance."], ["As a current asset of US\\$3,350", "An overdraft is a liability."], ["As a current liability of US\\$4,120", "The statement balance has not been updated."], ["As a current liability of US\\$3,820", "The cash book balance before updating is not used."]], answer: "A", explanation: "An overdraft is a current liability, and the figure is the updated cash book balance." }),
    ],
    hints: ["An overdraft is a negative bank balance.", "Add items that make the statement more overdrawn than the cash book, and deduct the others."],
    explanation: "This item practises an overdrawn reconciliation with a bank error.",
  });

  // --- Flashcards
  b.card("DEFINITION", "Bank reconciliation statement", "A statement that explains the difference between the updated cash book balance and the bank statement balance.");
  b.card("DEFINITION", "Unpresented cheque", "A cheque written and recorded by the business that the bank has not yet paid.");
  b.card("DEFINITION", "Outstanding lodgement", "A deposit recorded in the cash book that the bank has not yet credited.");
  b.card("FACT", "Items that update the cash book", "Bank charges, interest, direct debits, standing orders, direct credits, dishonoured cheques, and cash book errors.");
  b.card("FACT", "Timing differences", "Unpresented cheques and outstanding lodgements: shown only in the reconciliation statement.");
  b.card("FORMULA", "Favourable balance reconciliation", "Statement balance + outstanding lodgements − unpresented cheques = updated cash book balance.");
  b.card("CONCEPT", "Dishonoured cheque entry", "Credit bank and debit the customer's account in trade receivables.");
  b.card("CONCEPT", "Bank balance in the statement of financial position", "The updated cash book balance, not the bank statement balance.");
  b.card("CONCEPT", "Limitations of bank reconciliation", "Does not find errors repeated in both records; takes time; bank errors still need to be reported.");
});
