// Slice W3b: farm choices, opportunity cost, demand, supply and price.
import { concept, P, round, check, table, agricultureLevels } from "../lib.mjs";

// Num: opportunity cost of choosing layers.
const GMS = { broilers: 1240, layers: 980, vegetables: 1110 };
const ocLayers = Math.max(GMS.broilers, GMS.vegetables);
check(ocLayers === 1240, "oc");
// Num: shortage of cabbages.
const shortage = 8400 - 5100;
check(shortage === 3300, "shortage");
// Structured: egg tray schedule.
const PR = [3, 3.5, 4, 4.5, 5], QD = [640, 560, 480, 400, 320], QS = [280, 380, 480, 580, 680];
const eqI = PR.findIndex((_, i) => QD[i] === QS[i]);
check(eqI === 2 && PR[eqI] === 4, "eq");
const surplus5 = QS[4] - QD[4];
const short3 = QD[0] - QS[0];
check(surplus5 === 360 && short3 === 360, "surplus");
const E_TABLE = table(["Price per tray (US\\$)", "Trays demanded per week", "Trays supplied per week"], PR.map((p, i) => [p.toFixed(2), QD[i], QS[i]]));
// Structured 8: one hectare, three options.
const OPT = [["Maize", 620], ["Groundnuts", 840], ["Sunflower", 510]];
const O_TABLE = table(["Crop", "Expected gross margin per ha (US\\$)"], OPT);
const ocMaize = Math.max(840, 510);
check(ocMaize === 840, "ocMaize");

