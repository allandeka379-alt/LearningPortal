// Slice G3a: maps.location-coordinates (grid references, latitude and longitude, UTM in outline, time from longitude).
import { concept, P, geographyLevels } from "../lib.mjs";

const EXTRACT = [
  "**Map extract B** (fictional area), scale 1:50 000, grid squares 1 km.",
  "",
  "| N \\ E | 41 | 42 | 43 | 44 |",
  "|---|---|---|---|---|",
  "| 59 | Trigonometrical station at 412 596 | Store at 427 593 | Mission at 438 591 | Bridge at 445 594 |",
  "| 58 | Dip tank at 416 583 | Borehole at 421 587 | School at 434 582 | Police station at 449 585 |",
  "| 57 | Spot height 1186 m at 413 571 | Clinic at 425 576 | Grinding mill at 437 574 | Church at 442 578 |",
].join("\n");

concept("geo.maps.location-coordinates", { file: "maps/location-coordinates", keyPrefix: "maps.location-coordinates" }, (b) => {
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true, secs: 60,
    stem: `${EXTRACT}\n\nWhat is the **four-figure** grid reference of the square that contains the school?`,
    options: [
      ["4358", "Correct: the school (434 582) lies east of easting 43 and north of northing 58."],
      ["5843", "This gives the northing first; the easting is always written first."],
      ["4459", "This uses the lines to the east and north of the square instead of the south-west corner."],
      ["4357", "Northing 57 is the line below the clinic's row; the school is above line 58."],
    ],
    answer: "A",
    explanation: "A four-figure reference is the easting on the **west** side of the square followed by the northing on its **south** side: 43 then 58, so **4358**.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", secs: 60,
    stem: `${EXTRACT}\n\nWhich of these is the six-figure grid reference of the **clinic**?`,
    options: [
      ["425 576", "Correct: 5 tenths east of easting 42 and 6 tenths north of northing 57."],
      ["576 425", "Easting and northing have been reversed."],
      ["435 576", "Easting 43 is one square too far east; the clinic is in the column of easting 42."],
      ["425 586", "Northing 58 is one square too far north; the clinic is in the row of northing 57."],
    ],
    answer: "A",
    explanation: "Easting first (42 + 5 tenths = 425), then northing (57 + 6 tenths = 576): **425 576**.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", secs: 60,
    stem: `${EXTRACT}\n\nWhich feature is found at grid reference **437 574**?`,
    options: [
      ["The grinding mill", "Correct: 437 574 is in square 4357, where the grinding mill is."],
      ["The school", "The school is at 434 582, in square 4358."],
      ["The church", "The church is at 442 578, in square 4457."],
      ["The mission", "The mission is at 438 591, in square 4359."],
    ],
    answer: "A",
    explanation: "Easting 43.7 and northing 57.4 place the point in square **4357**, which contains the grinding mill.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", secs: 75,
    stem: `${EXTRACT}\n\nA pupil walks from the store due south. Which feature in the extract is closest to the line she follows?`,
    hints: ["Due south means the easting stays the same while the northing decreases.", "The store is at easting 42.7. Which feature further south has an easting closest to 42.7?"],
    options: [
      ["The clinic", "Correct: the clinic (425 576) has easting 42.5, only 0.2 km from the store's easting of 42.7."],
      ["The borehole", "The borehole (421 587) has easting 42.1, 0.6 km west of the line."],
      ["The school", "The school (434 582) has easting 43.4, 0.7 km east of the line."],
      ["The dip tank", "The dip tank (416 583) has easting 41.6, more than 1 km west of the line."],
    ],
    answer: "A",
    explanation: "Walking due south keeps the easting at 42.7. Of the features to the south, the clinic (easting 42.5) is nearest that line.",
  });
  b.short({
    d: 2, skill: "APPLICATION", secs: 60,
    stem: `${EXTRACT}\n\nGive the **six-figure** grid reference of the bridge.`,
    accepted: ["445594", "445 594"],
    wrong: ["594445", "4459"],
    explanation: "The bridge is 5 tenths east of easting 44 and 4 tenths north of northing 59: **445 594**.",
  });
  b.short({
    d: 2, skill: "APPLICATION", secs: 45,
    stem: `${EXTRACT}\n\nGive the **four-figure** grid reference of the square containing the dip tank.`,
    accepted: ["4158", "41 58"],
    wrong: ["5841", "4259"],
    explanation: "The dip tank (416 583) is in the square east of easting 41 and north of northing 58: **4158**.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which line of latitude is numbered 0°?",
    options: [
      ["The Equator", "Correct: latitude is measured north and south of the Equator, which is 0°."],
      ["The Prime Meridian", "The Prime Meridian is 0° of longitude, not latitude."],
      ["The Tropic of Capricorn", "The Tropic of Capricorn is at about 23.5°S."],
      ["The International Date Line", "The Date Line roughly follows 180° of longitude."],
    ],
    answer: "A",
    explanation: "Latitude runs from 0° at the **Equator** to 90° at each pole; longitude runs from 0° at the Prime Meridian to 180°.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In which two hemispheres does the whole of Zimbabwe lie?",
    options: [
      ["Southern and Eastern", "Correct: Zimbabwe is south of the Equator (about 15°S to 23°S) and east of the Prime Meridian (about 25°E to 33°E)."],
      ["Northern and Eastern", "Zimbabwe is south of the Equator, so it is not in the Northern Hemisphere."],
      ["Southern and Western", "Zimbabwe's longitudes are east of Greenwich, so it is in the Eastern Hemisphere."],
      ["Northern and Western", "Zimbabwe is south of the Equator and east of the Prime Meridian."],
    ],
    answer: "A",
    explanation: "Zimbabwe's latitudes are all south (S) and its longitudes all east (E), so it lies in the **Southern** and **Eastern** hemispheres.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A town lies exactly halfway between the parallels 19°S and 20°S. What is its latitude?",
    options: [
      ["19°30′S", "Correct: half a degree is 30 minutes, so halfway is 19°30′S."],
      ["19°50′S", "This treats a degree as 100 minutes; there are 60 minutes in a degree."],
      ["19°30′N", "Both parallels are south of the Equator, so the town is too."],
      ["19°15′S", "15 minutes is a quarter of a degree, not a half."],
    ],
    answer: "A",
    explanation: "1° = 60′, so half a degree = 30′. Halfway between 19°S and 20°S is **19°30′S**.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true, secs: 60,
    stem: "It is 10:00 local time at Greenwich (0°). Using 15° of longitude per hour, what is the local time at a place on **45°E**?",
    options: [
      ["13:00", "Correct: 45° ÷ 15° = 3 hours, and places to the east are ahead, so 10:00 + 3 h = 13:00."],
      ["07:00", "This subtracts the time; places east of Greenwich are ahead, not behind."],
      ["13:45", "45 is the number of degrees, not minutes; 45° is exactly 3 hours."],
      ["14:30", "This uses the wrong rate; the Earth turns 15° per hour."],
    ],
    answer: "A",
    explanation: "45° ÷ 15° per hour = **3 hours**. East is ahead, so the time is 10:00 + 3 h = **13:00**.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", secs: 90,
    stem: "When it is 14:00 local time at a place on 30°E, what is the local time at a place on **60°W**?",
    hints: ["The places are on opposite sides of the Prime Meridian, so add the longitudes.", "Convert degrees to hours (15° per hour) and decide whether the western place is ahead or behind."],
    options: [
      ["08:00 on the same day", "Correct: 30° + 60° = 90° = 6 hours, and the western place is behind: 14:00 − 6 h = 08:00."],
      ["16:00 on the same day", "This subtracts the longitudes (60 − 30 = 30° = 2 h) and adds the time; neither step is right."],
      ["20:00 on the same day", "The western place is behind, so the 6 hours must be subtracted, not added."],
      ["12:00 on the same day", "This subtracts the longitudes (30° = 2 h); on opposite sides of Greenwich they must be added."],
    ],
    answer: "A",
    explanation: "Opposite sides of Greenwich: 30° + 60° = **90°**. 90 ÷ 15 = **6 h**. West is behind: 14:00 − 6 h = **08:00**.",
  });
  b.num({
    d: 2, skill: "APPLICATION", secs: 60,
    stem: "What is the difference in longitude, in degrees, between a place on **30°E** and a place on **45°W**?",
    value: 75, unit: "°",
    wrong: [15],
    explanation: "The places are on opposite sides of the Prime Meridian, so add: 30° + 45° = **75°**.",
  });
  b.calc({
    d: 3, skill: "APPLICATION", secs: 90,
    stem: "Two fictional towns lie on longitudes **25°E** and **32°E**. Calculate the difference in their local times, in minutes.",
    value: 28, unit: "min",
    wrong: [7, 105],
    hints: ["Both towns are east of Greenwich, so subtract the longitudes.", "Each degree of longitude is worth 4 minutes of time."],
    explanation: "32° − 25° = 7°; 7 × 4 minutes = **28 minutes** (the town on 32°E is ahead).",
    workedSolution: "1. Both towns are east of Greenwich, so the difference is 32° − 25° = 7°.\n2. 360° in 24 h means 15° per hour, so 1° = 60 ÷ 15 = 4 minutes.\n3. 7 × 4 = 28 minutes.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "A ship sails **eastwards** across the International Date Line on a Tuesday. What happens to the date on board?",
    hints: ["Places just west of the Date Line are the first to start each new day.", "Moving east across the line takes you into the area that is a day behind."],
    options: [
      ["It goes back one day, to Monday.", "Correct: crossing eastwards from the Asian side to the American side, you go back one day."],
      ["It goes forward one day, to Wednesday.", "That happens when you cross the Date Line travelling westwards."],
      ["It stays Tuesday; only the hour changes.", "Crossing the Date Line changes the calendar date by a whole day."],
      ["It goes back by twelve hours only.", "The Date Line changes the date by a full day, not by twelve hours."],
    ],
    answer: "A",
    explanation: "Travelling east, clocks go forward one hour for every 15°, so by the time you reach the Date Line you have gained a whole day. Crossing it **eastwards** corrects this: the date goes **back** one day (Tuesday becomes Monday).",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "All lines of longitude meet at the North and South Poles.",
    answer: true,
    explanation: "True. Meridians (lines of longitude) are half-circles running from pole to pole, so they all meet at the poles. Lines of latitude are parallel circles that never meet.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the facts used to calculate time from longitude.",
    template: "The Earth turns through {{blank:a}} degrees of longitude every hour, so one degree of longitude is equal to {{blank:b}} minutes of time.",
    blanks: [
      { id: "a", accepted: ["15", "fifteen"], wrong: "4" },
      { id: "b", accepted: ["4", "four"], wrong: "15" },
    ],
    explanation: "360° ÷ 24 h = **15°** per hour; 60 minutes ÷ 15 = **4 minutes** per degree.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term with its description.",
    pairs: [
      ["Easting", "A vertical grid line numbered from west to east"],
      ["Northing", "A horizontal grid line numbered from south to north"],
      ["Prime Meridian", "The 0° line of longitude through Greenwich"],
      ["Equator", "The 0° line of latitude"],
    ],
    explanation: "Eastings and northings are grid lines on a map; the Prime Meridian and Equator are the zero lines of longitude and latitude on the globe.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "On the Universal Transverse Mercator (UTM) grid used on topographical maps, positions are given as distances east and north of an origin. In what units are these distances measured?",
    options: [
      ["Metres", "Correct: UTM eastings and northings are distances in metres (shown as kilometre lines on map sheets)."],
      ["Degrees and minutes", "Degrees and minutes are used for latitude and longitude, not UTM grid references."],
      ["Hours and minutes", "Hours relate to time zones, not grid references."],
      ["Miles", "UTM uses the metric system."],
    ],
    answer: "A",
    explanation: "The UTM system divides the world into 60 zones, each 6° of longitude wide, and gives positions in **metres** east and north within a zone. Grid lines on 1:50 000 sheets are drawn every 1 000 m (1 km).",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why local time at a place on 32°E is **ahead** of local time at a place on 26°E.",
    hints: ["In which direction does the Earth rotate?", "Which place sees the Sun reach its highest point first?"],
    points: [
      "States that the Earth rotates from west to east.",
      "Explains that the place further east (32°E) faces the Sun first, so sunrise and noon happen there earlier.",
      "Links the 6° difference to 6 × 4 = 24 minutes ahead (or states 15° per hour / 4 minutes per degree).",
    ],
    modelAnswer: "The Earth rotates from west to east, so a place on 32°E turns towards the Sun before a place on 26°E. Noon therefore arrives there first, so its clock time is ahead: 6° × 4 minutes = 24 minutes ahead.",
    explanation: "Rotation from west to east means places further east reach noon first, so their local time is ahead.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "Compare the usefulness of **six-figure grid references** and **latitude and longitude** for locating places. Which system would you recommend for (i) a ranger reporting a poaching incident in a national park and (ii) a pilot flying from Harare to Nairobi? Justify your answer.",
    hints: ["Think about the area each system covers and how precise each is.", "Which system works on a 1:50 000 sheet and which works across the globe?"],
    points: [
      ["Explains that six-figure references locate a point to about 100 m on a 1:50 000 sheet but work only within one map grid.", 1],
      ["Explains that latitude and longitude work anywhere on Earth and are used on globes, atlases and navigation equipment.", 1],
      ["Notes that latitude/longitude in degrees and minutes can be less convenient to read from a local map, while grid squares are easy to count.", 1],
      ["Recommends grid references (or GPS coordinates on the map grid) for the ranger, with a reason (local, precise, matches the park's topographical sheets).", 1],
      ["Recommends latitude and longitude for the pilot, with a reason (crosses several countries and map sheets; aviation charts use it).", 1],
      ["Gives an overall judgement that the best system depends on the scale and purpose of the task.", 1],
    ],
    levels: geographyLevels(6),
    wordLimit: { max: 250 },
    modelAnswer: "A six-figure grid reference pinpoints a feature to about 100 m on a 1:50 000 sheet, and it is quick to read by counting grid lines. But it only works within the grid of that map series. Latitude and longitude form a single global system, so a position can be given anywhere on Earth, though reading minutes from a local sheet is slower. The ranger works within one park covered by topographical sheets, so a six-figure reference (which a GPS can also give) is precise and easy for others to plot. The pilot crosses several countries and many map sheets, and aviation charts and navigation instruments use latitude and longitude, so that system is better. The best choice therefore depends on the scale of the area and the purpose.",
    explanation: "Grid references are precise for local, single-sheet work; latitude and longitude suit global and long-distance navigation.",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: `${EXTRACT}\n\nUse the extract to answer the questions.`,
    hints: ["Easting first, then northing.", "Six-figure references add tenths of a square."],
    parts: [
      P.short({
        label: "(a)", stem: "Give the four-figure grid reference of the square containing the police station.",
        accepted: ["4458", "44 58"],
        wrong: ["5844"],
        explanation: "The police station (449 585) is east of easting 44 and north of northing 58: 4458.",
      }),
      P.short({
        label: "(b)", stem: "Give the six-figure grid reference of the trigonometrical station.",
        accepted: ["412596", "412 596"],
        wrong: ["596412"],
        explanation: "Easting 41 + 2 tenths = 412; northing 59 + 6 tenths = 596: 412 596.",
      }),
      P.mcq({
        label: "(c)", stem: "Name the feature at 442 578.",
        options: [
          ["Church", "Correct: square 4457 contains the church at 442 578."],
          ["Police station", "The police station is at 449 585, in square 4458."],
          ["Bridge", "The bridge is at 445 594, in square 4459."],
          ["Grinding mill", "The grinding mill is at 437 574, in square 4357."],
        ],
        answer: "A",
        explanation: "442 578 lies in square 4457, where the church is.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Describe the position of the spot height 1186 m in relation to the clinic, giving direction and approximate distance.",
        points: [
          "States that the spot height is west-south-west of the clinic (accept west or south-west).",
          "States a distance of about 1.3 km (accept 1.2–1.4 km).",
        ],
        explanation: "From the clinic (425 576) to the spot height (413 571) is 1.2 km west and 0.5 km south: a straight line of √(1.2² + 0.5²) = 1.3 km on a bearing of about 247°, i.e. west-south-west.",
      }),
    ],
    explanation: "Grid references are always easting first; position descriptions combine a direction with a distance measured from the grid.",
  });
  b.struct({
    d: 4, skill: "APPLICATION",
    stem: "A fictional cup final kicks off at **18:00** local time in City A, on longitude **30°E**. Fans watch it live in City B on **15°W** and in City C on **90°E**. Use 15° of longitude per hour (local time, not official time zones).",
    hints: ["Add longitudes when the places are on opposite sides of Greenwich; subtract when they are on the same side.", "East is ahead; west is behind."],
    parts: [
      P.num({
        label: "(a)", stem: "Calculate the difference in longitude, in degrees, between City A and City B.",
        value: 45, unit: "°", wrong: [15],
        explanation: "Opposite sides of Greenwich: 30° + 15° = 45°.",
      }),
      P.mcq({
        label: "(b)", stem: "What is the local time in City B at kick-off?",
        options: [
          ["15:00", "Correct: 45° = 3 h; City B is west, so 18:00 − 3 h = 15:00."],
          ["21:00", "City B is west of City A, so its time is behind, not ahead."],
          ["17:00", "This uses only the 15° of City B's longitude (1 h)."],
          ["18:45", "This treats the 45° difference as 45 minutes and adds it; 45° is 3 hours, and City B is behind."],
        ],
        answer: "A",
        explanation: "45° ÷ 15° = 3 hours; west is behind: 18:00 − 3 h = 15:00.",
      }),
      P.num({
        label: "(c)", stem: "Calculate the time difference, in hours, between City A and City C.",
        value: 4, unit: "h", wrong: [8],
        explanation: "Both are east: 90° − 30° = 60°; 60 ÷ 15 = 4 hours.",
      }),
      P.mcq({
        label: "(d)", stem: "What is the local time in City C at kick-off?",
        options: [
          ["22:00", "Correct: City C is 4 hours ahead: 18:00 + 4 h = 22:00."],
          ["14:00", "City C is east of City A, so its time is ahead."],
          ["00:00 the next day", "This adds 6 hours (90° ÷ 15°) instead of the 4-hour difference."],
          ["20:00", "This adds only 2 hours (30° ÷ 15°) instead of 4."],
        ],
        answer: "A",
        explanation: "60° east = 4 hours ahead: 22:00 on the same day.",
      }),
    ],
    explanation: "Find the longitude difference, convert at 15° per hour, then add for places to the east and subtract for places to the west.",
  });

  b.card("DEFINITION", "Four-figure grid reference", "Names a grid square: the easting on its west side, then the northing on its south side (its south-west corner).");
  b.card("CONCEPT", "Six-figure grid reference", "Easting + tenths, then northing + tenths, e.g. 425 576. Locates a point to 100 m on a 1:50 000 map.");
  b.card("DEFINITION", "Latitude", "Angular distance north or south of the Equator (0°), up to 90°N/S. Lines of latitude run east–west.");
  b.card("DEFINITION", "Longitude", "Angular distance east or west of the Prime Meridian (0°, Greenwich), up to 180°E/W. Meridians meet at the poles.");
  b.card("FACT", "Time and longitude", "15° = 1 hour; 1° = 4 minutes. Places to the east are ahead; places to the west are behind.");
  b.card("CONCEPT", "Adding or subtracting longitudes", "Same side of Greenwich: subtract. Opposite sides (one E, one W): add.");
  b.card("FACT", "International Date Line", "Roughly the 180° meridian. Crossing eastwards: go back one day. Crossing westwards: go forward one day.");
  b.card("FACT", "Degrees and minutes", "1 degree = 60 minutes (60′), so 17°30′S is halfway between 17°S and 18°S.");
  b.card("CONCEPT", "UTM grid in outline", "60 zones, each 6° of longitude wide; positions in metres east and north. Zimbabwe lies in UTM zones 35 and 36.");
});
