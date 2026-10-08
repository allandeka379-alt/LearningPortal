// Slice G1a: Cambridge IGCSE Paper 1 (Physical Geography), topic 5 climate change (2 × 25 marks).
import { concept, P, CAM, geographyLevels } from "../lib.mjs";

const FIG1 = "**Fig. 1.1: Atmospheric carbon dioxide (approximate annual means)**\n\n| Year | CO₂ (parts per million) |\n|---|---|\n| 1960 | 317 |\n| 1980 | 339 |\n| 2000 | 370 |\n| 2020 | 414 |\n\n**Fig. 1.2: Global temperature compared with the 1951-1980 average (fictional values with a realistic trend)**\n\n| Decade | Difference (°C) |\n|---|---|\n| 1951-1960 | −0.02 |\n| 1971-1980 | +0.01 |\n| 1991-2000 | +0.36 |\n| 2011-2020 | +0.85 |";

const FIG2 = "**Fig. 2.1: Climate change strategies in a fictional MIC, 2015-2025**\n\n| Strategy | Detail |\n|---|---|\n| Solar and wind farms | Renewable share of electricity rose from 8 % to 26 % |\n| Reforestation | 120,000 hectares of degraded land replanted |\n| Bus rapid transit in the capital | Carries 300,000 passengers a day |\n| Small dams and drip irrigation | 4,500 farms supplied |\n| Early warning by mobile phone | Flood and heat alerts sent to 12 million phones |\n| Raised houses on the river floodplain | 9,000 homes rebuilt on plinths |";

