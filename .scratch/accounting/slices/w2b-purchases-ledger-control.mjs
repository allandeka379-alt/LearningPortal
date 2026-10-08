// W2b: the purchases ledger control account.
import { concept, P, money, sum, r2, check, ZIM, CAM } from "../lib.mjs";
import { table, control } from "../tables/w2b-lib.mjs";

concept("acc.verification.purchases-ledger-control", { file: "verification/purchases-ledger-control", keyPrefix: "verification.purchases-ledger-control" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Where is the figure for **credit purchases** in the purchases ledger control account taken from?",
    options: [
      ["The total of the purchases journal", "Correct: credit purchases of goods are listed there."],
      ["The credit side of the cash book", "The cash book gives payments to suppliers."],
      ["The returns outwards journal", "That gives goods returned to suppliers."],
      ["The general journal", "The general journal gives contras and other transfers."],
    ],
    answer: "A",
    explanation: "Control accounts use book-of-prime-entry totals; credit purchases come from the purchases journal.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which item is entered on the **debit** side of the purchases ledger control account?",
    options: [
      ["Discount received", "Correct: it reduces what the business owes suppliers."],
      ["Credit purchases", "Purchases increase what is owed: credit."],
      ["Opening credit balances", "Amounts owed to suppliers at the start: credit."],
      ["A refund received from a supplier", "A refund cancels a debit balance: credit."],
    ],
    answer: "A",
    explanation: "Debit side items reduce trade payables: payments, discount received, returns outwards and contras.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the normal balance of a purchases ledger control account, and what does it represent?",
    options: [
      ["A credit balance: the total owed to credit suppliers", "Correct: trade payables, a current liability."],
      ["A debit balance: the total owed by credit customers", "That describes the sales ledger control account."],
      ["A credit balance: the total of cash purchases", "Cash purchases are not in the control account."],
      ["A debit balance: the total paid to suppliers", "Payments reduce the balance; they are not the balance."],
    ],
    answer: "A",
    explanation: "Suppliers' accounts normally have credit balances, so the control account does too: total trade payables.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Opening trade payables US\\$4,930; credit purchases US\\$18,375; payments to suppliers US\\$17,260; discount received US\\$345; returns outwards US\\$590. What is the closing balance of the purchases ledger control account?",
    options: [
      ["US\\$5,110 credit", "Correct: 4,930 + 18,375 − 17,260 − 345 − 590 = 5,110."],
      ["US\\$6,980 credit", "This adds the discount and returns instead of deducting them."],
      ["US\\$5,800 credit", "This adds the discount received instead of deducting it."],
      ["US\\$6,290 credit", "This adds the returns outwards instead of deducting them."],
    ],
    answer: "A",
    hints: ["Credit side: opening balance and purchases. Debit side: everything that reduces what is owed."],
    explanation: "4,930 + 18,375 = 23,305 credit; 17,260 + 345 + 590 = 18,195 debit; balance 5,110 credit.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A supplier who owed Rudo's business US\\$95 (a debit balance) paid the amount to her by bank transfer. How is this recorded in the purchases ledger control account?",
    options: [
      ["Credit US\\$95", "Correct: the refund cancels the supplier's debit balance."],
      ["Debit US\\$95", "A debit would increase the amount the supplier owes."],
      ["It is not recorded, because money was received, not paid", "Any change in a supplier's account is reflected in the control account."],
      ["Credit US\\$190", "The refund is recorded once."],
    ],
    answer: "A",
    hints: ["Which side cancels a debit balance?"],
    explanation: "Debit bank 95; credit the supplier's account, so the control account is credited 95.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which item is **not** entered in the purchases ledger control account?",
    options: [
      ["Goods bought and paid for by bank transfer immediately", "Correct: a cash purchase never passes through a supplier's account."],
      ["Goods returned to a credit supplier because they were damaged", "Returns outwards reduce what is owed: debit."],
      ["A contra set off against a customer's account in the sales ledger", "A contra reduces what is owed: debit."],
      ["Discount received from a credit supplier for paying promptly", "Discount received reduces what is owed: debit."],
    ],
    answer: "A",
    explanation: "Only credit transactions with suppliers are summarised in the control account.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", applies: CAM,
    stem: "Chipo uses accounting software that updates each supplier's account and the purchases ledger control account from a single entry. What is a **limitation** of this?",
    options: [
      ["An invoice keyed in with the wrong amount is recorded wrongly in both, so the control account does not reveal it", "Correct: both records come from the same input."],
      ["The control account still has to be added up by hand at the end of each month by a second clerk", "The software totals it automatically."],
      ["The control account can no longer show the total amount owed to trade payables at any one time", "It gives the total instantly."],
      ["The software cannot record contras between the sales ledger and the purchases ledger accounts", "Contras are recorded by journal in software too."],
    ],
    answer: "A",
    hints: ["What does a control account compare, and what if both sides come from one input?"],
    explanation: "Digital recording keeps the control account and the ledger in agreement automatically, so input errors (wrong amount, wrong supplier, missed invoice) are not detected by it; supplier statements must still be checked.",
  });
  b.mcq({
    d: 2, skill: "RECALL", applies: ZIM,
    stem: "Which ZIMSEC name is used for the purchases ledger control account?",
    options: [
      ["Trade payables (creditors) control account", "Correct."],
      ["Trade receivables (debtors) control account", "That is the sales ledger control account."],
      ["Purchases account", "The purchases account records all purchases of goods."],
      ["Creditors' suspense account", "No such account is used."],
    ],
    answer: "A",
    explanation: "ZIMSEC: trade payables or creditors control account. Cambridge: purchases ledger control account.",
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "Returns outwards are entered on the credit side of the purchases ledger control account.",
    answer: false,
    explanation: "False. Returning goods reduces what the business owes suppliers, so returns outwards are a debit.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A contra between the sales ledger and the purchases ledger is debited in the purchases ledger control account.",
    answer: true,
    explanation: "True. Setting off a customer's debt reduces what the business owes the same person as a supplier: debit purchases ledger control, credit sales ledger control.",
  });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Farai is preparing his purchases ledger control account. Choose the side for each item.",
    pairs: ["Credit purchases", "Payments to suppliers", "Discount received", "Opening credit balances", "Returns outwards", "Closing debit balances carried down"],
    right: ["Debit side", "Credit side"],
    rightIndex: [1, 0, 0, 1, 0, 1],
    explanation: "Credit side: items that increase what is owed (purchases, opening credit balances) and closing debit balances c/d. Debit side: payments, discount received, returns outwards.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the double entry for a contra of US\\$350.",
    template: "Debit {{blank:a}} control US\\$350; credit {{blank:b}} control US\\$350.",
    blanks: [
      { id: "a", accepted: ["purchases ledger"], choices: ["purchases ledger", "sales ledger"] },
      { id: "b", accepted: ["sales ledger"], choices: ["purchases ledger", "sales ledger"] },
    ],
    explanation: "The amount owed to the supplier falls (debit purchases ledger control) and the amount owed by the same person as a customer falls (credit sales ledger control).",
  });

  // Calculation with debit balances
  const pc = control("x", [["", "Balance b/d", 210], ["", "Bank", 42815], ["", "Discount received", 930], ["", "Returns outwards", 1475], ["", "Sales ledger control", 640]], [["", "Balance b/d", 9265], ["", "Purchases", 44190], ["", "Bank (refunds)", 210]], { drBalance: 145 });
  check("pc", pc.crBalance, 7740);
  b.calc({
    d: 4, kind: "money", value: pc.crBalance, calculator: true, wrong: [r2(pc.crBalance - 145), r2(pc.crBalance - 2 * 210)],
    stem: "Sipho's purchases ledger figures for the year ended 30 September 2025 were:\n\n" + table(["Item", "US\\$"], [["Credit balances, 1 October 2024", 9265], ["Debit balances, 1 October 2024", 210], ["Credit purchases", 44190], ["Cash purchases", 3580], ["Payments to suppliers", 42815], ["Discount received", 930], ["Returns outwards", 1475], ["Contras with the sales ledger", 640], ["Refunds received from suppliers", 210], ["Debit balances, 30 September 2025", 145]]) + "\n\nCalculate the closing **credit** balance of the purchases ledger control account.",
    hints: ["Leave out the cash purchases.", "Closing debit balances are carried down on the credit side."],
    explanation: `Credit side: 9,265 + 44,190 + 210 (refunds) + 145 (debit balances c/d) = 53,810. Debit items: 210 + 42,815 + 930 + 1,475 + 640 = 46,070. Closing credit balance = ${money(pc.crBalance)}. Leaving out the closing debit balances gives ${money(r2(pc.crBalance - 145))}.`,
    workedSolution: "1. Exclude cash purchases (3,580).\n2. Credit: opening credit balances 9,265, purchases 44,190, refunds received 210, closing debit balances c/d 145: total 53,810.\n3. Debit: opening debit balances 210, payments 42,815, discount received 930, returns outwards 1,475, contras 640: total 46,070.\n4. Closing credit balance $= 53,810 - 46,070 = 7,740$.",
  });
  check("pc cr side", sum([9265, 44190, 210, 145]), 53810);
  check("pc dr side", sum([210, 42815, 930, 1475, 640]), 46070);

  // Numerical: missing payments
  const pay = r2(6125 + 27340 - 410 - 1065 - 5980);
  check("pay", pay, 26010);
  b.num({
    d: 3, kind: "money", value: pay, calculator: true, wrong: [r2(6125 + 27340 - 5980)],
    stem: "Nyasha's purchases ledger control account for March 2025: opening credit balance US\\$6,125; credit purchases US\\$27,340; discount received US\\$410; returns outwards US\\$1,065; closing credit balance US\\$5,980. Payments to suppliers are missing. Calculate them.",
    hints: ["Payments are the balancing figure on the debit side."],
    explanation: `Credit side 6,125 + 27,340 = 33,465. Debit side without payments: 410 + 1,065 + 5,980 = 7,455. Payments = 33,465 − 7,455 = ${money(pay)}. Forgetting the discount and returns gives ${money(r2(6125 + 27340 - 5980))}.`,
  });

  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3, applies: CAM,
    stem: "Explain **one** advantage and **one** limitation of keeping the purchases ledger control account in accounting software, and say whether Tendai should still check his suppliers' statements.",
    points: ["Advantage: updated automatically from each entry / always agrees with the ledger / total trade payables available instantly", "Limitation: input errors (wrong amount or supplier, missed invoice) are not revealed because both records come from the same entry", "Conclusion: yes, he should still compare suppliers' statements with their accounts"],
    modelAnswer: "The software updates each supplier and the control account from one entry, so the total of trade payables is always up to date. But an invoice keyed in wrongly is wrong in both places, so the control account will not reveal it. Tendai should therefore still compare suppliers' statements with their accounts.",
    hints: ["Think about what a control account compares."],
    explanation: "Digital control accounts are fast and accurate arithmetically but cannot catch input errors.",
  });

  // Practice structured 1: both control accounts with a contra
  const sl = control("Sales ledger control account", [["1 Jun", "Balance b/d", 7385], ["30 Jun", "Sales", 25640], ["30 Jun", "Bank (dishonoured cheque)", 470]], [["30 Jun", "Bank", 23915], ["30 Jun", "Discount allowed", 515], ["30 Jun", "Returns inwards", 860], ["30 Jun", "Irrecoverable debts", 335], ["30 Jun", "Purchases ledger control (contra)", 425]], { cdDate: "30 Jun", bdDate: "1 Jul" });
  const pl = control("Purchases ledger control account", [["30 Jun", "Bank", 19480], ["30 Jun", "Discount received", 465], ["30 Jun", "Returns outwards", 730], ["30 Jun", "Sales ledger control (contra)", 425]], [["1 Jun", "Balance b/d", 5610], ["30 Jun", "Purchases", 20975]], { drBalance: 0, cdDate: "30 Jun", bdDate: "1 Jul" });
  check("sl", sl.drBalance, 7445);
  check("pl", pl.crBalance, 5485);
  b.struct({
    d: 4, examStyle: true, skill: "APPLICATION", calculator: true,
    stem: "Chipo owns a farm-supplies shop in Chinhoyi. Her records for June 2025 show:\n\n" + table(["Item", "US\\$"], [["Trade receivables, 1 June", 7385], ["Trade payables, 1 June", 5610], ["Credit sales", 25640], ["Credit purchases", 20975], ["Receipts from credit customers", 23915], ["Payments to credit suppliers", 19480], ["Discount allowed", 515], ["Discount received", 465], ["Returns inwards", 860], ["Returns outwards", 730], ["Irrecoverable debts written off", 335], ["Dishonoured cheque from a customer", 470]]) + "\n\nGora Farms is both a customer and a supplier. On 30 June US\\$425 owed by Gora Farms was set off against the amount Chipo owed Gora Farms.",
    parts: [
      P.mcq({
        label: "(a)", stem: "How is the contra recorded?",
        options: [["Debit purchases ledger control; credit sales ledger control", "Correct: both balances fall by 425."], ["Debit sales ledger control; credit purchases ledger control", "This would increase both balances."], ["Debit purchases ledger control; credit bank", "No money changes hands."], ["Debit bank; credit sales ledger control", "No money changes hands."]],
        answer: "A", explanation: "Chipo owes Gora Farms less and Gora Farms owes Chipo less.",
      }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: pl.crBalance, wrong: [r2(pl.crBalance + 425), r2(pl.crBalance + 2 * 465)], stem: "Calculate the closing balance of the purchases ledger control account at 30 June 2025.", explanation: `Credit side 5,610 + 20,975 = 26,585. Debit side 19,480 + 465 + 730 + 425 = 21,100. Balance ${pl.crBalance.toLocaleString("en-GB")} credit.` }),
      P.manual({ label: "(c)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare the purchases ledger control account for June 2025.", points: ["Balance b/d 5,610 and purchases 20,975 on the credit side", "Bank 19,480, discount received 465 and returns outwards 730 on the debit side", "Contra 425 on the debit side", `Balance c/d ${pl.crBalance.toLocaleString("en-GB")}, totals 26,585 and balance b/d on 1 July`], modelAnswer: pl.md, explanation: "Purchases ledger: credits increase what is owed." }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: sl.drBalance, wrong: [r2(sl.drBalance + 425), r2(sl.drBalance - 2 * 470)], stem: "Calculate the closing balance of the sales ledger control account at 30 June 2025.", explanation: `Debit 7,385 + 25,640 + 470 = 33,495. Credit 23,915 + 515 + 860 + 335 + 425 = 26,050. Balance ${sl.drBalance.toLocaleString("en-GB")} debit.` }),
      P.manual({ label: "(e)", marks: 2, stem: "Name the source of information for (i) the dishonoured cheque and (ii) the contra.", points: ["(i) The cash book (credit side / bank column)", "(ii) The general journal"], modelAnswer: "(i) Cash book; (ii) general journal.", explanation: "Money movements come from the cash book; transfers from the general journal." }),
    ],
    hints: ["The contra appears in both control accounts, on opposite sides."],
    explanation: "This item tests both control accounts linked by a contra.",
  });

  // Practice structured 2: debit balances, refunds and analysis
  const p2 = control("Purchases ledger control account", [["1 Jan", "Balance b/d", 260], ["31 Mar", "Bank", 36175], ["31 Mar", "Discount received", 845], ["31 Mar", "Returns outwards", 1290]], [["1 Jan", "Balance b/d", 8430], ["31 Mar", "Purchases", 38660], ["31 Mar", "Bank (refund)", 260]], { drBalance: 115, cdDate: "31 Mar", bdDate: "1 Apr" });
  check("p2", p2.crBalance, 8895);
  b.struct({
    d: 4, examStyle: true, skill: "APPLICATION", calculator: true,
    stem: "Farai's purchases ledger for January to March 2025 shows: credit balances on 1 January US\\$8,430; debit balances on 1 January US\\$260; credit purchases US\\$38,660; payments to suppliers US\\$36,175; discount received US\\$845; returns outwards US\\$1,290; a refund of US\\$260 received from a supplier who had been overpaid; debit balances on the closing date US\\$115.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Why might a supplier's account have a **debit** balance?",
        options: [["The business paid the supplier more than it owed, or returned goods already paid for", "Correct: the supplier now owes the business."], ["The business bought more goods on credit from the supplier during the period", "A credit purchase gives a credit balance."], ["The supplier allowed the business a trade discount on its latest invoice", "Trade discount is never recorded."], ["The supplier has not yet been paid for the goods delivered last month", "That leaves a credit balance."]],
        answer: "A", explanation: "A debit balance on a supplier's account is money owed to the business.",
      }),
      P.num({ label: "(b)", marks: 3, kind: "money", value: p2.crBalance, wrong: [r2(p2.crBalance - 115), r2(p2.crBalance - 2 * 260)], stem: "Calculate the closing credit balance of the purchases ledger control account.", explanation: `Credit side: 8,430 + 38,660 + 260 + 115 = 47,465. Debit items: 260 + 36,175 + 845 + 1,290 = 38,570. Balance ${p2.crBalance.toLocaleString("en-GB")}.` }),
      P.manual({ label: "(c)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare the purchases ledger control account, bringing down both balances.", points: ["Opening balances 260 (debit) and 8,430 (credit)", "Bank 36,175, discount received 845, returns outwards 1,290 on the debit side", "Purchases 38,660 and refund 260 on the credit side", `Balances c/d 115 (credit side) and ${p2.crBalance.toLocaleString("en-GB")} (debit side); equal totals; both brought down`], modelAnswer: p2.md, explanation: "Both closing balances are carried down." }),
    ],
    hints: ["Refunds received are credits.", "Closing debit balances c/d go on the credit side."],
    explanation: "This item tests debit balances and refunds in the purchases ledger control account.",
  });

  b.card("DEFINITION", "Purchases ledger control account", "A summary of the suppliers' accounts built from totals; its credit balance equals total trade payables.");
  b.card("FACT", "Credit side of the purchases ledger control account", "Opening credit balances, credit purchases, refunds received from suppliers, closing debit balances c/d.");
  b.card("FACT", "Debit side of the purchases ledger control account", "Opening debit balances, payments, discount received, returns outwards, contras, closing credit balance c/d.");
  b.card("FACT", "Contra entries", "Debit purchases ledger control; credit sales ledger control.");
  b.card("FACT", "Source of returns outwards", "The returns outwards (purchases returns) journal total.");
  b.card("FACT", "Never in the purchases ledger control account", "Cash purchases and trade discount.");
  b.card("CONCEPT", "Debit balance on a supplier's account", "The supplier owes the business, e.g. after an overpayment or returns of goods already paid for.");
  b.card("CONCEPT", "Digital recording and control accounts", "Software updates the ledger and the control account together: instant totals, few posting errors, but input errors are not revealed.", undefined, { applies: CAM });
  b.card("FACT", "Names of the account", "Purchases ledger control account (Cambridge); trade payables or creditors control account (ZIMSEC).");
});
