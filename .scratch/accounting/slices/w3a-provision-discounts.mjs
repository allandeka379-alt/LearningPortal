// W3a: provision for discounts allowable (ZIMSEC only).
import { concept, P, money, check, sum, r2, tAccount, statement } from "../lib.mjs";
import { table, U } from "../tables/w3a-lib.mjs";

const f = (v) => v.toLocaleString("en-GB", { maximumFractionDigits: 2, minimumFractionDigits: Number.isInteger(v) ? 0 : 2 });
const pda = (tr, bd, pddPct, discPct) => {
  const net = r2(tr - bd);
  const pdd = r2((net * pddPct) / 100);
  return { net, pdd, pda: r2(((net - pdd) * discPct) / 100) };
};

concept("acc.adjustments.provision-discounts", { file: "adjustments/provision-discounts", keyPrefix: "adjustments.provision-discounts" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does a provision for discounts allowable estimate?",
    options: [
      ["Cash discounts that year-end debtors are expected to take when they pay", "Correct."],
      ["Trade discounts given to customers on credit sales during the year","Trade discounts are never recorded in the ledger."],
      ["Discounts the business will receive from its suppliers", "Those are discounts received."],
      ["Debts that customers will never pay", "That is the provision for doubtful debts."],
    ],
    answer: "A",
    explanation: "It is an estimate of cash discounts on the trade receivables outstanding at the year end.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why is the provision for discounts allowable calculated **after** deducting the provision for doubtful debts?",
    options: [
      ["Customers who are not expected to pay will not take a discount", "Correct."],
      ["Because the discount rate is always lower than the doubtful debts rate", "The rates do not decide the order."],
      ["To make the provision for discounts as large as possible", "Deducting first makes it smaller, not larger."],
      ["Because discounts are only given to customers who owe more than average", "Discounts depend on prompt payment, not the size of the debt."],
    ],
    answer: "A",
    explanation: "Only customers who pay can take a cash discount, so doubtful debts are excluded first.",
  });
  const q3 = pda(30000, 0, 4, 2.5);
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: "Trade receivables are US\\$30,000. The provision for doubtful debts is 4% and the provision for discounts allowable is 2.5%. What is the provision for discounts allowable?",
    options: [
      [money(q3.pda), "Correct: 2.5% × (30,000 − 1,200)."],
      [money(750), "This applies 2.5% to the full trade receivables."],
      [money(1200), "This is the provision for doubtful debts."],
      [money(1920), "This adds the two percentages and applies them to 30,000."],
    ],
    answer: "A",
    explanation: `Doubtful debts 4% × 30,000 = 1,200; discounts 2.5% × 28,800 = ${f(q3.pda)}.`,
  });
  check("q3", q3.pda, 720);
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which entry records an **increase** in the provision for discounts allowable?",
    options: [
      ["Debit income statement; credit provision for discounts allowable", "Correct."],
      ["Debit provision for discounts allowable; credit income statement", "This records a decrease."],
      ["Debit discount allowed; credit trade receivables", "This records an actual discount given."],
      ["Debit trade receivables; credit provision for discounts allowable", "Trade receivables are not changed by the provision."],
    ],
    answer: "A",
    explanation: "An increase is an expense; the provision (a credit balance) grows.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which concept is applied by making a provision for discounts allowable?",
    options: [
      ["Matching: the discounts relate to this year's credit sales", "Correct."],
      ["Going concern: the business will continue next year", "The provision is not about continuity."],
      ["Consistency: the same rate must always be used", "Consistency supports using the same method, but it is not the reason for the provision."],
      ["Business entity: the owner's discounts are separate", "The discounts are given to customers, not the owner."],
    ],
    answer: "A",
    hints: ["When were the sales that the discounts relate to?"],
    explanation: "The expected discounts are a cost of this year's sales (matching); prudence also supports the provision.",
  });
  const q6 = { open: 540, ...pda(24600, 600, 5, 2) };
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "The provision for discounts allowable brought forward is US\\$540. Trade receivables are US\\$24,600, of which US\\$600 is a bad debt to be written off. The provision for doubtful debts is 5% and the provision for discounts allowable is 2%. What is entered in the income statement for the provision for discounts?",
    options: [
      [`Decrease of ${money(r2(q6.open - q6.pda))}, as income`, "Correct: 540 − 456."],
      [`Increase of ${money(r2(q6.open - q6.pda))}, as an expense`, "The new provision is smaller, so it is a decrease."],
      [`Expense of ${money(q6.pda)}`, "Only the change is entered."],
      [`Decrease of ${money(r2(q6.open - 24600 * 0.02))}, as income`, "This ignores the bad debt and the provision for doubtful debts."],
    ],
    answer: "A",
    hints: ["Bad debt first, then 5%, then 2% of the remainder."],
    explanation: `24,600 − 600 = 24,000; doubtful debts 1,200; discounts 2% × 22,800 = ${f(q6.pda)}; decrease 540 − ${f(q6.pda)} = ${f(r2(q6.open - q6.pda))}.`,
  });
  check("q6", q6.pda, 456);
  const q7 = { open: 300, ...pda(20000, 0, 5, 2) };
  const q7inc = r2(q7.pda - q7.open);
  check("q7", q7inc, 80);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Nyasha's provision for discounts allowable brought forward is US\\$300. At the year end trade receivables are US\\$20,000, the provision for doubtful debts is to be 5% and the provision for discounts allowable 2%. What is the effect on the income statement?",
    options: [
      [`Increase of ${money(q7inc)}, an expense`, `Correct: 2% × 19,000 = ${f(q7.pda)}; ${f(q7.pda)} − 300 = ${f(q7inc)}.`],
      [`Increase of ${money(r2(20000 * 0.02 - 300))}, an expense`, "This applies 2% to the full trade receivables."],
      [`Decrease of ${money(q7inc)}, as income`, "The new provision is larger than the old one, so it is an increase."],
      [`Expense of ${money(q7.pda)} in total`, "Only the change in the provision is charged."],
    ],
    answer: "A",
    hints: ["Find the new provision, then compare it with US\\$300."],
    explanation: `Doubtful debts 5% × 20,000 = 1,000; discounts 2% × 19,000 = ${f(q7.pda)}; increase ${f(q7.pda)} − 300 = ${f(q7inc)}, charged as an expense.`,
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "The provision for discounts allowable is deducted from trade receivables in the statement of financial position.",
    answer: true,
    explanation: "True. Both provisions are deducted from trade receivables under current assets.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "When a provision for discounts allowable is kept, discounts actually allowed during the year are no longer recorded.",
    answer: false,
    explanation: "False. Discounts allowed during the year are still recorded as an expense; the provision covers only expected future discounts on year-end balances.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Put the steps in the correct order by choosing the missing words.",
    template: "Trade receivables, less {{blank:a}}, less the provision for {{blank:b}}, then apply the discount percentage.",
    blanks: [
      { id: "a", accepted: ["bad debts"], choices: ["bad debts", "discounts received", "drawings"] },
      { id: "b", accepted: ["doubtful debts"], choices: ["doubtful debts", "depreciation", "discounts allowable"] },
    ],
    explanation: "Bad debts first, then the provision for doubtful debts, then the discount provision.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each item with its treatment.",
    pairs: [["Discount allowed to a customer in March", "Expense: discount allowed"], ["Increase in the provision for discounts allowable", "Expense in the income statement"], ["Decrease in the provision for discounts allowable", "Income added to gross profit"], ["Closing provision for discounts allowable", "Deducted from trade receivables"]],
    explanation: "Actual discounts and increases are expenses; decreases are income; the balance reduces trade receivables.",
  });

  const n1 = pda(52000, 1200, 5, 3);
  b.calc({
    d: 3, kind: "money", value: n1.pda, calculator: true, wrong: [r2(52000 * 0.03), r2((52000 - 1200) * 0.03)],
    stem: "Tendai's trade receivables at 31 December 2025 were US\\$52,000. Bad debts of US\\$1,200 are to be written off. He keeps a provision for doubtful debts of 5% and a provision for discounts allowable of 3%. Calculate the provision for discounts allowable.",
    hints: ["Work in three steps."],
    explanation: `52,000 − 1,200 = 50,800; doubtful debts 5% × 50,800 = ${f(n1.pdd)}; discounts 3% × ${f(r2(n1.net - n1.pdd))} = ${f(n1.pda)}. Using 52,000 gives 1,560; ignoring only the doubtful debts gives 1,524.`,
  });
  check("n1", n1.pda, 1447.8);
  const n2 = pda(18800, 0, 2.5, 2);
  const n2net = r2(n2.net - n2.pdd - n2.pda);
  b.num({
    d: 3, kind: "money", value: n2net, calculator: true, wrong: [r2(18800 * (1 - 0.045))],
    stem: "Trade receivables are US\\$18,800. The provision for doubtful debts is 2.5% and the provision for discounts allowable is 2%. Calculate the net trade receivables shown in the statement of financial position.",
    hints: ["Discount provision is on the receivables after the doubtful debts provision."],
    explanation: `Doubtful debts 470; discounts 2% × 18,330 = ${f(n2.pda)}; net 18,800 − 470 − ${f(n2.pda)} = ${f(n2net)}.`,
  });
  check("n2net", n2net, 17963.4);

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain the difference between discount allowed and the provision for discounts allowable.",
    points: ["Discount allowed: actual cash discounts given to customers who paid during the year (an expense)", "Provision: an estimate of discounts expected on trade receivables outstanding at the year end; only its change is charged"],
    modelAnswer: "Discount allowed is the discount actually given during the year. The provision is an estimate of the discounts year-end debtors will take when they pay next year; only its increase or decrease goes to the income statement.",
    explanation: "Actual versus expected.",
  });

  // Practice structured 1: two years of provisions
  const y1 = pda(36000, 0, 5, 2);
  const y2 = pda(43800, 800, 5, 2);
  const incD = r2(y2.pdd - y1.pdd), incP = r2(y2.pda - y1.pda);
  check("y1", y1.pda, 684);
  check("y2", y2.pda, 817);
  const pMd = tAccount("Provision for discounts allowable account", [], [["1 Jan 2025", "Balance b/d", y1.pda], ["31 Dec 2025", "Income statement", incP]], { cdDate: "31 Dec 2025", bdDate: "1 Jan 2026" });
  const sofp = statement("at 31 December 2025", [["**Current assets (extract)**", null, null], ["Trade receivables (43,800 − 800)", y2.net, null], ["Less: Provision for doubtful debts", -y2.pdd, null], ["Less: Provision for discounts allowable", -y2.pda, r2(y2.net - y2.pdd - y2.pda)]], { checks: [["n", r2(y2.net - y2.pdd - y2.pda), 40033]] });
  b.struct({
    d: 4, examStyle: true, skill: "APPLICATION", calculator: true,
    stem: "Thandeka runs a wholesale stationery business in Harare. She created a provision for doubtful debts of 5% and a provision for discounts allowable of 2% on 31 December 2024, when trade receivables were US\\$36,000. At 31 December 2025 trade receivables were US\\$43,800, and a bad debt of US\\$800 was to be written off. The rates did not change.",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: y1.pda, wrong: [r2(36000 * 0.02)], stem: "Calculate the provision for discounts allowable at 31 December 2024.", explanation: `Doubtful debts 1,800; discounts 2% × 34,200 = ${f(y1.pda)}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: y2.pdd, wrong: [r2(43800 * 0.05)], stem: "Calculate the provision for doubtful debts at 31 December 2025.", explanation: `5% × (43,800 − 800) = ${f(y2.pdd)}.` }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: y2.pda, stem: "Calculate the provision for discounts allowable at 31 December 2025.", explanation: `2% × (43,000 − 2,150) = 2% × 40,850 = ${f(y2.pda)}.` }),
      P.manual({ label: "(d)", marks: 3, type: "EXTENDED_RESPONSE", stem: "Prepare the provision for discounts allowable account for 2025.", points: ["Balance b/d 684 on the credit side", "Income statement 133 (increase) on the credit side", "Balance c/d 817, totals and balance b/d on 1 January 2026"], modelAnswer: pMd, explanation: "The increase is credited to the provision." }),
      P.manual({ label: "(e)", marks: 3, type: "EXTENDED_RESPONSE", stem: "Show trade receivables in the statement of financial position at 31 December 2025.", points: ["Trade receivables 43,000 after the bad debt", "Less provision for doubtful debts 2,150 and provision for discounts 817", "Net 40,033"], modelAnswer: sofp, explanation: "Deduct both provisions, doubtful debts first." }),
    ],
    hints: ["Order: bad debts, provision for doubtful debts, provision for discounts."],
    explanation: `Income statement 2025: bad debts 800; increase in provision for doubtful debts ${f(incD)}; increase in provision for discounts ${f(incP)}.`,
  });

  // Practice structured 2: effect on net profit with a decrease
  const z0 = { pdd: 1450, pda: 560 };
  const z = pda(25800, 300, 5, 2);
  const chD = r2(z.pdd - z0.pdd), chP = r2(z.pda - z0.pda);
  const gp = 34700, exp = 21950;
  const np = r2(gp - exp - 300 - chD - chP);
  check("chD", chD, -175);
  check("chP", chP, -75.5);
  check("np", np, 12700.5);
  b.struct({
    d: 5, examStyle: true, skill: "ANALYSIS", calculator: true,
    stem: "Sipho's trial balance at 31 December 2025 showed: trade receivables US\\$25,800; provision for doubtful debts US\\$1,450; provision for discounts allowable US\\$560. Gross profit was US\\$34,700 and other expenses (already adjusted) were US\\$21,950. A bad debt of US\\$300 is to be written off. The provision for doubtful debts is to be 5% and the provision for discounts allowable 2%.",
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "money", value: z.pdd, stem: "Calculate the new provision for doubtful debts.", explanation: "5% × (25,800 − 300) = 1,275." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: z.pda, wrong: [r2(25500 * 0.02)], stem: "Calculate the new provision for discounts allowable.", explanation: `2% × (25,500 − 1,275) = ${f(z.pda)}.` }),
      P.mcq({ label: "(c)", stem: "How do the two provision adjustments affect profit?", options: [[`Both are decreases, adding ${money(r2(-chD - chP))} to profit`, "Correct: 175 + 75.50."], [`Both are increases, reducing profit by ${money(r2(-chD - chP))}`, "Both provisions are smaller than before."], [`They reduce profit by ${money(r2(z.pdd + z.pda))}`, "Only the changes are entered."], ["They have no effect, because they are only estimates", "Changes in provisions are entered in the income statement."]], answer: "A", explanation: "Provision for doubtful debts falls by 175 and discounts provision by 75.50: both are income." }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: np, wrong: [r2(gp - exp - 300 + chD + chP)], stem: "Calculate the net profit for the year.", explanation: `34,700 − 21,950 − 300 + 175 + 75.50 = ${f(np)}.` }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain why the provisions decreased even though Sipho kept the same percentages.", points: ["Trade receivables fell (after the bad debt) compared with last year", "So the same percentages give smaller provisions; the reductions are written back to profit"], modelAnswer: "Sipho's trade receivables are lower than last year, so applying the same rates gives smaller provisions. The excess of last year's provisions is no longer needed and is added back to profit.", explanation: "Provisions move with trade receivables." }),
    ],
    hints: ["Compare each new provision with the trial balance figure."],
    explanation: "This item practises both provisions and their effect on profit.",
  });

  b.card("DEFINITION", "Provision for discounts allowable", "Estimate of cash discounts year-end debtors will take when they pay (ZIMSEC).");
  b.card("FORMULA", "Provision for discounts allowable", "Discount % × (trade receivables − bad debts − provision for doubtful debts).");
  b.card("FACT", "Order of the adjustments", "Bad debts → provision for doubtful debts → provision for discounts allowable.");
  b.card("FACT", "Increase in the provision for discounts", "Dr Income statement; Cr Provision for discounts allowable.");
  b.card("FACT", "Decrease in the provision for discounts", "Dr Provision for discounts allowable; Cr Income statement.");
  b.card("FACT", "Provisions in the SOFP", "Trade receivables less provision for doubtful debts less provision for discounts allowable.");
  b.card("CONCEPT", "Why make the provision?", "Matching: next year's discounts relate to this year's sales; prudence: realistic receivables.");
  b.card("FACT", "Is the discount provision examined by Cambridge?", "No: ZIMSEC only.");
});
