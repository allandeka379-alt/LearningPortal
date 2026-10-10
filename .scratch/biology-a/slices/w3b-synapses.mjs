// W3b: the cholinergic synapse (both boards; Cambridge A Level only).
import { concept, P, t, chk, table, rnd } from "../lib.mjs";

concept("abio.coordination.synapses", { file: "coordination/synapses", keyPrefix: "coordination.synapses" }, (b) => {
  const calc = (o) => b.calc({ ...o, workedSolution: o.workedSolution ?? o.explanation });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which enzyme breaks down the neurotransmitter at a cholinergic synapse?",
    options: [
      ["Acetylcholinesterase", "Correct."],
      ["ATP synthase", "ATP synthase makes ATP in mitochondria."],
      ["Choline kinase", "Not the enzyme that hydrolyses acetylcholine in the cleft."],
      ["Monoamine oxidase", "This acts on other transmitters such as noradrenaline, not on acetylcholine."],
    ],
    answer: "A",
    explanation: "**Acetylcholinesterase** hydrolyses acetylcholine into choline and ethanoic acid.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which ions enter the presynaptic knob when an action potential arrives, triggering the release of acetylcholine?",
    options: [
      ["Calcium ions", "Correct: through voltage-gated calcium channels."],
      ["Sodium ions", "Na⁺ enters the postsynaptic cell when ACh binds."],
      ["Potassium ions", "K⁺ leaves during repolarisation."],
      ["Chloride ions", "Chloride is not the trigger for exocytosis."],
    ],
    answer: "A",
    explanation: "Voltage-gated **calcium** channels open; Ca²⁺ entry causes vesicles to fuse with the membrane.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "By which process is acetylcholine released from the presynaptic membrane?",
    options: [
      ["Exocytosis", "Correct: vesicles fuse with the membrane."],
      ["Facilitated diffusion", "ACh is released in vesicles, not through channels."],
      ["Active transport by a carrier", "Release is by vesicle fusion, not by a carrier protein."],
      ["Osmosis", "Osmosis is the movement of water."],
    ],
    answer: "A",
    explanation: "Vesicles fuse with the presynaptic membrane and release ACh by **exocytosis**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why can impulses cross a synapse in one direction only?",
    options: [
      ["Only the presynaptic side releases transmitter; only the postsynaptic side has receptors", "Correct."],
      ["The synaptic cleft is far too wide for any ions to diffuse across it in the reverse direction", "Neither ions nor impulses cross the cleft in either direction."],
      ["Acetylcholinesterase is found only on the presynaptic membrane", "The enzyme is on the postsynaptic side; this is not the reason."],
      ["The postsynaptic membrane is always in its refractory period", "It is not permanently refractory."],
    ],
    answer: "A",
    explanation: "Vesicles are only presynaptic and receptors only postsynaptic, so transmission is one-way.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "An organophosphate insecticide inhibits acetylcholinesterase. What happens at a cholinergic synapse after poisoning?",
    options: [
      ["ACh stays bound, so the postsynaptic membrane stays depolarised", "Correct: continuous stimulation."],
      ["No ACh is released, so no impulses cross", "Release is not affected; breakdown is."],
      ["ACh receptors are blocked, so sodium channels cannot open", "That describes a receptor blocker such as curare."],
      ["Calcium channels stay closed in the presynaptic knob", "The insecticide acts on the enzyme in the cleft."],
    ],
    answer: "A",
    explanation: "ACh is not hydrolysed, so it keeps binding and the sodium channels keep opening: continuous stimulation, spasm and possible respiratory failure.",
    hints: ["What does the enzyme normally do?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Nicotine stimulates some cholinergic synapses. The best explanation is that nicotine",
    options: [
      ["has a shape similar to ACh and binds to its receptors, opening the channels", "Correct: it mimics ACh."],
      ["inhibits acetylcholinesterase so that ACh gradually accumulates in the synaptic cleft", "That is the action of organophosphates."],
      ["enters the presynaptic knob and is packaged into synaptic vesicles", "Nicotine acts on postsynaptic receptors."],
      ["opens voltage-gated calcium channels in the postsynaptic membrane", "Ca²⁺ channels involved in release are presynaptic."],
    ],
    answer: "A",
    explanation: "Nicotine is similar enough in shape to ACh to bind some ACh receptors and open their sodium channels.",
    hints: ["Compare nicotine's shape with acetylcholine's."],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Impulses arrive at the same moment at three synapses on one postsynaptic neurone. None alone reaches threshold, but together they produce an action potential. This is",
    options: [
      ["spatial summation", "Correct: inputs from several neurones add together."],
      ["temporal summation", "Temporal summation is repeated impulses in one neurone."],
      ["saltatory conduction", "That is conduction along a myelinated axon."],
      ["synaptic fatigue", "Fatigue is running out of transmitter."],
    ],
    answer: "A",
    explanation: "Several presynaptic neurones together: **spatial** summation.",
    hints: ["Several neurones, or one neurone firing repeatedly?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Many mitochondria are found in the presynaptic knob. Which is the best explanation?",
    options: [
      ["ATP is needed to resynthesise ACh and to pump Ca²⁺ out of the knob", "Correct."],
      ["ATP is needed for ACh to diffuse across the synaptic cleft", "Diffusion is passive."],
      ["Mitochondria release calcium ions that trigger exocytosis", "The Ca²⁺ that triggers release enters from the tissue fluid."],
      ["ATP is needed to open the voltage-gated sodium channels", "Voltage-gated channels open in response to depolarisation, not ATP."],
    ],
    answer: "A",
    explanation: "ATP is used to make ACh from choline and acetate (via acetyl coenzyme A), to move vesicles and to pump Ca²⁺ out.",
    hints: ["Which steps are active?"],
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Acetylcholine enters the postsynaptic neurone and causes depolarisation.",
    answer: false,
    explanation: "False. ACh binds to receptors on the surface; the receptor channels open and **sodium ions** enter.",
  });
  b.tf({
    d: 2, skill: "RECALL",
    stem: "The products of acetylcholine hydrolysis are taken back into the presynaptic knob and used to make more acetylcholine.", daily: true,
    answer: true,
    explanation: "True. Choline and ethanoic acid diffuse back and ACh is resynthesised, using ATP.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each structure of a cholinergic synapse with its function.",
    pairs: [
      ["Synaptic vesicle", "Stores acetylcholine"],
      ["Voltage-gated Ca²⁺ channel", "Lets calcium ions into the knob"],
      ["Postsynaptic receptor", "Binds ACh and opens a sodium channel"],
      ["Acetylcholinesterase", "Hydrolyses ACh in the cleft"],
    ],
    explanation: "Vesicles store; Ca²⁺ channels admit Ca²⁺; receptors bind ACh; the enzyme removes it.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "Acetylcholine diffuses across the synaptic {{blank:a}} and binds to receptors on the {{blank:b}} membrane, causing {{blank:c}} ions to enter.",
    blanks: [
      { id: "a", accepted: ["cleft"], choices: ["cleft", "knob", "vesicle"] },
      { id: "b", accepted: ["postsynaptic"], choices: ["postsynaptic", "presynaptic", "nuclear"] },
      { id: "c", accepted: ["sodium"], choices: ["sodium", "calcium", "potassium"] },
    ],
    explanation: "Cleft → postsynaptic receptors → sodium ions in.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the two products of the hydrolysis of acetylcholine.",
    accepted: ["choline and ethanoic acid", "choline and acetate", "choline and acetic acid", "ethanoic acid and choline", "acetate and choline", "acetic acid and choline", "choline and ethanoate", "ethanoate and choline"],
    wrong: ["choline and glucose"],
    explanation: "**Choline** and **ethanoic acid** (acetate).",
  });

  // Numerical: synaptic delay contribution
  const nSyn = 4, delay = 0.6, len = 1.1, speed = 55;
  const cond = (len / speed) * 1000;
  chk(cond, 20);
  const tot = cond + nSyn * delay;
  chk(tot, 22.4);
  const pct = ((nSyn * delay) / tot) * 100;
  calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: `A pathway contains ${nSyn} synapses, each with a delay of ${delay} ms. The axons in the pathway have a total length of ${len} m and conduct at ${speed} m s⁻¹. Calculate the percentage of the total transmission time that is due to synaptic delay. Give your answer to three significant figures.`,
    value: pct, sf: 3, unit: "%", wrong: [rnd(((nSyn * delay) / cond) * 100, 1)],
    explanation: t`1. Conduction time $= \dfrac{${len}}{${speed}} = ${rnd(len / speed, 3)}\ \text{s} = ${rnd(cond, 1)}\ \text{ms}$.
2. Synaptic delay $= ${nSyn} \times ${delay} = ${rnd(nSyn * delay, 1)}\ \text{ms}$.
3. Total $= ${rnd(cond, 1)} + ${rnd(nSyn * delay, 1)} = ${rnd(tot, 1)}\ \text{ms}$.
4. Percentage $= \dfrac{${rnd(nSyn * delay, 1)}}{${rnd(tot, 1)}} \times 100 = ${rnd(pct, 1)}\%$.
Dividing by the conduction time only (12.0%) is a common mistake.`,
    hints: ["Find the conduction time first, in ms.", "Divide the synaptic delay by the TOTAL time."],
  });
  // Numerical: temporal summation
  const rest = -68, thr = -52, perImpulse = 5;
  const need = Math.ceil((thr - rest) / perImpulse);
  chk(need, 4);
  b.num({
    d: 3, skill: "APPLICATION",
    stem: `A postsynaptic membrane has a resting potential of ${rest} mV and a threshold of ${thr} mV. Each impulse arriving at the synapse depolarises it by ${perImpulse} mV, and the effects add if impulses arrive close together. What is the smallest number of impulses in rapid succession needed to produce an action potential?`,
    value: need, wrong: [3, 16],
    explanation: `Depolarisation needed = ${thr} − (${rest}) = ${thr - rest} mV. ${thr - rest} ÷ ${perImpulse} = ${(thr - rest) / perImpulse}, so **${need}** impulses are needed (3 give only 15 mV). This is temporal summation.`,
    hints: ["Work out how many mV are needed to reach threshold."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Describe the sequence of events at a cholinergic synapse from the arrival of an action potential to the production of an action potential in the postsynaptic neurone.",
    points: [
      "Action potential arrives at the presynaptic knob and opens voltage-gated Ca²⁺ channels",
      "Ca²⁺ diffuses into the knob",
      "Vesicles move to and fuse with the presynaptic membrane, releasing ACh by exocytosis",
      "ACh diffuses across the synaptic cleft",
      "ACh binds to (complementary) receptors on the postsynaptic membrane, opening Na⁺ channels",
      "Na⁺ diffuses in, depolarising the postsynaptic membrane; if threshold is reached an action potential is produced",
    ],
    modelAnswer: "The action potential depolarises the presynaptic knob and opens voltage-gated calcium channels, so calcium ions diffuse in. This causes vesicles of acetylcholine to move to the presynaptic membrane and fuse with it, releasing ACh into the cleft by exocytosis. ACh diffuses across the cleft and binds to complementary receptor proteins on the postsynaptic membrane, opening their sodium channels. Sodium ions diffuse in and depolarise the postsynaptic membrane; if the threshold is reached, an action potential is generated.",
    explanation: "Six steps in order.",
    hints: ["Start with calcium channels."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why it is important that acetylcholine is broken down rapidly after it has bound to receptors.",
    points: [
      "So that sodium channels close and the postsynaptic membrane repolarises",
      "Prevents continuous stimulation / repeated action potentials from one impulse",
      "Allows separate impulses to be transmitted / the products are recycled to make more ACh",
    ],
    modelAnswer: "Hydrolysis of ACh lets the receptor channels close so the postsynaptic membrane repolarises. Without it, the postsynaptic cell would be stimulated continuously by one impulse. Rapid removal allows each new impulse to be transmitted separately, and the products are recycled to make more ACh.",
    explanation: "Stop the signal, allow the next one.",
    hints: ["What would happen if ACh stayed bound?"],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "Suggest why farm workers spraying organophosphate insecticides are advised to wear gloves, masks and protective clothing.",
    points: [
      "Organophosphates inhibit acetylcholinesterase in humans as well as in insects",
      "They can be absorbed through the skin or lungs",
      "ACh accumulates, causing continuous stimulation of muscles: twitching, spasm, breathing difficulty / possible death",
    ],
    modelAnswer: "Organophosphates inhibit acetylcholinesterase in humans as well as insects, because the enzyme is similar. They can be absorbed through the skin and lungs. Acetylcholine would then build up at synapses and neuromuscular junctions, causing continuous stimulation, muscle twitching and spasm, and possibly failure of breathing.",
    explanation: "Same enzyme, same effect.",
    hints: ["Does the human nervous system use the same enzyme?"],
  });

  // Practice structured: effect of a drug on postsynaptic responses
  const conc = [0, 2, 4, 6, 8, 10];
  const resp = [100, 82, 61, 45, 30, 18];
  const pctFall = ((resp[0] - resp[3]) / resp[0]) * 100;
  chk(pctFall, 55);
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `A drug Z was added at different concentrations to the fluid bathing a cholinergic synapse. The same stimulus was applied each time, and the size of the depolarisation of the postsynaptic membrane was recorded as a percentage of the value with no drug.\n\n${table(["Concentration of Z / µmol dm⁻³", ...conc.map(String)], [["Postsynaptic depolarisation / %", ...resp.map(String)]])}\n\nThe amount of acetylcholine released did not change with the concentration of Z.`,
    parts: [
      P.num({
        label: "(a)", marks: 1, stem: "Calculate the percentage decrease in the postsynaptic depolarisation when the concentration of Z increased from 0 to 6 µmol dm⁻³.",
        value: pctFall, unit: "%", wrong: [45],
        explanation: "(100 − 45) ÷ 100 × 100 = 55%.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Describe the effect of Z on the postsynaptic depolarisation.",
        points: [
          "As concentration increases, the depolarisation decreases",
          "Quoted data: from 100% at 0 to 18% at 10 µmol dm⁻³ / falls steadily without levelling off",
        ],
        modelAnswer: "As the concentration of Z increases, the postsynaptic depolarisation decreases, from 100% with no drug to 18% at 10 µmol dm⁻³, falling steadily across the whole range.",
      }),
      P.mcq({
        label: "(c)", stem: "Which mode of action of Z best fits these results?",
        options: [
          ["Z binds to ACh receptors without opening their channels", "Correct: ACh release is unchanged but its effect falls."],
          ["Z inhibits acetylcholinesterase", "This would increase or prolong depolarisation."],
          ["Z blocks voltage-gated calcium channels in the knob", "ACh release would then fall, but it did not."],
          ["Z mimics ACh and opens sodium channels", "A mimic would increase depolarisation."],
        ],
        answer: "A",
        explanation: "Release is unchanged, so Z must act on the postsynaptic side; reduced depolarisation means fewer receptor channels open: Z blocks receptors.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Explain why Z at high concentration would prevent an action potential in the postsynaptic neurone.",
        points: [
          "Z occupies many receptors, so ACh cannot bind",
          "Fewer Na⁺ channels open, so less Na⁺ enters",
          "Depolarisation does not reach the threshold, so no action potential",
        ],
        modelAnswer: "At high concentration Z occupies most of the receptor sites, so acetylcholine cannot bind to them. Fewer sodium channels open and less Na⁺ enters, so the depolarisation of the postsynaptic membrane is too small to reach the threshold and no action potential is generated.",
      }),
      P.manual({
        label: "(e)", marks: 1, stem: "Suggest one way of checking that the reduced response was not caused by fatigue of the synapse.",
        points: ["Wash out Z and stimulate again (response returns to 100%) / allow rest between stimuli / test the concentrations in random order"],
        modelAnswer: "Wash Z out and repeat the stimulus: if the response returns to 100%, fatigue was not the cause.",
      }),
    ],
    explanation: "Unchanged release with reduced response points to a receptor blocker.",
    hints: ["Is Z acting before or after the cleft?"],
    calculator: true,
  });

  b.struct({
    d: 3, skill: "UNDERSTANDING",
    stem: "An electron micrograph of a synapse shows a swollen axon ending containing many small round vesicles and several mitochondria, a narrow gap, and a dark thickened region on the membrane of the cell opposite.",
    parts: [
      P.short({
        label: "(a)", marks: 1, stem: "Name the narrow gap.",
        accepted: ["synaptic cleft", "the synaptic cleft", "cleft", "synaptic gap"],
        wrong: ["node of Ranvier"],
        explanation: "The synaptic cleft (about 20 nm).",
      }),
      P.short({
        label: "(b)", marks: 1, stem: "Name the neurotransmitter stored in the vesicles at a cholinergic synapse.",
        accepted: ["acetylcholine", "ACh", "Ach"],
        wrong: ["adrenaline"],
        explanation: "Acetylcholine.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Suggest what the dark thickened region on the opposite membrane contains, and why it is needed.",
        points: [
          "Many receptor proteins / ligand-gated sodium channels (and acetylcholinesterase)",
          "To bind ACh so that Na⁺ channels open / to depolarise the postsynaptic membrane",
        ],
        modelAnswer: "It contains a high density of receptor proteins (ligand-gated sodium channels), which bind acetylcholine and open so that the postsynaptic membrane is depolarised.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain the role of the mitochondria in the axon ending.",
        points: [
          "Aerobic respiration supplies ATP",
          "For resynthesis of ACh / packaging into vesicles / pumping Ca²⁺ out",
        ],
        modelAnswer: "Mitochondria supply ATP by aerobic respiration, which is used to resynthesise acetylcholine from choline and acetate, to fill vesicles and to pump calcium ions out of the knob.",
      }),
    ],
    explanation: "Presynaptic vesicles and mitochondria, cleft, postsynaptic receptors.",
    hints: ["Work from the presynaptic side across."],
  });

  b.card("DEFINITION", "Define **synapse**.", "A junction between two neurones (or a neurone and an effector) across which information passes by a chemical neurotransmitter.");
  b.card("CONCEPT", "First events when an action potential reaches a presynaptic knob", "Voltage-gated Ca²⁺ channels open; Ca²⁺ diffuses in; vesicles fuse with the membrane and release ACh by exocytosis.");
  b.card("CONCEPT", "What happens when ACh binds to postsynaptic receptors?", "Receptor Na⁺ channels open; Na⁺ diffuses in and depolarises the postsynaptic membrane; action potential if threshold is reached.");
  b.card("FACT", "Products of acetylcholine hydrolysis", "Choline and ethanoic acid (acetate); recycled into the presynaptic knob.");
  b.card("DEFINITION", "Temporal and spatial summation", "Temporal: repeated impulses from one neurone add up. Spatial: impulses from several neurones arriving together add up.");
  b.card("CONCEPT", "Why is transmission at a synapse one-way?", "Vesicles of transmitter are only in the presynaptic knob; receptors only on the postsynaptic membrane.");
  b.card("FACT", "How do organophosphate insecticides act?", "Inhibit acetylcholinesterase, so ACh is not broken down and postsynaptic cells are continuously stimulated.");
  b.card("FACT", "How does nicotine act at synapses?", "Similar shape to ACh; binds some ACh receptors and opens their channels (mimics ACh).");
  b.card("CONCEPT", "Roles of synapses", "One-way transmission, summation (filtering weak signals), integration of many inputs, divergence and convergence.");
});
