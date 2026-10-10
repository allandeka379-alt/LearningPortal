// W4b: ZIMSEC-only exam-format items: two Paper 3 free-response questions (15 marks): Section C on polymers and
// Section D on steam distillation and chromatography of an essential oil.
import { concept, P, t, EXAM, checkExam, ZIM, Mr, glcPercent, rf, sfStr, dpStr } from "../lib.mjs";

const A = (k) => `achem.${k}`;
const P3 = { skill: EXAM.ZIM_P3_FREE.skill, secs: EXAM.ZIM_P3_FREE.secs, applies: EXAM.ZIM_P3_FREE.applies, examStyle: true };

concept(A("polymers.condensation"), { file: "exam/w4b-zimsec", keyPrefix: "exam.w4b-zimsec", applies: ZIM }, (b) => {
  // ---------------------------------------------------------------- Z1 (Section C): addition and condensation polymers
  {
    const Mrep = Mr("H2N(CH2)6NH2") + Mr("HOOC(CH2)8COOH") - 2 * Mr("H2O");
    const n = 5.64e4 / Mrep;
    b.struct({
      ...P3, paper: "Paper 3 Section C", d: 4, calculator: true,
      concepts: [A("polymers.condensation"), A("polymers.addition"), A("polymers.uses-degradability")],
      stem: "Polymers made in Zimbabwe and imported include PVC pipes, poly(ethene) water tanks and nylon fishing nets. Nylon-6,10 is made from hexane-1,6-diamine, H₂N(CH₂)₆NH₂, and decanedioic acid, HOOC(CH₂)₈COOH. Ar: H 1.0, C 12.0, N 14.0, O 16.0.",
      parts: checkExam(EXAM.ZIM_P3_FREE, [
        P.manual({
          label: "(a)", marks: 5, type: "EXTENDED_RESPONSE", wordLimit: { max: 250 },
          stem: "Compare addition polymerisation and condensation polymerisation, using PVC and nylon-6,10 as examples.",
          points: ["Addition: monomer has a C=C double bond (chloroethene, CH₂=CHCl) which opens to form the chain", "Addition: no other product; polymer has the same empirical formula as the monomer; repeat unit –CH₂–CHCl–", "Condensation: each monomer has two reactive groups (–NH₂ on the diamine, –COOH on the diacid)", "Condensation: a small molecule (water) is eliminated at every link; amide links –CONH– form", "Backbone: addition polymer has an all-carbon chain; condensation polymer has amide (or ester) links in the chain that can be hydrolysed"],
          modelAnswer: "In addition polymerisation the monomer, such as chloroethene, CH₂=CHCl, has a C=C double bond. The π bond opens and the monomers join into a saturated chain, –CH₂–CHCl–, with no other product, so PVC has the same empirical formula as its monomer. In condensation polymerisation each monomer has two reactive functional groups: hexane-1,6-diamine has two –NH₂ groups and decanedioic acid two –COOH groups. An amine group reacts with an acid group to form an amide link, –CO–NH–, and a molecule of water is eliminated each time. The addition polymer has an all-carbon backbone, whereas nylon has amide links in its backbone, which can be hydrolysed.",
        }),
        P.manual({ label: "(b)", marks: 1, stem: "Give the repeat unit of nylon-6,10.", points: ["–NH(CH₂)₆NH–CO(CH₂)₈CO– with continuation bonds at both ends"], modelAnswer: "–NH(CH₂)₆NH–CO(CH₂)₈CO–" }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the relative mass of the repeat unit of nylon-6,10.", value: Mrep, wrong: [Mrep + 18], explanation: `${Mr("H2N(CH2)6NH2")} + ${Mr("HOOC(CH2)8COOH")} − 2 × 18.0 = ${Mrep}.` }),
        P.num({ label: "(d)", marks: 1, stem: "Calculate the number of repeat units in a nylon-6,10 chain of relative molecular mass 5.64 × 10⁴.", value: n, explanation: `5.64 × 10⁴ ÷ ${Mrep} = ${n}.` }),
        P.short({ label: "(e)", marks: 1, stem: "Name the small molecule eliminated when decanedioyl dichloride, ClOC(CH₂)₈COCl, is used instead of the acid.", accepted: ["hydrogen chloride", "HCl"], wrong: ["water"], explanation: "–COCl + H₂N– → –CONH– + HCl." }),
        P.mcq({ label: "(f)", marks: 1, stem: "Which compound could form a polyamide on its own?", options: [
          ["H₂N(CH₂)₅COOH", "Correct: one amine and one acid group in each molecule."],
          ["HOCH₂(CH₂)₄COOH", "This hydroxy acid forms a polyester."],
          ["H₂N(CH₂)₆NH₂", "A diamine needs a diacid partner."],
          ["CH₂=CHCONH₂", "This polymerises by addition through its C=C bond."],
        ], answer: "A", explanation: "An aminocarboxylic acid polymerises alone to a polyamide (nylon-6)." }),
        P.manual({ label: "(g)", marks: 3, stem: "Explain why nylon is suitable for fishing nets and why discarded nylon nets break down faster than poly(ethene) litter, though still slowly.", points: ["Hydrogen bonds between N–H and C=O groups on neighbouring chains give nylon fibres high tensile strength", "Nylon has polar amide links that can be hydrolysed (by water, acids, alkalis or enzymes), so it can slowly degrade", "Poly(ethene) has only non-polar C–C and C–H bonds with no hydrolysable group, so it is non-biodegradable"], modelAnswer: "Nylon chains are held together by hydrogen bonds between the N–H of one chain and the C=O of the next, giving strong, hard-wearing fibres. Its amide links are polar and can be hydrolysed, slowly, by water, acids, alkalis or enzymes, whereas poly(ethene) has only strong, non-polar C–C and C–H bonds and nothing that can be hydrolysed, so it persists far longer." }),
        P.mcq({ label: "(h)", marks: 1, stem: "Which modification makes a poly(alkene) photodegradable?", options: [
          ["including C=O groups in the chain", "Correct: they absorb ultraviolet light, which breaks the chain."],
          ["adding more side branches to the chain", "Branching changes density, not light sensitivity."],
          ["using a Ziegler-Natta catalyst", "This gives HDPE, which is not photodegradable."],
          ["replacing H atoms with F atoms", "This gives a PTFE-like, even more inert polymer."],
        ], answer: "A", explanation: "Carbonyl groups absorb UV and the energy breaks the chain." }),
      ]),
      hints: ["Two waters are lost per diamine + diacid repeat unit."],
      explanation: `Addition (C=C, no by-product) vs condensation (two groups, water lost); nylon-6,10 repeat unit Mr ${Mrep}, ${n} units per chain; hydrogen bonding gives strength; amide links are hydrolysable.`,
    });
  }

  // ---------------------------------------------------------------- Z2 (Section D): essential oil by steam distillation, then chromatography
  {
    const p = glcPercent({ a: 47.2, b: 8.1, c: 4.7 });
    const r = rf(5.2, 8.4);
    b.struct({
      ...P3, paper: "Paper 3 Section D", d: 4, calculator: true,
      concepts: [A("phase.steam-distillation"), A("analysis.chromatography-glc"), A("analysis.chromatography-tlc")],
      stem: "A co-operative near Chimanimani extracts oil from eucalyptus leaves by steam distillation, then checks its composition by chromatography.",
      parts: checkExam(EXAM.ZIM_P3_FREE, [
        P.manual({
          label: "(a)", marks: 5, type: "EXTENDED_RESPONSE", wordLimit: { max: 250 },
          stem: "Explain why steam distillation is used for this oil and why the mixture distils below 100 °C, and outline how the oil is obtained.",
          points: ["The oil's components boil well above 100 °C and would decompose/oxidise if heated to their boiling points", "Oil and water are immiscible, so each exerts its full vapour pressure; total vapour pressure = p(water) + p(oil)", "The mixture boils when this sum equals atmospheric pressure, which happens below 100 °C (and at a constant temperature)", "Steam (from a generator with a safety tube) is passed through the crushed leaves with water; the vapour is condensed in a condenser", "The distillate forms two layers; the oil is separated with a separating funnel and dried"],
          modelAnswer: "The compounds in eucalyptus oil boil well above 100 °C and would decompose or oxidise if heated that much, so steam distillation is used. The oil and water do not mix, so each exerts its full vapour pressure regardless of the other; the total vapour pressure is the sum of the two. The mixture boils when this sum equals atmospheric pressure, which is reached below 100 °C. Steam from a generator fitted with a safety tube is blown through the crushed leaves and water; the mixed vapour is condensed and the distillate separates into two layers. The oil layer is separated with a separating funnel and dried with an anhydrous drying agent.",
        }),
        P.num({ label: "(b)", marks: 1, stem: "At 96 °C the vapour pressure of water is 87.7 kPa (data) and that of the oil was found to be 9.8 kPa. Calculate the total vapour pressure, in kPa.", value: 87.7 + 9.8, dp: 1, unit: "kPa", wrong: [87.7], explanation: `87.7 + 9.8 = ${dpStr(87.7 + 9.8, 1)} kPa.` }),
        P.num({ label: "(c)", marks: 2, stem: "A gas chromatogram of the oil shows three peaks with areas 47.2 (eucalyptol), 8.1 and 4.7. Calculate the percentage of eucalyptol, to three significant figures.", value: p.a, sf: 3, unit: "%", wrong: [47.2], explanation: `Total area = 60.0; 47.2 ÷ 60.0 × 100 = ${sfStr(p.a, 3)}%.` }),
        P.mcq({ label: "(d)", marks: 1, stem: "On a non-polar GLC column, which component of the oil has the longest retention time?", options: [
          ["the one with the highest boiling point", "Correct: the least volatile component spends most time in the stationary liquid."],
          ["the one with the lowest boiling point", "The most volatile component leaves first."],
          ["the one present in the largest amount", "Amount affects peak area, not retention time."],
          ["the one that is a gas at room temperature", "A gas at room temperature is very volatile and leaves early."],
        ], answer: "A", explanation: "Retention time on a non-polar column increases with boiling point." }),
        P.short({ label: "(e)", marks: 1, stem: "Name a suitable carrier gas for GLC.", accepted: ["nitrogen", "helium", "argon", "N2", "He", "Ar"], wrong: ["oxygen"], explanation: "An unreactive gas: N₂, He or Ar." }),
        P.manual({ label: "(f)", marks: 3, stem: "Compare GLC and HPLC, and give one application of chromatography in industry and one in medicine.", points: ["GLC: gas mobile phase, sample must be volatile and stable when heated", "HPLC: liquid mobile phase pumped at high pressure through fine particles; suits non-volatile or heat-sensitive substances", "Applications: e.g. industry, quality control of foods, fuels or perfumes; medicine, drug testing of blood/urine or checking purity of medicines"], modelAnswer: "GLC uses an unreactive carrier gas and needs a volatile, heat-stable sample. HPLC uses a liquid mobile phase pumped at high pressure through a column of very fine particles, so it can analyse non-volatile or heat-sensitive compounds. Chromatography is used industrially for quality control of foods, fuels and perfumes, and medically for testing blood or urine for drugs." }),
        P.num({ label: "(g)", marks: 1, stem: "On a TLC plate the main component moved 5.2 cm and the solvent front 8.4 cm. Calculate its Rf value, to two decimal places.", value: r, dp: 2, wrong: [8.4 / 5.2], explanation: `5.2 ÷ 8.4 = ${dpStr(r, 2)}.` }),
        P.tf({ label: "(h)", marks: 1, stem: "Two components that have the same Rf value in one solvent can often be separated by running the chromatogram again at 90° in a second solvent.", answer: true, explanation: "True: this is two-way chromatography." }),
      ]),
      hints: ["Immiscible liquids: vapour pressures add.", "% = area ÷ total area × 100."],
      explanation: `Steam distillation below 100 °C (vapour pressures add); total ${dpStr(87.7 + 9.8, 1)} kPa at 96 °C; eucalyptol ${sfStr(p.a, 3)}%; Rf ${dpStr(r, 2)}.`,
    });
  }
});
