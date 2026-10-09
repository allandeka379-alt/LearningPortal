// W1b: econ.elasticity.ped — definition, formula, calculation, interpretation and curves.
import { concept, P, elasticity, pctChange, table, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};
const f2 = (v) => v.toFixed(2).replace("-", "−");

concept("econ.elasticity.ped", { file: "elasticity/ped", keyPrefix: "elasticity.ped" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does **price elasticity of demand** measure?",
    options: [
      ["How responsive quantity demanded is to a change in the good's own price", "Correct."],
      ["How responsive quantity demanded is to a change in consumers' income", "That is income elasticity of demand."],
      ["How responsive quantity supplied is to a change in the good's own price", "That is price elasticity of supply."],
      ["How much the price of a good changes over a year", "PED compares the response of quantity to a price change; it is not a measure of inflation."],
    ],
    answer: "A",
    explanation: "PED measures the responsiveness of quantity demanded to a change in the good's own price.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which formula gives price elasticity of demand?",
    options: [
      ["% change in quantity demanded ÷ % change in price", "Correct."],
      ["% change in price ÷ % change in quantity demanded", "This is upside down: it gives the reciprocal of PED."],
      ["Change in quantity demanded ÷ change in price", "Absolute changes depend on the units; PED uses percentage changes."],
      ["% change in quantity supplied ÷ % change in price", "That is PES."],
    ],
    answer: "A",
    explanation: "PED = percentage change in quantity demanded ÷ percentage change in price.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The PED for a good is −0.3. Demand for the good is",
    options: [
      ["price inelastic.", "Correct: ignoring the sign, 0.3 is less than 1."],
      ["price elastic.", "Elastic demand has a value greater than 1 (ignoring the sign)."],
      ["unitary elastic.", "Unitary elasticity is exactly 1."],
      ["perfectly inelastic.", "Perfectly inelastic demand has a PED of 0."],
    ],
    answer: "A",
    explanation: "|−0.3| = 0.3 < 1: quantity demanded changes by a smaller percentage than price, so demand is **inelastic**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A demand curve is a horizontal straight line. What is the PED along it?",
    options: [
      ["Infinity (perfectly elastic)", "Correct: any rise above that price makes quantity demanded fall to zero."],
      ["Zero (perfectly inelastic)", "Perfectly inelastic demand is shown by a vertical line."],
      ["One (unitary elastic)", "Unitary elasticity is a curve along which spending is constant."],
      ["Between zero and one", "Inelastic demand is shown by a steep, not horizontal, curve."],
    ],
    answer: "A",
    explanation: "A horizontal demand curve is **perfectly elastic**: PED is infinite.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which describes demand that is **unitary elastic**?",
    options: [
      ["Quantity demanded changes by the same percentage as price", "Correct: PED = 1 (ignoring the sign)."],
      ["Quantity demanded does not change when price changes", "That is perfectly inelastic demand."],
      ["Quantity demanded changes by a larger percentage than price", "That is elastic demand."],
      ["Quantity demanded rises when price rises", "That breaks the law of demand; PED would be positive."],
    ],
    answer: "A",
    explanation: "Unitary elastic: % change in quantity = % change in price, so PED = −1.",
  });

  // Calculations with different data from the lesson.
  const c1 = { p1: 2.5, p2: 3.0, q1: 800, q2: 720 };
  const e1 = elasticity.ped(c1);
  check("e1", e1, -0.5);
  b.num({
    d: 2, skill: "APPLICATION", kind: "elasticity", value: e1, daily: true,
    stem: `The price of a 2 kg bag of sugar rises from US\\$2.50 to US\\$3.00 and weekly sales at a fictional shop fall from 800 to 720 bags. Calculate the PED. Include the minus sign and give your answer to two decimal places.`,
    wrong: [1 / e1, -e1],
    explanation: `1. % change in quantity = (720 − 800) ÷ 800 × 100 = −10%.\n2. % change in price = (3.00 − 2.50) ÷ 2.50 × 100 = +20%.\n3. PED = −10 ÷ 20 = **${f2(e1)}**: demand is inelastic. Dividing price by quantity gives −2.00, the formula upside down.`,
  });
  const c2 = { p1: 12, p2: 9, q1: 400, q2: 700 };
  const e2 = elasticity.ped(c2);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "elasticity", value: e2,
    stem: `A fictional hair salon in Gweru cuts the price of a haircut from US\\$12 to US\\$9. The number of haircuts per month rises from 400 to 700. Calculate the PED. Include the minus sign and give your answer to two decimal places.`,
    wrong: [1 / e2, elasticity.fromPct(pctChange(700, 400), pctChange(9, 12)) * -1],
    hints: ["Use the original values (US\\$12 and 400) as the bases.", "PED = % change in quantity ÷ % change in price."],
    explanation: `1. % change in quantity = (700 − 400) ÷ 400 × 100 = +75%.\n2. % change in price = (9 − 12) ÷ 12 × 100 = −25%.\n3. PED = 75 ÷ −25 = **${f2(e2)}**: demand is elastic (other salons are close substitutes).\n4. A common error is dividing −25 by 75, giving ${f2(1 / e2)}.`,
  });
  const e3 = elasticity.fromPct(-6, 15);
  b.num({
    d: 2, skill: "APPLICATION", kind: "elasticity", value: Math.abs(e3),
    stem: "A 15% rise in the price of paraffin leads to a 6% fall in quantity demanded. Calculate the value of PED, **ignoring the sign**, to two decimal places.",
    wrong: [15 / 6, 9],
    explanation: `PED = −6 ÷ 15 = −0.40, so ignoring the sign the value is **${Math.abs(e3).toFixed(2)}** (inelastic). 2.50 comes from dividing 15 by 6.`,
  });
  const qc = -1.6 * 5;
  b.num({
    d: 3, skill: "APPLICATION", kind: "pct", value: qc,
    stem: "The PED for taxi rides in a fictional town is −1.6. Taxi fares rise by 5%. Calculate the percentage change in the quantity of taxi rides demanded. Include the minus sign for a fall and give your answer to one decimal place.",
    wrong: [-qc, 5 / -1.6],
    hints: ["Rearrange: % change in quantity = PED × % change in price."],
    explanation: `% change in quantity demanded = PED × % change in price = −1.6 × 5 = **${qc.toFixed(1)}%**.`,
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A PED of −1.5 shows that demand is price elastic.",
    answer: true,
    explanation: "True. Ignoring the sign, 1.5 > 1: quantity demanded changes by a larger percentage than price.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Perfectly inelastic demand is shown by a horizontal demand curve.",
    answer: false,
    explanation: "False. Perfectly inelastic demand (PED = 0) is a **vertical** curve; a horizontal curve is perfectly elastic.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each PED value (ignoring the sign) with its description.",
    pairs: [["0", "Perfectly inelastic"], ["0.6", "Inelastic"], ["1", "Unitary elastic"], ["2.4", "Elastic"]],
    explanation: "0: perfectly inelastic; between 0 and 1: inelastic; 1: unitary; greater than 1: elastic.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "When demand is price elastic, the percentage change in quantity demanded is {{blank:a}} than the percentage change in price, and the demand curve is relatively {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["greater"], choices: ["greater", "smaller"] },
      { id: "b", accepted: ["flat"], choices: ["flat", "steep"] },
    ],
    wrong: [["smaller", "steep"]],
    explanation: "Elastic: quantity responds more than proportionately; on the same axes the curve is flatter.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "The price of a good falls by 20% and quantity demanded rises by 20%. Which statement is correct?",
    options: [
      ["Demand is unitary elastic", "Correct: 20 ÷ −20 = −1."],
      ["Demand is perfectly elastic", "Perfectly elastic demand has an infinite PED."],
      ["Demand is inelastic", "Inelastic needs a smaller percentage change in quantity than in price."],
      ["Demand is elastic", "Elastic needs a larger percentage change in quantity than in price."],
    ],
    answer: "A",
    hints: ["Divide the two percentage changes."],
    explanation: "PED = +20 ÷ −20 = −1: unitary elastic.",
  });
  const c4 = { p1: 40, p2: 50, q1: 250, q2: 190 };
  const e4 = elasticity.ped(c4);
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A fictional bus company raises the fare from Harare to Mutare from US\\$40 to US\\$50, and the number of passengers per week falls from 250 to 190. What is the PED (to two decimal places)?",
    options: [
      [f2(e4), "Correct: −24% ÷ 25% = −0.96."],
      [f2(1 / e4), "This divides the price change by the quantity change: the formula upside down."],
      [f2(pctChange(250, 190) / pctChange(50, 40) * -1), "This uses the new fare (US\\$50) as the base for the price change."],
      [f2(-60 / 10), "This divides the absolute changes (−60 passengers ÷ US\\$10) instead of percentages."],
    ],
    answer: "A",
    hints: ["% change in quantity = (190 − 250) ÷ 250 × 100.", "% change in price = (50 − 40) ÷ 40 × 100."],
    explanation: `% change in quantity = −60 ÷ 250 × 100 = −24%; % change in price = 10 ÷ 40 × 100 = 25%; PED = −24 ÷ 25 = **${f2(e4)}**: demand is slightly inelastic.`,
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the demand curves for perfectly inelastic and perfectly elastic demand, and give an example of when each might occur.",
    points: [
      "Perfectly inelastic: a vertical demand curve (quantity does not change with price).",
      "Example, e.g. an essential medicine needed in a fixed dose.",
      "Perfectly elastic: a horizontal demand curve (any price rise means quantity falls to zero).",
      "Example, e.g. one small farmer selling an identical product at the market price.",
    ],
    modelAnswer: "Perfectly inelastic demand is a vertical line: the same quantity is bought whatever the price, as with a life-saving medicine that patients need in a fixed dose. Perfectly elastic demand is a horizontal line at one price: if a seller charges more, buyers go elsewhere and quantity falls to zero, as for a small farmer selling identical maize at the going market price.",
    hints: ["Think about the slope of each curve on price–quantity axes."],
    explanation: "Shape and an example for each extreme.",
  });

  // Structured 1: data table of two goods.
  const goods = [["Cooking oil (2 litres)", 4, 5, 1200, 1080], ["Branded biscuits (packet)", 1.5, 1.8, 900, 600]];
  const peds = goods.map(([, p1, p2, q1, q2]) => elasticity.ped({ p1, p2, q1, q2 }));
  const t = table(["Good", "Old price (US\\$)", "New price (US\\$)", "Old weekly sales", "New weekly sales"], goods.map(([n, p1, p2, q1, q2]) => [n, p1.toFixed(2), p2.toFixed(2), q1, q2]));
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
    stem: `A fictional supermarket in Masvingo raised the prices of two goods. The table shows the effect on weekly sales.\n\n${t}`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "elasticity", value: peds[0], stem: "Calculate the PED for cooking oil. Include the minus sign and give your answer to two decimal places.", wrong: [1 / peds[0], -peds[0]], explanation: `(1,080 − 1,200) ÷ 1,200 × 100 = −10%; (5 − 4) ÷ 4 × 100 = 25%; PED = −10 ÷ 25 = ${f2(peds[0])}.` }),
      P.num({ label: "(b)", marks: 2, kind: "elasticity", value: peds[1], stem: "Calculate the PED for branded biscuits. Include the minus sign and give your answer to two decimal places.", wrong: [1 / peds[1], -peds[1]], explanation: `(600 − 900) ÷ 900 × 100 = −33.33%; (1.80 − 1.50) ÷ 1.50 × 100 = 20%; PED = −33.33 ÷ 20 = ${f2(peds[1])}.` }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Using your answers, compare the price elasticity of demand for the two goods and describe how their demand curves would differ.",
        points: [
          `Cooking oil: PED ${f2(peds[0])}, inelastic (quantity falls by a smaller % than price rises).`,
          `Biscuits: PED ${f2(peds[1])}, elastic (quantity falls by a larger % than price rises).`,
          "Cooking oil's demand curve is relatively steep.",
          "Biscuits' demand curve is relatively flat (drawn on the same scale).",
        ],
        modelAnswer: `Demand for cooking oil is inelastic (PED ${f2(peds[0])}): a 25% price rise cut sales by only 10%, because oil is a necessity. Demand for branded biscuits is elastic (PED ${f2(peds[1])}): a 20% rise cut sales by a third, because shoppers can switch to other brands. On the same axes, the cooking oil demand curve is steep and the biscuit demand curve is relatively flat.`,
        explanation: "Values, interpretation and the shapes of the curves.",
      }),
    ],
    hints: ["Use the old price and old sales as the bases.", "Compare the sizes of the two answers with 1."],
    explanation: "Calculate each PED with the percentage-change formula, then compare their sizes.",
  });

  // Structured 2: a firm uses a PED estimate; discuss.
  const est = -2.5, cut = -10;
  const dq = est * cut;
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, marks: 12,
    stem: `A fictional mobile network estimates that the PED for its data bundles is ${est}. It sells 50,000 bundles a week and is considering a ${Math.abs(cut)}% price cut.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "pct", value: dq, stem: "Calculate the expected percentage change in the quantity of bundles demanded. Give your answer to one decimal place.", wrong: [-dq, cut / est], explanation: `% change in quantity = PED × % change in price = ${est} × ${cut} = +${dq.toFixed(1)}%.` }),
      P.num({ label: "(b)", marks: 2, kind: "plain", value: 50000 * (1 + dq / 100), stem: "Calculate the expected number of bundles sold per week after the price cut.", wrong: [50000 * (1 - dq / 100), 50000 + dq], explanation: `50,000 × (1 + ${dq}/100) = ${(50000 * (1 + dq / 100)).toLocaleString("en-GB")} bundles.` }),
      P.manual({
        label: "(c)", marks: 2,
        stem: "Explain what the PED value tells the firm about its customers.",
        points: [
          "Demand is price elastic (2.5 > 1 ignoring the sign).",
          "Customers are very responsive to price, e.g. they can switch easily to rival networks.",
        ],
        modelAnswer: "Ignoring the sign, 2.5 is greater than 1, so demand is elastic: customers react strongly to price changes, probably because they can easily switch to another network's bundles.",
        explanation: "Interpret the size of the value and give a reason.",
      }),
      P.manual({
        label: "(d)", marks: 6, levels: LV(6),
        stem: "Discuss whether the firm can rely on its PED estimate when deciding to cut its price.",
        points: [
          "For: the estimate gives a clear prediction of a large rise in sales.",
          "For: if based on past price changes of the firm's own bundles, it may be accurate.",
          "Against: rival networks may also cut prices, so customers do not switch and sales rise less.",
          "Against: other conditions may change (incomes, new technology), so the estimate is out of date.",
          "Against: PED can differ for large and small price changes, or between customer groups.",
          "Justified conclusion (e.g. useful guide but test with a trial before relying on it).",
        ],
        modelAnswer: `The estimate predicts that a 10% cut would raise sales by ${dq}%, which is useful for planning. If it is based on how the firm's own customers reacted to past price changes, it may be fairly reliable. However, it assumes other things stay equal: if rival networks match the price cut, customers have no reason to switch and sales may rise far less. Incomes and tastes also change, so an estimate from last year may be out of date, and PED may differ for different customer groups or for larger price changes. On balance the estimate is a useful guide, but the firm should treat it as approximate, watch how rivals respond, and perhaps test the cut on one region first.`,
        explanation: "Weigh the usefulness of the estimate against the 'other things equal' assumption and conclude.",
      }),
    ],
    hints: ["% change in quantity = PED × % change in price.", "What does 'other things being equal' assume about rivals?"],
    explanation: "PED estimates predict responses only if other things stay equal.",
  });

  b.card("DEFINITION", "Define **price elasticity of demand**.", "A measure of the responsiveness of quantity demanded to a change in the good's own price.");
  b.card("FORMULA", "Formula for **PED**?", "% change in quantity demanded ÷ % change in price.");
  b.card("FORMULA", "How is a percentage change calculated?", "(new value − original value) ÷ original value × 100.");
  b.card("FACT", "Why is PED usually negative?", "Price and quantity demanded move in opposite directions (law of demand).");
  b.card("CONCEPT", "PED between 0 and 1 (ignoring the sign) means…", "Inelastic demand: quantity changes by a smaller percentage than price.");
  b.card("CONCEPT", "PED greater than 1 (ignoring the sign) means…", "Elastic demand: quantity changes by a larger percentage than price.");
  b.card("CONCEPT", "Shape of a perfectly inelastic demand curve?", "Vertical (PED = 0).");
  b.card("CONCEPT", "Shape of a perfectly elastic demand curve?", "Horizontal (PED = infinity).");
  b.card("FORMULA", "How do you find the % change in quantity from PED?", "% change in quantity demanded = PED × % change in price.");
});
