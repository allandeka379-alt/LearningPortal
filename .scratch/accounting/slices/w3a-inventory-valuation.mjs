// W3a: valuation of inventory (Cambridge only): lower of cost and net realisable value, effect of errors.
import { concept, P, money, check, sum, r2, statement } from "../lib.mjs";
import { table, U } from "../tables/w3a-lib.mjs";

const f = (v) => v.toLocaleString("en-GB", { maximumFractionDigits: 2, minimumFractionDigits: Number.isInteger(v) ? 0 : 2 });
/** items: [name, units, costPerUnit, sellingPrice, costsToSell]; returns rows and totals (item by item). */
const value = (items) => {
  const rows = items.map(([name, q, c, sp, sc]) => {
    const nrv = r2(sp - sc);
    const lower = Math.min(c, nrv);
    return { name, q, c, nrv, lower, val: r2(q * lower), atCost: r2(q * c), atNrv: r2(q * nrv) };
  });
  return { rows, total: sum(rows.map((x) => x.val)), cost: sum(rows.map((x) => x.atCost)), nrv: sum(rows.map((x) => x.atNrv)) };
};
const itemTable = (v) => table(["Item", "Units", `Cost per unit ${U}`, `NRV per unit ${U}`, `Lower per unit ${U}`, `Value ${U}`], v.rows.map((x) => [x.name, String(x.q), x.c, x.nrv, x.lower, x.val]));

