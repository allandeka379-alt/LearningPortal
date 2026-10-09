// Slice G3a: maps.relief-contours (contours, interval, spot heights, trig stations, landforms from contour patterns, slopes).
import { concept, P, geographyLevels } from "../lib.mjs";

const EXTRACT = [
  "**Map extract F** (fictional area), scale 1:50 000, grid squares 1 km, contour interval 20 m.",
  "",
  "| N \\ E | 14 | 15 | 16 | 17 |",
  "|---|---|---|---|---|",
  "| 33 | Closed 1400 m contour rings a summit; trigonometrical station 1412 m at 145 335 | Contours 1300 m to 1380 m very close together, running north–south | Contours 1220 m to 1280 m widely spaced, running north–south | Almost no contours; cultivated land at about 1200 m |",
  "| 32 | Contours 1360 m to 1400 m bend into Vs pointing west; a stream rises at 142 326 and flows east | Stream crosses closely spaced contours (1300 m to 1340 m); waterfall at 155 324 | Stream crosses widely spaced contours; bridge at 168 324 on the 1220 m contour | Stream enters a dam at 175 323; water surface about 1200 m |",
  "| 31 | Contours 1340 m to 1380 m close together | Contours 1260 m to 1320 m evenly spaced | Track runs east–west | Grassland at about 1200 m |",
].join("\n");

