// W3b: ZIMSEC-only exam-format items: three Paper 3 Section C free-response questions (15 marks): alkenes and
// electrophilic addition; benzene and arene substitution; halogenoalkane mechanisms, kinetics and CFCs.
import { concept, P, t, EXAM, checkExam, ZIM, Mr, moles, percentYield, VM_RTP, rateConstant, halfLifeFromK, sfStr, dpStr, sciStr } from "../lib.mjs";

const A = (k) => `achem.${k}`;
const P3 = { skill: EXAM.ZIM_P3_FREE.skill, secs: EXAM.ZIM_P3_FREE.secs, applies: EXAM.ZIM_P3_FREE.applies, examStyle: true, paper: "Paper 3 Section C" };

concept(A("hydrocarbons.electrophilic-addition"), { file: "exam/w3b-zimsec", keyPrefix: "exam.w3b-zimsec", applies: ZIM }, (b) => {
  // ---------------------------------------------------------------- Z1: pentenes, electrophilic addition and oxidation
  {
    const n = moles(1.75, Mr("C5H10"));
    const v = n * VM_RTP * 1000;
    b.struct({
      ...P3, d: 4, calculator: true,
      concepts: [A("hydrocarbons.electrophilic-addition"), A("hydrocarbons.alkenes-reactions"), A("organic.isomerism")],
      stem: "This question is about the isomeric alkenes pent-1-ene, CH₂=CHCH₂CH₂CH₃, and 2-methylbut-2-ene, (CH₃)₂C=CHCH₃.",
      parts: checkExam(EXAM.ZIM_P3_FREE, [
        P.manual({
          label: "(a)", marks: 5, type: "EXTENDED_RESPONSE", wordLimit: { max: 250 },
          stem: "Pent-1-ene reacts with hydrogen bromide. Describe the mechanism of the reaction that forms the major product, and explain why this product is the major one.",
          points: ["H–Br is polar, Hδ+–Brδ−", "Curly arrow from the C=C π bond to Hδ+; curly arrow from the H–Br bond to Br, forming Br⁻", "Secondary carbocation CH₃C⁺HCH₂CH₂CH₃ (H added to C1)", "Curly arrow from a lone pair on Br⁻ to C⁺, giving 2-bromopentane", "The secondary carbocation is more stable than the primary one (two electron-donating alkyl groups disperse the charge), so it forms faster"],
          modelAnswer: "Hydrogen bromide is polarised Hδ+–Brδ−. The electron-rich π bond of pent-1-ene attacks the δ+ hydrogen (curly arrow from the π bond to H), and the H–Br bonding pair moves onto bromine (second arrow), releasing Br⁻. Hydrogen bonds to C1, leaving a secondary carbocation, CH₃C⁺HCH₂CH₂CH₃. A lone pair on Br⁻ then bonds to the positive carbon, giving 2-bromopentane. This is the major product because the secondary carbocation, with two alkyl groups pushing electron density towards the positive carbon, is more stable than the primary carbocation that would form if H added to C2, so it forms faster.",
        }),
        P.short({ label: "(b)", marks: 1, stem: "Name the minor product of the reaction in (a).", accepted: ["1-bromopentane", "1 bromopentane"], wrong: ["2-bromopentane"], explanation: "Formed via the primary carbocation." }),
        P.group({ label: "(c)", stem: "2-methylbut-2-ene is heated with concentrated, acidified potassium manganate(VII). Name:", parts: [
          P.short({ label: "(i)", marks: 1, stem: "the ketone formed;", accepted: ["propanone", "acetone", "propan-2-one"], wrong: ["butanone"], explanation: "=C(CH₃)₂ → CH₃COCH₃." }),
          P.short({ label: "(ii)", marks: 1, stem: "the carboxylic acid formed.", accepted: ["ethanoic acid", "acetic acid"], wrong: ["propanoic acid"], explanation: "=CHCH₃ → CH₃COOH." }),
        ] }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the volume of hydrogen, in cm³ at room conditions, needed to convert 1.75 g of pent-1-ene completely into pentane. Ar: C 12.0, H 1.0; molar gas volume 24.0 dm³ mol⁻¹.", value: v, sf: 3, unit: "cm³", wrong: [v / 1000], explanation: `n(C₅H₁₀) = 1.75 ÷ 70.0 = ${sfStr(n, 3)} mol = n(H₂); V = ${sfStr(n, 3)} × 24 000 = ${sfStr(v, 3)} cm³.` }),
        P.num({ label: "(e)", marks: 1, stem: "How many structural isomers of C₅H₁₀ are alkenes (do not count cis and trans separately)?", value: 5, wrong: [6], explanation: "Pent-1-ene, pent-2-ene, 2-methylbut-1-ene, 3-methylbut-1-ene, 2-methylbut-2-ene." }),
        P.manual({ label: "(f)", marks: 2, stem: "Explain why pent-2-ene shows cis/trans isomerism but 2-methylbut-2-ene does not.", points: ["Both have restricted rotation about C=C, but cis/trans needs two different groups on each double-bond carbon", "Pent-2-ene has H/CH₃ and H/C₂H₅; in 2-methylbut-2-ene one carbon carries two identical CH₃ groups"], modelAnswer: "Rotation about a C=C is restricted in both. In pent-2-ene each double-bond carbon has two different groups (H and CH₃; H and C₂H₅), so cis and trans forms exist. In 2-methylbut-2-ene one double-bond carbon carries two methyl groups, so swapping sides gives the same molecule." }),
        P.manual({ label: "(g)", marks: 2, stem: "State the conditions for the hydration of pent-1-ene with steam and name the major product.", points: ["Steam with a phosphoric acid catalyst at about 300 °C and 60-70 atm", "Pentan-2-ol (via the secondary carbocation)"], modelAnswer: "Steam and an H₃PO₄ catalyst at about 300 °C and 60-70 atm; the major product is pentan-2-ol." }),
      ]),
      hints: ["Compare the two possible carbocations.", "Each end of the C=C gives one oxidation product."],
      explanation: `Major product 2-bromopentane via the secondary carbocation; propanone and ethanoic acid; ${sfStr(v, 3)} cm³ H₂; five structural alkene isomers.`,
    });
  }

  // ---------------------------------------------------------------- Z2: benzene structure and bromination
  {
    const n = moles(3.9, Mr("C6H6"));
    const th = n * Mr("C6H5Br");
    const y = percentYield(4.71, th);
    b.struct({
      ...P3, d: 5, calculator: true,
      concepts: [A("hydrocarbons.benzene-structure"), A("hydrocarbons.electrophilic-substitution"), A("hydrocarbons.arenes-reactions")],
      stem: "Benzene, C₆H₆, reacts with bromine only in the presence of a catalyst. In one preparation 3.90 g of benzene gave 4.71 g of pure bromobenzene.",
      parts: checkExam(EXAM.ZIM_P3_FREE, [
        P.manual({
          label: "(a)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 300 },
          stem: "Describe the bonding in a benzene molecule in terms of orbital overlap, and discuss the evidence that benzene is more stable than the Kekulé structure with three localised double bonds.",
          points: ["Each carbon is sp² hybridised and forms three σ bonds (two C–C, one C–H) at 120°: planar hexagon", "Each carbon has one p orbital (one electron) at right angles to the ring", "The p orbitals overlap sideways all round the ring, forming a delocalised π system of six electrons above and below the plane", "All C–C bonds are equal in length, between single and double bonds (Kekulé predicts alternating lengths)", "The enthalpy of hydrogenation of benzene is much less exothermic than three times that of cyclohexene: benzene is more stable (delocalisation energy about 150 kJ mol⁻¹)", "Benzene does not decolorise bromine water and undergoes substitution rather than addition, preserving the ring"],
          modelAnswer: "Each carbon atom in benzene is sp² hybridised and forms σ bonds to two neighbouring carbons and one hydrogen at 120°, so the molecule is a flat regular hexagon. The remaining p orbital on each carbon lies at right angles to the ring and overlaps sideways with the p orbitals on both neighbours, producing a delocalised system of six π electrons above and below the plane. Evidence of extra stability: X-ray measurements show six identical C–C bonds of intermediate length, not three short and three long; hydrogenation of benzene releases much less energy than three times the value for cyclohexene, so benzene is lower in energy than the Kekulé structure by about 150 kJ mol⁻¹; and benzene resists addition (it does not decolorise bromine water), reacting instead by substitution that keeps the delocalised ring.",
        }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the percentage yield of bromobenzene, to one decimal place. Ar: H 1.0, C 12.0, Br 79.9.", value: y, dp: 1, unit: "%", wrong: [(4.71 / 3.9) * 100], explanation: `n(C₆H₆) = 3.90 ÷ 78.0 = ${sfStr(n, 3)} mol; theoretical C₆H₅Br = ${sfStr(n, 3)} × 156.9 = ${sfStr(th, 3)} g; yield = 4.71 ÷ ${sfStr(th, 3)} × 100 = ${dpStr(y, 1)}%.` }),
        P.short({ label: "(c)", marks: 1, stem: "Name a suitable catalyst.", accepted: ["iron(III) bromide", "FeBr3", "aluminium bromide", "AlBr3", "iron", "iron filings", "Fe", "ferric bromide"], normalise: ["trim", "lowercase", "collapse_whitespace"], wrong: ["nickel"], explanation: "A halogen carrier: FeBr₃, AlBr₃ or iron." }),
        P.manual({ label: "(d)", marks: 3, stem: "Describe the mechanism of the reaction, including the formation of the electrophile.", points: ["Br₂ + FeBr₃ → Br⁺ + FeBr₄⁻", "Arrow from the delocalised ring to Br⁺; intermediate with sp³ C (H and Br) and charge over five carbons", "Arrow from C–H bond into the ring; H⁺ lost; H⁺ + FeBr₄⁻ → FeBr₃ + HBr"], modelAnswer: "Br₂ + FeBr₃ → Br⁺ + FeBr₄⁻. The ring's π electrons attack Br⁺, forming a cation in which one carbon is sp³ (bonded to H and Br) and the positive charge is spread over the other five carbons. The C–H bonding pair moves back into the ring, restoring delocalisation, and H⁺ is lost; H⁺ + FeBr₄⁻ → FeBr₃ + HBr regenerates the catalyst." }),
        P.mcq({ label: "(e)", marks: 1, stem: "Methylbenzene reacts with bromine and the same catalyst. What are the main products?", options: [
          ["2-bromomethylbenzene and 4-bromomethylbenzene", "Correct: –CH₃ directs to positions 2 and 4."],
          ["(bromomethyl)benzene, from side-chain substitution", "Side-chain bromination needs UV light without a catalyst."],
          ["3-bromomethylbenzene as the only product", "–CH₃ is not 3-directing."],
          ["bromobenzene together with bromomethane", "The methyl group stays attached."],
        ], answer: "A", explanation: "Ring substitution at 2 and 4." }),
        P.short({ label: "(f)", marks: 1, stem: "Name the product when benzene is heated with hydrogen and a nickel catalyst.", accepted: ["cyclohexane"], wrong: ["cyclohexene"], explanation: "C₆H₆ + 3H₂ → C₆H₁₂." }),
        P.tf({ label: "(g)", marks: 1, stem: "Hydrogenation of benzene needs harsher conditions than hydrogenation of an alkene.", answer: true, explanation: "The delocalised system must be destroyed." }),
      ]),
      hints: ["sp², p orbitals, delocalisation.", "1 : 1 ratio for the yield."],
      explanation: `Delocalised π ring; yield ${dpStr(y, 1)}%; FeBr₃ halogen carrier; electrophilic substitution; 2- and 4-bromomethylbenzene; cyclohexane.`,
    });
  }

  // ---------------------------------------------------------------- Z3: SN1/SN2, kinetics and CFCs
  {
    const k = rateConstant(1.62e-5, [[0.054, 1]]);
    const th = halfLifeFromK(k);
    b.struct({
      ...P3, d: 5, calculator: true,
      concepts: [A("halogen.sn1-sn2"), A("halogen.halogenoalkane-reactions"), A("halogen.halogenoarenes-cfcs")],
      stem: "2-bromo-2-methylpropane, (CH₃)₃CBr, is hydrolysed by aqueous hydroxide ions. In an experiment at 25 °C the initial rate was 1.62 × 10⁻⁵ mol dm⁻³ s⁻¹ when [(CH₃)₃CBr] = 0.054 mol dm⁻³ and [OH⁻] = 0.10 mol dm⁻³. Doubling [OH⁻] did not change the rate.",
      parts: checkExam(EXAM.ZIM_P3_FREE, [
        P.manual({
          label: "(a)", marks: 5, type: "EXTENDED_RESPONSE", wordLimit: { max: 250 },
          stem: "Describe the mechanism of this hydrolysis and explain why 2-bromo-2-methylpropane reacts by this mechanism whereas 1-bromobutane does not.",
          points: ["Slow step: C–Br breaks heterolytically (arrow from the C–Br bond to Br), giving Br⁻ and the carbocation (CH₃)₃C⁺", "Fast step: arrow from a lone pair on OH⁻ to C⁺, giving (CH₃)₃COH (SN1)", "The tertiary carbocation is stabilised by three electron-donating methyl groups (inductive effect)", "The three methyl groups hinder backside attack, so SN2 is blocked", "1-bromobutane would give an unstable primary carbocation and is unhindered, so it reacts by SN2"],
          modelAnswer: "The reaction is SN1. In the slow step the C–Br bond breaks heterolytically, the bromine leaving as Br⁻ and forming the tertiary carbocation (CH₃)₃C⁺. In a fast second step a lone pair on a hydroxide ion bonds to the positive carbon, giving 2-methylpropan-2-ol. The tertiary carbocation is stable enough to form because three methyl groups donate electron density and disperse the positive charge, and the same bulky groups block attack from the back of the carbon, so an SN2 route is hindered. 1-bromobutane would form an unstable primary carbocation, but its carbon is open to backside attack, so it reacts by the one-step SN2 mechanism.",
        }),
        P.group({ label: "(b)", stem: "Using the data in the stem:", parts: [
          P.num({ label: "(i)", marks: 1, stem: "state the order with respect to OH⁻;", value: 0, wrong: [1], explanation: "Rate unchanged when [OH⁻] doubled: zero order." }),
          P.num({ label: "(ii)", marks: 2, stem: "calculate the rate constant, in s⁻¹;", value: k, sf: 2, unit: "s⁻¹", wrong: [rateConstant(1.62e-5, [[0.054, 1], [0.1, 1]])], explanation: `rate = k[(CH₃)₃CBr]; k = 1.62 × 10⁻⁵ ÷ 0.054 = ${sciStr(k, 2)} s⁻¹.` }),
          P.num({ label: "(iii)", marks: 1, stem: "calculate the half-life, in s, using t½ = 0.693/k.", value: th, sf: 3, unit: "s", wrong: [k / 0.693], explanation: `t½ = 0.693 ÷ ${sciStr(k, 2)} = ${sfStr(th, 3)} s.` }),
        ] }),
        P.manual({ label: "(c)", marks: 3, stem: "Chlorofluorocarbons are also halogen compounds. Explain, with equations, how CCl₃F damages the ozone layer.", points: ["UV in the stratosphere breaks the weaker C–Cl bond: CCl₃F → CCl₂F• + Cl•", "Cl• + O₃ → ClO• + O₂", "ClO• + O → Cl• + O₂: Cl• regenerated (catalyst), destroying many O₃ molecules"], modelAnswer: "In the stratosphere UV radiation breaks a C–Cl bond: CCl₃F → CCl₂F• + Cl•. Then Cl• + O₃ → ClO• + O₂ and ClO• + O → Cl• + O₂, so the chlorine radical is regenerated and catalyses the destruction of many ozone molecules." }),
        P.short({ label: "(d)", marks: 1, stem: "State the colour of the precipitate formed when 2-bromo-2-methylpropane is warmed with ethanolic silver nitrate.", accepted: ["cream", "cream-coloured", "pale yellow", "off-white"], wrong: ["white"], explanation: "AgBr is cream." }),
        P.mcq({ label: "(e)", marks: 1, stem: "Why do CFCs reach the stratosphere?", options: [
          ["They are too unreactive to be broken down lower down.", "Correct: inertness gives them long lifetimes."],
          ["They are lighter than air and rise immediately on release.", "Most CFCs are denser than air; they mix and diffuse slowly upwards."],
          ["They react with water vapour to form gases that rise.", "CFCs do not react with water."],
          ["Winds blow them directly upwards from refrigerators.", "Transport is slow mixing over years, not direct winds."],
        ], answer: "A", explanation: "Long-lived, inert molecules diffuse upwards." }),
        P.tf({ label: "(f)", marks: 1, stem: "In CFCs, ultraviolet light breaks the C–F bonds before the C–Cl bonds.", answer: false, explanation: "C–Cl is weaker and breaks first." }),
      ]),
      hints: ["Zero order in OH⁻ → SN1.", "t½ = 0.693/k for first order."],
      explanation: `SN1 via (CH₃)₃C⁺; zero order in OH⁻; k = ${sciStr(k, 2)} s⁻¹; t½ = ${sfStr(th, 3)} s; Cl• catalyses ozone destruction.`,
    });
  }
});
