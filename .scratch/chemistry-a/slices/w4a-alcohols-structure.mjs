// W4a: achem.hydroxy.alcohols-structure (both boards; ZIMSEC Form 6, Cambridge AS Level)
import { concept, P, t, Mr, moles, VM_RTP, percentYield, sfStr, chk } from "../lib.mjs";

concept("achem.hydroxy.alcohols-structure", { file: "hydroxy/alcohols-structure", keyPrefix: "hydroxy.alcohols-structure" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which alcohol is a tertiary alcohol?",
    options: [
      [t`$\ce{(CH3)3COH}$`, "Correct: the C–OH carbon is bonded to three other carbon atoms."],
      [t`$\ce{(CH3)2CHCH2OH}$`, "The C–OH carbon is bonded to only one carbon, so this is primary despite the branching."],
      [t`$\ce{CH3CH(OH)CH2CH3}$`, "The C–OH carbon is bonded to two carbons: a secondary alcohol."],
      [t`$\ce{CH3CH2CH2CH2OH}$`, "Butan-1-ol is a primary alcohol."],
    ],
    answer: "A",
    explanation: "Count the carbon atoms bonded to the carbon that carries –OH: three makes it tertiary (2-methylpropan-2-ol).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Propan-1-ol (Mr 60) boils at about 97 °C but its isomer methoxyethane, CH₃OCH₂CH₃ (Mr 60), boils at about 7 °C. What is the main reason for the difference?",
    options: [
      ["Propan-1-ol molecules form hydrogen bonds with each other; methoxyethane molecules cannot.", "Correct: methoxyethane has no H bonded to O, so no hydrogen bonds form between its molecules."],
      ["Propan-1-ol has more electrons per molecule, so its dispersion forces are much stronger.", "Both have the same formula, C₃H₈O, and the same number of electrons."],
      ["The covalent O–H bonds in propan-1-ol must be broken when it boils.", "Boiling separates molecules; no covalent bonds break."],
      ["Methoxyethane is non-polar, so it has no permanent dipole at all.", "The C–O–C group is polar; methoxyethane has a permanent dipole but still no hydrogen bonding."],
    ],
    answer: "A",
    explanation: "Isomers with equal Mr: the difference comes from hydrogen bonding through the O–H group of propan-1-ol.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which set of conditions is used to make ethanol by fermentation?",
    options: [
      ["yeast, about 35 °C, no air", "Correct: yeast enzymes work best at about 30-40 °C; air must be excluded."],
      ["yeast, about 80 °C, air bubbled through", "At 80 °C the enzymes are denatured, and air would oxidise ethanol to ethanoic acid."],
      ["phosphoric acid, about 300 °C, 60-70 atm", "These are the conditions for hydration of ethene."],
      ["nickel catalyst, about 150 °C, hydrogen gas", "These are hydrogenation conditions for alkenes."],
    ],
    answer: "A",
    explanation: "C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂, catalysed by yeast enzymes, warm and anaerobic.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which list puts the alcohols in order of increasing solubility in water?",
    options: [
      ["hexan-1-ol < butan-1-ol < ethanol < ethane-1,2-diol", "Correct: solubility rises as the share of –OH groups in the molecule rises."],
      ["ethane-1,2-diol < ethanol < butan-1-ol < hexan-1-ol", "This is the reverse order: long hydrocarbon chains cannot hydrogen bond with water."],
      ["ethanol < ethane-1,2-diol < hexan-1-ol < butan-1-ol", "Hexan-1-ol is the least soluble; the long chain dominates the molecule."],
      ["butan-1-ol < hexan-1-ol < ethanol < ethane-1,2-diol", "Hexan-1-ol has the longer chain, so it is less soluble than butan-1-ol."],
    ],
    answer: "A",
    hints: ["Which part of the molecule hydrogen bonds with water, and which part cannot?"],
    explanation: "The –OH groups hydrogen bond with water; the hydrocarbon chain does not, so more carbons per –OH means lower solubility.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which of the statements about ethanol and water are correct?\n\n1. Ethanol is a weaker acid than water.\n2. The ethyl group makes the ethoxide ion less stable than the hydroxide ion.\n3. Ethanol reacts with aqueous sodium carbonate to give carbon dioxide.",
    options: [
      ["1 and 2 only", "Correct: alcohols are too weakly acidic to react with carbonates."],
      ["1, 2 and 3", "Statement 3 is false: ethanol does not react with carbonates."],
      ["2 and 3 only", "Statement 1 is true and statement 3 is false."],
      ["1 only", "Statement 2 is also true: it is the reason for statement 1."],
    ],
    answer: "A",
    hints: ["Does the alkyl group push electron density towards O or away from it?"],
    explanation: "The ethyl group donates electron density, concentrating the negative charge on O in C₂H₅O⁻; ethanol is a weaker acid than water and too weak to release CO₂ from carbonates.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which of the statements comparing fermentation with the hydration of ethene are correct?\n\n1. Fermentation uses a renewable raw material.\n2. Hydration of ethene has the higher atom economy.\n3. Fermentation is a continuous process.",
    options: [
      ["1 and 2 only", "Correct: fermentation is a batch process."],
      ["1, 2 and 3", "Statement 3 is false: fermentation is carried out in batches over several days."],
      ["2 and 3 only", "Statement 3 is false and statement 1 is true."],
      ["1 only", "Statement 2 is also true: hydration has 100% atom economy; fermentation loses CO₂."],
    ],
    answer: "A",
    hints: ["Think about the by-product of fermentation."],
    explanation: "Sugars are renewable; C₂H₄ + H₂O → C₂H₅OH has 100% atom economy; fermentation is slow and batchwise.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "How many structural isomers with formula C₄H₁₀O are alcohols, and how many of them are secondary?",
    options: [
      ["four alcohols; one secondary", "Correct: butan-1-ol, butan-2-ol (secondary), 2-methylpropan-1-ol and 2-methylpropan-2-ol."],
      ["four alcohols; two secondary", "2-methylpropan-1-ol is primary: its C–OH carbon is bonded to one carbon."],
      ["three alcohols; one secondary", "Branched primary 2-methylpropan-1-ol is often missed."],
      ["seven alcohols; two secondary", "Seven is the total including the three ethers, which are not alcohols."],
    ],
    answer: "A",
    hints: ["Draw the two carbon skeletons (straight and branched) and place –OH on each different carbon."],
    explanation: "C₄H₉OH has four alcohol isomers (two from each skeleton); only butan-2-ol is secondary. There are also three ethers of formula C₄H₁₀O.",
  });
  {
    const m = 54.0;
    const n = moles(m, Mr("C6H12O6"));
    const v = 2 * n * VM_RTP;
    chk(v, 14.4, 1e-9, "co2 volume");
    b.num({
      d: 2, skill: "APPLICATION", calculator: true, daily: true,
      stem: "Calculate the volume of carbon dioxide, in dm³ at room conditions, released when 54.0 g of glucose, C₆H₁₂O₆, is completely fermented. Ar: H 1, C 12, O 16; molar gas volume 24.0 dm³ mol⁻¹. Give your answer to three significant figures.",
      value: v, sf: 3, unit: "dm³",
      wrong: [n * VM_RTP],
      explanation: `1. Mr(C₆H₁₂O₆) = 180; n = 54.0 ÷ 180 = ${sfStr(n, 3)} mol.\n2. C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂, so n(CO₂) = 2 × ${sfStr(n, 3)} = ${sfStr(2 * n, 3)} mol.\n3. V = ${sfStr(2 * n, 3)} × 24.0 = ${sfStr(v, 3)} dm³.\n4. Ignoring the 1 : 2 ratio gives ${sfStr(n * VM_RTP, 3)} dm³.`,
    });
  }
  {
    const mSugar = 900;
    const n = moles(mSugar, Mr("C6H12O6"));
    const theo = 2 * n * Mr("C2H5OH");
    const actual = 391;
    const y = percentYield(actual, theo);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "Rudo ferments marula fruit pulp containing 900 g of glucose, C₆H₁₂O₆, and distils off 391 g of ethanol. Calculate the percentage yield of ethanol, to three significant figures. Ar: H 1, C 12, O 16.",
      value: y, sf: 3, unit: "%",
      wrong: [percentYield(actual, n * Mr("C2H5OH"))],
      hints: ["Find the maximum mass of ethanol first, using the 1 : 2 ratio."],
      explanation: `1. n(glucose) = 900 ÷ 180 = ${sfStr(n, 3)} mol.\n2. n(ethanol) maximum = 2 × ${sfStr(n, 3)} = ${sfStr(2 * n, 3)} mol; mass = ${sfStr(2 * n, 3)} × 46.0 = ${sfStr(theo, 3)} g.\n3. Yield = 391 ÷ ${sfStr(theo, 3)} × 100 = ${sfStr(y, 3)}%.\n4. Using a 1 : 1 ratio gives over 100%, an impossible yield.`,
    });
  }
  {
    const ae = (2 * Mr("C2H5OH") / Mr("C6H12O6")) * 100;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "Calculate the atom economy, as a percentage to three significant figures, for making ethanol by fermentation: C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂. Ar: H 1, C 12, O 16.",
      value: ae, sf: 3, unit: "%",
      wrong: [(Mr("C2H5OH") / Mr("C6H12O6")) * 100],
      hints: ["Atom economy = mass of desired product ÷ total mass of reactants × 100."],
      explanation: `2 × 46.0 = 92.0; 92.0 ÷ 180 × 100 = ${sfStr(ae, 3)}%. Forgetting the 2 in front of ethanol gives ${sfStr((Mr("C2H5OH") / Mr("C6H12O6")) * 100, 3)}%.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "2-methylpropan-1-ol, (CH₃)₂CHCH₂OH, is a secondary alcohol because its carbon chain is branched.",
    answer: false,
    explanation: "False: the C–OH carbon is bonded to only one other carbon, so it is a primary alcohol; branching elsewhere does not change the class.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Air is excluded during fermentation partly because oxygen would allow the ethanol to be oxidised to ethanoic acid.",
    answer: true,
    explanation: "True: with air, microorganisms oxidise ethanol to ethanoic acid (souring); anaerobic conditions also make the yeast respire anaerobically.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each alcohol with its name.",
    pairs: [
      ["CH₃CH(OH)CH₃", "propan-2-ol"],
      ["(CH₃)₃COH", "2-methylpropan-2-ol"],
      ["HOCH₂CH₂OH", "ethane-1,2-diol"],
      ["HOCH₂CH(OH)CH₂OH", "propane-1,2,3-triol"],
      ["CH₃CH(OH)CH₂CH₃", "butan-2-ol"],
    ],
    explanation: "Number the chain to give the –OH carbon the lowest number; keep the full alkane name before -diol or -triol.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the description of the industrial hydration of ethene.",
    template: "Ethene and {{blank:a}} are passed over a {{blank:b}} catalyst at about {{blank:c}} and 60-70 atm. Unreacted ethene is {{blank:d}}.",
    blanks: [
      { id: "a", accepted: ["steam"], choices: ["steam", "hydrogen", "oxygen"] },
      { id: "b", accepted: ["phosphoric acid"], choices: ["phosphoric acid", "nickel", "iron"] },
      { id: "c", accepted: ["300 °C"], choices: ["300 °C", "35 °C", "1000 °C"] },
      { id: "d", accepted: ["recycled"], choices: ["recycled", "burned", "released"] },
    ],
    explanation: "Steam, H₃PO₄ catalyst, about 300 °C and 60-70 atm; only about 5% reacts per pass, so ethene is recycled.",
  });
  b.short({
    d: 2, skill: "APPLICATION",
    stem: "Name the alcohol CH₃CH₂CH(OH)CH₃.",
    accepted: ["butan-2-ol", "2-butanol", "butan 2 ol"],
    wrong: ["butan-3-ol"],
    explanation: "Number from the end nearer the –OH: the –OH is on carbon 2, so butan-2-ol (not butan-3-ol).",
  });
  b.short({
    d: 3, skill: "ANALYSIS",
    stem: "Give the name of the alcohol isomer of C₅H₁₁OH that is tertiary.",
    accepted: ["2-methylbutan-2-ol", "2-methyl-2-butanol", "2 methylbutan 2 ol"],
    wrong: ["pentan-2-ol"],
    hints: ["The C–OH carbon must carry three carbon groups."],
    explanation: "CH₃CH₂C(OH)(CH₃)₂ is 2-methylbutan-2-ol, the only tertiary alcohol of formula C₅H₁₂O.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why ethanol mixes completely with water but hexan-1-ol is almost insoluble.",
    points: ["Ethanol's –OH group forms hydrogen bonds with water molecules (δ+ H to a lone pair on O)", "These new hydrogen bonds release enough energy to replace the hydrogen bonds broken in water and ethanol", "Hexan-1-ol has a long non-polar hydrocarbon chain that cannot hydrogen bond with water and disrupts water's hydrogen bonding, so it does not dissolve"],
    modelAnswer: "The O–H group in ethanol hydrogen bonds with water molecules, and these bonds compensate for the hydrogen bonds broken in the pure liquids, so the two mix. In hexan-1-ol the single –OH is attached to a long non-polar chain of six carbons. The chain cannot form hydrogen bonds with water and would break water's hydrogen-bond network, so the alcohol is almost insoluble.",
    hints: ["Which part of each molecule can hydrogen bond with water?"],
    explanation: "Hydrogen bonding with water versus a long hydrophobic chain.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 4,
    stem: "Compare the manufacture of ethanol by fermentation of sugar cane with its manufacture by hydration of ethene. Give two advantages of each method.",
    points: ["Fermentation: renewable raw material (sugar cane)", "Fermentation: low temperature and pressure, so less energy for the reaction (or simple equipment)", "Hydration: fast, continuous process", "Hydration: high-purity product (no fermentation broth to distil) or 100% atom economy"],
    modelAnswer: "Fermentation uses sugar cane, a renewable resource, and runs at about 35 °C and normal pressure with simple equipment. Hydration of ethene is a fast, continuous process that gives nearly pure ethanol with 100% atom economy, whereas fermentation is slow, batchwise and gives only about 15% ethanol.",
    hints: ["Think about raw material, rate, purity and energy."],
    explanation: "Two creditworthy advantages for each process.",
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why ethanol is a weaker acid than water.",
    points: ["The ethyl group is electron-donating (positive inductive effect)", "so the negative charge on O in C₂H₅O⁻ is more concentrated, the ion is less stable (accepts H⁺ more readily) than OH⁻, and ethanol dissociates less"],
    modelAnswer: "The ethyl group pushes electron density towards the oxygen atom, intensifying the negative charge on the ethoxide ion. The ethoxide ion is therefore less stable than hydroxide and recombines with protons more readily, so ethanol is less dissociated than water.",
    hints: ["Compare the stability of the anions formed."],
    explanation: "Acidity depends on the stability of the conjugate base.",
  });
  {
    const mG = 63.0;
    const n = moles(mG, Mr("C6H12O6"));
    const mE = 2 * n * Mr("C2H5OH");
    const vC = 2 * n * VM_RTP * 1000;
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
      stem: "Tatenda investigates making ethanol from crushed baobab and marula fruit. The table shows the boiling points of three compounds involved (data).\n\n| Compound | Formula | Boiling point / °C |\n|---|---|---|\n| water | H₂O | 100 |\n| ethanol | CH₃CH₂OH | 78 |\n| ethanoic acid | CH₃COOH | 118 |",
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: "State two conditions Tatenda must provide for fermentation and give a reason for one of them.", points: ["Yeast, about 30-40 °C, no air (any two conditions)", "Reason: higher temperatures denature the enzymes, or air allows oxidation of ethanol to ethanoic acid"], modelAnswer: "Add yeast and keep the mixture at about 35 °C without air; above about 40 °C the yeast enzymes are denatured." }),
        P.num({ label: "(b)", marks: 2, stem: "The fruit contains the equivalent of 63.0 g of glucose. Calculate the maximum mass of ethanol, in g, that can form. (Ar: H 1, C 12, O 16)", value: mE, sf: 3, unit: "g", wrong: [n * Mr("C2H5OH")], explanation: `n(glucose) = 63.0 ÷ 180 = ${sfStr(n, 3)} mol; n(ethanol) = ${sfStr(2 * n, 3)} mol; mass = ${sfStr(2 * n, 3)} × 46.0 = ${sfStr(mE, 3)} g.` }),
        P.num({ label: "(c)", marks: 1, stem: "Calculate the volume of CO₂, in cm³ at room conditions, released at the same time. (One mole of gas occupies 24 000 cm³ at room conditions.)", value: vC, sf: 3, unit: "cm³", wrong: [vC / 1000], explanation: `${sfStr(2 * n, 3)} mol × 24 000 cm³ mol⁻¹ = ${sfStr(vC, 3)} cm³.` }),
        P.mcq({ label: "(d)", marks: 1, stem: "Which method separates the ethanol from the fermented mixture?", options: [
          ["fractional distillation", "Correct: ethanol (78 °C) and water (100 °C) have different boiling points."],
          ["filtration through filter paper", "Filtration removes solids such as yeast and pulp but cannot separate two miscible liquids."],
          ["using a separating funnel", "Ethanol and water are miscible, so they do not form two layers."],
          ["crystallisation of the ethanol", "Ethanol is a liquid at room temperature; it cannot be crystallised out of the mixture."],
        ], answer: "A", explanation: "Miscible liquids with different boiling points are separated by fractional distillation." }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain, in terms of intermolecular forces, why ethanol boils at a lower temperature than water.", points: ["Both form hydrogen bonds between molecules", "Water can form up to two hydrogen bonds per molecule (two δ+ H and two lone pairs) but ethanol has only one δ+ H, so ethanol has fewer hydrogen bonds per molecule and needs less energy to separate"], modelAnswer: "Both liquids are hydrogen bonded, but each water molecule has two O–H hydrogens and two lone pairs and can form about twice as many hydrogen bonds as ethanol, which has only one O–H. Less energy is needed to separate ethanol molecules." }),
      ],
      hints: ["Use the 1 : 2 : 2 ratio from the fermentation equation."],
      explanation: `Maximum ethanol ${sfStr(mE, 3)} g and ${sfStr(vC, 3)} cm³ CO₂; separation by fractional distillation; water forms more hydrogen bonds per molecule.`,
    });
  }
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: "Compounds Q, R and S are isomers of formula C₄H₁₀O. Q and R are alcohols; S is not. Of the three, Q has the highest boiling point and S the lowest. The carbon chain of Q is unbranched. R has a branched chain and is not oxidised by acidified potassium dichromate(VI).",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name R.", accepted: ["2-methylpropan-2-ol", "2-methyl-2-propanol", "tert-butanol", "tertiary butanol", "t-butanol", "2 methylpropan 2 ol"], wrong: ["2-methylpropan-1-ol"], explanation: "Not oxidised, so tertiary: (CH₃)₃COH, 2-methylpropan-2-ol." }),
      P.mcq({ label: "(b)", marks: 1, stem: "Q is a primary alcohol. Which compound is Q?", options: [
        ["butan-1-ol", "Correct: unbranched chain with –OH on the end carbon."],
        ["butan-2-ol", "Butan-2-ol is unbranched but secondary."],
        ["2-methylpropan-1-ol", "This primary alcohol has a branched chain."],
        ["ethoxyethane", "This is an ether: no O–H group, so it is not an alcohol."],
      ], answer: "A", explanation: "CH₃CH₂CH₂CH₂OH." }),
      P.short({ label: "(c)", marks: 1, stem: "S is an ether with two identical alkyl groups. Give its structural formula (for example CH3OCH3).", accepted: ["CH3CH2OCH2CH3", "C2H5OC2H5", "CH₃CH₂OCH₂CH₃", "(C2H5)2O", "(CH3CH2)2O"], normalise: ["trim", "collapse_whitespace"], wrong: ["CH3OCH2CH2CH3"], explanation: "Ethoxyethane, CH₃CH₂OCH₂CH₃." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why S has a much lower boiling point than Q.", points: ["S has no O–H bond (no H bonded to O), so it cannot form hydrogen bonds between its molecules; it has only dipole-dipole and dispersion forces", "Q forms hydrogen bonds between molecules, which need more energy to overcome"], modelAnswer: "Ethoxyethane has no hydrogen bonded to oxygen, so its molecules attract each other only by permanent dipole and dispersion forces. Butan-1-ol molecules are held by hydrogen bonds, which are stronger and need more energy to break." }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain why R boils at a lower temperature than Q.", points: ["R is more branched/compact (more spherical), so there is less surface contact between molecules", "so dispersion (instantaneous dipole-induced dipole) forces are weaker (and the crowded –OH hydrogen bonds less well)"], modelAnswer: "R is a compact, branched molecule, so neighbouring molecules touch over a smaller area and the instantaneous dipole-induced dipole forces are weaker; less energy is needed to separate them." }),
      P.manual({ label: "(f)", marks: 1, stem: "Name one other alcohol isomer of C₄H₁₀O that is a secondary alcohol, and give its structural formula.", points: ["Butan-2-ol, CH₃CH(OH)CH₂CH₃"], modelAnswer: "Butan-2-ol, CH₃CH(OH)CH₂CH₃." }),
    ],
    hints: ["Tertiary alcohols are not oxidised by dichromate(VI).", "Ethers have no O–H bond."],
    explanation: "Q butan-1-ol, R 2-methylpropan-2-ol, S ethoxyethane; hydrogen bonding and branching explain the boiling points.",
  });

  b.card("DEFINITION", "Primary, secondary and tertiary alcohol", "The C–OH carbon is bonded to one, two or three other carbon atoms respectively.");
  b.card("FORMULA", "Fermentation equation", "C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂ (yeast, about 30-40 °C, anaerobic).");
  b.card("FACT", "Conditions for hydration of ethene", "Steam, H₃PO₄ catalyst on silica, about 300 °C and 60-70 atm; unreacted ethene recycled.");
  b.card("CONCEPT", "Why alcohols boil higher than alkanes of similar Mr", "Hydrogen bonds form between –OH groups (δ+ H to a lone pair on O) of neighbouring molecules.");
  b.card("CONCEPT", "Solubility of alcohols in water", "Small alcohols mix completely (–OH hydrogen bonds with water); solubility falls as the hydrocarbon chain lengthens.");
  b.card("CONCEPT", "Effect of branching on alcohol boiling points", "Branched isomers are more compact: less surface contact, weaker dispersion forces, lower boiling point.");
  b.card("CONCEPT", "Fermentation versus hydration", "Fermentation: renewable, low energy, batch, dilute product. Hydration: crude-oil based, continuous, fast, pure, 100% atom economy.");
  b.card("CONCEPT", "Acidity of ethanol compared with water", "Ethanol is weaker: the electron-donating ethyl group destabilises C₂H₅O⁻ compared with OH⁻.");
  b.card("FACT", "Why fermentation stops at about 15% ethanol", "The ethanol concentration becomes toxic to the yeast, killing it.");
});
