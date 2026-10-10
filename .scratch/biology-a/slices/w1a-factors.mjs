// W1a: factors affecting enzyme activity.
import { concept, P, t, chk, table, dpStr, pctChange, mean } from "../lib.mjs";

concept("abio.enzymes.factors", { file: "enzymes/factors", keyPrefix: "enzymes.factors" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What happens to an enzyme's active site when the enzyme is denatured?",
    options: [
      ["Its shape changes so the substrate no longer fits", "Correct: broken bonds alter the tertiary structure and so the active site."],
      ["It becomes larger so that more substrate can bind", "Denaturation destroys the specific shape; it does not create extra binding."],
      ["Its amino acid sequence is changed", "Peptide bonds are not broken, so the primary structure is unchanged."],
      ["It is unchanged, but the enzyme moves more slowly", "The active site shape is changed; that is what denaturation means."],
    ],
    answer: "A",
    explanation: "Denaturation breaks hydrogen and ionic bonds holding tertiary structure, changing the shape of the active site so it is no longer complementary to the substrate.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why does the rate of an enzyme-catalysed reaction increase as temperature rises from 10 °C to 30 °C?",
    options: [
      ["More kinetic energy gives more frequent successful collisions", "Correct: more successful collisions form more enzyme-substrate complexes per second."],
      ["The active site becomes more complementary to the substrate", "The active site shape is not improved by warming."],
      ["The concentration of the enzyme increases at higher temperatures", "The amount of enzyme stays the same."],
      ["The activation energy of the reaction rises with temperature", "Temperature does not raise the activation energy; more molecules simply exceed it."],
    ],
    answer: "A",
    explanation: "Below the optimum, higher temperature increases kinetic energy, so enzyme and substrate collide more often and with more energy.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is a buffer solution used in an investigation into the effect of substrate concentration on catalase activity?",
    options: [
      ["To keep the pH constant so that it does not affect the rate", "Correct: pH is a standardised variable controlled by the buffer."],
      ["To provide the substrate for the enzyme", "The buffer controls pH; hydrogen peroxide is the substrate."],
      ["To keep the temperature constant throughout the whole experiment", "A water bath controls temperature."],
      ["To stop the reaction at the end of each timed period", "A buffer maintains pH; it does not stop the reaction."],
    ],
    answer: "A",
    explanation: "Buffers resist changes in pH, so pH stays the same at every substrate concentration and does not confound the results.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which enzyme has an optimum pH of about 2?",
    options: [
      ["Pepsin in the stomach", "Correct: pepsin works in the acidic conditions of the stomach."],
      ["Salivary amylase in the mouth", "Salivary amylase works best at about pH 7."],
      ["Trypsin in the small intestine", "Trypsin works best at about pH 8."],
      ["Catalase in liver cells", "Catalase works at about neutral pH, inside cells."],
    ],
    answer: "A",
    explanation: "Each enzyme's optimum pH matches where it works: pepsin about pH 2, salivary amylase about pH 7, trypsin about pH 8.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "An enzyme is kept at 5 °C for an hour and then warmed to 37 °C. Another sample is kept at 80 °C for an hour and then cooled to 37 °C. What would you expect?",
    options: [
      ["The first sample regains activity; the second does not", "Correct: cold inactivates reversibly; heat denatures permanently."],
      ["Both samples regain full activity at 37 °C", "Denaturation at 80 °C is irreversible, so the second sample does not recover."],
      ["Neither sample regains any activity at 37 °C", "Cold does not denature enzymes, so the first sample recovers."],
      ["The second sample regains activity; the first does not", "This reverses the effects of cold and heat."],
    ],
    answer: "A",
    explanation: "At 5 °C molecules have little kinetic energy, but the active site is intact. At 80 °C bonds holding the tertiary structure break and the enzyme is denatured, which is not reversed by cooling.",
    hints: ["Which treatment changes the enzyme's shape?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "In an experiment on substrate concentration, the rate stops increasing above a certain concentration. Which factor is limiting the rate at these high concentrations?",
    options: [
      ["The concentration of enzyme, because all active sites are occupied", "Correct: the enzyme is saturated, so only more enzyme would raise the rate."],
      ["The concentration of substrate, because it is used up", "At high concentrations substrate is in excess."],
      ["The pH, because the substrate changes the pH", "pH is controlled by a buffer in a fair test."],
      ["The temperature, because the enzyme is denatured", "Raising substrate concentration does not denature the enzyme."],
    ],
    answer: "A",
    explanation: "At saturation every active site is in use, so extra substrate cannot form more enzyme-substrate complexes per second; enzyme concentration limits the rate.",
    hints: ["What happens to the active sites at very high substrate concentrations?"],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A student finds an optimum of 40 °C for an amylase, testing at 20, 40 and 60 °C. Which improvement would most increase confidence in the value of the optimum?",
    options: [
      ["Testing at 2 °C intervals between 30 and 50 °C with three repeats at each", "Correct: smaller intervals near the peak locate it more precisely, and repeats check reliability."],
      ["Testing at 0 °C and 80 °C as well, with one reading at each", "Readings far from the optimum do not help locate it precisely."],
      ["Using a larger volume of starch at each temperature", "Volumes should stay the same; this does not improve precision of the optimum."],
      ["Using a different enzyme at each temperature", "Changing the enzyme introduces a new variable and invalidates the comparison."],
    ],
    answer: "A",
    explanation: "With 20 °C intervals the true optimum could lie anywhere between about 20 and 60 °C. Narrow intervals around the apparent peak, with replicates, give a more precise and reliable estimate.",
    hints: ["How precisely do three readings locate a peak?"],
  });
  const rate = 1000 / 72;
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "At 35 °C, a starch-amylase mixture reached its end point in 72 s. Calculate the rate as 1000/t, in s⁻¹, to three significant figures.",
    value: rate, sf: 3, unit: "s⁻¹",
    wrong: ["0.0139", "72000"],
    explanation: "1000 ÷ 72 = 13.89, which is 13.9 s⁻¹ to three significant figures. Dividing 1 by 72 without the factor of 1000 gives 0.0139.",
  });
  const r25 = 1000 / 200;
  const r35 = 1000 / 125;
  const pc = pctChange(r25, r35);
  chk(pc, 60);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Trypsin digested the gelatin (protein) coating of a strip of exposed photographic film in 200 s at 25 °C and in 125 s at 35 °C. Calculate the percentage increase in rate (1000/t) from 25 °C to 35 °C.",
    value: pc, unit: "%",
    wrong: ["37.5", "-37.5"],
    explanation: t`1. Rate at 25 °C $= 1000 \div 200 = 5.0\ \text{s}^{-1}$; rate at 35 °C $= 1000 \div 125 = 8.0\ \text{s}^{-1}$.
2. Percentage increase $= (8.0 - 5.0) \div 5.0 \times 100 = 60\%$.
3. Working with the times instead gives a 37.5% decrease in time, which is not the change in rate.`,
    hints: ["Convert both times to rates first."],
  });
  const reps = [46, 52, 49];
  const m = mean(reps);
  chk(m, 49);
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "Three repeats of an enzyme reaction at pH 7 took 46 s, 52 s and 49 s. Calculate the mean time in s.",
    value: m, unit: "s",
    wrong: ["147", "52"],
    explanation: "(46 + 52 + 49) ÷ 3 = 147 ÷ 3 = 49 s.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "At temperatures well below the optimum, enzymes are denatured.",
    answer: false,
    explanation: "False. At low temperatures enzymes are inactive because molecules have little kinetic energy, but their shape is intact; activity returns on warming.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "When substrate is in excess, doubling the enzyme concentration approximately doubles the initial rate of reaction.",
    answer: true,
    explanation: "True. Twice as many active sites form twice as many enzyme-substrate complexes per second, provided substrate is not limiting.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each change with its effect on an enzyme-catalysed reaction (all other conditions at the optimum).",
    pairs: [
      ["Temperature raised far above the optimum", "Enzyme denatured; rate falls sharply"],
      ["Substrate concentration increased from low", "Rate rises because substrate was limiting"],
      ["Substrate concentration increased when the enzyme is saturated", "No change in rate"],
      ["pH moved two units away from the optimum", "Ionic bonds disrupted; active site shape altered"],
    ],
    explanation: "High temperature denatures; substrate raises rate until saturation; pH changes alter charges and bonds in the active site.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the explanation.",
    template: "Above the optimum temperature, the enzyme vibrates so much that {{blank:a}} bonds and ionic bonds break. The {{blank:b}} structure changes, so the active site is no longer {{blank:c}} to the substrate.",
    blanks: [
      { id: "a", accepted: ["hydrogen"], choices: ["hydrogen", "peptide", "glycosidic", "ester"] },
      { id: "b", accepted: ["tertiary"], choices: ["primary", "tertiary"] },
      { id: "c", accepted: ["complementary"], choices: ["complementary", "identical", "attached", "opposite"] },
    ],
    explanation: "Hydrogen and ionic bonds break; tertiary structure changes; the active site is no longer complementary. Peptide bonds stay intact.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the type of solution used to keep pH constant in an enzyme investigation.",
    accepted: ["buffer", "buffer solution", "a buffer", "buffers"],
    wrong: ["acid", "water"],
    explanation: "A **buffer solution** resists changes in pH.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why the rate of an enzyme-catalysed reaction falls when the pH is changed from the optimum to a much more acidic value.",
    points: [
      "Higher H⁺ concentration changes the charges on R groups (e.g. –COO⁻ becomes –COOH)",
      "Ionic bonds and hydrogen bonds holding the tertiary structure are disrupted / broken",
      "Active site changes shape / charged groups that bind the substrate are altered",
      "Substrate binds less well / fewer enzyme-substrate complexes form (enzyme may be denatured)",
    ],
    modelAnswer: "At low pH there are many more hydrogen ions, which change the charges on R groups, for example –COO⁻ becomes –COOH. Ionic and hydrogen bonds that hold the tertiary structure are broken, so the active site changes shape and its charged groups no longer attract the substrate. Fewer enzyme-substrate complexes form, so the rate falls; at extreme pH the enzyme is denatured.",
    explanation: "Charge change → bonds broken → active site altered → fewer complexes.",
    hints: ["What do hydrogen ions do to charged R groups?"],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 5,
    stem: "Outline how you would investigate the effect of temperature on the activity of amylase, using starch and iodine.",
    points: [
      "At least five temperatures (e.g. 20–70 °C) using thermostatically controlled water baths",
      "Equilibrate enzyme and starch separately at each temperature before mixing",
      "Sample at regular intervals (e.g. every 10–30 s) into iodine on a spotting tile; record time to end point (no blue-black)",
      "Standardise volume and concentration of amylase and starch, and pH (buffer)",
      "Repeat three times at each temperature, calculate mean time and rate = 1/t; control with boiled amylase",
    ],
    modelAnswer: "Set water baths at 20, 30, 40, 50, 60 and 70 °C. At each temperature place separate tubes of 5 cm³ of 1% starch and 1 cm³ of amylase (with pH 7 buffer) in the bath for five minutes, then mix. Every 10 s, put a drop of the mixture into iodine on a spotting tile and record the time when it no longer turns blue-black. Keep volumes, concentrations and pH the same. Repeat three times at each temperature, calculate mean times and rates as 1/t, and include a control of boiled amylase.",
    explanation: "Range, equilibration, method of measurement, standardised variables, replicates and processing.",
    hints: ["Cover independent, dependent and standardised variables, replicates and processing."],
  });
  const T = [15, 25, 35, 45, 55];
  const tm = [310, 170, 92, 120, 400];
  const rates = tm.map((x) => 1000 / x);
  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `Farai investigated the effect of temperature on the hydrolysis of starch by fungal amylase used in malting sorghum.\n\n${table(["Temperature / °C", "Mean time to end point / s"], T.map((x, i) => [x, tm[i]]))}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the rate (1000/t) at 35 °C in s⁻¹, to one decimal place.", value: rates[2], dp: 1, unit: "s⁻¹", wrong: ["0.011"], explanation: "1000 ÷ 92 = 10.87, so 10.9 s⁻¹." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the rate (1000/t) at 55 °C in s⁻¹, to one decimal place.", value: rates[4], dp: 1, unit: "s⁻¹", wrong: ["0.4"], explanation: "1000 ÷ 400 = 2.5 s⁻¹." }),
      P.manual({ label: "(c)", marks: 3, stem: "Describe the effect of temperature on the rate, using rates calculated from the data.", points: ["Rate increases from 15 °C (3.2) to a maximum at 35 °C (10.9)", "Then decreases to 55 °C (2.5)", "Decrease above the optimum is steeper than the increase / optimum is about 35 °C (between 25 and 45 °C)"], modelAnswer: "The rate rises from 3.2 s⁻¹ at 15 °C to a maximum of 10.9 s⁻¹ at 35 °C, then falls to 2.5 s⁻¹ at 55 °C. The optimum is about 35 °C, although it could lie anywhere between 25 and 45 °C, and the rate falls more steeply above the optimum than it rises below it." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain the results above 35 °C.", points: ["Increased kinetic energy / vibration breaks hydrogen and ionic bonds in the enzyme", "Tertiary structure and active site change shape; substrate no longer complementary", "Fewer enzyme-substrate complexes form; more enzyme molecules denatured as temperature rises"], modelAnswer: "Above 35 °C the enzyme molecules vibrate so much that hydrogen and ionic bonds holding the tertiary structure break. The active site changes shape and is no longer complementary to starch, so fewer enzyme-substrate complexes form. As temperature rises more enzyme molecules are denatured, so the rate falls." }),
    ],
    explanation: "Convert times to rates before describing; rate rises to an optimum through increased collisions then falls as the enzyme is denatured.",
    hints: ["Rate = 1000/t: a longer time means a slower rate."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: "Chipo measured the initial rate of oxygen production by catalase at different concentrations of hydrogen peroxide, keeping enzyme volume, temperature and pH the same.\n\n| Hydrogen peroxide / % | 0.4 | 0.8 | 1.6 | 2.4 | 3.2 | 4.8 |\n|---|---|---|---|---|---|---|\n| Initial rate / cm³ s⁻¹ | 0.12 | 0.23 | 0.40 | 0.49 | 0.53 | 0.54 |",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Describe the relationship between substrate concentration and rate.", points: ["Rate increases almost in proportion at low concentrations (0.12 to 0.40 cm³ s⁻¹ from 0.4 to 1.6%)", "Increase slows and levels off at about 0.54 cm³ s⁻¹ (above 3.2%)"], modelAnswer: "At low concentrations the rate rises almost in proportion, from 0.12 cm³ s⁻¹ at 0.4% to 0.40 cm³ s⁻¹ at 1.6%; the increase then slows and the rate levels off at about 0.54 cm³ s⁻¹ above 3.2%." }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain why the rate levels off.", points: ["All active sites are occupied / enzyme saturated at high substrate concentrations", "Enzyme concentration is now the limiting factor, so extra substrate cannot increase the number of complexes formed per second"], modelAnswer: "At high concentrations all the active sites are occupied at any moment, so the enzyme is saturated; the enzyme concentration, not the substrate, now limits the rate." }),
      P.mcq({ label: "(c)", marks: 1, stem: "Chipo repeats the experiment with twice the volume of catalase. Which describes the expected new maximum rate?", options: [["About 1.08 cm³ s⁻¹", "Correct: twice as many active sites roughly double the maximum rate."], ["About 0.54 cm³ s⁻¹", "This would be true only if the enzyme were not limiting at the plateau."], ["About 0.27 cm³ s⁻¹", "More enzyme does not reduce the maximum rate."], ["About 0.12 cm³ s⁻¹", "This is the rate at the lowest substrate concentration."]], answer: "A", explanation: "At the plateau the enzyme is limiting; doubling it roughly doubles the maximum rate." }),
      P.manual({ label: "(d)", marks: 1, stem: "Suggest why the initial rate rather than the total volume of oxygen was measured.", points: ["Total volume depends on the amount of substrate / initial rate measured before substrate is used up, so it reflects the substrate concentration tested"], modelAnswer: "The total volume depends only on how much hydrogen peroxide there is; the initial rate is measured before the substrate concentration falls, so it reflects the concentration being tested." }),
    ],
    explanation: "Substrate limits at low concentration; at saturation enzyme concentration limits.",
    hints: ["What limits the rate at the plateau?"],
  });

  b.card("CONCEPT", "Effect of temperature below the optimum?", "More kinetic energy → more frequent, more energetic collisions → more enzyme-substrate complexes → faster rate.");
  b.card("CONCEPT", "Effect of temperature above the optimum?", "Hydrogen and ionic bonds break → active site changes shape → substrate no longer fits → denatured, rate falls.");
  b.card("CONCEPT", "How does pH affect enzymes?", "Changes charges on R groups, disrupting ionic and hydrogen bonds and the active site; extreme pH denatures.");
  b.card("FACT", "Optimum pH of pepsin, salivary amylase and trypsin?", "Pepsin about 2; salivary amylase about 7; trypsin about 8.");
  b.card("CONCEPT", "Effect of enzyme concentration (substrate in excess)?", "Rate directly proportional to enzyme concentration.");
  b.card("CONCEPT", "Why does rate level off at high substrate concentration?", "All active sites occupied (saturated); enzyme concentration is now limiting.");
  b.card("FORMULA", "How do you turn a time into a rate?", "Rate = 1/t (or 1000/t for convenient numbers).");
  b.card("DEFINITION", "What is a buffer?", "A solution that resists changes in pH; keeps pH constant in investigations.");
  b.card("CONCEPT", "Why equilibrate enzyme and substrate separately?", "So both are at the test temperature before the reaction starts.");
});
