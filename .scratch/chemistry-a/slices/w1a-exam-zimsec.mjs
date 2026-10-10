// W1a: ZIMSEC-only exam-format items: three Paper 3 Section A free-response questions (15 marks) and one Paper 4
// quantitative analysis question (20 marks: water of crystallisation of hydrated sodium carbonate by titration).
import { concept, P, t, chk, same, EXAM, checkExam, ZIM, arFromIsotopes, Mr, mrFromGas, titre, meanTitre, molesFromSolution, pctErrorDifference, R, sfStr } from "../lib.mjs";

const A = (k) => `achem.${k}`;
const P3 = { skill: EXAM.ZIM_P3_FREE.skill, secs: EXAM.ZIM_P3_FREE.secs, applies: EXAM.ZIM_P3_FREE.applies, examStyle: true, paper: "Paper 3 Section A" };
const P4 = { skill: EXAM.ZIM_P4_QUANTITATIVE.skill, secs: EXAM.ZIM_P4_QUANTITATIVE.secs, applies: EXAM.ZIM_P4_QUANTITATIVE.applies, examStyle: true, paper: "Paper 4" };

concept(A("atoms.orbitals-configurations"), { file: "exam/w1a-zimsec", keyPrefix: "exam.w1a-zimsec", applies: ZIM }, (b) => {
  // ---------------------------------------------------------------- Z1: chromium isotopes, configurations, ionisation energy trend
  {
    const ar = arFromIsotopes([[50, 4.3], [52, 83.8], [53, 9.5], [54, 2.4]]);
    b.struct({
      ...P3, d: 4,
      concepts: [A("atoms.orbitals-configurations"), A("atoms.particles-isotopes"), A("atoms.ionisation-energy"), A("stoich.relative-masses-mole")],
      stem: "Chromium is extracted from chromite mined on the Great Dyke. A sample of chromium has the isotopic composition: chromium-50 4.3%, chromium-52 83.8%, chromium-53 9.5%, chromium-54 2.4%. (Chromium has proton number 24.)",
      parts: checkExam(EXAM.ZIM_P3_FREE, [
        P.manual({ label: "(a)", marks: 3, stem: "Define the terms *isotopes* and *relative atomic mass*.", points: ["Isotopes: atoms of the same element with the same number of protons but different numbers of neutrons", "Relative atomic mass: weighted mean mass of an atom of the element", "compared with one twelfth of the mass of an atom of carbon-12"], modelAnswer: "Isotopes are atoms of the same element with the same number of protons but different numbers of neutrons. Relative atomic mass is the weighted mean mass of an atom of an element compared with one twelfth of the mass of an atom of carbon-12." }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the relative atomic mass of chromium in the sample, to one decimal place.", value: ar, dp: 1, wrong: [52.25], explanation: `(50 × 4.3 + 52 × 83.8 + 53 × 9.5 + 54 × 2.4) ÷ 100 = ${ar.toFixed(3)} ≈ ${ar.toFixed(1)}.` }),
        P.group({ label: "(c)", stem: "Give the shorthand electron configuration (in the form [Ar] 3dˣ 4sʸ) of:", parts: [
          P.short({ label: "(i)", marks: 1, stem: "a chromium atom;", accepted: ["[Ar] 3d5 4s1", "[Ar]3d54s1", "[Ar] 4s1 3d5", "[Ar] 3d^5 4s^1", "[Ar] 3d⁵ 4s¹"], wrong: ["[Ar] 3d4 4s2"], explanation: "Chromium is an exception: [Ar] 3d⁵ 4s¹." }),
          P.short({ label: "(ii)", marks: 1, stem: "a Cr³⁺ ion.", accepted: ["[Ar] 3d3", "[Ar]3d3", "[Ar] 3d^3", "[Ar] 3d³"], wrong: ["[Ar] 3d1 4s2"], explanation: "Lose the 4s electron, then two 3d electrons: [Ar] 3d³." }),
        ] }),
        P.manual({
          label: "(d)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 300 },
          stem: "The first ionisation energies of the Period 3 elements generally increase from sodium to argon, but aluminium is lower than magnesium and sulfur is lower than phosphorus. Explain these observations.",
          points: [
            "Across the period the nuclear charge increases",
            "Electrons are added to the same shell, so shielding stays about the same and atomic radius decreases; outer electrons held more strongly",
            "Al: the electron removed is in a 3p orbital, higher in energy than 3s",
            "and is partly shielded by the 3s electrons, so less energy is needed than for Mg",
            "S: the electron removed is from a 3p orbital that contains a pair of electrons",
            "Spin-pair repulsion makes it easier to remove than an electron in P, whose 3p electrons are all unpaired",
          ],
          modelAnswer: "From sodium to argon the number of protons rises by one at each step, while the extra electrons go into the same third shell. Shielding by the inner electrons hardly changes and the atoms get smaller, so the outer electrons are attracted more strongly and the first ionisation energy generally increases.\n\nAluminium is lower than magnesium because its outermost electron is in a 3p orbital, which is higher in energy than magnesium's 3s orbital and partly shielded by the filled 3s sub-shell, so less energy is needed to remove it.\n\nSulfur is lower than phosphorus because in sulfur the fourth 3p electron has to pair up in an orbital that already holds one electron. The repulsion between the paired electrons makes one of them easier to remove, whereas in phosphorus the three 3p electrons are all unpaired.",
        }),
        P.manual({ label: "(e)", marks: 2, stem: "Beams of ⁵²Cr²⁺ and ⁵²Cr³⁺ ions travelling at the same speed pass through an electric field. State and explain which beam is deflected more.", points: ["Cr³⁺ is deflected more", "Same mass but larger charge, so larger charge-to-mass ratio"], modelAnswer: "The ⁵²Cr³⁺ beam is deflected more: both ions have the same mass, but Cr³⁺ has the greater charge and so the greater charge-to-mass ratio." }),
      ]),
      hints: ["Weighted mean for (b).", "Chromium is an exception to the filling order.", "Use nuclear charge, shielding, sub-shells and pairing."],
      explanation: `Ar(Cr) = ${ar.toFixed(1)}; Cr [Ar] 3d⁵ 4s¹, Cr³⁺ [Ar] 3d³; IE trend: nuclear charge with constant shielding, dips from the 3p sub-shell and spin-pair repulsion.`,
      calculator: true,
    });
  }

  // ---------------------------------------------------------------- Z2: bonding, shapes and the hydrogen halides
  b.struct({
    ...P3, d: 4,
    concepts: [A("bonding.covalent-dative"), A("bonding.shapes-vsepr"), A("bonding.intermolecular-forces"), A("bonding.orbitals-hybridisation")],
    stem: "This question is about covalent bonding and the forces between molecules.",
    parts: checkExam(EXAM.ZIM_P3_FREE, [
      P.manual({ label: "(a)", marks: 3, stem: "Explain what is meant by a covalent bond and by a dative (coordinate) bond, using the ammonium ion as an example of the second.", points: ["Covalent bond: attraction between two nuclei and a shared pair of electrons", "Dative bond: both electrons of the shared pair come from the same atom", "In NH₄⁺ the nitrogen lone pair of NH₃ is donated to H⁺ (which has an empty orbital)"], modelAnswer: "A covalent bond is the electrostatic attraction between two nuclei and a pair of electrons shared between them. In a dative (coordinate) bond both electrons of the shared pair come from one atom, as when ammonia's lone pair is donated to an H⁺ ion to form NH₄⁺." }),
      P.group({ label: "(b)", stem: "Predict:", parts: [
        P.short({ label: "(i)", marks: 1, stem: "the shape of a sulfur hexafluoride molecule, SF₆;", accepted: ["octahedral", "octahedron"], wrong: ["hexagonal"], explanation: "Six bonding pairs." }),
        P.short({ label: "(ii)", marks: 1, stem: "the shape of a hydrogen sulfide molecule, H₂S;", accepted: ["bent", "non-linear", "v-shaped", "angular", "non linear"], wrong: ["linear"], explanation: "Two bonding pairs, two lone pairs." }),
        P.short({ label: "(iii)", marks: 1, stem: "the H–N–H bond angle in the NH₄⁺ ion;", accepted: ["109.5", "109.5°", "109.5 degrees", "109°"], wrong: ["107"], explanation: "Four bonding pairs, tetrahedral." }),
        P.num({ label: "(iv)", marks: 1, stem: "the number of π bonds in a molecule of hydrogen cyanide, HCN.", value: 2, wrong: [3], explanation: "C≡N: one σ and two π." }),
      ] }),
      P.manual({
        label: "(c)", marks: 5, type: "EXTENDED_RESPONSE", wordLimit: { max: 250 },
        stem: "The boiling points of the hydrogen halides are (data, °C): HF 20, HCl −85, HBr −67, HI −35. Explain the trend from HCl to HI and the anomalous value for HF.",
        points: [
          "From HCl to HI the number of electrons increases",
          "So instantaneous dipole-induced dipole forces increase (outweighing the decrease in permanent dipole forces as polarity falls) and boiling point rises",
          "HF forms hydrogen bonds",
          "because F is small and highly electronegative, the H is strongly δ+ and is attracted to a lone pair on F of another molecule",
          "Hydrogen bonds are stronger than the other intermolecular forces, so more energy is needed to separate HF molecules",
        ],
        modelAnswer: "From HCl to HI the molecules have more electrons, so the instantaneous dipole-induced dipole forces between them become stronger. Although the bonds become less polar, so the permanent dipole forces weaken, the increase in temporary-dipole forces dominates, and the boiling point rises.\n\nHF is anomalous because it forms hydrogen bonds. Fluorine is small and the most electronegative element, so the hydrogen in H–F is strongly δ+ and is attracted to a lone pair on the fluorine of a neighbouring molecule. Hydrogen bonds are much stronger than the other intermolecular forces, so much more energy is needed to separate the molecules and HF boils at the highest temperature.",
      }),
      P.manual({ label: "(d)", marks: 3, stem: "Aluminium chloride vapour contains Al₂Cl₆ molecules. Describe how two AlCl₃ molecules are joined.", points: ["Al in AlCl₃ has only six outer electrons (electron-deficient)", "A chlorine atom of each AlCl₃ donates a lone pair to the aluminium of the other", "Two dative (coordinate) bonds form; each Al then has eight outer electrons"], modelAnswer: "In AlCl₃ aluminium has only six outer electrons. A chlorine atom of each molecule donates a lone pair to the aluminium atom of the other, forming two dative bonds, so each aluminium gains an octet and is surrounded by four chlorine atoms." }),
    ]),
    hints: ["Count bonding pairs and lone pairs for shapes.", "Two kinds of intermolecular force change in opposite directions from HCl to HI."],
    explanation: "SF₆ octahedral; H₂S bent; NH₄⁺ 109.5°; HCN has 2 π bonds; boiling points: electrons up, HF hydrogen-bonded; Al₂Cl₆ has two dative bonds.",
  });

  // ---------------------------------------------------------------- Z3: gas volumes, ideal gas equation and kinetic theory
  {
    const vH = 20, vO2 = 150, x = 3, y = 6;
    const used = vH * (x + y / 4), co2 = vH * x;
    const afterCool = vO2 - used + co2, afterKOH = vO2 - used;
    chk(afterCool, 120); chk(afterKOH, 60);
    const V = ((0.42 / Mr("C3H6")) * R * 300 / 1e5) * 1e6;
    b.struct({
      ...P3, d: 5,
      concepts: [A("states.gases"), A("stoich.reacting-masses-yield"), A("stoich.formulae-equations")],
      stem: `${vH} cm³ of a gaseous hydrocarbon is exploded with ${vO2} cm³ of oxygen (an excess). After cooling to room temperature, the volume of gas is ${afterCool} cm³. Shaking the gas with aqueous potassium hydroxide reduces the volume to ${afterKOH} cm³. All volumes are measured at the same temperature and pressure.`,
      parts: checkExam(EXAM.ZIM_P3_FREE, [
        P.group({ label: "(a)", stem: "Use the data to find:", parts: [
          P.num({ label: "(i)", marks: 1, stem: "the volume of carbon dioxide formed, in cm³;", value: co2, unit: "cm³", wrong: [afterCool], explanation: `${afterCool} − ${afterKOH} = ${co2} cm³.` }),
          P.num({ label: "(ii)", marks: 1, stem: "the volume of oxygen used, in cm³.", value: used, unit: "cm³", wrong: [afterKOH], explanation: `${vO2} − ${afterKOH} = ${used} cm³.` }),
        ] }),
        P.short({ label: "(b)", marks: 2, stem: "Deduce the molecular formula of the hydrocarbon (type it as, e.g., C2H6).", accepted: ["C3H6", "C₃H₆"], normalise: ["trim", "collapse_whitespace"], wrong: ["C3H8"], explanation: `x = ${co2}/${vH} = ${x}; x + y/4 = ${used}/${vH} = 4.5, so y = ${y}: C₃H₆.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the volume, in cm³, occupied by 0.420 g of this hydrocarbon at 300 K and 100 kPa. (Ar: H 1.0, C 12.0; R = 8.31 J K⁻¹ mol⁻¹)", value: V, unit: "cm³", wrong: [V / 1000], explanation: `n = 0.420 ÷ 42.0 = 0.0100 mol; V = nRT/p = 0.0100 × 8.31 × 300 ÷ 1.00 × 10⁵ = ${sfStr(V / 1e6, 3)} m³ = ${sfStr(V, 3)} cm³.` }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain why, in this experiment, the volume of water formed can be ignored, and why gas volume ratios are equal to mole ratios.", points: ["At room temperature the water condenses to a liquid", "whose volume is negligible compared with the gas volumes", "Equal volumes of gases at the same temperature and pressure contain equal numbers of molecules (Avogadro's law), so volume ratio = mole ratio"], modelAnswer: "After cooling to room temperature the water is a liquid, and its volume is negligible compared with the gas volumes. At the same temperature and pressure, equal volumes of gases contain equal numbers of molecules, so the ratio of gas volumes equals the ratio of moles in the equation." }),
        P.manual({
          label: "(e)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 300 },
          stem: "Explain how gas molecules produce a pressure, state the main assumptions of the kinetic theory of an ideal gas, and discuss the conditions under which real gases do not obey the ideal gas equation.",
          points: [
            "Pressure: molecules collide with the walls; each collision exerts a force; force per unit area is the pressure",
            "Assumption: molecules have negligible volume",
            "Assumption: no intermolecular forces (and elastic collisions / random motion)",
            "Real gases deviate at high pressure: molecular volume no longer negligible",
            "and at low temperature: intermolecular attractions become significant (gas may liquefy)",
            "Gases with stronger intermolecular forces (e.g. NH₃, polar gases) deviate more; ideal behaviour at low pressure and high temperature",
          ],
          modelAnswer: "Gas molecules move rapidly and randomly and continually collide with the walls of the container. Each collision exerts a small force on the wall, and the total force per unit area is the gas pressure.\n\nThe kinetic theory of an ideal gas assumes that the molecules have negligible volume compared with the container, that there are no intermolecular forces, that collisions are perfectly elastic, and that the molecules move randomly.\n\nReal gases depart from these assumptions at high pressure, where the molecules are crowded so their own volume is a significant part of the total, and at low temperature, where slow-moving molecules are pulled together by intermolecular attractions, reducing the pressure and eventually liquefying the gas. Gases with strong intermolecular forces, such as ammonia, deviate more than helium. Real gases behave most nearly ideally at low pressure and high temperature.",
        }),
      ]),
      hints: ["KOH absorbs CO₂; what is left is excess oxygen.", "Two assumptions fail for real gases."],
      explanation: `CO₂ ${co2} cm³, O₂ used ${used} cm³ → C₃H₆; 0.420 g occupies ${sfStr(V, 3)} cm³ at 300 K, 100 kPa.`,
      calculator: true,
    });
  }

  // ---------------------------------------------------------------- Z4: Paper 4 quantitative: x in Na2CO3.xH2O by titration
  {
    const bottleFull = 18.47, bottleEmpty = 15.61;
    const mass = bottleFull - bottleEmpty;
    const readings = [[0.0, 20.4], [20.4, 40.45], [0.1, 20.05], [20.05, 40.05]];
    const ts = readings.map(([a, c]) => titre(a, c));
    const mt = meanTitre(ts.slice(1));
    same(mt.used.map((v) => v.toFixed(2)), ["19.95", "20.00", "20.05"]);
    const nHCl = molesFromSolution(mt.mean, 0.1);
    const nCarb25 = nHCl / 2;
    const nCarb250 = nCarb25 * 10;
    const M = mass / nCarb250;
    const x = (M - 106.0) / 18.0;
    chk(Math.round(x), 10);
    const pct = pctErrorDifference(0.05, mt.mean);
    b.struct({
      ...P4, d: 5,
      concepts: [A("stoich.solutions-titrations"), A("skills.quantitative-practical"), A("stoich.formulae-equations")],
      stem: `You are to find x in hydrated sodium carbonate, Na₂CO₃.xH₂O, by titration with hydrochloric acid.

**Method**

1. Weigh a weighing bottle containing about 3 g of the hydrated salt. Tip the solid into a beaker and reweigh the empty bottle.
2. Dissolve the solid in distilled water, transfer the solution and washings to a 250 cm³ volumetric flask and make up to the mark. Shake well.
3. Pipette 25.0 cm³ of this solution into a conical flask and add three drops of methyl orange.
4. Titrate with 0.100 mol dm⁻³ hydrochloric acid until the indicator changes from yellow to orange. Repeat to obtain concordant titres.

$\ce{Na2CO3(aq) + 2HCl(aq) -> 2NaCl(aq) + H2O(l) + CO2(g)}$

**Results** (a student's readings)

| Mass of bottle + solid / g | Mass of empty bottle / g |
|---|---|
| ${bottleFull.toFixed(2)} | ${bottleEmpty.toFixed(2)} |

| Titration | rough | 1 | 2 | 3 |
|---|---|---|---|---|
| Final burette reading / cm³ | ${readings.map((r) => r[1].toFixed(2)).join(" | ")} |
| Initial burette reading / cm³ | ${readings.map((r) => r[0].toFixed(2)).join(" | ")} |

(Ar: H 1.0, C 12.0, O 16.0, Na 23.0)`,
      parts: checkExam(EXAM.ZIM_P4_QUANTITATIVE, [
        P.manual({ label: "(a)", marks: 3, stem: "Describe how the titration results should be recorded in a table.", points: ["Rows (or columns) for final reading, initial reading and titre, each heading with its unit (/ cm³)", "All burette readings and titres recorded to two decimal places, ending in .00 or .50 / .05 (to the nearest 0.05 cm³)", "Rough titre labelled; the titres used for the mean indicated (concordant within 0.10 cm³)"], modelAnswer: "A table with rows for final reading / cm³, initial reading / cm³ and titre / cm³; every reading to two decimal places to the nearest 0.05 cm³; the rough titration labelled and the concordant titres ticked." }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate the mass, in g, of hydrated sodium carbonate used.", value: mass, dp: 2, unit: "g", wrong: [bottleFull], explanation: `${bottleFull.toFixed(2)} − ${bottleEmpty.toFixed(2)} = ${mass.toFixed(2)} g.` }),
        P.num({ label: "(c)", marks: 1, stem: "Calculate the mean of the concordant titres, in cm³.", value: mt.mean, dp: 2, unit: "cm³", wrong: [ts.reduce((s, v) => s + v, 0) / 4], explanation: `Titres 1-3: ${ts.slice(1).map((v) => v.toFixed(2)).join(", ")}; mean ${mt.mean.toFixed(2)} cm³.` }),
        P.num({ label: "(d)", marks: 1, stem: "Calculate the amount, in mol, of HCl in the mean titre.", value: nHCl, unit: "mol", wrong: [mt.mean * 0.1], explanation: `0.100 × ${mt.mean.toFixed(2)}/1000 = ${sfStr(nHCl, 3)} mol.` }),
        P.num({ label: "(e)", marks: 1, stem: "Calculate the amount, in mol, of Na₂CO₃ in 25.0 cm³ of solution.", value: nCarb25, unit: "mol", wrong: [nHCl], explanation: `Ratio 1 : 2: ${sfStr(nCarb25, 3)} mol.` }),
        P.num({ label: "(f)", marks: 1, stem: "Calculate the amount, in mol, of Na₂CO₃ in the 250 cm³ flask.", value: nCarb250, unit: "mol", wrong: [nCarb25], explanation: `× 10 = ${sfStr(nCarb250, 3)} mol.` }),
        P.num({ label: "(g)", marks: 2, stem: "Calculate the relative formula mass of the hydrated salt.", value: M, wrong: [mass / nCarb25, mass / (nHCl * 10)], explanation: `${mass.toFixed(2)} ÷ ${sfStr(nCarb250, 3)} = ${sfStr(M, 3)}. (Forgetting the 1 : 2 ratio halves the result.)` }),
        P.num({ label: "(h)", marks: 2, stem: "Calculate x, to the nearest whole number. (Mr of Na₂CO₃ = 106.0)", value: Math.round(x), wrong: [Math.round(M / 18), 5], explanation: `(${sfStr(M, 3)} − 106.0) ÷ 18.0 = ${x.toFixed(2)}, so x = ${Math.round(x)}.` }),
        P.num({ label: "(i)", marks: 1, stem: "Each burette reading has an uncertainty of ±0.05 cm³. Calculate the percentage uncertainty in the mean titre.", value: pct, unit: "%", wrong: [pctErrorDifference(0.05, mt.mean) / 2], explanation: `Two readings: ±0.10 cm³; 0.10 ÷ ${mt.mean.toFixed(2)} × 100 = ${sfStr(pct, 2)}%.`, sf: 2 }),
        P.manual({ label: "(j)", marks: 1, stem: "Write an ionic equation for the reaction in the titration.", points: ["CO₃²⁻(aq) + 2H⁺(aq) → CO₂(g) + H₂O(l)"], modelAnswer: "CO₃²⁻(aq) + 2H⁺(aq) → CO₂(g) + H₂O(l)" }),
        P.manual({ label: "(k)", marks: 4, stem: "Washing soda crystals lose some water of crystallisation if left in the open air (efflorescence). Identify two sources of error in this experiment and suggest an improvement for each.", points: ["Error: crystals have lost some water before weighing, so the mass of salt per mole is too small / x too low", "Improvement: use fresh crystals from a sealed container / weigh quickly", "Error: solid or solution lost during transfer (not all washings transferred), or end-point overshot / judged inconsistently", "Improvement: rinse beaker and funnel into the flask / add acid dropwise near the end-point with a white tile, use concordant titres"], modelAnswer: "If the crystals had partly lost their water of crystallisation, each gram contains more Na₂CO₃ than expected, so the calculated Mr and x are too low; fresh crystals from a sealed bottle should be weighed quickly. Some solution may be lost when it is transferred to the volumetric flask; the beaker and funnel should be rinsed several times into the flask. The end-point may also be overshot; acid should be added dropwise near the end-point over a white tile." }),
        P.manual({ label: "(l)", marks: 2, stem: "State the purpose of shaking the volumetric flask in step 2, and give one safety precaution for the experiment.", points: ["To mix the solution so its concentration is uniform", "Wear eye protection (acid / alkaline solution irritant) / use a pipette filler, not the mouth"], modelAnswer: "Shaking makes the solution uniform so every 25.0 cm³ portion has the same concentration. Eye protection should be worn and a pipette filler used." }),
      ]),
      hints: ["Moles of HCl → moles of carbonate (1 : 2) → scale to 250 cm³ → Mr → x."],
      explanation: `Mass ${mass.toFixed(2)} g; mean titre ${mt.mean.toFixed(2)} cm³; n(Na₂CO₃) in 250 cm³ = ${sfStr(nCarb250, 3)} mol; Mr ${sfStr(M, 3)}; x = ${Math.round(x)}.`,
      calculator: true,
    });
  }
});
