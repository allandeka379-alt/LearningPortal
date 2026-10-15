// W3a: arid.water-landforms (Cambridge only, A Level Paper 3 option 10). Data are illustrative (invented for this exercise); every number is computed in code.
import { concept, P, geographyLevels, chk, rnd, discharge, CAM } from "../lib.mjs";
import { mc, tbl } from "../tables/w3a-_q.mjs";

const deg = (v, h) => (Math.atan(v / h) * 180) / Math.PI;
// Singles
const timeYrs = chk(840 / 12, 70, 1e-9);
const q1 = chk(discharge(25, 0.9, 2.8), 63.0, 1e-9);
const angle = rnd(deg(22, 600), 1, 2.1, "angle");
const vol = chk(63.0 * 3 * 3600, 680400, 1e-6);
// Struct 1: barchan positions
const BP = [[2008, 140], [2012, 212], [2016, 287], [2020, 355]];
const BPTAB = tbl(["Year", "Position of the crest along a transect (m downwind of a marker)"], BP.map((r) => [r[0], r[1]]));
const meanRate = rnd((355 - 140) / 12, 1, 17.9, "meanRate");
const r1 = chk((212 - 140) / 4, 18, 1e-9);
const r2 = chk((287 - 212) / 4, 18.75, 1e-9);
const r3 = chk((355 - 287) / 4, 17, 1e-9);
// Struct 2: flash flood hydrograph
const HG = [["00:00", 0], ["00:30", 12], ["01:00", 85], ["01:30", 140], ["02:00", 60], ["03:00", 12], ["04:00", 0]];
const HGTAB = tbl(["Time after rain began (h:min)", "Discharge in the wadi (m³/s)"], HG.map((r) => [r[0], r[1]]));
const peakTimes = rnd(140 / 12, 1, 11.7, "peakTimes");

