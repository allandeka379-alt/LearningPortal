// W2a: short-run costs: TFC, TVC, TC, AFC, AVC, ATC, MC (both boards; ZIMSEC Form 5, Cambridge A Level).
import { concept, P, chk, fmt, dpStr, costTable } from "../lib.mjs";

const LV8 = [
  [3, 6, 8, "Two-sided, applied and developed, with a justified conclusion."],
  [2, 3, 5, "Some development of one side, limited application or conclusion."],
  [1, 1, 2, "Simple, undeveloped points."],
];

concept("aecon.costs.short-run-costs", { file: "costs/short-run-costs", keyPrefix: "costs.short-run-costs" }, (b) => {
  const mc = (o, correct, wrongs) => b.mcq({ ...o, options: [correct, ...wrongs], answer: "A" });
  const out = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const vc = [0, 40, 70, 90, 112, 141, 182, 238, 320];
  const ct = costTable({ output: out, fc: 60, vc, marginal: true });
  const R = ct.rows;
  chk(R[5].tc, 201); chk(R[6].mc, 41); chk(R[4].avc, 28); chk(R[5].atc, 40.2, 1e-9);
  // AVC minimum at 4 units, ATC minimum at 5 units
  chk(R.slice(1).reduce((m, r) => (r.avc < m.avc ? r : m)).q, 4);
  chk(R.slice(1).reduce((m, r) => (r.atc < m.atc ? r : m)).q, 5);
  // lesson claims: MC passes AVC between 4th and 5th unit, ATC between 5th and 6th
  if (!(R[4].mc < R[4].avc && R[5].mc > R[5].avc && R[5].mc < R[5].atc && R[6].mc > R[6].atc)) throw new Error("cost table does not show the crossings");

  mc({ d: 1, skill: "RECALL", stem: "As output increases in the short run, total fixed cost",
    explanation: "Fixed costs do not vary with output in the short run." },
    ["stays the same", "Correct."], [["rises in proportion to output", "That describes a variable cost."], ["falls steadily", "Average fixed cost falls, but the total stays the same."], ["rises at first, then falls", "Fixed cost is unchanged at every output."]]);

  mc({ d: 1, skill: "RECALL", stem: "Which cost curve falls continuously as output rises?",
    explanation: "Average fixed cost is TFC ÷ output, so it keeps falling as the same fixed cost is spread over more units." },
    ["Average fixed cost", "Correct: the divisor keeps growing."], [["Average variable cost", "AVC is U-shaped."], ["Marginal cost", "MC falls briefly, then rises."], ["Average total cost", "ATC is U-shaped."]]);

  mc({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Marginal cost is defined as the",
    explanation: "MC is the addition to total cost from producing one more unit." },
    ["addition to total cost from one more unit", "Correct."], [["total cost divided by output", "This is average total cost."], ["cost of the cheapest unit produced", "MC is the cost of the next unit, not the lowest cost."], ["variable cost divided by output", "This is average variable cost."]]);

  mc({ d: 2, skill: "APPLICATION", stem: "At a certain output, average fixed cost is US\\$12.00 and average variable cost is US\\$28.20. Average total cost is",
    explanation: "ATC = AFC + AVC = 12.00 + 28.20 = US\\$40.20." },
    ["US\\$40.20", "Correct: the sum of AFC and AVC."], [["US\\$16.20", "This subtracts AFC from AVC."], ["US\\$28.20", "This is AVC only."], ["US\\$20.10", "This is the average of the two."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "The marginal cost curve cuts the average variable cost curve",
    explanation: "When MC is below AVC the average falls, and when above it rises, so MC crosses AVC from below at AVC's lowest point." },
    ["at the lowest point of average variable cost", "Correct."], [["at the lowest point of marginal cost", "MC reaches its minimum earlier."], ["where average fixed cost is greatest", "AFC is greatest at the lowest output."], ["at the highest point of average cost", "The averages are U-shaped, with a minimum, not a maximum."]]);

  mc({ d: 3, skill: "ANALYSIS", hints: ["Which curves include the fixed cost?"],
    stem: "A fictional bakery's rent rises, with all other costs unchanged. In the short run, which curve does not move?",
    explanation: "Rent is a fixed cost: it raises TFC, AFC and ATC, but not AVC or marginal cost." },
    ["Marginal cost", "Correct: fixed costs do not enter MC."], [["Average total cost", "ATC includes fixed cost, so it rises."], ["Total cost", "TC includes TFC, so it rises."], ["Average fixed cost", "AFC = TFC ÷ output, so it rises."]]);

  mc({ d: 3, skill: "UNDERSTANDING", hints: ["Link marginal cost to marginal product."],
    stem: "Marginal cost is likely to rise in the short run mainly because of",
    explanation: "Diminishing marginal returns: each extra worker adds less output for the same wage, so each extra unit costs more." },
    ["diminishing marginal returns to the variable factor", "Correct."], [["falling average fixed cost as output rises", "AFC falling does not raise marginal cost; fixed cost is not in MC."], ["economies of scale as the firm expands in the long run", "These are long-run effects and lower average cost."], ["rising fixed costs as output increases", "Fixed costs are excluded from marginal cost."]]);

  mc({ d: 4, skill: "ANALYSIS", hints: ["Compare the marginal cost with the existing average."],
    stem: "A firm's average total cost for 10 units is US\\$20. The marginal cost of the eleventh unit is US\\$30. The average total cost of 11 units is",
    explanation: "Total cost of 10 units is 200. Adding 30 gives 230 ÷ 11 = US\\$20.91: above 20 (MC is above the average) but well below 30 (the average rises by only a share of the extra)." },
    ["above US\\$20 but below US\\$30", "Correct: MC above ATC pulls ATC up by less than the gap."], [["exactly US\\$25, the midpoint of 20 and 30", "The average does not move to the midpoint."], ["below US\\$20", "MC above ATC raises ATC."], ["exactly US\\$30, the marginal cost of the unit", "The average would equal MC only if it were applied to all units."]]);

  {
    const v = R[5].tc;
    b.num({ d: 2, skill: "APPLICATION", daily: true, kind: "money", value: v, wrong: [141, 60, 40.2],
      stem: "A fictional bakery has total fixed costs of US\\$60 a day. Its total variable cost of producing 5 units is US\\$141. Calculate total cost.",
      explanation: `TC = TFC + TVC = 60 + 141 = US\\$${v}. The figure 40.2 is the average total cost.` });
  }
  {
    const v = R[6].mc;
    b.num({ d: 3, skill: "APPLICATION", kind: "money", value: v, hints: ["MC is the change in total cost."],
      wrong: [182, 30.33, 242],
      stem: "Total cost is US\\$201 for 5 units and US\\$242 for 6 units. Calculate the marginal cost of the sixth unit.",
      explanation: `MC = change in TC ÷ change in output = (242 − 201) ÷ 1 = US\\$${v}.` });
  }
  {
    const v = 60 / 7;
    b.num({ d: 3, skill: "APPLICATION", calculator: true, kind: "money", value: v, dp: 2, hints: ["Average fixed cost = total fixed cost ÷ output."],
      wrong: [34, 60, 42.57],
      stem: "Total fixed cost is US\\$60. Calculate average fixed cost at an output of 7 units, to the nearest cent.",
      explanation: `AFC = 60 ÷ 7 = US\\$${dpStr(v, 2)}.` });
  }
  {
    const v = R[6].atc;
    b.calc({ d: 3, skill: "APPLICATION", calculator: true, kind: "money", value: v, dp: 2, hints: ["Add fixed and variable cost first."],
      wrong: [30.33, 10, 41],
      stem: "At an output of 6 units a firm has total fixed cost of US\\$60 and total variable cost of US\\$182. Calculate average total cost, to the nearest cent.",
      explanation: `1. TC = 60 + 182 = 242.\n2. ATC = TC ÷ output = 242 ÷ 6 = US\\$${dpStr(v, 2)}.\n(AVC = 182 ÷ 6 = 30.33 and AFC = 10.00; 30.33 + 10.00 = 40.33.)` });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Marginal cost cuts the average total cost curve at the lowest point of the marginal cost curve.", answer: false,
    explanation: "False. MC cuts ATC at the lowest point of ATC, which is at a higher output than the minimum of MC." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each cost concept with its formula.",
    pairs: [["Average variable cost", "TVC ÷ output"], ["Average total cost", "TC ÷ output"], ["Marginal cost", "Change in TC ÷ change in output"], ["Average fixed cost", "TFC ÷ output"]],
    extraRight: ["TVC − TFC"],
    explanation: "Each average divides a total cost by output; marginal cost is the change in total cost." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the statement about average fixed cost.",
    template: "Average fixed cost {{blank:a}} as output rises because the same fixed cost is {{blank:b}} over more units.",
    blanks: [{ id: "a", accepted: ["falls"], choices: ["falls", "rises", "stays constant"] }, { id: "b", accepted: ["spread"], choices: ["spread", "added", "doubled"] }],
    explanation: "AFC = TFC ÷ output: the same total is spread over a growing output." });

  b.short({ d: 2, skill: "RECALL", stem: "Which cost is zero when a firm produces no output in the short run: total fixed cost or total variable cost?",
    accepted: ["total variable cost", "variable cost", "tvc"], wrong: ["total fixed cost"],
    explanation: "Variable costs arise only when something is produced; fixed costs are paid even at zero output." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Define marginal cost.",
    points: ["The addition to total cost.", "From producing one more unit of output."],
    modelAnswer: "Marginal cost is the addition to total cost of producing one more unit of output.",
    explanation: "Change in total cost for one extra unit." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Use the arithmetic of averages."],
    stem: "Explain why the marginal cost curve cuts the average total cost curve at the lowest point of average total cost.",
    points: ["When MC is below ATC, the extra unit costs less than the average.", "So ATC falls.", "When MC is above ATC, the extra unit costs more than the average, so ATC rises.", "Therefore ATC stops falling and starts to rise where MC equals ATC, the lowest point."],
    modelAnswer: "If the cost of the next unit is below the average, adding it pulls the average down, so ATC falls. If the next unit costs more than the average, it pulls the average up, so ATC rises. ATC therefore stops falling and begins to rise where MC equals ATC, which is its lowest point.",
    explanation: "A marginal value below the average lowers it; above raises it." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 5, hints: ["Separate the fixed cost from the variable cost."],
    stem: "A rise in the rent of a bakery and a rise in the price of flour both raise costs. Analyse how the two have different effects on the bakery's average and marginal costs.",
    points: ["Rent is a fixed cost: TFC and AFC rise.", "ATC rises at every output (ATC = AFC + AVC).", "AVC and MC are unchanged, because fixed cost does not vary with output.", "Flour is a variable cost: TVC, AVC and MC all rise.", "So the profit-maximising output falls after the flour price rise but not after the rent rise."],
    modelAnswer: "Rent is a fixed cost, so total fixed cost and average fixed cost rise, and average total cost rises at every output. Average variable cost and marginal cost do not change, because fixed costs do not depend on output. Flour is a variable cost, so total variable cost, average variable cost and marginal cost all rise. As the profit-maximising output depends on marginal cost, it falls after the rise in flour prices but is unchanged after the rise in rent.",
    explanation: "Fixed costs shift ATC only; variable costs shift AVC, ATC and MC." });

  {
    const o = [0, 1, 2, 3, 4, 5];
    const v = [0, 30, 54, 72, 95, 130];
    const t2 = costTable({ output: o, fc: 50, vc: v, marginal: true });
    chk(t2.rows[3].tc, 122); chk(t2.rows[4].atc, 36.25, 1e-9); chk(t2.rows[5].mc, 35);
    if (!(t2.rows[5].mc < t2.rows[4].atc)) throw new Error("struct 1 premise");
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["Total cost = fixed cost + variable cost."],
      stem: `A fictional workshop has total fixed costs of US\\$50 a day. The table shows its total variable cost (illustrative data).\n\n| Output (units) | TVC (US\\$) |\n| --- | ---: |\n${o.map((q, i) => `| ${q} | ${v[i]} |`).join("\n")}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: t2.rows[3].tc, stem: "Calculate total cost at 3 units.", wrong: [72, 50, 24], explanation: "TC = 50 + 72 = US\\$122." }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: t2.rows[4].atc, dp: 2, stem: "Calculate average total cost at 4 units, to the nearest cent.", wrong: [23.75, 145, 12.5], explanation: "TC = 50 + 95 = 145; ATC = 145 ÷ 4 = US\\$36.25." }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: t2.rows[5].mc, stem: "Calculate the marginal cost of the fifth unit.", wrong: [130, 36, 180], explanation: "TC of 5 units = 180; TC of 4 units = 145; MC = US\\$35." }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain why average total cost is still falling when output rises from 4 to 5 units.", points: ["The marginal cost of the fifth unit (US\\$35) is below the average total cost at 4 units (US\\$36.25).", "A marginal cost below the average pulls the average down."],
          modelAnswer: "The fifth unit adds US\\$35 to cost, which is less than the existing average of US\\$36.25, so it pulls the average down: ATC falls to US\\$36." }),
      ],
      explanation: "TC at 3 units 122; ATC at 4 units 36.25; MC of the fifth unit 35, which is below ATC so ATC still falls." });
  }
  {
    const ct2 = costTable({ output: out, fc: 60, vc, marginal: true });
    const newAtc5 = (80 + 141) / 5;
    chk(newAtc5, 44.2, 1e-9);
    b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, hints: ["Fixed costs do not enter marginal cost.", "ATC = (TFC + TVC) ÷ output."],
      stem: `The table shows the daily costs of a fictional bakery (illustrative data, output in hundreds of loaves).\n\n${ct2.md}\n\nThe landlord raises the daily rent so that total fixed cost rises from US\\$60 to US\\$80. The price of flour does not change.`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: R[5].atc, dp: 2, stem: "Calculate average total cost at 5 units before the rent rise.", wrong: [28.2, 12, 201], explanation: "ATC = (60 + 141) ÷ 5 = US\\$40.20." }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: newAtc5, dp: 2, stem: "Calculate average total cost at 5 units after the rent rise.", wrong: [40.2, 48.2, 28.2], explanation: "TC = 80 + 141 = 221; ATC = 221 ÷ 5 = US\\$44.20." }),
        P.mcq({ label: "(c)", marks: 1, stem: "What happens to the marginal cost of the fifth unit?", options: [["It is unchanged at US\\$29", "Correct: fixed cost is not in marginal cost."], ["It rises by US\\$4", "That is the rise in AFC, not in MC."], ["It rises by US\\$20", "The rent rise raises TFC by 20, but not MC."], ["It falls to US\\$9", "MC does not fall."]], answer: "A", explanation: "MC = 221 − (80 + 112) = 29, the same as before." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain why the rise in rent does not change marginal cost.", points: ["Rent is a fixed cost: it is the same at every output.", "Marginal cost is the change in total cost from one more unit.", "The fixed cost is in both totals, so it cancels out."],
          modelAnswer: "Rent is fixed, so the same extra US\\$20 is included in the total cost at every output. Marginal cost is the change in total cost from producing one more unit, and the extra rent appears in both totals, so it cancels and MC is unchanged." }),
        P.manual({ label: "(e)", marks: 4, stem: "Analyse the effect on the bakery if the price of flour, instead of the rent, were to rise.", points: ["Flour is a variable cost, so TVC rises at each output.", "AVC and ATC rise.", "MC rises too, because each extra loaf needs more flour.", "The profit-maximising output (where MC = MR) falls."],
          modelAnswer: "Flour is a variable cost, so total variable cost rises at every output, and with it average variable cost, average total cost and marginal cost. Because each extra loaf now costs more, the point where MC equals MR is reached at a lower output, so the bakery will produce less." }),
      ],
      explanation: "ATC at 5 units rises from US\\$40.20 to US\\$44.20 after the rent rise; MC stays at US\\$29; a flour price rise would raise MC and reduce output." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Compare the lowest-cost output with the output that maximises profit."],
    stem: "Assess whether a firm should always produce at the output where average total cost is lowest.",
    points: ["Average total cost is lowest where MC cuts ATC.", "Profit is maximised where MC = MR, which may be to the left or right of this output.", "A firm with a downward-sloping demand curve may find MR = MC at an output with ATC above its minimum.", "Producing at minimum ATC makes sense in perfect competition in the long run, where price equals minimum ATC.", "Demand may be too small to sell the output at a profitable price.", "A firm with a different objective (sales maximisation) might choose a larger output.", "In the long run the firm may change its scale to reach lower costs.", "A justified judgement."],
    levels: LV8, wordLimit: { min: 100, max: 300 },
    modelAnswer: "Average total cost is lowest where marginal cost cuts it, but a firm seeking maximum profit produces where marginal cost equals marginal revenue. If the firm faces a downward-sloping demand curve, that output may lie to the left of the lowest-cost output, so average cost is above its minimum, and the firm accepts this because the revenue from selling more would not cover the extra cost. In perfect competition the two coincide in the long run because entry forces price down to minimum ATC. A firm that aims at sales maximisation may produce more, and in the long run any firm can change its scale. Overall, the firm should not aim for minimum ATC as such: it should choose the output where MC = MR, which is the minimum-cost output only in perfect competition in the long run.",
    explanation: "Profit maximisation uses MC = MR, not the lowest ATC." });

  b.card("DEFINITION", "Define **marginal cost**.", "The addition to total cost of producing one more unit of output.");
  b.card("FORMULA", "ATC in terms of AFC and AVC?", "ATC = AFC + AVC (also TC ÷ output).");
  b.card("FORMULA", "Total cost formula?", "TC = TFC + TVC.");
  b.card("CONCEPT", "Why does AFC fall continuously?", "The same total fixed cost is spread over more units, though it never reaches zero.");
  b.card("CONCEPT", "Why are AVC and ATC U-shaped?", "They fall at first (specialisation, AFC falling) and rise when diminishing marginal returns raise the variable cost per unit.");
  b.card("CONCEPT", "Where does MC cut AVC and ATC?", "From below at the lowest point of each average curve.");
  b.card("CONCEPT", "Why does MC rise in the short run?", "Diminishing marginal returns: each extra worker adds less output for the same wage.");
  b.card("FACT", "What happens to ATC and MC if rent rises?", "ATC rises at every output; MC and AVC are unchanged because rent is a fixed cost.");
  b.card("FACT", "What happens to MC if the price of raw materials rises?", "MC rises (also AVC and ATC), because raw materials are a variable cost.");
});
