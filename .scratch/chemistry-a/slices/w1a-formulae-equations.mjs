// W1a: stoich.formulae-equations — ionic formulae, equations, ionic equations, empirical/molecular formulae, hydrates.
import { concept, P, t, chk, same, Mr, moles, empiricalFormula, sfStr } from "../lib.mjs";

concept("achem.stoich.formulae-equations", { file: "stoich/formulae-equations", keyPrefix: "stoich.formulae-equations" }, (b) => {
  // ---- MCQs
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the formula of iron(III) sulfate?",
    options: [[t`$\ce{Fe2(SO4)3}$`, "Correct: 2 × (3+) = 6+ balances 3 × (2−) = 6−."], [t`$\ce{FeSO4}$`, "This is iron(II) sulfate."], [t`$\ce{Fe3(SO4)2}$`, "3 × (3+) = 9+ does not balance 2 × (2−) = 4−."], [t`$\ce{Fe(SO4)3}$`, "One Fe³⁺ (3+) cannot balance three sulfate ions (6−)."]],
    answer: "A",
    explanation: "Iron(III) is Fe³⁺ and sulfate is SO₄²⁻. The lowest common multiple of 3 and 2 is 6: two Fe³⁺ and three SO₄²⁻, written Fe₂(SO₄)₃.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "What is the formula of ammonium phosphate?",
    options: [[t`$\ce{(NH4)3PO4}$`, "Correct: three NH₄⁺ (3+) balance one PO₄³⁻ (3−)."], [t`$\ce{NH4PO4}$`, "One NH₄⁺ (1+) cannot balance PO₄³⁻ (3−)."], [t`$\ce{(NH4)2PO4}$`, "Two ammonium ions give only 2+."], [t`$\ce{NH4(PO4)3}$`, "This has far too much negative charge (9−)."]],
    answer: "A",
    explanation: "Ammonium is NH₄⁺ and phosphate is PO₄³⁻, so three ammonium ions are needed: (NH₄)₃PO₄.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: t`What is the ionic equation for the reaction between aqueous barium chloride and aqueous sodium sulfate?`,
    options: [
      [t`$\ce{Ba^2+(aq) + SO4^2-(aq) -> BaSO4(s)}$`, "Correct: Na⁺ and Cl⁻ are spectator ions; barium sulfate precipitates."],
      [t`$\ce{Na+(aq) + Cl-(aq) -> NaCl(s)}$`, "Sodium chloride is soluble; these are the spectator ions."],
      [t`$\ce{BaCl2(aq) + Na2SO4(aq) -> BaSO4(s) + 2NaCl(aq)}$`, "This is the full equation, not the ionic equation."],
      [t`$\ce{Ba+(aq) + SO4-(aq) -> BaSO4(s)}$`, "The charges are wrong: barium is Ba²⁺ and sulfate is SO₄²⁻."],
    ],
    answer: "A",
    explanation: "Only the barium and sulfate ions change state, forming the white precipitate: Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s).",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which ionic equation is correctly balanced?",
    options: [
      [t`$\ce{2Fe^3+(aq) + Zn(s) -> 2Fe^2+(aq) + Zn^2+(aq)}$`, "Correct: atoms balance, and charge is 6+ on both sides."],
      [t`$\ce{Fe^3+(aq) + Zn(s) -> Fe^2+(aq) + Zn^2+(aq)}$`, "Atoms balance, but the charges do not: 3+ on the left, 4+ on the right."],
      [t`$\ce{Al(s) + Cu^2+(aq) -> Al^3+(aq) + Cu(s)}$`, "Charges do not balance: 2+ on the left, 3+ on the right; it needs 2Al and 3Cu²⁺."],
      [t`$\ce{Ag+(aq) + Cu(s) -> Ag(s) + Cu^2+(aq)}$`, "Charges do not balance: it needs 2Ag⁺ and 2Ag."],
    ],
    answer: "A",
    hints: ["Add up the charges on each side."],
    explanation: "In an ionic equation, the total charge must be the same on both sides. Only 2Fe³⁺ + Zn → 2Fe²⁺ + Zn²⁺ balances (6+ = 6+).",
  });
  {
    const ef = empiricalFormula({ C: 85.7, H: 14.3 });
    same(ef.ratio, { C: 1, H: 2 });
    const mult = 56 / Mr("CH2");
    chk(mult, 4);
    b.mcq({
      d: 2, skill: "APPLICATION",
      stem: "A hydrocarbon contains 85.7% carbon and 14.3% hydrogen by mass, and its Mr is 56. What is its molecular formula? (Ar: H 1.0, C 12.0)",
      options: [[t`$\ce{C4H8}$`, "Correct: empirical formula CH₂ (Mr 14.0); 56 ÷ 14.0 = 4."], [t`$\ce{CH2}$`, "This is the empirical formula; the Mr of 56 shows the molecule is four times larger."], [t`$\ce{C4H10}$`, "C₄H₁₀ has Mr 58 and a C : H ratio of 2 : 5, not 1 : 2."], [t`$\ce{C3H6}$`, "C₃H₆ has the right ratio but an Mr of 42."]],
      answer: "A",
      explanation: "C: 85.7 ÷ 12.0 = 7.14; H: 14.3 ÷ 1.0 = 14.3; ratio 1 : 2, so CH₂ (Mr 14.0). 56 ÷ 14.0 = 4: C₄H₈.",
    });
  }
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which compound has the same empirical formula as ethanoic acid, CH₃COOH?",
    options: [[t`glucose, $\ce{C6H12O6}$`, "Correct: both have the empirical formula CH₂O."], [t`ethanol, $\ce{C2H5OH}$`, "Ethanol is C₂H₆O, which is already in its simplest ratio."], [t`methanoic acid, $\ce{HCOOH}$`, "Methanoic acid is CH₂O₂."], [t`ethanedioic acid, $\ce{HOOCCOOH}$`, "Ethanedioic acid is C₂H₂O₄, empirical formula CHO₂."]],
    answer: "A",
    hints: ["Write the molecular formula of ethanoic acid, then simplify."],
    explanation: "Ethanoic acid is C₂H₄O₂ → CH₂O. Glucose C₆H₁₂O₆ → CH₂O as well.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Statements about the ionic equation for the reaction of solid calcium carbonate with dilute hydrochloric acid:\n\n1. Calcium carbonate is written as CaCO₃(s), not as separate ions.\n2. Chloride ions are spectator ions.\n3. The ionic equation is CO₃²⁻(aq) + 2H⁺(aq) → CO₂(g) + H₂O(l).\n\nWhich of the statements are correct?",
    options: [["1 and 2 only", "Correct: because the carbonate is a solid, the ionic equation is CaCO₃(s) + 2H⁺(aq) → Ca²⁺(aq) + CO₂(g) + H₂O(l)."], ["1, 2 and 3", "Statement 3 would apply to a dissolved carbonate such as Na₂CO₃(aq); here the carbonate is a solid."], ["2 and 3 only", "Statement 1 is correct: solids are not split into ions, and statement 3 is wrong."], ["1 only", "Statement 2 is also correct: Cl⁻(aq) is unchanged."]],
    answer: "A",
    hints: ["Which species are split into ions: solids or aqueous ones?"],
    explanation: "Only aqueous ionic compounds are split. The ionic equation is CaCO₃(s) + 2H⁺(aq) → Ca²⁺(aq) + CO₂(g) + H₂O(l); Cl⁻ is a spectator.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Statements about formulae:\n\n1. The empirical formula of a compound can be the same as its molecular formula.\n2. Two different compounds can have the same empirical formula.\n3. The empirical formula shows the actual number of atoms in a molecule.\n\nWhich of the statements are correct?",
    options: [["1 and 2 only", "Correct: e.g. H₂O (1); ethyne C₂H₂ and benzene C₆H₆ are both CH (2). Statement 3 describes the molecular formula."], ["1, 2 and 3", "Statement 3 describes the molecular formula."], ["2 and 3 only", "Statement 1 is true (water, methane) and statement 3 is false."], ["1 only", "Statement 2 is true: ethyne and benzene share CH."]],
    answer: "A",
    explanation: "Empirical = simplest whole-number ratio; molecular = actual numbers. They coincide for H₂O or CH₄; different compounds such as C₂H₂ and C₆H₆ share CH.",
  });

  // ---- numerical
  {
    const nW = moles(2.86 - 1.06, Mr("H2O"));
    const nS = moles(1.06, Mr("Na2CO3"));
    const x = nW / nS;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "A 2.86 g sample of hydrated sodium carbonate, Na₂CO₃.xH₂O, was heated to constant mass; 1.06 g of anhydrous Na₂CO₃ remained. Calculate x. (Ar: H 1.0, C 12.0, O 16.0, Na 23.0)",
      value: chk(Math.round(x), 10), wrong: [1, 18],
      hints: ["Mass of water = 2.86 − 1.06.", "Compare moles of water with moles of Na₂CO₃."],
      explanation: `Water: 2.86 − 1.06 = 1.80 g = ${sfStr(nW, 3)} mol. Na₂CO₃ (Mr 106.0): 1.06 ÷ 106.0 = ${sfStr(nS, 3)} mol. Ratio ${sfStr(x, 3)}, so x = 10 (washing soda, Na₂CO₃.10H₂O).`,
    });
  }
  {
    const mC = (1.76 * 12.0) / 44.0, mH = (0.900 * 2.0) / 18.0;
    const ef = empiricalFormula({ C: mC, H: mH });
    same(ef.ratio, { C: 2, H: 5 });
    chk(mC + mH, 0.580, 1e-9);
    b.num({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: "0.580 g of a hydrocarbon burns completely to give 1.76 g of carbon dioxide and 0.900 g of water. Its Mr is 58. How many carbon atoms are in one molecule? (Ar: H 1.0, C 12.0, O 16.0)",
      value: 4, wrong: [2, 5],
      hints: ["Mass of C = mass of CO₂ × 12/44; mass of H = mass of H₂O × 2/18.", "Find the empirical formula, then the multiplier."],
      explanation: `C: 1.76 × 12/44 = ${mC.toFixed(3)} g = ${(mC / 12).toFixed(4)} mol; H: 0.900 × 2/18 = ${mH.toFixed(3)} g = ${(mH / 1).toFixed(4)} mol. Ratio 2 : 5, empirical formula C₂H₅ (Mr 29.0). 58 ÷ 29.0 = 2, so C₄H₁₀: four carbon atoms.`,
    });
  }
  {
    const nW = moles(2.44 - 2.08, Mr("H2O"));
    const nS = moles(2.08, Mr("BaCl2"));
    b.num({
      d: 3, skill: "APPLICATION", daily: true, calculator: true,
      stem: "Heating 2.44 g of hydrated barium chloride, BaCl₂.xH₂O, to constant mass leaves 2.08 g of BaCl₂. Calculate x. (Ar: H 1.0, O 16.0, Cl 35.5, Ba 137.3)",
      value: chk(Math.round(nW / nS), 2), wrong: [1, 6],
      hints: ["Find moles of water and moles of BaCl₂, then divide."],
      explanation: `Water lost = 0.36 g = ${sfStr(nW, 3)} mol; BaCl₂ (Mr ${Mr("BaCl2")}) = ${sfStr(nS, 3)} mol; ratio ${sfStr(nW / nS, 3)} → x = 2.`,
    });
  }
  {
    // Mass percentage of water in CuSO4.5H2O
    const pct = (5 * Mr("H2O") / Mr("CuSO4.5H2O")) * 100;
    b.num({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: "Calculate the percentage by mass of water in copper(II) sulfate pentahydrate, CuSO₄.5H₂O. (Ar: H 1.0, O 16.0, S 32.1, Cu 63.5) Give your answer to three significant figures.",
      value: pct, unit: "%", wrong: [(Mr("H2O") / Mr("CuSO4.5H2O")) * 100],
      explanation: `Mr = 249.6; water = 5 × 18.0 = 90.0; 90.0 ÷ 249.6 × 100 = ${sfStr(pct, 3)}%. (Using one H₂O gives ${sfStr((18 / 249.6) * 100, 3)}%.)`,
    });
  }
  // ---- true/false
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: t`In the ionic equation for the neutralisation of aqueous sodium hydroxide by dilute nitric acid, the nitrate ion appears on both sides and is therefore omitted.`,
    answer: true,
    explanation: "True. NO₃⁻ and Na⁺ are spectators; the ionic equation is H⁺(aq) + OH⁻(aq) → H₂O(l).",
  });
  // ---- matching
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each ion with its formula.",
    pairs: [["hydrogencarbonate", t`$\ce{HCO3-}$`], ["phosphate", t`$\ce{PO4^3-}$`], ["ammonium", t`$\ce{NH4+}$`], ["nitrate", t`$\ce{NO3-}$`], ["carbonate", t`$\ce{CO3^2-}$`]],
    explanation: "HCO₃⁻, PO₄³⁻, NH₄⁺, NO₃⁻ and CO₃²⁻ are among the ions both syllabuses expect you to recall.",
  });
  // ---- fill in the blank
  b.fib({
    d: 2, skill: "APPLICATION",
    stem: "Balance the equation for the complete combustion of propane by choosing the coefficients.",
    template: "C₃H₈ + {{blank:a}} O₂ → {{blank:b}} CO₂ + {{blank:c}} H₂O",
    blanks: [
      { id: "a", accepted: ["5"], choices: ["3", "4", "5", "7"] },
      { id: "b", accepted: ["3"], choices: ["1", "2", "3", "4"] },
      { id: "c", accepted: ["4"], choices: ["2", "3", "4", "8"] },
    ],
    explanation: "3 C → 3CO₂; 8 H → 4H₂O; O atoms needed: 3 × 2 + 4 = 10, so 5O₂.",
  });
  // ---- short
  b.short({
    d: 2, skill: "APPLICATION",
    stem: "Give the formula of aluminium nitrate (type it as, for example, Ca(NO3)2).",
    accepted: ["Al(NO3)3", "Al(NO₃)₃"],
    normalise: ["trim", "collapse_whitespace"],
    wrong: ["AlNO3", "Al3NO3"],
    explanation: "Al³⁺ needs three NO₃⁻ ions: Al(NO₃)₃.",
  });
  // ---- self-marked
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Write the full balanced equation, with state symbols, and the ionic equation for the reaction of aqueous silver nitrate with aqueous magnesium chloride.",
    points: ["Correct formulae: AgNO₃, MgCl₂, AgCl, Mg(NO₃)₂", "2AgNO₃(aq) + MgCl₂(aq) → 2AgCl(s) + Mg(NO₃)₂(aq), balanced with state symbols", "Ag⁺(aq) + Cl⁻(aq) → AgCl(s)"],
    modelAnswer: "2AgNO₃(aq) + MgCl₂(aq) → 2AgCl(s) + Mg(NO₃)₂(aq). Ionic equation: Ag⁺(aq) + Cl⁻(aq) → AgCl(s).",
    hints: ["MgCl₂ provides two chloride ions."],
    explanation: "The white precipitate is AgCl; Mg²⁺ and NO₃⁻ are spectators.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "Chipo heats a sample of hydrated copper(II) sulfate in a crucible just once, for two minutes, and uses the mass loss to find x in CuSO₄.xH₂O. Explain how this would affect her value of x and how she should improve the method.",
    points: ["Not all the water may have been removed", "So the mass loss is too small and x is too low", "Heat, cool and reweigh repeatedly until the mass is constant (heat to constant mass)"],
    modelAnswer: "A single short heating may not drive off all the water of crystallisation, so the mass loss is too small and her value of x will be too low. She should heat, cool (in a desiccator) and reweigh, repeating until two successive masses agree, which shows all the water has gone.",
    hints: ["What happens if some water stays?"],
    explanation: "Heat to constant mass.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 2,
    stem: "Define *empirical formula* and *molecular formula*.",
    points: ["Empirical: the simplest whole-number ratio of atoms of each element in a compound", "Molecular: the actual number of atoms of each element in one molecule"],
    modelAnswer: "The empirical formula is the simplest whole-number ratio of the atoms of each element in a compound. The molecular formula gives the actual number of atoms of each element in one molecule.",
    explanation: "One mark for each definition.",
  });
  // ---- practice structured
  {
    const data = { C: 26.7, H: 2.2, O: 71.1 };
    const ef = empiricalFormula(data);
    same(ef.ratio, { C: 1, H: 1, O: 2 });
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: "Ethanedioic acid is found in the leaves of some plants. Analysis shows it contains 26.7% carbon, 2.2% hydrogen and 71.1% oxygen by mass. Its Mr is 90.0. (Ar: H 1.0, C 12.0, O 16.0)",
      parts: [
        P.manual({ label: "(a)", marks: 3, stem: "Calculate the empirical formula, showing your working.", points: ["Moles: C 26.7/12.0 = 2.23; H 2.2/1.0 = 2.2; O 71.1/16.0 = 4.44", "Divide by the smallest: 1 : 1 : 2 (approximately)", "Empirical formula CHO₂"], modelAnswer: "C 2.23, H 2.2, O 4.44 mol; dividing by 2.2 gives 1.01 : 1 : 2.02, so CHO₂." }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate the empirical formula mass.", value: chk(Mr("CHO2"), 45.0), wrong: [29.0], explanation: "12.0 + 1.0 + 32.0 = 45.0." }),
        P.short({ label: "(c)", marks: 1, stem: "Deduce the molecular formula (type it as, for example, C2H4O2).", accepted: ["C2H2O4", "H2C2O4", "(COOH)2", "HOOCCOOH"], normalise: ["trim", "collapse_whitespace"], wrong: ["CHO2"], explanation: "90.0 ÷ 45.0 = 2, so C₂H₂O₄." }),
        P.manual({ label: "(d)", marks: 1, stem: "Ethanedioic acid crystals are a dihydrate. Write the formula of the hydrated acid.", points: ["C₂H₂O₄.2H₂O (or (COOH)₂.2H₂O)"], modelAnswer: "C₂H₂O₄.2H₂O" }),
      ],
      hints: ["Treat percentages as grams in 100 g.", "Multiplier = Mr ÷ empirical formula mass."],
      explanation: "Empirical formula CHO₂ (45.0); molecular formula C₂H₂O₄.",
    });
  }
  {
    const mC = (1.10 * 12.0) / 44.0, mH = (0.450 * 2.0) / 18.0, mO = 0.750 - mC - mH;
    const ef = empiricalFormula({ C: mC, H: mH, O: mO });
    same(ef.ratio, { C: 1, H: 2, O: 1 });
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: "Nyasha burns 0.750 g of an organic compound Y, which contains carbon, hydrogen and oxygen only, in excess oxygen. She collects 1.10 g of carbon dioxide and 0.450 g of water. The Mr of Y is 60.0. (Ar: H 1.0, C 12.0, O 16.0)",
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the mass, in g, of carbon in 0.750 g of Y.", value: mC, unit: "g", wrong: [1.10], explanation: `1.10 × 12.0/44.0 = ${mC.toFixed(3)} g.` }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate the mass, in g, of hydrogen in 0.750 g of Y.", value: mH, unit: "g", wrong: [0.45 / 18], explanation: `0.450 × 2.0/18.0 = ${mH.toFixed(4)} g.` }),
        P.num({ label: "(c)", marks: 1, stem: "Calculate the mass, in g, of oxygen in 0.750 g of Y.", value: mO, unit: "g", wrong: [0.75 - mC], explanation: `0.750 − ${mC.toFixed(3)} − ${mH.toFixed(4)} = ${mO.toFixed(3)} g.` }),
        P.short({ label: "(d)", marks: 2, stem: "Deduce the empirical formula of Y (type it as, for example, C2H6O).", accepted: ["CH2O", "CH₂O"], normalise: ["trim", "collapse_whitespace"], wrong: ["C2H4O2"], explanation: `Moles C ${(mC / 12).toFixed(4)}, H ${(mH / 1).toFixed(4)}, O ${(mO / 16).toFixed(4)}: ratio 1 : 2 : 1, CH₂O.` }),
        P.short({ label: "(e)", marks: 1, stem: "Deduce the molecular formula of Y.", accepted: ["C2H4O2", "C₂H₄O₂", "CH3COOH", "HCOOCH3"], normalise: ["trim", "collapse_whitespace"], wrong: ["CH2O"], explanation: "60.0 ÷ 30.0 = 2: C₂H₄O₂." }),
      ],
      hints: ["All the carbon ends up in CO₂ and all the hydrogen in H₂O.", "Oxygen by difference."],
      explanation: `C ${mC.toFixed(3)} g, H ${mH.toFixed(4)} g, O ${mO.toFixed(3)} g → CH₂O → C₂H₄O₂ (for example ethanoic acid).`,
    });
  }

  // ---- flashcards
  b.card("DEFINITION", "Define **empirical formula**.", "The simplest whole-number ratio of the atoms of each element in a compound.");
  b.card("DEFINITION", "Define **molecular formula**.", "The actual number of atoms of each element in one molecule of a compound.");
  b.card("FACT", "Formulae of hydrogencarbonate, phosphate, ammonium and nitrate ions?", "HCO₃⁻, PO₄³⁻, NH₄⁺, NO₃⁻");
  b.card("CONCEPT", "What is a spectator ion?", "An ion present but unchanged in a reaction; it appears on both sides and is omitted from the ionic equation.");
  b.card("FORMULA", "Masses of C and H from combustion products?", "Mass of C = mass of CO₂ × 12/44; mass of H = mass of H₂O × 2/18; O by difference.");
  b.card("CONCEPT", "How do you find x in a hydrated salt MX.xH₂O?", "Heat to constant mass; water = mass lost; x = moles of water ÷ moles of anhydrous salt.");
  b.card("CONCEPT", "What must balance in an ionic equation?", "Atoms of each element AND total charge.");
  b.card("FORMULA", "Molecular formula from empirical formula?", "Multiplier n = Mr ÷ empirical formula mass; molecular formula = n × empirical formula.");
});
