// W1a: six THEORY10 items (ZIMSEC Paper 2, Cambridge Paper 2: AS content) on atoms, stoichiometry, bonding and states.
import { concept, P, t, chk, EXAM, checkExam, arFromIsotopes, mrFromGas, Mr, moles, massOf, molesFromSolution, percentYield, R, VM_RTP, cToK, kPaToPa, cm3ToM3, sfStr } from "../lib.mjs";

const A = (k) => `achem.${k}`;
const TH = { skill: EXAM.THEORY10.skill, secs: EXAM.THEORY10.secs, examStyle: true, paper: "Paper 2" };

concept(A("atoms.ionisation-energy"), { file: "exam/w1a-theory", keyPrefix: "exam.w1a-theory" }, (b) => {
  // ---------------------------------------------------------------- T1: lithium isotopes and ionisation energies
  {
    const ar = arFromIsotopes([[6, 7.6], [7, 92.4]]);
    b.struct({
      ...TH, d: 3,
      concepts: [A("atoms.ionisation-energy"), A("atoms.particles-isotopes"), A("stoich.relative-masses-mole"), A("atoms.orbitals-configurations")],
      stem: "Lithium is used in the rechargeable batteries of mobile phones and is mined in Zimbabwe. Natural lithium contains 7.6% lithium-6 and 92.4% lithium-7. The first three ionisation energies of lithium are 519, 7300 and 11 800 kJ mol⁻¹.",
      parts: checkExam(EXAM.THEORY10, [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the relative atomic mass of lithium to three significant figures.", value: ar, wrong: [6.5], explanation: `(6 × 7.6 + 7 × 92.4) ÷ 100 = ${ar.toFixed(3)} ≈ ${sfStr(ar, 3)}.` }),
        P.manual({ label: "(b)", marks: 2, stem: "Define the term *first ionisation energy*.", points: ["Energy needed to remove one electron from each atom in one mole of atoms", "of gaseous atoms to form one mole of gaseous 1+ ions"], modelAnswer: "The energy required to remove one electron from each atom in one mole of gaseous atoms to form one mole of gaseous 1+ ions." }),
        P.short({ label: "(c)", marks: 1, stem: "Write an equation, with state symbols, for the second ionisation energy of lithium (type, e.g., X+(g) -> X2+(g) + e-).", accepted: ["Li+(g) -> Li2+(g) + e-", "Li+(g) → Li2+(g) + e-", "Li+(g) -> Li2+(g) + e", "Li+(g) → Li²⁺(g) + e⁻", "Li+ (g) -> Li2+ (g) + e-"], normalise: ["trim", "lowercase", "collapse_whitespace"], wrong: ["Li(g) -> Li2+(g) + 2e-"], explanation: "One electron from each gaseous Li⁺ ion." }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain the very large increase from the first to the second ionisation energy.", points: ["The second electron is removed from the first shell (1s), closer to the nucleus", "It has much less shielding (no inner electrons) and is removed from a positive ion, so attraction is much greater"], modelAnswer: "The first electron comes from 2s; the second must come from the 1s shell, much closer to the nucleus with no inner electrons shielding it, and it is removed from a positive ion, so far more energy is needed." }),
        P.short({ label: "(e)", marks: 1, stem: "Give the full electron configuration of the Li⁺ ion.", accepted: ["1s2", "1s^2", "1s²"], wrong: ["1s2 2s1"], explanation: "Li is 1s² 2s¹; Li⁺ is 1s²." }),
        P.manual({ label: "(f)", marks: 2, stem: "Predict, with a reason, how the first ionisation energy of sodium compares with that of lithium.", points: ["Lower", "Sodium's outer electron is in the third shell: further from the nucleus and more shielded, outweighing the greater nuclear charge"], modelAnswer: "Lower: sodium's outer 3s electron is further from the nucleus and more shielded by inner shells, which outweighs its greater nuclear charge." }),
      ]),
      hints: ["Weighted mean for (a).", "Which shell does each electron come from?"],
      explanation: `Ar(Li) = ${sfStr(ar, 3)}; the jump from IE₁ to IE₂ shows one outer electron (Group 1).`,
      calculator: true,
    });
  }

  // ---------------------------------------------------------------- T2: baking soda decomposition
  {
    const n = moles(4.2, Mr("NaHCO3"));
    const vCO2 = (n / 2) * VM_RTP * 1000;
    const mNa2CO3 = massOf(n / 2, Mr("Na2CO3"));
    const y = percentYield(2.5, mNa2CO3);
    b.struct({
      ...TH, d: 3,
      concepts: [A("stoich.reacting-masses-yield"), A("stoich.formulae-equations"), A("stoich.relative-masses-mole")],
      stem: t`Sodium hydrogencarbonate (baking soda) makes dough rise because it decomposes on heating:

$\ce{2NaHCO3(s) -> Na2CO3(s) + H2O(g) + CO2(g)}$

Rudo heats 4.20 g of sodium hydrogencarbonate in a crucible until its mass is constant. (Ar: H 1.0, C 12.0, O 16.0, Na 23.0; molar volume 24.0 dm³ mol⁻¹ at room conditions)`,
      parts: checkExam(EXAM.THEORY10, [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the amount, in mol, of NaHCO₃ heated.", value: n, unit: "mol", wrong: [4.2 * 84], explanation: `Mr = 84.0; 4.20 ÷ 84.0 = ${sfStr(n, 3)} mol.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the volume, in cm³, of carbon dioxide produced, measured at room conditions.", value: vCO2, unit: "cm³", wrong: [n * VM_RTP * 1000], explanation: `n(CO₂) = ${sfStr(n, 3)} ÷ 2 = ${sfStr(n / 2, 3)} mol; × 24 000 = ${sfStr(vCO2, 3)} cm³.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the maximum mass, in g, of sodium carbonate that remains.", value: mNa2CO3, unit: "g", wrong: [n * 106], explanation: `${sfStr(n / 2, 3)} mol × 106.0 = ${sfStr(mNa2CO3, 3)} g.` }),
        P.num({ label: "(d)", marks: 1, stem: "Rudo's residue has a mass of 2.50 g. Calculate the percentage yield.", value: y, unit: "%", wrong: [(2.5 / 4.2) * 100], explanation: `2.50 ÷ ${sfStr(mNa2CO3, 3)} × 100 = ${sfStr(y, 3)}%.` }),
        P.manual({ label: "(e)", marks: 1, stem: "Explain why the crucible is heated to constant mass.", points: ["To make sure the decomposition is complete / all the CO₂ and H₂O have been driven off"], modelAnswer: "Constant mass shows that decomposition is complete and no more gas or water vapour is being lost." }),
        P.manual({ label: "(f)", marks: 2, stem: "Suggest two reasons why the mass of residue is less than the maximum.", points: ["Solid lost by spitting / escaping from the crucible during heating", "Some solid left on the spatula / weighing errors / some residue stuck when transferring (any valid loss)"], modelAnswer: "Some powder may have been carried out of the crucible by the escaping gases, and some may have been lost when the hot crucible was handled or the solid transferred." }),
        P.manual({ label: "(g)", marks: 1, stem: "Write the ionic equation for the reaction of sodium carbonate solution with dilute hydrochloric acid.", points: ["CO₃²⁻(aq) + 2H⁺(aq) → CO₂(g) + H₂O(l)"], modelAnswer: "CO₃²⁻(aq) + 2H⁺(aq) → CO₂(g) + H₂O(l)" }),
      ]),
      hints: ["Use the 2 : 1 ratios from the equation."],
      explanation: `n(NaHCO₃) ${sfStr(n, 3)} mol → CO₂ ${sfStr(vCO2, 3)} cm³ and Na₂CO₃ ${sfStr(mNa2CO3, 3)} g; yield ${sfStr(y, 3)}%.`,
      calculator: true,
    });
  }

  // ---------------------------------------------------------------- T3: an organic vapour: formula, Mr from pV = nRT, bonding
  {
    const M = mrFromGas(0.2, kPaToPa(101), cm3ToM3(140), cToK(100));
    b.struct({
      ...TH, d: 4,
      concepts: [A("states.gases"), A("stoich.formulae-equations"), A("bonding.orbitals-hybridisation")],
      stem: "Compound X contains 54.5% carbon, 9.1% hydrogen and 36.4% oxygen by mass. In a separate experiment, 0.200 g of X is vaporised at 100 °C and 101 kPa; the vapour occupies 140 cm³. (Ar: H 1.0, C 12.0, O 16.0; R = 8.31 J K⁻¹ mol⁻¹)",
      parts: checkExam(EXAM.THEORY10, [
        P.short({ label: "(a)", marks: 2, stem: "Calculate the empirical formula of X (type it as, e.g., CH2O).", accepted: ["C2H4O", "C₂H₄O"], normalise: ["trim", "collapse_whitespace"], wrong: ["CH2O"], explanation: "C 54.5/12.0 = 4.54; H 9.1/1.0 = 9.1; O 36.4/16.0 = 2.275; ÷ 2.275 → 2 : 4 : 1." }),
        P.num({ label: "(b)", marks: 2, stem: "Use pV = nRT to calculate the relative molecular mass of X.", value: M, wrong: [mrFromGas(0.2, 101, 140, 100)], explanation: `M = mRT/pV = 0.200 × 8.31 × 373 ÷ (1.01 × 10⁵ × 1.40 × 10⁻⁴) = ${sfStr(M, 3)}.` }),
        P.short({ label: "(c)", marks: 1, stem: "Deduce the molecular formula of X.", accepted: ["C2H4O", "C₂H₄O", "CH3CHO"], normalise: ["trim", "collapse_whitespace"], wrong: ["C4H8O2"], explanation: "Empirical formula mass 44.0 ≈ Mr, so C₂H₄O." }),
        P.manual({ label: "(d)", marks: 2, stem: "X is ethanal, CH₃CHO, which boils at 20 °C (data). Suggest why the Mr found in (b) is slightly less than the true value of 44.0, and why the experiment is done well above the boiling point.", points: ["Near its boiling point the vapour is not ideal (intermolecular forces / molecular volume), or some vaporised sample was lost, so the result differs", "Well above the boiling point all of X is vapour and behaves more nearly ideally"], modelAnswer: "Measurements on a vapour are affected by non-ideal behaviour and by small losses of the volatile sample before injection, so the value differs slightly from 44.0. Working well above the boiling point ensures all the sample is vapour and that it behaves more nearly as an ideal gas." }),
        P.num({ label: "(e)", marks: 1, stem: "How many σ bonds are there in one molecule of ethanal, CH₃CHO?", value: chk(4 + 1 + 1, 6), wrong: [7], explanation: "Four C–H, one C–C and the σ part of C=O: 6." }),
        P.num({ label: "(f)", marks: 1, stem: "How many π bonds are there in one molecule of ethanal?", value: 1, wrong: [2], explanation: "One, in the C=O bond." }),
        P.short({ label: "(g)", marks: 1, stem: "State the hybridisation of the carbon atom in the C=O group.", accepted: ["sp2", "sp²", "sp^2"], wrong: ["sp3"], explanation: "Three σ bonds and one π bond: sp², bond angles about 120°." }),
      ]),
      hints: ["Percentages ÷ Ar, then divide by the smallest.", "SI units in pV = nRT."],
      explanation: `Empirical and molecular formula C₂H₄O; Mr from the vapour ${sfStr(M, 3)}; 6 σ and 1 π bonds.`,
      calculator: true,
    });
  }

  // ---------------------------------------------------------------- T4: NH3, BF3 and the adduct
  b.struct({
    ...TH, d: 3,
    concepts: [A("bonding.shapes-vsepr"), A("bonding.covalent-dative"), A("bonding.intermolecular-forces"), A("bonding.ionic-metallic")],
    stem: "Ammonia, NH₃, reacts with boron trifluoride, BF₃, to form a white solid of formula H₃NBF₃. Electronegativities: H 2.1, B 2.0, N 3.0, F 4.0.",
    parts: checkExam(EXAM.THEORY10, [
      P.group({ label: "(a)", stem: "For the ammonia molecule:", parts: [
        P.short({ label: "(i)", marks: 1, stem: "name its shape;", accepted: ["pyramidal", "trigonal pyramidal", "trigonal pyramid"], wrong: ["trigonal planar"], explanation: "Three bonding pairs and one lone pair." }),
        P.short({ label: "(ii)", marks: 1, stem: "state the H–N–H bond angle.", accepted: ["107", "107°", "107 degrees", "about 107°"], wrong: ["109.5"], explanation: "107°." }),
      ] }),
      P.short({ label: "(b)", marks: 1, stem: "Name the shape of a BF₃ molecule.", accepted: ["trigonal planar", "triangular planar", "planar triangular"], wrong: ["pyramidal"], explanation: "Three bonding pairs, no lone pairs." }),
      P.num({ label: "(c)", marks: 1, stem: "Calculate the electronegativity difference in the B–F bond.", value: chk(4.0 - 2.0, 2), wrong: [6], explanation: "4.0 − 2.0 = 2.0." }),
      P.manual({ label: "(d)", marks: 2, stem: "Describe how the bond between the nitrogen and boron atoms forms in H₃NBF₃.", points: ["The lone pair on nitrogen is donated to boron", "Boron in BF₃ is electron-deficient (six outer electrons / empty orbital), so a coordinate (dative) bond forms"], modelAnswer: "Nitrogen donates its lone pair into the empty orbital of boron, which has only six outer electrons in BF₃, forming a coordinate (dative covalent) bond N→B." }),
      P.short({ label: "(e)", marks: 1, stem: "Name the shape of the bonds around the boron atom in H₃NBF₃.", accepted: ["tetrahedral", "tetrahedron"], wrong: ["trigonal planar"], explanation: "Four bonding pairs around B." }),
      P.num({ label: "(f)", marks: 1, stem: "How many electrons are in the outer shell of boron in H₃NBF₃?", value: 8, wrong: [6], explanation: "Three B–F pairs plus the donated pair: 8." }),
      P.manual({ label: "(g)", marks: 2, stem: "Ammonia (bp −33 °C) boils at a higher temperature than boron trifluoride (bp −100 °C, data), although BF₃ has more electrons. Explain this.", points: ["Ammonia molecules form hydrogen bonds (N–H and lone pair on N)", "BF₃ is non-polar with only instantaneous dipole-induced dipole forces, which are weaker overall"], modelAnswer: "NH₃ molecules are held by hydrogen bonds between the δ+ H atoms and the nitrogen lone pairs. BF₃ is a symmetrical non-polar molecule with only instantaneous dipole-induced dipole forces, which, despite its larger number of electrons, are weaker than the hydrogen bonds." }),
    ]),
    hints: ["Count bonding pairs and lone pairs.", "Which molecule has a lone pair; which has an empty orbital?"],
    explanation: "NH₃ pyramidal (107°); BF₃ trigonal planar; the dative N→B bond makes boron tetrahedral with an octet.",
  });

  // ---------------------------------------------------------------- T5: CO2 and SiO2
  b.struct({
    ...TH, d: 3,
    concepts: [A("states.lattice-structures"), A("bonding.intermolecular-forces"), A("bonding.shapes-vsepr")],
    stem: "Carbon and silicon are both in Group 14 (Group IV), but their dioxides are very different. Solid carbon dioxide sublimes at −78 °C; silicon(IV) oxide melts at about 1710 °C (data).",
    parts: checkExam(EXAM.THEORY10, [
      P.short({ label: "(a)", marks: 1, stem: "Name the type of lattice in solid carbon dioxide.", accepted: ["simple molecular", "molecular", "simple molecular lattice"], wrong: ["giant covalent"], explanation: "Separate CO₂ molecules." }),
      P.short({ label: "(b)", marks: 1, stem: "Name the type of lattice in silicon(IV) oxide.", accepted: ["giant covalent", "giant molecular", "macromolecular", "giant covalent lattice", "giant molecular lattice"], wrong: ["simple molecular"], explanation: "A continuous Si–O network." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain the large difference between the sublimation temperature of CO₂ and the melting point of SiO₂.", points: ["In CO₂ only weak intermolecular (instantaneous dipole-induced dipole) forces between molecules are overcome", "In SiO₂ many strong covalent Si–O bonds throughout the lattice must be broken", "So much more energy is needed for SiO₂"], modelAnswer: "Subliming CO₂ only overcomes weak instantaneous dipole-induced dipole forces between separate molecules. Melting SiO₂ requires breaking many strong covalent Si–O bonds that extend through the whole giant lattice, which needs far more energy." }),
      P.manual({ label: "(d)", marks: 2, stem: "Each C=O bond is polar, yet CO₂ is a non-polar molecule. Explain why.", points: ["CO₂ is linear (two bonding regions, no lone pairs on C)", "The two bond dipoles are equal and opposite, so they cancel"], modelAnswer: "CO₂ is linear because carbon has two regions of electron density and no lone pairs. The two equal C=O dipoles point in opposite directions and cancel." }),
      P.num({ label: "(e)", marks: 1, stem: "How many oxygen atoms is each silicon atom bonded to in SiO₂?", value: 4, wrong: [2], explanation: "Four, tetrahedrally." }),
      P.short({ label: "(f)", marks: 1, stem: "State the O–C–O bond angle in CO₂.", accepted: ["180", "180°", "180 degrees"], wrong: ["120"], explanation: "Linear: 180°." }),
      P.mcq({ label: "(g)", marks: 1, stem: "Which property would you expect silicon(IV) oxide to have?", options: [["insoluble in water and a non-conductor when molten", "Correct: giant covalent, no mobile charges."], ["soluble in water, giving a conducting solution", "SiO₂ does not dissolve."], ["conducts electricity when solid", "No delocalised electrons."], ["low density gas at room temperature", "It is a high-melting solid."]], answer: "A", explanation: "Giant covalent substances are insoluble non-conductors." }),
    ]),
    hints: ["What has to be overcome in each case?"],
    explanation: "CO₂: simple molecular, linear, non-polar. SiO₂: giant covalent, very high melting point.",
  });

  // ---------------------------------------------------------------- T6: hydrogen peroxide decomposition and gas volume
  {
    const nH2O2 = molesFromSolution(25.0, 0.8);
    const nO2 = nH2O2 / 2;
    const vRTP = nO2 * VM_RTP * 1000;
    const vIdeal = ((nO2 * R * cToK(30)) / kPaToPa(100)) * 1e6;
    b.struct({
      ...TH, d: 3,
      concepts: [A("states.gases"), A("stoich.solutions-titrations"), A("stoich.reacting-masses-yield"), A("bonding.orbitals-hybridisation")],
      stem: t`Hydrogen peroxide solution is used to disinfect wounds. It decomposes, with a catalyst, as follows:

$\ce{2H2O2(aq) -> 2H2O(l) + O2(g)}$

Tatenda decomposes 25.0 cm³ of 0.800 mol dm⁻³ hydrogen peroxide completely. (Mr of H₂O₂ = 34.0; R = 8.31 J K⁻¹ mol⁻¹; molar volume 24.0 dm³ mol⁻¹ at room conditions)`,
      parts: checkExam(EXAM.THEORY10, [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the amount, in mol, of H₂O₂ used.", value: nH2O2, unit: "mol", wrong: [25 * 0.8], explanation: `0.800 × 25.0/1000 = ${sfStr(nH2O2, 3)} mol.` }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate the volume, in cm³, of oxygen formed at room conditions.", value: vRTP, unit: "cm³", wrong: [nH2O2 * VM_RTP * 1000], explanation: `n(O₂) = ${sfStr(nO2, 3)} mol; × 24 000 = ${sfStr(vRTP, 3)} cm³.` }),
        P.num({ label: "(c)", marks: 2, stem: "Use pV = nRT to calculate the volume, in cm³, of this oxygen at 30 °C and 100 kPa.", value: vIdeal, unit: "cm³", wrong: [((nO2 * R * 30) / 1e5) * 1e6], explanation: `V = nRT/p = ${sfStr(nO2, 3)} × 8.31 × 303 ÷ 1.00 × 10⁵ = ${sfStr(vIdeal / 1e6, 3)} m³ = ${sfStr(vIdeal, 3)} cm³.` }),
        P.num({ label: "(d)", marks: 1, stem: "Calculate the concentration of the hydrogen peroxide solution in g dm⁻³.", value: 0.8 * 34.0, unit: "g/dm³", wrong: [0.8 / 34], explanation: "0.800 × 34.0 = 27.2 g dm⁻³." }),
        P.manual({ label: "(e)", marks: 2, stem: "State two assumptions of the kinetic theory that are needed for pV = nRT to apply exactly.", points: ["Gas molecules have negligible volume", "No intermolecular forces between the molecules (or: collisions perfectly elastic / random motion)"], modelAnswer: "The molecules have negligible volume compared with the container, and there are no intermolecular forces between them." }),
        P.manual({ label: "(f)", marks: 3, stem: "Describe the bonding in an oxygen molecule in terms of σ and π bonds, and state the number of lone pairs on each oxygen atom.", points: ["One σ bond from end-on overlap of p orbitals", "One π bond from sideways overlap of parallel p orbitals (O=O)", "Two lone pairs on each oxygen atom"], modelAnswer: "O₂ has a double bond: one σ bond formed by end-on overlap of 2p orbitals along the axis, and one π bond formed by sideways overlap of parallel 2p orbitals above and below it. Each oxygen atom also has two lone pairs." }),
      ]),
      hints: ["n = cV/1000; O₂ : H₂O₂ = 1 : 2.", "Convert °C to K."],
      explanation: `n(H₂O₂) ${sfStr(nH2O2, 3)}; O₂ ${sfStr(vRTP, 3)} cm³ (room conditions), ${sfStr(vIdeal, 3)} cm³ at 30 °C and 100 kPa.`,
      calculator: true,
    });
  }
});
