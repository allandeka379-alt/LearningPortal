// W4b: amaths.variable.force (ZIMSEC only: Mechanics F6 6.11)
import { concept, P, t, chk, checkDeriv, checkAntideriv, integrate } from "../lib.mjs";
import { f3, f4, NB } from "../tables/w4b-kit.mjs";

const { sqrt, log, exp } = Math;

concept("amaths.variable.force", { file: "variable/force", keyPrefix: "variable.force" }, (b) => {
  // q01
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`A particle moves along the $x$-axis with velocity $v$. Which expression is equal to its acceleration?`,
    options: [
      [t`$v\dfrac{\mathrm{d}v}{\mathrm{d}x}$`, t`Correct: by the chain rule, $\frac{\mathrm{d}v}{\mathrm{d}t} = \frac{\mathrm{d}v}{\mathrm{d}x}\cdot\frac{\mathrm{d}x}{\mathrm{d}t} = v\frac{\mathrm{d}v}{\mathrm{d}x}$.`],
      [t`$\dfrac{\mathrm{d}v}{\mathrm{d}x}$`, t`This is missing the factor $v = \frac{\mathrm{d}x}{\mathrm{d}t}$; its units are s$^{-1}$, not m s$^{-2}$.`],
      [t`$x\dfrac{\mathrm{d}v}{\mathrm{d}x}$`, t`The factor should be the velocity $v$, not the displacement $x$.`],
      [t`$\dfrac{\mathrm{d}x}{\mathrm{d}v}$`, "This is the reciprocal of dv/dx and has the wrong units."],
    ],
    answer: "A",
    explanation: t`$a = \frac{\mathrm{d}v}{\mathrm{d}t} = \frac{\mathrm{d}^2x}{\mathrm{d}t^2} = v\frac{\mathrm{d}v}{\mathrm{d}x}$. The last form is used when the force depends on displacement.`,
  });

  // q02
  b.tf({
    d: 1, skill: "UNDERSTANDING", calculator: false,
    stem: "The equation v = u + at can be used for a particle acted on by a force that increases with time.",
    answer: false,
    explanation: t`The suvat equations need constant acceleration. If the force varies, so does the acceleration, and $v$ must be found by integrating $a$ with respect to $t$.`,
  });

  // q03 a from x(t)
  const xf3 = (s) => s ** 3 - 5 * s * s + 2;
  checkDeriv(xf3, (s) => 3 * s * s - 10 * s, [1, 2, 4]);
  checkDeriv((s) => 3 * s * s - 10 * s, (s) => 6 * s - 10, [1, 2, 4]);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`A particle moves in a straight line so that its displacement from $O$ at time $t$ seconds is $x = (t^3 - 5t^2 + 2)$ m. Find its acceleration when $t = 3$.`,
    value: 8, unit: "m/s²", wrong: [-3, -16],
    explanation: t`$v = \frac{\mathrm{d}x}{\mathrm{d}t} = 3t^2 - 10t$ and $a = \frac{\mathrm{d}v}{\mathrm{d}t} = 6t - 10$. At $t = 3$, $a = 8$ m s$^{-2}$. ($-3$ is the velocity at $t = 3$; $-16$ is the displacement.)`,
  });

  // q04 from rest, a = 4t
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`A particle starts from rest and moves in a straight line with acceleration $a = 4t$ m s$^{-2}$ at time $t$ seconds. Find its speed when $t = 3$.`,
    value: 18, unit: "m/s", wrong: [12, 36],
    explanation: t`$v = \int 4t\,\mathrm{d}t = 2t^2 + c$, and $c = 0$ since it starts from rest. At $t = 3$, $v = 18$ m s$^{-1}$. ($12$ uses $v = at$ with $a = 12$, which assumes constant acceleration.)`,
  });

  // q05 a = 12 − 6t from rest at O
  checkAntideriv((s) => 12 * s - 3 * s * s, (s) => 12 - 6 * s, 0, 4);
  checkAntideriv((s) => 6 * s * s - s ** 3, (s) => 12 * s - 3 * s * s, 0, 4);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`A particle starts from rest at $O$ and moves in a straight line with acceleration $(12 - 6t)$ m s$^{-2}$, where $t$ is the time in seconds. Find the time when it is next at rest and its distance from $O$ at that time.`,
    template: "t = {{blank:t}} s, distance = {{blank:x}} m",
    blanks: [NB("t", 4, 2), NB("x", 32, 12)],
    explanation: t`$v = 12t - 3t^2$ (zero constant). $v = 0$ again when $3t(4 - t) = 0$, so $t = 4$ s. $x = 6t^2 - t^3$ (zero constant), so $x = 96 - 64 = 32$ m. ($t = 2$ is when the acceleration is zero, the time of greatest velocity.)`,
    hints: ["Integrate once for v, set v = 0.", "Integrate again for x; both constants are zero."],
  });

  // q06 a = 2x + 1
  const v6 = sqrt(2 * 4 + 2 * 2 + 1);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A particle moves along the $x$-axis with acceleration $(2x + 1)$ m s$^{-2}$ when its displacement from $O$ is $x$ m. It passes through $O$ with speed $1$ m s$^{-1}$, moving in the positive direction. Find its speed when $x = 2$, correct to 3 significant figures.`,
    value: v6, unit: "m/s", wrong: [f3(sqrt(4 + 2 + 1)), 5],
    explanation: t`$v\frac{\mathrm{d}v}{\mathrm{d}x} = 2x + 1$, so $\frac{1}{2}v^2 = x^2 + x + c$. At $x = 0$, $v = 1$: $c = \frac{1}{2}$. So $v^2 = 2x^2 + 2x + 1$, and at $x = 2$, $v^2 = 13$, $v = ${f3(v6)}$ m s$^{-1}$. (Forgetting the $\frac{1}{2}$ on $\frac{1}{2}v^2$ gives $\sqrt{7}$.)`,
    workedSolution: t`1. $a$ depends on $x$, so use $v\frac{\mathrm{d}v}{\mathrm{d}x} = 2x + 1$.
