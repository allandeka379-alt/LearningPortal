// W2a: aphys.oscillations.shm — terms, a = −ω²x, x = x₀ sin ωt, v = ±ω√(x₀² − x²), graphs, mass-spring and pendulum.
import { concept, P, t, chk, DATA, sfStr, dpStr, sciTex, pctUnc, mean, halfRange, linFit, table } from "../lib.mjs";

const g = DATA.g;
concept("aphys.oscillations.shm", { file: "oscillations/shm", keyPrefix: "oscillations.shm" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement defines simple harmonic motion?",
    options: [
      ["The acceleration is proportional to the displacement from a fixed point and always directed towards that point.", "Correct: both proportionality and direction are needed."],
      ["The velocity is proportional to the displacement and directed towards a fixed point.", "It is the acceleration, not the velocity, that is proportional to displacement."],
      ["The acceleration is constant and always directed towards a fixed point.", "In s.h.m. the acceleration varies with displacement; it is zero at equilibrium."],
      ["The acceleration is proportional to the displacement and directed away from a fixed point.", "Acceleration away from the point would not produce an oscillation."],
    ],
    answer: "A",
    explanation: "S.h.m.: a = −ω²x — acceleration ∝ displacement, directed towards the equilibrium position.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "At which point in simple harmonic motion is the speed of the oscillator greatest?",
    options: [
      ["at the equilibrium position", "Correct: v = ω√(x₀² − x²) is greatest when x = 0."],
      ["at maximum displacement", "Here the oscillator is momentarily at rest."],
      ["halfway between equilibrium and maximum displacement", "Speed there is ω√(x₀² − x₀²/4) ≈ 0.87v₀, less than the maximum."],
      ["where the acceleration is greatest", "Acceleration is greatest at maximum displacement, where the speed is zero."],
    ],
    answer: "A",
    explanation: "Speed is maximum (v₀ = ωx₀) at x = 0, where the acceleration is zero.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "For an object performing simple harmonic motion, what is the phase difference between its acceleration and its displacement?",
    options: [
      [t`$\pi$ rad`, "Correct: a = −ω²x, so a is always opposite in sign to x."],
      [t`$\pi/2$ rad`, "This is the phase difference between velocity and displacement."],
      ["0", "The minus sign in a = −ω²x means they are in antiphase, not in phase."],
      [t`$2\pi$ rad`, "2π rad is equivalent to being in phase."],
    ],
    answer: "A",
    explanation: "a = −ω²x: acceleration and displacement are in antiphase (π rad).",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which graph is a straight line through the origin with a negative gradient for an object in simple harmonic motion?",
    options: [
      ["acceleration against displacement", "Correct: a = −ω²x, gradient −ω²."],
      ["velocity against displacement", "This is an ellipse."],
      ["displacement against time", "This is a sine curve."],
      ["acceleration against time", "This is an inverted sine curve."],
    ],
    answer: "A",
    explanation: "Plotting a against x gives a straight line through the origin of gradient −ω²; it is the graphical test for s.h.m.",
    hints: ["Compare a = −ω²x with y = mx."],
  });
  {
    const m = 0.20, k = 80;
    const T = 2 * Math.PI * Math.sqrt(m / k);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A $0.20\ \text{kg}$ mass oscillates on a spring of spring constant $80\ \text{N m}^{-1}$. What is the period?`,
      options: [
        [`${sfStr(T, 3)} s`, "Correct: T = 2π√(0.20/80)."],
        [`${sfStr(2 * Math.PI * Math.sqrt(k / m), 3)} s`, "This inverts the ratio, using √(k/m)."],
        [`${sfStr(Math.sqrt(m / k), 3)} s`, "This omits the factor 2π."],
        [`${sfStr(Math.sqrt(k / m), 3)} s`, "This is ω in rad s⁻¹, not the period."],
      ],
      answer: "A",
      explanation: t`$T = 2\pi\sqrt{m/k} = 2\pi\sqrt{0.20/80} = ${sfStr(T, 3)}\ \text{s}$.`,
      hints: ["A heavier mass oscillates more slowly."],
    });
  }
  {
    b.mcq({
      d: 3, skill: "UNDERSTANDING",
      stem: "The length of a simple pendulum is increased by a factor of four. What happens to its period?",
      options: [
        ["It doubles.", "Correct: T ∝ √l, and √4 = 2."],
        ["It quadruples.", "T is proportional to √l, not to l."],
        ["It halves.", "A longer pendulum has a longer period, not a shorter one."],
        ["It stays the same.", "The period depends on the length."],
      ],
      answer: "A",
      explanation: "T = 2π√(l/g): multiplying l by 4 multiplies T by 2.",
      hints: ["How does T depend on l?"],
    });
  }
  {
    const x0 = 0.12, x = 0.06;
    const ratio = Math.sqrt(x0 ** 2 - x ** 2) / x0;
    b.mcq({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: "An object performs s.h.m. with amplitude 12 cm. What fraction of its maximum speed does it have when its displacement is 6.0 cm?",
      options: [
        [`${dpStr(ratio, 3)}`, "Correct: √(x₀² − x²)/x₀ = √(144 − 36)/12."],
        ["0.500", "This assumes speed falls linearly with displacement."],
        ["0.750", "This uses (x₀² − x²)/x₀² without the square root."],
        ["0.250", "This uses (x/x₀)², the fraction of maximum potential energy, not of speed."],
      ],
      answer: "A",
      explanation: t`$\dfrac{v}{v_0} = \dfrac{\omega\sqrt{x_0^2 - x^2}}{\omega x_0} = \dfrac{\sqrt{0.12^2 - 0.060^2}}{0.12} = ${dpStr(ratio, 3)}$.`,
      hints: ["Divide v = ω√(x₀² − x²) by v₀ = ωx₀."],
    });
  }
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: t`An oscillator's displacement is $x = x_0\sin\omega t$. Which expression gives its velocity?`,
    options: [
      [t`$v = \omega x_0\cos\omega t$`, "Correct: differentiate x with respect to t."],
      [t`$v = -\omega x_0\sin\omega t$`, "This is the form for x = x₀cos ωt."],
      [t`$v = -\omega^2 x_0\sin\omega t$`, "This is the acceleration."],
      [t`$v = x_0\cos\omega t$`, "The amplitude of the velocity is ωx₀, not x₀."],
    ],
    answer: "A",
    explanation: "dx/dt = ωx₀cos ωt; the velocity leads the displacement by π/2.",
    hints: ["Velocity is the rate of change of displacement."],
  });
  {
    const f = 2.5, x0 = 0.040;
    const w = 2 * Math.PI * f;
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: t`A loudspeaker cone vibrates with s.h.m. of frequency $2.5\ \text{Hz}$ and amplitude $4.0\ \text{cm}$ during a slow test. Calculate its maximum speed, in $\text{m s}^{-1}$, to three significant figures.`,
      value: w * x0, unit: "m/s", wrong: [f * x0, w * 4.0],
      explanation: t`$\omega = 2\pi f = ${sfStr(w, 3)}\ \text{rad s}^{-1}$; $v_0 = \omega x_0 = ${sfStr(w, 4)} \times 0.040 = ${sfStr(w * x0, 3)}\ \text{m s}^{-1}$. Using $f$ instead of $\omega$ gives a value $2\pi$ times too small.`,
    });
  }
  {
    const T = 0.40, x0 = 0.025;
    const w = (2 * Math.PI) / T;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A mass on a spring oscillates with period $0.40\ \text{s}$ and amplitude $2.5\ \text{cm}$. Calculate its maximum acceleration, in $\text{m s}^{-2}$, to three significant figures.`,
      value: w * w * x0, unit: "m/s²", wrong: [w * x0, ((2 * Math.PI * T) ** 2) * x0],
      explanation: t`$\omega = 2\pi/0.40 = ${sfStr(w, 3)}\ \text{rad s}^{-1}$; $a_{\max} = \omega^2 x_0 = ${sfStr(w, 4)}^2 \times 0.025 = ${sfStr(w * w * x0, 3)}\ \text{m s}^{-2}$.`,
      hints: ["Maximum acceleration occurs at maximum displacement."],
    });
  }
  {
    const x0 = 0.15, w = 4.0, x = 0.09;
    const v = w * Math.sqrt(x0 ** 2 - x ** 2);
    chk(v, 0.48, 1e-9);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A body moves with s.h.m. of amplitude $0.15\ \text{m}$ and angular frequency $4.0\ \text{rad s}^{-1}$. Calculate its speed when its displacement is $0.090\ \text{m}$, in $\text{m s}^{-1}$.`,
      value: v, unit: "m/s", wrong: [w * (x0 - x), w * x],
      explanation: t`$v = \omega\sqrt{x_0^2 - x^2} = 4.0\sqrt{0.15^2 - 0.090^2} = 4.0 \times 0.12 = ${v}\ \text{m s}^{-1}$.`,
      hints: ["Use v = ω√(x₀² − x²)."],
    });
  }
  {
    const T = 2.00;
    const l = (g * T * T) / (4 * Math.PI * Math.PI);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A clock pendulum must have a period of exactly $2.00\ \text{s}$. Calculate the length it needs, in m, to three significant figures. Take $g = 9.81\ \text{m s}^{-2}$.`,
      value: l, unit: "m", wrong: [(g * T) / (4 * Math.PI * Math.PI), (g * T * T) / (2 * Math.PI)],
      explanation: t`1. $T = 2\pi\sqrt{l/g} \Rightarrow l = \dfrac{gT^2}{4\pi^2}$.
2. $l = \dfrac{9.81 \times 2.00^2}{4\pi^2} = ${sfStr(l, 3)}\ \text{m}$.`,
      hints: ["Square both sides of T = 2π√(l/g)."],
    });
  }
  {
    const x0 = 0.050, f = 1.5, tt = 0.10;
    const w = 2 * Math.PI * f;
    const x = x0 * Math.cos(w * tt);
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A mass on a spring is pulled $5.0\ \text{cm}$ below equilibrium and released at $t = 0$. It oscillates at $1.5\ \text{Hz}$. Calculate its displacement below equilibrium at $t = 0.10\ \text{s}$, in cm, to two significant figures.`,
      value: x * 100, sf: 2, unit: "cm", wrong: [x0 * Math.sin(w * tt) * 100, x0 * Math.cos((w * tt * Math.PI) / 180) * 100],
      explanation: t`1. Released from maximum displacement, so $x = x_0\cos\omega t$.
2. $\omega = 2\pi \times 1.5 = ${sfStr(w, 3)}\ \text{rad s}^{-1}$; $\omega t = ${sfStr(w * tt, 3)}\ \text{rad}$.
3. $x = 5.0\cos(${sfStr(w * tt, 3)}) = ${sfStr(x * 100, 2)}\ \text{cm}$ (calculator in radians).
4. Using $\sin$ instead of $\cos$ gives ${sfStr(x0 * Math.sin(w * tt) * 100, 2)} cm, which would be right only if timing began at equilibrium.`,
      hints: ["Which function starts at its maximum value?", "Use radians."],
    });
  }
  // Practical: uncertainty in pendulum timing
  {
    const ts = [18.62, 18.48, 18.71], n = 10;
    const Tm = mean(ts) / n, pctT = pctUnc(halfRange(ts), mean(ts));
    b.num({
      d: 3, skill: "ANALYSIS", calculator: true,
      stem: t`Farai times 10 oscillations of a pendulum three times: ${ts.map((x) => x.toFixed(2)).join(" s, ")} s. Calculate the percentage uncertainty in the period, using half the range of the readings, to two significant figures.`,
      value: pctT, sf: 2, unit: "%", wrong: [pctUnc(halfRange(ts), Tm)],
      explanation: t`Mean $= ${dpStr(mean(ts), 2)}\ \text{s}$; half-range $= ${dpStr(halfRange(ts), 3)}\ \text{s}$; percentage $= ${sfStr(pctT, 2)}\%$. Dividing both by 10 to get $T = ${dpStr(Tm, 3)}\ \text{s}$ leaves the percentage unchanged. In $g = 4\pi^2 l/T^2$ this contributes $2 \times ${sfStr(pctT, 2)}\%$.`,
      hints: ["The percentage uncertainty is the same for 10T and for T."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The period of a simple harmonic oscillator increases when its amplitude increases.",
    answer: false,
    explanation: "False. For s.h.m. the period depends only on ω (e.g. on m and k, or on l and g), not on the amplitude.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each graph for s.h.m. with its shape.",
    pairs: [
      ["acceleration against displacement", "straight line through the origin, negative gradient"],
      ["velocity against displacement", "ellipse"],
      ["displacement against time (starting at equilibrium)", "sine curve"],
      ["velocity against time (starting at equilibrium)", "cosine curve"],
    ],
    explanation: "a = −ω²x is linear; v² = ω²(x₀² − x²) is an ellipse; x = x₀ sin ωt; v = v₀ cos ωt.",
    hints: ["Use the s.h.m. equations."],
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the equations.",
    template: "Angular frequency ω = 2π × {{blank:a}}. The maximum speed is v₀ = ω × {{blank:b}}. The defining equation of s.h.m. is a = {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["frequency"], choices: ["frequency", "period", "amplitude"] },
      { id: "b", accepted: ["amplitude"], choices: ["amplitude", "period", "displacement"] },
      { id: "c", accepted: ["−ω²x"], choices: ["−ω²x", "ω²x", "−ωx"] },
    ],
    explanation: "ω = 2πf; v₀ = ωx₀; a = −ω²x.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: t`Show that a mass $m$ on a spring of spring constant $k$ performs s.h.m., and derive its period.`,
    points: [
      t`Resultant (restoring) force on the mass at displacement $x$ from equilibrium: $F = -kx$.`,
      t`Newton's second law: $ma = -kx$, so $a = -\dfrac{k}{m}x$: acceleration ∝ displacement and opposite in direction, which is s.h.m.`,
      t`Comparing with $a = -\omega^2x$: $\omega = \sqrt{k/m}$, so $T = 2\pi/\omega = 2\pi\sqrt{m/k}$.`,
    ],
    modelAnswer: "At displacement x from equilibrium the resultant force is −kx. By Newton's second law ma = −kx, so a = −(k/m)x: the acceleration is proportional to the displacement and directed towards equilibrium, so the motion is s.h.m. with ω² = k/m. Then T = 2π/ω = 2π√(m/k).",
    explanation: "Force, Newton's second law, comparison with a = −ω²x.",
    hints: ["Write the resultant force at displacement x."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the graphs of displacement, velocity and acceleration against time for one cycle of s.h.m. that starts at maximum positive displacement, stating the phase relationships.",
    points: [
      "Displacement: cosine curve starting at +x₀, zero at T/4, −x₀ at T/2.",
      "Velocity: starts at zero, becomes negative (minus sine curve), reaching −v₀ at T/4.",
      "Acceleration: starts at −ω²x₀ (minus cosine curve), zero at T/4.",
      "Velocity leads displacement by π/2; acceleration is in antiphase (π) with displacement.",
    ],
    modelAnswer: "Displacement is a cosine curve: +x₀ at t = 0, zero at T/4, −x₀ at T/2. Velocity is a negative sine curve: zero at t = 0, −v₀ at T/4. Acceleration is a negative cosine curve: −ω²x₀ at t = 0, zero at T/4. Velocity is π/2 ahead of displacement; acceleration is π out of phase with it.",
    explanation: "Shapes, starting values and phase relationships.",
    hints: ["At maximum displacement, what are v and a?"],
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 4,
    stem: "Describe how you would use a simple pendulum to determine g, explaining how you would make the result accurate.",
    points: [
      "Measure the length l from the point of suspension to the centre of the bob (metre rule; bob diameter with callipers).",
      "Time 20 oscillations (several times, averaging) with small amplitude (< 10°); use a fiducial marker at the centre of the swing.",
      "Repeat for several lengths and plot T² against l.",
      "Gradient = 4π²/g, so g = 4π²/gradient.",
    ],
    modelAnswer: "Measure l from the suspension point to the centre of the bob. Displace the bob through a small angle, and time 20 oscillations with a stop-watch, starting as the bob passes a fiducial mark at the centre; repeat and average, then divide by 20. Do this for six lengths and plot T² against l; the gradient is 4π²/g, so g = 4π² ÷ gradient.",
    explanation: "Length to centre of bob, many oscillations, small amplitude, T² against l graph.",
    hints: ["Which graph gives a straight line?"],
  });
  // Practice structured: a-x data (14 marks)
  {
    const w = 5.0;
    const xs = [-0.06, -0.04, -0.02, 0.0, 0.02, 0.04, 0.06];
    const noise = [0.02, -0.03, 0.03, 0.0, -0.02, 0.03, -0.01];
    const as = xs.map((x, i) => Number((-w * w * x + noise[i]).toFixed(2)));
    const fit = linFit(xs, as);
    const wFit = Math.sqrt(-fit.m);
    const tab = table([t`$x\,/\,\text{m}$`, t`$a\,/\,\text{m s}^{-2}$`], xs.map((x, i) => [dpStr(x, 2), dpStr(as[i], 2)]));
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A data logger records the acceleration $a$ of a trolley oscillating between two springs at several displacements $x$ from equilibrium.

${tab}`,
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: "Explain how the data show that the trolley performs simple harmonic motion.", points: ["a is proportional to x (a against x is a straight line through the origin).", "a has the opposite sign to x (negative gradient): it is directed towards equilibrium."], modelAnswer: "The acceleration is proportional to the displacement (a straight line through the origin) and always has the opposite sign, so it is directed towards equilibrium: the condition for s.h.m." }),
        P.num({ label: "(b)", marks: 3, stem: t`Determine the gradient of the graph of $a$ against $x$, in $\text{s}^{-2}$.`, value: fit.m, tol: 0.8, wrong: [-fit.m], explanation: t`The best-fit line through the origin has gradient about $${sfStr(fit.m, 3)}\ \text{s}^{-2}$.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Determine the angular frequency, in $\text{rad s}^{-1}$, to two significant figures.`, value: wFit, tol: 0.1, unit: "rad/s", wrong: [-fit.m], explanation: t`Gradient $= -\omega^2$, so $\omega = \sqrt{${sfStr(-fit.m, 3)}} = ${sfStr(wFit, 2)}\ \text{rad s}^{-1}$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the period, in s, to two significant figures.", value: (2 * Math.PI) / wFit, tol: 0.03, unit: "s", wrong: [1 / wFit], explanation: t`$T = 2\pi/\omega = ${sfStr((2 * Math.PI) / wFit, 2)}\ \text{s}$.` }),
        P.num({ label: "(e)", marks: 2, stem: t`The amplitude is $0.060\ \text{m}$. Calculate the maximum speed, in $\text{m s}^{-1}$, to two significant figures.`, value: wFit * 0.06, tol: 0.006, unit: "m/s", wrong: [wFit * wFit * 0.06], explanation: t`$v_0 = \omega x_0 = ${sfStr(wFit, 2)} \times 0.060 = ${sfStr(wFit * 0.06, 2)}\ \text{m s}^{-1}$.` }),
        P.num({ label: "(f)", marks: 1, stem: t`The trolley has mass $0.80\ \text{kg}$. Using $\omega^2 = k/m$, calculate the effective spring constant of the two springs, in $\text{N m}^{-1}$, to two significant figures.`, value: 0.8 * wFit * wFit, tol: 0.8, unit: "N/m", wrong: [wFit * wFit / 0.8], explanation: t`$k = m\omega^2 = 0.80 \times ${sfStr(-fit.m, 3)} = ${sfStr(0.8 * wFit * wFit, 2)}\ \text{N m}^{-1}$.` }),
        P.manual({ label: "(g)", marks: 2, stem: "Suggest why the points do not lie exactly on a straight line.", points: ["Random errors in the data logger readings (noise / vibration of the sensor).", "Friction on the trolley adds a force that is not proportional to x (or the springs do not obey Hooke's law exactly)."], modelAnswer: "The logger readings contain random noise, and friction acting on the trolley adds a force that does not depend on displacement, so the acceleration is not exactly proportional to x." }),
      ],
      explanation: "a = −ω²x: the gradient of a against x is −ω²; T = 2π/ω, v₀ = ωx₀, k = mω².",
      hints: ["Gradient = −ω².", "Use a large triangle on the best-fit line."],
    });
  }

  // Practice structured: vibrating sieve (8 marks)
  {
    const f = 4.0, x0 = 0.014;
    const w = 2 * Math.PI * f;
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`The sieve of a maize mill is shaken up and down with simple harmonic motion of frequency $4.0\ \text{Hz}$ and amplitude $1.4\ \text{cm}$. Grains of maize rest loosely on the sieve.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: t`Calculate the angular frequency, in $\text{rad s}^{-1}$, to three significant figures.`, value: w, unit: "rad/s", wrong: [f], explanation: t`$\omega = 2\pi \times 4.0 = ${sfStr(w, 3)}\ \text{rad s}^{-1}$.` }),
        P.num({ label: "(b)", marks: 2, stem: t`Calculate the maximum acceleration of the sieve, in $\text{m s}^{-2}$, to three significant figures.`, value: w * w * x0, unit: "m/s²", wrong: [w * x0], explanation: t`$a_{\max} = \omega^2 x_0 = ${sfStr(w, 4)}^2 \times 0.014 = ${sfStr(w * w * x0, 3)}\ \text{m s}^{-2}$.` }),
        P.num({ label: "(c)", marks: 3, stem: "The grains just lose contact with the sieve when the sieve's downward acceleration exceeds g. Calculate the largest amplitude at 4.0 Hz for which the grains stay in contact, in cm, to three significant figures.", value: (g / (w * w)) * 100, unit: "cm", wrong: [(g / w) * 100], explanation: t`Contact is lost if $\omega^2 x_0 > g$; largest $x_0 = g/\omega^2 = 9.81/${sfStr(w * w, 4)} = ${sfStr(g / (w * w), 3)}\ \text{m} = ${sfStr((g / (w * w)) * 100, 3)}\ \text{cm}$.` }),
        P.manual({ label: "(d)", marks: 2, stem: "State where in the motion the grains first lose contact, and explain why.", points: ["At the top of the motion (maximum upward displacement).", "There the sieve's acceleration is downwards and greatest (ω²x₀); if this exceeds g the sieve falls away faster than the grains can fall freely."], modelAnswer: "At the top of the oscillation, where the sieve's acceleration is directed downwards and is largest; if it exceeds g the sieve accelerates down faster than free fall and the grains leave its surface." }),
      ],
      explanation: "a_max = ω²x₀; contact is lost at the top when ω²x₀ > g.",
      hints: ["ω = 2πf.", "Where is the downward acceleration largest?"],
    });
  }

  b.card("DEFINITION", "**Simple harmonic motion**", "Acceleration proportional to displacement from a fixed point and always directed towards that point.");
  b.card("FORMULA", "Defining equation", t`$a = -\omega^2x$`);
  b.card("FORMULA", "Angular frequency", t`$\omega = 2\pi f = 2\pi/T$`);
  b.card("FORMULA", "Displacement and velocity", t`$x = x_0\sin\omega t$, $v = v_0\cos\omega t$, $v = \pm\omega\sqrt{x_0^2 - x^2}$`);
  b.card("FACT", "Maxima", t`$v_0 = \omega x_0$ at $x = 0$; $a_{\max} = \omega^2x_0$ at $x = \pm x_0$`);
  b.card("CONCEPT", "Phase relationships", "v leads x by π/2; a is in antiphase with x.");
  b.card("FORMULA", "Mass-spring and pendulum periods", t`$T = 2\pi\sqrt{m/k}$; $T = 2\pi\sqrt{l/g}$ (small amplitude)`);
  b.card("FACT", "Isochronous", "The period of s.h.m. does not depend on the amplitude.");
  b.card("CONCEPT", "Test for s.h.m. from data", "Plot a against x: straight line through the origin with gradient −ω².");
});

