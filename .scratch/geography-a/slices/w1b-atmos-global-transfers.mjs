// W1b: atmos.global-transfers (both boards). Computed: zero crossing 22.5 + 38/46 x 15 = 34.9; net radiation range 154;
// Dec-Feb share of 623 mm = 390 mm = 62.6%; ITCZ shift 20 degrees = 2 220 km (1 degree of latitude about 111 km).
import { concept, P, geographyLevels, chk, rnd, sum } from "../lib.mjs";
import { mc, tbl } from "../tables/w1b-_q.mjs";

const BANDS = [["0–15°", 50], ["15–30°", 31], ["30–45°", -9], ["45–60°", -52], ["60–75°", -84], ["75–90°", -101]];
const sgn = (v) => (v > 0 ? `+${v}` : `−${Math.abs(v)}`);
const NETTAB = tbl(["Latitude band", "Net radiation (W/m²)"], BANDS.map(([l, v]) => [l, sgn(v)]));
const T12 = [["0–15°", 52], ["15–30°", 34], ["30–45°", -10], ["45–60°", -58]];
const T12TAB = tbl(["Latitude band", "Net radiation (W/m²)"], T12.map(([l, v]) => [l, sgn(v)]));
const cross = rnd(22.5 + (34 / (34 + 10)) * 15, 1, 34.1, "cross");
const T13 = [["0–30°", 40], ["30–60°", -20], ["60–90°", -95]];
const T13TAB = tbl(["Latitude band", "Net radiation (W/m²)"], T13.map(([l, v]) => [l, sgn(v)]));
const spread = chk(40 - -95, 135);
const RAIN = [140, 120, 80, 25, 6, 1, 1, 1, 6, 28, 85, 130];
const MON = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
const RAINTAB = tbl(["Month", ...MON], [["Rainfall (mm)", ...RAIN]]);
const total = chk(sum(RAIN), 623);
const djf = chk(RAIN[11] + RAIN[0] + RAIN[1], 390);
const share = rnd((djf / total) * 100, 1, 62.6, "share");
const km = chk(20 * 111, 2220);

