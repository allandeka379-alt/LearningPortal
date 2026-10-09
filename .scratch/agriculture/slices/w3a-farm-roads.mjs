// Slice W3a: farm roads (ZIMSEC only; tagged automatically).
import { concept, P, round, check, table } from "../lib.mjs";

// Q: gradient 9 m in 180 m.
const g1 = (9 / 180) * 100;
const g1n = 180 / 9;
check(Math.abs(g1 - 5) < 1e-9 && g1n === 20, "g1");
// Q: camber 3.6 m road, crown 9 cm.
const cam = 0.09 / 1.8;
const camN = Math.round(1 / cam);
check(Math.abs(cam - 0.05) < 1e-12 && Math.abs(1 / cam - camN) < 1e-9 && camN === 20, "cam");
// Q: gravel loads.
const grav = 250 * 3.5 * 0.15;
const loads = Math.ceil(grav / 6 - 1e-9);
check(Math.abs(grav - 131.25) < 1e-9 && loads === 22, "grav");
// Q: mitre drains.
const mitres = 600 / 50;
check(mitres === 12, "mitres");

// Struct: two routes.
const ROUTES = [["Route A (straight up the hillside)", 300, 24, "Crosses a vlei at the bottom"], ["Route B (along the ridge)", 450, 18, "Firm, red, well-drained soil"]];
const R_TABLE = table(["Route", "Horizontal length (m)", "Rise (m)", "Notes"], ROUTES);
const gA = (24 / 300) * 100;
const gB = (18 / 450) * 100;
check(Math.abs(gA - 8) < 1e-9 && Math.abs(gB - 4) < 1e-9, "routes");

// Struct: construction.
const CON = { length: 360, width: 4, thick: 0.12, truck: 7, mitreEvery: 45 };
const conVol = CON.length * CON.width * CON.thick;
const conLoads = Math.ceil(conVol / CON.truck - 1e-9);
const conMitres = CON.length / CON.mitreEvery;
check(Math.abs(conVol - 172.8) < 1e-9 && conLoads === 25 && conMitres === 8, "con");

