// W3a: achem.transition.copper (ZIMSEC only, Form 6; tagged to ZIMSEC automatically).
import { concept, P, t, chk, ecell, Mr, molesFromSolution, massLiberated, charge, sfStr, dpStr, sciStr } from "../lib.mjs";

const E = { CupCu: 0.52, Cu2Cup: 0.15, Cu2Cu: 0.34, I2: 0.54, Cu2CuI: 0.86 };
const M_CuSO4 = chk(Mr("CuSO4.5H2O"), 249.6);

concept("achem.transition.copper", { file: "transition/copper", keyPrefix: "transition.copper" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which ore is the main source of copper?",
    options: [
      ["chalcopyrite, CuFeS₂", "Correct: a copper iron sulfide."],
      ["bauxite, Al₂O₃·2H₂O", "Bauxite is the ore of aluminium."],
      ["pyrolusite, MnO₂", "Pyrolusite is the ore of manganese."],
      ["galena, PbS", "Galena is the ore of lead."],
    ],
    answer: "A",
    explanation: "Chalcopyrite is the most important copper ore.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Potassium iodide solution is added to aqueous copper(II) sulfate. What is seen?",
    options: [
      ["a white precipitate in a brown solution", "Correct: CuI(s) is white; the iodine colours the solution brown."],
      ["a deep blue solution forms", "Deep blue is [Cu(NH₃)₄(H₂O)₂]²⁺, from ammonia."],
      ["a pale blue precipitate forms", "Pale blue Cu(OH)₂ forms with hydroxide ions."],
      ["a red-brown precipitate forms", "Red-brown Cu₂O forms in Fehling's test."],
    ],
    answer: "A",
    explanation: "2Cu²⁺ + 4I⁻ → 2CuI + I₂: white CuI in brown iodine solution (looks off-white to buff).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why are copper(I) iodide and copper(I) chloride white?",
    options: [
      ["Cu⁺ has a full 3d sub-shell, so no d-d transitions occur.", "Correct: Cu⁺ is 3d¹⁰."],
      ["Cu⁺ has no d electrons at all, so it cannot absorb light.", "Cu⁺ has ten d electrons: [Ar] 3d¹⁰."],
      ["The halide ligands split the d orbitals very widely.", "Splitting needs a partly filled d sub-shell to give colour."],
      ["Copper(I) absorbs all wavelengths of visible light.", "A substance that absorbs all visible light looks black."],
    ],
    answer: "A",
    explanation: "With 3d¹⁰ no electron can be promoted between d orbitals, so no visible light is absorbed by d-d transitions.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Copper(I) oxide is warmed with dilute sulfuric acid. What forms?",
    options: [
      ["copper and blue copper(II) sulfate solution", "Correct: Cu⁺ disproportionates in water."],
      ["a colourless solution of copper(I) sulfate only", "Cu⁺(aq) is unstable and disproportionates."],
      ["copper(II) oxide and hydrogen gas", "No hydrogen forms; this is not a metal-acid reaction."],
      ["a deep blue solution with no solid remaining", "Half the copper is reduced to the metal, which remains as a solid."],
    ],
    answer: "A",
    hints: ["What happens to Cu⁺(aq) in water?"],
    explanation: "Cu₂O + H₂SO₄ → Cu + CuSO₄ + H₂O: copper(I) is oxidised and reduced at the same time.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements about copper(I) are correct?\n\n1. Cu⁺(aq) disproportionates into Cu and Cu²⁺(aq).\n2. Copper(I) is stable in insoluble compounds such as CuI.\n3. Copper(I) is stable in the complex [CuCl₂]⁻.",
    options: [
      ["1, 2 and 3", "Correct: free Cu⁺(aq) is unstable; precipitation and complexing stabilise copper(I)."],
      ["1 and 2 only", "Statement 3 is also true: [CuCl₂]⁻ is a stable copper(I) complex."],
      ["2 and 3 only", "Statement 1 is also true: E⦵cell = +0.37 V."],
      ["1 only", "Statements 2 and 3 are also true."],
    ],
    answer: "A",
    hints: ["Stabilising means keeping the concentration of free Cu⁺(aq) very low."],
    explanation: "Removing Cu⁺ from solution as CuI or binding it as [CuCl₂]⁻ prevents disproportionation.",
  });
  b.mcq({
    d: 3, skill: "RECALL",
    stem: "In the electrolytic purification of copper, what is the cathode made of?",
    options: [
      ["a thin sheet of pure copper", "Correct: pure copper is deposited on it."],
      ["a block of impure copper", "Impure copper is the anode, which dissolves."],
      ["graphite rods", "Graphite would work but pure copper is used, so the deposit is all copper."],
      ["platinum foil", "Platinum is not needed; the cathode becomes part of the product."],
    ],
    answer: "A",
    hints: ["The cathode is where copper is deposited."],
    explanation: "Impure Cu anode (dissolves), pure Cu cathode (grows), CuSO₄/H₂SO₄ electrolyte.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Data (E⦵ / V): Cu²⁺ + e⁻ ⇌ Cu⁺ +0.15; I₂ + 2e⁻ ⇌ 2I⁻ +0.54. Copper(II) ions nevertheless oxidise iodide ions. Which statements are correct?\n\n1. E⦵cell for Cu²⁺ + I⁻ → Cu⁺ + ½I₂ is negative.\n2. Precipitation of CuI keeps [Cu⁺] very low and makes the reaction feasible.\n3. Each mole of Cu²⁺ forms one mole of I₂.",
    options: [
      ["1 and 2 only", "Correct: 0.15 − 0.54 = −0.39 V, but CuI precipitation drives the change; 2Cu²⁺ give one I₂."],
      ["1, 2 and 3", "Statement 3 is false: two moles of Cu²⁺ give one mole of I₂."],
      ["2 and 3 only", "Statement 1 is true and statement 3 is false."],
      ["2 only", "Statement 1 is also true."],
    ],
    answer: "A",
    hints: ["Balance 2Cu²⁺ + 4I⁻ → 2CuI + I₂."],
    explanation: "The insolubility of CuI changes the effective electrode potential; the mole ratio Cu²⁺ : I₂ is 2 : 1.",
  });
  b.mcq({
    d: 4, skill: "APPLICATION",
    stem: "Which alloy, and which property, explains the use of copper alloys for water taps?",
    options: [
      ["brass: harder than copper and corrosion-resistant", "Correct: brass (Cu/Zn) is easily machined and does not rust."],
      ["bronze: a better electrical conductor than copper", "Alloys conduct less well than pure copper."],
      ["solder: a low melting point", "Solder joins pipes; it is not used for taps."],
      ["steel: a protective oxide layer of chromium", "That describes stainless steel, which is not a copper alloy."],
    ],
    answer: "A",
    hints: ["Which alloy is copper with zinc?"],
    explanation: "Brass is harder than copper, resists corrosion and is easy to machine and cast into fittings.",
  });
  {
    const e = ecell(E.CupCu, E.Cu2Cup);
    b.num({
      d: 2, skill: "APPLICATION", calculator: true, daily: true,
      stem: "Data (E⦵ / V): Cu⁺ + e⁻ ⇌ Cu +0.52; Cu²⁺ + e⁻ ⇌ Cu⁺ +0.15. Calculate E⦵cell, in V, for 2Cu⁺(aq) → Cu(s) + Cu²⁺(aq), to two decimal places.",
      value: e, dp: 2, unit: "V",
      wrong: [dpStr(-e, 2), dpStr(E.CupCu + E.Cu2Cup, 2)],
      explanation: `1. Reduction: Cu⁺ → Cu (+0.52 V); oxidation: Cu⁺ → Cu²⁺ (reverse of +0.15 V).\n2. E⦵cell = 0.52 − 0.15 = +${dpStr(e, 2)} V: copper(I) disproportionates. Subtracting the other way gives ${dpStr(-e, 2)} V; adding gives ${dpStr(E.CupCu + E.Cu2Cup, 2)} V.`,
    });
  }
  {
    const n = molesFromSolution(24.6, 0.05);
    const mass = n * 10 * M_CuSO4;
    const pct = (mass / 3.2) * 100;
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: "3.20 g of impure copper(II) sulfate crystals, CuSO₄·5H₂O, was dissolved and made up to 250 cm³. 25.0 cm³ portions were added to excess potassium iodide and the iodine titrated with 0.0500 mol dm⁻³ sodium thiosulfate; the mean titre was 24.60 cm³. Calculate the percentage purity of the crystals, to three significant figures. (Mr CuSO₄·5H₂O = 249.6)",
      value: pct, sf: 3, unit: "%",
      wrong: [sfStr(pct * 2, 3), sfStr(pct / 10, 3)],
      hints: ["2Cu²⁺ → I₂ → 2S₂O₃²⁻, so Cu²⁺ : S₂O₃²⁻ = 1 : 1."],
      explanation: `1. n(S₂O₃²⁻) = 0.02460 × 0.0500 = ${sciStr(n, 3)} mol = n(Cu²⁺) in 25.0 cm³ (1 : 1).\n2. In 250 cm³: ${sciStr(n * 10, 3)} mol; mass = ${sciStr(n * 10, 3)} × 249.6 = ${sfStr(mass, 3)} g.\n3. Purity = ${sfStr(mass, 3)} ÷ 3.20 × 100 = ${sfStr(pct, 3)}%. A 2 : 1 ratio gives ${sfStr(pct * 2, 3)}% (impossible); forgetting the ×10 scale-up gives ${sfStr(pct / 10, 3)}%.`,
    });
  }
  {
    const m = massLiberated(charge(2.5, 3600), 63.5, 2);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "In a model copper purification cell, a current of 2.50 A flows for 1.00 hour. Calculate the increase in mass of the pure copper cathode, in g, to three significant figures. (Ar Cu = 63.5; F = 9.65 × 10⁴ C mol⁻¹)",
      value: m, sf: 3, unit: "g",
      wrong: [sfStr(m * 2, 3), sfStr(m / 60, 3)],
      hints: ["Q = It, with t in seconds; Cu²⁺ + 2e⁻ → Cu."],
      explanation: `1. Q = 2.50 × 3600 = ${sciStr(charge(2.5, 3600), 3)} C.\n2. n(Cu) = ${sciStr(charge(2.5, 3600), 3)} ÷ (2 × 9.65 × 10⁴) = ${sciStr(charge(2.5, 3600) / 1.93e5, 3)} mol.\n3. Mass = × 63.5 = ${sfStr(m, 3)} g. Forgetting the 2 electrons gives ${sfStr(m * 2, 3)} g; using minutes gives ${sfStr(m / 60, 3)} g.`,
    });
  }
  {
    const M = chk(Mr("CuFeS2"), 183.5);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "Calculate the percentage by mass of copper in pure chalcopyrite, CuFeS₂, to three significant figures. (Ar: S 32.1, Fe 55.8, Cu 63.5)",
      value: (63.5 / M) * 100, sf: 3, unit: "%",
      wrong: [sfStr((63.5 / (63.5 + 55.8 + 32.1)) * 100, 3)],
      hints: ["There are two sulfur atoms in the formula."],
      explanation: `1. Mr(CuFeS₂) = 63.5 + 55.8 + 2(32.1) = ${dpStr(M, 1)}.\n2. % Cu = 63.5 ÷ ${dpStr(M, 1)} × 100 = ${sfStr((63.5 / M) * 100, 3)}%. Counting only one sulfur gives ${sfStr((63.5 / (63.5 + 55.8 + 32.1)) * 100, 3)}%.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In the iodometric determination of copper, starch indicator is added at the start of the titration.",
    answer: false,
    explanation: "False. Starch is added near the end-point (pale yellow); with a lot of iodine it forms a complex that blurs the end-point.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each copper species with its colour.",
    pairs: [
      [t`$\ce{[Cu(H2O)6]^2+}$`, "blue"],
      [t`$\ce{[Cu(NH3)4(H2O)2]^2+}$`, "deep blue"],
      [t`$\ce{Cu2O}$`, "red-brown"],
      [t`$\ce{CuI}$`, "white"],
    ],
    extraRight: ["green-yellow gas"],
    explanation: "Copper(I) iodide is white because Cu⁺ is d¹⁰.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Complete the description of Fehling's test.",
    template: "Fehling's solution contains complexed {{blank:a}} ions in alkaline solution. When it is warmed with an aldehyde, the aldehyde is {{blank:b}} and a {{blank:c}} precipitate of copper(I) oxide forms. A ketone gives {{blank:d}}.",
    blanks: [
      { id: "a", accepted: ["copper(II)"], choices: ["copper(I)", "copper(II)", "silver(I)", "iron(III)"] },
      { id: "b", accepted: ["oxidised"], choices: ["oxidised", "reduced", "hydrolysed", "dehydrated"] },
      { id: "c", accepted: ["red-brown"], choices: ["red-brown", "white", "deep blue", "black"] },
      { id: "d", accepted: ["no change"], choices: ["no change", "a silver mirror", "a white precipitate", "a yellow precipitate"] },
    ],
    hints: ["Which partner is oxidised and which reduced?"],
    explanation: "Cu²⁺ (blue) is reduced to Cu₂O (red-brown); the aldehyde is oxidised to a carboxylate. Ketones are not oxidised.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the alloy of copper and zinc.",
    accepted: ["brass"],
    wrong: ["bronze"],
    explanation: "Brass is Cu/Zn; bronze is Cu/Sn.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Outline the extraction of copper from chalcopyrite and its purification by electrolysis.",
    points: [
      "The ore is concentrated (froth flotation) and smelted in air with silica: iron forms a slag and a matte (Cu₂S/FeS) remains",
      t`In the converter air removes the remaining iron and then $\ce{Cu2S + O2 -> 2Cu + SO2}$ gives blister copper`,
      "Purification: impure copper anode, pure copper cathode, copper(II) sulfate with sulfuric acid as electrolyte",
      "Cu → Cu²⁺ + 2e⁻ at the anode, Cu²⁺ + 2e⁻ → Cu at the cathode; impurities stay in solution or fall as anode slime (Ag, Au, Pt)",
    ],
    modelAnswer: "Chalcopyrite is concentrated by froth flotation and smelted in air with silica, which removes iron as slag and leaves a matte of copper(I) and iron sulfides. In the converter, air removes the rest of the iron, and copper(I) sulfide is converted to copper: Cu₂S + O₂ → 2Cu + SO₂ (blister copper). The blister copper is cast into anodes and electrolysed in copper(II) sulfate and sulfuric acid with pure copper cathodes: copper dissolves at the anode and is deposited at the cathode, while silver, gold and platinum collect as anode slime.",
    hints: ["Four stages: concentrate, smelt, convert, refine."],
    explanation: "Copper production outline.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 3,
    stem: "Copper(II) chloride solution is boiled with copper turnings and concentrated hydrochloric acid, and the solution is then poured into a large volume of water. Explain what happens, with equations.",
    points: [
      t`Copper(I) complex forms: $\ce{Cu^2+ + Cu + 4Cl- -> 2[CuCl2]-}$ (Cu²⁺ reduced, Cu oxidised)`,
      "The complex keeps the concentration of free Cu⁺ low, so copper(I) does not disproportionate",
      t`On dilution the complex breaks down and white copper(I) chloride precipitates: $\ce{[CuCl2]- -> CuCl + Cl-}$`,
    ],
    modelAnswer: "Copper metal reduces copper(II) and is itself oxidised, giving copper(I), which is held as the chloro complex: Cu²⁺ + Cu + 4Cl⁻ → 2[CuCl₂]⁻. Because Cu⁺ is bound in the complex, there is almost no free Cu⁺(aq) to disproportionate. In a large volume of water the chloride concentration falls, the complex breaks down and insoluble white copper(I) chloride precipitates: [CuCl₂]⁻ → CuCl + Cl⁻.",
    hints: ["This is the reverse of disproportionation (comproportionation)."],
    explanation: "Copper(I) stabilised by complexing and then by precipitation.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "State three uses of copper or its compounds and the property each depends on.",
    points: [
      "Electrical wiring: excellent electrical conductor and ductile",
      "Water pipes or brass/bronze fittings: unreactive with water / corrosion-resistant (brass harder than copper)",
      "Copper(II) sulfate as a fungicide (Cu²⁺ toxic to fungi) or Fehling's solution to test for aldehydes (Cu²⁺ reduced to Cu₂O)",
    ],
    modelAnswer: "Copper is used for electrical wiring because it is an excellent conductor and can be drawn into wires. Copper pipes and brass taps resist corrosion by water. Copper(II) sulfate is sprayed on crops as a fungicide because copper(II) ions are toxic to fungi.",
    hints: ["One metal use, one alloy use, one compound use."],
    explanation: "Uses of copper, its alloys and compounds.",
  });
  {
    const n = molesFromSolution(22.7, 0.1);
    const gCu = n * 10 * 63.5;
    const pct = (gCu / 5.0) * 100;
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: "A 5.00 g sample of a copper ore concentrate was dissolved in acid, neutralised, and made up to 250 cm³. 25.0 cm³ portions were treated with excess aqueous potassium iodide and titrated with 0.100 mol dm⁻³ sodium thiosulfate, adding starch near the end-point. The mean titre was 22.70 cm³. Eye protection was worn. (Ar Cu = 63.5)",
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: "Write the two equations for the reactions in the titration flask.", points: [t`$\ce{2Cu^2+ + 4I- -> 2CuI + I2}$`, t`$\ce{I2 + 2S2O3^2- -> 2I- + S4O6^2-}$`], modelAnswer: "2Cu²⁺ + 4I⁻ → 2CuI + I₂, then I₂ + 2S₂O₃²⁻ → 2I⁻ + S₄O₆²⁻." }),
        P.num({ label: "(b)", stem: "Calculate the amount of thiosulfate in the mean titre, in mol.", value: n, unit: "mol", explanation: `0.02270 × 0.100 = ${sciStr(n, 3)} mol.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the mass of copper in the 5.00 g sample, in g.", value: gCu, sf: 3, unit: "g", wrong: [sfStr(gCu / 2, 3), sfStr(gCu / 10, 3)], explanation: `n(Cu²⁺) = n(S₂O₃²⁻) = ${sciStr(n, 3)} mol per 25.0 cm³; × 10 = ${sciStr(n * 10, 3)} mol; × 63.5 = ${sfStr(gCu, 3)} g. Halving for a 2 : 1 ratio gives ${sfStr(gCu / 2, 3)} g.` }),
        P.num({ label: "(d)", stem: "Calculate the percentage of copper in the concentrate.", value: pct, sf: 3, unit: "%", explanation: `${sfStr(gCu, 3)} ÷ 5.00 × 100 = ${sfStr(pct, 3)}%.` }),
        P.mcq({ label: "(e)", stem: "What is the colour change at the end-point?", options: [
          ["blue-black to white", "Correct: the iodine-starch colour disappears, leaving white CuI."],
          ["colourless to pale pink", "That is a manganate(VII) titration."],
          ["brown to blue-black", "Blue-black appears when starch is added, before the end-point."],
          ["orange to green", "That is dichromate(VI) being reduced."],
        ], answer: "A", explanation: "Starch-iodine blue-black disappears; the CuI precipitate remains white (off-white)." }),
        P.manual({ label: "(f)", marks: 2, stem: "Explain why the iron(III) ions present in the ore would make the result too high, and suggest how this could be avoided.", points: ["Fe³⁺ also oxidises iodide to iodine (E⦵cell = 0.77 − 0.54 > 0), so more thiosulfate is needed", "Remove or mask the iron(III) before adding KI, for example by complexing it with fluoride (or phosphate) ions, or by precipitating it"], modelAnswer: "Iron(III) ions also oxidise iodide to iodine, 2Fe³⁺ + 2I⁻ → 2Fe²⁺ + I₂, so extra iodine is titrated and the copper result is too high. The iron(III) can be complexed with fluoride ions (which lowers its oxidising power) or removed as a precipitate before the iodide is added." }),
        P.tf({ label: "(g)", stem: "The copper(I) iodide formed in the flask is white because copper(I) has a full 3d sub-shell.", answer: true, explanation: "True: Cu⁺ is 3d¹⁰." }),
        P.manual({ label: "(h)", marks: 2, stem: "Explain why the starch is added only when the solution has become pale yellow.", points: ["Pale yellow shows that only a little iodine remains, so the end-point is near", "With a high iodine concentration starch forms a complex that releases iodine slowly (or is not reversible quickly), so the colour change would be gradual and the end-point would be overshot or unclear"], modelAnswer: "The pale yellow colour means that most of the iodine has reacted and the end-point is close. If starch is added while there is a lot of iodine, it forms a stable blue-black complex that gives up its iodine only slowly, so the end-point is blurred." }),
      ],
      hints: ["Cu²⁺ : S₂O₃²⁻ = 1 : 1.", "Scale up from 25.0 cm³ to 250 cm³."],
      explanation: `${sfStr(gCu, 3)} g of copper; ${sfStr(pct, 3)}% copper.`,
    });
  }
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true,
    stem: "Chipo carried out these reactions with copper compounds, wearing eye protection.\n\n| step | procedure | observation |\n|---|---|---|\n| 1 | Fehling's solution warmed with compound **K** (C₃H₆O) | red-brown precipitate **L** |\n| 2 | **L** warmed with dilute sulfuric acid | pink-brown solid **M** and a blue solution |\n| 3 | excess aqueous ammonia added to the blue solution from step 2 | deep blue solution |",
    parts: [
      P.short({ label: "(a)", stem: "Name compound **K**.", accepted: ["propanal", "propionaldehyde"], wrong: ["propanone"], explanation: "C₃H₆O that reduces Fehling's: the aldehyde propanal (propanone is a ketone)." }),
      P.short({ label: "(b)", stem: "Give the formula of **L**.", accepted: ["Cu2O", "Cu₂O"], normalise: ["trim", "lowercase", "remove_whitespace"], wrong: ["CuO"], explanation: "Copper(I) oxide." }),
      P.manual({ label: "(c)", marks: 2, stem: "Identify **M** and write an ionic equation for step 2.", points: ["M is copper (metal)", t`$\ce{Cu2O + 2H+ -> Cu + Cu^2+ + H2O}$`], modelAnswer: "M is copper. Cu₂O + 2H⁺ → Cu + Cu²⁺ + H₂O (disproportionation of copper(I))." }),
      P.mcq({ label: "(d)", stem: "Which species causes the deep blue colour in step 3?", options: [
        [t`$\ce{[Cu(NH3)4(H2O)2]^2+}$`, "Correct: partial ligand exchange with ammonia."],
        [t`$\ce{[Cu(H2O)6]^2+}$`, "This is the pale blue aqua ion."],
        [t`$\ce{Cu(OH)2}$`, "This pale blue precipitate dissolves in excess ammonia."],
        [t`$\ce{[CuCl4]^2-}$`, "This yellow-green complex needs concentrated chloride."],
      ], answer: "A", explanation: "Excess NH₃ gives [Cu(NH₃)₄(H₂O)₂]²⁺." }),
      P.num({ label: "(e)", stem: "Give the oxidation state of copper in **L**.", value: 1, wrong: [2], explanation: "Cu₂O: 2x − 2 = 0, x = +1." }),
      P.tf({ label: "(f)", stem: "In step 1, the copper(II) ions are reduced.", answer: true, explanation: "True: +2 → +1; the aldehyde is oxidised." }),
      P.short({ label: "(g)", stem: "Name the type of redox reaction that occurs in step 2.", accepted: ["disproportionation", "disproportionation reaction"], wrong: ["displacement"], explanation: "Copper(I) is both oxidised (to Cu²⁺) and reduced (to Cu)." }),
    ],
    hints: ["Fehling's distinguishes aldehydes from ketones."],
    explanation: "K = propanal; L = Cu₂O; M = Cu; deep blue = [Cu(NH₃)₄(H₂O)₂]²⁺.",
  });
  b.card("FACT", "Copper ores", "Chalcopyrite CuFeS₂ (main), chalcocite Cu₂S, malachite (basic copper carbonate).");
  b.card("FORMULA", "Converter reaction", "Cu₂S + O₂ → 2Cu + SO₂ (blister copper).");
  b.card("FACT", "Electrolytic purification of copper", "Impure Cu anode, pure Cu cathode, CuSO₄/H₂SO₄ electrolyte; Ag, Au, Pt fall as anode slime.");
  b.card("FORMULA", "Disproportionation of copper(I)", "2Cu⁺(aq) → Cu + Cu²⁺(aq); E⦵cell = 0.52 − 0.15 = +0.37 V.");
  b.card("CONCEPT", "Stabilising copper(I)", "Insoluble CuI or CuCl, or the complex [CuCl₂]⁻, keep free Cu⁺(aq) low, preventing disproportionation.");
  b.card("FORMULA", "Copper(II) and iodide", "2Cu²⁺ + 4I⁻ → 2CuI (white) + I₂; titrate I₂ with S₂O₃²⁻: Cu²⁺ : S₂O₃²⁻ = 1 : 1.");
  b.card("FACT", "Copper alloys", "Brass = Cu + Zn; bronze = Cu + Sn; cupronickel = Cu + Ni.");
  b.card("FACT", "Fehling's test", "Aldehyde + Fehling's (Cu²⁺, alkaline), warm → red-brown Cu₂O precipitate; ketones: no change.");
  b.card("FACT", "Copper(II) sulfate in agriculture", "Fungicide (e.g. Bordeaux mixture with lime): Cu²⁺ is toxic to fungi.");
});
