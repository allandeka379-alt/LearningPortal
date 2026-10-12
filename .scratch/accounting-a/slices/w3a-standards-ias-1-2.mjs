// W3a: standards.ias-1-2
import { concept, P, table, sum, r2, fmt, money, chk, ratios, inventory } from "../lib.mjs";
import { mc } from "../tables/w3a-lib.mjs";

const val = (u, cost, price, sell) => r2(u * inventory.lowerOfCostAndNrv(cost, price, sell));

concept("aacc.standards.ias-1-2", { file: "standards/ias-1-2", keyPrefix: "standards.ias-1-2" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of these is NOT part of a complete set of financial statements under IAS 1?",
    ok: ["The trial balance before adjustments", "Correct: it is an internal working."],
    bad: [["The statement of changes in equity", "It is one of the required statements."], ["The statement of cash flows", "It is one of the required statements."], ["The notes, including accounting policies", "The notes are part of the set."]],
    explanation: "A complete set contains the statements of profit or loss and other comprehensive income, financial position, changes in equity and cash flows, and the notes.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Under IAS 2, inventory is measured at:",
    ok: ["the lower of cost and net realisable value", "Correct: this applies prudence."],
    bad: [["the higher of cost and net realisable value", "That would anticipate profit."], ["selling price", "Selling price includes profit not yet earned."], ["replacement cost", "Replacement cost is not the IAS 2 measure."]],
    explanation: "IAS 2 requires inventory to be valued at the lower of cost and NRV, so losses are recognised immediately.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Which cost formula for inventory is NOT permitted by IAS 2?",
    ok: ["LIFO (last in, first out)", "Correct: it is not permitted."],
    bad: [["FIFO (first in, first out)", "FIFO is permitted."], ["Weighted average cost", "Weighted average cost (AVCO) is permitted."], ["Specific cost for unique items", "Specific identification is allowed for non-interchangeable items."]],
    explanation: "IAS 2 allows FIFO, weighted average cost and specific identification for items that are not interchangeable, but not LIFO.",
  });
  const u1 = 700, c1 = 12.5, p1 = 14, s1 = 3.5;
  const v1 = inventory.lowerOfCostAndNrv(c1, p1, s1);
  chk(v1, 10.5);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `An item of inventory cost US\\$${c1.toFixed(2)} per unit. It can be sold for US\\$${p1.toFixed(2)}, but US\\$${s1.toFixed(2)} of selling costs will be incurred per unit. At what value per unit should it be included in inventory?`,
    ok: ["US\\$10.50", "Correct: NRV 14.00 - 3.50 = 10.50, which is lower than cost."],
    bad: [["US\\$12.50", "Cost is higher than NRV, so it cannot be used."], ["US\\$14.00", "Selling price is ignored in IAS 2 measurement."], ["US\\$16.00", "Selling costs have been added instead of deducted."]],
    hints: ["NRV = selling price - selling costs."],
    explanation: "NRV = 14.00 - 3.50 = 10.50. This is below cost of 12.50, so inventory is valued at 10.50.",
  });
  const A = [[620, 5.8, 7.4, 0.9], [340, 14.2, 15.5, 2.8], [1100, 2.15, 3.4, 0.4]];
  const totalA = r2(sum(A.map(([u, c, p, s]) => val(u, c, p, s))));
  const costA = r2(sum(A.map(([u, c]) => u * c)));
  chk(totalA, 10279);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A store holds three items. Item 1: 620 units, cost 5.80, selling price 7.40, selling costs 0.90 per unit. Item 2: 340 units, cost 14.20, selling price 15.50, selling costs 2.80. Item 3: 1,100 units, cost 2.15, selling price 3.40, selling costs 0.40. All amounts are in US dollars. What is the total value of inventory under IAS 2?",
    ok: [money(totalA), "Correct: each item at the lower of cost and NRV (item 2 at NRV 12.70)."],
    bad: [[money(costA), "Total cost has been used: the write-down on item 2 was missed."], [money(r2(sum(A.map(([u, , p, s]) => u * (p - s))))), "NRV was used for every item, including those where cost is lower."], [money(r2(sum(A.map(([u, , p]) => u * p)))), "Selling prices have been used."]],
    hints: ["Compute cost and NRV per unit for each item and use the lower."],
    explanation: "Item 1: cost 5.80 (NRV 6.50); item 2: NRV 12.70 (cost 14.20); item 3: cost 2.15 (NRV 3.00). Total = 3,596 + 4,318 + 2,365 = 10,279 (computed by item).",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "What does the going concern assumption mean?",
    ok: ["The business will carry on trading in the foreseeable future", "Correct: assets are not valued as if closure were planned."],
    bad: [["The business will make a profit in every future year", "Going concern concerns survival, not profit."], ["The business has no loans or other debts outstanding", "It does not mean the absence of debt."], ["The business is owned by one person or by one family", "Going concern is unrelated to ownership."]],
    hints: ["What if the directors planned to close the business?"],
    explanation: "Statements are prepared on the basis that the business will continue; otherwise assets would be valued at break-up values.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Inventory with a cost of US\\$9,400 and an NRV of US\\$6,100 is included at cost in the closing inventory. What is the effect on profit and on inventory?",
    ok: ["Profit and inventory are both overstated by US\\$3,300", "Correct: the loss has not been recognised."],
    bad: [["Profit and inventory are both understated by US\\$3,300", "Valuing above NRV overstates them."], ["Profit is overstated but inventory is correct", "Inventory is also overstated."], ["There is no effect because the goods are not yet sold", "IAS 2 requires the loss to be recognised now."]],
    hints: ["Closing inventory is deducted from cost of sales."],
    explanation: "Closing inventory is too high by 3,300, so cost of sales is too low and profit is overstated by the same amount.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A loan of US\\$30,000 is repayable in ten months' time. In the statement of financial position it should be shown as:",
    ok: ["a current liability", "Correct: it is due within twelve months."],
    bad: [["a non-current liability", "It will be paid within twelve months."], ["a deduction from equity", "Loans are not part of equity."], ["a deduction from current assets", "IAS 1 does not allow offsetting of this kind."]],
    hints: ["Look at the time to repayment."],
    explanation: "A liability due within twelve months of the reporting date is current, whatever the original term of the loan.",
  });

  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "If the net realisable value of an item of inventory is higher than its cost, the item is included at net realisable value.", answer: false, explanation: "False. Inventory is never valued above cost; the gain is recognised only when the goods are sold." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "IAS 1 generally does not allow assets and liabilities to be set off against each other in the statement of financial position.", answer: true, explanation: "True. Offsetting is allowed only when a standard permits it." });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each IAS 1 principle to its meaning.",
    pairs: ["Going concern", "Accruals", "Consistency", "Materiality"],
    right: ["The business will continue for the foreseeable future", "Items are recognised when earned or incurred, not when cash moves", "Presentation and classification stay the same from year to year", "Omitting an item could change users' decisions"],
    rightIndex: [0, 1, 2, 3],
    explanation: "Each is a general principle of presentation under IAS 1.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the IAS 2 rule.",
    template: "Inventory is valued at the lower of {{blank:a}} and {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["cost"], choices: ["cost", "selling price"] },
      { id: "b", accepted: ["net realisable value"], choices: ["net realisable value", "replacement cost", "market price"] },
    ],
    explanation: "Cost is compared with net realisable value and the lower figure is used.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the standard that deals with the presentation of financial statements.",
    accepted: ["ias 1", "ias1", "ias 1 presentation of financial statements", "international accounting standard 1"],
    explanation: "IAS 1 sets out the form and content of financial statements.",
  });

  // numerical
  const u2 = 2400, c2 = 3.9, n2 = 3.1;
  const wd = r2(u2 * (c2 - n2));
  chk(wd, 1920);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: wd, calculator: true, wrong: [r2(u2 * c2), r2(u2 * n2)],
    stem: `A company holds ${u2.toLocaleString("en-GB")} units of an item at a cost of US\\$${c2.toFixed(2)} each. The net realisable value is US\\$${n2.toFixed(2)} per unit. Calculate the write-down required under IAS 2.`,
    hints: ["Write-down = (cost - NRV) × units."],
    explanation: "(3.90 - 3.10) × 2,400 = 1,920. Using the total cost gives 9,360.",
  });
  const gpB = 61250, wd2 = 4200;
  const gpA = r2(gpB - wd2);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: gpA, daily: true, calculator: true, wrong: [r2(gpB + wd2), gpB],
    stem: `Gross profit before the IAS 2 adjustment was ${money(gpB)}. A write-down of inventory of ${money(wd2)} is now required. Calculate the gross profit after the write-down.`,
    explanation: "The write-down increases cost of sales, so gross profit is 61,250 - 4,200 = 57,050.",
  });
  const ca = 92300, cl = 61400, reclass = 18500;
  const crB = ratios.current(ca, cl), crA = ratios.current(ca, cl + reclass);
  b.num({
    d: 3, skill: "APPLICATION", kind: "ratio", value: crA, calculator: true, wrong: [crB, ratios.current(ca - reclass, cl)],
    stem: `A draft statement shows current assets of ${money(ca)} and current liabilities of ${money(cl)}. A loan of ${money(reclass)} repayable in nine months was wrongly shown as non-current. Calculate the correct current ratio, as x : 1 to two decimal places.`,
    hints: ["The loan joins the current liabilities."],
    explanation: "Corrected current liabilities = 61,400 + 18,500 = 79,900; ratio = 92,300 ÷ 79,900 = 1.16 : 1. The draft ratio was 1.50 : 1.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why inventory is valued at the lower of cost and net realisable value.",
    points: ["It applies prudence: a loss is recognised as soon as it is foreseen", "It avoids overstating assets and profit by including inventory that will sell for less than its cost"],
    modelAnswer: "Prudence requires foreseeable losses to be recognised at once. Valuing inventory at the lower of cost and NRV prevents assets and profit from being overstated.",
    explanation: "One mark for prudence and one for the effect on assets and profit.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why IAS 1 requires consistency of presentation.",
    points: ["Users can compare the results of one year with those of another", "Changes in presentation could hide poor results or flatter the business", "A change is allowed only if it gives more reliable information, and then the comparatives are restated"],
    modelAnswer: "Consistency lets users compare years. Without it, a change in presentation could hide poor results. A change is permitted only if it improves the information and the comparatives are restated.",
    hints: ["Think about someone comparing this year with last year."],
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "State three items that are included in the cost of inventory and three that are excluded under IAS 2.",
    points: ["Included: purchase price, import duties and transport inwards (any three direct costs)", "Excluded: storage costs (unless essential), administrative overheads, selling costs and abnormal waste (any three)", "The rule: only costs of bringing the inventory to its present location and condition are included"],
    modelAnswer: "Cost includes the purchase price, import duties and transport inwards. It excludes storage costs, administrative overheads and selling costs. Only costs of bringing the goods to their present condition and place are included.",
    hints: ["Which costs bring the goods to the place and condition for sale?"],
    explanation: "One mark each for the included items, the excluded items and the principle.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "The directors of a company wish to set off a loan receivable of US\\$20,000 against a bank overdraft of US\\$20,000 so that neither is shown in the statement of financial position. Evaluate their proposal.",
    points: ["IAS 1 does not allow offsetting unless a standard permits it, so both should be shown gross", "Offsetting would hide the company's borrowing and the receivable, so users cannot judge liquidity or gearing correctly", "Showing both gross may make the ratios look weaker, which may be the reason the directors want to set them off", "Judgement: the proposal should be rejected because the statements must give a fair presentation"],
    modelAnswer: "IAS 1 does not permit the offsetting, so both items should be shown gross. Offsetting would hide the borrowing and mislead users about liquidity and gearing. The proposal should be rejected.",
    hints: ["Which users would be affected?"],
    explanation: "One mark each for the rule, the effect on users, the likely motive and a judgement.",
  });

  // Structured 1 (10 marks)
  const itemsA = [
    { name: "Bricks", u: 2500, c: 3.1, p: 4.4, s: 0.5 },
    { name: "Roof tiles", u: 1200, c: 8.6, p: 9, s: 1.2 },
    { name: "Water pipes", u: 850, c: 12.4, p: 19, s: 2.2 },
  ];
  const vA = itemsA.map((i) => ({ ...i, val: val(i.u, i.c, i.p, i.s), nrv: r2(i.p - i.s), cost: r2(i.u * i.c) }));
  const totVal = sum(vA.map((i) => i.val));
  const totCost = sum(vA.map((i) => i.cost));
  chk(vA[1].nrv, 7.8);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Shurugwi Builders' Supplies Ltd counted the following at 31 December 2025. All amounts are in US dollars per unit.\n\n${table(["Item", "Units", "Cost", "Selling price", "Selling costs"], itemsA.map((i) => [i.name, String(i.u), i.c.toFixed(2), i.p.toFixed(2), i.s.toFixed(2)]), ["l", "r", "r", "r", "r"])}`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: vA[1].nrv, dp: 2, wrong: [9, 8.6], stem: "Calculate the net realisable value per unit of roof tiles (to the nearest cent).", explanation: "9.00 - 1.20 = 7.80." }),
      P.num({ label: "(b)", marks: 3, kind: "money", value: totVal, wrong: [totCost, r2(sum(vA.map((i) => i.u * i.nrv)))], stem: "Calculate the total value of the inventory under IAS 2.", explanation: `Bricks at cost ${fmt(vA[0].val)}; roof tiles at NRV ${fmt(vA[1].val)}; water pipes at cost ${fmt(vA[2].val)}; total ${fmt(totVal)}.` }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: r2(totCost - totVal), wrong: [totCost, r2(totVal - totCost)], stem: "Calculate the amount by which inventory is written down.", explanation: `Cost ${fmt(totCost)} - value ${fmt(totVal)} = ${fmt(r2(totCost - totVal))}.` }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain how the write-down affects the statement of profit or loss and the statement of financial position.", points: ["It increases cost of sales (or reduces closing inventory), so gross profit and profit fall by the amount of the write-down", "Inventory in current assets is shown at the lower value", "Retained earnings, and so equity, are reduced by the same amount"], modelAnswer: "The write-down reduces closing inventory and so increases cost of sales, lowering profit. Inventory in the statement of financial position is lower, and equity is reduced by the same amount.", explanation: "One mark for each statement affected." }),
    ],
    hints: ["Compare cost and NRV for each item separately."],
    explanation: "This item tests the item-by-item valuation of inventory under IAS 2.",
  });

  // Structured 2 (14 marks)
  const d = { ca: 112400, cl: 58900, profit: 61500, obsCost: 7800, obsNrv: 3100, off: 8400, loan: 30000 };
  const wdB = r2(d.obsCost - d.obsNrv);
  const caC = r2(d.ca - wdB + d.off);
  const clC = r2(d.cl + d.off + d.loan);
  const crD = ratios.current(d.ca, d.cl), crC = ratios.current(caC, clC);
  const profC = r2(d.profit - wdB);
  b.struct({
    d: 5, skill: "ANALYSIS", calculator: true,
    stem: `The draft statement of financial position of Chitungwiza Joinery Ltd at 31 December 2025 shows current assets of US\\$${fmt(d.ca)} (including inventory at cost) and current liabilities of US\\$${fmt(d.cl)}. The draft profit for the year is US\\$${fmt(d.profit)}. The auditor finds that:\n\n1. inventory includes obsolete timber which cost US\\$${fmt(d.obsCost)} and can now be sold for a net amount of US\\$${fmt(d.obsNrv)};\n2. a receivable of US\\$${fmt(d.off)} from a customer who is also a supplier was set off against the amount owed to that supplier;\n3. a loan of US\\$${fmt(d.loan)} repayable in ten months was shown as non-current.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: wdB, wrong: [d.obsCost, d.obsNrv], stem: "Calculate the write-down of inventory required by IAS 2.", explanation: `${fmt(d.obsCost)} - ${fmt(d.obsNrv)} = ${fmt(wdB)}.` }),
      P.num({ label: "(b)", marks: 3, kind: "money", value: caC, wrong: [r2(d.ca - wdB), r2(d.ca + d.off)], stem: "Calculate the corrected current assets.", explanation: `${fmt(d.ca)} - write-down ${fmt(wdB)} + receivable shown gross ${fmt(d.off)} = ${fmt(caC)}.` }),
      P.num({ label: "(c)", marks: 3, kind: "money", value: clC, wrong: [r2(d.cl + d.loan), r2(d.cl + d.off)], stem: "Calculate the corrected current liabilities.", explanation: `${fmt(d.cl)} + payable shown gross ${fmt(d.off)} + loan ${fmt(d.loan)} = ${fmt(clC)}.` }),
      P.num({ label: "(d)", marks: 3, kind: "ratio", value: crC, wrong: [crD, ratios.current(caC, d.cl)], stem: "Calculate the corrected current ratio, as x : 1 to two decimal places.", explanation: `${fmt(caC)} ÷ ${fmt(clC)} = ${fmt(r2(crC))} : 1. The draft ratio was ${fmt(r2(crD))} : 1.` }),
      P.manual({ label: "(e)", marks: 3, stem: `Evaluate the effect of the corrections on the profit (draft US\\$${fmt(d.profit)}) and on the liquidity of the company.`, points: [`Profit falls by the write-down of ${fmt(wdB)} to ${fmt(profC)}`, `The current ratio falls from ${fmt(r2(crD))} : 1 to ${fmt(r2(crC))} : 1, a much weaker position, because the loan is now current`, "The company can still cover its current liabilities, but with a smaller margin, so lenders and suppliers will see more risk"], modelAnswer: `Profit falls by ${fmt(wdB)} to ${fmt(profC)}. The current ratio falls from ${fmt(r2(crD))} : 1 to ${fmt(r2(crC))} : 1, so the company is less liquid than the draft suggested, though it can still cover its current liabilities.`, explanation: "One mark for the profit effect, one for the ratio comparison and one for the judgement." }),
    ],
    hints: ["Offsetting makes both sides smaller.", "A loan due within twelve months is current."],
    explanation: "This item applies IAS 1 and IAS 2 to a draft statement.",
  });
  void chk;

  b.card("DEFINITION", "What is **net realisable value**?", "The estimated selling price in the ordinary course of business less the costs of completion and the costs necessary to make the sale.");
  b.card("FACT", "IAS 2 measurement rule", "Inventory is valued at the lower of cost and NRV, item by item (or groups of similar items); never above cost.");
  b.card("FACT", "Cost formulae allowed by IAS 2", "FIFO and weighted average cost (AVCO); specific identification for non-interchangeable items. LIFO is not permitted.");
  b.card("FACT", "A complete set of financial statements (IAS 1)", "Statement of profit or loss and OCI, financial position, changes in equity, cash flows and notes, with comparatives.");
  b.card("DEFINITION", "What is the **going concern** assumption?", "The business will continue in operation for the foreseeable future, so assets are not valued as if it were closing.");
  b.card("FACT", "IAS 1 and offsetting", "Assets and liabilities, and income and expenses, are not offset unless a standard permits it.");
  b.card("FACT", "Current liability under IAS 1", "Due within twelve months of the reporting date (or settled in the normal operating cycle); the part of a long-term loan repayable within a year is current.");
  b.card("CONCEPT", "Effect of an IAS 2 write-down", "Cost of sales rises, gross profit and profit fall, closing inventory and equity fall by the write-down.");
  b.card("DEFINITION", "What is **materiality**?", "An item is material if omitting or misstating it could influence users' decisions.");
});
