// W2b: achem.group17.properties-reactivity (both boards; ZIMSEC Form 5, Cambridge AS Level). E⦵ explanations and the
// thiosulfate reactions are ZIMSEC detail.
import { concept, P, t, bondEnergyDH, ecell, molesFromSolution, sfStr, dpStr, chk, ZIM } from "../lib.mjs";

concept("achem.group17.properties-reactivity", { file: "group17/properties-reactivity", keyPrefix: "group17.properties-reactivity" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the appearance of bromine at room temperature?",
    options: [
      ["a dark red-brown liquid", "Correct: bromine is one of only two elements that are liquid at room temperature."],
      ["a pale green gas", "This is chlorine."],
      ["a shiny grey-black solid", "This is iodine."],
      ["a pale yellow gas", "This is fluorine."],
    ],
    answer: "A",
    explanation: "Bromine is a dark red-brown liquid giving an orange-brown vapour.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why does the boiling point of the halogens increase from chlorine to iodine?",
    options: [
      ["The molecules have more electrons, so instantaneous dipole-induced dipole forces are stronger.", "Correct: these forces depend on the number of electrons."],
      ["The X–X covalent bonds become stronger down the group, so more energy is needed.", "Boiling does not break X–X bonds, and they get weaker down the group."],
      ["The molecules become more polar down the group, so permanent dipole forces increase.", "Halogen molecules are non-polar."],
      ["Hydrogen bonds between the halogen molecules become stronger down the group.", "Halogen molecules contain no hydrogen."],
    ],
    answer: "A",
    explanation: "Cl₂ (34 electrons) < Br₂ < I₂: larger electron clouds, stronger intermolecular forces.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which hydrogen halide is the least thermally stable?",
    options: [
      [t`$\ce{HI}$`, "Correct: the H–I bond is the weakest."],
      [t`$\ce{HF}$`, "HF has the strongest H–X bond and is the most stable."],
      [t`$\ce{HCl}$`, "HCl is not decomposed by ordinary heating."],
      [t`$\ce{HBr}$`, "HBr is more stable than HI."],
    ],
    answer: "A",
    explanation: "A hot wire decomposes HI into purple iodine vapour and hydrogen.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Chlorine water is added to aqueous potassium bromide and the mixture is shaken with cyclohexane. What colour is the cyclohexane layer?",
    options: [
      ["orange-red", "Correct: bromine is displaced and dissolves in the organic layer."],
      ["violet", "Violet would show iodine, which is not present."],
      ["pale green", "Chlorine has reacted; it is the bromine that colours the layer."],
      ["colourless", "A reaction occurs because chlorine is a stronger oxidising agent than bromine."],
    ],
    answer: "A",
    explanation: "Cl₂ + 2Br⁻ → 2Cl⁻ + Br₂; bromine in cyclohexane is orange-red.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements explain why the F–F bond is weaker than the Cl–Cl bond?\n\n1. Fluorine atoms are very small, so the lone pairs on the two atoms are close together.\n2. Repulsion between these lone pairs weakens the bond.\n3. Fluorine is less electronegative than chlorine.",
    options: [
      ["1 and 2 only", "Correct: fluorine is the most electronegative element, so statement 3 is false."],
      ["1, 2 and 3", "Statement 3 is false: fluorine is more electronegative."],
      ["2 and 3 only", "Statement 3 is false and statement 1 is part of the explanation."],
      ["1 only", "Statement 2 is needed to explain the weakening."],
    ],
    answer: "A",
    hints: ["Think about the non-bonding electrons in F₂."],
    explanation: "Close lone pairs on small F atoms repel, weakening F–F (158 kJ mol⁻¹).",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements about the reactions of the halogens with hydrogen are correct?\n\n1. Fluorine reacts explosively even in the dark.\n2. Chlorine reacts explosively in sunlight.\n3. Iodine reacts completely with hydrogen at room temperature.",
    options: [
      ["1 and 2 only", "Correct: the hydrogen-iodine reaction needs heat and a catalyst and is reversible."],
      ["1, 2 and 3", "Statement 3 is false: the iodine reaction is slow, needs heat and is incomplete."],
      ["2 and 3 only", "Statement 1 is true and statement 3 is false."],
      ["1 only", "Statement 2 is also true: UV light starts a chain reaction."],
    ],
    answer: "A",
    hints: ["Vigour falls down the group."],
    explanation: "Reactivity with H₂: F₂ > Cl₂ > Br₂ > I₂; H₂ + I₂ ⇌ 2HI only partly reacts.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is chlorine a stronger oxidising agent than iodine?",
    options: [
      ["Its smaller atoms attract an incoming electron more strongly.", "Correct: the electron enters a shell closer to the nucleus and less shielded."],
      ["Chlorine molecules contain more electrons than iodine molecules.", "Iodine molecules have more electrons."],
      ["The Cl–Cl bond is weaker than the I–I bond, so it breaks more easily.", "The Cl–Cl bond is stronger than I–I."],
      ["Chlorine has a lower first ionisation energy than iodine does.", "Chlorine's ionisation energy is higher; oxidising power is about gaining electrons."],
    ],
    answer: "A",
    hints: ["Oxidising agents gain electrons."],
    explanation: "Smaller atom, stronger attraction for the electron gained: Cl₂ is the stronger oxidising agent (E⦵ more positive).",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Astatine is below iodine in Group 17. Which prediction is most likely to be correct?",
    options: [
      ["Astatine does not displace iodine from potassium iodide solution.", "Correct: astatine would be a weaker oxidising agent than iodine."],
      ["Astatine is a coloured gas at room temperature and pressure.", "Volatility decreases down the group; astatine would be a solid."],
      ["Hydrogen astatide is more thermally stable than hydrogen iodide.", "The H–At bond would be weaker, so HAt would be less stable."],
      ["The At–At bond is stronger than the I–I bond.", "Bond energy falls from Cl₂ to I₂ and would continue to fall."],
    ],
    answer: "A",
    hints: ["Extend each trend one step."],
    explanation: "Weakest oxidising agent, a solid, least stable hydride, weakest X–X bond.",
  });
  {
    const dH = bondEnergyDH([[1, 436], [1, 151]], [[2, 299]]);
    b.calc({
      d: 3, skill: "APPLICATION",
      stem: "Use bond energies to calculate ΔH, in kJ mol⁻¹, for H₂(g) + I₂(g) → 2HI(g). Bond energies (kJ mol⁻¹): H–H 436, I–I 151, H–I 299.",
      value: dH, unit: "kJ/mol",
      wrong: [436 + 151 - 299, -dH],
      hints: ["Two H–I bonds are formed."],
      explanation: `1. Broken: 436 + 151 = ${436 + 151} kJ.\n2. Made: 2 × 299 = ${2 * 299} kJ.\n3. ΔH = ${436 + 151} − ${2 * 299} = ${dH} kJ mol⁻¹: only slightly exothermic, which fits the slow, incomplete reaction. Counting one H–I bond gives ${436 + 151 - 299}.`,
    });
  }
  {
    const dH = bondEnergyDH([[1, 436], [1, 193]], [[2, 366]]);
    b.calc({
      d: 3, skill: "APPLICATION",
      stem: "Calculate ΔH, in kJ mol⁻¹, for H₂(g) + Br₂(g) → 2HBr(g). Bond energies (kJ mol⁻¹): H–H 436, Br–Br 193, H–Br 366.",
      value: dH, unit: "kJ/mol",
      wrong: [-dH],
      hints: ["ΔH = bonds broken − bonds made."],
      explanation: `1. Broken: 436 + 193 = ${436 + 193} kJ.\n2. Made: 2 × 366 = ${2 * 366} kJ.\n3. ΔH = ${dH} kJ mol⁻¹. Subtracting the other way round gives +${-dH}.`,
    });
  }
  {
    const e = ecell(1.07, 0.54);
    b.num({
      d: 2, skill: "APPLICATION", applies: ZIM, daily: true,
      stem: "Calculate E⦵cell, in V, for Br₂ + 2I⁻ → 2Br⁻ + I₂. E⦵: Br₂/Br⁻ +1.07 V; I₂/I⁻ +0.54 V. (Two decimal places, with the sign.)",
      value: e, dp: 2, unit: "V",
      wrong: [dpStr(-e, 2), dpStr(1.07 + 0.54, 2)],
      explanation: `Bromine is reduced: E⦵cell = 1.07 − 0.54 = +${dpStr(e, 2)} V, so bromine displaces iodine.`,
    });
  }
  {
    const e = chk(ecell(0.54, 1.36), -0.82);
    b.num({
      d: 3, skill: "APPLICATION", applies: ZIM,
      stem: "A student suggests the reaction I₂ + 2Cl⁻ → 2I⁻ + Cl₂. Calculate E⦵cell, in V, for this reaction as written. E⦵: Cl₂/Cl⁻ +1.36 V; I₂/I⁻ +0.54 V. (Two decimal places, with the sign.)",
      value: e, dp: 2, unit: "V",
      wrong: [dpStr(-e, 2)],
      hints: ["E⦵cell = E⦵(species reduced) − E⦵(species oxidised); here iodine would be reduced."],
      explanation: `E⦵cell = 0.54 − 1.36 = ${dpStr(e, 2)} V. It is negative, so the reaction is not feasible: iodine cannot oxidise chloride ions.`,
    });
  }
  {
    const nS = molesFromSolution(18.6, 0.1);
    const c = nS / 2 / 0.025;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true, applies: ZIM,
      stem: "25.0 cm³ of an iodine solution needed 18.60 cm³ of 0.100 mol dm⁻³ sodium thiosulfate: I₂ + 2S₂O₃²⁻ → 2I⁻ + S₄O₆²⁻. Calculate the concentration of iodine, in mol dm⁻³, to three significant figures.",
      value: c, sf: 3, unit: "mol/dm³",
      wrong: [sfStr(nS / 0.025, 3)],
      hints: ["Two thiosulfate ions react with each I₂."],
      explanation: `1. n(S₂O₃²⁻) = 18.60 ÷ 1000 × 0.100 = ${sfStr(nS, 3)} mol.\n2. n(I₂) = ${sfStr(nS, 3)} ÷ 2 = ${sfStr(nS / 2, 3)} mol.\n3. c = ${sfStr(nS / 2, 3)} ÷ 0.0250 = ${sfStr(c, 3)} mol dm⁻³. Ignoring the 1 : 2 ratio gives ${sfStr(nS / 0.025, 3)}.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Aqueous iodine reacts with aqueous potassium bromide to form bromine.",
    answer: false,
    explanation: "False. Iodine is a weaker oxidising agent than bromine, so it cannot oxidise bromide ions.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each halogen with the colour of its solution in cyclohexane.",
    pairs: [
      ["chlorine", "very pale green (almost colourless)"],
      ["bromine", "orange-red"],
      ["iodine", "violet (purple)"],
    ],
    extraRight: ["blue-black"],
    explanation: "Blue-black is the colour of iodine with starch, not in cyclohexane.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Complete the explanation of the trend in thermal stability of the hydrogen halides.",
    template: "Down the group the halogen atom becomes {{blank:a}}, so the H–X bond becomes {{blank:b}} and {{blank:c}}. Less energy is needed to break it, so the hydrogen halides become {{blank:d}} stable.",
    blanks: [
      { id: "a", accepted: ["larger"], choices: ["larger", "smaller"] },
      { id: "b", accepted: ["longer"], choices: ["longer", "shorter"] },
      { id: "c", accepted: ["weaker"], choices: ["weaker", "stronger"] },
      { id: "d", accepted: ["less"], choices: ["more", "less"] },
    ],
    hints: ["Bond energy falls from H–F to H–I."],
    explanation: "Larger halogen → longer, weaker H–X bond → lower thermal stability.",
  });
  b.short({
    d: 3, skill: "APPLICATION", applies: ZIM,
    stem: "Give the formula of the ion formed when iodine oxidises thiosulfate ions.",
    accepted: ["S4O6 2-", "S4O6^2-", "S₄O₆²⁻", "S4O62-", "S4O6(2-)", "tetrathionate"],
    normalise: ["trim", "lowercase", "collapse_whitespace"],
    wrong: ["SO4 2-"],
    hints: ["Two S₂O₃²⁻ ions join together."],
    explanation: "I₂ + 2S₂O₃²⁻ → 2I⁻ + S₄O₆²⁻ (tetrathionate). Chlorine goes further, to sulfate.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe what you would see when chlorine water is added to aqueous potassium iodide, and explain the reaction in terms of electron transfer. Include an ionic equation.",
    points: [
      "The colourless solution turns brown (violet in cyclohexane)",
      "Cl₂ + 2I⁻ → 2Cl⁻ + I₂",
      "Chlorine gains electrons (is reduced) and iodide ions lose electrons (are oxidised), because chlorine is the stronger oxidising agent",
    ],
    modelAnswer: "The colourless potassium iodide solution turns brown as iodine forms: Cl₂(aq) + 2I⁻(aq) → 2Cl⁻(aq) + I₂(aq). Each chlorine molecule gains two electrons and is reduced; the iodide ions lose electrons and are oxidised. This happens because chlorine is a stronger oxidising agent than iodine.",
    hints: ["Observation, equation, electron transfer."],
    explanation: "Displacement shows the order of oxidising power.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why the bond energy decreases from Cl–Cl to I–I.",
    points: [
      "The atoms get larger down the group (more shells)",
      "The bonding pair is further from the nuclei and more shielded",
      "So the attraction between the nuclei and the shared pair is weaker (longer bond), and less energy is needed to break it",
    ],
    modelAnswer: "Down the group the halogen atoms have more electron shells and are larger. The shared pair of electrons is further from the two nuclei and more shielded from them, so it is attracted less strongly. The bond is longer and weaker, so less energy is needed to break it.",
    hints: ["Think about the distance of the shared pair from the nuclei."],
    explanation: "Atom size controls the bond energy from Cl to I.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 3, applies: ZIM,
    stem: "Iodine oxidises thiosulfate only to tetrathionate (average oxidation number of S +2.5), whereas chlorine oxidises it to sulfate (S +6). Explain what this shows, and write the equation for the reaction with chlorine.",
    points: [
      "Chlorine is a much stronger oxidising agent than iodine",
      "so it removes more electrons from sulfur, raising its oxidation number further (to +6)",
      "S₂O₃²⁻ + 4Cl₂ + 5H₂O → 2SO₄²⁻ + 8Cl⁻ + 10H⁺",
    ],
    modelAnswer: "The different products show that chlorine is a far stronger oxidising agent than iodine: it oxidises the sulfur all the way from +2 to +6, while iodine only takes it to +2.5. S₂O₃²⁻ + 4Cl₂ + 5H₂O → 2SO₄²⁻ + 8Cl⁻ + 10H⁺.",
    hints: ["Each Cl₂ gains two electrons; each S atom loses four going from +2 to +6."],
    explanation: "Oxidising power decreases down Group 17.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true,
    stem: "Chipo added a few drops of each halogen solution to separate solutions of potassium halides, then shook each mixture with cyclohexane. A tick (✓) means a colour change was seen; a cross (✗) means no change.\n\n| | KCl(aq) | KBr(aq) | KI(aq) |\n|---|---|---|---|\n| chlorine water | — | ✓ | ✓ |\n| bromine water | ✗ | — | ✓ |\n| iodine solution | ✗ | ✗ | — |",
    parts: [
      P.mcq({ label: "(a)", stem: "What is the order of oxidising power, strongest first?", options: [
        ["Cl₂ > Br₂ > I₂", "Correct: chlorine displaces both; iodine displaces neither."],
        ["I₂ > Br₂ > Cl₂", "This is reversed."],
        ["Br₂ > Cl₂ > I₂", "Chlorine displaces bromine, so chlorine is stronger."],
        ["Cl₂ > I₂ > Br₂", "Bromine displaces iodine, so bromine is stronger."],
      ], answer: "A", explanation: "Two ticks for Cl₂, one for Br₂, none for I₂." }),
      P.fib({ label: "(b)", stem: "Complete the observations.", template: "Chlorine water with KBr: cyclohexane layer turns {{blank:a}}. Bromine water with KI: cyclohexane layer turns {{blank:b}}.", blanks: [
        { id: "a", accepted: ["orange-red"], choices: ["orange-red", "violet", "pale green", "colourless"] },
        { id: "b", accepted: ["violet"], choices: ["orange-red", "violet", "pale green", "colourless"] },
      ], explanation: "Bromine is orange-red and iodine violet in cyclohexane." }),
      P.short({ label: "(c)", marks: 1, stem: "Write the ionic equation for bromine water reacting with potassium iodide (type, e.g., A + 2B -> 2C + D).", accepted: ["Br2 + 2I- -> 2Br- + I2", "Br2 + 2I- → 2Br- + I2", "Br2(aq) + 2I-(aq) -> 2Br-(aq) + I2(aq)", "Br₂ + 2I⁻ → 2Br⁻ + I₂"], normalise: ["trim", "collapse_whitespace"], wrong: ["Br + I- -> Br- + I"], explanation: "Br₂ + 2I⁻ → 2Br⁻ + I₂." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain the trend in oxidising power shown by the results.", points: ["Atoms get larger down the group, so the electron gained goes into a shell further from the nucleus with more shielding", "It is attracted less strongly, so the tendency to gain electrons (oxidising power) decreases"], modelAnswer: "Down the group the atoms are larger, so an incoming electron enters a shell further from the nucleus and more shielded by inner electrons. It is attracted less strongly, so the halogen is less able to gain electrons and is a weaker oxidising agent." }),
      P.manual({ label: "(e)", marks: 1, stem: "State why the mixtures are shaken with cyclohexane.", points: ["The halogens dissolve better in the non-polar solvent and give distinct colours, so the product can be identified (Br₂ orange-red, I₂ violet)"], modelAnswer: "Halogens are more soluble in cyclohexane and have distinctive colours in it, so bromine and iodine are easy to tell apart." }),
      P.manual({ label: "(f)", marks: 1, stem: "Give one safety precaution for this experiment.", points: ["Use a fume cupboard (chlorine and bromine are toxic) / wear gloves for bromine / no flames near cyclohexane (flammable)"], modelAnswer: "Work in a fume cupboard because chlorine and bromine vapours are toxic, and keep flames away from the flammable cyclohexane." }),
    ],
    hints: ["Count how many halides each halogen displaces."],
    explanation: "Cl₂ displaces Br⁻ and I⁻; Br₂ displaces I⁻; I₂ displaces neither: oxidising power Cl₂ > Br₂ > I₂.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: "Data (bond energies, kJ mol⁻¹): H–H 436; F–F 158; H–F 562. The H–X bond energy decreases steadily from H–F to H–I.",
    parts: (() => {
      const dHF = bondEnergyDH([[1, 436], [1, 158]], [[2, 562]]);
      return [
        P.num({ label: "(a)", marks: 2, stem: "Calculate ΔH, in kJ mol⁻¹, for H₂(g) + F₂(g) → 2HF(g).", value: dHF, unit: "kJ/mol", wrong: [436 + 158 - 562], explanation: `(436 + 158) − 2 × 562 = ${dHF} kJ mol⁻¹.` }),
        P.manual({ label: "(b)", marks: 2, stem: "Use your answer and the data to explain why hydrogen and fluorine react explosively, even in the dark.", points: ["The reaction is very exothermic (large negative ΔH) because H–F is very strong", "The F–F bond is very weak, so the activation energy is low and the reaction starts easily"], modelAnswer: "The reaction is extremely exothermic because the H–F bonds formed are very strong. The F–F bond is weak, so little energy is needed to start the reaction; it therefore proceeds explosively even without light." }),
        P.manual({ label: "(c)", marks: 2, stem: "Describe and explain the trend in the thermal stability of the hydrogen halides.", points: ["Thermal stability decreases from HF to HI (HI decomposes on heating; HF, HCl do not)", "The H–X bond energy decreases (562 to 299) because the halogen atom is larger and the bond longer"], modelAnswer: "Thermal stability decreases from HF to HI: HI is decomposed by a hot wire into hydrogen and purple iodine, but HF and HCl are not decomposed by ordinary heating. The H–X bond energy falls steadily from HF to HI as the halogen atom becomes larger and the bond longer and weaker." }),
        P.short({ label: "(d)", marks: 1, stem: "Write the equation for the decomposition of hydrogen iodide (type, e.g., 2A -> B + C).", accepted: ["2HI -> H2 + I2", "2HI → H2 + I2", "2HI(g) -> H2(g) + I2(g)", "2HI(g) → H2(g) + I2(g)", "2HI <=> H2 + I2"], normalise: ["trim", "collapse_whitespace"], wrong: ["HI -> H + I"], explanation: "2HI → H₂ + I₂ (purple fumes)." }),
        P.mcq({ label: "(e)", stem: "What would be seen when a red-hot wire is plunged into hydrogen iodide gas?", options: [
          ["purple fumes", "Correct: iodine vapour is purple."],
          ["orange-brown fumes", "This would be bromine from HBr."],
          ["steamy white fumes", "That is HCl or HI meeting moist air, not decomposition."],
          ["no visible change", "HI decomposes readily."],
        ], answer: "A", explanation: "Iodine vapour is purple." }),
      ];
    })(),
    hints: ["Bonds broken minus bonds made.", "Compare H–X bond energies."],
    explanation: "ΔH(H₂ + F₂) is very exothermic; HX stability falls with H–X bond energy.",
  });
  b.card("FACT", "Colours of the halogens", "Cl₂ pale green gas; Br₂ red-brown liquid (orange-brown vapour); I₂ grey-black solid (purple vapour).");
  b.card("FACT", "Halogens in cyclohexane", "Bromine orange-red; iodine violet. In water: Br₂ orange-yellow, I₂ brown.");
  b.card("CONCEPT", "Volatility of the halogens", "Decreases down the group: more electrons, stronger instantaneous dipole-induced dipole forces.");
  b.card("CONCEPT", "X–X bond energy trend", "Cl–Cl 242 > Br–Br 193 > I–I 151 (larger atoms); F–F only 158 because lone pairs on small F atoms repel.");
  b.card("CONCEPT", "Oxidising power of the halogens", "Cl₂ > Br₂ > I₂: smaller atom attracts an incoming electron more strongly (E⦵ more positive).");
  b.card("FORMULA", "Displacement reactions", "Cl₂ + 2Br⁻ → 2Cl⁻ + Br₂; Cl₂ + 2I⁻ → 2Cl⁻ + I₂; Br₂ + 2I⁻ → 2Br⁻ + I₂.");
  b.card("FACT", "Halogens with hydrogen", "F₂ explosive in the dark; Cl₂ explosive in sunlight; Br₂ needs heat + Pt; I₂ slow, reversible.");
  b.card("CONCEPT", "Thermal stability of HX", "Decreases HF > HCl > HBr > HI as H–X bond energy falls; HI gives purple iodine with a hot wire.");
  b.card("FORMULA", "Iodine and thiosulfate (ZIMSEC)", "I₂ + 2S₂O₃²⁻ → 2I⁻ + S₄O₆²⁻; chlorine oxidises thiosulfate to sulfate.", undefined, { applies: ZIM });
});
