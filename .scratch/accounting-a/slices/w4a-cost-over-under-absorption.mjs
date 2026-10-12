// W4a: cost.over-under-absorption
import { concept, P, table, chk, r2, costing, tAccount } from "../lib.mjs";
import { mc, F, usd, p1 } from "../tables/w4a-lib.mjs";

concept("aacc.cost.over-under-absorption", { file: "cost/over-under-absorption", keyPrefix: "cost.over-under-absorption" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "How is over- or under-absorbed overhead calculated?",
    ok: ["Overhead absorbed less actual overhead", "Correct: a positive result means over-absorbed."],
    bad: [["Actual overhead less budgeted overhead", "That compares spending with the budget, not absorption."], ["Budgeted overhead less overhead absorbed", "Absorption is compared with the actual overhead incurred."], ["Actual activity less budgeted activity", "That is only one cause of the difference."]],
    explanation: "Over- or under-absorption = overhead absorbed - actual overhead. Positive is over-absorbed; negative is under-absorbed.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What does it mean if overhead is under-absorbed?",
    ok: ["The overhead charged to products is less than the overhead actually incurred", "Correct: the products have not carried all the cost."],
    bad: [["The overhead charged to products is more than the overhead incurred", "That is over-absorption."], ["The factory has spent less than its budget", "Spending below budget tends to cause over-absorption."], ["The absorption rate is calculated from actual figures", "The rate is always pre-determined."]],
    explanation: "Under-absorption means the absorbed overhead is lower than the actual overhead, so some real cost has not been charged to products.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How is under-absorbed overhead treated in the statement of profit or loss?",
    ok: ["It is deducted from profit as an extra expense", "Correct: costs were not fully charged to products."],
    bad: [["It is added to profit as extra income", "That is the treatment of over-absorbed overhead."], ["It is added to the value of closing inventory", "The adjustment is made to profit in the period."], ["It is ignored because it is only an estimate", "The difference is real cost and must be recorded."]],
    explanation: "Under-absorbed overhead is a cost not yet charged, so it is debited to profit or loss and reduces profit.",
  });
  const hrsB = 14000, ohB = 84000, hrsA = 14650, ohA = 85500;
  const rt = ohB / hrsB;
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: `A factory budgets overheads of ${usd(ohB)} and ${F(hrsB)} direct labour hours, and absorbs overheads on direct labour hours. Actual overheads were ${usd(ohA)} and ${F(hrsA)} hours were worked. What was the result?`,
    ok: [`${usd(rt * hrsA - ohA)} over-absorbed`, "Correct: absorbed 87,900 less actual 85,500."],
    bad: [[`${usd(rt * hrsA - ohA)} under-absorbed`, "The amount is right but the direction is wrong: absorbed exceeds actual."], [`${usd(ohA - ohB)} over-absorbed`, "This is the extra spending compared with the budget."], [`${usd(ohA - ohB)} under-absorbed`, "This compares actual with budget, and ignores the extra hours worked."]],
    hints: ["Absorbed overhead = actual hours × budgeted rate."],
    explanation: `Rate = ${F(ohB)} ÷ ${F(hrsB)} = ${usd(rt)}. Absorbed = ${F(hrsA)} × ${rt} = ${F(rt * hrsA)}. ${F(rt * hrsA)} - ${F(ohA)} = ${usd(rt * hrsA - ohA)} over-absorbed.`,
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which situation is most likely to cause overhead to be over-absorbed?",
    ok: ["Activity much higher than budget while fixed overheads are as budgeted", "Correct: more hours absorb more overhead than planned."],
    bad: [["Activity lower than budget with fixed overheads as budgeted", "Fewer hours absorb less, causing under-absorption."], ["Actual overheads much higher than budget with activity as budgeted", "Higher spending with the same absorption gives under-absorption."], ["A rate calculated using actual overheads", "The rate is always pre-determined."]],
    hints: ["Think about what is absorbed and what is spent."],
    explanation: "A high output absorbs more overhead while fixed overheads are unchanged, so absorbed exceeds actual.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "In the production overhead control account, which entry represents the overhead absorbed into products?",
    ok: ["A credit, with the debit in work in progress", "Correct: absorption transfers overhead to the cost of products."],
    bad: [["A debit, with the credit in work in progress", "Actual overheads are debited; absorbed overhead is credited."], ["A credit, with the debit in the bank account", "Bank is credited when overheads are paid."], ["A debit, with the credit in the statement of profit or loss", "Profit or loss receives only the balance of the account."]],
    hints: ["Actual overheads are debited to the control account."],
    explanation: "Actual overheads are debited to the control account; the overhead absorbed is credited, and the work in progress account is debited.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A bakery under-absorbed overhead although it worked more hours than budgeted. What must have happened?",
    ok: ["Actual overhead rose by more than the extra absorption", "Correct: overspending outweighed the benefit of the extra hours."],
    bad: [["The absorption rate was set too high", "A higher rate would absorb more, not less."], ["Fixed overhead fell as the hours increased", "That would help absorption, not reduce it."], ["Budgeted hours were never used in the rate", "The rate is always based on budgeted hours."]],
    hints: ["Extra hours absorb more, so what else changed?"],
    explanation: "More hours absorb more overhead. Under-absorption in spite of that means actual spending exceeded the budget by even more.",
  });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Over-absorbed overhead is added to profit.", answer: true, explanation: "True. Products were charged with more overhead than was incurred, so profit is increased by the adjustment." });
  b.tf({ d: 3, skill: "UNDERSTANDING", stem: "Overhead can be over-absorbed even when actual overhead is greater than the budgeted overhead.", answer: true, hints: ["Consider the effect of high activity."], explanation: "True. If activity is much higher than budget, the extra absorbed can exceed the extra spending." });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each situation to its result.",
    pairs: ["Absorbed US\\$50,000; actual US\\$46,000", "Absorbed US\\$50,000; actual US\\$53,500", "Activity below budget; spending equal to budget", "Spending below budget; activity equal to budget"],
    right: ["Over-absorbed by US\\$4,000", "Under-absorbed by US\\$3,500", "Under-absorption", "Over-absorption"],
    rightIndex: [0, 1, 2, 3],
    explanation: "Absorbed greater than actual is over-absorbed. Low activity absorbs less than planned; low spending leaves absorbed greater than actual.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences.",
    template: "When overhead is under-absorbed, the amount is {{blank:a}} from profit. When it is over-absorbed, the amount is {{blank:b}} to profit.",
    blanks: [{ id: "a", accepted: ["deducted"], choices: ["deducted", "added", "ignored"] }, { id: "b", accepted: ["added"], choices: ["deducted", "added", "ignored"] }],
    explanation: "Under-absorption reduces profit; over-absorption increases it.",
  });
  b.short({ d: 1, skill: "RECALL", stem: "Name the account in which actual overheads are debited and absorbed overheads are credited.", accepted: ["production overhead control account", "overhead control account", "overhead control"], explanation: "It is the production overhead control account." });

  const rate5 = 5.5, mh5 = 9800, act5 = 57200;
  const ab5 = rate5 * mh5;
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: ab5, calculator: true, daily: true, wrong: [act5, rate5 * 11000],
    stem: `A Harare engineering firm uses a machine hour rate of ${usd(rate5)}. In the year ${F(mh5)} machine hours were worked and actual overheads were ${usd(act5)}. Calculate the overhead absorbed in the year.`,
    hints: ["Absorbed = actual hours × rate."],
    explanation: `${F(mh5)} × ${rate5} = ${usd(ab5)}. The actual overhead (${usd(act5)}) is the amount incurred, not the amount absorbed.`,
  });
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: act5 - ab5, calculator: true, wrong: [ab5 - act5 + 1000, act5],
    stem: "Using the figures in the previous question, calculate the under-absorbed overhead for the year.",
    hints: ["Actual less absorbed, when the answer is under-absorbed."],
    explanation: `Absorbed ${F(ab5)} - actual ${F(act5)} = (${F(act5 - ab5)}), so ${usd(act5 - ab5)} was under-absorbed.`,
  });
  const dlcA = 31500, rate6 = 120, actOH6 = 36150;
  const ab6 = (rate6 / 100) * dlcA;
  b.calc({
    d: 4, skill: "APPLICATION", kind: "money", value: ab6 - actOH6, calculator: true, wrong: [actOH6 - ab6, ab6],
    stem: `A tailoring workshop absorbs overheads at 120% of direct labour cost. Actual direct labour cost for the year was ${usd(dlcA)} and actual overheads were ${usd(actOH6)}. Calculate the over-absorbed overhead.`,
    hints: ["Absorbed = 120% of the actual labour cost."],
    explanation: `Absorbed = 120% × ${F(dlcA)} = ${F(ab6)}. Over-absorbed = ${F(ab6)} - ${F(actOH6)} = ${usd(ab6 - actOH6)}.`,
  });
  const bh7 = 20000, bo7 = 160000, ah7 = 18500;
  const effAct = (ah7 - bh7) * (bo7 / bh7);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: Math.abs(effAct), calculator: true, wrong: [bo7 / bh7, Math.abs(effAct) / 2],
    stem: `A factory budgeted overheads of ${usd(bo7)} and ${F(bh7)} machine hours. Only ${F(ah7)} hours were worked. Calculate how much less overhead was absorbed because of the lower activity than the budget.`,
    hints: ["Multiply the shortfall in hours by the rate."],
    explanation: `Rate = ${F(bo7)} ÷ ${F(bh7)} = ${usd(bo7 / bh7)}. Shortfall = ${F(bh7 - ah7)} hours × ${bo7 / bh7} = ${usd(Math.abs(effAct))} less absorbed.`,
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Give two reasons why overhead may be under-absorbed in a year.",
    points: ["Activity was lower than the budgeted activity, so less overhead was absorbed", "Actual overheads were higher than the budget (for example higher electricity or rent)"],
    modelAnswer: "Output may be below the level budgeted, so fewer hours absorb less overhead; or actual overheads may exceed the budget.",
    explanation: "One mark for each reason.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how the under-absorption of overhead affects the profit and the cost of products.",
    points: ["The overhead absorbed is less than the actual overhead, so products are under-costed", "Profit calculated using absorbed costs is overstated", "The under-absorbed amount is deducted from profit to correct it"],
    modelAnswer: "Products carry less overhead than was really incurred, so profit appears higher than it is. The under-absorbed amount is charged to the statement of profit or loss, reducing profit.",
    hints: ["Think about what was charged to products and what was actually spent."],
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "A firm has under-absorbed overheads three years in succession. Advise management on what to do.",
    points: ["Repeated under-absorption suggests that the rate is too low or the budgeted activity is too optimistic", "Prices based on the rate have been too low, so profit is lower than it appears", "Review and revise the budget and the rate (and the base) using realistic activity", "Control spending where actual overheads exceed the budget"],
    modelAnswer: "Repeated under-absorption shows that the rate is too low, so prices have been too low. Management should set realistic activity levels, revise the rate and control overhead spending.",
    hints: ["Think of the rate, the prices and the budget."],
    explanation: "One mark for each point.",
  });

  // Structured 1 (12)
  const bOH = 135000, bH = 18000, aH = 16800, aOH = 131400;
  const rt1 = bOH / bH;
  chk(rt1, 7.5);
  const abs1 = rt1 * aH;
  chk(abs1, 126000);
  const und = aOH - abs1;
  chk(und, 5400);
  const actEff = (bH - aH) * rt1;
  const spendEff = bOH - aOH;
  chk(spendEff - actEff, -und);
  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `Mutare Pumps Ltd absorbs production overheads on direct labour hours. Its budget for 2026 was overheads of ${usd(bOH)} and ${F(bH)} direct labour hours. Actual results were ${F(aH)} direct labour hours and actual overheads of ${usd(aOH)}.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: abs1, wrong: [aOH, rt1 * bH], stem: "Calculate the overhead absorbed in 2026.", explanation: `Rate ${F(bOH)} ÷ ${F(bH)} = ${usd(rt1)}; absorbed = ${F(aH)} × ${rt1} = ${usd(abs1)}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: und, wrong: [bOH - aOH, abs1 - aOH + 1], stem: "Calculate the amount of overhead that was under-absorbed.", explanation: `${F(aOH)} - ${F(abs1)} = ${usd(und)} under-absorbed.` }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: actEff, wrong: [(bH - aH) * 7, bOH - aOH], stem: "Calculate the amount by which absorption fell short because of the lower activity than budget.", explanation: `(${F(bH)} - ${F(aH)}) × ${rt1} = ${usd(actEff)}.` }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: spendEff, wrong: [actEff, und], stem: "Calculate the amount by which the actual overhead was below the budget.", explanation: `${F(bOH)} - ${F(aOH)} = ${usd(spendEff)}.` }),
      P.mcq({ label: "(e)", marks: 1, stem: "How is the under-absorbed amount treated in the statement of profit or loss?", options: [["It is deducted from profit", "Correct."], ["It is added to profit", "That is over-absorption."], ["It is added to inventory", "It is charged to the period."], ["It is carried forward to the next year", "The control account is cleared."]], answer: "A", explanation: "Under-absorbed overhead is an extra charge to profit." }),
      P.manual({ label: "(f)", marks: 3, stem: "Explain why overhead was under-absorbed even though actual spending was below the budget, and suggest one action.", points: [`The lower activity cost ${F(actEff)} of absorption, more than the saving in spending of ${F(spendEff)}`, "Most of the overhead is fixed, so it does not fall when hours fall", "Action: improve the forecasting of activity or revise the rate; find work to use the spare capacity"], modelAnswer: `Spending was ${F(spendEff)} below budget, but the 1,200 fewer hours absorbed ${F(actEff)} less. Because most overhead is fixed, it did not fall with the hours. Management should forecast activity more carefully and seek more work.`, explanation: "One mark for each point." }),
    ],
    hints: ["Rate = budgeted overhead ÷ budgeted hours.", "Under-absorbed = actual - absorbed."],
    explanation: "This item analyses an under-absorption into an activity effect and a spending effect.",
  });

  // Structured 2 (10)
  const prof = 48500, absO = 52000, actO = 49400;
  const overAmt = absO - actO;
  const ctlModel = tAccount("Production overhead control account", [["31 Dec", "Various (actual overheads)", actO]], [["31 Dec", "Work in progress (absorbed)", absO]], { cdDate: "31 Dec", cd: "Statement of profit or loss (over-absorbed)" }).split("\n").slice(0, -1).join("\n");
  b.struct({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: `Bulawayo Tanks Ltd had production overheads absorbed of ${usd(absO)} in 2026 and actual overheads of ${usd(actO)}. Profit for 2026, calculated using overheads at the absorbed amount, was ${usd(prof)}.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: overAmt, wrong: [actO - prof, absO - prof], stem: "Calculate the over-absorbed overhead.", explanation: `${F(absO)} - ${F(actO)} = ${usd(overAmt)} over-absorbed.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: prof + overAmt, wrong: [prof - overAmt, prof], stem: "Calculate the profit after correcting for the over-absorption.", explanation: `${F(prof)} + ${F(overAmt)} = ${usd(prof + overAmt)}. Over-absorption is added to profit.` }),
      P.manual({ label: "(c)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare the production overhead control account for 2026, clearing the balance to the statement of profit or loss.", points: [`Debit: actual overheads ${F(actO)}`, `Credit: work in progress, overhead absorbed ${F(absO)}`, `Balance of ${F(overAmt)} transferred to the statement of profit or loss`, `Both sides total ${F(absO)}`], modelAnswer: ctlModel, explanation: "One mark for each line." }),
      P.manual({ label: "(d)", marks: 2, stem: "State two possible causes of the over-absorption.", points: ["Activity was higher than the budgeted activity", "Actual overheads were lower than the budget"], modelAnswer: "More hours than budgeted may have been worked, or actual overhead may have been below budget.", explanation: "One mark for each cause." }),
    ],
    hints: ["Absorbed - actual, positive means over-absorbed."],
    explanation: "This item tests the calculation, the profit adjustment and the control account for an over-absorption.",
  });

  b.card("FORMULA", "Over- or under-absorption", "Overhead absorbed (actual activity × budgeted rate) - actual overhead. Positive = over-absorbed; negative = under-absorbed.");
  b.card("CONCEPT", "Causes of over- or under-absorption", "Activity different from budget, actual spending different from budget, or both.");
  b.card("CONCEPT", "Profit adjustment", "Over-absorbed: add to profit. Under-absorbed: deduct from profit.");
  b.card("CONCEPT", "Overhead control account", "Debit: actual overheads incurred. Credit: overhead absorbed into work in progress. The balance goes to profit or loss.");
  b.card("CONCEPT", "Activity effect", "(Actual hours - budgeted hours) × rate: the over- or under-absorption caused by the level of activity.");
  b.card("CONCEPT", "Spending effect", "Budgeted overhead - actual overhead: favourable if less is spent than budgeted.");
  b.card("DEFINITION", "Under-absorbed overhead", "Overhead absorbed is less than actual; products were under-costed and profit is reduced by the adjustment.");
  b.card("DEFINITION", "Over-absorbed overhead", "Overhead absorbed exceeds actual; products were over-costed and profit is increased by the adjustment.");
  b.card("CONCEPT", "What a large difference tells management", "The budget or the rate was unrealistic: revise the rate, improve forecasting, control overhead spending.");
});
void p1; void r2; void costing; void table;
