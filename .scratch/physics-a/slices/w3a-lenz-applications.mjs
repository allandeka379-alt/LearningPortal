// W3a: aphys.induction.lenz-applications — Lenz's law and energy, directions (Lenz, right-hand rule), falling
// magnets through coils and tubes, eddy currents and braking, a.c. generator E₀ = BANω, back e.m.f. in outline.
import { concept, P, t, chk, sfStr, dpStr, sciTex, rad, pctUnc } from "../lib.mjs";

concept("aphys.induction.lenz-applications", { file: "induction/lenz-applications", keyPrefix: "induction.lenz-applications" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement is Lenz's law?",
    options: [
      ["The direction of the induced e.m.f. is such that it tends to oppose the change producing it.", "Correct: Lenz's law gives the direction."],
      ["The size of the induced e.m.f. equals the rate of change of flux linkage.", "This is Faraday's law, which gives the size."],
      ["The induced current always flows in the same direction as the current that produced the field.", "The direction depends on whether the flux is increasing or decreasing."],
      ["The induced current always opposes the magnetic flux through the circuit.", "It opposes the change in flux, not the flux itself."],
    ],
    answer: "A",
    explanation: "Lenz's law: the induced e.m.f. (and any current) acts to oppose the change in flux linkage that causes it.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Lenz's law is a consequence of which principle?",
    options: [
      ["conservation of energy", "Correct: the opposing force means work must be done to produce the electrical energy."],
      ["conservation of charge", "Charge conservation underlies Kirchhoff's first law, not the direction of induced currents."],
      ["conservation of momentum", "Momentum does not decide the direction of the induced current."],
      ["Newton's first law", "Lenz's law is about energy transfer, not about inertia."],
    ],
    answer: "A",
    explanation: "If induced currents aided the change, they would produce electrical energy and accelerate the magnet with no work done: energy would be created. Opposition means work is done, which becomes electrical energy.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "The north pole of a magnet is pushed towards one end of a coil that forms a closed circuit. What happens at that end of the coil?",
    options: [
      ["It becomes a north pole, repelling the magnet.", "Correct: opposing the approach."],
      ["It becomes a south pole, attracting the magnet.", "Attraction would aid the motion and create energy from nothing."],
      ["It becomes a north pole, attracting the magnet.", "Like poles repel; a north pole facing a north pole cannot attract."],
      ["No pole forms, because the coil is not made of iron.", "The induced current makes the coil an electromagnet."],
    ],
    answer: "A",
    explanation: "The induced current opposes the approach of the north pole, so the near end of the coil becomes a north pole and repels the magnet.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A magnet falls through a coil connected to a data logger. Which describes the e.m.f.–time graph?",
    options: [
      ["two pulses of opposite sign; the second is taller and narrower, and the two areas are equal", "Correct: the magnet speeds up, and each area equals the same change of flux linkage."],
      ["two pulses of the same sign and the same size", "Flux increases on entry and decreases on exit, so the signs are opposite."],
      ["two pulses of opposite sign; the second is smaller and wider because the coil slows the magnet", "The magnet is still accelerating under gravity, so it leaves faster than it enters."],
      ["one long pulse while the magnet is inside the coil", "While the magnet is in the middle the flux changes little; the e.m.f. peaks on entry and exit."],
    ],
    answer: "A",
    explanation: "Entry: flux linkage rises (one sign). Exit: flux falls (opposite sign), faster because the magnet has accelerated, so a taller, narrower pulse. Each area = the same Δ(NΦ), so the areas are equal.",
    hints: ["Is the magnet faster as it enters or as it leaves?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "A strong magnet is dropped down a vertical copper tube and falls slowly. What is the main reason?",
    options: [
      ["Eddy currents induced in the tube produce magnetic fields that oppose the magnet's motion.", "Correct: Lenz's law applied to the rings of the tube."],
      ["Copper is attracted to magnets, so the magnet rubs against the walls of the tube as it falls.", "Copper is not ferromagnetic; a stationary magnet is not attracted to it."],
      ["Air trapped below the magnet cannot escape quickly, so it cushions and slows the falling magnet.","The same magnet falls freely through a plastic tube of the same size."],
      ["The magnet loses its magnetism by heating the copper.", "Its magnetism is not lost; the kinetic energy it would have gained becomes heat in the tube."],
    ],
    answer: "A",
    explanation: "The changing flux induces eddy currents in the tube. Below the magnet they repel it; above they attract it. The opposing force quickly balances the weight, giving a low terminal speed.",
    hints: ["What happens in the tube when the flux through it changes?"],
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Why are the iron cores of transformers made of thin insulated sheets (laminations)?",
    options: [
      ["to reduce eddy currents and the energy they waste as heat", "Correct: the insulation breaks up the current paths."],
      ["to make the core lighter so it is easier to install", "Mass is not the reason; the core would be just as heavy."],
      ["to increase the eddy currents so the core is magnetised more", "Eddy currents waste energy and oppose the change of flux."],
      ["to stop the core from conducting the main current between the coils", "The coils are insulated anyway; the energy is transferred by the changing flux."],
    ],
    answer: "A",
    explanation: "A solid core would carry large eddy currents, heating it and wasting energy. Thin insulated laminations limit the eddy currents.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A flat coil rotates at constant speed in a uniform magnetic field. At which position is the induced e.m.f. a maximum?",
    options: [
      ["when the plane of the coil is parallel to the field and the flux linkage is zero", "Correct: the flux linkage is changing fastest here."],
      ["when the plane of the coil is perpendicular to the field and the flux linkage is a maximum", "Here the flux linkage is momentarily constant, so E = 0."],
      ["when the plane of the coil is at 45° to the field", "E ∝ sin ωt reaches its peak at 90°, not 45°."],
      ["the e.m.f. is the same at every position because the speed is constant", "The rate of change of flux linkage varies with angle."],
    ],
    answer: "A",
    explanation: "NΦ = BAN cos ωt, so E = BANω sin ωt: largest when the normal is at 90° to the field, i.e. the plane is parallel to the field and NΦ = 0.",
    hints: ["E is the gradient of the flux-linkage graph."],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "The rotation speed of a simple a.c. generator is doubled. What happens to the peak e.m.f. and the frequency?",
    options: [
      ["both double", "Correct: E₀ = BANω and f = ω/2π."],
      ["the peak e.m.f. doubles; the frequency is unchanged", "Faster rotation means more cycles per second."],
      ["the frequency doubles; the peak e.m.f. is unchanged", "The flux linkage changes twice as fast, so E₀ doubles too."],
      ["the peak e.m.f. quadruples; the frequency doubles", "E₀ is proportional to ω, not ω²."],
    ],
    answer: "A",
    explanation: "E₀ = BANω ∝ ω, and f = ω/(2π): both double.",
    hints: ["Write E₀ in terms of ω."],
  });
  // Numerical
  {
    const B = 0.20, A = 0.0080, N = 150, f = 25;
    const w = 2 * Math.PI * f, E0 = B * A * N * w;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A coil of $150$ turns and area $80\ \text{cm}^2$ rotates at $25$ revolutions per second in a uniform field of $0.20\ \text{T}$. Using $E_0 = BAN\omega$, calculate the peak e.m.f., in V, to three significant figures.`,
      value: E0, unit: "V", wrong: [B * A * N * f, B * 80 * N * w],
      explanation: t`$\omega = 2\pi \times 25 = ${sfStr(w, 3)}\ \text{rad s}^{-1}$; $E_0 = 0.20 \times 0.0080 \times 150 \times ${sfStr(w, 3)} = ${sfStr(E0, 3)}\ \text{V}$. Using $f$ instead of $\omega$ gives an answer $2\pi$ times too small.`,
      hints: ["ω = 2πf; 1 cm² = 10⁻⁴ m²."],
    });
  }
  {
    const V = 24, R = 2.0, I = 1.5;
    const Eb = V - I * R;
    b.num({
      d: 3, skill: "APPLICATION", daily: true, calculator: true,
      stem: t`A $24\ \text{V}$ d.c. motor has a coil resistance of $2.0\ \Omega$. When running at full speed it draws $1.5\ \text{A}$. Calculate the back e.m.f., in V.`,
      value: Eb, unit: "V", wrong: [V / R, I * R],
      explanation: t`$V = E_{\text{back}} + IR$, so $E_{\text{back}} = 24 - 1.5 \times 2.0 = ${Eb}\ \text{V}$.`,
      hints: ["The supply p.d. is shared between the back e.m.f. and the p.d. across the coil's resistance."],
    });
  }
  {
    const V = 24, R = 2.0;
    b.num({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: t`For the same $24\ \text{V}$ motor with coil resistance $2.0\ \Omega$, calculate the current at the instant it is switched on, in A.`,
      value: V / R, unit: "A", wrong: [1.5],
      explanation: t`At switch-on the coil is not rotating, so the back e.m.f. is zero: $I = V/R = 24/2.0 = ${V / R}\ \text{A}$, eight times the running current. Motors are often started through a series resistance for this reason.`,
    });
  }
  {
    const B = 0.50, A = 0.020, N = 80, E0 = 300;
    const w = E0 / (B * A * N), f = w / (2 * Math.PI);
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A generator coil of $80$ turns and area $0.020\ \text{m}^2$ rotates in a field of $0.50\ \text{T}$. Calculate the number of revolutions per second needed to give a peak e.m.f. of $300\ \text{V}$, to three significant figures.`,
      value: f, unit: "Hz", wrong: [w, E0 / (B * A * N * 2)],
      explanation: t`1. $\omega = \dfrac{E_0}{BAN} = \dfrac{300}{0.50 \times 0.020 \times 80} = ${sfStr(w, 3)}\ \text{rad s}^{-1}$.
2. $f = \dfrac{\omega}{2\pi} = ${sfStr(f, 3)}$ revolutions per second.
3. Giving $\omega$ as the answer confuses rad s⁻¹ with revolutions per second.`,
      hints: ["Find ω first, then f = ω/2π."],
    });
  }
  {
    const B = 0.40, A = 0.0050, N = 100, w = 120;
    const th = 30;
    const E = B * A * N * w * Math.sin(rad(th));
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A coil of $100$ turns and area $50\ \text{cm}^2$ rotates at $120\ \text{rad s}^{-1}$ in a field of $0.40\ \text{T}$. Calculate the instantaneous e.m.f. when the normal to the coil makes $30^\circ$ with the field, in V, to three significant figures.`,
      value: E, unit: "V", wrong: [B * A * N * w * Math.cos(rad(th)), B * A * N * w],
      explanation: t`1. $E_0 = BAN\omega = 0.40 \times 0.0050 \times 100 \times 120 = ${sfStr(B * A * N * w, 3)}\ \text{V}$.
2. $E = E_0\sin\theta$ with $\theta$ between the normal and the field (the flux linkage is $BAN\cos\theta$).
3. $E = ${sfStr(B * A * N * w, 3)} \times \sin 30^\circ = ${sfStr(E, 3)}\ \text{V}$. Using $\cos 30^\circ$ confuses the e.m.f. with the flux linkage.`,
      hints: ["The e.m.f. is zero when the normal is along the field."],
    });
  }
  // Uncertainty / practical
  {
    const t1 = [0.82, 0.78, 0.85], L = 1.50;
    const tm = (t1[0] + t1[1] + t1[2]) / 3, dt = (Math.max(...t1) - Math.min(...t1)) / 2;
    const pct = pctUnc(dt, tm);
    b.num({
      d: 3, skill: "EVALUATION", calculator: true,
      stem: t`Nyasha times a magnet falling through a $1.50\ \text{m}$ copper tube: $0.82\ \text{s}$, $0.78\ \text{s}$ and $0.85\ \text{s}$. Using half the range as the uncertainty, calculate the percentage uncertainty in the mean time, to two significant figures.`,
      value: pct, sf: 2, unit: "%", wrong: [pctUnc(2 * dt, tm)],
      explanation: t`Mean $= ${sfStr(tm, 3)}\ \text{s}$; half-range $= (0.85 - 0.78)/2 = ${dpStr(dt, 3)}\ \text{s}$; percentage uncertainty $= \dfrac{${dpStr(dt, 3)}}{${sfStr(tm, 3)}} \times 100 = ${sfStr(pct, 2)}\%$. A light gate at each end would remove reaction time.`,
      hints: ["Half the range of the three readings."],
    });
    chk(L, 1.5);
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A magnet falls more slowly through a copper tube that has a narrow slit cut along its whole length than through an identical tube without a slit.",
    answer: false,
    explanation: "False. The slit breaks the circular paths of the eddy currents, so much smaller currents flow and the braking force is much weaker: the magnet falls faster through the slit tube.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each device with the effect it relies on or the reason for a feature.",
    pairs: [
      ["truck eddy-current retarder", "magnetic braking by eddy currents in a rotating disc"],
      ["laminated transformer core", "reducing energy wasted by eddy currents"],
      ["slip rings on a generator", "taking alternating current out of a rotating coil"],
      ["starting resistor for a large motor", "limiting the current before back e.m.f. builds up"],
    ],
    explanation: "Retarders use eddy-current braking; laminations reduce eddy-current losses; slip rings connect the rotating coil to the external circuit; a starting resistor protects a motor until its back e.m.f. rises.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements.",
    template: "For the direction of an induced current in a moving conductor, use Fleming's {{blank:a}}-hand rule. The induced current produces a force that {{blank:b}} the motion. In a generator, the e.m.f. is zero when the plane of the coil is {{blank:c}} to the field.",
    blanks: [
      { id: "a", accepted: ["right"], choices: ["right", "left"] },
      { id: "b", accepted: ["opposes"], choices: ["opposes", "assists"] },
      { id: "c", accepted: ["perpendicular"], choices: ["perpendicular", "parallel"] },
    ],
    explanation: "Right hand for generators; Lenz: the force opposes the motion; E = 0 when the plane is perpendicular to B (maximum, momentarily constant flux).",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "State Lenz's law and explain how it follows from the principle of conservation of energy.",
    points: [
      "Lenz's law: the induced e.m.f./current is in a direction that opposes the change (in flux linkage) producing it.",
      "Because of the opposition, work must be done (e.g. pushing a magnet against repulsion) to produce the induced current.",
      "That work is the source of the electrical energy; if the current aided the change, electrical (and kinetic) energy would be created from nothing, violating conservation of energy.",
    ],
    modelAnswer: "Lenz's law states that the direction of an induced e.m.f. is such as to oppose the change in flux linkage causing it. Because the induced current opposes the change, an external agent must do work against it, and this work becomes the electrical energy in the circuit. If the induced current helped the change, the motion would speed up and electrical energy would also be produced with no work done, creating energy and breaking the conservation of energy.",
    explanation: "Opposition means work is done; the work becomes electrical energy.",
    hints: ["What would happen if the current aided the change?"],
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Explain how eddy currents slow down a metal disc rotating between the poles of an electromagnet in a truck's retarder.",
    points: [
      "As the disc moves through the field, the flux through parts of the disc changes, inducing e.m.f.s and circulating eddy currents in the disc.",
      "By Lenz's law, the eddy currents produce forces (F = BIL on the currents in the field) that oppose the motion of the disc.",
      "The kinetic energy of the truck is converted into heat (internal energy) in the disc; the braking is stronger at higher speeds and involves no friction or wear.",
    ],
    modelAnswer: "As the disc turns through the field, the flux through each region of the disc changes, inducing eddy currents that circulate in the metal. The currents lie in the field, so they experience forces which, by Lenz's law, oppose the rotation. The truck's kinetic energy becomes heat in the disc, with no rubbing parts to wear out, and the braking force is greater at higher speed.",
    explanation: "Changing flux → eddy currents → opposing force → heat.",
    hints: ["Apply Lenz's law to the currents in the disc."],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: t`A flat coil of $N$ turns and area $A$ rotates at constant angular speed $\omega$ in a uniform field $B$. Starting from the flux linkage, show that the induced e.m.f. is $E = BAN\omega\sin\omega t$ and state where in the rotation it is greatest.`,
    points: [
      t`With $\theta = \omega t$ the angle between the normal and the field, the flux linkage is $N\Phi = BAN\cos\omega t$.`,
      t`By Faraday's (and Lenz's) law $E = -\dfrac{d(N\Phi)}{dt}$.`,
      t`$E = -BAN \times (-\omega\sin\omega t) = BAN\omega\sin\omega t$.`,
      "Greatest (E₀ = BANω) when sin ωt = ±1: the plane of the coil is parallel to the field (flux linkage zero, changing fastest).",
    ],
    modelAnswer: t`Taking $\theta = \omega t$ between the normal and the field, $N\Phi = BAN\cos\omega t$. Faraday's law with Lenz's sign gives $E = -d(N\Phi)/dt = BAN\omega\sin\omega t$. The e.m.f. is greatest, $E_0 = BAN\omega$, when the plane of the coil is parallel to the field, where the flux linkage is zero but changing fastest.`,
    explanation: "Differentiate NΦ = BAN cos ωt.",
    hints: ["Write the flux linkage as a function of time first."],
  });
  // Practice structured: magnet falling through a coil
  {
    const N = 400, dPhi = 6.0e-5;
    const t1 = 0.030, t2 = 0.018; // durations of the two pulses
    const E1 = (N * dPhi) / t1, E2 = (N * dPhi) / t2;
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Tendai drops a bar magnet, north pole first, vertically through a coil of $400$ turns connected to a data logger. The flux through each turn rises from zero to $6.0 \times 10^{-5}\ \text{Wb}$ as the magnet enters, then falls back to zero as it leaves. The entry pulse lasts about $30\ \text{ms}$ and the exit pulse about $18\ \text{ms}$.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the average e.m.f. during the entry pulse, in V, to two significant figures.", value: E1, sf: 2, unit: "V", wrong: [dPhi / t1], explanation: t`$E = \dfrac{N\Delta\Phi}{\Delta t} = \dfrac{400 \times 6.0 \times 10^{-5}}{0.030} = ${sfStr(E1, 2)}\ \text{V}$.` }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate the average e.m.f. during the exit pulse, in V, to two significant figures.", value: E2, sf: 2, unit: "V", wrong: [E1], explanation: t`$E = \dfrac{400 \times 6.0 \times 10^{-5}}{0.018} = ${sfStr(E2, 2)}\ \text{V}$, in the opposite direction.` }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain why the two pulses have opposite signs, why the exit pulse is shorter and larger, and why the areas under the two pulses are equal.", points: ["Entry: flux linkage increasing; exit: flux linkage decreasing, so the induced e.m.f.s are in opposite directions (Lenz).", "The magnet accelerates under gravity, so it is moving faster as it leaves: the flux changes in a shorter time, giving a larger e.m.f.", "Area under each pulse = ∫E dt = change in flux linkage, which is the same size (NΔΦ = 2.4 × 10⁻² Wb) for both."], modelAnswer: "As the magnet enters, the flux linkage increases; as it leaves, it decreases, so the e.m.f.s have opposite signs. The magnet accelerates, so it leaves faster than it enters: the same flux change happens in a shorter time, giving a larger e.m.f. The area under each pulse equals the change in flux linkage, 2.4 × 10⁻² Wb in both cases, so the areas are equal." }),
        P.manual({ label: "(d)", marks: 2, stem: "As the magnet enters, state the magnetic pole formed at the top of the coil, and explain why the magnet's acceleration would be slightly less than g if the coil were connected to a low resistance.", points: ["A north pole forms at the top, opposing the approach of the north pole.", "With a closed circuit a current flows and the coil repels the approaching magnet (and attracts it as it leaves), an upward force opposing the fall, so its acceleration is less than g; some kinetic energy becomes electrical energy."], modelAnswer: "The top of the coil becomes a north pole, repelling the approaching north pole. With a low-resistance circuit a current flows, and the coil's field pushes up on the magnet on entry (and pulls up on exit), so the resultant force and acceleration are less than mg and g; some of the magnet's energy becomes electrical energy." }),
      ],
      explanation: "E = NΔΦ/Δt; opposite signs by Lenz's law; equal areas = equal changes of flux linkage.",
      hints: ["Average e.m.f. = change in flux linkage ÷ time."],
    });
  }
  {
    const B = 0.12, A = 0.025, N = 60, f = 40;
    const w = 2 * Math.PI * f, E0 = B * A * N * w;
    b.struct({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A simple generator has a rectangular coil of $60$ turns and area $0.025\ \text{m}^2$ rotating at $40$ revolutions per second in a uniform field of $0.12\ \text{T}$. Time is measured from when the plane of the coil is perpendicular to the field.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the maximum flux linkage, in Wb, to two significant figures.", value: B * A * N, sf: 2, unit: "Wb", wrong: [B * A], explanation: t`$N\Phi_{\max} = BAN = 0.12 \times 0.025 \times 60 = ${sfStr(B * A * N, 2)}\ \text{Wb}$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the peak e.m.f., in V, to three significant figures.", value: E0, unit: "V", wrong: [B * A * N * f], explanation: t`$E_0 = BAN\omega = ${sfStr(B * A * N, 2)} \times 2\pi \times 40 = ${sfStr(E0, 3)}\ \text{V}$.` }),
        P.manual({ label: "(c)", marks: 2, stem: "Describe how the flux linkage and the e.m.f. vary during the first quarter of a revolution.", points: ["The flux linkage falls from its maximum (0.18 Wb) to zero, following a cosine curve.", "The e.m.f. rises from zero to its peak value, following a sine curve (it is largest when the flux linkage is zero)."], modelAnswer: "The flux linkage falls as a cosine from 0.18 Wb to zero, while the e.m.f. rises as a sine from zero to its peak, reaching the peak just as the flux linkage reaches zero." }),
        P.manual({ label: "(d)", marks: 1, stem: "State the purpose of the slip rings and brushes.", points: ["To make continuous electrical contact between the rotating coil and the external circuit, so the alternating e.m.f. can be taken out (without twisting the leads)."], modelAnswer: "They connect the rotating coil to the stationary external circuit, so the alternating current can flow out without the wires twisting." }),
      ],
      explanation: "NΦ = BAN cos ωt; E = BANω sin ωt.",
      hints: ["ω = 2πf."],
    });
  }

  b.card("DEFINITION", "**Lenz's law**", "The direction of an induced e.m.f. is such that it tends to oppose the change in flux linkage producing it.");
  b.card("CONCEPT", "Lenz's law and energy", "Opposition means work must be done to induce a current; that work becomes electrical energy.");
  b.card("CONCEPT", "Fleming's right-hand rule", "Generators: thumb = motion, first finger = field, second finger = induced current.");
  b.card("DEFINITION", "**Eddy currents**", "Circulating currents induced in a bulk conductor by a changing flux; they oppose motion and heat the conductor.");
  b.card("FACT", "Laminated cores", "Thin insulated sheets reduce eddy currents and energy losses in transformers and motors.");
  b.card("FORMULA", "a.c. generator", t`$E = BAN\omega\sin\omega t$, $E_0 = BAN\omega$`);
  b.card("CONCEPT", "Magnet falling through a coil", "Two opposite pulses; the exit pulse is taller and narrower; equal areas.");
  b.card("CONCEPT", "Back e.m.f.", "The e.m.f. induced in a running motor opposes the supply: I = (V − E_back)/R, large at switch-on.");
  b.card("FACT", "Maximum generator e.m.f.", "When the plane of the coil is parallel to the field: flux zero but changing fastest.");
});
