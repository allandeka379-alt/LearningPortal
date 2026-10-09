// Slice W1b: exam-format items. Theory structured (10 marks: ZIMSEC P2 Section A / Cambridge P1 Section A) and
// Cambridge P1 Section B (15 marks). Part splits are our convention; a reviewer must check them against past papers.
import { concept, P, ZIM, CAM, field, waterVolume, pct, round, check, table, agricultureLevels } from "../lib.mjs";

// T1: jar tests on two soils (cm).
const JX = { sand: 2.6, silt: 1.7, clay: 1.7 };
const JY = { sand: 5.6, silt: 1.4, clay: 1.0 };
const tot = (j) => j.sand + j.silt + j.clay;
const xClay = pct(JX.clay, tot(JX));
const ySand = pct(JY.sand, tot(JY));
check(Math.abs(tot(JX) - 6) < 1e-9 && Math.abs(tot(JY) - 8) < 1e-9, "jar totals");
check(Math.abs(ySand - 70) < 1e-9 && Math.abs(xClay - 28.3333) < 1e-3, "jar pcts");
const T1_TABLE = table(["Soil", "Sand layer (cm)", "Silt layer (cm)", "Clay layer (cm)"], [
  ["X", JX.sand.toFixed(1), JX.silt.toFixed(1), JX.clay.toFixed(1)],
  ["Y", JY.sand.toFixed(1), JY.silt.toFixed(1), JY.clay.toFixed(1)],
]);

// T2: slope and ridge spacing.
const rise = 4.2, run = 70, vi = 1.35;
const slope = (rise / run) * 100;
const spacing = (vi / slope) * 100;
check(Math.abs(slope - 6) < 1e-9 && Math.abs(spacing - 22.5) < 1e-9, "T2");

// T3: soil water.
const FC = 33, PWP = 16;
const avail = FC - PWP;
const fresh = 66.0, dry = 55.0;
const mc = pct(fresh - dry, dry);
check(avail === 17 && Math.abs(mc - 20) < 1e-9, "T3");

// T4: roof harvest.
const roof = field(15, 8);
const collected = waterVolume({ areaM2: roof.m2, depthMm: 70 }).litres * 0.85;
const tanks = Math.ceil(collected / 5000 - 1e-9);
check(roof.m2 === 120 && Math.abs(collected - 7140) < 1e-9 && tanks === 2, "T4");

