// W1b: atmos.climate-evidence-causes (both boards). GWP-100 values used: CH4 28, N2O 265 (IPCC AR5, rounded).
// Computed: 3 x 28 = 84; 0.4 x 265 = 106; 8 + 0.08 x 265 + 0.002 x 1300 = 31.8; (418 - 315)/315 = 32.7%; 200 mm / 117 y = 1.7 mm/y;
// ENSO means 413.3, 945.0, 716.7 (57.7% of neutral); struct 12: 25.2, 14.1, 53.3, 47.3%.
import { concept, P, geographyLevels, chk, rnd, mean, sum } from "../lib.mjs";
import { mc, tbl } from "../tables/w1b-_q.mjs";

const q12 = chk(3 * 28, 84);
const q13 = chk(0.4 * 265, 106);
const q14 = rnd(8 + 0.08 * 265 + 0.002 * 1300, 1, 31.8, "total14");
const q15 = rnd(((418 - 315) / 315) * 100, 1, 32.7, "pct15");
const q16 = rnd(200 / 117, 1, 1.7, "rate16");
const EN = [410, 380, 450];
const LN = [980, 910];
const NE = [720, 690, 740];
const mEN = rnd(mean(EN), 1, 413.3, "mEN");
const mLN = chk(mean(LN), 945);
const pctEN = rnd((mean(EN) / mean(NE)) * 100, 1, 57.7, "pctEN");
const ch4 = rnd(0.9 * 28, 1, 25.2, "ch4");
const n2o = rnd(0.0006 * 23500, 1, 14.1, "n2o");
const tot = rnd(14 + 0.9 * 28 + 0.0006 * 23500, 1, 53.3, "tot");
const share = rnd(((0.9 * 28) / (14 + 0.9 * 28 + 0.0006 * 23500)) * 100, 1, 47.3, "share");

