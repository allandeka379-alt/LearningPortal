// Slice G1a: climate change, evidence and causes.
import { concept, P, geographyLevels } from "../lib.mjs";

const SI = "| Year | Arctic sea-ice extent in September (million km²) (fictional, rounded) |\n|---|---|\n| 1985 | 7.2 |\n| 1995 | 6.6 |\n| 2005 | 5.7 |\n| 2015 | 4.9 |\n| 2025 | 4.6 |";

concept("geo.climate-change.causes-evidence", { file: "climate-change/causes-evidence", keyPrefix: "climate-change.causes-evidence" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which gas is added to the atmosphere in the greatest amount by burning coal, oil and gas?",
    options: [
      ["Carbon dioxide", "Correct: burning fossil fuels releases the carbon stored in them."],
      ["Oxygen", "Burning uses up oxygen; it does not add it."],
      ["Nitrogen", "Nitrogen is the main gas of the air but is not released by burning fuels in this way."],
      ["Ozone", "Ozone is not the main product of burning fossil fuels."],
    ],
    answer: "A",
    explanation: "Burning fossil fuels releases **carbon dioxide**, the main greenhouse gas added by people.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does the **natural** greenhouse effect do?",
    options: [
      ["Keeps the Earth warm enough for life", "Correct: without it the average would be about −18 °C."],
      ["Creates the hole in the ozone layer", "Ozone depletion is a separate problem caused mainly by CFCs."],
      ["Causes all extreme weather events", "Extreme events have many causes; the natural effect keeps the Earth habitable."],
      ["Blocks all sunlight from reaching the ground", "Sunlight passes through; the gases trap outgoing heat."],
    ],
    answer: "A",
    explanation: "Greenhouse gases trap outgoing heat, keeping the average temperature about 15 °C instead of about −18 °C.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How do large volcanic eruptions usually affect global temperature in the following year or two?",
    options: [
      ["They cool it, as sulphur droplets reflect sunlight", "Correct: as after Pinatubo in 1991."],
      ["They warm it by several degrees with lava heat", "Lava heats only a small area; the global effect is cooling."],
      ["They have no effect at all", "Large eruptions measurably cool the Earth for a year or two."],
      ["They warm it by thinning the ozone layer", "The short-term effect of big eruptions is cooling."],
    ],
    answer: "A",
    explanation: "Sulphur dioxide forms tiny droplets high in the atmosphere that **reflect sunlight**, cooling the Earth for 1-3 years.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What do ice cores from Antarctica provide evidence of?",
    options: [
      ["Past carbon dioxide levels and temperatures", "Correct: trapped air bubbles and the ice itself record past conditions."],
      ["The number of sunspots each year", "Sunspots are recorded by telescope observations."],
      ["Changes in sea-ice area since 1979", "Sea-ice area is measured by satellites."],
      ["The dates of past grain harvests in Europe", "Harvest dates come from historical records."],
    ],
    answer: "A",
    explanation: "Bubbles of ancient air in the ice show **past CO₂ levels**, and the ice chemistry shows past temperatures.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which farming activity releases large amounts of **methane**?",
    options: [
      ["Keeping cattle and growing paddy rice", "Correct: digestion in cattle and waterlogged rice fields give off methane."],
      ["Using solar-powered irrigation pumps", "Solar pumps produce no methane."],
      ["Planting trees around fields", "Trees absorb carbon dioxide."],
      ["Mulching with crop residues", "Mulch on the surface rots with air and is not a major methane source."],
    ],
    answer: "A",
    explanation: "**Cattle** and **rice paddies** are major sources of methane.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why can Milankovitch cycles **not** explain the warming of the last 100 years?",
    options: [
      ["They work over tens of thousands of years, far too slowly", "Correct: orbital changes are very gradual."],
      ["They only affect the northern hemisphere", "Orbital changes affect sunlight across the whole Earth."],
      ["They stopped when the last ice age ended", "The cycles continue; they are simply very slow."],
      ["They change the amount of carbon dioxide in the air directly", "They change sunlight; any CO₂ response is very slow."],
    ],
    answer: "A",
    explanation: "Orbital cycles operate over about 20,000-100,000 years; recent warming has happened in decades.",
    hints: ["Compare the time scales."],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "How does deforestation add to the enhanced greenhouse effect?",
    options: [
      ["Carbon stored in trees is released and less CO₂ is absorbed", "Correct: it adds CO₂ and removes a carbon store."],
      ["Cleared land reflects all the sun's heat back to space", "Bare land may reflect a little more light, but the main effect is carbon release."],
      ["Fallen trees release oxygen that traps heat", "Oxygen is not a greenhouse gas."],
      ["Forests produce methane that is lost when trees are cut", "Forests are not major methane sources; the issue is carbon."],
    ],
    answer: "A",
    explanation: "Burning or rotting trees **releases carbon dioxide**, and fewer trees remain to **absorb** it.",
    hints: ["Trees store carbon.", "What happens to that carbon when trees are burned?"],
  });
  b.calc({
    d: 2, skill: "APPLICATION",
    stem: "Carbon dioxide in the atmosphere was about 280 ppm before industrialisation. Taking today's value as 420 ppm, calculate the percentage increase.",
    value: 50, unit: "%",
    wrong: [140, 150],
    explanation: "Increase = 420 − 280 = 140 ppm; 140 ÷ 280 × 100 = 50 %.",
    workedSolution: "1. Increase = 420 − 280 = 140 ppm.\n2. Percentage increase = 140 ÷ 280 × 100 = 50 %.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: `Study the fictional data.\n\n${SI}\n\nBy how many million km² did the September sea-ice extent fall from 1985 to 2025? Give your answer to one decimal place.`,
    value: 2.6, tol: 0.05,
    wrong: [11.8, 0.3],
    explanation: "7.2 − 4.6 = 2.6 million km².",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: `Study the fictional data.\n\n${SI}\n\nCalculate the percentage decrease in September sea-ice extent from 1985 to 2025. Give your answer to the nearest whole number.`,
    value: 36, unit: "%", tol: 0.5,
    wrong: [57, 2.6],
    explanation: "Decrease = 2.6; 2.6 ÷ 7.2 × 100 = 36.1 %, about 36 %.",
    workedSolution: "1. Decrease = 7.2 − 4.6 = 2.6 million km².\n2. 2.6 ÷ 7.2 = 0.361.\n3. × 100 = 36.1 %, about 36 %.",
    hints: ["Percentage change = change ÷ original × 100.", "The original value is the 1985 figure."],
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "A fictional mountain glacier was 12.4 km long in 1950 and 10.6 km long in 2020. Calculate its average rate of retreat in metres per year (give the number only, to the nearest whole number).",
    value: 26, tol: 0.5,
    wrong: [1800, 18],
    explanation: "Retreat = 12.4 − 10.6 = 1.8 km = 1,800 m over 70 years; 1,800 ÷ 70 = 25.7, about 26 m per year.",
    workedSolution: "1. Retreat = 12.4 − 10.6 = 1.8 km = 1,800 m.\n2. Time = 2020 − 1950 = 70 years.\n3. Rate = 1,800 ÷ 70 = 25.7 m per year, about 26 m per year.",
    hints: ["Convert km to m.", "Divide by the number of years."],
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Short-wave radiation from the sun heats the ground, which gives off {{blank:a}}-wave heat radiation. Greenhouse gases {{blank:b}} some of this heat and re-radiate it back towards the surface.",
    blanks: [
      { id: "a", accepted: ["long"], choices: ["long", "short", "micro"] },
      { id: "b", accepted: ["absorb", "trap"], wrong: "reflect" },
    ],
    explanation: "The Earth emits **long-wave** (infra-red) radiation, which greenhouse gases **absorb**.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each type of evidence with what it shows.",
    pairs: [
      ["Ice cores", "Carbon dioxide levels over hundreds of thousands of years"],
      ["Satellite images of the Arctic", "Shrinking summer sea ice since 1979"],
      ["Photographs of Kilimanjaro", "Retreat of mountain ice fields"],
      ["Old diaries and paintings", "Cold winters of the Little Ice Age"],
    ],
    explanation: "Different sources give evidence over different time scales.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Changes in the sun's output explain most of the warming since 1950.",
    answer: false,
    explanation: "False. The sun's output shows no upward trend over recent decades; the main cause is the build-up of greenhouse gases.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Methane is a greenhouse gas.",
    answer: true,
    explanation: "True. Methane traps far more heat per molecule than carbon dioxide.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the slow cycles in the Earth's orbit and tilt that help explain the ice ages.",
    accepted: ["Milankovitch cycles", "Milankovitch", "Milankovich cycles", "Milankovitch cycle", "orbital cycles", "Milankovic cycles"],
    wrong: ["sunspot cycles"],
    explanation: "**Milankovitch cycles**: orbit shape, tilt and wobble.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how the natural greenhouse effect works.",
    points: [
      "Short-wave radiation from the sun passes through the atmosphere and heats the Earth's surface.",
      "The surface gives off long-wave (infra-red) radiation.",
      "Greenhouse gases (CO₂, water vapour, methane) absorb it and re-radiate some back, warming the lower atmosphere.",
    ],
    modelAnswer: "Short-wave energy from the sun passes through the atmosphere and warms the ground. The warm ground gives off long-wave heat. Greenhouse gases such as water vapour, carbon dioxide and methane absorb much of this heat and send some back down, so the lower atmosphere stays warm.",
    explanation: "Credit incoming short-wave, outgoing long-wave and absorption by named gases.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Explain how **two** human activities in Zimbabwe add to the enhanced greenhouse effect.",
    points: [
      "Activity 1 named (e.g. burning coal at Hwange power station / vehicles burning petrol and diesel).",
      "Explained: releases carbon dioxide, which traps more heat.",
      "Activity 2 named (e.g. clearing woodland for tobacco curing, firewood or farmland / cattle keeping).",
      "Explained: releases stored carbon and reduces CO₂ absorption (or cattle release methane), increasing heat trapped.",
    ],
    modelAnswer: "Burning coal at Hwange power station releases carbon dioxide into the atmosphere, which absorbs more of the Earth's outgoing heat. Clearing woodland for tobacco curing and firewood releases the carbon stored in the trees and leaves fewer trees to absorb CO₂, so greenhouse gas levels rise further.",
    explanation: "One mark for each activity and one for each explanation linked to a gas.",
    hints: ["Think about energy, transport, forests and farming.", "Name the gas each activity adds."],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 7,
    stem: "\"Natural factors are more important than human activities in causing climate change.\" Evaluate this statement.",
    points: [
      ["Milankovitch cycles explain ice ages over tens of thousands of years.", 1],
      ["Sunspots/solar output vary (e.g. low output during the Little Ice Age).", 1],
      ["Volcanic eruptions cause short-term cooling (e.g. Pinatubo 1991).", 1],
      ["Human activities: fossil fuels, deforestation, farming add CO₂, methane, nitrous oxide.", 1],
      ["Evidence: CO₂ from about 280 ppm to over 400 ppm; temperature up about 1.1 °C since the 1800s.", 1],
      ["Natural factors are too slow (orbits) or cause cooling (volcanoes) or show no upward trend (sun) recently.", 1],
      ["Judgement: natural factors dominate over very long time scales, but human activities are the main cause of recent warming.", 1],
    ],
    levels: geographyLevels(7),
    modelAnswer: "Over very long time scales natural factors have been the main drivers of climate. Milankovitch cycles in the Earth's orbit and tilt, over tens of thousands of years, explain the ice ages and warm interglacials. Changes in the sun's output matter too: a long period with few sunspots coincided with the Little Ice Age. Large eruptions such as Pinatubo in 1991 cool the Earth for a year or two.\n\nHowever, these factors cannot explain recent warming. Orbital cycles are far too slow, eruptions cause cooling, and the sun's output has shown no upward trend in recent decades. Meanwhile human activities, mainly burning fossil fuels, deforestation and farming, have raised carbon dioxide from about 280 ppm to over 400 ppm and added methane and nitrous oxide. Global temperature has risen by about 1.1 °C since the late 1800s, most of it in the last 50 years.\n\nSo the statement is true over thousands of years but false for the present: human activities are now the main cause of climate change.",
    explanation: "Balanced answers weigh each natural factor against the evidence for human causes and reach a time-scale judgement.",
    hints: ["Consider each natural factor's time scale and direction (warming or cooling).", "Use figures for CO₂ and temperature."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: `Study the fictional data, which are similar in trend to real satellite records.\n\n${SI}`,
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Between which two years shown was the largest fall in extent?", accepted: ["1995 and 2005", "1995-2005", "1995 to 2005", "between 1995 and 2005", "1995 2005"], wrong: ["2015 and 2025"], explanation: "6.6 − 5.7 = 0.9 million km², the largest fall between consecutive years shown." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the mean fall per decade from 1985 to 2025 (million km²). Give your answer to two decimal places.", value: 0.65, tol: 0.005, answer: "0.65", wrong: [2.6], explanation: "2.6 ÷ 4 decades = 0.65 million km² per decade." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain how the loss of sea ice can speed up warming in the Arctic.", points: [
        "Ice is white and reflects most sunlight; open ocean is dark and absorbs more.",
        "More absorbed heat warms the water and melts more ice (a positive feedback).",
      ], explanation: "Credit reflection (albedo) and the feedback loop." }),
      P.manual({ label: "(d)", marks: 3, stem: "Give **three** other types of evidence that the climate is changing.", points: [
        "Rising global temperature records since the 1800s.",
        "Retreating mountain glaciers (e.g. Kilimanjaro) / rising sea level.",
        "Ice cores showing CO₂ now higher than at any time in hundreds of thousands of years.",
      ], explanation: "Other valid points: historical records, tree rings, earlier springs." }),
    ],
    hints: ["Compare each pair of consecutive years.", "1985 to 2025 is four decades."],
    explanation: "Practice in analysing evidence of climate change.",
  });
  b.struct({
    d: 2, skill: "UNDERSTANDING",
    stem: "A Form 4 class (fictional) listed sources of greenhouse gases in their district: a coal-fired boiler at a factory, 300 head of cattle on nearby farms, 12 hectares of woodland cleared for tobacco curing last year, a municipal rubbish dump and heavy traffic on the main road.",
    parts: [
      P.match({ label: "(a)", marks: 3, stem: "Match each source with the main greenhouse gas it adds.", pairs: [
        "Cattle",
        "Rubbish dump",
        "Coal-fired boiler",
      ], right: ["Methane", "Carbon dioxide"], rightIndex: [0, 0, 1], explanation: "Cattle and rotting waste give methane; burning coal gives carbon dioxide." }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain why clearing woodland adds to climate change.", points: [
        "Burning or rotting wood releases the stored carbon as CO₂.",
        "Fewer trees remain to absorb CO₂ by photosynthesis.",
      ], explanation: "Release of carbon and loss of a carbon sink." }),
      P.manual({ label: "(c)", marks: 2, stem: "Suggest **two** ways the district could reduce its emissions.", points: [
        "Replant trees / use alternative fuels for tobacco curing (e.g. efficient barns, woodlots).",
        "Capture methane from the dump for fuel / improve public transport / switch the boiler to cleaner energy.",
      ], explanation: "Credit realistic local measures." }),
    ],
    hints: ["Which sources involve burning?", "Which involve rotting or digestion?"],
    explanation: "Practice in linking local activities with greenhouse gases.",
  });
  b.card("DEFINITION", "Climate change", "A long-term change (decades or more) in the average climate, such as rising temperature or shifting rainfall.");
  b.card("DEFINITION", "Greenhouse effect", "Gases absorb outgoing long-wave heat and re-radiate some back, keeping the Earth about 15 °C on average instead of about −18 °C.");
  b.card("DEFINITION", "Enhanced greenhouse effect", "Extra warming from greenhouse gases added by human activities.");
  b.card("CONCEPT", "Evidence for climate change", "Temperature records, ice cores, Arctic sea ice, retreating glaciers, sea-level rise, historical and natural records.");
  b.card("FACT", "Carbon dioxide levels", "About 280 ppm before industrialisation; over 400 ppm today (approximate).");
  b.card("CONCEPT", "Milankovitch cycles", "Changes in orbit shape (~100,000 years), tilt (~41,000 years) and wobble (~20,000-26,000 years); explain ice ages.");
  b.card("CONCEPT", "Volcanoes and climate", "Sulphur droplets reflect sunlight: global cooling for 1-3 years (e.g. Pinatubo 1991).");
  b.card("CONCEPT", "Human sources of greenhouse gases", "Fossil fuels and cement (CO₂), deforestation (CO₂), cattle, rice and landfills (methane), fertilisers (nitrous oxide).");
  b.card("CONCEPT", "Local human influence on climate", "Urban heat islands, dams (humidity), deforestation and desertification (hotter, drier), afforestation (cooler).");
});
