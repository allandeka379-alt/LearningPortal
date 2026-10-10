// W4a: achem.carboxylic.acids-reactions (both boards; ZIMSEC Form 6, Cambridge AS Level)
import { concept, P, t, Mr, moles, molesFromSolution, titre, meanTitre, VM_RTP, sfStr, dpStr, sciStr } from "../lib.mjs";

concept("achem.carboxylic.acids-reactions", { file: "carboxylic/acids-reactions", keyPrefix: "carboxylic.acids-reactions" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which carboxylic acid is the main acid in vinegar?",
    options: [
      ["ethanoic acid", "Correct: vinegar is a dilute solution of ethanoic acid."],
      ["methanoic acid", "Methanoic acid occurs in ant stings and nettles."],
      ["citric acid", "Citric acid gives citrus fruits their sharp taste."],
      ["benzoic acid", "Benzoic acid and its salts are used as preservatives, not as vinegar."],
    ],
    answer: "A",
    explanation: "Vinegar contains about 4-8% ethanoic acid, CH₃COOH.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which reagent and conditions convert ethanol into ethanoic acid?",
    options: [
      ["acidified K₂Cr₂O₇, heat under reflux", "Correct: reflux with excess oxidant oxidises ethanol fully."],
      ["acidified K₂Cr₂O₇, warm and distil immediately", "Distillation removes ethanal before it is oxidised to the acid."],
      ["NaBH₄ in water, warm", "NaBH₄ is a reducing agent."],
      ["concentrated H₂SO₄, heat to about 170 °C", "These conditions dehydrate ethanol to ethene."],
    ],
    answer: "A",
    explanation: "CH₃CH₂OH + 2[O] → CH₃COOH + H₂O.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which organic product forms when propanenitrile, CH₃CH₂CN, is heated under reflux with dilute hydrochloric acid?",
    options: [
      ["propanoic acid", "Correct: the CN carbon becomes the COOH carbon."],
      ["ethanoic acid", "The nitrile carbon is kept, so the acid has three carbons."],
      ["butanoic acid", "No carbon is added during hydrolysis."],
      ["propylamine", "Amines come from reduction of nitriles, not hydrolysis."],
    ],
    answer: "A",
    explanation: "CH₃CH₂CN + 2H₂O + HCl → CH₃CH₂COOH + NH₄Cl.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "What is the name of (CH₃)₂CHCH₂COOH?",
    options: [
      ["3-methylbutanoic acid", "Correct: four-carbon chain from COOH, methyl on C3."],
      ["2-methylbutanoic acid", "Number from the COOH carbon: the branch is on carbon 3."],
      ["3-methylpropanoic acid", "The longest chain including COOH has four carbons."],
      ["pentanoic acid", "The chain is branched, so the parent chain is butanoic acid."],
    ],
    answer: "A",
    explanation: "C1 = COOH, C2 = CH₂, C3 = CH(CH₃), C4 = CH₃.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which of the reagents react with ethanoic acid to give a gas?\n\n1. magnesium ribbon\n2. sodium hydrogencarbonate solution\n3. sodium hydroxide solution",
    options: [
      ["1 and 2 only", "Correct: hydrogen and carbon dioxide; neutralisation by NaOH gives no gas."],
      ["1, 2 and 3", "NaOH neutralises the acid, giving sodium ethanoate and water only."],
      ["2 and 3 only", "Magnesium gives hydrogen; NaOH gives no gas."],
      ["2 only", "Magnesium also reacts, giving hydrogen."],
    ],
    answer: "A",
    hints: ["Which reactions give H₂ or CO₂?"],
    explanation: "Mg → H₂; NaHCO₃ → CO₂; NaOH → salt + water.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which of the statements about making butanoic acid from ethyl butanoate, CH₃CH₂CH₂COOC₂H₅, are correct?\n\n1. Heating under reflux with NaOH(aq) gives sodium butanoate.\n2. The butanoic acid is released by adding dilute HCl.\n3. Heating with dilute acid gives a reversible reaction.",
    options: [
      ["1, 2 and 3", "Correct: alkaline hydrolysis then acidification, or reversible acid hydrolysis."],
      ["1 and 2 only", "Statement 3 is also true: acid hydrolysis is an equilibrium."],
      ["2 and 3 only", "Statement 1 is also true."],
      ["1 only", "Statements 2 and 3 are also true."],
    ],
    answer: "A",
    hints: ["Compare acid and alkaline hydrolysis."],
    explanation: "CH₃CH₂CH₂COOC₂H₅ + NaOH → CH₃CH₂CH₂COONa + C₂H₅OH; then H⁺ releases the acid.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which reagent reduces propanoic acid to propan-1-ol?",
    options: [
      ["LiAlH₄ in dry ether", "Correct: a powerful hydride source reduces –COOH to –CH₂OH."],
      ["NaBH₄ in water", "NaBH₄ is too weak to reduce carboxylic acids."],
      ["H₂ with a nickel catalyst at 150 °C", "This reduces C=C, not the carboxyl group."],
      ["tin and concentrated HCl", "Sn/HCl reduces nitro groups to amines."],
    ],
    answer: "A",
    hints: ["Which reducing agent is the stronger?"],
    explanation: "CH₃CH₂COOH + 4[H] → CH₃CH₂CH₂OH + H₂O.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which sequence converts bromoethane into propanoic acid, adding one carbon atom?",
    options: [
      ["KCN in ethanol, heat; then dilute HCl, heat under reflux", "Correct: bromoethane → propanenitrile → propanoic acid."],
      ["NaOH(aq), heat; then acidified K₂Cr₂O₇, reflux", "This gives ethanoic acid: no carbon is added."],
      ["KCN in ethanol, heat; then LiAlH₄ in dry ether", "Reducing the nitrile gives propylamine."],
      ["NaOH in ethanol, heat; then steam with H₃PO₄", "This makes ethanol via ethene, with no new carbon."],
    ],
    answer: "A",
    hints: ["Which reagent adds a carbon to a halogenoalkane?"],
    explanation: "CH₃CH₂Br + CN⁻ → CH₃CH₂CN; hydrolysis gives CH₃CH₂COOH.",
  });
  {
    const rows = [[0.2, 17.4], [17.4, 34.35], [1.05, 18.05], [18.05, 35.1]];
    const ts = rows.map(([a, c]) => titre(a, c));
    const m = meanTitre(ts.slice(1));
    const n = molesFromSolution(m.mean, 0.08);
    const cDil = n / 0.02;
    const cOrig = cDil * 12.5;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: `Farai dilutes 20.0 cm³ of a vinegar to 250 cm³ with distilled water and titrates 20.0 cm³ portions of the diluted solution with 0.0800 mol dm⁻³ sodium hydroxide.\n\n| | rough | 1 | 2 | 3 |\n|---|---|---|---|---|\n| final reading / cm³ | ${rows.map((r) => r[1].toFixed(2)).join(" | ")} |\n| initial reading / cm³ | ${rows.map((r) => r[0].toFixed(2)).join(" | ")} |\n\nCalculate the concentration of ethanoic acid in the original vinegar, in mol dm⁻³, to three significant figures.`,
      value: cOrig, sf: 3, unit: "mol/dm³",
      wrong: [cDil],
      hints: ["Use the concordant titres only.", "The vinegar was diluted from 20.0 cm³ to 250 cm³."],
      explanation: `1. Titres: ${ts.map((x) => x.toFixed(2)).join(", ")} cm³; concordant: ${m.used.map((x) => x.toFixed(2)).join(", ")}; mean = ${dpStr(m.mean, 2)} cm³.\n2. n(NaOH) = ${dpStr(m.mean, 2)} × 10⁻³ × 0.0800 = ${sciStr(n, 4)} mol = n(CH₃COOH) in 20.0 cm³.\n3. Diluted concentration = ${sciStr(n, 4)} ÷ 0.0200 = ${sfStr(cDil, 3)} mol dm⁻³.\n4. Dilution factor 250 ÷ 20.0 = 12.5; original = 12.5 × ${sfStr(cDil, 3)} = ${sfStr(cOrig, 3)} mol dm⁻³. Forgetting the dilution gives ${sfStr(cDil, 3)}.`,
    });
  }
  {
    const n = moles(3.36, Mr("NaHCO3"));
    const v = n * VM_RTP * 1000;
    b.num({
      d: 2, skill: "APPLICATION", calculator: true, daily: true,
      stem: "Excess ethanoic acid is added to 3.36 g of sodium hydrogencarbonate, NaHCO₃. What volume of carbon dioxide, in cm³ at room conditions, is produced? Ar: H 1, C 12, O 16, Na 23; one mole of gas occupies 24.0 dm³.",
      value: v, sf: 3, unit: "cm³",
      wrong: [v / 2],
      explanation: `CH₃COOH + NaHCO₃ → CH₃COONa + CO₂ + H₂O (1 : 1). Mr(NaHCO₃) = 84; n = 3.36 ÷ 84 = ${sfStr(n, 3)} mol; V = ${sfStr(n, 3)} × 24 000 = ${sfStr(v, 3)} cm³.`,
    });
  }
  {
    const mAcid = 0.444;
    const nOH = molesFromSolution(24.0, 0.25);
    const mr = mAcid / nOH;
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: "0.444 g of a monocarboxylic acid, CₙH₂ₙ₊₁COOH, is dissolved in water and needs 24.00 cm³ of 0.250 mol dm⁻³ NaOH for neutralisation. Calculate the relative molecular mass of the acid to three significant figures. (Then decide which acid it is.)",
      value: mr, sf: 3,
      wrong: [mAcid / (nOH * 2)],
      hints: ["Monocarboxylic: n(acid) = n(NaOH)."],
      explanation: `1. n(NaOH) = 0.02400 × 0.250 = ${sciStr(nOH, 3)} mol = n(acid).\n2. Mr = 0.444 ÷ ${sciStr(nOH, 3)} = ${sfStr(mr, 3)}.\n3. CₙH₂ₙ₊₁COOH: 14n + 46 = 74, so n = 2: propanoic acid, CH₃CH₂COOH.`,
    });
  }
  {
    const n = moles(0.972, 24.3);
    const m = n * Mr("(CH3COO)2Mg", { Mg: 24.3 });
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "0.972 g of magnesium reacts completely with excess ethanoic acid. Calculate the mass of magnesium ethanoate, (CH₃COO)₂Mg, formed, in g, to three significant figures. Ar: H 1, C 12, O 16, Mg 24.3.",
      value: m, sf: 3, unit: "g",
      wrong: [n * Mr("CH3COOMg", { Mg: 24.3 })],
      hints: ["2CH₃COOH + Mg → (CH₃COO)₂Mg + H₂."],
      explanation: `1. n(Mg) = 0.972 ÷ 24.3 = ${sfStr(n, 3)} mol = n(salt).\n2. Mr((CH₃COO)₂Mg) = 2(59) + 24.3 = ${Mr("(CH3COO)2Mg").toFixed(1)}.\n3. Mass = ${sfStr(n, 3)} × ${Mr("(CH3COO)2Mg").toFixed(1)} = ${sfStr(m, 3)} g.\n4. Using one ethanoate group (CH₃COOMg) gives ${sfStr(n * Mr("CH3COOMg"), 3)} g, which ignores the 2+ charge of magnesium.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Ethanoic acid can be distinguished from phenol by adding sodium carbonate solution: only ethanoic acid gives effervescence.",
    answer: true,
    explanation: "True: carboxylic acids release CO₂ from carbonates; phenol is too weak an acid.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Hydrolysing an ester by heating with sodium hydroxide solution gives the free carboxylic acid directly.",
    answer: false,
    explanation: "False: it gives the carboxylate salt; dilute acid must be added to release the free acid.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each acid with where it occurs or how it is used.",
    pairs: [
      ["methanoic acid", "ant stings and nettles"],
      ["ethanoic acid", "vinegar"],
      ["citric acid", "oranges and lemons"],
      ["ethanedioic acid", "rhubarb leaves"],
      ["butanoic acid", "smell of rancid butter"],
    ],
    explanation: "Common natural sources of carboxylic acids.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Complete the equation for ethanoic acid with sodium carbonate.",
    template: "Na₂CO₃ + {{blank:a}} CH₃COOH → 2CH₃COONa + H₂O + {{blank:b}}",
    blanks: [
      { id: "a", accepted: ["2"], choices: ["1", "2", "3"] },
      { id: "b", accepted: ["CO₂"], choices: ["CO₂", "H₂", "CO"] },
    ],
    hints: ["Balance sodium first."],
    explanation: "2CH₃COOH + Na₂CO₃ → 2CH₃COONa + CO₂ + H₂O.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the gas produced when ethanoic acid reacts with magnesium.",
    accepted: ["hydrogen", "H2", "H₂", "hydrogen gas"],
    wrong: ["carbon dioxide"],
    explanation: "2CH₃COOH + Mg → (CH₃COO)₂Mg + H₂.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Describe how ethanoic acid can be made from ethanenitrile in the laboratory using sodium hydroxide, including the equations.",
    points: ["Heat ethanenitrile under reflux with NaOH(aq)", "CH₃CN + NaOH + H₂O → CH₃COONa + NH₃ (ammonia given off)", "Acidify with dilute HCl (or H₂SO₄): CH₃COO⁻ + H⁺ → CH₃COOH"],
    modelAnswer: "Heat ethanenitrile under reflux with aqueous sodium hydroxide: CH₃CN + NaOH + H₂O → CH₃COONa + NH₃. Then add dilute hydrochloric acid to convert the sodium ethanoate into ethanoic acid: CH₃COO⁻ + H⁺ → CH₃COOH.",
    hints: ["Hydrolysis, then acidification."],
    explanation: "Alkaline hydrolysis gives the salt; acid releases the free acid.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "Suggest a two-step route from 1-bromopropane to butanoic acid. Give reagents and conditions for each step and name the intermediate.",
    points: ["Step 1: KCN in ethanol, heat under reflux", "Intermediate: butanenitrile, CH₃CH₂CH₂CN", "Step 2: heat under reflux with dilute HCl (or NaOH(aq) then acidify)"],
    modelAnswer: "Heat 1-bromopropane under reflux with potassium cyanide in ethanol to form butanenitrile, CH₃CH₂CH₂CN. Then heat the nitrile under reflux with dilute hydrochloric acid to hydrolyse it to butanoic acid (and NH₄Cl).",
    hints: ["The product has one more carbon than the starting material."],
    explanation: "Nitrile route adds one carbon.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why ethanoic acid (Mr 60) has a higher boiling point than propan-1-ol (Mr 60).",
    points: ["Ethanoic acid molecules form two hydrogen bonds per pair (dimers) using both C=O and O–H", "so the intermolecular forces are stronger/more extensive than in propan-1-ol, needing more energy to separate"],
    modelAnswer: "Ethanoic acid molecules pair up through two hydrogen bonds, each between the O–H of one molecule and the C=O of the other, so the forces between molecules are stronger than in propan-1-ol and more energy is needed to boil it.",
    hints: ["Which atoms in the COOH group can take part in hydrogen bonding?"],
    explanation: "Dimerisation through hydrogen bonding.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
    stem: "Thandeka investigates a sample of lemon juice, which contains citric acid, and a vinegar.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Describe a simple test that shows both liquids contain an acid stronger than carbonic acid, with the expected observation.", points: ["Add sodium carbonate (or hydrogencarbonate) solution/solid", "Effervescence; gas turns limewater milky (CO₂)"], modelAnswer: "Add sodium hydrogencarbonate: both fizz, and the gas turns limewater milky, showing carbon dioxide." }),
      P.manual({ label: "(b)", marks: 1, stem: "Write an equation for the reaction of ethanoic acid with sodium hydrogencarbonate.", points: ["CH₃COOH + NaHCO₃ → CH₃COONa + CO₂ + H₂O"], modelAnswer: "CH₃COOH + NaHCO₃ → CH₃COONa + CO₂ + H₂O" }),
      P.num({ label: "(c)", marks: 2, stem: "10.0 cm³ of the vinegar is neutralised by 13.80 cm³ of 0.500 mol dm⁻³ NaOH. Calculate the concentration of ethanoic acid in mol dm⁻³.", value: molesFromSolution(13.8, 0.5) / 0.01, sf: 3, unit: "mol/dm³", wrong: [molesFromSolution(13.8, 0.5) / 10], explanation: `n(NaOH) = 0.01380 × 0.500 = ${sciStr(molesFromSolution(13.8, 0.5), 3)} mol; c = ${sciStr(molesFromSolution(13.8, 0.5), 3)} ÷ 0.0100 = ${sfStr(molesFromSolution(13.8, 0.5) / 0.01, 3)} mol dm⁻³.` }),
      P.mcq({ label: "(d)", marks: 1, stem: "Which indicator is most suitable for this titration?", options: [
        ["phenolphthalein", "Correct: weak acid–strong base; end point above pH 7."],
        ["methyl orange", "It changes colour at pH 3-4, before the equivalence point."],
        ["universal indicator", "It changes colour gradually, so the end point is unclear."],
        ["bromine water", "Bromine water is not an acid-base indicator."],
      ], answer: "A", explanation: "Equivalence pH is about 8-9." }),
      P.manual({ label: "(e)", marks: 2, stem: "Ethanoic acid can be made industrially or in the laboratory from ethanol. Give the laboratory reagents and conditions and write the equation.", points: ["Acidified potassium dichromate(VI), heat under reflux (excess oxidant)", "CH₃CH₂OH + 2[O] → CH₃COOH + H₂O"], modelAnswer: "Heat ethanol under reflux with excess potassium dichromate(VI) and dilute sulfuric acid: CH₃CH₂OH + 2[O] → CH₃COOH + H₂O." }),
    ],
    hints: ["n = c × V (in dm³)."],
    explanation: `Carbonate test; [CH₃COOH] = ${sfStr(molesFromSolution(13.8, 0.5) / 0.01, 3)} mol dm⁻³; phenolphthalein; reflux with acidified dichromate(VI).`,
  });

  {
    const nCO2 = 0.12 / 24;
    const mR = nCO2 * 74;
    b.struct({
      d: 3, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: "Liquid R has the molecular formula C₃H₆O₂ (Mr 74). It turns blue litmus red and fizzes with sodium hydrogencarbonate solution. One mole of gas occupies 24.0 dm³ at room conditions.",
      parts: [
        P.short({ label: "(a)", marks: 1, stem: "Name R.", accepted: ["propanoic acid", "propionic acid"], wrong: ["methyl ethanoate"], explanation: "A carboxylic acid with three carbons." }),
        P.manual({ label: "(b)", marks: 1, stem: "Write an equation for the reaction of R with sodium hydrogencarbonate.", points: ["CH₃CH₂COOH + NaHCO₃ → CH₃CH₂COONa + CO₂ + H₂O"], modelAnswer: "CH₃CH₂COOH + NaHCO₃ → CH₃CH₂COONa + CO₂ + H₂O" }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the mass of R, in g, that gives 0.120 dm³ of carbon dioxide with excess sodium hydrogencarbonate.", value: mR, sf: 3, unit: "g", wrong: [mR * 2], explanation: `n(CO₂) = 0.120 ÷ 24.0 = ${sciStr(nCO2, 3)} mol = n(R) (1 : 1); mass = ${sciStr(nCO2, 3)} × 74 = ${sfStr(mR, 3)} g.` }),
        P.short({ label: "(d)", marks: 1, stem: "Give the reagent that reduces R to propan-1-ol.", accepted: ["LiAlH4", "lithium aluminium hydride", "lithium tetrahydridoaluminate", "LiAlH₄", "lithium tetrahydridoaluminate(III)"], wrong: ["NaBH4"], explanation: "LiAlH₄ in dry ether." }),
        P.manual({ label: "(e)", marks: 1, stem: "Name an ester that is an isomer of R.", points: ["Methyl ethanoate (CH₃COOCH₃) or ethyl methanoate (HCOOC₂H₅)"], modelAnswer: "Methyl ethanoate." }),
      ],
      hints: ["One mole of acid gives one mole of CO₂ with NaHCO₃."],
      explanation: `R propanoic acid; ${sfStr(mR, 3)} g; LiAlH₄; isomeric esters methyl ethanoate and ethyl methanoate.`,
    });
  }
  b.card("DEFINITION", "Carboxylic acid", "Contains the –COOH group; named -oic acid, counting the COOH carbon.");
  b.card("FACT", "Making a carboxylic acid from a primary alcohol", "Excess acidified K₂Cr₂O₇, heat under reflux.");
  b.card("FACT", "Hydrolysis of nitriles", "Reflux with dilute HCl → RCOOH + NH₄Cl; or NaOH(aq) → RCOONa + NH₃, then acidify.");
  b.card("FORMULA", "Ethanoic acid with sodium carbonate", "2CH₃COOH + Na₂CO₃ → 2CH₃COONa + CO₂ + H₂O");
  b.card("FACT", "Test for a carboxylic acid", "Add Na₂CO₃ or NaHCO₃: effervescence of CO₂ (limewater milky). Phenols and alcohols do not react.");
  b.card("FACT", "Reducing a carboxylic acid", "LiAlH₄ in dry ether → primary alcohol (NaBH₄ is too weak).");
  b.card("FACT", "Esterification conditions", "Carboxylic acid + alcohol, a few drops of concentrated H₂SO₄, heat under reflux; reversible.");
  b.card("FACT", "Natural sources", "Methanoic: ant stings. Ethanoic: vinegar. Citric: citrus fruit. Ethanedioic: rhubarb leaves.");
  b.card("CONCEPT", "Why carboxylic acids boil high", "Molecules form hydrogen-bonded dimers using both the C=O and O–H groups.");
});
