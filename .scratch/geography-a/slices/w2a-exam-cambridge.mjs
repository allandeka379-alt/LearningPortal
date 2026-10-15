// W2a exam rows (Cambridge): CAM_SECTION_A x 3 and CAM_ESSAY15 x 3 for AS topic 1 (hydrology, river processes and hazards), topic 3 (earth
// processes and mass movements) and topic 5 (water resources and management), all Paper 1 except topic 5 which is set in Paper 2.
// Resource data are invented for this exercise (labelled in the stems); every number is computed in code. Real-world facts (Room for the
// River, Pakistan 2022, Lesotho Highlands, Cape Town 2018, plate speeds) are general and dated; to be verified by a reviewer.
import { concept, P, chk, checkExam, EXAM, geographyLevels, CAM } from "../lib.mjs";
import { tbl } from "../tables/w2a-_q.mjs";

const BASE = (plan, paper) => ({ d: 4, skill: plan.skill, secs: plan.secs, examStyle: true, paper, applies: plan.applies });

// ---- Section A, topic 1: two basins, same storm
const rainVol = chk(0.04 * 150e6, 6.0e6, 1e-9) / 1e6; // 6.0 million m3
const runX = chk(rainVol * 0.55, 3.3, 1e-9);
const T1 = tbl(["", "Basin X (60% built-up)", "Basin Y (80% forest)"], [
  ["Basin area (km²)", 150, 150], ["Rainfall in the storm (mm)", 40, 40], ["Peak discharge (m³/s)", 90, 36],
  ["Lag time (hours)", 2, 7], ["Runoff as a percentage of rainfall (%)", 55, 12],
]);

// ---- Section A, topic 3: four landslides
const meanRain = chk((140 + 95 + 160 + 125) / 4, 130, 1e-9);
const T3 = tbl(["Slide", "Rainfall in previous 48 h (mm)", "Slope angle (°)", "Land cover", "Material moved (thousand m³)"], [
  ["L1", 140, 34, "Forest cleared for farming", 48], ["L2", 95, 38, "Natural forest", 12],
  ["L3", 160, 30, "Slope cut for a road", 75], ["L4", 125, 26, "Terraced farmland", 8],
]);

// ---- Section A, topic 5: Country P water
const perPerson2020 = chk(12e9 / 15e6, 800, 1e-9);
const agriKm3 = chk(0.72 * 6.0, 4.32, 1e-9);
const T5 = tbl(["Indicator for Country P", "2000", "2020"], [
  ["Population (millions)", 8, 15], ["Renewable water resources (km³ a year)", 12, 12],
  ["Total water withdrawals (km³ a year)", 3.5, 6.0], ["Share of withdrawals used by agriculture (%)", 70, 72],
]);

