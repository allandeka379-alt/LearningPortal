// W2a: long-run costs, returns to scale, economies and diseconomies of scale (both boards; ZIMSEC Form 5, Cambridge A Level).
import { concept, P, chk, fmt, dpStr, pctChange, table } from "../lib.mjs";

const LV8 = [
  [3, 6, 8, "Two-sided, applied and developed, with a justified conclusion."],
  [2, 3, 5, "Some development of one side, limited application or conclusion."],
  [1, 1, 2, "Simple, undeveloped points."],
];

concept("aecon.costs.long-run-costs-scale", { file: "costs/long-run-costs-scale", keyPrefix: "costs.long-run-costs-scale" }, (b) => {
  const mc = (o, correct, wrongs) => b.mcq({ ...o, options: [correct, ...wrongs], answer: "A" });
  const out = [100, 260, 450, 620, 700, 720];
  const lrac = out.map((q, i) => ((i + 1) * 5000) / q);
  chk(lrac.indexOf(Math.min(...lrac)), 3); // minimum at scale 4
  chk(pctChange(100, 260), 160, 1e-9);

  mc({ d: 1, skill: "RECALL", stem: "Returns to scale describe how output changes when",
    explanation: "Returns to scale compare the percentage change in output with the percentage change in all inputs together, in the long run." },
    ["all factors of production are increased in the same proportion", "Correct."], [["one factor is increased and the others are fixed", "That is diminishing marginal returns in the short run."], ["the price of the product is increased", "Price does not define returns to scale."], ["the firm moves to a new market", "Returns to scale concern the scale of production."]]);

  mc({ d: 1, skill: "RECALL", stem: "Economies of scale are best described as",
    explanation: "Economies of scale are falls in long-run average cost as the scale of output increases." },
    ["a fall in long-run average cost as output increases", "Correct."], [["a rise in total cost as output increases", "Total cost normally rises; the economy is in average cost."], ["a fall in cost because of new technology", "New technology shifts the cost curves; it is not a movement along them."], ["the savings from lower wage rates", "A lower wage is not an economy of scale."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "A large bakery buys flour in bulk and receives a discount from the miller. This is an example of a",
    explanation: "A discount for large orders is a purchasing (bulk-buying) economy: an internal economy of scale." },
    ["purchasing economy of scale", "Correct."], [["technical economy of scale", "Technical economies concern machines and production methods."], ["external economy of scale", "The saving comes from the firm's own size, not from the size of the industry."], ["managerial economy of scale", "Managerial economies concern specialist managers."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "Which of the following is an external economy of scale for a firm in a mining town?",
    explanation: "External economies arise from the growth of the whole industry in an area, such as a local pool of trained miners." },
    ["A local training college that supplies skilled miners to all mines", "Correct: all firms in the area benefit."], [["The firm's own purchase of a larger crusher", "This is an internal technical economy."], ["The firm's ability to borrow at a lower interest rate", "This is an internal financial economy."], ["The firm's bulk purchase of explosives", "This is an internal purchasing economy."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "Which of the following is an internal diseconomy of scale?",
    explanation: "Longer chains of command make communication slow and distorted, raising cost per unit." },
    ["Communication problems in a very large organisation", "Correct."], [["Higher rents in a crowded industrial area", "This is an external diseconomy."], ["Traffic congestion around a growing industrial zone", "This is an external diseconomy."], ["A shortage of skilled labour in the region", "This is an external diseconomy."]]);

  mc({ d: 3, skill: "APPLICATION", hints: ["Compare the percentage change in output with that in inputs."],
    stem: "A firm raises all inputs by 20% and output rises by 30%. This shows",
    explanation: "Output rises by a larger percentage than inputs: increasing returns to scale, so long-run average cost falls if input prices are constant." },
    ["increasing returns to scale", "Correct."], [["decreasing returns to scale", "That needs output to rise by less than inputs."], ["constant returns to scale", "That needs equal percentage changes."], ["diminishing marginal returns", "This is a short-run law about one variable factor."]]);

  mc({ d: 3, skill: "APPLICATION", hints: ["With constant input prices, what happens to cost per unit?"],
    stem: "A firm doubles all its inputs and its output rises by only 80%. Input prices are constant. Long-run average cost will",
    explanation: "Total cost doubles but output rises by less, so cost per unit rises: decreasing returns to scale, a diseconomy of scale." },
    ["rise", "Correct."], [["fall", "That would need output to more than double."], ["stay the same", "That needs constant returns to scale."], ["fall at first, then rise", "There is one change of scale, and the data show decreasing returns."]]);

  mc({ d: 4, skill: "ANALYSIS", hints: ["Divide the market size by the minimum efficient scale."],
    stem: "The minimum efficient scale in a fictional cement industry is 20% of the total market. The maximum number of firms that can all produce at minimum average cost is",
    explanation: "100% ÷ 20% = 5 firms. If the minimum efficient scale were a larger share, fewer firms could reach it, and the industry would tend to be concentrated." },
    ["5", "Correct: 100 ÷ 20."], [["20", "This uses the percentage as the number."], ["2", "This halves the market share."], ["10", "This divides 20 by 2."]]);

  {
    const v = 12000 / 420;
    b.num({ d: 2, skill: "APPLICATION", daily: true, calculator: true, kind: "money", value: v, dp: 2, wrong: [12000, 420, 2.86],
      stem: "At its third scale a fictional furniture workshop has a total cost of US\\$12,000 a month and produces 420 units. Calculate the long-run average cost per unit, to the nearest cent.",
      explanation: `LRAC = total cost ÷ output = 12,000 ÷ 420 = US\\$${dpStr(v, 2)}.` });
  }
  {
    const g = pctChange(100, 240);
    chk(g, 140, 1e-9);
    b.num({ d: 2, skill: "APPLICATION", daily: true, kind: "pct", value: g, dp: 0, unit: "%", wrong: [240, 58.3, 100],
      stem: "A firm doubles all its inputs. Output rises from 100 units to 240 units. Calculate the percentage increase in output.",
      explanation: "(240 − 100) ÷ 100 × 100 = 140%. Output rose by more than the 100% rise in inputs: increasing returns to scale." });
  }
  {
    const l1 = 4000 / 100, l4 = 16000 / 560;
    const v = ((l1 - l4) / l1) * 100;
    b.calc({ d: 3, skill: "APPLICATION", calculator: true, kind: "pct", value: v, dp: 1, unit: "%", hints: ["Use LRAC = total cost ÷ output at each scale."],
      wrong: [71.4, 17.7, 40],
      stem: "A fictional furniture workshop has an LRAC of US\\$40.00 per unit at scale 1 (US\\$4,000 for 100 units). At scale 4 it produces 560 units for a total cost of US\\$16,000. Calculate the percentage fall in LRAC from scale 1 to scale 4, to one decimal place.",
      explanation: `1. LRAC at scale 4 = 16,000 ÷ 560 = ${dpStr(l4, 2)}.\n2. Fall = (40.00 − ${dpStr(l4, 2)}) ÷ 40.00 × 100 = ${dpStr(v, 1)}%.` });
  }
  {
    const v = 1000000 / 250000;
    b.num({ d: 3, skill: "APPLICATION", kind: "plain", value: v, unit: "units", hints: ["Market size divided by minimum efficient scale."],
      wrong: [250000, 0.25, 40],
      stem: "A fictional cement market demands 1,000,000 tonnes a year. A plant reaches the lowest average cost at 250,000 tonnes a year. How many plants can operate at that minimum efficient scale?",
      explanation: "1,000,000 ÷ 250,000 = 4 plants (firms)." });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "External economies of scale shift the long-run average cost curve of every firm in the industry downwards.", answer: true,
    explanation: "True. External economies arise from the growth of the industry (skilled labour, suppliers, infrastructure), so every firm's costs fall." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each internal economy of scale with an example.",
    pairs: [["Technical", "Using a large production line that spreads machine costs"], ["Managerial", "Employing specialist finance and marketing managers"], ["Financial", "Borrowing at a lower interest rate than small firms"], ["Risk-bearing", "Selling many products in many markets"]],
    extraRight: ["A local pool of skilled labour"],
    explanation: "The last item is an external economy of scale." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the statement.",
    template: "The lowest output at which long-run average cost is at its minimum is called the {{blank:a}} efficient scale; if the market is much larger than this, {{blank:b}} firms can reach the minimum cost.",
    blanks: [{ id: "a", accepted: ["minimum"], choices: ["minimum", "maximum", "average"] }, { id: "b", accepted: ["many"], choices: ["many", "few", "no"] }],
    explanation: "A small minimum efficient scale relative to the market lets many firms reach the lowest cost." });

  b.short({ d: 2, skill: "RECALL", stem: "What name is given to the lowest level of output at which long-run average cost is at its minimum?",
    accepted: ["minimum efficient scale", "mes"], wrong: ["economy of scale"],
    explanation: "Minimum efficient scale (MES)." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Define economies of scale.",
    points: ["A fall in long-run average cost.", "When the firm increases the scale (level) of output."],
    modelAnswer: "Economies of scale are falls in the long-run average cost of production that result when a firm increases its scale of output.",
    explanation: "Falling LRAC as scale increases." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Name each economy and say how it lowers cost per unit."],
    stem: "Explain **two** internal economies of scale that a large brewery might enjoy.",
    points: ["First economy identified (for example technical or purchasing).", "Explained: for example large machines and production lines spread cost over many units, or bulk orders earn discounts.", "Second economy identified (for example managerial, financial, marketing or risk-bearing).", "Explained: for example specialist managers raise efficiency, or large firms borrow at lower interest rates."],
    modelAnswer: "Technical economies: a large brewery can use large, specialised machines and a continuous production line, and the cost per bottle falls because the machine cost is spread over a very large output. Purchasing economies: it buys grain and bottles in huge quantities and obtains bulk discounts from suppliers, which lowers the cost per unit.",
    explanation: "Two economies, each explained as a fall in unit cost." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 5, hints: ["Compare where the gain arises and what happens to the curve."],
    stem: "Distinguish between internal and external economies of scale, using an example of each, and explain how each affects the long-run average cost curve.",
    points: ["Internal economies arise from the growth of the firm itself.", "Example of an internal economy (for example bulk buying or a large machine).", "External economies arise from the growth of the whole industry or area.", "Example of an external economy (for example a skilled labour pool or specialist suppliers).", "Internal economies are a movement along the LRAC curve; external economies shift the LRAC curve of all firms down."],
    modelAnswer: "Internal economies arise from the firm's own growth, for example bulk-buying discounts, and they are shown by a movement down along its LRAC curve. External economies arise when the whole industry in an area grows, for example a pool of skilled workers and specialist repair firms, and they shift the LRAC curve of every firm in the industry downward.",
    explanation: "Source of the saving and effect on the curve." });

  {
    const so = [80, 200, 330, 420, 460];
    const lr = so.map((q, i) => ((i + 1) * 8000) / q);
    chk(lr.indexOf(Math.min(...lr)), 2);
    const md = table(["Scale (index)", "Total cost (US\\$)", "Output (units)"], so.map((q, i) => [i + 1, (i + 1) * 8000, q]));
    chk(lr[1], 80, 1e-9);
    const og = pctChange(200, 330), ig = pctChange(2, 3);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["LRAC = total cost ÷ output.", "Compare the percentage change in inputs (cost) with that in output."],
      stem: `A fictional bakery can choose five scales of operation in the long run. Each step up uses more of every input at constant input prices (illustrative data).\n\n${md}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: lr[1], dp: 2, stem: "Calculate the long-run average cost at scale 2.", wrong: [16000, 40, 8000], explanation: "16,000 ÷ 200 = US\\$80.00." }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: og, dp: 1, unit: "%", stem: "From scale 2 to scale 3 total cost rises by 50%. Calculate the percentage rise in output.", wrong: [50, 39.4, 65], explanation: "(330 − 200) ÷ 200 × 100 = 65%." }),
        P.mcq({ label: "(c)", marks: 1, stem: "Between scale 3 and scale 4, the data show", options: [["decreasing returns to scale", "Correct: cost rises 33.3% but output rises only 27.3%."], ["increasing returns to scale", "Output rises by less than cost."], ["constant returns to scale", "The percentage rises are not equal."], ["external economies of scale", "These shift the whole curve and are not shown by this table."]], answer: "A", explanation: "Total cost rises from 24,000 to 32,000 (+33.3%); output rises from 330 to 420 (+27.3%)." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain **one** reason why a bakery might experience diseconomies of scale at a very large size.", points: ["A cause identified (communication, coordination or motivation).", "Explanation of how it works in a large organisation.", "Link to higher average cost per unit."],
          modelAnswer: "In a very large bakery there are many layers of management, so communication is slow and instructions are distorted. Mistakes and waste increase, and workers who feel remote from the owners may work less carefully, so cost per loaf rises." }),
      ],
      explanation: "LRAC at scale 2 is US\\$80; output rises 65% when cost rises 50%; from scale 3 to 4 returns are decreasing." });
  }
  {
    const o = [100, 200, 300, 400, 500];
    const l = [90, 72, 62, 66, 78];
    const f = ((l[0] - l[2]) / l[0]) * 100;
    chk(1200 / 300, 4);
    const md = table(["Output (thousand tonnes)", "LRAC (US\\$ per tonne)"], o.map((q, i) => [q, l[i]]));
    b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, hints: ["The minimum efficient scale is where LRAC is lowest.", "Market size ÷ minimum efficient scale."],
      stem: `A fictional cement producer can choose among five plant sizes in the long run. The table shows the lowest average cost at which each output can be produced (illustrative data). The total market is 1,200 thousand tonnes a year.\n\n${md}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "pct", value: f, dp: 1, unit: "%", stem: "Calculate the percentage fall in long-run average cost when output rises from 100 to 300 thousand tonnes.", wrong: [28, 45, 31], explanation: "(90 − 62) ÷ 90 × 100 = 31.1%." }),
        P.num({ label: "(b)", marks: 1, kind: "plain", value: 4, unit: "units", stem: "How many plants can operate at the minimum efficient scale of 300 thousand tonnes in this market?", wrong: [3, 5, 300], explanation: "1,200 ÷ 300 = 4." }),
        P.mcq({ label: "(c)", marks: 1, stem: "The rise in LRAC from 300 to 500 thousand tonnes shows", options: [["diseconomies of scale", "Correct: average cost rises as scale rises."], ["economies of scale", "Economies would lower LRAC."], ["diminishing marginal returns", "This short-run law concerns one variable factor."], ["an external economy of scale", "External economies shift the curve downwards."]], answer: "A", explanation: "LRAC rises from 62 to 78, so diseconomies of scale." }),
        P.manual({ label: "(d)", marks: 4, stem: "Explain **two** possible reasons for the fall in LRAC between 100 and 300 thousand tonnes.", points: ["First economy of scale identified (for example technical).", "Explained as lower cost per tonne from larger kilns or continuous production.", "Second economy identified (for example purchasing or managerial).", "Explained as discounts on fuel and materials, or specialist managers."],
          modelAnswer: "Technical economies: larger kilns and continuous production lower the cost per tonne because the capital cost is spread over more output. Purchasing economies: a larger plant buys fuel and limestone in bulk and obtains discounts, so each tonne costs less." }),
        P.manual({ label: "(e)", marks: 4, stem: "Explain how the minimum efficient scale in relation to the size of the market affects the number of firms in an industry.", points: ["Minimum efficient scale is the output at which LRAC is lowest.", "Market size ÷ MES gives the number of firms that can all reach the lowest cost (here 4).", "A large MES relative to the market leaves room for few firms (concentrated, possibly a natural monopoly).", "Smaller firms have higher costs and find it hard to compete: a barrier to entry."],
          modelAnswer: "Minimum efficient scale is the lowest output at which average cost is at its minimum. Dividing the market by the MES shows how many firms can reach it: in this market 1,200 ÷ 300 = 4. If MES were a larger share of the market, fewer firms could survive and the industry would be concentrated or a natural monopoly. A new firm producing a smaller output would have higher average costs than the established firms, so the large MES acts as a barrier to entry." }),
      ],
      explanation: "LRAC falls 31.1% to the minimum at 300 thousand tonnes; four plants fit the market; beyond 300 diseconomies set in." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Consider both the gains from scale and the limits to them."],
    stem: "Assess whether large firms always have lower average costs than small firms.",
    points: ["Economies of scale (technical, purchasing, financial, managerial) can lower the average cost of large firms.", "The gain applies only up to the minimum efficient scale.", "Beyond it, diseconomies (communication, coordination, motivation) can raise average cost.", "Small firms may be flexible, close to customers and have low overheads.", "The importance of scale depends on the industry: large in cement or electricity, small in hairdressing.", "External economies can help small firms in a cluster.", "A large firm may use its size to charge higher prices instead of passing on cost savings.", "A justified judgement."],
    levels: LV8, wordLimit: { min: 100, max: 300 },
    modelAnswer: "Large firms can enjoy technical, purchasing, financial and managerial economies of scale, so their average cost can be lower than that of small firms. But the saving applies only up to the minimum efficient scale. Beyond this point communication, coordination and motivation problems can lead to diseconomies and a rising average cost. The importance of scale also depends on the industry: it is large in cement or electricity, where the minimum efficient scale is large, but small in hairdressing, where small firms can reach the lowest cost. Small firms may have low overheads and be flexible, and those in an industrial cluster share external economies. Overall, large firms do not always have lower costs: they do so in industries with large economies of scale and only up to the point where diseconomies begin.",
    explanation: "Economies of scale are limited by the MES and by diseconomies; the effect varies by industry." });

  b.card("DEFINITION", "Define **economies of scale**.", "Falls in long-run average cost that result from an increase in the scale of output.");
  b.card("DEFINITION", "Define **returns to scale**.", "The change in output when all inputs are increased in the same proportion in the long run (increasing, constant or decreasing).");
  b.card("DEFINITION", "What is **minimum efficient scale**?", "The lowest level of output at which long-run average cost is at its minimum.");
  b.card("CONCEPT", "Name six internal economies of scale.", "Technical, managerial, financial, marketing, purchasing (bulk buying) and risk-bearing.");
  b.card("CONCEPT", "Internal versus external economies of scale?", "Internal: from the firm's own growth (movement along LRAC). External: from the growth of the industry in an area (shift down of LRAC for all firms).");
  b.card("CONCEPT", "Name three internal diseconomies of scale.", "Communication problems, coordination and control problems, poor motivation and industrial relations.");
  b.card("FACT", "What does a high minimum efficient scale relative to the market imply?", "Few firms can reach the lowest cost: a concentrated industry or natural monopoly.");
  b.card("FACT", "If inputs rise 20% and output rises 30%, what are the returns to scale?", "Increasing returns to scale (output rises by a larger percentage).");
  b.card("CONCEPT", "Why is diminishing returns not the same as decreasing returns to scale?", "Diminishing returns: one variable factor, others fixed (short run). Decreasing returns to scale: all factors changed together (long run).");
});
