// W1a: gis.coordinates-projections (free preview lesson). Numbers computed in code.
import { concept, P, t, chk, table, dmsToDecimal, minutesPerLongitude, dpStr, geographyLevels } from "../lib.mjs";

const zone = (lon) => Math.floor((lon + 180) / 6) + 1;
chk(zone(33.5), 36);
chk(zone(26.2), 35);
chk(dmsToDecimal(-19, 30), -19.5, 1e-9);
const kmLon20 = 111.32 * Math.cos((20 * Math.PI) / 180);
const dl = 31.5 - 25;
const tab = (h, r) => table(h, r);

concept("ageo.gis.coordinates-projections", { file: "gis/coordinates-projections", keyPrefix: "gis.coordinates-projections" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Latitude and longitude are measured in which units?",
    options: [
      ["Degrees (they are angles)", "Correct: they are angular measurements from the equator and prime meridian."],
      ["Metres from a map origin", "Metres are used by plane (grid) coordinates."],
      ["Kilometres from the nearest town", "Distances from a town are not a coordinate system."],
      ["Hours and minutes", "Time is related to longitude but is not its unit."],
    ],
    answer: "A",
    explanation: "Geographic coordinates are angles, so they are in degrees (with minutes and seconds or decimals).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Approximately how long is one degree of latitude on the ground?",
    options: [
      ["111 km", "Correct: this is almost the same everywhere on Earth."],
      ["11 km", "This is about one-tenth of a degree."],
      ["1 110 km", "This is ten degrees of latitude."],
      ["60 km", "This is not a standard length for a degree of latitude."],
    ],
    answer: "A",
    explanation: "One degree of latitude is about 111 km (one minute is about 1.85 km).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of the following describes a Mercator projection?",
    options: [
      ["Shapes are kept but areas grow towards the poles", "Correct: Mercator is a conformal cylindrical projection."],
      ["Areas are right everywhere but shapes are distorted at the map edges", "That describes an equal-area projection, not Mercator."],
      ["Distances from the centre are right but not between other points", "That describes an azimuthal equidistant projection."],
      ["All distances, areas, shapes and directions are right everywhere", "No flat map can preserve all of these."],
    ],
    answer: "A",
    explanation: "Mercator preserves angles and local shape (so compass courses are straight lines) but exaggerates areas towards the poles.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A planner wants to compare the areas of land under maize in different countries on a single map. Which type of projection is most suitable?",
    options: [
      ["An equal-area projection", "Correct: it keeps the relative size of areas."],
      ["A conformal cylindrical projection", "This distorts areas, especially away from the equator."],
      ["An azimuthal projection centred on the North Pole", "This is designed for polar regions, not for world comparisons."],
      ["Any projection, because all keep areas correct", "No projection keeps everything correct."],
    ],
    answer: "A",
    explanation: "To compare areas the projection must be equal-area (for example Albers or Mollweide).",
    hints: ["Which property must be preserved?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A student measures the length of a road on a layer whose coordinates are in decimal degrees and obtains 0.3. Why is the number not useful?",
    options: [
      ["The unit is degrees, so it needs reprojecting to metres", "Correct: a degree is a different length at different latitudes."],
      ["Roads cannot be measured in a GIS without a field survey", "GIS software measures lengths routinely."],
      ["The number is too small to be a real length of a road", "Small numbers are possible in any unit."],
      ["Decimal degrees always overestimate distances on the ground", "The error depends on latitude and direction, not a fixed overestimate."],
    ],
    answer: "A",
    explanation: "Degrees of longitude change in length with latitude, so the layer should be projected into a metre-based system such as UTM before measuring.",
    hints: ["Does one degree always cover the same distance?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What is the difference between a forward and an inverse projection?",
    options: [
      ["Forward gives x and y from latitude and longitude; inverse reverses it", "Correct: they are mathematical opposites."],
      ["Forward is for the northern hemisphere and inverse is for the southern", "Both can be used anywhere."],
      ["Forward keeps areas correct while inverse keeps shapes correct", "They are directions of calculation, not different distortions."],
      ["Forward needs a datum but inverse does not need one", "Both require a datum."],
    ],
    answer: "A",
    explanation: "A forward projection maps the sphere onto the plane; an inverse converts plane coordinates back to latitude and longitude.",
    hints: ["Which direction goes from the sphere to the map?"],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Zimbabwe lies in which UTM zones?",
    options: [
      ["35 and 36 (south)", "Correct: 24°E to 30°E and 30°E to 36°E."],
      ["33 and 34 (south)", "Zones 33 and 34 cover 12°E to 24°E, west of Zimbabwe."],
      ["37 and 38 (south)", "Zones 37 and 38 cover 36°E to 48°E, east of Zimbabwe."],
      ["30 only (north)", "Zimbabwe is in the southern hemisphere and spans two zones."],
    ],
    answer: "A",
    explanation: "Zimbabwe extends from about 25°E to 33°E, so it falls in zones 35S and 36S.",
  });

  b.num({
    d: 2, skill: "APPLICATION",
    stem: "A borehole is located at 19°30′S. Convert the latitude to decimal degrees (use a negative sign for south).",
    value: -19.5, unit: "°", dp: 1,
    wrong: [19.5, -19.3],
    explanation: "30′ ÷ 60 = 0.5°, so the latitude is 19.5°S, written −19.5° in decimal degrees. Writing −19.3 treats 30′ as 0.3°.",
    hints: ["Divide the minutes by 60."],
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Two towns lie on the same latitude. One is at 25.0°E and the other at 31.5°E. By how many minutes does local solar time differ between them?",
    value: minutesPerLongitude(dl), unit: "min",
    wrong: [6.5, 130],
    explanation: "Difference in longitude = 6.5°; each degree is 4 minutes of time, so 6.5 × 4 = 26 minutes.",
    hints: ["Time changes by 4 minutes per degree."],
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Taking one degree of latitude as 111 km, calculate the distance between two points on the same meridian at 18.0°S and 21.0°S, in km.",
    value: 333, unit: "km",
    wrong: [37, 111],
    explanation: "Difference in latitude = 3°; 3 × 111 = 333 km. Dividing 111 by 3 gives 37.",
    hints: ["Find the difference in latitude first."],
  });
  b.calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: "One degree of longitude is about 111.3 × cos(latitude) km. Calculate the length of one degree of longitude at 20°S, in km, to one decimal place.",
    value: kmLon20, unit: "km", dp: 1,
    wrong: [111.3, 40.6],
    explanation: `1. cos 20° = 0.9397.\n2. 111.3 × 0.9397 = ${dpStr(kmLon20, 1)} km.\n3. The length is less than at the equator (111.3 km) because the meridians converge towards the poles.`,
    hints: ["Use the cosine of the latitude.", "Does the answer need to be smaller than 111.3 km?"],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Every map projection distorts at least one of area, shape, distance and direction.",
    answer: true,
    explanation: "True. A curved surface cannot be flattened without distortion.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why local time differs between places at different longitudes.",
    points: ["The Earth rotates through 360° in 24 hours, which is 15° each hour", "So local solar time changes by 4 minutes for every degree of longitude", "Places further east see the Sun earlier, so their local time is ahead of places to the west"],
    modelAnswer: "The Earth rotates through 360 degrees in 24 hours, which is 15 degrees an hour, so local solar time changes by 4 minutes for each degree of longitude. Places further east see the Sun earlier, so their time is ahead of places to the west.",
    explanation: "Link rotation to 4 minutes per degree and to east being ahead.",
    hints: ["How many degrees does the Earth turn each hour?"],
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each projection family with its best-known use.",
    pairs: [
      ["Cylindrical (Mercator)", "Navigation charts with straight compass courses"],
      ["Conical (Lambert conformal conic)", "Mapping a country wide east-west in the mid-latitudes"],
      ["Azimuthal", "Maps of the polar regions and air routes"],
      ["Equal-area", "Comparing sizes of regions"],
    ],
    explanation: "Each projection suits a task because of the property it preserves.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statement about the UTM system.",
    template: "The UTM system divides the world into {{blank:a}} zones, each {{blank:b}} degrees of longitude wide.",
    blanks: [
      { id: "a", accepted: ["60"], input: "number" },
      { id: "b", accepted: ["6"], input: "number" },
    ],
    explanation: "60 zones × 6° = 360°.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What name is given to the process of converting a layer from one coordinate system to another?",
    accepted: ["reprojection", "reprojecting", "re-projection", "projection transformation", "transformation"],
    wrong: ["digitising", "georeferencing"],
    explanation: "**Reprojection** converts the coordinates of a layer into a different coordinate system.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe the difference between geographic coordinates and plane (grid) coordinates.",
    points: ["Geographic coordinates are angles (latitude and longitude) measured on the curved Earth", "Plane coordinates are distances in metres (eastings and northings) on a flat grid", "Geographic coordinates work worldwide, whereas a plane grid is valid only for the area it was designed for / distances are easier to measure on the grid"],
    modelAnswer: "Geographic coordinates are angles of latitude and longitude on the curved Earth and work anywhere in the world. Plane coordinates are distances in metres east and north of an origin on a flat grid, which makes measuring distance easy but is valid only for the area the grid was designed for.",
    explanation: "Units, surface and area of validity.",
    hints: ["Compare the units and where each system works."],
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 3,
    stem: "Explain why the Mercator projection is unsuitable for comparing the areas of countries.",
    points: ["It keeps shape by stretching the map in both directions as latitude increases", "So areas become larger away from the equator (e.g. countries near the poles look much bigger)", "Countries near the equator look too small compared with those in high latitudes, so areas cannot be compared"],
    modelAnswer: "Mercator keeps local shapes correct by stretching the map more and more as latitude increases, so areas are enlarged away from the equator. Countries in high latitudes therefore look much larger than countries near the equator, and the areas cannot be compared fairly.",
    explanation: "Cause (stretching), effect (areas enlarged) and consequence.",
    hints: ["What happens to the scale towards the poles?"],
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Describe the steps a GIS technician would take to reproject a vector layer of roads from latitude and longitude into UTM zone 36S.",
    points: ["Check the layer's current coordinate system and datum", "Select the target system (UTM zone 36S, WGS 84)", "Apply the transformation so that every vertex is converted to eastings and northings in metres", "Save as a new layer and check the result against other layers and a known distance"],
    modelAnswer: "First check the current coordinate system and datum of the layer, then select UTM zone 36S on WGS 84 as the target. Run the transformation, which converts every vertex into eastings and northings in metres, and save the output as a new layer. Finally check that it overlays correctly on other layers and that a known distance measures sensibly.",
    explanation: "Identify, choose, transform, save and verify.",
    hints: ["Think of a sequence from checking to verifying."],
  });

  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`A technician is preparing a GIS project in eastern Zimbabwe. A village is at 31.5°E and a research station is at 28°30′E. She has a layer in latitude and longitude and wants to measure distances and overlay it on a UTM layer.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "State the UTM zone number of the village. Use zone = floor((longitude + 180) ÷ 6) + 1.", value: 36, wrong: [35], explanation: "(31.5 + 180) ÷ 6 = 35.25, so the whole number is 35 and the zone is 36." }),
      P.num({ label: "(b)", marks: 2, type: "CALCULATION", stem: "Convert the longitude of the research station to decimal degrees.", value: 28.5, dp: 1, unit: "°", wrong: [28.3, 28.85], explanation: "30′ ÷ 60 = 0.5°, so 28°30′E = 28.5°E." }),
      P.num({ label: "(c)", marks: 2, type: "CALCULATION", stem: "Calculate the difference in local solar time between the village and the research station, in minutes.", value: (31.5 - 28.5) * 4, unit: "min", wrong: [3, 120], explanation: "Difference in longitude = 3°; 3 × 4 = 12 minutes (the village is further east, so its solar time is ahead)." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why she should not measure distances while the layer is in degrees.", points: ["A degree of longitude varies in length with latitude (a degree is not a fixed distance)", "Results would be in degrees, which are not units of length; she should reproject to metres"], modelAnswer: "A degree of longitude shortens towards the poles, so degrees are not a fixed distance and the results would not be in units of length. She should reproject the layer to a metre-based system first." }),
      P.manual({ label: "(e)", marks: 3, stem: "Suggest which type of projection she should choose for a provincial map used to measure the area of farms, and justify your choice.", points: ["An equal-area projection (such as Albers) or UTM for a small area", "Because area is the property that must be preserved", "Distortion over a small province is small, so UTM zone 36S (with low area error) is also acceptable"], modelAnswer: "An equal-area projection such as Albers is suitable because the property that must be preserved is area. Over a single province, UTM zone 36S would also be acceptable because its distortion is very small within the zone." }),
      P.manual({ label: "(f)", marks: 2, stem: "State why the datum of both layers must be known.", points: ["Different datums place the same coordinates at different positions on the ground", "Layers could be misaligned by metres to hundreds of metres unless converted"], modelAnswer: "Different datums put the same coordinates at different places on the ground, so layers could be misaligned by metres or more unless they are converted to the same datum." }),
    ],
    explanation: "UTM zones, DMS conversion, time difference, reprojection and datum.",
    hints: ["Divide minutes by 60 and multiply degrees of longitude by 4 for minutes of time."],
  });
  b.struct({
    d: 3, skill: "UNDERSTANDING",
    stem: "A school GIS club must choose projections for three tasks (data invented for this exercise).",
    parts: [
      P.match({ label: "(a)", marks: 4, stem: "Match each task with the most suitable projection.", pairs: [["Plotting a ship's route on a constant compass bearing", "Mercator"], ["Comparing the sizes of the world's countries", "Equal-area projection"], ["Mapping flight routes over the North Pole", "Azimuthal projection"], ["Mapping a country that is wide east-west in the mid-latitudes", "Lambert conformal conic"]], explanation: "Match the property needed to the projection." }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain why no map projection is perfect.", points: ["A curved surface cannot be flattened without stretching, tearing or compressing it", "So each projection distorts at least one of area, shape, distance or direction"], modelAnswer: "A curved surface cannot be flattened without stretching or tearing, so every projection distorts at least one of area, shape, distance or direction." }),
      P.manual({ label: "(c)", marks: 2, stem: "State two checks to make after reprojecting a layer.", points: ["The layer overlays correctly on other layers", "Units are metres and a known distance measures sensibly"], modelAnswer: "Check that the layer lines up with other layers and that its units are metres and a known distance measures sensibly." }),
    ],
    explanation: "Linking task requirements to projection properties.",
    hints: ["Which property does each task need to preserve?"],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 8,
    stem: "Evaluate the use of UTM coordinates for a national mapping project in Zimbabwe. [8]",
    points: [
      "Gives positions in metres, so distance and area measurements are simple",
      "A worldwide system, so data from other sources can be combined easily",
      "Zones are narrow (6°), so distortion within each zone is small",
      "Zimbabwe spans two zones (35S and 36S), so data across the zone boundary must be handled carefully",
      "False easting and northing avoid negative numbers",
      "Needs the datum to be specified (e.g. WGS 84) or positions are misplaced",
      "Distances and areas that cross the zone boundary are distorted unless reprojected to a single system",
      "Judgement: UTM is a practical and widely supported choice for most national mapping, with a single national projection for work that crosses zone boundaries",
    ],
    levels: geographyLevels(8),
    modelAnswer: "UTM gives coordinates in metres, so distances and areas are easy to measure, and because it is used worldwide, data from many sources can be combined. Its 6° zones keep distortion small, and false eastings and northings avoid negative numbers. However, Zimbabwe lies in two zones, 35S and 36S, so data that cross the boundary have to be handled carefully or reprojected into a single system, and the datum must be stated or positions can be shifted. Overall UTM is a practical choice for most national mapping, but a project that spans the whole country may prefer a single national projection.",
    wordLimit: { max: 300 },
    explanation: "Advantages, problems and a judgement.",
    hints: ["Think about the advantages of metres and the problem of two zones."],
  });

  b.card("FACT", "How long is 1° of latitude, and how does 1° of longitude vary?", "About 111 km. 1° of longitude is about 111.3 × cos(latitude) km, shrinking to zero at the poles.");
  b.card("FORMULA", "Degrees-minutes to decimal degrees?", t`Decimal $=$ degrees $+$ minutes $\div 60$ $+$ seconds $\div 3600$; south and west are negative.`);
  b.card("FACT", "Time and longitude?", "Local time changes by 4 minutes per degree of longitude (360° in 24 h); places east are ahead.");
  b.card("FACT", "UTM zones?", "60 zones, each 6° wide, numbered from 180°; Zimbabwe lies in zones 35S and 36S.");
  b.card("FORMULA", "UTM zone number?", t`Zone $= \lfloor (\text{longitude} + 180) \div 6 \rfloor + 1$ (longitude in decimal degrees east).`);
  b.card("CONCEPT", "Three projection families and what they suit?", "Cylindrical (Mercator): navigation, shape. Conical: mid-latitude countries. Azimuthal: polar regions and direction from a centre.");
  b.card("DEFINITION", "Forward and inverse projection?", "Forward: latitude and longitude to x and y. Inverse: x and y back to latitude and longitude.");
  b.card("CONCEPT", "Properties a projection may preserve?", "Shape (conformal), area (equal-area), distance (equidistant) and direction (azimuthal); never all four.");
  b.card("CONCEPT", "Why state the datum?", "The same coordinates mean different ground positions in different datums; mixing datums misaligns layers.");
  b.card("CONCEPT", "Steps to reproject a layer?", "Check current system and datum, choose target, transform vertices, save as new layer, check alignment and units.");
});
