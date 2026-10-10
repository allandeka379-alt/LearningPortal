// W4a: six THEORY10 items (ZIMSEC Paper 2; Cambridge Paper 2 for AS concepts, Paper 4 for A Level concepts) on
// hydroxy, carbonyl, carboxylic and nitrogen compounds. T1-T2 are on Cambridge AS concepts; T3-T6 on Cambridge A Level
// concepts. All concepts are covered by both syllabi, so no item carries `applies`.
import { concept, P, t, EXAM, checkExam, Mr, moles, molesFromSolution, percentYield, kaFromPKa, pHWeakAcid, VM_RTP, sfStr, dpStr, sciStr } from "../lib.mjs";

const A = (k) => `achem.${k}`;
const TH = { skill: EXAM.THEORY10.skill, secs: EXAM.THEORY10.secs, examStyle: true };
const AS = { ...TH, paper: "Paper 2" };
const AL = { ...TH, paper: "Paper 4 (CIE), Paper 2 (ZIMSEC)" };

concept(A("hydroxy.alcohol-reactions"), { file: "exam/w4a-theory", keyPrefix: "exam.w4a-theory" }, (b) => {
  // ---------------------------------------------------------------- T1 (AS): ethanol from sugar; reactions of alcohols
  {
    const nS = moles(171, Mr("C12H22O11"));
    const mE = 4 * nS * Mr("C2H5OH");
    const vC = 4 * nS * VM_RTP;
    b.struct({
      ...AS, d: 3, calculator: true,
      concepts: [A("hydroxy.alcohols-structure"), A("hydroxy.alcohol-reactions")],
      stem: "Fuel ethanol is made in Zimbabwe by fermenting sugar-cane products. Overall, sucrose is converted as follows:\n\nC₁₂H₂₂O₁₁ + H₂O → 4C₂H₅OH + 4CO₂\n\nMr: sucrose 342, ethanol 46. One mole of gas occupies 24 000 cm³ at room conditions.",
      parts: checkExam(EXAM.THEORY10, [
        P.manual({ label: "(a)", marks: 1, stem: "State two conditions needed for fermentation.", points: ["Two of: yeast; about 30-40 °C; absence of air (anaerobic); aqueous solution"], modelAnswer: "Yeast and a temperature of about 35 °C, with air excluded." }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the maximum mass of ethanol, in g, that can be made from 171 g of sucrose.", value: mE, sf: 3, unit: "g", wrong: [nS * Mr("C2H5OH")], explanation: `n(sucrose) = 171 ÷ 342 = ${sfStr(nS, 3)} mol; n(ethanol) = 4 × ${sfStr(nS, 3)} = ${sfStr(4 * nS, 3)} mol; mass = ${sfStr(4 * nS, 3)} × 46 = ${sfStr(mE, 3)} g.` }),
        P.num({ label: "(c)", marks: 1, stem: "Calculate the volume of carbon dioxide, in dm³, produced at the same time.", value: vC, sf: 3, unit: "dm³", explanation: `${sfStr(4 * nS, 3)} mol × 24 000 cm³ = ${sfStr(vC, 3)} dm³.` }),
        P.mcq({ label: "(d)", marks: 1, stem: "Why can ethanol be separated from the fermented mixture by fractional distillation?", options: [
          ["Ethanol and water have different boiling points.", "Correct: ethanol boils at about 78 °C, water at 100 °C."],
          ["Ethanol and water are immiscible and form two layers.", "They mix completely; a separating funnel would not work."],
          ["Ethanol is a solid at the temperature of the column.", "Ethanol is a liquid at room temperature."],
          ["Yeast removes the water as the mixture is heated.", "Yeast does not separate the liquids."],
        ], answer: "A", explanation: "Miscible liquids with different boiling points." }),
        P.short({ label: "(e)", marks: 1, stem: "Name the organic product when ethanol is heated under reflux with excess acidified potassium dichromate(VI).", accepted: ["ethanoic acid", "acetic acid"], wrong: ["ethanal"], explanation: "Full oxidation under reflux gives ethanoic acid." }),
        P.manual({ label: "(f)", marks: 2, stem: "Ethanol can also be made by hydration of ethene. Give one advantage of each method.", points: ["Fermentation: renewable raw material (or low temperature/pressure, simple equipment)", "Hydration: fast and continuous (or purer product, or 100% atom economy)"], modelAnswer: "Fermentation uses a renewable crop; hydration of ethene is a fast continuous process giving almost pure ethanol." }),
        P.manual({ label: "(g)", marks: 2, stem: "Describe a chemical test that distinguishes ethanol from 2-methylpropan-2-ol, giving the result for each.", points: ["Warm with acidified K₂Cr₂O₇ (or alkaline iodine)", "Ethanol: orange to green (or pale yellow precipitate); 2-methylpropan-2-ol: stays orange (or no precipitate)"], modelAnswer: "Warm each with acidified potassium dichromate(VI): ethanol turns it from orange to green; 2-methylpropan-2-ol, a tertiary alcohol, leaves it orange." }),
      ]),
      hints: ["1 mol sucrose gives 4 mol ethanol and 4 mol CO₂."],
      explanation: `Ethanol ${sfStr(mE, 3)} g and CO₂ ${sfStr(vC, 3)} dm³; fractional distillation; ethanoic acid under reflux; dichromate distinguishes primary from tertiary alcohols.`,
    });
  }

  // ---------------------------------------------------------------- T2 (AS): carbonyl tests and nucleophilic addition
  {
    const n = moles(2.9, Mr("C3H6O"));
    const m = n * Mr("C4H7NO");
    b.struct({
      ...AS, d: 4, calculator: true,
      concepts: [A("carbonyl.aldehydes-ketones"), A("carbonyl.nucleophilic-addition"), A("amines.nitriles")],
      stem: "Compounds X and Y are isomers with the formula C₃H₆O. Both give an orange precipitate with 2,4-dinitrophenylhydrazine. Only Y gives a silver mirror with Tollens' reagent. Both react with HCN in the presence of KCN.",
      parts: checkExam(EXAM.THEORY10, [
        P.short({ label: "(a)", marks: 1, stem: "Name X.", accepted: ["propanone", "acetone", "propan-2-one"], wrong: ["propanal"], explanation: "C=O present, not an aldehyde: propanone." }),
        P.short({ label: "(b)", marks: 1, stem: "Name Y.", accepted: ["propanal", "propionaldehyde"], wrong: ["propanone"], explanation: "Aldehyde: propanal." }),
        P.manual({ label: "(c)", marks: 2, stem: "State what is oxidised and what is reduced when Y reacts with Tollens' reagent.", points: ["Propanal (Y) is oxidised to propanoic acid (propanoate)", "Silver(I) ions ([Ag(NH₃)₂]⁺) are reduced to silver metal"], modelAnswer: "Propanal is oxidised to propanoic acid (as propanoate); the silver(I) ions are reduced to silver." }),
        P.manual({ label: "(d)", marks: 3, stem: "Describe the mechanism of the reaction of X with HCN in the presence of KCN.", points: ["Arrow from the lone pair on the C of CN⁻ to the δ+ carbonyl carbon", "Arrow from the C=O π bond to O, giving the intermediate (CH₃)₂C(O⁻)CN", "O⁻ takes H⁺ from HCN (arrow from O⁻ to H; H–C bond breaks), giving (CH₃)₂C(OH)CN and regenerating CN⁻"], modelAnswer: "The cyanide ion's carbon lone pair attacks the δ+ carbonyl carbon while the π electrons move onto oxygen, giving (CH₃)₂C(O⁻)CN. The O⁻ removes a proton from HCN, giving 2-hydroxy-2-methylpropanenitrile and regenerating CN⁻." }),
        P.mcq({ label: "(e)", marks: 1, stem: "The product from Y and HCN is formed as a racemic mixture. Why?", options: [
          ["CN⁻ attacks the planar C=O equally from both sides.", "Correct: equal amounts of the two enantiomers form."],
          ["The product has two identical groups on the new carbon.", "CH₃CH₂CH(OH)CN has four different groups, so it is chiral."],
          ["KCN converts one enantiomer into the other after the reaction.", "The catalyst does not interconvert enantiomers."],
          ["HCN adds to the C=C double bond of Y.", "Y has no C=C bond; HCN adds across C=O."],
        ], answer: "A", explanation: "Trigonal planar carbonyl carbon." }),
        P.num({ label: "(f)", marks: 2, stem: "Calculate the maximum mass, in g, of the hydroxynitrile formed from 2.90 g of X. (Mr: X 58, hydroxynitrile 85)", value: m, sf: 3, unit: "g", wrong: [2.9], explanation: `n(X) = 2.90 ÷ 58 = ${sfStr(n, 3)} mol; mass = ${sfStr(n, 3)} × 85 = ${sfStr(m, 3)} g.` }),
      ]),
      hints: ["Tollens' reacts only with aldehydes.", "The new C–C bond comes from the carbon of CN⁻."],
      explanation: `X propanone, Y propanal; Tollens' oxidises Y; nucleophilic addition; racemate from planar attack; ${sfStr(m, 3)} g of hydroxynitrile.`,
    });
  }

  // ---------------------------------------------------------------- T3 (A Level): acidity of phenols and acids
  {
    const c = 0.03, pk = 7.15;
    const p = pHWeakAcid(kaFromPKa(pk), c);
    b.struct({
      ...AL, d: 4, calculator: true,
      concepts: [A("hydroxy.phenol"), A("carboxylic.acidity-further-reactions")],
      stem: "pKa values at 298 K (data): 4-methylphenol, CH₃C₆H₄OH, 10.26; 4-nitrophenol, O₂NC₆H₄OH, 7.15.",
      parts: checkExam(EXAM.THEORY10, [
        P.mcq({ label: "(a)", marks: 1, stem: "Phenol is a stronger acid than 4-methylphenol but weaker than 4-nitrophenol. Which list is in order of increasing acid strength?", options: [
          ["ethanol < 4-methylphenol < phenol < 4-nitrophenol", "Correct: alkyl groups weaken, NO₂ strengthens, and alcohols are weakest."],
          ["4-methylphenol < ethanol < phenol < 4-nitrophenol", "Ethanol is a much weaker acid than any phenol."],
          ["ethanol < phenol < 4-methylphenol < 4-nitrophenol", "The methyl group donates electrons, so 4-methylphenol is weaker than phenol."],
          ["4-nitrophenol < phenol < 4-methylphenol < ethanol", "This is the reverse order."],
        ], answer: "A", explanation: "Larger pKa = weaker acid; ethanol about 16." }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the pH of 0.0300 mol dm⁻³ 4-nitrophenol, to two decimal places, using [H⁺] = √(Ka c).", value: p, dp: 2, wrong: [dpStr(-Math.log10(kaFromPKa(pk) * c), 2)], explanation: `Ka = 10⁻⁷·¹⁵ = ${sciStr(kaFromPKa(pk), 3)}; [H⁺] = √(${sciStr(kaFromPKa(pk), 3)} × 0.0300) = ${sciStr(Math.sqrt(kaFromPKa(pk) * c), 3)}; pH = ${dpStr(p, 2)}.` }),
        P.manual({ label: "(c)", marks: 2, stem: "Explain why 4-nitrophenol is a stronger acid than 4-methylphenol.", points: ["The NO₂ group is electron-withdrawing, so the negative charge of the phenoxide ion is spread further (anion stabilised)", "The CH₃ group donates electron density, concentrating the charge on O⁻ (anion destabilised)"], modelAnswer: "The nitro group withdraws electron density from the ring, spreading the negative charge of the 4-nitrophenoxide ion and stabilising it; the methyl group pushes electron density into the ring, concentrating the charge on the oxygen of 4-methylphenoxide and destabilising it." }),
        P.short({ label: "(d)", marks: 1, stem: "Name the organic product when phenol dissolves in aqueous sodium hydroxide.", accepted: ["sodium phenoxide", "sodium phenolate", "C6H5ONa", "C6H5O-Na+"], wrong: ["sodium benzoate"], explanation: "C₆H₅OH + NaOH → C₆H₅O⁻Na⁺ + H₂O." }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain why ethanoic acid releases carbon dioxide from sodium carbonate solution but phenol does not.", points: ["Ethanoic acid is a stronger acid than carbonic acid; phenol is weaker than carbonic acid", "because the ethanoate charge is delocalised over two O atoms, while in phenoxide it spreads into the less electronegative ring carbons"], modelAnswer: "Ethanoic acid is stronger than carbonic acid but phenol is weaker. The ethanoate ion's charge is shared by two electronegative oxygen atoms, whereas in phenoxide it spreads into ring carbons, which stabilises it less." }),
        P.mcq({ label: "(f)", marks: 1, stem: "What forms when phenol is shaken with excess bromine water?", options: [
          ["2,4,6-tribromophenol", "Correct: a white precipitate."],
          ["4-bromophenol only", "With excess bromine water all three activated positions are substituted."],
          ["bromobenzene", "The –OH group is not replaced."],
          ["3,5-dibromophenol", "–OH directs to 2, 4 and 6."],
        ], answer: "A", explanation: "C₆H₅OH + 3Br₂ → C₆H₂Br₃OH + 3HBr." }),
        P.short({ label: "(g)", marks: 1, stem: "Give the reagent and condition used to oxidise methylbenzene to benzoic acid (before acidification).", accepted: ["hot alkaline KMnO4", "alkaline potassium manganate(VII), heat", "hot alkaline potassium manganate(VII)", "alkaline KMnO4, reflux", "KMnO4 and NaOH, heat", "alkaline KMnO4 under reflux", "hot alkaline potassium permanganate"], normalise: ["trim", "lowercase", "collapse_whitespace"], wrong: ["acidified K2Cr2O7"], explanation: "Heat under reflux with alkaline KMnO₄, then acidify." }),
      ]),
      hints: ["Compare the stability of the anions.", "Ka = 10⁻ᵖᴷᵃ."],
      explanation: `Order ethanol < 4-methylphenol < phenol < 4-nitrophenol; pH = ${dpStr(p, 2)}; NO₂ withdraws and CH₃ donates electron density; sodium phenoxide; ethanoate more stable than phenoxide.`,
    });
  }

  // ---------------------------------------------------------------- T4 (A Level): acyl chlorides and amides
  {
    const n = moles(1.85, 92.5);
    const v = ((2 * n) / 0.5) * 1000;
    b.struct({
      ...AL, d: 4, calculator: true,
      concepts: [A("carboxylic.acyl-chlorides"), A("amines.amides"), A("carboxylic.acidity-further-reactions")],
      stem: "A reaction scheme starting from propanoic acid:\n\n| Step | Reactant | Reagent and conditions | Product |\n|---|---|---|---|\n| 1 | propanoic acid | reagent R | propanoyl chloride, CH₃CH₂COCl |\n| 2 | propanoyl chloride | excess methylamine, room temperature | amide S |\n| 3 | amide S | NaOH(aq), heat under reflux | two products |",
      parts: checkExam(EXAM.THEORY10, [
        P.short({ label: "(a)", marks: 1, stem: "Suggest reagent R.", accepted: ["SOCl2", "thionyl chloride", "PCl5", "phosphorus pentachloride", "phosphorus(V) chloride", "PCl3", "phosphorus trichloride", "phosphorus(III) chloride"], wrong: ["HCl"], explanation: "SOCl₂, PCl₅ or PCl₃ (heat)." }),
        P.manual({ label: "(b)", marks: 3, stem: "Describe the mechanism of step 2.", points: ["Lone pair on N of CH₃NH₂ attacks the δ+ carbonyl carbon; C=O π electrons move to O", "Tetrahedral intermediate with O⁻ and –N⁺H₂CH₃ on the same carbon", "C=O reforms and Cl⁻ is eliminated; H⁺ is lost from N (removed by a second CH₃NH₂)"], modelAnswer: "The nitrogen lone pair of methylamine attacks the δ+ carbon of C=O while the π electrons move to oxygen, giving a tetrahedral intermediate with O⁻ and –N⁺H₂CH₃. The C=O bond reforms, chloride is eliminated, and a second methylamine removes H⁺ from nitrogen, giving the amide." }),
        P.short({ label: "(c)", marks: 1, stem: "Give the structural formula of S (for example CH3CONH2).", accepted: ["CH3CH2CONHCH3", "CH₃CH₂CONHCH₃", "C2H5CONHCH3"], normalise: ["trim", "collapse_whitespace"], wrong: ["CH3CH2CONH2"], explanation: "N-methylpropanamide." }),
        P.num({ label: "(d)", marks: 2, stem: "1.85 g of propanoyl chloride (Mr 92.5) is added to water. Calculate the volume, in cm³, of 0.500 mol dm⁻³ NaOH needed to neutralise all the acid formed.", value: v, sf: 3, unit: "cm³", wrong: [v / 2], explanation: `n = 1.85 ÷ 92.5 = ${sfStr(n, 3)} mol; CH₃CH₂COCl + H₂O → CH₃CH₂COOH + HCl gives 2 mol acid per mol, so n(NaOH) = ${sfStr(2 * n, 3)} mol; V = ${sfStr(2 * n, 3)} ÷ 0.500 dm³ = ${sfStr(v, 3)} cm³.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Name the two products of step 3.", points: ["Sodium propanoate (CH₃CH₂COONa)", "Methylamine (CH₃NH₂)"], modelAnswer: "Sodium propanoate and methylamine." }),
        P.mcq({ label: "(f)", marks: 1, stem: "Which compound is hydrolysed most rapidly by cold water?", options: [
          ["propanoyl chloride", "Correct: the carbonyl carbon is very δ+ and planar."],
          ["1-chloropropane", "Alkyl chlorides need warm aqueous alkali."],
          ["chlorobenzene", "Aryl chlorides are not hydrolysed under normal conditions."],
          ["N-methylpropanamide", "Amides need prolonged heating with acid or alkali."],
        ], answer: "A", explanation: "Acyl chloride > alkyl chloride > aryl chloride." }),
      ]),
      hints: ["Acyl chloride hydrolysis gives two acids.", "Addition, then elimination."],
      explanation: `R SOCl₂/PCl₅; addition-elimination; S CH₃CH₂CONHCH₃; ${sfStr(v, 3)} cm³ NaOH; sodium propanoate + methylamine.`,
    });
  }

  // ---------------------------------------------------------------- T5 (A Level): amines and azo dyes
  {
    const n = 0.2;
    const th = n * 93;
    const y = percentYield(13.95, th);
    b.struct({
      ...AL, d: 4, calculator: true,
      concepts: [A("amines.preparation-basicity"), A("amines.phenylamine-azo"), A("amines.amides")],
      stem: "Phenylamine, C₆H₅NH₂ (Mr 93), is a starting material for azo dyes.",
      parts: checkExam(EXAM.THEORY10, [
        P.mcq({ label: "(a)", marks: 1, stem: "Which list shows increasing base strength?", options: [
          ["ethanamide < phenylamine < ammonia < ethylamine", "Correct: amides are almost neutral; ethylamine is strongest."],
          ["phenylamine < ethanamide < ammonia < ethylamine", "Ethanamide is weaker still: its lone pair is delocalised over C=O."],
          ["ethanamide < ammonia < phenylamine < ethylamine", "Phenylamine is weaker than ammonia."],
          ["ethylamine < ammonia < phenylamine < ethanamide", "This is the reverse order."],
        ], answer: "A", explanation: "Lone-pair availability decides basicity." }),
        P.manual({ label: "(b)", marks: 2, stem: "Explain why phenylamine is a weaker base than ethylamine.", points: ["In phenylamine the N lone pair is delocalised into the benzene ring, so less available to accept H⁺", "In ethylamine the ethyl group donates electron density to N, making the lone pair more available"], modelAnswer: "Phenylamine's lone pair overlaps with the ring π system and is less available to accept a proton, whereas the ethyl group in ethylamine pushes electron density onto nitrogen, making its lone pair more available." }),
        P.short({ label: "(c)", marks: 1, stem: "Give the reagents used to reduce nitrobenzene to phenylamine.", accepted: ["tin and concentrated hydrochloric acid", "Sn and HCl", "Sn and conc HCl", "tin and HCl", "tin and concentrated HCl", "Sn/HCl", "Sn + HCl"], normalise: ["trim", "lowercase", "collapse_whitespace"], wrong: ["NaBH4"], explanation: "Sn + concentrated HCl, reflux; then NaOH(aq)." }),
        P.num({ label: "(d)", marks: 2, stem: "The reduction of 0.200 mol of nitrobenzene gives 13.95 g of phenylamine. Calculate the percentage yield.", value: y, sf: 3, unit: "%", wrong: [percentYield(13.95, 0.2 * 123)], explanation: `n(nitrobenzene) = ${sfStr(n, 3)} mol; maximum = ${sfStr(n, 3)} × 93 = ${sfStr(th, 3)} g; yield = 13.95 ÷ ${sfStr(th, 3)} × 100 = ${sfStr(y, 3)}%.` }),
        P.mcq({ label: "(e)", marks: 1, stem: "Which conditions convert phenylamine into benzenediazonium chloride?", options: [
          ["NaNO₂ and dilute HCl below 10 °C", "Correct: the diazonium salt decomposes when warm."],
          ["NaNO₂ and dilute HCl at 60 °C", "At 60 °C the product decomposes to phenol and nitrogen."],
          ["concentrated HNO₃ and H₂SO₄ at 50 °C", "These nitrate the ring."],
          ["Sn and concentrated HCl under reflux", "These reduce nitro groups."],
        ], answer: "A", explanation: "Diazotisation in the cold." }),
        P.short({ label: "(f)", marks: 1, stem: "Give the structural formula of the azo compound formed when benzenediazonium chloride couples with phenol in alkali (for example C6H5N=NC6H5).", accepted: ["C6H5N=NC6H4OH", "C₆H₅N=NC₆H₄OH", "C6H5-N=N-C6H4OH", "HOC6H4N=NC6H5"], normalise: ["trim", "collapse_whitespace"], wrong: ["C6H5N=NC6H5OH"], explanation: "4-hydroxyazobenzene." }),
        P.manual({ label: "(g)", marks: 2, stem: "Explain why azo compounds are coloured.", points: ["Extended delocalisation over both rings and the –N=N– group", "lowers the energy gap so that light in the visible region is absorbed (the complementary colour is seen)"], modelAnswer: "The π system is delocalised over both benzene rings and the azo group, so the gap between electron energy levels is small enough for visible light to be absorbed; we see the complementary colour." }),
      ]),
      hints: ["Lone-pair availability decides base strength.", "Diazonium salts are unstable when warm."],
      explanation: `Basicity ethanamide < phenylamine < ammonia < ethylamine; Sn/conc. HCl; yield ${sfStr(y, 3)}%; diazotise below 10 °C; C₆H₅N=NC₆H₄OH; colour from extended delocalisation.`,
    });
  }

  // ---------------------------------------------------------------- T6 (A Level): amino acids and electrophoresis
  {
    const mr = 121 + 155 + 147 - 2 * 18;
    b.struct({
      ...AL, d: 3,
      concepts: [A("amines.amino-acids")],
      stem: "Isoelectric points (data): histidine 7.6; cysteine 5.1; glutamic acid 3.2. Cysteine has the side chain –CH₂SH.",
      parts: checkExam(EXAM.THEORY10, [
        P.manual({ label: "(a)", marks: 1, stem: "Give the structural formula of the zwitterion of cysteine.", points: ["H₃N⁺CH(CH₂SH)COO⁻"], modelAnswer: "H₃N⁺CH(CH₂SH)COO⁻" }),
        P.match({ label: "(b)", stem: "A mixture of the three amino acids is placed at the centre of an electrophoresis strip in a buffer of pH 5.1. Match each amino acid with its behaviour.", pairs: [
          ["histidine", "moves towards the negative electrode"],
          ["cysteine", "does not move"],
          ["glutamic acid", "moves towards the positive electrode"],
        ], explanation: "pH below pI → positive; pH equal to pI → no net charge; pH above pI → negative." }),
        P.num({ label: "(c)", marks: 1, stem: "Calculate Mr of the tripeptide Cys-His-Glu. (Mr: cysteine 121, histidine 155, glutamic acid 147, water 18)", value: mr, wrong: [121 + 155 + 147], explanation: `121 + 155 + 147 − 2(18) = ${mr}.` }),
        P.num({ label: "(d)", marks: 1, stem: "How many different tripeptides contain each of these three amino acids once?", value: 6, wrong: [27], explanation: "3 × 2 × 1 = 6." }),
        P.manual({ label: "(e)", marks: 2, stem: "Give the conditions for hydrolysing the tripeptide in the laboratory and the form in which glutamic acid is present in the hydrolysis mixture.", points: ["Heat under reflux with about 6 mol dm⁻³ HCl for several hours", "As the cation, H₃N⁺CH(CH₂CH₂COOH)COOH (protonated amino group, un-ionised COOH groups)"], modelAnswer: "Reflux with about 6 mol dm⁻³ hydrochloric acid for several hours; glutamic acid is present as H₃N⁺CH(CH₂CH₂COOH)COOH." }),
        P.manual({ label: "(f)", marks: 2, stem: "Explain why amino acids are crystalline solids with high melting points.", points: ["They exist as zwitterions", "with strong ionic attractions between –NH₃⁺ and –COO⁻ groups of neighbouring ions (ionic lattice)"], modelAnswer: "In the solid, amino acids are zwitterions held in a lattice by strong ionic attractions between the –NH₃⁺ group of one ion and the –COO⁻ group of another." }),
      ]),
      hints: ["Compare the buffer pH with each isoelectric point."],
      explanation: `Zwitterion H₃N⁺CH(CH₂SH)COO⁻; histidine to −, cysteine stays, glutamic acid to +; Mr ${mr}; six sequences; acid hydrolysis gives cations.`,
    });
  }
});
