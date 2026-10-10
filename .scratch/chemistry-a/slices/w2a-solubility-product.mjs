// W2a: achem.acids.solubility-product (both boards; ZIMSEC Form 6, Cambridge A Level only)
import { concept, P, t, ce, Mr, kspFromSolubility, solubilityFromKsp, solubilityCommonIon, titre, meanTitre, molesFromSolution, sfStr, dpStr, sciStr } from "../lib.mjs";

concept("achem.acids.solubility-product", { file: "acids/solubility-product", keyPrefix: "acids.solubility-product" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: t`Which is the solubility product expression for lead(II) chloride, $\ce{PbCl2}$?`,
    options: [
      [t`$[\ce{Pb^2+}][\ce{Cl-}]^2$`, "Correct: one Pb²⁺ and two Cl⁻ per formula unit; the solid is not included."],
      [t`$[\ce{Pb^2+}][\ce{Cl-}]$`, "The chloride term must be squared, as there are two Cl⁻ per formula unit."],
      [t`$[\ce{Pb^2+}][2\ce{Cl-}]^2$`, "The coefficient is a power, not a multiplier inside the bracket."],
      [t`$\dfrac{[\ce{Pb^2+}][\ce{Cl-}]^2}{[\ce{PbCl2}]}$`, "The solid salt does not appear in Ksp."],
    ],
    answer: "A",
    explanation: "PbCl₂(s) ⇌ Pb²⁺(aq) + 2Cl⁻(aq): Ksp = [Pb²⁺][Cl⁻]², units mol³ dm⁻⁹.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: t`What are the units of Ksp for calcium hydroxide, $\ce{Ca(OH)2}$?`,
    options: [
      ["mol³ dm⁻⁹", "Correct: Ksp = [Ca²⁺][OH⁻]², three concentration terms multiplied."],
      ["mol² dm⁻⁶", "That is for a salt that gives two ions, such as AgCl."],
      ["mol dm⁻³", "Ksp is a product of several concentrations, not a single one."],
      ["no units", "Ksp has no denominator, so its units do not cancel."],
    ],
    answer: "A",
    explanation: "(mol dm⁻³)(mol dm⁻³)² = mol³ dm⁻⁹.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Solid sodium chloride is added to a saturated solution of silver chloride in contact with undissolved solid. What happens?",
    options: [
      ["More silver chloride precipitates and Ksp is unchanged.", "Correct: the common ion moves AgCl(s) ⇌ Ag⁺ + Cl⁻ to the left; Ksp depends only on temperature."],
      ["More silver chloride dissolves and Ksp increases.", "Adding Cl⁻ reduces the solubility; Ksp does not change."],
      ["Nothing happens because the solution is already saturated.", "The extra Cl⁻ makes the ionic product exceed Ksp, so solid forms."],
      ["Ksp decreases, so the concentration of Ag⁺ falls.", "[Ag⁺] falls, but Ksp stays the same at constant temperature."],
    ],
    answer: "A",
    explanation: "Common ion effect: [Cl⁻] increases, the position moves left, [Ag⁺] falls so that [Ag⁺][Cl⁻] = Ksp again.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements about solubility products are correct?\n\n1. A precipitate forms when the ionic product exceeds Ksp.\n2. The value of Ksp changes when a common ion is added.\n3. Ksp is used only for sparingly soluble salts.",
    options: [
      ["1 and 3 only", "Correct: Ksp is fixed at constant temperature; it applies to sparingly soluble salts."],
      ["1, 2 and 3", "Statement 2 is false: a common ion lowers the solubility, not Ksp."],
      ["2 and 3 only", "Statement 2 is false and statement 1 is true."],
      ["1 only", "Statement 3 is also true: very soluble salts are not described by Ksp."],
    ],
    answer: "A",
    hints: ["What is the only thing that changes an equilibrium constant?"],
    explanation: "Precipitation occurs when the ionic product > Ksp. Ksp, like any equilibrium constant, depends only on temperature.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Data: Ksp(AgCl) = 1.8 × 10⁻¹⁰ mol² dm⁻⁶. Equal volumes of two solutions are mixed. In which mixture does silver chloride precipitate?",
    options: [
      ["2.0 × 10⁻⁴ mol dm⁻³ AgNO₃ and 2.0 × 10⁻⁵ mol dm⁻³ NaCl", "Correct: after mixing, [Ag⁺][Cl⁻] = (1.0 × 10⁻⁴)(1.0 × 10⁻⁵) = 1.0 × 10⁻⁹, greater than Ksp."],
      ["2.0 × 10⁻⁶ mol dm⁻³ AgNO₃ and 2.0 × 10⁻⁵ mol dm⁻³ NaCl", "Ionic product = (1.0 × 10⁻⁶)(1.0 × 10⁻⁵) = 1.0 × 10⁻¹¹, below Ksp."],
      ["2.0 × 10⁻⁵ mol dm⁻³ AgNO₃ and 2.0 × 10⁻⁵ mol dm⁻³ NaCl", "Ionic product = (1.0 × 10⁻⁵)² = 1.0 × 10⁻¹⁰, below Ksp."],
      ["2.0 × 10⁻⁷ mol dm⁻³ AgNO₃ and 2.0 × 10⁻³ mol dm⁻³ NaCl", "Ionic product = (1.0 × 10⁻⁷)(1.0 × 10⁻³) = 1.0 × 10⁻¹⁰, below Ksp."],
    ],
    answer: "A",
    hints: ["Halve each concentration on mixing equal volumes."],
    explanation: "Halve each concentration, multiply, and compare with 1.8 × 10⁻¹⁰. Only the first mixture exceeds Ksp.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: t`The solubility of a salt $\ce{XY2}$ is s mol dm⁻³. Which expression gives its Ksp?`,
    options: [
      [t`$4s^3$`, "Correct: [X²⁺] = s, [Y⁻] = 2s, Ksp = s(2s)² = 4s³."],
      [t`$2s^3$`, "This forgets to square the 2 in [Y⁻] = 2s."],
      [t`$s^3$`, "This forgets that [Y⁻] is 2s, not s."],
      [t`$s^2$`, "This applies to a salt XY that gives two ions."],
    ],
    answer: "A",
    hints: ["Write the concentration of each ion in terms of s."],
    explanation: "XY₂(s) ⇌ X²⁺ + 2Y⁻: Ksp = (s)(2s)² = 4s³.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statements explain why barium sulfate can be given to patients for X-ray imaging even though barium ions are toxic?\n\n1. Barium sulfate has a very small Ksp, so very few Ba²⁺ ions are in solution.\n2. Sulfate ions in the suspension reduce the concentration of Ba²⁺ further by the common ion effect.\n3. Barium sulfate is completely insoluble, so no Ba²⁺ ions are present at all.",
    options: [
      ["1 and 2 only", "Correct: a tiny Ksp and the common ion keep [Ba²⁺] extremely low; statement 3 is never strictly true."],
      ["1, 2 and 3", "Statement 3 is false: every salt dissolves to some extent, which is why Ksp exists."],
      ["2 and 3 only", "Statement 3 is false and statement 1 is true."],
      ["1 only", "Statement 2 is also valid: added sulfate lowers [Ba²⁺] further."],
    ],
    answer: "A",
    hints: ["Is any salt completely insoluble?"],
    explanation: "Ksp(BaSO₄) is very small and extra sulfate lowers [Ba²⁺] still further, so little Ba²⁺ is absorbed. No salt is completely insoluble.",
  });
  b.num({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: "A student found the solubility of barium sulfate to be 1.05 × 10⁻⁵ mol dm⁻³ at 298 K. Calculate Ksp, in mol² dm⁻⁶, to three significant figures.",
    value: kspFromSolubility(1.05e-5), sf: 3, unit: "mol²/dm⁶",
    wrong: [1.05e-5 * 2],
    explanation: `BaSO₄ ⇌ Ba²⁺ + SO₄²⁻: Ksp = s² = (1.05 × 10⁻⁵)² = ${sciStr(kspFromSolubility(1.05e-5), 3)} mol² dm⁻⁶.`,
  });
  {
    const s = 0.0167 / Mr("CaF2");
    const ksp = kspFromSolubility(s, 1, 2);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`In an experiment, a saturated solution of calcium fluoride, $\ce{CaF2}$, contained 0.0167 g of the salt per dm³. Calculate Ksp, in mol³ dm⁻⁹, to three significant figures. (Ar: Ca 40.1, F 19.0)`,
      value: ksp, sf: 3, unit: "mol³/dm⁹",
      wrong: [kspFromSolubility(s, 1, 1), s * s * s],
      hints: ["Convert g dm⁻³ to mol dm⁻³ first.", "[F⁻] is twice the solubility."],
      explanation: `1. Mr(CaF₂) = ${dpStr(Mr("CaF2"), 1)}; s = 0.0167 ÷ ${dpStr(Mr("CaF2"), 1)} = ${sciStr(s, 3)} mol dm⁻³.\n2. [Ca²⁺] = s; [F⁻] = 2s = ${sciStr(2 * s, 3)} mol dm⁻³.\n3. Ksp = s(2s)² = 4s³ = ${sciStr(ksp, 3)} mol³ dm⁻⁹.\n4. Using s² (as for an AB salt) gives ${sciStr(kspFromSolubility(s), 3)}; using s³ gives ${sciStr(s ** 3, 3)}.`,
    });
  }
  {
    const s = solubilityFromKsp(5.6e-12, 1, 2);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Data: Ksp of magnesium hydroxide, $\ce{Mg(OH)2}$, is 5.6 × 10⁻¹² mol³ dm⁻⁹ at 298 K. Calculate the solubility of magnesium hydroxide in water, in mol dm⁻³, to three significant figures.`,
      value: s, sf: 3, unit: "mol/dm³",
      wrong: [Math.sqrt(5.6e-12), Math.cbrt(5.6e-12)],
      hints: ["Ksp = 4s³ for an AB₂ salt."],
      explanation: `1. Mg(OH)₂ ⇌ Mg²⁺ + 2OH⁻; Ksp = s(2s)² = 4s³.\n2. s = ∛(5.6 × 10⁻¹² ÷ 4) = ${sciStr(s, 3)} mol dm⁻³.\n3. Taking the square root (AB formula) gives ${sciStr(Math.sqrt(5.6e-12), 3)}; forgetting the 4 gives ${sciStr(Math.cbrt(5.6e-12), 3)}.`,
    });
  }
  {
    const s = solubilityCommonIon(1.1e-10, 0.05);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "Data: Ksp(BaSO₄) = 1.1 × 10⁻¹⁰ mol² dm⁻⁶. Calculate the solubility of barium sulfate, in mol dm⁻³, in 0.0500 mol dm⁻³ sodium sulfate solution, to two significant figures.",
      value: s, sf: 2, unit: "mol/dm³",
      wrong: [solubilityFromKsp(1.1e-10)],
      hints: ["Assume [SO₄²⁻] = 0.0500 mol dm⁻³ from the sodium sulfate."],
      explanation: `[Ba²⁺] = Ksp/[SO₄²⁻] = 1.1 × 10⁻¹⁰ ÷ 0.0500 = ${sciStr(s, 2)} mol dm⁻³, far less than the ${sciStr(solubilityFromKsp(1.1e-10), 3)} mol dm⁻³ in pure water.`,
    });
  }
  {
    const s = solubilityCommonIon(5.6e-12, 0.01, { x: 1, y: 2, commonIon: "anion" });
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: "Data: Ksp of magnesium hydroxide = 5.6 × 10⁻¹² mol³ dm⁻⁹. Calculate the solubility of magnesium hydroxide, in mol dm⁻³, in 0.0100 mol dm⁻³ sodium hydroxide, to two significant figures.",
      value: s, sf: 2, unit: "mol/dm³",
      wrong: [5.6e-12 / 0.01],
      hints: ["Assume [OH⁻] = 0.0100 mol dm⁻³.", "Remember that [OH⁻] is squared in Ksp."],
      explanation: `1. Ksp = [Mg²⁺][OH⁻]²; [OH⁻] ≈ 0.0100 mol dm⁻³ from the NaOH.\n2. [Mg²⁺] = 5.6 × 10⁻¹² ÷ (0.0100)² = ${sciStr(s, 2)} mol dm⁻³ = solubility.\n3. Forgetting to square [OH⁻] gives ${sciStr(5.6e-12 / 0.01, 2)}.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Silver chloride is less soluble in 0.1 mol dm⁻³ sodium chloride solution than in pure water.",
    answer: true,
    explanation: "True: the common ion (Cl⁻) moves AgCl(s) ⇌ Ag⁺ + Cl⁻ to the left.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "A salt with a smaller Ksp is always less soluble in mol dm⁻³ than a salt with a larger Ksp.",
    answer: false,
    hints: ["Compare an AB salt with an A₂B salt."],
    explanation: "False. Only salts of the same formula type can be compared directly: Ag₂CrO₄ has a smaller Ksp than AgCl but a larger molar solubility.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    stem: "Match each salt with the relationship between its Ksp and its solubility s.",
    pairs: [
      ["AgBr", "Ksp = s²"],
      ["PbI₂", "Ksp = 4s³ (one Pb²⁺, two I⁻)"],
      ["Ag₂SO₄", "Ksp = 4s³ (two Ag⁺, one SO₄²⁻)"],
      ["Al(OH)₃", "Ksp = 27s⁴"],
    ],
    extraRight: ["Ksp = 2s²"],
    hints: ["Write each ion concentration in terms of s."],
    explanation: "AB: s². AB₂ and A₂B: 4s³. AB₃: s(3s)³ = 27s⁴.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the effect by which the solubility of a sparingly soluble salt is reduced in a solution that already contains one of its ions.",
    accepted: ["common ion effect", "the common ion effect", "common-ion effect"],
    wrong: ["salting out"],
    explanation: "The common ion effect.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 2,
    stem: "Define the solubility product of a sparingly soluble salt.",
    points: ["The product of the concentrations of the ions in a saturated solution", "each raised to the power of its coefficient in the dissolving equation, at a given temperature"],
    modelAnswer: "The solubility product is the product of the concentrations of the ions in a saturated solution of a sparingly soluble salt, each concentration raised to the power of its stoichiometric coefficient, at a stated temperature.",
    explanation: "Mention saturated, ions, powers and temperature.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why calcium sulfate is less soluble in a solution of sodium sulfate than in pure water.",
    points: ["CaSO₄(s) ⇌ Ca²⁺(aq) + SO₄²⁻(aq); the sodium sulfate already supplies SO₄²⁻ (a common ion)", "The higher [SO₄²⁻] moves the position of equilibrium to the left (Le Chatelier)", "so [Ca²⁺] must be smaller for [Ca²⁺][SO₄²⁻] to equal Ksp: less solid dissolves (Ksp unchanged)"],
    modelAnswer: "In the saturated solution CaSO₄(s) ⇌ Ca²⁺(aq) + SO₄²⁻(aq). Sodium sulfate adds extra sulfate ions, so the position of equilibrium moves to the left. Because Ksp = [Ca²⁺][SO₄²⁻] is constant, a higher [SO₄²⁻] means a lower [Ca²⁺], so less calcium sulfate dissolves.",
    hints: ["Use Le Chatelier and the constancy of Ksp."],
    explanation: "Common ion effect: position moves left, Ksp unchanged.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 2,
    stem: "Suggest why the solubility of a salt calculated with the common ion approximation becomes less reliable when the added salt is very dilute.",
    points: ["The approximation assumes the common ion comes almost entirely from the added salt", "When the added salt is very dilute, the ions from the dissolving sparingly soluble salt are no longer negligible, so the assumed concentration of the common ion is too low"],
    modelAnswer: "The method assumes that the concentration of the common ion equals that of the added salt, ignoring the amount released by the sparingly soluble salt itself. If the added salt is very dilute, that contribution is comparable, so the assumption fails and the calculated solubility is too high.",
    hints: ["Which source of the common ion is ignored?"],
    explanation: "The approximation holds only when the common ion is mainly from the added salt.",
  });
  // Structured: Ksp of calcium hydroxide by titration
  {
    const tA = titre(0.5, 19.0), tB = titre(19.0, 37.45), tC = titre(0.2, 18.65);
    const { mean } = meanTitre([tA, tB, tC]);
    const nOH = molesFromSolution(mean, 0.05);
    const oh = nOH / 0.025;
    const ca = oh / 2;
    const ksp = ca * oh * oh;
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: t`Rudo shook solid calcium hydroxide with water until no more dissolved, filtered the mixture and titrated 25.0 cm³ portions of the saturated solution with 0.0500 mol dm⁻³ hydrochloric acid.

| Titration | 1 | 2 | 3 |
|---|---|---|---|
| final burette reading / cm³ | 19.00 | 37.45 | 18.65 |
| initial burette reading / cm³ | 0.50 | 19.00 | 0.20 |`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the mean titre, in cm³, to two decimal places.", value: mean, dp: 2, unit: "cm³", explanation: `Titres ${dpStr(tA, 2)}, ${dpStr(tB, 2)}, ${dpStr(tC, 2)} cm³ (all within 0.10 cm³); mean = ${dpStr(mean, 2)} cm³.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the concentration of hydroxide ions in the saturated solution, in mol dm⁻³, to three significant figures.", value: oh, sf: 3, unit: "mol/dm³", wrong: [oh / 2], explanation: `n(H⁺) = ${dpStr(mean, 2)}/1000 × 0.0500 = ${sciStr(nOH, 3)} mol = n(OH⁻); [OH⁻] = ${sciStr(nOH, 3)} ÷ 0.0250 = ${sfStr(oh, 3)} mol dm⁻³.` }),
        P.num({ label: "(c)", marks: 1, stem: "Deduce the concentration of calcium ions, in mol dm⁻³.", value: ca, sf: 3, unit: "mol/dm³", wrong: [oh], explanation: `[Ca²⁺] = ½[OH⁻] = ${sfStr(ca, 3)} mol dm⁻³.` }),
        P.manual({ label: "(d)", marks: 1, stem: "Write an expression for Ksp of calcium hydroxide.", points: ["Ksp = [Ca²⁺][OH⁻]²"], modelAnswer: "Ksp = [Ca²⁺(aq)][OH⁻(aq)]²" }),
        P.num({ label: "(e)", marks: 2, stem: "Calculate Ksp of calcium hydroxide from these results, in mol³ dm⁻⁹, to three significant figures.", value: ksp, sf: 3, unit: "mol³/dm⁹", wrong: [ca * oh], explanation: `Ksp = ${sfStr(ca, 3)} × (${sfStr(oh, 3)})² = ${sciStr(ksp, 3)} mol³ dm⁻⁹. Forgetting to square [OH⁻] gives ${sciStr(ca * oh, 3)}.` }),
        P.manual({ label: "(f)", marks: 1, stem: "Explain why the mixture was filtered before titration.", points: ["To remove undissolved Ca(OH)₂, which would also react with the acid and make the titre too large"], modelAnswer: "Undissolved solid would react with the hydrochloric acid, giving a titre that is too large; only the dissolved hydroxide should be measured." }),
        P.short({ label: "(g)", marks: 1, stem: "Name a suitable indicator for this titration.", accepted: ["methyl orange", "phenolphthalein", "bromophenol blue", "thymolphthalein", "thymol blue"], wrong: ["universal indicator"], explanation: "Strong acid–strong base: any of the common indicators works." }),
        P.mcq({ label: "(h)", marks: 1, stem: "The experiment is repeated using 0.100 mol dm⁻³ calcium chloride solution instead of water to dissolve the calcium hydroxide. How does the mean titre change?", options: [
          ["It decreases.", "Correct: the common ion Ca²⁺ reduces the solubility, so less OH⁻ is present."],
          ["It increases.", "Extra Ca²⁺ does not add OH⁻; it reduces the amount of Ca(OH)₂ that dissolves."],
          ["It stays the same.", "The common ion effect lowers the solubility."],
          ["It doubles.", "Calcium chloride adds no hydroxide ions."],
        ], answer: "A", explanation: "Common ion effect." }),
        P.manual({ label: "(i)", marks: 2, stem: "Explain your answer to (h).", points: ["The added Ca²⁺ moves Ca(OH)₂(s) ⇌ Ca²⁺ + 2OH⁻ to the left (common ion effect)", "so less calcium hydroxide dissolves, [OH⁻] is lower and less acid is needed"], modelAnswer: "Calcium ions from the calcium chloride are a common ion, so the equilibrium Ca(OH)₂(s) ⇌ Ca²⁺(aq) + 2OH⁻(aq) moves to the left. Less solid dissolves, the concentration of hydroxide is lower, and a smaller titre of acid is needed." }),
      ],
      hints: ["H⁺ + OH⁻ → H₂O is 1 : 1.", "Each Ca(OH)₂ gives one Ca²⁺ and two OH⁻."],
      explanation: `Mean titre ${dpStr(mean, 2)} cm³; [OH⁻] = ${sfStr(oh, 3)}, [Ca²⁺] = ${sfStr(ca, 3)} mol dm⁻³; Ksp = ${sciStr(ksp, 3)} mol³ dm⁻⁹; the common ion lowers the titre.`,
    });
  }
  // Structured: will lead(II) iodide precipitate?
  {
    const pb = 1.0e-3 / 2, iod = 2.0e-3 / 2;
    const ip = pb * iod * iod;
    const minI = Math.sqrt(9.8e-9 / pb);
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
      stem: t`50.0 cm³ of 1.00 × 10⁻³ mol dm⁻³ lead(II) nitrate is mixed with 50.0 cm³ of 2.00 × 10⁻³ mol dm⁻³ potassium iodide. Data: Ksp of $\ce{PbI2}$ = 9.8 × 10⁻⁹ mol³ dm⁻⁹ at 298 K.`,
      parts: [
        P.short({ label: "(a)", marks: 1, stem: "Give the units of Ksp for lead(II) iodide.", accepted: ["mol3 dm-9", "mol³ dm⁻⁹", "mol^3 dm^-9", "mol3/dm9", "mol³/dm⁹"], normalise: ["trim", "lowercase", "collapse_whitespace"], wrong: ["mol2 dm-6"], explanation: "[Pb²⁺][I⁻]²: mol³ dm⁻⁹." }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate the concentration of Pb²⁺ immediately after mixing, in mol dm⁻³.", value: pb, sf: 3, unit: "mol/dm³", wrong: [1.0e-3], explanation: `Mixing equal volumes halves the concentration: ${sciStr(pb, 3)} mol dm⁻³.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the ionic product [Pb²⁺][I⁻]² immediately after mixing, in mol³ dm⁻⁹.", value: ip, sf: 3, unit: "mol³/dm⁹", wrong: [1.0e-3 * 2.0e-3 * 2.0e-3], explanation: `[I⁻] = ${sciStr(iod, 3)}; ionic product = ${sciStr(pb, 3)} × (${sciStr(iod, 3)})² = ${sciStr(ip, 3)} mol³ dm⁻⁹.` }),
        P.mcq({ label: "(d)", marks: 1, stem: "Does a precipitate of lead(II) iodide form?", options: [
          ["No, because the ionic product is less than Ksp.", "Correct: the ionic product is below 9.8 × 10⁻⁹."],
          ["Yes, because the ionic product is less than Ksp.", "A precipitate forms only when the ionic product exceeds Ksp."],
          ["Yes, because lead(II) iodide is insoluble.", "At these low concentrations the solution is not saturated."],
          ["No, because lead(II) nitrate is soluble.", "The solubility of the starting salts is not the point; compare with Ksp."],
        ], answer: "A", explanation: "Ionic product < Ksp: no precipitate." }),
        P.num({ label: "(e)", marks: 2, stem: "Keeping [Pb²⁺] at its value from (b), calculate the minimum concentration of iodide ions, in mol dm⁻³, needed for a precipitate to start forming, to three significant figures.", value: minI, sf: 3, unit: "mol/dm³", wrong: [9.8e-9 / pb], explanation: `[I⁻] = √(Ksp/[Pb²⁺]) = √(9.8 × 10⁻⁹ ÷ ${sciStr(pb, 3)}) = ${sciStr(minI, 3)} mol dm⁻³.` }),
        P.manual({ label: "(f)", marks: 1, stem: "State what would be seen if a precipitate did form.", points: ["A bright yellow precipitate (of lead(II) iodide)"], modelAnswer: "A bright yellow precipitate." }),
      ],
      hints: ["Halve each concentration on mixing equal volumes.", "Compare the ionic product with Ksp."],
      explanation: `After mixing [Pb²⁺] = ${sciStr(pb, 3)}, [I⁻] = ${sciStr(iod, 3)} mol dm⁻³; ionic product ${sciStr(ip, 3)} < Ksp, so no precipitate; precipitation needs [I⁻] ≥ ${sciStr(minI, 3)} mol dm⁻³.`,
    });
  }
  b.card("DEFINITION", "Solubility product, Ksp", "The product of the ion concentrations in a saturated solution of a sparingly soluble salt, each raised to the power of its coefficient, at a given temperature.");
  b.card("FORMULA", "Ksp and solubility s", "AB: Ksp = s². AB₂ or A₂B: Ksp = 4s³. AB₃: Ksp = 27s⁴.");
  b.card("CONCEPT", "Will a precipitate form?", "Calculate the ionic product after mixing (halve for equal volumes); precipitate if it exceeds Ksp.");
  b.card("DEFINITION", "Common ion effect", "A sparingly soluble salt is less soluble in a solution already containing one of its ions.");
  b.card("FORMULA", "Common-ion calculation (AB)", "s = Ksp ÷ [common ion], assuming the common ion comes only from the added salt.");
  b.card("FACT", "Units of Ksp", "AgCl: mol² dm⁻⁶. PbI₂, Ag₂CrO₄, Ca(OH)₂: mol³ dm⁻⁹.");
  b.card("FACT", "What changes Ksp?", "Only temperature. A common ion lowers the solubility, not Ksp.");
  b.card("CONCEPT", "Comparing solubilities", "Compare Ksp values directly only for salts of the same formula type; otherwise calculate s.");
  b.card("FACT", "Colour of lead(II) iodide", "Bright yellow precipitate.");
});
