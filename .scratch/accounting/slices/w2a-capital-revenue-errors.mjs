// W2a: effects of incorrectly classifying capital and revenue expenditure.
import { concept, P, money, statement, check, r2 } from "../lib.mjs";
import { table } from "../tables/w2a-lib.mjs";

const U = String.raw`US\$`;

concept("acc.adjustments.capital-revenue-errors", { file: "adjustments/capital-revenue-errors", keyPrefix: "adjustments.capital-revenue-errors" }, (b) => {
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The purchase of a delivery van was debited to the motor expenses account. What is the effect on profit?",
    options: [
      ["Profit is understated", "Correct: an asset has been charged as an expense, so expenses are too high."],
      ["Profit is overstated", "Extra expenses reduce profit; they do not increase it."],
      ["Profit is not affected", "Motor expenses are charged to the income statement, so profit changes."],
      ["Only the trial balance is affected", "The trial balance still agrees; the error is in the statements."],
    ],
    answer: "A",
    explanation: "Capital expenditure treated as revenue: expenses overstated, so profit understated, and non-current assets understated.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Repairs to a machine were debited to the machinery account. What is the effect on non-current assets?",
    options: [
      ["Overstated", "Correct: an expense has been added to the asset's value."],
      ["Understated", "Adding the repairs to the asset makes it larger, not smaller."],
      ["Not affected", "The machinery account is a non-current asset, so it is affected."],
      ["Reduced to zero", "The machine's cost remains; the repairs are added to it."],
    ],
    answer: "A",
    explanation: "Revenue expenditure treated as capital: profit overstated and non-current assets overstated by the same amount (before depreciation).",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Treating capital expenditure as revenue expenditure is an example of which type of error?",
    options: [
      ["An error of principle", "Correct: the entry is in the wrong class of account."],
      ["An error of omission", "The transaction was recorded, just in the wrong class of account."],
      ["A transposition error", "A transposition error reverses digits, such as 450 for 540."],
      ["An error of original entry", "The amount was correct; the class of account was wrong."],
    ],
    answer: "A",
    explanation: "Errors of principle post an amount to the wrong class of account (asset instead of expense or the reverse). The trial balance still agrees.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Does treating revenue expenditure as capital expenditure cause the trial balance to disagree?",
    options: [
      ["No, because the debit and credit are still equal", "Correct: only the account debited is wrong."],
      ["Yes, because the debit is in the wrong account", "Using the wrong debit account does not change the totals."],
      ["Yes, because assets are overstated", "The trial balance checks equality of debits and credits, not classification."],
      ["No, because capital expenditure is not in the trial balance", "Non-current assets do appear in the trial balance."],
    ],
    answer: "A",
    explanation: "Errors of principle are among the errors not revealed by the trial balance.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Tendai's draft profit is US\\$12,400. A new fridge costing US\\$1,500 was debited to the repairs account. Ignoring depreciation, what is the correct profit?",
    options: [
      ["US\\$13,900", "Correct: the fridge was wrongly charged as an expense, so 1,500 is added back."],
      ["US\\$10,900", "This deducts the fridge again; profit was understated, so it must go up."],
      ["US\\$12,400", "The error does change profit."],
      ["US\\$15,400", "This adds the amount twice."],
    ],
    answer: "A",
    hints: ["Was profit understated or overstated by the error?"],
    explanation: "Capital treated as revenue understates profit: $12,400 + 1,500 = 13,900$.",
  });
  const mc = 4800;
  const dep = r2(mc * 0.15);
  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `A machine bought for ${money(mc)} at the start of the year was debited to purchases. Machinery is depreciated at 15% of cost per year. By how much is profit for the year understated?`,
    options: [
      [money(r2(mc - dep)), `Correct: ${money(mc)} wrongly expensed, less depreciation of ${money(dep)} that should have been charged.`],
      [money(mc), "This forgets that depreciation should have been charged on the machine."],
      [money(dep), "This is only the depreciation, not the net effect."],
      [money(r2(mc + dep)), "Depreciation reduces the correction; it is not added."],
    ],
    answer: "A",
    hints: ["Add back the cost, then charge the correct depreciation."],
    explanation: `Profit is understated by $4,800 - 720 = 4,080$: the full cost was charged, but only depreciation of ${money(dep)} should have been.`,
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Wages of US\\$950 paid to Chipo's own workers for installing new shelving were debited to the wages account. Which statement about profit and non-current assets is correct?",
    options: [
      ["Both are understated by US\\$950 (before depreciation)", "Correct: installation is part of the cost of the shelving."],
      ["Both are overstated by US\\$950", "Charging extra wages lowers profit; it does not raise it."],
      ["There is no error, because wages are always revenue expenditure", "Wages for installing an asset are capital expenditure."],
      ["Profit is overstated; non-current assets are understated", "Extra wages expense means profit is too low, not too high."],
    ],
    answer: "A",
    hints: ["What were the wages paid for?"],
    explanation: "Classification depends on purpose. Installing shelving is part of its cost, so treating it as wages understates both profit and the asset.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which of these errors would change the business's **working capital**?",
    options: [
      ["Unsold goods for resale were debited to equipment, not inventory", "Correct: inventory (a current asset) is understated."],
      ["A van bought by bank transfer was debited to motor running expenses", "The bank entry is correct; only profit and non-current assets are affected."],
      ["Repairs paid in cash were debited to the premises account", "The cash entry is correct; only profit and non-current assets are affected."],
      ["Installation costs paid by cheque were debited to wages", "The bank entry is correct; working capital is unchanged."],
    ],
    answer: "A",
    hints: ["Working capital = current assets − current liabilities. Which error touches a current item?"],
    explanation: "Most misclassifications affect only the debit side, so working capital does not change. Inventory is a current asset, so moving unsold goods into equipment understates working capital.",
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "If revenue expenditure is treated as capital expenditure, profit is overstated.",
    answer: true,
    explanation: "True. An expense is missing from the income statement, so profit is too high.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Treating capital expenditure as revenue expenditure overstates the non-current assets in the statement of financial position.",
    answer: false,
    explanation: "False. The asset is missing from the non-current assets, so they are understated.",
  });

  b.match({
    d: 3, skill: "ANALYSIS",
    stem: "Match each error with its effect on profit.",
    pairs: ["Purchase of office furniture debited to office expenses", "Painting the shop (maintenance) debited to premises", "Legal fees on buying a warehouse debited to legal expenses", "Servicing a generator debited to the generator account"],
    right: ["Profit understated", "Profit overstated"],
    rightIndex: [0, 1, 0, 1],
    hints: ["Asset charged as expense → profit too low."],
    explanation: "Capital charged as expense understates profit; expense added to an asset overstates it.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentence.",
    template: "If a new computer is debited to the office expenses account, profit is {{blank:a}} and non-current assets are {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["understated"], choices: ["understated", "overstated", "unaffected"] },
      { id: "b", accepted: ["understated"], choices: ["understated", "overstated", "unaffected"] },
    ],
    explanation: "Capital treated as revenue: both profit and non-current assets are too low.",
  });

  // Corrected profit calculation
  const d1 = { draft: 23460, a: 875, b: 3200, bRate: 25, c: 540 };
  const corr = r2(d1.draft - d1.a + d1.b - (d1.b * d1.bRate) / 100 + d1.c);
  check("corr", corr, 23460 - 875 + 3200 - 800 + 540);
  b.calc({
    d: 4, kind: "money", value: corr, calculator: true, wrong: [r2(d1.draft - d1.a + d1.b + d1.c), r2(d1.draft + d1.a - d1.b + 800 - d1.c)],
    stem: "Rudo's draft profit for the year was US\\$23,460, before depreciation on the items below. She finds that:\n\n" +
      table(["", "Error"], [["(i)", "Repairs to the shop roof, US\\$875, were debited to the premises account."], ["(ii)", "A generator bought for US\\$3,200 was debited to the electricity account. Generators are depreciated at 25% of cost per year."], ["(iii)", "Carriage of US\\$540 on a new shop counter was debited to carriage inwards. Counters are not depreciated in the year of purchase."]]) +
      "\n\nCalculate the corrected profit.",
    hints: ["Decide for each item whether profit was overstated or understated.", "Remember the depreciation on the generator."],
    explanation: `$23,460 - 875 + 3,200 - 800 + 540 = ${corr.toLocaleString("en-GB")}$, so ${money(corr)}. The generator's depreciation is $3,200 \\times 25\\% = 800$. Forgetting it gives ${money(r2(d1.draft - d1.a + d1.b + d1.c))}.`,
  });
  // Net book value effect
  const nbv = r2(2600 - 2600 * 0.2);
  b.num({
    d: 3, kind: "money", value: nbv, wrong: [2600, 520],
    stem: "At the start of the year a photocopier costing US\\$2,600 was debited to the stationery account. Office equipment is depreciated at 20% of cost per year. By how much are non-current assets understated at the year end?",
    hints: ["The asset should appear at cost less one year's depreciation."],
    explanation: `The photocopier should appear at net book value $2,600 - 520 = ${nbv.toLocaleString("en-GB")}$, so non-current assets are understated by ${money(nbv)}.`,
  });

  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "Farai's bookkeeper charged a new delivery van to motor expenses. Explain **two** ways this could mislead Farai or other users of his accounts.",
    points: ["Profit is understated, so Farai may think the business is doing worse than it is / may make poor decisions", "Non-current assets are understated, so the statement of financial position undervalues the business (e.g. a lender or buyer is misled)", "Next year's profit will be overstated because no depreciation will be charged on the van / comparisons between years are distorted"],
    modelAnswer: "This year's profit looks too low, which could lead Farai to cut back unnecessarily. The van is missing from the statement of financial position, so the business looks smaller to a bank. In later years no depreciation is charged, so profits look better than they are and comparisons are distorted.",
    hints: ["Think about this year's profit, the statement of financial position and future years."],
    explanation: "Misclassification distorts profit in more than one year and the asset values.",
  });

  // Practice structured 1: identify and correct
  const s = { draft: 31280, i: 1150, ii: 6400, iiRate: 10, iii: 720, iv: 380 };
  const sDep = r2((s.ii * s.iiRate) / 100);
  // (i) installation of machine debited to wages: +1,150; (ii) machine 6,400 debited to purchases: +6,400 − depreciation 640;
  // (iii) repainting debited to premises: −720; (iv) delivery of a new van debited to motor expenses: +380.
  const corrected = r2(s.draft + s.i + s.ii - sDep - s.iii + s.iv);
  check("corrected", corrected, 31280 + 1150 + 6400 - 640 - 720 + 380);
  const stmt = "**Tatenda's Furniture Works**\n\n**Statement of corrected net profit**\n\n" + statement("for the year ended 31 December 2025", [
    ["Draft net profit", null, s.draft],
    ["Add: (i) Installation of machine charged to wages", null, s.i],
    ["Add: (ii) Machine charged to purchases", null, s.ii],
    ["Less: (ii) Depreciation on the machine (10%)", null, -sDep],
    ["Less: (iii) Repainting charged to premises", null, -s.iii],
    ["Add: (iv) Delivery of new van charged to motor expenses", null, s.iv],
    ["**Corrected net profit**", null, `**${corrected.toLocaleString("en-GB")}**`],
  ], { checks: [["corrected", corrected, 37850]] });
  b.struct({
    d: 5, examStyle: true, skill: "ANALYSIS", calculator: true,
    stem: "Tatenda makes furniture in Harare. His draft net profit for the year ended 31 December 2025 was US\\$31,280, calculated before depreciation on the items below. The following were then discovered:\n\n" +
      table(["", "Item"], [["(i)", "Wages of US\\$1,150 paid to his workers for installing a new wood-cutting machine were debited to wages."], ["(ii)", "The wood-cutting machine itself, costing US\\$6,400, was debited to purchases. Machinery is depreciated at 10% of cost per year."], ["(iii)", "Repainting the workshop, US\\$720, was debited to the premises account."], ["(iv)", "Delivery of a new van, US\\$380, was debited to motor expenses. Vehicles are not depreciated in the year of purchase."]]),
    parts: [
      P.match({ label: "(a)", stem: "For each item, state the effect of the error on the draft net profit.", pairs: ["(i)", "(ii)", "(iii)", "(iv)"], right: ["Understated", "Overstated"], rightIndex: [0, 0, 1, 0], explanation: "Capital charged as expense understates profit; repainting added to premises overstates it." }),
      P.num({ label: "(b)", marks: 1, kind: "money", value: sDep, wrong: [r2(((s.ii + s.i) * s.iiRate) / 100)], stem: "Calculate the depreciation that should be charged on the machine (on its purchase price only, as stated).", explanation: `$6,400 \\times 10\\% = ${sDep}$.` }),
      P.num({ label: "(c)", marks: 3, kind: "money", value: corrected, wrong: [r2(s.draft + s.i + s.ii - s.iii + s.iv), r2(s.draft + s.i + s.ii - sDep + s.iii + s.iv)], stem: "Calculate the corrected net profit.", explanation: `$31,280 + 1,150 + 6,400 - 640 - 720 + 380 = ${corrected.toLocaleString("en-GB")}$.` }),
      P.manual({ label: "(d)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare a statement of corrected net profit.", points: ["Starts from the draft net profit 31,280 with a heading", "Adds 1,150, 6,400 and 380", "Deducts depreciation 640 and repainting 720", "Corrected net profit 37,850"], modelAnswer: stmt, explanation: "Each correction is labelled Add or Less." }),
      P.manual({ label: "(e)", marks: 2, stem: "State the effect of item (iii) on the statement of financial position and on working capital.", points: ["Non-current assets (premises) overstated by 720", "Working capital not affected: the payment was correctly recorded"], modelAnswer: "Premises are overstated by US\\$720. Working capital is unchanged because the payment from the bank was recorded correctly.", explanation: "Only the debit was misposted." }),
    ],
    hints: ["Capital charged as expense: add back. Expense added to an asset: deduct.", "Deduct the depreciation on any asset you add back."],
    explanation: "This item tests identifying misclassification and calculating corrected profit.",
  });

  // Practice structured 2: NCA and profit effects
  const t = { draftNca: 48600, draftProfit: 14250, comp: 2200, compRate: 25, rep: 960 };
  const tDep = r2((t.comp * t.compRate) / 100);
  const tProfit = r2(t.draftProfit + t.comp - tDep - t.rep);
  const tNca = r2(t.draftNca + t.comp - tDep - t.rep);
  check("tProfit", tProfit, 14940);
  check("tNca", tNca, 49290);
  b.struct({
    d: 4, examStyle: true, skill: "APPLICATION", calculator: true,
    stem: `Thandeka's draft statements for her Mutare travel agency show non-current assets (net book value) of ${money(t.draftNca)} and profit for the year of ${money(t.draftProfit)}, both before depreciation on the items below. She discovers that a computer bought at the start of the year for ${money(t.comp)} was debited to office expenses, and that repairs to office furniture of ${money(t.rep)} were debited to the furniture account. Computers are depreciated at ${t.compRate}% of cost per year.`,
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "money", value: tDep, wrong: [t.comp], stem: "Calculate the depreciation on the computer for the year.", explanation: `$2,200 \\times 25\\% = ${tDep}$.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: tProfit, wrong: [r2(t.draftProfit + t.comp - t.rep), r2(t.draftProfit + t.comp - tDep + t.rep)], stem: "Calculate the corrected profit for the year.", explanation: `$14,250 + 2,200 - 550 - 960 = ${tProfit.toLocaleString("en-GB")}$.` }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: tNca, wrong: [r2(t.draftNca + t.comp - t.rep)], stem: "Calculate the corrected net book value of the non-current assets.", explanation: `$48,600 + (2,200 - 550) - 960 = ${tNca.toLocaleString("en-GB")}$.` }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why the trial balance did not reveal these errors.", points: ["They are errors of principle: the amounts were posted to the wrong class of account", "Each debit still had an equal credit, so the totals agreed"], modelAnswer: "Both are errors of principle. The debit went to the wrong type of account but was still matched by an equal credit, so the trial balance totals agreed.", explanation: "Errors of principle are not revealed by the trial balance." }),
    ],
    hints: ["Add back the computer and charge its depreciation.", "Remove the repairs from the furniture and charge them as an expense."],
    explanation: "This item tests the combined effect of misclassification on profit and on non-current assets.",
  });

  b.card("FACT", "Capital expenditure treated as revenue", "Profit understated; non-current assets understated.");
  b.card("FACT", "Revenue expenditure treated as capital", "Profit overstated; non-current assets overstated.");
  b.card("DEFINITION", "What is an **error of principle**?", "An amount posted to the wrong class of account (e.g. an asset as an expense). The trial balance still agrees.");
  b.card("FORMULA", "Correcting profit when an asset was expensed", "Draft profit + cost wrongly expensed − depreciation that should have been charged.");
  b.card("CONCEPT", "Is working capital affected by misclassifying expenditure?", "Usually not: the bank or payable entry was correct; only the debit is wrong. It changes only if a current item (e.g. inventory) is involved.");
  b.card("DEFINITION", "What does **overstated** mean?", "Shown higher than the correct figure.");
  b.card("DEFINITION", "What does **understated** mean?", "Shown lower than the correct figure.");
  b.card("CONCEPT", "Effect on next year of expensing an asset", "No depreciation is charged later, so future profits are overstated and comparisons are distorted.");
});
