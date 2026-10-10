// W3b: transmission of nerve impulses (both boards; Cambridge A Level only).
import { concept, P, t, chk, table, rnd, sfStr } from "../lib.mjs";

concept("abio.coordination.impulse-transmission", { file: "coordination/impulse-transmission", keyPrefix: "coordination.impulse-transmission" }, (b) => {
  const calc = (o) => b.calc({ ...o, workedSolution: o.workedSolution ?? o.explanation });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In a myelinated axon, where do action potentials occur?",
    options: [
      ["Only at the nodes of Ranvier", "Correct: the myelin insulates the rest of the axon."],
      ["Only under the Schwann cells", "Myelin prevents ion flow there."],
      ["Along the whole length of the membrane", "That is continuous conduction in unmyelinated axons."],
      ["Only at the synaptic knobs", "Action potentials travel along the axon, not only at its end."],
    ],
    answer: "A",
    explanation: "Depolarisation happens only at the **nodes of Ranvier**: saltatory conduction.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why does an impulse normally travel in only one direction along an axon?",
    options: [
      ["The membrane behind the action potential is refractory", "Correct: its sodium channels are inactivated."],
      ["Sodium ions can diffuse only towards the axon terminal", "Ions diffuse both ways in local circuits."],
      ["The myelin sheath blocks backward movement of ions", "Unmyelinated axons also conduct one way."],
      ["Voltage-gated channels are present only ahead of the impulse", "Channels are present along the whole membrane."],
    ],
    answer: "A",
    explanation: "The region behind is in its **refractory period**, so local currents can only depolarise the resting membrane ahead.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which change would increase the conduction velocity of an unmyelinated axon?",
    options: [
      ["An increase in axon diameter", "Correct: less resistance to local currents."],
      ["A decrease in temperature from 30 °C to 20 °C", "Lower temperature slows ion diffusion."],
      ["A shorter length of axon", "Length changes the time taken, not the speed."],
      ["A lower concentration of sodium ions outside", "This would weaken depolarisation, not speed it up."],
    ],
    answer: "A",
    explanation: "A wider axon offers less resistance to the flow of ions, so local currents spread further and faster.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What makes the myelin sheath an effective electrical insulator?",
    options: [
      ["It consists of many layers of lipid-rich membrane", "Correct: ions cannot cross the lipid layers."],
      ["It is made of a thick layer of cellulose", "Myelin is membrane, not cellulose."],
      ["It contains many voltage-gated sodium ion channels along it", "Channels are concentrated at the nodes, not in myelin."],
      ["It is a single layer of protein fibres", "Myelin is many layers of Schwann cell membrane."],
    ],
    answer: "A",
    explanation: "Schwann cells wrap many layers of their phospholipid-rich membrane around the axon, preventing ion flow.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "In multiple sclerosis, patches of myelin are lost from some axons in the central nervous system. What is the most likely effect on impulses in those axons?",
    options: [
      ["They are slowed or fail to reach the next node", "Correct: saltatory conduction is disrupted."],
      ["They travel faster because more membrane is exposed", "Losing myelin removes saltatory conduction, slowing impulses."],
      ["They become larger in amplitude along the axon", "Action potentials are all-or-nothing."],
      ["They travel in both directions along the axon", "The refractory period still prevents backward travel."],
    ],
    answer: "A",
    explanation: "Without myelin, local currents leak and may not depolarise the next node to threshold, so impulses slow or stop.",
    hints: ["What does myelin allow?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statement correctly describes a local circuit in an unmyelinated axon?",
    options: [
      ["Na⁺ that entered diffuses inside the axon to the next resting region", "Correct: this depolarises the neighbouring membrane."],
      ["K⁺ is pumped along the inside of the axon to the next node", "Local circuits involve diffusion, not pumping, and there are no nodes."],
      ["Na⁺ moves along the outside of the myelin to the next node", "There is no myelin on an unmyelinated axon."],
      ["Neurotransmitter diffuses along the inside of the axon to the next region", "Neurotransmitter acts at synapses, not along axons."],
    ],
    answer: "A",
    explanation: "Na⁺ diffuses sideways inside the axon, towards the negative resting region, depolarising it to threshold.",
    hints: ["Which ion has just entered?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Axon X is myelinated and 12 µm in diameter; axon Y is unmyelinated and 600 µm in diameter. Both are at 25 °C. Which prediction is most likely?",
    options: [
      ["X conducts faster than Y, despite its much smaller diameter", "Correct: myelination has a larger effect than diameter."],
      ["Y conducts faster than X because it is fifty times wider", "Width helps, but saltatory conduction gives a far larger increase."],
      ["X and Y conduct at the same speed because the temperature is equal", "Temperature is only one factor."],
      ["Y cannot conduct impulses because it has no myelin", "Unmyelinated axons conduct, only more slowly."],
    ],
    answer: "A",
    explanation: "A thin myelinated axon (tens of m s⁻¹) outpaces even a giant unmyelinated axon (about 20-25 m s⁻¹).",
    hints: ["Which factor has the bigger effect on speed?"],
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Saltatory conduction uses less ATP than continuous conduction over the same length of axon.", daily: true,
    answer: true,
    explanation: "True. Ions cross the membrane only at the nodes, so the sodium-potassium pump has fewer ions to move back.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A stronger stimulus is signalled by larger action potentials travelling along the axon.",
    answer: false,
    explanation: "False. Action potentials are all-or-nothing; a stronger stimulus gives a higher frequency (and often more neurones firing).",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each feature with its effect on transmission.",
    pairs: [
      ["Myelin sheath", "Allows saltatory conduction between nodes"],
      ["Large axon diameter", "Lowers resistance to local currents"],
      ["Refractory period", "Makes impulses one-way and discrete"],
      ["Higher temperature (below 40 °C)", "Faster diffusion of ions"],
    ],
    explanation: "Myelin → saltatory; diameter → resistance; refractory → one-way; temperature → diffusion rate.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "In a myelinated axon, local circuits flow from one {{blank:a}} to the next, so the impulse jumps; this is called {{blank:b}} conduction.",
    blanks: [
      { id: "a", accepted: ["node of Ranvier"], choices: ["node of Ranvier", "Schwann cell", "synapse"] },
      { id: "b", accepted: ["saltatory"], choices: ["saltatory", "continuous", "synaptic"] },
    ],
    explanation: "Node to node: saltatory conduction.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the type of conduction in which the impulse jumps from node to node.",
    accepted: ["saltatory conduction", "saltatory", "saltatory transmission"],
    wrong: ["continuous conduction"],
    explanation: "**Saltatory** conduction.",
  });

  // Numerical: conduction velocity from electrode data
  const dist = 84, time = 1.4; // mm, ms
  const v = dist / time;
  chk(v, 60);
  calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Two electrodes are placed ${dist} mm apart on an axon. An impulse reaches the second electrode ${time} ms after the first. Calculate the conduction velocity in m s⁻¹.`,
    value: v, unit: "m/s", wrong: [rnd(dist / 1000 / time, 3), 0.06],
    explanation: t`1. Distance $= ${dist}\ \text{mm} = ${dist / 1000}\ \text{m}$; time $= ${time}\ \text{ms} = ${time / 1000}\ \text{s}$.
2. Speed $= \dfrac{${dist / 1000}}{${time / 1000}} = ${rnd(v, 1)}\ \text{m s}^{-1}$.
Converting only the distance (m ÷ ms) gives 0.06, which is wrong.`,
    hints: ["Convert both distance and time to SI units.", "1 mm per ms = 1 m per s."],
  });
  // Numerical: time to travel
  const len = 1.05, speed2 = 70;
  const tms = (len / speed2) * 1000;
  chk(tms, 15);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A motor neurone running from the spinal cord to a toe muscle is ${len} m long and conducts at ${speed2} m s⁻¹. Calculate the time, in ms, for an impulse to travel its full length.`,
    value: tms, unit: "ms", wrong: [rnd(len / speed2, 3), rnd(speed2 / len, 1)],
    explanation: t`Time $= \dfrac{${len}}{${speed2}} = ${rnd(len / speed2, 3)}\ \text{s} = ${rnd(tms, 1)}\ \text{ms}$. Giving 0.015 forgets to convert to ms; dividing speed by length is the wrong way round.`,
    hints: ["Time = distance ÷ speed."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how an action potential is propagated along an unmyelinated axon.",
    points: [
      "Na⁺ that has entered at the action potential diffuses sideways inside the axon (local circuit)",
      "This depolarises the neighbouring resting region of membrane",
      "When threshold is reached, voltage-gated Na⁺ channels open there and a new action potential is produced",
      "The region behind is refractory, so the action potential moves forward only",
    ],
    modelAnswer: "At the site of an action potential, sodium ions that have entered diffuse sideways inside the axon towards the neighbouring resting region, forming a local circuit with the opposite movement of positive ions outside. This depolarises the neighbouring membrane, and when it reaches the threshold, voltage-gated sodium channels open there and a new action potential is generated. The region behind is in its refractory period, so the wave of action potentials moves forward along the axon.",
    explanation: "Local circuits, threshold, new action potential, refractory region behind.",
    hints: ["Use the term 'local circuit'."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "Suggest why vertebrates have many thin myelinated axons in their nerves, whereas squid rely on a few giant unmyelinated axons for rapid escape responses.",
    points: [
      "Myelinated axons conduct fast while staying thin",
      "So many axons can be packed into a nerve / many different signals carried in a small space",
      "Giant axons achieve speed through large diameter but take up much space, so only a few can be used (for essential escape reflexes) / myelination also saves ATP",
    ],
    modelAnswer: "Myelination gives very fast saltatory conduction even in thin axons, so a vertebrate nerve can contain thousands of fast axons carrying different signals in a small space. Squid achieve speed by increasing diameter, which works but needs a lot of space, so only a few giant axons can be used, for vital escape responses. Myelinated axons also use less ATP per impulse.",
    explanation: "Speed per unit space is the key comparison.",
    hints: ["Think about how much space each strategy needs."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe three ways in which the refractory period is important in the transmission of impulses.",
    points: [
      "Ensures one-way transmission (region behind cannot be depolarised)",
      "Ensures action potentials are discrete / separate and do not merge",
      "Limits the maximum frequency of impulses",
    ],
    modelAnswer: "The refractory period means the region behind an action potential cannot be re-excited, so impulses travel only one way. It keeps action potentials separate from each other so they do not merge. It also sets a maximum frequency at which impulses can be sent.",
    explanation: "One-way, discrete, maximum frequency.",
    hints: ["Direction, separation, frequency."],
  });

  // Practice structured: speeds at different temperatures and diameters
  const temps = [10, 15, 20, 25, 30, 35];
  const dists = [50, 50, 50, 50, 50, 50];
  const times = [2.5, 2.0, 1.5, 1.25, 1.0, 0.75];
  const speeds = times.map((x, i) => dists[i] / x);
  speeds.forEach((s, i) => chk(s, [20, 25, 100 / 3, 40, 50, 200 / 3][i]));
  const pctInc = ((speeds[5] - speeds[0]) / speeds[0]) * 100;
  chk(pctInc, 700 / 3);
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `Rudo measured the time for an impulse to travel 50 mm along an isolated frog nerve at different temperatures.\n\n${table(["Temperature / °C", "Time / ms"], temps.map((x, i) => [String(x), String(times[i])]))}`,
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the conduction velocity at 20 °C in m s⁻¹. Give your answer to three significant figures.",
        value: speeds[2], sf: 3, unit: "m/s", wrong: [rnd(speeds[2] / 1000, 4)],
        explanation: t`$\dfrac{50\ \text{mm}}{1.5\ \text{ms}} = 33.33\ \text{mm ms}^{-1} = 33.3\ \text{m s}^{-1}$ (3 s.f.). Dividing by 1000 as well gives 0.0333, which is wrong because 1 mm ms⁻¹ already equals 1 m s⁻¹.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the percentage increase in conduction velocity from 10 °C to 35 °C. Give your answer to the nearest whole number.",
        value: pctInc, dp: 0, unit: "%", wrong: [rnd(((speeds[5] - speeds[0]) / speeds[5]) * 100, 0)],
        explanation: t`Speeds: $50 \div 2.5 = 20$ and $50 \div 0.75 = 66.67\ \text{m s}^{-1}$. Increase $= \dfrac{66.67 - 20}{20} \times 100 = 233.3 \approx 233\%$. Dividing by 66.67 instead gives 70%, which is wrong.`,
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain the effect of temperature shown by these results.",
        points: [
          "Speed increases with temperature (time falls from 2.5 ms to 0.75 ms)",
          "Ions diffuse faster / channels open and close faster at higher temperature (more kinetic energy), so local circuits depolarise the next region sooner",
        ],
        modelAnswer: "As temperature rose from 10 °C to 35 °C, the time fell from 2.5 ms to 0.75 ms, so speed increased. Ions have more kinetic energy and diffuse faster, so local currents depolarise the next region to threshold sooner.",
      }),
      P.manual({
        label: "(d)", marks: 1, stem: "Predict what would happen to the conduction velocity if the nerve were heated to 55 °C, and explain.",
        points: ["Speed falls / conduction stops, because channel proteins and pumps denature"],
        modelAnswer: "Conduction would slow or stop, because channel and pump proteins denature at high temperature.",
      }),
      P.manual({
        label: "(e)", marks: 1, stem: "State one variable Rudo should have kept constant.",
        points: ["Same nerve / same distance between electrodes / same stimulus strength / same saline (ion concentration)"],
        modelAnswer: "The distance between the electrodes (or the same nerve, stimulus strength or saline solution).",
      }),
    ],
    explanation: "Speed = distance ÷ time; temperature speeds diffusion until proteins denature.",
    hints: ["50 mm ÷ time in ms gives m s⁻¹ directly."],
    calculator: true,
  });

  const axons = [
    ["A", 2, "No", 1.5],
    ["B", 2, "Yes", 12],
    ["C", 15, "Yes", 90],
    ["D", 400, "No", 18],
  ];
  const ratio = axons[1][3] / axons[0][3];
  chk(ratio, 8);
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `The table shows the conduction velocity of four axons.\n\n${table(["Axon", "Diameter / µm", "Myelinated?", "Velocity / m s⁻¹"], axons.map((r) => r.map(String)))}`,
    parts: [
      P.num({
        label: "(a)", marks: 1, stem: "How many times faster does axon B conduct than axon A?",
        value: ratio, wrong: [10.5],
        explanation: `12 ÷ 1.5 = ${ratio} times.`,
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Use axons A and B to explain the effect of myelination on conduction velocity.",
        points: [
          "Same diameter, so the difference is due to myelin (B is 8 times faster)",
          "Myelin insulates, so depolarisation occurs only at nodes of Ranvier",
          "Local circuits span from node to node / saltatory conduction, which is faster than depolarising every part of the membrane",
        ],
        modelAnswer: "A and B have the same diameter, so the eightfold difference in speed is due to myelination. In B the myelin insulates the axon, so action potentials occur only at the nodes of Ranvier; local circuits extend from node to node and the impulse jumps between them (saltatory conduction), which is much faster than depolarising each patch of membrane in turn as in A.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Compare axons C and D and explain what the comparison shows.",
        points: [
          "C is much thinner (15 vs 400 µm) yet faster (90 vs 18 m s⁻¹)",
          "Shows myelination has a greater effect than diameter / D relies on large diameter (lower resistance) alone",
        ],
        modelAnswer: "C is about 27 times thinner than D but conducts five times faster (90 compared with 18 m s⁻¹). This shows that myelination increases speed far more than diameter does; D depends only on its large diameter, which lowers resistance to local currents.",
      }),
    ],
    explanation: "Control one factor to compare the other.",
    hints: ["Which pair differs in only one factor?"],
    calculator: true,
  });

  b.card("DEFINITION", "Define **saltatory conduction**.", "Conduction in a myelinated axon in which action potentials occur only at nodes of Ranvier, so the impulse jumps from node to node.");
  b.card("DEFINITION", "What is a **local circuit**?", "Movement of ions between a depolarised region and the neighbouring resting region, depolarising it to threshold.");
  b.card("FORMULA", "Conduction velocity", "Speed = distance ÷ time; 1 mm ms⁻¹ = 1 m s⁻¹.");
  b.card("CONCEPT", "Three factors that increase conduction speed", "Myelination, larger axon diameter, higher temperature (up to about 40 °C).");
  b.card("CONCEPT", "Why is a wider axon faster?", "Less resistance to the flow of ions in the cytoplasm, so local currents spread further.");
  b.card("CONCEPT", "Why is saltatory conduction more economical?", "Ions cross the membrane only at nodes, so the pump uses less ATP to restore gradients.");
  b.card("CONCEPT", "Three roles of the refractory period", "One-way transmission; discrete impulses; a maximum impulse frequency.");
  b.card("CONCEPT", "How is stimulus intensity coded?", "By the frequency of action potentials (and the number of neurones firing), not their size.");
  b.card("FACT", "Approximate speed of a large myelinated mammalian axon", "Up to about 100-120 m s⁻¹ (thin unmyelinated: about 0.5-2 m s⁻¹).");
});
