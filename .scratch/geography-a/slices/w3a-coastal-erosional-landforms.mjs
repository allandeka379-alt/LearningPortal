// W3a: coastal.erosional-landforms (Cambridge only, A Level Paper 3 option 8). Data are illustrative (invented for this exercise); every number is computed in code.
import { concept, P, geographyLevels, chk, rnd, sum, CAM } from "../lib.mjs";
import { mc, tbl } from "../tables/w3a-_q.mjs";

// Singles
const rate = rnd(51 / 30, 1, 1.7, "rate");
const timeYrs = chk(120 / 2.5, 48, 1e-9);
const massT = chk(500 * 12 * 1.4 * 1.9, 15960, 1e-6);
const angle = rnd((Math.atan(3.1 / 90) * 180) / Math.PI, 1, 2.0, "angle");
// Struct 1: cliff-edge survey
const SV = [[2001, 60.0, 60.0], [2006, 52.5, 59.0], [2011, 44.0, 58.0], [2016, 36.5, 57.2], [2021, 28.5, 56.1]];
const SVTAB = tbl(["Year", "Site A: boulder-clay cliff, peg to cliff edge (m)", "Site B: chalk cliff, peg to cliff edge (m)"], SV.map((r) => [r[0], r[1].toFixed(1), r[2].toFixed(1)]));
const rateA = rnd((60.0 - 28.5) / 20, 1, 1.6, "rateA");
// Struct 2: coastline sections
const SEC = [["P", "Chalk", 2.5], ["Q", "Clay", 4.5], ["R", "Limestone", 3.0], ["S", "Sand and soft sandstone", 2.0]];
const total = chk(sum(SEC.map((s) => s[2])), 12);
const resPct = rnd(((2.5 + 3.0) / total) * 100, 1, 45.8, "resPct");
const SECTAB = tbl(["Section (west to east)", "Rock type", "Length of coast (km)"], SEC.map((s) => [s[0], s[1], s[2].toFixed(1)]));

