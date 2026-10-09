// Slice G3c: urban agriculture and agribusiness (ZIMSEC 7.9.7).
import { concept, P, geographyLevels } from "../lib.mjs";

concept("geo.agriculture.urban-agribusiness", { file: "agriculture/urban-agribusiness", keyPrefix: "agriculture.urban-agribusiness" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is an example of **off-plot** urban agriculture?",
    options: [
      ["Growing maize on a road verge", "Correct: off-plot farming uses land the household does not own."],
      ["Keeping chickens in the backyard", "This is on the household's own stand, so it is on-plot."],
      ["A vegetable garden beside the house", "This is on-plot."],
      ["Rabbits kept in hutches at home", "This is on-plot."],
    ],
    answer: "A",
    explanation: "Off-plot sites include vacant land, road verges, power-line servitudes, stream banks and wetlands.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **contract farming**?",
    options: [
      ["A company supplies inputs and agrees to buy the crop", "Correct: input costs are deducted when the crop is sold to the company."],
      ["A farmer rents land from the state for 99 years", "That is leasehold tenure."],
      ["Farmers share grazing land in a village", "That describes communal grazing."],
      ["A farmer sells vegetables at a city market", "That is ordinary marketing."],
    ],
    answer: "A",
    explanation: "Contract farming is common for tobacco and cotton in Zimbabwe.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why does cultivation on **stream banks** in towns cause problems for water supply?",
    options: [
      ["Eroded soil silts up rivers and supply dams", "Correct: silt reduces dam capacity and water quality, as at Lake Chivero."],
      ["Maize plants drink all the water in the river", "Crops use some water, but erosion and siltation are the main problem."],
      ["Stream banks are too fertile for crops", "Fertility is not the problem."],
      ["Cultivation makes rivers flow uphill", "Rivers cannot flow uphill."],
    ],
    answer: "A",
    explanation: "Stream-bank cultivation removes protective vegetation, so soil washes into rivers and dams.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which business is an example of **processing** in agribusiness?",
    options: [
      ["A mill turning maize into maize meal", "Correct: processing changes raw produce into a new product."],
      ["A shop selling seed and fertiliser", "This is input supply."],
      ["A tobacco auction floor", "This is marketing."],
      ["A bank lending money to farmers", "This is a financial support service."],
    ],
    answer: "A",
    explanation: "Processing adds value: milling, crushing oilseeds, making dairy products, abattoirs.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is an advantage of urban agriculture for **low-income households**?",
    options: [
      ["It reduces spending on food", "Correct: home-grown food is cheaper than buying it."],
      ["It guarantees title deeds to the land", "Most off-plot farmers have no secure tenure."],
      ["It stops siltation of urban rivers", "Stream-bank cultivation causes siltation."],
      ["It removes the need for any water", "Crops still need rain or watering."],
    ],
    answer: "A",
    explanation: "Urban agriculture improves food security and frees money for other needs.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which is a **source of funding** for a small-scale agribusiness?",
    options: [
      ["A savings club (mukando)", "Correct: members pool savings and take turns to use them."],
      ["A tobacco auction floor", "Auction floors are where crops are sold, not lenders."],
      ["The Grain Marketing Board's silos", "Silos store grain; they are not a source of funds."],
      ["A municipal by-law", "By-laws regulate; they do not provide money."],
    ],
    answer: "A",
    explanation: "Funding comes from savings, savings clubs, microfinance, banks such as Agribank, contract farming, government and NGOs.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A city council wants to keep the benefits of urban agriculture while protecting a supply dam. Which policy is **most suitable**?",
    options: [
      ["Allocate registered plots away from stream banks and train farmers", "Correct: it keeps food production while protecting rivers from siltation."],
      ["Ban all urban agriculture in every part of the city", "This removes the food and income benefits."],
      ["Allow cultivation right up to the river edge", "This increases erosion and siltation."],
      ["Encourage farmers to water their crops with raw sewage from the city's drains", "This spreads disease and pollutes produce."],
    ],
    answer: "A",
    hints: ["Look for an option that keeps the benefits and removes the harm."],
    explanation: "Planning and regulation, not outright bans, give the best balance.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "In contract farming, why might a company lose money even when the harvest is good?",
    options: [
      ["Farmers side-market the crop to other buyers for a higher price", "Correct: the company paid for the inputs but does not receive the crop."],
      ["The company owns too many processing plants", "This is not a reason for losing the contracted crop."],
      ["Farmers use the inputs to grow the contracted crop", "That is what the contract intends."],
      ["Good harvests always lower the prices and so the company's total sales", "A good harvest gives the company more to process and sell."],
    ],
    answer: "A",
    hints: ["Who paid for the seed and fertiliser?", "What happens if the crop goes elsewhere?"],
    explanation: "Side-marketing is a major problem for contractors, who cannot recover input costs.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Agribusiness includes supplying inputs, processing and marketing as well as farming itself.",
    answer: true,
    explanation: "True. Agribusiness covers the whole value chain from inputs to consumers.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Off-plot urban farmers usually have secure, long-term rights to the land they cultivate.",
    answer: false,
    explanation: "False. Off-plot farmers often use land without permission or with temporary permits, so their tenure is insecure.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each example with the type of agribusiness.",
    pairs: [
      ["A company selling hybrid maize seed", "Input supply"],
      ["A dairy turning milk into yoghurt", "Processing"],
      ["Vendors selling vegetables at Mbare Musika", "Marketing"],
      ["A tobacco company advancing inputs to growers", "Contract farming"],
    ],
    explanation: "Each type is a different link in the agribusiness value chain.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "Growing crops on a household's own stand is {{blank:a}} cultivation. Cultivation on stream banks leads to {{blank:b}} of rivers and dams. Untreated {{blank:c}} used to water crops can spread disease.",
    blanks: [
      { id: "a", accepted: ["on-plot"], choices: ["on-plot", "off-plot", "peri-urban", "communal"] },
      { id: "b", accepted: ["siltation"], choices: ["siltation", "salinisation", "irrigation", "evaporation"] },
      { id: "c", accepted: ["sewage"], choices: ["sewage", "rainwater", "borehole water", "tap water"] },
    ],
    explanation: "On-plot vs off-plot; siltation and sewage are key problems of urban agriculture.",
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "A backyard flock produces 18 trays of eggs a month. Each tray sells for US\\$4.50 and feed costs US\\$52 a month (fictional figures). What is the monthly profit in US dollars?",
    value: 29, tol: 0.005,
    wrong: [81, 133],
    explanation: "Income = 18 × 4.50 = US\\$81; profit = 81 − 52 = US\\$29.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "A youth group buys 300 day-old chicks at US\\$0.80 each, spends US\\$840 on feed and US\\$90 on vaccines and other costs. 285 birds survive and are sold at US\\$4.60 each (fictional figures). Calculate the profit in US dollars.",
    value: 141,
    wrong: [1311, 1170, 210],
    hints: ["Add up all the costs first.", "Income = birds sold × price."],
    workedSolution: "1. Chicks = 300 × 0.80 = US\\$240.\n2. Total costs = 240 + 840 + 90 = US\\$1,170.\n3. Income = 285 × 4.60 = US\\$1,311.\n4. Profit = 1,311 − 1,170 = US\\$141.",
    explanation: "US\\$1,311 income minus US\\$1,170 costs gives a profit of US\\$141.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe **four** problems caused by urban agriculture in Zimbabwean towns.",
    points: [
      "Stream-bank and wetland cultivation causes erosion and siltation of rivers and dams.",
      "Pollution from fertiliser and pesticide run-off / health risks from watering with sewage.",
      "Conflict with councils over unauthorised land / crops slashed / insecure tenure.",
      "Theft, crime hidden by tall maize, mosquitoes, smells or disputes between neighbours (any one).",
    ],
    modelAnswer: "Crops grown on stream banks cause erosion and silt up rivers and dams. Run-off carries fertiliser and pesticides into water, and some farmers use sewage. Councils slash crops grown illegally, and tall maize near roads can hide criminals.",
    explanation: "Give four distinct problems.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 4,
    hints: ["Separate the individual from the national economy."],
    stem: "Explain the importance of agribusiness to (a) individuals and (b) the economy of Zimbabwe.",
    points: [
      "Individuals: income and self-employment (e.g. poultry, horticulture).",
      "Individuals: skills, access to inputs and markets (e.g. through contract farming), better living standards.",
      "Economy: jobs along the value chain and value addition through processing.",
      "Economy: export earnings (tobacco, sugar, horticulture), food security, tax revenue or linkages to transport and packaging.",
    ],
    modelAnswer: "For individuals, agribusiness provides income and self-employment, for example raising broilers, and contract farming gives access to inputs and markets. For the economy, it creates jobs from input supply to processing and retail, adds value to crops, and earns foreign currency from exports such as tobacco and sugar.",
    explanation: "Two points for each part, with examples.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 600,
    hints: ["Percentage = part ÷ total × 100."],
    stem: "A survey of 80 households in a fictional high-density suburb found the following (fictional data).\n\n| Type of urban agriculture | Number of households |\n|---|---|\n| On-plot vegetables and poultry only | 26 |\n| Off-plot maize on open land only | 22 |\n| Off-plot maize on stream banks only | 12 |\n| Both on-plot and off-plot | 8 |\n| None | 12 |",
    parts: [
      P.num({ label: "(a)", unit: "%", stem: "Calculate the percentage of households that practise no urban agriculture.", value: 15, tol: 0.05, wrong: [12, 85], explanation: "12 ÷ 80 × 100 = 15%." }),
      P.num({ label: "(b)", stem: "How many households practise some form of off-plot farming?", value: 42, wrong: [34, 22], explanation: "22 + 12 + 8 = 42 households." }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why the 12 households farming on stream banks concern the city council.",
        points: ["Stream-bank cultivation removes vegetation, so soil is eroded.", "Silt and fertiliser enter the river and supply dams, reducing capacity and water quality."],
        modelAnswer: "Clearing stream banks lets rain wash soil into the river, silting up the city's dams and polluting the water with fertiliser.",
        explanation: "Link the activity to the effect on water supply.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Suggest **two** ways the council could reduce the problems of off-plot farming without stopping it.",
        points: ["Allocate registered plots away from stream banks and wetlands.", "Train farmers in conservation methods / enforce by-laws with education / form cooperatives."],
        modelAnswer: "The council could give registered plots on safe open land away from streams and train farmers in soil conservation.",
        explanation: "Solutions should keep the benefits while reducing harm.",
      }),
    ],
    explanation: "Analyse survey data on urban agriculture and suggest management.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", secs: 540,
    hints: ["Think about where the money comes from and what can go wrong."],
    stem: "Tendai, a school leaver in a fictional town, wants to start a small egg-production business with 100 laying hens. She has US\\$150 of savings but needs about US\\$900.",
    parts: [
      P.num({ label: "(a)", stem: "How many US dollars does she still need to raise?", value: 750, wrong: [1050, 6], explanation: "900 − 150 = US\\$750." }),
      P.manual({
        label: "(b)", marks: 3, stem: "Suggest **three** sources of funding she could use.",
        points: ["A savings club (mukando) or family and friends.", "A microfinance institution or a bank such as Agribank.", "A government or NGO youth scheme / supplier credit from an agro-dealer."],
        modelAnswer: "She could join a savings club, borrow from a microfinance institution or Agribank, or apply to a youth empowerment scheme.",
        explanation: "Name realistic sources.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Give **two** problems that could make her business fail.",
        points: ["High or rising feed costs / power cuts / disease such as Newcastle disease.", "Low prices or competition from other sellers / theft / high interest on loans."],
        modelAnswer: "Feed prices could rise faster than egg prices, and a disease outbreak could kill the hens.",
        explanation: "Small agribusinesses face cost, market and disease risks.",
      }),
    ],
    explanation: "Apply knowledge of funding and challenges to a small agribusiness.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "Evaluate the advantages and disadvantages of urban agriculture in Zimbabwean towns, and suggest how its problems could be reduced.",
    hints: ["Give advantages and disadvantages with detail.", "Match solutions to problems and give a judgement."],
    points: [
      "Advantages: food security and lower food spending for low-income households.",
      "Advantages: income and jobs; use of idle land; recycling of waste as compost.",
      "Disadvantages: stream-bank cultivation causes siltation of rivers and dams (e.g. Lake Chivero); pollution from chemicals and sewage.",
      "Disadvantages: conflict with councils, insecure tenure, theft, crime and mosquitoes.",
      "Solutions: designated registered plots away from streams, training, enforcing by-laws, safe water use, cooperatives, planning allotments.",
      "Judgement: benefits outweigh costs if urban agriculture is planned and regulated rather than banned.",
    ],
    levels: geographyLevels(6),
    modelAnswer: "Urban agriculture gives poor households cheaper food and some income from selling vegetables and eggs, makes use of idle land and turns kitchen waste into compost. However, much of it takes place on stream banks and wetlands, causing erosion and siltation of rivers and dams such as Lake Chivero, and some plots are watered with sewage. Off-plot farmers have no secure tenure and come into conflict with councils, and tall maize can hide criminals. These problems can be reduced by allocating registered plots away from streams, training farmers in conservation and safe chemical use, encouraging rainwater harvesting and including allotments in town plans. With such management, the benefits of urban agriculture outweigh its costs.",
    explanation: "Balance both sides, match solutions to problems and judge.",
  });

  b.card("DEFINITION", "**Urban agriculture**", "Growing crops and keeping livestock within and on the edges of towns.", undefined);
  b.card("VOCABULARY", "**On-plot / off-plot**", "On-plot: on the household's own stand. Off-plot: on open land, verges, stream banks or wetlands.", undefined);
  b.card("CONCEPT", "Advantages of urban agriculture", "Food security, income and jobs, use of idle land, recycling of waste, better nutrition.", undefined);
  b.card("CONCEPT", "Problems of urban agriculture", "Siltation, pollution, sewage use, conflict with councils, insecure tenure, theft, crime, mosquitoes.", undefined);
  b.card("DEFINITION", "**Agribusiness**", "Businesses along the farm value chain: inputs, production, processing, marketing and services.", undefined);
  b.card("DEFINITION", "**Contract farming**", "A company supplies inputs and buys the crop, deducting input costs.", "Common for tobacco and cotton.");
  b.card("CONCEPT", "Funding small-scale agribusiness", "Savings, savings clubs (mukando), microfinance, banks such as Agribank, contract farming, government and NGOs.", undefined);
  b.card("CONCEPT", "Importance of agribusiness to the economy", "Jobs, value addition, exports, food security, linkages and tax revenue.", undefined);
  b.card("CONCEPT", "Side-marketing", "Selling a contracted crop to another buyer, so the contractor cannot recover input costs.", undefined);
});
