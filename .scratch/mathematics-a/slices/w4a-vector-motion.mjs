// W4a: amaths.kinematics.vector-motion (ZIMSEC Mechanics only)
import { concept, P, t, chk, same, vec, deg, forms } from "../lib.mjs";
import { f3, d1, N, S, A } from "../tables/w4a-kit.mjs";

const at = (r0, v, s) => vec.add(r0, vec.scale(s, v));
const IJ = (u) => vec.ij(u);
/** Bearing (clockwise from north) of a vector with i east and j north, degrees in [0, 360). */
const bearing = ([e, n]) => (((90 - deg(Math.atan2(n, e))) % 360) + 360) % 360;
/** Same-time solutions of r1(t) = r2(t), one per component (null when the component velocities are equal). */
const sameTime = (a0, va, b0, vb) => [0, 1].map((i) => (va[i] === vb[i] ? null : (b0[i] - a0[i]) / (va[i] - vb[i])));

concept("amaths.kinematics.vector-motion", { file: "kinematics/vector-motion", keyPrefix: "kinematics.vector-motion" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`A particle moves so that its position vector at time $t$ is $\mathbf{r} = \mathbf{r}_0 + t\mathbf{v}$, where $\mathbf{r}_0$ and $\mathbf{v}$ are constant vectors. What does $\mathbf{v}$ represent?`,
    options: [
      ["The constant velocity of the particle", t`Correct: the displacement in time $t$ is $t\mathbf{v}$.`],
      ["The position of the particle when t = 0", t`That is $\mathbf{r}_0$.`],
      ["The speed of the particle", t`Speed is the magnitude $|\mathbf{v}|$, a scalar; $\mathbf{v}$ itself is a vector.`],
      ["The displacement of the particle from O", t`That is $\mathbf{r}$, which changes with $t$.`],
    ],
    answer: "A",
    explanation: t`$\mathbf{r}_0$ fixes the starting point, $\mathbf{v}$ is the constant velocity and $|\mathbf{v}|$ is the speed.`,
  });

  chk(vec.mag([5, -12]), 13);
  b.num({
    d: 1, skill: "APPLICATION", calculator: false,
    stem: t`A particle moves with constant velocity $(5\mathbf{i} - 12\mathbf{j})$ m s$^{-1}$. Find its speed.`,
    value: 13, unit: "m/s", wrong: [17, 7],
    explanation: t`Speed $= \sqrt{5^2 + (-12)^2} = \sqrt{169} = 13$ m s$^{-1}$. (Adding the sizes gives 17; adding the components gives $-7$.)`,
  });

  const p3 = at([3, -2], [2, 5], 4);
  same(p3, [11, 18]);
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`A particle's position vector at time $t$ seconds is $\mathbf{r} = (3\mathbf{i} - 2\mathbf{j}) + t(2\mathbf{i} + 5\mathbf{j})$ metres. Find its position vector when $t = 4$, in the form $p\mathbf{i} + q\mathbf{j}$.`,
    template: "p = {{blank:p}}, q = {{blank:q}}",
    blanks: [N("p", 11, "8"), N("q", 18, "20")],
    explanation: t`$\mathbf{r} = (3 + 4 \times 2)\mathbf{i} + (-2 + 4 \times 5)\mathbf{j} = ${IJ(p3)}$. (Leaving out $\mathbf{r}_0$ gives $8\mathbf{i} + 20\mathbf{j}$, the displacement only.)`,
  });

  const v5 = vec.scale(26 / vec.mag([5, 12]), [5, 12]);
  same(v5, [10, 24]);
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`A drone flies with speed $26$ m s$^{-1}$ in the direction of the vector $5\mathbf{i} + 12\mathbf{j}$. Write its velocity as $(p\mathbf{i} + q\mathbf{j})$ m s$^{-1}$.`,
    template: "p = {{blank:p}}, q = {{blank:q}}",
    blanks: [N("p", 10, "130"), N("q", 24, "312")],
    explanation: t`$|5\mathbf{i} + 12\mathbf{j}| = 13$, so the unit vector is $\frac{1}{13}(5\mathbf{i} + 12\mathbf{j})$ and the velocity is $26 \times \frac{1}{13}(5\mathbf{i} + 12\mathbf{j}) = ${IJ(v5)}$. (Multiplying by 26 without dividing by 13 gives a speed of 338.)`,
  });

  const v6 = vec.scale(1 / 3, vec.sub([14, 8], [2, -1]));
  same(v6, [4, 3]);
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`A particle moving with constant velocity is at the point with position vector $(2\mathbf{i} - \mathbf{j})$ m when $t = 0$ and at $(14\mathbf{i} + 8\mathbf{j})$ m when $t = 3$ s. Find its velocity $(p\mathbf{i} + q\mathbf{j})$ m s$^{-1}$ and its speed.`,
    template: "p = {{blank:p}}, q = {{blank:q}}, speed = {{blank:s}} m/s",
    blanks: [N("p", 4, "12"), N("q", 3, "9"), N("s", 5, "15")],
    explanation: t`$\mathbf{v} = \dfrac{(14\mathbf{i} + 8\mathbf{j}) - (2\mathbf{i} - \mathbf{j})}{3} = \dfrac{12\mathbf{i} + 9\mathbf{j}}{3} = ${IJ(v6)}$, speed $\sqrt{16 + 9} = 5$ m s$^{-1}$. (Forgetting to divide by the time gives the displacement $12\mathbf{i} + 9\mathbf{j}$.)`,
  });

  const br7 = bearing([-3, 3]);
  chk(br7, 315);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`The unit vectors $\mathbf{i}$ and $\mathbf{j}$ point east and north. A fishing boat on Lake Kariba moves with velocity $(-3\mathbf{i} + 3\mathbf{j})$ km h$^{-1}$. Find the bearing on which it moves, in degrees.`,
    value: 315, unit: "°", wrong: [45, 135],
    explanation: t`The velocity points equally west and north: north-west. Measured clockwise from north this is a bearing of $315°$. ($45°$ ignores the westward direction; $135°$ is the angle from the positive $\mathbf{i}$ direction.)`,
    hints: ["Sketch the velocity: which compass direction is it?", "Bearings are measured clockwise from north."],
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`Which particle is moving parallel to the vector $2\mathbf{i} - \mathbf{j}$?`,
    options: [
      [t`$\mathbf{r} = 3\mathbf{j} + t(-6\mathbf{i} + 3\mathbf{j})$`, t`Correct: $-6\mathbf{i} + 3\mathbf{j} = -3(2\mathbf{i} - \mathbf{j})$, a multiple, so the motion is parallel (in the opposite sense).`],
      [t`$\mathbf{r} = (2\mathbf{i} - \mathbf{j}) + t(\mathbf{i} + 2\mathbf{j})$`, t`This particle starts at $2\mathbf{i} - \mathbf{j}$, but its velocity $\mathbf{i} + 2\mathbf{j}$ is perpendicular to $2\mathbf{i} - \mathbf{j}$.`],
      [t`$\mathbf{r} = \mathbf{i} + t(4\mathbf{i} + 2\mathbf{j})$`, t`$4\mathbf{i} + 2\mathbf{j}$ has the wrong sign in $\mathbf{j}$, so it is not a multiple.`],
      [t`$\mathbf{r} = \mathbf{i} + t(-2\mathbf{i} - \mathbf{j})$`, t`$-2\mathbf{i} - \mathbf{j}$ is not a multiple of $2\mathbf{i} - \mathbf{j}$: only one sign is reversed.`],
    ],
    answer: "A",
    explanation: "The direction of motion is the velocity vector, the coefficient of t; it must be a scalar multiple (possibly negative) of the given vector.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false, daily: true,
    stem: "If the paths of two particles cross, the particles must collide.",
    answer: false,
    explanation: "A collision needs both particles at the crossing point at the same time. They may pass through it at different times, so crossing paths do not imply a collision.",
  });

  b.tf({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`Particles $P$ and $Q$ have $\mathbf{r}_P = (\mathbf{i} + 2\mathbf{j}) + t(2\mathbf{i} + \mathbf{j})$ and $\mathbf{r}_Q = (5\mathbf{i} + 2\mathbf{j}) + t(\mathbf{i} + 2\mathbf{j})$. Because the $\mathbf{i}$ components are equal when $t = 4$, the particles collide.`,
    answer: false,
    explanation: t`At $t = 4$ the $\mathbf{i}$ components are both $9$, but the $\mathbf{j}$ components are $2 + 4 = 6$ and $2 + 8 = 10$. A collision needs the same $t$ in every component, so they do not collide.`,
    hints: ["Check the j components at the same time."],
  });
  same(sameTime([1, 2], [2, 1], [5, 2], [1, 2]), [4, 0]);

  const P0 = [1, -4], vP = [2, 3], Q0 = [10, -7], vQ = [-1, 4];
  same(sameTime(P0, vP, Q0, vQ), [3, 3]);
  same(at(P0, vP, 3), [7, 5]);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Particles $P$ and $Q$ move so that, at time $t$ seconds, $\mathbf{r}_P = (\mathbf{i} - 4\mathbf{j}) + t(2\mathbf{i} + 3\mathbf{j})$ and $\mathbf{r}_Q = (10\mathbf{i} - 7\mathbf{j}) + t(-\mathbf{i} + 4\mathbf{j})$ metres. They collide. Find the time of the collision and the position vector $(p\mathbf{i} + q\mathbf{j})$ m of the point of collision.`,
    template: "t = {{blank:t}} s, p = {{blank:p}}, q = {{blank:q}}",
    blanks: [N("t", 3, "9"), N("p", 7, "10"), N("q", 5, "-7")],
    explanation: t`$\mathbf{i}$: $1 + 2t = 10 - t$, so $t = 3$. $\mathbf{j}$: $-4 + 3t = -7 + 4t$, so $t = 3$. Same time, so they collide at $\mathbf{r}_P(3) = ${IJ(at(P0, vP, 3))}$ (check: $\mathbf{r}_Q(3) = ${IJ(at(Q0, vQ, 3))}$).`,
    hints: ["Equate the i components and the j components separately, with the same t."],
  });
  same(at(Q0, vQ, 3), [7, 5]);

  // Paths cross, no collision: P at s = 2 and Q at u = 1 are both at (4, 3).
  const A0 = [0, 1], vA = [2, 1], B0 = [5, 0], vB = [-1, 3];
  same(at(A0, vA, 2), [4, 3]); same(at(B0, vB, 1), [4, 3]);
  const st12 = sameTime(A0, vA, B0, vB);
  chk(st12[0], 5 / 3); chk(st12[1], 0.5);
  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Two ships have position vectors $\mathbf{r}_A = \mathbf{j} + t(2\mathbf{i} + \mathbf{j})$ and $\mathbf{r}_B = 5\mathbf{i} + t(-\mathbf{i} + 3\mathbf{j})$ km at time $t$ hours. Which statement is true?`,
    options: [
      ["Their paths cross, but the ships do not collide", t`Correct: the paths meet at $4\mathbf{i} + 3\mathbf{j}$ ($A$ at $t = 2$, $B$ at $t = 1$), but the same-time equations give $t = \frac{5}{3}$ and $t = \frac{1}{2}$.`],
      ["The ships collide when t = 2", t`At $t = 2$, $A$ is at $4\mathbf{i} + 3\mathbf{j}$ but $B$ is at $3\mathbf{i} + 6\mathbf{j}$.`],
      ["Their paths are parallel, so they never meet", t`$2\mathbf{i} + \mathbf{j}$ and $-\mathbf{i} + 3\mathbf{j}$ are not multiples, so the paths are not parallel.`],
      ["The ships collide when t = 5/3", t`At $t = \frac{5}{3}$ the $\mathbf{i}$ components agree but the $\mathbf{j}$ components do not.`],
    ],
    answer: "A",
    explanation: "Use one t to test for a collision and two different parameters to test whether the paths cross.",
    hints: ["Test for a collision with the same t; test the paths with different parameters."],
  });

  const dist13 = vec.mag(vec.sub(at([10, -3], [1, 4], 2), at([2, 1], [3, 2], 2)));
  chk(dist13, 4);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Two aircraft have position vectors $\mathbf{r}_C = (2\mathbf{i} + \mathbf{j}) + t(3\mathbf{i} + 2\mathbf{j})$ km and $\mathbf{r}_D = (10\mathbf{i} - 3\mathbf{j}) + t(\mathbf{i} + 4\mathbf{j})$ km, where $t$ is in minutes. Find the distance between them when $t = 2$.`,
    value: 4, unit: "km", wrong: [vec.mag([8, -4]), 2],
    explanation: t`At $t = 2$: $\mathbf{r}_C = 8\mathbf{i} + 5\mathbf{j}$ and $\mathbf{r}_D = 12\mathbf{i} + 5\mathbf{j}$. $\overrightarrow{CD} = 4\mathbf{i}$, so the distance is $4$ km. ($${f3(vec.mag([8, -4]))}$ km is the distance at $t = 0$.)`,
    hints: ["Find both position vectors at t = 2, then subtract."],
  });

  // Closest approach: E: (1, 2) + t(4, 1), F: (11, -3) + t(1, 3); EF = (10 - 3t, -5 + 2t).
  const E0 = [1, 2], vE = [4, 1], F0 = [11, -3], vF = [1, 3];
  const rel = (s) => vec.sub(at(F0, vF, s), at(E0, vE, s));
  // |EF|² = 13t² - 80t + 125: minimum at t = 40/13
  const tmin = 40 / 13;
  chk(vec.mag(rel(1)) ** 2, 13 - 80 + 125, 1e-9);
  chk(vec.mag(rel(2)) ** 2, 52 - 160 + 125, 1e-9);
  chk(vec.mag(rel(5)) ** 2, 325 - 400 + 125, 1e-9);
  const dmin = vec.mag(rel(tmin));
  chk(vec.dot(rel(tmin), vec.sub(vF, vE)), 0, 1e-9);
  chk(dmin ** 2, 125 - 1600 / 13, 1e-9);
  b.num({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: t`Two boats move with position vectors $\mathbf{r}_E = (\mathbf{i} + 2\mathbf{j}) + t(4\mathbf{i} + \mathbf{j})$ km and $\mathbf{r}_F = (11\mathbf{i} - 3\mathbf{j}) + t(\mathbf{i} + 3\mathbf{j})$ km, $t$ in hours. Find the time at which they are closest together, in hours correct to 3 significant figures.`,
    value: tmin, unit: "h", wrong: [10 / 3, 2.5],
    explanation: t`$\overrightarrow{EF} = (10 - 3t)\mathbf{i} + (-5 + 2t)\mathbf{j}$, so $EF^2 = (10 - 3t)^2 + (2t - 5)^2 = 13t^2 - 80t + 125$. This is least when $t = \frac{80}{26} = \frac{40}{13} = ${f3(tmin)}$ h. (Making only the $\mathbf{i}$ component zero gives $t = \frac{10}{3}$; only the $\mathbf{j}$ component gives $2.5$.)`,
    hints: [t`Write $\overrightarrow{EF}$ in terms of $t$, square and add the components.`, "Differentiate or complete the square."],
  });

  b.num({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: t`For the boats in the previous question, $\mathbf{r}_E = (\mathbf{i} + 2\mathbf{j}) + t(4\mathbf{i} + \mathbf{j})$ km and $\mathbf{r}_F = (11\mathbf{i} - 3\mathbf{j}) + t(\mathbf{i} + 3\mathbf{j})$ km. Find the least distance between them, in km correct to 3 significant figures.`,
    value: dmin, unit: "km", wrong: [Math.sqrt(125), vec.mag(rel(10 / 3))],
    explanation: t`$EF^2 = 13t^2 - 80t + 125 = 13\left(t - \frac{40}{13}\right)^2 + 125 - \frac{1600}{13}$. The least value of $EF^2$ is $\frac{25}{13}$, so the least distance is $\frac{5}{\sqrt{13}} = ${f3(dmin)}$ km. ($\sqrt{125}$ is the distance at $t = 0$.)`,
    hints: ["Complete the square in t.", "The least distance is the square root of the least value of EF²."],
  });
  chk(dmin, 5 / Math.sqrt(13));

  // Unknown constant for a collision
  const a16 = 3;
  same(sameTime([2, 1], [3, a16], [11, 7], [0, 1]), [3, 3]);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`Particle $P$ has position vector $(2\mathbf{i} + \mathbf{j}) + t(3\mathbf{i} + a\mathbf{j})$ m and particle $Q$ has position vector $(11\mathbf{i} + 7\mathbf{j}) + t\mathbf{j}$ m at time $t$ s. Given that $P$ and $Q$ collide, find the value of the constant $a$.`,
    value: 3, wrong: [2, 6],
    explanation: t`The $\mathbf{i}$ components: $2 + 3t = 11$, so $t = 3$. The $\mathbf{j}$ components at $t = 3$: $1 + 3a = 7 + 3$, so $3a = 9$ and $a = 3$.`,
    hints: ["The i components fix the time of the collision."],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`A particle moves with $\mathbf{r} = (2\mathbf{i} + 5\mathbf{j}) + t(6\mathbf{i} - 8\mathbf{j})$ m, $t$ in seconds. Match each quantity with its value.`,
    pairs: [
      ["Position vector when t = 0", t`$2\mathbf{i} + 5\mathbf{j}$ m`],
      ["Velocity", t`$6\mathbf{i} - 8\mathbf{j}$ m s$^{-1}$`],
      ["Speed", t`$10$ m s$^{-1}$`],
      ["Displacement in the first 2 seconds", t`$12\mathbf{i} - 16\mathbf{j}$ m`],
    ],
    explanation: t`The constant term is the starting position, the coefficient of $t$ is the velocity, its magnitude $\sqrt{36 + 64} = 10$ is the speed, and in 2 s the displacement is $2\mathbf{v}$.`,
  });
  chk(vec.mag([6, -8]), 10);

  b.proof({
    d: 3, skill: "ANALYSIS", calculator: false, marks: 3,
    stem: t`A particle moves so that $\mathbf{r} = (1 + 2t)\mathbf{i} + (3 - t)\mathbf{j}$. Show that its path is the straight line $x + 2y = 7$.`,
    points: [
      t`M1 writes $x = 1 + 2t$ and $y = 3 - t$.`,
      t`M1 eliminates $t$, e.g. $t = 3 - y$ so $x = 1 + 2(3 - y)$.`,
      t`A1 rearranges to $x + 2y = 7$ with no errors.`,
    ],
    modelAnswer: t`$$