concept("ageo.arid.water-landforms", { file: "arid/water-landforms", keyPrefix: "arid.water-landforms", applies: CAM }, (b) => {
  mc(b, 1, "RECALL", "Which way do the horns of a barchan dune point?", [
    ["Downwind", "Correct: the horns extend downwind, with the slip face between them."],
    ["Upwind", "The horns point away from the wind, not towards it."],
    ["At right angles to the wind", "That is not the shape of a barchan."],
    ["In every direction", "That describes a star dune."],
  ], "The horns of a barchan point **downwind**.");
  mc(b, 2, "UNDERSTANDING", "Which landform is a gently sloping bedrock surface at the foot of a desert mountain front?", [
    ["A pediment", "Correct: it is formed by sheet floods, stream action and weathering."],
    ["An alluvial fan", "An alluvial fan is a depositional cone at the mouth of a canyon."],
    ["A playa", "A playa is a flat dried lake bed in a basin."],
    ["A yardang", "A yardang is a streamlined ridge carved by the wind."],
  ], "A **pediment** is an erosional bedrock slope at the base of mountains.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "How are yardangs aligned relative to the prevailing wind?", [
    ["Parallel to it", "Correct: the wind carves streamlined ridges in the line of the flow."],
    ["At right angles to it", "That would be the alignment of transverse dunes."],
    ["In a circle around it", "Yardangs do not form circles."],
    ["Randomly, with no relation to it", "They are aligned with the wind."],
  ], "Yardangs lie **parallel** to the dominant wind.");
  mc(b, 2, "UNDERSTANDING", "Why is an alluvial fan formed where a stream leaves a mountain canyon?", [
    ["The stream loses velocity and water, and drops its load", "Correct: the flow spreads out and sinks into the ground."],
    ["The stream gains more energy and cuts a deep new channel", "On the plain the flow slows and spreads."],
    ["The stream is joined by the sea and deposits salt", "Fans are made of gravel and sand, not salt from the sea."],
    ["The stream is dammed by dunes and forms a lake", "Fans are formed by the loss of energy, not by dams of dunes."],
  ], "The flow **spreads, slows and infiltrates**, so the load is dropped.");
  mc(b, 2, "UNDERSTANDING", "What is a playa?", [
    ["A flat bed of silt and salt in an inland basin", "Correct: temporary lakes evaporate and leave deposits."],
    ["A steep-sided dry river valley cut by flash floods", "That is a wadi."],
    ["A cone-shaped fan of gravel at the mouth of a canyon", "That is an alluvial fan."],
    ["A flat-topped hill capped by a layer of resistant rock", "That is a mesa."],
  ], "A **playa** is a dry lake bed with silt and salts.");
  mc(b, 3, "ANALYSIS", "Winds blow from many different directions in turn over a sand sea. Which dune type is most likely to form?", [
    ["Star dune", "Correct: arms radiate in several directions and the dune grows upwards."],
    ["Barchan dune", "A barchan needs a single wind direction and limited sand."],
    ["Seif dune", "A seif forms where winds come from two directions in a narrow range."],
    ["Yardang", "A yardang is an erosional ridge and not a dune."],
  ], "Winds from **many directions** make star dunes.", { hints: ["Which dune has several arms?"] });
  mc(b, 3, "ANALYSIS", "Why is a flash flood in a desert so effective at eroding and transporting sediment?", [
    ["Runoff is rapid and the flow is fast and heavily loaded", "Correct: little infiltration and little vegetation produce a sudden surge."],
    ["It is a slow, steady flow that lasts several days", "Flash floods are brief."],
    ["It is a gentle flow that cannot move anything larger than sand", "Flash floods carry boulders."],
    ["It always has clear water because the soil absorbs all the sediment", "Flash floods are muddy and heavily loaded."],
  ], "Rapid runoff and a steep rise give a **fast, loaded flow**.", { hints: ["Think of infiltration and vegetation cover."] });

  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "A butte is broader than a mesa.", answer: false,
    feedbackTrue: "Not so: a butte is narrower.", feedbackFalse: "Correct: a mesa is broad and flat-topped; a butte is a smaller, narrower remnant.",
    explanation: "Scarp retreat reduces a **mesa** to a smaller **butte**." });
  b.match({ d: 2, skill: "RECALL", stem: "Match each landform to the process that mainly forms it.",
    pairs: [
      ["Yardang", "Abrasion and deflation of soft rock by the wind"],
      ["Alluvial fan", "Deposition by a stream leaving a mountain front"],
      ["Wadi", "Erosion by flash floods"],
      ["Barchan", "Deposition of sand by wind from one direction"],
      ["Playa", "Evaporation of a temporary lake in a basin"],
    ], explanation: "Each landform results from a particular process of wind or water." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "A dry river channel in a desert is a {{blank:a}}. A broad apron formed by overlapping alluvial fans is a {{blank:b}}. A crescent-shaped dune with horns pointing downwind is a {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["wadi"], choices: ["wadi", "playa", "butte"] },
      { id: "b", accepted: ["bajada"], choices: ["bajada", "yardang", "zeugen"] },
      { id: "c", accepted: ["barchan"], choices: ["barchan", "seif", "star dune"] },
    ], explanation: "Wadi, bajada and barchan." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the steep-sided, flat-floored dry valley that is cut by flash floods in a desert.",
    accepted: ["wadi", "a wadi", "arroyo", "an arroyo", "wash"], explanation: "A **wadi** (arroyo) is a desert channel dry between floods." });

  b.num({ d: 2, skill: "APPLICATION", calculator: true, unit: "years",
    stem: "A barchan dune moves downwind at 12 m per year and is 840 m from a road (illustrative data). How many years before it reaches the road, at a constant rate?",
    hints: ["Distance ÷ rate."],
    value: timeYrs, wrong: [10080, 0.014],
    explanation: "840 ÷ 12 = **70 years**. The value 10 080 multiplies the two numbers." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "m³/s",
    stem: "A flash flood in a wadi is 25 m wide, with a mean depth of 0.9 m and a mean velocity of 2.8 m/s (illustrative data). Calculate the discharge, in m³/s.",
    hints: ["Discharge = width × depth × velocity."],
    value: q1, dp: 1, wrong: [28.7, 22.5, 6.3],
    explanation: "25 × 0.9 × 2.8 = **63.0 m³/s**. The value 28.7 adds the three numbers instead of multiplying." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "°",
    stem: "A pediment falls 22 m over a horizontal distance of 600 m (illustrative data). Calculate the angle of the slope, in degrees to one decimal place.",
    hints: ["Angle = tan⁻¹(vertical ÷ horizontal)."],
    value: angle, dp: 1, wrong: [3.7, 27.3, 0.04],
    explanation: "Gradient = 22 ÷ 600 = 0.0367. Angle = tan⁻¹(0.0367) = **2.1°**. The value 3.7 is the gradient as a percentage." });
  b.calc({ d: 3, skill: "APPLICATION", calculator: true,
    stem: "A flash flood has a mean discharge of 63.0 m³/s for 3 hours (illustrative data). Calculate the total volume of water that passes, in m³.",
    hints: ["Convert hours to seconds first (1 hour = 3 600 s)."],
    value: vol, wrong: [189, 680.4],
    explanation: "1. Time = 3 × 3 600 = 10 800 s.\n2. Volume = 63.0 × 10 800 = **680 400 m³**. The value 189 multiplies discharge by hours and forgets to convert to seconds." });

  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why rainfall in a desert often leads to a flash flood.",
    hints: ["Think of the ground surface and the vegetation."],
    points: [
      "Rain falls in short, intense storms, so the amount reaching the ground in a short time exceeds the capacity of the soil to absorb it.",
      "The ground is baked hard, crusted or covered with loose stones, so infiltration is low.",
      "There is little vegetation to intercept the rain or slow the runoff, so water flows rapidly into channels.",
      "Steep mountain slopes and narrow valleys funnel the water, so the flow rises quickly and carries a heavy load.",
    ],
    modelAnswer: "Rain falls in short, intense storms, so more reaches the ground than the soil can absorb. The ground is baked or crusted, so infiltration is low. There is little vegetation to intercept the rain or slow the runoff, so water runs rapidly into channels. Steep slopes and narrow valleys funnel the water, so the flow rises quickly and carries a heavy load.",
    explanation: "Intense rain, low infiltration, little vegetation and steep slopes." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how a barchan dune forms and moves.",
    hints: ["Wind direction, sand supply and slopes."],
    points: [
      "A limited supply of sand is blown by a wind from one direction across a flat surface and accumulates around an obstacle.",
      "Wind pushes grains up the gentle windward slope by saltation, and they fall over the crest onto the steep slip face.",
      "Sand at the edges moves faster, so horns develop downwind, and the dune migrates downwind as sand moves from front to back.",
    ],
    modelAnswer: "A limited supply of sand is blown by a wind from one direction and collects around an obstacle. Wind pushes grains up the gentle windward slope by saltation, and they fall over the crest onto the steep slip face. Sand at the edges moves faster, so horns develop downwind, and the dune migrates downwind.",
    explanation: "A single wind and limited sand shape and move the barchan." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how a mesa and a butte form.",
    hints: ["Use stages from cap rock to butte."],
    points: [
      "A resistant layer of rock (the cap rock) lies on top of weaker horizontal strata.",
      "Streams, flash floods and weathering cut into the edge of the plateau, which retreats parallel to itself (scarp retreat).",
      "A remnant is left isolated as a flat-topped mesa, with steep sides protected by the cap rock.",
      "Continued erosion of its sides reduces the mesa to a smaller, narrower butte, and when the cap rock is removed the butte is lowered.",
    ],
    modelAnswer: "A resistant cap rock lies on top of weaker horizontal strata. Streams, flash floods and weathering cut into the edge of the plateau, which retreats parallel to itself. A remnant is left isolated as a flat-topped mesa with steep sides. Continued erosion reduces the mesa to a smaller, narrower butte, and when the cap rock is removed the butte is lowered.",
    explanation: "Scarp retreat of a plateau with cap rock leaves a mesa and then a butte." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 3,
    stem: "Suggest why alluvial fans are often attractive sites for settlement but also dangerous.",
    hints: ["Think of water and floods."],
    points: [
      "Fans have a supply of groundwater and fertile, well-drained sediment at the foot of mountains, which supports farming and wells.",
      "The gentle slope and the position at the mountain front make them accessible and give access to the water from the mountains.",
      "But flash floods and debris flows can spread over the fan and change course, and so can bury or destroy buildings and roads.",
    ],
    modelAnswer: "Fans have groundwater and fertile, well-drained sediment at the foot of mountains, which supports farming and wells. Their gentle slope makes them accessible. But flash floods and debris flows can spread over the fan and change course, burying or destroying buildings and roads.",
    explanation: "Water supply and soil against flood hazard." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `The position of the crest of a barchan dune was surveyed on a transect in the direction of the wind (illustrative data, invented for this exercise).\n\n${BPTAB}`,
    hints: ["Mean rate = total movement ÷ number of years.", "Think about the two slopes of the dune."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the mean rate of movement of the crest between 2008 and 2020, in metres per year, to one decimal place.", value: meanRate, dp: 1, wrong: [215, 71.7, 17],
        explanation: "(355 − 140) ÷ 12 = 215 ÷ 12 = 17.9 m per year. The value 215 is the total distance moved." }),
      P.manual({ label: "(b)", marks: 3, stem: "Describe the movement of the dune shown in the table.",
        points: [
          "The dune moved steadily downwind, from 140 m to 355 m, a total of 215 m in 12 years.",
          "The rate was almost constant, 18.0 m per year from 2008 to 2012, 18.75 m per year from 2012 to 2016 and 17.0 m per year from 2016 to 2020.",
          "The highest rate was between 2012 and 2016, and the rate fell slightly after that.",
        ],
        modelAnswer: "The dune moved steadily downwind, from 140 m to 355 m, a total of 215 m in 12 years. The rate was almost constant, 18.0 m per year from 2008 to 2012, 18.75 m per year from 2012 to 2016 and 17.0 m per year from 2016 to 2020. The highest rate was between 2012 and 2016, and it fell slightly after that.",
        explanation: "Describe total movement and rates for each period." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain how a barchan dune moves downwind.",
        points: [
          "Wind moves sand grains by saltation and creep up the gentle windward slope.",
          "At the crest the wind speed falls, and the grains avalanche down the steep slip face on the leeward side.",
          "Sand is removed from the windward side and added to the lee side, so the crest and the whole dune move downwind.",
        ],
        modelAnswer: "Wind moves sand grains by saltation and creep up the gentle windward slope. At the crest the wind speed falls and the grains avalanche down the steep slip face on the lee side. Sand is removed from the windward side and added to the lee side, so the whole dune moves downwind.",
        explanation: "Sand moves up the windward slope and falls down the slip face." }),
    ], explanation: "Calculate a rate, describe change and explain the movement of a dune." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `The table shows the discharge of a desert wadi during and after a storm (illustrative data, invented for this exercise).\n\n${HGTAB}`,
    hints: ["Peak ÷ discharge at 00:30.", "Think about infiltration and evaporation."],
    parts: [
      P.group({
        label: "(a)", stem: "Use the table.",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "How many times greater is the peak discharge than the discharge at 00:30, to one decimal place?", value: peakTimes, dp: 1, wrong: [128, 0.1, 11],
            explanation: "140 ÷ 12 = 11.7 times. The value 128 is the difference, 140 − 12." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "How long after the rain began was the peak discharge reached?", options: [
            ["1 hour 30 minutes", "Correct: 140 m³/s at 01:30."],
            ["30 minutes", "Only 12 m³/s at 30 minutes."],
            ["2 hours", "At 02:00 the flow had fallen to 60 m³/s."],
            ["4 hours", "At four hours the flow had stopped."],
          ], answer: "A", explanation: "The highest value, 140 m³/s, is at 01:30." }),
        ],
      }),
      P.manual({ label: "(b)", marks: 3, stem: "Describe the shape of the flood hydrograph.",
        points: [
          "A very rapid rise from 12 m³/s at 00:30 to a peak of 140 m³/s at 01:30.",
          "A quick fall after the peak, to 60 m³/s at 02:00 and 12 m³/s at 03:00.",
          "The flow returns to zero by 04:00, so the whole event lasts about four hours.",
        ],
        modelAnswer: "There is a very rapid rise from 12 m³/s at 00:30 to a peak of 140 m³/s at 01:30. The flow falls quickly, to 60 m³/s at 02:00 and 12 m³/s at 03:00. It returns to zero by 04:00, so the event lasts about four hours.",
        explanation: "Quote the rise, peak and fall with times and figures." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain why the flow stops before the water reaches the sea.",
        points: [
          "Water infiltrates into the dry, permeable channel bed and banks (transmission losses).",
          "High temperatures and low humidity cause rapid evaporation of the water in the channel.",
          "The flow comes from a short storm, so there is no continuing supply, and the volume is used up.",
        ],
        modelAnswer: "Water infiltrates into the dry, permeable channel bed and banks. High temperatures and low humidity cause rapid evaporation. The flow comes from a short storm, so there is no continuing supply and the volume is used up before it reaches the sea.",
        explanation: "Infiltration, evaporation and no continuing supply." }),
      P.manual({ label: "(d)", marks: 3, stem: "Suggest how people could reduce the risk from flash floods in the area.",
        points: [
          "Avoid building houses and roads in wadis and on low parts of fans; use zoning and maps of flood risk.",
          "Install warning systems linked to rain gauges and satellite rainfall data, and educate people about the danger.",
          "Build channels, culverts or diversion walls to guide water away from settlements, and use dams to store flood water.",
        ],
        modelAnswer: "People can avoid building in wadis and on low parts of fans, using zoning and flood-risk maps. Warning systems linked to rain gauges and satellite rainfall data, with education, give time to move. Channels, culverts and diversion walls can guide the water away from settlements, and dams can store flood water.",
        explanation: "Planning, warning and engineering." }),
    ], explanation: "Calculate and interpret a flood hydrograph, explain the flow and suggest management." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the relative importance of wind and water in the formation of desert landforms.",
    hints: ["Give landforms of each kind.", "Consider scale, past climate and frequency."],
    points: [
      "Wind forms dunes (barchan, seif, star), deflation hollows, yardangs, zeugen, ventifacts and rock pedestals, and it dominates in sand seas and dry basins with loose sediment.",
      "Water forms wadis, pediments, mesas, buttes, alluvial fans, bajadas and playas, and probably carves the main valleys and mountain fronts.",
      "Flash floods and sheet floods occur rarely but are very powerful and move much coarse material in a short time, so water is dominant for erosion on a large scale.",
      "Wind is most important where there is a supply of dry, loose sand and silt and where rain is almost absent (for example the Namib sand sea).",
      "Many landforms combine both: wadis are blown full of sand, fans provide sediment for dunes, and playas are the source of dust that is blown away.",
      "Past wetter climates (pluvial periods) shaped much of what is seen today, so some water features are relics.",
      "The balance varies from desert to desert and with scale.",
      "Judgement: water is more important in shaping the larger landforms and the supply of sediment, and wind in the final shaping of sand and dust features, so neither is dominant everywhere.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Wind forms dunes, deflation hollows, yardangs, zeugen and rock pedestals, and it dominates in sand seas and dry basins with loose sediment. Water forms wadis, pediments, mesas, buttes, alluvial fans and playas. Flash floods and sheet floods are rare but powerful and move much coarse material in a short time, so water is dominant for large-scale erosion and for the supply of sediment. Wind is most important where there is a supply of dry, loose sand and almost no rain, as in the Namib sand sea. Many landforms combine both: wadis fill with blown sand, fans provide sediment for dunes, and playas are a source of dust. Past wetter climates shaped much of what is seen today. I conclude that water is more important for the larger landforms and the supply of sediment, and wind for the final shaping of sand and dust features, so neither is dominant everywhere.",
    wordLimit: { max: 300 }, explanation: "Weigh wind and water by landform, scale and climate history, then judge." });

  b.card("DEFINITION", "Flash flood", "A sudden rise of water in a dry channel after intense rain, carrying a heavy load and ending quickly.");
  b.card("DEFINITION", "Pediment", "A gently sloping bedrock surface at the foot of a desert mountain front, formed by sheet floods, stream action and weathering.");
  b.card("CONCEPT", "Wind erosional landforms", "Deflation hollows, ventifacts, rock pedestals, yardangs and zeugen.");
  b.card("CONCEPT", "Dune types", "Barchan (crescent, horns downwind, one wind direction), seif (linear ridge, two wind directions) and star (arms in several directions, grows upwards).");
  b.card("DEFINITION", "Wadi", "A steep-sided, flat-floored dry river channel cut by flash floods; also called an arroyo.");
  b.card("CONCEPT", "Mesa and butte", "Flat-topped hills with a resistant cap rock left by scarp retreat; a mesa is broad, and a butte is smaller and narrower.");
  b.card("CONCEPT", "Alluvial fan and bajada", "A fan of gravel and sand deposited where a stream leaves a mountain front; overlapping fans form a bajada.");
  b.card("CONCEPT", "Playa and salt lake", "A flat bed of silt and salt in an inland basin, left by evaporation of temporary lakes; examples are Etosha Pan and the Makgadikgadi Pans.");
  b.card("FORMULA", "Discharge", "Q (m³/s) = width (m) × mean depth (m) × mean velocity (m/s).");
});
