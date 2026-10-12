// W1a: skills.topographic-maps. Map extracts are DESCRIBED (fictional district) and all measurements computed.
import { concept, P, t, chk, table, groundKm, mapCm, gradient, dpStr, geographyLevels } from "../lib.mjs";

const tab = (h, r) => table(h, r);

const g1 = gradient(80, groundKm(4, 50000) * 1000);
chk(g1.oneIn, 25, 1e-9);
const bearingNW = (((Math.atan2(9 - 12, 41 - 37) * 180) / Math.PI) + 360) % 360;
const gr2 = gradient(160, groundKm(3.2, 50000) * 1000);
chk(gr2.oneIn, 10, 1e-9);
const gr3 = gradient(80, 1000);
chk(gr3.oneIn, 12.5, 1e-9);

const EXTRACT = tab(
  ["Grid reference", "Feature", "Detail"],
  [
    ["3142", "Steep-sided granite hill (dwala)", "Spot height 1 320 m; contours very close on all sides"],
    ["3243", "River (flows south-west)", "Height of river at foot of hill 1 160 m; wide valley floor with widely spaced contours"],
    ["322441", "Village", "About 40 buildings in a cluster beside a gravel road on the west bank"],
    ["331437", "Clinic and school", "On the gravel road, 5.6 cm in a straight line from the village"],
    ["3345", "Dam", "Built across the river; a canal runs south to fields at 3444 and 3446"],
    ["Easting 34", "Tarred road", "Runs north to south across the sheet; gravel road joins it at 3437"],
  ],
);
const SECTION = tab(["Distance from X (km)", "0", "1", "2", "3", "4", "5", "6"], [["Height (m)", 1180, 1200, 1260, 1340, 1300, 1240, 1220]]);

