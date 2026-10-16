// W2b: env.pollution (both boards; items suit both unless tagged).
// Computed: turbidity 85/8 = 10.6; E. coli fall (4800-300)/4800 = 94%; mean E. coli (20+4800+1500+300)/4 = 1655; temperature rise 3;
// noise 85 - 65 = 20 dB = 100 times intensity; PM2.5 mean (46+30+62+22)/4 = 40; readings above limit 3.
import { concept, P, geographyLevels, chk, rnd, mean } from "../lib.mjs";
import { mc, tbl } from "../tables/w2b-_q.mjs";

const SITES = [["1", "2 km upstream", 22, 7.2, 8, 20], ["2", "At the outfall", 25, 6.6, 85, 4800], ["3", "2 km downstream", 24, 6.9, 55, 1500], ["4", "10 km downstream", 23, 7.0, 25, 300]];
const RIV = tbl(["Site", "Position", "Temperature (°C)", "pH", "Turbidity (NTU)", "E. coli (per 100 mL)"], SITES.map(([a, b2, t, p, tu, e]) => [a, b2, t, p.toFixed(1), tu, e]));
const turbRatio = rnd(85 / 8, 1, 10.6, "turbRatio");
const ecoliFall = rnd(((4800 - 300) / 4800) * 100, 0, 94, "ecoliFall");
const ecoliMean = chk(mean([20, 4800, 1500, 300]), 1655);
const tempRise = chk(25 - 22, 3);
const noiseTimes = chk(10 ** ((85 - 65) / 10), 100);
const PM = [46, 30, 62, 22];
const PMTAB = tbl(["Time of day", "07:00", "12:00", "17:00", "22:00"], [["PM2.5 (µg per m³)", ...PM]]);
const pmMean = chk(mean(PM), 40);
const above = chk(PM.filter((x) => x > 25).length, 3);
const pmMax = chk(Math.max(...PM) - Math.min(...PM), 40);

