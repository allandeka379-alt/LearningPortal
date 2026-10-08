// Slice G3a: maps.land-use-patterns (land use and its factors, settlement patterns/functions, drainage patterns,
// transport and relief, point/line/area data). Distance growth point -> mine: hypot(1.4, 0.1) = 1.40 km.
import { concept, P, geographyLevels } from "../lib.mjs";

const EXTRACT = [
  "**Map extract G** (fictional area), scale 1:50 000, grid squares 1 km.",
  "",
  "| N \\ E | 86 | 87 | 88 | 89 |",
  "|---|---|---|---|---|",
  "| 42 | Plantation forest in regular blocks; contours very close together | Sawmill at 873 425; plantation forest | Scattered homesteads with small fields | Scattered homesteads; footpaths |",
  "| 41 | Steep slopes with natural woodland | Main road follows the valley floor beside a river flowing east | Growth point at 884 416: shops, clinic, police station, secondary school, post office; road junction | Railway siding at 896 413; mine shaft and dump at 898 417 |",
  "| 40 | Grassland; dip tank at 864 403 | Irrigated fields with centre pivots; dam at 875 404; contours widely spaced | Irrigated fields; contours widely spaced | Mine dump; railway runs east–west |",
].join("\n");

const SERVICES = [
  "Table 1 lists the main features of three settlements on a (fictional) map.",
  "",
  "| Settlement | Features shown |",
  "|---|---|",
  "| K | 14 shops, 3 schools, hospital, district offices, police station, magistrates' court |",
  "| L | Mine shafts, mine dumps, compound housing, 2 shops, railway siding |",
  "| M | 2 lodges, campsite, curio market, viewpoint beside a large waterfall |",
].join("\n");