concept("acc.adjustments.inventory-valuation", { file: "adjustments/inventory-valuation", keyPrefix: "adjustments.inventory-valuation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "At what value should closing inventory be shown in the financial statements?",
    options: [
      ["The lower of cost and net realisable value", "Correct: this is the rule in the syllabus."],
      ["The higher of cost and net realisable value", "Valuing above cost anticipates a profit that has not been earned."],
      ["The expected selling price of the goods", "Selling price includes profit that has not yet been realised."],
      ["The replacement cost at the year end", "Replacement cost is not the basis used."],
    ],
    answer: "A",
    explanation: "Inventory is valued at the lower of cost and net realisable value, item by item.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "How is net realisable value calculated?",
    options: [
      ["Estimated selling price less costs to complete and sell", "Correct."],
      ["Purchase price plus carriage inwards", "That is the cost of the inventory."],
      ["Estimated selling price less the original cost", "That is the expected profit on the goods."],
      ["Purchase price less any trade discount received", "That is part of the cost calculation."],
    ],
    answer: "A",
    explanation: "NRV is what the goods will bring in: selling price less repairs, commission and other costs of selling.",
  });
  const m3 = value([["Gas stoves", 50, 40, 46, 9]]);
  check("m3", m3.total, 1850);
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: "A shop has 50 gas stoves that cost US\\$40 each. They can be sold for US\\$46 each, but each needs repairs costing US\\$9 first. At what value should the stoves be included in closing inventory?",
    options: [
      [money(m3.total), "Correct: NRV 46 − 9 = 37 is below cost, so 50 × 37."],
      [money(m3.cost), "This is cost; NRV is lower, so cost cannot be used."],
      [money(50 * 46), "This uses selling price and ignores the repairs."],
      [money(50 * (40 - 9)), "The repair cost is deducted from selling price, not from cost."],
    ],
    answer: "A",
    explanation: `NRV per stove = 46 − 9 = 37, lower than cost 40. Value = 50 × 37 = ${f(m3.total)}.`,
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which accounting concept is applied when inventory is valued at net realisable value because it is lower than cost?",
    options: [
      ["Prudence", "Correct: an expected loss is recognised as soon as it is foreseen."],
      ["Going concern", "Going concern is about the business continuing, not about expected losses."],
      ["Business entity", "Business entity separates the owner from the business."],
      ["Duality", "Duality is about the two aspects of every transaction."],
    ],
    answer: "A",
    explanation: "Prudence: losses are recognised when expected, profits only when realised.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which cost is included in the cost of inventory?",
    options: [
      ["Carriage inwards on the goods", "Correct: it is a cost of bringing the goods to the shop."],
      ["Carriage outwards to customers", "This is a selling cost, an expense in the income statement."],
      ["Commission paid to sales staff", "This is a selling cost; it is deducted when finding NRV."],
      ["Advertising the goods for sale", "Advertising is a running expense, not part of cost."],
    ],
    answer: "A",
    explanation: "Cost covers the purchase price and the costs of bringing the goods to their present location and condition.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Closing inventory at 31 December 2025 was overstated. What is the effect on the statement of profit or loss for 2025?",
    options: [
      ["Cost of sales understated; gross profit overstated", "Correct: closing inventory is deducted in cost of sales."],
      ["Cost of sales overstated; gross profit understated", "This is the effect of an understated closing inventory."],
      ["Cost of sales overstated; gross profit overstated", "Cost of sales and gross profit always move in opposite directions."],
      ["No effect: inventory appears only in the statement of financial position", "Closing inventory is also used in cost of sales."],
    ],
    answer: "A",
    hints: ["Closing inventory is subtracted in the cost of sales calculation."],
    explanation: "A higher closing inventory reduces cost of sales, so gross profit and profit for the year are too high.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Closing inventory at 31 December 2025 was understated by US\\$900 and the error was not corrected. What is the effect on profit for the year ending 31 December 2026?",
    options: [
      [`Overstated by ${money(900)}`, "Correct: the opening inventory for 2026 is too low, so cost of sales is too low."],
      [`Understated by ${money(900)}`, "This is the effect on 2025 profit, not 2026."],
      ["No effect: the error belongs to 2025 only", "Closing inventory for 2025 is the opening inventory for 2026."],
      [`Overstated by ${money(1800)}`, "The error affects 2026 by the same amount, not twice."],
    ],
    answer: "A",
    hints: ["What does the 2025 closing inventory become in 2026?"],
    explanation: "Opening inventory 2026 understated by 900 → cost of sales understated → 2026 profit overstated by 900. Over the two years the error cancels out.",
  });
  const m8 = value([["Item X", 1, 600, 900, 0], ["Item Y", 1, 500, 320, 0]]);
  check("m8", m8.total, 920);
  b.mcq({
    d: 4, skill: "APPLICATION",
    stem: "A trader has two lines of goods at the year end.\n\n" + table(["Line", `Cost ${U}`, `Net realisable value ${U}`], [["Line 1", 600, 900], ["Line 2", 500, 320]]) + "\n\nAt what value should closing inventory be shown?",
    options: [
      [money(m8.total), "Correct: 600 (cost) + 320 (NRV), item by item."],
      [money(Math.min(m8.cost, m8.nrv)), "This compares the totals (1,100 and 1,220); the rule is applied item by item."],
      [money(m8.nrv), "This is total NRV, which includes the unrealised profit on line 1."],
      [money(900 + 500), "This takes the higher figure for each line."],
    ],
    answer: "A",
    hints: ["Take the lower figure for each line, then add."],
    explanation: `Line 1 at cost 600, line 2 at NRV 320: total ${f(m8.total)}. Comparing totals would hide the 180 loss on line 2.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Net realisable value is the same as the selling price of the goods.",
    answer: false,
    explanation: "False. NRV is selling price less the costs still needed to complete and sell the goods.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Goods expected to sell for more than they cost are valued at cost.",
    answer: true,
    explanation: "True. Valuing them above cost would recognise profit before the goods are sold (prudence, realisation).",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each item with its treatment when valuing inventory.",
    pairs: [
      ["Carriage inwards on goods bought", "Added to the cost of inventory"],
      ["Commission to an agent who will sell the goods", "Deducted from selling price to find NRV"],
      ["Goods expected to sell above cost", "Valued at cost"],
      ["Damaged goods expected to sell below cost", "Valued at net realisable value"],
    ],
    explanation: "Costs of getting goods ready are part of cost; selling costs reduce NRV; then take the lower figure.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the statement about an overstated closing inventory.",
    template: "If closing inventory is overstated, cost of sales is {{blank:a}}, gross profit is {{blank:b}} and current assets are {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["understated"], choices: ["overstated", "understated"] },
      { id: "b", accepted: ["overstated"], choices: ["overstated", "understated"] },
      { id: "c", accepted: ["overstated"], choices: ["overstated", "understated"] },
    ],
    explanation: "Closing inventory is deducted in cost of sales, so a figure that is too high makes cost of sales too low and profit and assets too high.",
  });

  const n1 = value([["Electric kettles", 25, 23, 34, 0], ["Steam irons", 12, 19, 21, 4], ["Light bulbs", 36, 3.5, 5, 0]]);
  check("n1", n1.total, 905);
  b.num({
    d: 3, kind: "money", value: n1.total, calculator: true, wrong: [n1.cost],
    stem: "Tatenda's electrical shop in Masvingo has the following inventory at 31 December 2025:\n\n" + table(["Item", "Units", `Cost per unit ${U}`, `Selling price per unit ${U}`, `Selling costs per unit ${U}`], [["Electric kettles", "25", 23, 34, 0], ["Steam irons", "12", 19, 21, 4], ["Light bulbs", "36", 3.5, 5, 0]]) + "\n\nCalculate the value of closing inventory.",
    hints: ["Find the NRV of each item, then take the lower of cost and NRV."],
    explanation: `Kettles at cost 25 × 23 = 575; irons NRV 21 − 4 = 17 < 19, so 12 × 17 = 204; bulbs at cost 36 × 3.50 = 126. Total ${f(n1.total)}. Valuing everything at cost gives ${f(n1.cost)}.`,
  });

  const c1 = { rev: 72500, op: 6800, pur: 49200, rec: 7950, cor: 7350 };
  const c1gp = r2(c1.rev - (c1.op + c1.pur - c1.cor));
  const c1gpWrong = r2(c1.rev - (c1.op + c1.pur - c1.rec));
  check("c1gp", c1gp, 23850);
  b.calc({
    d: 3, kind: "money", value: c1gp, calculator: true, wrong: [c1gpWrong],
    stem: "Sipho's shoe shop recorded closing inventory at 31 December 2025 at cost, US\\$7,950. Some boots in that figure can only be sold below cost, and the correct value at the lower of cost and net realisable value is US\\$7,350. Revenue was US\\$72,500, opening inventory US\\$6,800 and purchases US\\$49,200. Calculate the corrected gross profit.",
    hints: ["Use the corrected closing inventory in cost of sales."],
    explanation: `Cost of sales = 6,800 + 49,200 − 7,350 = ${f(r2(c1.op + c1.pur - c1.cor))}. Gross profit = 72,500 − ${f(r2(c1.op + c1.pur - c1.cor))} = ${f(c1gp)}. Using 7,950 gives ${f(c1gpWrong)}, overstated by 600.`,
  });
  const c2 = { draft: 18240, atCost: 2600, nrv: 1980, omitted: 640 };
  const c2p = r2(c2.draft - (c2.atCost - c2.nrv) + c2.omitted);
  check("c2p", c2p, 18260);
  b.calc({
    d: 4, kind: "money", value: c2p, calculator: true, wrong: [r2(c2.draft - (c2.atCost - c2.nrv)), r2(c2.draft + (c2.atCost - c2.nrv) - c2.omitted)],
    stem: "Rudo's draft profit for the year ended 31 December 2025 was US\\$18,240. When checking closing inventory she found that: (1) goods costing US\\$2,600 had a net realisable value of only US\\$1,980 but were included at cost; (2) goods costing US\\$640 had been left out of the inventory count. Calculate the corrected profit for the year.",
    hints: ["Decide whether each error overstated or understated closing inventory."],
    explanation: `(1) Inventory overstated by 2,600 − 1,980 = 620: profit down 620. (2) Inventory understated by 640: profit up 640. Corrected profit = 18,240 − 620 + 640 = ${f(c2p)}. Ignoring the omitted goods gives 17,620; reversing both directions gives 18,220.`,
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why inventory is not valued at its selling price when the selling price is higher than cost.",
    points: ["Profit is only recognised when the goods are sold (realisation)", "Valuing at selling price would overstate profit and assets / be imprudent"],
    modelAnswer: "The profit on the goods has not yet been earned because they are unsold, so recognising it would break the realisation concept and prudence; it would overstate profit and current assets.",
    explanation: "Realisation and prudence.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 3,
    stem: "Closing inventory at 31 December 2025 was overstated by US\\$1,500 and the error was not found. Explain the effect on profit for 2025 and for 2026.",
    points: ["2025: cost of sales understated, so profit for 2025 overstated by 1,500", "The 2025 closing inventory becomes the 2026 opening inventory, which is overstated", "2026: cost of sales overstated, so profit for 2026 understated by 1,500 (the errors cancel over two years)"],
    modelAnswer: "In 2025 cost of sales is US\\$1,500 too low, so profit is overstated by US\\$1,500. That closing inventory is the opening inventory for 2026, so 2026 cost of sales is US\\$1,500 too high and 2026 profit is understated by US\\$1,500. Total profit over the two years is correct, but each year is wrong.",
    hints: ["Follow the inventory figure into the next year."],
    explanation: "The error reverses in the following year.",
  });

  // Practice structured 1: item-by-item valuation and gross profit
  const s1 = value([["Bags of cement", 120, 9.5, 13, 0], ["Wheelbarrows", 30, 48, 70, 0], ["Damaged water tanks", 14, 95, 110, 22], ["Paint (discontinued colour)", 40, 20, 17, 0]]);
  check("s1", s1.total, 4492);
  const s1d = { rev: 56300, op: 5180, pur: 38750, carr: 420 };
  const s1cos = r2(s1d.op + s1d.pur + s1d.carr - s1.total);
  const s1gp = r2(s1d.rev - s1cos);
  check("s1cos", s1cos, 39858);
  check("s1gp", s1gp, 16442);
  const s1st = statement("Rudo Hardware: statement of profit or loss (extract) for the year ended 31 December 2025", [
    ["Revenue", null, s1d.rev],
    ["Opening inventory", s1d.op, null],
    ["Purchases", s1d.pur, null],
    ["Carriage inwards", s1d.carr, null],
    ["", r2(s1d.op + s1d.pur + s1d.carr), null],
    ["Less: Closing inventory", -s1.total, null],
    ["Cost of sales", null, -s1cos],
    ["Gross profit", null, s1gp],
  ], { checks: [["subtotal", r2(s1d.op + s1d.pur + s1d.carr), 44350], ["cos", s1cos, 39858], ["gp", s1gp, 16442]] });
  b.struct({
    d: 4, examStyle: true, skill: "APPLICATION", calculator: true,
    stem: "Rudo owns a hardware shop in Gweru. Her inventory at 31 December 2025 was:\n\n" + table(["Item", "Units", `Cost per unit ${U}`, `Selling price per unit ${U}`, `Repairs needed per unit ${U}`], [["Bags of cement", "120", 9.5, 13, 0], ["Wheelbarrows", "30", 48, 70, 0], ["Damaged water tanks", "14", 95, 110, 22], ["Paint (discontinued colour)", "40", 20, 17, 0]]) + "\n\nFor the year: revenue US\\$56,300; opening inventory US\\$5,180; purchases US\\$38,750; carriage inwards US\\$420.",
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "money", value: 88, wrong: [110], stem: "Calculate the net realisable value of one damaged water tank.", explanation: "110 − 22 = 88." }),
      P.num({ label: "(b)", marks: 3, kind: "money", value: s1.total, wrong: [s1.cost], stem: "Calculate the value of closing inventory at the lower of cost and net realisable value.", explanation: `Cement 120 × 9.50 = 1,140; wheelbarrows 30 × 48 = 1,440; tanks 14 × 88 = 1,232; paint 40 × 17 = 680. Total ${f(s1.total)} (at cost: ${f(s1.cost)}).` }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: s1cos, wrong: [r2(s1cos + s1.total - s1.cost)], stem: "Calculate the cost of sales.", explanation: `5,180 + 38,750 + 420 − ${f(s1.total)} = ${f(s1cos)}.` }),
      P.manual({ label: "(d)", marks: 3, type: "EXTENDED_RESPONSE", stem: "Prepare the trading section of Rudo's statement of profit or loss for the year ended 31 December 2025.", points: ["Heading with business name and the year ended 31 December 2025", "Opening inventory, purchases and carriage inwards less closing inventory 4,492 (own figure)", "Cost of sales 39,858 and gross profit 16,442 (own figures)"], modelAnswer: s1st, explanation: "Carriage inwards is added to purchases." }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain why the paint is valued at less than cost while the wheelbarrows are not valued at their selling price.", points: ["Paint: NRV 17 is below cost 20, so the expected loss is recognised now (prudence)", "Wheelbarrows: selling price above cost; the profit is not recognised until they are sold, so they stay at cost"], modelAnswer: "The paint will sell for less than it cost, so prudence requires the loss to be recognised now by using NRV. The wheelbarrows will sell at a profit, but profit is only recognised when the sale happens, so they stay at cost.", explanation: "Lower of cost and NRV, item by item." }),
    ],
    hints: ["Work out NRV for every item before taking the lower figure."],
    explanation: `Closing inventory ${f(s1.total)}; cost of sales ${f(s1cos)}; gross profit ${f(s1gp)}.`,
  });

  // Practice structured 2: correcting an overstated valuation and its effects
  const s2 = { draft: 14600, inv: 9350, cartons: 30, cCost: 42, cSp: 35, cDel: 3, dbl: 450 };
  const s2nrv = r2(s2.cSp - s2.cDel);
  const s2over = r2(s2.cartons * (s2.cCost - s2nrv) + s2.dbl);
  const s2inv = r2(s2.inv - s2over);
  const s2p = r2(s2.draft - s2over);
  check("s2nrv", s2nrv, 32);
  check("s2over", s2over, 750);
  check("s2inv", s2inv, 8600);
  check("s2p", s2p, 13850);
  b.struct({
    d: 5, examStyle: true, skill: "ANALYSIS", calculator: true,
    stem: "Chipo owns a grocery wholesale business in Chinhoyi. Her draft profit for the year ended 31 December 2025 was US\\$14,600 and closing inventory was recorded at US\\$9,350. Checking the inventory sheets showed:\n\n1. 30 cartons of cooking oil were included at cost, US\\$42 a carton. Their shelf life is short and they will sell for only US\\$35 a carton, with delivery costing US\\$3 a carton.\n2. Goods costing US\\$450 had been counted twice.",
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "money", value: s2nrv, wrong: [s2.cSp], stem: "Calculate the net realisable value of one carton of cooking oil.", explanation: "35 − 3 = 32." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: s2inv, wrong: [r2(s2.inv - s2.dbl), r2(s2.inv - s2.cartons * (s2.cCost - s2nrv))], stem: "Calculate the corrected closing inventory.", explanation: `Oil overstated by 30 × (42 − 32) = 300; double count 450; total 750. 9,350 − 750 = ${f(s2inv)}.` }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: s2p, wrong: [r2(s2.draft + s2over)], stem: "Calculate the corrected profit for the year.", explanation: `Closing inventory overstated by 750, so cost of sales was 750 too low: 14,600 − 750 = ${f(s2p)}.` }),
      P.mcq({ label: "(d)", stem: "What is the effect of the corrections on Chipo's statement of financial position at 31 December 2025?", options: [[`Current assets and capital both fall by ${money(s2over)}`, "Correct: inventory falls and so does the profit added to capital."], [`Current assets fall by ${money(s2over)}; capital is unchanged`, "Profit is lower, so closing capital is lower too."], [`Capital falls by ${money(s2over)}; current assets are unchanged`, "Inventory is a current asset and has fallen."], [`Current assets and capital both rise by ${money(s2over)}`, "Inventory was overstated, so the correction reduces both."]], answer: "A", explanation: "Both sides fall by 750, so the statement still balances." }),
      P.manual({ label: "(e)", marks: 3, stem: "Chipo says: \"I would rather keep the higher inventory figure because it makes my business look stronger to the bank.\" Evaluate her view.", points: ["Higher figure overstates profit and current assets, so the bank is misled", "It breaks prudence / the lower of cost and NRV rule, and next year's profit would be understated", "Conclusion: she should use the corrected figure (reliable, true and fair information)"], modelAnswer: "Keeping US\\$9,350 would overstate profit and current assets by US\\$750 and give the bank a misleading picture. It breaks prudence and the lower of cost and NRV rule, and the error would reduce next year's profit by the same amount. She should use US\\$8,600, which is reliable.", explanation: "Evaluate both sides and conclude." }),
    ],
    hints: ["Both errors overstated closing inventory."],
    explanation: `Overstatement ${f(s2over)}; corrected inventory ${f(s2inv)}; corrected profit ${f(s2p)}.`,
  });

  b.card("DEFINITION", "Net realisable value (NRV)", "Estimated selling price less the costs to complete and sell the goods.");
  b.card("FACT", "Valuation rule for inventory", "Lower of cost and net realisable value, applied item by item (or group by group).");
  b.card("DEFINITION", "Cost of inventory", "Purchase price plus costs of bringing goods to their present location and condition (e.g. carriage inwards).");
  b.card("CONCEPT", "Why lower of cost and NRV?", "Prudence: expected losses recognised now; profits only when goods are sold (realisation).");
  b.card("FACT", "Closing inventory overstated", "Cost of sales understated; gross profit, profit for the year, current assets and equity overstated.");
  b.card("FACT", "Effect of the error next year", "This year's closing inventory is next year's opening inventory, so next year's profit moves the opposite way.");
  b.card("FACT", "Is carriage outwards part of inventory cost?", "No: it is a selling expense. Carriage inwards is part of cost.");
  b.card("FORMULA", "Cost of sales", "Opening inventory + purchases + carriage inwards − returns outwards − closing inventory.");
});
