// W1a: tests for biological molecules, semi-quantitative Benedict's and colorimetry.
import { concept, P, t, chk, table, dpStr } from "../lib.mjs";

const interp = (xs, ys, y) => {
  for (let i = 0; i + 1 < ys.length; i++) {
    const lo = Math.min(ys[i], ys[i + 1]);
    const hi = Math.max(ys[i], ys[i + 1]);
    if (y >= lo && y <= hi) return xs[i] + ((y - ys[i]) * (xs[i + 1] - xs[i])) / (ys[i + 1] - ys[i]);
  }
  throw new Error("interp: outside range");
};

concept("abio.molecules.tests", { file: "molecules/tests", keyPrefix: "molecules.tests" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which reagent and condition are used to test for protein?",
    options: [
      ["Biuret reagent, without heating", "Correct: copper(II) ions form a lilac complex with peptide bonds at room temperature."],
      ["Benedict's solution, heated in a water bath", "This is the test for reducing sugars."],
      ["Iodine in potassium iodide solution, without heating", "This is the test for starch."],
      ["Ethanol, then water, without heating", "This is the emulsion test for lipids."],
    ],
    answer: "A",
    explanation: "Biuret: blue → lilac/purple with protein, no heating. Benedict's needs heat; iodine and the emulsion test do not.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A solution of sucrose is tested with Benedict's solution and heated. What is the result, and why?",
    options: [
      ["It stays blue, because sucrose is not a reducing sugar", "Correct: sucrose must be hydrolysed before it gives a positive Benedict's test."],
      ["It turns brick-red, because sucrose contains glucose", "The glucose in sucrose is bonded to fructose, which blocks the reducing groups."],
      ["It turns lilac, because sucrose contains peptide bonds", "Sucrose has a glycosidic bond, not peptide bonds; lilac is the biuret result."],
      ["It turns blue-black, because sucrose forms a helix", "Blue-black with iodine is the starch test; sucrose is a disaccharide, not a helix."],
    ],
    answer: "A",
    explanation: "In sucrose the glycosidic bond links the reducing groups of glucose and fructose, so neither can reduce copper(II) ions until the bond is hydrolysed.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In the non-reducing sugar test, why is sodium hydrogencarbonate added after boiling the sample with hydrochloric acid?",
    options: [
      ["To neutralise the acid, because Benedict's test needs alkaline conditions", "Correct: in acid conditions Benedict's may not give a positive result."],
      ["To hydrolyse the glycosidic bond in the non-reducing sugar", "The acid and heat hydrolyse the bond; the hydrogencarbonate neutralises the acid afterwards."],
      ["To provide the copper(II) ions that are reduced by the sugar", "Copper(II) ions come from the Benedict's solution."],
      ["To cool the mixture before adding the Benedict's solution", "Cooling is done separately; the hydrogencarbonate is added to neutralise."],
    ],
    answer: "A",
    explanation: "Acid + heat hydrolyse sucrose into glucose and fructose. Benedict's solution works in alkaline conditions, so the excess acid must be neutralised (fizzing stops) before the test.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Four Benedict's tests on fruit juices were carried out under identical conditions. Which colour shows the **highest** concentration of reducing sugar?",
    options: [
      ["Brick-red", "Correct: the most copper(I) oxide forms with the most reducing sugar."],
      ["Yellow", "Yellow shows a moderate concentration, lower than orange or brick-red."],
      ["Green", "Green shows a low concentration: blue copper(II) remains mixed with a little precipitate."],
      ["Blue", "Blue shows no reducing sugar present."],
    ],
    answer: "A",
    explanation: "Blue → green → yellow → orange → brick-red as the concentration of reducing sugar increases, provided volumes, temperature and time are standardised and Benedict's is in excess.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A sample gives a green colour with Benedict's test, and a brick-red precipitate after acid hydrolysis and neutralisation of a fresh sample. What does the sample contain?",
    options: [
      ["A small amount of reducing sugar and some non-reducing sugar", "Correct: green shows a little reducing sugar; the stronger result after hydrolysis shows non-reducing sugar too."],
      ["Only non-reducing sugar and no reducing sugar at all", "A green result before hydrolysis shows that some reducing sugar was present."],
      ["Only reducing sugar, which the acid has made more reactive", "Acid does not make reducing sugars more reactive; it releases more reducing sugar by hydrolysis."],
      ["Starch, which the acid has hydrolysed into protein", "Hydrolysis of starch would give glucose, not protein, and nothing indicates starch was tested."],
    ],
    answer: "A",
    explanation: "Green: a little reducing sugar. Brick-red after hydrolysis: more reducing sugar is now present, released by hydrolysing a non-reducing sugar such as sucrose.",
    hints: ["Compare the two results: what extra reducing sugar appeared?"],
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "A student times how long Benedict's tests take to show the first colour change in glucose standards. Which change would most improve the **validity** of comparing an unknown with the standards?",
    options: [
      ["Use the same volumes, water-bath temperature and excess Benedict's for every tube", "Correct: only concentration should vary, so every other variable is standardised."],
      ["Use a different coloured background for each tube so the changes are easier to see", "A changing background adds a variable; the same background should be used for all."],
      ["Heat the unknown for longer than the standards to be sure of seeing a change", "Unequal heating makes the comparison invalid."],
      ["Use less Benedict's solution in the tubes with the strongest standards", "Volumes must be the same, and Benedict's must be in excess in every tube."],
    ],
    answer: "A",
    explanation: "A semi-quantitative test is valid only if concentration is the only variable that differs between tubes: same volumes, temperature, heating method and excess reagent.",
    hints: ["Which variables must be the same for all tubes?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why does the biuret test give a negative result with a solution of single amino acids?",
    options: [
      ["The colour needs peptide bonds, which free amino acids do not have", "Correct: the copper(II) complex forms with the nitrogen atoms of peptide bonds."],
      ["Amino acids are reducing agents that turn copper(II) into copper(I)", "Reduction of copper(II) is the basis of Benedict's test, not of biuret."],
      ["Amino acids are insoluble and so cannot react with the copper ions", "Most amino acids are soluble in water."],
      ["The test works only when the solution is heated to boiling point", "Biuret does not need heating."],
    ],
    answer: "A",
    explanation: "Biuret detects peptide bonds (two or more), so peptides and proteins give lilac but free amino acids do not.",
    hints: ["What bond does the biuret reagent react with?"],
  });
  // Calibration curve (absorbance falls as glucose rises: blue copper(II) remaining after filtering)
  const cs = [0, 0.25, 0.5, 0.75, 1.0];
  const abs = [0.92, 0.74, 0.57, 0.37, 0.18];
  const unk = interp(cs, abs, 0.46);
  b.calc({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `After Benedict's tests on glucose standards, the precipitate was removed and the absorbance of the remaining blue solution was measured with a colorimeter (red filter).\n\n${table(["Glucose / % (w/v)", "Absorbance / arbitrary units"], cs.map((c, i) => [dpStr(c, 2), dpStr(abs[i], 2)]))}\n\nA sample of mango juice, treated in the same way, gave an absorbance of 0.46. Assuming a straight line between the two nearest standards, estimate the glucose concentration of the juice in % (w/v), to two decimal places.`,
    value: unk, dp: 2, unit: "%",
    wrong: ["0.50", "0.75"],
    explanation: t`1. 0.46 lies between 0.57 (0.50%) and 0.37 (0.75%).
2. Fraction of the interval: $(0.57 - 0.46) \div (0.57 - 0.37) = 0.11 \div 0.20 = 0.55$.
3. Concentration $= 0.50 + 0.55 \times 0.25 = ${dpStr(unk, 3)}$, so ${dpStr(unk, 2)}% (w/v).
4. Absorbance falls as glucose rises because more copper(II) ions are reduced and removed as precipitate, leaving less blue colour.`,
    hints: ["Find the two standards whose absorbances lie either side of 0.46.", "Work out how far 0.46 is between them as a fraction."],
  });
  const rateNum = 1000 / 64;
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "In a semi-quantitative Benedict's test, a sample took 64 s to show the first colour change. Calculate the rate as 1000/t, in s⁻¹, to one decimal place.",
    value: rateNum, dp: 1, unit: "s⁻¹",
    wrong: ["0.016", "64000"],
    explanation: "1000 ÷ 64 = 15.625, which is 15.6 to one decimal place. A shorter time gives a higher rate and means a higher concentration of reducing sugar.",
  });
  const dil = (2 * 10) / 40;
  chk(dil, 0.5);
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "To make a glucose standard, Rudo mixes 10 cm³ of a 2.0% (w/v) glucose solution with 30 cm³ of distilled water. Calculate the concentration of the new solution in % (w/v).",
    value: dil, unit: "%",
    wrong: ["0.67", "6"],
    explanation: "Proportional dilution: concentration = 2.0 × 10 ÷ (10 + 30) = 0.5% (w/v). Dividing by 30 instead of the total volume of 40 cm³ gives 0.67.",
    hints: ["The final volume is 10 + 30 cm³."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In the emulsion test, the sample is first shaken with ethanol and then poured into water; a milky-white emulsion shows lipid.",
    answer: true,
    explanation: "True. Lipid dissolves in ethanol; in water it comes out as tiny droplets (an emulsion) that scatter light.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Iodine solution turns blue-black with glucose.",
    answer: false,
    explanation: "False. Iodine turns blue-black with starch, because iodine ions fit inside the amylose helix. Glucose is detected with Benedict's test.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each test with its positive result.",
    pairs: [
      ["Benedict's test (heated)", "Brick-red precipitate"],
      ["Iodine test", "Blue-black colour"],
      ["Biuret test", "Lilac / purple colour"],
      ["Emulsion test", "Milky-white emulsion"],
    ],
    explanation: "Reducing sugar: brick-red with Benedict's; starch: blue-black with iodine; protein: lilac with biuret; lipid: milky emulsion.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the explanation of Benedict's test.",
    template: "Reducing sugars reduce blue {{blank:a}} ions in Benedict's solution to a brick-red precipitate of {{blank:b}}. The test must be carried out in a {{blank:c}} bath.",
    blanks: [
      { id: "a", accepted: ["copper(II)"], choices: ["copper(II)", "copper(I)", "iron(II)", "iodide"] },
      { id: "b", accepted: ["copper(I) oxide"], choices: ["copper(I) oxide", "copper(II) sulfate", "iron(III) oxide", "copper metal"] },
      { id: "c", accepted: ["hot water"], choices: ["hot water", "ice", "sand", "cold water"] },
    ],
    explanation: "Copper(II) (blue) is reduced to copper(I) oxide (brick-red). A hot water bath is safer than a flame and keeps the temperature standard.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name a reagent used to neutralise the acid in the non-reducing sugar test.",
    accepted: ["sodium hydrogencarbonate", "sodium hydrogen carbonate", "sodium bicarbonate", "sodium hydroxide", "NaHCO3", "sodium carbonate"],
    wrong: ["hydrochloric acid", "Benedict's solution"],
    explanation: "Usually **sodium hydrogencarbonate** (it fizzes until the acid is neutralised); sodium hydroxide or sodium carbonate also work.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 5,
    stem: "Describe how you would show that a solution contains a non-reducing sugar but no reducing sugar.",
    points: [
      "Benedict's test on a sample: equal volume of Benedict's, heat in a water bath (about 80–100 °C) — stays blue (no reducing sugar)",
      "Boil a fresh sample with dilute hydrochloric acid (to hydrolyse glycosidic bonds)",
      "Cool and neutralise with sodium hydrogencarbonate (until fizzing stops / check with pH paper)",
      "Repeat Benedict's test with heating",
      "Brick-red / orange / green precipitate shows non-reducing sugar was present",
    ],
    modelAnswer: "Add an equal volume of Benedict's solution to a sample and heat in a boiling water bath for five minutes: it stays blue, so there is no reducing sugar. Boil a fresh sample with dilute hydrochloric acid to hydrolyse any glycosidic bonds, cool it and add sodium hydrogencarbonate until it stops fizzing. Then repeat Benedict's test with heating. A brick-red (or green to orange) precipitate shows that a non-reducing sugar was present.",
    explanation: "Five creditworthy steps: the first negative test, hydrolysis, neutralisation, the repeat test and the conclusion.",
    hints: ["Two Benedict's tests are needed: before and after hydrolysis."],
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "Explain why using a colorimeter gives a more reliable estimate of glucose concentration than comparing Benedict's colours by eye.",
    points: [
      "Colour judgement by eye is subjective / differs between people or lighting",
      "Colorimeter gives a quantitative (numerical) reading of absorbance or transmission",
      "Unknown read from a calibration curve of standards of known concentration, so it can be interpolated between standards",
    ],
    modelAnswer: "Judging colours by eye is subjective and depends on the observer and the lighting, and only gives a range between standards. A colorimeter gives a numerical absorbance or transmission reading, and the unknown's concentration can be read from a calibration curve drawn through standards of known concentration.",
    explanation: "Subjectivity vs a numerical, calibrated reading.",
    hints: ["What is the problem with judging colours?"],
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "State **two** safety precautions when carrying out Benedict's and biuret tests, with a reason for each.",
    points: [
      "Eye protection because the reagents are irritant / sodium hydroxide in biuret is corrosive",
      "Heat in a water bath (not a naked flame), or use test-tube holders, because boiling tubes can spit / cause burns (or keep ethanol away from flames because it is flammable)",
    ],
    modelAnswer: "Wear eye protection because Benedict's and biuret reagents are irritants and biuret contains corrosive sodium hydroxide. Heat tubes in a water bath, held with tongs, because a naked flame can make the contents spit and cause burns.",
    explanation: "Each precaution needs its reason.",
  });
  // Practice structured: times to first colour change
  const sC = [0.3, 0.6, 0.9, 1.2, 1.5];
  const sT = [118, 70, 49, 38, 31];
  const rates = sT.map((x) => 1000 / x);
  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `Chipo used a standardised Benedict's test to estimate the reducing sugar concentration of honey diluted with water. She timed how long each glucose standard took to show the first colour change at 85 °C.\n\n${table(["Glucose / % (w/v)", "Time to first colour change / s"], sC.map((c, i) => [dpStr(c, 1), sT[i]]))}\n\nThe diluted honey took 57 s.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the rate (1000/t) for the 0.9% standard, in s⁻¹, to one decimal place.", value: rates[2], dp: 1, unit: "s⁻¹", wrong: ["0.020"], explanation: "1000 ÷ 49 = 20.41…, so 20.4 s⁻¹." }),
      P.mcq({
        label: "(b)", marks: 1, stem: "Between which two standards does the concentration of the diluted honey lie?",
        options: [["0.6% and 0.9%", "Correct: 57 s lies between 70 s and 49 s."], ["0.9% and 1.2%", "These standards took 49 s and 38 s, both shorter than 57 s."], ["0.3% and 0.6%", "These took 118 s and 70 s, both longer than 57 s."], ["1.2% and 1.5%", "These took less than 40 s."]],
        answer: "A", explanation: "Longer times mean lower concentrations; 57 s falls between the 0.6% (70 s) and 0.9% (49 s) standards.",
      }),
      P.manual({ label: "(c)", marks: 3, stem: "State **three** variables Chipo must standardise and explain why Benedict's solution must be in excess.", points: ["Two of: volume of sample / volume of Benedict's / water-bath temperature / tube size / shaking (two needed)", "One more standardised variable from the list", "Excess so copper(II) ions do not run out / limit the reaction, so the result depends only on sugar concentration"], modelAnswer: "The volume of sample, the volume of Benedict's solution and the temperature of the water bath. Benedict's must be in excess so that copper(II) ions never run out; otherwise high sugar concentrations would all give the same result." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest how Chipo could obtain a more precise estimate of the concentration.", points: ["Make more standards in the narrow range 0.6–0.9% (e.g. 0.65, 0.70, 0.75, 0.80, 0.85%)", "Repeat each test (three times) and use a mean, or use a colorimeter with a calibration curve"], modelAnswer: "Prepare extra standards between 0.6% and 0.9%, at 0.05% intervals, repeat each test three times and use mean times, or measure the colour with a colorimeter and read the value from a calibration curve." }),
      P.manual({ label: "(e)", marks: 1, stem: "Honey was diluted before testing. Explain why.", points: ["Undiluted honey is too concentrated / would change colour almost immediately or beyond the highest standard, so it could not be compared"], modelAnswer: "Undiluted honey contains so much reducing sugar that it would change colour almost at once, outside the range of the standards." }),
    ],
    explanation: "Time falls as concentration rises; an unknown is placed between the standards that bracket its time. Standardised conditions and excess reagent make the comparison valid.",
    hints: ["Shorter time = higher concentration."],
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "Sipho tested three samples from a groundnut seed, a maize grain and a sorghum stem. His results:\n\n| Sample | Benedict's (heated) | After acid hydrolysis, Benedict's | Iodine | Biuret | Emulsion |\n|---|---|---|---|---|---|\n| Groundnut | blue | blue | orange-brown | lilac | milky |\n| Maize grain | green | orange | blue-black | lilac | clear |\n| Sorghum stem juice | blue | brick-red | orange-brown | blue | clear |",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Which sample contains lipid?", options: [["Groundnut", "Correct: milky emulsion."], ["Maize grain", "Clear emulsion test."], ["Sorghum stem juice", "Clear emulsion test."], ["None of the samples", "The groundnut gave a milky emulsion."]], answer: "A", explanation: "Only the groundnut gave a milky-white emulsion." }),
      P.short({ label: "(b)", marks: 1, stem: "Name the type of sugar present in the sorghum stem juice.", accepted: ["non-reducing sugar", "non reducing sugar", "sucrose", "a non-reducing sugar"], explanation: "Negative before hydrolysis and brick-red after: a non-reducing sugar, most likely sucrose." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain the two Benedict's results for the maize grain.", points: ["Green before hydrolysis: a small amount of reducing sugar", "Orange after hydrolysis: more reducing sugar released by hydrolysis of non-reducing sugar (or of some starch by the acid)"], modelAnswer: "The green result shows a little reducing sugar. After acid hydrolysis there is more reducing sugar (orange), released by hydrolysis of a non-reducing sugar and possibly some starch." }),
      P.manual({ label: "(d)", marks: 2, stem: "Sipho concludes that the groundnut contains no carbohydrate. Evaluate this conclusion.", points: ["Supported for sugars and starch at the levels tested: Benedict's (both) negative and iodine negative", "But tests are not sensitive to very low concentrations / other carbohydrates such as cellulose are not detected, so 'no carbohydrate' is too strong"], modelAnswer: "The negative Benedict's, hydrolysis and iodine tests show no detectable sugars or starch, but the tests cannot detect very small amounts or carbohydrates such as cellulose, so he can only conclude that no sugar or starch was detected." }),
    ],
    explanation: "Each column is a separate test: milky = lipid, lilac = protein, blue-black = starch, Benedict's before and after hydrolysis separates reducing and non-reducing sugars.",
    hints: ["Read each column as one test."],
  });

  b.card("FACT", "Benedict's test: method and positive result?", "Equal volume of Benedict's, heat in a water bath; blue → green/yellow/orange/brick-red with reducing sugar.");
  b.card("CONCEPT", "Why does sucrose give a negative Benedict's result?", "Its glycosidic bond joins the reducing groups of glucose and fructose; it must be hydrolysed first.");
  b.card("FACT", "Steps of the non-reducing sugar test?", "Benedict's negative; boil fresh sample with dilute HCl; cool; neutralise with sodium hydrogencarbonate; Benedict's again → brick-red.");
  b.card("FACT", "Test for starch?", "Iodine in potassium iodide: orange-brown → blue-black.");
  b.card("FACT", "Emulsion test for lipid?", "Shake with ethanol, pour into water: milky-white emulsion.");
  b.card("FACT", "Biuret test for protein?", "Biuret reagent (NaOH + dilute CuSO₄), no heat: blue → lilac/purple; detects peptide bonds.");
  b.card("DEFINITION", "What is a semi-quantitative Benedict's test?", "A standardised test compared with standards of known concentration (colours or time to first colour change) to estimate concentration.");
  b.card("DEFINITION", "What is a calibration curve?", "A graph of a measured value (absorbance or % transmission) against known concentrations, used to read off an unknown.");
  b.card("CONCEPT", "Why use excess Benedict's in a quantitative test?", "So copper(II) ions never run out; the result then depends only on the sugar concentration.");
});
