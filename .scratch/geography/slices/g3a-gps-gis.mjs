// Slice G3a: maps.gps-gis (GPS and navigation, GIS layers and attributes, Boolean AND/OR/NOT with Venn diagrams,
// overlay analysis with relational and conditional statements, benefits and limitations).
// Queries computed with code over PLOTS: d<=2 & s<10 & !flood -> A,E,F,H; + grazing -> A,H; s<5 | flood -> A,B,D,G;
// d>2 -> B,G. Venn: 70 + 45 - 30 = 85; 120 - 85 = 35; 70 - 30 = 40; 45 - 30 = 15.
import { concept, P, geographyLevels } from "../lib.mjs";

const PLOTS = [
  "Table 1 shows attributes of eight plots considered for a new borehole and cattle dip by a fictional rural district council.",
  "",
  "| Plot | Distance to road (km) | Slope (%) | In flood zone? | Land use |",
  "|---|---|---|---|---|",
  "| A | 0.5 | 4 | No | Grazing |",
  "| B | 3.0 | 2 | No | Grazing |",
  "| C | 1.2 | 12 | No | Woodland |",
  "| D | 0.8 | 3 | Yes | Cultivation |",
  "| E | 1.5 | 6 | No | Cultivation |",
  "| F | 0.3 | 9 | No | Settlement |",
  "| G | 2.5 | 5 | Yes | Grazing |",
  "| H | 1.9 | 7 | No | Grazing |",
].join("\n");

const FARMS = "A survey of **120** farms in a fictional ward found that **70** grow maize (M), **45** keep cattle (C) and **30** do both.";

