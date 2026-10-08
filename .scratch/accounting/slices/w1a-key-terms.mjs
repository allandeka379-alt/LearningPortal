// W1a: acc.fundamentals.key-terms
import { concept, P, money, fmt, check, sum } from "../lib.mjs";

const row = (c) => `| ${c.join(" | ")} |`;
const CLASS = ["Non-current asset", "Current asset", "Non-current liability", "Current liability"];

concept("acc.fundamentals.key-terms", { file: "fundamentals/key-terms", keyPrefix: "fundamentals.key-terms" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **transaction**?",
    options: [
      ["An event, measurable in money, that changes the financial position of a business", "Correct: sales, purchases, payments and receipts are all transactions."],
      ["A document sent to a customer asking for payment of an amount owed", "This describes an invoice or statement of account, which is evidence of a transaction."],
      ["A summary of the income and expenses of a business for a year", "This describes an income statement, which summarises many transactions."],
      ["A list of the balances in the ledger used to check the arithmetic", "This describes a trial balance."],
    ],
    answer: "A",
    explanation: "A transaction is any event that can be measured in money and changes what the business owns, owes or is owed: buying, selling, paying or receiving.",
  });

  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of the following is a **current asset** of a hardware shop?",
    options: [
      ["Inventory of cement and roofing sheets", "Correct: goods held for resale are inventory, a current asset."],
      ["The shop's delivery lorry", "The lorry is kept to run the business for several years: a non-current asset."],
      ["A loan from a building society", "A loan is owed by the shop: a liability, not an asset."],
      ["Shelving and display fittings", "Fittings are used in the shop for years: a non-current asset."],
    ],
    answer: "A",
    explanation: "Current assets are cash or items expected to become cash within a year: inventory, trade receivables, bank and cash.",
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which item is a **non-current liability**?",
    options: [
      ["A bank loan repayable in five years' time", "Correct: it is owed to an outsider and is not due within twelve months."],
      ["A bank overdraft", "An overdraft can be called in at any time, so it is a current liability."],
      ["Amounts owed to suppliers for goods", "Trade payables are normally paid within weeks: a current liability."],
      ["Premises owned by the business", "Premises are owned by the business: a non-current asset."],
    ],
    answer: "A",
    explanation: "Non-current liabilities are due for payment after more than twelve months, such as long-term loans and mortgages.",
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Chipo takes a bag of rice from her grocery shop for her family's use. How is this described?",
    options: [
      ["Drawings", "Correct: goods taken by the owner for personal use are drawings."],
      ["An expense", "The rice was not used to run the business, so it is not an expense."],
      ["A sale", "Nobody paid for the rice; a sale needs a customer."],
      ["Capital", "Capital is what the owner puts into the business, not what she takes out."],
    ],
    answer: "A",
    explanation: "**Drawings** are money, goods or other assets taken by the owner for personal use. They reduce capital and are not expenses.",
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of the following is an **expense** of a bakery?",
    options: [
      ["Wages paid to the bakers", "Correct: a cost of running the business in the period."],
      ["A new oven bought for cash", "The oven will be used for years: a non-current asset (capital expenditure)."],
      ["Repayment of part of a bank loan", "This reduces a liability; only loan interest is an expense."],
      ["Cash the owner takes for her rent at home", "Money taken for personal use is drawings, not a business expense."],
    ],
    answer: "A",
    explanation: "Expenses are the costs of running the business for a period: wages, rent, electricity, fuel, insurance, loan interest.",
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which activity is **book-keeping** rather than accounting?",
    options: [
      ["Writing each day's credit sales in the sales journal", "Correct: book-keeping is the day-to-day recording of transactions."],
      ["Preparing a statement of financial position at the year end", "Preparing statements from the records is accounting."],
      ["Comparing this year's profit with last year's", "Analysing results is accounting."],
      ["Advising the owner whether to buy a second shop", "Interpreting information for decisions is accounting."],
    ],
    answer: "A",
    explanation: "Book-keeping records transactions. Accounting summarises those records into statements, then analyses and interprets them.",
  });

  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Tatenda runs a car sales yard in Harare. For **his** business, how should a car bought to sell to a customer be classified?",
    options: [
      ["Current asset (inventory)", "Correct: the car is held for resale, so it is inventory."],
      ["Non-current asset", "Cars are non-current assets only when they are kept to run the business."],
      ["Expense", "Buying goods for resale gives inventory; the cost becomes cost of sales only when the car is sold."],
      ["Current liability", "The car is owned by the business; it is not an amount owed."],
    ],
    answer: "A",
    explanation: "Classification depends on the purpose of the item in the particular business. A dealer holds cars for resale, so they are inventory (current assets). The dealer's own breakdown truck would be a non-current asset.",
    hints: ["Ask why this business holds the car."],
  });

  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which list contains **only** current liabilities?",
    options: [
      ["Bank overdraft, trade payables, wages owing", "Correct: all are due within twelve months."],
      ["Trade payables, trade receivables, bank overdraft", "Trade receivables are owed **to** the business: a current asset."],
      ["Ten-year mortgage, trade payables, rent owing", "A ten-year mortgage is a non-current liability."],
      ["Wages owing, inventory, bank overdraft", "Inventory is a current asset."],
    ],
    answer: "A",
    explanation: "Current liabilities are owed by the business and due within a year: trade payables, overdrafts, expenses owing (accruals).",
    hints: ["Check each item: is it owed by the business, and is it due within a year?"],
  });

  {
    const items = [["Fees for tyre repairs", 2860, "I"], ["Rent of the workshop", 450, "E"], ["Electricity", 135, "E"], ["Wages of an assistant", 520, "E"], ["Air compressor bought", 690, "A"], ["Drawings", 300, "D"]];
    const inc = sum(items.filter((i) => i[2] === "I").map((i) => i[1]));
    const exp = sum(items.filter((i) => i[2] === "E").map((i) => i[1]));
    const profit = inc - exp;
    check("p", profit, 1755);
    b.calc({
      d: 3, skill: "APPLICATION", kind: "money", value: profit, daily: false,
      stem: `Nyasha repairs tyres at a roadside workshop in Masvingo. For October 2025 her records show:\n\n${row(["Item", "US\\$"])}\n${row(["---", "---:"])}\n${items.map(([a, v]) => row([a, fmt(v)])).join("\n")}\n\nCalculate the profit for October 2025.`,
      wrong: [profit - 690 - 300, profit - 300, profit - 690],
      explanation: `1. Income: fees ${money(inc)}.\n2. Expenses: rent 450 + electricity 135 + wages 520 = ${money(exp)}.\n3. Profit = ${fmt(inc)} − ${fmt(exp)} = ${money(profit)}.\n\nThe compressor is a non-current asset and the drawings reduce capital: neither is an expense. Deducting them gives ${money(profit - 690 - 300)}.`,
      hints: ["Only income and expenses enter the profit calculation.", "Is the compressor used up in October, or kept?"],
    });
  }

  {
    const assets = [["Premises", 18500], ["Fixtures", 2240], ["Inventory", 3115], ["Bank", 1460]];
    const liab = [["Trade payables", 1985], ["Loan repayable 2031", 7000]];
    const ta = sum(assets.map((x) => x[1])), tl = sum(liab.map((x) => x[1]));
    const cap = ta - tl;
    b.num({
      d: 2, skill: "APPLICATION", kind: "money", value: cap, daily: true,
      stem: `A shop has premises ${money(18500)}, fixtures ${money(2240)}, inventory ${money(3115)}, bank ${money(1460)}, trade payables ${money(1985)} and a loan repayable in 2031 of ${money(7000)}. Calculate the owner's capital.`,
      wrong: [ta, ta + tl, ta - 1985],
      explanation: `Assets = 18,500 + 2,240 + 3,115 + 1,460 = ${money(ta)}. Liabilities = 1,985 + 7,000 = ${money(tl)}. Capital = ${fmt(ta)} − ${fmt(tl)} = ${money(cap)}.`,
    });
  }

  b.tf({
    d: 1, skill: "RECALL",
    stem: "A bank overdraft is a current asset.",
    answer: false,
    explanation: "False. An overdraft is money the business owes to the bank, repayable on demand, so it is a **current liability**.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Interest paid on a bank loan is an expense, but repaying part of the loan itself is not.",
    answer: true,
    explanation: "True. Interest is the cost of borrowing for the period (an expense). Repaying the loan simply reduces a liability and an asset (bank).",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Assets and liabilities describe a business at one date, while income and expenses describe a period of time.",
    answer: true,
    explanation: "True. Assets and liabilities are shown in the statement of financial position **at** a date; income and expenses are shown in the income statement **for** a period.",
  });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "A school club runs a tuck shop. Match each item with its classification.",
    pairs: ["Refrigerator used to keep drinks cold", "Crates of soft drinks for sale", "Amount owed to a bread supplier", "Three-year loan from the school development committee"],
    right: CLASS,
    rightIndex: [0, 1, 3, 2],
    explanation: "The refrigerator is kept to run the shop (non-current asset); drinks for sale are inventory (current asset); the bread supplier will be paid soon (current liability); the three-year loan is not due within a year (non-current liability).",
  });

  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Capital", "The amount the business owes its owner"],
      ["Liabilities", "Amounts owed to outsiders"],
      ["Income", "Money earned from the normal activities of the business"],
      ["Drawings", "Assets taken out by the owner for personal use"],
      ["Expenses", "The costs of running the business in a period"],
    ],
    explanation: "These five terms, with assets, transaction, book-keeping, accounting, profit and loss, are the basic vocabulary of both syllabuses.",
  });

  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the definitions.",
    template: "Profit is the amount by which {{blank:a}} is greater than {{blank:b}}. Goods bought for resale and not yet sold are called {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["income", "revenue"] },
      { id: "b", accepted: ["expenses", "expenditure"] },
      { id: "c", accepted: ["inventory", "stock", "inventories"] },
    ],
    wrong: [["expenses", "income", "assets"]],
    explanation: "Profit = income − expenses. Goods held for resale are **inventory** (older name: stock).",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Distinguish between **book-keeping** and **accounting**.",
    points: [
      "Book-keeping is the day-to-day recording of financial transactions in the books.",
      "Accounting uses those records to prepare financial statements and to analyse and interpret them for decision-making.",
    ],
    modelAnswer: "Book-keeping is recording transactions, for example entering sales in the sales journal. Accounting summarises the records into statements such as the income statement and interprets them so that the owner can make decisions.",
    explanation: "One mark for each side of the distinction: recording versus summarising and interpreting.",
  });

  {
    const items = [
      ["Delivery motorcycle", 2350, 0], ["Inventory of school uniforms", 4180, 1], ["Trade receivables (schools on credit)", 1265, 1], ["Sewing machines", 3900, 0],
      ["Bank overdraft", 640, 3], ["Trade payables", 2035, 3], ["Cash", 115, 1], ["Loan repayable in 2028", 4500, 2],
    ];
    const t = (k) => sum(items.filter((i) => i[2] === k).map((i) => i[1]));
    const nca = t(0), ca = t(1), ncl = t(2), cl = t(3), cap = nca + ca - ncl - cl;
    check("eq", nca + ca, cap + ncl + cl);
    b.struct({
      d: 3, skill: "APPLICATION", examStyle: true, calculator: true, secs: 720,
      stem: `Thandeka makes and sells school uniforms in Gweru. At 31 December 2025 her business had these balances.\n\n${row(["Item", "US\\$"])}\n${row(["---", "---:"])}\n${items.map(([a, v]) => row([a, fmt(v)])).join("\n")}`,
      parts: [
        P.match({ label: "(a)", marks: 4, stem: "Classify these four items.", pairs: ["Sewing machines", "Inventory of school uniforms", "Bank overdraft", "Loan repayable in 2028"], right: CLASS, rightIndex: [0, 1, 3, 2], explanation: "Machines are kept to run the business; uniforms are for sale; an overdraft is repayable on demand; the loan is not due within a year." }),
        P.num({ label: "(b)", marks: 1, kind: "money", value: nca, stem: "Calculate the total of the non-current assets.", wrong: [3900], explanation: `2,350 + 3,900 = ${money(nca)}.` }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: ca, stem: "Calculate the total of the current assets.", wrong: [ca - 115], explanation: `4,180 + 1,265 + 115 = ${money(ca)}.` }),
        P.num({ label: "(d)", marks: 1, kind: "money", value: cl, stem: "Calculate the total of the current liabilities.", wrong: [2035], explanation: `640 + 2,035 = ${money(cl)}.` }),
        P.num({ label: "(e)", marks: 2, kind: "money", value: cap, stem: "Calculate Thandeka's capital at 31 December 2025.", wrong: [cap + 2 * 640], explanation: `Assets ${fmt(nca + ca)} − liabilities ${fmt(ncl + cl)} = ${money(cap)}.` }),
      ],
      explanation: `Non-current assets ${money(nca)}; current assets ${money(ca)}; current liabilities ${money(cl)}; non-current liability ${money(ncl)}; capital ${money(cap)}. Treating the overdraft as an asset would overstate capital by twice its amount.`,
      hints: ["Is each item owned by the business or owed by it?", "Non-current means more than twelve months."],
    });
  }

  {
    const items = [["Sales of vegetables", 1940, "Income"], ["Seedlings and fertiliser used", 610, "Expense"], ["Hire of a water pump", 175, "Expense"], ["Transport to Mbare Musika", 230, "Expense"], ["Wheelbarrow bought", 85, "Non-current asset"], ["School fees for Rudo's son paid from the business", 260, "Drawings"]];
    const inc = 1940, exp = 610 + 175 + 230, profit = inc - exp;
    const openCap = 2600, closeCap = openCap + profit - 260;
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, secs: 660,
      stem: `Rudo grows vegetables on a plot near Harare. Her capital on 1 March 2025 was ${money(openCap)}. Her records for March 2025 show:\n\n${row(["Item", "US\\$"])}\n${row(["---", "---:"])}\n${items.map(([a, v]) => row([a, fmt(v)])).join("\n")}`,
      parts: [
        P.match({ label: "(a)", marks: 3, stem: "Classify these items.", pairs: ["Hire of a water pump", "Wheelbarrow bought", "School fees for Rudo's son paid from the business"], right: ["Income", "Expense", "Non-current asset", "Drawings"], rightIndex: [1, 2, 3], explanation: "Pump hire is a running cost; the wheelbarrow will be used for years; school fees are a personal cost of the owner." }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: profit, stem: "Calculate the profit for March 2025.", wrong: [profit - 85 - 260], explanation: `1,940 − (610 + 175 + 230) = 1,940 − ${fmt(exp)} = ${money(profit)}.` }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: closeCap, stem: "Calculate Rudo's capital at 31 March 2025.", wrong: [openCap + profit], explanation: `${fmt(openCap)} + ${fmt(profit)} − 260 = ${money(closeCap)}.` }),
        P.manual({ label: "(d)", marks: 2, stem: "Rudo says the school fees should be included in the expenses because they were paid from the business bank account. Explain why she is wrong.", points: ["The fees are a personal cost of the owner, not a cost of running the business.", "They are drawings, which reduce capital and do not reduce profit (the business entity idea)."], modelAnswer: "The business is treated as separate from Rudo. School fees are her personal spending, so they are drawings: they reduce her capital, but they are not a business expense and must not reduce profit." }),
      ],
      explanation: `Profit ${money(profit)}; closing capital ${money(closeCap)}. The wheelbarrow and the school fees are left out of the profit calculation.`,
      hints: ["Only income and expenses enter the profit.", "Closing capital = opening capital + profit − drawings."],
    });
  }

  b.card("DEFINITION", "Transaction", "An event, measurable in money, that changes the financial position of a business (a sale, purchase, payment or receipt).");
  b.card("DEFINITION", "Book-keeping", "The detailed, day-to-day recording of financial transactions.");
  b.card("DEFINITION", "Accounting", "Summarising the records into financial statements, then analysing and interpreting them for decision-making.");
  b.card("DEFINITION", "Non-current assets", "Assets kept for more than a year to run the business, not for resale (premises, machinery, vehicles, fittings).");
  b.card("DEFINITION", "Current assets", "Cash, or items expected to become cash within a year: inventory, trade receivables, bank, cash.");
  b.card("DEFINITION", "Current liabilities", "Amounts owed and due within twelve months: trade payables, bank overdraft, expenses owing.");
  b.card("DEFINITION", "Drawings", "Money, goods or other assets taken from the business by the owner for personal use. They reduce capital, not profit.");
  b.card("FACT", "Is a loan repayment an expense?", "No. It reduces a liability. Only the interest on the loan is an expense.");
  b.card("FACT", "Is a bank overdraft an asset or a liability?", "A current liability: money owed to the bank and repayable on demand.");
  b.card("CONCEPT", "Why can the same vehicle be classified differently in two businesses?", "Classification depends on purpose: held for resale it is inventory (current); used to run the business it is a non-current asset.");
});
