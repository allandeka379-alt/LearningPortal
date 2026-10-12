// W1a: ledger.irrecoverable-debts
import { concept, P, table, check, sum, r2, fmt, money } from "../lib.mjs";
import { mc, tAcct } from "../tables/w1a-lib.mjs";

concept("aacc.ledger.irrecoverable-debts", { file: "ledger/irrecoverable-debts", keyPrefix: "ledger.irrecoverable-debts" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "A customer of Sipho's shop is declared insolvent. Which entry writes off the debt?",
    ok: ["Debit Irrecoverable debts, credit the customer's account", "Correct: the expense is recorded and the receivable removed."],
    bad: [["Debit the customer's account, credit Irrecoverable debts", "This would increase the amount owed by the customer."], ["Debit Allowance for irrecoverable debts, credit Bank", "No cash is paid, and a known loss is not charged against the allowance in this way."], ["Debit Sales returns, credit the customer's account", "The goods have not been returned."]],
    explanation: "A known loss is an expense (debit) and removes the asset (credit the customer).",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "How is the allowance for irrecoverable debts shown in the statement of financial position?",
    ok: ["As a deduction from trade receivables", "Correct: net receivables show what is expected to be collected."],
    bad: [["As a current liability", "The allowance is not owed to anyone."], ["As an addition to capital", "It reduces assets; it does not add to capital."], ["As a non-current asset", "It is part of current assets, as a deduction."]],
    explanation: "The allowance is a credit balance set against trade receivables, giving the net amount expected to be collected.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which accounting concept is applied when a business creates an allowance for irrecoverable debts?",
    ok: ["Prudence", "Correct: expected losses are recognised and assets are not overstated."],
    bad: [["Realisation", "Realisation determines when revenue is recognised."], ["Consistency", "Consistency requires the same policies from year to year."], ["Going concern", "This assumes the business will continue, and does not cause an allowance."]],
    explanation: "Prudence means not overstating assets and profit when losses are likely.",
  });
  mc(b, {
    d: 2, skill: "APPLICATION",
    stem: "Chipo receives US\\$250 from a customer whose debt was written off last year. Which entry is correct?",
    ok: ["Debit Bank, credit Irrecoverable debts recovered", "Correct: cash comes in and the recovery is income."],
    bad: [["Debit Irrecoverable debts, credit Bank", "This would record a payment out."], ["Debit Bank, credit Sales", "The recovery is not new trading income."], ["Debit Bank, credit Allowance for irrecoverable debts", "The allowance is adjusted only at the year end."]],
    explanation: "A recovery is credited to an irrecoverable debts recovered account (or the irrecoverable debts account) and debited to Bank.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "What is the effect on profit of **reducing** the allowance for irrecoverable debts?",
    ok: ["Profit increases, because the reduction is credited to the statement of profit or loss", "Correct: less expected loss is needed than was provided before."],
    bad: [["Profit decreases, because the allowance is an expense", "Only an increase is an expense."], ["Profit is not affected, because the allowance is a statement of financial position item", "Both accounts are changed, including profit."], ["Profit increases, because customers have paid", "No customer has paid; the estimate has changed."]],
    hints: ["Which way does the allowance account move, and what is the other side of the entry?"],
    explanation: "Debit Allowance, credit Irrecoverable debts: expenses fall, so profit rises.",
  });
  const rec1 = 24000;
  const al1 = r2(rec1 * 0.04);
  const inc1 = r2(al1 - 700);
  check("inc1", inc1, 260);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Trade receivables are ${money(rec1)} after writing off known irrecoverable debts. The allowance is to be 4% of trade receivables. The allowance account has a balance of ${money(700)}. What is the charge to the statement of profit or loss for the change in the allowance?`,
    ok: [money(inc1), "Correct: 4% × 24,000 = 960; 960 - 700 = 260."],
    bad: [[money(al1), "This is the closing allowance, not the change."], [money(r2(al1 + 700)), "The opening balance has been added instead of deducted."], [money(700), "This is the opening balance."]],
    hints: ["Find the closing allowance first, then compare it with the opening balance."],
    explanation: "Closing allowance 960 less opening allowance 700 gives an increase of 260, charged to profit.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Why is the allowance calculated on trade receivables **after** the known irrecoverable debts have been written off?",
    ok: ["The written-off debts have already been charged, so including them would count the same loss twice", "Correct: only debts still shown as assets can be expected to prove irrecoverable."],
    bad: [["Written-off debts will certainly be recovered", "Recovery is not assumed."], ["The tax authority requires it", "This is a matter of accounting logic, not tax."], ["It gives a lower allowance, which is always more prudent", "A lower allowance is not necessarily prudent; the point is accuracy."]],
    hints: ["Are written-off debts still in trade receivables?"],
    explanation: "Receivables remaining are the only ones that could still become irrecoverable.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Trade receivables at the end of two successive years are both US\\$30,000. The allowance rate was 6% in the first year and is 5% in the second. What is the effect on the second year's profit?",
    ok: ["Profit increases by US\\$300", "Correct: the allowance falls from 1,800 to 1,500 and the reduction is credited to profit."],
    bad: [["Profit decreases by US\\$300", "A fall in the allowance is a gain, not a cost."], ["Profit increases by US\\$1,500", "The whole closing allowance has been treated as a gain."], ["There is no effect because the receivables did not change", "The rate changed, so the allowance changed."]],
    hints: ["Compare 6% and 5% of 30,000."],
    explanation: "6% × 30,000 = 1,800; 5% × 30,000 = 1,500. The reduction of 300 increases profit.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "An allowance for irrecoverable debts is created by crediting the accounts of individual customers.",
    answer: false,
    explanation: "False. The allowance has its own account. Customers' accounts are changed only when a debt is written off.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "Only the change in the allowance for the year is charged or credited to the statement of profit or loss.",
    answer: true,
    hints: ["Think about what the opening balance represents."],
    explanation: "True. The opening allowance was provided for in earlier years; the statement of profit or loss bears only the increase or decrease.",
  });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each event to its entry.",
    pairs: ["Write off a debt", "Increase the allowance", "Decrease the allowance", "Recover a debt written off in an earlier year"],
    right: ["Debit Irrecoverable debts; credit the customer", "Debit Irrecoverable debts; credit Allowance", "Debit Allowance; credit Irrecoverable debts", "Debit Bank; credit Irrecoverable debts recovered"],
    rightIndex: [0, 1, 2, 3],
    explanation: "Write-offs remove a receivable; allowance changes use the allowance account; recoveries bring cash in as income.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentence.",
    template: "When a debt is written off, {{blank:a}} is debited and the {{blank:b}} account is credited.",
    blanks: [
      { id: "a", accepted: ["Irrecoverable debts"], choices: ["Irrecoverable debts", "Allowance for irrecoverable debts", "Bank"] },
      { id: "b", accepted: ["customer's"], choices: ["customer's", "Sales", "Allowance"] },
    ],
    explanation: "The expense is debited and the customer's account is credited.",
  });

  const a1 = r2(27500 * 0.04);
  check("a1", a1, 1100);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: a1, daily: true, calculator: true, wrong: [27500, 2750],
    stem: "Trade receivables, after writing off irrecoverable debts, are US\\$27,500. The allowance is to be 4%. Calculate the allowance required.",
    explanation: "27,500 × 4% = 1,100.",
  });
  const rem2 = r2(23600 - 1200);
  const a2 = r2(rem2 * 0.05);
  const c2 = r2(a2 - 720);
  check("c2", c2, 400);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: c2, calculator: true, wrong: [a2, r2(23600 * 0.05 - 720)],
    stem: "At 31 December 2025 Farai's trade receivables were US\\$23,600, including a debt of US\\$1,200 that is to be written off. The allowance is to be 5% of the remaining receivables. The allowance account has a balance of US\\$720 at 1 January 2025. Calculate the charge to the statement of profit or loss for the change in the allowance.",
    hints: ["Write off first, then take 5%."],
    explanation: `Remaining receivables: 23,600 - 1,200 = ${fmt(rem2)}. Allowance: ${fmt(rem2)} × 5% = ${fmt(a2)}. Increase: ${fmt(a2)} - 720 = ${fmt(c2)}. Using 23,600 gives ${fmt(r2(23600 * 0.05 - 720))}.`,
  });
  const exp3 = r2(1380 + 770 - 250 + 140);
  check("exp3", exp3, 2040);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: exp3, calculator: true, wrong: [r2(1380 + 770 + 250 + 140), r2(1380 + 770 - 250)],
    stem: "During 2025 a business wrote off irrecoverable debts of US\\$1,380 and US\\$770 and received US\\$250 from a customer whose debt had been written off in 2024. The allowance was increased by US\\$140. Calculate the total irrecoverable debts expense shown in the statement of profit or loss.",
    hints: ["A recovery reduces the expense."],
    explanation: "1,380 + 770 - 250 + 140 = 2,040. Adding the recovery gives 2,540; leaving out the allowance increase gives 1,900.",
  });
  const rem4 = r2(41800 - 1800);
  const al4 = r2(rem4 * 0.06);
  const net4 = r2(rem4 - al4);
  check("net4", net4, 37600);
  b.calc({
    d: 4, skill: "APPLICATION", kind: "money", value: net4, calculator: true, wrong: [r2(41800 - r2(41800 * 0.06)), rem4],
    stem: "A trading business's ledger shows trade receivables of US\\$41,800, including US\\$1,800 owed by a customer who has gone out of business and whose debt is to be written off. An allowance of 6% is to be made on the remaining receivables. Calculate the net trade receivables to be shown in the statement of financial position.",
    hints: ["Write off first; then the allowance on what remains."],
    explanation: `Remaining: 41,800 - 1,800 = ${fmt(rem4)}. Allowance: 6% × ${fmt(rem4)} = ${fmt(al4)}. Net: ${fmt(rem4)} - ${fmt(al4)} = ${fmt(net4)}. Taking 6% of 41,800 gives net ${fmt(r2(41800 - r2(41800 * 0.06)))}.`,
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the accounting concept that supports creating an allowance for irrecoverable debts.",
    accepted: ["prudence", "the prudence concept", "prudence concept"],
    explanation: "Prudence: losses that are expected should be provided for and assets not overstated.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Distinguish between writing off an irrecoverable debt and creating an allowance for irrecoverable debts.",
    points: ["A write-off removes a debt known to be lost, through the customer's account", "An allowance is an estimate of future losses on debts still outstanding, recorded in a separate account"],
    modelAnswer: "A write-off deals with a debt that is definitely lost and credits the customer's account. An allowance estimates losses on the debts that remain and is kept in its own account, leaving the customers' accounts unchanged.",
    explanation: "Known loss against expected loss.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why only the **change** in the allowance is charged to the statement of profit or loss each year.",
    points: ["The opening allowance was already charged to profit in earlier years", "Charging the whole balance again would count the same expected loss twice", "The statement of profit or loss needs the adjustment that brings the allowance to the new required amount"],
    modelAnswer: "The opening allowance has already been charged in earlier years, so charging the whole balance again would double count it. Only the increase needed to reach the new level is an expense; a decrease is a gain.",
    hints: ["What does the opening balance of the allowance account represent?"],
    explanation: "Avoid double counting by adjusting only the difference.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "The owner of a Bulawayo business suggests reducing the allowance rate from 5% to 2% 'to make profit look better for the bank loan application'. Evaluate this suggestion.",
    points: ["Reducing the rate raises profit by crediting the reduction, which does not reflect any improvement in collections", "Without evidence from past experience the change is not prudent and could mislead the bank", "A lower rate is acceptable only if supported by facts such as a better record of collection or an ageing analysis"],
    modelAnswer: "The change would increase profit only because of the lower estimate, not because customers pay better. It is imprudent and could mislead the bank unless the lower rate is supported by evidence such as an ageing analysis or a better collection record.",
    hints: ["Does the change reflect real collection experience?"],
    explanation: "Marks reward linking prudence, evidence and users' decisions.",
  });

  // Structured 1: 10 marks
  const recv0 = 62400;
  const wo = sum([1150, 830]);
  const remaining = r2(recv0 - wo);
  const req = r2(remaining * 0.03);
  const chargeAllow = r2(req - 1520);
  check("remaining", remaining, 60420);
  check("req", req, 1812.6);
  check("chargeAllow", chargeAllow, 292.6);
  const sofp = table(["", "US\\$"], [["Trade receivables", remaining], ["Less: allowance for irrecoverable debts", -req], ["**Net trade receivables**", `**${fmt(r2(remaining - req))}**`]]);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `On 31 December 2025 the trade receivables control account of a shop in Mutare showed ${money(recv0)}. Two debts are to be written off: Farai ${money(1150)} and Sipho ${money(830)}. The allowance for irrecoverable debts is to be 3% of the remaining trade receivables. The allowance account had a balance of ${money(1520)} at 1 January 2025.`,
    parts: [
      P.fib({
        label: "(a)", marks: 2, stem: "Record the write-off of Farai's debt.",
        template: "Debit {{blank:dr}}; credit {{blank:cr}}.",
        blanks: [
          { id: "dr", accepted: ["Irrecoverable debts"], choices: ["Irrecoverable debts", "Farai's account", "Allowance for irrecoverable debts"] },
          { id: "cr", accepted: ["Farai's account"], choices: ["Irrecoverable debts", "Farai's account", "Allowance for irrecoverable debts"] },
        ],
        explanation: "Expense debited; the customer's receivable is credited.",
      }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: remaining, wrong: [recv0], stem: "Calculate the trade receivables remaining after the write-offs.", explanation: "62,400 - 1,150 - 830 = 60,420." }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: req, dp: 2, wrong: [r2(recv0 * 0.03)], stem: "Calculate the allowance required at 31 December 2025.", explanation: "3% × 60,420 = 1,812.60." }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: chargeAllow, dp: 2, wrong: [req], stem: "Calculate the charge to the statement of profit or loss for the change in the allowance.", explanation: "1,812.60 - 1,520 = 292.60 (an increase)." }),
      P.manual({ label: "(e)", marks: 2, type: "EXTENDED_RESPONSE", stem: "Show how trade receivables appear in the statement of financial position at 31 December 2025.", points: ["Trade receivables 60,420 less allowance (1,812.60)", "Net trade receivables 58,607.40"], modelAnswer: sofp, explanation: "Receivables are shown after the write-offs, less the allowance." }),
    ],
    hints: ["Write off before taking the percentage."],
    explanation: "This item tests write-offs, the allowance calculation and presentation.",
  });
  check("net58", r2(remaining - req), 58607.4);

  // Structured 2: 14 marks
  const y1 = r2(80000 - 2000);
  const al25 = r2(y1 * 0.025);
  const exp25 = r2(2000 + (al25 - 1600));
  const y2 = r2(64000 - 1300);
  const al26 = r2(y2 * 0.04);
  const exp26 = r2(1300 - 150 + (al26 - al25));
  check("al25", al25, 1950);
  check("exp25", exp25, 2350);
  check("al26", al26, 2508);
  check("exp26", exp26, 1708);
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: `Thandeka's wholesale business in Harare records the following. At 1 January 2025 the allowance for irrecoverable debts was ${money(1600)}.\n\n` + table(["", "2025 (US\\$)", "2026 (US\\$)"], [["Trade receivables before write-offs at 31 December", 80000, 64000], ["Irrecoverable debts written off", 2000, 1300], ["Irrecoverable debts recovered (debts written off earlier)", "nil", 150], ["Allowance rate on remaining receivables", "2.5%", "4%"]], ["l", "r", "r"]),
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: al25, wrong: [r2(80000 * 0.025)], stem: "Calculate the allowance required at 31 December 2025.", explanation: "(80,000 - 2,000) × 2.5% = 1,950." }),
      P.num({ label: "(b)", marks: 3, kind: "money", value: exp25, wrong: [al25, 2000], stem: "Calculate the total irrecoverable debts expense for 2025 (write-offs plus the change in the allowance).", explanation: "2,000 + (1,950 - 1,600) = 2,350." }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: al26, wrong: [r2(64000 * 0.04)], stem: "Calculate the allowance required at 31 December 2026.", explanation: "(64,000 - 1,300) × 4% = 2,508." }),
      P.num({ label: "(d)", marks: 3, kind: "money", value: exp26, wrong: [r2(1300 + 150 + 558), r2(1300 + 558)], stem: "Calculate the total irrecoverable debts expense for 2026.", explanation: "Write-offs 1,300 less recoveries 150 plus the increase in the allowance (2,508 - 1,950 = 558): 1,708." }),
      P.manual({ label: "(e)", marks: 4, stem: "The allowance rate was raised from 2.5% to 4% although trade receivables fell. Evaluate whether this change is reasonable.", points: ["A reason in favour: write-offs or recoveries suggest customers are riskier (for example older debts, slower payment) so a higher rate is prudent", "Another reason: the rate should reflect experience, so it may have been too low before", "A concern: the change reduces profit by 558 with no evidence supplied; it must be supported by an ageing analysis", "Conclusion: reasonable only if backed by evidence; otherwise it looks like profit management"], modelAnswer: "The higher rate could be reasonable if the business has seen customers paying more slowly or defaulting, because prudence requires a higher allowance. However, the change cost 558 of profit even though receivables fell, so it should be justified by an ageing analysis and past losses. Without that evidence it could be an arbitrary adjustment of profit.", explanation: "A balanced judgement uses figures, a reason for and against, and a conclusion." }),
    ],
    hints: ["Allowance first, then the change from the opening balance.", "Recoveries reduce the expense."],
    explanation: "This item tests two years of allowance movements and a judgement on the rate.",
  });

  b.card("DEFINITION", "What is an **irrecoverable debt**?", "A debt owed by a customer that the business has decided it will not collect; written off as an expense.");
  b.card("FACT", "Entry to write off a debt", "Debit Irrecoverable debts; credit the customer's account.");
  b.card("FACT", "Entry for a debt recovered after being written off", "Debit Bank; credit Irrecoverable debts recovered.");
  b.card("DEFINITION", "What is the **allowance** for irrecoverable debts?", "A credit balance that reduces trade receivables to the amount expected to be collected; an estimate of future losses.");
  b.card("FORMULA", "Allowance required", "Percentage × trade receivables remaining after known irrecoverable debts are written off.");
  b.card("FORMULA", "Charge or credit for the allowance", "Closing allowance - opening allowance: positive is an expense, negative is a credit to profit.");
  b.card("FACT", "Presentation in the statement of financial position", "Trade receivables less allowance for irrecoverable debts = net trade receivables.");
  b.card("CONCEPT", "Which concept supports the allowance?", "Prudence: do not overstate assets or profit when losses are expected.");
  b.card("FACT", "Effect on profit of reducing the allowance", "Profit increases: the reduction is credited to the statement of profit or loss.");
});
