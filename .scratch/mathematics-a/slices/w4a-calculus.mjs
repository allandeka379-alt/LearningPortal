// W4a: amaths.kinematics.calculus
import { concept, P, t, chk, poly, integrate, checkDeriv, checkAntideriv, quad, ZM } from "../lib.mjs";
import { f3, g3, N, S } from "../tables/w4a-kit.mjs";

const { sqrt, exp } = Math;
const dist = (v, a, b2) => integrate((x) => Math.abs(v(x)), a, b2, 20000);

concept("amaths.kinematics.calculus", { file: "kinematics/calculus", keyPrefix: "kinematics.calculus" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "For a particle moving in a straight line, which relation is correct?",
    options: [
      [t`$a = \dfrac{\mathrm{d}v}{\mathrm{d}t}$`, "Correct: acceleration is the rate of change of velocity."],
      [t`$v = \dfrac{\mathrm{d}a}{\mathrm{d}t}$`, "This is upside down: v is found by integrating a."],
      [t`$s = \dfrac{\mathrm{d}v}{\mathrm{d}t}$`, "Differentiating v gives a, not s."],
      [t`$a = \displaystyle\int v\,\mathrm{d}t$`, "Integrating v gives displacement, not acceleration."],
    ],
    answer: "A",
    explanation: t`$v = \frac{\mathrm{d}s}{\mathrm{d}t}$, $a = \frac{\mathrm{d}v}{\mathrm{d}t}$; integrate to go the other way.`,
  });

  const s2 = [2, 0, -5, 1];
  const v2 = poly.eval(poly.deriv(s2), 2);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`The displacement of a particle from $O$ is $s = 2t^3 - 5t + 1$ metres at time $t$ seconds. Find its velocity when $t = 2$.`,
    value: v2, unit: "m/s", wrong: [poly.eval(s2, 2), 24],
    explanation: t`$v = \frac{\mathrm{d}s}{\mathrm{d}t} = 6t^2 - 5$; at $t = 2$, $v = 24 - 5 = ${v2}$ m s$^{-1}$. ($${poly.eval(s2, 2)}$ is the displacement.)`,
  });

  const a3 = 6 * 1.5 + 4;
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`A particle moves with velocity $v = 3t^2 + 4t$ m s$^{-1}$ at time $t$ seconds. Find its acceleration when $t = 1.5$.`,
    value: a3, unit: "m/s²", wrong: [3 * 2.25 + 6, 6 * 1.5],
    explanation: t`$a = \frac{\mathrm{d}v}{\mathrm{d}t} = 6t + 4 = ${a3}$ m s$^{-2}$ at $t = 1.5$.`,
  });

  checkDeriv((x) => 2 * x * x - 3 * x + 2, (x) => 4 * x - 3, [0.5, 2]);
  b.expr({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`A particle has acceleration $a = (4t - 3)$ m s$^{-2}$, and its velocity is $2$ m s$^{-1}$ when $t = 0$. Find an expression for $v$ in terms of $t$. Type it like v=3t^2+t-4.`,
    accepted: ["v=2t^2-3t+2", "2t^2-3t+2", "v=2+2t^2-3t", "v=2t^2+2-3t", "v=-3t+2t^2+2"],
    wrong: ["v=2t^2-3t"],
    explanation: t`$v = \int (4t - 3)\,\mathrm{d}t = 2t^2 - 3t + c$; $v = 2$ at $t = 0$ gives $c = 2$. So $v = 2t^2 - 3t + 2$.`,
  });

  const S5 = (x) => 4 * x * x - (2 * x ** 3) / 3;
  checkAntideriv(S5, (x) => 8 * x - 2 * x * x, 0, 3);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`A particle starts from $O$ and moves in a straight line with velocity $v = 8t - 2t^2$ m s$^{-1}$. Find its displacement from $O$ when $t = 3$.`,
    value: S5(3), unit: "m", wrong: [8 * 3 - 2 * 9, 8 - 4 * 3],
    explanation: t`$s = \int (8t - 2t^2)\,\mathrm{d}t = 4t^2 - \frac{2}{3}t^3 + c$, with $c = 0$ since $s = 0$ at $t = 0$. At $t = 3$: $s = 36 - 18 = ${S5(3)}$ m. ($v$ does not change sign before $t = 4$, so this is also the distance.)`,
    hints: ["Integrate v and use s = 0 when t = 0."],
  });

  const v6 = [1, -7, 10];
  const r6 = poly.rationalRoots(v6);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`A particle moves with velocity $v = t^2 - 7t + 10$ m s$^{-1}$ for $t \ge 0$. Find the two times at which it is at rest, smaller first.`,
    template: "t = {{blank:a}} s and t = {{blank:b}} s",
    blanks: [N("a", r6[0], "3.5"), N("b", r6[1], "7")],
    explanation: t`$v = (t - 2)(t - 5) = 0$ at $t = 2$ and $t = 5$. (The acceleration $2t - 7$ is zero at $t = 3.5$, which gives the least velocity, not rest.)`,
    hints: ["At rest means v = 0."],
  });

  const S7 = (x) => x ** 3 / 3 - 3.5 * x * x + 10 * x;
  const d7 = S7(2) + (S7(2) - S7(5));
  chk(dist((x) => poly.eval(v6, x), 0, 5), d7, 1e-6);
  b.num({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: t`For the particle with velocity $v = t^2 - 7t + 10$ m s$^{-1}$, starting at $O$ when $t = 0$, find the total distance travelled in the first $5$ seconds, correct to 3 significant figures.`,
    value: d7, unit: "m", wrong: [S7(5), S7(2)],
    explanation: t`$s = \frac{t^3}{3} - \frac{7}{2}t^2 + 10t$. The particle turns round at $t = 2$: $s(2) = ${g3(S7(2))}$ m and $s(5) = ${g3(S7(5))}$ m. Distance $= ${g3(S7(2))} + (${g3(S7(2))} - ${g3(S7(5))}) = ${f3(d7)}$ m. (The single integral $\int_0^5 v\,\mathrm{d}t = ${g3(S7(5))}$ is the displacement.)`,
    hints: ["The particle changes direction at t = 2.", "Split the integral at t = 2 and add the sizes."],
  });

  const v8 = (x) => 12 * x - x ** 3;
  checkDeriv(v8, (x) => 12 - 3 * x * x, [1, 3]);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`A particle starts from rest and has acceleration $a = 12 - 3t^2$ m s$^{-2}$ for $0 \le t \le 3$. Find its greatest velocity in this interval.`,
    value: v8(2), unit: "m/s", wrong: [12, v8(3)],
    explanation: t`$v = 12t - t^3$ (since $v = 0$ at $t = 0$). Greatest when $a = 0$: $t = 2$, so $v = 24 - 8 = ${v8(2)}$ m s$^{-1}$. ($12$ is the greatest acceleration.)`,
    hints: ["Greatest velocity when a = 0.", "Find v by integrating a first."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "If the acceleration of a particle is zero at some instant, the particle is at rest at that instant.",
    answer: false,
    explanation: "a = 0 means the velocity is momentarily not changing (often a greatest or least velocity); the particle can be moving fast. At rest means v = 0.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`For any particle, $\displaystyle\int_{t_1}^{t_2} v\,\mathrm{d}t$ is the distance travelled between $t_1$ and $t_2$.`,
    answer: false,
    explanation: "The integral gives the DISPLACEMENT. If v changes sign in the interval, split the integral at v = 0 and add the sizes of the parts to get the distance.",
  });

  const S11 = (x) => 3 * x * x - x ** 3 / 3;
  chk(S11(9), 0);
  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`A particle leaves $O$ at $t = 0$ with velocity $v = 6t - t^2$ m s$^{-1}$. At what time does it return to $O$?`,
    options: [
      [t`$t = 9$`, t`Correct: $s = 3t^2 - \frac{1}{3}t^3 = t^2\left(3 - \frac{t}{3}\right) = 0$ at $t = 9$.`],
      [t`$t = 6$`, t`At $t = 6$ the velocity is zero: the particle turns round, $36$ m from $O$.`],
      [t`$t = 3$`, "At t = 3 the acceleration is zero (greatest velocity)."],
      [t`$t = 18$`, t`This forgets the factor $\frac{1}{3}$ in $\int t^2\,\mathrm{d}t$.`],
    ],
    answer: "A",
    explanation: t`Returning to $O$ means $s = 0$, not $v = 0$.`,
    hints: ["Find s by integrating, then solve s = 0."],
  });

  const v12a = (x) => 0.5 * x * x, v12b = (x) => 16 - 2 * x;
  chk(v12a(4), v12b(4));
  const d12 = integrate(v12a, 0, 4) + integrate(v12b, 4, 8);
  chk(d12, 64 / 6 + 16, 1e-9);
  b.calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: t`A particle starts from rest at $O$. Its velocity is $v = 0.5t^2$ m s$^{-1}$ for $0 \le t \le 4$ and $v = 16 - 2t$ m s$^{-1}$ for $4 \le t \le 8$. Find the total distance travelled in the $8$ seconds, correct to 3 significant figures.`,
    value: d12, unit: "m", wrong: [16, integrate(v12a, 0, 4)],
    explanation: t`$\int_0^4 0.5t^2\,\mathrm{d}t = \left[\frac{t^3}{6}\right]_0^4 = ${f3(64 / 6)}$ m; $\int_4^8 (16 - 2t)\,\mathrm{d}t = [16t - t^2]_4^8 = 64 - 48 = 16$ m. Total $${f3(d12)}$ m. ($v \ge 0$ throughout, so this is the distance.)`,
    hints: ["Integrate each stage over its own interval.", "Check that the two velocity formulae agree at t = 4."],
  });

  const S13 = (x) => 5 * x + 12.5 * exp(-0.4 * x);
  checkAntideriv(S13, (x) => 5 * (1 - exp(-0.4 * x)), 0, 5);
  const d13 = S13(5) - S13(0);
  b.num({
    d: 4, skill: "APPLICATION", calculator: true, applies: ZM,
    stem: t`A car starts from rest and its velocity after $t$ seconds is $v = 5\left(1 - \mathrm{e}^{-0.4t}\right)$ m s$^{-1}$. Find the distance travelled in the first $5$ seconds, correct to 3 significant figures.`,
    value: d13, unit: "m", wrong: [5 * 5, 5 * (1 - exp(-2)) * 5],
    explanation: t`$s = \int_0^5 5\left(1 - \mathrm{e}^{-0.4t}\right)\mathrm{d}t = \left[5t + 12.5\mathrm{e}^{-0.4t}\right]_0^5 = 25 + 12.5\mathrm{e}^{-2} - 12.5 = ${f3(d13)}$ m. (Velocity × time with the final velocity overestimates, since the car was slower earlier.)`,
    hints: [t`$\int \mathrm{e}^{-0.4t}\,\mathrm{d}t = -2.5\mathrm{e}^{-0.4t}$.`],
  });

  const vv14 = (x) => x * x - x - 6, ss14 = (x) => x ** 3 / 3 - x * x / 2 - 6 * x;
  checkDeriv(ss14, vv14, [1, 2.5]); chk(vv14(3), 0);
  b.fib({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`A particle has acceleration $a = (2t - 1)$ m s$^{-2}$. When $t = 0$ it is at $O$ with velocity $-6$ m s$^{-1}$. Find the time at which it comes to rest and its displacement from $O$ at that time.`,
    template: "t = {{blank:t}} s, s = {{blank:s}} m",
    blanks: [N("t", 3, "-2"), S("s", ss14(3), "13.5")],
    explanation: t`$v = t^2 - t - 6 = (t - 3)(t + 2)$, so it is at rest when $t = 3$. $s = \frac{t^3}{3} - \frac{t^2}{2} - 6t$, so $s(3) = 9 - 4.5 - 18 = ${ss14(3)}$ m: $13.5$ m on the negative side of $O$.`,
    hints: ["Integrate twice, using v = −6 and s = 0 at t = 0."],
  });

  const S15 = (x) => x ** 3 / 3 - 2 * x * x + 3 * x;
  const d15 = Math.abs(S15(1)) + Math.abs(S15(3) - S15(1)) + Math.abs(S15(4) - S15(3));
  chk(d15, 4, 1e-9); chk(S15(4), 4 / 3, 1e-9);
  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`A particle starts at $O$ with velocity $v = t^2 - 4t + 3$ m s$^{-1}$. What distance does it travel from $t = 0$ to $t = 4$?`,
    options: [
      [t`$4$ m`, t`Correct: it turns at $t = 1$ and $t = 3$; the three stages are each $\frac{4}{3}$ m.`],
      [t`$\frac{4}{3}$ m`, t`$\int_0^4 v\,\mathrm{d}t = \frac{4}{3}$ is the displacement, not the distance.`],
      [t`$0$ m`, "The particle is at O again at t = 3, but it travelled to get there."],
      [t`$\frac{8}{3}$ m`, "This misses one of the three stages of the motion."],
    ],
    answer: "A",
    explanation: t`$s = \frac{t^3}{3} - 2t^2 + 3t$: $s(1) = \frac{4}{3}$, $s(3) = 0$, $s(4) = \frac{4}{3}$. Distance $= \frac{4}{3} + \frac{4}{3} + \frac{4}{3} = 4$ m.`,
    hints: ["Where is v = 0 in the interval?"],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each description of the motion with the condition that describes it.",
    pairs: [
      ["The particle is momentarily at rest", t`$v = 0$`],
      ["The velocity is greatest", t`$a = 0$`],
      ["The particle is back at its starting point O", t`$s = 0$ (for $t > 0$)`],
      ["The particle starts from O", t`$s = 0$ when $t = 0$`],
    ],
    explanation: "Translate the words into conditions on s, v or a before doing any calculus.",
  });

  b.proof({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 4,
    stem: t`A particle moves with constant acceleration $a$; at $t = 0$ it is at $O$ with velocity $u$. By integration, show that $v = u + at$ and $s = ut + \tfrac{1}{2}at^2$.`,
    points: [
      t`M1 integrates $a$: $v = at + c_1$.`,
      t`A1 uses $v = u$ at $t = 0$: $v = u + at$.`,
      t`M1 integrates $v$: $s = ut + \tfrac{1}{2}at^2 + c_2$.`,
      t`A1 uses $s = 0$ at $t = 0$ to reach the given result.`,
    ],
    modelAnswer: t`$$
v = \int a\,\mathrm{d}t = at + c_1, \quad t = 0, v = u \Rightarrow c_1 = u \Rightarrow v = u + at
$$
$$
s = \int (u + at)\,\mathrm{d}t = ut + \tfrac{1}{2}at^2 + c_2, \quad t = 0, s = 0 \Rightarrow c_2 = 0
$$
$$
s = ut + \tfrac{1}{2}at^2
$$`,
    explanation: "The suvat formulae are the constant-acceleration case of the calculus relations.",
    hints: ["a is a constant, so ∫a dt = at + c."],
  });

  checkDeriv((x) => x ** 3 - x * x + 5 * x + 4, (x) => 3 * x * x - 2 * x + 5, [0.5, 2]);
  b.expr({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`A particle moves with velocity $v = 3t^2 - 2t + 5$ m s$^{-1}$. When $t = 0$ it is $4$ m from $O$ (on the positive side). Find $s$ in terms of $t$. Type it like s=t^3+2t-1.`,
    accepted: ["s=t^3-t^2+5t+4", "t^3-t^2+5t+4", "s=4+5t-t^2+t^3", "s=t^3-t^2+4+5t"],
    wrong: ["s=t^3-t^2+5t"],
    explanation: t`$s = \int (3t^2 - 2t + 5)\,\mathrm{d}t = t^3 - t^2 + 5t + c$; $s = 4$ at $t = 0$ gives $c = 4$.`,
    hints: ["The constant of integration is the starting displacement."],
  });

  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`The displacement of a particle is $s = 4t^{\frac{3}{2}}$ metres for $t > 0$. Which expression gives its velocity?`,
    options: [
      [t`$6t^{\frac{1}{2}}$`, t`Correct: $\frac{\mathrm{d}}{\mathrm{d}t}\left(4t^{3/2}\right) = 4 \times \frac{3}{2}t^{1/2}$.`],
      [t`$4t^{\frac{1}{2}}$`, "The power 3/2 must be brought down as a multiplier."],
      [t`$\frac{8}{5}t^{\frac{5}{2}}$`, "This integrates instead of differentiating."],
      [t`$6t^{\frac{3}{2}}$`, "The power must also be reduced by 1."],
    ],
    answer: "A",
    explanation: t`$v = \frac{\mathrm{d}s}{\mathrm{d}t} = 6t^{1/2} = 6\sqrt{t}$.`,
  });

  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`A particle starts from rest at $O$ with acceleration $a = 6t$ m s$^{-2}$. Which expression gives its displacement from $O$ at time $t$?`,
    options: [
      [t`$t^3$`, t`Correct: $v = 3t^2$, then $s = t^3$ (both constants zero).`],
      [t`$3t^2$`, "This is the velocity: you need to integrate twice."],
      [t`$\tfrac{1}{2}(6t)t^2$`, "suvat cannot be used: the acceleration is not constant."],
      [t`$6$`, "Differentiating instead of integrating gives the rate of change of a."],
    ],
    answer: "A",
    explanation: t`$v = \int 6t\,\mathrm{d}t = 3t^2$, $s = \int 3t^2\,\mathrm{d}t = t^3$.`,
    hints: ["Integrate a to get v, then integrate v."],
  });

  // Struct 5: v = k t (6 − t), distance in first 6 s is 72 m
  chk(integrate((x) => x * (6 - x), 0, 6), 36, 1e-9);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: t`A particle starts from rest at $O$ and moves in a straight line with velocity $v = kt(6 - t)$ m s$^{-1}$ for $0 \le t \le 6$, where $k$ is a positive constant. It travels $72$ m in these $6$ seconds.`,
    parts: [
      P.proof({ label: "(a)", marks: 2, stem: t`Show that $k = 2$.`,
        points: [t`M1 integrates: $\int_0^6 k(6t - t^2)\,\mathrm{d}t = k\left[3t^2 - \frac{t^3}{3}\right]_0^6 = 36k$.`, t`A1 sets $36k = 72$ to obtain $k = 2$.`],
        modelAnswer: t`$$
\int_0^6 k(6t - t^2)\,\mathrm{d}t = k\left[3t^2 - \frac{t^3}{3}\right]_0^6 = k(108 - 72) = 36k
$$
$$
36k = 72 \Rightarrow k = 2
$$`,
        explanation: "v ≥ 0 on [0, 6], so the distance is the definite integral." }),
      P.num({ label: "(b)", marks: 1, stem: "Find the greatest speed of the particle.", value: 18, unit: "m/s", wrong: [36], explanation: "By symmetry (or a = 2(6 − 2t) = 0) the greatest speed is at t = 3: v = 2 × 3 × 3 = 18 m/s." }),
      P.num({ label: "(c)", marks: 2, stem: "Find the acceleration of the particle when t = 1.", value: 8, unit: "m/s²", wrong: [10], explanation: t`$v = 12t - 2t^2$, so $a = 12 - 4t = 8$ m s$^{-2}$ at $t = 1$.` }),
    ],
    explanation: "A distance condition fixes the constant; then differentiate for the acceleration and greatest speed.",
    hints: ["Expand v before integrating.", "Greatest speed where a = 0."],
  });

  // Struct 12: stage 1 v = 4t − t²/2 (0 ≤ t ≤ 4), stage 2 deceleration 2 m/s² to rest
  const vA = (x) => 4 * x - 0.5 * x * x, sA = (x) => 2 * x * x - x ** 3 / 6;
  checkDeriv(sA, vA, [1, 3]);
  const d1s = sA(4), d2s = 0.5 * 4 * 8, tau = 4 - sqrt(16 - (30 - d1s));
  chk(vA(4), 8); chk(d1s + 8 * tau - tau * tau, 30, 1e-9);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`A cyclist starts from rest at a point $O$ and moves along a straight road. For $0 \le t \le 4$ her velocity is $v = 4t - \frac{1}{2}t^2$ m s$^{-1}$. At $t = 4$ she stops pedalling and decelerates uniformly at $2$ m s$^{-2}$ until she comes to rest.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Find her acceleration when t = 1.", value: 3, unit: "m/s²", wrong: [3.5], explanation: t`$a = 4 - t = 3$ m s$^{-2}$.` }),
      P.proof({ label: "(b)", marks: 2, stem: t`Show that her velocity is greatest when $t = 4$, and find this velocity.`,
        points: [t`M1 $a = \frac{\mathrm{d}v}{\mathrm{d}t} = 4 - t = 0$ when $t = 4$ (and $a > 0$ before).`, t`A1 $v(4) = 16 - 8 = 8$ m s$^{-1}$.`],
        modelAnswer: t`$$
