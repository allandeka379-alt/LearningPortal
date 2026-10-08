// W1b: the double entry system.
import { concept, P, money, tAccount, check, sum, r2, balanceOf } from "../lib.mjs";

const pair = (dr, cr) => `Debit ${dr}; credit ${cr}`;

concept("acc.ledger.double-entry", { file: "ledger/double-entry", keyPrefix: "ledger.double-entry" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "An **increase** in an asset account is recorded on which side of the account?",
    options: [
      ["The debit side", "Correct: assets increase on the debit (left-hand) side."],
      ["The credit side", "A credit entry in an asset account records a decrease."],
      ["Either side, depending on the amount", "The side depends on the type of account and whether it increases, never on the amount."],
      ["Neither side; assets are shown only in the statement of financial position", "Every asset has a ledger account; the statement is prepared from the balances."],
    ],
    answer: "A",
    explanation: "Assets, expenses and drawings increase on the **debit** side. Liabilities, capital and income increase on the **credit** side.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the normal balance on a capital account?",
    options: [
      ["A credit balance", "Correct: capital is what the business owes the owner, so it increases on the credit side."],
      ["A debit balance", "Debit balances are normal for assets, expenses and drawings."],
      ["No balance; it is closed every year", "Capital is carried forward; only nominal accounts are closed to the income statement."],
      ["A debit balance whenever there is a profit", "Profit increases capital, which adds to its credit balance."],
    ],
    answer: "A",
    explanation: "Capital is a liability of the business to its owner. It is credited when the owner invests or a profit is made and has a **credit** balance.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A bakery in Bulawayo buys a delivery van and pays by bank transfer. Which entries record this?",
    options: [
      [pair("motor vehicles", "bank"), "Correct: the asset motor vehicles increases (debit) and the bank balance decreases (credit)."],
      [pair("bank", "motor vehicles"), "These are reversed: money leaves the bank, so bank is credited."],
      [pair("purchases", "bank"), "Purchases is only for goods bought for resale; the van is kept for use."],
      [pair("motor vehicles", "capital"), "Capital is credited only when the owner puts resources into the business."],
    ],
    answer: "A",
    explanation: "The van is a non-current asset: debit **motor vehicles**. Payment by bank transfer reduces the asset bank: credit **bank**.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Nyasha sells goods on credit to Sipho Ncube. Which entries record this in Nyasha's books?",
    options: [
      [pair("Sipho Ncube", "sales"), "Correct: Sipho now owes Nyasha (an asset increases) and sales income increases."],
      [pair("sales", "Sipho Ncube"), "These are reversed: sales income increases on the credit side."],
      [pair("cash", "sales"), "No cash was received: it is a credit sale."],
      [pair("Sipho Ncube", "purchases"), "Purchases records goods bought, not goods sold."],
    ],
    answer: "A",
    explanation: "A credit sale is debited to the customer's personal account (a trade receivable) and credited to **sales**. Cash or bank is only used when Sipho pays.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "The owner of a hair salon takes cash from the business for her own use. Which entries record this?",
    options: [
      [pair("drawings", "cash"), "Correct: drawings increase (debit) and the cash asset decreases (credit)."],
      [pair("cash", "drawings"), "Cash leaves the business, so cash is credited, not debited."],
      [pair("wages", "cash"), "The owner is not an employee; money taken for private use is drawings."],
      [pair("capital", "cash"), "Drawings are recorded in their own account and transferred to capital at the year end."],
    ],
    answer: "A",
    explanation: "Money or goods taken by the owner for private use are **drawings**: debit drawings, credit cash (or bank, or purchases for goods). At the year end drawings are deducted from capital.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A business pays Gweru Timber, a credit supplier, the amount owed by bank transfer. Which entries record the payment?",
    options: [
      [pair("Gweru Timber", "bank"), "Correct: the liability to the supplier decreases (debit) and bank decreases (credit)."],
      [pair("bank", "Gweru Timber"), "This would record money received from the supplier."],
      [pair("purchases", "bank"), "The purchase was already recorded when the goods were bought on credit."],
      [pair("Gweru Timber", "purchases"), "This would cancel the purchase, as if the goods were returned."],
    ],
    answer: "A",
    hints: ["The purchase was recorded earlier. What does paying now change?", "A liability decreases on the debit side."],
    explanation: "When the goods were bought on credit, purchases was debited and Gweru Timber credited. Paying the debt reduces the liability (**debit Gweru Timber**) and the bank balance (**credit bank**).",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "An estate agent's business receives commission by bank transfer. Which entries record this?",
    options: [
      [pair("bank", "commission received"), "Correct: bank increases (debit) and income increases (credit)."],
      [pair("commission received", "bank"), "Reversed: income increases on the credit side."],
      [pair("bank", "sales"), "Commission is a separate income and has its own account."],
      [pair("bank", "capital"), "Capital is credited only for resources put in by the owner."],
    ],
    answer: "A",
    hints: ["Which two accounts are affected, and what type is each?"],
    explanation: "Debit **bank** (asset up), credit **commission received** (income up). Each kind of income has its own nominal account.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Rudo returns goods costing US\\$90, bought on credit, to her supplier Harare Paints. Which entries record this in Rudo's books?",
    options: [
      [pair("Harare Paints", "returns outwards"), "Correct: she owes the supplier less (debit) and returns outwards increases (credit)."],
      [pair("returns outwards", "Harare Paints"), "Reversed: the liability to the supplier decreases, so the supplier is debited."],
      [pair("returns inwards", "Harare Paints"), "Returns inwards are goods sent back by customers."],
      [pair("Harare Paints", "purchases"), "Returns are kept in their own account rather than credited to purchases."],
    ],
    answer: "A",
    hints: ["Rudo is the buyer. Are these returns inwards or returns outwards?"],
    explanation: "Goods sent back to a supplier are **returns outwards** (purchases returns): debit the supplier's account (the amount owed falls), credit returns outwards.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of these is a **nominal** account?",
    options: [
      ["Wages", "Correct: nominal accounts record income and expenses; wages is an expense."],
      ["Premises", "Premises is something the business owns: a real account."],
      ["Tatenda Moyo, a credit customer", "Accounts for people and firms are personal accounts."],
      ["Capital", "Capital is the owner's account: a personal account."],
    ],
    answer: "A",
    explanation: "**Nominal** accounts: income, expenses, gains and losses. **Real** accounts: things owned. **Personal** accounts: people and organisations, including the owner's capital and drawings.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Farai starts a transport business by bringing in his own pick-up truck valued at US\\$7,500. Which entries record this?",
    options: [
      [pair("motor vehicles", "capital"), "Correct: the business gains an asset and owes the owner the same value."],
      [pair("capital", "motor vehicles"), "Reversed: capital increases on the credit side."],
      [pair("motor vehicles", "bank"), "No money was paid; the truck was contributed by the owner."],
      [pair("purchases", "capital"), "The truck is not for resale, so purchases is wrong."],
    ],
    answer: "A",
    hints: ["Capital can be contributed in a form other than money.", "What does the business now own, and to whom does it owe its value?"],
    explanation: "Capital may be introduced as assets as well as money. Debit **motor vehicles** (asset up) and credit **capital** (the business owes Farai more).",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Chipo, who owns a clothing shop, takes a dress from the shop's stock for her daughter. Which entries record this?",
    options: [
      [pair("drawings", "purchases"), "Correct: drawings increase, and goods bought for resale have been taken out, so purchases is reduced."],
      [pair("drawings", "sales"), "Nothing was sold: goods taken by the owner are recorded at cost and reduce purchases."],
      [pair("purchases", "drawings"), "This reverses the entries."],
      [pair("drawings", "cash"), "No cash left the business; goods did."],
    ],
    answer: "A",
    hints: ["The owner took goods, not money.", "Which account recorded the goods when they came into the business?"],
    explanation: "Goods taken for private use are drawings at **cost**: debit **drawings**, credit **purchases** (the goods are no longer available for resale).",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Under double entry, the total of all debit entries in the ledger should equal the total of all credit entries.",
    answer: true,
    explanation: "True. Each transaction has a debit and a credit of the same amount, so the totals agree; the trial balance tests this.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A drawings account normally has a credit balance.",
    answer: false,
    explanation: "False. Drawings reduce capital, so they are entered on the **debit** side and the account has a debit balance.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each account with its class.",
    pairs: ["Thandeka Dube (credit customer)", "Premises", "Rent received", "Capital", "Office equipment", "Discount allowed"],
    right: ["Personal account", "Real account", "Nominal account"],
    rightIndex: [0, 1, 2, 0, 1, 2],
    explanation: "Personal: people and organisations (customers, suppliers, the owner's capital). Real: things owned (premises, equipment). Nominal: income and expenses (rent received, discount allowed).",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct accounts.",
    template: "Tatenda's Tuck Shop bought sweets for resale on credit from Chinhoyi Distributors. Debit the {{blank:a}} account and credit the {{blank:b}} account.",
    blanks: [
      { id: "a", accepted: ["purchases"], choices: ["purchases", "Chinhoyi Distributors", "cash", "inventory"] },
      { id: "b", accepted: ["Chinhoyi Distributors"], choices: ["Chinhoyi Distributors", "purchases", "cash", "sales"] },
    ],
    explanation: "Goods for resale are debited to **purchases**. On credit, the supplier becomes a trade payable: credit **Chinhoyi Distributors**.",
  });
  b.fib({
    d: 3,
    stem: "Choose the correct accounts.",
    template: "A poultry project receives a two-year bank loan of US\\$4,000 paid directly into its bank account. Debit {{blank:a}} and credit {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["bank"], choices: ["bank", "bank loan", "capital", "interest"] },
      { id: "b", accepted: ["bank loan"], choices: ["bank loan", "bank", "capital", "sales"] },
    ],
    hints: ["The money is an asset; the obligation to repay is a liability."],
    explanation: "The bank balance (asset) increases: debit **bank**. The business now owes the lender (a liability): credit **bank loan**. It is not capital, because it must be repaid to the lender, not the owner.",
  });
  const sup = { buy: 1840, ret: 160, paid: 1000 };
  const owed = r2(sup.buy - sup.ret - sup.paid);
  b.num({
    d: 2, daily: true, kind: "money", value: owed, wrong: [r2(sup.buy - sup.paid), r2(sup.buy + sup.ret - sup.paid)],
    stem: `Sipho bought goods on credit from Masvingo Traders for ${money(sup.buy)}, returned goods worth ${money(sup.ret)} and later paid ${money(sup.paid)} by bank transfer. How much does Sipho still owe Masvingo Traders?`,
    explanation: `The supplier's account is credited ${money(sup.buy)} and debited ${money(sup.ret)} and ${money(sup.paid)}: $${sup.buy} - ${sup.ret} - ${sup.paid} = ${owed}$. Sipho owes ${money(owed)}. Forgetting the returns gives ${money(r2(sup.buy - sup.paid))}.`,
  });
  const cap = { cash: 3000, equip: 1200, loan: 2500 };
  b.num({
    d: 3, kind: "money", value: sum([cap.cash, cap.equip]), wrong: [sum([cap.cash, cap.equip, cap.loan]), cap.cash],
    stem: `Thandeka started a catering business by paying ${money(cap.cash)} of her savings into the business bank account and bringing in her own cooking equipment worth ${money(cap.equip)}. Her uncle lent the business ${money(cap.loan)}. What is the total of the credit side of the **capital** account?`,
    hints: ["Which of the three amounts came from the owner?"],
    explanation: `Capital records what the **owner** contributes: ${money(cap.cash)} + ${money(cap.equip)} $=$ ${money(sum([cap.cash, cap.equip]))}. The uncle's money is a loan (a liability), credited to a loan account, not to capital.`,
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why, under double entry, the total of the debit entries always equals the total of the credit entries.",
    points: ["Every transaction has two aspects / is recorded in two accounts", "The debit and the credit are for the same amount, so the totals must agree"],
    modelAnswer: "Each transaction affects two accounts and is recorded as a debit in one and a credit of the same amount in the other, so the totals of debits and credits are always equal.",
    hints: ["Think about one transaction: how many entries, and of what amounts?"],
    explanation: "This is the duality concept: equal and opposite entries for every transaction.",
  });

  // Practice structured 1: Thandeka's Catering
  const tx1 = [
    ["1 Apr", "Thandeka paid US\\$5,000 into a business bank account to start the business", "Bank", "Capital", 5000],
    ["4 Apr", "Bought cooking equipment, paying by bank transfer, US\\$1,850", "Equipment", "Bank", 1850],
    ["7 Apr", "Bought food supplies on credit from Bulawayo Fresh Produce, US\\$720", "Purchases", "Bulawayo Fresh Produce", 720],
    ["10 Apr", "Catered for a wedding for Farai Sibanda, who will pay later, US\\$1,600", "Farai Sibanda", "Sales", 1600],
    ["15 Apr", "Paid wages by bank transfer, US\\$380", "Wages", "Bank", 380],
    ["21 Apr", "Farai Sibanda paid US\\$1,000 by bank transfer", "Bank", "Farai Sibanda", 1000],
    ["28 Apr", "Paid Bulawayo Fresh Produce in full by bank transfer, US\\$720", "Bulawayo Fresh Produce", "Bank", 720],
  ];
  const bankDr = tx1.filter((t) => t[2] === "Bank").map((t) => [t[0], t[3], t[4]]);
  const bankCr = tx1.filter((t) => t[3] === "Bank").map((t) => [t[0], t[2], t[4]]);
  const bankModel = tAccount("Bank account", bankDr, bankCr, { balance: false });
  check("bank entries", bankDr.length + bankCr.length, 5);
  const farai = balanceOf([["", "", 1600]], [["", "", 1000]]);
  const accts = ["Bank", "Capital", "Equipment", "Purchases", "Bulawayo Fresh Produce", "Farai Sibanda", "Sales", "Wages"];
  b.struct({
    d: 4, examStyle: true, skill: "APPLICATION",
    stem: `Thandeka started a catering business in Bulawayo on 1 April 2025. Her transactions for April were:\n\n| Date | Transaction |\n| --- | --- |\n${tx1.map((t) => `| ${t[0]} | ${t[1]} |`).join("\n")}`,
    parts: [
      P.fib({
        label: "(a)", stem: "Name the account debited and the account credited for each transaction.",
        template: "7 April: debit {{blank:a}}, credit {{blank:b}}. 10 April: debit {{blank:c}}, credit {{blank:d}}. 21 April: debit {{blank:e}}, credit {{blank:f}}.",
        blanks: [
          { id: "a", accepted: ["Purchases"], choices: accts },
          { id: "b", accepted: ["Bulawayo Fresh Produce"], choices: accts },
          { id: "c", accepted: ["Farai Sibanda"], choices: accts },
          { id: "d", accepted: ["Sales"], choices: accts },
          { id: "e", accepted: ["Bank"], choices: accts },
          { id: "f", accepted: ["Farai Sibanda"], choices: accts },
        ],
        wrong: [["Bulawayo Fresh Produce", "Purchases", "Sales", "Farai Sibanda", "Farai Sibanda", "Bank"]],
        explanation: "7 April: credit purchase of goods (debit purchases, credit the supplier). 10 April: credit sale (debit the customer, credit sales). 21 April: money received from a customer (debit bank, credit the customer).",
      }),
      P.num({
        label: "(b)", marks: 2, kind: "money", value: farai.amount, wrong: [1600],
        stem: "Calculate the amount Farai Sibanda owes Thandeka at the end of April.",
        explanation: `Debit ${money(1600)} less credit ${money(1000)} leaves a debit balance of ${money(farai.amount)}.`,
      }),
      P.manual({
        label: "(c)", marks: 5, type: "EXTENDED_RESPONSE",
        stem: "Prepare Thandeka's bank account for April 2025. Do **not** balance it.",
        points: ["1 Apr Capital 5,000 on the debit side", "21 Apr Farai Sibanda 1,000 on the debit side", "4 Apr Equipment 1,850 on the credit side", "15 Apr Wages 380 on the credit side", "28 Apr Bulawayo Fresh Produce 720 on the credit side"],
        modelAnswer: bankModel,
        explanation: "Money in is debited to bank; money out is credited. The details column names the other account.",
      }),
    ],
    hints: ["For each transaction, name the two accounts and decide which increases or decreases.", "Credit transactions do not touch the bank account until the money moves."],
    explanation: "Credit transactions use personal accounts; the bank account records only money paid in or out.",
  });

  // Practice structured 2: Sipho's Transport
  const tx2 = [
    ["2 May", "Bought a minibus on credit from Masvingo Motors", 18500, "Motor vehicles", "Masvingo Motors"],
    ["6 May", "Received fares in cash", 1240, "Cash", "Fares received"],
    ["9 May", "Paid for fuel in cash", 430, "Fuel", "Cash"],
    ["14 May", "Sipho took cash for his own use", 150, "Drawings", "Cash"],
    ["19 May", "Paid Masvingo Motors by bank transfer", 6000, "Masvingo Motors", "Bank"],
    ["25 May", "Received a loan from his aunt, Thandeka Moyo, paid into the bank", 3000, "Bank", "Loan: Thandeka Moyo"],
  ];
  const right2 = ["Motor vehicles", "Cash", "Fuel", "Drawings", "Masvingo Motors", "Bank", "Purchases", "Capital"];
  const mm = balanceOf([["", "", 6000]], [["", "", 18500]]);
  const cash = balanceOf([["", "", 1240]], [["", "", 430], ["", "", 150]]);
  check("cash", cash.amount, 660);
  b.struct({
    d: 5, examStyle: true, skill: "ANALYSIS",
    stem: `Sipho runs a minibus service in Masvingo. The business had no cash in hand on 1 May 2025. Its transactions for May included:\n\n| Date | Transaction | US\\$ |\n| --- | --- | ---: |\n${tx2.map((t) => `| ${t[0]} | ${t[1]} | ${t[2].toLocaleString("en-GB")} |`).join("\n")}`,
    parts: [
      P.match({
        label: "(a)", stem: "For each transaction, choose the account that is **debited**.",
        pairs: tx2.map((t) => t[0]),
        right: right2,
        rightIndex: tx2.map((t) => right2.indexOf(t[3])),
        explanation: "2 May: motor vehicles (non-current asset, not purchases). 6 May: cash. 9 May: fuel (expense). 14 May: drawings. 19 May: Masvingo Motors (liability reduced). 25 May: bank.",
      }),
      P.num({
        label: "(b)", marks: 2, kind: "money", value: mm.amount, wrong: [18500, 24500],
        stem: "Calculate the amount Sipho still owes Masvingo Motors at the end of May.",
        explanation: `${money(18500)} credited less ${money(6000)} debited $=$ ${money(mm.amount)} (credit balance).`,
      }),
      P.num({
        label: "(c)", marks: 1, kind: "money", value: cash.amount, wrong: [810],
        stem: "Calculate the cash in hand at the end of May.",
        explanation: `$1,240 - 430 - 150 = ${cash.amount}$. Forgetting the drawings gives ${money(810)}.`,
      }),
      P.mcq({
        label: "(d)", stem: "How is the account *Loan: Thandeka Moyo* classified?",
        options: [["A personal account with a credit balance", "Correct: it is the account of a person the business owes."], ["A real account with a debit balance", "Real accounts are for things owned."], ["A nominal account with a credit balance", "A loan is not income; it must be repaid."], ["A personal account with a debit balance", "The business owes Thandeka, so the balance is a credit (a liability)."]],
        answer: "A",
        explanation: "The loan is owed to a person: a personal account and a liability, so a credit balance.",
      }),
      P.manual({
        label: "(e)", marks: 2,
        stem: "Explain why the minibus bought on 2 May is not debited to the purchases account.",
        points: ["The minibus is bought to be used in the business for a long time (a non-current asset)", "Purchases is only for goods bought to be resold"],
        modelAnswer: "The minibus will be used to carry passengers for several years, so it is a non-current asset recorded in motor vehicles; purchases records only goods bought for resale.",
        explanation: "Debiting purchases would understate assets and overstate cost of sales.",
      }),
    ],
    hints: ["For each transaction ask: what does the business receive? That account is debited.", "Drawings reduce cash just like any other payment."],
    explanation: "This question tests the rules of debit and credit for assets, liabilities, income, expenses and drawings.",
  });

  b.card("CONCEPT", "The rule of double entry", "Every transaction is recorded as a debit in one account and a credit of the same amount in another.");
  b.card("FACT", "Which accounts increase on the debit side?", "Assets, expenses and drawings (DEAD).", "Remember DEAD CLIC.");
  b.card("FACT", "Which accounts increase on the credit side?", "Liabilities, income and capital (CLIC).");
  b.card("FACT", "Credit sale of goods to Rudo", "Debit Rudo (trade receivable); credit sales.");
  b.card("FACT", "Credit purchase of goods for resale", "Debit purchases; credit the supplier (trade payable).");
  b.card("FACT", "Owner takes goods for private use", "Debit drawings; credit purchases (at cost).");
  b.card("DEFINITION", "What are **personal**, **real** and **nominal** accounts?", "Personal: people and organisations (customers, suppliers, capital). Real: things owned (premises, vehicles, cash). Nominal: income and expenses.");
  b.card("CONCEPT", "What goes in the details column of a ledger entry?", "The name of the other account in the double entry.");
  b.card("FACT", "Goods returned to a supplier", "Debit the supplier; credit returns outwards (purchases returns).");
  b.card("FACT", "Goods returned by a customer", "Debit returns inwards (sales returns); credit the customer.");
});
