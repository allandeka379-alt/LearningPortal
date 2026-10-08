// W2b: bank statements and updating the cash book.
import { concept, P, money, tAccount, balanceOf, sum, r2, check } from "../lib.mjs";
import { table } from "../tables/w2b-lib.mjs";

concept("acc.verification.updating-cash-book", { file: "verification/updating-cash-book", keyPrefix: "verification.updating-cash-book" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On a bank statement, a business that has money in its account has which kind of balance?",
    options: [
      ["A credit balance", "Correct: the bank owes the money to the business, a liability of the bank."],
      ["A debit balance", "A debit balance on the statement means an overdraft."],
      ["No balance until the year end", "A bank statement shows a running balance after every item."],
      ["The same side as in the cash book", "The statement is written from the bank's point of view, so the sides are opposite."],
    ],
    answer: "A",
    explanation: "To the bank, the customer's money is a liability, so it is a credit balance on the statement. In the business's cash book the same money is a debit balance (an asset).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which item on the bank statement is entered on the **debit** side of the updated cash book?",
    options: [
      ["A credit transfer received from a customer", "Correct: money has come into the bank account."],
      ["A standing order for the monthly shop rent", "A standing order is a payment: credit side."],
      ["Bank charges for the month's transactions", "Charges reduce the bank balance: credit side."],
      ["A cheque from a customer that was dishonoured", "The money has gone out again: credit side."],
    ],
    answer: "A",
    explanation: "Receipts go on the debit side of the cash book. A credit transfer is money paid directly into the account by a customer.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the difference between a standing order and a direct debit?",
    options: [
      ["A standing order pays a fixed amount set by the payer; a direct debit lets the supplier collect amounts that may vary", "Correct: the supplier controls the amount under a direct debit."],
      ["A standing order is money paid into the account; a direct debit is money paid out of the account to a supplier", "Both are payments out of the account."],
      ["A standing order is paid in cash at the bank counter; a direct debit is paid by a cheque that the supplier presents", "Both are automatic bank transfers."],
      ["A standing order is a fee the bank charges each month; a direct debit is the interest charged on an overdraft", "Both pay third parties, not the bank."],
    ],
    answer: "A",
    explanation: "Both are automatic payments made by the bank. A standing order is a fixed amount the business tells the bank to pay; a direct debit is collected by the supplier, often a varying bill.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A cheque for US\\$385 received from Gumbo was dishonoured. Which entries does the business make?",
    options: [
      ["Credit the bank column of the cash book; debit Gumbo's account", "Correct: the money has gone and Gumbo owes it again."],
      ["Debit the bank column of the cash book; credit Gumbo's account", "That records a second receipt from Gumbo."],
      ["Credit the bank column of the cash book; debit bank charges", "The 385 is still owed by Gumbo, not an expense."],
      ["No entry is needed until Gumbo pays", "The bank has already removed the money from the account."],
    ],
    answer: "A",
    explanation: "When the cheque was received, bank was debited and Gumbo credited. The dishonour reverses this: credit bank, debit Gumbo.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which item would **not** be entered when updating the cash book?",
    options: [
      ["A cheque paid to a supplier that has not yet reached the bank", "Correct: it is already in the cash book; it is a timing difference for the reconciliation."],
      ["Interest charged by the bank on an overdraft", "The business learns of this from the statement; it must be recorded."],
      ["A direct debit for the electricity bill collected by the supplier", "Not yet recorded in the cash book; it must be added."],
      ["Interest paid into the account by the bank at the end of the month", "Not yet recorded in the cash book; it must be added."],
    ],
    answer: "A",
    explanation: "An unpresented cheque is already in the cash book. It is shown in the bank reconciliation statement, not entered again.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A payment of US\\$1,325 was entered in the cash book as US\\$1,352. What entry is made in the updated cash book?",
    options: [
      ["Debit US\\$27", "Correct: too much was credited, so 27 is added back."],
      ["Credit US\\$27", "This would make the overstated payment even larger."],
      ["Debit US\\$1,352 and credit US\\$1,325", "Only the difference is needed."],
      ["Debit US\\$54", "Doubling is only for an entry on the wrong side."],
    ],
    answer: "A",
    hints: ["Was the payment recorded as too much or too little?"],
    explanation: "The cash book shows 1,352 paid but only 1,325 left the account. The 27 overstatement is corrected by a debit of 27.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A receipt of US\\$215 from a customer was entered on the **credit** side of the cash book. What is entered in the updated cash book?",
    options: [
      ["Debit US\\$430", "Correct: cancel the wrong credit and record the debit."],
      ["Debit US\\$215", "This only cancels the wrong entry; the receipt is still missing."],
      ["Credit US\\$430", "This doubles the error."],
      ["Credit US\\$215", "This records another payment."],
    ],
    answer: "A",
    hints: ["Two things must be fixed: the wrong payment and the missing receipt."],
    explanation: "The balance is wrong by twice the amount: $2 \\times 215 = 430$ on the debit side.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Rudo's updated cash book has a **credit** balance of US\\$640. How should this appear in her statement of financial position?",
    options: [
      ["As a current liability: bank overdraft US\\$640", "Correct: a credit balance in the cash book is an overdraft."],
      ["As a current asset: bank US\\$640", "A credit balance means the business owes the bank."],
      ["As a non-current liability: bank loan US\\$640", "An overdraft is repayable on demand: current."],
      ["It is not shown, because it is a bank error", "An updated cash book balance is the correct figure for the accounts."],
    ],
    answer: "A",
    hints: ["Which side of the cash book shows money in the bank?"],
    explanation: "In the cash book a debit balance is money in the bank (asset); a credit balance is an overdraft (current liability).",
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "Bank charges are entered on the credit side of the cash book when it is updated.",
    answer: true,
    explanation: "True. Charges reduce the money in the bank, so they are payments on the credit side.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "If the bank has wrongly charged another customer's cheque to the business's account, the business should credit its cash book with the amount.",
    answer: false,
    explanation: "False. This is a bank error; the cash book is correct. The error is shown in the bank reconciliation statement and the bank is asked to correct it.",
  });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Farai is updating his cash book. Choose the side of the cash book for each bank statement item.",
    pairs: ["Dividends paid directly into the account", "Standing order for rent", "Interest charged on the overdraft", "Credit transfer from a customer", "Direct debit for insurance", "Customer's cheque dishonoured"],
    right: ["Debit (receipts) side", "Credit (payments) side"],
    rightIndex: [0, 1, 1, 0, 1, 1],
    explanation: "Money in (dividends, credit transfers) on the debit side; money out (standing orders, interest charged, direct debits, dishonoured cheques) on the credit side.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "On the bank statement a deposit is shown as a {{blank:a}}. In the cash book the same deposit is a {{blank:b}}. A credit balance in the cash book means the business has a bank {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["credit"], choices: ["credit", "debit"] },
      { id: "b", accepted: ["debit"], choices: ["credit", "debit"] },
      { id: "c", accepted: ["overdraft"], choices: ["overdraft", "deposit", "loan"] },
    ],
    explanation: "The statement is written from the bank's point of view; the cash book from the business's.",
  });

  // Numerical: updated balance
  const nDr = [["", "Balance b/d", 3416], ["", "Credit transfer", 785], ["", "Interest received", 23]];
  const nCr = [["", "Bank charges", 46], ["", "Direct debit", 268], ["", "Standing order", 400]];
  const nb = balanceOf(nDr, nCr);
  check("nb", nb.amount, 3510);
  b.num({
    d: 2, kind: "money", value: nb.amount, calculator: true, wrong: [r2(3416 - 785 - 23 + 46 + 268 + 400), r2(3416 + 785 + 23)],
    stem: "Nyasha's cash book showed US\\$3,416 in the bank at 30 June 2025. The bank statement showed a credit transfer of US\\$785, interest received of US\\$23, bank charges of US\\$46, a direct debit of US\\$268 and a standing order of US\\$400, none of which were in the cash book. Calculate the updated cash book balance.",
    explanation: `3,416 + 785 + 23 − 46 − 268 − 400 = ${money(nb.amount)} (debit, money in the bank). Reversing the sides gives ${money(r2(3416 - 785 - 23 + 46 + 268 + 400))}.`,
  });
  const ovDr = [["", "Credit transfer", 1240]];
  const ovCr = [["", "Balance b/d", 2185], ["", "Bank charges", 63], ["", "Interest on overdraft", 118], ["", "Dishonoured cheque", 350]];
  const ov = balanceOf(ovDr, ovCr);
  check("ov", ov.amount, 1476);
  b.calc({
    d: 4, kind: "money", value: ov.amount, calculator: true, wrong: [r2(2185 + 1240 - 63 - 118 - 350), r2(2185 - 1240 - 63 - 118 - 350)],
    stem: "Sipho's cash book showed a bank **overdraft** of US\\$2,185 at 30 September 2025. The bank statement showed bank charges US\\$63, interest on the overdraft US\\$118, a dishonoured cheque of US\\$350 from Tembo and a credit transfer of US\\$1,240 from Zvobgo, none of them yet in the cash book. Calculate the size of the overdraft in the updated cash book.",
    hints: ["Start with the overdraft on the credit side.", "Which items increase the overdraft and which reduce it?"],
    explanation: `Overdraft 2,185 + charges 63 + interest 118 + dishonoured cheque 350 − credit transfer 1,240 = ${money(ov.amount)} overdrawn. Treating the opening overdraft as money in the bank gives ${money(r2(2185 + 1240 - 63 - 118 - 350))}.`,
    workedSolution: "1. Opening overdraft: credit side 2,185.\n2. Payments (credit side): charges 63, interest 118, dishonoured cheque 350.\n3. Receipt (debit side): credit transfer 1,240.\n4. Credit side total $2,185 + 63 + 118 + 350 = 2,716$; debit side 1,240.\n5. Overdraft $= 2,716 - 1,240 = 1,476$ (credit balance).",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain **two** reasons why a business should update its cash book from the bank statement before preparing its financial statements.",
    points: ["One reason: so the bank balance in the statement of financial position is correct", "A second reason: so expenses/income such as bank charges and interest are recorded and profit is correct / dishonoured cheques are charged back to customers / errors are corrected"],
    modelAnswer: "So that the bank figure in the statement of financial position is correct, and so that bank charges and interest are recorded as expenses, making the profit correct.",
    hints: ["Think about both financial statements."],
    explanation: "The updated cash book balance is the true balance known to the business at the year end.",
  });

  // Practice structured 1: prepare updated cash book
  const sDr = [["30 Apr", "Balance b/d", 1958], ["30 Apr", "Credit transfer: Chinhoyi Clinic", 1375], ["30 Apr", "Error: receipts undercast", 200]];
  const sCr = [["30 Apr", "Bank charges", 41], ["30 Apr", "Rent (standing order)", 650], ["30 Apr", "Water (direct debit)", 97], ["30 Apr", "Chirwa (dishonoured cheque)", 528], ["30 Apr", "Error: Ruzive cheque (734 − 743)", 9]];
  // error: a cheque of 743 paid was entered as 734 -> credit 9 more
  const s = balanceOf(sDr, sCr);
  check("s", s.amount, 2208);
  const sMd = tAccount("Cash book (bank columns) of Thandeka", sDr, sCr, { cdDate: "30 Apr", bdDate: "1 May" });
  b.struct({
    d: 4, examStyle: true, skill: "APPLICATION", calculator: true,
    stem: "Thandeka runs a pharmacy supplies business in Chinhoyi. Her cash book showed a debit balance of US\\$1,958 at 30 April 2025. Comparing it with the bank statement, she found:\n\n" +
      table(["No.", "Item"], [
        ["1", "Bank charges of US\\$41 had not been entered in the cash book"],
        ["2", "A standing order for rent of US\\$650 had not been entered"],
        ["3", "A direct debit for water of US\\$97 had not been entered"],
        ["4", "A cheque for US\\$528 from Chirwa had been dishonoured"],
        ["5", "A credit transfer of US\\$1,375 from Chinhoyi Clinic had not been entered"],
        ["6", "A cheque for US\\$743 paid to Ruzive had been entered in the cash book as US\\$734"],
        ["7", "The receipts side of the cash book had been undercast by US\\$200"],
        ["8", "A cheque for US\\$415 paid to Mhaka on 29 April had not yet been presented at the bank"],
      ]),
    parts: [
      P.mcq({
        label: "(a)", stem: "Which item is **not** entered in the updated cash book?",
        options: [["Item 8", "Correct: an unpresented cheque is a timing difference for the reconciliation."], ["Item 6", "A cash book error must be corrected in the cash book."], ["Item 4", "The dishonoured cheque must be credited."], ["Item 5", "The credit transfer must be debited."]],
        answer: "A", explanation: "The cheque to Mhaka is already in the cash book; it has simply not reached the bank yet.",
      }),
      P.num({ label: "(b)", marks: 1, kind: "money", value: 9, wrong: [18, 743], stem: "State the amount entered in the updated cash book for item 6.", explanation: "743 − 734 = 9, entered on the credit side because the payment was understated." }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: s.amount, wrong: [r2(s.amount - 415), r2(s.amount + 18)], stem: "Calculate the updated cash book balance at 30 April 2025.", explanation: `Debits: 1,958 + 1,375 + 200 = 3,533. Credits: 41 + 650 + 97 + 528 + 9 = 1,325. Balance = 3,533 − 1,325 = ${s.amount.toLocaleString("en-GB")} (debit). The unpresented cheque is not deducted.` }),
      P.manual({ label: "(d)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Prepare Thandeka's updated cash book (bank columns) and bring down the balance on 1 May 2025.", points: ["Balance b/d 1,958 on the debit side", "Credit transfer 1,375 and receipts undercast 200 on the debit side", "Bank charges 41, rent 650 and water 97 on the credit side", "Chirwa dishonoured cheque 528 and Ruzive error 9 on the credit side", `Balance c/d ${s.amount.toLocaleString("en-GB")}, equal totals, balance b/d on 1 May`], modelAnswer: sMd, explanation: "Only items the business did not know about and its own errors are entered." }),
      P.manual({ label: "(e)", marks: 1, stem: "State the entry Thandeka must make in Chirwa's account for item 4.", points: ["Debit Chirwa's account with US\\$528 (Chirwa owes the amount again)"], modelAnswer: "Debit Chirwa's account with 528.", explanation: "The dishonour reverses the original credit to the customer." }),
    ],
    hints: ["Receipts on the debit side, payments on the credit side.", "Leave the unpresented cheque for the reconciliation."],
    explanation: "This item tests preparing an updated cash book.",
  });

  // Practice structured 2: digital banking and statement reading
  b.struct({
    d: 3, examStyle: true, skill: "UNDERSTANDING",
    stem: "Chipo runs a tailoring business in Gweru. Most of her customers now pay by mobile money transfers and bank transfers into her business account, and her suppliers collect payments by direct debit. Her bank statement for June 2025 showed a closing **credit** balance of US\\$2,640.",
    parts: [
      P.mcq({
        label: "(a)", stem: "What does the closing credit balance of US\\$2,640 on the bank statement mean?",
        options: [["Chipo has US\\$2,640 in her bank account", "Correct: a credit on the statement is money the bank owes her."], ["Chipo owes the bank US\\$2,640", "That would be a debit balance on the statement."], ["Chipo has paid US\\$2,640 during June", "The balance is not a total of payments."], ["The bank has charged US\\$2,640 in fees", "A balance is not a charge."]],
        answer: "A", explanation: "Statements are written from the bank's point of view.",
      }),
      P.mcq({
        label: "(b)", stem: "Why are customers' transfers often missing from Chipo's cash book when the statement arrives?",
        options: [["The money reaches the bank before Chipo knows about it, so it appears first on the statement", "Correct: she learns of direct transfers from the statement or a bank notification."], ["Transfers are never recorded in a cash book, only on the bank statement", "They must be recorded on the debit side."], ["Transfers from customers are recorded in the sales journal instead of the cash book", "Receipts of money belong in the cash book."], ["The bank records customers' transfers as payments out of Chipo's account", "They are deposits on the statement."]],
        answer: "A", explanation: "Credit transfers are paid straight in; the business must update its cash book from the statement.",
      }),
      P.manual({ label: "(c)", marks: 4, stem: "Explain **two** ways in which online banking and digital payments can make it easier for Chipo to keep her cash book up to date, and **one** risk she must manage.", points: ["Ease 1: she can view the statement / transactions online at any time, not just at month end", "Ease 2: transfers carry references / can be downloaded or imported into accounting software, reducing errors", "Risk identified, e.g. unauthorised direct debits, fraud or wrong references", "Way to manage the risk, e.g. check the statement frequently / reconcile weekly / secure passwords"], modelAnswer: "She can check her account online every day, so new transfers and direct debits are entered promptly; and transactions can be downloaded with customer references, reducing copying errors. A risk is that a supplier collects a wrong amount by direct debit or fraud occurs; she should check the online statement regularly and reconcile weekly.", explanation: "Digital banking speeds up updating but needs regular checking." }),
    ],
    hints: ["Think about who records the transaction first: Chipo or the bank?"],
    explanation: "This item tests reading a bank statement and the effect of digital banking on updating the cash book.",
  });

  b.card("DEFINITION", "Bank statement", "The bank's copy of the business's account: deposits are credits, withdrawals debits; money in the account is a credit balance.");
  b.card("DEFINITION", "Standing order", "An instruction to the bank to pay a fixed amount to someone at regular intervals.");
  b.card("DEFINITION", "Direct debit", "An authority for a supplier to collect amounts (which may vary) from the business's bank account.");
  b.card("DEFINITION", "Credit transfer", "Money paid directly into the business's bank account by a customer or other person.");
  b.card("DEFINITION", "Dishonoured cheque", "A customer's cheque that the customer's bank refuses to pay. Credit bank in the cash book; debit the customer.");
  b.card("FACT", "Items entered on the CREDIT side when updating the cash book", "Bank charges, interest charged, standing orders, direct debits, dishonoured cheques.");
  b.card("FACT", "Items entered on the DEBIT side when updating the cash book", "Credit transfers received, interest received, dividends paid in directly.");
  b.card("FACT", "What is NOT entered in the updated cash book?", "Unpresented cheques, uncredited deposits (timing differences) and bank errors: they go in the bank reconciliation statement.");
  b.card("CONCEPT", "Credit balance in the cash book", "A bank overdraft: a current liability.");
});
