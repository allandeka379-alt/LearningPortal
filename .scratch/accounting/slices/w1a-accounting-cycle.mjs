// W1a: acc.fundamentals.accounting-cycle (ZIMSEC only)
import { concept, P, money, fmt, check, sum, trialBalance, tAccount, balanceOf, statement } from "../lib.mjs";

const STAGES = ["Transaction", "Source document", "Subsidiary book", "Ledger", "Trial balance", "Financial statements"];

concept("acc.fundamentals.accounting-cycle", { file: "fundamentals/accounting-cycle", keyPrefix: "fundamentals.accounting-cycle" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which stage of the accounting cycle comes **immediately after** the source document?",
    options: [
      ["Entry in a subsidiary book", "Correct: documents are first listed in a book of original entry."],
      ["Posting to the ledger", "Posting to the ledger comes after the subsidiary book."],
      ["Preparing the trial balance", "The trial balance lists ledger balances, so it comes later."],
      ["Preparing the income statement", "The financial statements are the last stage."],
    ],
    answer: "A",
    explanation: "Order: transaction → source document → subsidiary book → ledger → trial balance → financial statements.",
  });

  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the **final** stage of the accounting cycle for a period?",
    options: [
      ["Preparing the financial statements", "Correct: the statements summarise the period's results and position."],
      ["Recording the source documents", "Documents are the evidence at the start of the cycle."],
      ["Balancing the ledger accounts", "Balancing comes before the trial balance and the statements."],
      ["Listing balances in a trial balance", "The trial balance comes just before the statements."],
    ],
    answer: "A",
    explanation: "The income statement and statement of financial position end the cycle; closing balances are then carried into the next period.",
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the main purpose of the **trial balance** stage?",
    options: [
      ["To check the arithmetic accuracy of the ledger", "Correct: equal debit and credit totals show the double entry adds up."],
      ["To provide evidence that a transaction occurred", "Evidence is provided by source documents."],
      ["To sort transactions into groups by type", "Sorting by type is done in the subsidiary books."],
      ["To show the profit made in the period", "Profit is shown in the income statement."],
    ],
    answer: "A",
    explanation: "The trial balance checks that total debits equal total credits. It does not reveal every error.",
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why are transactions entered in subsidiary books before the ledger?",
    options: [
      ["To group similar items so that totals can be posted", "Correct: this saves posting every item to the nominal accounts."],
      ["To check that total debits equal total credits", "That is the job of the trial balance."],
      ["To calculate the profit for the period", "Profit is calculated in the income statement."],
      ["To provide the legal proof of each transaction", "The source document is the proof."],
    ],
    answer: "A",
    explanation: "Subsidiary books list transactions of one type together (credit sales, credit purchases, cash) so that the ledger receives organised, often totalled, entries.",
  });

  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A shop receives an invoice for goods bought on credit. In which subsidiary book is it entered?",
    options: [
      ["Purchases journal", "Correct: credit purchases of goods for resale go in the purchases journal."],
      ["Sales journal", "The sales journal records credit sales."],
      ["Cash book", "No money has changed hands yet."],
      ["Returns inwards journal", "This records goods returned by customers."],
    ],
    answer: "A",
    explanation: "Purchase invoice → purchases journal → ledger (debit purchases, credit the supplier).",
  });

  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Rudo's trial balance agrees, yet a credit sale to Moyo was posted to Moyana's account. What does this show about the cycle?",
    options: [
      ["An agreed trial balance can still hide some errors", "Correct: this error leaves debits and credits equal."],
      ["The error must have occurred in the source document", "The document was correct; the posting was wrong."],
      ["The subsidiary book stage could safely have been skipped", "Skipping it would not have prevented this error."],
      ["The trial balance totals must have been added wrongly", "The totals agree because both debit and credit entries were made."],
    ],
    answer: "A",
    explanation: "A posting to the wrong person's account (error of commission) does not affect the trial balance totals.",
    hints: ["Was a debit entry still made, and a credit entry?"],
  });

  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A customer pays a hardware shop by bank transfer. Which pair shows the source document and the subsidiary book?",
    options: [
      ["Bank statement or transfer advice; cash book", "Correct: money received through the bank is recorded in the cash book."],
      ["Sales invoice; sales journal", "The invoice was used when the credit sale was made, not when payment arrived."],
      ["Credit note; returns inwards journal", "A credit note relates to goods returned."],
      ["Receipt; general journal", "Receipts of money go in the cash book, not the general journal."],
    ],
    answer: "A",
    explanation: "All bank and cash receipts and payments are recorded in the cash book, from evidence such as receipts, transfer advices or bank statements.",
    hints: ["Which book records all money in and out of the bank?"],
  });

  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the stages of the accounting cycle in order.",
    template: "Transaction → {{blank:a}} → subsidiary book → {{blank:b}} → trial balance → {{blank:c}}",
    blanks: [
      { id: "a", accepted: ["Source document"], choices: ["Source document", "Ledger", "Financial statements"] },
      { id: "b", accepted: ["Ledger"], choices: ["Source document", "Ledger", "Financial statements"] },
      { id: "c", accepted: ["Financial statements"], choices: ["Source document", "Ledger", "Financial statements"] },
    ],
    wrong: [["Ledger", "Source document", "Financial statements"]],
    explanation: "Six stages: transaction, source document, subsidiary book, ledger, trial balance, financial statements.",
  });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each source document with the subsidiary book in which it is first recorded.",
    pairs: [
      ["Sales invoice (credit sale)", "Sales journal"],
      ["Purchase invoice (credit purchase)", "Purchases journal"],
      ["Credit note sent to a customer", "Returns inwards journal"],
      ["Cheque counterfoil", "Cash book"],
      ["Petty cash voucher", "Petty cash book"],
    ],
    explanation: "Each type of document has its own book of original entry.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each stage with its purpose.",
    pairs: [
      ["Source document", "Provides evidence of the transaction"],
      ["Subsidiary book", "Lists transactions of one type together"],
      ["Ledger", "Records the double entry in each account"],
      ["Trial balance", "Checks the arithmetic of the ledger"],
      ["Financial statements", "Show profit and financial position"],
    ],
    explanation: "Every stage organises the information a little more than the one before.",
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "In the accounting cycle, the ledger comes before the subsidiary books.",
    answer: false,
    explanation: "False. Transactions are first listed in the subsidiary books and then posted to the ledger.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The closing balances of assets, liabilities and capital at the end of one period become the opening balances of the next period.",
    answer: true,
    explanation: "True. That is why the accounting cycle is drawn as a loop: it repeats every period.",
  });

  {
    const rows = [["Bank", 3470, null], ["Purchases", 2260, null], ["Wages", 540, null], ["Motor van", 4800, null], ["Capital", null, 7500], ["Sales", null, 3190], ["Trade payables", null, 380]];
    const tb = trialBalance("Trial balance", rows);
    b.num({
      d: 2, skill: "APPLICATION", kind: "money", value: tb.debit, daily: true,
      stem: `Sipho's ledger balances at 31 May 2025 are: bank ${money(3470)}, purchases ${money(2260)}, wages ${money(540)}, motor van ${money(4800)}, capital ${money(7500)}, sales ${money(3190)} and trade payables ${money(380)}. What is the total of each column of his trial balance?`,
      wrong: [sum(rows.map((r) => (r[1] ?? 0) + (r[2] ?? 0)))],
      explanation: `Debits: 3,470 + 2,260 + 540 + 4,800 = ${money(tb.debit)}. Credits: 7,500 + 3,190 + 380 = ${money(tb.credit)}. The totals agree.`,
    });
  }

  {
    const sales = 4120, purchases = 2635, rent = 350, wages = 480;
    const gp = sales - purchases, np = gp - rent - wages;
    check("np", np, sales - purchases - rent - wages);
    b.calc({
      d: 3, skill: "APPLICATION", kind: "money", value: np, calculator: true,
      stem: `Nyasha's trial balance at 30 April 2025 includes sales ${money(sales)}, purchases ${money(purchases)}, rent ${money(rent)} and wages ${money(wages)}. She sold all her goods during April. Calculate her profit for the month in the final stage of the cycle.`,
      wrong: [gp, sales - rent - wages],
      explanation: `1. Gross profit = sales − cost of sales = ${fmt(sales)} − ${fmt(purchases)} = ${money(gp)}.\n2. Profit = ${fmt(gp)} − (${fmt(rent)} + ${fmt(wages)}) = ${money(np)}.\n\nStopping at gross profit gives ${money(gp)}.`,
      hints: ["With no closing inventory, cost of sales equals purchases.", "Deduct the expenses from gross profit."],
    });
  }

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why a business should not record a transaction without a source document.",
    points: [
      "The source document is evidence that the transaction took place and gives its details (date, amount, parties)…",
      "…so the records can be checked / errors and fraud are reduced / disputes can be settled.",
    ],
    modelAnswer: "The document proves the transaction happened and gives the correct amount and date. Without it, false or wrong entries could be made and nobody could check them later.",
    explanation: "Evidence plus a consequence.",
  });

  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "On 9 July 2025 Farai, a hardware dealer, returns damaged paint costing US\\$120 to his supplier, Chinhoyi Paints. Trace this transaction through the **first four** stages of the accounting cycle.",
    points: [
      "Transaction: goods returned to a supplier (returns outwards), US$120.",
      "Source document: credit note received from Chinhoyi Paints (or debit note sent).",
      "Subsidiary book: returns outwards journal.",
      "Ledger: debit Chinhoyi Paints account; credit returns outwards account.",
    ].map((p) => p.replace("US$", "US\\$")),
    modelAnswer: "The transaction is a return of US\\$120 of goods to a supplier. The source document is the credit note from Chinhoyi Paints. It is entered in the returns outwards journal and then posted: debit Chinhoyi Paints, credit returns outwards.",
    explanation: "One mark per stage. Returns to suppliers reduce what is owed to them, so the supplier's account is debited.",
    hints: ["Who sends the credit note when goods are returned to a supplier?"],
  });

  {
    const bankDr = [["1 Jun", "Capital", 3600], ["14 Jun", "Sales", 1945]];
    const bankCr = [["5 Jun", "Purchases", 1280], ["25 Jun", "Transport", 215]];
    const bank = balanceOf(bankDr, bankCr).amount;
    const credit = 760;
    const rows = [["Bank", bank, null], ["Purchases", 1280 + credit, null], ["Transport", 215, null], ["Capital", null, 3600], ["Sales", null, 1945], ["Mbare Wholesalers", null, credit]];
    const tb = trialBalance("Thandeka's tuck shop: trial balance at 30 June 2025", rows);
    const gp = 1945 - (1280 + credit), np = gp - 215;
    const model = tAccount("Bank account", bankDr, bankCr, { cdDate: "30 Jun", bdDate: "1 Jul" });
    const tbModel = trialBalance("Trial balance at 30 June 2025", rows).md;
    const isModel = ["**Thandeka's tuck shop**", "", "**Income statement**", "", "**for the month ended 30 June 2025**", "", statement("x", [["Sales", null, 1945], ["Less cost of sales", null, -(1280 + credit)], ["**Gross loss**", null, gp], ["Less transport", null, -215], ["**Loss for the month**", null, np]], { checks: [["gp", gp, 1945 - 2040], ["np", np, gp - 215]] }).split("\n").slice(2).join("\n")].join("\n");
    check("tb", tb.debit, tb.credit);
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: true, secs: 960,
      stem: `Thandeka opened a tuck shop at a school in Mutare on 1 June 2025. She sold all her goods by 30 June.\n\n- 1 Jun: paid ${money(3600)} of her savings into a business bank account.\n- 5 Jun: bought goods and paid by bank transfer, ${money(1280)}.\n- 10 Jun: bought goods on credit from Mbare Wholesalers, ${money(credit)}.\n- 14 Jun: banked cash sales, ${money(1945)}.\n- 25 Jun: paid transport by bank transfer, ${money(215)}.`,
      parts: [
        P.mcq({ label: "(a)", stem: "In which subsidiary book is the 10 June transaction first recorded?", options: [["Purchases journal", "Correct: a credit purchase of goods for resale."], ["Cash book", "No money was paid on 10 June."], ["Sales journal", "Thandeka bought the goods; she did not sell them."], ["General journal", "Credit purchases of goods have their own journal."]], answer: "A", explanation: "Purchase invoice → purchases journal." }),
        P.manual({ label: "(b)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare the bank account for June 2025, balanced at 30 June.", points: ["Debits: capital 3,600 and sales 1,945, correctly dated.", "Credits: purchases 1,280 and transport 215, correctly dated.", `Balance c/d ${fmt(bank)} on the credit side and totals ${fmt(3600 + 1945)} on both sides.`, `Balance b/d ${fmt(bank)} on the debit side on 1 July.`], modelAnswer: model }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: tb.debit, stem: "Calculate the total of each column of the trial balance at 30 June 2025.", wrong: [tb.debit - credit], explanation: `Debits: bank ${fmt(bank)} + purchases ${fmt(1280 + credit)} + transport 215 = ${money(tb.debit)}. Credits: capital 3,600 + sales 1,945 + Mbare Wholesalers ${fmt(credit)} = ${money(tb.credit)}.\n\n${tbModel}` }),
        P.num({ label: "(d)", marks: 2, kind: "money", value: -np, stem: "Calculate the **loss** for June 2025 (enter it as a positive amount).", wrong: [1945 - 1280 - 215], explanation: `Cost of sales = 1,280 + ${fmt(credit)} = ${money(1280 + credit)}. Gross loss = 1,945 − 2,040 = ${money(-gp)}. Loss = ${fmt(-gp)} + 215 = ${money(-np)}.\n\n${isModel}\n\nLeaving out the credit purchase gives a profit of ${money(1945 - 1280 - 215)}, which is wrong.` }),
      ],
      explanation: `Bank balance ${money(bank)}; trial balance totals ${money(tb.debit)}; loss for June ${money(-np)}. Both purchases, cash and credit, are part of cost of sales.`,
      hints: ["Only transactions through the bank go in the bank account.", "Cost of sales includes purchases on credit as well as by transfer."],
    });
  }

  b.struct({
    d: 3, skill: "UNDERSTANDING", examStyle: true, secs: 540,
    stem: "A Form 1 class is given this incomplete diagram of the accounting cycle:\n\nTransaction → **A** → Subsidiary books → **B** → Trial balance → **C** → (next period)",
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: "Name the missing stages.", template: "A: {{blank:a}}; B: {{blank:b}}; C: {{blank:c}}", blanks: [{ id: "a", accepted: ["Source documents", "Source document"] }, { id: "b", accepted: ["Ledger", "The ledger", "Ledger accounts"] }, { id: "c", accepted: ["Financial statements", "Final accounts", "Financial statement"] }], explanation: "A is source documents, B the ledger and C the financial statements." }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain why the diagram returns to the start for the next period.", points: ["The closing balances of assets, liabilities and capital are carried forward as opening balances…", "…and new transactions are recorded in the next period, so the stages repeat."], modelAnswer: "The business continues, so the closing balances become the next period's opening balances and the same stages are followed again for the new transactions." }),
      P.tf({ label: "(c)", stem: "If the trial balance totals agree, the financial statements are certain to be correct.", answer: false, explanation: "False. Errors such as omission or posting to the wrong person's account do not affect the totals." }),
    ],
    explanation: "Know the six stages in order and the purpose of each.",
    hints: ["What provides the evidence before anything is written in a book?"],
  });

  b.card("FACT", "The six stages of the accounting cycle", "Transaction → source document → subsidiary book → ledger → trial balance → financial statements (then repeat).");
  b.card("DEFINITION", "Accounting cycle", "The sequence of stages by which transactions are recorded, classified and summarised into financial statements each period.");
  b.card("DEFINITION", "Subsidiary book", "A book of original entry where transactions are first listed by type: sales, purchases and returns journals, cash book, petty cash book, general journal.");
  b.card("FACT", "Purpose of the trial balance", "Checks that total debits equal total credits; it does not reveal all errors.");
  b.card("FACT", "Purchase invoice for goods on credit: which book?", "Purchases journal; then debit purchases and credit the supplier in the ledger.");
  b.card("FACT", "Cheque counterfoil or bank transfer: which book?", "Cash book (bank column).");
  b.card("CONCEPT", "Why is the cycle drawn as a loop?", "Closing balances carry forward as opening balances, and the stages repeat every period.");
  b.card("CONCEPT", "Why use subsidiary books before the ledger?", "They group similar transactions, so totals can be posted, saving time and reducing errors.");
});
