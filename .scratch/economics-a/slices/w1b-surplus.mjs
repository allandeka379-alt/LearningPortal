// W1b: consumer surplus and producer surplus (both boards, AS).
import { concept, P, chk, fmt, linearMarket, priceControl, triangleArea } from "../lib.mjs";

const LV8 = [
  [3, 6, 8, "Two-sided, applied and developed, with a justified conclusion."],
  [2, 3, 5, "Some development of one or both sides, limited application or conclusion."],
  [1, 1, 2, "Simple, undeveloped points."],
];

concept("aecon.market.surplus", { file: "market/surplus", keyPrefix: "market.surplus" }, (b) => {
  const mc = (o, correct, wrongs) => b.mcq({ ...o, options: [correct, ...wrongs], answer: "A" });

  mc({ d: 1, skill: "RECALL", stem: "Consumer surplus is the difference between",
    explanation: "Consumer surplus is the difference between what consumers are willing to pay and what they actually pay." },
    ["what consumers are willing to pay and what they actually pay", "Correct: the gain from buying at a price below one's valuation."],
    [["what producers receive and the minimum they would accept", "That is producer surplus."], ["total revenue and total cost", "That is profit."], ["the equilibrium price and the maximum price", "A price control is not part of the definition."]]);

  mc({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "On a diagram, producer surplus is the area",
    explanation: "Producer surplus lies above the supply curve and below the price line, up to the quantity sold." },
    ["above the supply curve and below the price", "Correct: price received less the minimum acceptable price."],
    [["below the demand curve and above the price", "That is consumer surplus."], ["below the supply curve and above the axis", "That is the cost of production."], ["between the demand and supply curves beyond equilibrium", "That area is the deadweight loss from over-production."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "A rise in the price of a good, with demand unchanged and supply shifting left, will",
    explanation: "A higher price and a lower quantity reduce consumer surplus." },
    ["reduce consumer surplus", "Correct: consumers pay more and buy less."],
    [["increase consumer surplus", "A higher price reduces the gap between willingness to pay and price."], ["leave consumer surplus unchanged", "The area above the price line shrinks."], ["increase total surplus", "Total surplus falls when supply falls."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "Which change increases both consumer surplus and producer surplus in a market?",
    explanation: "A rise in demand raises the equilibrium price and quantity: producers gain from the higher price, and the demand curve is higher so consumer surplus also rises." },
    ["A rise in demand", "Correct: both triangles get larger."],
    [["A fall in demand", "Both fall."], ["A rise in costs of production", "Both fall."], ["A maximum price below equilibrium", "Producer surplus falls."]]);

  {
    const t = triangleArea(100, 5);
    chk(t, 250, 1e-9);
    mc({ d: 3, skill: "APPLICATION", hints: ["Consumer surplus is a triangle between the demand curve and the price."],
      stem: "Demand is P = 12 − 0.05Q and the market price is US\\$7, so that 100 units are bought. Consumer surplus is",
      explanation: "The demand curve meets the price axis at US\\$12. Consumer surplus = ½ × (12 − 7) × 100 = US\\$250." },
      ["US\\$250", "Correct: ½ × 5 × 100."],
      [["US\\$500", "This forgets to halve the triangle."], ["US\\$700", "This is price times quantity (expenditure)."], ["US\\$1,200", "This is 12 × 100, the area of a rectangle."]]);
  }

  mc({ d: 3, skill: "ANALYSIS", hints: ["Who loses the trades that no longer take place?"],
    stem: "A maximum price is set below equilibrium. Total surplus falls because",
    explanation: "Some units that were worth more to buyers than they cost to produce are no longer traded: a deadweight loss." },
    ["mutually beneficial trades no longer take place", "Correct: lost mutually beneficial trades."],
    [["consumers pay a higher price than before the control", "The price is lower under a maximum price."], ["producers earn a higher price than at equilibrium", "Producers receive less."], ["demand falls", "The control does not change demand."]]);

  mc({ d: 3, skill: "ANALYSIS", hints: ["Compare the steepness of the curves."],
    stem: "A price rise from a cost increase reduces consumer surplus more when demand is",
    explanation: "With inelastic demand consumers keep buying at the higher price and so pay more on every unit; the lost surplus is larger." },
    ["inelastic, because they still buy most units at the higher price", "Correct: they pay more on the units they cannot give up."],
    [["elastic, because they stop buying at the higher price", "Elastic demand means they switch away, so the loss in surplus is smaller."], ["unitary elastic, because total revenue is unchanged by price", "Unitary elasticity has no special effect on surplus here."], ["perfectly elastic, because price is unchanged", "Consumer surplus is zero with perfectly elastic demand."]]);

  mc({ d: 4, skill: "EVALUATION", hints: ["Willingness to pay depends on income."],
    stem: "Which is a limitation of using consumer surplus to judge a policy?",
    explanation: "Willingness to pay depends on income, so surplus ignores who gains and loses and the value of fairness." },
    ["It treats a dollar of surplus the same whoever receives it", "Correct: it ignores distribution."],
    [["It can only be measured for luxuries and not for essentials", "It can be measured for any good."], ["It is the same as profit earned by a firm", "Surplus and profit are different concepts."], ["It cannot be shown on a diagram of demand and supply", "It is shown as an area."]]);

  {
    const m = linearMarket({ a: 12, b: 0.05, c: 2, d: 0.05 });
    chk(m.consumerSurplus, 250, 1e-9);
    b.num({ d: 2, skill: "APPLICATION", daily: true, kind: "money", value: m.consumerSurplus,
      stem: "A market has demand P = 12 − 0.05Q and supply P = 2 + 0.05Q (P in US\\$, Q in units). Calculate consumer surplus at the equilibrium.",
      wrong: [500, 700, 125],
      explanation: `Equilibrium: Q = 100, P = US\\$7. Consumer surplus = ½ × (12 − 7) × 100 = US\\$${fmt(m.consumerSurplus)}. Forgetting to halve gives 500.` });
    const hi = linearMarket({ a: 12, b: 0.05, c: 4, d: 0.05 });
    chk(hi.price, 8, 1e-9); chk(hi.quantity, 80, 1e-9); chk(hi.consumerSurplus, 160, 1e-9);
    b.num({ d: 3, skill: "APPLICATION", kind: "money", value: hi.consumerSurplus, hints: ["Find the new equilibrium first."],
      stem: "In the same market, a rise in costs shifts supply to P = 4 + 0.05Q. Calculate consumer surplus at the new equilibrium.",
      wrong: [250, 320, 80],
      explanation: `New equilibrium: 12 − 0.05Q = 4 + 0.05Q, so Q = 80 and P = US\\$8. Consumer surplus = ½ × (12 − 8) × 80 = US\\$${fmt(hi.consumerSurplus)}, down from US\\$250.` });
    const pcn = priceControl({ a: 12, b: 0.05, c: 2, d: 0.05, price: 5 });
    chk(pcn.traded, 60, 1e-9);
    const ps = 0.5 * (5 - 2) * pcn.traded;
    chk(ps, 90, 1e-9);
    b.num({ d: 4, skill: "ANALYSIS", kind: "money", value: ps, hints: ["Only the quantity supplied is traded at the maximum price."],
      stem: "A maximum price of US\\$5 is set in the market with demand P = 12 − 0.05Q and supply P = 2 + 0.05Q. Calculate producer surplus after the control.",
      wrong: [250, 150, 60],
      explanation: `At US\\$5 only Q = (5 − 2) ÷ 0.05 = 60 units are supplied. Producer surplus = ½ × (5 − 2) × 60 = US\\$${fmt(ps)}, down from US\\$250.` });
    const dwl = 0.5 * ((12 - 0.05 * 60) - 5) * (m.quantity - 60);
    chk(dwl, 80, 1e-9);
    b.num({ d: 4, skill: "ANALYSIS", kind: "money", value: dwl, hints: ["The deadweight loss is a triangle between the demand and supply curves from 60 to 100 units."],
      stem: "In the same market with a maximum price of US\\$5, 60 units are traded instead of 100. At 60 units the demand curve is at US\\$9 and the supply curve at US\\$5. Calculate the deadweight loss.",
      wrong: [160, 40, 240],
      explanation: `Deadweight loss = ½ × (9 − 5) × (100 − 60) = US\\$${fmt(dwl)}.` });
  }

  b.tf({ d: 1, skill: "RECALL", stem: "At the competitive equilibrium, total surplus (consumer plus producer surplus) is at its maximum.", answer: true,
    explanation: "True. Every unit that is worth more to buyers than it costs to produce is traded." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Tax revenue received by the government is part of the deadweight loss of a tax.", answer: false,
    explanation: "False. Revenue is a transfer to the government; only the trades that no longer take place are the deadweight loss." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each change with its effect on total surplus.",
    pairs: [["Demand rises", "Total surplus rises"], ["Costs of production rise", "Total surplus falls"], ["A binding maximum price", "Total surplus falls (deadweight loss)"], ["Free voluntary trade at equilibrium", "Total surplus is at its maximum"]],
    explanation: "Surplus grows with output up to equilibrium and falls when the quantity traded is below it." });

  b.short({ d: 2, skill: "RECALL", stem: "What name is given to the loss of total surplus when the quantity traded differs from the equilibrium quantity?",
    accepted: ["deadweight loss", "welfare loss", "a deadweight loss", "dead weight loss"], wrong: ["profit"],
    explanation: "Deadweight (welfare) loss: the value of trades that no longer take place." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Define producer surplus.",
    points: ["The difference between the price producers receive and the minimum price they would accept.", "Shown as the area above the supply curve and below the price line."],
    modelAnswer: "Producer surplus is the difference between the price received by producers and the minimum price they would be willing to accept. On a diagram it is the area above the supply curve and below the price.", explanation: "Definition and diagram." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Describe the cause, the price and the area."],
    stem: "Explain why consumer surplus rises when the supply of a good increases.",
    points: ["Supply shifts to the right, so the equilibrium price falls.", "Consumers pay less than they were willing to pay on more units.", "The area between the demand curve and the lower price line is larger."],
    modelAnswer: "An increase in supply shifts the supply curve to the right and lowers the equilibrium price while raising the quantity. Consumers now pay less than the maximum they are willing to pay on more units, so the area between the demand curve and the price line is larger and consumer surplus rises.",
    explanation: "Link supply shift to price, quantity and the area." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4, hints: ["Consider both winners and losers."],
    stem: "Analyse the effect of a maximum price on consumer surplus and producer surplus.",
    points: ["Consumers who can buy pay a lower price, which raises their surplus on those units.", "Quantity traded falls because producers supply less, so some consumers cannot buy.", "Producer surplus falls: lower price and lower quantity.", "Total surplus falls (deadweight loss)."],
    modelAnswer: "A maximum price below equilibrium lowers the price consumers pay, so those who can buy gain surplus on the units they obtain. However, producers supply less, so some consumers cannot buy at all and their surplus is lost. Producer surplus falls because the price and the quantity sold are lower. Overall total surplus falls because trades that benefited both sides no longer take place.",
    explanation: "Winners, losers and the net loss." });

  {
    const m = linearMarket({ a: 18, b: 0.1, c: 6, d: 0.1 });
    const m2 = linearMarket({ a: 18, b: 0.1, c: 2, d: 0.1 });
    chk(m.consumerSurplus, 180, 1e-9); chk(m.producerSurplus, 180, 1e-9); chk(m2.price, 10, 1e-9); chk(m2.consumerSurplus, 320, 1e-9);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["Each surplus is a triangle: half × base × height."],
      stem: "A fictional market for sacks of groundnuts has demand P = 18 − 0.1Q and supply P = 6 + 0.1Q (P in US\\$ per sack, Q in sacks per week). The equilibrium is a price of US\\$12 and 60 sacks. Later, new equipment lowers costs so that supply becomes P = 2 + 0.1Q and the equilibrium becomes US\\$10 and 80 sacks.",
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: m.consumerSurplus, stem: "Calculate consumer surplus at the original equilibrium.", wrong: [360, 720], explanation: "½ × (18 − 12) × 60 = US\\$180." }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: m.producerSurplus, stem: "Calculate producer surplus at the original equilibrium.", wrong: [360, 120], explanation: "½ × (12 − 6) × 60 = US\\$180." }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: m2.consumerSurplus, stem: "Calculate consumer surplus at the new equilibrium.", wrong: [180, 640], explanation: "½ × (18 − 10) × 80 = US\\$320." }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain why consumer surplus increased.",
          points: ["Lower costs shifted supply right and lowered the price (US\\$12 to US\\$10).", "Consumers pay less than they are willing to pay on more units (60 to 80)."],
          modelAnswer: "Lower costs shifted supply to the right, so the price fell from US\\$12 to US\\$10 and quantity rose from 60 to 80 sacks. Consumers therefore gain more from each sack they buy and buy more sacks, so the area between the demand curve and the price rises." }),
      ],
      explanation: "CS 180 to 320; PS 180 at the first equilibrium." });
  }
  {
    const m = linearMarket({ a: 18, b: 0.1, c: 6, d: 0.1 });
    const pc = priceControl({ a: 18, b: 0.1, c: 6, d: 0.1, price: 9 });
    chk(pc.qd, 90, 1e-9); chk(pc.qs, 30, 1e-9);
    const dem = 18 - 0.1 * 30;
    const cs = (dem - 9) * 30 + 0.5 * (18 - dem) * 30;
    const dwl = 0.5 * (dem - 9) * (m.quantity - 30);
    chk(cs, 225, 1e-9); chk(dwl, 90, 1e-9); chk(m.totalSurplus - dwl, cs + 0.5 * (9 - 6) * 30, 1e-9);
    b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, hints: ["Only the quantity supplied is traded.", "The deadweight loss is a triangle."],
      stem: "In the groundnut market (demand P = 18 − 0.1Q, supply P = 6 + 0.1Q, price in US\\$ per sack) the government sets a maximum price of US\\$9 per sack. At this price the quantity demanded is 90 sacks and the quantity supplied is 30 sacks. At 30 sacks the demand curve is at US\\$15 and the supply curve at US\\$9.",
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "plain", value: pc.shortage, unit: "units", stem: "Calculate the shortage at the maximum price, in sacks.", wrong: [90, 30, 120], explanation: "90 − 30 = 60 sacks." }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: cs, stem: "Assuming the 30 sacks go to the consumers who value them most, calculate consumer surplus.", wrong: [180, 270, 450], explanation: "(15 − 9) × 30 + ½ × (18 − 15) × 30 = 180 + 45 = US\\$225." }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: dwl, stem: "Calculate the deadweight loss.", wrong: [180, 45, 360], explanation: "½ × (15 − 9) × (60 − 30) = US\\$90." }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain why some consumers may be worse off even though the price is lower.",
          points: ["Only 30 sacks are supplied, so many buyers cannot obtain any.", "The consumer surplus of those who go without is lost (and queues or black markets may follow)."],
          modelAnswer: "At the maximum price producers supply only 30 sacks, far below the 90 demanded, so many consumers cannot buy at all and lose all the surplus they would have had; some may also have to queue or pay more in a black market." }),
        P.manual({ label: "(e)", marks: 2, stem: "Suggest **one** alternative way to help low-income households afford groundnuts and say why it may be better.",
          points: ["A targeted cash transfer or voucher to low-income households (or similar).", "It leaves the price to clear the market, so there is no shortage (and less deadweight loss)."],
          modelAnswer: "The government could give a cash transfer to low-income households. They could then afford groundnuts at the market price, so producers still supply the equilibrium quantity and there is no shortage or deadweight loss." }),
      ],
      explanation: "Shortage 60 sacks; CS 225; deadweight loss 90." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Consider winners and losers and alternatives."],
    stem: "Assess whether a maximum price on bread makes consumers better off.",
    points: ["Consumers who can buy pay less and gain surplus.", "Quantity supplied falls, so shortages and queues occur.", "Some consumers cannot buy at all.", "Black markets may charge higher prices.", "Quality may fall and bakeries may close.", "Low-income households may gain if they can obtain bread.", "Alternatives such as cash transfers.", "A justified judgement."],
    levels: LV8,
    modelAnswer: "A maximum price below equilibrium lowers the price for consumers who can buy bread, increasing their consumer surplus. However, bakers supply less, so a shortage develops, queues form and some consumers cannot buy at all; black markets may even charge more than the old price and quality may fall. Total surplus falls. Low-income households may be better off if they obtain the bread, but the gain is uncertain and a cash transfer could help them without causing a shortage. Overall, consumers are better off only if the shortage is small and bread is allocated fairly, which is unlikely in practice.",
    wordLimit: { min: 100, max: 300 },
    explanation: "Gains for some consumers set against shortages and the net loss." });

  b.card("DEFINITION", "Define **consumer surplus**.", "The difference between what consumers are willing to pay for a good and what they actually pay.");
  b.card("DEFINITION", "Define **producer surplus**.", "The difference between the price producers receive and the minimum price they would accept.");
  b.card("FORMULA", "How do you calculate surplus on straight-line curves?", "As the area of a triangle: ½ × base (quantity) × height (difference between the intercept price and the market price).");
  b.card("CONCEPT", "On a diagram, where is **consumer surplus**?", "Below the demand curve and above the price line, up to the quantity bought.");
  b.card("CONCEPT", "On a diagram, where is **producer surplus**?", "Above the supply curve and below the price line, up to the quantity sold.");
  b.card("CONCEPT", "Define **deadweight loss**.", "The fall in total surplus when the quantity traded differs from the equilibrium quantity.");
  b.card("FACT", "What happens to total surplus at the competitive equilibrium?", "It is at its maximum.");
  b.card("FACT", "What does a binding maximum price do to surplus?", "Consumers who buy gain, producers lose, and total surplus falls (deadweight loss).");
  b.card("CONCEPT", "Give **two** limitations of surplus analysis.", "It ignores differences in income and fairness, and it ignores external costs and benefits.");
});