concept("ageo.atmos.climate-evidence-causes", { file: "atmos/climate-evidence-causes", keyPrefix: "atmos.climate-evidence-causes" }, (b) => {
  mc(b, 1, "RECALL", "Which of the following is a **proxy** record of past climate?", [
    ["Tree rings", "Correct: ring width and density record growing conditions in each year."],
    ["A weather station thermometer", "Thermometer readings are direct instrumental records."],
    ["A satellite measurement of sea level", "Satellite data are instrumental measurements."],
    ["A daily rainfall gauge", "A rain gauge is an instrument, not a proxy."],
  ], "**Proxy** records such as tree rings, ice cores and pollen preserve indirect evidence of past climates.");
  mc(b, 1, "RECALL", "Which greenhouse gas has a global warming potential (GWP) of 1 by definition?", [
    ["Carbon dioxide", "Correct: other gases are compared with the heat trapped by the same mass of CO2."],
    ["Methane", "Methane has a GWP of about 28 over 100 years."],
    ["Nitrous oxide", "Nitrous oxide has a GWP of about 265 over 100 years."],
    ["Sulphur hexafluoride", "SF6 has a GWP of more than 20 000."],
  ], "**CO2** is the reference gas; its GWP is 1.");
  mc(b, 2, "UNDERSTANDING", "What do the air bubbles trapped in an Antarctic ice core show scientists?", [
    ["Past concentrations of gases such as CO2", "Correct: the bubbles are samples of ancient air."],
    ["The exact weather on one particular day", "Cores give long-term records, not single days."],
    ["The thickness of the ozone layer in the past", "Bubbles record gas concentrations, not ozone thickness."],
    ["The sea level at the time that the snow fell", "Sea level is found from other evidence."],
  ], "Bubbles in **ice cores** are ancient air samples, so they show past CO2 and methane levels.");
  mc(b, 2, "APPLICATION", "What is the usual effect of an El Niño on rainfall in southern Africa?", [
    ["Less rainfall and a greater drought risk", "Correct: El Niño summers tend to be hotter and drier."],
    ["Heavier rainfall and a greater flood risk", "That is more typical of La Niña."],
    ["No effect at all on southern Africa", "ENSO is linked to rainfall variation across the region."],
    ["Snowfall over the Eastern Highlands", "Snow is rare and is not a typical effect of El Niño."],
  ], "In southern Africa, **El Niño** usually brings drier, hotter summers (for example 1991–92 and 2015–16).");
  mc(b, 2, "UNDERSTANDING", "Why did global temperatures fall slightly for a year or two after the Mount Pinatubo eruption in 1991?", [
    ["Sulphate aerosols in the stratosphere reflected sunlight", "Correct: aerosols raise the albedo of the atmosphere."],
    ["The eruption released very large amounts of carbon dioxide", "The CO2 released was small compared with that from human activity."],
    ["The eruption reduced the energy output from the Sun", "Volcanoes do not change the Sun's output."],
    ["Ash fell into the oceans and warmed the sea surface", "Ash does not warm the ocean in this way."],
  ], "**Aerosols** from large eruptions reflect solar radiation, causing short-term cooling.");
  mc(b, 2, "RECALL", "Which activity is a major human source of methane?", [
    ["Livestock farming and rice growing", "Correct: microbes in animal digestion and in flooded paddies produce methane."],
    ["Burning coal in power stations", "This mainly releases carbon dioxide."],
    ["Cutting down forests for timber", "This mainly adds carbon dioxide."],
    ["Using refrigerators and air-conditioners", "These mainly release F-gases."],
  ], "Livestock and rice paddies release large amounts of **methane**.");
  b.tf({ d: 2, skill: "RECALL", stem: "The concentration of carbon dioxide in the atmosphere is higher today than before the industrial era.", answer: true, daily: true,
    feedbackTrue: "Correct: it has risen from about 280 ppm to over 420 ppm.",
    feedbackFalse: "Not so: ice cores and direct measurements show a large increase.",
    explanation: "CO2 has risen from about **280 ppm** to more than **420 ppm**." });
  b.tf({ d: 2, skill: "ANALYSIS", stem: "Changes in the Sun's output during the 11-year sunspot cycle are the main cause of the warming since 1850.", answer: false,
    feedbackFalse: "Correct: solar variation is small and does not match the pattern of warming.",
    feedbackTrue: "Not so: the Sun's output changes by only about 0.1% over the cycle, which cannot explain the observed warming.",
    explanation: "The best match for recent warming is the rise in **greenhouse gases**." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "The ability of a gas to trap heat compared with CO2 is its global {{blank:a}} potential. A year of warm water spreading across the eastern Pacific is an {{blank:b}}. The extra warming from human greenhouse gas emissions is the {{blank:c}} greenhouse effect.",
    blanks: [
      { id: "a", accepted: ["warming"], choices: ["warming", "cooling", "dimming"] },
      { id: "b", accepted: ["El Niño"], choices: ["El Niño", "La Niña", "monsoon"] },
      { id: "c", accepted: ["enhanced"], choices: ["enhanced", "natural", "reduced"] },
    ], explanation: "Global warming potential; El Niño; enhanced greenhouse effect." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each greenhouse gas to a main human source.",
    pairs: [
      ["Carbon dioxide", "Burning coal, oil and gas"],
      ["Methane", "Cattle and flooded rice fields"],
      ["Nitrous oxide", "Nitrogen fertilisers on farmland"],
      ["F-gases", "Refrigeration and air conditioning"],
      ["Water vapour", "Evaporation that increases as the air warms"],
    ], explanation: "Each gas has characteristic sources." });
  b.num({ d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: "A farming region emits 3 million tonnes of methane. Using a GWP of 28, calculate the emissions in million tonnes of carbon dioxide equivalent (CO2e).",
    value: q12, wrong: [3, 0.107],
    explanation: "CO2e = mass × GWP = 3 × 28 = **84 million tonnes CO2e**." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true,
    stem: "A fertiliser industry emits 0.4 million tonnes of nitrous oxide. Using a GWP of 265, calculate the emissions in million tonnes of CO2e.",
    hints: ["Multiply the mass by the GWP."],
    value: q13, wrong: [0.0015, 10.6],
    explanation: "0.4 × 265 = **106 million tonnes CO2e**. Dividing by the GWP instead of multiplying gives 0.0015." });
  b.calc({ d: 3, skill: "APPLICATION", calculator: true, dp: 1,
    stem: "A country emits 8 million tonnes (Mt) of CO2, 0.08 Mt of nitrous oxide (GWP 265) and 0.002 Mt of the refrigerant gas HFC-134a (GWP about 1 300). Calculate its total emissions in Mt CO2e, to 1 decimal place.",
    hints: ["Convert methane and nitrous oxide to CO2e first.", "Then add the three amounts."],
    value: q14, wrong: [8.08, 21.2],
    explanation: "1. CO2 = 8 Mt CO2e.\n2. Nitrous oxide = 0.08 × 265 = 21.2 Mt CO2e.\n3. HFC-134a = 0.002 × 1 300 = 2.6 Mt CO2e.\n4. Total = 8 + 21.2 + 2.6 = **31.8 Mt CO2e**. Adding the raw masses (8.082) ignores the different warming potentials." });
  b.num({ d: 2, skill: "APPLICATION", calculator: true, dp: 1, unit: "%",
    stem: "Direct measurements show atmospheric CO2 at about 315 ppm in 1958 and about 418 ppm in 2022. Calculate the percentage increase, to 1 decimal place.",
    hints: ["Percentage increase = (new − old) ÷ old × 100."],
    value: q15, wrong: [24.6, 103],
    explanation: "(418 − 315) ÷ 315 × 100 = 103 ÷ 315 × 100 = **32.7%**. Dividing by 418 would give 24.6%, the wrong base." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, dp: 1,
    stem: "Over a period of 117 years global mean sea level rose by about 20 cm. Calculate the average rate of rise in mm per year, to 1 decimal place.",
    hints: ["Convert centimetres to millimetres first.", "Divide by the number of years."],
    value: q16, wrong: [0.2, 17],
    explanation: "20 cm = 200 mm. 200 ÷ 117 = **1.7 mm per year** (the recent rate is faster)." });
  b.short({ d: 1, skill: "RECALL", stem: "Name the proxy record that uses the annual growth layers of trees.",
    accepted: ["tree rings", "tree ring", "dendrochronology", "growth rings", "tree-ring"], wrong: ["ice cores"],
    explanation: "**Tree rings** record each year's growth conditions." });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how ice cores provide evidence of past climates.",
    hints: ["Think about what is trapped in the ice and what the ice itself contains."],
    points: [
      "Snow accumulates in layers each year and is compressed to ice, trapping bubbles of air.",
      "The air in the bubbles can be analysed to find past concentrations of CO2 and methane.",
      "Ratios of oxygen isotopes in the ice show the temperature when the snow fell, so changes in CO2 and temperature can be compared back hundreds of thousands of years.",
    ],
    modelAnswer: "Each year's snow forms a layer that is compressed into ice, trapping bubbles of ancient air. Scientists measure the gases in the bubbles to find past CO2 and methane, and the oxygen isotopes in the ice to find the temperature, giving a record that goes back about 800 000 years.",
    explanation: "Gas bubbles show composition; isotopes show temperature." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain why carbon dioxide has the largest effect on global warming even though methane has a higher global warming potential per tonne.",
    hints: ["Think about the amounts emitted and how long each gas stays in the atmosphere."],
    points: [
      "Far more CO2 is emitted than methane (it is released from burning fossil fuels and deforestation on a very large scale).",
      "CO2 stays in the atmosphere for hundreds of years or more, so it accumulates.",
      "Methane lasts only about 12 years, so its concentration does not build up in the same way.",
      "The total effect depends on the mass emitted, the GWP and the lifetime, so CO2 dominates the long-term warming.",
    ],
    modelAnswer: "Total warming effect depends on how much is emitted, how potent it is and how long it lasts. Far larger masses of CO2 are emitted, and CO2 stays in the atmosphere for centuries, so it accumulates. Methane has a higher GWP per tonne but is emitted in smaller amounts and lasts only about 12 years. Overall CO2 has the largest long-term effect.",
    explanation: "Emission mass and lifetime outweigh the higher potency of methane." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Illustrative data for a mountain station:\n\n" + tbl(["Year", "1960", "1980", "2000", "2020"], [["CO2 (ppm)", 317, 339, 370, 413], ["Mean annual temperature (°C)", 12.1, 12.3, 12.8, 13.4]]) + "\n\nDescribe the changes shown and comment on the relationship.",
    hints: ["Quote the start and end values for each row.", "Say whether the two series move together."],
    points: [
      "CO2 rose steadily from 317 ppm in 1960 to 413 ppm in 2020, an increase of 96 ppm.",
      "Mean temperature rose from 12.1 °C to 13.4 °C, an increase of 1.3 °C.",
      "The rises happened together, and the rate of increase was greater after 1980 in both series.",
      "This is consistent with a link between CO2 and temperature, but a correlation of two series does not prove cause on its own (other evidence is needed).",
    ],
    modelAnswer: "CO2 rose from 317 ppm to 413 ppm (96 ppm) between 1960 and 2020, and mean temperature rose from 12.1 °C to 13.4 °C (1.3 °C). Both rose faster after 1980. The two series are consistent with a link, but correlation alone does not prove causation, so other evidence is needed.",
    explanation: "Describe both series with figures, then comment cautiously on cause." });

  b.struct({ d: 4, skill: "ANALYSIS",
    stem: "Illustrative seasonal rainfall (mm) at a rain-fed farming station, with the ENSO phase of each season:\n\n" + tbl(["Season", "1", "2", "3", "4", "5", "6", "7", "8"], [["ENSO phase", "El Niño", "Neutral", "La Niña", "Neutral", "El Niño", "La Niña", "Neutral", "El Niño"], ["Rainfall (mm)", 410, 720, 980, 690, 380, 910, 740, 450]]),
    hints: ["Add the relevant seasons and divide by how many there are."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the mean rainfall of the El Niño seasons, in mm to 1 decimal place.", value: mEN, dp: 1, unit: "mm", wrong: [1240, 413],
        explanation: "(410 + 380 + 450) ÷ 3 = 1 240 ÷ 3 = 413.3 mm." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the mean rainfall of the La Niña seasons, in mm.", value: mLN, unit: "mm", wrong: [1890, 716.7],
        explanation: "(980 + 910) ÷ 2 = 945 mm." }),
      P.num({ label: "(c)", marks: 2, stem: "The mean rainfall of the neutral seasons is 716.7 mm. Calculate the mean El Niño rainfall as a percentage of the neutral mean, to 1 decimal place.", value: pctEN, dp: 1, unit: "%", wrong: [42.3, 57],
        explanation: "413.3 ÷ 716.7 × 100 = 57.7%." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest two ways in which an El Niño season could affect farmers at this station.",
        points: [
          "Lower rainfall reduces crop yields or causes crop failure (and so reduces food and income).",
          "Less grazing and less water for livestock and households, which may force farmers to sell animals or use drought-tolerant crops.",
        ], modelAnswer: "Low rainfall can cause crop failure and loss of income, and grazing and water for livestock and households become scarce.",
        explanation: "El Niño seasons are drier, which threatens crops and livestock." }),
    ], explanation: "Compare mean rainfall by ENSO phase." });

  b.struct({ d: 4, skill: "ANALYSIS",
    stem: "Illustrative annual emissions of a country:\n\n" + tbl(["Gas", "Mass emitted (Mt)", "GWP over 100 years"], [["Carbon dioxide", 14, 1], ["Methane", 0.9, 28], ["Sulphur hexafluoride (SF6)", 0.0006, 23500]]),
    hints: ["CO2e = mass × GWP.", "Share = part ÷ total × 100."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the emissions of methane in Mt CO2e.", value: ch4, dp: 1, wrong: [0.9, 14],
        explanation: "0.9 × 28 = 25.2 Mt CO2e." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the emissions of sulphur hexafluoride in Mt CO2e, to 1 decimal place.", value: n2o, dp: 1, wrong: [0.0006, 141],
        explanation: "0.0006 × 23 500 = 14.1 Mt CO2e." }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the country's total emissions in Mt CO2e, to 1 decimal place.", value: tot, dp: 1, wrong: [14.9, 39.3],
        explanation: "14 + 25.2 + 14.1 = 53.3 Mt CO2e." }),
      P.num({ label: "(d)", marks: 2, stem: "Calculate the percentage of the total CO2e that comes from methane, to 1 decimal place.", value: share, dp: 1, unit: "%", wrong: [6, 28.9],
        explanation: "25.2 ÷ 53.3 × 100 = 47.3%." }),
      P.manual({ label: "(e)", marks: 4, stem: "Suggest how this country could reduce its methane emissions.",
        points: [
          "Improve livestock management (better feed and breeding to cut methane per animal, or fewer low-productivity animals).",
          "Capture methane from manure and landfill and use it for biogas or electricity.",
          "Change rice growing practices (for example drying the fields during the season) or reduce leaks from gas and coal mining.",
          "Reduce food waste, which cuts the methane from landfill and the need for production.",
        ], modelAnswer: "The country could improve livestock management to cut methane from each animal, capture methane from manure and landfill for biogas, improve rice-field water management, and reduce waste that goes to landfill.",
        explanation: "Methane comes mainly from livestock, rice, landfill and fossil fuel leaks, so measures target these." }),
    ], explanation: "Convert each gas to CO2e before comparing." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the relative importance of natural and human causes in explaining global warming since 1850.",
    hints: ["Describe each natural cause and its size, then the human causes.", "Compare them and reach a judgement."],
    points: [
      "Solar output varies by only about 0.1% over the sunspot cycle, which is too small and does not match the pattern of warming.",
      "Volcanic eruptions cause short-term cooling through aerosols, and their CO2 emissions are much smaller than human emissions.",
      "ENSO causes variation from year to year (El Niño years are warmer) but does not produce a long-term trend.",
      "Greenhouse gas concentrations have risen sharply (CO2 from about 280 ppm to over 420 ppm), matching the rise in temperature.",
      "Burning fossil fuels, deforestation and agriculture explain the rise in gases.",
      "Ice cores show that natural changes in CO2 in the past were slower than the present rise.",
      "Natural factors may add short-term variability and some uncertainty remains about the size of aerosol cooling and feedbacks.",
      "Judgement: human emissions are the dominant cause of the warming since 1850; natural causes explain variability but not the trend.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Natural causes are real but cannot explain the long-term warming. The Sun's output changes by only about 0.1% over its cycle, volcanic eruptions cool the planet for a year or two, and El Niño and La Niña shift temperatures from year to year without making a trend. By contrast, carbon dioxide has risen from about 280 ppm to over 420 ppm and temperature has risen by about 1.1 °C, and the increase in gases is explained by burning fossil fuels, deforestation and agriculture. Ice cores show that past natural changes in CO2 were far slower than the present rise. Some uncertainty remains over aerosols and feedbacks, but I conclude that human activities are the dominant cause of warming since 1850, while natural factors mainly add variability.",
    wordLimit: { max: 300 }, explanation: "Weigh the size and timing of each cause against the observed trend." });

  b.card("DEFINITION", "Proxy record", "Indirect evidence of past climate in natural archives: ice cores, tree rings, pollen, ocean sediments and fossils.");
  b.card("FACT", "Ice cores", "Antarctic ice cores go back about 800 000 years; bubbles show past CO2 and methane, and oxygen isotopes show temperature.");
  b.card("FACT", "Warming since 1850", "About 1.1 °C warmer in 2011-2020 than in 1850-1900 (IPCC); CO2 up from about 280 ppm to over 420 ppm; sea level up about 20 cm 1901-2018.");
  b.card("DEFINITION", "Global warming potential", "Heat trapped by a gas over a stated period (usually 100 years) relative to the same mass of CO2 (GWP = 1).");
  b.card("FORMULA", "Carbon dioxide equivalent", "CO2e = mass of gas × GWP. Methane about 28, nitrous oxide about 265 (100-year values, rounded).");
  b.card("CONCEPT", "Natural causes of climate change", "Solar output (about 0.1% over the sunspot cycle), volcanic aerosols (short cooling) and ENSO (year-to-year variation); none explains the long-term warming.");
  b.card("CONCEPT", "Human causes of climate change", "Fossil fuels (CO2), deforestation, livestock and rice (methane), fertilisers (N2O), F-gases and albedo change: the enhanced greenhouse effect.");
  b.card("DEFINITION", "El Niño and La Niña", "El Niño: weak trades, warm water spreads east in the Pacific; southern Africa tends to be drier. La Niña: strong trades, cool eastern Pacific; southern Africa tends to be wetter.");
});
