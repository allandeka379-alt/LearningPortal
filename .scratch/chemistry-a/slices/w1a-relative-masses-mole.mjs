// W1a: stoich.relative-masses-mole — relative masses, Ar from isotopes, the mole and Avogadro constant.
import { concept, P, t, chk, Mr, moles, massOf, arFromIsotopes, L, sfStr, sciStr } from "../lib.mjs";

concept("achem.stoich.relative-masses-mole", { file: "stoich/relative-masses-mole", keyPrefix: "stoich.relative-masses-mole" }, (b) => {
  // ---- MCQs
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Relative atomic masses are measured on a scale on which the mass of one atom of which isotope is exactly 12?",
    options: [[t`$\ce{^{12}C}$`, "Correct: the unified atomic mass unit is 1/12 of the mass of a carbon-12 atom."], [t`$\ce{^{1}H}$`, "Hydrogen-1 was used historically, but the modern standard is carbon-12."], [t`$\ce{^{16}O}$`, "Oxygen-16 has a relative isotopic mass of about 16 on the carbon-12 scale."], [t`$\ce{^{13}C}$`, "Carbon-13 has a relative isotopic mass of about 13."]],
    answer: "A",
    explanation: "The standard is the carbon-12 atom, assigned a mass of exactly 12 u; 1 u is one twelfth of its mass.",
  });
  {
    const ar = arFromIsotopes([[69, 60.1], [71, 39.9]]);
    b.mcq({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: "A sample of gallium contains 60.1% gallium-69 and 39.9% gallium-71. What is the relative atomic mass of gallium in this sample?",
      options: [[sfStr(ar, 3), "Correct: (69 × 60.1 + 71 × 39.9) ÷ 100."], ["70.0", "This is the simple mean of 69 and 71; the isotopes are not equally abundant."], [sfStr(arFromIsotopes([[69, 39.9], [71, 60.1]]), 3), "The abundances have been attached to the wrong isotopes."], ["69.6", "Check the arithmetic: 4146.9 + 2832.9 = 6979.8, ÷ 100 = 69.8."]],
      answer: "A",
      explanation: `Ar = (69 × 60.1 + 71 × 39.9) ÷ 100 = ${sfStr(ar, 4)} ≈ ${sfStr(ar, 3)}.`,
    });
    chk(Number(sfStr(ar, 3)), 69.8);
  }
  {
    const n = moles(4.40, Mr("CO2"));
    const N = n * 3 * L;
    b.mcq({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: t`How many **atoms** are there in 4.40 g of carbon dioxide, $\ce{CO2}$? ($A_\mathrm{r}$: C 12.0, O 16.0; $L = 6.022 \times 10^{23}\ \text{mol}^{-1}$)`,
      options: [[sciStr(N), "Correct: 0.100 mol of molecules × 3 atoms per molecule × L."], [sciStr(n * L), "This is the number of molecules; each CO₂ molecule has three atoms."], [sciStr(n * 2 * L), "This counts only the oxygen atoms."], [sciStr(4.40 * L), "The mass in grams has been multiplied by L without converting to moles."]],
      answer: "A",
      explanation: `n(CO₂) = 4.40 ÷ 44.0 = 0.100 mol of molecules; atoms = 0.100 × 3 × 6.022 × 10²³ = ${sciStr(N)}.`,
    });
  }
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which statement correctly defines relative atomic mass?",
    options: [
      ["The weighted mean mass of an atom of an element compared with one twelfth of the mass of an atom of carbon-12.", "Correct: weighted mean, of an atom, against 1/12 of carbon-12."],
      ["The mass of one atom of the most common isotope of an element compared with the mass of a carbon-12 atom.", "Ar is a weighted mean of all the isotopes, and the comparison is with 1/12 of a carbon-12 atom."],
      ["The total number of protons and neutrons in the nucleus of an atom of the element.", "This defines nucleon (mass) number, which is a whole number."],
      ["The mass in grams of one mole of atoms of the element, measured in g mol⁻¹.", "This is the molar mass, which has units; relative atomic mass has none."],
    ],
    answer: "A",
    explanation: "Relative atomic mass: weighted mean mass of an atom of the element ÷ (1/12 × mass of a ¹²C atom). It has no units.",
  });
  {
    const ar = arFromIsotopes([[10, 1.0], [11, 4.0]]);
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: "The mass spectrum of a sample of boron shows two peaks, at m/e 10 and 11, with relative heights 1.0 and 4.0. What is the relative atomic mass of boron in the sample?",
      options: [[sfStr(ar, 3), "Correct: (10 × 1.0 + 11 × 4.0) ÷ 5.0."], ["10.5", "This is the unweighted mean; the 11 peak is four times taller."], ["10.2", "The heights have been swapped between the isotopes."], ["54.0", "The weighted sum must be divided by the total height, 5.0."]],
      answer: "A",
      hints: ["Divide by the sum of the heights, not by 100."],
      explanation: `Ar = (10 × 1.0 + 11 × 4.0) ÷ (1.0 + 4.0) = 54.0 ÷ 5.0 = ${sfStr(ar, 3)}.`,
    });
    chk(arFromIsotopes([[10, 4.0], [11, 1.0]]), 10.2);
  }
  {
    // Which sample contains the greatest number of atoms?
    const samples = [["2.0 g of hydrogen gas, H₂", moles(2.0, Mr("H2")) * 2], ["16.0 g of methane, CH₄", moles(16.0, Mr("CH4")) * 5], ["32.0 g of oxygen gas, O₂", moles(32.0, Mr("O2")) * 2], ["44.0 g of carbon dioxide, CO₂", moles(44.0, Mr("CO2")) * 3]];
    chk(samples[1][1], 5); chk(samples[0][1], 2); chk(samples[3][1], 3);
    b.mcq({
      d: 3, skill: "ANALYSIS",
      stem: "Which sample contains the greatest number of **atoms**? (Ar: H 1.0, C 12.0, O 16.0)",
      options: [[samples[1][0], "Correct: 1.00 mol of CH₄ molecules × 5 atoms = 5.00 mol of atoms."], [samples[0][0], "1.00 mol of H₂ contains only 2.00 mol of atoms."], [samples[2][0], "1.00 mol of O₂ contains 2.00 mol of atoms."], [samples[3][0], "1.00 mol of CO₂ contains 3.00 mol of atoms."]],
      answer: "A",
      hints: ["Each sample is one mole of molecules.", "Count atoms per molecule."],
      explanation: "Each sample is exactly 1.00 mol of molecules, so the one with the most atoms per molecule wins: CH₄ (5), CO₂ (3), H₂ and O₂ (2).",
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Statements about the mole:\n\n1. One mole of water molecules contains 6.022 × 10²³ molecules.\n2. One mole of water molecules contains 3 × 6.022 × 10²³ atoms.\n3. One mole of water has a mass of 18.0 g mol⁻¹.\n\nWhich of the statements are correct?",
    options: [["1 and 2 only", "Correct: statement 3 confuses mass (18.0 g) with molar mass (18.0 g mol⁻¹)."], ["1, 2 and 3", "Statement 3 gives a mass with the units of molar mass."], ["2 and 3 only", "Statement 1 is correct."], ["1 only", "Statement 2 is also correct: three atoms per molecule."]],
    answer: "A",
    hints: ["Check the units in statement 3."],
    explanation: "One mole of H₂O is 6.022 × 10²³ molecules and three times as many atoms. Its mass is 18.0 g; its molar mass is 18.0 g mol⁻¹.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Statements about 0.20 mol of calcium chloride, CaCl₂ (Ar: Ca 40.1, Cl 35.5):\n\n1. Its mass is 22.2 g.\n2. It contains 0.40 mol of chloride ions.\n3. It contains 0.60 × 6.022 × 10²³ ions in total.\n\nWhich of the statements are correct?",
    options: [["1, 2 and 3", "Correct: Mr = 111.1 so the mass is 0.20 × 111.1 = 22.22 ≈ 22.2 g; 2 Cl⁻ per formula unit; 3 ions per formula unit."], ["1 and 2 only", "Statement 3 is also correct: 0.20 × 3 = 0.60 mol of ions."], ["2 and 3 only", "Statement 1 is also correct: 0.20 × 111.1 = 22.22 g."], ["1 only", "Statements 2 and 3 count ions correctly too."]],
    answer: "A",
    hints: ["Find Mr first, then count ions per formula unit."],
    explanation: `Mr(CaCl₂) = 40.1 + 2(35.5) = ${chk(Mr("CaCl2"), 111.1)}; mass = 0.20 × 111.1 = ${chk(0.2 * Mr("CaCl2"), 22.22, 1e-9)} g; Cl⁻: 2 × 0.20 = 0.40 mol; all ions: 3 × 0.20 = 0.60 mol = 0.60 × 6.022 × 10²³.`,
  });

  // ---- numerical
  {
    const ar = arFromIsotopes([[28, 92.2], [29, 4.7], [30, 3.1]]);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "Silicon has three stable isotopes: silicon-28 (92.2%), silicon-29 (4.7%) and silicon-30 (3.1%). Calculate the relative atomic mass of silicon to three significant figures.",
      value: ar, wrong: [29.0],
      hints: ["Multiply each mass by its percentage, add, then divide by 100."],
      explanation: `1. 28 × 92.2 = 2581.6; 29 × 4.7 = 136.3; 30 × 3.1 = 93.0.\n2. Sum = ${(28 * 92.2 + 29 * 4.7 + 30 * 3.1).toFixed(1)}.\n3. Ar = sum ÷ 100 = ${sfStr(ar, 4)} ≈ ${sfStr(ar, 3)}. (29.0, the simple mean, ignores the abundances.)`,
    });
  }
  {
    // abundance from Ar: Cl 35.5 → x% of 35
    const x = ((37 - 35.5) / (37 - 35)) * 100;
    chk(arFromIsotopes([[35, x], [37, 100 - x]]), 35.5);
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: "Bromine has two isotopes, bromine-79 and bromine-81, and a relative atomic mass of 79.9. Calculate the percentage abundance of bromine-79.",
      value: ((81 - 79.9) / (81 - 79)) * 100, unit: "%", wrong: [45],
      hints: ["Let the abundance of bromine-79 be x%; then bromine-81 is (100 − x)%.", "Set up 79x + 81(100 − x) = 7990."],
      explanation: "1. Let bromine-79 be x%, so bromine-81 is (100 − x)%.\n2. 79x + 81(100 − x) = 79.9 × 100 = 7990.\n3. 8100 − 2x = 7990, so 2x = 110 and x = 55.\n4. Bromine-79: 55.0%. (45% is the abundance of bromine-81.)",
    });
  }
  {
    const n = moles(10.0, Mr("CaCO3"));
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: "Calculate the amount, in mol, of calcium carbonate, CaCO₃, in 10.0 g of limestone powder that is pure calcium carbonate. (Ar: Ca 40.1, C 12.0, O 16.0)",
      value: n, unit: "mol", wrong: [10.0 * Mr("CaCO3")],
      explanation: `Mr = 40.1 + 12.0 + 3(16.0) = ${Mr("CaCO3")}; n = 10.0 ÷ ${Mr("CaCO3")} = ${sfStr(n, 3)} mol.`,
    });
  }
  {
    const n = 2.5e22 / L;
    const m = massOf(n, Mr("NH3"));
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Calculate the mass of $2.5 \times 10^{22}$ molecules of ammonia, $\ce{NH3}$. (Ar: N 14.0, H 1.0; $L = 6.022 \times 10^{23}\ \text{mol}^{-1}$) Give your answer in g to three significant figures.`,
      value: m, unit: "g", wrong: [n],
      hints: ["Convert the number of molecules to moles first."],
      explanation: `1. n = 2.5 × 10²² ÷ 6.022 × 10²³ = ${sfStr(n, 3)} mol.\n2. M(NH₃) = 17.0 g mol⁻¹.\n3. m = ${sfStr(n, 3)} × 17.0 = ${sfStr(m, 3)} g.`,
    });
  }
  {
    const n = moles(1.00, Mr("Na"));
    const e = n * 11 * L;
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`How many electrons are there in 1.00 g of sodium atoms? (Ar: Na 23.0; proton number 11; $L = 6.022 \times 10^{23}\ \text{mol}^{-1}$)`,
      value: e, wrong: [n * L],
      hints: ["Each sodium atom has 11 electrons."],
      explanation: `1. n(Na) = 1.00 ÷ 23.0 = ${sfStr(n, 3)} mol of atoms.\n2. Electrons = ${sfStr(n, 3)} × 11 = ${sfStr(n * 11, 3)} mol.\n3. Number = ${sfStr(n * 11, 3)} × 6.022 × 10²³ = ${sciStr(e)}. (${sciStr(n * L)} is the number of atoms.)`,
    });
  }
  // ---- true/false
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Relative molecular mass is measured in g mol⁻¹.",
    answer: false,
    explanation: "False. Mr is a ratio of masses and has no units; molar mass, M, has the unit g mol⁻¹.",
  });
  // ---- matching
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each substance with its relative formula mass. (Ar: H 1.0, N 14.0, O 16.0, S 32.1, Cu 63.5, Mg 24.3)",
    pairs: [["MgO", String(chk(Mr("MgO"), 40.3))], ["HNO₃", String(chk(Mr("HNO3"), 63.0))], ["CuSO₄", String(chk(Mr("CuSO4"), 159.6))], ["(NH₄)₂SO₄", String(chk(Mr("(NH4)2SO4"), 132.1))]],
    explanation: "MgO 24.3 + 16.0 = 40.3; HNO₃ 1.0 + 14.0 + 48.0 = 63.0; CuSO₄ 63.5 + 32.1 + 64.0 = 159.6; (NH₄)₂SO₄ 2(18.0) + 32.1 + 64.0 = 132.1.",
  });
  // ---- fill in the blank
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements.",
    template: "The Avogadro constant is the number of particles in one {{blank:a}} of a substance. Its value is 6.022 × 10²³ {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["mole"], choices: ["mole", "gram", "molecule", "dm³"] },
      { id: "b", accepted: ["mol⁻¹"], choices: ["mol⁻¹", "g mol⁻¹", "mol", "g"] },
    ],
    explanation: "L = 6.022 × 10²³ mol⁻¹: the number of particles per mole.",
  });
  // ---- short
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the term for the mass of an atom of a single isotope compared with one twelfth of the mass of an atom of carbon-12.",
    accepted: ["relative isotopic mass", "isotopic mass"],
    wrong: ["relative atomic mass"],
    explanation: "Relative isotopic mass refers to one isotope; relative atomic mass is the weighted mean over all isotopes.",
  });
  // ---- self-marked
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "The relative atomic mass of chlorine is 35.5, although no chlorine atom has a mass of 35.5 u. Explain why.",
    points: ["Chlorine is a mixture of isotopes (chlorine-35 and chlorine-37)", "Ar is the weighted mean of their masses according to their abundances (about 3 : 1)"],
    modelAnswer: "Chlorine consists of two isotopes, chlorine-35 and chlorine-37, in a ratio of about 3 : 1. Its relative atomic mass is the weighted mean of the isotopic masses, so it lies between 35 and 37 and nearer 35.",
    hints: ["Think about isotopes and averages."],
    explanation: "Ar is an average over isotopes.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "Define *relative molecular mass*.",
    points: ["Weighted mean (average) mass", "of a molecule", "compared with one twelfth of the mass of an atom of carbon-12"],
    modelAnswer: "The weighted mean mass of a molecule compared with one twelfth of the mass of an atom of carbon-12.",
    explanation: "Three phrases, one mark each.",
  });
  // ---- practice structured
  {
    const ar = arFromIsotopes([[204, 1.4], [206, 24.1], [207, 22.1], [208, 52.4]]);
    const n = moles(2.00, 207.2);
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: "Lead occurs naturally in galena. A sample of lead was analysed in a mass spectrometer.\n\n| m/e | 204 | 206 | 207 | 208 |\n|---|---|---|---|---|\n| percentage abundance | 1.4 | 24.1 | 22.1 | 52.4 |",
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the relative atomic mass of lead in this sample to one decimal place.", value: ar, dp: 1, wrong: [206.25], explanation: `(204 × 1.4 + 206 × 24.1 + 207 × 22.1 + 208 × 52.4) ÷ 100 = ${ar.toFixed(2)} ≈ ${ar.toFixed(1)}.` }),
        P.manual({ label: "(b)", marks: 1, stem: "State why the four isotopes of lead react identically with nitric acid.", points: ["Same number of electrons / same electron configuration (82 protons and 82 electrons), and reactions involve electrons"], modelAnswer: "They all have 82 electrons in the same arrangement, and chemical reactions involve the electrons." }),
        P.num({ label: "(c)", marks: 1, stem: "Using Ar(Pb) = 207.2, calculate the amount, in mol, of lead atoms in a 2.00 g lead fishing sinker. Give three significant figures.", value: n, unit: "mol", wrong: [2.00 * 207.2], explanation: `n = 2.00 ÷ 207.2 = ${sfStr(n, 3)} mol.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the number of lead atoms in the sinker. (L = 6.022 × 10²³ mol⁻¹)", value: n * L, wrong: [n], explanation: `${sfStr(n, 4)} × 6.022 × 10²³ = ${sciStr(n * L)} atoms.` }),
      ],
      hints: ["Weighted mean: sum of (mass × abundance) ÷ 100.", "n = m/M, then N = nL."],
      explanation: `Ar = ${ar.toFixed(1)}; n = ${sfStr(n, 3)} mol; N = ${sciStr(n * L)}.`,
    });
    chk(Number(ar.toFixed(1)), 207.2);
  }
  {
    const M = Mr("C6H8O6");
    const n = moles(0.500, M);
    b.struct({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "A vitamin C tablet sold in a Gweru pharmacy contains 0.500 g of ascorbic acid, C₆H₈O₆. (Ar: H 1.0, C 12.0, O 16.0; L = 6.022 × 10²³ mol⁻¹)",
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the relative molecular mass of ascorbic acid.", value: chk(M, 176.0), wrong: [29], explanation: "6(12.0) + 8(1.0) + 6(16.0) = 176.0." }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate the amount, in mol, of ascorbic acid in one tablet, to three significant figures.", value: n, unit: "mol", wrong: [0.5 * M], explanation: `0.500 ÷ 176.0 = ${sciStr(n)} mol.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the number of oxygen atoms in the ascorbic acid in one tablet.", value: n * 6 * L, wrong: [n * L], explanation: `${sciStr(n, 4)} × 6 × 6.022 × 10²³ = ${sciStr(n * 6 * L)}.` }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain why the molar mass of ascorbic acid is written with the unit g mol⁻¹ but its relative molecular mass has no unit.", points: ["Mr is a ratio of two masses (compared with 1/12 of a carbon-12 atom), so units cancel", "Molar mass is the mass per mole of substance, in grams per mole"], modelAnswer: "Relative molecular mass compares the mass of a molecule with one twelfth of the mass of a carbon-12 atom, so it is a ratio with no units. Molar mass is the mass of one mole of the substance, so it is measured in grams per mole." }),
      ],
      hints: ["Six oxygen atoms per molecule."],
      explanation: `Mr = 176.0; n = ${sciStr(n)} mol; O atoms = ${sciStr(n * 6 * L)}.`,
    });
  }

  // ---- flashcards
  b.card("DEFINITION", "Define **relative atomic mass**, Ar.", "The weighted mean mass of an atom of an element compared with one twelfth of the mass of an atom of carbon-12.");
  b.card("DEFINITION", "Define **relative isotopic mass**.", "The mass of an atom of an isotope compared with one twelfth of the mass of an atom of carbon-12.");
  b.card("DEFINITION", "Define the **mole**.", "The amount of substance containing 6.022 × 10²³ particles (the Avogadro constant, L).");
  b.card("FORMULA", "Ar from isotopic abundances?", "Ar = Σ(isotopic mass × abundance) ÷ Σ(abundances).", "With peak heights, divide by the sum of the heights.");
  b.card("FORMULA", "Links between mass, amount and number of particles?", t`$n = m/M$ and $N = n \times L$.`);
  b.card("FACT", "Value and unit of the Avogadro constant?", "L = 6.022 × 10²³ mol⁻¹.");
  b.card("CONCEPT", "Units of Ar, Mr and molar mass?", "Ar and Mr: no units (ratios). Molar mass M: g mol⁻¹.");
  b.card("DEFINITION", "Define the **unified atomic mass unit**.", "One twelfth of the mass of one atom of carbon-12.");
});