concept("agri.soil.texture-structure", { file: "exam/w1b-theory", keyPrefix: "exam.w1b-theory" }, (b) => {
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 720, calculator: true,
    paper: "ZIMSEC P2 / Cambridge P1",
    concepts: ["agri.soil.texture-structure", "agri.soil.types"],
    stem: `Pupils at a school near Bulawayo shook samples of two soils, X and Y, with water in tall jars and left them to settle. The heights of the settled layers are shown below.\n\n${T1_TABLE}`,
    hints: ["Percentage = layer ÷ total of the three layers × 100.", "Link particle size to pore size and water-holding."],
    parts: [
      P.short({
        label: "(a)", stem: "Name the particles that settled last, on top of the other layers.",
        accepted: ["clay", "clay particles"],
        explanation: "The finest particles, clay, settle last.",
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the percentage of sand in soil Y.",
        value: ySand, unit: "%", wrong: [JY.sand, round(pct(JY.sand, JY.silt + JY.clay), 1)],
        explanation: `Total = ${JY.sand} + ${JY.silt} + ${JY.clay} = ${tot(JY).toFixed(1)} cm; sand = ${JY.sand} ÷ ${tot(JY).toFixed(1)} × 100 = ${ySand}%.`,
      }),
      P.num({
        label: "(c)", stem: "Calculate the percentage of clay in soil X, to one decimal place.",
        value: xClay, unit: "%", tol: 0.05, wrong: [JX.clay],
        explanation: `${JX.clay} ÷ ${tot(JX).toFixed(1)} × 100 = ${round(xClay, 1)}%.`,
      }),
      P.mcq({
        label: "(d)", stem: "Which soil will hold more water after rain?",
        options: [
          ["Soil X, because it contains more clay", "Correct: clay's tiny pores and large surface area hold water."],
          ["Soil Y, because it contains more sand", "Sand drains fast and holds little water."],
          ["Soil Y, because its layers are taller in total", "The total height reflects sample size, not water-holding."],
          ["Both equally, because both contain silt", "Their clay and sand contents differ greatly."],
        ],
        answer: "A",
        explanation: "The soil with more clay holds more water.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain why a crop on soil Y needs to be irrigated more often than a crop on soil X.",
        points: ["Soil Y is sandy, with large pores, so water drains through quickly.", "It holds little water, so the store is used up sooner by the crop."],
        explanation: "Low water-holding capacity means shorter intervals between irrigations.",
      }),
      P.manual({
        label: "(f)", marks: 3, stem: "Suggest **three** ways of improving the water-holding capacity of soil Y.",
        points: ["Add organic matter such as manure or compost.", "Mulch the surface to reduce evaporation.", "Mix in clay-rich anthill soil / grow green manure or cover crops / reduce tillage to keep humus."],
        explanation: "Organic matter, cover and added fine material improve sandy soils.",
      }),
    ],
    explanation: "Percentages come from each layer over the total; texture then explains water-holding and management.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, secs: 720, calculator: true,
    paper: "ZIMSEC P2 / Cambridge P1",
    concepts: ["agri.soil.erosion", "agri.soil.conservation"],
    stem: `A maize field near Chipinge lies below an overgrazed hillside. The field rises ${rise} m over a horizontal distance of ${run} m. After storms, small channels a few centimetres deep run straight down the field, and muddy water flows onto it from the hillside above.`,
    hints: ["Slope % = rise ÷ horizontal distance × 100.", "Spacing = vertical interval ÷ slope % × 100."],
    parts: [
      P.short({
        label: "(a)", stem: "Name the type of erosion shown by the small channels.",
        accepted: ["rill erosion", "rill", "rills", "rilling"],
        keywords: { any: ["rill"] },
        explanation: "Small channels removable by cultivation are rills.",
      }),
      P.num({
        label: "(b)", stem: "Calculate the slope of the field as a percentage.",
        value: slope, unit: "%", wrong: [round(run / rise, 1)],
        explanation: `${rise} ÷ ${run} × 100 = ${slope}%.`,
      }),
      P.num({
        label: "(c)", marks: 2, stem: `Contour ridges are to be built with a vertical interval of ${vi} m. Calculate the horizontal spacing between them, in m, to one decimal place.`,
        value: spacing, unit: "m", tol: 0.05, wrong: [round(vi * slope, 1)],
        explanation: `${vi} ÷ ${slope} × 100 = ${spacing.toFixed(1)} m.`,
      }),
      P.mcq({
        label: "(d)", stem: "Which structure should be built first to stop water from the hillside reaching the field?",
        options: [
          ["A storm drain along the top of the field", "Correct: it diverts runoff from higher land to a waterway."],
          ["A check dam in the middle of the field", "Check dams are built across gullies."],
          ["A weir across the stream below the field", "A weir holds water in a river; it does not protect the field."],
          ["A gabion at the bottom of the field", "Gabions stabilise gullies and banks, not the top of a field."],
        ],
        answer: "A",
        explanation: "A storm drain at the top of the field intercepts runoff from above.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain how overgrazing of the hillside adds to the erosion of the field.",
        points: ["Overgrazing removes grass cover and trampling compacts the soil, so less rain infiltrates.", "More, faster runoff flows down onto the field, carrying soil and cutting channels."],
        explanation: "Bare, compacted hillsides shed runoff onto fields below.",
      }),
      P.manual({
        label: "(f)", marks: 3, stem: "Describe **three** biological methods the farmer could use to conserve the soil in the field.",
        points: ["Mulching with crop residues / keeping soil covered.", "Contour ploughing and planting across the slope.", "Strip cropping / grass strips along the contour / cover crops / rotation with legumes."],
        explanation: "Biological methods use plants and management.",
      }),
    ],
    explanation: "Identify the erosion, calculate slope and spacing, then combine mechanical and biological conservation.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 720, calculator: true,
    paper: "ZIMSEC P2 / Cambridge P1",
    concepts: ["agri.soil.constituents", "agri.water.drainage-leaching"],
    stem: `A loam soil holds ${FC}% water at field capacity and ${PWP}% at the permanent wilting point (by mass of dry soil). A fresh sample of the soil weighed ${fresh.toFixed(1)} g and ${dry.toFixed(1)} g after drying in an oven at 105 °C.`,
    hints: ["Available water = field capacity − wilting point.", "Moisture content = water lost ÷ dry mass × 100."],
    parts: [
      P.num({
        label: "(a)", stem: "Calculate the available water in this soil, as a percentage.",
        value: avail, unit: "%", wrong: [FC + PWP],
        explanation: `${FC} − ${PWP} = ${avail}%.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the moisture content of the fresh sample as a percentage of the dry soil mass.",
        value: mc, unit: "%", wrong: [round(pct(fresh - dry, fresh), 1), fresh - dry],
        explanation: `Water = ${fresh.toFixed(1)} − ${dry.toFixed(1)} = ${(fresh - dry).toFixed(1)} g; ${(fresh - dry).toFixed(1)} ÷ ${dry.toFixed(1)} × 100 = ${mc}%.`,
      }),
      P.short({
        label: "(c)", stem: "Name the form of soil water that drains away in the first day or two after the soil is saturated.",
        accepted: ["gravitational water", "gravitational", "free water", "drainage water"],
        keywords: { any: ["gravitational"] },
        explanation: "Gravitational water drains down through large pores.",
      }),
      P.mcq({
        label: "(d)", stem: "If the soil stayed saturated for a week, what would happen first to the crop roots?",
        options: [
          ["They would lack oxygen for respiration", "Correct: water fills the air spaces."],
          ["They would lack water", "The soil is full of water."],
          ["They would receive extra nitrate", "Nitrate is lost by denitrification in saturated soil."],
          ["They would grow faster in the soft soil", "Roots short of oxygen grow poorly."],
        ],
        answer: "A",
        explanation: "Saturation fills the pores with water, so roots cannot respire aerobically.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain how a waterlogged soil loses nitrogen.",
        points: ["Lack of oxygen allows denitrifying bacteria to work (nitrifying bacteria stop).", "They convert nitrate into nitrogen gas, which escapes to the air."],
        explanation: "Denitrification in anaerobic soil.",
      }),
      P.manual({
        label: "(f)", marks: 3, stem: "Describe **three** methods of improving the drainage of a waterlogged field.",
        points: ["Dig open ditches leading to an outlet.", "Install tile drains, mole drains or rubble drains.", "Plant on ridges or raised beds / break pans by subsoiling / add organic matter."],
        explanation: "Lead water away, lower the water table or lift the crop above it.",
      }),
    ],
    explanation: "Soil water calculations followed by the effects and remedies of waterlogging.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 720, calculator: true, applies: ZIM,
    paper: "ZIMSEC Paper 2 Section A",
    concepts: ["agri.water.conservation-harvesting"],
    stem: "A rural clinic near Hwange has a roof measuring 15 m × 8 m. In February 70 mm of rain fell. Assume a runoff coefficient of 0.85. The clinic stores roof water in tanks that hold 5,000 L each and uses it to water a small vegetable garden.",
    hints: ["Litres = roof area × rainfall (mm) × coefficient.", "Round tanks UP: a part-filled tank is still needed."],
    parts: [
      P.num({
        label: "(a)", stem: "Calculate the area of the roof, in m².",
        value: roof.m2, unit: "m²", wrong: [roof.perimeterM],
        explanation: `15 × 8 = ${roof.m2} m².`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the volume of water collected in February, in litres.",
        value: collected, unit: "L", wrong: [roof.m2 * 70, round(roof.m2 * 70 / 0.85, 0)],
        explanation: `${roof.m2} × 70 × 0.85 = ${collected.toLocaleString("en-GB")} L.`,
      }),
      P.num({
        label: "(c)", stem: "How many tanks are needed to store all of February's water? Round UP to whole tanks.",
        value: tanks, tol: 0, wrong: [Math.floor(collected / 5000)],
        explanation: `${collected.toLocaleString("en-GB")} ÷ 5,000 = ${round(collected / 5000, 2)}, so ${tanks} tanks.`,
      }),
      P.short({
        label: "(d)", stem: "Name the method of in-field water harvesting in which contour ridges are joined by cross-ridges to form basins.",
        accepted: ["tied ridges", "tied ridging", "tie ridges", "tied-ridges"],
        keywords: { any: ["tied", "tie ridg"] },
        explanation: "**Tied ridges** hold rain where it falls.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain how a grass mulch on the garden beds conserves water.",
        points: ["It shades the soil and keeps it cool, so less water evaporates.", "It slows runoff so more water soaks in (and protects the surface from capping)."],
        explanation: "Mulch reduces evaporation and runoff.",
      }),
      P.manual({
        label: "(f)", marks: 3, stem: "Describe **three** other ways the clinic could make the stored water last longer in the garden.",
        points: ["Water early in the morning or late in the afternoon.", "Use drip irrigation or watering cans at the base of plants instead of flooding.", "Weed regularly / add manure to increase water-holding / use windbreaks or shade."],
        explanation: "Reduce evaporation and waste, and increase soil water-holding.",
      }),
    ],
    explanation: "Roof harvest calculation followed by field and garden water-conservation methods.",
  });
});

concept("agri.soil.erosion", { file: "exam/w1b-cambridge", keyPrefix: "exam.w1b-cambridge", applies: CAM }, (b) => {
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 945,
    paper: "Cambridge Paper 1 Section B",
    concepts: ["agri.soil.erosion", "agri.soil.conservation", "agri.crops.conservation-agriculture"],
    stem: "A farmer grows maize on sloping land in an area with heavy summer thunderstorms. Each season the topsoil becomes thinner and yields fall.",
    hints: ["(a) Describe what happens in each type.", "(b) Link each principle to raindrops, runoff, infiltration and evaporation.", "(c) Weigh cost, labour, slope and effectiveness, then decide."],
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Describe the types of water erosion that are likely to be occurring on this land.",
        points: [
          "Splash erosion: raindrops hit bare soil and detach particles.",
          "Sheet erosion: a thin, even layer of topsoil is removed by runoff over a wide area.",
          "Rill erosion: runoff concentrates into small channels that can be removed by cultivation.",
          "Gully erosion: rills deepen into large channels that implements cannot cross.",
        ],
        explanation: "Name and describe each type of water erosion.",
      }),
      P.manual({
        label: "(b)", marks: 5, stem: "Explain how conservation agriculture would reduce soil erosion and conserve water on this land.",
        points: [
          "Minimum soil disturbance keeps organic matter and crumb structure, so more water infiltrates and less runs off.",
          "No plough pan forms, so water can drain down rather than run off.",
          "Permanent soil cover (mulch) absorbs raindrop impact, preventing detachment and capping.",
          "Mulch slows runoff and reduces evaporation, keeping water in the soil.",
          "Rotation with legumes and cover crops keeps the soil covered for longer and builds organic matter (planting basins also hold rainwater).",
        ],
        explanation: "Explain each principle in terms of detachment, runoff, infiltration and evaporation.",
      }),
      P.manual({
        label: "(c)", marks: 6, stem: "The farmer is deciding whether to build bench terraces or to use contour strip cropping with mulching. Discuss which approach is more suitable.",
        points: [
          "Terraces turn a steep slope into level steps; water soaks in on each step and erosion is almost stopped.",
          "But terraces need much labour or machinery to build, cost a lot and need maintenance.",
          "Strip cropping with mulch is cheap and quick to adopt, uses plants and residues already available.",
          "It protects the surface and traps soil between strips, and improves soil organic matter.",
          "But on steep slopes or with very intense storms it may not control runoff alone; contour ridges or drains may be needed.",
          "Judgement linked to the slope and resources, e.g. strip cropping and mulch on moderate slopes, terraces only on steep land.",
        ],
        levels: agricultureLevels(6),
        explanation: "Weigh effectiveness against cost and suitability, then decide.",
      }),
    ],
    explanation: "Erosion types, the conservation-agriculture principles and a judgement between mechanical and biological methods.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 945,
    paper: "Cambridge Paper 1 Section B",
    concepts: ["agri.water.drainage-leaching", "agri.water.water-cycle"],
    stem: "A farm has a borehole on a hillside and a valley bottom that is waterlogged for several months each year.",
    hints: ["(a) Follow rain from the clouds to the aquifer.", "(b) Think about oxygen, roots and soil organisms.", "(c) Consider yields, costs, leaching and the effect on water storage."],
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Describe how the water cycle supplies water to the borehole.",
        points: [
          "Water evaporates from oceans, lakes and land (and transpires from plants), forming water vapour.",
          "The vapour condenses into clouds and falls as precipitation (rain).",
          "Rain infiltrates the soil and percolates down to the saturated zone below the water table.",
          "It is stored in and flows through an aquifer, from which the borehole draws water.",
        ],
        explanation: "Describe the cycle from evaporation to groundwater storage.",
      }),
      P.manual({
        label: "(b)", marks: 5, stem: "Explain the effects of poor drainage in the valley bottom on soil organisms and on root respiration.",
        points: [
          "Water fills the pore spaces, so there is little oxygen in the soil.",
          "Roots cannot respire aerobically, release little energy and may die.",
          "So uptake of water and mineral ions falls and crops yellow, wilt and grow poorly.",
          "Aerobic organisms such as earthworms and nitrifying bacteria die or leave; decomposition slows.",
          "Denitrifying bacteria convert nitrate to nitrogen gas, so nitrogen is lost.",
        ],
        explanation: "Link lack of oxygen to roots and to soil organisms.",
      }),
      P.manual({
        label: "(c)", marks: 6, stem: "Discuss whether the farmer should drain the valley bottom for crop production.",
        points: [
          "Draining with ditches or tile drains supplies oxygen to roots, so yields of many crops increase.",
          "It allows earlier cultivation and planting and reduces root diseases.",
          "But drains are costly to install and maintain and need a suitable outlet.",
          "Faster drainage increases leaching of nitrate and other nutrients, raising fertiliser needs.",
          "Wet valley bottoms store water and recharge groundwater; draining them may lower the water table and reduce dry-season water, including the borehole supply and wildlife habitat.",
          "Judgement with reason, e.g. partial drainage or raised beds and dry-season cropping rather than full drainage.",
        ],
        levels: agricultureLevels(6),
        explanation: "Weigh yield gains against cost, leaching and the loss of water storage.",
      }),
    ],
    explanation: "The water cycle, the effects of waterlogging and a judgement about draining wetland.",
  });
});
