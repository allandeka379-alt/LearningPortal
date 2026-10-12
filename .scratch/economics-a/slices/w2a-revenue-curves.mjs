// W2a: total, average and marginal revenue, and the profit-maximising output (both boards; ZIMSEC Form 5, Cambridge A Level).
import { concept, P, chk, fmt, dpStr, revenueTable, profitSchedule, table } from "../lib.mjs";

const LV8 = [
  [3, 6, 8, "Two-sided, applied and developed, with a justified conclusion."],
  [2, 3, 5, "Some development of one side, limited application or conclusion."],
  [1, 1, 2, "Simple, undeveloped points."],
];

concept("aecon.costs.revenue-curves", { file: "costs/revenue-curves", keyPrefix: "costs.revenue-curves" }, (b) => {
  const mc = (o, correct, wrongs) => b.mcq({ ...o, options: [correct, ...wrongs], answer: "A" });
  const rt = revenueTable({ quantity: [0, 1, 2, 3, 4, 5, 6, 7], price: [20, 18, 16, 14, 12, 10, 8, 6], marginal: true });
  const ps = profitSchedule({ output: [0, 1, 2, 3, 4, 5, 6, 7, 8], price: [20, 18, 16, 14, 12, 10, 8, 6, 4], fc: 10, vc: [0, 8, 14, 18, 23, 30, 40, 54, 72] });
  chk(ps.best.q, 4); chk(ps.best.profit, 15); chk(rt.rows[4].tr, 48); chk(rt.rows[5].mr, 2);
  // price-taker at US\\$6 with the same costs: loss-minimising output is 4 units
  const pt = [0, 1, 2, 3, 4, 5, 6].map((q) => 6 * q - (10 + [0, 8, 14, 18, 23, 30, 40][q]));
  chk(pt[4], -9); chk(Math.max(...pt.slice(1)), -9);

  mc({ d: 1, skill: "RECALL", stem: "For a firm that sells all its output at one price, average revenue equals",
    explanation: "AR = TR ÷ Q = (P × Q) ÷ Q = price. The AR curve is therefore the firm's demand curve." },
    ["the price of the product", "Correct."], [["marginal revenue", "AR equals MR only for a price-taker."], ["total revenue divided by total cost", "This is a ratio of revenue to cost, not average revenue."], ["marginal cost", "Cost is not part of revenue."]]);

  mc({ d: 1, skill: "RECALL", stem: "The demand curve facing a price-taking firm is",
    explanation: "A price-taker can sell any quantity at the market price, so its demand curve is horizontal and P = AR = MR." },
    ["horizontal at the market price", "Correct."], [["vertical at the market quantity", "A vertical curve would mean quantity is fixed regardless of price."], ["downward sloping", "This applies to firms with market power."], ["upward sloping", "Demand curves do not slope upward."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "Why is marginal revenue below average revenue for a firm facing a downward-sloping demand curve?",
    explanation: "To sell one more unit the firm must lower the price on all units, so the extra revenue is less than the new price." },
    ["The lower price needed to sell one more unit applies to every unit sold", "Correct."], [["Marginal cost is above price", "MR does not depend on cost."], ["Total revenue always falls as output rises along the demand curve", "TR rises while MR is positive."], ["Average revenue is always zero at the margin because marginal revenue is lower", "AR equals price and is positive."]]);

  mc({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Total revenue is at its maximum when",
    explanation: "TR rises while MR is positive and falls when MR is negative, so it peaks where MR = 0." },
    ["marginal revenue is zero", "Correct."], [["marginal cost equals marginal revenue", "That is the profit-maximising output."], ["average revenue is zero", "AR is the price, which is positive."], ["price is at its highest", "The price is highest at the smallest output, where revenue is low."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "A firm maximises profit by producing the output at which",
    explanation: "Produce while the extra unit adds more to revenue than to cost, up to the point where MC = MR with MC rising." },
    ["marginal cost equals marginal revenue, with marginal cost rising", "Correct."], [["average cost equals average revenue, so that only normal profit is earned", "This gives normal profit, not maximum profit."], ["total revenue is as large as possible, whatever the cost", "Revenue maximisation ignores cost."], ["marginal revenue equals zero", "This gives maximum revenue."]]);

  mc({ d: 3, skill: "APPLICATION", hints: ["Compare the extra revenue with the extra cost."],
    stem: "At the current output a firm's marginal revenue is US\\$12 and its marginal cost is US\\$9 (rising). To raise profit the firm should",
    explanation: "The next unit adds US\\$12 to revenue and US\\$9 to cost, so profit rises by US\\$3: expand until MC reaches MR." },
    ["increase output", "Correct."], [["reduce output", "That would be right only if MC exceeded MR."], ["leave output unchanged", "Profit is not yet maximised."], ["raise the price without changing output", "A price rise changes the quantity demanded along the demand curve."]]);

  mc({ d: 3, skill: "ANALYSIS", hints: ["Relate the sign of marginal revenue to total revenue and elasticity."],
    stem: "At a certain output the marginal revenue of a firm is negative. This means that",
    explanation: "A negative MR means that selling one more unit lowers total revenue: demand at that point is price inelastic." },
    ["total revenue falls if more is sold", "Correct."], [["demand is price elastic", "MR is positive where demand is elastic."], ["the firm is making a loss", "Revenue alone does not show profit."], ["the average revenue is negative", "AR is the price and cannot be negative."]]);

  mc({ d: 4, skill: "ANALYSIS", hints: ["Remember the condition on the slope of MC."],
    stem: "A price-taking firm finds that MC equals the price at two outputs: a low output where MC is falling and a higher output where MC is rising. Profit is maximised at the",
    explanation: "At the lower output, producing more still adds more to revenue than to cost because MC is falling below price. The maximum is where MC cuts the price from below." },
    ["higher output, where MC is rising", "Correct: MC must cut MR from below."], [["lower output, where MC is falling", "Profit is still rising there."], ["output where MC is lowest", "That is not related to MR."], ["either output, because both give MC = MR", "Only the point where MC cuts MR from below is a maximum."]]);

  {
    const v = rt.rows[4].tr;
    b.num({ d: 2, skill: "APPLICATION", daily: true, kind: "money", value: v, wrong: [12, 10, 60],
      stem: "A fictional salon can sell 4 haircuts at US\\$12 each. Calculate its total revenue, in US\\$.",
      explanation: "TR = price × quantity = 12 × 4 = US\\$48." });
  }
  {
    const v = (11 * 7.5) - (10 * 8);
    chk(v, 2.5, 1e-9);
    b.num({ d: 3, skill: "APPLICATION", calculator: true, kind: "money", value: v, dp: 2, hints: ["Compare total revenue at 10 and 11 units."],
      wrong: [7.5, 82.5, 0.5],
      stem: "A firm sells 10 units at US\\$8 each. To sell 11 units it must lower the price to US\\$7.50 on every unit. Calculate the marginal revenue of the eleventh unit, in US\\$.",
      explanation: "TR at 10 units = 80; TR at 11 units = 11 × 7.50 = 82.50; MR = 82.50 − 80 = US\\$2.50. The new price (7.50) is not the MR." });
  }
  {
    const v = ps.best.profit;
    b.calc({ d: 3, skill: "APPLICATION", kind: "money", value: v, hints: ["Find TR and TC at the output where MC = MR."],
      wrong: [48, 33, 10],
      stem: "A firm's MR is US\\$6 and MC is US\\$5 at 4 units; at 5 units MR is US\\$2 and MC is US\\$7. At 4 units its total revenue is US\\$48 and its total cost is US\\$33. Calculate the maximum profit, in US\\$.",
      explanation: "1. The firm produces 4 units: MR (6) exceeds MC (5) there, but MR (2) is below MC (7) at 5 units.\n2. Profit = TR − TC = 48 − 33 = US\\$15." });
  }
  {
    const v = pt[4];
    b.num({ d: 4, skill: "ANALYSIS", kind: "money", value: v, hints: ["Price × quantity minus total cost, including the fixed cost."],
      wrong: [24, 9, -10],
      stem: "A price-taking farmer sells at US\\$6 a crate. At the profit-maximising output of 4 crates her total cost is US\\$33. Calculate her profit (a loss is negative), in US\\$.",
      explanation: "TR = 6 × 4 = 24; profit = 24 − 33 = −US\\$9, a loss of US\\$9: the smallest loss available." });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "For a price-taking firm, price, average revenue and marginal revenue are all equal.", answer: true,
    explanation: "True. Each extra unit is sold at the same price, so MR = AR = price." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each revenue concept with its description.",
    pairs: [["Total revenue", "Price multiplied by quantity sold"], ["Average revenue", "Total revenue divided by quantity sold"], ["Marginal revenue", "Change in total revenue from selling one more unit"]],
    extraRight: ["Change in total cost from one more unit"],
    explanation: "The last statement is marginal cost." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the statement.",
    template: "For a firm with a downward-sloping demand curve, marginal revenue is {{blank:a}} average revenue, and total revenue is greatest where marginal revenue is {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["below"], choices: ["below", "above", "equal to"] }, { id: "b", accepted: ["zero"], choices: ["zero", "highest", "equal to price"] }],
    explanation: "MR < AR when price must fall to sell more; TR peaks at MR = 0." });

  b.short({ d: 2, skill: "RECALL", stem: "What name is given to the curve that shows a firm's average revenue at each output?",
    accepted: ["demand curve", "the demand curve", "demand", "the firm's demand curve"], wrong: ["supply curve"],
    explanation: "Because AR = price at each quantity sold, the AR curve is the demand curve." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Define marginal revenue.",
    points: ["The addition to total revenue.", "From selling one more unit."],
    modelAnswer: "Marginal revenue is the addition to total revenue from selling one more unit of output.", explanation: "Change in TR for one extra unit." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["What must the firm do to sell more?"],
    stem: "Explain why marginal revenue is less than price for a firm facing a downward-sloping demand curve.",
    points: ["To sell more, the firm must lower its price.", "The lower price applies to all units sold, not only the extra unit.", "So the revenue lost on earlier units reduces the gain, and MR is less than the new price."],
    modelAnswer: "To sell an extra unit the firm must lower its price. The lower price applies to every unit sold, so the firm loses revenue on the units it could previously sell at the higher price. The extra revenue is the new price less this loss, so MR is below price.",
    explanation: "Price cut applies to all units." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4, hints: ["Compare MC with MR on either side of the best output."],
    stem: "Explain why a firm maximises profit where marginal cost equals marginal revenue.",
    points: ["If MR is greater than MC, the extra unit adds more to revenue than to cost.", "So profit rises and the firm should expand.", "If MC is greater than MR, the last unit added more to cost than to revenue, so profit falls and output should be cut.", "Profit is greatest where MC = MR, with MC rising."],
    modelAnswer: "If marginal revenue exceeds marginal cost, producing one more unit adds more to revenue than to cost, so profit rises and the firm should expand. If marginal cost exceeds marginal revenue, the last unit reduced profit, so the firm should cut back. Profit therefore stops rising and is at its maximum where marginal cost equals marginal revenue, with marginal cost rising.",
    explanation: "Compare the extra revenue with the extra cost." });

  {
    const q = [0, 1, 2, 3, 4, 5];
    const p = [16, 14, 12, 10, 8, 6];
    const r = revenueTable({ quantity: q, price: p, marginal: true });
    chk(r.rows[3].tr, 30); chk(r.rows[4].mr, 2);
    const md = table(["Haircuts per day", "Price (US\\$)"], q.map((x, i) => [x, p[i]]));
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["MR is the change in total revenue."],
      stem: `A fictional salon in Gweru faces the following demand (illustrative data; the first row shows the highest price at which no haircuts are sold).\n\n${md}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: r.rows[3].tr, stem: "Calculate total revenue when 3 haircuts are sold.", wrong: [10, 36, 14], explanation: "TR = 3 × 10 = US\\$30." }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: r.rows[4].mr, stem: "Calculate the marginal revenue of the fourth haircut.", wrong: [8, 32, 10], explanation: "TR at 4 = 32; TR at 3 = 30; MR = US\\$2." }),
        P.mcq({ label: "(c)", marks: 1, stem: "At which number of haircuts is total revenue highest?", options: [["4", "Correct: TR is 32 at 4 haircuts; 30 at 3 and 30 at 5."], ["3", "TR is 30 at 3 haircuts."], ["5", "TR falls to 30 at 5 haircuts."], ["1", "TR is only 14 at 1 haircut."]], answer: "A", explanation: "TR: 14, 24, 30, 32, 30. The maximum is at 4 haircuts, where MR has fallen to 2 and is about to turn negative." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain why marginal revenue is lower than the price for the fourth haircut.", points: ["To sell 4 haircuts the salon must charge US\\$8 rather than US\\$10.", "The lower price applies to the first 3 haircuts too, losing US\\$6.", "MR = 8 − 6 = US\\$2, below the price."],
          modelAnswer: "To sell the fourth haircut the salon must cut the price from US\\$10 to US\\$8 for all customers. The three haircuts that could have been sold at US\\$10 now bring in US\\$6 less in total, so the extra revenue is US\\$8 − US\\$6 = US\\$2, much less than the price." }),
      ],
      explanation: "TR at 3 haircuts is US\\$30; MR of the fourth is US\\$2; TR is highest at 4 haircuts." });
  }
  {
    const out = [0, 1, 2, 3, 4, 5, 6, 7];
    const price = [30, 27, 24, 21, 18, 15, 12, 9];
    const vc = [0, 14, 24, 31, 41, 52, 66, 84];
    const s2 = profitSchedule({ output: out, price, fc: 15, vc });
    chk(s2.best.q, 3); chk(s2.best.profit, 17); chk(s2.rows[3].mr, 15); chk(s2.rows[4].mr, 9); chk(s2.rows[4].mc, 10);
    b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, hints: ["MR and MC are shown in the table.", "Profit = TR − TC."],
      stem: `The table shows the revenue and costs of a fictional firm that makes school desks (illustrative data; fixed cost US\\$15).\n\n${s2.md}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: s2.rows[3].mr, stem: "Calculate the marginal revenue of the third desk.", wrong: [21, 63, 7], explanation: "TR at 3 = 63; TR at 2 = 48; MR = US\\$15." }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: s2.best.q, unit: "units", stem: "State the profit-maximising output.", wrong: [4, 5, 2], explanation: "MR (15) exceeds MC (7) for the third desk; for the fourth MR (9) is below MC (10). Output is 3." }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: s2.best.profit, stem: "Calculate the maximum profit.", wrong: [63, 46, 16], explanation: "TR 63 − TC 46 = US\\$17." }),
        P.mcq({ label: "(d)", marks: 1, stem: "Why should the firm not produce a fourth desk?", options: [["Its marginal cost exceeds its marginal revenue", "Correct: MC US\\$10 against MR US\\$9."], ["Its marginal revenue is negative at that output", "MR of the fourth desk is US\\$9, which is positive."], ["Total revenue falls", "TR rises from 63 to 72."], ["Average cost is rising faster than marginal cost", "Average cost is not the test: the decision uses MC and MR."]], answer: "A", explanation: "The fourth desk adds US\\$10 to cost and only US\\$9 to revenue." }),
        P.manual({ label: "(e)", marks: 3, stem: "Explain why the firm would not choose the output that gives the highest total revenue.", points: ["Total revenue is highest where MR = 0 (at 5 desks).", "Producing beyond 3 desks adds more to cost than to revenue.", "So profit is lower at the output of highest revenue."],
          modelAnswer: "Total revenue is greatest at about 5 desks, where marginal revenue falls to zero. But beyond 3 desks each extra desk costs more to make than the revenue it brings in, so profit falls. The firm gets more profit at 3 desks than at the output of maximum revenue." }),
        P.manual({ label: "(f)", marks: 2, stem: "State and explain the effect on the profit-maximising output of a rise in the fixed cost from US\\$15 to US\\$20.", points: ["No change in the profit-maximising output.", "Fixed cost does not affect MC or MR."],
          modelAnswer: "The profit-maximising output stays at 3 desks, because fixed cost does not change marginal cost or marginal revenue; profit simply falls by US\\$5." }),
      ],
      explanation: "MR of the third desk is US\\$15; the best output is 3 desks with profit US\\$17; the fourth desk costs US\\$10 and brings in US\\$9." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Compare the outputs at which revenue and profit are largest."],
    stem: "Assess whether a firm that maximises total revenue also maximises profit.",
    points: ["Total revenue is greatest where MR = 0.", "Profit is greatest where MC = MR, and MC is positive.", "So profit is greatest where MR is positive: at a lower output than the revenue-maximising output.", "A firm with positive marginal cost loses profit by producing beyond MC = MR.", "Only if marginal cost were zero would the two outputs coincide.", "A firm may deliberately choose revenue maximisation (managers' pay, market share) and accept lower profit.", "In practice firms may lack the information on MC and MR to find the exact optimum.", "A justified judgement."],
    levels: LV8, wordLimit: { min: 100, max: 300 },
    modelAnswer: "Total revenue is highest where marginal revenue is zero, but profit is highest where marginal cost equals marginal revenue. Because marginal cost is positive, this happens at an output where MR is still positive, which is lower than the revenue-maximising output. Producing the extra units beyond that point adds to revenue but adds more to cost, so profit falls. The two outputs would coincide only if marginal cost were zero. A firm may nevertheless choose to maximise revenue if its managers are paid on sales or it wants market share, accepting lower profit. Overall, maximising revenue does not maximise profit unless marginal cost is zero.",
    explanation: "MR = 0 gives maximum revenue; MC = MR gives maximum profit; with positive MC the profit output is lower." });

  b.card("DEFINITION", "Define **marginal revenue**.", "The addition to total revenue from selling one more unit of output.");
  b.card("FORMULA", "Formulae for TR, AR and MR?", "TR = P × Q; AR = TR ÷ Q = P; MR = change in TR ÷ change in Q.");
  b.card("CONCEPT", "Revenue curves of a price-taker?", "A horizontal demand curve at the market price: P = AR = MR.");
  b.card("CONCEPT", "Why is MR below AR when demand slopes downward?", "The price cut needed to sell one more unit applies to all units sold.");
  b.card("FACT", "Where is total revenue greatest?", "Where MR = 0 (the point of unit elasticity of demand).");
  b.card("FACT", "What does negative MR tell you?", "Selling more reduces total revenue: demand is price inelastic at that output.");
  b.card("CONCEPT", "State the profit-maximising rule.", "Produce where MC = MR, with MC cutting MR from below.");
  b.card("CONCEPT", "Why does a rise in fixed cost not change the profit-maximising output?", "Fixed cost does not affect marginal cost or marginal revenue; only the level of profit changes.");
  b.card("CONCEPT", "Why is the revenue-maximising output usually larger than the profit-maximising one?", "Revenue is greatest at MR = 0, but profit is greatest at MR = MC > 0, which is at a lower output.");
});
