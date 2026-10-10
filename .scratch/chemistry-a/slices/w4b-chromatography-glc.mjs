// W4b: achem.analysis.chromatography-glc (both boards; ZIMSEC Form 6, Cambridge A Level only; HPLC is ZIMSEC detail)
import { concept, P, t, ce, ZIM, glcPercent, sfStr, dpStr } from "../lib.mjs";

concept("achem.analysis.chromatography-glc", { file: "analysis/chromatography-glc", keyPrefix: "analysis.chromatography-glc" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the mobile phase in gas-liquid chromatography?",
    options: [
      ["an unreactive carrier gas such as nitrogen", "Correct: the gas carries the vaporised sample through the column."],
      ["a high-boiling liquid coated on a solid support", "That is the stationary phase."],
      ["a polar solvent pumped at high pressure", "A pumped liquid is the mobile phase in HPLC, not GLC."],
      ["the vaporised sample being analysed", "The sample is carried by the mobile phase; it is not the mobile phase."],
    ],
    answer: "A",
    explanation: "GLC: mobile phase = carrier gas (N₂, He or Ar); stationary phase = high-boiling liquid on a support.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The oven temperature of a gas chromatograph is raised from 80 °C to 120 °C, with everything else unchanged. What happens to the retention times?",
    options: [
      ["They all decrease.", "Correct: components become more volatile and spend less time in the stationary liquid."],
      ["They all increase.", "Higher temperature favours the gas phase, so components move through faster."],
      ["They stay the same, because the column is unchanged.", "Retention time depends strongly on temperature."],
      ["Only the polar components change.", "Temperature affects every component's volatility."],
    ],
    answer: "A",
    explanation: "Raising the column temperature shortens all retention times (and can reduce separation).",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A mixture of four alcohols is separated on a non-polar GLC column. Which alcohol has the shortest retention time?",
    options: [
      ["methanol (b.p. 65 °C)", "Correct: the most volatile component spends least time in the liquid phase."],
      ["ethanol (b.p. 78 °C)", "Ethanol is less volatile than methanol, so it is retained longer."],
      ["propan-1-ol (b.p. 97 °C)", "A higher boiling point gives a longer retention time."],
      ["butan-1-ol (b.p. 118 °C)", "The least volatile alcohol has the longest retention time."],
    ],
    answer: "A",
    explanation: "On a non-polar column, components emerge roughly in order of increasing boiling point.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is a gas chromatograph often connected directly to a mass spectrometer (GC-MS)?",
    options: [
      ["The mass spectrum identifies each separated component with more certainty.", "Correct: retention time alone may be shared by different substances."],
      ["The mass spectrometer provides the carrier gas for the column.", "The carrier gas comes from a cylinder; the MS is a detector."],
      ["The mass spectrometer separates components that GLC cannot vaporise.", "The MS analyses what the GC has already separated and vaporised."],
      ["It allows percentage composition to be found without peak areas.", "Peak areas are still used for quantities; the MS gives identity."],
    ],
    answer: "A",
    explanation: "GC separates; MS gives the molecular ion and fragmentation pattern for library matching.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which changes would increase the retention time of a component in GLC?\n\n1. using a longer column\n2. raising the oven temperature\n3. using a stationary liquid in which the component is more soluble",
    options: [
      ["1 and 3 only", "Correct: more column, or stronger interaction, means more time held back."],
      ["1, 2 and 3", "Statement 2 is false: a higher temperature shortens retention times."],
      ["2 and 3 only", "Statement 2 is false and statement 1 is true."],
      ["1 only", "Statement 3 is also true."],
    ],
    answer: "A",
    hints: ["What keeps a component in the liquid phase longer?"],
    explanation: "Longer columns and stronger solubility in the stationary phase increase retention time; heating reduces it.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements about gas-liquid chromatography are correct?\n\n1. The stationary phase is a high-boiling liquid held on a solid support.\n2. The carrier gas does not react with the components.\n3. The area of a peak is proportional to the amount of that component, assuming an equal detector response.",
    options: [
      ["1, 2 and 3", "Correct: all three statements are true."],
      ["1 and 2 only", "Statement 3 is also true: areas give the composition."],
      ["2 and 3 only", "Statement 1 is also true."],
      ["1 only", "Statements 2 and 3 are also true."],
    ],
    hints: ["Which feature lets you calculate percentage composition?"],
    answer: "A",
    explanation: "All three describe GLC correctly.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Two peaks on a gas chromatogram overlap. Which change is most likely to separate them?",
    options: [
      ["use a longer column at a slightly lower temperature", "Correct: more time in the column and less volatility give the components longer to separate."],
      ["use a shorter column at a higher temperature", "Both changes shorten retention times and reduce separation."],
      ["inject a larger volume of the sample", "A larger sample gives broader peaks that overlap more."],
      ["increase the carrier gas flow rate greatly", "Faster flow shortens retention times and usually worsens separation."],
    ],
    answer: "A",
    hints: ["Separation improves when components spend longer in the column."],
    explanation: "A longer column and a lower temperature increase the difference in retention times.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is HPLC, rather than GLC, used to analyse a heat-sensitive drug?",
    options: [
      ["The sample stays in solution and need not be vaporised.", "Correct: HPLC uses a pumped liquid mobile phase at moderate temperature."],
      ["HPLC uses a hotter column that vaporises the drug faster.", "HPLC avoids high temperatures; that is its advantage."],
      ["HPLC needs no stationary phase, so nothing can react.", "HPLC has a packed stationary phase of fine particles."],
      ["The carrier gas in HPLC is less reactive than in GLC.", "HPLC uses a liquid, not a gas, as the mobile phase."],
    ],
    answer: "A",
    applies: ZIM,
    explanation: "GLC needs the sample in the vapour; non-volatile or heat-sensitive substances are analysed by HPLC.",
  });
  {
    const p = glcPercent({ A: 36.4, B: 22.1, C: 11.5 });
    b.num({
      d: 2, skill: "APPLICATION", calculator: true, daily: true,
      stem: "A gas chromatogram of a three-component mixture has peak areas A 36.4, B 22.1 and C 11.5 (arbitrary units). Calculate the percentage of B in the mixture, to three significant figures.",
      value: p.B, sf: 3, unit: "%",
      wrong: [22.1],
      explanation: `Total area = 36.4 + 22.1 + 11.5 = 70.0; %B = 22.1 ÷ 70.0 × 100 = ${sfStr(p.B, 3)}%. Quoting the area itself as a percentage ignores the total.`,
    });
  }
  {
    const aX = 0.5 * 0.4 * 45;
    const aY = 0.5 * 0.9 * 12;
    const p = glcPercent({ X: aX, Y: aY });
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: "A chromatogram has two triangular peaks. Peak X: base width 0.4 min, height 45 mm. Peak Y: base width 0.9 min, height 12 mm. Estimate the percentage of X in the mixture, to three significant figures.",
      value: p.X, sf: 3, unit: "%",
      wrong: [(45 / 57) * 100],
      hints: ["Area of a triangle = ½ × base × height."],
      explanation: `1. Area X = ½ × 0.4 × 45 = ${aX}; area Y = ½ × 0.9 × 12 = ${sfStr(aY, 3)}.\n2. %X = ${aX} ÷ (${aX} + ${sfStr(aY, 3)}) × 100 = ${sfStr(p.X, 3)}%.\n3. Using heights only gives ${sfStr((45 / 57) * 100, 3)}%, too high, because peak Y is broader.`,
    });
  }
  {
    const m = (42 / 80) * 2.5;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "A 2.50 g sample of a flavouring oil gives GLC peaks of area 42.0, 28.0 and 10.0. Assuming area is proportional to mass, calculate the mass of the component with area 42.0, in g.",
      value: m, sf: 3, unit: "g",
      wrong: [42 / 100 * 2.5],
      hints: ["Find its fraction of the total area."],
      explanation: `Fraction = 42.0 ÷ 80.0 = ${sfStr(42 / 80, 3)}; mass = ${sfStr(42 / 80, 3)} × 2.50 = ${sfStr(m, 3)} g. Dividing by 100 instead of the total area (80.0) is wrong.`,
    });
  }
  {
    const p = glcPercent({ e: 9.0, rest: 41.0 });
    const kg = (p.e / 100) * 50;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: "A sample of a fuel blend is analysed by GLC. The ethanol peak has area 9.0 and the other peaks have a combined area of 41.0. Assuming peak area is proportional to mass, calculate the mass of ethanol in 50.0 kg of the fuel, in kg.",
      value: kg, sf: 3, unit: "kg",
      wrong: [(9 / 41) * 50],
      hints: ["Total area includes the ethanol peak."],
      explanation: `1. Total area = 9.0 + 41.0 = 50.0.\n2. % ethanol = 9.0 ÷ 50.0 × 100 = ${sfStr(p.e, 3)}%.\n3. Mass = ${sfStr(p.e, 3)}% of 50.0 kg = ${sfStr(kg, 3)} kg. Dividing by 41.0 instead of 50.0 gives ${sfStr((9 / 41) * 50, 3)} kg.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The tallest peak on a gas chromatogram always belongs to the component present in the greatest amount.",
    answer: false,
    explanation: "False. Amount is proportional to peak area. A tall, narrow peak can have a smaller area than a short, broad one.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A substance can be identified in GLC by comparing its retention time with that of a known sample run under the same conditions.",
    answer: true,
    explanation: "True, though identical retention times are not proof; GC-MS or a second column confirms the identity.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each change to a gas chromatograph with its effect on retention times.",
    pairs: [
      ["raise the column temperature", "all retention times decrease"],
      ["use a longer column", "all retention times increase"],
      ["increase the carrier gas flow rate", "components leave sooner"],
      ["use a polar stationary phase for a mixture of alcohols and alkanes", "alcohols are held back more than alkanes"],
    ],
    hints: ["What keeps a component in the column longer?"],
    explanation: "Temperature and flow rate shorten times; column length lengthens them; polarity matching increases retention of polar components.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the description of GLC.",
    template: "The stationary phase is a {{blank:a}} with a high boiling point, held on a solid support. The mobile phase is an unreactive {{blank:b}}. The time from injection to detection of a component is its {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["liquid"], choices: ["liquid", "gas", "solid"] },
      { id: "b", accepted: ["gas"], choices: ["gas", "liquid", "solid"] },
      { id: "c", accepted: ["retention time"], choices: ["retention time", "Rf value", "half-life"] },
    ],
    explanation: "Gas-liquid chromatography: liquid stationary phase, gas mobile phase; components identified by retention time.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name a gas used as the carrier gas in GLC.",
    accepted: ["nitrogen", "helium", "argon", "N2", "He", "Ar"],
    rejected: ["oxygen", "hydrogen chloride"],
    wrong: ["oxygen"],
    explanation: "Nitrogen, helium or argon: unreactive gases that do not react with the components.",
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 3,
    stem: "A mixture of hexane and propan-1-ol (similar boiling points) is separated on a column with a polar stationary phase. Predict which comes out first and explain why.",
    points: ["Hexane comes out first (shorter retention time)", "Propan-1-ol is polar and forms hydrogen bonds / dipole interactions with the polar stationary liquid, so it is more soluble in it", "It spends more time in the stationary phase, whereas non-polar hexane is attracted only weakly"],
    modelAnswer: "Hexane is eluted first. Propan-1-ol is polar and can hydrogen bond, so it dissolves better in, and is attracted more strongly to, the polar stationary liquid. It therefore spends more time in the stationary phase and has a longer retention time, while non-polar hexane interacts only weakly and passes through more quickly.",
    hints: ["Like dissolves like."],
    explanation: "Polarity matching increases retention.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 2,
    stem: "Explain why GLC cannot be used directly to analyse table sugar (sucrose), and name a technique that can.",
    points: ["Sucrose is not volatile / decomposes (chars) on heating, so it cannot be vaporised into the carrier gas", "HPLC (liquid mobile phase, no vaporisation needed)"],
    modelAnswer: "Sucrose decomposes before it vaporises, so it cannot be carried through a GLC column as a gas. HPLC, in which the sample stays dissolved in a liquid mobile phase, can be used instead.",
    applies: ZIM,
    hints: ["What must happen to a sample before GLC?"],
    explanation: "GLC needs volatile, thermally stable samples; HPLC does not.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "Outline how a sample is analysed by gas-liquid chromatography, from injection to chromatogram.",
    points: ["A small sample is injected into a heated port and vaporised", "An unreactive carrier gas carries it through a long column in an oven containing a high-boiling liquid stationary phase; components partition between gas and liquid", "A detector at the end records each component as a peak against time (retention time)"],
    modelAnswer: "A tiny sample is injected into a heated port where it vaporises. A carrier gas such as nitrogen sweeps it through a long, coiled column in an oven; the column contains a high-boiling liquid on a solid support, and each component partitions between the gas and the liquid. Components leave at different times and a detector records each as a peak; the time to each peak is its retention time.",
    explanation: "Injection, separation, detection.",
  });
  {
    const areas = { limonene: 0.5 * 0.5 * 64, B: 0.5 * 0.7 * 14, C: 0.5 * 0.6 * 11 };
    const p = glcPercent(areas);
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: `Oil extracted from orange peel from a citrus farm near Mutare is analysed by GLC on a non-polar column. Three peaks are recorded.\n\n| Peak | Retention time / min | Base width / min | Height / mm |\n|---|---|---|---|\n| limonene | 4.2 | 0.5 | 64 |\n| B | 5.8 | 0.7 | 14 |\n| C | 7.1 | 0.6 | 11 |`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Treating the peaks as triangles, calculate the percentage of limonene in the oil, to three significant figures.", value: p.limonene, sf: 3, unit: "%", wrong: [(64 / 89) * 100], explanation: `Areas: limonene ½ × 0.5 × 64 = ${areas.limonene}; B ½ × 0.7 × 14 = ${sfStr(areas.B, 3)}; C ½ × 0.6 × 11 = ${sfStr(areas.C, 3)}. % limonene = ${areas.limonene} ÷ ${sfStr(areas.limonene + areas.B + areas.C, 3)} × 100 = ${sfStr(p.limonene, 3)}%.` }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate the percentage of component C, to three significant figures.", value: p.C, sf: 3, unit: "%", explanation: `${sfStr(areas.C, 3)} ÷ ${sfStr(areas.limonene + areas.B + areas.C, 3)} × 100 = ${sfStr(p.C, 3)}%.` }),
        P.mcq({ label: "(c)", marks: 1, stem: "What can be deduced about C compared with limonene?", options: [
          ["C probably has a higher boiling point than limonene.", "Correct: on a non-polar column, longer retention usually means lower volatility."],
          ["C is present in a larger amount than limonene.", "Its peak area is much smaller."],
          ["C must be more polar than limonene.", "On a non-polar column the order mainly follows boiling point; polarity cannot be deduced."],
          ["C is identical to limonene but took longer to detect.", "Different retention times under the same conditions mean different substances."],
        ], answer: "A", explanation: "Longer retention on a non-polar column → less volatile." }),
        P.manual({ label: "(d)", marks: 2, stem: "Describe how the identity of the peak labelled limonene could be confirmed.", points: ["Inject pure limonene under the same conditions and check it has the same retention time (or add pure limonene to the sample and see the peak grow without a new peak)", "Use GC-MS: compare the mass spectrum of the component with a library spectrum of limonene"], modelAnswer: "Run a pure limonene standard on the same column and conditions to check that the retention time matches (or spike the sample with limonene and see that the same peak grows). For certainty, use GC-MS and compare the component's mass spectrum with a reference spectrum of limonene." }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain why using peak heights alone would give the wrong percentage composition.", points: ["The amount of each component is proportional to the peak area", "The peaks have different widths (later peaks are broader), so heights are not proportional to amounts"], modelAnswer: "The detector signal integrated over time, the peak area, is proportional to the amount of component. The peaks have different widths, so comparing heights alone overstates narrow peaks and understates broad ones." }),
      ],
      hints: ["Area = ½ × base × height.", "Retention time on a non-polar column follows boiling point."],
      explanation: `Limonene ${sfStr(p.limonene, 3)}%, B ${sfStr(p.B, 3)}%, C ${sfStr(p.C, 3)}%; C is the least volatile component; confirm with a standard or GC-MS.`,
    });
  }
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true,
    stem: "A sports laboratory screens athletes' urine samples for a banned stimulant using GC-MS.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "State the function of each part of the instrument: the gas chromatograph and the mass spectrometer.", points: ["The gas chromatograph separates the components of the sample (different retention times)", "The mass spectrometer identifies each component from its molecular ion and fragmentation pattern (compared with a library)"], modelAnswer: "The GC separates the mixture into its components, which emerge at different retention times. The MS then records a mass spectrum for each component, and its molecular ion and fragments are matched against a library to identify it." }),
      P.manual({ label: "(b)", marks: 2, stem: "Suggest why a matching retention time alone is not accepted as proof that the stimulant is present.", points: ["Different substances can have the same (or very similar) retention time under the given conditions", "A wrong positive result could unfairly penalise an athlete, so an independent identification (mass spectrum) is needed"], modelAnswer: "Other substances in urine could have the same retention time on that column, so a match is not unique. Because the consequences of a false positive are serious, the mass spectrum is used to confirm the identity independently." }),
      P.tf({ label: "(c)", marks: 1, stem: "The sample must be vaporised before it enters the GC column.", answer: true, explanation: "True: GLC separates components in the vapour phase." }),
      P.mcq({ label: "(d)", marks: 1, stem: "Which property of the stimulant would make GLC unsuitable without first changing it chemically?", options: [
        ["It decomposes below its boiling point.", "Correct: it could not be vaporised intact."],
        ["It is a non-polar molecule.", "Non-polar molecules are easily analysed by GLC."],
        ["It has a relative molecular mass of about 150.", "Molecules of this size are routinely analysed by GLC."],
        ["It contains a benzene ring.", "Many aromatic compounds are analysed by GLC."],
      ], answer: "A", explanation: "Thermally unstable compounds cannot pass through a heated GC intact." }),
      P.manual({ label: "(e)", marks: 2, stem: "Give two other uses of GLC or GC-MS.", points: ["e.g. measuring alcohol in blood or breath samples", "e.g. detecting pesticide residues or contaminants in food or water / analysing fuels, flavourings or fire debris"], modelAnswer: "Measuring the alcohol level in blood samples, and detecting pesticide residues in fruit and vegetables." }),
    ],
    hints: ["GC separates; MS identifies."],
    explanation: "GC-MS combines separation (GC) with identification (MS); retention time alone is not conclusive.",
  });
  b.card("DEFINITION", "Retention time", "Time from injection to detection of a component in GLC.");
  b.card("FACT", "GLC phases", "Mobile: unreactive carrier gas (N₂, He, Ar). Stationary: high-boiling liquid on a solid support in a heated column.");
  b.card("CONCEPT", "What increases retention time", "Higher boiling point, stronger attraction to the stationary phase, longer column; lower temperature or slower gas flow.");
  b.card("FORMULA", "Percentage composition from GLC", "% of component = peak area ÷ total area of all peaks × 100 (equal detector response assumed).");
  b.card("FACT", "Triangular peak area", "Area ≈ ½ × base width × height.");
  b.card("CONCEPT", "GC-MS", "GC separates; MS identifies each component from its mass spectrum; used in drug testing and contaminant analysis.");
  b.card("CONCEPT", "HPLC", "Liquid mobile phase pumped at high pressure through fine particles; for non-volatile or heat-sensitive substances (ZIMSEC).", undefined, { applies: ZIM });
  b.card("CONCEPT", "Order on a non-polar column", "Components elute roughly in order of increasing boiling point.");
});
