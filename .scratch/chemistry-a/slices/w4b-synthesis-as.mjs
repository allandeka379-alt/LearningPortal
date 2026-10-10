// W4b: achem.organic.synthesis-as (Cambridge only, AS Level 21.1)
import { concept, P, t, ce, CAM, Mr, moles, percentYield, sfStr, dpStr } from "../lib.mjs";

concept("achem.organic.synthesis-as", { file: "organic/synthesis-as", keyPrefix: "organic.synthesis-as", applies: CAM }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which reagent and conditions convert 1-bromopropane into butanenitrile?",
    options: [
      ["KCN in ethanol, heat under reflux", "Correct: the cyanide ion substitutes for bromine, adding one carbon atom."],
      ["HCN with a KCN catalyst, room temperature", "HCN with KCN adds to aldehydes and ketones, not to halogenoalkanes."],
      ["aqueous KCN, distil the product off", "An ethanolic solvent and reflux are needed; water would also hydrolyse the halogenoalkane."],
      ["NaOH in ethanol, heat under reflux", "Ethanolic hydroxide eliminates HBr to give propene."],
    ],
    answer: "A",
    explanation: "CH₃CH₂CH₂Br + CN⁻ → CH₃CH₂CH₂CN + Br⁻ (KCN in ethanol, reflux): nucleophilic substitution.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which AS Level reaction increases the length of a carbon chain by one atom?",
    options: [
      ["propanal with HCN and a KCN catalyst", "Correct: the CN carbon joins the chain, giving 2-hydroxybutanenitrile."],
      ["propan-1-ol with acidified potassium dichromate(VI)", "Oxidation changes the functional group but not the number of carbons."],
      ["1-bromopropane with aqueous sodium hydroxide", "Substitution by OH⁻ gives propan-1-ol, still three carbons."],
      ["propanoic acid with lithium tetrahydridoaluminate", "Reduction gives propan-1-ol, with the same chain."],
    ],
    answer: "A",
    explanation: "Only cyanide reactions (KCN on halogenoalkanes, HCN on carbonyls) make a new C–C bond at AS Level.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: t`Pent-4-enal, $\ce{CH2=CHCH2CH2CHO}$, is treated with sodium tetrahydridoborate, $\ce{NaBH4}$. What is the organic product?`,
    options: [
      [t`$\ce{CH2=CHCH2CH2CH2OH}$`, "Correct: NaBH₄ reduces the aldehyde C=O to a primary alcohol but leaves the C=C."],
      [t`$\ce{CH3CH2CH2CH2CH2OH}$`, "NaBH₄ does not reduce C=C; that would need H₂ with a nickel catalyst."],
      [t`$\ce{CH3CH2CH2CH2CHO}$`, "This reduces the C=C instead of the C=O, the opposite of what NaBH₄ does."],
      [t`$\ce{CH2=CHCH2CH2COOH}$`, "That is oxidation; NaBH₄ is a reducing agent."],
    ],
    answer: "A",
    hints: ["Which bonds does NaBH₄ attack?"],
    explanation: "NaBH₄ supplies H⁻, which attacks the δ+ carbon of C=O; a non-polar C=C is not attacked.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Ethanol is the only organic starting material. Which route makes ethyl ethanoate?",
    options: [
      ["Oxidise part of the ethanol by heating under reflux with acidified K₂Cr₂O₇; heat the product with more ethanol and concentrated H₂SO₄.", "Correct: ethanoic acid is made, then esterified with ethanol."],
      ["Oxidise part of the ethanol by distilling with acidified K₂Cr₂O₇; heat the product with more ethanol and concentrated H₂SO₄.", "Distillation gives ethanal, an aldehyde, which does not form an ester with ethanol."],
      ["Heat the ethanol with concentrated H₂SO₄ at 170 °C; react the product with steam over phosphoric acid.", "This dehydrates ethanol to ethene and then makes ethanol again."],
      ["Heat the ethanol with NaBH₄; heat the product with ethanol and concentrated H₂SO₄.", "NaBH₄ is a reducing agent and does not react with an alcohol to give anything useful."],
    ],
    answer: "A",
    hints: ["An ester needs an acid and an alcohol."],
    explanation: "Reflux takes ethanol to ethanoic acid; acid + ethanol with a concentrated H₂SO₄ catalyst gives CH₃COOCH₂CH₃.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: t`Compound X is $\ce{HOCH2CH2CHO}$. Which statements are correct?\n\n1. X gives a silver mirror when warmed with Tollens' reagent.\n2. X gives effervescence with sodium carbonate solution.\n3. X turns warm acidified potassium dichromate(VI) from orange to green.`,
    options: [
      ["1 and 3 only", "Correct: the aldehyde reduces Tollens' reagent, and both the aldehyde and the primary alcohol reduce dichromate(VI)."],
      ["1, 2 and 3", "Statement 2 is false: X has no –COOH group, so no CO₂ is released."],
      ["2 and 3 only", "Statement 2 is false and statement 1 is true."],
      ["1 only", "Statement 3 is also true: X has groups that are oxidised by dichromate(VI)."],
    ],
    answer: "A",
    hints: ["List the functional groups first."],
    explanation: "X has a primary alcohol and an aldehyde, but no carboxylic acid.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "1-bromopropane is converted to butanoic acid in two steps: (I) KCN in ethanol, heat under reflux; (II) dilute hydrochloric acid, heat under reflux. Which statements are correct?\n\n1. Step I is a nucleophilic substitution.\n2. Some propene may form as an organic by-product in step I.\n3. Ammonium ions form in step II.",
    options: [
      ["1, 2 and 3", "Correct: CN⁻ substitutes for Br⁻; CN⁻ is also a base, so some elimination occurs; nitrile hydrolysis in acid gives NH₄⁺."],
      ["1 and 2 only", "Statement 3 is also true: the nitrogen ends up as NH₄⁺ in acid."],
      ["1 and 3 only", "Statement 2 is also true: elimination can compete with substitution."],
      ["1 only", "Statements 2 and 3 are also true."],
    ],
    answer: "A",
    hints: ["Where does the nitrogen of the nitrile end up?"],
    explanation: "RCN + 2H₂O + H⁺ → RCOOH + NH₄⁺. Propene is a possible elimination by-product in step I.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which reagent distinguishes propanal from propanone?",
    options: [
      ["Tollens' reagent, warmed", "Correct: propanal gives a silver mirror; propanone does not react."],
      ["2,4-dinitrophenylhydrazine", "Both carbonyl compounds give an orange-yellow precipitate."],
      ["bromine water", "Neither has a C=C, so neither decolorises bromine water."],
      ["sodium hydrogencarbonate solution", "Neither is an acid, so neither gives CO₂."],
    ],
    answer: "A",
    explanation: "Aldehydes are oxidised by Tollens' (or Fehling's) reagent; ketones are not.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: t`A student plans to make 2-hydroxypropanoic acid, $\ce{CH3CH(OH)COOH}$, from ethanol. Which sequence of reagents is correct?`,
    options: [
      ["acidified K₂Cr₂O₇ (distil); then HCN with KCN; then dilute HCl and heat", "Correct: ethanal, then 2-hydroxypropanenitrile, then hydrolysis to the acid."],
      ["acidified K₂Cr₂O₇ (reflux); then HCN with KCN; then dilute HCl and heat", "Reflux gives ethanoic acid, which does not add HCN."],
      ["PCl₅; then KCN in ethanol; then dilute HCl and heat", "This gives propanoic acid, with no OH group on carbon 2."],
      ["acidified K₂Cr₂O₇ (distil); then KCN in ethanol; then NaBH₄", "KCN in ethanol does not react with an aldehyde, and NaBH₄ cannot make a COOH group."],
    ],
    answer: "A",
    hints: ["The OH and the COOH must end up on adjacent carbons."],
    explanation: "CH₃CH₂OH → CH₃CHO → CH₃CH(OH)CN → CH₃CH(OH)COOH: oxidation, nucleophilic addition, hydrolysis.",
  });
  {
    const overall = 0.75 * 0.8 * 0.6 * 100;
    b.num({
      d: 2, skill: "APPLICATION", calculator: true, daily: true,
      stem: "A three-step synthesis has yields of 75%, 80% and 60% for the separate steps. Calculate the overall percentage yield.",
      value: overall, sf: 3, unit: "%",
      wrong: [(75 + 80 + 60) / 3],
      explanation: `Overall yield = 0.75 × 0.80 × 0.60 × 100 = ${sfStr(overall, 3)}%. Averaging the three yields (${sfStr((75 + 80 + 60) / 3, 3)}%) is wrong: the losses multiply.`,
    });
  }
  {
    const n = moles(5.45, Mr("C2H5Br"));
    const theo = n * Mr("C2H5COOH");
    const actual = theo * 0.65;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: "Tendai converts 5.45 g of bromoethane, C₂H₅Br, into propanoic acid, C₂H₅COOH, by the nitrile route. The overall yield is 65.0%. Calculate the mass of propanoic acid obtained, in g. Ar: H 1.0, C 12.0, O 16.0, Br 79.9.",
      value: actual, sf: 3, unit: "g",
      wrong: [theo, n * Mr("CH3COOH") * 0.65],
      hints: ["One mole of bromoethane gives at most one mole of propanoic acid."],
      explanation: `1. Mr(C₂H₅Br) = ${Mr("C2H5Br").toFixed(1)}; n = 5.45 ÷ ${Mr("C2H5Br").toFixed(1)} = ${sfStr(n, 3)} mol.\n2. Theoretical propanoic acid = ${sfStr(n, 3)} × ${Mr("C2H5COOH").toFixed(1)} = ${sfStr(theo, 3)} g.\n3. Actual = 0.650 × ${sfStr(theo, 3)} = ${sfStr(actual, 3)} g.\n4. ${sfStr(theo, 3)} g ignores the yield; using Mr of ethanoic acid forgets the extra carbon from cyanide.`,
    });
  }
  {
    const n = moles(4.4, Mr("CH3CHO"));
    const m = n * Mr("CH3CH(OH)CN");
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "4.40 g of ethanal reacts completely with HCN (KCN catalyst). Calculate the maximum mass of 2-hydroxypropanenitrile, CH₃CH(OH)CN, that can form, in g. Ar: H 1.0, C 12.0, N 14.0, O 16.0.",
      value: m, sf: 3, unit: "g",
      wrong: [4.4],
      hints: ["The ratio is 1 : 1; Mr changes."],
      explanation: `n(CH₃CHO) = 4.40 ÷ ${Mr("CH3CHO")} = ${sfStr(n, 3)} mol; mass = ${sfStr(n, 3)} × ${Mr("CH3CH(OH)CN")} = ${sfStr(m, 3)} g.`,
    });
  }
  b.tf({
    d: 2, skill: "RECALL",
    stem: "Lithium tetrahydridoaluminate, LiAlH₄, reduces a carboxylic acid to a primary alcohol.",
    answer: true,
    explanation: "True. LiAlH₄ in dry ether reduces RCOOH to RCH₂OH; NaBH₄ cannot.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Heating a primary alcohol under reflux with acidified potassium dichromate(VI) is the best way to make an aldehyde.",
    answer: false,
    explanation: "False. Under reflux the aldehyde is oxidised further to the carboxylic acid. Distil the aldehyde off as it forms.",
  });
  b.match({
    d: 3, skill: "RECALL",
    stem: "Match each conversion with the reagent and conditions needed.",
    pairs: [
      ["2-bromopropane → propene", "NaOH in ethanol, heat"],
      ["2-bromopropane → propan-2-ol", "NaOH(aq), heat under reflux"],
      ["propan-2-ol → propanone", "acidified K₂Cr₂O₇, heat"],
      ["propanone → propan-2-ol", "NaBH₄"],
      ["propene → propan-2-ol", "steam, H₃PO₄ catalyst, high temperature and pressure"],
    ],
    hints: ["The solvent decides between substitution and elimination."],
    explanation: "Ethanolic NaOH eliminates; aqueous NaOH substitutes; dichromate oxidises secondary alcohols to ketones; NaBH₄ reduces them back; steam adds across C=C.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Complete the route from 1-chlorobutane to pentanoic acid.",
    template: "Step 1: heat under reflux with {{blank:a}} to form {{blank:b}}. Step 2: heat under reflux with dilute {{blank:c}} to hydrolyse it.",
    blanks: [
      { id: "a", accepted: ["KCN in ethanol"], choices: ["KCN in ethanol", "NaOH in ethanol", "NH₃ in ethanol"] },
      { id: "b", accepted: ["pentanenitrile"], choices: ["pentanenitrile", "butanenitrile", "pentan-1-ol"] },
      { id: "c", accepted: ["hydrochloric acid"], choices: ["hydrochloric acid", "potassium dichromate(VI)", "sodium tetrahydridoborate"] },
    ],
    hints: ["Count carbons: the nitrile has five, including the CN carbon."],
    explanation: "CH₃(CH₂)₃Cl + CN⁻ → CH₃(CH₂)₃CN (pentanenitrile, five carbons); hydrolysis with dilute acid gives CH₃(CH₂)₃COOH.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give a reagent that converts propan-2-ol into 2-chloropropane.",
    accepted: ["PCl5", "phosphorus pentachloride", "phosphorus(V) chloride", "SOCl2", "thionyl chloride", "sulfur dichloride oxide", "PCl3", "phosphorus trichloride", "phosphorus(III) chloride", "HCl", "hydrogen chloride", "KCl and concentrated H2SO4", "KCl and concentrated sulfuric acid", "KCl and concentrated sulphuric acid", "KCl and concentrated H3PO4", "NaCl and concentrated H2SO4", "NaCl and concentrated sulfuric acid"],
    wrong: ["Cl2"],
    explanation: "PCl₅ (room temperature), PCl₃ (heat), SOCl₂, HCl(g), or KCl with concentrated H₂SO₄ or H₃PO₄ all substitute Cl for OH.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Ethene is the only organic starting material. Outline a route to ethyl ethanoate, giving reagents and conditions for each step.",
    points: ["Ethene + steam with an H₃PO₄ catalyst (about 300 °C, 60-70 atm) gives ethanol", "Oxidise part of the ethanol by heating under reflux with acidified K₂Cr₂O₇ (or KMnO₄) to ethanoic acid", "Heat ethanoic acid with ethanol and a concentrated H₂SO₄ catalyst", "Correct identities: ethanol, ethanoic acid, ester CH₃COOCH₂CH₃"],
    modelAnswer: "1. Ethene and steam over a phosphoric acid catalyst at about 300 °C and 60-70 atm give ethanol. 2. Part of the ethanol is heated under reflux with acidified potassium dichromate(VI), giving ethanoic acid. 3. The ethanoic acid is heated with more ethanol and a few drops of concentrated sulfuric acid, giving ethyl ethanoate, CH₃COOCH₂CH₃, and water.",
    hints: ["The ester needs both an alcohol and an acid made from ethene."],
    explanation: "Two of the three intermediates come from the same ethanol batch.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "1-chloropropane is heated under pressure with ammonia in ethanol to make propan-1-amine. Suggest one organic by-product and how its formation can be reduced.",
    points: ["By-product: a further-substituted amine, e.g. (CH₃CH₂CH₂)₂NH, formed when propan-1-amine reacts with more 1-chloropropane", "Use a large excess of ammonia"],
    modelAnswer: "Propan-1-amine is itself a nucleophile and can attack more 1-chloropropane, giving dipropylamine (and further products). Using a large excess of ammonia makes it more likely that the halogenoalkane meets ammonia rather than the amine.",
    hints: ["The product amine also has a lone pair."],
    explanation: "Excess ammonia favours the primary amine.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: t`Predict the organic product of each reaction of but-3-enoic acid, $\ce{CH2=CHCH2COOH}$: (i) $\ce{H2}$ with a nickel catalyst; (ii) bromine water; (iii) aqueous sodium carbonate; (iv) $\ce{LiAlH4}$ in dry ether.`,
    points: ["(i) CH₃CH₂CH₂COOH, butanoic acid (C=C reduced)", "(ii) CH₂BrCHBrCH₂COOH, 3,4-dibromobutanoic acid (addition across C=C; accept the bromohydrin CH₂BrCH(OH)CH₂COOH)", "(iii) CH₂=CHCH₂COONa (sodium but-3-enoate), with CO₂ and water", "(iv) CH₂=CHCH₂CH₂OH, but-3-en-1-ol (COOH reduced, C=C unchanged)"],
    modelAnswer: "(i) Butanoic acid, CH₃CH₂CH₂COOH. (ii) 3,4-dibromobutanoic acid, CH₂BrCHBrCH₂COOH (in bromine water some bromohydrin also forms). (iii) Sodium but-3-enoate, CH₂=CHCH₂COO⁻Na⁺, with effervescence of CO₂. (iv) But-3-en-1-ol, CH₂=CHCH₂CH₂OH.",
    hints: ["Treat the C=C and the COOH separately."],
    explanation: "Each group reacts independently; LiAlH₄ reduces the acid but not the isolated C=C.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`A route from propene to 2-methyl-2-hydroxypropanoic acid, $\ce{(CH3)2C(OH)COOH}$, is shown.

| Step | Reagent and conditions | Product |
|---|---|---|
| 1 | steam, $\ce{H3PO4}$ catalyst, high temperature and pressure | A |
| 2 | acidified $\ce{K2Cr2O7}$, heat | B, $\ce{CH3COCH3}$ |
| 3 | HCN, KCN catalyst, heat | C |
| 4 | dilute HCl, heat under reflux | $\ce{(CH3)2C(OH)COOH}$ |`,
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name compound A, the major product of step 1.", accepted: ["propan-2-ol", "2-propanol", "propan 2 ol", "isopropanol", "isopropyl alcohol"], wrong: ["propan-1-ol"], explanation: "Markovnikov addition via the secondary carbocation gives propan-2-ol." }),
      P.short({ label: "(b)", marks: 1, stem: "Name the organic by-product of step 1.", accepted: ["propan-1-ol", "1-propanol", "propan 1 ol"], wrong: ["propan-2-ol"], explanation: "The minor product, via the primary carbocation." }),
      P.mcq({ label: "(c)", marks: 1, stem: "What type of reaction is step 3?", options: [
        ["nucleophilic addition", "Correct: CN⁻ attacks the δ+ carbonyl carbon."],
        ["electrophilic addition", "The carbonyl carbon is attacked by a nucleophile, not an electrophile."],
        ["nucleophilic substitution", "Nothing is replaced; HCN adds across C=O."],
        ["condensation", "No small molecule is lost."],
      ], answer: "A", explanation: "HCN adds across C=O by nucleophilic addition." }),
      P.short({ label: "(d)", marks: 1, stem: "Give the structural formula of C.", accepted: ["(CH3)2C(OH)CN", "(CH₃)₂C(OH)CN", "CH3C(OH)(CN)CH3", "CH3C(CH3)(OH)CN"], normalise: ["trim", "collapse_whitespace"], wrong: ["(CH3)2CHCN"], explanation: "2-hydroxy-2-methylpropanenitrile." }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain why step 2 is carried out under reflux without the risk of over-oxidation, whereas a primary alcohol must be distilled to stop at the aldehyde.", points: ["A secondary alcohol is oxidised to a ketone, which is not oxidised further by acidified dichromate(VI) (no H on the carbonyl carbon)", "An aldehyde is easily oxidised further to a carboxylic acid, so it must be removed (distilled) as soon as it forms"], modelAnswer: "Propan-2-ol, a secondary alcohol, gives propanone, a ketone, which acidified dichromate(VI) cannot oxidise further, so refluxing is safe. A primary alcohol gives an aldehyde, which is easily oxidised to the carboxylic acid, so the aldehyde must be distilled off as it forms." }),
      P.num({ label: "(f)", marks: 2, stem: "The yields of steps 1 to 4 are 72%, 85%, 65% and 75%. Calculate the overall percentage yield, to two significant figures.", value: 0.72 * 0.85 * 0.65 * 0.75 * 100, sf: 2, unit: "%", wrong: [(72 + 85 + 65 + 75) / 4], explanation: `0.72 × 0.85 × 0.65 × 0.75 × 100 = ${sfStr(0.72 * 0.85 * 0.65 * 0.75 * 100, 2)}%.` }),
      P.manual({ label: "(g)", marks: 2, stem: "State one hazard of step 3 and a precaution to deal with it.", points: ["HCN is extremely toxic (and volatile)", "Work in a fume cupboard (and keep acid away from cyanide salts / wear gloves and eye protection)"], modelAnswer: "Hydrogen cyanide is an extremely toxic, volatile gas; the reaction must be done in a fume cupboard, wearing gloves and eye protection." }),
      P.manual({ label: "(h)", marks: 2, stem: "Suggest why this route gives a single product in step 3, whereas HCN adding to propanal would give a mixture of two stereoisomers.", points: ["Propanone has two identical CH₃ groups on the carbonyl carbon, so C has no chiral centre", "Propanal gives a chiral product (C bonded to H, OH, CN and C₂H₅), and CN⁻ attacks the planar C=O from either side equally, giving a racemic mixture of two optical isomers"], modelAnswer: "In C the carbon bearing OH and CN also carries two methyl groups, so it is not chiral and only one product exists. With propanal, the new carbon carries H, OH, CN and C₂H₅, so it is chiral; the planar C=O is attacked equally from both faces, giving a racemic mixture of two optical isomers." }),
    ],
    hints: ["Propene + steam follows Markovnikov's rule.", "Overall yield = product of step yields."],
    explanation: `A propan-2-ol (by-product propan-1-ol); B propanone; C (CH₃)₂C(OH)CN by nucleophilic addition; overall yield ${sfStr(0.72 * 0.85 * 0.65 * 0.75 * 100, 2)}%.`,
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: "Compound D, C₄H₈O₂, has an unbranched chain. It gives the results below.\n\n| Test | Observation |\n|---|---|\n| sodium metal | effervescence |\n| aqueous sodium carbonate | no effervescence |\n| 2,4-DNPH reagent | orange-yellow precipitate |\n| Tollens' reagent, warm | no silver mirror |\n| alkaline aqueous iodine, warm | yellow precipitate |\n| acidified K₂Cr₂O₇, warm | orange to green |",
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "State what each of four of the observations tells you about D.", points: ["Effervescence with Na: an –OH group is present", "No CO₂ with Na₂CO₃: not a carboxylic acid", "2,4-DNPH positive but Tollens' negative: a ketone C=O (not an aldehyde)", "Yellow precipitate with alkaline iodine: a CH₃CO– (or CH₃CH(OH)–) group; dichromate turns green: a primary or secondary alcohol"], modelAnswer: "Sodium shows an O–H group; no reaction with carbonate shows it is not an acid; a 2,4-DNPH precipitate with no silver mirror shows a ketone; the iodoform result shows CH₃CO– (or CH₃CH(OH)–), and the dichromate change shows an oxidisable (primary or secondary) alcohol group." }),
      P.short({ label: "(b)", marks: 2, stem: "Suggest the structural formula of D.", accepted: ["CH3COCH2CH2OH", "CH₃COCH₂CH₂OH", "HOCH2CH2COCH3", "HOCH₂CH₂COCH₃"], normalise: ["trim", "collapse_whitespace"], wrong: ["CH3CH2CH2COOH"], explanation: "4-hydroxybutan-2-one: an unbranched C₄ chain with CH₃CO– and a primary –CH₂OH." }),
      P.short({ label: "(c)", marks: 2, stem: "Give the structural formula of the organic product when D is warmed with NaBH₄.", accepted: ["CH3CH(OH)CH2CH2OH", "CH₃CH(OH)CH₂CH₂OH", "HOCH2CH2CH(OH)CH3", "HOCH₂CH₂CH(OH)CH₃"], normalise: ["trim", "collapse_whitespace"], wrong: ["CH3COCH2CH2OH"], explanation: "The ketone is reduced to a secondary alcohol: butane-1,3-diol." }),
    ],
    hints: ["Positive 2,4-DNPH plus negative Tollens' means a ketone."],
    explanation: "D is CH₃COCH₂CH₂OH (4-hydroxybutan-2-one); NaBH₄ gives butane-1,3-diol.",
  });
  b.card("CONCEPT", "Adding one carbon (AS)", "Halogenoalkane + KCN in ethanol, reflux → nitrile; carbonyl + HCN/KCN → hydroxynitrile; then hydrolyse –CN to –COOH.");
  b.card("FACT", "Nitrile hydrolysis", "Dilute HCl, heat under reflux (gives RCOOH + NH₄⁺); or dilute NaOH, heat, then acidify.");
  b.card("FACT", "Aqueous or ethanolic NaOH?", "NaOH(aq) + halogenoalkane → alcohol (substitution); NaOH in ethanol → alkene (elimination).");
  b.card("FACT", "Distil or reflux?", "Primary alcohol + acidified K₂Cr₂O₇: distil off → aldehyde; reflux → carboxylic acid.");
  b.card("FACT", "NaBH₄ vs LiAlH₄", "NaBH₄ reduces aldehydes and ketones only; LiAlH₄ also reduces carboxylic acids to primary alcohols. Neither reduces C=C.");
  b.card("CONCEPT", "Planning a route", "Compare carbon skeletons and functional groups; work backwards from the target; give reagent, conditions, product and reaction type for each step.");
  b.card("CONCEPT", "Overall yield", "Multiply the step yields: 80% then 70% gives 56% overall.");
  b.card("CONCEPT", "Analysing a route", "For each step: reaction type, reagents, conditions, inorganic and organic by-products, hazards.");
  b.card("FACT", "Testing for a ketone", "2,4-DNPH positive, Tollens' and Fehling's negative.");
});
