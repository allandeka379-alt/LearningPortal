// Slice G2c: ZIMSEC Paper 2 Section B (economic geography), energy and power development (2 × 25 marks).
import { concept, P, ZIM, geographyLevels } from "../lib.mjs";

const GEN = "**Table 1: Electricity supplied in a fictional southern African country in a year of normal rainfall (Year A) and in a drought year (Year B), in gigawatt-hours (GWh) (fictional data)**\n\n| Source | Year A (GWh) | Year B (GWh) |\n|---|---|---|\n| Coal-fired stations | 4,200 | 4,700 |\n| HEP | 4,800 | 1,900 |\n| Solar | 400 | 600 |\n| Imports | 600 | 1,300 |\n| **Total** | 10,000 | 8,500 |";

const WARD = "**Table 2: Main energy sources used by 50 households in a fictional communal-area ward in Zimbabwe (fictional survey data)**\n\n| Main cooking fuel | Households | Main source of lighting | Households |\n|---|---|---|---|\n| Fuelwood | 38 | Solar lamps or panels | 27 |\n| LPG (gas) | 5 | Grid electricity | 9 |\n| Biogas | 4 | Paraffin | 8 |\n| Grid electricity | 3 | Candles | 6 |\n\n**Additional information (fictional):** women in the ward say they now walk about 6 km to collect firewood, compared with about 2 km ten years ago.";

