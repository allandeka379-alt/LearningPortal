// W3b: control and coordination in plants (Cambridge only, A Level).
import { concept, P, t, chk, table, rnd, sfStr } from "../lib.mjs";

concept("abio.coordination.plant-responses", { file: "coordination/plant-responses", keyPrefix: "coordination.plant-responses" }, (b) => {
  const calc = (o) => b.calc({ ...o, workedSolution: o.workedSolution ?? o.explanation });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In a germinating barley grain, which tissue secretes amylase in response to gibberellin?",
    options: [
      ["Aleurone layer", "Correct."],
      ["Endosperm", "The endosperm stores the starch that amylase digests."],
      ["Embryo", "The embryo produces gibberellin, not most of the amylase."],
      ["Testa", "The testa (seed coat) is protective."],
    ],
    answer: "A",
    explanation: "The **aleurone layer** makes and secretes amylase into the endosperm.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which part of a barley grain produces gibberellin when the grain absorbs water?",
    options: [
      ["Embryo", "Correct."],
      ["Aleurone layer", "The aleurone layer responds to gibberellin."],
      ["Endosperm", "The endosperm is a starch store."],
      ["Pericarp", "The fruit wall does not produce the signal."],
    ],
    answer: "A",
    explanation: "The **embryo** releases gibberellin, which diffuses to the aleurone layer.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How does auxin make the cell walls of shoot cells more extensible?",
    options: [
      ["It stimulates proton pumps, acidifying the wall", "Correct: low pH activates expansins."],
      ["It hydrolyses the cellulose microfibrils in the wall", "Auxin is not an enzyme."],
      ["It increases the water potential inside the cell", "Water uptake follows wall loosening; this is not how auxin loosens the wall."],
      ["It adds extra lignin to the wall", "Lignin makes walls more rigid."],
    ],
    answer: "A",
    explanation: "Auxin stimulates H⁺ pumping into the wall; the low pH activates expansins, which loosen it.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the role of expansins in elongation growth?",
    options: [
      ["They break bonds between cellulose microfibrils and other wall polymers", "Correct."],
      ["They pump hydrogen ions into the cell wall", "Proton pumps do this."],
      ["They synthesise new cellulose microfibrils so that the cell wall can lengthen", "Expansins loosen, they do not synthesise."],
      ["They act as auxin receptors in the membrane", "Expansins are wall proteins activated by low pH."],
    ],
    answer: "A",
    explanation: "Activated by low pH, expansins break hydrogen bonds in the wall so it can stretch.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A raindrop strikes one sensory hair of a Venus fly trap and nothing else touches it for the next minute. What happens?",
    options: [
      ["An action potential occurs but the trap stays open", "Correct: two stimuli are needed within a short time."],
      ["The trap closes, then reopens after a few seconds", "One stimulus does not close the trap."],
      ["No action potential occurs at all", "A single touch can produce an action potential."],
      ["The trap closes and secretes digestive enzymes", "Closure needs a second stimulus."],
    ],
    answer: "A",
    explanation: "One stimulus gives an action potential but the trap closes only if a second follows within about 20-30 s.",
    hints: ["How many stimuli are needed?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is it an advantage for a Venus fly trap to close only after two stimuli in a short time?",
    options: [
      ["It avoids wasting energy on closing for raindrops or debris", "Correct."],
      ["It allows small insects time to escape before digestion begins", "The aim is to keep the prey."],
      ["It gives time for amylase to be synthesised", "Amylase is not involved in trapping."],
      ["It allows auxin to reach the hinge of the trap", "Closure is driven by action potentials, not auxin transport."],
    ],
    answer: "A",
    explanation: "Requiring two stimuli filters out single accidental touches, saving the energy and time needed to reopen.",
    hints: ["Closing and reopening are costly."],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Coleoptile segments are placed in solutions without auxin. In which solution would you expect them to elongate most?",
    options: [
      ["A buffer at pH 4.5", "Correct: acid conditions loosen the walls."],
      ["A buffer at pH 7.0", "Neutral pH does not activate expansins."],
      ["A buffer at pH 8.5", "Alkaline conditions would not loosen walls."],
      ["Distilled water with a proton-pump inhibitor", "Without acid, walls do not loosen."],
    ],
    answer: "A",
    explanation: "Low pH mimics the effect of auxin: the acid growth hypothesis.",
    hints: ["Auxin acts by acidifying the wall."],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Barley half-grains without embryos produce almost no amylase, but produce a lot when gibberellin is added. Which conclusion is best supported?",
    options: [
      ["The embryo normally triggers amylase production by releasing gibberellin", "Correct: gibberellin replaces the embryo's effect."],
      ["Gibberellin hydrolyses starch directly in the endosperm", "Gibberellin is a hormone, not an enzyme."],
      ["The embryo itself makes all the amylase in the grain", "Half-grains with no embryo still make amylase if given gibberellin."],
      ["Amylase is stored in the endosperm and simply released when gibberellin arrives", "Amylase is newly synthesised in the aleurone layer."],
    ],
    answer: "A",
    explanation: "Gibberellin can replace the embryo, so the embryo's role is to supply gibberellin.",
    hints: ["What can replace the embryo?"],
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Gibberellin is the enzyme that hydrolyses starch in a germinating barley grain.",
    answer: false,
    explanation: "False. Gibberellin is a hormone; it causes the aleurone layer to make amylase, which hydrolyses starch.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Auxin causes cell elongation, not cell division, in the region behind a shoot tip.", daily: true,
    answer: true,
    explanation: "True. Auxin loosens walls so cells elongate as they take up water.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each structure in a barley grain with its role in germination.",
    pairs: [
      ["Embryo", "Releases gibberellin"],
      ["Aleurone layer", "Synthesises and secretes amylase"],
      ["Endosperm", "Stores starch"],
      ["Amylase", "Hydrolyses starch to maltose"],
    ],
    explanation: "Embryo → gibberellin → aleurone → amylase → endosperm starch → sugars.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "Auxin stimulates the pumping of {{blank:a}} ions into the cell wall. The low pH activates {{blank:b}}, which loosen the wall so the cell can elongate as it absorbs {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["hydrogen"], choices: ["hydrogen", "calcium", "sodium"] },
      { id: "b", accepted: ["expansins"], choices: ["expansins", "amylases", "cellulases"] },
      { id: "c", accepted: ["water"], choices: ["water", "glucose", "auxin"] },
    ],
    explanation: "H⁺ pumped out; expansins activated; water uptake drives elongation.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the enzyme that the aleurone layer secretes into the endosperm during germination of barley.",
    accepted: ["amylase", "alpha-amylase", "α-amylase", "a-amylase", "alpha amylase"],
    wrong: ["maltase"],
    explanation: "**Amylase** (α-amylase).",
  });

  // Numerical: interval check for Venus fly trap
  const touches = [0, 35, 52];
  const gap = touches[2] - touches[1];
  chk(gap, 17);
  b.num({
    d: 2, skill: "APPLICATION",
    stem: `A Venus fly trap closes only if two of its sensory hairs are touched within 25 s of each other. A beetle touches hairs at ${touches[0]} s, ${touches[1]} s and ${touches[2]} s. How many seconds after the first touch does the trap close?`,
    value: touches[2], unit: "s", wrong: [touches[1], gap],
    explanation: `The gap between the first and second touches is ${touches[1]} s (too long). The gap between the second and third is ${gap} s (within 25 s), so the trap closes at the third touch, **${touches[2]} s** after the first.`,
  });
  // Calculation: percentage increase in amylase
  const noGA = 6, withGA = 57;
  const inc = ((withGA - noGA) / noGA) * 100;
  chk(inc, 850);
  calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Barley half-grains without embryos had an amylase activity of ${noGA} arbitrary units. Similar half-grains incubated with gibberellin had an activity of ${withGA} arbitrary units. Calculate the percentage increase in amylase activity caused by gibberellin.`,
    value: inc, unit: "%", wrong: [rnd(((withGA - noGA) / withGA) * 100, 1), rnd((withGA / noGA) * 100, 0)],
    explanation: t`1. Increase $= ${withGA} - ${noGA} = ${withGA - noGA}$ units.
