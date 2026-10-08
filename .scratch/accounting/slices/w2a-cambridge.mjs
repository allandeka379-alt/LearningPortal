// W2a: Cambridge 0452 Paper 2 exam-format item (20 marks): three-column cash book and petty cash (imprest).
import { concept, P, money, check, sum, r2, CAM } from "../lib.mjs";
import { cashBook, table } from "../tables/w2a-lib.mjs";

const U = String.raw`US\$`;
const pct = (a, p) => r2((a * p) / 100);

concept("acc.books.discounts-cash-book", { file: "exam/w2a-cambridge", keyPrefix: "exam.w2a-cambridge", applies: CAM }, (b) => {
  const imprest = 170;
  const vouchers = [["Postage", 23.8], ["Travel", 34], ["Cleaning", 26.2], ["Refreshments", 16]];
  const spent = sum(vouchers.map((v) => v[1]));
  const boxCash = 70;
  check("pc cross-check", r2(boxCash + spent), imprest);
  const restore = r2(imprest - boxCash);

  const dMutare = pct(2350, 4);
  const dr = [
    ["1 Nov", "Balance b/d", null, 235, null],
    ["2 Nov", "Chipo Traders", r2(1725 - 1656), null, 1656],
    ["4 Nov", "Sales", null, 1695, null],
    ["6 Nov", "Cash (C)", null, null, 1410],
    ["10 Nov", "Gift Ndlovu", r2(862.5 - 828), null, 828],
    ["20 Nov", "Sales (card)", null, null, 2580],
  ];
  const cr = [
    ["1 Nov", "Balance b/d", null, null, 1285],
    ["6 Nov", "Bank (C)", null, 1410, null],
    ["8 Nov", "Mutare Paper Mills", dMutare, null, r2(2350 - dMutare)],
    ["12 Nov", "Insurance", null, null, 395],
    ["25 Nov", "Harare Inks", null, null, 815],
    ["30 Nov", "Petty cash", null, null, restore],
  ];
  const cb = cashBook("Cash book (November 2025)", dr, cr, { cdDate: "30 Nov", bdDate: "1 Dec" });
  check("cash", cb.cash, 235 + 1695 - 1410);
  check("bank", cb.bank, 1656 + 1410 + 828 + 2580 - 1285 - 2256 - 395 - 815 - 100);
  check("da", cb.discAllowed, 69 + 34.5);
  check("dr", cb.discReceived, 94);
  check("4% Chipo", pct(1725, 4), 69);
  check("4% Gift", pct(862.5, 4), 34.5);

  b.struct({
    d: 5, secs: 1260, examStyle: true, skill: "ANALYSIS", calculator: true,
    concepts: ["acc.books.discounts-cash-book", "acc.books.cash-book", "acc.books.petty-cash"],
    stem: `Nyasha Chikomo owns an office-supplies business in Harare. She keeps a three-column cash book and a petty cash book on the imprest system with an imprest of ${money(imprest)}. Her credit customers are offered 4% cash discount for payment within 10 days.\n\nOn 1 November 2025 her cash book showed cash in hand US\\$235 and a bank overdraft of US\\$1,285.\n\n` +
      "**Transactions for November 2025**\n\n" +
      table(["Date", "Transaction"], [
        ["2 Nov", "Chipo Traders paid US\\$1,656 by bank transfer in full settlement of US\\$1,725"],
        ["4 Nov", "Cash sales US\\$1,695"],
        ["6 Nov", "Paid US\\$1,410 cash into the bank"],
        ["8 Nov", "Paid Mutare Paper Mills US\\$2,350 owed, less 4% cash discount, by bank transfer"],
        ["10 Nov", "Gift Ndlovu paid US\\$828 by debit card in full settlement of US\\$862.50"],
        ["12 Nov", "Paid insurance US\\$395 by direct debit"],
        ["20 Nov", "Card sales US\\$2,580"],
        ["25 Nov", "Paid Harare Inks US\\$815 by cheque; the discount period had ended"],
        ["30 Nov", "Restored the petty cash imprest by bank transfer"],
      ]) +
      `\n\nOn 30 November the petty cash vouchers for the month totalled: postage US\\$23.80, travel US\\$34, cleaning US\\$26.20 and refreshments US\\$16. The cash in the petty cash box was ${money(boxCash)}.`,
    parts: [
      P.mcq({
        label: "(a)", stem: "What did Nyasha's bank column show on 1 November 2025?",
        options: [["A credit balance of US\\$1,285: she owed the bank", "Correct: an overdraft is a credit balance in the bank column."], ["A debit balance of US\\$1,285: money in the bank", "An overdraft is not money in the bank."], ["A credit balance of US\\$235: an overdraft", "US\\$235 is the cash in hand."], ["A debit balance of US\\$1,520: cash and bank together", "Cash and bank are balanced separately."]],
        answer: "A", explanation: "An overdraft is brought down on the credit side of the bank column.",
      }),
      P.num({ label: "(b)", marks: 1, kind: "money", value: r2(2350 - dMutare), wrong: [2350, r2(2350 - 4)], stem: "Calculate the amount paid to Mutare Paper Mills on 8 November.", explanation: `$2,350 \\times 4\\% = 94$; $2,350 - 94 = 2,256$.` }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: restore, wrong: [imprest, boxCash], stem: "Calculate the amount transferred on 30 November to restore the petty cash imprest.", explanation: `Vouchers $23.80 + 34 + 26.20 + 16 = 100$; check: $100 + 70 = 170$, the imprest. Amount to restore $170 - 70 = 100$.` }),
      P.num({ label: "(d)", marks: 1, kind: "money", value: cb.discAllowed, wrong: [r2(cb.discAllowed + cb.discReceived)], stem: "Calculate the total of the discount allowed column for November.", explanation: "Chipo Traders $1,725 - 1,656 = 69$; Gift Ndlovu $862.50 - 828 = 34.50$; total 103.50." }),
      P.num({ label: "(e)", marks: 1, kind: "money", value: cb.discReceived, wrong: [r2(cb.discReceived + pct(815, 4))], stem: "Calculate the total of the discount received column for November.", explanation: "Only Mutare Paper Mills gave a discount: 94. Harare Inks was paid after the discount period, so no discount." }),
      P.num({ label: "(f)", marks: 2, kind: "money", value: cb.bank, wrong: [r2(cb.bank + 2 * 1285), r2(cb.bank - 828)], stem: "Calculate the bank balance at 30 November 2025 (it is a debit balance).", explanation: `Debits $1,656 + 1,410 + 828 + 2,580 = 6,474$; credits $1,285 + 2,256 + 395 + 815 + 100 = 4,851$; balance $6,474 - 4,851 = 1,623$ debit. Treating the opening overdraft as money in the bank gives ${money(r2(cb.bank + 2 * 1285))}.` }),
      P.manual({
        label: "(g)", marks: 7, type: "EXTENDED_RESPONSE",
        stem: "Prepare Nyasha's three-column cash book for November 2025. Balance the cash and bank columns and bring down the balances on 1 December 2025.",
        points: [
          "Opening cash 235 on the debit side and opening overdraft 1,285 in the bank column on the credit side",
          "Chipo Traders: discount 69 and bank 1,656; Gift Ndlovu: discount 34.50 and bank 828 (debit side)",
          "Cash sales 1,695 (cash) and card sales 2,580 (bank) on the debit side",
          "Mutare Paper Mills: discount 94 and bank 2,256; Harare Inks 815 with no discount (credit side)",
          "Contra 1,410 on both sides marked C; insurance 395 and petty cash 100 in the bank column",
          "Discount columns totalled 103.50 and 94 (not balanced)",
          "Balances c/d 520 cash and 1,623 bank; totals 1,930 and 6,474; balances b/d on 1 December",
        ],
        modelAnswer: cb.md,
        explanation: "The overdraft starts on the credit side; card and debit-card receipts go in the bank column.",
      }),
      P.fib({
        label: "(h)", marks: 2, stem: "Complete the postings of the discount column totals.",
        template: "The discount allowed total of US\\$103.50 is posted to the {{blank:a}} side of the discount allowed account; the discount received total of US\\$94 is posted to the {{blank:b}} side of the discount received account.",
        blanks: [{ id: "a", accepted: ["debit"], choices: ["debit", "credit"] }, { id: "b", accepted: ["credit"], choices: ["credit", "debit"] }],
        explanation: "Discount allowed is an expense (debit); discount received is income (credit).",
      }),
      P.manual({
        label: "(i)", marks: 3,
        stem: "Nyasha is considering withdrawing the 4% cash discount she offers to customers. Evaluate this proposal and advise her.",
        points: ["Benefit: she keeps the full amount owed, so profit rises (discount allowed is an expense)", "Drawback: customers may pay later, so cash flow worsens / risk of irrecoverable debts rises; she has only recently cleared an overdraft", "Justified recommendation, e.g. keep the discount while cash flow is tight, or withdraw it only if customers already pay promptly"],
        modelAnswer: "Withdrawing the discount would save about US\\$100 a month and increase profit. But customers would have less reason to pay quickly, and Nyasha started November overdrawn, so slower receipts could push the bank account back into overdraft and increase the risk of bad debts. She should keep the discount until her bank balance is consistently positive.",
        explanation: "An evaluation weighs profit against cash flow and reaches a supported decision.",
      }),
    ],
    hints: ["An opening overdraft is a credit balance b/d in the bank column.", "Card and transfer receipts go in the bank column.", "Amount to restore the imprest = imprest − cash left."],
    explanation: "A Cambridge 0452 Paper 2 style question on the three-column cash book, cash discounts and the imprest system, ending with an evaluation.",
  });
  check("cash total", cb.cashTotal, 1930);
  check("bank total", cb.bankTotal, 6474);
  check("marks", sum([1, 1, 2, 1, 1, 2, 7, 2, 3]), 20);
});
