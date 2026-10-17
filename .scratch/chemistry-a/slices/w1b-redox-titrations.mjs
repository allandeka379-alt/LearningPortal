// W1b: achem.electrochem.redox-titrations
import { concept, P, t, ce, ZIM, molesFromSolution, Mr, AR, ecell, titre, meanTitre, sfStr, dpStr, chk } from "../lib.mjs";

concept("achem.electrochem.redox-titrations", { file: "electrochem/redox-titrations", keyPrefix: "electrochem.redox-titrations" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Why is no indicator needed when iron(II) ions are titrated with potassium manganate(VII)?",
    options: [
      ["The first slight excess of manganate(VII) turns the solution pale pink.", "Correct: purple MnO₄⁻ is decolourised until the end point, then one extra drop gives a permanent pink."],
      ["Iron(III) ions are colourless, so the end point is when the yellow colour vanishes.", "Fe³⁺(aq) is pale yellow and its colour does not mark the end point."],
      ["Manganese(II) ions turn deep purple at the end point.", "Mn²⁺ is almost colourless; the pink comes from excess MnO₄⁻."],
      ["Manganate(VII) reacts with the iron to form a brown precipitate at the end point.", "A brown precipitate (MnO₂) means too little acid was used, not the end point."],
    ],
    answer: "A",
    explanation: "Manganate(VII) titrations are self-indicating: MnO₄⁻ (purple) is reduced to nearly colourless Mn²⁺ until all the Fe²⁺ is used up.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is potassium manganate(VII) acidified with dilute sulfuric acid rather than hydrochloric acid in titrations?",
    options: [
      ["Chloride ions would be oxidised, using extra titrant.", "Correct: E⦵cell for MnO₄⁻ with Cl⁻ is positive, so the titre would be too large."],
      ["Hydrochloric acid is too weak to provide H⁺ ions.", "HCl is a strong acid."],
      ["Sulfuric acid also acts as an indicator.", "Sulfuric acid has no indicator function."],
      ["Hydrochloric acid reduces iron(III) back to iron(II).", "Chloride ions do not reduce Fe³⁺."],
    ],
    answer: "A",
    explanation: "Cl⁻ is oxidised by MnO₄⁻ (E⦵cell ≈ +0.16 V), consuming titrant and releasing toxic chlorine. Nitric acid is avoided because it is an oxidising agent.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: t`In $\ce{MnO4- + 8H+ + 5Fe^2+ -> Mn^2+ + 5Fe^3+ + 4H2O}$, how many moles of $\ce{Fe^2+}$ react with 0.0030 mol of $\ce{MnO4-}$?`,
    options: [
      ["0.015 mol", "Correct: 5 mol Fe²⁺ per mol MnO₄⁻."],
      ["0.0030 mol", "This assumes a 1 : 1 ratio."],
      ["0.00060 mol", "This divides by 5 instead of multiplying."],
      ["0.024 mol", "This uses the 8 H⁺ instead of the 5 Fe²⁺."],
    ],
    answer: "A",
    explanation: "Each MnO₄⁻ gains 5 electrons; each Fe²⁺ loses one. 0.0030 × 5 = 0.015 mol.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements about the titration of ethanedioate ions with acidified manganate(VII) are correct?\n\n1. The solution is warmed to about 60 °C before titrating.\n2. Mn²⁺ ions produced catalyse the reaction, so it speeds up.\n3. Two moles of manganate(VII) react with five moles of ethanedioate.",
    options: [
      ["1, 2 and 3", "Correct: all three are true."],
      ["1 and 2 only", "Statement 3 is also true: 2MnO₄⁻ + 5C₂O₄²⁻ + 16H⁺ → 2Mn²⁺ + 10CO₂ + 8H₂O."],
      ["2 and 3 only", "Statement 1 is also true: the reaction is too slow at room temperature."],
      ["1 only", "Statements 2 and 3 are also true."],
    ],
    answer: "A",
    hints: ["Each C₂O₄²⁻ loses 2 electrons; each MnO₄⁻ gains 5."],
    explanation: "The reaction has a high activation energy (two negative ions must react), so it is warmed; it is autocatalysed by Mn²⁺; the electron balance gives 2 : 5.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "In the analysis of a copper(II) salt, the Cu²⁺ ions react with excess iodide and the iodine formed is titrated with sodium thiosulfate. What is the mole ratio Cu²⁺ : S₂O₃²⁻?",
    options: [
      ["1 : 1", "Correct: 2Cu²⁺ give one I₂, which reacts with 2S₂O₃²⁻."],
      ["1 : 2", "Each I₂ needs 2 S₂O₃²⁻, but each I₂ comes from 2 Cu²⁺."],
      ["2 : 1", "This inverts the thiosulfate ratio."],
      ["1 : 4", "Four iodide ions per two Cu²⁺ is a different ratio from Cu²⁺ : S₂O₃²⁻."],
    ],
    answer: "A",
    hints: ["2Cu²⁺ + 4I⁻ → 2CuI + I₂, then I₂ + 2S₂O₃²⁻ → 2I⁻ + S₄O₆²⁻."],
    explanation: "2Cu²⁺ → 1 I₂ → 2S₂O₃²⁻, so Cu²⁺ : S₂O₃²⁻ = 2 : 2 = 1 : 1.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS", applies: ZIM,
    stem: t`Data: $\ce{Co^3+ + e- <=> Co^2+}$ E⦵ = +1.82 V; $\ce{[Co(NH3)6]^3+ + e- <=> [Co(NH3)6]^2+}$ E⦵ = +0.11 V; $\ce{O2 + 4H+ + 4e- <=> 2H2O}$ E⦵ = +1.23 V; $\ce{O2 + 2H2O + 4e- <=> 4OH-}$ E⦵ = +0.40 V. Which statements are correct under standard conditions?

1. Aqueous cobalt(III) ions oxidise water to oxygen.
2. Oxygen in alkaline (ammoniacal) solution oxidises [Co(NH₃)₆]²⁺ to [Co(NH₃)₆]³⁺.
3. Oxygen in acid oxidises aqueous Co²⁺ to Co³⁺.`,
    options: [
      ["1 and 2 only", "Correct: +0.59 V and +0.29 V; statement 3 gives −0.59 V."],
      ["1, 2 and 3", "Statement 3: 1.23 − 1.82 = −0.59 V, not feasible."],
      ["2 and 3 only", "Statement 1 is feasible (1.82 − 1.23 = +0.59 V); statement 3 is not."],
      ["1 only", "Statement 2 is also feasible: 0.40 − 0.11 = +0.29 V."],
    ],
    answer: "A",
    hints: ["Ammonia ligands lower E⦵ for cobalt(III)/cobalt(II) dramatically."],
    explanation: "Changing water ligands for ammonia lowers E⦵ from +1.82 to +0.11 V, so cobalt(III) becomes much more stable: air oxidises ammoniacal cobalt(II), but aqueous Co³⁺ is so strong an oxidant that it oxidises water.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: t`Which ion is reduced by $\ce{Fe^2+(aq)}$ under standard conditions? (E⦵ / V: $\ce{Fe^3+/Fe^2+}$ +0.77; $\ce{VO2+/VO^2+}$ +1.00; $\ce{Cr^3+/Cr^2+}$ −0.41; $\ce{Zn^2+/Zn}$ −0.76; $\ce{Sn^4+/Sn^2+}$ +0.15)`,
    options: [
      [t`$\ce{VO2+}$`, "Correct: 1.00 − 0.77 = +0.23 V, feasible."],
      [t`$\ce{Cr^3+}$`, "−0.41 − 0.77 = −1.18 V: not feasible."],
      [t`$\ce{Zn^2+}$`, "−0.76 − 0.77 = −1.53 V: not feasible."],
      [t`$\ce{Sn^4+}$`, "0.15 − 0.77 = −0.62 V: not feasible."],
    ],
    answer: "A",
    hints: ["The ion reduced must have a more positive E⦵ than Fe³⁺/Fe²⁺."],
    explanation: "Fe²⁺ can reduce only species whose couple has E⦵ more positive than +0.77 V: here VO₂⁺ (+1.00 V), forming VO²⁺.",
  });
  {
    const e = ecell(1.33, 0.15);
    b.num({
      d: 3, skill: "APPLICATION",
      stem: "Calculate E⦵cell, in V, for acidified dichromate(VI) ions oxidising tin(II) ions to tin(IV) ions. (E⦵ / V: Cr₂O₇²⁻/Cr³⁺ +1.33; Sn⁴⁺/Sn²⁺ +0.15.)",
      value: e, dp: 2, unit: "V",
      wrong: [dpStr(-e, 2), dpStr(1.33 - 3 * 0.15, 2)],
      hints: ["Dichromate is reduced; tin(II) is oxidised."],
      explanation: `E⦵cell = 1.33 − 0.15 = +${dpStr(e, 2)} V, so the reaction Cr₂O₇²⁻ + 14H⁺ + 3Sn²⁺ → 2Cr³⁺ + 3Sn⁴⁺ + 7H₂O is feasible. E⦵ values are not multiplied by 3 when the tin half-equation is scaled.`,
    });
  }
  {
    const n = molesFromSolution(21.80, 0.0105) * 5 * 10;
    const pct = ((n * Mr("FeSO4.7H2O")) / 3.20) * 100;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true, daily: false,
      stem: "3.20 g of impure iron(II) sulfate crystals, FeSO₄·7H₂O (Mr = 277.9), was dissolved in dilute sulfuric acid and made up to 100 cm³. 10.0 cm³ portions needed a mean titre of 21.80 cm³ of 0.0105 mol dm⁻³ KMnO₄. Calculate the percentage purity of the crystals, to three significant figures.",
      value: pct, sf: 3, unit: "%",
      wrong: [sfStr(pct / 10, 3), sfStr(pct / 5, 3)],
      hints: ["MnO₄⁻ : Fe²⁺ = 1 : 5.", "Scale the 10.0 cm³ result up to 100 cm³."],
      explanation: `1. n(MnO₄⁻) = 0.02180 × 0.0105 = ${sfStr(molesFromSolution(21.8, 0.0105), 3)} mol.\n2. n(Fe²⁺) in 10.0 cm³ = 5 × that = ${sfStr(n / 10, 3)} mol; in 100 cm³ = ${sfStr(n, 3)} mol.\n3. Mass of FeSO₄·7H₂O = ${sfStr(n, 3)} × 277.9 = ${sfStr(n * Mr("FeSO4.7H2O"), 3)} g.\n4. Purity = ${sfStr(n * Mr("FeSO4.7H2O"), 3)} ÷ 3.20 × 100 = ${sfStr(pct, 3)}%.`,
    });
  }
  {
    const nMn = molesFromSolution(18.40, 0.0180);
    const c = (nMn * 2.5 * 8) / 0.0100;
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: "10.0 cm³ of a hydrogen peroxide solution was diluted to 200 cm³. 25.0 cm³ of the diluted solution, acidified, needed 18.40 cm³ of 0.0180 mol dm⁻³ KMnO₄. Calculate the concentration of the original hydrogen peroxide, in mol dm⁻³, to three significant figures. (2MnO₄⁻ + 5H₂O₂ + 6H⁺ → 2Mn²⁺ + 5O₂ + 8H₂O)",
      value: c, sf: 3, unit: "mol/dm³",
      wrong: [sfStr(c / 10, 3), sfStr((nMn * 2.5) / 0.025, 3)],
      hints: ["MnO₄⁻ : H₂O₂ = 2 : 5.", "The 200 cm³ came from 10.0 cm³ of the original."],
      explanation: `1. n(MnO₄⁻) = 0.01840 × 0.0180 = ${sfStr(nMn, 3)} mol.\n2. n(H₂O₂) in 25.0 cm³ = 5/2 × ${sfStr(nMn, 3)} = ${sfStr(nMn * 2.5, 3)} mol; in 200 cm³ (× 8) = ${sfStr(nMn * 20, 3)} mol.\n3. This was in 10.0 cm³ of the original: c = ${sfStr(nMn * 20, 3)} ÷ 0.0100 = ${sfStr(c, 3)} mol dm⁻³.`,
    });
  }
  {
    const n = molesFromSolution(22.50, 0.0167) * 6;
    const pct = ((n * AR.Fe) / 0.600) * 100;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: "A 0.600 g sample of an iron ore was dissolved in acid and all the iron reduced to Fe²⁺. The solution needed 22.50 cm³ of 0.0167 mol dm⁻³ potassium dichromate(VI) for complete oxidation. Calculate the percentage by mass of iron in the ore, to three significant figures. (Ar Fe = 55.8; Cr₂O₇²⁻ + 14H⁺ + 6Fe²⁺ → 2Cr³⁺ + 6Fe³⁺ + 7H₂O)",
      value: pct, sf: 3, unit: "%",
      wrong: [sfStr(pct / 6, 3), sfStr((pct * 5) / 6, 3)],
      hints: ["Cr₂O₇²⁻ : Fe²⁺ = 1 : 6."],
      explanation: `1. n(Cr₂O₇²⁻) = 0.02250 × 0.0167 = ${sfStr(n / 6, 4)} mol.\n2. n(Fe²⁺) = 6 × that = ${sfStr(n, 4)} mol.\n3. Mass of Fe = ${sfStr(n, 4)} × 55.8 = ${sfStr(n * AR.Fe, 3)} g; percentage = ${sfStr(n * AR.Fe, 3)} ÷ 0.600 × 100 = ${sfStr(pct, 3)}%.`,
    });
  }
  {
    const n = molesFromSolution(25.05, 0.0400) * 10;
    const MrSalt = 2.50 / n;
    const x = (MrSalt - Mr("CuSO4")) / 18.0;
    b.calc({
      d: 5, skill: "ANALYSIS", calculator: true,
      stem: "2.50 g of hydrated copper(II) sulfate, CuSO₄·xH₂O, was dissolved and made up to 500 cm³. 50.0 cm³ portions were added to excess potassium iodide, and the iodine released needed 25.05 cm³ of 0.0400 mol dm⁻³ sodium thiosulfate. Calculate x. (Mr of CuSO₄ = 159.6; Mr of H₂O = 18)",
      value: Math.round(x), unit: undefined,
      wrong: ["4", "10"],
      hints: ["Cu²⁺ : S₂O₃²⁻ = 1 : 1.", "Find the Mr of the hydrated salt first."],
      explanation: `1. n(S₂O₃²⁻) = 0.02505 × 0.0400 = ${sfStr(n / 10, 4)} mol = n(Cu²⁺) in 50.0 cm³.\n2. In 500 cm³: ${sfStr(n, 4)} mol.\n3. Mr = 2.50 ÷ ${sfStr(n, 4)} = ${sfStr(MrSalt, 4)}.\n4. 18.0x = ${sfStr(MrSalt, 4)} − 159.6 = ${sfStr(MrSalt - 159.6, 3)}, so x = ${sfStr(x, 3)} ≈ 5: CuSO₄·5H₂O.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In an iodine-thiosulfate titration, starch indicator should be added at the start, before any thiosulfate is run in.",
    answer: false,
    explanation: "False. Starch is added near the end point, when the iodine colour has faded to pale yellow; with a lot of iodine present, the blue-black complex forms too strongly and the end point is hard to see.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Potassium dichromate(VI) can be used to titrate iron(II) in a solution that contains chloride ions.",
    answer: true,
    explanation: "True. Dichromate(VI) (E⦵ = +1.33 V) does not oxidise chloride ions (+1.36 V) under titration conditions, unlike manganate(VII) (+1.52 V).",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each titration with the colour change seen at the end point.",
    pairs: [
      ["Fe²⁺ titrated with KMnO₄", "colourless (pale yellow) to permanent pale pink"],
      ["I₂ titrated with Na₂S₂O₃ (starch added near the end)", "blue-black to colourless"],
      ["Fe²⁺ titrated with K₂Cr₂O₇ (diphenylaminesulfonate indicator)", "green to violet-blue"],
      ["C₂O₄²⁻ (warm) titrated with KMnO₄", "colourless to permanent pale pink, after slow decolourisation at first"],
    ],
    hints: ["Manganate(VII) is self-indicating."],
    explanation: "MnO₄⁻ gives its own pink end point (slow at first with ethanedioate until Mn²⁺ forms); starch-iodine loses its blue-black colour; the redox indicator turns violet-blue in dichromate titrations.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the description of the ethanedioate titration.",
    template: "The ethanedioate solution is acidified and warmed to about {{blank:a}} °C. The reaction speeds up as {{blank:b}} ions form, an example of {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["60"], choices: ["60", "100", "25"] },
      { id: "b", accepted: ["Mn2+"], choices: ["Mn2+", "MnO4-", "CO2"] },
      { id: "c", accepted: ["autocatalysis"], choices: ["autocatalysis", "inhibition", "disproportionation"] },
    ],
    explanation: "Warming overcomes the high activation energy; the Mn²⁺ product catalyses the reaction (autocatalysis).",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the indicator used in iodine-sodium thiosulfate titrations.",
    accepted: ["starch", "starch solution", "starch indicator"],
    wrong: ["phenolphthalein", "methyl orange"],
    explanation: "Starch forms a blue-black complex with iodine; the end point is when this colour disappears.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how the percentage of copper in a sample of brass could be found by an iodine-thiosulfate titration.",
    points: ["Weigh the brass and dissolve it in (concentrated) nitric acid in a fume cupboard; neutralise excess acid (e.g. with sodium carbonate, then add ethanoic acid).", "Make the solution up to 250 cm³ in a volumetric flask; pipette 25.0 cm³ portions and add excess potassium iodide: 2Cu²⁺ + 4I⁻ → 2CuI + I₂.", "Titrate the iodine with standard sodium thiosulfate, adding starch near the end point (blue-black to colourless/white precipitate).", "Moles of Cu²⁺ = moles of S₂O₃²⁻; scale up ×10, multiply by 63.5 and divide by the mass of brass × 100."],
    modelAnswer: "Dissolve a weighed sample of brass in nitric acid in a fume cupboard (toxic NO₂), neutralise, and make up to 250 cm³. To 25.0 cm³ portions add excess KI; copper(II) oxidises iodide to iodine. Titrate with standard thiosulfate until pale yellow, add starch and continue until the blue-black colour just disappears. Since Cu²⁺ : S₂O₃²⁻ = 1 : 1, moles of copper in the sample = 10 × moles of thiosulfate; mass = moles × 63.5; percentage = mass ÷ mass of brass × 100.",
    hints: ["Dissolve, liberate iodine, titrate, calculate."],
    explanation: "Credit the dissolving and safety, the iodide step, the titration with starch, and the calculation.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 2,
    stem: "In a manganate(VII) titration, a student saw a brown precipitate form in the flask. Explain this observation and its effect on the result.",
    points: ["Too little sulfuric acid was added, so MnO₄⁻ was reduced only to MnO₂ (brown) instead of Mn²⁺.", "Each MnO₄⁻ then accepts 3 electrons instead of 5, so more titrant is needed and the calculated result (using 1 : 5) is wrong (titre too large)."],
    modelAnswer: "Without enough acid, manganate(VII) is reduced to brown manganese(IV) oxide (MnO₄⁻ + 4H⁺ + 3e⁻ → MnO₂ + 2H₂O), gaining only three electrons. The titre is therefore larger than it should be, and a calculation that assumes the 1 : 5 ratio gives an incorrect (too high) amount of reducing agent.",
    hints: ["Which manganese compound is brown?"],
    explanation: "Insufficient acid changes the reduction product and so the mole ratio.",
  });
  {
    const rd = [[0.00, 23.15], [0.50, 23.20], [1.05, 23.85], [0.25, 22.95]];
    const ts = rd.map(([a, c]) => titre(a, c));
    const { mean: m, used } = meanTitre(ts.slice(1));
    const nMn = molesFromSolution(m, 0.00500);
    const nFe10 = nMn * 5 * 10;
    const mgFe = nFe10 * AR.Fe * 1000;
    const perTab = mgFe / 5;
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: `Five iron tablets (containing iron(II) sulfate) were crushed, dissolved in dilute sulfuric acid and made up to 200 cm³. 20.0 cm³ portions were titrated with 0.00500 mol dm⁻³ KMnO₄.\n\n| Titration | rough | 1 | 2 | 3 |\n|---|---|---|---|---|\n| final reading / cm³ | ${rd.map(([, c]) => c.toFixed(2)).join(" | ")} |\n| initial reading / cm³ | ${rd.map(([a]) => a.toFixed(2)).join(" | ")} |\n\n(Ar Fe = 55.8)`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the mean of the concordant titres, in cm³.", value: m, dp: 2, unit: "cm³", wrong: [dpStr(ts.reduce((s, x) => s + x) / 4, 2)], explanation: `Titres: ${ts.map((x) => dpStr(x, 2)).join(", ")}; concordant: ${used.map((x) => dpStr(x, 2)).join(", ")}; mean = ${dpStr(m, 2)} cm³.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the amount, in mol, of Fe²⁺ in the 200 cm³ solution.", value: nFe10, sf: 3, unit: "mol", wrong: [sfStr(nFe10 / 10, 3)], explanation: `n(MnO₄⁻) = ${dpStr(m, 2)} ÷ 1000 × 0.00500 = ${sfStr(nMn, 3)} mol; n(Fe²⁺) in 20.0 cm³ = ${sfStr(nMn * 5, 3)} mol; in 200 cm³ = ${sfStr(nFe10, 3)} mol.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the mass of iron, in mg, in one tablet, to three significant figures.", value: perTab, sf: 3, unit: "mg", wrong: [sfStr(mgFe, 3)], explanation: `Mass of Fe in five tablets = ${sfStr(nFe10, 3)} × 55.8 = ${sfStr(mgFe / 1000, 3)} g = ${sfStr(mgFe, 3)} mg; per tablet = ${sfStr(perTab, 3)} mg.` }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain why the tablets are dissolved in dilute sulfuric acid, and why the result may be lower than the value on the label if the solution is left standing in air for a day.", points: ["Acid supplies the H⁺ needed for MnO₄⁻ → Mn²⁺ (and prevents formation of brown MnO₂); sulfuric acid is used because chloride would be oxidised.", "On standing, Fe²⁺ is oxidised by oxygen in the air to Fe³⁺.", "Fe³⁺ does not react with manganate(VII), so the titre and the calculated iron content are too low."], modelAnswer: "Sulfuric acid provides the H⁺ ions for the reduction of manganate(VII) to Mn²⁺ without introducing chloride, which would also be oxidised. If the solution stands, air oxidises some Fe²⁺ to Fe³⁺, which does not react with manganate(VII), so less titrant is used and the iron content appears lower." }),
      ],
      hints: ["MnO₄⁻ : Fe²⁺ = 1 : 5.", "Scale from 20.0 cm³ to 200 cm³, then divide by five tablets."],
      explanation: `Mean titre ${dpStr(m, 2)} cm³; Fe²⁺ in 200 cm³ ${sfStr(nFe10, 3)} mol; ${sfStr(perTab, 3)} mg of iron per tablet.`,
    });
  }
  {
    const t1 = 17.60, t2 = 26.40, c = 0.0150;
    const nFe2 = molesFromSolution(t1, c) * 5;
    const nTot = molesFromSolution(t2, c) * 5;
    const nFe3 = nTot - nFe2;
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: `A solution contains both Fe²⁺ and Fe³⁺ ions. 20.0 cm³ was titrated directly with 0.0150 mol dm⁻³ KMnO₄ and needed ${t1.toFixed(2)} cm³. A second 20.0 cm³ portion was warmed with excess zinc to reduce all the Fe³⁺ to Fe²⁺, filtered, and then needed ${t2.toFixed(2)} cm³ of the same KMnO₄.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the amount, in mol, of Fe²⁺ in 20.0 cm³ of the original solution.", value: nFe2, sf: 3, unit: "mol", wrong: [sfStr(nFe2 / 5, 3)], explanation: `${t1.toFixed(2)} ÷ 1000 × 0.0150 × 5 = ${sfStr(nFe2, 3)} mol.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the amount, in mol, of Fe³⁺ in 20.0 cm³ of the original solution.", value: nFe3, sf: 3, unit: "mol", wrong: [sfStr(nTot, 3)], explanation: `Total iron = ${t2.toFixed(2)} ÷ 1000 × 0.0150 × 5 = ${sfStr(nTot, 3)} mol; Fe³⁺ = ${sfStr(nTot, 3)} − ${sfStr(nFe2, 3)} = ${sfStr(nFe3, 3)} mol.` }),
        P.manual({ label: "(c)", marks: 2, stem: "Explain why the excess zinc must be filtered off before the second titration.", points: ["Zinc is a reducing agent and would itself react with (reduce) the manganate(VII).", "and would also keep reducing Fe³⁺ formed during the titration, so the titre would be too large."], modelAnswer: "Left in the flask, zinc would reduce manganate(VII) directly and turn any Fe³⁺ formed back into Fe²⁺, both increasing the volume of titrant needed." }),
      ],
      hints: ["The first titration measures Fe²⁺ only; the second measures all the iron."],
      explanation: `Fe²⁺ ${sfStr(nFe2, 3)} mol; total iron ${sfStr(nTot, 3)} mol; Fe³⁺ ${sfStr(nFe3, 3)} mol per 20.0 cm³.`,
    });
  }
  b.card("FACT", "MnO₄⁻ titrations", "Acidify with dilute H₂SO₄ (not HCl or HNO₃); self-indicating: end point is the first permanent pale pink.");
  b.card("FORMULA", "Manganate(VII) mole ratios", "MnO₄⁻ : Fe²⁺ = 1 : 5; MnO₄⁻ : C₂O₄²⁻ = 2 : 5; MnO₄⁻ : H₂O₂ = 2 : 5.");
  b.card("FORMULA", "Dichromate(VI) with iron(II)", "Cr₂O₇²⁻ + 14H⁺ + 6Fe²⁺ → 2Cr³⁺ + 6Fe³⁺ + 7H₂O (1 : 6).");
  b.card("FORMULA", "Copper(II) and iodide", "2Cu²⁺ + 4I⁻ → 2CuI + I₂; then I₂ + 2S₂O₃²⁻ → 2I⁻ + S₄O₆²⁻; Cu²⁺ : S₂O₃²⁻ = 1 : 1.");
  b.card("CONCEPT", "When to add starch", "Near the end point, when the iodine colour is pale yellow; end point = blue-black disappears.");
  b.card("CONCEPT", "Ethanedioate titration", "Warm to about 60 °C; slow at first, then autocatalysed by Mn²⁺.");
  b.card("CONCEPT", "Effect of ligands on E⦵", "Ligands change the relative stability of oxidation states: [Fe(CN)₆]³⁻/⁴⁻ is +0.36 V vs +0.77 V for aqueous Fe³⁺/Fe²⁺.", undefined, { applies: ZIM });
  b.card("CONCEPT", "Brown precipitate in a MnO₄⁻ titration", "Too little acid: MnO₂ forms instead of Mn²⁺, changing the mole ratio.");
  b.card("CONCEPT", "Titration calculation route", "Moles of titrant → mole ratio → moles in portion → × scaling factor → mass, percentage or Mr.");
});
