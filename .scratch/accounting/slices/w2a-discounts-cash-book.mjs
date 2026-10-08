// W2a: trade and cash discounts; the three-column cash book.
import { concept, P, money, tAccount, check, sum, r2 } from "../lib.mjs";
import { cashBook, table } from "../tables/w2a-lib.mjs";

const U = String.raw`US\$`;
const disc = (amt, pct) => r2((amt * pct) / 100);

concept("acc.books.discounts-cash-book", { file: "books/discounts-cash-book", keyPrefix: "books.discounts-cash-book" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is **never** entered in the ledger?",
    options: [
      ["Trade discount", "Correct: it is deducted on the invoice, so sales and purchases are already recorded net."],
      ["Discount allowed", "Discount allowed is posted to its own expense account."],
      ["Discount received", "Discount received is posted to its own income account."],
      ["Returns inwards", "Returns inwards are posted to the returns inwards account."],
    ],
    answer: "A",
    explanation: "Trade discount reduces the price before the transaction is recorded; cash discounts are recorded because they reduce a debt that is already in the books.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How is **discount allowed** treated in the income statement (statement of profit or loss)?",
    options: [
      ["As an expense", "Correct: it is a cost of getting customers to pay promptly."],
      ["As other income added to gross profit", "That is the treatment of discount received."],
      ["As a deduction from sales", "Returns inwards are deducted from sales; discounts allowed are an expense."],
      ["As a deduction from purchases", "Neither discount is deducted from purchases."],
    ],
    answer: "A",
    explanation: "Discount allowed is money given up by the business: an **expense**. Discount received is **income**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In a three-column cash book, where is **discount received** entered?",
    options: [
      ["In the discount column on the credit side", "Correct: it is written beside the payment to the supplier."],
      ["In the discount column on the debit side", "The debit discount column is for discount allowed to customers."],
      ["In the cash column on the credit side", "The discount is not money paid out; it has its own column."],
      ["It is not entered in the cash book", "Cash discounts are recorded in the discount columns of the cash book."],
    ],
    answer: "A",
    explanation: "Discount received goes with payments (credit side); discount allowed goes with receipts (debit side).",
  });
  const inv = 2600;
  const pay4 = r2(inv - disc(inv, 4));
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: `Chipo owes Kwekwe Traders ${money(inv)}. They offer 4% cash discount for payment within 10 days, and she pays on day 7. How much does she pay?`,
    options: [
      [money(pay4), `Correct: ${money(inv)} less 4% (${money(disc(inv, 4))}).`],
      [money(inv), "She paid within 10 days, so she is entitled to the discount."],
      [money(disc(inv, 4)), "This is the discount, not the amount paid."],
      [money(r2(inv * 1.04)), "This adds the discount instead of deducting it."],
    ],
    answer: "A",
    explanation: `Cash discount $2,600 \\times 4\\% = 104$; payment $2,600 - 104 = 2,496$.`,
  });
  const lp = 3500;
  const netInv = r2(lp * 0.8);
  const paid5 = r2(netInv - disc(netInv, 2.5));
  check("paid5", paid5, 2730);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Sipho buys goods with a list price of US\\$3,500. The supplier gives 20% trade discount and 2.5% cash discount for payment within 14 days. Sipho pays within 14 days. How much does he pay?",
    options: [
      [money(paid5), "Correct: 3,500 less 20% = 2,800; less 2.5% of 2,800 (70) = 2,730."],
      [money(r2(lp * (1 - 0.225))), "This adds the two percentages; cash discount is worked out on the invoice amount after trade discount."],
      [money(netInv), "This ignores the cash discount he earned by paying in time."],
      [money(r2(lp - disc(lp, 2.5))), "This ignores the trade discount."],
    ],
    answer: "A",
    hints: ["Deduct trade discount first.", "Then work out cash discount on the invoice amount."],
    explanation: "Invoice $3,500 \\times 0.8 = 2,800$; cash discount $2,800 \\times 2.5\\% = 70$; payment $2,800 - 70 = 2,730$. Trade discount US\\$700 is never recorded; the US\\$70 is recorded as discount received.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Thandeka owed Rudo US\\$900 and paid US\\$873 by bank transfer in full settlement. Which entries appear on the **credit** side of Thandeka's account in Rudo's books?",
    options: [
      ["Bank US\\$873 and discount allowed US\\$27", "Correct: both the payment and the discount reduce what Thandeka owes."],
      ["Bank US\\$900 only", "Only US\\$873 was received; the US\\$27 is a discount."],
      ["Bank US\\$873 only", "Without the discount the account would still show US\\$27 owing."],
      ["Bank US\\$873 and discount received US\\$27", "Rudo allowed the discount to her customer, so it is discount allowed."],
    ],
    answer: "A",
    hints: ["Which discount does a business give to its customers?"],
    explanation: "The customer is credited with the money (873) and with the discount allowed (27), which together clear the debt of 900.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "At the end of the month, how is the total of the discount column on the **debit** side of the cash book posted?",
    options: [
      ["To the debit of the discount allowed account", "Correct: the total of discounts allowed is an expense, debited."],
      ["To the credit of the discount allowed account", "The customers have been credited individually; the total goes to the debit of discount allowed."],
      ["To the credit of the discount received account", "The debit column holds discounts allowed, not received."],
      ["It is carried down as a balance in the cash book", "Discount columns are totalled but never balanced or carried down."],
    ],
    answer: "A",
    hints: ["The debit discount column lists discounts given to customers."],
    explanation: "Debit discount allowed with the total; each customer has already been credited with their own discount.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Farai's total discount received for the year was US\\$640, but it was entered as discount **allowed**. What is the effect on his profit for the year?",
    options: [
      ["Profit is understated by US\\$1,280", "Correct: income of 640 is missing and an extra expense of 640 is included."],
      ["Profit is understated by US\\$640", "Both the missing income and the extra expense reduce profit: the effect is double."],
      ["Profit is overstated by US\\$1,280", "Treating income as an expense lowers profit, not raises it."],
      ["There is no effect on profit", "Discount allowed is an expense and discount received is income, so profit changes."],
    ],
    answer: "A",
    hints: ["What should have happened to profit? What happened instead?"],
    explanation: "Correctly, 640 is added as income. Instead 640 is deducted as an expense, so profit is $640 + 640 = 1,280$ too low.",
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "The discount columns of a three-column cash book are balanced at the end of each period like the cash and bank columns.",
    answer: false,
    explanation: "False. They are memorandum columns: each is totalled and the totals are posted to the discount allowed and discount received accounts.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "If a customer pays after the cash discount period has ended, no discount is recorded.",
    answer: true,
    explanation: "True. Cash discount is earned only by paying within the stated time; otherwise the full amount is due.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each item with its correct treatment.",
    pairs: [
      ["Trade discount", "Deducted on the invoice; not recorded in the ledger"],
      ["Discount allowed total", "Debited to the discount allowed account"],
      ["Discount received total", "Credited to the discount received account"],
      ["Discount allowed in the income statement", "Shown as an expense"],
      ["Discount received in the income statement", "Added to gross profit as other income"],
    ],
    explanation: "Only cash discounts are recorded: allowed (expense, debit) and received (income, credit).",
  });

  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Discount allowed is entered on the {{blank:a}} side of the three-column cash book, on the same line as the {{blank:b}} from the customer.",
    blanks: [
      { id: "a", accepted: ["debit"], choices: ["debit", "credit"] },
      { id: "b", accepted: ["receipt"], choices: ["receipt", "payment", "invoice"] },
    ],
    explanation: "Discount allowed goes with receipts (debit side); discount received goes with payments (credit side).",
  });

  // Calculation: discount allowed total
  const rec = [[1650, 1608.75], [940, 916.5], [2280, 2280], [1300, 1267.5]];
  const da = sum(rec.map(([o, p]) => r2(o - p)));
  check("da", da, 41.25 + 23.5 + 0 + 32.5);
  b.calc({
    d: 3, kind: "money", value: da, calculator: true, wrong: [r2(da + 2280 * 0.025)],
    stem: "During October, Tatenda received these payments from credit customers. Calculate the total of the **discount allowed** column for October.\n\n" +
      table(["Customer", "Amount owed US\\$", "Amount paid US\\$", "Paid within discount period?"], [["Rudo Phiri", 1650, 1608.75, "yes"], ["Chinhoyi Clinic", 940, 916.5, "yes"], ["Farai Dube", 2280, 2280, "no"], ["Mutare Hotel", 1300, 1267.5, "yes"]]),
    hints: ["Discount = amount owed − amount paid.", "A customer who paid late received no discount."],
    explanation: `Discounts: $1,650 - 1,608.75 = 41.25$; $940 - 916.50 = 23.50$; Farai Dube $0$; $1,300 - 1,267.50 = 32.50$. Total $41.25 + 23.50 + 32.50 = 97.25$, so ${money(da)}. Giving Farai Dube a 2.5% discount as well would give ${money(r2(da + 2280 * 0.025))}.`,
  });
  // Calculation: bank balance in a three-column cash book
  const q2 = cashBook("x",
    [["1 Feb", "Balance b/d", null, null, 1975], ["9 Feb", "Nyasha Moyo", disc(1800, 5), null, r2(1800 - disc(1800, 5))]],
    [["5 Feb", "Harare Packaging", disc(2560, 2.5), null, r2(2560 - disc(2560, 2.5))], ["20 Feb", "Rent", null, null, 550]],
    {});
  check("q2", q2.bank, 1975 + 1710 - 2496 - 550);
  b.calc({
    d: 3, kind: "money", value: q2.bank, calculator: true, wrong: [r2(1975 + 1800 - 2560 - 550)],
    stem: "Rudo had US\\$1,975 in the bank on 1 February. On 5 February she paid Harare Packaging the US\\$2,560 she owed, less 2.5% cash discount, by bank transfer. On 9 February Nyasha Moyo settled her debt of US\\$1,800 by bank transfer, less 5% cash discount. On 20 February Rudo paid rent of US\\$550 by bank. Calculate the bank balance at 28 February.",
    hints: ["Work out each discount first; the bank column records only the money that moved."],
    explanation: `Payment to Harare Packaging $2,560 - 64 = 2,496$. Receipt from Nyasha $1,800 - 90 = 1,710$. Bank $1,975 - 2,496 + 1,710 - 550 = ${q2.bank}$, so ${money(q2.bank)}. Using the amounts before discount gives ${money(r2(1975 + 1800 - 2560 - 550))}.`,
  });
  b.num({
    d: 2, kind: "pct", value: 3, dp: 0, wrong: [3.09],
    stem: "A supplier accepted US\\$1,455 in full settlement of a debt of US\\$1,500. What percentage cash discount was received? Give a whole number.",
    explanation: "Discount $1,500 - 1,455 = 45$; $\\frac{45}{1,500} \\times 100 = 3\\%$. Dividing by the amount paid (45 ÷ 1,455) is wrong because discount is a percentage of the amount owed.",
  });

  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 2,
    stem: "Give **one** advantage and **one** disadvantage to a business of offering cash discount to its credit customers.",
    points: ["Advantage: customers pay sooner, improving cash flow / fewer irrecoverable debts", "Disadvantage: the business receives less money, reducing profit (discount allowed is an expense)"],
    modelAnswer: "Money comes in sooner, so the business can pay its own suppliers and the risk of bad debts falls. But each discount reduces the amount collected, so profit falls.",
    hints: ["Think about cash flow and about profit."],
    explanation: "Cash discount trades a little profit for faster cash and lower credit risk.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "State **two** differences between trade discount and cash discount.",
    points: ["Trade discount is for trade buyers / bulk orders; cash discount is for prompt payment", "Trade discount is not recorded in the ledger; cash discount is recorded (discount allowed / received)"],
    modelAnswer: "Trade discount is given to trade customers for buying in bulk and is never recorded in the ledger. Cash discount is given for paying within a set time and is recorded as discount allowed or received.",
    explanation: "Purpose and accounting treatment are the two key differences.",
  });

  // Practice structured 1: three-column cash book
  // the 15 May contra also needs its bank debit
  const s1b = cashBook("Cash book (May 2025)",
    [["1 May", "Balances b/d", null, 310, 2280], ["6 May", "Kudzai Shumba", disc(1600, 5), null, r2(1600 - disc(1600, 5))], ["12 May", "Sales", null, 1145, null], ["15 May", "Cash (C)", null, null, 900], ["23 May", "Gweru Lodge", r2(980 - 955.5), 955.5, null]],
    [["3 May", "Midlands Wholesalers", disc(1350, 2), null, r2(1350 - disc(1350, 2))], ["15 May", "Bank (C)", null, 900, null], ["19 May", "Electricity", null, null, 265], ["27 May", "Bulawayo Bakers", r2(740 - 720), null, 720]],
    { cdDate: "31 May", bdDate: "1 Jun" });
  check("s1 da", s1b.discAllowed, 80 + 24.5);
  check("s1 dr", s1b.discReceived, 27 + 20);
  b.struct({
    d: 4, examStyle: true, skill: "APPLICATION", calculator: true,
    stem: "Nyasha owns a catering supplies business in Gweru. On 1 May 2025 she had US\\$310 cash and US\\$2,280 in the bank. In May:\n\n" +
      table(["Date", "Transaction"], [["3 May", "Paid Midlands Wholesalers US\\$1,350 owed, less 2% cash discount, by bank transfer"], ["6 May", "Kudzai Shumba settled his account of US\\$1,600 by cheque, less 5% cash discount"], ["12 May", "Cash sales US\\$1,145"], ["15 May", "Paid US\\$900 cash into the bank"], ["19 May", "Paid electricity US\\$265 online"], ["23 May", "Gweru Lodge paid US\\$955.50 cash in full settlement of US\\$980"], ["27 May", "Paid Bulawayo Bakers US\\$720 by cheque in full settlement of US\\$740"]]),
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "money", value: disc(1600, 5), wrong: [disc(1600, 2.5)], stem: "Calculate the discount allowed to Kudzai Shumba.", explanation: "$1,600 \\times 5\\% = 80$." }),
      P.num({ label: "(b)", marks: 1, kind: "money", value: s1b.discAllowed, wrong: [r2(s1b.discAllowed + s1b.discReceived)], stem: "Calculate the total of the discount allowed column.", explanation: "$80 + 24.50 = 104.50$." }),
      P.num({ label: "(c)", marks: 1, kind: "money", value: s1b.discReceived, wrong: [27], stem: "Calculate the total of the discount received column.", explanation: "$27 + 20 = 47$." }),
      P.manual({ label: "(d)", marks: 7, type: "EXTENDED_RESPONSE", stem: "Prepare Nyasha's three-column cash book for May 2025, balanced at 31 May.", points: ["Opening balances 310 cash and 2,280 bank", "Kudzai Shumba: bank 1,520 and discount 80 on the debit side", "Gweru Lodge: cash 955.50 and discount 24.50 on the debit side; cash sales 1,145", "Midlands Wholesalers: bank 1,323 and discount 27; Bulawayo Bakers: bank 720 and discount 20 (credit side)", "Contra 900 on both sides marked C; electricity 265 in the bank column", `Discount columns totalled (104.50 and 47), not balanced`, `Balances c/d cash ${s1b.cash.toLocaleString("en-GB")} and bank ${s1b.bank.toLocaleString("en-GB")}, brought down on 1 Jun`], modelAnswer: s1b.md, explanation: "Discounts sit beside the related receipt or payment." }),
      P.mcq({
        label: "(e)", stem: "Which entry is made for the total of the discount received column?",
        options: [["Credit discount received US\\$47", "Correct: income account credited with the total."], ["Debit discount received US\\$47", "The suppliers are debited; discount received is credited."], ["Credit discount received US\\$104.50", "That is the total of the debit (discount allowed) column."], ["Debit discount allowed US\\$47", "Discount received is not posted to discount allowed."]],
        answer: "A", explanation: "Suppliers are debited individually; the total is credited to discount received.",
      }),
    ],
    hints: ["Discount = amount owed − amount paid.", "Receipts and discount allowed on the debit side; payments and discount received on the credit side."],
    explanation: "This item tests calculating cash discounts and writing up a three-column cash book.",
  });
  check("s1 bal", s1b.cash * 100000 + s1b.bank, 1510.5 * 100000 + 2392);

  // Practice structured 2: posting discounts to personal accounts
  const owed = 2650;
  const pd = r2(owed - disc(owed, 4));
  const tModel = tAccount("Mashava Stores account", [["1 Jun", "Balance b/d", owed], ["14 Jun", "Sales", 1480]], [["8 Jun", "Bank", pd], ["8 Jun", "Discount allowed", disc(owed, 4)]], { cdDate: "30 Jun", bdDate: "1 Jul" });
  b.struct({
    d: 4, examStyle: true, skill: "APPLICATION", calculator: true,
    stem: `Farai sells building materials in Masvingo and offers 4% cash discount for payment within 10 days. On 1 June 2025 Mashava Stores owed him ${money(owed)}. On 8 June Mashava Stores paid the balance by bank transfer, less cash discount. On 14 June Farai sold them goods on credit for US\\$1,480 (net of trade discount).`,
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "money", value: disc(owed, 4), wrong: [r2(disc(owed + 1480, 4))], stem: "Calculate the cash discount allowed on 8 June.", explanation: `$2,650 \\times 4\\% = ${disc(owed, 4)}$.` }),
      P.num({ label: "(b)", marks: 1, kind: "money", value: pd, wrong: [owed], stem: "Calculate the amount received on 8 June.", explanation: `$2,650 - 106 = ${pd.toLocaleString("en-GB")}$.` }),
      P.manual({ label: "(c)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare Mashava Stores' account in Farai's sales ledger (trade receivables ledger) for June, balanced at 30 June.", points: ["Balance b/d 2,650 and Sales 1,480 on the debit side", "Bank 2,544 on the credit side", "Discount allowed 106 on the credit side", "Balance c/d 1,480; totals 4,130; balance b/d 1,480 Dr on 1 Jul"], modelAnswer: tModel, explanation: "Both the payment and the discount are credited." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why trade discount on the sale of 14 June does not appear in the account.", points: ["Trade discount is deducted on the invoice before the sale is recorded", "So the sale is recorded at the net amount; trade discount is never entered in the ledger"], modelAnswer: "The invoice shows the price after trade discount, and only that net amount is recorded, so trade discount never reaches the ledger.", explanation: "Only cash discount is recorded." }),
    ],
    hints: ["Cash discount is a percentage of the amount owed.", "Credit the customer with the money and the discount."],
    explanation: "This item tests calculating and posting discount allowed.",
  });

  b.card("DEFINITION", "What is **cash discount**?", "A reduction in the amount owed for paying within a stated time. Recorded as discount allowed or received.");
  b.card("DEFINITION", "What is **discount allowed**?", "Cash discount given to customers: an expense.");
  b.card("DEFINITION", "What is **discount received**?", "Cash discount received from suppliers: income (added to gross profit).");
  b.card("FACT", "Is trade discount recorded in the ledger?", "No. It is deducted on the invoice; only the net amount is recorded.");
  b.card("FACT", "Where is discount allowed entered in the three-column cash book?", "In the discount column on the debit side, beside the receipt.");
  b.card("FACT", "Where is discount received entered in the three-column cash book?", "In the discount column on the credit side, beside the payment.");
  b.card("FACT", "Are the discount columns balanced?", "No. They are memorandum columns: totalled and posted (allowed to the debit of discount allowed; received to the credit of discount received).");
  b.card("FORMULA", "Cash discount", "Amount owed (after trade discount) × cash discount %. Amount paid = amount owed − cash discount.");
  b.card("FACT", "Posting a customer's discount", "Credit the customer's account with both the money received and the discount allowed.");
});
