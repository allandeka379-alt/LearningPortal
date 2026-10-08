// W1b: divisions of the ledger.
import { concept, P, money, tAccount, check, sum, r2, balanceOf, ZIM, CAM } from "../lib.mjs";

concept("acc.ledger.divisions", { file: "ledger/divisions", keyPrefix: "ledger.divisions" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which division of the ledger is the account of a **credit customer** kept?",
    options: [
      ["The sales ledger (trade receivables ledger)", "Correct: credit customers' personal accounts are kept in the sales ledger."],
      ["The purchases ledger (trade payables ledger)", "The purchases ledger holds the accounts of credit suppliers."],
      ["The nominal (general) ledger", "The nominal ledger holds income, expense, asset and capital accounts, not customers."],
      ["The cash book", "The cash book records cash and bank; a credit customer has not paid yet."],
    ],
    answer: "A",
    explanation: "Credit customers are trade receivables, so their accounts are in the **sales ledger** (ZIMSEC: trade receivables ledger).",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which division of the ledger is the **sales account** kept?",
    options: [
      ["The nominal (general) ledger", "Correct: sales is an income (nominal) account."],
      ["The sales ledger", "The sales ledger holds customers' personal accounts only."],
      ["The purchases ledger", "The purchases ledger holds credit suppliers' accounts."],
      ["The sales journal", "The sales journal is a book of prime entry, not a ledger."],
    ],
    answer: "A",
    explanation: "Sales, purchases, returns, expenses, assets, capital and drawings are all in the **nominal (general) ledger**. Only customers' accounts go in the sales ledger.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Chipo buys sewing machines for her tailoring business on credit from Mutare Machinery. In which ledger is the account of Mutare Machinery kept in Chipo's books?",
    options: [
      ["The purchases ledger (trade payables ledger)", "Correct: Mutare Machinery is a credit supplier to whom Chipo owes money."],
      ["The sales ledger (trade receivables ledger)", "Mutare Machinery sells to Chipo; it is not her customer."],
      ["The nominal (general) ledger", "The machines themselves go to an equipment account in the nominal ledger, but the supplier's account does not."],
      ["The cash book", "Nothing has been paid yet; the purchase was on credit."],
    ],
    answer: "A",
    explanation: "A business that supplies on credit is a trade payable, so its account is in the **purchases ledger**. The asset bought is debited to an equipment account in the nominal ledger.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which account is kept in the **nominal (general) ledger**?",
    options: [
      ["Motor vehicles", "Correct: assets, income, expenses and capital are kept in the nominal ledger."],
      ["Farai Gumbo, a credit customer", "Credit customers are in the sales ledger."],
      ["Harare Office Supplies, a credit supplier", "Credit suppliers are in the purchases ledger."],
      ["Thandeka Nkomo, a customer who owes US\\$120", "A customer who owes money is a trade receivable: sales ledger."],
    ],
    answer: "A",
    explanation: "The nominal ledger holds every account that is not a credit customer or credit supplier (and not the cash book): assets such as motor vehicles, income, expenses, capital, drawings and loans.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "From the purchases journal, how are the individual invoices and the total posted?",
    options: [
      ["Invoices credited to suppliers in the purchases ledger; total debited to purchases in the nominal ledger", "Correct: suppliers are owed more, and purchases (an expense) increases."],
      ["Invoices debited to suppliers in the purchases ledger; total credited to purchases in the nominal ledger", "This reverses both sides."],
      ["Invoices credited to suppliers in the sales ledger; total debited to purchases in the nominal ledger", "Suppliers' accounts are in the purchases ledger."],
      ["Invoices debited to purchases in the purchases ledger; total credited to the cash book", "Nothing is paid from the cash book for a credit purchase."],
    ],
    answer: "A",
    hints: ["Which side does a liability increase on? Which side does an expense increase on?"],
    explanation: "Each supplier is **credited** in the purchases ledger (a liability increases). The period total is **debited** to the purchases account in the nominal ledger, so the double entry balances.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Sipho sells goods to Nyasha for cash. Which ledger contains a personal account for Nyasha?",
    options: [
      ["None: cash customers have no account", "Correct: the sale is recorded in the cash book and the sales account only."],
      ["The sales (trade receivables) ledger", "Only credit customers, who owe money, need sales ledger accounts."],
      ["The nominal (general) ledger", "Personal accounts of customers are never in the nominal ledger."],
      ["The purchases (trade payables) ledger", "Nyasha is buying from Sipho, not supplying him."],
    ],
    answer: "A",
    hints: ["Why does a business open an account for a customer?"],
    explanation: "A personal account records what a customer owes. A cash customer pays immediately, so the entries are debit cash, credit sales; no personal account is needed.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "The trial balance of a business with a divided ledger does not agree. Which advantage of dividing the ledger helps most here?",
    options: [
      ["The error can be traced to one division of the ledger", "Correct: each ledger can be checked separately (with control accounts), so the search is narrowed."],
      ["Several clerks can work on the ledgers at the same time", "This is an advantage, but it does not help to find an error."],
      ["Cash customers no longer need accounts", "Cash customers never need accounts, whether or not the ledger is divided."],
      ["The double entry rules no longer apply to personal accounts", "The rules are exactly the same in every division."],
    ],
    answer: "A",
    hints: ["Think about how checking a smaller part of the books helps."],
    explanation: "Dividing the ledger lets each part be checked on its own, for example with a control account, so an error can be located in one ledger instead of searching every account.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Tendai receives a cheque from Gweru Print Centre, a credit customer. After recording it in the cash book, where is the other entry made?",
    options: [
      ["Credit Gweru Print Centre in the sales ledger", "Correct: the customer now owes less."],
      ["Debit Gweru Print Centre in the sales ledger", "A debit would increase what the customer owes."],
      ["Credit sales in the nominal ledger", "The sale was recorded when the goods were sold on credit."],
      ["Credit Gweru Print Centre in the purchases ledger", "The customer's account is in the sales ledger."],
    ],
    answer: "A",
    hints: ["The cash book holds the debit. Which account is credited?"],
    explanation: "The receipt is debited in the bank column of the cash book and **credited** to the customer's account in the **sales ledger**, reducing the trade receivable.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", applies: ZIM,
    stem: "In ZIMSEC terms, what is the trade payables ledger also called?",
    options: [
      ["The creditors' ledger", "Correct: trade payables are the creditors of the business."],
      ["The debtors' ledger", "Debtors are trade receivables: the trade receivables ledger."],
      ["The general ledger", "The general ledger holds the nominal and real accounts."],
      ["The cash book", "The cash book records cash and bank transactions."],
    ],
    answer: "A",
    explanation: "Trade payables ledger = creditors' ledger = purchases ledger (the Cambridge name). Trade receivables ledger = debtors' ledger = sales ledger.",
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "Dividing the ledger into several books changes the rules of debit and credit.",
    answer: false,
    explanation: "False. Every transaction still has an equal debit and credit; dividing the ledger only changes where the accounts are kept.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Accounts in the purchases ledger normally have credit balances.",
    answer: true,
    explanation: "True. They are the accounts of credit suppliers, to whom the business owes money: trade payables, a liability.",
  });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "A furniture maker in Bulawayo keeps a divided ledger. Match each account with the ledger in which it is kept.",
    pairs: ["Mutare Timber Merchants (supplies wood on credit)", "Wages", "Rudo Moyo (bought a table on credit)", "Machinery", "Drawings", "Gweru Varnish Ltd (credit supplier)"],
    right: ["Sales ledger (trade receivables ledger)", "Purchases ledger (trade payables ledger)", "Nominal (general) ledger"],
    rightIndex: [1, 2, 0, 2, 2, 1],
    explanation: "Credit suppliers: purchases ledger. Credit customers: sales ledger. Everything else (wages, machinery, drawings): nominal ledger.",
  });

  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "Each invoice in the sales journal is posted to the {{blank:a}} side of the customer's account in the {{blank:b}}. The total is posted to the sales account in the {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["debit"], choices: ["debit", "credit"] },
      { id: "b", accepted: ["sales ledger"], choices: ["sales ledger", "purchases ledger", "nominal ledger"] },
      { id: "c", accepted: ["nominal ledger"], choices: ["nominal ledger", "sales ledger", "purchases ledger"] },
    ],
    explanation: "Customers are debited individually in the sales ledger; the total is credited to sales in the nominal ledger.",
  });

  // Numerical: total trade receivables from a sales ledger list
  const sl = [["Chinhoyi Primary School", 860], ["Farai Dube", 245], ["Masvingo Copy Centre", 1310], ["Tatenda Sibanda", 95]];
  const slTotal = sum(sl.map((x) => x[1]));
  b.num({
    d: 2, kind: "money", value: slTotal, wrong: [r2(slTotal - 95)],
    stem: `The sales ledger of a stationery wholesaler shows these debit balances at 31 March: ${sl.map(([n, a]) => `${n} ${money(a)}`).join(", ")}. What is the total of trade receivables?`,
    explanation: `Add the debit balances in the sales ledger: $860 + 245 + 1,310 + 95 = ${slTotal.toLocaleString("en-GB")}$. Trade receivables are ${money(slTotal)}.`,
  });
  // Calculation: supplier balance in purchases ledger
  const pDr = [["", "Returns outwards", 180], ["", "Bank", 2500]];
  const pCr = [["", "Balance b/d", 1640], ["", "Purchases", 2275]];
  const pBal = balanceOf(pDr, pCr);
  check("credit", pBal.side === "Cr" ? 1 : 0, 1);
  b.calc({
    d: 3, kind: "money", value: pBal.amount, wrong: [r2(pBal.amount + 360), r2(1640 + 2275 - 2500)],
    stem: "In the purchases ledger, Harare Paper Mills' account opened with a credit balance of US\\$1,640. During the month there were purchases of US\\$2,275, returns outwards of US\\$180 and a payment by bank of US\\$2,500. Calculate the balance owed at the end of the month.",
    hints: ["Credits increase what is owed to the supplier; debits reduce it."],
    explanation: `Credits: $1,640 + 2,275 = 3,915$. Debits: $180 + 2,500 = 2,680$. Balance: $3,915 - 2,680 = ${pBal.amount.toLocaleString("en-GB")}$ credit, so ${money(pBal.amount)} is owed to the supplier. Forgetting the returns gives ${money(r2(1640 + 2275 - 2500))}.`,
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Give **three** reasons why a growing business divides its ledger.",
    points: ["Division of work: several clerks can work at the same time", "Better control / reduces the risk of fraud, as no one person keeps all the records", "Errors are easier to locate / quicker information on trade receivables and trade payables"],
    modelAnswer: "Different clerks can keep different ledgers at the same time; no single person controls all the records, which reduces fraud; and if the trial balance does not agree, the error can be traced to one ledger. It also shows quickly how much customers owe.",
    hints: ["Think about people, control, errors and information."],
    explanation: "Give different reasons rather than repeating one idea.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3, applies: CAM,
    stem: "Thandeka keeps her sales ledger on accounting software. Give **two** benefits and **one** risk of keeping the ledger digitally.",
    points: ["Benefit: entries posted automatically to both accounts / balances always up to date", "Benefit: fewer arithmetic errors / quick reports such as lists of overdue customers", "Risk: data loss or unauthorised access (needs backups and passwords) / entry made to the wrong customer account"],
    modelAnswer: "The software posts each invoice to the customer and to sales at once, so balances are always current, and it can print an aged list of overdue customers. However, data could be lost or accessed by unauthorised people unless it is backed up and password-protected.",
    hints: ["Consider speed and accuracy, then security."],
    explanation: "Digital ledgers keep the same divisions (customers, suppliers, general ledger) but automate posting.",
  });

  // Practice structured: Tatenda's books
  const sj = [["2 Jul", "Nyasha Chirwa", 1240], ["9 Jul", "Bulawayo Builders", 3180], ["16 Jul", "Nyasha Chirwa", 560], ["24 Jul", "Sipho Ndlovu", 795]];
  const sjTotal = sum(sj.map((x) => x[2]));
  const nyasha = sum(sj.filter((x) => x[1] === "Nyasha Chirwa").map((x) => x[2]));
  const salesModel = tAccount("Sales account (nominal ledger)", [], [["31 Jul", "Sundry trade receivables", sjTotal]], { balance: false });
  const nyModel = tAccount("Nyasha Chirwa account (sales ledger)", sj.filter((x) => x[1] === "Nyasha Chirwa").map((x) => [x[0], "Sales", x[2]]), [], { balance: false });
  b.struct({
    d: 4, examStyle: true, skill: "APPLICATION",
    stem: `Tatenda sells building materials in Chinhoyi and keeps a divided ledger. His sales journal for July 2025 is:\n\n| Date | Customer | US\\$ |\n| --- | --- | ---: |\n${sj.map((x) => `| ${x[0]} | ${x[1]} | ${x[2].toLocaleString("en-GB")} |`).join("\n")}`,
    parts: [
      P.num({
        label: "(a)", marks: 1, kind: "money", value: sjTotal, wrong: [r2(sjTotal - 560)],
        stem: "Calculate the total of the sales journal for July.",
        explanation: `$1,240 + 3,180 + 560 + 795 = ${sjTotal.toLocaleString("en-GB")}$.`,
      }),
      P.mcq({
        label: "(b)", stem: "Where is the total of the sales journal posted?",
        options: [["To the credit of the sales account in the nominal ledger", "Correct: the total completes the double entry for all the invoices."], ["To the debit of the sales account in the nominal ledger", "Sales is income; it increases on the credit side."], ["To the credit of each customer in the sales ledger", "Customers are debited, individually."], ["To the debit of the sales account in the sales ledger", "The sales account is not in the sales ledger."]],
        answer: "A",
        explanation: "Individual invoices are debited to customers; the total is credited to sales.",
      }),
      P.num({
        label: "(c)", marks: 1, kind: "money", value: nyasha, wrong: [1240],
        stem: "Calculate the amount owed by Nyasha Chirwa at 31 July (she had no opening balance and made no payments).",
        explanation: `$1,240 + 560 = ${nyasha.toLocaleString("en-GB")}$.`,
      }),
      P.manual({
        label: "(d)", marks: 4, type: "EXTENDED_RESPONSE",
        stem: "Show the account of Nyasha Chirwa in the sales ledger and the sales account in the nominal ledger for July. Do not balance them.",
        points: ["Nyasha Chirwa: 2 Jul Sales 1,240 on the debit side", "Nyasha Chirwa: 16 Jul Sales 560 on the debit side", `Sales account: total ${sjTotal.toLocaleString("en-GB")} on the credit side`, "Correct dates and details (Sales / Sundry trade receivables) and ledger names"],
        modelAnswer: `${nyModel}\n\n${salesModel}`,
        explanation: "Debits in the sales ledger equal the credit in the sales account.",
      }),
      P.manual({
        label: "(e)", marks: 2,
        stem: "Name the ledger in which Tatenda would keep the account of his supplier of cement, and state its normal balance.",
        points: ["Purchases ledger / trade payables ledger", "Credit balance (amount owed to the supplier)"],
        modelAnswer: "The purchases (trade payables) ledger; it normally has a credit balance because Tatenda owes the supplier.",
        explanation: "Credit suppliers are liabilities.",
      }),
    ],
    hints: ["Post each invoice to the customer; post the total to sales.", "Customers owe the business, so their accounts are debited."],
    explanation: "This item tests posting a book of prime entry to a divided ledger.",
  });

  // Practice structured 2: classify and post a cash book
  const items = [
    ["Received from Farai Mlambo, a credit customer", "Sales ledger", "Credit"],
    ["Paid Gweru Packaging, a credit supplier", "Purchases ledger", "Debit"],
    ["Paid electricity", "Nominal ledger", "Debit"],
    ["Cash sales banked", "Nominal ledger", "Credit"],
  ];
  const ledgers = ["Sales ledger", "Purchases ledger", "Nominal ledger"];
  b.struct({
    d: 3, examStyle: true, skill: "APPLICATION",
    stem: `Rudo runs a bakery in Mutare. The following items appear in her cash book for August 2025:\n\n| Item | Cash book side |\n| --- | --- |\n${items.map((x) => `| ${x[0]} | ${x[2] === "Credit" ? "Debit (receipt)" : "Credit (payment)"} |`).join("\n")}`,
    parts: [
      P.match({
        label: "(a)", stem: "For each item, choose the ledger in which the other half of the double entry is made.",
        pairs: items.map((x) => x[0]),
        right: ledgers,
        rightIndex: items.map((x) => ledgers.indexOf(x[1])),
        explanation: "Customers: sales ledger. Suppliers: purchases ledger. Electricity and sales: nominal ledger.",
      }),
      P.fib({
        label: "(b)", stem: "Choose the side of the ledger account on which each entry is made.",
        template: "Farai Mlambo's account: {{blank:a}}. Gweru Packaging's account: {{blank:b}}. Electricity account: {{blank:c}}. Sales account: {{blank:d}}.",
        blanks: items.map((x, i) => ({ id: "abcd"[i], accepted: [x[2].toLowerCase()], choices: ["debit", "credit"] })),
        explanation: "The ledger entry is always on the opposite side to the cash book entry.",
      }),
      P.manual({
        label: "(c)", marks: 2,
        stem: "Explain why the cash book is sometimes treated as a division of the ledger.",
        points: ["Its cash and bank columns are the cash and bank accounts / part of the double entry", "So no separate cash or bank account is kept in the nominal ledger"],
        modelAnswer: "The cash book is not only a book of prime entry: its columns are the cash and bank ledger accounts, so it is part of the double entry and no separate cash or bank accounts are needed.",
        explanation: "Only the other half of each cash book entry is posted to the ledger.",
      }),
    ],
    hints: ["The cash book holds one side of each entry.", "Who is the other party: a customer, a supplier, or an income or expense?"],
    explanation: "Receipts in the cash book are credited in the ledger; payments are debited.",
  });

  b.card("FACT", "What does the sales ledger hold?", "The personal accounts of credit customers (trade receivables). ZIMSEC: trade receivables (debtors') ledger.");
  b.card("FACT", "What does the purchases ledger hold?", "The personal accounts of credit suppliers (trade payables). ZIMSEC: trade payables (creditors') ledger.");
  b.card("FACT", "What does the nominal (general) ledger hold?", "All other accounts: sales, purchases, returns, income, expenses, non-current assets, inventory, capital, drawings, loans.");
  b.card("FACT", "Where is the sales **account** kept?", "In the nominal (general) ledger, not in the sales ledger.");
  b.card("CONCEPT", "Why divide the ledger?", "Division of work; better control and less fraud; easier location of errors; quick information on receivables and payables.");
  b.card("CONCEPT", "Why is the cash book part of the double entry?", "Its cash and bank columns are the cash and bank accounts, so only the other side of each entry is posted.");
  b.card("FACT", "Posting the purchases journal to a divided ledger", "Each invoice: credit the supplier (purchases ledger). Total: debit purchases (nominal ledger).");
  b.card("CONCEPT", "Ledgers kept digitally", "Software keeps customer, supplier and general ledger modules; one entry posts both sides and balances update at once. Back up and password-protect the data.");
});
