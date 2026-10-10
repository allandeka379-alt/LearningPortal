// W2a: achem.acids.bronsted-lowry (both boards; ZIMSEC Form 5, Cambridge AS Level; conjugate pairs Cambridge A Level)
import { concept, P, t, ce, molesFromSolution, VM_RTP, pH, pHWeakAcid, sfStr, dpStr, rnd } from "../lib.mjs";

concept("achem.acids.bronsted-lowry", { file: "acids/bronsted-lowry", keyPrefix: "acids.bronsted-lowry" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is the Brønsted-Lowry definition of a base?",
    options: [
      ["a proton acceptor", "Correct: a Brønsted-Lowry base accepts H⁺, using a lone pair."],
      ["a proton donor", "That defines a Brønsted-Lowry acid."],
      ["a substance that produces hydroxide ions in water", "That is the older (Arrhenius) idea of an alkali; it is too narrow."],
      ["an electron-pair acceptor", "That is a Lewis acid, not a Brønsted-Lowry base."],
    ],
    answer: "A",
    explanation: "Brønsted-Lowry: acids donate protons, bases accept them.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: t`In the reaction $\ce{HCO3-(aq) + H2O(l) <=> H2CO3(aq) + OH-(aq)}$, which species acts as a Brønsted-Lowry base in the forward direction?`,
    options: [
      [t`$\ce{HCO3-}$`, "Correct: HCO₃⁻ accepts a proton from water and becomes H₂CO₃."],
      [t`$\ce{H2O}$`, "Water donates a proton here, so it is the acid."],
      [t`$\ce{H2CO3}$`, "H₂CO₃ is the conjugate acid formed; it acts as an acid in the reverse direction."],
      [t`$\ce{OH-}$`, "OH⁻ is a base, but only in the reverse direction."],
    ],
    answer: "A",
    explanation: "HCO₃⁻ gains H⁺ (base); H₂O loses H⁺ (acid). The conjugate pairs are H₂CO₃/HCO₃⁻ and H₂O/OH⁻.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: t`What is the conjugate base of sulfuric acid, $\ce{H2SO4}$?`,
    options: [
      [t`$\ce{HSO4-}$`, "Correct: removing one proton from H₂SO₄ gives HSO₄⁻."],
      [t`$\ce{SO4^2-}$`, "This differs from H₂SO₄ by two protons; conjugate pairs differ by one."],
      [t`$\ce{H3SO4+}$`, "This is what you get by adding a proton: a conjugate acid, not base."],
      [t`$\ce{SO3}$`, "Removing water is not proton loss; SO₃ is the acid anhydride."],
    ],
    answer: "A",
    explanation: "A conjugate base is the acid minus one H⁺: H₂SO₄ → HSO₄⁻.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which of these is a weak acid?",
    options: [
      ["ethanoic acid", "Correct: ethanoic acid is only partially dissociated in water."],
      ["nitric acid", "Nitric acid is fully dissociated: strong."],
      ["hydrochloric acid", "Hydrochloric acid is fully dissociated: strong."],
      ["sulfuric acid", "Sulfuric acid is strong (its first proton is fully donated)."],
    ],
    answer: "A",
    explanation: "Of the common laboratory acids, ethanoic acid is the weak one.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Solutions of hydrochloric acid and ethanoic acid, each 0.10 mol dm⁻³, are compared at the same temperature. Which statements are correct?\n\n1. The hydrochloric acid has the lower pH.\n2. The hydrochloric acid conducts electricity better.\n3. With excess magnesium, equal volumes of the two acids give equal total volumes of hydrogen.",
    options: [
      ["1, 2 and 3", "Correct: HCl gives a higher [H⁺] and more ions, but both acids can eventually release the same number of protons."],
      ["1 and 2 only", "Statement 3 is also true: the ethanoic acid equilibrium moves right as H⁺ is used up."],
      ["2 and 3 only", "Statement 1 is also true: higher [H⁺] means lower pH."],
      ["1 only", "Statements 2 and 3 are also correct."],
    ],
    answer: "A",
    hints: ["Separate how fast the acids react from how much they can react in total."],
    explanation: "Equal concentrations, different extents of dissociation: HCl has lower pH, higher conductivity and reacts faster, but the same amount of each monobasic acid gives the same amount of H₂.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements about water are correct?\n\n1. Water acts as a Brønsted-Lowry base when hydrogen chloride dissolves in it.\n2. Water acts as a Brønsted-Lowry acid when ammonia dissolves in it.\n3. The conjugate acid of water is the hydroxide ion.",
    options: [
      ["1 and 2 only", "Correct: water is amphoteric; its conjugate acid is H₃O⁺ and its conjugate base is OH⁻."],
      ["1, 2 and 3", "Statement 3 is wrong: OH⁻ is the conjugate base of water."],
      ["2 and 3 only", "Statement 1 is true and statement 3 is false."],
      ["1 only", "Statement 2 is also true: water donates H⁺ to NH₃."],
    ],
    answer: "A",
    hints: ["Add H⁺ to water to get its conjugate acid."],
    explanation: "HCl + H₂O → H₃O⁺ + Cl⁻ (water is a base); NH₃ + H₂O ⇌ NH₄⁺ + OH⁻ (water is an acid). H₃O⁺ is water's conjugate acid; OH⁻ is its conjugate base.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: t`Which pair is a conjugate acid-base pair?`,
    options: [
      [t`$\ce{H2PO4-}$ and $\ce{HPO4^2-}$`, "Correct: they differ by exactly one proton."],
      [t`$\ce{H3PO4}$ and $\ce{HPO4^2-}$`, "These differ by two protons."],
      [t`$\ce{NH4+}$ and $\ce{NH2-}$`, "These differ by two protons; NH₄⁺/NH₃ is a pair."],
      [t`$\ce{H3O+}$ and $\ce{OH-}$`, "These differ by two protons; each pairs with H₂O."],
    ],
    answer: "A",
    hints: ["Count the hydrogen ions difference."],
    explanation: "A conjugate pair differs by one H⁺ only: H₂PO₄⁻ ⇌ HPO₄²⁻ + H⁺.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: t`For $\ce{H2PO4-(aq) + NH3(aq) <=> HPO4^2-(aq) + NH4+(aq)}$, which shows the two conjugate acid-base pairs correctly (acid written first)?`,
    options: [
      [t`$\ce{H2PO4-}$/$\ce{HPO4^2-}$ and $\ce{NH4+}$/$\ce{NH3}$`, "Correct: H₂PO₄⁻ donates H⁺ to NH₃; each pair differs by one proton."],
      [t`$\ce{H2PO4-}$/$\ce{NH3}$ and $\ce{HPO4^2-}$/$\ce{NH4+}$`, "These pair reactants with each other; conjugates are on opposite sides of the equation."],
      [t`$\ce{HPO4^2-}$/$\ce{H2PO4-}$ and $\ce{NH3}$/$\ce{NH4+}$`, "Right pairs but the acid and base are written the wrong way round in each."],
      [t`$\ce{NH3}$/$\ce{HPO4^2-}$ and $\ce{NH4+}$/$\ce{H2PO4-}$`, "Neither of these pairs differs by one proton."],
    ],
    answer: "A",
    hints: ["Find which species loses H⁺ and which gains it."],
    explanation: "Acid 1 H₂PO₄⁻ → base 1 HPO₄²⁻; base 2 NH₃ → acid 2 NH₄⁺.",
  });
  {
    const n = molesFromSolution(25.0, 0.2);
    const v = n * VM_RTP * 1000;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`25.0 cm³ of 0.200 mol dm⁻³ sulfuric acid reacts with excess magnesium: $\ce{Mg(s) + H2SO4(aq) -> MgSO4(aq) + H2(g)}$. Calculate the volume of hydrogen, in cm³ at room conditions, to three significant figures. (molar gas volume 24.0 dm³ mol⁻¹)`,
      value: v, sf: 3, unit: "cm³",
      wrong: [sfStr(v / 2, 3), sfStr(v / 1000, 3)],
      hints: ["How many moles of H₂ come from one mole of H₂SO₄?"],
      explanation: `n(H₂SO₄) = 25.0/1000 × 0.200 = ${sfStr(n, 3)} mol; 1 mol H₂SO₄ gives 1 mol H₂, so V = ${sfStr(n, 3)} × 24 000 = ${sfStr(v, 3)} cm³. Treating it as a monobasic acid (Mg + 2H⁺ with only one H⁺ per acid) gives ${sfStr(v / 2, 3)} cm³; leaving the answer in dm³ gives ${sfStr(v / 1000, 3)}.`,
    });
  }
  {
    const nOH = molesFromSolution(22.0, 0.12);
    const vAcid = (nOH / 2 / 0.1) * 1000;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Calculate the volume, in cm³, of 0.100 mol dm⁻³ sulfuric acid needed to neutralise 22.0 cm³ of 0.120 mol dm⁻³ potassium hydroxide: $\ce{2KOH + H2SO4 -> K2SO4 + 2H2O}$.`,
      value: vAcid, sf: 3, unit: "cm³",
      wrong: [sfStr(vAcid * 2, 3)],
      hints: ["Use the 2 : 1 ratio of KOH to H₂SO₄."],
      explanation: `1. n(KOH) = 22.0/1000 × 0.120 = ${sfStr(nOH, 3)} mol.\n2. n(H₂SO₄) = ${sfStr(nOH, 3)} ÷ 2 = ${sfStr(nOH / 2, 3)} mol.\n3. V = ${sfStr(nOH / 2, 3)} ÷ 0.100 × 1000 = ${sfStr(vAcid, 3)} cm³. Ignoring the 2 : 1 ratio gives ${sfStr(vAcid * 2, 3)} cm³.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A dilute solution of a strong acid contains a higher proportion of undissociated acid molecules than a concentrated solution of the same strong acid.",
    answer: false,
    explanation: "False. A strong acid is fully dissociated at any normal concentration; 'dilute' refers to the amount dissolved, not to the extent of dissociation.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Ammonia gas reacting with hydrogen chloride gas to form ammonium chloride is a Brønsted-Lowry acid-base reaction.",
    answer: true,
    explanation: "True. HCl donates a proton to NH₃, forming NH₄⁺ and Cl⁻; no water is needed for the Brønsted-Lowry definition.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    stem: "Match each species with its conjugate base.",
    pairs: [
      [t`$\ce{H3O+}$`, t`$\ce{H2O}$`],
      [t`$\ce{H2O}$`, t`$\ce{OH-}$`],
      [t`$\ce{NH4+}$`, t`$\ce{NH3}$`],
      [t`$\ce{CH3COOH}$`, t`$\ce{CH3COO-}$`],
    ],
    extraRight: [t`$\ce{O^2-}$`],
    hints: ["Remove one H⁺ from each species."],
    explanation: "Each conjugate base is the acid minus one proton. O²⁻ would be the conjugate base of OH⁻, not of water.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences about acid strength.",
    template: "A strong acid is {{blank:a}} dissociated in water. Ethanoic acid is a {{blank:b}} acid, so a 0.10 mol dm⁻³ solution has a {{blank:c}} pH than 0.10 mol dm⁻³ nitric acid.",
    blanks: [
      { id: "a", accepted: ["fully"], choices: ["fully", "partially", "not"] },
      { id: "b", accepted: ["weak"], choices: ["weak", "strong", "dilute"] },
      { id: "c", accepted: ["higher"], choices: ["higher", "lower", "the same"] },
    ],
    explanation: "Strong = fully dissociated. Ethanoic acid is weak, so its [H⁺] is lower and its pH higher at the same concentration.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Write the formula of the ion formed when a water molecule accepts a proton.",
    accepted: ["H3O+", "H₃O⁺", "H3O⁺", "H₃O+", "[H3O]+"],
    normalise: ["trim", "collapse_whitespace"],
    wrong: ["OH-"],
    explanation: "The oxonium (hydronium) ion, H₃O⁺, usually written H⁺(aq).",
  });
  b.short({
    d: 3, skill: "APPLICATION",
    stem: t`In concentrated mixtures, $\ce{HNO3 + H2SO4 <=> H2NO3+ + HSO4-}$. Name the substance that acts as a Brønsted-Lowry base in the forward reaction.`,
    accepted: ["nitric acid", "HNO3", "HNO₃", "nitric(V) acid"],
    wrong: ["sulfuric acid"],
    hints: ["Which species gains a proton?"],
    explanation: "HNO₃ accepts a proton from the stronger acid H₂SO₄, so here nitric acid behaves as a base.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain the difference between a *strong* acid and a *concentrated* acid.",
    points: ["Strong: fully dissociated into ions in aqueous solution (extent of dissociation)", "Concentrated: a large amount of acid dissolved per unit volume (e.g. per dm³)"],
    modelAnswer: "'Strong' describes the extent of dissociation: a strong acid is completely dissociated into ions in water. 'Concentrated' describes how much acid is dissolved per dm³ of solution. A dilute strong acid and a concentrated weak acid are both possible.",
    explanation: "Strength and concentration are independent properties.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Magnesium ribbon reacts more slowly with 1.0 mol dm⁻³ ethanoic acid than with 1.0 mol dm⁻³ hydrochloric acid, but with excess magnesium the same total volume of hydrogen is produced from equal volumes. Explain both observations.",
    points: ["Ethanoic acid is only partially dissociated, so [H⁺] is lower and the rate is slower", "Both are monobasic and contain the same amount of acid", "As H⁺ is used up, the ethanoic acid equilibrium (CH₃COOH ⇌ CH₃COO⁻ + H⁺) moves right, so eventually all its protons react"],
    modelAnswer: "Ethanoic acid is weak: only a small fraction of its molecules is dissociated, so [H⁺(aq)] is much lower and there are fewer collisions of H⁺ with magnesium per second. However, both solutions contain the same amount of monobasic acid. As H⁺ ions are removed, the equilibrium CH₃COOH ⇌ CH₃COO⁻ + H⁺ moves to the right, releasing more H⁺, until all the acid has reacted, so the same total volume of hydrogen is produced.",
    hints: ["Rate depends on [H⁺]; total amount depends on moles of acid."],
    explanation: "Weak acids react more slowly but completely with excess metal.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why hydrochloric acid is a strong acid but the chloride ion is a very weak base.",
    points: ["HCl donates its proton completely (full dissociation); the reaction lies entirely to the right", "So Cl⁻ has almost no tendency to accept a proton back: the stronger the acid, the weaker its conjugate base"],
    modelAnswer: "HCl is completely dissociated, so the reverse reaction Cl⁻ + H⁺ → HCl hardly occurs: Cl⁻ has almost no tendency to accept a proton. A strong acid always has a very weak conjugate base.",
    hints: ["Think about the reverse reaction."],
    explanation: "Strong acid ↔ weak conjugate base.",
  });
  {
    const pHs = pH(0.15);
    const pHw = rnd(pHWeakAcid(1.74e-5, 0.15), 1);
    const n = molesFromSolution(20.0, 0.15);
    const v = (n / 2) * VM_RTP * 1000;
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: t`Tatenda compared two acids, each at 0.150 mol dm⁻³. In each test she used 20.0 cm³ of acid at 25 °C.

| Test | hydrochloric acid | ethanoic acid |
|---|---|---|
| pH (meter) | ${dpStr(pHs, 1)} | ${dpStr(pHw, 1)} |
| conductivity (relative) | high | low |
| reaction with 0.5 g magnesium ribbon (excess) | fast fizzing | slow fizzing |`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the total volume of hydrogen, in cm³ at room conditions, produced by each acid with excess magnesium. (molar gas volume 24.0 dm³ mol⁻¹)", value: v, sf: 3, unit: "cm³", wrong: [sfStr(n * VM_RTP * 1000, 3)], explanation: `n(acid) = ${sfStr(n, 3)} mol; Mg + 2H⁺ → Mg²⁺ + H₂, so n(H₂) = ${sfStr(n / 2, 3)} mol; V = ${sfStr(v, 3)} cm³ for each acid. Forgetting the 2 : 1 ratio gives ${sfStr(n * VM_RTP * 1000, 3)} cm³.` }),
        P.manual({ label: "(b)", marks: 2, stem: "Explain why the two acids give the same total volume of hydrogen.", points: ["Same amount of monobasic acid in each sample", "In ethanoic acid, the dissociation equilibrium moves right as H⁺ is removed, so all of the acid eventually reacts"], modelAnswer: "Both samples contain the same amount (0.00300 mol) of a monobasic acid. As magnesium removes H⁺ from the ethanoic acid, its dissociation equilibrium moves to the right, so in the end all of its protons react." }),
        P.manual({ label: "(c)", marks: 2, stem: "Explain the difference in pH.", points: ["Ethanoic acid is only partially dissociated while HCl is fully dissociated", "so [H⁺] is lower in ethanoic acid and its pH is higher"], modelAnswer: "Hydrochloric acid is fully dissociated, so [H⁺] = 0.150 mol dm⁻³. Ethanoic acid is only slightly dissociated, so its [H⁺] is much lower and its pH higher." }),
        P.short({ label: "(d)", marks: 1, stem: "Give the formula of the conjugate base of ethanoic acid.", accepted: ["CH3COO-", "CH₃COO⁻", "CH3CO2-", "CH3COO⁻", "CH₃COO-"], normalise: ["trim", "collapse_whitespace"], wrong: ["CH3COOH2+"], explanation: "Remove H⁺: CH₃COO⁻ (ethanoate)." }),
        P.short({ label: "(e)", marks: 1, stem: "Write the ionic equation for the neutralisation of either acid by aqueous sodium hydroxide, taking the acid as H⁺(aq) (type, e.g., A + B -> C).", accepted: ["H+ + OH- -> H2O", "H+(aq) + OH-(aq) -> H2O(l)", "H+ + OH- → H2O", "OH- + H+ -> H2O", "H+(aq) + OH-(aq) → H2O(l)"], normalise: ["trim", "lowercase", "collapse_whitespace"], wrong: ["NaOH + HCl -> NaCl + H2O"], explanation: "H⁺(aq) + OH⁻(aq) → H₂O(l)." }),
        P.mcq({ label: "(f)", marks: 1, stem: "Why does the hydrochloric acid conduct electricity better?", options: [
          ["It contains a higher concentration of ions.", "Correct: full dissociation gives more mobile ions."],
          ["Chloride ions move faster than electrons in a wire.", "Conduction in solution is by ions; the comparison is meaningless."],
          ["Its molecules are smaller than ethanoic acid molecules.", "Molecules do not carry charge; ions do."],
          ["It is more concentrated than the ethanoic acid.", "Both acids are 0.150 mol dm⁻³."],
        ], answer: "A", explanation: "Conductivity depends on the concentration of mobile ions." }),
        P.manual({ label: "(g)", marks: 3, stem: "Tatenda says: \"The ethanoic acid reacts more slowly because it is more dilute.\" Explain why she is wrong and give the correct explanation.", points: ["The two acids have the same concentration (0.150 mol dm⁻³), so dilution is not the reason", "Ethanoic acid is a weak acid / only partially dissociated", "so [H⁺] is lower and there are fewer collisions per second between H⁺ ions and the magnesium surface"], modelAnswer: "Both acids are 0.150 mol dm⁻³, so the ethanoic acid is not more dilute. It reacts more slowly because it is weak: only a small fraction of its molecules is dissociated, so the concentration of H⁺ ions is lower and fewer H⁺ ions collide with the magnesium each second." }),
      ],
      hints: ["Use Mg + 2H⁺ → Mg²⁺ + H₂.", "Distinguish strength from concentration."],
      explanation: `${sfStr(v, 3)} cm³ of H₂ from each; ethanoic acid is weak, so lower [H⁺], higher pH, lower conductivity and slower reaction, but the same total amount of H⁺ is available.`,
    });
  }
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true,
    stem: t`Consider the reaction between hydrogensulfate ions and carbonate ions in solution:

$\ce{HSO4-(aq) + CO3^2-(aq) <=> SO4^2-(aq) + HCO3-(aq)}$`,
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Give the formula of the species that acts as a Brønsted-Lowry acid in the forward reaction.", accepted: ["HSO4-", "HSO₄⁻", "HSO4⁻", "HSO₄-"], normalise: ["trim", "collapse_whitespace"], wrong: ["CO3 2-"], explanation: "HSO₄⁻ donates a proton." }),
      P.short({ label: "(b)", marks: 1, stem: "Give the formula of the conjugate acid of the carbonate ion.", accepted: ["HCO3-", "HCO₃⁻", "HCO3⁻", "HCO₃-"], normalise: ["trim", "collapse_whitespace"], wrong: ["H2CO3"], explanation: "CO₃²⁻ + H⁺ → HCO₃⁻." }),
      P.manual({ label: "(c)", marks: 2, stem: "Identify both conjugate acid-base pairs in the reaction.", points: ["HSO₄⁻ (acid) and SO₄²⁻ (base)", "HCO₃⁻ (acid) and CO₃²⁻ (base)"], modelAnswer: "HSO₄⁻/SO₄²⁻ and HCO₃⁻/CO₃²⁻; in each pair the acid has one more proton than the base." }),
      P.manual({ label: "(d)", marks: 2, stem: "The hydrogencarbonate ion can act as an acid or as a base. Write an equation for each behaviour with water.", points: ["As an acid: HCO₃⁻ + H₂O ⇌ CO₃²⁻ + H₃O⁺", "As a base: HCO₃⁻ + H₂O ⇌ H₂CO₃ + OH⁻"], modelAnswer: "Acid: HCO₃⁻(aq) + H₂O(l) ⇌ CO₃²⁻(aq) + H₃O⁺(aq). Base: HCO₃⁻(aq) + H₂O(l) ⇌ H₂CO₃(aq) + OH⁻(aq)." }),
      P.mcq({ label: "(e)", marks: 1, stem: "Which term describes a species, such as HCO₃⁻ or H₂O, that can act as both a proton donor and a proton acceptor?", options: [
        ["amphoteric", "Correct: also called amphiprotic."],
        ["conjugate", "Conjugate describes the relation between two species that differ by one proton."],
        ["dibasic", "Dibasic describes an acid with two replaceable protons, such as H₂SO₄."],
        ["neutral", "Neutral refers to pH 7, not to dual acid-base behaviour."],
      ], answer: "A", explanation: "Amphoteric (amphiprotic) species can donate or accept protons." }),
      P.tf({ label: "(f)", marks: 1, stem: "Sulfate ions, SO₄²⁻, can act as a Brønsted-Lowry base.", answer: true, explanation: "True: SO₄²⁻ has lone pairs and accepts a proton in the reverse reaction to form HSO₄⁻." }),
    ],
    hints: ["Follow the proton from left to right."],
    explanation: "HSO₄⁻ donates H⁺ to CO₃²⁻; pairs HSO₄⁻/SO₄²⁻ and HCO₃⁻/CO₃²⁻; HCO₃⁻ is amphoteric.",
  });
  b.card("DEFINITION", "Brønsted-Lowry acid and base", "Acid: proton (H⁺) donor. Base: proton acceptor (uses a lone pair).");
  b.card("DEFINITION", "Conjugate acid-base pair", "Two species that differ by one proton, e.g. CH₃COOH/CH₃COO⁻, NH₄⁺/NH₃, H₃O⁺/H₂O.");
  b.card("DEFINITION", "Strong acid", "An acid that is fully dissociated into ions in aqueous solution (HCl, HNO₃, H₂SO₄).");
  b.card("DEFINITION", "Weak acid", "An acid that is only partially dissociated in water, giving an equilibrium (e.g. ethanoic acid).");
  b.card("CONCEPT", "Strong vs concentrated", "Strong/weak: extent of dissociation. Concentrated/dilute: amount of acid per dm³.");
  b.card("CONCEPT", "Comparing 0.1 mol dm⁻³ HCl and CH₃COOH", "HCl: lower pH, higher conductivity, faster with Mg. Same total H₂ with excess Mg.");
  b.card("FORMULA", "Ionic equation for neutralisation", "H⁺(aq) + OH⁻(aq) → H₂O(l)");
  b.card("FACT", "Water in acid-base reactions", "Amphoteric: a base with HCl (forms H₃O⁺), an acid with NH₃ (forms OH⁻).");
  b.card("CONCEPT", "Strength of conjugate base", "The stronger the acid, the weaker its conjugate base (Cl⁻ is a very weak base).");
});
