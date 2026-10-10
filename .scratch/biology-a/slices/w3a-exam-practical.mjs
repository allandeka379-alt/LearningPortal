// W3a: PLANNING (ZIMSEC Paper 4 planning / Cambridge Paper 5 question 1 style): light intensity and an aquatic plant;
// temperature and yeast respiration with methylene blue.
import { concept, P, t, chk, sfStr, dpStr, EXAM, checkExam, inverseSquare } from "../lib.mjs";

const A = (k) => `abio.${k}`;

concept(A("skills.planning-evaluation"), { file: "exam/w3a-practical", keyPrefix: "exam.w3a-practical" }, (b) => {
  // ---------------------------------------------------------------- PL1: light intensity and Cabomba
  const stock = 2, target = 0.5, final = 100;
  const vStock = (target / stock) * final;
  chk(vStock, 25);
  const rel15 = inverseSquare(15) * 1e4;
  b.struct({
    d: 4, examStyle: true, skill: EXAM.PLANNING.skill, secs: EXAM.PLANNING.secs, paper: "ZIMSEC P4 / Cambridge P5",
    concepts: [A("skills.planning-evaluation"), A("photosynthesis.limiting-factors")],
    stem: "Chipo wants to investigate the hypothesis: *the rate of photosynthesis of the pondweed* Cabomba *increases as light intensity increases*. She has healthy shoots of *Cabomba*, a 2% (mass per volume) sodium hydrogencarbonate solution, distilled water, boiling tubes, a lamp with an LED bulb, a metre rule, a glass tank of water, a thermometer, a 1 cm³ syringe connected to a capillary tube (a photosynthometer), a stopclock and a darkened room.",
    parts: checkExam(EXAM.PLANNING, [
      P.manual({
        label: "(a)", marks: 1, stem: "Make a prediction based on the hypothesis, in terms of the variables Chipo will measure.",
        points: ["As the distance of the lamp decreases (light intensity increases), the volume of gas produced per minute increases (until it levels off)"],
        modelAnswer: "The closer the lamp, and so the higher the light intensity, the greater the volume of gas collected per minute, until the rate levels off.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Identify the independent and dependent variables and state how each would be varied or measured.",
        points: ["Independent: light intensity, varied by placing the lamp at five or more distances (e.g. 10, 15, 20, 30, 40 cm) measured with a metre rule; intensity as 1/d²", "Dependent: rate of photosynthesis, as volume of gas collected in the photosynthometer per minute (length of bubble × πr²) or bubbles per minute"],
        modelAnswer: "The independent variable is light intensity, varied by placing the lamp at 10, 15, 20, 30 and 40 cm, measured to the centre of the shoot, and expressed as 1/d². The dependent variable is the rate of photosynthesis, measured as the volume of gas collected in the photosynthometer per minute.",
      }),
      P.num({
        label: "(c)", marks: 1, stem: "Using proportional dilution, calculate the volume of 2% sodium hydrogencarbonate solution needed to make 100 cm³ of a 0.5% solution.",
        value: vStock, unit: "cm³", wrong: [400, 75],
        explanation: t`$\dfrac{0.5}{2} \times 100 = ${vStock}$ cm³ of stock, made up to 100 cm³ with ${final - vStock} cm³ of distilled water.`,
      }),
      P.num({
        label: "(d)", marks: 1, stem: "Calculate the relative light intensity, 10 000/d², at 15 cm, to three significant figures.",
        value: rel15, sf: 3, wrong: [sfStr(10000 / 15, 3)],
        explanation: t`$10\,000 \div 225 = ${sfStr(rel15, 3)}$.`,
      }),
      P.manual({
        label: "(e)", marks: 4, stem: "Describe a method Chipo could use.",
        points: [
          "Cut a shoot of the same length (e.g. 8 cm) under water, place it cut end up in a boiling tube of 0.5% hydrogencarbonate solution, attached to the photosynthometer",
          "Glass tank of water between lamp and tube as a heat filter; darkened room so the lamp is the only light source",
          "Leave for 5 minutes at each distance to equilibrate, then collect gas for a fixed time (e.g. 5 minutes) and measure the length of the bubble",
          "Repeat three times at each distance (and the whole sequence with fresh shoots) and calculate the mean volume per minute",
        ],
        modelAnswer: "Cut an 8 cm shoot under water and place it, cut end uppermost, in a boiling tube of 0.5% sodium hydrogencarbonate solution, with the photosynthometer capillary over the cut end. Put a glass tank of water between the lamp and the tube and work in a darkened room. Place the lamp at 40 cm, leave for 5 minutes, then collect gas for 5 minutes, draw it into the capillary and measure the bubble length. Repeat three times, then move the lamp to each of the other distances. Calculate volume as πr²l and the mean rate per minute.",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "State how Chipo would control two other variables, and describe a suitable control.",
        points: ["Temperature kept constant by the heat filter / LED lamp, checked with a thermometer in the tube; CO₂ by using the same 0.5% hydrogencarbonate (replaced regularly); same shoot / same length", "Control: a tube with the shoot in darkness (or lamp off / covered in foil) to show that gas production depends on light (or a tube with a boiled shoot)"],
        modelAnswer: "The temperature is kept constant by the heat filter and LED lamp and checked with a thermometer, and the CO₂ supply by using the same 0.5% hydrogencarbonate solution. A control tube wrapped in foil shows that gas is produced only in the light.",
      }),
      P.manual({
        label: "(g)", marks: 2, stem: "Identify one hazard and how the risk would be reduced, and state the overall level of risk.",
        points: ["Electricity and water near each other: keep lamp and cables away from water, dry hands, do not touch the lamp; or glass tubes / capillary may break: handle with care", "Overall risk: low (with precautions); wash hands after handling pond plants"],
        modelAnswer: "Water near the electric lamp is a hazard, so the lamp and cables are kept dry and away from the tank, and hands are dried before touching switches. Hands are washed after handling the plants. With these precautions the risk is low.",
      }),
      P.manual({
        label: "(h)", marks: 2, stem: "Explain how Chipo should process her results to decide whether they support the hypothesis.",
        points: ["Calculate mean rate (volume per minute) at each distance and plot it against 1/d² (light intensity) with error bars (range or standard deviation)", "Hypothesis supported if rate increases with light intensity and error bars do not overlap (or a Spearman's rank test gives a significant positive correlation)"],
        modelAnswer: "She should calculate the mean volume of gas per minute at each distance and plot it against 1/d², with standard deviation error bars. The hypothesis is supported if the rate increases with light intensity and the error bars of different intensities do not overlap, or if Spearman's rank correlation is significantly positive.",
      }),
    ]),
    explanation: "A planning answer needs a measured dependent variable, at least five values of the independent variable, controlled variables, a control, replicates, a risk assessment and a method of analysis.",
    hints: ["Light intensity ∝ 1/d².", "Proportional dilution: volume of stock = (target ÷ stock) × final volume."],
    calculator: true,
  });

  // ---------------------------------------------------------------- PL2: temperature and yeast respiration (methylene blue)
  const g10 = 10, g2 = 2, vol = 20;
  const vGlu = (g2 / g10) * vol;
  chk(vGlu, 4);
  const tBlue = 125;
  const r = 1000 / tBlue;
  chk(r, 8);
  b.struct({
    d: 4, examStyle: true, skill: EXAM.PLANNING.skill, secs: EXAM.PLANNING.secs, paper: "ZIMSEC P4 / Cambridge P5",
    concepts: [A("skills.planning-evaluation"), A("respiration.substrates-rq")],
    stem: "Nyasha wants to investigate how temperature affects the rate of respiration of yeast. Methylene blue is a blue dye that becomes colourless when it accepts hydrogen from dehydrogenase enzymes. She has a suspension of dried baker's yeast, a 10% glucose solution, 0.05% methylene blue solution, distilled water, test tubes, syringes, water baths that can be set from 10 °C to 60 °C, a thermometer, a stopclock and a white tile.",
    parts: checkExam(EXAM.PLANNING, [
      P.manual({
        label: "(a)", marks: 2, stem: "State a hypothesis and explain why temperature is expected to affect the rate of decolourisation.",
        points: ["Hypothesis: the rate of respiration increases with temperature up to an optimum, then decreases", "Explanation: more kinetic energy, more enzyme-substrate complexes in dehydrogenases; above the optimum enzymes denature"],
        modelAnswer: "The rate of respiration of yeast increases with temperature up to an optimum and then falls. Higher temperatures give the dehydrogenase enzymes and substrates more kinetic energy, so more enzyme-substrate complexes form and hydrogen is passed to methylene blue faster; above the optimum the enzymes denature.",
      }),
      P.num({
        label: "(b)", marks: 1, stem: "Nyasha wants 20 cm³ of 2% glucose solution. Calculate the volume of 10% glucose solution she needs, using proportional dilution.",
        value: vGlu, unit: "cm³", wrong: [16, 100],
        explanation: t`$\dfrac{2}{10} \times 20 = ${vGlu}$ cm³ of 10% glucose plus ${vol - vGlu} cm³ of distilled water.`,
      }),
      P.num({
        label: "(c)", marks: 1, stem: "At one temperature the blue colour disappeared after 125 s. Calculate the rate of decolourisation as 1000/time, in s⁻¹.",
        value: r, unit: "s⁻¹", wrong: [0.008, 125000],
        explanation: t`$1000 \div 125 = ${r}$ s⁻¹.`,
      }),
      P.manual({
        label: "(d)", marks: 4, stem: "Describe a method Nyasha could use.",
        points: [
          "At least five temperatures (e.g. 20, 30, 40, 50, 60 °C) in water baths; check with a thermometer",
          "Put the same volume of yeast suspension (e.g. 5 cm³) and of 2% glucose (e.g. 5 cm³) into a tube, and equilibrate for 5 minutes in the water bath (methylene blue in a separate tube also equilibrated)",
          "Add the same volume of methylene blue (e.g. 1 cm³), mix once by gently inverting, start the stopclock and do not shake again",
          "Record the time for the blue colour to disappear, judged against a white tile / colour standard; three repeats at each temperature; rate = 1000/time",
        ],
        modelAnswer: "Set up water baths at 20, 30, 40, 50 and 60 °C, checking each with a thermometer. Put 5 cm³ of yeast suspension and 5 cm³ of 2% glucose into a test tube and leave it, and a tube of methylene blue, in the water bath for 5 minutes. Add 1 cm³ of methylene blue, mix once by inverting gently, start the stopclock and leave the tube undisturbed. Record the time for the blue colour to disappear, comparing against a white tile and a colour standard. Repeat three times at each temperature and calculate rate as 1000/time.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Describe two controls or controlled variables, and explain why each is needed.",
        points: ["Control: tube with boiled (denatured) yeast or no yeast at each temperature, to show that decolourisation is due to living yeast enzymes, not temperature alone", "Controlled: same concentration and volume of glucose, yeast and methylene blue, and do not shake (oxygen would re-oxidise the dye) / same yeast suspension stirred before use"],
        modelAnswer: "A tube with boiled yeast at each temperature shows that the colour change is caused by active yeast enzymes and not by heat alone. The volumes and concentrations of yeast, glucose and methylene blue are kept the same, and tubes are not shaken, because oxygen would re-oxidise the dye.",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "Identify two hazards and how the risks would be reduced. State the overall level of risk.",
        points: ["Hot water baths (up to 60 °C) can scald: use tongs / test-tube holders, keep away from the edge", "Methylene blue stains skin and clothing / is an irritant: wear gloves, eye protection and a lab coat; overall risk low"],
        modelAnswer: "Water at 60 °C can scald, so tubes are handled with tongs. Methylene blue stains and can irritate the eyes, so gloves, eye protection and a lab coat are worn. With these precautions the risk is low.",
      }),
      P.manual({
        label: "(g)", marks: 3, stem: "Explain how Nyasha should present and analyse her results, and how she would decide whether her hypothesis is supported.",
        points: ["Table with temperature / °C, three times / s, mean time / s and rate / s⁻¹ (units in headings, rates to a consistent number of significant figures)", "Plot mean rate against temperature (line graph, points joined with ruled lines or a smooth curve) with error bars (range or standard deviation)", "Supported if rate rises to a peak (optimum) and then falls, with non-overlapping error bars around the peak; identify the optimum and note anomalies"],
        modelAnswer: "She should record temperature, the three times, the mean time and the rate in a table with units in the headings. She should plot mean rate against temperature with standard deviation error bars. The hypothesis is supported if the rate rises to a peak at an optimum temperature and then falls, with error bars at the peak not overlapping those of neighbouring temperatures.",
      }),
    ]),
    explanation: "Methylene blue accepts hydrogen from dehydrogenases; time to decolourise measures the rate of respiration.",
    hints: ["Rate = 1000 ÷ time.", "Why must the tubes not be shaken?"],
    calculator: true,
  });
});
