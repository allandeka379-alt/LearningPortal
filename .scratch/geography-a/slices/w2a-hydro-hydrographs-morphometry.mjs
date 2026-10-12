// W2a: hydro.hydrographs-morphometry (both boards; morphometry and hypothesis testing are ZIMSEC detail). Numbers computed: lag time,
// peak and rise rate, bifurcation ratio, drainage density, stream frequency (see tables/w2a-hydro-hydrographs-morphometry.mjs).
import { concept, P, geographyLevels, chk, rnd, mean, sum, lagTime, bifurcationRatio, drainageDensity, ZIM } from "../lib.mjs";
import { mc, tbl } from "../tables/w2a-_q.mjs";

// Struct 1 storm data
const T = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const RAIN = [0, 5, 14, 24, 9, 0, 0, 0, 0, 0, 0, 0];
const Q = [3, 3, 3, 5, 8, 16, 27, 22, 15, 9, 6, 4];
const STORMTAB = tbl(["Time (h)", ...T], [["Rainfall (mm/h)", ...RAIN], ["Discharge (m³/s)", ...Q]]);
const peakQ = chk(Math.max(...Q), 27);
const lag1 = chk(lagTime(RAIN.indexOf(Math.max(...RAIN)), Q.indexOf(peakQ)), 3);
const rise = chk((Q[6] - Q[4]) / 2, 9.5);
// Struct 2 morphometry (ZIMSEC)
const N = [48, 11, 3, 1];
const AREA = 42;
const LEN = 75.6;
const rbs = [0, 1, 2].map((i) => bifurcationRatio(N[i], N[i + 1]));
const rbMean = rnd(mean(rbs), 2, 3.68, "rbMean");
const dd = chk(drainageDensity(LEN, AREA), 1.8, 1e-9);
const freq = chk(sum(N) / AREA, 1.5, 1e-9);
const MORPH = tbl(["Stream order", "1", "2", "3", "4"], [["Number of streams", ...N]]);
// Annual regime for a manual item
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MQ = [34, 52, 44, 15, 8, 6, 5, 4, 4, 5, 11, 23];
const REGIME = tbl(["Month", ...MONTHS], [["Mean discharge (m³/s)", ...MQ]]);
chk(Math.max(...MQ) / Math.min(...MQ), 13);

