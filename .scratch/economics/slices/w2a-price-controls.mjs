// W2a: econ.markets.price-controls — maximum prices (price ceilings) and minimum prices (price floors).
import { concept, P, schedule, money, check, ZIM, CAM } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.markets.price-controls", { file: "markets/price-controls", keyPrefix: "markets.price-controls" }, (b) => {
  // Bread market: Qd = 5250 - 1500P, Qs = 1650 + 750P (P in US$ per loaf). Equilibrium P = 1.60, Q = 2850.
  const pb = [1.0, 1.2, 1.4, 1.6, 1.8, 2.0];
  const qdB = pb.map((x) => Math.round(5250 - 1500 * x)), qsB = pb.map((x) => Math.round(1650 + 750 * x));
  const B = schedule({ prices: pb, qd: qdB, qs: qsB, priceHeader: "Price per loaf (US\\$)", qdHeader: "Quantity demanded (loaves per day)", qsHeader: "Quantity supplied (loaves per day)", requireEquilibrium: true });
  check("bread eq", B.equilibrium.price, 1.6);
  const iMax = pb.indexOf(1.2);
  const shortB = B.excess[iMax];
  check("bread shortage", shortB, 3450 - 2550);

  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **maximum price** (price ceiling)?",
    options: [
      ["A legal upper limit on the price that sellers may charge", "Correct: sellers may not charge more than this price."],
      ["The highest price consumers are willing to pay for a good", "This describes willingness to pay, not a government control."],
      ["A legal lower limit below which the price may not fall", "This is a minimum price (price floor)."],
      ["The price at which the most profit is made by sellers", "A maximum price is set by law, not by profit."],
    ],
    answer: "A",
    explanation: "A maximum price (price ceiling) is a legal limit above which a good may not be sold. It is effective only when set below the equilibrium price.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "For a **minimum price** (price floor) to have any effect on a market, it must be set",
    options: [
      ["above the equilibrium price.", "Correct: only then does it stop the price falling to equilibrium."],
      ["below the equilibrium price.", "Below equilibrium a floor has no effect: the market price is already higher."],
      ["exactly at the equilibrium price.", "At equilibrium nothing changes: the market already clears there."],
      ["at the cost of production of the least efficient firm.", "Where it is set is a policy choice; what matters is its position relative to equilibrium."],
    ],
    answer: "A",
    explanation: "A price floor prevents the price from falling below it. If equilibrium is already higher, the floor does not bind.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: `The table shows the daily market for bread in a fictional town.\n\n${B.md}\n\nThe government sets a maximum price of US\\$1.20 a loaf. What is the shortage?`,
    options: [
      [`${shortB.toLocaleString("en-GB")} loaves a day`, `Correct: ${qdB[iMax].toLocaleString("en-GB")} − ${qsB[iMax].toLocaleString("en-GB")} = ${shortB.toLocaleString("en-GB")}.`],
      [`${qdB[iMax].toLocaleString("en-GB")} loaves a day`, "This is the quantity demanded at US\\$1.20, not the gap."],
      [`${(qdB[iMax] - B.equilibrium.quantity).toLocaleString("en-GB")} loaves a day`, "This compares demand with the old equilibrium quantity, not with the quantity supplied."],
      ["No shortage: the price is legal", "At US\\$1.20 quantity demanded is greater than quantity supplied."],
    ],
    answer: "A",
    explanation: `At US\\$1.20, ${qdB[iMax].toLocaleString("en-GB")} loaves are demanded but only ${qsB[iMax].toLocaleString("en-GB")} supplied, a shortage of ${shortB.toLocaleString("en-GB")} loaves a day.`,
  });
  b.num({
    d: 2, skill: "APPLICATION", kind: "plain", value: 3120, daily: true,
    stem: "A fictional government sets a maximum price for paraffin of US\\$0.95 a litre, below the equilibrium price. At this price, quantity demanded is 4,350 litres a day and quantity supplied is 3,120 litres a day. How many litres are actually **sold** each day?",
    wrong: [4350, 4350 - 3120],
    explanation: "Buyers cannot buy what is not supplied: only the quantity supplied, **3,120 litres**, is sold. 4,350 is what people would like to buy, and 1,230 is the shortage.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A maximum price is set below the equilibrium price. Which describes the changes in the market?",
    options: [
      ["Demand extends and supply contracts, causing a shortage", "Correct: movements along both curves leave a gap."],
      ["Demand contracts and supply extends, causing a surplus", "That is the effect of a minimum price above equilibrium."],
      ["The supply curve shifts left and the price rises", "A price control does not shift the curves, and the price cannot rise above the ceiling."],
      ["The demand curve shifts right and a surplus appears", "Nothing shifts demand; the low price causes an extension."],
    ],
    answer: "A",
    explanation: "A lower price makes buyers want more (extension of demand) and sellers offer less (contraction of supply): a shortage.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which is the most likely consequence of a maximum price on cooking oil set well below the equilibrium price?",
    options: [
      ["Cooking oil is sold illegally at prices above the maximum", "Correct: a black (parallel) market grows because some buyers will pay more."],
      ["Producers increase output to take advantage of the price", "A lower price reduces the incentive to supply."],
      ["Stocks of unsold cooking oil build up in shops", "Unsold stocks are a sign of a surplus, not a shortage."],
      ["The government must buy up the extra cooking oil", "Buying surpluses goes with a minimum price."],
    ],
    answer: "A",
    hints: ["Is there a shortage or a surplus?", "What happens when buyers cannot get the good legally?"],
    explanation: "The ceiling causes a shortage. Buyers who cannot obtain oil legally pay more on a black market, often more than the old equilibrium price.",
  });
  // Minimum price on seed cotton (fictional): Qd = 1870 - 2P, Qs = 470 + 0.8P (P in US$ per tonne), eq P = 500, Q = 870.
  const pc = [420, 460, 500, 540, 580];
  const qdC = pc.map((x) => Math.round(1870 - 2 * x)), qsC = pc.map((x) => Math.round(470 + 0.8 * x));
  const C = schedule({ prices: pc, qd: qdC, qs: qsC, priceHeader: "Price per tonne (US\\$)", qdHeader: "Quantity demanded (tonnes per week)", qsHeader: "Quantity supplied (tonnes per week)", requireEquilibrium: true });
  check("cotton eq", C.equilibrium.price, 500);
  const iMin = pc.indexOf(580);
  const surplusC = -C.excess[iMin];
  const costC = 580 * surplusC;
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: costC,
    stem: `The table shows the weekly market for seed cotton in a fictional country.\n\n${C.md}\n\nThe government sets a minimum price of US\\$580 a tonne and buys any surplus at that price. Calculate the government's weekly spending on the surplus.`,
    wrong: [580 * qsC[iMin], 500 * surplusC],
    hints: ["Find the surplus at US\\$580 first.", "Spending = minimum price × surplus."],
    explanation: `1. At US\\$580: quantity supplied ${qsC[iMin]} tonnes, quantity demanded ${qdC[iMin]} tonnes.\n2. Surplus = ${qsC[iMin]} − ${qdC[iMin]} = ${surplusC} tonnes a week.\n3. Spending = 580 × ${surplusC} = **${money(costC)}** a week.\n4. ${money(580 * qsC[iMin])} would mean buying the whole crop; ${money(500 * surplusC)} uses the old equilibrium price instead of the minimum price.`,
  });
  const revUp = 680 * 1310 - 610 * 1240;
  check("rev up", revUp, 134400);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: revUp,
    stem: "Before a minimum price was introduced, tobacco farmers in a fictional country sold 1,240 tonnes a month at the equilibrium price of US\\$610 a tonne. With a minimum price of US\\$680 a tonne they sell 1,310 tonnes a month (to buyers and to a government agency). By how much does farmers' monthly revenue rise?",
    wrong: [680 * 1310, 70 * 1240],
    hints: ["Revenue = price × quantity, before and after."],
    explanation: `Before: 610 × 1,240 = ${money(610 * 1240)}. After: 680 × 1,310 = ${money(680 * 1310)}. Rise = **${money(revUp)}** a month. Multiplying only the US\\$70 price rise by the old quantity (${money(70 * 1240)}) ignores the extra tonnes sold.`,
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Who is most likely to **gain** from a minimum price set above equilibrium for a farm crop?",
    options: [
      ["Farmers who grow the crop", "Correct: they receive a higher, guaranteed price."],
      ["Consumers who buy the crop", "Consumers pay a higher price and buy less."],
      ["Taxpayers who fund the government", "Taxpayers may pay for buying and storing the surplus."],
      ["Firms that use the crop as an input", "Their costs rise when the price of the crop rises."],
    ],
    answer: "A",
    explanation: "A price floor raises producers' price and income; consumers, users of the crop and taxpayers bear the cost.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A maximum price set above the equilibrium price has no effect on the market.",
    answer: true,
    explanation: "True. The market price is already below the ceiling, so the law does not stop anything happening.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A minimum price set above equilibrium causes the demand curve to shift to the left.",
    answer: false,
    explanation: "False. The higher price causes a **contraction** of demand, a movement along the demand curve, not a shift.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each situation with its most likely result.",
    pairs: [
      ["Maximum price below equilibrium", "Shortage and queues"],
      ["Minimum price above equilibrium", "Surplus that may be bought by the government"],
      ["Maximum price above equilibrium", "No change in the market"],
      ["Shortage that lasts for months", "Black market at prices above the legal limit"],
    ],
    explanation: "Ceilings bite below equilibrium (shortage); floors bite above it (surplus); a lasting shortage encourages illegal trade.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "A price ceiling is effective when set {{blank:a}} the equilibrium price and causes a {{blank:b}}. A price floor is effective when set {{blank:c}} the equilibrium price and causes a {{blank:d}}.",
    blanks: [
      { id: "a", accepted: ["below"], choices: ["above", "below"] },
      { id: "b", accepted: ["shortage"], choices: ["shortage", "surplus"] },
      { id: "c", accepted: ["above"], choices: ["above", "below"] },
      { id: "d", accepted: ["surplus"], choices: ["shortage", "surplus"] },
    ],
    wrong: [["above", "surplus", "below", "shortage"]],
    explanation: "Ceiling below equilibrium → shortage; floor above equilibrium → surplus.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", applies: CAM,
    stem: "A government sets a maximum rent for flats in a city, below the equilibrium rent. Which outcome is most likely in the long run?",
    options: [
      ["Fewer flats are offered for rent and their upkeep is neglected", "Correct: lower returns reduce supply and maintenance over time."],
      ["More flats are built because rents are now controlled", "Lower rents reduce the incentive to build flats."],
      ["Fewer people want to rent flats at the lower rent", "Demand extends when the rent is lower."],
      ["Empty flats appear because rents are too low to attract tenants", "Low rents attract more tenants; there is a shortage, not empty flats."],
    ],
    answer: "A",
    hints: ["What happens to landlords' incentive to supply and maintain flats?"],
    explanation: "Rent controls make letting less profitable, so supply contracts over time and landlords spend less on repairs, while more people want to rent: a lasting shortage.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Demand for a good is Qd = 960 − 45P and supply is Qs = 240 + 35P (P in US\\$). The government sets a maximum price of US\\$6. What is the shortage?",
    options: [
      ["240 units", "Correct: Qd = 960 − 270 = 690 and Qs = 240 + 210 = 450; 690 − 450 = 240."],
      ["690 units", "This is the quantity demanded at US\\$6."],
      ["450 units", "This is the quantity supplied at US\\$6."],
      ["135 units", "This compares quantity demanded at US\\$6 with the equilibrium quantity of 555."],
    ],
    answer: "A",
    hints: ["Equilibrium: 960 − 45P = 240 + 35P gives P = 9.", "Work out Qd and Qs at US\\$6."],
    explanation: "Equilibrium is US\\$9 and 555 units, so US\\$6 is below it. At US\\$6, Qd = 690 and Qs = 450: shortage = **240 units**.",
  });
  check("eq lin", 960 - 45 * 9, 240 + 35 * 9);
  check("eq q", 960 - 45 * 9, 555);
  check("short lin", 960 - 45 * 6 - (240 + 35 * 6), 240);
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the diagram you would use to show the effect of a maximum price set below the equilibrium price.",
    points: [
      "Price on the vertical axis and quantity on the horizontal axis, with a downward-sloping demand curve and an upward-sloping supply curve.",
      "The equilibrium price and quantity (P1, Q1) where the curves cross.",
      "A horizontal maximum-price line below P1.",
      "The quantity supplied (Qs) and quantity demanded (Qd) at the maximum price, with the gap Qs to Qd labelled as the shortage.",
    ],
    modelAnswer: "Price goes on the vertical axis and quantity on the horizontal axis. The demand curve slopes down and the supply curve slopes up; they cross at the equilibrium price P1 and quantity Q1. A horizontal line marked 'maximum price' is drawn below P1. It meets the supply curve at Qs and the demand curve further right at Qd. The distance from Qs to Qd is the shortage, and only Qs is sold.",
    hints: ["Axes, curves, equilibrium, the control line, the gap."],
    explanation: "Credit: axes and curves, the equilibrium, the ceiling below it, the shortage shown as a range of quantities.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** problems that a maximum price on maize meal may cause.",
    points: [
      "Identifies a shortage / queues.",
      "Explains: at the low price demand extends and supply contracts, so many people cannot buy, and time is wasted queuing.",
      "Identifies a black market / supply falling over time.",
      "Explains: buyers pay illegal higher prices / millers earn less and cut production or switch to uncontrolled products.",
    ],
    modelAnswer: "First, it causes a shortage. At the low legal price more families want to buy maize meal but millers offer less, so shelves empty and people waste hours in queues. Second, a black market develops: people who cannot buy in the shops pay illegal, higher prices to traders who have obtained stock. Over time millers may also cut production because the controlled price does not cover their costs.",
    hints: ["Identify each problem, then explain why it happens."],
    explanation: "Each problem: one mark to identify, one to explain how the ceiling causes it.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 6, applies: ZIM,
    stem: "Suggest three measures a government could combine with a price ceiling on a basic food to reduce the shortage it causes, explaining how each works.",
    points: [
      "Measure 1 identified (for example a subsidy to producers).",
      "Explained: lowers producers' costs, so supply increases (shifts right) at the controlled price.",
      "Measure 2 identified (for example releasing stocks from a strategic grain reserve).",
      "Explained: adds to the quantity available at the controlled price.",
      "Measure 3 identified (for example imports / rationing with coupons).",
      "Explained: imports raise supply; rationing shares the limited supply fairly and reduces queues and black-market sales.",
    ],
    modelAnswer: "A subsidy to millers lowers their costs, so they supply more at the ceiling price and the shortage narrows. The government can release maize from its strategic grain reserve, adding to the quantity in shops. It could also allow duty-free imports of maize to raise supply further, or issue ration coupons so that each household gets a fair share, which shortens queues and reduces black-market selling.",
    hints: ["A shortage is a gap between Qd and Qs: which side can be changed?"],
    explanation: "Good answers raise supply at the controlled price (subsidy, stocks, imports) or allocate the limited supply fairly (rationing).",
  });

  // Structured 1: maximum price on sugar.
  const ps = [1.5, 1.75, 2.0, 2.25, 2.5];
  const qdS = ps.map((x) => Math.round(9000 - 2400 * x)), qsS = ps.map((x) => Math.round(1800 + 1200 * x));
  const S = schedule({ prices: ps, qd: qdS, qs: qsS, priceHeader: "Price per 2 kg packet (US\\$)", qdHeader: "Quantity demanded (packets per week)", qsHeader: "Quantity supplied (packets per week)", requireEquilibrium: true });
  check("sugar eq", S.equilibrium.price, 2.0);
  const iS = ps.indexOf(1.5);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 12,
    stem: `The table shows the weekly market for 2 kg packets of sugar in a fictional district.\n\n${S.md}\n\nThe district authority plans to impose a maximum price of US\\$1.50 a packet.`,
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "money", value: S.equilibrium.price, dp: 2, stem: "State the equilibrium price.", wrong: [1.5], explanation: `At US\\$2.00, ${S.equilibrium.quantity.toLocaleString("en-GB")} packets are demanded and supplied.` }),
      P.num({ label: "(b)", marks: 2, kind: "plain", value: S.excess[iS], stem: "Calculate the shortage at the maximum price (packets per week).", wrong: [qdS[iS]], explanation: `${qdS[iS].toLocaleString("en-GB")} − ${qsS[iS].toLocaleString("en-GB")} = ${S.excess[iS].toLocaleString("en-GB")} packets.` }),
      P.num({ label: "(c)", marks: 1, kind: "plain", value: S.equilibrium.quantity - qsS[iS], stem: "By how many packets a week does the quantity of sugar actually sold fall?", wrong: [S.excess[iS]], explanation: `Sales fall from ${S.equilibrium.quantity.toLocaleString("en-GB")} to the quantity supplied, ${qsS[iS].toLocaleString("en-GB")}: a fall of ${(S.equilibrium.quantity - qsS[iS]).toLocaleString("en-GB")} packets.` }),
      P.manual({
        label: "(d)", marks: 8, levels: LV(8),
        stem: "Discuss whether the maximum price will help poor households in the district.",
        points: [
          "For: households that obtain sugar pay US\\$1.50 instead of US\\$2.00, saving money.",
          "For: protects buyers from sellers raising prices sharply; sugar is a basic item in poor budgets.",
          "Against: a shortage of packets means many households cannot buy at all; less sugar is sold than before.",
          "Against: queues waste time; poor households may lose working hours / those with connections are served first.",
          "Against: a black market develops at prices above US\\$2.00, which hurts poor buyers most.",
          "Against: suppliers may cut supply further or move sugar to other districts.",
          "Suggests what would make it work (subsidy to suppliers, rationing, targeted cash transfers).",
          "Justified conclusion.",
        ],
        modelAnswer: "Households that manage to buy sugar save 50 cents a packet, which matters to poor families who spend a large share of their income on basic foods, and the control stops sellers raising prices sharply. However, at US\\$1.50 demand rises and supply falls, leaving a weekly shortage, so many families get nothing, and fewer packets are sold than before. People must queue for hours, which costs poor workers income, and those with connections may be served first. A black market is likely, where sugar sells for more than the old price of US\\$2.00, and suppliers may send sugar to districts without controls. The ceiling would help the poor only if combined with measures that keep supply up, such as a subsidy to suppliers, or with rationing. On balance, a targeted cash transfer may help poor households more than a price ceiling.",
        explanation: "Weigh the lower price for those who buy against the shortage, queues and black market, and conclude.",
      }),
    ],
    hints: ["Shortage = Qd − Qs at the maximum price.", "Only the quantity supplied is sold."],
    explanation: "The ceiling of US\\$1.50 is below equilibrium (US\\$2.00), so demand extends, supply contracts and a shortage appears; the discussion weighs cheaper sugar against shortages and black markets.",
  });

  // Structured 2: minimum price for maize (producer price), evaluate.
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, marks: 8,
    stem: "A fictional government guarantees maize farmers a minimum price of US\\$390 a tonne. The equilibrium price is US\\$300 a tonne. At US\\$390 farmers offer 52,000 tonnes a month but buyers want only 37,000 tonnes. The government's grain agency buys the rest.",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: 390 * (52000 - 37000), stem: "Calculate the agency's monthly spending on surplus maize.", wrong: [390 * 52000, 300 * 15000], explanation: `Surplus = 52,000 − 37,000 = 15,000 tonnes; 15,000 × 390 = ${money(390 * 15000)}.` }),
      P.manual({
        label: "(b)", marks: 6, levels: LV(6),
        stem: "Discuss whether the minimum price is a good use of government money.",
        points: [
          "For: farmers' incomes are higher and more stable, so they keep farming and invest (food security).",
          "For: a strategic reserve of maize protects against drought years.",
          "Against: opportunity cost: the spending could fund schools, clinics or roads.",
          "Against: consumers pay more for maize meal; storage costs and losses from rotting.",
          "Against: protects inefficient farmers and encourages overproduction.",
          "Justified conclusion (for example worth it if the floor is modest and the stocks are used in bad years).",
        ],
        modelAnswer: "The floor gives farmers a higher, more certain income, so they keep growing maize and can invest in seed and fertiliser, which helps food security, and the stored surplus can be released in a drought year. However, the agency spends US\\$5.85 million a month buying maize nobody wants at that price; that money could have built clinics or schools. Consumers also pay more for maize meal, storage is costly and some grain may rot, and inefficient farmers are kept in business. The policy is a good use of money only if the floor is not far above equilibrium and the stocks really are used as a reserve; otherwise it is an expensive way to support farmers.",
        explanation: "Benefits to farmers and food security versus the opportunity cost, higher consumer prices and waste.",
      }),
    ],
    hints: ["Surplus = quantity supplied − quantity demanded at the floor.", "Think about who gains, who pays and what else the money could buy."],
    explanation: "A floor above equilibrium creates a surplus the government must buy; the discussion weighs farmers' incomes and food security against cost and inefficiency.",
  });
  check("maize cost", 390 * 15000, 5850000);

  b.card("DEFINITION", "Define a **maximum price** (price ceiling).", "A legal upper limit on the price of a good, set below the equilibrium price to make it effective.");
  b.card("DEFINITION", "Define a **minimum price** (price floor).", "A legal lower limit on the price of a good, set above the equilibrium price to make it effective.");
  b.card("CONCEPT", "What does a maximum price below equilibrium cause?", "A shortage: demand extends, supply contracts. Queues, black markets and rationing may follow.");
  b.card("CONCEPT", "What does a minimum price above equilibrium cause?", "A surplus: supply extends, demand contracts. The government may have to buy and store it.");
  b.card("FACT", "How much is actually sold under an effective maximum price?", "The quantity supplied (the smaller quantity), which is less than the old equilibrium quantity.");
  b.card("FORMULA", "How do you calculate the cost of buying the surplus under a minimum price?", "Surplus (Qs − Qd at the floor) × the minimum price.");
  b.card("DEFINITION", "What is a **black market**?", "Illegal trade at prices above a legal maximum price, caused by a shortage.");
  b.card("CONCEPT", "Do price controls shift demand or supply curves?", "No. The fixed price causes movements along both curves (extension and contraction).");
  b.card("FACT", "What are the ZIMSEC and Cambridge terms for price controls?", "ZIMSEC: price ceiling and price floor. Cambridge: maximum price and minimum price.");
});
