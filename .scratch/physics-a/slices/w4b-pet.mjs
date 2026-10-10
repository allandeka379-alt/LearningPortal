// W4b: aphys.medical.pet (Cambridge A Level only, 24.3) — tracers, β+ emitters, annihilation (mass-energy and momentum),
// photon energy m_e c², coincidence detection, locating the annihilation from arrival times, image building.
import { concept, P, t, sfStr, dpStr, sciTex, DATA, pctUnc } from "../lib.mjs";

const { me, c, e, h } = DATA;
const Eg = me * c * c;

concept("aphys.medical.pet", { file: "medical/pet", keyPrefix: "medical.pet" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Why must the radioactive tracer used in PET scanning be a β⁺ emitter?",
    options: [
      ["Its positrons annihilate with electrons, giving gamma-photon pairs that leave the body.", "Correct: PET detects the annihilation photons."],
      ["Positrons travel far enough through the body to reach the detectors around the patient.", "Positrons travel only about a millimetre before annihilating."],
      ["β⁺ emitters have the longest half-lives, so the scan can last for days.", "PET tracers have short half-lives (fluorine-18: about 110 minutes)."],
      ["Positrons are not ionising, so the tracer is harmless.", "Positrons and the gamma photons are ionising; the dose is kept small."],
    ],
    answer: "A",
    explanation: "β⁺ → positron → annihilation → two gamma photons detected outside the body.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A positron and an electron, both almost at rest, annihilate. Why are two photons produced, travelling in opposite directions?",
    options: [
      ["The initial momentum is zero, so the photons' momenta must cancel.", "Correct: conservation of momentum."],
      ["The initial charge is zero, so two photons of opposite charge are needed.", "Photons have no charge; charge conservation is satisfied with any number of photons."],
      ["Each particle produces its own photon, which continues in the particle's direction.", "The particles are almost at rest; the direction is fixed by momentum conservation."],
      ["Energy can only be conserved if the photons travel in opposite directions.", "Energy is a scalar; it is momentum, a vector, that fixes the directions."],
    ],
    answer: "A",
    explanation: "A single photon would carry momentum E/c; zero total momentum needs two equal and opposite photons.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "What is the approximate energy of each gamma photon produced when a positron and an electron annihilate at rest?",
    options: [
      ["0.51 MeV", "Correct: each photon carries m_e c²."],
      ["1.02 MeV", "This is the total for both photons, 2m_e c²."],
      ["0.26 MeV", "This halves m_e c²; each photon carries the full rest energy of one particle."],
      ["511 eV", "This is a thousand times too small: the rest energy of an electron is 0.511 MeV."],
    ],
    answer: "A",
    explanation: "E = m_e c² ≈ 8.2 × 10⁻¹⁴ J ≈ 0.51 MeV for each photon.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which signals does a PET scanner use to locate the tracer?",
    options: [
      ["Pairs of gamma photons reaching opposite detectors in the ring almost simultaneously", "Correct: coincidence detection defines a line through the annihilation point."],
      ["Positrons that escape from the patient's body and strike the detectors in the ring", "Positrons annihilate inside the body within about a millimetre."],
      ["Single gamma photons arriving at any detector", "Single photons are rejected: one photon does not define a line."],
      ["X-rays transmitted through the patient from an external source", "That is CT; PET uses radiation emitted from inside the body."],
    ],
    answer: "A",
    explanation: "Coincident photon pairs give lines of response; arrival times locate the point along each line.",
    hints: ["What actually leaves the patient's body?"],
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Which combination of properties makes a substance most suitable as a PET tracer?",
    options: [
      ["A β⁺ emitter with a half-life of a few hours, attached to a molecule the tissue absorbs", "Correct: it gives annihilation photons, lasts long enough to scan and then decays away."],
      ["A β⁻ emitter with a half-life of several years, attached to a molecule absorbed by bone", "β⁻ emitters give no annihilation photons, and a long half-life gives a large dose."],
      ["An α emitter with a half-life of a few seconds, injected as a pure element", "α particles do not leave the body, and the tracer would decay before reaching the tissue."],
      ["A β⁺ emitter with a half-life of a few seconds, attached to a glucose-like molecule", "It would decay before it could be made, injected and absorbed."],
    ],
    answer: "A",
    explanation: "Positron emitter, absorbed where needed, half-life of minutes to hours.",
    hints: ["Think about what must be emitted and how long the procedure takes."],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Two detectors on opposite sides of a PET ring register a coincident pair of photons at exactly the same time. Where did the annihilation occur?",
    options: [
      ["At the midpoint of the line joining the two detectors", "Correct: equal path lengths give equal travel times."],
      ["At the centre of the patient's body, wherever the detectors are", "The line joining the detectors need not pass through the centre of the body."],
      ["Next to one of the two detectors", "Then one photon would arrive much earlier than the other."],
      ["Anywhere on the line joining the detectors", "Equal arrival times fix the point at the middle of the line."],
    ],
    answer: "A",
    explanation: "Δt = 2x/c = 0, so x = 0: the midpoint.",
    hints: ["Both photons travel at c."],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Suppose a positron-electron pair annihilates while still moving with a small total momentum. How do the two photons differ from those of a pair annihilating at rest?",
    options: [
      ["Their total energy is slightly greater and they are not exactly back to back.", "Correct: extra kinetic energy adds to the photon energy, and their momenta must add up to the pair's momentum."],
      ["Their total energy is slightly smaller and they travel in exactly opposite directions.", "Kinetic energy adds to, not subtracts from, the energy released; and non-zero momentum prevents exactly opposite paths."],
      ["Only one photon is produced, carrying the extra momentum.", "One photon is possible only in the presence of a nucleus; two are still produced here."],
      ["The photons are exactly the same as for annihilation at rest.", "Both the energy and the directions change slightly."],
    ],
    answer: "A",
    explanation: "Total energy = 2m_e c² + kinetic energy; the photon momenta must sum to the non-zero initial momentum, so the angle between them is slightly less than 180°.",
    hints: ["Apply conservation of energy and of momentum separately."],
  });
  b.num({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: t`Calculate the energy, in J, of each photon produced when an electron and a positron annihilate at rest.`,
    value: Eg, unit: "J", wrong: [2 * Eg, me * c],
    explanation: t`$E = m_ec^2 = 9.11 \times 10^{-31} \times (3.00 \times 10^{8})^2 = ${sciTex(Eg)}\ \text{J}$. $2m_ec^2$ is the total for both photons.`,
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Calculate the frequency, in Hz, of each photon produced when a positron and an electron annihilate at rest, to three significant figures.`,
    value: Eg / h, unit: "Hz", wrong: [(2 * Eg) / h, h / Eg],
    explanation: t`$f = \dfrac{E}{h} = \dfrac{m_ec^2}{h} = \dfrac{${sciTex(Eg)}}{6.63 \times 10^{-34}} = ${sciTex(Eg / h)}\ \text{Hz}$.`,
    hints: ["Find E = m_e c² first, then use E = hf."],
  });
  {
    const dt = 0.25e-9;
    const x = (c * dt) / 2;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`In a PET scanner, the two photons from one annihilation arrive at opposite detectors $0.25\ \text{ns}$ apart. Calculate the distance of the annihilation from the midpoint of the line joining the detectors, in cm, to three significant figures.`,
      value: x * 100, unit: "cm", wrong: [c * dt * 100, (c * dt * 100) / 4],
      explanation: t`1. Path difference $= 2x = c\,\Delta t$.
2. $x = \dfrac{3.00 \times 10^{8} \times 0.25 \times 10^{-9}}{2} = ${sfStr(x, 3)}\ \text{m} = ${sfStr(x * 100, 3)}\ \text{cm}$, towards the detector that fired first. Forgetting the factor 2 doubles the answer.`,
      hints: ["The path difference is twice the distance from the midpoint."],
    });
  }
  {
    const x = 0.12;
    const dt = (2 * x) / c;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A PET detector ring has a diameter of $0.80\ \text{m}$. An annihilation occurs on a diameter, $0.12\ \text{m}$ from the centre of the ring. Calculate the difference in the arrival times of the two photons at the ends of that diameter, in ns.`,
      value: dt * 1e9, wrong: [(x / c) * 1e9, (0.8 / c) * 1e9],
      explanation: t`1. Distances to the two detectors: $0.40 + 0.12 = 0.52\ \text{m}$ and $0.40 - 0.12 = 0.28\ \text{m}$; difference $= 0.24\ \text{m} = 2x$.
2. $\Delta t = \dfrac{0.24}{3.00 \times 10^{8}} = ${sciTex(dt, 2)}\ \text{s} = ${sfStr(dt * 1e9, 2)}\ \text{ns}$.`,
      hints: ["Find each photon's path length."],
    });
  }
  {
    const A0 = 900, T = 20, tmin = 30;
    const A = A0 * Math.exp((-0.693 / T) * tmin);
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A dose of carbon-11 tracer, a β⁺ emitter of half-life 20 minutes, has an activity of $900\ \text{MBq}$ when it leaves the cyclotron. The scan starts 30 minutes later. Calculate the activity at the start of the scan, in MBq, to three significant figures.`,
      value: A, wrong: [A0 * (1 - tmin / T / 2), A0 / 2],
      explanation: t`1. $\lambda = \dfrac{0.693}{20} = ${sfStr(0.693 / T, 3)}\ \text{min}^{-1}$; time elapsed $= 30$ min.
2. $A = 900\,e^{-${sfStr(0.693 / T, 3)} \times 30} = ${sfStr(A, 3)}\ \text{MBq}$. The short half-life is why tracers are made close to the hospital.`,
      hints: ["Use A = A₀e^(−λt) with t in minutes."],
    });
  }
  {
    const ddt = 0.3e-9;
    const dx = (c * ddt) / 2;
    b.num({
      d: 4, skill: "EVALUATION", calculator: true,
      stem: t`The detectors in a PET scanner can measure the difference in arrival times only to within $\pm 0.30\ \text{ns}$. Calculate the resulting uncertainty in the position of an annihilation along the line of response, in cm, to two significant figures.`,
      value: dx * 100, sf: 2, unit: "cm", wrong: [c * ddt * 100],
      explanation: t`$\Delta x = \dfrac{c\,\Delta(\Delta t)}{2} = \dfrac{3.00 \times 10^{8} \times 0.30 \times 10^{-9}}{2} = ${sfStr(dx, 2)}\ \text{m} = ${sfStr(dx * 100, 2)}\ \text{cm}$. Timing alone is coarse; combining many crossing lines of response gives millimetre resolution.`,
      hints: ["Use x = cΔt/2 with the timing uncertainty."],
    });
    void pctUnc;
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In PET, the positron travels several centimetres through tissue before it annihilates, so the detectors locate it only roughly.",
    answer: false,
    explanation: "False. The positron travels only about a millimetre before annihilating; the image resolution is limited mainly by the detectors and timing.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each stage of a PET scan with the physics involved.",
    pairs: [
      ["Tracer collects in active tissue", "Tissue absorbs the tracer molecule (e.g. glucose-like FDG)"],
      ["Positron emitted", "β⁺ decay: a proton becomes a neutron in the nucleus"],
      ["Two gamma photons produced", "Annihilation with mass-energy and momentum conserved"],
      ["Photon pair recorded", "Coincidence detection by opposite detectors in the ring"],
      ["Point located on the line", "Difference in arrival times, x = cΔt/2"],
    ],
    explanation: "Tracer → β⁺ → annihilation → coincidence → location → image.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the description of annihilation in PET.",
    template: "A positron meets an electron and their mass is converted into {{blank:a}} gamma photons. Because {{blank:b}} is conserved and the pair is almost at rest, the photons travel in {{blank:c}} directions.",
    blanks: [
      { id: "a", accepted: ["two"], choices: ["two", "one", "three"] },
      { id: "b", accepted: ["momentum"], choices: ["momentum", "charge", "mass"] },
      { id: "c", accepted: ["opposite"], choices: ["opposite", "the same", "perpendicular"] },
    ],
    explanation: "Two photons, equal energy, opposite directions: zero total momentum.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the antiparticle of the electron that is emitted in β⁺ decay.",
    accepted: ["positron", "a positron", "the positron", "anti-electron", "antielectron"],
    explanation: "The positron: same mass as the electron, charge +e.",
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how a PET scanner produces an image showing where a tracer has collected in the body.",
    points: [
      "The patient is surrounded by a ring of gamma detectors (scintillators and photomultipliers).",
      "Only pairs of photons arriving at opposite detectors at almost the same time (coincidence) are recorded; each pair defines a line through the annihilation point.",
      "The difference in arrival times gives the position along the line (x = cΔt/2), towards the detector that fired first.",
      "A computer combines millions of events to build a 3D map of the number of annihilations, i.e. the tracer concentration.",
    ],
    modelAnswer: "The patient lies inside a ring of gamma detectors. When two photons from one annihilation strike opposite detectors within a few nanoseconds of each other, the pair is accepted, and the annihilation must lie on the line joining the detectors. The difference in their arrival times shows how far from the midpoint it was, x = cΔt/2, towards the detector that fired first. A computer combines millions of such events into a three-dimensional map of where annihilations occur, which shows the concentration of the tracer.",
    explanation: "Ring → coincidence → line → timing → computer image.",
    hints: ["Start with what the detectors record."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "A positron and an electron, both at rest, annihilate. Explain why two photons of equal energy are produced travelling in opposite directions.",
    points: [
      "Total momentum before is zero, so the total momentum after must be zero (conservation of momentum).",
      "A single photon has momentum E/c, so at least two photons are needed, with momenta equal in size and opposite in direction.",
      "Equal momenta mean equal energies (E = pc), each m_e c², sharing the total 2m_e c² (conservation of mass-energy).",
    ],
    modelAnswer: "Before annihilation the total momentum is zero, so it must be zero afterwards. A photon always carries momentum E/c, so one photon cannot be produced alone; two photons with equal and opposite momenta are needed. Equal momenta mean equal energies, so each photon carries half the total energy 2m_ec², that is m_ec².",
    explanation: "Momentum fixes direction; mass-energy fixes energy.",
    hints: ["A photon's momentum is E/c."],
  });

  // Practice structured: a PET scan of a patient (12 marks)
  {
    const A0 = 400, T = 110, tmin = 75;
    const A = A0 * Math.exp((-0.693 / T) * tmin);
    const dt = 0.18e-9;
    const x = (c * dt) / 2;
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A patient is given an injection of a glucose-like compound labelled with a β⁺ emitter of half-life 110 minutes, with an activity of $400\ \text{MBq}$. The scan begins 75 minutes later.`,
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: "Explain what is meant by a tracer and why this one collects in a tumour.", points: [
          "A tracer is a compound containing radioactive nuclei that is introduced into the body and absorbed by the tissue studied, its radiation being detected outside the body.",
          "Tumour cells use glucose rapidly, so they absorb more of the glucose-like tracer than surrounding tissue.",
        ], modelAnswer: "A tracer is a compound containing radioactive nuclei that is put into the body, absorbed by the tissue being studied and detected from outside by its radiation. Tumour cells take up glucose quickly, so they absorb more of the glucose-like tracer than the healthy tissue around them." }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the activity at the start of the scan, in MBq, to three significant figures.", value: A, wrong: [A0 * (1 - tmin / (2 * T))], explanation: t`$A = 400\,e^{-(0.693/110) \times 75} = ${sfStr(A, 3)}\ \text{MBq}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the energy of each annihilation photon, in MeV, to three significant figures.", value: Eg / e / 1e6, unit: "MeV", wrong: [(2 * Eg) / e / 1e6], explanation: t`$m_ec^2 = ${sciTex(Eg)}\ \text{J}$; $\dfrac{${sciTex(Eg)}}{1.60 \times 10^{-19}} = ${sciTex(Eg / e)}\ \text{eV} = ${sfStr(Eg / e / 1e6, 3)}\ \text{MeV}$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the momentum of each photon, in N s, to three significant figures.", value: Eg / c, unit: "N s", wrong: [Eg * c], explanation: t`$p = \dfrac{E}{c} = \dfrac{${sciTex(Eg)}}{3.00 \times 10^{8}} = ${sciTex(Eg / c)}\ \text{N s}$.` }),
        P.num({ label: "(e)", marks: 2, stem: t`For one event the photons reach opposite detectors $0.18\ \text{ns}$ apart. Calculate the distance of the annihilation from the midpoint of the line joining the detectors, in cm, to two significant figures.`, value: x * 100, sf: 2, unit: "cm", wrong: [c * dt * 100], explanation: t`$x = \dfrac{c\Delta t}{2} = \dfrac{3.00 \times 10^{8} \times 0.18 \times 10^{-9}}{2} = ${sfStr(x * 100, 2)}\ \text{cm}$.` }),
        P.manual({ label: "(f)", marks: 2, stem: "Suggest why this isotope, with a half-life of about two hours, is preferred to an isotope with a half-life of several days.", points: [
          "Short half-life: a high activity (many events, short scan) is obtained from a small number of nuclei, and the activity in the patient falls quickly afterwards.",
          "So the total radiation dose to the patient (and to people near them) is smaller; yet two hours is long enough to prepare, inject and scan.",
        ], modelAnswer: "With a short half-life, a small amount of tracer gives a high activity, so the scan is quick, and the activity in the body falls away within hours, keeping the patient's total dose small. Two hours is still long enough to make the tracer, inject it and complete the scan." }),
      ],
      explanation: "Tracer decay, photon energy m_e c², momentum E/c, position from x = cΔt/2.",
      hints: ["Each photon has energy m_e c².", "x = cΔt/2."],
    });
  }
  // Practice structured: annihilation and the conservation laws (8 marks)
  {
    const lam = (h * c) / Eg;
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A positron emitted by a tracer comes to rest in tissue and annihilates with an electron that is also at rest.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the total energy released, in J, to three significant figures.", value: 2 * Eg, unit: "J", wrong: [Eg], explanation: t`$2m_ec^2 = 2 \times ${sciTex(Eg)} = ${sciTex(2 * Eg)}\ \text{J}$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the wavelength of each photon, in pm, to three significant figures.", value: lam * 1e12, unit: "pm", wrong: [((h * c) / (2 * Eg)) * 1e12], explanation: t`$\lambda = \dfrac{hc}{m_ec^2} = ${sciTex(lam)}\ \text{m} = ${sfStr(lam * 1e12, 3)}\ \text{pm}$.` }),
        P.manual({ label: "(c)", marks: 2, stem: "State which conservation law fixes (i) the photon energy and (ii) the photon directions.", points: [
          "(i) Conservation of mass-energy: 2m_e c² shared equally between the two photons.",
          "(ii) Conservation of momentum: zero initial momentum, so the photons travel in opposite directions.",
        ], modelAnswer: "(i) Conservation of mass-energy: the rest energy 2m_ec² is shared equally, so each photon has m_ec². (ii) Conservation of momentum: the total momentum was zero, so the two photons must travel in opposite directions with equal momenta." }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain why these photons, rather than the positrons, are detected outside the body.", points: [
          "Positrons are charged and annihilate within about a millimetre of where they are emitted.",
          "The 0.51 MeV gamma photons are highly penetrating, so most pass out of the body to the detectors.",
        ], modelAnswer: "Positrons are charged and lose their energy quickly, annihilating within about a millimetre. The 0.51 MeV gamma photons are very penetrating and most of them leave the body, so they reach the detectors." }),
      ],
      explanation: "Annihilation at rest: 2m_e c² shared between two opposite photons.",
      hints: ["λ = hc/E."],
    });
  }

  b.card("DEFINITION", "**Radioactive tracer**", "A compound containing radioactive nuclei, introduced into the body and absorbed by the tissue studied; its emissions are detected outside the body.");
  b.card("CONCEPT", "Why a β⁺ emitter?", "Positrons annihilate with electrons, giving two gamma photons that leave the body.");
  b.card("DEFINITION", "**Annihilation**", "A particle and its antiparticle meet; their mass becomes photon energy, with mass-energy, momentum and charge conserved.");
  b.card("FORMULA", "Photon energy in PET", t`$E_{\gamma} = m_ec^2 = 8.20 \times 10^{-14}\ \text{J} \approx 0.51\ \text{MeV}$ each`);
  b.card("CONCEPT", "Two photons, opposite directions", "Zero initial momentum: the photons' momenta (E/c) must cancel.");
  b.card("CONCEPT", "Coincidence detection", "Photons arriving at opposite detectors within a few ns are paired; the annihilation lies on the line joining them.");
  b.card("FORMULA", "Position along the line", t`$x = \dfrac{c\,\Delta t}{2}$ from the midpoint, towards the detector that fired first`);
  b.card("FACT", "Fluorine-18 (FDG)", "β⁺ emitter, half-life about 110 minutes, attached to a glucose-like molecule absorbed by active tissue.");
  b.card("CONCEPT", "Building the image", "A computer combines millions of lines of response to map tracer concentration in 3D.");
});