concept("ageo.env.pollution", { file: "env/pollution", keyPrefix: "env.pollution" }, (b) => {
  mc(b, 1, "RECALL", "What is a **point source** of pollution?", [
    ["A single identifiable outlet, such as a factory pipe", "Correct: the discharge can be traced to one place."],
    ["Fertiliser washing off many farm fields into a nearby river", "That is a non-point (diffuse) source."],
    ["Exhaust gases from traffic across a whole city", "That is a non-point source."],
    ["Dust blown from a large dry area", "That is a diffuse source."],
  ], "A **point source** discharges from one identifiable place.");
  mc(b, 1, "RECALL", "Which indicator shows that water has been contaminated by faeces?", [
    ["E. coli", "Correct: it lives in the gut of warm-blooded animals."],
    ["Temperature", "Temperature shows heating, not faecal contamination."],
    ["Turbidity", "Turbidity shows cloudiness from suspended material."],
    ["pH", "pH shows acidity or alkalinity."],
  ], "**E. coli** is an indicator of faecal contamination.");
  mc(b, 2, "UNDERSTANDING", "Which sequence best describes **eutrophication**?", [
    ["Nutrients enter water, algae grow, algae die, decay uses up oxygen", "Correct: the loss of oxygen kills fish."],
    ["Acid rain falls, fish die, algae grow, nutrients decline", "That describes acidification, not eutrophication."],
    ["Water warms, oxygen rises, fish multiply, algae decline", "Warm water holds less oxygen, not more."],
    ["Silt enters water, sunlight increases, plants thrive, oxygen rises", "Silt reduces light and does not define eutrophication."],
  ], "Nutrients lead to algal blooms; decay then **uses up the oxygen**.");
  mc(b, 2, "UNDERSTANDING", "Why is turbidity measured in a water-quality survey?", [
    ["It shows how much suspended material makes the water cloudy", "Correct: soil, waste and algae cloud the water."],
    ["It shows the number of fish in the water", "Turbidity does not count fish."],
    ["It shows how much oxygen the water contains", "Oxygen is measured separately."],
    ["It shows whether the water is acid, neutral or alkaline in nature", "That is measured by pH."],
  ], "**Turbidity** measures cloudiness caused by suspended particles.");
  mc(b, 3, "APPLICATION", "A river has an E. coli count of 20 per 100 mL upstream of a town and 4 800 per 100 mL at the town's outfall. What is the best conclusion?", [
    ["Sewage from the town is probably entering the river", "Correct: a large rise in E. coli points to faecal contamination."],
    ["The town has reduced the amount of pollution in the river", "The count has risen sharply, not fallen."],
    ["The river is unpolluted at both sites", "4 800 per 100 mL is far above the drinking-water standard of none."],
    ["The pH must also have risen above 8.5", "E. coli counts say nothing about pH."],
  ], "A rise in E. coli suggests **faecal contamination** from the outfall.", { hints: ["What does E. coli indicate?"] });
  mc(b, 3, "ANALYSIS", "Which is the best reason why fines for pollution may fail to protect a river?", [
    ["Enforcement staff and treatment works are short of funds", "Correct: laws need money and monitoring to work."],
    ["Fines always increase the total amount of effluent discharged", "Fines are intended to reduce effluent."],
    ["Industries never release pollutants when a law exists", "Laws do not stop pollution automatically."],
    ["Sewage contains no harmful bacteria after being fined", "Fines do not treat sewage."],
  ], "Control by law needs **funding, monitoring and enforcement**.", { hints: ["Think about what has to happen after a law is passed."] });
  b.tf({ d: 1, skill: "RECALL", stem: "Noise and heat can both be forms of pollution.", answer: true,
    feedbackTrue: "Correct: pollution can be energy as well as substances.",
    feedbackFalse: "Not so: noise and thermal pollution are recognised types.",
    explanation: "Pollution includes the addition of energy such as noise, heat and light." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Drinking water should contain no E. coli in a 100 mL sample.", answer: true,
    feedbackTrue: "Correct: any E. coli indicates a risk of disease.",
    feedbackFalse: "Not so: the standard is none detectable in 100 mL.",
    explanation: "Safe drinking water has no detectable E. coli in 100 mL." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "Enrichment of water with nitrates and phosphates is called {{blank:a}}. Cloudiness of water is measured as {{blank:b}}. The principle that those who cause pollution should pay for it is the {{blank:c}} principle.",
    blanks: [
      { id: "a", accepted: ["eutrophication"], choices: ["eutrophication", "acidification", "erosion"] },
      { id: "b", accepted: ["turbidity"], choices: ["turbidity", "salinity", "alkalinity"] },
      { id: "c", accepted: ["polluter pays"], choices: ["polluter pays", "precautionary", "user pays"] },
    ], explanation: "Eutrophication, turbidity and the polluter-pays principle." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each pollution type to a typical effect.",
    pairs: [
      ["Water pollution", "Waterborne disease and fish kills"],
      ["Air pollution", "Respiratory illness and acid rain"],
      ["Noise pollution", "Stress, sleep loss and hearing damage"],
      ["Land pollution", "Contaminated soil and groundwater"],
    ], explanation: "Each type has characteristic effects on health and the environment." });
  b.num({ d: 2, skill: "APPLICATION", daily: true, calculator: true, dp: 1, unit: "times",
    stem: `Illustrative river survey:\n\n${RIV}\n\nHow many times greater is the turbidity at the outfall (site 2) than 2 km upstream (site 1)? Give the answer to 1 decimal place.`,
    hints: ["Divide the outfall value by the upstream value."],
    value: turbRatio, wrong: [77, 0.09],
    explanation: "85 ÷ 8 = **10.6** times. Subtracting (77) gives a difference, not a ratio." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "%", dp: 0,
    stem: `Use the survey data:\n\n${RIV}\n\nCalculate the percentage fall in the E. coli count between the outfall (site 2) and 10 km downstream (site 4), to the nearest whole number.`,
    hints: ["Find the fall, then divide by the outfall value."],
    value: ecoliFall, wrong: [6, 4500],
    explanation: "Fall = 4 800 − 300 = 4 500. 4 500 ÷ 4 800 × 100 = **94%**. Dividing by 300 would give the wrong base." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true,
    stem: `Use the survey data:\n\n${RIV}\n\nCalculate the mean E. coli count per 100 mL of the four sites.`,
    hints: ["Add the four counts and divide by 4."],
    value: ecoliMean, wrong: [6620, 4800],
    explanation: "(20 + 4 800 + 1 500 + 300) ÷ 4 = 6 620 ÷ 4 = **1 655** per 100 mL." });
  b.calc({ d: 4, skill: "ANALYSIS", calculator: true, unit: "times", dp: 0,
    stem: "Noise is measured in decibels (dB), a logarithmic scale on which each increase of 10 dB is a tenfold increase in sound intensity. A busy road measures 85 dB and a quiet street measures 65 dB. How many times greater is the sound intensity at the busy road?",
    hints: ["Find the difference in dB, then divide by 10.", "Each 10 dB is a factor of 10."],
    value: noiseTimes, wrong: [20, 1.3],
    explanation: "1. Difference = 85 − 65 = 20 dB.\n2. 20 dB is two steps of 10 dB, so the intensity is 10 × 10 = **100** times greater." });
  b.short({ d: 1, skill: "RECALL", stem: "Name the bacterium whose presence in water indicates faecal contamination.",
    accepted: ["E. coli", "e coli", "ecoli", "escherichia coli", "e.coli"], wrong: ["algae"],
    explanation: "**E. coli**." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Which Act (name it in full or give its short name) is Zimbabwe's main law for controlling pollution and protecting the environment?",
    accepted: ["Environmental Management Act", "EMA Act", "the Environmental Management Act", "EMA", "Environmental Management Act Chapter 20:27"], wrong: ["Water Act"],
    explanation: "The **Environmental Management Act** (Chapter 20:27)." });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how untreated sewage in a river can cause fish to die.",
    hints: ["Link nutrients, algae and oxygen."],
    points: [
      "Sewage adds nutrients (nitrates and phosphates) to the water.",
      "These cause rapid growth of algae (an algal bloom).",
      "When the algae die, bacteria decompose them and use up the dissolved oxygen, so fish suffocate.",
    ],
    modelAnswer: "Sewage adds nitrates and phosphates, which cause algae to grow rapidly. When the algae die, bacteria decompose them and use up the dissolved oxygen in the water, so fish suffocate.",
    explanation: "Nutrient enrichment leads to oxygen depletion." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain two reasons why air pollution is often worse in a rapidly growing city in a middle-income country than in the countryside.",
    hints: ["Think about traffic, industry and the number of people."],
    points: [
      "Traffic is heavy and vehicles are often old, so large amounts of exhaust gases and particles are released.",
      "Explains why: many people commute by road and fuel and emission standards are weak, so pollution is concentrated in streets.",
      "Industry, power stations and burning of waste are concentrated in or near the city.",
      "Explains why: controls often lag behind fast growth, and buildings trap pollutants, so the air becomes more polluted than in open countryside.",
    ],
    modelAnswer: "Traffic is heavy and vehicles are often old, so the city releases large amounts of exhaust, and weak fuel standards mean pollution is concentrated along busy streets. Industry, power plants and waste burning are also concentrated near the city, and controls often lag behind fast growth, so the air is much more polluted than in open countryside.",
    explanation: "Concentrated sources and weak controls." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4,
    stem: `Illustrative river survey:\n\n${RIV}\n\nDescribe the effect of the outfall on water quality.`,
    hints: ["Quote values from sites 1, 2 and 4."],
    points: [
      "Temperature rises from 22 °C upstream to 25 °C at the outfall.",
      "pH falls from 7.2 to 6.6, becoming slightly acidic.",
      "Turbidity rises from 8 to 85 NTU, and E. coli from 20 to 4 800 per 100 mL.",
      "Quality improves downstream (turbidity 25 NTU and E. coli 300 at 10 km) but is still worse than upstream.",
    ],
    modelAnswer: "At the outfall temperature rises from 22 °C to 25 °C, pH falls from 7.2 to 6.6, turbidity rises from 8 to 85 NTU and E. coli from 20 to 4 800 per 100 mL. Quality improves downstream, but 10 km away turbidity (25 NTU) and E. coli (300) are still higher than upstream.",
    explanation: "Describe each variable with quoted figures and the recovery." });

  b.struct({ d: 4, skill: "ANALYSIS",
    stem: `Pupils sampled a river above and below the outfall of a town's sewage works (illustrative data, invented for this exercise).\n\n${RIV}`,
    hints: ["For a ratio, divide one value by the other.", "Think about oxygen and bacteria."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate how many times greater the turbidity is at the outfall than upstream, to 1 decimal place.", value: turbRatio, dp: 1, unit: "times", wrong: [77, 0.09],
        explanation: "85 ÷ 8 = 10.6 times." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the percentage fall in E. coli from the outfall to 10 km downstream, to the nearest whole number.", value: ecoliFall, dp: 0, unit: "%", wrong: [6, 4500],
        explanation: "(4 800 − 300) ÷ 4 800 × 100 = 94%." }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which statement is supported by the table?", options: [
        ["Water quality improves with distance downstream of the outfall", "Correct: turbidity and E. coli both fall from site 2 to site 4."],
        ["Water quality is at its worst a long way upstream of the outfall", "Upstream has the lowest turbidity and E. coli counts."],
        ["The pH is highest at the point of the sewage outfall", "The outfall has the lowest pH, 6.6."],
        ["The temperature falls at the outfall", "Temperature rises at the outfall."],
      ], answer: "A", explanation: "Values recover with distance downstream." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why water quality recovers with distance downstream of the outfall.",
        points: [
          "Dilution by cleaner water from tributaries and runoff reduces the concentration of pollutants.",
          "Suspended solids settle out, so turbidity falls.",
          "Bacteria die off or are eaten, and sunlight and oxygen in the flowing water break down organic matter.",
        ],
        modelAnswer: "Cleaner water from tributaries dilutes the pollutants, and suspended solids settle, so turbidity falls. E. coli die off in sunlight or are eaten, and oxygen in the flowing, turbulent water helps to break down organic matter.",
        explanation: "Dilution, settling and natural breakdown." }),
    ], explanation: "Calculate from a river survey and explain the recovery." });

  b.struct({ d: 3, skill: "ANALYSIS",
    stem: `A city council measured fine particles (PM2.5) in the air at one roadside site on a weekday (illustrative data, invented for this exercise). In this exercise the council's limit is 25 µg per m³.\n\n${PMTAB}`,
    hints: ["Mean = total ÷ 4.", "Think about the timing of commuting."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the mean PM2.5 concentration for the four readings, in µg per m³.", value: pmMean, wrong: [160, 30],
        explanation: "(46 + 30 + 62 + 22) ÷ 4 = 160 ÷ 4 = 40." }),
      P.num({ label: "(b)", marks: 2, stem: "How many of the four readings were above the limit?", value: above, wrong: [1, 4],
        explanation: "46, 30 and 62 are above 25; 22 is below. So 3 readings." }),
      P.manual({ label: "(c)", marks: 2, stem: "Suggest why the reading at 17:00 is the highest.",
        points: [
          "Evening rush hour traffic gives the greatest number of vehicles and exhaust emissions.",
          "Cooking fires and burning of waste in the evening, and cooling air near the ground that traps pollutants, add to the concentration.",
        ],
        modelAnswer: "At 17:00 traffic is at its heaviest in the evening rush hour, so the most exhaust is released. Evening cooking and burning of waste add to this, and the cooling air near the ground traps the pollutants.",
        explanation: "Rush hour emissions and trapped air." }),
    ], explanation: "Use readings against a limit and suggest causes." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the extent to which laws and regulations are the most effective way of controlling pollution in the cities of low- and middle-income countries.",
    hints: ["Weigh laws against planning, technology, education and community action.", "Use an example if you can."],
    points: [
      "Laws set standards and allow fines under the polluter-pays principle, which gives a legal basis to act against polluters.",
      "Enforcement is often weak because inspectors, laboratories and vehicles are lacking, and penalties can be small or avoided.",
      "Investment in sewage treatment, clean fuels and public transport removes pollution at source; it is costly but effective.",
      "Planning controls (zoning, green belts, ventilation corridors) prevent exposure but are hard to apply in informal settlements.",
      "Education and community action, such as clean-ups and monitoring, build support and reduce littering and dumping.",
      "Economic incentives such as taxes on waste and subsidies for cleaner technology change behaviour.",
      "Legislation without funding and public support has limited effect, as in the case of repeated pollution of Lake Chivero.",
      "Judgement: laws are necessary but not sufficient; they work when combined with investment, planning and community support.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Laws give a legal basis for action. They set standards and allow fines under the polluter-pays principle, but in many cities enforcement is weak because inspectors and laboratories lack funds. Investment in sewage treatment, cleaner fuels and public transport removes pollution at source and is often more effective, though costly. Planning controls such as zoning and green belts reduce exposure, but are hard to apply in informal settlements. Education and community action reduce dumping and build support. The repeated pollution of Lake Chivero shows that rules without funding and public support have limited effect. I conclude that laws are necessary but not sufficient: they work best alongside investment, planning and community involvement.",
    wordLimit: { max: 300 }, explanation: "Weigh laws against other controls and judge." });

  b.card("DEFINITION", "Pollution", "The addition to the environment of substances or energy (noise, heat, light) in amounts that harm living things or reduce environmental quality.");
  b.card("DEFINITION", "Point and non-point sources", "Point: one identifiable outlet (a pipe). Non-point: spread over an area (fertiliser runoff, traffic exhaust).");
  b.card("DEFINITION", "Eutrophication", "Nutrient enrichment of water causes algal blooms; decay of the algae uses up oxygen, killing fish.");
  b.card("FACT", "Water quality indicators", "Temperature, pH, turbidity and E. coli; drinking water should contain no E. coli in 100 mL.");
  b.card("FACT", "Types of pollution", "Water, land, air, noise and visual.");
  b.card("CONCEPT", "Urban pollution sources", "Domestic, construction, manufacturing and power, transport and waste.");
  b.card("CONCEPT", "Pollution and development", "LICs: untreated sewage, open burning. MICs: rapid industry and traffic, weak controls. HICs: cleaner but high waste and traffic emissions.");
  b.card("FACT", "Environmental Management Act", "Zimbabwe's Environmental Management Act (Chapter 20:27) sets standards for waste and effluent and applies the polluter-pays principle.");
  b.card("CONCEPT", "Evaluating pollution controls", "Judge each measure by cost, ease of enforcement and whether it tackles the cause or only the symptom.");
});
