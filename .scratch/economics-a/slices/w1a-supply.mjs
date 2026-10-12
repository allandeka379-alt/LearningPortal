// W1a: supply (both boards): schedule, determinants, movements and shifts, taxes and subsidies.
import { concept, P, chk, fmt, table, schedule, marketSum, pctChange } from "../lib.mjs";

const LV8 = [
  [3, 6, 8, "Two-sided, applied and developed, with a justified conclusion."],
  [2, 3, 5, "Some development of one or both sides, limited application or conclusion."],
  [1, 1, 2, "Simple, undeveloped points."],
];

concept("aecon.market.supply", { file: "market/supply", keyPrefix: "market.supply" }, (b) => {
  const mc = (o, correct, wrongs) => b.mcq({ ...o, options: [correct, ...wrongs], answer: "A" });

  const prices = [1, 2, 3, 4, 5];
  const A = [1, 4, 7, 10, 13], B = [1, 2, 4, 6, 8], C = [0, 2, 3, 5, 7];
  const M = marketSum([A, B, C]);
  chk(M[2], 14); chk(M[1], 8); chk(M[3], 21);
  const S1 = schedule({ prices, qs: M, priceHeader: "Price (US\\$ per crate)", qsHeader: "Quantity supplied (crates per week)" });
  const S2q = M.map((q) => q + 6);
  const ctx = `The table shows the market supply of tomatoes in a fictional district (illustrative data).\n\n${S1.md}`;
  const ind = table(["Price (US\\$ per crate)", "Farm A", "Farm B", "Farm C"], prices.map((p, i) => [p, A[i], B[i], C[i]]));

  mc({ d: 1, skill: "RECALL", stem: "According to the law of supply, other things being equal, a rise in the price of a good will",
    explanation: "The law of supply states that quantity supplied rises when price rises." },
    ["increase the quantity supplied", "Correct."],
    [["decrease the quantity supplied", "That would be a downward-sloping supply curve."],
     ["shift the supply curve to the left", "A price change causes a movement along the curve."],
     ["reduce the quantity demanded and the quantity supplied", "The law of supply concerns sellers."]]);

  mc({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Which of the following causes a **movement along** the supply curve of maize?",
    explanation: "Only a change in the price of maize itself moves along its supply curve; the others shift it." },
    ["A rise in the price of maize", "Correct."],
    [["A drought that reduces yields", "Weather shifts the curve."],
     ["A new tax on fertiliser", "A cost change shifts the curve."],
     ["A better type of seed", "Technology shifts the curve."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "The government introduces a tax of US\\$0.20 on each litre of cooking oil sold. The effect on the supply curve is that it",
    explanation: "An indirect tax raises firms' costs, so supply decreases: the curve shifts left (upward by the amount of the tax)." },
    ["shifts to the left (upward)", "Correct."],
    [["shifts to the right (downward)", "That is the effect of a subsidy."],
     ["does not shift but becomes steeper", "A per-unit tax shifts the curve by a constant amount."],
     ["remains unchanged because buyers pay the tax", "The tax is a cost for producers, whoever finally bears it."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "A government pays a subsidy to producers of maize. This will",
    explanation: "A subsidy lowers costs of production, so supply increases (shifts right)." },
    ["increase the supply of maize", "Correct."],
    [["decrease the supply of maize", "A subsidy lowers costs."],
     ["cause a movement up the supply curve", "The curve itself shifts."],
     ["raise the cost of growing maize", "It lowers the cost."]]);

  mc({ d: 3, skill: "APPLICATION", hints: ["Does the event change the cost of producing or the price of the good?"],
    stem: "A farmer in Masvingo can grow either sunflowers or soya beans on the same land. The price of soya beans rises sharply. What is the likely effect on the supply of sunflowers?",
    explanation: "Land moves to the more profitable crop, so the supply of sunflowers decreases (shifts left)." },
    ["A decrease in supply, as land is switched to soya beans", "Correct."],
    [["An increase in supply, as sunflower prices must rise", "The price of sunflowers has not changed."],
     ["An extension of supply along the same curve", "No change in the sunflower price has occurred."],
     ["No effect, because the crops are unrelated", "They compete for the same land."]]);

  mc({ d: 3, skill: "APPLICATION", hints: ["Compare the quantity at each price before and after."],
    stem: `${ctx}\n\nCosts fall so that farms supply 6 more crates at every price. How many crates are supplied at US\\$4?`,
    explanation: "At US\\$4 supply was 21 crates; a fall in costs adds 6 at every price: 27 crates." },
    ["27", "Correct: 21 + 6."],
    [["21", "That is the quantity before the shift."],
     ["6", "That is only the increase."],
     ["34", "That is the new quantity at US\\$5."]]);

  mc({ d: 3, skill: "ANALYSIS", hints: ["Think of the weather and production."],
    stem: "A severe drought reduces yields on tomato farms in a district. Which statement is correct?",
    explanation: "Weather changes production conditions: producers can supply less at every price, so supply decreases (shift left)." },
    ["The supply curve shifts to the left", "Correct."],
    [["The supply curve shifts to the right", "Supply has fallen."],
     ["There is a contraction along the supply curve", "The price has not changed first; this is a shift."],
     ["The quantity demanded falls because supply has fallen", "The drought directly affects supply."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "Which of the following explains why the supply curve slopes upward in the short run?",
    explanation: "With at least one factor fixed, extra output requires more costly inputs, so producers need a higher price to supply more." },
    ["Marginal costs rise as output increases", "Correct."],
    [["Consumers buy less at higher prices", "That explains the demand curve."],
     ["Firms always have unused capacity", "Rising costs show that capacity is limited."],
     ["Producers are unaware of price changes", "Producers respond to price."]]);

  b.num({ d: 2, skill: "APPLICATION", kind: "plain", value: M[3], unit: "units", daily: true,
    stem: `The table shows three farms' supply of tomatoes at different prices (illustrative data).\n\n${ind}\n\nCalculate the market supply at a price of US\\$4, in crates.`,
    wrong: [A[3], A[3] + B[3]],
    explanation: `Add the quantities: ${A[3]} + ${B[3]} + ${C[3]} = **${M[3]}** crates. ${A[3]} is Farm A only and ${A[3] + B[3]} omits Farm C.` });

  {
    const pc = pctChange(M[1], M[2]);
    chk(pc, 75);
    b.num({ d: 3, skill: "APPLICATION", kind: "pct", value: pc, dp: 0, unit: "%", hints: ["Percentage change = change ÷ original × 100."],
      stem: `${ctx}\n\nCalculate the percentage change in quantity supplied when the price rises from US\\$2 to US\\$3.`,
      wrong: [(6 / 14) * 100, 6],
      explanation: `From ${M[1]} to ${M[2]} crates: (${M[2]} − ${M[1]}) ÷ ${M[1]} × 100 = **${fmt(pc)}%**. Dividing by the new quantity gives 43%.` });
  }
  {
    const c = -20, d = 10, p = 4, q = c + d * p, tax = 1, qTax = c + d * (p - tax);
    chk(q, 20); chk(qTax, 10);
    b.calc({ d: 4, skill: "APPLICATION", kind: "plain", value: qTax, unit: "units", hints: ["The producer receives the price minus the tax."],
      stem: "The supply of a good is Qs = −20 + 10P, where P is the price in US\\$ and Qs is in units. The government introduces a tax of US\\$1 per unit paid by producers. How many units will be supplied when the price paid by consumers is US\\$4?",
      wrong: [20, -20 + 10 * 5],
      explanation: `1. Producers receive 4 − 1 = US\\$3 per unit.\n2. Qs = −20 + 10(3) = **${qTax}** units.\n\nWithout the tax Qs at US\\$4 would be ${q}; US\\$30 is not a quantity.` });
  }

  b.tf({ d: 1, skill: "RECALL", stem: "A subsidy to producers causes an increase in supply.", answer: true,
    explanation: "True. A subsidy lowers costs, so producers supply more at every price." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A rise in the price of a good shifts its own supply curve to the right.", answer: false,
    explanation: "False. A rise in the good's own price causes an extension of supply along the curve." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each event to its effect on the supply of tomatoes.",
    pairs: [["The price of tomatoes rises", "Extension along the supply curve"], ["A cheaper fertiliser lowers costs", "Supply curve shifts to the right"], ["A new tax per crate is introduced", "Supply curve shifts to the left"], ["A severe drought occurs", "Supply curve shifts to the left"]],
    explanation: "Own price: movement; costs, taxes and weather: shifts." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "A subsidy {{blank:a}} costs of production and causes an {{blank:b}} in supply.",
    blanks: [{ id: "a", accepted: ["lowers"], choices: ["lowers", "raises"] }, { id: "b", accepted: ["increase"], choices: ["increase", "decrease", "extension"] }],
    wrong: [["raises", "extension"]],
    explanation: "A subsidy lowers costs, so supply increases (shifts right)." });

  b.short({ d: 2, skill: "RECALL", stem: "What word describes a rise in quantity supplied caused by a rise in the good's own price?",
    accepted: ["extension", "extension of supply", "an extension"], wrong: ["increase in supply"],
    explanation: "An extension of supply: a movement along the curve." });

  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Link price to profit and cost."],
    stem: "Explain why the supply curve slopes upward.",
    points: ["A higher price increases profit, so producers want to produce more.", "In the short run, extra output needs more costly inputs (marginal cost rises).", "Producers will supply more only if the higher price covers the higher cost."],
    modelAnswer: "A higher price makes production more profitable, so producers want to supply more. In the short run, however, extra output needs more costly inputs, so marginal cost rises and firms will only supply more if the higher price covers the higher cost.",
    explanation: "Profit motive and rising marginal cost." });

  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4, hints: ["Which curve shifts, and in which direction?"],
    stem: "The government of a fictional country raises the tax on fuel used in transport. Analyse the effect on the supply of vegetables sold in a city market.",
    points: ["Fuel is a cost of transporting vegetables.", "The cost of production (delivery) rises.", "Supply decreases: the curve shifts to the left.", "Producers supply less at each price; the market price may rise."],
    modelAnswer: "Fuel is used to transport vegetables to the market, so a tax on fuel raises the costs of supplying them. The supply curve shifts to the left, so less is supplied at every price, and without a change in demand the market price would tend to rise.",
    explanation: "Higher costs decrease supply." });

  // Structured 1.
  {
    const tab = table(["Price (US\\$ per crate)", "S1: before the new tax (crates per week)", "S2: after the new tax (crates per week)"], [[2, 9, 4], [3, 15, 9], [4, 22, 15], [5, 30, 22]]);
    b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, hints: ["Compare the quantities at each price."],
      stem: `The government introduces a tax of US\\$1 on each crate of tomatoes sold. The table shows market supply before (S1) and after (S2) the tax (illustrative data).\n\n${tab}`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "plain", value: 9, unit: "units", stem: "How many crates are supplied at a price of US\\$3 after the tax?", wrong: [15, 3], explanation: "From S2: 9 crates." }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: pctChange(15, 9), dp: 1, unit: "%", stem: "Calculate the percentage change in quantity supplied at US\\$3 caused by the tax, to one decimal place. Include the minus sign.", wrong: [40, -6],
          explanation: "(9 − 15) ÷ 15 × 100 = −40.0%." }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain why the tax shifts the supply curve to the left.",
          points: ["The tax raises the cost of supplying each crate by US\\$1.", "Producers receive only the price minus US\\$1.", "So at each market price they supply less (they need US\\$1 more for each quantity)."],
          modelAnswer: "The tax adds US\\$1 to the cost of each crate, so producers receive the price minus US\\$1. They will supply a given quantity only if the market price is US\\$1 higher than before, so at every price they supply less and the supply curve shifts to the left." }),
        P.manual({ label: "(d)", marks: 4, stem: "Discuss whether the tax is likely to raise the price of tomatoes for consumers.",
          points: ["Supply decreases; with no change in demand the equilibrium price rises.", "The rise depends on how responsive demand and supply are.", "Producers may bear some of the tax by receiving less.", "A conclusion: price probably rises by less than the US\\$1 tax."],
          modelAnswer: "Supply decreases, so without a change in demand the equilibrium price rises. But consumers cut back as the price rises, so producers have to absorb part of the tax by accepting a lower price after tax, and the price therefore rises by less than US\\$1. How much depends on how responsive buyers and sellers are." }),
      ],
      explanation: "At US\\$3 supply falls from 15 to 9 crates (−40.0%); a tax raises costs and shifts supply left; price rises by less than the tax." });
  }

  // Structured 2.
  {
    const tab = table(["Year", "Price of maize (US\\$ per tonne)", "Price of sunflower (US\\$ per tonne)", "Sunflower grown (thousand tonnes)"], [["Year 1", "200", "400", 60], ["Year 2", "260", "400", 48]], { align: ["l", "r", "r", "r"] });
    const maizeUp = pctChange(200, 260), sfDown = pctChange(60, 48);
    chk(maizeUp, 30); chk(sfDown, -20);
    b.struct({ d: 3, skill: "ANALYSIS", examStyle: true, hints: ["The price of sunflower did not change."],
      stem: `The table shows data from a fictional farming district (illustrative data).\n\n${tab}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "pct", value: maizeUp, dp: 0, unit: "%", stem: "Calculate the percentage rise in the price of maize.", wrong: [60, 23.1], explanation: "(260 − 200) ÷ 200 × 100 = 30%." }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: sfDown, dp: 0, unit: "%", stem: "Calculate the percentage change in sunflower grown. Include the minus sign.", wrong: [20, -25], explanation: "(48 − 60) ÷ 60 × 100 = −20%." }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain why the supply of sunflower decreased although its price did not change.",
          points: ["The price of maize, an alternative crop, rose by 30%.", "Maize became more profitable, so farmers switched land to it.", "So less sunflower was supplied at the same price: the curve shifted left."],
          modelAnswer: "Maize prices rose by 30%, making maize more profitable than sunflower. Farmers moved land from sunflower to maize, so less sunflower was supplied at each price and the supply curve shifted to the left." }),
        P.manual({ label: "(d)", marks: 3, stem: "State **three** other determinants that could shift the supply curve of sunflower.",
          points: ["Costs of production (for example fertiliser, seed, labour).", "Technology or yields (for example better seed).", "Weather, taxes or subsidies, or the number of producers."],
          modelAnswer: "Costs of production such as fertiliser, improvements in technology such as better seed, and the weather or a subsidy could each shift the supply curve." }),
      ],
      explanation: "Maize +30%; sunflower −20%; supply of one crop falls when an alternative crop becomes more profitable." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Consider the likely size and speed of the effect on supply.", "Reach a conclusion."],
    stem: "Evaluate whether a subsidy to farmers is the best way to increase the supply of maize.",
    points: ["A subsidy lowers costs and shifts supply right.", "It may raise output and lower the price for consumers.", "The government pays, so there is an opportunity cost of public money.", "Farmers' response depends on weather, inputs and credit.", "Better technology, irrigation or roads may increase supply more sustainably.", "A subsidy may be inefficient or go to larger farms.", "Time lags: planting seasons limit short-run responses.", "A justified judgement."],
    levels: LV8,
    modelAnswer: "A subsidy lowers farmers' costs and shifts the supply curve to the right, so more maize is produced and the price to consumers falls. But the government pays for it, so the money is not available for other uses, and subsidies may mainly benefit larger farmers or be inefficiently targeted. The response of output also depends on rainfall, access to seed and credit, and the length of the growing season, so the effect in the short run may be limited. Investment in irrigation, research and roads can raise supply for the long term without continuing payments. A subsidy can help in the short run if well targeted, but other policies may be better for lasting increases in supply.",
    wordLimit: { min: 100, max: 300 },
    explanation: "Weigh the shift against its cost and alternatives." });

  b.card("DEFINITION", "Define **supply**.", "The quantity of a good that producers are willing and able to sell at each price in a given period, other things being equal.");
  b.card("CONCEPT", "State the **law of supply**.", "Ceteris paribus, as the price of a good rises, the quantity supplied rises, and as the price falls, the quantity supplied falls.");
  b.card("CONCEPT", "Why does the supply curve slope upward?", "A higher price raises profit, and rising marginal costs mean producers need higher prices to supply more.");
  b.card("CONCEPT", "What causes a movement along the supply curve?", "A change in the good's own price: extension (price rises) or contraction (price falls).");
  b.card("CONCEPT", "What causes a shift of the supply curve?", "A change in costs, technology, taxes or subsidies, prices of other goods, number of firms, weather or expectations.");
  b.card("CONCEPT", "Effect of an indirect tax on supply", "It raises costs, so supply decreases: the curve shifts left (upward by the tax).");
  b.card("CONCEPT", "Effect of a subsidy on supply", "It lowers costs, so supply increases: the curve shifts right (downward by the subsidy).");
  b.card("CONCEPT", "How do you find **market supply**?", "Add the quantities supplied by all firms at each price (horizontal summation).");
});
