// W2a: hydro.drainage-basin-system (both boards). Numbers computed: water balance, runoff depth from mean discharge,
// infiltration excess, channel length from drainage density (see tables/w2a-hydro-drainage-basin-system.mjs).
import { concept, P, geographyLevels, chk, rnd, waterBalance, drainageDensity } from "../lib.mjs";
import { mc, tbl } from "../tables/w2a-_q.mjs";

const SECONDS_YEAR = 365 * 24 * 3600;
const depthMm = (flowM3s, areaKm2) => ((flowM3s * SECONDS_YEAR) / (areaKm2 * 1e6)) * 1000;
// Struct 1
const BASINTAB = tbl(["Basin", "Land cover", "Area (km²)", "Impermeable surface (%)", "Drainage density (km/km²)"],
  [["P", "Town and suburbs", 120, 55, 3.2], ["Q", "Natural woodland", 120, 3, 1.1]]);
const lenP = chk(3.2 * 120, 384, 1e-9);
// Struct 2: seasonal water balance
const WET = { P: 760, E: 520, Q: 140 };
const DRY = { P: 50, E: 110, Q: 40 };
const dSwet = chk(waterBalance(WET.P, WET.E, WET.Q), 100);
const dSdry = chk(waterBalance(DRY.P, DRY.E, DRY.Q), -100);
chk(waterBalance(WET.P + DRY.P, WET.E + DRY.E, WET.Q + DRY.Q), 0);
const BALTAB = tbl(["Season", "Precipitation (mm)", "Evapotranspiration (mm)", "Runoff (mm)"],
  [["Wet (November-March)", WET.P, WET.E, WET.Q], ["Dry (April-October)", DRY.P, DRY.E, DRY.Q]]);

