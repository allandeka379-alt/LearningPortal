// W2b: the business cycle and economic change (Cambridge only).
import { concept, P, money, f, round, table } from "../lib.mjs";

const s0 = 85000, s1 = 61200;
const fallPct = ((s0 - s1) / s0) * 100; // 28
const iRev = 96000, iCost = 81000, iInfl = 8;
const iCost1 = round(iCost * (1 + iInfl / 100), 2); // 87480
const iProfit1 = round(f.profit(iRev, iCost1), 2); // 8520
// struct
const yrs = ["Year 1", "Year 2", "Year 3"];
const salesLux = [210000, 236000, 177000];
const salesBasic = [140000, 147000, 143500];
const luxFall = ((salesLux[1] - salesLux[2]) / salesLux[1]) * 100; // 25
const basicFall = ((salesBasic[1] - salesBasic[2]) / salesBasic[1]) * 100; // 2.38
const tab = table(["Sales revenue (US\\$)", ...yrs], [["Kitchen appliances", ...salesLux], ["Basic household goods", ...salesBasic]]);

concept("bus.economy.business-cycle", { file: "economy/business-cycle", keyPrefix: "economy.business-cycle" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which stage of the business cycle comes directly after a boom?",
    options: [
      ["Recession", "Correct: after the peak, economic activity starts to fall."],
      ["Growth", "Growth (recovery) leads up to a boom."],
      ["Slump", "A slump follows a deepening recession."],
      ["Recovery", "Recovery follows a slump."],
    ],
    answer: "A",
    explanation: "The cycle runs growth → boom → recession → slump → growth again.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What usually happens to unemployment during a recession?",
    options: [
      ["It rises", "Correct: falling demand leads businesses to cut jobs."],
      ["It falls", "Unemployment falls in growth and boom."],
      ["It stays exactly the same", "Employment changes with economic activity."],
      ["It disappears", "Some unemployment always exists."],
    ],
    answer: "A",
    explanation: "In a **recession** spending falls, so businesses produce less and cut jobs: **unemployment rises**.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which business is likely to be hit hardest by a recession?",
    options: [
      ["A car dealer selling new cars", "Correct: cars are luxuries whose purchase can be delayed."],
      ["A shop selling basic food", "Food is a necessity, so demand falls little."],
      ["A pharmacy selling essential medicines", "Medicines are necessities."],
      ["A shop selling second-hand clothes", "Cheaper alternatives may even gain customers."],
    ],
    answer: "A",
    explanation: "Sellers of **luxuries** and expensive durable goods suffer most, because customers delay these purchases when incomes fall.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which problem is most typical of a boom?",
    options: [
      ["Shortages of skilled workers and rising costs", "Correct: high demand pushes up wages and prices."],
      ["Falling demand for most products", "This happens in a recession."],
      ["Very high unemployment across most industries", "Unemployment is low in a boom."],
      ["Many businesses closing down", "Closures are typical of a slump."],
    ],
    answer: "A",
    explanation: "In a **boom** demand is high, so businesses compete for workers and materials: costs and wages rise (inflation).",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "How might rising unemployment help a business?",
    options: [
      ["It becomes easier to recruit workers at lower wage increases", "Correct: more people are looking for work."],
      ["Customers have more income to spend on the business's products", "Unemployment reduces incomes."],
      ["Demand for luxury goods increases", "Luxury demand falls when incomes fall."],
      ["The business's costs of materials rise", "This is a problem, not a help."],
    ],
    answer: "A",
    hints: ["Think about the labour market rather than customers."],
    explanation: "With more people seeking work, businesses can **recruit more easily** and face less pressure for wage rises, even though demand falls.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why does high inflation make business planning difficult?",
    options: [
      ["Costs and prices keep changing, so budgets quickly become wrong", "Correct: uncertainty about future costs and prices."],
      ["Banks stop lending to all businesses", "Lending continues, though often at higher interest."],
      ["Customers stop buying everything except basic food and fuel", "Spending changes but does not stop."],
      ["Inflation makes the business cycle disappear", "Inflation is part of the cycle, not a cure for it."],
    ],
    answer: "A",
    hints: ["What happens to the figures in a budget when prices rise every month?"],
    explanation: "When prices change rapidly, businesses cannot be sure of future costs or the prices they can charge, so budgets and price lists are soon out of date.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A manufacturer expects a recession next year. Which response is most sensible?",
    options: [
      ["Reduce stock levels and keep cash in reserve", "Correct: protecting cash helps a business survive falling sales."],
      ["Borrow heavily to build a larger factory", "Expanding just before demand falls is risky."],
      ["Raise prices sharply on all products", "Higher prices would lose even more customers when incomes fall."],
      ["Recruit many extra staff", "Extra staff increase costs when sales are falling."],
    ],
    answer: "A",
    explanation: "In a recession businesses **protect cash**: lower stock, chase debts, delay investment and control costs.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What is economic growth?",
    options: [
      ["An increase in a country's real GDP", "Correct: more goods and services are produced."],
      ["A rise in the general level of prices", "That is inflation."],
      ["An increase in the number of unemployed people", "That is rising unemployment."],
      ["A fall in interest rates", "That is a change in monetary policy."],
    ],
    answer: "A",
    explanation: "**Economic growth** is an increase in real GDP: the economy produces more goods and services.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A slump is a long and deep fall in economic activity with very high unemployment.",
    answer: true,
    explanation: "True. A slump is the most severe stage of the downturn.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Inflation always increases a business's profit because it can charge higher prices.",
    answer: false,
    explanation: "False. Costs rise too, and if customers' incomes do not keep up, sales fall. Profit often falls.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each stage of the business cycle with its description.",
    pairs: [
      ["Growth", "GDP starts rising and unemployment falls"],
      ["Boom", "Very high demand, rising prices and skills shortages"],
      ["Recession", "GDP falls and unemployment rises"],
      ["Slump", "A long, deep fall with very high unemployment"],
    ],
    explanation: "Growth → boom → recession → slump, then recovery.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "A sustained rise in the general level of prices is called {{blank:a}}. In a recession, demand falls most for {{blank:b}} goods.",
    blanks: [
      { id: "a", accepted: ["inflation"], choices: ["inflation", "deflation", "recession", "growth"] },
      { id: "b", accepted: ["luxury"], choices: ["luxury", "basic", "necessary", "cheap"] },
    ],
    explanation: "**Inflation** is rising prices; **luxury** goods suffer most in a recession.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: `During a recession, a hotel in Victoria Falls sees its monthly revenue fall from ${money(s0)} to ${money(s1)}. Calculate the percentage fall in revenue to one decimal place.`,
    kind: "pct", value: fallPct, wrong: [round(((s0 - s1) / s1) * 100, 1)],
    explanation: `Fall = ${money(s0 - s1)}; ${(s0 - s1).toLocaleString("en-GB")} ÷ ${s0.toLocaleString("en-GB")} × 100 = ${fallPct.toFixed(1)}%. Divide by the original figure.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A bus company has annual revenue of ${money(iRev)} and total costs of ${money(iCost)}. Inflation raises its total costs by ${iInfl}%, and it cannot raise fares. Calculate its new profit.`,
    kind: "money", value: iProfit1, wrong: [f.profit(iRev, iCost), round(f.profit(iRev, iCost) * (1 - iInfl / 100), 2)],
    hints: ["Find the new total costs first: costs + 8% of costs."],
    explanation: `New costs = ${money(iCost)} × 1.08 = ${money(iCost1)}; profit = ${money(iRev)} − ${money(iCost1)} = ${money(iProfit1)} (down from ${money(f.profit(iRev, iCost))}).`,
  });
  b.manualShort({
    d: 3, marks: 4, skill: "APPLICATION",
    stem: "Explain **two** ways a furniture manufacturer could respond to a recession.",
    points: [
      "Cut costs (reduce overtime, delay investment, negotiate with suppliers).",
      "So it can survive with lower sales / keep prices competitive.",
      "Offer cheaper ranges / find export markets / reduce stock / diversify.",
      "Explains how it protects sales or cash.",
    ],
    hints: ["Think about costs, products and markets."],
    modelAnswer: "It could cut costs, for example by stopping overtime and delaying the purchase of new machines, so it can survive while sales are low. It could also introduce a cheaper range of furniture, because customers with lower incomes still need basic beds and tables.",
    explanation: "Responses: cut costs, cheaper products, protect cash, new markets, diversify.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "ANALYSIS",
    stem: "Explain **two** effects of rising inflation on a business that exports goods.",
    points: [
      "Costs of materials and wages rise.",
      "Profit margins fall unless prices rise.",
      "Export prices rise relative to foreign competitors.",
      "So exports become less competitive and sales abroad may fall.",
    ],
    hints: ["Consider costs at home and prices abroad."],
    modelAnswer: "Inflation raises the cost of materials and wages, so unless the business raises its prices its profit margin falls. If it does raise prices, its exports become dearer than those of foreign competitors, so customers abroad may buy elsewhere.",
    explanation: "Inflation raises costs and reduces international competitiveness.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, secs: 960,
    stem: `HomeMart (a fictional business) is a retailer in Bulawayo with two departments. The economy grew in Year 2 but entered a recession in Year 3.\n\n${tab}`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the percentage fall in sales of kitchen appliances from Year 2 to Year 3, to one decimal place.", kind: "pct", value: luxFall, wrong: [round(((salesLux[1] - salesLux[2]) / salesLux[2]) * 100, 1)] }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the percentage fall in sales of basic household goods from Year 2 to Year 3, to one decimal place.", kind: "pct", value: basicFall, wrong: [round(((salesBasic[1] - salesBasic[2]) / salesBasic[2]) * 100, 1)] }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain why the two departments were affected differently by the recession.",
        points: [
          "Kitchen appliances are luxuries / durable goods whose purchase can be delayed.",
          "When incomes fall, customers postpone buying them, so sales fell sharply.",
          "Basic household goods are necessities.",
          "Customers still need them, so sales fell only slightly.",
        ],
        modelAnswer: `Kitchen appliances are expensive items that customers can put off buying, so when incomes fell in the recession their sales dropped by ${round(luxFall, 1)}%. Basic household goods are necessities that people need whatever their income, so their sales fell by only ${round(basicFall, 1)}%.`,
      }),
      P.manual({
        label: "(d)", marks: 6,
        stem: "HomeMart's manager suggests closing the kitchen appliances department until the recession ends. Do you agree? Justify your answer.",
        points: [
          "For: sales fell sharply; saves costs (staff, space, stock).",
          "Against: still sold a large amount in Year 3, more than basic goods.",
          "Against: recession is temporary; reopening later costs money and customers may go to rivals.",
          "Alternatives: cut stock, offer cheaper models or credit, use space for basic goods.",
          "Uses the data in the table.",
          "Justified decision.",
        ],
        modelAnswer: `Closing would save staff, space and stock costs in a department whose sales fell by ${round(luxFall, 1)}%. However, it still sold ${money(salesLux[2])} in Year 3, more than the basic goods department, and recessions do not last for ever. If HomeMart closes it, customers will go to rivals and may not return when the economy grows again. I do not agree: HomeMart should keep the department but cut its stock, offer cheaper models and payment plans, and give some space to basic goods, so it reduces costs while staying ready for the recovery.`,
      }),
    ],
    hints: ["(a)(b) Percentage fall = fall ÷ Year 2 sales × 100.", "(d) Look at the size of Year 3 sales, not only the fall."],
    explanation: `(a) ${luxFall.toFixed(1)}%. (b) ${basicFall.toFixed(1)}%. (c) Luxuries vs necessities. (d) A justified decision using the data.`,
    workedSolution: `1. Appliances: (${salesLux[1].toLocaleString("en-GB")} − ${salesLux[2].toLocaleString("en-GB")}) ÷ ${salesLux[1].toLocaleString("en-GB")} × 100 = ${luxFall.toFixed(1)}%.\n2. Basic goods: (${salesBasic[1].toLocaleString("en-GB")} − ${salesBasic[2].toLocaleString("en-GB")}) ÷ ${salesBasic[1].toLocaleString("en-GB")} × 100 = ${basicFall.toFixed(1)}%.`,
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "Zeta Builders (a fictional business) is a construction company in Harare. The economy is in a boom: demand for new houses is high, but the prices of cement and steel are rising quickly and skilled bricklayers are hard to find. The directors want to take on twice as many building contracts next year.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Explain **two** problems the boom may cause for Zeta Builders.",
        points: [
          "Rising material costs (cement, steel).",
          "Fixed-price contracts may become unprofitable.",
          "Shortage of skilled workers.",
          "Higher wages / delays in completing houses.",
        ],
        modelAnswer: "Cement and steel prices are rising, so if Zeta agrees fixed prices with customers now, its profit may disappear by the time it buys materials. Skilled bricklayers are scarce, so Zeta may have to pay much higher wages or face delays in finishing houses.",
      }),
      P.manual({
        label: "(b)", marks: 6,
        stem: "Should Zeta Builders double the number of contracts it takes on? Justify your answer.",
        points: [
          "For: high demand now; more revenue and profit; market share.",
          "Against: rising costs and skills shortages may cause losses and delays.",
          "Against: a boom is followed by recession; overexpanding leaves the business with excess capacity and debts.",
          "Possible approach: moderate expansion; contracts with price-adjustment clauses; train workers.",
          "Considers the business cycle stage explicitly.",
          "Justified decision.",
        ],
        modelAnswer: "The boom gives Zeta a chance to earn more revenue and win market share while demand is high. But rising material costs and the shortage of bricklayers mean that doubling its contracts could lead to late, costly projects and losses on fixed-price contracts. A boom is also followed by a recession, when Zeta could be left with too many workers, machines and debts. Zeta should expand more modestly, perhaps by a quarter, include clauses that let prices rise with material costs, and train its own bricklayers, so it gains from the boom without being exposed when it ends.",
      }),
    ],
    hints: ["(b) What follows a boom in the business cycle?"],
    explanation: "A boom brings high demand but rising costs and shortages; expansion must allow for the coming downturn.",
  });
  b.card("FACT", "Four stages of the business cycle?", "Growth (recovery), boom, recession, slump.");
  b.card("DEFINITION", "What is a **recession**?", "A period when GDP falls, incomes and spending fall and unemployment rises.");
  b.card("CONCEPT", "Effects of a boom on business?", "High sales and profit, but rising costs and wages, skills shortages and stretched capacity.");
  b.card("CONCEPT", "How do businesses respond to a recession?", "Cut costs, cheaper products, protect cash (less stock, chase debts), new markets, diversify.");
  b.card("DEFINITION", "What is **inflation**?", "A sustained rise in the general level of prices, reducing the purchasing power of money.");
  b.card("CONCEPT", "Effects of inflation on business?", "Higher costs, harder planning, falling real incomes of customers, less competitive exports.");
  b.card("CONCEPT", "Effects of rising unemployment on business?", "Lower demand (especially luxuries) but easier recruitment and smaller wage rises.");
  b.card("CONCEPT", "Which firms suffer most in a recession?", "Sellers of luxuries and expensive durable goods (cars, furniture, holidays).");
  b.card("DEFINITION", "What is **economic growth**?", "An increase in a country's real GDP (total output of goods and services).");
});
