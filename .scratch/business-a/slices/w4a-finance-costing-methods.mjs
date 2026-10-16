// W4a: finance.costing-methods (both ZIMSEC syllabi and Cambridge AS)
// Conventions: overhead absorption rate = overheads / basis (units or labour hours; always stated); full cost per unit = direct cost + overhead absorbed per unit;
// contribution per unit = price - variable cost; profit = total contribution - fixed costs; special orders need spare capacity and no effect on normal sales.
import { concept, P, costing, table, money, chk, r2, sum } from "../lib.mjs";
import { mc } from "../tables/w4a-lib.mjs";

concept("abus.finance.costing-methods", { file: "finance/costing-methods", keyPrefix: "finance.costing-methods" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "How is **contribution per unit** calculated?",
    ok: ["Price minus variable cost per unit", "Correct: it is what each unit adds towards fixed costs and profit."],
    bad: [["Selling price minus fixed cost per unit", "Fixed costs are not deducted in finding contribution."], ["Total revenue minus total cost", "That is profit."], ["Variable cost minus selling price", "This is the wrong way round and gives a negative figure."]],
    explanation: "Contribution per unit = selling price - variable cost per unit.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "In **full costing**, overheads are",
    ok: ["shared among the products on a stated basis", "Correct: for example by units made or by labour hours."],
    bad: [["ignored when costs are calculated", "Ignoring overheads is a feature of contribution costing."], ["charged only to the most profitable product", "Overheads are shared, not given to one product."], ["treated as income of the business", "Overheads are costs, not income."]],
    explanation: "Full (absorption) costing absorbs overheads into products using a basis such as units or labour hours.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is a **limitation** of full costing?",
    ok: ["Choice of basis for overheads is arbitrary", "Correct: a different basis gives a different cost for each product."],
    bad: [["It leaves out all of the direct costs", "Full costing includes direct costs."], ["It cannot be used when setting any prices", "Full costing is widely used for pricing."], ["It shows only the variable costs of products", "It includes fixed costs through overheads."]],
    hints: ["Think about how overheads are shared."],
    explanation: "Overheads can be shared on different bases, so the cost and profit of each product depend on the choice.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Which condition is necessary for a business to accept a **special order** priced below full cost?",
    ok: ["Price above variable cost with spare capacity", "Correct: the order then adds to profit without displacing other work."],
    bad: [["The price is above the fixed cost per unit made", "Fixed cost per unit is not the test for a one-off order."], ["The order is from a completely new customer abroad", "Where the customer comes from does not make the order profitable."], ["The business has no overheads at all to pay", "Overheads exist in most businesses and do not decide this."]],
    hints: ["Think about which costs change if the order is accepted."],
    explanation: "A special order adds to profit if its price exceeds variable cost, there is spare capacity and normal sales and prices are not harmed.",
  });
  const rate = 3600 / 900;
  chk(rate, 4);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A fictional uniform maker in Chinhoyi has overheads of US\\$3,600 a month. It makes 600 shirts and 300 pairs of trousers. Overheads are absorbed on the basis of units made. What is the overhead absorbed by each shirt?",
    ok: [money(rate), "Correct: 3,600 ÷ 900 units."],
    bad: [[money(6), "That divides by 600 shirts only, ignoring the trousers."], [money(12), "That divides by 300 trousers only."], [money(2400), "That is the total overhead absorbed by all the shirts, not by one shirt."]],
    hints: ["Divide the overheads by the total number of units."],
    explanation: "Rate = 3,600 ÷ (600 + 300) = US\\$4 a unit, so each shirt absorbs US\\$4. All 600 shirts absorb US\\$2,400.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional furniture maker sells a chair for US\\$48. Variable cost is US\\$31 and monthly fixed costs are US\\$5,100. It sells 400 chairs. What is its profit for the month?",
    ok: [money(1700), "Correct: contribution of 17 × 400 = 6,800, less fixed costs of 5,100."],
    bad: [[money(6800), "That is total contribution; the fixed costs have not been deducted."], [money(5100), "That is the fixed costs, not the profit."], [money(17), "That is the contribution per chair, not the profit."]],
    hints: ["Profit = total contribution - fixed costs."],
    explanation: "Contribution per chair = 48 - 31 = 17. Total contribution = 17 × 400 = 6,800. Profit = 6,800 - 5,100 = US\\$1,700.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A fictional bakery's pies show a loss under full costing, but each pie has a positive contribution. What is the likely effect of **dropping** pies if fixed costs cannot be saved?",
    ok: ["Profit would fall by the pies' contribution", "Correct: the fixed costs would remain but the contribution would be lost."],
    bad: [["Total profit would rise by the full loss shown", "The loss is partly due to absorbed overheads that would not disappear."], ["Fixed costs would fall automatically", "Fixed costs remain unless they are actually cut."], ["Total profit would not change", "Losing a positive contribution reduces profit."]],
    hints: ["What happens to the fixed costs and to the contribution?"],
    explanation: "If the fixed costs stay, dropping a product with positive contribution reduces total profit by that contribution.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A fictional manufacturer in Bulawayo accepts a special order at a price above variable cost. Which is the **greatest risk** of this decision?",
    ok: ["Regular customers may demand the same low price", "Correct: normal sales could be harmed and prices pushed down."],
    bad: [["Variable costs will become fixed", "Variable costs do not change type by accepting an order."], ["Contribution will become negative automatically", "The order has a positive contribution by assumption."], ["The business will have more overheads", "The order does not change the fixed overheads."]],
    hints: ["Who else might hear about the low price?"],
    explanation: "A low price to one customer may lead regular customers to ask for the same, so the business could lose more than the order adds.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term to its meaning.",
    pairs: [["Full costing", "Charging direct costs and a share of overheads to each product"], ["Contribution costing", "Looking at price minus variable cost for each product"], ["Overhead absorption", "Charging overheads to products on a stated basis"], ["Mark-up", "A percentage added to cost to find the selling price"]],
    explanation: "Each term is used in costing and pricing.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "Selling price minus variable cost is the {{blank:a}}. Total contribution minus fixed costs gives the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["contribution"], choices: ["contribution", "mark-up", "overhead"] },
      { id: "b", accepted: ["profit"], choices: ["profit", "revenue", "capacity"] },
    ],
    explanation: "Price minus variable cost is contribution; total contribution less fixed costs is profit.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "State **one** use of contribution costing.",
    accepted: ["special order decisions", "deciding on special orders", "deciding whether to accept an order", "deciding whether to drop a product", "deciding whether to keep a product", "short-term decisions", "break-even analysis", "pricing a one-off order", "choosing between products", "budgeting"],
    explanation: "Accept: special orders, keeping or dropping a product, short-term pricing, choosing between products, break-even or budgeting.",
  });

  const full = r2(0.9 + 3.6 / 1);
  const rateH = r2(3600 / 300);
  chk(rateH, 12);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: rateH, calculator: true, wrong: [1.5, 3600],
    stem: "A fictional candle maker in Gweru has overheads of US\\$3,600 a month. Making small candles uses 120 labour hours and large candles 180 labour hours. Overheads are absorbed on labour hours. Calculate the overhead absorption rate per labour hour.",
    hints: ["Divide the overheads by the total labour hours."],
    explanation: "Total labour hours = 120 + 180 = 300. Rate = 3,600 ÷ 300 = US\\$12 an hour.",
  });
  const fullPer = r2(0.8 + 1440 / 3000);
  chk(fullPer, 1.28);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: fullPer, calculator: true, wrong: [0.8, 0.48],
    stem: "In the candle workshop, small candles have a direct cost of US\\$0.80 each. They absorb US\\$1,440 of overheads and 3,000 small candles are made in the month. Calculate the full cost of one small candle.",
    hints: ["Overhead per candle + direct cost."],
    explanation: "Overhead per candle = 1,440 ÷ 3,000 = US\\$0.48. Full cost = 0.80 + 0.48 = US\\$1.28.",
  });
  const ext = r2(200 * (7 - 5));
  chk(ext, 400);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: ext, calculator: true, wrong: [600, 1800],
    stem: "A fictional uniform maker has spare capacity. A school asks for 200 extra shirts at US\\$7.00 each. The variable cost of a shirt is US\\$5.00. The extra shirts will not affect normal sales and no new fixed costs arise. Calculate the extra profit from the order.",
    hints: ["Extra profit = units × (price - variable cost)."],
    explanation: "Contribution per shirt = 7 - 5 = US\\$2. Extra profit = 200 × 2 = US\\$400. The full cost of a shirt (US\\$9) would suggest a loss of US\\$2 a shirt, but it is the variable cost that is relevant.",
    workedSolution: "1. Contribution per shirt = 7.00 - 5.00 = US\\$2.00.\n2. Extra profit = 200 × 2.00 = US\\$400.",
  });
  const markUp = r2(1.25 * 1.2);
  chk(markUp, 1.5);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: markUp, calculator: true, daily: true, wrong: [0.25, 1.45],
    stem: "A fictional candle maker finds that the full cost of a small candle is US\\$1.25. It adds a 20% mark-up. Calculate the selling price.",
    hints: ["Cost × 1.20."],
    explanation: "Mark-up = 20% × 1.25 = US\\$0.25. Selling price = 1.25 + 0.25 = US\\$1.50.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain the difference between contribution and profit.",
    points: ["Contribution is selling price minus variable cost", "Profit is total contribution minus fixed costs", "Contribution towards fixed costs may be positive even when profit is a loss"],
    modelAnswer: "Contribution is the selling price minus variable cost. Profit is total contribution minus fixed costs, so contribution can be positive even when the business makes a loss.",
    hints: ["Which costs are deducted in each?"],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional printer in Masvingo is considering absorbing overheads on machine hours rather than on units. Explain two reasons why the basis matters.",
    points: ["Different bases share the overheads differently between products", "Application: a poster using few machine hours would absorb less under machine hours than under units", "The cost and profit of each product change with the basis", "Application: a product may seem unprofitable under one basis and profitable under another, affecting pricing"],
    modelAnswer: "Different bases share the overheads differently between products, so a poster that uses few machine hours would absorb less under machine hours than under units. The cost and profit of each product therefore change with the basis, and a product may seem unprofitable under one basis and profitable under another, which affects pricing.",
    hints: ["Think about what each basis charges to a product."],
    explanation: "Two reasons, each applied.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse why full costing can lead a business to reject a worthwhile special order.",
    points: ["Full cost includes an absorbed share of fixed overheads", "The fixed overheads are paid whether or not the order is accepted", "An order priced above variable cost but below full cost looks like a loss", "Rejecting it loses the contribution it would have made"],
    modelAnswer: "Full cost includes an absorbed share of fixed overheads, but these are paid whether or not the order is accepted. An order priced above variable cost but below full cost therefore looks like a loss, so rejecting it loses the contribution it would have made.",
    hints: ["Which costs change if the order is accepted?"],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A fictional bakery in Harare is deciding whether to price its bread using full costing or contribution costing. Assess which is more useful.",
    points: ["Full costing ensures that prices cover all costs including overheads in the long run", "Contribution costing is better for short-term decisions such as special orders", "Full costing depends on a forecast of output and an arbitrary basis", "Pricing every sale at contribution would leave fixed costs uncovered", "Counter-argument: with spare capacity, a lower price may fill ovens that would be idle", "Judgement with a reason, for example use full costing for regular prices and contribution costing for one-off orders"],
    modelAnswer: "Full costing ensures that regular prices cover all costs, including overheads, in the long run, but it depends on a forecast of output and an arbitrary basis. Contribution costing is better for short-term decisions such as special orders, and with spare capacity a lower price may fill ovens that would otherwise be idle. However, pricing every sale at contribution would leave fixed costs uncovered. The bakery should use full costing for regular prices and contribution costing for one-off orders.",
    hints: ["Say which method suits which kind of decision."],
    explanation: "One point per mark; the judgement needs a reason.",
  });

  // Practice structured 1 (9 marks)
  const oh = 3600, hS = 120, hL = 180, unitsS = 3000, unitsL = 900;
  const rateHr = oh / (hS + hL);
  const absL = rateHr * hL, absS = rateHr * hS;
  const fullL = r2(4.4 + absL / unitsL);
  chk(rateHr, 12); chk(absL, 2160); chk(absS, 1440); chk(fullL, 6.8);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A fictional candle maker in Gweru makes ${unitsS} small candles and ${unitsL} large candles a month. Overheads are ${money(oh)} a month and are absorbed on labour hours: small candles use ${hS} hours and large candles ${hL} hours. The direct cost of a large candle is ${money(4.4)}.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: absL, wrong: [oh, 1440], stem: "Calculate the overheads absorbed by the large candles.", explanation: "Rate = 3,600 ÷ 300 hours = US\\$12 an hour. Large candles: 180 × 12 = US\\$2,160." }),
      P.num({ label: "(b)", marks: 3, kind: "money", type: "CALCULATION", value: fullL, wrong: [4.4, 2.4], stem: "Calculate the full cost of one large candle.", explanation: "Overhead per candle = 2,160 ÷ 900 = US\\$2.40. Full cost = 4.40 + 2.40 = US\\$6.80.", workedSolution: "1. Overheads absorbed by large candles = 180 × 12 = 2,160.\n2. Overhead per large candle = 2,160 ÷ 900 = 2.40.\n3. Full cost = 4.40 + 2.40 = US\\$6.80." }),
      P.manual({ label: "(c)", marks: 4, stem: "Explain one limitation of absorbing overheads on labour hours for this workshop.", points: ["Overheads such as rent do not rise with labour hours", "Application: the large candles absorb 60% of the overheads because they use more hours", "A different basis such as units would charge the large candles much less", "So the full cost and apparent profit of each candle depend on the basis chosen"], modelAnswer: "Overheads such as rent do not rise with labour hours, yet the large candles absorb 60% of the overheads because they use more hours. A different basis such as units would charge the large candles much less, so the full cost and apparent profit of each candle depend on the basis chosen.", explanation: "A limitation with a development." }),
    ],
    hints: ["Rate per hour = overheads ÷ total hours.", "Full cost = direct cost + overhead per unit."],
    explanation: "Rate US\\$12 an hour; large candles absorb US\\$2,160; full cost US\\$6.80; the basis is a limitation.",
  });

  // Practice structured 2 (14 marks)
  const prod = [["Posters", 7000, 1.1, 0.65], ["Brochures", 2200, 3.1, 1.95], ["Calendars", 800, 4.8, 4.3]];
  const fixedP = 5600;
  const cont = prod.map((p) => r2(p[1] * (p[2] - p[3])));
  const totC = sum(cont), prof = r2(totC - fixedP);
  chk(cont[0], 3150); chk(cont[1], 2530); chk(cont[2], 400); chk(totC, 6080); chk(prof, 480);
  const tbl = table(["Product", "Units sold", "Price (US\\$)", "Variable cost (US\\$)"], prod.map((p) => [p[0], String(p[1]), p[2].toFixed(2), p[3].toFixed(2)]), ["l", "r", "r", "r"]);
  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `A fictional printing press in Bulawayo sells three products. Monthly fixed costs are ${money(fixedP)}.\n\n${tbl}`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: 1.15, wrong: [3.1, 1.95], stem: "Calculate the contribution per brochure.", explanation: "3.10 - 1.95 = US\\$1.15." }),
      P.num({ label: "(b)", marks: 3, kind: "money", type: "CALCULATION", value: totC, wrong: [prof, 14000], stem: "Calculate the total contribution of the three products.", explanation: "Posters 7,000 × 0.45 = 3,150; brochures 2,200 × 1.15 = 2,530; calendars 800 × 0.50 = 400. Total = US\\$6,080.", workedSolution: "1. Posters: 7,000 × (1.10 - 0.65) = 3,150.\n2. Brochures: 2,200 × (3.10 - 1.95) = 2,530.\n3. Calendars: 800 × (4.80 - 4.30) = 400.\n4. Total = US\\$6,080." }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: prof, wrong: [totC, 400], stem: "Calculate the monthly profit.", explanation: "6,080 - 5,600 = US\\$480." }),
      P.manual({ label: "(d)", marks: 7, stem: "Evaluate whether the press should stop selling calendars.", points: ["Calendars give a contribution of only US\\$400 (US\\$0.50 each), a small margin", "If calendars are dropped and fixed costs stay, profit falls from US\\$480 to US\\$80", "Dropping calendars would be worthwhile only if fixed costs could be cut or the press time used more profitably", "A small rise in price or fall in variable cost would improve the margin", "Calendars may bring customers who buy other products", "Counter-argument: they take press time and a risk of unsold stock", "Judgement with a reason: keep them unless the time can earn more, and try to raise the price"], levels: [[3, 5, 7, "Contribution and profit used; effect of dropping and fixed costs weighed; a justified judgement"], [2, 3, 4, "Some use of figures and some weighing; judgement weakly supported"], [1, 1, 2, "General statements about dropping products"]], modelAnswer: "Calendars give a contribution of only US\\$400, but if they are dropped and fixed costs stay the same, profit falls from US\\$480 to US\\$80. Dropping them is worthwhile only if fixed costs could be cut or the press time could earn more elsewhere. A small rise in price would improve the margin, and calendars may bring customers who buy other products. The press should keep them unless the time can earn more, and try to raise the price.", hints: ["Work out the profit without calendars if fixed costs stay the same."], explanation: "Weighs the lost contribution against the benefits of dropping." }),
    ],
    hints: ["Contribution per unit × units sold.", "Profit = total contribution - fixed costs."],
    explanation: "Total contribution US\\$6,080; profit US\\$480; dropping calendars would cut profit to US\\$80.",
  });

  // Practice structured 3 (15 marks)
  const cap = 6000, made = 4200, spare = cap - made, orderKg = 1500, orderPrice = 2.8, vcKg = 2.1, fixedM = 3360;
  const fullKg = r2(vcKg + fixedM / made);
  const extraProfit = r2(orderKg * (orderPrice - vcKg));
  chk(spare, 1800); chk(extraProfit, 1050); chk(fullKg, 2.9);
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: `A fictional mushroom grower near Mutare can produce ${cap.toLocaleString("en-GB")} kg a month but now produces ${made.toLocaleString("en-GB")} kg, which she sells to local markets at ${money(4)} a kg. Fixed costs are ${money(fixedM)} a month and variable costs are ${money(vcKg)} a kg. A supermarket chain offers to buy ${orderKg.toLocaleString("en-GB")} kg a month at ${money(orderPrice)} a kg. The local markets do not know the supermarket's price, but some traders also sell to the supermarket's customers.`,
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Define the term 'contribution'.", points: ["Selling price minus variable cost", "Per unit of output", "The amount each unit adds towards fixed costs and profit"], modelAnswer: "Contribution is the selling price minus variable cost per unit. It is the amount each unit adds towards fixed costs and profit.", explanation: "One point per mark." }),
      P.num({ label: "(b)", marks: 4, kind: "money", type: "CALCULATION", value: extraProfit, wrong: [r2(orderKg * orderPrice), 3150], stem: "Calculate the extra profit from the supermarket order.", explanation: "Contribution per kg = 2.80 - 2.10 = US\\$0.70. Extra profit = 1,500 × 0.70 = US\\$1,050.", workedSolution: "1. Contribution per kg = 2.80 - 2.10 = 0.70.\n2. Spare capacity = 6,000 - 4,200 = 1,800 kg, enough for the order of 1,500 kg.\n3. Extra profit = 1,500 × 0.70 = US\\$1,050." }),
      P.manual({ label: "(c)", marks: 8, stem: "Evaluate whether she should accept the order.", points: [["The price of US\\$2.80 is below the full cost of US\\$2.90 a kg (2.10 + 3,360 ÷ 4,200), so full costing would reject it", 2], ["The contribution is US\\$0.70 a kg, so the order adds US\\$1,050 to profit because the fixed costs are already covered", 2], ["There is spare capacity of 1,800 kg, so the order needs no new fixed costs", 1], ["Local traders who also sell to the supermarket's customers may learn of the lower price and demand it, harming normal sales at US\\$4", 2], ["Judgement with a reason: accept if the order is kept separate and normal sales are unlikely to be affected; otherwise reject", 1]], levels: [[3, 6, 8, "Full and marginal cost used with the case; the risk to normal sales weighed; a justified judgement"], [2, 3, 5, "Some use of costs with some weighing; judgement weakly supported"], [1, 1, 2, "General statements about special orders"]], modelAnswer: "The price of US\\$2.80 is below the full cost of US\\$2.90 a kg, so full costing would reject it. But the contribution is US\\$0.70 a kg, so the order adds US\\$1,050 to profit, because the fixed costs are already covered and there is spare capacity of 1,800 kg. The risk is that local traders who also sell to the supermarket's customers may learn of the lower price and ask for it, which would harm normal sales at US\\$4. The grower should accept if the order can be kept separate and normal sales are unlikely to be affected; otherwise she should refuse.", hints: ["Compare the price with full cost and with variable cost, then check the conditions."], explanation: "Marginal cost supports the order; the risk is to normal sales." }),
    ],
    hints: ["Use the variable cost for the special order decision.", "Check the spare capacity."],
    explanation: "Contribution defined; extra profit US\\$1,050; the decision depends on protecting normal sales.",
  });

  b.card("DEFINITION", "Full (absorption) costing", "Charging all costs to products: direct costs plus a share of overheads absorbed on a stated basis (units or labour hours).");
  b.card("FORMULA", "Overhead absorption rate", "Overhead absorption rate = total overheads ÷ total units (or labour hours). Overhead absorbed = rate × the product's units (or hours).");
  b.card("FORMULA", "Full cost per unit", "Full cost per unit = direct cost per unit + overhead absorbed per unit. Price with mark-up = cost × (1 + mark-up %).");
  b.card("DEFINITION", "Contribution", "Selling price per unit minus variable cost per unit; the amount each unit adds towards fixed costs and profit.");
  b.card("FORMULA", "Profit from contribution", "Profit = total contribution - fixed costs. Total contribution = contribution per unit × units sold.");
  b.card("FACT", "Limitations of full costing", "The basis for absorbing overheads is arbitrary; overheads are fixed; it can reject worthwhile orders; relies on forecast output.");
  b.card("FACT", "Uses of contribution costing", "Special orders, keeping or dropping a product, short-term pricing, choosing between products, break-even and budgeting.");
  b.card("CONCEPT", "Conditions for a special order", "Price above variable cost, spare capacity, no loss of normal sales, no extra fixed costs and no pressure on regular prices.");
  b.card("CONCEPT", "Full or contribution costing?", "Full costing for regular prices and long-run cost recovery; contribution costing for short-term decisions where fixed costs are already committed.");
});
