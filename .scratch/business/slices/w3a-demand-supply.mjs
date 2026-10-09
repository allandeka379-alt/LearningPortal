// W3a: markets, demand and supply (ZIMSEC Business Enterprise and Skills only).
import { concept, P, table, money, fmt, check } from "../lib.mjs";

concept("bus.marketing.demand-supply", { file: "marketing/demand-supply", keyPrefix: "marketing.demand-supply" }, (b) => {
  // Egg trays schedule (different figures from the lesson).
  const pr = [3, 3.5, 4, 4.5, 5], qd = [225, 195, 165, 135, 105], qs = [105, 135, 165, 195, 225];
  const eqI = pr.findIndex((_, i) => qd[i] === qs[i]);
  const eqP = pr[eqI], eqQ = qd[eqI];
  check("eq", eqP, 4);
  // Maize-meal bags (surplus item) and cabbages (shortage item): separate schedules.
  const prM = [8, 9, 10, 11, 12], qdM = [500, 440, 380, 320, 260], qsM = [260, 320, 380, 440, 500];
  const surplusM = qsM[4] - qdM[4];
  const schedM = table(["Price per bag US\\$", "Quantity demanded (bags)", "Quantity supplied (bags)"], prM.map((p, i) => [p, qdM[i], qsM[i]]));
  const prC = [0.5, 0.6, 0.7, 0.8, 0.9], qdC = [345, 310, 275, 240, 205], qsC = [205, 240, 275, 310, 345];
  const shortageC = qdC[1] - qsC[1];
  const schedC = table(["Price per cabbage US\\$", "Quantity demanded", "Quantity supplied"], prC.map((p, i) => [p.toFixed(2), qdC[i], qsC[i]]));
  const sched = table(["Price per tray US\\$", "Quantity demanded (trays)", "Quantity supplied (trays)"], pr.map((p, i) => [p.toFixed(2), qd[i], qs[i]]));

  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is meant by demand?",
    options: [
      ["The quantity consumers are willing and able to buy at each price", "Correct: both willingness and ability are needed."],
      ["The quantity consumers would like to have if goods were free", "Demand requires the ability to pay."],
      ["The quantity producers offer for sale at each price", "That is supply."],
      ["The total money spent on advertising a product", "That is promotion spending."],
    ],
    answer: "A",
    explanation: "**Demand** is the quantity consumers are willing **and able** to buy at each price over a period.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "According to the law of supply, what happens to the quantity supplied when the price of a product rises?",
    options: [
      ["It rises", "Correct: higher prices make supplying more profitable."],
      ["It falls", "That describes demand, not supply."],
      ["It stays the same", "Producers respond to price."],
      ["It falls to zero", "There is no reason for supply to stop."],
    ],
    answer: "A",
    explanation: "Higher prices encourage producers to supply more, so the supply curve slopes upwards.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What happens in a market when the price is above the equilibrium price?",
    options: [
      ["There is a surplus, so the price tends to fall", "Correct: supply exceeds demand."],
      ["There is a shortage, so the price tends to rise", "That happens below equilibrium."],
      ["Demand equals supply", "That only happens at equilibrium."],
      ["Producers supply less than consumers demand", "Above equilibrium, supply exceeds demand."],
    ],
    answer: "A",
    explanation: "Above equilibrium, supply is greater than demand: sellers cut prices to clear the **surplus**.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "The price of rice rises sharply. What is most likely to happen to the demand for maize meal, a substitute?",
    options: [
      ["It rises", "Correct: consumers switch to the cheaper substitute."],
      ["It falls", "Dearer rice makes maize meal relatively cheaper."],
      ["It stays exactly the same", "Consumers respond to relative prices."],
      ["The supply of maize meal falls", "The question is about demand; supply is not directly affected."],
    ],
    answer: "A",
    explanation: "When a substitute becomes dearer, demand for the other product rises.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A drought reduces the harvest of sugar beans. If demand does not change, what happens to the price of sugar beans?",
    options: [
      ["It rises", "Correct: lower supply with the same demand raises price."],
      ["It falls", "Price falls when supply increases."],
      ["It stays the same", "A fall in supply affects price."],
      ["It falls, then rises", "The price moves directly upwards."],
    ],
    answer: "A",
    explanation: "A decrease in supply with unchanged demand raises the equilibrium price and lowers the quantity sold.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Many new vendors start selling the same airtime cards in a town. What is the most likely effect on price and quantity sold?",
    options: [
      ["Price falls and quantity sold rises", "Correct: supply increases."],
      ["Price rises and quantity sold falls", "That follows a fall in supply."],
      ["Price rises and quantity sold rises", "That follows an increase in demand."],
      ["Price and quantity both stay the same", "An increase in supply changes the equilibrium."],
    ],
    answer: "A",
    hints: ["More sellers means more supply."],
    explanation: "An increase in supply lowers the equilibrium price and raises the quantity sold.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A demand and supply diagram for bread shows the demand curve moving to the right. Which event could cause this?",
    options: [
      ["A rise in consumers' incomes", "Correct: higher incomes increase demand."],
      ["A rise in the price of flour", "That reduces supply, not demand."],
      ["A fall in the price of bread", "That changes the quantity demanded along the curve."],
      ["A new tax on bakeries", "That reduces supply."],
    ],
    answer: "A",
    hints: ["A shift of the demand curve is caused by a factor other than the product's own price."],
    explanation: "A rightward shift means more is demanded at every price: rising incomes, population or popularity can cause it.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A market must always be a physical place where buyers and sellers meet face to face.",
    answer: false,
    explanation: "False. A market can be virtual, such as a website or a mobile app.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "At the equilibrium price there is neither a shortage nor a surplus.",
    answer: true,
    explanation: "True. Quantity demanded equals quantity supplied, so the market clears.",
  });
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: eqP, dp: 2,
    stem: `The table shows the demand and supply schedule for trays of eggs at a market in Masvingo.\n\n${sched}\n\nWhat is the equilibrium price per tray?`,
    wrong: [pr[0], pr[4]],
    explanation: `At ${money(eqP)}, quantity demanded (${eqQ}) equals quantity supplied (${eqQ}).`,
  });
  b.num({
    d: 3, skill: "APPLICATION", kind: "units", value: surplusM,
    stem: `The table shows the weekly market for 10 kg bags of maize meal in a small town.

${schedM}

How many bags would be left unsold (the surplus) if the price were ${money(prM[4])} per bag?`,
    wrong: [qsM[4], qdM[4]],
    hints: ["Surplus = quantity supplied − quantity demanded."],
    explanation: `At ${money(prM[4])}: supplied ${qsM[4]} − demanded ${qdM[4]} = surplus of ${surplusM} bags.`,
  });
  b.num({
    d: 3, skill: "APPLICATION", kind: "units", value: shortageC,
    stem: `The table shows the daily market for cabbages at a market in Mutare.

${schedC}

What would be the shortage if the council fixed the price at ${money(prC[1])} per cabbage?`,
    wrong: [qdC[1], 0],
    hints: ["Shortage = quantity demanded − quantity supplied."],
    explanation: `At ${money(prC[1])}: demanded ${qdC[1]} − supplied ${qsC[1]} = shortage of ${shortageC} cabbages.`,
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each event with its effect on the market for school uniforms.",
    pairs: [
      ["A large rise in the number of pupils", "Demand increases"],
      ["A rise in the price of cloth", "Supply decreases"],
      ["New, faster sewing machines for tailors", "Supply increases"],
      ["Schools allow pupils to wear their own clothes", "Demand decreases"],
    ],
    explanation: "Changes in buyers' numbers or tastes shift demand; changes in costs or technology shift supply.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "A demand curve slopes {{blank:a}} from left to right. A supply curve slopes {{blank:b}} from left to right.",
    blanks: [
      { id: "a", accepted: ["down"], choices: ["down", "up"] },
      { id: "b", accepted: ["up"], choices: ["up", "down"] },
    ],
    explanation: "Quantity demanded falls as price rises; quantity supplied rises as price rises.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "UNDERSTANDING",
    stem: "Explain **two** factors, other than price, that could increase the demand for a product.",
    points: [
      "Factor 1, e.g. higher incomes.",
      "Explained: consumers can afford more.",
      "Factor 2, e.g. rise in price of a substitute / advertising / change in tastes / population growth.",
      "Explained: e.g. buyers switch from the dearer substitute / product becomes more popular.",
    ],
    hints: ["Think about income, other products and tastes."],
    modelAnswer: "If consumers' incomes rise, they can afford to buy more of the product. If the price of a substitute rises, consumers switch to this product, so its demand increases.",
    explanation: "Income, substitutes, complements, tastes, population and season all shift demand.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 840, calculator: true,
    stem: `Thandeka grows onions near Mutare and sells them to traders. The table shows the weekly market for bags of onions in her area.\n\n${table(["Price per bag US\\$", "Quantity demanded (bags)", "Quantity supplied (bags)"], [[6, 900, 300], [7, 750, 450], [8, 600, 600], [9, 450, 750], [10, 300, 900]])}`,
    parts: [
      P.num({
        label: "(a)", marks: 1, kind: "money", value: 8,
        stem: "State the equilibrium price per bag.",
        wrong: [10],
        explanation: "At US\\$8, 600 bags are demanded and 600 supplied.",
      }),
      P.num({
        label: "(b)", marks: 2, kind: "units", value: 750 - 450, type: "CALCULATION",
        stem: "Calculate the surplus or shortage at a price of US\\$7 per bag.",
        wrong: [750],
        explanation: "Demand 750 − supply 450 = shortage of 300 bags.",
        workedSolution: "1. At US\\$7: demanded 750, supplied 450.\n2. Demand exceeds supply: shortage = 750 − 450 = 300 bags.",
      }),
      P.mcq({
        label: "(c)", marks: 1,
        stem: "Many farmers in the area plant onions next season. What is likely to happen to the price of onions?",
        options: [["It falls", "Correct: supply increases."], ["It rises", "That would follow a fall in supply."], ["It stays at US\\$8", "Equilibrium changes when supply changes."], ["It doubles", "No reason for such a rise."]],
        answer: "A",
      }),
      P.manual({
        label: "(d)", marks: 6,
        stem: "Thandeka could store some onions and sell them later in the year when fewer farmers have onions to sell. Discuss whether she should do this.",
        points: [
          "Later, supply is lower, so price is higher.",
          "Higher revenue per bag.",
          "Costs: storage facilities, losses from rotting.",
          "Needs cash now; delayed income / cash-flow problem.",
          "Risk: other farmers do the same, so later supply is not as low.",
          "Justified conclusion.",
        ],
        modelAnswer: "Later in the year fewer farmers have onions, so supply falls and the price rises; storing some onions would earn Thandeka more per bag. However, she needs a dry store, some onions may rot, and she would wait longer for her money, which could cause cash-flow problems. If many farmers store onions too, the later price may not rise much. She should store part of her crop, selling the rest now to cover her immediate costs.",
      }),
    ],
    hints: ["(b) Compare demand and supply at US\\$7.", "(d) When is supply low and the price high?"],
    explanation: "The equilibrium is US\\$8; below it there is a shortage. Selling when supply is low earns a higher price but has storage costs and risks.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 840,
    stem: "Nyasha sells school stationery from a stall in Bulawayo. In January, when schools open, she can sell exercise books at a higher price than in the middle of the year. A new stationery wholesaler has also opened in the city, and many more vendors now sell the same exercise books.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "Define **market** and **supply**.",
        points: ["Market: where buyers and sellers meet to exchange goods or services (physical or virtual).", "Supply: quantity producers / sellers are willing and able to offer for sale at each price."],
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "Explain why Nyasha can charge a higher price in January.",
        points: ["Schools open, so demand for exercise books rises.", "Demand is greater than supply at the old price (shortage).", "So the equilibrium price rises."],
        modelAnswer: "In January schools open and parents must buy exercise books, so demand rises. At the old price demand is greater than supply, so buyers compete and the price rises.",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Evaluate the effect of the new wholesaler and the extra vendors on Nyasha's business.",
        points: [
          "More vendors increase supply, so prices fall.",
          "Nyasha's revenue per book falls / competition for customers.",
          "Wholesaler may lower her buying costs / easier restocking.",
          "Overall effect on profit depends on whether costs fall as much as prices.",
          "Possible responses: sell other items, offer service, sell near schools.",
          "Justified judgement.",
        ],
        modelAnswer: "More vendors increase the supply of exercise books, so the market price falls and Nyasha competes for the same customers, cutting her revenue per book. However, the new wholesaler may let her buy stock more cheaply and restock quickly, so her costs fall too. If her buying price falls as much as her selling price, her profit per book may not change. She could also stand out by selling a wider range of stationery near schools. Overall the effect is likely to be negative unless she uses the cheaper stock and better service to keep her customers.",
      }),
    ],
    hints: ["(b) What happens to demand when schools open?", "(c) Consider both supply and her costs."],
    explanation: "Seasonal demand raises prices; more sellers raise supply and lower prices.",
  });
  b.card("DEFINITION", "What is a **market**?", "Any place or arrangement where buyers and sellers meet to exchange goods or services.");
  b.card("DEFINITION", "What is **demand**?", "The quantity consumers are willing and able to buy at each price over a period.");
  b.card("DEFINITION", "What is **supply**?", "The quantity producers are willing and able to sell at each price over a period.");
  b.card("DEFINITION", "What is the **equilibrium price**?", "The price at which quantity demanded equals quantity supplied.");
  b.card("CONCEPT", "Shortage or surplus?", "Shortage: demand > supply (price below equilibrium, price rises). Surplus: supply > demand (price above equilibrium, price falls).");
  b.card("FACT", "Factors that change demand?", "Income, prices of substitutes and complements, tastes and advertising, population, season.");
  b.card("FACT", "Factors that change supply?", "Costs of production, weather, technology, number of producers, taxes and subsidies.");
  b.card("CONCEPT", "Effects of changes in demand and supply on price?", "More demand: price up. Less demand: price down. More supply: price down. Less supply: price up.");
});
