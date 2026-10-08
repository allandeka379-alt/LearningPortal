// W1b: econ.elasticity.ped-revenue — PED, spending and total revenue; significance for decision-makers.
import { concept, P, elasticity, money, table, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};
const f2 = (v) => v.toFixed(2).replace("-", "−");
const TRC = ["rises", "falls", "does not change"];

concept("econ.elasticity.ped-revenue", { file: "elasticity/ped-revenue", keyPrefix: "elasticity.ped-revenue" }, (b) => {
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Demand for a good is price inelastic. What happens to total revenue if the firm raises its price?",
    options: [
      ["It rises", "Correct: quantity falls by a smaller percentage than price rises."],
      ["It falls", "Revenue falls after a price rise only when demand is elastic."],
      ["It stays the same", "Revenue is unchanged only when demand is unitary elastic."],
      ["It falls to zero", "Only perfectly elastic demand would make sales fall to zero."],
    ],
    answer: "A",
    explanation: "With inelastic demand, the price effect outweighs the quantity effect: price and revenue move in the same direction.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A firm cuts its price and its total revenue rises. What does this suggest about demand for its product?",
    options: [
      ["It is price elastic", "Correct: the rise in quantity more than offsets the lower price."],
      ["It is price inelastic", "With inelastic demand, a price cut lowers revenue."],
      ["It is unitary elastic", "With unitary elasticity, revenue would not change."],
      ["It is perfectly inelastic", "Quantity would not change, so revenue would fall."],
    ],
    answer: "A",
    explanation: "Price down, revenue up: price and revenue moved in opposite directions, so demand is elastic.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "How is a firm's **total revenue** calculated?",
    options: [
      ["Price × quantity sold", "Correct."],
      ["Price − cost per unit", "This is profit per unit."],
      ["Quantity sold ÷ price", "Revenue multiplies, not divides."],
      ["Total revenue − total cost", "This is profit."],
    ],
    answer: "A",
    explanation: "TR = price × quantity sold. It equals consumers' total spending on the good.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A government wants to raise as much tax revenue as possible from a new tax on a good. Which good should it choose?",
    options: [
      ["A good with price inelastic demand, such as fuel", "Correct: sales fall only a little, so the tax is paid on most units."],
      ["A good with price elastic demand, such as one brand of soap", "Sales would fall sharply, shrinking the tax base."],
      ["A good with many close substitutes", "Consumers would switch away, so little tax is collected."],
      ["A luxury good that consumers can easily do without", "Demand for such goods is elastic, so sales would fall a lot."],
    ],
    answer: "A",
    hints: ["Tax revenue = tax per unit × units sold after the tax."],
    explanation: "Inelastic demand keeps sales high after the tax, so more tax is collected.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Workers in a factory making a product with very **inelastic** demand ask for a pay rise. Why are they in a strong bargaining position?",
    options: [
      ["The firm can pass the cost on in higher prices without losing many sales", "Correct: inelastic demand means price rises cut sales little, so jobs are safer."],
      ["Inelastic demand means the firm's production costs are always low", "PED is about consumers' responses, not the firm's costs."],
      ["Consumers will buy more of the product if workers' wages rise", "Higher wages do not raise demand for the product."],
      ["The firm's revenue falls whenever it raises the price of its product", "With inelastic demand revenue rises after a price rise."],
    ],
    answer: "A",
    hints: ["Think about what happens to sales if the firm raises its price to pay for the wage rise."],
    explanation: "With inelastic demand, higher prices hardly reduce sales, so a wage rise is less likely to cost jobs.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A government taxes cigarettes to **reduce smoking**. Demand for cigarettes is very price inelastic. Which outcome is most likely?",
    options: [
      ["Tax revenue is high but smoking falls only a little", "Correct: inelastic demand means quantity barely responds to the higher price."],
      ["Smoking falls sharply and tax revenue is low", "That would happen if demand were elastic."],
      ["Smoking rises because cigarettes are more expensive", "A higher price does not increase quantity demanded."],
      ["Tax revenue falls to zero as smokers stop buying", "Inelastic demand means most smokers keep buying."],
    ],
    answer: "A",
    hints: ["The tax works through price; how much does quantity respond?"],
    explanation: "With inelastic demand the tax raises much revenue but does little to cut consumption, so other measures (health campaigns, bans on advertising) are also needed.",
  });

  // Calculations.
  const a = { p1: 6, p2: 5, q1: 300, q2: 390 };
  const ea = elasticity.ped(a), tr1 = a.p1 * a.q1, tr2 = a.p2 * a.q2;
  check("ea", ea, -1.8);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: tr2 - tr1,
    stem: "A fictional car wash in Bulawayo cuts its price from US\\$6 to US\\$5. Washes per week rise from 300 to 390. Calculate the change in its total weekly revenue. Give a fall as a negative number.",
    wrong: [-(tr2 - tr1), tr2],
    hints: ["TR = price × quantity, before and after.", "Change = new TR − old TR."],
    explanation: `1. TR before = 6 × 300 = ${money(tr1)}.\n2. TR after = 5 × 390 = ${money(tr2)}.\n3. Change = ${money(tr2)} − ${money(tr1)} = **${money(tr2 - tr1)}**.\n4. PED = +30% ÷ −16.67% = ${f2(ea)}: demand is elastic, so the price cut raises revenue.`,
  });
  const c = { p1: 0.5, p2: 0.6, q1: 4000, q2: 3800 };
  const ec = elasticity.ped(c), t1 = c.p1 * c.q1, t2 = c.p2 * c.q2;
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: t2, daily: true,
    stem: "A fictional bakery raises the price of a bun from US\\$0.50 to US\\$0.60 and its daily sales fall from 4,000 to 3,800 buns. What is its total daily revenue from buns **after** the price rise?",
    wrong: [t1, 0.6 * 4000],
    explanation: `TR after = 0.60 × 3,800 = **${money(t2)}** (up from ${money(t1)}): demand is inelastic (PED ${f2(ec)}), so revenue rises.`,
  });
  const cin = { p1: 4, p2: 5, q1: 1500, q2: 1350 };
  const ecin = elasticity.ped(cin);
  b.num({
    d: 3, skill: "APPLICATION", kind: "elasticity", value: ecin,
    stem: "A fictional cinema in Gweru raises its ticket price from US\\$4 to US\\$5 and weekly attendance falls from 1,500 to 1,350. Calculate the PED. Include the minus sign and give your answer to two decimal places.",
    wrong: [1 / ecin, -ecin],
    hints: ["% change in quantity = (1,350 − 1,500) ÷ 1,500 × 100."],
    explanation: `% change in quantity = −10%; % change in price = +25%; PED = −10 ÷ 25 = **${f2(ecin)}**: inelastic, so the cinema's revenue rises (from ${money(4 * 1500)} to ${money(5 * 1350)}).`,
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "If demand is unitary elastic, a change in price leaves total revenue unchanged.",
    answer: true,
    explanation: "True. The percentage change in quantity exactly offsets the percentage change in price.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "If a firm's total revenue rises after a price cut, its profit must also rise.",
    answer: false,
    hints: ["What else changes when a firm sells more?"],
    explanation: "False. Selling more also raises costs. Profit rises only if the extra revenue is greater than the extra cost.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    stem: "Match each situation with its effect on total revenue.",
    pairs: [
      ["Price rise, demand inelastic", "Total revenue rises"],
      ["Price rise, demand elastic", "Total revenue falls"],
      ["Price cut, demand unitary elastic", "Total revenue is unchanged"],
    ],
    hints: ["Inelastic: price and revenue same direction. Elastic: opposite directions."],
    explanation: "Inelastic: same direction; elastic: opposite; unitary: no change.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "When demand is price elastic, a price cut causes total revenue to {{blank:a}}. When demand is price inelastic, a price cut causes total revenue to {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["rise"], choices: ["rise", "fall", "stay the same"] },
      { id: "b", accepted: ["fall"], choices: ["rise", "fall", "stay the same"] },
    ],
    wrong: [["fall", "rise"]],
    explanation: "Elastic: the extra quantity outweighs the lower price. Inelastic: it does not.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Using the idea of a revenue rectangle, describe the diagram that shows why a price cut **reduces** total revenue when demand is inelastic.",
    points: [
      "A steep demand curve with price on the vertical axis and quantity on the horizontal axis.",
      "Revenue before = rectangle P1 × Q1; after = rectangle P2 × Q2.",
      "Area lost: the price fall (P1 − P2) on the units already sold (a wide, short rectangle).",
      "Area gained: the small extra quantity (Q2 − Q1) at P2 (a thin rectangle), smaller than the area lost.",
    ],
    modelAnswer: "Draw a steep demand curve. At P1 revenue is the rectangle P1 × Q1. When the price falls to P2, revenue is P2 × Q2. The firm loses the strip (P1 − P2) × Q1, because every unit it was already selling now earns less. It gains only the narrow strip (Q2 − Q1) × P2, because the steep curve means quantity rises a little. The area lost is bigger than the area gained, so revenue falls.",
    hints: ["Compare the area lost with the area gained."],
    explanation: "Revenue is the rectangle under the demand curve; compare the area lost and the area gained.",
  });

  // Structured 1: revenue from a demand schedule.
  const pr = [1.2, 1.8, 2.4, 3.0, 3.6], qd = [880, 720, 560, 400, 280];
  const tr = pr.map((p, i) => p * qd[i]);
  const tt = table(["Price per kg (US\\$)", "Quantity demanded (kg per day)"], pr.map((p, i) => [p.toFixed(2), qd[i]]));
  const best = pr[tr.indexOf(Math.max(...tr))];
  check("best", best, 2.4);
  const e12 = elasticity.ped({ p1: pr[0], p2: pr[1], q1: qd[0], q2: qd[1] });
  const e45 = elasticity.ped({ p1: pr[3], p2: pr[4], q1: qd[3], q2: qd[4] });
  const D = (v) => "US\\$" + v.toFixed(2);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 12, calculator: true,
    stem: `A fictional fish trader at Kariba estimates the daily demand for her dried fish.\n\n${tt}`,
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "money", value: tr[2], stem: `Calculate total revenue at ${D(pr[2])} per kg.`, wrong: [tr[1]], explanation: `${pr[2].toFixed(2)} × ${qd[2]} = ${money(tr[2])}.` }),
      P.num({ label: "(b)", marks: 1, kind: "money", value: best, stem: "At which price is total revenue the highest?", wrong: [pr[4], pr[0]], explanation: `TR: ${pr.map((p, i) => `${D(p)} → ${money(tr[i])}`).join("; ")}. Highest at ${D(best)}.` }),
      P.num({ label: "(c)", marks: 2, kind: "elasticity", value: e12, stem: `Calculate the PED when the price rises from ${D(pr[0])} to ${D(pr[1])}. Include the minus sign and give your answer to two decimal places.`, wrong: [1 / e12, -e12], explanation: `(720 − 880) ÷ 880 × 100 = −18.18%; (1.80 − 1.20) ÷ 1.20 × 100 = 50%; PED = −18.18 ÷ 50 = ${f2(e12)}.` }),
      P.num({ label: "(d)", marks: 2, kind: "elasticity", value: e45, stem: `Calculate the PED when the price rises from ${D(pr[3])} to ${D(pr[4])}. Include the minus sign and give your answer to two decimal places.`, wrong: [1 / e45, -e45], explanation: `(280 − 400) ÷ 400 × 100 = −30%; (3.60 − 3.00) ÷ 3.00 × 100 = 20%; PED = −30 ÷ 20 = ${f2(e45)}.` }),
      P.manual({
        label: "(e)", marks: 6, levels: LV(6),
        stem: `The trader currently charges ${D(pr[4])} per kg. Discuss whether she should lower her price.`,
        points: [
          `At high prices demand is elastic (PED ${f2(e45)}), so a price cut would raise revenue (${D(pr[4])} → ${money(tr[4])}; ${D(pr[3])} → ${money(tr[3])}).`,
          `Revenue is maximised at ${D(best)} (${money(tr[2])}); below this demand becomes inelastic and revenue falls.`,
          "But she sells more fish at a lower price, so her costs (buying, drying, transport) rise.",
          `Her supply may be limited (she may not have ${qd[2]} kg a day to sell).`,
          "Rivals may react by cutting their own prices, so the estimated demand may not hold.",
          `Justified conclusion (e.g. cut to about ${D(best)}–${D(pr[3])} if extra fish can be supplied at low cost).`,
        ],
        modelAnswer: `At ${D(pr[4])} demand is elastic (PED ${f2(e45)}), so lowering the price would raise revenue: from ${money(tr[4])} to ${money(tr[3])} at ${D(pr[3])} and ${money(tr[2])} at ${D(pr[2])}, the revenue-maximising price in the table. At lower prices demand becomes inelastic and revenue would fall. However, selling twice as much fish raises her costs of buying and drying it, so profit may rise less than revenue, and she may not be able to obtain ${qd[2]} kg a day. Other traders might also cut their prices. On balance she should lower her price towards ${D(best)}–${D(pr[3])} if she can supply the extra fish at a cost well below the price.`,
        explanation: "Use the PED values and revenue figures, then weigh costs and supply limits.",
      }),
    ],
    hints: ["TR = price × quantity at each row.", "Elasticity changes along a straight demand curve: compare (c) and (d)."],
    explanation: "Revenue is highest where demand changes from elastic to inelastic.",
  });

  // Structured 2: government and PED.
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, marks: 8,
    stem: "A fictional government is choosing between two new taxes to raise revenue: a tax on fuel (estimated PED −0.2) or a tax on restaurant meals (estimated PED −1.6).",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which tax is likely to raise more revenue, if both are set at the same percentage?",
        options: [["The fuel tax", "Correct: demand is inelastic, so sales fall only a little."], ["The restaurant-meals tax", "Elastic demand means sales fall sharply, shrinking the tax base."], ["Both raise the same", "Different PEDs mean different falls in sales."], ["Neither raises any revenue", "Both raise some revenue; the question is how much."]],
        answer: "A",
        explanation: "Inelastic demand keeps the tax base large.",
      }),
      P.manual({
        label: "(b)", marks: 6, levels: LV(6),
        stem: "Discuss whether the government should choose the fuel tax.",
        points: [
          "For: demand is inelastic, so revenue is high and predictable.",
          "For: may reduce pollution a little / encourage efficient vehicles over time.",
          "Against: fuel is a cost for transport and farming, so prices of many goods rise (cost-push).",
          "Against: hits poorer households and rural areas hard (regressive).",
          "Restaurant tax falls on a luxury but raises less, and may cost jobs in restaurants.",
          "Justified conclusion.",
        ],
        modelAnswer: "The fuel tax would raise far more because demand is inelastic: drivers and firms keep buying fuel, so the tax base stays large and revenue is predictable. It may also slightly reduce pollution over time. But fuel is used to transport food and goods, so the tax would raise prices across the economy and hit poor and rural households hardest. The restaurant tax falls mainly on better-off consumers, but because demand is elastic it would raise little revenue and could cost restaurant jobs. On balance, if the main aim is revenue the fuel tax is more effective, but the government might set a lower rate or protect public transport to reduce its unfair effects.",
        explanation: "Weigh revenue (PED) against fairness and wider effects; conclude.",
      }),
      P.tf({ label: "(c)", stem: "The fuel tax is likely to cut fuel consumption sharply.", answer: false, explanation: "False: with PED −0.2, a 10% price rise cuts quantity by only about 2%." }),
    ],
    hints: ["Which PED keeps sales, and so the tax base, high?"],
    explanation: "Governments raise most revenue by taxing goods with inelastic demand, but must consider who pays.",
  });

  b.card("FORMULA", "Formula for **total revenue**?", "TR = price × quantity sold (equal to consumers' spending on the good).");
  b.card("FACT", "Price rise with **inelastic** demand: effect on revenue?", "Total revenue rises.");
  b.card("FACT", "Price rise with **elastic** demand: effect on revenue?", "Total revenue falls.");
  b.card("FACT", "Price change with **unitary** elastic demand: effect on revenue?", "No change in total revenue.");
  b.card("CONCEPT", "Rule linking price, revenue and PED?", "Inelastic: price and revenue move in the same direction. Elastic: opposite directions.");
  b.card("CONCEPT", "Why do governments tax goods with inelastic demand?", "Sales fall only a little, so the tax raises a lot of revenue.");
  b.card("CONCEPT", "Why does inelastic demand for their product help workers seeking a pay rise?", "The firm can pass on higher costs in prices without losing many sales, so jobs are safer.");
  b.card("CONCEPT", "How is total revenue shown on a demand diagram?", "As the rectangle under a point on the curve: price (height) × quantity (width).");
});
