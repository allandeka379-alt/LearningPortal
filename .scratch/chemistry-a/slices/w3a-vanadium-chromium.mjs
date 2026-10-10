// W3a: achem.transition.vanadium-chromium (ZIMSEC only, Form 6; tagged to ZIMSEC automatically).
import { concept, P, t, chk, ecell, Mr, molesFromSolution, sfStr, dpStr, sciStr } from "../lib.mjs";

const E = { VO2p: 1.0, VO2: 0.34, V3: -0.26, Zn: -0.76, Fe3: 0.77, SO2: 0.17, Sn: -0.14, Cr3Cr2: -0.41, Cr2O7: 1.33, MnO4: 1.52 };

concept("achem.transition.vanadium-chromium", { file: "transition/vanadium-chromium", keyPrefix: "transition.vanadium-chromium" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: t`What is the colour of the $\ce{VO^2+}$ ion in aqueous solution?`,
    options: [
      ["blue", "Correct: oxovanadium(IV) is blue."],
      ["yellow", "Yellow is VO₂⁺, vanadium(V)."],
      ["green", "Green is V³⁺, vanadium(III)."],
      ["violet", "Violet is V²⁺, vanadium(II)."],
    ],
    answer: "A",
    explanation: "V(V) VO₂⁺ yellow; V(IV) VO²⁺ blue; V(III) V³⁺ green; V(II) V²⁺ violet.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: t`What is the oxidation state of vanadium in $\ce{VO2+}$?`,
    options: [
      ["+5", "Correct: x + 2(−2) = +1, so x = +5."],
      ["+4", "+4 is vanadium in VO²⁺."],
      ["+3", "+3 is vanadium in V³⁺."],
      ["+1", "+1 is the overall charge of the ion, not the oxidation state of vanadium."],
    ],
    answer: "A",
    explanation: "Oxygen is −2: x − 4 = +1, x = +5.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Dilute sulfuric acid is added to yellow aqueous potassium chromate(VI). What is seen?",
    options: [
      ["The solution turns orange.", "Correct: 2CrO₄²⁻ + 2H⁺ ⇌ Cr₂O₇²⁻ + H₂O moves to the right."],
      ["The solution turns green.", "Green means chromium(III); no reducing agent is present."],
      ["A grey-green precipitate forms.", "That is chromium(III) hydroxide, formed from Cr³⁺ and alkali."],
      ["The solution becomes colourless.", "Chromium(VI) species are coloured (yellow or orange)."],
    ],
    answer: "A",
    explanation: "Acid converts yellow chromate(VI) into orange dichromate(VI); alkali reverses it.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: t`Which statements about the equilibrium $\ce{2CrO4^2- + 2H+ <=> Cr2O7^2- + H2O}$ are correct?` + "\n\n1. Chromium has the same oxidation state on both sides.\n2. Adding aqueous sodium hydroxide turns the solution yellow.\n3. It is a redox reaction in which chromium is oxidised.",
    options: [
      ["1 and 2 only", "Correct: chromium stays +6, so statement 3 is false."],
      ["1, 2 and 3", "Statement 3 is false: no oxidation states change."],
      ["2 and 3 only", "Statement 1 is true and statement 3 is false."],
      ["1 only", "Statement 2 is also true: OH⁻ removes H⁺, so the position moves left."],
    ],
    answer: "A",
    hints: ["Work out chromium's oxidation state in each ion."],
    explanation: "Cr is +6 in CrO₄²⁻ and Cr₂O₇²⁻: an acid-base equilibrium. Alkali removes H⁺ and gives yellow chromate(VI).",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: `Data (E⦵ / V): VO₂⁺/VO²⁺ +1.00; VO²⁺/V³⁺ +0.34; V³⁺/V²⁺ −0.26; Fe³⁺/Fe²⁺ +0.77; SO₄²⁻/SO₂ +0.17; Sn²⁺/Sn −0.14; Zn²⁺/Zn −0.76. Which reducing agent can reduce vanadium(V) all the way to vanadium(II)?`,
    options: [
      ["zinc", "Correct: every step has a positive E⦵cell, the last being −0.26 − (−0.76) = +0.50 V."],
      ["iron(II) ions", "Fe²⁺ stops at VO²⁺: for VO²⁺ → V³⁺, 0.34 − 0.77 is negative."],
      ["sulfur dioxide", "SO₂ stops at V³⁺: for V³⁺ → V²⁺, −0.26 − 0.17 is negative."],
      ["tin", "Tin stops at V³⁺: for V³⁺ → V²⁺, −0.26 − (−0.14) = −0.12 V."],
    ],
    answer: "A",
    hints: ["Check the last step, V³⁺ → V²⁺, for each reducing agent."],
    explanation: "Only a reducing agent with E⦵ more negative than −0.26 V can produce V²⁺; of these only zinc (−0.76 V) qualifies.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Aqueous sodium hydroxide is added drop by drop, then in excess, to aqueous chromium(III) sulfate. What is seen?",
    options: [
      ["a grey-green precipitate that dissolves in excess to give a dark green solution", "Correct: Cr(OH)₃ is amphoteric and forms [Cr(OH)₆]³⁻."],
      ["a grey-green precipitate that does not dissolve in excess alkali", "This would be true for iron(II) or nickel(II) hydroxides, not the amphoteric Cr(OH)₃."],
      ["a yellow solution at once, without any precipitate", "Yellow chromate(VI) needs an oxidising agent such as H₂O₂ as well."],
      ["an orange precipitate that turns green on standing", "No orange chromium(III) compound forms here."],
    ],
    answer: "A",
    hints: ["Chromium(III) hydroxide is amphoteric."],
    explanation: "Cr³⁺ + 3OH⁻ → Cr(OH)₃ (grey-green); Cr(OH)₃ + 3OH⁻ → [Cr(OH)₆]³⁻ (dark green).",
  });
  b.mcq({
    d: 3, skill: "RECALL",
    stem: "Which of these are uses of vanadium, chromium or their compounds?\n\n1. Vanadium(V) oxide as the catalyst in the Contact process.\n2. Chromium in stainless steel.\n3. Vanadium for galvanising iron sheets.",
    options: [
      ["1 and 2 only", "Correct: iron is galvanised with zinc, not vanadium."],
      ["1, 2 and 3", "Statement 3 is false: galvanising uses zinc."],
      ["2 and 3 only", "Statement 1 is true and statement 3 is false."],
      ["1 only", "Statement 2 is also true: chromium makes steel stainless."],
    ],
    answer: "A",
    hints: ["Which metal is used to galvanise iron?"],
    explanation: "V₂O₅ catalyst (Contact process), vanadium steels for tools and springs; chromium in stainless steel and chrome plating.",
  });
  b.mcq({
    d: 4, skill: "UNDERSTANDING",
    stem: "Sulfur dioxide is tested with filter paper soaked in acidified potassium dichromate(VI). Which statements are correct?\n\n1. The paper turns from orange to green.\n2. Chromium is reduced from +6 to +3.\n3. Sulfur dioxide is oxidised to sulfate ions.",
    options: [
      ["1, 2 and 3", "Correct: Cr₂O₇²⁻ + 3SO₂ + 2H⁺ → 2Cr³⁺ + 3SO₄²⁻ + H₂O."],
      ["1 and 2 only", "Statement 3 is also true: sulfur goes from +4 to +6."],
      ["2 and 3 only", "Statement 1 is also true: orange dichromate(VI) becomes green Cr³⁺."],
      ["1 only", "Statements 2 and 3 describe the redox change that causes the colour change."],
    ],
    answer: "A",
    hints: ["Find the oxidation state of sulfur in SO₂ and in SO₄²⁻."],
    explanation: "SO₂ (S +4) reduces dichromate(VI) (Cr +6) to Cr³⁺ and is itself oxidised to SO₄²⁻ (S +6).",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: t`What is the oxidation state of chromium in $\ce{Cr2O7^2-}$? (Type a number.)`,
    value: 6,
    wrong: [7],
    explanation: "2x + 7(−2) = −2, so 2x = 12 and x = +6.",
  });
  {
    const e = ecell(E.Cr3Cr2, E.Zn);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "Data (E⦵ / V): Cr³⁺ + e⁻ ⇌ Cr²⁺ −0.41; Zn²⁺ + 2e⁻ ⇌ Zn −0.76. Calculate E⦵cell, in V, for the reduction of Cr³⁺ to Cr²⁺ by zinc, to two decimal places, and so decide whether it is feasible.",
      value: e, dp: 2, unit: "V",
      wrong: [dpStr(ecell(E.Zn, E.Cr3Cr2), 2)],
      hints: ["E⦵cell = E⦵(species reduced) − E⦵(species oxidised)."],
      explanation: `1. Cr³⁺ is reduced; zinc is oxidised.\n2. E⦵cell = −0.41 − (−0.76) = +${dpStr(e, 2)} V.\n3. Positive, so feasible: zinc and acid turn green Cr³⁺ into blue Cr²⁺ (in the absence of air). Subtracting the other way gives ${dpStr(ecell(E.Zn, E.Cr3Cr2), 2)} V.`,
    });
  }
  {
    const M = chk(Mr("FeCr2O4"), 223.8);
    const kg = 2500 * 0.4 * (2 * 52.0) / M;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: "A sample of chromite ore from the Great Dyke contains 40.0% by mass of FeCr₂O₄. Calculate the maximum mass of chromium, in kg, that can be obtained from 2.50 tonnes of this ore, to three significant figures. (Ar: O 16.0, Cr 52.0, Fe 55.8)",
      value: kg, sf: 3, unit: "kg",
      wrong: [sfStr(2500 * 0.4 * 52.0 / M, 3), sfStr(2500 * (2 * 52.0) / M, 3)],
      hints: ["Find the mass of FeCr₂O₄ first; each formula unit has two Cr atoms."],
      explanation: `1. Mass of FeCr₂O₄ = 0.400 × 2500 kg = 1000 kg.\n2. Mr(FeCr₂O₄) = 55.8 + 2(52.0) + 4(16.0) = ${dpStr(M, 1)}; fraction of Cr = 104.0 ÷ ${dpStr(M, 1)}.\n3. Mass of Cr = 1000 × 104.0 ÷ ${dpStr(M, 1)} = ${sfStr(kg, 3)} kg. Using one Cr per formula gives ${sfStr(2500 * 0.4 * 52.0 / M, 3)} kg; ignoring the 40.0% gives ${sfStr(2500 * (2 * 52.0) / M, 3)} kg.`,
    });
  }
  {
    const nCr = molesFromSolution(22.80, 0.0200);
    const nFe = 6 * nCr;
    const c = nFe / 0.025;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`25.0 cm³ of an acidified iron(II) solution needed 22.80 cm³ of 0.0200 mol dm⁻³ potassium dichromate(VI) for complete reaction: $\ce{Cr2O7^2- + 14H+ + 6Fe^2+ -> 2Cr^3+ + 6Fe^3+ + 7H2O}$. Calculate the concentration of iron(II), in mol dm⁻³, to three significant figures.`,
      value: c, sf: 3, unit: "mol/dm³",
      wrong: [sfStr(nCr / 0.025, 3)],
      hints: ["One dichromate(VI) ion reacts with six Fe²⁺ ions."],
      explanation: `1. n(Cr₂O₇²⁻) = 22.80 ÷ 1000 × 0.0200 = ${sciStr(nCr, 3)} mol.\n2. n(Fe²⁺) = 6 × ${sciStr(nCr, 3)} = ${sciStr(nFe, 3)} mol.\n3. c = ${sciStr(nFe, 3)} ÷ 0.0250 = ${sfStr(c, 3)} mol dm⁻³. Ignoring the 1 : 6 ratio gives ${sfStr(nCr / 0.025, 3)}.`,
    });
  }
  {
    const nMn = molesFromSolution(24.0, 0.0200);
    const nV = (nMn * 5) / 3;
    const c = nV / 0.020;
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: "A solution of ammonium vanadate(V) was reduced completely to vanadium(II) with zinc and acid. 20.0 cm³ of the violet solution was titrated with 0.0200 mol dm⁻³ potassium manganate(VII), which oxidised all the vanadium back to vanadium(V); 24.00 cm³ was needed. Calculate the concentration of vanadium, in mol dm⁻³, to three significant figures.",
      value: c, sf: 3, unit: "mol/dm³",
      wrong: [sfStr((nMn * 5) / 0.02, 3), sfStr(nMn / 0.02, 3)],
      hints: ["Each vanadium loses three electrons (+2 to +5); each MnO₄⁻ gains five."],
      explanation: `1. n(MnO₄⁻) = 24.00 ÷ 1000 × 0.0200 = ${sciStr(nMn, 3)} mol, accepting 5 × that = ${sciStr(nMn * 5, 3)} mol of electrons.\n2. Each V²⁺ → V(V) gives 3 electrons, so n(V) = ${sciStr(nMn * 5, 3)} ÷ 3 = ${sciStr(nV, 3)} mol.\n3. c = ${sciStr(nV, 3)} ÷ 0.0200 = ${sfStr(c, 3)} mol dm⁻³. Assuming one electron per vanadium gives ${sfStr((nMn * 5) / 0.02, 3)}.`,
    });
  }
  b.tf({
    d: 2, skill: "RECALL",
    stem: "Chromium(VI) compounds are much less toxic than chromium(III) compounds.",
    answer: false,
    explanation: "False. Chromium(VI) compounds (chromates, dichromates) are toxic and carcinogenic; chromium(III) compounds are much less harmful.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each vanadium ion with its colour in aqueous solution.",
    pairs: [
      [t`$\ce{VO2+}$`, "yellow"],
      [t`$\ce{VO^2+}$`, "blue"],
      [t`$\ce{V^3+}$`, "green"],
      [t`$\ce{V^2+}$`, "violet"],
    ],
    extraRight: ["orange"],
    explanation: "Orange belongs to dichromate(VI), not to any vanadium ion.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Complete the sentences about the vanadium catalyst in the Contact process.",
    template: "Vanadium(V) oxide oxidises SO₂ to SO₃ and is reduced to V₂O₄, in which vanadium has oxidation state {{blank:a}}. Oxygen then re-oxidises V₂O₄ to V₂O₅, in which vanadium is {{blank:b}}. The catalyst works because vanadium can {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["+4"], choices: ["+3", "+4", "+5", "+6"] },
      { id: "b", accepted: ["+5"], choices: ["+3", "+4", "+5", "+6"] },
      { id: "c", accepted: ["change oxidation state"], choices: ["change oxidation state", "form complexes with SO₂", "absorb visible light"] },
    ],
    hints: ["Oxygen is −2 in both oxides."],
    explanation: "V₂O₄: 2x = 8, x = +4. V₂O₅: 2x = 10, x = +5. Variable oxidation states allow it to act as an intermediate.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the ore of chromium mined on Zimbabwe's Great Dyke.",
    accepted: ["chromite", "chrome ore", "chromite ore", "iron chromite"],
    wrong: ["haematite"],
    explanation: "Chromite, FeCr₂O₄, is smelted to ferrochrome for stainless steel.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Zinc granules and dilute sulfuric acid are added to a solution of ammonium vanadate(V) in acid. Describe the sequence of colours seen and explain why the solution looks green at an early stage.",
    points: [
      "Colours: yellow, then green, then blue, then green, then violet",
      "The first green is a mixture of yellow VO₂⁺ (+5) and blue VO²⁺ (+4)",
      "The final stages are green V³⁺ (+3) and violet V²⁺ (+2), as zinc reduces each state in turn",
    ],
    modelAnswer: "The solution goes yellow → green → blue → green → violet. The first green appears because yellow VO₂⁺ and blue VO²⁺ are both present while vanadium(V) is being reduced to vanadium(IV). Zinc then reduces VO²⁺ to green V³⁺ and finally to violet V²⁺.",
    hints: ["There are two green stages; only one is a single ion."],
    explanation: "Zinc reduces vanadium(V) step by step to vanadium(II).",
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain, with equations, why chromium(III) hydroxide is described as amphoteric.",
    points: [
      "It reacts with (dissolves in) acids",
      t`$\ce{Cr(OH)3 + 3H+ -> Cr^3+ + 3H2O}$`,
      "It also reacts with (dissolves in) excess aqueous alkali, giving a dark green solution",
      t`$\ce{Cr(OH)3 + 3OH- -> [Cr(OH)6]^3-}$`,
    ],
    modelAnswer: "An amphoteric hydroxide reacts with both acids and bases. Chromium(III) hydroxide dissolves in acid, Cr(OH)₃ + 3H⁺ → Cr³⁺ + 3H₂O, and also in excess sodium hydroxide, Cr(OH)₃ + 3OH⁻ → [Cr(OH)₆]³⁻, giving a dark green solution.",
    hints: ["Show one reaction with acid and one with alkali."],
    explanation: "Amphoteric: reacts with both H⁺ and OH⁻.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Give two uses of chromium metal and explain one precaution needed when using potassium dichromate(VI) in a school laboratory.",
    points: [
      "Stainless steel (corrosion resistance from a protective chromium(III) oxide layer)",
      "Chrome plating (hard, shiny, protective coating) or ferrochrome / alloys",
      "Dichromate(VI) is toxic and carcinogenic: wear gloves and eye protection, avoid the dust, and dispose of residues as instructed (not down the sink)",
    ],
    modelAnswer: "Chromium is alloyed with iron to make stainless steel, which resists corrosion because of a thin chromium(III) oxide layer, and it is electroplated onto steel as chrome plating. Potassium dichromate(VI) is a toxic and carcinogenic chromium(VI) compound, so gloves and eye protection must be worn and residues collected for safe disposal.",
    hints: ["Think of kitchen equipment and car parts."],
    explanation: "Chromium resists corrosion; chromium(VI) is hazardous.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true,
    stem: "Farai carried out these tests on solution **R**, aqueous potassium chromate(VI). Eye protection and gloves were worn.\n\n| test | observation |\n|---|---|\n| 1: add dilute sulfuric acid | yellow solution turns orange |\n| 2: add aqueous sodium hydroxide to the product of test 1 | orange solution turns yellow |\n| 3: add ethanol to the product of test 1 and warm | orange solution turns green |",
    parts: [
      P.short({ label: "(a)", stem: "Give the formula of the orange ion formed in test 1. (Type it as, for example, MnO4-.)", accepted: ["Cr2O7 2-", "Cr2O72-", "Cr2O7^2-", "Cr₂O₇²⁻", "Cr2O7(2-)"], normalise: ["trim", "lowercase", "remove_whitespace"], wrong: ["CrO42-"], explanation: "Dichromate(VI), Cr₂O₇²⁻." }),
      P.manual({ label: "(b)", marks: 2, stem: "Write the equation for the equilibrium between the ions in tests 1 and 2, and explain the colour change in test 2.", points: [t`$\ce{2CrO4^2- + 2H+ <=> Cr2O7^2- + H2O}$`, "Hydroxide ions remove H⁺ (forming water), so the position of equilibrium moves to the left and yellow chromate(VI) re-forms"], modelAnswer: "2CrO₄²⁻ + 2H⁺ ⇌ Cr₂O₇²⁻ + H₂O. Adding OH⁻ removes H⁺, so the equilibrium moves left, giving yellow chromate(VI)." }),
      P.mcq({ label: "(c)", stem: "What type of reaction occurs in test 3?", options: [
        ["redox: dichromate(VI) oxidises the ethanol", "Correct: Cr(+6) is reduced to green Cr³⁺."],
        ["acid-base: ethanol removes hydrogen ions", "Ethanol is not a base, and the green colour shows Cr³⁺."],
        ["ligand exchange: ethanol replaces oxide ions", "The colour change comes from a change of oxidation state."],
        ["precipitation of chromium(III) hydroxide", "No precipitate forms in acid solution."],
      ], answer: "A", explanation: "Ethanol is oxidised (to ethanal or ethanoic acid); dichromate(VI) is reduced to Cr³⁺ (green)." }),
      P.num({ label: "(d)", stem: "Give the oxidation state of chromium in the green species formed in test 3.", value: 3, wrong: [6], explanation: "Cr³⁺: +3." }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain why the changes in tests 1 and 2 are not redox reactions, but the change in test 3 is.", points: ["Tests 1 and 2 involve no change of oxidation state (Cr stays +6), only a shift of an acid-base equilibrium", "Test 3 is a reduction of Cr(+6) to Cr(+3), giving a different species, Cr³⁺, which is green"], modelAnswer: "In tests 1 and 2 chromium stays +6; only the position of the chromate-dichromate equilibrium moves, so the colours are yellow or orange. In test 3 ethanol reduces chromium(VI) to chromium(III), a different oxidation state with a green colour." }),
      P.tf({ label: "(f)", stem: "If the green solution from test 3 is neutralised and a little aqueous sodium hydroxide is added, a grey-green precipitate forms.", answer: true, explanation: "True: Cr³⁺ + 3OH⁻ → Cr(OH)₃, a grey-green precipitate." }),
    ],
    hints: ["Work out the oxidation state of chromium in each species."],
    explanation: "Tests 1-2: acid-base equilibrium of Cr(VI). Test 3: redox, Cr(VI) → Cr(III).",
  });
  {
    const e1 = ecell(E.VO2p, E.SO2);
    const e2 = ecell(E.VO2, E.SO2);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: "Data (E⦵ / V): VO₂⁺ + 2H⁺ + e⁻ ⇌ VO²⁺ + H₂O +1.00; VO²⁺ + 2H⁺ + e⁻ ⇌ V³⁺ + H₂O +0.34; V³⁺ + e⁻ ⇌ V²⁺ −0.26; SO₄²⁻ + 4H⁺ + 2e⁻ ⇌ SO₂ + 2H₂O +0.17. Sulfur dioxide is bubbled through an acidified solution of vanadium(V) in a fume cupboard.",
      parts: [
        P.fib({ label: "(a)", stem: "Give the oxidation state of vanadium in each species.", template: "VO²⁺: {{blank:a}}; V³⁺: {{blank:b}}", blanks: [{ id: "a", accepted: ["+4", "4"], wrong: "+2" }, { id: "b", accepted: ["+3", "3"], wrong: "+2" }], explanation: "VO²⁺: x − 2 = +2, x = +4. V³⁺: +3." }),
        P.num({ label: "(b)", stem: "Calculate E⦵cell, in V, for the reduction of VO₂⁺ to VO²⁺ by SO₂.", value: e1, dp: 2, unit: "V", explanation: `1.00 − 0.17 = +${dpStr(e1, 2)} V.` }),
        P.num({ label: "(c)", stem: "Calculate E⦵cell, in V, for the reduction of VO²⁺ to V³⁺ by SO₂.", value: e2, dp: 2, unit: "V", wrong: [dpStr(-e2, 2)], explanation: `0.34 − 0.17 = +${dpStr(e2, 2)} V.` }),
        P.mcq({ label: "(d)", stem: "What is the final vanadium species?", options: [
          [t`$\ce{V^3+}$`, "Correct: reduction of V³⁺ to V²⁺ by SO₂ has E⦵cell = −0.26 − 0.17 = −0.43 V."],
          [t`$\ce{V^2+}$`, "That step has a negative E⦵cell with SO₂, so it is not feasible."],
          [t`$\ce{VO^2+}$`, "The VO²⁺ → V³⁺ step is feasible (+0.17 V)."],
          [t`$\ce{VO2+}$`, "VO₂⁺ is the starting species and is reduced."],
        ], answer: "A", explanation: "SO₂ reduces vanadium(V) as far as V³⁺." }),
        P.short({ label: "(e)", stem: "State the colour of the final solution.", accepted: ["green"], wrong: ["violet", "blue"], explanation: "V³⁺(aq) is green." }),
        P.manual({ label: "(f)", marks: 2, stem: "Write the equation for the reduction of VO₂⁺ to VO²⁺ by sulfur dioxide.", points: ["Correct species: VO₂⁺ and SO₂ on the left; VO²⁺ and SO₄²⁻ on the right (with H⁺/H₂O)", t`Balanced: $\ce{2VO2+ + SO2 -> 2VO^2+ + SO4^2-}$`], modelAnswer: "2VO₂⁺ + SO₂ → 2VO²⁺ + SO₄²⁻ (atoms: V 2, O 6, S 1 on each side; charge +2 on each side)." }),
        P.num({ label: "(g)", stem: "How many moles of SO₂ are needed to reduce one mole of VO₂⁺ to V³⁺?", value: 1, wrong: [2], explanation: "Each V gains 2 electrons (+5 to +3); each SO₂ loses 2 (+4 to +6): 1 : 1." }),
        P.manual({ label: "(h)", marks: 2, stem: "Vanadium(V) oxide is the catalyst in the Contact process. Write two equations to show how it works.", points: [t`$\ce{SO2 + V2O5 -> SO3 + V2O4}$`, t`$\ce{2V2O4 + O2 -> 2V2O5}$ (catalyst regenerated)`], modelAnswer: "SO₂ + V₂O₅ → SO₃ + V₂O₄, then 2V₂O₄ + O₂ → 2V₂O₅." }),
        P.tf({ label: "(i)", stem: "Vanadium steels are used for tools and springs because they are tough and resist wear.", answer: true, explanation: "True." }),
      ],
      hints: ["A step is feasible when E⦵(vanadium couple) − E⦵(SO₄²⁻/SO₂) is positive.", "Balance electrons: each SO₂ releases two."],
      explanation: `SO₂ reduces VO₂⁺ (+${dpStr(e1, 2)} V) and VO²⁺ (+${dpStr(e2, 2)} V) but not V³⁺: the final solution is green V³⁺.`,
    });
  }
  b.card("FACT", "Vanadium ions and colours", "VO₂⁺ (+5) yellow; VO²⁺ (+4) blue; V³⁺ (+3) green; V²⁺ (+2) violet.");
  b.card("FACT", "Zinc and vanadium(V)", "Zn + acid reduce V(V) to V(II): yellow → green (mixture) → blue → green → violet.");
  b.card("FORMULA", "Contact process catalyst cycle", "SO₂ + V₂O₅ → SO₃ + V₂O₄; 2V₂O₄ + O₂ → 2V₂O₅.");
  b.card("FACT", "Chromite", "FeCr₂O₄, the ore of chromium mined on the Great Dyke; smelted to ferrochrome for stainless steel.");
  b.card("FORMULA", "Chromate-dichromate equilibrium", "2CrO₄²⁻ (yellow) + 2H⁺ ⇌ Cr₂O₇²⁻ (orange) + H₂O; not redox (Cr is +6 in both).");
  b.card("FORMULA", "Dichromate(VI) half-equation", "Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O (orange → green), E⦵ = +1.33 V.");
  b.card("FACT", "Tests using acidified dichromate(VI)", "Turns green with SO₂ and with primary or secondary alcohols (warm).");
  b.card("FACT", "Chromium(III) hydroxide", "Grey-green precipitate; amphoteric: dissolves in acid (Cr³⁺) and in excess NaOH ([Cr(OH)₆]³⁻, dark green).");
  b.card("FACT", "Hazard of chromium(VI)", "Chromates and dichromates are toxic and carcinogenic: gloves, eye protection, safe disposal.");
});
