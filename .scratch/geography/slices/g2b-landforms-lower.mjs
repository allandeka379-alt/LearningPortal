// Slice G2b: river landforms of deposition (meanders, oxbow lakes, floodplains, levées, braiding, deltas).
import { concept, P, ZIM, geographyLevels } from "../lib.mjs";

const XS = "**Table 1: Depth and velocity across a meander bend on a fictional river (measured from the left bank)**\n\n| Distance from left bank (m) | 0 | 1 | 2 | 3 | 4 | 5 | 6 |\n|---|---|---|---|---|---|---|---|\n| Depth (m) | 0 | 0.15 | 0.3 | 0.45 | 0.7 | 1.1 | 1.3 |\n| Velocity (m/s) | 0 | 0.1 | 0.2 | 0.35 | 0.5 | 0.65 | 0.6 |\n\nThe right bank is a steep bank of bare soil 2 m high; the left bank is a gentle slope of sand.";

const DELTA = "**Table 2: Sediment reaching the mouth of a fictional river, before and after a large dam was built upstream**\n\n| Period | Sediment reaching the mouth (million tonnes per year) | Change in the delta front |\n|---|---|---|\n| Before the dam | 45 | Growing seaward by about 20 m a year |\n| After the dam | 9 | Eroding by about 5 m a year |";

