// W2a: the two-column cash book.
import { concept, P, money, tAccount, check, sum, r2 } from "../lib.mjs";
import { cashBook, table } from "../tables/w2a-lib.mjs";

const U = String.raw`US\$`;

concept("acc.books.cash-book", { file: "books/cash-book", keyPrefix: "books.cash-book" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On which side of the cash book are **receipts** of money recorded?",
    options: [
      ["The debit side", "Correct: money coming in increases cash or bank, an asset, so it is debited."],
      ["The credit side", "Payments go on the credit side."],
      ["Either side, depending on the amount", "The side depends on the direction of the money, not the amount."],
      ["Neither side; receipts go in the sales journal", "The sales journal records credit sales, not money received."],
    ],
    answer: "A",
    explanation: "The cash book is the ledger account for cash and bank: receipts are debits and payments are credits.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Rudo pays US\\$500 of the shop's cash into the business bank account. How is this recorded in her two-column cash book?",
    options: [
      ["Credit the cash column and debit the bank column, both marked C", "Correct: a contra entry; cash falls and bank rises."],
      ["Debit the cash column and credit the bank column", "This is the entry for withdrawing cash from the bank."],
      ["Debit the bank column only", "Both columns change: cash goes down as bank goes up."],
      ["Credit the cash column and debit a bank account in the ledger", "The cash book is the bank account; nothing is posted to the ledger."],
    ],
    answer: "A",
    explanation: "Cash paid into the bank is a **contra entry**: credit cash, debit bank, each marked C. Both halves are in the cash book, so nothing is posted to the ledger.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A customer pays Chipo's bakery by **debit card**. In which column of the cash book is the receipt recorded?",
    options: [
      ["The bank column on the debit side", "Correct: card receipts go straight into the bank account."],
      ["The cash column on the debit side", "No notes or coins are received; the money goes to the bank."],
      ["The bank column on the credit side", "The credit side is for payments."],
      ["The cash column on the credit side", "This would record a cash payment."],
    ],
    answer: "A",
    explanation: "Card, cheque, transfer and online receipts all go in the **bank** column on the **debit** side.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "The bank column of a cash book shows a **credit** balance brought down of US\\$840. What does this mean?",
    options: [
      ["The business has a bank overdraft of US\\$840", "Correct: payments have exceeded receipts, so the business owes the bank."],
      ["The business has US\\$840 in the bank", "Money in the bank is a debit balance."],
      ["The business has US\\$840 cash in the till", "Cash is in a separate column, and it cannot have a credit balance."],
      ["The bank owes the business interest of US\\$840", "Interest would be recorded as a separate receipt."],
    ],
    answer: "A",
    explanation: "A credit balance in the bank column is an **overdraft**, a current liability.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Tendai pays his electricity bill by online transfer and records it in the cash book. Which ledger entry completes the double entry?",
    options: [
      ["Debit the electricity account", "Correct: the cash book holds the credit; the other account is debited."],
      ["Credit the electricity account", "An expense paid is debited, not credited."],
      ["Debit the bank account in the general ledger", "The cash book already is the bank account."],
      ["Credit the cash account in the general ledger", "This was a bank payment, and the cash book is already the cash account."],
    ],
    answer: "A",
    explanation: "The **dual function**: the cash book is the bank account, so only the other half is posted, on the opposite side: debit electricity.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why are contra entries **not** posted to the ledger?",
    options: [
      ["Both accounts affected are already in the cash book", "Correct: the cash and bank accounts are the two columns of the cash book."],
      ["Contra entries do not change any balances", "They change both the cash and the bank balances."],
      ["Contra entries are posted to the general journal instead", "No journal entry is needed for a contra."],
      ["They are too small to be worth posting", "Size has nothing to do with it; contras can be large."],
    ],
    answer: "A",
    hints: ["Which two accounts does a contra entry affect, and where are they kept?"],
    explanation: "A contra is a transfer between cash and bank. Both the debit and the credit are recorded in the cash book itself, so the double entry is already complete.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "On 1 May, Sipho's bank column showed an overdraft of US\\$300. In May he banked receipts of US\\$2,100 and made bank payments of US\\$1,450. What was the bank balance at 31 May?",
    options: [
      ["US\\$350 debit (money in the bank)", "Correct: −300 + 2,100 − 1,450 = 350, a debit balance."],
      ["US\\$950 debit (money in the bank)", "This treats the opening overdraft as money in the bank."],
      ["US\\$350 credit (an overdraft)", "Receipts exceed the overdraft plus payments, so the balance is a debit."],
      ["US\\$3,850 debit (money in the bank)", "This adds every amount instead of subtracting payments and the overdraft."],
    ],
    answer: "A",
    hints: ["Start from −300 because the business owed the bank."],
    explanation: "Debits 2,100; credits $300 + 1,450 = 1,750$. Balance $2,100 - 1,750 = 350$ **debit**: Sipho now has US\\$350 in the bank.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A clerk balancing a two-column cash book finds that the **cash** column has a credit balance of US\\$60. What should he conclude?",
    options: [
      ["An error has been made, because cash cannot be overdrawn", "Correct: a business cannot pay out more notes and coins than it holds."],
      ["The business has a cash overdraft of US\\$60", "Overdrafts exist only on bank accounts."],
      ["The business owes its customers US\\$60", "Amounts owed to customers are not shown in the cash column."],
      ["The balance is correct if the bank column has a debit balance", "Each column is balanced on its own; cash can never be in credit."],
    ],
    answer: "A",
    hints: ["Think about what physical cash is."],
    explanation: "Cash in hand can fall to zero but never below it. A credit balance shows an error, for example a bank payment entered in the cash column.",
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "The cash book is both a book of prime entry and a ledger account.",
    answer: true,
    explanation: "True. This is its dual function: transactions are first recorded there, and it replaces the cash and bank accounts in the ledger.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Cash withdrawn from the bank for business use is entered on the debit side of the bank column.",
    answer: false,
    explanation: "False. The bank balance falls, so the bank column is **credited**; the cash column is debited. Both entries are marked C.",
  });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Thandeka runs a hair salon in Masvingo. Match each transaction with the correct cash book entry.",
    pairs: ["Takings received in notes and coins", "Rent paid by standing order", "A client pays by credit card", "Cash paid into the bank", "Wages paid in cash"],
    right: ["Debit cash column", "Credit bank column", "Debit bank column", "Credit cash, debit bank (contra)", "Credit cash column"],
    rightIndex: [0, 1, 2, 3, 4],
    explanation: "Receipts are debits and payments credits; the method decides the column; a transfer between cash and bank is a contra.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "When a business pays a supplier by cheque, the {{blank:a}} column of the cash book is {{blank:b}}, and the supplier's account is {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["bank"], choices: ["bank", "cash"] },
      { id: "b", accepted: ["credited"], choices: ["credited", "debited"] },
      { id: "c", accepted: ["debited"], choices: ["debited", "credited"] },
    ],
    explanation: "A cheque payment reduces the bank balance (credit bank) and reduces what is owed to the supplier (debit the supplier).",
  });

  // Calculation: cash and bank balances
  const q1 = cashBook("x",
    [["1 Apr", "Balances b/d", 195, 1830], ["6 Apr", "Sales", 960, null], ["11 Apr", "Cash (C)", null, 650], ["20 Apr", "Kudzai Phiri", null, 515]],
    [["4 Apr", "Purchases", null, 1260], ["11 Apr", "Bank (C)", 650, null], ["15 Apr", "Wages", 340, null], ["26 Apr", "Telephone", null, 170]],
    { discounts: false });
  check("q1", q1.bank, 1565);
  b.calc({
    d: 3, kind: "money", value: q1.bank, wrong: [r2(q1.bank - 650), r2(q1.bank - 1300)], calculator: true,
    stem: "Tatenda's cash book on 1 April showed cash US\\$195 and bank US\\$1,830. In April: 4 Apr paid for purchases by bank transfer US\\$1,260; 6 Apr cash sales US\\$960; 11 Apr paid US\\$650 cash into the bank; 15 Apr paid wages in cash US\\$340; 20 Apr Kudzai Phiri paid US\\$515 by bank transfer; 26 Apr paid the telephone bill online US\\$170. Calculate the **bank** balance at 30 April.",
    hints: ["Only bank items count; the 11 April contra adds to the bank."],
    explanation: `Bank debits: $1,830 + 650 + 515 = 2,995$. Bank credits: $1,260 + 170 = 1,430$. Balance $2,995 - 1,430 = ${q1.bank.toLocaleString("en-GB")}$ debit, so ${money(q1.bank)}. Leaving out the contra gives ${money(r2(q1.bank - 650))}; entering it on the wrong side gives ${money(r2(q1.bank - 1300))}.`,
  });
  b.num({
    d: 2, kind: "money", value: r2(85 + 1240 + 200 - 900 - 115), wrong: [r2(85 + 1240 + 200 - 115)],
    stem: "Rudo runs a tuck shop in Gweru. On 1 May she had US\\$85 in the cash box. During May: cash sales US\\$1,240; she paid US\\$900 of the cash into the bank; paid a cleaner US\\$115 in cash; withdrew US\\$200 from the bank for the till. Calculate the **cash** balance at the end of May.",
    explanation: `Cash: $85 + 1,240 + 200 - 900 - 115 = ${r2(85 + 1240 + 200 - 900 - 115)}$, so ${money(r2(85 + 1240 + 200 - 900 - 115))}. Forgetting that the cash banked leaves the cash column gives ${money(r2(85 + 1240 + 200 - 115))}.`,
  });
  // Overdraft calculation
  const od = cashBook("x", [["1 Aug", "Balance b/d", null, 470], ["12 Aug", "Sales", null, 1415]], [["5 Aug", "Purchases", null, 2260], ["19 Aug", "Rent", null, 620], ["27 Aug", "Drawings", null, 350]], { discounts: false });
  check("od", od.bank, -1345);
  b.calc({
    d: 3, kind: "money", value: -od.bank, wrong: [r2(470 + 1415 + 2260 + 620 + 350)], calculator: true,
    stem: "On 1 August Farai had US\\$470 in the bank. In August he banked card sales of US\\$1,415 and paid by bank: purchases US\\$2,260, rent US\\$620 and drawings US\\$350. Calculate the bank overdraft at the end of August (give the amount only).",
    hints: ["Total the receipts and the payments, then compare."],
    explanation: `Debits $470 + 1,415 = 1,885$; credits $2,260 + 620 + 350 = 3,230$. Payments exceed receipts by $3,230 - 1,885 = 1,345$: an overdraft of ${money(-od.bank)}, a credit balance carried down on the debit side.`,
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain what is meant by the **dual function** of the cash book.",
    points: ["It is a book of prime entry: cash and bank transactions are first recorded in it", "It is also a ledger account (the cash account and the bank account), so only the other side of each entry is posted"],
    modelAnswer: "The cash book is where receipts and payments are first recorded, so it is a book of prime entry. It also takes the place of the cash and bank accounts in the ledger, so only the other account is posted.",
    hints: ["Two roles: where entries start, and where they are kept."],
    explanation: "Both boards expect both parts.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "Nyasha's cash book shows a large bank overdraft at the end of every month. Suggest **one** reason for this and **one** action she could take, and explain the risk of doing nothing.",
    points: ["Reason, e.g. customers pay late / heavy drawings / buying non-current assets out of the bank account / falling sales", "Action, e.g. chase receivables, reduce drawings, take a long-term loan for assets, cut expenses", "Risk: interest and charges reduce profit / the bank may cancel the facility and payments bounce"],
    modelAnswer: "She may be buying equipment from her current account. She could finance assets with a long-term loan instead. If nothing changes she pays overdraft interest and the bank may withdraw the overdraft, leaving her unable to pay suppliers.",
    hints: ["Think about why money goes out faster than it comes in."],
    explanation: "An overdraft is meant for short-term needs; a permanent one signals a cash-flow problem.",
  });

  // Practice structured 1: write up and balance a two-column cash book
  // the 14 Sep cash banked must also appear on the debit (bank) side
  const s1b = cashBook("Cash book (September 2025)",
    [["1 Sep", "Balances b/d", 185, 2640], ["3 Sep", "Sales", 1125, null], ["9 Sep", "Bank (C)", 300, null], ["13 Sep", "Cash (C)", null, 800], ["16 Sep", "Hwange Clinic", null, 1480], ["25 Sep", "Sales (card)", null, 915]],
    [["2 Sep", "Purchases", null, 1960], ["7 Sep", "Wages", 420, null], ["9 Sep", "Cash (C)", null, 300], ["13 Sep", "Bank (C)", 800, null], ["20 Sep", "Insurance", null, 375], ["26 Sep", "Drawings", 180, null]],
    { discounts: false, cdDate: "30 Sep", bdDate: "1 Oct" });
  check("s1 cash", s1b.cash, 185 + 1125 + 300 - 420 - 800 - 180);
  check("s1 bank", s1b.bank, 2640 + 800 + 1480 + 915 - 1960 - 300 - 375);
  b.struct({
    d: 4, examStyle: true, skill: "APPLICATION", calculator: true,
    stem: "Chipo runs a hardware shop in Chinhoyi. On 1 September 2025 she had US\\$185 cash and US\\$2,640 in the bank. Her transactions in September were:\n\n" +
      table(["Date", "Transaction", U], [["2 Sep", "Paid for purchases by bank transfer", 1960], ["3 Sep", "Cash sales", 1125], ["7 Sep", "Paid wages in cash", 420], ["9 Sep", "Withdrew cash from the bank for the shop", 300], ["13 Sep", "Paid cash into the bank", 800], ["16 Sep", "Hwange Clinic, a credit customer, paid by cheque", 1480], ["20 Sep", "Paid insurance online", 375], ["25 Sep", "Card sales", 915], ["26 Sep", "Chipo took cash for private use", 180]]),
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: s1b.cash, wrong: [r2(s1b.cash + 800 - 300)], stem: "Calculate the cash balance at 30 September.", explanation: `Cash: $185 + 1,125 + 300 - 420 - 800 - 180 = ${s1b.cash}$.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: s1b.bank, wrong: [r2(s1b.bank - 800 + 300)], stem: "Calculate the bank balance at 30 September.", explanation: `Bank: $2,640 + 800 + 1,480 + 915 - 1,960 - 300 - 375 = ${s1b.bank.toLocaleString("en-GB")}$.` }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Prepare Chipo's two-column cash book for September 2025, balanced at 30 September with the balances brought down.", points: ["Opening balances 185 and 2,640 on the debit side", "Receipts: sales 1,125 (cash), Hwange Clinic 1,480 and card sales 915 (bank)", "Payments: purchases 1,960, insurance 375 (bank); wages 420, drawings 180 (cash)", "Contras on 9 Sep and 13 Sep on both sides, marked C", `Balances c/d ${s1b.cash} cash and ${s1b.bank.toLocaleString("en-GB")} bank; totals ${s1b.cashTotal.toLocaleString("en-GB")} and ${s1b.bankTotal.toLocaleString("en-GB")}`, "Balances b/d on the debit side dated 1 Oct"], modelAnswer: s1b.md, explanation: "Each contra appears twice, once in each column on opposite sides." }),
      P.mcq({
        label: "(d)", stem: "Which ledger entry is made for the transaction on 16 September?",
        options: [["Credit Hwange Clinic US\\$1,480", "Correct: the customer owes less after paying."], ["Debit Hwange Clinic US\\$1,480", "Debiting the customer would show that the clinic owes more."], ["Credit sales US\\$1,480", "The sale was already recorded when it was made on credit."], ["Debit bank US\\$1,480 in the general ledger", "The cash book is the bank account."]],
        answer: "A", explanation: "A receipt from a credit customer is credited to the customer's account.",
      }),
    ],
    hints: ["Cheque, card and online items go in the bank column.", "Each contra is entered on both sides."],
    explanation: "This item tests recording, contras, balancing and posting from the two-column cash book.",
  });
  check("s1 values", s1b.cash * 10000 + s1b.bank, 210 * 10000 + 3200);

  // Practice structured 2: interpret a cash book with overdraft
  const s2dr = [["1 Oct", "Balance b/d", 245, null], ["8 Oct", "Sales", 1340, null], ["10 Oct", "Cash (C)", null, 1200], ["23 Oct", "Loan: Agribank", null, 2500]];
  const s2cr = [["1 Oct", "Balance b/d", null, 1380], ["10 Oct", "Bank (C)", 1200, null], ["15 Oct", "Motor van", null, 3600], ["17 Oct", "Fuel", 220, null], ["29 Oct", "Wages", null, 685]];
  const s2 = cashBook("Cash book (October 2025)", s2dr, s2cr, { discounts: false, cdDate: "31 Oct", bdDate: "1 Nov" });
  check("s2", s2.bank, -1965);
  b.struct({
    d: 5, examStyle: true, skill: "ANALYSIS", calculator: true,
    stem: "Sipho operates a delivery service in Mutare. His cash book for October 2025 is shown before balancing.\n\n" + cashBook("Cash book (October 2025)", s2dr, s2cr, { discounts: false, balance: false }).md,
    parts: [
      P.mcq({
        label: "(a)", stem: "What did Sipho's bank column show on 1 October?",
        options: [["An overdraft of US\\$1,380", "Correct: the balance b/d is on the credit side of the bank column."], ["US\\$1,380 in the bank", "Money in the bank would be a debit balance b/d."], ["US\\$260 in the bank", "US\\$260 is the opening cash balance."], ["An overdraft of US\\$260", "US\\$260 is cash, which cannot be overdrawn."]],
        answer: "A", explanation: "A credit balance b/d in the bank column is an overdraft.",
      }),
      P.num({ label: "(b)", marks: 1, kind: "money", value: s2.cash, wrong: [r2(245 + 1340 - 220)], stem: "Calculate the cash balance at 31 October.", explanation: `$245 + 1,340 - 1,200 - 220 = ${s2.cash}$.` }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: -s2.bank, wrong: [r2(2 * 1380 + s2.bank)], stem: "Calculate the bank overdraft at 31 October (amount only).", explanation: `Debits $1,200 + 2,500 = 3,700$; credits $1,380 + 3,600 + 685 = 5,665$; overdraft $5,665 - 3,700 = ${(-s2.bank).toLocaleString("en-GB")}$.` }),
      P.manual({ label: "(d)", marks: 3, type: "EXTENDED_RESPONSE", stem: "Balance the cash book and bring down the balances on 1 November.", points: [`Cash balance c/d ${s2.cash} on the credit side; bank balance c/d ${(-s2.bank).toLocaleString("en-GB")} on the debit side`, `Totals ${s2.cashTotal.toLocaleString("en-GB")} (cash) and ${s2.bankTotal.toLocaleString("en-GB")} (bank) on both sides`, `Balance b/d ${s2.cash} cash on the debit side and ${(-s2.bank).toLocaleString("en-GB")} bank on the credit side, dated 1 Nov`], modelAnswer: s2.md, explanation: "The overdraft is carried down on the debit side and brought down on the credit side." }),
      P.manual({ label: "(e)", marks: 2, stem: "Sipho bought the motor van from his bank account. Explain why this increased his overdraft and suggest a better way to finance it.", points: ["The van (3,600) was paid from the current account, which was already overdrawn, so payments far exceeded receipts", "Better: use the long-term loan for the van / hire purchase / a longer-term source of finance for a non-current asset"], modelAnswer: "The van cost US\\$3,600, more than the month's receipts, and the account was already overdrawn. A long-term loan or hire purchase matched to the van's life would be better than an overdraft.", explanation: "Non-current assets should be financed with long-term funds." }),
    ],
    hints: ["Balance b/d on the credit side of the bank column means an overdraft.", "Balance each column separately."],
    explanation: "This item tests interpreting and balancing a cash book with an overdraft.",
  });

  b.card("DEFINITION", "What is a **two-column cash book**?", "A cash book with Cash and Bank columns on each side; receipts on the debit side, payments on the credit side.");
  b.card("CONCEPT", "What is the **dual function** of the cash book?", "It is a book of prime entry and also the ledger account for cash and bank, so only the other account is posted.");
  b.card("DEFINITION", "What is a **contra entry**?", "A transfer between the cash and bank columns (e.g. cash paid into the bank), entered on both sides and marked C; not posted to the ledger.");
  b.card("FACT", "Cash paid into the bank", "Credit the cash column, debit the bank column (both marked C).");
  b.card("FACT", "Cash withdrawn from the bank for the business", "Debit the cash column, credit the bank column (both marked C).");
  b.card("CONCEPT", "Credit balance in the bank column", "A bank overdraft: a current liability.");
  b.card("FACT", "Which column for cheques, cards and transfers?", "The bank column.");
  b.card("FACT", "Can the cash column have a credit balance?", "No. Cash cannot fall below zero; a credit balance shows an error.");
  b.card("FACT", "Posting a cash book payment", "Debit the other account (e.g. rent, a supplier, drawings).");
});
