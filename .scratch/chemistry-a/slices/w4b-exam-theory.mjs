// W4b: six THEORY10 items (ZIMSEC Paper 2; Cambridge Paper 2 for AS concepts, Paper 4 for A Level concepts) on
// polymers, synthesis and analytical techniques. T1-T2 are on Cambridge AS concepts; T3-T6 on A Level concepts.
// Spectroscopy and synthesis items (T2, T5, T6) are applies: CAM.
import { concept, P, t, CAM, EXAM, checkExam, Mr, moles, rf, glcPercent, percentYield, sfStr, dpStr } from "../lib.mjs";

const A = (k) => `achem.${k}`;
const TH = { skill: EXAM.THEORY10.skill, secs: EXAM.THEORY10.secs, examStyle: true };
const AS = { ...TH, paper: "Paper 2" };
const AL = { ...TH, paper: "Paper 4 (CIE), Paper 2 (ZIMSEC)" };
const AL_CAM = { ...TH, paper: "Paper 4", applies: CAM };

concept(A("polymers.addition"), { file: "exam/w4b-theory", keyPrefix: "exam.w4b-theory" }, (b) => {
  // ---------------------------------------------------------------- T1 (AS, both): chloroethene, its mass spectrum and PVC
  {
    const units = 5.0e4 / Mr("C2H3Cl");
    const m1 = (1.1 * 2 * 30.0) / 100;
    b.struct({
      ...AS, d: 3, calculator: true,
      concepts: [A("polymers.addition"), A("analysis.mass-spectrometry")],
      stem: "Chloroethene, CH₂=CHCl, is the monomer of poly(chloroethene), PVC. Chlorine consists of ³⁵Cl and ³⁷Cl in the ratio 3 : 1. The mass spectrum of chloroethene has molecular ion peaks at m/e 62 and m/e 64. Ar: H 1.0, C 12.0, Cl 35.5.",
      parts: checkExam(EXAM.THEORY10, [
        P.manual({ label: "(a)", marks: 2, stem: "Explain why there are two molecular ion peaks, and state the ratio of their heights.", points: ["The molecular ions contain either ³⁵Cl (m/e 62) or ³⁷Cl (m/e 64)", "Heights in the ratio 3 : 1, the same as the isotope ratio"], modelAnswer: "Each molecular ion contains one chlorine atom, which may be ³⁵Cl (giving C₂H₃³⁵Cl⁺, m/e 62) or ³⁷Cl (C₂H₃³⁷Cl⁺, m/e 64). The peaks are in the ratio 3 : 1, reflecting the isotope abundances." }),
        P.short({ label: "(b)", marks: 1, stem: "Give the formula of the ion responsible for a peak at m/e 27.", accepted: ["C2H3+", "C₂H₃⁺", "CH2=CH+", "CH₂=CH⁺", "C2H3⁺"], normalise: ["trim", "collapse_whitespace"], rejected: ["C2H3"], wrong: ["C2H3"], explanation: "Loss of Cl from the molecular ion leaves C₂H₃⁺ (2 × 12 + 3 = 27)." }),
        P.num({ label: "(c)", marks: 1, stem: "The peak at m/e 62 has relative abundance 30.0. Predict the relative abundance of the [M+1]⁺ peak at m/e 63.", value: m1, sf: 2, wrong: [(1.1 * 30) / 100], explanation: `[M+1] = 1.1 × 2 × 30.0 ÷ 100 = ${sfStr(m1, 2)} (two carbon atoms).` }),
        P.short({ label: "(d)", marks: 1, stem: "Give the repeat unit of PVC.", accepted: ["-CH2-CHCl-", "–CH₂–CHCl–", "CH2CHCl", "-CH2CHCl-", "-CHCl-CH2-", "–CHCl–CH₂–", "-CH2-CH(Cl)-", "–CH₂–CH(Cl)–"], normalise: ["trim", "collapse_whitespace"], wrong: ["-CH2=CHCl-"], explanation: "–CH₂–CHCl–: single bonds, Cl on alternate carbons." }),
        P.num({ label: "(e)", marks: 1, stem: "A PVC chain has a relative molecular mass of 5.00 × 10⁴. Calculate the number of monomer units in the chain.", value: units, wrong: [5.0e4 / 35.5], explanation: `5.00 × 10⁴ ÷ ${Mr("C2H3Cl")} = ${units}.` }),
        P.mcq({ label: "(f)", marks: 1, stem: "Which statement about PVC is correct?", options: [
          ["It has the same empirical formula as chloroethene.", "Correct: addition polymerisation loses no atoms."],
          ["It decolorises bromine water.", "The polymer has no C=C bonds left."],
          ["It is formed from chloroethene with the loss of HCl.", "No by-product forms in addition polymerisation."],
          ["Its chains are held together by ionic bonds.", "Chains are held by intermolecular forces."],
        ], answer: "A", explanation: "Addition polymers keep all the atoms of the monomer." }),
        P.manual({ label: "(g)", marks: 2, stem: "Explain why disposing of PVC by burning is a problem, and why it does not rot in landfill.", points: ["Burning releases HCl (acidic, toxic) as well as CO₂ (and possibly toxic chlorinated compounds)", "PVC is non-biodegradable: its strong C–C and C–H (C–Cl) backbone has no hydrolysable link for microorganisms to attack"], modelAnswer: "Burning PVC releases hydrogen chloride, an acidic and toxic gas, as well as carbon dioxide, and can form toxic chlorinated by-products. In landfill it persists because its saturated carbon backbone has no polar link that microorganisms or water can break down." }),
        P.short({ label: "(h)", marks: 1, stem: "Name the type of polymerisation that forms PVC.", accepted: ["addition", "addition polymerisation", "free-radical addition", "addition polymerization"], wrong: ["condensation"], explanation: "Addition: the C=C bonds open." }),
      ]),
      hints: ["One Cl atom, two isotopes.", "Mr(polymer) = n × Mr(monomer)."],
      explanation: `Peaks at 62 and 64 (3 : 1) from ³⁵Cl and ³⁷Cl; [M+1] ≈ ${sfStr(m1, 2)}; ${units} units per chain; burning PVC releases HCl.`,
    });
  }

  // ---------------------------------------------------------------- T2 (AS, CAM): a route from butan-1-ol followed by infrared
  b.struct({
    ...AS, applies: CAM, d: 4,
    concepts: [A("organic.synthesis-as"), A("analysis.infrared")],
    stem: "A route from butan-1-ol to 2-hydroxypentanoic acid is shown.\n\n| Step | Reagent and conditions | Product |\n|---|---|---|\n| 1 | acidified K₂Cr₂O₇ | butanal, CH₃CH₂CH₂CHO |\n| 2 | HCN, KCN catalyst, heat | C |\n| 3 | dilute HCl, heat under reflux | CH₃CH₂CH₂CH(OH)COOH |\n\nIR data (cm⁻¹): C=O (aldehyde, ketone, acid) 1670-1740; C≡N 2200-2250; O–H (alcohol) 3200-3600; O–H (acid) 2500-3000.",
    parts: checkExam(EXAM.THEORY10, [
      P.mcq({ label: "(a)", marks: 1, stem: "How must step 1 be carried out to obtain butanal rather than butanoic acid?", options: [
        ["distil the butanal off as it forms", "Correct: removing the aldehyde stops further oxidation."],
        ["heat under reflux for one hour", "Reflux oxidises the aldehyde on to butanoic acid."],
        ["use excess potassium dichromate(VI)", "Excess oxidant favours the carboxylic acid."],
        ["add sodium hydroxide before heating", "Acidified dichromate is needed; alkali does not help."],
      ], answer: "A", explanation: "Distil the aldehyde out of the reaction mixture as it forms." }),
      P.manual({ label: "(b)", marks: 2, stem: "Describe how the infrared spectrum of the product of step 1 shows that all the butan-1-ol has reacted and an aldehyde has formed.", points: ["No broad O–H absorption at 3200-3600 cm⁻¹ (no alcohol left)", "A strong C=O absorption at 1670-1740 cm⁻¹ is present"], modelAnswer: "The broad alcohol O–H band at 3200-3600 cm⁻¹ is absent, so no butan-1-ol remains, and a strong C=O absorption appears between 1670 and 1740 cm⁻¹." }),
      P.short({ label: "(c)", marks: 1, stem: "Name the type of reaction in step 2.", accepted: ["nucleophilic addition"], wrong: ["electrophilic addition"], explanation: "CN⁻ attacks the δ+ carbonyl carbon." }),
      P.short({ label: "(d)", marks: 1, stem: "Give the structural formula of C.", accepted: ["CH3CH2CH2CH(OH)CN", "CH₃CH₂CH₂CH(OH)CN", "C3H7CH(OH)CN"], normalise: ["trim", "collapse_whitespace"], wrong: ["CH3CH2CH2CH2CN"], explanation: "2-hydroxypentanenitrile." }),
      P.short({ label: "(e)", marks: 1, stem: "Name the bond responsible for an IR absorption present in C but absent from butanal and from the final product.", accepted: ["C≡N", "C-N triple bond", "carbon-nitrogen triple bond", "nitrile", "CN", "C=N triple"], normalise: ["trim", "lowercase", "collapse_whitespace"], wrong: ["C=O"], explanation: "C≡N at 2200-2250 cm⁻¹." }),
      P.manual({ label: "(f)", marks: 1, stem: "Name the inorganic product of step 3.", points: ["Ammonium chloride, NH₄Cl (ammonium ions)"], modelAnswer: "Ammonium chloride (NH₄⁺ ions)." }),
      P.num({ label: "(g)", marks: 1, stem: "How many carbon atoms are in one molecule of the final product?", value: 5, wrong: [4], explanation: "Four from butan-1-ol plus one from cyanide." }),
      P.manual({ label: "(h)", marks: 2, stem: "The final product is obtained as a mixture that does not rotate plane-polarised light. Explain why.", points: ["Step 2 creates a chiral carbon (bonded to H, OH, CN and C₃H₇)", "CN⁻ attacks the planar C=O equally from both sides, giving equal amounts of the two optical isomers (racemic mixture), whose rotations cancel"], modelAnswer: "In step 2 the carbonyl carbon becomes a chiral centre bonded to H, OH, CN and a propyl group. Because the C=O group is planar, cyanide attacks equally from either face, giving a racemic mixture of the two enantiomers; their effects on plane-polarised light cancel." }),
    ]),
    hints: ["Distil to stop at the aldehyde.", "HCN adds one carbon."],
    explanation: "Distil in step 1; IR: O–H disappears, C=O appears; C is CH₃CH₂CH₂CH(OH)CN (nucleophilic addition, C≡N at 2200-2250); racemic product.",
  });

  // ---------------------------------------------------------------- T3 (A Level, both): a polyester and its hydrolysis
  {
    const Mrep = Mr("HO(CH2)3OH") + Mr("HOOCC6H4COOH") - 2 * Mr("H2O");
    const n = 4.12e4 / Mrep;
    const mNaOH = (10.3 / Mrep) * 2 * Mr("NaOH");
    b.struct({
      ...AL, d: 4, calculator: true,
      concepts: [A("polymers.condensation"), A("polymers.uses-degradability")],
      stem: "A polyester fibre is made from propane-1,3-diol, HO(CH₂)₃OH, and benzene-1,4-dicarboxylic acid, HOOC–C₆H₄–COOH. Ar: H 1.0, C 12.0, O 16.0, Na 23.0.",
      parts: checkExam(EXAM.THEORY10, [
        P.mcq({ label: "(a)", marks: 1, stem: "What type of polymerisation forms this polyester?", options: [
          ["condensation, with loss of water", "Correct: each ester link forms with loss of H₂O."],
          ["addition, with no other product", "Neither monomer has a C=C that polymerises."],
          ["condensation, with loss of hydrogen chloride", "HCl is lost only when a dioyl dichloride is used."],
          ["addition, with loss of water", "Addition polymerisation never releases a small molecule."],
        ], answer: "A", explanation: "Diol + diacid → polyester + water." }),
        P.manual({ label: "(b)", marks: 1, stem: "Give the repeat unit of the polyester.", points: ["–O(CH₂)₃O–CO–C₆H₄–CO– (ester links shown, continuation bonds at both ends)"], modelAnswer: "–O–CH₂CH₂CH₂–O–CO–C₆H₄–CO–" }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the relative mass of the repeat unit.", value: Mrep, wrong: [Mrep + 18], explanation: `${Mr("HO(CH2)3OH")} + ${Mr("HOOCC6H4COOH")} − 2 × 18.0 = ${Mrep}. Subtracting only one water gives ${Mrep + 18}.` }),
        P.num({ label: "(d)", marks: 1, stem: "Calculate the number of repeat units in a chain of relative molecular mass 4.12 × 10⁴.", value: n, explanation: `4.12 × 10⁴ ÷ ${Mrep} = ${n}.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Name the products formed when the polyester is boiled with excess aqueous sodium hydroxide.", points: ["Propane-1,3-diol", "Disodium benzene-1,4-dicarboxylate (the sodium salt of the acid)"], modelAnswer: "Propane-1,3-diol and disodium benzene-1,4-dicarboxylate, NaOOC–C₆H₄–COONa." }),
        P.num({ label: "(f)", marks: 1, stem: "Calculate the minimum mass of NaOH, in g, needed to hydrolyse 10.3 g of the polyester completely.", value: mNaOH, sf: 3, unit: "g", wrong: [mNaOH / 2], explanation: `${dpStr(10.3 / Mrep, 4)} mol of repeat units × 2 ester links × 40.0 = ${sfStr(mNaOH, 3)} g. One OH⁻ per repeat unit gives half this.` }),
        P.manual({ label: "(g)", marks: 2, stem: "Explain why this polyester is more biodegradable than poly(propene).", points: ["The polyester has polar ester links that can be hydrolysed (by water, acids, alkalis or enzymes)", "Poly(propene) has only non-polar C–C and C–H bonds with no group that can be hydrolysed"], modelAnswer: "The ester links are polar, with a δ+ carbonyl carbon that water, hydroxide ions or enzymes can attack, so the chains can be broken by hydrolysis. Poly(propene) has only strong, non-polar C–C and C–H bonds, with nothing for hydrolysis to attack." }),
      ]),
      hints: ["Two ester links per repeat unit.", "Alkali gives the carboxylate salt."],
      explanation: `Condensation polymer; repeat unit Mr ${Mrep}; ${n} units per chain; ${sfStr(mNaOH, 3)} g NaOH for 10.3 g; ester links make it hydrolysable.`,
    });
  }

  // ---------------------------------------------------------------- T4 (A Level, both): TLC and GLC of a medicine
  {
    const r = rf(4.3, 7.9);
    const p = glcPercent({ a: 22.4, b: 11.8, c: 5.3 });
    b.struct({
      ...AL, d: 3, calculator: true,
      concepts: [A("analysis.chromatography-tlc"), A("analysis.chromatography-glc")],
      stem: "A pharmaceutical laboratory checks a cough syrup. (1) A TLC plate (silica) is spotted with the syrup and run in a solvent; the solvent front moves 7.9 cm and the main active ingredient moves 4.3 cm. (2) The volatile components are analysed by GLC; the peak areas are A 22.4, B 11.8 and C 5.3.",
      parts: checkExam(EXAM.THEORY10, [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the Rf value of the active ingredient, to two decimal places.", value: r, dp: 2, wrong: [7.9 / 4.3], explanation: `4.3 ÷ 7.9 = ${dpStr(r, 2)}.` }),
        P.manual({ label: "(b)", marks: 2, stem: "A second ingredient has a lower Rf on the same plate. Suggest why, in terms of its interactions.", points: ["It is more polar / can hydrogen bond to the polar silica (OH groups), so it is adsorbed more strongly", "It spends less time in the mobile phase (or is less soluble in the solvent), so it moves less far"], modelAnswer: "It is probably more polar, for example with more –OH or –NH groups, so it is adsorbed more strongly onto the polar silica and spends less time moving with the solvent, giving a lower Rf." }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the percentage of B in the volatile components, to three significant figures.", value: p.b, sf: 3, unit: "%", wrong: [11.8], explanation: `Total area = 22.4 + 11.8 + 5.3 = ${dpStr(22.4 + 11.8 + 5.3, 1)}; %B = 11.8 ÷ ${dpStr(22.4 + 11.8 + 5.3, 1)} × 100 = ${sfStr(p.b, 3)}%.` }),
        P.mcq({ label: "(d)", marks: 1, stem: "The GLC oven temperature is raised. What happens to the retention times?", options: [
          ["They decrease.", "Correct: components become more volatile and pass through faster."],
          ["They increase.", "Heating favours the gas phase, so times shorten."],
          ["They stay the same.", "Retention time depends on temperature."],
          ["Only the first peak changes.", "All components are affected."],
        ], answer: "A", explanation: "Higher temperature, shorter retention times." }),
        P.fib({ label: "(e)", marks: 2, stem: "Complete the description of GLC.", template: "The mobile phase is an unreactive {{blank:a}}; the stationary phase is a high-boiling {{blank:b}} on a solid support.", blanks: [
          { id: "a", accepted: ["gas"], choices: ["gas", "liquid", "solid"] },
          { id: "b", accepted: ["liquid"], choices: ["liquid", "gas", "salt"] },
        ], explanation: "Gas-liquid chromatography: carrier gas over a liquid stationary phase." }),
        P.manual({ label: "(f)", marks: 2, stem: "Explain why GC-MS, rather than GLC alone, would be used to identify an unexpected impurity.", points: ["Retention time alone is not unique: different compounds can have the same retention time", "The mass spectrum (molecular ion and fragments) of each separated component can be matched with a library to identify it"], modelAnswer: "Matching a retention time does not prove identity, because other compounds may elute at the same time. In GC-MS each separated component passes into a mass spectrometer, and its molecular ion and fragmentation pattern are compared with a library of spectra to identify it." }),
      ]),
      hints: ["Rf = spot ÷ front.", "% = area ÷ total area × 100."],
      explanation: `Rf = ${dpStr(r, 2)}; B is ${sfStr(p.b, 3)}%; retention times fall at higher temperature; GC-MS identifies components.`,
    });
  }

  // ---------------------------------------------------------------- T5 (A Level, CAM): NMR deduction of an aldehyde
  b.struct({
    ...AL_CAM, d: 4,
    concepts: [A("analysis.proton-nmr"), A("analysis.carbon-13-nmr")],
    stem: "Compound Q, C₄H₈O, gives a silver mirror with Tollens' reagent. Its carbon-13 NMR spectrum has three peaks, at δ 204, 41 and 16. Its proton NMR spectrum:\n\n| δ / ppm | relative area | splitting |\n|---|---|---|\n| 9.6 | 1 | doublet |\n| 2.4 | 1 | multiplet |\n| 1.1 | 6 | doublet |\n\nData (¹H, δ / ppm): alkane 0.9-1.7; alkyl next to C=O 2.2-3.0; aldehyde 9.3-10.5. (¹³C, δ / ppm): alkyl 0-50; aldehyde or ketone C=O 190-220.",
    parts: checkExam(EXAM.THEORY10, [
      P.num({ label: "(a)", marks: 1, stem: "How many different carbon environments does Q have?", value: 3, wrong: [4], explanation: "Three peaks in the carbon-13 spectrum." }),
      P.short({ label: "(b)", marks: 1, stem: "Name the functional group shown by the proton signal at δ 9.6.", accepted: ["aldehyde", "aldehyde group", "CHO", "-CHO"], wrong: ["ketone"], explanation: "9.3-10.5 ppm: aldehyde H." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain what the 6H doublet at δ 1.1 tells you about Q.", points: ["Six equivalent H: two equivalent CH₃ groups", "Doublet: one H on the adjacent carbon, so the CH₃ groups are on a CH: (CH₃)₂CH–"], modelAnswer: "Six equivalent protons mean two identical methyl groups; the doublet shows that the carbon next to them carries one hydrogen, so Q contains an isopropyl group, (CH₃)₂CH–." }),
      P.short({ label: "(d)", marks: 1, stem: "Name Q.", accepted: ["2-methylpropanal", "methylpropanal", "isobutyraldehyde", "2 methylpropanal"], wrong: ["butanal"], explanation: "(CH₃)₂CHCHO." }),
      P.num({ label: "(e)", marks: 1, stem: "How many peaks would the carbon-13 spectrum of the isomer butanal, CH₃CH₂CH₂CHO, show?", value: 4, wrong: [3], explanation: "All four carbons differ." }),
      P.mcq({ label: "(f)", marks: 1, stem: "Q is shaken with D₂O and its proton spectrum rerun. What happens?", options: [
        ["Nothing, as Q has no O–H or N–H protons.", "Correct: C–H protons, including CHO, do not exchange."],
        ["The aldehyde signal at δ 9.6 disappears.", "The aldehyde H is bonded to carbon and does not exchange with D₂O."],
        ["The methyl signal at δ 1.1 disappears.", "C–H protons do not exchange."],
        ["A new signal appears at δ 4.8.", "D₂O does not add a new signal for Q."],
      ], answer: "A", explanation: "Only O–H and N–H hydrogens exchange." }),
      P.manual({ label: "(g)", marks: 1, stem: "Explain why the aldehyde signal is a doublet.", points: ["The adjacent carbon (the CH) carries one H, so n = 1 and the signal is split into 2 lines"], modelAnswer: "The CHO proton's neighbouring carbon is the CH of the isopropyl group, which has one hydrogen, so by the n + 1 rule the signal is a doublet." }),
      P.mcq({ label: "(h)", marks: 1, stem: "How would the CHO signal of butanal be split?", options: [
        ["triplet", "Correct: the adjacent CH₂ has two H."],
        ["doublet", "A doublet needs one neighbouring H, as in Q."],
        ["quartet", "A quartet needs three neighbouring H."],
        ["singlet", "The CHO carbon in butanal has a neighbouring CH₂."],
      ], answer: "A", explanation: "CH₂CHO: n = 2 → triplet." }),
      P.manual({ label: "(i)", marks: 1, stem: "Explain why the spectrum is run in CDCl₃ rather than CHCl₃.", points: ["Deuterium gives no signal in the proton spectrum, so the solvent does not produce a large interfering peak"], modelAnswer: "CDCl₃ contains deuterium instead of hydrogen, which does not absorb in a proton spectrum, so the solvent does not swamp the sample's signals." }),
    ]),
    hints: ["Six equivalent H as a doublet: (CH₃)₂CH–."],
    explanation: "Q is 2-methylpropanal: CHO doublet (9.6), CH multiplet (2.4), (CH₃)₂ doublet (1.1); three carbon environments.",
  });

  // ---------------------------------------------------------------- T6 (A Level, CAM): methylbenzene to an azo dye
  {
    const n = moles(9.2, Mr("C6H5CH3"));
    const th = n * Mr("CH3C6H4NH2");
    const y = percentYield(6.42, th);
    b.struct({
      ...AL_CAM, d: 4, calculator: true,
      concepts: [A("organic.synthesis-a")],
      stem: "An orange azo dye is made from methylbenzene in four steps: (1) nitration to 4-nitromethylbenzene; (2) reduction to 4-methylphenylamine, CH₃C₆H₄NH₂; (3) diazotisation; (4) coupling with phenol. Ar: H 1.0, C 12.0, N 14.0.",
      parts: checkExam(EXAM.THEORY10, [
        P.mcq({ label: "(a)", marks: 1, stem: "Which reagents and conditions are used in step 1?", options: [
          ["conc. HNO₃ and conc. H₂SO₄, about 30 °C", "Correct: the nitrating mixture at a moderate temperature."],
          ["dilute HNO₃ at room temperature", "Dilute nitric acid nitrates phenol, not methylbenzene."],
          ["NaNO₂ and dilute HCl below 10 °C", "These are diazotisation conditions (step 3)."],
          ["NH₃ in ethanol, heated in a sealed tube under pressure", "Ammonia substitutes halogenoalkanes; it does not nitrate arenes."],
        ], answer: "A", explanation: "NO₂⁺ is generated from the concentrated acids; keep the temperature moderate to limit dinitration." }),
        P.mcq({ label: "(b)", marks: 1, stem: "Why does nitration of methylbenzene give mainly the 2- and 4-isomers?", options: [
          ["–CH₃ donates electrons and directs to positions 2 and 4.", "Correct: –CH₃ is an activating 2,4-director."],
          ["The methyl group withdraws electrons and directs to the 3-position.", "–CH₃ donates, not withdraws, electrons."],
          ["The 2- and 4-positions carry a positive charge in methylbenzene.", "The ring has no fixed positive charges; the intermediate is stabilised."],
          ["Nitration always gives a random mixture of all positions.", "Substituents control the positions of attack."],
        ], answer: "A", explanation: "Electron-donating alkyl groups activate the ring and direct to positions 2 and 4." }),
        P.mcq({ label: "(c)", marks: 1, stem: "Which reagents carry out step 2?", options: [
          ["Sn and conc. HCl, then NaOH(aq)", "Correct: reduction of –NO₂ to –NH₂, then release of the free amine."],
          ["NaBH₄ in aqueous ethanol, warm", "NaBH₄ does not reduce nitro groups."],
          ["acidified K₂Cr₂O₇, heat under reflux", "That is an oxidising agent."],
          ["H₂O and H₃PO₄ catalyst", "That hydrates alkenes."],
        ], answer: "A", explanation: "Sn/conc. HCl, reflux, then NaOH." }),
        P.short({ label: "(d)", marks: 1, stem: "State the maximum temperature for step 3, in °C.", accepted: ["10", "10 °C", "below 10 °C", "below 10", "<10", "less than 10", "10 degrees"], normalise: ["trim", "lowercase", "collapse_whitespace"], wrong: ["60"], explanation: "Below about 10 °C; above this the diazonium ion decomposes." }),
        P.manual({ label: "(e)", marks: 2, stem: "Describe the structure of the dye formed in step 4.", points: ["Two benzene rings joined by an azo group, –N=N–", "One ring carries CH₃ (from the amine, para to N=N); the other carries –OH (para to N=N): CH₃C₆H₄–N=N–C₆H₄OH"], modelAnswer: "The dye is CH₃C₆H₄–N=N–C₆H₄–OH: two benzene rings linked by an –N=N– azo group, with the methyl group on one ring and the hydroxyl group on the other, each para to the azo link." }),
        P.num({ label: "(f)", marks: 2, stem: "9.20 g of methylbenzene gave 6.42 g of 4-methylphenylamine. Calculate the percentage yield over steps 1 and 2, to three significant figures.", value: y, sf: 3, unit: "%", wrong: [(6.42 / 9.2) * 100], explanation: `n(C₆H₅CH₃) = 9.20 ÷ ${Mr("C6H5CH3")} = ${sfStr(n, 3)} mol; maximum amine = ${sfStr(n, 3)} × ${Mr("CH3C6H4NH2")} = ${sfStr(th, 3)} g; yield = 6.42 ÷ ${sfStr(th, 3)} × 100 = ${sfStr(y, 3)}%.` }),
        P.manual({ label: "(g)", marks: 2, stem: "Explain why steps 3 and 4 are carried out in ice-cold solution, and state one hazard.", points: ["Above about 10 °C the diazonium ion decomposes (to a phenol and N₂), lowering the yield of dye", "Hazard: diazonium salts are unstable (explosive when dry) / nitrous acid and NaNO₂ are toxic: keep in solution, cold, wear eye protection"], modelAnswer: "The diazonium ion is unstable: if it warms above about 10 °C it decomposes to a phenol and nitrogen, so little dye forms. Diazonium salts can decompose explosively when dry, so they are kept cold, in solution, and used at once, with eye protection." }),
      ]),
      hints: ["–CH₃ directs to 2 and 4.", "Keep diazonium salts below 10 °C."],
      explanation: `Nitrate (conc. HNO₃/H₂SO₄), reduce (Sn/HCl, NaOH), diazotise below 10 °C, couple with phenol in alkali; yield ${sfStr(y, 3)}%.`,
    });
  }
});