concept("ageo.hydro.river-floods", { file: "exam/w2a-cambridge", keyPrefix: "exam.w2a-cambridge", applies: CAM }, (b) => {
  // ============================================================ CAM_SECTION_A: topic 1
  b.struct({
    ...BASE(EXAM.CAM_SECTION_A, "Paper 1"),
    concepts: ["ageo.hydro.drainage-basin-system", "ageo.hydro.hydrographs-morphometry", "ageo.hydro.river-floods"],
    hints: ["In (a)(i) first find the volume of rain that fell on the basin: 40 mm over 150 km².", "In (c) set the human factors against physical factors such as rainfall, relief and rock."],
    stem: "Insert, Table 1 shows the response of two drainage basins of the same size to the same storm (data invented for this exercise).\n\n" + T1,
    parts: checkExam(EXAM.CAM_SECTION_A, [
      P.group({
        label: "(a)", stem: "Use Table 1.",
        parts: [
          P.num({ label: "(i)", marks: 2, type: "CALCULATION", stem: "Calculate the volume of runoff from Basin X, in millions of m³. (A rainfall of 40 mm over 150 km² is 6.0 million m³.)",
            value: runX, dp: 1, wrong: [6.0, 33],
            explanation: "55% of 6.0 million m³ = 0.55 × 6.0 = 3.3 million m³." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "Which statement is supported by Table 1?", options: [
            ["Basin X has a shorter lag time and a higher peak discharge", "Correct: 2 hours against 7 hours, and 90 m³/s against 36 m³/s."],
            ["Basin Y has a shorter lag time and a higher peak discharge", "Basin Y has the longer lag time and the lower peak."],
            ["Basin X has a longer lag time and a lower peak discharge", "This reverses the figures for Basin X."],
            ["Both basins have the same peak discharge because rainfall was equal", "The peaks are 90 and 36 m³/s: equal rainfall does not give equal discharge."],
          ], answer: "A", explanation: "Basin X responds faster and more strongly to the same storm." }),
        ],
      }),
      P.group({
        label: "(b)", stem: "Explain the differences between the two basins.",
        parts: [
          P.mcq({ label: "(i)", marks: 1, stem: "Which is the main reason for the shorter lag time in Basin X?", options: [
            ["Drains and impermeable surfaces carry rainwater quickly to channels", "Correct: little water infiltrates, so overland flow and drain flow reach the river fast."],
            ["Tree leaves and branches intercept the rainwater and delay its arrival", "This describes the forested Basin Y, which has the longer lag."],
            ["Deep soils store the rainwater and release it slowly as throughflow", "Built-up areas have sealed surfaces, not deep absorbent soils."],
            ["Light rain leaves more time for water to soak into the ground", "The storm was the same in both basins (40 mm)."],
          ], answer: "A", explanation: "Sealed surfaces and drains speed up the transfer of water to the channel." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "Which process makes Basin Y's runoff only 12% of the rainfall?", options: [
            ["Interception by the canopy and infiltration into the soil", "Correct: water is held on leaves and stored in the soil rather than running off."],
            ["Overland flow across paved surfaces into the nearby river channels", "This is typical of the built-up Basin X."],
            ["Direct entry of rainwater into storm drains and sewers in the town", "Forested basins have few drains."],
            ["Rapid saturation of thin soil during the storm", "A forest soil is deep and absorbent and does not saturate quickly."],
          ], answer: "A", explanation: "Forest cover increases interception, infiltration and evapotranspiration." }),
          P.manual({ label: "(iii)", marks: 2, stem: "Explain how urbanisation can increase the risk of river floods.",
            points: [
              "Roads, roofs and car parks are impermeable, so infiltration falls and a larger share of the rain becomes overland flow.",
              "Drains and sewers carry water quickly to the river, shortening the lag time and raising the peak discharge.",
            ],
            modelAnswer: "Roads, roofs and car parks are impermeable, so less rain soaks in and more runs off over the surface. Drains and sewers then carry it quickly to the river, so the lag time shortens and the peak discharge rises.",
            explanation: "Impermeable surfaces and drains speed the transfer of water to the channel." }),
        ],
      }),
      P.manual({ label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", stem: "Using Table 1 and your own knowledge, to what extent do human activities, rather than physical factors, determine the flood risk of a drainage basin?",
        points: [
          "Table 1: with the same rainfall and area, Basin X (60% built-up) has a peak 2.5 times that of Basin Y (90 against 36 m³/s) and a lag of 2 hours against 7, so land use matters.",
          "Urbanisation seals the surface and adds drains, reducing infiltration and storage, so 55% of the rain runs off in Basin X compared with 12% in Basin Y.",
          "Deforestation reduces interception and evapotranspiration and exposes soil to compaction, so more water reaches the channel quickly.",
          "Farming practices (ploughing down slopes, overgrazing, drainage of wetlands) increase runoff and sediment; sediment reduces channel capacity.",
          "Physical factors: intense or long rainfall, snowmelt and saturated antecedent conditions are the immediate trigger, whatever the land use.",
          "Relief and drainage density: steep slopes and a high drainage density produce short lag times in any land use; a rounded basin gives a higher peak than an elongated basin.",
          "Geology and soils: impermeable clay or rock gives rapid runoff, while permeable rock such as sandstone or chalk stores water and delays it.",
          "Judgement: human activity decides how severe the response to a storm is and is the most important factor in a basin where rainfall and relief are equal; but a large storm on steep, impermeable land can cause floods without any human change, so physical factors set the limits and human factors modify them.",
        ],
        levels: geographyLevels(8), wordLimit: { max: 350 },
        modelAnswer: "Human activity strongly affects flood risk, but physical factors remain the basic cause. Table 1 shows two basins of the same size receiving the same 40 mm of rain. Basin X, 60% built-up, has a peak of 90 m³/s and a lag of 2 hours, whereas Basin Y, 80% forest, has a peak of 36 m³/s and a lag of 7 hours; 55% of the rain runs off in X but only 12% in Y. Urban surfaces are sealed and drained, which cuts infiltration and sends water rapidly to the channel. Deforestation and ploughing have similar effects by reducing interception and evapotranspiration, and drained wetlands lose their storage. However, rain must fall first: long or intense storms, snowmelt or saturated soil cause floods wherever they occur, and relief, drainage density, basin shape and geology affect the response independently of people. Steep, impermeable land with a high drainage density produces short lags even when it is forested, while a permeable chalk or sandstone basin stores water. In conclusion, where physical conditions are similar, human land use largely decides how flashy the river is and so is the main controllable factor, but physical factors determine whether a flood is possible at all, so human activity modifies rather than replaces them.",
        explanation: "Weigh land-use change against rainfall, relief, drainage and geology, using the figures in Table 1, and judge." }),
    ]),
    explanation: "Interpret storm response data for two basins, explain the differences and assess human against physical causes of floods.",
  });

  // ============================================================ CAM_ESSAY15: topic 1
  b.ext({
    ...BASE(EXAM.CAM_ESSAY15, "Paper 1"), marks: 15, skill: "EVALUATION",
    concepts: ["ageo.hydro.flood-management", "ageo.hydro.river-floods"],
    hints: ["Compare hard and soft engineering with one detailed recent flood example, weigh costs and effectiveness, then conclude."],
    stem: "To what extent is hard engineering the most effective way of managing river floods?",
    points: [
      "Hard engineering uses structures: dams and reservoirs, artificial levees, channel straightening and diversion spillways; soft engineering works with natural processes: afforestation, wetland and floodplain conservation, planning and warnings.",
      "Dams and reservoirs store floodwater and release it steadily; the Three Gorges Dam has a flood-control capacity of about 22 km³, and dams can also give hydropower and irrigation.",
      "Dams are very costly, displace people (about 1.3 million for Three Gorges), trap sediment and may fail or be overwhelmed by exceptional floods.",
      "Artificial levees raise channel capacity and protect land, as on the Mississippi, but they can give false security and push floods downstream or fail when overtopped.",
      "Channel straightening speeds water away from one place but increases the flood peak downstream, so it often moves the problem.",
      "Diversion spillways such as the Bonnet Carré Spillway send surplus water to a second channel or storage, protecting a city, but need land and are opened only in extreme floods.",
      "Afforestation increases interception and infiltration and lowers the flood peak; it is cheap and has other benefits but works slowly and has little effect in an extreme storm on saturated soil.",
      "Wetland and floodplain restoration stores water; the Dutch Room for the River programme (2006 to 2019) lowered floodplains and moved dikes inland to give the river more space, after the near-disaster of 1995.",
      "Land-use planning and floodplain zoning keep development away from risk; it is cheap but difficult where cities already stand on floodplains.",
      "Forecasts and warnings from gauging stations and rainfall radar save lives and allow evacuation but do not protect buildings and depend on communications.",
      "Emergency response and recovery (rescue, shelters, aid, insurance) are essential: in Pakistan in 2022, monsoon floods killed about 1 700 people and affected some 33 million, overwhelming defences and response.",
      "Dense cities and valuable property often need hard engineering because there is no space for soft methods, whereas rural areas can use soft methods more cheaply.",
      "Level of development: poorer countries have less money for large schemes and use community-based soft methods, while richer countries can combine both.",
      "Sustainability: hard engineering needs maintenance, can harm habitats and encourages building on floodplains; soft methods are cheaper and sustainable over time but less predictable.",
      "Judgement: hard engineering is effective where property is concentrated and risks are high, but it is costly and can fail, so the most effective approach combines hard and soft methods with warnings and planning.",
    ],
    levels: geographyLevels(15), wordLimit: { min: 400, max: 600 },
    modelAnswer: "Hard engineering is effective in some places, but it is not the most effective approach everywhere, because it is costly, can move the problem and may be overwhelmed. The best results come from combining it with soft methods.\n\nHard engineering gives strong, immediate protection. Dams and reservoirs store floodwater and release it slowly; the Three Gorges Dam on the Yangtze has a flood-control capacity of about 22 km³ and also generates power. Artificial levees, as on the Mississippi, raise the capacity of the channel and protect farmland and towns. Diversion spillways such as the Bonnet Carré Spillway send surplus water to another channel to protect a city. However, the schemes are very expensive, and Three Gorges displaced about 1.3 million people and traps sediment. Levees can give a false sense of security, because if they are overtopped or breached the damage is severe, and by confining the river they can raise flood levels downstream. Straightening a channel speeds the water away from one place but increases the peak downstream. These structures also need constant maintenance and are designed for a particular flood size.\n\nSoft engineering works with natural processes. Afforestation increases interception and infiltration, and wetland and floodplain restoration provides storage. The Netherlands' Room for the River programme, carried out between 2006 and 2019 after the near-disaster of 1995 when about 250 000 people were evacuated, lowered floodplains and moved dikes inland to give the river more room. These methods are cheaper, sustainable and good for habitats, but they work slowly, need land and have limited effect in an exceptional storm. Planning controls that keep building off the floodplain are cheap, though difficult in cities already built there. Forecasts and warnings from gauging stations save lives but do not protect property.\n\nThe flood in Pakistan in 2022, when monsoon rain and glacier melt caused floods that killed about 1 700 people and affected some 33 million, shows the limits of defences: the scale overwhelmed embankments, and recovery depended on emergency aid. It also shows that a poorer country cannot afford large schemes everywhere and relies on community-based preparation.\n\nIn dense cities with valuable property, hard engineering is often the only option because there is no space for soft methods. In rural areas soft methods are cheaper and can be as effective. In conclusion, hard engineering is the most effective method only where risk and property values are high and funds are available; overall the most effective strategy is a mixture of hard and soft engineering, together with planning, forecasting and warnings, and emergency response.",
    explanation: "Weigh the strengths and limits of hard and soft methods with a recent example and judge their relative effectiveness.",
  });

  // ============================================================ CAM_SECTION_A: topic 3
  b.struct({
    ...BASE(EXAM.CAM_SECTION_A, "Paper 1"),
    concepts: ["ageo.geomorph.mass-movements"],
    hints: ["In (a)(i) add the four rainfall values and divide by four.", "In (c) include prediction, slope stability measures and emergency response, then judge how much they achieve."],
    stem: "Insert, Table 1 shows data for four slides in a mountain region after a period of heavy rain (data invented for this exercise).\n\n" + T3,
    parts: checkExam(EXAM.CAM_SECTION_A, [
      P.group({
        label: "(a)", stem: "Use Table 1.",
        parts: [
          P.num({ label: "(i)", marks: 2, type: "CALCULATION", stem: "Calculate the mean rainfall in the previous 48 hours for the four slides, in mm.",
            value: meanRain, dp: 0, unit: "mm", wrong: [520, 125],
            explanation: "(140 + 95 + 160 + 125) ÷ 4 = 520 ÷ 4 = 130 mm." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "Which statement is supported by Table 1?", options: [
            ["The largest slide occurred where the slope had been cut for a road", "Correct: L3 moved 75 thousand m³, more than any other slide."],
            ["The steepest slope produced the largest slide", "The steepest slope (L2, 38°) moved only 12 thousand m³."],
            ["Every slide followed more than 100 mm of rain in 48 hours", "L2 followed 95 mm."],
            ["The slide on natural forest moved the most material", "L2 moved the second least."],
          ], answer: "A", explanation: "L3 (road cutting) moved 75 thousand m³, the largest volume." }),
        ],
      }),
      P.group({
        label: "(b)", stem: "Explain the causes of the slides in Table 1.",
        parts: [
          P.mcq({ label: "(i)", marks: 1, stem: "How does very heavy rainfall help to trigger a slide?", options: [
            ["It adds weight and raises pore water pressure, lowering friction", "Correct: saturated material is heavier and its particles are pushed apart by water."],
            ["It dries the soil so that the particles lose their cohesion and crumble", "Rain wets the soil; it does not dry it."],
            ["It reduces the weight of soil resting on the slope", "Saturated soil is heavier, not lighter."],
            ["It increases friction by binding soil particles together", "Water pressure reduces friction between particles."],
          ], answer: "A", explanation: "Rain increases the shear stress and reduces the shear strength." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "Which is the most likely reason why L3, beside a road, moved the most material?", options: [
            ["Cutting the slope removed support at its base and exposed weak rock", "Correct: undercutting steepens the slope and removes the resisting force."],
            ["The road surface absorbed rainwater and so reduced pore water pressure in the slope", "Roads are impermeable and add runoff and drainage onto the slope."],
            ["The road surface bound the soil and added strength to the slope above it", "A road does not bind soil, and cutting removes support."],
            ["Road traffic compacted the slope and made it more stable", "Excavation and vibration weaken a slope."],
          ], answer: "A", explanation: "Slope cutting removes support and exposes weathered material." }),
          P.manual({ label: "(iii)", marks: 2, stem: "Explain how clearing forest on a slope can increase the risk of a slide.",
            points: [
              "Tree roots bind the soil and add strength; once they rot after clearing, the soil becomes weaker.",
              "Without the canopy there is less interception and transpiration, so the soil becomes wetter and more water reaches the soil, raising pore water pressure.",
            ],
            modelAnswer: "Tree roots bind the soil and anchor it to the rock beneath, so clearing removes this strength. With less interception and transpiration, the soil becomes wetter and more rain reaches it, which raises pore water pressure and makes a slide more likely.",
            explanation: "Roots add strength, and vegetation removes water from the slope." }),
        ],
      }),
      P.manual({ label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", stem: "Using Table 1 and your own knowledge, to what extent can the risk and impacts of mass movements be reduced by human management?",
        points: [
          "Table 1 shows that human changes (clearing forest, cutting a slope) were linked to the two largest slides (48 and 75 thousand m³), so careful land use can reduce the risk.",
          "Hazard mapping and planning rules keep housing and roads off unstable slopes, which is cheap but requires data and enforcement.",
          "Slope stability measures: grading and benching, rock bolts or pinning, netting and retaining walls, and drainage to remove water; they work well at small sites but are costly.",
          "Afforestation and terracing (L4 moved only 8 thousand m³) strengthen the slope with roots and slow runoff, and are cheaper than engineering.",
          "Prediction and monitoring (rain gauges and rainfall thresholds, tilt meters, remote sensing) allow warnings and evacuation, although the exact time and place are hard to predict.",
          "Emergency response (rescue, shelters, aid) reduces the number of deaths after a slide but cannot prevent the damage, and needs funds and access.",
          "Limits: heavy rainfall, earthquakes and steep, weak rock remain causes beyond human control; poorer communities may live on unstable slopes in informal settlements and have little choice.",
          "Judgement: management can greatly reduce the risk where funds, land-use control and monitoring are present, as in Hong Kong's slope safety programme, but it cannot remove the risk completely, especially after exceptional rain.",
        ],
        levels: geographyLevels(8), wordLimit: { max: 350 },
        modelAnswer: "Human management can reduce the risk and impacts of mass movements to a large extent, though not completely. In Table 1 the two largest slides, L3 (75 thousand m³) and L1 (48 thousand m³), occurred on a road cutting and on cleared forest, whereas terraced farmland (L4) moved only 8 thousand m³, which suggests that good land use matters. Planning controls and hazard maps keep buildings off unstable slopes, while grading, rock bolts, netting, retaining walls and drainage make a slope more stable; afforestation and terracing add root strength and slow the runoff more cheaply. Rainfall thresholds and monitoring allow warnings so people can be evacuated, and emergency services reduce the number of deaths. However, the engineering is costly and mainly suited to important sites such as roads and towns, prediction is uncertain, and heavy rain, earthquakes and weak rock can still trigger slides. In poorer areas people may have to live on risky slopes. In conclusion, management is effective where funds, planning and monitoring exist, as in Hong Kong, but a risk always remains after exceptional rain, so it reduces rather than removes the hazard.",
        explanation: "Weigh prediction, slope stability, planning and emergency response against the limits to management, using the table, and judge." }),
    ]),
    explanation: "Interpret data on four slides, explain their causes and assess the effectiveness of management.",
  });

  // ============================================================ CAM_ESSAY15: topic 3
  b.ext({
    ...BASE(EXAM.CAM_ESSAY15, "Paper 1"), marks: 15, skill: "EVALUATION",
    concepts: ["ageo.tectonics.plates-evidence"],
    hints: ["Explain each driving force, test it against evidence such as plate speeds, and decide which matters most or whether they are linked."],
    stem: "Assess the relative importance of slab pull, ridge push and convection currents in explaining the movement of tectonic plates.",
    points: [
      "Plates move at a few centimetres a year, from about 1 to 2 cm in the slowest plates to about 7 to 10 cm for the fastest, so the forces must be able to move rigid lithosphere over the mantle.",
      "Convection currents: heat from the core and from radioactive decay makes mantle material rise and sink slowly; early theory (Holmes) saw plates as rafts carried by the currents.",
      "Weakness of convection as a direct cause: plates move faster than the mantle below them in many cases, and flow patterns do not match the plate boundaries simply.",
      "Ridge push: new lithosphere at a mid-ocean ridge stands high (about 2 to 3 km above the older sea floor), so it slides downhill under gravity and pushes the plate away.",
      "Ridge push is a relatively small force because the slope is gentle, but it may be the main force in plates with no subducting edge, such as the North American plate at the Mid-Atlantic Ridge.",
      "Slab pull: cold, old oceanic lithosphere is denser than the mantle and sinks at subduction zones, pulling the rest of the plate behind it; it is generally considered the strongest force.",
      "Evidence: plates attached to long subducting slabs (Pacific, Nazca, Cocos) move fastest (about 7 to 10 cm a year), while plates with little or no subduction (African, Antarctic) move slowly (about 1 to 2 cm).",
      "Seismic tomography shows cold slabs sinking deep into the mantle, supporting the idea that sinking slabs are an active driver.",
      "Slab pull is also supported by studies since the 1970s relating plate speed to the length of subduction boundary.",
      "India: speed fell from about 15 to 20 cm a year to about 5 cm after collision with Eurasia, consistent with loss of slab pull.",
      "Mantle drag and suction: the sinking slab drags the mantle with it, so part of the convection is a result of plate motion rather than its cause.",
      "Sea-floor spreading, age of ocean crust, palaeomagnetism and GPS measurements show that plates move, but do not by themselves identify the force.",
      "The forces are interrelated: they all derive from heat loss from Earth's interior and from the cooling and thickening of oceanic lithosphere, so they cannot be completely separated.",
      "Uncertainty: the relative size of the forces is estimated using models and not measured directly, and different plates may be driven mainly by different combinations of forces.",
      "Judgement: slab pull is the most important single force, ridge push is secondary, and mantle convection provides the overall thermal system and some drag, so the forces together explain plate motion.",
    ],
    levels: geographyLevels(15), wordLimit: { min: 400, max: 600 },
    modelAnswer: "Slab pull is probably the most important force driving plate movement, with ridge push of secondary importance and convection currents best seen as part of the overall system rather than a separate engine. The forces are linked, so their importance can only be judged using evidence.\n\nThe oldest explanation is convection currents in the mantle. Heat from the core and from radioactive decay makes mantle material rise and sink very slowly, and Arthur Holmes suggested that plates are carried like rafts on these currents. This helps to explain why plates diverge above rising limbs and converge above sinking ones, but there are weaknesses. Many plates move faster than the mantle below them could drag them, and the pattern of mantle flow does not match plate boundaries simply, so convection is now seen as a cause only in a weaker sense, as part of the thermal system.\n\nRidge push depends on the fact that new lithosphere at a mid-ocean ridge is hot and stands about 2 to 3 km higher than older sea floor, so it slides downhill under gravity and pushes the plate away. The slope is gentle, so the force is small. It may be the main force for plates such as the North American plate, which has no large subducting edge and moves at only a few centimetres a year.\n\nSlab pull occurs where cold, dense oceanic lithosphere sinks into the mantle at a subduction zone and drags the rest of the plate behind it. The evidence is strong. Plates attached to long subducting slabs, such as the Pacific, Nazca and Cocos plates, move fastest, at roughly 7 to 10 cm a year, while plates with little subduction, such as the African and Antarctic plates, move at only 1 to 2 cm a year. Studies since the 1970s have related plate speed to the length of subduction boundary, and seismic tomography shows cold slabs sinking deep into the mantle. The Indian plate slowed from about 15 to 20 cm a year to about 5 cm after it collided with Eurasia and lost much of its slab pull.\n\nThe forces cannot be completely separated. The sinking slab drags and stirs the mantle, so part of the convection is the result of plate motion, and ridge push, slab pull and convection are all driven by the loss of heat from the Earth's interior as the oceanic lithosphere cools and thickens. In addition, the forces are estimated from models rather than measured directly, and different plates may be driven by different mixtures.\n\nIn conclusion, slab pull is the most important single force, ridge push is a lesser force that dominates where there is no subduction, and convection currents provide the thermal system behind both and some drag, so the three together, rather than any one alone, explain plate motion.",
    explanation: "Compare the three driving forces using plate speeds and other evidence and judge their relative importance.",
  });

  // ============================================================ CAM_SECTION_A: topic 5 (Paper 2)
  b.struct({
    ...BASE(EXAM.CAM_SECTION_A, "Paper 2"),
    concepts: ["ageo.water.global-resources", "ageo.water.supply-demand-security", "ageo.water.management-strategies"],
    hints: ["In (a)(i) divide the water in m³ by the number of people (1 km³ = 1 000 000 000 m³; 1 million people = 1 000 000).", "In (c) weigh supply schemes against demand management, with an example."],
    stem: "Insert, Table 1 shows water data for Country P, which has no major river flowing in from other countries (data invented for this exercise).\n\n" + T5,
    parts: checkExam(EXAM.CAM_SECTION_A, [
      P.group({
        label: "(a)", stem: "Use Table 1.",
        parts: [
          P.num({ label: "(i)", marks: 2, type: "CALCULATION", stem: "Calculate the renewable water resources per person in 2020, in m³ a year.",
            value: perPerson2020, dp: 0, wrong: [1500, 80],
            explanation: "12 km³ = 12 000 000 000 m³; ÷ 15 000 000 people = 800 m³ per person." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "Using the usual thresholds of 1 700 m³ for water stress and 1 000 m³ for water scarcity, how is Country P described in 2020?", options: [
            ["Water scarcity, because renewable water is below 1 000 m³ per person", "Correct: 800 m³ is less than 1 000 m³ per person."],
            ["Water stress only, because it is between 1 000 and 1 700 m³ per person", "800 m³ is below 1 000 m³, so the country is beyond stress."],
            ["No water problem, because it is above 1 700 m³ per person", "800 m³ is far below 1 700 m³."],
            ["Water surplus, because withdrawals are less than renewable resources", "Withdrawals are below resources, but the per person figure is low."],
          ], answer: "A", explanation: "800 m³ per person is below the scarcity threshold." }),
        ],
      }),
      P.group({
        label: "(b)", stem: "Explain the pressure on water resources in Country P.",
        parts: [
          P.num({ label: "(i)", marks: 1, stem: "Calculate the volume of water withdrawn by agriculture in 2020, in km³.", value: agriKm3, dp: 2, wrong: [4.2, 6.0],
            explanation: "72% of 6.0 km³ = 0.72 × 6.0 = 4.32 km³." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "Which is the most likely reason why agriculture uses the largest share of the water?", options: [
            ["Irrigating crops needs very large volumes, much of it lost to evaporation", "Correct: crops transpire and irrigation water evaporates or seeps away."],
            ["Farm households use more water for washing than city households do in towns", "Domestic use is a small part of the total."],
            ["Farm animals drink more water in a year than people use in factories and homes", "Livestock are a minor part of agricultural use compared with irrigation."],
            ["Farmers pay a higher price for each cubic metre of water", "Agricultural water is often cheap or subsidised."],
          ], answer: "A", explanation: "Irrigation is the largest water use in most countries." }),
          P.manual({ label: "(iii)", marks: 2, stem: "Explain how population growth and economic development have increased the demand for water in Country P.",
            points: [
              "Population growth from 8 to 15 million means more people needing water for drinking, sanitation and food.",
              "Economic development and higher incomes increase use per person (more appliances, flush toilets, industry and irrigated farming), so withdrawals rose from 3.5 to 6.0 km³.",
            ],
            modelAnswer: "The population nearly doubled from 8 to 15 million, so more water is needed for drinking, sanitation and food. Higher incomes and industry increase water use per person through appliances, toilets, factories and irrigation, so total withdrawals rose from 3.5 to 6.0 km³ a year.",
            explanation: "More people and higher use per person raise demand." }),
        ],
      }),
      P.manual({ label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", stem: "Using Table 1 and your own knowledge, to what extent should countries facing water scarcity increase supply rather than manage demand?",
        points: [
          "Table 1: renewable water fell from 1 500 to 800 m³ per person and withdrawals are half of renewable resources (6.0 of 12 km³), so a country in this position needs action on both sides.",
          "Increasing supply: dams and reservoirs store seasonal rain, and transfers move water to deficit areas, as in the Lesotho Highlands scheme supplying Gauteng, but they are costly and displace people.",
          "Desalination gives a reliable supply in coastal countries (Israel obtains most of its drinking water from it) but needs much energy and produces brine.",
          "Rainwater harvesting and boreholes are cheap and local but give small volumes, depend on rain and can over-abstract groundwater.",
          "Demand management: pricing, repairing leaks, efficient irrigation (drip systems) and education reduce use at a lower cost per cubic metre.",
          "Agriculture uses 72% of withdrawals, so efficiency there has the largest effect, but farmers may resist higher prices.",
          "Cape Town in 2018 cut its use to the limit of 50 litres per person a day by restrictions, pricing and public pressure, avoiding 'Day Zero', showing the power of demand management in a crisis.",
          "Judgement: supply schemes are needed when population is growing and renewable water is low, but demand management is quicker, cheaper and more sustainable, so the best approach combines both, with the balance depending on wealth and geography.",
        ],
        levels: geographyLevels(8), wordLimit: { max: 350 },
        modelAnswer: "Countries facing water scarcity should do both, but demand management should come first because it is cheaper and quicker. Country P's renewable water fell from 1 500 to 800 m³ per person between 2000 and 2020, and it already withdraws half of its renewable resources, so its supply cannot expand much without new sources. Dams, transfers and desalination can add water: the Lesotho Highlands scheme supplies Gauteng and Israel obtains most of its drinking water by desalination. However, these schemes cost a great deal, displace people or use large amounts of energy, and take years to build. Rainwater harvesting and boreholes are cheap but yield small volumes and can deplete groundwater. Demand management is cheaper per cubic metre. Since agriculture uses 72% of withdrawals, efficient irrigation, leak repair, pricing and education could save large volumes, and in 2018 Cape Town cut its use to about 50 litres per person a day and avoided 'Day Zero'. Changing habits can be slow and farmers may resist higher prices. In conclusion, supply schemes are necessary where population grows and renewable water is low, but demand management should be the first priority, and the balance depends on wealth, climate and geography.",
        explanation: "Weigh supply schemes against demand management using the table and examples, and judge." }),
    ]),
    explanation: "Calculate water per person and withdrawals, explain pressure on supply and assess supply against demand strategies.",
  });

  // ============================================================ CAM_ESSAY15: topic 5 (Paper 2)
  b.ext({
    ...BASE(EXAM.CAM_ESSAY15, "Paper 2"), marks: 15, skill: "EVALUATION",
    concepts: ["ageo.water.management-strategies", "ageo.water.supply-demand-security"],
    hints: ["Use one named country or scheme with dated facts, give benefits and costs, compare it with other strategies and judge."],
    stem: "Assess the extent to which large dams and reservoirs are the most successful way of increasing water supply.",
    points: [
      "Increasing supply includes dams and reservoirs, transfers, desalination, rainwater harvesting, boreholes and recycling; demand management is a separate approach.",
      "Dams store seasonal or flood flow for use in the dry season and can be multipurpose: water supply, irrigation, hydropower and flood control.",
      "Lesotho Highlands Water Project: dams (Katse, completed in the 1990s, and Mohale, in the early 2000s) and tunnels transfer water from the Senqu (Orange) headwaters to the Vaal and Gauteng; Phase II with Polihali Dam is under construction.",
      "Benefits to South Africa: a reliable supply for Gauteng's cities and industry, delivered by gravity through tunnels.",
      "Benefits to Lesotho: royalties for the water, hydropower at Muela that supplies most of its electricity, and jobs and roads during construction.",
      "Costs: very high capital cost, loss of farmland and homes with thousands of people resettled and disputes about compensation.",
      "Environmental costs: changed river flow and sediment downstream, loss of habitats, and evaporation and siltation reduce the reservoir's capacity over time.",
      "Transboundary issues: dams on shared rivers can lead to disputes, as with the Grand Ethiopian Renaissance Dam on the Nile; agreements are needed.",
      "Transfers move water from areas of surplus to deficit but need energy, money and agreement between regions.",
      "Desalination gives a reliable supply to coastal, arid places (Israel gets most of its drinking water this way), but needs much energy and produces brine.",
      "Rainwater harvesting and sand dams are cheap and community-based, but yield small volumes and depend on rainfall; boreholes risk over-abstraction and salt-water intrusion.",
      "Demand management (pricing, leak repair, efficient irrigation, education) saves water at a low cost; Cape Town cut its use sharply in 2018, so it can be quicker than building.",
      "Scale of need: agriculture uses roughly 70% of withdrawals globally, so efficiency gains are large, but cities and industry need reliable large volumes that only major schemes provide.",
      "Success depends on context: large dams suit big, reliable rivers and wealthy users; small-scale methods suit rural poor communities with little capital.",
      "Judgement: large dams are among the most successful ways of providing large, reliable volumes, but with high social, environmental and financial costs, they are not the most successful in every context, so the best strategy combines dams with demand management and local methods.",
    ],
    levels: geographyLevels(15), wordLimit: { min: 400, max: 600 },
    modelAnswer: "Large dams and reservoirs are among the most successful ways of providing large, reliable volumes of water, but because of their cost and side effects they are not the most successful in every situation, and they work best alongside other methods.\n\nA dam stores seasonal or flood flow for use in the dry season and can serve several purposes, including drinking water, irrigation, hydropower and flood control. The Lesotho Highlands Water Project is an example. Dams such as Katse, completed in the 1990s, and Mohale, built in the early 2000s, and tunnels transfer water from the headwaters of the Senqu (Orange) river to the Vaal river and the cities of Gauteng in South Africa, which depend on a reliable supply. Lesotho receives royalties and generates hydropower at Muela that supplies most of its electricity, and construction provided jobs and roads. Phase II, which includes the Polihali Dam, is being built to increase the transfer further.\n\nThere are also costs. The capital cost was very high, farmland and homes were flooded and thousands of people were resettled, with disputes over compensation. The dams alter river flow and sediment downstream, harm habitats, and lose water through evaporation, while silt gradually reduces capacity. Dams on shared rivers can lead to conflict, as with the Grand Ethiopian Renaissance Dam on the Nile, so agreements are needed.\n\nOther supply methods have different strengths. Desalination gives a reliable supply in dry coastal countries, and Israel obtains most of its drinking water in this way, but it needs a lot of energy and produces brine. Rainwater harvesting, sand dams and boreholes are cheap and local, which suits rural communities with little capital, but they supply small volumes, depend on rainfall and can lead to over-abstraction and salt-water intrusion. Transfers move water to deficit areas but require energy and agreement between regions.\n\nDemand management can be quicker and cheaper. Agriculture uses about 70% of withdrawals globally, so efficient irrigation, pricing, leak repair and education can save large volumes. In 2018, Cape Town reduced its use to about 50 litres per person a day and avoided 'Day Zero', although such measures are hard to sustain and cannot supply growth in a large city by themselves.\n\nIn conclusion, large dams are highly successful where a big, reliable river, strong demand and sufficient funds exist, as in the Lesotho scheme, but their costs mean they are not the most successful way everywhere. The best strategy combines dams with demand management and local, low-cost methods.",
    explanation: "Evaluate dams with a named scheme against other supply methods and demand management, and judge their relative success.",
  });
});
