// W4b: achem.analysis.infrared (Cambridge only, AS Level 22.1)
import { concept, P, t, ce, CAM, sfStr } from "../lib.mjs";

const DATA = "Data (cm⁻¹): C–O 1040-1300; C=C 1500-1680; C=O amide 1640-1690, carbonyl/carboxyl 1670-1740, ester 1710-1750; C≡N 2200-2250; C–H 2850-2950; N–H 3300-3500; O–H carboxyl 2500-3000, hydroxy 3200-3600.";

concept("achem.analysis.infrared", { file: "analysis/infrared", keyPrefix: "analysis.infrared", applies: CAM }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which bond absorbs infrared radiation in the range 2200-2250 cm⁻¹?",
    options: [
      ["C≡N in a nitrile", "Correct: the strong triple bond absorbs at high wavenumber, 2200-2250 cm⁻¹."],
      ["C=O in a ketone", "C=O absorbs at 1670-1740 cm⁻¹."],
      ["O–H in an alcohol", "Alcohol O–H gives a broad absorption at 3200-3600 cm⁻¹."],
      ["C–O in an ester", "C–O absorbs at 1040-1300 cm⁻¹."],
    ],
    answer: "A",
    explanation: "C≡N: 2200-2250 cm⁻¹, a region where few other bonds absorb.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Which absorption is present in the infrared spectrum of propanone but absent from that of propan-2-ol?",
    options: [
      ["a strong, sharp absorption at about 1715 cm⁻¹", "Correct: the C=O of the ketone (1670-1740 cm⁻¹)."],
      ["a broad, strong absorption at about 3350 cm⁻¹", "That is alcohol O–H: present in propan-2-ol, absent from propanone."],
      ["an absorption at about 2900 cm⁻¹", "C–H absorptions appear in both compounds."],
      ["an absorption at about 1100 cm⁻¹", "C–O at 1040-1300 cm⁻¹ belongs to the alcohol, not the ketone."],
    ],
    answer: "A",
    explanation: "Oxidising propan-2-ol to propanone replaces the O–H (broad, 3200-3600) and C–O with C=O (about 1715).",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "An unknown shows a very broad absorption from 2500 to 3000 cm⁻¹ and a strong absorption at 1710 cm⁻¹. Which type of compound is it?",
    options: [
      ["a carboxylic acid", "Correct: carboxyl O–H (2500-3000, very broad) plus C=O."],
      ["a primary alcohol", "An alcohol has O–H at 3200-3600 and no C=O."],
      ["an aliphatic ester", "An ester has C=O and C–O but no O–H."],
      ["an aldehyde", "An aldehyde has C=O but no O–H absorption."],
    ],
    answer: "A",
    explanation: "Only a carboxylic acid shows both the very broad carboxyl O–H and a C=O.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which gas in the atmosphere does not absorb infrared radiation?",
    options: [
      ["nitrogen", "Correct: N₂ has two identical atoms, so its vibration cannot change a dipole moment."],
      ["carbon dioxide", "Some CO₂ vibrations change its dipole, so it absorbs infrared: a greenhouse gas."],
      ["methane", "C–H vibrations in CH₄ change the dipole; methane absorbs infrared."],
      ["water vapour", "The bent, polar H₂O molecule absorbs infrared strongly."],
    ],
    answer: "A",
    explanation: "Absorption requires a change in dipole moment during the vibration; homonuclear diatomics such as N₂ and O₂ cannot do this.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: `Which absorptions are expected in the infrared spectrum of ethyl ethanoate, CH₃COOCH₂CH₃?\n\n1. a strong absorption between 1710 and 1750 cm⁻¹\n2. a strong absorption between 1040 and 1300 cm⁻¹\n3. a broad absorption between 3200 and 3600 cm⁻¹\n\n${DATA}`,
    options: [
      ["1 and 2 only", "Correct: ester C=O and C–O, but no O–H."],
      ["1, 2 and 3", "An ester has no O–H bond, so there is no broad absorption at 3200-3600."],
      ["2 and 3 only", "Statement 3 is false and statement 1 is true."],
      ["1 only", "Statement 2 is also true: esters have C–O bonds."],
    ],
    answer: "A",
    hints: ["Which bonds does an ester contain?"],
    explanation: "Esters show C=O at 1710-1750 and C–O at 1040-1300 cm⁻¹ but no O–H.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements about infrared spectroscopy are correct?\n\n1. A bond vibration absorbs infrared only if it changes the dipole moment of the molecule.\n2. A stronger bond between the same two atoms absorbs at a higher wavenumber.\n3. The fingerprint region lies below about 1500 cm⁻¹.",
    options: [
      ["1, 2 and 3", "Correct: all three statements are true."],
      ["1 and 2 only", "Statement 3 is also true."],
      ["2 and 3 only", "Statement 1 is also true: it is why N₂ and O₂ do not absorb."],
      ["1 only", "Statements 2 and 3 are also true: C≡N > C=N > C–N in wavenumber, and the fingerprint region is below 1500."],
    ],
    answer: "A",
    hints: ["Compare where C≡N, C=O and C–O absorb."],
    explanation: "Dipole change is required; stronger (higher-order) bonds absorb at higher wavenumbers; the fingerprint region is below about 1500 cm⁻¹.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: `Compound J, C₃H₆O, shows a strong absorption at 1715 cm⁻¹ and C–H absorptions near 2950 cm⁻¹, but nothing between 3200 and 3600 cm⁻¹. J does not react with Tollens' reagent. What is J?\n\n${DATA}`,
    options: [
      ["propanone", "Correct: C=O with no O–H, and not an aldehyde."],
      ["propanal", "Propanal fits the spectrum but would give a silver mirror with Tollens' reagent."],
      ["prop-2-en-1-ol", "This alcohol would show broad O–H at 3200-3600 and no C=O."],
      ["propan-1-ol", "This alcohol has formula C₃H₈O and shows O–H, not C=O."],
    ],
    answer: "A",
    hints: ["Combine the spectrum with the chemical test."],
    explanation: "C=O and no O–H: an aldehyde or ketone of formula C₃H₆O. The negative Tollens' test rules out propanal.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: `An unknown compound shows a broad absorption at 3200-3600 cm⁻¹, a sharp absorption at 2245 cm⁻¹ and C–H absorptions near 2950 cm⁻¹, with no absorption between 1640 and 1750 cm⁻¹. Which compound fits?\n\n${DATA}`,
    options: [
      [t`$\ce{CH3CH(OH)CN}$`, "Correct: alcohol O–H and C≡N, no C=O."],
      [t`$\ce{CH3CH2CONH2}$`, "An amide would show N–H at 3300-3500 and C=O at 1640-1690, with no C≡N."],
      [t`$\ce{CH3COCN}$`, "This has a C=O, which would absorb at 1670-1740 cm⁻¹."],
      [t`$\ce{CH3CH2COOH}$`, "An acid would show a very broad O–H at 2500-3000 and C=O; no C≡N."],
    ],
    answer: "A",
    hints: ["Which compound has both O–H and C≡N but no C=O?"],
    explanation: "2245 cm⁻¹ is C≡N; broad 3200-3600 is alcohol O–H; no C=O. 2-hydroxypropanenitrile fits.",
  });
  {
    const lam = 5.75e-4;
    const wn = 1 / lam;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "A strong absorption occurs at a wavelength of 5.75 × 10⁻⁴ cm. Calculate its wavenumber, in cm⁻¹, to three significant figures.",
      value: wn, sf: 3, unit: "cm⁻¹",
      wrong: [lam],
      hints: ["Wavenumber = 1/wavelength (in cm)."],
      explanation: `Wavenumber = 1 ÷ (5.75 × 10⁻⁴ cm) = ${sfStr(wn, 3)} cm⁻¹, in the ester C=O range (1710-1750 cm⁻¹).`,
    });
  }
  {
    const wn = 1 / 3.0e-4;
    b.num({
      d: 2, skill: "APPLICATION", calculator: true, daily: true,
      stem: "An absorption has a wavelength of 3.00 × 10⁻⁴ cm. Calculate its wavenumber, in cm⁻¹, to three significant figures.",
      value: wn, sf: 3, unit: "cm⁻¹",
      wrong: [3.0e-4],
      explanation: `1 ÷ (3.00 × 10⁻⁴) = ${sfStr(wn, 3)} cm⁻¹: in the alcohol O–H (3200-3600) and N–H (3300-3500) ranges.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The broad shape of the O–H absorption in an alcohol is caused by hydrogen bonding between molecules.",
    answer: true,
    explanation: "True. Hydrogen bonding gives O–H bonds a range of strengths, so they absorb over a range of wavenumbers.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Infrared spectroscopy alone can always distinguish between two isomeric esters such as ethyl ethanoate and methyl propanoate by their absorptions above 1500 cm⁻¹.",
    answer: false,
    explanation: "False. Both show the same ester C=O and C–O absorptions; only the fingerprint region (compared with known spectra) or other techniques such as NMR distinguish them.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each absorption with the bond responsible.",
    pairs: [
      ["very broad, 2500-3000 cm⁻¹", "O–H in a carboxylic acid"],
      ["broad, 3200-3600 cm⁻¹", "O–H in an alcohol"],
      ["medium, 3300-3500 cm⁻¹", "N–H in an amine"],
      ["strong, sharp, 1670-1740 cm⁻¹", "C=O in an aldehyde or ketone"],
      ["1500-1680 cm⁻¹", "C=C in an alkene or arene"],
    ],
    explanation: "Learn the ranges with their shapes; the data table gives them in the exam.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the description of the spectra during the oxidation of ethanol to ethanoic acid.",
    template: "The broad absorption at 3200-3600 cm⁻¹ due to the alcohol {{blank:a}} bond disappears. A strong absorption due to the {{blank:b}} bond appears near 1700 cm⁻¹, and a very broad absorption appears at {{blank:c}} cm⁻¹.",
    blanks: [
      { id: "a", accepted: ["O–H"], choices: ["O–H", "C–H", "C=O"] },
      { id: "b", accepted: ["C=O"], choices: ["C=O", "C–O", "C≡N"] },
      { id: "c", accepted: ["2500-3000"], choices: ["2500-3000", "2200-2250", "1040-1300"] },
    ],
    explanation: "Alcohol O–H (3200-3600) is replaced by C=O (about 1700) and the very broad carboxyl O–H (2500-3000).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the region of an infrared spectrum below about 1500 cm⁻¹ that is unique to each compound.",
    accepted: ["fingerprint region", "the fingerprint region", "fingerprint"],
    wrong: ["functional group region"],
    explanation: "The fingerprint region: compare it with a database to identify a compound.",
  });
  b.short({
    d: 3, skill: "APPLICATION",
    stem: "A compound C₃H₇NO shows medium absorptions at 3350 and 3450 cm⁻¹ and a strong absorption at 1665 cm⁻¹, with no absorption at 2200-2250 cm⁻¹. Name the functional group present.",
    accepted: ["amide", "primary amide", "an amide", "amide group"],
    hints: ["Which C=O range is lowest?"],
    wrong: ["amine"],
    explanation: "N–H (3300-3500) plus C=O at 1665 (amide range 1640-1690): an amide, e.g. propanamide.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why bonds to hydrogen, such as O–H, N–H and C–H, absorb at higher wavenumbers than C–O and C–C.",
    points: ["Hydrogen is a very light atom", "So the bond vibrates at a high frequency (wavenumber), and absorption occurs where the radiation frequency matches the vibration"],
    modelAnswer: "The vibration frequency of a bond depends on the masses of the atoms. Because hydrogen is so light, X–H bonds vibrate at high frequency and absorb infrared at high wavenumbers (above 2500 cm⁻¹).",
    explanation: "Light atoms and strong bonds both raise the wavenumber.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 3,
    stem: "Rudo heats butan-2-ol with acidified potassium dichromate(VI). Describe how infrared spectra of the starting material and the product show that butanone has formed, and that the product is free from starting material.",
    points: ["Butan-2-ol shows a broad O–H absorption at 3200-3600 cm⁻¹ (and C–O at 1040-1300)", "Butanone shows a strong C=O absorption at about 1670-1740 cm⁻¹", "No broad O–H absorption in the product spectrum shows no alcohol remains (or comparing the fingerprint region with pure butanone)"],
    modelAnswer: "The alcohol shows a broad O–H band at 3200-3600 cm⁻¹. The product shows a strong, sharp C=O absorption near 1715 cm⁻¹, showing a ketone. If no O–H absorption remains in the product spectrum, there is no unreacted butan-2-ol; matching the fingerprint region with that of pure butanone confirms it.",
    hints: ["Which bond is lost and which is gained?"],
    explanation: "Disappearance of O–H, appearance of C=O, and absence of O–H as a purity check.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why carbon dioxide and water vapour absorb infrared radiation emitted by the Earth's surface, but nitrogen and oxygen do not, and state one consequence.",
    points: ["Infrared is absorbed only when a vibration changes the dipole moment of the molecule", "CO₂ (in its asymmetric stretch and bending) and H₂O (polar bonds) have vibrations that change the dipole; N₂ and O₂ are made of two identical atoms, so their stretching cannot produce a dipole", "Consequence: CO₂ and H₂O re-emit some of the energy and warm the lower atmosphere (greenhouse effect)"],
    modelAnswer: "A molecule absorbs infrared only if the vibration changes its dipole moment. Some vibrations of CO₂ (asymmetric stretching and bending) and of polar H₂O do this, so these molecules absorb infrared from the Earth. N₂ and O₂ have two identical atoms, so stretching never creates a dipole and they do not absorb. CO₂ and water vapour re-emit absorbed energy, warming the lower atmosphere: the greenhouse effect.",
    hints: ["What must a vibration change for infrared to be absorbed?"],
    explanation: "Dipole-change rule applied to atmospheric gases.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Compound K, C₄H₈O₂, is a neutral liquid with a fruity smell. Its infrared absorptions are shown.\n\n| Wavenumber / cm⁻¹ | Intensity and shape |\n|---|---|\n| 2980 | medium |\n| 1745 | strong, sharp |\n| 1180 | strong |\n\n${DATA}`,
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Identify the bond responsible for the absorption at 1745 cm⁻¹.", accepted: ["C=O", "carbonyl", "C=O bond", "C=O (ester)"], normalise: ["trim", "collapse_whitespace"], wrong: ["O–H"], explanation: "C=O, in the ester range 1710-1750 cm⁻¹." }),
      P.short({ label: "(b)", marks: 1, stem: "Identify the bond responsible for the absorption at 1180 cm⁻¹.", accepted: ["C–O", "C-O", "C–O bond", "C-O bond"], normalise: ["trim", "collapse_whitespace"], wrong: ["C=C"], explanation: "C–O, 1040-1300 cm⁻¹." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain how the spectrum shows that K is not a carboxylic acid.", points: ["There is no very broad absorption between 2500 and 3000 cm⁻¹ (carboxyl O–H)", "A carboxylic acid would show this O–H band as well as C=O; the data fit an ester (C=O at 1710-1750 and C–O)"], modelAnswer: "A carboxylic acid such as butanoic acid would show a very broad O–H absorption between 2500 and 3000 cm⁻¹. There is none, so K has no O–H; C=O at 1745 together with C–O at 1180 fits an ester." }),
      P.mcq({ label: "(d)", marks: 1, stem: "Which compound could be K?", options: [
        ["methyl propanoate", "Correct: an ester of formula C₄H₈O₂."],
        ["2-methylpropanoic acid", "An acid would show the very broad O–H."],
        ["butane-1,4-diol", "This is C₄H₁₀O₂ and shows O–H with no C=O."],
        ["butane-2,3-dione", "This is C₄H₆O₂, with no C–O single bond."],
      ], answer: "A", explanation: "K is an ester of formula C₄H₈O₂ (methyl propanoate, ethyl ethanoate or propyl methanoate)." }),
      P.manual({ label: "(e)", marks: 2, stem: "K could be ethyl ethanoate or methyl propanoate. Explain how infrared spectroscopy could still distinguish them.", points: ["Both have the same functional-group absorptions (C=O and C–O), so these cannot decide", "Compare the fingerprint region (below about 1500 cm⁻¹) of K with spectra of the pure known compounds: an exact match identifies it"], modelAnswer: "The functional-group absorptions are the same for both esters. However, each compound has its own pattern of peaks below about 1500 cm⁻¹; matching the fingerprint region of K with database spectra of pure ethyl ethanoate and pure methyl propanoate identifies which one it is." }),
      P.manual({ label: "(f)", marks: 1, stem: "K is hydrolysed by boiling with dilute acid. Describe one change you would expect in the infrared spectrum of the organic products compared with K.", points: ["A broad O–H absorption appears (3200-3600 for the alcohol and/or very broad 2500-3000 for the acid)"], modelAnswer: "The products (a carboxylic acid and an alcohol) contain O–H bonds, so a broad O–H absorption appears at 3200-3600 cm⁻¹ and a very broad one at 2500-3000 cm⁻¹." }),
    ],
    hints: ["Ester C=O absorbs at 1710-1750 cm⁻¹."],
    explanation: "K is an ester (C=O 1745, C–O 1180, no O–H); the fingerprint region distinguishes isomeric esters.",
  });
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true,
    stem: `Chipo investigates three colourless liquids, L, M and N, each with molecular formula C₃H₆O. Their main infrared absorptions are shown.\n\n| Liquid | Absorptions / cm⁻¹ |\n|---|---|\n| L | 3350 (broad), 2930, 1645 |\n| M | 2960, 2820, 2720, 1730 (strong) |\n| N | 2970, 1718 (strong) |\n\n${DATA} (Aldehyde C–H also shows weak absorptions near 2720 and 2820 cm⁻¹.)`,
    parts: [
      P.group({ label: "(a)", stem: "Identify the functional groups shown by the spectrum of L.", parts: [
        P.short({ label: "(i)", marks: 1, stem: "the group responsible for 3350 cm⁻¹ (broad);", accepted: ["alcohol", "hydroxy", "hydroxyl", "O–H", "OH", "alcohol O-H"], wrong: ["carboxylic acid"], explanation: "Broad 3200-3600: alcohol O–H." }),
        P.short({ label: "(ii)", marks: 1, stem: "the group responsible for 1645 cm⁻¹.", accepted: ["alkene", "C=C", "carbon-carbon double bond"], wrong: ["ketone"], explanation: "1500-1680 with no C=O elsewhere: C=C." }),
      ] }),
      P.short({ label: "(b)", marks: 2, stem: "Suggest a structural formula for L.", accepted: ["CH2=CHCH2OH", "CH₂=CHCH₂OH", "HOCH2CH=CH2", "HOCH₂CH=CH₂"], normalise: ["trim", "collapse_whitespace"], wrong: ["CH3CH2CHO"], explanation: "Prop-2-en-1-ol, CH₂=CHCH₂OH, has O–H and C=C and formula C₃H₆O." }),
      P.manual({ label: "(c)", marks: 2, stem: "Use the spectra to explain which of M and N is the aldehyde.", points: ["Both M and N show a strong C=O (1670-1740)", "M also shows the aldehyde C–H absorptions near 2720 and 2820 cm⁻¹, so M is propanal (N, with no such peaks, is propanone)"], modelAnswer: "Both have a strong C=O absorption, so both are carbonyl compounds. M shows the extra weak absorptions at 2720 and 2820 cm⁻¹ typical of the C–H of an aldehyde group, so M is propanal and N is propanone." }),
      P.mcq({ label: "(d)", marks: 1, stem: "Which test would confirm your answer to (c) without spectroscopy?", options: [
        ["warm each with Tollens' reagent: only the aldehyde gives a silver mirror", "Correct: aldehydes reduce Tollens' reagent; ketones do not."],
        ["add 2,4-DNPH reagent to each: only the aldehyde gives an orange precipitate", "Both aldehydes and ketones give a 2,4-DNPH precipitate."],
        ["add bromine water: only the aldehyde decolorises it", "Neither M nor N has a C=C."],
        ["add sodium metal: only the aldehyde gives hydrogen", "Neither has an O–H group."],
      ], answer: "A", explanation: "Tollens' (or Fehling's) distinguishes aldehydes from ketones." }),
      P.manual({ label: "(e)", marks: 1, stem: "Explain why L has a much higher boiling point than M.", points: ["L forms hydrogen bonds between molecules (O–H group), whereas M has only permanent dipole and instantaneous dipole forces"], modelAnswer: "L's O–H groups allow hydrogen bonding between molecules, which needs more energy to overcome than the dipole–dipole and instantaneous dipole forces between molecules of M." }),
    ],
    hints: ["Look first for O–H and C=O.", "Aldehydes show extra C–H peaks near 2720 cm⁻¹."],
    explanation: "L is prop-2-en-1-ol (O–H, C=C); M is propanal (C=O plus aldehyde C–H); N is propanone (C=O only).",
  });
  b.card("DEFINITION", "Wavenumber", "1/wavelength in cm; unit cm⁻¹. Proportional to frequency.");
  b.card("CONCEPT", "Why bonds absorb IR", "A bond absorbs at its natural vibration frequency if the vibration changes the dipole moment.");
  b.card("FACT", "O–H absorptions", "Alcohol: 3200-3600 cm⁻¹, broad. Carboxylic acid: 2500-3000 cm⁻¹, very broad.");
  b.card("FACT", "C=O absorptions", "Amide 1640-1690; aldehyde, ketone, acid 1670-1740; ester 1710-1750 cm⁻¹. Strong and sharp.");
  b.card("FACT", "Other key ranges", "C≡N 2200-2250; N–H 3300-3500; C–H 2850-2950; C=C 1500-1680; C–O 1040-1300 cm⁻¹.");
  b.card("DEFINITION", "Fingerprint region", "Below about 1500 cm⁻¹: a pattern unique to each compound; compare with a database to identify it or check purity.");
  b.card("CONCEPT", "IR evidence for oxidation of an alcohol", "Broad O–H at 3200-3600 disappears; C=O near 1700 appears (acid: very broad 2500-3000 too).");
  b.card("CONCEPT", "Greenhouse gases and IR", "CO₂, H₂O and CH₄ absorb IR because their vibrations change the dipole; N₂ and O₂ cannot.");
  b.card("CONCEPT", "Limits of IR", "Identifies bonds and functional groups, not the full structure; isomers with the same groups need the fingerprint region or NMR.");
});
