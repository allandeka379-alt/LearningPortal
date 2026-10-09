// Slice G3a: maps.gradient-cross-sections (gradient as 1 in n and %, uses of gradient, cross-sections, VE, intervisibility).
// All values computed with code: 1800/150 = 12; hypot(2.4,1.8) = 3.0 km, 3000/120 = 25 (4%); 60 x 25 = 1500 m = 3 cm;
// hypot(2.4,3.2) = 4.0 km, 4000/200 = 20 (5%); line-of-sight heights checked point by point.
import { concept, P, geographyLevels } from "../lib.mjs";

const SIGHT_BLOCKED = "| Distance (km) | 0 | 0.5 | 1.0 | 1.5 | 2.0 | 2.5 |\n|---|---|---|---|---|---|---|\n| Height (m) | 1500 | 1470 | 1460 | 1490 | 1440 | 1450 |";
const SIGHT_CLEAR = "| Distance (km) | 0 | 0.5 | 1.0 | 1.5 | 2.0 | 2.5 |\n|---|---|---|---|---|---|---|\n| Height (m) | 1410 | 1370 | 1340 | 1310 | 1280 | 1260 |";

concept("geo.maps.gradient-cross-sections", { file: "maps/gradient-cross-sections", keyPrefix: "maps.gradient-cross-sections" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "How is the gradient of a slope calculated?",
    options: [
      ["Vertical interval ÷ horizontal equivalent", "Correct: the rise in height divided by the horizontal distance."],
      ["Horizontal equivalent ÷ vertical interval", "This gives n in '1 in n', not the gradient itself."],
      ["Vertical interval × horizontal equivalent", "Multiplying gives no measure of steepness."],
      ["Contour interval ÷ map scale", "The contour interval and scale are used to find VI and HE, not divided directly."],
    ],
    answer: "A",
    explanation: "Gradient = **VI ÷ HE**, with both in the same unit (metres). For '1 in n', n = HE ÷ VI.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true, secs: 60,
    stem: "A road rises **50 m** over a horizontal distance of **1 km**. What is its gradient?",
    options: [
      ["1 in 20", "Correct: 1 km = 1 000 m, and 1 000 ÷ 50 = 20."],
      ["1 in 50", "This uses the VI as n; n = HE ÷ VI."],
      ["1 in 2", "This divides 1 000 by 500, not by 50."],
      ["1 in 0.05", "This divides VI by HE (50 ÷ 1 000) and writes it as n."],
    ],
    answer: "A",
    explanation: "HE = 1 000 m, VI = 50 m. n = 1 000 ÷ 50 = 20, so the gradient is **1 in 20**.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", secs: 45,
    stem: "Express a gradient of **1 in 20** as a percentage.",
    options: [
      ["5%", "Correct: 1 ÷ 20 × 100 = 5%."],
      ["20%", "20 is n; the percentage is 1 ÷ 20 × 100."],
      ["0.05%", "0.05 is the fraction; multiply by 100 to get 5%."],
      ["2%", "2% would be 1 in 50."],
    ],
    answer: "A",
    explanation: "Percentage gradient = VI ÷ HE × 100 = 1 ÷ 20 × 100 = **5%**.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", secs: 90,
    stem: "On a 1:50 000 map, a hilltop with a spot height of **1490 m** is **3.6 cm** from a dam on the **1340 m** contour. What is the average gradient between them?",
    hints: ["VI = difference in height; HE = map distance × 500 m per cm.", "n = HE ÷ VI."],
    options: [
      ["1 in 12", "Correct: VI = 150 m, HE = 1 800 m, 1 800 ÷ 150 = 12."],
      ["1 in 24", "This uses 1 cm = 1 km (HE 3 600 m); on 1:50 000, 1 cm = 500 m."],
      ["1 in 1.2", "This uses HE = 180 m; 3.6 cm represents 1 800 m."],
      ["1 in 120", "This uses HE = 18 000 m, ten times too large."],
    ],
    answer: "A",
    explanation: "VI = 1490 − 1340 = 150 m. HE = 3.6 × 500 = 1 800 m. n = 1 800 ÷ 150 = 12: **1 in 12**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of these gradients is the **steepest**?",
    options: [
      ["1 in 8", "Correct: the smaller n is, the less horizontal distance it takes to rise 1 m."],
      ["1 in 15", "Rising 1 m every 15 m is gentler than every 8 m."],
      ["1 in 40", "Rising 1 m every 40 m is gentle."],
      ["1 in 100", "Rising 1 m every 100 m is very gentle, suitable for railways."],
    ],
    answer: "A",
    explanation: "In '1 in n', a **smaller n** means a steeper slope: 1 in 8 (12.5%) is steeper than 1 in 100 (1%).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "On a map, a railway follows a winding river valley instead of the shorter route over the hills. What is the main reason?",
    options: [
      ["Trains need gentle gradients", "Correct: steel wheels grip steel rails poorly, so heavy trains cannot climb steep slopes."],
      ["Valleys have fewer settlements to serve", "Valleys usually have more settlements, and the reason given is not about gradient."],
      ["Rivers supply water to steam engines only", "Modern trains do not depend on rivers; the route choice is about gradient."],
      ["Hills always have soils that are too wet", "Hill soils are not always wet; the problem is the steep climb."],
    ],
    answer: "A",
    explanation: "Railways need much **gentler gradients** than roads, so they follow valleys, cross ridges at cols and use long curves.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", secs: 60,
    stem: "A cross-section is drawn from a 1:50 000 map with a vertical scale of **1 cm to 50 m**. What is the vertical exaggeration?",
    options: [
      ["10", "Correct: 1 cm to 50 m is 1:5 000, and 50 000 ÷ 5 000 = 10."],
      ["1 000", "This divides 50 000 by 50 without converting 50 m into centimetres."],
      ["0.1", "This divides the vertical denominator by the horizontal one; VE is horizontal ÷ vertical."],
      ["100", "This treats 50 m as 500 cm; 50 m is 5 000 cm."],
    ],
    answer: "A",
    explanation: "Vertical scale: 1 cm = 50 m = 5 000 cm, i.e. 1:5 000. VE = 50 000 ÷ 5 000 = **10**.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", secs: 90,
    stem: `Table 1 gives heights along a straight line from a fire lookout (0 km) to a village (2.5 km) (fictional data).\n\n${SIGHT_BLOCKED}\n\nCan the village be seen from the lookout?`,
    hints: ["The line of sight falls from 1500 m to 1450 m over 2.5 km: 20 m per km.", "Compare the land height with the line of sight at each distance."],
    options: [
      ["No: land at 1.5 km rises above the line of sight", "Correct: the line of sight is at 1470 m there, but the land is 1490 m."],
      ["Yes: the lookout is the highest point on the line", "Being highest is not enough; a rise in between can still block the view."],
      ["No: the land at 0.5 km blocks the view", "At 0.5 km the land (1470 m) is below the line of sight (1490 m)."],
      ["Yes: the village is lower than the lookout", "A lower target can still be hidden by a ridge in between."],
    ],
    answer: "A",
    explanation: "Line of sight: 1500 − 20 per km. At 1.5 km it is 1470 m; the land is **1490 m**, so a ridge hides the village. The places are **not intervisible**.",
  });
  b.mcq({
    d: 1, skill: "UNDERSTANDING",
    stem: "Why is the vertical scale of a cross-section usually exaggerated?",
    options: [
      ["To make differences in relief easy to see", "Correct: at true scale most slopes would look almost flat."],
      ["To make the section fit the map's scale exactly", "Exaggeration deliberately makes the vertical scale different from the map's."],
      ["To show the true steepness of slopes", "Exaggeration makes slopes look steeper than they really are."],
      ["To reduce the number of contours to plot", "The same contours are plotted whatever the vertical scale."],
    ],
    answer: "A",
    explanation: "At the same scale as the map, a 200 m hill would be only a few millimetres high on paper, so the vertical scale is stretched to **show the relief clearly**.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "When drawing a cross-section, what is the paper strip used for?",
    options: [
      ["Marking where each contour crosses the line of section", "Correct: the ticks and heights are then transferred to the graph."],
      ["Measuring the bearing of the line of section from north", "Bearings are measured with a protractor, not a paper strip."],
      ["Tracing the shape of the river channel", "The strip records crossings along one straight line only."],
      ["Calculating the vertical exaggeration", "VE is calculated from the two scales."],
    ],
    answer: "A",
    explanation: "Lay the strip along the section line, tick each contour crossing and write its height, then transfer the ticks to the graph axes.",
  });
  b.calc({
    d: 3, skill: "APPLICATION", secs: 150,
    stem: "On a 1:50 000 map, a spot height of **1385 m** is at **418 263** and a bridge on the **1265 m** contour is at **442 245**. Calculate the average gradient between them in the form 1 in n.",
    value: 25, tol: 0.5, prefix: "1 in",
    wrong: [35, 20],
    hints: ["Use Pythagoras on the differences in eastings and northings to find HE in km, then convert to metres.", "n = HE ÷ VI."],
    explanation: "VI = 1385 − 1265 = 120 m. ΔE = 2.4 km, ΔN = 1.8 km, HE = √(2.4² + 1.8²) = 3.0 km = 3 000 m. n = 3 000 ÷ 120 = **25**: 1 in 25.",
    workedSolution: "1. VI = 1385 − 1265 = 120 m.\n2. ΔE = 44.2 − 41.8 = 2.4 km; ΔN = 26.3 − 24.5 = 1.8 km.\n3. HE = √(2.4² + 1.8²) = √9 = 3.0 km = 3 000 m.\n4. n = 3 000 ÷ 120 = 25, so the gradient is 1 in 25.",
  });
  b.num({
    d: 3, skill: "APPLICATION", secs: 60,
    stem: "Express the gradient between the spot height (1385 m at 418 263) and the bridge (1265 m at 442 245) on a 1:50 000 map as a **percentage**.",
    value: 4, tol: 0.1, unit: "%",
    wrong: [25, 0.04],
    hints: ["Percentage = VI ÷ HE × 100, with HE in metres."],
    explanation: "VI = 120 m, HE = 3 000 m. 120 ÷ 3 000 × 100 = **4%**.",
  });
  b.num({
    d: 3, skill: "APPLICATION", secs: 90,
    stem: "A new road must not be steeper than **1 in 25**. It has to climb **60 m**. What is the shortest length it could be on a 1:50 000 map, in centimetres?",
    value: 3, tol: 0.05, unit: "cm",
    wrong: [1.5, 6],
    hints: ["HE = VI × n.", "Convert metres on the ground to centimetres on the map: 1 cm = 500 m."],
    explanation: "HE = 60 × 25 = 1 500 m. On 1:50 000, 1 cm = 500 m, so 1 500 ÷ 500 = **3 cm**.",
  });
  b.num({
    d: 2, skill: "APPLICATION", secs: 45,
    stem: "A railway has a gradient of **1 in 100**. Express this as a percentage.",
    value: 1, unit: "%",
    wrong: [100],
    explanation: "1 ÷ 100 × 100 = **1%**: the line rises 1 m for every 100 m travelled horizontally.",
  });
  b.tf({
    d: 1, skill: "UNDERSTANDING",
    stem: "A gradient of 1 in 50 is steeper than a gradient of 1 in 10.",
    answer: false,
    feedbackFalse: "Correct: 1 in 50 rises 1 m every 50 m, which is gentler than 1 m every 10 m.",
    feedbackTrue: "Not so: the larger n is, the gentler the slope, so 1 in 10 is steeper.",
    explanation: "1 in 10 = 10%; 1 in 50 = 2%. The **smaller** n is the steeper slope.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct term for each blank.",
    template: "The difference in height between two points is the {{blank:a}}. The ground distance between them is the {{blank:b}}. Stretching the height scale of a cross-section is called vertical {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["vertical interval"], choices: ["vertical interval", "horizontal equivalent", "contour spacing"] },
      { id: "b", accepted: ["horizontal equivalent"], choices: ["horizontal equivalent", "vertical interval", "grid reference"] },
      { id: "c", accepted: ["exaggeration"], choices: ["exaggeration", "interval", "intervisibility"] },
    ],
    explanation: "VI = height difference; HE = horizontal distance; vertical exaggeration stretches the height scale.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term to its meaning.",
    pairs: [
      ["Vertical interval", "Difference in height between two points"],
      ["Horizontal equivalent", "Horizontal ground distance between two points"],
      ["Vertical exaggeration", "How many times the height scale is stretched"],
      ["Intervisibility", "Whether one point can be seen from another"],
    ],
    explanation: "These four terms are the vocabulary of gradient and cross-section questions.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why large commercial farms on a topographical map are usually found on land with gentle gradients.",
    hints: ["Think about machines, irrigation and soil."],
    points: [
      "Tractors and harvesters can work safely and efficiently on gentle slopes.",
      "Irrigation (e.g. centre pivots or furrows) is easier to lay out and water spreads evenly.",
      "Soil erosion by run-off is lower on gentle slopes, so soils stay deeper and more fertile.",
    ],
    modelAnswer: "Gentle slopes allow tractors and harvesters to work safely, make it easy to lay out irrigation so water spreads evenly, and suffer less soil erosion from run-off than steep slopes, so soils stay deep.",
    explanation: "Gradient affects mechanisation, irrigation and erosion.",
  });
  b.ext({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain how gradient influences the routes of roads and railways and the location of farming on a topographical map.",
    hints: ["Contrast roads with railways.", "Mention specific map evidence such as hairpin bends, cuttings, embankments, cols and valleys."],
    points: [
      "Railways need very gentle gradients (steel wheels on steel rails), so they follow valleys and cross ridges at cols.",
      "Railways use cuttings, embankments, bridges and long curves to keep the gradient low.",
      "Roads can climb steeper slopes but zig-zag in hairpin bends on escarpments to lengthen the HE and reduce the gradient.",
      "Both avoid the steepest land where possible because construction is costly and dangerous.",
      "Cultivation and commercial farming are concentrated on gentle slopes (mechanisation, irrigation, less erosion).",
      "Steep slopes are left under woodland or grazing, or are terraced.",
    ],
    levels: geographyLevels(6),
    modelAnswer: "Railways need gentle gradients because steel wheels grip steel rails poorly, so on a map they follow valleys, cross ridges at cols and use cuttings, embankments and long curves. Roads can climb more steeply, but on an escarpment they zig-zag in hairpin bends, which lengthens the horizontal equivalent and reduces the gradient. Both avoid very steep land because building there is costly. Farming shows the same control: cultivated fields lie on gentle slopes where tractors and irrigation can be used and erosion is low, while steep slopes are left under woodland or grazing.",
    explanation: "Link each pattern (route, bend, field location) to gradient explicitly.",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "On a 1:50 000 map (fictional area), a trigonometrical station of **1440 m** is at **523 618**. A bridge on the **1240 m** contour is at **547 650**. A district council plans a straight gravel road between them.",
    hints: ["Grid squares on a 1:50 000 map are 1 km.", "n = HE ÷ VI."],
    parts: [
      P.num({
        label: "(a)", stem: "Calculate the vertical interval between the two points.",
        value: 200, unit: "m", wrong: [2680],
        explanation: "1440 − 1240 = 200 m.",
      }),
      P.num({
        label: "(b)", stem: "Calculate the horizontal equivalent in metres.",
        value: 4000, unit: "m", wrong: [5600, 4],
        explanation: "ΔE = 2.4 km, ΔN = 3.2 km; √(2.4² + 3.2²) = 4.0 km = 4 000 m.",
      }),
      P.num({
        label: "(c)", stem: "Calculate the gradient in the form 1 in n.",
        value: 20, tol: 0.5, prefix: "1 in", wrong: [0.05],
        explanation: "4 000 ÷ 200 = 20: 1 in 20.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "The council's engineer says the gradient is acceptable for a road but not for a railway. Explain why.",
        points: [
          "1 in 20 (5%) can be climbed by vehicles with rubber tyres on a road.",
          "Railways need much gentler gradients because steel wheels on steel rails grip poorly / heavy trains cannot climb 5%.",
        ],
        explanation: "Roads tolerate steeper gradients than railways.",
      }),
    ],
    explanation: "Gradient from grid references: VI from heights, HE from Pythagoras, then n = HE ÷ VI.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: `Table 2 gives heights along a straight line from a radio mast (0 km) to a school (2.5 km) (fictional data).\n\n${SIGHT_CLEAR}`,
    hints: ["The line of sight falls 150 m over 2.5 km: 60 m per km.", "Compare the land height with the line of sight at each point."],
    parts: [
      P.num({
        label: "(a)", stem: "Calculate the height of the straight line of sight from the mast to the school at 1.0 km.",
        value: 1350, unit: "m", wrong: [1340],
        explanation: "The line falls 60 m per km: 1410 − 60 = 1350 m at 1.0 km.",
      }),
      P.mcq({
        label: "(b)", stem: "Are the mast and the school intervisible?",
        options: [
          ["Yes: the land stays below the line of sight", "Correct: at every point the land is 10 m below the line."],
          ["No: the land at 1.0 km blocks the view", "At 1.0 km the land (1340 m) is below the line (1350 m)."],
          ["No: the school is lower than the mast", "Being lower does not hide the school; only land above the line would."],
          ["Yes: but only because the mast is on a summit", "Height alone does not decide it; the land must stay below the line."],
        ],
        answer: "A",
        explanation: "Line of sight at 0.5, 1.0, 1.5 and 2.0 km: 1380, 1350, 1320, 1290 m; the land is 1370, 1340, 1310, 1280 m, always below.",
      }),
      P.mcq({
        label: "(c)", stem: "What type of slope does the section show between the mast and the school?",
        options: [
          ["Concave", "Correct: it falls 40 m in the first 0.5 km and only 20 m in the last, steep then gentle."],
          ["Convex", "A convex slope would be gentle at the top and steep lower down."],
          ["Uniform", "The fall per 0.5 km changes (40, 30, 30, 30, 20 m), so it is not uniform."],
          ["Vertical", "A fall of tens of metres per 0.5 km is far from vertical."],
        ],
        answer: "A",
        explanation: "Falls per 0.5 km: 40, 30, 30, 30, 20 m. Steeper at the top, gentler at the bottom: concave. Concave slopes are usually intervisible from top to bottom.",
      }),
      P.manual({
        label: "(d)", marks: 1, stem: "Give one reason why a real view might still be blocked even though the section shows the places are intervisible.",
        points: ["Features not shown by contours, such as tall trees, buildings or haze/dust, may block the view."],
        explanation: "Cross-sections show only the land surface.",
      }),
    ],
    explanation: "Intervisibility: compare each land height with the straight line of sight between the two points.",
  });

  b.card("CONCEPT", "Gradient formula", "Gradient = VI ÷ HE (same units). 1 in n: n = HE ÷ VI. Percentage = VI ÷ HE × 100.");
  b.card("DEFINITION", "Vertical interval (VI)", "The difference in height between two points, from contours or spot heights.");
  b.card("DEFINITION", "Horizontal equivalent (HE)", "The horizontal ground distance between two points, from the map scale, in metres.");
  b.card("FACT", "Comparing gradients", "Smaller n = steeper: 1 in 5 (20%) is steeper than 1 in 50 (2%).");
  b.card("CONCEPT", "Vertical exaggeration", "VE = horizontal scale denominator ÷ vertical scale denominator, e.g. 50 000 ÷ 5 000 = 10.");
  b.card("CONCEPT", "Intervisibility test", "Draw a straight line of sight on the cross-section; any land above the line blocks the view.");
  b.card("CONCEPT", "Gradient and routes", "Railways need gentle gradients (valleys, cols, cuttings); roads use hairpin bends on steep slopes.");
  b.card("CONCEPT", "Drawing a cross-section", "Paper strip along the line, tick contour crossings with heights, transfer to axes, join with a smooth curve, label, give VE.");
});
