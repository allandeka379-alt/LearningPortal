// W2a: ZIMSEC Paper 2 exam-format item (20 marks): three-column cash book and petty cash book.
import { concept, P, money, check, sum, r2, ZIM } from "../lib.mjs";
import { cashBook, pettyCash, table } from "../tables/w2a-lib.mjs";

const U = String.raw`US\$`;
const pct = (a, p) => r2((a * p) / 100);

concept("acc.books.discounts-cash-book", { file: "exam/w2a-zimsec", keyPrefix: "exam.w2a-zimsec", applies: ZIM }, (b) => {
  // Petty cash for April (imprest 200)
  const pcPay = [["3 Apr", "Postage stamps", "71", "Postage", 13.4], ["5 Apr", "Cleaning materials", "72", "Cleaning", 24.6], ["7 Apr", "Bus fares", "73", "Travel", 16], ["9 Apr", "Courier", "74", "Postage", 30], ["15 Apr", "Cleaner's wages", "75", "Cleaning", 38], ["25 Apr", "Taxi fare", "76", "Travel", 36]];
  const pc = pettyCash("Petty cash book (April 2025)", { receipts: [["1 Apr", "Balance b/d", 200]], payments: pcPay, cols: ["Postage", "Cleaning", "Travel"], imprest: 200, cdDate: "30 Apr", bdDate: "1 May", restoreDate: "30 Apr" });
  check("pc paid", pc.paid, 158);

  const dRufaro = pct(2740, 5);
  const dGweru = pct(3460, 4);
  const dr = [
    ["1 Apr", "Balances b/d", null, 415, 3870],
    ["2 Apr", "Rufaro Store", dRufaro, null, r2(2740 - dRufaro)],
    ["6 Apr", "Sales", null, 1385, null],
    ["8 Apr", "Cash (C)", null, null, 1175],
    ["10 Apr", "Kudzi Shop", r2(885 - 867), 867, null],
    ["15 Apr", "Sales (card)", null, null, 2235],
  ];
  const cr = [
    ["4 Apr", "Gweru Millers", dGweru, null, r2(3460 - dGweru)],
    ["8 Apr", "Bank (C)", null, 1175, null],
    ["11 Apr", "Wages", null, 565, null],
    ["12 Apr", "Bulawayo Oils", r2(1980 - 1935), null, 1935],
    ["20 Apr", "Rent", null, null, 975],
    ["30 Apr", "Petty cash", null, null, pc.restore],
  ];
  const cb = cashBook("Cash book (April 2025)", dr, cr, { cdDate: "30 Apr", bdDate: "1 May" });
  check("cash", cb.cash, 415 + 1385 + 867 - 1175 - 565);
  check("bank", cb.bank, 3870 + 2603 + 1175 + 2235 - 3321.6 - 1935 - 975 - 158);
  check("da", cb.discAllowed, 137 + 18);
  check("dr", cb.discReceived, 138.4 + 45);

  b.struct({
    d: 5, secs: 1260, examStyle: true, skill: "APPLICATION", calculator: true,
    concepts: ["acc.books.discounts-cash-book", "acc.books.cash-book", "acc.books.petty-cash"],
    stem: "Tatenda Moyo runs a wholesale grocery business in Masvingo. He keeps a three-column cash book and an analysed petty cash book on the imprest system (imprest US\\$200, analysis columns: postage, cleaning, travel). On 1 April 2025 his cash book showed cash in hand US\\$415 and cash at bank US\\$3,870.\n\n" +
      "**Transactions for April 2025**\n\n" +
      table(["Date", "Transaction"], [
        ["2 Apr", "Received a cheque from Rufaro Store in settlement of its account of US\\$2,740, less 5% cash discount"],
        ["4 Apr", "Paid Gweru Millers US\\$3,460 owed, less 4% cash discount, by bank transfer"],
        ["6 Apr", "Cash sales US\\$1,385"],
        ["8 Apr", "Paid US\\$1,175 cash into the bank"],
        ["10 Apr", "Kudzi Shop paid US\\$867 cash in full settlement of US\\$885"],
        ["11 Apr", "Paid wages in cash US\\$565"],
        ["12 Apr", "Paid Bulawayo Oils by cheque US\\$1,935 in full settlement of US\\$1,980"],
        ["15 Apr", "Card sales US\\$2,235"],
        ["20 Apr", "Paid rent online US\\$975"],
        ["30 Apr", "Restored the petty cash imprest by bank transfer"],
      ]) +
      "\n\n**Petty cash vouchers for April 2025**\n\n" +
      table(["Date", "Details", "Voucher", U], pcPay.map((p) => [p[0], p[1], p[2], p[4]])),
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: cb.discAllowed, wrong: [r2(cb.discAllowed + cb.discReceived), dRufaro], stem: "Calculate the total of the discount allowed column for April.", explanation: `Rufaro Store $2,740 \\times 5\\% = 137$; Kudzi Shop $885 - 867 = 18$. Total ${money(cb.discAllowed)}.` }),
      P.num({ label: "(b)", marks: 1, kind: "money", value: cb.discReceived, wrong: [dGweru], stem: "Calculate the total of the discount received column for April.", explanation: `Gweru Millers $3,460 \\times 4\\% = 138.40$; Bulawayo Oils $1,980 - 1,935 = 45$. Total ${money(cb.discReceived)}.` }),
      P.num({ label: "(c)", marks: 1, kind: "money", value: pc.colTotals[0], wrong: [30], stem: "Calculate the total of the postage column of the petty cash book for April.", explanation: "$13.40 + 30 = 43.40$." }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: pc.restore, wrong: [200, pc.balance], stem: "Calculate the amount transferred from the bank on 30 April to restore the petty cash imprest.", explanation: `Vouchers $13.40 + 24.60 + 16 + 30 + 38 + 36 = 158$. Cash left $200 - 158 = 42$; the amount to restore the imprest is $200 - 42 = 158$.` }),
      P.num({ label: "(e)", marks: 2, kind: "money", value: cb.cash, wrong: [r2(cb.cash + 1175), r2(cb.cash + 18)], stem: "Calculate the cash balance at 30 April 2025.", explanation: `Cash: $415 + 1,385 + 867 - 1,175 - 565 = ${cb.cash}$.` }),
      P.num({ label: "(f)", marks: 2, kind: "money", value: cb.bank, wrong: [r2(cb.bank + pc.restore), r2(cb.bank - 2 * 1175)], stem: "Calculate the bank balance at 30 April 2025.", explanation: `Bank debits $3,870 + 2,603 + 1,175 + 2,235 = 9,883$; credits $3,321.60 + 1,935 + 975 + 158 = 6,389.60$; balance $9,883 - 6,389.60 = 3,493.40$ debit.` }),
      P.manual({
        label: "(g)", marks: 7, type: "EXTENDED_RESPONSE",
        stem: "Prepare Tatenda's three-column cash book for April 2025. Balance the cash and bank columns and bring down the balances on 1 May 2025.",
        points: [
          "Opening balances 415 cash and 3,870 bank on the debit side",
          "Rufaro Store: discount 137 and bank 2,603; Kudzi Shop: discount 18 and cash 867 (debit side)",
          "Cash sales 1,385 in the cash column and card sales 2,235 in the bank column (debit side)",
          "Gweru Millers: discount 138.40 and bank 3,321.60; Bulawayo Oils: discount 45 and bank 1,935 (credit side)",
          "Contra 1,175 on both sides marked C; wages 565 (cash), rent 975 and petty cash 158 (bank) on the credit side",
          "Discount columns totalled 155 and 183.40 (not balanced)",
          "Balances c/d 927 cash and 3,493.40 bank; totals 2,667 and 9,883; balances b/d on 1 May",
        ],
        modelAnswer: cb.md,
        explanation: "Receipts and discount allowed on the debit side; payments and discount received on the credit side; contras on both sides.",
      }),
      P.mcq({
        label: "(h)", stem: "How is the total of the discount allowed column posted in Tatenda's ledger?",
        options: [["Debit the discount allowed account US\\$155", "Correct: discount allowed is an expense."], ["Credit the discount allowed account US\\$155", "The customers are credited individually; the total is debited."], ["Debit the discount received account US\\$155", "The debit column holds discounts allowed to customers."], ["Credit the trade receivables account US\\$155", "Each customer is credited with their own discount, not with the total."]],
        answer: "A", explanation: "Debit discount allowed with the column total; customers have already been credited individually.",
      }),
      P.manual({
        label: "(i)", marks: 2,
        stem: "Explain how the imprest system helps Tatenda to control his petty cash.",
        points: ["Only a fixed, small amount (US\\$200) is held, and it is restored only by the amount spent as shown by vouchers", "Cash plus vouchers must always equal the imprest, so any shortage is found at a check"],
        modelAnswer: "The petty cashier holds only US\\$200 and is reimbursed for exactly what the authorised vouchers show. At any time the cash plus the vouchers must equal US\\$200, so a shortage is quickly detected.",
        explanation: "The fixed float and the voucher check give control.",
      }),
    ],
    hints: ["Cash discount = amount owed − amount paid.", "The petty cash restoration is a bank payment equal to the vouchers for the month.", "Balance cash and bank separately; total the discount columns."],
    explanation: "A ZIMSEC Paper 2 style question on the three-column cash book (Form 2) and the petty cash book on the imprest system.",
  });
  check("pc postage", pc.colTotals[0], 43.4);
  check("cash total", cb.cashTotal, 2667);
  check("bank total", cb.bankTotal, 9883);
  check("sum", sum([2, 1, 1, 2, 2, 2, 7, 1, 2]), 20);
});
