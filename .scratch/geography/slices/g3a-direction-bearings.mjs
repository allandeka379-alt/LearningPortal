// Slice G3a: maps.direction-bearings (8/16-point compass, true/grid/magnetic north, bearings, back bearings, compass use).
// Every bearing below was computed from the grid references with atan2 (scratch script b.mjs).
import { concept, P, geographyLevels } from "../lib.mjs";

const EXTRACT = [
  "**Map extract E** (fictional area), scale 1:50 000, grid squares 1 km.",
  "",
  "| N \\ E | 25 | 26 | 27 | 28 |",
  "|---|---|---|---|---|",
  "| 76 | Hill top, spot height 1420 m at 252 762 | Forest | Footpath runs east–west | Mission at 282 762 |",
  "| 75 | Steep slope | Clinic at 263 755 | River flows south-east | Bridge at 284 756 |",
  "| 74 | Grassland | Dip tank at 267 747 | School at 278 741 | Cultivated land |",
  "| 73 | Borehole at 252 732 | Cattle pens | Gravel road runs east–west | Shop at 282 732 |",
].join("\n");

concept("geo.maps.direction-bearings", { file: "maps/direction-bearings", keyPrefix: "maps.direction-bearings" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the bearing of a place that lies due **east** of you?",
    options: [
      ["090°", "Correct: east is a quarter-turn clockwise from north, 90°."],
      ["270°", "270° is due west; bearings run clockwise from north."],
      ["180°", "180° is due south."],
      ["045°", "045° is north-east, halfway between north and east."],
    ],
    answer: "A",
    explanation: "Bearings are measured clockwise from north: N 000°, E **090°**, S 180°, W 270°.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On the 16-point compass, which point lies halfway between north and north-east?",
    options: [
      ["North-north-east (NNE)", "Correct: the point between N and NE is named with the cardinal point first: NNE."],
      ["East-north-east (ENE)", "ENE lies between NE and E, not between N and NE."],
      ["North-north-west (NNW)", "NNW lies between N and NW, on the western side."],
      ["North-east by east", "This is not one of the 16 points used in geography."],
    ],
    answer: "A",
    explanation: "The 16 points are 22.5° apart. Halfway between N (000°) and NE (045°) is **NNE** at 022.5°.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: `${EXTRACT}\n\nWhat is the compass direction of the **mission** from the **borehole**?`,
    options: [
      ["North-east", "Correct: the mission is 3 km east and 3 km north of the borehole, so it lies exactly NE."],
      ["South-west", "This is the direction of the borehole from the mission (the reverse)."],
      ["North-west", "The mission is east of the borehole (easting 28.2 is greater than 25.2)."],
      ["South-east", "The mission is north of the borehole (northing 76.2 is greater than 73.2)."],
    ],
    answer: "A",
    explanation: "Borehole 252 732 to mission 282 762: 3 km east and 3 km north, equal amounts, so the direction is **north-east**.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true, secs: 60,
    stem: `${EXTRACT}\n\nWhat is the bearing of the **shop** from the **hill top**?`,
    options: [
      ["135°", "Correct: the shop is 3 km east and 3 km south of the hill top, so it lies SE, at 135°."],
      ["315°", "315° is the bearing of the hill top from the shop (the back bearing)."],
      ["225°", "225° is SW; this measures anticlockwise from north instead of clockwise."],
      ["045°", "045° is NE; the shop is south of the hill top, not north."],
    ],
    answer: "A",
    explanation: "From the hill top (252 762) the shop (282 732) is 3 km east and 3 km south: south-east, bearing **135°**.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", secs: 90,
    stem: `${EXTRACT}\n\nWhat is the bearing of the **bridge** from the **borehole**, to the nearest degree?`,
    hints: ["The bridge is 3.2 km east and 2.4 km north of the borehole: it lies between N and E, nearer to E or to N?", "Bearing = tan⁻¹(ΔE ÷ ΔN), measured clockwise from north."],
    options: [
      ["053°", "Correct: tan⁻¹(3.2 ÷ 2.4) = 53.1°, so about 053°."],
      ["233°", "233° is the back bearing: the borehole seen from the bridge."],
      ["037°", "037° swaps the eastings and northings (tan⁻¹(2.4 ÷ 3.2)); measure from north, not from east."],
      ["127°", "127° would put the bridge south-east of the borehole, but it lies to the north."],
    ],
    answer: "A",
    explanation: "ΔE = 28.4 − 25.2 = 3.2 km; ΔN = 75.6 − 73.2 = 2.4 km. The angle clockwise from north is tan⁻¹(3.2 ÷ 2.4) = 53.1°, so the bearing is **053°** (north-east, nearer east than the 045° line).",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true, secs: 45,
    stem: "The bearing of a dam from a school is **053°**. What is the bearing of the school from the dam?",
    options: [
      ["233°", "Correct: 053° + 180° = 233°."],
      ["307°", "This subtracts 053° from 360°; a back bearing adds or subtracts 180°."],
      ["127°", "This subtracts 053° from 180°; the back bearing is 053° + 180°."],
      ["143°", "This adds 90° instead of 180°."],
    ],
    answer: "A",
    explanation: "A back bearing differs by exactly 180°. As 053° is less than 180°, add: 053° + 180° = **233°**.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", secs: 45,
    stem: "The bearing of a store from a borehole is **290°**. What is the bearing of the borehole from the store?",
    options: [
      ["110°", "Correct: 290° − 180° = 110°."],
      ["470°", "Bearings stop at 360°; when the bearing is 180° or more, subtract 180°."],
      ["070°", "This is 360° − 290°, which reflects the line instead of reversing it."],
      ["200°", "This subtracts 90° instead of 180°."],
    ],
    answer: "A",
    explanation: "290° is more than 180°, so subtract: 290° − 180° = **110°**.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", secs: 90,
    stem: `${EXTRACT}\n\nUsing the 16-point compass, what is the direction of the **bridge** from the **dip tank**?`,
    hints: ["The bridge is 1.7 km east and 0.9 km north of the dip tank.", "More east than north means between NE (045°) and E (090°)."],
    options: [
      ["East-north-east", "Correct: the bearing is about 062°, closest to ENE (067.5°)."],
      ["North-north-east", "NNE (022.5°) would need the bridge to be further north than east."],
      ["West-south-west", "WSW is the direction of the dip tank from the bridge."],
      ["East-south-east", "ESE would put the bridge south of the dip tank, but it is north."],
    ],
    answer: "A",
    explanation: "Dip tank 267 747 to bridge 284 756: 1.7 km E, 0.9 km N. tan⁻¹(1.7 ÷ 0.9) ≈ 62°, nearest 16-point direction **ENE** (067.5°).",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which north does the needle of a magnetic compass point to?",
    options: [
      ["Magnetic north", "Correct: the needle lines up with the Earth's magnetic field."],
      ["True north", "True north is the geographic North Pole; the needle does not point exactly there."],
      ["Grid north", "Grid north is the direction of the map's vertical grid lines."],
      ["The Pole Star", "The Pole Star marks true north at night; it does not move a compass needle."],
    ],
    answer: "A",
    explanation: "A compass needle points to **magnetic north**. The difference from grid north is the magnetic declination given in the map margin.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", secs: 75,
    stem: "A map margin states that magnetic north is **6° west** of grid north. The grid bearing of a route is **100°**. What magnetic bearing should be set on the compass?",
    hints: ["If magnetic north is west of grid north, the angle from magnetic north to the route is larger.", "Grid to magnetic: add a westerly declination."],
    options: [
      ["106°", "Correct: with a westerly declination, magnetic bearing = grid bearing + 6°."],
      ["094°", "This subtracts the declination; that converts a magnetic bearing back to a grid bearing."],
      ["280°", "This is the back bearing, not a magnetic conversion."],
      ["100°", "This ignores the declination, so the walker would drift off course."],
    ],
    answer: "A",
    explanation: "Magnetic north lies 6° west (anticlockwise) of grid north, so every bearing measured from it is 6° larger: 100° + 6° = **106°**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which compass point matches a bearing of **225°**?",
    options: [
      ["South-west", "Correct: 225° is halfway between south (180°) and west (270°)."],
      ["South-east", "South-east is 135°."],
      ["North-west", "North-west is 315°."],
      ["West-south-west", "WSW is 247.5°, between SW and W."],
    ],
    answer: "A",
    explanation: "Intercardinal points: NE 045°, SE 135°, **SW 225°**, NW 315°.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: `${EXTRACT}\n\nWhich feature lies due **west** of the mission?`,
    options: [
      ["The hill top", "Correct: the hill top (252 762) has the same northing as the mission (282 762) and is 3 km further west."],
      ["The clinic", "The clinic (263 755) is south of the mission's northing, so it lies WSW."],
      ["The borehole", "The borehole is 3 km south as well as 3 km west: south-west."],
      ["The dip tank", "The dip tank (267 747) is well south of the mission's northing."],
    ],
    answer: "A",
    explanation: "Due west means the same northing and a smaller easting. Only the **hill top** shares northing 76.2 with the mission.",
  });
  b.calc({
    d: 3, skill: "APPLICATION", secs: 120,
    stem: `${EXTRACT}\n\nCalculate the bearing of the **borehole** from the **bridge**, to the nearest degree.`,
    value: 233, tol: 2, unit: "°",
    wrong: [53, 37],
    hints: ["Find ΔE and ΔN from the bridge to the borehole; both are negative (west and south).", "Work out the angle for the forward bearing first, then add 180°."],
    explanation: "From the bridge (284 756) to the borehole (252 732): 3.2 km W and 2.4 km S. The bearing of the bridge from the borehole is tan⁻¹(3.2 ÷ 2.4) = 53.1°, so the borehole from the bridge is 053° + 180° = **233°**.",
    workedSolution: "1. ΔE = 25.2 − 28.4 = −3.2 km (west); ΔN = 73.2 − 75.6 = −2.4 km (south).\n2. The opposite (forward) bearing, borehole to bridge: tan⁻¹(3.2 ÷ 2.4) = 53.1° → 053°.\n3. Back bearing: 053° + 180° = 233°.",
  });
  b.num({
    d: 2, skill: "APPLICATION", secs: 45,
    stem: "The bearing of a clinic from a village is **075°**. What is the bearing of the village from the clinic?",
    value: 255, unit: "°",
    wrong: [285, 105],
    explanation: "075° is less than 180°, so add 180°: 075° + 180° = **255°**.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the 16-point compass direction that matches a bearing of **157.5°**.",
    accepted: ["SSE", "south-south-east", "south south east", "southsoutheast", "south-south east", "south south-east"],
    wrong: ["SE", "ESE"],
    explanation: "157.5° is halfway between S (180°) and SE (135°): **south-south-east (SSE)**.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Bearings are measured **anticlockwise** from north.",
    answer: false,
    feedbackFalse: "Correct: bearings are always measured clockwise from north.",
    feedbackTrue: "Not so: bearings run clockwise, so east is 090° and west is 270°.",
    explanation: "Bearings are measured **clockwise** from (grid) north and written with three figures.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each blank.",
    template: "True north points to the {{blank:a}}. Grid north follows the {{blank:b}} on a map. A compass needle points to {{blank:c}} north.",
    blanks: [
      { id: "a", accepted: ["geographic North Pole"], choices: ["geographic North Pole", "magnetic North Pole", "top of the map frame"] },
      { id: "b", accepted: ["eastings"], choices: ["eastings", "northings", "contours"] },
      { id: "c", accepted: ["magnetic"], choices: ["magnetic", "true", "grid"] },
    ],
    explanation: "True north: the geographic North Pole. Grid north: the direction of the vertical grid lines (eastings). The compass needle: magnetic north.",
  });
  b.match({
    d: 1, skill: "RECALL",
    stem: "Match each bearing to its compass point.",
    pairs: [["000°", "North"], ["090°", "East"], ["135°", "South-east"], ["225°", "South-west"], ["315°", "North-west"]],
    explanation: "The 8-point compass points are 45° apart, starting with north at 000° and running clockwise.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "A Form 3 student must walk on a bearing of 120° across open bush using a baseplate compass. Describe how she should use the compass to follow the bearing.",
    hints: ["Think about setting the bearing, lining up the needle, and keeping a straight line."],
    points: [
      "Turns the compass housing so that 120° is set against the direction-of-travel arrow (index line).",
      "Holds the compass flat and turns her body until the red (north) end of the needle sits inside the orienting arrow.",
      "Walks in the direction of the travel arrow, sighting a landmark on that line, walking to it and repeating (away from metal objects).",
    ],
    modelAnswer: "She sets 120° on the housing against the index line, holds the compass flat and turns until the red needle lies in the orienting arrow, then walks where the travel arrow points, choosing a tree or rock on the line, walking to it and repeating.",
    explanation: "Set the bearing, align the needle with the orienting arrow, then follow the travel arrow from landmark to landmark.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "Evaluate the usefulness of a topographical map and a magnetic compass for a ranger patrolling a large national park.",
    hints: ["Consider what bearings and compass points allow the ranger to do.", "Consider the problems: declination, metal objects, out-of-date maps, dense vegetation, darkness."],
    points: [
      "Bearings give exact directions, so the ranger can travel between points (for example a waterhole and a camp) across country without roads.",
      "Back bearings let the ranger return to the starting point or report a position to others.",
      "Map and compass need no batteries or signal, so they work in remote areas where phones or GPS may fail.",
      "Limitation: magnetic declination must be allowed for, or the ranger drifts off course.",
      "Limitation: iron objects, vehicles or rocks rich in iron can deflect the needle; dense bush or darkness makes it hard to sight landmarks.",
      "Judgement: very useful as a reliable basic method, best combined with GPS and up-to-date maps.",
    ],
    levels: geographyLevels(6),
    modelAnswer: "A map and compass let a ranger move between known points by exact bearings rather than vague compass points, and back bearings bring the patrol home or let it report its position. They need no batteries or network, so they keep working deep in a park. However, the ranger must convert grid bearings to magnetic ones using the declination in the map margin, keep away from vehicles and metal that deflect the needle, and may struggle to sight landmarks in thick bush or at night; the map may also be out of date. Overall they are very useful as a dependable core method, best combined with GPS where it is available.",
    explanation: "A balanced answer gives uses (exact direction, return route, no power needed), limitations (declination, deflection, visibility, old maps) and a judgement.",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: `${EXTRACT}\n\nUse the extract to answer the questions.`,
    hints: ["Bearings are measured clockwise from grid north at the place after the word 'from'.", "Grid squares are 1 km."],
    parts: [
      P.num({
        label: "(a)", stem: "State the bearing of the mission from the borehole.",
        value: 45, tol: 2, unit: "°", answer: "045", wrong: [225],
        explanation: "3 km east and 3 km north: north-east, 045°.",
      }),
      P.num({
        label: "(b)", stem: "State the bearing of the borehole from the mission.",
        value: 225, tol: 2, unit: "°", wrong: [45],
        explanation: "Back bearing: 045° + 180° = 225°.",
      }),
      P.mcq({
        label: "(c)", stem: "Using the 16-point compass, what is the direction of the school from the bridge?",
        options: [
          ["South-south-west", "Correct: the bearing is about 202°, which is SSW (202.5°)."],
          ["North-north-east", "NNE is the direction of the bridge from the school."],
          ["South-west", "SW (225°) would need equal distances south and west; the school is mostly south."],
          ["West-south-west", "WSW (247.5°) would need the school to be more west than south."],
        ],
        answer: "A",
        explanation: "Bridge 284 756 to school 278 741: 0.6 km W, 1.5 km S. tan⁻¹(0.6 ÷ 1.5) ≈ 22°, so the bearing is 180° + 22° ≈ 202°: SSW.",
      }),
      P.num({
        label: "(d)", stem: "Calculate the straight-line distance from the borehole to the mission, in km.",
        value: 4.24, tol: 0.05, unit: "km", answer: "4.24", wrong: [6, 3],
        explanation: "√(3² + 3²) = √18 = 4.24 km.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "A herd boy walks from the hill top on a bearing of 180°. Name the feature he reaches and explain how you know.",
        points: [
          "Names the borehole.",
          "Explains that 180° is due south, and the borehole has the same easting (25.2) as the hill top but a lower northing.",
        ],
        explanation: "A bearing of 180° keeps the easting constant while the northing falls.",
      }),
    ],
    explanation: "Map bearings: identify the starting place, estimate the direction, then measure or calculate the angle clockwise from grid north.",
  });
  b.struct({
    d: 4, skill: "APPLICATION",
    stem: "The margin of a (fictional) topographical map states: *magnetic north is 8° west of grid north (year of survey)*. A school hiking club plans a route using this map and a magnetic compass.",
    hints: ["With a westerly declination: grid → magnetic, add; magnetic → grid, subtract.", "A back bearing differs by 180°."],
    parts: [
      P.num({
        label: "(a)", stem: "The first leg has a grid bearing of 040°. What magnetic bearing should be set on the compass?",
        value: 48, unit: "°", answer: "048", wrong: [32],
        explanation: "Westerly declination: add. 040° + 8° = 048°.",
      }),
      P.num({
        label: "(b)", stem: "On the second leg a hiker reads a magnetic bearing of 200° to a distant hill. What is the grid bearing to plot?",
        value: 192, unit: "°", wrong: [208],
        explanation: "Magnetic to grid with a westerly declination: subtract. 200° − 8° = 192°.",
      }),
      P.num({
        label: "(c)", stem: "What grid bearing would lead the hikers straight back along the second leg to where they started it?",
        value: 12, unit: "°", answer: "012", wrong: [372, 20],
        explanation: "Back bearing of 192°: 192° − 180° = 012°.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Suggest two reasons why the club's compass readings might be inaccurate.",
        points: [
          "A reason linked to deflection of the needle (taking the reading near a vehicle, fence, power line or iron object).",
          "A second reason (declination changes over time so an old map's figure is out of date / compass not held flat / careless sighting).",
        ],
        explanation: "Compass errors come from magnetic interference, an out-of-date declination and poor technique.",
      }),
    ],
    explanation: "Converting between grid and magnetic bearings depends on the direction of the declination stated in the margin.",
  });

  b.card("DEFINITION", "Bearing", "The angle measured clockwise from (grid) north to the line joining two places, written with three figures, e.g. 045°.");
  b.card("CONCEPT", "Back bearing", "Add 180° to a bearing below 180°, or subtract 180° from one of 180° or more, e.g. 053° ↔ 233°.");
  b.card("FACT", "8-point compass bearings", "N 000°, NE 045°, E 090°, SE 135°, S 180°, SW 225°, W 270°, NW 315°.");
  b.card("FACT", "16-point compass", "Points 22.5° apart: e.g. NNE 022.5°, ENE 067.5°, ESE 112.5°, SSE 157.5°.");
  b.card("VOCABULARY", "Grid north", "The direction of the vertical grid lines (eastings) on a map; the north used for map bearings.");
  b.card("VOCABULARY", "Magnetic declination", "The angle between grid (or true) north and magnetic north, printed in the map margin; it changes slowly over time.");
  b.card("CONCEPT", "Grid ↔ magnetic bearing (westerly declination)", "Grid to magnetic: add the declination. Magnetic to grid: subtract it.");
  b.card("CONCEPT", "\"Bearing of A from B\"", "Stand at B (the place after 'from'), draw north there, and measure clockwise to A.");
});
