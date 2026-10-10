// W2b: fertilisation and the placenta (ZIMSEC only).
import { concept, P, t, chk, table, dpStr, ZIM } from "../lib.mjs";

concept("abio.reproduction.fertilisation-placenta", { file: "reproduction/fertilisation-placenta", keyPrefix: "reproduction.fertilisation-placenta", applies: ZIM }, (b) => {
  const calc = (o) => b.calc({ ...o, workedSolution: o.workedSolution ?? o.explanation });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Where in the female reproductive system does fertilisation normally take place?",
    options: [
      ["Oviduct", "Correct: usually within a day of ovulation."],
      ["Uterus, in the thickened endometrium", "The embryo implants in the uterus; fertilisation is earlier, in the oviduct."],
      ["Ovary", "The oocyte has left the ovary at ovulation."],
      ["Cervix", "Sperm pass through the cervix; fertilisation happens further up."],
    ],
    answer: "A",
    explanation: "Fertilisation normally happens in the **oviduct** (fallopian tube).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the function of the enzymes released in the acrosome reaction?",
    options: [
      ["To digest a path through the zona pellucida", "Correct: proteases from the acrosome."],
      ["To harden the zona pellucida so other sperm cannot enter", "This is the cortical reaction, by the oocyte."],
      ["To provide energy for the sperm's tail", "Energy comes from ATP made in the mitochondria of the midpiece."],
      ["To fuse the sperm and oocyte nuclei", "Nuclei fuse later; enzymes do not do this."],
    ],
    answer: "A",
    explanation: "The acrosome releases hydrolytic enzymes that **digest the zona pellucida**.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which blood vessel carries oxygenated blood from the placenta to the fetus?",
    options: [
      ["Umbilical vein", "Correct: one vein carries blood towards the fetal heart."],
      ["Umbilical artery", "The two umbilical arteries carry deoxygenated blood to the placenta."],
      ["Uterine artery", "This is a maternal vessel bringing blood to the placenta."],
      ["Pulmonary vein, which returns oxygenated blood from the lungs", "Fetal lungs are not used for gas exchange."],
    ],
    answer: "A",
    explanation: "The **umbilical vein** carries oxygenated, nutrient-rich blood to the fetus.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is the cortical reaction important?",
    options: [
      ["It prevents polyspermy, so the zygote is diploid", "Correct: only one sperm nucleus can enter."],
      ["It allows the sperm to swim faster through the oviduct", "The cortical reaction happens in the oocyte after entry."],
      ["It digests the corona radiata", "Enzymes on the sperm do this."],
      ["It triggers ovulation, the release of the oocyte from the Graafian follicle", "Ovulation is triggered by LH, before fertilisation."],
    ],
    answer: "A",
    explanation: "Cortical granule contents harden the zona pellucida, preventing **polyspermy**, which would give extra sets of chromosomes.",
    hints: ["What would happen if two sperm nuclei entered?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Why does fetal haemoglobin have a higher affinity for oxygen than adult haemoglobin?",
    options: [
      ["So it can load oxygen where maternal haemoglobin unloads it", "Correct: oxygen passes from mother to fetus."],
      ["So it can release oxygen in the fetal lungs", "The fetal lungs are not used for gas exchange."],
      ["So it can carry carbon dioxide to the mother", "Affinity for oxygen is the point here."],
      ["Because fetal blood mixes with maternal blood in the placenta and must compete for oxygen", "The bloods never mix."],
    ],
    answer: "A",
    explanation: "Its dissociation curve is to the **left**: at the placenta's low partial pressure fetal haemoglobin loads while maternal haemoglobin unloads.",
    hints: ["Compare the two curves at low partial pressure."],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "How do maternal antibodies reach the fetus?",
    options: [
      ["By endocytosis into placental cells, then release into fetal blood", "Correct: IgG is transported across the placenta."],
      ["Maternal blood flows directly into the fetal capillaries", "The bloods never mix."],
      ["They diffuse freely across the placenta because antibodies are small, lipid-soluble molecules", "Antibodies are large proteins; they need endocytosis."],
      ["They are made by the placenta itself", "The antibodies are made by the mother's plasma cells."],
    ],
    answer: "A",
    explanation: "IgG antibodies cross by **endocytosis** (pinocytosis) and exocytosis, giving natural passive immunity.",
    hints: ["Antibodies are large proteins."],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A woman's corpus luteum is removed at 16 weeks of pregnancy, and the pregnancy continues normally. What is the best explanation?",
    options: [
      ["The placenta now secretes enough progesterone itself", "Correct: the placenta takes over from about the third month."],
      ["The endometrium no longer needs any hormones after implantation", "Progesterone is needed throughout pregnancy."],
      ["hCG from the placenta maintains the endometrium directly, without needing any progesterone", "hCG acts on the corpus luteum, not directly on the endometrium."],
      ["The fetus secretes FSH, which maintains the pregnancy", "FSH does not maintain the endometrium."],
    ],
    answer: "A",
    explanation: "From about the third month the **placenta** secretes progesterone and oestrogen, so the corpus luteum is no longer needed.",
    hints: ["Which organ makes progesterone later in pregnancy?"],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is it an advantage that maternal and fetal blood do not mix?",
    options: [
      ["Fetal vessels are protected from high maternal blood pressure", "Correct: delicate fetal vessels are protected."],
      ["It allows the fetus to receive red blood cells from the mother to carry more oxygen", "Red blood cells do not cross."],
      ["It allows all maternal antibodies to be blocked", "IgG antibodies do cross, which is useful."],
      ["It allows oxygen to pass without diffusion", "Oxygen still crosses by diffusion."],
    ],
    answer: "A",
    explanation: "Separation protects fetal vessels from high maternal pressure and prevents reactions between different blood groups.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The secondary oocyte completes meiosis II only after a sperm enters it.",
    answer: true,
    explanation: "True. A second polar body is formed, then the nuclei fuse.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Alcohol drunk by a pregnant woman cannot reach the fetus because the placenta blocks it.",
    answer: false,
    explanation: "False. Alcohol crosses the placenta freely and can cause fetal alcohol syndrome.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each substance with the way it crosses the placenta.",
    pairs: [
      ["Oxygen", "Diffusion from mother to fetus"],
      ["Urea", "Diffusion from fetus to mother"],
      ["Amino acids", "Active transport from mother to fetus"],
      ["IgG antibodies", "Endocytosis from mother to fetus"],
      ["Glucose", "Facilitated diffusion from mother to fetus"],
    ],
    explanation: "Different substances cross by different mechanisms.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "Sperm must undergo {{blank:a}} in the female tract before they can fertilise. When a sperm binds to the zona pellucida, the {{blank:b}} reaction occurs. After a sperm enters, the {{blank:c}} reaction prevents polyspermy.",
    blanks: [
      { id: "a", accepted: ["capacitation"], choices: ["capacitation", "ovulation", "implantation"] },
      { id: "b", accepted: ["acrosome"], choices: ["acrosome", "cortical", "light-dependent"] },
      { id: "c", accepted: ["cortical"], choices: ["cortical", "acrosome", "inflammatory"] },
    ],
    explanation: "Capacitation, acrosome reaction, cortical reaction.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the finger-like projections of fetal tissue that give the placenta a large surface area.",
    accepted: ["chorionic villi", "villi", "chorionic villus", "placental villi"],
    wrong: ["microvilli", "alveoli"],
    explanation: "**Chorionic villi**, containing fetal capillaries, project into maternal blood spaces.",
  });

  const start = 40;
  const days = 6;
  const conc = start * 2 ** (days / 2);
  chk(conc, 320);
  b.num({
    d: 3, skill: "APPLICATION", daily: true, calculator: true,
    stem: "In early pregnancy, hCG concentration in the blood roughly doubles every 2 days. If the concentration is 40 units now, estimate the concentration after 6 days.",
    value: conc,
    wrong: [start * 6, start * 2],
    explanation: t`6 days = 3 doublings. $40 \times 2^3 = ${conc}$ units. Multiplying by 6 or adding linearly ignores doubling.`,
    hints: ["How many doubling periods are there in 6 days?"],
  });

  const po2 = [1, 3, 5, 7, 9];
  const ad = [8, 38, 70, 86, 93];
  const fe = [18, 60, 85, 93, 96];
  const diff = fe[1] - ad[1];
  chk(diff, 22);
  calc({
    d: 3, skill: "ANALYSIS",
    stem: `Illustrative oxygen saturation data for adult and fetal haemoglobin:\n\n${table(["Partial pressure of oxygen / kPa", ...po2.map(String)], [["Adult haemoglobin saturation / %", ...ad.map(String)], ["Fetal haemoglobin saturation / %", ...fe.map(String)]])}\n\nThe partial pressure of oxygen in the placenta is about 3 kPa. Calculate the difference in percentage saturation between fetal and adult haemoglobin at this partial pressure, and explain its significance.`,
    value: diff,
    wrong: [fe[1], ad[1]],
    explanation: t`1. At 3 kPa: fetal 60%, adult 38%.
2. Difference $= 60 - 38 = ${diff}$ percentage points.
3. At this low partial pressure maternal haemoglobin has unloaded much of its oxygen, while fetal haemoglobin is still ${fe[1]}% saturated, so oxygen moves from maternal to fetal blood.`,
    hints: ["Read both values in the 3 kPa column."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 5,
    stem: "Describe the events of fertilisation, from the arrival of a capacitated sperm at the secondary oocyte to the formation of the zygote.",
    points: [
      "Sperm passes between the follicle cells of the corona radiata",
      "Sperm binds to the zona pellucida; acrosome reaction releases (hydrolytic) enzymes that digest a path",
      "Sperm and oocyte membranes fuse; sperm nucleus enters",
      "Cortical reaction: cortical granules release contents, zona pellucida hardens, preventing polyspermy",
      "Oocyte completes meiosis II (second polar body); sperm and ovum nuclei fuse to form a diploid zygote",
    ],
    modelAnswer: "The capacitated sperm pushes between the follicle cells of the corona radiata and binds to receptors in the zona pellucida. The acrosome releases hydrolytic enzymes by exocytosis, digesting a path through the zona. The membranes of sperm and oocyte fuse and the sperm nucleus enters. This triggers the cortical reaction: cortical granules release enzymes that harden the zona pellucida, preventing other sperm entering. The secondary oocyte completes meiosis II, forming a second polar body, and the haploid nuclei fuse to form a diploid zygote.",
    explanation: "Corona → acrosome reaction → fusion → cortical reaction → meiosis II → nuclear fusion.",
    hints: ["Work from the outside of the oocyte inwards."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how the structure of the placenta is adapted for efficient exchange.",
    points: [
      "Many highly branched chorionic villi give a large surface area",
      "Only a few thin layers of cells between fetal and maternal blood, so a short diffusion distance",
      "Continuous flow of maternal blood in the spaces and fetal blood in the villi maintains steep concentration gradients",
      "Carrier proteins and many mitochondria in the villus cells allow facilitated diffusion and active transport (of glucose / amino acids / ions)",
    ],
    modelAnswer: "The highly branched chorionic villi provide a very large surface area. Fetal and maternal blood are separated by only a few thin layers of cells, so the diffusion distance is short. Maternal blood flows continuously through the blood spaces and fetal blood through the villus capillaries, keeping concentration gradients steep. The villus cells have carrier proteins and many mitochondria for facilitated diffusion and active transport of glucose, amino acids and ions.",
    explanation: "Surface area, distance, gradient, transport proteins.",
    hints: ["Think about the factors that affect the rate of diffusion."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "The placenta is sometimes described as a barrier that protects the fetus. Discuss how far this description is accurate.",
    points: [
      "It prevents maternal blood cells / most bacteria / many large molecules reaching the fetus, and keeps the blood pressures separate",
      "But small or lipid-soluble substances cross, e.g. alcohol, nicotine, carbon monoxide, many drugs",
      "Some pathogens cross, e.g. rubella virus, syphilis bacterium, Plasmodium; HIV can be transmitted (more often at birth / breastfeeding)",
      "It allows useful large molecules (IgG antibodies) across, so it is selective rather than a complete barrier",
    ],
    modelAnswer: "The placenta keeps maternal blood cells, most bacteria and many large molecules out of the fetal blood, and protects fetal vessels from the mother's blood pressure. However, it is not a complete barrier: alcohol, nicotine, carbon monoxide and many drugs cross, as do some pathogens such as rubella virus, the syphilis bacterium and Plasmodium, and HIV can be transmitted. It also lets maternal IgG antibodies through deliberately. It is better described as a selective, partial barrier.",
    explanation: "Give examples of what is stopped and what crosses, then conclude.",
    hints: ["List what crosses and what does not."],
  });

  b.struct({
    d: 4, skill: "APPLICATION",
    stem: "Rudo is 10 weeks pregnant. At her first antenatal visit in Harare she has blood tests for HIV and syphilis, and the nurse advises her not to smoke or drink alcohol.",
    parts: [
      P.short({
        label: "(a)", marks: 1, stem: "Name the hormone that a pregnancy test detected in her urine.",
        accepted: ["hCG", "human chorionic gonadotrophin", "human chorionic gonadotropin"],
        wrong: ["progesterone"],
        explanation: "**hCG**, made by the trophoblast and placenta.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Explain the role of this hormone in early pregnancy.",
        points: ["hCG maintains the corpus luteum (prevents it degenerating)", "So progesterone stays high, the endometrium is maintained and menstruation does not occur"],
        modelAnswer: "hCG keeps the corpus luteum active, so it continues to secrete progesterone, which maintains the endometrium and prevents menstruation.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why she is advised not to smoke.",
        points: ["Carbon monoxide crosses the placenta / combines with haemoglobin, reducing oxygen supply to the fetus", "Nicotine crosses and causes vasoconstriction / reduced blood flow, so fetal growth is reduced (low birth mass)"],
        modelAnswer: "Carbon monoxide and nicotine cross the placenta: carbon monoxide reduces the oxygen carried by haemoglobin and nicotine narrows blood vessels, so the fetus receives less oxygen and grows less.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Suggest why she is tested for HIV early in pregnancy.",
        points: ["HIV can be passed to the baby in pregnancy, at birth or by breastfeeding", "If positive, antiretroviral therapy can lower her viral load and greatly reduce transmission"],
        modelAnswer: "HIV can pass to the baby during pregnancy, birth or breastfeeding; finding it early means antiretroviral therapy can lower her viral load and prevent most transmission.",
      }),
      P.tf({
        label: "(e)", stem: "True or false: at 10 weeks, the corpus luteum is still important for maintaining her pregnancy.",
        answer: true,
        explanation: "True. The placenta takes over progesterone production from about the third month (around 12 weeks).",
      }),
    ],
    explanation: "hCG maintains the corpus luteum; smoking and infections can affect the fetus across the placenta.",
    hints: ["What does hCG act on?"],
  });

  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `Samples of blood were taken from the umbilical vein and an umbilical artery of a baby at birth (illustrative values).\n\n${table(["Measurement", "Umbilical vein", "Umbilical artery"], [["Oxygen partial pressure / kPa", "4.0", "2.4"], ["Carbon dioxide partial pressure / kPa", "5.0", "6.6"], ["Glucose / mmol dm⁻³", "4.2", "3.6"]])}`,
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "Explain the difference in oxygen partial pressure between the two vessels.",
        points: ["The umbilical vein carries blood from the placenta, where oxygen has been taken up from maternal blood", "The umbilical artery carries blood from the fetus, whose cells have used oxygen in respiration"],
        modelAnswer: "The vein brings blood from the placenta, where it has loaded oxygen from maternal blood (4.0 kPa); the artery returns blood from the fetus after its tissues have used oxygen for respiration (2.4 kPa).",
      }),
      P.num({
        label: "(b)", marks: 1, stem: "Calculate the percentage decrease in glucose concentration from the umbilical vein to the umbilical artery, to three significant figures.",
        value: ((4.2 - 3.6) / 4.2) * 100, sf: 3, unit: "%",
        wrong: [Number(((4.2 - 3.6) / 3.6 * 100).toFixed(1))],
        explanation: t`$\dfrac{4.2 - 3.6}{4.2} \times 100 = ${dpStr(((4.2 - 3.6) / 4.2) * 100, 1)}\%$.`,
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Suggest why the carbon dioxide partial pressure is higher in the umbilical artery.",
        points: ["Fetal cells produce carbon dioxide in respiration", "The artery carries this blood to the placenta, where CO₂ diffuses into maternal blood"],
        modelAnswer: "Fetal tissues produce carbon dioxide by respiration, so blood leaving the fetus in the artery has more; it diffuses into maternal blood in the placenta.",
      }),
      P.mcq({
        label: "(d)", stem: "Glucose crosses the placenta from mother to fetus by:",
        options: [
          ["facilitated diffusion through carrier proteins", "Correct: down a concentration gradient through glucose transporters."],
          ["osmosis", "Osmosis is the movement of water."],
          ["endocytosis of whole red blood cells", "Red blood cells do not cross."],
          ["active transport against its concentration gradient, using ATP", "Glucose moves down its gradient by facilitated diffusion."],
        ],
        answer: "A",
        explanation: "Glucose moves down its gradient through carrier proteins: **facilitated diffusion**.",
      }),
    ],
    explanation: "The vein brings oxygen and nutrients to the fetus; the arteries return deoxygenated blood with CO₂.",
    hints: ["Which vessel carries blood towards the fetus?"],
    calculator: true,
  });

  b.card("FACT", "Where does fertilisation occur?", "In the oviduct, usually within a day of ovulation.");
  b.card("DEFINITION", "**Capacitation**", "Changes to sperm in the female tract (cholesterol and glycoproteins removed from the membrane) that allow the acrosome reaction.");
  b.card("DEFINITION", "**Acrosome reaction**", "Release of hydrolytic enzymes from the acrosome to digest a path through the zona pellucida.");
  b.card("DEFINITION", "**Cortical reaction**", "Cortical granules release enzymes that harden the zona pellucida, preventing polyspermy.");
  b.card("FACT", "Umbilical vessels", "Two umbilical arteries: deoxygenated blood to placenta. One umbilical vein: oxygenated blood to fetus.");
  b.card("CONCEPT", "Placental adaptations for exchange", "Chorionic villi (large surface area), thin barrier (short distance), blood flow on both sides (steep gradients).");
  b.card("CONCEPT", "Why does fetal haemoglobin have a higher oxygen affinity?", "To load oxygen at the low partial pressure in the placenta where maternal haemoglobin unloads.");
  b.card("FACT", "Hormones of the placenta", "hCG (maintains corpus luteum), then progesterone and oestrogen (maintain endometrium, inhibit FSH and LH).");
  b.card("FACT", "Substances that cross the placenta and can harm the fetus", "Alcohol, nicotine, carbon monoxide, many drugs; pathogens such as rubella, syphilis, *Plasmodium*, HIV.");
});
