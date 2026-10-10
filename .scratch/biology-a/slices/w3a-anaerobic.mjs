// W3a: anaerobic respiration.
import { concept, P, t, chk, sfStr, dpStr, mean, table, ZIM, CAM } from "../lib.mjs";

concept("abio.respiration.anaerobic", { file: "respiration/anaerobic", keyPrefix: "respiration.anaerobic" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the product of anaerobic respiration in mammalian muscle?",
    options: [
      ["Lactate", "Correct: pyruvate is reduced to lactate."],
      ["Ethanol and carbon dioxide", "These are the products in yeast and plants."],
      ["Ethanal", "Ethanal is an intermediate in yeast, not formed in muscle."],
      ["Carbon dioxide and water", "These are the products of aerobic respiration."],
    ],
    answer: "A",
    explanation: "Mammalian muscle makes **lactate**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the main role of converting pyruvate to lactate in a muscle cell short of oxygen?",
    options: [
      ["To regenerate NAD so that glycolysis can continue", "Correct: oxidised NAD is needed to oxidise triose phosphate."],
      ["To make extra ATP by substrate-linked phosphorylation", "No ATP is made when pyruvate becomes lactate."],
      ["To remove carbon dioxide from the muscle quickly", "Lactate fermentation releases no CO₂."],
      ["To provide oxygen for the electron transport chain", "No oxygen is produced."],
    ],
    answer: "A",
    explanation: "Fermentation **regenerates NAD**, keeping glycolysis running.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "In ethanol fermentation in yeast, which molecule accepts hydrogen from reduced NAD?",
    options: [
      ["Ethanal", "Correct: ethanal is reduced to ethanol."],
      ["Pyruvate", "In yeast, pyruvate is first decarboxylated to ethanal."],
      ["Oxygen", "Oxygen is absent in anaerobic respiration."],
      ["Lactate", "Lactate is not formed in yeast."],
    ],
    answer: "A",
    explanation: "Pyruvate → **ethanal** + CO₂; ethanal + reduced NAD → ethanol + NAD.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is the ATP yield of anaerobic respiration much smaller than that of aerobic respiration?",
    options: [
      ["Glucose is only partly broken down and the Krebs cycle and electron transport chain do not run", "Correct: only glycolysis makes ATP."],
      ["Anaerobic respiration uses more ATP to phosphorylate glucose at the start", "Both use 2 ATP to phosphorylate glucose."],
      ["Lactate and ethanol formation use up the ATP made in glycolysis", "These steps neither use nor make ATP."],
      ["ATP made without oxygen is hydrolysed immediately inside the mitochondria", "Anaerobic ATP is made in the cytoplasm and is normal ATP."],
    ],
    answer: "A",
    explanation: "Only glycolysis runs; most energy remains in **lactate or ethanol**.",
    hints: ["Which stages of respiration need oxygen indirectly?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which statement correctly compares lactate fermentation and ethanol fermentation?",
    options: [
      ["Only ethanol fermentation includes a decarboxylation", "Correct: pyruvate → ethanal + CO₂."],
      ["Only lactate fermentation regenerates NAD", "Both pathways regenerate NAD."],
      ["Only ethanol fermentation produces ATP during glycolysis", "Both rely on the 2 ATP from glycolysis."],
      ["Only lactate fermentation is irreversible in the organism", "Lactate can be converted back in the liver; ethanol cannot be in yeast."],
    ],
    answer: "A",
    explanation: "Ethanol fermentation releases **CO₂**; lactate fermentation does not.",
    hints: ["Which pathway releases a gas?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION", applies: CAM,
    stem: "Which feature of rice allows oxygen to reach roots growing in waterlogged soil?",
    options: [
      ["Aerenchyma with large air spaces in stems and roots", "Correct: oxygen diffuses down through the air spaces."],
      ["A thick waxy cuticle on the roots", "A cuticle would reduce gas exchange, not help it."],
      ["Many root hairs that absorb dissolved oxygen", "Waterlogged soil contains very little oxygen to absorb."],
      ["Stomata on the roots that open under water", "Roots do not have stomata."],
    ],
    answer: "A",
    explanation: "**Aerenchyma** forms continuous air channels from leaves to roots.",
    hints: ["Think of a tissue full of air spaces."],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "After a 400 m race, Tatenda keeps breathing deeply for several minutes. What is most of the extra oxygen used for?",
    options: [
      ["Oxidising lactate, mainly in the liver, and restoring ATP and oxygen stores", "Correct: this is repaying the oxygen debt."],
      ["Converting lactate into ethanol and carbon dioxide in muscle", "Mammals cannot make ethanol by fermentation."],
      ["Breaking down glycogen anaerobically to replace lost glucose", "Glycogen breakdown does not need oxygen, and glycogen is being rebuilt."],
      ["Removing carbon dioxide made by lactate fermentation", "Lactate fermentation makes no CO₂."],
    ],
    answer: "A",
    explanation: "The **oxygen debt** is repaid by oxidising lactate and restoring ATP, creatine phosphate and oxymyoglobin.",
    hints: ["Where is lactate taken after exercise?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS", applies: ZIM,
    stem: "Baker's yeast is given equal concentrations of glucose, maltose or lactose in anaerobic conditions. Which result is expected?",
    options: [
      ["Glucose fastest, maltose slower, lactose almost no carbon dioxide", "Correct: maltose must first be hydrolysed; lactose cannot be used."],
      ["All three sugars give the same rate because each is a reducing sugar", "Being reducing sugars does not decide whether yeast can use them."],
      ["Lactose fastest because it is a disaccharide with more energy", "Yeast lacks an enzyme to hydrolyse lactose."],
      ["Maltose fastest because it contains two glucose units", "Maltose must be hydrolysed before glycolysis, which slows it."],
    ],
    answer: "A",
    explanation: "Glucose enters glycolysis directly; maltose needs **maltase** first; baker's yeast cannot hydrolyse **lactose**.",
    hints: ["Which sugars can yeast break down, and how many steps are needed?"],
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In yeast, ethanol fermentation produces carbon dioxide.",
    answer: true,
    explanation: "True. Pyruvate is decarboxylated to ethanal, releasing CO₂, which makes bread dough rise.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Lactate formed in muscle during exercise is excreted unchanged in the urine.",
    answer: false,
    explanation: "False. Lactate is taken to the **liver**, oxidised to pyruvate and respired or converted to glucose and glycogen.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each enzyme or process to its role in anaerobic respiration.",
    pairs: [
      ["Lactate dehydrogenase", "Reduces pyruvate to lactate"],
      ["Pyruvate decarboxylase", "Removes CO₂ from pyruvate, forming ethanal"],
      ["Alcohol dehydrogenase", "Reduces ethanal to ethanol"],
      ["Glycolysis", "Makes a net 2 ATP per glucose"],
    ],
    explanation: "The dehydrogenases transfer hydrogen from reduced NAD; the decarboxylase releases CO₂.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "In anaerobic conditions, only {{blank:a}} makes ATP. In muscle, pyruvate is reduced to {{blank:b}}, which regenerates {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["glycolysis"], choices: ["glycolysis", "the Krebs cycle", "the link reaction"] },
      { id: "b", accepted: ["lactate"], choices: ["lactate", "ethanol", "ethanal"] },
      { id: "c", accepted: ["NAD"], choices: ["NAD", "FAD", "ATP"] },
    ],
    explanation: "Glycolysis continues because lactate formation regenerates NAD.",
  });
  b.short({
    d: 2, skill: "RECALL", applies: CAM,
    stem: "Name the tissue with large air spaces that carries oxygen to the submerged roots of rice.",
    accepted: ["aerenchyma"],
    wrong: ["parenchyma"],
    explanation: "**Aerenchyma.**",
  });

  const aer = 32, ana = 2;
  const pc = (ana / aer) * 100;
  chk(pc, 6.25);
  b.num({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: "Aerobic respiration yields about 32 ATP per glucose and anaerobic respiration 2 ATP per glucose. Calculate the anaerobic yield as a percentage of the aerobic yield, to three significant figures.",
    value: pc, sf: 3, unit: "%", wrong: [1600, 16],
    explanation: t`$\dfrac{2}{32} \times 100 = ${sfStr(pc, 3)}\%$. 1600% inverts the ratio; 16 is the ratio itself.`,
  });
  const vol = 6.3, mins = 15;
  const rate = vol / mins;
  b.num({
    d: 2, skill: "APPLICATION", calculator: true, applies: ZIM,
    stem: "A yeast suspension in glucose solution released 6.3 cm³ of carbon dioxide in 15 minutes. Calculate the mean rate of carbon dioxide release in cm³/min, to two significant figures.",
    value: rate, sf: 2, unit: "cm³/min", wrong: [sfStr(mins / vol, 2)],
    explanation: t`$6.3 \div 15 = ${sfStr(rate, 2)}\ \text{cm}^3\ \text{min}^{-1}$. Dividing time by volume inverts the rate.`,
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe ethanol fermentation in yeast, and explain why it allows ATP production to continue.",
    points: [
      "Glycolysis produces pyruvate, net 2 ATP and reduced NAD",
      "Pyruvate decarboxylated to ethanal, releasing CO₂",
      "Ethanal reduced to ethanol by reduced NAD (alcohol dehydrogenase)",
      "NAD regenerated, so it can accept hydrogen in glycolysis again and glycolysis continues to make ATP",
    ],
    modelAnswer: "Glycolysis converts glucose into two pyruvate, making a net two ATP and two reduced NAD. Each pyruvate is decarboxylated to ethanal, releasing carbon dioxide. Ethanal accepts hydrogen from reduced NAD and is reduced to ethanol by alcohol dehydrogenase. This regenerates oxidised NAD, which can accept hydrogen in glycolysis again, so glycolysis and its ATP production continue.",
    explanation: "Decarboxylation, then reduction, regenerating NAD.",
    hints: ["Two steps after glycolysis: one releases a gas."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain what happens to lactate after strenuous exercise has stopped.",
    points: [
      "Lactate diffuses into the blood and is carried to the liver",
      "In the liver lactate is oxidised back to pyruvate (NAD reduced)",
      "Pyruvate is respired aerobically (to CO₂ and water) or converted to glucose / glycogen, using extra oxygen (oxygen debt)",
    ],
    modelAnswer: "Lactate diffuses from the muscles into the blood and is carried to the liver. There it is oxidised back to pyruvate. Some pyruvate is respired aerobically to carbon dioxide and water, and most is converted into glucose and stored as glycogen; the extra oxygen needed is the oxygen debt.",
    explanation: "Lactate → liver → pyruvate → respired or made into glucose.",
    hints: ["Which organ deals with lactate?"],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4, applies: CAM,
    stem: "Explain how rice is adapted to grow with its roots submerged in water.",
    points: [
      "Aerenchyma / air spaces in stems and roots allow oxygen to diffuse from the leaves to the roots",
      "Root cells can respire anaerobically by ethanol fermentation",
      "High levels of alcohol dehydrogenase / tolerance of ethanol, so ethanol does not reach toxic levels",
      "Stems grow rapidly when flooded so leaves stay above the water for gas exchange",
    ],
    modelAnswer: "Rice has aerenchyma, tissue with large air spaces running through stems and roots, so oxygen diffuses from the leaves down to the roots. When oxygen is still short, root cells respire anaerobically by ethanol fermentation. They have high levels of alcohol dehydrogenase and tolerate ethanol, so it does not build up to toxic concentrations. When flooded, the stems grow quickly so that the leaves stay above the water surface and can exchange gases with the air.",
    explanation: "Oxygen supply, tolerance of fermentation and staying above water.",
    hints: ["Think of oxygen supply, coping without oxygen and reaching the air."],
  });

  // Practice structured: yeast and sugars (ZIMSEC detail)
  const sugars = ["Glucose", "Sucrose", "Maltose", "Lactose"];
  const reps = [[11.6, 12.2, 11.9], [10.2, 10.6, 10.4], [7.2, 6.6, 6.9], [0.3, 0.1, 0.4]];
  const mSuc = mean(reps[1]);
  chk(mSuc, 10.4);
  const rMal = mean(reps[2]) / 15;
  b.struct({
    d: 4, skill: "ANALYSIS", applies: ZIM, calculator: true,
    stem: `Nyasha mixed 5 cm³ of the same yeast suspension with 10 cm³ of a 5% solution of each of four sugars at 30 °C, covered each mixture with a layer of oil and collected the gas released in 15 minutes, three times for each sugar.\n\n${table(["Sugar", "Volume 1 / cm³", "Volume 2 / cm³", "Volume 3 / cm³"], sugars.map((s, i) => [s, ...reps[i].map((x) => x.toFixed(1))]))}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the mean volume of gas for sucrose, in cm³.", value: mSuc, dp: 1, unit: "cm³", wrong: [31.2], explanation: t`$(10.2 + 10.6 + 10.4) \div 3 = ${dpStr(mSuc, 1)}$ cm³.` }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the mean rate of gas release for maltose in cm³/min, to two decimal places.", value: rMal, dp: 2, unit: "cm³/min", wrong: [6.9], explanation: t`Mean $= 6.9$ cm³; $6.9 \div 15 = ${dpStr(rMal, 2)}$ cm³ min⁻¹.` }),
      P.short({ label: "(c)", marks: 1, stem: "Name the gas collected.", accepted: ["carbon dioxide", "CO2", "CO₂"], wrong: ["oxygen"], explanation: "**Carbon dioxide**, from the decarboxylation of pyruvate." }),
      P.manual({
        label: "(d)", marks: 1, stem: "Explain the purpose of the layer of oil.",
        points: ["Stops oxygen from the air dissolving in the mixture, keeping conditions anaerobic"],
        modelAnswer: "The oil stops oxygen from the air dissolving in the mixture, so the yeast respires anaerobically.",
      }),
      P.manual({
        label: "(e)", marks: 3, stem: "Explain the differences between the results for glucose, maltose and lactose.",
        points: ["Glucose fastest because it enters glycolysis directly", "Maltose slower because it must first be hydrolysed to glucose (by maltase)", "Lactose almost no gas because yeast has no enzyme to hydrolyse it (lactase), so it cannot enter glycolysis"],
        modelAnswer: "Glucose gives the most gas because it enters glycolysis directly. Maltose gives less because it must first be hydrolysed into glucose by maltase. Lactose gives almost none because the yeast has no enzyme to hydrolyse it, so it cannot enter glycolysis.",
      }),
      P.manual({
        label: "(f)", marks: 1, stem: "State one variable, other than temperature, that Nyasha standardised.",
        points: ["Volume or concentration of sugar solution / volume of yeast suspension / time of collection (15 min)"],
        modelAnswer: "The concentration of each sugar solution (5%).",
      }),
    ],
    explanation: "Means and rates from replicates; enzymes decide which sugars yeast can ferment.",
    hints: ["Rate = volume ÷ time.", "Which sugars need hydrolysing first?"],
  });

  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "The concentration of lactate in the blood of an athlete was measured before, during and after a hard run.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which tissue produces most of the lactate during the run?",
        options: [["Skeletal muscle", "Correct: working muscles outpace their oxygen supply."], ["Liver", "The liver removes lactate."], ["Lung tissue", "Lungs are well supplied with oxygen."], ["Red blood cells", "They make some lactate, but far less than working muscle."]],
        answer: "A", explanation: "Skeletal muscle short of oxygen.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Explain why lactate is produced during the run.",
        points: ["Oxygen supply to muscles is less than needed for aerobic respiration", "Oxidative phosphorylation cannot regenerate enough NAD", "Pyruvate is reduced to lactate to regenerate NAD so glycolysis continues to make ATP"],
        modelAnswer: "During a hard run, the muscles need more oxygen than can be supplied, so oxidative phosphorylation cannot regenerate enough NAD. Pyruvate accepts hydrogen from reduced NAD and becomes lactate, which regenerates NAD so that glycolysis can continue to make ATP.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Suggest why the blood lactate concentration takes some time to return to its resting value after the run.",
        points: ["Lactate must be carried to the liver and oxidised / converted to glucose, which takes time", "Needs extra oxygen (oxygen debt) supplied by continued deep breathing"],
        modelAnswer: "Lactate has to be carried to the liver and oxidised to pyruvate or converted to glucose, which takes time and needs extra oxygen, supplied by deep breathing after the run.",
      }),
    ],
    explanation: "Lactate rises when oxygen supply is short and is cleared by the liver afterwards.",
    hints: ["Why does pyruvate need to accept hydrogen?"],
  });

  b.card("DEFINITION", "Define **anaerobic respiration**.", "Release of energy from glucose without oxygen; only glycolysis makes ATP; pyruvate converted to lactate or ethanol to regenerate NAD.");
  b.card("FORMULA", "Lactate fermentation", "Pyruvate + reduced NAD → lactate + NAD (lactate dehydrogenase).");
  b.card("FORMULA", "Ethanol fermentation", "Pyruvate → ethanal + CO₂; ethanal + reduced NAD → ethanol + NAD.");
  b.card("CONCEPT", "Why regenerate NAD?", "Glycolysis needs oxidised NAD to accept hydrogen from triose phosphate; without it glycolysis and ATP production stop.");
  b.card("DEFINITION", "Define **oxygen debt**.", "Extra oxygen taken in after exercise to oxidise lactate (in the liver) and restore ATP and oxygen stores.");
  b.card("CONCEPT", "Why is the anaerobic yield small?", "Only glycolysis makes ATP (net 2); most energy stays in lactate or ethanol.");
  b.card("FACT", "Rice adaptations to flooding", "Aerenchyma; ethanol tolerance (high alcohol dehydrogenase); rapid stem growth to keep leaves above water.", undefined, { applies: CAM });
  b.card("FACT", "Uses of yeast fermentation", "Baking: CO₂ makes dough rise. Brewing: sugars from malted grain fermented to ethanol.");
});
