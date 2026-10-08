// W2a: sales and purchases journals.
import { concept, P, money, tAccount, check, sum, r2, ZIM } from "../lib.mjs";
import { dayBook, net, table } from "../tables/w2a-lib.mjs";

concept("acc.books.sales-purchases-journals", { file: "books/sales-purchases-journals", keyPrefix: "books.sales-purchases-journals" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which source document is used to write up the **sales journal**?",
    options: [
      ["Copies of the sales invoices sent to customers", "Correct: each credit sale is listed from the copy of the invoice the business sent."],
      ["Credit notes sent to customers", "Credit notes record goods returned by customers: the sales returns journal."],
      ["Receipts given to cash customers", "Cash sales are recorded in the cash book, not the sales journal."],
      ["Invoices received from the suppliers", "Suppliers' invoices are entered in the purchases journal."],
    ],
    answer: "A",
    explanation: "The sales journal lists **credit sales of goods**, and the source document for a credit sale is the sales invoice (the business keeps a copy).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Tendai runs a hardware shop in Masvingo. Which transaction is entered in his **purchases journal**?",
    options: [
      ["Paint for resale bought on credit from a wholesaler", "Correct: goods for resale bought on credit."],
      ["A cash register bought on credit from an office supplier", "A cash register is a non-current asset: general journal."],
      ["Nails for resale bought and paid for by bank transfer", "A purchase paid for immediately is recorded in the cash book."],
      ["Roofing sheets sold on credit to a builder", "This is a credit sale: sales journal."],
    ],
    answer: "A",
    explanation: "The purchases journal records **credit** purchases of **goods for resale** only. Cash purchases go to the cash book and credit purchases of non-current assets to the general journal.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How is the **total** of the purchases journal for the month posted?",
    options: [
      ["To the debit side of the purchases account", "Correct: purchases is an expense and increases on the debit side."],
      ["To the credit side of the purchases account", "That would reduce purchases; the credit side is not used for this total."],
      ["To the credit side of each supplier's account", "Suppliers are credited with their own invoices, not with the total."],
      ["To the debit side of the bank account", "Nothing has been paid yet; these are credit purchases."],
    ],
    answer: "A",
    explanation: "Each supplier is credited with its own invoice (the business owes more); the period total is debited to purchases, so total debits equal total credits.",
  });
  const g1 = 3600;
  const n1 = net(g1, 15);
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: `Farai sold goods with a list price of ${money(g1)} on credit to Sipho, allowing 15% trade discount. What amount is entered in Farai's sales journal?`,
    options: [
      [money(n1), `Correct: ${money(g1)} less 15% (${money(r2(g1 - n1))}) = ${money(n1)}.`],
      [money(g1), "This is the list price; trade discount is deducted before the sale is recorded."],
      [money(r2(g1 - n1)), "This is the trade discount itself, not the amount of the sale."],
      [money(r2(g1 * 1.15)), "This adds the discount instead of deducting it."],
    ],
    answer: "A",
    explanation: `Trade discount is never recorded in the ledger. The journal shows the net amount: $3,600 \\times 0.85 = 3,060$, so ${money(n1)}.`,
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "An invoice for goods sold to Chipo Dube is entered in the sales journal. Which posting follows from it?",
    options: [
      ["Debit Chipo Dube's account with the invoice amount", "Correct: the customer now owes the business more."],
      ["Credit Chipo Dube's account with the invoice amount", "Crediting the customer would show that she owes less."],
      ["Debit the sales account with the invoice amount", "Sales is credited, and with the period total, not each invoice."],
      ["Credit the bank account with the invoice amount", "No money has moved on a credit sale."],
    ],
    answer: "A",
    explanation: "From the sales journal each invoice is debited to the customer's account in the trade receivables (sales) ledger; the total is credited to sales.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A clerk posted a supplier's invoice of US\\$640 from the purchases journal to the **debit** of the supplier's account. What is the effect on the supplier's account?",
    options: [
      ["It shows US\\$1,280 less owed to the supplier than is correct", "Correct: a US\\$640 credit was needed; a US\\$640 debit instead makes the balance wrong by twice the amount."],
      ["It shows US\\$640 more owed to the supplier than is correct", "A debit to a supplier's account reduces the amount owed, not increases it."],
      ["It shows US\\$640 less owed to the supplier than is correct", "The credit is missing AND an extra debit is present, so the error is double."],
      ["There is no effect, because the purchases total is correct", "The purchases account is correct, but the supplier's account is wrong."],
    ],
    answer: "A",
    hints: ["What should the entry have been? What happens when the opposite entry is made instead?"],
    explanation: "The supplier should have been credited with US\\$640. Debiting instead leaves out a credit of 640 and adds a debit of 640, so the balance owed is understated by $2 \\times 640 = 1,280$.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Rudo's sales journal for August totals US\\$8,420. One invoice of US\\$390 for a **cash** sale was wrongly included. What should the sales journal total be?",
    options: [
      ["US\\$8,030", "Correct: the cash sale is removed, 8,420 − 390 = 8,030."],
      ["US\\$8,810", "This adds the cash sale again instead of removing it."],
      ["US\\$8,420", "A cash sale does not belong in the sales journal, so the total must change."],
      ["US\\$7,640", "This deducts the US\\$390 twice."],
    ],
    answer: "A",
    hints: ["Which book records cash sales?"],
    explanation: "Cash sales go in the cash book, so the US\\$390 is taken out of the sales journal: $8,420 - 390 = 8,030$.",
  });
  b.mcq({
    d: 2, skill: "RECALL", applies: ZIM,
    stem: "In a ZIMSEC sales journal, what is written in the **folio** column beside each invoice?",
    options: [
      ["The ledger page the entry was posted to", "Correct: the folio shows the entry has been posted and where."],
      ["The amount of trade discount allowed on the invoice", "Trade discount is not shown in the journal."],
      ["The number of the invoice", "The invoice number has its own column."],
      ["The date by which the customer must settle the invoice", "Credit terms are not recorded in the journal."],
    ],
    answer: "A",
    explanation: "Folio columns are cross-references: in the journal, the customer's ledger page (for example TR12); in the ledger, the journal page (for example SJ4).",
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "Trade discount is recorded in a discount allowed account in the ledger.",
    answer: false,
    explanation: "False. Trade discount is deducted on the invoice and never enters the ledger. Only **cash** discount is recorded (discount allowed or received).",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The sales journal is not part of the double-entry system; the ledger postings made from it complete the double entry.",
    answer: true,
    explanation: "True. A journal is a list. The double entry is made in the ledger: the customers are debited and the sales account is credited with the total.",
  });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Gweru Office Supplies keeps several books of prime entry. Match each transaction with the book it is recorded in.",
    pairs: ["Stationery for resale bought on credit", "Printers for resale sold on credit to a school", "Toner for resale sold to a walk-in customer for cash", "A delivery motorbike bought on credit"],
    right: ["Purchases journal", "Sales journal", "Cash book", "General journal"],
    rightIndex: [0, 1, 2, 3],
    explanation: "Credit goods bought: purchases journal. Credit goods sold: sales journal. Anything paid or received immediately: cash book. A non-current asset bought on credit: general journal.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words to complete the posting rule.",
    template: "Each invoice in the sales journal is posted to the {{blank:a}} side of the customer's account, and the journal total is posted to the {{blank:b}} side of the {{blank:c}} account.",
    blanks: [
      { id: "a", accepted: ["debit"], choices: ["debit", "credit"] },
      { id: "b", accepted: ["credit"], choices: ["credit", "debit"] },
      { id: "c", accepted: ["sales"], choices: ["sales", "purchases", "bank"] },
    ],
    explanation: "Customers are debited because they owe more; sales (income) is credited with the total.",
  });

  // Calculation: purchases journal total with trade discounts
  const pj = [["4 Mar", "Bulawayo Paints", "BP 112", net(1840, 25)], ["11 Mar", "Kariba Timber", "KT 908", 1275], ["19 Mar", "Bulawayo Paints", "BP 140", net(960, 25)], ["26 Mar", "Midlands Steel", "MS 33", net(2500, 10)]];
  const pjb = dayBook("x", pj);
  check("pj total", pjb.total, 1380 + 1275 + 720 + 2250);
  b.calc({
    d: 3, kind: "money", value: pjb.total, calculator: true, wrong: [sum([1840, 1275, 960, 2500]), r2(pjb.total - 1275)],
    stem: "Nyasha buys building materials for resale. Her suppliers' invoices for March 2025 were:\n\n" +
      table(["Date", "Supplier", "Details", "US\\$"], [["4 Mar", "Bulawayo Paints", "List price 1,840, trade discount 25%", 1840], ["11 Mar", "Kariba Timber", "No trade discount", 1275], ["19 Mar", "Bulawayo Paints", "List price 960, trade discount 25%", 960], ["26 Mar", "Midlands Steel", "List price 2,500, trade discount 10%", 2500]]) +
      "\n\nCalculate the total of Nyasha's purchases journal for March.",
    hints: ["Deduct each trade discount first.", "Then add the four net amounts."],
    explanation: `Net amounts: $1,840 \\times 0.75 = 1,380$; $1,275$; $960 \\times 0.75 = 720$; $2,500 \\times 0.90 = 2,250$. Total $1,380 + 1,275 + 720 + 2,250 = 5,625$, so ${money(pjb.total)}. Adding the list prices gives ${money(sum([1840, 1275, 960, 2500]))}, which wrongly includes trade discount.`,
  });
  // Balance on a customer's account from the sales journal
  const custDr = [net(1500, 20), net(2250, 20)];
  const custOwed = r2(sum(custDr) - 950);
  b.num({
    d: 3, kind: "money", value: custOwed, wrong: [r2(1500 + 2250 - 950), sum(custDr)],
    stem: "Thandeka sold goods to Masvingo Builders on credit twice in April: list prices US\\$1,500 and US\\$2,250, each less 20% trade discount. On 28 April Masvingo Builders paid US\\$950 by bank transfer. How much did Masvingo Builders owe Thandeka at 30 April?",
    hints: ["Post the net amounts to the debit of the customer's account."],
    explanation: `Debits: $1,500 \\times 0.8 = 1,200$ and $2,250 \\times 0.8 = 1,800$, total 3,000. Less the payment 950: ${money(custOwed)}. Using list prices gives ${money(r2(1500 + 2250 - 950))}.`,
  });
  b.num({
    d: 2, kind: "pct", value: 20, dp: 0, wrong: [25],
    stem: "An invoice shows goods listed at US\\$1,250 and a net amount due of US\\$1,000. What percentage trade discount was given? Give a whole number.",
    explanation: "Discount $1,250 - 1,000 = 250$; $\\frac{250}{1,250} \\times 100 = 20\\%$. Dividing by the net amount (250 ÷ 1,000) wrongly gives 25%.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain **one** advantage of recording credit sales in a sales journal before posting them to the ledger.",
    points: ["Advantage identified: only one total is posted to the sales account / fewer ledger entries / work can be divided between clerks / a record of credit sales for the period", "Explained: e.g. the sales account is not crowded with many small entries, so errors are fewer and the monthly credit sales figure is available at once"],
    modelAnswer: "The sales account receives one monthly total instead of every invoice, so the ledger is kept tidy and there are fewer chances of posting errors; the total also shows the credit sales for the month at a glance.",
    hints: ["Think about how many entries the sales account would get without the journal."],
    explanation: "Books of prime entry group similar transactions, reduce postings to the main ledger and allow work to be shared.",
  });

  // Practice structured 1: sales journal and posting (ZIMSEC-style with folio optional)
  const sRows = [["2 Sep", "Tatenda Phiri", "S 301", net(2800, 15)], ["8 Sep", "Hwange Lodge", "S 302", 1460], ["15 Sep", "Tatenda Phiri", "S 303", net(1200, 15)], ["23 Sep", "Kwekwe Motors", "S 304", net(3400, 15)]];
  const sj = dayBook("Sales journal (September 2025)", sRows, { nameCol: "Customer", refCol: "Invoice no.", totalLabel: "Transferred to sales account", totalDate: "30 Sep" });
  check("sj", sj.total, 2380 + 1460 + 1020 + 2890);
  const tpTotal = r2(sRows[0][3] + sRows[2][3]);
  b.struct({
    d: 4, examStyle: true, skill: "APPLICATION", calculator: true,
    stem: "Sipho owns a farm-supplies shop in Bulawayo. He allows 15% trade discount to regular trade customers. His credit sales for September 2025 were:\n\n" +
      table(["Date", "Customer", "Invoice", "List price US\\$", "Trade discount"], [["2 Sep", "Tatenda Phiri (regular)", "S 301", 2800, "15%"], ["8 Sep", "Hwange Lodge (not regular)", "S 302", 1460, "none"], ["15 Sep", "Tatenda Phiri (regular)", "S 303", 1200, "15%"], ["23 Sep", "Kwekwe Motors (regular)", "S 304", 3400, "15%"]]) +
      "\n\nOn 19 September he also sold fertiliser for US\\$520 cash.",
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "money", value: sRows[0][3], wrong: [2800], stem: "Calculate the amount entered in the sales journal for invoice S 301.", explanation: `$2,800 \\times 0.85 = ${sRows[0][3].toLocaleString("en-GB")}$.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: sj.total, wrong: [r2(sj.total + 520), sum([2800, 1460, 1200, 3400])], stem: "Calculate the total of the sales journal for September.", explanation: `Net amounts 2,380 + 1,460 + 1,020 + 2,890 = ${sj.total.toLocaleString("en-GB")}. The cash sale of US\\$520 belongs in the cash book, so it is not included.` }),
      P.manual({ label: "(c)", marks: 3, type: "EXTENDED_RESPONSE", stem: "Prepare the sales journal for September 2025.", points: ["Four invoices in date order with customer names and invoice numbers", "Net amounts 2,380, 1,460, 1,020 and 2,890; cash sale left out", "Total 7,750 transferred to sales account"], modelAnswer: sj.md, explanation: "Only credit sales at net amounts." }),
      P.num({ label: "(d)", marks: 1, kind: "money", value: tpTotal, wrong: [r2(2800 + 1200)], stem: "Calculate the total debited to Tatenda Phiri's account in September.", explanation: `$2,380 + 1,020 = ${tpTotal.toLocaleString("en-GB")}$.` }),
      P.mcq({
        label: "(e)", stem: "Which entry is made in the sales account for September?",
        options: [[`Credit ${money(sj.total)}`, "Correct: the journal total is credited to sales."], [`Debit ${money(sj.total)}`, "Sales is income: it is credited."], [`Credit ${money(sum([2800, 1460, 1200, 3400]))}`, "This uses list prices before trade discount."], [`Credit ${money(r2(sj.total + 520))}`, "The cash sale is posted from the cash book, not added to this total."]],
        answer: "A", explanation: "One credit entry for the month's credit sales.",
      }),
      P.manual({ label: "(f)", marks: 1, stem: "Explain why Hwange Lodge's invoice shows no trade discount.", points: ["Trade discount is given only to regular trade customers / Hwange Lodge is not a regular trade customer"], modelAnswer: "Sipho gives trade discount only to regular trade customers, and Hwange Lodge is not one.", explanation: "Trade discount is a policy for trade buyers, not a reward for paying quickly." }),
    ],
    hints: ["Deduct 15% only for regular customers.", "Leave the cash sale out."],
    explanation: "This item tests selecting credit sales, applying trade discount, totalling the journal and posting.",
  });

  // Practice structured 2: purchases journal with an asset trap and posting
  const pRows = [["3 Oct", "Mutare Wholesalers", "MW 51", net(4200, 20)], ["12 Oct", "Gweru Packaging", "GP 7", 690], ["21 Oct", "Mutare Wholesalers", "MW 64", net(1650, 20)]];
  const pj2 = dayBook("Purchases journal (October 2025)", pRows, { nameCol: "Supplier", refCol: "Invoice no.", totalLabel: "Transferred to purchases account", totalDate: "31 Oct" });
  check("pj2", pj2.total, 3360 + 690 + 1320);
  const mw = r2(pRows[0][3] + pRows[2][3] - 2000);
  const mwModel = tAccount("Mutare Wholesalers account", [["28 Oct", "Bank", 2000]], [["3 Oct", "Purchases", pRows[0][3]], ["21 Oct", "Purchases", pRows[2][3]]], { cdDate: "31 Oct", bdDate: "1 Nov" });
  const purchModel = tAccount("Purchases account", [["31 Oct", "Total credit purchases", pj2.total]], [], { balance: false });
  b.struct({
    d: 4, examStyle: true, skill: "APPLICATION", calculator: true,
    stem: "Chipo runs a grocery wholesale business in Mutare. Her transactions for October 2025 included:\n\n" +
      table(["Date", "Transaction"], [["3 Oct", "Bought groceries on credit from Mutare Wholesalers, list price US\\$4,200 less 20% trade discount (invoice MW 51)"], ["9 Oct", "Bought a computer for the office on credit from Gweru Packaging for US\\$880"], ["12 Oct", "Bought packaging for resale on credit from Gweru Packaging, US\\$690 (invoice GP 7)"], ["21 Oct", "Bought groceries on credit from Mutare Wholesalers, list price US\\$1,650 less 20% trade discount (invoice MW 64)"], ["28 Oct", "Paid Mutare Wholesalers US\\$2,000 by bank transfer"]]),
    parts: [
      P.mcq({
        label: "(a)", stem: "In which book of prime entry is the transaction of 9 October recorded?",
        options: [["The general journal", "Correct: a computer for office use is a non-current asset bought on credit."], ["The purchases journal", "Only goods for resale go in the purchases journal."], ["The cash book", "Nothing was paid on 9 October."], ["The sales journal", "This is a purchase, not a sale."]],
        answer: "A", explanation: "Credit purchases of non-current assets go through the general journal.",
      }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: pj2.total, wrong: [r2(pj2.total + 880), sum([4200, 690, 1650])], stem: "Calculate the total of the purchases journal for October.", explanation: `$4,200 \\times 0.8 = 3,360$; $690$; $1,650 \\times 0.8 = 1,320$. Total ${pj2.total.toLocaleString("en-GB")}. The computer (880) is excluded.` }),
      P.manual({ label: "(c)", marks: 3, type: "EXTENDED_RESPONSE", stem: "Prepare the purchases account for October and Mutare Wholesalers' account, balanced at 31 October.", points: ["Purchases account debited with 5,370 (total credit purchases)", "Mutare Wholesalers credited with 3,360 and 1,320; debited with Bank 2,000", "Balance c/d 2,680 and b/d on the credit side on 1 Nov"], modelAnswer: `${purchModel}\n\n${mwModel}`, explanation: "Suppliers are credited with each invoice; purchases is debited with the total." }),
      P.num({ label: "(d)", marks: 1, kind: "money", value: mw, wrong: [r2(4200 + 1650 - 2000)], stem: "How much does Chipo owe Mutare Wholesalers at 31 October?", explanation: `$3,360 + 1,320 - 2,000 = ${mw.toLocaleString("en-GB")}$, a credit balance.` }),
    ],
    hints: ["Ask of each item: credit? goods for resale?", "Trade discount is deducted before recording."],
    explanation: "This item tests choosing the right book, totalling the purchases journal and posting it.",
  });
  check("mw", mw, 2680);

  b.card("DEFINITION", "What is the **sales journal**?", "The book of prime entry listing credit sales of goods from copies of sales invoices. Also called the sales day book.");
  b.card("DEFINITION", "What is the **purchases journal**?", "The book of prime entry listing credit purchases of goods for resale from suppliers' invoices. Also called the purchases day book.");
  b.card("DEFINITION", "What is **trade discount**?", "A reduction in the list price for trade customers, deducted on the invoice. It is never entered in the ledger.");
  b.card("FACT", "Posting the sales journal", "Debit each customer with their invoice; credit the sales account with the period total.");
  b.card("FACT", "Posting the purchases journal", "Credit each supplier with their invoice; debit the purchases account with the period total.");
  b.card("FACT", "Where does a credit purchase of equipment go?", "In the general journal, not the purchases journal (purchases = goods for resale).");
  b.card("FACT", "Where do cash sales go?", "In the cash book. The sales journal is for credit sales only.");
  b.card("FORMULA", "Net invoice amount", "List price − trade discount, e.g. US\\$2,000 less 10% = US\\$1,800.");
  b.card("CONCEPT", "Why use a sales journal?", "It groups credit sales so only one total is posted to the sales account, keeps the ledger tidy and shows credit sales for the period.");
});
