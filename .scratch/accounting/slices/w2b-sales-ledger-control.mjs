// W2b: control accounts: purpose and the sales ledger control account.
import { concept, P, money, sum, r2, check, ZIM } from "../lib.mjs";
import { table, control } from "../tables/w2b-lib.mjs";

concept("acc.verification.sales-ledger-control", { file: "verification/sales-ledger-control", keyPrefix: "verification.sales-ledger-control" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the main purpose of a sales ledger control account?",
    options: [
      ["To check the arithmetical accuracy of the sales ledger", "Correct: its balance should equal the total of the customers' balances."],
      ["To record each credit sale in detail", "Individual sales are in the sales journal and customers' accounts."],
      ["To calculate the allowance for doubtful debts", "The allowance is a separate account."],
      ["To record cash sales", "Cash sales never involve a customer account."],
    ],
    answer: "A",
    explanation: "A control account summarises the ledger in totals. If its balance equals the total of the individual balances, the ledger is probably arithmetically correct.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which item is entered on the **credit** side of the sales ledger control account?",
    options: [
      ["Discount allowed", "Correct: it reduces what customers owe."],
      ["Credit sales", "Credit sales increase what customers owe: debit."],
      ["Dishonoured cheques", "A dishonoured cheque means the customer owes the money again: debit."],
      ["Interest charged on overdue accounts", "Interest increases what customers owe: debit."],
    ],
    answer: "A",
    explanation: "Credit side items reduce trade receivables: receipts, discount allowed, returns inwards, irrecoverable debts and contras.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which item is **not** entered in the sales ledger control account?",
    options: [
      ["An increase in the allowance for doubtful debts", "Correct: no customer's account is changed by an allowance."],
      ["Irrecoverable debts written off during the year", "Writing off a debt reduces a customer's balance: credit."],
      ["Returns inwards from credit customers", "Goods returned by credit customers: credit."],
      ["A contra set off against the purchases ledger", "A set-off reduces the customer's balance: credit."],
    ],
    answer: "A",
    explanation: "The allowance for doubtful debts is an estimate kept in its own account. Customers still owe the full amount, so the control account is unchanged.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Where is the figure for **returns inwards** in the sales ledger control account taken from?",
    options: [
      ["The total of the returns inwards journal", "Correct: control accounts use totals from books of prime entry."],
      ["The total of the sales journal", "The sales journal gives credit sales."],
      ["The discount column of the cash book", "That gives discount allowed."],
      ["The individual customers' accounts", "Control accounts are built from totals, independently of the individual accounts."],
    ],
    answer: "A",
    explanation: "Each figure comes from a book of prime entry total, so the control account is an independent check on the individual postings.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Farai is both a customer and a supplier of Tendai's business. Tendai sets off US\\$410 owed to Farai against the amount Farai owes him. How is this recorded in Tendai's sales ledger control account?",
    options: [
      ["Credit US\\$410", "Correct: the contra reduces what Farai owes Tendai."],
      ["Debit US\\$410", "A debit would increase trade receivables."],
      ["Credit US\\$820", "The set-off is entered once in each control account."],
      ["No entry, because no money is paid", "A contra is a transfer between ledgers and must be recorded."],
    ],
    answer: "A",
    hints: ["Does the contra increase or reduce what Farai owes Tendai?"],
    explanation: "Debit purchases ledger control (Tendai owes Farai less) and credit sales ledger control (Farai owes Tendai less), 410 each.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Opening trade receivables US\\$5,730; credit sales US\\$21,460; cash sales US\\$3,900; receipts from credit customers US\\$19,815; discount allowed US\\$465. What is the closing balance of the sales ledger control account?",
    options: [
      ["US\\$6,910", "Correct: 5,730 + 21,460 − 19,815 − 465 = 6,910."],
      ["US\\$10,810", "This wrongly includes the cash sales."],
      ["US\\$7,840", "This adds the discount allowed instead of deducting it."],
      ["US\\$7,375", "This leaves out the discount allowed."],
    ],
    answer: "A",
    hints: ["Leave out any item that does not involve credit customers."],
    explanation: "Cash sales are excluded. 5,730 + 21,460 − 19,815 − 465 = 6,910 debit.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why is the sales ledger control account often kept by a different member of staff from the clerk who keeps the customers' accounts?",
    options: [
      ["So that a dishonest or careless change in one record would be noticed when the two are compared", "Correct: this is internal check, which helps prevent fraud."],
      ["Because control accounts must be kept by the bank, not by the business's own staff", "The business keeps its own control accounts."],
      ["Because the law requires two different clerks to keep every ledger of a business", "No such rule exists; it is good practice."],
      ["So that the customers' personal accounts no longer have to be balanced each month", "Customers' accounts are still balanced."],
    ],
    answer: "A",
    hints: ["Think about fraud."],
    explanation: "Dividing duties means one person cannot alter a customer's account and also hide the change in the control account.",
  });
  b.mcq({
    d: 2, skill: "RECALL", applies: ZIM,
    stem: "In ZIMSEC questions the sales ledger control account is also called the:",
    options: [
      ["Trade receivables (debtors) control account", "Correct: the same account under a different name."],
      ["Trade payables (creditors) control account", "That controls the suppliers' ledger."],
      ["Suspense account", "Suspense holds trial balance differences."],
      ["Sales account", "The sales account records all sales, cash and credit."],
    ],
    answer: "A",
    explanation: "ZIMSEC uses trade receivables (or debtors) control account; Cambridge uses sales ledger control account.",
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "Cash sales are entered on the debit side of the sales ledger control account.",
    answer: false,
    explanation: "False. Cash sales do not involve credit customers, so they are not in the control account.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A refund paid to a customer who had a credit balance is entered on the debit side of the sales ledger control account.",
    answer: true,
    explanation: "True. The refund cancels the credit balance (the business no longer owes the customer), so it is a debit.",
  });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Rudo is preparing her sales ledger control account. Choose the side for each item.",
    pairs: ["Credit sales", "Receipts from customers", "Irrecoverable debts written off", "Dishonoured cheque", "Returns inwards", "Interest charged on an overdue account"],
    right: ["Debit side", "Credit side"],
    rightIndex: [0, 1, 1, 0, 1, 0],
    explanation: "Items that increase what customers owe (sales, dishonoured cheques, interest) are debits; items that reduce it (receipts, irrecoverable debts, returns) are credits.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sources of information.",
    template: "Credit sales come from the {{blank:a}}; discount allowed comes from the {{blank:b}}; irrecoverable debts written off come from the {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["sales journal"], choices: ["sales journal", "cash book", "general journal"] },
      { id: "b", accepted: ["cash book"], choices: ["sales journal", "cash book", "general journal"] },
      { id: "c", accepted: ["general journal"], choices: ["sales journal", "cash book", "general journal"] },
    ],
    explanation: "Sales journal total; cash book discount column; general journal for write-offs, interest and contras.",
  });

  // Calculation with credit balances
  const cDr = [["", "Balance b/d", 12645], ["", "Sales", 38270], ["", "Bank (dishonoured cheques)", 815], ["", "Bank (refunds)", 140]];
  const cCr = [["", "Balance b/d", 265], ["", "Bank", 35960], ["", "Discount allowed", 690], ["", "Returns inwards", 1185], ["", "Irrecoverable debts", 520], ["", "Purchases ledger control", 455]];
  const cc = control("x", cDr, cCr, { crBalance: 310 });
  check("cc", cc.drBalance, 13105);
  b.calc({
    d: 4, kind: "money", value: cc.drBalance, calculator: true, wrong: [r2(cc.drBalance - 310), r2(cc.drBalance + 2 * 455)],
    stem: "Chipo's sales ledger figures for the year ended 30 June 2025 were:\n\n" + table(["Item", "US\\$"], [["Debit balances, 1 July 2024", 12645], ["Credit balances, 1 July 2024", 265], ["Credit sales", 38270], ["Receipts from customers", 35960], ["Discount allowed", 690], ["Returns inwards", 1185], ["Irrecoverable debts written off", 520], ["Dishonoured cheques", 815], ["Contras with the purchases ledger", 455], ["Refunds to customers with credit balances", 140], ["Credit balances, 30 June 2025", 310]]) + "\n\nCalculate the closing **debit** balance of the sales ledger control account.",
    hints: ["Closing credit balances are carried down on the debit side.", "Opening credit balances go on the credit side."],
    explanation: `Debit side: 12,645 + 38,270 + 815 + 140 + 310 (credit balances c/d) = ${sum([12645, 38270, 815, 140, 310]).toLocaleString("en-GB")}. Credit items: 265 + 35,960 + 690 + 1,185 + 520 + 455 = ${sum([265, 35960, 690, 1185, 520, 455]).toLocaleString("en-GB")}. Closing debit balance = ${money(cc.drBalance)}. Leaving out the closing credit balances gives ${money(r2(cc.drBalance - 310))}.`,
    workedSolution: "1. Debit: opening debit balances 12,645, credit sales 38,270, dishonoured cheques 815, refunds 140, closing credit balances c/d 310: total 52,180.\n2. Credit: opening credit balances 265, receipts 35,960, discount allowed 690, returns inwards 1,185, irrecoverable debts 520, contras 455: total 39,075.\n3. Closing debit balance $= 52,180 - 39,075 = 13,105$.",
  });
  check("dr side", sum([12645, 38270, 815, 140, 310]), 52180);
  check("cr side", sum([265, 35960, 690, 1185, 520, 455]), 39075);

  // Numerical: find missing credit sales
  const ms = r2(7320 + 26485 + 590 + 1245 - 6870 - 285);
  check("ms", ms, 28485);
  b.num({
    d: 3, kind: "money", value: ms, calculator: true, wrong: [r2(7320 + 26485 - 590 - 1245 - 6870)],
    stem: "Sipho's sales ledger control account for September 2025: opening balance US\\$6,870; receipts US\\$26,485; discount allowed US\\$590; returns inwards US\\$1,245; dishonoured cheque US\\$285; closing balance US\\$7,320. The credit sales figure is missing. Calculate it.",
    hints: ["Credit sales is the balancing figure on the debit side."],
    explanation: `Credit side total: 26,485 + 590 + 1,245 + 7,320 = 35,640. Debit side without sales: 6,870 + 285 = 7,155. Credit sales = 35,640 − 7,155 = ${money(ms)}.`,
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why an irrecoverable debt written off is entered in the sales ledger control account but an increase in the allowance for doubtful debts is not.",
    points: ["Writing off a debt reduces / closes a customer's account in the sales ledger, so the control account must also be credited", "The allowance is only an estimate in a separate account; no customer's balance changes, so the control account is unchanged"],
    modelAnswer: "An irrecoverable debt is written off in the customer's own account, reducing the sales ledger total, so the control account is credited too. The allowance is an estimate kept in its own account; customers still owe their full balances, so the sales ledger and its control account do not change.",
    hints: ["Does the item change any customer's account?"],
    explanation: "The control account mirrors the customers' accounts.",
  });

  // Practice structured 1
  const s1 = control("Sales ledger control account", [["1 Apr", "Balance b/d", 9460], ["30 Apr", "Sales", 31275], ["30 Apr", "Bank (dishonoured cheque)", 735], ["30 Apr", "Interest on overdue accounts", 62]], [["1 Apr", "Balance b/d", 148], ["30 Apr", "Bank", 28940], ["30 Apr", "Discount allowed", 615], ["30 Apr", "Returns inwards", 1320], ["30 Apr", "Irrecoverable debts", 485], ["30 Apr", "Purchases ledger control (contra)", 290]], { crBalance: 175, cdDate: "30 Apr", bdDate: "1 May" });
  check("s1", s1.drBalance, 9909);
  b.struct({
    d: 4, examStyle: true, skill: "APPLICATION", calculator: true,
    stem: "Tendai owns a hardware shop in Gweru. The following information for April 2025 relates to his sales ledger:\n\n" + table(["Item", "US\\$"], [["Debit balances, 1 April", 9460], ["Credit balances, 1 April", 148], ["Credit sales", 31275], ["Cash sales", 6140], ["Receipts from credit customers", 28940], ["Discount allowed", 615], ["Returns inwards", 1320], ["Irrecoverable debts written off", 485], ["Increase in allowance for doubtful debts", 210], ["Dishonoured cheque", 735], ["Interest charged on overdue accounts", 62], ["Contra with the purchases ledger", 290], ["Credit balances, 30 April", 175]]),
    parts: [
      P.mcq({
        label: "(a)", multiple: true, marks: 2, stem: "Which **two** items are not entered in the sales ledger control account?",
        options: [["Cash sales", "Correct: no credit customer is involved."], ["Increase in allowance for doubtful debts", "Correct: an estimate in a separate account."], ["Interest charged on overdue accounts", "Interest increases what customers owe: debit."], ["Contra with the purchases ledger", "A contra reduces a customer's balance: credit."], ["Dishonoured cheque", "The customer owes the amount again: debit."]],
        answer: ["A", "B"], explanation: "Cash sales and the allowance never touch a customer's account.",
      }),
      P.num({ label: "(b)", marks: 3, kind: "money", value: s1.drBalance, wrong: [r2(s1.drBalance + 6140), r2(s1.drBalance - 175)], stem: "Calculate the closing debit balance of the sales ledger control account at 30 April 2025.", explanation: `Debit side: 9,460 + 31,275 + 735 + 62 + 175 = ${sum([9460, 31275, 735, 62, 175]).toLocaleString("en-GB")}. Credit items: 148 + 28,940 + 615 + 1,320 + 485 + 290 = ${sum([148, 28940, 615, 1320, 485, 290]).toLocaleString("en-GB")}. Closing debit balance ${s1.drBalance.toLocaleString("en-GB")}.` }),
      P.manual({ label: "(c)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Prepare the sales ledger control account for April 2025, bringing down both balances on 1 May.", points: ["Opening balances 9,460 (debit) and 148 (credit)", "Sales 31,275, dishonoured cheque 735 and interest 62 on the debit side", "Bank 28,940, discount allowed 615, returns inwards 1,320 on the credit side", "Irrecoverable debts 485 and contra 290 on the credit side", `Balances c/d 175 (debit side) and ${s1.drBalance.toLocaleString("en-GB")} (credit side), totals equal, both brought down`], modelAnswer: s1.md, explanation: "Exclude cash sales and the allowance." }),
      P.manual({ label: "(d)", marks: 2, stem: "State **two** purposes of keeping a sales ledger control account.", points: ["One purpose: check the arithmetical accuracy of the sales ledger / locate errors", "Second purpose: quick total of trade receivables for the trial balance and statements / help prevent fraud (internal check)"], modelAnswer: "To check the arithmetical accuracy of the sales ledger, and to give a total for trade receivables quickly when preparing the financial statements.", explanation: "Four purposes: accuracy, locating errors, quick totals, fraud prevention." }),
    ],
    hints: ["Cross out items that do not involve customers' accounts first."],
    explanation: "This item tests a full sales ledger control account with debit and credit balances.",
  });

  // Practice structured 2: identify source and errors in a draft account
  b.struct({
    d: 3, examStyle: true, skill: "ANALYSIS",
    stem: "Nyasha's trainee prepared a draft sales ledger control account for June 2025 for her Masvingo grocery wholesale business. He entered: credit sales US\\$17,640 (debit); discount allowed US\\$380 (debit); returns inwards US\\$720 (credit); receipts from customers US\\$15,915 (credit); and a contra with the purchases ledger of US\\$260 (debit). The opening debit balance was US\\$4,205.",
    parts: [
      P.mcq({
        label: "(a)", multiple: true, marks: 2, stem: "Which **two** items has the trainee entered on the wrong side?",
        options: [["Discount allowed", "Correct: it reduces what customers owe, so it is a credit."], ["Contra with the purchases ledger", "Correct: a set-off reduces what customers owe, so it is a credit."], ["Credit sales", "Correctly debited."], ["Returns inwards", "Correctly credited."], ["Receipts from customers", "Correctly credited."]],
        answer: ["A", "B"], explanation: "Discount allowed and contras are credits in the sales ledger control account.",
      }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: r2(4205 + 17640 - 720 - 15915 - 380 - 260), wrong: [r2(4205 + 17640 - 720 - 15915 + 380 + 260)], stem: "Calculate the correct closing debit balance.", explanation: `4,205 + 17,640 − 15,915 − 720 − 380 − 260 = ${r2(4205 + 17640 - 720 - 15915 - 380 - 260).toLocaleString("en-GB")}. The trainee's version would give ${r2(4205 + 17640 - 720 - 15915 + 380 + 260).toLocaleString("en-GB")}.` }),
      P.fib({
        label: "(c)", stem: "Complete the sources of information.",
        template: "The receipts figure is taken from the {{blank:a}} and the contra from the {{blank:b}}.",
        blanks: [{ id: "a", accepted: ["cash book"], choices: ["cash book", "sales journal", "general journal", "returns inwards journal"] }, { id: "b", accepted: ["general journal"], choices: ["cash book", "sales journal", "general journal", "returns inwards journal"] }],
        explanation: "Money received: cash book. Transfers such as contras: general journal.",
      }),
    ],
    hints: ["Ask of each item: does it increase or reduce what customers owe?"],
    explanation: "This item tests the sides and sources of entries in the sales ledger control account.",
  });

  b.card("DEFINITION", "Control account", "A summary account built from book-of-prime-entry totals whose balance should equal the total of the balances in a ledger.");
  b.card("CONCEPT", "Purposes of control accounts", "Check arithmetical accuracy; locate errors; quick totals for statements; help prevent fraud by dividing duties.");
  b.card("FACT", "Debit side of the sales ledger control account", "Opening debit balances, credit sales, dishonoured cheques, interest on overdue accounts, refunds, closing credit balances c/d.");
  b.card("FACT", "Credit side of the sales ledger control account", "Opening credit balances, receipts, discount allowed, returns inwards, irrecoverable debts, contras, closing debit balance c/d.");
  b.card("FACT", "Never in the sales ledger control account", "Cash sales, trade discount, the allowance (provision) for doubtful debts.");
  b.card("DEFINITION", "Contra (set-off)", "Setting off a customer's balance against the same person's supplier balance: credit sales ledger control, debit purchases ledger control.");
  b.card("FACT", "Source of credit sales in the control account", "The sales journal total.");
  b.card("FACT", "Source of irrecoverable debts, interest and contras", "The general journal.");
  b.card("FACT", "Names of the account", "Sales ledger control account (Cambridge); trade receivables or debtors control account (ZIMSEC).");
});
