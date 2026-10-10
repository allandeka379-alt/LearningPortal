// W4b: amaths.shm.motion (ZIMSEC only: Mechanics F6 6.12)
import { concept, P, t, chk, checkDeriv } from "../lib.mjs";
import { f3, f4, NB } from "../tables/w4b-kit.mjs";

const { PI, sqrt, asin, cos, sin } = Math;
const g = 9.8;

concept("amaths.shm.motion", { file: "shm/motion", keyPrefix: "shm.motion" }, (b) => {
  // q01
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "Which statement defines simple harmonic motion about a point O?",
    options: [
      ["The acceleration is directed towards O and is proportional to the distance from O", t`Correct: $\ddot{x} = -\omega^2 x$.`],
      ["The speed is constant and the particle moves to and fro through O", "The speed of a particle in SHM changes: it is greatest at O and zero at the ends."],
      ["The acceleration is constant and directed towards O", "Constant acceleration would be suvat motion; in SHM the acceleration grows with the distance from O."],
      ["The acceleration is directed away from O and is proportional to the distance from O", t`$\ddot{x} = +\omega^2 x$ would push the particle further away: it would not oscillate.`],
    ],
    answer: "A",
    explanation: t`SHM: $\ddot{x} = -\omega^2 x$. The minus sign means the acceleration always points back towards the centre $O$.`,
  });

  // q02
  b.tf({
    d: 1, skill: "UNDERSTANDING", calculator: false,
    stem: "For a particle moving with simple harmonic motion, doubling the amplitude does not change the period.",
    answer: true,
    explanation: t`The period is $\frac{2\pi}{\omega}$, which depends only on $\omega$ (for a spring, on $\lambda$, $m$ and $l$), not on the amplitude. A larger amplitude gives a larger maximum speed $a\omega$.`,
  });

  // q03 period from ẍ = −25x
  const T3 = (2 * PI) / 5;
  b.num({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: t`A particle moves so that $\ddot{x} = -25x$. Find the period of its motion in seconds, correct to 3 significant figures.`,
    value: T3, unit: "s", wrong: [f3((2 * PI) / 25), f3(2 * PI * 5)],
    explanation: t`$\omega^2 = 25$, so $\omega = 5$ rad s$^{-1}$ and $T = \frac{2\pi}{5} = ${f3(T3)}$ s. (Using $\omega = 25$ forgets the square.)`,
  });

  // q04 max speed
  const v4 = 0.12 * 7;
  chk(v4, 0.84, 1e-12);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`A particle moves with simple harmonic motion of amplitude $0.12$ m and $\omega = 7$ rad s$^{-1}$. Find its greatest speed.`,
    value: v4, unit: "m/s", wrong: [5.88, f3(0.12 / 7)],
    explanation: t`$v_{\max} = a\omega = 0.12 \times 7 = 0.84$ m s$^{-1}$, at the centre. ($5.88$ m s$^{-2}$ is the greatest acceleration $a\omega^2$.)`,
  });

  // q05 speed at x
  const v5 = 3 * sqrt(1.5 ** 2 - 0.9 ** 2);
  chk(v5, 3.6, 1e-9);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`A particle moves with simple harmonic motion with $\omega = 3$ rad s$^{-1}$ and amplitude $1.5$ m. Find its speed when it is $0.9$ m from the centre.`,
    value: v5, unit: "m/s", wrong: [f3(3 * sqrt(1.5 - 0.9)), 4.5],
    explanation: t`$v^2 = \omega^2(a^2 - x^2) = 9(2.25 - 0.81) = 9 \times 1.44$, so $v = 3 \times 1.2 = 3.6$ m s$^{-1}$. ($4.5$ m s$^{-1}$ is the greatest speed, at the centre.)`,
    hints: [t`Use $v^2 = \omega^2(a^2 - x^2)$.`],
  });

  // q06 where is speed / acceleration greatest
  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "A particle moves with simple harmonic motion between two end points A and B, with centre O. Where are its speed and the magnitude of its acceleration greatest?",
    options: [
      ["Speed greatest at O; acceleration greatest at A and B", t`Correct: $v = a\omega$ at $O$ where $x = 0$; $|\ddot{x}| = \omega^2|x|$ is largest where $|x| = a$.`],
      ["Speed and acceleration both greatest at O", t`At $O$, $x = 0$, so the acceleration $-\omega^2 x$ is zero there.`],
      ["Speed greatest at A and B; acceleration greatest at O", "This is the wrong way round: the particle is momentarily at rest at A and B."],
      ["Speed and acceleration both greatest at A and B", "The particle stops at A and B, so the speed is zero there."],
    ],
    answer: "A",
    explanation: t`At the centre: speed $a\omega$, acceleration $0$. At the ends: speed $0$, acceleration $a\omega^2$ towards $O$.`,
  });

  // q07 two speeds → ω and a
  const w2 = (1.6 ** 2 - 1.2 ** 2) / (0.8 ** 2 - 0.6 ** 2);
  chk(w2, 4, 1e-9);
  const a7 = sqrt(0.6 ** 2 + 1.6 ** 2 / w2);
  chk(a7, 1, 1e-9);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`A particle moving with simple harmonic motion has speed $1.6$ m s$^{-1}$ when $0.6$ m from the centre and speed $1.2$ m s$^{-1}$ when $0.8$ m from the centre. Find $\omega$ and the amplitude.`,
    template: "ω = {{blank:w}} rad/s, amplitude = {{blank:a}} m",
    blanks: [NB("w", 2, 4), NB("a", 1, 0.8)],
    explanation: t`$2.56 = \omega^2(a^2 - 0.36)$ and $1.44 = \omega^2(a^2 - 0.64)$. Subtracting: $1.12 = 0.28\omega^2$, so $\omega^2 = 4$ and $\omega = 2$. Then $a^2 = 0.36 + \frac{2.56}{4} = 1$, so $a = 1$ m.`,
    hints: ["Write v² = ω²(a² − x²) for both points.", "Subtract to eliminate a²."],
  });

  // q08 time between two points
  const w8 = (2 * PI) / 3;
  const t8 = (asin(0.7) - asin(0.2)) / w8;
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A particle moves with simple harmonic motion about $O$ with amplitude $0.5$ m and period $3$ s. Find the time it takes to travel directly from a point $0.1$ m from $O$ to a point $0.35$ m from $O$, on the same side of $O$. Give your answer correct to 3 significant figures.`,
    value: t8, unit: "s", wrong: [f3(asin(0.7) / w8), f3((0.25 / 0.5) * 0.75)],
    explanation: t`$\omega = \frac{2\pi}{3}$. Timing from $O$, $x = 0.5\sin\omega t$. At $x = 0.1$: $\omega t_1 = \sin^{-1}0.2 = ${f4(asin(0.2))}$; at $x = 0.35$: $\omega t_2 = \sin^{-1}0.7 = ${f4(asin(0.7))}$ (radians). So $t_2 - t_1 = \frac{${f4(asin(0.7))} - ${f4(asin(0.2))}}{${f4(w8)}} = ${f3(t8)}$ s. ($${f3(asin(0.7) / w8)}$ s is the time from $O$ to $0.35$ m; $0.375$ s assumes constant speed over a quarter period.)`,
    workedSolution: t`1. $\omega = \frac{2\pi}{3} = ${f4(w8)}$ rad s$^{-1}$; $x = 0.5\sin\omega t$ from the centre.
