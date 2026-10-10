// W2b: achem.nitrogen-sulfur.nitrogen-ammonia (both boards; ZIMSEC Form 5, Cambridge AS Level).
import { concept, P, t, Mr, AR, VM_RTP, bondEnergyDH, molesFromSolution, sfStr, chk } from "../lib.mjs";

concept("achem.nitrogen-sulfur.nitrogen-ammonia", { file: "nitrogen-sulfur/nitrogen-ammonia", keyPrefix: "nitrogen-sulfur.nitrogen-ammonia" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the shape of the ammonium ion, NH₄⁺?",
    options: [
      ["tetrahedral", "Correct: four bonding pairs and no lone pair around nitrogen."],
      ["trigonal pyramidal", "This is ammonia, NH₃, which has a lone pair."],
      ["square planar", "Square planar needs two lone pairs as well as four bonding pairs."],
      ["trigonal planar", "This needs only three electron pairs."],
    ],
    answer: "A",
    explanation: "NH₄⁺: four bonding pairs, tetrahedral, 109.5°.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is the best explanation of why nitrogen gas is unreactive?",
    options: [
      ["The N≡N bond is very strong and the molecule is non-polar.", "Correct: high activation energy and no δ+ or δ− sites to attack."],
      ["Nitrogen atoms have a full outer shell, like the noble gases.", "A nitrogen atom has five outer electrons, not a full shell."],
      ["Nitrogen molecules are too small to collide with other molecules.", "Small size does not prevent collisions."],
      ["Nitrogen is the most electronegative element.", "Fluorine and oxygen are more electronegative."],
    ],
    answer: "A",
    explanation: "N≡N 944 kJ mol⁻¹ and zero polarity make reactions very slow under normal conditions.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which test confirms the presence of ammonium ions in a solid?",
    options: [
      ["Warm with aqueous sodium hydroxide; damp red litmus paper turns blue.", "Correct: ammonia gas is released."],
      ["Add dilute hydrochloric acid; the gas given off turns limewater milky.", "This is the test for carbonate."],
      ["Add aqueous silver nitrate; a white precipitate forms.", "This is a test for chloride."],
      ["Add aqueous barium chloride; a white precipitate forms.", "This is a test for sulfate."],
    ],
    answer: "A",
    explanation: "NH₄⁺ + OH⁻ → NH₃ + H₂O; NH₃ turns damp red litmus blue.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements about the formation of the ammonium ion from ammonia are correct?\n\n1. The nitrogen lone pair forms a dative bond to a hydrogen ion.\n2. The H–N–H bond angle increases slightly.\n3. The new N–H bond is longer and weaker than the other three.",
    options: [
      ["1 and 2 only", "Correct: once formed, all four N–H bonds are identical."],
      ["1, 2 and 3", "Statement 3 is false: the four bonds cannot be told apart."],
      ["2 and 3 only", "Statement 1 is true and statement 3 is false."],
      ["1 only", "Statement 2 is also true: the lone pair becomes a bonding pair."],
    ],
    answer: "A",
    hints: ["Can you tell which hydrogen arrived last?"],
    explanation: "A dative bond, once formed, is the same as any other covalent bond.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "In the reaction NH₄⁺(aq) + OH⁻(aq) → NH₃(g) + H₂O(l), what role does the ammonium ion play?",
    options: [
      ["a Brønsted-Lowry acid", "Correct: it donates a proton to the hydroxide ion."],
      ["a Brønsted-Lowry base", "It loses a proton, so it is acting as an acid."],
      ["an oxidising agent", "No oxidation numbers change."],
      ["a reducing agent", "No oxidation numbers change."],
    ],
    answer: "A",
    hints: ["Follow the H⁺."],
    explanation: "NH₄⁺ (acid) → NH₃ (its conjugate base); OH⁻ (base) → H₂O.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which substance should be used to dry ammonia gas?",
    options: [
      ["calcium oxide", "Correct: a basic drying agent that does not react with ammonia."],
      ["concentrated sulfuric acid", "Ammonia, a base, would react with the acid."],
      ["anhydrous calcium chloride", "Calcium chloride absorbs ammonia, forming a complex."],
      ["phosphorus(V) oxide", "P₄O₁₀ is an acidic oxide and would react with ammonia."],
    ],
    answer: "A",
    hints: ["Ammonia is a base."],
    explanation: "Only a basic drying agent (CaO) leaves ammonia untouched.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A farmer spreads ammonium sulfate fertiliser on a field that was limed with calcium hydroxide the day before. Which is the most likely result?",
    options: [
      ["Some nitrogen is lost as ammonia gas.", "Correct: hydroxide ions displace ammonia from ammonium ions."],
      ["The soil becomes much more acidic.", "Calcium hydroxide neutralises acidity."],
      ["Insoluble calcium nitrate forms and locks up the nitrogen.", "Calcium nitrate is soluble, and nitrate is not formed here."],
      ["Nitrogen gas is released from the fertiliser.", "Nitrogen is not released; ammonia is."],
    ],
    answer: "A",
    hints: ["What happens when an ammonium salt meets an alkali?"],
    explanation: "2NH₄⁺ + Ca(OH)₂ → Ca²⁺ + 2NH₃ + 2H₂O: fertiliser nitrogen escapes as NH₃.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What is seen when a stopper soaked in concentrated hydrochloric acid is held near an open bottle of concentrated ammonia solution?",
    options: [
      ["dense white smoke", "Correct: solid ammonium chloride forms."],
      ["brown fumes", "Brown fumes would be NO₂ or bromine."],
      ["a yellow-green gas", "That would be chlorine."],
      ["no visible change", "The two gases react immediately."],
    ],
    answer: "A",
    explanation: "NH₃(g) + HCl(g) → NH₄Cl(s), a white smoke of tiny crystals.",
  });
  {
    const pct = ((2 * AR.N) / 132.1) * 100;
    b.num({
      d: 2, skill: "APPLICATION", calculator: true, daily: true,
      stem: "Calculate the percentage by mass of nitrogen in ammonium sulfate, (NH₄)₂SO₄, to three significant figures. (Mr (NH₄)₂SO₄ 132.1; Ar N 14.0)",
      value: pct, sf: 3, unit: "%",
      wrong: [sfStr((AR.N / 132.1) * 100, 3)],
      explanation: `There are two N atoms: 2 × 14.0 ÷ 132.1 × 100 = ${sfStr(pct, 3)}%. Counting one N gives ${sfStr((AR.N / 132.1) * 100, 3)}%.`,
    });
  }
  {
    const n = 3.3 / Mr("(NH4)2SO4");
    const v = n * 2 * VM_RTP;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "3.30 g of ammonium sulfate is warmed with excess aqueous sodium hydroxide. Calculate the volume of ammonia released, in dm³ at room conditions, to three significant figures. (Mr (NH₄)₂SO₄ 132.1; molar gas volume 24.0 dm³ mol⁻¹)",
      value: v, sf: 3, unit: "dm³",
      wrong: [sfStr(v / 2, 3)],
      hints: ["Each formula unit contains two NH₄⁺ ions."],
      explanation: `1. n((NH₄)₂SO₄) = 3.30 ÷ 132.1 = ${sfStr(n, 3)} mol.\n2. n(NH₃) = 2 × ${sfStr(n, 3)} = ${sfStr(2 * n, 3)} mol.\n3. V = ${sfStr(2 * n, 3)} × 24.0 = ${sfStr(v, 3)} dm³. Forgetting the 2 gives ${sfStr(v / 2, 3)} dm³.`,
    });
  }
  {
    const n = 0.6 / VM_RTP;
    const m = n * Mr("NH4Cl");
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "0.600 dm³ of ammonia (room conditions) reacts completely with hydrogen chloride. Calculate the mass of ammonium chloride formed, in g, to three significant figures. (Mr: NH₃ 17.0, HCl 36.5; molar gas volume 24.0 dm³ mol⁻¹)",
      value: m, sf: 3, unit: "g",
      wrong: [sfStr(0.6 * Mr("NH4Cl"), 3)],
      hints: ["Convert the volume to moles first."],
      explanation: `1. n(NH₃) = 0.600 ÷ 24.0 = ${sfStr(n, 3)} mol.\n2. NH₃ + HCl → NH₄Cl (1 : 1).\n3. Mr(NH₄Cl) = 17.0 + 36.5 = ${Mr("NH4Cl")}; mass = ${sfStr(n, 3)} × ${Mr("NH4Cl")} = ${sfStr(m, 3)} g. Multiplying the volume by Mr gives ${sfStr(0.6 * Mr("NH4Cl"), 3)} g.`,
    });
  }
  {
    const dH = bondEnergyDH([[1, 944], [3, 436]], [[6, 390]]);
    b.calc({
      d: 4, skill: "ANALYSIS",
      stem: "Use bond energies to estimate ΔH, in kJ mol⁻¹, for N₂(g) + 3H₂(g) → 2NH₃(g). Bond energies (kJ mol⁻¹): N≡N 944, H–H 436, N–H 390.",
      value: dH, unit: "kJ/mol",
      wrong: [944 + 3 * 436 - 3 * 390, -dH],
      hints: ["Two NH₃ molecules contain six N–H bonds."],
      explanation: `1. Broken: 944 + 3 × 436 = ${944 + 3 * 436} kJ.\n2. Made: 6 × 390 = ${6 * 390} kJ.\n3. ΔH = ${944 + 3 * 436} − ${6 * 390} = ${dH} kJ mol⁻¹. Although the reaction is exothermic, breaking the 944 kJ mol⁻¹ triple bond gives a very high activation energy, so a catalyst and high temperature are needed. Counting only three N–H bonds gives ${944 + 3 * 436 - 3 * 390}.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Ammonia is a weak base because only a small fraction of the dissolved ammonia molecules accept protons from water.",
    answer: true,
    explanation: "True. NH₃ + H₂O ⇌ NH₄⁺ + OH⁻ lies well to the left.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each species with its shape.",
    pairs: [
      [t`$\ce{NH3}$`, "trigonal pyramidal, about 107°"],
      [t`$\ce{NH4+}$`, "tetrahedral, 109.5°"],
      [t`$\ce{N2}$`, "linear"],
    ],
    extraRight: ["bent, about 104.5°"],
    explanation: "A bent shape with 104.5° is water.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Complete the description of nitrogen fixation.",
    template: "In a lightning flash, nitrogen and oxygen combine to form {{blank:a}}. Bacteria in the root nodules of {{blank:b}} convert nitrogen into {{blank:c}} compounds. Industrially, nitrogen is fixed as ammonia by the {{blank:d}} process.",
    blanks: [
      { id: "a", accepted: ["nitrogen monoxide"], choices: ["nitrogen monoxide", "ammonia", "nitrogen dioxide"] },
      { id: "b", accepted: ["legumes"], choices: ["legumes", "maize", "sorghum"] },
      { id: "c", accepted: ["ammonium"], choices: ["ammonium", "nitrite", "cyanide"] },
      { id: "d", accepted: ["Haber"], choices: ["Haber", "Contact", "Bayer"] },
    ],
    hints: ["Groundnuts and beans are legumes."],
    explanation: "Lightning: N₂ + O₂ → 2NO; legume bacteria: ammonium compounds; Haber: N₂ + 3H₂ ⇌ 2NH₃.",
  });
  b.short({
    d: 2, skill: "APPLICATION",
    stem: "Write the ionic equation for the reaction that releases ammonia when an ammonium salt is warmed with an alkali (type, e.g., A + B -> C + D).",
    accepted: ["NH4+ + OH- -> NH3 + H2O", "NH4+ + OH- → NH3 + H2O", "NH4+(aq) + OH-(aq) -> NH3(g) + H2O(l)", "NH₄⁺ + OH⁻ → NH₃ + H₂O", "OH- + NH4+ -> NH3 + H2O"],
    normalise: ["trim", "collapse_whitespace"],
    wrong: ["NH4Cl + NaOH -> NaCl + NH3 + H2O"],
    explanation: "NH₄⁺(aq) + OH⁻(aq) → NH₃(g) + H₂O(l).",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe how an ammonium ion is formed from ammonia and explain its shape.",
    points: [
      "The lone pair on the nitrogen of NH₃ is donated to H⁺ (which has an empty orbital)",
      "forming a dative (coordinate) bond, giving NH₄⁺ with four bonding pairs and no lone pairs",
      "The four bonding pairs repel equally, so the ion is tetrahedral with bond angles of 109.5°",
    ],
    modelAnswer: "Ammonia's nitrogen atom has a lone pair, which it donates to a hydrogen ion with an empty 1s orbital, forming a dative (coordinate) bond. NH₄⁺ then has four bonding pairs and no lone pairs around nitrogen; these repel equally, giving a regular tetrahedron with bond angles of 109.5°.",
    hints: ["Start with the lone pair on nitrogen."],
    explanation: "Dative bond, then VSEPR.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why nitrogen gas is unreactive.",
    points: [
      "The N≡N triple bond is very strong (944 kJ mol⁻¹), so reactions have a very high activation energy",
      "The molecule is non-polar, so it has no δ+ or δ− sites to attract other reagents",
    ],
    modelAnswer: "The triple bond between the two nitrogen atoms is very strong, so a great deal of energy is needed to start any reaction (high activation energy). The molecule is also non-polar, with no partial charges to attract electrophiles or nucleophiles.",
    hints: ["Two reasons."],
    explanation: "Bond strength and lack of polarity.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Describe how you would prepare and collect a dry sample of ammonia in the laboratory, explaining each choice.",
    points: [
      "Heat a mixture of ammonium chloride and calcium hydroxide (2NH₄Cl + Ca(OH)₂ → CaCl₂ + 2NH₃ + 2H₂O)",
      "Dry the gas by passing it through calcium oxide (a basic drying agent that does not react with ammonia)",
      "Collect by upward delivery (into an inverted container) because ammonia is less dense than air (not over water, as it is very soluble)",
      "Work in a fume cupboard and test for a full container with damp red litmus (turns blue)",
    ],
    modelAnswer: "Heat a mixture of solid ammonium chloride and calcium hydroxide: 2NH₄Cl + Ca(OH)₂ → CaCl₂ + 2NH₃ + 2H₂O. Pass the gas through a tower of calcium oxide to dry it; acidic drying agents would react with ammonia. Collect it by upward delivery in an inverted gas jar, because ammonia is less dense than air and too soluble to collect over water. Do this in a fume cupboard and use damp red litmus paper at the mouth of the jar to show when it is full.",
    hints: ["Reagents, drying agent, collection method, safety."],
    explanation: "Each step follows from a property of ammonia.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: "Sipho analysed a sample of fertiliser containing ammonium sulfate. He warmed 1.50 g of fertiliser with 50.0 cm³ of 0.500 mol dm⁻³ sodium hydroxide (an excess) until no more ammonia was given off. After cooling, the remaining sodium hydroxide needed 24.20 cm³ of 0.500 mol dm⁻³ hydrochloric acid for neutralisation.",
    parts: (() => {
      const nOH = molesFromSolution(50, 0.5);
      const nLeft = molesFromSolution(24.2, 0.5);
      const used = nOH - nLeft;
      const mN = used * AR.N;
      const pct = (mN / 1.5) * 100;
      return [
        P.short({ label: "(a)", marks: 1, stem: "Write the ionic equation for the reaction of the ammonium ions with sodium hydroxide (type, e.g., A + B -> C + D).", accepted: ["NH4+ + OH- -> NH3 + H2O", "NH4+ + OH- → NH3 + H2O", "NH₄⁺ + OH⁻ → NH₃ + H₂O"], normalise: ["trim", "collapse_whitespace"], wrong: ["NH3 + H2O -> NH4+ + OH-"], explanation: "NH₄⁺ + OH⁻ → NH₃ + H₂O." }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate the amount, in mol, of NaOH added.", value: nOH, sf: 3, unit: "mol", explanation: `50.0 ÷ 1000 × 0.500 = ${sfStr(nOH, 3)} mol.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the amount, in mol, of NaOH that reacted with the ammonium ions, to three significant figures.", value: used, sf: 3, unit: "mol", wrong: [sfStr(nLeft, 3)], explanation: `Left over = 24.20 ÷ 1000 × 0.500 = ${sfStr(nLeft, 3)} mol; used = ${sfStr(nOH, 3)} − ${sfStr(nLeft, 3)} = ${sfStr(used, 3)} mol.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the percentage by mass of nitrogen (as ammonium) in the fertiliser, to three significant figures. (Ar N 14.0)", value: pct, sf: 3, unit: "%", wrong: [sfStr((used * 2 * AR.N / 1.5) * 100, 3)], explanation: `n(NH₄⁺) = n(OH⁻ used) = ${sfStr(used, 3)} mol = n(N); mass N = ${sfStr(used, 3)} × 14.0 = ${sfStr(mN, 3)} g; ${sfStr(mN, 3)} ÷ 1.50 × 100 = ${sfStr(pct, 3)}%. Doubling (thinking two N per OH⁻) gives ${sfStr((used * 2 * AR.N / 1.5) * 100, 3)}%.` }),
        P.manual({ label: "(e)", marks: 1, stem: "Explain why the mixture must be warmed until no more ammonia is given off before the titration.", points: ["All the ammonia must be driven off; otherwise dissolved NH₃ would also be neutralised by the HCl, making the titre too large / the NH₄⁺ result too low"], modelAnswer: "Any ammonia still dissolved would react with the hydrochloric acid in the titration, increasing the titre and making the calculated ammonium content too low." }),
        P.manual({ label: "(f)", marks: 1, stem: "Suggest how Sipho could show that no more ammonia was being given off.", points: ["Hold damp red litmus paper in the vapour: it no longer turns blue"], modelAnswer: "Hold damp red litmus paper at the mouth of the flask; when it stays red, all the ammonia has gone." }),
      ];
    })(),
    hints: ["NaOH used by NH₄⁺ = NaOH added − NaOH left over.", "One NH₄⁺ reacts with one OH⁻."],
    explanation: "Back titration: moles of OH⁻ used = moles of NH₄⁺ = moles of N.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true,
    stem: "Ammonia, NH₃, and the ammonium ion, NH₄⁺, are closely related species.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Write an equation to show ammonia acting as a Brønsted-Lowry base in water, and identify the acid in this reaction.", points: ["NH₃ + H₂O ⇌ NH₄⁺ + OH⁻", "Water is the acid (proton donor)"], modelAnswer: "NH₃(aq) + H₂O(l) ⇌ NH₄⁺(aq) + OH⁻(aq); water donates the proton, so it is the acid." }),
      P.num({ label: "(b)", marks: 1, stem: "State the H–N–H bond angle in NH₄⁺, in degrees.", value: 109.5, dp: 1, wrong: [107], explanation: "Tetrahedral: 109.5°." }),
      P.mcq({ label: "(c)", stem: "Why is the H–N–H angle in NH₃ smaller than in NH₄⁺?", options: [
        ["The lone pair in NH₃ repels more than a bonding pair.", "Correct: lone pair-bond pair repulsion is greater."],
        ["NH₃ has fewer electrons, so the bonds are closer together.", "The number of electrons does not set the angle."],
        ["The N–H bonds in NH₃ are longer than those in NH₄⁺.", "Bond length does not explain the change in angle."],
        ["NH₄⁺ is positively charged, so its bonds repel less.", "The charge does not explain the 2.5° difference."],
      ], answer: "A", explanation: "Lone pairs repel more strongly than bonding pairs, squeezing the angle to about 107°." }),
      P.short({ label: "(d)", marks: 1, stem: "Name the type of bond formed when NH₃ reacts with H⁺.", accepted: ["dative", "dative bond", "coordinate", "coordinate bond", "dative covalent", "dative covalent bond", "co-ordinate bond"], wrong: ["ionic"], explanation: "A dative (coordinate) covalent bond." }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain why a 0.1 mol dm⁻³ solution of ammonia has a pH of about 11 rather than 13.", points: ["Ammonia is a weak base: only partly reacts with water (equilibrium lies to the left)", "so [OH⁻] is much less than 0.1 mol dm⁻³ (a strong base would give pH 13)"], modelAnswer: "Ammonia is a weak base: the equilibrium NH₃ + H₂O ⇌ NH₄⁺ + OH⁻ lies well to the left, so [OH⁻] is far below 0.1 mol dm⁻³ and the pH is about 11, not 13 as for a strong base." }),
      P.tf({ label: "(f)", stem: "Ammonium chloride solution is slightly acidic.", answer: true, explanation: "True: NH₄⁺ is a weak acid, NH₄⁺ ⇌ NH₃ + H⁺." }),
    ],
    hints: ["Follow the proton.", "Lone pairs repel more than bonding pairs."],
    explanation: "Ammonia is a weak Brønsted-Lowry base; NH₄⁺ is tetrahedral and weakly acidic.",
  });
  b.card("CONCEPT", "Why N₂ is unreactive", "Very strong N≡N bond (944 kJ mol⁻¹) → high activation energy; non-polar molecule → no sites for attack.");
  b.card("FORMULA", "Ammonia as a base", "NH₃ + H₂O ⇌ NH₄⁺ + OH⁻ (weak base, equilibrium to the left).");
  b.card("FACT", "Ammonium ion", "Dative bond from N lone pair to H⁺; tetrahedral, 109.5°; all four N–H bonds identical.");
  b.card("FORMULA", "Displacing ammonia", "NH₄⁺ + OH⁻ → NH₃ + H₂O on warming: an acid-base reaction.");
  b.card("FACT", "Test for NH₄⁺", "Warm with NaOH(aq): gas turns damp red litmus blue (ammonia).");
  b.card("FACT", "Laboratory preparation of ammonia", "Heat NH₄Cl with Ca(OH)₂; dry with CaO; collect by upward delivery (less dense than air).");
  b.card("FACT", "Nitrogen fixation", "Lightning (N₂ + O₂ → 2NO), bacteria in legume root nodules, and the Haber process.");
  b.card("CONCEPT", "Do not mix ammonium fertiliser with lime", "OH⁻ from lime displaces NH₃, so nitrogen is lost as ammonia gas.");
});
