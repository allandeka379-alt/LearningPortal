// Slice G1a: air masses, air streams affecting Zimbabwe and the ITCZ.
import { concept, P, geographyLevels } from "../lib.mjs";

const AM = "| Air mass (fictional observations) | Temperature at source (°C) | Humidity at source |\n|---|---|---|\n| W | 28 | Very high |\n| X | 34 | Very low |\n| Y | 6 | High |\n| Z | −20 | Very low |";

concept("geo.weather.air-masses", { file: "weather/air-masses", keyPrefix: "weather.air-masses" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is an **air mass**?",
    options: [
      ["A huge body of air with uniform temperature and humidity", "Correct: it gains these from its source region."],
      ["A narrow band of very strong wind high in the atmosphere", "That describes a jet stream."],
      ["The sloping boundary between warm air and cold air", "That boundary is a front."],
      ["A small column of rising air over strongly heated ground", "That is a convection current or thermal."],
    ],
    answer: "A",
    explanation: "An **air mass** is a very large body of air, often over 1,000 km across, with roughly uniform temperature and humidity.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "An air mass that formed over a hot desert would be classified as:",
    options: [
      ["Tropical continental", "Correct: low latitude (tropical) and over land (continental)."],
      ["Tropical maritime", "Maritime air forms over the sea and is moist."],
      ["Polar continental", "Polar air forms in high latitudes and is cold."],
      ["Polar maritime", "This air is cool and moist, formed over cold seas."],
    ],
    answer: "A",
    explanation: "Hot desert = low latitude (tropical, T) and land (continental, c): **cT**, hot and dry.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What happens to air at the **ITCZ**?",
    options: [
      ["Trade winds converge and the air is forced to rise", "Correct: rising air cools, condenses and gives heavy rain."],
      ["Air sinks from high levels and spreads out at the surface", "Sinking and diverging air is typical of high pressure, not the ITCZ."],
      ["Cold polar air meets warm tropical air", "That is the polar front of the mid-latitudes."],
      ["Air stays completely still for months", "The ITCZ has calm spells (doldrums) but strong rising currents and storms."],
    ],
    answer: "A",
    explanation: "At the ITCZ the trade winds **converge**, so air rises, forming cumulonimbus and heavy rain.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Where does the ITCZ lie over Africa in **July**?",
    options: [
      ["Across West Africa and the Sahel", "Correct: it follows the overhead sun north in the northern summer."],
      ["Across Zimbabwe and Zambia", "This is roughly its position in January."],
      ["Exactly along the equator", "It moves with the seasons and is well north of the equator in July."],
      ["Over the Cape in South Africa", "The ITCZ never reaches so far south."],
    ],
    answer: "A",
    explanation: "In July the ITCZ lies roughly **15-20° N** over West Africa, so Zimbabwe has its dry season.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which air stream brings **guti** to the Eastern Highlands in the cool season?",
    options: [
      ["The south-east trade winds", "Correct: moist air from the Indian Ocean is forced up the east-facing slopes."],
      ["The north-west Congo air", "Congo air arrives in the rainy season, not the cool season."],
      ["The north-east monsoon", "The monsoon reaches the region in the southern summer."],
      ["Polar continental air from Siberia", "Siberian air never reaches southern Africa."],
    ],
    answer: "A",
    explanation: "Cool, moist **south-east trades** rise over the Eastern Highlands, giving mist and drizzle (guti).",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which air stream brings warm, very moist, unstable air and heavy, widespread rain to northern and western Zimbabwe in mid-summer?",
    options: [
      ["North-west airflow from the Congo basin", "Correct: Congo air is drawn south when the ITCZ is over the region."],
      ["Dry continental air from the Kalahari", "Continental air is dry and brings little rain."],
      ["The south-east trades in July", "In July the trades are shallow and cool and the plateau is dry."],
      ["Polar maritime air from the Southern Ocean", "Cold southern air brings cold snaps in winter, not summer rain."],
    ],
    answer: "A",
    explanation: "The **north-west airflow (Congo air)** brings moist, unstable air from the Congo basin in the rainy season.",
    hints: ["Which source region is a hot, very wet forest?", "Which direction is the Congo basin from Zimbabwe?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "In one rainy season the ITCZ stays further north than usual and hardly reaches southern Zimbabwe. What is the **most likely** result?",
    options: [
      ["A poor season and drought in the south", "Correct: the convergence and rising air that bring rain stay to the north."],
      ["Heavy, widespread floods in Matabeleland", "Floods follow when the ITCZ lingers over the area, not when it stays away."],
      ["Snowfall on the peaks of the Eastern Highlands", "The position of the ITCZ does not cause snow."],
      ["A longer rainy season across the whole country", "Less convergence over the south means a shorter, poorer season there."],
    ],
    answer: "A",
    explanation: "Zimbabwe's main rains depend on the ITCZ moving south over the country; if it does not, rainfall in the south is poor.",
    hints: ["Where does the ITCZ's rain fall?"],
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "One degree of latitude is about 111 km. The ITCZ lies at 18° N in July and 12° S in January. About how far (in km) does it move between these months?",
    value: 3330, unit: "km", tol: 10,
    wrong: [666, 30],
    explanation: "18 + 12 = 30° of latitude; 30 × 111 = 3,330 km.",
    hints: ["The two positions are on opposite sides of the equator, so add them.", "Multiply degrees by 111 km."],
  });
  b.calc({
    d: 4, skill: "ANALYSIS",
    stem: "The ITCZ moves from 15° N to 15° S over about six months. At an even rate, about how many kilometres does it move per month? (Use 111 km per degree of latitude.)",
    value: 555, unit: "km", tol: 5,
    wrong: [3330, 5],
    explanation: "30° × 111 = 3,330 km; 3,330 ÷ 6 = 555 km per month.",
    workedSolution: "1. Shift in latitude = 15 + 15 = 30°.\n2. Distance = 30 × 111 = 3,330 km.\n3. Per month = 3,330 ÷ 6 = 555 km.",
    hints: ["Find the total distance first.", "Divide by the number of months."],
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Air masses formed over the sea are called {{blank:a}} and are moist; those formed over land are called {{blank:b}} and are dry.",
    blanks: [
      { id: "a", accepted: ["maritime"], wrong: "polar" },
      { id: "b", accepted: ["continental"], wrong: "tropical" },
    ],
    explanation: "**Maritime** (m) = over the sea, moist. **Continental** (c) = over land, dry.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    stem: `Match each fictional air mass to its classification.\n\n${AM}`,
    pairs: [
      ["W", "Tropical maritime"],
      ["X", "Tropical continental"],
      ["Y", "Polar maritime"],
      ["Z", "Polar continental"],
    ],
    explanation: "Warm = tropical, cold = polar; moist = maritime, dry = continental.",
    hints: ["Use temperature to decide tropical or polar.", "Use humidity to decide maritime or continental."],
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Air masses are named after the region they are moving towards.",
    answer: false,
    explanation: "False. They are named after their **source region**, where they gained their temperature and humidity.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "An air mass can be modified as it moves over surfaces different from its source region.",
    answer: true,
    explanation: "True. For example, moist Indian Ocean air loses moisture as it crosses the Eastern Highlands.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Write the abbreviation **ITCZ** in full.",
    accepted: ["Inter-Tropical Convergence Zone", "Intertropical Convergence Zone", "Inter Tropical Convergence Zone", "the Inter-Tropical Convergence Zone", "the Intertropical Convergence Zone"],
    wrong: ["Inter-Tropical Climate Zone"],
    explanation: "**Inter-Tropical Convergence Zone**.",
  });
  b.short({
    d: 2, skill: "APPLICATION",
    stem: "Give the two-letter abbreviation for a **cold, moist** air mass.",
    accepted: ["mP", "Pm"],
    wrong: ["cP"],
    explanation: "Cold = polar (P); moist = maritime (m): **mP** (polar maritime).",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe the weather associated with the ITCZ.",
    points: [
      "Low pressure with converging air that rises strongly.",
      "Towering cumulonimbus clouds.",
      "Heavy rain and thunderstorms (often in the afternoon), with high temperatures and humidity.",
    ],
    modelAnswer: "The ITCZ is a belt of low pressure where the trade winds converge and air rises strongly. Tall cumulonimbus clouds form, bringing heavy rain and thunderstorms, usually in hot, humid conditions.",
    explanation: "Credit low pressure/convergence, cumulonimbus and heavy rain or thunderstorms.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why most of Zimbabwe is wet in January but dry in July.",
    points: [
      "In January the overhead sun is in the southern hemisphere and the ITCZ moves south over or near Zimbabwe.",
      "Moist air streams (Congo air, north-east monsoon, south-east trades) converge and rise, giving heavy rain.",
      "In July the ITCZ has moved north of the equator (over West Africa/Sahel).",
      "High pressure with dry, sinking continental air lies over southern Africa, giving clear skies.",
    ],
    modelAnswer: "In January the overhead sun is south of the equator and the ITCZ follows it south over Zimbabwe. Moist Congo air, monsoon air and south-east trades converge and rise there, forming storms and heavy rain. In July the ITCZ is far north over West Africa, and high pressure covers southern Africa. The air sinks and is dry, so skies are clear and there is almost no rain.",
    explanation: "Two marks for January (ITCZ position and moist converging air), two for July (ITCZ north, high pressure).",
    hints: ["Where is the ITCZ in each month?", "What kind of pressure lies over southern Africa in July?"],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "\"Zimbabwe's rainfall depends on air from outside the country.\" Discuss this statement with reference to the air streams that affect Zimbabwe.",
    points: [
      ["South-east trades bring moisture from the Indian Ocean (relief rain/guti in the east).", 1],
      ["North-east monsoon brings moist air from the northern Indian Ocean in summer.", 1],
      ["North-west Congo air brings heavy, widespread rain in mid-summer.", 1],
      ["The ITCZ (convergence of these streams) controls when and where rain falls.", 1],
      ["Local factors also matter: convection from local heating, evaporation and transpiration, relief of the Eastern Highlands.", 1],
      ["Judgement: largely true, as moisture comes from outside, but local heating and relief trigger the rain.", 1],
    ],
    levels: geographyLevels(6),
    modelAnswer: "The statement is largely true. Zimbabwe is landlocked, so almost all the moisture for its rain is carried in by air streams. The south-east trades bring moist air from the Indian Ocean, giving relief rain and guti on the Eastern Highlands. In summer the north-east monsoon brings moist air from the northern Indian Ocean, and the north-west airflow brings very moist, unstable air from the Congo basin, which gives the heaviest, most widespread rains. Where these streams converge at the ITCZ the air rises and storms form.\n\nHowever, local factors decide exactly where rain falls. Strong heating of the plateau sets off convection, local evaporation and transpiration recycle moisture, and the Eastern Highlands force air to rise. So the moisture comes from outside, but local heating and relief trigger the rainfall.",
    explanation: "Credit named air streams with their sources, the role of the ITCZ, local factors and a judgement.",
    hints: ["Name each air stream and where it comes from.", "What local factors make the air rise?"],
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: `The table gives fictional observations of four air masses at their source regions.\n\n${AM}`,
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Which air mass (W, X, Y or Z) would bring the hottest, driest weather?", accepted: ["X"], wrong: ["W"], explanation: "X: 34 °C and very low humidity (tropical continental)." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the difference in temperature between air masses X and Z.", value: 54, unit: "°C", wrong: [14], explanation: "34 − (−20) = 54 °C." }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which air mass most resembles the air that brings Zimbabwe's summer rain?", options: [
        ["W", "Correct: warm and very moist, like tropical maritime or Congo air."],
        ["X", "X is hot but dry; it would bring clear skies."],
        ["Y", "Y is cool; Zimbabwe's summer rain comes in warm air."],
        ["Z", "Z is very cold and dry."],
      ], answer: "A", explanation: "Summer rain comes from warm, moist air: W." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain how air mass W could change as it moves inland over a dry plateau.", points: [
        "It loses moisture through rain where it is forced to rise (e.g. over mountains).",
        "It gains little new moisture over dry land, so humidity falls.",
        "Its temperature changes with the surface (hotter by day over heated land / cooler with altitude), so it is modified.",
      ], explanation: "Air masses are modified by the surfaces they cross." }),
    ],
    hints: ["Subtracting a negative number means adding.", "What happens to moisture as air crosses mountains and dry land?"],
    explanation: "Practice in classifying air masses and explaining their modification.",
  });
  b.struct({
    d: 3, skill: "UNDERSTANDING",
    stem: "A description of two weather maps of Africa (fictional summary). Map 1: a belt of thick cloud and thunderstorms stretches across Zambia, northern Zimbabwe and Mozambique; arrows from the north-east, north-west and south-east meet there. Map 2: the cloud belt lies across Mali, Niger and Chad; a large high-pressure system covers southern Africa.",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Which month does Map 2 most likely show?", options: [
        ["July", "Correct: the ITCZ is north of the equator and high pressure covers southern Africa."],
        ["January", "In January the cloud belt lies over southern Africa, as in Map 1."],
        ["December", "In December the ITCZ is moving south over southern Africa."],
        ["February", "In February the ITCZ still lies over southern Africa."],
      ], answer: "A", explanation: "The ITCZ over the Sahel and high pressure in the south point to July." }),
      P.short({ label: "(b)", marks: 1, stem: "Name the belt of cloud and thunderstorms shown on both maps.", accepted: ["ITCZ", "Inter-Tropical Convergence Zone", "Intertropical Convergence Zone", "the ITCZ"], wrong: ["polar front"], explanation: "It is the ITCZ." }),
      P.manual({ label: "(c)", marks: 2, stem: "Describe the weather in Zimbabwe on Map 2 and explain it.", points: [
        "Clear skies, dry, warm days and cold nights (possible frost).",
        "High pressure: sinking air warms and prevents cloud forming.",
      ], explanation: "One mark for the weather, one for the explanation." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why the cloud belt moves between the positions on the two maps.", points: [
        "It follows the overhead sun (the zone of strongest heating) with a lag.",
        "The overhead sun is south of the equator in December-January and north in June-July.",
      ], explanation: "The ITCZ follows the apparent movement of the overhead sun." }),
    ],
    hints: ["Where is the overhead sun in each season?", "What does high pressure do to air?"],
    explanation: "Practice in interpreting the seasonal shift of the ITCZ.",
  });
  b.card("DEFINITION", "Air mass", "A huge body of air with roughly uniform temperature and humidity, gained over its source region.");
  b.card("CONCEPT", "Classifying air masses", "Tropical (T, warm) or polar (P, cold); maritime (m, moist) or continental (c, dry): mT, cT, mP, cP.");
  b.card("DEFINITION", "Source region", "A large uniform land or sea area, usually under calm high pressure, where an air mass forms.");
  b.card("DEFINITION", "ITCZ", "Inter-Tropical Convergence Zone: low-pressure belt where trade winds converge and rise, giving heavy rain.");
  b.card("FACT", "ITCZ positions", "January: south of the equator over southern Africa. July: north, over West Africa and the Sahel (about 15-20° N).");
  b.card("FACT", "South-east trades", "Moist air from the Indian Ocean; summer moisture, and guti on the Eastern Highlands in the cool season.");
  b.card("FACT", "North-east monsoon", "Moist air from the northern Indian Ocean, reaching northern Zimbabwe in the southern summer.");
  b.card("FACT", "North-west (Congo) air", "Warm, very moist, unstable air from the Congo basin; heavy, widespread mid-summer rain.");
  b.card("CONCEPT", "Zimbabwe in July", "High pressure over southern Africa: sinking dry air, clear skies, cold nights.");
});
