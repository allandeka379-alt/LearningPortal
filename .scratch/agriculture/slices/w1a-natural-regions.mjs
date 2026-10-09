// Slice W1a: the natural farming regions of Zimbabwe (ZIMSEC only).
import { concept, P, mean, pct, fmtNum, table, agricultureLevels } from "../lib.mjs";

const fiveSeasons = [520, 610, 455, 580, 485];
const fiveMean = mean(fiveSeasons);

const dryYears = { dry: 7, total: 20 };
const dryPct = pct(dryYears.dry, dryYears.total);

const FARMS = [
  ["P", "1,250", "High altitude, cool; some rain in most months", "Steep slopes"],
  ["Q", "860", "Warm summers; dry spells uncommon", "Deep red clay soils"],
  ["R", "380", "Hot; rainfall very erratic", "Near a large river and dam"],
];
const farmP = 1250;
const farmR = 380;

const RECORDS = [610, 495, 540, 720, 430, 575, 500, 630];
const recMean = mean(RECORDS);
const below500 = RECORDS.filter((r) => r < 500).length;

concept("agri.land.natural-regions", { file: "land/natural-regions", keyPrefix: "land.natural-regions" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which natural farming region of Zimbabwe receives the highest mean annual rainfall?",
    options: [
      ["Region I", "Correct: region I, in the Eastern Highlands, receives more than about 1,000 mm a year."],
      ["Region II", "Region II is well watered (about 750-1,000 mm) but receives less than region I."],
      ["Region III", "Region III receives moderate rainfall (about 650-800 mm) with mid-season dry spells."],
      ["Region V", "Region V is the driest region, with low and erratic rainfall."],
    ],
    answer: "A",
    explanation: "Rainfall decreases from region I (wettest, Eastern Highlands) to region V (driest, Lowveld and Zambezi valley).",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which farming system is best suited to natural region V?",
    options: [
      ["Extensive cattle and game ranching", "Correct: rain is too low and erratic for reliable rain-fed crops, so large areas of veld are used for ranching."],
      ["Intensive maize and tobacco production", "This suits region II, which has good, fairly reliable rainfall."],
      ["Tea, coffee and plantation forestry", "These need the cool, wet conditions of region I."],
      ["Semi-intensive livestock with fodder crops", "This describes region III, which is wetter than region V."],
    ],
    answer: "A",
    explanation: "Region V suits extensive farming: cattle and game ranching on natural veld. Crops are grown only under irrigation, for example sugar cane in the Lowveld.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Tea and coffee estates in Zimbabwe are found mainly in which natural region?",
    options: [
      ["Region I", "Correct: the high rainfall and cool temperatures of the Eastern Highlands suit tea and coffee."],
      ["Region IIb", "Region IIb is used for intensive field crops such as maize and tobacco, and has dry spells."],
      ["Region IV", "Region IV is too dry; it suits livestock and drought-tolerant small grains."],
      ["Region V", "Region V is hot and dry; its main crop, sugar cane, is irrigated."],
    ],
    answer: "A",
    explanation: "Region I (for example around Chipinge) has more than about 1,000 mm of rain with some rain in most months, which tea and coffee need.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which pair of crops would an extension officer most likely recommend to a smallholder in natural region IV?",
    options: [
      ["Sorghum and pearl millet", "Correct: small grains tolerate drought and low rainfall better than maize."],
      ["Tea and coffee", "These need the high, reliable rainfall of region I."],
      ["Rain-fed wheat and barley", "Wheat is grown as an irrigated winter crop, not as a rain-fed crop in dry regions."],
      ["Apples and plums", "Deciduous fruit needs the cool highlands of region I."],
    ],
    answer: "A",
    explanation: "Region IV has low rainfall and frequent droughts, so drought-tolerant small grains (sorghum, pearl millet, finger millet) and livestock are recommended.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the main difference between natural regions IIa and IIb?",
    options: [
      ["IIa has more reliable rain; IIb has more severe dry spells", "Correct: both receive similar totals, but IIb is less reliable."],
      ["IIa receives over twice as much rain as IIb in a season", "Both receive roughly 750-1,000 mm; the difference is reliability, not the total."],
      ["IIa is in the Lowveld while IIb is in the Eastern Highlands", "Both are on the northern and north-eastern highveld."],
      ["IIa suits extensive ranching; IIb suits tea estates", "Both suit intensive crop and livestock farming."],
    ],
    answer: "A",
    explanation: "Region II is divided by rainfall reliability: IIa rarely has long dry spells, while IIb has more frequent and severe dry spells, so crop yields in IIb are less certain.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Sugar cane is a major crop in the Lowveld even though the area lies in natural region V. Which statement explains this?",
    options: [
      ["The cane is irrigated from rivers and dams", "Correct: irrigation replaces the missing rain, and the heat suits cane."],
      ["Region V has the highest rainfall in Zimbabwe", "Region V is the driest region."],
      ["Sugar cane needs very little water to grow", "Cane needs a lot of water over a long season; this is why it must be irrigated there."],
      ["The Lowveld has cool, frosty winters that cane needs", "The Lowveld is hot, which suits cane; frost damages it."],
    ],
    answer: "A",
    explanation: "Farmers can grow a crop outside its natural rainfall limits if they change the conditions. In the Lowveld, water from rivers and dams is used to irrigate cane, which thrives in the high temperatures.",
    hints: ["Think about what the farmer adds that the climate does not provide."],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A district receives about 700 mm of rain a year, but maize often wilts during dry spells in January and February. Livestock farming with fodder crops is the main enterprise. In which natural region is the district most likely to be?",
    options: [
      ["Region III", "Correct: moderate rain, common mid-season dry spells and semi-intensive livestock farming describe region III."],
      ["Region I", "Region I receives more than about 1,000 mm and suits forestry, tea and dairy."],
      ["Region IIa", "Region IIa has reliable rain with few dry spells."],
      ["Region V", "Region V is much drier; ranching is extensive, not supported by fodder crops."],
    ],
    answer: "A",
    explanation: "Region III has moderate rainfall (about 650-800 mm), high temperatures and common mid-season dry spells, so it suits semi-intensive farming based on livestock and fodder crops.",
    hints: ["Look for the region with moderate rain and mid-season dry spells."],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Tatenda moves from a farm near Chinhoyi (region IIa) to a farm in region IV and plants the same maize variety, at the same plant population and fertiliser rate, every season. What is the most likely result over several seasons?",
    options: [
      ["Frequent poor yields or crop failure from drought", "Correct: region IV has low, unreliable rain, so intensive rain-fed maize often fails."],
      ["Higher yields because region IV has better soils", "Region IV is defined mainly by low rainfall; soils do not make up for the lack of water."],
      ["Damage to the crop from heavy frost every season", "Frost is not the main limiting factor in region IV; drought is."],
      ["No change, because maize yield does not depend on rain", "Rain-fed maize yield depends strongly on the amount and timing of rain."],
    ],
    answer: "A",
    explanation: "Practices that suit the reliable rainfall of region IIa fail in region IV, where droughts and dry spells are frequent. Tatenda should switch to small grains, use water-harvesting methods and rely more on livestock.",
    hints: ["Compare the rainfall amount and reliability of the two regions."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Mean annual rainfall generally increases from natural region I to natural region V.",
    answer: false,
    explanation: "False. Rainfall **decreases** from region I (the wettest) to region V (the driest).",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The natural farming regions were drawn mainly from the amount and reliability of rainfall.",
    answer: true,
    explanation: "True. Rainfall amount and reliability are the main basis, helped by temperature (altitude) and soils.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each natural region with the farming system that suits it.",
    pairs: [
      ["Region I", "Specialised and diversified farming: forestry, tea, coffee, fruit, dairy"],
      ["Region II", "Intensive crop and livestock farming"],
      ["Region III", "Semi-intensive farming: livestock with fodder and drought-tolerant cash crops"],
      ["Region IV", "Semi-extensive farming: livestock and drought-tolerant small grains"],
      ["Region V", "Extensive cattle and game ranching"],
    ],
    explanation: "As rainfall falls from region I to region V, farming becomes less intensive and depends more on livestock and drought-tolerant crops.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each blank.",
    template: "Natural region {{blank:a}} covers the Eastern Highlands. The Lowveld lies mainly in natural region {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["I"], choices: ["I", "III", "IV", "V"] },
      { id: "b", accepted: ["V"], choices: ["I", "II", "III", "V"] },
    ],
    explanation: "The cool, wet Eastern Highlands are region I; the hot, dry Lowveld of the south-east is region V.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the natural farming region in which most of Zimbabwe's pine and eucalyptus plantations are found.",
    accepted: ["I", "1", "region I", "region 1", "one", "region one", "natural region I", "natural region 1"],
    wrong: ["V", "region II"],
    explanation: "Plantation forestry is concentrated in region I (Nyanga and Chimanimani areas), where high, reliable rainfall and cool temperatures suit fast-growing exotic trees.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: `A farm recorded these rainfall totals over five seasons: ${fiveSeasons.map((r) => `${r} mm`).join(", ")}. Calculate the mean seasonal rainfall in mm.`,
    value: fiveMean, unit: "mm", wrong: [2650, 610],
    explanation: `Mean = total ÷ number of seasons = ${fmtNum(fiveSeasons.reduce((a, r) => a + r, 0))} ÷ 5 = ${fiveMean} mm. (2,650 is the total, not the mean.) A mean of about ${fiveMean} mm with seasons as low as 455 mm is typical of region IV.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A farmer in region III kept records for ${dryYears.total} seasons. In ${dryYears.dry} of them a long mid-season dry spell damaged the maize. Calculate the percentage of seasons with a damaging dry spell.`,
    value: dryPct, unit: "%", wrong: [7, 65],
    explanation: `Percentage = ${dryYears.dry} ÷ ${dryYears.total} × 100 = ${dryPct}%. (65% is the share of seasons WITHOUT a damaging dry spell.)`,
    workedSolution: `1. Seasons with a damaging dry spell = ${dryYears.dry}; total seasons = ${dryYears.total}.\n2. Percentage = ${dryYears.dry} ÷ ${dryYears.total} × 100.\n3. = ${dryPct}%.`,
    hints: ["Percentage = part ÷ whole × 100."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain three ways in which dividing Zimbabwe into natural farming regions helps agriculture.",
    points: [
      "Guides farmers to choose crops and livestock suited to their rainfall, reducing the risk of failure.",
      "Helps extension officers (AGRITEX) give advice that fits local conditions.",
      "Helps government, lenders, insurers or researchers plan land use, resettlement, credit or crop varieties for each area.",
    ],
    modelAnswer: "The regions show farmers which crops and animals suit their rainfall, so they lose fewer crops to drought. Extension officers use them to give advice that fits the area. Planners, banks and plant breeders use them to plan land use, judge lending risk and breed suitable varieties.",
    explanation: "Each mark needs a use of the regions and how it helps (lower risk, better advice, better planning).",
    hints: ["Think about who uses the regions: farmers, advisers, planners, lenders, researchers."],
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Nyasha has inherited a large farm in natural region V, far from any river. Suggest **two** suitable enterprises and explain why each suits the region.",
    points: [
      "Suggests cattle ranching (beef).",
      "Explains that cattle graze large areas of natural veld and do not depend on reliable rain in the way crops do.",
      "Suggests game ranching (wildlife for tourism or controlled hunting) / goats.",
      "Explains that wild animals are adapted to the hot, dry conditions and bring income from tourism with little cultivation (or goats browse bushes and tolerate drought).",
    ],
    modelAnswer: "Extensive beef cattle ranching, because cattle can graze the natural veld over a large area and do not need reliable rain as crops do. Game ranching, because indigenous wild animals are adapted to the heat and drought and can earn income from tourism or controlled hunting without cultivating the land.",
    explanation: "Region V is too dry for rain-fed crops, and the farm has no water for irrigation, so extensive livestock or wildlife enterprises are suitable.",
    hints: ["Without irrigation, crops will fail. Which enterprises use natural vegetation?"],
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, paper: "Paper 2",
    stem: `Table 1 describes three fictional farms in Zimbabwe.\n\n**Table 1**\n\n${table(["Farm", "Mean annual rainfall (mm)", "Climate", "Other feature"], FARMS)}`,
    hints: ["Use the rainfall to place each farm in a region.", "For (d), think about what farm R's river and dam make possible."],
    parts: [
      P.mcq({
        label: "(a)", marks: 1, stem: "Which farm is most likely to be in natural region I?",
        options: [
          ["Farm P", "Correct: more than 1,000 mm, cool and rain in most months."],
          ["Farm Q", "860 mm with warm summers fits region II."],
          ["Farm R", "380 mm and erratic rain fits region V."],
          ["None of the three farms", "Farm P fits region I."],
        ],
        answer: "A",
        explanation: "Region I has more than about 1,000 mm of rain, cool temperatures and rain in most months.",
      }),
      P.num({
        label: "(b)", marks: 1, stem: "Calculate the difference in mean annual rainfall between farm P and farm R, in mm.",
        value: farmP - farmR, unit: "mm", wrong: [farmP + farmR],
        explanation: `${fmtNum(farmP)} − ${farmR} = ${fmtNum(farmP - farmR)} mm.`,
      }),
      P.short({
        label: "(c)", marks: 1, stem: "Name **one** cash crop suited to farm Q's rainfall.",
        accepted: ["maize", "tobacco", "soya beans", "soya bean", "soybeans", "soybean", "soya", "cotton", "groundnuts", "groundnut", "sunflower", "sunflowers"],
        wrong: ["tea"],
        explanation: "Farm Q fits region II, suited to intensive crops such as maize, tobacco, soya beans, cotton and groundnuts.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Suggest how farm R could grow a crop such as sugar cane despite its low rainfall.",
        points: ["Irrigate using water from the river or dam.", "Explains that irrigation supplies the water the rain does not, while the heat suits the crop."],
        explanation: "Irrigation changes the conditions so a crop can grow outside its rainfall limits.",
      }),
      P.manual({
        label: "(e)", marks: 3, stem: "Describe the farming system that would suit farm P.",
        points: [
          "Specialised / diversified farming.",
          "Names suitable enterprises: tea, coffee, plantation forestry (pine, eucalyptus) or deciduous fruit.",
          "Names intensive dairy (or beef) on good pastures / mentions soil conservation on the steep slopes.",
        ],
        explanation: "Farm P fits region I: specialised and diversified farming with forestry, tea, coffee, fruit and dairy.",
      }),
    ],
    explanation: "Rainfall places P in region I, Q in region II and R in region V; each suits a different farming system.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, paper: "Paper 2", calculator: true,
    stem: `Thandeka farms 12 ha in a district of Matabeleland. She recorded the rainfall for eight seasons.\n\n**Table 2**\n\n${table(["Season", ...RECORDS.map((_, i) => String(i + 1))], [["Rainfall (mm)", ...RECORDS]])}\n\nShe grows 8 ha of maize every season and keeps a few goats.`,
    hints: ["Mean = total ÷ 8.", "Count the seasons below 500 mm.", "For (c), weigh up maize against small grains and livestock for this rainfall."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the mean seasonal rainfall, in mm, to the nearest whole number.",
        value: recMean, tol: 0.5, answer: String(Math.round(recMean)), unit: "mm", wrong: [RECORDS.reduce((a, r) => a + r, 0)],
        explanation: `Total = ${fmtNum(RECORDS.reduce((a, r) => a + r, 0))} mm; mean = ${fmtNum(RECORDS.reduce((a, r) => a + r, 0))} ÷ 8 = ${recMean} mm, about ${Math.round(recMean)} mm.`,
      }),
      P.num({
        label: "(b)", marks: 1, stem: "State the number of seasons with less than 500 mm of rain.",
        value: below500, wrong: [below500 + 1],
        explanation: `Seasons below 500 mm: 495 and 430, so ${below500} seasons. (500 mm itself is not below 500 mm.)`,
      }),
      P.short({
        label: "(c)", marks: 1, stem: "Name the natural region that best fits this rainfall record.",
        accepted: ["IV", "4", "region IV", "region 4", "four", "region four", "natural region IV", "natural region 4"],
        wrong: ["II"],
        explanation: `A mean of about ${Math.round(recMean)} mm with frequent dry seasons fits region IV.`,
      }),
      P.manual({
        label: "(d)", marks: 8, stem: "Thandeka's maize fails in many seasons. Discuss changes she could make to her farming system so that it suits the natural region better.",
        points: [
          "Replace much of the maize with drought-tolerant small grains (sorghum, pearl millet, finger millet).",
          "Explains that small grains tolerate dry spells / mature with less water, so harvests are more certain.",
          "Expand livestock (goats, cattle) as the main enterprise.",
          "Explains that livestock use veld grazing and browse and can be sold in drought years, spreading risk.",
          "Use water harvesting / conservation (tied ridges, potholes, mulching, conservation tillage).",
          "Explains that these hold rainwater in the soil for longer.",
          "Keep a small area of early-maturing or drought-tolerant maize on the best soils, or use a small irrigated plot if water is available.",
          "Gives a reasoned judgement: a semi-extensive system with livestock and small grains suits region IV better than intensive maize.",
        ],
        levels: agricultureLevels(8),
        explanation: "Region IV suits semi-extensive farming: livestock and drought-tolerant crops, with water conservation to reduce risk.",
      }),
    ],
    explanation: "Calculating the mean and counting dry seasons shows region IV conditions, so Thandeka should move towards a semi-extensive system.",
  });

  b.card("DEFINITION", "Natural farming region", "An area with broadly similar rainfall (amount and reliability), temperature and soils, suited to a similar type of farming.");
  b.card("FACT", "Which natural region receives more than about 1,000 mm of rain a year?", "Region I (the Eastern Highlands).");
  b.card("FACT", "What is the approximate rainfall of region II?", "About 750-1,000 mm a year (IIa more reliable than IIb).");
  b.card("FACT", "What is the approximate rainfall of region III?", "About 650-800 mm a year, with frequent mid-season dry spells.");
  b.card("FACT", "What is the approximate rainfall of region IV?", "About 450-650 mm a year, with periodic droughts.");
  b.card("CONCEPT", "Farming system of each region", "I specialised and diversified; II intensive crops and livestock; III semi-intensive; IV semi-extensive; V extensive ranching.");
  b.card("FACT", "Where is sugar cane grown in Zimbabwe, and how?", "In the Lowveld (region V), under irrigation.");
  b.card("CONCEPT", "IIa versus IIb", "Similar rainfall totals; IIa is more reliable, IIb has more severe dry spells.");
  b.card("CONCEPT", "Why divide the country into natural regions?", "To guide farmers' choice of enterprise, extension advice, land-use and resettlement planning, lending and insurance, and research.");
});
