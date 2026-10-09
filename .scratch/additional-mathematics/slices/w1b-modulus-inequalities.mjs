// W1b: amath.modulus.inequalities (Cambridge only)
import { concept, P, t, chk, same } from "../lib.mjs";

/** Brute-force solution set of pred on [-30, 30] as maximal intervals; endpoints rounded to 1/1024 so they compare cleanly. */
function solve(pred) {
  const out = [];
  let start = null;
  const N = 1024;
  for (let i = -30 * N; i <= 30 * N + 1; i++) {
    const x = i / N;
    const ok = i <= 30 * N && pred(x);
    if (ok && start === null) start = x;
    if (!ok && start !== null) { out.push([start, (i - 1) / N]); start = null; }
  }
  return out;
}
/** Asserts that pred's solution set matches the expected intervals (open/closed ignored; ±30 = unbounded). */
function expect(pred, intervals, label) {
  const got = solve(pred);
  const near = (a, b) => Math.abs(a - b) <= 2 / 1024;
  if (got.length !== intervals.length || !got.every(([a, b], i) => near(a, intervals[i][0]) && near(b, intervals[i][1]))) {
    throw new Error(`${label}: got ${JSON.stringify(got)}`);
  }
}
const INF = 30;

concept("amath.modulus.inequalities", { file: "modulus/inequalities", keyPrefix: "modulus.inequalities" }, (b) => {
  expect((x) => Math.abs(x) < 4, [[-4, 4]], "q1");
  b.mcq({
    d: 1, skill: "UNDERSTANDING", calculator: false,
    stem: t`Solve $|x| < 4$.`,
    options: [
      [t`$-4 < x < 4$`, "Correct: the numbers less than 4 away from 0."],
      [t`$x < 4$`, t`This includes numbers such as $-10$, whose modulus is 10.`],
      [t`$x < -4$ or $x > 4$`, t`This is the solution of $|x| > 4$.`],
      [t`$x < \pm 4$`, "This is not a valid way of writing a solution set."],
    ],
    answer: "A",
    explanation: t`$|x| < 4$ means $x$ is within 4 of zero: $-4 < x < 4$.`,
  });

  expect((x) => Math.abs(x - 5) <= 3, [[2, 8]], "q2");
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Solve $|x - 5| \leq 3$.`,
    template: "{{blank:a}} ≤ x ≤ {{blank:b}}",
    blanks: [
      { id: "a", input: "number", accepted: [2], wrong: "-8" },
      { id: "b", input: "number", accepted: [8], wrong: "-2" },
    ],
    explanation: t`$-3 \leq x - 5 \leq 3$; add 5 throughout: $2 \leq x \leq 8$.`,
  });

  expect((x) => Math.abs(x + 1) > 6, [[-INF, -7], [5, INF]], "q3");
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Solve $|x + 1| > 6$.`,
    options: [
      [t`$x < -7$ or $x > 5$`, t`Correct: $x + 1 < -6$ or $x + 1 > 6$.`],
      [t`$-7 < x < 5$`, t`This is the solution of $|x + 1| < 6$.`],
      [t`$x < -5$ or $x > 7$`, t`Subtract 1, not add it: $x + 1 > 6$ gives $x > 5$.`],
      [t`$x > 5$`, t`This misses the other piece; $x = -8$ gives $|-7| = 7 > 6$.`],
    ],
    answer: "A",
    explanation: t`"Greater than" gives two pieces: $x + 1 < -6$, so $x < -7$; or $x + 1 > 6$, so $x > 5$.`,
  });

  expect((x) => Math.abs(4 * x - 2) >= 6, [[-INF, -1], [2, INF]], "q4");
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Solve $|4x - 2| \geq 6$.`,
    template: "x ≤ {{blank:a}} or x ≥ {{blank:b}}",
    blanks: [
      { id: "a", input: "number", accepted: [-1], wrong: "1" },
      { id: "b", input: "number", accepted: [2], wrong: "1" },
    ],
    explanation: t`$4x - 2 \leq -6$ gives $4x \leq -4$, $x \leq -1$; $4x - 2 \geq 6$ gives $4x \geq 8$, $x \geq 2$.`,
    hints: [t`Write $4x - 2 \leq -6$ or $4x - 2 \geq 6$.`],
  });

  expect((x) => 2 * Math.abs(x + 3) < 10, [[-8, 2]], "q5");
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Solve $2|x + 3| < 10$.`,
    template: "{{blank:a}} < x < {{blank:b}}",
    blanks: [
      { id: "a", input: "number", accepted: [-8], wrong: "-13" },
      { id: "b", input: "number", accepted: [2], wrong: "7" },
    ],
    explanation: t`Divide by 2: $|x + 3| < 5$, so $-5 < x + 3 < 5$ and $-8 < x < 2$.`,
    hints: ["Divide both sides by 2 first."],
  });

  const ints6 = []; for (let x = -20; x <= 20; x++) if (Math.abs(x - 1) < 3) ints6.push(x);
  same(ints6, [-1, 0, 1, 2, 3]);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`How many integers $x$ satisfy $|x - 1| < 3$?`,
    value: ints6.length, wrong: [7, 6],
    explanation: t`$-3 < x - 1 < 3$ gives $-2 < x < 4$. The integers are $-1, 0, 1, 2, 3$: five of them ($-2$ and $4$ are excluded because the inequality is strict).`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`The inequality $|x| > -2$ is true for every real number $x$.`,
    answer: true,
    explanation: t`True. $|x| \geq 0 > -2$ for every $x$.`,
  });

  expect((x) => Math.abs(x - 4) <= 0, [[4, 4]], "q8");
  b.tf({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`The inequality $|x - 4| \leq 0$ has exactly one solution.`,
    answer: true,
    explanation: t`True. A modulus cannot be negative, so $|x - 4| \leq 0$ forces $|x - 4| = 0$, giving only $x = 4$.`,
    hints: ["Can a modulus be less than 0?"],
  });

  expect((x) => Math.abs(x - 3) < Math.abs(x + 1), [[1, INF]], "q9");
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Solve $|x - 3| < |x + 1|$. The solution has the form $x > a$; find $a$.`,
    value: 1, prefix: "a =", wrong: [-1, 3],
    explanation: t`Square both sides (both are non-negative): $x^2 - 6x + 9 < x^2 + 2x + 1$, so $8 < 8x$ and $x > 1$. Geometrically: $x$ is closer to 3 than to $-1$, i.e. to the right of their midpoint 1.`,
    hints: ["Square both sides; the $x^2$ terms cancel."],
  });

  expect((x) => Math.abs(x + 2) >= Math.abs(2 * x - 5), [[1, 7]], "q10");
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Solve $|x + 2| \geq |2x - 5|$.`,
    template: "{{blank:a}} ≤ x ≤ {{blank:b}}",
    blanks: [
      { id: "a", input: "number", accepted: [1], wrong: "-7" },
      { id: "b", input: "number", accepted: [7], wrong: "-1" },
    ],
    explanation: t`Square: $x^2 + 4x + 4 \geq 4x^2 - 20x + 25$, so $0 \geq 3x^2 - 24x + 21$, i.e. $x^2 - 8x + 7 \leq 0$, $(x - 1)(x - 7) \leq 0$. Between the roots: $1 \leq x \leq 7$. Test $x = 4$: $6 \geq 3$, true.`,
    hints: ["Square both sides and collect everything on one side.", "Divide by 3 to simplify the quadratic."],
  });

  expect((x) => Math.abs(x - 1) < x + 3, [[-1, INF]], "q11");
  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Solve $|x - 1| < x + 3$.`,
    options: [
      [t`$x > -1$`, t`Correct: the only critical value is $x = -1$, and $x = 0$ satisfies the inequality.`],
      [t`$x < -1$`, t`Test $x = -2$: $|-3| = 3 < 1$ is false.`],
      [t`$-1 < x < 1$`, t`For $x \geq 1$ the inequality is $x - 1 < x + 3$, which is always true, so there is no upper limit.`],
      ["all real numbers", t`At $x = -3$: $4 < 0$ is false.`],
    ],
    answer: "A",
    explanation: t`Critical values from $|x - 1| = x + 3$: case $x - 1 = x + 3$ has no solution; case $-(x - 1) = x + 3$ gives $x = -1$. Testing $x = 0$ ($1 < 3$, true) and $x = -2$ ($3 < 1$, false) gives $x > -1$.`,
    hints: ["Find the critical values from the equation, then test a value either side."],
  });

  expect((x) => Math.abs(3 * x - 1) <= x + 5, [[-1, 3]], "q12");
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Solve $|3x - 1| \leq x + 5$.`,
    template: "{{blank:a}} ≤ x ≤ {{blank:b}}",
    blanks: [
      { id: "a", input: "number", accepted: [-1], wrong: "1" },
      { id: "b", input: "number", accepted: [3], wrong: "-3" },
    ],
    explanation: t`Critical values: $3x - 1 = x + 5$ gives $x = 3$; $-(3x - 1) = x + 5$ gives $-4x = 4$, $x = -1$. Test $x = 0$: $1 \leq 5$, true; $x = 4$: $11 \leq 9$, false; $x = -2$: $7 \leq 3$, false. So $-1 \leq x \leq 3$.`,
    hints: ["Do not square: the right-hand side can be negative.", "Find the critical values, then test a value in each region."],
  });

  expect((x) => Math.abs(x * x - 10) < 6, [[-4, -2], [2, 4]], "q13");
  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Solve $|x^2 - 10| < 6$.`,
    options: [
      [t`$-4 < x < -2$ or $2 < x < 4$`, t`Correct: $4 < x^2 < 16$.`],
      [t`$2 < x < 4$`, t`Negative values also work: $x = -3$ gives $|9 - 10| = 1 < 6$.`],
      [t`$-4 < x < 4$`, t`$x = 0$ gives $|{-10}| = 10$, which is not less than 6.`],
      [t`$x < -4$ or $x > 4$`, t`$x = 5$ gives $|25 - 10| = 15$, which is not less than 6.`],
    ],
    answer: "A",
    explanation: t`$-6 < x^2 - 10 < 6$ gives $4 < x^2 < 16$. $x^2 > 4$: $x < -2$ or $x > 2$; $x^2 < 16$: $-4 < x < 4$. Together: $-4 < x < -2$ or $2 < x < 4$.`,
    hints: [t`Write $-6 < x^2 - 10 < 6$ and add 10.`],
  });

  expect((x) => Math.abs(x * x - 2 * x) > 3, [[-INF, -1], [3, INF]], "q14");
  b.fib({
    d: 5, skill: "ANALYSIS", calculator: false,
    stem: t`Solve $|x^2 - 2x| > 3$.`,
    template: "x < {{blank:a}} or x > {{blank:b}}",
    blanks: [
      { id: "a", input: "number", accepted: [-1], wrong: "1" },
      { id: "b", input: "number", accepted: [3], wrong: "-3" },
    ],
    explanation: t`Either $x^2 - 2x > 3$, i.e. $(x - 3)(x + 1) > 0$, giving $x < -1$ or $x > 3$; or $x^2 - 2x < -3$, i.e. $x^2 - 2x + 3 < 0$, which has no solution because $x^2 - 2x + 3 = (x - 1)^2 + 2 > 0$. So $x < -1$ or $x > 3$.`,
    hints: [t`Split into $x^2 - 2x > 3$ or $x^2 - 2x < -3$.`, "One of the two pieces has no solution: check its discriminant."],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each inequality with its solution set.",
    pairs: [
      [t`$|x - 2| < 1$`, t`$1 < x < 3$`],
      [t`$|x - 2| > 1$`, t`$x < 1$ or $x > 3$`],
      [t`$|x + 2| \leq 1$`, t`$-3 \leq x \leq -1$`],
      [t`$|x + 2| \geq 1$`, t`$x \leq -3$ or $x \geq -1$`],
    ],
    explanation: t`$|x - a| < c$ is the interval of width $2c$ centred on $a$; $|x - a| > c$ is everything outside it.`,
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: t`Explain why you may square both sides of $|x - 3| < |x + 1|$, but should not simply square both sides of $|x - 1| < x - 5$.`,
    points: [
      t`In $|x - 3| < |x + 1|$ both sides are non-negative, and for non-negative numbers $P < Q \iff P^2 < Q^2$.`,
      t`In $|x - 1| < x - 5$ the right-hand side is negative for $x < 5$; squaring would then give wrong solutions (in fact the inequality has no solution).`,
    ],
    modelAnswer: t`Squaring preserves an inequality only between non-negative numbers. Both moduli are non-negative, so squaring the first is safe. In the second, $x - 5$ can be negative, and then the inequality is false whatever $x$ is, but squaring could suggest solutions. Using critical values shows $|x - 1| < x - 5$ has no solution at all.`,
    explanation: t`For example $-3 < 2$ is true but $9 < 4$ is false: squaring changes inequalities involving negative numbers.`,
    hints: ["When does squaring keep an inequality true?"],
  });
  expect((x) => Math.abs(x - 1) < x - 5, [], "q16 claim");

  // Struct 1: |2x - 1| = |x + 4| -> -1, 5; |2x - 1| < |x + 4| -> -1 < x < 5
  expect((x) => Math.abs(2 * x - 1) < Math.abs(x + 4), [[-1, 5]], "s1");
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: t`This question is about $|2x - 1|$ and $|x + 4|$.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: t`Solve $|2x - 1| = |x + 4|$, giving the solutions in ascending order.`, template: "x = {{blank:a}} or x = {{blank:b}}",
        blanks: [{ id: "a", input: "number", accepted: [-1], wrong: "1" }, { id: "b", input: "number", accepted: [5], wrong: "-5" }],
        explanation: t`$2x - 1 = x + 4$ gives $x = 5$; $2x - 1 = -(x + 4)$ gives $3x = -3$, $x = -1$.` }),
      P.fib({ label: "(b)", marks: 2, stem: t`Hence solve $|2x - 1| < |x + 4|$.`, template: "{{blank:a}} < x < {{blank:b}}",
        blanks: [{ id: "a", input: "number", accepted: [-1], wrong: "-4" }, { id: "b", input: "number", accepted: [5], wrong: "0.5" }],
        explanation: t`Squaring gives $3x^2 - 12x - 15 < 0$, i.e. $(x - 5)(x + 1) < 0$: between the critical values. Test $x = 0$: $1 < 4$, true.` }),
      P.num({ label: "(c)", marks: 1, stem: "How many integers satisfy the inequality in part (b)?", value: 5, wrong: [7],
        explanation: t`$0, 1, 2, 3, 4$: five integers.` }),
      P.manual({ label: "(d)", marks: 1, stem: t`Explain why squaring both sides is a valid method in part (b).`,
        points: [t`Both sides are moduli, hence non-negative, and squaring preserves an inequality between non-negative numbers.`],
        modelAnswer: "Both sides are non-negative, so a < b exactly when a² < b².", explanation: "Squaring is safe for non-negative quantities." }),
    ],
    explanation: "The critical values of the inequality are the solutions of the equation; a test value decides the region.",
    hints: ["Solve the equation by cases first.", "Test $x = 0$ in the inequality."],
  });

  // Struct 2: |x^2 - x - 6| = 6 -> -3, 0, 1, 4 ; < 6 -> -3 < x < 0 or 1 < x < 4
  expect((x) => Math.abs(x * x - x - 6) < 6, [[-3, 0], [1, 4]], "s2");
  for (const x of [-3, 0, 1, 4]) chk(Math.abs(x * x - x - 6), 6);
  const ints18 = []; for (let x = -20; x <= 20; x++) if (Math.abs(x * x - x - 6) < 6) ints18.push(x);
  same(ints18, [-2, -1, 2, 3]);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`The function $f$ is defined by $f(x) = |x^2 - x - 6|$ for all real $x$.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: t`Find the values of $x$ where the graph of $y = f(x)$ meets the $x$-axis, in ascending order.`, template: "x = {{blank:a}} and x = {{blank:b}}",
        blanks: [{ id: "a", input: "number", accepted: [-2], wrong: "2" }, { id: "b", input: "number", accepted: [3], wrong: "-3" }],
        explanation: t`$x^2 - x - 6 = (x - 3)(x + 2) = 0$ at $x = -2$ and $x = 3$.` }),
      P.fib({ label: "(b)", marks: 4, stem: t`Solve $f(x) = 6$, giving all four solutions in ascending order.`, template: "x = {{blank:a}}, {{blank:b}}, {{blank:c}}, {{blank:d}}",
        blanks: [{ id: "a", input: "number", accepted: [-3], wrong: "3" }, { id: "b", input: "number", accepted: [0], wrong: "2" }, { id: "c", input: "number", accepted: [1], wrong: "-1" }, { id: "d", input: "number", accepted: [4], wrong: "-4" }],
        explanation: t`$x^2 - x - 6 = 6$: $x^2 - x - 12 = (x - 4)(x + 3) = 0$, so $x = -3$ or $4$. $x^2 - x - 6 = -6$: $x^2 - x = x(x - 1) = 0$, so $x = 0$ or $1$.` }),
      P.mcq({ label: "(c)", marks: 2, stem: t`Hence solve $f(x) < 6$.`,
        options: [
          [t`$-3 < x < 0$ or $1 < x < 4$`, t`Correct: $-6 < x^2 - x - 6 < 6$ gives $x(x - 1) > 0$ and $(x - 4)(x + 3) < 0$ together.`],
          [t`$-3 < x < 4$`, t`At $x = \frac{1}{2}$, $f(x) = |{-6.25}| = 6.25$, which is not less than 6.`],
          [t`$0 < x < 1$`, "This is where the reflected arch rises above 6."],
          [t`$x < -3$ or $x > 4$`, t`There the parabola is above $y = 6$, so $f(x) > 6$.`],
        ],
        answer: "A",
        explanation: t`The graph is below $y = 6$ between $-3$ and $4$ except where the reflected arch (between $-2$ and $3$, peak $6.25$ at $x = \frac{1}{2}$) rises above 6, i.e. for $0 < x < 1$. So $-3 < x < 0$ or $1 < x < 4$.` }),
      P.num({ label: "(d)", marks: 1, stem: t`How many integers satisfy $f(x) < 6$?`, value: ints18.length, wrong: [7, 6],
        explanation: t`The integers in $-3 < x < 0$ or $1 < x < 4$ are $-2, -1, 2, 3$: four of them.` }),
    ],
    explanation: t`The reflected arch of $y = |x^2 - x - 6|$ reaches $6.25$ at $x = \frac{1}{2}$, just above the line $y = 6$, which is why there are four critical values.`,
    hints: [t`$f(x) = 6$ means $x^2 - x - 6 = 6$ or $x^2 - x - 6 = -6$.`, t`Use the four critical values and a sketch to choose the regions.`],
  });
  chk(Math.abs(0.25 - 0.5 - 6), 6.25);

  // Cards
  b.card("FACT", t`$|X| < c$ (with $c > 0$)`, t`$-c < X < c$`);
  b.card("FACT", t`$|X| > c$ (with $c > 0$)`, t`$X < -c$ or $X > c$`);
  b.card("CONCEPT", t`$|x - a|$ on the number line`, t`The distance between $x$ and $a$.`);
  b.card("CONCEPT", t`Solving $|P| < |Q|$`, t`Square both sides ($P^2 < Q^2$) and solve the quadratic inequality.`);
  b.card("CONCEPT", t`Solving $|ax + b| < cx + d$`, "Find the critical values from the equation (both cases), then test a value in each region; do not square.");
  b.card("CONCEPT", t`Solving $|ax^2 + bx + c| < d$`, t`$-d < ax^2 + bx + c < d$: solve both quadratic inequalities and take the overlap.`);
  b.card("FACT", t`$k|ax + b| > c$ with $k > 0$`, t`Divide by $k$ first: $|ax + b| > \frac{c}{k}$.`);
  b.card("FACT", t`$|X| < c$ with $c \leq 0$`, "No solution (a modulus is never negative).");
});
