// W1b: valuation.inventory
import { concept, P, money, fmt, check, chk, r2, sum, rd, table, inventory } from "../lib.mjs";
import { mc, U } from "../tables/w1b-lib.mjs";

concept("aacc.valuation.inventory", { file: "valuation/inventory", keyPrefix: "valuation.inventory" }, (b) => {
  // --- MCQ
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Under IAS 2, at what amount is inventory measured in the statement of financial position?",
    right: ["The lower of cost and net realisable value", "Correct."],
    wrong: [["The higher of cost and net realisable value", "This would be imprudent: it could carry inventory above what it can earn."], ["Selling price less the expected profit margin", "IAS 2 does not use a margin."], ["Replacement cost at the year-end date", "Replacement cost is not the IAS 2 basis."]],
    explanation: "IAS 2 requires inventory to be measured at the lower of cost and net realisable value, so that it is not overstated.",
  });
  const m2 = { cost: 850, sp: 1100, sc: 180 };
  const m2nrv = m2.sp - m2.sc;
  mc(b, {
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: `A pump in Tendai's shop cost ${money(m2.cost)}. It can be sold for ${money(m2.sp)}, but selling costs of ${money(m2.sc)} will be incurred. At what amount is the pump included in inventory?`,
    right: [money(m2.cost), "Correct: cost 850 is lower than NRV 920."],
    wrong: [[money(m2nrv), "NRV is 920 but cost is lower, so cost is used."], [money(m2.sp), "Selling price is never used to value inventory above cost."], [money(m2.cost - m2.sc), "Selling costs are not deducted from cost."]],
    hints: ["NRV = selling price − selling costs; then take the lower."],
    explanation: "NRV = 1,100 − 180 = 920. Cost 850 is the lower figure.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of the following costs is included in the cost of inventory?",
    right: ["Carriage inwards paid to bring the goods to the shop", "Correct: it is a cost of bringing the goods to their present location."],
    wrong: [["Carriage outwards paid to deliver goods to customers", "Selling and distribution costs are excluded."], ["Rent of the warehouse where finished goods are stored", "Storage costs are expenses of the period."], ["Commission paid to the sales staff", "Selling costs are expenses, not part of cost."]],
    explanation: "Cost includes the purchase price and the costs of bringing goods to their location and condition. Selling, storage and administration costs are excluded.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Compared with AVCO, what does FIFO give when purchase prices are rising?",
    right: ["A higher closing inventory value and a higher profit", "Correct: the closing inventory is at the latest, higher, prices."],
    wrong: [["A lower closing inventory value and a higher profit", "A lower inventory would increase cost of sales and reduce profit."], ["A higher closing inventory value and a lower profit", "Higher closing inventory reduces cost of sales, so profit is higher."], ["The same closing inventory value and the same profit", "The formulas give different values when prices change."]],
    explanation: "FIFO values closing inventory at the most recent costs; with rising prices cost of sales is lower and profit higher.",
  });
  const q5 = { open: { qty: 85, unitCost: 9 }, txs: [{ type: "receipt", qty: 130, unitCost: 10 }, { type: "receipt", qty: 110, unitCost: 11 }, { type: "issue", qty: 200 }] };
  const q5a = inventory.avcoPeriodic(q5.txs, q5.open);
  const q5f = inventory.fifoPeriodic(q5.txs, q5.open);
  check("q5f", q5f.closingValue, 1360);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Nyasha's shop had 85 units at ${money(9)} each at the start of the month. It bought 130 units at ${money(10)} and then 110 units at ${money(11)}. During the month 200 units were sold. Using the **periodic** weighted average cost method, at what amount is the closing inventory valued?`,
    right: [money(q5a.closingValue), "Correct: average cost 3,275 ÷ 325 = 10.0769 per unit × 125 units."],
    wrong: [[money(q5f.closingValue), "This is the FIFO value of the closing inventory."], [money(125 * 10), "This values every closing unit at 10, the price of the middle purchase."], [money(125 * 9), "This values the closing units at the opening unit cost."]],
    hints: ["Weighted average = total cost of goods available ÷ total units available."],
    explanation: "Goods available: 85 × 9 + 130 × 10 + 110 × 11 = 3,275 for 325 units. Average 10.0769; closing 125 units × 10.0769 = 1,259.62.",
  });
  const q6 = { open: { qty: 70, unitCost: 14 }, txs: [{ type: "receipt", qty: 140, unitCost: 15 }, { type: "receipt", qty: 50, unitCost: 17 }, { type: "issue", qty: 160 }] };
  const q6f = inventory.fifoPeriodic(q6.txs, q6.open);
  const q6a = inventory.avcoPeriodic(q6.txs, q6.open);
  check("q6f", q6f.costOfSales, 2330);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A tuck shop started the month with 70 sweets cartons at ${money(14)} each. It bought 140 cartons at ${money(15)} and then 50 cartons at ${money(17)}, and sold 160 cartons. Using **FIFO**, what is the cost of the cartons sold?`,
    right: [money(q6f.costOfSales), "Correct: 70 units at 14 plus 90 units at 15."],
    wrong: [[money(q6a.costOfSales), "This is the weighted average cost of sales."], [money(50 * 17 + 110 * 15), "This takes the latest purchases first, which is not FIFO."], [money(q6f.closingValue), "This is the closing inventory, not the cost of sales."]],
    hints: ["Cost of sales = goods available − closing inventory, or the oldest layers sold first."],
    explanation: "FIFO sells the oldest first: 70 × 14 + 90 × 15 = 2,330. The 100 cartons left are 50 at 15 and 50 at 17 = 1,600. Check: 3,930 − 1,600 = 2,330.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Inventory was counted on 6 January, six days after the year end. What adjustments convert the count value to the year-end value?",
    right: ["Deduct purchases received after the year end and add the cost of goods sold after the year end", "Correct: roll the count back to 31 December."],
    wrong: [["Add purchases received after the year end and deduct the cost of goods sold after the year end", "This rolls the count forward, the wrong direction."], ["Deduct both the purchases and the sales made after the year end", "Sales after the year end reduced inventory, so they must be added back."], ["Add both the purchases and the sales made after the year end", "Purchases after the year end increased inventory, so they must be deducted."]],
    hints: ["Think about what has happened to inventory since 31 December."],
    explanation: "Purchases since the year end increased inventory (deduct); sales since then reduced it (add back at cost).",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Closing inventory at the end of 2025 was overstated by US\\$2,000, and the error was corrected in 2026. What is the effect on the profit for the year?",
    right: ["2025 profit is overstated by US\\$2,000 and 2026 profit is understated by US\\$2,000", "Correct: the error reverses in the following year."],
    wrong: [["2025 profit is understated by US\\$2,000 and 2026 profit is overstated by US\\$2,000", "Overstated closing inventory lowers cost of sales in 2025, raising profit."], ["Both years' profit is overstated by US\\$2,000", "The opening inventory of 2026 is also overstated, which lowers 2026 profit."], ["There is no effect on profit because inventory is an asset", "Closing inventory is deducted in cost of sales, so profit is affected."]],
    hints: ["Closing inventory of one year is the opening inventory of the next."],
    explanation: "Overstated closing inventory reduces 2025 cost of sales. The same figure is the 2026 opening inventory and increases 2026 cost of sales.",
  });

  // --- True / false
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "When valuing inventory, a gain on one item may be used to offset a write-down on another, and only the total is compared with total cost.",
    answer: false,
    hints: ["Is the comparison made item by item or in total?"],
    explanation: "False. IAS 2 requires the comparison item by item (or group by group); gains are not offset.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", 
    stem: "In a perpetual inventory system the cost of each issue can be found at the time the goods are issued.",
    answer: true,
    explanation: "True. The stores record is updated after every transaction, so the cost of each issue is known immediately.",
  });

  // --- Matching
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term to its meaning.",
    pairs: [["Net realisable value", "Selling price less the costs of completing and selling the item"], ["FIFO", "The oldest purchases are assumed to be sold first"], ["Weighted average cost", "Cost of goods available divided by units available"], ["Perpetual system", "The inventory record is updated after every receipt and issue"]],
    explanation: "Each is a core inventory valuation term.",
  });

  // --- Fill in the blank
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements.",
    template: "Net realisable value = selling price − costs of {{blank:a}} and selling. Inventory is valued at the {{blank:b}} of cost and net realisable value.",
    blanks: [
      { id: "a", accepted: ["completion"], choices: ["completion", "purchase", "storage"] },
      { id: "b", accepted: ["lower"], choices: ["lower", "higher", "average"] },
    ],
    explanation: "NRV allows for costs still to be incurred; inventory takes the lower figure on grounds of prudence.",
  });

  // --- Numerical
  const n1 = { cost: 3000, sp: 3450, comp: 600, sell: 250 };
  const n1nrv = n1.sp - n1.comp - n1.sell;
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", calculator: true,
    value: Math.min(n1.cost, n1nrv), wrong: [n1.cost, n1.sp],
    stem: `A wardrobe in Rudo's furniture workshop cost ${money(n1.cost)} to make. It needs ${money(n1.comp)} of further work to finish and can then be sold for ${money(n1.sp)}, less ${money(n1.sell)} of selling costs. At what amount should it be included in inventory?`,
    hints: ["NRV = selling price − further costs − selling costs."],
    explanation: "NRV = 3,450 − 600 − 250 = 2,600, which is lower than cost 3,000, so the wardrobe is valued at 2,600.",
  });
  const f = { open: { qty: 60, unitCost: 40 }, txs: [{ type: "receipt", qty: 100, unitCost: 44 }, { type: "issue", qty: 90 }, { type: "receipt", qty: 80, unitCost: 48 }, { type: "issue", qty: 120 }] };
  const fp = inventory.fifoPerpetual(f.txs, f.open);
  const ap = inventory.avcoPerpetual(f.txs, f.open);
  const apPer = inventory.avcoPeriodic(f.txs, f.open);
  check("fp", fp.costOfIssues, 9200);
  check("ap", ap.closingValue, 1363);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", calculator: true,
    value: fp.costOfIssues, wrong: [ap.costOfIssues, apPer.costOfSales],
    stem: `Sipho's hardware stores record for a paint product shows: 60 litres in inventory at ${money(40)}; 10 June bought 100 litres at ${money(44)}; 15 June sold 90 litres; 22 June bought 80 litres at ${money(48)}; 28 June sold 120 litres. Using FIFO in a perpetual system, calculate the total cost of the litres sold.`,
    hints: ["Issue from the oldest layer first, and update the layers after each issue."],
    explanation: "15 June: 60 × 40 + 30 × 44 = 3,720. After this 70 litres at 44 remain. 28 June: 70 × 44 + 50 × 48 = 5,480. Total 3,720 + 5,480 = 9,200. Closing inventory is 30 litres at 48 = 1,440.",
  });
  b.calc({
    d: 4, skill: "APPLICATION", kind: "money", calculator: true,
    value: ap.closingValue, wrong: [fp.closingValue, apPer.closingValue],
    stem: `Using the data of the previous question, calculate the value of the closing inventory using the **perpetual weighted average cost** method (recalculate the average after each receipt; use exact averages and round the final answer to the nearest dollar).`,
    hints: ["After the first receipt the average is 6,800 ÷ 160.", "The units left after an issue keep that average until the next receipt."],
    explanation: "After 10 June: 160 litres, 6,800, average 42.50; issue 90 = 3,825; 70 litres left, 2,975. After 22 June: 150 litres, 6,815, average 45.4333; issue 120 = 5,452; 30 litres left = 1,363. FIFO would give 1,440; a periodic average would give 1,330.",
  });
  const c = { count: 18900, purch: 2400, sales: 6000, margin: 20 };
  const cCost = chk(c.sales * (1 - c.margin / 100), 4800);
  const cClose = chk(c.count - c.purch + cCost, 21300);
  b.calc({
    d: 4, skill: "APPLICATION", kind: "money", calculator: true,
    value: cClose, wrong: [r2(c.count - c.purch + c.sales / (1 + c.margin / 100)), r2(c.count - c.purch)],
    stem: `Thandeka's year end is 31 December 2025. Inventory was counted on 7 January 2026 and valued at cost at ${money(c.count)}. Between 1 and 7 January goods costing ${money(c.purch)} were received, and goods were sold for ${money(c.sales)}. The shop's gross profit margin is ${c.margin}% of selling price. Calculate the inventory at 31 December 2025.`,
    hints: ["Margin is a percentage of selling price, so cost = 80% of the selling price."],
    explanation: "Cost of goods sold = 6,000 × 80% = 4,800. Inventory at 31 December = 18,900 − 2,400 + 4,800 = 21,300. Treating 20% as a mark-up on cost gives 21,500.",
  });
  // --- Short answer
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the international accounting standard that sets the rules for the valuation of inventory. (Give the standard number.)",
    accepted: ["IAS 2", "IAS2", "International Accounting Standard 2", "IAS No 2", "IAS number 2"],
    explanation: "IAS 2 Inventories requires measurement at the lower of cost and net realisable value.",
  });

  // --- Self-marked
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why inventory is valued at the lower of cost and net realisable value rather than at selling price.",
    points: ["Prudence: profit should not be recognised before the goods are sold", "Selling price would include an unearned profit, overstating inventory and profit", "Where NRV is below cost a loss is recognised immediately in the period it is identified"],
    modelAnswer: "Using selling price would recognise profit before a sale is made, which breaks prudence. Inventory is carried at cost unless its NRV is lower, in which case the expected loss is recognised at once.",
    hints: ["Which accounting concept is involved?"],
    explanation: "Link prudence to both parts of the rule.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** effects on the financial statements of using FIFO rather than AVCO when purchase prices are rising.",
    points: ["Closing inventory is valued at more recent (higher) prices", "So the carrying amount of inventory in the statement of financial position is higher", "Cost of sales is lower because older, cheaper costs are charged", "So profit for the year is higher (and tax or dividends based on it may be higher)"],
    modelAnswer: "Under FIFO the closing inventory is valued at the latest, higher prices, so current assets are higher. Cost of sales uses the older, cheaper costs, so profit for the year is higher than under AVCO.",
    hints: ["Which costs are left in closing inventory under FIFO?"],
    explanation: "Closing inventory and profit are both higher under FIFO in a period of rising prices.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Tatenda says: \"We should use FIFO because it reports a higher profit when prices rise.\" Evaluate his reasoning.",
    points: ["FIFO does give a higher profit when prices rise", "But the higher profit is partly an inventory holding gain, not extra cash, and tax or drawings may increase", "AVCO smooths price changes and is simpler for identical goods", "The method must be applied consistently and chosen to give a fair view, not to increase profit"],
    modelAnswer: "He is correct that FIFO shows a higher profit when prices rise, but the extra profit arises from the older, cheaper costs and does not mean more cash. It may lead to more tax or drawings. The choice should reflect how goods are used and be applied consistently, not be made to raise reported profit.",
    hints: ["Does a higher profit mean more cash?"],
    explanation: "A balanced evaluation accepts the fact but questions the motive.",
  });

  // --- Practice structured 1 (12 marks): lower of cost and NRV
  const it = [["Roofing sheets", 9200, 10500, 800], ["Cement (damaged by water)", 5100, 5400, 1700], ["Nails and fixings", 2750, 3300, 150], ["Paint tins", 4300, 4000, 0]];
  const nrvs = it.map(([n, c, sp, sc]) => sp - sc);
  const vals = it.map(([n, c], i) => Math.min(c, nrvs[i]));
  const totC = sum(it.map((x) => x[1]));
  const totV = sum(vals);
  const wd = r2(totC - totV);
  const draft = 31400;
  b.struct({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: `Chipo's building supplies shop in Chinhoyi has four lines of inventory at the year end. Selling costs are the costs that will be incurred in making the sale.\n\n${table(["Item", `Cost ${U}`, `Selling price ${U}`, `Selling costs ${U}`], it)}\n\nThe draft profit for the year, calculated with all inventory at cost, is ${money(draft)}.`,
    parts: [
      P.group({ label: "(a)", stem: "Calculate the net realisable value of:", parts: it.map(([n], i) => P.num({ label: `(${["i", "ii", "iii", "iv"][i]})`, marks: 1, kind: "money", value: nrvs[i], stem: n, explanation: `${fmt(it[i][2])} − ${fmt(it[i][3])} = ${fmt(nrvs[i])}.` })) }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: totV, wrong: [totC], stem: "Calculate the value of the total inventory at the lower of cost and net realisable value.", explanation: `Item by item: ${vals.map(fmt).join(" + ")} = ${fmt(totV)}.` }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: r2(draft - wd), wrong: [draft], stem: "Calculate the corrected profit for the year.", explanation: `Write-down ${fmt(totC)} − ${fmt(totV)} = ${fmt(wd)}. Corrected profit ${fmt(draft)} − ${fmt(wd)} = ${fmt(r2(draft - wd))}.` }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why the paint tins are not written up to their net realisable value.", points: ["Cost is lower than NRV, so cost is used", "Valuing above cost would recognise a profit before the sale (prudence)"], modelAnswer: "The paint tins cost 4,300 and NRV is 4,000, so NRV is lower and they are written down, not up. More generally, inventory is never carried above cost because profit must not be recognised before the sale.", explanation: "Check the item's own figures before answering." }),
      P.manual({ label: "(e)", marks: 2, stem: "State the effect of the write-down on cost of sales and on current assets.", points: ["Cost of sales increases by the write-down", "Current assets (inventory) decrease by the same amount"], modelAnswer: "Cost of sales increases and inventory in current assets decreases, each by the amount of the write-down.", explanation: "Closing inventory is deducted in cost of sales." }),
    ],
    hints: ["NRV = selling price − selling costs.", "Compare cost and NRV for each item separately."],
    explanation: "This item practises item-by-item valuation and its effect on profit.",
  });
  // check: paint tins: cost 4300, NRV 4000 -> NRV is lower
  check("paint lower", vals[3], 4000);

  // --- Practice structured 2 (14 marks): periodic FIFO vs AVCO
  const p = { open: { qty: 220, unitCost: 8 }, txs: [{ type: "receipt", qty: 320, unitCost: 8.5 }, { type: "receipt", qty: 380, unitCost: 9.2 }, { type: "receipt", qty: 120, unitCost: 10 }, { type: "issue", qty: 880 }], price: 14 };
  const pf = inventory.fifoPeriodic(p.txs, p.open);
  const pa = inventory.avcoPeriodic(p.txs, p.open);
  const rev = 880 * p.price;
  const gpF = r2(rev - pf.costOfSales);
  const gpA = r2(rev - pa.costOfSales);
  check("pf", pf.closingValue, 1568);
  check("pa", pa.closingValue, 1411.69, 0.006);
  check("avail", pf.goodsAvailable, 9176);
  const gDiff = r2(gpF - gpA);
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: `Tatenda sells car batteries from a shop in Bulawayo. During the year the inventory records show:\n\n${table(["Date", "Movement", "Units", `Unit cost ${U}`], [["1 January", "Opening inventory", 220, "8.00"], ["15 March", "Purchase", 320, "8.50"], ["20 June", "Purchase", 380, "9.20"], ["10 October", "Purchase", 120, "10.00"], ["Year", "Sold at US\\$14 each", 880, ""]], ["l", "l", "r", "r"])}\n\nTatenda uses a periodic system. Ignore all expenses other than the cost of goods sold.`,
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "units", value: pf.closingQty, stem: "Calculate the number of batteries in closing inventory.", explanation: "220 + 320 + 380 + 120 − 880 = 160." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: pf.closingValue, wrong: [pa.closingValue], stem: "Calculate the value of closing inventory using FIFO.", explanation: "The 160 batteries left are the latest: 120 × 10.00 + 40 × 9.20 = 1,568." }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: pa.closingValue, wrong: [pf.closingValue], stem: "Calculate the value of closing inventory using weighted average cost (answer to the nearest cent).", explanation: "Total cost 9,176 for 1,040 batteries; average 8.8231; 160 × 8.8231 = 1,411.69." }),
      P.group({ label: "(d)", stem: "Calculate the gross profit using:", parts: [
        P.num({ label: "(i)", marks: 2, kind: "money", value: gpF, wrong: [rev], stem: "FIFO", explanation: `Revenue ${fmt(rev)} − cost of sales (9,176 − 1,568 = 7,608) = ${fmt(gpF)}.` }),
        P.num({ label: "(ii)", marks: 2, kind: "money", value: gpA, wrong: [gpF], stem: "AVCO", explanation: `Revenue ${fmt(rev)} − cost of sales (9,176 − 1,411.69 = 7,764.31) = ${fmt(gpA)}.` }),
      ] }),
      P.manual({ label: "(e)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Tatenda wants to choose one method for future years. Advise him, using the figures above.", points: [`Identifies that FIFO gives the higher gross profit (${fmt(gpF)} against ${fmt(gpA)})`, "Explains why: prices have risen so FIFO charges older, cheaper costs to cost of sales", "Notes that the higher profit does not mean more cash and may increase tax or drawings", "Notes that AVCO smooths price changes and is simple for identical items", "Gives a justified recommendation and states that the method must be applied consistently"], modelAnswer: `FIFO gives the higher gross profit (${fmt(gpF)} against ${fmt(gpA)}) because prices rose during the year, so the older, cheaper batteries are charged to cost of sales. The extra ${fmt(gDiff)} is not extra cash and may increase tax or drawings. AVCO smooths the price changes. Tatenda should choose the method that best reflects the way the batteries are sold (oldest first) and use it consistently.`, explanation: "A balanced recommendation uses a figure and mentions consistency." }),
    ],
    hints: ["Cost of goods available = opening inventory + all purchases.", "Cost of sales = goods available − closing inventory."],
    explanation: "This item compares FIFO and AVCO in a periodic system and asks for a justified recommendation.",
  });

  // --- Flashcards
  b.card("FACT", "IAS 2 measurement rule", "Inventory is valued at the lower of cost and net realisable value, item by item.");
  b.card("FORMULA", "Net realisable value", "Selling price − costs of completion − costs of selling.");
  b.card("FACT", "Costs included in inventory", "Purchase price less trade discount, import duties, carriage inwards and costs of conversion. Not selling, storage or administration costs.");
  b.card("DEFINITION", "FIFO", "First in, first out: the oldest goods are assumed to be sold first, so closing inventory is at the latest prices.");
  b.card("DEFINITION", "AVCO", "Weighted average cost: cost of goods available ÷ units available; in a perpetual system recalculated after each receipt.");
  b.card("CONCEPT", "FIFO against AVCO when prices rise", "FIFO gives a higher closing inventory, lower cost of sales and higher profit.");
  b.card("FORMULA", "Cost of sales (periodic)", "Opening inventory + purchases − closing inventory.");
  b.card("CONCEPT", "Counting after the year end", "Deduct purchases received after the year end and add back the cost of goods sold since.");
  b.card("CONCEPT", "Overstated closing inventory", "Overstates profit this year and understates it next year by the same amount.");
});
