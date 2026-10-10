// W2b: four ZIMSEC Paper 3 Section B free-response questions (15 marks each): Period 3, Groups II and IV, Group VII,
// nitrogen and sulfur. (The syllabus placement of nitrogen and sulfur is unclear: Section B or D; see each explanation.)
import { concept, P, t, ZIM, EXAM, checkExam, Mr, molesFromSolution, pHStrongBase, ecell, sfStr, dpStr } from "../lib.mjs";

const A = (k) => `achem.${k}`;
const P3 = { skill: EXAM.ZIM_P3_FREE.skill, secs: EXAM.ZIM_P3_FREE.secs, applies: EXAM.ZIM_P3_FREE.applies, examStyle: true, paper: "Paper 3 Section B" };

concept(A("periodicity.oxides-chlorides"), { file: "exam/w2b-zimsec", keyPrefix: "exam.w2b-zimsec", applies: ZIM }, (b) => {
  // ---------------------------------------------------------------- Z1: Period 3 elements, oxides and chlorides
  {
    const n = 0.124 / Mr("Na2O");
    const oh = (2 * n) / 0.5;
    const p = pHStrongBase(oh);
    b.struct({
      ...P3, d: 4, calculator: true,
      concepts: [A("periodicity.oxides-chlorides"), A("periodicity.physical-properties"), A("periodicity.element-reactions")],
      stem: "This question is about the elements of Period 3, sodium to argon, and their oxides and chlorides.",
      parts: checkExam(EXAM.ZIM_P3_FREE, [
        P.group({ label: "(a)", stem: "Give:", parts: [
          P.short({ label: "(i)", marks: 1, stem: "the equation for the reaction of magnesium with steam (type, e.g., A + B -> C + D);", accepted: ["Mg + H2O -> MgO + H2", "Mg + H2O → MgO + H2", "Mg(s) + H2O(g) -> MgO(s) + H2(g)", "Mg(s) + H2O(g) → MgO(s) + H2(g)"], normalise: ["trim", "collapse_whitespace"], wrong: ["Mg + 2H2O -> Mg(OH)2 + H2"], explanation: "Steam gives MgO and H₂." }),
          P.short({ label: "(ii)", marks: 1, stem: "the formula of the oxide formed when phosphorus burns in excess oxygen;", accepted: ["P4O10", "P₄O₁₀", "P2O5", "P₂O₅"], normalise: ["trim"], wrong: ["P4O6"], explanation: "P₄ + 5O₂ → P₄O₁₀." }),
          P.num({ label: "(iii)", marks: 1, stem: "the oxidation number of sulfur in sulfur trioxide.", value: 6, wrong: [4], explanation: "SO₃: S is +6." }),
        ] }),
        P.mcq({ label: "(b)", stem: "Which chloride gives a solution of pH about 3 when added to water?", options: [
          [t`$\ce{AlCl3}$`, "Correct: hydrated Al³⁺ ions release H⁺."],
          [t`$\ce{NaCl}$`, "NaCl gives a neutral solution."],
          [t`$\ce{MgCl2}$`, "MgCl₂ gives a solution of about pH 6.5."],
          [t`$\ce{PCl5}$`, "PCl₅ is fully hydrolysed to give pH about 1-2."],
        ], answer: "A", explanation: "[Al(H₂O)₆]³⁺ ⇌ [Al(H₂O)₅(OH)]²⁺ + H⁺." }),
        P.manual({
          label: "(c)", marks: 5, type: "EXTENDED_RESPONSE", wordLimit: { max: 300 },
          stem: "Describe and explain the variation in melting point of the elements from sodium to argon.",
          points: [
            "Rises from Na to Al: giant metallic structures",
            "More delocalised electrons and smaller, more highly charged cations from Na to Al, so stronger metallic bonding",
            "Maximum at Si: giant covalent structure, many strong covalent bonds broken",
            "P₄, S₈, Cl₂: simple molecular; only weak instantaneous dipole-induced dipole forces overcome, so low melting points (S₈ > P₄ > Cl₂ as the number of electrons decreases)",
            "Ar lowest: single atoms with very weak forces between them",
          ],
          modelAnswer: "The melting point rises from sodium to aluminium. All three have giant metallic structures, and from Na to Al the cations become smaller and more highly charged while each atom contributes more electrons to the delocalised sea, so the metallic bonding gets stronger. Silicon has the highest melting point because it has a giant covalent structure in which many strong Si–Si bonds must be broken. There is then a sharp fall: phosphorus (P₄), sulfur (S₈) and chlorine (Cl₂) are simple molecular, and melting only overcomes weak instantaneous dipole-induced dipole forces between molecules; S₈ has the most electrons and the highest melting point of the three. Argon, made of single atoms with the fewest electrons, has the lowest melting point.",
        }),
        P.num({ label: "(d)", marks: 2, stem: "0.124 g of sodium oxide is dissolved in water and made up to 500 cm³. Calculate the pH of the solution, to two decimal places. (Mr Na₂O 62.0; Kw 1.00 × 10⁻¹⁴ mol² dm⁻⁶)", value: p, dp: 2, wrong: [dpStr(pHStrongBase(n / 0.5), 2)], explanation: `n(Na₂O) = 0.124 ÷ 62.0 = ${sfStr(n, 3)} mol; n(OH⁻) = ${sfStr(2 * n, 3)} mol; [OH⁻] = ${sfStr(oh, 3)} mol dm⁻³; pH = 14 + log(${sfStr(oh, 3)}) = ${dpStr(p, 2)}.` }),
        P.manual({ label: "(e)", marks: 4, stem: "Describe, with equations, the acid-base behaviour of magnesium oxide, aluminium oxide and sulfur dioxide.", points: ["MgO is basic: MgO + 2HCl → MgCl₂ + H₂O", "Al₂O₃ reacts with acid: Al₂O₃ + 6HCl → 2AlCl₃ + 3H₂O", "and with alkali: Al₂O₃ + 2NaOH + 3H₂O → 2NaAl(OH)₄, so it is amphoteric", "SO₂ is acidic: SO₂ + 2NaOH → Na₂SO₃ + H₂O (or SO₂ + H₂O → H₂SO₃)"], modelAnswer: "Magnesium oxide is basic: MgO + 2HCl → MgCl₂ + H₂O. Aluminium oxide is amphoteric: Al₂O₃ + 6HCl → 2AlCl₃ + 3H₂O and Al₂O₃ + 2NaOH + 3H₂O → 2NaAl(OH)₄. Sulfur dioxide is acidic: SO₂ + 2NaOH → Na₂SO₃ + H₂O." }),
      ]),
      hints: ["Steam gives the oxide.", "Melting point depends on the type of structure.", "One Na₂O gives two OH⁻."],
      explanation: `Paper 3 Section B (inorganic). pH = ${dpStr(p, 2)}; melting points follow metallic → giant covalent → simple molecular → atomic; oxides basic → amphoteric → acidic.`,
    });
  }

  // ---------------------------------------------------------------- Z2: Group II and Group IV
  {
    const n = 7.5 / Mr("CaCO3");
    const m = n * Mr("CaO");
    const e = ecell(1.47, 1.07);
    b.struct({
      ...P3, d: 5, calculator: true,
      concepts: [A("group2.thermal-stability-solubility"), A("group2.reactions-uses"), A("group14.oxides-chlorides")],
      stem: "This question is about the compounds of Group II and Group IV elements.",
      parts: checkExam(EXAM.ZIM_P3_FREE, [
        P.short({ label: "(a)", marks: 1, stem: "Write the equation for the thermal decomposition of magnesium nitrate (type, e.g., 2A -> 2B + 4C + D).", accepted: ["2Mg(NO3)2 -> 2MgO + 4NO2 + O2", "2Mg(NO3)2 → 2MgO + 4NO2 + O2", "Mg(NO3)2 -> MgO + 2NO2 + 1/2O2", "Mg(NO3)2 -> MgO + 2NO2 + ½O2"], normalise: ["trim", "collapse_whitespace"], wrong: ["Mg(NO3)2 -> Mg(NO2)2 + O2"], explanation: "2Mg(NO₃)₂ → 2MgO + 4NO₂ + O₂." }),
        P.mcq({ label: "(b)", stem: "Which Group II nitrate decomposes at the highest temperature?", options: [
          ["barium nitrate", "Correct: thermal stability increases down the group."],
          ["magnesium nitrate", "It is the least stable."],
          ["calcium nitrate", "Less stable than strontium and barium nitrates."],
          ["strontium nitrate", "Less stable than barium nitrate."],
        ], answer: "A", explanation: "Mg < Ca < Sr < Ba." }),
        P.manual({ label: "(c)", marks: 4, stem: "Explain the trend in thermal stability of the Group II nitrates.", points: ["Cation radius increases down the group while the charge stays 2+", "so charge density of the cation decreases", "The cation polarises (distorts the electron cloud of) the large nitrate ion less", "so the N–O bonds are weakened less and more heat is needed to decompose the nitrate"], modelAnswer: "Down Group II the cations have the same 2+ charge but a larger radius, so their charge density decreases. A cation of lower charge density polarises the large nitrate ion less, so the N–O bonds in the anion are weakened less. More heat is therefore needed to decompose the nitrate, and thermal stability increases down the group." }),
        P.num({ label: "(d)", marks: 2, stem: "Limestone (calcium carbonate) is heated in a kiln to make quicklime. Calculate the mass of calcium oxide, in g, from 7.50 g of calcium carbonate, to three significant figures. (Mr: CaCO₃ 100.1, CaO 56.1)", value: m, sf: 3, unit: "g", wrong: [sfStr(7.5 - m, 3)], explanation: `n = 7.50 ÷ 100.1 = ${sfStr(n, 3)} mol; mass CaO = ${sfStr(n, 3)} × 56.1 = ${sfStr(m, 3)} g.` }),
        P.manual({
          label: "(e)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 },
          stem: "Describe and explain the change in the relative stability of the +2 and +4 oxidation states down Group IV. Refer to carbon monoxide, tin(II) chloride and lead(IV) oxide, and to the hydrolysis of the tetrachlorides of carbon and silicon.",
          points: [
            "+4 is the more stable state for C and Si; the +2 state becomes more stable down the group (inert pair effect)",
            "CO (C +2) is a reducing agent, readily oxidised to CO₂ (+4)",
            "Sn²⁺ is a reducing agent (oxidised to Sn⁴⁺), e.g. reduces Fe³⁺ to Fe²⁺",
            "PbO₂ (Pb +4) is an oxidising agent, e.g. oxidises Cl⁻ to Cl₂, and decomposes on heating to PbO; Pb +2 is the more stable state",
            "CCl₄ is not hydrolysed: carbon has no available d orbitals to accept a lone pair from water and is shielded by Cl atoms",
            "SiCl₄ is hydrolysed (SiCl₄ + 2H₂O → SiO₂ + 4HCl) because Si has empty 3d orbitals that accept the lone pair",
          ],
          modelAnswer: "At the top of Group IV the +4 state is the more stable: carbon monoxide, with carbon in +2, is a reducing agent that is easily oxidised to CO₂. Down the group the s² electrons are used less in bonding (the inert pair effect), so the +2 state becomes more stable. Tin is still most stable in +4, so tin(II) chloride is a reducing agent (Sn²⁺ + 2Fe³⁺ → Sn⁴⁺ + 2Fe²⁺). For lead the +2 state is more stable, so lead(IV) oxide is an oxidising agent (it oxidises chloride ions to chlorine) and decomposes to PbO on heating. In the tetrachlorides, CCl₄ is not hydrolysed because carbon has no available d orbitals to accept a lone pair from water and is shielded by four chlorine atoms, whereas SiCl₄ is hydrolysed rapidly, SiCl₄ + 2H₂O → SiO₂ + 4HCl, because silicon can use its empty 3d orbitals.",
        }),
        P.num({ label: "(f)", marks: 1, stem: "Calculate E⦵cell, in V, for the oxidation of bromide ions by lead(IV) oxide in acid. E⦵: PbO₂ + 4H⁺ + 2e⁻ ⇌ Pb²⁺ + 2H₂O +1.47 V; Br₂ + 2e⁻ ⇌ 2Br⁻ +1.07 V. (Two decimal places, with the sign.)", value: e, dp: 2, unit: "V", wrong: [dpStr(-e, 2)], explanation: `1.47 − 1.07 = +${dpStr(e, 2)} V: feasible.` }),
      ]),
      hints: ["Charge density and polarisation for (c).", "Inert pair effect and available d orbitals for (e)."],
      explanation: `Paper 3 Section B (inorganic). Nitrates: stability increases down Group II (charge density); ${sfStr(m, 3)} g CaO; Group IV: +2 more stable down the group; E⦵cell = +${dpStr(e, 2)} V.`,
    });
  }

  // ---------------------------------------------------------------- Z3: Group VII
  {
    const nS = molesFromSolution(21.4, 0.05);
    const c = nS / 2 / 0.025;
    b.struct({
      ...P3, d: 4, calculator: true,
      concepts: [A("group17.properties-reactivity"), A("group17.halide-ions"), A("group17.chlorine-uses")],
      stem: "This question is about the halogens and their compounds.",
      parts: checkExam(EXAM.ZIM_P3_FREE, [
        P.fib({ label: "(a)", stem: "Complete the description of the halogens at room temperature.", template: "Chlorine is a {{blank:a}} gas, bromine is a red-brown {{blank:b}}, and iodine vapour is {{blank:c}}.", blanks: [
          { id: "a", accepted: ["pale green"], choices: ["pale green", "colourless", "brown", "purple"] },
          { id: "b", accepted: ["liquid"], choices: ["liquid", "gas", "solid"] },
          { id: "c", accepted: ["purple"], choices: ["purple", "orange", "pale green", "colourless"] },
        ], explanation: "Cl₂ pale green gas; Br₂ red-brown liquid; I₂ purple vapour." }),
        P.num({ label: "(b)", marks: 2, stem: "25.0 cm³ of chlorine water was added to excess potassium iodide solution. The iodine liberated needed 21.40 cm³ of 0.0500 mol dm⁻³ sodium thiosulfate (I₂ + 2S₂O₃²⁻ → 2I⁻ + S₄O₆²⁻). Calculate the concentration of chlorine in the chlorine water, in mol dm⁻³, to three significant figures.", value: c, sf: 3, unit: "mol/dm³", wrong: [sfStr(nS / 0.025, 3)], explanation: `n(S₂O₃²⁻) = ${sfStr(nS, 3)} mol; n(I₂) = n(Cl₂) = ${sfStr(nS / 2, 3)} mol (Cl₂ + 2I⁻ → 2Cl⁻ + I₂); c = ${sfStr(nS / 2, 3)} ÷ 0.0250 = ${sfStr(c, 3)} mol dm⁻³.` }),
        P.manual({
          label: "(c)", marks: 5, type: "EXTENDED_RESPONSE", wordLimit: { max: 300 },
          stem: "Describe the reactions of solid sodium chloride, sodium bromide and sodium iodide with concentrated sulphuric acid, and explain the differences.",
          points: [
            "All give steamy fumes of HX (NaX + H₂SO₄ → NaHSO₄ + HX); NaCl gives only HCl",
            "NaBr: orange-brown Br₂ and SO₂: 2HBr + H₂SO₄ → Br₂ + SO₂ + 2H₂O (S +6 → +4)",
            "NaI: purple I₂, yellow S and H₂S (bad eggs); S reduced as far as −2 (e.g. 8HI + H₂SO₄ → 4I₂ + H₂S + 4H₂O)",
            "Reducing power of halide ions increases Cl⁻ < Br⁻ < I⁻",
            "because the ions get larger: outer electrons further from the nucleus and more shielded, so more easily lost",
          ],
          modelAnswer: "Each halide first gives steamy fumes of the hydrogen halide, e.g. NaCl + H₂SO₄ → NaHSO₄ + HCl, and with sodium chloride nothing more happens. With sodium bromide, orange-brown bromine and choking sulfur dioxide also form: 2HBr + H₂SO₄ → Br₂ + SO₂ + 2H₂O, in which sulfur is reduced from +6 to +4. With sodium iodide, purple iodine fumes, yellow sulfur and hydrogen sulfide (smell of bad eggs) form, e.g. 8HI + H₂SO₄ → 4I₂ + H₂S + 4H₂O, so sulfur is reduced as far as −2. The differences arise because the reducing power of the halide ions increases from Cl⁻ to I⁻: the larger ions hold their outer electrons further from the nucleus and with more shielding, so they lose electrons more easily.",
        }),
        P.manual({ label: "(d)", marks: 3, stem: "Describe the reactions of chlorine with cold dilute and with hot concentrated aqueous sodium hydroxide, giving equations and the oxidation numbers of chlorine in the products.", points: ["Cold: Cl₂ + 2NaOH → NaCl + NaClO + H₂O", "Hot: 3Cl₂ + 6NaOH → 5NaCl + NaClO₃ + 3H₂O", "Cl goes from 0 to −1 (chloride) and to +1 (chlorate(I)) or +5 (chlorate(V)): disproportionation"], modelAnswer: "Cold, dilute: Cl₂ + 2NaOH → NaCl + NaClO + H₂O. Hot, concentrated: 3Cl₂ + 6NaOH → 5NaCl + NaClO₃ + 3H₂O. Chlorine (0) is reduced to −1 in NaCl and oxidised to +1 in NaClO or +5 in NaClO₃: both are disproportionation reactions." }),
        P.mcq({ label: "(e)", stem: "Which hydrogen halide decomposes most readily when heated?", options: [
          ["hydrogen iodide", "Correct: the H–I bond is the weakest."],
          ["hydrogen fluoride", "The H–F bond is the strongest."],
          ["hydrogen chloride", "HCl is thermally stable."],
          ["hydrogen bromide", "HBr is more stable than HI."],
        ], answer: "A", explanation: "Thermal stability falls as the H–X bond energy falls." }),
        P.short({ label: "(f)", marks: 1, stem: "When chlorine dissolves in water, an uncharged species that kills bacteria is formed. Give its formula.", accepted: ["HOCl", "HClO", "HOCl(aq)"], normalise: ["trim"], wrong: ["HCl"], explanation: "Cl₂ + H₂O ⇌ HCl + HOCl; HOCl (and ClO⁻) kill bacteria." }),
      ]),
      hints: ["One Cl₂ releases one I₂, which reacts with two S₂O₃²⁻.", "Reducing power of halide ions increases down the group."],
      explanation: `Paper 3 Section B (inorganic). [Cl₂] = ${sfStr(c, 3)} mol dm⁻³; halides with H₂SO₄ show increasing reducing power; chlorine disproportionates in alkali.`,
    });
  }

  // ---------------------------------------------------------------- Z4: nitrogen and sulfur
  {
    const nHCl = molesFromSolution(50, 0.4);
    const nOH = molesFromSolution(27.4, 0.2);
    const nNH3 = nHCl - nOH;
    const pct = ((nNH3 / 2) * Mr("(NH4)2SO4") / 1.0) * 100;
    b.struct({
      ...P3, d: 4, calculator: true,
      concepts: [A("nitrogen-sulfur.nitrogen-ammonia"), A("nitrogen-sulfur.environment")],
      stem: "This question is about nitrogen, its compounds and the environmental effects of nitrogen and sulphur compounds.",
      parts: checkExam(EXAM.ZIM_P3_FREE, [
        P.manual({ label: "(a)", marks: 2, stem: "Explain why nitrogen gas is very unreactive.", points: ["Very strong N≡N triple bond (944 kJ mol⁻¹): very high activation energy", "Non-polar molecule: no δ+/δ− sites for attack"], modelAnswer: "The N≡N triple bond is very strong, so reactions of nitrogen have very high activation energies, and the molecule is non-polar, so it attracts neither electrophiles nor nucleophiles." }),
        P.group({ label: "(b)", stem: "For the ammonium ion:", parts: [
          P.short({ label: "(i)", marks: 1, stem: "write the ionic equation for its reaction with hydroxide ions on warming (type, e.g., A + B -> C + D);", accepted: ["NH4+ + OH- -> NH3 + H2O", "NH4+ + OH- → NH3 + H2O", "NH₄⁺ + OH⁻ → NH₃ + H₂O"], normalise: ["trim", "collapse_whitespace"], wrong: ["NH3 + H2O -> NH4+ + OH-"], explanation: "NH₄⁺ + OH⁻ → NH₃ + H₂O." }),
          P.num({ label: "(ii)", marks: 1, stem: "state the H–N–H bond angle, in degrees.", value: 109.5, dp: 1, wrong: [107], explanation: "Tetrahedral: 109.5°." }),
        ] }),
        P.group({ label: "(c)", stem: "A 1.00 g sample of ammonium sulphate fertiliser was warmed with excess NaOH(aq) and all the ammonia was absorbed in 50.0 cm³ of 0.400 mol dm⁻³ HCl. The excess HCl needed 27.40 cm³ of 0.200 mol dm⁻³ NaOH.", parts: [
          P.num({ label: "(i)", marks: 1, stem: "Calculate the amount, in mol, of ammonia absorbed, to three significant figures.", value: nNH3, sf: 3, unit: "mol", wrong: [sfStr(nOH, 3)], explanation: `n(HCl) = ${sfStr(nHCl, 3)} mol; excess = ${sfStr(nOH, 3)} mol; NH₃ = ${sfStr(nNH3, 3)} mol.` }),
          P.num({ label: "(ii)", marks: 2, stem: "Calculate the percentage purity of the ammonium sulphate, to three significant figures. (Mr (NH₄)₂SO₄ 132.1)", value: pct, sf: 3, unit: "%", wrong: [sfStr(nNH3 * Mr("(NH4)2SO4") * 100, 3)], explanation: `n((NH₄)₂SO₄) = ${sfStr(nNH3, 3)} ÷ 2 = ${sfStr(nNH3 / 2, 3)} mol; mass = ${sfStr((nNH3 / 2) * Mr("(NH4)2SO4"), 3)} g; purity = ${sfStr(pct, 3)}%. Forgetting that each formula unit gives two NH₃ gives an impossible ${sfStr(nNH3 * Mr("(NH4)2SO4") * 100, 3)}%.` }),
        ] }),
        P.manual({
          label: "(d)", marks: 5, type: "EXTENDED_RESPONSE", wordLimit: { max: 300 },
          stem: "Explain how oxides of nitrogen are formed in car engines, how they are removed from exhaust gases, and how they contribute to acid rain. Include equations.",
          points: [
            "High temperature in the engine makes N₂ and O₂ from the air combine: N₂ + O₂ → 2NO",
            "Catalytic converter (Pt/Pd/Rh): 2CO + 2NO → 2CO₂ + N₂",
            "NO is oxidised in air to NO₂ (2NO + O₂ → 2NO₂), which forms nitric acid (4NO₂ + O₂ + 2H₂O → 4HNO₃)",
            "NO₂ catalyses oxidation of SO₂: NO₂ + SO₂ → NO + SO₃",
            "NO + ½O₂ → NO₂ regenerates the catalyst; SO₃ + H₂O → H₂SO₄",
          ],
          modelAnswer: "In the hot engine cylinders, nitrogen and oxygen from the air combine: N₂ + O₂ → 2NO. A catalytic converter containing platinum, palladium and rhodium removes NO by reaction with carbon monoxide: 2CO + 2NO → 2CO₂ + N₂. NO that escapes is oxidised in air to NO₂, which dissolves to form nitric acid: 4NO₂ + O₂ + 2H₂O → 4HNO₃. NO₂ also catalyses the oxidation of sulphur dioxide: NO₂ + SO₂ → NO + SO₃, then NO + ½O₂ → NO₂, so NO₂ is regenerated; the SO₃ forms sulphuric acid, SO₃ + H₂O → H₂SO₄.",
        }),
        P.manual({ label: "(e)", marks: 3, stem: "Explain how excessive use of nitrate fertilisers can harm aquatic life, and state one use of sulphur dioxide in food.", points: ["Nitrates leach into rivers/dams and cause rapid growth of algae (eutrophication)", "Dead algae are decomposed by bacteria that use up dissolved oxygen, so fish die", "SO₂ is used as a food preservative (e.g. in dried fruit, juices or wine) because it kills micro-organisms / is an antioxidant"], modelAnswer: "Nitrates washed into rivers and dams cause algal blooms; when the algae die, bacteria decomposing them use up the dissolved oxygen, so fish die (eutrophication). Sulphur dioxide is used as a preservative in dried fruit and fruit juices because it kills micro-organisms and prevents oxidation." }),
      ]),
      hints: ["Moles of NH₃ = moles of HCl added − moles of HCl left.", "NO₂ is regenerated in the catalytic cycle."],
      explanation: `Paper 3 Section B (inorganic); nitrogen and sulphur chemistry could also appear in Section D (applied), because the syllabus placement is unclear. Purity ${sfStr(pct, 3)}%.`,
    });
  }
});
