// Slice G3c: Zimbabwe's minerals: geology, distribution and importance (ZIMSEC 7.7.1).
import { concept, P, geographyLevels } from "../lib.mjs";

concept("geo.mining.minerals-distribution", { file: "mining/minerals-distribution", keyPrefix: "mining.minerals-distribution" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which mineral is mined at **Hwange**?",
    options: [
      ["Coal", "Correct: Hwange lies on Karoo sedimentary rocks that contain coal, which also feeds the Hwange power station."],
      ["Platinum", "Platinum is mined on the Great Dyke, not in the north-west."],
      ["Lithium", "Lithium is mined at Bikita and Arcadia."],
      ["Diamonds", "Diamonds are mined at Marange and Murowa."],
    ],
    answer: "A",
    explanation: "Hwange is Zimbabwe's main coalfield, in the Karoo basin of the north-west.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which group of minerals is found mainly along the **Great Dyke**?",
    options: [
      ["Platinum group metals, chrome and nickel", "Correct: the igneous rocks of the Great Dyke hold these minerals."],
      ["Coal, coal-bed methane and limestone", "Coal forms in sedimentary rocks such as the Karoo basins, not in the igneous Dyke."],
      ["Diamonds, lithium and copper", "Diamonds are at Marange and Murowa, lithium at Bikita and Arcadia, copper around Mhangura."],
      ["Asbestos, iron ore and alluvial gold", "These come from other areas such as Zvishavane, Buchwa and river gravels."],
    ],
    answer: "A",
    explanation: "The Great Dyke is a long, narrow igneous intrusion with platinum group metals, chrome and nickel.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What makes a mineral deposit an **ore**?",
    options: [
      ["It can be mined and sold at a profit", "Correct: an ore is defined by being profitable to mine."],
      ["It lies within 100 m of the surface", "Depth affects cost, but deep deposits can still be ores (many gold mines are deep)."],
      ["It contains a metal rather than a non-metal", "Profit, not the type of mineral, decides; many non-metallic deposits are mined."],
      ["It was formed by a volcanic eruption", "Ores form in many ways, including in sedimentary rocks and river gravels."],
    ],
    answer: "A",
    explanation: "An ore is a rock containing enough of a valuable mineral to be mined at a profit. If prices fall, an ore can stop being worth mining.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which mineral is a **ferrous** mineral?",
    options: [
      ["Chrome", "Correct: chrome is alloyed with iron to make stainless steel, so it belongs with the ferrous minerals."],
      ["Copper", "Copper is a base metal (non-ferrous)."],
      ["Coal", "Coal is an energy mineral."],
      ["Diamond", "Diamond is a precious stone (non-metallic)."],
    ],
    answer: "A",
    explanation: "Ferrous minerals are iron and the metals alloyed with it in steel making, such as chrome and nickel.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is **coal** not found on the Great Dyke?",
    options: [
      ["The Dyke is igneous rock, and coal forms in sedimentary rock", "Correct: coal forms from buried plant remains in sedimentary basins such as the Karoo."],
      ["The Dyke is too far from a railway line for any coal to be mined", "Transport affects whether a deposit is mined, not whether coal forms there."],
      ["The coal on the Dyke has all been mined out", "There was never coal there, because the rock type is wrong."],
      ["Coal only forms at heights above 1,500 m", "Coal formation depends on rock type and buried vegetation, not on present height."],
    ],
    answer: "A",
    explanation: "Each mineral is linked to a rock type. The Great Dyke is an igneous intrusion; coal is found in Karoo sedimentary rocks around Hwange and in the south-east.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Most of Zimbabwe's gold mines are found on which geological formation?",
    options: [
      ["Greenstone belts", "Correct: gold is mainly found in the old volcanic and sedimentary rocks of the greenstone belts."],
      ["Karoo basins", "The Karoo basins hold coal."],
      ["Kimberlite pipes", "Kimberlite pipes can contain diamonds, as at Murowa."],
      ["Pegmatite veins", "Pegmatites hold lithium at Bikita and Arcadia."],
    ],
    answer: "A",
    explanation: "Gold mining areas such as Kwekwe, Kadoma, Shurugwi, Gwanda and Bindura lie on greenstone belts.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A student writes: \"Zimbabwe's minerals are spread evenly across the whole country.\" Which observation best shows that this is wrong?",
    options: [
      ["Coal occurs in only a few basins, and platinum follows one narrow belt", "Correct: these minerals are concentrated in particular geological settings, so the pattern is uneven."],
      ["Gold is mined in several provinces of the country", "Gold occurring in several provinces does not by itself show an uneven pattern."],
      ["Many different minerals are mined in Zimbabwe", "The number of minerals says nothing about how they are spread."],
      ["Most large mines are connected to the railway network and main roads", "This describes transport links, not the spread of minerals."],
    ],
    answer: "A",
    hints: ["Think about minerals that occur in only one type of rock.", "Which minerals are found in just one belt or basin?"],
    explanation: "The distribution follows geology: gold in greenstone belts, PGMs, chrome and nickel along the Great Dyke, coal in the Karoo basins.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which change would most directly turn a low-grade mineral deposit into an **ore**?",
    options: [
      ["A large rise in the world price of the mineral", "Correct: a higher price makes it profitable to mine lower-grade rock."],
      ["A fall in the number of mines in the country", "Fewer mines elsewhere does not change the profit from this deposit."],
      ["A rise in the cost of electricity for mines", "Higher costs make mining less profitable, not more."],
      ["The discovery that the deposit is deeper than expected", "Greater depth raises costs, so the deposit is less likely to be an ore."],
    ],
    answer: "A",
    hints: ["Remember the definition of an ore.", "Which change raises the profit from mining?"],
    explanation: "Whether a deposit is an ore depends on profit, which depends on price, grade and costs. A higher price can make lower grades worth mining.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Diamonds are mined at Marange, near Mutare, and at Murowa, near Zvishavane.",
    answer: true,
    explanation: "True. Marange (Chiadzwa) in Manicaland and Murowa in the Midlands are Zimbabwe's best-known diamond mining areas.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Asbestos is still one of Zimbabwe's leading mineral exports today.",
    answer: false,
    explanation: "False. Asbestos was once important (Zvishavane and Mashava), but production has largely stopped because of health risks and the collapse of world demand.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each mineral with an area where it is mined in Zimbabwe.",
    pairs: [
      ["Lithium", "Bikita"],
      ["Diamonds", "Marange"],
      ["Coal", "Hwange"],
      ["Nickel", "Bindura"],
    ],
    explanation: "Lithium–Bikita (also Arcadia); diamonds–Marange (also Murowa); coal–Hwange; nickel–Bindura.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "The Great Dyke is about 550 km long and runs roughly {{blank:a}}. It is made of {{blank:b}} rock and is rich in platinum group metals and {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["NNE to SSW"], choices: ["NNE to SSW", "east to west", "NW to SE", "north to south along the border"] },
      { id: "b", accepted: ["igneous"], choices: ["igneous", "sedimentary", "metamorphic", "alluvial"] },
      { id: "c", accepted: ["chrome"], choices: ["chrome", "coal", "lithium", "copper"] },
    ],
    explanation: "The Great Dyke is a narrow igneous intrusion running NNE–SSW through central Zimbabwe, with platinum group metals, chrome and nickel.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the ore of chrome.",
    accepted: ["chromite", "chromite ore"],
    wrong: ["haematite"],
    explanation: "Chromite is the ore mineral from which chrome is obtained; it is smelted into ferrochrome.",
  });
  b.num({
    d: 2, skill: "APPLICATION", unit: "%",
    stem: "A fictional country earns US\\$7,500 million from exports in a year. Minerals earn US\\$4,800 million of this (fictional data). What percentage of export earnings comes from minerals?",
    value: 64, tol: 0.05,
    wrong: [36, 156],
    explanation: "4,800 ÷ 7,500 × 100 = 64%.",
  });
  b.calc({
    d: 3, skill: "APPLICATION", unit: "%",
    stem: "A fictional mine produced 2,400 kg of gold in Year 1 and 2,820 kg in Year 2. Calculate the percentage increase in production.",
    value: 17.5, tol: 0.05,
    wrong: [14.9, 420],
    hints: ["Find the change first.", "Divide the change by the Year 1 figure, then multiply by 100."],
    workedSolution: "1. Change = 2,820 − 2,400 = 420 kg.\n2. 420 ÷ 2,400 × 100 = 17.5%.",
    explanation: "Percentage change = change ÷ original × 100 = 420 ÷ 2,400 × 100 = 17.5%.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the distribution of **gold** and **coal** in Zimbabwe.",
    points: [
      "Gold is widespread / scattered across the central parts of the country.",
      "Gold is found on the greenstone belts, for example around Kwekwe, Kadoma, Shurugwi, Gwanda or Bindura (any named area), and in river gravels.",
      "Coal is concentrated in a few areas only (the Karoo basins).",
      "Coal is mainly in the north-west at Hwange (with other deposits in the south-east).",
    ],
    modelAnswer: "Gold is found in many places across the central part of the country, on greenstone belts around towns such as Kwekwe, Kadoma and Gwanda, and as alluvial gold in rivers. Coal, by contrast, is concentrated in a few Karoo basins, mainly at Hwange in the north-west, with other deposits in the south-east.",
    explanation: "'Describe the distribution' means say where something is concentrated, where it is scattered and name places.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    hints: ["Think about money, jobs and the growth of towns.", "Give an example for each point."],
    stem: "Explain **two** ways in which minerals are important to Zimbabwe's economy.",
    points: [
      "Export earnings: minerals such as gold, platinum or diamonds are sold abroad (1).",
      "This brings in foreign currency to pay for imports such as fuel or machinery (1).",
      "Employment or revenue or raw materials: for example mines and small-scale mining employ many people / pay royalties and taxes / supply coal and limestone to industry (1).",
      "Development of that point: wages are spent in local businesses / government spends revenue on services / local industries such as power stations or cement works depend on them (1).",
    ],
    modelAnswer: "Minerals such as gold and platinum are Zimbabwe's main exports, earning foreign currency that pays for imports like fuel. Mining also creates jobs, both in large mines and in small-scale gold mining, and the wages are spent in local shops and services.",
    explanation: "Each 'way' needs a statement and a development or example.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 600,
    stem: "Table 1 shows the value of mineral exports from a fictional mineral-rich country (US\\$ million, fictional data).\n\n| Mineral | Year 1 | Year 2 |\n|---|---|---|\n| Gold | 1,200 | 1,500 |\n| Platinum group metals | 900 | 1,050 |\n| Diamonds | 300 | 240 |\n| Chrome (ferrochrome) | 400 | 410 |\n| **Total** | 2,800 | 3,200 |",
    hints: ["Use subtraction for changes and division for shares."],
    parts: [
      P.num({ label: "(a)", stem: "By how many US\\$ million did gold exports increase from Year 1 to Year 2?", value: 300, wrong: [2700], explanation: "1,500 − 1,200 = 300." }),
      P.num({ label: "(b)", marks: 2, unit: "%", stem: "Calculate the percentage of total mineral exports that came from gold in Year 2. Give your answer to one decimal place.", value: 46.875, answer: "46.9", tol: 0.05, wrong: [53.1, 213.3], explanation: "1,500 ÷ 3,200 × 100 = 46.875, which is 46.9%." }),
      P.mcq({
        label: "(c)", stem: "Which mineral's export value **fell** between the two years?",
        options: [
          ["Diamonds", "Correct: diamonds fell from 300 to 240."],
          ["Chrome (ferrochrome)", "Chrome rose slightly, from 400 to 410."],
          ["Platinum group metals", "PGMs rose from 900 to 1,050."],
          ["Gold", "Gold rose from 1,200 to 1,500."],
        ],
        answer: "A", explanation: "Only diamonds fell, by US\\$60 million.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Suggest **two** reasons why the value of a mineral export can fall even when the same amount is mined.",
        points: ["The world price of the mineral falls (for example lower demand or more supply from other countries).", "Exchange-rate changes, or the mineral being sold in a less processed / lower-quality form, reduce its value."],
        modelAnswer: "If world demand falls or other countries produce more, the price drops, so the same amount earns less. Selling lower-quality stones or less processed ore also lowers the value.",
        explanation: "Value = quantity × price, so a fall in price lowers value even when output is steady.",
      }),
    ],
    explanation: "This item practises reading a table of mineral exports, calculating change and share, and explaining changes in value.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", secs: 540,
    stem: "A fictional district has three rock areas, described from west to east.\n\n| Area | Rock type | Feature |\n|---|---|---|\n| West | Sedimentary rocks of a Karoo-type basin | Dark seams exposed in a river bank |\n| Centre | A long, narrow band of igneous rock running NNE–SSW | Dark, heavy layers rich in chromite |\n| East | Old volcanic and sedimentary rocks of a greenstone belt | Quartz veins; panners work the river gravels |\n\nA railway runs along the centre of the district; the east has only gravel roads.",
    hints: ["Link each rock type with the minerals it usually holds in Zimbabwe."],
    parts: [
      P.match({
        label: "(a)", stem: "Match each area with the mineral it is most likely to contain.",
        pairs: [["West", "Coal"], ["Centre", "Chrome"], ["East", "Gold"]],
        explanation: "Karoo sediments–coal; a Great Dyke-type igneous band–chrome (and platinum); greenstone belt–gold.",
      }),
      P.mcq({
        label: "(b)", stem: "To which mineral group does the mineral in the **west** belong?",
        options: [
          ["Energy minerals", "Correct: coal is burnt as a fuel."],
          ["Precious metals", "Precious metals are rare, high-value metals such as gold and platinum."],
          ["Base metals", "Base metals are non-ferrous industrial metals such as copper."],
          ["Ferrous minerals", "Ferrous minerals are iron and metals alloyed with it, such as chrome."],
        ],
        answer: "A", explanation: "Coal is an energy mineral.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Suggest why the chrome in the centre is more likely to be mined by a large company than the gold in the east.",
        points: ["The railway in the centre can carry heavy, bulky chrome ore cheaply to smelters or ports.", "Chrome is low in value per tonne, so it needs bulk transport; gold is light and valuable, so it can be worked by small-scale miners even with poor roads."],
        modelAnswer: "Chrome ore is heavy and worth little per tonne, so it can only be mined profitably where a railway can carry large tonnages, as in the centre. Gold is so valuable per gram that panners and small-scale miners can work it even with only gravel roads.",
        explanation: "Transport matters most for bulky, low-value minerals.",
      }),
    ],
    explanation: "This item links rock type to mineral occurrence and shows how transport affects which deposits are mined.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "\"Zimbabwe's minerals are found where they are because of geology alone.\" To what extent do you agree?",
    hints: ["Separate where minerals OCCUR from where they are MINED.", "Think about transport, power, prices and policy."],
    points: [
      "Geology controls where minerals occur: gold in greenstone belts; PGMs, chrome and nickel on the Great Dyke.",
      "Coal only in Karoo sedimentary basins such as Hwange; diamonds in alluvial/conglomerate deposits at Marange and a kimberlite at Murowa.",
      "But whether a deposit is mined depends on grade, size and depth (economic factors).",
      "Access to transport, power and water also affects which deposits are worked.",
      "World prices and government policy (licences, investment, beneficiation rules) decide when mines open or close, e.g. asbestos mines closing.",
      "Judgement: geology explains where minerals occur, but economic and political factors explain which are mined and when.",
    ],
    levels: geographyLevels(6),
    modelAnswer: "I partly agree. Geology decides where minerals occur: gold lies in the greenstone belts of the central watershed, platinum, chrome and nickel are in the igneous rocks of the Great Dyke, and coal is only found in Karoo sedimentary basins such as Hwange. However, the pattern of mines also depends on other factors. A deposit must be large and rich enough, and close enough to the surface, to make a profit. Mines need roads, railways, electricity and water. Prices and policy matter too: asbestos mines at Zvishavane and Mashava have largely closed because demand collapsed, while lithium mines at Bikita and Arcadia expanded when prices rose. Geology explains where minerals are, but economics and politics explain where and when they are mined.",
    explanation: "Distinguish occurrence (geology) from exploitation (economics and policy), then judge.",
  });

  b.card("DEFINITION", "**Mineral**", "A natural inorganic substance with a definite chemical composition, found in the Earth's crust.", undefined);
  b.card("DEFINITION", "**Ore**", "A rock containing enough of a valuable mineral to be mined at a profit.", "Chromite is the ore of chrome.");
  b.card("CONCEPT", "Mineral groups", "Metallic (precious, ferrous, base), non-metallic and energy minerals.", "Gold = precious; chrome = ferrous; copper = base; coal = energy.");
  b.card("FACT", "The Great Dyke", "A narrow igneous intrusion about 550 km long, running roughly NNE–SSW; platinum group metals, chrome and nickel.", undefined);
  b.card("FACT", "Where gold is found", "Mainly on the greenstone belts (Kwekwe, Kadoma, Shurugwi, Gwanda, Bindura) and in river gravels.", undefined);
  b.card("FACT", "Where coal is found", "In Karoo sedimentary basins, mainly at Hwange in the north-west.", "Coal cannot form in igneous rock.");
  b.card("FACT", "Diamonds and lithium", "Diamonds: Marange (near Mutare) and Murowa (near Zvishavane). Lithium: Bikita and Arcadia.", undefined);
  b.card("CONCEPT", "Importance of minerals", "Export earnings, jobs, royalties and taxes, raw materials for industry, growth of towns and infrastructure.", undefined);
  b.card("VOCABULARY", "**Precious minerals**", "Rare, high-value minerals such as gold, platinum and diamonds.", undefined);
});
