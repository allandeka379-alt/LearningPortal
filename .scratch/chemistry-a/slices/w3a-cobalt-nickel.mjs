// W3a: achem.transition.cobalt-nickel (ZIMSEC only, Form 6; tagged to ZIMSEC automatically).
import { concept, P, t, chk, ecell, Mr, massLiberated, charge, molesElectrons, VM_RTP, sfStr, dpStr, sciStr } from "../lib.mjs";

const E = { Co3Co2: 1.82, O2acid: 1.23, CoNH3: 0.11, O2alk: 0.40 };

concept("achem.transition.cobalt-nickel", { file: "transition/cobalt-nickel", keyPrefix: "transition.cobalt-nickel" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: t`What are the colour and shape of $\ce{[CoCl4]^2-}$?`,
    options: [
      ["blue, tetrahedral", "Correct: four large chloride ligands, tetrahedral, blue."],
      ["pink, octahedral", "That describes [Co(H₂O)₆]²⁺."],
      ["blue, octahedral", "Only four chloride ions fit round Co²⁺, so the shape is tetrahedral."],
      ["pink, square planar", "No common cobalt(II) chloro complex is square planar."],
    ],
    answer: "A",
    explanation: "[CoCl₄]²⁻ is blue and tetrahedral; [Co(H₂O)₆]²⁺ is pink and octahedral.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Anhydrous cobalt(II) chloride paper is used to test a liquid. What colour change shows that water is present?",
    options: [
      ["blue to pink", "Correct: blue CoCl₂ forms pink CoCl₂·6H₂O."],
      ["pink to blue", "That is the change on heating hydrated cobalt chloride (drying it)."],
      ["white to blue", "That is anhydrous copper(II) sulfate."],
      ["orange to green", "That is acidified dichromate(VI) being reduced."],
    ],
    answer: "A",
    explanation: "CoCl₂ (blue) + 6H₂O → CoCl₂·6H₂O (pink).",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What is the role of nickel in the manufacture of margarine?",
    options: [
      ["a catalyst for adding hydrogen to C=C bonds", "Correct: hydrogenation of unsaturated vegetable oils."],
      ["a reducing agent that is used up", "Nickel is a catalyst and is not used up."],
      ["an emulsifier that mixes oil and water", "Emulsifiers are organic molecules, not metals."],
      ["a catalyst for removing water from the oil", "Hydrogenation adds hydrogen; it is not dehydration."],
    ],
    answer: "A",
    explanation: "Finely divided Ni catalyses H₂ addition to C=C, raising the melting point of the oil.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: t`For $\ce{[Co(H2O)6]^2+ + 4Cl- <=> [CoCl4]^2- + 6H2O}$ the forward reaction is endothermic. A purple mixture of the two complexes is cooled in ice. What is seen and why?`,
    options: [
      ["It turns pink: the exothermic reverse reaction is favoured.", "Correct: cooling favours the exothermic direction, forming [Co(H₂O)₆]²⁺."],
      ["It turns blue: cooling favours the tetrahedral complex.", "Cooling favours the exothermic reverse reaction, not the endothermic forward one."],
      ["It turns pink: cobalt(II) is reduced to cobalt(I).", "No redox occurs; both complexes contain cobalt(II)."],
      ["No change: temperature does not affect equilibria.", "Temperature changes both the position and Kc."],
    ],
    answer: "A",
    hints: ["Le Chatelier: which direction releases heat?"],
    explanation: "Lower temperature moves the position in the exothermic direction, to pink octahedral [Co(H₂O)₆]²⁺.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements about the change from [Co(H₂O)₆]²⁺ to [CoCl₄]²⁻ are correct?\n\n1. The coordination number falls from 6 to 4.\n2. The oxidation state of cobalt does not change.\n3. Fewer ligands fit because chloride ions are larger than water molecules.",
    options: [
      ["1, 2 and 3", "Correct: all three statements are true."],
      ["1 and 2 only", "Statement 3 is also true: ligand size limits the number."],
      ["2 and 3 only", "Statement 1 is also true: octahedral 6 to tetrahedral 4."],
      ["1 only", "Statements 2 and 3 are also true."],
    ],
    answer: "A",
    hints: ["Work out the oxidation state of cobalt in [CoCl₄]²⁻."],
    explanation: "x + 4(−1) = −2, x = +2: no redox. Large Cl⁻ ligands give a coordination number of 4.",
  });
  b.mcq({
    d: 3, skill: "RECALL",
    stem: "Which stage of nickel production converts the sulfide ore concentrate into a molten mixture of metal sulfides?",
    options: [
      ["smelting to a matte", "Correct: smelting gives a matte of Ni, Cu and Fe sulfides."],
      ["froth flotation", "Flotation concentrates the crushed ore; nothing melts."],
      ["electrolytic refining", "Refining purifies impure nickel metal in solution."],
      ["hydrogenation", "Hydrogenation is a use of nickel, not a stage in its production."],
    ],
    answer: "A",
    hints: ["A matte is molten."],
    explanation: "Concentrate → roast → smelt to matte → convert → refine by electrolysis.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Data (E⦵ / V): Co³⁺/Co²⁺ +1.82; [Co(NH₃)₆]³⁺/[Co(NH₃)₆]²⁺ +0.11; O₂ + 4H⁺ + 4e⁻ ⇌ 2H₂O +1.23; O₂ + 2H₂O + 4e⁻ ⇌ 4OH⁻ +0.40. Which statements are correct?\n\n1. Co³⁺(aq) oxidises water to oxygen.\n2. Air oxidises [Co(NH₃)₆]²⁺ to [Co(NH₃)₆]³⁺.\n3. Air oxidises Co²⁺(aq) to Co³⁺(aq).",
    options: [
      ["1 and 2 only", "Correct: +0.59 V and +0.29 V; statement 3 gives −0.59 V."],
      ["1, 2 and 3", "Statement 3 is false: 1.23 − 1.82 is negative."],
      ["2 and 3 only", "Statement 1 is true and statement 3 is false."],
      ["2 only", "Statement 1 is also true: 1.82 − 1.23 = +0.59 V."],
    ],
    answer: "A",
    hints: ["Calculate E⦵cell for each change, taking the reduced species carefully."],
    explanation: "Ammonia ligands lower E⦵ so much that air can oxidise cobalt(II); in water, cobalt(III) is the unstable state.",
  });
  b.mcq({
    d: 4, skill: "APPLICATION",
    stem: "In the electrolytic refining of nickel, where do impurities of platinum group metals end up?",
    options: [
      ["in the anode slime below the anode", "Correct: less reactive metals do not dissolve and fall as slime."],
      ["plated on the pure nickel cathode", "They do not dissolve at the anode, so they cannot travel to the cathode."],
      ["dissolved as ions in the electrolyte", "Only more reactive metals (such as iron) stay in solution as ions."],
      ["given off as gases at the anode", "Metals do not form gases here."],
    ],
    answer: "A",
    hints: ["Which metals are harder to oxidise than nickel?"],
    explanation: "Precious metals are not oxidised at the anode and collect as anode slime, which is a valuable source of them.",
  });
  {
    const e = ecell(E.O2alk, E.CoNH3);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true, daily: true,
      stem: "Data (E⦵ / V): [Co(NH₃)₆]³⁺ + e⁻ ⇌ [Co(NH₃)₆]²⁺ +0.11; O₂ + 2H₂O + 4e⁻ ⇌ 4OH⁻ +0.40. Calculate E⦵cell, in V, for the oxidation of [Co(NH₃)₆]²⁺ by oxygen, to two decimal places.",
      value: e, dp: 2, unit: "V",
      wrong: [dpStr(-e, 2)],
      hints: ["Oxygen is reduced."],
      explanation: `1. O₂ is reduced; [Co(NH₃)₆]²⁺ is oxidised.\n2. E⦵cell = 0.40 − 0.11 = +${dpStr(e, 2)} V: feasible, so the solution darkens in air. The reverse subtraction gives ${dpStr(-e, 2)} V.`,
    });
  }
  {
    const e = ecell(E.Co3Co2, E.O2acid);
    b.calc({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: "Data (E⦵ / V): Co³⁺ + e⁻ ⇌ Co²⁺ +1.82; O₂ + 4H⁺ + 4e⁻ ⇌ 2H₂O +1.23. Calculate E⦵cell, in V, for the oxidation of water by Co³⁺(aq), to two decimal places.",
      value: e, dp: 2, unit: "V",
      wrong: [dpStr(-e, 2)],
      explanation: `1. Co³⁺ is reduced; water is oxidised to O₂.\n2. E⦵cell = 1.82 − 1.23 = +${dpStr(e, 2)} V: Co³⁺(aq) is unstable in water. The reverse subtraction gives ${dpStr(-e, 2)} V.`,
    });
  }
  {
    const Q = charge(160, 12 * 3600);
    const m = massLiberated(Q, 58.7, 2) / 1000;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: "A nickel refining cell operates at a current of 160 A for 12.0 hours. Calculate the mass of nickel deposited at the cathode, in kg, to three significant figures. (Ar Ni = 58.7; F = 9.65 × 10⁴ C mol⁻¹)",
      value: m, sf: 3, unit: "kg",
      wrong: [sfStr(m * 2, 3), sfStr(massLiberated(charge(160, 720), 58.7, 2) / 1000, 3)],
      hints: ["Q = It with t in seconds; Ni²⁺ needs two electrons."],
      explanation: `1. Q = 160 × 12.0 × 3600 = ${sciStr(Q, 3)} C.\n2. n(e⁻) = ${sciStr(Q, 3)} ÷ 9.65 × 10⁴ = ${sfStr(molesElectrons(Q), 3)} mol; n(Ni) = ÷ 2 = ${sfStr(molesElectrons(Q) / 2, 3)} mol.\n3. Mass = ${sfStr(molesElectrons(Q) / 2, 3)} × 58.7 = ${sfStr(m * 1000, 3)} g = ${sfStr(m, 3)} kg. Forgetting the 2 electrons gives ${sfStr(m * 2, 3)} kg; using minutes instead of seconds gives ${sfStr(massLiberated(charge(160, 720), 58.7, 2) / 1000, 3)} kg.`,
    });
  }
  {
    const Mt = chk(Mr("C57H104O6"), 884);
    const v = (1500 / Mt) * 3 * VM_RTP;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: "Glyceryl trioleate, C₅₇H₁₀₄O₆, a vegetable oil, has three C=C bonds per molecule. Calculate the volume of hydrogen, in dm³ at room temperature and pressure, needed to hydrogenate 1.50 kg of it completely over a nickel catalyst, to three significant figures. (Ar: H 1.0, C 12.0, O 16.0; molar gas volume 24.0 dm³ mol⁻¹)",
      value: v, sf: 3, unit: "dm³",
      wrong: [sfStr((1500 / Mt) * VM_RTP, 3)],
      hints: ["One H₂ molecule is needed for each C=C bond."],
      explanation: `1. Mr = 57(12.0) + 104(1.0) + 6(16.0) = ${Mt}.\n2. n(oil) = 1500 ÷ ${Mt} = ${sfStr(1500 / Mt, 3)} mol; n(H₂) = 3 × that = ${sfStr((4500 / Mt), 3)} mol.\n3. V = ${sfStr(4500 / Mt, 3)} × 24.0 = ${sfStr(v, 3)} dm³. Ignoring the three C=C bonds gives ${sfStr((1500 / Mt) * VM_RTP, 3)} dm³.`,
    });
  }
  {
    const a = chk(Mr("CoCl2"), 129.9);
    const h = chk(Mr("CoCl2.6H2O"), 237.9);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "1.30 g of blue anhydrous cobalt(II) chloride, CoCl₂, is left in damp air until it has all turned into pink CoCl₂·6H₂O. Calculate the final mass, in g, to three significant figures. (Ar: H 1.0, O 16.0, Cl 35.5, Co 58.9)",
      value: (1.3 / a) * h, sf: 3, unit: "g",
      wrong: [sfStr(1.3 + 6 * 18, 3), sfStr((1.3 / a) * 18 * 6, 3)],
      hints: ["The amount of cobalt chloride stays the same."],
      explanation: `1. n(CoCl₂) = 1.30 ÷ ${dpStr(a, 1)} = ${sciStr(1.3 / a, 3)} mol.\n2. Mr(CoCl₂·6H₂O) = ${dpStr(h, 1)}; mass = ${sciStr(1.3 / a, 3)} × ${dpStr(h, 1)} = ${sfStr((1.3 / a) * h, 3)} g. The water alone would be ${sfStr((1.3 / a) * 18 * 6, 3)} g.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Heating a pink solution of cobalt(II) chloride in concentrated hydrochloric acid turns it blue because cobalt(II) is oxidised to cobalt(III).",
    answer: false,
    explanation: "False. Cobalt stays +2; heating moves the endothermic ligand-exchange equilibrium to blue tetrahedral [CoCl₄]²⁻.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each material with the use that depends on nickel or cobalt.",
    pairs: [
      ["finely divided nickel", "catalyst for hardening vegetable oils"],
      ["alnico", "strong permanent magnets"],
      ["cupronickel", "hard-wearing coins"],
      ["vitamin B₁₂", "a cobalt compound needed to make red blood cells"],
    ],
    extraRight: ["a cobalt compound in chlorophyll"],
    explanation: "Chlorophyll contains magnesium, not cobalt.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Complete the description of the electrolytic refining of nickel.",
    template: "The impure nickel is made the {{blank:a}}, where nickel atoms are {{blank:b}} to Ni²⁺ ions. The cathode is a thin sheet of {{blank:c}} nickel. The electrolyte is aqueous nickel(II) {{blank:d}}.",
    blanks: [
      { id: "a", accepted: ["anode"], choices: ["anode", "cathode"] },
      { id: "b", accepted: ["oxidised"], choices: ["oxidised", "reduced", "hydrated"] },
      { id: "c", accepted: ["pure"], choices: ["pure", "impure", "molten"] },
      { id: "d", accepted: ["sulfate"], choices: ["sulfate", "oxide", "sulfide"] },
    ],
    hints: ["The metal to be purified dissolves."],
    explanation: "Anode: Ni → Ni²⁺ + 2e⁻ (impure). Cathode: Ni²⁺ + 2e⁻ → Ni (pure). Electrolyte: NiSO₄(aq) (or chloride).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the molten mixture of metal sulfides formed when a nickel sulfide concentrate is smelted.",
    accepted: ["matte", "nickel matte", "a matte"],
    wrong: ["slag"],
    explanation: "The matte contains nickel, copper and iron sulfides; the slag carries away silicates and iron oxide.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why adding concentrated hydrochloric acid to pink aqueous cobalt(II) chloride turns it blue, and why warming then deepens the blue.",
    points: [
      "Ligand exchange: water ligands are replaced by chloride, [Co(H₂O)₆]²⁺ + 4Cl⁻ ⇌ [CoCl₄]²⁻ + 6H₂O",
      "A high [Cl⁻] moves the equilibrium to the right (Le Chatelier)",
      "The coordination number falls to 4 and the shape becomes tetrahedral because chloride ions are larger",
      "The forward reaction is endothermic, so warming moves the position further to the right",
    ],
    modelAnswer: "Concentrated HCl supplies a high concentration of chloride ions, which replace water ligands: [Co(H₂O)₆]²⁺ + 4Cl⁻ ⇌ [CoCl₄]²⁻ + 6H₂O, so the position moves to the right. Chloride ions are larger than water molecules, so only four fit round Co²⁺, giving a blue tetrahedral complex. The forward reaction is endothermic, so warming moves the equilibrium further right and the blue deepens.",
    hints: ["Use Le Chatelier's principle twice."],
    explanation: "Ligand exchange with change of coordination number; endothermic forward reaction.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Outline how nickel is produced from a sulfide ore and purified.",
    points: [
      "The ore is crushed and concentrated (froth flotation)",
      "Roasting in air removes some sulfur as SO₂ (converting some sulfide to oxide)",
      "Smelting (with silica) gives a matte of metal sulfides; iron goes into the slag; air blown through the matte removes more iron and sulfur",
      "Electrolytic refining: impure nickel anode, pure nickel cathode, nickel sulfate electrolyte",
    ],
    modelAnswer: "The ore is crushed and concentrated by froth flotation. The concentrate is roasted in air, removing some sulfur as sulfur dioxide, then smelted with silica: iron oxide forms a slag and a molten matte of nickel, copper and iron sulfides remains. Air is blown through the matte to remove more iron and sulfur. The impure nickel is refined by electrolysis with an impure nickel anode, a pure nickel cathode and aqueous nickel sulfate.",
    hints: ["Four stages: concentrate, roast, smelt, refine."],
    explanation: "Outline of nickel production.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "State three uses of nickel and give the property that each depends on.",
    points: [
      "Stainless steel: corrosion resistance and toughness",
      "Hydrogenation catalyst (margarine): adsorbs H₂ and oil on its surface, weakening bonds; not used up",
      "Coins (cupronickel) or alnico magnets: hard-wearing and corrosion-resistant, or strongly magnetic",
    ],
    modelAnswer: "Nickel is alloyed with chromium and iron in stainless steel, which is tough and resists corrosion. Finely divided nickel catalyses the hydrogenation of vegetable oils to margarine because hydrogen and the oil adsorb on its surface. Cupronickel coins are hard-wearing and do not tarnish easily; alnico magnets are strongly magnetic.",
    hints: ["Think of kitchens, food factories and pockets."],
    explanation: "Uses of nickel and the properties behind them.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true,
    stem: "Thandeka investigated aqueous cobalt(II) chloride, wearing eye protection and working in a fume cupboard when using concentrated acid.\n\n| step | procedure | observation |\n|---|---|---|\n| 1 | concentrated hydrochloric acid added to the pink solution | the solution turns blue |\n| 2 | the blue solution is placed in ice | the solution turns pink |\n| 3 | aqueous ammonia added drop by drop to a fresh pink solution, then in excess | blue precipitate, which dissolves to give a pale brown solution |\n| 4 | the solution from step 3 is left open to the air | the solution darkens |",
    parts: [
      P.short({ label: "(a)", stem: "Give the formula of the blue complex formed in step 1. (Type it as, for example, [CuCl4]2-.)", accepted: ["[CoCl4]2-", "[CoCl4]^2-", "[CoCl₄]²⁻", "CoCl42-", "[CoCl4](2-)"], normalise: ["trim", "lowercase", "remove_whitespace"], wrong: ["[Co(H2O)6]2+"], explanation: "Tetrahedral [CoCl₄]²⁻." }),
      P.mcq({ label: "(b)", stem: "What does step 2 show about the forward reaction of step 1?", options: [
        ["It is endothermic.", "Correct: cooling reverses it, so the reverse reaction is exothermic."],
        ["It is exothermic.", "Cooling would then favour blue, not pink."],
        ["It has ΔH = 0.", "Then temperature would not change the position."],
        ["It is a redox reaction.", "Cobalt stays +2."],
      ], answer: "A", explanation: "Cooling favours the exothermic direction (reverse), so the forward reaction is endothermic." }),
      P.short({ label: "(c)", stem: "Give the formula of the blue precipitate in step 3.", accepted: ["Co(OH)2", "Co(OH)₂"], normalise: ["trim", "lowercase", "remove_whitespace"], wrong: ["Co(OH)3"], explanation: "Cobalt(II) hydroxide." }),
      P.manual({ label: "(d)", marks: 2, stem: "Write an equation for the dissolving of the precipitate in excess ammonia.", points: ["Co(OH)₂ and NH₃ on the left; [Co(NH₃)₆]²⁺ on the right", t`Balanced: $\ce{Co(OH)2 + 6NH3 -> [Co(NH3)6]^2+ + 2OH-}$`], modelAnswer: "Co(OH)₂ + 6NH₃ → [Co(NH₃)₆]²⁺ + 2OH⁻." }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain the darkening in step 4, with an equation.", points: ["Oxygen in the air oxidises cobalt(II) to cobalt(III) (ammonia ligands make cobalt(III) stable)", t`$\ce{4[Co(NH3)6]^2+ + O2 + 2H2O -> 4[Co(NH3)6]^3+ + 4OH-}$`], modelAnswer: "Air oxidises [Co(NH₃)₆]²⁺ to darker [Co(NH₃)₆]³⁺: 4[Co(NH₃)₆]²⁺ + O₂ + 2H₂O → 4[Co(NH₃)₆]³⁺ + 4OH⁻. With ammonia ligands, cobalt(III) is the more stable state." }),
      P.num({ label: "(f)", stem: "Give the coordination number of cobalt in the complex formed in excess ammonia.", value: 6, wrong: [4], explanation: "[Co(NH₃)₆]²⁺: six ammonia ligands, octahedral." }),
    ],
    hints: ["Steps 1 and 2 are one equilibrium; step 4 is redox."],
    explanation: "Steps 1-2: ligand exchange (endothermic forward). Steps 3-4: ammine complex then air oxidation to cobalt(III).",
  });
  {
    const Q = charge(150, 24 * 3600);
    const kg = massLiberated(Q, 58.7, 2) / 1000;
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: "A nickel concentrate is processed in a smelter and refinery. Impure nickel anodes containing small amounts of copper, iron and platinum group metals are refined in cells at a current of 150 A. (F = 9.65 × 10⁴ C mol⁻¹; Ar Ni = 58.7)",
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: "State why the concentrate is roasted before smelting and suggest how the sulfur dioxide formed is prevented from polluting the air.", points: ["Roasting removes part of the sulfur as SO₂ (and converts some iron sulfide to oxide, which can form slag)", "The SO₂ is captured and converted to sulfuric acid (Contact process) or absorbed in an alkaline scrubber"], modelAnswer: "Roasting in air removes some of the sulfur as sulfur dioxide and converts iron sulfide to iron oxide, which later forms slag. The SO₂ is captured and used to make sulfuric acid, or removed with an alkaline scrubber." }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the mass of nickel, in kg, deposited by one cell in 24.0 hours, to three significant figures.", value: kg, sf: 3, unit: "kg", wrong: [sfStr(kg * 2, 3)], explanation: `Q = 150 × 24.0 × 3600 = ${sciStr(Q, 3)} C; n(Ni) = ${sciStr(Q, 3)} ÷ (2 × 9.65 × 10⁴) = ${sfStr(Q / (2 * 9.65e4), 3)} mol; mass = ${sfStr(kg * 1000, 3)} g = ${sfStr(kg, 3)} kg.` }),
        P.manual({ label: "(c)", marks: 2, stem: "Explain what happens to the copper and platinum group metal impurities during refining.", points: ["Copper (and iron) are oxidised at the anode and go into solution as ions, but are not deposited at the cathode when the voltage is controlled (copper may need to be removed from the electrolyte)", "Platinum group metals are less reactive: they are not oxidised and fall to the bottom as anode slime, from which they are recovered"], modelAnswer: "More reactive impurities such as iron, and copper, dissolve as ions; with careful control of the voltage and purification of the electrolyte they are not deposited on the cathode. Platinum group metals are not oxidised; they fall beneath the anode as slime, which is collected and refined because it is valuable." }),
        P.mcq({ label: "(d)", stem: "Which use of nickel depends on it being a heterogeneous catalyst?", options: [
          ["hardening vegetable oils", "Correct: Ni catalyses hydrogenation of C=C."],
          ["stainless steel", "This depends on corrosion resistance."],
          ["cupronickel coins", "This depends on hardness and corrosion resistance."],
          ["alnico magnets", "This depends on magnetic properties."],
        ], answer: "A", explanation: "Hydrogenation of oils over finely divided nickel." }),
        P.tf({ label: "(e)", stem: "Cobalt is often recovered as a by-product when nickel ores are refined.", answer: true, explanation: "True: cobalt occurs with nickel and copper." }),
      ],
      hints: ["Q = It; Ni²⁺ + 2e⁻ → Ni.", "Less reactive metals than nickel are not oxidised at the anode."],
      explanation: `Roasting removes sulfur; ${sfStr(kg, 3)} kg of Ni per cell per day; precious metals collect in the anode slime.`,
    });
  }
  b.card("FORMULA", "Cobalt(II) equilibrium", "[Co(H₂O)₆]²⁺ (pink, octahedral) + 4Cl⁻ ⇌ [CoCl₄]²⁻ (blue, tetrahedral) + 6H₂O; forward endothermic.");
  b.card("CONCEPT", "Why [CoCl₄]²⁻ is tetrahedral", "Cl⁻ ions are larger than H₂O molecules, so only four fit round Co²⁺: coordination number 4.");
  b.card("FACT", "Effect of temperature on the cobalt equilibrium", "Heating → blue ([CoCl₄]²⁻); cooling → pink ([Co(H₂O)₆]²⁺).");
  b.card("CONCEPT", "Stability of cobalt(III)", "Co³⁺(aq) oxidises water (+1.82 V); with NH₃ ligands air oxidises Co(II) to Co(III) (E⦵cell +0.29 V).");
  b.card("FACT", "Test for water", "Anhydrous CoCl₂ (blue) → CoCl₂·6H₂O (pink).");
  b.card("FACT", "Uses of cobalt", "Alloys and alnico magnets; CoCl₂ paper; vitamin B₁₂; blue pigments.");
  b.card("FACT", "Nickel production outline", "Concentrate (flotation) → roast (SO₂ off) → smelt to matte → convert → electrolytic refining.");
  b.card("FACT", "Uses of nickel", "Stainless steel, alnico magnets, cupronickel coins, hydrogenation catalyst (margarine).");
  b.card("DEFINITION", "Matte", "Molten mixture of metal sulfides (Ni, Cu, Fe) from smelting a sulfide concentrate.");
});
