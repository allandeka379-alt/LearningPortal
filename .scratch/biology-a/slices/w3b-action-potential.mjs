// W3b: receptors, resting potential and the action potential (both boards; Cambridge A Level only).
import { concept, P, t, chk, table, rnd } from "../lib.mjs";

concept("abio.coordination.action-potential", { file: "coordination/action-potential", keyPrefix: "coordination.action-potential" }, (b) => {
  const calc = (o) => b.calc({ ...o, workedSolution: o.workedSolution ?? o.explanation });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the approximate resting potential of a mammalian neurone?",
    options: [
      ["−70 mV", "Correct: the inside is about 70 mV negative to the outside."],
      ["+40 mV", "This is close to the peak of an action potential."],
      ["−120 mV", "Far more negative than a typical resting potential."],
      ["0 mV", "At 0 mV the membrane would not be polarised at all."],
    ],
    answer: "A",
    explanation: "The resting potential is about **−70 mV** (inside negative).",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "During the depolarisation phase of an action potential, which ions move, and in which direction?",
    options: [
      ["Sodium ions diffuse into the axon", "Correct: voltage-gated Na⁺ channels open."],
      ["Potassium ions diffuse out of the axon", "That is repolarisation."],
      ["Sodium ions are pumped out of the axon", "Pumping Na⁺ out maintains the resting potential."],
      ["Potassium ions are pumped into the axon", "The pump does this all the time; it does not depolarise."],
    ],
    answer: "A",
    explanation: "Voltage-gated sodium channels open and Na⁺ diffuses **in**, making the inside positive.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "For each molecule of ATP hydrolysed, the sodium-potassium pump moves",
    options: [
      ["3 Na⁺ out of the cell and 2 K⁺ into the cell", "Correct."],
      ["2 Na⁺ out of the cell and 3 K⁺ into the cell", "The numbers are reversed."],
      ["3 Na⁺ into the cell and 2 K⁺ out of the cell", "The directions are reversed."],
      ["1 Na⁺ out of the cell and 1 K⁺ into the cell", "The pump is not a one-for-one exchanger."],
    ],
    answer: "A",
    explanation: "Three Na⁺ out and two K⁺ in, so more positive charge leaves than enters.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is the inside of a resting axon negative relative to the outside?",
    options: [
      ["The membrane is more permeable to K⁺, which diffuses out", "Correct: open K⁺ channels let K⁺ leave, together with the pump."],
      ["The membrane is more permeable to Na⁺, which diffuses in", "Na⁺ entry would make the inside positive."],
      ["Voltage-gated sodium channels are open at rest", "They are closed at rest."],
      ["Chloride ions are pumped in by the sodium-potassium pump", "The pump moves Na⁺ and K⁺ only."],
    ],
    answer: "A",
    explanation: "At rest some K⁺ channels are open, so the membrane is more permeable to K⁺, which diffuses out down its concentration gradient; the pump also moves more positive charge out than in.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "A sensory receptor is described as a transducer because it",
    options: [
      ["converts the energy of a stimulus into an electrical change", "Correct."],
      ["amplifies an action potential so it can reach the brain", "Action potentials are not amplified; they are all-or-nothing."],
      ["transmits impulses from one neurone to another across a gap", "That is a synapse."],
      ["stores neurotransmitter until a strong stimulus arrives", "This is not the meaning of transducer."],
    ],
    answer: "A",
    explanation: "A transducer converts one form of energy (light, chemical, pressure) into another: an electrical receptor potential.",
    hints: ["What does 'transduce' mean?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Stimuli of increasing strength are applied to a sensory neurone, all above threshold. What happens to the action potentials recorded?",
    options: [
      ["Their frequency increases but their size stays the same", "Correct: all-or-nothing; strength is coded by frequency."],
      ["Their size increases but their frequency stays the same", "Action potentials are all the same size."],
      ["Both their size and their frequency increase", "Size is fixed by the all-or-nothing principle."],
      ["Neither changes, because the threshold has been reached", "Frequency does change with stimulus strength."],
    ],
    answer: "A",
    explanation: "Above threshold, action potentials are always the same size; a stronger stimulus increases their frequency.",
    hints: ["Recall the all-or-nothing principle."],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "In a taste-bud chemoreceptor, what is the immediate effect of sodium ions from food entering the receptor cell?",
    options: [
      ["The receptor cell depolarises, producing a receptor potential", "Correct: a graded depolarisation."],
      ["An action potential is produced at once in the receptor cell itself", "The receptor cell gives a graded receptor potential first."],
      ["The receptor cell hyperpolarises and releases transmitter", "Entry of positive ions depolarises, not hyperpolarises."],
      ["Potassium channels open and the cell returns to rest", "This is not the first effect of Na⁺ entry."],
    ],
    answer: "A",
    explanation: "Na⁺ entry makes the inside less negative: a receptor potential, which leads to transmitter release onto a sensory neurone.",
    hints: ["Positive ions entering a cell have what effect on the potential?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A drug blocks voltage-gated potassium channels but has no effect on other channels or on the pump. Which change to the action potential is most likely?",
    options: [
      ["Repolarisation is slowed, so the action potential lasts longer", "Correct: K⁺ cannot leave quickly through voltage-gated channels."],
      ["Depolarisation is prevented, so no action potential can occur at all", "Sodium channels still open, so depolarisation still happens."],
      ["The peak potential falls to about −50 mV", "The peak depends on Na⁺ entry, which is not blocked."],
      ["Hyperpolarisation becomes larger than usual", "Hyperpolarisation is caused by K⁺ channels staying open, so it would be reduced."],
    ],
    answer: "A",
    explanation: "Without voltage-gated K⁺ channels, K⁺ can leave only through the leak channels, so repolarisation is slow and hyperpolarisation small or absent.",
    hints: ["Which phase depends on voltage-gated potassium channels?"],
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Sodium ions enter an axon during an action potential by active transport.",
    answer: false,
    explanation: "False. Na⁺ enters by facilitated diffusion through voltage-gated sodium channels, down its electrochemical gradient.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A stimulus that does not reach the threshold produces no action potential.",
    answer: true,
    explanation: "True: the all-or-nothing principle.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each phase of the action potential with the event that causes it.",
    pairs: [
      ["Depolarisation", "Voltage-gated Na⁺ channels open and Na⁺ diffuses in"],
      ["Repolarisation", "Voltage-gated K⁺ channels open and K⁺ diffuses out"],
      ["Hyperpolarisation", "K⁺ channels are slow to close, so too much K⁺ leaves"],
      ["Restoring the resting potential", "Sodium-potassium pump and K⁺ leak channels"],
    ],
    explanation: "Na⁺ in (depolarisation), K⁺ out (repolarisation), K⁺ overshoot (hyperpolarisation), pump and leak (resting).",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "When the membrane reaches the {{blank:a}}, voltage-gated {{blank:b}} channels open. For a short time afterwards no new action potential can be produced; this is the {{blank:c}} period.",
    blanks: [
      { id: "a", accepted: ["threshold"], choices: ["threshold", "peak", "resting potential"] },
      { id: "b", accepted: ["sodium"], choices: ["sodium", "potassium", "calcium"] },
      { id: "c", accepted: ["refractory"], choices: ["refractory", "latent", "synaptic"] },
    ],
    explanation: "Threshold → sodium channels open; afterwards the refractory period.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the principle that states that an action potential either occurs at full size or does not occur at all.",
    accepted: ["all-or-nothing", "all or nothing", "all-or-none", "all or none", "all-or-nothing principle", "all or nothing law", "all-or-nothing law", "all or nothing principle"],
    wrong: ["threshold"],
    explanation: "The **all-or-nothing** principle.",
  });

  // Numerical: amplitude from a trace
  const rest = -72, peak = 40;
  const amp = peak - rest;
  chk(amp, 112);
  b.num({
    d: 2, skill: "APPLICATION",
    stem: `A trace shows a resting potential of ${rest} mV and an action potential peak of +${peak} mV. Calculate the total change in potential from rest to peak, in mV.`,
    value: amp, unit: "mV", wrong: [40],
    explanation: `${peak} − (${rest}) = **${amp} mV**. Ignoring the sign of the resting potential gives 40 mV, which is wrong.`,
  });
  // Calculation: maximum frequency from the refractory period
  const refr = 2.5; // ms
  const fmax = 1 / (refr / 1000);
  chk(fmax, 400);
  calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `The absolute refractory period of a neurone is ${refr} ms. Calculate the maximum number of action potentials per second that this neurone could carry.`,
    value: fmax, unit: "s⁻¹", wrong: [0.4, 2.5],
    explanation: t`1. Shortest interval between action potentials $= ${refr}\ \text{ms} = ${refr / 1000}\ \text{s}$.
2. Maximum frequency $= \dfrac{1}{${refr / 1000}} = ${fmax}$ per second.
Dividing 1 by 2.5 without converting to seconds gives 0.4, which is wrong.`,
    hints: ["Convert ms to s first.", "Frequency = 1 ÷ time between impulses."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how the resting potential of an axon is established and maintained.",
    points: [
      "Sodium-potassium pump uses ATP to move 3 Na⁺ out and 2 K⁺ in",
      "This sets up concentration gradients: more Na⁺ outside, more K⁺ inside",
      "Membrane is more permeable to K⁺ than Na⁺ (some K⁺ channels open, Na⁺ channels closed), so K⁺ diffuses out",
      "Leaving the inside negative (about −70 mV) / large negative ions such as proteins stay inside",
    ],
    modelAnswer: "The sodium-potassium pump hydrolyses ATP to move three sodium ions out of the axon for every two potassium ions in, setting up concentration gradients with more Na⁺ outside and more K⁺ inside. At rest the membrane is much more permeable to K⁺ because some potassium channels are open while sodium channels are closed, so K⁺ diffuses out down its gradient. Large negatively charged proteins remain inside, so the inside is left about 70 mV negative to the outside.",
    explanation: "Pump, gradients, differential permeability, result.",
    hints: ["Give both the pump and the permeability."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe how a chemoreceptor cell in a taste bud responds to salt and leads to impulses in a sensory neurone.",
    points: [
      "Na⁺ diffuse into the receptor cell through channels (in the microvilli)",
      "Depolarising the receptor cell / producing a receptor potential, which is graded",
      "Ca²⁺ channels open and neurotransmitter is released onto the sensory neurone; if the generator potential reaches threshold, an action potential is produced",
    ],
    modelAnswer: "Sodium ions from the salt diffuse into the receptor cell through channels in its microvilli, depolarising it and producing a graded receptor potential. This opens voltage-gated calcium channels, calcium ions enter and the cell releases neurotransmitter onto a sensory neurone. If the resulting generator potential reaches the threshold, an action potential is set up in the sensory neurone.",
    explanation: "Na⁺ entry, receptor potential, transmitter release, threshold.",
    hints: ["Start with the ion that enters."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "Suggest why a person poisoned with a substance that inhibits ATP synthesis eventually loses the ability to produce action potentials.",
    points: [
      "The sodium-potassium pump needs ATP / stops working",
      "Na⁺ and K⁺ concentration gradients run down / are no longer maintained",
      "So the resting potential is lost and Na⁺ cannot diffuse in rapidly enough to depolarise the membrane / no action potential",
    ],
    modelAnswer: "The sodium-potassium pump needs ATP, so it stops. Na⁺ leaks in and K⁺ leaks out until the concentration gradients run down. The resting potential is then lost, and there is no steep sodium gradient to drive the rapid entry of Na⁺, so action potentials can no longer be produced. This takes time because each action potential moves only a tiny fraction of the ions.",
    explanation: "Link ATP → pump → gradients → no action potential.",
    hints: ["Which process at rest needs ATP?"],
  });

  // Practice structured: a trace given as data
  const times = [0.3, 0.6, 0.9, 1.2, 1.5, 1.8, 2.1, 2.4, 2.7];
  const mv = [-68, -50, 38, 5, -58, -79, -73, -71, -68];
  const ampS = Math.max(...mv) - mv[0];
  chk(ampS, 106);
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `Thandeka recorded the potential difference across the membrane at one point on an axon after a single stimulus.\n\n${table(["Time / ms", ...times.map((x) => x.toFixed(1))], [["Potential / mV", ...mv.map((v) => (v > 0 ? `+${v}` : String(v).replace("-", "−")))]])}`,
    parts: [
      P.num({
        label: "(a)", marks: 1, stem: "State the resting potential of this axon, in mV.",
        value: -68, unit: "mV", wrong: [68],
        explanation: "−68 mV, the first reading and again at 2.7 ms.",
      }),
      P.num({
        label: "(b)", marks: 1, stem: "Calculate the change in potential from the resting value to the peak, in mV.",
        value: ampS, unit: "mV", wrong: [38],
        explanation: `${Math.max(...mv)} − (−68) = ${ampS} mV.`,
      }),
      P.mcq({
        label: "(c)", stem: "At which time were voltage-gated potassium channels most likely to be open while sodium channels were closed?",
        options: [
          ["1.2 ms", "Correct: the potential is falling from the peak (repolarisation)."],
          ["0.6 ms", "At 0.6 ms the membrane is depolarising towards the peak."],
          ["2.7 ms", "By 2.7 ms the potential is back at rest; the channels are closed."],
          ["0.3 ms", "This is the first reading, at the resting potential."],
        ],
        answer: "A",
        explanation: "Between 0.9 and 1.5 ms the potential falls: K⁺ channels open, Na⁺ channels closed.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Explain the change in potential between 0.6 ms and 0.9 ms.",
        points: [
          "Threshold has been reached (about −50 mV at 0.6 ms)",
          "Voltage-gated Na⁺ channels open (many, by positive feedback)",
          "Na⁺ diffuse in, so the inside becomes positive, reaching +38 mV",
        ],
        modelAnswer: "By 0.6 ms the membrane had reached the threshold of about −50 mV, so many voltage-gated sodium channels opened. Sodium ions diffused in down their electrochemical gradient, making the inside positive and raising the potential to +38 mV at 0.9 ms.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain why the potential at 1.8 ms is lower than the resting potential.",
        points: [
          "Hyperpolarisation: voltage-gated K⁺ channels are slow to close",
          "So more K⁺ leaves than at rest, making the inside more negative (−79 mV)",
        ],
        modelAnswer: "The voltage-gated potassium channels are slow to close, so potassium ions continue to diffuse out after the resting value is reached, making the inside more negative (−79 mV): hyperpolarisation.",
      }),
    ],
    explanation: "A trace: rest, threshold, depolarisation (Na⁺ in), repolarisation (K⁺ out), hyperpolarisation, return to rest.",
    hints: ["Match each phase of the trace to the channels open."],
    calculator: true,
  });

  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "An axon was stimulated with single stimuli of increasing strength. Responses were recorded as follows: stimulus 1 gave a small change of 6 mV that died away; stimulus 2 gave a change of 12 mV that died away; stimulus 3 and stimulus 4 each gave an action potential reaching +35 mV.",
    parts: [
      P.short({
        label: "(a)", marks: 1, stem: "Name the potential that must be reached for an action potential to occur.",
        accepted: ["threshold", "threshold potential", "the threshold", "threshold value"],
        wrong: ["resting potential"],
        explanation: "The threshold.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Explain why stimuli 1 and 2 did not produce action potentials.",
        points: [
          "The depolarisation did not reach the threshold",
          "Not enough voltage-gated Na⁺ channels opened to start positive feedback / all-or-nothing",
        ],
        modelAnswer: "Stimuli 1 and 2 depolarised the membrane by only 6 and 12 mV, so it did not reach the threshold; too few voltage-gated sodium channels opened for the rapid influx of Na⁺ that produces an action potential.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Stimulus 4 was stronger than stimulus 3. Explain why the action potentials were the same size.",
        points: [
          "All-or-nothing principle: once threshold is reached a full action potential occurs",
          "The size depends on the Na⁺ gradient / Na⁺ channels, not on stimulus strength",
        ],
        modelAnswer: "Action potentials are all-or-nothing: once the threshold is reached, the voltage-gated sodium channels open fully and the potential rises to the same peak, set by the sodium gradient, whatever the stimulus strength.",
      }),
      P.manual({
        label: "(d)", marks: 1, stem: "Suggest how a sensory neurone would signal that a stimulus was stronger.",
        points: ["By a higher frequency of action potentials"],
        modelAnswer: "It would produce action potentials more frequently.",
      }),
    ],
    explanation: "Threshold, all-or-nothing, frequency coding.",
    hints: ["Compare the sub-threshold and full responses."],
  });

  b.card("DEFINITION", "Define **resting potential**.", "The potential difference across the membrane of a neurone not transmitting an impulse: about −70 mV, inside negative.");
  b.card("DEFINITION", "Define **action potential**.", "A rapid, temporary reversal of membrane potential (about −70 mV to about +30 to +40 mV and back) caused by voltage-gated ion channels.");
  b.card("FACT", "What does the sodium-potassium pump move per ATP?", "3 Na⁺ out and 2 K⁺ in.");
  b.card("CONCEPT", "Why is the resting membrane more permeable to K⁺ than to Na⁺?", "Some K⁺ channels are open at rest while voltage-gated Na⁺ channels are closed; K⁺ diffuses out, leaving the inside negative.");
  b.card("CONCEPT", "Ion movements in depolarisation and repolarisation", "Depolarisation: voltage-gated Na⁺ channels open, Na⁺ in. Repolarisation: Na⁺ channels close, voltage-gated K⁺ channels open, K⁺ out.");
  b.card("CONCEPT", "What causes hyperpolarisation?", "Voltage-gated K⁺ channels are slow to close, so too much K⁺ leaves; potential overshoots to about −80 mV.");
  b.card("DEFINITION", "What is the **all-or-nothing principle**?", "If threshold is reached a full-sized action potential always occurs; below threshold none occurs.");
  b.card("DEFINITION", "Define **refractory period**.", "The time after an action potential when another cannot be produced (absolute) or needs a stronger stimulus (relative).");
  b.card("DEFINITION", "Why is a receptor called a **transducer**?", "It converts the energy of a stimulus into an electrical change (receptor potential).");
  b.card("FORMULA", "Maximum frequency of impulses", "Maximum frequency = 1 ÷ refractory period (in seconds).");
});
