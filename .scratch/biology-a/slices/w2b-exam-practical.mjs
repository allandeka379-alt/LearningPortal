// W2b: PLANNING (ZIMSEC Paper 4 planning / Cambridge Paper 5 question 1 style): antimicrobial effect of a plant extract.
import { concept, P, t, chk, EXAM, checkExam } from "../lib.mjs";

const A = (k) => `abio.${k}`;

concept(A("skills.planning-evaluation"), { file: "exam/w2b-practical", keyPrefix: "exam.w2b-practical" }, (b) => {
  // Proportional dilution: 4% extract from a 20% stock, final volume 10 cm³
  const stock = 20, target = 4, vol = 10;
  const vStock = (target / stock) * vol;
  chk(vStock, 2);
  // Serial dilution: three successive 1-in-2 dilutions of the 20% stock
  const serial = stock / 2 ** 3;
  chk(serial, 2.5);

  b.struct({
    d: 4, examStyle: true, skill: EXAM.PLANNING.skill, secs: EXAM.PLANNING.secs, paper: "ZIMSEC P4 / Cambridge P5",
    concepts: [A("skills.planning-evaluation")],
    stem: "Leaves of zumbani (*Lippia javanica*) are used in Zimbabwe to make a herbal tea. Nyasha wants to investigate the hypothesis: *the higher the concentration of zumbani leaf extract, the more it inhibits the growth of bacteria*. She has a 20% (mass per volume) extract made by soaking crushed leaves in sterile water and filtering it, a broth culture of a non-pathogenic bacterium (*Bacillus subtilis*), sterile nutrient agar plates, sterile paper discs 6 mm in diameter, forceps, sterile water and an incubator.",
    parts: checkExam(EXAM.PLANNING, [
      P.manual({
        label: "(a)", marks: 2, stem: "Identify the independent variable and the dependent variable, and state how the dependent variable would be measured.",
        points: [
          "Independent variable: concentration of zumbani extract (at least five concentrations, e.g. 0, 2.5, 5, 10, 20%)",
          "Dependent variable: growth of bacteria, measured as the diameter (or area) of the clear zone around each disc, in mm, with a ruler across two perpendicular diameters",
        ],
        modelAnswer: "The independent variable is the concentration of zumbani extract, using at least five concentrations such as 0, 2.5, 5, 10 and 20%. The dependent variable is bacterial growth, measured as the diameter of the clear zone around each disc in mm, taking the mean of two perpendicular diameters.",
      }),
      P.num({
        label: "(b)", marks: 1, stem: "Using proportional dilution, calculate the volume of the 20% extract needed to make 10 cm³ of a 4% extract (the rest being sterile water).",
        value: vStock, unit: "cm³", wrong: [8, 5],
        explanation: t`$\dfrac{4}{20} \times 10 = ${vStock}\ \text{cm}^3$ of extract, plus ${vol - vStock} cm³ of sterile water.`,
      }),
      P.num({
        label: "(c)", marks: 1, stem: "If Nyasha instead makes a serial dilution, diluting the 20% extract 1 in 2 three times in succession, what is the concentration of the third dilution, in %?",
        value: serial, unit: "%", wrong: [stock / 3, stock / 6],
        explanation: t`$20 \to 10 \to 5 \to ${serial}\%$: each 1-in-2 dilution halves the concentration ($20 \div 2^3$).`,
      }),
      P.manual({
        label: "(d)", marks: 4, stem: "Describe a method Nyasha could use, including how she would standardise other variables.",
        points: [
          "Spread the same volume of the bacterial culture (e.g. 0.1 cm³) evenly over each agar plate with a sterile spreader, using aseptic technique",
          "Soak discs in each extract concentration for the same time (or add the same volume to each disc) and place them on the agar with flamed forceps, spaced apart",
          "Standardise: same agar depth / volume, same culture (age and density), same disc size, plates incubated at the same temperature (about 25 °C) for the same time (e.g. 48 hours)",
          "Measure the diameter of the clear zone around each disc after incubation; at least three replicate discs (or plates) per concentration",
        ],
        modelAnswer: "Using aseptic technique, spread 0.1 cm³ of the same broth culture evenly over each plate with a sterile spreader. Soak sterile discs for 5 minutes in each concentration and place them with flamed forceps on the agar, well apart, labelling the base. Use plates with the same volume of agar, the same culture, discs of the same size and the same soaking time; incubate all plates upside down at 25 °C for 48 hours. Measure the diameter of the clear zone around each disc and use at least three replicate discs for each concentration.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Describe two controls Nyasha should include and explain the purpose of each.",
        points: [
          "Disc soaked in sterile water only (0% extract): shows that any clear zone is caused by the extract, not the disc or handling",
          "Disc with a known antibiotic (positive control): shows that the bacteria can be inhibited / the method can detect inhibition",
        ],
        modelAnswer: "A disc soaked only in sterile water shows that the clear zones are due to the extract and not to the disc or handling. A disc with a known antibiotic acts as a positive control, showing that the method can detect inhibition of these bacteria.",
      }),
      P.manual({
        label: "(f)", marks: 3, stem: "Identify the main hazards in this investigation and describe how the risks would be reduced. State the overall level of risk.",
        points: [
          "Hazard: culturing bacteria (contamination or growth of pathogens); use a non-pathogenic strain, aseptic technique, tape lids and never open plates after incubation",
          "Incubate at 25-30 °C, not 37 °C, to avoid encouraging human pathogens; disinfect benches, wash hands; plates sterilised (autoclaved) before disposal",
          "Flames / ethanol for flaming forceps are a fire hazard: keep ethanol away from the flame; wear eye protection. Overall risk: low (or medium) with these precautions",
        ],
        modelAnswer: "The main hazard is from the bacteria: a non-pathogenic strain is used with aseptic technique, plate lids are taped and never opened after incubation, plates are incubated at 25 °C rather than 37 °C so human pathogens are not encouraged, benches are disinfected, hands washed and plates autoclaved before disposal. Ethanol used to flame forceps is flammable, so it is kept away from the Bunsen flame, and eye protection is worn. With these precautions the risk is low.",
      }),
      P.manual({
        label: "(g)", marks: 2, stem: "Explain how Nyasha should process her results and judge whether they support the hypothesis.",
        points: [
          "Calculate the mean clear-zone diameter (or area, πr²) for each concentration and plot mean against concentration, with error bars (standard deviation or 95% confidence intervals) or range",
          "Support if the zone increases with concentration and error bars / confidence intervals do not overlap (or a statistical test such as a t-test or Spearman's rank shows a significant result)",
        ],
        modelAnswer: "She should calculate the mean clear-zone diameter for each concentration and plot it against concentration with standard deviation error bars. The hypothesis is supported if the zone increases with concentration and the error bars of different concentrations do not overlap, or if a Spearman's rank correlation is significant at p = 0.05.",
      }),
    ]),
    explanation: "A disc-diffusion plan with a dilution series, controls, replicates, aseptic technique and a clear method of analysis.",
    hints: ["Think about what must stay the same for every disc.", "Proportional dilution: volume of stock = (target ÷ stock) × final volume."],
    calculator: true,
  });
});
