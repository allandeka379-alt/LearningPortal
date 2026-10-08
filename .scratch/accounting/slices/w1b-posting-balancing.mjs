// W1b: posting, balancing and interpreting ledger accounts.
import { concept, P, money, tAccount, runningBalance, check, sum, r2, balanceOf, ZIM } from "../lib.mjs";

concept("acc.ledger.posting-balancing", { file: "ledger/posting-balancing", keyPrefix: "ledger.posting-balancing" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "When an account is balanced at the end of a month, on which side is the **balance carried down** (c/d) entered?",
    options: [
      ["On the side with the smaller total", "Correct: the balance c/d makes the smaller side add up to the larger total."],
      ["On the side with the larger total", "Adding it to the larger side would make the totals differ even more."],
      ["Always on the debit side", "The side depends on which total is smaller, not on a fixed rule."],
      ["Always on the credit side", "The side depends on which total is smaller, not on a fixed rule."],
    ],
    answer: "A",
    explanation: "The balance c/d is the difference between the two sides, placed on the **smaller** side so both totals agree. It is then brought down (b/d) on the opposite side.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A customer's account in the sales ledger has a **debit** balance b/d of US\\$540. What does this mean?",
    options: [
      ["The customer owes the business US\\$540", "Correct: a debit balance on a customer's account is a trade receivable."],
      ["The business owes the customer US\\$540", "That would be a credit balance on the customer's account."],
      ["The customer has paid US\\$540 in cash this month", "Payments received appear on the credit side; a balance is a net figure."],
      ["The business made sales of US\\$540 this month", "Total sales are shown in the sales account, not in one customer's balance."],
    ],
    answer: "A",
    explanation: "Credit sales are debited to the customer, payments and returns are credited. A remaining debit balance is the amount the customer still owes: an asset (trade receivable).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Tendai's bank account has a **credit** balance b/d of US\\$310 on 1 July. What does this show?",
    options: [
      ["A bank overdraft of US\\$310", "Correct: more has been paid out than paid in, so the business owes the bank."],
      ["Money in the bank of US\\$310", "Money in the bank is a debit balance (an asset)."],
      ["Interest earned of US\\$310", "Interest earned would be credited to an interest received account."],
      ["Cash sales of US\\$310 in June", "Sales are credited to the sales account, not shown as a bank balance."],
    ],
    answer: "A",
    explanation: "A credit balance on the bank account means payments exceeded receipts: the business has an **overdraft**, a current liability.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "The total of the sales journal for March is US\\$6,240. How is this total posted?",
    options: [
      ["To the credit side of the sales account", "Correct: the individual invoices are debited to the customers; the total is credited to sales."],
      ["To the debit side of the sales account", "Sales is income and increases on the credit side."],
      ["To the debit side of the bank account", "These are credit sales; no money has been received yet."],
      ["To the credit side of each customer's account", "Customers are debited (they owe more), and with individual amounts, not the total."],
    ],
    answer: "A",
    explanation: "From the sales journal, each invoice is posted to the **debit** of the customer's account and the period total to the **credit** of the sales account, so the double entry is complete.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "In Rudo's books, the account of her supplier Harare Fabrics shows: credit entries US\\$1,350 and US\\$420; debit entries US\\$900 and US\\$70. Which describes the balance?",
    options: [
      ["US\\$800 credit: Rudo owes the supplier", "Correct: credits 1,770 less debits 970 = 800 credit, a trade payable."],
      ["US\\$800 debit: the supplier owes Rudo", "The credit side is larger, so the balance is a credit."],
      ["US\\$2,740 credit: Rudo owes the supplier", "This adds both sides instead of finding the difference."],
      ["US\\$870 credit: Rudo owes the supplier", "This leaves out the US\\$70 debit entry."],
    ],
    answer: "A",
    hints: ["Total each side, then subtract the smaller total from the larger."],
    explanation: "Credits $1,350 + 420 = 1,770$; debits $900 + 70 = 970$; balance $1,770 - 970 = 800$ **credit**. A credit balance on a supplier's account is the amount Rudo still owes.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A supplier's account in the purchases ledger has a **debit** balance. Which is the most likely reason?",
    options: [
      ["Goods were returned to the supplier after the account had been paid", "Correct: the returns reduce the liability below zero, so the supplier owes the business."],
      ["The business bought more goods on credit from the supplier", "Credit purchases are credited to the supplier and increase a credit balance."],
      ["The supplier gave a trade discount on the latest invoice", "Trade discount is never entered in the ledger."],
      ["The business has not yet paid for its purchases", "Unpaid purchases leave a credit balance, the normal case."],
    ],
    answer: "A",
    hints: ["A supplier's account normally has a credit balance. What would push it to the debit side?"],
    explanation: "Debit entries in a supplier's account are payments, returns outwards and discounts received. If these exceed the credits (for example an overpayment or goods returned after payment) the supplier owes the business, so the debit balance is an asset.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In the cash book, Nyasha records a payment of electricity by bank transfer. Which ledger entry completes the double entry?",
    options: [
      ["Debit the electricity account", "Correct: the cash book already holds the credit (bank), so the other half is a debit to electricity."],
      ["Credit the electricity account", "An expense increases on the debit side."],
      ["Credit the bank account in the ledger", "The cash book is the bank account; crediting it again would record the payment twice."],
      ["Debit the capital account", "Paying a business expense does not change capital directly."],
    ],
    answer: "A",
    explanation: "The cash book is both a book of prime entry and the ledger account for cash and bank. Only the **other** account is posted: debit **electricity**.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "On 1 June, a rent account shows a debit total of US\\$2,400 for the five months to 31 May and no credit entries. What does the debit balance represent?",
    options: [
      ["The rent expense for January to May", "Correct: an expense account's debit balance is the total spent on it so far this year."],
      ["The rent the business is owed by its tenants", "That would be a rent received (income) account with a credit balance."],
      ["Rent that is still unpaid at 31 May", "Unpaid amounts are not shown by the balance itself; they need a separate year-end adjustment."],
      ["Money set aside in the bank to pay rent", "Money in the bank is shown in the bank account, not the rent account."],
    ],
    answer: "A",
    hints: ["What type of account is rent (paid)?"],
    explanation: "Rent paid is a nominal (expense) account. Its debit balance shows the expense to date, which will be transferred to the income statement (statement of profit or loss) at the year end.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", applies: ZIM,
    stem: "In a ZIMSEC ledger, the folio column of Tatenda Moyo's account shows **SJ7** beside an entry. What does SJ7 tell you?",
    options: [
      ["The entry was posted from page 7 of the sales journal", "Correct: the folio is a cross-reference to the book of prime entry and its page."],
      ["Tatenda Moyo is customer number 7", "Folios refer to pages of books, not customer numbers."],
      ["The invoice was issued on the 7th of the month", "The date is in the date column; the folio is a page reference."],
      ["The entry is the seventh sale of the year", "The folio does not count transactions."],
    ],
    answer: "A",
    hints: ["SJ stands for a book of prime entry."],
    explanation: "Folio columns record where an entry came from (SJ7 = sales journal page 7) and, in the book of prime entry, the ledger page it was posted to. They show that posting has been done and make entries easy to trace.",
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "In the three-column running balance format, a new balance is calculated after every entry.",
    answer: true,
    explanation: "True. Each line shows the debit or credit and the updated balance marked Dr or Cr, so the account never needs to be balanced off.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "If an account has a balance carried down on its credit side on 31 August, the balance brought down on 1 September is also on the credit side.",
    answer: false,
    explanation: "False. The balance b/d is always on the **opposite** side to the balance c/d. A balance c/d on the credit side means a **debit** balance b/d.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", applies: ZIM,
    stem: "Folio columns show the page of the book or ledger an entry was posted from or to.",
    answer: true,
    explanation: "True. Folios are page references used in ZIMSEC ledger work; Cambridge candidates need not use them.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each balance with what it means.",
    pairs: [
      ["Credit balance on the bank account", "A bank overdraft"],
      ["Debit balance on a customer's account", "A trade receivable"],
      ["Credit balance on a supplier's account", "A trade payable"],
      ["Debit balance on the wages account", "Wages expense to date"],
      ["Credit balance on the rent received account", "Income earned to date"],
    ],
    explanation: "Debit balances are assets, expenses or drawings; credit balances are liabilities, capital or income. The bank account is the one that can swing either way.",
  });

  // Balancing a cash account
  const cDr = [["1 Aug", "Balance b/d", 260], ["5 Aug", "Sales", 845], ["15 Aug", "Sales", 1120], ["25 Aug", "Rudo Chari", 215]];
  const cCr = [["8 Aug", "Transport", 135], ["12 Aug", "Bank", 900], ["20 Aug", "Wages", 470], ["28 Aug", "Drawings", 180]];
  const cBal = balanceOf(cDr, cCr);
  const cTotal = sum(cDr.map((x) => x[2]));
  check("cash dr side larger", cBal.side === "Dr" ? 1 : 0, 1);
  const cashTable = `| Date | Details | US\\$ | Date | Details | US\\$ |\n| --- | --- | ---: | --- | --- | ---: |\n${cDr.map((d, i) => `| ${d[0]} | ${d[1]} | ${d[2].toLocaleString("en-GB")} | ${cCr[i][0]} | ${cCr[i][1]} | ${cCr[i][2].toLocaleString("en-GB")} |`).join("\n")}`;
  b.calc({
    d: 2, kind: "money", value: cBal.amount, wrong: [sum(cCr.map((x) => x[2])), r2(cBal.amount - 260)], calculator: true,
    stem: `Calculate the balance carried down on Farai's **cash** account at the end of August.\n\n**Cash account**\n\n${cashTable}`,
    explanation: `Debit side: $260 + 845 + 1,120 + 215 = ${cTotal.toLocaleString("en-GB")}$. Credit side: $135 + 900 + 470 + 180 = ${sum(cCr.map((x) => x[2])).toLocaleString("en-GB")}$. Balance c/d (on the credit side) $= ${cTotal.toLocaleString("en-GB")} - ${sum(cCr.map((x) => x[2])).toLocaleString("en-GB")} = ${cBal.amount}$, so ${money(cBal.amount)}. Leaving out the opening balance b/d gives ${money(r2(cBal.amount - 260))}.`,
  });
  const kDr = [["1 Sep", "Balance b/d", 1075], ["8 Sep", "Sales", 2340], ["23 Sep", "Rudo Chari", 610]];
  const kCr = [["4 Sep", "Rent", 500], ["15 Sep", "Purchases", 1960], ["27 Sep", "Wages", 865]];
  const kBal = balanceOf(kDr, kCr);
  const kTotal = Math.max(sum(kDr.map((x) => x[2])), sum(kCr.map((x) => x[2])));
  b.num({
    d: 2, kind: "money", value: kTotal, wrong: [sum(kCr.map((x) => x[2])), kBal.amount],
    stem: `Farai's bank account for September is shown before balancing. What total is written on **both** sides after it is balanced?\n\n${tAccount("Bank account", kDr, kCr, { balance: false })}`,
    explanation: `The totals equal the larger side. Debit side: $1,075 + 2,340 + 610 = ${sum(kDr.map((x) => x[2])).toLocaleString("en-GB")}$; credit side: $500 + 1,960 + 865 = ${sum(kCr.map((x) => x[2])).toLocaleString("en-GB")}$. The balance c/d of ${money(kBal.amount)} goes on the credit side so both sides total ${money(kTotal)}.`,
  });
  // Running balance: customer account
  const rbRows = [
    ["1 Sep", "Balance", 730, null],
    ["4 Sep", "Sales", 1260, null],
    ["11 Sep", "Returns inwards", null, 95],
    ["18 Sep", "Bank", null, 1500],
    ["25 Sep", "Sales", 410, null],
  ];
  const rb = runningBalance("Thandeka Ndlovu account", rbRows);
  check("rb closing", rb.closing, 730 + 1260 - 95 - 1500 + 410);
  b.calc({
    d: 3, kind: "money", value: rb.closing, wrong: [r2(rb.closing - 410), r2(rb.closing + 190)],
    stem: "Masvingo Hardware sells to Thandeka Ndlovu on credit. Her account opened September with a debit balance of US\\$730. In September: sales US\\$1,260 (4 Sep), returns inwards US\\$95 (11 Sep), payment received by bank US\\$1,500 (18 Sep), sales US\\$410 (25 Sep). Calculate the balance on her account at 30 September.",
    hints: ["Sales increase what she owes; returns and payments reduce it.", "Work line by line as in a running balance account."],
    explanation: `Running balance: $730 \\rightarrow 1,990 \\rightarrow 1,895 \\rightarrow 395 \\rightarrow 805$. The balance is ${money(rb.closing)} **Dr**: Thandeka owes the business ${money(rb.closing)}. Adding the returns instead of subtracting them gives ${money(r2(rb.closing + 190))}.`,
  });

  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "When balancing an account, the balance c/d is dated the {{blank:a}} day of the period and the balance b/d is dated the {{blank:b}} day of the next period.",
    blanks: [
      { id: "a", accepted: ["last"], choices: ["last", "first", "fifteenth"] },
      { id: "b", accepted: ["first"], choices: ["first", "last", "fifteenth"] },
    ],
    explanation: "For example: balance c/d 31 May, balance b/d 1 June.",
  });
  b.fib({
    d: 3,
    stem: "Choose the correct posting for each item.",
    template: "Each invoice in the purchases journal is posted to the {{blank:a}} side of the supplier's account; the journal total is posted to the {{blank:b}} side of the purchases account.",
    blanks: [
      { id: "a", accepted: ["credit"], choices: ["credit", "debit"] },
      { id: "b", accepted: ["debit"], choices: ["debit", "credit"] },
    ],
    hints: ["Purchases is an expense; a supplier is a liability."],
    explanation: "Suppliers are credited individually (the business owes them more) and purchases is debited with the total, so total debits equal total credits.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Give **two** advantages of the three-column running balance format over the T account format.",
    points: ["The balance is shown after every entry / is always up to date", "No need to balance off the account at the end of the period / easy to see when a customer exceeds a credit limit; it is the format used by accounting software"],
    modelAnswer: "The balance is known after every transaction, so the account never has to be balanced off, and it is easy to spot a customer going over a credit limit. It is also how computerised systems display accounts.",
    hints: ["Think about what the third column shows."],
    explanation: "Credit controllers and accounting software use running balances because the current balance is always visible.",
  });

  // Practice structured: Sipho's General Dealer, motor expenses and a supplier
  const sDr = [["6 Oct", "Bank", 1850], ["11 Oct", "Returns outwards", 240], ["30 Oct", "Bank", 1150]];
  const sCr = [["1 Oct", "Balance b/d", 1850], ["9 Oct", "Purchases", 2760], ["20 Oct", "Purchases", 1045]];
  const sBal = balanceOf(sDr, sCr);
  const sTotal = Math.max(sum(sDr.map((x) => x[2])), sum(sCr.map((x) => x[2])));
  const model = tAccount("Bulawayo Wholesalers account", sDr, sCr, { cdDate: "31 Oct", bdDate: "1 Nov" });
  b.struct({
    d: 4, examStyle: true, skill: "APPLICATION",
    stem: `Sipho owns a general dealer's shop in Gweru. His account for his supplier Bulawayo Wholesalers for October 2025 is shown before balancing.\n\n${tAccount("Bulawayo Wholesalers account", sDr, sCr, { balance: false })}`,
    parts: [
      P.num({
        label: "(a)", marks: 2, kind: "money", value: sBal.amount, wrong: [sum(sCr.map((x) => x[2]))],
        stem: "Calculate the balance on the account at the end of October.",
        explanation: `Credits ${money(sum(sCr.map((x) => x[2])))} less debits ${money(sum(sDr.map((x) => x[2])))} $=$ ${money(sBal.amount)} credit.`,
      }),
      P.mcq({
        label: "(b)", stem: "On which side is the balance **brought down** on 1 November?",
        options: [["Credit side", "Correct: the balance c/d is on the debit (smaller) side, so it comes down on the credit side."], ["Debit side", "The debit side is the smaller side, which receives the balance c/d, not the b/d."], ["Both sides", "A balance is brought down on one side only."], ["Neither side, as the account is closed", "Personal accounts are carried forward."]],
        answer: "A",
        explanation: "A supplier's account normally has a credit balance b/d: the amount still owed.",
      }),
      P.manual({
        label: "(c)", marks: 4, type: "EXTENDED_RESPONSE",
        stem: "Balance the account and bring down the balance on 1 November.",
        points: [`Balance c/d ${sBal.amount.toLocaleString("en-GB")} on the debit side dated 31 Oct`, `Totals ${sTotal.toLocaleString("en-GB")} on both sides, level`, `Balance b/d ${sBal.amount.toLocaleString("en-GB")} on the credit side`, "Dated 1 Nov"],
        modelAnswer: model,
        explanation: "Total the larger side, insert the difference on the smaller side, bring it down on the opposite side.",
      }),
      P.manual({
        label: "(d)", marks: 2,
        stem: "Explain the meaning of the entry *11 Oct Returns outwards US\\$240* in this account.",
        points: ["Sipho sent goods back to Bulawayo Wholesalers (returns outwards / purchases returns)", "So he owes the supplier US\\$240 less (the liability falls)"],
        modelAnswer: "Sipho returned goods worth US\\$240 to Bulawayo Wholesalers, so the amount he owes them is reduced by US\\$240.",
        explanation: "The details column names the other account: returns outwards was credited.",
      }),
    ],
    hints: ["Total each side first.", "The balance c/d goes on the smaller side; b/d on the opposite side."],
    explanation: "This item tests balancing a personal account and interpreting its entries.",
  });

  // Practice structured 2: running balance bank account with overdraft
  const bRows = [
    ["1 Nov", "Balance", 720, null],
    ["3 Nov", "Purchases", null, 1240],
    ["10 Nov", "Sales", 1525, null],
    ["16 Nov", "Rent", null, 450],
    ["24 Nov", "Equipment", null, 1350],
    ["29 Nov", "Chipo Dube", 380, null],
  ];
  const bankRb = runningBalance("Bank account", bRows);
  const after3 = r2(720 - 1240);
  const after24 = r2(720 - 1240 + 1525 - 450 - 1350);
  check("after24", after24, -795);
  check("closing", bankRb.closing, -415);
  b.struct({
    d: 5, examStyle: true, skill: "ANALYSIS", calculator: true,
    stem: "Nyasha runs a printing business in Mutare. Her bank account had a debit balance of US\\$720 on 1 November 2025. Her bank transactions in November were:\n\n| Date | Transaction | US\\$ |\n| --- | --- | ---: |\n| 3 Nov | Paid for paper and ink (purchases) | 1,240 |\n| 10 Nov | Banked takings from sales | 1,525 |\n| 16 Nov | Paid rent | 450 |\n| 24 Nov | Bought a laminating machine (equipment) | 1,350 |\n| 29 Nov | Received from Chipo Dube, a customer | 380 |",
    parts: [
      P.num({
        label: "(a)", marks: 1, kind: "money", value: Math.abs(after3), wrong: [1960],
        stem: "Calculate the balance after the payment on 3 November. Give the amount only; you will state its side in (b).",
        explanation: `$720 - 1,240 = -520$: the account moves to a credit balance of ${money(Math.abs(after3))} (an overdraft).`,
      }),
      P.mcq({
        label: "(b)", stem: "What is the balance on 3 November?",
        options: [["US\\$520 Cr, an overdraft", "Correct: more has gone out than was in the account."], ["US\\$520 Dr, money in the bank", "The payment exceeded the balance, so it is a credit."], ["US\\$1,960 Dr, money in the bank", "This adds the payment instead of subtracting it."], ["US\\$1,960 Cr, an overdraft", "This adds the two amounts."]],
        answer: "A",
        explanation: "A credit balance on the bank account is an overdraft.",
      }),
      P.num({
        label: "(c)", marks: 2, kind: "money", value: Math.abs(bankRb.closing), wrong: [r2(Math.abs(bankRb.closing) + 720)],
        stem: "Calculate the balance at 30 November (amount only).",
        explanation: `Running balance: $720 \\rightarrow -520 \\rightarrow 1,005 \\rightarrow 555 \\rightarrow -795 \\rightarrow -415$. Closing balance ${money(Math.abs(bankRb.closing))} Cr (overdraft).`,
      }),
      P.manual({
        label: "(d)", marks: 5, type: "EXTENDED_RESPONSE",
        stem: "Prepare Nyasha's bank account for November in the three-column running balance format.",
        points: ["Headings Date, Details, Debit, Credit, Balance", "Opening balance 720 Dr", "Entries in date order in the correct column", "Balances 520 Cr, 1,005 Dr, 555 Dr, 795 Cr (own figures)", "Closing balance 415 Cr"],
        modelAnswer: bankRb.md,
        explanation: "Each balance is the previous balance plus the debit or minus the credit, labelled Dr or Cr.",
      }),
      P.manual({
        label: "(e)", marks: 2,
        stem: "State what the closing balance means for Nyasha's business and **one** risk it creates.",
        points: ["The business has a bank overdraft / owes the bank US\\$415 (a current liability)", "Risk: interest and charges, or the bank may refuse payments / demand repayment"],
        modelAnswer: "The credit balance is an overdraft of US\\$415, a current liability. The bank will charge interest, and if the limit is exceeded payments may be refused.",
        explanation: "Buying equipment from the bank account caused the overdraft; a loan might be more suitable for non-current assets.",
      }),
    ],
    hints: ["Add receipts and subtract payments one line at a time.", "A negative running total is a credit balance."],
    explanation: "Running balance accounts show the moment an account goes overdrawn, which the T format hides until the month end.",
  });

  b.card("FACT", "Where does the balance c/d go?", "On the smaller side, dated the last day of the period. The balance b/d goes on the opposite side, dated the first day of the next period.");
  b.card("CONCEPT", "Debit balance on a customer's account", "The customer owes the business: a trade receivable (asset).");
  b.card("CONCEPT", "Credit balance on a supplier's account", "The business owes the supplier: a trade payable (liability).");
  b.card("CONCEPT", "Credit balance on the bank account", "A bank overdraft: a current liability.");
  b.card("FACT", "Posting the sales journal", "Each invoice: debit the customer's account. The period total: credit sales.");
  b.card("FACT", "Posting the purchases journal", "Each invoice: credit the supplier's account. The period total: debit purchases.");
  b.card("DEFINITION", "What is the **three-column (running balance)** format?", "An account with Debit, Credit and Balance columns; the balance (Dr or Cr) is updated after every entry.");
  b.card("DEFINITION", "What is a **folio**?", "A page reference showing where an entry was posted from or to (e.g. SJ7 = sales journal page 7). ZIMSEC uses folio columns; Cambridge does not require them.", undefined, { applies: ZIM });
  b.card("FACT", "Posting from the cash book", "The cash book is the ledger account for cash and bank, so only the other account is posted (e.g. rent paid: debit rent).");
});
