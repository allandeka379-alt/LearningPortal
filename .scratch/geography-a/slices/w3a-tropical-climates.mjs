// W3a: tropical.climates (Cambridge only, A Level Paper 3 option 7). Data are illustrative (invented for this exercise); every number is computed in code.
import { concept, P, geographyLevels, chk, rnd, mean, sum, range, CAM } from "../lib.mjs";
import { mc, tbl, MONTHS } from "../tables/w3a-_q.mjs";
import { RT, RP, ST, SP } from "../tables/w3a-tropical-climates.mjs";

const f1 = (a) => a.map((x) => x.toFixed(1));
// Question data differ from the lesson stations (Station T savanna, Station U rainforest, Station W northern savanna).
const TT = [25.3, 25.1, 24.7, 22.9, 20.3, 17.9, 17.5, 19.7, 22.8, 25.5, 25.8, 25.6];
const TP = [218, 183, 124, 47, 13, 3, 0, 1, 9, 56, 133, 204];
const rangeT = chk(range(TT), 8.3, 1e-9);
const totalT = chk(sum(TP), 991);
const UP = [255, 241, 288, 305, 267, 185, 138, 112, 149, 212, 262, 277];
const UT = [26.5, 26.7, 26.9, 26.8, 26.6, 26.2, 25.9, 26.3, 26.7, 26.9, 26.8, 26.6];
const totalU = chk(sum(UP), 2691);
const WP = [3, 7, 14, 48, 118, 205, 258, 238, 183, 92, 11, 4];
const wetW = chk(WP.slice(4, 10).reduce((a, c) => a + c, 0), 1094);
const totalW = chk(sum(WP), 1181);
const wetPct = rnd((wetW / totalW) * 100, 1, 92.6, "wetPct");

// Struct 1: monsoon station V (illustrative)
const VT = [22.0, 24.5, 29.0, 32.5, 33.0, 31.0, 28.5, 28.0, 28.5, 27.5, 24.5, 22.0];
const VP = [15, 20, 25, 40, 80, 220, 520, 480, 280, 80, 20, 10];
const monsoon = [5, 6, 7, 8].reduce((s, i) => s + VP[i], 0);
chk(monsoon, 1500);
const totalV = chk(sum(VP), 1790);
const monPct = rnd((monsoon / totalV) * 100, 1, 83.8, "monPct");
const VTAB = tbl(["Month", ...MONTHS], [["Temperature (°C)", ...f1(VT)], ["Rainfall (mm)", ...VP]]);

// Struct 2: ENSO and seasonal rainfall (illustrative)
const ES = [["El Niño", 62], ["El Niño", 71], ["El Niño", 55], ["La Niña", 118], ["La Niña", 131], ["La Niña", 109], ["Neutral", 96], ["Neutral", 104]];
const elNino = ES.filter((s) => s[0] === "El Niño").map((s) => s[1]);
const laNina = ES.filter((s) => s[0] === "La Niña").map((s) => s[1]);
const mEl = rnd(mean(elNino), 1, 62.7, "mEl");
const mLa = rnd(mean(laNina), 1, 119.3, "mLa");
const diffEL = rnd(mean(laNina) - mean(elNino), 1, 56.7, "diffEL");
const ENSOTAB = tbl(["Season", "ENSO phase", "Rainfall (% of long-term average)"], ES.map((s, i) => [`Season ${i + 1}`, s[0], s[1]]));