2. Percentage increase $= \dfrac{${withGA - noGA}}{${noGA}} \times 100 = ${inc}\%$.
Dividing by the final value (89.5%) or giving the new value as a percentage of the old (950%) are common errors.`,
    hints: ["Percentage change = change ÷ original × 100."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 5,
    stem: "Explain how gibberellin brings about the mobilisation of starch in a germinating barley grain.",
    points: [
      "Water uptake activates the embryo, which releases gibberellin",
      "Gibberellin diffuses to the aleurone layer",
      "It switches on transcription of the amylase gene / amylase is synthesised in aleurone cells",
      "Amylase is secreted into the endosperm and hydrolyses starch to maltose (and glucose)",
      "Sugars are absorbed by the embryo for respiration / ATP and growth",
    ],
    modelAnswer: "When the grain absorbs water, the embryo is activated and releases gibberellin, which diffuses to the aleurone layer. There it switches on the transcription of the gene for amylase, so aleurone cells synthesise amylase and secrete it into the endosperm. Amylase hydrolyses starch to maltose, which is broken down further to glucose. The sugars diffuse to the embryo and are used in respiration to provide ATP and as raw materials for growth.",
    explanation: "Embryo → gibberellin → aleurone → amylase → starch hydrolysis → sugars to embryo.",
    hints: ["Follow the signal from the embryo and back again."],
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the events that lead to the closure of a Venus fly trap after an insect lands on it.",
    points: [
      "Insect bends a sensory hair, deforming cells at its base and opening ion channels / receptor potential",
      "Action potential is produced and spreads across the lobes",
      "A second stimulus within about 20-30 s is needed for closure",
      "Ion movements and water movement change turgor and cell walls loosen, so the lobes flip from convex to concave and snap shut",
    ],
    modelAnswer: "The insect bends a sensory hair, which deforms the membranes of cells at its base, opens ion channels and produces a receptor potential. If threshold is reached, an action potential spreads across the lobes. A second touch within about 20-30 seconds produces a second action potential, which triggers closure: ions move, water moves by osmosis, turgor changes and cell walls loosen, so the lobes flip suddenly from convex to concave and snap shut.",
    explanation: "Hair, action potential, two stimuli, turgor and wall changes.",
    hints: ["How many stimuli are needed?"],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "Suggest how you could test whether proton pumping is needed for auxin-stimulated elongation of shoot segments.",
    points: [
      "Treat shoot segments with auxin plus a proton-pump inhibitor, and auxin alone (control)",
      "Measure the increase in length (or the pH of the medium) after a set time, with replicates and other variables (temperature, segment length) kept constant",
      "If the inhibitor prevents elongation (and acidification), proton pumping is needed",
    ],
    modelAnswer: "Place similar shoot segments in auxin solution with a proton-pump inhibitor and in auxin solution alone as a control, at the same temperature and with several replicates. After a set time measure the increase in length, and the pH of the solution. If segments with the inhibitor fail to elongate and the solution does not become acidic, proton pumping is needed for the effect of auxin.",
    explanation: "Block the pump and compare with a control.",
    hints: ["Block one step and see if the response still happens."],
  });

  // Practice structured: half-grain experiment
  const treat = ["Whole grains", "Half-grains, no embryo", "Half-grains + gibberellin", "Half-grains + gibberellin + transcription inhibitor"];
  const starch = [72, 8, 68, 6];
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `Barley grains were cut in half and incubated on starch agar for 48 hours. The agar was then flooded with iodine solution, and the percentage of the agar area around each grain that had become clear (starch hydrolysed) was recorded.\n\n${table(["Treatment", "Clear area / %"], treat.map((x, i) => [x, String(starch[i])]))}`,
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "Explain why clear areas appear around some grains when iodine is added.",
        points: [
          "Amylase diffused into the agar and hydrolysed starch",
          "No starch remains, so iodine stays yellow-brown / no blue-black colour",
        ],
        modelAnswer: "Amylase secreted by the grain diffused into the agar and hydrolysed the starch there, so iodine did not turn blue-black in those areas.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Compare the results for whole grains, half-grains without embryos and half-grains with gibberellin, and draw a conclusion.",
        points: [
          "Without the embryo the clear area falls from 72% to 8%; with gibberellin it is restored to 68%",
          "So the embryo stimulates amylase production by releasing gibberellin",
        ],
        modelAnswer: "Removing the embryo reduced the clear area from 72% to 8%, but adding gibberellin restored it to 68%, close to whole grains. The embryo therefore stimulates amylase production by releasing gibberellin.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain the result with the transcription inhibitor.",
        points: [
          "Clear area only 6%: little amylase made even with gibberellin",
          "Gibberellin acts by switching on transcription of the amylase gene / amylase is newly synthesised, not stored",
        ],
        modelAnswer: "With the transcription inhibitor, the clear area fell to 6% even though gibberellin was present. This shows gibberellin works by switching on transcription of the amylase gene, so amylase is newly made rather than released from a store.",
      }),
      P.short({
        label: "(d)", marks: 1, stem: "Name the layer of cells in which the amylase is made.",
        accepted: ["aleurone layer", "aleurone", "the aleurone layer"],
        wrong: ["endosperm"],
        explanation: "The aleurone layer.",
      }),
      P.manual({
        label: "(e)", marks: 1, stem: "Suggest one variable that should be controlled in this experiment.",
        points: ["Temperature / time of incubation / size or variety of grains / starch concentration in the agar / gibberellin concentration"],
        modelAnswer: "The temperature of incubation (or incubation time, grain variety, starch concentration).",
      }),
    ],
    explanation: "Gibberellin from the embryo switches on amylase synthesis in the aleurone layer.",
    hints: ["Compare treatments in pairs."],
  });

  const pH = [3.5, 4.5, 5.5, 6.5, 7.5];
  const grow = [2.2, 2.6, 1.4, 0.5, 0.3];
  const ratio = grow[1] / grow[4];
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: `Tatenda placed 10 mm segments of maize coleoptile (without auxin) in buffer solutions of different pH and measured the increase in length after 6 hours.\n\n${table(["pH", ...pH.map((x) => x.toFixed(1))], [["Increase in length / mm", ...grow.map((x) => x.toFixed(1))]])}`,
    parts: [
      P.num({
        label: "(a)", marks: 1, stem: "How many times greater was the increase in length at pH 4.5 than at pH 7.5? Give your answer to two significant figures.",
        value: ratio, sf: 2, wrong: [rnd(grow[4] / grow[1], 3)],
        explanation: `2.6 ÷ 0.3 = ${sfStr(ratio, 2)}.`,
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Explain how these results support the acid growth hypothesis.",
        points: [
          "Most elongation at low pH (2.6 mm at pH 4.5) and little at high pH (0.3 mm at 7.5)",
          "Acid activates expansins / loosens bonds in the cell wall",
          "So acid alone mimics auxin, which is thought to act by pumping H⁺ into the wall",
        ],
        modelAnswer: "Segments grew most in acid solutions (2.6 mm at pH 4.5) and hardly at all near neutral (0.3 mm at pH 7.5). Acid activates expansins, which loosen the wall so cells elongate. Since acid alone mimics the effect of auxin, this supports the idea that auxin works by pumping hydrogen ions into the wall.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Suggest why growth was slightly lower at pH 3.5 than at pH 4.5.",
        points: [
          "Very low pH may damage / denature proteins (expansins, membrane proteins) or cells",
          "So walls loosen less / cells take up less water",
        ],
        modelAnswer: "At pH 3.5 the acidity may begin to denature expansins or damage membrane proteins and cells, so the walls loosen less effectively and the cells take up less water.",
      }),
    ],
    explanation: "Low pH loosens walls, mimicking auxin.",
    hints: ["What does auxin do to the pH of the wall?"],
    calculator: true,
  });

  b.card("CONCEPT", "Venus fly trap: what triggers closure?", "Two stimuli of the sensory hairs within about 20-30 s, each producing an action potential.");
  b.card("CONCEPT", "How does the Venus fly trap snap shut?", "Action potentials cause ion and water movements, turgor changes and wall loosening; lobes flip from convex to concave.");
  b.card("DEFINITION", "State the **acid growth hypothesis**.", "Auxin stimulates proton pumps; H⁺ acidifies the wall; expansins loosen it; cell elongates as it absorbs water.");
  b.card("FACT", "What do expansins do?", "Activated by low pH, they break bonds between cellulose microfibrils and other wall polymers, loosening the wall.");
  b.card("CONCEPT", "Sequence of germination in barley", "Water → embryo releases gibberellin → aleurone layer makes amylase → starch in endosperm hydrolysed → sugars to embryo.");
  b.card("FACT", "Where is starch stored in a barley grain?", "In the endosperm.");
  b.card("FACT", "Where is amylase synthesised in a germinating barley grain?", "In the aleurone layer, in response to gibberellin.");
  b.card("CONCEPT", "Two types of signal in plants", "Electrical signals (action potentials) for rapid responses; hormones for slower responses such as growth.");
});
