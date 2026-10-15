// W3a: coastal.waves-erosion-transport (Cambridge only, A Level Paper 3 option 8). Data are illustrative (invented for this exercise); every number is computed in code.
import { concept, P, geographyLevels, chk, rnd, sum, CAM } from "../lib.mjs";
import { mc, tbl } from "../tables/w3a-_q.mjs";

// Singles
const periodA = chk(60 / 12, 5);
const wavelength = chk(1.56 * 10 ** 2, 156, 1e-9);
const energyRatio = chk((2.4 / 0.6) ** 2, 16, 1e-9);
const driftRate = chk(240 / 4, 60);
// Struct 1: pebble size down drift
const PB = [[0, 62, 1.5], [2, 48, 2.0], [4, 35, 3.0], [6, 24, 3.5], [8, 14, 4.5]];
const PBTAB = tbl(["Distance down drift (km)", "Median pebble length (mm)", "Roundness (1 angular to 5 well rounded)"], PB.map((r) => [r[0], r[1], r[2].toFixed(1)]));
const sizeFall = rnd(((62 - 14) / 62) * 100, 1, 77.4, "sizeFall");
// Struct 2: sediment budget
const IN = [["Cliff erosion", 28000], ["River X", 9000], ["Onshore movement from the sea floor", 6000]];
const OUT = [["Longshore drift out of the cell", 36000], ["Offshore loss to deep water", 7000], ["Dredging of the harbour", 3500]];
const totIn = chk(sum(IN.map((r) => r[1])), 43000);
const totOut = chk(sum(OUT.map((r) => r[1])), 46500);
const net = chk(totIn - totOut, -3500);
const fmt = (n) => n.toLocaleString("en-GB").replace(/,/g, " ");
const BUDTAB = tbl(["Input or output", "Sediment (m³ per year)"], [...IN.map((r) => ["Input: " + r[0], fmt(r[1])]), ...OUT.map((r) => ["Output: " + r[0], fmt(r[1])])]);
const riverShare = rnd((9000 / 43000) * 100, 1, 20.9, "riverShare");