concept("agri.structures.farm-roads", { file: "structures/farm-roads", keyPrefix: "structures.farm-roads" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the camber of a road?",
    options: [
      ["The slope of the surface down from the crown to the sides", "Correct: it sheds rainwater."],
      ["The drain that runs along each side of the road to collect water", "That is the side (table) drain."],
      ["The pipe that carries water under the road", "That is a culvert."],
      ["The total length of the road", "Length is not camber."],
    ],
    answer: "A",
    explanation: "The crown is highest; the camber lets water run off to the side drains.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why should a farm road avoid crossing a vlei?",
    options: [
      ["Waterlogged soil is soft and vehicles get stuck", "Correct."],
      ["Vleis are always too steep for vehicles", "Vleis are low, flat wet areas."],
      ["Gravel cannot be bought near vleis", "Supply is not the reason."],
      ["Roads in vleis collect too much sunshine", "Sunshine is not the problem."],
    ],
    answer: "A",
    explanation: "Wet, soft soils cannot carry traffic and are costly to drain and build up.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the function of a mitre drain?",
    options: [
      ["To lead water out of the side drain away from the road", "Correct: onto grassed land or a waterway."],
      ["To carry water under the road from one side to the other", "That is a culvert."],
      ["To make the centre of the road higher than the sides", "That is the crown."],
      ["To provide a crossing over a small stream", "That is a drift."],
    ],
    answer: "A",
    explanation: "Mitre drains stop large volumes of water building up in the side drains and eroding them.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Where possible, along which line should a farm road be sited?",
    options: [
      ["Along a ridge (watershed)", "Correct: water drains away on both sides and few streams are crossed."],
      ["Along the bottom of a valley beside a stream", "Low, wet ground floods and is soft."],
      ["Straight down the steepest slope", "This causes gullies and is hard for vehicles."],
      ["Through the middle of the cultivated fields", "This divides fields awkwardly."],
    ],
    answer: "A",
    hints: ["Where does water drain away naturally?"],
    explanation: "Ridges give firm, well-drained ground with few crossings.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which item of equipment would a farmer use to measure the slope along a proposed road line accurately?",
    options: [
      ["A dumpy level and staff", "Correct: they measure height differences accurately."],
      ["A wire strainer", "A wire strainer tightens fencing wire."],
      ["A knapsack sprayer", "A sprayer applies chemicals."],
      ["A soil auger", "An auger takes soil samples."],
    ],
    answer: "A",
    hints: ["The tool must measure differences in height."],
    explanation: "A dumpy level and staff (or a line level or A-frame) measure the rise along the line.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why should the culverts and side drains of a farm road be cleared before the rains?",
    options: [
      ["Blocked drains force water across the road, causing erosion", "Correct: water cuts gullies and potholes."],
      ["Clear drains make the whole road surface dry out completely after rain", "They drain water; they do not dry the surface completely."],
      ["Clearing drains adds gravel to the road", "It does not add gravel."],
      ["Blocked drains attract more traffic to the road", "Traffic is not affected."],
    ],
    answer: "A",
    hints: ["Where does the water go if a culvert is blocked?"],
    explanation: "Water that cannot flow away runs over or along the road and erodes it.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Deep ruts and a gully have formed down the wheel tracks of a straight road that runs down a slope. Which is the best long-term solution?",
    options: [
      ["Add mitre drains and reshape the camber so water leaves the road", "Correct: water is removed before it gathers speed."],
      ["Fill the ruts with loose soil from the fields once a month", "Loose soil washes out again."],
      ["Make the road narrower", "Width does not solve the drainage problem."],
      ["Remove all the gravel from the surface", "This makes erosion worse."],
    ],
    answer: "A",
    hints: ["The cause is water running along the road."],
    explanation: "Shed water off the surface (camber) and out of the drains (mitre drains) at short intervals.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A culvert is a pipe that carries water under a road.",
    answer: true,
    explanation: "True. Culverts are placed at low points and stream crossings.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Mitre drains should be placed closer together on steep sections of road than on gentle ones.",
    answer: true,
    explanation: "True. Water flows faster on steep slopes, so it must be led off more often.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each road feature with its function.",
    pairs: [
      ["Camber", "Sheds rain from the surface to the sides"],
      ["Side drain", "Collects water along the edge of the road"],
      ["Mitre drain", "Leads water away from the side drain"],
      ["Culvert", "Carries water under the road"],
      ["Drift", "Low concrete crossing of a small stream"],
    ],
    explanation: "Each feature handles water in a different way.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "The highest line along the centre of a road is the {{blank:a}}; a wetland that should be avoided when siting a road is called a {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["crown"] },
      { id: "b", accepted: ["vlei", "dambo", "wetland", "marsh"] },
    ],
    explanation: "Crown; vlei.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A road rises 9 m over a horizontal distance of 180 m. Calculate its gradient as a percentage.",
    value: g1, unit: "%", tol: 0, wrong: [20, 0.05],
    explanation: `9 ÷ 180 × 100 = ${g1}% (1 in ${g1n}).`,
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "A road 3.6 m wide has its crown 9 cm higher than its edges. Calculate the camber as \"1 in n\". Give the value of n.",
    value: camN, tol: 0, wrong: [40, 5],
    hints: ["Use half the width.", "Convert cm to m."],
    explanation: `Half-width = 1.8 m; fall = 0.09 m; 1.8 ÷ 0.09 = ${camN}, so 1 in 20. Using the whole width gives 1 in 40.`,
    workedSolution: `1. Half-width = 3.6 ÷ 2 = 1.8 m.\n2. Fall = 9 cm = 0.09 m.\n3. n = 1.8 ÷ 0.09 = ${camN}: the camber is 1 in ${camN}.`,
  });
  b.calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: "Gravel is spread 15 cm thick on a road 250 m long and 3.5 m wide. A truck carries 6 m³. How many truck loads are needed? Round UP to whole loads.",
    value: loads, tol: 0, wrong: [21, round(250 * 3.5 * 15 / 6, 0)],
    hints: ["Volume = length × width × thickness (all in m)."],
    explanation: `Volume = 250 × 3.5 × 0.15 = ${grav} m³; ${grav} ÷ 6 = ${round(grav / 6, 2)}, so ${loads} loads. Rounding down leaves part of the road ungravelled; forgetting to change 15 cm to 0.15 m gives a huge answer.`,
    workedSolution: `1. Thickness = 15 cm = 0.15 m.\n2. Volume = 250 × 3.5 × 0.15 = ${grav} m³.\n3. Loads = ${grav} ÷ 6 = ${round(grav / 6, 3)}; round up to ${loads}.`,
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "Mitre drains are placed every 50 m along a 600 m road. How many mitre drain positions are needed?",
    value: mitres, tol: 0, wrong: [30, 120],
    hints: ["Length ÷ spacing."],
    explanation: `600 ÷ 50 = ${mitres} positions.`,
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the material most commonly spread and compacted to form the surface of a farm road.",
    accepted: ["gravel", "crushed stone", "road gravel"],
    keywords: { any: ["gravel", "stone"] },
    explanation: "**Gravel** (with a little clay as binder).",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** factors a farmer should consider when siting a farm road.",
    hints: ["Factor plus reason."],
    points: [
      "Gradient: keep it gentle.",
      "So loaded vehicles can climb and runoff does not erode the road.",
      "Soil and drainage: firm, well-drained soil, avoiding vleis (or: avoid stream crossings / follow ridges / link all farm points / follow field boundaries).",
      "So the road can be used in the wet season without vehicles getting stuck (or the matching reason).",
    ],
    modelAnswer: "The road should have a gentle gradient so that loaded lorries can climb it and water does not race down it and cut gullies. It should be on firm, well-drained soil away from vleis, so that it can be used in the rainy season without vehicles getting stuck.",
    explanation: "Factor and reason.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Describe the routine maintenance a farm road needs each year.",
    hints: ["Think of drains, surface, verges and traffic."],
    points: [
      "Clear side drains, mitre drains and culverts of silt and debris before the rains.",
      "Reshape the camber (grade or drag) so water does not stand on the surface.",
      "Fill potholes and ruts with gravel and compact them; repair eroded drains with stones.",
      "Cut grass and bush on verges / restrict heavy traffic when the road is wet.",
    ],
    modelAnswer: "Before the rains the drains and culverts are cleared. The camber is reshaped, potholes and ruts are filled with gravel and compacted, eroded drains are repaired and lined with stones, verges are cut and heavy traffic is kept off when the road is soaked.",
    explanation: "Drains, surface, verges, traffic.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
    stem: `A farmer near Mutare compares two routes for a road from the homestead to the main road.\n\n${R_TABLE}`,
    hints: ["Gradient % = rise ÷ horizontal length × 100."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the gradient of Route A as a percentage.",
        value: gA, unit: "%", tol: 0, wrong: [12.5, 0.08],
        explanation: `24 ÷ 300 × 100 = ${gA}%.`,
      }),
      P.num({
        label: "(b)", marks: 1, stem: "Calculate the gradient of Route B as a percentage.",
        value: gB, unit: "%", tol: 0, wrong: [25, 0.04],
        explanation: `18 ÷ 450 × 100 = ${gB}%.`,
      }),
      P.mcq({
        label: "(c)", stem: "Which route should the farmer choose?",
        options: [
          ["Route B", "Correct: gentler gradient, ridge line, firm soil."],
          ["Route A, because it is shorter", "It is steeper, runs straight up the slope and crosses a vlei."],
          ["Either route; they are equally suitable", "Route A has serious problems."],
          ["Neither; farm roads cannot climb any slope", "Gentle slopes are acceptable."],
        ],
        answer: "A",
        explanation: "Route B has half the gradient, follows the ridge and avoids the vlei.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain why running a road straight up a hillside causes erosion.",
        points: ["Rainwater collects in the wheel tracks and flows straight down the slope.", "It gathers speed and volume, cutting ruts and gullies and washing out gravel."],
        explanation: "Concentrated, fast runoff.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Suggest **two** advantages of Route B apart from its gradient.",
        points: ["Firm, well-drained soil carries traffic in the wet season.", "Along the ridge water drains away on both sides / no vlei or stream crossing, so no culverts or drifts are needed."],
        explanation: "Soil and drainage.",
      }),
    ],
    explanation: "Use gradients and site conditions to choose a road route.",
  });
  b.struct({
    d: 5, skill: "APPLICATION", examStyle: true, marks: 12, calculator: true,
    stem: `Tatenda will build a gravel farm road ${CON.length} m long with a carriageway ${CON.width} m wide. Gravel will be spread ${CON.thick * 100} cm thick and delivered in trucks holding ${CON.truck} m³. Mitre drains will be placed every ${CON.mitreEvery} m. The road crosses one small stream that flows only after heavy rain.`,
    hints: ["Volume in m³ = length × width × thickness in m.", "Round loads UP."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the volume of gravel needed, in m³.",
        value: conVol, unit: "m³", tol: 0.05, answer: "172.8", wrong: [17280, 1440],
        explanation: `${CON.length} × ${CON.width} × ${CON.thick} = ${conVol} m³.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the number of truck loads needed. Round UP to whole loads.",
        value: conLoads, tol: 0, wrong: [24, conVol],
        explanation: `${conVol} ÷ ${CON.truck} = ${round(conVol / CON.truck, 2)}, so ${conLoads} loads.`,
      }),
      P.num({
        label: "(c)", marks: 1, stem: "Calculate the number of mitre drain positions.",
        value: conMitres, tol: 0, wrong: [9, 16],
        explanation: `${CON.length} ÷ ${CON.mitreEvery} = ${conMitres}.`,
      }),
      P.short({
        label: "(d)", stem: "Name a suitable low-level concrete crossing for the small stream.",
        accepted: ["drift", "causeway", "low-level crossing", "concrete drift"],
        keywords: { any: ["drift", "causeway"] },
        explanation: "A drift (causeway); a culvert is also possible.",
      }),
      P.manual({
        label: "(e)", marks: 4, stem: "Describe the steps Tatenda should follow to construct the road.",
        points: ["Survey and peg the route, checking the gradient with a level.", "Clear vegetation, stumps and rocks and remove the topsoil.", "Shape the road bed with a crown and camber; dig side drains and mitre drains; build the drift or culvert.", "Lay the gravel in layers, wet and compact it, and grass the banks."],
        explanation: "Construction sequence.",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "Explain why the topsoil is removed before the gravel is laid.",
        points: ["Topsoil is soft and full of organic matter, so it compresses and turns to mud when wet.", "Gravel on firm subsoil makes a stable road (and the topsoil can be used elsewhere)."],
        explanation: "Firm foundation.",
      }),
    ],
    explanation: "Calculate road materials and describe construction.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, marks: 6,
    stem: "After the rains, the road to Chipo's barns has potholes, ruts down the wheel tracks and a culvert blocked with grass. Water has crossed the road at the blocked culvert and cut a small gully.",
    hints: ["Repair the damage, then remove the cause."],
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "Describe how the potholes and gully should be repaired.",
        points: ["Fill them with gravel in layers.", "Wet and compact (ram) each layer so the repair is firm."],
        explanation: "Gravel and compaction.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Describe what should be done at the culvert.",
        points: ["Clear the grass and silt from the pipe and its inlet and outlet.", "Protect the outlet with stones / clear the drains leading to it so water flows through freely."],
        explanation: "Clear and protect.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Suggest **two** ways to prevent ruts forming again.",
        points: ["Reshape the camber so water runs off the surface.", "Keep heavy traffic off the road when it is soaked / add mitre drains."],
        explanation: "Prevent recurrence.",
      }),
    ],
    explanation: "Repairing and protecting a farm road.",
  });

  b.card("CONCEPT", "Factors in siting a farm road", "Gentle gradient, ridges, firm well-drained soil, avoid vleis and stream crossings, link farm points, follow field boundaries, cost.");
  b.card("FACT", "Road siting equipment", "Pegs, ranging rods, tape, line level or A-frame, dumpy level and staff.");
  b.card("DEFINITION", "Camber", "Slope of the road surface down from the crown to the sides so rain runs off.");
  b.card("DEFINITION", "Mitre drain", "Short drain leading water out of the side drain away from the road onto grassed land.");
  b.card("DEFINITION", "Culvert", "Pipe or covered channel carrying water under the road.");
  b.card("FORMULA", "Gradient of a road", "Rise ÷ horizontal distance × 100 (%); 1 in n where n = distance ÷ rise.");
  b.card("FORMULA", "Volume of gravel", "Length × width × thickness (all in metres) = m³.");
  b.card("CONCEPT", "Constructing a farm road", "Survey and peg, clear, remove topsoil, shape crown and camber, dig drains, culverts or drifts, lay and compact gravel, grass banks.");
  b.card("CONCEPT", "Maintaining a farm road", "Clear drains and culverts, reshape camber, fill potholes and ruts, repair erosion, cut verges, limit wet-weather traffic.");
});
