// W4a: cost.behaviour
import { concept, P, table, chk, r2, costing } from "../lib.mjs";
import { mc, F, usd, p1, p2 } from "../tables/w4a-lib.mjs";

concept("aacc.cost.behaviour", { file: "cost/behaviour", keyPrefix: "cost.behaviour" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which cost is most likely to be fixed within the relevant range for a tuck shop?",
    ok: ["The annual insurance premium", "Correct: the premium is the same however many items are sold."],
    bad: [["The cost of bread bought for resale", "Purchases rise with sales: variable."], ["Commission paid to sellers on each sale", "Commission changes in proportion to sales: variable."], ["Plastic bags used for each customer", "Bags used rise with customers: variable."]],
    explanation: "A fixed cost does not change in total when activity changes within the relevant range. Insurance is the same whatever the sales.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What happens to fixed cost per unit when output increases within the relevant range?",
    ok: ["It falls, because the same total is shared among more units", "Correct: total fixed cost is constant."],
    bad: [["It rises, because more units need more space", "Within the relevant range the total does not change."], ["It stays the same, because a fixed cost is fixed", "The total is fixed; the amount per unit is not."], ["It rises in proportion to output", "That describes a variable cost in total, not a fixed cost per unit."]],
    explanation: "Total fixed cost / more units = a lower cost per unit. Variable cost per unit is the one that stays constant.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A school hostel hires one extra cook for every 40 boarders or part of 40. What type of cost is the cooks' wages?",
    ok: ["Stepped", "Correct: the cost is fixed within a range and jumps at each limit."],
    bad: [["Variable", "A variable cost would change with every boarder, not at limits."], ["Fixed throughout the range", "It rises when the number passes 40, 80 and so on."], ["Sunk", "Sunk describes spending already incurred, not behaviour."]],
    explanation: "A stepped cost is fixed within a range of activity and increases by a fixed amount when the range is exceeded.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "Direct materials cost US\\$5 a unit. What is the total direct materials cost at 1,800 units if it was US\\$4,000 at 800 units?",
    ok: ["US\\$9,000", "Correct: 1,800 × 5."],
    bad: [["US\\$4,000", "That is the cost at 800 units; the total variable cost rises with output."], ["US\\$5,800", "This adds the number of units to the old total instead of multiplying the rate by 1,800."], ["US\\$2,222", "This divides the old total by 1.8; the cost should rise, not fall."]],
    hints: ["A variable cost per unit is constant."],
    explanation: "Variable cost per unit is US\\$5, so the total at 1,800 units is 1,800 × 5 = US\\$9,000.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which description fits a semi-variable cost?",
    ok: ["A phone bill of line rental plus a charge per minute", "Correct: a fixed element plus a variable element."],
    bad: [["Rent of the workshop, the same each month throughout the year", "That is wholly fixed."], ["Raw materials used in each unit made in the factory", "That is wholly variable."], ["A supervisor paid for each batch of 1,000 units or part", "That is a stepped cost."]],
    hints: ["Look for both a fixed and a variable part."],
    explanation: "A semi-variable (semi-fixed) cost includes a fixed charge and a charge that varies with use.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "A manager says: Cutting output by 20% will cut total costs by 20%. When is this statement most wrong?",
    ok: ["When most of the costs are fixed in the short run", "Correct: fixed costs do not fall when output falls."],
    bad: [["When most of the costs are variable", "Variable costs fall in proportion to output, so the statement would be close to correct."], ["When the business uses a stepped cost with small steps", "Small steps can be treated as roughly variable."], ["When the cost per unit is constant", "Then the costs are variable and the statement is true."]],
    hints: ["Which costs do not move when output falls?"],
    explanation: "Only variable costs fall with output. Where fixed costs dominate, total cost falls by much less than 20%.",
  });
  const hiU = 8000, hiC = 25000, loU = 3000, loC = 15000;
  const hl = costing.highLow([[hiU, hiC], [loU, loC], [5000, 19000]]);
  mc(b, {
    d: 4, skill: "APPLICATION",
    stem: `A garage recorded total costs of ${usd(hiC)} at ${F(hiU)} machine hours (highest activity) and ${usd(loC)} at ${F(loU)} machine hours (lowest activity). Using the high-low method, what is the fixed cost?`,
    ok: [usd(hl.fixed), "Correct: variable rate 2.00; fixed cost = 25,000 - 2 × 8,000."],
    bad: [[usd(hiC - hl.variablePerUnit * loU), "This takes the variable cost from the wrong activity level."], [usd(loC), "That is the total cost at the lowest level, not its fixed element."], [usd(hl.variablePerUnit * hiU), "That is the variable cost at the highest level, not the fixed cost."]],
    hints: ["Find the variable cost per hour first."],
    explanation: `Variable cost per hour = (${F(hiC)} - ${F(loC)}) ÷ (${F(hiU)} - ${F(loU)}) = ${p2(hl.variablePerUnit)}. Fixed cost = ${F(hiC)} - ${p2(hl.variablePerUnit)} × ${F(hiU)} = ${usd(hl.fixed)}.`,
  });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Total variable cost stays the same when output changes, but variable cost per unit changes.", answer: false, explanation: "False. Total variable cost changes in proportion to output; variable cost per unit stays the same." });
  b.tf({ d: 3, skill: "UNDERSTANDING", stem: "The high-low method uses the months with the highest and lowest activity, even if other months have higher or lower costs.", answer: true, hints: ["The cost driver is the activity, not the cost."], explanation: "True. The method compares the highest and lowest activity levels and the costs recorded at them." });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each cost to its behaviour.",
    pairs: ["Factory rent of US\\$800 a month", "Ingredients used in each cake", "A water bill with a standing charge and a charge for each kilolitre", "One supervisor for every 20 workers or part of 20"],
    right: ["Fixed", "Variable", "Semi-variable", "Stepped"],
    rightIndex: [0, 1, 2, 3],
    explanation: "Rent is fixed, ingredients vary with output, a bill with both parts is semi-variable and wages that jump at limits are stepped.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences.",
    template: "Within the relevant range, total fixed cost is {{blank:a}} and fixed cost per unit {{blank:b}} as output rises.",
    blanks: [{ id: "a", accepted: ["constant"], choices: ["constant", "rising", "falling"] }, { id: "b", accepted: ["falls"], choices: ["falls", "rises", "stays the same"] }],
    explanation: "Fixed costs do not change in total, so spreading them over more units reduces the cost per unit.",
  });
  b.short({ d: 1, skill: "RECALL", stem: "Name the method that separates a semi-variable cost into fixed and variable parts using the highest and lowest activity levels.", accepted: ["high-low method", "high low method", "high-low", "high low"], explanation: "It is the high-low method." });

  // numerical
  const pts = [[1100, 3000], [1700, 3900], [1400, 3450], [2300, 4800]];
  const h = costing.highLow(pts);
  chk(h.variablePerUnit, 1.5, 1e-9);
  chk(h.fixed, 1350, 1e-9);
  const [lo, hi] = [pts[0], pts[3]];
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: h.variablePerUnit, dp: 2, calculator: true, daily: true, wrong: [hi[1] / hi[0], (pts[1][1] - lo[1]) / (hi[0] - lo[0])],
    stem: `A Gweru laundry recorded these figures for the cost of power and the kilograms of washing done: ${pts.map((p) => `${F(p[0])} kg: ${usd(p[1])}`).join("; ")}. Using the high-low method, calculate the variable power cost per kilogram, to the nearest cent.`,
    hints: ["Use the lowest and highest activity."],
    explanation: `Highest activity ${F(hi[0])} kg (${usd(hi[1])}); lowest ${F(lo[0])} kg (${usd(lo[1])}). Variable cost per kg = (${F(hi[1])} - ${F(lo[1])}) ÷ (${F(hi[0])} - ${F(lo[0])}) = ${usd(h.variablePerUnit)}. Using the highest cost divided by the highest activity ignores the fixed element.`,
  });
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: h.fixed, calculator: true, wrong: [hi[1] - h.variablePerUnit * lo[0], lo[1] - h.variablePerUnit * hi[0]],
    stem: "Using the same data and your variable rate of US\\$1.50 a kilogram, calculate the fixed element of the power cost per period.",
    hints: ["Subtract the variable cost from the total at the same level."],
    explanation: `Fixed cost = ${F(hi[1])} - (1.50 × ${F(hi[0])}) = ${F(hi[1])} - ${F(h.variablePerUnit * hi[0])} = ${usd(h.fixed)}. Check: ${F(lo[1])} - (1.50 × ${F(lo[0])}) = ${usd(lo[1] - h.variablePerUnit * lo[0])}.`,
  });
  const est = h.fixed + h.variablePerUnit * 2000;
  b.calc({
    d: 4, skill: "APPLICATION", kind: "money", value: est, calculator: true, wrong: [h.variablePerUnit * 2000, est + h.fixed],
    stem: "Using fixed power costs of US\\$1,350 and a variable cost of US\\$1.50 a kilogram, estimate the power cost for a month in which 2,000 kg of washing is done.",
    hints: ["Total = fixed + variable rate × activity."],
    explanation: `Estimated cost = ${F(h.fixed)} + (1.50 × ${F(2000)}) = ${F(h.fixed)} + ${F(3000)} = ${usd(est)}. The activity of 2,000 kg is inside the observed range, so the estimate is reasonable.`,
  });
  const fixedT = 18000, varU = 2.5, out1 = 6000, out2 = 9000;
  const u1 = (fixedT + varU * out1) / out1, u2 = (fixedT + varU * out2) / out2;
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: u2, dp: 2, calculator: true, wrong: [varU, u1],
    stem: `A bakery has fixed costs of ${usd(fixedT)} a month and variable costs of ${usd(varU)} a loaf-pack. Calculate the total cost per pack at an output of ${F(out2)} packs (within the relevant range), to the nearest cent.`,
    hints: ["Total cost first, then divide by output."],
    explanation: `Total cost = ${F(fixedT)} + ${p2(varU)} × ${F(out2)} = ${F(fixedT + varU * out2)}. Cost per pack = ${F(fixedT + varU * out2)} ÷ ${F(out2)} = ${usd(u2)}. At ${F(out1)} packs it would be ${usd(u1)}.`,
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe, in words, the shape of the graph of total cost against output for (a) a fixed cost, (b) a variable cost and (c) a stepped cost.",
    points: ["Fixed: a horizontal line at the fixed amount", "Variable: a straight line from zero sloping upward", "Stepped: a flight of steps, horizontal over each range with a jump at each limit"],
    modelAnswer: "A fixed cost is a flat line; a variable cost is a rising straight line from the origin; a stepped cost is a series of horizontal sections, each higher than the last.",
    explanation: "One mark for each correct description.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "Explain two limitations of using the high-low method to estimate a cost.",
    points: ["It uses only two observations, so unusual months distort the result", "It assumes linear behaviour, but costs may be stepped or change outside the relevant range", "Estimates outside the observed range of activity are unreliable"],
    modelAnswer: "Only two points are used, so an abnormal month can give a wrong rate. It also assumes a straight-line cost, but costs can step up or change beyond the observed activity range.",
    hints: ["Think of how many data points are used."],
    explanation: "One mark each for two limitations; the third mark for explaining one of them.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "A manager plans to double output and expects total cost to double. Evaluate this expectation, referring to fixed, variable and stepped costs.",
    points: ["Variable costs will roughly double with output", "Fixed costs stay the same in total within the relevant range, so total cost rises by less than double", "Stepped costs may jump if a limit is passed (extra supervisors, another machine)", "So cost per unit is expected to fall, but only if the new output is inside the relevant range"],
    modelAnswer: "Only variable costs double. Fixed costs stay the same within the relevant range, so total cost rises by less than double and cost per unit falls. If doubling passes a step limit, extra fixed costs will be needed, which reduces the saving.",
    hints: ["Separate the cost types before answering."],
    explanation: "One mark for each of the four points.",
  });

  // Structured 1: 10 marks
  const f1 = 7500, v1 = 1.4;
  const o = [2000, 5000, 10000];
  const rows = o.map((u) => [F(u), f1, r2(v1 * u), r2(f1 + v1 * u), r2((f1 + v1 * u) / u)]);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Nyasha Chuma makes concrete blocks in Masvingo. Her fixed costs are ${usd(f1)} a month and her variable cost is ${usd(v1)} a block. She is considering outputs of ${o.map(F).join(", ")} blocks a month, all within the relevant range.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: v1 * o[2], wrong: [f1 + v1 * o[2]], stem: `Calculate the total variable cost at ${F(o[2])} blocks.`, explanation: `${F(o[2])} × ${v1.toFixed(2)} = ${usd(v1 * o[2])}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: f1 / o[1], wrong: [v1, (f1 + v1 * o[1]) / o[1]], stem: `Calculate the fixed cost per block at ${F(o[1])} blocks.`, explanation: `${F(f1)} ÷ ${F(o[1])} = ${usd(f1 / o[1])}.` }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: rows[2][4], dp: 2, wrong: [rows[0][4], v1], stem: `Calculate the total cost per block at ${F(o[2])} blocks, to the nearest cent.`, explanation: `(${F(f1)} + ${F(v1 * o[2])}) ÷ ${F(o[2])} = ${usd(rows[2][4])}.` }),
      P.mcq({ label: "(d)", marks: 1, stem: "As output rises from 2,000 to 10,000 blocks, the total cost per block:", options: [["falls, because the fixed cost is spread over more blocks", "Correct."], ["rises, because the variable cost increases", "Variable cost per block is constant."], ["stays the same, because costs are proportional to output", "Only variable costs are proportional."], ["rises, because the fixed cost increases", "Fixed cost does not change in total."]], answer: "A", explanation: "The total cost per block falls from US\\$5.15 to US\\$2.15." }),
      P.manual({ label: "(e)", marks: 3, stem: "Explain one reason why the total cost per block may not fall as expected if output is raised to 15,000 blocks a month.", points: ["15,000 blocks may be outside the relevant range", "Fixed costs may step up (another machine, more space or supervisors)", "So the cost per block would be higher than the straight-line estimate"], modelAnswer: "At 15,000 blocks the business may need another machine or more space, so the fixed costs step up. The relevant range is exceeded and the cost per block is higher than estimated.", explanation: "One mark for each point." }),
    ],
    hints: ["Fixed cost per block = total fixed cost ÷ output.", "Total cost per block = fixed per block + variable per block."],
    explanation: "This item tests total and unit costs at different outputs and the limit of the relevant range.",
  });

  // Structured 2: 12 marks, high-low
  const data = [["January", 5200, 11800], ["February", 6100, 12700], ["March", 4300, 10900], ["April", 7000, 13600], ["May", 5800, 12400]];
  const hl2 = costing.highLow(data.map((x) => [x[1], x[2]]));
  chk(hl2.variablePerUnit, 1.0, 1e-9);
  chk(hl2.fixed, 6600, 1e-9);
  const est2 = hl2.fixed + hl2.variablePerUnit * 6500;
  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `Tafara Maposa runs a minibus service in Harare. The monthly cost of repairs and fuel is semi-variable. The records for five months were:\n\n${table(["Month", "Kilometres", "Cost US\\$"], data.map((x) => [x[0], F(x[1]), x[2]]))}`,
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Which two months should be used in the high-low method?", options: [["April and March", "Correct: highest and lowest kilometres."], ["April and January", "January is not the lowest activity."], ["February and May", "These are middle months."], ["March and May", "May is not the highest activity."]], answer: "A", explanation: "April has the highest activity (7,000 km) and March the lowest (4,300 km)." }),
      P.num({ label: "(b)", marks: 3, kind: "money", value: hl2.variablePerUnit, dp: 2, wrong: [13600 / 7000, 10900 / 4300], stem: "Calculate the variable cost per kilometre, to the nearest cent.", explanation: `(13,600 - 10,900) ÷ (7,000 - 4,300) = 2,700 ÷ 2,700 = ${usd(hl2.variablePerUnit)}.` }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: hl2.fixed, wrong: [10900 - 1 * 7000, 13600], stem: "Calculate the monthly fixed cost.", explanation: `13,600 - (1.00 × 7,000) = ${usd(hl2.fixed)}. Check: 10,900 - 4,300 = 6,600.` }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: est2, wrong: [6500, hl2.fixed], stem: "Estimate the cost for a month in which 6,500 km are run.", explanation: `${F(hl2.fixed)} + 1.00 × 6,500 = ${usd(est2)}.` }),
      P.manual({ label: "(e)", marks: 4, stem: "Evaluate the reliability of the estimate in (d) and suggest how Tafara could improve it.", points: ["6,500 km is inside the range 4,300 to 7,000 km, so the range supports the estimate", "The method uses only two months, so an unusual month would distort the rate", "Costs such as repairs may be stepped or vary with the age of the vehicle", "Improve by using more months or a scattergraph or regression, and checking against the other months"], modelAnswer: "The estimate is inside the observed range, which supports it. However, only two months were used, and repairs can be uneven. Tafara could check the rate against the other months or use all the data to fit a line.", hints: ["Check whether the activity lies inside the range of the data."], explanation: "One mark for each point." }),
    ],
    hints: ["Use highest and lowest kilometres.", "Check the fixed cost with the other month."],
    explanation: "This item applies the high-low method and then evaluates its reliability.",
  });

  b.card("DEFINITION", "Fixed cost", "A cost that stays the same in total when activity changes within the relevant range. Fixed cost per unit falls as output rises.");
  b.card("DEFINITION", "Variable cost", "A cost that changes in total in proportion to activity. Variable cost per unit is constant.");
  b.card("DEFINITION", "Semi-variable cost", "A cost with a fixed element and a variable element, for example a bill with a standing charge plus a charge per unit.");
  b.card("DEFINITION", "Stepped cost", "A cost that is fixed within a range of activity and jumps to a higher amount when the range is exceeded.");
  b.card("FORMULA", "High-low: variable cost per unit", "(Cost at highest activity - cost at lowest activity) ÷ (highest activity - lowest activity).");
  b.card("FORMULA", "High-low: fixed cost", "Total cost at a level - (variable cost per unit × activity at that level). Check using the other level.");
  b.card("DEFINITION", "Relevant range", "The range of activity over which the assumed cost behaviour is valid; estimates outside it are unreliable.");
  b.card("CONCEPT", "Why total cost per unit falls with output", "Fixed costs are spread over more units while the variable cost per unit is constant.");
  b.card("CONCEPT", "Limits of the high-low method", "It uses only two points and assumes a straight line, so unusual months and steps can distort it.");
});
void p1;