concept("ageo.atmos.global-transfers", { file: "atmos/global-transfers", keyPrefix: "atmos.global-transfers" }, (b) => {
  mc(b, 1, "RECALL", "Which latitudes have a net **surplus** of radiation?", [
    ["Low latitudes, near the equator", "Correct: high sun angles and a thin atmosphere give strong net heating."],
    ["High latitudes, near the poles", "The poles lose more energy than they absorb (a deficit)."],
    ["Only the latitudes of the westerlies", "The surplus or deficit does not depend on a wind belt."],
    ["Every latitude equally", "Net radiation changes strongly with latitude."],
  ], "Low latitudes have a **surplus**; high latitudes have a **deficit**. The balance is at about 35–40°.");
  mc(b, 1, "RECALL", "Which atmospheric cell lies between the equator and about 30° latitude?", [
    ["The Hadley cell", "Correct: warm air rises at the ITCZ and sinks near 30°."],
    ["The Ferrel cell", "The Ferrel cell lies between about 30° and 60°."],
    ["The polar cell", "The polar cell lies between about 60° and the pole."],
    ["The Walker cell", "The Walker cell is an east–west circulation across the tropical Pacific."],
  ], "The **Hadley cell** extends from the equator to the subtropical high at about 30°.");
  mc(b, 2, "UNDERSTANDING", "Why do many hot deserts lie near 30° latitude?", [
    ["Air sinks there, warms and holds its moisture", "Correct: subsidence under the subtropical high gives clear, dry skies."],
    ["Air rises there and condenses into heavy rain", "Rising air and rainfall are found at the ITCZ and at about 60°."],
    ["Warm currents always flow along these coasts", "Some deserts have cold currents offshore; currents are not the main reason."],
    ["Trade winds blow from the poles there", "Trade winds blow towards the equator from the subtropical highs."],
  ], "Descending air under the **subtropical high** warms by compression, so clouds do not form and rainfall is low.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Why does most of Zimbabwe's rain fall between November and March?", [
    ["The ITCZ and low pressure move over it", "Correct: rising moist air produces cloud and rain in the summer half of the year."],
    ["The subtropical high moves over the interior", "The high gives clear, dry weather, which is typical of the cool season."],
    ["The polar front jet stream crosses the country", "The jet affects higher latitudes more than Zimbabwe's summer rains."],
    ["The Benguela Current moves close to the coast", "The Benguela Current is far to the west and does not control summer rains in Zimbabwe."],
  ], "In summer the **ITCZ** and heat low lie over the region; in winter the **subtropical high** dominates.");
  mc(b, 2, "UNDERSTANDING", "How does the cold Benguela Current affect the Namib coast?", [
    ["It cools the air, cutting rainfall and causing fog", "Correct: cooled air is stable and cannot rise to form rain-bearing clouds."],
    ["It warms the air and increases the rainfall", "A cold current cools the air; it does not warm it."],
    ["It brings heavy convectional storms to the coast", "Cool, stable air suppresses convection."],
    ["It has no effect on the climate of this coast", "Ocean currents strongly influence coastal climates."],
  ], "The **Benguela Current** cools the air above it, which makes it stable, so the coast is dry and foggy.");
  mc(b, 3, "APPLICATION", "In which direction do the ocean gyres of the **southern hemisphere** rotate?", [
    ["Anticlockwise", "Correct: the Coriolis deflection makes southern gyres turn anticlockwise."],
    ["Clockwise", "Clockwise is the direction of northern hemisphere gyres."],
    ["West to east only", "Gyres are circular, not simply westerly flows."],
    ["They do not rotate", "Winds and continents force the surface water into rotating gyres."],
  ], "Gyres turn **clockwise** in the northern hemisphere and **anticlockwise** in the southern hemisphere.", { hints: ["The Coriolis effect deflects moving objects to the left in the southern hemisphere."] });
  mc(b, 2, "RECALL", "Which statement about jet streams is correct?", [
    ["They are fast, narrow air currents high up", "Correct: they flow mainly from west to east."],
    ["They are warm ocean currents near the equator", "Ocean currents are in the sea; jet streams are in the air."],
    ["They are surface winds that blow from the east", "Jet streams flow high up, mostly from the west."],
    ["They are belts of rising air near the ITCZ", "That describes the ITCZ, not jet streams."],
  ], "**Jet streams** are fast, narrow currents of air high in the troposphere, mostly flowing west to east.");
  b.tf({ d: 1, skill: "RECALL", stem: "Air sinks at the ITCZ, producing a belt of high pressure.", answer: false,
    feedbackFalse: "Correct: air rises at the ITCZ, producing low pressure, cloud and heavy rainfall.",
    feedbackTrue: "Not so: sinking air is found at about 30° latitude (subtropical highs), not at the ITCZ.",
    explanation: "The **ITCZ** is a belt of rising air and low pressure." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "In the southern hemisphere the trade winds blow from the south-east.", answer: true, daily: true,
    feedbackTrue: "Correct: winds blow from the subtropical high towards the equator and are deflected to the left of their path.",
    feedbackFalse: "Not so: the trades are south-easterlies in the southern hemisphere and north-easterlies in the north.",
    explanation: "The Coriolis effect deflects the equatorward flow, giving **south-east trades** in the southern hemisphere." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "Warm air rises at the {{blank:a}} and sinks at about 30°, forming the subtropical high. The surface winds that return towards the equator are the {{blank:b}}. The ocean current that cools the west coast of southern Africa is the {{blank:c}} Current.",
    blanks: [
      { id: "a", accepted: ["ITCZ"], choices: ["ITCZ", "polar front", "subtropical high"] },
      { id: "b", accepted: ["trade winds"], choices: ["trade winds", "westerlies", "polar easterlies"] },
      { id: "c", accepted: ["Benguela"], choices: ["Benguela", "Agulhas", "Gulf Stream"] },
    ], explanation: "ITCZ, trade winds and the Benguela Current." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each feature to its description.",
    pairs: [
      ["Hadley cell", "Rising air at the ITCZ and sinking air near 30°"],
      ["Polar easterlies", "Cold surface winds blowing away from the poles"],
      ["Agulhas Current", "Warm current flowing south along the east coast of southern Africa"],
      ["North Atlantic Drift", "Warm water that helps to keep north-west Europe mild"],
      ["Subtropical jet stream", "Fast upper-air current near 30° latitude"],
    ], explanation: "Each feature is part of the global transfer of energy." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, dp: 1,
    stem: `Illustrative net radiation by latitude band (one hemisphere):\n\n${T12TAB}\n\nAssume net radiation changes steadily between the mid-points of the 15–30° band (22.5°) and the 30–45° band (37.5°). Calculate the latitude at which net radiation is zero, to 1 decimal place.`,
    hints: ["Find the total change between the two mid-points: 34 − (−10).", "Zero is reached after 34 ÷ 44 of the 15° gap."],
    value: cross, unit: "°", wrong: [30, 36],
    explanation: "1. The change over 15° is 34 − (−10) = 44 W/m².\n2. Zero is reached after 34 ÷ 44 = 0.773 of the way.\n3. Latitude = 22.5° + 0.773 × 15° = **34.1°**.\n4. A value such as 36° or 37.5° (the mid-point of the next band) is wrong because that band already has a deficit." });
  b.num({ d: 2, skill: "APPLICATION", calculator: true,
    stem: `Using the table below, calculate the difference between the largest surplus and the largest deficit, in W/m².\n\n${T13TAB}`,
    value: spread, wrong: [55, 40],
    explanation: "Largest surplus +40; largest deficit −95. Difference = 40 − (−95) = **135 W/m²**. Subtracting wrongly as 95 − 40 gives 55." });
  b.calc({ d: 4, skill: "ANALYSIS", calculator: true, dp: 1, unit: "%",
    stem: `Illustrative monthly rainfall (mm) at a station in the interior of Zimbabwe:\n\n${RAINTAB}\n\nCalculate the percentage of the annual total that falls in December, January and February, to 1 decimal place.`,
    hints: ["Add all twelve months first.", "Then divide the three-month total by the annual total."],
    value: share, wrong: [70.3, 390],
    explanation: `1. Annual total = 140 + 120 + 80 + 25 + 6 + 1 + 1 + 1 + 6 + 28 + 85 + 130 = 623 mm.\n2. December to February = 130 + 140 + 120 = 390 mm.\n3. Share = 390 ÷ 623 × 100 = **62.6%**. The value 70.3% divides by the November to March total (555 mm) instead of the annual total.` });
  b.short({ d: 1, skill: "RECALL", stem: "Name the cold ocean current that flows north along the west coast of southern Africa.",
    accepted: ["Benguela", "Benguela Current", "the Benguela Current"], wrong: ["Agulhas"],
    explanation: "The **Benguela Current** carries cold water towards the equator along the west coast." });
  b.short({ d: 2, skill: "RECALL", stem: "Name the belt of low pressure and heavy rainfall where the trade winds from the two hemispheres meet.",
    accepted: ["ITCZ", "the ITCZ", "intertropical convergence zone", "inter-tropical convergence zone", "intertropical convergence"], wrong: ["polar front"],
    explanation: "The **Intertropical Convergence Zone (ITCZ)** is where the trades converge and air rises." });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why the polar regions have a radiation deficit.",
    hints: ["Think about the angle of the Sun, the path through the atmosphere and the surface."],
    points: [
      "The Sun is low in the sky, so insolation is spread over a large area and is weaker per square metre.",
      "Radiation passes through a thicker layer of atmosphere, so more is reflected, scattered or absorbed before it reaches the surface.",
      "Snow and ice have a high albedo and reflect much of what arrives, while the surface still loses longwave radiation, so outputs exceed inputs.",
    ],
    modelAnswer: "At the poles the Sun is low, so the same energy is spread over a large area and passes through more atmosphere. Snow and ice reflect much of it. The surface still emits longwave radiation, so energy lost is greater than energy gained.",
    explanation: "Low sun angle, long path and high albedo reduce inputs, while longwave loss continues." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how the Hadley cell transfers energy from the equator towards higher latitudes.",
    hints: ["Start with the air at the ITCZ and follow it round the cell."],
    points: [
      "Strong heating near the equator makes moist air rise at the ITCZ, carrying heat upwards (sensible heat and latent heat released on condensation).",
      "At the top of the troposphere the air flows poleward, carrying this energy to about 30°.",
      "The air cools, becomes dense and sinks near 30° (subtropical high), releasing heat to the lower atmosphere.",
      "Surface winds (the trades) return towards the equator, completing the cell.",
    ],
    modelAnswer: "Air heated at the equator rises at the ITCZ, carrying sensible heat and latent heat upwards. It flows poleward at high level to about 30°, where it cools and sinks, giving up energy to the lower atmosphere. At the surface the trade winds return it to the equator. The cell therefore moves energy poleward.",
    explanation: "The cell moves energy vertically (rising air) and laterally (poleward flow aloft)." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4,
    stem: `Illustrative net radiation by latitude band (one hemisphere):\n\n${NETTAB}\n\nDescribe the pattern shown in the table.`,
    hints: ["Say where the surplus is and where it changes to a deficit.", "Quote figures with units."],
    points: [
      "Net radiation decreases steadily from the equator to the pole.",
      "There is a surplus in the low latitudes (+50 W/m² at 0–15° and +31 W/m² at 15–30°).",
      "It changes to a deficit between 30° and 45° (−9 W/m² at 30–45°).",
      "The deficit increases poleward and is greatest at 75–90° (−101 W/m²).",
    ],
    modelAnswer: "Net radiation falls from the equator to the pole. There is a surplus of +50 W/m² at 0–15° and +31 W/m² at 15–30°, which changes to a deficit of −9 W/m² at 30–45°. The deficit grows to −101 W/m² at 75–90°.",
    explanation: "Describe the trend, the crossing point and the extreme values with figures." });

  b.struct({ d: 4, skill: "ANALYSIS",
    stem: "The table gives illustrative data for two coastal stations on opposite coasts of southern Africa.\n\n" + tbl(["", "Station P (west coast)", "Station Q (east coast)"], [["Mean annual rainfall (mm)", 15, 1010], ["Mean annual temperature (°C)", 16.5, 21.0], ["Days with fog per year", 120, 10]]),
    hints: ["Subtract the smaller value from the larger value.", "Think about which currents flow off each coast."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the difference in mean annual rainfall between Q and P, in mm.", value: chk(1010 - 15, 995), unit: "mm", wrong: [1025, 75],
        explanation: "1010 − 15 = 995 mm." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate how much cooler P is than Q, in °C.", value: chk(21.0 - 16.5, 4.5), unit: "°C", wrong: [37.5, 5],
        explanation: "21.0 − 16.5 = 4.5 °C." }),
      P.short({ label: "(c)", stem: "Name the ocean current most likely to be flowing offshore of Station P.", accepted: ["Benguela", "Benguela Current", "the Benguela Current"],
        explanation: "A cold current flows north along the west coast: the Benguela Current." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why Station P is much drier and foggier than Station Q.",
        points: [
          "The cold current cools the air above it, making the air stable so it cannot rise to form rain clouds.",
          "Moist air cooled from below condenses at the surface to form fog.",
          "Station Q is beside a warm current with warm, moist air from the Indian Ocean that gives rain.",
        ],
        modelAnswer: "The cold current at P cools the air above it, making it stable, so convectional rain does not form and the cooled, moist air produces fog. Station Q is beside a warm current and receives warm, moist air which is unstable, so rainfall is high.",
        explanation: "Cold currents cause stable, dry, foggy coasts; warm currents the opposite." }),
    ], explanation: "Compare the two stations and link the differences to ocean currents." });

  b.struct({ d: 4, skill: "ANALYSIS",
    stem: "Illustrative data for a station at 17° S and for the mean position of the ITCZ over southern Africa (° S means south of the equator, ° N north).\n\n" + tbl(["", "January", "April", "July", "October"], [["ITCZ position", "15° S", "5° S", "5° N", "5° S"], ["Station rainfall (mm)", 210, 45, 1, 30]]),
    hints: ["Between 15° S and 5° N the ITCZ crosses the equator.", "One degree of latitude is about 111 km."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the number of degrees of latitude the ITCZ moves between January and July.", value: chk(15 + 5, 20), unit: "°", wrong: [10, 5],
        explanation: "From 15° S to 5° N crosses the equator: 15 + 5 = 20°." }),
      P.num({ label: "(b)", marks: 2, stem: "Taking one degree of latitude as 111 km, calculate this distance in kilometres.", value: km, unit: "km", wrong: [111, 1110],
        explanation: "20 × 111 = 2 220 km." }),
      P.mcq({ label: "(c)", stem: "Which pressure system dominates the station in July?", options: [
        ["The subtropical high", "Correct: sinking air gives clear, dry weather in the cool season."],
        ["The ITCZ low", "The ITCZ is far north of the station in July."],
        ["A polar low", "Polar lows are not typical of Zimbabwe."],
        ["The equatorial trough", "The trough lies near the ITCZ, which has moved north."],
      ], answer: "A", explanation: "In July the subtropical high lies over the station." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why the station's rainfall is highest in January.",
        points: [
          "The overhead Sun and the ITCZ are at their furthest south, close to the station (15° S).",
          "Strong heating of the land produces low pressure and convergence, so moist air rises.",
          "Rising air cools, condenses and produces cloud and convectional rainfall (210 mm).",
        ],
        modelAnswer: "In January the ITCZ is at 15° S, near the station. The heated land has low pressure and air converges and rises, cools and condenses, giving heavy convectional rain.",
        explanation: "Link the ITCZ position to rising air and condensation." }),
      P.manual({ label: "(e)", marks: 4, stem: "Explain why the ITCZ moves much further from the equator over land than over the oceans.",
        points: [
          "Land heats up faster than water because it has a lower heat capacity.",
          "Water mixes the heat through a deep layer and loses energy by evaporation, so ocean temperatures change slowly.",
          "The hottest land therefore moves far into the summer hemisphere, creating strong low pressure there.",
          "The ITCZ follows this low pressure, so it extends further from the equator over continents.",
        ],
        modelAnswer: "Land heats faster than the sea because it has a lower heat capacity, while the ocean mixes and stores heat and uses energy in evaporation. The land in the summer hemisphere becomes much hotter and develops strong low pressure. The ITCZ is drawn towards this low pressure, so it lies further from the equator over continents.",
        explanation: "Differential heating of land and sea explains the shape of the ITCZ." }),
    ], explanation: "Calculate the ITCZ shift, then explain the rainfall season and the movement over land." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the importance of ocean currents in transferring energy from the tropics to higher latitudes.",
    hints: ["Give the role of the oceans with examples, then the role of the atmosphere.", "Reach a judgement."],
    points: [
      "Warm currents carry large amounts of energy poleward because water has a high heat capacity.",
      "Example: the North Atlantic Drift keeps north-west Europe milder than other places at similar latitudes.",
      "Cold currents move cold water towards the equator, which cools coasts (Benguela) and affects rainfall.",
      "Deep ocean circulation (sinking cold water at high latitudes) also moves heat slowly.",
      "The atmosphere moves energy quickly by winds, cells and jet streams, and by latent heat in storms.",
      "The atmosphere carries the larger share at many latitudes, while the ocean is more important in the tropics.",
      "Atmosphere and oceans interact: winds drive currents and currents change the air above (El Niño).",
      "Judgement: the oceans are very important, especially regionally, but the atmosphere is the faster and often larger transport, so both are needed to balance the budget.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Ocean currents are important because water holds a great deal of heat. Warm currents such as the Agulhas and the North Atlantic Drift carry energy poleward, making coasts such as north-west Europe milder than their latitude suggests, while cold currents such as the Benguela cool coasts and reduce rainfall. Deep circulation also redistributes heat slowly. However, the atmosphere moves energy faster, through the Hadley, Ferrel and polar cells, jet streams and the release of latent heat in storms, and at many latitudes it carries the larger share. The two systems are linked, since winds drive surface currents and currents change the air above them. I conclude that the oceans are highly significant, particularly for regional climates and in the tropics, but the atmosphere transports a greater share overall, so neither could balance the budget alone.",
    wordLimit: { max: 300 }, explanation: "Weigh ocean transfers against atmospheric ones, using examples." });

  b.card("DEFINITION", "Radiation surplus and deficit", "Surplus: more shortwave absorbed than longwave lost (low latitudes). Deficit: the opposite (high latitudes). The balance is at about 35-40°.");
  b.card("CONCEPT", "Tri-cellular model", "Hadley cell (0-30°), Ferrel cell (30-60°) and polar cell (60-90°) in each hemisphere; air rises at about 0° and 60° and sinks at about 30° and the poles.");
  b.card("DEFINITION", "ITCZ", "Intertropical Convergence Zone: belt of rising air, low pressure and heavy rain where the trades meet; it follows the overhead Sun with a lag.");
  b.card("FACT", "Trade winds in the southern hemisphere", "Blow from the south-east towards the equator, deflected to the left by the Coriolis effect.");
  b.card("DEFINITION", "Jet stream", "A narrow, fast current of air in the upper troposphere (often over 100 km/h) flowing mainly from west to east.");
  b.card("DEFINITION", "Ocean gyre", "A large circular current system: clockwise in the northern hemisphere, anticlockwise in the southern.");
  b.card("FACT", "Benguela and Agulhas Currents", "Benguela: cold, flows north on the west coast of southern Africa (dry, foggy Namib coast). Agulhas: warm, flows south on the east coast.");
  b.card("CONCEPT", "Why deserts lie near 30°", "Air sinks under the subtropical high, warms and becomes dry, so skies are clear and rainfall is low.");
  b.card("CONCEPT", "Zimbabwe's rainy season and the ITCZ", "From about November to March the ITCZ and low pressure lie over the interior, giving rain; in winter the subtropical high gives dry weather.");
});