concept("ageo.hydro.drainage-basin-system", { file: "hydro/drainage-basin-system", keyPrefix: "hydro.drainage-basin-system" }, (b) => {
  mc(b, 1, "RECALL", "Which of these is an **output** of a drainage basin system?", [
    ["Evapotranspiration", "Correct: water leaves the basin to the atmosphere."],
    ["Precipitation as rain", "Precipitation is the input."],
    ["Soil moisture store", "Soil moisture is a store."],
    ["Throughflow in soil", "Throughflow is a transfer inside the basin."],
  ], "Outputs are **evapotranspiration** and **channel flow**; precipitation is the input.");
  mc(b, 2, "UNDERSTANDING", "What is **throughflow**?", [
    ["Water moving downslope through the soil", "Correct: it is quicker along root channels and cracks."],
    ["Water dripping from leaves to the ground", "That is throughfall."],
    ["Water running down the trunk of a tree", "That is stemflow."],
    ["Water moving down into the rock beneath", "That is percolation."],
  ], "**Throughflow** is lateral movement of water through the soil towards the channel.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What is the difference between **infiltration** and **percolation**?", [
    ["Infiltration is entry to soil; percolation is movement down into rock", "Correct: infiltration is at the surface, percolation is deeper."],
    ["Infiltration is flow over the surface; percolation is flow in the channel", "Flow over the surface is overland flow."],
    ["Infiltration is loss to the air; percolation is gain from rainfall", "Loss to the air is evapotranspiration."],
    ["Infiltration is flow through soil; percolation is flow in the leaves", "Flow through the soil is throughflow."],
  ], "**Infiltration** is soaking into the soil; **percolation** is the downward movement into the underlying rock.");
  mc(b, 2, "UNDERSTANDING", "Why does a circular basin tend to produce a higher and sharper flood peak than an elongated one?", [
    ["Water from all parts arrives at the outlet at about the same time", "Correct: the travel times are similar, so the flows combine."],
    ["It has a higher drainage density than every elongated basin", "Shape and drainage density are different factors."],
    ["Its rocks are always more permeable to rain than those of an elongated basin", "Shape has no connection with rock type."],
    ["It receives more rainfall because of its shape", "Rainfall depends on climate and relief, not on the shape of the basin."],
  ], "In a **circular basin** the travel times from different parts are similar, so the peak is high and sharp.", { daily: true });
  mc(b, 3, "APPLICATION", "How does urbanisation change the movement of water in a basin?", [
    ["Impermeable surfaces reduce infiltration and speed runoff", "Correct: more overland flow reaches the channel quickly."],
    ["Paved surfaces increase infiltration and groundwater recharge", "Paving blocks infiltration."],
    ["Buildings increase interception by leaves and stems", "Buildings do not intercept as leaves do; vegetation is replaced."],
    ["Storm drains slow the water down and store it underground", "Drains carry water quickly to streams."],
  ], "Urban surfaces are **impermeable** and drains carry water quickly, so infiltration falls and overland flow rises.", { hints: ["What happens to rain that lands on tar and roofs?"] });
  mc(b, 3, "UNDERSTANDING", "What is **baseflow**?", [
    ["Groundwater seeping into the channel in dry periods", "Correct: it is slow and steady."],
    ["Water that runs over the surface during a heavy storm", "That is overland flow."],
    ["Rain that is held on leaves before reaching the soil", "That is interception."],
    ["Water that is lost from the channel by evaporation", "That is an output."],
  ], "**Baseflow** is the groundwater contribution that keeps a river flowing between storms and in the dry season.", { hints: ["Which store supplies a river in the dry season?"] });
  mc(b, 4, "ANALYSIS", "A river over granite and gneiss stops flowing in the dry season. Which explanation is best?", [
    ["The groundwater store is small, so the water table drops", "Correct: with no baseflow, the river dries out."],
    ["Rain falls evenly in every month, so the stores stay full", "Zimbabwe has a distinct wet and dry season."],
    ["Granite is permeable, so the water is lost to the atmosphere", "Granite has low primary permeability, and loss to the air is evapotranspiration."],
    ["The water table rises into the channel and floods the valley", "A rising water table would sustain flow rather than stop it."],
  ], "Where the groundwater store is small and the water table falls below the bed, **baseflow stops** and the river dries up.", { hints: ["Think about what feeds a river when it is not raining."] });

  b.tf({ d: 1, skill: "RECALL", stem: "A drainage basin is a closed system.", answer: false,
    feedbackFalse: "Correct: it is an open system, with inputs and outputs of water.", feedbackTrue: "Not so: water enters as precipitation and leaves by evapotranspiration and channel flow.",
    explanation: "A drainage basin is an **open system**; the global water cycle is closed." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Overland flow normally reaches a river much faster than groundwater flow.", answer: true,
    feedbackTrue: "Correct: overland flow takes minutes to hours; groundwater flow takes weeks to years.", feedbackFalse: "Not so: groundwater flow is the slowest transfer.",
    explanation: "Overland flow is fast; groundwater flow is the slowest transfer." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term to its meaning.",
    pairs: [
      ["Stemflow", "Water running down the stems and trunks of plants"],
      ["Throughfall", "Water dripping through gaps and off leaves to the ground"],
      ["Percolation", "Downward movement of water into the underlying rock"],
      ["Overland flow", "Water running over the ground surface"],
      ["Watershed", "High ground separating one drainage basin from the next"],
    ], explanation: "These are the main transfers of water in the basin." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "The boundary of a drainage basin is the {{blank:a}}. The upper surface of the saturated zone underground is the {{blank:b}}. Precipitation is an {{blank:c}} to the drainage basin system.",
    blanks: [
      { id: "a", accepted: ["watershed"], choices: ["watershed", "confluence", "mouth"] },
      { id: "b", accepted: ["water table"], choices: ["water table", "baseflow", "stemflow"] },
      { id: "c", accepted: ["input"], choices: ["input", "output", "store"] },
    ], explanation: "The watershed is the boundary; the water table is the top of the saturated zone; precipitation is the input." });
  b.short({ d: 1, skill: "RECALL", stem: "Name the high ground that separates one drainage basin from another.",
    accepted: ["watershed", "water divide", "drainage divide", "divide"], explanation: "The **watershed** is the boundary of a drainage basin." });

  const dS = chk(waterBalance(910, 705, 160), 45);
  b.num({ d: 2, skill: "APPLICATION", calculator: true, unit: "mm", daily: true,
    stem: "A catchment receives 910 mm of precipitation in a year. Evapotranspiration is 705 mm and runoff is 160 mm. Calculate the change in storage, in mm.",
    hints: ["ΔS = P − Q − E."],
    value: dS, wrong: [45 + 160, 1775],
    explanation: "ΔS = P − Q − E = 910 − 160 − 705 = **45 mm** (storage increased). The value 205 forgets to subtract runoff." });
  const dep = rnd(depthMm(5.0, 2500), 1, 63.1, "depth");
  b.calc({ d: 4, skill: "APPLICATION", calculator: true, unit: "mm",
    stem: "A river draining 2 500 km² has a mean annual discharge of 5.0 m³/s. Calculate the depth of runoff over the basin in a year, in mm to 1 decimal place. (Use 365 days.)",
    hints: ["Volume = discharge × seconds in a year.", "Depth = volume ÷ area; convert km² to m² and the answer to mm."],
    value: depthMm(5.0, 2500), dp: 1, wrong: [63072, 0.063],
    explanation: "1. Seconds in a year = 365 × 24 × 3 600 = 31 536 000.\n2. Volume = 5.0 × 31 536 000 = 157 680 000 m³.\n3. Area = 2 500 × 1 000 000 = 2.5 × 10⁹ m².\n4. Depth = 157 680 000 ÷ 2.5 × 10⁹ = 0.06307 m = **63.1 mm**. The value 63 072 forgets to convert the area." });
  const excess = chk(45 - 12, 33);
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "mm",
    stem: "Rain falls at 45 mm per hour on a soil with an infiltration capacity of 12 mm per hour. Calculate the rate at which infiltration-excess overland flow is produced, in mm per hour.",
    hints: ["Excess = rainfall rate − infiltration capacity."],
    value: excess, wrong: [57, 3.75],
    explanation: "Overland flow = 45 − 12 = **33 mm per hour**. The value 57 adds the two rates." });

  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how vegetation affects the movement of water through a drainage basin.",
    hints: ["Consider interception, transpiration, roots and surface flow."],
    points: [
      "Leaves and stems intercept rain, some of which evaporates, so less reaches the ground.",
      "Plants take up water through roots and release it by transpiration, so less water reaches the river.",
      "Roots open channels in the soil and increase infiltration.",
      "Litter and stems slow overland flow and reduce erosion, so water reaches the channel more slowly.",
    ],
    modelAnswer: "Vegetation intercepts rain, and some evaporates before it reaches the ground. Plants also take up water through their roots and lose it by transpiration. Roots open channels in the soil that increase infiltration, and litter and stems slow overland flow. As a result less water reaches the river and it arrives more slowly.",
    explanation: "Vegetation reduces runoff and slows its transfer." });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe the routes by which rain that falls on woodland reaches a river.",
    points: [
      "Some is intercepted by leaves and reaches the ground as throughfall or stemflow.",
      "Most infiltrates into the soil and moves downslope as throughflow, or percolates to groundwater.",
      "Groundwater flows slowly to the channel as baseflow (overland flow is limited in woodland).",
    ],
    modelAnswer: "Rain is intercepted by leaves and then reaches the ground as throughfall or stemflow. Most soaks into the soil and moves downslope as throughflow, or percolates down to the groundwater, which flows slowly to the river as baseflow.",
    explanation: "Woodland routes are mostly slow subsurface flows." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why a high drainage density leads to a quicker response of the river to rainfall.",
    hints: ["Think about how far water has to travel before reaching a channel."],
    points: [
      "A high drainage density means there are many channels per unit area.",
      "Water has only a short distance to travel over the slopes to reach a channel.",
      "Channel flow is faster than overland flow or throughflow.",
      "So more water reaches the main river in a short time, giving a short lag time and a high peak.",
    ],
    modelAnswer: "A high drainage density means there are many channels, so water has to travel only a short distance over the slopes. Flow in channels is faster than flow over land or through soil, so water reaches the main river quickly, giving a short lag time and a high peak.",
    explanation: "Close channels shorten the travel path." });
  b.manualShort({ d: 3, skill: "APPLICATION", marks: 3,
    stem: "Explain how clearing woodland for ploughed fields on a slope could change river flow.",
    hints: ["Think about interception, infiltration and surface flow."],
    points: [
      "There are fewer plants to intercept rain and to transpire, so more water reaches the ground and the soil is wetter.",
      "Ploughed or compacted soil has a lower infiltration capacity, so more overland flow occurs.",
      "More water reaches the river faster, so peak discharge rises and baseflow may fall.",
    ],
    modelAnswer: "With the woodland cleared, less rain is intercepted or transpired. The ploughed soil is more easily compacted and absorbs water more slowly, so more runs off the surface. More water reaches the river in a shorter time, so peaks are higher and baseflow may fall.",
    explanation: "Clearing increases overland flow and decreases infiltration." });

  b.struct({ d: 3, skill: "ANALYSIS", examStyle: true,
    stem: `Two basins of the same size and rainfall were compared (illustrative data, invented for this exercise).\n\n${BASINTAB}`,
    hints: ["Total channel length = drainage density × area.", "Think about impermeable surfaces and short travel distances."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the total length of channels in basin P, in km.", value: lenP, unit: "km", wrong: [37.5, 132],
        explanation: "Total length = drainage density × area = 3.2 × 120 = 384 km." }),
      P.mcq({ label: "(b)", stem: "Which basin is likely to have the shorter lag time after a storm?", options: [
        ["Basin P", "Correct: impermeable surfaces and a high density of drains and channels speed up runoff."],
        ["Basin Q", "Woodland slows water and gives a longer lag time."],
        ["Both have the same lag time", "The two basins have very different surfaces and drainage."],
        ["Neither, because lag time depends only on basin area", "Both are 120 km², but other factors differ."],
      ], answer: "A", explanation: "P has more impermeable surface and a higher drainage density." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain why basin P is likely to have a higher peak discharge.",
        points: [
          "With 55% impermeable surface, little rain infiltrates, so much of it becomes overland flow.",
          "A high drainage density (3.2 km/km²) and drains carry water quickly to the river.",
          "Water from the whole basin arrives in a short time, so the flows combine to give a high peak.",
        ],
        modelAnswer: "In P more than half of the surface is impermeable, so little rain soaks in and most runs off. Drains and a high density of channels carry the water quickly to the river, so water from the whole basin arrives together and the peak is high.",
        explanation: "Impermeable surfaces and dense channels produce flashy flow." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest two ways of reducing the speed of runoff from basin P.",
        points: [
          "Increase permeable surfaces (parks, permeable paving) so that more rain infiltrates.",
          "Store storm water in ponds or wetlands, and plant trees to intercept rain.",
        ],
        modelAnswer: "Introduce permeable paving and green spaces so more rain soaks in, and build storm-water ponds or wetlands and plant trees to store and intercept water.",
        explanation: "Increase infiltration and storage." }),
    ], explanation: "Calculate channel length and explain the contrast in response." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `The table gives the seasonal water balance of a catchment in Zimbabwe (illustrative data, invented for this exercise). Change in storage is P − E − Q.\n\n${BALTAB}`,
    hints: ["Use ΔS = P − E − Q for each season.", "In the dry season where does the water for evapotranspiration come from?"],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the change in storage in the wet season, in mm.", value: dSwet, unit: "mm", wrong: [-100, 1420],
        explanation: "ΔS = 760 − 520 − 140 = +100 mm." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the change in storage in the dry season, in mm (use a minus sign for a fall).", value: dSdry, unit: "mm", wrong: [100, 200],
        explanation: "ΔS = 50 − 110 − 40 = −100 mm." }),
      P.mcq({ label: "(c)", stem: "What does the negative value in the dry season show?", options: [
        ["Stores of soil water and groundwater are used up", "Correct: more water leaves than enters, so stored water falls."],
        ["Stores are being filled by additional rainfall", "That would give a positive value."],
        ["The basin has no outputs of water at that time of year", "The basin has evapotranspiration and runoff."],
        ["The data must contain an error in the calculation", "A negative value is expected in the dry season."],
      ], answer: "A", explanation: "Stores fill in the wet season and are drawn on in the dry season." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why evapotranspiration (110 mm) is greater than precipitation (50 mm) in the dry season.",
        points: [
          "Plants have roots that reach water stored in the soil and groundwater, and continue to transpire.",
          "Water stored from the wet season supplies the extra evapotranspiration.",
          "High temperatures and sunshine give a high demand for evaporation.",
        ],
        modelAnswer: "Plant roots can use water that was stored in the soil and groundwater during the wet season, so transpiration continues even though there is little rain. Warm, sunny weather gives a high demand for evaporation, so the loss exceeds the 50 mm of rainfall.",
        explanation: "Stored water supports dry-season evapotranspiration." }),
      P.manual({ label: "(e)", marks: 4, stem: "Explain how the river can continue to flow (40 mm) in the dry season although rainfall is only 50 mm.",
        points: [
          "Groundwater stored in the wet season percolates slowly to the channel.",
          "This baseflow keeps the river flowing between rains.",
          "Throughflow from the lower soil continues for some time after the rains stop.",
          "Stored water in wetlands or dams may also be released to the river.",
        ],
        modelAnswer: "Water that soaked into the ground in the wet season is held as groundwater and flows slowly into the river as baseflow. Water also drains slowly through the soil as throughflow after the rains, and wetlands and dams release water, so the river keeps flowing even when there is little rain.",
        explanation: "Baseflow from stored groundwater sustains dry-season flow." }),
    ], explanation: "Calculate stores and explain seasonal changes." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the importance of land use compared with physical factors in influencing the movement of water in a drainage basin.",
    hints: ["Cover land use, then rock, soil, relief, climate.", "Reach a judgement."],
    points: [
      "Land use changes infiltration and runoff: urban surfaces are impermeable and increase overland flow.",
      "Deforestation reduces interception and transpiration; ploughing and overgrazing compact the soil.",
      "Rock type and soil determine infiltration and groundwater storage (permeable rocks have more baseflow).",
      "Relief: steep slopes produce rapid overland flow, flat ground allows infiltration.",
      "Climate controls the amount and intensity of rainfall; intense storms exceed infiltration capacity.",
      "Basin shape and drainage density control travel times.",
      "Land use can be changed by people, while the physical factors are fixed.",
      "Judgement: physical factors set the basic response, but land use can change it greatly, mainly in small basins.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Physical factors set the basic response of a basin. Rock and soil determine how much water can infiltrate and be stored, steep slopes speed up overland flow, circular shapes and high drainage densities shorten travel times, and climate determines the amount and intensity of rainfall. However, land use can change the response greatly. Paved surfaces in a town block infiltration and drains carry the water quickly, so peak flows rise, while deforestation and ploughing reduce interception and compact the soil. Unlike the physical factors, land use can be managed. I conclude that physical factors set the starting point, but in small or urbanising basins land use can be the deciding factor.",
    wordLimit: { max: 300 }, explanation: "Weigh land use against the physical controls." });

  b.card("DEFINITION", "Drainage basin", "The area of land drained by a river and its tributaries, bounded by the watershed; an open system.");
  b.card("CONCEPT", "Inputs and outputs of a basin", "Input: precipitation. Outputs: evapotranspiration (evaporation and transpiration) and channel flow to the sea.");
  b.card("CONCEPT", "Stores in a drainage basin", "Interception, surface storage, soil moisture, groundwater and channel storage.");
  b.card("CONCEPT", "Transfers in a drainage basin", "Stemflow, throughfall, infiltration, overland flow, throughflow, percolation and groundwater flow.");
  b.card("DEFINITION", "Infiltration capacity", "The maximum rate at which the soil can absorb water; rain faster than this runs off as overland flow.");
  b.card("DEFINITION", "Baseflow", "Groundwater contribution to a river, which sustains flow between storms and in the dry season.");
  b.card("FORMULA", "Water balance", "P = Q + E ± ΔS (precipitation = runoff + evapotranspiration ± change in storage), all in mm.");
  b.card("CONCEPT", "Basin shape and response", "Circular basin: short lag, high sharp peak. Elongated basin: longer lag, lower peak.");
  b.card("CONCEPT", "Effects of urbanisation on the basin", "Impermeable surfaces and drains reduce infiltration and speed up runoff, so peaks are higher and baseflow is lower.");
});