concept("geo.energy.power-generation", { file: "exam/zim-p2-b-energy", keyPrefix: "exam.zim-p2-b-energy", applies: ZIM }, (b) => {
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", secs: 2250,
    concepts: ["geo.energy.power-generation", "geo.energy.types-sources", "geo.energy.management"],
    stem: `Study Table 1.\n\n${GEN}`,
    hints: ["Quote figures from both years.", "For the last part, use specific facts about Kariba."],
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Which source of electricity changed by the largest amount between Year A and Year B?", options: [
        ["HEP", "Correct: it fell by 2,900 GWh (4,800 to 1,900)."],
        ["Coal-fired stations", "Coal rose by only 500 GWh."],
        ["Imports", "Imports rose by 700 GWh."],
        ["Solar", "Solar rose by only 200 GWh."],
      ], answer: "A", explanation: "HEP −2,900 GWh; coal +500; imports +700; solar +200." }),
      P.num({ label: "(b)", marks: 2, unit: "%", stem: "Calculate the percentage of electricity supplied by HEP in Year A.", value: 48, tol: 0.1, wrong: [22.4, 4800], explanation: "4,800 ÷ 10,000 × 100 = 48 %." }),
      P.num({ label: "(c)", marks: 2, unit: "%", stem: "Calculate the percentage decrease in total electricity supplied between Year A and Year B.", value: 15, tol: 0.1, wrong: [17.6, 1500], explanation: "10,000 − 8,500 = 1,500 GWh; 1,500 ÷ 10,000 × 100 = 15 %." }),
      P.manual({ label: "(d)", marks: 3, stem: "Describe the changes in the country's electricity supply between Year A and Year B.", points: [
        "HEP fell sharply, from 4,800 to 1,900 GWh, and changed from the largest source to a much smaller one.",
        "Coal (4,200 to 4,700 GWh), solar (400 to 600 GWh) and imports (600 to 1,300 GWh) all increased.",
        "The increases did not make up for the fall in HEP, so total supply fell from 10,000 to 8,500 GWh.",
      ], explanation: "Three changes, each supported by figures." }),
      P.manual({ label: "(e)", marks: 4, stem: "Explain why HEP output fell in Year B and suggest how the country responded to the fall.", points: [
        "Low rainfall in the river's catchment reduced inflow, so the reservoir level fell.",
        "Less water could be released through the turbines (higher evaporation also lowered the reservoir), so output fell.",
        "The country ran its coal-fired stations harder and imported more power through interconnectors.",
        "The remaining shortfall would have been met by load shedding / more solar was added.",
      ], explanation: "Two points on the cause and two on the response, using the table." }),
      P.short({ label: "(f)", marks: 1, stem: "Name the river on which Zimbabwe's Kariba South power station stands.", accepted: ["Zambezi", "the Zambezi", "Zambezi River", "the Zambezi River", "Zambesi"], wrong: ["Limpopo"], explanation: "Kariba South is at the Kariba Dam on the **Zambezi**." }),
      P.manual({ label: "(g)", marks: 3, stem: "With reference to Hwange, state **three** factors that influence the siting of a coal-fired power station.", points: [
        "Close to a coalfield, because coal is bulky and expensive to transport (Hwange coalfield).",
        "A large supply of cooling water (piped from the Zambezi).",
        "Flat, stable land for the station, coal stockpiles and ash dumps / rail links (Bulawayo-Victoria Falls railway) / connection to the grid.",
      ], explanation: "Three factors, ideally linked to Hwange." }),
      P.manual({
        label: "(h)", marks: 9, type: "EXTENDED_RESPONSE",
        stem: "With reference to the Kariba scheme, evaluate the advantages and disadvantages of hydro-electric power as a source of electricity for Zimbabwe.",
        points: [
          ["Locates Kariba: dam completed 1959 in the Kariba Gorge on the Zambezi; shared with Zambia.", 1],
          ["Advantage: renewable, cheap to run, no smoke or greenhouse gases during generation.", 1],
          ["Advantage: large, low-cost supply for industry, mining and towns; saves foreign currency.", 1],
          ["Advantage: multipurpose lake: kapenta fishing, tourism, water transport.", 1],
          ["Disadvantage: displacement of tens of thousands of Tonga people to drier land.", 1],
          ["Disadvantage: flooding of woodland and habitats (Operation Noah); reservoir-induced earthquakes.", 1],
          ["Disadvantage: output depends on rainfall; droughts (e.g. 2019, 2022-2024) cut generation, causing load shedding.", 1],
          ["Disadvantage: very high building and maintenance costs (e.g. plunge-pool repairs).", 1],
          ["Judgement: e.g. valuable but unreliable on its own; needs a mix with solar and thermal.", 1],
        ],
        levels: geographyLevels(9),
        modelAnswer: "The Kariba Dam was completed in 1959 across the Kariba Gorge on the Zambezi, where a narrow gorge in solid rock allowed a short dam to hold back a huge reservoir. Zimbabwe's Kariba South station and Zambia's Kariba North Bank share its water.\n\nHEP has important advantages. It is renewable, and once the dam is built the running costs are low and there is no smoke, so Kariba has supplied cheap, clean electricity to Zimbabwe's mines, factories and towns for decades and saved foreign currency that would otherwise pay for fuel or imports. Lake Kariba also supports a kapenta fishing industry, tourism on houseboats and around Kariba town, and water transport.\n\nThe disadvantages are also serious. Tens of thousands of Tonga people were moved from their fertile riverside land to drier areas, and many communities still lack electricity. A large area of woodland and wildlife habitat was flooded, and Operation Noah could only rescue some of the animals. Filling the lake was followed by earthquakes, and the plunge pool below the spillways has needed costly repairs. Most importantly, output depends on rainfall in the Zambezi catchment: in droughts such as 2019 and 2022-2024 the water allowed for generation was cut and output fell sharply, causing long load shedding that hurt industry and households.\n\nOverall, HEP from Kariba has been very valuable to Zimbabwe because it is clean and cheap, but relying on it too heavily makes the country vulnerable to drought. It is best used as part of a mixed supply with solar power and thermal back-up.",
        explanation: "Level 3 answers use specific detail of Kariba to weigh advantages against disadvantages and reach a judgement.",
      }),
    ],
    explanation: "ZIMSEC Paper 2 Section B style question on electricity generation, the siting of power stations and HEP.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", secs: 2250,
    concepts: ["geo.energy.types-sources", "geo.energy.management", "geo.energy.power-generation"],
    stem: `Study Table 2 and the additional information.\n\n${WARD}`,
    hints: ["Percentage = part ÷ total × 100; a full circle is 360°.", "For the last part, give named examples from Zimbabwe."],
    parts: [
      P.num({ label: "(a)", marks: 1, unit: "%", stem: "Calculate the percentage of households that cook mainly with fuelwood.", value: 76, wrong: [38, 24], explanation: "38 ÷ 50 × 100 = 76 %." }),
      P.num({ label: "(b)", marks: 2, unit: "°", stem: "The lighting data are to be shown on a pie chart. Calculate the angle of the sector for solar lamps or panels, to one decimal place.", value: 194.4, tol: 0.1, answer: "194.4", wrong: [54, 97.2], explanation: "27 ÷ 50 × 360 = 194.4°." }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which source of lighting in Table 2 is renewable?", options: [
        ["Solar lamps or panels", "Correct: sunlight is naturally replaced every day."],
        ["Paraffin", "Paraffin is refined from oil, a non-renewable fossil fuel."],
        ["Candles", "Most candles are made from paraffin wax, a product of oil."],
        ["Grid electricity", "Grid power may come partly from coal, so it is not wholly renewable."],
      ], answer: "A", explanation: "Solar energy is renewable; paraffin and paraffin-wax candles come from oil." }),
      P.manual({ label: "(d)", marks: 3, stem: "Suggest **three** reasons why solar lamps or panels are the most common source of lighting in the ward.", points: [
        "Most households are not connected to the grid (only 9 use grid lighting).",
        "Zimbabwe has strong sunshine for most of the year, so solar works well.",
        "No fuel to buy after the panel or lamp is paid for, while paraffin and candles must be bought regularly / small solar kits are now cheap.",
      ], explanation: "Reasons of access, climate and cost." }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain why women now walk further to collect firewood than ten years ago.", points: [
        "Trees near the village have been cut faster than they regrow (deforestation).",
        "Because most households (76 %) depend on fuelwood and the population has grown / land has been cleared for fields.",
      ], explanation: "Link the distance to deforestation and its cause." }),
      P.manual({ label: "(f)", marks: 4, stem: "Explain the importance of energy to (i) agriculture and (ii) mining in Zimbabwe.", points: [
        "(i) Diesel for tractors and transport / electricity for irrigation pumps.",
        "(i) Coal or wood for curing tobacco / power for processing and cold storage, raising output and quality.",
        "(ii) Power for drills, hoists, ventilation and pumps that keep mines dry.",
        "(ii) Large amounts of electricity for crushing ore and smelting (e.g. ferrochrome); power cuts stop production.",
      ], explanation: "Two points for each sector." }),
      P.manual({ label: "(g)", marks: 3, stem: "Outline **three** ways in which the ward could reduce its use of fuelwood.", points: [
        "Efficient enclosed stoves that use much less wood than open fires.",
        "Biogas digesters using cattle dung.",
        "Community woodlots / solar cookers / connecting to the grid through rural electrification.",
      ], explanation: "Three practical measures." }),
      P.manual({
        label: "(h)", marks: 9, type: "EXTENDED_RESPONSE",
        stem: "Evaluate the strategies used in Zimbabwe to increase the supply of energy and to conserve it.",
        points: [
          ["Context: Kariba HEP and Hwange coal supply most electricity; shortages and load shedding; fuel imported; rural fuelwood use.", 1],
          ["Strategy: expansion of power stations (Kariba South extension; new units at Hwange).", 1],
          ["Evaluation: Hwange is not dependent on rainfall but increases pollution and emissions; Kariba still vulnerable to drought.", 1],
          ["Strategy: solar (independent power producers, rooftop panels, solar lamps) with evaluation (sunny climate; no output at night; cost).", 1],
          ["Strategy: imports through SAPP / Beira-Feruka pipeline, with evaluation (quick, but costs foreign currency; neighbours short in droughts).", 1],
          ["Strategy: rural electrification (REA) with evaluation (schools and clinics connected; costly to reach scattered homes).", 1],
          ["Conservation: prepaid meters, LED bulbs, solar water heaters, with evaluation.", 1],
          ["Conservation of fuelwood: efficient stoves, biogas, woodlots, with evaluation (reach few households; cost).", 1],
          ["Overall judgement on which strategies are most effective and sustainable.", 1],
        ],
        levels: geographyLevels(9),
        modelAnswer: "Most of Zimbabwe's electricity comes from Kariba South on the Zambezi and the coal-fired Hwange station. Droughts and breakdowns have caused long load shedding, all liquid fuel is imported, and most rural families cook with fuelwood.\n\nTo increase supply, Kariba South was extended and two new units were added at Hwange in the early 2020s. Hwange's expansion makes supply less dependent on rainfall, which matters because drought has repeatedly cut Kariba's output, but it increases air pollution and carbon dioxide emissions and depends on a non-renewable resource. Solar power is growing quickly through independent power producers and rooftop panels, and solar lamps light many rural homes. Solar suits Zimbabwe's sunny climate and is clean, but it produces nothing at night without costly batteries. Imports of electricity through the Southern African Power Pool and fuel through the Beira-Feruka pipeline fill gaps quickly, but they use scarce foreign currency, and neighbours also short of Zambezi HEP cannot always sell power in droughts. The Rural Electrification Agency has connected many schools, clinics and business centres, although connecting scattered rural homes is expensive.\n\nTo conserve energy, prepaid meters make users aware of what they use, and LED bulbs and solar water heaters cut household demand. In rural areas, efficient stoves, biogas digesters and woodlots reduce the cutting of trees, but they have reached only a small share of households because of cost and lack of awareness.\n\nOverall, expanding thermal power has done most to reduce shortages in the short term, but the most sustainable strategies are solar power combined with conservation, because they use a renewable resource and reduce demand. A mix of these strategies is needed rather than reliance on any one.",
        explanation: "Level 3 answers evaluate several named Zimbabwean strategies for both supply and conservation and reach a supported judgement.",
      }),
    ],
    explanation: "ZIMSEC Paper 2 Section B style question on energy types, rural energy use, the importance of energy and its management.",
  });
});
