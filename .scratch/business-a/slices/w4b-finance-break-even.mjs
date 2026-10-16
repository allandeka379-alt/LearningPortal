// W4b: finance.break-even
import { concept, P, table, r2, chk, fmt, cvp } from "../lib.mjs";
import { mc } from "../tables/w4b-lib.mjs";

concept("abus.finance.break-even", { file: "finance/break-even", keyPrefix: "finance.break-even" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which formula gives the **break-even output** in units?",
    ok: ["Fixed costs ÷ contribution per unit", "Correct: each unit contributes towards the fixed costs."],
    bad: [["Fixed costs ÷ selling price per unit", "This ignores the variable cost of each unit."], ["Variable costs ÷ contribution per unit", "The numerator must be the fixed costs."], ["Total costs ÷ number of units sold", "That gives the average cost per unit."]],
    explanation: "Break-even output = fixed costs ÷ (selling price − variable cost per unit).",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What does the **margin of safety** show?",
    ok: ["How far sales can fall before a loss is finally made", "Correct: the gap between actual and break-even output."],
    bad: [["The profit made at the break-even output", "Profit at break-even is zero."], ["The difference between price and variable cost", "That is the contribution per unit."], ["The total of the fixed costs of the business", "Fixed costs are a separate figure."]],
    explanation: "Margin of safety = actual output − break-even output; it shows how much sales can fall before a loss is made.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "On a break-even chart, where does the **total revenue** line start?",
    ok: ["At the origin, as no sales means no revenue", "Correct: no sales means no revenue."],
    bad: [["At the level of the fixed costs on the vertical axis", "That is where the total cost line starts."], ["At the break-even point on the chart", "The lines meet there; revenue does not start there."], ["At the level of variable costs on the vertical axis", "Variable costs are zero at zero output."]],
    explanation: "Revenue is zero when output is zero, so the line starts at the origin; the total cost line starts at the fixed-cost level.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "A fictional bakery's rent rises, but its prices and variable costs are unchanged. What happens to its break-even output and margin of safety?",
    ok: ["Break-even output rises and the margin of safety falls", "Correct: fixed costs are now higher to cover."],
    bad: [["Break-even output falls and the margin of safety rises", "Higher fixed costs need more units to cover them."], ["Break-even output rises and the margin of safety rises", "A higher break-even point reduces the gap from actual output."], ["Neither changes, because only fixed costs have changed", "Break-even output depends on fixed costs."]],
    hints: ["Break-even output = fixed costs ÷ contribution."],
    explanation: "With the same contribution per unit, more units are needed to cover higher fixed costs, so the break-even point rises and the margin of safety falls.",
  });
  mc(b, {
    d: 3, skill: "EVALUATION",
    stem: "Which is a **limitation** of break-even analysis?",
    ok: ["It assumes all output is sold at the same selling price", "Correct: in practice discounts and unsold stock change revenue."],
    bad: [["It cannot be used to find the profit at a given output", "Profit can be calculated from the contribution."], ["It shows only the past and never the planned output", "It can be used with forecasts."], ["It requires the business to have no fixed costs", "Fixed costs are an essential part of the analysis."]],
    hints: ["Think about what is assumed to be constant."],
    explanation: "Break-even analysis assumes a constant price, constant variable cost per unit, fixed costs that stay fixed and that all output is sold.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A fictional firm's margin of safety is only 4% of its expected output. What is the best comment?",
    ok: ["It is risky, as a small fall in sales causes a loss", "Correct: the margin for error is very small."],
    bad: [["It is very safe, since the margin of safety is positive", "A positive but tiny margin leaves little protection."], ["It means the firm is making a loss at present", "A positive margin of safety means output is above break-even."], ["It means that fixed costs are zero", "Fixed costs are positive if there is a break-even point."]],
    hints: ["How much can sales fall before a loss?"],
    explanation: "A 4% margin of safety means that sales can fall by only 4% before the firm makes a loss, so the plan is risky.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A rise in the selling price, with costs unchanged, lowers the break-even output.",
    answer: true,
    explanation: "True. A higher price raises the contribution per unit, so fewer units are needed to cover the fixed costs.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "Cutting the price always increases a business's profit because more units are sold.",
    answer: false,
    hints: ["Compare the extra sales with the lower contribution per unit."],
    explanation: "False. A price cut lowers the contribution per unit, so profit rises only if the extra sales more than make up for it.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term to its meaning.",
    pairs: [["Contribution per unit", "Selling price less variable cost per unit"], ["Break-even output", "Output at which revenue equals total costs"], ["Margin of safety", "Actual output less break-even output"], ["Fixed costs", "Costs that do not change with output in the short run"]],
    explanation: "Each term has a precise meaning in break-even analysis.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "At the break-even point total {{blank:a}} equals total {{blank:b}}, so the profit is zero.",
    blanks: [
      { id: "a", accepted: ["revenue"], choices: ["revenue", "profit", "contribution"] },
      { id: "b", accepted: ["costs"], choices: ["costs", "price", "output"] },
    ],
    explanation: "Break-even is where total revenue equals total costs.",
  });

  // ---- numerical items
  const n1 = 8.5 - 5.3;
  chk(n1, 3.2, 1e-9);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: n1, calculator: true, wrong: [8.5, 5.3],
    stem: "A fictional shop sells a product for US\\$8.50. Its variable cost is US\\$5.30 per unit. Calculate the contribution per unit.",
    hints: ["Selling price minus variable cost."],
    explanation: "8.50 − 5.30 = US\\$3.20 per unit.",
  });
  const c2 = cvp({ price: 7.5, variable: 4.5, fixed: 24000 });
  chk(c2.breakEvenUnits, 8000, 1e-6);
  b.num({
    d: 3, skill: "APPLICATION", kind: "units", value: c2.breakEvenUnits, calculator: true, daily: true, wrong: [24000 / 7.5, 24000 / 4.5],
    stem: "A fictional factory sells its product for US\\$7.50 a unit. Variable cost is US\\$4.50 a unit and fixed costs are US\\$24,000 a month. Calculate the break-even output in units a month.",
    hints: ["Contribution first, then fixed costs ÷ contribution."],
    explanation: "Contribution = 7.50 − 4.50 = 3.00. Break-even output = 24,000 ÷ 3.00 = 8,000 units. Dividing by the price gives 3,200 units, which is wrong.",
  });
  const c3 = cvp({ price: 12, variable: 7.5, fixed: 36000 });
  chk(c3.profitAt(11000), 13500, 1e-6);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: c3.profitAt(11000), calculator: true, wrong: [11000 * 4.5, 11000 * 12 - 36000],
    stem: "A fictional company sells a product for US\\$12.00. Variable cost is US\\$7.50 a unit and fixed costs are US\\$36,000 a month. Calculate the monthly profit when 11,000 units are sold.",
    hints: ["Output × contribution, then subtract the fixed costs."],
    explanation: "Contribution = 4.50. Total contribution = 11,000 × 4.50 = 49,500. Profit = 49,500 − 36,000 = US\\$13,500. Subtracting fixed costs from revenue (US\\$96,000) gives a wrong answer.",
    workedSolution: "1. Contribution per unit = 12.00 − 7.50 = 4.50.\n2. Total contribution = 11,000 × 4.50 = 49,500.\n3. Profit = 49,500 − 36,000 = 13,500.",
  });
  const c4 = cvp({ price: 14, variable: 9, fixed: 31500 });
  chk(c4.breakEvenUnits, 6300, 1e-6); chk(c4.marginOfSafetyPct(9000), 30, 1e-6);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "pct", value: c4.marginOfSafetyPct(9000), calculator: true, wrong: [r2((2700 / 6300) * 100), r2((9000 - 6300))],
    stem: "A fictional business sells at US\\$14 a unit with variable cost of US\\$9 a unit and fixed costs of US\\$31,500 a month. It expects to sell 9,000 units a month. Calculate the margin of safety as a percentage of expected output, to one decimal place.",
    hints: ["Find the break-even output first."],
    explanation: "Contribution = 5. Break-even output = 31,500 ÷ 5 = 6,300 units. Margin of safety = 9,000 − 6,300 = 2,700 units = 2,700 ÷ 9,000 × 100 = 30.0%. Dividing by the break-even output instead gives 42.9%.",
    workedSolution: "1. Break-even output = 31,500 ÷ 5 = 6,300.\n2. Margin of safety = 9,000 − 6,300 = 2,700 units.\n3. 2,700 ÷ 9,000 × 100 = 30.0%.",
  });
  const c5 = cvp({ price: 6.4, variable: 3.9, fixed: 20000 });
  chk(c5.unitsForProfit(7500), 11000, 1e-6);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "units", value: c5.unitsForProfit(7500), calculator: true, wrong: [c5.breakEvenUnits, 7500 / 2.5],
    stem: "A fictional printing firm sells a product for US\\$6.40 a unit. Variable cost is US\\$3.90 a unit and fixed costs are US\\$20,000 a month. Calculate the output needed to make a monthly profit of US\\$7,500.",
    hints: ["Fixed costs plus the target profit must be covered by the contribution."],
    explanation: "Contribution = 2.50. Output needed = (20,000 + 7,500) ÷ 2.50 = 11,000 units. The break-even output alone is 8,000 units.",
    workedSolution: "1. Contribution per unit = 6.40 − 3.90 = 2.50.\n2. Contribution needed = 20,000 + 7,500 = 27,500.\n3. Output = 27,500 ÷ 2.50 = 11,000 units.",
  });
  const price6 = 4 + 18000 / 4000;
  chk(price6, 8.5, 1e-9);
  b.calc({
    d: 5, skill: "ANALYSIS", kind: "money", value: price6, calculator: true, wrong: [18000 / 4000, 4 + 18000 / 4000 + 1],
    stem: "A fictional company has fixed costs of US\\$18,000 a month and a variable cost of US\\$4.00 a unit. It expects to sell 4,000 units a month. Calculate the lowest selling price per unit at which it will break even.",
    hints: ["At break-even, output × contribution = fixed costs."],
    explanation: "Contribution needed per unit = 18,000 ÷ 4,000 = 4.50. Selling price = 4.50 + 4.00 = US\\$8.50. Using the contribution alone (US\\$4.50) as the price ignores the variable cost.",
    workedSolution: "1. Contribution per unit = 18,000 ÷ 4,000 = 4.50.\n2. Price = 4.50 + 4.00 = 8.50.",
  });

  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "State one limitation of break-even analysis.",
    accepted: ["assumes all output is sold", "assumes constant selling price", "assumes constant variable cost per unit", "based on forecasts", "difficult with many products", "ignores competitors", "fixed costs may change"],
    keywords: { any: ["assume", "constant", "forecast", "estimate", "many products", "competitor", "fixed costs may", "sold"], minAny: 1 },
    explanation: "Accept any assumption: constant price and variable cost, all output sold, fixed costs fixed, reliance on forecasts, difficulty with several products.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain one use of break-even analysis to a new business.",
    points: ["It shows the minimum sales the business must reach to avoid a loss", "This helps the owner to set a realistic sales target", "It can be shown to a bank to support a loan application"],
    modelAnswer: "It shows the minimum sales that a new business must reach to avoid a loss, which helps the owner to set a realistic sales target. The figures can also be shown to a bank to support a loan application.",
    hints: ["What does the owner need to know before starting?"],
    explanation: "Break-even gives a target and supports finance requests.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "A fictional bakery's rent rises by 20% while its prices stay the same. Analyse the effect on the bakery.",
    points: ["Fixed costs rise, so the same contribution per unit must cover a larger sum", "Break-even output rises", "The margin of safety falls, so the bakery is more at risk of a loss", "The bakery may have to raise prices, cut other costs or sell more"],
    modelAnswer: "Fixed costs rise, so the same contribution per unit must cover a larger sum and the break-even output rises. The margin of safety falls, so the bakery is more at risk of a loss, and it may have to raise prices, cut other costs or sell more.",
    hints: ["Think about break-even output and margin of safety."],
    explanation: "Higher fixed costs raise break-even.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "Evaluate how useful break-even analysis is for a small business deciding whether to launch a new product.",
    points: ["It shows how many units must be sold to cover the costs of the product", "It allows the owner to test changes in price and costs", "It shows the margin of safety and so the risk", "It assumes constant price and variable cost and that all output is sold", "It depends on forecasts of demand and costs, which may be wrong for a new product", "Judgement and reason, for example a useful guide that should be tested with cautious assumptions and market research"],
    modelAnswer: "Break-even analysis shows how many units must be sold to cover the costs of the product, allows the owner to test changes in price and costs, and shows the margin of safety and so the risk. But it assumes a constant price and variable cost and that all output is sold, and for a new product the forecasts of demand and costs may be wrong. It is a useful guide if it is tested with cautious assumptions and supported by market research.",
    hints: ["Say what it tells the owner, then what it assumes."],
    explanation: "Uses and limits weighed, with a conditional judgement.",
  });

  // ---- practice structured items
  const T = cvp({ price: 2.4, variable: 1.35, fixed: 2100 });
  chk(T.breakEvenUnits, 2000, 1e-6); chk(T.marginOfSafetyPct(3000), 33.3333, 1e-3);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Nyasha's Tuckshop is a fictional business in Gweru that sells meal packs for US\\$2.40 each. The variable cost of a pack is US\\$1.35 and the fixed costs are US\\$2,100 a month. Nyasha expects to sell 3,000 packs a month.",
    parts: [
      P.num({ label: "(a)", marks: 3, kind: "units", value: T.breakEvenUnits, type: "CALCULATION", wrong: [2100 / 2.4, 2100 / 1.35], stem: "Calculate the break-even output in packs a month.", explanation: "Contribution = 2.40 − 1.35 = 1.05. Break-even output = 2,100 ÷ 1.05 = 2,000 packs.", workedSolution: "1. Contribution per pack = 2.40 − 1.35 = 1.05.\n2. Break-even output = 2,100 ÷ 1.05 = 2,000 packs." }),
      P.num({ label: "(b)", marks: 2, kind: "pct", value: T.marginOfSafetyPct(3000), wrong: [50, r2((3000 - 2000) / 2000 * 100)], stem: "Calculate the margin of safety as a percentage of expected output, to one decimal place.", explanation: "Margin of safety = 3,000 − 2,000 = 1,000 packs. 1,000 ÷ 3,000 × 100 = 33.3%." }),
      P.manual({ label: "(c)", marks: 4, stem: "Explain two ways in which Nyasha could use the break-even figures in running the tuckshop.", points: ["Set a minimum sales target of 2,000 packs a month", "This shows the tuckshop must sell about 67 packs a day to avoid a loss", "Test the effect of a price rise or a cheaper supplier on the break-even point", "Decide whether it is safe to take on a higher rent, knowing the margin of safety is 33.3%"], modelAnswer: "Nyasha can set a minimum sales target of 2,000 packs a month, which is about 67 packs a day, to avoid a loss. She can also test the effect of a price rise or a cheaper supplier on the break-even point, and decide whether it is safe to take on a higher rent, knowing that the margin of safety is 33.3%.", explanation: "Break-even guides targets and decisions." }),
    ],
    hints: ["Contribution first."],
    explanation: "Break-even 2,000 packs; margin of safety 33.3%; used for targets and decisions.",
  });
  const A0 = cvp({ price: 18, variable: 10, fixed: 12000 }), A1 = cvp({ price: 18, variable: 10, fixed: 15000 }), A2 = cvp({ price: 16, variable: 10, fixed: 12000 });
  chk(A0.breakEvenUnits, 1500, 1e-6); chk(A0.profitAt(2000), 4000, 1e-6); chk(A1.breakEvenUnits, 1875, 1e-6); chk(A1.profitAt(2600), 5800, 1e-6); chk(A2.breakEvenUnits, 2000, 1e-6); chk(A2.profitAt(2900), 5400, 1e-6);
  const tbl = table(["", "Current", "Plan A: advertising", "Plan B: price cut"], [["Selling price (US\\$)", "18.00", "18.00", "16.00"], ["Variable cost per unit (US\\$)", "10.00", "10.00", "10.00"], ["Fixed costs per month (US\\$)", 12000, 15000, 12000], ["Expected sales (units a month)", 2000, 2600, 2900]]);
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: `Rumbidzai Pottery is a fictional business in Masvingo. The owner is considering two plans to raise profit. Plan A is a radio advertising campaign, which adds US\\$3,000 to monthly fixed costs. Plan B is a price cut. The expected figures are shown. At present the pottery makes a monthly profit of US\\$4,000.\n\n${tbl}`,
    parts: [
      P.group({ label: "(a)", stem: "Calculate the break-even output in units a month of:", parts: [
        P.num({ label: "(i)", marks: 2, kind: "units", value: A1.breakEvenUnits, wrong: [15000 / 18, 12000 / 8], stem: "Plan A;", explanation: "Contribution = 18 − 10 = 8. Break-even = 15,000 ÷ 8 = 1,875 units." }),
        P.num({ label: "(ii)", marks: 2, kind: "units", value: A2.breakEvenUnits, wrong: [12000 / 16, 12000 / 8], stem: "Plan B.", explanation: "Contribution = 16 − 10 = 6. Break-even = 12,000 ÷ 6 = 2,000 units." }),
      ] }),
      P.group({ label: "(b)", stem: "Calculate the monthly profit at the expected sales of:", parts: [
        P.num({ label: "(i)", marks: 2, kind: "money", value: A1.profitAt(2600), wrong: [2600 * 8, 2600 * 18 - 15000], stem: "Plan A;", explanation: "2,600 × 8 = 20,800; less fixed costs of 15,000 = US\\$5,800." }),
        P.num({ label: "(ii)", marks: 2, kind: "money", value: A2.profitAt(2900), wrong: [2900 * 6, 2900 * 16 - 12000], stem: "Plan B.", explanation: "2,900 × 6 = 17,400; less fixed costs of 12,000 = US\\$5,400." }),
      ] }),
      P.manual({ label: "(c)", marks: 6, stem: "Evaluate which plan the owner should choose.", points: [["Plan A gives the higher profit (US\\$5,800 against US\\$5,400 and US\\$4,000 now)", 1], ["Plan A has the lower break-even output (1,875 against 2,000) and a margin of safety of 725 units, against 900 units for Plan B", 2], ["Plan B has a larger margin of safety (900 units), but its break-even output rises above the current sales of 2,000, so it relies on a big rise in sales", 1], ["Both depend on forecasts of sales that are uncertain; advertising may not work and a price cut may be matched by rivals", 1], ["Judgement and reason, for example Plan A, tested with lower sales figures", 1]], levels: [[3, 5, 6, "Uses profit, break-even and margin of safety for both plans; weighs the risk of the forecasts; a justified choice with a condition"], [2, 3, 4, "Compares some results with some analysis; judgement weakly supported"], [1, 1, 2, "States results with little analysis"]], modelAnswer: "Plan A gives the higher profit, US\\$5,800 against US\\$5,400 for Plan B and US\\$4,000 now, and its break-even output of 1,875 units is lower than Plan B's 2,000. Plan B has the larger margin of safety, 900 units against 725, but a price cut raises the break-even output to 2,000, which is as high as today's sales, so it relies on a large rise in sales. Both depend on uncertain forecasts: advertising may not work and a price cut may be matched by rivals. The owner should choose Plan A, after testing what happens to profit if sales rise by less than forecast.", hints: ["Compare profit, break-even and margin of safety, then the risk in the forecasts."], explanation: "Plan A is better on profit and break-even; both rely on forecasts, so the owner should test lower sales." }),
    ],
    hints: ["Work out the contribution for each plan."],
    explanation: "Plan A: break-even 1,875 units, profit US\\$5,800; Plan B: break-even 2,000 units, profit US\\$5,400. Plan A is preferred, subject to testing the forecast.",
  });

  b.card("DEFINITION", "Break-even output", "The output at which total revenue equals total costs, so profit is zero.");
  b.card("FORMULA", "Contribution per unit", "Selling price − variable cost per unit.");
  b.card("FORMULA", "Break-even output (units)", "Fixed costs ÷ contribution per unit.");
  b.card("FORMULA", "Profit at an output", "Output × contribution per unit − fixed costs.");
  b.card("FORMULA", "Output for a target profit", "(Fixed costs + target profit) ÷ contribution per unit.");
  b.card("FORMULA", "Margin of safety", "Actual output − break-even output (units); ÷ actual output × 100 for a percentage.");
  b.card("CONCEPT", "Reading a break-even chart", "Fixed-cost line horizontal; total cost starts at the fixed-cost level; total revenue starts at the origin; they meet at break-even; loss to the left, profit to the right.");
  b.card("CONCEPT", "Effects of changes", "Higher price or lower variable cost lowers break-even; higher fixed costs raise it. A price cut helps only if extra sales outweigh the lower contribution.");
  b.card("CONCEPT", "Limitations of break-even analysis", "Assumes constant price and variable cost, all output sold and fixed costs fixed; relies on forecasts; hard for many products.");
});
