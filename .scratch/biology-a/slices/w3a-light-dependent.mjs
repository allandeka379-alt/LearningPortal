// W3a: the light-dependent stage.
import { concept, P, t, chk, table } from "../lib.mjs";

concept("abio.photosynthesis.light-dependent", { file: "photosynthesis/light-dependent", keyPrefix: "photosynthesis.light-dependent" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the source of the oxygen released in photosynthesis?",
    options: [
      ["Water", "Correct: oxygen comes from photolysis of water."],
      ["Carbon dioxide", "Carbon from CO₂ is fixed; its oxygen ends up in sugars and water."],
      ["Glucose", "Glucose is a product, not a source of oxygen gas."],
      ["Chlorophyll", "Chlorophyll loses electrons, not oxygen."],
    ],
    answer: "A",
    explanation: "Photolysis: 2H₂O → 4H⁺ + 4e⁻ + O₂.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which products are made in cyclic photophosphorylation?",
    options: [
      ["ATP only", "Correct: electrons return to PSI; no NADP is reduced."],
      ["ATP and reduced NADP", "These are the products of non-cyclic photophosphorylation."],
      ["Reduced NADP and oxygen", "Neither is made in the cyclic pathway."],
      ["ATP, reduced NADP and oxygen", "This lists the products of the non-cyclic pathway."],
    ],
    answer: "A",
    explanation: "Cyclic: **ATP only**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which molecule is the final electron acceptor in non-cyclic photophosphorylation?",
    options: [
      ["NADP", "Correct: it is reduced in the stroma."],
      ["Oxygen", "Oxygen is the final acceptor in respiration."],
      ["Water", "Water donates electrons; it does not accept them."],
      ["Carbon dioxide", "CO₂ is fixed in the Calvin cycle, not reduced by the chain."],
    ],
    answer: "A",
    explanation: "Electrons from PSI reduce **NADP**.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "In which direction do protons move through ATP synthase in a chloroplast?",
    options: [
      ["From the thylakoid space into the stroma", "Correct: down their gradient."],
      ["From the stroma into the thylakoid space", "This is the direction of pumping by carriers."],
      ["From the cytoplasm into the stroma", "The gradient used is across the thylakoid membrane."],
      ["From the stroma into the intermembrane space", "There is no proton gradient across the envelope used for ATP synthesis."],
    ],
    answer: "A",
    explanation: "Protons flow **out of the thylakoid** into the stroma.",
    hints: ["Where do protons accumulate?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Electrons lost from the reaction centre of photosystem II are replaced by electrons from which source?",
    options: [
      ["Photolysis of water", "Correct: the oxygen-evolving complex supplies them."],
      ["Reduced NADP", "Reduced NADP is a product, used in the Calvin cycle."],
      ["Photosystem I", "PSI receives electrons from PSII via the chain, not the reverse."],
      ["ATP synthase in the thylakoid membrane", "ATP synthase moves protons, not electrons."],
    ],
    answer: "A",
    explanation: "Water is split to replace **PSII's electrons**.",
    hints: ["Which photosystem is linked to oxygen release?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which process adds protons to the thylakoid space?",
    options: [
      ["Photolysis of water", "Correct: protons from water are released inside the thylakoid."],
      ["Reduction of NADP", "This removes protons from the stroma."],
      ["Fixation of carbon dioxide", "This happens in the stroma and does not add protons to the thylakoid."],
      ["Diffusion through ATP synthase", "This removes protons from the thylakoid space."],
    ],
    answer: "A",
    explanation: "**Photolysis** and pumping by carriers add protons to the thylakoid space.",
    hints: ["Where is the oxygen-evolving complex?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A herbicide blocks electron flow between photosystem II and photosystem I. Which effect would occur first in the chloroplasts of a sprayed weed?",
    options: [
      ["Oxygen release and reduction of NADP stop", "Correct: non-cyclic flow stops."],
      ["Cyclic photophosphorylation stops completely", "Cyclic flow uses PSI only and is not blocked here."],
      ["The Calvin cycle speeds up because more ATP is available", "Less ATP and reduced NADP are available."],
      ["Water is split faster to supply more electrons", "PSII cannot pass on electrons, so photolysis stops too."],
    ],
    answer: "A",
    explanation: "With the chain blocked, PSII cannot pass electrons on, so photolysis, **O₂ release** and **NADP reduction** stop.",
    hints: ["Which pathway uses the chain between PSII and PSI?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which feature is shared by chemiosmosis in chloroplasts and in mitochondria?",
    options: [
      ["Electron transport powers proton pumping across a membrane", "Correct: the principle is the same."],
      ["Oxygen is the final electron acceptor", "Only in mitochondria."],
      ["Protons are pumped into the intermembrane space", "In chloroplasts they go into the thylakoid space."],
      ["Electrons are excited by light absorbed by chlorophyll", "Only in chloroplasts."],
    ],
    answer: "A",
    explanation: "Both use **electron transport → proton pumping → ATP synthase**.",
    hints: ["Eliminate features that apply to only one organelle."],
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Non-cyclic photophosphorylation involves both photosystem I and photosystem II.",
    answer: true,
    explanation: "True. Cyclic involves PSI only.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Light energy splits water molecules directly, without any enzyme.",
    answer: false,
    explanation: "False. The **oxygen-evolving complex** (an enzyme complex of PSII) splits water.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each part of the light-dependent stage to what it does.",
    pairs: [
      ["Photosystem II", "Its excited electrons are replaced by photolysis"],
      ["Photosystem I", "Its excited electrons reduce NADP"],
      ["Electron transport chain", "Uses energy from electrons to pump protons"],
      ["ATP synthase", "Makes ATP as protons flow through it"],
    ],
    explanation: "Each component has one main role.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "In non-cyclic photophosphorylation, water is split to give protons, electrons and {{blank:a}}. Electrons excited in PSI reduce {{blank:b}}. Protons accumulate in the {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["oxygen"], choices: ["oxygen", "carbon dioxide", "hydrogen gas"] },
      { id: "b", accepted: ["NADP"], choices: ["NADP", "NAD", "FAD"] },
      { id: "c", accepted: ["thylakoid space"], choices: ["thylakoid space", "stroma", "intermembrane space"] },
    ],
    explanation: "O₂ from water; NADP reduced; protons in the thylakoid space.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the splitting of water using energy from light.",
    accepted: ["photolysis", "photolysis of water"],
    wrong: ["hydrolysis"],
    explanation: "**Photolysis.**",
  });

  const nadp = 10;
  const water = (nadp * 2) / 2, o2 = water / 2;
  chk(o2, 5);
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "Each molecule of NADP is reduced by two electrons. How many molecules of oxygen are released when 10 molecules of NADP are reduced by non-cyclic photophosphorylation?",
    value: o2, wrong: [water, nadp * 2],
    explanation: t`$10 \times 2 = 20$ electrons; each water gives 2 electrons, so 10 water; 2 water per O₂, so $10 \div 2 = ${o2}$ O₂. Answering 10 gives the water molecules, not oxygen.`,
    hints: ["2H₂O → 4H⁺ + 4e⁻ + O₂."],
  });
  const co2 = 6, atpPer = 3, nadphPer = 2;
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "The Calvin cycle uses 3 ATP and 2 reduced NADP for each molecule of CO₂ fixed. How many ATP must the light-dependent stage supply to fix 6 molecules of CO₂ (enough for one hexose)?",
    value: co2 * atpPer, wrong: [co2 * nadphPer, atpPer],
    explanation: t`$6 \times 3 = ${co2 * atpPer}$ ATP (and $6 \times 2 = 12$ reduced NADP). The extra ATP compared with reduced NADP is partly supplied by cyclic photophosphorylation.`,
    hints: ["Multiply the per-CO₂ figure by the number of CO₂."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 5,
    stem: "Describe non-cyclic photophosphorylation.",
    points: [
      "Light absorbed by PSII excites electrons, which leave chlorophyll a and pass to an electron acceptor",
      "Photolysis of water (oxygen-evolving complex) replaces the electrons; produces protons and oxygen",
      "Electrons pass along carriers to PSI, releasing energy used to pump protons into the thylakoid space",
      "Light excites electrons in PSI; these reduce NADP (with protons from the stroma) to reduced NADP",
      "Protons diffuse from the thylakoid space through ATP synthase into the stroma, making ATP (chemiosmosis)",
    ],
    modelAnswer: "Light absorbed by photosystem II excites electrons in chlorophyll a, which pass to an electron acceptor. Water is split by photolysis to replace them, releasing protons and oxygen. The electrons pass along a chain of carriers to photosystem I, releasing energy that pumps protons into the thylakoid space. Light excites electrons in photosystem I, and these reduce NADP to reduced NADP in the stroma. Protons diffuse from the thylakoid space through ATP synthase into the stroma, and ATP is made by chemiosmosis.",
    explanation: "PSII → photolysis → chain → PSI → NADP; chemiosmosis makes ATP.",
    hints: ["Follow the electrons from water to NADP."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Compare cyclic and non-cyclic photophosphorylation.",
    points: [
      "Both: light excites electrons in chlorophyll and ATP is made by chemiosmosis",
      "Cyclic uses PSI only; non-cyclic uses PSI and PSII",
      "Cyclic: no photolysis / no oxygen released; non-cyclic splits water and releases oxygen",
      "Cyclic: ATP only, electrons return to PSI; non-cyclic: ATP and reduced NADP, electrons end on NADP",
    ],
    modelAnswer: "In both, light excites electrons and ATP is made by chemiosmosis. Cyclic photophosphorylation uses only photosystem I, while non-cyclic uses both. Non-cyclic splits water and releases oxygen; cyclic does not. In cyclic, electrons return to PSI and only ATP is made, whereas in non-cyclic electrons end on NADP, so both ATP and reduced NADP are made.",
    explanation: "Give a similarity, then paired differences.",
    hints: ["Photosystems, electron source, products, oxygen."],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 3,
    stem: "Explain why the pH of the thylakoid space falls when isolated chloroplasts are illuminated.",
    points: [
      "Photolysis releases protons into the thylakoid space",
      "Electron transport pumps protons from the stroma into the thylakoid space",
      "Higher proton (H⁺) concentration = lower pH; membrane impermeable to protons except through ATP synthase",
    ],
    modelAnswer: "In light, photolysis releases protons inside the thylakoid, and the energy from electron transport is used to pump more protons from the stroma into the thylakoid space. The membrane is impermeable to protons except through ATP synthase, so their concentration rises and the pH falls.",
    explanation: "More protons → lower pH.",
    hints: ["Two sources of protons in the thylakoid space."],
  });

  // Practice structured: Hill reaction
  const rows = [
    ["A", "Chloroplast suspension + DCPIP", "Light", "6"],
    ["B", "Chloroplast suspension + DCPIP", "Dark (foil)", "No change after 30"],
    ["C", "Boiled chloroplast suspension + DCPIP", "Light", "No change after 30"],
    ["D", "Buffer + DCPIP (no chloroplasts)", "Light", "No change after 30"],
  ];
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `Farai prepared a chloroplast suspension from spinach leaves in ice-cold buffer and set up four tubes with DCPIP, a blue dye that becomes colourless when it is reduced.\n\n${table(["Tube", "Contents", "Conditions", "Time for blue colour to disappear / min"], rows)}`,
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "Explain why DCPIP loses its colour in tube A.",
        points: ["Light excites electrons in the photosystems / chlorophyll", "DCPIP accepts these electrons (instead of NADP) and is reduced, becoming colourless"],
        modelAnswer: "Light excites electrons in chlorophyll in the photosystems, and DCPIP accepts these electrons in place of NADP, so it is reduced and loses its colour.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "State what tubes B, C and D each show.",
        points: ["B: light is needed", "C: functional (non-denatured) proteins / enzymes / thylakoids are needed", "D: chloroplasts are needed; light alone does not reduce DCPIP"],
        modelAnswer: "Tube B shows that light is needed. Tube C shows that working, undenatured thylakoid proteins are needed. Tube D shows that chloroplasts are needed and that light alone does not reduce DCPIP.",
      }),
      P.mcq({
        label: "(c)", stem: "Why was the suspension kept in ice-cold buffer?",
        options: [["To slow enzymes that could damage the chloroplasts", "Correct: cold reduces breakdown by enzymes."], ["To increase the rate of photolysis in the thylakoids", "Cold slows reactions."], ["To dissolve the DCPIP", "DCPIP dissolves at room temperature."], ["To stop light reaching the chloroplasts", "Cold does not block light."]],
        answer: "A", explanation: "Low temperature reduces damage by hydrolytic enzymes released during grinding; the buffer keeps the pH constant.",
      }),
      P.short({
        label: "(d)", marks: 1, stem: "Name the gas that would also be released in tube A.",
        accepted: ["oxygen", "O2", "O₂"], wrong: ["carbon dioxide"], explanation: "**Oxygen**, from photolysis.",
      }),
      P.manual({
        label: "(e)", marks: 1, stem: "Suggest how Farai could measure the change in colour more objectively.",
        points: ["Use a colorimeter to measure absorbance (or transmission) at intervals / compare with a colour standard"],
        modelAnswer: "Use a colorimeter with a red filter to measure the absorbance at regular intervals, instead of judging by eye.",
      }),
    ],
    explanation: "DCPIP replaces NADP as an electron acceptor; controls isolate light, active chloroplasts and chloroplasts themselves.",
    hints: ["What does DCPIP replace in the normal pathway?"],
  });

  b.struct({
    d: 3, skill: "UNDERSTANDING",
    stem: "In the light-dependent stage, electrons flow from water to NADP through two photosystems, P and Q. P is linked to the splitting of water and absorbs light best at a slightly shorter wavelength than Q.",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name photosystem P.", accepted: ["photosystem II", "PSII", "PS II", "photosystem 2", "PS2"], rejected: ["photosystem I", "PSI"], wrong: ["photosystem I"], explanation: "P is **PSII**." }),
      P.tf({ label: "(b)", stem: "True or false: in cyclic photophosphorylation, electrons from Q return to Q.", answer: true, explanation: "True. Q is PSI." }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why photolysis is necessary for the continued activity of P.",
        points: ["P loses electrons when photoactivated (becomes oxidised / positively charged)", "Electrons from water replace them, so P can be excited again"],
        modelAnswer: "When light excites P, electrons leave its chlorophyll, which becomes oxidised. Photolysis supplies electrons from water to replace them, so P can absorb light and lose electrons again.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "State the two products of the light-dependent stage used in the Calvin cycle, and one use of each.",
        points: ["ATP: reduction of GP to triose phosphate / regeneration of RuBP", "Reduced NADP: reduction of GP to triose phosphate (supplies hydrogen)"],
        modelAnswer: "ATP supplies energy to reduce GP to triose phosphate and to regenerate RuBP; reduced NADP supplies hydrogen to reduce GP to triose phosphate.",
      }),
    ],
    explanation: "PSII is linked to photolysis; PSI reduces NADP or cycles electrons.",
    hints: ["Which photosystem has the oxygen-evolving complex?"],
  });

  b.card("DEFINITION", "Define **photolysis**.", "Splitting of water using energy from light (by PSII's oxygen-evolving complex): 2H₂O → 4H⁺ + 4e⁻ + O₂.");
  b.card("DEFINITION", "Define **photophosphorylation**.", "ATP synthesis from ADP + Pi using light energy, by chemiosmosis across the thylakoid membrane.");
  b.card("CONCEPT", "Non-cyclic photophosphorylation", "PSII excited → electrons along carriers (protons pumped) → PSI excited → NADP reduced; water replaces PSII electrons; ATP, reduced NADP, O₂.");
  b.card("CONCEPT", "Cyclic photophosphorylation", "PSI only; electrons return to PSI via carriers; ATP only; no O₂, no reduced NADP.");
  b.card("FACT", "Where do protons accumulate in a chloroplast?", "Thylakoid space; they flow out to the stroma through ATP synthase.");
  b.card("DEFINITION", "Define **photosystem**.", "Pigment-protein complex in the thylakoid membrane: light-harvesting pigments funnel energy to a chlorophyll a reaction centre.");
  b.card("FACT", "Reaction centres", "PSII absorbs best at about 680 nm (P680); PSI at about 700 nm (P700).");
  b.card("CONCEPT", "Chloroplast versus mitochondrion chemiosmosis", "Chloroplast: light energy, water → NADP, protons into thylakoid space. Mitochondrion: reduced NAD/FAD → oxygen, protons into intermembrane space.");
});
