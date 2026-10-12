// W1b: maximum and minimum prices and buffer stock schemes (both boards, AS).
import { concept, P, chk, fmt, priceControl, linearMarket } from "../lib.mjs";

const LV8 = [
  [3, 6, 8, "Two-sided, applied and developed, with a justified conclusion."],
  [2, 3, 5, "Some development of one or both sides, limited application or conclusion."],
  [1, 1, 2, "Simple, undeveloped points."],
];

concept("aecon.intervention.price-controls-buffer-stocks", { file: "intervention/price-controls-buffer-stocks", keyPrefix: "intervention.price-controls-buffer-stocks" }, (b) => {
  const mc = (o, correct, wrongs) => b.mcq({ ...o, options: [correct, ...wrongs], answer: "A" });

  mc({ d: 1, skill: "RECALL", stem: "A maximum price set below the equilibrium price will cause",
    explanation: "At a price below equilibrium quantity demanded exceeds quantity supplied: a shortage." },
    ["a shortage", "Correct: demand exceeds supply."], [["a surplus", "A surplus follows a minimum price above equilibrium."], ["no change in the market", "A binding control has an effect."], ["a rise in the quantity supplied", "Producers supply less at the lower price."]]);

  mc({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "A minimum price set above the equilibrium price will cause",
    explanation: "At a price above equilibrium quantity supplied exceeds quantity demanded: a surplus." },
    ["a surplus", "Correct: supply exceeds demand."], [["a shortage", "A shortage follows a maximum price."], ["a fall in the quantity supplied", "Producers supply more at the higher price."], ["a rise in the quantity demanded", "Consumers buy less at the higher price."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "A maximum price set above the equilibrium price will",
    explanation: "A ceiling above the market price does not bind, so the market stays at equilibrium." },
    ["have no effect on the market price", "Correct: it is not binding."], [["create a shortage", "A shortage needs a ceiling below equilibrium."], ["create a surplus", "A surplus follows a floor above equilibrium."], ["raise the price to the maximum", "Prices need not rise to the ceiling."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "In a buffer stock scheme, the agency buys the product when the market price",
    explanation: "The agency buys when the price falls to the floor (supporting farmers) and sells when it rises to the ceiling." },
    ["falls to the lower limit", "Correct: it buys the surplus."], [["rises to the upper limit", "The agency sells then."], ["is exactly at equilibrium", "The agency acts only at the limits."], ["is above the ceiling for a year", "It sells at the ceiling."]]);

  mc({ d: 3, skill: "ANALYSIS", hints: ["Consider what happens to unmet demand."],
    stem: "Which is a likely consequence of a binding maximum price on maize meal?",
    explanation: "Shortages lead some buyers to pay above the legal price in an unofficial black market." },
    ["a black market in which the good is sold above the maximum price", "Correct: unmet demand seeks supply."],
    [["a surplus that the government must buy and store at its own cost", "That follows a minimum price."], ["a rise in the quantity supplied", "Producers supply less at the lower price."], ["an end to the shortage because prices adjust to clear the market", "A binding ceiling creates a shortage."]]);

  mc({ d: 3, skill: "UNDERSTANDING", hints: ["Think about what a minimum price does to quantity."],
    stem: "A minimum wage set above the equilibrium wage is likely to",
    explanation: "The wage is a price of labour: a floor above equilibrium raises the quantity of labour supplied and lowers the quantity demanded, causing unemployment among those seeking work at that wage." },
    ["raise the number seeking work and cut the number employers want to hire", "Correct: a surplus of labour."],
    [["reduce the number of people seeking work and raise the number employers want to hire", "A higher wage attracts more workers."], ["raise employment for everyone", "Employers demand less labour at a higher wage."], ["have no effect on wages", "A binding floor raises the wage."]]);

  mc({ d: 4, skill: "EVALUATION", hints: ["Think about what limits a buffer stock."],
    stem: "A buffer stock scheme is most likely to fail if",
    explanation: "A floor price set too high keeps buying surpluses, so stocks and costs grow until the agency cannot finance the scheme." },
    ["the floor price is set above the long-run equilibrium price", "Correct: stocks accumulate without limit."],
    [["the price oscillates around the long-run equilibrium", "That is the case the scheme is built for."], ["good and bad harvests are equally frequent", "Then purchases and sales balance."], ["storage costs are low", "Low costs help the scheme."]]);

  {
    const c = priceControl({ a: 60, b: 0.1, c: 20, d: 0.1, price: 30 });
    chk(c.qd, 300, 1e-9); chk(c.qs, 100, 1e-9); chk(c.shortage, 200, 1e-9);
    b.num({ d: 2, skill: "APPLICATION", daily: true, kind: "plain", value: c.shortage, unit: "tonnes",
      stem: "A fictional maize market has demand P = 60 − 0.1Q and supply P = 20 + 0.1Q (P in US\\$ per tonne, Q in tonnes). The equilibrium is US\\$40 and 200 tonnes. A maximum price of US\\$30 is set. Calculate the shortage in tonnes.",
      wrong: [100, 300, 400],
      explanation: `At US\\$30: quantity demanded = (60 − 30) ÷ 0.1 = ${c.qd}; quantity supplied = (30 − 20) ÷ 0.1 = ${c.qs}. Shortage = ${c.qd} − ${c.qs} = ${c.shortage} tonnes.` });
    const f = priceControl({ a: 60, b: 0.1, c: 20, d: 0.1, price: 50 });
    chk(f.surplus, 200, 1e-9);
    b.num({ d: 3, skill: "APPLICATION", kind: "plain", value: f.surplus, unit: "tonnes", hints: ["Compare quantity supplied and demanded at the floor price."],
      stem: "In the same market a minimum price of US\\$50 per tonne is set. Calculate the surplus in tonnes.",
      wrong: [100, 300, 400],
      explanation: `At US\\$50: quantity demanded = (60 − 50) ÷ 0.1 = ${f.qd}; quantity supplied = (50 − 20) ÷ 0.1 = ${f.qs}. Surplus = ${f.qs} − ${f.qd} = ${f.surplus} tonnes.` });
    const cost = 50 * f.surplus;
    b.calc({ d: 3, skill: "APPLICATION", calculator: true, kind: "money", value: cost, hints: ["Cost = price × surplus bought."],
      stem: "The government buys the whole surplus (200 tonnes) at the minimum price of US\\$50. Calculate the cost of buying it, ignoring storage.",
      wrong: [5000, 8000, 15000],
      explanation: `1. Surplus = 200 tonnes.\n2. Price paid = US\\$50.\n3. Cost = 50 × 200 = US\\$${fmt(cost)}.` });
    const g = priceControl({ a: 60, b: 0.1, c: 4, d: 0.1, price: 35 });
    chk(g.surplus, 60, 1e-9);
    b.num({ d: 4, skill: "ANALYSIS", kind: "plain", value: g.surplus, unit: "tonnes", hints: ["Find Qd and Qs at the floor of US\\$35."],
      stem: "A buffer stock agency has a floor of US\\$35 per tonne. After a good harvest, supply is P = 4 + 0.1Q, with demand P = 60 − 0.1Q. How many tonnes must the agency buy to hold the price at US\\$35?",
      wrong: [30, 250, 310],
      explanation: `At US\\$35 quantity demanded = ${g.qd} and quantity supplied = ${g.qs}, so the agency buys ${g.surplus} tonnes. Without the scheme the price would be US\\$32.` });
    const net = 45 * 60 - 35 * 60;
    chk(net, 600, 1e-9);
    b.calc({ d: 4, skill: "ANALYSIS", calculator: true, kind: "money", value: net, hints: ["Revenue from selling minus cost of buying."],
      stem: "In a good year the agency buys 60 tonnes at its floor of US\\$35. In a poor year it sells 60 tonnes at its ceiling of US\\$45. Ignoring storage costs, calculate the agency's net gain over the two years.",
      wrong: [1200, 2100, 2700],
      explanation: `1. Cost of buying = 35 × 60 = US\\$2,100.\n2. Revenue from selling = 45 × 60 = US\\$2,700.\n3. Net gain = 2,700 − 2,100 = US\\$${fmt(net)}, before storage costs.` });
  }

  b.tf({ d: 1, skill: "RECALL", stem: "A minimum price has an effect only if it is set above the equilibrium price.", answer: true,
    explanation: "True. A floor below equilibrium does not bind." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A buffer stock scheme fixes the price at one level.", answer: false,
    explanation: "False. It keeps the price within a band between a floor and a ceiling." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each policy with its likely effect.",
    pairs: [["Binding maximum price", "Shortage and possible black market"], ["Binding minimum price", "Surplus that must be bought or stored"], ["Buffer stock at the floor price", "Agency buys the surplus"], ["Buffer stock at the ceiling price", "Agency sells from stock"]],
    explanation: "Controls and buffer stocks work through shortages and surpluses." });

  b.short({ d: 2, skill: "RECALL", stem: "What is the name for a legal limit above which a price may not be charged?",
    accepted: ["maximum price", "price ceiling", "a maximum price", "ceiling price", "price cap"], wrong: ["minimum price"],
    explanation: "Maximum price (price ceiling)." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Explain what is meant by a buffer stock scheme.",
    points: ["An agency buys the product when the price falls to a lower limit.", "It sells from its stock when the price rises to an upper limit, to keep the price stable."],
    modelAnswer: "A buffer stock scheme is run by an agency that buys the product when its price falls to a lower limit and sells from its stock when the price reaches an upper limit, so that the price stays within a target range.", explanation: "Buying at the floor and selling at the ceiling." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Describe the shortage and what follows."],
    stem: "Explain the likely consequences of a maximum price set below the equilibrium price.",
    points: ["Quantity demanded exceeds quantity supplied (a shortage).", "Quantity traded falls to the quantity supplied.", "Rationing by queues or favouritism, and a possible black market.", "Producers lose surplus; quality may fall."],
    modelAnswer: "At the maximum price quantity demanded exceeds quantity supplied, so there is a shortage and only the smaller quantity supplied is traded. Goods have to be rationed by queues or favouritism, and a black market may arise in which the good is sold above the legal price. Producers earn less and may cut quality or supply.",
    explanation: "Shortage, rationing, black market, producer effects." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4, hints: ["Who gains and who loses?"],
    stem: "Analyse the effects of a minimum price for a farm crop on farmers, consumers and the government.",
    points: ["Farmers who sell gain a higher price per unit and may raise revenue.", "Consumers pay a higher price and buy less.", "A surplus arises, which the government must buy, store or dispose of.", "This costs taxpayers and may encourage over-production."],
    modelAnswer: "Farmers receive a higher price on each unit sold and, if the government buys the surplus, their revenue rises. Consumers pay a higher price and buy less. Because the quantity supplied exceeds the quantity demanded, a surplus builds up which the government must buy and store, which costs taxpayers and may encourage farmers to over-produce.",
    explanation: "Winners, losers and the cost of the surplus." });

  {
    const c = priceControl({ a: 12, b: 0.02, c: 2, d: 0.03, price: 5 });
    const eq = linearMarket({ a: 12, b: 0.02, c: 2, d: 0.03 });
    chk(eq.price, 8, 1e-9); chk(eq.quantity, 200, 1e-9); chk(c.qd, 350, 1e-9); chk(c.qs, 100, 1e-9); chk(c.shortage, 250, 1e-9);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["Equate demand and supply, then test the controlled price."],
      stem: "A fictional market for maize meal has demand P = 12 − 0.02Q and supply P = 2 + 0.03Q (P in US\\$ per bag, Q in thousand bags per week). The government sets a maximum price of US\\$5 per bag.",
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "money", value: eq.price, stem: "Calculate the equilibrium price.", wrong: [5, 10], explanation: "12 − 0.02Q = 2 + 0.03Q, so Q = 200 and P = US\\$8." }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: c.qd, unit: "units", stem: "Calculate the quantity demanded at US\\$5 (thousand bags).", wrong: [100, 200], explanation: "(12 − 5) ÷ 0.02 = 350." }),
        P.num({ label: "(c)", marks: 2, kind: "plain", value: c.shortage, unit: "units", stem: "Calculate the shortage at US\\$5 (thousand bags).", wrong: [100, 350], explanation: "Qs = (5 − 2) ÷ 0.03 = 100; shortage = 350 − 100 = 250." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain **two** problems that are likely to arise from the maximum price.",
          points: ["Shortage: only 100 thousand bags supplied, so many consumers cannot buy.", "Black market or rationing by queues, with prices above US\\$5.", "Producers may cut supply or quality (or lose revenue) so supply falls."],
          modelAnswer: "A shortage of 250 thousand bags arises, so only 100 thousand are available and many consumers cannot buy. Rationing by queues or favouritism and a black market selling above US\\$5 are likely. Producers receive a lower price and may cut output or quality." }),
      ],
      explanation: "Equilibrium US\\$8 and 200; at US\\$5, Qd 350, Qs 100, shortage 250." });
  }
  {
    const f = priceControl({ a: 40, b: 0.05, c: 10, d: 0.05, price: 30 });
    chk(f.eq.price, 25, 1e-9); chk(f.eq.quantity, 300, 1e-9); chk(f.qd, 200, 1e-9); chk(f.qs, 400, 1e-9); chk(f.surplus, 200, 1e-9);
    b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, hints: ["Quantity supplied at the floor is what farmers produce.", "Revenue = price × quantity sold or bought."],
      stem: "A fictional market for groundnuts has demand P = 40 − 0.05Q and supply P = 10 + 0.05Q (P in US\\$ per tonne, Q in tonnes). The equilibrium is US\\$25 and 300 tonnes. The government sets a minimum price of US\\$30 and promises to buy any groundnuts that consumers do not.",
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "plain", value: f.surplus, unit: "tonnes", stem: "Calculate the surplus (quantity supplied minus quantity demanded) at US\\$30, in tonnes.", wrong: [100, 300, 400], explanation: "Qd = (40 − 30) ÷ 0.05 = 200; Qs = (30 − 10) ÷ 0.05 = 400; surplus = 200." }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: 30 * f.surplus, stem: "Calculate the cost to the government of buying the surplus.", wrong: [5000, 12000], explanation: "30 × 200 = US\\$6,000." }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: 30 * f.qs, stem: "Calculate farmers' total revenue at the minimum price, including sales to the government.", wrong: [7500, 6000], explanation: "30 × 400 = US\\$12,000, compared with 25 × 300 = US\\$7,500 at equilibrium." }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain **one** problem that the surplus creates for the government.",
          points: ["The government must pay for it (US\\$6,000) from taxation or borrowing, or store it with extra cost.", "The surplus may grow each year if farmers keep expanding output, or it may deteriorate in storage."],
          modelAnswer: "The government must find US\\$6,000 to buy the surplus and pay for storage, which uses public funds that could be spent elsewhere. If farmers keep producing more because the price is guaranteed, the surplus and the cost grow." }),
        P.manual({ label: "(e)", marks: 2, stem: "Suggest **one** alternative way of supporting farmers' incomes and say why it may be better.",
          points: ["Direct income support or help to raise productivity or find markets (any reasonable alternative).", "It does not create a surplus or distort the price signal."],
          modelAnswer: "The government could give direct income support or help farmers improve yields and find new markets. This supports incomes without creating a surplus and without keeping resources in an over-supplied crop." }),
      ],
      explanation: "Surplus 200 tonnes; cost US\\$6,000; farmers' revenue US\\$12,000." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Weigh stability against cost."],
    stem: "Evaluate the use of a buffer stock scheme to stabilise the price of an agricultural product.",
    points: ["Buys in good harvests (supports farmers' incomes) and sells in poor ones (protects consumers).", "Reduces price fluctuations, helping planning and investment.", "Needs a correct estimate of the long-run price; if the floor is too high, surpluses accumulate.", "Storage costs and deterioration.", "Finance is needed to buy; the stock may run out.", "Cannot cope with long-run trends.", "Alternatives: storage and transport improvements, insurance, diversification.", "A justified judgement."],
    levels: LV8,
    modelAnswer: "A buffer stock scheme stabilises prices by buying in good harvests and selling in poor ones, which supports farm incomes in good years, protects consumers in bad years and helps farmers plan and invest. However, the agency needs a correct estimate of the long-run price: if the floor is above it, stocks accumulate without limit and costs rise. Storage is costly, crops can deteriorate and the stock may run out in a series of poor harvests. The scheme cannot cope with lasting changes in demand or supply. It works best for storable crops with short-term fluctuations, and it may be supported by better storage, transport and insurance. Overall it can reduce volatility but is costly and difficult to manage.",
    wordLimit: { min: 100, max: 300 },
    explanation: "Stability benefits against costs, information problems and alternatives." });

  b.card("DEFINITION", "Define a **maximum price**.", "A legal limit above which the price may not be charged; it binds only if set below the equilibrium price.");
  b.card("DEFINITION", "Define a **minimum price**.", "A legal limit below which the price may not fall; it binds only if set above the equilibrium price.");
  b.card("CONCEPT", "What does a binding maximum price cause?", "A shortage, rationing, possible black markets and a loss of total surplus.");
  b.card("CONCEPT", "What does a binding minimum price cause?", "A surplus that must be bought, stored or left unsold, and higher prices for consumers.");
  b.card("DEFINITION", "Define a **buffer stock scheme**.", "An agency buys when the price falls to a floor and sells when it rises to a ceiling, to keep the price within a range.");
  b.card("CONCEPT", "Give **three** problems of buffer stock schemes.", "Information about the right price, storage costs, finance, trends in the long run, political pressure to raise the floor.");
  b.card("FACT", "What is a minimum wage in terms of price controls?", "A minimum price of labour: if above the equilibrium wage it creates a surplus of labour (unemployment).");
  b.card("CONCEPT", "Why does a black market arise with a maximum price?", "Unmet demand at the controlled price makes some buyers willing to pay more for scarce supplies.");
  b.card("CONCEPT", "Name an alternative to price controls for helping the poor.", "Targeted cash transfers or vouchers, which leave prices to clear the market.");
});
