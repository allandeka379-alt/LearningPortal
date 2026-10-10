// W1b: achem.energetics.solution-hydration
import { concept, P, t, ce, solutionEnthalpy, heatQ, moles, Mr, sfStr, dpStr, chk } from "../lib.mjs";

concept("achem.energetics.solution-hydration", { file: "energetics/solution-hydration", keyPrefix: "energetics.solution-hydration" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which equation represents the standard enthalpy change of hydration of the calcium ion?",
    options: [
      [t`$\ce{Ca^2+(g) + aq -> Ca^2+(aq)}$`, "Correct: one mole of gaseous ions into an infinitely dilute solution."],
      [t`$\ce{Ca(s) + aq -> Ca^2+(aq) + 2e-}$`, "Hydration starts from the gaseous ion, not the metal."],
      [t`$\ce{CaCl2(s) + aq -> Ca^2+(aq) + 2Cl-(aq)}$`, "This is the enthalpy change of solution of calcium chloride."],
      [t`$\ce{Ca^2+(aq) -> Ca^2+(g)}$`, "This is the reverse of hydration."],
    ],
    answer: "A",
    explanation: "ΔH⦵hyd: one mole of the gaseous ion dissolves to form an infinitely dilute solution; it is always exothermic.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which ion has the most exothermic enthalpy change of hydration?",
    options: [
      [t`$\ce{Al^3+}$`, "Correct: the highest charge and a very small radius give the strongest attraction to water molecules."],
      [t`$\ce{Mg^2+}$`, "Mg²⁺ is small, but Al³⁺ is smaller and more highly charged."],
      [t`$\ce{Na+}$`, "Na⁺ has only a 1+ charge and is larger than Al³⁺."],
      [t`$\ce{K+}$`, "K⁺ is large and singly charged: the least exothermic of these."],
    ],
    answer: "A",
    explanation: "Hydration enthalpy depends on charge density: Al³⁺ (3+, very small) attracts water dipoles most strongly, then Mg²⁺, Na⁺, K⁺.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How are water molecules arranged around a chloride ion in aqueous solution?",
    options: [
      ["With their δ+ hydrogen atoms pointing towards the ion", "Correct: the negative ion attracts the positive end of the water dipole."],
      ["With their δ− oxygen atoms pointing towards the ion", "This is the arrangement around cations."],
      ["Forming dative bonds from the chloride ion to the oxygen atoms", "Oxygen in water has no empty orbital to accept a lone pair; the attraction is ion-dipole."],
      ["At random, because water molecules are non-polar", "Water is polar, which is why ions are hydrated."],
    ],
    answer: "A",
    explanation: "Anions attract the δ+ hydrogen atoms of water; cations attract the δ− oxygen atoms (and many cations also accept lone pairs from water as ligands).",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements about the enthalpy change of solution of an ionic solid are correct?\n\n1. It can be positive or negative.\n2. It equals the total hydration enthalpy of the ions minus the lattice energy.\n3. It is always more exothermic for salts of smaller cations.",
    options: [
      ["1 and 2 only", "Correct: statement 3 is false because a smaller cation also makes the lattice energy larger."],
      ["1, 2 and 3", "Statement 3 is false: both the lattice energy and the hydration enthalpy change, so no simple rule applies."],
      ["2 and 3 only", "Statement 1 is true, and statement 3 is false."],
      ["1 only", "Statement 2 is also true: ΔHsol = ΣΔHhyd − ΔHlatt (with lattice energy negative)."],
    ],
    answer: "A",
    hints: ["Write ΔHsol in terms of the lattice energy and the hydration enthalpies.", "What happens to the lattice energy when the cation gets smaller?"],
    explanation: "ΔHsol = −ΔHlatt + ΣΔHhyd, the small difference between two large terms, so it can have either sign. A smaller cation makes both terms larger, so the sign cannot be predicted from size alone.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which statements explain why the hydration enthalpy of Mg²⁺ is much more exothermic than that of Na⁺?\n\n1. Mg²⁺ has more electrons than Na⁺.\n2. Mg²⁺ has a larger charge than Na⁺.\n3. Mg²⁺ has a smaller ionic radius than Na⁺.",
    options: [
      ["1, 2 and 3", "Statement 1 is false: Mg²⁺ and Na⁺ both have 10 electrons."],
      ["2 and 3 only", "Correct: higher charge and smaller size give a higher charge density and stronger attraction for water."],
      ["1 and 2 only", "Statement 1 is false, and statement 3 is true."],
      ["1 only", "Statement 1 is false; statements 2 and 3 are the reasons."],
    ],
    answer: "B",
    hints: ["Mg²⁺ and Na⁺ are isoelectronic."],
    explanation: "Both ions have the configuration 1s² 2s² 2p⁶. Mg²⁺ has two more protons, so it is smaller, and its charge is twice as large: water dipoles are attracted much more strongly.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "When a salt dissolves, the temperature of the water falls. What does this show?",
    options: [
      ["The lattice energy is larger in magnitude than the total hydration enthalpy of the ions.", "Correct: more energy is needed to break the lattice than is released by hydration, so ΔHsol is positive."],
      ["The total hydration enthalpy is larger in magnitude than the lattice energy.", "That would make dissolving exothermic, and the water would warm."],
      ["The hydration enthalpies of the ions are positive.", "Hydration enthalpies are always negative."],
      ["The salt is insoluble in water.", "The salt has dissolved; a cooling only shows ΔHsol is positive."],
    ],
    answer: "A",
    explanation: "A fall in temperature means ΔHsol > 0: the endothermic lattice-breaking term outweighs the exothermic hydration term.",
  });
  {
    const v = solutionEnthalpy(-679, [-322, -335]);
    b.num({
      d: 3, skill: "APPLICATION", daily: true,
      stem: "Calculate the enthalpy change of solution of potassium bromide, in kJ mol⁻¹. Data (kJ mol⁻¹): lattice energy of KBr −679; ΔH⦵hyd(K⁺) −322; ΔH⦵hyd(Br⁻) −335.",
      value: v, unit: "kJ/mol",
      wrong: [String(-v), String(-679 + -322 + -335)],
      hints: ["ΔHsol = −ΔHlatt + ΣΔHhyd."],
      explanation: `ΔHsol = −(−679) + (−322) + (−335) = 679 − 657 = +${v} kJ mol⁻¹: endothermic, so the solution cools slightly. Adding the lattice energy with its own sign gives ${-679 - 322 - 335}, a common error.`,
    });
  }
  {
    const v = solutionEnthalpy(-2156, [-1443, 2 * -364]);
    b.calc({
      d: 3, skill: "APPLICATION",
      stem: "Calculate the enthalpy change of solution of strontium chloride, SrCl₂, in kJ mol⁻¹. Data (kJ mol⁻¹): lattice energy of SrCl₂ −2156; ΔH⦵hyd(Sr²⁺) −1443; ΔH⦵hyd(Cl⁻) −364.",
      value: v, unit: "kJ/mol",
      wrong: [String(solutionEnthalpy(-2156, [-1443, -364])), String(-v)],
      hints: ["There are two chloride ions per formula unit.", "Breaking the lattice is +2156 kJ."],
      explanation: `1. Break the lattice: +2156 kJ.\n2. Hydrate the ions: −1443 + 2(−364) = ${-1443 - 728} kJ.\n3. ΔHsol = 2156 + (${-1443 - 728}) = ${v} kJ mol⁻¹. Using only one chloride ion gives ${solutionEnthalpy(-2156, [-1443, -364])}.`,
    });
  }
  {
    const hyd = -26 + -785 - -506;
    b.calc({
      d: 4, skill: "ANALYSIS",
      stem: "Use these data (kJ mol⁻¹) to calculate the enthalpy change of hydration of the rubidium ion, Rb⁺: lattice energy of RbF −785; ΔH⦵sol(RbF) −26; ΔH⦵hyd(F⁻) −506.",
      value: hyd, unit: "kJ/mol",
      wrong: [String(-26 + 785 + 506), String(-hyd)],
      hints: ["ΔHsol = −ΔHlatt + ΔHhyd(Rb⁺) + ΔHhyd(F⁻).", "Rearrange for ΔHhyd(Rb⁺)."],
      explanation: `1. −26 = −(−785) + ΔHhyd(Rb⁺) + (−506).\n2. ΔHhyd(Rb⁺) = −26 − 785 + 506 = ${hyd} kJ mol⁻¹.\n3. This is less exothermic than for K⁺ (−322), as expected for the larger Rb⁺ ion.`,
    });
  }
  {
    const M = Mr("CaCl2");
    const n = moles(2.22, M);
    const q = heatQ(60.0, 6.9);
    const dH = -q / 1000 / n;
    const hydCa = -83 + -2258 - 2 * -364;
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
      stem: "Thandeka dissolved 2.22 g of anhydrous calcium chloride, CaCl₂ (Mr = 111.1), in 60.0 g of water in a polystyrene cup. The temperature rose by 6.9 °C. (c = 4.18 J g⁻¹ K⁻¹; use the mass of water.)",
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the energy released to the water, in J, to three significant figures.", value: q, sf: 3, unit: "J", explanation: `q = 60.0 × 4.18 × 6.9 = ${sfStr(q, 3)} J.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the enthalpy change of solution of calcium chloride, in kJ mol⁻¹, to two significant figures.", value: dH, sf: 2, unit: "kJ/mol", wrong: [sfStr(-dH, 2)], explanation: `n(CaCl₂) = 2.22 ÷ ${M.toFixed(1)} = ${sfStr(n, 3)} mol; ΔHsol = −${sfStr(q / 1000, 3)} ÷ ${sfStr(n, 3)} = ${sfStr(dH, 2)} kJ mol⁻¹ (exothermic).` }),
        P.num({ label: "(c)", marks: 2, stem: "A data book gives ΔH⦵sol(CaCl₂) = −83 kJ mol⁻¹, a lattice energy for CaCl₂ of −2258 kJ mol⁻¹ and ΔH⦵hyd(Cl⁻) = −364 kJ mol⁻¹. Use these values to calculate the enthalpy change of hydration of Ca²⁺, in kJ mol⁻¹.", value: hydCa, unit: "kJ/mol", wrong: [String(-83 + -2258 + 364), String(-83 + 2258 + 728)], explanation: `−83 = −(−2258) + ΔHhyd(Ca²⁺) + 2(−364), so ΔHhyd(Ca²⁺) = −83 − 2258 + 728 = ${hydCa} kJ mol⁻¹.` }),
        P.manual({ label: "(d)", marks: 1, stem: "Suggest one reason why Thandeka's value in (b) differs from the data-book value.", points: ["Heat loss to the surroundings (or heat absorbed by the cup), or the solution's mass and heat capacity not equal to those of 60.0 g of water, or the solid absorbed water from the air (not fully anhydrous)."], modelAnswer: "Some heat was lost to the surroundings, or the calcium chloride had absorbed moisture from the air so less CaCl₂ was actually present than weighed." }),
      ],
      hints: ["n = mass ÷ Mr.", "In (c), rearrange ΔHsol = −ΔHlatt + ΣΔHhyd."],
      explanation: `ΔHsol(experiment) = ${sfStr(dH, 2)} kJ mol⁻¹; ΔHhyd(Ca²⁺) from data = ${hydCa} kJ mol⁻¹.`,
    });
  }
  {
    const v = solutionEnthalpy(-958, [-473, -506]);
    b.num({
      d: 2, skill: "APPLICATION",
      stem: "Calculate the enthalpy change of solution of silver fluoride, in kJ mol⁻¹. Data (kJ mol⁻¹): lattice energy of AgF −958; ΔH⦵hyd(Ag⁺) −473; ΔH⦵hyd(F⁻) −506.",
      value: v, unit: "kJ/mol",
      wrong: [String(-v), String(-958 - 473 - 506)],
      explanation: `ΔHsol = −(−958) + (−473) + (−506) = 958 − 979 = ${v} kJ mol⁻¹: exothermic. (Silver fluoride, unlike the other silver halides, is very soluble.)`,
    });
  }
  {
    const le = -(22 + 301 + 335);
    b.num({
      d: 4, skill: "ANALYSIS",
      stem: "Use the energy cycle to calculate the lattice energy of rubidium bromide, in kJ mol⁻¹. Data (kJ mol⁻¹): ΔH⦵sol(RbBr) +22; ΔH⦵hyd(Rb⁺) −301; ΔH⦵hyd(Br⁻) −335.",
      value: le, unit: "kJ/mol",
      wrong: [String(-le), String(22 - 301 - 335)],
      hints: ["ΔHsol = −ΔHlatt + ΣΔHhyd, so ΔHlatt = ΣΔHhyd − ΔHsol."],
      explanation: `ΔHlatt = (−301 − 335) − (+22) = ${le} kJ mol⁻¹. The lattice energy is negative (formation from gaseous ions), as it must be.`,
    });
  }
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The enthalpy change of hydration of every gaseous ion is negative.",
    answer: true,
    explanation: "True. Attraction between the ion and polar water molecules always releases energy.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The hydration enthalpy of F⁻ is less exothermic than that of I⁻ because fluorine is more electronegative.",
    answer: false,
    explanation: "False. F⁻ has the more exothermic hydration enthalpy, because it is much smaller than I⁻, so water molecules get closer and are attracted more strongly. Electronegativity is not the reason.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each process with its enthalpy change.",
    pairs: [
      [t`$\ce{K+(g) + Cl-(g) -> KCl(s)}$`, "lattice energy"],
      [t`$\ce{KCl(s) + aq -> K+(aq) + Cl-(aq)}$`, "enthalpy change of solution"],
      [t`$\ce{K+(g) + aq -> K+(aq)}$`, "enthalpy change of hydration"],
      [t`$\ce{K(s) + 1/2Cl2(g) -> KCl(s)}$`, "enthalpy change of formation"],
    ],
    explanation: "Lattice energy: gaseous ions → solid. Solution: solid → aqueous ions. Hydration: one gaseous ion → aqueous ion. Formation: elements → compound.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the energy cycle relationship.",
    template: "ΔH of solution = {{blank:a}} lattice energy + the {{blank:b}} of the hydration enthalpies of the ions.",
    blanks: [
      { id: "a", accepted: ["minus the"], choices: ["minus the", "plus the", "twice the"] },
      { id: "b", accepted: ["sum"], choices: ["sum", "difference", "product"] },
    ],
    explanation: "ΔHsol = −ΔHlatt + ΣΔHhyd: breaking the lattice is the reverse of lattice energy, then each ion is hydrated.",
  });
  b.short({
    d: 2, skill: "UNDERSTANDING",
    stem: "Name the type of attraction between a sodium ion and the water molecules around it in aqueous solution.",
    accepted: ["ion-dipole", "ion dipole", "ion-dipole attraction", "ion-dipole forces", "ion-dipole interaction", "ion dipole attraction", "ion-dipole bonding"],
    wrong: ["hydrogen bonding", "ionic bonding"],
    explanation: "The positive ion attracts the δ− oxygen end of each polar water molecule: an ion-dipole attraction.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "Define the standard enthalpy change of solution of an ionic compound.",
    points: ["The enthalpy change when one mole of the ionic solid dissolves", "in enough water to form an infinitely dilute solution (so that further dilution gives no further enthalpy change)", "under standard conditions."],
    modelAnswer: "The enthalpy change when one mole of an ionic compound dissolves in sufficient water to form an infinitely dilute solution under standard conditions.",
    explanation: "One mole of solid, infinite dilution, standard conditions.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why the enthalpy change of hydration of Ca²⁺ is less exothermic than that of Mg²⁺.",
    points: ["Both ions have the same charge (2+).", "Ca²⁺ has a larger ionic radius (an extra shell).", "So water molecules cannot get as close and the ion-dipole attraction is weaker, releasing less energy."],
    modelAnswer: "Ca²⁺ and Mg²⁺ carry the same charge, but Ca²⁺ has an extra occupied shell and so a larger radius. Its charge density is lower, the δ− oxygen atoms of water are held less strongly and further away, and less energy is released on hydration.",
    hints: ["Compare charge, then size."],
    explanation: "Same charge, larger radius, lower charge density, weaker attraction for water.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "A student says: 'Lithium fluoride must dissolve very exothermically because Li⁺ and F⁻ both have very exothermic hydration enthalpies.' Evaluate this statement.",
    points: ["It is true that both small ions have very exothermic hydration enthalpies.", "But the same small sizes give LiF a very large (very exothermic) lattice energy, which must be overcome.", "ΔHsol depends on the balance of the two terms, so it cannot be predicted from hydration enthalpies alone (LiF in fact dissolves only slightly, with a small ΔHsol)."],
    modelAnswer: "The hydration enthalpies of Li⁺ and F⁻ are indeed very exothermic, but because the ions are small the lattice energy of LiF is also very large. Dissolving requires the lattice to be broken, so ΔHsol is the small difference between two large numbers and could be either sign. LiF is in fact only slightly soluble.",
    hints: ["What else does a small ionic radius affect?"],
    explanation: "Small ions increase both the lattice energy and the hydration enthalpies; the sign of ΔHsol needs data.",
  });
  // Structured practice
  {
    const latt = -1029;
    const hydLi = -519;
    const hydOH = -460;
    const sol = solutionEnthalpy(latt, [hydLi, hydOH]);
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true,
      stem: "Data for lithium hydroxide (kJ mol⁻¹): lattice energy −1029; ΔH⦵hyd(Li⁺) −519; ΔH⦵hyd(OH⁻) −460.",
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: "Describe, in words, the energy cycle that links these three quantities with the enthalpy change of solution of LiOH.", points: ["Route 1: LiOH(s) dissolves directly to Li⁺(aq) + OH⁻(aq) (ΔHsol).", "Route 2: LiOH(s) → Li⁺(g) + OH⁻(g) (minus the lattice energy), then each gaseous ion is hydrated (ΔHhyd of Li⁺ and of OH⁻)."], modelAnswer: "The solid either dissolves directly (ΔHsol), or is first broken into gaseous Li⁺ and OH⁻ ions (+1029 kJ, the reverse of the lattice energy) and then each ion is hydrated (−519 and −460 kJ). By Hess's law the two routes have the same overall enthalpy change." }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the enthalpy change of solution of LiOH, in kJ mol⁻¹.", value: sol, unit: "kJ/mol", wrong: [String(-sol), String(latt + hydLi + hydOH)], explanation: `ΔHsol = −(−1029) + (−519) + (−460) = ${sol} kJ mol⁻¹.` }),
        P.mcq({ label: "(c)", stem: "What would you observe when solid LiOH dissolves in water?", options: [["The solution warms up.", "Correct: ΔHsol is negative (exothermic)."], ["The solution cools down.", "That happens when ΔHsol is positive."], ["There is no temperature change.", "ΔHsol is not zero."], ["A gas is given off.", "Dissolving LiOH is not a reaction that releases gas."]], answer: "A", explanation: "A negative ΔHsol means energy is released to the water." }),
        P.manual({ label: "(d)", marks: 1, stem: "Predict, with a reason, whether the hydration enthalpy of Na⁺ is more or less exothermic than that of Li⁺.", points: ["Less exothermic, because Na⁺ is larger (same charge), so it attracts water molecules less strongly."], modelAnswer: "Less exothermic: Na⁺ has the same charge but a larger radius, so its attraction to water molecules is weaker." }),
      ],
      hints: ["ΔHsol = −ΔHlatt + ΣΔHhyd."],
      explanation: `ΔHsol(LiOH) = ${sol} kJ mol⁻¹, exothermic.`,
    });
  }
  b.card("DEFINITION", "Enthalpy change of hydration", "Enthalpy change when one mole of a gaseous ion dissolves in enough water to give an infinitely dilute solution; always exothermic.");
  b.card("DEFINITION", "Enthalpy change of solution", "Enthalpy change when one mole of an ionic solid dissolves in enough water to give an infinitely dilute solution; either sign.");
  b.card("FORMULA", "Solution cycle", "ΔHsol = −ΔHlatt + ΣΔHhyd (multiply each ion's ΔHhyd by its number in the formula).");
  b.card("CONCEPT", "Factors affecting hydration enthalpy", "Higher ionic charge and smaller radius (higher charge density) give more exothermic hydration.");
  b.card("CONCEPT", "Water around ions", "δ− oxygen towards cations; δ+ hydrogen towards anions: ion-dipole attractions.");
  b.card("CONCEPT", "Why ΔHsol can be either sign", "It is the small difference between two large terms: the lattice energy to be overcome and the hydration enthalpies released.");
  b.card("FACT", "A salt whose dissolving is endothermic", "Ammonium nitrate (used in cold packs) and potassium bromide: the solution cools.");
  b.card("CONCEPT", "Missing hydration enthalpy from the cycle", "ΔHhyd(ion) = ΔHsol + ΔHlatt − ΔHhyd(other ion).");
});
