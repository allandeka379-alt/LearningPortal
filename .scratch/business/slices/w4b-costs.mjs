// W4b: business costs (BES 7.5.7, CAM 4.4.1).
import { concept, P, money, fmt, r2, round, table, f } from "../lib.mjs";

concept("bus.operations.costs", { file: "operations/costs", keyPrefix: "operations.costs" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is a **fixed** cost for a bakery?",
    options: [
      ["Rent of the bakery premises", "Correct: rent stays the same whatever the output."],
      ["Flour used to make the bread", "Flour rises with output: a variable cost."],
      ["Wrapping paper for each loaf", "Packaging is a variable cost."],
      ["Yeast used in each batch", "Ingredients are variable costs."],
    ],
    answer: "A",
    explanation: "Fixed costs do not change with output in the short run.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "How is average cost calculated?",
    options: [
      ["Total cost ÷ total output", "Correct: the cost of one unit."],
      ["Fixed costs + variable costs", "That gives total cost."],
      ["Variable cost per unit × output", "That gives total variable cost."],
      ["Total output ÷ total cost", "The figures are the wrong way round."],
    ],
    answer: "A",
    explanation: "Average cost = total cost ÷ total output.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why does average cost usually fall as a firm produces more units?",
    options: [
      ["Fixed costs are spread over more units", "Correct: each unit carries a smaller share of the fixed costs."],
      ["Variable costs disappear at high output", "Variable costs rise with output."],
      ["Total costs fall as output rises", "Total costs rise with output."],
      ["Fixed costs rise faster than output", "Fixed costs stay the same in the short run."],
    ],
    answer: "A",
    explanation: "Fixed costs ÷ more units = less fixed cost per unit.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which cost is both **variable** and **direct** for a furniture maker?",
    options: [
      ["Timber used to make each table", "Correct: it rises with output and can be traced to each table."],
      ["Rent of the workshop", "Rent is fixed and indirect."],
      ["Salary of the office manager", "A salary is fixed and indirect."],
      ["Insurance of the building", "Insurance is fixed and indirect."],
    ],
    answer: "A",
    explanation: "Materials for a product are variable and direct costs.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Fixed costs are US\\$1,800 and variable cost is US\\$4 per unit. What is the total cost of 600 units?",
    options: [
      ["US\\$4,200", "Correct: 1,800 + 600 × 4."],
      ["US\\$2,400", "This is total variable cost only."],
      ["US\\$7.00", "This is the average cost, not the total cost."],
      ["US\\$1,804", "This adds one unit's variable cost only."],
    ],
    answer: "A",
    explanation: "Total cost = 1,800 + 2,400 = US\\$4,200.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", daily: true,
    stem: "A firm with spare capacity is offered an extra order at a price above its variable cost per unit but below its average cost. Why might it accept?",
    options: [
      ["Fixed costs are already covered, so each extra unit adds to profit", "Correct: the order earns a contribution above its variable cost."],
      ["Orders below average cost always increase fixed costs", "The order does not change fixed costs."],
      ["Accepting it will lower the price paid by all customers by law", "There is no such law."],
      ["Average cost is not important to any business", "Average cost matters for normal pricing."],
    ],
    answer: "A",
    explanation: "Extra revenue minus extra (variable) cost is positive, so profit rises.",
    hints: ["Which costs change if the order is accepted?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A firm's rent doubles when it moves to a bigger factory. What has happened to its fixed costs?",
    options: [
      ["They have risen to a new, higher level", "Correct: fixed costs are fixed only for a given scale of operation."],
      ["They have become variable costs", "Rent is still unrelated to output."],
      ["They have stayed exactly the same", "Rent is a fixed cost and it has risen."],
      ["They have become direct costs", "Rent is shared by all products, so it is indirect."],
    ],
    answer: "A",
    explanation: "Fixed costs can change with a change of scale, but not with output in the short run.",
    hints: ["Fixed with respect to what?"],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "When output is zero, total variable cost is zero.",
    answer: true,
    explanation: "True. Variable costs arise only when units are produced; fixed costs are still paid.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Indirect costs can easily be traced to a single product.",
    answer: false,
    explanation: "False. Indirect costs (overheads) are shared across the business; direct costs can be traced.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Classify each cost of a soap factory.",
    right: ["Fixed cost", "Variable cost"],
    pairs: ["Factory rent", "Oils and fats used in the soap", "Manager's monthly salary", "Wrapping for each bar", "Insurance of machinery", "Electricity used by the mixing machines"],
    rightIndex: [0, 1, 0, 1, 0, 1],
    explanation: "Costs that rise with each bar made are variable; costs paid whatever the output are fixed.",
  });
  b.fib({
    d: 2,
    stem: "Complete the formulas.",
    template: "Total cost = {{blank:a}} costs + total variable costs. Total variable cost = variable cost per unit × {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["fixed"], choices: ["fixed", "average", "direct", "indirect"] },
      { id: "b", accepted: ["number of units"], choices: ["number of units", "fixed costs", "average cost", "price"] },
    ],
    explanation: "Total cost = fixed + total variable; total variable = variable cost per unit × units.",
  });
  const fc1 = 3600, vc1 = 2.5, q1 = 1200;
  const tc1 = f.totalCost(fc1, f.totalVariableCost(vc1, q1));
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: f.averageCost(tc1, q1), daily: true,
    stem: `A jam maker has fixed costs of ${money(fc1)} a month and variable costs of ${money(vc1)} per jar. Calculate the average cost per jar when ${fmt(q1)} jars are made.`,
    wrong: [vc1, fc1 / q1],
    explanation: `Total cost = ${fmt(fc1)} + ${vc1.toFixed(2)} × ${fmt(q1)} = ${fmt(tc1)}; average = ${money(f.averageCost(tc1, q1))}.`,
  });
  const fc2 = 5400, vc2 = 6, qa = 900, qb = 1800;
  const acA = f.averageCost(f.totalCost(fc2, vc2 * qa), qa), acB = f.averageCost(f.totalCost(fc2, vc2 * qb), qb);
  b.calc({
    d: 4, skill: "APPLICATION", kind: "money", value: acA - acB, calculator: true,
    stem: `A shoe workshop has fixed costs of ${money(fc2)} a month and a variable cost of ${money(vc2)} a pair. Calculate by how much the average cost per pair falls when output rises from ${fmt(qa)} to ${fmt(qb)} pairs.`,
    wrong: [acA, round(fc2 / qa, 2)],
    explanation: `At ${fmt(qa)}: (${fmt(fc2)} + ${fmt(vc2 * qa)}) ÷ ${fmt(qa)} = ${fmt(acA)}; at ${fmt(qb)}: (${fmt(fc2)} + ${fmt(vc2 * qb)}) ÷ ${fmt(qb)} = ${fmt(acB)}; fall = ${money(acA - acB)}.`,
    workedSolution: `1. At ${fmt(qa)} pairs: total cost = ${fmt(fc2)} + ${vc2} × ${fmt(qa)} = ${fmt(fc2 + vc2 * qa)}; average = ${money(acA)}.\n2. At ${fmt(qb)} pairs: total cost = ${fmt(fc2)} + ${vc2} × ${fmt(qb)} = ${fmt(fc2 + vc2 * qb)}; average = ${money(acB)}.\n3. Fall = ${fmt(acA)} − ${fmt(acB)} = ${money(acA - acB)}.`,
    hints: ["Find the average cost at each output.", "Subtract."],
  });
  const ord = 250, ordP = 9, vc3 = 6.4;
  b.calc({
    d: 4, skill: "APPLICATION", kind: "money", value: r2(ord * (ordP - vc3)),
    stem: `A sandal maker with spare capacity sells sandals normally at ${money(12)} a pair; the variable cost is ${money(vc3)} a pair. A school offers to buy an extra ${ord} pairs at ${money(ordP)} each. Fixed costs will not change. Calculate the extra profit from the order.`,
    wrong: [ord * ordP, r2(ord * (12 - vc3))],
    explanation: `Extra revenue ${fmt(ord * ordP)} − extra variable cost ${fmt(r2(ord * vc3))} = ${money(r2(ord * (ordP - vc3)))}.`,
    workedSolution: `1. Extra revenue = ${ord} × ${fmt(ordP)} = ${fmt(ord * ordP)}.\n2. Extra cost = ${ord} × ${vc3.toFixed(2)} = ${fmt(r2(ord * vc3))}.\n3. Extra profit = ${money(r2(ord * (ordP - vc3)))}.`,
    hints: ["Only variable costs change.", "Use the school's price, not the normal price."],
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain the difference between fixed costs and variable costs, using an example of each for a taxi business.",
    points: [
      "Fixed costs do not change with output (number of trips) (1)",
      "Example: licence / insurance / vehicle loan repayment (1)",
      "Variable costs change with output (1)",
      "Example: fuel / tyres / driver's pay per trip (1)",
    ],
    modelAnswer: "Fixed costs, such as the taxi's insurance and operating licence, stay the same however many trips are made. Variable costs, such as fuel, rise with each trip, so the more passengers the taxi carries, the more it spends.",
    explanation: "Fixed costs are independent of output; variable costs rise with output.",
    hints: ["What does the taxi pay even when parked?"],
  });
  // Structured 1: cost table and decision.
  const fcS = 4500, vcS = 7.5, outs = [400, 600, 1000];
  const rows = outs.map((q) => {
    const tvc = f.totalVariableCost(vcS, q), tc = f.totalCost(fcS, tvc);
    return [q, fcS, q === 600 ? "?" : tvc, q === 600 ? "?" : tc, q === 600 ? "?" : f.averageCost(tc, q).toFixed(2)];
  });
  const tc600 = f.totalCost(fcS, vcS * 600), ac600 = f.averageCost(tc600, 600);
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 900, calculator: true,
    stem: `Tendai makes school bags in Harare. His monthly fixed costs are ${money(fcS)} and the variable cost of each bag is ${money(vcS)}.\n\n${table(["Bags a month", "Fixed costs US\\$", "Total variable cost US\\$", "Total cost US\\$", "Average cost US\\$"], rows)}`,
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "money", value: vcS * 600, stem: "Calculate the total variable cost of 600 bags.", wrong: [vcS * 600 + fcS] }),
      P.num({ label: "(b)", marks: 1, kind: "money", value: tc600, stem: "Calculate the total cost of 600 bags.", wrong: [vcS * 600] }),
      P.num({ label: "(c)", marks: 2, type: "CALCULATION", kind: "money", value: ac600, stem: "Calculate the average cost of a bag at 600 bags a month.", wrong: [vcS, fcS / 600], explanation: `${fmt(tc600)} ÷ 600 = ${money(ac600)}.` }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why average cost falls as output rises.", points: ["Fixed costs stay at US\\$4,500 (1)", "Spread over more bags, so fixed cost per bag falls (1)"] }),
      P.manual({ label: "(e)", marks: 4, stem: `Tendai sells about 600 bags a month and plans to charge ${money(18)} a bag. Discuss whether this is a sensible price.`, points: [`Average cost at 600 is ${money(ac600)}, so ${money(18)} gives a profit of ${money(18 - ac600)} a bag (1)`, `If sales fall to 400, average cost is ${money(f.averageCost(f.totalCost(fcS, vcS * 400), 400))}: a loss on each bag (1)`, "Must consider rivals' prices and what parents will pay (1)", "Justified conclusion (1)"] }),
    ],
    explanation: `600 bags: TVC ${money(vcS * 600)}, TC ${money(tc600)}, AC ${money(ac600)}.`,
    workedSolution: `1. TVC = ${vcS} × 600 = ${fmt(vcS * 600)}.\n2. TC = ${fmt(fcS)} + ${fmt(vcS * 600)} = ${fmt(tc600)}.\n3. AC = ${fmt(tc600)} ÷ 600 = ${money(ac600)}.`,
    hints: ["TVC = variable cost per unit × output.", "AC = TC ÷ output."],
  });
  // Structured 2: continue a product?
  const oh = 3200, T = { rev: 6200, dc: 3900 }, Fr = { rev: 4300, dc: 3200 };
  const pr = [["Wooden toys", T.rev, T.dc, oh / 2], ["Picture frames", Fr.rev, Fr.dc, oh / 2]];
  const frameP = Fr.rev - Fr.dc - oh / 2, toyOnly = T.rev - T.dc - oh, both = T.rev + Fr.rev - T.dc - Fr.dc - oh;
  const tbl = table(["Product", "Revenue US\\$", "Direct (variable) costs US\\$", "Share of overheads US\\$"], pr);
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 840, calculator: true,
    stem: `A craft workshop in Victoria Falls makes two products. The overheads of ${money(oh)} a month (rent, manager's salary, insurance) are shared equally. The owner is thinking of stopping picture frames.\n\n${tbl}`,
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", kind: "money", value: frameP, tol: 0, stem: "Calculate the profit or loss on picture frames after their share of overheads (a loss has a minus sign).", wrong: [Fr.rev - Fr.dc], explanation: `${fmt(Fr.rev)} − ${fmt(Fr.dc)} − ${fmt(oh / 2)} = −${fmt(-frameP)} (a loss).` }),
      P.num({ label: "(b)", marks: 2, type: "CALCULATION", kind: "money", value: toyOnly, tol: 0, stem: "If picture frames are stopped, toys must carry all the overheads. Calculate the workshop's total profit or loss then (a loss has a minus sign).", wrong: [T.rev - T.dc - oh / 2], explanation: `${fmt(T.rev)} − ${fmt(T.dc)} − ${fmt(oh)} = −${fmt(-toyOnly)} (a loss).` }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why stopping picture frames would make the workshop worse off.", points: ["Overheads (indirect costs) do not fall when frames stop (1)", `Frames' revenue covers their direct costs and contributes ${money(Fr.rev - Fr.dc)} towards overheads (1)`] }),
      P.manual({ label: "(d)", marks: 4, stem: "Recommend what the owner should do about picture frames. Justify your answer.", points: ["Keep frames in the short run: they contribute to overheads (1)", "Look to raise frame prices or cut their direct costs (1)", "Consider replacing with a product with a bigger contribution (1)", "Justified recommendation (1)"] }),
    ],
    explanation: `Frames show a loss of ${money(-frameP)} after their share of overheads, but the workshop as a whole makes a profit of ${money(both)}. Without frames, toys carry all ${money(oh)} of overheads and the workshop makes a loss of ${money(-toyOnly)}.`,
    hints: ["Which costs disappear if frames stop?"],
  });
  b.card("DEFINITION", "Fixed costs", "Costs that do not change with output in the short run, e.g. rent, salaries, insurance.");
  b.card("DEFINITION", "Variable costs", "Costs that change directly with output, e.g. raw materials, packaging, piece-rate wages.");
  b.card("FORMULA", "Total variable cost", "Variable cost per unit × number of units.");
  b.card("FORMULA", "Total cost", "Fixed costs + total variable costs.");
  b.card("FORMULA", "Average cost", "Total cost ÷ total output.");
  b.card("CONCEPT", "Direct and indirect costs", "Direct: traced to a product (materials, production labour). Indirect (overheads): shared (rent, managers' salaries).");
  b.card("CONCEPT", "Why average cost falls", "Fixed costs are spread over more units as output rises.");
  b.card("CONCEPT", "Using cost data", "Set prices, accept or reject extra orders, choose suppliers, decide output, decide whether to continue a product.");
});
