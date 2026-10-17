// W4b: achem.analysis.chromatography-tlc (both boards; ZIMSEC Form 6, Cambridge A Level only)
import { concept, P, t, ce, ZIM, rf, sfStr, dpStr } from "../lib.mjs";

concept("achem.analysis.chromatography-tlc", { file: "analysis/chromatography-tlc", keyPrefix: "analysis.chromatography-tlc" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Why is the baseline of a paper chromatogram drawn in pencil rather than ink?",
    options: [
      ["Graphite is insoluble in the solvent, so it does not move.", "Correct: ink contains dyes that would dissolve and form their own spots."],
      ["Pencil lines absorb the solvent and make it rise faster.", "The pencil line has no effect on how fast the solvent rises."],
      ["Ink would react with the stationary phase and change its polarity.", "The problem with ink is that it dissolves and separates, not that it reacts."],
      ["Pencil marks glow under ultraviolet light, showing the baseline.", "Graphite does not fluoresce; it is used because it stays put."],
    ],
    answer: "A",
    explanation: "Graphite does not dissolve in the solvent; ink would run and separate into coloured spots.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In thin-layer chromatography on silica, which substance is likely to have the highest Rf value with a non-polar solvent?",
    options: [
      ["naphthalene, a non-polar hydrocarbon", "Correct: it is adsorbed only weakly on polar silica and moves with the solvent."],
      ["glycine, an amino acid", "Glycine is very polar (it forms zwitterions) and is strongly adsorbed: low Rf."],
      ["benzoic acid, which has a –COOH group", "Its –COOH group hydrogen bonds to the silica surface, lowering Rf."],
      ["glucose, which has five –OH groups", "Many –OH groups mean strong adsorption on silica: very low Rf."],
    ],
    answer: "A",
    explanation: "Silica is polar; the least polar compound is held least and travels furthest.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which reagent is sprayed on a chromatogram to locate colourless amino acids?",
    options: [
      ["ninhydrin", "Correct: amino acids give purple spots after warming."],
      ["bromine water", "Bromine water tests for C=C, not amino acids."],
      ["Tollens' reagent", "Tollens' reagent tests for aldehydes."],
      ["universal indicator", "An indicator would not give distinct, permanent spots for amino acids."],
    ],
    answer: "A",
    explanation: "Ninhydrin reacts with amino acids to give purple-coloured spots.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements about Rf values are correct?\n\n1. The Rf value of a substance depends on the solvent used.\n2. A substance that moves faster than the solvent has an Rf value greater than 1.\n3. A pure substance gives a single spot.",
    options: [
      ["1 and 3 only", "Correct: Rf depends on conditions, and one spot indicates one component."],
      ["1, 2 and 3", "Statement 2 is false: no spot can move further than the solvent front, so Rf ≤ 1."],
      ["2 and 3 only", "Statement 2 is false and statement 1 is true."],
      ["1 only", "Statement 3 is also true."],
    ],
    answer: "A",
    hints: ["Can a spot overtake the solvent that carries it?"],
    explanation: "Rf is between 0 and 1, depends on stationary phase, solvent and temperature; a pure substance gives one spot.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements about column chromatography are correct?\n\n1. The mobile phase is an unreactive gas.\n2. The separated components are collected as fractions at the bottom.\n3. The stationary phase can be silica or aluminium oxide.",
    options: [
      ["2 and 3 only", "Correct: a liquid eluent carries the components through a packed column of silica or alumina."],
      ["1, 2 and 3", "Statement 1 is false: a gas mobile phase is used in gas-liquid chromatography."],
      ["1 and 2 only", "Statement 1 is false and statement 3 is true."],
      ["3 only", "Statement 2 is also true."],
    ],
    answer: "A",
    hints: ["What carries the mixture down a column?"],
    explanation: "Column chromatography uses a liquid mobile phase and a silica or alumina stationary phase; fractions are collected.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A TLC plate (silica) is run with hexane and all the spots stay near the baseline. What change is most likely to make them move further?",
    options: [
      ["using a more polar solvent, such as hexane mixed with ethyl ethanoate", "Correct: a more polar eluent competes for the silica and dissolves polar compounds better."],
      ["using a longer plate with the same solvent", "Rf would not change; the spots would still be bunched near the baseline."],
      ["drawing the baseline further from the bottom of the plate", "The baseline position does not change Rf."],
      ["using a plate coated with a more polar stationary phase", "A more polar stationary phase would hold the compounds even more strongly."],
    ],
    answer: "A",
    hints: ["The compounds are held strongly by the silica."],
    explanation: "Low Rf values show strong adsorption; a more polar mobile phase increases the Rf values.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "In two-way chromatography of an amino acid mixture, spots X and Y have the same Rf in solvent 1 but Rf 0.70 and 0.30 in solvent 2. Which conclusion is correct?",
    options: [
      ["X and Y are different amino acids that only separate in solvent 2.", "Correct: equal Rf in one solvent does not prove identity; solvent 2 separates them."],
      ["X and Y are the same amino acid, because their Rf values match in solvent 1.", "Two substances can share an Rf in one solvent by coincidence."],
      ["Solvent 2 is unsuitable, because it gives different Rf values.", "Different Rf values in solvent 2 are exactly what is needed to separate them."],
      ["The chromatogram was run incorrectly, because Rf values must be equal in both solvents.", "Rf depends on the solvent, so values normally differ between solvents."],
    ],
    answer: "A",
    hints: ["What is the purpose of the second solvent?"],
    explanation: "The second run separates components that overlapped in the first.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What is the main process that separates the components in paper chromatography?",
    options: [
      ["partition between water in the paper and the moving solvent", "Correct: components distribute between the two liquid phases."],
      ["adsorption of the components onto the surface of a silica layer", "Adsorption onto silica is the main process in TLC, not paper."],
      ["sieving of large molecules by the paper fibres", "Separation is not by size in paper chromatography."],
      ["reaction of the components with the cellulose fibres", "No chemical reaction occurs."],
    ],
    answer: "A",
    explanation: "Paper: partition. TLC: mainly adsorption.",
  });
  {
    const r = rf(4.6, 7.2);
    b.num({
      d: 2, skill: "APPLICATION", calculator: true, daily: true,
      stem: "On a chromatogram the solvent front is 7.2 cm from the baseline and a spot is 4.6 cm from the baseline. Calculate the Rf value, to two decimal places.",
      value: r, dp: 2,
      wrong: [7.2 / 4.6],
      explanation: `Rf = 4.6 ÷ 7.2 = ${dpStr(r, 2)}. Inverting gives a value above 1, which is impossible.`,
    });
  }
  b.num({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: "A dye has Rf = 0.42 in a given solvent. The solvent front travels 8.5 cm from the baseline. Calculate the distance moved by the dye, in cm.",
    value: 0.42 * 8.5, sf: 3, unit: "cm",
    wrong: [8.5 / 0.42],
    explanation: `Distance = Rf × solvent front = 0.42 × 8.5 = ${sfStr(0.42 * 8.5, 3)} cm.`,
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A spot of Rf 0.30 is 2.4 cm from the baseline, but the student forgot to mark the solvent front. Calculate how far the solvent front was from the baseline, in cm.",
    value: 2.4 / 0.3, sf: 2, unit: "cm",
    wrong: [2.4 * 0.3],
    hints: ["Rearrange Rf = spot ÷ front."],
    explanation: `Front = spot ÷ Rf = 2.4 ÷ 0.30 = ${sfStr(2.4 / 0.3, 2)} cm.`,
  });
  b.calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: "Two components have Rf values of 0.62 and 0.48 in a solvent. A chromatogram is run until the solvent front is 10.0 cm from the baseline. Calculate the distance between the centres of the two spots, in cm.",
    value: (0.62 - 0.48) * 10, sf: 2, unit: "cm",
    wrong: [0.62 - 0.48],
    hints: ["Find each distance first."],
    explanation: `1. Distances: 0.62 × 10.0 = 6.2 cm and 0.48 × 10.0 = 4.8 cm.\n2. Separation = 6.2 − 4.8 = ${sfStr((0.62 - 0.48) * 10, 2)} cm.\n3. A longer run (larger solvent-front distance) increases the separation, which helps when spots are close.`,
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The solvent in the tank must be below the baseline when a chromatogram is started.",
    answer: true,
    explanation: "True. Otherwise the spots would dissolve into the solvent in the tank instead of being carried up the paper or plate.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "If an unknown substance has the same Rf value as aspirin in one solvent, it must be aspirin.",
    answer: false,
    explanation: "False. Different substances can have the same Rf in one solvent. Running with a second solvent, or using another technique, is needed to confirm.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term with its description.",
    pairs: [
      ["stationary phase", "the phase that does not move, such as silica on a plate"],
      ["mobile phase", "the solvent that carries the components"],
      ["solvent front", "the furthest point reached by the solvent"],
      ["locating agent", "a reagent that makes colourless spots visible"],
      ["eluent", "the solvent run through a chromatography column"],
    ],
    explanation: "Learn the vocabulary: stationary and mobile phases, solvent front, locating agent, eluent.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Complete the explanation of the Rf values on a silica TLC plate.",
    template: "Silica is {{blank:a}}, so compounds that can form {{blank:b}} with its surface are strongly {{blank:c}} and have low Rf values.",
    blanks: [
      { id: "a", accepted: ["polar"], choices: ["polar", "non-polar", "ionic"] },
      { id: "b", accepted: ["hydrogen bonds"], choices: ["hydrogen bonds", "covalent bonds", "ionic bonds"] },
      { id: "c", accepted: ["adsorbed"], choices: ["adsorbed", "dissolved", "repelled"] },
    ],
    hints: ["Silica's surface carries –OH groups."],
    explanation: "Polar silica adsorbs hydrogen-bonding compounds strongly, so they move little.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the type of chromatography in which a resin carrying charged groups separates ions by their charge.",
    accepted: ["ion-exchange chromatography", "ion exchange chromatography", "ion-exchange", "ion exchange"],
    wrong: ["column chromatography"],
    applies: ZIM,
    explanation: "Ion-exchange chromatography: ions are held by oppositely charged groups on the resin with different strengths.",
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 3,
    stem: "On a silica TLC plate run with a moderately polar solvent, 4-nitrophenol has a lower Rf than nitrobenzene. Explain this difference.",
    points: ["Silica is polar, with –OH groups on its surface", "4-nitrophenol has an –OH group that forms hydrogen bonds with the silica, so it is adsorbed more strongly", "It spends less time in the mobile phase and moves a shorter distance (nitrobenzene cannot donate a hydrogen bond)"],
    modelAnswer: "Silica is polar, with –OH groups at its surface. 4-nitrophenol has an –OH group that can hydrogen bond to these groups, so it is adsorbed more strongly than nitrobenzene, which cannot donate a hydrogen bond. 4-nitrophenol therefore spends more time on the stationary phase and travels less far, giving a lower Rf.",
    hints: ["Which compound can form hydrogen bonds with silica?"],
    explanation: "Link polarity and hydrogen bonding to adsorption and Rf.",
  });
  b.manualShort({
    d: 2, skill: "APPLICATION", marks: 4,
    stem: "Describe how you would use TLC to check whether a sample of a synthetic product is pure. Include how you would see colourless spots.",
    points: ["Pencil baseline; spot the product and a pure reference sample on it", "Place in a covered tank with solvent below the baseline; remove before the solvent reaches the top and mark the solvent front", "Locate spots under UV light (plate with fluorescent indicator) or with iodine vapour/a locating agent", "A single spot with the same Rf as the reference shows the product is pure; extra spots show impurities"],
    modelAnswer: "Draw a pencil baseline on a silica TLC plate and spot the product next to a pure reference sample. Stand the plate in a covered tank with the solvent below the baseline, let the solvent rise most of the way, then remove the plate and mark the solvent front. Dry it and view it under UV light (or expose it to iodine vapour) to see the spots. If the product gives a single spot at the same Rf as the reference, it is pure; any extra spots are impurities.",
    explanation: "Method, locating, and interpretation.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why the tank is covered while a chromatogram is developing.",
    points: ["Keeps the air inside saturated with solvent vapour", "So the solvent does not evaporate from the paper or plate as it rises, giving an even solvent front and reproducible Rf values"],
    modelAnswer: "Covering the tank saturates the air with solvent vapour, so solvent does not evaporate from the surface of the paper or plate; the solvent then rises evenly and the Rf values are reliable.",
    hints: ["What would happen to the solvent on the plate in open air?"],
    explanation: "Saturation prevents evaporation from the plate.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Farai tests a painkiller tablet bought from a market stall. He dissolves it in a solvent and runs a silica TLC plate alongside three reference compounds. The plate is viewed under ultraviolet light. Solvent front: 6.5 cm.\n\n| Sample | Distances moved by spots / cm |\n|---|---|\n| reference A | 4.2 |\n| reference B | 1.3 |\n| reference C | 2.6 |\n| tablet | 1.3 and 2.6 |`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the Rf value of reference A, to two decimal places.", value: rf(4.2, 6.5), dp: 2, wrong: [6.5 / 4.2], explanation: `4.2 ÷ 6.5 = ${dpStr(rf(4.2, 6.5), 2)}.` }),
      P.manual({ label: "(b)", marks: 2, stem: "What can Farai conclude about the composition of the tablet?", points: ["The tablet contains two components (two spots), with Rf values matching B and C", "It does not appear to contain A"], modelAnswer: "The tablet gives two spots at 1.3 cm and 2.6 cm, which match references B and C, so it probably contains B and C; there is no spot at the position of A, so A appears to be absent." }),
      P.manual({ label: "(c)", marks: 2, stem: "Suggest two ways Farai could make his conclusion more certain.", points: ["Repeat with a second, different solvent and check that the spots still match the references", "Use a co-spot (tablet mixed with reference) / a confirmatory technique such as GC-MS or melting point of separated components"], modelAnswer: "He could run the plate again with a different solvent to see whether the tablet spots still match B and C, and spot a mixture of the tablet with each reference to check that only one spot forms; a confirmatory technique such as GC-MS would also help." }),
      P.mcq({ label: "(d)", marks: 1, stem: "Why was the plate viewed under ultraviolet light?", options: [
        ["The colourless spots show up dark against the fluorescent plate.", "Correct: the plate contains a fluorescent indicator, and the compounds absorb UV."],
        ["UV light makes the solvent evaporate so that the plate dries faster.", "UV is used to see the spots, not to dry the plate."],
        ["UV light breaks the compounds into smaller fragments that are coloured.", "Viewing under UV does not decompose the spots."],
        ["UV light measures the solvent front automatically.", "The solvent front is marked with a pencil."],
      ], answer: "A", explanation: "UV visualises colourless compounds on plates containing a fluorescent indicator." }),
      P.manual({ label: "(e)", marks: 2, stem: "Compound B has the lowest Rf. Suggest what this tells you about B compared with A, and explain why.", points: ["B is more polar (e.g. has more –OH/–NH or –COOH groups able to hydrogen bond) than A", "So it is adsorbed more strongly on the polar silica and moves less"], modelAnswer: "B is probably more polar than A, with groups that can hydrogen bond to the silica surface, so it is adsorbed more strongly and spends less time moving with the solvent." }),
      P.manual({ label: "(f)", marks: 2, stem: "State two safety precautions for this experiment.", points: ["Organic solvents are flammable: no naked flames (or use a fume cupboard)", "Do not look directly at the UV lamp / wear UV-protective glasses (or wear eye protection and gloves)"], modelAnswer: "Keep the flammable solvent away from flames and work in a fume cupboard; do not look directly at the UV lamp and wear eye protection." }),
      P.num({ label: "(g)", marks: 2, stem: "On a repeat run in the same solvent, the solvent front reached 9.1 cm. Predict the distance moved by reference C, in cm, to two significant figures.", value: rf(2.6, 6.5) * 9.1, sf: 2, unit: "cm", wrong: [2.6], explanation: `Rf(C) = 2.6 ÷ 6.5 = ${dpStr(rf(2.6, 6.5), 2)}; distance = ${dpStr(rf(2.6, 6.5), 2)} × 9.1 = ${sfStr(rf(2.6, 6.5) * 9.1, 2)} cm.` }),
    ],
    hints: ["Rf = spot ÷ front.", "Same conditions, same Rf."],
    explanation: `Rf(A) = ${dpStr(rf(4.2, 6.5), 2)}; the tablet contains B and C but not A; confirm with a second solvent.`,
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: "A protein from groundnuts is hydrolysed and the amino acids separated by two-way paper chromatography. Solvent 1 (first run) front: 10.0 cm. Solvent 2 (second run, at 90°) front: 9.0 cm. Three amino acid spots are found.\n\n| Spot | Distance in solvent 1 / cm | Distance in solvent 2 / cm |\n|---|---|---|\n| 1 | 4.1 | 6.3 |\n| 2 | 4.0 | 2.7 |\n| 3 | 2.2 | 5.4 |",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name the type of reaction used to break the protein into amino acids.", accepted: ["hydrolysis", "acid hydrolysis", "acid-catalysed hydrolysis"], wrong: ["oxidation"], explanation: "Peptide links are hydrolysed (e.g. by heating with 6 mol dm⁻³ HCl)." }),
      P.group({ label: "(b)", stem: "Calculate the Rf values of spot 2, to two decimal places:", parts: [
        P.num({ label: "(i)", marks: 1, stem: "in solvent 1;", value: rf(4.0, 10.0), dp: 2, explanation: "4.0 ÷ 10.0 = 0.40." }),
        P.num({ label: "(ii)", marks: 1, stem: "in solvent 2.", value: rf(2.7, 9.0), dp: 2, wrong: [2.7 / 10], explanation: `2.7 ÷ 9.0 = ${dpStr(rf(2.7, 9.0), 2)}. Using the solvent 1 front gives 0.27.` }),
      ] }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why two-way chromatography was needed for spots 1 and 2.", points: ["Spots 1 and 2 have almost the same Rf in solvent 1 (0.41 and 0.40), so they would overlap after one run", "Their Rf values differ in solvent 2 (0.70 and 0.30), so the second run separates them"], modelAnswer: "In solvent 1 spots 1 and 2 travel almost the same distance and would appear as one spot. In solvent 2 their Rf values are very different, so the run at 90° separates them." }),
      P.mcq({ label: "(d)", marks: 1, stem: "How are the colourless amino acid spots located?", options: [
        ["spray with ninhydrin and warm", "Correct: amino acids give purple spots."],
        ["spray with bromine water", "Bromine water does not reveal amino acids."],
        ["view in bright sunlight", "The spots are colourless; a reagent is needed."],
        ["dip in sodium hydroxide solution", "Alkali does not make visible spots."],
      ], answer: "A", explanation: "Ninhydrin is the standard locating agent for amino acids." }),
      P.manual({ label: "(e)", marks: 1, stem: "Suggest how the amino acid in spot 3 could be identified.", points: ["Run pure reference amino acids under the same conditions (both solvents) and compare their positions/Rf values with spot 3"], modelAnswer: "Run known amino acids by the same two-way method and find the one whose spot appears at the same position (same Rf in both solvents) as spot 3." }),
    ],
    hints: ["Use the front of the solvent that produced each distance."],
    explanation: `Spot 2: Rf 0.40 (solvent 1) and ${dpStr(rf(2.7, 9.0), 2)} (solvent 2); spots 1 and 2 overlap in solvent 1 but separate in solvent 2.`,
  });
  b.card("FORMULA", "Rf value", "Rf = distance moved by spot ÷ distance moved by solvent front (from the baseline); 0 < Rf < 1, no units.");
  b.card("CONCEPT", "Partition vs adsorption", "Paper: partition between water in the paper and the solvent. TLC and columns: adsorption onto silica or alumina.");
  b.card("CONCEPT", "Polarity and Rf on silica", "Polar or hydrogen-bonding compounds are adsorbed strongly: low Rf. Non-polar compounds: high Rf.");
  b.card("FACT", "Locating agents", "Ninhydrin (amino acids, purple); UV light on fluorescent plates (dark spots); iodine vapour (brown spots).");
  b.card("FACT", "Good technique", "Pencil baseline; solvent below the baseline; covered tank; mark the solvent front at once.");
  b.card("CONCEPT", "Identifying with Rf", "Match Rf with a reference run on the same plate; confirm with a second solvent.");
  b.card("CONCEPT", "Two-way chromatography", "Run in one solvent, turn 90°, run in a second solvent: separates spots that overlap in the first.");
  b.card("CONCEPT", "Column chromatography", "Silica or alumina packed in a column; liquid eluent; components collected as separate fractions.");
  b.card("FACT", "Ion-exchange chromatography", "A charged resin holds ions of opposite charge with different strengths; separates by charge.", undefined, { applies: ZIM });
});
