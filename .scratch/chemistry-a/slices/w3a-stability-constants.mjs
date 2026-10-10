// W3a: achem.transition.stability-constants (both boards; ZIMSEC Form 6, Cambridge A Level).
import { concept, P, t, chk, kEq, sfStr, dpStr, sciStr } from "../lib.mjs";

concept("achem.transition.stability-constants", { file: "transition/stability-constants", keyPrefix: "transition.stability-constants" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is the best definition of the stability constant, Kstab, of a complex ion?",
    options: [
      ["the equilibrium constant for forming the complex in a solvent from its constituent ions or molecules", "Correct: it is Kc for the formation reaction from the aqua ion and ligands."],
      ["the rate constant for the reaction in which the complex is formed from the aqua ion", "Kstab is an equilibrium constant; it says nothing about rate."],
      ["the energy released when one mole of the complex is formed from its gaseous ions", "That resembles a lattice or hydration energy, not Kstab."],
      ["the equilibrium constant for the complex breaking apart into the metal ion and ligands", "That would be the reciprocal of Kstab (an instability constant)."],
    ],
    answer: "A",
    explanation: "Kstab is the equilibrium constant for the formation of a complex ion in a solvent from its constituent ions or molecules.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why is water left out of the expression for Kstab of a complex formed in aqueous solution?",
    options: [
      ["It is the solvent, so its concentration is effectively constant.", "Correct: the constant [H₂O] is included in the value of Kstab."],
      ["Water molecules are not ligands in any aqueous complex.", "Water is the ligand in every aqua ion."],
      ["Water is a liquid, and only gases appear in Kstab.", "Kstab uses concentrations of dissolved species, not partial pressures."],
      ["Water takes no part in the ligand exchange reaction.", "Water molecules are released when other ligands bind."],
    ],
    answer: "A",
    explanation: "Water is present in huge excess as the solvent, so its concentration hardly changes and is not written in the expression.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A metal ion M²⁺ forms complexes with three different ligands, X, Y and Z. The lg Kstab values are: MX₄²⁺ 4.2; MY₆²⁺ 11.6; MZ²⁻ 19.0. Which ligand will displace both of the others from M²⁺ when it is added in excess?",
    options: [
      ["Z", "Correct: MZ²⁻ has the largest stability constant, so it is the most stable complex."],
      ["X", "MX₄²⁺ has the smallest stability constant, so X is displaced by both others."],
      ["Y", "Y displaces X, but Z forms a still more stable complex."],
      ["none of them, as each needs a different number of ligands", "The number of ligands does not decide the exchange; the stability constants do."],
    ],
    answer: "A",
    explanation: "The complex with the largest Kstab is the most stable, so ligand Z displaces X and Y. A single complex with a very large Kstab and only one ligand suggests Z is polydentate, like EDTA⁴⁻.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements about stability constants are correct?\n\n1. A larger Kstab means a more stable complex.\n2. The overall Kstab is the product of the stepwise stability constants.\n3. Kstab tells you how quickly the complex forms.",
    options: [
      ["1 and 2 only", "Correct: Kstab is an equilibrium constant, not a rate constant."],
      ["1, 2 and 3", "Statement 3 is false: equilibrium constants give no information about rate."],
      ["2 and 3 only", "Statement 1 is true and statement 3 is false."],
      ["1 only", "Statement 2 is also true: K = K₁ × K₂ × … (lg values add)."],
    ],
    answer: "A",
    hints: ["Is Kstab about position or speed?"],
    explanation: "Kstab gives the position of equilibrium; stepwise constants multiply to give the overall value.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: t`What are the units of Kstab for $\ce{[Ni(H2O)6]^2+ + 3en <=> [Ni(en)3]^2+ + 6H2O}$?`,
    options: [
      ["dm⁹ mol⁻³", "Correct: (mol dm⁻³) ÷ [(mol dm⁻³)(mol dm⁻³)³]."],
      ["dm¹⁸ mol⁻⁶", "This counts the six water molecules released, which are not in the expression."],
      ["mol³ dm⁻⁹", "This is the reciprocal of the correct units."],
      ["no units", "Units cancel only when the concentration terms balance, which they do not here."],
    ],
    answer: "A",
    hints: ["Water is not in the expression; [en] is cubed."],
    explanation: "Kstab = [[Ni(en)₃]²⁺] / ([[Ni(H₂O)₆]²⁺][en]³): units (mol dm⁻³)⁻³ = dm⁹ mol⁻³.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: t`Which is the correct expression for Kstab of $\ce{[Ag(NH3)2]+}$, formed from $\ce{[Ag(H2O)2]+}$ and ammonia?`,
    options: [
      [t`$\dfrac{[\ce{[Ag(NH3)2]+}]}{[\ce{[Ag(H2O)2]+}][\ce{NH3}]^2}$`, "Correct: product over reactants, water omitted, ammonia squared."],
      [t`$\dfrac{[\ce{[Ag(NH3)2]+}][\ce{H2O}]^2}{[\ce{[Ag(H2O)2]+}][\ce{NH3}]^2}$`, "Water, the solvent, is left out."],
      [t`$\dfrac{[\ce{[Ag(H2O)2]+}][\ce{NH3}]^2}{[\ce{[Ag(NH3)2]+}]}$`, "This is upside down: it is the instability constant."],
      [t`$\dfrac{[\ce{[Ag(NH3)2]+}]}{[\ce{[Ag(H2O)2]+}][\ce{NH3}]}$`, "Two ammonia molecules are needed, so [NH₃] is squared."],
    ],
    answer: "A",
    hints: ["Treat it like Kc, but leave out the solvent."],
    explanation: "Kstab = [[Ag(NH₃)₂]⁺] / ([[Ag(H₂O)₂]⁺][NH₃]²), units dm⁶ mol⁻².",
  });
  b.mcq({
    d: 4, skill: "UNDERSTANDING",
    stem: "Why are complexes of EDTA⁴⁻ much more stable than similar complexes of monodentate ligands?",
    options: [
      ["One EDTA⁴⁻ releases six water molecules, so the number of particles and the entropy increase.", "Correct: a large positive ΔS makes ΔG very negative (the chelate effect)."],
      ["Metal-oxygen bonds to EDTA⁴⁻ are many times stronger than metal-oxygen bonds to water.", "The bonds formed are similar to those broken, so ΔH is small; entropy is the main factor."],
      ["EDTA⁴⁻ forms ionic bonds with the metal ion instead of dative bonds.", "EDTA⁴⁻ bonds through lone pairs (dative bonds), like other ligands."],
      ["EDTA⁴⁻ reduces the metal ion to a lower, more stable oxidation state.", "No redox occurs when EDTA⁴⁻ binds."],
    ],
    answer: "A",
    hints: ["Count the particles on each side of the equation."],
    explanation: "[M(H₂O)₆]²⁺ + EDTA⁴⁻ → [M(EDTA)]²⁻ + 6H₂O: 2 particles become 7, so ΔS > 0.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: t`EDTA⁴⁻ is added to the deep blue solution containing $\ce{[Cu(NH3)4(H2O)2]^2+}$. Which statements are correct?` + "\n\n1. The EDTA complex of copper(II) has the larger stability constant.\n2. The exchange increases the number of particles in solution.\n3. Each EDTA⁴⁻ ion forms four dative bonds to the copper ion.",
    options: [
      ["1 and 2 only", "Correct: EDTA⁴⁻ is hexadentate, so statement 3 is false."],
      ["1, 2 and 3", "Statement 3 is false: EDTA⁴⁻ forms six dative bonds."],
      ["2 and 3 only", "Statement 1 is true and statement 3 is false."],
      ["1 only", "Statement 2 is also true: one EDTA⁴⁻ releases four NH₃ and two H₂O."],
    ],
    answer: "A",
    hints: ["How many donor atoms does EDTA⁴⁻ have?"],
    explanation: "[Cu(NH₃)₄(H₂O)₂]²⁺ + EDTA⁴⁻ → [Cu(EDTA)]²⁻ + 4NH₃ + 2H₂O: 2 particles become 7, and the EDTA complex is more stable.",
  });
  {
    const K = 1.6e7;
    const ratio = K * 0.20 ** 2;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`For $\ce{[Ag(H2O)2]+ + 2NH3 <=> [Ag(NH3)2]+ + 2H2O}$, $K_\mathrm{stab} = 1.6 \times 10^{7}\ \text{dm}^6\ \text{mol}^{-2}$ (data). In a solution where $[\ce{NH3}] = 0.20\ \text{mol dm}^{-3}$ at equilibrium, calculate the ratio $[\ce{[Ag(NH3)2]+}] : [\ce{[Ag(H2O)2]+}]$ (give the number of times larger), to two significant figures.`,
      value: ratio, sf: 2,
      wrong: [K * 0.2],
      hints: ["Rearrange: ratio = Kstab × [NH₃]²."],
      explanation: `1. Kstab = [[Ag(NH₃)₂]⁺] ÷ ([[Ag(H₂O)₂]⁺][NH₃]²).\n2. Ratio = Kstab × [NH₃]² = 1.6 × 10⁷ × (0.20)² = 1.6 × 10⁷ × 0.040.\n3. Ratio = ${sciStr(ratio, 2)}. Forgetting to square [NH₃] gives ${sciStr(K * 0.2, 2)}.`,
    });
  }
  {
    const cx = 1.2e-4, fe = 8.8e-4, scn = 1.8e-4;
    const K = kEq([[1, cx]], [[1, fe], [1, scn]]);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`In an experiment at 298 K a student found these equilibrium concentrations for $\ce{[Fe(H2O)6]^3+ + SCN- <=> [Fe(SCN)(H2O)5]^2+ + H2O}$: $[\ce{[Fe(SCN)(H2O)5]^2+}] = 1.2 \times 10^{-4}$, $[\ce{[Fe(H2O)6]^3+}] = 8.8 \times 10^{-4}$ and $[\ce{SCN-}] = 1.8 \times 10^{-4}\ \text{mol dm}^{-3}$. Calculate Kstab, in dm³ mol⁻¹, to three significant figures.`,
      value: K, sf: 3, unit: "dm³/mol",
      wrong: [sfStr(1 / K, 3)],
      hints: ["Product over reactants; leave out water."],
      explanation: `1. Kstab = [[Fe(SCN)(H₂O)₅]²⁺] ÷ ([[Fe(H₂O)₆]³⁺][SCN⁻]).\n2. = 1.2 × 10⁻⁴ ÷ (8.8 × 10⁻⁴ × 1.8 × 10⁻⁴).\n3. = ${sfStr(K, 3)} dm³ mol⁻¹. Inverting the expression gives ${sciStr(1 / K, 3)}.`,
    });
  }
  {
    const lg = 2.5 + 2.0 + 1.6 + 1.1;
    b.num({
      d: 2, skill: "APPLICATION", daily: true,
      stem: "A metal ion M²⁺ forms a complex with four ligands L, one at a time. The stepwise values of lg K are 2.5, 2.0, 1.6 and 1.1. Calculate lg Kstab for the overall formation of ML₄²⁺, to one decimal place.",
      value: lg, dp: 1,
      wrong: [dpStr(2.5 * 2.0 * 1.6 * 1.1, 1)],
      explanation: `Kstab = K₁K₂K₃K₄, so lg Kstab = 2.5 + 2.0 + 1.6 + 1.1 = ${dpStr(lg, 1)}. (Multiplying the lg values gives ${dpStr(2.5 * 2.0 * 1.6 * 1.1, 1)}, which is wrong.)`,
    });
  }
  {
    const K1 = 5.0e3, K2 = 2.0e3;
    const beta = K1 * K2;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A metal ion $\ce{M^2+}$ forms the complex $\ce{ML2^2+}$ in two steps with a neutral ligand L. The stepwise constants are $K_1 = 5.0 \times 10^{3}\ \text{dm}^3\ \text{mol}^{-1}$ and $K_2 = 2.0 \times 10^{3}\ \text{dm}^3\ \text{mol}^{-1}$. Calculate the overall stability constant, in dm⁶ mol⁻², to two significant figures.`,
      value: beta, sf: 2, unit: "dm⁶/mol²",
      wrong: [K1 + K2],
      hints: ["Overall K is the product of the stepwise constants."],
      explanation: `1. Kstab = K₁ × K₂.\n2. = 5.0 × 10³ × 2.0 × 10³ = ${sciStr(beta, 2)} dm⁶ mol⁻².\n3. Adding the constants (${sciStr(K1 + K2, 2)}) is wrong: only lg values add.`,
    });
  }
  {
    const K = 4.0e16;
    const free = 0.020 / (K * 0.010);
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A metal ion $\ce{M^2+}$ forms $\ce{[M(EDTA)]^2-}$ with $K_\mathrm{stab} = 4.0 \times 10^{16}\ \text{dm}^3\ \text{mol}^{-1}$. In a solution at equilibrium, $[\ce{[M(EDTA)]^2-}] = 0.020\ \text{mol dm}^{-3}$ and the free EDTA⁴⁻ concentration is $0.010\ \text{mol dm}^{-3}$. Calculate the concentration of the free aqua ion $\ce{M^2+}$, in mol dm⁻³, to two significant figures.`,
      value: free, sf: 2, unit: "mol/dm³",
      wrong: [0.010 / (K * 0.020)],
      hints: ["[M²⁺] = [complex] ÷ (Kstab × [EDTA⁴⁻])."],
      explanation: `1. Kstab = [[M(EDTA)]²⁻] ÷ ([M²⁺][EDTA⁴⁻]).\n2. [M²⁺] = 0.020 ÷ (4.0 × 10¹⁶ × 0.010).\n3. = ${sciStr(free, 2)} mol dm⁻³: almost no free metal ion remains, which is why EDTA is used to remove toxic metal ions. Swapping the two concentrations gives ${sciStr(0.010 / (K * 0.020), 2)}.`,
    });
  }
  b.tf({
    d: 2, skill: "APPLICATION",
    stem: t`The units of Kstab for $\ce{[Ag(NH3)2]+}$ are dm⁶ mol⁻².`,
    answer: true,
    explanation: "True: (mol dm⁻³) ÷ [(mol dm⁻³)(mol dm⁻³)²] = dm⁶ mol⁻².",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    stem: "Match each complex (formed from its aqua ion) with the units of its Kstab.",
    pairs: [
      [t`$\ce{[Fe(SCN)(H2O)5]^2+}$`, "dm³ mol⁻¹"],
      [t`$\ce{[Ag(NH3)2]+}$`, "dm⁶ mol⁻²"],
      [t`$\ce{[Ni(en)3]^2+}$`, "dm⁹ mol⁻³"],
      [t`$\ce{[CoCl4]^2-}$`, "dm¹² mol⁻⁴"],
    ],
    extraRight: ["mol dm⁻³"],
    hints: ["n ligands give dm³ⁿ mol⁻ⁿ."],
    explanation: "One, two, three and four incoming ligands give dm³ mol⁻¹, dm⁶ mol⁻², dm⁹ mol⁻³ and dm¹² mol⁻⁴.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: t`Complete the sentences about $\ce{[Cu(H2O)6]^2+ + EDTA^4- -> [Cu(EDTA)]^2- + 6H2O}$.`,
    template: "There are {{blank:a}} particles on the left and {{blank:b}} particles on the right, so the entropy of the system {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["2"], choices: ["2", "5", "6", "7"] },
      { id: "b", accepted: ["7"], choices: ["2", "5", "6", "7"] },
      { id: "c", accepted: ["increases"], choices: ["increases", "decreases", "stays the same"] },
    ],
    hints: ["Count the complex ion and the EDTA ion as one particle each."],
    explanation: "2 → 7 particles: ΔS is positive, which makes the EDTA complex very stable (the chelate effect).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the hexadentate ligand whose salts are used to treat lead poisoning and to soften water.",
    accepted: ["EDTA", "EDTA4-", "edta", "ethylenediaminetetraacetate", "ethylenediaminetetraacetic acid", "edetate"],
    wrong: ["1,2-diaminoethane"],
    explanation: "EDTA⁴⁻ wraps around a metal ion, forming six dative bonds and a very stable complex.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 2,
    stem: t`Write the expression for Kstab of $\ce{[Co(NH3)6]^2+}$, formed from $\ce{[Co(H2O)6]^2+}$ and ammonia, and give its units.`,
    points: [
      t`$K_\mathrm{stab} = \dfrac{[\ce{[Co(NH3)6]^2+}]}{[\ce{[Co(H2O)6]^2+}][\ce{NH3}]^6}$ (no water term)`,
      "Units: dm¹⁸ mol⁻⁶",
    ],
    modelAnswer: "Kstab = [[Co(NH₃)₆]²⁺] / ([[Co(H₂O)₆]²⁺][NH₃]⁶); units dm¹⁸ mol⁻⁶.",
    hints: ["Six ammonia molecules: raise [NH₃] to the power 6."],
    explanation: "Units: (mol dm⁻³)⁻⁶ = dm¹⁸ mol⁻⁶.",
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 3,
    stem: "Use ideas about entropy and enthalpy to explain why [Ni(en)₃]²⁺ is far more stable than [Ni(NH₃)₆]²⁺.",
    points: [
      "Forming [Ni(en)₃]²⁺ from the aqua ion: 4 particles become 7 (three en replace six H₂O), while with NH₃ the number of particles stays at 7 → 7",
      "So ΔS is much more positive for the en complex",
      "Both complexes have six Ni-N bonds, so ΔH is similar; the more positive ΔS makes ΔG more negative and Kstab larger",
    ],
    modelAnswer: "[Ni(H₂O)₆]²⁺ + 3en → [Ni(en)₃]²⁺ + 6H₂O increases the number of particles from 4 to 7, while [Ni(H₂O)₆]²⁺ + 6NH₃ → [Ni(NH₃)₆]²⁺ + 6H₂O does not change it. The en reaction therefore has a much larger increase in entropy. Both complexes contain six Ni-N bonds, so the enthalpy changes are similar; the larger ΔS makes ΔG more negative and Kstab much larger.",
    hints: ["Count particles in each formation equation."],
    explanation: "The chelate effect is mainly an entropy effect.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 3,
    stem: "Kstab for [CuCl₄]²⁻ is many millions of times smaller than Kstab for [Cu(NH₃)₄(H₂O)₂]²⁺. Explain why the yellow-green solution formed with concentrated HCl turns blue again when diluted with water, but the deep blue ammine solution stays deep blue when diluted.",
    points: [
      "Both are equilibria; diluting lowers the ligand concentration (and adds water), moving the position back towards the aqua ion",
      "The chloride complex has a small Kstab, so with lower [Cl⁻] the aqua ion re-forms (blue)",
      "The ammine complex has a very large Kstab, so even at low [NH₃] the ratio Kstab × [NH₃]⁴ stays large and the complex remains",
    ],
    modelAnswer: "Each complex is in equilibrium with the aqua ion. Dilution lowers the ligand concentration and shifts each position towards [Cu(H₂O)₆]²⁺. Because Kstab for [CuCl₄]²⁻ is relatively small, a modest fall in [Cl⁻] converts it back to the blue aqua ion. Kstab for the ammine complex is enormous, so Kstab × [NH₃]⁴ remains very large on dilution and the solution stays deep blue.",
    hints: ["Use ratio = Kstab × [ligand]ⁿ."],
    explanation: "A large Kstab keeps the complex dominant even at low ligand concentration.",
  });
  {
    const lgS = 13.5;
    const K = 10 ** lgS;
    const ratio = K * 0.10 ** 2;
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
      stem: "In black-and-white photography, unreacted silver bromide is removed with sodium thiosulfate solution, which forms [Ag(S₂O₃)₂]³⁻. Data (approximate): lg Kstab [Ag(NH₃)₂]⁺ = 7.2; lg Kstab [Ag(S₂O₃)₂]³⁻ = 13.5.",
      parts: [
        P.manual({ label: "(a)", marks: 1, stem: "Write the expression for Kstab of [Ag(S₂O₃)₂]³⁻, formed from [Ag(H₂O)₂]⁺.", points: [t`$K_\mathrm{stab} = \dfrac{[\ce{[Ag(S2O3)2]^3-}]}{[\ce{[Ag(H2O)2]+}][\ce{S2O3^2-}]^2}$`], modelAnswer: "Kstab = [[Ag(S₂O₃)₂]³⁻] / ([[Ag(H₂O)₂]⁺][S₂O₃²⁻]²)" }),
        P.short({ label: "(b)", stem: "Give the units of this Kstab. (Type them as, for example, dm9 mol-3.)", accepted: ["dm6 mol-2", "dm⁶ mol⁻²", "dm^6 mol^-2", "mol-2 dm6", "dm6/mol2"], normalise: ["trim", "lowercase", "collapse_whitespace"], wrong: ["mol2 dm-6"], explanation: "Two ligands: dm⁶ mol⁻²." }),
        P.num({ label: "(c)", stem: "Calculate the value of Kstab for [Ag(S₂O₃)₂]³⁻, to two significant figures.", value: K, sf: 2, unit: "dm⁶/mol²", wrong: [13.5 * 10], explanation: `Kstab = 10^13.5 = ${sciStr(K, 2)} dm⁶ mol⁻².` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the ratio [Ag(S₂O₃)₂]³⁻ : [Ag(H₂O)₂]⁺ in a fixing solution where [S₂O₃²⁻] = 0.10 mol dm⁻³ at equilibrium, to two significant figures.", value: ratio, sf: 2, wrong: [K * 0.1], explanation: `Ratio = Kstab × [S₂O₃²⁻]² = ${sciStr(K, 2)} × 0.010 = ${sciStr(ratio, 2)}.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Predict what happens if excess sodium thiosulfate is added to a solution of [Ag(NH₃)₂]⁺, and explain your answer.", points: ["Thiosulfate ions replace the ammonia ligands, forming [Ag(S₂O₃)₂]³⁻ (ligand exchange)", "Because its Kstab is much larger (lg 13.5 against 7.2), so this complex is more stable"], modelAnswer: "Ligand exchange occurs: [Ag(NH₃)₂]⁺ + 2S₂O₃²⁻ → [Ag(S₂O₃)₂]³⁻ + 2NH₃, because the thiosulfate complex has a much larger stability constant and is therefore more stable." }),
        P.tf({ label: "(f)", stem: "The large Kstab of [Ag(S₂O₃)₂]³⁻ shows that silver bromide must dissolve in thiosulfate within a few seconds.", answer: false, explanation: "False: Kstab describes the position of equilibrium, not the rate." }),
      ],
      hints: ["Kstab = 10^(lg Kstab).", "Ratio = Kstab × [ligand]²."],
      explanation: `Kstab = ${sciStr(K, 2)} dm⁶ mol⁻²; at 0.10 mol dm⁻³ thiosulfate the complex outnumbers the aqua ion by ${sciStr(ratio, 2)} to 1.`,
    });
  }
  {
    const lgEn = 18.3, lgNH3 = 8.6;
    const Ken = 10 ** lgEn;
    const ratio = Ken * 0.050 ** 3;
    const lgEx = lgEn - lgNH3;
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: "Data (textbook values) for nickel(II) complexes formed from [Ni(H₂O)₆]²⁺:\n\n| complex | lg Kstab |\n|---|---|\n| [Ni(NH₃)₆]²⁺ | 8.6 |\n| [Ni(en)₃]²⁺ | 18.3 |\n\n(en = 1,2-diaminoethane, H₂NCH₂CH₂NH₂)",
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: "Write the expression for Kstab of [Ni(en)₃]²⁺ and give its units.", points: [t`$K_\mathrm{stab} = \dfrac{[\ce{[Ni(en)3]^2+}]}{[\ce{[Ni(H2O)6]^2+}][\ce{en}]^3}$`, "dm⁹ mol⁻³"], modelAnswer: "Kstab = [[Ni(en)₃]²⁺] / ([[Ni(H₂O)₆]²⁺][en]³), units dm⁹ mol⁻³." }),
        P.num({ label: "(b)", stem: "Calculate Kstab for [Ni(en)₃]²⁺, to two significant figures.", value: Ken, sf: 2, wrong: [lgEn * 10], explanation: `10^18.3 = ${sciStr(Ken, 2)} dm⁹ mol⁻³.` }),
        P.num({ label: "(c)", stem: "Calculate the ratio [Ni(en)₃]²⁺ : [Ni(H₂O)₆]²⁺ when the equilibrium concentration of en is 0.050 mol dm⁻³, to two significant figures.", value: ratio, sf: 2, wrong: [Ken * 0.05], explanation: `${sciStr(Ken, 2)} × (0.050)³ = ${sciStr(ratio, 2)}.` }),
        P.fib({ label: "(d)", stem: "Complete the particle count for the exchange [Ni(NH₃)₆]²⁺ + 3en → [Ni(en)₃]²⁺ + 6NH₃.", template: "Particles on the left: {{blank:a}}; particles on the right: {{blank:b}}.", blanks: [
          { id: "a", accepted: ["4"], choices: ["2", "4", "6", "7"] },
          { id: "b", accepted: ["7"], choices: ["2", "4", "6", "7"] },
        ], explanation: "1 + 3 = 4 on the left; 1 + 6 = 7 on the right." }),
        P.manual({ label: "(e)", marks: 3, type: "SHORT_ANSWER", stem: "Explain, in terms of ΔH, ΔS and ΔG, why [Ni(en)₃]²⁺ is much more stable than [Ni(NH₃)₆]²⁺.", points: ["Both complexes have six Ni-N dative bonds, so the enthalpy change for the exchange is small", "The number of particles increases (4 → 7), so ΔS is positive", "So ΔG = ΔH − TΔS is negative and the equilibrium lies far to the right (larger Kstab): the chelate effect"], modelAnswer: "Six Ni-N bonds are broken and six similar Ni-N bonds are formed, so ΔH is small. Four particles become seven, so the entropy increases. With ΔH ≈ 0 and ΔS positive, ΔG is negative, favouring the en complex: this is the chelate effect." }),
        P.mcq({ label: "(f)", stem: "What happens when excess en is added to a solution of [Ni(NH₃)₆]²⁺?", options: [
          ["en displaces the ammonia and [Ni(en)₃]²⁺ forms.", "Correct: the en complex has the much larger Kstab."],
          ["Nothing, because ammonia is a stronger base than en.", "Basicity is not the deciding factor; Kstab is."],
          ["Ammonia displaces en from the complex.", "There is no en complex present at the start to be displaced."],
          ["A nickel(II) hydroxide precipitate forms.", "en and NH₃ both keep nickel(II) in solution as complexes."],
        ], answer: "A", explanation: "The more stable complex forms." }),
        P.num({ label: "(g)", stem: "Calculate lg K for the exchange [Ni(NH₃)₆]²⁺ + 3en ⇌ [Ni(en)₃]²⁺ + 6NH₃, to one decimal place.", value: lgEx, dp: 1, wrong: [dpStr(lgEn + lgNH3, 1)], explanation: `K(exchange) = Kstab(en) ÷ Kstab(NH₃), so lg K = 18.3 − 8.6 = ${dpStr(lgEx, 1)}.` }),
        P.tf({ label: "(h)", stem: "Water appears in the expression for the equilibrium constant of the exchange in (g).", answer: false, explanation: "False: the exchange in (g) involves no water at all; it releases ammonia, which does appear in the expression." }),
      ],
      hints: ["Kstab = 10^(lg value).", "Dividing two K values means subtracting their lg values."],
      explanation: `Kstab([Ni(en)₃]²⁺) = ${sciStr(Ken, 2)} dm⁹ mol⁻³; exchange lg K = ${dpStr(lgEx, 1)}; the chelate effect is driven by entropy.`,
    });
  }
  b.card("DEFINITION", "Stability constant, Kstab", "The equilibrium constant for the formation of a complex ion in a solvent from its constituent ions or molecules.");
  b.card("FORMULA", "Kstab for [Cu(NH₃)₄(H₂O)₂]²⁺", "[[Cu(NH₃)₄(H₂O)₂]²⁺] / ([[Cu(H₂O)₆]²⁺][NH₃]⁴); units dm¹² mol⁻⁴; no water term.");
  b.card("CONCEPT", "Why water is left out of Kstab", "It is the solvent, in huge excess, so its concentration is effectively constant.");
  b.card("FORMULA", "Overall and stepwise constants", "Kstab = K₁ × K₂ × K₃ × …; lg Kstab = lg K₁ + lg K₂ + ….");
  b.card("FORMULA", "Ratio of complex to aqua ion", "[complex] / [aqua ion] = Kstab × [L]ⁿ.");
  b.card("CONCEPT", "Ligand exchange and Kstab", "The ligand that forms the complex with the larger Kstab displaces the other (for Cu²⁺: Cl⁻ < NH₃ < EDTA⁴⁻).");
  b.card("CONCEPT", "Chelate effect", "Polydentate ligands release several water molecules, so the number of particles and ΔS increase; ΔG is more negative and Kstab larger.");
  b.card("FACT", "Uses of EDTA", "Treating heavy-metal (e.g. lead) poisoning, softening water, and binding metal ions in foods and cosmetics.");
  b.card("CONCEPT", "Kstab and rate", "Kstab tells you where the equilibrium lies, not how fast it is reached.");
});
