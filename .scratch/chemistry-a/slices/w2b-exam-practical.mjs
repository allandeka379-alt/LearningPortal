// W2b: both-board practical exam-format items: three QUALITATIVE_ANALYSIS questions (15 marks each; ZIMSEC Paper 4
// and Cambridge Paper 3 style) on s-block and p-block cations, anions and gases. Every observation follows the
// qualitative analysis notes of both syllabuses (see lessons/skills/qualitative-analysis.md).
import { concept, P, t, EXAM, checkExam } from "../lib.mjs";

const A = (k) => `achem.${k}`;
const QA = { skill: EXAM.QUALITATIVE_ANALYSIS.skill, secs: EXAM.QUALITATIVE_ANALYSIS.secs, examStyle: true, paper: "Paper 4 (ZIMSEC), Paper 3 (CIE)" };

/** Equation variants: with and without state symbols, with -> and →. */
const eqs = (...forms) => forms.flatMap((f) => [f, f.replace(/->/g, "→")]);

concept(A("skills.qualitative-analysis"), { file: "exam/w2b-practical", keyPrefix: "exam.w2b-practical" }, (b) => {
  // ---------------------------------------------------------------- QA1: Ca2+ / Br- and an ammonium salt
  b.struct({
    ...QA, d: 3,
    concepts: [A("skills.qualitative-analysis"), A("group17.halide-ions"), A("nitrogen-sulfur.nitrogen-ammonia")],
    stem: t`Tatenda is given two unknowns. **FA 1** is an aqueous solution of a single salt. **FA 2** is a white crystalline solid containing one cation and one anion. Wear eye protection throughout.

| Test | Observation |
|---|---|
| 1. FA 1: add aqueous sodium hydroxide, then in excess | white precipitate, insoluble in excess |
| 2. FA 1: add aqueous ammonia, then in excess | no precipitate |
| 3. FA 1: add dilute nitric acid, then aqueous silver nitrate | cream precipitate |
| 4. To the mixture from test 3, add dilute aqueous ammonia, then concentrated aqueous ammonia (fume cupboard) | precipitate partially dissolves in dilute, dissolves in concentrated ammonia |
| 5. FA 2: warm a small amount with aqueous sodium hydroxide | a gas is given off that turns damp red litmus paper blue |
| 6. FA 2: dissolve in water, add dilute hydrochloric acid, then aqueous barium chloride | white precipitate |`,
    parts: checkExam(EXAM.QUALITATIVE_ANALYSIS, [
      P.group({ label: "(a)", stem: "The cation in FA 1.", parts: [
        P.short({ label: "(i)", marks: 1, stem: "Use tests 1 and 2 to identify the cation in FA 1 (formula or name).", accepted: ["Ca2+", "Ca^2+", "Ca²⁺", "calcium", "calcium ion", "calcium ions", "calcium(II)"], wrong: ["Mg2+"], explanation: "A white precipitate with NaOH(aq) insoluble in excess, but no precipitate with NH₃(aq), fits Ca²⁺ only: Mg²⁺ also precipitates with ammonia, and Al³⁺ and Zn²⁺ dissolve in excess NaOH." }),
        P.mcq({ label: "(ii)", marks: 1, stem: t`Which reagent would distinguish a solution of $\ce{Ca^2+}$ ions from a solution of $\ce{Ba^2+}$ ions of the same concentration?`, options: [
          [t`aqueous ammonia, added in excess`, "Neither Ca²⁺ nor Ba²⁺ gives a precipitate with aqueous ammonia, so it cannot tell them apart."],
          [t`dilute sulfuric acid`, "Correct: barium sulfate is very insoluble and gives a dense white precipitate; calcium sulfate is much more soluble, so little or no precipitate forms."],
          [t`dilute nitric acid`, "Neither ion reacts visibly with dilute nitric acid."],
          [t`aqueous sodium nitrate`, "Both nitrates are soluble, so there is no visible change with either ion."],
        ], answer: "B", explanation: "Solubility of the Group 2 sulfates decreases down the group: BaSO₄ precipitates, CaSO₄ (much more soluble) gives little or none." }),
      ] }),
      P.fib({ label: "(b)", stem: "Complete the deduction about the anion in FA 1 from tests 3 and 4.", template: "The cream precipitate is silver {{blank:x}}, so the anion is the {{blank:ion}} ion. Silver iodide would instead be {{blank:col}} and insoluble in concentrated ammonia.", blanks: [
        { id: "x", accepted: ["bromide"], choices: ["chloride", "bromide", "iodide", "sulfate"] },
        { id: "ion", accepted: ["bromide"], choices: ["chloride", "bromide", "iodide", "nitrate"] },
        { id: "col", accepted: ["pale yellow"], choices: ["white", "pale yellow", "orange", "green"] },
      ], explanation: "Cream AgBr, partly soluble in dilute and soluble in concentrated ammonia: bromide. AgCl is white and dissolves in dilute ammonia; AgI is pale yellow and insoluble even in concentrated ammonia." }),
      P.short({ label: "(c)", marks: 1, stem: "Write the ionic equation, with state symbols, for the formation of the cream precipitate (type, e.g., A(aq) + B(aq) -> C(s)).", accepted: eqs("Ag+(aq) + Br-(aq) -> AgBr(s)", "Br-(aq) + Ag+(aq) -> AgBr(s)", "Ag+ + Br- -> AgBr"), wrong: ["AgNO3 + NaBr -> AgBr + NaNO3"], explanation: "Ag⁺(aq) + Br⁻(aq) → AgBr(s); the spectator ions (nitrate and calcium) are left out." }),
      P.group({ label: "(d)", stem: "FA 2.", parts: [
        P.short({ label: "(i)", marks: 1, stem: "Name the gas given off in test 5.", accepted: ["ammonia", "NH3"], wrong: ["hydrogen"], explanation: "Only ammonia, an alkaline gas, turns damp red litmus blue." }),
        P.short({ label: "(ii)", marks: 1, stem: "Write the ionic equation for the reaction in test 5 (no state symbols needed).", accepted: eqs("NH4+ + OH- -> NH3 + H2O", "NH4+(aq) + OH-(aq) -> NH3(g) + H2O(l)", "OH- + NH4+ -> NH3 + H2O"), wrong: ["NH3 + H2O -> NH4+ + OH-"], explanation: "NH₄⁺ + OH⁻ → NH₃ + H₂O: hydroxide ions remove a proton from the ammonium ion." }),
        P.short({ label: "(iii)", marks: 1, stem: "Give the formula of FA 2.", accepted: ["(NH4)2SO4", "(NH₄)₂SO₄", "ammonium sulfate", "ammonium sulphate"], wrong: ["NH4Cl"], explanation: "Ammonium ion (test 5) and sulfate (white precipitate with Ba²⁺ in acid, test 6): (NH₄)₂SO₄." }),
      ] }),
      P.manual({ label: "(e)", marks: 3, stem: "Explain why dilute nitric acid (not hydrochloric acid) is added before silver nitrate in test 3, why the barium chloride test in test 6 is carried out in acid, and why FA 2 is warmed in test 5.", points: ["Hydrochloric acid would add chloride ions, giving a white AgCl precipitate whatever the unknown anion; nitric acid also removes carbonate (or other ions) that would precipitate with Ag⁺", "Acid removes carbonate and sulfite ions, which would also give white precipitates with Ba²⁺; only BaSO₄ is insoluble in the acid", "Warming drives the (very soluble) ammonia out of solution so that it can be detected with damp litmus"], modelAnswer: "Hydrochloric acid would itself provide chloride ions and give white silver chloride, so nitric acid is used; it also destroys carbonate, which would precipitate with silver ions. The barium chloride test is done in acid because barium carbonate and barium sulfite are also white but dissolve in acid, while barium sulfate does not. Ammonia is very soluble in water, so the mixture is warmed to drive the gas off and detect it." }),
      P.manual({ label: "(f)", marks: 3, stem: "Give three deductions about FA 1 and FA 2, each linked to the observation that supports it.", points: ["FA 1 contains Ca²⁺: white ppt with NaOH insoluble in excess, but no ppt with NH₃(aq)", "FA 1 contains Br⁻: cream ppt with acidified AgNO₃, partially soluble in dilute and soluble in concentrated NH₃(aq)", "FA 2 contains NH₄⁺ (alkaline gas, ammonia, on warming with NaOH) and SO₄²⁻ (white ppt with Ba²⁺ in acid); FA 2 is ammonium sulfate"], modelAnswer: "FA 1 is calcium bromide: the cation gives a white precipitate with sodium hydroxide that does not dissolve in excess but none with ammonia (Ca²⁺), and the anion gives a cream precipitate with acidified silver nitrate that dissolves in concentrated ammonia (Br⁻). FA 2 is ammonium sulfate: warming with alkali releases ammonia (NH₄⁺) and acidified barium chloride gives a white precipitate (SO₄²⁻)." }),
    ]),
    hints: ["Which Group 2 hydroxides precipitate with ammonia and which only with sodium hydroxide?", "Compare the colours and ammonia solubilities of AgCl, AgBr and AgI."],
    explanation: "FA 1 is calcium bromide; FA 2 is ammonium sulfate.",
  });

  // ---------------------------------------------------------------- QA2: MgCO3, aluminium sulfate, sodium nitrate
  b.struct({
    ...QA, d: 4,
    concepts: [A("skills.qualitative-analysis"), A("group2.reactions-uses"), A("periodicity.oxides-chlorides")],
    stem: t`Nyasha has three white solids, **FB 1**, **FB 2** and **FB 3**. Each contains one cation and one anion. Wear eye protection throughout.

| Test | Observation |
|---|---|
| 1. FB 1: add dilute hydrochloric acid | effervescence; the gas turns limewater milky; a colourless solution forms |
| 2. Solution from test 1: add aqueous sodium hydroxide, then in excess | white precipitate, insoluble in excess |
| 3. Solution from test 1: add aqueous ammonia, then in excess | white precipitate, insoluble in excess |
| 4. FB 2 in water: add aqueous sodium hydroxide, then in excess | white precipitate, dissolves in excess to give a colourless solution |
| 5. FB 2 in water: add aqueous ammonia, then in excess | white precipitate, insoluble in excess |
| 6. FB 2 in water: add aqueous potassium iodide | no visible change |
| 7. FB 2 in water: add dilute hydrochloric acid, then aqueous barium chloride | white precipitate |
| 8. FB 3 in water: add aqueous sodium hydroxide and warm | no precipitate; no gas detected |
| 9. Add aluminium foil to the mixture from test 8 and warm | a gas is given off that turns damp red litmus paper blue |
| 10. FB 3 in water: add dilute sulfuric acid, then a few drops of acidified potassium manganate(VII) | no gas; the purple colour remains |`,
    parts: checkExam(EXAM.QUALITATIVE_ANALYSIS, [
      P.group({ label: "(a)", stem: "FB 1.", parts: [
        P.short({ label: "(i)", marks: 1, stem: "Name the gas given off in test 1.", accepted: ["carbon dioxide", "CO2"], wrong: ["hydrogen"], explanation: "Only carbon dioxide turns limewater milky (a white precipitate of calcium carbonate)." }),
        P.short({ label: "(ii)", marks: 1, stem: "Identify the cation in FB 1 (formula or name).", accepted: ["Mg2+", "Mg^2+", "Mg²⁺", "magnesium", "magnesium ion", "magnesium ions"], wrong: ["Ca2+"], explanation: "White precipitate with both NaOH and NH₃, insoluble in excess of either: Mg²⁺. Ca²⁺ gives no precipitate with ammonia; Al³⁺ and Zn²⁺ dissolve in excess NaOH." }),
        P.short({ label: "(iii)", marks: 1, stem: "Write the equation for the reaction of FB 1 with hydrochloric acid in test 1 (type, e.g., A + 2B -> C + D + E).", accepted: eqs("MgCO3 + 2HCl -> MgCl2 + CO2 + H2O", "MgCO3 + 2HCl -> MgCl2 + H2O + CO2", "MgCO3 + 2H+ -> Mg2+ + CO2 + H2O", "MgCO3 + 2H+ -> Mg2+ + H2O + CO2", "MgCO3(s) + 2HCl(aq) -> MgCl2(aq) + CO2(g) + H2O(l)", "MgCO3(s) + 2H+(aq) -> Mg2+(aq) + CO2(g) + H2O(l)"), wrong: ["MgCO3 + HCl -> MgCl + CO2 + H2O"], explanation: "MgCO₃(s) + 2HCl(aq) → MgCl₂(aq) + CO₂(g) + H₂O(l), or ionically MgCO₃ + 2H⁺ → Mg²⁺ + CO₂ + H₂O." }),
      ] }),
      P.group({ label: "(b)", stem: "FB 2.", parts: [
        P.short({ label: "(i)", marks: 1, stem: "Identify the cation in FB 2 (formula or name).", accepted: ["Al3+", "Al^3+", "Al³⁺", "aluminium", "aluminium ion", "aluminium ions", "aluminum"], wrong: ["Zn2+"], explanation: "Soluble in excess NaOH (amphoteric hydroxide) but not in excess NH₃: Al³⁺. Zinc hydroxide would also dissolve in excess ammonia." }),
        P.short({ label: "(ii)", marks: 1, stem: "Write the ionic equation for the precipitate dissolving in excess sodium hydroxide in test 4.", accepted: eqs("Al(OH)3 + OH- -> [Al(OH)4]-", "Al(OH)3 + OH- -> Al(OH)4-", "Al(OH)3(s) + OH-(aq) -> [Al(OH)4]-(aq)", "Al(OH)3(s) + OH-(aq) -> Al(OH)4-(aq)", "OH- + Al(OH)3 -> [Al(OH)4]-"), wrong: ["Al3+ + 3OH- -> Al(OH)3"], explanation: "Al(OH)₃(s) + OH⁻(aq) → [Al(OH)₄]⁻(aq): the hydroxide reacts as an acid. (Al³⁺ + 3OH⁻ → Al(OH)₃ is the precipitation, not the dissolving.)" }),
        P.mcq({ label: "(iii)", marks: 1, stem: t`Which single reagent would distinguish a solution of $\ce{Mg^2+}$ ions from a solution of $\ce{Al^3+}$ ions?`, options: [
          ["excess aqueous ammonia", "Both hydroxides are white and insoluble in excess ammonia, so the results are the same."],
          ["excess aqueous sodium hydroxide", "Correct: aluminium hydroxide is amphoteric and dissolves in excess NaOH; magnesium hydroxide does not."],
          ["dilute hydrochloric acid", "Neither ion gives a visible change with dilute hydrochloric acid."],
          ["acidified aqueous barium chloride", "This tests for sulfate ions, not for either cation."],
        ], answer: "B", explanation: "Excess NaOH(aq): Al(OH)₃ dissolves to give a colourless solution; Mg(OH)₂ stays as a white precipitate." }),
      ] }),
      P.fib({ label: "(c)", stem: "Complete the deduction about the anion in FB 2 from test 7.", template: "The white precipitate is {{blank:ppt}}, so FB 2 contains the {{blank:ion}} ion.", blanks: [
        { id: "ppt", accepted: ["barium sulfate"], choices: ["barium carbonate", "barium sulfate", "barium sulfite", "barium chloride"] },
        { id: "ion", accepted: ["sulfate"], choices: ["sulfate", "sulfite", "carbonate", "chloride"] },
      ], explanation: "In acid, barium carbonate and barium sulfite cannot form (they dissolve), so the white precipitate is BaSO₄ and FB 2 contains sulfate: FB 2 is aluminium sulfate." }),
      P.group({ label: "(d)", stem: "FB 3.", parts: [
        P.short({ label: "(i)", marks: 1, stem: "Name the gas given off in test 9.", accepted: ["ammonia", "NH3"], wrong: ["hydrogen"], explanation: "Damp red litmus turns blue: ammonia, formed by reduction of the anion by aluminium in alkali." }),
        P.short({ label: "(ii)", marks: 1, stem: "Identify the anion in FB 3 (formula or name).", accepted: ["NO3-", "NO3^-", "NO₃⁻", "nitrate", "nitrate ion", "nitrate ions"], wrong: ["nitrite"], explanation: "Ammonia only after aluminium is added: nitrate or nitrite. Test 10 rules out nitrite, which would give a brown gas (NO, turning to NO₂ in air) with dilute acid and would decolourise acidified manganate(VII). So the anion is nitrate." }),
      ] }),
      P.manual({ label: "(e)", marks: 5, stem: "Give the deductions about the ions in FB 1, FB 2 and FB 3, linking each to the observations, and explain the purpose of tests 6, 8 and 10.", points: ["FB 1: effervescence with acid and CO₂ (limewater milky) → carbonate; white ppt insoluble in excess of both NaOH and NH₃ → Mg²⁺ (FB 1 is magnesium carbonate)", "FB 2: white ppt that dissolves in excess NaOH but not in excess NH₃ → Al³⁺ (amphoteric hydroxide; Zn²⁺ ruled out because its hydroxide dissolves in excess NH₃)", "Test 6 (no yellow ppt with iodide) rules out Pb²⁺, which gives the same NaOH and NH₃ results (ZIMSEC list); test 7 → sulfate, so FB 2 is aluminium sulfate", "Test 8 (no ammonia with NaOH alone) shows that NH₄⁺ is absent, so ammonia in test 9 must come from the anion being reduced by aluminium", "Test 10: nitrite would give a brown gas with acid and decolourise acidified manganate(VII); no change, so the anion is nitrate (FB 3 is a nitrate, e.g. sodium nitrate, with no cation in the list)"], modelAnswer: "FB 1 fizzes with acid giving carbon dioxide, so it is a carbonate; its solution gives a white precipitate with both alkalis that does not dissolve in excess, so the cation is Mg²⁺: FB 1 is magnesium carbonate. FB 2's precipitate dissolves in excess sodium hydroxide but not in excess ammonia, so the cation is Al³⁺ (zinc would dissolve in excess ammonia); test 6 shows no yellow lead(II) iodide, ruling out Pb²⁺, and test 7 shows sulfate, so FB 2 is aluminium sulfate. In test 8 no ammonia is given off with alkali alone, so ammonium ions are absent and the ammonia in test 9 comes from reduction of the anion by aluminium: nitrate or nitrite. Test 10 rules out nitrite, which would give a brown gas with acid and decolourise manganate(VII); FB 3 is a nitrate." }),
    ]),
    hints: ["Which hydroxides are amphoteric?", "Nitrate and nitrite both give ammonia with Al and NaOH: what tells them apart?"],
    explanation: "FB 1 is magnesium carbonate; FB 2 is aluminium sulfate; FB 3 is a nitrate whose cation gives no reaction with the tests used (for example sodium nitrate).",
  });

  // ---------------------------------------------------------------- QA3: BaI2 solution and a solid bromide with conc. H2SO4
  b.struct({
    ...QA, d: 4,
    concepts: [A("skills.qualitative-analysis"), A("group17.halide-ions"), A("group17.properties-reactivity")],
    stem: t`Farai tests two unknowns. **FC 1** is an aqueous solution of a single salt. **FC 2** is a white solid sodium halide. Wear eye protection; tests 5 and 6 must be done in a fume cupboard.

| Test | Observation |
|---|---|
| 1. FC 1: add aqueous sodium hydroxide, then in excess | no precipitate |
| 2. FC 1: add aqueous ammonia | no precipitate |
| 3. FC 1: add dilute sulfuric acid | dense white precipitate |
| 4. FC 1: add dilute nitric acid, then aqueous silver nitrate; then concentrated aqueous ammonia | pale yellow precipitate, insoluble in concentrated ammonia |
| 5. FC 1: add chlorine water, then a few cm³ of cyclohexane; shake and allow to separate | the aqueous solution turns brown; the upper (cyclohexane) layer is purple |
| 6. FC 2: add a few drops of concentrated sulfuric acid to the solid | steamy fumes and an orange-brown vapour; a gas that turns acidified potassium manganate(VII) from purple to colourless |`,
    parts: checkExam(EXAM.QUALITATIVE_ANALYSIS, [
      P.group({ label: "(a)", stem: "The cation in FC 1.", parts: [
        P.short({ label: "(i)", marks: 1, stem: "Identify the cation in FC 1 (formula or name).", accepted: ["Ba2+", "Ba^2+", "Ba²⁺", "barium", "barium ion", "barium ions"], wrong: ["Ca2+"], explanation: "No precipitate with either alkali (barium hydroxide is soluble enough) but a dense white precipitate with sulfate: Ba²⁺. Ca²⁺ would give a white precipitate with sodium hydroxide." }),
        P.short({ label: "(ii)", marks: 1, stem: "Write the ionic equation for the reaction in test 3.", accepted: eqs("Ba2+ + SO42- -> BaSO4", "Ba2+(aq) + SO42-(aq) -> BaSO4(s)", "SO42- + Ba2+ -> BaSO4", "Ba2+ + SO4 2- -> BaSO4", "Ba^2+ + SO4^2- -> BaSO4"), wrong: ["BaI2 + H2SO4 -> BaSO4 + 2HI"], explanation: "Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s)." }),
      ] }),
      P.group({ label: "(b)", stem: "The anion in FC 1.", parts: [
        P.short({ label: "(i)", marks: 1, stem: "Identify the anion in FC 1 from test 4 (formula or name).", accepted: ["I-", "I^-", "I⁻", "iodide", "iodide ion", "iodide ions"], wrong: ["Br-"], explanation: "A pale yellow silver halide insoluble even in concentrated ammonia is AgI: iodide." }),
        P.fib({ label: "(ii)", stem: "Complete the explanation of test 5.", template: "Chlorine is a stronger {{blank:agent}} than iodine, so it oxidises the iodide ions to iodine, which is more soluble in cyclohexane, where it is {{blank:col}}.", blanks: [
          { id: "agent", accepted: ["oxidising agent"], choices: ["oxidising agent", "reducing agent", "acid", "base"] },
          { id: "col", accepted: ["purple"], choices: ["purple", "orange", "pale green", "colourless"] },
        ], explanation: "Cl₂ (E⦵ +1.36 V) is a stronger oxidising agent than I₂ (+0.54 V); iodine is brown in aqueous iodide and purple (violet) in a non-polar solvent." }),
        P.short({ label: "(iii)", marks: 1, stem: "Write the ionic equation for the reaction of chlorine with the anion in test 5.", accepted: eqs("Cl2 + 2I- -> 2Cl- + I2", "Cl2 + 2I- -> I2 + 2Cl-", "Cl2(aq) + 2I-(aq) -> 2Cl-(aq) + I2(aq)", "2I- + Cl2 -> I2 + 2Cl-"), wrong: ["Cl2 + I- -> Cl- + I2"], explanation: "Cl₂ + 2I⁻ → 2Cl⁻ + I₂ (atoms and charge balance: 2− on each side)." }),
      ] }),
      P.group({ label: "(c)", stem: "FC 2.", parts: [
        P.mcq({ label: "(i)", marks: 1, stem: "Which sodium halide is FC 2?", options: [
          ["sodium chloride", "Chloride ions are too weak a reducing agent to reduce sulfuric acid: only steamy HCl fumes form, with no orange-brown vapour or SO₂."],
          ["sodium bromide", "Correct: HBr fumes, orange-brown bromine and sulfur dioxide (decolourises manganate(VII)) are formed."],
          ["sodium iodide", "Iodide gives purple iodine vapour and black solid, and reduces the acid further to sulfur and hydrogen sulfide (bad-egg smell)."],
          ["sodium fluoride", "Fluoride gives only steamy HF fumes; it is not oxidised by concentrated sulfuric acid."],
        ], answer: "B", explanation: "Orange-brown Br₂ plus SO₂ identifies bromide." }),
        P.num({ label: "(ii)", marks: 1, stem: "Give the oxidation number of sulfur in the gas that decolourises the manganate(VII) (include the sign).", value: 4, dp: 0, wrong: [6], explanation: "The gas is SO₂: sulfur is +4, reduced from +6 in H₂SO₄." }),
        P.manual({ label: "(iii)", marks: 2, stem: "Explain why bromide ions reduce concentrated sulfuric acid but chloride ions do not.", points: ["Bromide ions are stronger reducing agents than chloride ions (Br⁻ loses an electron more easily)", "Because Br⁻ is larger, its outer electron is further from the nucleus and more shielded (or the H–Br bond is weaker than H–Cl), so HBr/Br⁻ is oxidised to Br₂ while S(+6) is reduced to SO₂ (+4)"], modelAnswer: "Reducing power increases down Group 17: the bromide ion is larger than the chloride ion, so its outer electrons are further from the nucleus and more easily lost (and the H–Br bond is weaker than H–Cl). Bromide is therefore oxidised to bromine, reducing sulfur from +6 to +4 in SO₂, whereas chloride is not oxidised and only HCl is formed." }),
      ] }),
      P.short({ label: "(d)", marks: 1, stem: "Give the formula of FC 1.", accepted: ["BaI2", "BaI₂", "barium iodide"], wrong: ["BaCl2"], explanation: "Ba²⁺ and I⁻: BaI₂." }),
      P.manual({ label: "(e)", marks: 4, stem: "State why test 6 must be carried out in a fume cupboard, and give three deductions about FC 1 and FC 2, each linked to an observation.", points: ["Toxic/corrosive gases (HBr, Br₂, SO₂) are produced, so use a fume cupboard (and concentrated sulfuric acid is corrosive)", "FC 1 contains Ba²⁺: no ppt with NaOH(aq) or NH₃(aq) but a dense white ppt (BaSO₄) with dilute sulfuric acid", "FC 1 contains I⁻: pale yellow ppt insoluble in concentrated NH₃ (AgI), and chlorine displaces iodine (brown; purple in cyclohexane)", "FC 2 is sodium bromide: orange-brown Br₂ vapour and SO₂ (decolourises manganate(VII)) with concentrated H₂SO₄, not purple I₂ or H₂S"], modelAnswer: "Test 6 releases hydrogen bromide, bromine and sulfur dioxide, which are toxic and corrosive, so it is done in a fume cupboard. FC 1 contains barium ions, because there is no precipitate with either alkali but a dense white precipitate of barium sulfate with sulfuric acid; it contains iodide ions, because silver nitrate gives a pale yellow precipitate insoluble in concentrated ammonia and chlorine liberates iodine, purple in cyclohexane. FC 2 is sodium bromide, because concentrated sulfuric acid gives orange-brown bromine and sulfur dioxide rather than purple iodine and hydrogen sulfide." }),
    ]),
    hints: ["Which Group 2 cation gives no precipitate with sodium hydroxide?", "Reducing power of the halide ions increases down the group."],
    explanation: "FC 1 is barium iodide; FC 2 is sodium bromide.",
  });
});
