// W1a: stoich.solutions-titrations — concentration, dilution, concordant titres, acid-base titration calculations.
import { concept, P, t, chk, same, Mr, molesFromSolution, concFrom, titre, meanTitre, sfStr, dpStr } from "../lib.mjs";

concept("achem.stoich.solutions-titrations", { file: "stoich/solutions-titrations", keyPrefix: "stoich.solutions-titrations" }, (b) => {
  // ---- MCQs
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "How many moles of solute are in 25.0 cm³ of a 0.200 mol dm⁻³ solution?",
    options: [[`${dpStr(molesFromSolution(25.0, 0.2), 5)} mol`, "Correct: 0.200 × 25.0 ÷ 1000."], ["5.00 mol", "The volume was not converted from cm³ to dm³."], ["0.00800 mol", "This divides 0.200 by 25.0 instead of multiplying."], ["0.125 mol", "This divides 25.0 by 0.200 and then by 1000."]],
    answer: "A",
    explanation: "n = c × V/1000 = 0.200 × 25.0/1000 = 0.00500 mol.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "What is the mass concentration of a 0.250 mol dm⁻³ solution of sodium hydroxide? (Mr of NaOH = 40.0)",
    options: [[`${chk(0.25 * Mr("NaOH"), 10)}.0 g dm⁻³`, "Correct: 0.250 × 40.0."], ["160 g dm⁻³", "This divides 40.0 by 0.250."], ["0.00625 g dm⁻³", "This divides 0.250 by 40.0."], ["1.00 g dm⁻³", "This uses 4.0 instead of 40.0 for the molar mass."]],
    answer: "A",
    explanation: "g dm⁻³ = mol dm⁻³ × M = 0.250 × 40.0 = 10.0 g dm⁻³.",
  });
  {
    const c2 = (2.0 * 20.0) / 250;
    b.mcq({
      d: 2, skill: "APPLICATION",
      stem: "20.0 cm³ of 2.00 mol dm⁻³ hydrochloric acid is diluted with water to 250 cm³ in a volumetric flask. What is the new concentration?",
      options: [[`${sfStr(c2, 3)} mol dm⁻³`, "Correct: c₂ = 2.00 × 20.0 ÷ 250."], ["0.174 mol dm⁻³", "This divides by 230 cm³ (the water added) instead of the final 250 cm³."], ["25.0 mol dm⁻³", "Dilution lowers the concentration; this multiplies by 250/20."], ["0.0800 mol dm⁻³", "This divides 20.0 by 250 but forgets the original 2.00 mol dm⁻³."]],
      answer: "A",
      explanation: `c₁V₁ = c₂V₂: 2.00 × 20.0 = c₂ × 250, so c₂ = ${sfStr(c2, 3)} mol dm⁻³.`,
    });
    chk(c2, 0.16);
  }
  {
    const ts = [24.15, 23.8, 23.9];
    const mt = meanTitre(ts);
    same(mt.used, [23.8, 23.9]);
    b.mcq({
      d: 2, skill: "APPLICATION",
      stem: "A student records three accurate titres: 24.15 cm³, 23.80 cm³ and 23.90 cm³. What mean titre should be used in the calculation?",
      options: [[`${mt.mean.toFixed(2)} cm³`, "Correct: only 23.80 and 23.90 are concordant (within 0.10 cm³)."], [`${((24.15 + 23.8 + 23.9) / 3).toFixed(2)} cm³`, "24.15 cm³ is not concordant with the others and must be left out."], ["24.03 cm³", "This averages 24.15 and 23.90, which differ by 0.25 cm³."], ["23.80 cm³", "The mean of the concordant titres is used, not the smallest titre."]],
      answer: "A",
      explanation: `Concordant titres agree within 0.10 cm³: 23.80 and 23.90. Mean = ${mt.mean.toFixed(2)} cm³.`,
    });
  }
  {
    const nAcid = 0.00125, nOH = molesFromSolution(25.0, 0.1);
    b.mcq({
      d: 3, skill: "ANALYSIS",
      stem: "0.00125 mol of an acid H_nX is exactly neutralised by 25.00 cm³ of 0.100 mol dm⁻³ sodium hydroxide. What is the basicity, n, of the acid?",
      options: [[String(chk(nOH / nAcid, 2)), "Correct: 0.00250 mol NaOH ÷ 0.00125 mol acid = 2."], ["1", "This would need equal amounts of acid and NaOH."], ["3", "This would need 0.00375 mol of NaOH."], ["4", "This would need 0.00500 mol of NaOH."]],
      answer: "A",
      hints: ["Find moles of NaOH, then divide by moles of acid."],
      explanation: "n(NaOH) = 0.100 × 25.00/1000 = 0.00250 mol; ratio acid : NaOH = 1 : 2, so each acid molecule donates two H⁺: dibasic.",
    });
  }
  {
    const nBa = molesFromSolution(20.0, 0.12);
    const v = (2 * nBa) / 0.15 * 1000;
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: t`What volume of 0.150 mol dm⁻³ hydrochloric acid exactly neutralises 20.0 cm³ of 0.120 mol dm⁻³ barium hydroxide?

$\ce{Ba(OH)2(aq) + 2HCl(aq) -> BaCl2(aq) + 2H2O(l)}$`,
      options: [[`${sfStr(v, 3)} cm³`, "Correct: n(HCl) = 2 × 0.00240 = 0.00480 mol; V = 0.00480 ÷ 0.150 × 1000."], [`${sfStr(v / 2, 3)} cm³`, "The 1 : 2 ratio has been ignored."], ["25.0 cm³", "This swaps the two concentrations and ignores the 1 : 2 ratio."], ["64.0 cm³", "The ratio has been applied twice."]],
      answer: "A",
      hints: ["Barium hydroxide provides two OH⁻ per formula unit."],
      explanation: `n(Ba(OH)₂) = 0.120 × 20.0/1000 = ${sfStr(nBa, 3)} mol; n(HCl) = ${sfStr(2 * nBa, 3)} mol; V = ${sfStr(v, 3)} cm³.`,
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Statements about making a standard solution of sodium carbonate:\n\n1. The solid is weighed accurately and dissolved in distilled water in a beaker.\n2. The solution and all washings are transferred to a volumetric flask, which is made up to the mark.\n3. The flask is stoppered and inverted several times to mix the solution.\n\nWhich of the statements are correct?",
    options: [["1, 2 and 3", "Correct: all three are part of the standard method."], ["1 and 2 only", "Mixing by inverting (3) is needed so the concentration is uniform."], ["2 and 3 only", "Accurate weighing (1) is essential for a known concentration."], ["1 only", "Steps 2 and 3 are also needed."]],
    answer: "A",
    explanation: "Weigh accurately, dissolve, transfer with washings, make up to the mark (bottom of meniscus on the line), then invert to mix.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Statements about a back titration to find the calcium carbonate in limestone:\n\n1. A known excess of hydrochloric acid is added to the limestone.\n2. The acid left over is titrated with standard sodium hydroxide.\n3. The calcium carbonate is titrated directly, because it is insoluble.\n\nWhich of the statements are correct?",
    options: [["1 and 2 only", "Correct: insolubility is the reason a direct titration is NOT used."], ["1, 2 and 3", "Statement 3 is wrong: an insoluble solid reacts too slowly for a sharp end-point, so a back titration is used."], ["2 and 3 only", "Statement 1 is correct and statement 3 is wrong."], ["1 only", "Statement 2 is also correct: the excess acid is titrated."]],
    answer: "A",
    hints: ["Why use a back titration at all?"],
    explanation: "Insoluble CaCO₃ cannot be titrated directly. Excess acid is added; the unreacted acid is titrated; reacted acid = total − excess.",
  });

  // ---- calculations
  {
    const nOH = molesFromSolution(18.6, 0.15);
    const c = concFrom(nOH / 2, 25.0);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`25.0 cm³ of dilute sulfuric acid needs 18.60 cm³ of 0.150 mol dm⁻³ sodium hydroxide for neutralisation. Calculate the concentration of the sulfuric acid in mol dm⁻³, to three significant figures.

$\ce{H2SO4 + 2NaOH -> Na2SO4 + 2H2O}$`,
      value: c, unit: "mol/dm³", wrong: [concFrom(nOH, 25.0)],
      hints: ["n(H₂SO₄) is half n(NaOH)."],
      explanation: `1. n(NaOH) = 0.150 × 18.60/1000 = ${sfStr(nOH, 3)} mol.\n2. n(H₂SO₄) = ${sfStr(nOH, 3)} ÷ 2 = ${sfStr(nOH / 2, 3)} mol.\n3. c = ${sfStr(nOH / 2, 3)} ÷ 0.0250 = ${sfStr(c, 3)} mol dm⁻³. (Forgetting the ratio gives ${sfStr(concFrom(nOH, 25), 3)}.)`,
    });
  }
  {
    const nAliquot = molesFromSolution(12.5, 0.12);
    const M = 1.83 / (nAliquot * 10);
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: "1.83 g of a solid monobasic acid HA is dissolved in water and made up to 250 cm³. A 25.0 cm³ portion needs 12.50 cm³ of 0.120 mol dm⁻³ sodium hydroxide. Calculate the relative formula mass of HA.",
      value: M, wrong: [1.83 / nAliquot],
      hints: ["Moles in 25.0 cm³, then scale to 250 cm³.", "Mr = mass ÷ moles."],
      explanation: `1. n(NaOH) = 0.120 × 12.50/1000 = ${sfStr(nAliquot, 3)} mol = n(HA) in 25.0 cm³.\n2. n(HA) in 250 cm³ = × 10 = ${sfStr(nAliquot * 10, 3)} mol.\n3. Mr = 1.83 ÷ ${sfStr(nAliquot * 10, 3)} = ${sfStr(M, 3)}. (Forgetting the × 10 gives ${sfStr(1.83 / nAliquot, 4)}.)`,
    });
  }
  {
    const nHCl = molesFromSolution(16.0, 0.125);
    const M = 1.38 / ((nHCl / 2) * 10);
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`1.38 g of an anhydrous Group 1 carbonate, $\ce{M2CO3}$, is made up to 250 cm³. 25.0 cm³ of this solution needs 16.00 cm³ of 0.125 mol dm⁻³ hydrochloric acid (methyl orange indicator). Calculate the relative formula mass of $\ce{M2CO3}$.

$\ce{M2CO3 + 2HCl -> 2MCl + H2O + CO2}$`,
      value: M, wrong: [M / 2, M / 10],
      hints: ["Carbonate : HCl = 1 : 2.", "Scale from 25.0 cm³ to 250 cm³."],
      explanation: `1. n(HCl) = 0.125 × 16.00/1000 = ${sfStr(nHCl, 3)} mol.\n2. n(M₂CO₃) in 25.0 cm³ = ${sfStr(nHCl / 2, 3)} mol; in 250 cm³ = ${sfStr((nHCl / 2) * 10, 3)} mol.\n3. Mr = 1.38 ÷ ${sfStr((nHCl / 2) * 10, 3)} = ${sfStr(M, 3)}: M = (138 − 60)/2 = 39, so the carbonate is K₂CO₃.`,
    });
  }
  {
    const tot = molesFromSolution(45.0, 0.5), ex = molesFromSolution(20.0, 0.25);
    const m = ((tot - ex) / 2) * Mr("Mg(OH)2");
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A 0.600 g sample of an indigestion powder containing magnesium hydroxide is added to 45.0 cm³ of 0.500 mol dm⁻³ hydrochloric acid (an excess). The excess acid needs 20.00 cm³ of 0.250 mol dm⁻³ sodium hydroxide. Calculate the mass, in g, of magnesium hydroxide in the sample. (Mr of $\ce{Mg(OH)2}$ = 58.3)

$\ce{Mg(OH)2 + 2HCl -> MgCl2 + 2H2O}$`,
      value: m, unit: "g", wrong: [(tot - ex) * Mr("Mg(OH)2"), (ex / 2) * Mr("Mg(OH)2")],
      hints: ["Reacted HCl = total − excess.", "Mg(OH)₂ : HCl = 1 : 2."],
      explanation: `1. Total HCl = 0.500 × 45.0/1000 = ${sfStr(tot, 3)} mol.\n2. Excess HCl = n(NaOH) = 0.250 × 20.00/1000 = ${sfStr(ex, 3)} mol.\n3. HCl reacted = ${sfStr(tot - ex, 3)} mol; n(Mg(OH)₂) = ${sfStr((tot - ex) / 2, 3)} mol.\n4. Mass = ${sfStr((tot - ex) / 2, 3)} × 58.3 = ${sfStr(m, 3)} g. (Using the excess instead of the reacted acid gives ${sfStr((ex / 2) * 58.3, 3)} g.)`,
    });
  }
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A solution contains 4.90 g of sulfuric acid, H₂SO₄, in 500 cm³. Calculate its concentration in mol dm⁻³. (Mr of H₂SO₄ = 98.1)",
    value: concFrom(4.9 / Mr("H2SO4"), 500), unit: "mol/dm³", wrong: [4.9 / Mr("H2SO4")],
    explanation: `n = 4.90 ÷ 98.1 = ${sfStr(4.9 / 98.1, 3)} mol; c = n ÷ 0.500 dm³ = ${sfStr(concFrom(4.9 / 98.1, 500), 3)} mol dm⁻³.`,
  });
  // ---- true/false
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Diluting 50.0 cm³ of a solution to 200 cm³ divides the number of moles of solute by four.",
    answer: false,
    explanation: "False. Dilution adds solvent only: the number of moles stays the same and the concentration falls to a quarter.",
  });
  // ---- matching
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each titration problem with the key step in its calculation.",
    pairs: [
      ["Limestone with excess acid, then NaOH", "subtract the excess acid from the total acid"],
      ["Vinegar diluted tenfold before titration", "multiply the aliquot concentration by the dilution factor"],
      ["Finding the basicity of an acid", "divide moles of NaOH by moles of acid"],
      ["Finding x in Na₂CO₃.xH₂O", "subtract 106 from the Mr found and divide by 18"],
    ],
    hints: ["Each problem has one distinctive step."],
    explanation: "Back titration: total − excess. Dilution: × factor. Basicity: ratio of OH⁻ to acid. Water of crystallisation: (Mr − Mr anhydrous) ÷ 18.",
  });
  // ---- fill in the blank
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences about titration technique.",
    template: "Burette readings are recorded to the nearest {{blank:a}} cm³. The mean titre is calculated from titres that agree within {{blank:b}} cm³, called {{blank:c}} titres.",
    blanks: [
      { id: "a", accepted: ["0.05"], choices: ["0.05", "0.1", "0.5", "0.01"] },
      { id: "b", accepted: ["0.10"], choices: ["0.10", "0.05", "0.50", "1.00"] },
      { id: "c", accepted: ["concordant"], choices: ["concordant", "rough", "accurate", "average"] },
    ],
    explanation: "Burettes are read to ±0.05 cm³; concordant titres agree within 0.10 cm³.",
  });
  // ---- short
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the piece of apparatus used to make up a standard solution to an exact volume.",
    accepted: ["volumetric flask", "graduated flask", "standard flask", "a volumetric flask"],
    wrong: ["measuring cylinder", "beaker"],
    explanation: "A volumetric (graduated) flask has a single mark for an accurate volume such as 250.0 cm³.",
  });
  // ---- self-marked
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why a back titration, rather than a direct titration, is used to find the amount of calcium carbonate in powdered eggshell.",
    points: ["Calcium carbonate is insoluble in water / reacts slowly, so the end-point of a direct titration would not be sharp", "Excess acid lets the reaction go to completion; the leftover acid can then be titrated accurately"],
    modelAnswer: "Calcium carbonate is insoluble, so it reacts slowly and a direct titration would not give a clear end-point. Adding a known excess of acid lets all the carbonate react; the unreacted acid is then titrated with alkali, which gives a sharp end-point.",
    hints: ["Think about solubility and the end-point."],
    explanation: "Back titration for insoluble or slow-reacting samples.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "Describe how to make 250 cm³ of a standard solution from a weighed sample of a solid acid.",
    points: ["Dissolve the weighed solid in a small volume of distilled water in a beaker", "Transfer to a 250 cm³ volumetric flask with the washings of the beaker (and funnel / rod)", "Make up to the mark with distilled water (bottom of meniscus on the line) and invert to mix"],
    modelAnswer: "Dissolve the weighed acid in a little distilled water in a beaker. Pour the solution into a 250 cm³ volumetric flask, rinsing the beaker and funnel into the flask. Add distilled water until the bottom of the meniscus is on the mark, then stopper and invert several times to mix.",
    explanation: "Dissolve, transfer with washings, make up to the mark, mix.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "Thandeka's three accurate titres are 22.10, 22.55 and 22.70 cm³. Explain why she cannot yet calculate a reliable mean titre and what she should do.",
    points: ["No two titres agree within 0.10 cm³ (22.55 and 22.70 differ by 0.15)", "So the titres are not concordant and the mean would be unreliable", "Repeat the titration until at least two titres agree within 0.10 cm³, then average those"],
    modelAnswer: "None of her titres are concordant: the closest pair, 22.55 and 22.70 cm³, differ by 0.15 cm³, more than 0.10 cm³. Averaging them would give an unreliable value. She should carry out further titrations until at least two titres agree within 0.10 cm³ and average only those.",
    hints: ["Compare each pair of titres."],
    explanation: "Mean only concordant titres.",
  });
  // ---- practice structured
  {
    const readings = [[0.0, 20.45], [20.45, 40.4], [0.3, 20.3], [20.3, 40.35]];
    const ts = readings.map(([a, c]) => titre(a, c));
    const mt = meanTitre(ts.slice(1));
    same(mt.used.map((x) => x.toFixed(2)), ["19.95", "20.00", "20.05"]);
    const nOH = molesFromSolution(mt.mean, 0.075);
    const nAcid = 0.96 / 192.0 / 10;
    const basicity = nOH / nAcid;
    chk(basicity, 3, 1e-9);
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: `Nyasha dissolves 0.960 g of citric acid (Mr 192.0) in water and makes the solution up to 250 cm³. She titrates 25.0 cm³ portions with 0.0750 mol dm⁻³ sodium hydroxide, using phenolphthalein.

| Titration | rough | 1 | 2 | 3 |
|---|---|---|---|---|
| Final reading / cm³ | ${readings.map((r) => r[1].toFixed(2)).join(" | ")} |
| Initial reading / cm³ | ${readings.map((r) => r[0].toFixed(2)).join(" | ")} |`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the mean of the concordant titres, in cm³.", value: mt.mean, dp: 2, unit: "cm³", wrong: [ts.reduce((s, x) => s + x, 0) / 4], explanation: `Titres 1-3: ${ts.slice(1).map((x) => x.toFixed(2)).join(", ")} cm³ (range 0.10); mean = ${mt.mean.toFixed(2)} cm³.` }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate the amount, in mol, of sodium hydroxide used in the mean titre.", value: nOH, unit: "mol", wrong: [mt.mean * 0.075], explanation: `0.0750 × ${mt.mean.toFixed(2)}/1000 = ${sfStr(nOH, 3)} mol.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the amount, in mol, of citric acid in each 25.0 cm³ portion.", value: nAcid, unit: "mol", wrong: [nAcid * 10], explanation: `0.960 ÷ 192.0 = 0.00500 mol in 250 cm³; ÷ 10 = ${sfStr(nAcid, 3)} mol.` }),
        P.num({ label: "(d)", marks: 2, stem: "Deduce the number of moles of NaOH that react with one mole of citric acid (the basicity of citric acid).", value: 3, wrong: [1, 2], explanation: `${sfStr(nOH, 3)} ÷ ${sfStr(nAcid, 3)} = 3: citric acid is tribasic.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain why the rough titre is not used, and why the mean is taken of titres 1-3.", points: ["The rough titre is a trial run, overshooting the end-point (adding alkali quickly)", "Titres 1-3 are concordant (within 0.10 cm³), so their mean is reliable"], modelAnswer: "The rough titration is done quickly to find the approximate end-point, so it usually overshoots. Titres 1, 2 and 3 agree within 0.10 cm³, so they are concordant and their mean is a reliable value." }),
      ],
      hints: ["Titre = final − initial.", "Moles of acid in 25.0 cm³ come from the mass and the dilution."],
      explanation: `Mean ${mt.mean.toFixed(2)} cm³; n(NaOH) ${sfStr(nOH, 3)}; n(acid) ${sfStr(nAcid, 3)}; basicity 3.`,
    });
  }
  {
    const nHCl = molesFromSolution(22.4, 0.05);
    const cDil = concFrom(nHCl, 20.0);
    const cOrig = cDil * (500 / 25.0);
    const gdm3 = cOrig * Mr("NH3");
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`Tatenda dilutes 25.0 cm³ of household ammonia solution to 500 cm³ in a volumetric flask. A 20.0 cm³ portion of the diluted solution needs 22.40 cm³ of 0.0500 mol dm⁻³ hydrochloric acid.

$\ce{NH3(aq) + HCl(aq) -> NH4Cl(aq)}$`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the amount, in mol, of HCl used.", value: nHCl, unit: "mol", wrong: [22.4 * 0.05], explanation: `0.0500 × 22.40/1000 = ${sfStr(nHCl, 3)} mol.` }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate the concentration, in mol dm⁻³, of ammonia in the diluted solution.", value: cDil, unit: "mol/dm³", wrong: [concFrom(nHCl, 25.0)], explanation: `${sfStr(nHCl, 3)} ÷ 0.0200 = ${sfStr(cDil, 3)} mol dm⁻³.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the concentration, in mol dm⁻³, of ammonia in the original household solution.", value: cOrig, unit: "mol/dm³", wrong: [cDil], explanation: `Dilution factor 500 ÷ 25.0 = 20: ${sfStr(cDil, 3)} × 20 = ${sfStr(cOrig, 3)} mol dm⁻³.` }),
        P.num({ label: "(d)", marks: 1, stem: "Convert your answer to (c) into g dm⁻³. (Mr of NH₃ = 17.0)", value: gdm3, unit: "g/dm³", wrong: [cOrig / 17], explanation: `${sfStr(cOrig, 3)} × 17.0 = ${sfStr(gdm3, 3)} g dm⁻³.` }),
        P.manual({ label: "(e)", marks: 1, stem: "Suggest why the household ammonia is diluted before titration.", points: ["It is too concentrated: an undiluted 20.0 cm³ portion would need far more acid than one burette holds (or a much more concentrated acid)"], modelAnswer: "The household solution is so concentrated that a portion would need about twenty times more acid than the 50 cm³ burette holds; diluting it gives a titre of a convenient size." }),
      ],
      hints: ["Scale up by the dilution factor at the end."],
      explanation: `Diluted ${sfStr(cDil, 3)} mol dm⁻³; original ${sfStr(cOrig, 3)} mol dm⁻³ = ${sfStr(gdm3, 3)} g dm⁻³.`,
    });
  }

  // ---- flashcards
  b.card("FORMULA", "Moles from a solution?", "n = c × V/1000 (c in mol dm⁻³, V in cm³).");
  b.card("FORMULA", "Converting mol dm⁻³ to g dm⁻³?", "Multiply by the molar mass M (g mol⁻¹).");
  b.card("FORMULA", "Dilution equation?", "c₁V₁ = c₂V₂ (moles of solute unchanged).");
  b.card("DEFINITION", "Define **concordant titres**.", "Accurate titres that agree within 0.10 cm³; only these are averaged.");
  b.card("DEFINITION", "Define **standard solution**.", "A solution of accurately known concentration, made from a weighed pure solid in a volumetric flask.");
  b.card("CONCEPT", "Steps in a back titration calculation?", "Total moles of reagent added − moles left over (from the titration) = moles that reacted with the sample; then use the equation ratio.");
  b.card("CONCEPT", "When is a back titration used?", "When the sample is insoluble, reacts slowly, is volatile or gives an unclear end-point (e.g. CaCO₃ in limestone or antacids).");
  b.card("DEFINITION", "What is the **basicity** of an acid?", "The number of H⁺ ions one molecule can donate (moles of NaOH reacting with one mole of acid): HCl 1, H₂SO₄ 2, citric acid 3.");
});
