// W2b: achem.group2.thermal-stability-solubility (both boards; ZIMSEC Form 5, Cambridge A Level only).
// Lattice and hydration values in questions are "given" values (stated in the stem), not claimed measurements.
import { concept, P, t, chk, solutionEnthalpy, sfStr } from "../lib.mjs";

concept("achem.group2.thermal-stability-solubility", { file: "group2/thermal-stability-solubility", keyPrefix: "group2.thermal-stability-solubility" }, (b) => {
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which Group 2 cation has the highest charge density?",
    options: [
      [t`$\ce{Mg^2+}$`, "Correct: same 2+ charge as the others but the smallest radius."],
      [t`$\ce{Ca^2+}$`, "Calcium ions are larger than magnesium ions."],
      [t`$\ce{Sr^2+}$`, "Strontium ions are larger still."],
      [t`$\ce{Ba^2+}$`, "Barium ions are the largest, so they have the lowest charge density."],
    ],
    answer: "A",
    explanation: "Charge density = charge ÷ size; all are 2+, and Mg²⁺ is the smallest.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why does magnesium carbonate decompose at a lower temperature than calcium carbonate?",
    options: [
      ["Mg²⁺ is smaller, so it polarises the carbonate ion more and weakens a C–O bond.", "Correct: a more distorted anion breaks up more easily."],
      ["Mg²⁺ has a larger charge than Ca²⁺, so it attracts carbonate more strongly.", "Both ions have a 2+ charge; the difference is size."],
      ["The carbonate ion polarises Mg²⁺ more than it polarises Ca²⁺.", "It is the cation that polarises the anion, not the reverse."],
      ["Magnesium is more reactive than calcium, so its compounds break down.", "Magnesium is less reactive than calcium."],
    ],
    answer: "A",
    explanation: "Higher charge density of Mg²⁺ → greater polarisation of CO₃²⁻ → weaker C–O bond → lower decomposition temperature.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements explain why thermal stability of the Group 2 nitrates increases down the group?\n\n1. The ionic radius of the cation increases while its charge stays at 2+.\n2. The charge density of the cation decreases, so the nitrate ion is polarised less.\n3. The nitrate ion becomes smaller down the group.",
    options: [
      ["1 and 2 only", "Correct: the nitrate ion is the same in every compound."],
      ["1, 2 and 3", "Statement 3 is false: NO₃⁻ is identical in every nitrate."],
      ["2 and 3 only", "Statement 3 is false and statement 1 is part of the explanation."],
      ["1 only", "Statement 2 is the key link to the weakening of N–O bonds."],
    ],
    answer: "A",
    hints: ["Which ion changes from compound to compound?"],
    explanation: "Larger cation, same charge → lower charge density → less polarisation of NO₃⁻ → N–O bonds weakened less → more heat needed.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Down Group 2, how do the lattice energy (magnitude) and the hydration enthalpy of the cation (magnitude) of the sulfates change, and what is the effect on solubility?",
    options: [
      ["Lattice energy falls slightly, hydration enthalpy falls a lot: solubility decreases.", "Correct: ΔH_sol becomes more endothermic."],
      ["Lattice energy falls a lot, hydration enthalpy falls slightly: solubility increases.", "This describes the hydroxides, which have a small anion."],
      ["Both increase in magnitude: solubility decreases.", "Both fall in magnitude because the cation gets larger."],
      ["Lattice energy increases, hydration enthalpy falls: solubility decreases.", "Lattice energy falls in magnitude as the cation grows."],
    ],
    answer: "A",
    hints: ["The sulfate ion is large: how much does a bigger cation change the distance between ions?"],
    explanation: "With a large anion, the inter-ion distance hardly changes, so lattice energy changes little; hydration of the cation falls a lot.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements about the Group 2 hydroxides are correct?\n\n1. Their solubility increases down the group.\n2. Their lattice energy becomes less exothermic down the group faster than the hydration enthalpy of the cation does.\n3. Their enthalpy change of solution becomes more endothermic down the group.",
    options: [
      ["1 and 2 only", "Correct: ΔH_sol becomes less endothermic, so statement 3 is false."],
      ["1, 2 and 3", "Statement 3 contradicts statements 1 and 2."],
      ["2 and 3 only", "Statement 1 is true and statement 3 is false."],
      ["1 only", "Statement 2 is also true: it is the reason for statement 1."],
    ],
    answer: "A",
    hints: ["The hydroxide ion is small."],
    explanation: "Small OH⁻: lattice energy falls steeply as the cation grows, so less energy is needed to break the lattice relative to hydration.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Lithium is in Group 1 but its ion is small, similar in size to Mg²⁺. Lithium carbonate decomposes on strong heating, whereas sodium carbonate does not. Which is the best explanation?",
    options: [
      ["Li⁺ has a high charge density and polarises the carbonate ion, weakening a C–O bond.", "Correct: the same argument as for Mg²⁺ in Group 2."],
      ["Li⁺ has a lower charge than Na⁺, so it holds carbonate less tightly.", "Both ions are 1+."],
      ["Lithium carbonate has a larger lattice energy, so it is more stable.", "A larger lattice energy would not make it decompose more easily."],
      ["Sodium is more reactive, so sodium carbonate cannot lose CO₂.", "Reactivity of the metal does not explain carbonate stability."],
    ],
    answer: "A",
    hints: ["Compare charge density, not charge."],
    explanation: "Small Li⁺ (high charge density) polarises CO₃²⁻ like Mg²⁺ does; larger Na⁺ cannot.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which change would make a Group 2 sulfate more soluble, if all other terms stayed the same?",
    options: [
      ["a more exothermic hydration enthalpy of the cation", "Correct: more energy released on hydration makes ΔH_sol more exothermic."],
      ["a more exothermic lattice energy", "This means more energy is needed to break the lattice, so ΔH_sol is more endothermic."],
      ["a larger cation radius", "A larger cation lowers the hydration enthalpy much more than the lattice energy for sulfates."],
      ["a less exothermic hydration enthalpy of the sulfate ion", "Less energy released on hydration makes ΔH_sol more endothermic."],
    ],
    answer: "A",
    hints: ["ΔH_sol = −ΔH_latt + ΣΔH_hyd."],
    explanation: "ΔH_sol becomes more exothermic only if hydration releases more energy or breaking the lattice needs less.",
  });
  {
    const ratio = (2 / 100) / (2 / 135);
    b.num({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: "Taking charge density as charge ÷ ionic radius, calculate how many times greater the charge density of Ca²⁺ (radius 100 pm) is than that of Ba²⁺ (radius 135 pm), to three significant figures.",
      value: ratio, sf: 3,
      wrong: [sfStr(1 / ratio, 3)],
      explanation: `(2/100) ÷ (2/135) = 135 ÷ 100 = ${sfStr(ratio, 3)}. The charges cancel, so the ratio is just the inverse ratio of the radii.`,
    });
  }
  {
    const dH = solutionEnthalpy(-2630, [-1650, -1100]);
    chk(dH, -120);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "Use these values (kJ mol⁻¹) to calculate the enthalpy change of solution of calcium sulfate, in kJ mol⁻¹: lattice energy of CaSO₄ −2630; enthalpy change of hydration of Ca²⁺ −1650 and of SO₄²⁻ −1100.",
      value: dH, unit: "kJ/mol",
      wrong: [-2630 - 1650 - 1100, 2630 + 1650 + 1100],
      hints: ["Breaking the lattice is the reverse of the lattice energy."],
      explanation: `1. ΔH_sol = −ΔH_latt + ΔH_hyd(Ca²⁺) + ΔH_hyd(SO₄²⁻).\n2. = +2630 − 1650 − 1100 = ${dH} kJ mol⁻¹. Adding the lattice energy without changing its sign gives ${-2630 - 1650 - 1100} kJ mol⁻¹.`,
    });
  }
  {
    const LE = -1650 - 2 * 460 - 70;
    chk(solutionEnthalpy(LE, [-1650, -460, -460]), 70);
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: "For calcium hydroxide, use ΔH_sol = +70 kJ mol⁻¹ and enthalpy changes of hydration Ca²⁺ −1650 and OH⁻ −460 kJ mol⁻¹ (values given) to calculate the lattice energy of Ca(OH)₂, in kJ mol⁻¹.",
      value: LE, unit: "kJ/mol",
      wrong: [-1650 - 460 - 70, -LE],
      hints: ["There are two hydroxide ions per formula unit.", "Rearrange ΔH_sol = −ΔH_latt + ΣΔH_hyd."],
      explanation: `1. ΔH_latt = ΣΔH_hyd − ΔH_sol.\n2. = (−1650 + 2 × (−460)) − (+70) = ${LE} kJ mol⁻¹. Using only one OH⁻ gives ${-1650 - 460 - 70}; the sign must be negative because lattice formation is exothermic.`,
    });
  }
  {
    const hydSO4 = -30 + -2550 - -1480;
    chk(solutionEnthalpy(-2550, [-1480, hydSO4]), -30);
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: "For strontium sulfate, ΔH_sol = −30 kJ mol⁻¹, the lattice energy is −2550 kJ mol⁻¹ and the enthalpy change of hydration of Sr²⁺ is −1480 kJ mol⁻¹ (values given). Calculate the enthalpy change of hydration of the sulfate ion, in kJ mol⁻¹.",
      value: hydSO4, unit: "kJ/mol",
      wrong: [-30 - 2550 + -1480, -hydSO4],
      hints: ["Write ΔH_sol = −ΔH_latt + ΔH_hyd(Sr²⁺) + ΔH_hyd(SO₄²⁻) and rearrange."],
      explanation: `1. ΔH_hyd(SO₄²⁻) = ΔH_sol + ΔH_latt − ΔH_hyd(Sr²⁺).\n2. = −30 + (−2550) − (−1480) = ${hydSO4} kJ mol⁻¹. Adding the Sr²⁺ value instead of subtracting it gives ${-30 - 2550 - 1480}.`,
    });
  }
  {
    const dH = solutionEnthalpy(-2460, [-1480, -460, -460]);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "Calculate ΔH_sol of strontium hydroxide, in kJ mol⁻¹, from these given values (kJ mol⁻¹): lattice energy of Sr(OH)₂ −2460; enthalpy change of hydration Sr²⁺ −1480, OH⁻ −460.",
      value: dH, unit: "kJ/mol",
      wrong: [solutionEnthalpy(-2460, [-1480, -460])],
      hints: ["Count the hydroxide ions."],
      explanation: `1. ΔH_sol = +2460 + (−1480) + 2 × (−460).\n2. = ${dH} kJ mol⁻¹. Using one OH⁻ gives ${solutionEnthalpy(-2460, [-1480, -460])} kJ mol⁻¹.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The hydration enthalpy of a Group 2 cation becomes less exothermic down the group because the ion becomes larger.",
    answer: true,
    explanation: "True. A larger ion attracts the polar water molecules less strongly, so less energy is released.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "Barium carbonate is more thermally stable than magnesium carbonate because the Ba–O bonds in barium carbonate are stronger than the Mg–O bonds.",
    answer: false,
    hints: ["Which bonds break when a carbonate decomposes?"],
    explanation: "False. Decomposition breaks a C–O bond in the carbonate ion. Ba²⁺, with its low charge density, polarises the anion less, so that bond is weakened less.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put the steps of the explanation of thermal stability in order by matching each step number to its statement.",
    pairs: [
      ["step 1", "Down the group the cation radius increases at the same 2+ charge."],
      ["step 2", "So the charge density of the cation decreases."],
      ["step 3", "So the large anion is polarised (distorted) less."],
      ["step 4", "So its C–O or N–O bonds are weakened less and more heat is needed to decompose it."],
    ],
    hints: ["Start with the property of the ion that changes down the group."],
    explanation: "Size → charge density → polarisation → bond weakening → decomposition temperature.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Complete the explanation of the solubility of the Group 2 hydroxides.",
    template: "The hydroxide ion is {{blank:a}}, so the lattice energy changes {{blank:b}} as the cation gets larger. The lattice energy falls {{blank:c}} than the hydration enthalpy of the cation, so ΔH_sol becomes {{blank:d}} endothermic and solubility increases down the group.",
    blanks: [
      { id: "a", accepted: ["small"], choices: ["small", "large"] },
      { id: "b", accepted: ["a lot"], choices: ["a lot", "very little"] },
      { id: "c", accepted: ["faster"], choices: ["faster", "slower"] },
      { id: "d", accepted: ["less"], choices: ["more", "less"] },
    ],
    hints: ["Contrast with the sulfates, where the anion is large."],
    explanation: "Small anion → cation size dominates the inter-ion distance → steep fall in lattice energy → ΔH_sol less endothermic.",
  });
  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "What term describes the distortion of the electron cloud of an anion by a nearby cation?",
    accepted: ["polarisation", "polarization", "polarisation of the anion"],
    wrong: ["hydration"],
    explanation: "Polarisation: small, highly charged cations polarise large anions most.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why calcium nitrate decomposes at a lower temperature than strontium nitrate.",
    points: [
      "Ca²⁺ is smaller than Sr²⁺ (same charge), so it has a higher charge density",
      "Ca²⁺ polarises (distorts the electron cloud of) the nitrate ion more",
      "N–O bonds in the nitrate are weakened more, so less heat is needed to break them",
    ],
    modelAnswer: "Calcium and strontium ions are both 2+, but Ca²⁺ is smaller, so its charge density is higher. It therefore polarises the large nitrate ion more, drawing electron density away from the N–O bonds and weakening them. Less energy is then needed to decompose calcium nitrate.",
    hints: ["Size → charge density → polarisation → bond weakening."],
    explanation: "Three linked points.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain, in terms of lattice energy and hydration enthalpy, why barium sulfate is much less soluble than magnesium sulfate.",
    points: [
      "Both lattice energy and hydration enthalpy of the cation become less exothermic from Mg to Ba because Ba²⁺ is larger",
      "The sulfate ion is large, so the lattice energy changes only slightly with cation size",
      "The hydration enthalpy of the cation falls much more (Ba²⁺ attracts water less)",
      "So ΔH_sol becomes more endothermic (less exothermic) for BaSO₄, and it is less soluble",
    ],
    modelAnswer: "Going from Mg²⁺ to Ba²⁺, the cation is larger, so both the lattice energy and the hydration enthalpy become less exothermic. Because the sulfate ion is large, the distance between ions in the lattice changes little, so the lattice energy falls only slightly. The hydration enthalpy of the cation, however, falls a lot. Less energy is released on hydration relative to the energy needed to break the lattice, so ΔH_sol is more endothermic for BaSO₄, which is far less soluble.",
    hints: ["Compare the size of the two changes."],
    explanation: "Relative magnitudes decide the trend.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 3,
    stem: "Suggest why a magnesium salt of a large, easily polarised anion such as the iodate ion might decompose more easily on heating than the barium salt. Use the same reasoning as for the carbonates.",
    points: [
      "Mg²⁺ has a higher charge density than Ba²⁺ (smaller ion, same charge)",
      "It polarises the large anion more, weakening its internal bonds",
      "So less heat is needed to break the anion apart; the barium salt is more thermally stable",
    ],
    modelAnswer: "Magnesium ions are much smaller than barium ions with the same charge, so they have a much higher charge density. They distort the electron cloud of the large anion more, weakening the bonds inside it, so the magnesium salt decomposes at a lower temperature than the barium salt.",
    hints: ["Apply charge density and polarisation to any large anion."],
    explanation: "The polarisation argument is general for large oxo-anions.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: "In an experiment, a student heated 0.0100 mol of each of three Group 2 carbonates in turn with the same Bunsen flame and timed how long it took for the gas given off to turn limewater cloudy.\n\n| Carbonate | time / s |\n|---|---|\n| MgCO₃ | 18 |\n| CaCO₃ | 96 |\n| SrCO₃ | no change after 600 |",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name the gas that turns limewater cloudy.", accepted: ["carbon dioxide", "CO2", "CO₂"], wrong: ["oxygen"], explanation: "MCO₃ → MO + CO₂." }),
      P.mcq({ label: "(b)", stem: "What do the results show?", options: [
        ["Thermal stability increases down the group.", "Correct: the further down, the longer before CO₂ appears."],
        ["Thermal stability decreases down the group.", "MgCO₃ released CO₂ fastest, so it is the least stable."],
        ["All three carbonates are equally stable.", "The times differ greatly."],
        ["Strontium carbonate is the least stable.", "It gave no CO₂ at all in 600 s."],
      ], answer: "A", explanation: "MgCO₃ < CaCO₃ < SrCO₃ in stability." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain the order of the results.", points: ["Cation radius increases from Mg²⁺ to Sr²⁺ at the same charge, so charge density decreases", "Mg²⁺ polarises the carbonate ion most", "C–O bonds are weakened most in MgCO₃, so it releases CO₂ at the lowest temperature / soonest"], modelAnswer: "All three cations are 2+, but their radius increases from Mg²⁺ to Sr²⁺, so their charge density falls. Mg²⁺ polarises the carbonate ion most, weakening a C–O bond most, so MgCO₃ gives off CO₂ soonest; Sr²⁺ polarises it least and SrCO₃ does not decompose at Bunsen temperature." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why equal amounts in moles of each carbonate were used, and suggest one other variable to control.", points: ["Equal moles give the same amount of CO₂ possible from each, so the comparison is fair (not equal masses, because Mr differs)", "Same height/size of flame, same tube, same volume and concentration of limewater"], modelAnswer: "Using 0.0100 mol of each means each could release the same amount of CO₂, so the times are comparable; equal masses would contain different numbers of moles. The same flame (height and setting), tube and volume of limewater should also be used." }),
      P.num({ label: "(e)", marks: 1, stem: "Calculate the mass, in g, of 0.0100 mol of strontium carbonate. (Mr SrCO₃ = 147.6)", value: 1.476, sf: 3, unit: "g", wrong: [147.6], explanation: "0.0100 × 147.6 = 1.48 g." }),
    ],
    hints: ["The sooner the limewater turns cloudy, the less stable the carbonate."],
    explanation: "Stability MgCO₃ < CaCO₃ < SrCO₃: falling charge density, less polarisation of CO₃²⁻.",
  });
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: "Use these values (kJ mol⁻¹, given for this question) for the Group 2 sulfates.\n\n| | MgSO₄ | CaSO₄ | SrSO₄ | BaSO₄ |\n|---|---|---|---|---|\n| lattice energy | −2875 | −2635 | −2555 | −2475 |\n| hydration enthalpy of M²⁺ | −1925 | −1655 | −1485 | −1365 |\n\nHydration enthalpy of SO₄²⁻: −1100.",
    parts: (() => {
      const sol = (le, h) => solutionEnthalpy(le, [h, -1100]);
      const mg = sol(-2875, -1925), ba = sol(-2475, -1365);
      return [
        P.num({ label: "(a)", marks: 2, stem: "Calculate ΔH_sol for MgSO₄, in kJ mol⁻¹.", value: mg, unit: "kJ/mol", wrong: [-2875 - 1925 - 1100], explanation: `+2875 − 1925 − 1100 = ${mg} kJ mol⁻¹.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate ΔH_sol for BaSO₄, in kJ mol⁻¹.", value: ba, unit: "kJ/mol", wrong: [-ba], explanation: `+2475 − 1365 − 1100 = ${ba} kJ mol⁻¹.` }),
        P.num({ label: "(c)", marks: 1, stem: "By how much, in kJ mol⁻¹, does the magnitude of the lattice energy fall from MgSO₄ to BaSO₄?", value: 2875 - 2475, unit: "kJ/mol", explanation: `2875 − 2475 = ${2875 - 2475} kJ mol⁻¹.` }),
        P.num({ label: "(d)", marks: 1, stem: "By how much, in kJ mol⁻¹, does the magnitude of the hydration enthalpy of the cation fall from Mg²⁺ to Ba²⁺?", value: 1925 - 1365, unit: "kJ/mol", explanation: `1925 − 1365 = ${1925 - 1365} kJ mol⁻¹.` }),
        P.manual({ label: "(e)", marks: 3, stem: "Use your answers to explain the trend in solubility of the Group 2 sulfates.", points: ["Hydration enthalpy of the cation falls (by 560) more than lattice energy (by 400)", "because the sulfate ion is large, so changing the cation alters the inter-ion distance only a little", "ΔH_sol becomes more endothermic (from exothermic for MgSO₄ to endothermic for BaSO₄), so solubility decreases down the group"], modelAnswer: "From Mg to Ba the hydration enthalpy of the cation falls by 560 kJ mol⁻¹ but the lattice energy only by 400 kJ mol⁻¹. This is because the large sulfate ion dominates the distance between ions in the lattice. So ΔH_sol changes from exothermic to endothermic and the sulfates become less soluble down the group." }),
        P.num({ label: "(f)", marks: 2, stem: "Calculate ΔH_sol for SrSO₄, in kJ mol⁻¹, and check that it fits the trend.", value: sol(-2555, -1485), unit: "kJ/mol", wrong: [-sol(-2555, -1485)], explanation: `+2555 − 1485 − 1100 = ${sol(-2555, -1485)} kJ mol⁻¹, between MgSO₄ (${mg}) and BaSO₄ (${ba}).` }),
        P.manual({ label: "(g)", marks: 1, stem: "State one other factor, apart from ΔH_sol, that affects whether an ionic solid dissolves.", points: ["The entropy change of dissolving (ΔS; feasibility depends on ΔG = ΔH − TΔS)"], modelAnswer: "The entropy change on dissolving: whether a solid dissolves depends on ΔG = ΔH − TΔS, not on ΔH alone." }),
      ];
    })(),
    hints: ["ΔH_sol = −ΔH_latt + ΣΔH_hyd.", "Compare the two falls in (c) and (d)."],
    explanation: "Hydration enthalpy falls faster than lattice energy for sulfates, so ΔH_sol becomes more endothermic and solubility decreases.",
  });
  b.card("DEFINITION", "Charge density", "Charge ÷ size of an ion; Mg²⁺ highest and Ba²⁺ lowest in Group 2.");
  b.card("CONCEPT", "Thermal stability of Group 2 carbonates and nitrates", "Increases down the group: larger cation, lower charge density, less polarisation of the anion, C–O (N–O) bonds weakened less.");
  b.card("FORMULA", "Enthalpy change of solution", "ΔH_sol = −ΔH_latt + ΣΔH_hyd (lattice energy exothermic, from gaseous ions).");
  b.card("CONCEPT", "Why sulfates get less soluble down Group 2", "Large SO₄²⁻: lattice energy falls a little, cation hydration enthalpy falls a lot → ΔH_sol more endothermic.");
  b.card("CONCEPT", "Why hydroxides get more soluble down Group 2", "Small OH⁻: lattice energy falls faster than cation hydration enthalpy → ΔH_sol less endothermic.");
  b.card("FACT", "Trend in hydration enthalpy of M²⁺", "Less exothermic down Group 2 as the ion gets larger (weaker attraction for water molecules).");
  b.card("DEFINITION", "Polarisation", "Distortion of an anion's electron cloud by a nearby cation; greatest for small, highly charged cations and large anions.");
  b.card("CONCEPT", "Common error in stability answers", "It is the CATION that polarises the ANION; the C–O bond in the anion is weakened, not the M–O bond strengthened.");
});