concept("geo.climate-change.causes-evidence", { file: "exam/cam-p1-climate-change", keyPrefix: "exam.cam-p1-climate-change", applies: CAM }, (b) => {
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 1", secs: 2250,
    concepts: ["geo.climate-change.causes-evidence", "geo.climate-change.impacts"],
    stem: `Study Fig. 1.1 and Fig. 1.2, which show changes in carbon dioxide and global temperature.\n\n${FIG1}`,
    hints: ["Use figures from both tables in your descriptions.", "For the extended answer, choose one country or region and give specific, located detail."],
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Using Fig. 1.1, calculate the increase in carbon dioxide between 1960 and 2020.", value: 97, unit: "", wrong: [731], explanation: "414 − 317 = 97 ppm." }),
      P.mcq({ label: "(b)", marks: 1, stem: "Which statement best describes the trend in Fig. 1.1?", options: [
        ["It rose, more quickly in later decades", "Correct: +22, +31 and +44 ppm in successive 20-year periods."],
        ["It rose at a steady rate throughout", "The increase per 20 years grows from 22 to 44 ppm."],
        ["It rose, then fell back after 2000", "CO₂ continued to rise after 2000."],
        ["It stayed about the same throughout", "It rose by about 97 ppm."],
      ], answer: "A", explanation: "The rise accelerates: 22 ppm (1960-1980), 31 ppm (1980-2000), 44 ppm (2000-2020)." }),
      P.num({ label: "(c)", marks: 2, stem: "Using Fig. 1.2, calculate the change in temperature difference from 1951-1960 to 2011-2020.", value: 0.87, unit: "°C", tol: 0.005, answer: "0.87", wrong: [0.83, 0.85], explanation: "0.85 − (−0.02) = 0.87 °C." }),
      P.manual({ label: "(d)", marks: 3, stem: "Describe the relationship between Fig. 1.1 and Fig. 1.2. Use data in your answer.", points: [
        "Positive relationship: as CO₂ increases, global temperature increases.",
        "Data from both: e.g. CO₂ 317 ppm in 1960 with temperature about average; 414 ppm by 2020 with +0.85 °C.",
        "Both rise faster in later decades (temperature changed little until 1971-1980 then rose sharply).",
      ], explanation: "Credit the direction, paired data and the acceleration." }),
      P.manual({ label: "(e)", marks: 4, stem: "Explain how human activities cause the enhanced greenhouse effect.", points: [
        "Burning fossil fuels (power, transport, industry) releases carbon dioxide.",
        "Deforestation releases stored carbon and reduces CO₂ absorption.",
        "Farming releases methane (cattle, rice) and nitrous oxide (fertilisers).",
        "More greenhouse gas absorbs more outgoing long-wave radiation and re-radiates it, warming the lower atmosphere.",
      ], explanation: "Three activities with named gases plus the mechanism." }),
      P.manual({ label: "(f)", marks: 3, stem: "Explain how **one** natural factor can cause climate change.", points: [
        "Names a natural factor (orbital changes / sunspots / volcanic eruptions).",
        "Explains the mechanism (e.g. changes in orbit and tilt alter the sunlight reaching the Earth; eruption aerosols reflect sunlight).",
        "States the effect and time scale (e.g. ice ages over tens of thousands of years; cooling for 1-3 years after a large eruption).",
      ], explanation: "Credit naming, mechanism and effect." }),
      P.manual({ label: "(g)", marks: 4, stem: "Describe **two** types of evidence, other than temperature records, that show the climate is changing.", points: [
        "Evidence 1 named (e.g. ice cores / Arctic sea ice / retreating glaciers / sea-level rise / historical records).",
        "What evidence 1 shows (e.g. ice cores: CO₂ now higher than in hundreds of thousands of years).",
        "Evidence 2 named.",
        "What evidence 2 shows (e.g. glaciers on Kilimanjaro retreating; summer Arctic sea ice shrinking since 1979).",
      ], explanation: "Two marks for each type of evidence described." }),
      P.manual({
        label: "(h)", marks: 7, type: "EXTENDED_RESPONSE",
        stem: "For a named country or region, describe the present and predicted impacts of climate change.",
        points: [
          ["Named country or region with located detail (e.g. Zimbabwe: regions IV-V, Kariba, Hwange; or Bangladesh delta).", 1],
          ["Present impact on farming/food (e.g. more frequent droughts and dry spells, lower maize yields).", 1],
          ["Present impact on water/energy (e.g. low Kariba levels reducing hydro-electric power).", 1],
          ["Present impact on people/health/ecosystems (e.g. heat stress, water holes drying in Hwange, malaria spreading).", 1],
          ["Predicted impact (e.g. hotter, drier, less reliable seasons; shifting farming regions).", 1],
          ["Predicted impact on extremes (e.g. more intense droughts and floods, stronger cyclones such as Idai).", 1],
          ["Range of scales or social, economic and environmental impacts covered with specific detail.", 1],
        ],
        levels: geographyLevels(7),
        modelAnswer: "Zimbabwe, a landlocked LIC in southern Africa, is already feeling the effects of climate change. Droughts and mid-season dry spells are more frequent, especially in natural regions IV and V, so rain-fed maize yields fall and many rural households need food aid. In dry years the level of Lake Kariba falls, reducing hydro-electric power and contributing to power cuts that affect industry and homes. Water holes in Hwange National Park dry up, stressing elephants and other wildlife, and hot spells cause heat stress for people and livestock.\n\nPredictions suggest that Zimbabwe will become hotter, with less reliable rainfall and possibly a shorter rainy season. Areas now suitable for maize may become better suited to small grains and livestock, and the drier regions may expand. More intense extreme events are expected: severe droughts in El Niño years and destructive storms such as Cyclone Idai, which caused floods and landslides in Chimanimani and Chipinge in 2019. Malaria may spread to cooler highland areas. These social, economic and environmental impacts will fall hardest on poor rural farmers.",
        explanation: "Level 3 answers give specific, located present and predicted impacts across several sectors.",
      }),
    ],
    explanation: "Cambridge Paper 1 style question on evidence, causes and impacts of climate change.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, paper: "Paper 1", secs: 2250,
    concepts: ["geo.climate-change.responses", "geo.climate-change.impacts"],
    stem: `Study Fig. 2.1, which shows strategies used by a fictional MIC to manage climate change.\n\n${FIG2}`,
    hints: ["Mitigation reduces the causes; adaptation copes with the effects.", "For the extended answer, judge how well each response worked."],
    parts: [
      P.match({ label: "(a)", marks: 4, stem: "Classify four of the strategies in Fig. 2.1 as mitigation or adaptation.", pairs: [
        "Solar and wind farms",
        "Bus rapid transit in the capital",
        "Small dams and drip irrigation",
        "Raised houses on the river floodplain",
      ], right: ["Mitigation", "Adaptation"], rightIndex: [0, 0, 1, 1], explanation: "Renewables and public transport cut emissions; irrigation and raised houses help people cope." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the increase in the renewable share of electricity as a percentage of the 2015 share.", value: 225, unit: "%", wrong: [18, 26], explanation: "Increase = 26 − 8 = 18 percentage points; 18 ÷ 8 × 100 = 225 %." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain how reforestation helps to reduce climate change.", points: [
        "Growing trees absorb carbon dioxide by photosynthesis.",
        "Carbon is stored in wood and soil (a carbon sink), lowering greenhouse gas levels.",
      ], explanation: "Absorption and storage of carbon." }),
      P.manual({ label: "(d)", marks: 3, stem: "Describe the main features of the Paris Agreement (2015).", points: [
        "Aim to keep warming well below 2 °C and to try to limit it to 1.5 °C.",
        "Almost all countries set their own targets (nationally determined contributions), reviewed every five years.",
        "Richer countries to provide finance to help poorer countries mitigate and adapt.",
      ], explanation: "Goal, national pledges and finance." }),
      P.manual({ label: "(e)", marks: 3, stem: "Evaluate the use of early warning by mobile phone as a strategy for managing climate change impacts.", points: [
        "Advantage: reaches millions quickly and cheaply, giving time to evacuate or protect property.",
        "Limitation: people without phones, signal or literacy may miss alerts; networks can fail in disasters.",
        "Judgement: effective at saving lives but does not reduce damage to property or the causes of change.",
      ], explanation: "Credit an advantage, a limitation and a judgement." }),
      P.manual({ label: "(f)", marks: 4, stem: "Explain why it is difficult to reach and keep international agreements on climate change.", points: [
        "Countries disagree about who should cut most (HICs' historical emissions versus rising emissions of MICs).",
        "LICs and MICs want to develop and use cheap fossil fuels; cutting emissions can be costly.",
        "Targets are often voluntary or not enforced; countries can withdraw or miss them.",
        "Benefits are global and long-term, while costs are national and immediate.",
      ], explanation: "Credit four developed reasons." }),
      P.manual({
        label: "(g)", marks: 7, type: "EXTENDED_RESPONSE",
        stem: "For a named country or region, evaluate the responses to the impacts of climate change.",
        points: [
          ["Named country or region with located context (e.g. Bangladesh's low delta, or Zimbabwe's drought-prone south).", 1],
          ["Response 1 described with detail (e.g. cyclone shelters and volunteer warnings / Pfumvudza conservation farming).", 1],
          ["Response 1 evaluated (success and limitation).", 1],
          ["Response 2 described with detail (e.g. embankments and mangroves / irrigation and small dams).", 1],
          ["Response 2 evaluated (success and limitation).", 1],
          ["Further response or national/international link (e.g. salt-tolerant crops, NDCs, aid funding).", 1],
          ["Overall judgement on effectiveness with justification.", 1],
        ],
        levels: geographyLevels(7),
        modelAnswer: "Bangladesh lies largely on the low delta of the Ganges and Brahmaputra and faces rising seas, stronger storm surges and salt water entering farmland.\n\nThe country has built thousands of raised concrete cyclone shelters, many doubling as schools, and a large volunteer network spreads warnings by loudspeaker and radio. This has been very successful: cyclone death tolls are far lower than in the 1970s. However, some people are reluctant to leave homes and animals, and shelters can be overcrowded.\n\nEarth embankments protect farmland and villages, and mangroves are planted along the coast to absorb wave energy. These reduce flooding, but embankments are costly to maintain and can be breached in severe storms. Farmers have adopted salt-tolerant rice and floating gardens, which protect food supplies, though yields can be lower.\n\nOverall, Bangladesh's adaptation has been effective at saving lives, but it is less successful at protecting livelihoods and depends on foreign aid. Because its own emissions are tiny, its long-term future depends on global mitigation that it cannot control.",
        explanation: "Level 3 answers evaluate at least two specific responses for a named place and reach a supported judgement.",
      }),
    ],
    explanation: "Cambridge Paper 1 style question on mitigation, adaptation and agreements.",
  });
});
