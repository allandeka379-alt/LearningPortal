// W2a: econ.markets.taxes-subsidies — specific and ad valorem indirect taxes, subsidies, incidence, as cures for market failure.
import { concept, P, schedule, money, pct, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};
const r = (x) => Math.round(x);
/** Market with a specific tax t (t < 0 = subsidy): linear Qd = a - bP, Qs = c + dP; after-tax supply at P is c + d(P - t). */
function taxMarket({ prices, a, bb, c, d, t, ...hdr }) {
  const qd = prices.map((x) => r(a - bb * x)), qs = prices.map((x) => r(c + d * x)), qsT = prices.map((x) => r(c + d * (x - t)));
  const s = schedule({ prices, qd, qs, requireEquilibrium: true, extra: [{ header: hdr.afterHeader, values: qsT }], ...hdr });
  const i = qd.findIndex((q, k) => q === qsT[k]);
  if (i < 0) throw new Error("no after-tax equilibrium on the grid");
  return { md: s.md, before: s.equilibrium, after: { price: prices[i], quantity: qd[i] }, qd, qs, qsT };
}

concept("econ.markets.taxes-subsidies", { file: "markets/taxes-subsidies", keyPrefix: "markets.taxes-subsidies" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **specific tax**?",
    options: [
      ["An indirect tax of a fixed amount on each unit sold", "Correct: for example US\\$0.50 per bottle, whatever the price."],
      ["An indirect tax charged as a percentage of the price", "This is an ad valorem tax, such as VAT."],
      ["A tax on a person's income from work", "Income tax is a direct tax."],
      ["A payment by government to producers of a good", "This is a subsidy."],
    ],
    answer: "A",
    explanation: "A specific (unit) tax is a fixed sum per unit; an ad valorem tax is a percentage of the price.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "The government puts an indirect tax on a good. What happens to the supply curve?",
    options: [
      ["It shifts to the left (upwards by the tax)", "Correct: the tax is an extra cost to sellers at every price."],
      ["It shifts to the right (downwards by the tax)", "A rightward shift is caused by lower costs, such as a subsidy."],
      ["It does not move, but demand shifts to the left", "The tax is collected from sellers, so supply shifts; demand stays put."],
      ["It becomes vertical at the old quantity", "A tax does not make supply perfectly inelastic."],
    ],
    answer: "A",
    explanation: "An indirect tax raises sellers' costs, so supply decreases: the curve shifts left, upwards by the tax per unit.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The government gives producers of solar lamps a subsidy for each lamp sold. What is the most likely effect on the market for solar lamps?",
    options: [
      ["The price falls and the quantity bought rises", "Correct: supply shifts right, giving a lower price and a higher quantity."],
      ["The price rises and the quantity bought falls", "This is the effect of an indirect tax."],
      ["The price falls and the quantity bought falls", "A lower price with more supply raises the quantity bought."],
      ["The price and quantity stay the same", "A subsidy lowers costs, so supply and equilibrium change."],
    ],
    answer: "A",
    explanation: "Lower costs shift supply to the right: the equilibrium price falls and the quantity rises.",
  });
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: 0.8 * 6250, daily: true,
    stem: "A specific tax of US\\$0.80 a litre is placed on cooking oil. Before the tax 6,900 litres a day were sold; after the tax 6,250 litres a day are sold. Calculate the daily tax revenue.",
    wrong: [0.8 * 6900, 0.8 * (6900 - 6250)],
    explanation: `Tax revenue = tax per unit × quantity sold after the tax = 0.80 × 6,250 = **${money(0.8 * 6250)}** a day. Using the old quantity (6,900) gives ${money(0.8 * 6900)}, which overstates it.`,
  });
  // Calc: specific tax of US$0.70 per kg. Qd = 7350 - 1500P, Qs = -3150 + 2000P.
  const M = taxMarket({ prices: [2.8, 3.0, 3.2, 3.4, 3.6], a: 7350, bb: 1500, c: -3150, d: 2000, t: 0.7, priceHeader: "Price paid by consumers (US\\$ per kg)", qdHeader: "Quantity demanded (kg per week)", qsHeader: "Quantity supplied before tax", afterHeader: "Quantity supplied after tax" });
  check("M before", M.before.price, 3.0);
  check("M after", M.after.price, 3.4);
  const revM = 0.7 * M.after.quantity;
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: revM, calculator: true,
    stem: `A fictional government places a specific tax of US\\$0.70 per kg on refined sugar. The table shows the weekly market in one town before and after the tax.\n\n${M.md}\n\nCalculate the government's weekly tax revenue.`,
    wrong: [0.7 * M.before.quantity, M.after.price * M.after.quantity],
    hints: ["Find the new equilibrium: where quantity demanded equals quantity supplied after tax.", "Revenue = tax per unit × new quantity."],
    explanation: `1. After the tax, quantity demanded equals quantity supplied (after tax) at US\\$${M.after.price.toFixed(2)}: ${M.after.quantity.toLocaleString("en-GB")} kg.\n2. Revenue = 0.70 × ${M.after.quantity.toLocaleString("en-GB")} = **${money(revM)}** a week.\n3. Using the old quantity (${M.before.quantity.toLocaleString("en-GB")} kg) gives ${money(0.7 * M.before.quantity)}; multiplying the new price by the new quantity gives consumers' spending, not the tax.`,
  });
  const share = ((5.12 - 4.6) / 0.8) * 100;
  check("share", share, 65);
  b.num({
    d: 3, skill: "APPLICATION", kind: "pct", value: share,
    stem: "A specific tax of US\\$0.80 per unit is placed on a good. Its price rises from US\\$4.60 to US\\$5.12. What percentage of the tax is paid by consumers? Give your answer to one decimal place.",
    wrong: [100 - share, ((5.12 - 4.6) / 4.6) * 100],
    hints: ["Consumers' share = rise in price ÷ tax per unit × 100."],
    explanation: `Consumers pay 5.12 − 4.60 = US\\$0.52 of the US\\$0.80 tax: 0.52 ÷ 0.80 × 100 = **${pct(share, 1)}**. Producers bear the other ${pct(100 - share, 1)}. Dividing by the old price (${pct(((5.12 - 4.6) / 4.6) * 100, 1)}) gives the percentage change in price, not the share of the tax.`,
  });
  const subCost = 1.5 * 7400;
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: subCost,
    stem: "A fictional government pays a subsidy of US\\$1.50 for each solar lamp sold. Before the subsidy 6,100 lamps a month were sold; afterwards 7,400 lamps a month are sold. Calculate the monthly cost of the subsidy to the government.",
    wrong: [1.5 * 6100, 1.5 * (7400 - 6100)],
    hints: ["Cost = subsidy per unit × quantity sold after the subsidy."],
    explanation: `1. The subsidy is paid on every lamp sold after it is introduced: 7,400 lamps.\n2. Cost = 1.50 × 7,400 = **${money(subCost)}** a month.\n3. ${money(1.5 * 6100)} uses the old quantity; ${money(1.5 * 1300)} pays only on the extra lamps.`,
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "How does the effect of an ad valorem tax on the supply curve differ from that of a specific tax?",
    options: [
      ["The new supply curve is steeper, because the tax per unit rises with price", "Correct: a percentage tax is larger at higher prices, so the gap widens."],
      ["The new supply curve is parallel, because the tax per unit is fixed", "A parallel shift is the effect of a specific tax."],
      ["The supply curve shifts to the right, because the tax is a percentage", "Any indirect tax reduces supply (a shift to the left)."],
      ["The demand curve shifts instead, because buyers pay the percentage", "The tax is collected from sellers, so supply shifts."],
    ],
    answer: "A",
    hints: ["Is the tax per unit the same at a high price as at a low price?"],
    explanation: "With an ad valorem tax the amount of tax per unit grows as price rises, so the vertical gap between S1 and S2 widens: S2 is steeper (it pivots).",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A government puts the same specific tax on two goods. Demand for good X is price inelastic; demand for good Y is price elastic. Which statement is correct?",
    options: [
      ["Consumers of X bear a larger share of the tax than consumers of Y", "Correct: with inelastic demand sellers can pass most of the tax on in a higher price."],
      ["The quantity of X falls by more than the quantity of Y", "Inelastic demand means quantity changes little."],
      ["The tax raises less revenue from X than from Y, other things equal", "Sales of X fall less, so more revenue is raised from X."],
      ["Producers of X bear a larger share of the tax than producers of Y", "Producers bear more when demand is elastic, as for Y."],
    ],
    answer: "A",
    hints: ["Think about who can 'escape' the tax by buying less."],
    explanation: "When demand is inelastic, buyers keep buying at a higher price, so most of the tax is passed on; quantity falls little and revenue is high. With elastic demand, sellers must absorb more of the tax.",
  });
  b.mcq({
    d: 4, skill: "APPLICATION",
    stem: "A specific tax of US\\$1.20 per unit is introduced. The market price rises from US\\$6.00 to US\\$6.80. How much of the tax per unit is borne by producers?",
    options: [
      ["US\\$0.40", "Correct: producers keep 6.80 − 1.20 = 5.60, which is 0.40 less than before."],
      ["US\\$0.80", "This is the share paid by consumers (the rise in price)."],
      ["US\\$1.20", "This is the whole tax per unit."],
      ["US\\$2.00", "This adds the rise in price to the tax; it is not anyone's share."],
    ],
    answer: "A",
    hints: ["Price kept by producers = new price − tax.", "Compare with the old price."],
    explanation: "Consumers pay US\\$0.80 more. Producers now keep US\\$5.60 instead of US\\$6.00, so they bear **US\\$0.40**. The two shares add up to the tax of US\\$1.20.",
  });
  check("prod share", 6 - (6.8 - 1.2), 0.4);
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which of the following is an example of an **ad valorem** tax?",
    options: [
      ["Value added tax charged as a percentage of the selling price", "Correct: the tax is a percentage of the value."],
      ["A duty of a fixed sum on each litre of fuel", "A fixed sum per unit is a specific tax."],
      ["Income tax deducted from a worker's monthly wage", "Income tax is a direct tax."],
      ["A fixed licence fee paid each year by a bus operator to the council", "A licence fee does not vary with the price of each unit sold."],
    ],
    answer: "A",
    explanation: "Ad valorem means 'according to value': VAT is the usual example.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which good is a government most likely to subsidise in order to correct a market failure?",
    options: [
      ["Vaccinations against childhood diseases", "Correct: a merit good with external benefits, under-consumed in a free market."],
      ["Cigarettes sold in supermarkets", "Cigarettes are a demerit good, more likely to be taxed."],
      ["Luxury cars imported from abroad", "There is no market failure argument for encouraging luxury cars."],
      ["Fuel for private generators that pollute the air", "Polluting fuel has external costs and would be taxed, not subsidised."],
    ],
    answer: "A",
    explanation: "Subsidies are used for merit goods and goods with external benefits, which a free market under-provides.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A subsidy to producers shifts the supply curve to the right.",
    answer: true,
    explanation: "True. The subsidy lowers producers' costs, so they supply more at every price.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Indirect taxes on basic goods are progressive, because poorer households pay a larger share of their income in tax.",
    answer: false,
    explanation: "False. A tax that takes a larger share of poorer people's income is **regressive**, not progressive. Indirect taxes on basic goods are usually regressive.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Specific tax", "A fixed amount of tax on each unit sold"],
      ["Ad valorem tax", "A tax charged as a percentage of the price"],
      ["Subsidy", "A payment by government that lowers producers' costs"],
      ["Tax incidence", "How the burden of a tax is shared between buyers and sellers"],
    ],
    explanation: "Specific = per unit; ad valorem = percentage; subsidy = government payment; incidence = who bears the tax.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "An indirect tax shifts the supply curve to the {{blank:a}}, so the equilibrium price {{blank:b}} and the quantity {{blank:c}}. A subsidy shifts the supply curve to the {{blank:d}}.",
    blanks: [
      { id: "a", accepted: ["left"], choices: ["left", "right"] },
      { id: "b", accepted: ["rises"], choices: ["rises", "falls"] },
      { id: "c", accepted: ["falls"], choices: ["rises", "falls"] },
      { id: "d", accepted: ["right"], choices: ["left", "right"] },
    ],
    wrong: [["right", "falls", "rises", "left"]],
    explanation: "Tax: supply left, price up, quantity down. Subsidy: supply right, price down, quantity up.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the diagram you would use to show the effect of a subsidy to producers of a good.",
    points: [
      "Price on the vertical axis, quantity on the horizontal axis; downward-sloping demand and upward-sloping supply S1 meeting at P1/Q1.",
      "Supply shifts to the right (downwards) to S2, by the amount of the subsidy per unit.",
      "New equilibrium where D meets S2: a lower price P2 and a higher quantity Q2.",
      "Shows that producers receive P2 plus the subsidy, and the cost to government is the subsidy × Q2.",
    ],
    modelAnswer: "Price is on the vertical axis and quantity on the horizontal axis. The demand curve slopes down and the original supply curve S1 slopes up; they meet at P1 and Q1. The subsidy shifts supply to the right, to S2, which lies below S1 by the subsidy per unit. D and S2 cross at a lower price P2 and a larger quantity Q2. Producers receive P2 plus the subsidy, and the government's cost is the subsidy per unit times Q2.",
    hints: ["Axes, curves, the direction and size of the shift, the new equilibrium."],
    explanation: "Credit: axes and curves, rightward shift by the subsidy, lower price and higher quantity, cost or price received by producers.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** reasons why a large tax on cigarettes may not greatly reduce smoking.",
    points: [
      "Demand for cigarettes is price inelastic (addiction, few substitutes).",
      "So the price rises but the quantity bought falls only a little.",
      "Smuggling / illegal or untaxed cigarettes become more attractive.",
      "So smokers switch to cheaper illegal supplies rather than stopping.",
    ],
    modelAnswer: "First, demand for cigarettes is price inelastic because smokers are addicted and there are few substitutes, so although the tax raises the price, the quantity bought falls only slightly. Second, a large tax creates a big gap between the legal price and the cost of smuggled cigarettes, so some smokers buy illegal, untaxed packs instead of giving up.",
    hints: ["Think about price elasticity of demand.", "What might smokers buy instead?"],
    explanation: "Inelastic demand and illegal supply both weaken the effect of the tax on consumption.",
  });

  // Structured 1: tax on cigarettes. Qd = 5700 - 400P, Qs = -1500 + 800P, tax US$1.50 per pack.
  const T = taxMarket({ prices: [5, 5.5, 6, 6.5, 7, 7.5], a: 5700, bb: 400, c: -1500, d: 800, t: 1.5, priceHeader: "Price per pack (US\\$)", qdHeader: "Quantity demanded (packs per day)", qsHeader: "Quantity supplied before tax", afterHeader: "Quantity supplied after tax" });
  check("T before", T.before.price, 6);
  check("T after", T.after.price, 7);
  const revT = 1.5 * T.after.quantity;
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 12, calculator: true,
    stem: `A fictional government introduces a specific tax of US\\$1.50 per pack of cigarettes to reduce smoking. The table shows the daily market in one city.\n\n${T.md}`,
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "money", value: T.after.price, dp: 2, stem: "State the equilibrium price after the tax.", wrong: [T.before.price + 1.5], explanation: `After the tax, quantity demanded equals quantity supplied (after tax) at US\\$${T.after.price.toFixed(2)} (${T.after.quantity.toLocaleString("en-GB")} packs).` }),
      P.num({ label: "(b)", marks: 1, kind: "money", value: T.after.price - T.before.price, dp: 2, stem: "By how much per pack does the price paid by consumers rise?", wrong: [1.5], explanation: `From US\\$${T.before.price.toFixed(2)} to US\\$${T.after.price.toFixed(2)}: US\\$${(T.after.price - T.before.price).toFixed(2)}, less than the full tax.` }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: revT, stem: "Calculate the daily tax revenue.", wrong: [1.5 * T.before.quantity], explanation: `1.50 × ${T.after.quantity.toLocaleString("en-GB")} = ${money(revT)} a day.` }),
      P.manual({
        label: "(d)", marks: 2,
        stem: "Using the figures, explain why most of the tax is paid by consumers.",
        points: [
          "Consumers pay US\\$1.00 of the US\\$1.50 tax (two-thirds); producers keep US\\$5.50, bearing US\\$0.50.",
          "Because demand is price inelastic: quantity falls only from 3,300 to 2,900 packs (12.1%) though price rises 16.7%.",
        ],
        modelAnswer: "Consumers pay US\\$1.00 of the US\\$1.50 tax, while producers' price falls from US\\$6.00 to US\\$5.50 (US\\$0.50). This is because demand is price inelastic: the price rises by about 16.7% but the quantity falls by only about 12.1%, so sellers can pass most of the tax on.",
        explanation: "Shares of the tax, linked to inelastic demand.",
      }),
      P.manual({
        label: "(e)", marks: 6, levels: LV(6),
        stem: "Discuss whether the tax is likely to achieve the government's aim of reducing smoking.",
        points: [
          "For: consumption falls by 400 packs a day (from 3,300 to 2,900), so some smokers cut down or quit.",
          "For: revenue (US\\$4,350 a day) can fund health care or anti-smoking campaigns; young people, who have less income, may be deterred from starting.",
          "Against: demand is inelastic, so the fall in smoking is small compared with the rise in price.",
          "Against: smuggling and illegal sales may grow; the tax is regressive and hits poor smokers hardest.",
          "Other measures (advertising bans, age limits, education) may work better or be needed alongside.",
          "Justified conclusion.",
        ],
        modelAnswer: "The tax does reduce smoking: the quantity bought falls from 3,300 to 2,900 packs a day, and the higher price may stop young people with little income from starting. It also raises US\\$4,350 a day, which could pay for treating smoking-related illness or for campaigns. However, because demand is inelastic the fall in smoking is small, only about 12%, while the price rises by a sixth. Smokers who are addicted keep buying and are made poorer, and a higher price encourages smuggling of untaxed cigarettes. The tax is therefore only partly effective; it works best with other measures such as advertising bans, age limits and education.",
        explanation: "Weigh the fall in consumption and the revenue against inelastic demand, regressiveness and smuggling.",
      }),
    ],
    hints: ["The after-tax equilibrium is where quantity demanded equals the after-tax supply.", "Revenue = tax × new quantity."],
    explanation: `The tax raises the price from US\\$6.00 to US\\$7.00 and cuts sales from 3,300 to 2,900 packs a day, raising ${money(revT)}. Demand is inelastic, so consumers bear most of the tax and smoking falls only a little.`,
  });
  check("pct q", ((3300 - 2900) / 3300) * 100, 12.1212); check("rev", revT, 4350); check("pct p", (1 / 6) * 100, 16.6667);

  // Structured 2: bus-fare subsidy.
  const busCost = 0.15 * 53500;
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, marks: 8,
    stem: "A fictional city council pays private bus operators a subsidy of US\\$0.15 for each passenger trip. Average fares fall and the number of trips rises from 48,000 to 53,500 a day. The council hopes that fewer people will drive into the city centre, reducing traffic jams and air pollution.",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: busCost, stem: "Calculate the daily cost of the subsidy to the council.", wrong: [0.15 * 48000, 0.15 * 5500], explanation: `0.15 × 53,500 = ${money(busCost)} a day (the subsidy is paid on every trip, not just the extra ones).` }),
      P.manual({
        label: "(b)", marks: 6, levels: LV(6),
        stem: "Discuss whether subsidising bus travel is a good way to reduce traffic jams and pollution.",
        points: [
          "For: lower fares raise bus use; if car drivers switch, there are fewer cars, less congestion and pollution (external benefits).",
          "For: helps low-income travellers afford trips to work and school.",
          "Against: opportunity cost of the council's spending; the subsidy is paid on all trips, including those who already used the bus.",
          "Against: car drivers may not switch if buses are slow, unreliable or crowded (demand for car travel may not respond to bus fares).",
          "Against: operators may keep part of the subsidy or become inefficient; hard to remove later.",
          "Justified conclusion (for example useful if combined with better services or charges on car use).",
        ],
        modelAnswer: "The subsidy has made bus travel cheaper and trips have risen by 5,500 a day. If some of these are people who used to drive, there are fewer cars in the centre, so less congestion and air pollution, which benefits everyone, and poorer travellers can afford to get to work. However, the council spends over US\\$8,000 a day, most of it on trips that would have been made anyway, and that money has an opportunity cost. Many new passengers may be people who used to walk, not drivers; drivers switch only if buses are fast and reliable. Operators may also pocket part of the subsidy. The subsidy helps, but it works best combined with better bus services and charges for driving into the centre.",
        explanation: "External benefits and fairness versus cost, uncertain switching from cars and operator inefficiency.",
      }),
    ],
    hints: ["Cost = subsidy per trip × all trips after the subsidy.", "Do the new bus passengers come from cars?"],
    explanation: "Cost = US\\$0.15 × 53,500 trips. A good answer weighs the external benefits of fewer cars against the cost and doubts about who switches.",
  });

  b.card("DEFINITION", "Define an **indirect tax**.", "A tax on spending on goods and services, collected from sellers and partly passed on to consumers in higher prices (for example VAT, excise duty).");
  b.card("DEFINITION", "Specific tax versus ad valorem tax?", "Specific: a fixed amount per unit. Ad valorem: a percentage of the price (for example VAT).");
  b.card("DEFINITION", "Define a **subsidy**.", "A government payment to producers (or consumers) that lowers costs and price and raises output and consumption.");
  b.card("CONCEPT", "How does an indirect tax change the market?", "Supply shifts left (up by the tax): price rises, quantity falls.");
  b.card("CONCEPT", "How does a subsidy change the market?", "Supply shifts right (down by the subsidy): price falls, quantity rises.");
  b.card("FORMULA", "How do you calculate tax revenue and subsidy cost?", "Tax revenue = tax per unit × new quantity. Subsidy cost = subsidy per unit × new quantity.");
  b.card("CONCEPT", "Who bears most of an indirect tax when demand is inelastic?", "Consumers: sellers can pass most of the tax on because buyers keep buying.");
  b.card("FACT", "What shape is the shift caused by an ad valorem tax?", "The new supply curve is steeper (it pivots), because the tax per unit rises with price.");
  b.card("CONCEPT", "Give two disadvantages of indirect taxes on demerit goods.", "Little effect when demand is inelastic; regressive; encourage smuggling; hard to set the right rate.");
  b.card("CONCEPT", "Give two disadvantages of subsidies.", "Opportunity cost / higher taxes; firms may become inefficient and dependent; hard to remove; may not be fully passed on.");
});
