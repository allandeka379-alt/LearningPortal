// W2a: hydro.river-processes-landforms (both boards; long profile and channel efficiency are ZIMSEC detail). Numbers computed:
// discharge, hydraulic radius, sinuosity (see tables/w2a-hydro-river-processes-landforms.mjs).
import { concept, P, geographyLevels, chk, rnd, discharge, hydraulicRadius, sinuosity, ZIM } from "../lib.mjs";
import { mc, tbl } from "../tables/w2a-_q.mjs";

// Struct 1: two cross-sections (rectangular channels, illustrative data)
const SITES = { A: { w: 4, d: 0.5, v: 0.35 }, B: { w: 18, d: 2.5, v: 0.95 } };
const area = (s) => s.w * s.d;
const wp = (s) => s.w + 2 * s.d;
const areaB = chk(area(SITES.B), 45);
const qB = chk(discharge(SITES.B.w, SITES.B.d, SITES.B.v), 42.75, 1e-9);
const rA = chk(hydraulicRadius(area(SITES.A), wp(SITES.A)), 0.4, 1e-9);
rnd(hydraulicRadius(area(SITES.B), wp(SITES.B)), 2, 1.96, "rB");
const XS = tbl(["Site", "Channel width (m)", "Mean depth (m)", "Mean velocity (m/s)"], [
  ["A (upper course)", SITES.A.w, SITES.A.d, SITES.A.v],
  ["B (lower course)", SITES.B.w, SITES.B.d, SITES.B.v],
]);
// Struct 2: sinuosity
const sinu = chk(sinuosity(11.2, 6.4), 1.75, 1e-9);
// Singles
const q1 = chk(discharge(8, 1.25, 0.6), 6, 1e-9);
const sin2 = chk(sinuosity(3.6, 2.4), 1.5, 1e-9);