2. $\int v\,\mathrm{d}v = \int (2x + 1)\,\mathrm{d}x$: $\frac{1}{2}v^2 = x^2 + x + c$.
3. $x = 0$, $v = 1$: $c = 0.5$; so $v^2 = 2x^2 + 2x + 1$.
4. $x = 2$: $v = \sqrt{13} = ${f3(v6)}$ m s$^{-1}$.`,
    hints: ["Acceleration depends on x: use v dv/dx.", "Use the speed at O to find the constant."],
  });

  // q07 choosing the form
  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`A boat moves against a water resistance of $kv^2$ newtons. You are asked for the DISTANCE it travels while slowing from $8$ m s$^{-1}$ to $3$ m s$^{-1}$. Which form of the acceleration should you use in Newton's second law?`,
    options: [
      [t`$v\dfrac{\mathrm{d}v}{\mathrm{d}x}$`, "Correct: it links v and x, so separating gives the distance directly."],
      [t`$\dfrac{\mathrm{d}v}{\mathrm{d}t}$`, "This links v and t; it gives the time taken, and finding distance would need a second integration."],
      [t`$\dfrac{v - u}{t}$`, "That assumes constant acceleration, but the resistance changes with v."],
      [t`$\dfrac{v^2 - u^2}{2s}$`, "This suvat form also assumes constant acceleration."],
    ],
    answer: "A",
    explanation: t`$mv\frac{\mathrm{d}v}{\mathrm{d}x} = -kv^2$ separates to $\int \frac{m}{kv}\,\mathrm{d}v = -\int \mathrm{d}x$, which gives the distance between the two speeds.`,
  });

  // q08 resistance 0.5v, halving time
  const T8 = 4 * log(2);
  checkDeriv((s) => 10 * exp(-s / 4), (s) => (-0.5 * 10 * exp(-s / 4)) / 2, [0.5, 2, 5]);
  b.calc({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`A particle of mass $2$ kg is projected with speed $10$ m s$^{-1}$ along a smooth horizontal surface. The only horizontal force is a resistance of magnitude $0.5v$ N, where $v$ is the speed. Find the time taken for its speed to fall to $5$ m s$^{-1}$, correct to 3 significant figures.`,
    value: T8, unit: "s", wrong: [f3(log(2)), 20],
    explanation: t`$2\frac{\mathrm{d}v}{\mathrm{d}t} = -0.5v$, so $\int_{10}^{5} \frac{\mathrm{d}v}{v} = -\int_0^T \frac{\mathrm{d}t}{4}$. Then $\ln\frac{5}{10} = -\frac{T}{4}$, giving $T = 4\ln 2 = ${f3(T8)}$ s. ($20$ s would come from a constant deceleration of $0.25$ m s$^{-2}$, which is wrong.)`,
    workedSolution: t`1. Newton's second law: $2\frac{\mathrm{d}v}{\mathrm{d}t} = -0.5v$.
2. Separate: $\frac{1}{v}\,\mathrm{d}v = -\frac{1}{4}\,\mathrm{d}t$.
3. $[\ln v]_{10}^{5} = -\frac{T}{4}$, so $T = 4\ln 2 = ${f3(T8)}$ s.`,
    hints: ["Time is asked: use dv/dt.", "Separate the variables and use limits."],
  });

  // q09 same, total distance
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`A particle of mass $2$ kg moves along a smooth horizontal surface against a resistance of magnitude $0.5v$ N and no other horizontal force. It passes a point $A$ with speed $14$ m s$^{-1}$. Show that its speed falls linearly with distance, and find the total distance it travels beyond $A$.`,
    value: 56, unit: "m", wrong: [28, 7],
    explanation: t`$2v\frac{\mathrm{d}v}{\mathrm{d}x} = -0.5v$, so $\frac{\mathrm{d}v}{\mathrm{d}x} = -\frac{1}{4}$ and $v = 14 - \frac{x}{4}$, a linear fall with distance. The speed reaches $0$ when $x = 56$ m. (It never actually stops in a finite time, since $v = 14\mathrm{e}^{-t/4}$, but the distance covered approaches $56$ m.)`,
    hints: ["Distance is asked: use v dv/dx; v cancels."],
  });

  // q10 resistance 0.2v², 12 → 5
  const x10 = 25 * log(12 / 5);
  b.calc({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`A trolley of mass $5$ kg moves in a straight line on a horizontal track against an air resistance of $0.2v^2$ N. No other horizontal force acts. Find the distance it travels while its speed falls from $12$ m s$^{-1}$ to $5$ m s$^{-1}$, correct to 3 significant figures.`,
    value: x10, unit: "m", wrong: [f3(25 * (1 / 5 - 1 / 12) * 12), f3(log(12 / 5))],
    explanation: t`$5v\frac{\mathrm{d}v}{\mathrm{d}x} = -0.2v^2$, so $\frac{\mathrm{d}v}{\mathrm{d}x} = -\frac{v}{25}$. Then $\int_{12}^{5}\frac{\mathrm{d}v}{v} = -\frac{X}{25}$, giving $X = 25\ln\frac{12}{5} = ${f3(x10)}$ m.`,
    workedSolution: t`1. $5v\frac{\mathrm{d}v}{\mathrm{d}x} = -0.2v^2 \Rightarrow \frac{1}{v}\frac{\mathrm{d}v}{\mathrm{d}x} = -0.04$.
2. $\ln 5 - \ln 12 = -0.04X$.
3. $X = 25\ln 2.4 = ${f3(x10)}$ m.`,
    hints: ["Distance is asked: use v dv/dx.", "Cancel one factor of v before separating."],
  });

  // q11 ball in oil, terminal velocity and time
  const T11 = (1 / 14) * log(0.7 / 0.2);
  checkDeriv((s) => 0.7 * (1 - exp(-14 * s)), (s) => (0.05 * 9.8 - 0.7 * 0.7 * (1 - exp(-14 * s))) / 0.05, [0.01, 0.05, 0.2]);
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`A small steel ball of mass $0.05$ kg is released from rest in a tall jar of oil. The oil exerts a resistance of $0.7v$ N; ignore any upthrust. Take $g = 9.8$ m s$^{-2}$. Find the terminal velocity of the ball, and the time it takes to reach a speed of $0.5$ m s$^{-1}$ (3 significant figures).`,
    template: "terminal velocity = {{blank:v}} m/s, time = {{blank:t}} s",
    blanks: [NB("v", 0.7, 14), NB("t", T11, f3(0.5 / 9.8))],
    explanation: t`$0.05\frac{\mathrm{d}v}{\mathrm{d}t} = 0.49 - 0.7v = 0.7(0.7 - v)$, so $\frac{\mathrm{d}v}{\mathrm{d}t} = 14(0.7 - v)$. Terminal velocity: $v = 0.7$ m s$^{-1}$. Separating: $\int_0^{0.5}\frac{\mathrm{d}v}{0.7 - v} = 14T$, so $\ln\frac{0.7}{0.2} = 14T$ and $T = ${f3(T11)}$ s. (Free fall, $\frac{0.5}{9.8}$ s, ignores the resistance.)`,
    hints: ["Terminal velocity: resultant force zero.", "Separate: dv/(0.7 − v) = 14 dt."],
  });

  // q12 vector velocity
  b.expr({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`A particle moves in a plane so that its position vector at time $t$ seconds is $\mathbf{r} = 3t^2\mathbf{i} + (t^3 - 6t)\mathbf{j}$ metres. Find its velocity when $t = 2$. Type it in the form ai+bj, e.g. 5i-2j.`,
    accepted: ["12i+6j", "6j+12i", "(12,6)", "12i+6j m/s"],
    rejected: ["12i-4j", "6i+12j"],
    wrong: ["12i-4j", "6i+12j"],
    explanation: t`$\mathbf{v} = \dot{\mathbf{r}} = 6t\mathbf{i} + (3t^2 - 6)\mathbf{j}$. At $t = 2$: $\mathbf{v} = 12\mathbf{i} + 6\mathbf{j}$ m s$^{-1}$. ($12\mathbf{i} - 4\mathbf{j}$ is the position vector at $t = 2$.)`,
    hints: ["Differentiate each component with respect to t."],
  });

  // q13 magnitude of acceleration
  const a13 = sqrt(6 * 6 + 12 * 12);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`For the particle with position vector $\mathbf{r} = 3t^2\mathbf{i} + (t^3 - 6t)\mathbf{j}$ m, find the magnitude of its acceleration when $t = 2$, correct to 3 significant figures.`,
    value: a13, unit: "m/s²", wrong: [18, f3(sqrt(72))],
    explanation: t`$\mathbf{a} = \ddot{\mathbf{r}} = 6\mathbf{i} + 6t\mathbf{j}$; at $t = 2$, $\mathbf{a} = 6\mathbf{i} + 12\mathbf{j}$ and $|\mathbf{a}| = \sqrt{36 + 144} = ${f3(a13)}$ m s$^{-2}$. (Adding the components, $18$, is not the magnitude; $8.49$ uses $6t$ with $t = 1$.)`,
    hints: ["Differentiate twice, then use Pythagoras."],
  });

  // q14 match
  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each situation with the best way to start the solution.",
    pairs: [
      ["Force given in terms of t; velocity asked", t`Integrate $a = \frac{\mathrm{d}v}{\mathrm{d}t}$ with respect to $t$`],
      ["Force given in terms of x; speed at a point asked", t`Use $v\frac{\mathrm{d}v}{\mathrm{d}x} = a$ and integrate with respect to $x$`],
      ["Resistance kv; time to slow down asked", t`Separate $m\frac{\mathrm{d}v}{\mathrm{d}t} = -kv$`],
      ["Position vector given in terms of t; acceleration asked", "Differentiate each component twice"],
    ],
    explanation: "Match the form of the acceleration to the variable the force depends on and the quantity asked for.",
  });

  // q15 proof: v = 25(1 − e^{−0.4t})
  checkDeriv((s) => 25 * (1 - exp(-0.4 * s)), (s) => (5000 - 200 * 25 * (1 - exp(-0.4 * s))) / 500, [1, 3, 8]);
  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 5,
    stem: t`A minibus of mass $500$ kg starts from rest on a level road. Its engine exerts a constant driving force of $5000$ N and the total resistance is $200v$ N when its speed is $v$ m s$^{-1}$. Show that $v = 25\left(1 - \mathrm{e}^{-0.4t}\right)$ at time $t$ seconds.`,
    points: [
      "M1 Newton's second law: 500 dv/dt = 5000 − 200v.",
      "A1 simplifies to dv/dt = 0.4(25 − v).",
      "M1 separates: ∫ dv/(25 − v) = ∫ 0.4 dt.",
      "A1 −ln(25 − v) = 0.4t + c with c = −ln 25 from v = 0 at t = 0.",
      "A1 rearranges to v = 25(1 − e^(−0.4t)).",
    ],
    modelAnswer: t`$$
500\frac{\mathrm{d}v}{\mathrm{d}t} = 5000 - 200v \;\Rightarrow\; \frac{\mathrm{d}v}{\mathrm{d}t} = 0.4(25 - v)
$$
$$
\int_0^v \frac{\mathrm{d}v}{25 - v} = \int_0^t 0.4\,\mathrm{d}t \;\Rightarrow\; -\ln(25 - v) + \ln 25 = 0.4t
$$
$$
\ln\frac{25 - v}{25} = -0.4t \;\Rightarrow\; 25 - v = 25\mathrm{e}^{-0.4t} \;\Rightarrow\; v = 25\left(1 - \mathrm{e}^{-0.4t}\right)
$$`,
    explanation: "Set up F = ma with the correct signs, separate, integrate with limits, rearrange.",
    hints: ["Factor 200 out of the right-hand side."],
  });

  // q16 explain terminal velocity
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: t`For the minibus with $v = 25\left(1 - \mathrm{e}^{-0.4t}\right)$, explain what happens to its speed as $t$ increases, and why the model says it never quite reaches $25$ m s$^{-1}$.`,
    points: [
      "As t increases, e^(−0.4t) → 0, so v increases towards 25 m/s (terminal velocity, where driving force = resistance).",
      "e^(−0.4t) is positive for every t, so v < 25 always: the acceleration 0.4(25 − v) gets smaller as v approaches 25.",
    ],
    modelAnswer: "The speed rises quickly at first and then levels off towards 25 m/s, where 5000 = 200v and the resultant force is zero. Since e^(−0.4t) > 0 for all t, v is always less than 25; the closer v gets, the smaller the resultant force and acceleration, so it approaches 25 m/s without reaching it.",
    explanation: "Terminal velocity is the limit of v as t → ∞.",
    hints: ["What does e^(−0.4t) do as t grows?"],
  });

  // q17 struct 5: force in terms of time
  const v17 = (s) => 3 * s * s - (s ** 3) / 3;
  const x17 = (s) => s ** 3 - (s ** 4) / 12;
  checkAntideriv(v17, (s) => (18 * s - 3 * s * s) / 3, 0, 5);
  checkAntideriv(x17, v17, 0, 9);
  chk(v17(9), 0, 1e-9);
  chk(x17(9), 182.25, 1e-9);
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: t`A particle of mass $3$ kg starts from rest at $O$ and moves in a straight line under a single force of $(18t - 3t^2)$ N at time $t$ seconds.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: "Its velocity is v = pt² − t³/q. Find p and q.", template: "p = {{blank:p}}, q = {{blank:q}}",
        blanks: [NB("p", 3, 9), NB("q", 3, 1)],
        explanation: t`$a = \frac{F}{m} = 6t - t^2$, so $v = 3t^2 - \frac{t^3}{3}$ (zero constant): $p = 3$, $q = 3$. (Forgetting to divide by the mass gives $9t^2 - t^3$.)` }),
      P.num({ label: "(b)", marks: 1, stem: "Find the time when the particle is next at rest.", value: 9, unit: "s", wrong: [6],
        explanation: t`$t^2\left(3 - \frac{t}{3}\right) = 0$ gives $t = 9$ s.` }),
      P.num({ label: "(c)", marks: 2, stem: "Find its distance from O at that time, correct to 3 significant figures.", value: 182.25, unit: "m", wrong: [729],
        explanation: t`$x = t^3 - \frac{t^4}{12}$; at $t = 9$, $x = 729 - 546.75 = 182.25$, so $182$ m (3 s.f.).` }),
    ],
    explanation: "Divide the force by the mass, then integrate twice using the initial conditions.",
    hints: ["a = F/m.", "Both constants of integration are zero."],
  });

  // q18 struct 13: driving force against kv²
  const k18 = 1200 / 400;
  chk(k18, 3, 1e-12);
  const X18 = 100 * log(4 / 3);
  const T18 = 5 * log(3);
  chk(integrate((v) => (200 * v) / (400 - v * v), 0, 10, 20000), X18, 1e-6);
  chk(integrate((v) => 200 / (400 - v * v), 0, 10, 20000), T18, 1e-6);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`A car of mass $600$ kg moves along a straight level road. The engine produces a constant driving force of $1200$ N and the resistance to motion is $kv^2$ N, where $v$ m s$^{-1}$ is the speed. The car's terminal speed is $20$ m s$^{-1}$. The car starts from rest.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Find k.", value: 3, wrong: [60],
        explanation: t`At terminal speed the forces balance: $k(20)^2 = 1200$, so $k = 3$.` }),
      P.proof({ label: "(b)", marks: 3, stem: t`Show that $200v\dfrac{\mathrm{d}v}{\mathrm{d}x} = 400 - v^2$, where $x$ m is the distance travelled.`,
        points: ["M1 Newton's second law with a = v dv/dx: 600v dv/dx = 1200 − 3v².", "A1 divides by 3.", "A1 reaches 200v dv/dx = 400 − v²."],
        modelAnswer: t`$$
600v\frac{\mathrm{d}v}{\mathrm{d}x} = 1200 - 3v^2
$$
Dividing by 3:
$$
200v\frac{\mathrm{d}v}{\mathrm{d}x} = 400 - v^2
$$`,
        explanation: "Distance is involved, so use v dv/dx." }),
      P.num({ label: "(c)", marks: 4, stem: "Find the distance the car travels while reaching a speed of 10 m/s, correct to 3 significant figures.", value: X18, unit: "m", wrong: [f3(100 * log(4))],
        explanation: t`$\int_0^{10}\frac{200v}{400 - v^2}\,\mathrm{d}v = X$: $\left[-100\ln(400 - v^2)\right]_0^{10} = 100\ln\frac{400}{300} = 100\ln\frac{4}{3} = ${f3(X18)}$ m.` }),
      P.num({ label: "(d)", marks: 4, stem: "Find the time it takes to reach 10 m/s, correct to 3 significant figures.", value: T18, unit: "s", wrong: [f3(10 * log(3))],
        explanation: t`$200\frac{\mathrm{d}v}{\mathrm{d}t} = 400 - v^2$, so $T = \int_0^{10}\frac{200}{(20 - v)(20 + v)}\,\mathrm{d}v = 200 \cdot \frac{1}{40}\left[\ln\frac{20 + v}{20 - v}\right]_0^{10} = 5\ln 3 = ${f3(T18)}$ s (partial fractions).` }),
    ],
    explanation: "Terminal speed gives k; use v dv/dx for distance and dv/dt (with partial fractions) for time.",
    hints: ["At terminal speed the acceleration is zero.", t`$\frac{1}{400 - v^2} = \frac{1}{40}\left(\frac{1}{20 - v} + \frac{1}{20 + v}\right)$.`],
  });

  // ---------------------------------------------------------------- cards
  b.card("FORMULA", "Forms of acceleration in a straight line", t`$a = \dfrac{\mathrm{d}v}{\mathrm{d}t} = \dfrac{\mathrm{d}^2x}{\mathrm{d}t^2} = v\dfrac{\mathrm{d}v}{\mathrm{d}x}$`);
  b.card("CONCEPT", "Acceleration given as a function of displacement x", t`Use $v\frac{\mathrm{d}v}{\mathrm{d}x} = f(x)$: $\int v\,\mathrm{d}v = \int f(x)\,\mathrm{d}x$ gives $\tfrac{1}{2}v^2$ in terms of $x$.`);
  b.card("CONCEPT", "Acceleration given as a function of time t", "Integrate with respect to t for v, again for x; fix each constant from the initial conditions.");
  b.card("CONCEPT", "Resistance depending on v: which form?", "Time asked → m dv/dt = F(v); distance asked → mv dv/dx = F(v). Separate the variables.");
  b.card("DEFINITION", "Terminal velocity", "The limiting speed at which the resultant force (and acceleration) is zero, e.g. driving force = resistance.");
  b.card("FACT", "Sign of a resistance", t`Opposes motion: enters Newton's law as $-kv$ or $-kv^2$ when the positive direction is the direction of motion.`);
  b.card("CONCEPT", "Variable motion in the plane", t`$\mathbf{v} = \dot{\mathbf{r}}$, $\mathbf{a} = \ddot{\mathbf{r}}$ component by component; integrate components with constant vectors from initial conditions; $\mathbf{F} = m\mathbf{a}$.`);
  b.card("FACT", "Why suvat fails here", "suvat assumes constant acceleration; a force depending on t, x or v gives a variable acceleration.");
});
