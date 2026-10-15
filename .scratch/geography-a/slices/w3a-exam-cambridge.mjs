// W3a exam rows (Cambridge Paper 3 options): CAM_STRUCT10 x 6 and CAM_ESSAY20 x 6, two each for topic 7 (tropical), topic 8 (coastal) and topic 10 (arid).
// Resource data are invented for this exercise (labelled in the stems); every number is computed in code; essays use general, dated facts.
import { concept, P, chk, rnd, sum, checkExam, EXAM, geographyLevels, CAM } from "../lib.mjs";
import { tbl, MONTHS } from "../tables/w3a-_q.mjs";
import { ESSAYS } from "../tables/w3a-_essays.mjs";

// ---- Topic 7, struct 1: savanna rainfall and ENSO
const RM = [203, 176, 98, 31, 7, 1, 0, 2, 8, 44, 121, 189];
const totalM = chk(sum(RM), 880);
const wetM = chk(RM[11] + RM[0] + RM[1] + RM[2], 666);
const wetShare = rnd((wetM / totalM) * 100, 1, 75.7, "wetShare");
const RMTAB = tbl(["Month", ...MONTHS], [["Rainfall (mm)", ...RM]]);
// ---- Topic 7, struct 2: land use change
const LU = [["Intact forest", 5200, 4150], ["Cattle pasture", 800, 1450], ["Soya and other crops", 150, 410], ["Secondary growth on abandoned land", 250, 390]];
chk(sum(LU.map((r) => r[1])), 6400);
chk(sum(LU.map((r) => r[2])), 6400);
const fmt = (n) => String(n).replace(/(\d)(?=(\d{3})$)/, "$1 ");
const LUTAB = tbl(["Land cover", "1995 (thousand ha)", "2015 (thousand ha)"], LU.map((r) => [r[0], fmt(r[1]), fmt(r[2])]));
const forestFall = rnd(((5200 - 4150) / 5200) * 100, 1, 20.2, "forestFall");
// ---- Topic 8, struct 3: spit
const SPT = [[2000, 3.4], [2008, 3.88], [2016, 4.2]];
const SPTAB = tbl(["Year", "Length of spit (km)"], SPT.map((r) => [r[0], r[1].toFixed(2)]));
const spitRate = chk(((4.2 - 3.4) * 1000) / 16, 50, 1e-9);
// ---- Topic 8, struct 4: reef bleaching
const RF = [["A (no-take zone)", 64, 42], ["B (open to fishing)", 60, 31], ["C (near a river mouth)", 53, 22]];
const RFTAB = tbl(["Site", "Coral cover before bleaching (%)", "Coral cover after bleaching (%)"], RF.map((r) => r));
const declineC = rnd(((53 - 22) / 53) * 100, 1, 58.5, "declineC");
const declineA = rnd(((64 - 42) / 64) * 100, 1, 34.4, "declineA");
const declineB = rnd(((60 - 31) / 60) * 100, 1, 48.3, "declineB");
// ---- Topic 10, struct 5: desert station
const DS = [["January", "42.8", "24.1", 6], ["April", "36.4", "17.8", 3], ["July", "31.9", "10.2", 0], ["October", "38.7", "19.6", 2]];
const DSTAB = tbl(["Month", "Mean daily maximum (°C)", "Mean daily minimum (°C)", "Mean rainfall (mm)"], DS.map((r) => r));
const julyRange = rnd(31.9 - 10.2, 1, 21.7, "julyRange");
// ---- Topic 10, struct 6: irrigation scheme
const IR = [[0, 1.2, 4.2], [5, 2.9, 3.6], [10, 5.6, 2.4], [15, 9.1, 1.1]];
const IRTAB = tbl(["Years since irrigation began", "Soil salinity (electrical conductivity, dS/m)", "Mean crop yield (t/ha)"], IR.map((r) => [r[0], r[1].toFixed(1), r[2].toFixed(1)]));
const yieldFall = rnd(((4.2 - 1.1) / 4.2) * 100, 1, 73.8, "yieldFall");

const BASE = { d: 4, skill: EXAM.CAM_STRUCT10.skill, secs: EXAM.CAM_STRUCT10.secs, examStyle: true, paper: "Paper 3", applies: EXAM.CAM_STRUCT10.applies };

