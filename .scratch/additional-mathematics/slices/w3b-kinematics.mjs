// W3b: amath.calculus.kinematics (Cambridge only)
import { concept, P, t, chk, same, quad, integrate, checkDeriv, steps } from "../lib.mjs";

const { exp, sin, cos, PI, abs } = Math;
const dist = (v, a, b) => integrate((x) => abs(v(x)), a, b, 60000);

concept("amath.calculus.kinematics", { file: "calculus/kinematics", keyPrefix: "calculus.kinematics" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`A particle moving in a straight line has velocity $v$ m s$^{-1}$ at time $t$ seconds. Which expression gives its acceleration?`,
    options: [
      [t`$\dfrac{dv}{dt}$`, "Correct: acceleration is the rate of change of velocity."],
      [t`$\displaystyle\int v\,dt$`, "Integrating velocity gives displacement, not acceleration."],
      [t`$\dfrac{ds}{dt}$`, "This is the velocity itself."],
      [t`$\dfrac{v}{t}$`, "This is an average and is correct only for constant acceleration from rest."],
    ],
    answer: "A",
    explanation: t`$a = \frac{dv}{dt} = \frac{d^2s}{dt^2}$. Differentiating moves from $s$ to $v$ to $a$; integrating moves back.`,
  });

  b.tf({
    d: 1, skill: "RECALL", calculator: false,
    stem: "Speed can be negative when a particle moves in the negative direction.",
    answer: false,
    explanation: t`False. Speed is the magnitude $|v|$ of the velocity and is never negative. The velocity is negative when the particle moves in the negative direction.`,
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`A question says that a particle "starts from rest at $O$". Which initial conditions does this give?`,
    options: [
      [t`$v = 0$ and $s = 0$ when $t = 0$`, "Correct: 'from rest' fixes the velocity and 'at O' fixes the displacement."],
      [t`$a = 0$ and $s = 0$ when $t = 0$`, "Rest refers to the velocity; the acceleration need not be zero."],
      [t`$v = 0$ and $a = 0$ when $t = 0$`, "Nothing is said about the acceleration, and the position at O gives s = 0."],
      [t`$s = 0$ only, when $t = 0$`, "'From rest' also tells you that v = 0 when t = 0."],
    ],
    answer: "A",
    explanation: t`"At rest" means $v = 0$ and "at $O$" means $s = 0$. These two conditions find the two constants when $a$ is integrated twice.`,
  });

  {
    const s = (x) => 2 * x ** 3 - 5 * x;
    const v = (x) => 6 * x * x - 5;
    checkDeriv(s, v, [1, 2]);
    b.num({
      d: 2, skill: "APPLICATION", calculator: false, daily: true,
      stem: t`A particle moves in a straight line so that its displacement from $O$ after $t$ seconds is $s = 2t^3 - 5t$ metres. Find its velocity when $t = 2$.`,
      value: v(2), unit: "m/s", wrong: [6, 24],
      explanation: t`$v = \frac{ds}{dt} = 6t^2 - 5$. At $t = 2$: $v = 24 - 5 = 19$ m s$^{-1}$. The value 6 is the displacement $s(2)$, not the velocity.`,
    });
  }

  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`The velocity of a particle after $t$ seconds is $v = t^2 - 4t + 3$ m s$^{-1}$. Find its acceleration when $t = 5$.`,
    value: 2 * 5 - 4, unit: "m/s²", wrong: [8, 10],
    explanation: t`$a = \frac{dv}{dt} = 2t - 4$. At $t = 5$: $a = 6$ m s$^{-2}$. The value 8 is the velocity at $t = 5$.`,
  });

  {
    same(quad.roots(1, -7, 10), [2, 5]);
    b.fib({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`A particle has velocity $v = t^2 - 7t + 10$ m s$^{-1}$ at time $t$ seconds. Find the two times when it is instantaneously at rest, in ascending order.`,
      template: "t = {{blank:a}} s and t = {{blank:b}} s",
      blanks: [{ id: "a", input: "number", accepted: [2], wrong: "-2" }, { id: "b", input: "number", accepted: [5], wrong: "-5" }],
      explanation: t`At rest: $v = 0$. $t^2 - 7t + 10 = (t - 2)(t - 5) = 0$, so $t = 2$ s and $t = 5$ s.`,
      hints: ["Instantaneous rest means v = 0."],
    });
  }

  {
    chk(integrate((x) => 3 * x * x - 2 * x, 0, 3), 18, 1e-9);
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`A particle starts from $O$ and moves in a straight line with velocity $v = 3t^2 - 2t$ m s$^{-1}$, where $t \geq 0$. Find its displacement from $O$ when $t = 3$.`,
      value: 18, unit: "m", wrong: [21, 16],
      explanation: t`$s = \int (3t^2 - 2t)\,dt = t^3 - t^2 + c$, and $s = 0$ at $t = 0$ gives $c = 0$. At $t = 3$: $s = 27 - 9 = 18$ m. The value 16 is the acceleration $6t - 2$ at $t = 3$.`,
      hints: ["Integrate v and use s = 0 when t = 0."],
    });
  }

  {
    // v = t² − 5t + 4 = (t − 1)(t − 4), distance 0..5
    const s = (x) => x ** 3 / 3 - 2.5 * x * x + 4 * x;
    const d = s(1) - s(0) + (s(1) - s(4)) + (s(5) - s(4));
    chk(d, 49 / 6, 1e-12);
    chk(dist((x) => x * x - 5 * x + 4, 0, 5), d, 1e-5);
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: false,
      stem: t`A particle starts from $O$ with velocity $v = t^2 - 5t + 4$ m s$^{-1}$. Find the total distance it travels in the first 5 seconds, as a fraction or correct to 3 significant figures.`,
      value: d, unit: "m", wrong: [abs(s(5)), s(1)],
      explanation: t`$v = (t - 1)(t - 4)$, so it turns round at $t = 1$ and $t = 4$. With $s = \frac{t^3}{3} - \frac{5t^2}{2} + 4t$: $s(1) = \frac{11}{6}$, $s(4) = -\frac{8}{3}$, $s(5) = -\frac{5}{6}$. Distance $= \frac{11}{6} + \frac{27}{6} + \frac{11}{6} = \frac{49}{6} \approx 8.17$ m. The displacement $|s(5)| = \frac{5}{6}$ is not the distance.`,
      workedSolution: steps(
        t`Times of rest: $v = (t - 1)(t - 4) = 0$ gives $t = 1$ and $t = 4$.`,
        t`$s(0) = 0$, $s(1) = \frac{11}{6}$, $s(4) = -\frac{8}{3}$, $s(5) = -\frac{5}{6}$.`,
        t`Stage lengths: $\frac{11}{6}$, $\frac{11}{6} + \frac{8}{3} = \frac{27}{6}$ and $-\frac{5}{6} + \frac{8}{3} = \frac{11}{6}$.`,
        t`Distance $= \frac{49}{6} \approx 8.17$ m.`,
      ),
      hints: ["Find when v = 0 between t = 0 and t = 5.", "Add the lengths of the three stages."],
    });
  }

  {
    const v = (x) => 2.5 * cos(x / 2);
    checkDeriv((x) => 5 * sin(x / 2), v, [0.5, 1]);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`The displacement of a particle from $O$ is $s = 5\sin\left(\frac{t}{2}\right)$ metres at time $t$ seconds. Find its velocity when $t = 1$, correct to 3 significant figures.`,
      value: v(1), unit: "m/s", wrong: [2.5 * cos((0.5 * PI) / 180), 5 * cos(0.5)],
      explanation: t`$v = \frac{ds}{dt} = \frac{5}{2}\cos\left(\frac{t}{2}\right)$. At $t = 1$: $v = 2.5\cos 0.5 = 2.19$ m s$^{-1}$ (radians). Degree mode gives 2.50; forgetting the factor $\frac{1}{2}$ from the chain rule gives 4.39.`,
      hints: ["Chain rule: the derivative of sin(t/2) is ½cos(t/2).", "Calculator in radians."],
    });
  }

  {
    const a = (x) => 6 * exp(-0.5 * x);
    checkDeriv((x) => 12 - 12 * exp(-0.5 * x), a, [0, 2]);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A car accelerates away from a junction in Gweru with velocity $v = 12 - 12e^{-0.5t}$ m s$^{-1}$ at time $t$ seconds. Find its acceleration when $t = 2$, correct to 3 significant figures.`,
      value: a(2), unit: "m/s²", wrong: [12 - 12 * exp(-1), 12 * exp(-1)],
      explanation: t`$a = \frac{dv}{dt} = 12 \times 0.5e^{-0.5t} = 6e^{-0.5t}$. At $t = 2$: $a = 6e^{-1} = 2.21$ m s$^{-2}$. The value 7.59 is the velocity at $t = 2$; 4.41 forgets to multiply by 0.5.`,
      hints: [t`$\frac{d}{dt}e^{-0.5t} = -0.5e^{-0.5t}$.`],
    });
  }

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "The velocity of a particle is positive throughout a time interval. What does the area between its velocity–time graph and the time axis over that interval represent?",
    options: [
      ["The distance travelled in that interval", "Correct: area under v–t is ∫ v dt, the displacement, which equals the distance when v > 0."],
      ["The acceleration of the particle over the interval", "Acceleration is the gradient of the velocity–time graph, not the area under it."],
      ["The average velocity of the particle in the interval", "Average velocity is the displacement divided by the time taken."],
      ["The change in velocity during that interval", "Change in velocity is the area under an acceleration–time graph."],
    ],
    answer: "A",
    explanation: t`Area under a velocity–time graph $= \int v\,dt$ = displacement. When $v > 0$ throughout, the particle never turns round, so this is also the distance travelled.`,
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each feature of a motion graph with what it represents.",
    pairs: [
      ["Gradient of a displacement–time graph", "Velocity"],
      ["Gradient of a velocity–time graph", "Acceleration"],
      ["Area under a speed–time graph", "Distance travelled"],
      ["Area under an acceleration–time graph", "Change in velocity"],
    ],
    explanation: t`Gradients differentiate ($v = \frac{ds}{dt}$, $a = \frac{dv}{dt}$); areas integrate ($\int |v|\,dt$ = distance, $\int a\,dt$ = change in velocity).`,
  });

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: "A particle moving in a straight line changes its direction of motion at time T. Which statement must be true at time T?",
    options: [
      [t`$v = 0$ and $v$ changes sign at $T$`, "Correct: the particle stops and then moves the other way."],
      [t`$a = 0$ and $a$ changes sign at $T$`, "This describes a maximum or minimum of the velocity, not a change of direction."],
      [t`$s = 0$, so it is passing through $O$`, "A particle can pass through O without stopping, and can turn round anywhere."],
      [t`$v$ has its greatest value at $T$`, "At a greatest velocity a = 0; the particle is still moving in the same direction."],
    ],
    answer: "A",
    explanation: t`Direction is given by the sign of $v$. To reverse, $v$ must pass through 0 and change sign. ($v = 0$ alone is not enough: $v = t^2$ touches 0 at $t = 0$ without changing sign.)`,
    hints: ["Which quantity's sign tells you the direction of motion?"],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`If a particle's displacement from $O$ is $s = 0$ when $t = 4$, then the particle is at rest when $t = 4$.`,
    answer: false,
    explanation: t`False. $s = 0$ means the particle is at $O$; it is at rest only if $v = \frac{ds}{dt} = 0$. A particle usually passes through $O$ while moving.`,
  });

  {
    // a = 4 − 2t, v(0) = 5 → v = 5 + 4t − t² = 0 at t = 5
    same(quad.roots(-1, 4, 5), [-1, 5]);
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`A particle has acceleration $a = 4 - 2t$ m s$^{-2}$ and initial velocity $5$ m s$^{-1}$. Find the time at which it comes to instantaneous rest.`,
      value: 5, unit: "s", wrong: [2, -1],
      explanation: t`$v = \int (4 - 2t)\,dt = 4t - t^2 + c$, with $v = 5$ at $t = 0$, so $v = 5 + 4t - t^2$. $v = 0$: $t^2 - 4t - 5 = (t - 5)(t + 1) = 0$, so $t = 5$ s ($t = -1$ is rejected). The value 2 is when $a = 0$, the time of greatest velocity.`,
      hints: ["Integrate a to get v, then use v = 5 when t = 0.", "Reject negative times."],
    });
  }

  {
    // v(0) = 3, a = 6t → v = 3t² + 3, s = t³ + 3t, s(2) = 14
    const s = (x) => x ** 3 + 3 * x;
    checkDeriv(s, (x) => 3 * x * x + 3, [0, 2]);
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`A particle starts at $O$ with velocity $3$ m s$^{-1}$, and its acceleration at time $t$ seconds is $6t$ m s$^{-2}$. Find its displacement from $O$ when $t = 2$.`,
      value: s(2), unit: "m", wrong: [8, 15],
      explanation: t`$v = 3t^2 + c$ with $v = 3$ at $t = 0$: $v = 3t^2 + 3$. Then $s = t^3 + 3t + k$ with $s = 0$ at $t = 0$: $k = 0$. At $t = 2$: $s = 8 + 6 = 14$ m. Forgetting the initial velocity gives 8; 15 is the velocity at $t = 2$.`,
      hints: ["Two integrations, two constants: use v = 3 and s = 0 at t = 0."],
    });
  }

  {
    // v = t² − 6t + 8: least velocity at t = 3, v = −1
    chk(3 ** 2 - 6 * 3 + 8, -1);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`A particle has velocity $v = t^2 - 6t + 8$ m s$^{-1}$ for $t \geq 0$. Find its least velocity.`,
      options: [
        [t`$-1$ m s$^{-1}$`, t`Correct: $a = 2t - 6 = 0$ at $t = 3$, and $v(3) = 9 - 18 + 8 = -1$.`],
        [t`$0$ m s$^{-1}$`, "The velocity is 0 at t = 2 and t = 4, but it is negative in between."],
        [t`$3$ m s$^{-1}$`, "3 is the time at which the least velocity occurs, not the velocity."],
        [t`$8$ m s$^{-1}$`, "8 is the initial velocity, which is the greatest value near t = 0, not the least."],
      ],
      answer: "A",
      explanation: t`Least velocity where $a = \frac{dv}{dt} = 0$: $2t - 6 = 0$, $t = 3$. Then $v = -1$ m s$^{-1}$ (the particle is moving backwards at 1 m s$^{-1}$).`,
      hints: ["Least velocity: set the acceleration equal to 0."],
    });
  }

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 3,
    stem: t`A particle has velocity $v = 8 - 2t$ m s$^{-1}$ for $0 \leq t \leq 6$. Describe the velocity–time graph and the speed–time graph for this motion.`,
    points: [
      t`Velocity–time: a straight line from $(0, 8)$ with gradient $-2$, crossing the $t$-axis at $t = 4$ and ending at $(6, -4)$.`,
      t`Speed–time: the same line from $(0, 8)$ down to $(4, 0)$.`,
      t`Then the part below the axis is reflected: the speed–time graph rises from $(4, 0)$ to $(6, 4)$ (a V shape).`,
    ],
    modelAnswer: t`The velocity–time graph is a straight line starting at 8 m s$^{-1}$, falling with gradient $-2$ (constant deceleration), crossing the $t$-axis at $t = 4$ s and ending at $-4$ m s$^{-1}$ when $t = 6$. The speed–time graph is the same line down to $(4, 0)$, then the negative part is reflected in the $t$-axis, so it rises in a straight line to 4 m s$^{-1}$ at $t = 6$: a V shape with its vertex at $(4, 0)$.`,
    explanation: "Speed = |v|: reflect the parts of the velocity graph below the t-axis.",
    hints: ["Where is v = 0?"],
  });

  {
    // s = t³ − 9t² + 24t
    const s = (x) => x ** 3 - 9 * x * x + 24 * x;
    checkDeriv(s, (x) => 3 * x * x - 18 * x + 24, [0, 3]);
    same(quad.roots(3, -18, 24), [2, 4]);
    same([s(2), s(4), s(5)], [20, 16, 20]);
    const d = 20 + 4 + 4;
    chk(dist((x) => 3 * x * x - 18 * x + 24, 0, 5), d, 1e-5);
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
      stem: t`A particle moves in a straight line so that, $t$ seconds after leaving $O$, its displacement is $s = t^3 - 9t^2 + 24t$ metres.`,
      parts: [
        P.fib({ label: "(a)", marks: 2, stem: t`Find the times when the particle is at rest, in ascending order.`, template: "t = {{blank:a}} s and t = {{blank:b}} s",
          blanks: [{ id: "a", input: "number", accepted: [2], wrong: "3" }, { id: "b", input: "number", accepted: [4], wrong: "6" }],
          explanation: t`$v = 3t^2 - 18t + 24 = 3(t - 2)(t - 4) = 0$.` }),
        P.num({ label: "(b)", marks: 1, stem: t`Find the acceleration of the particle when $t = 4$.`, value: 6 * 4 - 18, unit: "m/s²", wrong: [0],
          explanation: t`$a = 6t - 18 = 6$ m s$^{-2}$.` }),
        P.num({ label: "(c)", marks: 3, stem: t`Find the total distance travelled in the first 5 seconds.`, value: d, unit: "m", wrong: [20, 12],
          explanation: t`$s(0) = 0$, $s(2) = 20$, $s(4) = 16$, $s(5) = 20$. Distance $= 20 + 4 + 4 = 28$ m (the displacement at $t = 5$ is only 20 m).` }),
      ],
      explanation: "Differentiate for v and a; for the distance, list s at the start, at each time of rest and at the end.",
      hints: [t`$s(4) = 64 - 144 + 96$.`],
    });
  }

  {
    // v = 4 sin 2t, 0 ≤ t ≤ π
    const v = (x) => 4 * sin(2 * x);
    const s = (x) => 2 - 2 * cos(2 * x);
    checkDeriv(s, v, [0.3, 1, 2]);
    chk(8 * cos(PI / 3), 4, 1e-12);
    chk(dist(v, 0, PI), 8, 1e-5);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
      stem: t`A particle $P$ starts from $O$ and moves in a straight line so that its velocity after $t$ seconds is $v = 4\sin 2t$ m s$^{-1}$, for $0 \leq t \leq \pi$.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: t`Find the acceleration of $P$ when $t = \frac{\pi}{6}$.`, value: 4, unit: "m/s²", wrong: [2],
          explanation: t`$a = 8\cos 2t$; at $t = \frac{\pi}{6}$: $8\cos\frac{\pi}{3} = 4$ m s$^{-2}$.` }),
        P.num({ label: "(b)", marks: 2, stem: t`Find the time when $P$ first comes to rest after leaving $O$, correct to 3 significant figures.`, value: PI / 2, unit: "s", wrong: [PI],
          explanation: t`$\sin 2t = 0$ with $t > 0$: $2t = \pi$, $t = \frac{\pi}{2} \approx 1.57$ s.` }),
        P.fib({ label: "(c)", marks: 2, stem: t`Find $s$ in terms of $t$ in the form $s = p + q\cos 2t$.`, template: "p = {{blank:p}}, q = {{blank:q}}",
          blanks: [{ id: "p", input: "number", accepted: [2], wrong: "0" }, { id: "q", input: "number", accepted: [-2], wrong: "-8" }],
          explanation: t`$s = \int 4\sin 2t\,dt = -2\cos 2t + c$; $s = 0$ at $t = 0$ gives $c = 2$.` }),
        P.num({ label: "(d)", marks: 2, stem: t`Find the total distance travelled by $P$ from $t = 0$ to $t = \pi$.`, value: 8, unit: "m", wrong: [0, 4],
          explanation: t`$P$ moves out to $s\left(\frac{\pi}{2}\right) = 2 + 2 = 4$ m and comes back to $s(\pi) = 0$: distance $4 + 4 = 8$ m, although the displacement is 0.` }),
      ],
      explanation: "Differentiate for a, set v = 0 for rest, integrate with s = 0 at t = 0, then add the outward and return stages.",
      hints: [t`$\int \sin 2t\,dt = -\frac{1}{2}\cos 2t$.`, "The constant of integration is not 0 here."],
    });
  }

  b.card("FORMULA", "Velocity and acceleration", t`$v = \dfrac{ds}{dt}$, $a = \dfrac{dv}{dt} = \dfrac{d^2s}{dt^2}$`, "Not in Cambridge's List of formulas.");
  b.card("FORMULA", "Integrating back", t`$v = \int a\,dt$ and $s = \int v\,dt$, with constants from the initial conditions.`);
  b.card("DEFINITION", "Instantaneous rest", t`$v = 0$`);
  b.card("CONCEPT", "Change of direction", t`$v = 0$ and $v$ changes sign.`);
  b.card("CONCEPT", "Distance versus displacement", "Displacement is s; distance adds the lengths of the stages between the times of rest.");
  b.card("FACT", "Greatest or least velocity", t`Where $a = \frac{dv}{dt} = 0$.`);
  b.card("FACT", "Velocity–time graph", "Gradient = acceleration; area = displacement (area below the axis counts negative).");
  b.card("FACT", "Speed–time graph", "The velocity–time graph with the parts below the t-axis reflected; its area is the distance travelled.");
  b.card("CONCEPT", "suvat or calculus?", "Use the constant-acceleration equations only when a is constant; otherwise differentiate or integrate.");
});
