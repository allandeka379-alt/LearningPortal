// Slice G3a: maps.scale-distance (types of scale, straight and winding distance, Pythagoras, area).
import { concept, P, geographyLevels } from "../lib.mjs";

const EXTRACT = [
  "**Map extract C** (fictional area), scale 1:50 000, grid squares 1 km.",
  "",
  "| N \\ E | 73 | 74 | 75 |",
  "|---|---|---|---|",
  "| 23 | Forest covers the whole square | Forest covers the whole square; dam wall at 749 235 | Forest covers the western half of the square only |",
  "| 22 | Forest covers the whole square | Forest covers the north-west corner only | Main road enters from the south and bends north-east |",
  "| 21 | Forest covers the northern edge only | Bridge at 734 215 where the main road crosses a river | Main road runs east from the bridge |",
].join("\n");

concept("geo.maps.scale-distance", { file: "maps/scale-distance", keyPrefix: "maps.scale-distance" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On a map with a scale of 1:50 000, what real distance does a length of 1 cm stand for?",
    options: [
      ["500 m", "Correct: 50 000 cm = 500 m = 0.5 km."],
      ["50 m", "50 000 cm is 500 m, not 50 m; check the conversion (100 cm = 1 m)."],
      ["5 km", "50 000 cm is 0.5 km, not 5 km."],
      ["50 km", "This reads 50 000 as metres and then mis-converts; 1 cm represents 50 000 cm."],
    ],
    answer: "A",
    explanation: "1:50 000 means 1 cm represents 50 000 cm. 50 000 cm ÷ 100 = **500 m** (0.5 km).",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A map has the statement scale *1 cm represents 2 km*. What is its representative fraction?",
    options: [
      ["1:200 000", "Correct: 2 km = 200 000 cm, so 1 cm represents 200 000 cm."],
      ["1:2 000", "2 km is 200 000 cm, not 2 000 cm."],
      ["1:20 000", "This converts 2 km to 20 000 cm; 1 km = 100 000 cm."],
      ["1:2", "An RF must use the same unit on both sides: 1 cm to 200 000 cm."],
    ],
    answer: "A",
    explanation: "Convert to the same unit: 2 km = 2 × 100 000 cm = 200 000 cm, so the RF is **1:200 000**.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true, secs: 60,
    stem: "Two schools are **6.8 cm** apart in a straight line on a 1:50 000 map. Calculate the distance between them on the ground, in kilometres.",
    value: 3.4, tol: 0.05, unit: "km",
    wrong: [6.8, 34],
    explanation: "On a 1:50 000 map 1 cm represents 0.5 km: 6.8 × 0.5 = **3.4 km**.",
  });
  b.num({
    d: 2, skill: "APPLICATION", secs: 60,
    stem: "A straight track measures **9.6 cm** on a 1:25 000 map. How long is it on the ground, in kilometres?",
    value: 2.4, tol: 0.05, unit: "km",
    wrong: [4.8, 9.6],
    explanation: "On a 1:25 000 map 1 cm represents 250 m: 9.6 × 250 m = 2 400 m = **2.4 km** (or 9.6 ÷ 4 cm per km).",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", secs: 90,
    stem: "On a 1:50 000 map a borehole is at **524 317** and a dip tank is at **548 349**. What is the straight-line distance between them?",
    hints: ["Find the differences in eastings and northings in kilometres (grid squares are 1 km).", "Use Pythagoras: distance = √(ΔE² + ΔN²)."],
    options: [
      ["4.0 km", "Correct: ΔE = 2.4 km, ΔN = 3.2 km, √(2.4² + 3.2²) = √16 = 4.0 km."],
      ["5.6 km", "This adds ΔE and ΔN (2.4 + 3.2); the straight line is the hypotenuse."],
      ["3.2 km", "This is only the difference in northings."],
      ["2.0 km", "This halves 4.0 km as if converting from centimetres; grid references are already in kilometres."],
    ],
    answer: "A",
    explanation: "ΔE = 54.8 − 52.4 = 2.4 km; ΔN = 34.9 − 31.7 = 3.2 km; distance = √(5.76 + 10.24) = √16 = **4.0 km**.",
  });
  b.calc({
    d: 3, skill: "APPLICATION", secs: 120,
    stem: "A planned power line will run in a straight line from a substation at **603 214** to a mine at **651 250** on a 1:50 000 map. Calculate its length in kilometres.",
    value: 6, tol: 0.05, unit: "km", answer: "6.0",
    wrong: [8.4, 4.8],
    hints: ["Subtract the eastings and the northings (each grid square is 1 km).", "Combine the two differences with Pythagoras' theorem."],
    explanation: "ΔE = 65.1 − 60.3 = 4.8 km; ΔN = 25.0 − 21.4 = 3.6 km; length = √(4.8² + 3.6²) = √36 = **6.0 km**.",
    workedSolution: "1. Difference in eastings: 65.1 − 60.3 = 4.8 km.\n2. Difference in northings: 25.0 − 21.4 = 3.6 km.\n3. Length = √(4.8² + 3.6²) = √(23.04 + 12.96) = √36 = 6.0 km.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which method is best for measuring the length of a **winding river** on a map?",
    options: [
      ["Laying string along the bends, then measuring the string", "Correct: the string follows every bend, so its length gives the winding distance."],
      ["Placing a ruler in a straight line from source to mouth", "A ruler gives only the straight-line distance, which is shorter."],
      ["Counting the grid squares the river crosses", "Counting squares estimates area, not length."],
      ["Reading the heights of the contours the river crosses", "Contours give height, not distance."],
    ],
    answer: "A",
    explanation: "Winding distances are measured with **string**, a pivoted **paper edge** or **dividers**, then converted with the scale.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", secs: 60,
    stem: "Measured along its bends, a road is **12.4 cm** long on a 1:50 000 map. What is its length on the ground?",
    options: [
      ["6.2 km", "Correct: 12.4 × 0.5 km = 6.2 km."],
      ["12.4 km", "This ignores the scale; 1 cm represents 0.5 km, not 1 km."],
      ["3.1 km", "This uses 1 cm = 0.25 km, the scale of a 1:25 000 map."],
      ["24.8 km", "This multiplies by 2 instead of by 0.5."],
    ],
    answer: "A",
    explanation: "On 1:50 000, 1 cm = 0.5 km, so 12.4 cm = **6.2 km**.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", secs: 90,
    stem: "A footpath measures **10.4 cm** on a 1:50 000 map. About how long would it take to walk it at **4 km/h**?",
    hints: ["First convert the map length to kilometres.", "Time = distance ÷ speed; 0.3 of an hour is 18 minutes."],
    options: [
      ["1 h 18 min", "Correct: 10.4 × 0.5 = 5.2 km; 5.2 ÷ 4 = 1.3 h = 1 h 18 min."],
      ["1 h 30 min", "1.3 h is 1 hour and 0.3 × 60 = 18 minutes, not 30 minutes."],
      ["2 h 36 min", "This uses 10.4 km, forgetting to apply the scale."],
      ["1 h 3 min", "0.3 h is 18 minutes, not 3 minutes."],
    ],
    answer: "A",
    explanation: "Distance = 10.4 × 0.5 = 5.2 km. Time = 5.2 ÷ 4 = 1.3 h = **1 h 18 min**.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Two villages are **3 km** apart on the ground. How far apart will they be on a 1:50 000 map?",
    options: [
      ["6 cm", "Correct: 2 cm represent 1 km, so 3 km is 6 cm."],
      ["1.5 cm", "This divides by 2; on 1:50 000 each kilometre is 2 cm, so multiply."],
      ["3 cm", "This assumes 1 cm represents 1 km (a 1:100 000 map)."],
      ["15 cm", "3 km is 300 000 cm; divided by 50 000 that is 6 cm, not 15 cm."],
    ],
    answer: "A",
    explanation: "3 km = 300 000 cm; 300 000 ÷ 50 000 = **6 cm**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A map is enlarged on a photocopier. Which type of scale on it will **still be correct**?",
    options: [
      ["The linear scale", "Correct: the scale bar is enlarged by the same amount as the map, so it stays correct."],
      ["The representative fraction", "The printed RF does not change, but the map distances do, so it becomes wrong."],
      ["The statement scale", "The printed words stay the same while map distances grow, so it becomes wrong."],
      ["Both the statement scale and the RF, because they are printed as numbers", "Printed numbers stay the same while every map distance grows, so both become wrong."],
    ],
    answer: "A",
    explanation: "Enlarging or reducing a map changes every map distance. The **linear scale** is part of the drawing, so it changes in proportion and remains accurate.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "What area on the ground is covered by one grid square on a 1:50 000 map whose grid squares measure 2 cm by 2 cm?",
    options: [
      ["1 km²", "Correct: 2 cm = 1 km, so the square is 1 km by 1 km = 1 km²."],
      ["4 km²", "This uses 2 km per side; 2 cm represent 1 km, not 2 km."],
      ["2 km²", "Area is side × side: 1 km × 1 km = 1 km²."],
      ["0.25 km²", "This uses 0.5 km per side (1 cm); the square is 2 cm wide."],
    ],
    answer: "A",
    explanation: "On 1:50 000 maps, grid squares are 1 km apart, so each square is **1 km²** (100 ha).",
  });
  b.num({
    d: 3, skill: "APPLICATION", secs: 75,
    stem: "On a 1:50 000 map, a dam's water surface covers **5** complete grid squares and **6** partly covered squares. Counting each part square as half a square, estimate the area of the dam in km².",
    value: 8, unit: "km²",
    wrong: [11, 5],
    hints: ["Each complete grid square is 1 km².", "Six half-squares add 3 km²."],
    explanation: "5 complete squares = 5 km²; 6 part squares × 0.5 = 3 km²; total **8 km²**.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A representative fraction such as 1:50 000 has no units.",
    answer: true,
    explanation: "True. An RF is a ratio of the same unit on map and ground, so it can be used with centimetres, inches or any other unit.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the scale facts.",
    template: "On a 1:50 000 map, {{blank:a}} cm represent 1 km. On a 1:25 000 map, {{blank:b}} cm represent 1 km.",
    blanks: [
      { id: "a", accepted: ["2", "two"], wrong: "5" },
      { id: "b", accepted: ["4", "four"], wrong: "2.5" },
    ],
    explanation: "1 km = 100 000 cm; 100 000 ÷ 50 000 = **2** cm and 100 000 ÷ 25 000 = **4** cm.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each type of scale with an example.",
    pairs: [
      ["Statement scale", "1 cm represents 0.5 km"],
      ["Representative fraction", "1:50 000"],
      ["Linear scale", "A line divided into kilometre sections"],
    ],
    explanation: "A statement scale is in words, an RF is a ratio, and a linear scale is a divided line.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Give **two** advantages of a representative fraction over a statement scale.",
    points: [
      "It has no units, so it can be used with any unit of measurement (cm, inches).",
      "It is understood in any language / country, and can be converted to any statement scale.",
    ],
    modelAnswer: "An RF has no units, so it works with any measuring unit, and it is understood internationally regardless of language.",
    explanation: "Because an RF is a pure ratio, it is universal.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "A student uses a ruler to measure the distance between two villages on a 1:50 000 map and says the walk between them along the footpath is 3.2 km. Evaluate this method and suggest how a more accurate figure could be obtained.",
    hints: ["Is a footpath straight?", "Think about relief and the measuring tools available."],
    points: [
      ["Explains that a ruler gives only the straight-line distance, so it underestimates a winding footpath.", 2],
      ["Describes a better method: paper edge pivoted at each bend, string, or dividers, then converted with the scale.", 2],
      ["Notes that map distance is horizontal, so the true walking distance up and down slopes is a little longer (and the map may be out of date).", 1],
      ["Concludes with a judgement (e.g. the figure is a minimum; the winding method gives a more realistic value).", 1],
    ],
    levels: geographyLevels(6),
    wordLimit: { max: 220 },
    modelAnswer: "The ruler gives the straight-line distance between the villages, but a footpath bends around hills, fields and streams, so 3.2 km is an underestimate. A better method is to lay a paper edge along each straight section, pivoting it at every bend and marking as you go, or to lay a piece of string along the path, then measure the total and convert it with the scale (1 cm = 0.5 km). Even this gives a horizontal distance: walking up and down slopes adds a little extra, and the path may have changed since the map was made. So the student's figure is a minimum, and the winding method gives a more realistic estimate.",
    explanation: "Straight-line measurements underestimate routes; winding methods are closer to the real walking distance.",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: `${EXTRACT}\n\nUse the extract to answer the questions.`,
    hints: ["Grid squares are 1 km wide.", "For area, count complete and part squares separately."],
    parts: [
      P.num({
        label: "(a)", stem: "Calculate the straight-line distance, in km, from the bridge at 734 215 to the dam wall at 749 235.",
        value: 2.5, tol: 0.05, unit: "km", wrong: [3.5],
        explanation: "ΔE = 74.9 − 73.4 = 1.5 km; ΔN = 23.5 − 21.5 = 2.0 km; √(1.5² + 2.0²) = √6.25 = 2.5 km.",
      }),
      P.num({
        label: "(b)", stem: "Counting each part-covered square as half a square, estimate the area of forest in km².",
        value: 4.5, tol: 0.05, unit: "km²", wrong: [6, 3],
        explanation: "Complete squares: 7323, 7423 and 7322 = 3 km². Part squares: 7523, 7422 and 7321 = 3 × 0.5 = 1.5 km². Total = 4.5 km².",
      }),
      P.num({
        label: "(c)", stem: "The main road from the bridge to the edge of the extract measures 7.8 cm along its bends. Calculate its length on the ground in km.",
        value: 3.9, tol: 0.05, unit: "km", wrong: [7.8],
        explanation: "7.8 × 0.5 km = 3.9 km.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain why the distance along the road in (c) is longer than a straight line between the same two points.",
        points: [
          "The road bends / winds (e.g. to follow gentle slopes or avoid obstacles), while the straight line is the shortest route.",
          "A ruler measures only the straight-line distance, so measuring along the bends gives a greater length.",
        ],
        explanation: "Winding routes are always longer than the straight line between their ends.",
      }),
    ],
    explanation: "Distances from grid references use Pythagoras; areas are estimated by counting complete and part squares; winding lengths are converted with the scale.",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "A rectangular school garden measures **240 m** by **160 m**. A Form 1 class will draw a plan of it at a scale of **1:2 000**.",
    hints: ["At 1:2 000, 1 cm represents 2 000 cm = 20 m.", "1 hectare = 10 000 m²."],
    parts: [
      P.mcq({
        label: "(a)", stem: "What does 1 cm on the plan represent on the ground?",
        options: [
          ["20 m", "Correct: 2 000 cm = 20 m."],
          ["2 m", "2 000 cm is 20 m, not 2 m."],
          ["200 m", "2 000 cm is 20 m, not 200 m."],
          ["2 km", "2 000 cm is 20 m; 2 km would be 200 000 cm."],
        ],
        answer: "A",
        explanation: "1:2 000 means 1 cm represents 2 000 cm = 20 m.",
      }),
      P.num({
        label: "(b)", stem: "How long, in cm, should the 240 m side be drawn on the plan?",
        value: 12, unit: "cm", wrong: [120, 1.2],
        explanation: "240 m ÷ 20 m per cm = 12 cm.",
      }),
      P.num({
        label: "(c)", stem: "How long, in cm, should the 160 m side be drawn?",
        value: 8, unit: "cm", wrong: [80],
        explanation: "160 m ÷ 20 m per cm = 8 cm.",
      }),
      P.num({
        label: "(d)", stem: "Calculate the area of the garden in hectares.",
        value: 3.84, tol: 0.005, unit: "ha", wrong: [38.4, 384],
        explanation: "240 × 160 = 38 400 m²; 38 400 ÷ 10 000 = 3.84 ha.",
      }),
    ],
    explanation: "Drawing to scale means dividing each ground length by the ground distance one map unit represents.",
  });

  b.card("DEFINITION", "Representative fraction (RF)", "A scale written as a ratio such as 1:50 000; it has no units (1 map unit = 50 000 of the same units on the ground).");
  b.card("FACT", "1:50 000 conversion", "1 cm represents 0.5 km; 2 cm represent 1 km; one grid square = 1 km².");
  b.card("FACT", "1:25 000 conversion", "1 cm represents 250 m; 4 cm represent 1 km.");
  b.card("CONCEPT", "Distance from two grid references", "Distance = √(ΔE² + ΔN²), with ΔE and ΔN in km (grid lines are 1 km apart).");
  b.card("CONCEPT", "Measuring winding distances", "Pivot a paper edge at each bend, lay string along the route, or step with dividers; then apply the scale.");
  b.card("CONCEPT", "Estimating area with grid squares", "Count complete squares, add part squares (often as halves); each square = 1 km² on 1:50 000 maps.");
  b.card("VOCABULARY", "Linear scale", "A divided line labelled with ground distances; stays correct if the map is enlarged or reduced.");
  b.card("FACT", "Area units", "1 km² = 100 hectares; 1 hectare = 10 000 m².");
});