concept("ageo.hydro.river-processes-landforms", { file: "hydro/river-processes-landforms", keyPrefix: "hydro.river-processes-landforms" }, (b) => {
  mc(b, 2, "RECALL", "Which river erosion process is the grinding of the bed and banks by the sediment the river carries?", [
    ["Abrasion", "Correct: the load scrapes and wears the channel."],
    ["Attrition", "Attrition is the load breaking itself into smaller, rounder pieces."],
    ["Hydraulic action", "Hydraulic action is the force of water and compressed air in cracks."],
    ["Solution", "Solution is the dissolving of soluble rock such as limestone."],
  ], "**Abrasion (corrasion)** is the load wearing away the bed and banks.", { daily: true });
  mc(b, 1, "RECALL", "In which way is fine silt mainly transported by a river?", [
    ["Suspension", "Correct: silt and clay are held up within the flow."],
    ["Traction", "Traction rolls large boulders along the bed."],
    ["Saltation", "Saltation is the hopping of sand and small pebbles."],
    ["Solution", "Solution carries dissolved minerals, not silt particles."],
  ], "Fine particles travel in **suspension**.");
  mc(b, 2, "UNDERSTANDING", "Where on a meander bend is a point bar formed?", [
    ["On the inside of the bend, where the flow is slow", "Correct: slow water drops sand and gravel."],
    ["On the outside of the bend, where the flow is fast", "The outside is eroded to form a river cliff."],
    ["At the centre of the channel at the thalweg", "The thalweg is the line of deepest, fastest flow."],
    ["Only below a waterfall in the upper course", "Point bars belong to meandering reaches in the middle and lower course."],
  ], "**Deposition on the inner bank** builds a gently sloping point bar.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What is the main cause of an oxbow lake?", [
    ["A meander neck is cut through in a flood and the old bend is sealed off", "Correct: the river takes the short cut and the old loop is left as a lake."],
    ["A waterfall retreats upstream and leaves a deep plunge pool", "A plunge pool lies at the foot of a waterfall; it is not an oxbow."],
    ["A glacier scours a hollow that fills with meltwater", "Glaciers do not form oxbow lakes."],
    ["A levee collapses and spills water onto the floodplain", "That causes flooding, not an oxbow lake."],
  ], "An oxbow lake is a **cut-off meander** loop.");
  mc(b, 3, "APPLICATION", "A river meets a band of hard rock lying over softer rock. What landform is most likely to form, and why?", [
    ["A waterfall, because the soft rock is eroded faster and undercuts the hard rock", "Correct: the hard cap collapses and the fall retreats upstream."],
    ["A delta, because the hard rock stops the river and makes it deposit its load there", "Deltas form where a river meets standing water and deposits its load."],
    ["An oxbow lake, because the river is forced to cut off a loop", "Oxbows form by meander cut-off, not rock hardness."],
    ["A levee, because the river overflows its banks", "Levees form by deposition during floods on the floodplain."],
  ], "Differential erosion leaves a step in the long profile: a **waterfall** with a plunge pool and a gorge.", { hints: ["Which rock is eroded faster?"] });
  mc(b, 3, "UNDERSTANDING", "Why does a river's mean velocity generally increase downstream although its gradient decreases?", [
    ["The channel is deeper and smoother, so there is less friction for the water", "Correct: a larger hydraulic radius means a more efficient channel."],
    ["The load becomes larger and pushes the water forward", "The load becomes finer downstream."],
    ["The valley becomes narrower, which squeezes the water into a much smaller space", "The valley and channel generally widen."],
    ["Evaporation removes water, so the same flow moves faster", "Discharge increases downstream as tributaries join."],
  ], "Greater **channel efficiency** (larger hydraulic radius, smoother bed) outweighs the gentler gradient.", { hints: ["Think about the ratio of area to wetted perimeter."] });
  mc(b, 2, "RECALL", "Which landform is built by repeated floods dropping the coarsest load beside the channel?", [
    ["A levee", "Correct: water slows as it leaves the channel and drops coarse material at the edge."],
    ["A point bar", "A point bar forms on the inside of a bend."],
    ["A plunge pool", "A plunge pool is eroded at the foot of a waterfall."],
    ["A riffle", "A riffle is a shallow bed of coarse material within the channel."],
  ], "**Levees** are natural raised banks built in floods.");

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "In most natural rivers, the flow is laminar.", answer: false,
    feedbackFalse: "Correct: flow in natural rivers is turbulent, in eddies and swirls.", feedbackTrue: "Not so: laminar flow in smooth layers is rare in rivers.",
    explanation: "Turbulent flow is normal in rivers and helps to lift sediment." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Deposition is most likely where a river's velocity falls, such as on the inside of a bend or at the mouth.", answer: true,
    feedbackTrue: "Correct: lower velocity means less energy to carry the load.", feedbackFalse: "Not so: slow water cannot carry as much load.",
    explanation: "Deposition occurs when the river loses energy as velocity or discharge falls." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each landform to the process that mainly forms it.",
    pairs: [
      ["River cliff", "Erosion on the outside of a meander bend"],
      ["Point bar", "Deposition on the inside of a meander bend"],
      ["Gorge", "Retreat of a waterfall upstream"],
      ["Levee", "Deposition of coarse load beside the channel in floods"],
      ["Oxbow lake", "Cut-off of a meander neck"],
    ], explanation: "Each landform results from erosion or deposition at a particular place in the channel." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "The line of deepest and fastest flow in a channel is the {{blank:a}}. Load that rolls along the bed is moved by {{blank:b}}. A graph of bed height against distance from the source is a {{blank:c}} profile.",
    blanks: [
      { id: "a", accepted: ["thalweg"], choices: ["thalweg", "levee", "riffle"] },
      { id: "b", accepted: ["traction"], choices: ["traction", "suspension", "solution"] },
      { id: "c", accepted: ["long"], choices: ["long", "cross", "valley-side"] },
    ], explanation: "The thalweg is the fastest, deepest line; traction rolls boulders; the long profile shows the river's gradient." });
  b.short({ d: 2, skill: "RECALL", stem: "Name the landform formed on the outside of a meander bend where erosion undercuts the bank.",
    accepted: ["river cliff", "a river cliff", "bluff", "cliff", "undercut bank", "cut bank"], explanation: "The **river cliff** is a steep bank undercut by erosion where the flow is fastest." });

  b.num({ d: 2, skill: "APPLICATION", calculator: true, unit: "m³/s", daily: true,
    stem: "A river channel is 8 m wide with a mean depth of 1.25 m. The mean velocity is 0.6 m/s. Calculate the discharge, in m³/s.",
    hints: ["Discharge = cross-sectional area × velocity."],
    value: q1, wrong: [10, 9.85],
    explanation: "Area = 8 × 1.25 = 10 m². Discharge = 10 × 0.6 = **6 m³/s**. The value 10 is the area only." });
  b.calc({ d: 3, skill: "APPLICATION", calculator: true, unit: "m",
    stem: "A rectangular channel is 10 m wide and 2 m deep. Calculate its hydraulic radius (area ÷ wetted perimeter), in metres to 2 decimal places.",
    hints: ["Wetted perimeter = width + 2 × depth.", "Area = width × depth."],
    value: hydraulicRadius(20, 14), dp: 2, wrong: [1.67, 20],
    explanation: "1. Area = 10 × 2 = 20 m².\n2. Wetted perimeter = 10 + 2 × 2 = 14 m.\n3. Hydraulic radius = 20 ÷ 14 = **1.43 m**. The value 1.67 comes from using 12 m, which leaves out one bank." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true,
    stem: "A river reach is 3.6 km long along the channel, and its ends are 2.4 km apart in a straight line. Calculate the sinuosity.",
    hints: ["Sinuosity = channel length ÷ straight-line distance."],
    value: sin2, dp: 2, wrong: [0.67, 1.2],
    explanation: "3.6 ÷ 2.4 = **1.5**. The value 0.67 turns the ratio upside down. A value of 1.5 or more is usually described as meandering." });

  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how a waterfall and gorge form.",
    hints: ["Start with the two rock types.", "End with the retreat of the fall."],
    points: [
      "A river crosses a layer of hard rock lying over softer rock.",
      "The soft rock is eroded faster (by abrasion and hydraulic action), so the hard rock is undercut.",
      "A plunge pool is eroded at the foot of the fall by swirling water and the load.",
      "The overhanging hard rock collapses and the waterfall retreats upstream, leaving a steep-sided gorge.",
    ],
    modelAnswer: "Where a river crosses hard rock over soft rock, the soft rock is eroded faster by abrasion and hydraulic action, so the hard rock is undercut. A plunge pool deepens at the base. The overhang collapses and the waterfall retreats upstream, leaving a gorge downstream.",
    explanation: "Differential erosion and undercutting, then retreat, produce the gorge." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why a river cliff forms on the outside of a meander bend but a point bar forms on the inside.",
    hints: ["Think about where the thalweg lies and where velocity is lowest."],
    points: [
      "Helicoidal flow and the thalweg bring the fastest flow to the outside of the bend.",
      "Fast, turbulent flow erodes (undercuts) the outer bank, forming a steep river cliff.",
      "Water on the inside of the bend is slow and shallow, so energy is low.",
      "The river drops sand and gravel there, building a gently sloping point bar.",
    ],
    modelAnswer: "The thalweg and helicoidal flow take the fastest water to the outside of the bend, where it undercuts the bank and forms a river cliff. On the inside the water is slow, so the river deposits sand and gravel and builds a point bar.",
    explanation: "Contrast erosion (fast flow) with deposition (slow flow)." });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe how a levee forms.",
    points: [
      "The river floods and water overflows the banks.",
      "The water slows suddenly as it leaves the channel and spreads out.",
      "It drops the coarsest part of its load beside the channel, and repeated floods build a raised bank.",
    ],
    modelAnswer: "When the river floods, water spills over the bank and slows suddenly. It drops its coarsest sediment next to the channel, and repeated floods build up a natural raised bank, the levee.",
    explanation: "Sudden loss of velocity causes deposition beside the channel." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why velocity can be higher in a wide, deep lower-course channel than in a narrow upper-course stream.",
    hints: ["Use the idea of friction and hydraulic radius."],
    points: [
      "In a large channel a smaller share of the water touches the bed and banks (a larger hydraulic radius).",
      "Less friction means less energy is lost, so the channel is more efficient.",
      "The lower-course bed is smoother, with finer load, than the boulder-strewn upper course.",
      "Discharge is also larger because tributaries have joined, so the channel is deeper and the water moves faster.",
    ],
    modelAnswer: "In the wide, deep channel less water is in contact with the bed and banks, so the hydraulic radius is larger and less energy is lost to friction. The bed is smoother, with finer load, and discharge is greater, so velocity is higher despite the gentler gradient.",
    explanation: "Channel efficiency, not gradient alone, controls velocity." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, applies: ZIM,
    stem: `The table gives measurements at two rectangular cross-sections of a river in the Eastern Highlands of Zimbabwe (illustrative data, invented for this exercise).\n\n${XS}`,
    hints: ["Area = width × mean depth; discharge = area × velocity.", "Wetted perimeter = width + 2 × depth."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the cross-sectional area at site B, in m².", value: areaB, unit: "m²", wrong: [20.5, 2.0],
        explanation: "18 × 2.5 = 45 m²." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the discharge at site B, in m³/s, to 2 decimal places.", value: qB, dp: 2, unit: "m³/s", wrong: [45, 85.5],
        explanation: "45 × 0.95 = 42.75 m³/s. The value 45 is the area only." }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the hydraulic radius at site A, in metres.", value: rA, dp: 2, unit: "m", wrong: [0.5, 2.5],
        explanation: "Area = 4 × 0.5 = 2.0 m²; wetted perimeter = 4 + 2 × 0.5 = 5.0 m; 2.0 ÷ 5.0 = 0.4 m." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why the velocity is higher at site B than at site A although site B is further downstream and the gradient is gentler.",
        points: [
          "Site B has a much larger hydraulic radius (1.96 m against 0.4 m), so a smaller share of the water is in contact with the channel.",
          "There is less friction, so the channel is more efficient and less energy is lost.",
          "The bed is smoother and the load finer at B, and the discharge is larger because tributaries have joined.",
        ],
        modelAnswer: "Site B is wider and deeper, with a hydraulic radius of about 1.96 m against 0.4 m at A, so less water is in contact with the bed and banks. Friction is lower and the channel is more efficient, and the finer load gives a smoother bed, so velocity is higher despite the gentler gradient.",
        explanation: "Efficiency explains the increase in velocity." }),
      P.manual({ label: "(e)", marks: 3, stem: "Suggest why the sediment on the bed at site B is likely to be finer and more rounded than at site A.",
        points: [
          "Attrition: pieces of load collide and wear each other down over the distance travelled.",
          "Abrasion reduces the size of the load further, and rounds the edges.",
          "Coarse material is deposited upstream as the gradient falls, while fine particles are carried on.",
        ],
        modelAnswer: "Over the longer distance the load has been worn down by attrition and abrasion, so it is smaller and rounder. Coarse material has been deposited upstream as the gradient decreased, so finer sediment is carried on to site B.",
        explanation: "Attrition and selective deposition explain the downstream fining." }),
    ], explanation: "Calculate discharge and channel efficiency, then explain the downstream changes." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: "A river reach in the middle course has a channel length of 11.2 km between two points that are 6.4 km apart in a straight line. The channel swings across a floodplain with a steep river cliff on the outside of each bend and a gently sloping bar on the inside (illustrative data, invented for this exercise).",
    hints: ["Sinuosity = channel length ÷ straight-line distance."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the sinuosity of the reach, to 2 decimal places.", value: sinu, dp: 2, wrong: [0.57, 4.8],
        explanation: "11.2 ÷ 6.4 = 1.75. The value 0.57 turns the ratio upside down; 4.8 is the difference." }),
      P.mcq({ label: "(b)", marks: 1, stem: "What name is given to the gently sloping feature on the inside of each bend?", options: [
        ["Point bar", "Correct: it is built by deposition of sand and gravel."],
        ["River cliff", "The river cliff is the steep outer bank."],
        ["Bluff", "A bluff is the valley side at the edge of the floodplain."],
        ["Plunge pool", "A plunge pool is at the foot of a waterfall."],
      ], answer: "A", explanation: "The inside of a bend is a point bar." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain how the river cliff and the point bar form on a bend.",
        points: [
          "Helicoidal flow and the thalweg carry the fastest water to the outside of the bend.",
          "This erodes and undercuts the outer bank, forming the river cliff.",
          "On the inside the flow is slow, so sand and gravel are deposited as a point bar.",
        ],
        modelAnswer: "The thalweg takes the fastest water to the outside of the bend, which undercuts the bank to form a river cliff. On the inside the water is slow, so sand and gravel are deposited and form a point bar.",
        explanation: "Fast flow erodes the outside; slow flow deposits on the inside." }),
      P.manual({ label: "(d)", marks: 2, stem: "Describe how an oxbow lake may later form from this reach.",
        points: [
          "The bends migrate and the neck between two bends narrows until the river cuts through it in a flood.",
          "Deposition seals the ends of the old bend, leaving a crescent-shaped lake.",
        ],
        modelAnswer: "As the bends migrate the neck between them narrows. In a flood the river cuts through the neck, and deposition seals the ends of the old loop, leaving a crescent-shaped oxbow lake.",
        explanation: "Meander cut-off leaves the oxbow." }),
    ], explanation: "Calculate sinuosity and link the landforms to erosion and deposition." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the extent to which the landforms of a river's lower course result from deposition rather than erosion.",
    hints: ["Name the lower-course landforms and say how each forms.", "Then weigh the two processes and reach a judgement."],
    points: [
      "Floodplains are built mainly by deposition of alluvium in floods.",
      "Levees are formed by deposition of coarse load beside the channel when water overflows.",
      "Point bars are deposition on the inside of meander bends; deltas are deposition where the river meets standing water.",
      "Oxbow lakes depend on deposition to seal the ends of the cut-off loop.",
      "However, erosion is also essential: lateral erosion forms river cliffs and bluffs and makes the floodplain wide.",
      "Meander migration, which widens the floodplain, results from erosion on the outside of bends combined with deposition on the inside.",
      "Erosion in the lower course is weaker than in the upper course, because the gradient is gentle and the load fine.",
      "Judgement: deposition dominates the lower-course landforms, but they depend on lateral erosion and deposition working together.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Most lower-course landforms are depositional. Floodplains are built from alluvium laid down in floods, levees are made of the coarsest material dropped beside the channel, point bars form on the inside of bends and deltas build where the river meets standing water. Oxbow lakes are sealed off by deposition. Erosion still matters: lateral erosion on the outside of bends forms river cliffs and bluffs, and the migration of meanders widens the floodplain. Because the gradient is gentle and the load is fine, erosion is weaker than in the upper course. Overall deposition dominates, but the landforms result from lateral erosion and deposition acting together.",
    wordLimit: { max: 300 }, explanation: "Weigh deposition against lateral erosion and reach a judgement." });

  b.card("DEFINITION", "Thalweg", "The line of greatest depth and fastest flow along a channel; it swings to the outside of each meander bend.");
  b.card("CONCEPT", "River erosion processes", "Hydraulic action, abrasion (corrasion), attrition, solution (corrosion) and cavitation.");
  b.card("CONCEPT", "River transport processes", "Traction (boulders roll), saltation (sand hops), suspension (silt and clay) and solution (dissolved minerals).");
  b.card("CONCEPT", "Helicoidal flow", "A corkscrew flow in a bend: surface water moves to the outer bank and returns along the bed to the inner bank, carrying sediment to the inside.");
  b.card("FORMULA", "Discharge", "Q = cross-sectional area × mean velocity (m³/s).");
  b.card("FORMULA", "Hydraulic radius", "Cross-sectional area ÷ wetted perimeter; the larger it is, the more efficient the channel.");
  b.card("FORMULA", "Sinuosity", "Channel length ÷ straight-line distance; about 1.5 or more is meandering.");
  b.card("CONCEPT", "Formation of a waterfall and gorge", "Hard rock over soft rock: the soft rock is undercut, the hard rock collapses, the fall retreats upstream and leaves a gorge.");
  b.card("FACT", "Landforms by course", "Upper: V-valleys, rapids, waterfalls, gorges. Middle: meanders, river cliffs, point bars. Lower: floodplain, levees, oxbow lakes, deltas.");
});
