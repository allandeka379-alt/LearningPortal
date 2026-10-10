// W2b: achem.periodicity.oxides-chlorides (both boards; ZIMSEC Form 5, Cambridge AS Level).
import { concept, P, t, Mr, pH, pHStrongBase, sfStr, dpStr, ZIM } from "../lib.mjs";

concept("achem.periodicity.oxides-chlorides", { file: "periodicity/oxides-chlorides", keyPrefix: "periodicity.oxides-chlorides" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which Period 3 oxide is amphoteric?",
    options: [
      [t`$\ce{Al2O3}$`, "Correct: it reacts with both acids and alkalis."],
      [t`$\ce{MgO}$`, "Magnesium oxide is basic only."],
      [t`$\ce{SiO2}$`, "Silicon dioxide is acidic only."],
      [t`$\ce{P4O10}$`, "Phosphorus(V) oxide is acidic."],
    ],
    answer: "A",
    explanation: "Aluminium oxide reacts with HCl to form AlCl₃ and with NaOH(aq) to form NaAl(OH)₄.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which chloride gives a neutral solution (pH 7) when added to water?",
    options: [
      [t`$\ce{NaCl}$`, "Correct: it dissolves without hydrolysis."],
      [t`$\ce{AlCl3}$`, "Hydrated Al³⁺ releases H⁺; the solution is about pH 3."],
      [t`$\ce{SiCl4}$`, "It is hydrolysed to SiO₂ and HCl, about pH 1-2."],
      [t`$\ce{PCl5}$`, "It is hydrolysed to H₃PO₄ and HCl, about pH 1-2."],
    ],
    answer: "A",
    explanation: "Ionic NaCl simply dissolves: Na⁺(aq) and Cl⁻(aq) do not react with water.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What is the approximate pH of the solution formed when sodium oxide is added to water?",
    options: [
      ["14", "Correct: sodium hydroxide, a strong alkali, is formed."],
      ["9", "This is typical of the slightly soluble magnesium hydroxide."],
      ["7", "This is the pH for Al₂O₃ or SiO₂, which do not react."],
      ["2", "Non-metal oxides such as SO₂ give acidic solutions."],
    ],
    answer: "A",
    explanation: "Na₂O + H₂O → 2NaOH; pH about 13-14.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which equation shows the reaction of phosphorus(V) oxide with water?",
    options: [
      [t`$\ce{P4O10 + 6H2O -> 4H3PO4}$`, "Correct: phosphoric(V) acid is formed."],
      [t`$\ce{P4O10 + 6H2O -> 4H3PO3 + 2O2}$`, "Balanced, but it would need phosphorus to be reduced and oxygen released; hydrolysis is not a redox reaction, and the acid formed is H₃PO₄."],
      [t`$\ce{P4O10 + 2H2O -> 4H3PO3}$`, "Phosphorous acid, H₃PO₃, comes from P₄O₆, and this is not balanced."],
      [t`$\ce{P4O10 + 10H2O -> 4H3PO4 + 4H2}$`, "No hydrogen gas is formed in an acid-base reaction."],
    ],
    answer: "A",
    explanation: "P₄O₁₀ + 6H₂O → 4H₃PO₄ (pH about 1-2).",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements about the reactions of chlorides with water are correct?\n\n1. Silicon tetrachloride gives steamy fumes and a white solid.\n2. Aluminium chloride gives an acidic solution because hydrated Al³⁺ ions release H⁺.\n3. Magnesium chloride gives a strongly alkaline solution.",
    options: [
      ["1 and 2 only", "Correct: MgCl₂ solution is neutral to very slightly acidic."],
      ["1, 2 and 3", "Statement 3 is false: magnesium chloride does not form OH⁻ ions."],
      ["2 and 3 only", "Statement 1 is true and statement 3 is false."],
      ["1 only", "Statement 2 is also true: [Al(H₂O)₆]³⁺ is acidic."],
    ],
    answer: "A",
    hints: ["MgCl₂ is a salt of a strong acid."],
    explanation: "SiCl₄ + 2H₂O → SiO₂ + 4HCl; [Al(H₂O)₆]³⁺ ⇌ [Al(H₂O)₅(OH)]²⁺ + H⁺; MgCl₂(aq) is about pH 6.5.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements explain why Na₂O is basic but SO₃ is acidic?\n\n1. Na₂O is ionic and contains oxide ions, which react with water to form hydroxide ions.\n2. SO₃ is covalent and reacts with water to form an acid.\n3. The electronegativity difference between Na and O is smaller than between S and O.",
    options: [
      ["1 and 2 only", "Correct: the Na–O difference is larger, which is why Na₂O is ionic."],
      ["1, 2 and 3", "Statement 3 is reversed: sodium is far less electronegative than sulfur."],
      ["2 and 3 only", "Statement 1 is true and statement 3 is false."],
      ["1 only", "Statement 2 is also correct: SO₃ + H₂O → H₂SO₄."],
    ],
    answer: "A",
    hints: ["Na 0.9, S 2.6, O 3.5 on the Pauling scale."],
    explanation: "Large electronegativity difference → ionic, basic oxide; small difference → covalent, acidic oxide.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which equation shows aluminium hydroxide behaving as an acid?",
    options: [
      [t`$\ce{Al(OH)3 + NaOH -> NaAl(OH)4}$`, "Correct: it reacts with a base, so it is acting as an acid."],
      [t`$\ce{Al(OH)3 + 3HCl -> AlCl3 + 3H2O}$`, "Here it neutralises an acid, so it acts as a base."],
      [t`$\ce{2Al(OH)3 -> Al2O3 + 3H2O}$`, "This is thermal decomposition, not an acid-base reaction."],
      [t`$\ce{Al^3+ + 3OH- -> Al(OH)3}$`, "This is precipitation of the hydroxide."],
    ],
    answer: "A",
    hints: ["An acid reacts with a base."],
    explanation: "Amphoteric Al(OH)₃ is a base towards HCl and an acid towards NaOH.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A white solid chloride of a Period 3 element fumes in moist air. When it is added to water, the solution has a pH of about 3 and, with a little aqueous sodium hydroxide, gives a white precipitate that dissolves in excess. What is the chloride?",
    options: [
      [t`$\ce{AlCl3}$`, "Correct: hydrolysis gives pH about 3, and Al(OH)₃ is amphoteric."],
      [t`$\ce{MgCl2}$`, "Mg(OH)₂ does not dissolve in excess NaOH and MgCl₂ does not fume."],
      [t`$\ce{SiCl4}$`, "Silicon tetrachloride is a liquid and gives pH about 1-2."],
      [t`$\ce{PCl5}$`, "PCl₅ gives pH about 1-2 and no precipitate with NaOH."],
    ],
    answer: "A",
    hints: ["Which hydroxide dissolves in excess alkali?"],
    explanation: "AlCl₃: partly covalent, fumes (HCl) in moist air, solution about pH 3, Al(OH)₃ precipitate soluble in excess NaOH.",
  });
  {
    const n = 0.155 / Mr("Na2O");
    const oh = (2 * n) / 0.5;
    const p = pHStrongBase(oh);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "0.155 g of sodium oxide is dissolved in water and the solution made up to 500 cm³. Calculate the pH of the solution, to two decimal places. (Ar: Na 23.0, O 16.0; Kw = 1.00 × 10⁻¹⁴ mol² dm⁻⁶)",
      value: p, dp: 2,
      wrong: [dpStr(pHStrongBase(n / 0.5), 2)],
      hints: ["One Na₂O gives two NaOH."],
      explanation: `1. n(Na₂O) = 0.155 ÷ 62.0 = ${sfStr(n, 3)} mol.\n2. n(OH⁻) = 2 × ${sfStr(n, 3)} = ${sfStr(2 * n, 3)} mol; [OH⁻] = ${sfStr(2 * n, 3)} ÷ 0.500 = ${sfStr(oh, 3)} mol dm⁻³.\n3. [H⁺] = 1.00 × 10⁻¹⁴ ÷ ${sfStr(oh, 3)}; pH = ${dpStr(p, 2)}. Forgetting the 1 : 2 ratio gives ${dpStr(pHStrongBase(n / 0.5), 2)}.`,
    });
  }
  {
    const n = 0.17 / Mr("SiCl4");
    const h = (4 * n) / 0.1;
    const p = pH(h);
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: "0.170 g of silicon tetrachloride is added to water and the mixture made up to 100 cm³. Assuming the HCl formed is the only acid, calculate the pH, to two decimal places. (Ar: Si 28.1, Cl 35.5)",
      value: p, dp: 2,
      wrong: [dpStr(pH(n / 0.1), 2)],
      hints: ["Write the hydrolysis equation to find the mole ratio of HCl to SiCl₄."],
      explanation: `1. SiCl₄ + 2H₂O → SiO₂ + 4HCl.\n2. n(SiCl₄) = 0.170 ÷ ${Mr("SiCl4")} = ${sfStr(n, 3)} mol; n(HCl) = ${sfStr(4 * n, 3)} mol.\n3. [H⁺] = ${sfStr(4 * n, 3)} ÷ 0.100 = ${sfStr(h, 3)} mol dm⁻³; pH = ${dpStr(p, 2)}. Using a 1 : 1 ratio gives ${dpStr(pH(n / 0.1), 2)}.`,
    });
  }
  {
    const n = 1.02 / Mr("Al2O3");
    const v = ((2 * n) / 2) * 1000;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "Aluminium oxide dissolves in aqueous sodium hydroxide: Al₂O₃ + 2NaOH + 3H₂O → 2NaAl(OH)₄. Calculate the minimum volume, in cm³, of 2.00 mol dm⁻³ NaOH needed to dissolve 1.02 g of Al₂O₃, to three significant figures. (Ar: Al 27.0, O 16.0)",
      value: v, sf: 3, unit: "cm³",
      wrong: [sfStr(v / 2, 3)],
      hints: ["Use the 1 : 2 ratio of Al₂O₃ to NaOH."],
      explanation: `1. n(Al₂O₃) = 1.02 ÷ ${Mr("Al2O3")} = ${sfStr(n, 3)} mol.\n2. n(NaOH) = 2 × ${sfStr(n, 3)} = ${sfStr(2 * n, 3)} mol.\n3. V = ${sfStr(2 * n, 3)} ÷ 2.00 × 1000 = ${sfStr(v, 3)} cm³. Ignoring the ratio gives ${sfStr(v / 2, 3)} cm³.`,
    });
  }
  {
    const n = 0.284 / Mr("P4O10");
    const v = ((12 * n) / 0.5) * 1000;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: "0.284 g of phosphorus(V) oxide is added to water. Calculate the volume, in cm³, of 0.500 mol dm⁻³ sodium hydroxide needed to convert all the phosphoric(V) acid formed into Na₃PO₄, to three significant figures. (Ar: P 31.0, O 16.0)",
      value: v, sf: 3, unit: "cm³",
      wrong: [sfStr(((4 * n) / 0.5) * 1000, 3), sfStr(((3 * n) / 0.5) * 1000, 3)],
      hints: ["One P₄O₁₀ gives four H₃PO₄, each of which needs three NaOH."],
      explanation: `1. P₄O₁₀ + 6H₂O → 4H₃PO₄; H₃PO₄ + 3NaOH → Na₃PO₄ + 3H₂O.\n2. n(P₄O₁₀) = 0.284 ÷ ${Mr("P4O10")} = ${sfStr(n, 3)} mol; n(NaOH) = 12 × ${sfStr(n, 3)} = ${sfStr(12 * n, 3)} mol.\n3. V = ${sfStr(12 * n, 3)} ÷ 0.500 × 1000 = ${sfStr(v, 3)} cm³. Using only 4 or 3 mol NaOH per P₄O₁₀ gives ${sfStr(((4 * n) / 0.5) * 1000, 3)} or ${sfStr(((3 * n) / 0.5) * 1000, 3)} cm³.`,
    });
  }
  {
    const n = 3.4 / Mr("SiCl4");
    const m = n * Mr("SiO2");
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "Calculate the mass, in g, of silicon dioxide formed when 3.40 g of silicon tetrachloride is completely hydrolysed, to three significant figures. (Mr: SiCl₄ 170.1, SiO₂ 60.1; Ar Si 28.1)",
      value: m, sf: 3, unit: "g",
      wrong: [sfStr(n * 28.1, 3)],
      hints: ["One SiCl₄ gives one SiO₂."],
      explanation: `SiCl₄ + 2H₂O → SiO₂ + 4HCl. n = 3.40 ÷ ${Mr("SiCl4")} = ${sfStr(n, 3)} mol; mass SiO₂ = ${sfStr(n, 3)} × ${Mr("SiO2")} = ${sfStr(m, 3)} g. Using the Ar of silicon instead of the Mr of SiO₂ gives ${sfStr(n * 28.1, 3)} g.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Silicon dioxide dissolves in water to give an acidic solution.",
    answer: false,
    explanation: "False. SiO₂ is acidic (it reacts with hot concentrated NaOH), but its giant covalent lattice does not react with or dissolve in water, so the pH stays at 7.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", applies: ZIM,
    stem: "Silicon dioxide reacts with hot, concentrated sodium hydroxide to form sodium silicate and water.",
    answer: true,
    explanation: "True: SiO₂ + 2NaOH → Na₂SiO₃ + H₂O, showing that SiO₂ is an acidic oxide.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each oxide with the approximate pH of the mixture formed with water.",
    pairs: [
      [t`$\ce{Na2O}$`, "13-14"],
      [t`$\ce{MgO}$`, "about 9-10"],
      [t`$\ce{Al2O3}$`, "7 (no reaction)"],
      [t`$\ce{SO3}$`, "about 0-1"],
    ],
    explanation: "Basic ionic oxides give alkaline solutions; insoluble Al₂O₃ leaves water neutral; SO₃ forms sulfuric acid.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Complete the explanation of why aluminium chloride solution is acidic.",
    template: "The Al³⁺ ion is small and highly charged, so it has a high {{blank:a}}. In [Al(H₂O)₆]³⁺ it draws electron density from the O–H bonds of the water ligands, so a {{blank:b}} is released and the solution has a pH of about {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["charge density"], choices: ["charge density", "atomic radius", "ionisation energy"] },
      { id: "b", accepted: ["proton"], choices: ["proton", "hydroxide ion", "chloride ion"] },
      { id: "c", accepted: ["3"], choices: ["3", "7", "10"] },
    ],
    hints: ["Charge ÷ size decides how strongly the ion polarises water."],
    explanation: "[Al(H₂O)₆]³⁺ ⇌ [Al(H₂O)₅(OH)]²⁺ + H⁺.",
  });
  b.short({
    d: 3, skill: "APPLICATION",
    stem: "Write the equation for the reaction of phosphorus pentachloride with excess water (type, e.g., A + 2B -> C + 2D).",
    accepted: ["PCl5 + 4H2O -> H3PO4 + 5HCl", "PCl5 + 4H2O → H3PO4 + 5HCl", "PCl5(s) + 4H2O(l) -> H3PO4(aq) + 5HCl(aq)", "PCl5(s) + 4H2O(l) → H3PO4(aq) + 5HCl(aq)"],
    normalise: ["trim", "collapse_whitespace"],
    wrong: ["PCl5 + H2O -> POCl3 + 2HCl"],
    hints: ["Phosphorus ends up in phosphoric(V) acid."],
    explanation: "PCl₅ + 4H₂O → H₃PO₄ + 5HCl. (POCl₃ forms only with limited water.)",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Write equations to show that aluminium oxide is amphoteric, and explain what the equations show.",
    points: [
      "Al₂O₃ + 6HCl → 2AlCl₃ + 3H₂O",
      "Al₂O₃ + 2NaOH + 3H₂O → 2NaAl(OH)₄",
      "With HCl it behaves as a base (neutralises an acid)",
      "With NaOH it behaves as an acid (reacts with a base); an oxide doing both is amphoteric",
    ],
    modelAnswer: "Al₂O₃ + 6HCl → 2AlCl₃ + 3H₂O shows it reacting as a base, neutralising an acid. Al₂O₃ + 2NaOH + 3H₂O → 2NaAl(OH)₄ shows it reacting as an acid with an alkali. An oxide that reacts with both acids and bases is amphoteric.",
    hints: ["One equation with an acid, one with an alkali."],
    explanation: "Two equations, one interpretation each.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain the change in the reactions of the chlorides NaCl, AlCl₃ and SiCl₄ with water in terms of their bonding.",
    points: [
      "NaCl is ionic (large electronegativity difference); it dissolves to give hydrated ions that do not react, pH 7",
      "AlCl₃ has considerable covalent character; the small, highly charged Al³⁺ polarises its water ligands so H⁺ is released (pH about 3)",
      "SiCl₄ is covalent (small electronegativity difference) with polar Si–Cl bonds",
      "Water's lone pair attacks the δ+ Si (which has available orbitals), the Si–Cl bonds are broken and HCl forms: complete hydrolysis, pH about 1-2",
    ],
    modelAnswer: "Sodium chloride is ionic, so it simply dissolves; the hydrated ions do not react and the pH is 7. Aluminium chloride is partly covalent; in water the Al³⁺ ion, with its high charge density, polarises the water ligands and releases H⁺, giving pH about 3. Silicon tetrachloride is covalent with polar Si–Cl bonds; water molecules donate a lone pair to the δ+ silicon atom, which can accept it into an empty orbital, so the Si–Cl bonds are broken and the chloride is completely hydrolysed to SiO₂ and HCl, pH about 1-2.",
    hints: ["Go from ionic to covalent and link each to the pH."],
    explanation: "Ionic → dissolves; covalent → hydrolysed.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true,
    stem: "Farai added a small amount of each of four oxides, **R**, **S**, **T** and **U**, to separate tubes of water containing universal indicator, then tested each oxide with dilute HCl and with aqueous NaOH.\n\n| Oxide | with water (indicator) | with dilute HCl | with NaOH(aq) |\n|---|---|---|---|\n| **R** | white solid dissolves; purple | reacts | no reaction |\n| **S** | white solid does not dissolve; green | reacts, dissolves | reacts, dissolves |\n| **T** | gas dissolves; red | no reaction | reacts |\n| **U** | white solid does not dissolve; green | no reaction | reacts only when hot and concentrated |",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Identify oxide **S** (give its formula).", accepted: ["Al2O3", "Al₂O₃"], normalise: ["trim", "collapse_whitespace"], wrong: ["MgO"], explanation: "Insoluble and amphoteric: Al₂O₃." }),
      P.short({ label: "(b)", marks: 1, stem: "Identify oxide **U** (give its formula).", accepted: ["SiO2", "SiO₂"], normalise: ["trim", "collapse_whitespace"], wrong: ["Al2O3"], explanation: "Insoluble, acidic only with hot concentrated alkali: SiO₂." }),
      P.mcq({ label: "(c)", stem: "Which could be oxide **T**?", options: [
        [t`$\ce{SO2}$`, "Correct: an acidic gas that dissolves to give H₂SO₃."],
        [t`$\ce{Na2O}$`, "Sodium oxide is a solid and gives an alkaline solution."],
        [t`$\ce{P4O10}$`, "P₄O₁₀ is acidic, but it is a solid, not a gas."],
        [t`$\ce{MgO}$`, "MgO is a basic solid."],
      ], answer: "A", explanation: "A gaseous oxide giving a red (acidic) indicator colour: SO₂ (SO₃ is also possible but it is usually a solid or fuming liquid near room temperature)." }),
      P.short({ label: "(d)", marks: 1, stem: "Write the equation for the reaction of oxide **R**, sodium oxide, with water (type, e.g., A + B -> 2C).", accepted: ["Na2O + H2O -> 2NaOH", "Na2O + H2O → 2NaOH", "Na2O(s) + H2O(l) -> 2NaOH(aq)", "Na2O(s) + H2O(l) → 2NaOH(aq)"], normalise: ["trim", "collapse_whitespace"], wrong: ["Na2O + H2O -> NaOH"], explanation: "Na₂O + H₂O → 2NaOH (purple: pH 13-14)." }),
      P.manual({ label: "(e)", marks: 2, stem: "Write equations for the reactions of oxide **S** with dilute HCl and with aqueous NaOH.", points: ["Al₂O₃ + 6HCl → 2AlCl₃ + 3H₂O", "Al₂O₃ + 2NaOH + 3H₂O → 2NaAl(OH)₄"], modelAnswer: "Al₂O₃ + 6HCl → 2AlCl₃ + 3H₂O; Al₂O₃ + 2NaOH + 3H₂O → 2NaAl(OH)₄." }),
      P.manual({ label: "(f)", marks: 2, stem: "Suggest why oxide **U** does not react with water although it is acidic.", points: ["SiO₂ has a giant covalent structure", "Many strong Si–O bonds would have to be broken, so the reaction with water does not occur (it is insoluble)"], modelAnswer: "Silicon dioxide has a giant covalent lattice held together by many strong Si–O bonds; water cannot break these, so it neither dissolves nor reacts. Only hot concentrated alkali attacks it." }),
    ],
    hints: ["Amphoteric oxides react with both acid and alkali.", "Giant covalent oxides are insoluble."],
    explanation: "R Na₂O (basic), S Al₂O₃ (amphoteric), T SO₂ (acidic gas), U SiO₂ (acidic, insoluble).",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: "A sample of aluminium chloride was added to water and the solution made up to 250 cm³. Its pH was 3.0. 25.0 cm³ portions were titrated with aqueous silver nitrate to find the chloride content.",
    parts: (() => {
      const nAg = (21.6 / 1000) * 0.05;
      const nCl250 = nAg * 10;
      const nAlCl3 = nCl250 / 3;
      const mass = nAlCl3 * Mr("AlCl3");
      return [
        P.manual({ label: "(a)", marks: 2, stem: "Explain why the solution is acidic. Include an equation.", points: ["[Al(H₂O)₆]³⁺ ⇌ [Al(H₂O)₅(OH)]²⁺ + H⁺", "The small, highly charged Al³⁺ (high charge density) polarises the O–H bonds of its water ligands so a proton is lost"], modelAnswer: "The hydrated aluminium ion loses a proton: [Al(H₂O)₆]³⁺ ⇌ [Al(H₂O)₅(OH)]²⁺ + H⁺. The Al³⁺ ion is small and highly charged, so it weakens the O–H bonds of the water molecules bonded to it." }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate [H⁺] in the solution, in mol dm⁻³.", value: 10 ** -3, unit: "mol/dm³", wrong: [3], explanation: "[H⁺] = 10⁻³·⁰ = 1.0 × 10⁻³ mol dm⁻³." }),
        P.num({ label: "(c)", marks: 2, stem: "Each 25.0 cm³ portion needed 21.60 cm³ of 0.0500 mol dm⁻³ AgNO₃ (Ag⁺ + Cl⁻ → AgCl). Calculate the amount, in mol, of chloride ions in the 250 cm³ solution, to three significant figures.", value: nCl250, sf: 3, unit: "mol", wrong: [sfStr(nAg, 3)], explanation: `n(Ag⁺) = 21.60 ÷ 1000 × 0.0500 = ${sfStr(nAg, 3)} mol = n(Cl⁻) in 25.0 cm³; × 10 = ${sfStr(nCl250, 3)} mol in 250 cm³. (${sfStr(nAg, 3)} is the amount in one portion only.)` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the mass, in g, of AlCl₃ dissolved, to three significant figures. (Ar: Al 27.0, Cl 35.5)", value: mass, sf: 3, unit: "g", wrong: [sfStr(nCl250 * Mr("AlCl3"), 3)], explanation: `n(AlCl₃) = ${sfStr(nCl250, 3)} ÷ 3 = ${sfStr(nAlCl3, 3)} mol; mass = ${sfStr(nAlCl3, 3)} × ${Mr("AlCl3")} = ${sfStr(mass, 3)} g. Forgetting to divide by 3 gives ${sfStr(nCl250 * Mr("AlCl3"), 3)} g.` }),
        P.manual({ label: "(e)", marks: 1, stem: "When solid aluminium chloride is exposed to moist air, steamy fumes are seen. Name the gas and write the equation for its formation.", points: ["Hydrogen chloride: AlCl₃ + 3H₂O → Al(OH)₃ + 3HCl"], modelAnswer: "Hydrogen chloride: AlCl₃ + 3H₂O → Al(OH)₃ + 3HCl." }),
      ];
    })(),
    hints: ["pH = −log[H⁺].", "Scale the titration result up to 250 cm³, then use the 3 : 1 ratio of Cl⁻ to AlCl₃."],
    explanation: "Hydrated Al³⁺ is acidic; the chloride titration gives the mass of AlCl₃.",
  });
  b.card("FACT", "Period 3 oxides with water: pH", "Na₂O 13-14; MgO about 9-10; Al₂O₃ and SiO₂ 7 (no reaction); P₄O₁₀ about 1-2; SO₂ about 2-3; SO₃ about 0-1.");
  b.card("CONCEPT", "Basic → amphoteric → acidic", "Na₂O, MgO basic (ionic); Al₂O₃ amphoteric; SiO₂, P₄O₁₀, SO₂, SO₃ acidic (covalent).");
  b.card("FORMULA", "Amphoteric aluminium oxide", "Al₂O₃ + 6HCl → 2AlCl₃ + 3H₂O; Al₂O₃ + 2NaOH + 3H₂O → 2NaAl(OH)₄.");
  b.card("FORMULA", "Amphoteric aluminium hydroxide", "Al(OH)₃ + 3HCl → AlCl₃ + 3H₂O; Al(OH)₃ + NaOH → NaAl(OH)₄.");
  b.card("FACT", "Period 3 chlorides with water: pH", "NaCl 7; MgCl₂ about 6.5; AlCl₃ about 3; SiCl₄ and PCl₅ about 1-2 (hydrolysed).");
  b.card("FORMULA", "Hydrolysis of SiCl₄ and PCl₅", "SiCl₄ + 2H₂O → SiO₂ + 4HCl; PCl₅ + 4H₂O → H₃PO₄ + 5HCl. Steamy fumes of HCl.");
  b.card("CONCEPT", "Why AlCl₃(aq) is acidic", "Small, highly charged Al³⁺ polarises water ligands: [Al(H₂O)₆]³⁺ ⇌ [Al(H₂O)₅(OH)]²⁺ + H⁺.");
  b.card("CONCEPT", "Bonding trend in oxides and chlorides", "Electronegativity difference falls across Period 3: ionic (Na, Mg) → intermediate (Al) → covalent (Si, P, S).");
  b.card("DEFINITION", "Amphoteric", "Reacts with both acids and bases, e.g. Al₂O₃ and Al(OH)₃.");
});
