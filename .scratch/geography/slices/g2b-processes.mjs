// Slice G2b: river erosion, transportation and deposition; energy changes downstream.
import { concept, P, ZIM, geographyLevels } from "../lib.mjs";

const PEB = "**Table 1: Pebble survey at four fictional sites on one river (20 pebbles per site)**\n\n| Site | Distance from source (km) | Mean long axis (mm) | Angular pebbles (%) |\n|---|---|---|---|\n| 1 | 0.5 | 150 | 80 |\n| 2 | 5 | 95 | 55 |\n| 3 | 15 | 60 | 30 |\n| 4 | 30 | 28 | 10 |";

const SED = "**Table 2: Monthly mean discharge and suspended sediment at a fictional gauging station in Zimbabwe**\n\n| Month | Oct | Dec | Feb | Apr | Jun | Aug |\n|---|---|---|---|---|---|---|\n| Discharge (m³/s) | 0.4 | 9 | 26 | 6 | 1.2 | 0.5 |\n| Suspended sediment (grams per litre) | 0.1 | 3.5 | 4.2 | 0.9 | 0.2 | 0.1 |";

concept("geo.rivers.processes", { file: "rivers/processes", keyPrefix: "rivers.processes" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which process of river erosion happens when load is scraped along the bed and banks, wearing them away?",
    options: [
      ["Abrasion", "Correct: the load acts like sandpaper on the channel."],
      ["Attrition", "Attrition wears down the load itself, not the channel."],
      ["Solution", "Solution dissolves soluble rock chemically."],
      ["Saltation", "Saltation is a process of transportation (bouncing)."],
    ],
    answer: "A",
    explanation: "**Abrasion** (corrasion) is the grinding of the bed and banks by the load the river carries.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "How is fine silt and clay usually transported by a river?",
    options: [
      ["In suspension", "Correct: it is carried within the flow, colouring the water."],
      ["By traction", "Traction rolls the largest boulders along the bed."],
      ["By saltation", "Saltation bounces pebbles and coarse sand along the bed."],
      ["By abrasion", "Abrasion is a process of erosion, not transport."],
    ],
    answer: "A",
    explanation: "Fine particles are light enough to be held up by turbulence: **suspension**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why are pebbles near the mouth of a river usually smaller and rounder than those near the source?",
    options: [
      ["Attrition has broken and smoothed them during transport", "Correct: collisions knock off corners and break pebbles up."],
      ["The river deposits only round pebbles in the upper course", "Upstream pebbles are mostly angular."],
      ["Solution has dissolved most of every pebble", "Most pebbles are not soluble; mechanical wear is the cause."],
      ["Hydraulic action shapes pebbles in the channel bed", "Hydraulic action loosens rock from the bed and banks."],
    ],
    answer: "A",
    explanation: "As pebbles are carried, they hit each other and the bed. **Attrition** removes their corners and breaks them into smaller pieces.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which type of erosion is dominant in the **upper course** of a river?",
    options: [
      ["Vertical erosion that deepens the channel", "Correct: large load cuts down into the bed."],
      ["Lateral erosion that widens the valley floor", "Lateral erosion becomes dominant further downstream."],
      ["Headward erosion of the delta into the sea", "Deltas are depositional features at the mouth."],
      ["Wave erosion against the river banks", "Waves are a coastal agent, not a river process."],
    ],
    answer: "A",
    explanation: "High above base level, with large angular load, the river cuts **downwards**, forming V-shaped valleys.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In which situation is a river most likely to **deposit** its load?",
    options: [
      ["Where it enters a reservoir and slows down", "Correct: velocity drops sharply in still water."],
      ["Where it flows through a narrow gorge in flood", "Fast, deep flood water in a gorge has a lot of energy."],
      ["On the outside of a meander bend", "The outer bend has the fastest flow, so erosion happens there."],
      ["Where a large tributary adds extra water", "Extra discharge adds energy, so deposition is less likely."],
    ],
    answer: "A",
    explanation: "Deposition happens when the river loses energy. Entering a lake or reservoir checks the current, so the load settles.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A river flows over limestone and dolomite. Which process of erosion is likely to be **more** important here than over granite?",
    options: [
      ["Solution", "Correct: weakly acidic water dissolves calcium carbonate rocks."],
      ["Attrition", "Attrition wears the load and does not depend on bedrock type."],
      ["Traction", "Traction is transport, not erosion."],
      ["Deposition", "Deposition is the dropping of load, not erosion."],
    ],
    answer: "A",
    explanation: "Limestone and dolomite contain carbonates that dissolve in slightly acidic water. Granite is far less soluble.",
    hints: ["Which rocks dissolve?", "Only one option is a process of erosion that depends on rock chemistry."],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why does most erosion in Zimbabwe's rivers happen during a few weeks of the rainy season?",
    options: [
      ["High discharge and velocity give surplus energy beyond friction", "Correct: floods have far more energy than low flows."],
      ["Rivers flow over harder, more resistant rock in the rainy season", "The rock type does not change with the season."],
      ["Warm water erodes rock faster than cool water", "Temperature has little effect on mechanical erosion."],
      ["Deposition stops completely in the dry season", "Rivers deposit most when flow falls, including the dry season."],
    ],
    answer: "A",
    explanation: "At low flow almost all of a river's energy is used against friction. In floods discharge and velocity rise, giving surplus energy to erode and carry large load.",
    hints: ["Where does a river's energy come from?", "What happens to discharge in the wet season?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A dam is built across a river carrying a large load of sand. What is most likely to happen to the river **immediately below** the dam?",
    options: [
      ["Water lacking sediment erodes the bed and banks more", "Correct: clear water has spare energy to pick up new load."],
      ["Thick layers of sand build up on the bed below the wall", "The sand is trapped in the reservoir above the dam."],
      ["The river begins to form a delta just below the wall", "Deltas form where a river enters still water, i.e. above the wall."],
      ["Attrition increases because more pebbles are released", "Fewer, not more, pebbles pass through the dam."],
    ],
    answer: "A",
    explanation: "Sediment settles in the reservoir. The water released is clear and has energy to spare, so it erodes the channel below the dam (sometimes called 'hungry water').",
    hints: ["Where is the sediment deposited?", "What does a river with spare energy do?"],
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "In a field exercise, a float travels 15 m along a river in 30 seconds. Calculate the surface velocity of the river.",
    value: 0.5, unit: "m/s", tol: 0.005, answer: "0.5",
    wrong: [2, 450],
    explanation: "Velocity = distance ÷ time = 15 ÷ 30 = 0.5 m/s.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "Students measure five pebbles at a site: 48 mm, 52 mm, 39 mm, 61 mm and 45 mm. Calculate the mean long axis.",
    value: 49, unit: "mm",
    wrong: [48, 245],
    explanation: "Sum = 48 + 52 + 39 + 61 + 45 = 245 mm; mean = 245 ÷ 5 = 49 mm.",
    workedSolution: "1. Add the measurements: 48 + 52 + 39 + 61 + 45 = 245 mm.\n2. Divide by the number of pebbles: 245 ÷ 5 = 49 mm.",
    hints: ["Mean = total ÷ number of values."],
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences about transportation.",
    template: "Large boulders rolled along the bed are moved by {{blank:a}}. Pebbles bounced along the bed are moved by {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["traction"], wrong: "suspension" },
      { id: "b", accepted: ["saltation"], wrong: "solution" },
    ],
    explanation: "**Traction** rolls the largest load; **saltation** bounces smaller pebbles and sand.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each process with its description.",
    pairs: [
      ["Hydraulic action", "Force of water and compressed air in cracks loosens rock"],
      ["Attrition", "Load collides and becomes smaller and rounder"],
      ["Solution (erosion)", "Acidic water dissolves soluble rock"],
      ["Suspension", "Fine particles carried within the flow"],
    ],
    explanation: "The first three are erosion processes; suspension is a transportation process.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Deposition happens when a river's velocity falls.",
    answer: true,
    explanation: "True. Slower water has less energy, so it can no longer carry all its load.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Attrition wears away the bed and banks of the river channel.",
    answer: false,
    explanation: "False. Attrition wears down the **load** itself. Wearing away of the bed and banks by the load is abrasion.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the process of erosion in which the force of water and compressed air in cracks breaks rock from the banks.",
    accepted: ["hydraulic action", "hydraulic"],
    wrong: ["abrasion"],
    explanation: "**Hydraulic action** relies on the force of the water itself, not on the load.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe **two** processes of river erosion.",
    points: [
      "Names a process (e.g. abrasion).",
      "Describes it (e.g. load is dragged and bounced along the bed and banks, wearing them away).",
      "Names a second process (e.g. hydraulic action).",
      "Describes it (e.g. the force of water and air compressed in cracks loosens and breaks off rock).",
    ],
    modelAnswer: "Abrasion: the stones and sand the river carries are scraped and bounced along the bed and banks, wearing them away like sandpaper. Hydraulic action: the sheer force of the moving water hits the banks and forces water and air into cracks; the pressure loosens and breaks off pieces of rock.",
    explanation: "One mark for each named process and one for each description.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why a river deposits material on its floodplain during a flood.",
    points: [
      "Water overflows the banks and spreads over the flat floodplain.",
      "It becomes shallower and meets friction from vegetation and the ground, so velocity falls sharply.",
      "With less energy it drops its load, coarser material near the channel and fine silt further away.",
    ],
    modelAnswer: "When the river overflows, the water spreads out over the wide, flat floodplain. It becomes very shallow and is slowed by friction with grass, crops and the ground, so its velocity and energy fall sharply. It can no longer carry its load, so it deposits it: the coarser sand near the channel and fine silt further away.",
    explanation: "Spread, loss of velocity and energy, deposition (sorted).",
    hints: ["What happens to depth and velocity when water spreads out?"],
  });
  b.ext({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain how the processes of erosion, transportation and deposition change from the upper course to the lower course of a river.",
    points: [
      ["Upper course: steep gradient; vertical erosion dominant through abrasion and hydraulic action by large, angular load.", 1],
      ["Upper course: much energy lost to friction; large load moved mainly by traction and saltation, mostly in floods.", 1],
      ["Middle course: lateral erosion on outer bends; deposition on inner bends.", 1],
      ["Lower course: discharge and channel efficiency greatest; load fine and moved in suspension and solution.", 1],
      ["Lower course: deposition dominant (floodplain, levées, delta) as velocity falls near base level or the sea.", 1],
      ["Attrition makes load smaller and rounder downstream, linking change in processes to change in load.", 1],
    ],
    levels: geographyLevels(6),
    modelAnswer: "In the upper course the gradient is steep and the river is far above base level. Large, angular boulders are rolled (traction) and bounced (saltation) along the bed in floods, cutting down through abrasion and hydraulic action, so vertical erosion dominates. Much of the river's energy is lost to friction in a shallow, rough channel.\n\nIn the middle course the river begins to meander. The fastest current swings against the outer bank, causing lateral erosion, while slower water on the inner bend deposits sand.\n\nIn the lower course discharge is greatest and the channel is deep and efficient, but the gradient is gentle and the river is close to base level. Attrition has reduced the load to fine sand, silt and clay, carried in suspension and solution. Deposition becomes the main process: on the floodplain during floods, as levées beside the channel and as a delta where the river meets the sea.",
    explanation: "Credit a clear upstream-to-downstream sequence with processes linked to energy and load.",
    hints: ["Organise your answer by course: upper, middle, lower.", "Link each process to gradient, energy and load size."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: `Study Table 1.\n\n${PEB}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the decrease in mean long axis between site 1 and site 4.", value: 122, unit: "mm", wrong: [178], explanation: "150 − 28 = 122 mm." }),
      P.num({ label: "(b)", marks: 2, stem: "Express this decrease as a percentage of the mean long axis at site 1. Give your answer to the nearest whole number.", value: 81, unit: "%", tol: 0.5, wrong: [19, 122], explanation: "122 ÷ 150 × 100 = 81.3 %, about 81 %." }),
      P.manual({ label: "(c)", marks: 2, stem: "Describe the change in pebble shape downstream. Use data.", points: [
        "Pebbles become less angular / more rounded downstream.",
        "Data: angular pebbles fall from 80 % at site 1 to 10 % at site 4.",
      ], explanation: "Describe with a trend and figures." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain the changes in pebble size and shape.", points: [
        "Attrition: pebbles collide with each other during transport.",
        "Corners are knocked off, so they become rounder.",
        "They also break into smaller pieces and are worn by abrasion against the bed, so they become smaller.",
      ], explanation: "Name attrition and explain both size and shape." }),
    ],
    hints: ["Percentage change = change ÷ original × 100.", "Which process wears down the load itself?"],
    explanation: "Practice using pebble data to show attrition downstream.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", applies: ZIM,
    stem: `Study Table 2.\n\n${SED}`,
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name the month with the highest discharge.", accepted: ["February", "Feb"], wrong: ["December"], explanation: "February, with 26 m³/s." }),
      P.num({ label: "(b)", marks: 1, stem: "How many times greater is the February discharge than the June discharge? Give your answer to one decimal place.", value: 21.7, tol: 0.05, answer: "21.7", wrong: [24.8, 4.2], explanation: "26 ÷ 1.2 = 21.67, about 21.7 times." }),
      P.manual({ label: "(c)", marks: 2, stem: "Describe the relationship between discharge and suspended sediment.", points: [
        "Positive relationship: sediment is highest when discharge is highest.",
        "Data: 4.2 g/l in February (26 m³/s) but only 0.1 g/l in October and August (0.4-0.5 m³/s).",
      ], explanation: "State the relationship and quote paired values." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest why sediment in December (3.5 g/l) is high compared with its discharge.", points: [
        "Early rains fall on bare, dry ground after the dry season (little grass cover, cultivated fields).",
        "So soil is easily washed into the river (high soil erosion and run-off).",
      ], explanation: "Credit links to bare ground at the start of the rains." }),
    ],
    hints: ["Divide the larger discharge by the smaller one.", "Think about ground cover at the end of the dry season."],
    explanation: "Practice linking river load to seasonal discharge in Zimbabwe.",
  });
  b.card("DEFINITION", "Hydraulic action", "Erosion by the force of moving water, including air compressed in cracks that loosens rock.");
  b.card("DEFINITION", "Abrasion (corrasion)", "Erosion of the bed and banks by load scraped and bounced against them.");
  b.card("DEFINITION", "Attrition", "Load collides and is worn into smaller, rounder pieces. Wears the load, not the channel.");
  b.card("DEFINITION", "Solution (corrosion)", "Slightly acidic water dissolves soluble rock such as limestone; dissolved minerals are then carried in solution.");
  b.card("CONCEPT", "Four ways of transport", "Traction (rolled), saltation (bounced), suspension (carried), solution (dissolved).");
  b.card("CONCEPT", "Why deposition happens", "Velocity or discharge falls: inside bends, entering lakes, reservoirs or the sea, floodwater spreading over the floodplain, or a sudden increase in load.");
  b.card("CONCEPT", "Vertical v lateral erosion", "Vertical (downcutting) dominates upstream; lateral (sideways) dominates downstream on outer bends.");
  b.card("FACT", "When rivers erode most", "In floods: high discharge and velocity give surplus energy beyond friction.");
  b.card("VOCABULARY", "Load", "All the material carried by a river: boulders, pebbles, sand, silt, clay, dissolved minerals.");
});