concept("geo.maps.relief-contours", { file: "maps/relief-contours", keyPrefix: "maps.relief-contours" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a contour line?",
    options: [
      ["A line joining places of the same height above sea level", "Correct: every point on one contour has the same altitude."],
      ["A line joining places with the same annual rainfall", "That is an isohyet, another kind of isoline."],
      ["A line marking the edge of a steep cliff", "Cliffs have their own symbol; contours mark equal height everywhere."],
      ["A line joining places of the same air temperature", "That is an isotherm, used on weather maps."],
    ],
    answer: "A",
    explanation: "A **contour** joins points of equal height above sea level; it is one type of isoline.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What do contour lines that are **very close together** show?",
    options: [
      ["A steep slope", "Correct: height changes quickly over a short distance."],
      ["A gentle slope", "Gentle slopes have widely spaced contours."],
      ["Flat land", "Flat land has few or no contours."],
      ["A river valley floor", "Valley floors are usually gently sloping, with wide contour spacing."],
    ],
    answer: "A",
    explanation: "The closer the contours, the more height is gained in a short horizontal distance, so the **steeper** the slope.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true, secs: 60,
    stem: "On a map, the labelled contours 900 m and 1000 m have **nine** unlabelled contours between them. What is the contour interval?",
    options: [
      ["10 m", "Correct: nine lines between make ten gaps, and 100 m ÷ 10 = 10 m."],
      ["11.1 m", "This divides by the nine lines; there are ten gaps between 900 m and 1000 m."],
      ["20 m", "With a 20 m interval there would be only four unlabelled contours between them."],
      ["9 m", "Contour intervals are not found by counting lines alone; divide the height difference by the gaps."],
    ],
    answer: "A",
    explanation: "Count the gaps, not the lines: 9 lines between → 10 gaps. (1000 − 900) ÷ 10 = **10 m**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A river flows through a series of V-shaped contours whose points face **higher** ground. What landform do the Vs show?",
    options: [
      ["A valley", "Correct: valley contours form Vs pointing upstream, towards higher ground."],
      ["A spur", "Spur contours form Vs or Us pointing downhill, towards lower ground."],
      ["A col", "A col is a low point between two summits, shown by two sets of closed contours."],
      ["A plateau", "A plateau shows a wide level top with closely spaced contours round its edge."],
    ],
    answer: "A",
    explanation: "Contours bend upstream where they cross a river valley, so the Vs point **uphill**. That is a **valley**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Contours form a U shape whose curved end points towards **lower** ground. What landform is this?",
    options: [
      ["A spur", "Correct: a spur is a tongue of high land, so its contours point downhill."],
      ["A valley", "Valley contours point uphill, towards higher ground."],
      ["A col", "A col lies between two closed sets of contours round summits."],
      ["An escarpment", "An escarpment is a long line of crowded contours beside widely spaced ones."],
    ],
    answer: "A",
    explanation: "A **spur** projects from high ground into lower ground, so its contours bend out towards the lower land.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which contour pattern shows a **concave** slope?",
    options: [
      ["Close together near the top, widely spaced near the bottom", "Correct: a concave slope is steep high up and gentle lower down."],
      ["Widely spaced near the top, close together near the bottom", "This is a convex slope: gentle at the top, steep at the bottom."],
      ["Evenly spaced from the top to the bottom", "Even spacing shows a uniform (straight) slope."],
      ["Closed circles evenly spaced round a summit", "This describes a conical hill, not one type of slope profile."],
    ],
    answer: "A",
    explanation: "Concave: steep at the top (crowded contours), gentle at the bottom (spread contours). Convex is the reverse.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", secs: 75,
    stem: "A map shows two summits, at 1480 m and 1465 m, each ringed by closed contours. Between them the land dips to about 1410 m before rising again. What is the low point between the summits called?",
    hints: ["The feature lies on high ground but is lower than the hills on either side.", "It is sometimes called a saddle."],
    options: [
      ["A col", "Correct: a col (saddle) is a low point on a ridge between two summits."],
      ["A spur", "A spur projects from high ground towards lower ground; it does not sit between two summits."],
      ["A plateau", "A plateau is a wide, fairly level upland, not a dip between two peaks."],
      ["An escarpment", "An escarpment is a long steep slope facing one direction."],
    ],
    answer: "A",
    explanation: "Two closed sets of contours with lower ground between them show a **col** (saddle). Roads and footpaths often use cols to cross ridges.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which contour pattern shows a **plateau**?",
    options: [
      ["A wide area with few contours on top, edged by close contours", "Correct: a plateau has a high, fairly level top with steep sides."],
      ["Small circular contours rising evenly to a pointed summit", "This is a conical hill."],
      ["Contours forming Vs that point towards higher ground", "This is a river valley."],
      ["Contours widely spaced everywhere, with no closed rings", "This shows a gentle slope or lowland, not a raised level upland."],
    ],
    answer: "A",
    explanation: "A **plateau** is a raised, fairly flat upland: few contours across the top and crowded contours on the steep edges.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", secs: 75,
    stem: "Along a line running north–south, contours are crowded very close together on the **west** side, while on the **east** side the land falls away with widely spaced contours. What landform is shown?",
    hints: ["The feature has a steep face on one side and a gentle slope on the other.", "It stretches a long way in one direction."],
    options: [
      ["An escarpment", "Correct: a long steep scarp slope (crowded contours) with a gentle dip slope (wide spacing) behind it."],
      ["A conical hill", "A conical hill has closed, evenly spaced contours on all sides."],
      ["A col", "A col needs two summits with a dip between them."],
      ["A valley", "A valley shows Vs pointing uphill, usually with a river."],
    ],
    answer: "A",
    explanation: "Crowded contours along one side and widely spaced contours on the other, running in a long line, show an **escarpment** (scarp slope plus dip slope).",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On a topographical map, a small **triangle** with a height beside it, usually on a hilltop, shows:",
    options: [
      ["A trigonometrical station", "Correct: a surveyed reference point, shown by a triangle and its height."],
      ["A spot height", "A spot height is shown by a dot with a height, not a triangle."],
      ["A contour value label", "Contour labels are written along the contour line itself."],
      ["A rock outcrop on a hilltop", "Outcrops have their own rock symbol, not a triangle with a height."],
    ],
    answer: "A",
    explanation: "A **trigonometrical station** is marked by a small triangle and its exact height; a spot height is a dot with a height.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A borehole lies **halfway** between the 1420 m and 1440 m contours. What is its approximate height?",
    options: [
      ["1430 m", "Correct: halfway between 1420 m and 1440 m is about 1430 m."],
      ["1420 m", "Only points on the 1420 m contour are exactly 1420 m; the borehole is higher."],
      ["1440 m", "The borehole is below the 1440 m contour."],
      ["1450 m", "1450 m is above the higher contour."],
    ],
    answer: "A",
    explanation: "Estimate between contours by position: halfway between 1420 m and 1440 m is about **1430 m**.",
  });
  b.num({
    d: 2, skill: "APPLICATION", secs: 60,
    stem: "A trigonometrical station is marked **1537 m**. A dam's water surface lies on the **1260 m** contour. Calculate the difference in height between them.",
    value: 277, unit: "m",
    wrong: [2797, 377],
    explanation: "1537 − 1260 = **277 m**.",
  });
  b.num({
    d: 3, skill: "APPLICATION", secs: 75,
    stem: "The contour interval is **20 m**. A hiker climbs from the 1100 m contour to a summit with a spot height of **1287 m**. How many contour lines does she cross or start on, **including** the 1100 m contour?",
    value: 10,
    wrong: [9, 11],
    hints: ["List the contours from 1100 m upwards in steps of 20 m.", "The highest contour below 1287 m is 1280 m."],
    explanation: "Contours: 1100, 1120, 1140, 1160, 1180, 1200, 1220, 1240, 1260, 1280 = **10** lines. There is no 1300 m contour below the summit.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the landform shown by a low point on a ridge between two hilltops.",
    accepted: ["col", "a col", "saddle", "a saddle"],
    wrong: ["spur", "valley"],
    explanation: "A **col** (also called a saddle) is a dip in a ridge between two summits.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Widely spaced contours show a gentle slope.",
    answer: true,
    feedbackTrue: "Correct: the land rises only a little over a long distance.",
    feedbackFalse: "Not so: widely spaced contours mean height changes slowly, so the slope is gentle.",
    explanation: "Spacing shows steepness: wide spacing = **gentle**, close spacing = steep.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each blank.",
    template: "A slope that is gentle at the top and steep at the bottom is {{blank:a}}. A slope with evenly spaced contours is {{blank:b}}. Rivers flow from {{blank:c}} contours to lower ones.",
    blanks: [
      { id: "a", accepted: ["convex"], choices: ["convex", "concave", "uniform"] },
      { id: "b", accepted: ["uniform"], choices: ["uniform", "convex", "concave"] },
      { id: "c", accepted: ["higher"], choices: ["higher", "lower", "closer"] },
    ],
    explanation: "Convex: gentle top, steep bottom. Uniform: even spacing. Rivers always flow downhill, from higher to lower contours.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each landform to its contour pattern.",
    pairs: [
      ["Conical hill", "Roughly circular closed contours, evenly spaced, round a summit"],
      ["Ridge", "Long, narrow closed contours stretched in one direction"],
      ["Valley", "Vs pointing towards higher ground, with a river through them"],
      ["Spur", "Vs or Us pointing towards lower ground"],
      ["Escarpment", "A long line of crowded contours beside widely spaced ones"],
    ],
    explanation: "Shape (closed, elongated, V-shaped) and spacing (even, crowded, wide) together identify the landform.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how you can tell a valley from a spur on a topographical map when both show V-shaped contours.",
    hints: ["Look at which way the point of the V faces compared with the contour values."],
    points: [
      "Reads the contour values to find which way the land rises.",
      "Valley: the Vs point uphill / upstream, towards higher contours.",
      "Spur: the Vs point downhill, towards lower contours (and a river or stream symbol usually runs through valley Vs, not along spurs).",
    ],
    modelAnswer: "Check the heights on the contours. If the point of each V faces the higher contours, the V points upstream and it is a valley, usually with a river along it. If the point faces the lower contours, it is a spur of high land.",
    explanation: "Direction of the V relative to the contour values decides valley versus spur.",
  });
  b.ext({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: `${EXTRACT}\n\nDescribe the relief and drainage of the area shown in Extract F.`,
    hints: ["Give the highest and lowest points with heights and grid references.", "Describe the general slope, the steepness in different parts, and the stream's direction and features."],
    points: [
      "Highest point: trigonometrical station 1412 m at 145 335 (summit ringed by the 1400 m contour) in the north-west.",
      "Lowest land about 1200 m in the east (cultivated land / dam / grassland in column 17).",
      "General slope: land falls from west to east.",
      "Steep slope in column 15 (contours 1300-1380 m close together) becoming gentle in column 16 (wide spacing): a concave slope; flat land in the east.",
      "Drainage: one stream rises at 142 326, flows east across the contours, with a waterfall at 155 324 on the steep section.",
      "The stream is crossed by a bridge at 168 324 (1220 m) and enters a dam at 175 323; valley shown by contour Vs pointing west.",
    ],
    levels: geographyLevels(6),
    modelAnswer: "The highest land is in the north-west, where the 1400 m contour rings a summit with a trigonometrical station of 1412 m at 145 335. The land falls eastwards to about 1200 m in column 17. Between eastings 15 and 16 the slope is steep (contours 1300-1380 m crowded together) and then becomes gentle (1220-1280 m widely spaced), so the slope is concave, and the east is almost flat. Drainage is by one stream that rises at 142 326 in a valley whose contours form Vs pointing west, flows east over a waterfall at 155 324 where the slope is steep, passes under a bridge at 168 324 on the 1220 m contour and enters a dam at 175 323.",
    explanation: "Relief descriptions quote heights and grid references; drainage descriptions follow the river from source to mouth.",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: `${EXTRACT}\n\nUse the extract to answer the questions.`,
    hints: ["Rivers flow from higher to lower contours.", "Look at how the spacing changes between columns 15 and 16."],
    parts: [
      P.num({
        label: "(a)", stem: "State the height of the highest point on the extract.",
        value: 1412, unit: "m", wrong: [1400],
        explanation: "The trigonometrical station at 145 335 is 1412 m, higher than the 1400 m contour round it.",
      }),
      P.mcq({
        label: "(b)", stem: "In which direction does the stream flow?",
        options: [
          ["From west to east", "Correct: it rises at 142 326 near 1380 m and reaches the dam at about 1200 m in the east."],
          ["From east to west", "That would mean flowing uphill from 1200 m to over 1300 m."],
          ["From north to south", "The stream stays in row 32 and crosses the north–south contours."],
          ["From south to north", "The stream stays in row 32; it crosses the contours from west to east."],
        ],
        answer: "A",
        explanation: "Water flows downhill: from the high west (about 1380 m) to the dam in the east (about 1200 m).",
      }),
      P.num({
        label: "(c)", stem: "Calculate the difference in height between the trigonometrical station and the bridge.",
        value: 192, unit: "m", wrong: [212],
        explanation: "The bridge is on the 1220 m contour: 1412 − 1220 = 192 m.",
      }),
      P.mcq({
        label: "(d)", stem: "Going downhill from easting 15 to easting 17 in row 33, what type of slope is shown?",
        options: [
          ["Concave", "Correct: steep higher up (crowded contours in column 15), gentle lower down (wide spacing in column 16)."],
          ["Convex", "A convex slope is gentle at the top and steep at the bottom: the reverse."],
          ["Uniform", "The spacing is not even: crowded in column 15 and wide in column 16."],
          ["Vertical", "No cliff symbol is shown; the contours change spacing gradually."],
        ],
        answer: "A",
        explanation: "Crowded contours above, spread contours below: a concave slope.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Suggest why there is a waterfall at 155 324.",
        points: [
          "The stream crosses closely spaced contours there (1300-1340 m), so the land drops steeply.",
          "Water falls over the sudden steep drop / a band of resistant rock, forming a waterfall.",
        ],
        explanation: "Waterfalls occur where a river crosses a steep section (crowded contours).",
      }),
    ],
    explanation: "Contour values give height and the direction of flow; contour spacing gives the steepness and slope type.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: "Table 1 gives heights read from contours every 0.5 km along a straight line across a (fictional) map.\n\n| Distance along line (km) | 0 | 0.5 | 1.0 | 1.5 | 2.0 | 2.5 | 3.0 |\n|---|---|---|---|---|---|---|---|\n| Height (m) | 1180 | 1200 | 1260 | 1340 | 1360 | 1300 | 1240 |",
    hints: ["The biggest change in height over 0.5 km shows the steepest section.", "Look at whether the land rises, then falls."],
    parts: [
      P.num({
        label: "(a)", stem: "Calculate the total rise in height from 0 km to the highest point on the line.",
        value: 180, unit: "m", wrong: [1360],
        explanation: "Highest point 1360 m at 2.0 km; 1360 − 1180 = 180 m.",
      }),
      P.mcq({
        label: "(b)", stem: "Between which two points is the slope steepest?",
        options: [
          ["1.0 km and 1.5 km", "Correct: the land rises 80 m in 0.5 km, the largest change."],
          ["0 km and 0.5 km", "Here the land rises only 20 m."],
          ["1.5 km and 2.0 km", "Here the land rises only 20 m."],
          ["2.0 km and 2.5 km", "Here the land falls 60 m, less than the 80 m rise from 1.0 to 1.5 km."],
        ],
        answer: "A",
        explanation: "Changes per 0.5 km: +20, +60, +80, +20, −60, −60. The largest change, 80 m, is between 1.0 km and 1.5 km.",
      }),
      P.mcq({
        label: "(c)", stem: "Which landform does the line most likely cross?",
        options: [
          ["A hill or ridge", "Correct: the land rises to a high point at 2.0 km and falls on the far side."],
          ["A valley", "A valley would fall to a low point and rise again."],
          ["A plateau", "A plateau would show a long level section at the top; here the top is a single high point."],
          ["A flat plain", "Heights change by up to 80 m in 0.5 km, so the land is not flat."],
        ],
        answer: "A",
        explanation: "Rising then falling heights show high ground (a hill or ridge) crossed by the line.",
      }),
      P.manual({
        label: "(d)", marks: 1, stem: "Explain why heights read from contours between lines are only estimates.",
        points: ["Between two contours the exact height is not shown, so the reader must interpolate by position."],
        explanation: "Only points on a contour, spot heights and trigonometrical stations give exact heights.",
      }),
    ],
    explanation: "A list of heights along a line is the data behind a cross-section: rises and falls show the landforms and the steepness.",
  });

  b.card("DEFINITION", "Contour line", "A line on a map joining places of equal height above sea level.");
  b.card("DEFINITION", "Contour interval", "The difference in height between neighbouring contours; count the gaps, not the lines.");
  b.card("VOCABULARY", "Spot height vs trigonometrical station", "Spot height: dot with exact height. Trigonometrical station: triangle with height, a surveyed reference point.");
  b.card("CONCEPT", "Contour spacing", "Close = steep; wide = gentle; even = uniform; none over a wide area = flat.");
  b.card("CONCEPT", "Concave vs convex slope", "Concave: steep top, gentle bottom (crowded contours high up). Convex: gentle top, steep bottom.");
  b.card("CONCEPT", "Valley vs spur", "Valley Vs point uphill (upstream); spur Vs point downhill.");
  b.card("VOCABULARY", "Col (saddle)", "A low point on a ridge between two summits, shown by two sets of closed contours.");
  b.card("CONCEPT", "Escarpment", "A long line of crowded contours (scarp slope) beside widely spaced contours (gentle dip slope).");
});
