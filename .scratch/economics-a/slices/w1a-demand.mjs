// W1a: demand (both boards): schedule, determinants, movements and shifts, normal and inferior goods.
import { concept, P, chk, fmt, table, schedule, marketSum, pctChange } from "../lib.mjs";

const LV8 = [
  [3, 6, 8, "Two-sided, applied and developed, with a justified conclusion."],
  [2, 3, 5, "Some development of one or both sides, limited application or conclusion."],
  [1, 1, 2, "Simple, undeveloped points."],
];

concept("aecon.market.demand", { file: "market/demand", keyPrefix: "market.demand" }, (b) => {
  const mc = (o, correct, wrongs) => b.mcq({ ...o, options: [correct, ...wrongs], answer: "A" });

  // Fictional market for 10 kg bags of maize meal.
  const prices = [5, 4, 3, 2, 1];
  const A = [2, 4, 6, 8, 10], B = [1, 2, 4, 6, 9], C = [0, 1, 2, 4, 6];
  const M = marketSum([A, B, C]);
  const D1 = schedule({ prices, qd: M, priceHeader: "Price (US\\$ per bag)", qdHeader: "Quantity demanded (bags per week)" });
  const M2 = M.map((q) => q + 4);
  const D2 = schedule({ prices, qd: M2 });
  chk(M[2], 12); chk(M[3], 18);
  const ctx = `The table shows the market demand for 10 kg bags of maize meal in a fictional town (illustrative data).\n\n${D1.md}`;
  const ind = table(["Price (US\\$ per bag)", "Tendai", "Rudo", "Farai"], prices.map((p, i) => [p, A[i], B[i], C[i]]));

  mc({ d: 1, skill: "RECALL", stem: "According to the law of demand, other things being equal, a rise in the price of a good will",
    explanation: "The law of demand states that quantity demanded falls when price rises, ceteris paribus." },
    ["reduce the quantity demanded", "Correct."],
    [["increase the quantity demanded", "That would be an upward-sloping demand curve."],
     ["shift the demand curve to the right", "A price change causes a movement along the curve."],
     ["reduce the supply of the good", "The law of demand is about buyers, not sellers."]]);

  mc({ d: 1, skill: "RECALL", stem: "What is meant by effective demand?",
    explanation: "Effective demand is willingness to buy backed by the ability to pay." },
    ["Willingness to buy backed by the ability to pay", "Correct."],
    [["Any wish to own a good, whatever the buyer's income", "A wish without the ability to pay is not effective."],
     ["The total quantity that a firm is able to produce", "That is supply."],
     ["The quantity bought in the previous period", "That is past consumption."]]);

  mc({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Which of the following causes a **movement along** the demand curve for tomatoes?",
    explanation: "Only a change in the good's own price causes a movement along its demand curve; the others shift the curve." },
    ["A fall in the price of tomatoes", "Correct."],
    [["A rise in consumers' incomes", "Income is another determinant: it shifts the curve."],
     ["A rise in the price of a substitute such as cabbage", "A related-good price shifts the curve."],
     ["A change in consumers' tastes towards tomatoes", "Tastes shift the curve."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "A rise in the price of tea leads to an increase in the demand for coffee. Tea and coffee are",
    explanation: "When the price of one good rises and demand for the other rises, the goods are substitutes." },
    ["substitutes", "Correct."],
    [["complements", "Complements would show a fall in demand."],
     ["inferior goods", "That concerns income, not related prices."],
     ["unrelated goods", "The demand responded, so they are related."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "A rise in the price of petrol is most likely to cause",
    explanation: "Petrol and cars are complements, so a rise in the price of petrol reduces the demand for cars (and for other complements)." },
    ["a decrease in the demand for cars", "Correct: cars and petrol are complements."],
    [["an increase in the demand for cars", "That would be true for substitutes."],
     ["an extension of demand for petrol", "A price rise causes a contraction in demand for petrol."],
     ["no change in the demand for cars", "The goods are complements, so demand changes."]]);

  mc({ d: 3, skill: "APPLICATION", hints: ["What happens to demand when income rises for an inferior good?"],
    stem: "As incomes rise in a fictional town, the quantity of second-hand clothing demanded at every price falls. Second-hand clothing is",
    explanation: "A fall in demand when income rises means the good is inferior." },
    ["an inferior good", "Correct."],
    [["a normal good", "Demand for a normal good rises with income."],
     ["a complement", "This concerns related goods, not income."],
     ["a Giffen good", "A Giffen good is a special inferior good whose demand rises with price."]]);

  mc({ d: 3, skill: "APPLICATION", hints: ["Compare with the schedule."],
    stem: `${ctx}\n\nThe price of maize meal is US\\$3. A rise in consumers' incomes then increases the quantity demanded at every price by 4 bags. How many bags are demanded at US\\$3 after the rise in income?`,
    explanation: "At US\\$3 market demand was 12 bags; the rise in income adds 4 at every price, so 16 bags. The curve has shifted right." },
    ["16", "Correct: 12 + 4."],
    [["12", "That is the quantity before the shift."],
     ["4", "That is only the increase."],
     ["18", "That is demand at US\\$2 before the shift (a movement along)."]]);

  mc({ d: 3, skill: "ANALYSIS", hints: ["Think of buyers' behaviour before a price rise."],
    stem: "Consumers in a fictional country expect the price of fuel to rise next week. What is the most likely effect on the demand for fuel now?",
    explanation: "If a price rise is expected, consumers buy now to avoid it, so current demand increases (the curve shifts right)." },
    ["An increase in demand now", "Correct: buyers bring purchases forward."],
    [["A decrease in demand now", "Buyers would delay if they expected a fall."],
     ["A contraction in demand along the same curve", "The current price has not changed."],
     ["No effect, because the price has not yet changed", "Expectations are a determinant of demand."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "Which reason helps to explain why the demand curve slopes downward?",
    explanation: "Diminishing marginal utility means each extra unit gives less satisfaction, so buyers will pay less for extra units." },
    ["Diminishing marginal utility", "Correct."],
    [["Increasing marginal cost of production", "That concerns supply."],
     ["Rising incomes of consumers", "That shifts demand."],
     ["The existence of Giffen goods", "These are exceptions to the law."]]);

  b.num({ d: 2, skill: "APPLICATION", kind: "plain", value: M[3], unit: "units", daily: true,
    stem: `The table shows three consumers' demand for maize meal at different prices (illustrative data).\n\n${ind}\n\nCalculate the market demand at a price of US\\$2, in bags.`,
    wrong: [A[3], 8 + 6],
    explanation: `Add the quantities at US\\$2: ${A[3]} + ${B[3]} + ${C[3]} = **${M[3]}** bags. ${A[3]} is Tendai's demand only, and 14 leaves out Farai.` });

  {
    const pc = pctChange(M[1], M[2]);
    chk(pc, 71.42857142857143, 1e-9);
    b.num({ d: 3, skill: "APPLICATION", kind: "pct", value: pc, dp: 1, calculator: true, unit: "%", hints: ["Percentage change = change ÷ original × 100."],
      stem: `${ctx}\n\nCalculate the percentage change in quantity demanded when the price falls from US\\$4 to US\\$3. Give your answer to one decimal place.`,
      wrong: [(5 / 12) * 100, 5],
      explanation: `Quantity rises from ${M[1]} to ${M[2]}: (${M[2]} − ${M[1]}) ÷ ${M[1]} × 100 = **${fmt(pc, 1)}%**. Dividing by the new quantity (41.7%) uses the wrong base.` });
  }
  {
    const a = 60, bb = 4, p = 6, q1 = a - bb * p, a2 = 76, q2 = a2 - bb * p, d = q2 - q1;
    chk(q1, 36); chk(q2, 52); chk(d, 16);
    b.calc({ d: 3, skill: "APPLICATION", kind: "plain", value: d, unit: "units", hints: ["Substitute P = 6 into each equation."],
      stem: "The demand for a good is given by Qd = 60 − 4P, where P is the price in US\\$ and Qd is in units per week. A rise in consumers' incomes changes the demand to Qd = 76 − 4P. By how many units does quantity demanded at a price of US\\$6 change?",
      wrong: [16 / 36 * 100, 52],
      explanation: `1. Before: Qd = 60 − 4(6) = ${q1}.\n2. After: Qd = 76 − 4(6) = ${q2}.\n3. Change = ${q2} − ${q1} = **${d}** units (an increase in demand).\n\n${q2} is the new quantity, not the change.` });
  }

  b.tf({ d: 1, skill: "RECALL", stem: "A fall in the price of a good causes the whole demand curve for that good to shift to the right.", answer: false,
    explanation: "False. It causes a movement along the curve (an extension). The curve shifts only if another determinant changes." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A rise in the price of a complement tends to decrease the demand for a good.", answer: true,
    explanation: "True. Complements are used together, so a dearer complement reduces demand for the pair." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each event to its effect on the demand curve for bread.",
    pairs: [["The price of bread falls", "Extension along the demand curve"], ["The price of bread rises", "Contraction along the demand curve"], ["Incomes rise (bread is a normal good)", "Demand curve shifts to the right"], ["The price of a substitute (buns) falls", "Demand curve shifts to the left"]],
    explanation: "Own-price changes move along the curve; other determinants shift it." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "A rise in the price of a good causes a {{blank:a}} of demand. A rise in incomes for a normal good causes an {{blank:b}} in demand.",
    blanks: [{ id: "a", accepted: ["contraction"], choices: ["contraction", "extension", "increase"] }, { id: "b", accepted: ["increase"], choices: ["contraction", "extension", "increase"] }],
    wrong: [["extension", "contraction"]],
    explanation: "Own price: contraction or extension along the curve. Income: shifts the curve." });

  b.short({ d: 2, skill: "RECALL", stem: "What term describes demand that is backed by the ability to pay?",
    accepted: ["effective demand"], wrong: ["need"],
    explanation: "Effective demand." });

  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Name two reasons and explain one."],
    stem: "Explain **two** reasons why the demand curve slopes downward.",
    points: ["Income effect: a lower price raises real income so consumers can buy more.", "Substitution effect: the good becomes cheaper relative to substitutes, so consumers switch to it.", "(or) Diminishing marginal utility: extra units give less satisfaction so are bought only at lower prices; one reason developed."],
    modelAnswer: "A fall in price raises consumers' real income, so they can afford to buy more (the income effect). It also makes the good cheaper relative to substitutes, so some consumers switch to it (the substitution effect). Together these mean more is demanded at a lower price.",
    explanation: "Two reasons, one developed." });

  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4, hints: ["Which curve shifts and in which direction?"],
    stem: "The price of bus fares in a fictional town rises sharply. Analyse the effect on the demand for shared taxis, which are substitutes.",
    points: ["Buses and taxis are substitutes.", "Consumers switch from buses to taxis.", "The demand curve for taxis shifts to the right (an increase in demand).", "At each taxi fare more journeys are demanded (so the taxi fare and quantity tend to rise)."],
    modelAnswer: "Buses and shared taxis are substitutes. When bus fares rise, some passengers switch to taxis, so the demand curve for taxis shifts to the right: at every taxi fare more journeys are demanded. This tends to raise the taxi fare and the number of journeys.",
    explanation: "Substitute price up, demand up." });

  // Structured 1.
  {
    const Mb = [5, 9, 14, 20, 28], Mb2 = Mb.map((q) => q + 6);
    const pc = pctChange(Mb[2], Mb2[2]);
    chk(Mb2[2], 20);
    const tab = table(["Price (US\\$ per bag)", "D1: quantity demanded (bags per week)", "D2: quantity demanded (bags per week)"], prices.map((p, i) => [p, Mb[i], Mb2[i]]));
    b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, hints: ["D2 is the demand after a rise in incomes."],
      stem: `The table shows the demand for rice in a fictional town before (D1) and after (D2) a rise in incomes (illustrative data).\n\n${tab}`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "plain", value: Mb2[2], unit: "units", stem: "How many bags are demanded at US\\$3 on D2?", wrong: [Mb[2], 6], explanation: "From the table, 20 bags." }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: pc, dp: 1, unit: "%", stem: "Calculate the percentage increase in quantity demanded at US\\$3, to one decimal place.", wrong: [(6 / 20) * 100, 6], explanation: "(20 − 14) ÷ 14 × 100 = 42.9%." }),
        P.fib({ label: "(c)", marks: 2, stem: "Complete the sentences.", template: "The change from D1 to D2 is an {{blank:a}} in demand. It is shown by a {{blank:b}} of the demand curve.",
          blanks: [{ id: "a", accepted: ["increase"], choices: ["increase", "extension", "decrease"] }, { id: "b", accepted: ["shift to the right"], choices: ["shift to the right", "shift to the left", "movement along"] }], explanation: "Higher income raises demand for a normal good: a shift right." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain **one** reason, other than a rise in income, why demand could shift from D1 to D2.",
          points: ["A determinant other than the good's own price identified (for example a rise in the price of a substitute, a change in tastes, population growth).", "Linked to the good: consumers want more at each price.", "So the curve shifts right."],
          modelAnswer: "A rise in the price of a substitute such as potatoes would lead consumers to switch to rice, so more would be demanded at every price and the demand curve would shift to the right." }),
        P.manual({ label: "(e)", marks: 2, stem: "Suppose rice is an inferior good in this town. State what would happen to demand when incomes rise and explain why.",
          points: ["Demand would decrease (shift left).", "Consumers switch to preferred alternatives when they can afford them."],
          modelAnswer: "Demand would fall because richer consumers would switch to preferred goods such as bread or meat." }),
      ],
      explanation: "20 bags at US\\$3; 42.9% increase; demand increases and the curve shifts right; an inferior good would show a fall in demand." });
  }

  // Structured 2.
  {
    const tab = table(["Year", "Price of cooking oil (US\\$ per litre)", "Price of margarine (US\\$ per 500 g)", "Sales of cooking oil (thousand litres per month)"], [["Year 1", "2.00", "1.60", 50], ["Year 2", "2.00", "2.00", 58]], { align: ["l", "r", "r", "r"] });
    const pc = pctChange(50, 58), mcPct = pctChange(1.6, 2.0);
    chk(pc, 16); chk(mcPct, 25);
    b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, hints: ["The price of cooking oil did not change."],
      stem: `The table shows data for a fictional town (illustrative data).\n\n${tab}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "pct", value: pc, dp: 0, unit: "%", stem: "Calculate the percentage change in sales of cooking oil between Year 1 and Year 2.", wrong: [8, 14], explanation: "(58 − 50) ÷ 50 × 100 = 16%." }),
        P.num({ label: "(b)", marks: 1, kind: "pct", value: mcPct, dp: 0, unit: "%", stem: "Calculate the percentage change in the price of margarine.", wrong: [20, 0.4], explanation: "(2.00 − 1.60) ÷ 1.60 × 100 = 25%." }),
        P.manual({ label: "(c)", marks: 3, stem: "Using the data, explain why the demand curve for cooking oil shifted to the right.",
          points: ["The price of cooking oil was unchanged, so this is not a movement along the curve.", "The price of margarine, a substitute, rose by 25%.", "Consumers switched to cooking oil so more was demanded at the same price."],
          modelAnswer: "The price of cooking oil stayed at US\\$2.00, so the rise in sales is not a movement along the curve. The price of margarine, a substitute, rose by 25%, so consumers switched to cooking oil, increasing demand at every price." }),
        P.manual({ label: "(d)", marks: 4, stem: "Discuss whether the rise in sales shows that cooking oil is a normal good.",
          points: ["Normal goods are defined by demand rising with income; the data has no income figure.", "The change is explained by the price of margarine.", "Other determinants (population, tastes) may also have changed.", "Conclusion: the data does not show it; income data is needed."],
          modelAnswer: "A normal good is one whose demand rises with income, but the table contains no information on income. The rise in sales is better explained by the 25% rise in the price of margarine. Other factors such as population or tastes may also have changed, so the data cannot show that cooking oil is a normal good." }),
      ],
      explanation: "Sales +16%, margarine price +25%; the shift is explained by a substitute's price, not income." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Compare the price with other determinants.", "Reach a judgement."],
    stem: "\"The price of a good is the most important determinant of its demand.\" Evaluate this statement.",
    points: ["A change in price changes the quantity demanded along the curve.", "Price effects are strong for goods with close substitutes.", "Other determinants shift the whole curve (income, tastes, related goods).", "For necessities, quantity demanded may change little when price changes.", "Income may be more important for luxury goods and tastes for fashion goods.", "In the short run expectations and advertising can dominate.", "The importance depends on the good and time period.", "A justified judgement."],
    levels: LV8,
    modelAnswer: "Price matters because it directly affects the quantity demanded along the demand curve, and for goods with many close substitutes, such as brands of cooking oil, small price changes can change sales greatly. However, other determinants shift the whole curve: rising incomes can increase demand for cars and meat far more than small price falls, tastes drive demand for fashion, and the price of related goods and expectations can change demand sharply. For necessities such as salt, quantity demanded hardly responds to price at all. The importance of price therefore depends on the good, the available substitutes and the time period. Price is often a major determinant but not always the most important one.",
    wordLimit: { min: 100, max: 300 },
    explanation: "A judgement across goods and determinants." });

  b.card("DEFINITION", "Define **demand**.", "The quantity of a good that consumers are willing and able to buy at each price in a given period, other things being equal.");
  b.card("CONCEPT", "State the **law of demand**.", "Ceteris paribus, as the price of a good rises, the quantity demanded falls, and as the price falls, the quantity demanded rises.");
  b.card("CONCEPT", "Give **three** reasons for the downward slope of the demand curve.", "Income effect, substitution effect and diminishing marginal utility.");
  b.card("CONCEPT", "What causes a **movement along** the demand curve?", "A change in the price of the good itself: extension (price falls) or contraction (price rises).");
  b.card("CONCEPT", "What causes a **shift** of the demand curve?", "A change in any determinant other than own price: income, related goods' prices, tastes, population or expectations.");
  b.card("CONCEPT", "How does a rise in the price of a **substitute** affect demand?", "It increases demand for the good (the curve shifts right).");
  b.card("CONCEPT", "How does a rise in the price of a **complement** affect demand?", "It decreases demand for the good (the curve shifts left).");
  b.card("DEFINITION", "Define a **normal good** and an **inferior good**.", "Normal: demand rises when income rises. Inferior: demand falls when income rises.");
  b.card("CONCEPT", "How do you find **market demand**?", "Add the quantities demanded by all consumers at each price (horizontal summation).");
});