2. $\sin\omega t_1 = 0.2 \Rightarrow t_1 = ${f4(asin(0.2) / w8)}$ s.
3. $\sin\omega t_2 = 0.7 \Rightarrow t_2 = ${f4(asin(0.7) / w8)}$ s.
4. Time $= t_2 - t_1 = ${f3(t8)}$ s.`,
    hints: ["Time both points from the centre with x = a sin ωt.", "Work in radians."],
  });

  // q09 seconds pendulum
  const l9 = g / PI ** 2;
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A simple pendulum makes small oscillations with a period of exactly $2$ s. Taking $g = 9.8$ m s$^{-2}$, find its length in metres, correct to 3 significant figures.`,
    value: l9, unit: "m", wrong: [f3(g / (4 * PI ** 2)), f3((4 * g) / (2 * PI))],
    explanation: t`$T = 2\pi\sqrt{\frac{l}{g}} = 2$ gives $\sqrt{\frac{l}{g}} = \frac{1}{\pi}$, so $l = \frac{g}{\pi^2} = ${f3(l9)}$ m.`,
    hints: [t`Make $l$ the subject of $T = 2\pi\sqrt{l/g}$.`],
  });

  // q10 vertical spring period
  const T10 = (2 * PI) / sqrt(21.6 / (0.75 * 0.45));
  chk(21.6 / (0.75 * 0.45), 64, 1e-9);
  b.calc({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`A particle of mass $0.75$ kg hangs in equilibrium from a light spring of natural length $0.45$ m and modulus $21.6$ N. It is pulled down a little and released. Take $g = 9.8$ m s$^{-2}$. Find the period of the resulting oscillations, correct to 3 significant figures.`,
    value: T10, unit: "s", wrong: [f3((2 * PI) / sqrt(21.6 / 0.75)), f3((2 * PI) / (21.6 / (0.75 * 0.45)))],
    explanation: t`Measuring $x$ from the equilibrium position, $0.75\ddot{x} = 0.75g - \frac{21.6(e + x)}{0.45} = -48x$ (the equilibrium terms cancel), so $\ddot{x} = -64x$. Then $\omega = \sqrt{64}$ and $T = \frac{2\pi}{\sqrt{64}} = ${f3(T10)}$ s. The value of $g$ does not affect the period.`,
    workedSolution: t`1. Equilibrium: $\frac{21.6e}{0.45} = 0.75g$.
2. At $x$ below equilibrium: $0.75\ddot{x} = 0.75g - 48(e + x) = -48x$.
3. $\ddot{x} = -64x$: SHM with $\omega^2 = 64$.
4. $T = \frac{2\pi}{\sqrt{64}} = ${f3(T10)}$ s.`,
    hints: ["Measure x from the equilibrium position.", "ω² = λ/(ml)."],
  });

  // q11 greatest speed on a vertical string
  const e11 = (0.25 * g * 0.8) / 9.8;
  chk(e11, 0.2, 1e-12);
  const w11 = sqrt(9.8 / (0.25 * 0.8));
  chk(w11, 7, 1e-9);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`A particle of mass $0.25$ kg hangs from a light elastic string of natural length $0.8$ m and modulus $9.8$ N. It is pulled $0.15$ m vertically below its equilibrium position and released from rest. Take $g = 9.8$ m s$^{-2}$. Find its greatest speed.`,
    value: 0.15 * w11, unit: "m/s", wrong: [f3(0.15 * 49), f3(0.35 * 7)],
    explanation: t`Equilibrium extension $e = \frac{0.25 \times 9.8 \times 0.8}{9.8} = 0.2$ m. The amplitude $0.15$ m is less than $e$, so the string stays taut and the motion is SHM with $\omega^2 = \frac{\lambda}{ml} = \frac{9.8}{0.2} = 49$, $\omega = 7$. Greatest speed $a\omega = 0.15 \times 7 = 1.05$ m s$^{-1}$, at the equilibrium position.`,
    hints: ["Check the string stays taut: compare the amplitude with the equilibrium extension.", "v_max = aω."],
  });

  // q12 string slack condition
  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`For the particle in the previous question (equilibrium extension $0.2$ m), the particle is instead pulled down further before release. What is the largest amplitude for which the motion remains simple harmonic throughout?`,
    options: [
      [t`$0.2$ m`, "Correct: at the top of the motion the extension is e − a, which must not be negative, so a ≤ e = 0.2 m."],
      [t`$0.8$ m`, "This is the natural length; the limit depends on the equilibrium extension."],
      [t`$1$ m`, "This is the length at equilibrium (natural length + e), not the greatest amplitude."],
      ["There is no limit", "An elastic string goes slack when shorter than its natural length, and then the force law changes."],
    ],
    answer: "A",
    explanation: t`The string must stay taut at the highest point, $a$ above equilibrium: extension $e - a \ge 0$, so $a \le e = 0.2$ m. A larger amplitude makes the string slack near the top, where the particle moves freely under gravity.`,
    hints: ["Where is the string shortest during the motion?"],
  });

  // q13 x as a function of t
  const x13 = (s) => 0.3 * cos(4 * s);
  checkDeriv((s) => -1.2 * sin(4 * s), (s) => -16 * x13(s), [0.1, 0.4, 0.9]);
  b.expr({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`A particle moves with $\ddot{x} = -16x$. At time $t = 0$ it is at rest at $x = 0.3$. Write $x$ in terms of $t$. Type your answer like 0.5cos(2t).`,
    accepted: ["0.3cos(4t)", "0.3cos4t", "x=0.3cos(4t)", "3/10cos(4t)", "0.3sin(4t+π/2)", "0.3sin(4t+pi/2)"],
    rejected: ["0.3sin(4t)", "0.3cos(16t)"],
    wrong: ["0.3sin(4t)", "0.3cos(16t)"],
    explanation: t`$\omega^2 = 16$ so $\omega = 4$. Starting from rest at an end, $x = a\cos\omega t = 0.3\cos 4t$. Check: $\dot{x} = -1.2\sin 4t = 0$ and $x = 0.3$ at $t = 0$. ($0.3\sin 4t$ starts at the centre.)`,
    hints: ["Starting from rest at an end means cosine."],
  });

  // q14 match
  b.match({
    d: 2, skill: "RECALL", calculator: false,
    stem: t`A particle moves with SHM of amplitude $a$ and $\ddot{x} = -\omega^2 x$. Match each quantity with its formula.`,
    pairs: [
      ["Period", t`$\dfrac{2\pi}{\omega}$`],
      ["Greatest speed", t`$a\omega$`],
      ["Greatest magnitude of acceleration", t`$a\omega^2$`],
      [t`Speed at displacement $x$`, t`$\omega\sqrt{a^2 - x^2}$`],
    ],
    explanation: t`All follow from $v^2 = \omega^2(a^2 - x^2)$ and $x = a\sin(\omega t + \varepsilon)$.`,
  });

  // q15 proof: v² = ω²(a² − x²)
  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 4,
    stem: t`A particle moves so that $\ddot{x} = -\omega^2 x$, and it is momentarily at rest when $x = \pm a$. Using $\ddot{x} = v\dfrac{\mathrm{d}v}{\mathrm{d}x}$, show that $v^2 = \omega^2\left(a^2 - x^2\right)$.`,
    points: [
      "M1 writes v dv/dx = −ω²x and separates: ∫v dv = −ω²∫x dx.",
      "A1 obtains ½v² = −½ω²x² + c.",
      "M1 uses v = 0 when x = a to find c = ½ω²a².",
      "A1 reaches v² = ω²(a² − x²).",
    ],
    modelAnswer: t`$$
v\frac{\mathrm{d}v}{\mathrm{d}x} = -\omega^2 x \;\Rightarrow\; \int v\,\mathrm{d}v = -\omega^2\int x\,\mathrm{d}x
$$
$$
\tfrac{1}{2}v^2 = -\tfrac{1}{2}\omega^2x^2 + c
$$
When $x = a$, $v = 0$: $c = \tfrac{1}{2}\omega^2a^2$. So
$$
v^2 = \omega^2a^2 - \omega^2x^2 = \omega^2\left(a^2 - x^2\right)
$$`,
    explanation: "Separate, integrate, use the end condition.",
    hints: ["Use the condition v = 0 at x = a for the constant."],
  });

  // q16 tf pendulum mass
  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "A simple pendulum with a heavier bob has a longer period of small oscillations than one with a lighter bob and the same length.",
    answer: false,
    explanation: t`$T = 2\pi\sqrt{\frac{l}{g}}$ for small oscillations: the mass cancels in $ml\ddot{\theta} = -mg\sin\theta$, so the period depends only on $l$ and $g$.`,
  });

  // q17 proof: vertical spring is SHM
  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 5,
    stem: t`A particle of mass $m$ hangs from a light spring of natural length $l$ and modulus $\lambda$, whose upper end is fixed. In equilibrium the extension is $e$. The particle is displaced vertically and released. Taking $x$ as its displacement below the equilibrium position, show that the motion is simple harmonic and state its period.`,
    points: [
      "B1 equilibrium: λe/l = mg.",
      "M1 at displacement x the tension is λ(e + x)/l.",
      "M1 Newton's second law: mẍ = mg − λ(e + x)/l.",
      "A1 uses the equilibrium condition to get ẍ = −(λ/(ml))x, SHM about the equilibrium position.",
      "A1 period 2π√(ml/λ).",
    ],
    modelAnswer: t`In equilibrium, $\frac{\lambda e}{l} = mg$. At displacement $x$ below equilibrium (down positive):
$$
m\ddot{x} = mg - \frac{\lambda(e + x)}{l} = \left(mg - \frac{\lambda e}{l}\right) - \frac{\lambda x}{l} = -\frac{\lambda x}{l}
$$
$$
\ddot{x} = -\frac{\lambda}{ml}\,x
$$
This is SHM about the equilibrium position with $\omega^2 = \frac{\lambda}{ml}$, so the period is $2\pi\sqrt{\dfrac{ml}{\lambda}}$.`,
    explanation: "Measure x from equilibrium so that the weight cancels the equilibrium tension.",
    hints: ["Write the tension as λ(e + x)/l."],
  });

  // q18 struct 5: horizontal spring
  const w18 = sqrt(13.5 / (0.3 * 0.5));
  const v18 = w18 * sqrt(0.12 ** 2 - 0.04 ** 2);
  const a18 = 0.12 * w18 * w18;
  chk(a18, 10.8, 1e-9);
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, calculator: true,
    stem: t`A particle of mass $0.3$ kg on a smooth horizontal table is attached to one end of a light spring of natural length $0.5$ m and modulus $13.5$ N; the other end is fixed. The particle is pulled $0.12$ m from its equilibrium position and released from rest.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Find ω for the resulting simple harmonic motion, correct to 3 significant figures.", value: w18, unit: "rad/s", wrong: [90],
        explanation: t`$0.3\ddot{x} = -\frac{13.5x}{0.5} = -27x$, so $\ddot{x} = -90x$ and $\omega = \sqrt{90} = ${f3(w18)}$ rad s$^{-1}$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Find its speed when it is 0.04 m from the equilibrium position, correct to 3 significant figures.", value: v18, unit: "m/s", wrong: [f3(w18 * 0.08)],
        explanation: t`$v = \omega\sqrt{a^2 - x^2} = ${f4(w18)}\sqrt{0.0144 - 0.0016} = ${f3(v18)}$ m s$^{-1}$.` }),
      P.num({ label: "(c)", marks: 1, stem: "Find the greatest magnitude of its acceleration.", value: a18, unit: "m/s²", wrong: [f3(0.12 * w18)],
        explanation: t`$a\omega^2 = 0.12 \times 90 = 10.8$ m s$^{-2}$, at the ends.` }),
    ],
    explanation: "Hooke's law gives ẍ = −(λ/(ml))x; then use the standard SHM results with a = 0.12 m.",
    hints: ["ω² = λ/(ml).", "The amplitude is the distance it was pulled out."],
  });

  // q19 struct 14: vertical elastic string
  const e19 = (0.4 * g * 1.2) / 39.2;
  chk(e19, 0.12, 1e-12);
  const w19 = sqrt(39.2 / (0.4 * 1.2));
  const T19 = (2 * PI) / w19, vm19 = 0.09 * w19;
  const t19 = ((2 * PI) / 3) / w19;
  chk(0.09 * cos(w19 * t19), -0.045, 1e-9);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`A particle $P$ of mass $0.4$ kg is attached to one end of a light elastic string of natural length $1.2$ m and modulus $39.2$ N. The other end is fixed at a point $O$, and $P$ hangs in equilibrium vertically below $O$. Take $g = 9.8$ m s$^{-2}$.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Find the extension of the string in equilibrium.", value: e19, unit: "m", wrong: [f3((0.4 * 1.2) / 39.2)],
        explanation: t`$\frac{39.2e}{1.2} = 0.4 \times 9.8$, so $e = 0.12$ m.` }),
      P.proof({ label: "(b)", marks: 4, stem: t`$P$ is pulled down a distance $0.09$ m below its equilibrium position and released from rest. Taking $x$ m as the displacement of $P$ below the equilibrium position, show that $\ddot{x} = -\dfrac{245}{3}x$ while the string is taut.`,
        points: ["M1 tension 39.2(0.12 + x)/1.2.", "M1 Newton's second law 0.4ẍ = 0.4g − 39.2(0.12 + x)/1.2.", "A1 equilibrium terms cancel: 0.4ẍ = −(98/3)x.", "A1 ẍ = −(245/3)x."],
        modelAnswer: t`Tension at displacement $x$: $T = \frac{39.2(0.12 + x)}{1.2}$.