a = \frac{\mathrm{d}v}{\mathrm{d}t} = 4 - t > 0 \text{ for } t < 4, \quad a = 0 \text{ at } t = 4
$$
$$
v(4) = 4(4) - \tfrac{1}{2}(16) = 8 \text{ m s}^{-1}
$$`,
        explanation: "Greatest velocity where the acceleration is zero." }),
      P.num({ label: "(c)", marks: 3, stem: "Find the distance travelled in the first 4 seconds, correct to 3 significant figures.", value: d1s, unit: "m", wrong: [vA(4) * 4 / 2, 32], explanation: t`$\int_0^4 \left(4t - \frac{1}{2}t^2\right)\mathrm{d}t = \left[2t^2 - \frac{t^3}{6}\right]_0^4 = 32 - \frac{64}{6} = ${f3(d1s)}$ m.` }),
      P.num({ label: "(d)", marks: 3, stem: "Find the total distance from O to the point where she comes to rest, correct to 3 significant figures.", value: d1s + d2s, unit: "m", wrong: [d1s + 32, d2s], explanation: t`Second stage: $v = 8 - 2\tau$, rest after $\tau = 4$ s, distance $\frac{1}{2}(4)(8) = ${d2s}$ m. Total $${f3(d1s)} + ${d2s} = ${f3(d1s + d2s)}$ m.` }),
      P.num({ label: "(e)", marks: 3, stem: "Find the value of t at which she is 30 m from O, correct to 3 significant figures.", value: 4 + tau, unit: "s", wrong: [tau, 30 / 8], explanation: t`$30 > ${f3(d1s)}$, so it is in the second stage. With $\tau = t - 4$: $${f3(d1s)} + 8\tau - \tau^2 = 30$, so $\tau^2 - 8\tau + ${f3(30 - d1s)} = 0$ and $\tau = 4 - \sqrt{16 - ${f3(30 - d1s)}} = ${f3(tau)}$ (the root with $\tau \le 4$). So $t = ${f3(4 + tau)}$.` }),
    ],
    explanation: "Calculus for the variable-acceleration stage, suvat for the constant-deceleration stage.",
    hints: ["In stage 2 use τ = t − 4 and the constant-acceleration formulae.", "Decide which stage the 30 m point is in before solving."],
  });

  b.card("FORMULA", "Calculus in kinematics", t`$v = \frac{\mathrm{d}s}{\mathrm{d}t}$, $a = \frac{\mathrm{d}v}{\mathrm{d}t} = \frac{\mathrm{d}^2s}{\mathrm{d}t^2}$; $v = \int a\,\mathrm{d}t$, $s = \int v\,\mathrm{d}t$.`);
  b.card("FACT", "At rest", t`$v = 0$.`);
  b.card("FACT", "Greatest or least velocity", t`$a = \frac{\mathrm{d}v}{\mathrm{d}t} = 0$.`);
  b.card("CONCEPT", "Constants of integration", "Use the initial conditions, e.g. 'starts from rest at O' gives v = 0 and s = 0 when t = 0.");
  b.card("CONCEPT", "Distance when the particle turns round", "Find where v = 0 inside the interval, split the integral there and add the sizes of the parts.");
  b.card("FORMULA", "Displacement over an interval", t`$\displaystyle\int_{t_1}^{t_2} v\,\mathrm{d}t$`);
  b.card("FACT", "When suvat applies", "Only when the acceleration is constant; otherwise use calculus.");
  b.card("CONCEPT", "Returning to the start", t`Solve $s = 0$ for $t > 0$; do not confuse it with $v = 0$.`);
  b.card("FACT", "Cambridge Paper 4 functions", t`Only powers of $t$ (the calculus of Paper 1); ZIMSEC may also use functions such as $\mathrm{e}^{-t}$.`);
});