concept("ageo.skills.topographic-maps", { file: "skills/topographic-maps", keyPrefix: "skills.topographic-maps" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In a grid reference, which comes first?",
    options: [
      ["The easting (the vertical grid line number)", "Correct: eastings, then northings."],
      ["The northing (the horizontal grid line number)", "Northings come second."],
      ["The height above sea level", "Height is not part of a grid reference."],
      ["The bearing of the place", "A bearing is a direction, not a location code."],
    ],
    answer: "A",
    explanation: "Always give the easting first and the northing second: 'along the corridor, then up the stairs'.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "On a topographic map contour lines are very close together. What does this show?",
    options: [
      ["A steep slope", "Correct: the height changes quickly over a short horizontal distance."],
      ["A gentle slope", "A gentle slope has widely spaced contours."],
      ["A flat plain", "A plain has few or no contour lines."],
      ["A river valley floor only", "Valley floors are normally flat or gentle; close contours show steep valley sides."],
    ],
    answer: "A",
    explanation: "Close contours mean a large change in height over a short distance: a steep slope.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A series of V-shaped contours points uphill (towards higher ground). Which feature is shown?",
    options: [
      ["A river valley", "Correct: contours bend upstream, pointing uphill, where they cross a valley."],
      ["A spur or ridge", "On a spur the V-shapes point downhill, towards lower ground."],
      ["A summit", "A summit is shown by closed rings."],
      ["A cliff", "A cliff shows contours that merge or are drawn together."],
    ],
    answer: "A",
    explanation: "V-shaped contours that point uphill show a valley (the V points to the source); those that point downhill show a spur.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A map has a scale of 1:50 000. What does 1 cm on the map represent on the ground?",
    options: [
      ["500 m", "Correct: 50 000 cm = 500 m."],
      ["50 m", "This would be a scale of 1:5 000."],
      ["5 km", "This would be 1 cm to 5 km, or 1:500 000."],
      ["50 km", "This confuses centimetres with kilometres."],
    ],
    answer: "A",
    explanation: "50 000 cm ÷ 100 = 500 m, so 2 cm on the map is 1 km.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "On a map extract, the main river has tributaries that join it almost at right angles, and rocks alternate in hard and soft bands running east to west. Which drainage pattern is most likely?",
    options: [
      ["Trellis", "Correct: right-angled tributaries along alternating hard and soft rock bands."],
      ["Radial", "Radial streams flow outward from a hill or dome."],
      ["Dendritic", "Dendritic patterns form on uniform rock, with tributaries joining at acute angles."],
      ["Centripetal", "Centripetal streams flow inward to a central basin."],
    ],
    answer: "A",
    explanation: "Trellis drainage has long parallel streams and short tributaries joining at right angles, controlled by alternating bands of resistant and weak rock.",
    hints: ["Think of the shape the tributaries make with the main river."],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A well lies 6 tenths of the way across a grid square from easting line 36 and 2 tenths of the way up from northing line 51. What is its six-figure grid reference?",
    options: [
      ["366512", "Correct: easting 36 + 6 tenths = 366; northing 51 + 2 tenths = 512."],
      ["365162", "This has the digits in the wrong order."],
      ["512366", "Eastings must come first, then northings."],
      ["361562", "The tenths are in the wrong positions."],
    ],
    answer: "A",
    explanation: "Six figures: easting 366 (36 and 6 tenths) followed by northing 512 (51 and 2 tenths).",
    hints: ["The third and sixth figures are the tenths."],
  });

  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: "On a map at a scale of 1:25 000 the straight-line distance between two boreholes is 6.8 cm. What is the real distance, in km?",
    value: groundKm(6.8, 25000), unit: "km", dp: 2,
    wrong: [3.4, 17],
    explanation: "6.8 cm × 25 000 = 170 000 cm = 1.7 km. Using 1:50 000 gives 3.4 km.",
    hints: ["Multiply by the scale denominator, then convert centimetres to kilometres."],
  });
  b.num({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: "Two villages are 3.5 km apart. What is the distance between them on a map at a scale of 1:50 000, in cm?",
    value: mapCm(3.5, 50000), unit: "cm", dp: 1,
    wrong: [0.7, 17.5],
    explanation: "3.5 km = 350 000 cm; 350 000 ÷ 50 000 = 7.0 cm. Dividing the wrong way gives 17.5.",
    hints: ["Convert the real distance to centimetres first."],
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A road climbs from a point at 1 120 m to a point at 1 200 m. The two points are 4.0 cm apart on a 1:50 000 map. Express the gradient as '1 in n'.",
    value: g1.oneIn, unit: undefined,
    wrong: [0.04, 20],
    explanation: "1. Vertical interval = 1 200 − 1 120 = 80 m.\n2. Horizontal distance = 4.0 cm × 50 000 = 200 000 cm = 2 000 m.\n3. Gradient = 80 ÷ 2 000 = 1/25, so 1 in 25 (4%).\n4. Leaving the distance in cm or km gives an impossible value.",
    hints: ["Work out the horizontal distance in metres."],
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "A plantation occupies 21 whole grid squares and 10 part squares on a map where each grid square represents 1 km². Treating each part square as a half, estimate the area in km².",
    value: 21 + 10 / 2, unit: "km²",
    wrong: [31, 21],
    explanation: "Whole squares = 21; part squares count as halves, 10 × 0.5 = 5; total = 26 km². Counting all squares as whole gives 31.",
    hints: ["Part squares are counted as half squares."],
  });
  b.calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: "A fire lookout is at easting 12, northing 37 and a dam is at easting 9, northing 41 (grid-line numbers; each grid square is 1 km). Calculate the bearing of the dam from the lookout, to the nearest degree, measured clockwise from grid north.",
    value: bearingNW, dp: 0,
    wrong: [37, 53],
    explanation: "1. The dam is 3 squares west and 4 squares north of the lookout.\n2. The angle from north towards west is tan⁻¹(3 ÷ 4) = 36.9°.\n3. West of north, so the bearing is 360° − 36.9° = 323.1°, or 323° to the nearest degree.\n4. An angle of 37° forgets that the dam lies to the west.",
    hints: ["Draw a right-angled triangle with north and west sides.", "A bearing is measured clockwise from north."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A gradient of 1 in 5 is steeper than a gradient of 1 in 20.",
    answer: true,
    explanation: "True. A rise of 1 m in 5 m is much steeper than 1 m in 20 m.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Describe how to draw a cross-section along a line on a contour map.",
    points: ["Lay a strip of paper along the line and mark where each contour and the river cross it, writing the height at each mark", "Draw a horizontal axis the length of the line and a vertical axis scaled in metres (choosing a suitable vertical scale)", "Plot a point for each marked height above its position and join the points with a smooth line", "Label the axes and main features (river, ridge, slope) and state the vertical exaggeration if used"],
    modelAnswer: "Lay a strip of paper along the line and mark where each contour and the river cross it, writing the height at each mark. Draw a horizontal axis the length of the line and a vertical axis scaled in metres. Plot a point for each height above its position and join them with a smooth line, then label the axes and the main features such as the river and ridge.",
    explanation: "Marking heights, drawing axes, plotting and labelling.",
    hints: ["Start with a strip of paper along the line."],
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each contour pattern to the landform it shows.",
    pairs: [
      ["Closed concentric rings with a spot height at the centre", "Hill or summit"],
      ["V-shapes pointing uphill", "River valley"],
      ["V-shapes pointing downhill", "Spur or ridge"],
      ["Very widely spaced contours beside a stream", "Flat floodplain or gently sloping land"],
    ],
    explanation: "The shape and spacing of contours reveal the landform and slope.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the statement about bearings.",
    template: "A bearing is measured {{blank:a}} from grid north. If the bearing from A to B is 075°, the back bearing from B to A is {{blank:b}}°.",
    blanks: [
      { id: "a", accepted: ["clockwise"], choices: ["clockwise", "anticlockwise"] },
      { id: "b", accepted: ["255"], input: "number" },
    ],
    explanation: "Bearings are measured clockwise from north. Back bearing = 075° + 180° = 255°.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What is the name of the line on a map that joins places of equal height above sea level?",
    accepted: ["contour", "contour line", "a contour", "contours", "a contour line"],
    wrong: ["isobar", "isotherm"],
    explanation: "A **contour line** joins points of equal height.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe how a river valley would look on a topographic map.",
    points: ["V-shaped contours pointing uphill (upstream)", "A blue line (river) in the centre of the valley", "Contours close together on the valley sides (steep) and wider apart on the valley floor, which may be flat"],
    modelAnswer: "A valley is shown by V-shaped contours that point uphill, with the river drawn along the V. The contours are close together on the steep valley sides and spaced more widely on the flatter valley floor.",
    explanation: "Shape of contours, the river line and the spacing.",
    hints: ["Which way do the Vs point?"],
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "A map extract shows a dispersed pattern of farms with a village in the centre beside a river and a gravel road. Suggest three reasons why the village is sited there.",
    points: ["Water supply from the river for domestic use and irrigation", "Flat land/gentle slope suitable for building and farming", "Route centre/accessible by road, helping trade and services (any valid reason such as a river crossing or fertile soil)"],
    modelAnswer: "The river supplies water for homes and irrigation, the flat valley floor is suitable for building and farming, and the gravel road makes the site accessible for trade and services.",
    explanation: "Link site factors (water, land, routes) to the village.",
    hints: ["Think of water, land and routes."],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "A map extract shows a river whose channel length is 14.4 km between two points that are 9 km apart in a straight line. Calculate the sinuosity and explain what it suggests about the river.",
    points: ["Sinuosity = channel length ÷ straight-line length", "14.4 ÷ 9 = 1.6", "A value above 1.5 shows a meandering channel", "The river has a low gradient and flows over a wide floodplain (lateral erosion and deposition) / flat land in the middle or lower course"],
    modelAnswer: "Sinuosity = 14.4 ÷ 9 = 1.6. A value above 1.5 shows a meandering river, which suggests a low gradient and a wide floodplain where lateral erosion and deposition shape the channel.",
    explanation: "Formula, value, interpretation and reason.",
    hints: ["Divide the channel length by the straight-line distance."],
  });

  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`The table describes part of a 1:50 000 topographic map of a fictional district in the Zimbabwean midlands. The contour interval is 20 m and each grid square is 1 km by 1 km (data invented for this exercise).\n\n${EXTRACT}`,
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "State the four-figure grid reference of the square that contains the dam.", accepted: ["3345"], explanation: "The dam is at 3345." }),
      P.num({ label: "(b)", marks: 2, stem: "The clinic is 5.6 cm in a straight line from the village on the map. Calculate the real distance, in km.", value: groundKm(5.6, 50000), unit: "km", wrong: [5.6, 28], explanation: "5.6 cm × 50 000 = 280 000 cm = 2.8 km." }),
      P.num({ label: "(c)", marks: 3, type: "CALCULATION", stem: "The summit of the hill (1 320 m) and the river at its foot (1 160 m) are 3.2 cm apart on the map. Calculate the gradient as '1 in n'.", value: gr2.oneIn, wrong: [0.1, 20], explanation: "1. Vertical interval = 1 320 − 1 160 = 160 m.\n2. Horizontal distance = 3.2 cm × 50 000 = 1 600 m.\n3. Gradient = 160 ÷ 1 600 = 1/10, so 1 in 10." }),
      P.manual({ label: "(d)", marks: 3, stem: "Describe the relief shown in the extract.", points: ["A steep-sided hill (dwala) with a summit at 1 320 m", "The hill rises about 160 m above the river at its foot (quote heights)", "Gentle land/wide valley floor along the river, flowing south-west"], modelAnswer: "A steep granite hill reaches 1 320 m at 3142 with very close contours. The river in the valley at its foot is at 1 160 m, so the hill rises about 160 m above it. The valley floor beside the river is wide and gentle, and the river flows south-west." }),
      P.manual({ label: "(e)", marks: 3, stem: "Explain two reasons for the location of the village.", points: ["Close to the river for water supply", "On the gravel road (accessibility) / the relatively flat valley floor for building and farming", "Developed around services (clinic, school) or near the dam/canal for irrigation (any valid reason, developed)"], modelAnswer: "The village is beside the river, so water is available for homes and crops. It lies on the gravel road, which gives access to the tarred road and to the clinic and school, and it is on the flat valley floor." }),
      P.manual({ label: "(f)", marks: 2, stem: "Give two pieces of evidence that irrigation is practised.", points: ["A dam built across the river", "A canal running south to fields at 3444 and 3446"], modelAnswer: "A dam has been built across the river at 3345, and a canal runs south from it to fields at 3444 and 3446." }),
    ],
    explanation: "Grid reference, scale, gradient, description of relief and explanation of site from the described extract.",
    hints: ["Convert map distance to the real distance before computing the gradient."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: t`A cross-section line X to Y is 6 km long. Heights read from the map where the line crosses contours or spot heights are shown below (data invented for this exercise).\n\n${SECTION}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "State the greatest height along the line, in m.", value: 1340, unit: "m", wrong: [1300], explanation: "The highest value is 1 340 m, 3 km from X." }),
      P.num({ label: "(b)", marks: 2, type: "CALCULATION", stem: "Calculate the gradient between 2 km and 3 km along the line as '1 in n'.", value: gr3.oneIn, dp: 1, wrong: [80, 0.08], explanation: "Rise = 1 340 − 1 260 = 80 m over 1 000 m: 1 000 ÷ 80 = 12.5, so 1 in 12.5." }),
      P.mcq({ label: "(c)", marks: 1, stem: "Is the point Y (6 km, 1 220 m) visible from X (0 km, 1 180 m)?", options: [["No, because the 3 km ridge is above the line of sight", "Correct: the line of sight at 3 km is at 1 200 m, below 1 340 m."], ["Yes, because Y is higher than the point X is", "Being higher is not enough if higher ground lies between."], ["Yes, because the distance between them is only 6 km", "Distance alone does not decide visibility."], ["No, because the ground slopes down after the first 3 km", "The slope after the ridge does not matter; it is the ridge that blocks the view."]], answer: "A", explanation: "The line of sight rises 40 m over 6 km, so at 3 km it is at 1 180 + 20 = 1 200 m, well below the 1 340 m ridge." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why the ridge blocks the view.", points: ["The ridge crest (1 340 m) is higher than the straight line joining X and Y at that distance (1 200 m)", "So the ground rises above the line of sight and hides the far side"], modelAnswer: "The ridge crest at 1 340 m is higher than the straight line of sight joining X and Y, which is only 1 200 m at that point, so the ridge hides Y." }),
      P.manual({ label: "(e)", marks: 2, stem: "Describe the shape of the land between 3 km and 6 km.", points: ["Falls from 1 340 m to 1 220 m (quote heights)", "Gently/steadily, about 120 m over 3 km, with the fall steeper at first"], modelAnswer: "The land falls from the ridge at 1 340 m to 1 220 m at 6 km, a drop of 120 m over 3 km, steeper just after the crest and then more gently." }),
    ],
    explanation: "Reading the section, computing a gradient, and judging intervisibility from heights.",
    hints: ["Find the height of the line of sight at 3 km."],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 8,
    stem: "Evaluate the usefulness of a 1:50 000 topographic map for planning the location of a new rural clinic. [8]",
    points: [
      "Shows settlements and their sizes/distribution, so population to be served can be judged",
      "Shows roads, tracks and rivers so accessibility and routes can be assessed, including by measuring distances",
      "Contours show relief, so steep slopes and flood-prone valley floors can be avoided",
      "Existing clinics and schools are shown, so overlap/gaps in service can be identified",
      "Water sources (rivers, dams) are shown for water supply",
      "Maps may be out of date (new settlements and roads missing) and give no population numbers",
      "Do not show seasonal conditions (flooded drifts, impassable gravel roads in the rains), land ownership or electricity",
      "Judgement: very useful for a first desk study, but must be combined with census data, fieldwork and community consultation",
    ],
    levels: geographyLevels(8),
    modelAnswer: "A 1:50 000 map is useful because it shows where settlements are and how far apart, so the clinic can be sited to serve the most people. Roads, tracks and rivers show accessibility and distances can be measured, and contours help to avoid steep slopes and flood-prone valley floors. Existing clinics are shown, so gaps in service are visible, and rivers or dams show possible water supply. However, the map may be out of date, with new settlements and roads missing, and it gives no population numbers. It does not show seasonal problems such as flooded drifts, or electricity and land ownership. Overall it is very useful for an initial study of possible sites, but it should be combined with census data, fieldwork and community consultation before the final decision.",
    wordLimit: { max: 300 },
    explanation: "Uses of the map, its limitations and a judgement.",
    hints: ["What does the map show and what must be found out some other way?"],
  });

  b.card("FORMULA", "Ground distance from the map?", "Ground distance (km) = map distance (cm) × scale denominator ÷ 100 000.");
  b.card("FORMULA", "Gradient?", "Vertical interval ÷ horizontal distance (same unit). Written 1 in n, where n = horizontal ÷ vertical, or as a percentage.");
  b.card("CONCEPT", "Order of a grid reference?", "Eastings first, then northings ('along the corridor, up the stairs'). Six figures include tenths of a square.");
  b.card("CONCEPT", "What do close and wide contours show?", "Close together: steep slope. Wide apart: gentle slope.");
  b.card("CONCEPT", "Contour patterns for valleys and spurs?", "Valley: V-shapes pointing uphill. Spur or ridge: V-shapes pointing downhill.");
  b.card("DEFINITION", "Back bearing?", "The bearing in the reverse direction: the bearing ± 180°.");
  b.card("FACT", "Drainage patterns?", "Dendritic (uniform rock), radial (from a hill), trellis (alternating hard and soft rocks), parallel (uniform slope), centripetal (into a basin).");
  b.card("FORMULA", "Sinuosity?", "Channel length ÷ straight-line length; above about 1.5 is meandering.");
  b.card("CONCEPT", "How is intervisibility checked?", "Compare the height of any ridge between the two points with the straight line of sight between them.");
  b.card("CONCEPT", "How to measure a curved route on a map?", "Lay thread or a paper strip along the route, straighten it and measure it against the scale bar.");
});
