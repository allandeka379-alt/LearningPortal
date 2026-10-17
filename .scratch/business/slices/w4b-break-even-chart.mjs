// W4b: break-even charts, uses and limitations (BES 7.5.8, CAM 4.4.3). Charts are described in words and tables.
import { concept, P, money, fmt, round, breakEvenTable, f } from "../lib.mjs";

concept("bus.operations.break-even-chart", { file: "operations/break-even-chart", keyPrefix: "operations.break-even-chart" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On a break-even chart, what is shown on the horizontal (x) axis?",
    options: [
      ["Output in units", "Correct: output (or sales) in units."],
      ["Costs and revenue in US dollars", "These go on the vertical axis."],
      ["Time in months", "Break-even charts plot output, not time."],
      ["Profit as a percentage", "Profit is read from the gap between lines."],
    ],
    answer: "A",
    explanation: "Output goes on the x-axis; costs and revenue in money on the y-axis.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Where does the total cost line start on a break-even chart?",
    options: [
      ["At the level of fixed costs on the vertical axis", "Correct: at zero output total cost = fixed costs."],
      ["At the origin, where output and costs are zero", "That is where the revenue line starts."],
      ["At the break-even point", "The break-even point is where revenue crosses total cost."],
      ["At the maximum output", "Lines are drawn from zero output."],
    ],
    answer: "A",
    explanation: "Fixed costs are paid even at zero output, so total cost starts there.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How is the profit at a given level of output read from a break-even chart?",
    options: [
      ["The vertical gap between revenue and total cost", "Correct: revenue minus total cost."],
      ["The height of the revenue line", "That is revenue, not profit."],
      ["The height of the fixed cost line at that output", "That is fixed costs only."],
      ["The distance from the origin to break-even", "That is the break-even output."],
    ],
    answer: "A",
    explanation: "Profit (or loss) is the vertical distance between total revenue and total cost.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "On a break-even chart, what happens to the revenue line if the selling price rises?",
    options: [
      ["It pivots upwards from the origin", "Correct: more revenue at every output."],
      ["It shifts upwards in a parallel line", "Revenue still starts at zero, so it pivots."],
      ["It becomes a horizontal line", "Revenue still rises with output."],
      ["It does not change", "Revenue depends on price."],
    ],
    answer: "A",
    explanation: "A higher price makes the revenue line steeper, so break-even moves left.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What happens on a break-even chart if fixed costs rise?",
    options: [
      ["Both cost lines shift upwards", "Correct: both start higher; break-even moves right."],
      ["The revenue line becomes much steeper", "Revenue depends on price, not fixed costs."],
      ["The total cost line becomes flatter", "The slope depends on variable cost per unit."],
      ["The break-even point moves left", "Higher fixed costs need more output to break even."],
    ],
    answer: "A",
    explanation: "Higher fixed costs shift both cost lines up in parallel, raising break-even output.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", daily: true,
    stem: "Which is a limitation of break-even analysis?",
    options: [
      ["It assumes all output is sold at the same price", "Correct: discounts and unsold stock are ignored."],
      ["It shows the output needed to cover costs", "That is a use, not a limitation."],
      ["It allows 'what if?' changes to be tested", "That is a use."],
      ["It can support an application for a bank loan", "That is a use."],
    ],
    answer: "A",
    explanation: "Real businesses offer bulk discounts and may not sell all they make.",
    hints: ["Which assumption may not be true in real life?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A chart shows break-even at 800 units. Expected sales are 1,100 units. What is the margin of safety?",
    options: [
      ["300 units", "Correct: 1,100 − 800."],
      ["1,900 units", "This adds the two figures."],
      ["800 units", "This is the break-even output."],
      ["1,100 units", "This is the expected sales."],
    ],
    answer: "A",
    explanation: "Margin of safety = expected sales − break-even sales = 300 units.",
    hints: ["Find the distance between the two outputs."],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A firm with many different products finds break-even analysis less useful. Why?",
    options: [
      ["Fixed costs are hard to divide between the products", "Correct: break-even suits single-product firms."],
      ["Break-even charts cannot show more than one line", "Charts show several lines."],
      ["Firms with many products have no fixed costs", "They still have fixed costs."],
      ["Each product must be sold at a loss", "This is not true."],
    ],
    answer: "A",
    explanation: "Shared overheads make it hard to calculate a separate break-even point for each product.",
    hints: ["Think about the rent shared by all products."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The revenue line on a break-even chart starts at the origin.",
    answer: true,
    explanation: "True. At zero output there is zero revenue.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "To the left of the break-even point the business makes a profit.",
    answer: false,
    explanation: "False. Left of break-even, total cost is above revenue: the loss region.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each change with its effect on a break-even chart.",
    pairs: [
      ["Selling price rises", "Revenue line pivots upwards"],
      ["Fixed costs rise", "Total cost line shifts up in parallel"],
      ["Variable cost per unit rises", "Total cost line pivots upwards from the fixed cost level"],
      ["Selling price falls", "Revenue line becomes less steep"],
    ],
    explanation: "Price affects the revenue line; fixed costs shift the cost lines; variable cost changes the slope of total cost.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentences.",
    template: "The break-even point is where the revenue line crosses the {{blank:a}} line. The area to the right of the break-even point is the {{blank:b}} region.",
    blanks: [
      { id: "a", accepted: ["total cost"], choices: ["total cost", "fixed cost", "variable cost", "profit"] },
      { id: "b", accepted: ["profit"], choices: ["profit", "loss", "fixed cost", "break-even"] },
    ],
    explanation: "Revenue = total cost at break-even; right of it is profit.",
  });
  const F1 = 3600, P1 = 8, V1 = 5, Q2 = 2400;
  const t1 = breakEvenTable({ fixed: F1, price: P1, vcPerUnit: V1, outputs: [0, 600, 1200, 1800, 2400], mustHit: true });
  b.num({
    d: 2, skill: "APPLICATION", kind: "units", value: t1.breakEven, daily: true,
    stem: `This table gives the data for a break-even chart.\n\n${t1.md}\n\nAt what output do the revenue and total cost lines cross?`,
    wrong: [1800, 600],
    explanation: `Revenue = total cost = ${money(f.revenue(P1, t1.breakEven))} at ${fmt(t1.breakEven)} units. Check: ${fmt(F1)} ÷ (${P1} − ${V1}) = ${fmt(t1.breakEven)}.`,
  });
  const rev2 = f.revenue(P1, Q2), tc2 = f.totalCost(F1, V1 * Q2);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: rev2 - tc2,
    stem: `A business has fixed costs of ${money(F1)}, sells each unit for ${money(P1)} and has a variable cost of ${money(V1)} a unit. Calculate its profit at ${fmt(Q2)} units.`,
    wrong: [rev2, rev2 - F1],
    explanation: `Revenue ${fmt(rev2)} − total cost ${fmt(tc2)} = ${money(rev2 - tc2)}.`,
    workedSolution: `1. Revenue = ${fmt(Q2)} × ${P1} = ${fmt(rev2)}.\n2. Total cost = ${fmt(F1)} + ${fmt(Q2)} × ${V1} = ${fmt(tc2)}.\n3. Profit = ${fmt(rev2)} − ${fmt(tc2)} = ${money(rev2 - tc2)}.`,
    hints: ["Profit is the gap between revenue and total cost."],
  });
  const pNew = 9;
  b.calc({
    d: 4, skill: "APPLICATION", kind: "units", value: f.breakEvenOutput(F1, pNew, V1),
    stem: `The business above (fixed costs ${money(F1)}, variable cost ${money(V1)}) raises its price from ${money(P1)} to ${money(pNew)}. Calculate the new break-even output where the amended revenue line crosses total cost.`,
    wrong: [t1.breakEven, F1 / pNew],
    explanation: `${fmt(F1)} ÷ (${pNew} − ${V1}) = ${fmt(f.breakEvenOutput(F1, pNew, V1))} units: the break-even point moves left.`,
    workedSolution: `1. New contribution = ${pNew} − ${V1} = ${pNew - V1}.\n2. New break-even = ${fmt(F1)} ÷ ${pNew - V1} = ${fmt(f.breakEvenOutput(F1, pNew, V1))} units.`,
    hints: ["Only the revenue line changes.", "Use the new contribution."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Explain **two** limitations of break-even analysis for a bakery that sells bread to shops and schools.",
    points: [
      "Limitation 1, e.g. assumes one price, but schools get bulk discounts (1)",
      "Explained: revenue line overstated; break-even underestimated (1)",
      "Limitation 2, e.g. assumes all bread sold, but unsold bread is wasted / costs not straight lines / forecasts may be wrong (1)",
      "Explained in context (1)",
    ],
    modelAnswer: "Break-even assumes every loaf sells at the same price, but the bakery gives schools a discount, so actual revenue is lower and the true break-even output is higher. It also assumes everything made is sold, but unsold bread goes stale and must be thrown away.",
    explanation: "Single price, all output sold, straight-line costs and uncertain data limit break-even.",
    hints: ["Which assumptions do not fit a bakery?"],
  });
  // Structured 1: complete and read a chart table.
  const fc = 6900, p = 15, vc = 9, cap = 1600, exp = 1300;
  const t = breakEvenTable({ fixed: fc, price: p, vcPerUnit: vc, outputs: [0, 400, 800, 1200, 1600] });
  const be = f.breakEvenOutput(fc, p, vc);
  const mdBlank = t.md.split("\n").map((ln) => (ln.startsWith("| 800 |") ? "| 800 | 6,900 | ? | ? |" : ln)).join("\n");
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, secs: 900, calculator: true,
    stem: `Nyasha makes school bags in Bulawayo. Fixed costs are ${money(fc)} a month; each bag sells for ${money(p)} and has a variable cost of ${money(vc)}. Her capacity is ${fmt(cap)} bags and she expects to sell ${fmt(exp)} a month. She is preparing a break-even chart from this table.\n\n${mdBlank}`,
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "money", value: f.totalCost(fc, vc * 800), stem: "Calculate the missing total cost at 800 bags.", wrong: [vc * 800], explanation: `${fmt(fc)} + 800 × ${vc} = ${money(f.totalCost(fc, vc * 800))}.` }),
      P.num({ label: "(b)", marks: 1, kind: "money", value: f.revenue(p, 800), stem: "Calculate the missing revenue at 800 bags.", wrong: [f.revenue(p, 800) - fc], explanation: `800 × ${p} = ${money(f.revenue(p, 800))}.` }),
      P.num({ label: "(c)", marks: 2, type: "CALCULATION", kind: "units", value: be, stem: "Calculate the output at which the revenue and total cost lines will cross.", wrong: [fc / p], explanation: `${fmt(fc)} ÷ (${p} − ${vc}) = ${fmt(be)} bags.` }),
      P.num({ label: "(d)", marks: 1, kind: "units", value: f.marginOfSafety(exp, be), stem: "Calculate the margin of safety at expected sales.", wrong: [exp], explanation: `${fmt(exp)} − ${fmt(be)} = ${f.marginOfSafety(exp, be)}.` }),
      P.mcq({ label: "(e)", marks: 1, stem: "Where does the total cost line start on her chart?", options: [[`At ${money(fc)} on the vertical axis`, "Correct: fixed costs at zero output."], ["At the origin", "That is the revenue line."], [`At ${money(f.totalCost(fc, vc * cap))} on the vertical axis`, "That is total cost at full capacity."], ["At the break-even point", "Lines start at zero output."]], answer: "A" }),
      P.manual({ label: "(f)", marks: 4, stem: "Nyasha will include a break-even chart in her bank loan application. Discuss how useful such a chart will be to the bank.", points: [`Shows a margin of safety of ${f.marginOfSafety(exp, be)} bags: sales can fall before a loss (1)`, "Shows profit at expected sales; ability to repay (1)", "But relies on forecasts; assumes all bags sold at one price (1)", "Justified conclusion: useful with cash flow forecast and evidence of demand (1)"] }),
    ],
    explanation: `At 800 bags total cost ${money(f.totalCost(fc, vc * 800))}, revenue ${money(f.revenue(p, 800))}; break-even ${fmt(be)}; margin of safety ${f.marginOfSafety(exp, be)}.`,
    hints: ["Total cost = fixed costs + variable cost × output.", "Break-even = fixed costs ÷ contribution."],
  });
  // Structured 2: amending a chart.
  const fcA = 5000, pA = 20, vcA = 12, salesA = 900, fcNew = 6300;
  const beA = f.breakEvenOutput(fcA, pA, vcA), beN = f.breakEvenOutput(fcNew, pA, vcA);
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 840, calculator: true,
    stem: `A break-even chart for a small furniture workshop in Kwekwe shows fixed costs of ${money(fcA)} a month, a price of ${money(pA)} per stool and a variable cost of ${money(vcA)} per stool. The workshop sells ${salesA} stools a month. The owner is considering moving to larger premises, which would raise fixed costs to ${money(fcNew)} a month.`,
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "units", value: beA, stem: "Calculate the current break-even output.", wrong: [fcA / pA], explanation: `${fmt(fcA)} ÷ (${pA} − ${vcA}) = ${beA}.` }),
      P.num({ label: "(b)", marks: 2, type: "CALCULATION", kind: "units", value: Math.ceil(beN), stem: "Calculate the new break-even output after the move, rounded up to a whole stool.", wrong: [beA, Math.floor(beN)], explanation: `${fmt(fcNew)} ÷ ${pA - vcA} = ${round(beN, 1)}, rounded up to ${Math.ceil(beN)}.` }),
      P.manual({ label: "(c)", marks: 2, stem: "Describe how the break-even chart would change after the move.", points: [`Fixed cost and total cost lines shift upwards (parallel) by ${money(fcNew - fcA)} (1)`, "Break-even point moves to the right; margin of safety shrinks (1)"] }),
      P.manual({ label: "(d)", marks: 5, stem: "Should the owner move to the larger premises? Justify your answer.", points: [`Margin of safety falls from ${salesA - beA} to ${salesA - Math.ceil(beN)} stools at current sales (1)`, "Larger premises may allow more output and sales above 900 (1)", `Risk: if sales do not grow, profit falls by ${money(fcNew - fcA)} a month (1)`, "Break-even assumes the same price and straight-line costs; demand uncertain (1)", "Justified recommendation (1)"] }),
    ],
    explanation: `Break-even rises from ${beA} to ${Math.ceil(beN)} stools; the cost lines shift up.`,
    hints: ["Only fixed costs change.", "Margin of safety = sales − break-even."],
  });
  b.card("CONCEPT", "Break-even chart axes", "Output (units) on the x-axis; costs and revenue (US\\$) on the y-axis.");
  b.card("CONCEPT", "Lines on a break-even chart", "Fixed cost: horizontal. Total cost: starts at fixed costs, slopes up. Revenue: starts at the origin, slopes up more steeply.");
  b.card("DEFINITION", "Break-even point (chart)", "Where the revenue line crosses the total cost line.");
  b.card("CONCEPT", "Reading profit and loss", "The vertical gap between revenue and total cost: profit to the right of break-even, loss to the left.");
  b.card("CONCEPT", "Margin of safety on a chart", "The distance along the x-axis from break-even output to actual output.");
  b.card("CONCEPT", "Amending a chart", "Price change: revenue line pivots. Fixed cost change: cost lines shift. Variable cost change: total cost line pivots.");
  b.card("CONCEPT", "Uses of break-even", "Planning, loan applications, 'what if?' analysis, comparing options, setting sales targets.");
  b.card("CONCEPT", "Limitations of break-even", "Assumes all output sold at one price, straight-line costs, accurate forecasts, a single product; ignores non-financial factors.");
});
