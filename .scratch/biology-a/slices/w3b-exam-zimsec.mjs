// W3b: ZIMSEC Paper 3 essays (ZIM_P3_ESSAY: (a) 8 describe/outline + (b) 12 explain/discuss), self-marked.
import { concept, P, EXAM, checkExam, ZIM } from "../lib.mjs";

const A = (k) => `abio.${k}`;
const essay = (b, { concepts, d = 5, stem, a, bb, hints }) =>
  b.struct({
    d, examStyle: true, skill: EXAM.ZIM_P3_ESSAY.skill, secs: EXAM.ZIM_P3_ESSAY.secs, applies: EXAM.ZIM_P3_ESSAY.applies, paper: "ZIMSEC Paper 3",
    concepts, stem,
    parts: checkExam(EXAM.ZIM_P3_ESSAY, [
      P.manual({ label: "(a)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 }, ...a }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", wordLimit: { max: 550 }, ...bb }),
    ]),
    explanation: "Mark each part against the points: one mark for each point clearly made, up to the marks for the part.",
    hints,
  });

concept(A("coordination.nervous-endocrine"), { file: "exam/w3b-zimsec", keyPrefix: "exam.w3b-zimsec", applies: ZIM }, (b) => {
  // ---------------------------------------------------------------- E1: neurones, reflex arc, action potential
  essay(b, {
    concepts: [A("coordination.nervous-endocrine"), A("coordination.action-potential"), A("coordination.impulse-transmission")],
    stem: "Answer both parts.",
    hints: ["In (a) follow the impulse from receptor to effector, naming each neurone and where its cell body lies.", "In (b) give the ion movements and channels for each phase, then explain how the impulse moves along the axon."],
    a: {
      stem: "Describe the structure of a motor neurone and outline the pathway of a spinal reflex arc.",
      points: [
        "Motor neurone: cell body in the grey matter of the spinal cord / CNS, containing the nucleus, RER (Nissl granules) and mitochondria",
        "Many short dendrites carry impulses towards the cell body",
        "Long axon carries impulses away to an effector, ending in motor end plates / branches at the muscle",
        "Axon surrounded by a myelin sheath formed by Schwann cells, with gaps called nodes of Ranvier",
        "Reflex arc: a receptor detects the stimulus and starts impulses in a sensory neurone",
        "Sensory neurone enters the spinal cord through the dorsal root; its cell body is in the dorsal root ganglion",
        "In the grey matter it synapses with a relay neurone, which synapses with a motor neurone",
        "Motor neurone leaves through the ventral root to the effector (muscle or gland), which responds rapidly and automatically",
      ],
      modelAnswer: "A motor neurone has its cell body in the grey matter of the spinal cord. The cell body contains the nucleus, much rough endoplasmic reticulum and many mitochondria, and bears many short dendrites that carry impulses towards it. A single long axon carries impulses away to an effector, where it branches into motor end plates on muscle fibres. The axon is wrapped in a myelin sheath formed by Schwann cells, interrupted at intervals by nodes of Ranvier.\n\nIn a spinal reflex arc, a receptor detects a stimulus, such as heat on the skin, and starts impulses in a sensory neurone. The sensory neurone enters the spinal cord through the dorsal root; its cell body lies in the dorsal root ganglion. In the grey matter it synapses with a short relay neurone, which synapses with a motor neurone. The motor neurone leaves through the ventral root and carries impulses to the effector, such as a muscle, which contracts. The response is rapid and automatic, because it does not need the brain.",
    },
    bb: {
      stem: "Explain how a resting potential is maintained in an axon, how an action potential is produced, and how the impulse is transmitted along a myelinated axon.",
      points: [
        "Sodium-potassium pump uses ATP to move 3 Na⁺ out and 2 K⁺ in",
        "Membrane more permeable to K⁺ (K⁺ channels open), so K⁺ diffuses out, leaving the inside negative, about −70 mV",
        "A stimulus depolarises the membrane; if threshold (about −50 mV) is reached, voltage-gated Na⁺ channels open",
        "Na⁺ diffuses in, so the inside becomes positive, about +30 to +40 mV (depolarisation)",
        "Na⁺ channels close; voltage-gated K⁺ channels open and K⁺ diffuses out (repolarisation)",
        "K⁺ channels are slow to close, giving hyperpolarisation; the pump restores the resting potential",
        "All-or-nothing: action potentials are always the same size; stimulus strength is coded by frequency",
        "Refractory period: Na⁺ channels cannot reopen immediately, so the impulse travels one way and impulses are discrete",
        "Local circuits: Na⁺ diffuses sideways inside the axon and depolarises the next region to threshold",
        "Myelin, made by Schwann cells, insulates the axon so depolarisation occurs only at nodes of Ranvier",
        "Local circuits run from node to node, so the impulse jumps: saltatory conduction",
        "Saltatory conduction is faster (up to about 100 m s⁻¹) and uses less ATP than continuous conduction",
      ],
      modelAnswer: "The resting potential is maintained by the sodium-potassium pump, which uses ATP to move three sodium ions out of the axon for every two potassium ions in. At rest the membrane is much more permeable to potassium because some potassium channels are open, so K⁺ diffuses out down its concentration gradient, leaving the inside about 70 mV negative to the outside.\n\nWhen a stimulus depolarises the membrane to the threshold of about −50 mV, voltage-gated sodium channels open. Sodium ions diffuse in, making the inside positive, up to about +30 to +40 mV. The sodium channels then close and voltage-gated potassium channels open; K⁺ diffuses out and the membrane repolarises. The potassium channels are slow to close, so the membrane briefly hyperpolarises before the pump and leakage restore the resting potential. Action potentials are all-or-nothing, so a stronger stimulus produces a higher frequency of impulses rather than bigger ones. For a short refractory period the sodium channels cannot reopen, so the impulse moves in one direction and impulses stay separate.\n\nThe impulse spreads by local circuits: sodium ions that entered diffuse sideways inside the axon and depolarise the next region to threshold. In a myelinated axon, the myelin sheath made by Schwann cells insulates the membrane, so depolarisation can only happen at the nodes of Ranvier. The local circuits extend from one node to the next, and the impulse jumps from node to node by saltatory conduction. This is much faster than continuous conduction, reaching about 100 m s⁻¹ in large axons, and it uses less ATP because fewer ions cross the membrane.",
    },
  });

  // ---------------------------------------------------------------- E2: synapses, nervous versus endocrine
  essay(b, {
    concepts: [A("coordination.synapses"), A("coordination.nervous-endocrine")],
    stem: "Answer both parts.",
    hints: ["In (a) work from the presynaptic knob across the cleft, then describe the removal of the transmitter.", "In (b) give the roles of synapses, the effects of named drugs, and matched comparisons."],
    a: {
      stem: "Describe the sequence of events by which an impulse is transmitted across a cholinergic synapse.",
      points: [
        "An action potential arrives at the presynaptic knob",
        "Voltage-gated calcium ion channels open and Ca²⁺ diffuses into the knob",
        "Vesicles move to and fuse with the presynaptic membrane, releasing acetylcholine by exocytosis",
        "ACh diffuses across the synaptic cleft (about 20 nm)",
        "ACh binds to complementary receptor proteins on the postsynaptic membrane, opening Na⁺ channels",
        "Na⁺ diffuses in, depolarising the postsynaptic membrane; if threshold is reached an action potential is generated",
        "Acetylcholinesterase hydrolyses ACh into choline and ethanoic acid, so the channels close",
        "Products diffuse back into the presynaptic knob and ACh is resynthesised using ATP from mitochondria",
      ],
      modelAnswer: "When an action potential arrives at the presynaptic knob, it opens voltage-gated calcium ion channels and calcium ions diffuse in. This causes vesicles containing acetylcholine to move to the presynaptic membrane and fuse with it, releasing acetylcholine into the cleft by exocytosis. Acetylcholine diffuses across the cleft, about 20 nm wide, and binds to complementary receptor proteins on the postsynaptic membrane, opening their sodium channels. Sodium ions diffuse in and depolarise the postsynaptic membrane; if the threshold is reached, an action potential is produced. Acetylcholinesterase then hydrolyses acetylcholine into choline and ethanoic acid, so the channels close. These products diffuse back into the presynaptic knob, where acetylcholine is resynthesised using ATP from the many mitochondria and stored in vesicles again.",
    },
    bb: {
      stem: "Discuss the roles of synapses in the nervous system, explain how named drugs or poisons affect cholinergic synapses, and compare nervous and endocrine control.",
      points: [
        "Synapses ensure one-way transmission: vesicles only presynaptic, receptors only postsynaptic",
        "Summation: temporal (repeated impulses in one neurone) or spatial (several neurones together) reach threshold",
        "Weak stimuli are filtered out unless they persist or combine",
        "Integration: a neurone receives excitatory and inhibitory inputs and fires according to their sum",
        "Divergence/convergence: one neurone connects with many, or many with one / fatigue protects effectors",
        "Nicotine has a shape similar to ACh, binds to its receptors and opens Na⁺ channels, stimulating the postsynaptic cell",
        "Organophosphate insecticides inhibit acetylcholinesterase, so ACh is not broken down",
        "Postsynaptic cells are continuously stimulated: muscle twitching, spasm and possible failure of breathing",
        "Nervous: electrical impulses (with chemical synapses) whereas endocrine: chemical hormones",
        "Nervous: along neurones to precise targets whereas endocrine: in the blood to all cells, only target cells with receptors respond",
        "Nervous: very rapid whereas endocrine: slower",
        "Nervous: short-lived and localised whereas endocrine: long-lasting and often widespread",
      ],
      modelAnswer: "Synapses have several roles. Because vesicles of transmitter are found only in the presynaptic knob and receptors only on the postsynaptic membrane, impulses can cross in one direction only. One impulse may not release enough transmitter to reach the threshold, but repeated impulses in one neurone (temporal summation) or impulses from several neurones at once (spatial summation) can add together; this filters out weak, isolated stimuli. A postsynaptic neurone may receive both excitatory and inhibitory inputs and fires only if their sum reaches the threshold, so synapses integrate information. One neurone may also diverge to many others, or many may converge on one, and synapses can fatigue, protecting effectors from overstimulation.\n\nMany drugs act at cholinergic synapses. Nicotine, from tobacco, has a shape similar to acetylcholine, so it binds to some acetylcholine receptors and opens their sodium channels, stimulating the postsynaptic neurone. Organophosphate insecticides, used on crops such as cotton, inhibit acetylcholinesterase. Acetylcholine is then not broken down and keeps binding to receptors, so postsynaptic cells are stimulated continuously; muscles twitch and go into spasm, and breathing can fail, which is why sprayers must wear protective clothing.\n\nNervous and endocrine control differ in several ways. The nervous system uses electrical impulses, with chemical transmission at synapses, whereas the endocrine system uses hormones. Impulses travel along neurones to precise targets, whereas hormones travel in the blood to all cells, and only target cells with specific receptors respond. Nervous responses are very rapid, whereas hormonal responses are slower; and nervous responses are usually short-lived and localised, whereas hormonal effects are longer-lasting and often widespread.",
    },
  });

  // ---------------------------------------------------------------- E3: genes to phenotype; monohybrid, codominance and sex linkage
  essay(b, {
    concepts: [A("inheritance.genes-phenotype"), A("inheritance.monohybrid"), A("inheritance.sex-linkage")],
    stem: "Answer both parts.",
    hints: ["In (a) follow sickle cell anaemia from the base sequence to the symptoms.", "In (b) set out each genetic diagram line by line, with symbols defined."],
    a: {
      stem: "Using sickle cell anaemia as an example, outline how a gene determines a phenotype through the protein it codes for.",
      points: [
        "A gene is a sequence of DNA bases at a locus that codes for a polypeptide; alleles differ in base sequence",
        "The HBB gene codes for β-globin, a polypeptide of haemoglobin",
        "In the $Hb^S$ allele a base substitution changes one triplet (mRNA codon GAG to GUG)",
        "So glutamic acid is replaced by valine at position 6",
        "Valine is hydrophobic, so haemoglobin S molecules stick together into fibres at low oxygen concentration",
        "Red blood cells become sickle-shaped and inflexible",
        "Sickled cells block capillaries and are destroyed rapidly, causing pain, organ damage and anaemia",
        "$Hb^S Hb^S$ gives sickle cell anaemia; heterozygotes have sickle cell trait (and some protection from malaria)",
      ],
      modelAnswer: "A gene is a sequence of DNA bases at a particular locus that codes for a polypeptide, and alleles are versions of the gene that differ in base sequence. The HBB gene codes for β-globin, one of the polypeptides in haemoglobin. In the sickle cell allele, $Hb^S$, a single base substitution changes one triplet so that the mRNA codon GAG becomes GUG, and the amino acid glutamic acid at position 6 is replaced by valine. Valine is hydrophobic, so at low oxygen concentration molecules of haemoglobin S stick together into long fibres, distorting red blood cells into a rigid sickle shape. Sickled cells block capillaries, causing pain and organ damage, and are destroyed quickly, causing anaemia. People with genotype $Hb^S Hb^S$ have sickle cell anaemia; heterozygotes, $Hb^A Hb^S$, have sickle cell trait, usually without symptoms and with some protection against malaria.",
    },
    bb: {
      stem: "With the help of genetic diagrams, explain the inheritance of (i) the ABO blood groups, as an example of multiple alleles and codominance, and (ii) haemophilia, as an example of sex linkage.",
      points: [
        "ABO: three alleles $I^A$, $I^B$, $I^O$; any person has two",
        "$I^A$ and $I^B$ are codominant (both expressed in group AB); both are dominant to $I^O$",
        "Genotypes: A = $I^A I^A$ or $I^A I^O$; B = $I^B I^B$ or $I^B I^O$; AB = $I^A I^B$; O = $I^O I^O$",
        "Cross $I^A I^O$ × $I^B I^O$: gametes $I^A$, $I^O$ and $I^B$, $I^O$",
        "Offspring $I^A I^B$ (AB), $I^A I^O$ (A), $I^B I^O$ (B), $I^O I^O$ (O) in a 1 : 1 : 1 : 1 ratio",
        "Haemophilia: recessive allele of the F8 gene on the X chromosome; no allele on the Y",
        "Females: $X^H X^H$ normal, $X^H X^h$ carrier, $X^h X^h$ affected; males: $X^H Y$ normal, $X^h Y$ affected",
        "Cross carrier female $X^H X^h$ × normal male $X^H Y$: gametes $X^H$, $X^h$ and $X^H$, Y",
        "Offspring: normal female, carrier female, normal male, male with haemophilia (1 : 1 : 1 : 1)",
        "Half the sons are affected and half the daughters carriers",
        "Males need only one recessive allele (one X), so are affected more often; females need two",
        "Fathers pass the X to daughters and Y to sons, so there is no father-to-son transmission",
      ],
      modelAnswer: "(i) The ABO gene has three alleles, $I^A$, $I^B$ and $I^O$, although each person carries only two. $I^A$ and $I^B$ are codominant, so both are expressed in a person of group AB, and both are dominant to $I^O$. Group A is $I^A I^A$ or $I^A I^O$; group B is $I^B I^B$ or $I^B I^O$; group AB is $I^A I^B$; and group O is $I^O I^O$. For example, parents of group A ($I^A I^O$) and group B ($I^B I^O$) produce gametes $I^A$ and $I^O$, and $I^B$ and $I^O$. A Punnett square gives $I^A I^B$ (group AB), $I^A I^O$ (group A), $I^B I^O$ (group B) and $I^O I^O$ (group O) in a 1 : 1 : 1 : 1 ratio, so all four groups are possible among their children.\n\n(ii) Haemophilia A is caused by a recessive allele of the F8 gene, which is on the X chromosome; the Y carries no allele of this gene. Females can be $X^H X^H$ (normal), $X^H X^h$ (carrier) or $X^h X^h$ (affected); males are $X^H Y$ (normal) or $X^h Y$ (affected). A carrier woman, $X^H X^h$, and an unaffected man, $X^H Y$, produce eggs $X^H$ and $X^h$ and sperm $X^H$ and Y. Their children are $X^H X^H$ (normal daughter), $X^H X^h$ (carrier daughter), $X^H Y$ (normal son) and $X^h Y$ (son with haemophilia), in a 1 : 1 : 1 : 1 ratio, so half the sons are expected to be affected and half the daughters to be carriers. Males are affected far more often, because their single X means one recessive allele is expressed, while females need two. A father passes his X to all his daughters and his Y to his sons, so the condition is never passed from father to son.",
    },
  });
});
