// Slice G3b: physical fieldwork (rivers, beaches, vegetation, microclimate).
import { concept, P, geographyLevels } from "../lib.mjs";

concept("geo.fieldwork.physical-fieldwork", { file: "fieldwork/physical-fieldwork", keyPrefix: "fieldwork.physical-fieldwork" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which piece of equipment measures river **velocity** directly at a chosen depth?",
    options: [
      ["A flow meter", "Correct: its propeller turns with the current and gives a speed reading at the depth where it is held."],
      ["A clinometer", "A clinometer measures angles of slope, for example on a beach profile."],
      ["A ranging pole", "Ranging poles mark points and heights for slope measurements."],
      ["A quadrat", "A quadrat is a frame for sampling vegetation or pebbles."],
    ],
    answer: "A",
    explanation: "A flow meter (current meter) measures velocity at any depth. A float and stopwatch give only surface velocity.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **quadrat** used for in fieldwork?",
    options: [
      ["Sampling the plants or pebbles within a small, fixed area", "Correct: the frame marks out a standard area so samples can be compared."],
      ["Measuring the angle between two ranging poles on a slope", "That is the job of a clinometer."],
      ["Recording the wind speed at a microclimate site", "Wind speed is measured with an anemometer."],
      ["Timing a float over a measured stretch of river", "Velocity is measured with a float and a stopwatch or with a flow meter."],
    ],
    answer: "A",
    explanation: "A quadrat (often 0.5 m or 1 m square) is placed at sample points to record species, percentage cover or pebble characteristics.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "How is river **discharge** calculated?",
    options: [
      ["Cross-sectional area × velocity", "Correct: area (m²) × velocity (m/s) gives the volume per second (m³/s)."],
      ["Width × depth × wetted perimeter", "Wetted perimeter is a length used to judge channel efficiency, not part of discharge."],
      ["Velocity ÷ cross-sectional area", "Dividing gives the wrong units; discharge is a product, not a ratio."],
      ["Width × velocity × gradient", "Gradient is not part of the discharge formula, and width alone is not the area."],
    ],
    answer: "A",
    explanation: "Discharge (m³/s) = cross-sectional area (m²) × velocity (m/s), where area = width × mean depth.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "When drawing a **beach profile**, what is the clinometer used for?",
    options: [
      ["Measuring the angle of slope between two ranging poles", "Correct: sight from a mark on one pole to the same height on the next and read the angle."],
      ["Measuring the distance between two ranging poles", "Distance is measured with a tape measure."],
      ["Measuring the size of pebbles at each pole", "Pebble size is measured with a ruler or calipers."],
      ["Measuring the direction of longshore drift along the beach", "Drift direction is found with floats, pebble tracing or a compass bearing of movement."],
    ],
    answer: "A",
    explanation: "Ranging poles mark the points (often at breaks of slope); the clinometer gives the angle between them; a tape gives the distance. Together they let you draw the profile.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why should river depth be measured at **equal intervals across** the channel rather than once in the middle?",
    options: [
      ["The depth varies across the channel, so several readings give a true mean depth", "Correct: the channel is usually shallow near the banks and deeper in the middle."],
      ["The middle of the channel is always far too dangerous for students to reach safely", "Safety matters, but the reason for intervals is accuracy of the mean depth."],
      ["Depth readings in the middle are always much too shallow to measure", "The middle is usually the deepest part, not the shallowest."],
      ["Depth must be measured at the same place as the float is released", "Float release points are chosen for velocity, not for depth."],
    ],
    answer: "A",
    explanation: "Because the bed is uneven, readings at regular intervals (for example every 0.5 m) give a representative mean depth and allow a cross-section to be drawn.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Students measured pebbles at five sites down a river. Which result would they **expect**, and why?",
    options: [
      ["Pebbles become smaller and more rounded downstream because of attrition", "Correct: pebbles knock together and wear down as they are carried further."],
      ["Pebbles become larger and more angular downstream because of deposition", "Large, angular pebbles are typical of the upper course near their source."],
      ["Pebbles stay the same size because rivers do not carry their bedload", "Rivers move bedload by traction and saltation, wearing it down."],
      ["Pebbles become more angular downstream because of hydraulic action", "Hydraulic action works on banks; transport makes pebbles rounder, not more angular."],
    ],
    answer: "A",
    hints: ["Think about what happens to stones as they are moved and knocked together.", "Which erosion process acts on the load itself?"],
    explanation: "Attrition (load colliding with load) and abrasion make bedload smaller and rounder with distance downstream.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Which is a source of error when velocity is measured with a **float and stopwatch**?",
    options: [
      ["The float can be blown by the wind or caught on weeds", "Correct: wind or snags change the float's speed so it no longer matches the current."],
      ["The float measures the velocity at the river bed", "A float moves at the surface, not along the bed."],
      ["The float can only be used in very deep and wide rivers", "Floats are suited to small, shallow streams."],
      ["The stopwatch measures the distance the float travels", "The stopwatch measures time; the distance is measured with a tape."],
    ],
    answer: "A",
    hints: ["What can push or stop a light object on the water surface?"],
    explanation: "Float errors include wind, snagging, eddies and reaction time on the stopwatch. Repeating three times and averaging, or using a flow meter, reduces them.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Students compare air temperature at four sites around their school. Which step makes the comparison **fair**?",
    options: [
      ["Taking readings at the same height and at the same time at every site", "Correct: height and time affect temperature, so both must be kept the same."],
      ["Taking readings in direct sunshine at some sites and shade at others", "Sun on the thermometer bulb raises the reading; readings should be shaded."],
      ["Taking each site's reading at a different hour of the day", "Temperature changes during the day, so times must match."],
      ["Using a different thermometer at each site", "Instruments may differ slightly; ideally they are checked against each other first."],
    ],
    answer: "A",
    explanation: "In microclimate work keep everything the same except the site: same height (for example 1 m), same time, shaded instruments and calibrated equipment.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "River discharge is measured in cubic metres per second (m³/s), also called cumecs.",
    answer: true,
    explanation: "True. Discharge is a volume per second: m² × m/s = m³/s.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A float timed on the surface gives exactly the mean velocity of the whole river channel.",
    answer: false,
    explanation: "False. Surface water usually flows faster than water near the bed and banks, where friction slows it, so a float overestimates the mean velocity.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each piece of equipment with what it measures.",
    pairs: [
      ["Anemometer", "Wind speed"],
      ["Metre rule", "River depth"],
      ["Clinometer", "Angle of slope"],
      ["Tape measure", "Channel width"],
    ],
    explanation: "Anemometer: wind speed; metre rule: depth; clinometer: slope angle; tape measure: width and distances.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true, unit: "m/s",
    stem: "A float takes a mean time of 25 s to travel 15 m downstream (fictional data). Calculate the surface velocity.",
    value: 0.6, tol: 0.005,
    wrong: [1.67, 375],
    explanation: "Velocity = distance ÷ time = 15 ÷ 25 = 0.6 m/s.",
  });
  b.calc({
    d: 3, skill: "APPLICATION", unit: "m³/s",
    stem: "At one site a stream is 2.5 m wide, its mean depth is **18 cm** and its mean velocity is 0.4 m/s (fictional data). Calculate the discharge in m³/s.",
    value: 0.18, tol: 0.002,
    wrong: [18, 1.8],
    hints: ["Convert the depth to metres first.", "Area = width × mean depth; discharge = area × velocity."],
    workedSolution: "1. Mean depth = 18 cm = 0.18 m.\n2. Cross-sectional area = 2.5 × 0.18 = 0.45 m².\n3. Discharge = 0.45 × 0.4 = 0.18 m³/s.",
    explanation: "Convert 18 cm to 0.18 m, then area = 0.45 m² and discharge = 0.45 × 0.4 = 0.18 m³/s. Forgetting to convert gives 18, which is 100 times too big.",
  });
  b.num({
    d: 2, skill: "APPLICATION", unit: "%",
    stem: "A gridded quadrat has 100 small squares. Grass covers 23 of them (fictional data). What is the percentage cover of grass?",
    value: 23,
    wrong: [77],
    explanation: "Each of the 100 squares is 1% of the quadrat, so 23 squares = 23% cover.",
  });
  b.num({
    d: 2, skill: "APPLICATION", unit: "mm",
    stem: "The long axes of five pebbles at one river site were 42, 35, 58, 61 and 29 mm (fictional data). Calculate the mean long-axis length.",
    value: 45,
    wrong: [225, 32],
    explanation: "(42 + 35 + 58 + 61 + 29) ÷ 5 = 225 ÷ 5 = 45 mm.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "A line along which measurements are taken at regular intervals is a {{blank:a}}. The length of the bed and banks in contact with the water is the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["transect"], choices: ["transect", "quadrat", "profile", "gradient"] },
      { id: "b", accepted: ["wetted perimeter"], choices: ["wetted perimeter", "cross-sectional area", "discharge", "long profile"] },
    ],
    explanation: "Transects organise systematic sampling; the wetted perimeter is used to judge how efficiently a channel carries water.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Describe how to measure the **cross-sectional area** of a small stream at one site.",
    hints: ["Area needs width and mean depth.", "How do you get a mean depth?"],
    points: [
      "Measure the width from bank to bank at water level with a tape measure, at right angles to the flow.",
      "Measure the depth with a metre rule at equal intervals across the channel (for example every 0.5 m) and calculate the mean depth.",
      "Multiply width by mean depth to give the area in m² (both in metres).",
    ],
    modelAnswer: "Stretch a tape across the stream at water level to measure the width. Measure depth with a metre rule every 0.5 m across, find the mean, then multiply width by mean depth.",
    explanation: "Cross-sectional area = width × mean depth; depth must be sampled across the channel.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 840,
    stem: "Students tested the hypothesis *Discharge increases downstream* on a small river. Site 1 is furthest upstream (fictional data).\n\n| Site | 1 | 2 | 3 | 4 | 5 |\n|---|---|---|---|---|---|\n| Width (m) | 1.6 | 2.2 | 2.9 | 3.4 | 4.0 |\n| Mean depth (m) | 0.15 | 0.20 | 0.26 | 0.31 | 0.38 |\n| Mean velocity (m/s) | 0.25 | 0.31 | 0.28 | 0.42 | 0.50 |",
    hints: ["Area = width × mean depth.", "Discharge = area × velocity."],
    parts: [
      P.num({ label: "(a)", unit: "m²", stem: "Calculate the cross-sectional area at site 4. Give your answer to two decimal places.", value: 1.054, answer: "1.05", tol: 0.005, wrong: [3.71, 0.13], explanation: "3.4 × 0.31 = 1.054 ≈ 1.05 m²." }),
      P.num({ label: "(b)", unit: "m³/s", stem: "Calculate the discharge at site 4. Give your answer to two decimal places.", value: 0.44268, answer: "0.44", tol: 0.005, wrong: [2.51, 1.47], explanation: "1.054 × 0.42 = 0.443 ≈ 0.44 m³/s." }),
      P.mcq({
        label: "(c)", stem: "Which measurement does **not** follow the downstream trend?",
        options: [
          ["The velocity at site 3", "Correct: velocity falls from 0.31 to 0.28 m/s between sites 2 and 3."],
          ["The width at site 3", "Width rises steadily from 1.6 to 4.0 m."],
          ["The mean depth at site 4", "Depth rises steadily from 0.15 to 0.38 m."],
          ["The velocity at site 5", "Site 5 has the highest velocity, as expected."],
        ],
        answer: "A", explanation: "Every value increases downstream except velocity at site 3.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain why discharge usually increases downstream.",
        points: ["Tributaries join the main river / more of the drainage basin drains into it, adding water.", "The channel becomes wider and deeper, with relatively less friction, so velocity also increases."],
        modelAnswer: "Tributaries and groundwater add water as the drainage basin area grows, and the wider, deeper channel has less friction for its size, so water flows faster.",
        explanation: "Discharge rises with basin area and channel efficiency.",
      }),
      P.manual({
        label: "(e)", marks: 3, stem: "Describe how the students could have measured velocity with a float.",
        points: ["Measure a set distance (for example 10 m) along the bank with a tape.", "Release the float upstream of the start and time it with a stopwatch from start to finish.", "Repeat (at least three times) and calculate the mean time; velocity = distance ÷ mean time."],
        modelAnswer: "Mark out 10 m along the bank. Drop a float just above the start, time it to the finish line, repeat three times, then divide 10 m by the mean time.",
        explanation: "Set distance, timed float, repeats and the velocity calculation.",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "Suggest **two** reasons for the low velocity at site 3.",
        points: ["A local feature slows the water, such as a pool, a bend, weeds, a fallen tree or boulders (more friction).", "A measurement error, such as the float being caught or blown by the wind / a stopwatch error."],
        modelAnswer: "Site 3 may be in a pool or on a bend where water slows, or the float may have been caught on weeds, making the time too long.",
        explanation: "Anomalies come from local channel features or from method errors.",
      }),
      P.manual({
        label: "(g)", marks: 2, stem: "Suggest **two** ways to improve the reliability of this investigation.",
        points: ["Use more sites at equal intervals along the river.", "Take repeat readings and means at each site / use a flow meter / measure all sites on the same day in similar conditions."],
        modelAnswer: "Increase the number of sites to ten at equal intervals, and use a flow meter with three readings at each site.",
        explanation: "More sites and more (or better) readings make the pattern more trustworthy.",
      }),
    ],
    explanation: "Discharge rises from 0.06 m³/s at site 1 to 0.76 m³/s at site 5, so the hypothesis is supported, although velocity at site 3 is an anomaly.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 720,
    stem: "On a straight beach, students measured the mean long axis of 20 pebbles at five sites spaced 100 m apart from west (site 1) to east (site 5) (fictional data).\n\n| Site | 1 | 2 | 3 | 4 | 5 |\n|---|---|---|---|---|---|\n| Mean pebble length (mm) | 62 | 54 | 47 | 41 | 33 |",
    hints: ["Longshore drift sorts material along the beach.", "Which way would smaller pebbles have been carried?"],
    parts: [
      P.num({ label: "(a)", unit: "mm", stem: "Calculate the difference in mean pebble length between site 1 and site 5.", value: 29, wrong: [95], explanation: "62 − 33 = 29 mm." }),
      P.mcq({
        label: "(b)", stem: "What do the results suggest about longshore drift on this beach?",
        options: [
          ["Material is moved from west to east", "Correct: pebbles get smaller towards the east, as they are worn and sorted while carried eastwards."],
          ["Material is moved from east to west", "Material would then be smallest at the western end."],
          ["There is no movement of material along the beach", "A steady change in size along the beach suggests movement."],
          ["Material is moved straight up and down the beach only", "Swash and backwash alone would not sort size along the beach."],
        ],
        answer: "A", explanation: "Pebbles are worn smaller by attrition as they travel, so the smallest are furthest along the drift direction.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Describe how the students should have chosen and measured the 20 pebbles at each site.",
        points: ["Use a systematic or random method (for example a pebble at each intersection of a quadrat / at set points on a tape) so pebbles are not chosen by eye.", "Sample at the same position on the beach at every site (for example the same distance from the sea or on the same ridge).", "Measure the long (a) axis of each pebble with a ruler or calipers and calculate the mean."],
        modelAnswer: "At each site place a quadrat at the same height on the beach and take the pebble under each of 20 intersections, measure each long axis with calipers, then calculate the mean.",
        explanation: "Unbiased selection, a consistent position and correct measurement.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain how longshore drift moves pebbles along a beach.",
        points: ["Waves approach at an angle (with the prevailing wind) so the swash carries pebbles up the beach at an angle.", "The backwash returns them straight down the slope under gravity, so they move along the beach in a zigzag."],
        modelAnswer: "Swash pushes pebbles up the beach at the angle of the waves, then backwash pulls them straight back down, so they zigzag along the shore.",
        explanation: "Oblique swash and perpendicular backwash produce a net movement along the coast.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Identify **one** hazard of this fieldwork and a precaution against it.",
        points: ["Names a hazard such as the incoming tide, large waves, slippery rocks, falling rocks from a cliff or sunburn.", "Gives a matching precaution such as checking tide times, staying away from the water's edge, wearing grip shoes, keeping away from the cliff foot or wearing hats and sunscreen."],
        modelAnswer: "The tide could cut the group off, so check tide times and finish before high tide.",
        explanation: "A hazard and a precaution that matches it.",
      }),
    ],
    explanation: "The steady fall in pebble size from west to east supports drift towards the east.",
  });
  b.struct({
    d: 2, skill: "APPLICATION", secs: 540,
    stem: "A class recorded air temperature at four sites around the school at 13:00 on a sunny day (fictional data).\n\n| Site | Tarred car park | Lawn | Under trees | Classroom corridor |\n|---|---|---|---|---|\n| Temperature (°C) | 31.5 | 27.0 | 24.5 | 26.0 |",
    parts: [
      P.num({ label: "(a)", unit: "°C", stem: "Calculate the range of temperatures.", value: 7, tol: 0.05, wrong: [56], explanation: "31.5 − 24.5 = 7.0 °C." }),
      P.mcq({
        label: "(b)", stem: "Which is the best reason why the car park was warmest?",
        options: [
          ["Dark tar absorbs the sun's heat and has no shade", "Correct: dark, bare surfaces absorb more insolation and heat the air above them."],
          ["Cars in the car park give out cold air", "Vehicles add heat, not cold air."],
          ["Tarred surfaces release water that warms the air", "Tar is dry; evaporation would cool, not warm, the air."],
          ["The car park is higher above sea level", "Small height differences around one school do not explain 4.5 °C or more."],
        ],
        answer: "A", explanation: "Dark, dry, unshaded surfaces absorb and re-radiate heat.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Give **two** ways the class should make sure the readings are comparable.",
        points: ["Same height above the ground (for example 1 m) at every site.", "Same time / shaded thermometer / same (or calibrated) thermometer / wait for the reading to settle."],
        modelAnswer: "Hold the thermometer 1 m above the ground in the shade at every site, and take all readings at 13:00.",
        explanation: "Controlled variables make the sites comparable.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain why it was coolest under the trees.",
        points: ["The trees shade the ground so less sunlight heats the surface.", "Leaves release water vapour (transpiration) / evaporation uses heat, cooling the air."],
        modelAnswer: "The canopy shades the ground and the leaves transpire, and evaporation of that moisture takes heat from the air.",
        explanation: "Shade and transpiration both cool the air.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Suggest **two** other measurements, with equipment, that would improve this microclimate study.",
        points: ["Wind speed with an anemometer (or wind direction with a vane/compass).", "Humidity with a hygrometer or wet-and-dry bulb thermometer / ground surface temperature with a surface thermometer / readings at several times of day."],
        modelAnswer: "Measure wind speed with a hand-held anemometer and relative humidity with a wet-and-dry bulb thermometer at each site.",
        explanation: "Several weather elements give a fuller picture of each microclimate.",
      }),
    ],
    explanation: "The temperature differences reflect surface type and shade: dark tar warms most, tree cover cools most.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "Discuss the main problems of collecting accurate and reliable data in a **river** investigation, and how each can be reduced.",
    hints: ["Think about each measurement: width, depth, velocity, load.", "For each problem, give a matching solution."],
    points: [
      "Velocity: floats measure only surface speed and are affected by wind and snags; use a flow meter or repeat three times and average.",
      "Depth: uneven bed, rule sinking into mud or water piling up; measure at equal intervals and read on the downstream side.",
      "Width: banks unclear or tape sagging; measure at water level with the tape taut.",
      "Load: biased choice of pebbles; sample systematically at points on a transect.",
      "Sites and timing: too few sites or rain changing discharge; more sites, all measured on the same day.",
      "Judgement or link to safety: some limits remain (access, depth), so results are approximate and should be treated with caution.",
    ],
    levels: geographyLevels(6),
    modelAnswer: "Velocity is the hardest measurement: a float shows only surface speed, can be blown by wind or caught on weeds, and stopwatch reactions add error, so it should be timed three times and averaged or replaced by a flow meter. Depth readings are affected by the uneven bed and by the rule sinking into mud, so depth should be measured at equal intervals across the channel and read carefully. Pebble samples are biased if students pick eye-catching stones, so pebbles should be taken at fixed points on a transect. Discharge changes after rain, so all sites should be measured on one day, and more sites at equal intervals give a clearer pattern. Even with these steps the results are estimates, so conclusions should be cautious.",
    explanation: "Each problem should be paired with a specific solution, ending with a judgement about how far the data can be trusted.",
  });

  b.card("FACT", "Discharge formula", "Discharge (m³/s) = cross-sectional area (m²) × velocity (m/s); area = width × mean depth.", "Convert cm to m first.");
  b.card("DEFINITION", "**Wetted perimeter**", "The length of the bed and banks in contact with the water across one cross-section.", undefined);
  b.card("CONCEPT", "Measuring velocity", "Float and stopwatch over a measured distance (repeat, take the mean) or a flow meter at a chosen depth.", "Floats give surface velocity only.");
  b.card("CONCEPT", "Beach profile method", "Ranging poles at set distances or breaks of slope along a transect; clinometer for angles; tape for distance.", undefined);
  b.card("DEFINITION", "**Quadrat**", "A square frame used to sample vegetation or pebbles in a fixed area, often recording percentage cover.", undefined);
  b.card("DEFINITION", "**Transect**", "A line along which measurements are taken at regular intervals.", "Across a river, up a beach or through vegetation.");
  b.card("CONCEPT", "Expected downstream changes", "Width, depth, area, velocity and discharge increase; bedload becomes smaller and more rounded.", "The Bradshaw model.");
  b.card("VOCABULARY", "Microclimate equipment", "Thermometer (temperature), anemometer (wind speed), hygrometer or wet-and-dry bulb (humidity), rain gauge (rainfall).", "Same height and time at every site.");
  b.card("CONCEPT", "Powers' roundness scale", "A chart for classifying pebble shape from very angular to well rounded by matching each pebble to pictures.", undefined);
});