concept("geo.rivers.landforms-lower", { file: "rivers/landforms-lower", keyPrefix: "rivers.landforms-lower" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What name is given to the steep bank on the **outside** of a meander bend?",
    options: [
      ["River cliff", "Correct: it is undercut by fast water and collapses."],
      ["Slip-off slope", "The slip-off slope is the gentle inside bank."],
      ["Levée", "A levée is a raised bank of flood deposits along the channel."],
      ["Spur", "Spurs are ridges in upper-course valleys."],
    ],
    answer: "A",
    explanation: "Fast, deep water on the outside erodes laterally, forming a **river cliff**.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which landform is a horseshoe-shaped lake on a floodplain?",
    options: [
      ["Oxbow lake", "Correct: a meander cut off from the river."],
      ["Plunge pool", "A plunge pool is at the foot of a waterfall."],
      ["Reservoir", "A reservoir is a human-made lake behind a dam."],
      ["Pothole", "A pothole is a small hollow in a rocky bed."],
    ],
    answer: "A",
    explanation: "An **oxbow lake** is an abandoned meander bend.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why is sand deposited on the **inside** of a meander bend?",
    options: [
      ["Water there is shallow and slow, so it loses energy", "Correct: low velocity means the river drops load."],
      ["Water there is deep and fast, so it carries more load", "Deep, fast water is found on the outside, where erosion occurs."],
      ["Waves push sand towards the inner bank", "There are no waves of significance in a river bend."],
      ["The inner bank is made of harder rock", "Rock type is not the reason; flow speed is."],
    ],
    answer: "A",
    explanation: "On the inside of the bend velocity is low, so the river deposits sand and gravel, forming a slip-off slope.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why are levées made of **coarser** material than the rest of the floodplain?",
    options: [
      ["Coarse load is dropped first as floodwater leaves the channel", "Correct: velocity falls at once beside the channel."],
      ["Fine silt is washed away from the banks by rain", "Rain-wash is not the reason; sorting during floods is."],
      ["Farmers pile stones along the banks to protect fields", "Natural levées are built by the river, not people."],
      ["Coarse material is carried furthest across the floodplain", "Coarse material is dropped first, close to the channel."],
    ],
    answer: "A",
    explanation: "When the river overflows, velocity drops immediately beside the channel. The heaviest particles settle there; fine silt travels further.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which type of delta has long distributaries reaching far into the sea?",
    options: [
      ["Bird's-foot", "Correct: like the Mississippi, with weak waves and a large load."],
      ["Arcuate", "Arcuate deltas are fan-shaped with a curved front, like the Nile."],
      ["Estuarine", "Estuarine deltas fill a drowned river mouth."],
      ["Cuspate spit", "This is not a delta type; spits are coastal landforms."],
    ],
    answer: "A",
    explanation: "A **bird's-foot** delta forms where a heavy load meets weak waves and tides, so distributaries extend out like toes.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "When is the neck of a meander most likely to be cut through to form an oxbow lake?",
    options: [
      ["During a flood, when the river has extra energy", "Correct: high discharge lets the river take the shorter route."],
      ["In the dry season, when the river is lowest", "Low flow has little energy to cut through the neck."],
      ["When a delta begins to form at the mouth", "Delta formation at the mouth does not affect a meander neck."],
      ["When deposition fills the outer bend", "The outer bend is eroded, not filled."],
    ],
    answer: "A",
    explanation: "Erosion narrows the neck over years; a **flood** usually breaks through it.",
    hints: ["When does a river have the most energy?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A river has a very variable discharge and carries a large load of sand. As the flood falls, it divides into many channels around sandbars. What is this pattern called?",
    options: [
      ["Braiding", "Correct: bars split the flow into interlinking channels."],
      ["Meandering", "Meanders are single winding channels."],
      ["Rejuvenation", "Rejuvenation is renewed downcutting after a fall in base level."],
      ["Interlocking", "Interlocking spurs belong to the upper course."],
    ],
    answer: "A",
    explanation: "A **braided** channel forms where the load is too large to carry when flow drops, so bars build up and split the flow.",
    hints: ["What happens to a large load when discharge falls?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Since large dams were built upstream, many deltas around the world have stopped growing or are eroding. What is the main reason?",
    options: [
      ["Reservoirs trap sediment that once reached the mouth", "Correct: less sediment arrives to replace what waves remove."],
      ["Dams make river water flow faster at the mouth", "Discharge at the mouth is usually reduced or evened out, not sped up."],
      ["Dams raise sea level near the delta", "Dams do not affect global sea level in this way."],
      ["Reservoir water is saltier, so clay will not settle", "Reservoir water is fresh; salinity is not the issue."],
    ],
    answer: "A",
    explanation: "A delta grows only if more sediment arrives than the sea removes. Dams trap sediment, so waves and currents erode the delta front.",
    hints: ["What does a reservoir do to the load?", "What keeps a delta growing?"],
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "A river channel between two points measures 10.5 km along its course; the straight-line distance between the points is 6.0 km. Calculate the sinuosity, to two decimal places.",
    value: 1.75, tol: 0.005, answer: "1.75",
    wrong: [0.57, 4.5],
    explanation: "Sinuosity = channel length ÷ straight-line distance = 10.5 ÷ 6.0 = 1.75.",
    hints: ["Sinuosity = channel length ÷ straight-line distance."],
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "A river splits into smaller channels called {{blank:a}} as it crosses a delta. The fine sediment deposited on a floodplain is called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["distributaries", "distributary channels"], wrong: "tributaries" },
      { id: "b", accepted: ["alluvium", "alluvial soil", "alluvial deposits", "silt"], wrong: "laterite" },
    ],
    explanation: "Delta channels are **distributaries**; floodplain deposits are **alluvium**.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each landform with the process that forms it.",
    pairs: [
      ["River cliff", "Lateral erosion on the outside of a bend"],
      ["Slip-off slope", "Deposition on the inside of a bend"],
      ["Levée", "Coarse deposits dropped beside the channel in floods"],
      ["Oxbow lake", "Cut-off of a meander neck followed by sealing deposition"],
      ["Delta", "Deposition where a river enters the sea or a lake"],
    ],
    explanation: "Lower-course landforms come from lateral erosion and, above all, deposition.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A floodplain is built up from layers of alluvium deposited during floods.",
    answer: true,
    explanation: "True. Each flood adds a thin layer of silt, slowly building a flat, fertile floodplain.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The deepest water in a meander bend is on the inside of the bend.",
    answer: false,
    explanation: "False. The deepest, fastest water is on the **outside**, next to the river cliff.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the natural raised bank of deposited material along the edge of a river channel.",
    accepted: ["levée", "levee", "levées", "levees", "a levee", "a levée"],
    wrong: ["river cliff"],
    explanation: "A **levée** is built from coarse flood deposits beside the channel.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain the formation of an oxbow lake.",
    points: [
      "Lateral erosion on the outer banks of two bends brings them closer, narrowing the neck.",
      "In a flood the river cuts through the neck, taking the shortest route.",
      "The river flows along the new straight channel.",
      "Deposition seals off the old bend, leaving a horseshoe-shaped lake.",
    ],
    modelAnswer: "Erosion on the outside of two neighbouring meander bends brings them closer together until only a narrow neck of land separates them. During a flood the river has enough energy to cut through the neck and flows along the new, shorter course. Deposition along the edges of the new channel seals off the old bend, which is left as a horseshoe-shaped oxbow lake.",
    explanation: "Four stages in order.",
    hints: ["Where does erosion happen on a bend?", "What event breaks through the neck?"],
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe the cross-section of a river channel at a meander bend.",
    points: [
      "It is asymmetrical.",
      "The outer side has a steep river cliff and deep water.",
      "The inner side has a gentle slip-off slope and shallow water.",
    ],
    modelAnswer: "The channel cross-section at a meander is asymmetrical. On the outside of the bend there is a steep river cliff with deep, fast water. On the inside there is a gently sloping slip-off slope of sand with shallow water.",
    explanation: "Shape, outer side and inner side.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "Explain how floodplains and levées form, and suggest why floodplains are both attractive and risky places for people to live. Refer to a named example.",
    points: [
      ["Meander migration widens the valley floor.", 1],
      ["Floodwater spreads, slows and deposits alluvium; layers build a flat floodplain.", 1],
      ["Coarsest load dropped first beside the channel builds levées over many floods.", 1],
      ["Attractions: fertile alluvial soils, flat land, water supply, grazing.", 1],
      ["Risks: regular flooding damages crops, homes and roads; disease after floods.", 1],
      ["Named example used with detail (e.g. Zambezi floodplain at Mana Pools, Muzarabani in the lower Zambezi valley, or the Nile floodplain).", 1],
    ],
    levels: geographyLevels(6),
    modelAnswer: "As meanders migrate sideways and downstream they erode the valley sides, widening a flat valley floor. When the river floods, water spreads over this floor, becomes shallow and slows, so it deposits alluvium. Layer after layer builds a flat floodplain. The coarsest material is dropped first, right beside the channel where the water first loses velocity, and over many floods it builds raised banks called levées.\n\nFloodplains attract people because the alluvial soils are fertile and easy to cultivate, the land is flat for building and roads, and water is close by for crops and livestock. In the lower Zambezi valley, for example at Muzarabani, farmers grow crops on fertile valley soils. However, the same floods that build the floodplain destroy crops, homes and roads, and standing water after floods spreads diseases such as malaria and cholera. Living on a floodplain is a trade-off between high productivity and regular risk.",
    explanation: "Credit accurate formation and a balanced view of benefits and hazards with an example.",
    hints: ["Explain formation first, then attractions, then risks.", "Name a real floodplain."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: `Students measured a cross-section across a meander bend.\n\n${XS}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "State the maximum depth recorded.", value: 1.3, unit: "m", tol: 0.01, answer: "1.3", wrong: [0.65], explanation: "1.3 m at 6 m from the left bank." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the mean depth across the seven measurement points, to two decimal places.", value: 0.571428571, unit: "m", tol: 0.006, answer: "0.57", wrong: [4, 0.65], explanation: "(0 + 0.15 + 0.3 + 0.45 + 0.7 + 1.1 + 1.3) ÷ 7 = 4.0 ÷ 7 = 0.57 m." }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which bank is on the **outside** of the bend?", options: [
        ["The right bank", "Correct: deep, fast water and a steep, bare bank."],
        ["The left bank", "The left bank is a gentle slope of sand: the slip-off slope on the inside."],
        ["Neither: the bend is symmetrical", "Depth and velocity differ strongly from one side to the other."],
        ["Both banks equally", "Only one bank shows the signs of erosion."],
      ], answer: "A", explanation: "The right side has the deepest, fastest water and a steep bank: a river cliff." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain the differences between the two banks.", points: [
        "Fastest flow (0.65 m/s) is near the right bank, causing lateral erosion by hydraulic action and abrasion.",
        "The right bank is undercut and collapses, forming a steep river cliff.",
        "Slow water (0.1-0.2 m/s) near the left bank deposits sand, building a gentle slip-off slope.",
      ], explanation: "Link velocity to erosion and deposition with data." }),
    ],
    hints: ["Mean = total ÷ number of readings.", "Where is velocity highest?"],
    explanation: "Practice interpreting a meander cross-section.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `Study Table 2.\n\n${DELTA}`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the percentage decrease in sediment reaching the mouth after the dam was built.", value: 80, unit: "%", wrong: [36, 20], explanation: "Decrease = 45 − 9 = 36 million tonnes; 36 ÷ 45 × 100 = 80 %." }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain why the dam reduced the sediment reaching the mouth.", points: [
        "The river slows down when it enters the reservoir behind the dam.",
        "It deposits most of its load in the reservoir, so clear water is released downstream.",
      ], explanation: "Reservoirs act as sediment traps." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why the delta front changed from growing to eroding.", points: [
        "A delta grows only when sediment supply is greater than removal by waves and currents.",
        "With much less sediment arriving, waves and currents now remove more than is supplied.",
      ], explanation: "Balance between supply and removal." }),
    ],
    hints: ["Percentage decrease = decrease ÷ original × 100."],
    explanation: "Practice on the effect of dams on deltas.",
  });
  b.card("DEFINITION", "Meander", "A pronounced bend in a river: river cliff (outside, erosion) and slip-off slope (inside, deposition).");
  b.card("CONCEPT", "Oxbow lake formation", "Outer-bank erosion narrows the neck → flood cuts through → new straight channel → deposition seals the old bend.");
  b.card("DEFINITION", "Floodplain", "Wide flat land beside a lower-course river, built of alluvium deposited in floods.");
  b.card("DEFINITION", "Levée", "Natural raised bank beside the channel, built of coarse material dropped first in floods.");
  b.card("DEFINITION", "Delta", "Deposits at a river mouth where sediment supply exceeds removal by waves and currents; crossed by distributaries.");
  b.card("CONCEPT", "Delta types", "Arcuate (fan, e.g. Nile); bird's-foot (long fingers, e.g. Mississippi); estuarine (fills an estuary).");
  b.card("DEFINITION", "Braided channel", "Channel split by bars of sediment into many interlinking channels; large load and variable discharge.");
  b.card("FACT", "Mana Pools", "Zambezi floodplain below the escarpment; named after four pools left as old river channels; part of a World Heritage Site.", undefined, { applies: ZIM });
  b.card("DEFINITION", "Sinuosity", "Channel length ÷ straight-line distance. About 1 = straight; above about 1.5 = meandering.");
});