concept("agri.business.economic-principles", { file: "business/economic-principles", keyPrefix: "business.economic-principles" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is meant by **opportunity cost**?",
    options: [
      ["The value of the next best alternative given up", "Correct."],
      ["The total cost of all the inputs a farmer buys", "That is total cost, not opportunity cost."],
      ["The price a farmer pays for land", "That is the price of land."],
      ["The sum of every alternative the farmer could choose", "Only the single best alternative counts."],
    ],
    answer: "A",
    explanation: "Opportunity cost is the value of the next best alternative forgone when a choice is made.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "According to the law of demand, what happens to the quantity demanded when the price of a product rises (other things equal)?",
    options: [
      ["It falls", "Correct."],
      ["It rises", "This is the direction for supply."],
      ["It stays the same", "Quantity demanded responds to price."],
      ["It doubles", "No fixed amount is stated by the law."],
    ],
    answer: "A",
    explanation: "Higher price, lower quantity demanded.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "On a graph with price on the vertical axis, how does a normal **supply** curve slope?",
    options: [
      ["Upwards from left to right", "Correct: more is supplied at higher prices."],
      ["Downwards from left to right", "This is the demand curve."],
      ["It is a flat horizontal line", "That would mean any quantity at one price."],
      ["It is an upright vertical line", "That would mean the same quantity at any price."],
    ],
    answer: "A",
    explanation: "The law of supply: higher price, greater quantity supplied, so the curve slopes upwards.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the **equilibrium price** in a market?",
    options: [
      ["The price at which quantity demanded equals quantity supplied", "Correct."],
      ["The highest price any buyer is willing to pay", "This is not the market-clearing price."],
      ["The price fixed by adding a profit to the farmer's costs of production", "Market price is set by supply and demand."],
      ["The lowest price at which any seller will sell", "This is not the market-clearing price."],
    ],
    answer: "A",
    explanation: "At equilibrium the market clears: there is no surplus or shortage.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", daily: true,
    stem: "A severe drought greatly reduces the maize harvest, while demand for maize meal stays the same. What is likely to happen to the price of maize?",
    options: [
      ["It rises, because supply falls", "Correct: a shortage pushes the price up."],
      ["It falls, because demand falls", "Demand has not changed."],
      ["It falls, because supply falls", "Lower supply raises price."],
      ["It stays the same, as demand is unchanged", "The change in supply moves the price."],
    ],
    answer: "A",
    hints: ["Which curve has changed?"],
    explanation: "Lower supply at an unchanged demand creates a shortage at the old price, so the price rises.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which change would most likely **increase the demand** for beef in a town?",
    options: [
      ["A rise in the incomes of the town's people", "Correct: richer buyers buy more meat."],
      ["A rise in the price of beef", "This lowers quantity demanded."],
      ["A fall in the price of chicken", "Chicken is a substitute, so beef demand falls."],
      ["Many cattle farmers selling their steers at the same time", "This raises supply, not demand."],
    ],
    answer: "A",
    hints: ["Demand shifts when something other than beef's own price changes."],
    explanation: "Income is a determinant of demand; a cheaper substitute (chicken) would reduce beef demand.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "A farmer in a dry area with low, unreliable rainfall grows sorghum and keeps goats instead of growing maize. Which group of factors mainly influenced this choice?",
    options: [
      ["Natural factors", "Correct: rainfall limits what will grow."],
      ["Social factors", "Food preferences would favour maize, not sorghum."],
      ["Government factors", "No policy is mentioned."],
      ["Transport factors", "Transport is not the issue described."],
    ],
    answer: "A",
    hints: ["What is described about the area?"],
    explanation: "Climate and soil (natural factors) limit the crops and livestock that can succeed.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A buyer fixes the price of a crop well **above** the equilibrium price. What is the most likely result?",
    options: [
      ["A surplus of the crop that cannot be sold at that price", "Correct: supply rises and demand falls."],
      ["A shortage, with buyers queuing for the crop", "This happens when price is below equilibrium."],
      ["No change in the quantity supplied or demanded", "Both respond to price."],
      ["Farmers producing less because the price is higher", "Higher prices encourage more production."],
    ],
    answer: "A",
    hints: ["Compare quantity supplied and demanded at the high price."],
    explanation: "Above equilibrium, quantity supplied exceeds quantity demanded, leaving a surplus.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why does the market price of tomatoes usually change more sharply during the year than the price of maize grain?",
    options: [
      ["Tomatoes are perishable and cannot be stored long", "Correct: sellers must sell quickly when supply is high."],
      ["Tomatoes are needed by far fewer people than maize is", "This does not explain sharp changes."],
      ["Maize prices are always fixed by law", "This is not generally true."],
      ["Tomatoes take longer to grow than maize", "Tomatoes are a shorter crop."],
    ],
    answer: "A",
    hints: ["What can a grain farmer do that a tomato grower cannot?"],
    explanation: "Grain can be stored and sold later, smoothing supply; perishable tomatoes flood the market at harvest, so prices swing.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The opportunity cost of a choice is the total value of all the alternatives that were not chosen.",
    answer: false,
    explanation: "False. It is the value of the single next best alternative given up.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Classify each factor that influences a farmer's choice of enterprise.",
    pairs: ["Low, unreliable rainfall", "Little capital or credit available", "Family's preference for maize meal", "A government input support scheme", "Distance to the nearest market"],
    right: ["Natural", "Economic", "Social", "Government"],
    rightIndex: [0, 1, 2, 3, 1],
    explanation: "Natural (climate, soil), economic (capital, markets, prices), social (food habits, skills), government (policy, support).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the law of supply.",
    template: "Other things being equal, the higher the price of a product, the {{blank:a}} the quantity supplied.",
    blanks: [{ id: "a", accepted: ["greater", "higher", "larger", "bigger", "more"] }],
    explanation: "Higher price, greater quantity supplied.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What is the name of the price at which the quantity demanded equals the quantity supplied?",
    accepted: ["equilibrium price", "the equilibrium price", "equilibrium", "market-clearing price", "market clearing price"],
    keywords: { any: ["equilibrium", "clearing"] },
    explanation: "The **equilibrium price**.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "At a price of US\\$0.50 per kg, buyers want 8,400 kg of cabbages a week but sellers offer only 5,100 kg. Calculate the shortage, in kg.",
    value: shortage, unit: "kg", tol: 0, wrong: [8400 + 5100, 5100],
    explanation: `Shortage = quantity demanded − quantity supplied = 8,400 − 5,100 = ${shortage.toLocaleString("en-GB")} kg. The price will tend to rise.`,
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "A farmer can use his poultry house for broilers (expected gross margin US\\$1,240 a year), layers (US\\$980) or rearing vegetable seedlings (US\\$1,110). He chooses layers. What is the opportunity cost of his choice, in US dollars?",
    value: ocLayers, prefix: "US$", wrong: [GMS.broilers + GMS.vegetables, GMS.vegetables],
    hints: ["Which is the best alternative he gave up?"],
    explanation: `The best alternative given up is broilers, worth US\\$${ocLayers.toLocaleString("en-GB")}. Adding both alternatives (US\\$2,350) is wrong because he could only have chosen one of them.`,
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why the quantity of a farm product demanded falls when its price rises.",
    hints: ["Think about buyers' budgets and other products."],
    points: [
      "At a higher price buyers can afford less with the same income.",
      "Some buyers switch to cheaper substitutes (e.g. rice or potatoes for maize meal).",
      "Some buyers stop buying altogether / buy only what they need most.",
    ],
    modelAnswer: "When the price rises, buyers' money buys less, so they buy smaller amounts; some switch to cheaper substitutes, and some stop buying the product at all, so the total quantity demanded falls.",
    explanation: "Income effect, substitutes, buyers leaving the market.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Name **four** opportunities in the agriculture industry other than growing crops or keeping livestock.",
    points: [
      "Supplying inputs (seed, fertiliser, feed, chemicals, equipment).",
      "Processing and value addition (milling, oil pressing, dairy products, abattoirs).",
      "Marketing, transport, storage or export of produce.",
      "Services: extension, veterinary work, research, teaching, finance and insurance, machinery hire, agro-tourism.",
    ],
    modelAnswer: "Selling seed and fertiliser; milling maize or pressing sunflower oil; transporting and marketing produce; working as an extension or veterinary officer.",
    explanation: "Agriculture includes input supply, processing, marketing and services.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 12,
    stem: `The table shows a weekly demand and supply schedule for trays of eggs in a small town near Bulawayo (example figures).\n\n${E_TABLE}`,
    hints: ["Equilibrium: quantity demanded = quantity supplied.", "Surplus = supplied − demanded."],
    parts: [
      P.num({
        label: "(a)", marks: 1, stem: "State the equilibrium price per tray, in US dollars.",
        value: PR[eqI], prefix: "US$", answer: "4.00", wrong: [3.5, 4.5],
        explanation: `At US\\$4.00, demand = supply = ${QD[eqI]} trays.`,
      }),
      P.num({
        label: "(b)", marks: 1, stem: "How many trays are sold each week at the equilibrium price?",
        value: QD[eqI], tol: 0, wrong: [QD[eqI] * 2, 400],
        explanation: `${QD[eqI]} trays.`,
      }),
      P.num({
        label: "(c)", marks: 2, stem: "Calculate the surplus of trays at a price of US\\$5.00.",
        value: surplus5, tol: 0, wrong: [QS[4], QS[4] + QD[4]],
        explanation: `Supplied 680 − demanded 320 = ${surplus5} trays.`,
      }),
      P.mcq({
        label: "(d)", stem: "At a price of US\\$3.00, what will happen in the market?",
        options: [
          ["A shortage will push the price up", "Correct: 640 demanded, 280 supplied."],
          ["A surplus will push the price down", "There is a shortage at US\\$3.00."],
          ["The market is already in equilibrium", "Equilibrium is at US\\$4.00."],
          ["Producers will supply more than buyers want", "They supply less (280 against 640)."],
        ],
        answer: "A",
        explanation: `At US\\$3.00 there is a shortage of ${short3} trays; buyers compete and the price rises.`,
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Describe the shape of the demand curve that would be drawn from this schedule, and explain it.",
        points: ["It slopes downwards from left to right (price on the vertical axis).", "Because fewer trays are demanded at higher prices (law of demand)."],
        explanation: "Downward-sloping demand.",
      }),
      P.manual({
        label: "(f)", marks: 3, stem: "A disease outbreak kills many laying hens in the area. Explain the likely effect on the supply, the price and the quantity of eggs sold.",
        points: ["Supply falls: fewer trays are offered at every price (the supply curve shifts left).", "At the old price there is a shortage, so the price rises.", "Fewer trays are sold than before (at a higher price)."],
        explanation: "Supply shift, price and quantity.",
      }),
      P.manual({
        label: "(g)", marks: 2, stem: "Suggest **two** factors, other than price, that could increase the demand for eggs in the town.",
        points: ["Rise in people's incomes / growth in population.", "Rise in the price of substitutes such as meat or beans / health campaigns promoting eggs / schools or hotels opening."],
        explanation: "Determinants of demand.",
      }),
    ],
    explanation: "Interpret a demand and supply schedule and explain how a change in supply affects price.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, marks: 8,
    stem: `Tendai has one hectare of land, enough money for one crop and limited labour. His expected gross margins (assume these figures) are shown.\n\n${O_TABLE}`,
    hints: ["Opportunity cost = the best alternative given up."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Tendai decides to grow maize. Calculate the opportunity cost of this decision, in US dollars.",
        value: ocMaize, prefix: "US$", wrong: [840 + 510, 510],
        explanation: "The best alternative given up is groundnuts: US\\$840.",
      }),
      P.manual({
        label: "(b)", marks: 6, stem: "Discuss whether Tendai is right to grow maize rather than groundnuts.",
        points: [
          "On money alone, groundnuts earn US\\$220 more than maize, so maize has a high opportunity cost.",
          "Maize is the family's staple, so growing it saves buying food (maize meal) at high prices.",
          "Groundnuts need more labour (lifting, drying, shelling) and costly seed, which he may not have.",
          "Groundnuts would add nitrogen to the soil and could be rotated with maize next season.",
          "Market and risk: maize has a ready market and may be less risky locally; groundnut prices may vary.",
          "Judgement: either choice can be justified; a reasoned conclusion weighing food security, labour and income (e.g. maize this year, groundnuts in rotation next year).",
        ],
        levels: agricultureLevels(6),
        explanation: "Weigh opportunity cost against food needs, labour, rotation and risk.",
      }),
    ],
    explanation: "Calculate an opportunity cost and evaluate a farmer's enterprise choice.",
  });

  b.card("DEFINITION", "Opportunity cost", "Value of the next best alternative given up when a choice is made.");
  b.card("DEFINITION", "Law of demand", "Other things equal, the higher the price, the lower the quantity demanded; demand curve slopes down.");
  b.card("DEFINITION", "Law of supply", "Other things equal, the higher the price, the greater the quantity supplied; supply curve slopes up.");
  b.card("DEFINITION", "Equilibrium price", "Price at which quantity demanded equals quantity supplied; the market clears.");
  b.card("CONCEPT", "Surplus and shortage", "Above equilibrium: surplus (supplied > demanded), price falls. Below: shortage, price rises.");
  b.card("CONCEPT", "What shifts demand?", "Income, population, tastes, prices of substitutes and complements, season and festivals.");
  b.card("CONCEPT", "What shifts supply?", "Weather and season, harvest size, pests and diseases, input costs, technology, number of producers, imports, policy.");
  b.card("CONCEPT", "Factors in a farmer's choice of enterprise", "Natural (climate, soil, water), economic (capital, prices, markets, labour), social, government, risk.");
  b.card("FACT", "Why do tomato prices swing more than grain prices?", "Tomatoes are perishable and cannot be stored, so harvest gluts and off-season shortages move the price.");
});
