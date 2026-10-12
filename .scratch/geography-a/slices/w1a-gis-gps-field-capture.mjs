// W1a: gis.gps-field-capture. Illustrative data; numbers computed in code.
import { concept, P, t, chk, table, dpStr, geographyLevels } from "../lib.mjs";

const C = 300000; // km/s, rounded for exam calculations
const tab = (h, r) => table(h, r);
const wp = [[421300, 7904600], [421380, 7904600], [421380, 7904660], [421300, 7904660]];
chk(Math.hypot(80, 60), 100);
const bearW = (Math.atan2(560, 420) * 180) / Math.PI; // 53.13

concept("ageo.gis.gps-field-capture", { file: "gis/gps-field-capture", keyPrefix: "gis.gps-field-capture" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the minimum number of satellites needed for a reliable three-dimensional GPS fix?",
    options: [
      ["Four", "Correct: three for position plus one to remove receiver clock error."],
      ["Two", "Two ranges leave the position as a circle."],
      ["Three", "Three give a rough two-dimensional position at best."],
      ["Six", "Six is more than the minimum."],
    ],
    answer: "A",
    explanation: "Four satellites are needed to solve x, y, z and the receiver clock error.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How does a GPS receiver calculate its distance from a satellite?",
    options: [
      ["Speed of light multiplied by the signal travel time", "Correct: range = c × t."],
      ["Signal strength multiplied by the satellite's height", "Strength is not used to find range."],
      ["Satellite speed divided by the number of signals", "Satellite speed is not the basis of range."],
      ["The angle of the satellite above the horizon only", "Angle alone cannot give a distance."],
    ],
    answer: "A",
    explanation: "The receiver measures the time a radio signal takes to arrive and multiplies by the speed of light.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is multipath error?",
    options: [
      ["Signals reflect off surfaces before arriving", "Correct: the longer path makes the range seem too long."],
      ["The receiver connects to too many satellites together", "More satellites normally improve the fix."],
      ["The satellite travels along several orbits at once", "Satellites follow set orbits."],
      ["Signals travel faster in the upper atmosphere here", "Atmosphere slows signals; this is a different error."],
    ],
    answer: "A",
    explanation: "Multipath happens when a signal reflects off buildings, cliffs or water, so its path is longer than the direct path.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A receiver can see five satellites, but all are in one small part of the sky. What is likely to happen?",
    options: [
      ["Poor geometry (high DOP) gives a less accurate position", "Correct: bunched satellites produce poor intersections."],
      ["The fix is more accurate because there are five satellites", "Spread matters as well as number."],
      ["The receiver cannot calculate any position at all", "A position is calculated, but less accurately."],
      ["The clock error is removed completely", "A clock error remains and is solved with a fourth range."],
    ],
    answer: "A",
    explanation: "When satellites are clustered, their range spheres intersect at shallow angles, giving a large position error (high dilution of precision).",
    hints: ["Does spread matter as well as number?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which method gives sub-metre accuracy by using corrections from a base station at a known position?",
    options: [
      ["Differential GPS", "Correct: the base station sends corrections for the common errors."],
      ["Averaging a phone's location for one second", "Short averaging does not remove systematic errors."],
      ["Using a larger map scale", "Map scale does not affect satellite position errors."],
      ["Recording a track more slowly", "The speed of recording does not correct errors."],
    ],
    answer: "A",
    explanation: "Differential GPS applies corrections computed at a station whose position is known precisely.",
    hints: ["Which method uses a second, fixed receiver?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A team records a borehole under dense forest and the GPS position seems 20 m off. What is the best action?",
    options: [
      ["Move to a clearing and record the offset", "Correct: it improves the fix and keeps the real position."],
      ["Record the position and trust what the screen shows", "A weak fix under trees should not be trusted."],
      ["Switch off the receiver until noon each day", "Timing alone does not solve a canopy problem."],
      ["Round the coordinates to whole numbers only", "Rounding hides, not fixes, the error."],
    ],
    answer: "A",
    explanation: "Canopy blocks and reflects signals. Taking a fix in the open and recording the offset (distance and bearing) to the feature gives a better result.",
    hints: ["Where would more satellites be visible?"],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A GPS receiver records a point every 10 seconds as a surveyor walks along a fence. What is this recorded data called?",
    options: [
      ["A track", "Correct: positions recorded automatically as the receiver moves."],
      ["A waypoint", "A waypoint is a single, deliberately recorded point."],
      ["A raster", "A raster is a grid of cells."],
      ["A datum", "A datum is a reference model of the Earth."],
    ],
    answer: "A",
    explanation: "A track is a sequence of automatically recorded positions; a waypoint is a single marked position.",
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: "A signal takes 0.0712 s to reach a GPS receiver. Taking the speed of radio waves as 300 000 km/s, calculate the distance to the satellite, in km.",
    value: 0.0712 * C, unit: "km",
    wrong: [21.4, 4213],
    explanation: "Range = speed × time = 300 000 × 0.0712 = 21 360 km. A misplaced decimal point gives much smaller values.",
    hints: ["Distance = speed × time."],
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A receiver clock is 2 microseconds (0.000002 s) fast. Using 300 000 km/s for the speed of radio waves, what error in range does this cause, in metres?",
    value: 0.000002 * C * 1000, unit: "m",
    wrong: [0.6, 60],
    explanation: "Error = 300 000 km/s × 0.000002 s = 0.6 km = 600 m. This is why a fourth satellite is needed to find the clock error.",
    hints: ["Convert your answer from kilometres to metres."],
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Two waypoints have UTM coordinates (E 421 000, N 7 905 000) and (E 421 480, N 7 905 640). Calculate the straight-line distance between them, in metres.",
    value: Math.hypot(480, 640), unit: "m",
    wrong: [1120, 160],
    explanation: "Change in easting 480 m, in northing 640 m. Distance = √(480² + 640²) = √(230 400 + 409 600) = √640 000 = 800 m. Adding the two changes gives 1 120 m.",
    hints: ["Use Pythagoras with the changes in easting and northing."],
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "A field worker walks a recorded track of 840 m in 12 minutes. Calculate the average walking speed, in km/h.",
    value: (0.84 / 12) * 60, unit: "km/h", dp: 1,
    wrong: [70, 0.07],
    explanation: "840 m = 0.84 km; 12 min = 0.2 h; speed = 0.84 ÷ 0.2 = 4.2 km/h. Not converting units gives 70 (m per minute).",
    hints: ["Convert metres to kilometres and minutes to hours."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A GPS receiver that displays coordinates to six decimal places must be accurate to within a few centimetres.",
    answer: false,
    explanation: "False. The number of decimal places shows only how the coordinates are displayed; accuracy depends on signal quality, geometry and correction methods.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Describe how a field team should record the position of a borehole to get the most reliable GPS fix.",
    points: ["Stand in the open, away from trees and walls, and wait until the receiver shows a good fix from at least four satellites", "Average several readings or wait a few minutes, and note the accuracy shown by the receiver", "Record the datum, the coordinates and attributes (such as the borehole number) in the receiver or a notebook"],
    modelAnswer: "Stand in the open, away from trees and walls, and wait until the receiver has a good fix from at least four satellites. Average several readings or wait a few minutes and note the accuracy shown, then record the datum, the coordinates and attributes such as the borehole number.",
    explanation: "Open site and good fix, averaging, and recording details.",
    hints: ["Think about where to stand, how long to wait and what to write down."],
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each source of GPS error to a suitable remedy.",
    pairs: [
      ["Atmospheric delay", "Differential correction from a base station"],
      ["Multipath", "Observe away from walls and cliffs"],
      ["Poor satellite geometry", "Wait for a better arrangement of satellites"],
      ["Canopy cover", "Move to a clearing and record an offset"],
    ],
    explanation: "Each error has a practical remedy in the field or in processing.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statement.",
    template: "GPS positions are found by {{blank:a}}: the distances to at least {{blank:b}} satellites are used to solve for position and clock error.",
    blanks: [
      { id: "a", accepted: ["trilateration"], choices: ["trilateration", "triangulation of angles", "interpolation"] },
      { id: "b", accepted: ["four"], choices: ["two", "three", "four"] },
    ],
    explanation: "Trilateration uses ranges; four satellites are needed for a 3D fix with the clock error.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which term describes the effect of satellite arrangement on the accuracy of a GPS position (abbreviated DOP)?",
    accepted: ["dilution of precision", "dop"],
    wrong: ["multipath", "datum"],
    explanation: "**Dilution of precision** is large when satellites are bunched together.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why a fourth satellite is needed for a three-dimensional GPS fix.",
    points: ["The receiver's clock is not accurate enough, so every range contains the same unknown timing error", "Three ranges solve only for position (x, y, z) if time is perfect", "A fourth range allows the clock error to be solved with the three coordinates"],
    modelAnswer: "A receiver's clock is not accurate enough, so each range contains the same unknown timing error. Position (x, y, z) and the clock error are four unknowns, so four satellite ranges are needed to solve them.",
    explanation: "Clock error is the fourth unknown.",
    hints: ["How many unknowns are there?"],
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 3,
    stem: "Describe how GPS could be used to record the boundary of a village's communal grazing area.",
    points: ["Walk the boundary with the receiver recording a track (or waypoints at corners)", "Wait for a good fix and check the number of satellites/accuracy reading", "Download the data and load it into a GIS as a polygon layer, then calculate its area"],
    modelAnswer: "Walk around the boundary with the receiver recording a track or waypoints at the corners, after checking that it has a good fix. Then download the data into a GIS as a polygon layer and calculate the area.",
    explanation: "Collection, quality check and transfer to GIS.",
    hints: ["Think of what you do in the field and afterwards."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Suggest two limitations of using a phone's GPS to map water points in a forested area, and a way to overcome each.",
    points: ["Canopy blocks or weakens signals so fewer satellites are used; record in clearings or note an offset", "Accuracy of several metres is not enough for small features; use a dual-frequency receiver or differential correction", "Poor satellite geometry/multipath from trees; average readings over a longer time or wait for better geometry", "Battery and coverage problems in remote areas; carry spare batteries and record on paper as backup"],
    modelAnswer: "Canopy blocks and weakens the signals, so fewer satellites are available and the position is poor; the team can take readings in clearings and record an offset to the water point. A phone's accuracy of several metres may be too poor for small features, which can be improved with a dual-frequency receiver or differential correction.",
    explanation: "Two limitations with a solution each.",
    hints: ["What does the canopy do to the signal?"],
  });

  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`Nyasha records the corners of a school field with a handheld receiver. The UTM coordinates (metres) are shown below. Some trees overhang the field (illustrative data).\n\n${tab(["Waypoint", "W1", "W2", "W3", "W4"], [["Easting (m)", ...wp.map((p) => p[0])], ["Northing (m)", ...wp.map((p) => p[1])]])}`,
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", stem: "Calculate the straight-line distance between W1 and W3, in metres.", value: 100, unit: "m", wrong: [140, 80], explanation: "Change in easting 80 m, in northing 60 m; √(80² + 60²) = √10 000 = 100 m." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the perimeter of the field, in metres.", value: 280, unit: "m", wrong: [140, 4800], explanation: "The sides are 80 m (W1 to W2), 60 m (W2 to W3), 80 m and 60 m: 280 m." }),
      P.num({ label: "(c)", marks: 2, type: "CALCULATION", stem: "Calculate the area of the field in hectares (1 ha = 10 000 m²), to two decimal places.", value: 0.48, dp: 2, unit: "ha", wrong: [4800, 48], explanation: "Area = 80 × 60 = 4 800 m² = 0.48 ha." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain two reasons why the recorded positions beneath the trees may be inaccurate.", points: ["Leaves and branches block or weaken signals, so fewer satellites are used", "Signals reflect off trunks and branches (multipath), lengthening the apparent range", "Satellites low in the sky may be the only ones visible, giving poor geometry (a third valid reason can earn the final mark)"], modelAnswer: "The canopy blocks and weakens the signals, so fewer satellites are available. Signals also bounce off trunks and branches before reaching the receiver (multipath), which lengthens the apparent range and shifts the position." }),
      P.manual({ label: "(e)", marks: 2, stem: "Suggest two ways to improve the accuracy of the field boundary.", points: ["Record the corners in clear places or use offsets from open ground", "Average several readings at each corner / use differential GPS or a dual-frequency receiver"], modelAnswer: "Record the corners where the sky is clear or use offsets measured from open ground, and average several readings at each corner or use differential correction." }),
      P.manual({ label: "(f)", marks: 1, stem: "State how the data would be used in a GIS.", points: ["Loaded as a polygon layer (for example from a GPX file) so that area and position can be analysed"], modelAnswer: "The waypoints would be loaded as a polygon layer, for example from a GPX file." }),
    ],
    explanation: "Distance, perimeter and area from coordinates, with sources of GPS error and improvements.",
    hints: ["Use Pythagoras with the changes in easting and northing."],
  });
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A GPS receiver gets a signal from a satellite that takes 0.0698 s to arrive. Take the speed of radio waves as 300 000 km/s.",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Why are four satellites used for a 3D fix?", options: [["To solve the clock error too", "Correct: x, y, z and time are four unknowns."], ["Because each satellite gives just one coordinate", "Each range involves all three coordinates."], ["Because three satellites are often all blocked", "The number is a mathematical requirement."], ["To measure the temperature of the air", "Temperature is not measured in positioning."]], answer: "A", explanation: "Four unknowns need four equations." }),
      P.num({ label: "(b)", marks: 2, type: "CALCULATION", stem: "Calculate the distance to the satellite, in km.", value: 0.0698 * C, unit: "km", wrong: [20.9, 2094], explanation: "300 000 × 0.0698 = 20 940 km." }),
      P.num({ label: "(c)", marks: 2, type: "CALCULATION", stem: "The receiver clock is 3 microseconds slow. State the range error, in metres.", value: 0.000003 * C * 1000, unit: "m", wrong: [9, 90], explanation: "300 000 km/s × 0.000003 s = 0.9 km = 900 m." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain how differential GPS reduces position errors.", points: ["A base station at a precisely known position compares its GPS position with the true one", "It calculates the error in each satellite signal (e.g. atmospheric delay)", "Corrections are sent to nearby receivers, which apply them to their ranges, giving sub-metre accuracy"], modelAnswer: "A base station at a precisely known position compares its GPS position with its true position and works out the errors in the signals, such as atmospheric delay. It sends corrections to nearby receivers, which apply them to their own ranges to give much better accuracy." }),
    ],
    explanation: "Range from travel time, the clock error and differential correction.",
    hints: ["Distance = speed × time."],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the usefulness of GPS for a conservation team recording the positions of illegal snares and animal sightings in a national park. [8]",
    points: [
      "Gives accurate locations quickly, anywhere and in all weathers, without a map",
      "Waypoints can be recorded with attributes (type, date, photographs) for each snare or sighting",
      "Data can be loaded into a GIS to map clusters and patrol routes",
      "Tracks show the areas patrolled, so effort can be measured and planned",
      "Accuracy is reduced beneath dense canopy or near cliffs by blocked signals and multipath",
      "Equipment depends on batteries and may fail in remote places",
      "Accuracy of a few metres is enough for animals and snares but not for fine boundary surveys without differential correction",
      "Judgement: very useful for field recording and analysis, provided limitations are understood and checks and backup records are kept",
    ],
    levels: geographyLevels(8),
    modelAnswer: "GPS gives a team a quick, reliable location anywhere in the park and in all weather, without needing a map. Each snare or sighting can be stored as a waypoint with attributes such as type, date and photographs, and tracks show the areas patrolled. Loaded into a GIS, the data show clusters of snares and help plan patrols. However, dense canopy and cliffs weaken signals and cause multipath, batteries may fail in remote areas, and an accuracy of a few metres is not enough for fine surveying without differential correction. Overall GPS is very useful for recording and analysing conservation data provided the limitations are understood and there are backup records.",
    wordLimit: { max: 300 },
    explanation: "Benefits, limitations and a judgement.",
    hints: ["Say what GPS records, what GIS does with it and what can go wrong."],
  });

  b.card("DEFINITION", "Trilateration?", "Finding a position from its distances (ranges) to several known points; GPS uses satellite ranges.");
  b.card("FORMULA", "GPS range?", "Range = speed of light × signal travel time (c ≈ 300 000 km/s).");
  b.card("FACT", "How many satellites for a 3D fix, and why?", "Four: x, y, z and the receiver clock error are four unknowns.");
  b.card("CONCEPT", "Sources of GPS error?", "Atmospheric delay, multipath, poor satellite geometry (DOP), canopy and buildings, clock and orbit errors.");
  b.card("DEFINITION", "Differential GPS?", "A base station at a known position computes signal errors and sends corrections to nearby receivers.");
  b.card("DEFINITION", "Waypoint and track?", "Waypoint: a single recorded position. Track: positions recorded automatically as the receiver moves.");
  b.card("CONCEPT", "What does DOP mean?", "Dilution of precision: poor accuracy when satellites are bunched in the sky.");
  b.card("FACT", "Typical GPS accuracy?", "A few metres for a handheld receiver; sub-metre with differential GPS; centimetres with RTK survey methods.");
  b.card("CONCEPT", "From GPS to GIS?", "Download waypoints and tracks (e.g. GPX), load as point, line or polygon layers, check datum and reproject if necessary.");
});
