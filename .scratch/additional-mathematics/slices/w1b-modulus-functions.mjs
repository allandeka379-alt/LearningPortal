// W1b: amath.graphs.modulus-functions (Cambridge only)
import { concept, P, t, chk, same, quad, solveTrig, rad, deg } from "../lib.mjs";

/** Number of distinct solutions of |q(x)| = k for the quadratic q = [a, b, c]. */
const qCount = ([a, b, c], k) => new Set([...quad.roots(a, b, c - k), ...quad.roots(a, b, c + k)].map((x) => x.toFixed(9))).size;
/** Number of distinct solutions in [lo, hi] degrees of |A·fn(x) + C| = k. */
const tCount = (fn, A, C, k, lo = 0, hi = 360) => new Set([...solveTrig({ fn, k: (k - C) / A, lo, hi }), ...solveTrig({ fn, k: (-k - C) / A, lo, hi })].map((x) => x.toFixed(6))).size;

concept("amath.graphs.modulus-functions", { file: "graphs/modulus-functions", keyPrefix: "graphs.modulus-functions" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`How is the graph of $y = |f(x)|$ obtained from the graph of $y = f(x)$?`,
    options: [
      [t`Parts below the $x$-axis are reflected in the $x$-axis; the rest is unchanged.`, "Correct: the modulus makes every negative y-value positive."],
      [t`Parts to the left of the $y$-axis are reflected in the $y$-axis; the rest is unchanged.`, t`That describes $y = f(|x|)$, a different graph.`],
      [t`The whole graph is reflected in the $x$-axis.`, t`That gives $y = -f(x)$; parts already above the axis would wrongly become negative.`],
      [t`Parts below the $x$-axis are removed and not replaced.`, "Nothing is removed: those parts are reflected upwards."],
    ],
    answer: "A",
    explanation: t`$|f(x)| = f(x)$ when $f(x) \geq 0$ and $|f(x)| = -f(x)$ when $f(x) < 0$, so only the negative parts change, by reflection in the $x$-axis.`,
  });

  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Where does the graph of $y = |3x - 12|$ cross the $y$-axis?`,
    options: [
      [t`$(0, 12)$`, t`Correct: at $x = 0$, $y = |-12| = 12$.`],
      [t`$(0, -12)$`, "The modulus is never negative; the intercept of the line is reflected."],
      [t`$(4, 0)$`, t`$(4, 0)$ is where the graph meets the $x$-axis (its vertex), not the $y$-axis.`],
      [t`$(0, 4)$`, t`$4$ is the $x$-coordinate of the vertex.`],
    ],
    answer: "A",
    explanation: t`Put $x = 0$: $y = |3(0) - 12| = 12$. The graph is a V with its vertex at $(4, 0)$.`,
  });

  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`State the coordinates of the vertex (cusp) of the graph of $y = |2x + 5|$.`,
    template: "({{blank:x}}, {{blank:y}})",
    blanks: [
      { id: "x", input: "number", accepted: [-2.5], wrong: "2.5" },
      { id: "y", input: "number", accepted: [0], wrong: "5" },
    ],
    explanation: t`The vertex is where $2x + 5 = 0$, so $x = -\frac{5}{2} = -2.5$ and $y = 0$.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`The graphs of $y = |x^2 + 1|$ and $y = x^2 + 1$ are identical.`,
    answer: true,
    explanation: t`True. $x^2 + 1 \geq 1 > 0$ for every $x$, so no part of the graph is below the $x$-axis and nothing is reflected.`,
  });

  chk(new Set([...[2 - 1 - 0], ...[-2 - 1]]).size, 2);
  b.num({
    d: 2, skill: "UNDERSTANDING", daily: true, calculator: false,
    stem: t`At how many points does the line $y = 2$ meet the graph of $y = |x + 1|$?`,
    value: 2, wrong: [1],
    explanation: t`The V-shaped graph has its vertex at $(-1, 0)$. The line $y = 2$ is above the vertex, so it meets both arms: at $x = 1$ and $x = -3$.`,
  });

  const v6 = quad.completeSquare(1, -6, 5);
  same(v6.vertex, [3, -4]);
  b.num({
    d: 3, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`The graph of $y = |x^2 - 6x + 5|$ has a reflected arch between its $x$-intercepts. Find the greatest value of $y$ on this arch.`,
    value: 4, wrong: [-4, 5],
    explanation: t`$x^2 - 6x + 5 = (x - 3)^2 - 4$, so the vertex of the parabola is $(3, -4)$. Reflecting gives the top of the arch at $(3, 4)$: the greatest value is $4$.`,
    hints: ["Complete the square to find the vertex of the parabola."],
  });

  chk(qCount([1, -6, 5], 3), 4);
  b.num({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`Using the graph of $y = |x^2 - 6x + 5|$, find the number of solutions of $|x^2 - 6x + 5| = 3$.`,
    value: 4, wrong: [2, 3],
    explanation: t`The arch between $x = 1$ and $x = 5$ has height $4$. Since $0 < 3 < 4$, the line $y = 3$ crosses the arch twice and the two outer branches once each: 4 solutions.`,
    hints: ["Compare 3 with the height of the reflected arch."],
  });

  chk(qCount([1, -6, 5], 4), 3);
  b.num({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`Find the number of solutions of $|x^2 - 6x + 5| = 4$.`,
    value: 3, wrong: [4, 2],
    explanation: t`The line $y = 4$ touches the top of the reflected arch at $(3, 4)$ (one solution) and crosses each outer branch once: 3 solutions.`,
    hints: ["The top of the reflected arch is at height 4."],
  });

  chk(qCount([1, -6, 5], 0), 2); chk(qCount([1, -6, 5], 6), 2); chk(qCount([1, -6, 5], 2), 4);
  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`For which values of $k$ does $|x^2 - 6x + 5| = k$ have exactly two solutions?`,
    options: [
      [t`$k = 0$ or $k > 4$`, t`Correct: $k = 0$ gives the two roots; $k > 4$ meets only the outer branches.`],
      [t`$0 < k < 4$`, "These lines cross the arch twice as well as the outer branches: 4 solutions."],
      [t`$k = 4$`, "This line touches the top of the arch: 3 solutions."],
      [t`$k > 0$`, t`For $0 < k \leq 4$ there are 3 or 4 solutions.`],
    ],
    answer: "A",
    explanation: t`The arch has height 4. $k < 0$: none; $k = 0$: 2; $0 < k < 4$: 4; $k = 4$: 3; $k > 4$: 2. So exactly two solutions when $k = 0$ or $k > 4$.`,
    hints: ["Draw horizontal lines at different heights across the graph."],
  });

  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`For $0^\circ \leq x \leq 360^\circ$, find the greatest and least values of $y = |2\sin x - 1|$.`,
    template: "greatest value = {{blank:max}}, least value = {{blank:min}}",
    blanks: [
      { id: "max", input: "number", accepted: [3], wrong: "1" },
      { id: "min", input: "number", accepted: [0], wrong: "-3" },
    ],
    explanation: t`$2\sin x - 1$ takes every value from $-3$ (at $270^\circ$) to $1$ (at $90^\circ$). Its modulus therefore ranges from $0$ (where $\sin x = \frac{1}{2}$) up to $|-3| = 3$.`,
    hints: [t`First find the range of $2\sin x - 1$.`],
  });

  const s11 = [...solveTrig({ fn: "sin", k: 1.5, lo: 0, hi: 360 }), ...solveTrig({ fn: "sin", k: -0.5, lo: 0, hi: 360 })];
  same(s11, [210, 330]);
  chk(tCount("sin", 2, -1, 2), 2);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Find the number of solutions of $|2\sin x - 1| = 2$ for $0^\circ \leq x \leq 360^\circ$.`,
    value: 2, wrong: [4],
    explanation: t`$2\sin x - 1 = 2$ needs $\sin x = 1.5$: impossible. $2\sin x - 1 = -2$ gives $\sin x = -\frac{1}{2}$: $x = 210^\circ$ or $330^\circ$. So there are 2 solutions. On the graph, $y = 2$ only meets the tall reflected part (height 3), not the hump of height 1.`,
    hints: ["Solve both cases; one is impossible."],
  });

  chk(tCount("sin", 2, -1, 0.5), 4);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Find the number of solutions of $|2\sin x - 1| = \frac{1}{2}$ for $0^\circ \leq x \leq 360^\circ$.`,
    value: 4, wrong: [2],
    explanation: t`$2\sin x - 1 = \frac{1}{2}$ gives $\sin x = \frac{3}{4}$ (two solutions, in the first and second quadrants); $2\sin x - 1 = -\frac{1}{2}$ gives $\sin x = \frac{1}{4}$ (two more). In total 4 solutions.`,
    hints: [t`Each case gives $\sin x$ equal to a number between 0 and 1.`],
  });

  b.match({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each graph with one of its features.",
    pairs: [
      [t`$y = |x - 3|$`, t`a single cusp at $(3, 0)$`],
      [t`$y = |x^2 - 9|$`, t`a reflected arch with top at $(0, 9)$`],
      [t`$y = |x^2 + 9|$`, "no cusps: identical to the original parabola"],
      [t`$y = |\cos x|$, $0^\circ \leq x \leq 360^\circ$`, t`cusps at $x = 90^\circ$ and $x = 270^\circ$`],
    ],
    explanation: t`$|x - 3|$ is a V with vertex $(3, 0)$. $x^2 - 9$ is negative between $\pm 3$, with vertex $(0, -9)$ reflected to $(0, 9)$. $x^2 + 9$ is never negative. $\cos x$ is negative between $90^\circ$ and $270^\circ$, so cusps form at those zeros.`,
    hints: ["Find where each original graph is below the axis."],
  });

  same(quad.roots(1, -2, -3), [-1, 3]);
  same(quad.completeSquare(1, -2, -3).vertex, [1, -4]);
  b.manualShort({
    d: 3, skill: "APPLICATION", calculator: false, marks: 4,
    stem: t`Describe the sketch you would draw of $y = |(x + 1)(x - 3)|$, giving the coordinates of all the key points.`,
    points: [
      t`Cusps on the $x$-axis at $(-1, 0)$ and $(3, 0)$.`,
      t`$y$-intercept at $(0, 3)$ (the original $-3$ reflected).`,
      t`Reflected arch between $x = -1$ and $x = 3$ with maximum point $(1, 4)$.`,
      t`Outside $-1 \leq x \leq 3$ the graph is the original U-shaped parabola, rising steeply on both sides.`,
    ],
    modelAnswer: t`$(x + 1)(x - 3) = x^2 - 2x - 3 = (x - 1)^2 - 4$. The parabola has roots $-1$ and $3$ and vertex $(1, -4)$. Reflecting the part between the roots gives an arch from the cusp $(-1, 0)$ up through $(0, 3)$ to the maximum $(1, 4)$ and down to the cusp $(3, 0)$; outside the roots the U-shaped branches rise as before.`,
    explanation: "Find the roots, the vertex and the y-intercept of the original parabola, then reflect the part below the axis.",
    hints: ["Expand and complete the square to find the vertex."],
  });

  b.mcq({
    d: 4, skill: "UNDERSTANDING", calculator: false,
    stem: t`Which statement about the graph of $y = |\tan x|$ for $0^\circ \leq x \leq 180^\circ$, $x \neq 90^\circ$, is true?`,
    options: [
      [t`The branch for $90^\circ < x \leq 180^\circ$ is reflected, so $y \to +\infty$ on both sides of $x = 90^\circ$.`, t`Correct: $\tan x < 0$ for $90^\circ < x < 180^\circ$, so that branch is reflected upwards; near $90^\circ$ it also tends to $+\infty$.`],
      [t`The branch for $0^\circ \leq x < 90^\circ$ is reflected, so $y \to -\infty$ as $x$ approaches $90^\circ$ from below.`, t`$\tan x \geq 0$ for $0^\circ \leq x < 90^\circ$, so that branch is unchanged; and a modulus is never negative.`],
      [t`The graph is identical to $y = \tan x$, because $\tan x$ is never negative in this interval.`, t`$\tan x$ is negative between $90^\circ$ and $180^\circ$, so that branch is reflected.`],
      [t`The asymptote moves from $x = 90^\circ$ to $x = 180^\circ$ when the negative branch is reflected.`, "Reflection in the x-axis does not move vertical asymptotes."],
    ],
    answer: "A",
    explanation: t`For $0^\circ \leq x < 90^\circ$, $\tan x \geq 0$ and is unchanged. For $90^\circ < x \leq 180^\circ$, $\tan x < 0$ (until $180^\circ$), so it is reflected: it comes down from $+\infty$ to $0$ at $180^\circ$. The asymptote $x = 90^\circ$ stays.`,
    hints: [t`Where is $\tan x$ negative in this interval?`],
  });

  same(solveTrig({ fn: "cos", k: 0, a: 2, lo: 0, hi: 180 }), [45, 135]);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`For $0^\circ \leq x \leq 180^\circ$, state the greatest value of $y = |3\cos 2x|$ and the number of points where its graph meets the $x$-axis.`,
    template: "greatest value = {{blank:max}}, number of points on the x-axis = {{blank:n}}",
    blanks: [
      { id: "max", input: "number", accepted: [3], wrong: "6" },
      { id: "n", input: "number", accepted: [2], wrong: "4" },
    ],
    explanation: t`$|3\cos 2x| \leq 3$, with $3$ reached at $x = 0^\circ, 90^\circ, 180^\circ$. It meets the axis where $\cos 2x = 0$: $2x = 90^\circ, 270^\circ$, so $x = 45^\circ$ and $135^\circ$ (two cusps).`,
    hints: [t`$\cos 2x$ completes one full cycle for $0^\circ \leq x \leq 180^\circ$.`],
  });

  // Struct 1: y = |4 - 2x| with y = x + 1: x-int 2, y-int 4; solutions x = 1, 5
  for (const x of [1, 5]) chk(Math.abs(4 - 2 * x), x + 1);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: t`This question is about the graph of $y = |4 - 2x|$ and the line $y = x + 1$.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: t`Find where the graph of $y = |4 - 2x|$ meets the axes.`, template: "x-axis at x = {{blank:x}}; y-axis at y = {{blank:y}}",
        blanks: [{ id: "x", input: "number", accepted: [2], wrong: "-2" }, { id: "y", input: "number", accepted: [4], wrong: "-4" }],
        explanation: t`$4 - 2x = 0$ at $x = 2$ (the vertex); at $x = 0$, $y = |4| = 4$.` }),
      P.manual({ label: "(b)", marks: 3, stem: t`Describe the sketch you would draw of $y = |4 - 2x|$ and $y = x + 1$ on the same axes.`,
        points: [t`A V shape with its vertex (cusp) at $(2, 0)$, through $(0, 4)$, arms of gradient $-2$ (left) and $2$ (right).`, t`A straight line through $(0, 1)$ and $(-1, 0)$ with gradient 1.`, t`The line crosses the V twice: once on each arm.`],
        modelAnswer: t`The V-shaped graph has its vertex at $(2, 0)$ and passes through $(0, 4)$ and $(4, 4)$. The line $y = x + 1$ passes through $(-1, 0)$ and $(0, 1)$; it crosses the left arm between $x = 0$ and $x = 2$ and the right arm beyond $x = 4$.`,
        explanation: "Describe the shape, intercepts and the number of intersections." }),
      P.fib({ label: "(c)", marks: 2, stem: t`Hence solve $|4 - 2x| = x + 1$, giving the solutions in ascending order.`, template: "x = {{blank:a}} or x = {{blank:b}}",
        blanks: [{ id: "a", input: "number", accepted: [1], wrong: "-1" }, { id: "b", input: "number", accepted: [5], wrong: "-5" }],
        explanation: t`Left arm: $4 - 2x = x + 1$, $x = 1$. Right arm: $2x - 4 = x + 1$, $x = 5$. Both give $x + 1 > 0$.` }),
    ],
    explanation: "Sketch the V and the line to see how many intersections there are, then solve on each arm.",
    hints: [t`On the left arm $y = 4 - 2x$; on the right arm $y = 2x - 4$.`],
  });

  // Struct 2: y = |1 + 3cos x|, 0..360
  const z = solveTrig({ fn: "cos", k: -1 / 3, lo: 0, hi: 360 });
  chk(z[0], deg(Math.acos(-1 / 3)));
  chk(tCount("cos", 3, 1, 1), 4); chk(tCount("cos", 3, 1, 3), 2);
  for (const k of [0.3, 1, 1.9]) chk(tCount("cos", 3, 1, k), 4);
  chk(tCount("cos", 3, 1, 2), 3); chk(tCount("cos", 3, 1, 2.5), 2);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`The graph of $y = |1 + 3\cos x|$ is drawn for $0^\circ \leq x \leq 360^\circ$.`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: "State the greatest value of $y$, the value of $y$ when $x = 180^\\circ$, and the number of points where the graph meets the $x$-axis.", template: "greatest value = {{blank:max}}; y at 180° = {{blank:y}}; points on the x-axis = {{blank:n}}",
        blanks: [{ id: "max", input: "number", accepted: [4], wrong: "3" }, { id: "y", input: "number", accepted: [2], wrong: "-2" }, { id: "n", input: "number", accepted: [2], wrong: "1" }],
        explanation: t`$1 + 3\cos x$ ranges from $-2$ (at $180^\circ$) to $4$ (at $0^\circ$ and $360^\circ$). So the greatest value is 4, and at $180^\circ$, $y = |-2| = 2$. It crosses zero twice, where $\cos x = -\frac{1}{3}$.` }),
      P.fib({ label: "(b)", marks: 2, stem: t`Find the $x$-coordinates of the points where the graph meets the $x$-axis, correct to 1 decimal place, in ascending order.`, template: "x = {{blank:a}}° and x = {{blank:b}}°",
        blanks: [{ id: "a", input: "number", accepted: [Number(z[0].toFixed(1))], tolerance: 0.05, wrong: "70.5" }, { id: "b", input: "number", accepted: [Number(z[1].toFixed(1))], tolerance: 0.05, wrong: "289.5" }],
        explanation: t`$\cos x = -\frac{1}{3}$: $x = ${z[0].toFixed(1)}^\circ$ or $x = 360^\circ - ${z[0].toFixed(1)}^\circ = ${z[1].toFixed(1)}^\circ$.` }),
      P.group({ label: "(c)", stem: "State the number of solutions of", parts: [
        P.num({ label: "(i)", marks: 1, stem: t`$|1 + 3\cos x| = 1$,`, value: 4, wrong: [2], explanation: t`$1 < 2$, the height of the reflected part, so the line $y = 1$ meets the graph 4 times ($\cos x = 0$ or $\cos x = -\frac{2}{3}$).` }),
        P.num({ label: "(ii)", marks: 1, stem: t`$|1 + 3\cos x| = 3$.`, value: 2, wrong: [4], explanation: t`$3 > 2$, so the line misses the reflected part and meets only the outer parts ($\cos x = \frac{2}{3}$; $\cos x = -\frac{4}{3}$ is impossible).` }),
      ] }),
      P.fib({ label: "(d)", marks: 2, stem: t`Find the set of values of $k$ for which $|1 + 3\cos x| = k$ has exactly four solutions.`, template: "{{blank:lo}} < k < {{blank:hi}}",
        blanks: [{ id: "lo", input: "number", accepted: [0], wrong: "1" }, { id: "hi", input: "number", accepted: [2], wrong: "4" }],
        explanation: t`Four solutions when the line $y = k$ crosses the reflected part (height 2) twice and the outer parts twice: $0 < k < 2$. At $k = 2$ it touches the top of the reflected part (3 solutions).` }),
    ],
    explanation: t`The reflected section between the two zeros has its maximum $2$ at $180^\circ$; the outer sections rise to $4$. Horizontal lines at heights between 0 and 2 meet the graph four times.`,
    hints: [t`Find the range of $1 + 3\cos x$ first.`, "The number of solutions changes at k = 0, 2 and 4."],
  });
  chk(rad(180), Math.PI);

  // Cards
  b.card("DEFINITION", t`Graph of $y = |f(x)|$`, t`The graph of $y = f(x)$ with every part below the $x$-axis reflected in the $x$-axis.`);
  b.card("DEFINITION", "Cusp", "A sharp corner where a reflected part of the graph meets the x-axis.");
  b.card("FACT", t`Vertex of $y = |ax + b|$`, t`$\left(-\frac{b}{a},\ 0\right)$; arms of gradient $\pm a$.`);
  b.card("FACT", t`Top of the reflected arch of $y = |x^2 + bx + c|$`, t`The vertex $(p, q)$ with $q < 0$ becomes $(p, -q)$.`);
  b.card("CONCEPT", t`Solutions of $|f(x)| = k$ (quadratic, arch height $h$)`, t`$0 < k < h$: 4; $k = h$: 3; $k > h$ or $k = 0$: 2; $k < 0$: none.`);
  b.card("FACT", t`$y$-intercept of $y = |f(x)|$`, t`$(0, |f(0)|)$: a negative intercept is reflected.`);
  b.card("CONCEPT", t`Sketching $y = |a\sin bx + c|$`, "Sketch the ordinary graph over the interval, find its zeros, reflect each negative section.");
  b.card("FACT", t`Asymptotes of $y = |\tan x|$`, t`The same as for $y = \tan x$ (e.g. $x = 90^\circ$); only the negative branches are reflected.`);
});