concept("ageo.tropical.climates", { file: "tropical/climates", keyPrefix: "tropical.climates", applies: CAM }, (b) => {
  mc(b, 1, "RECALL", "In which of these regions is the rainforest climate found?", [
    ["The Congo basin", "Correct: the Congo basin lies on the equator and is one of the three main rainforest regions."],
    ["The Kalahari basin", "The Kalahari is semi-arid, with a long dry season."],
    ["The Sahara desert", "The Sahara is hot desert, with very little rain."],
    ["The Namib coast", "The Namib is a coastal desert."],
  ], "The three main rainforest regions are the **Amazon basin, the Congo basin and South-East Asia**.");
  mc(b, 2, "UNDERSTANDING", "Which statement about temperature in a tropical rainforest climate is correct?", [
    ["The annual range is smaller than the day-to-night range", "Correct: the annual range is often under 3 °C, while day and night can differ by 5–10 °C."],
    ["The annual range is greater than 15 °C between summer and winter", "That is a savanna or continental pattern; rainforest temperatures are almost constant."],
    ["Temperatures fall below 10 °C in the cool season of the year", "There is no cool season in the rainforest."],
    ["The hottest month is always the same as the month of most rain", "The warmest month need not be the wettest, and the range is tiny."],
  ], "With the Sun high all year, the **seasonal range is small**; the diurnal range is larger.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What causes the dry season in a savanna climate?", [
    ["The subtropical high-pressure belt moves over with sinking air", "Correct: sinking air is warm and stable, so cloud does not form."],
    ["The ITCZ moves directly overhead and the Sun is at its highest", "That brings the wet season."],
    ["A warm ocean current flows along the coast for the whole year", "A warm current would increase the rainfall."],
    ["The trade winds stop blowing across the whole of the tropics", "The trade winds do not stop; the pressure belts move."],
  ], "In the low-Sun season the ITCZ is far away and the **subtropical anticyclone** dominates.");
  mc(b, 2, "RECALL", "What is the Intertropical Convergence Zone?", [
    ["The zone where the trade winds of both hemispheres meet", "Correct: air converges, rises and produces heavy rain."],
    ["The line of latitude marking the Tropic of Capricorn", "The ITCZ is not a line of latitude, and it moves."],
    ["The area of high pressure over the subtropical desert regions", "That is the subtropical anticyclone."],
    ["The boundary between warm and cold ocean currents in a basin", "That is an ocean front, not the ITCZ."],
  ], "The ITCZ is where the **trade winds converge**, giving rising air and heavy rain.");
  mc(b, 3, "APPLICATION", "During an El Niño, which change is most likely in southern Africa?", [
    ["A drier rainy season with a risk of drought", "Correct: the 2015–16 and 2023–24 events were followed by serious drought."],
    ["Floods in every part of the region at the same time", "El Niño is more often linked to drought than to widespread floods."],
    ["A longer dry season but a normal wet season in most years", "The wet-season rainfall is what is typically reduced."],
    ["No change, since the Pacific is too far away to matter", "ENSO affects the global atmosphere through changes in circulation."],
  ], "El Niño alters the global circulation, and southern Africa tends to receive **below-average summer rain**.", { hints: ["Think of the 2015–16 and 2023–24 seasons."] });
  mc(b, 3, "ANALYSIS", "Why does a place at 5° from the equator often have two rainfall maxima in a year?", [
    ["The ITCZ passes overhead twice, going north then south", "Correct: the Sun is overhead around each equinox."],
    ["The monsoon blows twice a year in the same direction", "A monsoon is a seasonal reversal, not a repeated flow."],
    ["Ocean currents change direction every six months or so", "Ocean currents do not reverse so regularly."],
    ["The Earth's distance from the Sun changes twice a year", "Distance from the Sun is not the control; the overhead Sun is."],
  ], "Near the equator the ITCZ crosses the place **twice a year**, once on each journey.", { hints: ["Where is the Sun overhead in March and September?"] });
  mc(b, 3, "ANALYSIS", "Which pair of features best separates a savanna climate from a rainforest climate?", [
    ["A dry season and a larger annual temperature range", "Correct: both are signs of seasonal rainfall and clearer skies in the dry season."],
    ["A higher annual rainfall and a smaller diurnal range", "The savanna has lower rainfall, and the dry season has a large diurnal range."],
    ["Convectional rain and high mean temperatures", "Both climates have these."],
    ["Frost in winter and heavy rain in summer", "Frost is not typical of the savanna lowlands."],
  ], "A **dry season** and a **larger annual range** distinguish the savanna.", { hints: ["Look for the features that are NOT shared."] });

  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "The ITCZ stays in the same position through the year.", answer: false,
    feedbackTrue: "Not so: it follows the overhead Sun.", feedbackFalse: "Correct: it moves north and south with the overhead Sun, with a lag of several weeks.",
    explanation: "The ITCZ **migrates seasonally**, which is why the savanna has a wet and a dry season." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A monsoon is a seasonal reversal of the prevailing wind.", answer: true,
    feedbackTrue: "Correct: summer winds bring moist air from the sea, winter winds bring dry air from the land.", feedbackFalse: "Not so: the key idea is a seasonal reversal of wind direction.",
    explanation: "The **seasonal reversal** of wind is the defining feature of a monsoon." });
  b.match({ d: 2, skill: "RECALL", stem: "Match each term to its meaning.",
    pairs: [
      ["ITCZ", "Zone where the trade winds meet and air rises"],
      ["Subtropical anticyclone", "High-pressure belt of sinking, stable air"],
      ["Monsoon", "Seasonal reversal of wind between land and sea"],
      ["El Niño", "Warm phase of ENSO with weakened Pacific trade winds"],
      ["La Niña", "Cool phase of ENSO with stronger Pacific trade winds"],
    ], explanation: "Each term describes a feature of the tropical atmosphere." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "A rainforest climate has a {{blank:a}} annual temperature range and rain in every month. In a savanna climate, most rain falls when the {{blank:b}} is overhead, and the dry season occurs when the subtropical {{blank:c}} dominates.",
    blanks: [
      { id: "a", accepted: ["small"], choices: ["small", "large", "variable"] },
      { id: "b", accepted: ["ITCZ"], choices: ["ITCZ", "polar front", "jet stream"] },
      { id: "c", accepted: ["anticyclone"], choices: ["anticyclone", "depression", "monsoon"] },
    ], explanation: "A small range, the ITCZ for the wet season and the anticyclone for the dry season." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the type of rainfall produced when strongly heated ground makes moist air rise and form afternoon thunderstorms in the tropics.",
    accepted: ["convectional", "convectional rainfall", "convection", "convectional rain", "convective", "convective rainfall"],
    explanation: "**Convectional** rainfall results from heating of the surface, rising moist air, condensation and storms." });

  b.num({ d: 2, skill: "APPLICATION", calculator: true, unit: "°C",
    stem: `The table gives illustrative mean monthly temperatures for Station T, a savanna station (invented for this exercise).

${tbl(["Month", ...MONTHS], [["Temperature (°C)", ...f1(TT)]])}

Calculate the annual temperature range, in °C.`,
    hints: ["Highest monthly mean minus the lowest monthly mean."],
    value: rangeT, dp: 1, wrong: [25.8, 17.5, 9.3],
    explanation: "Highest = 25.8 °C (November); lowest = 17.5 °C (July). Range = 25.8 − 17.5 = **8.3 °C**. The value 25.8 is the highest month, not the range." });
  b.num({ d: 2, skill: "APPLICATION", calculator: true, unit: "mm",
    stem: `Illustrative monthly rainfall for Station U, a rainforest station (invented for this exercise).

${tbl(["Month", ...MONTHS], [["Rainfall (mm)", ...UP]])}

Calculate the total annual rainfall, in mm.`,
    hints: ["Add the twelve monthly totals."],
    value: totalU, wrong: [224, 2591, 26910],
    explanation: "255 + 241 + 288 + 305 + 267 + 185 + 138 + 112 + 149 + 212 + 262 + 277 = **2 691 mm**. The value 224 is the monthly mean (2 691 ÷ 12 = 224)." });
  b.calc({ d: 3, skill: "APPLICATION", calculator: true, unit: "%",
    stem: `Illustrative rainfall for Station W, a savanna station north of the equator, in mm: Jan 3, Feb 7, Mar 14, Apr 48, May 118, Jun 205, Jul 258, Aug 238, Sep 183, Oct 92, Nov 11, Dec 4 (data invented for this exercise).

Calculate the percentage of the annual rainfall that falls from May to October, to one decimal place.`,
    hints: ["Find the total for the six wet months and the annual total.", "Percentage = part ÷ whole × 100."],
    value: wetPct, dp: 1, wrong: [1094, 10.6, 93.6],
    explanation: "1. Wet months: 120 + 210 + 260 + 240 + 190 + 90 = 1 110 mm.\n2. Annual total = 4 + 6 + 15 + 45 + 1 110 + 12 + 3 = 1 195 mm.\n3. 1 110 ÷ 1 195 × 100 = **92.9%**. The value 1 110 is the rainfall, not the percentage." });

  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Station T (illustrative data) has monthly rainfall of 218, 183, 124, 47, 13, 3, 0, 1, 9, 56, 133 and 204 mm from January to December. Describe the pattern of rainfall.",
    points: [
      "One wet season from November to March, with the maximum of 218 mm in January.",
      "A long dry season from April to October, with almost no rain from May to September (none at all in July).",
      "A total of 991 mm, strongly seasonal, with most of it falling in the five wet months.",
    ],
    modelAnswer: "Rain falls in one wet season from November to March, peaking at 218 mm in January. From May to September almost no rain falls (none in July). The annual total is 991 mm, and most of it falls in the five wet months.",
    explanation: "Describe the shape of the pattern and quote figures with units." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why a savanna climate has a wet season and a dry season.",
    hints: ["Link the overhead Sun, the ITCZ and the subtropical anticyclone."],
    points: [
      "In the high-Sun season the ITCZ moves overhead, where the trade winds converge and the heated air rises.",
      "Rising air cools, water vapour condenses and convectional cloud and heavy rain form, giving the wet season.",
      "In the low-Sun season the ITCZ moves towards the other hemisphere.",
      "The subtropical high-pressure belt moves over the area, with sinking, warming, stable air that prevents cloud, giving the dry season.",
    ],
    modelAnswer: "In the high-Sun season the ITCZ is overhead, so air converges, rises and cools, and water vapour condenses into heavy convectional rain. In the low-Sun season the ITCZ moves away and the subtropical high-pressure belt moves over the area. Sinking air warms and is stable, so cloud does not form and the season is dry.",
    explanation: "The wet season comes from the ITCZ and the dry season from the anticyclone." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why the temperature range between day and night in the rainforest is greater than the range between the warmest and coolest months.",
    hints: ["Think of the Sun's height through the year and the effect of the night."],
    points: [
      "The Sun is high all year, so the amount of insolation received hardly changes from month to month.",
      "Between day and night insolation changes from a maximum to zero, so the surface heats and cools every 24 hours.",
      "Clouds and humid air reduce the loss of heat at night, so the diurnal range is only about 5–10 °C, but this is still larger than the annual range of 1–3 °C.",
    ],
    modelAnswer: "The Sun is high all year, so insolation changes little through the year and the annual range is small. Between day and night insolation falls to zero, so the surface warms and cools each day. Cloud and humid air limit the cooling at night, but the diurnal range is still larger than the annual range.",
    explanation: "Daily changes in insolation are larger than yearly changes near the equator." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how an El Niño event can cause drought in southern Africa.",
    hints: ["Begin with the Pacific, then say what happens to the global circulation."],
    points: [
      "In an El Niño the Pacific trade winds weaken and warm surface water spreads eastwards across the Pacific.",
      "The area of rising air and heavy rain moves eastwards with the warm water.",
      "This changes the global atmospheric circulation, including the position of rising and sinking air over the Indian Ocean and Africa.",
      "Sinking air and weaker moisture flow reduce summer rainfall in southern Africa, as in 2015–16 and 2023–24.",
    ],
    modelAnswer: "In an El Niño the Pacific trade winds weaken and warm water spreads east, so the region of rising air and heavy rain moves with it. This alters the global circulation, including the pattern of rising and sinking air over the Indian Ocean and Africa. Southern Africa then receives less moisture and more sinking air in the rainy season, and drought is more likely, as in 2015–16 and 2023–24.",
    explanation: "ENSO changes circulation across the globe, and southern Africa responds with reduced rainfall." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Station V has a monsoon climate (illustrative data, invented for this exercise).\n\n${VTAB}`,
    hints: ["The monsoon months are June to September.", "Percentage = part ÷ total × 100."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the percentage of the annual rainfall that falls from June to September, to one decimal place.", value: monPct, dp: 1, unit: "%", wrong: [1500, 8.4, 83.0],
        explanation: "June to September: 220 + 520 + 480 + 280 = 1 500 mm. Annual total = 1 790 mm. 1 500 ÷ 1 790 × 100 = 83.8%. The value 1 500 is the rainfall, not the share." }),
      P.manual({ label: "(b)", marks: 3, stem: "Describe the seasonal pattern of temperature and rainfall at Station V.",
        points: [
          "Temperature peaks at 33.0 °C in May, just before the rains, and is lowest at 22.0 °C in January and December (a range of 11.0 °C).",
          "Rainfall is very seasonal: it rises from 80 mm in May to a maximum of 520 mm in July and falls to 10 mm in December.",
          "Temperatures dip slightly (to 28.0 °C in August) in the wet season, when cloud is thickest.",
        ],
        modelAnswer: "Temperature peaks at 33.0 °C in May, just before the rains, and is lowest at 22.0 °C in January and December, a range of 11.0 °C. Rainfall rises from 80 mm in May to a maximum of 520 mm in July, and falls to 10 mm in December. Temperatures dip in the wet season, to 28.0 °C in August, when cloud is thickest.",
        explanation: "Quote highest and lowest values and the range, and link temperature to the rainy season." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain how a summer monsoon produces the rainfall in Station V.",
        points: [
          "In summer the land heats rapidly and a low-pressure area forms over it, and the ITCZ moves far into the northern hemisphere.",
          "Moist air from the cooler ocean is drawn onto the land as a wind with a reversed direction from the winter.",
          "The air rises over the heated land and hills, cools and condenses, giving heavy rain.",
        ],
        modelAnswer: "In summer the land heats up faster than the sea, so low pressure forms over it and the ITCZ moves poleward. Moist air from the ocean is drawn onto the land as the summer monsoon, a reversal of the winter wind. It rises over the heated land and the hills, cools and condenses, giving heavy rain.",
        explanation: "The monsoon needs a seasonal pressure change, a moist wind and uplift." }),
    ], explanation: "Calculate a seasonal share, describe a climate pattern and explain the monsoon." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `The table gives illustrative seasonal rainfall in a southern African savanna area, as a percentage of the long-term average, for eight seasons grouped by ENSO phase (data invented for this exercise).\n\n${ENSOTAB}`,
    hints: ["For the means, add the percentages in each phase and divide by 3.", "A small sample cannot show a certain relationship."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the mean rainfall, as a percentage of the average, for the El Niño seasons, to one decimal place.", value: mEl, dp: 1, unit: "%", wrong: [188, 65.6, 59.4],
        explanation: "(62 + 71 + 55) ÷ 3 = 188 ÷ 3 = 62.7%. The value 188 is the sum." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the mean rainfall for the La Niña seasons, to one decimal place.", value: mLa, dp: 1, unit: "%", wrong: [358, 111.3, 118],
        explanation: "(118 + 131 + 109) ÷ 3 = 358 ÷ 3 = 119.3%." }),
      P.num({ label: "(c)", marks: 1, stem: "How many percentage points greater is the mean for La Niña than for El Niño, to one decimal place?", value: diffEL, dp: 1, wrong: [56.7 * 3, 1.9],
        explanation: "119.3 − 62.7 = 56.7 percentage points (from the unrounded means 119.33 − 62.67 = 56.67)." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain how a La Niña event can lead to higher rainfall in southern Africa.",
        points: [
          "In a La Niña the Pacific trade winds strengthen and the pool of warm water stays in the western Pacific.",
          "This alters the global circulation so that more moist air and rising motion reach southern Africa in the summer.",
          "More moisture from the Indian Ocean and a stronger ITCZ or rain-bearing systems produce above-average rainfall.",
        ],
        modelAnswer: "In a La Niña the trade winds strengthen and warm water stays in the western Pacific, which alters the global circulation. More moist air from the Indian Ocean is brought towards southern Africa, with more rising air in the rainy season, so rainfall is above average.",
        explanation: "La Niña shifts the circulation in the opposite way to El Niño." }),
      P.manual({ label: "(e)", marks: 4, stem: "Assess how far the table proves that ENSO controls the rainfall in the area.",
        points: [
          "The table shows a clear difference: El Niño seasons have 55–71% of the average and La Niña seasons 109–131%.",
          "The neutral seasons (96% and 104%) lie close to the average, which supports the idea of an ENSO effect.",
          "But only eight seasons are shown (three in each extreme phase), too few to prove a relationship.",
          "Other controls, such as the Indian Ocean temperature and the ITCZ position, also affect rainfall, so ENSO is influential but not the only control.",
        ],
        modelAnswer: "The table shows a clear difference, with El Niño seasons at 55–71% of the average and La Niña seasons at 109–131%, and neutral seasons close to 100%. This supports an ENSO influence. However, there are only eight seasons, so the sample is too small to prove it, and other factors such as the Indian Ocean temperature also affect rainfall. ENSO is an important control, but the table does not prove it is the only one.",
        explanation: "Use the data for and against, then judge." }),
    ], explanation: "Calculate means by phase, explain the link and judge the evidence." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the importance of the ITCZ in explaining the climate of a savanna region.",
    hints: ["Give what the ITCZ explains, then what it does not.", "Mention the anticyclone, monsoon, relief and ENSO."],
    points: [
      "The ITCZ explains the rainy season: as it passes overhead, air converges, rises and produces convectional storms.",
      "Because the ITCZ migrates, with a lag, the savanna has one main wet season in the high-Sun months.",
      "Its absence explains the dry season, when it has moved away.",
      "Subtropical anticyclones are the second control: sinking air in the dry season stops cloud forming.",
      "In monsoon regions (West Africa, India) the wind reversal and land–sea contrasts are also needed to explain the amount of rain.",
      "ENSO and ocean temperatures change the rainfall from year to year, so the ITCZ alone cannot explain variability.",
      "Relief, ocean currents and distance from the sea give local differences in rainfall and temperature.",
      "Judgement: the ITCZ is the main control of the seasonal pattern, but its effect depends on the pressure systems and ocean influences, so it is the most important but not the only factor.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "The ITCZ is the main reason why savannas have a wet and a dry season. As it migrates with the overhead Sun, with a lag of several weeks, it brings converging, rising air and convectional storms when it is overhead, giving one wet season. When it moves away, the dry season begins. However, the dry season itself depends on the subtropical anticyclone, whose sinking air prevents cloud. In monsoon regions such as West Africa or India, the reversal of winds caused by the heating of land and sea also brings the moist air. Year-to-year differences owe much to ENSO and ocean temperatures, and relief and ocean currents cause local differences. I conclude that the ITCZ is the most important control of the seasonal pattern, but it works with the pressure belts and ocean influences.",
    wordLimit: { max: 300 }, explanation: "Weigh the ITCZ against the pressure belts, monsoons, ENSO and local factors." });

  b.card("DEFINITION", "ITCZ", "The Intertropical Convergence Zone: where the trade winds from the two hemispheres meet, air rises and heavy rain falls. It moves north and south with the overhead Sun, lagging by several weeks.");
  b.card("CONCEPT", "Rainforest climate", "Within about 10° of the equator: about 25–28 °C all year, an annual range under 3 °C, more than 2 000 mm of rain and no dry season.");
  b.card("CONCEPT", "Savanna climate", "About 5°–20° from the equator: high temperatures, one wet and one dry season, annual rainfall about 600–1 500 mm and an annual temperature range of about 5–10 °C.");
  b.card("CONCEPT", "Cause of the savanna dry season", "The ITCZ moves away and the subtropical anticyclone brings sinking, stable air, so cloud does not form.");
  b.card("DEFINITION", "Monsoon", "A seasonal reversal of the prevailing wind. In summer it brings moist air from the sea and heavy rain; in winter it brings dry air from the land.");
  b.card("DEFINITION", "ENSO", "El Niño–Southern Oscillation: a natural variation in the tropical Pacific with a warm phase (El Niño) and a cool phase (La Niña) that changes rainfall worldwide every few years.");
  b.card("FACT", "El Niño and southern Africa", "El Niño tends to bring a dry rainy season to southern Africa; the 2015–16 and 2023–24 events were followed by serious drought.");
  b.card("CONCEPT", "Diurnal and annual range in the rainforest", "The range between day and night (about 5–10 °C) is greater than the range between the warmest and coolest months (under 3 °C).");
  b.card("FORMULA", "Share of seasonal rainfall", "Share (%) = rainfall in the season ÷ annual total × 100.");
});
