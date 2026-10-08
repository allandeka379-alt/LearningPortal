// W3a: Cambridge 0455 Paper 2 Section B x1 (STRUCTURED 20 = 2/4/6/8, EVALUATION): a horizontal merger of two bus
// companies. Fictional data, computed and checked here.
import { concept, P, CAM, check, fmt, pctChange } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};
const nested = (label, marks, stem, subs) => ({ part: { label, type: "STRUCTURED", marks, stem, parts: subs.map((x) => x.part) }, model: null, wrong: [] });

concept("econ.firms.size-mergers", { file: "exam/w3a-cambridge", keyPrefix: "exam.w3a-cambridge", applies: CAM }, (b) => {
  {
    const x = 18, y = 12, others = 20, tot = x + y + others, share = ((x + y) / tot) * 100;
    const acX = 0.8, acNew = 0.72, acCh = pctChange(acX, acNew);
    check("tot", tot, 50); check("share", share, 60); check("acCh", acCh, -10);
    const b1 = P.num({
      label: "(i)", marks: 2, kind: "pct", value: share,
      stem: "Calculate the market share of the merged company, to one decimal place.",
      wrong: [(x / tot) * 100, ((x + y) / others) * 100],
      explanation: `Combined journeys = ${x} + ${y} = ${x + y} million out of ${tot} million; ${x + y} ÷ ${tot} × 100 = ${fmt(share, 1)}%.`,
    });
    const b2 = P.manual({
      label: "(ii)", marks: 2,
      stem: "Explain **one** economy of scale the merged company might gain.",
      points: ["Identifies an economy of scale (e.g. purchasing: buying fuel, tyres or buses in bulk; technical; managerial; financial).", "Explains how it lowers average cost per passenger journey."],
      modelAnswer: "Purchasing economies: the larger company can buy diesel, tyres and new buses in bulk at a discount, so the cost per passenger journey falls.",
    });
    const c1 = P.mcq({
      label: "(i)", marks: 1,
      stem: "The merged company plans to close one of the two bus depots in the capital city. Which type of saving is this?",
      options: [["Removing duplicated facilities", "Correct: two depots doing the same job become one."], ["A purchasing economy", "Purchasing economies come from bulk buying."], ["A risk-bearing economy", "That comes from diversification."], ["An external economy of scale", "This saving comes from the firm's own merger: it is internal."]],
      answer: "A",
      explanation: "Closing a duplicate depot removes duplication, a common cost saving from a horizontal merger.",
    });
    const c2 = P.num({
      label: "(ii)", marks: 2, kind: "pct", value: acCh,
      stem: `Company X's average cost is US\\$${acX.toFixed(2)} per passenger journey. The merged company expects an average cost of US\\$${acNew.toFixed(2)}. Calculate the percentage change in average cost compared with Company X, to one decimal place. Give a fall as a negative number.`,
      wrong: [pctChange(acNew, acX), -acCh],
      explanation: `(${acNew.toFixed(2)} − ${acX.toFixed(2)}) ÷ ${acX.toFixed(2)} × 100 = ${fmt(acCh, 1)}%.`,
    });
    const c3 = P.manual({
      label: "(iii)", marks: 3,
      stem: "Analyse why the merger might lead to higher fares, despite the fall in average cost.",
      points: [
        "The merged company would have 60% of the market: less competition / fewer rivals.",
        "Passengers on many routes would have no alternative operator, so demand for its services becomes less price elastic.",
        "So the company can raise fares to increase profit rather than pass on the cost savings.",
      ],
      modelAnswer: "With 60% of all journeys and fewer rivals, the merged company faces much less competition. On many routes passengers would have no other operator to switch to, so demand becomes less price elastic. The company could then raise fares to increase its profit, keeping the cost savings for its shareholders instead of passing them on.",
    });
    const q = b.struct({
      d: 5, skill: "EVALUATION", examStyle: true, secs: 1260, calculator: true, paper: "Paper 2 Section B",
      concepts: ["econ.firms.size-mergers", "econ.firms.economies-of-scale", "econ.structures.monopoly", "econ.structures.competitive-markets"],
      stem: `In a fictional country, intercity bus travel is provided by two large private companies and eight small operators. Each year Company X carries ${x} million passenger journeys, Company Y carries ${y} million and the eight small operators together carry ${others} million. Companies X and Y have announced a merger. They say that the merged company will lower costs by buying fuel and buses in bulk and by closing duplicated depots and offices. Passenger groups fear that fares will rise.`,
      parts: [
        P.fib({
          label: "(a)", marks: 2,
          stem: "Complete the definition.",
          template: "A horizontal merger is the joining together of firms at the {{blank:a}} stage of production in the {{blank:b}} industry.",
          blanks: [
            { id: "a", accepted: ["same"], choices: ["same", "next", "first"] },
            { id: "b", accepted: ["same"], choices: ["same", "a different", "an unrelated"] },
          ],
          wrong: [["next", "a different"]],
          explanation: "Two bus companies are at the same stage of the same industry: a horizontal merger.",
        }),
        nested("(b)", 4, "Use the information above.", [b1, b2]),
        nested("(c)", 6, "Use the information above.", [c1, c2, c3]),
        P.manual({
          label: "(d)", marks: 8, levels: LV(8),
          stem: "Discuss whether the merger will benefit bus passengers.",
          points: [
            "Benefit: economies of scale (bulk buying, closing duplicate depots) lower average cost (by 10% against Company X).",
            "Benefit: lower costs could be passed on as lower fares; more investment in newer, safer buses and better timetables.",
            "Harm: 60% market share reduces competition; the company may raise fares and keep savings as profit.",
            "Harm: fewer routes or departures where depots close; less choice; less pressure to improve service.",
            "Harm: possible diseconomies of scale (co-ordination problems) may raise costs.",
            "Depends on the strength of the eight small operators / ease of entry and on whether the government regulates fares or investigates the merger.",
            "Considers that passengers on routes served only by X and Y are most at risk.",
            "Justified conclusion.",
          ],
          modelAnswer: "The merger could benefit passengers if the merged company gains economies of scale: buying fuel and buses in bulk and closing duplicated depots should cut average cost, by 10% compared with Company X, and these savings could be passed on as lower fares or used to buy newer, safer buses and run better timetables. However, the merged company would carry 60% of all journeys, so competition would fall sharply. Where passengers have no other operator, it could raise fares and keep the savings as profit, cut departures where depots close and have less pressure to improve service; a much larger company might also suffer diseconomies of scale. Whether passengers gain depends on whether the eight small operators can expand and new operators can enter, and on whether the government regulates fares or sets conditions on the merger. Without such conditions, the loss of competition is likely to outweigh the cost savings, so passengers are more likely to lose than gain.",
        }),
      ],
      explanation: `Combined market share ${fmt(share, 1)}%; average cost ${fmt(acCh, 1)}% compared with Company X. Economies of scale could lower fares, but reduced competition could raise them.`,
      hints: ["Market share = firm's journeys ÷ total journeys × 100.", "Weigh cost savings against market power."],
    });
    q.modelResponse.parts["(b)(i)"] = b1.model;
    q.wrongResponses[0].parts["(b)(i)"] = b1.wrong[0];
    q.modelResponse.parts["(c)(i)"] = c1.model;
    q.wrongResponses[0].parts["(c)(i)"] = c1.wrong[0];
    q.modelResponse.parts["(c)(ii)"] = c2.model;
    q.wrongResponses[0].parts["(c)(ii)"] = c2.wrong[0];
  }
});