concept("ageo.tropical.climates", { file: "exam/w3a-cambridge", keyPrefix: "exam.w3a-cambridge", applies: CAM }, (b) => {
  // ====================================================== TOPIC 7, STRUCT 1: climate
  b.struct({
    ...BASE,
    concepts: ["ageo.tropical.climates"],
    hints: ["In (a)(i) add the four rainiest months and divide by the annual total.", "In (c) link the El Niño effect to rainfall, crops and livestock."],
    stem: `Insert, Table 1 shows the mean monthly rainfall at a station in a seasonally humid tropical area in the southern hemisphere (data invented for this exercise).\n\n${RMTAB}`,
    parts: checkExam(EXAM.CAM_STRUCT10, [
      P.group({
        label: "(a)", stem: "Use Table 1.",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "Calculate the percentage of the annual rainfall that falls from December to March, to one decimal place.", value: wetShare, dp: 1, unit: "%", wrong: [666, 24.3, 73.2],
            explanation: "December to March: 189 + 203 + 176 + 98 = 666 mm. The annual total is 880 mm. 666 ÷ 880 × 100 = 75.7%. The value 666 is the rainfall, not the percentage." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "What causes the rain from December to March?", options: [
            ["The ITCZ moves overhead and air rises", "Correct: convergence and rising air give convectional rain."],
            ["Descending air in the subtropical anticyclone", "Descending air gives dry conditions."],
            ["Cold air from the poles moving over the area", "Cold polar air is not the cause of the tropical wet season."],
            ["A cold ocean current along the coast", "A cold current would reduce rainfall."],
          ], answer: "A", explanation: "The ITCZ is over the area in the high-Sun season, giving the wet season." }),
        ],
      }),
      P.group({
        label: "(b)", stem: "Explain the dry season shown in Table 1.",
        parts: [
          P.mcq({ label: "(i)", marks: 1, stem: "Which pressure system is likely to dominate the station in June and July?", options: [
            ["The subtropical high-pressure belt", "Correct: it brings sinking, stable air."],
            ["The Intertropical Convergence Zone", "The ITCZ has moved away from the station."],
            ["A tropical cyclone", "Tropical cyclones are features of the wet season."],
            ["A monsoon low", "A monsoon low belongs to the rainy season."],
          ], answer: "A", explanation: "In the low-Sun season the ITCZ is far away and high pressure dominates." }),
          P.manual({ label: "(ii)", marks: 2, stem: "Explain how this pressure system produces a dry season.",
            points: [
              "Air sinks in the Hadley cell and warms by compression, so its relative humidity falls and cloud dissolves.",
              "Winds blow outward from the high pressure, so moist air does not enter, and the skies are clear with little rain.",
            ],
            modelAnswer: "Air sinks and warms by compression, so its relative humidity falls and cloud dissolves. Winds blow outward from the high pressure, so moist air does not enter, and the skies are clear with little rain.",
            explanation: "Sinking air warms, so cloud and rain do not form." }),
        ],
      }),
      P.manual({ label: "(c)", marks: 4, stem: "Suggest how a strong El Niño might affect the rainfall at this station and the people who depend on it.",
        points: [
          "An El Niño often brings a drier and shorter rainy season to southern Africa, so the totals from December to March could be well below those in Table 1.",
          "A late start or a long dry spell during the rains would cause crops such as maize to fail and reduce harvests.",
          "Pasture and drinking water for livestock would be scarcer, so cattle would lose condition or die.",
          "Household incomes would fall and food would be short, so people might need food aid or move to find work, and the government might declare a drought disaster.",
        ],
        modelAnswer: "An El Niño often brings a drier and shorter rainy season to southern Africa, so the rainfall from December to March could be well below that in Table 1. A late start or a long dry spell would cause crops such as maize to fail. Pasture and drinking water for livestock would be scarcer, so cattle could lose condition or die. Incomes would fall and food would be short, so people might need food aid or move to find work.",
        explanation: "Link reduced rainfall to crops, livestock and livelihoods." }),
    ]),
    explanation: "Interpret a rainfall table, explain the wet and dry seasons and suggest the effects of El Niño.",
  });

  // ====================================================== TOPIC 7, STRUCT 2: land use change
  b.struct({
    ...BASE,
    concepts: ["ageo.tropical.vegetation-soils", "ageo.tropical.challenges"],
    hints: ["In (a)(i): fall ÷ original × 100.", "In (b) think about where the nutrients were stored before clearance.", "In (c) consider both an action and why it helps."],
    stem: `Insert, Table 1 shows land cover in a rainforest region in 1995 and 2015 (data invented for this exercise).\n\n${LUTAB}`,
    parts: checkExam(EXAM.CAM_STRUCT10, [
      P.group({
        label: "(a)", stem: "Use Table 1.",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "Calculate the percentage fall in the area of intact forest between 1995 and 2015, to one decimal place.", value: forestFall, dp: 1, unit: "%", wrong: [1050, 25.3, 79.8],
            explanation: "Fall = 5 200 − 4 150 = 1 050 thousand ha. 1 050 ÷ 5 200 × 100 = 20.2%. The value 25.3 divides by the 2015 figure." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "Which land cover increased by the largest percentage between 1995 and 2015?", options: [
            ["Soya and other crops", "Correct: from 150 to 410, an increase of 173%."],
            ["Cattle pasture", "Pasture increased by 81%."],
            ["Secondary growth on abandoned land", "Secondary growth increased by 56%."],
            ["Intact forest", "Intact forest decreased."],
          ], answer: "A", explanation: "Crops: (410 − 150) ÷ 150 × 100 = 173%, more than pasture (81%) or secondary growth (56%)." }),
        ],
      }),
      P.group({
        label: "(b)", stem: "Explain why the area of secondary growth on abandoned land has increased.",
        parts: [
          P.mcq({ label: "(i)", marks: 1, stem: "Why are cleared fields and pastures on rainforest soils often abandoned after a few years?", options: [
            ["The nutrients were held in the forest biomass and have been lost", "Correct: the soil has few reserves and heavy rain leaches the rest."],
            ["The soil becomes too rich in humus for the grass to grow", "Humus is thin in rainforest soils."],
            ["The rainfall stops after the trees have been removed", "Heavy rain continues."],
            ["The soil is too shallow for the roots of the crops", "Oxisols are very deep."],
          ], answer: "A", explanation: "Clearing removes the biomass, which held most of the nutrients." }),
          P.manual({ label: "(ii)", marks: 2, stem: "Explain how this leads to secondary growth.",
            points: [
              "After the land is abandoned, fast-growing pioneer species colonise the bare ground.",
              "These form a secondary forest, which has fewer species and a simpler structure than the original forest.",
            ],
            modelAnswer: "After abandonment fast-growing pioneer species colonise the bare ground. They form a secondary forest, which has fewer species and a simpler structure than the original forest.",
            explanation: "Succession starts with pioneer species on abandoned land." }),
        ],
      }),
      P.manual({ label: "(c)", marks: 4, stem: "Suggest ways of slowing the loss of intact forest and assess one limitation of them.",
        points: [
          "Use satellite monitoring with fines to enforce limits on illegal clearance, as in the Brazilian Amazon from 2004.",
          "Create protected areas and Indigenous territories, which usually have lower clearance than unprotected land.",
          "Supply-chain agreements such as the Soy Moratorium discourage the purchase of crops grown on newly cleared land.",
          "Limitation: remote areas are hard to patrol, enforcement depends on political support, and clearance can move to unprotected areas (for example the Cerrado savanna).",
        ],
        modelAnswer: "Satellite monitoring with fines can enforce limits on illegal clearance, as in the Brazilian Amazon from 2004. Protected areas and Indigenous territories usually have lower clearance than unprotected land. Supply-chain agreements such as the Soy Moratorium discourage the purchase of crops grown on newly cleared land. A limitation is that remote areas are hard to patrol, enforcement depends on political support and clearance can move to unprotected areas such as the Cerrado.",
        explanation: "Name two or three strategies and one limit." }),
    ]),
    explanation: "Interpret land-use change, explain abandonment and suggest and assess management.",
  });

  // ====================================================== TOPIC 8, STRUCT 3: spit
  b.struct({
    ...BASE,
    concepts: ["ageo.coastal.depositional-landforms", "ageo.coastal.waves-erosion-transport"],
    hints: ["Convert the extension from km to m before dividing by the number of years.", "In (c) think about what happens to the sediment supply when drift is interrupted."],
    stem: `Insert, Table 1 shows the length of a sand spit at the mouth of an estuary (data invented for this exercise).\n\n${SPTAB}`,
    parts: checkExam(EXAM.CAM_STRUCT10, [
      P.group({
        label: "(a)", stem: "Use Table 1.",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "Calculate the mean rate of extension of the spit between 2000 and 2016, in metres per year.", value: spitRate, wrong: [0.05, 800, 12.5],
            explanation: "Extension = 4.20 − 3.40 = 0.80 km = 800 m. 800 ÷ 16 = 50 m per year. The value 800 is the total extension." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "Which process carries sediment along the coast to build the spit?", options: [
            ["Longshore drift", "Correct: swash and backwash at an angle move sediment along the shore."],
            ["Rotational slumping", "Slumping is a mass movement on cliffs."],
            ["Freeze–thaw", "Freeze–thaw is a weathering process."],
            ["Solution", "Solution dissolves soluble rock."],
          ], answer: "A", explanation: "Longshore drift transports the sand along the coast." }),
        ],
      }),
      P.group({
        label: "(b)", stem: "Explain the features of the spit.",
        parts: [
          P.mcq({ label: "(i)", marks: 1, stem: "Why does the free end of a spit often curve towards the land?", options: [
            ["Refraction and waves from a second direction bend the tip", "Correct: the recurved end forms where secondary waves act."],
            ["The river pushes the sand in a spiral", "The river keeps the channel open but does not make the hook."],
            ["Cliff erosion adds sediment to the tip", "Cliffs are not at the tip."],
            ["Tides always flow in one direction around the tip", "Tides flow both ways."],
          ], answer: "A", explanation: "Refraction and secondary waves curve the tip." }),
          P.manual({ label: "(ii)", marks: 2, stem: "Explain why saltmarsh can develop behind the spit.",
            points: [
              "The spit shelters the water behind it from waves, giving a low-energy environment where fine silt and clay settle.",
              "Salt-tolerant plants such as glasswort and cord grass colonise the mud and trap more sediment, building up the marsh.",
            ],
            modelAnswer: "The spit shelters the water behind it from waves, giving a low-energy environment where fine silt and clay settle. Salt-tolerant plants such as glasswort and cord grass colonise the mud and trap more sediment.",
            explanation: "Shelter allows fine sediment to settle, and halophytes trap it." }),
        ],
      }),
      P.manual({ label: "(c)", marks: 4, stem: "Suggest how a new harbour wall built updrift could change the growth of the spit, and assess whether the change would be important.",
        points: [
          "The wall would interrupt longshore drift and trap sediment on its updrift side, so less sediment would reach the spit.",
          "The spit would stop growing and might shorten, because waves would remove sediment faster than the drift replaced it.",
          "The saltmarsh and the sheltered estuary behind could be exposed to waves and be eroded, and the breach risk would increase in storms.",
          "Assessment: the change would be important if people or habitats depend on the spit; the effects can be reduced by sediment bypassing or nourishment.",
        ],
        modelAnswer: "The wall would interrupt longshore drift and trap sediment updrift, so less sediment would reach the spit. The spit would stop growing and might shorten, because waves would remove sediment faster than the drift replaced it. The saltmarsh and the sheltered estuary behind could be exposed to waves and be eroded, and the risk of breaching in storms would increase. The change would be important if people or habitats depend on the spit, but sediment bypassing or nourishment could reduce the effects.",
        explanation: "Interrupted drift starves the spit and exposes the sheltered area." }),
    ]),
    explanation: "Calculate spit growth, explain features and suggest and assess the effect of a harbour wall.",
  });

  // ====================================================== TOPIC 8, STRUCT 4: coral reef
  b.struct({
    ...BASE,
    concepts: ["ageo.coastal.coral-reefs"],
    hints: ["Relative fall = (before − after) ÷ before × 100.", "In (c) use the data for sites A, B and C."],
    stem: `Insert, Table 1 shows live coral cover at three sites on the same reef before and after a mass bleaching event (data invented for this exercise).\n\n${RFTAB}`,
    parts: checkExam(EXAM.CAM_STRUCT10, [
      P.group({
        label: "(a)", stem: "Use Table 1.",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "Calculate the percentage fall in coral cover at Site C, to one decimal place.", value: declineC, dp: 1, unit: "%", wrong: [31, 140.9, 41.5],
            explanation: "Fall = 53 − 22 = 31 percentage points. 31 ÷ 53 × 100 = 58.5%. The value 31 is the fall in percentage points." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "Which site had the smallest percentage fall in coral cover?", options: [
            ["Site A", "Correct: a fall of 34.4%."],
            ["Site B", "Site B fell by 48.3%."],
            ["Site C", "Site C fell by 58.5%."],
            ["All three had the same fall", "The falls were 34.4%, 48.3% and 58.5%."],
          ], answer: "A", explanation: "Site A: (64 − 42) ÷ 64 × 100 = 34.4%, which is lower than B (48.3%) or C (58.5%)." }),
        ],
      }),
      P.group({
        label: "(b)", stem: "Explain the bleaching event.",
        parts: [
          P.mcq({ label: "(i)", marks: 1, stem: "What is the main cause of mass coral bleaching?", options: [
            ["Unusually warm sea water", "Correct: heat stress makes corals expel their zooxanthellae."],
            ["An increase in the depth of the sea", "Greater depth reduces light but does not cause bleaching."],
            ["A rise in the number of grazing fish", "Grazers help the reef."],
            ["Waves breaking on the surface of the reef", "Waves help to oxygenate the reef."],
          ], answer: "A", explanation: "Warm water stresses coral, which expels its algae." }),
          P.manual({ label: "(ii)", marks: 2, stem: "Explain how bleaching harms the coral.",
            points: [
              "The coral expels its zooxanthellae and loses its colour and its main source of food from photosynthesis.",
              "The starved coral is weakened and may die if the stress lasts, after which algae overgrow the skeleton.",
            ],
            modelAnswer: "The coral expels its zooxanthellae and loses its colour and its main source of food. The starved coral is weakened and may die if the stress lasts, and then algae overgrow the skeleton.",
            explanation: "Loss of the algae starves the coral." }),
        ],
      }),
      P.manual({ label: "(c)", marks: 4, stem: "Assess how far the data support the view that protection from fishing helps coral to resist bleaching.",
        points: [
          "Site A, in the no-take zone, lost the smallest share of its coral (34.4%), compared with 48.3% at Site B, which is open to fishing.",
          "This supports the view that protection helps: healthier fish populations, including grazers, may keep algae in check and reduce other stresses.",
          "But Site A also started with the highest cover and the data cover only three sites, one event and no evidence of cause, so the sample is too small to prove it.",
          "Site C shows that local pollution and sediment from a river can outweigh the benefit, and protection cannot stop warming, so it helps resilience but does not prevent bleaching.",
        ],
        modelAnswer: "Site A, in the no-take zone, lost the smallest share of its coral, 34.4%, compared with 48.3% at Site B, which is open to fishing. This supports the view that protection helps, since healthier fish populations may keep algae in check and reduce other stresses. But Site A also started with the highest cover, and the data cover only three sites and one event, so they cannot prove the cause. Site C shows that pollution and sediment from a river can outweigh the benefit, and protection cannot stop warming, so it improves resilience but does not prevent bleaching.",
        explanation: "Use the data for and against, and note the limits of the evidence." }),
    ]),
    explanation: "Calculate changes in coral cover, explain bleaching and assess the evidence for protection.",
  });

  // ====================================================== TOPIC 10, STRUCT 5: desert climate
  b.struct({
    ...BASE,
    concepts: ["ageo.arid.climates-causes", "ageo.arid.weathering-wind"],
    hints: ["Diurnal range = maximum − minimum for the same month.", "In (c) link the unreliable rainfall to the causes of the climate."],
    stem: `Insert, Table 1 shows mean temperature and rainfall for four months at a station in a hot desert (data invented for this exercise).\n\n${DSTAB}`,
    parts: checkExam(EXAM.CAM_STRUCT10, [
      P.group({
        label: "(a)", stem: "Use Table 1.",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "Calculate the difference between the mean daily maximum and minimum temperatures in July, in °C to one decimal place.", value: julyRange, dp: 1, unit: "°C", wrong: [42.1, 10.2, 18.7],
            explanation: "31.9 − 10.2 = 21.7 °C. The value 42.1 adds the two temperatures." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "In which of the four months is this difference greatest?", options: [
            ["July", "Correct: 21.7 °C, compared with 18.7 °C in January, 18.6 °C in April and 19.1 °C in October."],
            ["January", "January has a range of 18.7 °C."],
            ["April", "April has a range of 18.6 °C."],
            ["October", "October has a range of 19.1 °C."],
          ], answer: "A", explanation: "The ranges are 18.7 (January), 18.6 (April), 21.7 (July) and 19.1 (October) °C." }),
        ],
      }),
      P.group({
        label: "(b)", stem: "Explain the climate shown in Table 1.",
        parts: [
          P.mcq({ label: "(i)", marks: 1, stem: "What is the main reason for the large daily range of temperature?", options: [
            ["Clear skies and dry air allow rapid heating and cooling", "Correct: there is little cloud or water vapour to trap heat."],
            ["Heavy cloud traps the heat at night", "Deserts have little cloud."],
            ["The sea keeps the temperature of the air steady", "The desert interior is far from the sea."],
            ["Frequent rain cools the surface in the day", "Rain is rare in deserts."],
          ], answer: "A", explanation: "Clear, dry air gives strong heating by day and rapid loss of heat by night." }),
          P.manual({ label: "(ii)", marks: 2, stem: "Explain why the annual rainfall is so low.",
            points: [
              "The station lies beneath the subtropical high-pressure belt, where air sinks and warms by compression, so cloud does not form.",
              "Winds from the high pressure are dry, and it is far from the moisture of the sea (or a cold current cools and stabilises the air).",
            ],
            modelAnswer: "The station lies beneath the subtropical high-pressure belt, where air sinks and warms by compression, so cloud does not form. The winds are dry, and the station is far from the sea, or a cold current cools and stabilises the air.",
            explanation: "Sinking air and dry winds prevent rain." }),
        ],
      }),
      P.manual({ label: "(c)", marks: 4, stem: "Suggest how the temperature range and the occasional rainfall shown in Table 1 help to break down rock at the surface.",
        points: [
          "The large daily range causes repeated expansion and contraction of the rock surface, setting up stresses that may crack it (thermal fracture and exfoliation).",
          "The rare rain or dew provides moisture that helps chemical weathering (hydrolysis or carbonation) and makes thermal fracture more effective.",
          "Water that enters pores evaporates in the heat, leaving salt crystals that grow and force the rock apart (salt crystal growth).",
          "The effects are slow because the rainfall is so small, but loosened grains are then moved by wind, which exposes fresh rock.",
        ],
        modelAnswer: "The large daily range causes repeated expansion and contraction of the rock surface, setting up stresses that may crack it. The rare rain or dew provides moisture that helps chemical weathering and makes thermal fracture more effective. Water that enters pores evaporates in the heat, leaving salt crystals that grow and force the rock apart. The effects are slow because rainfall is so small, but loosened grains are moved by wind, which exposes fresh rock.",
        explanation: "Thermal stress, moisture and salt crystal growth break down the rock." }),
    ]),
    explanation: "Interpret desert temperatures, explain the climate and suggest the effect on weathering.",
  });

  // ====================================================== TOPIC 10, STRUCT 6: irrigation and salinity
  b.struct({
    ...BASE,
    concepts: ["ageo.arid.vegetation-soils", "ageo.arid.challenges"],
    hints: ["Fall ÷ original × 100.", "In (c) weigh cost, effectiveness and who benefits."],
    stem: `Insert, Table 1 shows soil salinity and crop yield on an irrigation scheme in a dry area (data invented for this exercise).\n\n${IRTAB}`,
    parts: checkExam(EXAM.CAM_STRUCT10, [
      P.group({
        label: "(a)", stem: "Use Table 1.",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "Calculate the percentage fall in the mean crop yield between the start of irrigation and 15 years later, to one decimal place.", value: yieldFall, dp: 1, unit: "%", wrong: [3.1, 26.2, 85.6],
            explanation: "Fall = 4.2 − 1.1 = 3.1 t/ha. 3.1 ÷ 4.2 × 100 = 73.8%. The value 3.1 is the fall in t/ha." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "Which process most probably raised the soil salinity?", options: [
            ["Evaporation of irrigation water, which leaves the salts behind", "Correct: poor drainage lets salts accumulate."],
            ["Leaching of salts by heavy rain", "Rainfall is low in dry areas and does not leach salts."],
            ["Deposition of salt by the roots of the crops", "Roots do not add salt to the soil."],
            ["Wind erosion of the surface layer of the soil", "Wind erosion does not add salt."],
          ], answer: "A", explanation: "Irrigation water contains salts that remain when the water evaporates." }),
        ],
      }),
      P.group({
        label: "(b)", stem: "Explain the decline in crop yield.",
        parts: [
          P.mcq({ label: "(i)", marks: 1, stem: "What is the name for a situation in which plants cannot take up water from a very salty soil even though water is present?", options: [
            ["Physiological drought", "Correct: the high salt concentration prevents water uptake by osmosis."],
            ["Physical drought", "Physical drought is a lack of water."],
            ["Waterlogging", "Waterlogging is the lack of air in saturated soil."],
            ["Leaching", "Leaching is the washing out of soluble material."],
          ], answer: "A", explanation: "In salty soil water does not move into the roots, so plants suffer physiological drought." }),
          P.manual({ label: "(ii)", marks: 2, stem: "Explain how salinity reduces crop yields.",
            points: [
              "High salt concentration in the soil water reduces the ability of the roots to take up water by osmosis, so the crops are short of water.",
              "Salt can be toxic to many crops, and in sodic soils the clay disperses, which makes the soil hard and impermeable, so growth and yields are reduced.",
            ],
            modelAnswer: "High salt concentration in the soil water reduces the ability of the roots to take up water by osmosis, so crops are short of water. Salt can also be toxic to many crops, and in sodic soils the clay disperses, which makes the soil hard and impermeable, so growth and yields are reduced.",
            explanation: "Osmotic stress, toxicity and damage to the soil structure." }),
        ],
      }),
      P.manual({ label: "(c)", marks: 4, stem: "Assess the effectiveness of two measures that could reduce salinisation on the scheme.",
        points: [
          "Improving drainage and applying extra water to flush salts below the root zone (leaching) can lower the salinity, but it needs a safe place for the salty drainage water and uses more water.",
          "Drip irrigation applies water at the roots in small amounts, which reduces evaporation and avoids raising the water table, but it is costly to install for poor farmers.",
          "Salt-tolerant crops or deep-rooted trees can use the saline soil or lower the water table, but they offer a lower income or take years to work.",
          "Judgement: a combination of drainage and efficient irrigation is the most effective, because it tackles the cause (excess water and evaporation), while cost and training limit its use.",
        ],
        modelAnswer: "Improving drainage and applying extra water to flush salts below the root zone can lower salinity, but it needs a safe place for the salty drainage water and uses more water. Drip irrigation applies water at the roots in small amounts, which reduces evaporation and avoids raising the water table, but it is costly to install for poor farmers. Salt-tolerant crops or deep-rooted trees can use the saline soil or lower the water table, but they offer a lower income or take years to work. A combination of drainage and efficient irrigation is the most effective, because it tackles the cause, although cost and training limit its use.",
        explanation: "Weigh effectiveness against cost and conditions, then judge." }),
    ]),
    explanation: "Calculate a fall in yield, explain salinity and assess management.",
  });

  // ====================================================== CAM_ESSAY20 x 6
  for (const e of ESSAYS) {
    if (e.points.length !== 20) throw new Error(`${e.key}: ${e.points.length} points`);
    const words = e.modelAnswer.split(/\s+/).length;
    if (words < 600 || words > 800) throw new Error(`${e.key}: model answer has ${words} words`);
    b.ext({
      d: 4, marks: 20, skill: "EVALUATION", examStyle: true, secs: EXAM.CAM_ESSAY20.secs, paper: "Paper 3", applies: EXAM.CAM_ESSAY20.applies,
      concepts: e.concepts, hints: e.hints, stem: e.stem, points: e.points,
      levels: geographyLevels(20), wordLimit: e.wordLimit, modelAnswer: e.modelAnswer,
      explanation: "A detailed specific example, both sides of the argument, evaluation against criteria and a supported judgement.",
    });
  }
});