concept("geo.maps.land-use-patterns", { file: "maps/land-use-patterns", keyPrefix: "maps.land-use-patterns" }, (b) => {
  b.mcq({
    d: 2, skill: "ANALYSIS", secs: 60,
    stem: `${EXTRACT}\n\nWhat is the main function of the settlement at **884 416**?`,
    options: [
      ["Service centre", "Correct: shops, a clinic, police, a school and a post office serve the surrounding area."],
      ["Mining settlement", "The mine is in square 8941; the settlement itself has services, not shafts or dumps."],
      ["Tourist resort", "No hotels, camps or scenic attractions are shown there."],
      ["Fishing village", "Nothing suggests fishing; the services point to a service centre."],
    ],
    answer: "A",
    explanation: "Many services at a road junction show a **service centre** (a growth point) serving the farms and homesteads around it.",
  });
  b.mcq({
    d: 2, skill: "ANALYSIS",
    stem: `${EXTRACT}\n\nWhich map evidence best explains the irrigated fields in square **8740**?`,
    options: [
      ["Widely spaced contours and a nearby dam", "Correct: gentle slopes suit machines and pivots, and the dam supplies water."],
      ["Very close contours and plantation forest", "Close contours (steep land) are in square 8642, not 8740."],
      ["The railway siding and mine dump", "These are in column 89 and relate to mining, not irrigation."],
      ["Scattered homesteads and footpaths", "These are in row 42 and do not explain irrigation."],
    ],
    answer: "A",
    explanation: "Irrigated cultivation needs **gentle land** (widely spaced contours) and **water** (dam at 875 404). Both are shown in square 8740.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: `${EXTRACT}\n\nWhat settlement pattern is shown in squares **8842** and **8942**?`,
    options: [
      ["Dispersed", "Correct: scattered homesteads, each near its own fields."],
      ["Nucleated", "Nucleated settlement is grouped tightly, like the growth point in 8841."],
      ["Linear", "Linear settlement follows a road, river or railway; these homesteads are scattered."],
      ["Planned grid", "A grid layout has regular streets; scattered homesteads are not planned like that."],
    ],
    answer: "A",
    explanation: "Scattered homesteads with small fields form a **dispersed** pattern, typical of farming areas.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: `${EXTRACT}\n\nWhy does the main road in square **8741** follow the valley floor?`,
    options: [
      ["The valley floor gives a gentle gradient", "Correct: valley floors avoid the steep slopes shown by close contours."],
      ["The river needs the road to carry its water", "Rivers do not depend on roads; the reason is gradient."],
      ["Plantation forest blocks every other route", "Forest can be cleared; the reason routes follow valleys is gentle gradient."],
      ["The mine is located in the valley floor", "The mine is in square 8941, not on the valley floor of 8741."],
    ],
    answer: "A",
    explanation: "Roads and railways follow valleys because the land there is **gentle**, making construction cheaper and travel easier.",
  });
  b.mcq({
    d: 2, skill: "ANALYSIS",
    stem: `${EXTRACT}\n\nWhy is plantation forest the main land use in square **8642**?`,
    options: [
      ["The slopes are too steep for cultivation", "Correct: very close contours mean steep land, better suited to trees than crops."],
      ["The land is flat and has an irrigation dam", "Flat land and the dam are in 8740, where crops are grown."],
      ["The square lies next to the railway siding", "The siding is in 8941, far from 8642."],
      ["Many homesteads need firewood from it", "Plantation blocks are commercial forestry; the map evidence is the steep slope."],
    ],
    answer: "A",
    explanation: "Steep slopes (close contours) erode easily and cannot be machine-farmed, so they are used for **forestry**; the sawmill at 873 425 processes the timber.",
  });
  b.mcq({
    d: 2, skill: "ANALYSIS",
    stem: `${EXTRACT}\n\nWhat is the most likely reason for the railway siding at **896 413**?`,
    options: [
      ["To carry bulky ore from the mine", "Correct: the mine shaft and dump at 898 417 are beside it, and rail suits heavy, bulky loads."],
      ["To carry passengers to the lodges", "No lodges or tourist features are shown on the extract."],
      ["To bring water to the irrigated fields", "The fields get water from the dam at 875 404."],
      ["To carry timber from the sawmill only", "The sawmill is in 8742, about 2 km away; the siding is right next to the mine."],
    ],
    answer: "A",
    explanation: "Sidings beside mines load heavy, bulky minerals onto trains cheaply.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Main streams run parallel to each other and their short tributaries join them at nearly **right angles**. What drainage pattern is this?",
    options: [
      ["Trellis", "Correct: typical of alternating bands of hard and soft rock."],
      ["Dendritic", "Dendritic tributaries join at acute angles, like tree branches."],
      ["Radial", "Radial rivers flow outwards from a central high point."],
      ["Centripetal", "Centripetal rivers flow inwards to a central basin."],
    ],
    answer: "A",
    explanation: "Right-angled junctions between parallel streams form a **trellis** pattern.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Rivers flow outwards in all directions from a central dome-shaped hill. What drainage pattern is shown?",
    options: [
      ["Radial", "Correct: like the spokes of a wheel from a central high point."],
      ["Trellis", "Trellis has parallel streams with right-angled tributaries."],
      ["Dendritic", "Dendritic is tree-like with tributaries joining a main river."],
      ["Parallel", "Parallel streams run side by side down one uniform slope."],
    ],
    answer: "A",
    explanation: "Outward flow from a central high point (dome or cone) gives a **radial** pattern.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On a map or in a GIS, a borehole is an example of which type of data?",
    options: [
      ["Point data", "Correct: it has a position but no length or area."],
      ["Line data", "Line data has length, like a road or river."],
      ["Area (polygon) data", "Area data covers space, like a dam surface or a forest."],
      ["Isoline data", "Isolines join equal values; a borehole is a single location."],
    ],
    answer: "A",
    explanation: "Features with only a position (boreholes, schools, trigonometrical stations) are **point** data.",
  });
  b.mcq({
    d: 1, skill: "UNDERSTANDING",
    stem: "Houses and shops are built in a long line on both sides of a main road. What settlement pattern is this?",
    options: [
      ["Linear", "Correct: settlement stretches along a line feature such as a road."],
      ["Dispersed", "Dispersed homesteads are scattered across the land."],
      ["Nucleated", "Nucleated settlement is compact and grouped, not strung out."],
      ["Isolated", "An isolated settlement is a single farm or homestead."],
    ],
    answer: "A",
    explanation: "Settlement along a road, railway or river forms a **linear** pattern.",
  });
  b.short({
    d: 2, skill: "APPLICATION", secs: 45,
    stem: `${EXTRACT}\n\nGive the **four-figure** grid reference of the square containing the growth point.`,
    accepted: ["8841", "88 41"],
    wrong: ["4188", "8941"],
    explanation: "The growth point (884 416) lies east of easting 88 and north of northing 41: **8841**.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the tree-like drainage pattern that forms where the rock has similar resistance throughout.",
    accepted: ["dendritic", "dendritic pattern", "dendritic drainage"],
    wrong: ["trellis"],
    explanation: "A **dendritic** pattern looks like the branches of a tree.",
  });
  b.tf({
    d: 1, skill: "UNDERSTANDING",
    stem: "Scattered homesteads, each near its own fields, form a dispersed settlement pattern.",
    answer: true,
    feedbackTrue: "Correct: scattered homesteads are the typical dispersed pattern of farming areas.",
    feedbackFalse: "Not so: scattered homesteads are exactly what 'dispersed' means.",
    explanation: "**Dispersed** = scattered; nucleated = grouped; linear = along a line.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each blank.",
    template: "Bands of alternating hard and soft rock produce a {{blank:a}} drainage pattern. A volcanic cone produces a {{blank:b}} pattern. A uniform slope produces a {{blank:c}} pattern.",
    blanks: [
      { id: "a", accepted: ["trellis"], choices: ["trellis", "radial", "parallel"] },
      { id: "b", accepted: ["radial"], choices: ["radial", "trellis", "dendritic"] },
      { id: "c", accepted: ["parallel"], choices: ["parallel", "radial", "trellis"] },
    ],
    explanation: "Rock structure and slope control the drainage pattern: trellis (alternating rock bands), radial (central high point), parallel (uniform slope).",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each map feature to the type of data it is.",
    pairs: ["A school", "A railway", "A national park", "A power line", "A dam's water surface"],
    right: ["Point data", "Line data", "Area (polygon) data"],
    rightIndex: [0, 1, 2, 1, 2],
    explanation: "Point: position only (school). Line: length (railway, power line). Area: covers space (park, dam surface).",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 3,
    stem: `${EXTRACT}\n\nUsing map evidence, explain why a growth point has developed at **884 416**.`,
    hints: ["Look at the routes, the land around it and the people it serves."],
    points: [
      "It is at a road junction, so it is easy to reach from several directions.",
      "It is on gently sloping land in the valley (beside the main road), cheap to build on.",
      "It serves the surrounding dispersed homesteads, the irrigated farms and the mine workers nearby.",
    ],
    modelAnswer: "The growth point lies at a road junction on the main valley road, so people can reach it easily, and the valley land is gentle and easy to build on. It provides shops, health, education and police services for the scattered homesteads to the north, the irrigated farms to the south-west and the mine to the east.",
    explanation: "Accessibility, suitable land and a population to serve explain the location of a service centre.",
  });
  b.ext({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: `${EXTRACT}\n\nDescribe and explain the pattern of land use shown in Extract G.`,
    hints: ["Work round the extract: north-west, centre, south, east.", "Link each land use to map evidence (contours, water, routes)."],
    points: [
      "Plantation forest in the north-west (8642, 8742) with a sawmill at 873 425.",
      "Explained by steep slopes (very close contours) unsuitable for crops.",
      "Irrigated cultivation in the south (8740, 8840) with centre pivots.",
      "Explained by gentle slopes (widely spaced contours) and water from the dam at 875 404.",
      "Mining in the east (8941, 8940) with a shaft, dumps and a railway siding at 896 413, explained by the mineral deposit and rail for bulky ore.",
      "Settlement: dispersed homesteads in the north-east and a nucleated service centre at the road junction (884 416); grazing with a dip tank at 864 403 in the south-west.",
    ],
    levels: geographyLevels(6),
    modelAnswer: "In the north-west (8642, 8742) the land is used for plantation forestry, with a sawmill at 873 425; the contours there are very close, so slopes are too steep for crops. In the south (8740, 8840) there are irrigated fields with centre pivots on gentle land shown by widely spaced contours, watered from the dam at 875 404. In the east, mining takes place at 898 417, with dumps and a railway siding at 896 413 to move bulky ore. Settlement is dispersed in the north-east, where homesteads have small fields, and nucleated at the growth point at 884 416, at a road junction that makes it accessible. Grassland with a dip tank at 864 403 is used for grazing.",
    explanation: "Identify each land use with a grid reference, then explain it with evidence from the same map.",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: `${EXTRACT}\n\nUse the extract to answer the questions.`,
    hints: ["Grid squares are 1 km.", "Use Pythagoras for straight-line distances between grid references."],
    parts: [
      P.short({
        label: "(a)", stem: "Give the four-figure grid reference of the square containing the dam.",
        accepted: ["8740", "87 40"], wrong: ["4087"],
        explanation: "The dam (875 404) is east of easting 87 and north of northing 40: 8740.",
      }),
      P.num({
        label: "(b)", stem: "Calculate the straight-line distance from the growth point (884 416) to the mine shaft (898 417), in km.",
        value: 1.4, tol: 0.05, unit: "km", answer: "1.4", wrong: [14, 0.7],
        explanation: "ΔE = 1.4 km, ΔN = 0.1 km; √(1.4² + 0.1²) ≈ 1.40 km.",
      }),
      P.mcq({
        label: "(c)", stem: "Which type of data would the plantation forest be in a GIS?",
        options: [
          ["Area (polygon) data", "Correct: the forest covers a stretch of land."],
          ["Point data", "Point data has no area; the forest covers several square kilometres."],
          ["Line data", "Line data has length but no width, like a road."],
          ["Attribute data only", "Attributes describe features; the forest itself needs a shape (polygon)."],
        ],
        answer: "A",
        explanation: "Features that cover space are polygons.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Suggest three ways the mine may have influenced other land uses or features on the extract.",
        points: [
          "A railway siding (896 413) was built to transport the ore.",
          "Mine dumps (8941, 8940) take up land that cannot be farmed.",
          "Workers and their families create demand for the services at the growth point / roads link the mine to the growth point.",
        ],
        explanation: "Mines attract transport, take up land and create demand for services.",
      }),
    ],
    explanation: "Map interpretation combines grid references, distances, data types and explanation of links between features.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: SERVICES,
    hints: ["Decide what the main activity of each settlement is from its features."],
    parts: [
      P.mcq({
        label: "(a)", stem: "What is the main function of settlement K?",
        options: [
          ["Administrative and service centre", "Correct: district offices, a court, a hospital and many shops serve a wide area."],
          ["Mining and railway settlement", "No shafts, dumps or sidings are listed for K."],
          ["Tourist and holiday resort", "No lodges or attractions are listed for K."],
          ["Transport and junction town", "No junction, station or sidings are listed for K."],
        ],
        answer: "A",
        explanation: "Government offices and many services indicate an administrative and service function.",
      }),
      P.mcq({
        label: "(b)", stem: "What is the main function of settlement L?",
        options: [
          ["Mining", "Correct: shafts, dumps and compound housing for workers."],
          ["Administration", "Only two shops and no offices are listed."],
          ["Tourism", "There are no lodges or attractions."],
          ["Commercial farming", "No fields, irrigation or farm buildings are listed."],
        ],
        answer: "A",
        explanation: "Shafts and dumps identify a mining settlement.",
      }),
      P.mcq({
        label: "(c)", stem: "What is the main function of settlement M?",
        options: [
          ["Tourism", "Correct: lodges, a campsite, a curio market and a viewpoint at a waterfall."],
          ["Mining", "No shafts or dumps are listed."],
          ["Administration", "No offices or courts are listed."],
          ["Fishing", "No fishing camps or jetties are listed."],
        ],
        answer: "A",
        explanation: "Accommodation and attractions beside a scenic feature identify a tourist centre.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Suggest why settlement K is likely to be larger than settlements L and M.",
        points: [
          "It provides many services and administration for a large surrounding area, so it attracts more people and businesses.",
          "L and M depend on one activity (a mine or one attraction), which supports fewer people.",
        ],
        explanation: "Multi-function service centres usually grow larger than single-function settlements.",
      }),
    ],
    explanation: "Settlement function is read from the services and features shown on a map.",
  });

  b.card("DEFINITION", "Land use", "The purpose for which land is used: cultivation, grazing, forestry, mining, settlement, transport, recreation, conservation.");
  b.card("CONCEPT", "Explaining land use from a map", "Identify, locate (grid reference), then explain with map evidence: contours, water, routes, symbols.");
  b.card("VOCABULARY", "Settlement patterns", "Nucleated (grouped), dispersed (scattered homesteads), linear (along a road, river or railway).");
  b.card("CONCEPT", "Settlement function from symbols", "Many services → service/administrative centre; shafts and dumps → mining; sidings and junctions → transport; lodges → tourism.");
  b.card("VOCABULARY", "Dendritic and trellis", "Dendritic: tree-like, acute-angled junctions, uniform rock. Trellis: parallel streams, right-angled tributaries, alternating hard and soft rock.");
  b.card("VOCABULARY", "Radial and parallel drainage", "Radial: outward from a central dome or cone. Parallel: side by side down a uniform slope.");
  b.card("CONCEPT", "Routes and relief", "Routes follow valleys, cross ridges at cols, bridge rivers at narrow points and avoid steep or marshy land.");
  b.card("CONCEPT", "Point, line and area data", "Point: position only (borehole). Line: length (road, river). Area/polygon: covers space (forest, dam).");
});
