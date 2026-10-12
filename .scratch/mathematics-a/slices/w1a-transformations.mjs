// W1a: amaths.functions.transformations (ZIMSEC Pure F5 incl. y = |f(x)|; Cambridge P1 1.2).
import { concept, P, t, chk, same, quad, ZP } from "../lib.mjs";

/** Number of solutions of g(x) = k on [lo, hi] by counting sign changes of g − k on a fine grid. */
function countRoots(g, k, lo = -50, hi = 50, n = 400000) {
  let c = 0;
  let prev = g(lo) - k;
  for (let i = 1; i <= n; i++) {
    const v = g(lo + ((hi - lo) * i) / n) - k;
    if (v === 0 || prev * v < 0) c++;
    prev = v;
  }
  return c;
}

concept("amaths.functions.transformations", { file: "functions/transformations", keyPrefix: "functions.transformations" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`Which transformation maps $y = f(x)$ onto $y = f(x) + 5$?`,
    options: [
      [t`Translation by $\begin{pmatrix} 0 \\ 5 \end{pmatrix}$`, "Correct: every y-value increases by 5."],
      [t`Translation by $\begin{pmatrix} 5 \\ 0 \end{pmatrix}$`, "A change to x would be inside the bracket."],
      [t`Translation by $\begin{pmatrix} -5 \\ 0 \end{pmatrix}$`, t`That is $y = f(x + 5)$.`],
      ["Stretch, scale factor 5, parallel to the y-axis", t`That is $y = 5f(x)$.`],
    ],
    answer: "A",
    explanation: t`Adding 5 outside the function adds 5 to every $y$-value: a translation by $\begin{pmatrix} 0 \\ 5 \end{pmatrix}$.`,
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true, calculator: false,
    stem: t`Which transformation maps $y = f(x)$ onto $y = f(x - 2)$?`,
    options: [
      [t`Translation by $\begin{pmatrix} 2 \\ 0 \end{pmatrix}$`, "Correct: changes inside the bracket act in reverse, so −2 moves the graph right."],
      [t`Translation by $\begin{pmatrix} -2 \\ 0 \end{pmatrix}$`, "Inside the bracket the direction is reversed: x − 2 moves the graph right."],
      [t`Translation by $\begin{pmatrix} 0 \\ -2 \end{pmatrix}$`, t`That is $y = f(x) - 2$.`],
      ["Stretch, scale factor 2, parallel to the x-axis", t`That is $y = f\left(\frac{1}{2}x\right)$.`],
    ],
    answer: "A",
    explanation: t`The new graph reaches each height when $x - 2$ equals the old $x$, that is 2 units later: a translation by $\begin{pmatrix} 2 \\ 0 \end{pmatrix}$.`,
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`Describe the transformation that maps $y = f(x)$ onto $y = f(3x)$.`,
    options: [
      [t`Stretch, scale factor $\frac{1}{3}$, parallel to the $x$-axis`, "Correct: x-distances from the y-axis are divided by 3."],
      ["Stretch, scale factor 3, parallel to the x-axis", t`That would be $y = f\left(\frac{1}{3}x\right)$.`],
      ["Stretch, scale factor 3, parallel to the y-axis", t`That is $y = 3f(x)$.`],
      [t`Translation by $\begin{pmatrix} -3 \\ 0 \end{pmatrix}$`, t`That is $y = f(x + 3)$.`],
    ],
    answer: "A",
    explanation: t`In $y = f(ax)$ the graph is squashed towards the $y$-axis: stretch, scale factor $\frac{1}{a}$, parallel to the $x$-axis. Here $a = 3$.`,
  });

  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`The point $(3, -4)$ lies on $y = f(x)$. Find its image on $y = 2f(x)$.`,
    template: "({{blank:x}}, {{blank:y}})",
    blanks: [{ id: "x", input: "number", accepted: [3], wrong: 1.5 }, { id: "y", input: "number", accepted: [-8], wrong: -4 }],
    explanation: t`A stretch parallel to the $y$-axis keeps $x$ and doubles $y$: $(3, -8)$.`,
  });

  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The point $(6, 2)$ lies on $y = f(x)$. Find its image on $y = f\left(\frac{1}{2}x\right)$.`,
    template: "({{blank:x}}, {{blank:y}})",
    blanks: [{ id: "x", input: "number", accepted: [12], wrong: 3 }, { id: "y", input: "number", accepted: [2], wrong: 1 }],
    explanation: t`$f\left(\frac{1}{2}x\right)$ is a stretch with scale factor 2 parallel to the $x$-axis, so $x$ doubles: $(12, 2)$. Check: at $x = 12$, $f\left(\frac{1}{2} \times 12\right) = f(6) = 2$.`,
    hints: ["Which x makes ½x equal to 6?"],
  });

  b.fib({
    d: 3, skill: "APPLICATION", daily: false, calculator: false,
    stem: t`The point $(1, 4)$ lies on $y = f(x)$. Find its image on $y = f(x - 2) + 3$.`,
    template: "({{blank:x}}, {{blank:y}})",
    blanks: [{ id: "x", input: "number", accepted: [3], wrong: -1 }, { id: "y", input: "number", accepted: [7], wrong: 1 }],
    explanation: t`$f(x - 2)$ moves the point 2 right to $(3, 4)$; $+3$ moves it up to $(3, 7)$. Check: $f(3 - 2) + 3 = f(1) + 3 = 7$.`,
    hints: ["Treat the inside change and the outside change separately."],
  });

  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`The point $(-2, 3)$ lies on $y = f(x)$. Find its image on $y = -2f(x + 1)$.`,
    template: "({{blank:x}}, {{blank:y}})",
    blanks: [{ id: "x", input: "number", accepted: [-3], wrong: -1 }, { id: "y", input: "number", accepted: [-6], wrong: 6 }],
    explanation: t`$f(x + 1)$: 1 unit left, to $(-3, 3)$. Multiplying by $-2$: stretch factor 2 and reflection in the $x$-axis, so $y$ becomes $-6$. Image $(-3, -6)$. Check: $-2f(-3 + 1) = -2f(-2) = -6$.`,
    hints: ["x + 1 inside the bracket moves the graph left.", "Multiplying by −2 doubles y and changes its sign."],
  });

  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The graph of $y = x^{2}$ is translated by the vector $\begin{pmatrix} -1 \\ 4 \end{pmatrix}$. What is the equation of the new graph?`,
    options: [
      [t`$y = (x + 1)^{2} + 4$`, "Correct: x is replaced by x + 1 (left 1) and 4 is added (up 4)."],
      [t`$y = (x - 1)^{2} + 4$`, "x − 1 would move the graph right."],
      [t`$y = (x + 4)^{2} - 1$`, "The two components of the vector have been swapped."],
      [t`$y = x^{2} - x + 4$`, "A translation in x replaces x by (x + 1) inside the square."],
    ],
    answer: "A",
    explanation: t`A translation $\begin{pmatrix} p \\ q \end{pmatrix}$ maps $y = f(x)$ to $y = f(x - p) + q$. With $p = -1$, $q = 4$: $y = (x + 1)^{2} + 4$, with vertex $(-1, 4)$.`,
    hints: ["Track the vertex (0, 0)."],
  });

  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The graph of $y = x^{3}$ is reflected in the $y$-axis and then translated 2 units in the positive $y$-direction. What is the equation of the resulting graph?`,
    options: [
      [t`$y = 2 - x^{3}$`, t`Correct: reflecting in the $y$-axis gives $(-x)^{3} = -x^{3}$; then add 2.`],
      [t`$y = x^{3} - 2$`, "The reflection is missing and the translation has the wrong sign."],
      [t`$y = (2 - x)^{3}$`, "Here the translation has been applied inside the bracket, which moves the graph sideways."],
      [t`$y = -x^{3} - 2$`, "Up 2 means adding 2, not subtracting it."],
    ],
    answer: "A",
    explanation: t`Reflection in the $y$-axis: $y = (-x)^{3} = -x^{3}$. Translation up 2: $y = -x^{3} + 2$.`,
    hints: ["Reflection in the y-axis replaces x by −x."],
  });

  // y = 4cos(3x) − 1: max 3, min −5, period 120°
  let mx = -Infinity, mn = Infinity;
  for (let d = 0; d <= 360; d += 0.5) {
    const v = 4 * Math.cos((3 * d * Math.PI) / 180) - 1;
    mx = Math.max(mx, v);
    mn = Math.min(mn, v);
  }
  chk(mx, 3, 1e-9);
  chk(mn, -5, 1e-9);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The graph of $y = 4\cos 3x - 1$ is obtained from $y = \cos x$ by stretches and a translation. State its greatest value, its least value and its period in degrees.`,
    template: "Greatest value {{blank:a}}, least value {{blank:b}}, period {{blank:p}}°",
    blanks: [
      { id: "a", input: "number", accepted: [3], wrong: 4 },
      { id: "b", input: "number", accepted: [-5], wrong: -4 },
      { id: "p", input: "number", accepted: [120], wrong: 1080 },
    ],
    explanation: t`$\cos 3x$ has period $\frac{360^{\circ}}{3} = 120^{\circ}$ (stretch factor $\frac{1}{3}$ parallel to the $x$-axis). $4\cos 3x$ ranges from $-4$ to $4$; subtracting 1 gives $-5$ to $3$.`,
    hints: ["The factor 3 inside divides the period by 3.", "The 4 multiplies the amplitude; the −1 shifts everything down."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`The graph of $y = f(-x)$ is the reflection of $y = f(x)$ in the $x$-axis.`,
    answer: false,
    explanation: t`False. Replacing $x$ by $-x$ reflects the graph in the $y$-axis. The reflection in the $x$-axis is $y = -f(x)$.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false, applies: ZP,
    stem: t`No part of the graph of $y = |f(x)|$ lies below the $x$-axis.`,
    answer: true,
    explanation: t`True. $|f(x)| \geq 0$ for every $x$, because the parts of $y = f(x)$ below the axis are reflected upwards.`,
  });

  // |x² − 6x + 5| = 3: vertex (3, −4) -> local max 4 at x = 3 -> 4 solutions
  chk(countRoots((x) => Math.abs(x * x - 6 * x + 5), 3), 4);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false, applies: ZP,
    stem: t`By considering the graph of $y = |x^{2} - 6x + 5|$, find the number of real solutions of the equation $|x^{2} - 6x + 5| = 3$.`,
    value: 4, wrong: [2, 3],
    explanation: t`$x^{2} - 6x + 5 = (x - 3)^{2} - 4$ has vertex $(3, -4)$ and roots $1$ and $5$. In $y = |x^{2} - 6x + 5|$ the vertex becomes a local maximum $(3, 4)$. The line $y = 3$ is below 4, so it meets the reflected arch twice and the outer arms twice: 4 solutions.`,
    hints: ["Find the vertex of x² − 6x + 5 and reflect it.", "Compare the height of the line y = 3 with the local maximum."],
  });

  same(quad.completeSquare(1, -2, -8).vertex, [1, -9]);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false, applies: ZP,
    stem: t`Find the $y$-coordinate of the local maximum point of the curve $y = |x^{2} - 2x - 8|$.`,
    value: 9, wrong: [-9, 8],
    explanation: t`$x^{2} - 2x - 8 = (x - 1)^{2} - 9$, with minimum point $(1, -9)$ below the axis. Taking the modulus reflects it to the local maximum $(1, 9)$.`,
    hints: ["Complete the square to find the vertex of the parabola."],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`Match each equation with the transformation that maps $y = f(x)$ onto it.`,
    pairs: [
      [t`$y = -f(x)$`, t`reflection in the $x$-axis`],
      [t`$y = f(-x)$`, t`reflection in the $y$-axis`],
      [t`$y = 4f(x)$`, t`stretch, scale factor 4, parallel to the $y$-axis`],
      [t`$y = f(x + 4)$`, t`translation by $\begin{pmatrix} -4 \\ 0 \end{pmatrix}$`],
    ],
    explanation: "Outside changes act on y as they look; inside changes act on x in reverse.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2, calculator: false,
    stem: t`Describe fully two transformations which, applied in turn, map the graph of $y = x^{2}$ onto the graph of $y = 3(x - 1)^{2}$.`,
    points: [t`A stretch, scale factor 3, parallel to the $y$-axis`, t`A translation by $\begin{pmatrix} 1 \\ 0 \end{pmatrix}$ (1 unit in the positive $x$-direction)`],
    modelAnswer: "Stretch with scale factor 3 parallel to the y-axis (giving y = 3x²), then translation by the vector (1, 0) (giving y = 3(x − 1)²). The two can be done in either order here.",
    explanation: t`$3x^{2}$ is a vertical stretch of $x^{2}$; replacing $x$ by $x - 1$ moves the graph 1 unit right. The vertex moves from $(0, 0)$ to $(1, 0)$.`,
    hints: ["Each transformation needs its type and its vector or scale factor and direction."],
  });

  b.struct({
    examStyle: true, d: 4, skill: "APPLICATION", calculator: false,
    stem: t`The curve $y = f(x)$ has a minimum point at $(2, -3)$ and crosses the $y$-axis at $(0, 5)$.`,
    parts: [
      P.fib({
        label: "(a)", marks: 1, stem: t`State the coordinates of the minimum point of $y = f(x) + 4$.`,
        template: "({{blank:x}}, {{blank:y}})",
        blanks: [{ id: "x", input: "number", accepted: [2], wrong: 6 }, { id: "y", input: "number", accepted: [1], wrong: -3 }],
        explanation: "Up 4: (2, 1).",
      }),
      P.fib({
        label: "(b)", marks: 1, stem: t`State the coordinates of the minimum point of $y = f(x - 1)$.`,
        template: "({{blank:x}}, {{blank:y}})",
        blanks: [{ id: "x", input: "number", accepted: [3], wrong: 1 }, { id: "y", input: "number", accepted: [-3], wrong: -4 }],
        explanation: "Right 1: (3, −3).",
      }),
      P.fib({
        label: "(c)", marks: 1, stem: t`State the coordinates of the minimum point of $y = f(2x)$.`,
        template: "({{blank:x}}, {{blank:y}})",
        blanks: [{ id: "x", input: "number", accepted: [1], wrong: 4 }, { id: "y", input: "number", accepted: [-3], wrong: -6 }],
        explanation: t`Stretch factor $\frac{1}{2}$ parallel to the $x$-axis: $(1, -3)$.`,
      }),
      P.fib({
        label: "(d)", marks: 1, stem: t`State where $y = 2f(x)$ crosses the $y$-axis.`,
        template: "(0, {{blank:y}})",
        blanks: [{ id: "y", input: "number", accepted: [10], wrong: 5 }],
        explanation: "y-values double: (0, 10).",
      }),
      P.mcq({
        label: "(e)", marks: 1, stem: t`Which point is a stationary point of $y = -f(x)$?`,
        options: [
          [t`A maximum at $(2, 3)$`, "Correct: reflection in the x-axis turns the minimum into a maximum."],
          [t`A minimum at $(2, 3)$`, "Reflection in the x-axis turns a minimum upside down."],
          [t`A maximum at $(-2, -3)$`, t`That would be $y = f(-x)$ followed by a change of type; only $y$ changes sign.`],
          [t`A minimum at $(-2, -3)$`, t`$y = -f(x)$ keeps the $x$-coordinate.`],
        ],
        answer: "A",
        explanation: t`$y = -f(x)$ changes the sign of $y$ and turns the minimum $(2, -3)$ into a maximum $(2, 3)$.`,
      }),
    ],
    explanation: "Track the key points: outside changes act on y, inside changes act on x in reverse, and a reflection in the x-axis swaps maxima and minima.",
    hints: ["Apply each transformation to the coordinates of the given points."],
  });

  same(quad.roots(1, -4, -5), [-1, 5]);
  same(quad.completeSquare(1, -4, -5).vertex, [2, -9]);
  for (const k of [0.5, 4, 8.9]) chk(countRoots((x) => Math.abs(x * x - 4 * x - 5), k), 4);
  chk(countRoots((x) => Math.abs(x * x - 4 * x - 5), 9.5), 2);
  b.struct({
    examStyle: true, d: 5, skill: "ANALYSIS", calculator: false, applies: ZP,
    stem: t`Consider the graph of $y = |x^{2} - 4x - 5|$.`,
    parts: [
      P.fib({
        label: "(a)", marks: 1, stem: t`State the $x$-coordinates where the graph meets the $x$-axis.`,
        template: "x = {{blank:a}} and x = {{blank:b}} (smaller first)",
        blanks: [{ id: "a", input: "number", accepted: [-1], wrong: 1 }, { id: "b", input: "number", accepted: [5], wrong: -5 }],
        explanation: t`$x^{2} - 4x - 5 = (x - 5)(x + 1)$.`,
      }),
      P.fib({
        label: "(b)", marks: 2, stem: "Find the coordinates of the local maximum point.",
        template: "({{blank:x}}, {{blank:y}})",
        blanks: [{ id: "x", input: "number", accepted: [2], wrong: -2 }, { id: "y", input: "number", accepted: [9], wrong: -9 }],
        explanation: t`$(x - 2)^{2} - 9$ has vertex $(2, -9)$, which the modulus reflects to $(2, 9)$.`,
      }),
      P.fib({
        label: "(c)", marks: 2, stem: t`Find the set of values of $k$ for which $|x^{2} - 4x - 5| = k$ has exactly four real solutions.`,
        template: "{{blank:a}} < k < {{blank:b}}",
        blanks: [{ id: "a", input: "number", accepted: [0], wrong: -9 }, { id: "b", input: "number", accepted: [9], wrong: 5 }],
        explanation: t`A horizontal line $y = k$ meets the W-shaped graph four times when it is above the axis and below the local maximum: $0 < k < 9$. ($k = 9$ gives three solutions, $k = 0$ two.)`,
      }),
    ],
    explanation: t`$y = |(x - 2)^{2} - 9|$ touches the axis at $x = -1$ and $x = 5$ and has a local maximum $(2, 9)$, so $y = k$ cuts it four times exactly when $0 < k < 9$.`,
    hints: ["Sketch y = x² − 4x − 5 first.", "Slide a horizontal line up from y = 0."],
  });

  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Which sequence of transformations maps $y = f(x)$ onto $y = f(2x - 6)$?`,
    options: [
      [t`Stretch, factor $\frac{1}{2}$, parallel to the $x$-axis, then translation by $\begin{pmatrix} 3 \\ 0 \end{pmatrix}$`, t`Correct: $f(2x - 6) = f\big(2(x - 3)\big)$.`],
      [t`Stretch, factor $\frac{1}{2}$, parallel to the $x$-axis, then translation by $\begin{pmatrix} 6 \\ 0 \end{pmatrix}$`, "After the stretch the shift is 6 ÷ 2 = 3 units."],
      [t`Stretch, factor 2, parallel to the $x$-axis, then translation by $\begin{pmatrix} 3 \\ 0 \end{pmatrix}$`, t`$f(2x)$ squashes by factor $\frac{1}{2}$.`],
      [t`Stretch, factor $\frac{1}{2}$, parallel to the $x$-axis, then translation by $\begin{pmatrix} -3 \\ 0 \end{pmatrix}$`, "x − 3 moves the graph right, not left."],
    ],
    answer: "A",
    explanation: t`Factorise the inside: $f(2x - 6) = f\big(2(x - 3)\big)$. Starting from $y = f(2x)$ (stretch factor $\frac{1}{2}$), replacing $x$ by $x - 3$ translates 3 units right. Check: the point $(a, b)$ on $y = f(x)$ goes to $\left(\frac{a}{2} + 3, b\right)$, and $2\left(\frac{a}{2} + 3\right) - 6 = a$.`,
    hints: ["Take out the factor 2 inside the bracket."],
  });

  b.card("FACT", t`$y = f(x) + a$`, t`Translation by $\begin{pmatrix} 0 \\ a \end{pmatrix}$.`);
  b.card("FACT", t`$y = f(x + a)$`, t`Translation by $\begin{pmatrix} -a \\ 0 \end{pmatrix}$ (inside changes act in reverse).`);
  b.card("FACT", t`$y = af(x)$`, t`Stretch, scale factor $a$, parallel to the $y$-axis.`);
  b.card("FACT", t`$y = f(ax)$`, t`Stretch, scale factor $\frac{1}{a}$, parallel to the $x$-axis.`);
  b.card("FACT", t`$y = -f(x)$ and $y = f(-x)$`, t`$-f(x)$: reflection in the $x$-axis. $f(-x)$: reflection in the $y$-axis.`);
  b.card("CONCEPT", t`How to sketch $y = |f(x)|$ (ZIMSEC)`, t`Sketch $y = f(x)$, then reflect every part below the $x$-axis in the $x$-axis; a minimum below the axis becomes a local maximum.`, undefined, { applies: ZP });
  b.card("CONCEPT", "How do you check a combination of transformations?", "Track one key point (vertex, intercept, maximum) through each step and substitute it into the new equation.");
  b.card("CONCEPT", t`Transformations of $y = f(2x - 6)$`, t`Write $f\big(2(x - 3)\big)$: stretch factor $\frac{1}{2}$ parallel to the $x$-axis, then translation $\begin{pmatrix} 3 \\ 0 \end{pmatrix}$.`);
});
