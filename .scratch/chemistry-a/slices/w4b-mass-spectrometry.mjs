// W4b: achem.analysis.mass-spectrometry (both boards; ZIMSEC Form 5, Cambridge AS Level)
import { concept, P, t, ce, arFromIsotopes, carbonsFromM1, Mr, chk, sfStr, dpStr } from "../lib.mjs";

concept("achem.analysis.mass-spectrometry", { file: "analysis/mass-spectrometry", keyPrefix: "analysis.mass-spectrometry" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In the mass spectrum of an organic compound, what does the m/e value of the molecular ion peak give?",
    options: [
      ["the relative molecular mass of the compound", "Correct: M⁺ is the whole molecule minus one electron, so its m/e equals Mr."],
      ["the relative mass of the most stable fragment", "That is the base peak, the most abundant ion, which is often a fragment."],
      ["the number of carbon atoms in the molecule", "The number of carbons comes from the ratio of the [M+1]⁺ and M⁺ peak heights."],
      ["the percentage of carbon-13 in the sample", "Carbon-13 explains the small [M+1]⁺ peak; M⁺ itself gives Mr."],
    ],
    answer: "A",
    explanation: "M → M⁺ + e⁻; a singly charged ion has m/e equal to its relative mass, so M⁺ gives Mr.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "The mass spectrum of propanone, CH₃COCH₃, has its base peak at m/e 43. Which ion causes it?",
    options: [
      [t`$\ce{CH3CO+}$`, "Correct: 12 + 3 + 12 + 16 = 43, formed by loss of CH₃ from M⁺."],
      [t`$\ce{CH3CO}$`, "Only charged species are detected; the fragment must be a positive ion."],
      [t`$\ce{C3H7+}$`, "C₃H₇⁺ also has m/e 43, but propanone has no propyl group."],
      [t`$\ce{CH3+}$`, "CH₃⁺ has m/e 15."],
    ],
    answer: "A",
    explanation: "CH₃COCH₃⁺ → CH₃CO⁺ + CH₃•. The acylium ion CH₃CO⁺ (m/e 43) is detected; the methyl radical is not.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A halogenoalkane shows two molecular ion peaks, at m/e 108 and 110, of equal height. Which compound is it?",
    options: [
      ["bromoethane, C₂H₅Br", "Correct: ⁷⁹Br and ⁸¹Br are about equally abundant, giving M and M+2 in a 1 : 1 ratio."],
      ["chloroethane, C₂H₅Cl", "Chloroethane gives peaks at 64 and 66 in a 3 : 1 ratio."],
      ["1-chloropropane, C₃H₇Cl", "This gives 78 and 80 in a 3 : 1 ratio."],
      ["dibromomethane, CH₂Br₂", "Two bromine atoms give three peaks (172, 174, 176) in a 1 : 2 : 1 ratio."],
    ],
    answer: "A",
    explanation: "C₂H₅⁷⁹Br = 108 and C₂H₅⁸¹Br = 110, in a 1 : 1 ratio.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why does the spectrum of heptane show a small peak at m/e 101 as well as the molecular ion at 100?",
    options: [
      ["Some molecules contain one carbon-13 atom.", "Correct: about 1.1% of carbon atoms are ¹³C, giving the [M+1]⁺ peak."],
      ["Some molecules have gained a hydrogen atom.", "The molecular ion forms by losing an electron, not gaining H."],
      ["Some molecular ions carry a charge of 2+.", "A 2+ ion would appear at half the mass, m/e 50."],
      ["Some hexane has been oxidised by the air.", "Oxidation would add 16 or more mass units, not 1."],
    ],
    answer: "A",
    explanation: "The [M+1]⁺ peak comes from molecules containing one ¹³C atom.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Dichloromethane, CH₂Cl₂, is analysed by mass spectrometry (³⁵Cl : ³⁷Cl ≈ 3 : 1). Which statements are correct?\n\n1. There are molecular ion peaks at m/e 84, 86 and 88.\n2. These peaks have heights in the ratio 9 : 6 : 1.\n3. The base peak must be at m/e 84.",
    options: [
      ["1 and 2 only", "Correct: ³⁵Cl³⁵Cl, ³⁵Cl³⁷Cl and ³⁷Cl³⁷Cl give 84, 86 and 88 in the ratio 9 : 6 : 1; the base peak may be a fragment."],
      ["1, 2 and 3", "Statement 3 is false: the most abundant ion is often a fragment such as CH₂Cl⁺."],
      ["2 and 3 only", "Statement 1 is true and statement 3 is false."],
      ["1 only", "Statement 2 is also true: (3/4)² : 2(3/4)(1/4) : (1/4)² = 9 : 6 : 1."],
    ],
    answer: "A",
    hints: ["Work out the probability of each pair of chlorine isotopes."],
    explanation: "Two Cl atoms give M : M+2 : M+4 = 9 : 6 : 1. The base peak need not be M⁺.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements about fragmentation in a mass spectrometer are correct?\n\n1. Only positively charged fragments are detected.\n2. The neutral radical formed when the molecular ion breaks is not detected.\n3. A peak 15 units below M⁺ suggests that a methyl group was lost.",
    options: [
      ["1, 2 and 3", "Correct: all three statements are true."],
      ["1 and 2 only", "Statement 3 is also true: CH₃ has mass 15."],
      ["1 and 3 only", "Statement 2 is also true: uncharged species are not deflected or detected."],
      ["1 only", "Statements 2 and 3 are also true."],
    ],
    answer: "A",
    hints: ["What must a particle carry to be detected?"],
    explanation: "M⁺ → fragment⁺ + neutral radical; only the ion is detected; a loss of 15 is a CH₃ group.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which ion is most likely to cause a peak at m/e 77 in the spectrum of an aromatic compound?",
    options: [
      [t`$\ce{C6H5+}$`, "Correct: 6 × 12 + 5 = 77, the phenyl cation."],
      [t`$\ce{C6H6+}$`, "This is the molecular ion of benzene, m/e 78."],
      [t`$\ce{C6H5CH2+}$`, "This benzyl ion has m/e 91."],
      [t`$\ce{C6H5CO+}$`, "This benzoyl ion has m/e 105."],
    ],
    answer: "A",
    hints: ["Add up 12 for each C and 1 for each H."],
    explanation: "C₆H₅⁺ has m/e 77, typical of compounds containing a benzene ring.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Compound Y has M⁺ at m/e 58 and strong fragment peaks at m/e 43 and 15, but no peak at m/e 29. Which isomer of C₃H₆O is Y?",
    options: [
      ["propanone, CH₃COCH₃", "Correct: losing CH₃ gives CH₃CO⁺ (43); CH₃⁺ gives 15; there is no ethyl group or CHO to give 29."],
      ["propanal, CH₃CH₂CHO", "Propanal would give strong peaks at 29 (C₂H₅⁺ and CHO⁺)."],
      ["prop-2-en-1-ol, CH₂=CHCH₂OH", "This alcohol would give CH₂OH⁺ at 31 and no CH₃CO⁺."],
      ["methoxyethene, CH₃OCH=CH₂", "This has no C=O, so it cannot form the CH₃CO⁺ ion at 43."],
    ],
    answer: "A",
    hints: ["Which isomer has a CH₃CO group and no C₂H₅ or CHO group?"],
    explanation: "M = 58; 58 − 15 = 43 (CH₃CO⁺); no m/e 29 rules out C₂H₅⁺ and CHO⁺, so Y is propanone.",
  });
  {
    const ar = arFromIsotopes([[24, 78.99], [25, 10.0], [26, 11.01]]);
    b.num({
      d: 2, skill: "APPLICATION", calculator: true, daily: true,
      stem: "The mass spectrum of magnesium shows peaks at m/e 24 (78.99%), 25 (10.00%) and 26 (11.01%). Calculate the relative atomic mass of magnesium, to one decimal place.",
      value: ar, dp: 1,
      wrong: [25],
      explanation: `Ar = (24 × 78.99 + 25 × 10.00 + 26 × 11.01) ÷ 100 = ${dpStr(ar, 1)}. The simple average of the masses (25) ignores the abundances.`,
    });
  }
  {
    const ar = arFromIsotopes([[28, 18.4], [29, 0.94], [30, 0.62]]);
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: "In a mass spectrum of element Q, the peak heights are: m/e 28, 18.4; m/e 29, 0.94; m/e 30, 0.62. Calculate the relative atomic mass of Q, to two decimal places.",
      value: ar, dp: 2,
      wrong: [(28 * 18.4 + 29 * 0.94 + 30 * 0.62) / 100],
      hints: ["The heights do not add up to 100."],
      explanation: `1. Σ(m × height) = 28 × 18.4 + 29 × 0.94 + 30 × 0.62 = ${dpStr(28 * 18.4 + 29 * 0.94 + 30 * 0.62, 2)}.\n2. Σ heights = 18.4 + 0.94 + 0.62 = ${dpStr(19.96, 2)}.\n3. Ar = ${dpStr(28 * 18.4 + 29 * 0.94 + 30 * 0.62, 2)} ÷ 19.96 = ${dpStr(ar, 2)}.\n4. Dividing by 100 instead of 19.96 gives a value far too small.`,
    });
  }
  {
    const n = carbonsFromM1(3.08, 40.0);
    chk(n, 7, 1e-9);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "In the mass spectrum of an organic compound, the M⁺ peak has relative abundance 40.0 and the [M+1]⁺ peak has relative abundance 3.08. Calculate the number of carbon atoms in one molecule.",
      value: n,
      wrong: [Math.round((1.1 * 40) / 3.08)],
      hints: ["n = 100 × [M+1] ÷ (1.1 × [M])."],
      explanation: `n = (100 × 3.08) ÷ (1.1 × 40.0) = ${n}. Inverting the ratio gives a value below 1, which cannot be right.`,
    });
  }
  {
    const m1 = (1.1 * 5 * 50) / 100;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "Pentane, C₅H₁₂, gives a molecular ion peak of relative abundance 50.0. Predict the relative abundance of its [M+1]⁺ peak, to three significant figures.",
      value: m1, sf: 3,
      wrong: [1.1 * 50 / 100],
      hints: ["Each carbon contributes 1.1% of the M⁺ height."],
      explanation: `[M+1] = 1.1 × n × [M] ÷ 100 = 1.1 × 5 × 50.0 ÷ 100 = ${sfStr(m1, 3)}. Forgetting the factor of five carbons gives ${sfStr(1.1 * 50 / 100, 3)}.`,
    });
  }
  {
    const avg = (70 * 9 + 72 * 6 + 74 * 1) / 16;
    const arCl = avg / 2;
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: "The molecular ion peaks of chlorine gas, Cl₂, appear at m/e 70, 72 and 74 with relative heights 9 : 6 : 1. Use these data to calculate the relative atomic mass of chlorine, to three significant figures.",
      value: arCl, sf: 3,
      wrong: [avg, 72 / 2],
      hints: ["Find the average mass of a Cl₂ molecule first."],
      explanation: `1. Mean Mr(Cl₂) = (70 × 9 + 72 × 6 + 74 × 1) ÷ 16 = ${sfStr(avg, 3)}.\n2. Ar(Cl) = ${sfStr(avg, 3)} ÷ 2 = ${sfStr(arCl, 3)}.\n3. Stopping at ${sfStr(avg, 3)} gives Mr(Cl₂), not Ar; taking the middle peak (72 ÷ 2 = 36) ignores the heights.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The tallest peak in the mass spectrum of an organic compound is always the molecular ion.",
    answer: false,
    explanation: "False. The tallest (base) peak is the most abundant ion, often a stable fragment. M⁺ is at the highest m/e, apart from isotope peaks.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each m/e value with the fragment ion most likely to cause it.",
    pairs: [
      ["15", "CH₃⁺"],
      ["31", "CH₂OH⁺"],
      ["45", "COOH⁺"],
      ["77", "C₆H₅⁺"],
    ],
    explanation: "CH₃⁺ 15; CH₂OH⁺ 31; COOH⁺ 45; C₆H₅⁺ 77.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Complete the sentences about halogen isotope patterns.",
    template: "A molecule with one chlorine atom gives M and M+2 peaks in the ratio {{blank:a}}. A molecule with two bromine atoms gives M, M+2 and M+4 peaks in the ratio {{blank:b}}. A molecule with two chlorine atoms gives them in the ratio {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["3 : 1"], choices: ["3 : 1", "1 : 1", "1 : 3"] },
      { id: "b", accepted: ["1 : 2 : 1"], choices: ["1 : 2 : 1", "9 : 6 : 1", "1 : 1 : 1"] },
      { id: "c", accepted: ["9 : 6 : 1"], choices: ["9 : 6 : 1", "1 : 2 : 1", "3 : 2 : 1"] },
    ],
    hints: ["Cl is 3 : 1; Br is 1 : 1. Multiply the probabilities."],
    explanation: "One Cl: 3 : 1. Two Br: (½)², 2(½)(½), (½)² = 1 : 2 : 1. Two Cl: (¾)², 2(¾)(¼), (¼)² = 9 : 6 : 1.",
  });
  b.short({
    d: 2, skill: "APPLICATION",
    stem: "Give the formula of a fragment ion with m/e 29 in the spectrum of propanal, CH₃CH₂CHO.",
    accepted: ["C2H5+", "C₂H₅⁺", "CH3CH2+", "CHO+", "CHO⁺", "HCO+", "CH₃CH₂⁺"],
    normalise: ["trim", "collapse_whitespace"],
    rejected: ["C2H5", "CHO", "CH3CH2"],
    wrong: ["C2H5"],
    explanation: "Both C₂H₅⁺ and CHO⁺ have m/e 29; the charge must be shown.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "The spectrum of 1-chloropropane shows molecular ion peaks at m/e 78 and 80 with heights in the ratio 3 : 1. Explain these observations.",
    points: ["Chlorine has two isotopes, ³⁵Cl and ³⁷Cl, so there are two molecular ions: C₃H₇³⁵Cl⁺ (78) and C₃H₇³⁷Cl⁺ (80)", "³⁵Cl is about three times as abundant as ³⁷Cl, so the peaks are in the ratio 3 : 1"],
    modelAnswer: "Chlorine exists as ³⁵Cl and ³⁷Cl, so molecular ions of mass 78 (C₃H₇³⁵Cl⁺) and 80 (C₃H₇³⁷Cl⁺) both form. Because ³⁵Cl is about three times as common as ³⁷Cl, the heights are in the ratio 3 : 1.",
    explanation: "Two isotopes, abundance ratio 3 : 1.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 3,
    stem: "The spectrum of pentan-2-one, CH₃COCH₂CH₂CH₃, shows peaks at m/e 86, 71 and 43. Identify the ion causing each peak and the neutral species lost in forming the fragments at 71 and 43.",
    points: ["86: molecular ion CH₃COCH₂CH₂CH₃⁺", "71: CH₃CH₂CH₂CO⁺, formed by loss of a CH₃ radical (mass 15)", "43: CH₃CO⁺, formed by loss of a C₃H₇ radical (mass 43) (accept C₃H₇⁺ formed by loss of CH₃CO)"],
    modelAnswer: "m/e 86 is the molecular ion, [CH₃COCH₂CH₂CH₃]⁺. At 71, the molecular ion has lost a methyl radical, leaving CH₃CH₂CH₂CO⁺. At 43, it has lost a propyl radical, leaving CH₃CO⁺ (C₃H₇⁺ also has m/e 43).",
    hints: ["Subtract each fragment from 86."],
    explanation: "Losses of 15 (CH₃) and 43 (C₃H₇) from M⁺ give the two acylium ions.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why the height of the [M+1]⁺ peak relative to the M⁺ peak increases with the number of carbon atoms in a molecule.",
    points: ["Each carbon atom has about a 1.1% chance of being carbon-13", "The more carbon atoms, the greater the chance that a molecule contains one ¹³C, so the [M+1]⁺ peak is larger relative to M⁺ (about 1.1n%)"],
    modelAnswer: "About 1.1% of carbon atoms are ¹³C. A molecule with n carbons has n chances of containing one, so the fraction of molecules giving the [M+1]⁺ ion is about 1.1n%, and the peak grows in proportion to the number of carbons.",
    hints: ["What fraction of carbon atoms are ¹³C?"],
    explanation: "Basis of n = 100 × [M+1]/(1.1 × [M]).",
  });
  {
    const n = carbonsFromM1(2.2, 50.0);
    chk(n, 4, 1e-9);
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: "Compound Z contains carbon, hydrogen and oxygen only. Its mass spectrum is summarised below.\n\n| m/e | relative abundance |\n|---|---|\n| 75 | 2.2 |\n| 74 | 50.0 |\n| 59 | 18 |\n| 45 | 100 |\n| 29 | 22 |",
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "State the relative molecular mass of Z.", value: 74, wrong: [75], explanation: "M⁺ is at 74; the small peak at 75 is [M+1]⁺." }),
        P.num({ label: "(b)", marks: 2, stem: "Use the [M+1]⁺ peak to calculate the number of carbon atoms in Z.", value: n, wrong: [Math.round((1.1 * 50) / 2.2)], explanation: `n = 100 × 2.2 ÷ (1.1 × 50.0) = ${n}.` }),
        P.short({ label: "(c)", marks: 1, stem: "Z has one oxygen atom. Deduce its molecular formula.", accepted: ["C4H10O", "C₄H₁₀O"], normalise: ["trim", "collapse_whitespace"], wrong: ["C4H8O"], explanation: "4 × 12 + 16 = 64; 74 − 64 = 10 H: C₄H₁₀O." }),
        P.short({ label: "(d)", marks: 1, stem: "Identify the neutral species lost when M⁺ forms the ion at m/e 59.", accepted: ["CH3", "methyl", "methyl radical", "CH₃", "CH3•", "CH3."], wrong: ["OH"], explanation: "74 − 59 = 15: a methyl radical." }),
        P.manual({ label: "(e)", marks: 2, stem: "The base peak at m/e 45 is CH₃CH(OH)⁺. Suggest the structure of Z, and explain how the peak at 29 fits.", points: ["Z is butan-2-ol, CH₃CH(OH)CH₂CH₃ (the CH₃CH(OH)⁺ fragment forms by losing C₂H₅)", "m/e 29 is C₂H₅⁺, the ethyl group on the other side of the CH(OH) carbon"], modelAnswer: "Z is butan-2-ol, CH₃CH(OH)CH₂CH₃. Breaking the bond between C2 and C3 gives CH₃CH(OH)⁺ (45) and an ethyl radical, or C₂H₅⁺ (29) and the neutral CH₃CHOH radical." }),
        P.mcq({ label: "(f)", marks: 1, stem: "Which isomer of Z would be expected to give a strong peak at m/e 31?", options: [
          ["butan-1-ol, CH₃CH₂CH₂CH₂OH", "Correct: breaking next to the CH₂OH group gives CH₂OH⁺ (31)."],
          ["2-methylpropan-2-ol, (CH₃)₃COH", "Its tertiary carbon carries no CH₂OH group, so no m/e 31."],
          ["butan-2-ol, CH₃CH(OH)CH₂CH₃", "This gives CH₃CH(OH)⁺ at 45, not CH₂OH⁺."],
          ["ethoxyethane, CH₃CH₂OCH₂CH₃", "This ether gives fragments such as C₂H₅O⁺ (45) and C₂H₅⁺ (29)."],
        ], answer: "A", explanation: "Primary alcohols show CH₂OH⁺ at m/e 31." }),
      ],
      hints: ["The [M+1]⁺ peak is one unit above M⁺.", "Subtract fragments from M."],
      explanation: `Mr 74; ${n} carbons; C₄H₁₀O; loss of CH₃ gives 59; Z is butan-2-ol.`,
    });
  }
  {
    const ar = arFromIsotopes([[69, 60.1], [71, 39.9]]);
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: "Thandeka analyses two samples by mass spectrometry. Sample 1 is the element gallium. Sample 2 is an organic liquid, W.\n\nSample 1: peaks at m/e 69 (relative abundance 60.1) and 71 (relative abundance 39.9).\n\nSample 2: molecular ion peaks at m/e 122 and 124 with heights in the ratio 1 : 1; a strong peak at m/e 43; no peaks between 44 and 121.",
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the relative atomic mass of gallium, to three significant figures.", value: ar, sf: 3, wrong: [70], explanation: `Ar = (69 × 60.1 + 71 × 39.9) ÷ 100 = ${sfStr(ar, 3)}.` }),
        P.short({ label: "(b)", marks: 1, stem: "Name the halogen present in W.", accepted: ["bromine", "Br", "bromide"], wrong: ["chlorine"], explanation: "M and M+2 of equal height: one bromine atom." }),
        P.short({ label: "(c)", marks: 2, stem: "Deduce the molecular formula of W, a halogenoalkane. Ar: H 1.0, C 12.0, Br 79 and 81.", accepted: ["C3H7Br", "C₃H₇Br"], normalise: ["trim", "collapse_whitespace"], wrong: ["C2H5Br"], explanation: "122 − 79 = 43 = C₃H₇: W is C₃H₇Br." }),
        P.short({ label: "(d)", marks: 1, stem: "Give the formula of the ion causing the peak at m/e 43.", accepted: ["C3H7+", "C₃H₇⁺", "CH3CH2CH2+", "(CH3)2CH+", "CH₃CH₂CH₂⁺", "(CH₃)₂CH⁺"], normalise: ["trim", "collapse_whitespace"], rejected: ["C3H7"], wrong: ["CH3CO+"], explanation: "C₃H₇⁺, formed when C–Br breaks and the bromine leaves as a radical." }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain why the peak at m/e 43 is a single peak, whereas the molecular ion appears as a pair.", points: ["The fragment at 43 has lost the bromine atom", "So it contains no bromine isotopes and has only one mass; the molecular ion contains ⁷⁹Br or ⁸¹Br, giving two masses"], modelAnswer: "The C₃H₇⁺ fragment has lost the bromine atom, so all these ions have the same mass. The molecular ions contain either ⁷⁹Br or ⁸¹Br, so they appear at two m/e values." }),
      ],
      hints: ["Equal M and M+2 peaks mean one bromine atom."],
      explanation: `Ga Ar = ${sfStr(ar, 3)}; W is C₃H₇Br; m/e 43 is C₃H₇⁺.`,
    });
  }
  b.card("DEFINITION", "Molecular ion, M⁺", "The ion formed when a molecule loses one electron; its m/e gives Mr.");
  b.card("FORMULA", "Ar from a mass spectrum", "Ar = Σ(m/e × abundance) ÷ Σ abundances.");
  b.card("FORMULA", "Carbon count from [M+1]⁺", "n = 100 × abundance[M+1] ÷ (1.1 × abundance[M]).");
  b.card("FACT", "Chlorine patterns", "One Cl: M : M+2 = 3 : 1. Two Cl: M : M+2 : M+4 = 9 : 6 : 1.");
  b.card("FACT", "Bromine patterns", "One Br: M : M+2 = 1 : 1. Two Br: 1 : 2 : 1.");
  b.card("FACT", "Common fragments", "15 CH₃⁺; 29 C₂H₅⁺ or CHO⁺; 31 CH₂OH⁺; 43 CH₃CO⁺ or C₃H₇⁺; 45 COOH⁺; 77 C₆H₅⁺.");
  b.card("DEFINITION", "Base peak", "The tallest peak (relative abundance 100): the most abundant ion, often a fragment.");
  b.card("CONCEPT", "Fragmentation", "M⁺ → positive fragment (detected) + neutral radical or molecule (not detected).");
  b.card("CONCEPT", "Losses from M", "M − 15: CH₃ lost; M − 29: C₂H₅ or CHO lost; M − 17: OH lost.");
});
