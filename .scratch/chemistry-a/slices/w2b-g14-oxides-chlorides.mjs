// W2b: achem.group14.oxides-chlorides (ZIMSEC only, Form 5; tagged ZIMSEC automatically).
import { concept, P, t, Mr, VM_RTP, ecell, sfStr, dpStr, chk } from "../lib.mjs";

concept("achem.group14.oxides-chlorides", { file: "group14/oxides-chlorides", keyPrefix: "group14.oxides-chlorides" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which oxide of a Group IV element is neutral?",
    options: [
      [t`$\ce{CO}$`, "Correct: carbon monoxide reacts with neither acids nor alkalis."],
      [t`$\ce{CO2}$`, "Carbon dioxide is acidic: it reacts with NaOH."],
      [t`$\ce{SiO2}$`, "Silicon dioxide is acidic."],
      [t`$\ce{PbO}$`, "Lead(II) oxide is amphoteric."],
    ],
    answer: "A",
    explanation: "CO is the classic neutral oxide.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the shape of a tin(IV) chloride molecule, SnCl₄?",
    options: [
      ["tetrahedral", "Correct: four bonding pairs and no lone pairs around tin."],
      ["square planar", "Square planar needs four bonding pairs and two lone pairs."],
      ["trigonal pyramidal", "That needs three bonding pairs and one lone pair."],
      ["octahedral", "That needs six electron pairs around the central atom."],
    ],
    answer: "A",
    explanation: "Four bond pairs repel equally: tetrahedral, 109.5°, and non-polar overall.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What are the products when lead(IV) oxide is heated strongly?",
    options: [
      [t`$\ce{PbO}$ and $\ce{O2}$`, "Correct: 2PbO₂ → 2PbO + O₂."],
      [t`$\ce{Pb}$ and $\ce{O2}$`, "Lead(IV) oxide is reduced to lead(II), not to the metal."],
      [t`$\ce{Pb3O4}$ only`, "Pb₃O₄ can form at intermediate temperatures, but oxygen is always released."],
      [t`$\ce{PbO}$ and $\ce{O3}$`, "Ozone is not formed."],
    ],
    answer: "A",
    explanation: "Pb(IV) is less stable than Pb(II), so PbO₂ loses oxygen on heating.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why does silicon tetrachloride react with water but tetrachloromethane does not?",
    options: [
      ["Silicon has empty d orbitals that can accept a lone pair from water; carbon has none.", "Correct: carbon (Period 2) cannot expand beyond eight outer electrons."],
      ["The Si–Cl bond is non-polar, so water can attack it easily.", "Si–Cl is polar; water attacks the δ+ silicon."],
      ["CCl₄ is ionic and dissolves without reacting.", "CCl₄ is covalent and does not dissolve in water."],
      ["Silicon is more electronegative than carbon, so it attracts water.", "Silicon is less electronegative than carbon."],
    ],
    answer: "A",
    hints: ["Which atom can accept a lone pair from water?"],
    explanation: "Water's lone pair attacks δ+ Si, which can use 3d orbitals; carbon cannot, and is also shielded by four Cl atoms.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements about the oxides of Group IV are correct?\n\n1. Lead(II) oxide reacts with both nitric acid and aqueous sodium hydroxide.\n2. Silicon dioxide reacts with hot, concentrated sodium hydroxide.\n3. Carbon dioxide reacts with dilute hydrochloric acid.",
    options: [
      ["1 and 2 only", "Correct: CO₂ is acidic, so it does not react with an acid."],
      ["1, 2 and 3", "Statement 3 is false: CO₂ reacts with alkalis, not acids."],
      ["2 and 3 only", "Statement 3 is false and statement 1 is true."],
      ["1 only", "Statement 2 is also true: SiO₂ is acidic."],
    ],
    answer: "A",
    hints: ["Acidic oxides react only with bases."],
    explanation: "PbO is amphoteric; SiO₂ and CO₂ are acidic.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements describe the trend in the stability of oxidation states down Group IV?\n\n1. The +2 state becomes more stable relative to +4.\n2. Tin(II) compounds act as reducing agents.\n3. Lead(IV) compounds act as reducing agents.",
    options: [
      ["1 and 2 only", "Correct: lead(IV) compounds are oxidising agents."],
      ["1, 2 and 3", "Statement 3 is false: Pb(IV) is reduced to the more stable Pb(II)."],
      ["2 and 3 only", "Statement 1 is true and statement 3 is false."],
      ["1 only", "Statement 2 is also true: Sn²⁺ is easily oxidised to Sn⁴⁺."],
    ],
    answer: "A",
    hints: ["Which way does each ion move to reach its more stable state?"],
    explanation: "Inert pair effect: Pb(II) most stable, so PbO₂ oxidises; for tin +4 is (just) more stable, so Sn²⁺ reduces.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Lead(IV) chloride is an unstable yellow oil that gives off a greenish-yellow gas when warmed. Which equation explains this?",
    options: [
      [t`$\ce{PbCl4 -> PbCl2 + Cl2}$`, "Correct: lead is reduced to the more stable +2 state and chloride is oxidised."],
      [t`$\ce{PbCl4 -> Pb + 2Cl2}$`, "Lead metal is not formed; Pb(II) is the stable state."],
      [t`$\ce{PbCl4 + 2H2O -> PbO2 + 4HCl}$`, "Hydrolysis gives steamy HCl fumes, which are colourless."],
      [t`$\ce{2PbCl4 -> 2PbCl3 + Cl2}$`, "Lead does not form a stable +3 chloride."],
    ],
    answer: "A",
    hints: ["What colour is chlorine?"],
    explanation: "PbCl₄ → PbCl₂ + Cl₂ (greenish-yellow): Pb(IV) is unstable relative to Pb(II).",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which reagent is used to dissolve lead(II) oxide when making a solution of a lead(II) salt, and why?",
    options: [
      ["dilute nitric acid, because lead(II) nitrate is soluble", "Correct: PbCl₂ and PbSO₄ would coat the oxide."],
      ["dilute sulfuric acid, because lead(II) sulfate is soluble", "Lead(II) sulfate is insoluble."],
      ["dilute hydrochloric acid, because lead(II) chloride is very soluble", "Lead(II) chloride is only sparingly soluble in cold water."],
      ["water, because lead(II) oxide is a soluble basic oxide", "PbO is insoluble in water."],
    ],
    answer: "A",
    hints: ["Which lead(II) salts are insoluble?"],
    explanation: "PbO + 2HNO₃ → Pb(NO₃)₂ + H₂O; nearly all nitrates are soluble.",
  });
  {
    const e = ecell(0.54, 0.15);
    b.num({
      d: 2, skill: "APPLICATION", daily: true,
      stem: "Calculate E⦵cell, in V, for the reaction Sn²⁺ + I₂ → Sn⁴⁺ + 2I⁻. E⦵: Sn⁴⁺/Sn²⁺ +0.15 V; I₂/I⁻ +0.54 V. (Give the sign, to two decimal places.)",
      value: e, dp: 2, unit: "V",
      wrong: [dpStr(-e, 2), dpStr(0.54 + 0.15, 2)],
      explanation: `I₂ is reduced (more positive E⦵): E⦵cell = 0.54 − 0.15 = +${dpStr(e, 2)} V, so tin(II) reduces iodine. Adding the values gives ${dpStr(0.54 + 0.15, 2)} V, which is wrong.`,
    });
  }
  {
    const e = ecell(1.47, 0.77);
    b.calc({
      d: 3, skill: "APPLICATION",
      stem: "Use E⦵ values to calculate E⦵cell, in V, for the oxidation of Fe²⁺ by PbO₂ in acid, and say whether it is feasible. E⦵: PbO₂ + 4H⁺ + 2e⁻ ⇌ Pb²⁺ + 2H₂O +1.47 V; Fe³⁺ + e⁻ ⇌ Fe²⁺ +0.77 V.",
      value: e, dp: 2, unit: "V",
      wrong: [dpStr(-e, 2), dpStr(1.47 - 2 * 0.77, 2)],
      hints: ["Do not multiply E⦵ values when you balance electrons."],
      explanation: `1. PbO₂ is reduced (more positive E⦵); Fe²⁺ is oxidised.\n2. E⦵cell = 1.47 − 0.77 = +${dpStr(e, 2)} V: positive, so feasible.\n3. PbO₂ + 4H⁺ + 2Fe²⁺ → Pb²⁺ + 2Fe³⁺ + 2H₂O. Doubling the iron E⦵ because of the 2Fe²⁺ gives ${dpStr(1.47 - 2 * 0.77, 2)} V, which is wrong: E⦵ does not depend on the amount.`,
    });
  }
  {
    const n = 7.18 / Mr("PbO2");
    const v = (n / 2) * VM_RTP;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "Calculate the volume of oxygen, in dm³ at room conditions, released when 7.18 g of lead(IV) oxide is completely decomposed by heat, to three significant figures. (Ar: O 16.0, Pb 207.2; molar gas volume 24.0 dm³ mol⁻¹)",
      value: v, sf: 3, unit: "dm³",
      wrong: [sfStr(n * VM_RTP, 3)],
      hints: ["Write the equation: 2PbO₂ → 2PbO + O₂."],
      explanation: `1. Mr(PbO₂) = ${Mr("PbO2")}; n = 7.18 ÷ ${Mr("PbO2")} = ${sfStr(n, 3)} mol.\n2. n(O₂) = ${sfStr(n, 3)} ÷ 2 = ${sfStr(n / 2, 3)} mol.\n3. V = ${sfStr(n / 2, 3)} × 24.0 = ${sfStr(v, 3)} dm³. Ignoring the 2 : 1 ratio gives ${sfStr(n * VM_RTP, 3)} dm³.`,
    });
  }
  {
    const n = 2.61 / Mr("SnCl4");
    const m = n * Mr("SnO2");
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "Tin(IV) chloride is hydrolysed: SnCl₄ + 2H₂O → SnO₂ + 4HCl. Calculate the mass of tin(IV) oxide, in g, formed from 2.61 g of SnCl₄, to three significant figures. (Mr: SnCl₄ 260.7, SnO₂ 150.7)",
      value: m, sf: 3, unit: "g",
      wrong: [sfStr(n * 4 * 36.5, 3)],
      hints: ["One SnCl₄ gives one SnO₂."],
      explanation: `1. n(SnCl₄) = 2.61 ÷ 260.7 = ${sfStr(n, 3)} mol.\n2. n(SnO₂) = ${sfStr(n, 3)} mol.\n3. Mass = ${sfStr(n, 3)} × 150.7 = ${sfStr(m, 3)} g. (${sfStr(n * 4 * 36.5, 3)} g is the mass of HCl formed.)`,
    });
  }
  {
    const n = 1.196 / Mr("PbO2");
    const v = n * VM_RTP * 1000;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: "Concentrated hydrochloric acid is warmed with 1.196 g of lead(IV) oxide in a fume cupboard: PbO₂ + 4HCl → PbCl₂ + Cl₂ + 2H₂O. Calculate the volume of chlorine formed, in cm³ at room conditions, to three significant figures. (Mr PbO₂ 239.2; molar gas volume 24.0 dm³ mol⁻¹)",
      value: v, sf: 3, unit: "cm³",
      wrong: [sfStr(v * 4, 3), sfStr(v / 1000, 3)],
      hints: ["One PbO₂ gives one Cl₂."],
      explanation: `1. n(PbO₂) = 1.196 ÷ 239.2 = ${sfStr(n, 3)} mol = n(Cl₂).\n2. V = ${sfStr(n, 3)} × 24 000 = ${sfStr(v, 3)} cm³. Using the 4 from 4HCl gives ${sfStr(v * 4, 3)} cm³; leaving the answer in dm³ gives ${sfStr(v / 1000, 3)}.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Tetrachloromethane molecules are non-polar even though each C–Cl bond is polar.",
    answer: true,
    explanation: "True. In the symmetrical tetrahedral molecule the four bond dipoles cancel.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why lead(II) oxide is more basic than lead(IV) oxide.",
    points: [
      "Pb²⁺ has a lower charge (lower charge density) than Pb(IV)",
      "so it polarises the oxide ion less and the bonding is more ionic; more ionic oxides are more basic",
    ],
    modelAnswer: "In PbO lead is +2, with a lower charge density than lead in the +4 state. It polarises the oxide ion less, so PbO has more ionic character, and ionic oxides containing O²⁻ behave as bases.",
    hints: ["Link charge density to ionic character."],
    explanation: "Lower oxidation state → more ionic → more basic.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each oxide with its acid-base character.",
    pairs: [
      [t`$\ce{CO}$`, "neutral"],
      [t`$\ce{CO2}$`, "acidic, simple molecular"],
      [t`$\ce{SiO2}$`, "acidic, giant covalent"],
      [t`$\ce{PbO}$`, "amphoteric"],
    ],
    extraRight: ["basic only"],
    explanation: "No Group IV oxide is purely basic; the metal oxides are amphoteric.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Complete the explanation of the hydrolysis of silicon tetrachloride.",
    template: "A water molecule donates a {{blank:a}} to the δ+ silicon atom, which can accept it into an empty {{blank:b}} orbital. A Si–Cl bond then breaks and {{blank:c}} is released. Carbon cannot do this because its outer shell is in Period {{blank:d}} and has no d orbitals.",
    blanks: [
      { id: "a", accepted: ["lone pair"], choices: ["lone pair", "proton", "hydroxide ion"] },
      { id: "b", accepted: ["3d"], choices: ["3d", "2p", "3s"] },
      { id: "c", accepted: ["HCl"], choices: ["HCl", "Cl2", "H2"] },
      { id: "d", accepted: ["2"], choices: ["2", "3", "4"] },
    ],
    hints: ["Water acts as a nucleophile."],
    explanation: "Lone pair from H₂O → 3d orbital of Si → Si–Cl breaks → HCl; repeated until SiO₂ and 4HCl.",
  });
  b.short({
    d: 3, skill: "APPLICATION",
    stem: "Write the equation for the reaction of lead(II) oxide with aqueous sodium hydroxide to form sodium plumbate(II), Na₂Pb(OH)₄ (type, e.g., A + 2B + C -> D).",
    accepted: ["PbO + 2NaOH + H2O -> Na2Pb(OH)4", "PbO + 2NaOH + H2O → Na2Pb(OH)4", "PbO(s) + 2NaOH(aq) + H2O(l) -> Na2Pb(OH)4(aq)", "PbO(s) + 2NaOH(aq) + H2O(l) → Na2Pb(OH)4(aq)"],
    normalise: ["trim", "collapse_whitespace"],
    wrong: ["PbO + NaOH -> NaPbO2 + H2O"],
    hints: ["Balance Na first, then O and H with water."],
    explanation: "PbO + 2NaOH + H₂O → Na₂Pb(OH)₄: PbO acting as an acid.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why tetrachloromethane does not react with water, although silicon tetrachloride does.",
    points: [
      "Water attacks the central atom using a lone pair (nucleophile)",
      "Carbon is in Period 2: it has no available (d) orbitals to accept the lone pair (cannot exceed 8 outer electrons)",
      "Carbon is small and surrounded/shielded by four large chlorine atoms, so water cannot reach it; Si is larger with empty 3d orbitals",
    ],
    modelAnswer: "Hydrolysis starts with a water molecule donating a lone pair to the central atom. Silicon is larger and has empty 3d orbitals that can accept this lone pair, so the reaction proceeds. Carbon is in Period 2 and has no d orbitals, so it cannot accept a fifth pair of electrons, and its small size means the four chlorine atoms shield it from attack. So CCl₄ is kinetically inert to water.",
    hints: ["Think about the first step of the reaction."],
    explanation: "Available orbitals and steric shielding.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Describe and explain the change in the relative stability of the +2 and +4 oxidation states down Group IV, using one reaction of a tin compound and one of a lead compound as evidence.",
    points: [
      "+4 is the more stable state for C and Si; the +2 state becomes more stable down the group and is the more stable state for Pb (inert pair effect)",
      "Tin: Sn²⁺ is a reducing agent, e.g. Sn²⁺ + 2Fe³⁺ → Sn⁴⁺ + 2Fe²⁺ (tin still prefers +4)",
      "Lead: PbO₂ is an oxidising agent, e.g. PbO₂ + 4HCl → PbCl₂ + Cl₂ + 2H₂O, or PbO₂ decomposes to PbO on heating",
      "E⦵ values: Sn⁴⁺/Sn²⁺ only +0.15 V but Pb⁴⁺/Pb²⁺ +1.69 V, showing Pb(IV) is easily reduced",
    ],
    modelAnswer: "Carbon and silicon are most stable in the +4 state, but down the group the outer s² pair is used less in bonding, so the +2 state becomes more stable (the inert pair effect); for lead +2 is the more stable state. Tin(II) still tends to be oxidised to tin(IV), so it is a reducing agent: Sn²⁺ + 2Fe³⁺ → Sn⁴⁺ + 2Fe²⁺. Lead(IV) tends to be reduced to lead(II), so PbO₂ is an oxidising agent: PbO₂ + 4HCl → PbCl₂ + Cl₂ + 2H₂O. The E⦵ values agree: Sn⁴⁺/Sn²⁺ is only +0.15 V, but Pb⁴⁺/Pb²⁺ is +1.69 V.",
    hints: ["Use one reducing agent and one oxidising agent."],
    explanation: "Inert pair effect with evidence from Sn and Pb chemistry.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: "Nyasha investigated a solution of tin(II) chloride. A 25.0 cm³ portion was titrated with 0.0500 mol dm⁻³ iron(III) chloride solution (with a suitable indicator); 22.40 cm³ was needed.",
    parts: (() => {
      const nFe = (22.4 / 1000) * 0.05;
      const nSn = nFe / 2;
      const c = nSn / 0.025;
      const e = ecell(0.77, 0.15);
      return [
        P.mcq({ label: "(a)", stem: "Which species acts as the oxidising agent in the titration?", options: [
          [t`$\ce{Fe^3+}$`, "Correct: it gains an electron and is reduced to Fe²⁺."],
          [t`$\ce{Sn^2+}$`, "Sn²⁺ is the reducing agent: it loses electrons."],
          [t`$\ce{Sn^4+}$`, "Sn⁴⁺ is a product."],
          [t`$\ce{Cl-}$`, "Chloride ions are spectators."],
        ], answer: "A", explanation: `Fe³⁺ is reduced; E⦵cell for the reaction is +${dpStr(e, 2)} V, so it is feasible.` }),
        P.short({ label: "(b)", marks: 1, stem: "Write the ionic equation for the reaction (type, e.g., A + 2B -> C + 2D).", accepted: ["Sn2+ + 2Fe3+ -> Sn4+ + 2Fe2+", "Sn2+ + 2Fe3+ → Sn4+ + 2Fe2+", "2Fe3+ + Sn2+ -> 2Fe2+ + Sn4+", "Sn²⁺ + 2Fe³⁺ → Sn⁴⁺ + 2Fe²⁺"], normalise: ["trim", "collapse_whitespace"], wrong: ["Sn2+ + Fe3+ -> Sn4+ + Fe2+"], explanation: "Sn²⁺ loses 2 e⁻; each Fe³⁺ gains 1 e⁻." }),
        P.num({ label: "(c)", marks: 1, stem: "Calculate the amount, in mol, of Fe³⁺ used, to three significant figures.", value: nFe, sf: 3, unit: "mol", explanation: `22.40 ÷ 1000 × 0.0500 = ${sfStr(nFe, 3)} mol.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the concentration of Sn²⁺ in the solution, in mol dm⁻³, to three significant figures.", value: c, sf: 3, unit: "mol/dm³", wrong: [sfStr(nFe / 0.025, 3)], explanation: `n(Sn²⁺) = ${sfStr(nFe, 3)} ÷ 2 = ${sfStr(nSn, 3)} mol; c = ${sfStr(nSn, 3)} ÷ 0.0250 = ${sfStr(c, 3)} mol dm⁻³. Forgetting the 1 : 2 ratio gives ${sfStr(nFe / 0.025, 3)}.` }),
        P.manual({ label: "(e)", marks: 1, stem: "Tin(II) chloride solutions slowly lose their reducing power when left open to the air. Suggest why.", points: ["Sn²⁺ is oxidised by oxygen from the air to Sn⁴⁺ (store sealed, or over tin metal, to slow this)"], modelAnswer: "Oxygen in the air oxidises Sn²⁺ to Sn⁴⁺, because tin(II) is a reducing agent. Storing the solution in a full, stoppered bottle (or over a piece of tin metal, which converts Sn⁴⁺ back to Sn²⁺) slows the loss." }),
        P.mcq({ label: "(f)", stem: "Which statement about tin is correct?", options: [
          ["Sn⁴⁺ is a weak oxidising agent.", "Correct: E⦵ Sn⁴⁺/Sn²⁺ is only +0.15 V."],
          ["Sn²⁺ is a strong oxidising agent.", "Sn²⁺ is a reducing agent."],
          ["Sn⁴⁺ is a strong reducing agent.", "Sn⁴⁺ cannot be oxidised further."],
          ["Sn²⁺ is more stable than Sn⁴⁺.", "For tin, +4 is (slightly) the more stable state."],
        ], answer: "A", explanation: "Small positive E⦵: Sn⁴⁺ is only weakly oxidising; Sn²⁺ is easily oxidised." }),
        P.manual({ label: "(g)", marks: 1, stem: "Give the formula of the more stable oxide of lead and explain your choice.", points: ["PbO, because the +2 state is the more stable state of lead (inert pair effect)"], modelAnswer: "PbO: for lead the +2 oxidation state is more stable than +4, so PbO₂ decomposes to PbO on heating." }),
      ];
    })(),
    hints: ["Two Fe³⁺ react with one Sn²⁺.", "A more positive E⦵ means a stronger oxidising agent."],
    explanation: "E⦵cell +0.62 V; Sn²⁺ + 2Fe³⁺ → Sn⁴⁺ + 2Fe²⁺; Sn²⁺ concentration from the titration; tin(II) is a reducing agent.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true,
    stem: "The tetrachlorides of carbon, silicon, germanium and tin are all colourless liquids at room temperature. Their boiling points (K, data, approximate) are CCl₄ 350, SiCl₄ 331, GeCl₄ 360 and SnCl₄ 387.",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "State the shape of these molecules.", accepted: ["tetrahedral", "tetrahedron"], wrong: ["square planar"], explanation: "Four bonding pairs, no lone pairs." }),
      P.num({ label: "(b)", marks: 1, stem: "State the Cl–M–Cl bond angle, in degrees.", value: 109.5, dp: 1, wrong: [90], explanation: "109.5° for a regular tetrahedron." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why these compounds are volatile.", points: ["Simple covalent molecules that are non-polar (bond dipoles cancel)", "Only weak instantaneous dipole-induced dipole forces between molecules need to be overcome"], modelAnswer: "They consist of small, symmetrical, non-polar molecules, so only weak instantaneous dipole-induced dipole forces act between them and little energy is needed to separate them." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest why the boiling point increases from SiCl₄ to SnCl₄.", points: ["The molecules have more electrons (and are larger) down the group", "So the instantaneous dipole-induced dipole forces are stronger"], modelAnswer: "From SiCl₄ to SnCl₄ the molecules contain more electrons, so stronger instantaneous dipole-induced dipole forces act between them and more energy is needed to boil them." }),
      P.short({ label: "(e)", marks: 1, stem: "Write the equation for the reaction of SiCl₄ with water (type, e.g., A + 2B -> C + 4D).", accepted: ["SiCl4 + 2H2O -> SiO2 + 4HCl", "SiCl4 + 2H2O → SiO2 + 4HCl", "SiCl4(l) + 2H2O(l) -> SiO2(s) + 4HCl(aq)", "SiCl4(l) + 2H2O(l) → SiO2(s) + 4HCl(aq)"], normalise: ["trim", "collapse_whitespace"], wrong: ["SiCl4 + H2O -> SiO + 2HCl"], explanation: "SiCl₄ + 2H₂O → SiO₂ + 4HCl (steamy fumes, white solid)." }),
      P.tf({ label: "(f)", stem: "Lead(IV) chloride would be expected to boil without decomposing at about 420 K.", answer: false, explanation: "False: PbCl₄ decomposes to PbCl₂ and Cl₂ above about 50 °C because Pb(IV) is unstable." }),
    ],
    hints: ["Count the electron pairs around the central atom.", "Larger molecules have more electrons."],
    explanation: "Tetrahedral, non-polar, volatile molecules; boiling point rises with the number of electrons (SiCl₄ to SnCl₄); SiCl₄ is hydrolysed.",
  });
  b.card("FACT", "Acid-base character of Group IV oxides", "CO neutral; CO₂, SiO₂ acidic; GeO₂, SnO, SnO₂, PbO, PbO₂ amphoteric. The +2 oxide is more basic than the +4.");
  b.card("FORMULA", "Amphoteric PbO", "PbO + 2HNO₃ → Pb(NO₃)₂ + H₂O; PbO + 2NaOH + H₂O → Na₂Pb(OH)₄.");
  b.card("FORMULA", "Heating lead(IV) oxide", "2PbO₂ → 2PbO + O₂ (Pb(IV) less stable than Pb(II)).");
  b.card("FACT", "Group IV tetrachlorides", "Simple, tetrahedral (109.5°), non-polar, volatile liquids; PbCl₄ decomposes to PbCl₂ + Cl₂.");
  b.card("CONCEPT", "Why SiCl₄ is hydrolysed but CCl₄ is not", "Si has empty 3d orbitals to accept a lone pair from water; C (Period 2) has none and is shielded by four Cl atoms.");
  b.card("DEFINITION", "Inert pair effect", "Down Group IV the s² pair is used less in bonding, so the +2 state becomes more stable.");
  b.card("CONCEPT", "Tin(II) and lead(IV) in redox", "Sn²⁺ is a reducing agent (E⦵ Sn⁴⁺/Sn²⁺ +0.15 V); PbO₂ is an oxidising agent (E⦵ +1.47 V).");
  b.card("FORMULA", "PbO₂ with concentrated HCl", "PbO₂ + 4HCl → PbCl₂ + Cl₂ + 2H₂O (fume cupboard: chlorine is toxic).");
  b.card("FORMULA", "Hydrolysis of SnCl₄", "SnCl₄ + 2H₂O → SnO₂ + 4HCl.");
});
