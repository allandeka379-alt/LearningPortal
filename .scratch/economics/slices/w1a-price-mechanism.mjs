// W1a: markets and the price mechanism (signalling, incentive and rationing functions; the three questions).
import { concept, P, schedule, money, fmt, table, check } from "../lib.mjs";

const LV6 = [
  [3, 5, 6, "Two-sided analysis, developed, with a justified conclusion."],
  [2, 3, 4, "Some analysis of both sides or one side well developed, limited conclusion."],
  [1, 1, 2, "Simple points, little explanation."],
];

concept("econ.markets.price-mechanism", { file: "markets/price-mechanism", keyPrefix: "markets.price-mechanism" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In economics, what is a **market**?",
    options: [
      ["Any arrangement that brings buyers and sellers together to exchange", "Correct: a market need not be a physical place."],
      ["A building or open space where farmers sell their produce to the public", "That is one kind of market, but markets need not be buildings."],
      ["A government office that sets the prices of goods", "Prices in a market are set by buyers and sellers."],
      ["A group of firms that all make the same product for sale", "That is an industry, not a market."],
    ],
    answer: "A",
    explanation: "A market is any arrangement, physical or not, through which buyers and sellers exchange goods, services or factors of production.",
  });
  b.mcq({
    d: 1, skill: "UNDERSTANDING",
    stem: "Which of these is an example of a market?",
    options: [
      ["Buying and selling airtime through mobile money", "Correct: buyers and sellers exchange at a price, without a physical place."],
      ["A family growing maize only for its own meals", "Nothing is exchanged with buyers."],
      ["A government store keeping grain in reserve", "Storing grain is not an exchange between buyers and sellers."],
      ["A school library lending books free to pupils", "There is no price and no sale."],
    ],
    answer: "A",
    explanation: "Mobile money airtime sales bring buyers and sellers together to exchange at a price, so they form a market even without a market place.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "The price of cement rises sharply as building increases. Which function of the price mechanism is shown when this rise tells producers that more cement is wanted?",
    options: [
      ["The signalling function", "Correct: the price change carries information about scarcity and demand."],
      ["The rationing function", "Rationing is how the higher price limits who buys the cement."],
      ["The incentive function", "Incentive is the extra profit that encourages producers to respond; the information itself is the signal."],
      ["The redistribution function", "Redistribution of income is not a function of prices in this sense."],
    ],
    answer: "A",
    explanation: "Signalling: a change in price gives information to producers and consumers that a good has become scarcer or more wanted.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "During a drought the price of maize rises, and only those willing and able to pay the higher price buy maize. Which function of prices is this?",
    options: [
      ["Rationing", "Correct: the higher price limits demand to the smaller quantity available."],
      ["Signalling", "Signalling is the information the price change carries, not who ends up buying."],
      ["Incentive", "Incentive is the encouragement to producers to supply more."],
      ["Taxation", "Taxation is a government measure, not a function of prices."],
    ],
    answer: "A",
    explanation: "Rationing: when a good is scarce, the higher price reduces quantity demanded so that the available supply goes to those willing and able to pay.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "When the price of soya beans rises, farmers switch land from cotton to soya beans. Which function of prices does this show?",
    options: [
      ["The incentive function", "Correct: higher prices make soya more profitable, encouraging farmers to grow more."],
      ["The rationing function", "Rationing concerns buyers being limited by the higher price."],
      ["The signalling function only", "The farmers are acting on the signal because of the profit: the incentive function."],
      ["The planning function", "There is no planner; farmers respond to prices themselves."],
    ],
    answer: "A",
    explanation: "Incentive: a higher price raises the profit from producing a good, so producers move resources into it.",
  });
  const prices = [2, 3, 4, 5, 6], qd = [260, 220, 180, 140, 100], qs = [60, 120, 180, 240, 300];
  const s = schedule({ prices, qd, qs, priceHeader: "Price per loaf (US\\$)", qdHeader: "Quantity demanded (loaves per day)", qsHeader: "Quantity supplied (loaves per day)", requireEquilibrium: true });
  check("eq", s.equilibrium.price, 4);
  const bread = `The table shows the daily market for bread in a fictional town.\n\n${s.md}`;
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: s.equilibrium.price, daily: true,
    stem: `${bread}\n\nAt what price does the market clear?`,
    wrong: [prices[1], prices[4]],
    explanation: `At ${money(s.equilibrium.price)}, quantity demanded (${fmt(s.equilibrium.quantity)}) equals quantity supplied (${fmt(s.equilibrium.quantity)}), so there is no shortage or surplus.`,
  });
  {
    const pr = [3, 4, 5, 6, 7], d = [335, 305, 275, 245, 215], su = [155, 215, 275, 335, 395];
    const sg = schedule({ prices: pr, qd: d, qs: su, priceHeader: "Price per bag (US\\$)", qdHeader: "Quantity demanded (bags per week)", qsHeader: "Quantity supplied (bags per week)", requireEquilibrium: true });
    b.num({
      d: 3, skill: "APPLICATION", kind: "plain", value: sg.excess[1],
      stem: `The table shows the weekly market for 2 kg bags of sugar in a fictional town.

${sg.md}

If the price were ${money(pr[1])}, how large would the shortage be, in bags per week?`,
      wrong: [d[1], -sg.excess[1]],
      explanation: `At ${money(pr[1])}: quantity demanded ${fmt(d[1])} − quantity supplied ${fmt(su[1])} = ${fmt(sg.excess[1])} bags a week. Buyers want more than sellers offer, so the price would be pushed up towards ${money(sg.equilibrium.price)}.`,
      hints: ["Shortage = quantity demanded − quantity supplied."],
    });
  }
  {
    const pr = [2, 3, 4, 5, 6], d = [170, 150, 130, 110, 90], su = [50, 90, 130, 170, 210];
    const so = schedule({ prices: pr, qd: d, qs: su, priceHeader: "Price per litre (US\\$)", qdHeader: "Quantity demanded (litres per day)", qsHeader: "Quantity supplied (litres per day)", requireEquilibrium: true });
    const sur = -so.excess[4];
    b.mcq({
      d: 3, skill: "ANALYSIS",
      stem: `The table shows the daily market for cooking oil in a fictional town.

${so.md}

The price is ${money(pr[4])}. What will the price mechanism do?`,
      options: [
        [`A surplus of ${fmt(sur)} litres will push the price down`, "Correct: sellers offer more than buyers want, so they cut prices to sell their oil."],
        [`A shortage of ${fmt(sur)} litres will push the price up`, "At this price supply is greater than demand, so it is a surplus, not a shortage."],
        [`A surplus of ${fmt(su[4])} litres will push the price up`, "The surplus is the difference between supply and demand, and a surplus lowers prices."],
        ["The price will stay the same, as the market clears now", "Quantity supplied and quantity demanded are not equal at this price."],
      ],
      answer: "A",
      explanation: `At ${money(pr[4])}, quantity supplied is ${fmt(su[4])} and quantity demanded ${fmt(d[4])}: a surplus of ${fmt(sur)}. Sellers compete to sell unsold oil, the price falls, quantity demanded rises and quantity supplied falls until the market clears at ${money(so.equilibrium.price)}.`,
      hints: ["Compare supply and demand at this price.", "What do sellers with unsold oil do?"],
    });
  }
  {
    const workersP = 12, workersQ = 4, hire = 50, wage = 7;
    const costP = workersP * wage, costQ = workersQ * wage + hire;
    const breakEven = hire / (workersP - workersQ);
    check("costs", costP - costQ, 6);
    b.calc({
      d: 4, skill: "ANALYSIS", kind: "money", value: breakEven, calculator: true,
      stem: `A firm can produce the same daily output by method P (${workersP} workers, no machine) or by method Q (${workersQ} workers plus a machine hired for ${money(hire)} a day). At a daily wage of ${money(wage)}, method P costs ${money(costP)} and method Q costs ${money(costQ)}. At what daily wage would the two methods cost exactly the same?`,
      wrong: [wage, hire / workersP],
      explanation: `1. Cost of P = ${workersP} × wage; cost of Q = ${workersQ} × wage + ${fmt(hire)}.\n2. Set them equal: ${workersP}w = ${workersQ}w + ${fmt(hire)}, so ${workersP - workersQ}w = ${fmt(hire)}.\n3. w = ${fmt(hire)} ÷ ${workersP - workersQ} = **${money(breakEven, 2)}**.\n\nBelow this wage the labour-intensive method P is cheaper; above it the machine (method Q) is cheaper. Factor prices decide *how* to produce. Dividing the hire charge by ${workersP} workers ignores the ${workersQ} workers method Q still needs.`,
      hints: ["Write the cost of each method using w for the wage.", "Set the two costs equal and solve."],
    });
  }
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Unregistered street vendors who sell vegetables at prices agreed with buyers are part of a market.",
    answer: true,
    explanation: "True. Informal markets are markets: buyers and sellers exchange at prices set by demand and supply.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The price mechanism allocates goods to the people who need them most.",
    answer: false,
    explanation: "False. It allocates goods to those who are willing and able to pay. People in great need but with low incomes may go without.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "When the price of a good rises, producers have an incentive to supply {{blank:a}} and consumers tend to buy {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["more"], choices: ["more", "less"] },
      { id: "b", accepted: ["less"], choices: ["more", "less"] },
    ],
    explanation: "A higher price makes production more profitable (incentive to supply more) and rations the good among buyers (they buy less).",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each function of prices to its description.",
    pairs: [
      ["Signalling", "A price change gives information about scarcity or demand"],
      ["Incentive", "A higher price encourages producers to supply more"],
      ["Rationing", "A higher price limits a scarce good to those willing and able to pay"],
    ],
    explanation: "Signalling gives information; incentive changes producers' behaviour; rationing shares out a scarce good.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain how the price mechanism answers the question *what to produce*.",
    points: [
      "Consumers spend more on goods they want, so the prices and profits of those goods rise.",
      "Firms move resources to produce more of the profitable goods and less of goods whose prices and profits fall.",
    ],
    explanation: "Consumer spending changes prices and profits, which guide firms' production decisions.",
    modelAnswer: "If consumers want more of a good, its price and the profit from making it rise, so firms move resources into producing it. Goods that consumers no longer want fall in price and make losses, so firms produce less of them.",
    hints: ["Follow the link from consumer spending to profit."],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse how the price mechanism answers the question *for whom to produce*, and why this may be seen as a weakness.",
    points: [
      "Goods go to those willing and able to pay the market price.",
      "Ability to pay depends on income from selling factors of production (wages, rent, interest, profit).",
      "People with low incomes (for example the unemployed, sick or elderly) may not be able to buy even essential goods.",
      "So allocation follows income rather than need, which many regard as unfair.",
    ],
    explanation: "The market distributes output by purchasing power, which depends on factor incomes; this may not match need.",
    modelAnswer: "In a market, goods go to people who are willing and able to pay the price. How much people can pay depends on their incomes from wages, rent, interest and profit. Someone who is unemployed, sick or elderly may have little income and may not afford even basic goods like medicine, while richer people can buy luxuries. Allocation therefore follows income rather than need, which many people see as a weakness.",
    hints: ["Where does people's ability to pay come from?"],
  });
  {
    const pr = [10, 12, 14, 16, 18], d1 = [500, 450, 400, 350, 300], sup = [250, 325, 400, 475, 550];
    const d2 = d1.map((q) => q - 125);
    const s1 = schedule({ prices: pr, qd: d1, qs: sup, requireEquilibrium: true });
    const s2 = schedule({ prices: pr, qd: d2, qs: sup, requireEquilibrium: true });
    const surplusAtOld = sup[2] - d2[2];
    check("old eq", s1.equilibrium.price, 14);
    check("new eq", s2.equilibrium.price, 12);
    const t = table(["Price per pair (US\\$)", "Quantity demanded before (pairs per month)", "Quantity demanded after (pairs per month)", "Quantity supplied (pairs per month)"], pr.map((p, i) => [p, d1[i], d2[i], sup[i]]));
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true,
      stem: `The table shows the monthly market for school shoes in a fictional town before and after many families moved away when a local mine closed.\n\n${t}`,
      parts: [
        P.num({
          label: "(a)", marks: 1, kind: "money", value: s1.equilibrium.price,
          stem: "State the market-clearing price before the families moved away.",
          wrong: [s2.equilibrium.price],
          explanation: `At ${money(s1.equilibrium.price)}, ${fmt(s1.equilibrium.quantity)} pairs are demanded and supplied.`,
        }),
        P.num({
          label: "(b)", marks: 1, kind: "plain", value: surplusAtOld,
          stem: "If the price stayed at its old level after the families moved away, how large would the surplus be, in pairs per month?",
          wrong: [sup[2], d1[2] - d2[2] + 25],
          explanation: `At ${money(pr[2])}: supplied ${fmt(sup[2])} − demanded ${fmt(d2[2])} = ${fmt(surplusAtOld)} pairs.`,
        }),
        P.fib({
          label: "(c)", marks: 2,
          stem: "Complete the sentences.",
          template: "The new market-clearing price is US\\${{blank:a}} and the quantity bought and sold is {{blank:b}} pairs per month.",
          blanks: [
            { id: "a", accepted: [String(s2.equilibrium.price)], wrong: String(s1.equilibrium.price) },
            { id: "b", accepted: [String(s2.equilibrium.quantity)], wrong: String(s1.equilibrium.quantity) },
          ],
          explanation: `After the change, quantity demanded equals quantity supplied at ${money(s2.equilibrium.price)}: ${fmt(s2.equilibrium.quantity)} pairs.`,
        }),
        P.manual({
          label: "(d)", marks: 4,
          stem: "Explain how the price mechanism reallocates resources after the families move away. Refer to the signalling and incentive functions.",
          points: [
            `Signalling: unsold shoes (a surplus of ${fmt(surplusAtOld)} pairs) lead shops to cut the price, signalling that fewer shoes are wanted.`,
            "Incentive: the lower price reduces the profit from selling shoes in the town.",
            `So suppliers bring fewer shoes (quantity supplied falls from ${fmt(sup[2])} to ${fmt(s2.equilibrium.quantity)}) and move resources to other goods or towns.`,
            `The market settles at ${money(s2.equilibrium.price)} where demand equals supply.`,
          ],
          modelAnswer: `At the old price of ${money(pr[2])} shops cannot sell ${fmt(surplusAtOld)} pairs a month. They cut prices, which signals that fewer shoes are wanted in the town. The lower price makes selling shoes less profitable, so suppliers send fewer pairs (down from ${fmt(sup[2])} to ${fmt(s2.equilibrium.quantity)}) and use their resources for other goods or other towns. The market clears at ${money(s2.equilibrium.price)} with ${fmt(s2.equilibrium.quantity)} pairs.`,
        }),
      ],
      explanation: `Demand fell by 125 pairs at every price. At the old price there is a surplus, the price falls to ${money(s2.equilibrium.price)}, and resources move out of shoe supply in the town.`,
      hints: ["Find the price where demand equals supply in each case.", "Surplus = quantity supplied − quantity demanded."],
    });
  }
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "After a severe drought in a fictional country, the maize harvest is much smaller than usual. The price of maize meal in shops rises steeply. Some people argue that the government should leave the price mechanism to deal with the shortage; others want the government to step in.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "Explain the rationing function of the higher price of maize meal.",
        points: [
          "The higher price reduces the quantity demanded.",
          "So the smaller supply is shared out among those willing and able to pay the higher price.",
        ],
        modelAnswer: "As the price rises, households buy less maize meal, so demand is reduced to match the smaller quantity available; the maize meal goes to those willing and able to pay the higher price.",
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain how the incentive function could help to reduce the shortage over time.",
        points: [
          "The higher price raises the profit from supplying maize meal.",
          "Traders have an incentive to import maize from neighbouring countries.",
          "Farmers with irrigation have an incentive to plant more maize in the next season.",
          "So supply rises and, over time, the price falls back.",
        ],
        modelAnswer: "The higher price makes supplying maize meal more profitable. Traders are encouraged to import maize from neighbouring countries, and farmers with irrigation are encouraged to plant more in the next season. As supply rises the shortage shrinks and the price falls back.",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Discuss whether the government should leave the price mechanism to deal with the maize meal shortage.",
        points: [
          "Argument for: prices ration the scarce supply without queues or the need for officials.",
          "Argument for: higher prices give incentives for imports and more planting, ending the shortage sooner.",
          "Argument against: poor households may be unable to afford a basic food, risking hunger.",
          "Argument against: allocation by ability to pay rather than need is seen as unfair in an emergency.",
          "Considers targeted help (food aid or cash transfers for the poorest) as a way to combine the two.",
          "Reaches a justified conclusion.",
        ],
        levels: LV6,
        modelAnswer: "Leaving the price mechanism to work means the scarce maize meal is rationed by price, without queues or costly officials, and the high price gives traders an incentive to import maize and farmers to plant more, so the shortage ends sooner. However, maize meal is a basic food: the poorest households may not afford it at the higher price and could go hungry, and many people see allocation by ability to pay rather than need as unfair in an emergency. Fixing the price low could cause queues and remove the incentive to import. A better approach is to let prices work while giving targeted food aid or cash to the poorest households, so supply recovers and nobody goes without.",
      }),
    ],
    explanation: "Prices ration and give incentives, but they allocate by ability to pay. In an emergency involving a basic food, targeted help can protect the poor while keeping price incentives.",
    hints: ["Rationing limits demand; incentive raises supply.", "Who loses if prices alone decide?"],
  });

  b.card("DEFINITION", "What is a **market**?", "Any arrangement that brings buyers and sellers together to exchange goods, services or factors of production.");
  b.card("DEFINITION", "What is the **price mechanism**?", "The system in which the interaction of demand and supply sets prices, and price changes allocate resources.");
  b.card("CONCEPT", "What is the **signalling** function of prices?", "A price change gives information about scarcity or changes in demand and supply.");
  b.card("CONCEPT", "What is the **incentive** function of prices?", "A higher price makes production more profitable, encouraging producers to supply more (and buyers to buy less).");
  b.card("CONCEPT", "What is the **rationing** function of prices?", "A higher price limits a scarce good to those willing and able to pay.");
  b.card("CONCEPT", "How does the price mechanism answer *how to produce*?", "Firms choose the cheapest method, which depends on the prices of labour, capital and other factors.");
  b.card("CONCEPT", "How does the price mechanism answer *for whom to produce*?", "Goods go to those willing and able to pay; ability to pay depends on income.");
  b.card("FACT", "Are informal markets real markets?", "Yes: buyers and sellers exchange at prices set by demand and supply, even if unregistered.");
  b.card("FORMULA", "How do you measure a shortage at a given price?", "Shortage = quantity demanded − quantity supplied (a negative result is a surplus).");
});
