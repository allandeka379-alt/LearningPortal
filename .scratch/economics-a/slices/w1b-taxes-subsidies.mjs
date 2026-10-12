// W1b: indirect taxes and subsidies: impact and incidence (both boards, AS).
import { concept, P, chk, fmt, taxIncidence, subsidyEffect, dpStr } from "../lib.mjs";

const LV8 = [
  [3, 6, 8, "Two-sided, applied and developed, with a justified conclusion."],
  [2, 3, 5, "Some development of one or both sides, limited application or conclusion."],
  [1, 1, 2, "Simple, undeveloped points."],
];

concept("aecon.intervention.taxes-subsidies", { file: "intervention/taxes-subsidies", keyPrefix: "intervention.taxes-subsidies" }, (b) => {
  const mc = (o, correct, wrongs) => b.mcq({ ...o, options: [correct, ...wrongs], answer: "A" });

  mc({ d: 1, skill: "RECALL", stem: "An indirect tax on a good is represented on a diagram by a shift of",
    explanation: "The tax raises the sellers' cost of each unit, so the supply curve shifts upward (to the left) by the amount of the tax." },
    ["the supply curve upward by the amount of the tax", "Correct: the tax raises costs."],
    [["the demand curve upward by the amount of the tax", "Demand does not shift; the tax is collected from sellers."], ["the demand curve to the left", "A tax on sellers shifts supply, not demand."], ["the supply curve to the right", "A subsidy shifts supply to the right."]]);

  mc({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "The incidence of an indirect tax refers to",
    explanation: "Incidence is how the burden of the tax is shared between consumers and producers." },
    ["how the burden is shared between consumers and producers", "Correct: who really pays."],
    [["the amount of revenue the government receives", "That is the tax revenue."], ["the fall in the quantity traded", "That is the effect on quantity."], ["the size of the subsidy", "That concerns subsidies."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "A subsidy paid to producers of a good will",
    explanation: "A subsidy lowers costs, shifting supply to the right: the equilibrium price falls and quantity rises." },
    ["lower the price and raise the quantity traded", "Correct: supply shifts to the right."],
    [["raise the price and lower the quantity traded", "That follows a tax."], ["lower the price and lower the quantity traded", "A subsidy raises quantity."], ["leave the price unchanged", "The price falls when supply increases."]]);

  mc({ d: 3, skill: "ANALYSIS", hints: ["Which side finds it harder to avoid the tax?"],
    stem: "When demand for a good is inelastic and supply is elastic, an indirect tax is borne",
    explanation: "The more inelastic side bears more of the burden: consumers cannot easily cut back, so they pay most of the tax." },
    ["mostly by consumers", "Correct: they keep buying at the higher price."],
    [["mostly by producers", "That happens when demand is elastic and supply is inelastic."], ["equally by consumers and producers", "Equal sharing needs equal elasticities."], ["entirely by the government", "The government collects the tax."]]);

  mc({ d: 3, skill: "APPLICATION", hints: ["Revenue = tax per unit × quantity after the tax."],
    stem: "A tax of US\\$5 per unit reduces the quantity sold from 600 to 520. Tax revenue is",
    explanation: "Revenue = 5 × 520 = US\\$2,600. The old quantity is not used because 80 units are no longer sold." },
    ["US\\$2,600", "Correct: tax per unit × new quantity."],
    [["US\\$3,000", "This uses the old quantity."], ["US\\$520", "This is the quantity, not the revenue."], ["US\\$80", "This is the fall in quantity."]]);

  mc({ d: 3, skill: "ANALYSIS", hints: ["Which goods have the smallest fall in quantity?"],
    stem: "A government wants to raise as much revenue as possible from an indirect tax. It should tax a good that has",
    explanation: "With inelastic demand quantity falls little, so revenue is high." },
    ["inelastic demand", "Correct: consumption is little reduced."],
    [["elastic demand", "Quantity falls sharply and revenue is lower."], ["many close substitutes", "Consumers switch away and revenue falls."], ["perfectly elastic demand", "Quantity would fall to zero."]]);

  mc({ d: 3, skill: "UNDERSTANDING", hints: ["Compare cost and benefit."],
    stem: "An economist says a subsidy creates a welfare loss. This means that",
    explanation: "The subsidy encourages output beyond the equilibrium: the extra units cost more to produce than their value to consumers, and the cost to the government exceeds the gain in surplus." },
    ["the cost to the government exceeds the gain in consumer and producer surplus", "Correct: some output is worth less than it costs."],
    [["producers earn less profit because the subsidy lowers the price they receive", "Producers receive more per unit."], ["the quantity traded falls because the subsidy raises the price consumers pay", "A subsidy raises quantity."], ["consumers pay a higher price for the good because of the subsidy", "The price falls."]]);

  mc({ d: 4, skill: "EVALUATION", hints: ["Think about who pays and the elasticities."],
    stem: "Which is the strongest criticism of a high indirect tax on a necessity with inelastic demand?",
    explanation: "Poor households spend a larger share of their income on necessities, so the tax is regressive and may not reduce consumption much." },
    ["It hits poorer households hard but cuts consumption little", "Correct: regressive and ineffective at changing behaviour."],
    [["It reduces consumption by a very large amount among all households", "With inelastic demand quantity falls little."], ["It raises no revenue because demand is inelastic", "Revenue is high when demand is inelastic."], ["Producers bear the whole of the tax because supply is elastic", "Consumers bear most of it when demand is inelastic."]]);

  {
    const t = taxIncidence({ a: 40, b: 0.04, c: 8, d: 0.04, tax: 4 });
    chk(t.before.price, 24, 1e-9); chk(t.before.quantity, 400, 1e-9);
    chk(t.after.price, 26, 1e-9); chk(t.after.quantity, 350, 1e-9); chk(t.revenue, 1400, 1e-9); chk(t.deadweightLoss, 100, 1e-9);
    b.num({ d: 2, skill: "APPLICATION", daily: true, kind: "money", value: t.after.price,
      stem: "A market has demand P = 40 − 0.04Q and supply P = 8 + 0.04Q (P in US\\$, Q in units). A tax of US\\$4 per unit is imposed on sellers. Calculate the new equilibrium price paid by consumers.",
      wrong: [24, 28, 16],
      explanation: `The tax shifts supply to P = 12 + 0.04Q. Then 40 − 0.04Q = 12 + 0.04Q, so 28 = 0.08Q, Q = 350 and P = 40 − 14 = US\\$${fmt(t.after.price)}. (Before the tax: US\\$24 and 400 units.)` });
    b.calc({ d: 3, skill: "APPLICATION", calculator: true, kind: "money", value: t.revenue, hints: ["Use the quantity after the tax."],
      stem: "In the same market (a tax of US\\$4 per unit; the quantity after the tax is 350 units) calculate the government's tax revenue.",
      wrong: [1600, 1000, 350],
      explanation: `1. Tax per unit = US\\$4.\n2. Quantity sold after the tax = 350.\n3. Revenue = 4 × 350 = US\\$${fmt(t.revenue)}. Using the old quantity (400) gives 1,600.` });
    b.num({ d: 4, skill: "ANALYSIS", calculator: true, kind: "money", value: t.deadweightLoss, hints: ["The deadweight loss is a triangle: ½ × tax × fall in quantity."],
      stem: "In the same market the tax of US\\$4 per unit reduces the quantity from 400 to 350. Calculate the deadweight loss.",
      wrong: [200, 1400, 50],
      explanation: `Deadweight loss = ½ × 4 × (400 − 350) = US\\$${fmt(t.deadweightLoss)}. Forgetting the half gives 200.` });
    const s = subsidyEffect({ a: 40, b: 0.04, c: 8, d: 0.04, subsidy: 4 });
    chk(s.cost, 1800, 1e-9);
    b.num({ d: 4, skill: "ANALYSIS", calculator: true, kind: "money", value: s.cost, hints: ["Cost = subsidy per unit × new quantity."],
      stem: "In the same market (demand P = 40 − 0.04Q, supply P = 8 + 0.04Q) the government pays a subsidy of US\\$4 per unit to sellers. The new supply is P = 4 + 0.04Q. Calculate the cost of the subsidy to the government.",
      wrong: [1600, 1400, 4],
      explanation: `New equilibrium: 40 − 0.04Q = 4 + 0.04Q, so Q = 450 and P = US\\$22. Cost = 4 × 450 = US\\$${fmt(s.cost)}. Using the old quantity (400) gives 1,600.` });
    b.num({ d: 2, skill: "APPLICATION", daily: true, kind: "money", value: 23,
      stem: "A good sells at US\\$20 before tax. An ad valorem tax of 15% of the pre-tax price is imposed and the whole tax is passed on to the consumer. Calculate the price the consumer pays.",
      wrong: [20.15, 17, 35],
      explanation: "Tax = 15% × 20 = US\\$3, so the consumer pays US\\$23. Adding 15 instead of 15% gives 35." });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "If demand is perfectly inelastic, consumers bear the whole of an indirect tax.", answer: true,
    explanation: "True. Quantity does not change, so the price rises by the full amount of the tax." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each market condition with who bears most of an indirect tax.",
    pairs: [["Inelastic demand, elastic supply", "Consumers"], ["Elastic demand, inelastic supply", "Producers"], ["Perfectly inelastic demand", "Consumers (all of the tax)"], ["Perfectly elastic demand", "Producers (all of the tax)"]],
    explanation: "The more inelastic side of the market bears more of the tax." });

  b.short({ d: 2, skill: "RECALL", stem: "What name is given to the way the burden of a tax is shared between consumers and producers?",
    accepted: ["incidence", "tax incidence", "incidence of tax", "incidence of a tax"], wrong: ["revenue"],
    explanation: "Tax incidence." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Distinguish between a specific tax and an ad valorem tax.",
    points: ["A specific tax is a fixed amount per unit.", "An ad valorem tax is a percentage of the price."],
    modelAnswer: "A specific tax is a fixed sum charged on each unit, such as US\\$4 per litre. An ad valorem tax is a percentage of the price, such as 15%, so the tax per unit rises with the price.", explanation: "Fixed amount against percentage of price." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Describe the shift, the price and the quantity."],
    stem: "Explain the effect of an indirect tax on the equilibrium price and quantity of a good.",
    points: ["The tax raises sellers' costs by the amount of the tax.", "Supply shifts upward (to the left).", "Equilibrium price rises.", "Equilibrium quantity falls (by an amount that depends on elasticity)."],
    modelAnswer: "An indirect tax raises the cost of supplying each unit by the amount of the tax, so the supply curve shifts upward or to the left. At the old price there is excess demand, so the equilibrium price rises and the equilibrium quantity falls, by more if demand and supply are elastic.",
    explanation: "Cost rise, supply shift, new price and quantity." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4, hints: ["Use the relative elasticity of demand and supply."],
    stem: "Analyse why consumers bear most of a tax on cigarettes.",
    points: ["Demand for cigarettes is inelastic (addiction, few substitutes).", "Consumers keep buying despite the price rise, so quantity falls little.", "Sellers can pass most of the tax on in a higher price.", "Therefore consumers' share of the burden is greater than producers'."],
    modelAnswer: "Demand for cigarettes is inelastic because many smokers are addicted and there are few close substitutes. When the tax raises the supply price, consumers keep buying, so quantity falls only slightly and sellers can pass most of the tax on in a higher price. Consumers therefore bear a larger share of the burden than producers.",
    explanation: "Inelastic demand shifts incidence to consumers." });

  {
    const t = taxIncidence({ a: 30, b: 0.05, c: 6, d: 0.05, tax: 6 });
    chk(t.before.price, 18, 1e-9); chk(t.before.quantity, 240, 1e-9); chk(t.after.price, 21, 1e-9); chk(t.after.quantity, 180, 1e-9);
    chk(t.revenue, 1080, 1e-9); chk(t.consumerBurden, 540, 1e-9); chk(t.deadweightLoss, 180, 1e-9);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["The supply curve moves up by the tax."],
      stem: "A fictional market for cooking oil has demand P = 30 − 0.05Q and supply P = 6 + 0.05Q (P in US\\$ per bottle, Q in bottles per week). The equilibrium is a price of US\\$18 and 240 bottles. The government imposes a tax of US\\$6 per bottle on sellers, so that supply becomes P = 12 + 0.05Q.",
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: t.after.price, stem: "Calculate the new equilibrium price.", wrong: [18, 24, 15], explanation: "30 − 0.05Q = 12 + 0.05Q, so Q = 180 and P = 30 − 9 = US\\$21." }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: t.revenue, stem: "Calculate the government's tax revenue.", wrong: [1440, 540], explanation: "6 × 180 = US\\$1,080." }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: t.consumerBurden, stem: "Calculate the total amount of the tax borne by consumers.", wrong: [720, 1080], explanation: "Consumers pay US\\$3 more per bottle (21 − 18): 3 × 180 = US\\$540." }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain why producers bear part of the tax.",
          points: ["The price rises by only US\\$3 of the US\\$6 tax.", "Producers receive US\\$15 per bottle after paying the tax, US\\$3 less than before (and sell fewer bottles)."],
          modelAnswer: "The price paid by consumers rises by only US\\$3, half of the tax, so sellers keep only US\\$15 of the US\\$21 after paying the US\\$6 tax, which is US\\$3 less than the US\\$18 they received before. They also sell fewer bottles." }),
      ],
      explanation: "Price 18 → 21, quantity 240 → 180, revenue 1,080, shared equally; deadweight loss 180." });
  }
  {
    const s = subsidyEffect({ a: 50, b: 0.1, c: 10, d: 0.1, subsidy: 8 });
    chk(s.before.price, 30, 1e-9); chk(s.before.quantity, 200, 1e-9); chk(s.after.price, 26, 1e-9); chk(s.after.quantity, 240, 1e-9);
    chk(s.cost, 1920, 1e-9); chk(s.consumerGain, 960, 1e-9); chk(s.welfareLoss, 160, 1e-9);
    b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, hints: ["The supply curve moves down by the subsidy.", "Cost = subsidy per unit × new quantity."],
      stem: "A fictional government pays farmers a subsidy of US\\$8 per tonne of maize. Before the subsidy, demand is P = 50 − 0.1Q and supply is P = 10 + 0.1Q (P in US\\$ per tonne, Q in tonnes), giving a price of US\\$30 and 200 tonnes. With the subsidy, supply is P = 2 + 0.1Q.",
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: s.after.price, stem: "Calculate the new price paid by consumers.", wrong: [30, 22, 34], explanation: "50 − 0.1Q = 2 + 0.1Q, so Q = 240 and P = 50 − 24 = US\\$26." }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: s.cost, stem: "Calculate the cost of the subsidy to the government.", wrong: [1600, 960], explanation: "8 × 240 = US\\$1,920." }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: s.consumerGain, stem: "Calculate how much of the subsidy payment benefits consumers through the lower price (fall in price per tonne × quantity after the subsidy).", wrong: [1920, 800], explanation: "The price falls by US\\$4 (30 to 26): 4 × 240 = US\\$960." }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain why the subsidy creates a welfare loss.",
          points: ["It encourages output beyond the equilibrium of 200 tonnes (to 240).", "The extra 40 tonnes cost more to produce than their value to consumers, so the cost to the government exceeds the gain in surplus (by US\\$160)."],
          modelAnswer: "The subsidy raises output from 200 to 240 tonnes. The extra tonnes cost more to produce than consumers value them, so the subsidy costs the government US\\$1,920 but raises consumer and producer surplus by only US\\$1,760: a welfare loss of US\\$160." }),
        P.manual({ label: "(e)", marks: 2, stem: "State **one** drawback of the subsidy and explain it.",
          points: ["Cost to taxpayers (or opportunity cost of the funds), or dependence or inefficiency, or the benefit goes mostly to larger farmers.", "Explanation linked to the data or to the effect on behaviour."],
          modelAnswer: "One drawback is the cost: US\\$1,920 of public money is used, which could have been spent on other things such as roads or schools, and farmers may become dependent on the support." }),
      ],
      explanation: "Price 30 → 26, quantity 200 → 240, cost 1,920, welfare loss 160." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Consider elasticity, distribution and alternatives."],
    stem: "Assess whether an indirect tax is an effective way to reduce the consumption of tobacco.",
    points: ["A tax raises price and reduces quantity demanded.", "Demand for tobacco is inelastic (addiction), so the fall in consumption is small.", "Tax revenue is high and can fund health care or education.", "The tax is regressive: poor smokers pay a bigger share of income.", "Smuggling and illegal trade reduce effectiveness.", "Long-run demand is more elastic, especially for young people.", "Alternatives: information, advertising bans, regulation.", "A justified judgement."],
    levels: LV8,
    modelAnswer: "An indirect tax raises the price of tobacco and so reduces the quantity demanded. However, demand for tobacco is inelastic because many smokers are addicted and there are few substitutes, so the tax reduces consumption by only a small amount, though it raises substantial revenue that can fund health care. The tax is regressive, since poorer smokers pay a larger share of their income, and high taxes can encourage smuggling. In the long run, and for young people who are not yet addicted, demand is more elastic, so the effect is greater. Overall a tax is effective at raising revenue and moderately effective at reducing consumption, and it works best alongside information campaigns and regulation.",
    wordLimit: { min: 100, max: 300 },
    explanation: "Tax effect limited by inelastic demand; distribution and alternatives; judgement." });

  b.card("DEFINITION", "Define an **indirect tax**.", "A tax on spending on goods and services, collected by the seller; it raises the cost of supply and shifts the supply curve up.");
  b.card("CONCEPT", "Distinguish a **specific** tax from an **ad valorem** tax.", "Specific: a fixed amount per unit. Ad valorem: a percentage of the price.");
  b.card("DEFINITION", "Define the **incidence** of a tax.", "How the burden of the tax is shared between consumers (higher price) and producers (lower net price).");
  b.card("CONCEPT", "Who bears more of a tax when demand is inelastic?", "Consumers: they cannot easily cut back, so they pay most of the tax in a higher price.");
  b.card("FORMULA", "How do you calculate tax revenue?", "Tax per unit × quantity sold after the tax.");
  b.card("CONCEPT", "Why does an indirect tax create a deadweight loss?", "Some trades that benefited buyers and sellers no longer take place.");
  b.card("CONCEPT", "What does a subsidy do to supply, price and quantity?", "Shifts supply to the right by the subsidy, lowers price and raises quantity.");
  b.card("FORMULA", "How do you calculate the cost of a subsidy?", "Subsidy per unit × quantity after the subsidy.");
  b.card("CONCEPT", "List **three** factors affecting the effectiveness of a tax or subsidy.", "Elasticities, size of the measure, avoidance or smuggling, distribution (regressive), administration cost and time period.");
});
