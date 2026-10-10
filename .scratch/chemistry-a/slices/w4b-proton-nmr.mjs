// W4b: achem.analysis.proton-nmr (Cambridge only, A Level 37.4)
import { concept, P, t, ce, CAM } from "../lib.mjs";

const DATA1H = "Data, δ / ppm: alkane H 0.9-1.7; alkyl H next to C=O 2.2-3.0; alkyl H next to aromatic ring 2.3-3.0; alkyl H next to electronegative atom (O, Cl) 3.2-4.0; H on alkene 4.5-6.0; H on aromatic ring 6.0-9.0; aldehyde H 9.3-10.5; alcohol O–H 0.5-6.0; phenol O–H 4.5-7.0; carboxylic acid O–H 9.0-13.0; alkyl amine N–H 1.0-5.0.";

concept("achem.analysis.proton-nmr", { file: "analysis/proton-nmr", keyPrefix: "analysis.proton-nmr", applies: CAM }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Why is a proton NMR spectrum usually run in CDCl₃ rather than CHCl₃?",
    options: [
      ["Deuterium gives no signal, so the solvent does not swamp the spectrum.", "Correct: a protonated solvent would swamp the spectrum."],
      ["CDCl₃ reacts with O–H groups in the sample, so they can be identified.", "That is the role of D₂O exchange, not of the solvent."],
      ["CDCl₃ provides the reference signal at δ = 0.", "The reference is TMS, Si(CH₃)₄."],
      ["CDCl₃ dissolves samples that CHCl₃ cannot dissolve.", "Their solvent properties are almost identical; the point is the missing H signal."],
    ],
    answer: "A",
    explanation: "Deuterated solvents contain ²H instead of ¹H, so they give no peak in a proton spectrum.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "In the proton NMR spectrum of chloroethane, CH₃CH₂Cl, how is the CH₃ signal split?",
    options: [
      ["a triplet", "Correct: two H on the adjacent CH₂ give 2 + 1 = 3 lines."],
      ["a quartet", "A quartet would need three H on the adjacent carbon: that is the CH₂ signal."],
      ["a doublet", "A doublet would need one adjacent H."],
      ["a singlet", "The CH₃ group has two neighbouring H atoms, so it is split."],
    ],
    answer: "A",
    explanation: "n + 1 rule: CH₃ next to CH₂ (n = 2) → triplet; CH₂ next to CH₃ (n = 3) → quartet.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A sample of ethanoic acid is shaken with D₂O and its proton NMR spectrum is run again. Which signal disappears?",
    options: [
      ["the –COOH signal at about δ 11", "Correct: the acidic H exchanges with D, which gives no proton signal."],
      ["the CH₃ signal at about δ 2.2", "C–H hydrogens do not exchange with D₂O."],
      ["the TMS signal at δ 0", "TMS has no exchangeable hydrogens."],
      ["none, because no hydrogen atom exchanges", "O–H hydrogens exchange readily with D₂O."],
    ],
    answer: "A",
    explanation: "CH₃COOH + D₂O ⇌ CH₃COOD + HDO: the O–H signal vanishes.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which statements about the proton NMR spectrum of 2-chloropropane, (CH₃)₂CHCl, are correct?\n\n1. There are two signals.\n2. One signal is a doublet with relative area 6.\n3. The CH signal is a quartet.",
    options: [
      ["1 and 2 only", "Correct: the six CH₃ protons are split by the single CH; the CH has six neighbours (a multiplet)."],
      ["1, 2 and 3", "Statement 3 is false: the CH has six adjacent H, giving seven lines, not four."],
      ["2 and 3 only", "Statement 1 is true and statement 3 is false."],
      ["1 only", "Statement 2 is also true."],
    ],
    answer: "A",
    hints: ["Count the H atoms on the carbons adjacent to the CH."],
    explanation: "Two environments: 6H doublet (CH₃, n = 1) and 1H multiplet (CH, n = 6).",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: `Which statements about the proton NMR spectrum of ethanal, CH₃CHO, are correct?\n\n1. There are two signals, with relative areas 3 : 1.\n2. The aldehyde H signal is a quartet.\n3. The CH₃ signal is a doublet.\n\n${DATA1H}`,
    options: [
      ["1, 2 and 3", "Correct: the CHO proton has three neighbours (quartet); the CH₃ has one neighbour (doublet)."],
      ["1 and 2 only", "Statement 3 is also true."],
      ["1 and 3 only", "Statement 2 is also true."],
      ["1 only", "Statements 2 and 3 are also true."],
    ],
    answer: "A",
    hints: ["Apply the n + 1 rule to each group."],
    explanation: "CH₃ (3H, doublet, 2.2-3.0) and CHO (1H, quartet, 9.3-10.5).",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: `An alcohol, C₄H₁₀O, has a proton NMR spectrum with two singlets: δ 1.3 (relative area 9) and δ 2.0 (relative area 1). The second signal disappears on shaking with D₂O. What is the alcohol?\n\n${DATA1H}`,
    options: [
      ["2-methylpropan-2-ol, (CH₃)₃COH", "Correct: nine equivalent CH₃ protons with no H on the adjacent carbon, plus an O–H."],
      ["butan-1-ol, CH₃CH₂CH₂CH₂OH", "This would show five signals with splitting."],
      ["butan-2-ol, CH₃CH(OH)CH₂CH₃", "This would show five signals, several split."],
      ["2-methylpropan-1-ol, (CH₃)₂CHCH₂OH", "This would show a 6H doublet, a multiplet and a 2H doublet, as well as O–H."],
    ],
    answer: "A",
    hints: ["Nine equivalent H with no splitting."],
    explanation: "(CH₃)₃C– gives a 9H singlet (the central C has no H); the O–H singlet disappears with D₂O.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: `Compound M, C₃H₆O₂, gives these proton NMR signals: δ 1.2 (3H, triplet), δ 2.4 (2H, quartet), δ 11.8 (1H, singlet, disappears with D₂O). What is M?\n\n${DATA1H}`,
    options: [
      ["propanoic acid, CH₃CH₂COOH", "Correct: ethyl group next to C=O, plus a carboxylic acid O–H."],
      ["methyl ethanoate, CH₃COOCH₃", "This would give two 3H singlets and no exchangeable H."],
      ["ethyl methanoate, HCOOCH₂CH₃", "No D₂O-exchangeable H; its O–CH₂ quartet would appear above 3.2."],
      ["3-hydroxypropanal, HOCH₂CH₂CHO", "This would show an aldehyde signal at 9.3-10.5 and two CH₂ signals."],
    ],
    answer: "A",
    hints: ["Which signal is an acid O–H?"],
    explanation: "δ 11.8 exchangeable: COOH; quartet + triplet: CH₂CH₃ next to C=O (2.4). M is propanoic acid.",
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "How many signals are there in the proton NMR spectrum of propanone, CH₃COCH₃?",
    value: 1,
    wrong: [2],
    explanation: "All six H atoms are equivalent: one singlet.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "How many signals are there in the proton NMR spectrum of butanone, CH₃COCH₂CH₃?",
    value: 3,
    wrong: [4],
    explanation: "CH₃CO (singlet), CH₂ (quartet) and CH₂CH₃ (triplet): three environments.",
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "How many lines does the CH₂Cl signal of 1-chloropropane, CH₃CH₂CH₂Cl, have?",
    value: 3,
    wrong: [6, 4],
    hints: ["Count the H on the adjacent carbon only."],
    explanation: "The adjacent carbon is the middle CH₂ (n = 2), so the CH₂Cl signal is a triplet.",
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "Pentan-3-one, C₅H₁₀O, gives two proton NMR signals with relative areas 1.5 : 1, in order of increasing δ. How many hydrogen atoms does the signal at higher δ represent?",
    value: 4,
    wrong: [1],
    hints: ["Scale the ratio so the areas add up to 10."],
    explanation: "1.5x + x = 10 H, so x = 4: the ratio is 6 : 4. The 4H signal (a quartet near 2.4 ppm) is the two equivalent CH₂ groups next to C=O; the 6H triplet is the two CH₃ groups.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In the spectrum of ethanol, the CH₂ signal is split into a quartet by the CH₃ group and is not further split by the O–H proton.",
    answer: true,
    explanation: "True. The O–H proton exchanges rapidly between molecules, so it does not split the CH₂ signal.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Protons in the same environment split each other's signal.",
    answer: false,
    explanation: "False. Equivalent protons do not split each other; splitting comes from non-equivalent protons on the adjacent carbon.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    stem: "Match each group of protons (in bold) to its splitting pattern.",
    pairs: [
      ["**CH₃**–CH₂– in an ethyl group", "triplet"],
      ["CH₃–**CH₂**– in an ethyl group", "quartet"],
      ["(**CH₃**)₂CH– in an isopropyl group", "doublet"],
      ["**CH₃**–CO– in a methyl ketone", "singlet"],
    ],
    hints: ["n + 1, where n is the number of H on the adjacent carbon."],
    explanation: "Ethyl: CH₃ triplet, CH₂ quartet. Isopropyl CH₃: doublet. CH₃CO: no H on the carbonyl carbon, so a singlet.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences about proton NMR.",
    template: "The relative {{blank:a}} of the signals gives the relative numbers of protons in each environment. A signal split into four lines is a {{blank:b}}, showing {{blank:c}} protons on the adjacent carbon.",
    blanks: [
      { id: "a", accepted: ["areas"], choices: ["areas", "chemical shifts", "widths"] },
      { id: "b", accepted: ["quartet"], choices: ["quartet", "triplet", "doublet"] },
      { id: "c", accepted: ["three"], choices: ["three", "four", "two"] },
    ],
    explanation: "Integration gives proton ratios; n + 1 = 4 means n = 3.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the compound added to a sample to identify O–H and N–H signals in a proton NMR spectrum.",
    accepted: ["D2O", "D₂O", "deuterium oxide", "heavy water"],
    wrong: ["CDCl3"],
    explanation: "Shaking with D₂O exchanges O–H and N–H hydrogens for deuterium; their signals disappear.",
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe and explain how D₂O is used to identify the O–H signal in the proton NMR spectrum of an alcohol.",
    points: ["Record the spectrum, then shake the sample with D₂O and record it again", "The O–H hydrogen exchanges with deuterium: ROH + D₂O ⇌ ROD + HDO", "Deuterium does not absorb in the proton region, so the O–H signal disappears (identifying it)"],
    modelAnswer: "The spectrum is run, the sample is shaken with a little D₂O, and the spectrum is run again. The labile O–H hydrogen exchanges with deuterium (ROH + D₂O ⇌ ROD + HDO). Because deuterium gives no signal in a proton spectrum, the signal that has disappeared is the O–H signal.",
    hints: ["Which hydrogens are labile?"],
    explanation: "Exchange, then disappearance of the signal.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: `Predict the proton NMR spectrum of propanal, CH₃CH₂CHO: for each signal give the δ range, relative area and splitting.\n\n${DATA1H}`,
    points: ["CH₃: δ 0.9-1.7, 3H, triplet (next to CH₂)", "CH₂: δ 2.2-3.0 (next to C=O), 2H, multiplet (split by CH₃ and CHO; accept quartet of doublets or multiplet)", "CHO: δ 9.3-10.5, 1H, triplet (next to CH₂)", "Three signals in the ratio 3 : 2 : 1"],
    modelAnswer: "Three signals with areas 3 : 2 : 1. CH₃ at 0.9-1.7 ppm, a triplet (two adjacent H). CH₂ at 2.2-3.0 ppm (next to C=O), split by both the CH₃ and the CHO protons, so a multiplet. CHO at 9.3-10.5 ppm, a triplet (two adjacent H).",
    hints: ["The CH₂ has neighbours on both sides."],
    explanation: "Shift, area and splitting for each environment.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why the proton NMR signal of the CH₃ group in methyl ethanoate, CH₃COOCH₃, next to the C=O is a singlet.",
    points: ["The adjacent carbon is the C=O carbon, which has no hydrogen atoms (n = 0)", "So by the n + 1 rule the signal has one line (the OCH₃ protons are too far away to split it)"],
    modelAnswer: "The carbon next to this CH₃ group is the carbonyl carbon, which carries no hydrogens, so n = 0 and the signal is a singlet; the OCH₃ protons are separated by the O and C=O and do not split it.",
    hints: ["Count the H on the adjacent carbon."],
    explanation: "No neighbours, no splitting.",
  });
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true,
    stem: `Compound N, C₈H₁₀, is an aromatic hydrocarbon. Its proton NMR spectrum is summarised below.\n\n| δ / ppm | relative area | splitting |\n|---|---|---|\n| 1.2 | 3 | triplet |\n| 2.6 | 2 | quartet |\n| 7.2 | 5 | multiplet |\n\n${DATA1H}`,
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "What does the signal at δ 7.2 with relative area 5 tell you about N?", accepted: ["five aromatic protons", "monosubstituted benzene ring", "C6H5 group", "C₆H₅", "a phenyl group", "5 H on a benzene ring", "phenyl"], wrong: ["an alkene"], explanation: "Five H on an aromatic ring: a C₆H₅– group (monosubstituted benzene)." }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain what the signals at δ 1.2 and δ 2.6 show.", points: ["Triplet (3H) and quartet (2H) together show an ethyl group, CH₂CH₃", "The CH₂ at 2.6 is next to the aromatic ring (alkyl next to aromatic ring 2.3-3.0)"], modelAnswer: "A 3H triplet and a 2H quartet are the signature of an ethyl group: the CH₃ is split by the CH₂ and vice versa. The CH₂ appears at 2.6 ppm, in the range for alkyl H next to an aromatic ring, so the ethyl group is attached to the ring." }),
      P.short({ label: "(c)", marks: 1, stem: "Name N.", accepted: ["ethylbenzene", "ethyl benzene", "phenylethane"], wrong: ["1,4-dimethylbenzene"], explanation: "C₆H₅CH₂CH₃, ethylbenzene." }),
      P.mcq({ label: "(d)", marks: 1, stem: "An isomer of N, 1,4-dimethylbenzene, CH₃C₆H₄CH₃, would give which spectrum?", options: [
        ["two singlets, relative areas 6 : 4", "Correct: six equivalent CH₃ H and four equivalent ring H, with no adjacent H to split them."],
        ["a triplet, a quartet and a multiplet, areas 3 : 2 : 5", "That is the ethylbenzene spectrum."],
        ["two doublets, relative areas 6 : 4", "The CH₃ groups are attached to ring carbons that bear no H, so they are not split."],
        ["three singlets, relative areas 3 : 3 : 4", "The two CH₃ groups are equivalent by symmetry."],
      ], answer: "A", explanation: "Symmetry gives just two environments, both singlets." }),
      P.num({ label: "(e)", marks: 1, stem: "How many peaks would the carbon-13 NMR spectrum of N show?", value: 6, wrong: [8], explanation: "CH₃, CH₂, ring C attached to the chain, ortho (2), meta (2), para: six environments." }),
      P.manual({ label: "(f)", marks: 2, stem: "State the purpose of adding TMS to the sample and why TMS is suitable.", points: ["TMS is the reference: its signal is defined as δ = 0", "It gives a single strong peak (12 equivalent H) away from other signals, and is inert and volatile"], modelAnswer: "TMS provides the reference signal at δ = 0 against which all shifts are measured. Its twelve equivalent hydrogens give one sharp peak, upfield of almost all others, and it is inert and volatile." }),
    ],
    hints: ["Quartet + triplet = ethyl group.", "Area 5 at 6-9 ppm = C₆H₅–."],
    explanation: "N is ethylbenzene, C₆H₅CH₂CH₃; 1,4-dimethylbenzene would give two singlets.",
  });
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true,
    stem: `Compound P, C₄H₈O, shows a strong IR absorption at 1715 cm⁻¹ and no broad absorption above 3000 cm⁻¹. Its proton NMR spectrum:\n\n| δ / ppm | relative area | splitting |\n|---|---|---|\n| 1.1 | 3 | triplet |\n| 2.2 | 3 | singlet |\n| 2.5 | 2 | quartet |\n\n${DATA1H}`,
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What do the IR data show?", points: ["1715 cm⁻¹: C=O (aldehyde or ketone)", "No broad O–H absorption: not an alcohol or acid"], modelAnswer: "The strong 1715 cm⁻¹ absorption is a C=O bond, and the absence of a broad band above 3000 cm⁻¹ shows there is no O–H, so P is an aldehyde or ketone." }),
      P.manual({ label: "(b)", marks: 3, stem: "Explain how each NMR signal fits your structure.", points: ["δ 2.2, 3H singlet: CH₃ next to C=O with no H on the adjacent carbon (CH₃CO–)", "δ 2.5, 2H quartet: CH₂ next to C=O, split by a CH₃", "δ 1.1, 3H triplet: CH₃ split by the CH₂ (ethyl group)"], modelAnswer: "The 3H singlet at 2.2 ppm is a CH₃ attached to the carbonyl carbon, which has no H, so it is not split. The 2H quartet at 2.5 ppm is a CH₂ next to C=O and next to a CH₃. The 3H triplet at 1.1 ppm is that CH₃, split by the CH₂." }),
      P.short({ label: "(c)", marks: 1, stem: "Name P.", accepted: ["butanone", "butan-2-one", "2-butanone", "methyl ethyl ketone"], wrong: ["butanal"], explanation: "CH₃COCH₂CH₃." }),
      P.manual({ label: "(d)", marks: 2, stem: "Butanal, CH₃CH₂CH₂CHO, is an isomer of P. Give two differences between its proton NMR spectrum and that of P.", points: ["Butanal shows an aldehyde H signal at 9.3-10.5 ppm (absent in P)", "Butanal has four signals (not three) / no 3H singlet (its CH₃ is a triplet)"], modelAnswer: "Butanal shows a 1H signal at 9.3-10.5 ppm from the CHO proton, which P lacks; it has four signals instead of three, and no 3H singlet, because its CH₃ is a triplet at the end of a propyl chain." }),
      P.manual({ label: "(e)", marks: 1, stem: "State what would happen to the spectrum of P if it were shaken with D₂O, and why.", points: ["No change, because P has no O–H or N–H hydrogens to exchange"], modelAnswer: "Nothing would change: P has no O–H or N–H protons, and C–H hydrogens do not exchange with D₂O." }),
      P.num({ label: "(f)", marks: 1, stem: "How many peaks would the carbon-13 NMR spectrum of P show?", value: 4, wrong: [3], explanation: "Four different carbons." }),
      P.manual({ label: "(g)", marks: 2, stem: "Explain why proton NMR spectra are run in CDCl₃ and why P's CH₂ signal is a quartet rather than a doublet.", points: ["CDCl₃ contains deuterium, which gives no signal in the proton spectrum, so the solvent does not swamp the sample's signals", "The CH₂ is next to a CH₃ (3 H) and next to C=O (no H), so n = 3 and it has 4 lines"], modelAnswer: "In CDCl₃ the solvent's hydrogen is deuterium, which does not absorb in the proton region, so the solvent gives no large peak. The CH₂ group has three H on the adjacent CH₃ and none on the carbonyl carbon, so n = 3 and the signal is a quartet." }),
    ],
    hints: ["A 3H singlet near 2.2 ppm suggests CH₃CO–."],
    explanation: "P is butanone: CH₃CO (2.2, s, 3H), CH₂ (2.5, q, 2H), CH₃ (1.1, t, 3H).",
  });
  b.card("CONCEPT", "Four clues in proton NMR", "Number of signals (environments), δ (type), relative area (number of H), splitting (H on adjacent carbon).");
  b.card("FORMULA", "n + 1 rule", "n equivalent H on the adjacent carbon split a signal into n + 1 lines: singlet, doublet, triplet, quartet; more = multiplet.");
  b.card("FACT", "Ethyl group pattern", "–CH₂CH₃: CH₂ quartet (2H) + CH₃ triplet (3H).");
  b.card("FACT", "Isopropyl group pattern", "–CH(CH₃)₂: 6H doublet + 1H multiplet.");
  b.card("FACT", "D₂O exchange", "Shaking with D₂O replaces O–H and N–H hydrogens with D: those signals disappear.");
  b.card("FACT", "Deuterated solvents", "CDCl₃ is used because deuterium gives no signal in a proton NMR spectrum.");
  b.card("FACT", "Key proton shifts", "Alkyl 0.9-1.7; next to C=O 2.2-3.0; next to O or Cl 3.2-4.0; aromatic 6.0-9.0; CHO 9.3-10.5; COOH 9.0-13.0 ppm.");
  b.card("CONCEPT", "O–H protons", "Usually singlets that do not split neighbours (rapid exchange); shift varies with solvent and concentration.");
  b.card("FACT", "TMS in proton NMR", "Si(CH₃)₄: 12 equivalent H give one sharp signal at δ = 0.");
});
