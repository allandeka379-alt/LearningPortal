// W2a: achem.phase.partition-extraction (both boards; ZIMSEC Form 6, Cambridge A Level only)
import { concept, P, t, ce, partitionK, remainingAfterExtractions, titre, molesFromSolution, sfStr, dpStr, sciStr } from "../lib.mjs";

concept("achem.phase.partition-extraction", { file: "phase/partition-extraction", keyPrefix: "phase.partition-extraction" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is the best definition of the partition coefficient of a solute X between hexane and water?",
    options: [
      ["the ratio of the equilibrium concentrations of X in hexane and in water", "Correct: Kpc = [X]hexane/[X]water at equilibrium, at a stated temperature, same molecular state."],
      ["the ratio of the masses of X dissolved in the hexane layer and in the water layer", "Masses must be divided by the solvent volumes: Kpc is a ratio of concentrations."],
      ["the mass of X that dissolves in 100 g of hexane", "That describes solubility in one solvent, not partition between two."],
      ["the difference between the solubility of X in hexane and in water", "Kpc is a ratio, not a difference."],
    ],
    answer: "A",
    explanation: "Kpc compares equilibrium concentrations in two immiscible solvents.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which solute is expected to have the largest partition coefficient Kpc(hexane/water)?",
    options: [
      [t`bromine, $\ce{Br2}$`, "Correct: a non-polar molecule, much more soluble in non-polar hexane."],
      ["ethanol", "Ethanol hydrogen bonds with water, so it favours the aqueous layer."],
      ["glucose", "Glucose has many OH groups and dissolves well in water, hardly at all in hexane."],
      ["potassium chloride", "An ionic compound dissolves in water, not in hexane."],
    ],
    answer: "A",
    explanation: "Like dissolves like: non-polar Br₂ prefers hexane; polar, hydrogen-bonding or ionic solutes prefer water.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "An aqueous solution is shaken with ethoxyethane (ether) in a separating funnel. Ether is less dense than water and does not mix with it. Which statement is correct?",
    options: [
      ["The ether layer is on top and is poured or run off after the aqueous layer.", "Correct: the less dense ether floats; the aqueous layer is run off through the tap first."],
      ["The ether layer is at the bottom of the funnel and is run off first through the tap.", "Ether is less dense than water, so it is on top."],
      ["The two liquids form a single layer after shaking.", "They are immiscible, so two layers always separate."],
      ["The stopper must stay tight throughout so that no vapour escapes.", "Pressure from the volatile solvent must be released through the tap during shaking."],
    ],
    answer: "A",
    explanation: "Less dense ether floats on water. Run the lower (aqueous) layer off first, then collect the ether layer.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements about solvent extraction with a fixed total volume of organic solvent are correct?\n\n1. Several small portions extract more solute than one large portion.\n2. The partition coefficient changes after each extraction.\n3. Each extraction leaves the same fraction of the remaining solute in the aqueous layer, if equal portions are used.",
    options: [
      ["1 and 3 only", "Correct: Kpc is constant, so each equal portion leaves the same fraction behind; repeated small portions remove more."],
      ["1, 2 and 3", "Statement 2 is false: Kpc depends only on temperature."],
      ["2 and 3 only", "Statement 2 is false and statement 1 is true."],
      ["1 only", "Statement 3 is also true: with equal portions the fraction left each time is V_aq/(V_aq + Kpc V_org)."],
    ],
    answer: "A",
    hints: ["Does Kpc change as the solute is removed?"],
    explanation: "Kpc is constant, so each extraction with V_org leaves the fraction V_aq/(V_aq + Kpc V_org); multiplying this fraction several times leaves less solute than one big extraction.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements explain why the simple partition law does not apply to ethanoic acid shared between water and a non-polar solvent?\n\n1. In the non-polar solvent ethanoic acid molecules pair up (dimerise) by hydrogen bonding.\n2. In water ethanoic acid partly dissociates into ions.\n3. Ethanoic acid is completely insoluble in non-polar solvents.",
    options: [
      ["1 and 2 only", "Correct: the solute is not in the same molecular state in the two solvents."],
      ["1, 2 and 3", "Statement 3 is false: ethanoic acid does dissolve in non-polar solvents, as dimers."],
      ["2 and 3 only", "Statement 3 is false and statement 1 is true."],
      ["1 only", "Statement 2 is also a reason: some of it is present as ions in water."],
    ],
    answer: "A",
    hints: ["Kpc needs the same molecular state in both solvents."],
    explanation: "Dimerisation in the organic layer and dissociation in water mean the species differ between the layers, so the simple concentration ratio is not constant.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "In paper chromatography the stationary phase is water held in the paper and the mobile phase is an organic solvent. Which solute travels furthest?",
    options: [
      ["the solute with the largest Kpc(solvent/water)", "Correct: it spends most time in the moving solvent, so it has the highest Rf."],
      ["the solute with the smallest Kpc(solvent/water)", "This solute stays mostly in the stationary water and moves least."],
      ["the solute with the largest relative molecular mass", "Mass alone does not decide; partition between the phases does."],
      ["the solute that is most soluble in water", "A water-soluble solute is held back by the stationary phase."],
    ],
    answer: "A",
    hints: ["Which phase moves?"],
    explanation: "Chromatography is repeated partition: the more a solute favours the mobile phase, the further it moves.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: "A solute has Kpc(ether/water) = 1.00. 100 cm³ of an aqueous solution of it is extracted with ether. Which procedure leaves the least solute in the water?",
    options: [
      ["four extractions with 25 cm³ of ether each", "Correct: fraction left = (100/125)⁴ = 0.41."],
      ["one extraction with 100 cm³ of ether", "Fraction left = 100/200 = 0.50."],
      ["two separate extractions with 50 cm³ of fresh ether each", "Fraction left = (100/150)² = 0.44."],
      ["one extraction with 50 cm³ of ether", "Fraction left = 100/150 = 0.67: the least ether used."],
    ],
    answer: "A",
    hints: ["Fraction left per extraction = V_aq/(V_aq + Kpc V_org)."],
    explanation: "Same total volume (100 cm³) split into more portions leaves less behind: 0.41 < 0.44 < 0.50.",
  });
  b.num({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: "At equilibrium a solute is present at 0.0450 mol dm⁻³ in octan-1-ol and 0.0150 mol dm⁻³ in water. Calculate Kpc(octan-1-ol/water).",
    value: partitionK(0.045, 0.015), sf: 3,
    wrong: [partitionK(0.015, 0.045)],
    explanation: "Kpc = 0.0450 ÷ 0.0150 = 3.00 (no units). The inverse ratio, 0.333, would be Kpc(water/octan-1-ol).",
  });
  {
    const org = (1.5 - 0.3) / 0.025, aq = 0.3 / 0.05;
    const K = partitionK(org, aq);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "In an experiment, 1.50 g of a solute Y was shaken with 25.0 cm³ of trichloromethane and 50.0 cm³ of water until equilibrium. The aqueous layer contained 0.300 g of Y. Calculate Kpc(trichloromethane/water).",
      value: K, sf: 3,
      wrong: [partitionK(1.2, 0.3)],
      hints: ["Find the mass in each layer, then divide by that layer's volume."],
      explanation: `1. Mass in trichloromethane = 1.50 − 0.300 = 1.20 g.\n2. Concentrations: ${sfStr(org, 3)} g dm⁻³ (1.20 g ÷ 0.0250 dm³) and ${sfStr(aq, 3)} g dm⁻³ (0.300 g ÷ 0.0500 dm³).\n3. Kpc = ${sfStr(org, 3)} ÷ ${sfStr(aq, 3)} = ${sfStr(K, 3)}.\n4. Using the masses without the volumes gives ${sfStr(partitionK(1.2, 0.3), 3)}.`,
    });
  }
  {
    const m1 = remainingAfterExtractions(5.0, 10.0, 200, 50, 1);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "5.00 g of a compound is dissolved in 200 cm³ of water and shaken with 50.0 cm³ of an organic solvent. Kpc(organic/water) = 10.0. Calculate the mass of the compound, in g, left in the aqueous layer, to three significant figures.",
      value: m1, sf: 3, unit: "g",
      wrong: [5 - m1, 5 / 11],
      hints: ["Let m g stay in the water; then (5.00 − m) g is in the organic layer."],
      explanation: `1. Kpc = [(5.00 − m)/50.0] ÷ [m/200] = 10.0.\n2. (5.00 − m) × 200 = 10.0 × 50.0 × m, so m = 5.00 × 200/(200 + 500) = ${sfStr(m1, 3)} g.\n3. ${sfStr(5 - m1, 3)} g has been extracted. Ignoring the different volumes gives 5.00/11 = ${sfStr(5 / 11, 3)} g.`,
    });
  }
  {
    const m2 = remainingAfterExtractions(5.0, 10.0, 200, 25, 2);
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: "The solution in the previous situation (5.00 g of compound in 200 cm³ of water, Kpc(organic/water) = 10.0) is instead extracted twice with 25.0 cm³ portions of fresh organic solvent. Calculate the total mass of compound extracted, in g, to three significant figures.",
      value: 5 - m2, sf: 3, unit: "g",
      wrong: [m2, 5 - remainingAfterExtractions(5.0, 10.0, 200, 50, 1)],
      hints: ["Fraction left after each extraction = 200/(200 + 10.0 × 25.0).", "Apply it twice."],
      explanation: `1. Fraction left per extraction = 200/(200 + 250) = ${sfStr(200 / 450, 3)}.\n2. Left after two = 5.00 × ${sfStr(200 / 450, 3)}² = ${sfStr(m2, 3)} g.\n3. Extracted = 5.00 − ${sfStr(m2, 3)} = ${sfStr(5 - m2, 3)} g, more than the ${sfStr(5 - remainingAfterExtractions(5.0, 10.0, 200, 50, 1), 3)} g removed by one 50.0 cm³ portion.`,
    });
  }
  {
    const aq = 0.0425 / 85;
    b.num({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: "For iodine, Kpc(tetrachloromethane/water) = 85 at 298 K (data). A tetrachloromethane layer at equilibrium contains 0.0425 mol dm⁻³ of iodine. Calculate the concentration of iodine in the aqueous layer, in mol dm⁻³.",
      value: aq, sf: 3, unit: "mol/dm³",
      wrong: [0.0425 * 85],
      explanation: `[I₂(aq)] = [I₂(CCl₄)] ÷ Kpc = 0.0425 ÷ 85 = ${sciStr(aq, 3)} mol dm⁻³. Multiplying by Kpc instead gives a value far too large.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Doubling the amount of solute shaken with the same volumes of two immiscible solvents doubles the value of Kpc.",
    answer: false,
    explanation: "False. Both concentrations double, so their ratio, Kpc, is unchanged; it depends only on temperature (and the chosen solvents and solute).",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Ethanol cannot be used to extract an organic compound from an aqueous solution because ethanol mixes completely with water.",
    answer: true,
    explanation: "True. Solvent extraction needs two immiscible layers; ethanol and water form a single solution.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each solute with the layer it mainly enters when shaken with water and hexane.",
    pairs: [
      ["iodine", "hexane layer (non-polar molecule)"],
      ["sodium chloride", "water layer (ionic)"],
      ["glucose", "water layer (many hydrogen bonds to water)"],
      ["octane", "hexane layer (instantaneous dipole forces only)"],
    ],
    hints: ["Like dissolves like."],
    explanation: "Non-polar solutes go into hexane; ionic and hydrogen-bonding solutes stay in water.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences about partition.",
    template: "Kpc is a ratio of equilibrium {{blank:a}} of a solute in two {{blank:b}} solvents. Its value changes only if the {{blank:c}} changes.",
    blanks: [
      { id: "a", accepted: ["concentrations"], choices: ["concentrations", "masses", "volumes"] },
      { id: "b", accepted: ["immiscible"], choices: ["immiscible", "miscible", "aqueous"] },
      { id: "c", accepted: ["temperature"], choices: ["temperature", "volume of solvent", "mass of solute"] },
    ],
    explanation: "Kpc compares concentrations in immiscible solvents and, like other equilibrium constants, depends only on temperature.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 2,
    stem: "Define the partition coefficient, stating the conditions under which it applies.",
    points: ["Ratio of the concentrations of a solute in two immiscible solvents at equilibrium", "at a given temperature, with the solute in the same molecular state in both solvents"],
    modelAnswer: "Kpc is the ratio of the equilibrium concentrations of a solute in two immiscible solvents, at a given temperature, when the solute is in the same molecular state in both.",
    explanation: "Name both conditions.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why extracting a solute with two 25 cm³ portions of solvent removes more of it than one 50 cm³ portion.",
    points: ["At each equilibrium a fixed fraction of the solute remains in the aqueous layer (Kpc constant)", "After the first small extraction, fresh solvent re-establishes partition with the solute that is left, removing a further fraction of it", "The overall fraction left (the per-portion fraction squared) is smaller than the fraction left by one 50 cm³ extraction"],
    modelAnswer: "Each extraction reaches a partition equilibrium in which a fixed fraction of the solute stays in the water. With two portions, the second batch of fresh solvent removes a share of what the first left behind, so the fraction remaining is the single-portion fraction squared. Calculation shows this is smaller than the fraction left by one extraction with the combined volume.",
    hints: ["Think about what fraction stays behind each time."],
    explanation: "Repeated partition with fresh solvent is more efficient.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Outline how you would extract an organic product from 100 cm³ of aqueous reaction mixture using ether, including one safety precaution.",
    points: ["Shake the mixture with a portion of ether in a stoppered separating funnel, releasing the pressure through the tap from time to time", "Let the layers separate, run off the lower aqueous layer, keep the ether layer; repeat with fresh portions of ether and combine the extracts", "Ether is highly flammable: no naked flames (or work in a fume cupboard, wear eye protection)"],
    modelAnswer: "Pour the mixture and about 20 cm³ of ether into a separating funnel, stopper and shake, opening the tap now and then to release vapour. Allow the layers to separate, run off the lower aqueous layer and keep the upper ether layer. Repeat with two more fresh portions of ether and combine the ether extracts, then dry them and evaporate the ether. Ether is highly flammable, so there must be no naked flames.",
    hints: ["Several portions; vent the funnel; ether floats."],
    explanation: "Points for method, repeated portions and safety.",
  });
  // Structured: Kpc by titration
  {
    const tE = titre(0.6, 13.0), tW = titre(1.2, 26.0);
    const cE = molesFromSolution(tE, 0.02) / 0.01;
    const cW = molesFromSolution(tW, 0.02) / 0.01;
    const K = partitionK(cE, cW);
    const left = remainingAfterExtractions(2.0, K, 50, 60, 1);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: `Tendai investigated the partition of a monobasic organic acid, HZ, between ethoxyethane (ether) and water at 25 °C. HZ does not dissociate or dimerise significantly in either solvent. After shaking and separating, 10.0 cm³ of each layer was titrated with 0.0200 mol dm⁻³ sodium hydroxide.

| Layer titrated | ether | water |
|---|---|---|
| final burette reading / cm³ | 13.00 | 26.00 |
| initial burette reading / cm³ | 0.60 | 1.20 |`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the concentration of HZ in the ether layer, in mol dm⁻³, to three significant figures.", value: cE, sf: 3, unit: "mol/dm³", wrong: [molesFromSolution(tE, 0.02)], explanation: `Titre = ${dpStr(tE, 2)} cm³; n = ${dpStr(tE, 2)}/1000 × 0.0200 = ${sciStr(molesFromSolution(tE, 0.02), 3)} mol in 10.0 cm³; c = ${sfStr(cE, 3)} mol dm⁻³.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the concentration of HZ in the water layer, in mol dm⁻³, to three significant figures.", value: cW, sf: 3, unit: "mol/dm³", explanation: `Titre = ${dpStr(tW, 2)} cm³; n = ${sciStr(molesFromSolution(tW, 0.02), 3)} mol in 10.0 cm³; c = ${sfStr(cW, 3)} mol dm⁻³.` }),
        P.num({ label: "(c)", marks: 1, stem: "Calculate Kpc(ether/water) for HZ.", value: K, sf: 3, wrong: [1 / K], explanation: `Kpc = ${sfStr(cE, 3)} ÷ ${sfStr(cW, 3)} = ${sfStr(K, 3)}.` }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain why it matters that HZ does not dissociate or dimerise in either solvent.", points: ["Kpc applies only when the solute is in the same molecular state in both solvents", "Dissociation (in water) or dimerisation (in ether) would change the species present, so the ratio of total concentrations would not be constant"], modelAnswer: "The partition law compares the same species in both layers. If HZ dissociated in water or formed dimers in ether, the titration would measure total acid in different forms and the ratio would vary with concentration instead of being constant." }),
        P.num({ label: "(e)", marks: 2, stem: "2.00 g of HZ is dissolved in 50.0 cm³ of water and shaken once with 60.0 cm³ of ether at 25 °C. Use your value of Kpc to calculate the mass of HZ, in g, left in the water, to three significant figures.", value: left, sf: 3, unit: "g", wrong: [2 - left], explanation: `m = 2.00 × 50.0/(50.0 + ${sfStr(K, 3)} × 60.0) = ${sfStr(left, 3)} g.` }),
        P.manual({ label: "(f)", marks: 3, stem: "Suggest three precautions Tendai should take to obtain reliable, safe results.", points: ["Shake for long enough (or several times) and keep the temperature constant so that equilibrium is reached at 25 °C", "Separate the layers cleanly and use a pipette to take each 10.0 cm³ sample without contamination from the other layer", "Ether is highly flammable and volatile: no naked flames, vent the separating funnel, use a fume cupboard or eye protection"], modelAnswer: "He should shake thoroughly at a constant 25 °C so that partition equilibrium is reached; take each sample carefully with a pipette from the correct layer without carrying over the other liquid; and, because ether is extremely flammable and volatile, keep flames away, release pressure while shaking, and work in a fume cupboard with eye protection." }),
      ],
      hints: ["n(HZ) = n(NaOH) (1 : 1).", "Kpc = [HZ]ether/[HZ]water."],
      explanation: `[HZ] ether = ${sfStr(cE, 3)}, water = ${sfStr(cW, 3)} mol dm⁻³; Kpc(ether/water) = ${sfStr(K, 3)}; ${sfStr(left, 3)} g stays in the water after one extraction.`,
    });
  }
  b.struct({
    d: 4, skill: "UNDERSTANDING", examStyle: true,
    stem: "Chemists choose solvents for extraction and chromatography using the polarity of the solute and of the solvents.",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Which solute has the smallest Kpc(hexane/water)?", options: [
        ["ethane-1,2-diol, HOCH₂CH₂OH", "Correct: two OH groups give strong hydrogen bonding with water."],
        ["iodine, I₂", "Iodine is non-polar and strongly favours hexane."],
        ["cyclohexane, C₆H₁₂", "A non-polar hydrocarbon has a very large Kpc(hexane/water)."],
        ["tetrachloromethane, CCl₄", "CCl₄ is non-polar overall and favours hexane."],
      ], answer: "A", explanation: "The most polar, hydrogen-bonding solute stays in water." }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain your answer to (a) in terms of intermolecular forces.", points: ["Ethane-1,2-diol forms strong hydrogen bonds with water molecules (two OH groups)", "Hexane can attract it only by weak instantaneous dipole–induced dipole forces, so it stays mainly in water"], modelAnswer: "Ethane-1,2-diol has two OH groups that hydrogen bond strongly to water. In hexane only weak instantaneous dipole–induced dipole forces are possible, so the solute is far more stable in water and its Kpc(hexane/water) is very small." }),
      P.manual({ label: "(c)", marks: 2, stem: "Paper chromatography of a plant extract uses water held in the paper and a less polar organic solvent as the mobile phase. Explain why a less polar pigment moves further up the paper than a more polar one.", points: ["Each pigment partitions between the stationary water and the mobile organic solvent", "The less polar pigment has a larger Kpc(solvent/water), spends more time in the moving solvent and so travels further (higher Rf)"], modelAnswer: "The pigments are repeatedly shared between the water held in the paper and the moving solvent. A less polar pigment is relatively more soluble in the organic solvent, so it spends more time in the mobile phase and travels further, giving a higher Rf." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest why dichloromethane, not ethanol, is used to extract caffeine from tea made in water.", points: ["Ethanol is miscible with water, so no separate layer would form", "Dichloromethane is immiscible with water (and caffeine is more soluble in it), so the layers can be separated"], modelAnswer: "Ethanol mixes completely with water, so no second layer forms and nothing can be separated. Dichloromethane does not mix with water and dissolves caffeine well, so caffeine partitions into the dichloromethane layer, which can then be run off." }),
      P.tf({ label: "(e)", marks: 1, stem: "Dichloromethane forms the lower layer when shaken with water.", answer: true, explanation: "True: dichloromethane is denser than water." }),
    ],
    hints: ["Like dissolves like.", "Extraction needs immiscible solvents."],
    explanation: "Polar, hydrogen-bonding solutes favour water; partition between a stationary and a mobile phase underlies chromatography; extraction needs an immiscible solvent.",
  });
  b.card("DEFINITION", "Partition coefficient, Kpc", "Ratio of the equilibrium concentrations of a solute in two immiscible solvents, at a given temperature, same molecular state in both.");
  b.card("FORMULA", "Mass left after one extraction", "m₁ = m₀ × V_aq/(V_aq + Kpc × V_org), with Kpc = [organic]/[aqueous].");
  b.card("CONCEPT", "Repeated extractions", "Several small portions of solvent extract more than one large portion of the same total volume.");
  b.card("CONCEPT", "Polarity and Kpc", "Non-polar solutes have large Kpc(organic/water); ionic or hydrogen-bonding solutes have small values.");
  b.card("FACT", "Same molecular state", "Kpc fails if the solute dissociates (e.g. in water) or dimerises (e.g. ethanoic acid in non-polar solvents).");
  b.card("FACT", "Which layer is on top?", "Hexane and ether float on water; dichloromethane and trichloromethane sink.");
  b.card("CONCEPT", "Partition and chromatography", "Solutes are shared between a stationary and a mobile phase; larger Kpc(mobile/stationary) means further travel.");
  b.card("FACT", "Separating funnel technique", "Shake, vent through the tap, let layers separate, run off the lower layer; repeat with fresh solvent.");
});
