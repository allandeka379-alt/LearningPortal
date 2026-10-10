// W3a: six THEORY10 items. Four on shared transition element concepts (Cambridge Paper 4, ZIMSEC Paper 2; no applies)
// and two on ZIMSEC-only element chemistry (iron and manganese; copper and nickel), applies ZIM, ZIMSEC Paper 2 only.
import { concept, P, t, EXAM, checkExam, ZIM, ecell, molesFromSolution, massLiberated, charge, sfStr, dpStr, sciStr } from "../lib.mjs";

const A = (k) => `achem.${k}`;
const AL = { skill: EXAM.THEORY10.skill, secs: EXAM.THEORY10.secs, examStyle: true, paper: "Paper 4 (CIE), Paper 2 (ZIMSEC)" };
const ZP2 = { skill: EXAM.THEORY10.skill, secs: EXAM.THEORY10.secs, examStyle: true, paper: "Paper 2", applies: ZIM };

concept(A("transition.general-properties"), { file: "exam/w3a-theory", keyPrefix: "exam.w3a-theory" }, (b) => {
  // ---------------------------------------------------------------- T1: transition element properties (shared, A Level)
  b.struct({
    ...AL, d: 3,
    concepts: [A("transition.general-properties")],
    stem: "Element **X** is in Period 4 of the Periodic Table. It forms two common ions, X²⁺ and X³⁺. The X³⁺ ion has the electron configuration [Ar] 3d⁵. X²⁺ and X³⁺ ions catalyse the reaction between peroxodisulfate ions and iodide ions:\n\n$\\ce{S2O8^2- + 2I- -> 2SO4^2- + I2}$",
    parts: checkExam(EXAM.THEORY10, [
      P.short({ label: "(a)", stem: "Identify element **X** (name or symbol).", accepted: ["iron", "Fe"], wrong: ["manganese"], explanation: "Fe: [Ar] 3d⁶4s²; Fe³⁺ loses the 4s electrons and one 3d electron: [Ar] 3d⁵." }),
      P.fib({ label: "(b)", stem: "Complete the electron configurations.", template: "atom of **X**: [Ar] {{blank:a}}; the X²⁺ ion: [Ar] {{blank:b}}", blanks: [
        { id: "a", accepted: ["3d⁶4s²"], choices: ["3d⁶4s²", "3d⁸", "3d⁵4s¹", "3d⁷4s¹"] },
        { id: "b", accepted: ["3d⁶"], choices: ["3d⁴4s²", "3d⁶", "3d⁵4s¹", "3d⁵"] },
      ], explanation: "4s electrons are lost first: Fe [Ar] 3d⁶4s², Fe²⁺ [Ar] 3d⁶." }),
      P.mcq({ label: "(c)", stem: "Why is zinc not classed as a transition element?", options: [
        ["Its only ion, Zn²⁺, has a full 3d sub-shell.", "Correct: Zn²⁺ is [Ar] 3d¹⁰."],
        ["It has no electrons in the 3d sub-shell.", "Zinc has ten 3d electrons."],
        ["It does not form any positive ions.", "Zinc forms Zn²⁺."],
        ["It is in the s-block of the Periodic Table.", "Zinc is in the d-block."],
      ], answer: "A", explanation: "A transition element forms at least one stable ion with an incomplete d sub-shell." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why transition elements show variable oxidation states.", points: ["The 3d and 4s sub-shells are close in energy", "So different numbers of electrons (4s and 3d) can be lost or used in bonding with similar energy input, giving several stable states"], modelAnswer: "The 3d and 4s electrons have similar energies, so a variable number of them can be removed or used in bonding without a large jump in ionisation energy, giving several stable oxidation states." }),
      P.num({ label: "(e)", stem: "Give the highest oxidation state shown by manganese in its compounds.", value: 7, wrong: [2], explanation: "+7 (in MnO₄⁻): all seven 4s and 3d electrons are used." }),
      P.manual({ label: "(f)", marks: 3, stem: "Explain, with two equations, how Fe²⁺ ions catalyse the reaction between peroxodisulfate and iodide ions, and why the uncatalysed reaction is slow.", points: [t`$\ce{S2O8^2- + 2Fe^2+ -> 2SO4^2- + 2Fe^3+}$`, t`$\ce{2Fe^3+ + 2I- -> 2Fe^2+ + I2}$ (Fe²⁺ regenerated)`, "Uncatalysed: two negative ions repel, so the activation energy is high; each catalysed step is between oppositely charged ions (lower activation energy)"], modelAnswer: "S₂O₈²⁻ + 2Fe²⁺ → 2SO₄²⁻ + 2Fe³⁺, then 2Fe³⁺ + 2I⁻ → 2Fe²⁺ + I₂, so the iron(II) is regenerated. The uncatalysed reaction is between two negative ions, which repel, giving a high activation energy; in each catalysed step the ions have opposite charges, so the activation energy is lower. This works because iron can change between the +2 and +3 states." }),
    ]),
    hints: ["Transition metal atoms lose 4s electrons before 3d electrons.", "A homogeneous catalyst must be regenerated."],
    explanation: "X = Fe; variable oxidation states arise from close 3d and 4s energies; Fe²⁺/Fe³⁺ catalysis by two steps between oppositely charged ions.",
  });

  // ---------------------------------------------------------------- T2: copper(II) complexes and colour (shared, A Level)
  b.struct({
    ...AL, d: 4,
    concepts: [A("transition.complexes-ligands"), A("transition.colour")],
    stem: "Tendai carried out these reactions starting from aqueous copper(II) sulfate, which contains $\\ce{[Cu(H2O)6]^2+}$.\n\n| step | reagent | observation |\n|---|---|---|\n| 1 | aqueous ammonia, a few drops | pale blue precipitate |\n| 2 | aqueous ammonia, in excess | precipitate dissolves; deep blue solution |\n| 3 | concentrated hydrochloric acid added to fresh copper(II) sulfate | yellow-green solution |",
    parts: checkExam(EXAM.THEORY10, [
      P.mcq({ label: "(a)", stem: "What is the shape of the copper complex formed in step 3?", options: [
        ["tetrahedral", "Correct: [CuCl₄]²⁻, four large chloride ligands."],
        ["octahedral", "Six chloride ions do not fit round Cu²⁺."],
        ["linear", "Linear complexes have two ligands, e.g. [Ag(NH₃)₂]⁺."],
        ["trigonal planar", "Three-coordinate complexes are not formed here."],
      ], answer: "A", explanation: "[CuCl₄]²⁻ is tetrahedral (coordination number 4)." }),
      P.short({ label: "(b)", stem: "Give the formula of the deep blue complex ion in step 2. (Type it as, for example, [Ni(NH3)6]2+.)", accepted: ["[Cu(NH3)4(H2O)2]2+", "[Cu(NH3)4(H2O)2]^2+", "[Cu(NH₃)₄(H₂O)₂]²⁺", "[Cu(H2O)2(NH3)4]2+", "[Cu(NH3)4(H2O)2](2+)"], normalise: ["trim", "lowercase", "remove_whitespace"], wrong: ["[Cu(NH3)6]2+"], explanation: "Partial substitution: four NH₃ replace four H₂O." }),
      P.manual({ label: "(c)", marks: 2, stem: "Write equations for steps 1 and 2.", points: [t`Step 1: $\ce{[Cu(H2O)6]^2+ + 2NH3 -> Cu(OH)2(H2O)4 + 2NH4+}$ (or with 2OH⁻ forming Cu(OH)₂)`, t`Step 2: $\ce{Cu(OH)2(H2O)4 + 4NH3 -> [Cu(NH3)4(H2O)2]^2+ + 2OH- + 2H2O}$ (or from the aqua ion: $\ce{[Cu(H2O)6]^2+ + 4NH3 -> [Cu(NH3)4(H2O)2]^2+ + 4H2O}$)`], modelAnswer: "Step 1: [Cu(H₂O)₆]²⁺ + 2NH₃ → Cu(OH)₂(H₂O)₄ + 2NH₄⁺. Step 2: Cu(OH)₂(H₂O)₄ + 4NH₃ → [Cu(NH₃)₄(H₂O)₂]²⁺ + 2OH⁻ + 2H₂O." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why copper(II) complexes are coloured and why the colour changes in step 2.", points: ["Ligands split the 3d orbitals into two groups of different energy (ΔE)", "An electron is promoted from a lower to a higher d orbital by absorbing visible light of frequency matching ΔE; the complementary colour is seen", "Ammonia ligands give a different (larger) ΔE than water, so a different wavelength is absorbed and the colour changes"], modelAnswer: "In a complex the ligands split the five 3d orbitals into lower- and higher-energy sets separated by ΔE. Cu²⁺ (3d⁹) has a partly filled d sub-shell, so an electron can be promoted by absorbing visible light whose frequency corresponds to ΔE (ΔE = hf); the colour seen is the complementary colour. Ammonia ligands split the d orbitals by a different, larger amount than water, so a different frequency is absorbed and the colour changes from pale blue to deep blue." }),
      P.fib({ label: "(e)", stem: "Complete the statements about the deep blue complex.", template: "Coordination number of copper: {{blank:a}}. Overall charge on the complex ion: {{blank:b}}.", blanks: [
        { id: "a", accepted: ["6"], choices: ["2", "4", "6"] },
        { id: "b", accepted: ["2+"], choices: ["2−", "0", "2+", "4+"] },
      ], explanation: "Four NH₃ and two H₂O: six dative bonds; neutral ligands, so the charge is that of Cu²⁺." }),
      P.tf({ label: "(f)", stem: "In the deep blue complex, the energy gap ΔE between the split d orbitals is larger than in [Cu(H₂O)₆]²⁺.", answer: true, explanation: "True: ammonia splits the d orbitals more, so light of higher frequency is absorbed." }),
    ]),
    hints: ["Ammonia acts first as a base, then as a ligand.", "Colour: absorbed frequency is linked to ΔE."],
    explanation: "Cu(OH)₂ precipitate, then ligand exchange to [Cu(NH₃)₄(H₂O)₂]²⁺; [CuCl₄]²⁻ is tetrahedral; colour from d-d transitions whose ΔE depends on the ligand.",
  });

  // ---------------------------------------------------------------- T3: stereoisomerism (shared, A Level)
  b.struct({
    ...AL, d: 4,
    concepts: [A("transition.stereoisomerism"), A("transition.complexes-ligands")],
    stem: "This question is about isomerism in complexes of platinum(II) and nickel(II). 1,2-diaminoethane, H₂NCH₂CH₂NH₂, is abbreviated to *en*.\n\n| complex | geometry |\n|---|---|\n| [Pt(NH₃)₂Cl₂] | square planar |\n| [Ni(en)₃]²⁺ | octahedral |\n| [Ni(en)₂(H₂O)₂]²⁺ | octahedral |",
    parts: checkExam(EXAM.THEORY10, [
      P.short({ label: "(a)", stem: "State the type of ligand that *en* is, in terms of the number of dative bonds it forms.", accepted: ["bidentate", "bidentate ligand", "a bidentate ligand"], wrong: ["monodentate"], explanation: "Each en forms two dative bonds, one from each nitrogen lone pair." }),
      P.mcq({ label: "(b)", stem: "What type of stereoisomerism does [Pt(NH₃)₂Cl₂] show?", options: [
        ["cis/trans (geometrical) only", "Correct: square planar with two pairs of identical ligands."],
        ["optical only", "A square planar complex has a plane of symmetry, so it is not chiral."],
        ["both cis/trans and optical", "Neither isomer is chiral."],
        ["structural isomerism only", "The isomers differ in spatial arrangement, not in connectivity."],
      ], answer: "A", explanation: "Cis (the anticancer drug cisplatin) and trans isomers." }),
      P.manual({ label: "(c)", marks: 2, stem: "Describe the two isomers of [Pt(NH₃)₂Cl₂] in words and state which one is polar.", points: ["Cis: the two Cl ligands are next to each other (90°); trans: the two Cl ligands are opposite each other (180°)", "The cis isomer is polar (dipoles do not cancel); the trans isomer is non-polar (dipoles cancel)"], modelAnswer: "In the cis isomer the two chloride ligands are adjacent, at 90° to each other; in the trans isomer they are opposite, at 180°. The cis isomer has an overall dipole and is polar; in the trans isomer the bond dipoles cancel, so it is non-polar." }),
      P.mcq({ label: "(d)", stem: "Which of the complexes in the table exists as a pair of non-superimposable mirror images?", options: [
        ["[Ni(en)₃]²⁺", "Correct: three bidentate ligands make a chiral propeller shape."],
        ["[Pt(NH₃)₂Cl₂]", "Square planar complexes have a plane of symmetry."],
        ["trans-[Ni(en)₂(H₂O)₂]²⁺", "The trans isomer has a plane of symmetry."],
        ["[Ni(H₂O)₆]²⁺", "Six identical monodentate ligands: no isomers."],
      ], answer: "A", explanation: "[Ni(en)₃]²⁺ is chiral." }),
      P.num({ label: "(e)", stem: "How many stereoisomers does [Ni(en)₂(H₂O)₂]²⁺ have in total?", value: 3, wrong: [2], explanation: "Trans (one, achiral) and cis (a pair of optical isomers): 3." }),
      P.manual({ label: "(f)", marks: 2, stem: "Explain why [Ni(en)₃]²⁺ shows optical isomerism and how the two isomers could be distinguished.", points: ["The complex has no plane of symmetry, so it and its mirror image are non-superimposable (chiral)", "The two enantiomers rotate plane-polarised light by equal amounts in opposite directions"], modelAnswer: "The three bidentate en ligands are arranged like a propeller with no plane of symmetry, so the complex is chiral: its mirror image cannot be superimposed on it. The two optical isomers rotate the plane of plane-polarised light by the same angle in opposite directions." }),
      P.tf({ label: "(g)", stem: "Cisplatin works as an anticancer drug because it binds to DNA, preventing cancer cells from dividing.", answer: true, explanation: "True: after ligand exchange of Cl⁻, platinum binds to nitrogen atoms of guanine bases." }),
      P.num({ label: "(h)", stem: "Give the Cl–Pt–Cl bond angle, in degrees, in the trans isomer of [Pt(NH₃)₂Cl₂].", value: 180, wrong: [90], explanation: "Opposite corners of the square: 180°." }),
    ]),
    hints: ["Look for a plane of symmetry.", "Cis: adjacent; trans: opposite."],
    explanation: "en is bidentate; [Pt(NH₃)₂Cl₂] has cis/trans isomers (cis polar); [Ni(en)₃]²⁺ is chiral; [Ni(en)₂(H₂O)₂]²⁺ has three stereoisomers.",
  });

  // ---------------------------------------------------------------- T4: stability constants (shared, A Level)
  {
    const K = { Cl: 4.2e5, NH3: 1.2e13, EDTA: 6.3e18 };
    const cu = 0.04 / (K.Cl * 5 ** 4);
    b.struct({
      ...AL, d: 4, calculator: true,
      concepts: [A("transition.stability-constants"), A("transition.complexes-ligands")],
      stem: "Stability constants of some copper(II) complexes at 298 K (data: textbook values).\n\n| complex | Kstab |\n|---|---|\n| [CuCl₄]²⁻ | 4.2 × 10⁵ mol⁻⁴ dm¹² |\n| [Cu(NH₃)₄(H₂O)₂]²⁺ | 1.2 × 10¹³ mol⁻⁴ dm¹² |\n| [Cu(EDTA)]²⁻ | 6.3 × 10¹⁸ mol⁻¹ dm³ |",
      parts: checkExam(EXAM.THEORY10, [
        P.manual({ label: "(a)", marks: 1, stem: "Define the stability constant, Kstab, of a complex ion.", points: ["The equilibrium constant for the formation of the complex ion from its constituent (aqua) metal ion and ligands in a solvent"], modelAnswer: "Kstab is the equilibrium constant for the formation of a complex ion in a solvent from its constituent ions or molecules." }),
        P.mcq({ label: "(b)", stem: "Which is the expression for Kstab of [CuCl₄]²⁻?", options: [
          [t`$\dfrac{[\ce{CuCl4^2-}]}{[\ce{Cu^2+}][\ce{Cl-}]^4}$`, "Correct: products over reactants, water omitted."],
          [t`$\dfrac{[\ce{Cu^2+}][\ce{Cl-}]^4}{[\ce{CuCl4^2-}]}$`, "This is the inverse (the instability constant)."],
          [t`$\dfrac{[\ce{CuCl4^2-}]}{[\ce{Cu^2+}][\ce{Cl-}]}$`, "The chloride term must be raised to the power 4."],
          [t`$\dfrac{[\ce{CuCl4^2-}][\ce{H2O}]^6}{[\ce{Cu^2+}][\ce{Cl-}]^4}$`, "Water, the solvent, is not included."],
        ], answer: "A", explanation: "Kstab = [CuCl₄²⁻]/([Cu²⁺][Cl⁻]⁴)." }),
        P.num({ label: "(c)", marks: 2, stem: "In a solution at equilibrium, [CuCl₄²⁻] = 0.0400 mol dm⁻³ and [Cl⁻] = 5.00 mol dm⁻³. Calculate [Cu²⁺(aq)], in mol dm⁻³, to three significant figures.", value: cu, sf: 3, unit: "mol/dm³", wrong: [sciStr(0.04 / (K.Cl * 5), 3)], explanation: `[Cu²⁺] = 0.0400 ÷ (4.2 × 10⁵ × 5.00⁴) = 0.0400 ÷ ${sciStr(K.Cl * 625, 3)} = ${sciStr(cu, 3)} mol dm⁻³. Forgetting the power of 4 gives ${sciStr(0.04 / (K.Cl * 5), 3)}.` }),
        P.mcq({ label: "(d)", stem: "Which list shows the complexes in order of increasing stability?", options: [
          ["[CuCl₄]²⁻ < [Cu(NH₃)₄(H₂O)₂]²⁺ < [Cu(EDTA)]²⁻", "Correct: larger Kstab means a more stable complex."],
          ["[Cu(EDTA)]²⁻ < [Cu(NH₃)₄(H₂O)₂]²⁺ < [CuCl₄]²⁻", "This is decreasing stability."],
          ["[Cu(NH₃)₄(H₂O)₂]²⁺ < [CuCl₄]²⁻ < [Cu(EDTA)]²⁻", "Kstab for the chloro complex is the smallest."],
          ["[CuCl₄]²⁻ < [Cu(EDTA)]²⁻ < [Cu(NH₃)₄(H₂O)₂]²⁺", "EDTA has by far the largest Kstab."],
        ], answer: "A", explanation: "4.2 × 10⁵ < 1.2 × 10¹³ < 6.3 × 10¹⁸ (comparing complexes of the same metal)." }),
        P.manual({ label: "(e)", marks: 2, stem: "Aqueous EDTA⁴⁻ is added to the deep blue solution of [Cu(NH₃)₄(H₂O)₂]²⁺. Predict what happens and explain the chelate effect.", points: ["EDTA replaces the ammonia and water ligands (ligand exchange) because [Cu(EDTA)]²⁻ has a much larger Kstab; the deep blue colour fades to a paler blue", "One hexadentate EDTA⁴⁻ releases six ligand molecules, so the number of particles increases and ΔS is positive, favouring the chelate"], modelAnswer: "EDTA⁴⁻ displaces the ammonia and water ligands because its complex is far more stable (Kstab 6.3 × 10¹⁸), and the deep blue colour becomes paler. One EDTA⁴⁻ ion replaces six monodentate ligands: [Cu(NH₃)₄(H₂O)₂]²⁺ + EDTA⁴⁻ → [Cu(EDTA)]²⁻ + 4NH₃ + 2H₂O, so the number of particles rises, the entropy change is positive, and the chelate complex is favoured." }),
        P.num({ label: "(f)", stem: "Calculate lg Kstab (log₁₀ Kstab) for [Cu(EDTA)]²⁻, to one decimal place.", value: Math.log10(K.EDTA), dp: 1, explanation: `log₁₀(6.3 × 10¹⁸) = ${dpStr(Math.log10(K.EDTA), 1)}.` }),
        P.tf({ label: "(g)", stem: "Adding concentrated hydrochloric acid to [Cu(EDTA)]²⁻ would readily convert it into [CuCl₄]²⁻.", answer: false, explanation: "False: Kstab for the EDTA complex is about 10¹³ times larger, so chloride cannot displace EDTA significantly." }),
        P.num({ label: "(h)", stem: "How many dative bonds does one EDTA⁴⁻ ion form to the copper(II) ion?", value: 6, wrong: [4], explanation: "EDTA⁴⁻ is hexadentate: two N and four O donor atoms." }),
      ]),
      hints: ["Kstab = [complex]/([M²⁺][L]ⁿ); water is not included.", "A larger Kstab means a more stable complex."],
      explanation: `[Cu²⁺] = ${sciStr(cu, 3)} mol dm⁻³; stability Cl⁻ < NH₃ < EDTA; EDTA wins by the chelate (entropy) effect.`,
    });
  }

  // ---------------------------------------------------------------- T5: iron and manganese (ZIMSEC only)
  {
    const nMn = molesFromSolution(23.40, 0.0200);
    const c = (5 * nMn) / 0.025;
    const e = ecell(1.52, 0.77);
    b.struct({
      ...ZP2, d: 3, calculator: true,
      concepts: [A("transition.iron"), A("transition.manganese")],
      stem: "Nyasha standardised a solution of iron(II) ammonium sulfate. 25.0 cm³ portions, acidified with dilute sulfuric acid, needed a mean titre of 23.40 cm³ of 0.0200 mol dm⁻³ potassium manganate(VII). Data (E⦵ / V): MnO₄⁻ + 8H⁺ + 5e⁻ ⇌ Mn²⁺ + 4H₂O +1.52; Fe³⁺ + e⁻ ⇌ Fe²⁺ +0.77; O₂ + 4H⁺ + 4e⁻ ⇌ 2H₂O +1.23.",
      parts: checkExam(EXAM.THEORY10, [
        P.manual({ label: "(a)", marks: 2, stem: "Construct the ionic equation for the titration reaction.", points: ["Correct species: MnO₄⁻, H⁺ and Fe²⁺ forming Mn²⁺, Fe³⁺ and H₂O", t`Balanced: $\ce{MnO4- + 8H+ + 5Fe^2+ -> Mn^2+ + 5Fe^3+ + 4H2O}$`], modelAnswer: "MnO₄⁻ + 8H⁺ + 5Fe²⁺ → Mn²⁺ + 5Fe³⁺ + 4H₂O (charge +17 on each side)." }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the concentration of iron(II), in mol dm⁻³, to three significant figures.", value: c, sf: 3, unit: "mol/dm³", wrong: [sfStr(nMn / 0.025, 3)], explanation: `n(MnO₄⁻) = 0.02340 × 0.0200 = ${sciStr(nMn, 3)} mol; n(Fe²⁺) = 5 × = ${sciStr(5 * nMn, 3)} mol; c = ÷ 0.0250 = ${sfStr(c, 3)} mol dm⁻³.` }),
        P.num({ label: "(c)", stem: "Calculate E⦵cell, in V, for the titration reaction, to two decimal places.", value: e, dp: 2, unit: "V", explanation: `1.52 − 0.77 = +${dpStr(e, 2)} V.` }),
        P.mcq({ label: "(d)", stem: "What is the colour change at the end-point?", options: [
          ["colourless to pale pink", "Correct: the first excess of MnO₄⁻."],
          ["purple to colourless", "That happens to each drop before the end-point."],
          ["orange to green", "That is dichromate(VI)."],
          ["blue-black to colourless", "That is an iodine-starch end-point."],
        ], answer: "A", explanation: "Manganate(VII) is self-indicating." }),
        P.manual({ label: "(e)", marks: 2, stem: "Use the data to explain why iron(II) solutions must be freshly prepared or standardised just before use.", points: ["E⦵cell for oxidation of Fe²⁺ by oxygen = 1.23 − 0.77 = +0.46 V, so it is feasible", "Dissolved oxygen slowly oxidises Fe²⁺ to Fe³⁺ (4Fe²⁺ + O₂ + 4H⁺ → 4Fe³⁺ + 2H₂O), so the Fe²⁺ concentration falls with time"], modelAnswer: "For 4Fe²⁺ + O₂ + 4H⁺ → 4Fe³⁺ + 2H₂O, E⦵cell = 1.23 − 0.77 = +0.46 V, so air oxidises iron(II). The reaction is slow, but the iron(II) concentration falls on standing, so the solution must be made fresh or standardised just before use." }),
        P.short({ label: "(f)", stem: "Name a reagent that gives a deep red colour if the iron(II) solution contains some iron(III).", accepted: ["potassium thiocyanate", "thiocyanate", "KSCN", "ammonium thiocyanate", "NH4SCN", "thiocyanate ions"], wrong: ["potassium hexacyanoferrate(III)"], explanation: "Thiocyanate gives deep red [Fe(SCN)(H₂O)₅]²⁺." }),
        P.tf({ label: "(g)", stem: "Hydrochloric acid would be a suitable acid for this titration.", answer: false, explanation: "False: MnO₄⁻ would oxidise Cl⁻ to Cl₂ (E⦵cell = 1.52 − 1.36 = +0.16 V), giving a high titre." }),
      ]),
      hints: ["One MnO₄⁻ reacts with five Fe²⁺.", "Compare E⦵ for O₂/H₂O and Fe³⁺/Fe²⁺."],
      explanation: `[Fe²⁺] = ${sfStr(c, 3)} mol dm⁻³; E⦵cell = +${dpStr(e, 2)} V; air oxidises Fe²⁺ (+0.46 V).`,
    });
  }

  // ---------------------------------------------------------------- T6: copper and nickel (ZIMSEC only)
  {
    const e = ecell(0.52, 0.15);
    const m = massLiberated(charge(4.0, 2 * 3600), 63.5, 2);
    b.struct({
      ...ZP2, d: 4, calculator: true,
      concepts: [A("transition.copper"), A("transition.cobalt-nickel")],
      stem: "This question is about copper and nickel. Data (E⦵ / V): Cu⁺ + e⁻ ⇌ Cu +0.52; Cu²⁺ + e⁻ ⇌ Cu⁺ +0.15. (Ar Cu = 63.5; F = 9.65 × 10⁴ C mol⁻¹)",
      parts: checkExam(EXAM.THEORY10, [
        P.num({ label: "(a)", stem: "Calculate E⦵cell, in V, for 2Cu⁺(aq) → Cu(s) + Cu²⁺(aq), to two decimal places.", value: e, dp: 2, unit: "V", wrong: [dpStr(-e, 2)], explanation: `0.52 − 0.15 = +${dpStr(e, 2)} V: copper(I) disproportionates.` }),
        P.manual({ label: "(b)", marks: 2, stem: "Copper(I) oxide is warmed with dilute sulfuric acid. State what is seen and write the equation.", points: ["A pink-brown solid (copper) and a blue solution (copper(II) sulfate) form", t`$\ce{Cu2O + H2SO4 -> Cu + CuSO4 + H2O}$`], modelAnswer: "A pink-brown deposit of copper forms in a blue solution: Cu₂O + H₂SO₄ → Cu + CuSO₄ + H₂O." }),
        P.mcq({ label: "(c)", stem: "Why is copper(I) iodide stable even though Cu⁺(aq) disproportionates?", options: [
          ["It is insoluble, so very little free Cu⁺(aq) is present.", "Correct: precipitation removes Cu⁺ from solution."],
          ["Iodide ions oxidise copper(I) to copper(II).", "Iodide is a reducing agent, not an oxidising agent here."],
          ["Copper(I) iodide has a partly filled d sub-shell.", "Cu⁺ is d¹⁰."],
          ["The iodide ion is a bidentate ligand.", "Iodide is monodentate; the key is insolubility."],
        ], answer: "A", explanation: "Insoluble CuI keeps [Cu⁺(aq)] tiny, so disproportionation cannot occur." }),
        P.num({ label: "(d)", marks: 2, stem: "In the electrolytic purification of copper, a current of 4.00 A flows for 2.00 hours. Calculate the mass of copper deposited, in g, to three significant figures.", value: m, sf: 3, unit: "g", wrong: [sfStr(m * 2, 3)], explanation: `Q = 4.00 × 7200 = ${sciStr(charge(4, 7200), 3)} C; n(Cu) = Q ÷ (2F) = ${sciStr(charge(4, 7200) / 1.93e5, 3)} mol; mass = × 63.5 = ${sfStr(m, 3)} g.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Give two uses of nickel and the property each depends on.", points: ["Hydrogenation catalyst for making margarine (adsorbs H₂ and C=C compounds on its surface)", "Stainless steel / cupronickel coins / alnico magnets (corrosion resistance, hardness or magnetism)"], modelAnswer: "Finely divided nickel catalyses the hydrogenation of vegetable oils to margarine because reactants adsorb on its surface; nickel is alloyed in stainless steel, which resists corrosion." }),
        P.short({ label: "(f)", stem: "Name the alloy of copper and tin.", accepted: ["bronze"], wrong: ["brass"], explanation: "Bronze (brass is copper and zinc)." }),
        P.tf({ label: "(g)", stem: "In the electrolytic purification of copper, gold impurities collect in the anode slime.", answer: true, explanation: "True: gold is not oxidised at the anode." }),
      ]),
      hints: ["Cu⁺ is both reduced and oxidised.", "Q = It; Cu²⁺ + 2e⁻ → Cu."],
      explanation: `Disproportionation +${dpStr(e, 2)} V; ${sfStr(m, 3)} g of copper deposited.`,
    });
  }
});