concept("ageo.hydro.hydrographs-morphometry", { file: "hydro/hydrographs-morphometry", keyPrefix: "hydro.hydrographs-morphometry" }, (b) => {
  mc(b, 1, "RECALL", "What is **lag time** on a storm hydrograph?", [
    ["The time from peak rainfall to peak discharge", "Correct: it is the delay between the heaviest rain and the highest flow."],
    ["The time from the start of the rain to the end of the flood", "Lag time is not the duration of the whole storm event."],
    ["The time between two successive peaks of rainfall", "That is the interval between rainfall peaks, not the lag."],
    ["The time between the start of the rising limb and the peak", "That is the time to peak, measured within the discharge curve."],
  ], "**Lag time** = time of peak discharge − time of peak rainfall.");
  mc(b, 2, "UNDERSTANDING", "What does the **rising limb** of a storm hydrograph show?", [
    ["Discharge increasing as stormflow reaches the channel", "Correct: overland flow and throughflow arrive in the river."],
    ["Discharge decreasing as the river returns to baseflow", "That is the falling (recession) limb."],
    ["Rainfall increasing during the storm event", "Rainfall is shown separately, as bars."],
    ["The level of the groundwater before the storm began", "Pre-storm flow is baseflow."],
  ], "The rising limb shows **discharge increasing** as stormflow arrives.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which change is most likely to shorten the lag time of a river?", [
    ["Replacing woodland with paved surfaces and drains", "Correct: water reaches the channel faster."],
    ["Planting woodland across the whole of the basin", "Woodland slows water and lengthens the lag."],
    ["Draining a wetland into the river by a long bypass", "This lengthens the path or has uncertain effects on the lag."],
    ["Building a reservoir at the head of the main river", "Storage delays and reduces the peak flow."],
  ], "Urbanisation produces **flashier** hydrographs with a short lag time and high peak.", { daily: true });
  mc(b, 2, "RECALL", "Two first-order streams join. What is the order of the stream below the confluence?", [
    ["Second order", "Correct: only a junction of two streams of equal order raises the order."],
    ["First order", "The order rises when two streams of the same order meet."],
    ["Third order", "Third order needs two second-order streams to join."],
    ["Zero order", "There is no zero order in the Strahler system."],
  ], "Two streams of order *n* join to make a stream of order *n* + 1.");
  mc(b, 3, "APPLICATION", "A Zimbabwean river has its highest mean monthly flow in February and its lowest in September. Which explanation fits best?", [
    ["The wet season is November to March; baseflow is lowest in the late dry season", "Correct: runoff follows the rains and groundwater is depleted by September."],
    ["Snowmelt in the highlands peaks in February and floods the rivers each year", "There is no seasonal snowmelt in Zimbabwe."],
    ["Evapotranspiration is lowest in February, so little water is lost to the air", "Evapotranspiration is high in the hot wet season."],
    ["Rain falls evenly in every month, so flow depends mainly on the tide", "Rainfall is strongly seasonal and rivers are not tidal inland."],
  ], "Zimbabwe has a **summer rainfall** regime; flow peaks in January-March and is lowest at the end of the dry season.", { hints: ["When is the rainy season?"] });
  mc(b, 3, "UNDERSTANDING", "A mean bifurcation ratio of 4 means that, on average:", [
    ["There are four streams of one order for each stream of the next order up", "Correct: Rb = N(u) ÷ N(u+1)."],
    ["Each stream is four kilometres long on average", "Bifurcation ratio is a ratio of numbers, not a length."],
    ["There are four tributaries joining each main river", "It compares counts of streams of successive orders."],
    ["The basin receives four times the rainfall of its neighbour", "Rainfall is not part of the ratio."],
  ], "The bifurcation ratio compares the **number** of streams in successive orders.", { hints: ["It is a ratio of two numbers of streams."] });
  mc(b, 4, "ANALYSIS", "Two basins receive the same storm. Basin X has a lower peak and a longer lag time than basin Y. Which description of X is most likely?", [
    ["Elongated, wooded and with permeable soils", "Correct: all of these slow the arrival of water."],
    ["Circular, paved and with a high drainage density", "These factors give a flashy hydrograph like basin Y."],
    ["Steep and bare, with saturated clay soils", "Steep bare saturated land gives a quick response."],
    ["Small and urban, with a dense network of storm drains", "Urban drains speed up runoff, giving a short lag."],
  ], "Elongated shape, woodland and permeable soils all give a **long lag and low peak**.", { hints: ["Which factors slow water down?"] });

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Lag time is measured from the start of the rainfall to the peak of discharge.", answer: false,
    feedbackFalse: "Correct: it is measured from the peak of rainfall to the peak of discharge.", feedbackTrue: "Not so: lag time starts at the rainfall peak.",
    explanation: "Lag time runs from the **peak** of rainfall to the **peak** of discharge." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Saturated soil before a storm usually gives a higher peak discharge than dry soil.", answer: true,
    feedbackTrue: "Correct: saturated soil cannot absorb more rain, so more runs off.", feedbackFalse: "Not so: saturated soil absorbs little more water.",
    explanation: "Saturated soil has little spare capacity, so more rainfall becomes overland flow." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term to its meaning.",
    pairs: [
      ["Baseflow", "Steady flow fed by groundwater before a storm"],
      ["Peak discharge", "The highest flow during a storm"],
      ["Falling limb", "Discharge decreasing as stormflow drains away"],
      ["Drainage density", "Total channel length divided by basin area"],
      ["Bifurcation ratio", "Number of streams of one order divided by number in the next order"],
    ], explanation: "These are the main hydrograph and morphometry terms." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "A graph of discharge against time is a {{blank:a}}. A short lag time and high peak make a {{blank:b}} hydrograph. Streams with no tributaries are {{blank:c}} order.",
    blanks: [
      { id: "a", accepted: ["hydrograph"], choices: ["hydrograph", "histogram", "isoline"] },
      { id: "b", accepted: ["flashy"], choices: ["flashy", "gentle", "constant"] },
      { id: "c", accepted: ["first"], choices: ["first", "second", "fourth"] },
    ], explanation: "A hydrograph shows discharge over time; urban basins have flashy hydrographs; headwater streams are first order." });
  b.short({ d: 1, skill: "RECALL", stem: "Give the unit used for river discharge.",
    accepted: ["m3/s", "m³/s", "cumecs", "cubic metres per second", "cumec", "m3 per second"], explanation: "Discharge is measured in **cubic metres per second (m³/s, cumecs)**." });

  const lag = chk(15.5 - 11, 4.5);
  b.num({ d: 2, skill: "APPLICATION", calculator: true, unit: "h", daily: true,
    stem: "Rainfall in a storm peaked at 11:00 and the river's discharge peaked at 15:30 on the same day. Calculate the lag time, in hours.",
    value: lag, wrong: [4.3, 15.5],
    explanation: "Lag time = 15:30 − 11:00 = **4.5 hours**. The value 4.3 results from reading 30 minutes as 0.3 hours." });
  const rb2 = rnd(mean([45 / 12, 12 / 3]), 1, 3.9, "rb2");
  b.calc({ d: 3, skill: "APPLICATION", calculator: true,
    stem: "A basin has 45 first-order, 12 second-order and 3 third-order streams. Calculate the mean bifurcation ratio, to 1 decimal place.",
    hints: ["Rb = N(u) ÷ N(u+1) for each pair of orders.", "Then take the mean of the two ratios."],
    value: mean([45 / 12, 12 / 3]), dp: 1, wrong: [3.75, 7.75],
    explanation: "1. Rb(1-2) = 45 ÷ 12 = 3.75.\n2. Rb(2-3) = 12 ÷ 3 = 4.0.\n3. Mean = (3.75 + 4.0) ÷ 2 = 3.875 = **3.9** (1 d.p.). The value 7.75 is the sum rather than the mean." });
  const ddq = chk(drainageDensity(91.2, 38), 2.4, 1e-9);
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "km/km²",
    stem: "A basin of 38 km² has channels with a total length of 91.2 km. Calculate the drainage density, to 1 decimal place.",
    hints: ["Drainage density = total channel length ÷ area."],
    value: ddq, dp: 1, wrong: [0.42, 3466],
    explanation: "Drainage density = 91.2 ÷ 38 = **2.4 km/km²**. The value 0.42 is 38 ÷ 91.2." });

  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: `The table shows the mean monthly discharge of a Zimbabwean river (illustrative data, invented for this exercise).\n\n${REGIME}\n\nDescribe the river regime.`,
    hints: ["Give the peak month and value, the minimum, and the ratio between them."],
    points: [
      "Discharge peaks in February at 52 m³/s, during the rainy season.",
      "Discharge is lowest in August and September at 4 m³/s, 13 times lower than the peak (a large seasonal range).",
      "Discharge rises from November (11 m³/s) and falls steadily from March to a dry-season minimum (a single-peak summer regime).",
    ],
    modelAnswer: "The regime has a single peak in February, at 52 m³/s, in the wet season. Flow falls steadily from March to a minimum of 4 m³/s in August and September, which is 13 times lower, and then rises again from November (11 m³/s).",
    explanation: "Quote the peak, minimum and shape of the regime." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why urbanisation shortens the lag time of a river.",
    hints: ["Think about infiltration and how water gets to the channel."],
    points: [
      "Impermeable surfaces (roofs, roads) stop infiltration, so more rain becomes overland flow.",
      "Storm drains and gutters carry the water straight to the river.",
      "Flow over smooth surfaces and in pipes is faster than flow through soil.",
      "Water from the whole urban area arrives at the river at about the same time, so the peak is high and early.",
    ],
    modelAnswer: "Roofs and roads are impermeable, so little rain soaks in and most becomes overland flow. Drains and gutters carry this water directly to the river at high speed, much faster than flow through soil. Water from all parts of the town therefore reaches the river together, giving a short lag time and a high peak.",
    explanation: "Impermeable surfaces and drains speed up runoff." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why saturated soil gives a higher peak discharge.",
    hints: ["Think about the soil's capacity to absorb water."],
    points: [
      "Saturated soil has no spare storage, so little more rain can infiltrate.",
      "The extra rainfall becomes saturation overland flow and quickly reaches the channel.",
      "More water arrives in a short time, so the peak is higher and the lag shorter.",
    ],
    modelAnswer: "Saturated soil cannot absorb more water, so most of the new rain runs over the surface as saturation overland flow. It reaches the channel quickly, so the peak discharge is higher and the lag time is shorter.",
    explanation: "Saturation increases overland flow." });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe the parts of a storm hydrograph.",
    points: [
      "Baseflow: steady discharge from groundwater before the storm.",
      "Rising limb: discharge increases rapidly to a peak; falling limb: discharge declines back towards baseflow.",
      "Peak discharge is the highest flow, and lag time is the interval from the rainfall peak to the discharge peak.",
    ],
    modelAnswer: "Before the storm the river carries baseflow. The rising limb shows discharge increasing to a peak, and the falling limb shows it declining as stormflow drains away. The lag time is the time between the rainfall peak and the discharge peak.",
    explanation: "Name each part and say what it shows." });

  b.struct({ d: 3, skill: "ANALYSIS", examStyle: true,
    stem: `Rainfall and discharge were recorded hourly for a storm on a river in Zimbabwe (illustrative data, invented for this exercise).\n\n${STORMTAB}`,
    hints: ["Lag time = hour of peak discharge − hour of peak rainfall.", "Rate of rise = change in discharge ÷ time."],
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "State the peak discharge, in m³/s.", value: peakQ, unit: "m³/s", wrong: [22, 6],
        explanation: "The highest value of discharge is 27 m³/s (hour 6)." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the lag time, in hours.", value: lag1, unit: "h", wrong: [2, 6],
        explanation: "Peak rainfall at hour 3 (24 mm/h); peak discharge at hour 6. Lag = 6 − 3 = 3 hours." }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the mean rate of rise of discharge between hour 4 and hour 6, in m³/s per hour.", value: rise, wrong: [19, 4.75],
        explanation: "(27 − 8) ÷ 2 = 9.5 m³/s per hour." }),
      P.mcq({ label: "(d)", stem: "Which factor would be most likely to shorten the lag time for a storm like this?", options: [
        ["Replacing farmland with a paved town", "Correct: impermeable surfaces speed up runoff."],
        ["Planting trees across the basin", "Trees increase interception and slow runoff."],
        ["Building a dam across the river", "A dam stores water and delays the peak."],
        ["Reducing the storm's rainfall", "A lighter storm would reduce the peak but not necessarily the lag."],
      ], answer: "A", explanation: "Urbanisation shortens lag time." }),
      P.manual({ label: "(e)", marks: 3, stem: "Explain why the discharge continues to rise after the rainfall has stopped.",
        points: [
          "Water takes time to reach the river from distant parts of the basin.",
          "Throughflow and slower overland flow from higher or more distant slopes continue to arrive after the rain.",
          "So discharge keeps rising until the water from the whole basin has arrived (lag time).",
        ],
        modelAnswer: "Water from distant parts of the basin takes time to reach the river. Throughflow and slower overland flow from higher slopes keep arriving after the rain has stopped, so discharge goes on rising until water from the whole basin has arrived.",
        explanation: "Travel time explains the lag." }),
    ], explanation: "Read the hydrograph, calculate and explain." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, applies: ZIM,
    stem: `A map extract of a basin of ${AREA} km² shows the following streams. The total length of all the streams is ${LEN} km (illustrative data, invented for this exercise).\n\n${MORPH}`,
    hints: ["Rb = N(u) ÷ N(u+1); take the mean of the three ratios.", "Stream frequency uses the number of streams."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the mean bifurcation ratio, to 2 decimal places.", value: mean(rbs), dp: 2, wrong: [11.03, 3.67],
        explanation: "48 ÷ 11 = 4.36; 11 ÷ 3 = 3.67; 3 ÷ 1 = 3.00. Mean = (4.36 + 3.67 + 3.00) ÷ 3 = 3.68." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the drainage density, in km/km².", value: dd, dp: 1, unit: "km/km²", wrong: [0.56, 3175],
        explanation: "75.6 ÷ 42 = 1.8 km/km²." }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the stream frequency, in streams per km², to 1 decimal place.", value: freq, dp: 1, wrong: [63, 0.67],
        explanation: "Total streams = 48 + 11 + 3 + 1 = 63. 63 ÷ 42 = 1.5 per km²." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain how a high drainage density affects the storm hydrograph of a basin.",
        points: [
          "Many channels mean that water has a short distance to travel to a channel.",
          "Channel flow is faster than overland flow and throughflow, so water reaches the main river quickly.",
          "The lag time is short and the peak is high (a flashy hydrograph).",
        ],
        modelAnswer: "A high drainage density means water has only a short distance to flow to reach a channel, and flow in channels is faster than flow over land or through soil. Water arrives at the outlet in a short time, so the lag time is short and the peak is high.",
        explanation: "Dense channels speed up the response." }),
      P.manual({ label: "(e)", marks: 3, stem: "Suggest why drainage density measured from a map may differ from the real value.",
        points: [
          "Small and seasonal streams may not be shown at the scale of the map, so the length is under-estimated.",
          "Different people may decide differently where a stream begins (the source) and which are permanent.",
          "Measuring winding channels with a straight ruler or a piece of string gives errors; the scale and the date of the map may also differ from present conditions.",
        ],
        modelAnswer: "Small and seasonal channels may not appear on the map, so the length is too low. People differ in deciding where a stream begins, and measuring winding channels is difficult. The map may also be old or at a small scale.",
        explanation: "Map scale, definition and measuring errors affect morphometry." }),
    ], explanation: "Calculate morphometric measures and interpret them." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the importance of land use compared with rock type in explaining differences between storm hydrographs.",
    hints: ["Describe how each affects infiltration and speed.", "Compare, then judge."],
    points: [
      "Land use: urban surfaces are impermeable, so there is more overland flow, a short lag time and a high peak.",
      "Woodland and crops increase interception and infiltration and lengthen the lag.",
      "Land use is changed by people (urbanisation, deforestation) and can therefore alter hydrographs within a few years.",
      "Rock type: permeable rock stores water, reducing the peak and increasing baseflow; impermeable rock produces rapid runoff.",
      "Rock type also controls soil texture and drainage density in the long term.",
      "Other factors such as storm intensity, antecedent soil moisture, slope and basin shape also matter.",
      "On very impermeable rock, such as granite with thin soils, land use may make little difference.",
      "Judgement: rock type sets the natural response, but land use is more important where it has changed greatly, such as in urbanising basins.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Rock type sets the natural response of a basin. Permeable rock stores water and gives a low peak and high baseflow, whereas impermeable rock produces rapid runoff and a flashy hydrograph. Land use can modify this strongly: paved surfaces and drains in a town give a short lag time and high peak, and woodland slows runoff. Land use changes quickly through human action, while rock type is fixed. However, where the rock is already very impermeable, land use may add little. I conclude that rock type is the underlying control, but land use is the more important factor where a basin is being urbanised or deforested.",
    wordLimit: { max: 300 }, explanation: "Weigh natural and human controls on hydrograph shape." });

  b.card("DEFINITION", "Hydrograph", "A graph of river discharge against time: an annual hydrograph shows the regime; a storm hydrograph shows the response to one rainfall event.");
  b.card("CONCEPT", "Parts of a storm hydrograph", "Baseflow, rising limb, peak discharge, falling (recession) limb and lag time.");
  b.card("FORMULA", "Lag time", "Lag time = time of peak discharge − time of peak rainfall.");
  b.card("CONCEPT", "Factors giving a flashy hydrograph", "Urban surfaces, impermeable rock, saturated or compacted soil, steep slope, intense rain, circular shape, high drainage density, sparse vegetation.");
  b.card("DEFINITION", "Strahler stream order", "First order: streams with no tributaries. Two streams of the same order make the next order; a lower order joining does not change the order.");
  b.card("FORMULA", "Bifurcation ratio", "Rb = number of streams of order u ÷ number of order u + 1; usually 3-5; take the mean for a basin.");
  b.card("FORMULA", "Drainage density and stream frequency", "Drainage density = total channel length ÷ basin area (km/km²). Stream frequency = number of streams ÷ basin area (per km²).");
  b.card("FACT", "Zimbabwean river regime", "Single peak in the wet season (January-March) and a minimum at the end of the dry season (September-October); many small streams dry up.");
  b.card("CONCEPT", "Testing a rainfall-discharge hypothesis", "State the null hypothesis, calculate Spearman's rs, compare with the critical value (for n = 8, 0.738 at 0.05), and conclude in words.");
});
