// W1b: econ.demand.shifts — conditions of demand; movements along versus shifts of the demand curve.
import { concept, P, schedule } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};
const DIR = ["shifts to the right", "shifts to the left", "moves up along the curve", "moves down along the curve"];

concept("econ.demand.shifts", { file: "demand/shifts", keyPrefix: "demand.shifts" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of the following causes a **movement along** the demand curve for maize meal?",
    options: [
      ["A change in the price of maize meal", "Correct: only a change in the good's own price moves the point along its demand curve."],
      ["A change in consumers' incomes", "Income is a condition of demand; a change shifts the whole curve."],
      ["A change in the price of rice", "Rice is a substitute; a change in its price shifts the demand curve for maize meal."],
      ["A change in the size of the population", "Population is a condition of demand; it shifts the curve."],
    ],
    answer: "A",
    explanation: "A change in a good's own price causes an extension or contraction along its demand curve. Every other factor shifts the curve.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Beef and chicken are substitutes. What happens to the demand curve for chicken when the price of beef rises?",
    options: [
      ["It shifts to the right", "Correct: consumers switch from dearer beef to chicken, so more chicken is demanded at every price."],
      ["It shifts to the left", "A leftward shift would follow a fall in the price of beef."],
      ["There is a movement up along it", "A movement along the chicken demand curve needs a change in the price of chicken."],
      ["There is a movement down along it", "The price of chicken has not changed, so there is no movement along its curve."],
    ],
    answer: "A",
    explanation: "A rise in the price of a **substitute** increases demand for the good: the curve shifts to the right.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Mobile phones and airtime are complements. The price of mobile phones falls sharply. What happens to the demand for airtime?",
    options: [
      ["It increases", "Correct: more people buy phones, so more airtime is demanded at every airtime price."],
      ["It decreases", "This would follow a rise in the price of phones, the complement."],
      ["Quantity demanded extends along the curve", "An extension needs a fall in the price of airtime itself."],
      ["It does not change", "Goods in joint demand are linked: cheaper phones raise the demand for airtime."],
    ],
    answer: "A",
    explanation: "For complements (joint demand), a fall in the price of one good **increases** demand for the other: the airtime demand curve shifts to the right.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which change would cause a **decrease** in demand for a normal good?",
    options: [
      ["A rise in income tax", "Correct: disposable income falls, so less of a normal good is demanded at every price."],
      ["A fall in the price of a complement", "Cheaper complements increase demand for the good."],
      ["A successful advertising campaign", "Advertising aims to increase demand, shifting the curve right."],
      ["A rise in the price of the good itself", "That causes a contraction along the curve, not a decrease in demand."],
    ],
    answer: "A",
    explanation: "A rise in income tax cuts disposable income; for a normal good this shifts the demand curve to the **left** (a decrease in demand).",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Rudo's income rises and she buys **fewer** packets of the cheapest brand of biscuits, switching to a better brand. For Rudo, the cheapest brand is",
    options: [
      ["an inferior good.", "Correct: demand for an inferior good falls as income rises."],
      ["a normal good.", "Demand for a normal good rises when income rises."],
      ["a complement of the better brand.", "Complements are used together; Rudo uses one brand instead of the other."],
      ["a good with latent demand.", "Latent demand is a desire without the ability to pay; Rudo can afford both."],
    ],
    answer: "A",
    hints: ["Look at the direction: income up, demand down."],
    explanation: "An **inferior good** is one whose demand falls when income rises, because consumers switch to preferred alternatives.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Consumers in Gweru expect the price of cement to rise sharply next month. What is the most likely effect on the demand for cement **this** month?",
    options: [
      ["The demand curve shifts to the right", "Correct: people buy now before the expected rise, so more is demanded at every current price."],
      ["The demand curve shifts to the left", "Consumers would delay buying only if they expected the price to fall."],
      ["Quantity demanded contracts along the curve", "The current price has not changed, so there is no movement along the curve."],
      ["There is no effect until the price rises", "Expectations change behaviour now, before the price change happens."],
    ],
    answer: "A",
    hints: ["Expectations are a condition of demand.", "Would you buy now or later if you expected a higher price next month?"],
    explanation: "Expecting a higher future price makes consumers buy earlier, so current demand **increases** (shift to the right).",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "The table shows the demand for cotton T-shirts at a market in Mutare in two months.\n\n| Price (US\\$) | June (T-shirts per week) | July (T-shirts per week) |\n| --- | ---: | ---: |\n| 4 | 120 | 90 |\n| 6 | 100 | 70 |\n| 8 | 80 | 50 |\n| 10 | 60 | 30 |\n\nWhich event could explain the change between June and July?",
    options: [
      ["A fall in the price of polyester T-shirts, a substitute", "Correct: cheaper substitutes reduce demand for cotton T-shirts at every price, a shift to the left."],
      ["A rise in the price of polyester T-shirts, a substitute", "Dearer substitutes would increase demand for cotton T-shirts, a shift to the right."],
      ["A rise in the price of cotton T-shirts", "A change in own price gives a movement along one column, not a new column."],
      ["A rise in the incomes of shoppers at the market", "T-shirts are normally a normal good, so higher incomes would increase demand."],
    ],
    answer: "A",
    hints: ["Compare the two columns at the same price.", "Fewer at every price means a decrease in demand: which event causes that?"],
    explanation: "At every price 30 fewer T-shirts are demanded in July: a **decrease in demand** (shift to the left). A fall in the price of a substitute causes this.",
  });

  // Numerical: identify the size of a shift.
  const p = [2, 3, 4, 5], d1 = [900, 800, 700, 600], d2 = [1050, 950, 850, 750];
  schedule({ prices: p, qd: d1 }); schedule({ prices: p, qd: d2 });
  const t2 = schedule({ prices: p, qd: d1, priceHeader: "Price of a cold drink (US\\$)", qdHeader: "D1: cool season (drinks per day)", extra: [{ header: "D2: hot season (drinks per day)", values: d2 }] }).md;
  b.num({
    d: 2, skill: "APPLICATION", kind: "plain", value: d2[2] - d1[2], daily: false,
    stem: `The table shows the demand for cold drinks at a fictional stall near Victoria Falls.\n\n${t2}\n\nBy how many drinks a day does demand increase at a price of US\\$4?`,
    wrong: [d2[2], d1[1] - d1[2]],
    explanation: `At US\\$4: ${d2[2]} − ${d1[2]} = **${d2[2] - d1[2]} drinks a day**. The whole curve shifts right by this amount at every price.`,
  });
  const lp = [0.3, 0.4, 0.5, 0.6], e1 = [520, 460, 400, 340], e2 = [640, 580, 520, 460];
  schedule({ prices: lp, qd: e1 }); schedule({ prices: lp, qd: e2 });
  const te = schedule({ prices: lp, qd: e1, priceHeader: "Price of an ice lolly (US\\$)", qdHeader: "D1: winter (lollies per day)", extra: [{ header: "D2: summer (lollies per day)", values: e2 }] }).md;
  b.calc({
    d: 3, skill: "ANALYSIS", kind: "plain", value: e2[2] - e1[1],
    stem: `The table shows the demand for ice lollies at a fictional tuck shop in Kariba.\n\n${te}\n\nIn winter the shop charges US\\$0.40. In summer it raises the price to US\\$0.50. By how many lollies a day does the quantity sold change? (Give a fall as a negative number.)`,
    wrong: [e2[1] - e1[1], e1[2] - e1[1]],
    hints: ["Find the starting point on D1 and the end point on D2.", "Change = new quantity − old quantity."],
    explanation: `1. Winter: on D1 at US\\$0.40, ${e1[1]} lollies.\n2. Summer: on D2 at US\\$0.50, ${e2[2]} lollies.\n3. Change = ${e2[2]} − ${e1[1]} = **${e2[2] - e1[1]}** lollies a day.\n4. The increase in demand (shift right) outweighs the contraction caused by the higher price. ${e2[1] - e1[1]} ignores the price rise; ${e1[2] - e1[1]} ignores the shift.`,
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A rise in the price of petrol is likely to decrease the demand for large cars.",
    answer: true,
    explanation: "True. Petrol and cars are complements: when petrol becomes dearer, running a large car costs more, so fewer are demanded at every price (shift to the left).",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "An increase in demand is shown by a shift of the demand curve to the left.",
    answer: false,
    explanation: "False. An increase in demand is a shift to the **right** (more demanded at every price); a decrease is a shift to the left.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    stem: "Match each event to its effect on the demand for **fresh milk** in a fictional town.",
    pairs: [
      ["A health campaign says milk is good for children", "Demand curve shifts to the right"],
      ["A cheaper powdered-milk brand arrives in the shops", "Demand curve shifts to the left"],
      ["The price of fresh milk is cut", "Movement down along the demand curve"],
      ["The price of fresh milk is raised", "Movement up along the demand curve"],
    ],
    hints: ["Own price → movement along. Anything else → shift."],
    explanation: "Tastes improving shifts demand right; a cheaper substitute shifts it left; own-price changes move along the curve (extension when the price is cut, contraction when it rises).",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "When the price of a complement rises, the demand curve for the good {{blank:a}}. When the price of a substitute rises, the demand curve for the good {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["shifts to the left"], choices: DIR },
      { id: "b", accepted: ["shifts to the right"], choices: DIR },
    ],
    wrong: [["shifts to the right", "shifts to the left"]],
    explanation: "Complement dearer → the pair costs more to use → demand decreases (left). Substitute dearer → consumers switch → demand increases (right).",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Distinguish between a **change in demand** and a **change in quantity demanded**.",
    points: [
      "A change in quantity demanded is a movement along the demand curve caused by a change in the good's own price.",
      "A change in demand is a shift of the whole curve caused by a change in another factor (e.g. income, price of a related good).",
    ],
    modelAnswer: "A change in quantity demanded is caused only by a change in the good's own price and is shown as a movement along the same demand curve (an extension or contraction). A change in demand is caused by a change in a condition of demand such as income or tastes, and is shown as a shift of the whole curve to the right (increase) or left (decrease).",
    explanation: "One mark for each side of the distinction, each with its cause and how it is shown.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** reasons why the demand for school uniforms in a district might increase in January even though their prices do not change.",
    points: [
      "Identifies a condition: more pupils starting school (population / number of buyers rises).",
      "Explains: more uniforms demanded at every price, so the demand curve shifts right.",
      "Identifies a second condition, e.g. parents receive year-end bonuses (higher income) or children have outgrown last year's uniforms (need/tastes).",
      "Explains the second: more is demanded at each price / shift right, not a movement along the curve.",
    ],
    modelAnswer: "First, new Form 1 and ECD pupils start school in January, so the number of buyers rises and more uniforms are demanded at every price. Second, many parents receive December bonuses or payouts, so their disposable income is higher and they can afford more uniforms. Both are non-price factors, so the demand curve shifts to the right rather than moving along it.",
    hints: ["Think about the number of buyers and what happens to household budgets at the end of the year."],
    explanation: "Two non-price causes, each linked to a rightward shift.",
  });

  // Structured 1: schedules and a shift.
  const pp = [1, 1.5, 2, 2.5], a1 = [745, 665, 585, 505], a2 = [605, 525, 445, 365];
  schedule({ prices: pp, qd: a1 }); schedule({ prices: pp, qd: a2 });
  const t3 = schedule({ prices: pp, qd: a1, priceHeader: "Price of a loaf (US\\$)", qdHeader: "D1: March (loaves per day)", extra: [{ header: "D2: April (loaves per day)", values: a2 }] }).md;
  b.struct({
    d: 3, skill: "ANALYSIS", examStyle: true, marks: 8,
    stem: `A fictional bakery in Chinhoyi sells bread. In April a new bakery opened next door selling buns and rolls. The table shows the demand for the first bakery's bread.\n\n${t3}`,
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "plain", value: a1[2] - a2[2], stem: "By how many loaves a day did the quantity demanded at US\\$2 fall between March and April?", wrong: [a2[2]], explanation: `${a1[2]} − ${a2[2]} = ${a1[2] - a2[2]} loaves a day.` }),
      P.fib({
        label: "(b)", marks: 2, stem: "Complete the sentence.",
        template: "Between March and April there was a {{blank:a}} in demand, shown by the demand curve {{blank:b}}.",
        blanks: [
          { id: "a", accepted: ["decrease"], choices: ["increase", "decrease", "contraction", "extension"] },
          { id: "b", accepted: ["shifts to the left"], choices: DIR },
        ],
        wrong: [["contraction", "moves up along the curve"]],
        explanation: "Fewer loaves are demanded at every price: a decrease in demand, a shift to the left. It is not a contraction, because the price of bread did not change.",
      }),
      P.manual({
        label: "(c)", marks: 2,
        stem: "Explain why the opening of the new bakery caused this change.",
        points: [
          "Buns and rolls are substitutes for bread.",
          "Some customers switch to the new bakery, so less bread is demanded at every price (curve shifts left).",
        ],
        modelAnswer: "Buns and rolls are substitutes for bread, and the new bakery makes them more available, so some customers switch to them. The first bakery therefore sells fewer loaves at every price.",
        explanation: "Identify the substitute, then the effect at every price.",
      }),
      P.manual({
        label: "(d)", marks: 3,
        stem: "Describe the diagram that shows this change.",
        points: [
          "Price on the vertical axis, quantity of loaves per day on the horizontal axis.",
          "Original demand curve D1 and a new demand curve D2 to its left.",
          `Shows that at US$2 the quantity falls from ${a1[2]} (on D1) to ${a2[2]} (on D2).`,
        ].map((s) => s.replace("US$", "US\\$")),
        modelAnswer: `Price on the vertical axis, loaves per day on the horizontal axis. D1 slopes downwards; D2 lies parallel to it and ${a1[0] - a2[0]} loaves to the left. At US\\$2 the quantity demanded falls from ${a1[2]} to ${a2[2]}.`,
        explanation: "Axes, both curves with the direction of the shift, and the quantities at one price.",
      }),
    ],
    hints: ["Compare the columns at the same price.", "Did the price of bread change?"],
    explanation: "The new bakery provides substitutes, so demand for the first bakery's bread decreases: the curve shifts left by 140 loaves at every price.",
  });

  // Structured 2: event analysis and discussion.
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, marks: 12,
    stem: "In a fictional town the price of liquefied petroleum gas (LPG) for cooking rises sharply. Many households cook either with LPG or with firewood. Gas stoves are bought only by households that cook with LPG.",
    parts: [
      P.mcq({
        label: "(a)", stem: "What happens to the demand for **firewood**?",
        options: [
          ["It increases: the curve shifts to the right", "Correct: firewood is a substitute for LPG, so households switch to it."],
          ["It decreases: the curve shifts to the left", "That would follow a fall in the price of LPG."],
          ["Quantity demanded extends along the curve", "The price of firewood has not changed."],
          ["It does not change because firewood is unrelated", "Firewood and LPG are both cooking fuels, so they are substitutes."],
        ],
        answer: "A",
        explanation: "LPG and firewood are substitutes: dearer LPG increases demand for firewood.",
      }),
      P.mcq({
        label: "(b)", stem: "What happens to the demand for **gas stoves**?",
        options: [
          ["It decreases: the curve shifts to the left", "Correct: gas stoves and LPG are complements."],
          ["It increases: the curve shifts to the right", "Dearer LPG makes a gas stove more costly to use, so fewer are demanded."],
          ["Quantity demanded contracts along the curve", "The price of gas stoves has not changed."],
          ["It does not change because stoves last many years", "New buyers are put off by the higher running cost, so demand falls."],
        ],
        answer: "A",
        explanation: "Stoves and LPG are in joint demand: dearer LPG decreases demand for stoves.",
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain the difference between the effect of the LPG price rise on the market for LPG and its effect on the market for firewood.",
        points: [
          "In the LPG market the own price has changed.",
          "So there is a contraction: a movement up along the LPG demand curve (no shift).",
          "In the firewood market a condition of demand (price of a substitute) has changed.",
          "So the firewood demand curve shifts to the right (more demanded at every price).",
        ],
        modelAnswer: "For LPG the good's own price has risen, so households buy less LPG: this is a contraction, a movement up along the existing LPG demand curve. For firewood, the price of a substitute has risen, which is a condition of demand, so more firewood is demanded at every price and the firewood demand curve shifts to the right.",
        explanation: "Own price → movement along; price of a related good → shift.",
      }),
      P.manual({
        label: "(d)", marks: 6, levels: LV(6),
        stem: "Discuss whether a large rise in the price of LPG will lead to a large increase in the demand for firewood.",
        points: [
          "Yes: many households can switch easily, since cooking on firewood needs little equipment.",
          "Yes: poorer households spend a large share of income on fuel, so they are likely to switch.",
          "No: households in flats or towns may have no safe place to burn firewood, or firewood may be hard to find.",
          "No: households may already own a gas stove and prefer its convenience, so they keep buying LPG.",
          "No/depends: the switch may take time, or other substitutes (electricity, paraffin) may gain instead.",
          "Justified conclusion, e.g. a large increase is likely among rural households but small in urban areas.",
        ],
        modelAnswer: "Firewood is a close substitute for LPG for many households, especially in rural areas where firewood can be collected or bought cheaply and stoves are simple, so a large LPG price rise could cause a large rightward shift in demand for firewood. Poorer households, for whom fuel takes a large share of income, are most likely to switch. However, urban households may have no safe place to cook with firewood, and those who have already paid for a gas stove may keep using LPG for convenience. Some may switch to electricity or paraffin instead. Overall, demand for firewood is likely to rise strongly among rural households but only a little in towns, so the size of the increase depends on how close a substitute firewood is for each household.",
        explanation: "Weigh how close firewood is as a substitute for different households and conclude.",
      }),
    ],
    hints: ["Decide first whether each good is a substitute or a complement for LPG.", "Own price changes move along a curve; related prices shift it."],
    explanation: "Substitutes gain demand when a rival good becomes dearer; complements lose demand.",
  });

  b.card("DEFINITION", "What is a **change in quantity demanded**?", "A movement along the demand curve caused only by a change in the good's own price (an extension or a contraction).");
  b.card("DEFINITION", "What is a **change in demand**?", "A shift of the whole demand curve caused by a change in a factor other than the good's own price.");
  b.card("CONCEPT", "Which way does the demand curve shift for an **increase** in demand?", "To the right: more is demanded at every price.");
  b.card("FACT", "What happens to demand for a good when the price of a **substitute** rises?", "It increases (the curve shifts right) as consumers switch to the good.");
  b.card("FACT", "What happens to demand for a good when the price of a **complement** rises?", "It decreases (the curve shifts left) because the pair costs more to use.");
  b.card("DEFINITION", "What is an **inferior good**?", "A good whose demand falls when consumers' income rises.");
  b.card("CONCEPT", "List five conditions of demand.", "Income; prices of substitutes and complements; tastes and fashion; population; advertising; expectations; taxes.");
  b.card("CONCEPT", "How does an expected future price rise affect demand now?", "Demand increases now as consumers buy before the price goes up.");
  b.card("DEFINITION", "What are **complements**?", "Goods used together (joint demand), such as cars and petrol.");
});
