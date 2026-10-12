// W1a: ledger.books-prime-entry (Cambridge only)
import { concept, P, table, check, sum, r2, fmt, money } from "../lib.mjs";
import { mc, tAcct } from "../tables/w1a-lib.mjs";

concept("aacc.ledger.books-prime-entry", { file: "ledger/books-prime-entry", keyPrefix: "ledger.books-prime-entry" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "In which book of prime entry is a credit note issued to a customer for goods returned recorded?",
    ok: ["Sales returns journal", "Correct: the business is giving credit for returned goods."],
    bad: [["Purchases returns journal", "That records goods the business returns to its suppliers."], ["Sales journal", "The sales journal records credit sales, not returns."], ["Cash book", "No cash is paid when credit is given."]],
    explanation: "A credit note issued reduces what the customer owes and is entered in the sales returns journal.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which source document supports an entry in the sales journal?",
    ok: ["A copy of the sales invoice", "Correct: the invoice shows what was sold, to whom and the amount."],
    bad: [["A supplier's statement", "A statement lists amounts owed to a supplier."], ["A cheque stub", "A cheque stub supports a cash book payment."], ["A debit note received", "A debit note concerns returns to suppliers."]],
    explanation: "The sales journal is written up from copies of sales invoices issued to customers.",
  });
  mc(b, {
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Thandeka buys office furniture on credit from Mutare Furnishers. In which book of prime entry should it first be recorded?",
    ok: ["General journal", "Correct: furniture is not goods for resale."],
    bad: [["Purchases journal", "That is for goods bought for resale only."], ["Cash book", "No cash has been paid."], ["Sales journal", "The business is buying, not selling."]],
    explanation: "Non-current assets bought on credit are recorded in the general journal.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "At the end of the month the total of the discount allowed column in the cash book is posted. Which entry is correct?",
    ok: ["Debit Discount allowed account", "Correct: discount allowed is an expense."],
    bad: [["Credit Discount allowed account", "That is the entry for discount received."], ["Debit Bank account", "Discount does not pass through the bank account."], ["Credit Trade receivables control account", "The customers' accounts were already credited for the full amount."]],
    explanation: "The total of the discount allowed column is debited to the discount allowed account.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "Gokwe Traders receives a credit note from its supplier for goods returned. Which entry results from posting the purchases returns journal?",
    ok: ["Debit the supplier's account; credit Purchases returns", "Correct: the amount owed to the supplier falls and purchases are reduced."],
    bad: [["Credit the supplier's account; debit Purchases returns", "This would increase the amount owed."], ["Debit Sales returns; credit the supplier's account", "Sales returns concern customers."], ["Debit Bank; credit the supplier's account", "No cash is received when goods are returned."]],
    hints: ["Does the business owe more or less after the return?"],
    explanation: "Returning goods reduces the liability, so the supplier is debited.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "The total of the sales journal is posted to the general ledger. Which entry is correct?",
    ok: ["Debit Trade receivables control; credit Sales", "Correct: customers owe more and revenue is earned."],
    bad: [["Debit Sales; credit Trade receivables control", "This reverses the entry."], ["Debit Bank; credit Sales", "Credit sales produce no cash."], ["Debit Trade receivables control; credit Bank", "No cash is paid."]],
    hints: ["The individual customers are debited in the sales ledger."],
    explanation: "The control account takes the combined debit of all customers, and Sales is credited.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "A customer owes US\\$800 and pays by cheque US\\$780 in full settlement. How is this recorded?",
    ok: ["Bank US\\$780 and discount allowed US\\$20 are debited; the customer is credited US\\$800", "Correct: the full debt is cleared; the discount is an expense."],
    bad: [["Bank US\\$800 is debited; the customer is credited US\\$800", "Only US\\$780 was received."], ["Bank US\\$780 is debited; the customer is credited US\\$780", "The customer would still appear to owe US\\$20."], ["Bank US\\$780 is debited; discount received US\\$20 is credited", "Discount received relates to suppliers, not customers."]],
    hints: ["The customer account must be cleared in full."],
    explanation: "Debits 780 + 20 equal the credit of 800 to the customer's account.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Which is the **best** reason a growing business splits its ledger into a general ledger and subsidiary ledgers with control accounts?",
    ok: ["Several people can work on different ledgers and the control account provides a check on accuracy", "Correct: division of work and an arithmetical check."],
    bad: [["It removes the need for a trial balance", "A trial balance is still required."], ["It means errors cannot occur", "Errors can still occur; they are easier to locate."], ["It reduces the number of transactions", "The number of transactions is unchanged."]],
    hints: ["Think of control and of the number of people involved."],
    explanation: "Subsidiary ledgers allow division of labour; control accounts check the totals and help locate errors.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The discount columns in the cash book are included when finding the bank balance.",
    answer: false,
    explanation: "False. They are memorandum columns. Only the bank column is used to find the balance.",
  });
  b.tf({
    d: 2, skill: "RECALL",
    stem: "Opening entries for a business are made in the general journal.",
    answer: true,
    explanation: "True. They are not part of normal trading, so the general journal is used, with a narrative.",
  });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each transaction to the book of prime entry in which it is first recorded.",
    pairs: ["Goods sold on credit to a customer", "Goods bought on credit for resale", "A cheque received from a customer", "Goods returned to a supplier", "Writing off an irrecoverable debt"],
    right: ["Sales journal", "Purchases journal", "Cash book", "Purchases returns journal", "General journal"],
    rightIndex: [0, 1, 2, 3, 4],
    explanation: "Each type of transaction has its own book; items that fit none go in the general journal.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "The total of the purchases journal is posted to the debit of {{blank:a}} and the credit of the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Purchases"], choices: ["Purchases", "Sales", "Trade payables control"] },
      { id: "b", accepted: ["Trade payables control"], choices: ["Purchases", "Sales", "Trade payables control"] },
    ],
    explanation: "Purchases are an expense (debit); the combined liability to suppliers is credited to the control account.",
  });

  const cb = r2(940 + 1820 - 260 - 735);
  check("cb", cb, 1765);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: cb, daily: true, calculator: true, wrong: [r2(940 + 1820 - 260 - 700), r2(940 + 1820 + 260 - 735)],
    stem: "A customer's account at 1 May 2025 showed a balance of US\\$940 owing. During May the customer was sold goods for US\\$1,820, returned goods of US\\$260 and paid by cheque US\\$700 after the business allowed discount of US\\$35 on this payment. Calculate the amount owing at 31 May 2025.",
    hints: ["The customer account is credited with the cheque and the discount."],
    explanation: "940 + 1,820 - 260 - (700 + 35) = 1,765. Ignoring the discount gives 1,800.",
  });
  const ctrl = r2(5200 + 12640 - 870 - 8300 - 410);
  check("ctrl", ctrl, 8260);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: ctrl, calculator: true, wrong: [r2(5200 + 12640 - 870 - 8300), r2(5200 + 12640 + 870 - 8300 - 410)],
    stem: "The trade receivables control account of a wholesaler started the month with a balance of US\\$5,200. During the month: credit sales US\\$12,640; sales returns US\\$870; cheques received from customers US\\$8,300; discount allowed US\\$410. Calculate the closing balance.",
    hints: ["Discount allowed also reduces the amount customers owe."],
    explanation: "5,200 + 12,640 - 870 - 8,300 - 410 = 8,260. Forgetting the discount gives 8,670.",
  });
  const assets = sum([21000, 6400, 3150, 1800, 960]);
  const cap = r2(assets - 9240);
  check("cap", cap, 24070);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: cap, calculator: true, wrong: [assets, r2(assets + 9240)],
    stem: "Sipho takes over a shop. The opening entries in the general journal debit premises US\\$21,000, equipment US\\$6,400, inventory US\\$3,150, trade receivables control US\\$1,800 and bank US\\$960. The only liability is trade payables control US\\$9,240. Calculate the amount to be credited to capital.",
    hints: ["Capital is the balancing figure: assets less liabilities."],
    explanation: `Assets: ${fmt(assets)}; less liabilities 9,240 = ${fmt(cap)}. Using the assets alone gives ${fmt(assets)}.`,
  });
  const bank = r2(3120 + 7860 + 4150 - 6975 - 3410);
  check("bank", bank, 4745);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: bank, calculator: true, wrong: [r2(bank + 340 - 225), r2(bank + 340 + 225)],
    stem: "A cash book (bank and discount columns) shows these figures for June 2025: opening bank balance US\\$3,120; cheques from customers US\\$7,860 (after discount allowed of US\\$340); cash sales banked US\\$4,150; cheques to suppliers US\\$6,975 (after discount received of US\\$225); expenses paid US\\$3,410. Calculate the closing bank balance.",
    hints: ["The discount columns are not part of the bank balance."],
    explanation: "3,120 + 7,860 + 4,150 - 6,975 - 3,410 = 4,745. The discounts are memorandum figures.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the book of prime entry in which a credit note **received** from a supplier is recorded.",
    accepted: ["purchases returns journal", "purchases returns book", "purchase returns journal", "returns outwards journal", "returns outwards book"],
    explanation: "Credit notes received are recorded in the purchases returns journal.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why a computer bought on credit is recorded in the general journal and not in the purchases journal.",
    points: ["The purchases journal is only for goods bought for resale", "A computer is a non-current asset, which has no other book of prime entry, so the general journal is used"],
    modelAnswer: "The purchases journal is for goods bought for resale. A computer is a non-current asset, so it is recorded in the general journal.",
    explanation: "Distinguish goods for resale from non-current assets.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2, hints: ["Think of the control and of who keeps the books."],
    stem: "State **two** advantages of using subsidiary ledgers with control accounts.",
    points: ["Division of work: different staff can keep different ledgers, reducing the risk of fraud", "The control account total checks the accuracy of the individual accounts and helps locate errors"],
    modelAnswer: "Different people can keep different ledgers, which reduces the chance of fraud, and the control account provides an arithmetical check on the personal accounts.",
    explanation: "Control and division of labour are the two usual points.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "Rudo runs a market stall selling vegetables in Bulawayo and records only cash. Her accountant advises her to keep a full set of books of prime entry. Evaluate this advice.",
    points: ["Benefits: she could see which customers owe money and which suppliers she owes, and prepare accurate statements for tax", "Costs: time and cost to keep books for a very small business with mostly cash sales", "Conclusion: a simplified version (cash book and sales and purchases records) is probably sufficient"],
    modelAnswer: "Full books give better control and information, such as who owes her money and what profit she makes. But for a small cash business they take time and cost. A simplified set, with a cash book and records of purchases and credit sales, is probably best.",
    hints: ["Weigh the benefit of information against the time and cost."],
    explanation: "Marks reward balanced advantages, disadvantages and a conclusion fitted to the business.",
  });

  // Structured 1: 12 marks
  const open = 1430;
  const sale = 2260;
  const ret = 190;
  const disc = r2(open * 0.03);
  const cheque = r2(open - disc);
  const balance = r2(open + sale - ret - open);
  check("disc", disc, 42.9);
  check("cheque", cheque, 1387.1);
  check("balance", balance, 2070);
  const custAcc = tAcct(
    "Sunrise Stores account",
    [["2 Apr", "Balance b/d", open], ["5 Apr", "Sales", sale]],
    [["12 Apr", "Sales returns", ret], ["24 Apr", "Bank", cheque], ["24 Apr", "Discount allowed", disc], ["30 Apr", "Balance c/d", balance]],
    { side: "dr", date: "1 May", details: "Balance b/d", amount: balance },
  );
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Chipo has a wholesale business in Harare. In April 2025 she dealt with a customer, Sunrise Stores:\n\n` + table(["Date", "Transaction"], [
      ["2 Apr", `Sunrise Stores owed ${money(open)}`],
      ["5 Apr", `Sold goods on credit ${money(sale)}`],
      ["12 Apr", `Goods returned by Sunrise Stores ${money(ret)}`],
      ["24 Apr", `Sunrise Stores paid the ${money(open)} owed at 2 April by cheque, deducting 3% settlement discount`],
    ], ["l", "l"]),
    parts: [
      P.fib({
        label: "(a)", marks: 2, stem: "Name the book of prime entry for each of the first two items of the account.",
        template: "The sale on 5 April is recorded first in the {{blank:a}} and the return on 12 April in the {{blank:b}}.",
        blanks: [
          { id: "a", accepted: ["sales journal"], choices: ["sales journal", "sales returns journal", "cash book", "general journal"] },
          { id: "b", accepted: ["sales returns journal"], choices: ["sales journal", "sales returns journal", "cash book", "general journal"] },
        ],
        explanation: "Credit sales go to the sales journal; goods returned by customers to the sales returns journal.",
      }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: cheque, dp: 2, wrong: [open], stem: "Calculate the amount of the cheque.", explanation: "Discount 3% × 1,430 = 42.90; cheque 1,430 - 42.90 = 1,387.10." }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: disc, dp: 2, wrong: [r2(sale * 0.03)], stem: "Calculate the discount allowed.", explanation: "3% × 1,430 = 42.90." }),
      P.num({ label: "(d)", marks: 3, kind: "money", value: balance, wrong: [r2(open + sale - ret - cheque)], stem: "Calculate the amount owed by Sunrise Stores at 30 April 2025.", explanation: "1,430 + 2,260 - 190 - 1,387.10 - 42.90 = 2,070." }),
      P.manual({ label: "(e)", marks: 3, type: "EXTENDED_RESPONSE", stem: "Prepare the account of Sunrise Stores for April 2025.", points: ["Debits: balance b/d 1,430 and sales 2,260", "Credits: returns 190, bank 1,387.10 and discount allowed 42.90", "Balance c/d 2,070 and b/d brought down on the debit side, totals equal"], modelAnswer: custAcc, explanation: "The customer account is credited with the cheque and the discount." }),
    ],
    hints: ["The cheque plus the discount clears the opening debt."],
    explanation: "This item tests the books of prime entry for credit sales and the customer account with discount.",
  });

  // Structured 2: 12 marks
  const ob = sum([30000, 9500, 4200, 2650, 780]);
  const capital = r2(ob - sum([3310, 10000]));
  check("capital", capital, 33820);
  const ctrl2 = r2(8900 + 21400 - 640 - 19250 - 380 - 500);
  check("ctrl2", ctrl2, 9530);
  b.struct({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: "Thandeka takes over a hardware business in Masvingo on 1 July 2025. Its assets were: premises US\\$30,000; vehicles US\\$9,500; inventory US\\$4,200; trade receivables US\\$2,650; bank US\\$780. Its liabilities were: trade payables US\\$3,310 and a loan US\\$10,000.\n\nDuring July she records: (1) a delivery van bought on credit from Mutare Motors; (2) goods returned by a customer; (3) cash sales banked; (4) goods bought on credit from a supplier.",
    parts: [
      P.match({ label: "(a)", stem: "Match each July item to the book of prime entry.", pairs: ["(1) Delivery van bought on credit", "(2) Goods returned by a customer", "(3) Cash sales banked", "(4) Goods bought on credit from a supplier"], right: ["General journal", "Sales returns journal", "Cash book", "Purchases journal"], rightIndex: [0, 1, 2, 3], explanation: "The van is a non-current asset (general journal); returns have their own journal; cash sales go to the cash book; credit purchases of goods go to the purchases journal." }),
      P.num({ label: "(b)", marks: 3, kind: "money", value: capital, wrong: [ob, r2(ob - 3310)], stem: "Calculate the amount credited to Capital in the opening entry for 1 July 2025.", explanation: "Assets 47,130 - liabilities (3,310 + 10,000 = 13,310) = 33,820." }),
      P.num({ label: "(c)", marks: 3, kind: "money", value: ctrl2, wrong: [r2(8900 + 21400 - 640 - 19250), r2(8900 + 21400 + 640 - 19250 - 380 - 500)], stem: "The trade receivables control account started July with US\\$8,900. Credit sales were US\\$21,400, sales returns US\\$640, cheques from customers US\\$19,250, discount allowed US\\$380 and irrecoverable debts written off US\\$500. Calculate the closing balance.", explanation: "8,900 + 21,400 - 640 - 19,250 - 380 - 500 = 9,530." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain how the control account helps Thandeka to find errors.", points: ["The control account total should equal the total of the individual customers' balances", "A difference shows an error in one of the two, so the search for the mistake can be narrowed"], modelAnswer: "The control account total should agree with the total of the individual balances. If it does not, there is an error in one of them, which helps her look for it.", explanation: "Agreement of totals is the check." }),
    ],
    hints: ["Capital is the balancing figure.", "Every item that reduces the amount owed by customers is deducted."],
    explanation: "This item tests books of prime entry, opening entries and a control account.",
  });

  b.card("DEFINITION", "What is a **book of prime entry**?", "A book in which transactions are first recorded, in date order and by type, before posting to the ledger.");
  b.card("FACT", "Which book records a credit note issued to a customer?", "The sales returns journal.");
  b.card("FACT", "Which book records a credit note received from a supplier?", "The purchases returns journal.");
  b.card("FACT", "What goes in the general journal?", "Opening entries, non-current assets bought or sold on credit, write-offs and corrections, each with a narrative.");
  b.card("CONCEPT", "Discount columns in the cash book", "Memorandum columns: discount allowed (receipts side) and discount received (payments side); totals posted at the end of the month.");
  b.card("FACT", "Posting the sales journal", "Total: debit Trade receivables control, credit Sales. Items: debit each customer in the sales ledger.");
  b.card("DEFINITION", "What is a **control account**?", "A general ledger account summarising a subsidiary ledger; its balance equals the total of the individual balances.");
  b.card("FACT", "Capital in an opening entry", "Capital is the balancing figure: total assets less total liabilities.");
  b.card("CONCEPT", "Advantages of full records", "Better control and detection of errors, information for management, customer and supplier statements; the cost is time and money.");
});
