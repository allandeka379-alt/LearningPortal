// Slice G2c: generating electricity and siting power stations (ZIMSEC 7.5.2; ZIMSEC only).
import { concept, P, geographyLevels } from "../lib.mjs";

const SITES = "**Table 1: Four possible sites for a new power station in a fictional country (fictional data)**\n\n| Site | Description |\n|---|---|\n| P | Narrow gorge cut in hard granite on a large river; few people live upstream |\n| Q | Flat land beside a coalfield, 8 km from a large river; a railway passes nearby |\n| R | Open, flat plain with about 3,200 hours of sunshine a year, 5 km from a power line |\n| S | Wide, flat floodplain of soft alluvium with many villages and farms |";

const OUTPUT = "**Table 2: Monthly electricity output of a fictional HEP station with an installed capacity of 800 MW (fictional data)**\n\n| Month | Average output (MW) |\n|---|---|\n| January | 520 |\n| March | 640 |\n| May | 600 |\n| July | 480 |\n| September | 360 |\n| November | 280 |";

concept("geo.energy.power-generation", { file: "energy/power-generation", keyPrefix: "energy.power-generation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In a hydro-electric power station, what turns the turbines?",
    options: [
      ["Water falling through pipes from the reservoir", "Correct: the energy of falling water spins the turbine blades."],
      ["Steam made by burning coal in a boiler", "That is how a coal-fired thermal station works."],
      ["Heat released by splitting uranium atoms", "That is how a nuclear station produces heat for steam."],
      ["Sunlight striking photovoltaic panels on the dam", "PV panels make electricity directly; they do not turn turbines."],
    ],
    answer: "A",
    explanation: "Water from the reservoir falls through penstocks, spins the turbines, and the turbines drive generators.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On which river is the Kariba Dam built?",
    options: [
      ["The Zambezi", "Correct: Kariba Dam spans the Kariba Gorge on the Zambezi."],
      ["The Limpopo", "The Limpopo forms Zimbabwe's southern border; Kariba is not on it."],
      ["The Save", "The Save drains south-eastern Zimbabwe."],
      ["The Runde", "The Runde is a tributary of the Save in the south-east."],
    ],
    answer: "A",
    explanation: "Kariba Dam (completed 1959) holds back Lake Kariba on the Zambezi, on the border with Zambia.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the **main** reason why Hwange power station was built where it is?",
    options: [
      ["It is next to a coalfield, so the bulky fuel need not be moved far", "Correct: coal is heavy and costly to transport, so the station is built beside the mine."],
      ["It is close to Harare, the largest market for electricity in Zimbabwe", "Hwange is several hundred kilometres from Harare; the grid carries the power to markets."],
      ["It stands in a gorge where a dam can store water", "A gorge suits HEP, not a coal-fired station."],
      ["It has the strongest winds in the country", "Wind is not used to generate power at Hwange."],
    ],
    answer: "A",
    explanation: "Thermal stations are usually raw-material oriented: Hwange uses coal from the neighbouring Hwange coalfield, with cooling water piped from the Zambezi.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why do coal-fired and nuclear power stations need large supplies of water?",
    options: [
      ["To make steam and to cool it back into water", "Correct: water is turned into steam to drive turbines and cooling water condenses it again."],
      ["To turn the turbines directly, as in a HEP station", "In thermal stations steam, not flowing water, drives the turbines."],
      ["To wash coal and uranium before they are sold", "Washing fuel is not the main use of water at a power station."],
      ["To irrigate the land around the power station", "Irrigation is not a function of a power station."],
    ],
    answer: "A",
    explanation: "Thermal stations boil water into steam and need very large volumes of cooling water in the condenser, so they are sited by rivers, lakes or the sea.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which feature of a site is most important for building an HEP dam?",
    options: [
      ["A narrow, deep valley with hard, impermeable rock", "Correct: a short, strong dam can hold back a large reservoir with little leakage."],
      ["A wide, flat floodplain with deep soft soils", "Soft soils give weak foundations and a wide valley needs a very long dam."],
      ["A gentle river gradient across a dry plain", "HEP needs a good head of water and a reliable flow."],
      ["A densely populated valley close to a city", "Dense population means many people must be moved when the reservoir floods."],
    ],
    answer: "A",
    explanation: "Good HEP sites have a reliable river flow, a gorge, solid impermeable rock, a basin for storage and few people to resettle.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why does Kariba South's output fall sharply in drought years?",
    options: [
      ["Less water flows into Lake Kariba, so less may be released through the turbines", "Correct: generation is limited to protect the lake level when inflow falls."],
      ["Hot weather melts the cables that leave the power station", "Heat does not melt transmission cables in this way."],
      ["Evaporation turns the lake water into steam, which cannot drive the turbines", "Evaporation removes water from the lake; steam does not reach the turbines."],
      ["Farmers pump most of the lake water away to irrigate crops", "Irrigation from Lake Kariba is small compared with the water used for power."],
    ],
    answer: "A",
    explanation: "When rainfall in the Zambezi catchment is low, the lake falls and the Zambezi River Authority cuts the water allowed for generation, for example in 2015-2016, 2019 and 2022-2024.",
    hints: ["HEP output depends on the volume of water that passes through the turbines."],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which measure reduces the **sulphur dioxide** released by a coal-fired power station?",
    options: [
      ["Fitting scrubbers that remove the gas from the chimney smoke", "Correct: scrubbers (flue-gas desulphurisation) absorb sulphur dioxide before it leaves the chimney."],
      ["Building taller cooling towers beside the turbine hall", "Cooling towers cool water; they do not clean smoke."],
      ["Planting trees around the edge of the power station", "Trees absorb some carbon dioxide but do not remove sulphur dioxide from smoke."],
      ["Running the station only at night when it is cooler", "The same amount of coal would still be burned."],
    ],
    answer: "A",
    explanation: "Scrubbers remove sulphur dioxide; electrostatic precipitators remove dust; renewables avoid burning coal altogether.",
    hints: ["Which option deals with the gas before it reaches the air?"],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A country has a coalfield, a large river with a gorge and very high sunshine. It wants a supply that keeps working during droughts **and** cuts emissions. Which combination is **best**?",
    options: [
      ["Solar farms with battery storage, backed up by the coal station", "Correct: solar keeps working in droughts and cuts emissions, with coal for night and cloudy spells."],
      ["A second HEP dam on the same river and no other new stations", "Both dams would lose output in the same drought."],
      ["Closing the coal station and relying only on HEP", "HEP alone is the source most at risk in a drought."],
      ["Building more coal stations to replace HEP entirely", "This would keep working in droughts but would raise emissions."],
    ],
    answer: "A",
    explanation: "Diversifying the energy mix spreads the risk: solar does not depend on rainfall and is clean, while thermal back-up covers nights and long cloudy periods.",
    hints: ["Check each option against both conditions: droughts and emissions."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In a thermal power station, steam is used to turn the turbines.",
    answer: true,
    explanation: "True. Burning coal or gas, nuclear fission or hot rocks provide heat that turns water into high-pressure steam, which spins the turbines.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Solar photovoltaic panels need a turbine and a generator to produce electricity.",
    answer: false,
    explanation: "False. PV cells turn sunlight directly into electricity; an inverter then changes direct current to alternating current.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sequence of how HEP is produced.",
    template: "Water falls through large pipes called {{blank:a}}, spins the {{blank:b}}, which drives a {{blank:c}} to produce electricity.",
    blanks: [
      { id: "a", accepted: ["penstocks"], choices: ["penstocks", "spillways", "boilers", "condensers"] },
      { id: "b", accepted: ["turbines"], choices: ["turbines", "transformers", "pylons", "boilers"] },
      { id: "c", accepted: ["generator"], choices: ["generator", "condenser", "reactor", "inverter"] },
    ],
    wrong: [["spillways", "transformers", "condenser"]],
    explanation: "Reservoir → intake → penstock → turbine → generator → transformer → grid.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each type of power station with its most important siting factor.",
    pairs: [
      ["HEP station", "Narrow gorge on a river with a reliable flow"],
      ["Coal-fired station", "Next to a coalfield with cooling water nearby"],
      ["Geothermal station", "Hot rocks close to the surface in a rift area"],
      ["Wind farm", "Strong, steady winds on open, exposed land"],
    ],
    explanation: "Each station is sited where its energy source is available, because that is the cheapest and most reliable arrangement.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "A fictional HEP station has an installed capacity of 750 MW. During a drought its output falls to 225 MW. Calculate the percentage fall in output.",
    value: 70, unit: "%", tol: 0.1,
    wrong: [30, 525],
    explanation: "Fall = 750 − 225 = 525 MW; 525 ÷ 750 × 100 = 70 %.",
    workedSolution: "1. Fall in output = 750 − 225 = 525 MW.\n2. Percentage fall = 525 ÷ 750 × 100 = 70 %.",
    hints: ["Find the fall first.", "Divide by the original capacity, not the new output."],
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "A fictional country has a 720 MW coal-fired station, a 380 MW HEP station and a 45 MW solar farm. Calculate its total installed capacity in megawatts.",
    value: 1145, unit: "MW",
    wrong: [1100, 765],
    explanation: "720 + 380 + 45 = 1,145 MW.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the ethnic group of people who were moved from the Zambezi valley when Lake Kariba was created.",
    accepted: ["Tonga", "the Tonga", "BaTonga", "Batonga", "Tonga people", "the Tonga people", "Ba-Tonga"],
    wrong: ["Ndebele"],
    explanation: "Tens of thousands of **Tonga** people on both sides of the Zambezi were resettled on higher, drier land when the lake filled.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how electricity is generated in a coal-fired power station.",
    points: [
      "Coal is crushed and burned in a boiler (furnace).",
      "The heat turns water into high-pressure steam.",
      "The steam spins turbines, which drive generators to make electricity.",
      "The steam is cooled and condensed back into water (cooling towers) and reused; transformers raise the voltage for the grid.",
    ],
    modelAnswer: "Coal is crushed to powder and burned in a boiler. The heat turns water in the boiler tubes into high-pressure steam, which spins the turbines. The turbines drive generators that produce electricity, and transformers raise its voltage before it enters the grid. The steam is cooled in a condenser, using water from cooling towers, and returned to the boiler.",
    explanation: "Four stages in the correct order.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** negative effects of the Kariba scheme on people or the environment.",
    points: [
      "Tens of thousands of Tonga people were resettled on drier, less fertile land.",
      "They lost their riverside fields and way of life, and many did not receive electricity or other benefits.",
      "Large areas of woodland and wildlife habitat were flooded (animals had to be rescued in Operation Noah).",
      "This reduced biodiversity / filling the lake was followed by earthquakes (reservoir-induced seismicity).",
    ],
    modelAnswer: "When the lake filled, tens of thousands of Tonga people were moved from fertile riverside land to drier areas, where farming was harder and many never received electricity from the scheme. A large area of woodland was flooded, destroying habitats; animals had to be rescued in Operation Noah, and biodiversity was lost.",
    explanation: "Two effects, each explained (2 + 2).",
    hints: ["Think of people who lived in the valley and of the land that was flooded."],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 8,
    stem: "\"The benefits of the Kariba hydro-electric scheme outweigh its costs.\" How far do you agree?",
    points: [
      ["Benefit: cheap, renewable electricity with no smoke for Zimbabwe and Zambia.", 1],
      ["Benefit: supports industry, mining and towns; saves imports of fuel or power.", 1],
      ["Benefit: kapenta fishing, tourism at Kariba, water transport.", 1],
      ["Cost: resettlement of the Tonga to poorer land; benefits not shared with them.", 1],
      ["Cost: flooded woodland and habitats; Operation Noah; changes to the river downstream.", 1],
      ["Cost: output falls in droughts (e.g. 2019, 2022-2024); load shedding.", 1],
      ["Cost: engineering risks such as plunge-pool erosion / reservoir-induced earthquakes.", 1],
      ["Judgement with a reason, e.g. benefits outweigh costs nationally but not for displaced communities.", 1],
    ],
    levels: geographyLevels(8),
    modelAnswer: "Kariba has supplied cheap electricity to Zimbabwe and Zambia since 1959. Once built, an HEP station has low running costs and produces no smoke, and Kariba South's power supports mines, factories and towns while saving foreign currency that would otherwise pay for imports. Lake Kariba also supports a commercial kapenta fishery, tourism around Kariba town and on houseboats, and water transport.\n\nHowever, the costs were heavy. Tens of thousands of Tonga people were moved from fertile riverside land to drier areas, and many communities still lack electricity, so they bore the costs while others gained the benefits. A large area of woodland and wildlife habitat was flooded, and Operation Noah could only rescue a fraction of the animals. Filling the lake was followed by earthquakes, and the plunge pool below the spillways has eroded so deeply that it needed costly repairs.\n\nThe scheme's reliability is also a weakness. In droughts such as 2019 and 2022-2024 the water allowed for generation was cut and output fell sharply, causing long load shedding that hurt industry and households.\n\nI agree that the benefits outweigh the costs for the country as a whole, because Kariba has provided clean power for over sixty years. For the displaced Tonga, however, the costs have outweighed the benefits, and the scheme's dependence on rainfall shows that Zimbabwe needs a more varied energy mix.",
    explanation: "Level 3 answers weigh specific benefits and costs of Kariba and reach a supported judgement, ideally considering different groups.",
    hints: ["Consider who gained and who lost.", "Use specific facts about Kariba, not general HEP points."],
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: `Study Table 1.\n\n${SITES}`,
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Which site is most suitable for an HEP station?", options: [
        ["Site P", "Correct: a gorge in hard rock on a large river, with few people to move."],
        ["Site Q", "Site Q suits a coal-fired station."],
        ["Site R", "Site R suits a solar farm."],
        ["Site S", "Soft alluvium and many villages make S unsuitable."],
      ], answer: "A", explanation: "Site P has a gorge, solid rock, a large river and few people upstream." }),
      P.mcq({ label: "(b)", marks: 1, stem: "Which site is most suitable for a coal-fired station?", options: [
        ["Site Q", "Correct: next to the coalfield, with cooling water and a railway close by."],
        ["Site P", "A gorge is not needed for a thermal station, and coal would have to be brought in."],
        ["Site R", "There is no coal or large water supply at R."],
        ["Site S", "Many villages would suffer from the pollution."],
      ], answer: "A", explanation: "Coal is bulky, so thermal stations are built near coalfields with water for cooling." }),
      P.manual({ label: "(c)", marks: 2, stem: "Give **two** reasons why site R is suitable for a solar farm.", points: [
        "High sunshine (about 3,200 hours a year) gives a large output.",
        "Flat, open land for rows of panels, and only 5 km from a power line, so connection is cheap.",
      ], explanation: "Use the information in Table 1." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why site S is unsuitable for any large power station.", points: [
        "Soft alluvium gives weak foundations / the floodplain may flood.",
        "Many villages and farms would have to be moved or would suffer from pollution.",
      ], explanation: "Physical and human reasons." }),
      P.manual({ label: "(e)", marks: 4, stem: "Describe **two** environmental problems a coal-fired station at site Q could cause, and suggest how each could be reduced.", points: [
        "Air pollution: smoke, dust and sulphur dioxide (acid rain, respiratory illness).",
        "Reduced by scrubbers, filters (electrostatic precipitators) or tall chimneys.",
        "Water pollution: warm cooling water or ash ponds polluting the river.",
        "Reduced by cooling towers, lined ash ponds or treating water before release / rehabilitating ash dumps.",
      ], explanation: "Problem + matching solution, twice." }),
    ],
    hints: ["Match each site to the energy source it offers.", "Each problem needs its own solution."],
    explanation: "Practice in applying siting factors to described sites.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: `Study Table 2.\n\n${OUTPUT}`,
    parts: [
      P.num({ label: "(a)", marks: 1, unit: "MW", stem: "State the range of average monthly output.", value: 360, wrong: [920], explanation: "640 − 280 = 360 MW." }),
      P.num({ label: "(b)", marks: 2, unit: "%", stem: "Calculate the output in November as a percentage of installed capacity.", value: 35, tol: 0.1, wrong: [65, 280], explanation: "280 ÷ 800 × 100 = 35 %." }),
      P.manual({ label: "(c)", marks: 2, stem: "Describe how output changes through the year.", points: [
        "Output is highest in March (640 MW) after the rainy season.",
        "It falls through the dry season to its lowest in November (280 MW).",
      ], explanation: "Describe the pattern with figures." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain the pattern you have described.", points: [
        "Rain from about November to March raises river flow and fills the reservoir.",
        "During the dry season (about April to October) inflow falls while water is still released.",
        "The reservoir level falls, so less water can be released through the turbines and output drops; evaporation adds to the loss.",
      ], explanation: "Link output to rainfall and reservoir level." }),
    ],
    hints: ["Range = highest − lowest.", "Think about Zimbabwe's wet and dry seasons."],
    explanation: "Practice in interpreting HEP output data.",
  });
  b.card("DEFINITION", "Turbine and generator", "A turbine is turned by water, steam, gas or wind; it drives a generator, in which a coil turning in a magnetic field makes electricity.");
  b.card("CONCEPT", "How HEP works", "Reservoir → intake → penstock → turbine → generator → transformer → grid. Output depends on the head and the volume of water.");
  b.card("CONCEPT", "How a coal-fired station works", "Coal burned in a boiler → steam → turbine → generator; steam condensed with cooling water and reused.");
  b.card("CONCEPT", "Siting an HEP station", "Reliable river flow, narrow gorge, hard impermeable rock, storage basin, few people to resettle, access to the grid.");
  b.card("CONCEPT", "Siting a coal-fired station", "Next to a coalfield (bulky fuel), large cooling-water supply, flat stable land, rail links, away from towns.");
  b.card("FACT", "Kariba", "Dam completed 1959 on the Zambezi; Kariba South (Zimbabwe) about 1,050 MW after extension; Tonga people resettled; Operation Noah.");
  b.card("FACT", "Hwange power station", "Coal-fired station beside the Hwange coalfield; cooling water piped from the Zambezi; two new units added in the early 2020s.");
  b.card("CONCEPT", "Reducing impacts of generation", "Scrubbers and filters, cleaner renewables, reforestation, rehabilitating mined land and ash dumps, EIA and fair resettlement.");
  b.card("VOCABULARY", "Installed capacity", "The maximum output of a power station in megawatts (MW); actual output is often lower.");
});
