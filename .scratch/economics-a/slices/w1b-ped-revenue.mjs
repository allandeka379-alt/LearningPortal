// W1b: PED, total revenue and decision-making (both boards, AS).
import { concept, P, chk, fmt, pctChange, elasticity, pedPoint, linearMarket, dpStr, table } from "../lib.mjs";

const LV8 = [
  [3, 6, 8, "Two-sided, applied and developed, with a justified conclusion."],
  [2, 3, 5, "Some development of one or both sides, limited application or conclusion."],
  [1, 1, 2, "Simple, undeveloped points."],
];

concept("aecon.market.ped-revenue", { file: "market/ped-revenue", keyPrefix: "market.ped-revenue" }, (b) => {
  const mc = (o, correct, wrongs) => b.mcq({ ...o, options: [correct, ...wrongs], answer: "A" });

  mc({ d: 1, skill: "RECALL", stem: "A firm raises the price of a good with inelastic demand. Its total revenue will",
    explanation: "Quantity falls by a smaller percentage than price rises, so price × quantity increases." },
    ["rise", "Correct: the price effect outweighs the quantity effect."],
    [["fall", "This is what happens when demand is elastic."], ["stay the same", "This happens only when demand is unitary elastic."], ["fall to zero", "Inelastic demand does not mean sales disappear."]]);

  mc({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "A firm with elastic demand cuts its price. Total revenue will",
    explanation: "Quantity demanded rises by a larger percentage than price falls, so revenue rises." },
    ["rise, because quantity rises by more than price falls", "Correct: the quantity effect dominates."],
    [["fall, because the price is lower", "The lower price is more than offset by the extra sales."], ["stay the same, because price and quantity move in opposite directions", "Revenue is unchanged only at unitary elasticity."], ["rise, because demand has shifted to the right", "A price cut is a movement along the curve, not a shift."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "Along a straight-line demand curve, total revenue is at its maximum where",
    explanation: "Revenue is largest where PED = −1, which is halfway down a straight-line demand curve." },
    ["PED is −1, at the mid-point of the curve", "Correct: unitary elasticity."],
    [["PED is zero, at the bottom of the curve", "At the bottom of the curve quantity is large but price is near zero, so revenue is small."], ["PED is infinite, at the top of the curve", "At the top, quantity is near zero, so revenue is small."], ["marginal utility is zero", "This is unrelated to the revenue rule."]]);

  mc({ d: 3, skill: "ANALYSIS", hints: ["Think about elasticity of demand for staple foods."],
    stem: "A bumper maize harvest lowers the price of maize. Total revenue of maize farmers is likely to fall because",
    explanation: "Demand for staple foods is inelastic: quantity sold rises by a smaller percentage than price falls." },
    ["demand is inelastic, so the fall in price outweighs the rise in quantity", "Correct: the price effect dominates."],
    [["demand is elastic, so quantity rises more than price falls", "That would raise farm revenue."], ["supply is perfectly inelastic", "A shift of supply is the cause; the revenue result depends on demand elasticity."], ["demand has fallen", "The harvest is a supply shift."]]);

  {
    const tr0 = 1, tr1 = 0.9 * 1.2;
    chk(tr1, 1.08, 1e-9);
    mc({ d: 3, skill: "APPLICATION", hints: ["Find the new quantity as a multiple of the old, then multiply by the new price."],
      stem: "PED for a good is −2. The price falls by 10%. By what percentage does total revenue change?",
      explanation: "Quantity rises by 20% (−2 × −10). New revenue = 0.90 × 1.20 = 1.08 of the old: a rise of 8%." },
      ["It rises by 8%", "Correct: 0.9 × 1.2 = 1.08."],
      [["It rises by 10%", "This ignores the lower price."], ["It falls by 8%", "Elastic demand means a price cut raises revenue."], ["It does not change", "Revenue is unchanged only if PED is −1."]]);
  }

  mc({ d: 3, skill: "APPLICATION", hints: ["Which demand makes tax revenue highest and consumption lowest?"],
    stem: "A government wants to raise tax revenue by taxing one good. Which is most suitable?",
    explanation: "When demand is inelastic, quantity falls little after the tax, so revenue is high." },
    ["A good with inelastic demand such as fuel", "Correct: consumption falls little."],
    [["A good with elastic demand and many substitutes", "Quantity would fall sharply and revenue would be low."], ["A good with perfectly elastic demand", "Quantity would fall to zero."], ["A good that is an inferior good", "Inferior or normal is about income, not elasticity to price."]]);

  mc({ d: 4, skill: "EVALUATION", hints: ["Revenue and profit differ."],
    stem: "A firm with elastic demand cuts its price and its revenue rises. Why might its profit still fall?",
    explanation: "Profit is revenue minus cost; selling more raises costs, which may exceed the extra revenue." },
    ["The extra output costs more than the extra revenue", "Correct: costs also matter."],
    [["Revenue cannot rise when price falls, whatever the elasticity", "With elastic demand it does."], ["Total revenue always equals profit for a firm", "Profit is revenue minus costs."], ["Elastic demand means costs fall", "Elasticity says nothing about costs."]]);

  {
    const rowQ = (p) => (20 - p) / 0.1;
    const q = rowQ(14), tr = q * 14;
    chk(tr, 840, 1e-9);
    b.num({ d: 2, skill: "APPLICATION", daily: true, kind: "money", value: tr,
      stem: "A fictional market has demand P = 20 − 0.1Q (P in US\\$, Q in units per week). Calculate total revenue when the price is US\\$14.",
      wrong: [60, 280, 1000],
      explanation: `At P = 14, Q = (20 − 14) ÷ 0.1 = ${q}. TR = 14 × ${q} = US\\$${fmt(tr)}. Giving only the quantity (60) forgets to multiply by price.` });
  }
  {
    const old = 3.0 * 1500, nw = 3.6 * 1350;
    chk(nw, 4860, 1e-9);
    b.calc({ d: 3, skill: "APPLICATION", calculator: true, kind: "money", value: nw, hints: ["Find the new quantity first."],
      stem: "A shop sells 1,500 packets of rice a week at US\\$3.00. PED is −0.5 and the price rises by 20%. Calculate the new weekly total revenue.",
      wrong: [4500, 5400, 4050],
      explanation: `1. % change in quantity = −0.5 × 20 = −10%, so quantity = 1,350.\n2. New price = US\\$3.60.\n3. New revenue = 3.60 × 1,350 = US\\$${fmt(nw)} (old revenue US\\$${fmt(old)}).\nKeeping quantity at 1,500 gives 5,400; forgetting the new price gives 4,050.` });
  }
  {
    const p = pedPoint({ a: 20, p: 14 });
    chk(p, -14 / 6, 1e-9);
    b.num({ d: 3, skill: "APPLICATION", calculator: true, kind: "elasticity", value: p, dp: 2, hints: ["On P = a − bQ, PED at price P is −P ÷ (a − P)."],
      stem: "On the straight-line demand curve P = 20 − 0.1Q, PED at a price of US\\$14 is given by −P ÷ (20 − P). Calculate PED at US\\$14, including the minus sign, to 2 decimal places.",
      wrong: [-0.43, 2.33, -0.7],
      explanation: `PED = −14 ÷ (20 − 14) = −14 ÷ 6 = ${dpStr(p, 2)}. Demand is elastic at this price, above the mid-point of US\\$10.` });
  }
  {
    const q = 400 * 1.15;
    const nr = q * 3.6;
    chk(nr, 1656, 1e-9);
    b.calc({ d: 3, skill: "APPLICATION", calculator: true, kind: "money", value: nr, hints: ["Quantity changes by PED × % change in price."],
      stem: "A bus firm carries 400 passengers a day at US\\$4.00. PED is −1.5. It cuts the fare by 10%. Calculate the new daily revenue.",
      wrong: [1600, 1440, 1840],
      explanation: `1. Quantity rises by −1.5 × −10 = +15%, so passengers = 460.\n2. New fare = US\\$3.60.\n3. New revenue = 3.60 × 460 = US\\$${fmt(nr)} (old revenue US\\$1,600).\nForgetting the new fare gives 4.00 × 460 = 1,840.` });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "If demand is unitary elastic, a rise in price leaves total revenue unchanged.", answer: true,
    explanation: "True. Quantity falls by exactly the same percentage as price rises." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Along a straight-line demand curve, PED is the same at every price.", answer: false,
    explanation: "False. The slope is constant but PED falls steadily from the top of the curve to the bottom." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each change with its effect on total revenue.",
    pairs: [["Price rise, elastic demand", "Revenue falls"], ["Price rise, inelastic demand", "Revenue rises"], ["Price fall, elastic demand", "Revenue rises"], ["Price fall, inelastic demand", "Revenue falls"]],
    explanation: "Revenue moves in the direction of price when demand is inelastic and in the opposite direction when demand is elastic." });

  b.short({ d: 2, skill: "RECALL", stem: "What is the value of PED at the price where total revenue is at its maximum on a straight-line demand curve? Give the value including the sign.",
    accepted: ["-1", "−1", "minus 1", "-1.0", "unitary elastic", "unitary"], wrong: ["0"],
    explanation: "Total revenue is maximised where PED = −1 (unitary elasticity)." });

  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Link the harvest to supply, price and the elasticity of demand."],
    stem: "Explain why a very good harvest can reduce the total income of maize farmers.",
    points: ["The good harvest shifts supply to the right, lowering the price.", "Demand for maize (a staple) is inelastic.", "Quantity sold rises by a smaller percentage than price falls, so revenue (price × quantity) falls."],
    modelAnswer: "A good harvest shifts supply to the right and lowers the price. Because demand for maize is inelastic, the quantity bought rises by a smaller percentage than the price falls, so farmers' total revenue falls.",
    explanation: "Supply shift, inelastic demand, price effect larger than quantity effect." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4, hints: ["Consider the rule and its limits."],
    stem: "Analyse why a firm with elastic demand may not increase its profit by lowering its price.",
    points: ["Elastic demand means a price cut raises revenue.", "More output has to be produced and sold, raising costs.", "If extra cost exceeds extra revenue, profit falls.", "Rivals may also cut prices, reducing the gain."],
    modelAnswer: "With elastic demand a price cut raises total revenue because quantity rises by a larger percentage. But the extra output costs more to produce, and if the additional cost is greater than the additional revenue, profit falls. Rivals may also match the cut, so the firm gains few extra sales.",
    explanation: "Revenue effect, cost effect and reaction of rivals." });
  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Define total revenue and state how it is calculated.",
    points: ["The total amount a firm receives from the sale of its output.", "Price multiplied by quantity sold."],
    modelAnswer: "Total revenue is the total amount a firm receives from selling its output. It is calculated as price multiplied by quantity sold.", explanation: "Definition and formula." });

  {
    const rows = [25, 20, 15, 10, 5].map((p) => ({ p, q: (30 - p) / 0.2 }));
    const tr = rows.map((r) => r.p * r.q);
    chk(tr[1], 1000, 1e-9);
    const ped = elasticity.ped({ p1: 20, p2: 15, q1: 50, q2: 75 });
    chk(ped, -2, 1e-9);
    const md = table(["Price (US\\$)", "Quantity demanded (units per week)"], rows.map((r) => [r.p, r.q]));
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["TR = price × quantity.", "Use the original price and quantity as the base."],
      stem: `The demand schedule below is for a fictional product (illustrative data).\n\n${md}`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "money", value: tr[1], stem: "Calculate total revenue at a price of US\\$20.", wrong: [50, 20], explanation: "TR = 20 × 50 = US\\$1,000." }),
        P.num({ label: "(b)", marks: 2, kind: "elasticity", value: ped, dp: 2, stem: "Calculate PED when the price falls from US\\$20 to US\\$15, including the minus sign.", wrong: [-0.5, 2], explanation: "Price −25%; quantity +50% (50 to 75); PED = 50 ÷ (−25) = −2.00." }),
        P.manual({ label: "(c)", marks: 2, stem: "Explain why total revenue rises when the price falls from US\\$20 to US\\$15.",
          points: ["Demand is elastic over this range (PED size above 1).", "Quantity demanded rises by a larger percentage than price falls (revenue rises from 1,000 to 1,125)."],
          modelAnswer: "Demand is elastic here, with PED of −2, so the quantity demanded rises by 50% when price falls by 25%. The quantity effect outweighs the price effect and revenue rises from US\\$1,000 to US\\$1,125." }),
        P.manual({ label: "(d)", marks: 3, stem: "Describe what happens to total revenue as the price falls from US\\$10 to US\\$5, and explain why.",
          points: ["Revenue falls from US\\$1,000 to US\\$625.", "Demand is inelastic over this range (price −50%, quantity +25%).", "The price effect outweighs the quantity effect."],
          modelAnswer: "Revenue falls from US\\$1,000 to US\\$625. Over this range demand is inelastic: the price falls by 50% but quantity rises by only 25%, so the fall in price outweighs the rise in sales." }),
      ],
      explanation: "TR peaks at the mid-point price (US\\$15 gives 1,125); above it demand is elastic, below it inelastic." });
    chk(tr[2], 1125, 1e-9); chk(tr[3], 1000, 1e-9); chk(tr[4], 625, 1e-9);
  }
  {
    const m1 = linearMarket({ a: 100, b: 0.2, c: 10, d: 0.1 });
    const m2 = linearMarket({ a: 100, b: 0.2, c: -20, d: 0.1 });
    chk(m1.price, 40, 1e-9); chk(m1.quantity, 300, 1e-9); chk(m2.price, 20, 1e-9); chk(m2.quantity, 400, 1e-9);
    const trs = [m1.price * m1.quantity, m2.price * m2.quantity];
    chk(trs[0], 12000, 1e-9); chk(trs[1], 8000, 1e-9);
    const ped = elasticity.ped({ p1: 40, p2: 20, q1: 300, q2: 400 });
    b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, hints: ["Revenue = price × quantity.", "Think about the elasticity of demand for food."],
      stem: "In a fictional country the market for sweet potatoes has demand P = 100 − 0.2Q and supply P = 10 + 0.1Q (P in US\\$ per tonne, Q in tonnes). The equilibrium is a price of US\\$40 and 300 tonnes. After a very good season, supply rises by 300 tonnes at every price, so that the new equilibrium is US\\$20 and 400 tonnes.",
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: trs[0], stem: "Calculate farmers' total revenue before the good season.", wrong: [300, 400], explanation: "40 × 300 = US\\$12,000." }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: trs[1], stem: "Calculate farmers' total revenue after the good season.", wrong: [12000, 400], explanation: "20 × 400 = US\\$8,000." }),
        P.num({ label: "(c)", marks: 2, kind: "elasticity", value: ped, dp: 2, stem: "Calculate PED over this range of the demand curve (price from US\\$40 to US\\$20), including the minus sign.", wrong: [-1.5, 0.67], explanation: "Price −50%; quantity +33.3%; PED = 33.33 ÷ (−50) = −0.67." }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain why farmers' revenue fell although they sold more.",
          points: ["Demand is inelastic (PED size below 1).", "The fall in price outweighs the rise in quantity sold."],
          modelAnswer: "Demand for sweet potatoes is inelastic, so the 33% rise in quantity was smaller than the 50% fall in price, and price × quantity fell from US\\$12,000 to US\\$8,000." }),
        P.manual({ label: "(e)", marks: 2, stem: "Suggest **one** way the government could reduce the fall in farm incomes in a good season.",
          points: ["Buy the surplus crop when prices are low (a buffer stock) or set a minimum price.", "Sell or release the stock in a poor season to stabilise prices (or help farmers to store, process or export)."],
          modelAnswer: "The government could run a buffer stock scheme, buying the surplus when the price is low and selling it in a poor season. This supports prices and farm incomes in a good year and stabilises prices over time." }),
      ],
      explanation: "Revenue falls from 12,000 to 8,000 because demand is inelastic (PED −0.67)." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Consider what PED tells a firm and what it does not."],
    stem: "Evaluate the usefulness of a knowledge of price elasticity of demand to a firm deciding whether to change its price.",
    points: ["PED shows whether a price rise or cut raises or lowers revenue.", "Inelastic demand: a rise in price raises revenue; elastic demand: a cut raises revenue.", "Helps to forecast the change in quantity and so plan output.", "PED is an estimate and changes over time and along the curve.", "Revenue is not profit: costs must be considered.", "Rivals' reactions and the market structure matter.", "Other influences (incomes, tastes) may change at the same time.", "A justified judgement."],
    levels: LV8,
    modelAnswer: "PED tells a firm how its total revenue will respond to a price change: if demand is inelastic a price rise raises revenue, and if it is elastic a price cut raises revenue. It also helps the firm forecast quantity and plan production. However, PED is only an estimate, it changes along the demand curve and over time, and other factors such as incomes and tastes may change as well. Revenue is not the same as profit, so the firm must also consider the cost of extra output, and rivals may react to a price change. PED is therefore a valuable guide to the direction and size of the revenue effect, but it must be combined with information on costs and competition before the price is changed.",
    wordLimit: { min: 100, max: 300 },
    explanation: "Uses of PED against its limitations, with a judgement." });

  b.card("FORMULA", "State the formula for **total revenue**.", "TR = price × quantity sold (the same figure as total expenditure by buyers).");
  b.card("CONCEPT", "Price **rises**, demand **elastic**: what happens to revenue?", "Revenue falls, because quantity falls by a larger percentage than price rises.");
  b.card("CONCEPT", "Price **rises**, demand **inelastic**: what happens to revenue?", "Revenue rises, because quantity falls by a smaller percentage than price rises.");
  b.card("CONCEPT", "At what point on a straight-line demand curve is revenue at its maximum?", "At the mid-point, where PED = −1 (unitary elasticity).");
  b.card("FACT", "How does PED change down a straight-line demand curve?", "It is elastic at the top, −1 at the mid-point and inelastic at the bottom; the slope is constant but PED falls.");
  b.card("CONCEPT", "Why can a bumper harvest lower farm incomes?", "Demand for staple foods is inelastic, so the fall in price outweighs the rise in quantity sold.");
  b.card("CONCEPT", "Why do governments tax fuel and tobacco heavily?", "Demand is inelastic, so quantity falls little and tax revenue is high.");
  b.card("FACT", "Why is revenue not the same as profit?", "Profit is revenue minus costs; extra output has extra costs.");
  b.card("FACT", "Unitary elasticity and a price change: what happens to revenue?", "Revenue does not change, because quantity changes by the same percentage as price.");
});
