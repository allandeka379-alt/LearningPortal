// W1b: verification.principles (Cambridge only, AS Level)
import { concept, P, money, fmt, check, chk, r2, sum, rd, table, statement } from "../lib.mjs";
import { mc, U } from "../tables/w1b-lib.mjs";

concept("aacc.verification.principles", { file: "verification/principles", keyPrefix: "verification.principles" }, (b) => {
  // --- MCQ
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of the following is an **external** document?",
    right: ["A supplier's invoice", "Correct: it is prepared by the supplier and sent to the business."],
    wrong: [["A goods received note", "It is prepared inside the business by the storekeeper."], ["A purchase order", "It is prepared inside the business by the buyer."], ["An inventory (stores) record", "It is kept inside the business."]],
    explanation: "External documents come from outside the business (invoices, statements, delivery notes, bank statements).",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which document shows the goods that the business actually received and accepted?",
    right: ["Goods received note", "Correct: prepared by the storekeeper on delivery."],
    wrong: [["Purchase order", "It shows what was requested, not what arrived."], ["Supplier's statement", "It shows balances owed, not goods accepted."], ["Credit note", "It reduces the amount owed; it does not record receipt of goods."]],
    explanation: "The GRN is the internal record of what was received and its condition.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A supplier's statement is mainly used to verify which record of the business?",
    right: ["The supplier's account in the purchases ledger", "Correct: the balances are compared and differences explained."],
    wrong: [["The cash book", "The bank statement is used to verify the cash book."], ["The inventory record kept by the storekeeper", "Inventory is checked by a physical count."], ["The sales ledger", "The sales ledger is checked by sending statements to customers, not by a supplier's statement."]],
    explanation: "The supplier's statement is compared with the supplier's account in the purchases ledger (the trade payables record).",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "Which three documents are compared in three-way matching before an invoice is paid?",
    right: ["Purchase order, goods received note and supplier's invoice", "Correct: ordered, received and charged."],
    wrong: [["Purchase order, delivery note and credit note", "The GRN, not a credit note, shows what was accepted."], ["Goods received note, invoice and bank statement", "The bank statement is not part of the match."], ["Delivery note, supplier's statement and cheque counterfoil", "These are not the three documents of the match."]],
    hints: ["Which documents show what was ordered, what arrived and what was billed?"],
    explanation: "Payment is made only if order, receipt and invoice agree.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Which is a limitation of reconciling a purchases ledger account to a supplier's statement?",
    right: ["The statement may itself contain the supplier's errors", "Correct: reliance on a third party's records."],
    wrong: [["The procedure cannot find any errors in the ledger", "It can find errors, such as unrecorded invoices."], ["The statement is an internal document, so it is unreliable", "It is an external document."], ["It removes the need for the purchases journal", "The journals are still needed."]],
    hints: ["Think about who prepares the statement."],
    explanation: "A reconciliation depends on the other party's records being right; both sets may contain errors.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A supplier's statement includes an invoice that the business has not recorded because the goods are still in transit. What should the business do?",
    right: ["Check the invoice against the purchase order and GRN, then record it", "Correct: only record goods that were ordered and received."],
    wrong: [["Record it at once without checking", "It might be wrong or for goods not ordered."], ["Ignore it, because the ledger is the business's own record", "The business may genuinely owe the amount."], ["Deduct it from the supplier's statement balance", "The invoice is added to the ledger, not removed from the statement."]],
    hints: ["Which documents prove the invoice is valid?"],
    explanation: "Verify the invoice against the order and GRN. If goods are in transit, follow up before recording the liability.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A shop manager suspects that goods are being stolen from the storeroom. Which procedure is **most likely** to reveal this?",
    right: ["Comparing a physical count with the inventory records", "Correct: unexplained shortages point to theft or loss."],
    wrong: [["Reconciling the bank statement with the cash book", "This checks cash and bank entries, not goods."], ["Sending statements to credit customers", "This checks balances owed by customers."], ["Comparing invoices with purchase orders", "This checks charges for goods ordered, not goods leaving the store."]],
    hints: ["Which record shows what should be in the store?"],
    explanation: "Shortages found by comparing the count with the record may point to theft, damage or unrecorded sales.",
  });

  // --- True / false
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "External documents usually give stronger evidence than internal documents because they come from an independent source.",
    answer: true,
    explanation: "True. An invoice or bank statement is prepared by a third party, so it is independent of the business's own records.",
  });
  b.tf({
    d: 3, skill: "EVALUATION",
    stem: "If the supplier's statement agrees with the purchases ledger, it proves that the business has recorded every invoice correctly.",
    answer: false,
    hints: ["Could both records contain the same error?"],
    explanation: "False. Both the supplier and the business could have the same error, or an invoice could be missing from both.",
  });

  // --- Matching
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each document to its purpose.",
    pairs: [["Purchase order", "Requests specified goods at an agreed price"], ["Goods received note", "Records the goods delivered and accepted"], ["Credit note", "Reduces the amount owed after a return or an error"], ["Supplier's statement", "Lists the supplier's record of the balance owed"]],
    explanation: "Each document verifies a different stage of the purchase.",
  });

  // --- Fill in the blank
  b.fib({
    d: 1, skill: "RECALL",
    stem: "Complete the statements.",
    template: "A goods received note is an {{blank:a}} document prepared by the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["internal"], choices: ["internal", "external"] },
      { id: "b", accepted: ["storekeeper"], choices: ["storekeeper", "supplier", "bank"] },
    ],
    explanation: "The GRN is prepared inside the business by the storekeeper.",
  });

  // --- Numerical
  const n1 = { ledger: 4860, inv: 1240 };
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", daily: true,
    value: n1.ledger + n1.inv, wrong: [n1.ledger - n1.inv],
    stem: `The purchases ledger account of a supplier shows ${money(n1.ledger)} owing. The supplier's statement includes an invoice for ${money(n1.inv)} for goods received that the business has not yet recorded. What is the correct balance owing to the supplier after the invoice is recorded?`,
    explanation: "4,860 + 1,240 = 6,100. An unrecorded invoice increases the amount owed.",
  });
  const n2 = { stmt: 9450, cn: 620, transit: 1100, ledger: 6280 };
  const n2agreed = n2.stmt - n2.cn - n2.transit;
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", calculator: true,
    value: chk(n2agreed - n2.ledger, 1450), wrong: [n2.stmt - n2.ledger, r2(n2.ledger - n2agreed)],
    stem: `Sipho's supplier's statement shows a balance of ${money(n2.stmt)}. It does not yet include a credit note of ${money(n2.cn)} issued to Sipho or a cheque of ${money(n2.transit)} that Sipho sent. Sipho's ledger balance is ${money(n2.ledger)}, and the only other difference is an invoice that Sipho has not recorded. Calculate the amount of the unrecorded invoice.`,
    hints: ["First find the balance on the statement after the credit note and cheque."],
    explanation: "Agreed balance = 9,450 − 620 − 1,100 = 7,730. Unrecorded invoice = 7,730 − 6,280 = 1,450.",
  });
  const n3 = { qty: 250, price: 12, grn: 230 };
  b.num({
    d: 3, skill: "APPLICATION", kind: "money",
    value: n3.grn * n3.price, wrong: [n3.qty * n3.price],
    stem: `Tendai's shop ordered ${n3.qty} boxes of nails at ${money(n3.price)} a box. The storekeeper's goods received note shows ${n3.grn} boxes accepted, but the supplier's invoice charges for ${n3.qty} boxes. What amount should Tendai pay for the goods?`,
    hints: ["Pay only for goods received and accepted."],
    explanation: "230 × 12 = 2,760. The invoice (3,000) overcharges by 240, so Tendai should ask for a credit note.",
  });
  const n4 = { rec: 840, count: 806, explained: 22, cost: 4.5 };
  const n4v = chk((n4.rec - n4.count - n4.explained) * n4.cost, 54);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", calculator: true,
    value: n4v, wrong: [(n4.rec - n4.count) * n4.cost],
    stem: `A stores record shows ${n4.rec} bottles of juice; a count finds ${n4.count}. Investigation shows that ${n4.explained} bottles were sold but not recorded. The rest are unexplained. Each bottle cost ${money(4.5)}. Calculate the value of the unexplained shortage.`,
    hints: ["Subtract the explained units before valuing."],
    explanation: "Difference 34 bottles; explained 22; unexplained 12 × 4.50 = 54. Valuing the whole difference gives 153.",
  });

  // --- Short answer
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the document prepared by a storekeeper to record the goods delivered by a supplier.",
    accepted: ["goods received note", "GRN", "goods received", "goods received notes"],
    explanation: "The goods received note records goods delivered and their condition.",
  });

  // --- Self-marked
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain the purpose of three-way matching before a supplier's invoice is paid.",
    points: ["Compares the purchase order, goods received note and invoice", "Ensures the business pays only for goods ordered and received", "Prevents overpayment, duplicate or fraudulent invoices"],
    modelAnswer: "The purchase order, goods received note and invoice are compared so that the business pays only for goods that were ordered and received. This prevents overpayment and fraudulent or duplicate invoices.",
    hints: ["What does each of the three documents show?"],
    explanation: "Three points: documents compared, payment limited to goods received, control against error and fraud.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** benefits of reconciling the supplier's account in the purchases ledger with the supplier's statement.",
    points: ["Errors or omissions in the ledger are found (for example an unrecorded invoice)", "Explained: the ledger and trade payables figure become more reliable", "Disputes are identified early (for example disagreement over returns)", "Explained: prevents paying the wrong amount or damaging the supplier relationship"],
    modelAnswer: "Reconciliation finds errors such as an unrecorded invoice, so trade payables in the financial statements are more reliable. It also shows disagreements about returns or payments early, so the business avoids paying the wrong amount and keeps good relations with the supplier.",
    hints: ["One benefit about accuracy, one about disputes or control."],
    explanation: "Name each benefit and say what it achieves.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** limitations of verifying ledger accounts using documents.",
    points: ["Documents may themselves contain errors or be forged", "Explained: the same error may appear in both the ledger and the document", "Checking takes time and costs money, particularly for small businesses", "Explained: a small business may not be able to separate duties"],
    modelAnswer: "The documents may contain errors or be forged, so the ledger and the document can contain the same mistake. Checking also costs time and money, and a small business may have too few staff to separate the duties of preparing and checking documents.",
    hints: ["Think about the reliability of the document and the cost of the procedure."],
    explanation: "Two limitations, each explained.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Rudo owns a small shop and is thinking of stopping the regular physical counts of inventory to save time. Evaluate her proposal.",
    points: ["Saves time and staff costs", "Without counts, shortages from theft, damage or recording errors will not be found", "Inventory in the financial statements may be misstated, affecting profit", "Justified conclusion (for example reduce the frequency or count high-value items rather than stop)"],
    modelAnswer: "Stopping counts would save time, but shortages caused by theft, damage or unrecorded sales would not be found, and inventory and profit could be misstated. She should not stop altogether; counting high-value items regularly and the rest less often would balance cost and control.",
    hints: ["Cost against control; then a decision."],
    explanation: "A balanced answer weighs savings against the loss of control and recommends a compromise.",
  });

  // --- Practice structured 1 (10 marks): supplier statement reconciliation
  const s1 = { ledger: 5930, inv: 1320, cn: 410, transit: 940 };
  const s1agreed = s1.ledger + s1.inv;
  const s1stmt = chk(s1agreed + s1.cn + s1.transit, 8600);
  const s1md = statement("Reconciliation of the supplier's statement at 30 June 2026", [
    ["Balance per supplier's statement", s1stmt],
    ["Less credit note not yet recorded by the supplier", -s1.cn],
    ["Less cheque not yet received by the supplier", -s1.transit],
    ["Agreed balance owing", s1agreed],
  ], { cols: [U], checks: [["agreed", s1stmt - s1.cn - s1.transit, s1agreed]] });
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `At 30 June 2026 the statement from Mutare Packaging, a supplier to Chipo's bakery, shows a balance of ${money(s1stmt)}. Chipo's purchases ledger shows ${money(s1.ledger)} owing to Mutare Packaging. Chipo finds that: (1) an invoice for ${money(s1.inv)} for goods received on 29 June has not been recorded in her ledger; (2) a credit note for ${money(s1.cn)} for returned goods, recorded in her ledger, has not yet been recorded by the supplier; (3) a cheque for ${money(s1.transit)} sent on 28 June, recorded in her ledger, has not yet reached the supplier.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: s1agreed, wrong: [s1.ledger], stem: "Calculate the balance in Chipo's ledger after she records the missing invoice.", explanation: "5,930 + 1,320 = 7,250." }),
      P.manual({ label: "(b)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare a reconciliation of the supplier's statement balance to the agreed balance.", points: ["Starts with the statement balance 8,600", "Deducts credit note 410", "Deducts cheque 940", "Agreed balance 7,250 equal to the ledger"], modelAnswer: s1md, explanation: "Items the supplier has not yet recorded are removed from the statement." }),
      P.manual({ label: "(c)", marks: 2, stem: "State the journal entry Chipo should make for the unrecorded invoice.", points: ["Debit purchases 1,320", "Credit Mutare Packaging (trade payables) 1,320"], modelAnswer: "Debit purchases 1,320; credit Mutare Packaging 1,320.", explanation: "Recording the invoice increases both purchases and the amount owed." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why Chipo should check the unrecorded invoice before recording it.", points: ["It might be for goods not ordered or not received", "The price or quantity might not agree with the order and the goods received note"], modelAnswer: "The invoice may be for goods she did not order or receive, or the price or quantity may differ from the order and the goods received note.", explanation: "Verify against the purchase order and the GRN." }),
    ],
    hints: ["Add the unrecorded invoice to the ledger; deduct items the supplier has not recorded from the statement."],
    explanation: "This item practises reconciling a supplier's statement to the purchases ledger.",
  });

  // --- Practice structured 2 (8 marks): three-way matching
  const s2 = { qty: 600, price: 8.5, grn: 560, carriage: 45 };
  const s2pay = chk(s2.grn * s2.price, 4760);
  const s2over = chk(s2.qty * s2.price - s2pay, 340);
  b.struct({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: `Thandeka's hardware shop ordered ${s2.qty} bags of cement at ${money(s2.price)} each, a purchase order total of ${money(s2.qty * s2.price)}. The goods received note shows ${s2.grn} bags received in good condition; the rest were damaged on arrival and rejected. The supplier's invoice charges for ${s2.qty} bags plus ${money(s2.carriage)} carriage, which was not mentioned on the order.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: s2pay, wrong: [s2.qty * s2.price], stem: "Calculate the amount payable for the cement accepted.", explanation: "560 × 8.50 = 4,760." }),
      P.num({ label: "(b)", marks: 1, kind: "money", value: s2over, stem: "Calculate the overcharge on the cement.", explanation: "600 × 8.50 = 5,100; 5,100 − 4,760 = 340." }),
      P.manual({ label: "(c)", marks: 2, stem: "State what Thandeka should do about the overcharge and the carriage charge before paying.", points: ["Ask the supplier for a credit note for the 340 overcharge", "Query the carriage charge of 45 because it was not agreed on the order"], modelAnswer: "She should ask for a credit note for 340 and query the 45 carriage charge, which was not on the purchase order.", explanation: "Do not pay the invoice until the differences are resolved." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain two benefits to Thandeka of keeping separate people responsible for ordering, receiving and paying.", points: ["One person cannot order, receive and pay for fictitious goods (fraud is harder)", "Each person checks the work of the others, so errors are more likely to be found", "Responsibilities are clear, so problems can be traced"], modelAnswer: "If different people order, receive and pay, no one can arrange a fictitious purchase alone, which reduces the risk of fraud. Each person also checks the work of the others, so errors such as the overcharge are more likely to be noticed.", explanation: "Separation of duties is the main control." }),
    ],
    hints: ["Pay only for goods received and accepted."],
    explanation: "This item practises three-way matching and the follow-up to differences.",
  });

  // --- Flashcards
  b.card("DEFINITION", "Reconciliation", "Comparing the business's ledger account with an outside record, such as a supplier's statement, and explaining every difference.");
  b.card("DEFINITION", "Verification", "Checking an entry or balance against evidence to confirm that it is complete, correct and authorised.");
  b.card("FACT", "Internal documents", "Purchase order, goods received note, stores (inventory) record.");
  b.card("FACT", "External documents", "Supplier's invoice, credit note from a supplier, supplier's statement, bank statement, delivery note.");
  b.card("CONCEPT", "Three-way matching", "Compare the purchase order, the goods received note and the invoice before paying.");
  b.card("FACT", "Causes of differences on a supplier's statement", "Invoices or credit notes in transit, payments in transit, errors by either party.");
  b.card("CONCEPT", "Benefits of verification", "Errors and fraud found; independent evidence; disputes settled; more reliable ledgers.");
  b.card("CONCEPT", "Limitations of verification", "Errors may persist in both records; reliance on third parties; timing differences; cost; collusion.");
  b.card("CONCEPT", "Separation of duties", "Different people order, receive, record and pay, so no one person controls a whole transaction.");
});