concept("ageo.coastal.waves-erosion-transport", { file: "coastal/waves-erosion-transport", keyPrefix: "coastal.waves-erosion-transport", applies: CAM }, (b) => {
  mc(b, 1, "RECALL", "What is meant by the fetch of a wave?", [
    ["The length of open water over which the wind blows", "Correct: a longer fetch allows bigger waves to grow."],
    ["The distance that a wave travels up the beach as swash", "That is the extent of the swash."],
    ["The time that passes between two successive wave crests", "That is the wave period."],
    ["The height of a wave measured from its trough to its crest", "That is the wave height."],
  ], "**Fetch** is the length of open water over which the wind blows.");
  mc(b, 2, "UNDERSTANDING", "Which feature describes a constructive wave?", [
    ["A strong swash and a weak backwash", "Correct: material is moved up the beach and left there."],
    ["A weak swash and a strong backwash", "That describes a destructive wave."],
    ["A frequency of more than ten waves a minute", "That is typical of a destructive wave."],
    ["A short, high and steep wave that plunges", "That describes a destructive wave."],
  ], "Constructive waves have a **strong swash**, a low frequency and a gentle form.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which process involves air being compressed in cracks in the rock as waves break?", [
    ["Hydraulic action", "Correct: pressure on the air forces cracks wider."],
    ["Attrition of the load", "Attrition is the wearing down of the load into smaller particles."],
    ["Abrasion by the load", "Abrasion is the scraping by material carried by the waves."],
    ["Solution of the rock", "Solution is the dissolving of soluble rock such as limestone."],
  ], "**Hydraulic action** is compression of air and water in cracks.");
  mc(b, 3, "ANALYSIS", "What is the effect of wave refraction at a headland?", [
    ["Wave energy is concentrated on the headland", "Correct: so the headland is eroded more than the bays."],
    ["Wave energy is spread out evenly around the coast", "Energy is spread in the bays but concentrated at the headland."],
    ["Waves change from destructive to constructive", "Refraction changes direction and the spread of energy, not the wave type."],
    ["Waves stop when they meet the shallow water", "Waves slow down and break, but do not stop."],
  ], "Slowing in shallow water bends the wave and focuses **energy on the headland**.", { hints: ["Which part of the wave reaches shallow water first?"] });
  mc(b, 3, "ANALYSIS", "Waves approach a straight beach from the south-west at an angle. In which direction does the swash carry sediment?", [
    ["Up the beach and north-east along the shore", "Correct: the swash carries the sediment in the direction of the wave movement."],
    ["Straight up the beach at a right angle to the shore", "Only the backwash goes straight down the slope."],
    ["Down the beach and back towards the south-west coast", "That does not match the direction of the swash."],
    ["Out to sea in the direction taken by the backwash", "The backwash returns sediment down the beach but does not carry it far."],
  ], "Swash follows the wave direction; backwash returns **straight down** the slope.", { hints: ["Sketch the zig-zag path of a pebble."] });
  mc(b, 2, "UNDERSTANDING", "Which of the following is an output from a sediment cell?", [
    ["Sediment moved out of the cell by drift", "Correct: it leaves the system."],
    ["Sediment supplied to the beach by a river in flood", "A river supply is an input."],
    ["Sediment eroded from the cliffs behind the beach", "Cliff erosion is an input."],
    ["Sand stored in the dunes behind the main beach", "Dunes are a store."],
  ], "Drift out of the cell, offshore loss and dredging are **outputs**.");
  mc(b, 3, "APPLICATION", "A dam is built across a river that reaches the coast. What is the most likely effect on beaches near the river mouth?", [
    ["Less sediment arrives and the beaches may shrink", "Correct: the dam traps sediment in the reservoir."],
    ["More sediment arrives and the beaches grow wider", "A dam traps sediment and reduces the amount supplied."],
    ["There is no effect, since rivers carry only water", "Rivers carry a lot of sediment, and a dam reduces it."],
    ["The wave energy of the coast increases because of the dam", "A dam does not change the wave energy."],
  ], "Dams **trap sediment**, so the input to the coastal cell is reduced.", { hints: ["Where does the sediment carried by the river end up?"] });

  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Destructive waves have a strong backwash, which removes sediment from the beach.", answer: true,
    feedbackTrue: "Correct: the backwash is stronger than the swash.", feedbackFalse: "Not so: destructive waves have a strong backwash and a weak swash.",
    explanation: "Strong backwash drags material down the beach, so the beach is lowered." });
  b.match({ d: 2, skill: "RECALL", stem: "Match each process to its description.",
    pairs: [
      ["Cavitation", "Collapse of air bubbles that sends shock waves into the rock"],
      ["Abrasion", "Sand and pebbles thrown against the cliff by waves"],
      ["Attrition", "Particles of load colliding and becoming smaller and rounder"],
      ["Saltation", "Small particles bounced along the sea bed"],
      ["Traction", "Large pebbles rolled along the sea bed"],
    ], explanation: "Cavitation, abrasion and attrition are processes of erosion; saltation and traction are ways of moving the load." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "Water moving up the beach after a wave breaks is the {{blank:a}}, and the water moving back is the {{blank:b}}. The movement of sediment along the coast in a zig-zag path is {{blank:c}} drift.",
    blanks: [
      { id: "a", accepted: ["swash"], choices: ["swash", "backwash", "fetch"] },
      { id: "b", accepted: ["backwash"], choices: ["backwash", "swash", "refraction"] },
      { id: "c", accepted: ["longshore"], choices: ["longshore", "offshore", "continental"] },
    ], explanation: "Swash goes up the beach, backwash returns, and together at an angle they cause longshore drift." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the process of coastal erosion by which air bubbles collapse under pressure and weaken the rock.",
    accepted: ["cavitation"], explanation: "**Cavitation** is caused by the collapse of bubbles in the sea water." });

  b.num({ d: 2, skill: "APPLICATION", calculator: true, unit: "s",
    stem: "A storm produces waves that arrive at the coast at a rate of 12 per minute. Calculate the wave period, in seconds.",
    hints: ["Period = 60 seconds ÷ number of waves per minute."],
    value: periodA, wrong: [720, 0.2],
    explanation: "60 ÷ 12 = **5 seconds**. The value 720 multiplies instead of dividing." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "m",
    stem: "A swell in deep water has a period of 10 seconds. Using the relationship wavelength $L \\approx 1.56\\,T^2$ (with $L$ in metres and $T$ in seconds), calculate the wavelength, in metres.",
    hints: ["Square the period first."],
    value: wavelength, wrong: [15.6, 24.336],
    explanation: "$T^2 = 100$, so $L = 1.56 \\times 100 = 156$ m, so **156 m**. The value 15.6 multiplies by $T$ instead of $T^2$ (it is the wave speed in m/s)." });
  b.calc({ d: 3, skill: "APPLICATION", calculator: true, unit: "times",
    stem: "Wave energy increases with the square of the wave height. A storm wave is 2.4 m high and a fair-weather wave is 0.6 m high (illustrative data). How many times more energy does the storm wave have?",
    hints: ["Find the ratio of the heights and square it."],
    value: energyRatio, wrong: [4, 1.44],
    explanation: "1. Ratio of heights = 2.4 ÷ 0.6 = 4.\n2. Energy ratio = 4² = **16**. The value 4 forgets to square the ratio." });
  b.num({ d: 2, skill: "APPLICATION", calculator: true,
    stem: "Painted pebbles on a beach moved 240 m along the shore in 4 days (illustrative data). Calculate the rate of longshore drift, in metres per day.",
    hints: ["Distance ÷ time."],
    value: driftRate, wrong: [960, 0.017],
    explanation: "240 ÷ 4 = **60 m per day**. The value 960 multiplies the two numbers." });

  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe how longshore drift moves sediment along a beach.",
    points: [
      "Waves approach the shore at an angle, driven by the prevailing wind.",
      "The swash carries sediment up the beach at an angle, in the direction of the wave.",
      "The backwash returns straight down the slope under gravity, so the sediment travels in a zig-zag path along the shore.",
    ],
    modelAnswer: "Waves approach the beach at an angle because of the prevailing wind. The swash carries sediment up the beach at an angle, and the backwash returns it straight down the slope under gravity, so that the sediment moves along the shore in a zig-zag path.",
    explanation: "Angle of approach, swash direction and backwash direction." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why a headland is eroded more rapidly than the adjacent bays.",
    hints: ["Use wave refraction and energy."],
    points: [
      "The sea is shallower off the headland, so the waves slow and bend (refract) towards it.",
      "The wave energy is concentrated on the headland, giving more erosion.",
      "In the bays the waves are spread over a wide area, so energy is lower and sediment is deposited.",
      "The headland is often of more resistant rock, but waves still attack it from several sides.",
    ],
    modelAnswer: "The sea is shallower off the headland, so waves slow there and bend towards it (refraction). The wave energy is concentrated on the headland, so erosion is greater. In the bays, the waves are spread over a wider area, energy is lower and sediment is deposited. The headland is often resistant rock, but waves attack it from several sides.",
    explanation: "Refraction concentrates energy on headlands." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how constructive waves build up a beach.",
    hints: ["Compare the swash with the backwash."],
    points: [
      "They have a strong swash and a weak backwash, so more sediment is carried up the beach than is returned.",
      "The low frequency (about 6–8 per minute) gives the backwash time to drain into the beach before the next wave arrives.",
      "Sediment is deposited in ridges (berms) and the beach becomes wider and gentler.",
    ],
    modelAnswer: "Constructive waves have a strong swash and a weak backwash, so more sediment is carried up than is returned. Their low frequency lets the backwash soak into the beach before the next wave. The sediment is left in ridges, so the beach becomes wider and gentler.",
    explanation: "Strong swash and weak backwash deposit material." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Suggest how human activity can reduce the supply of sediment to a beach.",
    hints: ["Think of rivers, cliffs and sea floors."],
    points: [
      "Dams and weirs trap river sediment, so less reaches the coast.",
      "Sea walls and other cliff protection stop cliff erosion, which is a source of sediment.",
      "Dredging and sand mining remove sediment from the sea floor and beach.",
      "Groynes or harbour walls trap drift, starving the coast downdrift.",
    ],
    modelAnswer: "Dams trap river sediment so less reaches the coast. Sea walls stop cliff erosion, which removes a source. Dredging and sand mining take sediment from the beach and sea floor. Groynes and harbour walls trap drift and starve the coast downdrift.",
    explanation: "Each action removes an input to the sediment cell or blocks a transfer." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Pebbles were measured at five sites along a beach in the direction of longshore drift (illustrative data, invented for this exercise).\n\n${PBTAB}`,
    hints: ["Percentage fall = (62 − 14) ÷ 62 × 100.", "Think of what happens to the pebbles as they are moved along the beach."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the percentage decrease in median pebble length between 0 km and 8 km, to one decimal place.", value: sizeFall, dp: 1, unit: "%", wrong: [48, 22.6, 343],
        explanation: "(62 − 14) ÷ 62 × 100 = 77.4%. The value 48 is the fall in mm, and 22.6 is 14 ÷ 62 × 100 (the percentage that remains)." }),
      P.manual({ label: "(b)", marks: 3, stem: "Describe the changes in the pebbles along the beach.",
        points: [
          "Pebble size decreases steadily with distance, from 62 mm at 0 km to 14 mm at 8 km.",
          "Roundness increases, from 1.5 (angular) to 4.5 (well rounded).",
          "The change in size is greatest in the first 4 km (27 mm) and slows further down the drift.",
        ],
        modelAnswer: "Pebble size decreases steadily with distance, from 62 mm at 0 km to 14 mm at 8 km. Roundness increases from 1.5 (angular) to 4.5 (well rounded). The change in size is greatest in the first 4 km, where it falls by 27 mm, and slows further along.",
        explanation: "Describe both columns with figures." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain the changes shown in the table.",
        points: [
          "Attrition: pebbles knock against each other as they are moved by swash and backwash, so they become smaller and rounder.",
          "Sorting: the largest, heaviest pebbles are deposited first, because the waves lack the energy to carry them far.",
          "Smaller pebbles are carried further by the drift, so the average size falls with distance.",
        ],
        modelAnswer: "Attrition makes the pebbles smaller and rounder as they collide while being moved. Waves have less energy to move the largest pebbles, which are deposited first, so smaller pebbles are carried further and the average size falls along the beach.",
        explanation: "Attrition and sorting by energy." }),
    ], explanation: "Calculate a percentage, describe and explain changes in sediment along the shore." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `The table shows a sediment budget for one coastal cell (illustrative data, invented for this exercise).\n\n${BUDTAB}`,
    hints: ["Net change = total inputs − total outputs.", "Think about what happens when river sediment is trapped upstream."],
    parts: [
      P.group({
        label: "(a)", stem: "Use the table.",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "Calculate the net change in sediment for the cell, in m³ per year (use a minus sign for a net loss).", value: net, wrong: [3500, 43000, -46500],
            explanation: "Inputs = 28 000 + 9 000 + 6 000 = 43 000; outputs = 36 000 + 7 000 + 3 500 = 46 500. Net = 43 000 − 46 500 = −3 500 m³ per year." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "What does the net change suggest about the coast?", options: [
            ["Beaches are losing sediment and the coast may retreat", "Correct: outputs exceed inputs."],
            ["Beaches are building outwards into the sea", "Building occurs when inputs exceed outputs."],
            ["The coast is in perfect balance and does not change", "A balance would give a net change of zero."],
            ["The cliffs are no longer being eroded by the waves", "Cliff erosion is still the largest input."],
          ], answer: "A", explanation: "A negative budget means net loss, so beaches shrink and the coast tends to retreat." }),
        ],
      }),
      P.manual({ label: "(b)", marks: 3, stem: "Explain how a dam built upstream on River X could change the budget.",
        points: [
          "The dam would trap sediment in the reservoir, so the river input (9 000 m³ per year) would fall.",
          "Total inputs would fall, so the net loss would increase (the budget would become more negative).",
          "Beaches would become narrower and so offer less protection to the cliffs, increasing cliff erosion.",
        ],
        modelAnswer: "The dam would trap sediment in the reservoir, so the river input of 9 000 m³ per year would fall. Total inputs would fall and the net loss would increase. Beaches would become narrower and protect the cliffs less, so cliff erosion would increase.",
        explanation: "Less river sediment makes the budget more negative." }),
      P.manual({ label: "(c)", marks: 3, stem: "Suggest how a field of groynes might change the budget of this cell.",
        points: [
          "Groynes trap sediment moved by longshore drift, so the drift output of 36 000 m³ per year would fall.",
          "The beach within the cell would build up, reducing the net loss.",
          "But the coast downdrift would receive less sediment, so its inputs would fall and erosion there would increase.",
        ],
        modelAnswer: "Groynes trap sediment moved by drift, so the drift output of 36 000 m³ per year would fall and the beach would build up, reducing the net loss. The coast downdrift would receive less sediment, so erosion there would increase.",
        explanation: "Groynes reduce the output from this cell but starve the next one." }),
      P.manual({ label: "(d)", marks: 3, stem: "Assess the importance of the river as a source of sediment for this cell.",
        points: [
          "River X supplies 9 000 m³ per year, which is 20.9% of the total input, so it is a significant but not the largest source.",
          "Cliff erosion supplies 28 000 m³ per year (65.1%) and is the main source.",
          "Judgement: the river is the second most important source, so losing it would worsen the deficit, but cliff erosion is the key input.",
        ],
        modelAnswer: "River X supplies 9 000 m³ per year, which is 20.9% of the total input, so it is significant. Cliff erosion supplies 28 000 m³ (65.1%) and is the main source. The river is the second most important source, so losing it would worsen the deficit, but cliff erosion matters most.",
        explanation: "Calculate shares of the input and judge." }),
    ], explanation: "Calculate and interpret a sediment budget and assess changes to it." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "To what extent is geology the most important influence on the rate of coastal erosion?",
    hints: ["Give geology and at least two other factors.", "Use examples of rock types or events."],
    points: [
      "Rock resistance: hard rocks such as granite and basalt erode slowly and form headlands, while clay and sand are eroded quickly and form bays.",
      "Structure: joints, faults and bedding planes give weaknesses that waves exploit to form caves and arches.",
      "Wave energy: fetch, storm frequency and exposure determine the power available for erosion; a resistant coast with large waves can erode faster than a weak coast in sheltered water.",
      "Sediment supply: beaches protect the coast, so a budget deficit exposes cliffs.",
      "Human activity: sea walls and groynes protect one place but may starve another downdrift.",
      "Climate and weathering: rain and freeze–thaw weaken cliffs and tropical cyclones bring exceptional waves.",
      "Geology sets the starting resistance, but the other factors determine how much of the available energy is used.",
      "Judgement: geology is a primary control on the form and relative rate of erosion, but wave energy and the sediment supply are equally important, so no single factor is the most important everywhere.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Geology is a major influence because rock resistance and structure determine how easily the coast is eroded. Hard rocks such as granite form headlands, while clay and sand are eroded rapidly and form bays, and joints and faults give weaknesses that waves exploit to make caves and arches. However, wave energy is just as important, since fetch, storm frequency and exposure control the power available, and a resistant coast with large waves can erode faster than a weak coast in sheltered water. The sediment supply matters because beaches protect cliffs, and human activity such as sea walls and groynes can protect one place while starving another. Climate affects weathering and brings exceptional waves in cyclones. I conclude that geology is a primary control on the form and relative rate of erosion, but wave energy and sediment supply are equally important, so no single factor is most important everywhere.",
    wordLimit: { max: 300 }, explanation: "Weigh geology against wave energy, sediment supply, people and climate." });

  b.card("DEFINITION", "Fetch", "The distance of open water over which the wind blows; a longer fetch gives bigger waves.");
  b.card("CONCEPT", "Constructive and destructive waves", "Constructive: low, about 6–8 per minute, strong swash, build the beach. Destructive: high, about 10–14 per minute, strong backwash, remove sediment.");
  b.card("DEFINITION", "Longshore drift", "The movement of sediment along the coast in a zig-zag path: swash carries material up the beach at an angle and backwash returns it straight down.");
  b.card("CONCEPT", "Marine erosion processes", "Hydraulic action, cavitation, abrasion (corrasion), attrition and solution.");
  b.card("CONCEPT", "Refraction", "Waves slow in shallow water off a headland and bend, concentrating energy on the headland and spreading it in the bay.");
  b.card("DEFINITION", "Sediment cell", "A stretch of coast, with inputs, stores, transfers and outputs of sediment, in which the movement of sediment is largely self-contained.");
  b.card("FORMULA", "Deep-water wave relationships", "Wavelength L ≈ 1.56 T² (m); speed c = L ÷ T ≈ 1.56 T (m/s); waves per minute = 60 ÷ T; energy ∝ height².");
  b.card("CONCEPT", "Sediment budget", "Inputs (cliffs, rivers, sea floor, drift in) minus outputs (drift out, offshore loss, dredging): a surplus builds the coast; a deficit lets it retreat.");
  b.card("CONCEPT", "Ways in which waves transport sediment", "Traction (rolling), saltation (bouncing), suspension (carried within the water) and solution (dissolved).");
});
