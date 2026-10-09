// W1b: econ.markets.equilibrium — equilibrium, disequilibrium, shortages and surpluses, return to equilibrium.
import { concept, P, schedule, money, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.markets.equilibrium", { file: "markets/equilibrium", keyPrefix: "markets.equilibrium" }, (b) => {
  // Market A: cabbages.
  const p = [0.35, 0.45, 0.55, 0.65, 0.75], qd = [1180, 1040, 900, 760, 620], qs = [620, 760, 900, 1040, 1180];
  const A = schedule({ prices: p, qd, qs, priceHeader: "Price per cabbage (US\\$)", qdHeader: "Quantity demanded (per day)", qsHeader: "Quantity supplied (per day)", requireEquilibrium: true });
  check("eqA", A.equilibrium.price, 0.55);
  check("ex", A.excess[1], 280);

  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is meant by the **equilibrium price** of a good?",
    options: [
      ["The price at which quantity demanded equals quantity supplied", "Correct: the market clears at this price."],
      ["The price set by the government for the good", "A government-set price may be above or below equilibrium."],
      ["The highest price consumers are willing to pay", "Equilibrium depends on both demand and supply."],
      ["The price at which producers of the good make the most profit", "Equilibrium is where buyers' and sellers' plans match, not a profit maximum."],
    ],
    answer: "A",
    explanation: "At the equilibrium price the quantity consumers want to buy equals the quantity producers want to sell, so there is no pressure on the price to change.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "When the market price is **below** the equilibrium price there is",
    options: [
      ["a shortage (excess demand).", "Correct: quantity demanded exceeds quantity supplied."],
      ["a surplus (excess supply).", "A surplus occurs above the equilibrium price."],
      ["an increase in supply.", "An increase in supply is a shift of the curve, not caused by the price being low."],
      ["equilibrium, because buyers are happy.", "At a price below equilibrium buyers want more than sellers offer."],
    ],
    answer: "A",
    explanation: "Below equilibrium, consumers want to buy more than producers offer: a shortage (excess demand).",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: `The table shows the daily market for cabbages in a fictional town.\n\n${A.md}\n\nWhat is the equilibrium price?`,
    options: [
      ["US\\$0.55", "Correct: 900 demanded and 900 supplied."],
      ["US\\$0.45", "At US\\$0.45 there is a shortage of 280."],
      ["US\\$0.65", "At US\\$0.65 there is a surplus of 280."],
      ["US\\$0.75", "At US\\$0.75 there is a surplus of 560."],
    ],
    answer: "A",
    explanation: "At US\\$0.55 quantity demanded (900) equals quantity supplied (900).",
  });
  b.num({
    d: 2, skill: "APPLICATION", kind: "plain", value: 3150 - 2480, daily: true,
    stem: "In a fictional market for sugar beans, at a price of US\\$2.20 per kg the quantity demanded is 3,150 kg a week and the quantity supplied is 2,480 kg a week. How large is the shortage, in kg per week?",
    wrong: [3150, 2480],
    explanation: `Shortage = quantity demanded − quantity supplied = 3,150 − 2,480 = **${3150 - 2480} kg** a week.`,
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "There is a surplus of shoes in a market. What is most likely to happen next?",
    options: [
      ["Sellers cut prices to clear their stocks", "Correct: unsold stock pushes the price down towards equilibrium."],
      ["Sellers raise prices because demand is strong", "In a surplus demand is weak relative to supply."],
      ["The demand curve shifts to the right", "Nothing has changed the conditions of demand."],
      ["Consumers queue to buy shoes", "Queues are a sign of a shortage, not a surplus."],
    ],
    answer: "A",
    explanation: "With unsold stocks, sellers lower prices. Quantity demanded extends and quantity supplied contracts until the market clears.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A market is in disequilibrium with a shortage. As the market moves back to equilibrium, which describes the changes?",
    options: [
      ["Price rises, quantity supplied extends and quantity demanded contracts", "Correct: the rising price moves both quantities along their curves until they meet."],
      ["Price falls, quantity supplied contracts and quantity demanded extends", "This is how a surplus is removed."],
      ["Price rises and the supply curve shifts to the right", "Neither curve shifts; the quantities move along them."],
      ["Price stays the same and the demand curve shifts to the left", "Without a change in conditions, the curves do not move."],
    ],
    answer: "A",
    hints: ["In a shortage, which way does the price go?", "Then apply the laws of demand and supply."],
    explanation: "In a shortage buyers bid the price up. A higher price extends supply and contracts demand until the shortage disappears.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "In a fictional market for torch batteries, the price is set at US\\$1.40 a pack. At this price 2,300 packs a month are supplied and 1,450 demanded. What is the surplus?",
    options: [
      ["850 packs a month", "Correct: 2,300 − 1,450 = 850."],
      ["2,300 packs a month", "2,300 is the quantity supplied, not the gap."],
      ["1,450 packs a month", "1,450 is the quantity demanded, not the gap."],
      ["3,750 packs a month", "This adds the two quantities; a surplus is their difference."],
    ],
    answer: "A",
    hints: ["Surplus = quantity supplied − quantity demanded at that price."],
    explanation: "Surplus = 2,300 − 1,450 = **850 packs** a month: the price is above equilibrium.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Market demand for a good is given by Qd = 1,000 − 50P and market supply by Qs = 200 + 30P, where P is the price in US\\$. What is the equilibrium price?",
    options: [
      ["US\\$10", "Correct: 1,000 − 500 = 500 and 200 + 300 = 500."],
      ["US\\$8", "At US$8, Qd = 600 and Qs = 440: a shortage remains.".replace("US$", "US\\$")],
      ["US\\$12", "At US$12, Qd = 400 and Qs = 560: a surplus.".replace("US$", "US\\$")],
      ["US\\$500", "500 is the equilibrium quantity, not the price."],
    ],
    answer: "A",
    hints: ["Set Qd = Qs.", "1,000 − 50P = 200 + 30P."],
    explanation: "1,000 − 50P = 200 + 30P → 800 = 80P → **P = US\\$10**; quantity = 500.",
  });
  check("eqB", 1000 - 50 * 10, 200 + 30 * 10);

  // Equilibrium spending.
  const p2 = [3, 4, 5, 6], d2 = [360, 300, 240, 180], s2 = [120, 200, 240, 280];
  const B = schedule({ prices: p2, qd: d2, qs: s2, priceHeader: "Price per kg (US\\$)", qdHeader: "Quantity demanded (kg per week)", qsHeader: "Quantity supplied (kg per week)", requireEquilibrium: true });
  const spend = B.equilibrium.price * B.equilibrium.quantity;
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: spend,
    stem: `The table shows the weekly market for dried kapenta in a fictional town.\n\n${B.md}\n\nCalculate total consumer spending on kapenta per week at the equilibrium.`,
    wrong: [p2[3] * s2[3], B.equilibrium.quantity],
    hints: ["First find the price at which quantity demanded equals quantity supplied.", "Spending = price × quantity."],
    explanation: `1. Equilibrium: at US\\$${B.equilibrium.price}, ${B.equilibrium.quantity} kg are demanded and supplied.\n2. Spending = ${B.equilibrium.price} × ${B.equilibrium.quantity} = **${money(spend)}** a week.\n3. ${money(p2[3] * s2[3])} uses the quantity supplied at US\\$6, but only ${d2[3]} kg would be bought at that price.`,
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "At the equilibrium price there is neither a shortage nor a surplus.",
    answer: true,
    explanation: "True. Quantity demanded equals quantity supplied, so the market clears.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "When a shortage is removed by a rise in price, the supply curve shifts to the right.",
    answer: false,
    explanation: "False. The higher price causes an **extension** of supply, a movement along the supply curve. The curve itself does not shift.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term with its description.",
    pairs: [
      ["Shortage", "Quantity demanded exceeds quantity supplied"],
      ["Surplus", "Quantity supplied exceeds quantity demanded"],
      ["Equilibrium", "Quantity demanded equals quantity supplied"],
      ["Disequilibrium", "Any price at which the market does not clear"],
    ],
    explanation: "Shortage = excess demand (below equilibrium); surplus = excess supply (above equilibrium).",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "If the price is set above equilibrium there is a {{blank:a}}, and the price tends to {{blank:b}}. If it is set below equilibrium there is a {{blank:c}}, and the price tends to {{blank:d}}.",
    blanks: [
      { id: "a", accepted: ["surplus"], choices: ["surplus", "shortage"] },
      { id: "b", accepted: ["fall"], choices: ["rise", "fall"] },
      { id: "c", accepted: ["shortage"], choices: ["surplus", "shortage"] },
      { id: "d", accepted: ["rise"], choices: ["rise", "fall"] },
    ],
    wrong: [["shortage", "rise", "surplus", "fall"]],
    explanation: "Above equilibrium: surplus, price falls. Below: shortage, price rises.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how a surplus is removed in a free market.",
    points: [
      "At a price above equilibrium, sellers are left with unsold stock.",
      "Sellers reduce the price to clear stock.",
      "As the price falls, quantity demanded extends (consumers buy more).",
      "Quantity supplied contracts, until quantity demanded equals quantity supplied at the equilibrium price.",
    ],
    modelAnswer: "At a price above equilibrium, producers offer more than consumers want, so stocks remain unsold. To get rid of them, sellers cut the price. The lower price makes consumers buy more (an extension of demand) and makes producers offer less (a contraction of supply). The price keeps falling until quantity demanded equals quantity supplied and the surplus has gone.",
    hints: ["Start with the unsold goods; end with the equilibrium price."],
    explanation: "Credit: unsold stock, price cut, demand extends, supply contracts to equilibrium.",
  });

  // Structured 1: exam-style schedule.
  const p3 = [10, 12, 14, 16, 18], d3 = [520, 460, 400, 340, 280], s3 = [220, 310, 400, 490, 580];
  const C = schedule({ prices: p3, qd: d3, qs: s3, priceHeader: "Price per bag (US\\$)", qdHeader: "Quantity demanded (bags per week)", qsHeader: "Quantity supplied (bags per week)", requireEquilibrium: true });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 12,
    stem: `The table shows the weekly market for 50 kg bags of fertiliser in a fictional farming district.\n\n${C.md}`,
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "money", value: C.equilibrium.price, stem: "State the equilibrium price.", wrong: [12], explanation: `At US\\$${C.equilibrium.price}, ${C.equilibrium.quantity} bags are demanded and supplied.` }),
      P.num({ label: "(b)", marks: 1, kind: "plain", value: C.excess[1], stem: "Calculate the shortage at US\\$12 (bags per week).", wrong: [d3[1]], explanation: `${d3[1]} − ${s3[1]} = ${C.excess[1]} bags.` }),
      P.num({ label: "(c)", marks: 2, kind: "plain", value: -C.excess[4], stem: "Calculate the surplus at US\\$18 (bags per week).", wrong: [s3[4]], explanation: `${s3[4]} − ${d3[4]} = ${-C.excess[4]} bags.` }),
      P.manual({
        label: "(d)", marks: 4,
        stem: "Describe the diagram that shows this market, including the surplus at US\\$18.",
        points: [
          "Price on the vertical axis, quantity of bags per week on the horizontal axis.",
          "Downward-sloping D and upward-sloping S crossing at US\\$14 and 400 bags.",
          "A horizontal line at US\\$18 meeting D at 280 bags and S at 580 bags.",
          "The gap between 280 and 580 (300 bags) labelled as the surplus.",
        ],
        modelAnswer: "Price on the vertical axis and bags per week on the horizontal axis. D slopes down and S slopes up; they cross at the equilibrium, US\\$14 and 400 bags. A horizontal line at US\\$18 meets D at 280 bags and S at 580 bags; the distance between them, 300 bags, is the surplus.",
        explanation: "Axes, both curves, the equilibrium and the surplus as a range of quantities.",
      }),
      P.manual({
        label: "(e)", marks: 4,
        stem: "Fertiliser dealers have agreed among themselves to charge US\\$18 a bag. Explain what will happen in the market if the agreement breaks down.",
        points: [
          "At US\\$18 there is a surplus of 300 bags: dealers have unsold stock.",
          "Individual dealers cut prices to sell their stock (undercut the others).",
          "As the price falls, quantity demanded extends and quantity supplied contracts.",
          "The price settles at US\\$14 with 400 bags sold.",
        ],
        modelAnswer: "At US\\$18 dealers offer 580 bags but farmers buy only 280, leaving 300 unsold. Once the agreement breaks down, each dealer cuts its price to sell its stock. As the price falls, farmers buy more and dealers offer fewer bags, until at US\\$14 quantity demanded equals quantity supplied at 400 bags.",
        explanation: "Surplus → price cutting → movements along both curves → equilibrium.",
      }),
    ],
    hints: ["Equilibrium is where the two quantity columns are equal.", "Shortage = Qd − Qs; surplus = Qs − Qd."],
    explanation: "Read equilibrium from the schedule, measure the gaps, and use the price mechanism to explain the return to equilibrium.",
  });

  // Structured 2: shortage and queues, discuss.
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, marks: 8,
    stem: "In a fictional town a single supplier sells cooking gas at a fixed price of US\\$1.50 per kg. Every week long queues form and the gas runs out before everyone is served. At US\\$1.50, 6,000 kg are demanded each week but only 4,000 kg are supplied.",
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "plain", value: 2000, stem: "Calculate the shortage per week (kg).", wrong: [6000], explanation: "6,000 − 4,000 = 2,000 kg." }),
      P.tf({ label: "(b)", stem: "The price of US\\$1.50 must be below the equilibrium price.", answer: true, explanation: "True: a shortage only occurs at a price below equilibrium." }),
      P.manual({
        label: "(c)", marks: 6, levels: LV(6),
        stem: "Discuss whether the supplier should raise its price to remove the queues.",
        points: [
          "For: a higher price extends supply (more worth bringing in) and contracts demand, removing the shortage.",
          "For: queues waste customers' time; goods go to those who value them most / supplier earns more revenue to expand.",
          "Against: poorer households may no longer afford gas and switch to firewood (harm to health/environment).",
          "Against: if supply cannot be increased quickly, the price rise mainly raises the supplier's profit.",
          "Alternative: increase supply (more deliveries / storage) or rationing.",
          "Justified conclusion.",
        ],
        modelAnswer: "Raising the price would remove the shortage: at a higher price buyers would want less gas and the supplier would find it worthwhile to bring in more, until the two quantities met at equilibrium and the queues disappeared. People would no longer waste hours queuing. However, poorer families might be priced out and turn to firewood, which harms health and forests, and if the supplier cannot bring in more gas quickly, most of the gain is extra profit. A better approach may be a moderate price rise together with more deliveries. On balance, letting the price rise towards equilibrium is the most reliable way to end the queues, but help for poor households may be needed.",
        explanation: "Weigh efficiency (no queues, more supply) against fairness (affordability), and conclude.",
      }),
    ],
    hints: ["A shortage means the price is too low to clear the market.", "Who gains and who loses if the price rises?"],
    explanation: "A price below equilibrium causes a shortage and queues; raising it clears the market but affects affordability.",
  });

  b.card("DEFINITION", "Define **equilibrium price**.", "The price at which quantity demanded equals quantity supplied, so the market clears.");
  b.card("DEFINITION", "What is a **shortage** (excess demand)?", "The amount by which quantity demanded exceeds quantity supplied at a price below equilibrium.");
  b.card("DEFINITION", "What is a **surplus** (excess supply)?", "The amount by which quantity supplied exceeds quantity demanded at a price above equilibrium.");
  b.card("CONCEPT", "How is a shortage removed in a free market?", "Price rises: supply extends and demand contracts until they are equal.");
  b.card("CONCEPT", "How is a surplus removed in a free market?", "Price falls: demand extends and supply contracts until they are equal.");
  b.card("CONCEPT", "On a diagram, where is equilibrium?", "Where the demand and supply curves cross; read off Pe on the vertical axis and Qe on the horizontal axis.");
  b.card("FACT", "Do the curves shift when a market returns to equilibrium?", "No: quantities move along the existing curves as the price changes.");
  b.card("DEFINITION", "What is **disequilibrium**?", "Any situation in which quantity demanded and quantity supplied are not equal at the current price.");
  b.card("FORMULA", "How do you calculate consumer spending at equilibrium?", "Equilibrium price × equilibrium quantity (also equal to sellers' total revenue).");
});
