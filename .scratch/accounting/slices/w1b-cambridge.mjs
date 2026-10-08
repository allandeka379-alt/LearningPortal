// W1b: Cambridge 0452 Paper 2 exam-format items (20 marks): (1) double entry from transactions and the running
// balance format; (2) accounting concepts and ethics applied to a case.
import { concept, P, money, tAccount, runningBalance, statement, check, sum, r2, balanceOf, CAM } from "../lib.mjs";

concept("acc.ledger.posting-balancing", { file: "exam/w1b-cambridge", keyPrefix: "exam.w1b-cambridge", applies: CAM }, (b) => {
  // ---------------------------------------------------------------------------------------------------------------
  // Item 1: Sipho Ndlovu, electrical repairs, Bulawayo, June 2025
  const rows = [
    ["1 Jun", "Balance", 1520, null],
    ["4 Jun", "Purchases", null, 1735],
    ["8 Jun", "Fees received", 2290, null],
    ["12 Jun", "Rent", null, 680],
    ["15 Jun", "Rudo Banda", 980, null],
    ["20 Jun", "Tools and equipment", null, 2475],
    ["25 Jun", "Drawings", null, 400],
    ["30 Jun", "Fees received", 615, null],
  ];
  const rb = runningBalance("Bank account", rows);
  check("rb", rb.closing, 115);
  const lowest = (() => { let bal = 0, min = Infinity; for (const [, , d, c] of rows) { bal = r2(bal + (d ?? 0) - (c ?? 0)); min = Math.min(min, bal); } return min; })();
  check("lowest", lowest, -500);
  const rudo = balanceOf([["1 Jun", "Balance b/d", 1640], ["10 Jun", "Fees received", 715]], [["15 Jun", "Bank", 980]]);
  check("rudo", rudo.amount, 1375);
  const rudoModel = tAccount("Rudo Banda account", [["1 Jun", "Balance b/d", 1640], ["10 Jun", "Fees received", 715]], [["15 Jun", "Bank", 980]], { cdDate: "30 Jun", bdDate: "1 Jul" });
  const accts = ["Bank", "Purchases", "Fees received", "Rent", "Rudo Banda", "Tools and equipment", "Drawings", "Capital"];

  b.struct({
    d: 4, secs: 1260, examStyle: true, skill: "APPLICATION", calculator: true,
    concepts: ["acc.ledger.double-entry", "acc.ledger.posting-balancing", "acc.ledger.divisions"],
    stem: `Sipho Ndlovu runs an electrical repairs business in Bulawayo. On 1 June 2025 his bank account had a debit balance of ${money(1520)} and Rudo Banda, a credit customer, owed him ${money(1640)}. His transactions for June 2025 included:\n\n| Date | Transaction | US\\$ |\n| --- | --- | ---: |\n| 4 Jun | Bought spare parts for resale, paying by bank transfer | 1,735 |\n| 8 Jun | Fees for repairs received by bank transfer | 2,290 |\n| 10 Jun | Repaired Rudo Banda's equipment on credit | 715 |\n| 12 Jun | Paid rent by bank transfer | 680 |\n| 15 Jun | Received a bank transfer from Rudo Banda | 980 |\n| 20 Jun | Bought testing tools, paying by bank transfer | 2,475 |\n| 25 Jun | Sipho transferred money to his personal account | 400 |\n| 30 Jun | Fees for repairs received by bank transfer | 615 |`,
    parts: [
      P.fib({
        label: "(a)", stem: "Name the account debited and the account credited for each transaction.",
        template: "10 June: debit {{blank:a}}, credit {{blank:b}}. 20 June: debit {{blank:c}}, credit {{blank:d}}. 25 June: debit {{blank:e}}, credit {{blank:f}}.",
        blanks: [
          { id: "a", accepted: ["Rudo Banda"], choices: accts },
          { id: "b", accepted: ["Fees received"], choices: accts },
          { id: "c", accepted: ["Tools and equipment"], choices: accts },
          { id: "d", accepted: ["Bank"], choices: accts },
          { id: "e", accepted: ["Drawings"], choices: accts },
          { id: "f", accepted: ["Bank"], choices: accts },
        ],
        wrong: [["Fees received", "Rudo Banda", "Purchases", "Bank", "Capital", "Bank"]],
        explanation: "10 June: a credit customer owes more (debit Rudo Banda) and income increases (credit fees received). 20 June: a non-current asset is bought (debit tools and equipment, credit bank). 25 June: money taken by the owner (debit drawings, credit bank).",
      }),
      P.num({
        label: "(b)", marks: 2, kind: "money", value: rudo.amount, wrong: [r2(1640 - 980), r2(1640 + 715)],
        stem: "Calculate the amount owed by Rudo Banda at 30 June 2025.",
        explanation: `$1,640 + 715 - 980 = ${rudo.amount.toLocaleString("en-GB")}$ (debit balance). Forgetting the 10 June work gives ${money(r2(1640 - 980))}.`,
        workedSolution: rudoModel,
      }),
      P.manual({
        label: "(c)", marks: 6, type: "EXTENDED_RESPONSE",
        stem: "Prepare Sipho's bank account for June 2025 using the three-column running balance format.",
        points: ["Columns: Date, Details, Debit, Credit, Balance", "Opening balance 1,520 Dr", "Receipts (fees received 2,290 and 615, Rudo Banda 980) in the debit column", "Payments (purchases 1,735, rent 680, tools and equipment 2,475, drawings 400) in the credit column", "Balances after each entry, labelled Dr or Cr (own figures)", "Closing balance 115 Dr"],
        modelAnswer: rb.md,
        explanation: "Each balance is the previous one plus debits or minus credits.",
      }),
      P.num({
        label: "(d)", marks: 2, kind: "money", value: Math.abs(lowest), wrong: [100, 215],
        stem: "State the largest overdraft on the bank account during June (amount only).",
        explanation: `Running balance: $1,520 \\rightarrow -215 \\rightarrow 2,075 \\rightarrow 1,395 \\rightarrow 2,375 \\rightarrow -100 \\rightarrow -500 \\rightarrow 115$. The largest overdraft is ${money(Math.abs(lowest))} Cr, after the drawings on 25 June. The ${money(100)} overdraft after the tools on 20 June is smaller.`,
      }),
      P.mcq({
        label: "(e)", stem: "In which division of the ledger is Rudo Banda's account kept?",
        options: [["Sales ledger", "Correct: she is a credit customer."], ["Purchases ledger", "That holds credit suppliers' accounts."], ["Nominal (general) ledger", "That holds income, expense, asset and capital accounts."], ["Cash book", "The cash book records cash and bank only."]],
        answer: "A",
        explanation: "Credit customers' accounts are kept in the sales ledger.",
      }),
      P.manual({
        label: "(f)", marks: 3,
        stem: "Sipho paid for the testing tools from his bank account, which made it overdrawn. Advise him whether he should have used a different method of finance. Justify your answer.",
        points: ["An overdraft is short-term and expensive (interest) and the bank can demand repayment", "Tools are a non-current asset used for years, so long-term finance (a loan, or buying on credit / paying from savings as capital) matches their life better", "Conclusion: he should have used a loan or credit terms, keeping the overdraft for short-term needs"],
        modelAnswer: "He should have used longer-term finance. An overdraft is meant for short-term needs, carries high interest and can be withdrawn. The tools will be used for several years, so a bank loan or credit terms from the supplier would match their life and keep the bank account in credit for running costs.",
        explanation: "Advise questions need a recommendation supported by reasons.",
      }),
    ],
    hints: ["Money in is debited to bank; money out is credited.", "Keep a running total line by line; a negative total is a credit (overdraft)."],
    explanation: "This question tests double entry from transactions, the running balance format, ledger divisions and evaluation of the result.",
  });

  // ---------------------------------------------------------------------------------------------------------------
  // Item 2: Thandeka's Bakery, Mutare — concepts and ethics
  const c = { draft: 24360, deposit: 1390, homeRent: 2250, mixer: 34, premGain: 9000, insPrepaid: 525, premCost: 65000 };
  // insurance prepaid had been charged in full as an expense: removing it raises profit by insPrepaid
  const corr2 = r2(c.draft - c.deposit + c.homeRent - c.mixer - c.premGain + c.insPrepaid);
  check("corr", corr2, 16711);
  const corrStmt = statement("Thandeka's Bakery: corrected profit for the year ended 31 December 2025", [
    ["Draft profit for the year", null, c.draft],
    ["Add: owner's home rent charged as an expense", c.homeRent, null],
    ["Add: insurance paid in advance", c.insPrepaid, null],
    [null, null, r2(c.homeRent + c.insPrepaid)],
    [null, null, r2(c.draft + c.homeRent + c.insPrepaid)],
    ["Less: customer's deposit included in revenue", c.deposit, null],
    ["Less: mixer spoon set recorded as a non-current asset", c.mixer, null],
    ["Less: unrealised gain on premises", c.premGain, null],
    [null, null, -r2(c.deposit + c.mixer + c.premGain)],
    ["**Corrected profit for the year**", null, corr2],
  ], { checks: [["sub", r2(c.draft + c.homeRent + c.insPrepaid), 27135], ["corr", corr2, r2(27135 - (c.deposit + c.mixer + c.premGain))]] });
  const conceptsList = ["Realisation", "Business entity", "Materiality", "Historic cost", "Matching", "Going concern"];

  b.struct({
    d: 5, secs: 1260, examStyle: true, skill: "EVALUATION", calculator: true,
    concepts: ["acc.concepts.foundation-concepts", "acc.concepts.applied-concepts", "acc.ethics.professional-ethics"],
    stem: `Thandeka owns a bakery in Mutare. She has applied for a bank loan and asked her accountant, Farai, to "finalise the accounts quickly without changing anything". The draft profit for the year ended 31 December 2025 is ${money(c.draft)}. Farai finds:\n\n1. A deposit of ${money(c.deposit)} received on 29 December for a wedding cake to be delivered in February 2026 is included in revenue.\n2. Rent of ${money(c.homeRent)} for Thandeka's own house was paid from the business bank account and charged as rent expense.\n3. A set of measuring spoons costing ${money(c.mixer)} was recorded as a non-current asset.\n4. The premises, bought for ${money(c.premCost)}, were valued at ${money(c.premCost + c.premGain)}; the increase of ${money(c.premGain)} was added to profit.\n5. Insurance expense includes ${money(c.insPrepaid)} paid for January to March 2026.`,
    parts: [
      P.match({
        label: "(a)", stem: "Match each item with the accounting concept that has **not** been applied.",
        pairs: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
        right: conceptsList,
        rightIndex: [0, 1, 2, 3, 4],
        explanation: "Deposit: realisation. Owner's rent: business entity. Measuring spoons: materiality. Premises gain: historic cost (and prudence). Insurance in advance: matching.",
      }),
      P.num({
        label: "(b)", marks: 5, kind: "money", value: corr2, wrong: [r2(corr2 - 2 * c.insPrepaid), r2(corr2 - 2 * c.homeRent)],
        stem: "Calculate the corrected profit for the year ended 31 December 2025.",
        explanation: `$24,360 + 2,250 + 525 - 1,390 - 34 - 9,000 = ${corr2.toLocaleString("en-GB")}$. Items 2 and 5 **increase** profit; deducting the owner's rent instead of adding it back gives ${money(r2(corr2 - 2 * c.homeRent))}.`,
        workedSolution: corrStmt,
      }),
      P.num({
        label: "(c)", marks: 1, kind: "money", value: c.premCost, wrong: [c.premCost + c.premGain],
        stem: "State the amount at which the premises should be shown in the statement of financial position (ignore depreciation).",
        explanation: `Historic cost: ${money(c.premCost)}.`,
      }),
      P.num({
        label: "(d)", marks: 1, kind: "money", value: c.homeRent, wrong: [0],
        stem: "State the amount by which Thandeka's drawings must be increased.",
        explanation: `The ${money(c.homeRent)} rent for her house is drawings, not a business expense.`,
      }),
      P.mcq({
        label: "(e)", stem: "Which fundamental ethical principle would Farai breach if he finalised the accounts without the corrections, knowing the bank will rely on them?",
        options: [["Integrity", "Correct: he would knowingly be associated with misleading information."], ["Confidentiality", "Nothing private is being disclosed."], ["Professional competence and due care", "He has the skill; the issue is honesty."], ["Materiality", "Materiality is an accounting concept, not an ethical principle."]],
        answer: "A",
        explanation: "Integrity: an accountant must not be associated with information he knows is false or misleading.",
      }),
      P.manual({
        label: "(f)", marks: 3,
        stem: "Explain why the bank needs Farai to apply the accounting concepts correctly.",
        points: ["The bank relies on the profit and assets to judge whether Thandeka can repay / it cannot check the records itself", "The draft profit and the premises are overstated (by own figures), so the business looks stronger than it is", "A loan based on false figures may not be repaid; the bank and the business both suffer"],
        modelAnswer: `The bank uses the accounts to decide whether the bakery can repay a loan, but it cannot check the records. The draft profit is overstated by ${money(r2(c.draft - corr2))} and the premises by ${money(c.premGain)}, so the bakery looks stronger than it is; a loan based on these figures might not be repaid.`,
        explanation: "Link the concepts to the users' decisions.",
      }),
      P.manual({
        label: "(g)", marks: 4,
        stem: "Evaluate how Farai should respond to Thandeka's request to finalise the accounts without changes.",
        points: ["Explain the errors and their effect to Thandeka; recommend the corrections", "Objectivity: he must not let pressure from the client affect his judgement", "Professional behaviour / integrity: he must not give the bank misleading accounts", "Conclusion: make the corrections; if she refuses, decline to sign / withdraw from the work"],
        modelAnswer: "Farai should explain each error and show Thandeka the corrected profit. Pressure from a client must not affect his objectivity, and giving a bank figures he knows are misleading would breach integrity and professional behaviour. He should insist on the corrections; if she refuses, he should not finalise the accounts and should withdraw from the work, even though he may lose the client.",
        explanation: "A strong evaluation reaches a clear, justified conclusion.",
      }),
    ],
    hints: ["Decide for each item whether profit rises or falls.", "Private expenses and prepayments removed from expenses increase profit."],
    explanation: "This question applies the accounting concepts and the fundamental ethical principles to one case.",
  });
});
