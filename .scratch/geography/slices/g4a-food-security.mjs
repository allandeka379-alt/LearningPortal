// Slice G4a: food security and increasing food supply (ZIMSEC 7.9.5; Cambridge 10.3.1-10.3.4, 10.3.6).
import { concept, P, ZIM, CAM, geographyLevels } from "../lib.mjs";

concept("geo.food.food-security", { file: "food/food-security", keyPrefix: "food.food-security" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is the best definition of **food security**?",
    options: [
      ["All people at all times can obtain enough safe, nutritious food", "Correct: it covers availability, access and nutrition at all times."],
      ["A country grows all of its own food without imports", "That is food self-sufficiency; imports can also provide food security."],
      ["Food is kept in locked stores to prevent theft", "This is about physical security of stores, not food security."],
      ["Farmers receive guaranteed prices for their crops", "Guaranteed prices may help, but they are not the definition."],
    ],
    answer: "A",
    explanation: "Food security means reliable access for everyone to enough safe, nutritious food.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is a **human** factor that reduces food supply?",
    options: [
      ["Civil war", "Correct: conflict is caused by people and disrupts farming and trade."],
      ["Drought", "Drought is a natural factor."],
      ["A locust swarm", "Pests are a natural factor."],
      ["A tropical cyclone", "Cyclones are a natural hazard."],
    ],
    answer: "A",
    explanation: "Human factors include conflict, poverty, population growth, degradation and poor infrastructure.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is a **disadvantage** of long-term free food aid?",
    options: [
      ["It can lower the prices local farmers receive for their crops", "Correct: free food reduces demand for locally grown food."],
      ["It saves lives during a sudden emergency", "This is an advantage."],
      ["It stops families selling their cattle to buy food", "This is an advantage."],
      ["It can pay workers to build dams through food-for-work", "This is an advantage."],
    ],
    answer: "A",
    explanation: "Food aid can create dependency and undercut local farmers.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", applies: ZIM,
    stem: "Why are sorghum and millet recommended for small-scale farmers in natural regions IV and V?",
    options: [
      ["They tolerate drought better than maize", "Correct: small grains survive dry spells in low-rainfall regions."],
      ["They need more water than maize", "They need less water, which is why they suit dry regions."],
      ["They can only be grown with irrigation", "They are grown mainly under rain-fed conditions."],
      ["They are the main export crops of Zimbabwe", "Tobacco and minerals are far more important exports."],
    ],
    answer: "A",
    explanation: "Small grains improve food security in dry regions.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which deficiency disease is caused mainly by a lack of **protein**?",
    options: [
      ["Kwashiorkor", "Correct: kwashiorkor results from too little protein."],
      ["Marasmus", "Marasmus results from a severe lack of energy (calories) overall."],
      ["Anaemia", "Anaemia is often caused by lack of iron."],
      ["Obesity", "Obesity results from too much energy intake."],
    ],
    answer: "A",
    explanation: "Kwashiorkor is linked to protein deficiency, marasmus to energy deficiency.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Which strategy works whatever the rainfall?"],
    stem: "A dry district has fertile soils but rainfall is low and unreliable. Which strategy would most directly increase food supply?",
    options: [
      ["An irrigation scheme fed by a nearby dam", "Correct: irrigation removes dependence on unreliable rain."],
      ["Importing more tractors for ploughing", "Tractors help prepare land but do not supply water."],
      ["Growing more tobacco for export", "Tobacco is a cash crop and uses land that could grow food."],
      ["Increasing the number of cattle on the land", "More cattle may cause overgrazing in a dry area."],
    ],
    answer: "A",
    explanation: "Where water is the limiting factor, irrigation is the most direct solution.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", applies: CAM,
    hints: ["Food insecurity looks different in richer countries."],
    stem: "Which problem of food insecurity is most typical of a **high-income** country?",
    options: [
      ["Low-income families relying on food banks and cheap processed food", "Correct: food poverty in HICs often leads to poor diets and obesity."],
      ["Widespread famine with thousands of deaths in rural areas", "Famine is now very rare in HICs."],
      ["Most children suffering from kwashiorkor", "Kwashiorkor is mainly found in LICs."],
      ["Farmers abandoning their land and fleeing because of civil war", "This is typical of LICs affected by conflict."],
    ],
    answer: "A",
    explanation: "In HICs food insecurity mainly takes the form of food poverty and unhealthy diets.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    hints: ["When does food aid work best?"],
    stem: "Which approach is most likely to improve food security in the **long term** after a drought?",
    options: [
      ["Emergency food aid followed by irrigation, better seed and storage", "Correct: relief saves lives, and development tackles the causes."],
      ["Free imported food every year, without other changes", "This can cause dependency and lower local prices."],
      ["Waiting for the next good rainy season without help", "This leaves people hungry and repeats the problem."],
      ["Banning the sale of grain to local traders", "This would block markets and reduce access to food."],
    ],
    answer: "A",
    explanation: "Combining short-term relief with long-term development is the most effective approach.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Cyclone Idai in March 2019 destroyed crops and food stores in Chimanimani and Chipinge districts.",
    answer: true,
    explanation: "True. Floods and landslides destroyed homes, crops, livestock and stored food.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A country that grows enough food in total is certain to have no hungry people.",
    answer: false,
    explanation: "False. Poor households may lack the money, markets or roads to obtain food even when national supply is enough.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each strategy with how it increases food supply.",
    pairs: [
      ["Irrigation", "Supplies water in dry seasons and dry regions"],
      ["High-yielding varieties", "Produce more grain per hectare"],
      ["Conservation agriculture", "Keeps moisture and soil in the field with mulch and basins"],
      ["Better grain storage", "Reduces losses to pests and rot after harvest"],
    ],
    explanation: "Each strategy tackles a different limit on food supply.",
  });
  b.fib({
    d: 2, skill: "RECALL", applies: ZIM,
    stem: "Choose the correct word for each gap.",
    template: "Small-scale farmers sell surplus grain to the {{blank:a}}, which keeps the strategic grain reserve. The conservation agriculture programme that uses planting basins and mulch is called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Grain Marketing Board"], choices: ["Grain Marketing Board", "Zimbabwe Tourism Authority", "National Social Security Authority", "Reserve Bank"] },
      { id: "b", accepted: ["Pfumvudza"], choices: ["Pfumvudza", "CAMPFIRE", "ESAP", "KAZA"] },
    ],
    explanation: "The GMB buys and stores grain; Pfumvudza/Intwasa promotes conservation agriculture.",
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "A fictional household of 6 people needs 1 kg of maize meal per person every 4 days (fictional data). How many kilograms does it need in a 30-day month?",
    value: 45,
    tol: 0,
    unit: undefined,
    wrong: [180, 7.5],
    explanation: "Per person: 30 ÷ 4 = 7.5 kg; for 6 people 7.5 × 6 = 45 kg.",
  });
  b.calc({
    d: 3, skill: "APPLICATION", unit: "%",
    hints: ["Find the fall in yield.", "Divide by the normal yield."],
    stem: "A fictional small-scale farmer usually harvests 1.6 tonnes of maize per hectare. In a drought year she harvests 0.4 tonnes per hectare (fictional data). Calculate the percentage fall in yield.",
    value: 75,
    tol: 0.05,
    wrong: [25, 300],
    workedSolution: "1. Fall = 1.6 − 0.4 = 1.2 t/ha.\n2. 1.2 ÷ 1.6 × 100 = 75%.",
    explanation: "1.2 ÷ 1.6 × 100 = 75%.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the UN agency that provides food assistance in emergencies.",
    accepted: ["World Food Programme", "WFP", "the World Food Programme", "World Food Program", "UN World Food Programme"],
    wrong: ["WHO"],
    explanation: "The World Food Programme (WFP) is the UN's food-assistance agency.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4, applies: ZIM,
    stem: "Outline the contribution of small-scale farmers to food security in Zimbabwe.",
    points: [
      "Grow food (maize, small grains, groundnuts, vegetables) and keep livestock for their own households.",
      "Sell surplus grain to the GMB and local markets, feeding towns and the strategic grain reserve.",
      "Grow drought-tolerant small grains in natural regions IV and V, reducing the risk of hunger.",
      "Use conservation agriculture (Pfumvudza) / earn income from cash crops such as cotton and tobacco to buy food.",
    ],
    modelAnswer: "Small-scale farmers feed their own families with maize, small grains, groundnuts and livestock. In good years they sell surplus grain to the GMB, which supplies towns and the grain reserve. In the dry regions they grow sorghum and millet that survive drought, and many use Pfumvudza basins to keep moisture in the soil.",
    explanation: "Each point should link the farmers' activity to food.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4, applies: CAM,
    hints: ["Think about health, education and the economy."],
    stem: "Describe the problems caused by food insecurity in low-income countries.",
    points: [
      "Undernutrition and deficiency diseases (kwashiorkor, marasmus, anaemia).",
      "Stunted growth and poor learning in children.",
      "Weak immunity, more illness and higher child mortality.",
      "Adults too weak to work, so production falls / families sell assets / migration or conflict.",
    ],
    modelAnswer: "Hungry people suffer undernutrition and diseases such as kwashiorkor. Children's growth is stunted and they learn less at school. Weak immune systems mean more illness and child deaths, and weak adults produce less, so the family becomes poorer and may sell livestock or migrate.",
    explanation: "Describe effects on health, education and livelihoods.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 600, applies: ZIM,
    stem: "Table 1 shows maize production by small-scale farmers in a fictional district over four seasons (fictional data).\n\n| Season | Rainfall (mm) | Maize produced (tonnes) |\n|---|---|---|\n| 1 | 720 | 9,600 |\n| 2 | 410 | 3,200 |\n| 3 | 650 | 8,100 |\n| 4 | 580 | 6,700 |\n\nThe district has 52,000 people. Each person needs about 0.12 tonnes of maize a year (fictional guide value).",
    hints: ["Multiply people by need per person.", "Compare need with production each season."],
    parts: [
      P.num({ label: "(a)", stem: "Calculate the district's total maize need for a year (tonnes).", value: 6240, wrong: [624, 62400], explanation: "52,000 × 0.12 = 6,240 tonnes." }),
      P.mcq({
        label: "(b)", stem: "In which season did production fall **below** the district's need?",
        options: [
          ["Season 2", "Correct: 3,200 t is far below the 6,240 t needed."],
          ["Season 1", "9,600 t exceeds the need."],
          ["Season 3", "8,100 t exceeds the need."],
          ["Season 4", "6,700 t is slightly above the need."],
        ],
        answer: "A", explanation: "Only season 2, the driest, produced less than the need.",
      }),
      P.num({ label: "(c)", stem: "Calculate the shortfall in Season 2 (tonnes).", value: 3040, wrong: [3200, 9440], explanation: "6,240 − 3,200 = 3,040 tonnes." }),
      P.manual({
        label: "(d)", marks: 3, stem: "Suggest **three** ways the district could reduce the risk of such shortfalls.",
        points: ["Grow drought-tolerant small grains (sorghum, millet).", "Develop small irrigation schemes or water harvesting / conservation agriculture (Pfumvudza basins, mulch).", "Store surplus grain from good years / improve roads and markets / input support."],
        modelAnswer: "Farmers could grow more sorghum and millet, use Pfumvudza basins and small irrigation schemes to save water, and store surplus grain from good seasons for dry years.",
        explanation: "Link each measure to drought risk.",
      }),
    ],
    explanation: "This item practises using data to assess food security.",
  });
  b.struct({
    d: 3, skill: "EVALUATION", secs: 480, applies: CAM,
    stem: "After a severe drought, three responses are proposed for a fictional LIC:\n\n- **Response 1:** shipping free grain from an HIC donor for the next five years.\n- **Response 2:** cash transfers so families can buy food from local traders for one season.\n- **Response 3:** food-for-work projects building small dams and terraces.",
    hints: ["Think about dependency, local markets and long-term benefits."],
    parts: [
      P.mcq({
        label: "(a)", stem: "Which response is most likely to create dependency and lower local farm prices?",
        options: [
          ["Response 1", "Correct: years of free imported grain undercut local farmers."],
          ["Response 2", "Cash spent with local traders supports local markets."],
          ["Response 3", "Food-for-work builds assets for the future."],
          ["Responses 2 and 3 equally", "Neither involves long-term free imports."],
        ],
        answer: "A", explanation: "Long-term free imports can depress local prices and discourage farming.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Evaluate Responses 2 and 3 as ways of improving food security.",
        points: ["Response 2 lets families buy food quickly and supports local traders and farmers.", "But it needs food to be available locally; prices may rise; it is short term.", "Response 3 feeds people now and builds dams and terraces that raise future production.", "But it is slow to organise and excludes people too weak to work; judgement that combining them is best."],
        modelAnswer: "Cash transfers let families buy food immediately and keep local traders in business, but only work if food is available locally and prices do not soar. Food-for-work feeds people while building dams and terraces that improve future harvests, but it takes time to organise and cannot help the sick or elderly. Using both together would give short-term relief and long-term benefit.",
        explanation: "Evaluate strengths and weaknesses, then judge.",
      }),
    ],
    explanation: "This item practises evaluating food aid and other responses.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 7, applies: CAM,
    hints: ["Use a detailed specific example of a named country.", "Cover causes, effects and responses, then judge success."],
    stem: "For a named country or area, describe the causes of food insecurity and evaluate the strategies used to improve food supply.",
    points: [
      "Names a country (e.g. Zimbabwe) and its reliance on rain-fed maize farming.",
      "Natural causes: droughts (e.g. 1991-92, 2015-16, 2023-24 El Niño), Cyclone Idai 2019, pests.",
      "Human causes: economic instability and input prices, land degradation, poor storage and roads, labour migration.",
      "Effects: poor harvests, high prices, reduced meals, child undernutrition, food aid needed.",
      "Strategy evaluated: conservation agriculture (Pfumvudza) and small grains; helpful in dry years but labour-intensive.",
      "Strategy evaluated: irrigation and input support; effective but costly; GMB reserves and WFP aid save lives but are short term.",
      "Judgement on overall success with reason.",
    ],
    levels: geographyLevels(7),
    modelAnswer: "In Zimbabwe most rural households grow rain-fed maize, so food supply depends heavily on rainfall. Severe droughts such as 1991-92 and the El Niño droughts of 2015-16 and 2023-24 caused harvests to fail, and Cyclone Idai in 2019 destroyed crops and food stores in Chimanimani and Chipinge. Human factors make this worse: economic instability raises the price of seed and fertiliser, land degradation lowers yields, and poor roads and storage cause losses. In bad years households cut meals, child undernutrition rises and many depend on food aid. The government has promoted conservation agriculture through Pfumvudza, which conserves moisture and has raised yields for many farmers, though it requires a lot of labour. Small grains reduce the risk of crop failure in regions IV and V. Irrigation rehabilitation and input support raise output but are expensive and reach only some farmers. Grain from GMB reserves and WFP food assistance save lives during droughts but do not tackle the causes. Overall these strategies have reduced the impact of drought, but food security remains fragile because most farming still depends on rain.",
    explanation: "A detailed specific example with causes, strategies and a judgement.",
  });

  b.card("DEFINITION", "Food security", "When all people, at all times, can obtain enough safe and nutritious food for an active and healthy life.");
  b.card("DEFINITION", "Famine", "A severe, widespread shortage of food in an area, causing hunger, disease and deaths.");
  b.card("DEFINITION", "Food aid", "Food, or money for food, given by governments, the World Food Programme or charities to people without enough to eat.");
  b.card("CONCEPT", "Natural factors reducing food supply", "Drought, floods and cyclones, pests (locusts, fall armyworm), crop and animal diseases, poor soils, climate change.");
  b.card("CONCEPT", "Human factors reducing food supply", "Conflict, poverty, population growth, land degradation, poor infrastructure, economic problems, cash crops and biofuels.");
  b.card("CONCEPT", "Food aid: for and against", "For: saves lives in emergencies, food-for-work builds assets. Against: dependency, lower local prices, delays, tied aid, ignores causes.");
  b.card("VOCABULARY", "Kwashiorkor and marasmus", "Kwashiorkor: disease from lack of protein. Marasmus: severe wasting from lack of energy (calories).");
  b.card("FACT", "Small-scale farmers and food security in Zimbabwe", "Grow household food, sell surplus to the GMB, grow small grains in regions IV and V, use Pfumvudza conservation agriculture.", undefined, { applies: ZIM });
  b.card("CONCEPT", "Strategies to increase food supply", "Irrigation, high-yielding and drought-tolerant seeds, mechanisation, GM crops, fertilisers, land reform, support for small farmers, conservation agriculture.");
});
