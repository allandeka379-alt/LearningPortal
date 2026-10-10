// W4a: both-board practical exam-format items: one QUALITATIVE_ANALYSIS question (15 marks; organic functional-group
// tests on four unknowns) and one PLANNING question (15 marks; preparing and purifying ethyl ethanoate).
import { concept, P, t, EXAM, checkExam, Mr, percentYield, sfStr } from "../lib.mjs";

const A = (k) => `achem.${k}`;
const QA = { skill: EXAM.QUALITATIVE_ANALYSIS.skill, secs: EXAM.QUALITATIVE_ANALYSIS.secs, examStyle: true, paper: "Paper 4 (ZIMSEC), Paper 3 (CIE)" };
const PL = { skill: EXAM.PLANNING.skill, secs: EXAM.PLANNING.secs, examStyle: true, paper: "Paper 4 (ZIMSEC), Paper 5 (CIE)" };

concept(A("skills.qualitative-analysis"), { file: "exam/w4a-practical", keyPrefix: "exam.w4a-practical" }, (b) => {
  // ---------------------------------------------------------------- QA: four organic unknowns
  b.struct({
    ...QA, d: 4,
    concepts: [A("skills.qualitative-analysis"), A("carbonyl.aldehydes-ketones"), A("hydroxy.alcohol-reactions"), A("carboxylic.acids-reactions")],
    stem: "You are given four colourless organic liquids, W, X, Y and Z. Each is one of: ethanoic acid, propanal, propanone and propan-2-ol. Wear eye protection; all four are flammable, so heat only in a water bath.\n\nResults:\n\n| Test | W | X | Y | Z |\n|---|---|---|---|---|\n| add Na₂CO₃(aq) | effervescence | no change | no change | no change |\n| add 2,4-DNPH reagent | no change | orange precipitate | orange precipitate | no change |\n| warm with Tollens' reagent | no change | silver mirror | no change | no change |\n| warm with acidified K₂Cr₂O₇ | stays orange | orange to green | stays orange | orange to green |\n| warm with I₂ and NaOH(aq) | no change | no change | pale yellow precipitate | pale yellow precipitate |",
    parts: checkExam(EXAM.QUALITATIVE_ANALYSIS, [
      P.fib({ label: "(a)", stem: "Before testing, a student predicts some results for known compounds. Complete the predictions.", template: "2-methylpropan-2-ol warmed with acidified K₂Cr₂O₇: {{blank:a}}. Ethanal warmed with Fehling's solution: {{blank:b}}. Propene shaken with bromine water: {{blank:c}}. Butanone warmed with Tollens' reagent: {{blank:d}}.", blanks: [
        { id: "a", accepted: ["stays orange"], choices: ["stays orange", "orange to green", "purple to colourless"] },
        { id: "b", accepted: ["red-brown precipitate"], choices: ["red-brown precipitate", "silver mirror", "stays blue"] },
        { id: "c", accepted: ["orange to colourless"], choices: ["orange to colourless", "white precipitate", "no change"] },
        { id: "d", accepted: ["no change"], choices: ["no change", "silver mirror", "orange precipitate"] },
      ], explanation: "Tertiary alcohols are not oxidised; aldehydes reduce Fehling's to Cu₂O; alkenes decolorise bromine water; ketones do not reduce Tollens' reagent." }),
      P.match({ label: "(b)", stem: "Identify each unknown.", pairs: [
        ["W", "ethanoic acid"],
        ["X", "propanal"],
        ["Y", "propanone"],
        ["Z", "propan-2-ol"],
      ], extraRight: ["ethyl ethanoate"], explanation: "W: CO₂ with carbonate. X: C=O, aldehyde. Y: C=O, not aldehyde, CH₃CO–. Z: no C=O, oxidised, CH₃CH(OH)–." }),
      P.short({ label: "(c)", marks: 1, stem: "Name the gas given off by W with sodium carbonate solution.", accepted: ["carbon dioxide", "CO2", "CO₂"], wrong: ["hydrogen"], explanation: "Carbon dioxide; it turns limewater milky." }),
      P.manual({ label: "(d)", marks: 1, stem: "Write an ionic equation for the reaction of W with carbonate ions.", points: ["2CH₃COOH + CO₃²⁻ → 2CH₃COO⁻ + CO₂ + H₂O"], modelAnswer: "2CH₃COOH + CO₃²⁻ → 2CH₃COO⁻ + CO₂ + H₂O" }),
      P.manual({ label: "(e)", marks: 2, stem: "Without using Tollens' reagent, name a reagent that would distinguish X from Y and give the result for each.", points: ["Fehling's (or Benedict's) solution, warm; or acidified K₂Cr₂O₇, warm; or alkaline iodine", "X (aldehyde): red-brown precipitate (or orange to green; or no precipitate with iodine); Y: stays blue (or stays orange; or pale yellow precipitate)"], modelAnswer: "Warm each with Fehling's solution: X gives a red-brown precipitate; Y leaves the solution blue." }),
      P.manual({ label: "(f)", marks: 2, stem: "Explain what the results for Z with acidified dichromate(VI) and with alkaline iodine show about its structure.", points: ["Dichromate(VI) turns green: Z is a primary or secondary alcohol (oxidisable; not tertiary)", "Pale yellow CHI₃: Z contains the CH₃CH(OH)– group (so it is propan-2-ol, a secondary alcohol)"], modelAnswer: "The green colour shows that Z is an alcohol that can be oxidised, so it is primary or secondary. The pale yellow tri-iodomethane precipitate shows a CH₃CH(OH)– group, consistent with propan-2-ol." }),
      P.manual({ label: "(g)", marks: 1, stem: "Give one reason why W does not give a precipitate with 2,4-DNPH even though it contains a C=O group.", points: ["In a carboxylic acid the C=O is part of the COOH group (delocalised with the –OH), so it does not react like an aldehyde or ketone carbonyl"], modelAnswer: "The C=O in a carboxylic acid is part of the carboxyl group and is stabilised by delocalisation with the –OH, so it does not undergo the addition-elimination reaction with 2,4-DNPH." }),
    ]),
    hints: ["Use the tests in order: acid, carbonyl, aldehyde, oxidisable, CH₃CO– or CH₃CH(OH)–."],
    explanation: "W ethanoic acid; X propanal; Y propanone; Z propan-2-ol.",
  });

  // ---------------------------------------------------------------- PLANNING: preparing and purifying ethyl ethanoate
  {
    const nAcid = 0.15, nAlc = 0.3;
    const vAcid = (nAcid * Mr("CH3COOH")) / 1.05;
    const vAlc = (nAlc * Mr("C2H5OH")) / 0.789;
    const theo = nAcid * Mr("CH3COOC2H5");
    const y = percentYield(9.24, theo);
    b.struct({
      ...PL, d: 4, calculator: true,
      concepts: [A("skills.planning-evaluation"), A("carboxylic.esters")],
      stem: "You are to plan the preparation of a pure sample of ethyl ethanoate (boiling point 77 °C) from ethanoic acid and ethanol, using concentrated sulfuric acid as a catalyst.\n\nData: ethanoic acid, Mr 60, density 1.05 g cm⁻³; ethanol, Mr 46, density 0.789 g cm⁻³; ethyl ethanoate, Mr 88.\n\nCH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O",
      parts: checkExam(EXAM.PLANNING, [
        P.manual({ label: "(a)", marks: 2, stem: "The plan uses 0.150 mol of ethanoic acid and 0.300 mol of ethanol. Explain why an excess of ethanol is used.", points: ["The reaction is reversible (an equilibrium)", "Excess ethanol moves the position of equilibrium to the right, increasing the conversion of the (more expensive) ethanoic acid"], modelAnswer: "Esterification is an equilibrium; adding excess ethanol shifts the position to the right, so more of the ethanoic acid is converted to ester." }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the volume of ethanoic acid, in cm³, that contains 0.150 mol.", value: vAcid, sf: 3, unit: "cm³", wrong: [nAcid * 60], explanation: `Mass = 0.150 × 60 = 9.00 g; volume = 9.00 ÷ 1.05 = ${sfStr(vAcid, 3)} cm³.` }),
        P.num({ label: "(c)", marks: 1, stem: "Calculate the volume of ethanol, in cm³, that contains 0.300 mol.", value: vAlc, sf: 3, unit: "cm³", explanation: `Mass = 0.300 × 46 = 13.8 g; volume = 13.8 ÷ 0.789 = ${sfStr(vAlc, 3)} cm³.` }),
        P.manual({ label: "(d)", marks: 4, stem: "Describe, step by step, how you would prepare and purify the ester, naming the apparatus.", points: ["Measure the liquids with measuring cylinders (or burettes) into a round-bottomed (pear-shaped) flask; add about 1 cm³ of concentrated H₂SO₄ slowly with swirling and anti-bumping granules", "Heat under reflux (water bath or heating mantle) for about 20-30 minutes, then rearrange for distillation and collect the crude distillate up to about 80 °C", "Shake the distillate with sodium carbonate (or hydrogencarbonate) solution in a separating funnel, releasing the pressure, and discard the lower aqueous layer", "Dry the ester with anhydrous calcium chloride (or sodium sulfate), filter/decant, and redistil, collecting the fraction at 75-79 °C"], modelAnswer: `Put ${sfStr(vAcid, 3)} cm³ of ethanoic acid and ${sfStr(vAlc, 3)} cm³ of ethanol into a pear-shaped flask with anti-bumping granules and add 1 cm³ of concentrated sulfuric acid slowly with swirling. Heat under reflux on a water bath for 20-30 minutes. Distil, collecting the crude ester below about 80 °C. Shake it with sodium carbonate solution in a separating funnel, releasing the pressure often, and run off the aqueous layer. Dry the ester over anhydrous calcium chloride, decant it and redistil, collecting the fraction boiling between 75 and 79 °C.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Give two safety precautions for this experiment, each with its reason.", points: ["Concentrated sulfuric acid is corrosive: wear gloves and eye protection, add it slowly", "Ethanol and the ester are flammable: heat with a water bath or electric heater, no naked flames (work in a well-ventilated area)"], modelAnswer: "Wear eye protection and gloves because concentrated sulfuric acid is corrosive; heat with a water bath or heating mantle, not a Bunsen flame, because ethanol and ethyl ethanoate are highly flammable." }),
        P.num({ label: "(f)", marks: 2, stem: "The student obtains 9.24 g of pure ethyl ethanoate. Calculate the percentage yield.", value: y, sf: 3, unit: "%", wrong: [percentYield(9.24, 0.3 * 88)], explanation: `Ethanoic acid is limiting: maximum ester = 0.150 × 88 = ${sfStr(theo, 3)} g; yield = 9.24 ÷ ${sfStr(theo, 3)} × 100 = ${sfStr(y, 3)}%. Basing it on ethanol (the excess reagent) gives the wrong maximum.` }),
        P.manual({ label: "(g)", marks: 2, stem: "Describe how you would check the purity of the product, and suggest one reason why the yield is less than 100%.", points: ["Measure the boiling point: pure ester boils sharply at 77 °C (or a single peak in gas chromatography)", "Reason: the reaction is an equilibrium (incomplete conversion), or losses during transfer, washing and distillation"], modelAnswer: "Measure the boiling point: a pure sample boils sharply at 77 °C. The yield is below 100% because esterification is an equilibrium and some product is lost during washing, separating and distillation." }),
      ]),
      hints: ["Volume = mass ÷ density.", "Find the limiting reagent before calculating the yield."],
      explanation: `Excess ethanol shifts the equilibrium; ${sfStr(vAcid, 3)} cm³ acid and ${sfStr(vAlc, 3)} cm³ ethanol; reflux, distil, wash with Na₂CO₃, dry, redistil; yield ${sfStr(y, 3)}%.`,
    });
  }
});
