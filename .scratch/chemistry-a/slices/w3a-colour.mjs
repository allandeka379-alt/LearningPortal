// W3a: achem.transition.colour (both boards; ZIMSEC Form 6, Cambridge A Level).
import { concept, P, t, chk, linearFit, AR, sfStr, sciStr } from "../lib.mjs";

concept("achem.transition.colour", { file: "transition/colour", keyPrefix: "transition.colour" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "How are the 3d orbitals of a transition metal ion split in an octahedral complex?",
    options: [
      ["two orbitals at higher energy and three at lower energy", "Correct: dx²−y² and dz² point at the ligands and are raised."],
      ["three orbitals at higher energy and two at lower energy", "This is the pattern in a tetrahedral complex."],
      ["all five orbitals are raised by exactly the same amount", "Equal raising would leave them degenerate, with no colour."],
      ["one orbital at higher energy and four at lower energy", "No common complex shape gives a one-and-four split."],
    ],
    answer: "A",
    explanation: "In an octahedral complex the ligands lie on the axes, so the two orbitals pointing along the axes (dx²−y², dz²) are raised above the other three.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why is aqueous zinc sulfate colourless?",
    options: [
      ["Zn²⁺ has a full 3d sub-shell, so no d-d transition can occur.", "Correct: 3d¹⁰ leaves no space in the higher d orbitals."],
      ["Zn²⁺ has no d electrons, so nothing can absorb visible light.", "Zn²⁺ has ten d electrons; it is Sc³⁺ that has none."],
      ["Water ligands do not split the d orbitals of a zinc ion at all.", "The orbitals are split, but with all of them full no electron can be promoted."],
      ["Zinc ions absorb all colours of visible light equally strongly.", "Absorbing all visible light would make the solution look black or grey."],
    ],
    answer: "A",
    explanation: "A d-d transition needs a partly filled d sub-shell. Zn²⁺ (3d¹⁰) and Cu⁺ (3d¹⁰) have full d sub-shells; Sc³⁺ (3d⁰) has an empty one.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A complex ion absorbs mainly orange-red light from the visible spectrum. What colour is its solution?",
    options: [
      ["blue", "Correct: blue is the complementary colour of orange-red."],
      ["orange-red", "That is the colour removed from white light, not the colour seen."],
      ["yellow", "Yellow is seen when violet-blue light is absorbed."],
      ["colourless", "A solution that absorbs visible light is coloured."],
    ],
    answer: "A",
    explanation: "The colour seen is the complementary colour of the light absorbed: removing orange-red leaves blue.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which of the ions would give a colourless aqueous complex?\n\n1. Sc³⁺\n2. Cu⁺\n3. Ti³⁺",
    options: [
      ["1 and 2 only", "Correct: Sc³⁺ is 3d⁰ and Cu⁺ is 3d¹⁰."],
      ["1, 2 and 3", "Ti³⁺ is 3d¹, so its complexes are coloured (violet)."],
      ["2 and 3 only", "Sc³⁺ is colourless, and Ti³⁺ is coloured."],
      ["1 only", "Cu⁺ (3d¹⁰) is also colourless."],
    ],
    answer: "A",
    hints: ["Write the d-electron count of each ion."],
    explanation: "d⁰ and d¹⁰ ions cannot undergo d-d transitions; Ti³⁺ (d¹) can.",
  });
  b.mcq({
    d: 3, skill: "RECALL",
    stem: "How do the d orbitals split in a tetrahedral complex, compared with an octahedral complex of the same ion?",
    options: [
      ["three higher and two lower, with a smaller ΔE", "Correct: the pattern is reversed and the splitting is smaller."],
      ["three higher and two lower, with a larger ΔE", "The pattern is right but tetrahedral splitting is smaller."],
      ["two higher and three lower, with a smaller ΔE", "Two higher and three lower is the octahedral pattern."],
      ["two higher and three lower, with a larger ΔE", "This is the octahedral pattern, and ΔE is not larger."],
    ],
    answer: "A",
    hints: ["In a tetrahedron the ligands lie between the axes."],
    explanation: "Four ligands between the axes raise dxy, dxz and dyz; fewer ligands and no direct overlap make ΔE smaller.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Excess ammonia turns pale blue aqueous copper(II) ions deep blue. Which statement best explains the change of colour?",
    options: [
      ["Ammonia ligands split the d orbitals by a different amount, so light of a different frequency is absorbed.", "Correct: a different ΔE means a different frequency absorbed and a different complementary colour."],
      ["Ammonia oxidises copper(II) to copper(III), which has a different number of d electrons.", "No redox happens: copper stays +2 in [Cu(NH₃)₄(H₂O)₂]²⁺."],
      ["Ammonia removes the d electrons from copper, so a d-d transition becomes possible.", "Ligands donate electrons; they do not remove the metal's d electrons."],
      ["Ammonia makes the d orbitals degenerate, so more light passes straight through the solution.", "Degenerate d orbitals would give no d-d absorption at all."],
    ],
    answer: "A",
    hints: ["Has the oxidation state of copper changed?"],
    explanation: "Ligand exchange changes ΔE. NH₃ produces a larger splitting than H₂O, so higher-frequency light is absorbed and a deeper blue is seen.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Complex **X** absorbs light of lower frequency than complex **Y** of the same metal ion. What can be deduced?",
    options: [
      ["ΔE is smaller in **X** than in **Y**.", "Correct: ΔE = hf, so lower frequency means a smaller energy gap."],
      ["ΔE is larger in **X** than in **Y**.", "A larger gap would need higher-frequency light."],
      ["**X** has more unpaired electrons than **Y**.", "The frequency absorbed depends on the splitting, not directly on the number of unpaired electrons."],
      ["**X** must be octahedral and **Y** tetrahedral.", "Octahedral complexes usually have the larger ΔE, so this is the wrong way round."],
    ],
    answer: "A",
    hints: ["Use ΔE = hf."],
    explanation: "Energy absorbed = hf. Lower frequency → smaller ΔE, for example because **X** is tetrahedral or has weaker-field ligands.",
  });
  b.mcq({
    d: 4, skill: "UNDERSTANDING",
    stem: "Which statements correctly describe the origin of colour in [Ni(H₂O)₆]²⁺?\n\n1. The water ligands make the 3d orbitals non-degenerate.\n2. An electron absorbs visible light of energy ΔE and is promoted to a higher d orbital.\n3. The colour seen is the colour of the light absorbed.",
    options: [
      ["1 and 2 only", "Correct: the colour seen is the complementary colour, so statement 3 is false."],
      ["1, 2 and 3", "Statement 3 is false: the colour seen is what remains after absorption."],
      ["2 and 3 only", "Statement 1 is true and statement 3 is false."],
      ["1 only", "Statement 2 is also true: it is the absorption step."],
    ],
    answer: "A",
    hints: ["What happens to the light that is not absorbed?"],
    explanation: "Ligands split the d orbitals; an electron absorbs light of energy ΔE; the remaining (complementary) light is seen: green for Ni²⁺(aq).",
  });
  b.num({
    d: 2, skill: "RECALL", daily: true,
    stem: "How many electrons are in the 3d sub-shell of a Cu⁺ ion?",
    value: 10,
    wrong: [9],
    explanation: "Cu is [Ar] 3d¹⁰ 4s¹; Cu⁺ loses the 4s electron: [Ar] 3d¹⁰. A full d sub-shell, so copper(I) compounds are colourless.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The colour of a transition metal complex is the colour of the light it absorbs.",
    answer: false,
    explanation: "False. The colour seen is the complementary colour: the light left after the absorbed frequencies are removed.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each complex with its colour.",
    pairs: [
      [t`$\ce{[Cu(H2O)6]^2+}$`, "pale blue"],
      [t`$\ce{[Cu(NH3)4(H2O)2]^2+}$`, "deep blue"],
      [t`$\ce{[Co(H2O)6]^2+}$`, "pink"],
      [t`$\ce{[CuCl4]^2-}$`, "yellow"],
    ],
    extraRight: ["colourless"],
    explanation: "Copper(II): pale blue aqua, deep blue ammine, yellow chloro complex; cobalt(II) aqua ion: pink. Colourless would need d⁰ or d¹⁰.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Complete the sentences about d-orbital splitting.",
    template: "In an octahedral complex {{blank:a}} d orbitals are raised in energy. In a tetrahedral complex {{blank:b}} d orbitals are raised, and the energy gap ΔE is {{blank:c}} than in an octahedral complex of the same ion.",
    blanks: [
      { id: "a", accepted: ["two"], choices: ["two", "three", "five"] },
      { id: "b", accepted: ["three"], choices: ["two", "three", "five"] },
      { id: "c", accepted: ["smaller"], choices: ["smaller", "larger"] },
    ],
    hints: ["Which orbitals point at the ligands in each shape?"],
    explanation: "Octahedral: 2 up, 3 down. Tetrahedral: 3 up, 2 down, with a smaller splitting.",
  });
  b.short({
    d: 3, skill: "RECALL",
    stem: "Name the instrument that measures how much light of one colour a coloured solution absorbs, so that its concentration can be found from a calibration graph.",
    accepted: ["colorimeter", "a colorimeter", "spectrophotometer", "UV-visible spectrophotometer", "colourimeter"],
    wrong: ["calorimeter"],
    hints: ["Not a calorimeter, which measures heat."],
    explanation: "A colorimeter (or a visible spectrophotometer) measures absorbance; absorbance is proportional to concentration over a working range.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: t`Explain why $\ce{[Cu(H2O)6]^2+}$ is coloured.`,
    points: [
      "Cu²⁺ has a partly filled 3d sub-shell (3d⁹)",
      "The water ligands split the d orbitals into two groups of different energy (non-degenerate)",
      "An electron absorbs visible light of energy ΔE (frequency f, ΔE = hf) and is promoted to a higher d orbital",
      "The light not absorbed is seen: the complementary colour (red-orange absorbed, blue seen)",
    ],
    modelAnswer: "Cu²⁺ is 3d⁹. The six water ligands split the 3d orbitals into a lower group of three and a higher group of two. An electron absorbs visible light whose energy equals the gap ΔE and is promoted to the higher level. Red-orange light is absorbed, and the remaining light, which we see, is blue.",
    hints: ["Four steps: configuration, splitting, absorption, complementary colour."],
    explanation: "Colour needs a partly filled d sub-shell split by ligands.",
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 3,
    stem: "When concentrated hydrochloric acid is added to pink aqueous cobalt(II) ions, the solution turns blue. Explain the change of colour.",
    points: [
      "Ligand exchange: chloride ions replace water, forming [CoCl₄]²⁻ (tetrahedral)",
      "The different ligands and shape give a different (smaller) ΔE",
      "So light of a different (lower) frequency is absorbed, and the complementary colour seen changes from pink to blue",
    ],
    modelAnswer: "Four chloride ions replace the six water ligands to form tetrahedral [CoCl₄]²⁻. The change of ligand and shape makes the d-orbital splitting smaller, so lower-frequency (orange-red) light is absorbed instead of green, and the solution looks blue instead of pink.",
    hints: ["What happens to ΔE when the ligand and shape change?"],
    explanation: "Different ligand and shape → different ΔE → different frequency absorbed → different colour.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Outline how a colorimeter could be used to find the concentration of copper(II) ions in a solution.",
    points: [
      "Make up a series of standard solutions of known Cu²⁺ concentration (often with excess ammonia to deepen the colour)",
      "Use a filter of the colour most strongly absorbed (complementary to the solution's colour, e.g. orange-red for blue) and zero the colorimeter with water (blank)",
      "Measure the absorbance of each standard and plot a calibration graph of absorbance against concentration",
      "Measure the absorbance of the unknown under the same conditions and read its concentration from the graph",
    ],
    modelAnswer: "Prepare standard solutions of copper(II) of known concentrations and treat each, and the unknown, with the same excess of ammonia. Choose an orange or red filter (the colour absorbed most) and zero the colorimeter with a blank. Measure the absorbance of each standard and plot absorbance against concentration. Measure the unknown in the same way and read its concentration from the calibration graph.",
    hints: ["Standards, filter, calibration graph, unknown."],
    explanation: "Colorimetry compares the unknown with standards measured under the same conditions.",
  });
  {
    const pts = [[1.0e-4, 0.08], [2.0e-4, 0.17], [3.0e-4, 0.25], [4.0e-4, 0.33], [5.0e-4, 0.42]];
    const { m, c } = linearFit(pts);
    chk(m, 840, 1e-6, "gradient");
    chk(c, -0.002, 1e-9, "intercept");
    const A = 0.29;
    const conc = (A - c) / m;
    const mg = conc * 0.250 * AR.Fe * 1000;
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
      stem: `Nyasha measured the iron content of borehole water near Masvingo. She oxidised all the iron to iron(III), added excess potassium thiocyanate to form the blood-red complex [Fe(SCN)(H₂O)₅]²⁺, and measured absorbances with a colorimeter.\n\n| [Fe³⁺] / mol dm⁻³ | ${pts.map(([x]) => sciStr(x, 2)).join(" | ")} |\n|---|---|---|---|---|---|\n| absorbance | ${pts.map(([, y]) => y.toFixed(2)).join(" | ")} |\n\nThe best-fit line is: absorbance = ${m} × [Fe³⁺] ${c < 0 ? "−" : "+"} ${Math.abs(c).toFixed(3)}. The treated water sample had an absorbance of ${A.toFixed(2)}.`,
      parts: [
        P.manual({ label: "(a)", marks: 1, stem: "Suggest why thiocyanate is added before the absorbances are measured.", points: ["It forms an intensely coloured (blood-red) complex with Fe³⁺, so small concentrations absorb strongly and can be measured"], modelAnswer: "Aqueous iron(III) is only pale; the thiocyanate complex is intensely red, so low concentrations give measurable absorbances." }),
        P.mcq({ label: "(b)", stem: "Which colour of filter should be used?", options: [
          ["blue-green", "Correct: a red solution absorbs blue-green light most strongly."],
          ["red", "Red light passes through a red solution; little would be absorbed."],
          ["orange", "Orange is close to red, which the solution transmits."],
          ["yellow", "Yellow light is absorbed only weakly by a red solution."],
        ], answer: "A", explanation: "Use the colour the solution absorbs: the complementary colour of red, blue-green." }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the concentration of iron(III) in the treated sample, in mol dm⁻³, to three significant figures.", value: conc, sf: 3, unit: "mol/dm³", wrong: [A / m], explanation: `[Fe³⁺] = (${A.toFixed(2)} + ${Math.abs(c).toFixed(3)}) ÷ ${m} = ${sciStr(conc, 3)} mol dm⁻³. Ignoring the intercept gives ${sciStr(A / m, 3)}.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the mass of iron, in mg, in 250 cm³ of the treated sample, to three significant figures. (Ar: Fe 55.8)", value: mg, sf: 3, unit: "mg", wrong: [sfStr(conc * 250 * AR.Fe * 1000, 3)], explanation: `n = ${sciStr(conc, 3)} × 0.250 = ${sciStr(conc * 0.25, 3)} mol; mass = ${sciStr(conc * 0.25, 3)} × 55.8 g = ${sfStr(mg, 3)} mg. Forgetting to convert 250 cm³ to dm³ gives a value 1000 times too large.` }),
        P.manual({ label: "(e)", marks: 1, stem: "Explain why a calibration graph with several standards is better than comparing the sample with one standard.", points: ["It checks that absorbance is proportional to concentration (linear) over the range, and averages out random errors in individual standards (or shows anomalies)"], modelAnswer: "Several standards show whether absorbance is proportional to concentration over the range used and reduce the effect of an error in any one standard." }),
        P.tf({ label: "(f)", stem: "If fingerprints were left on the cuvette holding the sample, the iron concentration found would be too high.", answer: true, explanation: "True: smears scatter or absorb light, so the measured absorbance and the concentration read from the graph are too high." }),
      ],
      hints: ["Rearrange the equation of the line for [Fe³⁺].", "Convert 250 cm³ to dm³ before multiplying."],
      explanation: `[Fe³⁺] = ${sciStr(conc, 3)} mol dm⁻³; ${sfStr(mg, 3)} mg of iron in 250 cm³.`,
    });
  }
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true,
    stem: "Information about four complexes:\n\n| complex | shape | colour of light mainly absorbed | colour seen |\n|---|---|---|---|\n| [Co(H₂O)₆]²⁺ | octahedral | green | pink |\n| [CoCl₄]²⁻ | tetrahedral | orange-red | blue |\n| [Cu(H₂O)₆]²⁺ | octahedral | orange-red | pale blue |\n| [ZnCl₄]²⁻ | tetrahedral | none (visible) | colourless |",
    parts: [
      P.fib({ label: "(a)", stem: "Complete the description of the splitting in [Co(H₂O)₆]²⁺.", template: "The {{blank:a}} orbitals dx²−y² and dz² are raised because they point {{blank:b}} the ligands.", blanks: [
        { id: "a", accepted: ["two"], choices: ["two", "three"] },
        { id: "b", accepted: ["directly at"], choices: ["directly at", "between"] },
      ], explanation: "In an octahedron the ligands are on the axes, so the two axial orbitals are raised." }),
      P.mcq({ label: "(b)", stem: "Which cobalt complex has the smaller ΔE?", options: [
        [t`$\ce{[CoCl4]^2-}$`, "Correct: it absorbs lower-frequency (orange-red) light, and tetrahedral splitting is smaller."],
        [t`$\ce{[Co(H2O)6]^2+}$`, "It absorbs green light, of higher frequency than orange-red, so its ΔE is larger."],
        ["both have the same ΔE", "They absorb different colours, so their ΔE values differ."],
        ["neither, because cobalt(II) has a full d sub-shell", "Co²⁺ is 3d⁷, partly filled."],
      ], answer: "A", explanation: "Orange-red light has a lower frequency than green, so ΔE(CoCl₄²⁻) < ΔE(Co(H₂O)₆²⁺)." }),
      P.manual({ label: "(c)", marks: 3, stem: "Use the table to explain why [CoCl₄]²⁻ is blue.", points: ["Chloride ligands in a tetrahedral arrangement split the d orbitals (three higher, two lower) with a small ΔE", "An electron is promoted by absorbing light of energy ΔE, which lies in the orange-red (low-frequency) part of the spectrum", "The transmitted light is the complementary colour, blue"], modelAnswer: "In tetrahedral [CoCl₄]²⁻ the d orbitals split three up and two down, with a small gap. An electron absorbs orange-red light, whose energy matches this small gap, and is promoted. The remaining light, which we see, is blue." }),
      P.num({ label: "(d)", stem: "How many d electrons does the Co²⁺ ion have?", value: 7, wrong: [9], explanation: "Co [Ar] 3d⁷ 4s²; Co²⁺ [Ar] 3d⁷." }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain why [ZnCl₄]²⁻ is colourless even though it has the same shape and ligands as [CoCl₄]²⁻.", points: ["Zn²⁺ is 3d¹⁰: the d sub-shell is full", "So no electron can be promoted between d orbitals (no d-d transition) and no visible light is absorbed"], modelAnswer: "Zn²⁺ has a full 3d¹⁰ sub-shell, so even though the orbitals are split there is no vacancy in the higher level; no d-d transition can occur and no visible light is absorbed." }),
      P.mcq({ label: "(f)", stem: "A nickel complex absorbs mainly violet-blue light. What colour is it?", options: [
        ["yellow", "Correct: yellow is the complement of violet-blue."],
        ["violet", "Violet is the light removed, not the light seen."],
        ["blue", "Blue is seen when orange-red light is absorbed."],
        ["pink", "Pink is seen when green light is absorbed."],
      ], answer: "A", explanation: "Absorbing violet-blue light leaves yellow." }),
      P.tf({ label: "(g)", stem: "Complexes of Ti³⁺ (3d¹) are coloured.", answer: true, explanation: "True: one d electron can be promoted, so [Ti(H₂O)₆]³⁺ absorbs visible light (it is violet)." }),
      P.num({ label: "(h)", stem: "How many unpaired electrons does a Cu²⁺ ion have?", value: 1, wrong: [9], explanation: "3d⁹: four pairs and one unpaired electron." }),
    ],
    hints: ["Lower frequency absorbed means a smaller ΔE.", "A d-d transition needs a partly filled d sub-shell."],
    explanation: "Tetrahedral and chloro complexes have smaller ΔE; colour is the complement of the light absorbed; d¹⁰ ions are colourless.",
  });
  b.card("CONCEPT", "Octahedral splitting", "Two d orbitals (dx²−y², dz²) raised, three (dxy, dxz, dyz) lowered, because the ligands lie on the axes.");
  b.card("CONCEPT", "Tetrahedral splitting", "Three orbitals raised and two lowered; ΔE smaller than in an octahedral complex of the same ion.");
  b.card("CONCEPT", "Why complexes are coloured", "Ligands split the d orbitals; an electron absorbs visible light of energy ΔE = hf and is promoted; the complementary colour is seen.");
  b.card("FACT", "Colourless ions", "Sc³⁺ and Ti⁴⁺ (3d⁰), Zn²⁺ and Cu⁺ (3d¹⁰): no d-d transition is possible.");
  b.card("FACT", "Complementary colours", "Red-orange absorbed → blue seen; green absorbed → pink/red-purple seen; violet-blue absorbed → yellow seen.");
  b.card("CONCEPT", "Why ligand exchange changes colour", "A different ligand (or shape) gives a different ΔE, so a different frequency of light is absorbed.");
  b.card("FACT", "Copper(II) complex colours", "[Cu(H₂O)₆]²⁺ pale blue; [Cu(NH₃)₄(H₂O)₂]²⁺ deep blue; [CuCl₄]²⁻ yellow (yellow-green in mixtures).");
  b.card("FACT", "Cobalt(II) complex colours", "[Co(H₂O)₆]²⁺ pink; [CoCl₄]²⁻ blue; [Co(NH₃)₆]²⁺ straw-coloured.");
  b.card("CONCEPT", "Colorimetry in outline", "Filter of the absorbed (complementary) colour; standards → calibration graph of absorbance against concentration; read off the unknown.");
});
