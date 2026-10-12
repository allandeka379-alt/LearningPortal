// W1a: ledger.double-entry
import { concept, P, tAccount, trialBalance, table, check, sum, r2, fmt, money, balanceOf, runningBalance } from "../lib.mjs";
import { mc } from "../tables/w1a-lib.mjs";

concept("aacc.ledger.double-entry", { file: "ledger/double-entry", keyPrefix: "ledger.double-entry" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Tendai pays US\\$5,000 of his own savings into a new business bank account. Which account is **credited**?",
    ok: ["Capital", "Correct: the owner's investment increases capital, a credit balance."],
    bad: [["Bank", "Bank is debited because an asset increases."], ["Drawings", "Drawings record money taken out, not paid in."], ["Sales", "No goods were sold; the money is the owner's investment."]],
    explanation: "The business receives cash (debit Bank) and owes the owner his investment (credit Capital).",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "On which side does a **trade payable** (supplier) account normally have its balance?",
    ok: ["Credit side", "Correct: the business owes the money, so it is a liability."],
    bad: [["Debit side", "A debit balance on a supplier would mean the supplier owes the business, which is unusual."], ["Either side, depending on the month", "The normal side is fixed by the type of account."], ["Neither, because payables are not ledger accounts", "Each supplier has an account in the purchases ledger."]],
    explanation: "Liabilities are credit balances. A supplier's account is credited when goods are bought on credit.",
  });
  mc(b, {
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Chipo buys a delivery van for her bakery on credit from Mutare Motors. Which entry is correct?",
    ok: ["Debit Motor vehicles, credit Mutare Motors", "Correct: an asset is acquired and a liability to the supplier arises."],
    bad: [["Debit Mutare Motors, credit Motor vehicles", "This reverses the entry and would suggest the supplier owes the bakery."], ["Debit Purchases, credit Mutare Motors", "A van is a non-current asset, not goods bought for resale."], ["Debit Motor vehicles, credit Bank", "No payment was made, so Bank is not involved."]],
    explanation: "Assets are debited when they increase; the supplier account is credited because the business now owes money.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Goods sold on credit are returned by a customer, Farai Traders. Which entry records the return in the books of the seller?",
    ok: ["Debit Sales returns, credit Farai Traders", "Correct: sales are reduced and the customer owes less."],
    bad: [["Debit Farai Traders, credit Sales returns", "This would increase the amount owed by the customer."], ["Debit Purchases returns, credit Farai Traders", "Purchases returns are for goods the business sends back to its own suppliers."], ["Debit Bank, credit Sales returns", "No cash changes hands when goods are returned on credit."]],
    explanation: "A return reverses part of the original credit sale: the customer's account is credited and the Sales returns account is debited.",
  });
  mc(b, {
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Sipho, the owner of a hardware shop, withdraws US\\$300 from the business bank account to pay a personal bill. Which entry is correct?",
    ok: ["Debit Drawings, credit Bank", "Correct: drawings are debited and the asset Bank decreases."],
    bad: [["Debit Bank, credit Drawings", "This would record money paid into the business."], ["Debit Expenses, credit Bank", "Personal withdrawals are not business expenses."], ["Debit Capital, credit Drawings", "Drawings are transferred to capital at the end of the year, not at the time of withdrawal."]],
    explanation: "Drawings reduce the owner's claim on the business. They are debited to the Drawings account.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "A business pays a supplier US\\$800 from its bank account. What is the effect on the accounting equation?",
    ok: ["Assets and liabilities both decrease by US\\$800", "Correct: Bank falls and the amount owed to the supplier falls."],
    bad: [["Assets decrease and capital decreases by US\\$800", "Paying a creditor is not an expense; capital is unchanged."], ["Assets increase and liabilities decrease by US\\$800", "Assets do not increase; the bank balance falls."], ["There is no effect, because both sides stay equal", "The totals stay equal, but both sides get smaller."]],
    hints: ["Which two accounts are touched?", "Does paying a debt change profit?"],
    explanation: "Debit the supplier (liability falls); credit Bank (asset falls). Capital is not affected.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Rudo's customer Sunrise Stores owes her US\\$600 and settles the account by paying US\\$585 into her bank because it pays within the discount period. Which entry is correct in Rudo's books?",
    ok: ["Debit Bank 585, debit Discount allowed 15, credit Sunrise Stores 600", "Correct: the full debt is cleared; the discount is a cost to Rudo."],
    bad: [["Debit Bank 585, credit Discount received 15, credit Sunrise Stores 570", "Discount received is for discounts from suppliers, and the customer account must be cleared in full."], ["Debit Bank 600, credit Sunrise Stores 600", "Only 585 was received; recording 600 would overstate the bank balance."], ["Debit Bank 585, credit Sunrise Stores 585", "The customer would still be shown as owing 15."]],
    hints: ["The customer account has to be cleared to nil.", "Who benefits from the discount?"],
    explanation: "Discount allowed is an expense. The total debits (585 + 15) equal the credit that clears the customer's balance (600).",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "Which one of these ledger accounts would normally have a **debit** balance?",
    ok: ["Carriage inwards", "Correct: it is an expense."],
    bad: [["Discount received", "It is income, so it has a credit balance."], ["Trade payables", "It is a liability, so it has a credit balance."], ["Capital", "Capital is a credit balance."]],
    hints: ["Expenses and assets are debit balances."],
    explanation: "Expenses, assets and drawings normally have debit balances; income, liabilities and capital have credit balances.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Discount received from a supplier is an expense of the business.",
    answer: false,
    explanation: "False. Discount received is income (a credit balance). Discount allowed to customers is the expense.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    hints: ["Think about the accounting equation after the transaction."],
    stem: "When an owner introduces equipment worth US\\$2,000 into the business, assets and capital both increase by US\\$2,000.",
    answer: true,
    explanation: "True. Debit Equipment (asset up) and credit Capital (owner's investment up); A = C + L still holds.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each account to its type.",
    pairs: ["Bank", "Commission received", "Trade payables", "Wages", "Drawings", "Capital"],
    right: ["Asset", "Income", "Liability", "Expense", "Owner's claim: debit balance", "Owner's claim: credit balance"],
    rightIndex: [0, 1, 2, 3, 4, 5],
    explanation: "Bank is an asset; commission received is income; trade payables is a liability; wages is an expense; drawings has a debit balance and capital a credit balance.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentence by choosing debit or credit for each gap.",
    template: "A supplier's account normally has a {{blank:a}} balance. A customer's account normally has a {{blank:b}} balance. A sale on credit is {{blank:c}} to the customer.",
    blanks: [
      { id: "a", accepted: ["credit"], choices: ["debit", "credit"] },
      { id: "b", accepted: ["debit"], choices: ["debit", "credit"] },
      { id: "c", accepted: ["debited"], choices: ["debited", "credited"] },
    ],
    explanation: "Suppliers are owed money (credit balance); customers owe money (debit balance); a credit sale is debited to the customer.",
  });

  // Accounting equation numerics (different data from the lesson)
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: 52800 - 17350, daily: true, calculator: true, wrong: [52800 + 17350],
    stem: "Thandeka's business has assets of US\\$52,800 and liabilities of US\\$17,350. Calculate the owner's capital.",
    explanation: "Capital = assets - liabilities = 52,800 - 17,350 = 35,450. Adding the liabilities instead (70,150) is the usual slip.",
  });
  const cap0 = 24000;
  const profit = 6850;
  const draw = 2900;
  const capEnd = r2(cap0 + profit - draw);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: capEnd, calculator: true, wrong: [r2(cap0 + profit + draw), r2(cap0 - profit - draw)],
    stem: `On 1 January 2025 Nyasha's capital was ${money(cap0)}. During the year the business made a profit of ${money(profit)} and she took drawings of ${money(draw)}. She introduced no new capital. Calculate her capital at 31 December 2025.`,
    hints: ["Profit adds to capital; drawings reduce it."],
    explanation: `Closing capital = 24,000 + 6,850 - 3,200 = ${fmt(capEnd)}. Adding the drawings gives ${fmt(r2(cap0 + profit + draw))}.`,
  });
  const rbRows = [
    ["1 Aug", "Balance b/d", 1840, null],
    ["6 Aug", "Sales", 2360, null],
    ["14 Aug", "Sales returns", null, 215],
    ["25 Aug", "Bank", null, 1350],
  ];
  const rb = runningBalance("Farai Stores account", rbRows);
  check("rb", rb.closing, 2635);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: rb.closing, calculator: true, wrong: [r2(1840 + 2360 + 215 - 1350), r2(1840 + 2360 - 215 + 1350)],
    stem: `Mutare Wholesalers sells to Farai Stores on credit. Farai Stores owed ${money(1840)} on 1 August 2025. During August the wholesaler sold goods for ${money(2360)}, accepted returns of ${money(215)} and received ${money(1350)} in payment. Calculate the amount Farai Stores owes at 31 August 2025.`,
    hints: ["Sales increase the debt; returns and payments reduce it."],
    explanation: `1,840 + 2,360 - 215 - 1,350 = ${fmt(rb.closing)}. The balance is a debit balance because the customer owes money.`,
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "Which account is **credited** when a business sells goods on credit? (Name the account.)",
    accepted: ["sales", "sales account", "the sales account"],
    explanation: "A credit sale debits the customer and credits Sales.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why drawings are not treated as an expense of the business.",
    points: ["Drawings are money or goods taken by the owner for personal use, not a cost of running the business", "They reduce the owner's capital, not profit, so they are debited to Drawings and kept out of the statement of profit or loss"],
    modelAnswer: "Drawings are taken by the owner for personal use and do not help earn revenue, so they are not a business expense. They reduce capital and never appear in the statement of profit or loss.",
    explanation: "The test is whether the item helps earn revenue. Drawings reduce the owner's claim instead.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain the principle of duality and illustrate it with a purchase of equipment by bank transfer.",
    points: ["Every transaction has two equal and opposite effects, one debit and one credit", "Example: Debit Equipment (asset increases)", "Credit Bank (asset decreases), so total debits equal total credits and A = C + L still holds"],
    modelAnswer: "Duality means each transaction is recorded twice, as a debit in one account and a credit in another of the same amount. Buying equipment by bank transfer debits Equipment and credits Bank, so the totals still agree and the accounting equation holds.",
    hints: ["Name both accounts and say which side each goes on."],
    explanation: "A definition, one account and the other account earn a mark each.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "Chinhoyi Feeds' ledger shows a **credit** balance of US\\$120 on the account of a customer, Gokwe Stores. The bookkeeper says this must be an error. Evaluate her view.",
    points: ["She may be wrong: a credit balance can arise legitimately if the customer paid twice, overpaid or returned goods after paying", "The business then owes the customer money, so the balance is a liability, not an asset", "It should be investigated and, if correct, shown separately (or refunded) rather than set against other receivables"],
    modelAnswer: "A credit balance is unusual but not necessarily an error. Gokwe Stores may have overpaid or returned goods already paid for, which means the business owes it US\\$120. The balance should be checked against the invoices and receipts and, if correct, treated as a liability rather than an asset.",
    hints: ["Who owes whom when a customer account has a credit balance?"],
    explanation: "Marks reward a reasoned judgement, a cause and a consequence for the statements.",
  });

  // Structured 1 (10 marks)
  const tx = [
    ["1 Jul", "Nyasha pays US\\$6,000 into the business bank account as capital"],
    ["2 Jul", "Buys shelving for US\\$1,150, paying by bank"],
    ["4 Jul", "Buys goods for resale on credit from Mutare Wholesalers, US\\$2,400"],
    ["9 Jul", "Cash sales of US\\$3,180 banked"],
    ["12 Jul", "Pays rent of US\\$450 by bank"],
    ["15 Jul", "Returns goods costing US\\$200 to Mutare Wholesalers"],
    ["20 Jul", "Pays Mutare Wholesalers US\\$1,500 by bank"],
    ["28 Jul", "Nyasha takes US\\$350 from the bank for personal use"],
  ];
  const bDr = [["1 Jul", "Capital", 6000], ["9 Jul", "Sales", 3180]];
  const bCr = [["2 Jul", "Shelving", 1150], ["12 Jul", "Rent", 450], ["20 Jul", "Mutare Wholesalers", 1500], ["28 Jul", "Drawings", 350]];
  const bankBalance = balanceOf(bDr, bCr);
  check("bank", bankBalance.amount, 5730);
  const mwDr = [["15 Jul", "Purchases returns", 200], ["20 Jul", "Bank", 1500]];
  const mwCr = [["4 Jul", "Purchases", 2400]];
  const mwBal = balanceOf(mwDr, mwCr);
  check("mw", mwBal.amount, 700);
  const mwModel = tAccount("Mutare Wholesalers account", mwDr, mwCr, { cdDate: "31 Jul", bdDate: "1 Aug" });
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Nyasha opened a tuck shop in Gweru on 1 July 2025. These are her transactions for July:\n\n" + table(["Date", "Transaction"], tx, ["l", "l"]),
    parts: [
      P.fib({
        label: "(a)", marks: 2, stem: "Record the transaction of 15 July.",
        template: "Debit {{blank:dr}}; credit {{blank:cr}}.",
        blanks: [
          { id: "dr", accepted: ["Mutare Wholesalers"], choices: ["Mutare Wholesalers", "Purchases", "Purchases returns", "Bank"] },
          { id: "cr", accepted: ["Purchases returns"], choices: ["Mutare Wholesalers", "Purchases", "Purchases returns", "Bank"] },
        ],
        explanation: "Returning goods reduces what Nyasha owes the supplier (debit the supplier) and is recorded in Purchases returns (credit).",
      }),
      P.num({ label: "(b)", marks: 3, kind: "money", value: bankBalance.amount, wrong: [r2(6000 + 3180)], stem: "Calculate the balance on the Bank account at 31 July 2025.", explanation: "Receipts: 6,000 + 3,180 = 9,180. Payments: 1,150 + 450 + 1,500 + 350 = 3,450. Balance: 9,180 - 3,450 = 5,730 debit. Counting only the receipts gives 9,180." }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: mwBal.amount, wrong: [2400, 900], stem: "Calculate the amount Nyasha owes Mutare Wholesalers at 31 July 2025.", explanation: "2,400 - 200 - 1,500 = 700 credit balance." }),
      P.manual({ label: "(d)", marks: 3, type: "EXTENDED_RESPONSE", stem: "Prepare the Mutare Wholesalers account for July 2025, balanced and with the balance brought down.", points: ["Credit Purchases 2,400 on 4 July", "Debit Purchases returns 200 and Bank 1,500", "Balance c/d 700 on the debit side, totals 2,400 and balance b/d 700 on the credit side"], modelAnswer: mwModel, explanation: "The account is credited with the purchase and debited with the return and the payment." }),
    ],
    hints: ["Which accounts do the 15 July and 20 July transactions touch?", "Add the bank receipts and payments separately."],
    explanation: "This item tests analysis of transactions, balancing and a supplier account.",
  });

  // Structured 2 (12 marks): accounting equation
  const assets0 = sum([14500, 3200, 5400, 1900]);
  const pay0 = 4300;
  const capital0 = r2(assets0 - pay0);
  const add = 2000;
  const prof = 9300;
  const dr = 4800;
  const capital1 = r2(capital0 + add + prof - dr);
  const liab1 = 6100;
  const assets1 = r2(capital1 + liab1);
  check("cap0", capital0, 20700);
  check("cap1", capital1, 27200);
  check("assets1", assets1, 33300);
  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: "Chipo runs a bakery in Bulawayo. At 1 January 2025 her assets were:\n\n" + table(["Asset", "US\\$"], [["Equipment", 14500], ["Inventory", 3200], ["Bank", 5400], ["Trade receivables", 1900]]) + `\n\nHer only liability was trade payables of ${money(pay0)}. During 2025 she introduced additional capital of ${money(add)}, the business made a profit of ${money(prof)} and she took drawings of ${money(dr)}. At 31 December 2025 her liabilities were ${money(liab1)}.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: capital0, wrong: [assets0], stem: "Calculate Chipo's capital at 1 January 2025.", explanation: "Assets 25,000 - liabilities 4,300 = 20,700." }),
      P.num({ label: "(b)", marks: 3, kind: "money", value: capital1, wrong: [r2(capital0 + add + prof + dr), r2(capital0 + prof - dr)], stem: "Calculate Chipo's capital at 31 December 2025.", explanation: "20,700 + 2,000 + 9,300 - 4,800 = 27,200." }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: assets1, wrong: [capital1], stem: "Calculate the total assets at 31 December 2025.", explanation: "Assets = capital + liabilities = 27,200 + 6,100 = 33,300." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain the effect on the accounting equation of buying equipment on credit.", points: ["Assets increase (equipment)", "Liabilities increase (trade payables) by the same amount", "Capital is unchanged, so A = C + L still holds"], modelAnswer: "Equipment is an asset, so assets rise; the amount owed to the supplier rises by the same amount, so liabilities rise. Capital does not change and both sides of the equation stay equal.", explanation: "Both sides increase by the same amount; capital is not affected." }),
      P.manual({ label: "(e)", marks: 2, stem: "Chipo says: 'My capital rose by US\\$6,500, so my profit for the year was US\\$6,500.' Evaluate her statement.", points: ["Wrong: the increase in capital (6,500) is after adding new capital (2,000) and deducting drawings (4,800)", "Profit is 9,300 = 6,500 + 4,800 drawings - 2,000 new capital"], modelAnswer: "She is wrong. The rise in capital of US\\$6,500 is the profit of US\\$9,300 plus the US\\$2,000 introduced, less drawings of US\\$4,800.", explanation: "Profit is not the same as the change in capital when there are drawings or new capital." }),
    ],
    hints: ["Capital = assets - liabilities.", "Profit adds to capital; drawings reduce it."],
    explanation: "This item tests the accounting equation and the movement in capital.",
  });

  b.card("DEFINITION", "What is **duality** in accounting?", "Every transaction has two equal effects: a debit in one account and a credit in another.");
  b.card("FORMULA", "The accounting equation", "Assets = Capital + Liabilities (A = C + L). Closing capital = opening capital + new capital + profit - drawings.");
  b.card("FACT", "Which accounts are increased by a debit?", "Assets, expenses and drawings.");
  b.card("FACT", "Which accounts are increased by a credit?", "Liabilities, capital and income.");
  b.card("CONCEPT", "Credit sale: both entries", "Debit the customer's account; credit Sales.");
  b.card("CONCEPT", "Return of goods to a supplier", "Debit the supplier's account; credit Purchases returns.");
  b.card("FACT", "Discount allowed and discount received", "Allowed (to customers): an expense, debit. Received (from suppliers): income, credit.");
  b.card("DEFINITION", "What does 'balance c/d' mean?", "The difference between the two sides, carried down at the end of the period; it is brought down (b/d) on the opposite side to open the next period.");
  b.card("FACT", "Are drawings an expense?", "No. Drawings reduce capital and are not charged in the statement of profit or loss.");
});
