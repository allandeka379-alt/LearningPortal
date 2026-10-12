// W2a: normal, supernormal and subnormal profit, losses and the shutdown decision (both boards; ZIMSEC Form 6, Cambridge A Level).
import { concept, P, chk, fmt, dpStr, costTable, ZIM } from "../lib.mjs";

const LV8 = [
  [3, 6, 8, "Two-sided, applied and developed, with a justified conclusion."],
  [2, 3, 5, "Some development of one side, limited application or conclusion."],
  [1, 1, 2, "Simple, undeveloped points."],
];

concept("aecon.costs.profit-types", { file: "costs/profit-types", keyPrefix: "costs.profit-types" }, (b) => {
  const mc = (o, correct, wrongs) => b.mcq({ ...o, options: [correct, ...wrongs], answer: "A" });
  const ct = costTable({ output: [0, 1, 2, 3, 4, 5, 6, 7, 8], fc: 60, vc: [0, 40, 70, 90, 112, 141, 182, 238, 320], marginal: true });
  const R = ct.rows;
  // best output for a price-taker: highest profit among q >= 1, and the shut-down alternative of zero output (loss = fixed cost)
  const best = (price) => R.slice(1).map((r) => ({ q: r.q, profit: price * r.q - r.tc, avc: r.avc, atc: r.atc })).reduce((m, r) => (r.profit > m.profit ? r : m));
  chk(best(50).q, 6); chk(best(50).profit, 58);
  chk(best(36).q, 5); chk(best(36).profit, -21);
  chk(best(25).q, 4); chk(best(25).profit, -72);
  // second cost schedule used in the practice questions (different from the lesson's bakery)
  const ct2 = costTable({ output: [0, 1, 2, 3, 4, 5, 6, 7, 8], fc: 54, vc: [0, 36, 64, 84, 106, 134, 170, 222, 300], marginal: true });
  const R2 = ct2.rows;
  const best2 = (price) => R2.slice(1).map((r) => ({ q: r.q, profit: price * r.q - r.tc, avc: r.avc, atc: r.atc })).reduce((m, r) => (r.profit > m.profit ? r : m));
  chk(best2(44).q, 6); chk(best2(44).profit, 40); chk(best2(34).q, 5); chk(best2(34).profit, -18); chk(best2(25).q, 4); chk(best2(25).profit, -60);
  chk(R2[6].atc, 224 / 6, 1e-9); chk(R2[4].avc, 26.5, 1e-9);

  mc({ d: 1, skill: "RECALL", stem: "Normal profit is best described as",
    explanation: "Normal profit is the minimum return needed to keep the entrepreneur in the current line of production: the opportunity cost of enterprise, included in costs." },
    ["the minimum profit needed to keep the owner in the industry", "Correct."], [["the highest profit a firm can possibly earn in the long run", "That describes maximum profit."], ["profit earned only by monopolists with high barriers to entry", "Any firm may earn normal profit; in competitive markets it is the long-run result."], ["revenue less variable costs", "This is contribution, not normal profit."]]);

  mc({ d: 1, skill: "RECALL", stem: "A firm earns supernormal profit when",
    explanation: "Supernormal (abnormal) profit means that total revenue is greater than total economic cost, including normal profit, so AR is above ATC." },
    ["average revenue is greater than average total cost", "Correct."], [["average revenue equals average total cost", "This gives normal profit."], ["average revenue is less than average variable cost", "This is the short-run shutdown condition."], ["marginal revenue equals zero", "This gives maximum revenue, not supernormal profit."]]);

  mc({ d: 2, skill: "APPLICATION", daily: true, stem: "A shop owner's accounts show a profit of US\\$18,000 a year. She could earn US\\$14,000 a year by working for someone else. Her economic (supernormal) profit is",
    explanation: "Her normal profit is the US\\$14,000 opportunity cost of her own labour and enterprise, so economic profit = 18,000 − 14,000 = US\\$4,000." },
    ["US\\$4,000", "Correct."], [["US\\$14,000", "This is the normal profit (opportunity cost)."], ["US\\$18,000", "This is the accounting profit, before deducting opportunity cost."], ["US\\$32,000", "Opportunity cost is subtracted, not added."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "In the short run a firm should shut down if the price it receives is below its",
    explanation: "If price is below AVC, revenue does not cover the variable cost, so producing adds to the loss beyond the fixed cost." },
    ["average variable cost", "Correct."], [["average fixed cost", "Fixed costs are paid whether or not the firm produces."], ["average total cost", "A price below ATC but above AVC still makes a contribution to fixed cost."], ["marginal revenue product", "This is a labour market concept and not the shutdown test."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "In the long run a firm should leave an industry if price is below",
    explanation: "In the long run all costs are variable, and the firm must cover average total cost including normal profit." },
    ["average total cost", "Correct."], [["average variable cost", "This is the short-run test."], ["marginal cost", "The firm produces where marginal cost equals price in any case."], ["average fixed cost", "Fixed costs disappear as a separate cost in the long run."]]);

  mc({ d: 3, skill: "APPLICATION", hints: ["Compare price with AVC and with ATC."],
    stem: "A firm sells at US\\$9. Its average variable cost is US\\$7 and its average total cost is US\\$11 at its chosen output. In the short run the firm should",
    explanation: "Price covers AVC (9 > 7) so each unit contributes US\\$2 to fixed cost. The firm makes a loss (9 < 11) but a smaller loss than if it closed." },
    ["continue producing despite the loss", "Correct: it covers variable cost and part of fixed cost."], [["shut down immediately", "Closing would lose all the fixed cost."], ["raise output until the loss disappears", "Output is set where MC = price; it cannot remove a loss at this price."], ["leave the industry at once", "Leaving is a long-run decision."]]);

  mc({ d: 3, skill: "UNDERSTANDING", hints: ["Compare revenue with total economic cost."],
    stem: "Subnormal profit occurs when",
    explanation: "Subnormal profit means profit below normal: total revenue is less than total economic cost, so AR is below ATC." },
    ["average revenue is less than average total cost", "Correct."], [["average revenue exceeds average total cost", "This is supernormal profit."], ["price is below average fixed cost", "The comparison is with average total cost."], ["marginal cost exceeds marginal revenue", "This describes producing too much, not a profit category."]]);

  mc({ d: 4, skill: "ANALYSIS", hints: ["Compare the loss from producing with the loss from closing."],
    stem: "A firm produces 1,000 units at a price of US\\$5. Its AVC is US\\$4 and its AFC is US\\$2. In the short run it should",
    explanation: "ATC = 6, so producing loses (6 − 5) × 1,000 = US\\$1,000. Closing loses the fixed cost of 2 × 1,000 = US\\$2,000. Price exceeds AVC, so continuing is better." },
    ["keep producing, because it loses less than if it closed", "Correct: loss US\\$1,000 against US\\$2,000."], [["shut down, because it makes a loss at the current price", "A loss alone is not the test; price must be below AVC."], ["shut down, because price is below ATC at that output", "ATC is the long-run test."], ["double output, because price exceeds AVC", "Output is set at MC = price, not doubled."]]);

  {
    const e = best2(44);
    b.num({ d: 3, skill: "APPLICATION", kind: "money", value: e.profit, hints: ["Find the output where MC is just below the price, then TR − TC."],
      wrong: [264, 224, 36],
      stem: "A price-taking bakery faces a price of US\\$44. At 6 units its marginal cost is US\\$36, and at 7 units it is US\\$52. Its total cost at 6 units is US\\$224. Calculate its profit, in US\\$.",
      explanation: "The bakery produces 6 units. TR = 44 × 6 = 264; profit = 264 − 224 = US\\$40. The figure 264 is revenue, not profit." });
  }
  {
    const e = best2(34);
    b.num({ d: 3, skill: "APPLICATION", kind: "money", value: e.profit, hints: ["A loss is negative."],
      wrong: [18, 170, -54],
      stem: "At a price of US\\$34 the same bakery produces 5 units, with total cost of US\\$188. Calculate its profit (a loss is shown as a negative number), in US\\$.",
      explanation: "TR = 34 × 5 = 170; profit = 170 − 188 = −US\\$18, a loss of US\\$18." });
  }
  {
    const v = (34 - R2[5].avc) * 5;
    chk(v, 36, 1e-9);
    b.calc({ d: 4, skill: "ANALYSIS", calculator: true, kind: "money", value: v, hints: ["Contribution = (price − AVC) × output."],
      wrong: [18, 54, 170],
      stem: "At a price of US\\$34 the bakery produces 5 units. Its total variable cost is US\\$134 and its total fixed cost is US\\$54. Calculate the amount by which revenue exceeds variable cost, which contributes towards the fixed cost, in US\\$.",
      explanation: "1. TR = 34 × 5 = 170.\n2. Contribution = TR − TVC = 170 − 134 = US\\$36.\n3. This covers US\\$36 of the US\\$54 fixed cost, so the loss is 54 − 36 = US\\$18, smaller than the US\\$54 lost by closing." });
  }
  {
    const v = (44 - R2[6].atc) * 6;
    chk(v, 40, 1e-9);
    b.num({ d: 3, skill: "APPLICATION", calculator: true, kind: "money", value: v, dp: 0, hints: ["Use (AR − ATC) × Q."],
      wrong: [6.67, 264, 224],
      stem: "At an output of 6 units a firm has an average revenue of US\\$44 and an average total cost of US\\$37.33 (total cost US\\$224). Calculate its profit using (AR − ATC) × Q, to the nearest dollar.",
      explanation: "(44 − 37.33) × 6 = US\\$40 (to the nearest dollar), the same as TR − TC = 264 − 224." });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A firm that earns only normal profit is covering all of its economic costs, including the opportunity cost of the owner's enterprise.", answer: true,
    explanation: "True. Normal profit is a cost of production; when AR = ATC the entrepreneur is earning exactly what is needed to stay." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each situation with the profit outcome.",
    pairs: [["Average revenue above average total cost", "Supernormal profit"], ["Average revenue equal to average total cost", "Normal profit"], ["Average revenue below average total cost", "Subnormal profit or loss"], ["Price below average variable cost in the short run", "The firm should shut down"]],
    extraRight: ["The firm earns maximum revenue"],
    explanation: "The comparison of AR with ATC defines the profit type; AVC gives the shutdown test." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the statements.",
    template: "In the short run a firm shuts down when price is below average {{blank:a}} cost; in the long run it leaves when price is below average {{blank:b}} cost.",
    blanks: [{ id: "a", accepted: ["variable"], choices: ["variable", "fixed", "total"] }, { id: "b", accepted: ["total"], choices: ["variable", "fixed", "total"] }],
    explanation: "Short run: AVC; long run: ATC." });

  b.short({ d: 2, skill: "RECALL", stem: "What type of profit is the opportunity cost of enterprise, included in a firm's costs?",
    accepted: ["normal profit", "normal"], wrong: ["supernormal profit"],
    explanation: "Normal profit is the minimum reward needed to keep the entrepreneur in the industry." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Explain what is meant by supernormal profit.",
    points: ["Profit above normal profit.", "Total revenue exceeds total economic cost (AR is greater than ATC)."],
    modelAnswer: "Supernormal profit is profit above normal profit: total revenue is greater than total cost, including the normal profit that the entrepreneur needs to stay in the industry.",
    explanation: "Profit above the normal level." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4, hints: ["Compare what is lost by closing and by continuing."],
    stem: "Explain why a firm may continue to produce in the short run even though it is making a loss.",
    points: ["Fixed costs must be paid even if the firm closes.", "If price exceeds average variable cost, each unit gives a contribution to fixed cost.", "The loss from producing is therefore less than the loss from closing (the fixed cost).", "The price may recover, and closing could lose skilled workers and customers."],
    modelAnswer: "Fixed costs have to be paid even if the firm closes, so closing would lose the whole of the fixed cost. If the price is above average variable cost, the revenue covers all the variable costs and part of the fixed cost, so the loss from producing is smaller than the loss from closing. The firm may also expect the price to recover and want to keep its workers and customers.",
    explanation: "Contribution to fixed cost." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, applies: ZIM, hints: ["Contrast the question each answers."],
    stem: "Distinguish between profit maximisation and cost minimisation.",
    points: ["Profit maximisation chooses the output at which TR − TC is greatest (MC = MR).", "Cost minimisation chooses the combination of inputs that gives the lowest cost for a given output.", "A profit maximiser must also minimise the cost of its chosen output, but a cost minimiser does not necessarily choose the profit-maximising output."],
    modelAnswer: "Profit maximisation is about choosing the output (and price) at which total revenue exceeds total cost by the most, where MC = MR. Cost minimisation is about producing a given output at the lowest possible cost, by choosing the best combination of inputs. A profit maximiser must also be a cost minimiser at its chosen output, but a firm that minimises the cost of a fixed output may not have chosen the output that maximises profit.",
    explanation: "Output choice versus input choice." });

  {
    const e = best(44);
    chk(e.q, 6); chk(e.profit, 22);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["Produce where MC is just below the price.", "Profit = TR − TC."],
      stem: `${"The cost schedule of a fictional price-taking bakery is shown below (illustrative data, output in hundreds of loaves).\n\n"}${ct.md}\n\nThe market price is US\\$44 per unit.`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "plain", value: e.q, unit: "units", stem: "State the profit-maximising output.", wrong: [7, 5, 8], explanation: "MC of the sixth unit (41) is below the price (44); MC of the seventh (56) is above it. Output is 6 units." }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: e.profit, stem: "Calculate the bakery's profit.", wrong: [264, 3, 242], explanation: "TR = 44 × 6 = 264; TC = 242; profit = US\\$22." }),
        P.mcq({ label: "(c)", marks: 1, stem: "This profit is", options: [["supernormal profit", "Correct: price 44 exceeds ATC 40.33."], ["normal profit", "Normal profit needs price to equal ATC."], ["subnormal profit", "Subnormal profit needs price below ATC."], ["a loss", "Revenue exceeds total cost."]], answer: "A", explanation: "AR (44) is above ATC (40.33)." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain what is likely to happen to the price in the long run if new bakeries can enter the market freely.", points: ["Supernormal profit attracts new firms.", "Industry supply shifts to the right.", "The price falls until it equals the minimum ATC and only normal profit is earned."],
          modelAnswer: "The supernormal profit attracts new bakeries because entry is free. Industry supply increases, which lowers the market price. Entry continues until the price falls to the level of average total cost, at which point each bakery earns only normal profit." }),
      ],
      explanation: "Output 6 units; profit US\\$22 (supernormal); entry eventually removes it." });
  }
  {
    const e = best(25);
    chk(-72, e.profit); chk(R[0].tc, 60);
    b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, hints: ["Compare the loss from producing with the loss from closing.", "Closing loses the fixed cost."],
      stem: `The market price for the fictional bakery in the table falls to US\\$25 per unit. Its total fixed cost is US\\$60.\n\n${ct.md}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "plain", value: e.q, unit: "units", stem: "If it produces, what output maximises profit (minimises loss) at this price?", wrong: [5, 3, 2], explanation: "MC of the fourth unit (22) is below US\\$25; MC of the fifth (29) is above." }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: e.profit, stem: "Calculate its profit at that output (a loss is negative).", wrong: [-60, 100, 172], explanation: "TR = 25 × 4 = 100; TC = 172; profit = −US\\$72." }),
        P.num({ label: "(c)", marks: 1, kind: "money", value: -60, stem: "Calculate its profit if it shuts down and produces nothing (a loss is negative).", wrong: [60, 0, -72], explanation: "Only the fixed cost of US\\$60 is paid: profit = −US\\$60." }),
        P.mcq({ label: "(d)", marks: 1, stem: "What should the bakery do?", options: [["Shut down, because price is below AVC", "Correct: AVC at 4 units is US\\$28, above the price of US\\$25."], ["Continue, because price is above marginal cost", "Price is above MC at 4 units, but that is how the output was chosen; the test is AVC."], ["Continue, because it earns normal profit", "It makes a loss."], ["Shut down, because price is below ATC", "ATC is the long-run test."]], answer: "A", explanation: "Producing loses US\\$72; closing loses US\\$60." }),
        P.manual({ label: "(e)", marks: 3, stem: "Explain the short-run shutdown rule.", points: ["Fixed costs are paid whether or not the firm produces.", "If price is below average variable cost, revenue does not cover variable cost, so each unit adds to the loss.", "The firm should shut down because the loss then equals only the fixed cost."],
          modelAnswer: "Fixed costs have to be paid even if the firm closes. If the price is below average variable cost, each unit sold fails to cover its own variable cost, so producing makes the loss larger than the fixed cost. The firm should therefore shut down." }),
        P.manual({ label: "(f)", marks: 3, stem: "Discuss whether the owner should leave the industry for good.", points: ["A long-run decision: compare price with ATC and expected future prices.", "If the price is expected to recover above ATC, staying may be worthwhile.", "If the price is expected to stay below ATC the owner earns less than normal profit and should leave."],
          modelAnswer: "Leaving is a long-run decision based on average total cost. If the owner expects the price to recover to more than average total cost, it may be worth keeping the business closed temporarily and reopening later. If the price is expected to stay below average total cost, the owner will earn less than normal profit and should leave the industry." }),
      ],
      explanation: "Producing loses US\\$72; closing loses US\\$60; price is below AVC, so shut down in the short run." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Distinguish the short run from the long run."],
    stem: "Assess whether a firm that is making a loss should always close down.",
    points: ["In the short run fixed costs are paid whether the firm produces or not.", "If price is above AVC, producing gives a contribution to fixed cost and a smaller loss than closing.", "If price is below AVC, closing is better because producing adds to the loss.", "In the long run the firm must cover ATC (including normal profit) or leave.", "Expectations: a temporary fall in price may justify staying open; permanent decline does not.", "Closing may have costs: loss of skilled workers, customers and contracts, redundancy payments.", "A firm with social aims (a state-owned enterprise) may continue at a loss.", "A justified judgement."],
    levels: LV8, wordLimit: { min: 100, max: 300 },
    modelAnswer: "In the short run a firm has fixed costs to pay whether or not it produces, so a loss is not enough reason to close. If the price is above average variable cost, producing earns a contribution to fixed cost and loses less than closing. If the price is below average variable cost, producing adds to the loss, and the firm should close. In the long run, all costs are variable, so the firm must cover average total cost, including normal profit, or leave. Expectations matter: a temporary fall in price may justify staying open, while a permanent fall does not. Closing may also lose skilled workers and customers, and a state-owned firm may continue at a loss for social reasons. Overall the right decision is to close only when price is below average variable cost in the short run, and to leave the industry when it expects price to stay below average total cost.",
    explanation: "Short-run test: AVC; long-run test: ATC; expectations matter." });

  b.card("DEFINITION", "Define **normal profit**.", "The minimum profit required to keep the entrepreneur in the current line of production in the long run; the opportunity cost of enterprise, included in cost.");
  b.card("DEFINITION", "Define **supernormal (abnormal) profit**.", "Profit above normal profit: total revenue exceeds total economic cost (AR > ATC).");
  b.card("FORMULA", "Profit formula using averages?", "Profit = (AR − ATC) × Q = TR − TC.");
  b.card("CONCEPT", "Short-run shutdown rule?", "Shut down if price is below average variable cost; continue if price covers AVC even if below ATC.");
  b.card("CONCEPT", "Long-run exit rule?", "Leave the industry if price is below average total cost (normal profit not covered).");
  b.card("FACT", "What is subnormal profit?", "Profit below normal: AR below ATC. The firm earns less than needed to stay in the long run.");
  b.card("CONCEPT", "Why continue producing at a loss in the short run?", "If price covers AVC, the contribution to fixed cost makes the loss smaller than the fixed cost lost by closing.");
  b.card("FACT", "Accounting profit US\\$15,000; owner's next best income US\\$12,000: economic profit?", "US\\$3,000 (supernormal profit).");
  b.card("CONCEPT", "Profit maximisation versus cost minimisation (ZIMSEC)?", "Profit maximisation chooses the best output (MC = MR); cost minimisation finds the cheapest way to produce a given output.", undefined, { applies: ZIM });
});