concept("ageo.coastal.erosional-landforms", { file: "coastal/erosional-landforms", keyPrefix: "coastal.erosional-landforms", applies: CAM }, (b) => {
  mc(b, 1, "RECALL", "Which landform is left when the roof of a sea arch collapses?", [
    ["A stack", "Correct: the part of the arch that remains is isolated from the cliff."],
    ["A geo", "A geo is a narrow inlet formed by the collapse of a cave roof."],
    ["A shore platform", "A platform is the gently sloping surface at the foot of the cliff."],
    ["A tombolo", "A tombolo is a depositional landform joining an island to the land."],
  ], "The sequence is cave, arch, **stack**, stump.");
  mc(b, 2, "UNDERSTANDING", "Under which conditions is freeze–thaw an effective weathering process on a cliff?", [
    ["Temperatures regularly rise above and fall below 0 °C", "Correct: water must freeze and thaw repeatedly in joints."],
    ["Temperatures are always above 25 °C and the cliffs are dry", "No freezing occurs, so there is no freeze–thaw."],
    ["Temperatures remain below −10 °C with no melting at all", "Without thaw the cycle cannot repeat."],
    ["Rainfall is high and the sea water is warm in all seasons", "Without freezing temperatures the cycle is not possible."],
  ], "Freeze–thaw needs **repeated crossing of 0 °C** with water in the joints.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "How does salt crystal growth weather coastal rock?", [
    ["Salt crystals grow in pores and cracks and force the rock apart", "Correct: spray evaporates and leaves crystals that exert pressure."],
    ["Salt water dissolves the calcium carbonate in all kinds of rock", "That describes solution of limestone, not salt crystal growth."],
    ["Salt reacts with feldspar crystals to produce a layer of clay", "That describes hydrolysis."],
    ["Salt lowers the freezing point of the water in the cracks", "This is not how salt weathering works."],
  ], "Evaporating spray leaves **crystals that grow** and wedge the rock apart.");
  mc(b, 2, "UNDERSTANDING", "Which feature is typical of a discordant coastline?", [
    ["Alternating headlands and bays", "Correct: hard and soft rock outcrop alternately along the coast."],
    ["A long, straight and unbroken line of cliffs", "That is more typical of a concordant coastline."],
    ["Rock bands that run parallel to the coast", "That describes a concordant coastline."],
    ["Large areas of sand dunes behind a wide beach", "Dunes are depositional features and not a sign of discordance."],
  ], "On a discordant coast the rock bands cross the coast, giving **headlands and bays**.");
  mc(b, 3, "ANALYSIS", "Why is rotational slumping common on clay cliffs?", [
    ["Saturated clay loses strength and moves on a curved surface", "Correct: water adds weight and reduces friction."],
    ["Clay is a hard rock that fractures into large blocks", "Clay is soft and weak, not hard."],
    ["Clay has joints that remain frozen throughout the year", "Slumping depends on water content, not on frozen joints."],
    ["Clay is not affected by rain falling on the cliff top", "Clay is highly affected by water."],
  ], "Clay becomes **saturated and weak**, so blocks slip along a curved surface.", { hints: ["What does rain do to the strength and weight of clay?"] });
  mc(b, 3, "ANALYSIS", "Why does the rate of erosion of a cliff often slow as a shore platform widens?", [
    ["Waves lose energy by friction as they cross the platform", "Correct: less energy reaches the foot of the cliff."],
    ["The cliff becomes more resistant as the platform grows", "The rock is the same; it is the energy that changes."],
    ["Tides stop reaching the platform when it is wide", "Tides continue to rise and fall over the platform."],
    ["The platform adds new material to the foot of the cliff", "A platform is eroded rock surface, not a store of new sediment."],
  ], "A wide platform **dissipates wave energy** before it reaches the cliff.", { hints: ["What happens to the energy of waves passing over a rough surface?"] });
  mc(b, 3, "APPLICATION", "A narrow, steep-sided inlet in a cliff has a line of weakness along its floor and a collapsed cave roof at its landward end. What is the landform?", [
    ["A geo", "Correct: geos form when a cave roof or blowhole collapses along a weakness."],
    ["An estuary", "An estuary is the tidal mouth of a river."],
    ["A barrier beach", "A barrier beach is a depositional ridge."],
    ["A stump", "A stump is the base of a former stack."],
  ], "A **geo** is a narrow inlet formed by the collapse of a cave roof.", { hints: ["Which landform is cut along a weakness and narrowly confined?"] });

  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "A discordant coastline has the rock bands parallel to the coast.", answer: false,
    feedbackTrue: "Not so: that is a concordant coastline.", feedbackFalse: "Correct: discordant means that the bands run at right angles to the coast.",
    explanation: "**Concordant** means parallel, and **discordant** means at right angles or crossing." });
  b.match({ d: 2, skill: "RECALL", stem: "Match each landform or process to its description.",
    pairs: [
      ["Wave-cut notch", "Hollow cut at the foot of a cliff by waves"],
      ["Shore platform", "Gently sloping rock surface left by cliff retreat"],
      ["Stack", "Isolated column of rock left after an arch collapses"],
      ["Rockfall", "Blocks falling from a steep and jointed cliff"],
      ["Salt crystal growth", "Crystals from evaporated spray wedging rock apart"],
    ], explanation: "Each term describes a feature or process of a cliffed coast." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "A cave is enlarged to form an {{blank:a}}, which may collapse to leave a {{blank:b}}. On a {{blank:c}} coastline the bands of rock run at right angles to the shore.",
    blanks: [
      { id: "a", accepted: ["arch"], choices: ["arch", "spit", "bar"] },
      { id: "b", accepted: ["stack"], choices: ["stack", "geo", "tombolo"] },
      { id: "c", accepted: ["discordant"], choices: ["discordant", "concordant", "emergent"] },
    ], explanation: "Cave, arch, stack; discordant coasts have bands at right angles to the shore." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the landform formed when the roof of a cave collapses to leave a narrow, steep-sided inlet.",
    accepted: ["geo", "a geo", "gully", "a gully"], explanation: "A **geo** is a narrow inlet formed by roof collapse of a cave." });

  b.num({ d: 2, skill: "APPLICATION", calculator: true,
    stem: "Survey pegs show that a cliff retreated 51 m in 30 years (illustrative data). Calculate the mean rate of retreat, in metres per year, to one decimal place.",
    hints: ["Distance ÷ time."],
    value: rate, dp: 1, wrong: [1530, 0.6],
    explanation: "51 ÷ 30 = **1.7 m per year**. The value 1 530 multiplies the two numbers." });
  b.num({ d: 2, skill: "APPLICATION", calculator: true, unit: "years",
    stem: "A cliff is retreating at 2.5 m per year. A building stands 120 m from the cliff edge (illustrative data). Assuming a constant rate, how many years will it be before the cliff reaches the building?",
    hints: ["Distance ÷ rate."],
    value: timeYrs, wrong: [300, 0.021],
    explanation: "120 ÷ 2.5 = **48 years**. The value 300 multiplies instead of dividing. In reality retreat is irregular, so this is an estimate." });
  b.calc({ d: 3, skill: "APPLICATION", calculator: true, unit: "t",
    stem: "A cliff 500 m long and 12 m high retreats by 1.4 m in one year. The cliff material has a density of 1.9 tonnes per m³ (illustrative data). Calculate the mass of material that is eroded in the year, in tonnes.",
    hints: ["Volume = length × height × retreat.", "Mass = volume × density."],
    value: massT, wrong: [8400, 6.3],
    explanation: "1. Volume = 500 × 12 × 1.4 = 8 400 m³.\n2. Mass = 8 400 × 1.9 = **15 960 tonnes**. The value 8 400 is the volume, not the mass." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "°",
    stem: "A shore platform is 90 m wide and falls 3.1 m from the foot of the cliff to low tide (illustrative data). Calculate the angle of the platform, in degrees to one decimal place.",
    hints: ["Angle = tan⁻¹(vertical ÷ horizontal)."],
    value: angle, dp: 1, wrong: [3.4, 29.0, 34.4],
    explanation: "Gradient = 3.1 ÷ 90 = 0.0344. Angle = tan⁻¹(0.0344) = **2.0°**. The value 3.4 is the gradient expressed as a percentage, not an angle." });

  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how salt crystal growth weathers a coastal cliff.",
    points: [
      "Sea spray and waves force salt water into pores and cracks in the rock.",
      "Evaporation in the warmth leaves salt crystals, which grow as more water evaporates.",
      "The growing crystals exert pressure on the walls of the pores and cracks, which break up the rock grain by grain.",
    ],
    modelAnswer: "Spray and waves force salt water into pores and cracks. When the water evaporates, salt crystals are left, and they grow as more water evaporates. The growing crystals press on the walls of the pores and cracks, and the rock breaks apart grain by grain.",
    explanation: "Salt water enters, evaporates and the crystals grow and break the rock." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how a wave-cut platform forms.",
    hints: ["Start with the notch at the foot of the cliff."],
    points: [
      "Waves attack the foot of the cliff by hydraulic action and abrasion, cutting a notch.",
      "The unsupported rock above collapses and the cliff retreats, leaving a gentle sloping surface at the base.",
      "Debris is carried across the surface by waves, abrading and widening the platform.",
      "Weathering by wetting and drying and salt lowers and smooths the surface, and the platform eventually becomes wide enough to reduce the energy of waves.",
    ],
    modelAnswer: "Waves cut a notch at the foot of the cliff by hydraulic action and abrasion. The rock above collapses and the cliff retreats, leaving a gently sloping surface. Debris carried by waves abrades the surface, and weathering by wetting and drying and salt lowers it. When the platform is wide, it reduces wave energy and erosion slows.",
    explanation: "Notch, collapse, retreat, abrasion and weathering." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how a stack forms from a headland.",
    hints: ["Use stages beginning with a weakness in the headland."],
    points: [
      "Waves attack a line of weakness (a joint or fault) in the headland by hydraulic action and abrasion, forming a cave.",
      "The cave is enlarged and erodes through the headland (or caves from both sides meet) to form an arch.",
      "Weathering and erosion weaken the roof of the arch until it collapses.",
      "The isolated column left standing is a stack, which is further eroded to a stump.",
    ],
    modelAnswer: "Waves attack a joint or fault in the headland by hydraulic action and abrasion, forming a cave. The cave is enlarged and cuts through the headland, or caves from both sides meet, to form an arch. Weathering and erosion weaken the roof until it collapses. The isolated column that remains is a stack, which erosion reduces to a stump.",
    explanation: "Cave, arch, stack and stump." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 3,
    stem: "Suggest why a clay cliff retreats faster than a chalk cliff on the same stretch of coast.",
    hints: ["Think of rock strength and the effect of water."],
    points: [
      "Clay is soft and weak, so it is easily eroded by waves and cut at the base.",
      "Clay becomes saturated by rain and groundwater and fails by slumping and mudflow, which supply large amounts of material.",
      "Chalk is a harder, more resistant rock which is permeable, so water drains through and the cliff remains steep and stable.",
    ],
    modelAnswer: "Clay is soft and weak, so waves cut it easily. It becomes saturated and fails by slumping and mudflow, and these movements remove large amounts of material. Chalk is harder and permeable, so water drains through it and the cliff remains steep and stable.",
    explanation: "Rock strength and water content explain the difference." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Two cliffs on the same coast were surveyed at five dates. The table gives the distance from a fixed peg to the cliff edge (illustrative data, invented for this exercise).\n\n${SVTAB}`,
    hints: ["Retreat = distance in 2001 − distance in 2021, then divide by the number of years.", "Think about rock type and the role of water."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the mean annual retreat of the cliff at Site A between 2001 and 2021, in metres per year, to one decimal place.", value: rateA, dp: 1, wrong: [31.5, 0.6, 1.1],
        explanation: "Retreat = 60.0 − 28.5 = 31.5 m. Over 20 years: 31.5 ÷ 20 = 1.6 m per year. The value 31.5 is the total retreat." }),
      P.manual({ label: "(b)", marks: 3, stem: "Compare the retreat of the two cliffs between 2001 and 2021.",
        points: [
          "Site A retreated 31.5 m (60.0 m to 28.5 m) and Site B only 3.9 m (60.0 m to 56.1 m), so A retreated about eight times as much.",
          "At A the retreat in each five-year period was between 7.5 m and 8.5 m (fastest, 8.5 m, between 2006 and 2011), and at B it was never more than 1.1 m in a five-year period.",
          "Site A retreated at a roughly steady rapid rate, while B retreated slowly and steadily.",
        ],
        modelAnswer: "Site A retreated 31.5 m, from 60.0 m to 28.5 m, while Site B retreated only 3.9 m, from 60.0 m to 56.1 m, so A retreated about eight times as much. At A the retreat in each five-year period was between 7.5 m and 8.5 m, and at B it was never more than 1.1 m. A retreated at a rapid, roughly steady rate and B slowly.",
        explanation: "Compare totals, rates and trends with figures." }),
      P.manual({ label: "(c)", marks: 3, stem: "Suggest reasons for the difference in the rates of retreat.",
        points: [
          "Boulder clay is a weak, unconsolidated rock that is easily eroded by waves at its base, while chalk is more resistant.",
          "Clay becomes saturated and fails by slumping and mudflow, so large volumes move after heavy rain, whereas chalk is permeable and the cliff is stable.",
          "Site A may have a narrow beach or little protection, so waves reach the cliff, or Site B may have a wide platform that reduces the wave energy.",
        ],
        modelAnswer: "Boulder clay is weak and is easily eroded by waves at its base, while chalk is more resistant. Clay becomes saturated and fails by slumping and mudflow after heavy rain, but chalk is permeable and stable. Site A may also have a narrower beach, or Site B a wider platform, so waves have more effect at A.",
        explanation: "Rock strength, water content and wave energy." }),
    ], explanation: "Calculate a rate of retreat, compare two cliffs and suggest reasons." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `A 12 km stretch of coast faces south. The table gives the rock types along the coast from west to east, and the bands of rock run from north to south, at right angles to the shore (illustrative data, invented for this exercise).\n\n${SECTAB}`,
    hints: ["Resistant rocks are chalk and limestone.", "Rock bands at right angles to the coast give a discordant coast."],
    parts: [
      P.group({
        label: "(a)", stem: "Use the table.",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "Calculate the percentage of the coastline made of resistant rock (chalk and limestone), to one decimal place.", value: resPct, dp: 1, unit: "%", wrong: [5.5, 54.2, 22.9],
            explanation: "Chalk + limestone = 2.5 + 3.0 = 5.5 km. 5.5 ÷ 12 × 100 = 45.8%. The value 54.2 is the percentage of soft rock." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "What type of coastline is shown?", options: [
            ["Discordant", "Correct: the rock bands cross the coast at right angles."],
            ["Concordant", "A concordant coast has bands parallel to the shore."],
            ["Emergent", "Emergent describes a coast formed by a fall of sea level."],
            ["Estuarine", "An estuarine coast is formed by the mouth of a river."],
          ], answer: "A", explanation: "Bands at right angles to the shore give a discordant coastline." }),
        ],
      }),
      P.manual({ label: "(b)", marks: 3, stem: "Explain why section Q is likely to form a bay and section R a headland.",
        points: [
          "Section Q is clay, which is soft and eroded rapidly by waves and mass movement, so the coast retreats to form a bay.",
          "Section R is limestone, which is more resistant and erodes slowly, so it is left projecting as a headland.",
          "Wave refraction then concentrates energy on the headland and spreads it in the bay, where sediment is deposited.",
        ],
        modelAnswer: "Section Q is clay, which is soft and eroded rapidly by waves and mass movement, so the coast retreats to form a bay. Section R is limestone, which is more resistant, so it is left projecting as a headland. Wave refraction concentrates energy on the headland and spreads it in the bay, where sediment is deposited.",
        explanation: "Differential erosion produces headlands and bays." }),
      P.manual({ label: "(c)", marks: 3, stem: "Describe the sequence of landforms that could develop on the chalk headland in section P.",
        points: [
          "Waves attack joints and faults to form a cave.",
          "The cave extends through the headland to form an arch.",
          "The roof of the arch collapses to leave a stack, which is later reduced to a stump.",
        ],
        modelAnswer: "Waves attack joints and faults and form a cave. The cave extends through the headland to form an arch. The roof of the arch collapses, leaving a stack, and the stack is reduced to a stump.",
        explanation: "Cave, arch, stack, stump." }),
      P.manual({ label: "(d)", marks: 3, stem: "Suggest the problems that a village on the clay coast in section Q might face.",
        points: [
          "Rapid cliff retreat and slumping, which may destroy houses, roads and farmland close to the cliff edge.",
          "Loss of land value and insurance, and the cost of coastal protection, which a small community may not be able to pay.",
          "Danger to people from landslides and mudflows after heavy rain, and loss of services such as water and electricity supplies.",
        ],
        modelAnswer: "The cliff may retreat rapidly and slump, so houses, roads and farmland near the edge are lost. Land values and insurance fall, and a small community may not be able to pay for coastal protection. There is danger from landslides and mudflows after heavy rain, and services may be cut off.",
        explanation: "Loss of property, cost and risk." }),
    ], explanation: "Calculate a proportion, identify a coastline and explain landforms and hazards." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the importance of sub-aerial processes compared with marine processes in the formation of cliffs.",
    hints: ["Describe the part played by each group of processes.", "Say how they depend on each other."],
    points: [
      "Marine processes (hydraulic action, abrasion) cut a notch at the foot of the cliff and remove debris, so they control where the cliff retreats.",
      "Sub-aerial weathering (freeze–thaw, salt crystal growth, solution, hydrolysis) weakens the rock and creates loose material.",
      "Mass movements (rockfall, slumping, mudflow) bring down the cliff face and are the means by which most of the cliff material reaches the beach.",
      "Marine and sub-aerial processes depend on each other: waves remove debris so that the cliff remains steep and exposed, and weathering and mass movement provide the load for abrasion.",
      "Where wave energy is low or a wide beach protects the foot, sub-aerial processes dominate and the cliff degrades to a gentler slope.",
      "Where the cliff is hard and wave energy is high, marine erosion dominates and the cliff stays steep.",
      "Climate, rock type and structure decide which processes are most important in a given place.",
      "Judgement: the two sets of processes work together, with marine erosion setting the pace and sub-aerial processes controlling the profile, so neither is more important everywhere.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Marine processes, such as hydraulic action and abrasion, cut a notch at the foot of the cliff and remove the debris, so they control where the cliff retreats. Sub-aerial weathering, including freeze–thaw, salt crystal growth and solution, weakens the rock, and mass movements such as rockfalls and slumping bring the cliff face down. The two depend on each other: the waves remove the debris so that the cliff stays exposed, and the weathering and mass movement provide the load for abrasion. Where a wide beach protects the foot of the cliff or wave energy is low, sub-aerial processes dominate and the cliff degrades to a gentler slope. Where the rock is hard and wave energy is high, marine erosion dominates and the cliff remains steep. I conclude that marine erosion sets the pace and sub-aerial processes control the profile, so neither is more important everywhere.",
    wordLimit: { max: 300 }, explanation: "Weigh marine against sub-aerial processes and show how they interact." });

  b.card("DEFINITION", "Sub-aerial processes", "Weathering and mass movement acting on the land above the reach of the waves, such as freeze–thaw, salt crystal growth, rockfall and slumping.");
  b.card("CONCEPT", "Cliff retreat cycle", "Waves undercut the base to form a notch; the unsupported rock collapses; waves remove the debris; the cycle repeats.");
  b.card("DEFINITION", "Shore platform", "A gently sloping rock surface (about 1–3°) at the foot of a cliff, formed by cliff retreat, abrasion and weathering; it reduces wave energy.");
  b.card("CONCEPT", "Order of landforms on a headland", "Cave, arch, stack, stump. A geo is a separate feature formed when the roof of a cave or blowhole collapses.");
  b.card("DEFINITION", "Concordant coastline", "A coast where the bands of rock lie parallel to the shore; example Dalmatian coast of Croatia and Lulworth Cove.");
  b.card("DEFINITION", "Discordant coastline", "A coast where the rock bands lie at right angles to the shore, giving alternating headlands and bays; example Swanage Bay and the Purbeck headlands.");
  b.card("CONCEPT", "Coastal mass movements", "Rockfall from steep jointed cliffs, landslides and rotational slumping in saturated clay, and mudflows of saturated soil.");
  b.card("CONCEPT", "Weathering on cliffs", "Freeze–thaw (below 0 °C), salt crystal growth, carbonation and solution of limestone, and hydrolysis of feldspar.");
  b.card("FORMULA", "Rate of cliff retreat", "Rate (m per year) = distance retreated ÷ time; volume lost = length × height × retreat; mass = volume × density.");
});
