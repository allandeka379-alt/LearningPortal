// W2b: bank reconciliation statements.
import { concept, P, money, sum, r2, check, CAM } from "../lib.mjs";
import { table, bankRec } from "../tables/w2b-lib.mjs";

concept("acc.verification.bank-reconciliation", { file: "verification/bank-reconciliation", keyPrefix: "verification.bank-reconciliation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is an **unpresented cheque**?",
    options: [
      ["A cheque recorded in the cash book that has not yet been paid by the bank", "Correct: the supplier has not yet banked it."],
      ["A cheque received from a customer that has been dishonoured", "That is a dishonoured cheque."],
      ["A cheque paid into the bank that the bank has not yet credited", "That is an uncredited deposit."],
      ["A cheque the business has written but not yet recorded", "An unpresented cheque is already in the cash book."],
    ],
    answer: "A",
    explanation: "The business has sent the cheque and credited its cash book, but the bank has not yet paid it, so it is not on the statement.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Starting from the updated cash book balance, how are unpresented cheques treated in a bank reconciliation statement?",
    options: [
      ["They are added", "Correct: the bank has not yet paid them, so its balance is higher."],
      ["They are deducted", "Deducting moves away from the bank's figure."],
      ["They are entered in the cash book", "They are already in the cash book."],
      ["They are ignored until they appear on the statement", "They are the most common reason for a difference."],
    ],
    answer: "A",
    explanation: "The cash book has already deducted the cheques but the bank has not, so the bank balance is higher by their total: add them.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Starting from the updated cash book balance, how is an uncredited deposit treated?",
    options: [
      ["It is deducted", "Correct: the bank has not yet added it, so its balance is lower."],
      ["It is added", "The cash book already includes it; adding moves away from the bank figure."],
      ["It is debited in the cash book", "It is already debited in the cash book."],
      ["It is credited in the cash book", "That would cancel a genuine receipt."],
    ],
    answer: "A",
    explanation: "The cash book has the deposit; the bank statement does not yet. To reach the bank's balance, deduct it.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which item would appear in a bank reconciliation statement rather than in the updated cash book?",
    options: [
      ["A deposit made on the last day of the month that is not yet on the statement", "Correct: a timing difference."],
      ["Bank charges for the month that are shown only on the bank statement", "Charges are entered in the updated cash book."],
      ["A standing order for rent that is shown only on the bank statement", "Standing orders are entered in the updated cash book."],
      ["A credit transfer from a customer shown only on the bank statement", "Credit transfers are entered in the updated cash book."],
    ],
    answer: "A",
    explanation: "Items the business did not know about go in the updated cash book. Timing differences (uncredited deposits, unpresented cheques) and bank errors go in the reconciliation.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which is a reason for preparing a bank reconciliation statement?",
    options: [
      ["To check that the cash book balance is correct and to detect errors or fraud", "Correct: every difference must be explained."],
      ["To record the month's bank charges and interest in the ledger accounts", "Charges are recorded in the cash book, not the reconciliation."],
      ["To calculate the interest that the bank will charge on an overdraft", "The bank calculates interest."],
      ["To replace the cash book as the record of bank transactions for the month", "The reconciliation is not part of the double entry."],
    ],
    answer: "A",
    explanation: "Reconciliation proves the cash book, reveals errors by the business or the bank, helps detect fraud and shows old unpresented cheques.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Updated cash book balance US\\$1,625 (in funds); unpresented cheques US\\$730; uncredited deposit US\\$495. What balance does the bank statement show?",
    options: [
      ["US\\$1,860 in funds", "Correct: 1,625 + 730 − 495 = 1,860."],
      ["US\\$1,390 in funds", "This deducts the cheques and adds the deposit."],
      ["US\\$2,850 in funds", "This adds both items."],
      ["US\\$400 in funds", "This deducts both items."],
    ],
    answer: "A",
    hints: ["Add unpresented cheques; deduct uncredited deposits."],
    explanation: "From the cash book: add unpresented cheques, deduct uncredited deposits: 1,625 + 730 − 495 = 1,860.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Rudo's updated cash book shows an overdraft of US\\$870. A cheque of US\\$310 is unpresented. What does the bank statement show, if there are no other differences?",
    options: [
      ["An overdraft of US\\$560", "Correct: −870 + 310 = −560."],
      ["An overdraft of US\\$1,180", "This deducts the cheque from an overdraft."],
      ["US\\$560 in funds", "The result is still negative: an overdraft."],
      ["US\\$1,180 in funds", "The sign and the direction are both wrong."],
    ],
    answer: "A",
    hints: ["Treat the overdraft as a negative number."],
    explanation: "The bank has not yet paid the 310 cheque, so its overdraft is 310 smaller: −870 + 310 = −560, an overdraft of 560.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "The bank wrongly credited Sipho's account with US\\$250 belonging to another customer. How is this shown when reconciling from the updated cash book balance?",
    options: [
      ["Added, because the bank's balance is higher", "Correct: move towards the bank's figure."],
      ["Deducted, because the bank's balance is lower", "Wrongly crediting money makes the bank balance higher."],
      ["Debited in the cash book", "Bank errors are never entered in the cash book."],
      ["Ignored, because it is the bank's mistake", "It must be shown, or the statement will not reconcile."],
    ],
    answer: "A",
    hints: ["Does the error make the bank balance higher or lower?"],
    explanation: "The bank shows 250 more than it should. Starting from the cash book, add 250 to reach the statement balance, then ask the bank to correct it.",
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "A bank reconciliation statement is part of the double-entry system.",
    answer: false,
    explanation: "False. It is a statement prepared to explain a difference; nothing in it is posted to the ledger.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "When the reconciliation starts from the bank statement balance, unpresented cheques are deducted.",
    answer: true,
    explanation: "True. The bank will still pay them, reducing its balance to the cash book figure.",
  });

  b.match({
    d: 3, skill: "APPLICATION",
    stem: "Tendai reconciles **from the updated cash book balance**. Choose the treatment for each item.",
    pairs: ["Unpresented cheque to a supplier", "Deposit not yet credited by the bank", "Bank wrongly charged another customer's cheque to Tendai's account", "Bank wrongly credited another customer's deposit to Tendai's account"],
    right: ["Add", "Deduct"],
    rightIndex: [0, 1, 1, 0],
    hints: ["Move towards the bank's figure."],
    explanation: "Unpresented cheque: bank higher, add. Uncredited deposit: bank lower, deduct. Wrong charge: bank lower, deduct. Wrong credit: bank higher, add.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the definition.",
    template: "A bank reconciliation statement explains the difference between the balance in the {{blank:a}} cash book and the balance on the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["updated"], choices: ["updated", "original", "petty"] },
      { id: "b", accepted: ["bank statement"], choices: ["bank statement", "trial balance", "income statement"] },
    ],
    explanation: "The cash book is updated first; the reconciliation then explains the remaining timing differences and bank errors.",
  });

  // Numerical: find cash book balance from bank statement
  const cb = r2(4380 - 1265 - 640 + 915);
  check("cb", cb, 3390);
  b.num({
    d: 3, kind: "money", value: cb, calculator: true, wrong: [r2(4380 + 1265 + 640 - 915), r2(4380 - 1265 - 640 - 915)],
    stem: "Farai's bank statement at 30 June 2025 shows US\\$4,380 in funds. Cheques of US\\$1,265 and US\\$640 have not been presented and a deposit of US\\$915 has not been credited. Calculate the balance in his updated cash book.",
    hints: ["Starting from the bank statement, reverse the usual steps."],
    explanation: `From the bank statement: deduct unpresented cheques, add the uncredited deposit: 4,380 − 1,265 − 640 + 915 = ${money(cb)}. Using the cash book rules from this end gives ${money(r2(4380 + 1265 + 640 - 915))}.`,
  });
  const ov = r2(-1840 + 720 - 1365);
  check("ov", ov, -2485);
  b.calc({
    d: 4, kind: "money", value: Math.abs(ov), calculator: true, wrong: [r2(1840 + 720 - 1365), r2(1840 + 720 + 1365)],
    stem: "Nyasha's updated cash book shows a bank **overdraft** of US\\$1,840 at 30 September 2025. A cheque of US\\$720 to Kudzai Builders has not been presented. A deposit of US\\$1,365 has not yet been credited by the bank. Calculate the overdraft shown on the bank statement.",
    hints: ["Write the overdraft as a negative number.", "Add unpresented cheques; deduct uncredited deposits."],
    explanation: `−1,840 + 720 − 1,365 = −2,485, so the bank statement shows an overdraft of ${money(Math.abs(ov))}. Treating the overdraft as money in the bank gives ${money(r2(1840 + 720 - 1365))}.`,
    workedSolution: "1. Start: −1,840.\n2. Add the unpresented cheque: −1,840 + 720 = −1,120.\n3. Deduct the uncredited deposit: −1,120 − 1,365 = −2,485.\n4. The bank statement shows an overdraft of 2,485.",
  });

  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3, applies: CAM,
    stem: "Thandeka's customers now pay mostly by bank transfer and card, and she pays suppliers online. Explain **two** effects of these digital transactions on her bank reconciliation and **one** thing she must still do.",
    points: ["Fewer cheques, so fewer unpresented cheques / payments clear quickly", "More items appear first on the statement (transfers, card fees, direct debits), so more updating of the cash book / she can reconcile more often using online statements", "She must still check and match every item / investigate unmatched items or wrong references / watch for fraud"],
    modelAnswer: "With electronic payments there are fewer unpresented cheques because payments clear almost at once, and she can see her statement online every day and reconcile weekly. However, more items such as card fees and transfers reach the bank first, so she must update the cash book and still check that every item matches.",
    hints: ["Think about timing differences and how often she can see the statement."],
    explanation: "Digital banking reduces timing differences and speeds reconciliation, but human checking is still needed.",
  });

  // Practice structured 1: from cash book
  const rec1 = bankRec("Tatenda Gumbo: Bank reconciliation statement at 30 April 2025", { start: 2463, add: [["Cheque to Bindura Feeds", 587], ["Cheque to Mazowe Packaging", 1094]], less: [["Uncredited deposit", 1320], ["Bank error: cheque of another customer", 165]], statement: r2(2463 + 587 + 1094 - 1320 - 165) });
  const stmt1 = r2(2463 + 587 + 1094 - 1320 - 165);
  check("stmt1", stmt1, 2659);
  b.struct({
    d: 4, examStyle: true, skill: "APPLICATION", calculator: true,
    stem: "Tatenda Gumbo sells poultry feed in Bindura. His updated cash book showed US\\$2,463 in the bank at 30 April 2025. Comparing the cash book with the bank statement he found:\n\n" +
      table(["No.", "Item"], [["1", "Cheques not yet presented: Bindura Feeds US\\$587; Mazowe Packaging US\\$1,094"], ["2", "Takings of US\\$1,320 banked on 30 April were not on the statement"], ["3", "The bank had charged a cheque of US\\$165 drawn by another customer to Tatenda's account"]]),
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "money", value: r2(587 + 1094), wrong: [587], stem: "Calculate the total of the unpresented cheques.", explanation: "587 + 1,094 = 1,681." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: stmt1, wrong: [r2(2463 + 587 + 1094 - 1320 + 165), r2(2463 - 587 - 1094 + 1320 - 165)], stem: "Calculate the balance shown on the bank statement at 30 April 2025.", explanation: `2,463 + 1,681 − 1,320 − 165 = ${stmt1.toLocaleString("en-GB")}. The bank error is deducted because the bank took 165 out wrongly.` }),
      P.manual({ label: "(c)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare Tatenda's bank reconciliation statement at 30 April 2025, starting with the updated cash book balance.", points: ["Heading and starting balance 2,463 (updated cash book)", "Add unpresented cheques 587 and 1,094 (subtotal 1,681)", "Less uncredited deposit 1,320 and bank error 165", `Balance as per bank statement ${stmt1.toLocaleString("en-GB")}`], modelAnswer: rec1.md, explanation: "Move from the cash book figure to the bank figure." }),
      P.mcq({
        label: "(d)", stem: "What should Tatenda do about item 3?",
        options: [["Ask the bank to correct its error; make no entry in the cash book", "Correct: the cash book is right."], ["Credit his cash book with US\\$165 so that it agrees with the bank", "That would make a correct cash book wrong."], ["Debit his cash book with US\\$165 and debit the other customer", "The cash book needs no change."], ["Treat the US\\$165 as bank charges in his income statement", "It is not a charge; it is the bank's mistake."]],
        answer: "A", explanation: "Bank errors are corrected by the bank.",
      }),
    ],
    hints: ["Add cheques not yet paid by the bank; deduct deposits not yet received."],
    explanation: "This item tests preparing a reconciliation with a bank error.",
  });

  // Practice structured 2: from bank statement with overdraft
  const rec2 = bankRec("Rudo Moyo: Bank reconciliation statement at 30 June 2025", { start: -965, add: [["Uncredited deposit", 1480]], less: [["Unpresented cheque to Mbare Wholesalers", 2140]], statement: r2(-965 + 1480 - 2140), startLabel: "Balance as per bank statement", endLabel: "Balance as per updated cash book" });
  const cb2 = r2(-965 + 1480 - 2140);
  check("cb2", cb2, -1625);
  b.struct({
    d: 5, examStyle: true, skill: "ANALYSIS", calculator: true,
    stem: "Rudo Moyo's bank statement at 30 June 2025 showed an **overdraft** of US\\$965. Her cash book has already been updated. The only differences are:\n\n" + table(["No.", "Item"], [["1", "A cheque of US\\$2,140 to Mbare Wholesalers has not been presented"], ["2", "A deposit of US\\$1,480 has not been credited by the bank"]]),
    parts: [
      P.mcq({
        label: "(a)", stem: "Starting from the bank statement, how is the unpresented cheque treated?",
        options: [["Deducted", "Correct: the bank will still pay it, reducing the balance."], ["Added", "That is the treatment when starting from the cash book."], ["Ignored", "It explains part of the difference."], ["Entered in the cash book", "It is already in the cash book."]],
        answer: "A", explanation: "From the bank end, reverse the cash-book rules.",
      }),
      P.num({ label: "(b)", marks: 3, kind: "money", value: Math.abs(cb2), wrong: [r2(965 + 2140 + 1480), r2(Math.abs(-965 - 1480 + 2140))], stem: "Calculate the overdraft in Rudo's updated cash book.", explanation: `−965 + 1,480 − 2,140 = ${cb2.toLocaleString("en-GB")}: an overdraft of ${Math.abs(cb2).toLocaleString("en-GB")}.` }),
      P.manual({ label: "(c)", marks: 3, type: "EXTENDED_RESPONSE", stem: "Prepare the bank reconciliation statement, starting with the balance as per bank statement.", points: ["Starts with overdraft (965) as per bank statement", "Add uncredited deposit 1,480; less unpresented cheque 2,140", `Balance as per updated cash book (${Math.abs(cb2).toLocaleString("en-GB")}) overdrawn`], modelAnswer: rec2.md, explanation: "Keep the overdraft in brackets." }),
      P.manual({ label: "(d)", marks: 2, stem: "State which overdraft figure appears in Rudo's statement of financial position, and give a reason.", points: [`The updated cash book figure, US\\$${Math.abs(cb2).toLocaleString("en-GB")}`, "Reason: it includes all transactions the business has made / the bank figure ignores cheques and deposits not yet processed"], modelAnswer: `The overdraft of US\\$${Math.abs(cb2).toLocaleString("en-GB")} from the updated cash book, because it records every transaction Rudo has made, including the cheque and deposit the bank has not yet processed.`, explanation: "The cash book is the business's complete record." }),
    ],
    hints: ["From the bank statement: add uncredited deposits, deduct unpresented cheques."],
    explanation: "This item tests reconciling from the bank statement with an overdraft.",
  });

  b.card("DEFINITION", "Bank reconciliation statement", "A statement explaining the difference between the updated cash book balance and the bank statement balance at a date.");
  b.card("DEFINITION", "Unpresented cheque", "A cheque in the cash book that the bank has not yet paid.");
  b.card("DEFINITION", "Uncredited deposit", "Money paid in and recorded in the cash book but not yet credited by the bank (outstanding deposit).");
  b.card("FACT", "Reconciling from the cash book balance", "Add unpresented cheques; deduct uncredited deposits; adjust bank errors towards the bank's figure.");
  b.card("FACT", "Reconciling from the bank statement balance", "Deduct unpresented cheques; add uncredited deposits; reverse bank errors.");
  b.card("CONCEPT", "Purposes of bank reconciliation", "Proves the cash book balance, detects errors by the business or bank, helps detect fraud, highlights old unpresented cheques.");
  b.card("FACT", "Bank errors", "Shown in the reconciliation only; never entered in the cash book. The bank is asked to correct them.");
  b.card("FACT", "Which bank figure goes in the statement of financial position?", "The updated cash book balance.");
  b.card("CONCEPT", "Effect of digital banking on reconciliation", "Fewer unpresented cheques, faster clearing, online statements allow frequent reconciling; more items reach the bank first and must still be checked.", undefined, { applies: CAM });
});
