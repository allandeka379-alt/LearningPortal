// W3a: allowance for irrecoverable debts (provision for doubtful debts).
import { concept, P, money, check, sum, r2, tAccount, statement, ZIM, CAM } from "../lib.mjs";
import { table, U } from "../tables/w3a-lib.mjs";

const f = (v) => v.toLocaleString("en-GB", { maximumFractionDigits: 2, minimumFractionDigits: Number.isInteger(v) ? 0 : 2 });

concept("acc.adjustments.allowance-doubtful-debts", { file: "adjustments/allowance-doubtful-debts", keyPrefix: "adjustments.allowance-doubtful-debts" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Why does a business keep an allowance for irrecoverable debts (provision for doubtful debts)?",
    options: [
      ["To show trade receivables at the amount it expects to collect", "Correct: prudence."],
      ["To keep cash aside in case some customers do not pay","No cash is set aside; it is an estimate."],
      ["To write off debts that are definitely lost", "Definite losses are written off as irrecoverable debts."],
      ["To reduce the amount owed to suppliers", "Suppliers are trade payables, not affected."],
    ],
    answer: "A",
    explanation: "The allowance reduces trade receivables to a realistic, prudent amount.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The allowance for irrecoverable debts increases from US\\$900 to US\\$1,150. What is entered in the income statement?",
    options: [
      [`An expense of ${money(250)}`, "Correct: only the increase is charged."],
      [`An expense of ${money(1150)}`, "The whole allowance is charged only when it is first created."],
      [`Income of ${money(250)}`, "An increase is an expense; a decrease is income."],
      [`An expense of ${money(2050)}`, "The two balances are not added."],
    ],
    answer: "A",
    explanation: "1,150 − 900 = 250 increase, an expense.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How is the allowance for irrecoverable debts shown in the statement of financial position?",
    options: [
      ["Deducted from trade receivables under current assets", "Correct."],
      ["As a current liability, below trade payables", "Nothing is owed; it reduces an asset."],
      ["Added to trade receivables under current assets","It reduces trade receivables."],
      ["Deducted from capital", "Only drawings and losses reduce capital."],
    ],
    answer: "A",
    explanation: "Trade receivables less the allowance gives net trade receivables.",
  });
  const d1 = { tr: 32500, wo: 1300, pct: 5 };
  const d1a = r2(((d1.tr - d1.wo) * d1.pct) / 100);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Trade receivables at the year end are US\\$32,500 before writing off a debt of US\\$1,300. The allowance is to be 5% of trade receivables. What allowance is needed?",
    options: [
      [money(d1a), "Correct: 5% × (32,500 − 1,300)."],
      [money(r2(d1.tr * 0.05)), "The write-off must be deducted first."],
      [money(r2(d1.tr * 0.05 + d1.wo)), "The written-off debt is not part of the allowance."],
      [money(r2(d1.tr - d1.wo)), "This is net trade receivables before the allowance."],
    ],
    answer: "A",
    hints: ["Write off irrecoverable debts before calculating the allowance."],
    explanation: `5% × 31,200 = ${f(d1a)}.`,
  });
  check("d1a", d1a, 1560);
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which entry records a **decrease** in the allowance for irrecoverable debts?",
    options: [
      ["Debit allowance for irrecoverable debts; credit income statement", "Correct: the reduction increases profit."],
      ["Debit income statement; credit allowance for irrecoverable debts", "This records an increase."],
      ["Debit trade receivables; credit allowance for irrecoverable debts", "Trade receivables are not changed by the allowance."],
      ["Debit allowance for irrecoverable debts; credit trade receivables", "This would write off debts through the allowance."],
    ],
    answer: "A",
    hints: ["A smaller allowance means a smaller credit balance."],
    explanation: "Reducing a credit balance needs a debit; the other side is income in the income statement.",
  });
  b.mcq({
    d: 2, skill: "RECALL", applies: ZIM,
    stem: "In the ZIMSEC syllabus, what is the allowance for irrecoverable debts usually called?",
    options: [
      ["Provision for doubtful debts", "Correct."],
      ["Provision for depreciation", "That is for non-current assets."],
      ["Provision for discounts allowable", "That is a separate provision for cash discounts."],
      ["Bad debts recovered", "That is income from debts already written off."],
    ],
    answer: "A",
    explanation: "ZIMSEC: provision for doubtful debts; Cambridge: allowance for irrecoverable debts.",
  });
  const d2 = { open: 1840, tr: 41600, pct: 4 };
  const d2n = r2((d2.tr * d2.pct) / 100);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: true, applies: CAM,
    stem: "The allowance for irrecoverable debts brought forward is US\\$1,840. At the year end trade receivables are US\\$41,600 and the allowance is to be 4%. What appears in the statement of profit or loss?",
    options: [
      [`Decrease in allowance ${money(r2(d2.open - d2n))}, added to gross profit`, "Correct: 1,840 − 1,664."],
      [`Increase in allowance ${money(r2(d2.open - d2n))}, an expense`, "The new allowance is smaller, so it is a decrease."],
      [`Allowance ${money(d2n)}, an expense`, "Only the change is entered."],
      [`Allowance ${money(d2.open)}, added to gross profit`, "The old balance is not transferred in full."],
    ],
    answer: "A",
    hints: ["Compare the allowance needed with the one brought forward."],
    explanation: `Needed 4% × 41,600 = ${f(d2n)}; decrease 1,840 − ${f(d2n)} = ${f(r2(d2.open - d2n))}, income.`,
  });
  check("d2n", d2n, 1664);

  b.tf({
    d: 1, skill: "RECALL",
    stem: "Individual customers' debts are credited to the allowance for irrecoverable debts account when they are written off.",
    answer: false,
    explanation: "False. Written-off debts are debited to the irrecoverable debts account; the allowance is only adjusted at the year end.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "When an allowance for irrecoverable debts is first created, the whole amount is charged as an expense.",
    answer: true,
    explanation: "True. The change from zero is the whole allowance.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each item with where it appears.",
    pairs: ["Debt of a bankrupt customer written off", "Increase in the allowance", "Decrease in the allowance", "Closing balance of the allowance"],
    right: ["Expense in the income statement", "Income in the income statement", "Deducted from trade receivables in the statement of financial position"],
    rightIndex: [0, 0, 1, 2],
    explanation: "Write-offs and increases are expenses; decreases are income; the balance reduces trade receivables.",
  });
  b.fib({
    d: 2, skill: "APPLICATION",
    stem: "Trade receivables are US\\$15,000 and the allowance is 3%. Fill in the figures.",
    template: "Allowance needed: US\\${{blank:a}}. Net trade receivables in the statement of financial position: US\\${{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["450"] },
      { id: "b", accepted: ["14,550", "14550"] },
    ],
    explanation: "3% × 15,000 = 450; 15,000 − 450 = 14,550.",
  });
  check("fib", 15000 * 0.03, 450);

  const y = [{ tr: 21500 }, { tr: 27200 }, { tr: 23400 }];
  const pc = 2.5;
  const al = y.map((x) => r2((x.tr * pc) / 100));
  b.calc({
    d: 3, kind: "money", value: r2(al[2] - al[1]) * -1, calculator: true, wrong: [al[2], r2(al[1] - al[0])],
    stem: "Tatenda keeps an allowance for irrecoverable debts of 2.5% of trade receivables. Trade receivables were US\\$27,200 at 31 December 2024 and US\\$23,400 at 31 December 2025. Calculate the amount credited to the income statement for 2025 for the decrease in the allowance.",
    hints: ["Calculate the allowance at each date, then the difference."],
    explanation: `2024: 2.5% × 27,200 = ${f(al[1])}. 2025: 2.5% × 23,400 = ${f(al[2])}. Decrease ${f(r2(al[1] - al[2]))}. Entering the whole allowance gives ${f(al[2])}.`,
  });
  check("al", r2(al[1] - al[2]), 95);
  const n1 = { tr: 12960, wo: 360, pct: 5 };
  const n1v = r2((n1.tr - n1.wo) * (1 - n1.pct / 100));
  b.num({
    d: 3, kind: "money", value: n1v, calculator: true, wrong: [r2(n1.tr * 0.95), r2(n1.tr * 0.95 - n1.wo)],
    stem: "Trade receivables are US\\$12,960 before writing off a debt of US\\$360. The allowance is 5% of trade receivables. Calculate net trade receivables for the statement of financial position.",
    hints: ["Write off first, then deduct 5%."],
    explanation: `12,960 − 360 = 12,600; allowance 630; net ${f(n1v)}.`,
  });
  check("n1v", n1v, 11970);

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain the difference between an irrecoverable debt and a doubtful debt, and how each is treated.",
    points: ["Irrecoverable: certain not to be paid; written off (Dr irrecoverable debts, Cr customer) as an expense", "Doubtful: may not be paid; covered by the allowance, with only the change charged; the debt stays in trade receivables"],
    modelAnswer: "An irrecoverable debt will not be paid and is written off as an expense. A doubtful debt might not be paid, so the customer's debt stays in the books but an allowance is made; only the change in the allowance affects profit.",
    hints: ["Certain loss versus possible loss."],
    explanation: "Actual loss versus estimate.",
  });

  // Practice structured 1: allowance account over three years
  const s = { tr: [16800, 19600, 17200], pct: 5 };
  const sa = s.tr.map((x) => r2((x * s.pct) / 100));
  const sc = [sa[0], r2(sa[1] - sa[0]), r2(sa[2] - sa[1])];
  check("sc", sum(sc), sa[2]);
  const sMd = [
    tAccount("Allowance for irrecoverable debts account (2023)", [], [["31 Dec 2023", "Income statement", sa[0]]], { cdDate: "31 Dec 2023", bdDate: "1 Jan 2024" }),
    tAccount("Allowance for irrecoverable debts account (2024)", [], [["1 Jan 2024", "Balance b/d", sa[0]], ["31 Dec 2024", "Income statement", sc[1]]], { cdDate: "31 Dec 2024", bdDate: "1 Jan 2025" }),
    tAccount("Allowance for irrecoverable debts account (2025)", [["31 Dec 2025", "Income statement", -sc[2]]], [["1 Jan 2025", "Balance b/d", sa[1]]], { cdDate: "31 Dec 2025", bdDate: "1 Jan 2026" }),
  ].join("\n\n");
  b.struct({
    d: 4, examStyle: true, skill: "APPLICATION", calculator: true,
    stem: "Nyasha sells agricultural chemicals on credit in Masvingo. She created an allowance for irrecoverable debts of 5% of trade receivables on 31 December 2023. Trade receivables (after irrecoverable debts had been written off) were:\n\n" +
      table(["Date", `Trade receivables ${U}`], [["31 December 2023", s.tr[0]], ["31 December 2024", s.tr[1]], ["31 December 2025", s.tr[2]]]),
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "money", value: sc[0], stem: "Calculate the amount charged to the income statement for 2023.", explanation: "5% × 16,800 = 840 (the whole allowance, newly created)." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: sc[1], wrong: [sa[1]], stem: "Calculate the amount charged to the income statement for 2024.", explanation: `Allowance 5% × 19,600 = ${f(sa[1])}; increase ${f(sa[1])} − 840 = ${f(sc[1])}.` }),
      P.mcq({ label: "(c)", stem: "What is the entry in the income statement for 2025?", options: [[`Decrease of ${money(-sc[2])}, as income`, "Correct: 980 − 860."], [`Increase of ${money(-sc[2])}, as an expense`, "The allowance fell."], [`Expense of ${money(sa[2])}`, "Only the change is entered."], [`Income of ${money(sa[2])}`, "The balance is not transferred."]], answer: "A", explanation: `Allowance 5% × 17,200 = ${f(sa[2])}; decrease ${f(-sc[2])}.` }),
      P.manual({ label: "(d)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Prepare the allowance for irrecoverable debts account for the three years, balancing it at each year end.", points: ["2023: Income statement 840 credit; balance c/d 840; b/d 1 Jan 2024", "2024: Income statement 140 credit", "2024: balance c/d 980 and b/d 1 Jan 2025", "2025: Income statement 120 on the debit side", "2025: balance c/d 860, totals 980 and b/d 1 Jan 2026"], modelAnswer: sMd, explanation: "Increases are credited, decreases debited." }),
      P.num({ label: "(e)", marks: 1, kind: "money", value: r2(s.tr[2] - sa[2]), stem: "Calculate net trade receivables at 31 December 2025.", explanation: `17,200 − 860 = ${f(r2(s.tr[2] - sa[2]))}.` }),
    ],
    hints: ["Allowance needed each year = 5% of trade receivables.", "Only the change goes to the income statement."],
    explanation: "This item practises the allowance account over several years.",
  });

  // Practice structured 2: from trial balance with write-off
  const t = { tr: 28750, oldA: 1310, wo: 550, pct: 4, gp: 39400, exp: 24680 };
  const tNet = r2(t.tr - t.wo);
  const tNew = r2((tNet * t.pct) / 100);
  const tCh = r2(tNew - t.oldA);
  const tNp = r2(t.gp - t.exp - t.wo - tCh);
  check("tCh", tCh, -182);
  check("tNp", tNp, 14352);
  const sofp = statement("at 31 December 2025", [["**Current assets (extract)**", null, null], ["Trade receivables", tNet, null], ["Less: Provision for doubtful debts", -tNew, r2(tNet - tNew)]], { checks: [["n", r2(tNet - tNew), 27072]] });
  b.struct({
    d: 5, examStyle: true, skill: "APPLICATION", calculator: true, applies: ZIM,
    stem: "Farai's trial balance at 31 December 2025 included: trade receivables US\\$28,750; provision for doubtful debts US\\$1,310. Gross profit for the year was US\\$39,400 and other expenses (already adjusted) were US\\$24,680. Notes: (1) a bad debt of US\\$550 is to be written off; (2) the provision for doubtful debts is to be 4% of trade receivables.",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: tNew, wrong: [r2(t.tr * 0.04)], stem: "Calculate the provision for doubtful debts required at 31 December 2025.", explanation: `4% × (28,750 − 550) = 4% × 28,200 = ${f(tNew)}.` }),
      P.mcq({ label: "(b)", stem: "What is the adjustment to the provision for 2025?", options: [[`Decrease of ${money(-tCh)}`, "Correct: 1,310 − 1,128."], [`Increase of ${money(-tCh)}`, "The new provision is smaller than the old one."], [`Increase of ${money(tNew)}`, "Only the change is recorded."], [`Decrease of ${money(t.oldA)}`, "The provision is not closed off."]], answer: "A", explanation: "1,310 − 1,128 = 182 decrease." }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: tNp, wrong: [r2(t.gp - t.exp - t.wo + tCh)], stem: "Calculate the net profit for the year.", explanation: `39,400 − 24,680 − 550 + 182 = ${f(tNp)}. Treating the decrease as an expense gives 13,988.` }),
      P.manual({ label: "(d)", marks: 2, type: "EXTENDED_RESPONSE", stem: "Show trade receivables in the statement of financial position at 31 December 2025.", points: ["Trade receivables 28,200 (after the bad debt)", "Less provision 1,128 = 27,072"], modelAnswer: sofp, explanation: "Write off first; deduct the closing provision." }),
      P.manual({ label: "(e)", marks: 2, stem: "Farai wants to raise the provision to 10% so that 'profits look smaller and less tax is paid'. Comment.", points: ["The provision should be a realistic estimate based on experience, not set to manage profit", "An excessive provision understates profit and assets, misleading users (over-prudence / not a true and fair view)"], modelAnswer: "The provision must be a fair estimate of the debts likely to go bad. Raising it without reason understates profit and trade receivables and misleads users; prudence does not allow deliberate understatement.", explanation: "Prudence is not a licence to understate." }),
    ],
    hints: ["Bad debt first; then 4% of the remainder.", "A decrease in the provision is added to profit."],
    explanation: "A ZIMSEC-style item on bad debts and the provision for doubtful debts.",
  });

  b.card("DEFINITION", "Allowance for irrecoverable debts", "Estimate of trade receivables that may not be collected (ZIMSEC: provision for doubtful debts).");
  b.card("FACT", "Increase in the allowance", "Dr Income statement (expense); Cr Allowance for irrecoverable debts.");
  b.card("FACT", "Decrease in the allowance", "Dr Allowance for irrecoverable debts; Cr Income statement (income).");
  b.card("FACT", "Order of adjustments", "Write off irrecoverable debts first, then calculate the allowance on the remaining trade receivables.");
  b.card("FACT", "Allowance in the SOFP", "Trade receivables less allowance under current assets.");
  b.card("CONCEPT", "Why only the change hits profit", "Last year's allowance was already charged; this year only the increase or decrease is new.");
  b.card("CONCEPT", "Concepts behind the allowance", "Prudence (realistic receivables) and matching (expected loss charged in the year of the sale).");
  b.card("FACT", "Terms", "ZIMSEC: provision for doubtful debts. Cambridge: allowance for irrecoverable debts.");
});
