// W4b: break-even calculations (BES 7.5.8, CAM 4.4.3).
import { concept, P, money, fmt, r2, round, table, f } from "../lib.mjs";

concept("bus.operations.break-even-calculation", { file: "operations/break-even-calculation", keyPrefix: "operations.break-even-calculation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is meant by **break-even**?",
    options: [
      ["Total revenue equals total costs", "Correct: no profit and no loss."],
      ["Total revenue is twice total costs", "That would be a profit."],
      ["Fixed costs equal variable costs", "This has no special meaning for profit."],
      ["The selling price equals the variable cost", "Then contribution is zero and the firm can never break even."],
    ],
    answer: "A",
    explanation: "At break-even, revenue exactly covers all costs.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "How is contribution per unit calculated?",
    options: [
      ["Selling price − variable cost per unit", "Correct."],
      ["Selling price per unit − total fixed costs", "Fixed costs are not deducted per unit."],
      ["Fixed costs ÷ selling price", "This is not contribution."],
      ["Total revenue − total costs", "That gives profit."],
    ],
    answer: "A",
    explanation: "Contribution per unit = selling price − variable cost per unit.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Fixed costs are US\\$9,000. Price is US\\$25 and variable cost is US\\$10 per unit. What is the break-even output?",
    options: [
      ["600 units", "Correct: 9,000 ÷ (25 − 10)."],
      ["360 units", "This divides by the price, not the contribution."],
      ["900 units", "This divides by the variable cost."],
      ["257 units", "This divides by price + variable cost."],
    ],
    answer: "A",
    explanation: "Contribution = US\\$15; break-even = 9,000 ÷ 15 = 600 units.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What happens to the break-even output if a firm's fixed costs rise?",
    options: [
      ["It rises", "Correct: more contributions are needed to cover the higher fixed costs."],
      ["It falls", "Higher fixed costs need more units to cover them."],
      ["It stays the same", "Break-even output depends on fixed costs."],
      ["It becomes zero", "This would need zero fixed costs."],
    ],
    answer: "A",
    explanation: "Break-even = fixed costs ÷ contribution; a bigger numerator gives a bigger answer.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", daily: true,
    stem: "A firm raises its selling price but its costs do not change. What happens to contribution per unit and break-even output?",
    options: [
      ["Contribution rises; break-even output falls", "Correct: each unit covers more of the fixed costs."],
      ["Contribution falls; break-even output rises", "A higher price raises contribution."],
      ["Both rise", "A larger contribution means fewer units are needed."],
      ["Contribution rises; break-even output is unchanged", "Break-even depends on contribution."],
    ],
    answer: "A",
    explanation: "Higher price → higher contribution → fewer units to break even (though sales may fall).",
    hints: ["Contribution = price − variable cost."],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A business expects to sell 2,400 units and its break-even output is 1,800 units. What is the margin of safety?",
    options: [
      ["600 units", "Correct: 2,400 − 1,800."],
      ["4,200 units", "This adds the two figures."],
      ["75%", "This is break-even as a percentage of sales, not the margin of safety."],
      ["1,800 units", "This is the break-even output."],
    ],
    answer: "A",
    explanation: "Margin of safety = actual sales − break-even sales = 600 units.",
    hints: ["Margin of safety = actual − break-even."],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which change would **increase** a firm's margin of safety, if sales do not change?",
    options: [
      ["A fall in variable cost per unit", "Correct: contribution rises, break-even falls, margin of safety grows."],
      ["A rise in fixed costs", "Break-even rises, so the margin of safety shrinks."],
      ["A cut in the selling price", "Contribution falls, so break-even rises."],
      ["A rise in variable cost per unit", "Contribution falls, so break-even rises."],
    ],
    answer: "A",
    explanation: "Anything that lowers break-even output, with sales unchanged, raises the margin of safety.",
    hints: ["Which change lowers the break-even output?"],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Above the break-even output, each unit sold adds its contribution to profit.",
    answer: true,
    explanation: "True. Once fixed costs are covered, every further contribution is profit.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A rise in fixed costs reduces the contribution per unit.",
    answer: false,
    explanation: "False. Contribution depends only on price and variable cost; fixed costs change the break-even output.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each formula with what it calculates.",
    pairs: [
      ["Price − variable cost per unit", "Contribution per unit"],
      ["Fixed costs ÷ contribution per unit", "Break-even output"],
      ["Break-even output × price", "Break-even revenue"],
      ["Actual sales − break-even sales", "Margin of safety"],
    ],
    explanation: "Learn these four formulas for break-even questions.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentences.",
    template: "If the break-even output is not a whole number, it should be rounded {{blank:a}}. Contribution per unit depends on the selling price and the {{blank:b}} cost per unit.",
    blanks: [
      { id: "a", accepted: ["up"], choices: ["up", "down", "to zero", "to the nearest ten"] },
      { id: "b", accepted: ["variable"], choices: ["variable", "fixed", "average", "total"] },
    ],
    explanation: "Round up so that costs are fully covered; contribution = price − variable cost.",
  });
  const fc1 = 4800, p1 = 16, vc1 = 10;
  const be1 = f.breakEvenOutput(fc1, p1, vc1);
  b.num({
    d: 2, skill: "APPLICATION", kind: "units", value: be1, daily: true,
    stem: `A mobile phone repair shop has fixed costs of ${money(fc1)} a month. It charges ${money(p1)} per repair, and parts cost ${money(vc1)} per repair. Calculate the break-even number of repairs a month.`,
    wrong: [fc1 / p1, fc1 / vc1],
    explanation: `Contribution = ${p1} − ${vc1} = ${p1 - vc1}; break-even = ${fmt(fc1)} ÷ ${p1 - vc1} = ${be1} repairs.`,
  });
  const fc2 = 7500, p2 = 12, vc2 = 7, s2 = 2000;
  const be2 = f.breakEvenOutput(fc2, p2, vc2);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: be2 * p2,
    stem: `A bakery has fixed costs of ${money(fc2)} a month. A cake sells for ${money(p2)} and has a variable cost of ${money(vc2)}. Calculate the break-even revenue.`,
    wrong: [be2, fc2 / p2 * p2],
    explanation: `Break-even = ${fmt(fc2)} ÷ ${p2 - vc2} = ${be2} cakes; revenue = ${be2} × ${fmt(p2)} = ${money(be2 * p2)}.`,
    workedSolution: `1. Contribution = ${p2} − ${vc2} = ${money(p2 - vc2)}.\n2. Break-even output = ${fmt(fc2)} ÷ ${p2 - vc2} = ${fmt(be2)} cakes.\n3. Break-even revenue = ${fmt(be2)} × ${fmt(p2)} = ${money(be2 * p2)}.`,
    hints: ["Find the break-even output first.", "Multiply by the price."],
  });
  b.calc({
    d: 3, skill: "APPLICATION", kind: "units", value: f.marginOfSafety(s2, be2),
    stem: `The bakery above (fixed costs ${money(fc2)}, price ${money(p2)}, variable cost ${money(vc2)}) expects to sell ${fmt(s2)} cakes a month. Calculate its margin of safety in units.`,
    wrong: [be2, s2 + be2],
    explanation: `Break-even ${fmt(be2)}; margin of safety = ${fmt(s2)} − ${fmt(be2)} = ${f.marginOfSafety(s2, be2)} cakes.`,
    workedSolution: `1. Break-even = ${fmt(fc2)} ÷ (${p2} − ${vc2}) = ${fmt(be2)}.\n2. Margin of safety = ${fmt(s2)} − ${fmt(be2)} = ${f.marginOfSafety(s2, be2)} cakes.`,
    hints: ["Margin of safety = expected sales − break-even sales."],
  });
  const fc3 = 2600, p3 = 7.5, vc3 = 3.8;
  const be3 = f.breakEvenOutput(fc3, p3, vc3);
  b.calc({
    d: 4, skill: "APPLICATION", kind: "units", value: Math.ceil(be3), calculator: true,
    stem: `A car wash has fixed costs of ${money(fc3)} a month. It charges ${money(p3)} per wash and the variable cost is ${money(vc3)} per wash. Calculate the break-even number of washes, rounded up to a whole wash.`,
    wrong: [Math.floor(be3), Math.ceil(fc3 / p3)],
    explanation: `Contribution = ${p3.toFixed(2)} − ${vc3.toFixed(2)} = ${(p3 - vc3).toFixed(2)}; ${fmt(fc3)} ÷ ${(p3 - vc3).toFixed(2)} = ${round(be3, 2)}, rounded up to ${Math.ceil(be3)} washes.`,
    workedSolution: `1. Contribution = ${p3.toFixed(2)} − ${vc3.toFixed(2)} = ${money(r2(p3 - vc3))}.\n2. Break-even = ${fmt(fc3)} ÷ ${(p3 - vc3).toFixed(2)} = ${round(be3, 2)}.\n3. Round up: ${Math.ceil(be3)} washes.`,
    hints: ["Find the contribution per wash.", "Round up to a whole wash."],
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how a rise in the variable cost per unit affects a firm's break-even output and its margin of safety.",
    points: [
      "Contribution per unit falls (1)",
      "So more units are needed to cover fixed costs: break-even output rises (1)",
      "With sales unchanged, the margin of safety falls (1)",
      "Firm is more at risk of a loss if sales fall (1)",
    ],
    modelAnswer: "If the variable cost per unit rises, each unit contributes less towards fixed costs, so more units must be sold to break even. With the same sales, the gap between sales and break-even narrows, so the margin of safety falls and the firm is more likely to make a loss if sales drop.",
    explanation: "Higher variable cost → lower contribution → higher break-even → smaller margin of safety.",
    hints: ["Start with contribution per unit."],
  });
  // Structured 1: new business decision.
  const fcS = 3300, pS = 15, vcS = 9, salesS = 700;
  const beS = f.breakEvenOutput(fcS, pS, vcS), profitS = (pS - vcS) * salesS - fcS;
  const pNew = 17, beNew = f.breakEvenOutput(fcS, pNew, vcS);
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 900, calculator: true,
    stem: `Tatenda plans to make and sell solar phone chargers in Gweru. His monthly fixed costs will be ${money(fcS)}. Each charger will sell for ${money(pS)} and cost ${money(vcS)} in parts. He expects to sell ${salesS} chargers a month.`,
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "money", value: pS - vcS, stem: "Calculate the contribution per charger.", wrong: [pS], explanation: `${fmt(pS)} − ${fmt(vcS)} = ${money(pS - vcS)}.` }),
      P.num({ label: "(b)", marks: 2, type: "CALCULATION", kind: "units", value: beS, stem: "Calculate the break-even output.", wrong: [round(fcS / pS, 0)], explanation: `${fmt(fcS)} ÷ ${pS - vcS} = ${beS} chargers.` }),
      P.num({ label: "(c)", marks: 1, kind: "units", value: f.marginOfSafety(salesS, beS), stem: "Calculate the margin of safety.", wrong: [salesS], explanation: `${salesS} − ${beS} = ${f.marginOfSafety(salesS, beS)}.` }),
      P.num({ label: "(d)", marks: 2, type: "CALCULATION", kind: "money", value: profitS, stem: "Calculate the expected monthly profit.", wrong: [pS * salesS - fcS], explanation: `${pS - vcS} × ${salesS} − ${fmt(fcS)} = ${money(profitS)}.` }),
      P.num({ label: "(e)", marks: 2, type: "CALCULATION", kind: "units", value: Math.ceil(beNew), stem: `Tatenda thinks he could charge ${money(pNew)}. Calculate the new break-even output, rounded up to a whole charger.`, wrong: [beS, Math.floor(beNew)], explanation: `${fmt(fcS)} ÷ (${pNew} − ${vcS}) = ${round(beNew, 1)}, rounded up to ${Math.ceil(beNew)}.` }),
      P.manual({ label: "(f)", marks: 4, stem: `Should Tatenda charge ${money(pS)} or ${money(pNew)}? Justify your answer.`, points: [`Higher price lowers break-even (from ${beS} to about ${Math.ceil(beNew)}) and raises contribution (1)`, "But demand may fall: rivals and imported chargers may be cheaper (1)", "Sales would have to stay above the new break-even (1)", "Justified decision (1)"] }),
    ],
    explanation: `Contribution ${money(pS - vcS)}; break-even ${beS}; margin of safety ${f.marginOfSafety(salesS, beS)}; profit ${money(profitS)}; at ${money(pNew)} break-even ${round(beNew, 1)} (round up to ${Math.ceil(beNew)}).`,
    hints: ["Contribution = price − variable cost.", "Break-even = fixed costs ÷ contribution."],
  });
  // Structured 2: comparing two options.
  const A = { fc: 8000, vc: 6 }, B = { fc: 13200, vc: 4 }, pr = 10, exp = 3000;
  const beA = f.breakEvenOutput(A.fc, pr, A.vc), beB = f.breakEvenOutput(B.fc, pr, B.vc);
  const prA = (pr - A.vc) * exp - A.fc, prB = (pr - B.vc) * exp - B.fc;
  const tbl = table(["", "Option A: hire machine", "Option B: buy machine"], [["Monthly fixed costs (US\\$)", A.fc, B.fc], ["Variable cost per bag (US\\$)", A.vc.toFixed(2), B.vc.toFixed(2)]]);
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 900, calculator: true,
    stem: `A co-operative in Masvingo makes peanut butter snacks, sold at ${money(pr)} a box. It must choose between two ways of producing. It expects to sell ${fmt(exp)} boxes a month.\n\n${tbl}`,
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", kind: "units", value: beA, stem: "Calculate the break-even output for Option A.", wrong: [A.fc / pr], explanation: `${fmt(A.fc)} ÷ (${pr} − ${A.vc}) = ${fmt(beA)}.` }),
      P.num({ label: "(b)", marks: 2, type: "CALCULATION", kind: "units", value: beB, stem: "Calculate the break-even output for Option B.", wrong: [B.fc / pr], explanation: `${fmt(B.fc)} ÷ (${pr} − ${B.vc}) = ${fmt(beB)}.` }),
      P.num({ label: "(c)", marks: 2, type: "CALCULATION", kind: "money", value: prB - prA, stem: `Calculate how much more monthly profit Option B gives than Option A at ${fmt(exp)} boxes.`, wrong: [prB], explanation: `A: ${pr - A.vc} × ${fmt(exp)} − ${fmt(A.fc)} = ${fmt(prA)}; B: ${pr - B.vc} × ${fmt(exp)} − ${fmt(B.fc)} = ${fmt(prB)}; difference ${money(prB - prA)}.` }),
      P.manual({ label: "(d)", marks: 4, stem: "Recommend which option the co-operative should choose. Justify your answer.", points: [`B has the higher profit at ${fmt(exp)} boxes (1)`, `But B has the higher break-even (${fmt(beB)} v ${fmt(beA)}), so more risk if sales fall (1)`, "Buying needs finance; hiring is flexible (1)", "Justified recommendation linked to confidence in sales (1)"] }),
    ],
    explanation: `Break-even: A ${fmt(beA)}, B ${fmt(beB)}. Profit at ${fmt(exp)}: A ${money(prA)}, B ${money(prB)}.`,
    hints: ["Use the same price for both options.", "Profit = contribution × sales − fixed costs."],
  });
  b.card("DEFINITION", "Break-even", "The output at which total revenue equals total costs: no profit, no loss.");
  b.card("FORMULA", "Contribution per unit", "Selling price − variable cost per unit.");
  b.card("FORMULA", "Break-even output", "Fixed costs ÷ contribution per unit (round up to a whole unit).");
  b.card("FORMULA", "Break-even revenue", "Break-even output × selling price.");
  b.card("FORMULA", "Margin of safety", "Actual sales − break-even sales (units).");
  b.card("FORMULA", "Profit from contribution", "Contribution per unit × units sold − fixed costs.");
  b.card("CONCEPT", "Effects of changes", "Price up or variable cost down → break-even falls. Fixed costs up or variable cost up or price down → break-even rises.");
  b.card("CONCEPT", "Why break-even matters", "Tests whether a business idea is realistic, guides pricing, compares options, supports loan applications.");
});
