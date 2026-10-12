// W1b: verification.control-accounts
import { concept, P, money, fmt, check, chk, r2, sum, rd, table, statement, tAccount } from "../lib.mjs";
import { mc, U } from "../tables/w1b-lib.mjs";

concept("aacc.verification.control-accounts", { file: "verification/control-accounts", keyPrefix: "verification.control-accounts" }, (b) => {
  // --- MCQ
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which item is entered on the **credit** side of the sales ledger control account?",
    right: ["Discount allowed", "Correct: it reduces the amounts owed by customers."],
    wrong: [["Credit sales", "Credit sales increase receivables, so they are debited."], ["Dishonoured cheques", "A dishonoured cheque makes the customer owe the money again: a debit."], ["Opening balance of trade receivables", "The opening balance of receivables is a debit balance."]],
    explanation: "Receipts, discount allowed, returns inwards, irrecoverable debts and contras are credited.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which transaction is **not** recorded in the purchases ledger control account?",
    right: ["A cash purchase of goods", "Correct: cash purchases do not pass through a supplier's personal account."],
    wrong: [["A credit purchase of goods", "Credit purchases are credited to the control account."], ["Goods returned to a supplier", "Returns outwards are debited to the control account."], ["A payment to a supplier by cheque", "Payments are debited to the control account."]],
    explanation: "Control accounts record only transactions with credit suppliers or customers.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A contra entry of US\\$900 is made between a person's account in the sales ledger and in the purchases ledger. How is it shown in the purchases ledger control account?",
    right: ["Debit US\\$900", "Correct: it reduces the amount owed to the supplier."],
    wrong: [["Credit US\\$900", "A credit would increase the amount owed."], ["It is not recorded in the control account", "Both control accounts record the contra."], ["Debit US\\$450 and credit US\\$450", "The full contra is debited."]],
    explanation: "Debit the purchases ledger control account and credit the sales ledger control account with the contra.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A customer's cheque is dishonoured. How is it entered in the sales ledger control account?",
    right: ["It is debited, because the customer again owes the money", "Correct."],
    wrong: [["It is credited, because the bank has returned it", "A credit would reduce receivables."], ["It is not entered, because no goods were sold", "The customer's debt is restored."], ["It is debited to the purchases ledger control account", "It concerns a customer, not a supplier."]],
    hints: ["Does the customer owe more or less after the cheque is returned?"],
    explanation: "The receipt is cancelled, so the amount is again owed: debit receivables, credit bank.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "The purchases journal was overcast by US\\$900. How is this corrected when reconciling the purchases ledger?",
    right: ["The purchases ledger control account balance is reduced by US\\$900", "Correct: the control account is credited with the journal total, which is too high."],
    wrong: [["The list of supplier balances is reduced by US\\$900", "The personal accounts were posted from the invoices, not from the journal total."], ["Both the control account and the list are reduced by US\\$900", "Only the total is wrong."], ["No adjustment is made because purchases are an expense", "Trade payables are affected."]],
    hints: ["Which record uses the total of the purchases journal?"],
    explanation: "The control account uses the journal total; an overcast makes it too high. The individual accounts are not affected.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A receipt of US\\$700 from a customer is posted to the customer's account as US\\$70. What is adjusted when reconciling?",
    right: ["The list of balances is reduced by US\\$630", "Correct: the customer's balance is too high by 630, and the control account is right."],
    wrong: [["The control account is reduced by US\\$630", "The control account was posted with the correct total."], ["The list of balances is increased by US\\$630", "The customer's balance is too high, not too low."], ["The control account is increased by US\\$700", "The control account is correct."]],
    hints: ["Was the error in the personal account or in the total?"],
    explanation: "A wrongly posted amount in the personal account changes the list, not the control account. Correct credit 700 − 70 = 630.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "The sales ledger control account balance equals the total of the list of customers' balances. What can be concluded?",
    right: ["The two totals agree, though some errors may remain hidden", "Correct: for example an invoice posted to the wrong customer."],
    wrong: [["Every individual customer's balance must be correct", "An invoice posted to the wrong customer leaves both totals unchanged."], ["No transaction has been left out of the ledgers", "An omission from both records would not be detected."], ["The statement of financial position must be free of error", "Other errors may still be present."]],
    hints: ["Think about errors which affect both records equally."],
    explanation: "Agreement shows arithmetic consistency only; compensating errors, omissions in both records and wrong-account postings remain possible.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Which is a benefit of keeping a sales ledger control account?",
    right: ["It helps to locate errors in the sales ledger", "Correct: a difference shows that an error exists in the ledger or the totals."],
    wrong: [["It removes the need to keep personal accounts for customers", "Personal accounts are still needed to know who owes what."], ["It records cash sales", "Only credit sales are recorded."], ["It prevents all errors in the sales journal", "It helps to find errors; it does not prevent them."]],
    hints: ["What does a difference between the control account and the list reveal?"],
    explanation: "A control account provides an arithmetic check and makes fraud harder; it does not replace the personal accounts.",
  });

  // --- True / false
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The balance of a sales ledger control account should equal the total of the balances in the sales ledger.",
    answer: true,
    explanation: "True. The control account summarises the transactions of the whole sales ledger.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Cash sales are included in the sales ledger control account.",
    answer: false,
    explanation: "False. Only credit sales, which are entered in customers' personal accounts, appear in the control account.",
  });

  // --- Matching
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each item to the side on which it is entered in the sales ledger control account.",
    pairs: ["Credit sales", "Returns inwards", "Interest charged to a customer", "Irrecoverable debt written off", "Receipts from customers"],
    right: ["Debit", "Credit"],
    rightIndex: [0, 1, 0, 1, 1],
    explanation: "Items that increase the amounts owed by customers are debits; items that reduce them are credits.",
  });

  // --- Fill in the blank
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements.",
    template: "A contra entry is {{blank:a}} in the sales ledger control account. Discount received is entered on the {{blank:b}} side of the purchases ledger control account.",
    blanks: [
      { id: "a", accepted: ["credited"], choices: ["credited", "debited"] },
      { id: "b", accepted: ["debit"], choices: ["debit", "credit"] },
    ],
    explanation: "A contra reduces receivables (credit). Discount received reduces payables (debit).",
  });

  // --- Numerical
  const n1 = { open: 9200, cs: 41500, rec: 38900, disc: 700, ret: 1100 };
  const n1v = chk(n1.open + n1.cs - n1.rec - n1.disc - n1.ret, 10000);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", calculator: true,
    value: n1v, wrong: [r2(n1.open + n1.cs - n1.rec)],
    stem: `Tendai's sales ledger control account showed trade receivables of ${money(n1.open)} at the start of the year. During the year credit sales were ${money(n1.cs)}, receipts from customers ${money(n1.rec)}, discount allowed ${money(n1.disc)} and returns inwards ${money(n1.ret)}. Calculate the closing balance of the control account.`,
    explanation: "9,200 + 41,500 − 38,900 − 700 − 1,100 = 10,000.",
  });
  const n2 = { open: 7800, close: 8350, paid: 33600, disc: 640, ret: 950 };
  const n2v = chk(n2.close - n2.open + n2.paid + n2.disc + n2.ret, 35740);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", calculator: true,
    value: n2v, wrong: [r2(n2.close - n2.open + n2.paid), r2(n2.open + n2.paid + n2.disc + n2.ret - n2.close)],
    stem: `Rudo's purchases ledger control account shows trade payables of ${money(n2.open)} at the start of the year and ${money(n2.close)} at the end. During the year she paid suppliers ${money(n2.paid)}, received discounts of ${money(n2.disc)} and returned goods worth ${money(n2.ret)}. Calculate the credit purchases for the year.`,
    hints: ["Credit purchases are the balancing figure on the credit side."],
    explanation: "Debits: 33,600 + 640 + 950 + closing balance 8,350 = 43,540. Credits: opening 7,800 + purchases. Purchases = 43,540 − 7,800 = 35,740.",
  });
  const n3 = { draft: 22300, under: 800, dishon: 350, irrec: 500 };
  const n3v = chk(n3.draft + n3.under + n3.dishon - n3.irrec, 22950);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", calculator: true,
    value: n3v, wrong: [r2(n3.draft - n3.under - n3.dishon + n3.irrec), n3.draft],
    stem: `Chipo's sales ledger control account balance is ${money(n3.draft)}. Three errors are found in the control account: (1) the sales journal total was undercast by ${money(n3.under)}; (2) a dishonoured cheque of ${money(n3.dishon)} was not entered; (3) an irrecoverable debt of ${money(n3.irrec)} written off was not entered. Calculate the corrected balance.`,
    hints: ["Which of the three increase the amount owed, and which reduce it?"],
    explanation: "The undercast and the dishonoured cheque increase receivables (+800, +350); the irrecoverable debt reduces them (−500). 22,300 + 800 + 350 − 500 = 22,950.",
  });
  const n4 = { sl: 18600, pl: 12400, contra: 900 };
  b.num({
    d: 3, skill: "APPLICATION", kind: "money",
    value: n4.pl - n4.contra, wrong: [n4.sl - n4.contra, n4.pl + n4.contra],
    stem: `Before a contra entry, the sales ledger control account has a balance of ${money(n4.sl)} and the purchases ledger control account has a balance of ${money(n4.pl)}. A contra entry of ${money(n4.contra)} is made. What is the balance on the purchases ledger control account afterwards?`,
    hints: ["A contra reduces both the amount owed by the customer and the amount owed to the supplier."],
    explanation: "A contra reduces trade payables by 900: 12,400 − 900 = 11,500 (and receivables to 17,700).",
  });

  // --- Short answer
  b.short({
    d: 1, skill: "RECALL",
    stem: "What name is given to a transaction set off between the sales ledger and the purchases ledger?",
    accepted: ["contra", "contra entry", "a contra entry", "set off", "set-off", "contra account"],
    explanation: "A contra entry cancels amounts owed in both directions between the same person's two accounts.",
  });

  // --- Self-marked
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** benefits of keeping control accounts.",
    points: ["Errors in the ledger are located: a difference between the control account and the list shows an error exists", "Explained: the search can then be limited to one ledger", "Fraud is more difficult: the control account is kept by a different person from the personal ledgers", "Explained: a clerk cannot hide a theft without changing both records"],
    modelAnswer: "A control account shows that there is an error when its balance differs from the list of balances, so the search can be limited to that ledger. If the control account is kept by a different person, a clerk cannot hide a theft without changing both records, which discourages fraud.",
    hints: ["One benefit about errors, one about control."],
    explanation: "Name each benefit and explain it.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** limitations of control accounts.",
    points: ["Some errors do not cause a difference (for example an invoice posted to the wrong customer's account)", "Explained: the totals are still equal, so the error remains hidden", "Compensating errors or omissions from both records are not found", "Explained: a difference shows only that an error exists, not where; finding it takes time"],
    modelAnswer: "Errors such as an invoice posted to the wrong customer leave the totals equal, so the control account does not reveal them. A difference shows that something is wrong but not where, so tracing it can take time.",
    hints: ["What can the control account not detect, and what does it not tell you?"],
    explanation: "Two limitations, each explained.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "A receipt of US\\$520 was posted to a customer's personal account as US\\$250. Explain how this is dealt with when reconciling the sales ledger control account with the list of balances.",
    points: ["The control account contains the correct total, so no adjustment is made to it", "The customer's balance is too high by 270, so the list of balances is reduced by 270", "After adjusting, the list and the control account agree"],
    modelAnswer: "The control account used the correct receipt, so it needs no change. The customer's account was credited with 250 instead of 520, so the balance is 270 too high and the list of balances is reduced by 270. The two totals then agree.",
    hints: ["Which record contains the error?"],
    explanation: "An error in the personal account changes the list.",
  });

  // --- Practice structured 1 (12 marks): missing figure
  const s1 = { open: 14750, close: 16900, rec: 71300, disc: 1480, ret: 2050, irrec: 520, contra: 780, dishon: 350 };
  const s1cs = chk(s1.close - s1.open - s1.dishon + s1.rec + s1.disc + s1.ret + s1.irrec + s1.contra, 77930);
  const s1md = tAccount("Sales ledger control account for the year ended 30 June 2026",
    [["1 Jul 2025", "Balance b/d", s1.open], ["30 Jun 2026", "Credit sales", s1cs], ["30 Jun 2026", "Bank: dishonoured cheque", s1.dishon]],
    [["30 Jun 2026", "Bank and cash received", s1.rec], ["30 Jun 2026", "Discount allowed", s1.disc], ["30 Jun 2026", "Returns inwards", s1.ret], ["30 Jun 2026", "Irrecoverable debts", s1.irrec], ["30 Jun 2026", "Purchases ledger control (contra)", s1.contra]],
    { cdDate: "30 Jun 2026", bdDate: "1 Jul 2026" });
  b.struct({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: `Sipho runs a building supplies business in Gweru with a year end of 30 June 2026. His records show: trade receivables at 1 July 2025 ${money(s1.open)}; trade receivables at 30 June 2026 ${money(s1.close)}; receipts from customers ${money(s1.rec)}; discount allowed ${money(s1.disc)}; returns inwards ${money(s1.ret)}; irrecoverable debts written off ${money(s1.irrec)}; a contra entry with the purchases ledger ${money(s1.contra)}; and a customer's cheque dishonoured ${money(s1.dishon)}. The credit sales figure has been lost.`,
    parts: [
      P.num({ label: "(a)", marks: 3, kind: "money", value: s1cs, wrong: [r2(s1.close - s1.open + s1.rec)], stem: "Calculate the credit sales for the year.", explanation: `Debits (opening ${fmt(s1.open)}, dishonoured cheque ${fmt(s1.dishon)}, credit sales) must equal credits (receipts, discount, returns, irrecoverable debts, contra) plus the closing balance. Credit sales = ${fmt(s1cs)}.` }),
      P.manual({ label: "(b)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Prepare the sales ledger control account for the year.", points: ["Debit: opening balance and dishonoured cheque", "Debit: credit sales (own figure)", "Credit: receipts, discount allowed and returns inwards", "Credit: irrecoverable debts, contra and balance c/d", "Totals agree and balance b/d at 1 July 2026"], modelAnswer: s1md, explanation: "Each total is entered on the correct side." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why cash sales are not included in the control account.", points: ["Cash sales are not entered in customers' personal accounts", "The control account summarises only the transactions of the sales ledger"], modelAnswer: "Cash sales are paid for immediately and are not entered in customers' personal accounts. The control account summarises only the sales ledger.", explanation: "Control accounts follow the personal ledger." }),
      P.manual({ label: "(d)", marks: 2, stem: "State **two** items that appear on the credit side of a purchases ledger control account.", points: ["Opening balance of trade payables", "Credit purchases"], modelAnswer: "The opening balance of trade payables and credit purchases.", explanation: "These increase the amounts owed to suppliers." }),
    ],
    hints: ["Credit sales are the balancing figure.", "Dishonoured cheques are debited."],
    explanation: "This item practises finding a missing figure and preparing a sales ledger control account.",
  });

  // --- Practice structured 2 (10 marks): purchases ledger reconciliation
  const s2 = { ctl: 9840, list: 9975, under: 600, paid: 460, paidWrong: 640, omitted: 285 };
  const s2ctl = chk(s2.ctl + s2.under, 10440);
  const s2list = chk(s2.list + (s2.paidWrong - s2.paid) + s2.omitted, 10440);
  const s2md = statement("Reconciliation of the purchases ledger", [
    ["Control account balance before correction", s2.ctl],
    ["Add purchases journal undercast", s2.under],
    ["Corrected control account balance", s2ctl],
    null,
    ["Total of the list of supplier balances", s2.list],
    ["Add payment of 460 recorded in a supplier's account as 640", s2.paidWrong - s2.paid],
    ["Add supplier balance omitted from the list", s2.omitted],
    ["Corrected total of the list", s2list],
  ], { cols: [U], checks: [["agree", s2ctl, s2list]] });
  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `At 30 September the purchases ledger control account of Thandeka's wholesale business shows a balance of ${money(s2.ctl)} owing to suppliers, while the total of the list of supplier balances is ${money(s2.list)}. Three errors are found:\n\n1. The purchases journal was undercast by ${money(s2.under)}.\n2. A payment of ${money(s2.paid)} to a supplier was debited to the supplier's account as ${money(s2.paidWrong)}.\n3. A supplier's balance of ${money(s2.omitted)} was omitted from the list of balances.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: s2ctl, wrong: [s2.ctl - s2.under], stem: "Calculate the corrected balance on the control account.", explanation: "An undercast journal makes the credit to the control account too low: 9,840 + 600 = 10,440." }),
      P.num({ label: "(b)", marks: 3, kind: "money", value: s2list, wrong: [r2(s2.list - (s2.paidWrong - s2.paid) - s2.omitted), r2(s2.list + s2.omitted)], stem: "Calculate the corrected total of the list of supplier balances.", explanation: "The supplier was debited 640 instead of 460, so the balance is 180 too low: +180. The omitted balance adds 285. 9,975 + 180 + 285 = 10,440." }),
      P.manual({ label: "(c)", marks: 3, type: "EXTENDED_RESPONSE", stem: "Prepare a statement reconciling the control account with the list of supplier balances.", points: ["Corrected control balance 10,440 shown with the journal adjustment", "List adjusted for the payment error (+180) and the omission (+285)", "Both corrected totals agree at 10,440"], modelAnswer: s2md, explanation: "Errors in totals adjust the control account; errors in personal accounts adjust the list." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain one limitation of reconciling the control account with the list of balances.", points: ["The reconciliation shows only that the totals agree", "Errors that do not affect the totals (for example a payment posted to the wrong supplier) remain undetected"], modelAnswer: "Agreement shows only that the totals are equal. A payment posted to the wrong supplier would not change either total, so it would remain undetected.", explanation: "Agreement does not prove the ledger is error-free." }),
    ],
    hints: ["Decide whether each error is in the totals or in the personal accounts."],
    explanation: "This item practises a purchases ledger reconciliation with errors in the control account and in the personal accounts.",
  });

  // --- Flashcards
  b.card("DEFINITION", "Control account", "A summary account that records the totals of a subsidiary ledger; its balance should equal the total of the personal balances.");
  b.card("FACT", "Sales ledger control: debit side", "Opening balance, credit sales, dishonoured cheques, interest charged to customers.");
  b.card("FACT", "Sales ledger control: credit side", "Receipts, discount allowed, returns inwards, irrecoverable debts, contras.");
  b.card("FACT", "Purchases ledger control: debit side", "Payments, discount received, returns outwards, contras.");
  b.card("FACT", "Purchases ledger control: credit side", "Opening balance and credit purchases.");
  b.card("DEFINITION", "Contra entry", "Setting off a person's account in the sales ledger against their account in the purchases ledger.");
  b.card("CONCEPT", "Error in a journal total", "Adjust the control account; the personal accounts are unaffected.");
  b.card("CONCEPT", "Error in a personal account", "Adjust the list of balances; the control account is unaffected.");
  b.card("CONCEPT", "Limitation of control accounts", "They do not reveal errors that leave the totals equal, such as posting to the wrong customer.");
});
