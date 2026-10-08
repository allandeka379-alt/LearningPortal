// Slice G2b: river landforms of erosion (V-shaped valleys, interlocking spurs, potholes, rapids, waterfalls, gorges).
import { concept, P, ZIM, geographyLevels } from "../lib.mjs";

const MAP = "**Map extract (fictional area)**: scale 1:50,000; grid squares 1 km; contour interval 20 m. Columns are eastings, rows northings.\n\n| N \\ E | 41 | 42 | 43 |\n|---|---|---|---|\n| 63 | Spot height 1462 m at 412 637; river source at 418 634 | River flows south-east between closely spaced contours that V upstream | Track along a ridge |\n| 62 | Spurs project alternately from each bank | Waterfall at 425 623; contours from 1380 m to 1300 m bunched together at the falls | Footbridge at 437 621 |\n| 61 | Steep slopes, no settlement | River in a narrow, cliff-lined valley below the waterfall | Rapids at 438 614 |";

const RETREAT = "**Table 1: Position of the lip of a fictional waterfall, measured from a fixed bridge downstream**\n\n| Year | Distance of lip upstream of bridge (m) |\n|---|---|\n| 1900 | 820 |\n| 1950 | 870 |\n| 2000 | 905 |\n| 2020 | 925 |";

concept("geo.rivers.landforms-upper", { file: "rivers/landforms-upper", keyPrefix: "rivers.landforms-upper" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the deep hollow at the foot of a waterfall called?",
    options: [
      ["Plunge pool", "Correct: scoured by falling water and swirling rocks."],
      ["Oxbow lake", "An oxbow lake is a cut-off meander in the lower course."],
      ["Pothole", "Potholes are small hollows in the bed, drilled by pebbles."],
      ["Levée", "A levée is a raised bank of deposited silt."],
    ],
    answer: "A",
    explanation: "The **plunge pool** is eroded by hydraulic action and abrasion where water lands at the foot of the falls.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which landform is typical of a river's **upper** course?",
    options: [
      ["Interlocking spurs", "Correct: the river winds round resistant ridges as it cuts down."],
      ["Oxbow lake", "Oxbow lakes form in the lower course by deposition and lateral erosion."],
      ["Delta", "Deltas form at the mouth."],
      ["Levée", "Levées form on floodplains in the lower course."],
    ],
    answer: "A",
    explanation: "**Interlocking spurs** are upper-course landforms formed while vertical erosion dominates.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why does a V-shaped valley have sloping sides rather than vertical walls?",
    options: [
      ["Weathering and mass movement wear back the valley sides", "Correct: loosened material slides into the river and is removed."],
      ["The river erodes sideways as strongly as it cuts down", "In the upper course vertical erosion dominates; lateral erosion is weak."],
      ["Deposition builds up sloping banks of silt on each side", "There is little deposition in the upper course."],
      ["Wind erosion cuts the valley sides back in the dry season", "Wind is not the main agent shaping river valleys."],
    ],
    answer: "A",
    explanation: "The river cuts **down**. The sides are lowered by **weathering** and **mass movement**, giving the V shape.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In the general model of waterfall formation, why does an **overhang** develop?",
    options: [
      ["Softer rock below the hard layer is undercut", "Correct: the hard cap is left unsupported."],
      ["Hard rock is eroded faster than the soft rock below", "It is the soft rock that erodes faster."],
      ["Deposition builds a ledge out from the lip", "The overhang is left by erosion, not built by deposition."],
      ["Ice forces open cracks in the hard layer", "Freeze-thaw does not explain the overhang in this model."],
    ],
    answer: "A",
    explanation: "Splashing water and swirling rocks erode the **soft** rock behind the plunge pool, undercutting the hard rock above.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How does a gorge form below a waterfall?",
    options: [
      ["The waterfall retreats upstream after repeated collapses", "Correct: it leaves a narrow, steep-sided valley behind."],
      ["The river deposits high banks of silt on each side", "Gorges are erosional, with rocky walls."],
      ["A fault drops a block of land between two parallel faults", "That forms a rift valley, not a gorge below a waterfall."],
      ["Wind enlarges a crack beside the river in the dry season", "Wind erosion does not form river gorges."],
    ],
    answer: "A",
    explanation: "Each collapse of the overhang moves the falls a little upstream. Over time this leaves a **gorge**.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING", applies: ZIM,
    stem: "The Victoria Falls formed where the Zambezi eroded along what kind of weakness?",
    options: [
      ["Joints and faults in hard basalt", "Correct: cracks in the basalt, some filled with weaker material."],
      ["A layer of soft sandstone beneath granite", "The falls are in basalt and do not follow the hard-over-soft model."],
      ["A band of soluble limestone across the river", "The rock at the falls is basalt, which is not soluble limestone."],
      ["The edge of the Great Dyke", "The Great Dyke lies far to the east, in central Zimbabwe."],
    ],
    answer: "A",
    explanation: "The basalt is cut by joints and faults. The river eroded these weaknesses into chasms, and the falls retreated along them, leaving zigzag gorges.",
    hints: ["What rock forms the plateau at the falls?", "Why are the gorges below the falls zigzag in shape?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "On a topographical map, how would you recognise a V-shaped valley?",
    options: [
      ["Close contours on both sides, forming Vs pointing upstream", "Correct: steep sides and Vs towards higher ground."],
      ["Widely spaced contours with a river meandering between them", "Wide spacing shows a gentle, open valley."],
      ["Contours forming Vs that point downstream towards the sea", "Contour Vs point upstream in valleys; downstream Vs show spurs."],
      ["A circle of contours rising to a spot height in the middle", "That shows a hill or summit."],
    ],
    answer: "A",
    explanation: "In a valley, contours bend upstream (the V points to higher ground). Close spacing on both sides shows steep valley sides.",
    hints: ["Which way do contours point in a valley?", "What does close spacing tell you?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A river crosses the following rock layers in turn: hard, soft, hard, soft, hard, soft, each only a few metres wide. Which landform is most likely?",
    options: [
      ["Rapids", "Correct: unequal erosion of narrow alternating bands gives a series of small steps."],
      ["A single high waterfall", "A single large step needs a thick band of hard rock over soft."],
      ["A delta", "Deltas are depositional and form at the mouth."],
      ["An oxbow lake", "Oxbow lakes are lower-course landforms on floodplains."],
    ],
    answer: "A",
    explanation: "Narrow alternating bands of hard and soft rock are eroded unequally into many small steps, making the water fast, shallow and turbulent: rapids.",
    hints: ["Many small steps or one big step?"],
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "A river falls from 1,450 m to 1,250 m over a horizontal distance of 4 km. Express the average gradient as 1 in …",
    value: 20, prefix: "1 in", tol: 0.5,
    wrong: [200, 0.05],
    explanation: "Vertical drop = 200 m; horizontal distance = 4,000 m. Gradient = 200 : 4,000 = 1 in 20.",
    hints: ["Convert both values to metres.", "Gradient = vertical interval ÷ horizontal distance, written as 1 in …"],
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "Round hollows drilled into a rocky river bed by swirling pebbles are called {{blank:a}}. The process that drills them is {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["potholes", "pot holes", "pot-holes"], wrong: "plunge pools" },
      { id: "b", accepted: ["abrasion", "corrasion"], wrong: "solution" },
    ],
    explanation: "**Potholes** are formed by **abrasion** as pebbles spin in eddies.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each landform with the main reason it forms.",
    pairs: [
      ["V-shaped valley", "Vertical erosion with weathering and mass movement of the sides"],
      ["Interlocking spurs", "River winds round resistant ridges while cutting down"],
      ["Rapids", "Unequal erosion of alternating hard and soft bands"],
      ["Gorge", "Retreat of a waterfall upstream"],
    ],
    explanation: "All four are erosional landforms of the upper course.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Waterfalls retreat upstream over time.",
    answer: true,
    explanation: "True. Repeated undercutting and collapse move the lip upstream, leaving a gorge.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", applies: ZIM, daily: true,
    stem: "The zigzag gorges below the Victoria Falls mark earlier positions of the falls.",
    answer: true,
    explanation: "True. The falls have retreated upstream along successive lines of weakness in the basalt, each leaving a section of gorge.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the landform made of narrow, steep-sided rock walls left as a waterfall retreats.",
    accepted: ["gorge", "a gorge", "gorges"],
    wrong: ["plunge pool"],
    explanation: "A **gorge** marks the path of the retreating waterfall.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe the formation of a V-shaped valley.",
    points: [
      "Vertical erosion: the river cuts down into its bed by abrasion and hydraulic action (steep gradient, large load).",
      "The valley sides are weathered (loosened by rain, roots, temperature changes).",
      "Material moves down the sides by mass movement and is carried away by the river, producing steep sloping sides and a narrow floor.",
    ],
    modelAnswer: "In the upper course the river has a steep gradient and carries large boulders in floods. These cut down into the bed by abrasion and hydraulic action. The exposed valley sides are weathered, and the loosened material slides or creeps down into the river, which removes it. The valley therefore has steep, sloping sides and a narrow floor: a V shape.",
    explanation: "River cuts down + sides weathered + mass movement.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain the formation of a waterfall where hard rock lies on top of soft rock.",
    points: [
      "Soft rock downstream is eroded faster than the hard rock, creating a step.",
      "Falling water scours a plunge pool by hydraulic action and abrasion.",
      "Soft rock behind the pool is undercut, leaving an overhang of hard rock.",
      "The overhang collapses and the waterfall retreats upstream (leaving a gorge).",
    ],
    modelAnswer: "Where a band of hard rock lies over softer rock, the river erodes the soft rock faster, forming a step. Water falling over the step erodes a plunge pool by hydraulic action and abrasion. Spray and swirling water undercut the soft rock at the back of the pool, leaving an overhang of hard rock. When the overhang becomes unsupported it collapses, and the falls retreat upstream, leaving a gorge.",
    explanation: "One mark for each stage in order.",
    hints: ["Start with the two rock types.", "End with retreat."],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 7, applies: ZIM,
    stem: "With reference to the Victoria Falls, explain how waterfalls and gorges form, and discuss how far the Victoria Falls fit the general model of waterfall formation.",
    points: [
      ["General model: hard rock over soft; soft rock eroded faster; step forms.", 1],
      ["Plunge pool scoured; undercutting; overhang collapses; falls retreat and gorge forms.", 1],
      ["Victoria Falls: basalt plateau; about 1.7 km wide and about 100 m high (approximate).", 1],
      ["Basalt cracked along joints and faults, some filled with weaker material.", 1],
      ["River eroded along a line of weakness to form a chasm; falls retreat to successive weaknesses.", 1],
      ["Zigzag gorges (Batoka Gorge) mark former positions; Devil's Cataract cutting back now.", 1],
      ["Judgement: same processes (hydraulic action, abrasion, retreat, gorge) but a different weakness, so a partial fit.", 1],
    ],
    levels: geographyLevels(7),
    modelAnswer: "In the general model a waterfall forms where a band of hard rock lies over softer rock. The soft rock is eroded faster, creating a step. Water plunging over the step scours a plunge pool by hydraulic action and abrasion, and spray undercuts the soft rock behind it, leaving an overhang of hard rock. When the overhang collapses the falls retreat upstream, leaving a steep-sided gorge.\n\nThe Victoria Falls on the Zambezi are about 1.7 km wide and about 100 m high. They lie on a plateau of hard basalt that is cut by joints and faults, some filled with weaker material. The river eroded one of these weaknesses into a deep chasm, and the whole river now falls into it. The water escapes through a narrow outlet and has cut back along other lines of weakness, so over time the falls have moved upstream in steps, leaving the zigzag gorges below them, including the Batoka Gorge. At the Devil's Cataract the lip is lower, and erosion appears to be cutting back along a new line.\n\nThe Victoria Falls therefore fit the general model in their processes: hydraulic action and abrasion, retreat upstream and gorge formation. They do not fit it in the cause of the step, which is a line of joints and faults in one rock type rather than hard rock over soft rock. The model is a good general explanation, but the case study shows that geology controls the details.",
    explanation: "Level 3 answers explain both the model and the case study accurately and reach a reasoned judgement.",
    hints: ["Explain the general model first.", "What is different about the rock at the Victoria Falls?"],
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: `Study the map extract.\n\n${MAP}`,
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Give the four-figure grid reference of the square containing the rapids.", accepted: ["4361", "43 61"], wrong: ["4362"], explanation: "The rapids at 438 614 are in the square whose south-west corner is 43 61: 4361." }),
      P.num({ label: "(b)", marks: 1, stem: "Using the contours, state the height of the drop at the waterfall.", value: 80, unit: "m", wrong: [20], explanation: "1380 − 1300 = 80 m." }),
      P.num({ label: "(c)", marks: 1, stem: "Calculate the straight-line distance from the waterfall (425 623) to the rapids (438 614), to one decimal place.", value: 1.6, unit: "km", tol: 0.1, answer: "1.6", wrong: [2.2], explanation: "Eastings differ by 1.3 km and northings by 0.9 km; √(1.3² + 0.9²) = 1.58 km, about 1.6 km." }),
      P.num({ label: "(d)", marks: 1, stem: "Give the bearing of the rapids from the waterfall.", value: 125, unit: "°", tol: 2, answer: "125", wrong: [305], explanation: "Bearing = 90° + tan⁻¹(0.9 ÷ 1.3) = 90° + 34.7° ≈ 125°." }),
      P.mcq({ label: "(e)", marks: 1, stem: "Which landform is described in square 4261?", options: [
        ["A gorge", "Correct: a narrow, cliff-lined valley below a waterfall."],
        ["A floodplain", "A floodplain is wide and flat."],
        ["A meander", "Nothing describes a bend; the valley is narrow."],
        ["A delta", "Deltas form at a river mouth."],
      ], answer: "A", explanation: "Below the waterfall, the cliff-lined narrow valley is a gorge." }),
      P.manual({ label: "(f)", marks: 3, stem: "Using evidence from the extract, explain why this is the upper course of the river.", points: [
        "The source is nearby (418 634) and land is high (spot height 1462 m).",
        "Closely spaced contours that V upstream show a steep, narrow V-shaped valley / spurs alternate on each bank (interlocking spurs).",
        "Erosional landforms such as a waterfall, gorge and rapids show vertical erosion and a steep gradient.",
      ], explanation: "Use map evidence with references." }),
    ],
    hints: ["The four-figure reference uses the south-west corner of the square.", "Bearings are measured clockwise from grid north."],
    explanation: "Map work on upper-course landforms.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `Study Table 1.\n\n${RETREAT}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "How far did the lip retreat between 1900 and 2020?", value: 105, unit: "m", wrong: [925], explanation: "925 − 820 = 105 m." }),
      P.num({ type: "CALCULATION", label: "(b)", marks: 2, stem: "Calculate the mean rate of retreat between 1900 and 2020 in metres per year, to two decimal places.", value: 0.875, tol: 0.006, answer: "0.88", wrong: [1.05, 7.7], explanation: "105 m ÷ 120 years = 0.875 m/year, about 0.88 m/year.", workedSolution: "1. Retreat = 925 − 820 = 105 m.\n2. Time = 2020 − 1900 = 120 years.\n3. Rate = 105 ÷ 120 = 0.875 m per year (0.88 to two decimal places)." }),
      P.manual({ label: "(c)", marks: 2, stem: "Describe how the rate of retreat changed over the period. Use data.", points: [
        "The rate slowed from 1900-1950 to 1950-2000 (50 m in 50 years = 1 m/yr, then 35 m in 50 years = 0.7 m/yr).",
        "It then rose again in 2000-2020 (20 m in 20 years = 1 m/yr).",
      ], explanation: "Compare rates, not just distances, because the periods differ in length." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest **two** reasons why the rate of retreat varies over time.", points: [
        "Changes in discharge (e.g. wetter decades or large floods give more erosion).",
        "Collapse happens in sudden events / rock strength varies along the gorge.",
      ], explanation: "Any two sensible reasons." }),
    ],
    hints: ["Divide distance by time.", "The periods are not all the same length."],
    explanation: "Practice calculating waterfall retreat from data.",
  });
  b.card("DEFINITION", "V-shaped valley", "Steep-sided narrow valley: vertical erosion plus weathering and mass movement of the sides.");
  b.card("DEFINITION", "Interlocking spurs", "Ridges projecting alternately from each side of a valley, formed as the river winds round resistant rock.");
  b.card("CONCEPT", "Waterfall formation", "Hard over soft rock → soft eroded faster → plunge pool → undercutting → overhang → collapse → retreat → gorge.");
  b.card("DEFINITION", "Gorge", "Narrow, steep-sided valley left as a waterfall retreats upstream.");
  b.card("DEFINITION", "Rapids", "Fast, turbulent water over a steep, uneven bed, often where hard and soft bands alternate.");
  b.card("DEFINITION", "Pothole", "Round hollow in a rocky bed drilled by pebbles swirling in eddies (abrasion).");
  b.card("FACT", "Victoria Falls", "Zambezi, Zimbabwe-Zambia border; about 1.7 km wide, about 100 m high; basalt; World Heritage Site; Mosi-oa-Tunya.");
  b.card("CONCEPT", "Why the Victoria Falls gorges zigzag", "The falls retreated along successive joints and faults in basalt; each gorge section was once the falls.");
  b.card("CONCEPT", "V-shaped valley on a map", "Close contours on both sides, forming Vs that point upstream.");
});
