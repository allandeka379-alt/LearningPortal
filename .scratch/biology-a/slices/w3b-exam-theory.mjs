// W3b: THEORY10 exam-format items (ZIMSEC Paper 2; Cambridge Paper 4, A Level concepts): coordination and inheritance.
import { concept, P, t, chk, table, dpStr, sfStr, rnd, EXAM, checkExam, CAM, chiSquared, expectedFromRatio, actualSize } from "../lib.mjs";

const A = (k) => `abio.${k}`;
const T = { examStyle: true, skill: EXAM.THEORY10.skill, secs: EXAM.THEORY10.secs };

concept(A("coordination.action-potential"), { file: "exam/w3b-theory", keyPrefix: "exam.w3b-theory" }, (b) => {
  // ---------------------------------------------------------------- T1: action potential trace and conduction speed
  const tms = [0, 0.35, 0.7, 1.05, 1.4, 1.75, 2.1, 2.45];
  const mv = [-69, -51, 36, 2, -61, -78, -72, -69];
  const amp = Math.max(...mv) - mv[0];
  chk(amp, 105);
  const dist = 45, delay = 0.9; // mm, ms
  const v = dist / delay;
  chk(v, 50);
  b.struct({
    ...T, d: 4, paper: "ZIMSEC P2 / Cambridge P4",
    concepts: [A("coordination.action-potential"), A("coordination.impulse-transmission")],
    stem: `Tendai recorded the potential difference across the membrane at one point of a mammalian axon after a single stimulus.\n\n${table(["Time / ms", ...tms.map((x) => x.toFixed(2))], [["Potential / mV", ...mv.map((x) => (x > 0 ? `+${x}` : `−${-x}`))]])}\n\nA second electrode, ${dist} mm further along the same axon, recorded the peak of the action potential ${delay} ms later than the first.`,
    parts: checkExam(EXAM.THEORY10, [
      P.num({
        label: "(a)", marks: 1, stem: "Calculate the change in potential from the resting value to the peak, in mV.",
        value: amp, unit: "mV", wrong: [36],
        explanation: `+36 − (−69) = ${amp} mV.`,
      }),
      P.mcq({
        label: "(b)", stem: "Between which times were voltage-gated sodium channels open?",
        options: [
          ["0.35 ms and 0.70 ms", "Correct: the potential rises steeply as Na⁺ enters."],
          ["0.70 ms and 1.40 ms", "The potential falls here: K⁺ leaves through potassium channels."],
          ["1.40 ms and 1.75 ms", "This is the approach to hyperpolarisation."],
          ["2.10 ms and 2.45 ms", "The membrane is returning to rest."],
        ],
        answer: "A",
        explanation: "Depolarisation, from −51 to +36 mV, needs open voltage-gated Na⁺ channels.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain why the potential at 1.75 ms is lower than at the start, and how the resting potential is then restored.",
        points: [
          "Voltage-gated K⁺ channels are slow to close, so K⁺ continues to diffuse out: hyperpolarisation (−78 mV)",
          "The K⁺ channels then close",
          "The sodium-potassium pump (3 Na⁺ out, 2 K⁺ in, using ATP) with K⁺ leakage restores −69 mV",
        ],
        modelAnswer: "At 1.75 ms the membrane is hyperpolarised (−78 mV) because the voltage-gated potassium channels are slow to close and K⁺ continues to diffuse out. These channels then close, and the sodium-potassium pump, moving 3 Na⁺ out and 2 K⁺ in using ATP, together with leakage of K⁺ through open channels, restores the resting potential of −69 mV.",
      }),
      P.num({
        label: "(d)", marks: 2, stem: "Calculate the conduction velocity of the axon in m s⁻¹.",
        value: v, unit: "m/s", wrong: [rnd(v / 1000, 3)],
        explanation: t`$\dfrac{${dist}\ \text{mm}}{${delay}\ \text{ms}} = ${rnd(v, 1)}\ \text{mm ms}^{-1} = ${rnd(v, 1)}\ \text{m s}^{-1}$.`,
      }),
      P.manual({
        label: "(e)", marks: 3, stem: "Suggest and explain whether this axon is myelinated.",
        points: [
          "Yes, probably myelinated: 50 m s⁻¹ is much faster than a thin unmyelinated mammalian axon (about 1 m s⁻¹)",
          "Myelin insulates, so action potentials occur only at nodes of Ranvier",
          "Local circuits jump from node to node / saltatory conduction",
        ],
        modelAnswer: "It is probably myelinated: 50 m s⁻¹ is far faster than a thin unmyelinated mammalian axon, which conducts at about 1 m s⁻¹. Myelin insulates the axon so that depolarisation happens only at the nodes of Ranvier, and local circuits pass from node to node, so the impulse jumps (saltatory conduction).",
      }),
    ]),
    explanation: "Trace interpretation and conduction speed.",
    hints: ["Match each phase to the channels that are open.", "1 mm per ms = 1 m per s."],
    calculator: true,
  });

  // ---------------------------------------------------------------- T2: synapse and an insecticide
  const conc = [0, 1, 2, 4, 8];
  const decay = [2.0, 3.6, 6.8, 13.5, 27.0];
  const ratio = decay[4] / decay[0];
  chk(ratio, 13.5);
  b.struct({
    ...T, d: 4, paper: "ZIMSEC P2 / Cambridge P4",
    concepts: [A("coordination.synapses")],
    stem: `An organophosphate insecticide used on cotton was added at different concentrations to fluid bathing a cholinergic synapse. After a single impulse, the time taken for the postsynaptic membrane to return to its resting potential was measured.\n\n${table(["Insecticide concentration / µmol dm⁻³", ...conc.map(String)], [["Time to return to resting potential / ms", ...decay.map((x) => x.toFixed(1))]])}`,
    parts: checkExam(EXAM.THEORY10, [
      P.short({
        label: "(a)", marks: 1, stem: "Name the neurotransmitter at a cholinergic synapse.",
        accepted: ["acetylcholine", "ACh"],
        wrong: ["noradrenaline"],
        explanation: "Acetylcholine.",
      }),
      P.short({
        label: "(b)", marks: 1, stem: "Name the ions whose entry into the presynaptic knob triggers the release of the neurotransmitter.",
        accepted: ["calcium", "calcium ions", "Ca2+", "Ca²⁺", "Ca"],
        wrong: ["sodium ions"],
        explanation: "Calcium ions, through voltage-gated calcium channels.",
      }),
      P.num({
        label: "(c)", marks: 1, stem: "How many times longer did the membrane take to return to rest at 8 µmol dm⁻³ than with no insecticide?",
        value: ratio, wrong: [25],
        explanation: "27.0 ÷ 2.0 = 13.5 times.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Explain the effect of the insecticide shown by the data.",
        points: [
          "Time increases with concentration (from 2.0 ms to 27.0 ms)",
          "Organophosphate inhibits acetylcholinesterase, so ACh is not hydrolysed / stays bound to receptors",
          "Na⁺ channels stay open, so the postsynaptic membrane stays depolarised for longer",
        ],
        modelAnswer: "As the concentration rose from 0 to 8 µmol dm⁻³, the time to return to rest rose from 2.0 ms to 27.0 ms. The organophosphate inhibits acetylcholinesterase, so acetylcholine is not hydrolysed and stays bound to the receptors. Their sodium channels stay open and the postsynaptic membrane remains depolarised for longer.",
      }),
      P.mcq({
        label: "(e)", stem: "Which describes the most likely effect of a high dose of this insecticide on a person's muscles?",
        options: [
          ["Continuous stimulation, causing twitching and spasm", "Correct: ACh accumulates at neuromuscular junctions."],
          ["Complete relaxation because no ACh is released", "Release is unaffected; breakdown is blocked."],
          ["No change, because human synapses use a different enzyme", "Humans also use acetylcholinesterase."],
          ["Faster but normal-length contractions after each impulse", "ACh is not removed, so contractions are prolonged."],
        ],
        answer: "A",
        explanation: "Uninhibited ACh keeps stimulating muscle fibres: twitching, spasm and possible respiratory failure.",
      }),
      P.manual({
        label: "(f)", marks: 3, stem: "Describe how impulses are transmitted in one direction only across a synapse.",
        points: [
          "Vesicles of neurotransmitter are only in the presynaptic knob",
          "Receptors are only on the postsynaptic membrane",
          "So transmitter can only be released on one side and bind on the other",
        ],
        modelAnswer: "Vesicles containing acetylcholine are found only in the presynaptic knob, so the transmitter can only be released from that side; the receptors that bind it are only on the postsynaptic membrane. Transmission therefore goes from presynaptic to postsynaptic only.",
      }),
    ]),
    explanation: "Organophosphates block acetylcholinesterase, prolonging depolarisation.",
    hints: ["Which enzyme removes ACh?"],
    calculator: true,
  });

  // ---------------------------------------------------------------- T3: muscle (Cambridge only)
  const mag = 30000;
  const relaxedImg = 75, contrImg = 57; // mm
  const relaxed = actualSize(relaxedImg, "mm", mag);
  const contr = actualSize(contrImg, "mm", mag);
  chk(relaxed, 2.5);
  chk(contr, 1.9);
  b.struct({
    ...T, d: 4, paper: "Cambridge P4", applies: CAM,
    concepts: [A("coordination.muscle-contraction")],
    stem: `Two electron micrographs of the same myofibril, both at a magnification of ×${mag.toLocaleString("en-GB")}, were measured. In the relaxed myofibril one sarcomere measured ${relaxedImg} mm from Z line to Z line; in the contracted myofibril it measured ${contrImg} mm. In the relaxed myofibril the dark A band and a pale H zone in its centre are visible; in the contracted myofibril the H zone cannot be seen.`,
    parts: checkExam(EXAM.THEORY10, [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the actual length of the relaxed sarcomere in µm.",
        value: relaxed, unit: "µm", wrong: [rnd(relaxedImg / mag, 4)],
        explanation: t`$\dfrac{${relaxedImg} \times 1000}{${mag}} = ${rnd(relaxed, 1)}\ \text{µm}$.`,
      }),
      P.num({
        label: "(b)", marks: 1, stem: "Calculate the decrease in sarcomere length, in µm, during contraction.",
        value: relaxed - contr, dp: 1, unit: "µm", wrong: [contrImg - relaxedImg],
        explanation: `Contracted length = 57 000 ÷ 30 000 = 1.9 µm; decrease = 2.5 − 1.9 = 0.6 µm.`,
      }),
      P.mcq({
        label: "(c)", stem: "Which part of the sarcomere would measure the same in both micrographs?",
        options: [
          ["The A band", "Correct: it is the length of the myosin filaments."],
          ["The I band", "The I band shortens as actin slides inwards."],
          ["The H zone", "The H zone shortens or disappears."],
          ["The distance between Z lines", "This is the sarcomere, which shortens."],
        ],
        answer: "A",
        explanation: "The A band equals the myosin length, which does not change.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain why the H zone cannot be seen in the contracted myofibril.",
        points: [
          "Actin filaments have slid further between the myosin filaments towards the M line",
          "So there is no longer a region of myosin only / actin filaments meet or overlap in the centre",
        ],
        modelAnswer: "During contraction the actin filaments slide between the myosin filaments towards the centre of the sarcomere until they meet or overlap there, so no region containing myosin only (the H zone) remains.",
      }),
      P.manual({
        label: "(e)", marks: 4, stem: "Explain the roles of calcium ions and ATP in bringing about this shortening.",
        points: [
          "Ca²⁺ released from the sarcoplasmic reticulum binds to troponin",
          "Troponin changes shape and moves tropomyosin, exposing myosin-binding sites on actin; cross-bridges form and the power stroke pulls actin",
          "ATP binds to the myosin head, causing it to detach from actin",
          "Hydrolysis of ATP re-cocks the myosin head so the cycle can repeat",
        ],
        modelAnswer: "Calcium ions released from the sarcoplasmic reticulum bind to troponin, which changes shape and pulls tropomyosin away from the myosin-binding sites on actin. Myosin heads bind, forming cross-bridges, and tilt in the power stroke, pulling the actin towards the M line. ATP then binds to each myosin head, making it detach, and the head hydrolyses the ATP to return to its cocked position ready to bind further along.",
      }),
    ]),
    explanation: "Sarcomere measurements and the sliding filament model.",
    hints: ["Actual size = image size ÷ magnification; convert mm to µm."],
    calculator: true,
  });

  // ---------------------------------------------------------------- T4: haemophilia pedigree (both boards)
  b.struct({
    ...T, d: 3, paper: "ZIMSEC P2 / Cambridge P4",
    concepts: [A("inheritance.sex-linkage"), A("inheritance.genes-phenotype")],
    stem: "Haemophilia A is caused by a recessive allele of the F8 gene on the X chromosome. In a family, Rudo and her husband are both unaffected. Their first son has haemophilia; their daughter is unaffected. Rudo's father was unaffected and her brother has haemophilia. Use $X^H$ for the normal allele and $X^h$ for the haemophilia allele.",
    parts: checkExam(EXAM.THEORY10, [
      P.short({
        label: "(a)", marks: 1, stem: "Name the protein coded for by the F8 gene.",
        accepted: ["factor VIII", "factor 8", "clotting factor VIII", "factor eight", "clotting factor 8"],
        wrong: ["fibrinogen"],
        explanation: "Factor VIII, a clotting protein.",
      }),
      P.mcq({
        label: "(b)", stem: "What is Rudo's genotype?",
        options: [
          ["Carrier, $X^H X^h$", "Correct: unaffected, with an affected son."],
          ["Two normal alleles, $X^H X^H$", "She could not then have an affected son."],
          ["Two haemophilia alleles, $X^h X^h$", "She would then have haemophilia."],
          ["A male genotype, $X^h Y$", "Rudo is female."],
        ],
        answer: "A",
        explanation: "Her son received $X^h$ from her; she is unaffected, so she is $X^H X^h$.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Use a genetic diagram, described in words, to show the possible children of Rudo and her husband.",
        points: [
          "Parents $X^H X^h$ × $X^H Y$; gametes $X^H$, $X^h$ and $X^H$, Y",
          "Offspring $X^H X^H$, $X^H X^h$, $X^H Y$, $X^h Y$",
          "Phenotypes: normal female, carrier female, normal male, male with haemophilia",
        ],
        modelAnswer: "Parents: $X^H X^h$ (carrier) × $X^H Y$. Gametes: $X^H$, $X^h$ (eggs); $X^H$, Y (sperm). Children: $X^H X^H$ normal daughter, $X^H X^h$ carrier daughter, $X^H Y$ unaffected son, $X^h Y$ son with haemophilia.",
      }),
      P.num({
        label: "(d)", marks: 1, stem: "What is the percentage probability that their next child is a son with haemophilia?",
        value: 25, unit: "%", wrong: [50],
        explanation: "1 of 4 equally likely outcomes: 25%. (The chance that a son is affected is 50%.)",
      }),
      P.num({
        label: "(e)", marks: 1, stem: "What is the percentage probability that their unaffected daughter is a carrier?",
        value: 50, unit: "%", wrong: [25, 67],
        explanation: "Daughters are $X^H X^H$ or $X^H X^h$ equally: 50%.",
      }),
      P.manual({
        label: "(f)", marks: 3, stem: "Rudo's father was unaffected. Explain how Rudo and her brother both inherited the haemophilia allele.",
        points: [
          "Rudo's father is $X^H Y$, so he gave Rudo $X^H$ and her brother Y",
          "So both received $X^h$ from their mother",
          "Their mother is a carrier ($X^H X^h$), unaffected because $X^H$ masks $X^h$",
        ],
        modelAnswer: "Rudo's father is unaffected, so he is $X^H Y$: he gave Rudo his $X^H$ and her brother his Y. Both must therefore have received $X^h$ from their mother, who is a carrier ($X^H X^h$) and unaffected because her normal allele is dominant.",
      }),
    ]),
    explanation: "X-linked recessive inheritance through carrier females.",
    hints: ["Sons receive their X from their mother."],
  });

  // ---------------------------------------------------------------- T5: dihybrid cross and chi-squared (both boards)
  const cls = ["Tall, purple", "Tall, white", "Dwarf, purple", "Dwarf, white"];
  const obs = [171, 62, 53, 34];
  const tot = obs.reduce((s, x) => s + x, 0);
  chk(tot, 320);
  const exp = expectedFromRatio(tot, [9, 3, 3, 1]);
  const r = chiSquared(obs, exp);
  if (!r.significant) throw new Error("T5 should be significant");
  b.struct({
    ...T, d: 4, paper: "ZIMSEC P2 / Cambridge P4",
    concepts: [A("inheritance.dihybrid"), A("inheritance.chi-squared")],
    stem: `In a plant, tall stem (T) is dominant to dwarf (t) and purple flowers (P) are dominant to white (p). Two plants heterozygous for both genes were crossed. The offspring were:\n\n${table(["Phenotype", "Observed number"], cls.map((c, i) => [c, String(obs[i])]))}\n\nThe chi-squared formula is $\\chi^2 = \\sum \\dfrac{(O - E)^2}{E}$.`,
    parts: checkExam(EXAM.THEORY10, [
      P.mcq({
        label: "(a)", stem: "Which gametes can each parent produce if the genes are unlinked?",
        options: [
          ["TP, Tp, tP and tp in equal numbers", "Correct."],
          ["TP and tp only, in equal numbers", "That would be the case for completely linked genes."],
          ["Tt and Pp, one allele pair each", "Gametes carry one allele of each gene."],
          ["TP only, as the dominant alleles go together", "Alleles assort independently."],
        ],
        answer: "A",
        explanation: "Independent assortment gives four gamete types in equal numbers.",
      }),
      P.group({
        label: "(b)", stem: "The expected ratio is 9 : 3 : 3 : 1.",
        parts: [
          P.num({ label: "(i)", marks: 1, stem: "Calculate the expected number of tall, purple plants.", value: exp[0], wrong: [80], explanation: `320 × 9/16 = ${exp[0]}.` }),
          P.num({ label: "(ii)", marks: 1, stem: "Calculate the expected number of dwarf, white plants.", value: exp[3], wrong: [80], explanation: `320 × 1/16 = ${exp[3]}.` }),
        ],
      }),
      P.num({
        label: "(c)", marks: 2, stem: "Calculate χ². Give your answer to three significant figures.",
        value: r.chi2, sf: 3,
        explanation: t`Expected 180, 60, 60, 20. Terms: ${r.rows.map((x) => dpStr(x.term, 3)).join(" + ")} $= ${sfStr(r.chi2, 3)}$.`,
      }),
      P.manual({
        label: "(d)", marks: 3, stem: `The critical value of χ² at p = 0.05 for 3 degrees of freedom is ${r.crit}. Explain what your result shows.`,
        points: [
          `χ² (${sfStr(r.chi2, 3)}) is greater than ${r.crit}`,
          "So the difference is significant / not due to chance; reject the null hypothesis",
          "The results do not fit 9 : 3 : 3 : 1: e.g. the dwarf white class (34) is larger than expected (20), suggesting linkage or reduced survival of some classes",
        ],
        modelAnswer: `χ² = ${sfStr(r.chi2, 3)}, which is greater than the critical value of ${r.crit}. The difference between observed and expected numbers is significant and unlikely to be due to chance, so the null hypothesis is rejected. The data do not fit a 9 : 3 : 3 : 1 ratio; for example, 34 dwarf white plants were seen instead of 20, which could be explained by linkage of the two genes or by differences in survival.`,
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "State the null hypothesis for this test and the number of degrees of freedom.",
        points: [
          "No significant difference between observed and expected (9 : 3 : 3 : 1) numbers; differences due to chance",
          "Degrees of freedom = 4 − 1 = 3",
        ],
        modelAnswer: "Null hypothesis: there is no significant difference between the observed numbers and those expected from a 9 : 3 : 3 : 1 ratio; any difference is due to chance. Degrees of freedom = 4 − 1 = 3.",
      }),
    ]),
    explanation: "Dihybrid expected numbers and a chi-squared test.",
    hints: ["One part = 320 ÷ 16 = 20."],
    calculator: true,
  });

  // ---------------------------------------------------------------- T6: lac operon (Cambridge only)
  const tmin = [0, 20, 40, 60, 80, 100];
  const act = [2, 2, 2, 31, 68, 2];
  b.struct({
    ...T, d: 4, paper: "Cambridge P4", applies: CAM,
    concepts: [A("inheritance.gene-control")],
    stem: `*E. coli* was grown in a medium without glucose. Lactose was added at 40 minutes and had all been used up by 90 minutes. β-galactosidase activity in newly made protein was measured.\n\n${table(["Time / min", ...tmin.map(String)], [["β-galactosidase synthesis / arbitrary units", ...act.map(String)]])}`,
    parts: checkExam(EXAM.THEORY10, [
      P.short({
        label: "(a)", marks: 1, stem: "Name the structural gene that codes for β-galactosidase.",
        accepted: ["lacZ", "lac Z", "lacz", "Z gene", "the lacZ gene"],
        wrong: ["lacI"],
        explanation: "lacZ.",
      }),
      P.mcq({
        label: "(b)", stem: "Where does the repressor protein bind when lactose is absent?",
        options: [
          ["The operator", "Correct."],
          ["The promoter", "The promoter is the RNA polymerase binding site."],
          ["The lacY gene", "lacY is a structural gene."],
          ["The ribosome", "The repressor binds DNA."],
        ],
        answer: "A",
        explanation: "The repressor binds the operator.",
      }),
      P.num({
        label: "(c)", marks: 2, stem: "Calculate the mean rate of increase in β-galactosidase synthesis between 40 and 80 minutes, in arbitrary units per minute. Give your answer to two decimal places.",
        value: (act[4] - act[2]) / (tmin[4] - tmin[2]), dp: 2, unit: "per min", wrong: [rnd(act[4] / tmin[4], 2)],
        explanation: t`$\dfrac{68 - 2}{80 - 40} = \dfrac{66}{40} = 1.65$ units per minute.`,
      }),
      P.manual({
        label: "(d)", marks: 4, stem: "Explain the changes in β-galactosidase synthesis between 0 and 80 minutes.",
        points: [
          "0-40 min: no lactose, so the repressor binds the operator",
          "RNA polymerase cannot bind / transcribe lacZ, so only a background level (2 units)",
          "After 40 min, lactose binds to the repressor and changes its shape, so it leaves the operator",
          "RNA polymerase transcribes lacZ (and lacY, lacA) and the enzyme is synthesised: rising to 68 units",
        ],
        modelAnswer: "Until 40 minutes there was no lactose, so the repressor was bound to the operator and RNA polymerase could not transcribe lacZ; synthesis stayed at a background level of 2 units. After lactose was added, it bound to the repressor, changing its shape so it left the operator. RNA polymerase then transcribed lacZ, lacY and lacA, and β-galactosidase synthesis rose to 68 units by 80 minutes.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Suggest why synthesis had fallen back to 2 units by 100 minutes.",
        points: [
          "Lactose had been used up, so none was left to bind the repressor",
          "The repressor bound the operator again and transcription stopped",
        ],
        modelAnswer: "The lactose had all been hydrolysed by 90 minutes, so the repressor returned to its original shape, bound the operator again and transcription of lacZ stopped.",
      }),
    ]),
    explanation: "Inducible enzyme: lactose removes the repressor from the operator.",
    hints: ["What happens to the repressor when lactose is present and when it has gone?"],
    calculator: true,
  });
});
