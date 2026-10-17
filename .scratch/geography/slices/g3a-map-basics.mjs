// Slice G3a: maps.map-basics (components, types of map, conventional symbols, sketch maps).
import { concept, P, geographyLevels } from "../lib.mjs";

const EXTRACT = [
  "**Map extract A** (fictional area), scale 1:50 000, grid squares 1 km, contour interval 20 m.",
  "",
  "| N \\ E | 61 | 62 | 63 |",
  "|---|---|---|---|",
  "| 45 | Green tree symbols across the square; brown contour lines 1 420 m and 1 440 m | Black square marked Sch at 624 457; black square marked Cl at 627 452 | Blue line with arrow flowing south-east; small blue circle marked BH at 638 456 |",
  "| 44 | Red line running W-E (main road); black cross symbol marked Ch at 616 443 | Small black squares clustered along the red road | Blue area marked Dam at 634 446; dashed black line (footpath) to the dam |",
].join("\n");

concept("geo.maps.map-basics", { file: "maps/map-basics", keyPrefix: "maps.map-basics" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which component of a map explains what each symbol and colour stands for?",
    options: [
      ["The key", "Correct: the key (legend) explains every symbol, colour and line style used on the map."],
      ["The scale", "The scale relates map distance to ground distance; it does not explain symbols."],
      ["The frame", "The frame is the border that encloses the map."],
      ["The title", "The title says what the map shows and where, not what each symbol means."],
    ],
    answer: "A",
    explanation: "The **key** (or legend) is the panel that explains the meaning of every symbol, colour and line used on the map.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On most topographical maps, what is shown in **brown**?",
    options: [
      ["Contour lines and their heights", "Correct: brown is the conventional colour for relief, so contours are printed in brown."],
      ["Rivers and dams", "Water features are conventionally blue."],
      ["Forests and plantations of trees", "Vegetation is conventionally green."],
      ["Buildings and railways", "Most buildings and railways are printed in black."],
    ],
    answer: "A",
    explanation: "By convention **blue** = water, **brown** = relief (contours), **green** = vegetation and **black** = most human features. Always confirm with the key.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which map would show a **small area in the greatest detail**?",
    options: [
      ["A map at 1:25 000", "Correct: 1:25 000 is the largest scale here, so it covers the smallest area in the most detail."],
      ["A map at 1:50 000", "1:50 000 is a smaller scale than 1:25 000, so it shows less detail."],
      ["A map at 1:250 000", "1:250 000 is a small scale that covers a much larger area in less detail."],
      ["A map at 1:1 000 000", "1:1 000 000 is an atlas (small) scale: a very large area with little detail."],
    ],
    answer: "A",
    explanation: "The smaller the number after 1:, the **larger** the scale and the more detail shown. 1 cm on a 1:25 000 map is 250 m on the ground; on a 1:1 000 000 map it is 10 km.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A road is shown on a topographical map by a line. What kind of map symbol is this?",
    options: [
      ["A line symbol", "Correct: features that run across the map, such as roads, rivers and power lines, are line symbols."],
      ["A point symbol", "Point symbols mark features at one spot, such as a school or a borehole."],
      ["An area symbol", "Area symbols are shading or patterns that cover ground, such as forest or a built-up area."],
      ["A spot height", "A spot height is a point symbol giving the height of the land at one place."],
    ],
    answer: "A",
    explanation: "Symbols are **point** (one place), **line** (features with length) or **area** (features covering ground). A road is a line symbol.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which type of map would best show the boundaries of the provinces of Zimbabwe and their capitals?",
    options: [
      ["A political map", "Correct: political maps show countries, provinces, boundaries and administrative centres."],
      ["A relief map", "A relief (physical) map shows the height of the land, not administrative boundaries."],
      ["A topographical map", "A topographical sheet covers a small area in detail; it is not used to show a whole country's provinces."],
      ["A climate map", "A climate map shows temperature, rainfall or climate zones."],
    ],
    answer: "A",
    explanation: "**Political maps** show human-made divisions: international and provincial boundaries and capitals.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A pupil's sketch map of the route from home to school has a title, a key and a frame. Which addition would let a stranger **turn the map to match the ground**?",
    options: [
      ["A north arrow", "Correct: a north point shows direction, so the map can be oriented to match the land."],
      ["A source and date", "These tell the reader who drew the map and when, not which way it faces."],
      ["Grid line numbers", "Grid lines help to give references, but without a north point the map still cannot be oriented."],
      ["A longer title", "A title describes the map's content; it does not give direction."],
    ],
    answer: "A",
    explanation: "Orienting a map means turning it so that north on the map faces north on the ground; that requires a **north point**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is it important for a map to give its **source and date**?",
    options: [
      ["So the reader can judge how current it is", "Correct: features such as roads and settlements change, so the date shows whether the map is current."],
      ["So the reader can measure distances between places on it", "Distances are measured with the scale, not the date."],
      ["So the reader can find north on it", "Direction comes from the north point."],
      ["So the reader can work out the heights of hills on it", "Heights come from contours and spot heights."],
    ],
    answer: "A",
    explanation: "A map is a record at one time. A map surveyed long ago may not show a new road or a growing settlement, so the **source and date** help the reader judge its reliability.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", secs: 75,
    stem: `${EXTRACT}\n\nWhich feature is located at grid reference **627 452**?`,
    options: [
      ["A clinic", "Correct: square 6245 contains a black square marked Cl at 627 452, a clinic."],
      ["A school", "The school (Sch) is at 624 457, in the same square but further north-west."],
      ["A church", "The church (Ch) is at 616 443, in square 6144."],
      ["A borehole", "The borehole (BH) is at 638 456, in square 6345."],
    ],
    answer: "A",
    hints: ["Find easting 62 and northing 45: the square to the right of line 62 and above line 45.", "Read the abbreviations in that square: Sch and Cl."],
    explanation: "627 452 is 7 tenths east of easting 62 and 2 tenths north of northing 45, in square 6245. The symbol there is marked **Cl**, the usual abbreviation for a clinic.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", secs: 75,
    stem: `${EXTRACT}\n\nWhich statement is best supported by the evidence in the extract?`,
    options: [
      ["The settlement in square 6244 provides some services to the surrounding area.", "Correct: a school, a clinic and a church are close to the settlement, which is evidence of a service function."],
      ["The settlement in square 6244 is mainly a mining town.", "No mine, dump or shaft symbol appears in the extract."],
      ["The area around the dam in square 6344 is used for a large forest plantation.", "The forest symbols are in square 6145, not around the dam in 6344."],
      ["The river in square 6345 flows towards the north-west.", "The arrow on the river shows it flows towards the south-east."],
    ],
    answer: "A",
    hints: ["Look for symbols of buildings that serve people: schools, clinics, churches.", "Check each option against the squares named in it."],
    explanation: "Evidence of function must come from symbols on the map. A **school, a clinic and a church** near the clustered houses show that the settlement provides education, health and religious services.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A sketch map must be drawn exactly to scale.",
    answer: false,
    explanation: "False. A sketch map is drawn freehand and only approximately to scale. It still needs a title, key and north arrow, and often an approximate scale such as *about 1 cm to 200 m*.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each map component with its purpose.",
    pairs: [
      ["Scale", "Relates distances on the map to distances on the ground"],
      ["North point", "Shows direction so the map can be oriented"],
      ["Grid lines", "Allow the position of features to be given by references"],
      ["Title", "States what the map shows and where"],
    ],
    explanation: "Each component has a job: **scale** for distance, **north point** for direction, **grid lines** for location and **title** for subject and place.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence about map colours.",
    template: "On most topographical maps, rivers and dams are shown in {{blank:a}} and forests in {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["blue"], choices: ["blue", "brown", "green", "black"] },
      { id: "b", accepted: ["green"], choices: ["blue", "brown", "green", "black"] },
    ],
    explanation: "Water features are **blue** and vegetation is **green**; brown is used for relief and black for most human features.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the other name for the **key** of a map (one word).",
    accepted: ["legend"],
    wrong: ["scale", "title"],
    explanation: "The key is also called the **legend**.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe **three** differences between a topographical map and a sketch map.",
    points: [
      "States that a topographical map is drawn accurately to a stated scale while a sketch map is only roughly to scale.",
      "States that a topographical map shows many features (relief, drainage, vegetation, human features) while a sketch map shows only the features needed for its purpose.",
      "States that a topographical map is surveyed/printed with conventional symbols and grid lines while a sketch map is drawn freehand with simple symbols (often without a grid).",
    ],
    modelAnswer: "A topographical map is drawn accurately to scale, but a sketch map is only roughly to scale. A topographical map shows many kinds of feature, while a sketch map shows only those needed for one purpose. A topographical map is surveyed and printed with standard symbols and a grid; a sketch map is drawn freehand.",
    explanation: "Topographical maps are accurate, detailed, surveyed and gridded; sketch maps are freehand, simplified and drawn for one purpose.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A Form 2 group must draw a sketch map to guide visitors from the bus stop to their school. Describe **four** things they should do so that the map is useful.",
    hints: ["Think of the components of a good map.", "Think about which features to leave out."],
    points: [
      "Gives the map a title stating its purpose, e.g. *Route from the bus stop to the school*.",
      "Adds a north arrow (and a frame).",
      "Draws the route clearly and shows only useful landmarks, e.g. junctions, a bridge, a shop, a church.",
      "Uses simple symbols explained in a key (and an approximate scale).",
    ],
    modelAnswer: "Give it a clear title. Add a north arrow and a frame. Draw the route from the bus stop first and add only landmarks a stranger would notice, such as the bridge, the shop and the road junction. Use simple symbols, explain them in a key and add an approximate scale.",
    explanation: "A sketch map is useful when it is clear, oriented, focused on its purpose and explained by a key.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "A district council wants a map to plan where to drill new boreholes in its rural wards. Discuss whether a **topographical map** at 1:50 000 is more useful for this task than a **small-scale political map** of Zimbabwe.",
    hints: ["What detail does each map show?", "Which features matter for siting boreholes: rivers, settlements, relief?"],
    points: [
      ["Explains that the 1:50 000 map shows rivers, dams, existing boreholes and wells, so gaps in water supply can be identified.", 2],
      ["Explains that it shows settlements, schools and clinics, so boreholes can be placed near the people who need them.", 1],
      ["Explains that contours/relief help to judge access for drilling rigs and the likely flow of groundwater towards valleys.", 1],
      ["Explains that a political map is small scale and shows only boundaries and main centres, so it cannot show individual villages or water points.", 1],
      ["Reaches a judgement (e.g. the topographical map is far more useful, though the political map helps to see ward and district boundaries; the topographical map may be out of date).", 1],
    ],
    levels: geographyLevels(6),
    wordLimit: { max: 250 },
    modelAnswer: "The 1:50 000 topographical map is far more useful. It is large scale, so it shows rivers, dams and existing boreholes, letting planners see which villages are far from water. It also shows the settlements, schools and clinics that need water, and its contours show valleys where groundwater may collect and slopes that rigs must climb. A small-scale political map shows only provincial and district boundaries and main towns, so individual wards and water points do not appear. It might help to confirm which ward is the council's responsibility, but it cannot be used to choose sites. The planners should, however, check the date of the topographical map, because new settlements and boreholes may have appeared since it was surveyed.",
    explanation: "A large-scale map shows the detail needed for local planning; small-scale maps give the regional picture only.",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: `${EXTRACT}\n\nAnswer the questions about the extract.`,
    hints: ["Each square is named by the easting to its left and the northing below it.", "Use the colours: blue water, green vegetation, brown relief."],
    parts: [
      P.mcq({
        label: "(a)", stem: "What is shown by the brown lines in square 6145?",
        options: [
          ["Contour lines", "Correct: brown lines with heights (1 420 m, 1 440 m) are contours."],
          ["Footpaths", "The footpath is a dashed black line in square 6344."],
          ["Rivers", "Rivers are blue lines."],
          ["Boundaries", "Boundaries are normally black broken lines and have no heights."],
        ],
        answer: "A",
        explanation: "Brown lines labelled with heights are contours, joining places of equal height.",
      }),
      P.short({
        label: "(b)", stem: "Name the natural vegetation shown in square 6145.",
        accepted: ["forest", "woodland", "trees", "forest or woodland", "woodland or forest", "natural forest", "natural woodland"],
        wrong: ["grassland"],
        explanation: "Green tree symbols show forest or woodland.",
      }),
      P.short({
        label: "(c)", stem: "Name the water feature at 634 446.",
        accepted: ["dam", "a dam", "reservoir", "a reservoir"],
        wrong: ["borehole"],
        explanation: "The blue area marked Dam at 634 446 is a dam (reservoir).",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Using evidence from the extract only, describe how the people living in square 6244 obtain water, education and health care.",
        points: [
          "Water: from the dam at 634 446 (reached by the footpath) and/or the borehole at 638 456.",
          "Education: the school at 624 457.",
          "Health care: the clinic at 627 452.",
        ],
        explanation: "Each service must be linked to a symbol on the map and, ideally, its grid reference.",
      }),
    ],
    explanation: "Map reading starts with the key: colours and abbreviations identify features, and evidence for an answer must be quoted from the extract.",
  });
  b.struct({
    d: 3, skill: "UNDERSTANDING",
    stem: "A Form 1 learner, Chipo, has drawn a map of her village. It has a frame, a key and a title, *My village*. It shows huts, a borehole, a store and a river. It has no north arrow and no scale.\n\n![Chipo's freehand sketch map titled My village, inside a frame with a key, showing huts, a borehole, a store and a river; it has no north arrow and no scale.](media:diagrams/chipo-village-sketch-map.png \"Figure: Chipo's sketch map of her village (it has no north arrow and no scale)\")",
    hints: ["Which components of a good map are missing?", "How would a stranger know which way to hold it?"],
    parts: [
      P.mcq({
        label: "(a)", stem: "What kind of map has Chipo drawn?",
        options: [
          ["A sketch map", "Correct: a freehand map of a local area drawn for a purpose is a sketch map."],
          ["A topographical map", "Topographical maps are surveyed and printed accurately to scale."],
          ["A choropleth map", "A choropleth map shades areas according to a statistic."],
          ["A political map", "A political map shows boundaries and capitals."],
        ],
        answer: "A",
        explanation: "A freehand map of the local area drawn without accurate measurement is a sketch map.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Name **two** components of a good map that are missing from Chipo's map.",
        points: ["North arrow (north point).", "Scale (an approximate scale such as 1 cm to 100 m)."],
        explanation: "Her map has a title, frame and key but no north point or scale.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why each of the missing components matters to someone using the map.",
        points: [
          "Without a north arrow the user cannot orient the map or give directions from it.",
          "Without a scale the user cannot estimate how far apart features are or how long a walk will take.",
        ],
        explanation: "Direction and distance are two of the main things a reader takes from a map.",
      }),
      P.tf({
        label: "(d)", stem: "True or false: the borehole on Chipo's map is a point symbol.",
        answer: true,
        explanation: "True. A borehole is at one place, so it is shown by a point symbol.",
      }),
    ],
    explanation: "Sketch maps still need the basic components of a good map: title, frame, key, north point and approximate scale.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which feature would most likely be shown on a topographical map by an **area symbol**?",
    options: [
      ["A forest plantation", "Correct: a plantation covers ground, so it is shown by area shading or a pattern."],
      ["A railway", "A railway has length but little width on the map: a line symbol."],
      ["A borehole", "A borehole is at one spot: a point symbol."],
      ["A trigonometrical station", "A trig station is a single surveyed point: a point symbol."],
    ],
    answer: "A",
    explanation: "Area symbols (shading, tints or repeated patterns) cover features with extent, such as forests, cultivation, swamps and built-up areas.",
  });

  b.card("DEFINITION", "Topographical map", "A detailed, large-scale map of a small area showing natural features (relief, rivers, vegetation) and human features (settlements, roads, railways).");
  b.card("CONCEPT", "Seven components of a good map", "Title, frame, key (legend), scale, north point, grid lines, source and date.");
  b.card("FACT", "Conventional colours on topographical maps", "Blue = water; brown = relief (contours); green = vegetation; black = most human features. Check the key.");
  b.card("CONCEPT", "Large-scale vs small-scale map", "Large scale (e.g. 1:25 000): small area, much detail. Small scale (e.g. 1:1 000 000): large area, little detail.");
  b.card("CONCEPT", "Three kinds of map symbol", "Point (school, borehole), line (road, river, contour) and area (forest, swamp, built-up area).");
  b.card("DEFINITION", "Sketch map", "A freehand map, only roughly to scale, showing just the features needed for one purpose. Still needs a title, key and north arrow.");
  b.card("VOCABULARY", "Key (legend)", "The panel that explains every symbol, colour and line style on a map.");
  b.card("CONCEPT", "Types of map by purpose", "Topographical, political (boundaries), physical/relief (height), economic (activities), thematic (one statistic or topic).");
});