x = 1 + 2t, \quad y = 3 - t \Rightarrow t = 3 - y
$$
$$
x = 1 + 2(3 - y) = 7 - 2y \Rightarrow x + 2y = 7
$$`,
    explanation: "Eliminate the parameter t between the two component equations.",
    hints: ["Make t the subject of the j equation."],
  });
  for (const s of [0, 1, 2.5]) chk((1 + 2 * s) + 2 * (3 - s), 7);

  b.expr({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`A particle moves so that $\mathbf{r} = (3 + 4t)\mathbf{i} + (1 + 2t)\mathbf{j}$. Find the Cartesian equation of its path, in the form $y = mx + c$.`,
    accepted: ["y=x/2-1/2", "y=(x-1)/2", "y=0.5x-0.5", "y=1/2x-1/2", "y=(1/2)x-1/2", "y=(1/2)x-(1/2)", "y=x/2-0.5"],
    model: "y = x/2 − 1/2",
    wrong: ["y=2x-5"],
    explanation: t`$t = \frac{x - 3}{4}$, so $y = 1 + 2 \cdot \frac{x - 3}{4} = \frac{x}{2} - \frac{1}{2}$. The gradient $\frac{1}{2}$ matches the velocity $4\mathbf{i} + 2\mathbf{j}$.`,
    hints: ["Make t the subject of the i equation and substitute into the j equation."],
  });
  for (const s of [0, 1, 3]) chk(1 + 2 * s, (3 + 4 * s) / 2 - 0.5);

  // Intersection of two lines (not motion)
  const L20 = { s: 2, t: 4 };
  same(at([1, 2], [1, 3], L20.s), at([7, 0], [-1, 2], L20.t));
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Find the position vector of the point where the lines $\mathbf{r} = \mathbf{i} + 2\mathbf{j} + s(\mathbf{i} + 3\mathbf{j})$ and $\mathbf{r} = 7\mathbf{i} + t(-\mathbf{i} + 2\mathbf{j})$ meet.`,
    options: [
      [t`$3\mathbf{i} + 8\mathbf{j}$`, t`Correct: $1 + s = 7 - t$ and $2 + 3s = 2t$ give $s = 2$, $t = 4$.`],
      [t`$5\mathbf{i} + 4\mathbf{j}$`, t`This uses one parameter for both lines ($s = t = 2$ on the second line); the lines need different parameters.`],
      [t`$4\mathbf{i} + 11\mathbf{j}$`, t`This substitutes $t = 4$ into the first line instead of the second.`],
      [t`$2\mathbf{i} + 5\mathbf{j}$`, t`This is the point $s = 1$ on the first line, which is not on the second.`],
    ],
    answer: "A",
    explanation: t`Equate components with different parameters: $1 + s = 7 - t$, $2 + 3s = 2t$. Then $2 + 3s = 2(6 - s)$, so $s = 2$ and the point is $3\mathbf{i} + 8\mathbf{j}$.`,
  });
  same(at([7, 0], [-1, 2], 2), [5, 4]); same(at([1, 2], [1, 3], 1), [2, 5]);

  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`A kombi on a straight stretch of road has position vector $\mathbf{r} = (2 + 6t)\mathbf{i} + (-1 - 8t)\mathbf{j}$ km at time $t$ minutes. What is its speed?`,
    options: [
      ["10 km per minute", t`Correct: the velocity is $6\mathbf{i} - 8\mathbf{j}$ and $\sqrt{36 + 64} = 10$.`],
      ["14 km per minute", "This adds the sizes of the components instead of using Pythagoras."],
      ["2 km per minute", "This adds the components 6 and −8 and ignores the sign."],
      ["√5 km per minute", t`This is the magnitude of the starting position $2\mathbf{i} - \mathbf{j}$, not the velocity.`],
    ],
    answer: "A",
    explanation: "Speed is the magnitude of the coefficient of t.",
  });
  chk(vec.mag([2, -1]), Math.sqrt(5));

  // Practice structured (5 marks)
  const G0 = [-4, 6], vG = [3, -1], H0 = [8, -10], vH = [-1, 3];
  const stG = sameTime(G0, vG, H0, vH);
  same(stG, [3, 4]);
  // paths: -4 + 3s = 8 - u, 6 - s = -10 + 3u -> u = 12 - 3s, 6 - s = -10 + 36 - 9s -> 8s = 20, s = 2.5, u = 4.5
  same(at(G0, vG, 2.5), at(H0, vH, 4.5));
  same(at(G0, vG, 2.5), [3.5, 3.5]);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: t`Two remote-controlled cars $G$ and $H$ on a school sports field have position vectors $\mathbf{r}_G = (-4\mathbf{i} + 6\mathbf{j}) + t(3\mathbf{i} - \mathbf{j})$ m and $\mathbf{r}_H = (8\mathbf{i} - 10\mathbf{j}) + t(-\mathbf{i} + 3\mathbf{j})$ m at time $t$ seconds.`,
    parts: [
      P.proof({ label: "(a)", marks: 2, stem: "Show that the cars do not collide.",
        points: [t`M1 equates the $\mathbf{i}$ components with the same $t$: $-4 + 3t = 8 - t$, $t = 3$.`, t`A1 the $\mathbf{j}$ components give $6 - t = -10 + 3t$, $t = 4$; different, so no collision.`],
        modelAnswer: t`$$
-4 + 3t = 8 - t \Rightarrow t = 3
$$
$$
6 - t = -10 + 3t \Rightarrow t = 4
$$
$$
3 \ne 4, \text{ so } G \text{ and } H \text{ are never at the same place at the same time.}
$$`,
        explanation: "Both components must give the same time for a collision." }),
      P.fib({ label: "(b)", marks: 3, stem: t`The paths of the cars cross at the point $X$. Find the position vector $(p\mathbf{i} + q\mathbf{j})$ m of $X$ and the time at which $G$ passes through $X$.`, template: "p = {{blank:p}}, q = {{blank:q}}, G at X when t = {{blank:t}} s",
        blanks: [N("p", 3.5, "5"), N("q", 3.5, "3"), N("t", 2.5, "3")],
        explanation: t`Paths: $-4 + 3s = 8 - u$ and $6 - s = -10 + 3u$. From the first, $u = 12 - 3s$; then $6 - s = -10 + 36 - 9s$, so $8s = 20$, $s = 2.5$ and $u = 4.5$. $X$: $\mathbf{r}_G(2.5) = 3.5\mathbf{i} + 3.5\mathbf{j}$; $G$ passes $X$ at $t = 2.5$ s and $H$ at $t = 4.5$ s.` }),
    ],
    explanation: "Same t for a collision; different parameters for the crossing point of the paths.",
    hints: ["(a) Use one t in both components.", "(b) Use s for G and u for H."],
  });
  same(at(H0, vH, 4.5), [3.5, 3.5]);

  // Practice structured (13 marks): two ships, bearings, closest approach
  const S0 = [0, 0], vS = [12, 5], T0 = [26, -13], vT = [2, 15];
  const relST = (s) => vec.sub(at(T0, vT, s), at(S0, vS, s));
  // ST = (26 - 10t, -13 + 10t); |ST|² = 200t² - 780t + 845
  for (const s of [0, 1, 2]) chk(vec.mag(relST(s)) ** 2, 200 * s * s - 780 * s + 845, 1e-9);
  const tm = 780 / 400;
  chk(tm, 1.95);
  const dm = vec.mag(relST(tm));
  chk(dm ** 2, 845 - (780 * 780) / 800, 1e-9);
  const brT = bearing(vT);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`In this question $\mathbf{i}$ and $\mathbf{j}$ are unit vectors due east and due north, distances are in kilometres and time in hours. At noon a ferry $S$ leaves a harbour $O$ on Lake Kariba with velocity $(12\mathbf{i} + 5\mathbf{j})$ km h$^{-1}$. At the same time a supply boat $T$ is at the point with position vector $(26\mathbf{i} - 13\mathbf{j})$ km, moving with velocity $(2\mathbf{i} + 15\mathbf{j})$ km h$^{-1}$.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Find the speed of the ferry.", value: 13, unit: "km/h", wrong: [17], explanation: t`$\sqrt{12^2 + 5^2} = 13$ km h$^{-1}$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Find the bearing on which the supply boat moves, in degrees correct to 1 decimal place.", value: brT, unit: "°", wrong: [90 - brT], explanation: t`The angle east of north is $\tan^{-1}\frac{2}{15} = ${d1(brT)}°$, so the bearing is $${d1(brT)}°$ (three figures: $00${d1(brT)}°$). ($${d1(90 - brT)}°$ is the angle with east.)` }),
      P.fib({ label: "(c)", marks: 2, stem: t`Find the position vector of $T$ relative to $S$ at time $t$ hours after noon, in the form $(a + bt)\mathbf{i} + (c + dt)\mathbf{j}$.`, template: "a = {{blank:a}}, b = {{blank:b}}, c = {{blank:c}}, d = {{blank:d}}",
        blanks: [N("a", 26, "-26"), N("b", -10, "10"), N("c", -13, "13"), N("d", 10, "-10")],
        explanation: t`$\overrightarrow{ST} = \mathbf{r}_T - \mathbf{r}_S = (26 + 2t - 12t)\mathbf{i} + (-13 + 15t - 5t)\mathbf{j} = (26 - 10t)\mathbf{i} + (-13 + 10t)\mathbf{j}$.` }),
      P.proof({ label: "(d)", marks: 3, stem: t`Show that $ST^2 = 200t^2 - 780t + 845$.`,
        points: [t`M1 squares and adds the components of $\overrightarrow{ST}$.`, t`A1 expands $(26 - 10t)^2 = 676 - 520t + 100t^2$ and $(10t - 13)^2 = 100t^2 - 260t + 169$.`, "A1 adds to reach the given result with no errors."],
        modelAnswer: t`$$
ST^2 = (26 - 10t)^2 + (10t - 13)^2
$$
$$
= 676 - 520t + 100t^2 + 100t^2 - 260t + 169 = 200t^2 - 780t + 845
$$`,
        explanation: "Square each component; check the cross terms carefully." }),
      P.fib({ label: "(e)", marks: 4, stem: "Hence find the time after noon, in hours, when the boats are closest together, and the least distance between them in km correct to 3 significant figures.", template: "t = {{blank:t}} h, least distance = {{blank:d}} km",
        blanks: [N("t", 1.95, "3.9", 2), S("d", dm, f3(Math.sqrt(845)), 2)],
        explanation: t`$\frac{\mathrm{d}}{\mathrm{d}t}(ST^2) = 400t - 780 = 0$ gives $t = 1.95$ h (about 13:57). Then $ST^2 = 200(1.95)^2 - 780(1.95) + 845 = ${f3(dm ** 2)}$, so $ST = ${f3(dm)}$ km. ($\sqrt{845}$ is the distance at noon.)` }),
      P.mcq({ label: "(f)", marks: 1, stem: "Which statement about the two boats is correct?",
        options: [
          ["They do not collide, because the least distance between them is not zero", t`Correct: the least distance is ${f3(dm)} km, greater than zero.`],
          ["They collide at 13:57", "At 13:57 they are closest, but still apart."],
          ["They collide, because their paths cross", "Crossing paths do not mean a collision: they must be there at the same time."],
          ["They cannot be compared, because they start at different points", "Relative position handles different starting points."],
        ], answer: "A", explanation: "A collision means the distance between them reaches zero." }),
    ],
    explanation: "Speed and bearing from the velocity, relative position, the squared distance as a quadratic, and its minimum.",
    hints: ["Bearings are measured clockwise from north.", "The least value of a quadratic at² + bt + c occurs at t = −b/(2a)."],
  });

  b.card("FORMULA", "Position with constant velocity", t`$\mathbf{r} = \mathbf{r}_0 + t\mathbf{v}$, where $\mathbf{r}_0$ is the position when $t = 0$.`);
  b.card("FORMULA", "Velocity from two positions", t`$\mathbf{v} = \dfrac{\mathbf{r}_2 - \mathbf{r}_1}{t_2 - t_1}$`);
  b.card("DEFINITION", "Speed", t`The magnitude of the velocity: $|a\mathbf{i} + b\mathbf{j}| = \sqrt{a^2 + b^2}$.`);
  b.card("DEFINITION", "Bearing", t`An angle measured clockwise from north, written with three figures. With $\mathbf{i}$ east and $\mathbf{j}$ north, $4\mathbf{i} - 3\mathbf{j}$ has bearing $126.9°$.`);
  b.card("CONCEPT", "Testing for a collision", t`Set $\mathbf{r}_P(t) = \mathbf{r}_Q(t)$ with the SAME $t$; every component must give the same value of $t$.`);
  b.card("CONCEPT", "Do the paths cross?", "Use different parameters for the two paths and solve. The particles reach the crossing point at different times unless the parameters agree.");
  b.card("CONCEPT", "Least distance apart", t`Write $\overrightarrow{PQ} = \mathbf{r}_Q - \mathbf{r}_P$ in terms of $t$, form $PQ^2$ (a quadratic in $t$) and complete the square or differentiate.`);
  b.card("FACT", "Path of a particle with constant velocity", t`A straight line through $\mathbf{r}_0$ parallel to $\mathbf{v}$; eliminate $t$ for its Cartesian equation.`);
  b.card("FACT", "Unit vector in a direction", t`To move at speed $V$ in the direction of $\mathbf{d}$, use $\mathbf{v} = \dfrac{V}{|\mathbf{d}|}\mathbf{d}$.`);
});
