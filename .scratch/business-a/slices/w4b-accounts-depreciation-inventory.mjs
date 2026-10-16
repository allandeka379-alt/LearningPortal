// W4b: accounts.depreciation-inventory
import { concept, P, table, r2, chk, fmt, ZIM, depreciation, inventory } from "../lib.mjs";
import { mc } from "../tables/w4b-lib.mjs";

concept("abus.accounts.depreciation-inventory", { file: "accounts/depreciation-inventory", keyPrefix: "accounts.depreciation-inventory" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which formula gives the annual **straight-line** depreciation charge?",
    ok: ["(Cost − residual value) ÷ useful life", "Correct: the same charge is made each year."],
    bad: [["Cost ÷ residual value", "This is not a depreciation formula."], ["Net book value × depreciation rate", "That is reducing balance, which gives a falling charge."], ["Residual value ÷ useful life", "The cost is missing, so the charge would be far too small."]],
    explanation: "Straight line = (cost − residual value) ÷ useful life in years.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the effect of charging depreciation on a business's cash?",
    ok: ["None, because no cash is paid when depreciation is charged", "Correct: it is a non-cash expense."],
    bad: [["Cash falls by the amount of the charge each year", "Cash was paid when the asset was bought, not when depreciation is charged."], ["Cash rises, because profit falls and tax is paid later", "Lower tax is an indirect effect and does not mean cash rises directly."], ["Cash is held in a special fund for replacing the asset", "Depreciation does not set aside any cash."]],
    explanation: "Depreciation reduces profit and the book value of the asset, but no cash leaves the business when it is charged.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "What does **net realisable value** (NRV) mean?",
    ok: ["Expected selling price less the costs of completing and selling", "Correct: what the inventory could be sold for after costs."],
    bad: [["The price originally paid for the inventory", "That is the cost."], ["The price the business would pay to replace the inventory", "That is the replacement cost."], ["The selling price plus the costs of selling", "Costs of selling are deducted, not added."]],
    explanation: "NRV = estimated selling price − costs of completion and sale. Inventory is valued at the lower of cost and NRV.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS", applies: ZIM,
    stem: "Prices of a fictional firm's purchases have been rising all year. Which stock valuation method gives the **highest** profit?",
    ok: ["FIFO, as the latest and dearest units are left in closing stock", "Correct: a high closing stock lowers cost of sales."],
    bad: [["LIFO, as the latest and dearest units are sold first", "LIFO gives the highest cost of sales and the lowest profit when prices rise."], ["AVCO, as it always gives the highest value", "AVCO lies between FIFO and LIFO."], ["All three give the same profit in the year", "The methods give different profit in a year of price changes."]],
    hints: ["Which method leaves the latest costs in closing stock?"],
    explanation: "With rising prices FIFO values closing stock at the latest, higher prices, lowering cost of sales and raising profit.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "A fictional trader values its closing inventory at US\\$5,000 too high at the year end. What is the effect on the year's profit?",
    ok: ["Profit is overstated by US\\$5,000", "Correct: a higher closing inventory lowers cost of sales."],
    bad: [["Profit is understated by US\\$5,000", "A higher closing inventory raises profit, not lowers it."], ["Profit is unchanged, as inventory is an asset", "Closing inventory is part of the cost of sales calculation."], ["Only the statement of financial position is affected", "Profit is also affected through cost of sales."]],
    hints: ["Cost of sales = opening inventory + purchases − closing inventory."],
    explanation: "Cost of sales falls by 5,000, so gross profit and profit rise by 5,000. The error reverses next year, when the opening inventory is too high.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Under the straight-line method the depreciation charge is different in each year of the asset's life.",
    answer: false,
    explanation: "False. The straight-line charge is the same each year; it is reducing balance that gives a falling charge.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "Over the whole life of a business, FIFO and LIFO give the same total profit, but profit in individual years may differ.",
    answer: true,
    applies: ZIM,
    hints: ["The same goods are bought and sold; only the timing of cost differs."],
    explanation: "True. The same purchases are charged to profit eventually; the methods change only the year in which the cost is recognised.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term to its meaning.",
    pairs: [["Net book value", "Cost less accumulated depreciation"], ["Residual value", "Estimated sale value at the end of the asset's life"], ["Net realisable value", "Expected selling price less costs to complete and sell"], ["Depreciation", "Allocation of an asset's cost over its useful life"]],
    explanation: "Each term has a precise meaning.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "Inventory is valued at the lower of {{blank:a}} and {{blank:b}} realisable value.",
    blanks: [
      { id: "a", accepted: ["cost"], choices: ["cost", "revenue", "profit"] },
      { id: "b", accepted: ["net"], choices: ["net", "gross", "total"] },
    ],
    explanation: "Inventory is valued at the lower of cost and net realisable value.",
  });

  // ---- numerical items
  const sl1 = depreciation.straightLine(62000, 6000, 7);
  chk(sl1, 8000);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: sl1, calculator: true, daily: true, wrong: [62000 / 7, 6000 / 7],
    stem: "A fictional company buys a lorry for US\\$62,000. It expects to use it for 7 years and then sell it for US\\$6,000. Calculate the annual straight-line depreciation charge.",
    hints: ["Deduct the residual value before dividing."],
    explanation: "(62,000 − 6,000) ÷ 7 = US\\$8,000 a year. Ignoring the residual value gives US\\$8,857.14.",
  });
  const nbv2 = 56000 - 3 * depreciation.straightLine(56000, 8000, 6);
  chk(nbv2, 32000);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: nbv2, calculator: true, wrong: [56000 - 8000, 24000],
    stem: "A fictional company buys machinery for US\\$56,000, with an expected life of 6 years and a residual value of US\\$8,000. Using straight-line depreciation, calculate the net book value at the end of year 3.",
    hints: ["Find the annual charge, then multiply by 3."],
    explanation: "Annual charge = (56,000 − 8,000) ÷ 6 = 8,000. Accumulated depreciation after 3 years = 24,000. Net book value = 56,000 − 24,000 = US\\$32,000. The figure of US\\$24,000 is the accumulated depreciation, not the NBV.",
    workedSolution: "1. Annual charge = (56,000 − 8,000) ÷ 6 = 8,000.\n2. Accumulated depreciation = 3 × 8,000 = 24,000.\n3. NBV = 56,000 − 24,000 = 32,000.",
  });
  const rb = depreciation.reducingBalance(40000, 30, 2);
  chk(rb[1].charge, 8400);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: rb[1].charge, calculator: true, applies: ZIM, wrong: [12000, 0.3 * 40000 * 2],
    stem: "A fictional company buys a machine for US\\$40,000 and depreciates it at 30% a year on the reducing balance. Calculate the depreciation charge for year 2.",
    hints: ["Apply 30% to the net book value at the start of year 2."],
    explanation: "Year 1 charge = 30% × 40,000 = 12,000, so the net book value at the start of year 2 is 28,000. Year 2 charge = 30% × 28,000 = US\\$8,400. Applying 30% to the cost again gives 12,000.",
    workedSolution: "1. Year 1 charge = 0.3 × 40,000 = 12,000; NBV = 28,000.\n2. Year 2 charge = 0.3 × 28,000 = 8,400.",
  });
  const txs = [{ type: "receipt", qty: 50, unitCost: 16 }, { type: "receipt", qty: 40, unitCost: 18 }, { type: "issue", qty: 100 }];
  const op = { qty: 30, unitCost: 14 };
  const fifo = inventory.fifoPeriodic(txs, op), lifo = inventory.lifoPeriodic(txs, op), avco = inventory.avcoPeriodic(txs, op);
  chk(fifo.closingValue, 360); chk(lifo.closingValue, 280); chk(avco.average * 20, 323.3333, 0.001);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: fifo.closingValue, calculator: true, applies: ZIM, wrong: [lifo.closingValue, 323.33],
    stem: "A fictional hardware shop opens with 30 units at US\\$14. It buys 50 units at US\\$16 and then 40 units at US\\$18. It sells 100 units, leaving 20 units. Using the FIFO method (periodic), calculate the value of the closing stock.",
    hints: ["Under FIFO, the units left are the most recent purchases."],
    explanation: "Under FIFO the oldest units are sold first, so the 20 units left are from the latest purchase: 20 × 18 = US\\$360. LIFO would give 20 × 14 = US\\$280, and AVCO US\\$323.33.",
    workedSolution: "1. 120 units were available; 100 were sold, so 20 remain.\n2. FIFO: the latest purchase was at 18.\n3. Closing stock = 20 × 18 = 360.",
  });
  const a2 = inventory.avcoPeriodic([{ type: "receipt", qty: 45, unitCost: 15 }, { type: "receipt", qty: 60, unitCost: 17 }, { type: "issue", qty: 90 }], { qty: 25, unitCost: 12 });
  chk(a2.goodsAvailable, 1995); chk(a2.average * 40, 613.846, 0.001);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: a2.average * 40, calculator: true, applies: ZIM, wrong: [60 * 17 - 380, 40 * 17],
    stem: "A fictional tool shop opens with 25 units at US\\$12. It buys 45 units at US\\$15 and then 60 units at US\\$17, and sells 90 units, leaving 40 units. Using the weighted average cost (AVCO, periodic) method, calculate the value of the closing stock, to the nearest cent.",
    hints: ["Total cost of all units ÷ total units gives the average cost."],
    explanation: "Total cost = (25 × 12) + (45 × 15) + (60 × 17) = 300 + 675 + 1,020 = 1,995 for 130 units. Average cost = 1,995 ÷ 130 = 15.3462. Closing stock = 40 × 15.3462 = US\\$613.85. Valuing all 40 units at the latest price (US\\$17) gives US\\$680.",
    workedSolution: "1. Total cost = 300 + 675 + 1,020 = 1,995; units = 130.\n2. Average cost = 1,995 ÷ 130 = 15.3462.\n3. Closing stock = 40 × 15.3462 = 613.85.",
  });
  const nrv = inventory.lowerOfCostAndNrv(7200, 8000, 1100);
  chk(nrv, 6900);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: nrv, calculator: true, wrong: [7200, 8000],
    stem: "A fictional furniture maker holds a cabinet that cost US\\$7,200 to make. Its expected selling price is US\\$8,000, but US\\$1,100 must still be spent on repairs and delivery. At what value should the cabinet be included in closing inventory?",
    hints: ["Find the net realisable value and compare it with the cost."],
    explanation: "NRV = 8,000 − 1,100 = 6,900, which is lower than the cost of 7,200. Inventory is valued at the lower of cost and NRV, so the cabinet is valued at US\\$6,900 (a write-down of US\\$300).",
  });

  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "Name the depreciation method that gives the same charge every year.",
    accepted: ["straight line", "straight-line", "the straight line method", "straight line method"],
    explanation: "The straight-line method.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why a business charges depreciation on its machinery.",
    points: ["The machinery helps to earn revenue over several years", "Depreciation spreads its cost over those years, matching the cost to the revenue", "It prevents profit being overstated and the asset being shown at too high a value"],
    modelAnswer: "The machinery helps to earn revenue over several years, so its cost is spread over those years, matching cost to revenue. This stops profit from being overstated and the machine from being shown at too high a value.",
    hints: ["Think about matching."],
    explanation: "Depreciation matches cost with revenue.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse why valuing inventory can be difficult for a fictional shop that sells fashionable clothing.",
    points: ["Clothes go out of fashion, so their selling price may fall below cost", "The net realisable value has to be estimated and may be wrong", "Items bought at different prices must be valued by a chosen method", "A manager may overvalue inventory to raise profit, so valuation needs a consistent, honest method"],
    modelAnswer: "Clothes go out of fashion, so their selling price may fall below cost, and the net realisable value has to be estimated and may be wrong. Items bought at different prices must be valued by a chosen method, and a manager may be tempted to overvalue the inventory to raise profit.",
    hints: ["What can happen to the selling price of old stock?"],
    explanation: "Difficulties are estimates, price changes and judgement.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "Evaluate whether a business should use straight-line or reducing-balance depreciation for a fleet of delivery vans.",
    points: ["Straight line is simple and gives an equal charge each year", "Reducing balance gives a high charge in early years, when vans lose value fastest", "Reducing balance matches rising repair costs in later years with lower depreciation", "Reducing balance lowers early profit and tax, which may affect investors' view", "The estimates of life and residual value are uncertain with either method", "Judgement and reason, for example reducing balance because vans lose value fastest early on"],
    modelAnswer: "Straight line is simple and charges the same each year, but vans lose value fastest in the early years, so reducing balance matches the fall in value better and puts lower depreciation against the higher repair costs of later years. Reducing balance lowers early profit, which may affect how investors see the company, and both methods depend on uncertain estimates. Reducing balance is the better choice for vans, provided the policy is applied consistently.",
    hints: ["Think about how vans lose value over time."],
    explanation: "Both methods weighed, with a conditional judgement.",
    applies: ZIM,
  });

  // ---- practice structured items
  const sl = depreciation.straightLine(48000, 6000, 5);
  chk(sl, 8400);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Tendai Transport is a fictional company in Mutare. It bought a minibus for US\\$48,000 on 1 January 2025. The expected life is 5 years and the expected residual value is US\\$6,000. The company uses straight-line depreciation.",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: sl, wrong: [48000 / 5, 6000 / 5], stem: "Calculate the annual depreciation charge.", explanation: "(48,000 − 6,000) ÷ 5 = US\\$8,400." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: 48000 - 2 * sl, wrong: [2 * sl, 48000 - sl], stem: "Calculate the net book value at 31 December 2026.", explanation: "Two years of depreciation = 16,800. NBV = 48,000 − 16,800 = US\\$31,200." }),
      P.manual({ label: "(c)", marks: 5, stem: "Explain how the depreciation charge affects (i) the statement of profit or loss, (ii) the statement of financial position and (iii) the company's cash.", points: ["It is an expense in the statement of profit or loss, reducing profit", "Profit before tax falls by US\\$8,400 each year, so tax may be lower", "In the statement of financial position the net book value of the minibus falls by US\\$8,400 each year", "Equity (reserves) is lower by the same after-tax amount", "No cash is paid when depreciation is charged, so cash is not directly affected"], modelAnswer: "Depreciation is an expense in the statement of profit or loss, so profit falls by US\\$8,400 each year and tax may be lower. In the statement of financial position the net book value of the minibus falls by US\\$8,400 a year, and reserves are lower by the reduced profit. No cash is paid when depreciation is charged, so cash is not directly affected.", explanation: "Profit and book value fall; cash is unaffected." }),
    ],
    hints: ["Deduct the residual value first.", "Two years have passed by 31 December 2026."],
    explanation: "Annual charge US\\$8,400; NBV US\\$31,200; depreciation lowers profit and NBV but not cash.",
  });
  const O = { qty: 50, unitCost: 6 }, tx2 = [{ type: "receipt", qty: 80, unitCost: 6.8 }, { type: "receipt", qty: 70, unitCost: 7.5 }, { type: "issue", qty: 160 }];
  const fi = inventory.fifoPeriodic(tx2, O), li = inventory.lifoPeriodic(tx2, O);
  chk(fi.closingValue, 300); chk(li.closingValue, 240); chk(fi.goodsAvailable, 1369); chk(fi.costOfSales, 1069); chk(li.costOfSales, 1129);
  const rev2 = 160 * 14;
  const gpF = rev2 - fi.costOfSales, gpL = rev2 - li.costOfSales;
  chk(gpF, 1171); chk(gpL, 1111);
  const tbl2 = table(["Date", "Transaction", "Litres", "Cost per litre (US\\$)"].map((x) => x.replace("US\\$", "US\\$")), [["1 Jan", "Opening stock", 50, "6.00"], ["Mar", "Purchase", 80, "6.80"], ["Aug", "Purchase", 70, "7.50"], ["Dec", "Sales (at US\\$14.00 a litre)", 160, ""]], ["l", "l", "r", "r"]);
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true, applies: ZIM,
    stem: `Mawere Paints is a fictional shop in Harare. Its stock records for the year are shown. Purchase prices have been rising. The stock is valued by the periodic method.\n\n${tbl2}`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: fi.closingValue, wrong: [li.closingValue, 40 * 6.8], stem: "Calculate the value of the closing stock (40 litres) under FIFO.", explanation: "Under FIFO the 40 litres left are from the latest purchase: 40 × 7.50 = US\\$300." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: li.closingValue, wrong: [fi.closingValue, 40 * 6.8], stem: "Calculate the value of the closing stock under LIFO.", explanation: "Under LIFO the 40 litres left come from the oldest layer: 40 × 6.00 = US\\$240." }),
      P.group({ label: "(c)", stem: "The goods available for sale cost US\\$1,369 and revenue is US\\$2,240. Calculate the gross profit under:", parts: [
        P.num({ label: "(i)", marks: 2, kind: "money", value: gpF, wrong: [gpL, 2240 - 1369], stem: "FIFO;", explanation: "Cost of sales = 1,369 − 300 = 1,069. Gross profit = 2,240 − 1,069 = US\\$1,171." }),
        P.num({ label: "(ii)", marks: 2, kind: "money", value: gpL, wrong: [gpF, 2240 - 1369], stem: "LIFO.", explanation: "Cost of sales = 1,369 − 240 = 1,129. Gross profit = 2,240 − 1,129 = US\\$1,111." }),
      ] }),
      P.manual({ label: "(d)", marks: 6, stem: "Evaluate which method the owner should use to value the stock.", points: [["FIFO gives the higher gross profit (US\\$1,171 against US\\$1,111) and the higher stock value when prices rise", 1], ["Higher profit looks better to a lender but means higher tax", 1], ["LIFO matches the latest costs with sales, so profit is less affected by past low prices", 1], ["The total profit over the life of the business is the same; only the timing differs", 1], ["Whichever method is chosen must be used consistently and disclosed", 1], ["Judgement and reason, for example FIFO because it values stock at recent prices and is widely accepted", 1]], levels: [[3, 5, 6, "Uses the figures for both methods with effects on profit, tax and consistency; a justified choice"], [2, 3, 4, "Explains some effects with some figures; judgement weakly supported"], [1, 1, 2, "States differences with little analysis"]], modelAnswer: "FIFO gives the higher gross profit, US\\$1,171 against US\\$1,111, and a higher stock value when prices rise. Higher profit looks better to a lender but means more tax. LIFO matches the latest costs with sales, so the profit is less affected by earlier low prices. The total profit over the life of the business is the same; only the timing differs. Whichever method is chosen must be used consistently and disclosed. FIFO is the better choice for the owner because it values stock at recent prices and is widely accepted, so long as the owner is ready for the higher tax.", hints: ["Compare profit, tax and consistency."], explanation: "FIFO gives a higher profit when prices rise; the choice affects timing, tax and presentation, not total profit." }),
    ],
    hints: ["Work out which litres remain, then value them at the relevant price."],
    explanation: "FIFO closing stock US\\$300; LIFO US\\$240; gross profit US\\$1,171 and US\\$1,111.",
  });

  b.card("FORMULA", "Straight-line depreciation", "(Cost − residual value) ÷ useful life.");
  b.card("FORMULA", "Reducing-balance depreciation", "Rate % × net book value at the start of the year.", undefined, { applies: ZIM });
  b.card("DEFINITION", "Net book value", "Cost less accumulated depreciation.");
  b.card("DEFINITION", "Net realisable value", "Expected selling price less costs to complete and sell; inventory is valued at the lower of cost and NRV.");
  b.card("CONCEPT", "Depreciation and cash", "Depreciation reduces profit and net book value, but no cash is paid when it is charged.");
  b.card("CONCEPT", "FIFO, LIFO and AVCO when prices rise", "FIFO: highest closing stock and profit. LIFO: lowest. AVCO: in between.", undefined, { applies: ZIM });
  b.card("CONCEPT", "Effect of overvalued closing inventory", "Cost of sales is too low and profit is overstated; the error reverses the next year.");
  b.card("CONCEPT", "Difficulties of valuing inventory", "Estimating NRV, obsolete or damaged goods, goods bought at different prices, and the temptation to overvalue.");
  b.card("CONCEPT", "Choice of method", "Methods change the timing of profit and tax, not total profit; they must be applied consistently.");
});