$$
0.4\ddot{x} = 0.4(9.8) - \frac{39.2(0.12 + x)}{1.2} = 3.92 - 3.92 - \frac{98}{3}x
$$
$$
\ddot{x} = -\frac{98}{3 \times 0.4}x = -\frac{245}{3}x
$$`,
        explanation: "The weight cancels the equilibrium part of the tension." }),
      P.fib({ label: "(c)", marks: 4, stem: "Find the period of the motion and the greatest speed of P, each correct to 3 significant figures.", template: "period = {{blank:t}} s, greatest speed = {{blank:v}} m/s",
        blanks: [NB("t", T19, f3((2 * PI) / (245 / 3)), 2), NB("v", vm19, f3(0.09 * 245 / 3), 2)],
        explanation: t`$\omega = \sqrt{245/3} = ${f4(w19)}$ rad s$^{-1}$; period $\frac{2\pi}{\omega} = ${f3(T19)}$ s; amplitude $0.09$ m (less than $e = 0.12$ m, so the string stays taut); $v_{\max} = 0.09\omega = ${f3(vm19)}$ m s$^{-1}$.` }),
      P.num({ label: "(d)", marks: 3, stem: "Find the time after release when P first reaches a point 0.045 m above the equilibrium position, correct to 3 significant figures.", value: t19, unit: "s", wrong: [f3((PI / 3) / w19)],
        explanation: t`From rest at the lowest point, $x = 0.09\cos\omega t$. Set $x = -0.045$: $\cos\omega t = -0.5$, so $\omega t = \frac{2\pi}{3}$ and $t = \frac{2.0944}{${f4(w19)}} = ${f3(t19)}$ s. ($\frac{\pi}{3}$ gives the time to $0.045$ m BELOW equilibrium.)` }),
      P.num({ label: "(e)", marks: 1, stem: "State the greatest amplitude for which the motion would be simple harmonic throughout.", value: 0.12, unit: "m", wrong: [1.2],
        explanation: t`The string must not go slack at the top: amplitude $\le e = 0.12$ m.` }),
    ],
    explanation: "Equilibrium, then Newton's second law with x from equilibrium, then the standard SHM results with x = a cos ωt.",
    hints: ["Measure x downwards from the equilibrium position.", "Released from rest at an end: x = a cos ωt; 'above' means negative x."],
  });

  // ---------------------------------------------------------------- cards
  b.card("DEFINITION", "Simple harmonic motion", t`Motion with $\ddot{x} = -\omega^2 x$: acceleration towards a fixed centre, proportional to the displacement from it.`);
  b.card("FORMULA", "SHM displacement", t`$x = a\sin(\omega t + \varepsilon)$; from the centre $x = a\sin\omega t$; from rest at an end $x = a\cos\omega t$.`);
  b.card("FORMULA", "SHM velocity–displacement", t`$v^2 = \omega^2\left(a^2 - x^2\right)$`);
  b.card("FORMULA", "SHM period, greatest speed, greatest acceleration", t`$T = \dfrac{2\pi}{\omega}$; $v_{\max} = a\omega$ at the centre; $|\ddot{x}|_{\max} = a\omega^2$ at the ends.`);
  b.card("FORMULA", "Particle on a spring or elastic string (x from equilibrium)", t`$\omega^2 = \dfrac{\lambda}{ml}$, period $2\pi\sqrt{\dfrac{ml}{\lambda}}$ (horizontal or vertical).`);
  b.card("FORMULA", "Simple pendulum, small oscillations", t`$\ddot{\theta} = -\dfrac{g}{l}\theta$, period $2\pi\sqrt{\dfrac{l}{g}}$ (using $\sin\theta \approx \theta$).`);
  b.card("FACT", "Elastic string and SHM", "The motion is SHM throughout only while the string stays taut: amplitude ≤ equilibrium extension.");
  b.card("CONCEPT", "Proving a motion is SHM", "Take x from the equilibrium position, write Newton's second law, reach ẍ = −ω²x, and name ω and the centre.");
});
