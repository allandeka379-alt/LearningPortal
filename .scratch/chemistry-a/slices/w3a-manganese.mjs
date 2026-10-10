// W3a: achem.transition.manganese (ZIMSEC only, Form 6; tagged to ZIMSEC automatically).
import { concept, P, t, chk, ecell, Mr, molesFromSolution, sfStr, dpStr, sciStr } from "../lib.mjs";

const E = { MnO4Mn2: 1.52, Fe3: 0.77, Cl2: 1.36, MnO2Mn2: 1.23, MnO4MnO42: 0.56, MnO42MnO2: 2.26, I2: 0.54, Mn3: 1.49 };
const M_MnO2 = chk(Mr("MnO2"), 86.9);

concept("achem.transition.manganese", { file: "transition/manganese", keyPrefix: "transition.manganese" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: t`What is the colour of the manganate(VI) ion, $\ce{MnO4^2-}$, in alkaline solution?`,
    options: [
      ["dark green", "Correct: manganate(VI) is green and stable only in strong alkali."],
      ["deep purple", "Purple is manganate(VII), MnO₄⁻."],
      ["very pale pink", "Pale pink is Mn²⁺(aq), manganese(II)."],
      ["brown-black", "Brown-black is solid MnO₂, manganese(IV)."],
    ],
    answer: "A",
    explanation: "MnO₄⁻ purple (+7); MnO₄²⁻ green (+6); MnO₂ brown-black (+4); Mn²⁺ pale pink (+2).",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: t`What is the oxidation state of manganese in potassium manganate(VI), $\ce{K2MnO4}$?`,
    options: [
      ["+6", "Correct: 2(+1) + x + 4(−2) = 0, so x = +6."],
      ["+7", "+7 is manganese in KMnO₄, which has one potassium."],
      ["+4", "+4 is manganese in MnO₂."],
      ["+2", "+2 is the overall charge of the manganate ion, with the sign ignored."],
    ],
    answer: "A",
    explanation: "Potassium +1, oxygen −2: 2 + x − 8 = 0, x = +6, as the name manganate(VI) says.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which substance is the main ore of manganese?",
    options: [
      ["pyrolusite, MnO₂", "Correct: pyrolusite is mostly manganese(IV) oxide."],
      ["chromite, FeCr₂O₄", "Chromite is the ore of chromium, mined on the Great Dyke."],
      ["haematite, Fe₂O₃", "Haematite is an ore of iron."],
      ["chalcopyrite, CuFeS₂", "Chalcopyrite is an ore of copper."],
    ],
    answer: "A",
    explanation: "Pyrolusite (MnO₂) is the principal manganese ore.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Acidified potassium manganate(VII) is used to titrate iron(II) ions. Why is dilute hydrochloric acid not used to acidify the manganate(VII)?",
    options: [
      ["Chloride ions are oxidised, so extra titrant is used.", "Correct: MnO₄⁻ oxidises Cl⁻ to Cl₂ (E⦵cell = +0.16 V)."],
      ["Hydrochloric acid reduces iron(III) back to iron(II).", "Chloride ions cannot reduce Fe³⁺; the problem is their oxidation by MnO₄⁻."],
      ["Chloride ions make the end-point colour green.", "The end-point is still pale pink; the error is in the volume."],
      ["Hydrochloric acid is too weak to supply H⁺ ions.", "Hydrochloric acid is a strong acid."],
    ],
    answer: "A",
    hints: ["Compare E⦵(MnO₄⁻/Mn²⁺) = +1.52 V with E⦵(Cl₂/Cl⁻) = +1.36 V."],
    explanation: "E⦵cell = 1.52 − 1.36 = +0.16 V, so chloride is oxidised to chlorine; the titre would be too large. Dilute sulfuric acid is used.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Aqueous potassium manganate(VII) is added to a neutral solution of a reducing agent. What is seen?",
    options: [
      ["a brown-black precipitate forms", "Correct: in neutral solution MnO₄⁻ is reduced to MnO₂ (3 electrons)."],
      ["the solution turns colourless at once", "Decolorisation to Mn²⁺ needs plenty of H⁺ (acid solution)."],
      ["a white precipitate forms", "No white manganese compound forms here."],
      ["the solution turns orange", "Orange belongs to dichromate(VI), not to any manganese species here."],
    ],
    answer: "A",
    hints: ["How far is manganate(VII) reduced when there are few H⁺ ions?"],
    explanation: "MnO₄⁻ + 2H₂O + 3e⁻ → MnO₂ + 4OH⁻: purple solution, brown-black precipitate.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements about manganese(IV) oxide are correct?\n\n1. It catalyses the decomposition of hydrogen peroxide.\n2. It oxidises concentrated hydrochloric acid to chlorine on warming.\n3. It is used in the positive electrode of dry cells.",
    options: [
      ["1, 2 and 3", "Correct: all three are standard roles of MnO₂."],
      ["1 and 2 only", "Statement 3 is also true: MnO₂ is reduced at the positive electrode of dry cells."],
      ["2 and 3 only", "Statement 1 is also true: MnO₂ is the classic catalyst for H₂O₂ decomposition."],
      ["1 only", "Statements 2 and 3 are also true."],
    ],
    answer: "A",
    hints: ["MnO₂ can be a catalyst in one reaction and an oxidising agent in another."],
    explanation: "Catalyst (H₂O₂), oxidising agent (conc. HCl → Cl₂) and dry-cell electrode material.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Dilute sulfuric acid is added to a green solution of potassium manganate(VI). Which statements are correct?\n\n1. The solution turns purple and a brown-black solid forms.\n2. Manganese is both oxidised and reduced.\n3. Two moles of manganate(VI) are reduced for every mole oxidised.",
    options: [
      ["1 and 2 only", "Correct: in 3MnO₄²⁻ + 4H⁺ → 2MnO₄⁻ + MnO₂ + 2H₂O two are oxidised and one is reduced."],
      ["1, 2 and 3", "Statement 3 reverses the ratio: two are oxidised (to MnO₄⁻), one reduced (to MnO₂)."],
      ["2 and 3 only", "Statement 1 is true and statement 3 is false."],
      ["1 only", "Statement 2 is also true: this is disproportionation."],
    ],
    answer: "A",
    hints: ["Each MnO₄²⁻ → MnO₄⁻ loses 1 electron; each MnO₄²⁻ → MnO₂ gains 2."],
    explanation: "Electron balance: 2 × 1 e⁻ lost = 1 × 2 e⁻ gained, so 2 oxidised : 1 reduced.",
  });
  b.mcq({
    d: 4, skill: "APPLICATION",
    stem: "Data (E⦵ / V): MnO₂ + 4H⁺ + 2e⁻ ⇌ Mn²⁺ + 2H₂O +1.23; Cl₂ + 2e⁻ ⇌ 2Cl⁻ +1.36. MnO₂ nevertheless gives chlorine with hydrochloric acid. Which conditions make this possible?",
    options: [
      ["concentrated acid and heating", "Correct: high [H⁺] raises E for MnO₂/Mn²⁺ and Cl₂ escapes as a gas."],
      ["dilute acid at room temperature", "Under near-standard conditions E⦵cell = −0.13 V: no reaction."],
      ["adding a catalyst of iron(III) chloride", "A catalyst cannot make an unfavourable equilibrium position favourable."],
      ["adding sodium hydroxide first", "Alkali removes H⁺ and makes MnO₂ a weaker oxidising agent."],
    ],
    answer: "A",
    hints: ["E⦵ values apply to 1 mol dm⁻³ solutions; what changes with concentrated acid?"],
    explanation: "E⦵cell = 1.23 − 1.36 = −0.13 V under standard conditions; concentrated HCl and warming shift it in favour of chlorine.",
  });
  {
    const e = ecell(E.MnO4Mn2, E.Fe3);
    b.num({
      d: 2, skill: "APPLICATION", calculator: true, daily: true,
      stem: "Data (E⦵ / V): MnO₄⁻ + 8H⁺ + 5e⁻ ⇌ Mn²⁺ + 4H₂O +1.52; Fe³⁺ + e⁻ ⇌ Fe²⁺ +0.77. Calculate E⦵cell, in V, for the oxidation of iron(II) by acidified manganate(VII), to two decimal places.",
      value: e, dp: 2, unit: "V",
      wrong: [dpStr(-e, 2), dpStr(E.MnO4Mn2 + E.Fe3, 2)],
      explanation: `1. MnO₄⁻ is reduced and Fe²⁺ is oxidised.\n2. E⦵cell = E⦵(reduced) − E⦵(oxidised) = 1.52 − 0.77 = +${dpStr(e, 2)} V: feasible. Subtracting the other way gives ${dpStr(-e, 2)} V; adding gives ${dpStr(E.MnO4Mn2 + E.Fe3, 2)} V.`,
    });
  }
  {
    const e = ecell(E.MnO42MnO2, E.MnO4MnO42);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "Data (E⦵ / V): MnO₄⁻ + e⁻ ⇌ MnO₄²⁻ +0.56; MnO₄²⁻ + 4H⁺ + 2e⁻ ⇌ MnO₂ + 2H₂O +2.26. Calculate E⦵cell, in V, for the disproportionation of manganate(VI) in acid, to two decimal places.",
      value: e, dp: 2, unit: "V",
      wrong: [dpStr(-e, 2)],
      hints: ["Manganate(VI) is the species reduced in one couple and oxidised in the other."],
      explanation: `1. Reduction: MnO₄²⁻ → MnO₂ (E⦵ = +2.26 V). Oxidation: MnO₄²⁻ → MnO₄⁻ (the reverse of the +0.56 V couple).\n2. E⦵cell = 2.26 − 0.56 = +${dpStr(e, 2)} V, so manganate(VI) disproportionates in acid. The reverse subtraction gives ${dpStr(-e, 2)} V.`,
    });
  }
  {
    const n = 0.600 / 24.0;
    const m = n * M_MnO2;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "MnO₂ + 4HCl → MnCl₂ + Cl₂ + 2H₂O. Calculate the minimum mass of manganese(IV) oxide, in g, needed to make 0.600 dm³ of chlorine at room temperature and pressure, to three significant figures. (Molar gas volume 24.0 dm³ mol⁻¹; Ar: Mn 54.9, O 16.0)",
      value: m, sf: 3, unit: "g",
      wrong: [sfStr(n * 4 * M_MnO2, 3), sfStr(n * 54.9, 3)],
      hints: ["One mole of MnO₂ gives one mole of Cl₂."],
      explanation: `1. n(Cl₂) = 0.600 ÷ 24.0 = ${sfStr(n, 3)} mol.\n2. n(MnO₂) = n(Cl₂) = ${sfStr(n, 3)} mol (1 : 1).\n3. Mr(MnO₂) = 54.9 + 32.0 = ${dpStr(M_MnO2, 1)}; mass = ${sfStr(n, 3)} × ${dpStr(M_MnO2, 1)} = ${sfStr(m, 3)} g. Using the HCl ratio (4 : 1) gives ${sfStr(n * 4 * M_MnO2, 3)} g; using Ar(Mn) instead of Mr gives ${sfStr(n * 54.9, 3)} g.`,
    });
  }
  {
    const nMn = molesFromSolution(21.60, 0.0200);
    const c = (5 * nMn) / 0.025;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`25.0 cm³ of an acidified solution of iron(II) sulfate needed 21.60 cm³ of 0.0200 mol dm⁻³ potassium manganate(VII): $\ce{MnO4- + 8H+ + 5Fe^2+ -> Mn^2+ + 5Fe^3+ + 4H2O}$. Calculate the concentration of iron(II), in mol dm⁻³, to three significant figures.`,
      value: c, sf: 3, unit: "mol/dm³",
      wrong: [sfStr(nMn / 0.025, 3), sfStr(nMn / 5 / 0.025, 3)],
      hints: ["One MnO₄⁻ reacts with five Fe²⁺."],
      explanation: `1. n(MnO₄⁻) = 21.60 ÷ 1000 × 0.0200 = ${sciStr(nMn, 3)} mol.\n2. n(Fe²⁺) = 5 × ${sciStr(nMn, 3)} = ${sciStr(5 * nMn, 3)} mol.\n3. c = ${sciStr(5 * nMn, 3)} ÷ 0.0250 = ${sfStr(c, 3)} mol dm⁻³. Ignoring the 1 : 5 ratio gives ${sfStr(nMn / 0.025, 3)}; dividing by 5 instead gives ${sfStr(nMn / 5 / 0.025, 3)}.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Manganese(II) is the most stable oxidation state of manganese in acid solution.",
    answer: true,
    explanation: "True. Mn²⁺ (d⁵, half-filled) is hard to oxidise in acid, while Mn³⁺, MnO₄²⁻ and MnO₄⁻ are all oxidising agents that end up as Mn²⁺.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each manganese species with its colour.",
    pairs: [
      [t`$\ce{MnO4-(aq)}$`, "deep purple"],
      [t`$\ce{MnO4^2-(aq)}$`, "dark green"],
      [t`$\ce{MnO2(s)}$`, "brown-black"],
      [t`$\ce{Mn^2+(aq)}$`, "very pale pink"],
    ],
    extraRight: ["orange"],
    explanation: "Orange is dichromate(VI); no common manganese species is orange.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Complete the sentences about manganate(VII) as an oxidising agent.",
    template: "In dilute sulfuric acid, manganate(VII) is reduced to {{blank:a}}, gaining {{blank:b}} electrons per manganese. In neutral or alkaline solution it is reduced to {{blank:c}}, gaining {{blank:d}} electrons.",
    blanks: [
      { id: "a", accepted: ["Mn²⁺"], choices: ["Mn²⁺", "MnO₂", "MnO₄²⁻", "Mn"] },
      { id: "b", accepted: ["five"], choices: ["one", "three", "five", "seven"] },
      { id: "c", accepted: ["MnO₂"], choices: ["Mn²⁺", "MnO₂", "MnO₄²⁻", "Mn"] },
      { id: "d", accepted: ["three"], choices: ["one", "three", "five", "seven"] },
    ],
    hints: ["Count the change in oxidation state: +7 to +2, or +7 to +4."],
    explanation: "+7 → +2 is five electrons (acid); +7 → +4 is three electrons (neutral or alkaline, brown-black MnO₂).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the type of redox reaction in which manganate(VI) forms manganate(VII) and manganese(IV) oxide.",
    accepted: ["disproportionation", "disproportionation reaction", "disproportionation (redox)"],
    wrong: ["comproportionation", "displacement"],
    explanation: "One species is both oxidised and reduced: disproportionation.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "State and explain two uses of manganese or its compounds.",
    points: [
      "Steel: manganese removes oxygen and sulfur from molten iron (deoxidiser/desulfuriser) or manganese steel is very hard and wear-resistant (crushers, excavator teeth, rail points)",
      "Dry cells: MnO₂ is the positive-electrode material, reduced as the cell discharges",
      "A correct explanation linked to a property for one use (for example, MnO₂ is an oxidising agent that accepts electrons; or KMnO₄ is an oxidising agent used to disinfect or treat water)",
    ],
    modelAnswer: "Manganese is added to steel: it removes oxygen and sulfur from the molten iron, and high-manganese steels are very hard and resist wear, so they are used for rock crushers. Manganese(IV) oxide is used in dry cells, where it acts as the oxidising agent at the positive electrode, accepting electrons as the cell discharges.",
    hints: ["Think of steelworks and torch batteries."],
    explanation: "Uses: steel making, dry cells, KMnO₄ in water treatment.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Construct the equation for the reduction of manganate(VII) in neutral solution to manganese(IV) oxide, and use it with the half-equation for iodide (2I⁻ → I₂ + 2e⁻) to give the overall equation. State what is seen.",
    points: [
      t`$\ce{MnO4- + 2H2O + 3e- -> MnO2 + 4OH-}$`,
      "Electrons balanced: 2MnO₄⁻ (6 e⁻ gained) with 6I⁻ (6 e⁻ lost)",
      t`$\ce{2MnO4- + 4H2O + 6I- -> 2MnO2 + 8OH- + 3I2}$`,
      "Purple colour disappears; brown-black precipitate (MnO₂) and a brown solution (iodine)",
    ],
    modelAnswer: "MnO₄⁻ + 2H₂O + 3e⁻ → MnO₂ + 4OH⁻. Doubling this and tripling 2I⁻ → I₂ + 2e⁻ balances six electrons: 2MnO₄⁻ + 4H₂O + 6I⁻ → 2MnO₂ + 8OH⁻ + 3I₂ (O 12, H 8 and charge −8 on each side). The purple solution gives a brown-black precipitate of MnO₂ and the solution turns brown with iodine.",
    hints: ["Multiply the half-equations so that the electrons cancel."],
    explanation: "Neutral solution: 3 electrons per manganese, MnO₂ precipitate.",
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why manganate(VI) is stable in strongly alkaline solution but disproportionates when the solution is neutralised.",
    points: [
      "Disproportionation: 3MnO₄²⁻ + 2H₂O ⇌ 2MnO₄⁻ + MnO₂ + 4OH⁻ (or the acid version consuming H⁺)",
      "Hydroxide ions are a product (or H⁺ a reactant), so a high [OH⁻] moves the position to the left",
      "Neutralising removes OH⁻ (or adding acid supplies H⁺), so the position moves to the right and manganate(VI) disproportionates",
    ],
    modelAnswer: "In water manganate(VI) disproportionates: 3MnO₄²⁻ + 2H₂O ⇌ 2MnO₄⁻ + MnO₂ + 4OH⁻. Hydroxide ions are a product, so in strongly alkaline solution the position of equilibrium lies to the left and manganate(VI) is stable. Neutralising removes OH⁻ ions (in acid, H⁺ is a reactant), so the position moves to the right: the solution turns purple and MnO₂ precipitates.",
    hints: ["Where do OH⁻ ions appear in the equation?"],
    explanation: "Le Chatelier's principle applied to a redox equilibrium.",
  });
  {
    const nOx = molesFromSolution(50.0, 0.100);
    const nMn7 = molesFromSolution(26.80, 0.0200);
    const excess = (nMn7 * 5) / 2;
    const reacted = nOx - excess;
    const mass = reacted * M_MnO2;
    const pct = (mass / 0.45) * 100;
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: t`Tatenda analysed a sample of pyrolusite. She warmed 0.450 g of the powdered ore with 50.0 cm³ of 0.100 mol dm⁻³ sodium ethanedioate (an excess) and dilute sulfuric acid until all the solid had reacted: $\ce{MnO2 + C2O4^2- + 4H+ -> Mn^2+ + 2CO2 + 2H2O}$. She then titrated the excess ethanedioate, at about 60 °C, with 0.0200 mol dm⁻³ potassium manganate(VII): $\ce{2MnO4- + 5C2O4^2- + 16H+ -> 2Mn^2+ + 10CO2 + 8H2O}$. The mean titre was 26.80 cm³. (Ar: Mn 54.9, O 16.0)`,
      parts: [
        P.num({ label: "(a)", stem: "Calculate the amount of ethanedioate added, in mol.", value: nOx, unit: "mol", explanation: `0.0500 × 0.100 = ${sciStr(nOx, 3)} mol.` }),
        P.num({ label: "(b)", stem: "Calculate the amount of manganate(VII) in the mean titre, in mol.", value: nMn7, unit: "mol", explanation: `0.02680 × 0.0200 = ${sciStr(nMn7, 3)} mol.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the amount of excess ethanedioate, in mol.", value: excess, unit: "mol", wrong: [sciStr(nMn7 * 2 / 5, 3)], explanation: `5/2 × ${sciStr(nMn7, 3)} = ${sciStr(excess, 3)} mol (2 MnO₄⁻ : 5 C₂O₄²⁻). Using 2/5 gives ${sciStr(nMn7 * 2 / 5, 3)}.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the mass of MnO₂ in the sample, in g, to three significant figures.", value: mass, sf: 3, unit: "g", wrong: [sfStr(excess * M_MnO2, 3)], explanation: `MnO₂ reacted with ${sciStr(nOx, 3)} − ${sciStr(excess, 3)} = ${sciStr(reacted, 3)} mol ethanedioate, so n(MnO₂) = ${sciStr(reacted, 3)} mol (1 : 1); mass = ${sciStr(reacted, 3)} × ${dpStr(M_MnO2, 1)} = ${sfStr(mass, 3)} g. Using the excess instead of the amount reacted gives ${sfStr(excess * M_MnO2, 3)} g.` }),
        P.num({ label: "(e)", stem: "Calculate the percentage by mass of MnO₂ in the ore, to three significant figures.", value: pct, sf: 3, unit: "%", explanation: `${sfStr(mass, 3)} ÷ 0.450 × 100 = ${sfStr(pct, 3)}%.` }),
        P.mcq({ label: "(f)", stem: "What is the colour change at the end-point of the titration?", options: [
          ["colourless to pale pink", "Correct: the first excess of purple MnO₄⁻ shows as a permanent pale pink."],
          ["pale pink to colourless", "That is the reverse: the manganate(VII) is in the burette, not the flask."],
          ["orange to green", "That is dichromate(VI) being reduced."],
          ["purple to brown", "A brown precipitate means too little acid was added."],
        ], answer: "A", explanation: "Manganate(VII) is self-indicating." }),
        P.manual({ label: "(g)", marks: 3, stem: "Suggest why an excess of ethanedioate is used, why the titration is carried out at about 60 °C, and why a brown precipitate during the titration would make the result unreliable.", points: ["The excess makes sure that all the MnO₂ reacts (the amount left over can then be measured)", "The reaction of manganate(VII) with ethanedioate is slow at room temperature (it is catalysed by the Mn²⁺ formed), so warming makes the end-point sharp", "A brown precipitate is MnO₂ (too little acid): manganate(VII) gains 3 rather than 5 electrons, so the titre no longer fits the 2 : 5 ratio"], modelAnswer: "An excess of ethanedioate makes sure that every bit of MnO₂ reacts; the amount left over is then found by titration. The reaction is slow at room temperature until some Mn²⁺ (an autocatalyst) has formed, so it is warmed to about 60 °C to give a sharp end-point. A brown precipitate of MnO₂ shows there is not enough acid; manganate(VII) is then reduced only to +4, so the volume used does not match the 2 : 5 equation." }),
        P.tf({ label: "(h)", stem: "In the first reaction, manganese(IV) oxide acts as an oxidising agent.", answer: true, explanation: "True: Mn +4 → +2 while carbon in C₂O₄²⁻ is oxidised from +3 to +4." }),
      ],
      hints: ["This is a back titration: find what was left over, then subtract.", "2 MnO₄⁻ react with 5 C₂O₄²⁻."],
      explanation: `n(MnO₂) = ${sciStr(nOx, 3)} − ${sciStr(excess, 3)} = ${sciStr(reacted, 3)} mol; ${sfStr(pct, 3)}% MnO₂.`,
    });
  }
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true,
    stem: "Nyasha carried out these reactions in a fume cupboard, wearing eye protection.\n\n| step | procedure | observation |\n|---|---|---|\n| 1 | black solid **A** fused with potassium hydroxide and potassium nitrate, then dissolved in a little water | dark green solution **B** |\n| 2 | dilute sulfuric acid added to **B** | purple solution **C** and a brown-black precipitate (**A** again) |\n| 3 | **A** warmed with concentrated hydrochloric acid | green-yellow gas **D**; very pale pink solution |",
    parts: [
      P.short({ label: "(a)", stem: "Give the formula of **A**.", accepted: ["MnO2", "MnO₂"], normalise: ["trim", "lowercase", "remove_whitespace"], wrong: ["KMnO4"], explanation: "Manganese(IV) oxide." }),
      P.short({ label: "(b)", stem: "Give the formula of the green ion in **B**. (Type it as, for example, SO42-.)", accepted: ["MnO4 2-", "MnO42-", "MnO4^2-", "MnO₄²⁻", "MnO4(2-)"], normalise: ["trim", "lowercase", "remove_whitespace"], wrong: ["MnO4-"], explanation: "Manganate(VI)." }),
      P.manual({ label: "(c)", marks: 2, stem: "Construct the ionic equation for step 2 and name this type of reaction.", points: [t`$\ce{3MnO4^2- + 4H+ -> 2MnO4- + MnO2 + 2H2O}$`, "Disproportionation (manganese +6 is both oxidised to +7 and reduced to +4)"], modelAnswer: "3MnO₄²⁻ + 4H⁺ → 2MnO₄⁻ + MnO₂ + 2H₂O; disproportionation." }),
      P.short({ label: "(d)", stem: "Identify gas **D**.", accepted: ["chlorine", "Cl2", "Cl₂", "chlorine gas"], wrong: ["hydrogen chloride"], explanation: "Chloride is oxidised to chlorine." }),
      P.mcq({ label: "(e)", stem: "What is the role of **A** in step 3?", options: [
        ["oxidising agent", "Correct: Mn +4 → +2; chloride is oxidised."],
        ["reducing agent", "**A** is reduced, so it is the oxidising agent."],
        ["catalyst", "**A** is used up; it is a catalyst only for H₂O₂ decomposition."],
        ["dehydrating agent", "No water is removed from the HCl."],
      ], answer: "A", explanation: "MnO₂ + 4HCl → MnCl₂ + Cl₂ + 2H₂O." }),
      P.num({ label: "(f)", stem: "Give the oxidation state of manganese in the pale pink species formed in step 3.", value: 2, wrong: [4], explanation: "Mn²⁺: +2." }),
      P.tf({ label: "(g)", stem: "Purple solution **C** would be decolorised by acidified iron(II) sulfate.", answer: true, explanation: "True: MnO₄⁻ oxidises Fe²⁺ (E⦵cell = +0.75 V) and is reduced to almost colourless Mn²⁺." }),
    ],
    hints: ["Green, purple and brown-black are three different manganese oxidation states."],
    explanation: "A = MnO₂; B = MnO₄²⁻; C = MnO₄⁻; D = Cl₂.",
  });
  b.card("FACT", "Manganese species and colours", "Mn²⁺ very pale pink (+2); MnO₂ brown-black (+4); MnO₄²⁻ dark green (+6); MnO₄⁻ deep purple (+7).");
  b.card("FORMULA", "Manganate(VII) in acid", "MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O (purple → colourless), E⦵ = +1.52 V.");
  b.card("FORMULA", "Manganate(VII) in neutral or alkaline solution", "MnO₄⁻ + 2H₂O + 3e⁻ → MnO₂ + 4OH⁻ (brown-black precipitate).");
  b.card("FORMULA", "Disproportionation of manganate(VI)", "3MnO₄²⁻ + 4H⁺ → 2MnO₄⁻ + MnO₂ + 2H₂O (green → purple + brown-black solid).");
  b.card("CONCEPT", "Why acidify KMnO₄ with H₂SO₄, not HCl?", "MnO₄⁻ oxidises Cl⁻ to Cl₂ (E⦵cell = +0.16 V), so the titre would be too large; HNO₃ is itself an oxidant.");
  b.card("FACT", "MnO₂ as catalyst and oxidant", "Catalyses 2H₂O₂ → 2H₂O + O₂; with warm concentrated HCl: MnO₂ + 4HCl → MnCl₂ + Cl₂ + 2H₂O.");
  b.card("FACT", "Uses of manganese", "Steel (deoxidiser and desulfuriser; hard manganese steels); MnO₂ in dry cells; KMnO₄ in water treatment.");
  b.card("CONCEPT", "Most stable state of manganese", "+2 (Mn²⁺, d⁵ half-filled) in acid solution; Mn³⁺, MnO₄²⁻ and MnO₄⁻ are oxidising agents.");
  b.card("DEFINITION", "Pyrolusite", "The main ore of manganese, mostly manganese(IV) oxide, MnO₂.");
});
