// W1b: functions of the price mechanism and linked markets (both boards, AS).
import { concept, P, chk, fmt, pctChange, dpStr, elasticity } from "../lib.mjs";

const LV8 = [
  [3, 6, 8, "Two-sided, applied and developed, with a justified conclusion."],
  [2, 3, 5, "Some development of one or both sides, limited application or conclusion."],
  [1, 1, 2, "Simple, undeveloped points."],
];

// Rice market: Qd = d0 − 30P, Qs = 30P − 80 (thousand bags).
const sorghum = (d0) => {
  const price = (d0 + 80) / 60;
  const q = d0 - 30 * price;
  chk(q, 30 * price - 80, 1e-9);
  return { price, q };
};

concept("aecon.market.price-mechanism", { file: "market/price-mechanism", keyPrefix: "market.price-mechanism" }, (b) => {
  const mc = (o, correct, wrongs) => b.mcq({ ...o, options: [correct, ...wrongs], answer: "A" });

  mc({ d: 1, skill: "RECALL", stem: "When the price of a good rises because it has become scarcer, the price is acting as a",
    explanation: "A price rise carries information about scarcity and tells buyers and sellers how to respond: the signalling function." },
    ["signal", "Correct: it carries information about scarcity."],
    [["subsidy", "A subsidy is a payment by the government."], ["quota", "A quota is a quantity limit."], ["tax", "A tax is a payment to the government."]]);

  mc({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "How does the price mechanism ration a scarce good?",
    explanation: "A higher price discourages some buyers, so the quantity demanded falls to match the limited supply." },
    ["A higher price cuts quantity demanded to match supply", "Correct: price clears the market."],
    [["The government gives each household an equal share", "That is rationing by allocation, not by price."], ["Firms are ordered to produce more of the scarce good", "That is central direction."], ["Buyers queue until stock arrives", "Queues are a feature of price controls."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "A higher price of a good gives producers an incentive to",
    explanation: "A higher price means higher profit per unit, which encourages producers to supply more." },
    ["supply more of it", "Correct: profit rises."],
    [["supply less of it", "A higher price gives a reason to produce more."], ["stop selling it", "Higher profit encourages selling."], ["lower the price at once", "The price is set by the market."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "Which pair of goods is an example of joint demand?",
    explanation: "Joint demand is for goods used together (complements): cars and fuel." },
    ["Cars and fuel", "Correct: complements."],
    [["Butter and margarine", "These are substitutes (alternative demand)."], ["Beef and hides", "These are in joint supply."], ["Bricks and houses", "Bricks have a derived demand from houses."]]);

  mc({ d: 3, skill: "APPLICATION", hints: ["Which demand depends on the demand for something else?"],
    stem: "A boom in house building raises the demand for bricklayers. This is an example of",
    explanation: "Demand for bricklayers depends on demand for the final product, houses: derived demand." },
    ["derived demand", "Correct: demand arising from the demand for houses."],
    [["joint supply", "Joint supply concerns by-products."], ["alternative demand", "Alternative demand concerns substitutes."], ["price rationing", "Rationing concerns scarce goods, not linked demand."]]);

  mc({ d: 3, skill: "ANALYSIS", hints: ["Which direction does the supply of hides move?"],
    stem: "Demand for beef rises. Other things equal, what happens in the market for hides, which are in joint supply with beef?",
    explanation: "More cattle are slaughtered, so the supply of hides increases and the price of hides falls." },
    ["Supply of hides rises and their price falls", "Correct: beef and hides come from the same animals."],
    [["Supply of hides falls and their price rises", "More beef means more hides."], ["Demand for hides rises and their price rises", "The link is on the supply side."], ["There is no effect on the market for hides", "The markets are linked by joint supply."]]);

  mc({ d: 3, skill: "ANALYSIS", hints: ["Think of substitutes."],
    stem: "A poor harvest raises the price of maize meal. What is the most likely effect on the market for sorghum meal, a substitute?",
    explanation: "Consumers switch towards the substitute: demand for sorghum meal rises, raising its price and quantity." },
    ["Demand rises, so price and quantity rise", "Correct: alternative demand."],
    [["Demand falls, so price and quantity fall", "Substitutes move in the same direction as the price of the other good."], ["Supply rises, so price falls", "The initial change is on the demand side."], ["There is no effect, as the goods are different", "Substitutes are linked."]]);

  mc({ d: 4, skill: "EVALUATION", hints: ["Think about who is excluded."],
    stem: "A criticism of rationing by the price mechanism is that",
    explanation: "Price rationing favours those with more income; a poor household may be priced out of essential goods even if its need is greater." },
    ["people with low incomes may be unable to afford essential goods", "Correct: it ignores need and ability to pay."],
    [["it requires planners to know everyone's preferences", "The price mechanism works without planners."], ["it cannot respond to changes in scarcity", "Prices respond quickly."], ["it always leads to shortages", "Prices adjust to remove shortages."]]);

  {
    const s0 = sorghum(400);
    chk(s0.price, 8, 1e-9); chk(s0.q, 160, 1e-9);
    b.num({ d: 2, skill: "APPLICATION", daily: true, kind: "money", value: s0.price,
      stem: "The market for rice has Qd = 400 − 30P and Qs = 30P − 80 (P in US\\$ per bag, Q in thousand bags). Calculate the equilibrium price.",
      wrong: [160, 7, 9],
      explanation: `400 − 30P = 30P − 80, so 480 = 60P and P = US\\$${fmt(s0.price)}. Quantity = 160 thousand bags.` });
    const s1 = sorghum(436);
    chk(s1.price, 8.6, 1e-9); chk(s1.q, 178, 1e-9);
    b.num({ d: 3, skill: "APPLICATION", kind: "money", value: s1.price, hints: ["Replace 400 by 436 in the demand equation."],
      stem: "A shortage of maize meal makes households switch to rice, raising demand by 36 thousand bags at every price: Qd = 436 − 30P (Qs = 30P − 80). Calculate the new equilibrium price.",
      wrong: [8, 9, 178],
      explanation: `436 − 30P = 30P − 80, so 516 = 60P and P = US\\$${fmt(s1.price)}. Quantity = 178 thousand bags.` });
    const pcn = pctChange(s0.price, s1.price);
    b.num({ d: 3, skill: "APPLICATION", calculator: true, kind: "pct", value: pcn, dp: 1, unit: "%", hints: ["Original price is the base."],
      stem: "Calculate the percentage change in the price of rice when the equilibrium price rises from US\\$8.00 to US\\$8.60, to one decimal place.",
      wrong: [7.0, 0.6, 75],
      explanation: `(8.60 − 8.00) ÷ 8.00 × 100 = ${dpStr(pcn, 1)}%. Using 8.60 as the base gives 7.0%.` });
    const x = pctChange(160, 196) / pctChange(6, 7);
    b.num({ d: 4, skill: "ANALYSIS", calculator: true, kind: "elasticity", value: x, dp: 2, hints: ["At the old rice price of US\\$8, demand rises from 160 to 196.", "Maize meal's price rose from US\\$6 to US\\$7."],
      stem: "The price of maize meal rises from US\\$6 to US\\$7. At the old price of US\\$8 for rice, quantity demanded of rice rises from 160 to 196 thousand bags. Calculate the cross elasticity of demand of rice with respect to the price of maize meal.",
      wrong: [0.74, 1.5, 36],
      explanation: `% change in the price of maize meal = +16.67%; % change in quantity demanded of rice = +22.5%; XED = 22.5 ÷ 16.67 = ${dpStr(x, 2)}: strong substitutes.` });
    chk(x, 1.35, 1e-9);
  }

  b.tf({ d: 1, skill: "RECALL", stem: "In a market economy, prices help to allocate resources without central direction.", answer: true,
    explanation: "True. Changes in prices signal scarcity and give incentives to buyers and sellers." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "If demand for beef rises, the price of hides will rise because hides are in joint supply with beef.", answer: false,
    explanation: "False. Joint supply means more hides are supplied as more cattle are slaughtered, so the price of hides falls." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term with an example.",
    pairs: [["Joint demand", "Printers and ink cartridges"], ["Alternative demand", "Taxis and minibuses"], ["Derived demand", "Demand for steel from demand for cars"], ["Joint supply", "Beef and hides"]],
    explanation: "Complements are in joint demand; substitutes are in alternative demand; factors have derived demand; by-products are in joint supply." });

  b.short({ d: 2, skill: "RECALL", stem: "Name the function of prices in which a price rise reduces the quantity demanded so that it matches limited supply.",
    accepted: ["rationing", "the rationing function", "rationing function"], wrong: ["signalling"],
    explanation: "Rationing: price allocates scarce goods among buyers." });

  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Name the three functions and apply them."],
    stem: "Explain the three functions of the price mechanism.",
    points: ["Signalling: prices transmit information about scarcity and preferences.", "Rationing: a higher price reduces quantity demanded to match the limited supply.", "Incentives (rewarding): higher prices and profits encourage producers to supply more and workers to move to higher-paid uses."],
    modelAnswer: "Prices signal scarcity and consumer preferences to buyers and sellers. They ration scarce goods by reducing quantity demanded when the price is high. They also provide incentives: higher prices and profits reward producers and encourage them to supply more.",
    explanation: "One mark for each function explained." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4, hints: ["Follow the chain from the first market to the second."],
    stem: "Analyse how a rise in the price of petrol could affect the market for large cars.",
    points: ["Petrol and large cars are complements (joint demand).", "A higher petrol price raises the running cost of owning a large car.", "Demand for large cars shifts to the left.", "The equilibrium price and quantity of large cars fall."],
    modelAnswer: "Petrol and large cars are in joint demand. A higher price of petrol raises the running cost of owning a large car, so demand for large cars shifts to the left and both the price and the quantity bought fall.",
    explanation: "Complements, cost of use, shift, new equilibrium." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4, hints: ["Start with the demand shift."],
    stem: "Analyse how a rise in demand for new houses affects the market for bricklayers.",
    points: ["Demand for bricklayers is derived from the demand for houses.", "Rising demand for houses raises demand for bricklayers (the demand curve shifts to the right).", "The wage of bricklayers rises (excess demand for labour).", "More people are attracted into the trade, so the quantity employed rises."],
    modelAnswer: "The demand for bricklayers is derived from the demand for houses. When demand for houses rises, demand for bricklayers shifts to the right, which raises their wage. The higher wage gives an incentive for more people to train and work as bricklayers, so employment rises.",
    explanation: "Derived demand, wage signal, incentive." });

  {
    const pb = pctChange(5.0, 5.5), ph = pctChange(4.0, 3.6);
    chk(pb, 10, 1e-9); chk(ph, -10, 1e-9);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["Percentage change = change ÷ original × 100."],
      stem: "In a fictional country an increase in demand raises the price of beef from US\\$5.00 to US\\$5.50 per kg. Farmers rear and slaughter more cattle, and the supply of hides rises from 1,000 to 1,100 a week. The price of a hide falls from US\\$4.00 to US\\$3.60.",
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "pct", value: pb, dp: 0, unit: "%", stem: "Calculate the percentage change in the price of beef.", wrong: [9.1, 0.5], explanation: "(5.50 − 5.00) ÷ 5.00 × 100 = +10%." }),
        P.num({ label: "(b)", marks: 1, kind: "pct", value: ph, dp: 0, unit: "%", stem: "Calculate the percentage change in the price of a hide, including the sign.", wrong: [10, -11.1], explanation: "(3.60 − 4.00) ÷ 4.00 × 100 = −10%." }),
        P.mcq({ label: "(c)", marks: 1, stem: "Which term describes the link between beef and hides?", options: [["Joint supply", "Correct: both come from the same animals."], ["Joint demand", "Joint demand is for complements."], ["Derived demand", "Derived demand is for factors of production."], ["Alternative demand", "Alternative demand is for substitutes."]], answer: "A", explanation: "Hides are a by-product of beef production." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain why the price of hides falls when demand for beef rises.",
          points: ["The price of beef rises, so farmers supply more cattle for slaughter.", "Each animal slaughtered also produces a hide, so the supply of hides shifts to the right.", "Demand for hides is unchanged, so the price of hides falls."],
          modelAnswer: "Higher demand for beef raises its price, so more cattle are slaughtered. Each animal yields a hide, so the supply of hides increases and shifts to the right. With demand for hides unchanged, the price of hides falls." }),
        P.manual({ label: "(e)", marks: 2, stem: "Suggest the likely effect on makers of leather shoes and explain it.",
          points: ["Their cost of materials falls.", "Supply of leather shoes may rise (shift right), lowering the price of shoes."],
          modelAnswer: "Leather is a raw material for shoes. A lower price of hides reduces shoemakers' costs, so the supply of leather shoes may increase and their price may fall." }),
      ],
      explanation: "Joint supply: more beef production raises the supply of hides and lowers their price." });
  }
  {
    const pc = pctChange(20, 25);
    chk(pc, 25, 1e-9);
    b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, hints: ["Link the price rise to signals, incentives and linked markets."],
      stem: "In a fictional country demand for solar lights has risen sharply. The price of a light rose from US\\$20 to US\\$25 and shops reported shortages in some towns. Over the next year new firms began importing and assembling the lights, the quantity sold rose from 400 to 500 a week and demand for batteries and electrical workers increased.",
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "pct", value: pc, dp: 0, unit: "%", stem: "Calculate the percentage rise in the price of a solar light.", wrong: [20, 5], explanation: "(25 − 20) ÷ 20 × 100 = 25%." }),
        P.mcq({ label: "(b)", marks: 1, stem: "Which function of the price mechanism is shown by the price rise informing firms that consumers want more solar lights?", options: [["Signalling", "Correct: the price carries information about demand."], ["Rationing", "Rationing reduces quantity demanded to match supply."], ["Subsidising", "Not a function of the price mechanism."], ["Taxation", "Not a function of the price mechanism."]], answer: "A", explanation: "Signalling." }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain how the price rise acted as both a signal and an incentive.",
          points: ["The higher price signalled that demand exceeded supply (shortages).", "Higher prices meant higher profit per light.", "That gave firms an incentive to enter and supply more, raising the quantity to 500."],
          modelAnswer: "The rise in price signalled that consumers wanted more solar lights than were available. Because the higher price raised profit per light, firms had an incentive to import and assemble more, which raised quantity supplied from 400 to 500 a week." }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain why demand for batteries and electrical workers increased.",
          points: ["Derived demand: these are needed to make or install the lights.", "Higher output of lights raises demand for them."],
          modelAnswer: "Demand for batteries and electrical workers is derived from demand for solar lights. As output of lights rose, firms needed more of these inputs, so demand for them increased." }),
        P.manual({ label: "(e)", marks: 2, stem: "State **one** limitation of using the price mechanism to allocate solar lights.",
          points: ["Poorer households may be unable to afford the lights even if they need them most (or another valid limitation).", "Explanation: price rations by ability to pay, not need."],
          modelAnswer: "Price rations by ability to pay rather than need, so low-income households in remote areas, who might gain most from the lights, may be unable to afford them when the price is high." }),
      ],
      explanation: "Price +25%; signalling, incentives, derived demand and a limitation." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Weigh efficiency against fairness and market failure."],
    stem: "Evaluate the view that the price mechanism is the best way to allocate resources.",
    points: ["Prices signal scarcity and preferences quickly.", "Rationing without administrative cost.", "Incentives encourage efficiency and innovation.", "Decentralised: no planners need all information.", "Ignores those without income: essentials may be unaffordable.", "Does not account for external costs and benefits (pollution, education).", "Market power and imperfect information distort prices.", "A justified judgement: works well for many goods, but needs support for essentials and market failure."],
    levels: LV8,
    modelAnswer: "The price mechanism signals scarcity and preferences quickly, rations scarce goods without administrative cost and gives producers an incentive to supply what consumers want efficiently, without planners needing all information. However, it rations by ability to pay, so low-income households may be unable to afford essentials; it ignores external costs such as pollution and external benefits such as education; and it works poorly where firms have market power or information is imperfect. In practice economies mix markets with some government action. The price mechanism is therefore an effective way of allocating most goods, but it is not the best method for essentials, public goods or markets with failures.",
    wordLimit: { min: 100, max: 300 },
    explanation: "Strengths against limitations, with a judgement." });

  b.card("DEFINITION", "Define the **price mechanism**.", "The way changes in prices, arising from demand and supply, co-ordinate the decisions of consumers and producers and allocate resources.");
  b.card("CONCEPT", "What is the **signalling** function of prices?", "Prices carry information about scarcity and consumer preferences to buyers and sellers.");
  b.card("CONCEPT", "What is the **rationing** function of prices?", "A higher price reduces quantity demanded so that it matches the limited supply.");
  b.card("CONCEPT", "What is the **incentive** (rewarding) function of prices?", "Higher prices and profits encourage producers to supply more; higher wages draw workers to a use.");
  b.card("DEFINITION", "Define **derived demand**.", "Demand for a good or factor that arises from demand for something it helps to produce, for example bricks from houses.");
  b.card("DEFINITION", "Define **joint supply**.", "Production of one good necessarily produces another, for example beef and hides.");
  b.card("CONCEPT", "Give an example of **joint demand**.", "Complements bought together, such as cars and fuel or printers and ink.");
  b.card("CONCEPT", "What happens to a substitute's market when a good's price rises?", "Demand for the substitute rises, so its price and quantity rise.");
  b.card("CONCEPT", "Give **two** weaknesses of the price mechanism.", "It rations by ability to pay and ignores external costs and benefits (also market power and imperfect information).");
});