concept("geo.maps.gps-gis", { file: "maps/gps-gis", keyPrefix: "maps.gps-gis" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **geographical information system (GIS)**?",
    options: [
      ["A computer system that stores and analyses data linked to locations", "Correct: GIS captures, stores, analyses and displays spatial data."],
      ["A network of satellites that gives a hand-held receiver its exact position", "That describes GPS, which often supplies data to a GIS."],
      ["A printed atlas of thematic maps", "An atlas is fixed on paper; a GIS can analyse and update layers."],
      ["A camera that takes vertical aerial photographs", "Aerial photographs can be a GIS layer, but the camera is not a GIS."],
    ],
    answer: "A",
    explanation: "A **GIS** is a computer system for capturing, storing, analysing and displaying data linked to places.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What is the **minimum** number of satellites a GPS receiver needs signals from to fix its position and correct its clock?",
    options: [
      ["Four", "Correct: three for the position and a fourth to correct the receiver's clock."],
      ["One", "One distance only places the receiver somewhere on a huge sphere."],
      ["Two", "Two distances still leave many possible positions."],
      ["Ten", "More satellites improve accuracy, but four is the minimum."],
    ],
    answer: "A",
    explanation: "Distances to three satellites fix a point; a **fourth** corrects the receiver's clock error.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In a Venn diagram, which Boolean operator selects only the **overlap** of two circles?",
    options: [
      ["AND", "Correct: AND is the intersection; both conditions must be true."],
      ["OR", "OR selects everything in either circle (the union)."],
      ["NOT", "NOT selects what lies outside a circle (the complement)."],
      ["IF", "IF begins a conditional statement; it is not a Boolean set operator."],
    ],
    answer: "A",
    explanation: "**AND** = intersection (the overlap); OR = union; NOT = complement.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A planner changes a GIS search from *near a road AND near a river* to *near a road OR near a river*. What happens to the number of places selected?",
    options: [
      ["It increases or stays the same", "Correct: OR accepts places meeting either condition, so the selection widens."],
      ["It always falls to zero", "OR never removes places that met both conditions."],
      ["It decreases", "AND narrows a search; switching to OR widens it."],
      ["It stays exactly the same in every case", "It stays the same only if every place near a road is also near a river and vice versa."],
    ],
    answer: "A",
    explanation: "**OR** (union) includes everything AND included plus places meeting only one condition, so the count rises or, at least, stays the same.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A GIS query reads *suitable land NOT flood zone*. What does it select?",
    options: [
      ["Suitable land that lies outside the flood zone", "Correct: NOT removes the flood zone from the suitable land."],
      ["Only land that is in the flood zone", "That would be suitable land AND flood zone."],
      ["Suitable land plus the whole flood zone", "That would be suitable land OR flood zone."],
      ["Land that is neither suitable nor flooded", "That would be NOT (suitable OR flood zone)."],
    ],
    answer: "A",
    explanation: "**A NOT B** keeps the part of A that does not overlap B.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", secs: 75,
    stem: `${FARMS}\n\nHow many farms grow maize **OR** keep cattle (or both)?`,
    hints: ["Add the two groups, then subtract the farms counted twice."],
    options: [
      ["85", "Correct: 70 + 45 − 30 = 85."],
      ["115", "This adds 70 and 45 and counts the 30 'both' farms twice."],
      ["30", "30 is M AND C (the overlap), not M OR C."],
      ["35", "35 is the number of farms doing neither."],
    ],
    answer: "A",
    explanation: "M OR C = 70 + 45 − 30 = **85**: the overlap is counted once.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In a GIS, the depth of each borehole is stored in a table linked to the borehole points. What is this depth called?",
    options: [
      ["An attribute", "Correct: attributes are the information stored about each feature."],
      ["A layer", "The boreholes together form a layer; the depth is information about each one."],
      ["A waypoint", "A waypoint is a saved position on a GPS receiver."],
      ["A polygon", "A polygon is an area feature, not a stored value."],
    ],
    answer: "A",
    explanation: "Each feature has **attributes** (depth, yield, date drilled) held in an attribute table.",
  });
  b.mcq({
    d: 1, skill: "UNDERSTANDING",
    stem: "Which statement best describes a **layer** in a GIS?",
    options: [
      ["One theme of data, such as roads, to combine with others", "Correct: layers stack like transparent sheets over a base map."],
      ["The outer frame, title and key of a printed paper map", "Frames and keys belong to map layout, not data layers."],
      ["Only the height of the land, shown by contours", "Height can be one layer, but a layer can hold any theme."],
      ["The satellite in orbit that supplies a GPS signal", "Satellites supply positions; layers hold mapped data."],
    ],
    answer: "A",
    explanation: "A **layer** holds one theme (roads, rivers, land use) and can be switched on, off or overlaid.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", secs: 120,
    stem: `${PLOTS}\n\nWhich plots meet the rule *IF distance to road ≤ 2 km AND slope < 10% AND NOT in flood zone THEN suitable*?`,
    hints: ["Test every plot against all three conditions; one failure makes it unsuitable.", "Watch the plots with slopes close to 10% and distances close to 2 km."],
    options: [
      ["A, E, F and H", "Correct: each is within 2 km, has a slope under 10% and is outside the flood zone."],
      ["A, B, E and H", "B is 3.0 km from the road, beyond the 2 km limit."],
      ["A, D, E and F", "D lies in the flood zone, so NOT flood zone fails."],
      ["A, C, E and F", "C has a 12% slope, which is not less than 10%."],
    ],
    answer: "A",
    explanation: "B fails distance; C fails slope; D fails flood; G fails distance and flood. **A, E, F and H** pass all three tests.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of these is a **conditional** statement used in overlay analysis?",
    options: [
      ["IF slope < 10% THEN suitable", "Correct: IF ... THEN makes an outcome depend on a condition."],
      ["Slope < 10% for every site", "This is a relational statement (a comparison) without an outcome."],
      ["Roads layer OR rivers layer", "This is a Boolean union, not an IF ... THEN statement."],
      ["The slope layer is a raster layer", "This is a description of the data, not a statement used to analyse it."],
    ],
    answer: "A",
    explanation: "Relational statements compare (<, ≤, =); **conditional** statements apply IF ... THEN to them.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How does a GPS receiver work out its distance from each satellite?",
    options: [
      ["From the time each signal takes to arrive", "Correct: travel time × the speed of the radio signal gives the distance."],
      ["From the brightness of the satellite in the sky", "Satellites are not located by their brightness."],
      ["From the bearing measured with a compass", "A compass gives direction, not distance to a satellite."],
      ["From contour lines stored in the receiver", "Contours describe the ground, not satellite distances."],
    ],
    answer: "A",
    explanation: "Each satellite broadcasts the exact time; the receiver measures the **delay**, which gives distance because the signal speed is known.",
  });
  b.mcq({
    d: 2, skill: "EVALUATION",
    stem: "Where is a hand-held GPS receiver most likely to give a poor or no position?",
    options: [
      ["Under thick forest in a deep, narrow valley", "Correct: trees and valley sides block signals from much of the sky."],
      ["On an open plain under a clear, cloudless sky", "Open sky gives the best reception."],
      ["On a hilltop on a clear day", "Hilltops have a wide view of the sky."],
      ["Beside a lake in open grassland", "Open ground beside a lake has a clear view of the sky."],
    ],
    answer: "A",
    explanation: "GPS needs a clear view of several satellites; **dense cover and deep valleys** (or tall buildings) block signals.",
  });
  b.num({
    d: 3, skill: "ANALYSIS", secs: 120,
    stem: `${PLOTS}\n\nThe council adds a fourth condition: *land use = Grazing*. How many plots now meet all four conditions (distance ≤ 2 km, slope < 10%, NOT in flood zone, land use = Grazing)?`,
    value: 2,
    wrong: [4, 3],
    hints: ["Start from the plots that met the first three conditions, then keep only grazing land."],
    explanation: "The first three conditions leave A, E, F and H. Of these, A and H are grazing land: **2** plots.",
  });
  b.num({
    d: 3, skill: "APPLICATION", secs: 75,
    stem: `${FARMS}\n\nHow many farms neither grow maize nor keep cattle?`,
    value: 35,
    wrong: [5, 50],
    hints: ["First find M OR C, then subtract it from the total."],
    explanation: "M OR C = 70 + 45 − 30 = 85. NOT (M OR C) = 120 − 85 = **35** farms.",
  });
  b.num({
    d: 2, skill: "APPLICATION", secs: 60,
    stem: `${FARMS}\n\nHow many farms grow maize but do NOT keep cattle (M NOT C)?`,
    value: 40,
    wrong: [70, 25],
    explanation: "M NOT C = 70 − 30 = **40** farms.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the Boolean operator that represents the **union** of two sets.",
    accepted: ["OR", "or", "the OR operator"],
    wrong: ["AND"],
    explanation: "Union = **OR**; intersection = AND; complement = NOT.",
  });
  b.tf({
    d: 1, skill: "UNDERSTANDING",
    stem: "Using OR instead of AND between two conditions narrows a GIS search.",
    answer: false,
    feedbackFalse: "Correct: OR widens a search; AND narrows it.",
    feedbackTrue: "Not so: OR accepts places meeting either condition, so it widens the search.",
    explanation: "AND = all conditions (fewer results); OR = any condition (more results).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each blank.",
    template: "A saved position on a GPS receiver is a {{blank:a}}. A planned series of these to follow is a {{blank:b}}. The record of the path actually walked is a {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["waypoint"], choices: ["waypoint", "route", "track"] },
      { id: "b", accepted: ["route"], choices: ["route", "waypoint", "track"] },
      { id: "c", accepted: ["track"], choices: ["track", "route", "waypoint"] },
    ],
    explanation: "Waypoint = saved position; route = planned series of waypoints; track = record of where you have been.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Two overlapping circles show set A and set B. Match each Boolean expression to the region of the Venn diagram it selects.",
    pairs: [
      ["A AND B", "Only the overlap of the two circles"],
      ["A OR B", "Everything inside either circle"],
      ["A NOT B", "The part of circle A outside circle B"],
      ["NOT (A OR B)", "Everything outside both circles"],
    ],
    explanation: "AND = intersection, OR = union, NOT = complement.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how a GPS receiver works out its position.",
    hints: ["Think about time, distance and how many satellites."],
    points: [
      "Satellites broadcast signals carrying their position and the exact time.",
      "The receiver measures how long each signal takes to arrive and converts this to a distance.",
      "Using distances from at least four satellites it finds the one point where they meet (trilateration), the fourth correcting its clock.",
    ],
    modelAnswer: "Each satellite sends out its position and the exact time. The receiver times how long each signal takes to arrive and, knowing the signal speed, works out its distance from that satellite. With distances from at least four satellites it finds the single point that fits them all, using the fourth to correct its own clock.",
    explanation: "Time delay → distance → trilateration from at least four satellites.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "A rural district council plans to use GIS to choose the site of a new secondary school. Evaluate the usefulness of GIS for this decision.",
    hints: ["Name the layers and the Boolean or conditional rules it could use.", "Weigh data quality, cost and the need for local knowledge."],
    points: [
      "GIS can overlay layers such as roads, homesteads/population, existing schools, slope, flood zones and water supply.",
      "Rules such as IF within 5 km of most homesteads AND near a road AND NOT in a flood zone THEN suitable quickly identify candidate sites.",
      "It is fast, can test different criteria and produces clear maps for the community and decision-makers.",
      "Limitation: results depend on accurate, up-to-date data; missing homesteads or roads give wrong answers.",
      "Limitation: needs computers, software, power and trained staff; cannot capture land ownership disputes or community preferences.",
      "Judgement: very useful for narrowing the choice, but a field visit and consultation should make the final decision.",
    ],
    levels: geographyLevels(6),
    modelAnswer: "GIS lets the council overlay layers of homesteads, roads, existing schools, slope, flood zones and water points, and apply a rule such as: IF within walking distance of many homesteads AND close to a road AND NOT in a flood zone AND slope gentle THEN suitable. This narrows a whole district to a few candidate sites in minutes, criteria can be changed and re-run, and maps help explain the choice. However, the answer is only as good as the data: missing homesteads or out-of-date roads would mislead it, and the council needs computers, software, power and trained staff. GIS also cannot measure land disputes or what the community wants. It is therefore very useful for shortlisting sites, but the final decision needs field checks and consultation.",
    explanation: "A strong answer shows how layers and rules are used, weighs data and cost limitations, and reaches a judgement.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: PLOTS,
    hints: ["Test each plot against each condition; a single failure excludes it."],
    parts: [
      P.num({
        label: "(a)", stem: "How many plots meet the rule: IF distance to road ≤ 2 km AND slope < 10% AND NOT in flood zone THEN suitable?",
        value: 4, wrong: [5, 3],
        explanation: "A, E, F and H pass all three tests: 4 plots.",
      }),
      P.mcq({
        label: "(b)", stem: "Which plot fails **only** the flood-zone condition?",
        options: [
          ["D", "Correct: D is 0.8 km from the road with a 3% slope, but it is in the flood zone."],
          ["G", "G also fails the distance condition (2.5 km)."],
          ["C", "C is outside the flood zone; it fails the slope condition."],
          ["B", "B is outside the flood zone; it fails the distance condition."],
        ],
        answer: "A",
        explanation: "Only D passes distance and slope but is in the flood zone.",
      }),
      P.mcq({
        label: "(c)", stem: "Which query selects exactly plots B and G?",
        options: [
          ["NOT (distance to road ≤ 2 km)", "Correct: only B (3.0 km) and G (2.5 km) are more than 2 km from a road."],
          ["Slope < 5% OR in flood zone", "This selects A, B, D and G."],
          ["Land use = Grazing", "This selects A, B, G and H."],
          ["In flood zone AND land use = Grazing", "This selects only G."],
        ],
        answer: "A",
        explanation: "B and G are the only plots further than 2 km from a road.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Suggest why the council should still visit the suitable plots before deciding.",
        points: [
          "The GIS data may be inaccurate or out of date (e.g. new homesteads, changed land use, a road washed away).",
          "Factors not in the layers, such as land ownership, water quality or community views, must be checked on the ground.",
        ],
        explanation: "GIS results need ground checks and local knowledge.",
      }),
    ],
    explanation: "Overlay analysis applies relational and conditional rules to attribute data to shortlist sites.",
  });
  b.struct({
    d: 2, skill: "APPLICATION",
    stem: FARMS,
    hints: ["Draw two overlapping circles: put 30 in the overlap first."],
    parts: [
      P.num({
        label: "(a)", stem: "How many farms keep cattle but do not grow maize (C NOT M)?",
        value: 15, wrong: [45],
        explanation: "45 − 30 = 15.",
      }),
      P.num({
        label: "(b)", stem: "How many farms are selected by M AND C?",
        value: 30, wrong: [115],
        explanation: "The overlap: 30 farms.",
      }),
      P.mcq({
        label: "(c)", stem: "An officer wants every farm that might need a cattle dip or maize seed. Which operator should the query use between M and C?",
        options: [
          ["OR", "Correct: farms with either activity (or both) are needed."],
          ["AND", "AND would select only the 30 farms doing both."],
          ["NOT", "NOT would exclude one group."],
          ["IF", "IF starts a conditional statement; the set operator needed is OR."],
        ],
        answer: "A",
        explanation: "Either condition → union → OR.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Describe how the four regions of the Venn diagram (M only, C only, both, neither) add up to the total of 120 farms.",
        points: [
          "States the four values: M only 40, C only 15, both 30, neither 35.",
          "Shows they sum to 120 (40 + 15 + 30 + 35 = 120).",
        ],
        explanation: "Every farm falls in exactly one region.",
      }),
    ],
    explanation: "Venn diagrams make Boolean counts clear: fill in the overlap first.",
  });

  b.card("DEFINITION", "GPS", "A satellite navigation system: a receiver times signals from at least four satellites to fix its latitude, longitude, height and the time.");
  b.card("DEFINITION", "GIS", "A computer system that captures, stores, analyses and displays data linked to locations.");
  b.card("VOCABULARY", "Layer and attribute", "Layer: one theme of data (roads, rivers). Attribute: information about each feature, held in an attribute table.");
  b.card("CONCEPT", "Boolean operators", "AND = intersection (narrows); OR = union (widens); NOT = complement (excludes).");
  b.card("CONCEPT", "Counting A OR B", "A OR B = A + B − (A AND B): count the overlap once.");
  b.card("VOCABULARY", "Relational vs conditional statement", "Relational: a comparison (slope < 10%). Conditional: IF ... THEN (IF slope < 10% THEN suitable).");
  b.card("CONCEPT", "Overlay analysis", "Combine layers and test every site against all conditions to find places that satisfy them together.");
  b.card("CONCEPT", "Limitations of GIS", "Cost of equipment and training, need for power, inaccurate or old data ('garbage in, garbage out'), privacy, still needs local knowledge.");
});
