// W2b: six THEORY10 items (ZIMSEC Paper 2; Cambridge Paper 2 for the five AS items, Paper 4 for the Group 2
// explanations item) on Period 3, Group 2, Group 17 and nitrogen and sulfur. All concepts are covered by both syllabi.
import { concept, P, t, EXAM, checkExam, Mr, AR, VM_RTP, molesFromSolution, solutionEnthalpy, pH, sfStr, dpStr, chk } from "../lib.mjs";

const A = (k) => `achem.${k}`;
const AS = { skill: EXAM.THEORY10.skill, secs: EXAM.THEORY10.secs, examStyle: true, paper: "Paper 2" };
const AL = { skill: EXAM.THEORY10.skill, secs: EXAM.THEORY10.secs, examStyle: true, paper: "Paper 4 (CIE), Paper 2 (ZIMSEC)" };

concept(A("periodicity.physical-properties"), { file: "exam/w2b-theory", keyPrefix: "exam.w2b-theory" }, (b) => {
  // ---------------------------------------------------------------- T1: Period 3 physical properties and reactions
  {
    const pct = ((186 - 104) / 186) * 100;
    b.struct({
      ...AS, d: 3, calculator: true,
      concepts: [A("periodicity.physical-properties"), A("periodicity.element-reactions")],
      stem: "The atomic radii of six Period 3 elements are given (data, pm; metallic radius for Na, Mg and Al, covalent radius for Si, P and S).\n\n| Element | Na | Mg | Al | Si | P | S |\n|---|---|---|---|---|---|---|\n| atomic radius / pm | 186 | 160 | 143 | 117 | 110 | 104 |",
      parts: checkExam(EXAM.THEORY10, [
        P.manual({ label: "(a)", marks: 2, stem: "Explain the trend in atomic radius from sodium to sulfur.", points: ["Nuclear charge (number of protons) increases across the period", "Electrons are added to the same shell, so shielding is about the same and the outer electrons are pulled closer"], modelAnswer: "From Na to S the nuclear charge increases by one each time, while the extra electrons enter the same (third) shell, so shielding hardly changes. The outer electrons are attracted more strongly and the radius decreases." }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate the percentage decrease in atomic radius from sodium to sulfur, to three significant figures.", value: pct, sf: 3, unit: "%", wrong: [sfStr(((186 - 104) / 104) * 100, 3)], explanation: `(186 − 104) ÷ 186 × 100 = ${sfStr(pct, 3)}%.` }),
        P.mcq({ label: "(c)", stem: "Which ion is the largest?", options: [
          [t`$\ce{S^2-}$`, "Correct: an anion with a third shell of electrons and the smallest nuclear charge of the isoelectronic anions."],
          [t`$\ce{Na+}$`, "Na⁺ has lost its third shell."],
          [t`$\ce{Al^3+}$`, "Al³⁺ is the smallest of these ions."],
          [t`$\ce{Mg^2+}$`, "Mg²⁺ has only two occupied shells."],
        ], answer: "A", explanation: "Anions keep the third shell; S²⁻ (16 protons, 18 electrons) is larger than Cl⁻ and far larger than the cations." }),
        P.fib({ label: "(d)", stem: "Complete the sentence about the structures of two elements.", template: "Silicon has a {{blank:a}} structure, but sulfur consists of {{blank:b}} molecules held together by weak intermolecular forces.", blanks: [
          { id: "a", accepted: ["giant covalent"], choices: ["giant covalent", "giant metallic", "simple molecular", "giant ionic"] },
          { id: "b", accepted: ["S8"], choices: ["S8", "S2", "S6", "S4"] },
        ], explanation: "Si giant covalent; sulfur S₈ rings." }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain why silicon has a much higher melting point than sulfur.", points: ["Silicon: many strong covalent bonds must be broken in the giant lattice", "Sulfur: only weak instantaneous dipole-induced dipole forces between S₈ molecules are overcome"], modelAnswer: "Melting silicon breaks many strong Si–Si covalent bonds in its giant lattice, but melting sulfur only overcomes weak instantaneous dipole-induced dipole forces between S₈ molecules." }),
        P.short({ label: "(f)", marks: 1, stem: "Write the equation for the reaction of sodium with cold water (type, e.g., 2A + 2B -> 2C + D).", accepted: ["2Na + 2H2O -> 2NaOH + H2", "2Na + 2H2O → 2NaOH + H2", "2Na(s) + 2H2O(l) -> 2NaOH(aq) + H2(g)", "2Na(s) + 2H2O(l) → 2NaOH(aq) + H2(g)"], normalise: ["trim", "collapse_whitespace"], wrong: ["Na + H2O -> NaOH + H"], explanation: "2Na + 2H₂O → 2NaOH + H₂." }),
        P.short({ label: "(g)", marks: 1, stem: "Give the formula of the oxide formed when magnesium burns in air.", accepted: ["MgO"], normalise: ["trim"], wrong: ["MgO2"], explanation: "2Mg + O₂ → 2MgO." }),
      ]),
      hints: ["Nuclear charge versus shielding.", "Compare the type of structure, not atom size, for melting points."],
      explanation: `Radius falls by ${sfStr(pct, 3)}% from Na to S (nuclear charge up, shielding constant); Si giant covalent vs S₈ simple molecular; 2Na + 2H₂O → 2NaOH + H₂.`,
    });
  }

  // ---------------------------------------------------------------- T2: Period 3 oxides and chlorides with water
  {
    const n = 0.556 / Mr("PCl5");
    const nH = n * 8;
    const v = (nH / 0.2) * 1000;
    b.struct({
      ...AS, d: 4, calculator: true,
      concepts: [A("periodicity.oxides-chlorides"), A("periodicity.element-reactions")],
      stem: "Farai added small amounts of four Period 3 compounds to separate beakers of water and measured the pH.\n\n| Compound | observation | pH |\n|---|---|---|\n| magnesium oxide | white solid, does not appear to dissolve | about 9 |\n| aluminium oxide | white solid, no change | 7 |\n| silicon tetrachloride | violent reaction, steamy fumes, white solid | about 1 |\n| phosphorus pentachloride | vigorous reaction, steamy fumes | about 1 |",
      parts: checkExam(EXAM.THEORY10, [
        P.short({ label: "(a)", marks: 1, stem: "Write the equation for the reaction of silicon tetrachloride with water (type, e.g., A + 2B -> C + 4D).", accepted: ["SiCl4 + 2H2O -> SiO2 + 4HCl", "SiCl4 + 2H2O → SiO2 + 4HCl", "SiCl4(l) + 2H2O(l) -> SiO2(s) + 4HCl(aq)"], normalise: ["trim", "collapse_whitespace"], wrong: ["SiCl4 + H2O -> SiO + 2HCl"], explanation: "SiCl₄ + 2H₂O → SiO₂ + 4HCl." }),
        P.mcq({ label: "(b)", stem: "Why does the magnesium oxide mixture have a pH of about 9 rather than 13?", options: [
          ["Magnesium hydroxide is only slightly soluble.", "Correct: few OH⁻ ions are in solution."],
          ["Magnesium oxide is an acidic oxide.", "MgO is basic."],
          ["Magnesium oxide does not react with water at all.", "It does react slightly, giving an alkaline mixture."],
          ["Magnesium hydroxide is a weak acid.", "Mg(OH)₂ is a base."],
        ], answer: "A", explanation: "MgO + H₂O → Mg(OH)₂, which is sparingly soluble, so [OH⁻] is low." }),
        P.manual({ label: "(c)", marks: 2, stem: "Aluminium oxide does not react with water. Write two equations to show that it is amphoteric.", points: ["Al₂O₃ + 6HCl → 2AlCl₃ + 3H₂O", "Al₂O₃ + 2NaOH + 3H₂O → 2NaAl(OH)₄"], modelAnswer: "With acid: Al₂O₃ + 6HCl → 2AlCl₃ + 3H₂O. With alkali: Al₂O₃ + 2NaOH + 3H₂O → 2NaAl(OH)₄." }),
        P.num({ label: "(d)", marks: 2, stem: "0.556 g of PCl₅ was added to water (PCl₅ + 4H₂O → H₃PO₄ + 5HCl). Calculate the volume, in cm³, of 0.200 mol dm⁻³ NaOH needed to neutralise all the acid, if H₃PO₄ reacts with three NaOH, to three significant figures. (Mr PCl₅ 208.5)", value: v, sf: 3, unit: "cm³", wrong: [sfStr(((n * 5) / 0.2) * 1000, 3)], explanation: `n(PCl₅) = 0.556 ÷ 208.5 = ${sfStr(n, 3)} mol; NaOH needed = (3 + 5) × ${sfStr(n, 3)} = ${sfStr(nH, 3)} mol; V = ${sfStr(nH, 3)} ÷ 0.200 × 1000 = ${sfStr(v, 3)} cm³. Neutralising only the HCl gives ${sfStr(((n * 5) / 0.2) * 1000, 3)} cm³.` }),
        P.manual({ label: "(e)", marks: 3, stem: "Explain the change from basic to acidic behaviour across the period in terms of bonding.", points: ["Electronegativity of the element increases across the period, so the difference from O or Cl decreases", "MgO (and NaCl, MgCl₂) are ionic; oxide ions react with water to give OH⁻ (basic)", "SiCl₄, PCl₅ (and P₄O₁₀, SO₃) are covalent; they are hydrolysed / react with water to form acids"], modelAnswer: "Across Period 3 the electronegativity of the element rises, so its difference from oxygen or chlorine falls. Magnesium oxide is ionic and its oxide ions react with water to form hydroxide ions, so it is basic. Silicon and phosphorus chlorides are covalent: water attacks the δ+ central atom and they are hydrolysed to acidic solutions containing HCl." }),
        P.tf({ label: "(f)", stem: "Sodium chloride dissolves in water to give a solution of pH 7.", answer: true, explanation: "True: NaCl is ionic and is not hydrolysed." }),
      ]),
      hints: ["H₃PO₄ needs three NaOH and each HCl one.", "Link pH to ionic or covalent bonding."],
      explanation: "Basic ionic MgO, amphoteric Al₂O₃, hydrolysed covalent SiCl₄ and PCl₅; the change follows decreasing electronegativity difference.",
    });
  }

  // ---------------------------------------------------------------- T3: Group 2 reactions and decomposition
  {
    const nCa = 0.802 / AR.Ca;
    const v = nCa * VM_RTP * 1000;
    const nN = 2.952 / Mr("Ca(NO3)2");
    const vO2 = (nN / 2) * VM_RTP * 1000;
    b.struct({
      ...AS, d: 3, calculator: true,
      concepts: [A("group2.reactions-uses"), A("periodicity.element-reactions")],
      stem: "Chipo compared calcium and its compounds with those of the other Group 2 elements.\n\nExperiment 1: 0.802 g of calcium was added to excess cold water.\nExperiment 2: 2.952 g of anhydrous calcium nitrate was heated strongly until no further change occurred.\n\n(Ar: N 14.0, O 16.0, Ca 40.1; molar gas volume at room conditions 24 000 cm³ mol⁻¹)",
      parts: checkExam(EXAM.THEORY10, [
        P.short({ label: "(a)", marks: 1, stem: "Write the equation for experiment 1 (type, e.g., A + 2B -> C + D).", accepted: ["Ca + 2H2O -> Ca(OH)2 + H2", "Ca + 2H2O → Ca(OH)2 + H2", "Ca(s) + 2H2O(l) -> Ca(OH)2(aq) + H2(g)", "Ca(s) + 2H2O(l) → Ca(OH)2(s) + H2(g)"], normalise: ["trim", "collapse_whitespace"], wrong: ["Ca + H2O -> CaO + H2"], explanation: "Ca + 2H₂O → Ca(OH)₂ + H₂." }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the volume of hydrogen formed in experiment 1, in cm³ at room conditions, to three significant figures.", value: v, sf: 3, unit: "cm³", wrong: [sfStr(v / 1000, 3)], explanation: `n(Ca) = 0.802 ÷ 40.1 = ${sfStr(nCa, 3)} mol = n(H₂); V = ${sfStr(nCa, 3)} × 24 000 = ${sfStr(v, 3)} cm³.` }),
        P.manual({ label: "(c)", marks: 2, stem: "State one observation, other than effervescence, in experiment 1, and explain it.", points: ["The mixture turns cloudy / a white suspension forms (or the calcium sinks and gradually disappears)", "because calcium hydroxide is only slightly soluble (or: because it is denser than water and reacts)"], modelAnswer: "A white suspension forms because some of the calcium hydroxide does not dissolve." }),
        P.short({ label: "(d)", marks: 1, stem: "Write the equation for the decomposition in experiment 2 (type, e.g., 2A -> 2B + 4C + D).", accepted: ["2Ca(NO3)2 -> 2CaO + 4NO2 + O2", "2Ca(NO3)2 → 2CaO + 4NO2 + O2", "Ca(NO3)2 -> CaO + 2NO2 + 1/2O2", "Ca(NO3)2 -> CaO + 2NO2 + ½O2"], normalise: ["trim", "collapse_whitespace"], wrong: ["Ca(NO3)2 -> Ca(NO2)2 + O2"], explanation: "2Ca(NO₃)₂ → 2CaO + 4NO₂ + O₂ (brown fumes)." }),
        P.num({ label: "(e)", marks: 2, stem: "Calculate the volume of oxygen formed in experiment 2, in cm³ at room conditions, to three significant figures.", value: vO2, sf: 3, unit: "cm³", wrong: [sfStr(nN * VM_RTP * 1000, 3)], explanation: `Mr(Ca(NO₃)₂) = 164.1; n = 2.952 ÷ 164.1 = ${sfStr(nN, 3)} mol; n(O₂) = ${sfStr(nN, 3)} ÷ 2 = ${sfStr(nN / 2, 3)} mol; V = ${sfStr(vO2, 3)} cm³.` }),
        P.mcq({ label: "(f)", stem: "Barium nitrate is heated in the same way. Compared with calcium nitrate, it decomposes:", options: [
          ["at a higher temperature, to BaO, NO₂ and O₂", "Correct: thermal stability increases down the group; same products."],
          ["at a lower temperature, to BaO, NO₂ and O₂", "Thermal stability increases down Group 2."],
          ["at a higher temperature, to Ba(NO₂)₂ and O₂", "Group 2 nitrates give the oxide, not the nitrite."],
          ["not at all, because barium is unreactive", "Barium nitrate does decompose, but less readily."],
        ], answer: "A", explanation: "Same type of reaction, higher decomposition temperature down the group." }),
        P.manual({ label: "(g)", marks: 1, stem: "State the trend in the solubility of the Group 2 sulfates and give one example of a test that depends on it.", points: ["Solubility decreases down the group; barium sulfate is insoluble, so acidified BaCl₂ is used to test for sulfate ions"], modelAnswer: "The sulfates become less soluble down the group; BaSO₄ is so insoluble that acidified barium chloride gives a white precipitate with sulfate ions." }),
      ]),
      hints: ["One Ca gives one H₂.", "Two Ca(NO₃)₂ give one O₂."],
      explanation: `${sfStr(v, 3)} cm³ of H₂; 2Ca(NO₃)₂ → 2CaO + 4NO₂ + O₂ gives ${sfStr(vO2, 3)} cm³ of O₂; thermal stability increases and sulfate solubility decreases down the group.`,
    });
  }

  // ---------------------------------------------------------------- T4: halogens and halide ions
  {
    const nAg = molesFromSolution(16.8, 0.05);
    const c = nAg / 0.02;
    b.struct({
      ...AS, d: 4, calculator: true,
      concepts: [A("group17.halide-ions"), A("group17.properties-reactivity")],
      stem: "A colourless solution **Q** contains one sodium halide. Tendai carried out these tests.\n\n| Test | Observation |\n|---|---|\n| 1. chlorine water added, then shaken with cyclohexane | organic layer turns orange-red |\n| 2. dilute HNO₃ then AgNO₃(aq) added | cream precipitate |\n| 3. precipitate from test 2 + dilute NH₃(aq) | little change |",
      parts: checkExam(EXAM.THEORY10, [
        P.short({ label: "(a)", marks: 1, stem: "Identify the halide ion in **Q** (give its formula).", accepted: ["Br-", "Br⁻", "bromide"], normalise: ["trim", "lowercase", "collapse_whitespace"], wrong: ["Cl-"], explanation: "Orange-red bromine in cyclohexane and cream AgBr." }),
        P.short({ label: "(b)", marks: 1, stem: "Write the ionic equation for test 1 (type, e.g., A + 2B -> 2C + D).", accepted: ["Cl2 + 2Br- -> 2Cl- + Br2", "Cl2 + 2Br- → 2Cl- + Br2", "Cl₂ + 2Br⁻ → 2Cl⁻ + Br₂"], normalise: ["trim", "collapse_whitespace"], wrong: ["Cl + Br- -> Cl- + Br"], explanation: "Cl₂ + 2Br⁻ → 2Cl⁻ + Br₂." }),
        P.mcq({ label: "(c)", stem: "What would be seen if the precipitate from test 2 were treated with concentrated aqueous ammonia?", options: [
          ["It would dissolve.", "Correct: AgBr dissolves in concentrated ammonia."],
          ["It would turn yellow.", "Ammonia does not change the colour to yellow."],
          ["It would stay unchanged.", "That is the behaviour of AgI."],
          ["A brown gas would be given off.", "No gas is formed."],
        ], answer: "A", explanation: "AgBr: partially soluble in dilute, soluble in concentrated NH₃(aq)." }),
        P.num({ label: "(d)", marks: 2, stem: "20.0 cm³ of **Q** needed 16.80 cm³ of 0.0500 mol dm⁻³ AgNO₃ to precipitate all the halide. Calculate the concentration of the halide in **Q**, in mol dm⁻³, to three significant figures.", value: c, sf: 3, unit: "mol/dm³", wrong: [sfStr(nAg / 0.0168, 3)], explanation: `n(Ag⁺) = 16.80 ÷ 1000 × 0.0500 = ${sfStr(nAg, 3)} mol = n(Br⁻); c = ${sfStr(nAg, 3)} ÷ 0.0200 = ${sfStr(c, 3)} mol dm⁻³.` }),
        P.manual({ label: "(e)", marks: 3, stem: "Solid sodium bromide reacts with concentrated sulfuric acid. Give two observations, and write an equation for the redox step, stating the change in oxidation number of sulfur.", points: ["Steamy fumes (HBr) and orange-brown fumes (Br₂) (or a choking gas, SO₂)", "2HBr + H₂SO₄ → Br₂ + SO₂ + 2H₂O", "Sulfur: +6 → +4"], modelAnswer: "Steamy fumes of HBr and orange-brown fumes of bromine are seen. 2HBr + H₂SO₄ → Br₂ + SO₂ + 2H₂O; sulfur is reduced from +6 to +4." }),
        P.manual({ label: "(f)", marks: 2, stem: "Explain why sodium chloride does not give a redox reaction with concentrated sulfuric acid, whereas sodium bromide does.", points: ["Chloride is a weaker reducing agent than bromide", "because Cl⁻ is smaller: its outer electrons are closer to the nucleus and less shielded, so harder to remove"], modelAnswer: "Chloride ions are weaker reducing agents than bromide ions: Cl⁻ is smaller, so its outer electrons are held more strongly and it cannot reduce sulfuric acid; Br⁻ can, as far as SO₂." }),
      ]),
      hints: ["Cream precipitate and orange-red in cyclohexane point to one halide.", "Reducing power increases down Group 17."],
      explanation: `Q contains Br⁻ (${sfStr(c, 3)} mol dm⁻³); Cl₂ displaces Br₂; HBr reduces H₂SO₄ to SO₂; chloride is too weak a reducing agent.`,
    });
  }

  // ---------------------------------------------------------------- T5: nitrogen, ammonia and NOx
  {
    const n = 0.749 / Mr("NH4Cl");
    const v = n * VM_RTP * 1000;
    b.struct({
      ...AS, d: 3, calculator: true,
      concepts: [A("nitrogen-sulfur.nitrogen-ammonia"), A("nitrogen-sulfur.environment")],
      stem: "Nitrogen makes up about 78% of the air, but it is very unreactive. Its compounds, however, include useful fertilisers and harmful pollutants.",
      parts: checkExam(EXAM.THEORY10, [
        P.manual({ label: "(a)", marks: 2, stem: "Explain why nitrogen is unreactive.", points: ["Very strong N≡N triple bond (high bond energy), so a high activation energy", "Non-polar molecule: no δ+/δ− sites to attract other reagents"], modelAnswer: "The N≡N triple bond is very strong, so reactions of nitrogen have a very high activation energy, and the molecule is non-polar, so it is not attacked by electrophiles or nucleophiles." }),
        P.mcq({ label: "(b)", stem: "Which describes the bonding and shape of the ammonium ion?", options: [
          ["a dative bond from N to H⁺; tetrahedral, 109.5°", "Correct: four bonding pairs and no lone pair."],
          ["a dative bond from H⁺ to N; pyramidal, 107°", "H⁺ has no electrons to donate, and NH₄⁺ has no lone pair."],
          ["an ionic bond between NH₃ and H⁺; square planar", "The bond is covalent (dative), and the shape is tetrahedral."],
          ["a dative bond from N to H⁺; pyramidal, 107°", "The lone pair is used in bonding, so the shape is tetrahedral."],
        ], answer: "A", explanation: "N's lone pair forms a dative bond to H⁺; four bonding pairs give a tetrahedron." }),
        P.num({ label: "(c)", marks: 2, stem: "0.749 g of ammonium chloride is warmed with excess aqueous sodium hydroxide. Calculate the volume of ammonia given off, in cm³ at room conditions, to three significant figures. (Mr NH₄Cl 53.5; molar gas volume at room conditions 24 000 cm³ mol⁻¹)", value: v, sf: 3, unit: "cm³", wrong: [sfStr(v / 1000, 3)], explanation: `n = 0.749 ÷ 53.5 = ${sfStr(n, 3)} mol = n(NH₃); V = ${sfStr(n, 3)} × 24 000 = ${sfStr(v, 3)} cm³.` }),
        P.short({ label: "(d)", marks: 1, stem: "Write the ionic equation for the reaction in (c) (type, e.g., A + B -> C + D).", accepted: ["NH4+ + OH- -> NH3 + H2O", "NH4+ + OH- → NH3 + H2O", "NH₄⁺ + OH⁻ → NH₃ + H₂O"], normalise: ["trim", "collapse_whitespace"], wrong: ["NH3 + H2O -> NH4+ + OH-"], explanation: "NH₄⁺ + OH⁻ → NH₃ + H₂O (an acid-base reaction)." }),
        P.short({ label: "(e)", marks: 1, stem: "Write the equation for the reaction in a catalytic converter that removes both carbon monoxide and nitrogen monoxide (type, e.g., 2A + 2B -> 2C + D).", accepted: ["2CO + 2NO -> 2CO2 + N2", "2CO + 2NO → 2CO2 + N2", "2NO + 2CO -> N2 + 2CO2", "2NO + 2CO → N2 + 2CO2"], normalise: ["trim", "collapse_whitespace"], wrong: ["CO + NO -> CO2 + N"], explanation: "2CO + 2NO → 2CO₂ + N₂." }),
        P.manual({ label: "(f)", marks: 2, stem: "Nitrogen dioxide acts as a catalyst in the oxidation of sulfur dioxide in the atmosphere. Write two equations to show this.", points: ["NO₂ + SO₂ → NO + SO₃", "NO + ½O₂ → NO₂ (NO₂ regenerated)"], modelAnswer: "NO₂ + SO₂ → NO + SO₃, then NO + ½O₂ → NO₂; the NO₂ is regenerated, so it is a catalyst." }),
        P.tf({ label: "(g)", stem: "Peroxyacetyl nitrate (PAN) in photochemical smog forms from oxides of nitrogen and unburnt hydrocarbons.", answer: true, explanation: "True: NOₓ + hydrocarbons + sunlight → PAN." }),
      ]),
      hints: ["N≡N bond energy is 944 kJ mol⁻¹.", "A catalyst is regenerated."],
      explanation: `N₂ is unreactive (strong, non-polar triple bond); NH₄⁺ is tetrahedral; ${sfStr(v, 3)} cm³ NH₃; converter 2CO + 2NO → 2CO₂ + N₂; NO₂ catalyses SO₂ oxidation.`,
    });
  }

  // ---------------------------------------------------------------- T6 (A Level): explaining Group 2 trends
  {
    const sol = (le, hm) => solutionEnthalpy(le, [hm, -460, -460]);
    const mg = sol(-2990, -1915);
    const sr = sol(-2455, -1475);
    b.struct({
      ...AL, d: 4, calculator: true,
      concepts: [A("group2.thermal-stability-solubility"), A("group2.reactions-uses")],
      stem: "Use these values (kJ mol⁻¹, given for this question) for two Group 2 hydroxides.\n\n| | Mg(OH)₂ | Sr(OH)₂ |\n|---|---|---|\n| lattice energy | −2990 | −2455 |\n| enthalpy change of hydration of M²⁺ | −1915 | −1475 |\n\nEnthalpy change of hydration of OH⁻: −460.",
      parts: checkExam(EXAM.THEORY10, [
        P.num({ label: "(a)", marks: 2, stem: "Calculate ΔH_sol of Mg(OH)₂, in kJ mol⁻¹.", value: mg, unit: "kJ/mol", wrong: [solutionEnthalpy(-2990, [-1915, -460])], explanation: `+2990 − 1915 − 2 × 460 = ${mg} kJ mol⁻¹. Using one OH⁻ gives ${solutionEnthalpy(-2990, [-1915, -460])}.` }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate ΔH_sol of Sr(OH)₂, in kJ mol⁻¹.", value: sr, unit: "kJ/mol", explanation: `+2455 − 1475 − 920 = ${sr} kJ mol⁻¹.` }),
        P.manual({ label: "(c)", marks: 3, stem: "Use the data to explain why strontium hydroxide is more soluble than magnesium hydroxide.", points: ["Both lattice energy and cation hydration enthalpy become less exothermic from Mg to Sr (larger cation)", "The lattice energy falls more (by 535) than the hydration enthalpy (by 440), because OH⁻ is small, so cation size matters a lot in the lattice", "So ΔH_sol is less endothermic for Sr(OH)₂, which is more soluble"], modelAnswer: "From Mg²⁺ to Sr²⁺ the cation is larger, so both the lattice energy and the hydration enthalpy of the cation become less exothermic. Because OH⁻ is small, the lattice energy falls more (535 kJ mol⁻¹) than the hydration enthalpy (440 kJ mol⁻¹). Less energy is needed to break the lattice relative to the energy released on hydration, so ΔH_sol is much less endothermic for Sr(OH)₂, which is more soluble." }),
        P.mcq({ label: "(d)", stem: "Which statement explains why magnesium carbonate decomposes at a lower temperature than strontium carbonate?", options: [
          ["Mg²⁺ has a higher charge density and polarises the carbonate ion more.", "Correct: a C–O bond in the anion is weakened more."],
          ["Mg²⁺ carries a larger positive charge than Sr²⁺ does.", "Both ions are 2+."],
          ["The carbonate ion polarises the Sr²⁺ ion more than the Mg²⁺ ion.", "It is the cation that polarises the anion."],
          ["Magnesium oxide has a smaller lattice energy than strontium oxide.", "MgO has the larger lattice energy."],
        ], answer: "A", explanation: "Smaller cation, same charge → greater polarisation of CO₃²⁻ → easier decomposition." }),
        P.manual({ label: "(e)", marks: 2, stem: "Predict, with a reason, how the thermal stability of barium nitrate compares with that of strontium nitrate.", points: ["Barium nitrate is more stable (decomposes at a higher temperature)", "Ba²⁺ is larger, lower charge density, polarises the nitrate ion less, so N–O bonds are weakened less"], modelAnswer: "Barium nitrate is more thermally stable. Ba²⁺ is larger than Sr²⁺, so it has a lower charge density and distorts the nitrate ion less, so the N–O bonds are weakened less and more heat is needed." }),
        P.tf({ label: "(f)", stem: "The sulfates of Group 2 become more soluble down the group.", answer: false, explanation: "False: sulfate solubility decreases down the group (BaSO₄ is insoluble)." }),
      ]),
      hints: ["ΔH_sol = −ΔH_latt + ΣΔH_hyd; count two OH⁻.", "Compare how much each term changes."],
      explanation: `ΔH_sol: Mg(OH)₂ ${mg}, Sr(OH)₂ ${sr} kJ mol⁻¹; lattice energy falls faster than hydration enthalpy for the small OH⁻ ion, so solubility increases; thermal stability increases down the group as charge density falls.`,
    });
  }
});
