// W4b: achem.analysis.carbon-13-nmr (Cambridge only, A Level 37.3)
import { concept, P, t, ce, CAM } from "../lib.mjs";

const DATA13 = "Data, δ / ppm: alkyl C 0-50; C next to alkene/arene 25-50; C next to carbonyl/carboxyl 30-65; C next to halogen 30-60; C next to oxygen 50-70; alkene/arene C 110-160; carboxyl C (acids, esters) 160-185; carbonyl C (aldehydes, ketones) 190-220; nitrile C 100-125.";

concept("achem.analysis.carbon-13-nmr", { file: "analysis/carbon-13-nmr", keyPrefix: "analysis.carbon-13-nmr", applies: CAM }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which compound is used as the reference standard, δ = 0, in NMR spectroscopy?",
    options: [
      ["tetramethylsilane, Si(CH₃)₄", "Correct: TMS gives a single sharp peak defined as δ = 0."],
      ["deuterated trichloromethane, CDCl₃", "CDCl₃ is the usual solvent, not the reference."],
      ["tetrachloromethane, CCl₄", "CCl₄ has been used as a solvent; it is not the reference."],
      ["benzene, C₆H₆", "Benzene's peaks are far from δ = 0; it is not the reference."],
    ],
    answer: "A",
    explanation: "TMS: all its C (and H) are equivalent, it is inert and volatile, and its peak is at lower δ than almost all organic peaks.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "How many peaks are in the carbon-13 NMR spectrum of 2-chloropropane, CH₃CHClCH₃?",
    options: [
      ["2", "Correct: the two CH₃ carbons are equivalent; the CHCl carbon is different."],
      ["3", "There are three carbons, but two of them are equivalent by symmetry."],
      ["1", "The CHCl carbon is in a different environment from the CH₃ carbons."],
      ["4", "Only carbon environments count; Cl does not give a carbon-13 peak."],
    ],
    answer: "A",
    explanation: "Symmetry makes C1 and C3 equivalent: two environments, two peaks.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: `A carbon-13 NMR spectrum has a peak at δ 205. Which type of carbon is present?\n\n${DATA13}`,
    options: [
      ["the carbonyl carbon of an aldehyde or ketone", "Correct: 190-220 ppm."],
      ["the carboxyl carbon of an ester or carboxylic acid", "Acids and esters appear at 160-185 ppm."],
      ["a carbon atom in a benzene ring", "Arene carbons appear at 110-160 ppm."],
      ["a carbon atom bonded to an –OH group", "C–O carbons appear at 50-70 ppm."],
    ],
    answer: "A",
    explanation: "Peaks above 190 ppm are characteristic of aldehyde and ketone C=O.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which isomer of C₅H₁₂ gives only two peaks in its carbon-13 NMR spectrum?",
    options: [
      ["2,2-dimethylpropane, C(CH₃)₄", "Correct: four equivalent CH₃ carbons and one central carbon."],
      ["pentane, CH₃CH₂CH₂CH₂CH₃", "Pentane has three environments (C1/C5, C2/C4, C3)."],
      ["2-methylbutane, (CH₃)₂CHCH₂CH₃", "This has four environments."],
      ["cyclopentane, C₅H₁₀", "Cyclopentane has one peak, and its formula is C₅H₁₀, not C₅H₁₂."],
    ],
    answer: "A",
    hints: ["Look for the most symmetrical isomer."],
    explanation: "C(CH₃)₄: one quaternary carbon plus four equivalent methyl carbons = 2 peaks.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements about carbon-13 NMR spectra are correct?\n\n1. The reference compound TMS is given δ = 0.\n2. Carbon-12 atoms do not give a signal.\n3. The height of each peak is proportional to the number of carbon atoms in that environment.",
    options: [
      ["1 and 2 only", "Correct: statement 3 is false for the carbon-13 spectra used at this level."],
      ["1, 2 and 3", "Peak heights in carbon-13 spectra are not used to count carbons."],
      ["2 and 3 only", "Statement 1 is true and statement 3 is false."],
      ["1 only", "Statement 2 is also true: only ¹³C has the nuclear spin needed."],
    ],
    answer: "A",
    hints: ["Which isotope of carbon is detected?"],
    explanation: "TMS defines δ = 0; ¹²C is NMR-inactive; carbon-13 peak heights are not proportional to the number of carbons.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: `The carbon-13 spectrum of compound E, C₃H₆O₂, has peaks at δ 171, 52 and 21. Which statements are correct?\n\n1. E has three different carbon environments.\n2. One carbon is the C=O carbon of an acid or ester.\n3. One sp³ carbon is bonded directly to an oxygen atom.\n\n${DATA13}`,
    options: [
      ["1, 2 and 3", "Correct: 171 is carboxyl C, 52 is C–O, 21 is alkyl: methyl ethanoate, CH₃COOCH₃."],
      ["1 and 2 only", "Statement 3 is also true: δ 52 lies in the C–O range (50-70)."],
      ["2 and 3 only", "Statement 1 is also true: three peaks, three environments."],
      ["1 only", "Statements 2 and 3 are also true."],
    ],
    answer: "A",
    hints: ["Assign each peak with the data table."],
    explanation: "Three peaks; 171 (ester C=O), 52 (O–CH₃), 21 (CH₃–C=O): methyl ethanoate.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which compound gives four peaks in its carbon-13 NMR spectrum?",
    options: [
      ["butanone, CH₃COCH₂CH₃", "Correct: all four carbons are in different environments."],
      ["propanone, CH₃COCH₃", "Propanone has two environments."],
      ["pentan-3-one, CH₃CH₂COCH₂CH₃", "Symmetry gives three environments."],
      ["butane, CH₃CH₂CH₂CH₃", "Butane has two environments."],
    ],
    answer: "A",
    hints: ["Look for carbons that are equivalent by symmetry."],
    explanation: "Butanone lacks symmetry: four different carbons.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: `Compound F, C₃H₆O, gives three carbon-13 peaks, at δ 202, 37 and 6. Which is F?\n\n${DATA13}`,
    options: [
      ["propanal, CH₃CH₂CHO", "Correct: three environments; 202 is an aldehyde C=O."],
      ["propanone, CH₃COCH₃", "Propanone would give only two peaks."],
      ["prop-2-en-1-ol, CH₂=CHCH₂OH", "This would show two alkene peaks (110-160) and a C–O peak, with nothing above 190."],
      ["methoxyethene, CH₃OCH=CH₂", "This has no C=O, so no peak above 190 ppm."],
    ],
    answer: "A",
    hints: ["Count the peaks, then look for a C=O."],
    explanation: "Three peaks with a carbonyl at 202: propanal.",
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "How many peaks are in the carbon-13 NMR spectrum of ethyl ethanoate, CH₃COOCH₂CH₃?",
    value: 4,
    wrong: [3],
    explanation: "CH₃ (acyl), C=O, OCH₂ and CH₃ (ethyl): four different environments.",
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "How many peaks are in the carbon-13 NMR spectrum of pentan-2-one, CH₃COCH₂CH₂CH₃?",
    value: 5,
    wrong: [3],
    hints: ["Is there any symmetry?"],
    explanation: "No two carbons are equivalent: five peaks.",
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "How many peaks are in the carbon-13 NMR spectrum of 1,3,5-trimethylbenzene, C₆H₃(CH₃)₃?",
    value: 3,
    wrong: [9, 2],
    hints: ["The molecule has threefold symmetry."],
    explanation: "Three equivalent CH₃; three equivalent ring C bearing CH₃; three equivalent ring CH: three peaks.",
  });
  b.num({
    d: 3, skill: "APPLICATION", daily: true,
    stem: "How many peaks are in the carbon-13 NMR spectrum of cyclohexanone, a six-membered ring containing one C=O group?",
    value: 4,
    wrong: [6],
    hints: ["Draw a mirror line through the C=O group."],
    explanation: "C=O (C1); C2 and C6; C3 and C5; C4: four environments.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A carbon atom bonded to an oxygen atom appears at a higher chemical shift than a carbon in a simple alkyl chain.",
    answer: true,
    explanation: "True. Oxygen withdraws electron density, deshielding the carbon (C–O 50-70 ppm vs alkyl 0-50).",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Propan-1-ol and propan-2-ol give the same number of peaks in their carbon-13 NMR spectra.",
    answer: false,
    explanation: "False. Propan-1-ol has three environments (3 peaks); propan-2-ol has two (2 peaks).",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each chemical shift with the type of carbon most likely responsible.",
    pairs: [
      ["δ 15", "CH₃ in an alkyl chain"],
      ["δ 62", "CH₂ bonded to –OH"],
      ["δ 128", "carbon in a benzene ring"],
      ["δ 178", "C=O of a carboxylic acid"],
      ["δ 200", "C=O of an aldehyde"],
    ],
    hints: ["Use the data-booklet ranges."],
    explanation: "Alkyl 0-50; C–O 50-70; arene 110-160; carboxyl 160-185; aldehyde or ketone 190-220.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences about carbon-13 NMR.",
    template: "Each different carbon {{blank:a}} gives one peak. The positions of peaks are measured as the chemical shift, δ, in {{blank:b}}, relative to TMS. Carbons near electronegative atoms appear at {{blank:c}} δ values.",
    blanks: [
      { id: "a", accepted: ["environment"], choices: ["environment", "atom", "isotope"] },
      { id: "b", accepted: ["ppm"], choices: ["ppm", "cm⁻¹", "m/e"] },
      { id: "c", accepted: ["higher"], choices: ["higher", "lower"] },
    ],
    explanation: "Environments, ppm, and deshielding by electronegative atoms (higher δ).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the formula of the compound used as the reference standard in NMR spectroscopy.",
    accepted: ["Si(CH3)4", "Si(CH₃)₄", "(CH3)4Si", "(CH₃)₄Si", "TMS", "tetramethylsilane", "SiC4H12"],
    normalise: ["trim", "collapse_whitespace"],
    wrong: ["CDCl3"],
    explanation: "Tetramethylsilane, Si(CH₃)₄.",
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why TMS is chosen as the reference standard for NMR spectroscopy.",
    points: ["All its carbon (and hydrogen) atoms are equivalent, so it gives a single, sharp peak (defined as δ = 0)", "Its nuclei are highly shielded, so its peak is at lower δ than almost all organic peaks and does not overlap with them", "It is chemically inert and volatile (easily removed from the sample afterwards)"],
    modelAnswer: "TMS, Si(CH₃)₄, has four equivalent carbons and twelve equivalent hydrogens, so it gives one sharp peak, defined as δ = 0. Its nuclei are strongly shielded, so this peak lies clear of almost all other peaks. It is also inert, so it does not react with the sample, and volatile, so it can be removed easily.",
    hints: ["Think about the number of environments in TMS and its reactivity."],
    explanation: "One peak, out of the way, unreactive, volatile.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 3,
    stem: "Describe how carbon-13 NMR could distinguish between butan-1-ol, butan-2-ol and 2-methylpropan-1-ol.",
    points: ["Butan-1-ol: four peaks (all carbons different)", "Butan-2-ol: four peaks, but only one C–O peak (50-70) belongs to a CH carbon rather than CH₂; and 2-methylpropan-1-ol: three peaks (two equivalent CH₃)", "So 2-methylpropan-1-ol is identified by its three peaks; butan-1-ol and butan-2-ol both give four, so they are distinguished by shifts or by another technique (e.g. proton NMR splitting)"],
    modelAnswer: "Butan-1-ol and butan-2-ol each have four different carbon environments, so each gives four peaks; 2-methylpropan-1-ol has two equivalent methyl carbons, so it gives only three peaks and is identified at once. The two straight-chain alcohols must then be told apart by the exact shifts (for example the alkyl peaks differ) or by proton NMR, where the splitting patterns differ.",
    hints: ["Count the environments in each."],
    explanation: "Counting peaks separates one isomer; shifts or proton NMR separate the others.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why the carbon of a C=O group has a much higher chemical shift than the carbon of a CH₃ group.",
    points: ["Oxygen is very electronegative and the C=O π bond draws electron density away from the carbon", "So the carbonyl carbon is deshielded (less shielded from the applied field) and absorbs at a higher δ"],
    modelAnswer: "In a C=O group the oxygen pulls electron density away from the carbon through both the σ and π bonds, so the carbon is strongly deshielded and resonates at a much higher δ (160-220 ppm) than a CH₃ carbon, which is surrounded by more electron density.",
    hints: ["Shielding depends on the electron density around the nucleus."],
    explanation: "Deshielding by electronegative atoms and π bonds.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Compound G, C₄H₈O₂, is a neutral liquid. Its carbon-13 NMR spectrum is described below.\n\n| δ / ppm | 174 | 52 | 27 | 9 |\n|---|---|---|---|---|\n\nAnother isomer, H, is a carboxylic acid.\n\n${DATA13}`,
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Identify the type of carbon responsible for the peak at δ 174.", accepted: ["ester C=O", "carboxyl carbon", "C=O of an ester", "ester carbonyl", "carboxyl", "C=O of an acid or ester", "COO"], wrong: ["ketone C=O"], explanation: "160-185 ppm: carboxyl carbon of an acid or ester; G is neutral, so an ester." }),
      P.short({ label: "(b)", marks: 1, stem: "Identify the type of carbon responsible for the peak at δ 52.", accepted: ["C–O", "C-O", "carbon bonded to oxygen", "CH2–O", "CH2-O", "O-CH2", "carbon next to oxygen"], wrong: ["C=O"], explanation: "50-70 ppm: an sp³ carbon bonded to oxygen." }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which isomer of C₄H₈O₂ would give only three peaks in its carbon-13 spectrum?", options: [
        ["HCOOCH(CH₃)₂", "Correct: 1-methylethyl methanoate; the two CH₃ groups are equivalent, so there are three environments."],
        ["CH₃CH₂COOCH₃", "Methyl propanoate: all four carbons are different, four peaks."],
        ["CH₃COOCH₂CH₃", "Ethyl ethanoate: all four carbons are different, four peaks."],
        ["CH₃CH₂CH₂COOH", "Butanoic acid: all four carbons are different, four peaks."],
      ], answer: "A", explanation: "Only the branched ester has two equivalent methyl carbons." }),
      P.num({ label: "(d)", marks: 1, stem: "How many peaks would the carbon-13 spectrum of the carboxylic acid H, 2-methylpropanoic acid, (CH₃)₂CHCOOH, show?", value: 3, wrong: [4], explanation: "Two equivalent CH₃, one CH, one COOH: three peaks." }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain how the IR spectrum of H would differ from that of G.", points: ["H shows a very broad O–H absorption at 2500-3000 cm⁻¹", "G (an ester) has no O–H absorption; both show C=O (about 1700-1750 cm⁻¹)"], modelAnswer: "H, a carboxylic acid, shows a very broad carboxyl O–H absorption between 2500 and 3000 cm⁻¹, which is absent from the spectrum of the ester G; both show a strong C=O absorption." }),
      P.manual({ label: "(f)", marks: 2, stem: "Give the number of peaks you would expect for butanoic acid and explain how this distinguishes it from 2-methylpropanoic acid.", points: ["Butanoic acid: four peaks (all four carbons different)", "2-methylpropanoic acid: three peaks, because its two CH₃ groups are equivalent"], modelAnswer: "Butanoic acid has four different carbon environments and gives four peaks, while 2-methylpropanoic acid has two equivalent methyl carbons and gives only three." }),
    ],
    hints: ["Ester C=O: 160-185; C–O: 50-70."],
    explanation: "G has four environments including an ester C=O (174) and a C–O carbon (52), consistent with methyl propanoate; H, an acid isomer, is distinguished by its IR O–H band and its number of carbon-13 peaks.",
  });
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true,
    stem: `Rudo has three bottles labelled J, K and L, known to contain the isomers of C₃H₆O: propanal, propanone and prop-2-en-1-ol (CH₂=CHCH₂OH), but not which is which. Their carbon-13 NMR spectra are:\n\n| Bottle | δ / ppm |\n|---|---|\n| J | 207, 31 |\n| K | 137, 115, 63 |\n| L | 202, 37, 6 |\n\n${DATA13}`,
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name the compound in J.", accepted: ["propanone", "acetone", "propan-2-one"], wrong: ["propanal"], explanation: "Two peaks (symmetry) and a ketone C=O at 207." }),
      P.short({ label: "(b)", marks: 1, stem: "Name the compound in K.", accepted: ["prop-2-en-1-ol", "allyl alcohol", "propenol", "2-propen-1-ol", "prop-2-enol"], wrong: ["propanal"], explanation: "Two alkene carbons (137, 115) and a C–O carbon (63)." }),
      P.short({ label: "(c)", marks: 1, stem: "Name the compound in L.", accepted: ["propanal", "propionaldehyde"], wrong: ["propanone"], explanation: "Three environments, aldehyde C=O at 202." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why J gives only two peaks although it has three carbon atoms.", points: ["The two CH₃ groups in propanone are equivalent (symmetry about the C=O)", "So there are only two carbon environments: CH₃ (×2) and C=O"], modelAnswer: "Propanone, CH₃COCH₃, is symmetrical: its two methyl carbons are in identical environments, so there are only two environments, the CH₃ carbons and the carbonyl carbon." }),
      P.manual({ label: "(e)", marks: 2, stem: "Describe one simple chemical test that would confirm your answers for J and L, and the expected results.", points: ["Warm each with Tollens' reagent (or Fehling's solution)", "L (propanal) gives a silver mirror (or red-brown precipitate); J (propanone) shows no change"], modelAnswer: "Warm each with Tollens' reagent: L, the aldehyde, gives a silver mirror, while J, the ketone, does not react. (Fehling's solution gives a red-brown precipitate with L only.)" }),
      P.manual({ label: "(f)", marks: 1, stem: "K decolorises bromine water. Explain which peaks in its spectrum account for this.", points: ["The peaks at 137 and 115 ppm are the two sp² carbons of a C=C, which adds bromine"], modelAnswer: "The peaks at 137 and 115 ppm come from the two alkene carbons; the C=C reacts with bromine by addition, decolorising it." }),
    ],
    hints: ["Count the peaks first.", "190-220: aldehyde or ketone C=O."],
    explanation: "J propanone (2 peaks, 207), K prop-2-en-1-ol (alkene + C–O), L propanal (3 peaks, 202).",
  });
  b.card("DEFINITION", "Chemical shift, δ", "Position of an NMR peak relative to TMS (δ = 0), in ppm.");
  b.card("CONCEPT", "Number of carbon-13 peaks", "One peak per carbon environment; equivalent carbons (by symmetry) share a peak.");
  b.card("FACT", "TMS", "Si(CH₃)₄: one sharp peak at δ = 0; inert, volatile, more shielded than most organic nuclei.");
  b.card("FACT", "Carbonyl region", "Aldehyde and ketone C=O: 190-220 ppm. Acid and ester C=O: 160-185 ppm.");
  b.card("FACT", "Other carbon-13 regions", "Alkene/arene C 110-160; C–O 50-70; C–halogen 30-60; alkyl 0-50 ppm.");
  b.card("CONCEPT", "Deshielding", "Electronegative atoms and π bonds pull electron density away from a carbon, moving its peak to higher δ.");
  b.card("FACT", "Peaks for simple molecules", "Propan-2-ol 2; propan-1-ol 3; butanone 4; benzene 1; methylbenzene 5.");
  b.card("CONCEPT", "Distinguishing isomers by carbon-13 NMR", "Predict the number of environments for each isomer; then check with the shift ranges.");
});
