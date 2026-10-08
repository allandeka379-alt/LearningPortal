// W1b: ZIMSEC Paper 2 exam-format items (20 marks): (1) double entry from transactions and balancing accounts;
// (2) accounting concepts, closing entries and business ethics applied to a case.
import { concept, P, money, tAccount, journal, statement, check, sum, r2, balanceOf, ZIM } from "../lib.mjs";

concept("acc.ledger.double-entry", { file: "exam/w1b-zimsec", keyPrefix: "exam.w1b-zimsec", applies: ZIM }, (b) => {
  // ---------------------------------------------------------------------------------------------------------------
  // Item 1: Chipo's Feed Supplies, Masvingo, March 2025
  const open = { bank: 2730, capital: 2730 };
  const tx = [
    ["2 Mar", "Bought stock feed on credit from Gweru Millers", 3460, "Purchases", "Gweru Millers"],
    ["5 Mar", "Sold feed on credit to Tatenda Mhuri", 1875, "Tatenda Mhuri", "Sales"],
    ["9 Mar", "Paid transport costs by bank transfer", 265, "Carriage outwards", "Bank"],
    ["12 Mar", "Returned damaged feed to Gweru Millers", 310, "Gweru Millers", "Returns outwards"],
    ["15 Mar", "Tatenda Mhuri paid by bank transfer", 1200, "Bank", "Tatenda Mhuri"],
    ["20 Mar", "Bought a weighing scale, paying by bank transfer", 590, "Equipment", "Bank"],
    ["25 Mar", "Paid Gweru Millers on account by bank transfer", 2000, "Gweru Millers", "Bank"],
  ];
  const bankDr = [["1 Mar", "Balance b/d", open.bank], ...tx.filter((t) => t[3] === "Bank").map((t) => [t[0], t[4], t[2]])];
  const bankCr = tx.filter((t) => t[4] === "Bank").map((t) => [t[0], t[3], t[2]]);
  const bankBal = balanceOf(bankDr, bankCr);
  check("bank", bankBal.amount, 1075);
  const gmDr = tx.filter((t) => t[3] === "Gweru Millers").map((t) => [t[0], t[4], t[2]]);
  const gmCr = tx.filter((t) => t[4] === "Gweru Millers").map((t) => [t[0], t[3], t[2]]);
  const gmBal = balanceOf(gmDr, gmCr);
  check("gm", gmBal.amount, 1150);
  const tmBal = balanceOf([["", "", 1875]], [["", "", 1200]]);
  const debited = ["Purchases", "Tatenda Mhuri", "Carriage outwards", "Gweru Millers", "Bank", "Equipment", "Sales", "Returns outwards"];
  const bankModel = tAccount("Bank account", bankDr, bankCr, { cdDate: "31 Mar", bdDate: "1 Apr" });
  const gmModel = tAccount("Gweru Millers account", gmDr, gmCr, { cdDate: "31 Mar", bdDate: "1 Apr" });

  b.struct({
    d: 4, secs: 1260, examStyle: true, skill: "APPLICATION", calculator: true,
    concepts: ["acc.ledger.double-entry", "acc.ledger.posting-balancing", "acc.documents.source-documents"],
    stem: `Chipo Moyo sells stock feed in Masvingo. On 1 March 2025 her business had ${money(open.bank)} in the bank and no other assets or liabilities. Her transactions for March 2025 were:\n\n| Date | Transaction | US\\$ |\n| --- | --- | ---: |\n${tx.map((t) => `| ${t[0]} | ${t[1]} | ${t[2].toLocaleString("en-GB")} |`).join("\n")}`,
    parts: [
      P.match({
        label: "(a)", stem: "For each transaction, choose the account that is **debited** in Chipo's ledger.",
        pairs: tx.slice(0, 6).map((t) => `${t[0]}: ${t[1].toLowerCase()}`),
        right: debited,
        rightIndex: tx.slice(0, 6).map((t) => debited.indexOf(t[3])),
        explanation: "Goods for resale: purchases. Credit sale: the customer. Transport of goods sold: carriage outwards. Returns to a supplier: debit the supplier. Money received: bank. A scale for use in the business: equipment.",
      }),
      P.mcq({
        label: "(b)", stem: "Which source document would Chipo receive from Gweru Millers for the feed returned on 12 March?",
        options: [["A credit note", "Correct: the seller issues a credit note to reduce the amount owed."], ["An invoice", "An invoice records the original sale on credit."], ["A receipt", "A receipt acknowledges money paid."], ["A paying-in slip", "A paying-in slip is used to deposit money at the bank."]],
        answer: "A",
        explanation: "The seller (Gweru Millers) issues a credit note; Chipo records it in her returns outwards journal.",
      }),
      P.num({
        label: "(c)", marks: 2, kind: "money", value: bankBal.amount, wrong: [r2(bankBal.amount - open.bank), r2(bankBal.amount + 2 * 590)],
        stem: "Calculate the balance on Chipo's bank account at the end of March 2025.",
        explanation: `Debits: $2,730 + 1,200 = 3,930$. Credits: $265 + 590 + 2,000 = 2,855$. Balance $3,930 - 2,855 = ${bankBal.amount.toLocaleString("en-GB")}$ debit. Leaving out the opening balance gives a credit balance of ${money(Math.abs(r2(bankBal.amount - open.bank)))}.`,
      }),
      P.num({
        label: "(d)", marks: 2, kind: "money", value: gmBal.amount, wrong: [r2(3460 - 2000), r2(gmBal.amount + 2 * 310)],
        stem: "Calculate the amount Chipo owes Gweru Millers at the end of March 2025.",
        explanation: `Credit $3,460$ less debits $310 + 2,000 = 2,310$: ${money(gmBal.amount)} credit. Forgetting the returns gives ${money(r2(3460 - 2000))}.`,
      }),
      P.manual({
        label: "(e)", marks: 4, type: "EXTENDED_RESPONSE",
        stem: "Prepare Chipo's bank account for March 2025. Balance the account and bring down the balance on 1 April 2025.",
        points: ["1 Mar Balance b/d 2,730 and 15 Mar Tatenda Mhuri 1,200 on the debit side", "9 Mar Carriage outwards 265, 20 Mar Equipment 590 and 25 Mar Gweru Millers 2,000 on the credit side", "Balance c/d 1,075 dated 31 Mar and totals 3,930 on both sides", "Balance b/d 1,075 on the debit side dated 1 Apr"],
        modelAnswer: bankModel,
        explanation: "Money in on the debit side, money out on the credit side; the balance c/d goes on the smaller side.",
      }),
      P.manual({
        label: "(f)", marks: 3, type: "EXTENDED_RESPONSE",
        stem: "Prepare the account of Gweru Millers in Chipo's trade payables ledger for March 2025, balanced, with the balance brought down.",
        points: ["2 Mar Purchases 3,460 on the credit side; 12 Mar Returns outwards 310 and 25 Mar Bank 2,000 on the debit side", "Balance c/d 1,150 on the debit side and totals 3,460", "Balance b/d 1,150 on the credit side dated 1 Apr"],
        modelAnswer: gmModel,
        explanation: "A supplier's account normally has a credit balance: the amount owed.",
      }),
      P.manual({
        label: "(g)", marks: 2,
        stem: `Explain what the balance on Tatenda Mhuri's account at the end of March 2025 (${money(tmBal.amount)} debit) means, and name the ledger it is kept in.`,
        points: ["Tatenda Mhuri still owes Chipo US\\$675 / a trade receivable (asset)", "Kept in the trade receivables (sales) ledger"],
        modelAnswer: `Tatenda owes the business ${money(tmBal.amount)}, a trade receivable; the account is in the trade receivables ledger.`,
        explanation: `Debit ${money(1875)} less credit ${money(1200)} leaves ${money(tmBal.amount)} owing.`,
      }),
    ],
    hints: ["For each transaction, the account that receives value is debited.", "Total each side, then put the difference on the smaller side as balance c/d."],
    explanation: "This question tests the rules of double entry, source documents, and balancing and interpreting ledger accounts.",
  });
  check("tm", tmBal.amount, 675);

  // ---------------------------------------------------------------------------------------------------------------
  // Item 2: Sipho's Building Supplies, Gweru — concepts, closing entries and ethics
  const c = { draft: 18640, elecOwing: 340, invCost: 2900, invNrv: 2150, depOld: 3200, depNew: 1850, reval: 6000, capOpen: 41200, drawings: 9600 };
  const wd = r2(c.invCost - c.invNrv);
  const depDiff = r2(c.depOld - c.depNew);
  const corrected = r2(c.draft - c.elecOwing - wd - depDiff - c.reval);
  check("corrected", corrected, 10200);
  const capClose = r2(c.capOpen + corrected - c.drawings);
  const corrStmt = statement("Corrected net profit for the year ended 31 December 2025", [
    ["Draft net profit", null, c.draft],
    ["Less: electricity owing", c.elecOwing, null],
    ["Less: inventory written down to net realisable value", wd, null],
    ["Less: additional depreciation (method restored)", depDiff, null],
    ["Less: increase in value of premises wrongly included", c.reval, null],
    [null, null, -r2(c.elecOwing + wd + depDiff + c.reval)],
    ["**Corrected net profit**", null, corrected],
  ], { checks: [["c", corrected, c.draft - (c.elecOwing + wd + depDiff + c.reval)]] });
  const capJ = journal([
    { date: "31 Dec", lines: [["Income statement", corrected, null], ["Capital", null, corrected]], narrative: "Net profit for the year transferred to capital" },
    { date: "31 Dec", lines: [["Capital", c.drawings, null], ["Drawings", null, c.drawings]], narrative: "Drawings for the year transferred to capital" },
  ]);
  const concepts2 = ["Matching (accrual)", "Prudence", "Consistency", "Historical cost", "Going concern"];

  b.struct({
    d: 5, secs: 1260, examStyle: true, skill: "ANALYSIS", calculator: true,
    concepts: ["acc.concepts.foundation-concepts", "acc.concepts.applied-concepts", "acc.ledger.closing-entries", "acc.ethics.professional-ethics"],
    stem: `Sipho owns a building supplies business in Gweru. His accounts clerk, Nyasha, calculated a draft net profit of ${money(c.draft)} for the year ended 31 December 2025. On checking, she finds:\n\n1. Electricity of ${money(c.elecOwing)} for December 2025 is unpaid and has not been recorded.\n2. Closing inventory includes cracked tiles at their cost of ${money(c.invCost)}; they can be sold for only ${money(c.invNrv)}.\n3. Sipho told Nyasha to change the depreciation method this year only, to reduce the charge from ${money(c.depOld)} to ${money(c.depNew)}.\n4. The premises rose in market value by ${money(c.reval)}; Sipho asked for the increase to be added to this year's profit.\n\nSipho's capital on 1 January 2025 was ${money(c.capOpen)} and his drawings for the year were ${money(c.drawings)}. He has also asked Nyasha to leave out some cash sales "to keep the tax bill down".`,
    parts: [
      P.match({
        label: "(a)", stem: "Match each of items 1 to 4 with the accounting concept that has **not** been applied.",
        pairs: ["Item 1", "Item 2", "Item 3", "Item 4"],
        right: concepts2,
        rightIndex: [0, 1, 2, 3],
        explanation: "Unrecorded expense: matching. Inventory above net realisable value: prudence. Method changed to raise profit: consistency. Premises at market value: historical cost.",
      }),
      P.num({
        label: "(b)", marks: 4, kind: "money", value: corrected, wrong: [r2(c.draft - c.elecOwing - wd - depDiff), r2(c.draft - c.elecOwing - c.invNrv - depDiff - c.reval)],
        stem: "Calculate the corrected net profit for the year ended 31 December 2025.",
        explanation: `$18,640 - 340 - 750 - 1,350 - 6,000 = ${corrected.toLocaleString("en-GB")}$. Leaving the premises gain in gives ${money(r2(c.draft - c.elecOwing - wd - depDiff))}.`,
        workedSolution: corrStmt,
      }),
      P.num({
        label: "(c)", marks: 2, kind: "money", value: capClose, wrong: [r2(c.capOpen + c.draft - c.drawings), r2(c.capOpen + corrected + c.drawings)],
        stem: "Using your answer to (b), calculate Sipho's capital at 31 December 2025.",
        explanation: `$41,200 + ${corrected.toLocaleString("en-GB")} - 9,600 = ${capClose.toLocaleString("en-GB")}$. Using the draft profit gives ${money(r2(c.capOpen + c.draft - c.drawings))}.`,
      }),
      P.fib({
        label: "(d)", stem: "Complete the closing entry that transfers the corrected electricity expense at the year end.",
        template: "Debit {{blank:a}}; credit {{blank:b}}.",
        blanks: [
          { id: "a", accepted: ["Income statement"], choices: ["Income statement", "Electricity", "Capital", "Bank"] },
          { id: "b", accepted: ["Electricity"], choices: ["Electricity", "Income statement", "Capital", "Bank"] },
        ],
        explanation: "An expense has a debit balance; it is cleared by crediting the expense account and debiting the income statement.",
      }),
      P.manual({
        label: "(e)", marks: 4, type: "EXTENDED_RESPONSE",
        stem: "Prepare the journal entries, with narratives, to transfer the corrected net profit and the drawings to Sipho's capital account.",
        points: [`Dr Income statement, Cr Capital ${corrected.toLocaleString("en-GB")} (own figure)`, "Narrative for the profit transfer", `Dr Capital, Cr Drawings ${c.drawings.toLocaleString("en-GB")}`, "Narrative for the drawings transfer"],
        modelAnswer: capJ,
        explanation: "Profit increases capital; drawings reduce it.",
      }),
      P.manual({
        label: "(f)", marks: 4,
        stem: "Identify **two** professional ethics that Nyasha would breach by leaving out the cash sales, and advise her what to do.",
        points: ["Integrity: the records would be dishonest", "Compliance: tax law would be broken", "Advice: refuse and record all sales, explaining the principles to Sipho", "If Sipho insists, she should not prepare false records / report through proper channels; Unhu: the community loses tax revenue"],
        modelAnswer: "Leaving out sales breaches integrity (the records would be false) and compliance (it breaks tax law). Nyasha should refuse, record all the sales and explain to Sipho why. If he insists, she should not be part of false records; under Unhu/Ubuntu, cheating on tax harms the whole community.",
        explanation: "Name the principle, then give practical action.",
      }),
    ],
    hints: ["Decide whether each item raises or lowers profit.", "Capital at the end = opening capital + net profit - drawings."],
    explanation: "This question applies ZIMSEC's accounting concepts, closing entries and professional ethics to one business.",
  });
});
