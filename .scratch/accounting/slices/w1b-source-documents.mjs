// W1b: source (business) documents.
import { concept, P, money, statement, runningBalance, check, sum, r2 } from "../lib.mjs";

concept("acc.documents.source-documents", { file: "documents/source-documents", keyPrefix: "documents.source-documents" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which document does a **seller** send to a credit customer to show that the customer's account has been reduced because goods were returned?",
    options: [
      ["Credit note", "Correct: the seller credits the customer's account and tells the customer so with a credit note."],
      ["Debit note", "A debit note is sent by the buyer to the seller, usually to ask for a credit note."],
      ["Invoice", "An invoice increases what the customer owes; it is issued when goods are sold on credit."],
      ["Receipt", "A receipt acknowledges money received; no money changes hands when goods are returned."],
    ],
    answer: "A",
    explanation: "The **seller** issues a credit note for returns and allowances. It is recorded in the seller's returns inwards journal and the buyer's returns outwards journal.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who writes out a **receipt**?",
    options: [
      ["The person who receives the money", "Correct: the receipt is the receiver's written acknowledgement that payment was made."],
      ["The person who pays the money", "The payer keeps the receipt as evidence; it is written by the receiver."],
      ["The bank that clears the payment", "Banks issue bank statements; they do not write receipts for a trader's customers."],
      ["The supplier's auditor", "Auditors check records; they do not issue receipts for payments."],
    ],
    answer: "A",
    explanation: "A receipt is written by whoever **receives** the money. The payer keeps it as proof of payment; both parties record the transaction in their cash books.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Chipo buys stock on credit for her shop and receives an invoice from her supplier. In which book of prime entry does Chipo first record the invoice?",
    options: [
      ["Purchases journal", "Correct: in the buyer's books a purchase invoice for goods bought on credit goes in the purchases journal."],
      ["Sales journal", "The supplier (the seller) records its copy of the invoice in its sales journal, not Chipo."],
      ["Cash book", "No money has been paid yet: this is a credit purchase."],
      ["Returns outwards journal", "That journal records goods sent back to suppliers, supported by credit notes received."],
    ],
    answer: "A",
    explanation: "Decide whose books you are in. For the **buyer**, an invoice received for goods on credit is entered in the purchases journal; for the **seller** the same invoice is entered in the sales journal.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A business pays its electricity bill by cheque. Which document is the source for the entry in the bank column of its cash book?",
    options: [
      ["The cheque counterfoil", "Correct: the drawer keeps the counterfoil (stub) as the record of the cheque written."],
      ["A paying-in slip counterfoil", "A paying-in slip records money paid into the bank, not a payment out."],
      ["The statement of account", "Statements of account come from suppliers of goods on credit and are used only for checking."],
      ["A credit note from the supplier", "A credit note reduces an amount owed after returns; it does not record a payment."],
    ],
    answer: "A",
    explanation: "The cheque counterfoil shows the date, payee and amount of a cheque the business has written, so it supports the credit entry in the bank column of the cash book.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "The office assistant at a Gweru transport business is paid US\\$4 from petty cash for a bus fare to deliver documents. Which document supports this payment?",
    options: [
      ["A petty cash voucher", "Correct: each petty cash payment is supported by a signed petty cash voucher."],
      ["A sales invoice", "Sales invoices record goods sold on credit to customers."],
      ["A debit note", "Debit notes deal with returns and overcharges between a buyer and a supplier."],
      ["A paying-in slip", "A paying-in slip is used to deposit money into the bank, not to pay small expenses."],
    ],
    answer: "A",
    explanation: "Small cash payments are supported by **petty cash vouchers**, signed by the person receiving the money and recorded in the petty cash book.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Tatenda returned damaged goods to his supplier and received a credit note for US\\$85. In which book of prime entry should **Tatenda** record the credit note?",
    options: [
      ["Returns outwards journal", "Correct: goods sent back to a supplier are returns outwards (purchases returns) in the buyer's books."],
      ["Returns inwards journal", "Returns inwards are goods sent back to the business by its customers; this is the supplier's entry."],
      ["Purchases journal", "The purchases journal records invoices for goods bought on credit, not their return."],
      ["Sales journal", "Tatenda did not sell anything; the sales journal records credit sales."],
    ],
    answer: "A",
    hints: ["Who issued the credit note, and who received it?", "In the buyer's books, goods sent back to a supplier are returns outwards."],
    explanation: "The supplier issued the credit note and records it in its **returns inwards** journal. Tatenda, the buyer, records the same document in his **returns outwards** (purchases returns) journal, then debits the supplier's account and credits returns outwards.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which of these documents is **not** entered in any book of prime entry?",
    options: [
      ["A statement of account received from a supplier", "Correct: it only summarises invoices, credit notes and payments already recorded; it is used for checking."],
      ["A credit note received from a supplier", "This is recorded in the returns outwards journal."],
      ["A copy of an invoice sent to a customer", "This is recorded in the sales journal of the business."],
      ["The counterfoil of a cheque paid to a supplier", "This supports a payment in the bank column of the cash book."],
    ],
    answer: "A",
    hints: ["Which document only repeats information from other documents?"],
    explanation: "A statement of account is a monthly summary of transactions that have already been recorded from their own source documents. Entering it would record them twice, so it is used only to check the supplier's account in the purchases ledger.",
  });

  const qty1 = 40, price1 = 15, td1 = 0.2;
  const gross1 = qty1 * price1;
  const net1 = r2(gross1 * (1 - td1));
  b.num({
    d: 2, daily: true, kind: "money", value: net1, wrong: [gross1, r2(gross1 * td1)], calculator: true,
    stem: `A wholesaler in Bulawayo invoices a school uniform shop for ${qty1} pairs of school shoes at ${money(price1)} each, less 20% trade discount. What amount will the shop enter in its purchases journal? Give your answer in US dollars.`,
    explanation: `Gross value $${qty1} \\times ${price1} = ${gross1}$ dollars. Trade discount $20\\%$ of ${money(gross1)} $=$ ${money(r2(gross1 * td1))}. Net invoice value $=$ ${money(net1)}. Trade discount is deducted on the invoice and never recorded, so the purchases journal shows ${money(net1)}. (Entering ${money(gross1)} forgets the discount; ${money(r2(gross1 * td1))} is only the discount.)`,
  });

  const l1 = 25 * 11.2, l2 = 8 * 46;
  const g2 = sum([l1, l2]);
  const tdA = r2(g2 * 0.125);
  const n2 = r2(g2 - tdA);
  check("inv2", n2, 567);
  b.calc({
    d: 3, kind: "money", value: n2, wrong: [g2, r2(g2 - g2 * 0.1)], calculator: true,
    stem: `Rudo's Hardware, Mutare, sold goods on credit to a building contractor: 25 bags of cement at ${money(11.2)} a bag and 8 wheelbarrows at ${money(46)} each. The contractor receives a trade discount of 12.5%. Calculate the amount payable shown on the invoice.`,
    hints: ["Find the gross value of each line and add them.", "Deduct 12.5% of the gross value."],
    explanation: `The invoice total is the gross value less the trade discount: ${money(n2)}. Forgetting the discount gives ${money(g2)}.`,
    workedSolution: `1. Cement: $25 \\times 11.20 = ${l1}$ dollars.\n2. Wheelbarrows: $8 \\times 46 = ${l2}$ dollars.\n3. Gross value: $${l1} + ${l2} = ${g2}$ dollars.\n4. Trade discount: $12.5\\%$ of ${money(g2)} $=$ ${money(tdA)}.\n5. Amount payable: $${g2} - ${tdA} = ${n2}$, so ${money(n2)}.`,
  });

  const rows3 = [["1 Jul", "Balance brought forward", 1350, null], ["6 Jul", "Invoice 518", 840, null], ["12 Jul", "Credit note 41", null, 95], ["20 Jul", "Bank transfer received", null, 1350], ["29 Jul", "Invoice 562", 410, null]];
  const rb3 = runningBalance("Gweru Farm Supplies — Statement of account: Thandeka's Poultry Project, July 2025", rows3);
  const tbl3 = rb3.md.split("\n").map((line) => line.replace(/\| [0-9,]+ Dr \|$/, "|  |")).join("\n");
  b.calc({
    d: 3, kind: "money", value: rb3.closing, wrong: [r2(rb3.closing + 190), sum([840, 410])], calculator: true,
    stem: `Gweru Farm Supplies sent this statement of account (balance column removed) to a credit customer.\n\n${tbl3}\n\nCalculate the amount owed by Thandeka's Poultry Project on 31 July 2025.`,
    hints: ["Invoices increase the amount owed; credit notes and payments reduce it."],
    explanation: `Amount owed ${money(rb3.closing)}. Adding the credit note instead of deducting it gives ${money(r2(rb3.closing + 190))}; adding only the July invoices ignores the opening balance and the payment.`,
    workedSolution: `1. Start with the balance brought forward: ${money(1350)}.\n2. Add the invoices: $1,350 + 840 + 410 = 2,600$.\n3. Deduct the credit note and the payment: $2,600 - 95 - 1,350 = ${rb3.closing}$.\n4. Thandeka owes ${money(rb3.closing)}.`,
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "Trade discount shown on a purchase invoice is recorded in the discount received account.",
    answer: false,
    explanation: "False. Trade discount is deducted on the invoice and never recorded in the ledger. **Discount received** records cash discount, given for prompt payment, and it is entered from the cash book.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The counterfoil of a paying-in slip is the source document for money deposited into the business bank account.",
    answer: true,
    explanation: "True. The paying-in slip (deposit slip) lists the cash and cheques paid in; its stamped counterfoil supports the debit in the bank column of the cash book.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A debit note is issued by a seller to a customer who has been undercharged on an invoice.",
    answer: false,
    explanation: "False. A debit note is normally sent by a **buyer** to a supplier to request a credit note for returned goods or an overcharge. An undercharge would be corrected by the seller issuing a supplementary invoice.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Farai owns a hardware shop. Match each document to the book of prime entry in which **Farai** records it.",
    pairs: [
      ["Copy of an invoice Farai sent to a credit customer", "Sales journal"],
      ["Credit note Farai received from a supplier", "Returns outwards journal"],
      ["Credit note Farai sent to a customer", "Returns inwards journal"],
      ["Signed voucher for cleaning materials paid from the float", "Petty cash book"],
      ["Counterfoil of a cheque Farai wrote to pay rent", "Cash book"],
    ],
    explanation: "Invoices sent go in the **sales journal**; credit notes received (goods returned to suppliers) in the **returns outwards journal**; credit notes sent (goods returned by customers) in the **returns inwards journal**; petty cash vouchers in the **petty cash book**; cheque counterfoils in the **cash book**.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct word for each blank.",
    template: "An invoice is prepared by the {{blank:a}}. The buyer records it in the {{blank:b}} journal, and any trade discount on it is {{blank:c}} in the ledger.",
    blanks: [
      { id: "a", accepted: ["seller"], choices: ["seller", "buyer", "bank"] },
      { id: "b", accepted: ["purchases"], choices: ["purchases", "sales", "general"] },
      { id: "c", accepted: ["not recorded"], choices: ["not recorded", "debited", "credited"] },
    ],
    explanation: "The **seller** issues the invoice. The buyer enters it in the **purchases** journal at the net amount: trade discount is **not recorded** anywhere in the ledger.",
  });
  b.mcq({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: `An invoice received by Sipho's Building Supplies shows goods at a list price of ${money(1200)}, a trade discount of 10% and the terms "5% cash discount if paid within 7 days". What amount should Sipho enter in the purchases journal?`,
    options: [
      [money(1080), "Correct: list price less the 10% trade discount. Cash discount is only recorded if and when the invoice is paid early."],
      [money(1200), "This ignores the trade discount, which is always deducted on the invoice."],
      [money(1026), "This also deducts the cash discount, which is not known to be earned when the invoice is recorded."],
      [money(1050), "This deducts 12.5% from the list price, adding the two discount rates together."],
    ],
    answer: "A",
    hints: ["Which discount is deducted on the invoice itself?", "Cash discount depends on paying early; it is recorded in the cash book if it is taken."],
    explanation: `Trade discount: $10\\%$ of ${money(1200)} $=$ ${money(120)}, so the invoice is ${money(1080)}. The cash discount (5% of ${money(1080)} $=$ ${money(54)}) is recorded only if Sipho pays within 7 days, in the cash book and the discount received account.`,
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A tuck shop owner in Chinhoyi changes from handwritten receipt books to receipts produced by an app on her phone. Which statement is correct?",
    options: [
      ["The digital receipts are still source documents and must be backed up.", "Correct: a document's form does not matter; it is still the evidence for the entry and must be kept safe."],
      ["Digital receipts need not be kept because the app adds up the takings.", "The records still need evidence; totals alone cannot be checked against individual sales."],
      ["Digital receipts must be printed or they cannot be used as evidence.", "Digital documents are accepted as evidence if they are complete and kept securely."],
      ["Digital receipts replace the need for a cash book.", "The receipts are source documents; the cash book is still the book that records cash and bank."],
    ],
    answer: "A",
    hints: ["Does changing paper for a screen change the purpose of the document?"],
    explanation: "Digital documents are source documents just like paper ones. They are faster to produce and copy, but they must be protected with passwords and back-ups so that the evidence for each entry is not lost or altered.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Give **two** reasons why a business should keep its source documents after the transactions have been recorded.",
    points: ["Evidence that a transaction took place / to support the entries if questioned (e.g. by an auditor, tax authority or the owner)", "To check or correct the records later, e.g. compare with statements of account or trace an error"],
    modelAnswer: "They prove that each transaction happened and support the entries if anyone questions them, and they allow the records to be checked against statements and errors to be traced and corrected.",
    hints: ["Think about who might ask to see proof, and what happens when an error is found."],
    explanation: "Source documents are the **evidence** behind the books. Keeping them allows entries to be verified (by the owner, auditors or the tax authority) and lets errors be traced back to the original transaction.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Distinguish between **trade discount** and **cash discount**, stating which one is recorded in the ledger.",
    points: ["Trade discount: a reduction in the list price for trade customers / bulk buying, deducted on the invoice", "Cash discount: a reduction for paying within a stated time (prompt payment)", "Only cash discount is recorded (discount allowed / received); trade discount is not recorded"],
    modelAnswer: "Trade discount is a reduction in list price given to trade customers, often for buying in bulk, and is deducted on the invoice. Cash discount is given for paying within a stated period. Only cash discount is recorded in the ledger, as discount allowed or discount received.",
    hints: ["When is each discount given?"],
    explanation: "Trade discount reduces the price **before** the sale is recorded, so the books show only the net invoice value. Cash discount is a reward for prompt payment and is recorded when the payment is made.",
  });

  // Practice structured 1
  const items = [["10 Jun", "Sent an invoice for goods sold on credit to Nyasha"], ["14 Jun", "Received a credit note from Harare Paints for damaged paint returned"], ["18 Jun", "Wrote a cheque to pay the landlord for June rent"], ["22 Jun", "Banked the week's cash takings using a paying-in slip"]];
  const inv = { qty: 30, price: 9.5, td: 0.15 };
  const ig = r2(inv.qty * inv.price);
  const it = r2(ig * inv.td);
  const inet = r2(ig - it);
  b.struct({
    d: 4, examStyle: true, skill: "APPLICATION", calculator: true,
    stem: `Farai owns Farai's Hardware in Kwekwe. The following documents relate to June 2025.\n\n| Date | Document |\n| --- | --- |\n${items.map(([dt, t]) => `| ${dt} | ${t} |`).join("\n")}\n\nThe invoice on 10 June was for ${inv.qty} tins of varnish at ${money(inv.price)} each, less 15% trade discount.`,
    parts: [
      P.match({
        label: "(a)", stem: "Match each document with the book of prime entry in which Farai records it.",
        pairs: ["10 Jun invoice sent", "14 Jun credit note received", "18 Jun cheque counterfoil", "22 Jun paying-in slip counterfoil"],
        right: ["Sales journal", "Returns outwards journal", "Cash book", "Purchases journal"],
        rightIndex: [0, 1, 2, 2],
        explanation: "Invoices sent: sales journal. Credit notes received: returns outwards journal. Both the cheque counterfoil (payment) and the paying-in slip counterfoil (receipt) support entries in the bank column of the cash book.",
      }),
      P.num({
        label: "(b)", marks: 2, kind: "money", value: inet, wrong: [ig],
        stem: "Calculate the amount Farai records in his books for the invoice sent on 10 June.",
        explanation: `Gross $${inv.qty} \\times ${inv.price} = ${ig}$; trade discount $15\\%$ $=$ ${money(it)}; net ${money(inet)}. Only the net amount is recorded.`,
      }),
      P.mcq({
        label: "(c)", stem: "On 30 June Farai sends Nyasha a document listing the opening balance, invoices, credit notes and payments for June and the amount she owes. What is this document?",
        options: [["A statement of account", "Correct: a monthly summary sent by a seller to a credit customer."], ["A bank statement", "A bank statement is issued by a bank to its own customer."], ["A debit note", "A debit note concerns returns or overcharges, not a monthly summary."], ["A sales invoice", "An invoice records one credit sale."]],
        answer: "A",
        explanation: "A **statement of account** summarises a customer's transactions for the month and shows the balance owed.",
      }),
      P.manual({
        label: "(d)", marks: 2,
        stem: "Explain why Farai does **not** enter the document in (c) in a book of prime entry.",
        points: ["It only summarises transactions already recorded from invoices, credit notes and receipts", "Entering it would record them twice / it is used only for checking (by the customer)"],
        modelAnswer: "Every item on it has already been recorded from its own source document, so entering it again would double-count; it is sent so the customer can check the balance.",
        explanation: "The statement is a checking document, not an original record.",
      }),
    ],
    hints: ["Decide whether Farai is the seller or the buyer for each document.", "Trade discount is deducted before anything is recorded."],
    explanation: "This question tests matching documents to books, the net value of an invoice and the purpose of a statement of account.",
  });

  // Practice structured 2
  const rows5 = [["1 Sep", "Balance", 2140, null], ["5 Sep", "Invoice 903", 1275, null], ["9 Sep", "Credit note 66", null, 140], ["15 Sep", "Cheque received", null, 2140], ["26 Sep", "Invoice 951", 860, null], ["28 Sep", "Credit note 71", null, 75]];
  const rb5 = runningBalance("Mutare Timber Merchants — Statement of account: Tatenda Furniture Makers, September 2025", rows5);
  const tbl5 = rb5.md.split("\n").map((line) => line.replace(/\| [0-9,]+ Dr \|$/, "|  |")).join("\n");
  b.struct({
    d: 4, examStyle: true, skill: "ANALYSIS", calculator: true,
    stem: `Tatenda makes furniture in Mutare and buys timber on credit. He received the following statement (the balance column has been left blank).\n\n${tbl5}`,
    parts: [
      P.num({
        label: "(a)", marks: 2, kind: "money", value: rb5.closing, wrong: [r2(rb5.closing + 2 * 215)],
        stem: "Calculate the amount Tatenda owes Mutare Timber Merchants on 30 September 2025.",
        explanation: `$2,140 + 1,275 + 860 - 140 - 2,140 - 75 = ${rb5.closing}$, so ${money(rb5.closing)}.`,
      }),
      P.mcq({
        label: "(b)", stem: "In Tatenda's own purchases ledger, how should the account of Mutare Timber Merchants appear on 30 September?",
        options: [[`A credit balance of ${money(rb5.closing)}`, "Correct: Tatenda owes the supplier, so in his books the supplier is a liability with a credit balance."], [`A debit balance of ${money(rb5.closing)}`, "The statement shows a debit because it is written from the seller's point of view; Tatenda's books show the mirror image."], [`A credit balance of ${money(sum([1275, 860]))}`, "This adds only the September invoices and ignores the returns and opening balance."], [`A debit balance of ${money(sum([140, 75]))}`, "This is only the total of the credit notes."]],
        answer: "A",
        explanation: "A supplier's statement is written from the supplier's side (Tatenda is its debtor). In Tatenda's books the supplier is a trade payable: a **credit** balance of the same amount.",
      }),
      P.fib({
        label: "(c)", stem: "Complete the sentences.",
        template: "The credit notes on the statement were issued by {{blank:a}}. Tatenda recorded them in his {{blank:b}} journal.",
        blanks: [
          { id: "a", accepted: ["Mutare Timber Merchants"], choices: ["Mutare Timber Merchants", "Tatenda Furniture Makers", "the bank"] },
          { id: "b", accepted: ["returns outwards"], choices: ["returns outwards", "returns inwards", "purchases"] },
        ],
        explanation: "The **seller** issues credit notes. The buyer records them as **returns outwards** (purchases returns).",
      }),
      P.manual({
        label: "(d)", marks: 2,
        stem: "Name **two** of Tatenda's own records or documents he should check the statement against.",
        points: ["Purchases journal / invoices received", "Returns outwards journal / credit notes received, or the cash book / cheque counterfoils, or the supplier's account in his purchases ledger"],
        modelAnswer: "His purchases journal (invoices received) and his cash book (cheque counterfoils); also the returns outwards journal and the supplier's account.",
        explanation: "Each line on the statement should match one of Tatenda's own records.",
      }),
    ],
    hints: ["Invoices increase the amount owed; credit notes and payments reduce it.", "The supplier writes the statement from its own point of view."],
    explanation: "A statement of account is checked against the buyer's own books; the balances should be mirror images.",
  });

  b.card("DEFINITION", "What is a **source document**?", "A business document (paper or digital) that provides evidence of a transaction and the details needed to record it.", "Examples: invoice, credit note, receipt, cheque counterfoil, paying-in slip, petty cash voucher.");
  b.card("FACT", "Who issues an invoice, and where is it recorded?", "The seller. Seller: sales journal. Buyer: purchases journal.");
  b.card("FACT", "Who issues a credit note, and where is it recorded?", "The seller. Seller: returns inwards journal. Buyer: returns outwards journal.");
  b.card("DEFINITION", "What is a **debit note**?", "A document sent by a buyer to a seller about goods returned or an overcharge, usually requesting a credit note.");
  b.card("FACT", "Is trade discount recorded in the ledger?", "No. It is deducted on the invoice; only the net amount is recorded.", "Cash discount (for prompt payment) is recorded, as discount allowed or discount received.");
  b.card("FACT", "Source documents for the bank column of the cash book", "Payments: cheque counterfoils (and bank transfer records). Receipts: paying-in slip counterfoils (and receipts issued).");
  b.card("FACT", "What supports a petty cash payment?", "A petty cash voucher signed by the person receiving the money; it is entered in the petty cash book.");
  b.card("CONCEPT", "Why is a statement of account not entered in the books?", "It only summarises invoices, credit notes and payments already recorded; it is used to check the balance.");
  b.card("CONCEPT", "Bank statement: purpose", "Sent by the bank; used to check and update the cash book (charges, transfers, interest) and to prepare a bank reconciliation.");
});
