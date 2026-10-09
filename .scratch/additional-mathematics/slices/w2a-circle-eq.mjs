// W2a: amath.circle.equation (Cambridge only)
import { concept, P, t, chk, same } from "../lib.mjs";

const fromExpanded = (D, E, F) => ({ a: -D / 2, b: -E / 2, r2: (D * D + E * E) / 4 - F });
const on = ([a, b], [x, y]) => (x - a) ** 2 + (y - b) ** 2;

concept("amath.circle.equation", { file: "circle/equation", keyPrefix: "circle.equation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`State the centre and radius of the circle $(x - 4)^2 + (y + 1)^2 = 9$.`,
    options: [
      [t`centre $(4, -1)$, radius 3`, t`Correct: compare with $(x - a)^2 + (y - b)^2 = r^2$.`],
      [t`centre $(-4, 1)$, radius 3`, t`The signs of the centre are reversed: $x - 4$ means $a = 4$.`],
      [t`centre $(4, -1)$, radius 9`, t`9 is $r^2$; the radius is $\sqrt{9} = 3$.`],
      [t`centre $(4, 1)$, radius 3`, t`$y + 1 = y - (-1)$, so $b = -1$.`],
    ],
    answer: "A",
    explanation: t`$(x - 4)^2 + (y - (-1))^2 = 3^2$: centre $(4, -1)$, radius 3.`,
  });

  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`The circle with centre $(-2, 5)$ and radius 4 has equation $(x + p)^2 + (y + q)^2 = k$. Find $p$, $q$ and $k$.`,
    template: "p = {{blank:p}}, q = {{blank:q}}, k = {{blank:k}}",
    blanks: [
      { id: "p", input: "number", accepted: [2], wrong: "-2" },
      { id: "q", input: "number", accepted: [-5], wrong: "5" },
      { id: "k", input: "number", accepted: [16], wrong: "4" },
    ],
    explanation: t`$(x - (-2))^2 + (y - 5)^2 = 4^2$, that is $(x + 2)^2 + (y - 5)^2 = 16$: $p = 2$, $q = -5$, $k = 16$.`,
  });

  same(fromExpanded(-6, 2, -15), { a: 3, b: -1, r2: 25 });
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Find the radius of the circle $x^2 + y^2 - 6x + 2y - 15 = 0$.`,
    value: 5, wrong: [25, Math.sqrt(15)],
    explanation: t`$(x - 3)^2 - 9 + (y + 1)^2 - 1 = 15$, so $(x - 3)^2 + (y + 1)^2 = 25$ and $r = 5$.`,
  });

  same(fromExpanded(10, -4, -7), { a: -5, b: 2, r2: 36 });
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the centre and radius of the circle $x^2 + y^2 + 10x - 4y - 7 = 0$.`,
    template: "centre ({{blank:a}}, {{blank:b}}), radius {{blank:r}}",
    blanks: [
      { id: "a", input: "number", accepted: [-5], wrong: "5" },
      { id: "b", input: "number", accepted: [2], wrong: "-2" },
      { id: "r", input: "number", accepted: [6], wrong: "36" },
    ],
    explanation: t`$(x + 5)^2 - 25 + (y - 2)^2 - 4 = 7$, so $(x + 5)^2 + (y - 2)^2 = 36$: centre $(-5, 2)$, radius 6.`,
    hints: ["Complete the square in x and in y separately.", "Move every constant to the right-hand side."],
  });

  b.tf({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`The point $(1, -2)$ lies on the circle $x^2 + y^2 = 5$.`,
    answer: true,
    explanation: t`True: $1^2 + (-2)^2 = 1 + 4 = 5$.`,
  });

  chk(on([1, 1], [3, 4]), 13);
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Where does the point $(3, 4)$ lie relative to the circle $(x - 1)^2 + (y - 1)^2 = 10$?`,
    options: [
      ["outside the circle", t`Correct: $2^2 + 3^2 = 13 > 10$.`],
      ["inside the circle", t`Inside needs a value less than 10; here it is 13.`],
      ["on the circle", t`On the circle needs exactly 10; here it is 13.`],
      ["at the centre of the circle", t`The centre is $(1, 1)$.`],
    ],
    answer: "A",
    explanation: t`$(3 - 1)^2 + (4 - 1)^2 = 4 + 9 = 13$, which is greater than $r^2 = 10$, so the point is outside.`,
  });

  same([(-3 + 5) / 2, (2 + 8) / 2], [1, 5]);
  chk(on([1, 5], [5, 8]), 25);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The points $(-3, 2)$ and $(5, 8)$ are the ends of a diameter of a circle. Its equation is $(x - a)^2 + (y - b)^2 = k$. Find $a$, $b$ and $k$.`,
    template: "a = {{blank:a}}, b = {{blank:b}}, k = {{blank:k}}",
    blanks: [
      { id: "a", input: "number", accepted: [1], wrong: "4" },
      { id: "b", input: "number", accepted: [5], wrong: "3" },
      { id: "k", input: "number", accepted: [25], wrong: "100" },
    ],
    explanation: t`Centre = midpoint $(1, 5)$. Diameter $= \sqrt{8^2 + 6^2} = 10$, so $r = 5$ and $k = 25$. (Using the diameter as the radius gives 100.)`,
    hints: ["The centre is the midpoint of the diameter.", "The radius is half the diameter."],
  });

  chk(Math.sqrt(on([2, -3], [-4, 5])), 10);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`A circle has centre $(2, -3)$ and passes through $(-4, 5)$. Find its radius.`,
    value: 10, wrong: [100, 5],
    explanation: t`$r = \sqrt{(-4 - 2)^2 + (5 + 3)^2} = \sqrt{36 + 64} = 10$.`,
    hints: ["The radius is the distance from the centre to any point on the circle."],
  });

  same(fromExpanded(2, -8, 8), { a: -1, b: 4, r2: 9 });
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The circle with centre $(-1, 4)$ and radius 3 has equation $x^2 + y^2 + px + qy + c = 0$. Find $p$, $q$ and $c$.`,
    template: "p = {{blank:p}}, q = {{blank:q}}, c = {{blank:c}}",
    blanks: [
      { id: "p", input: "number", accepted: [2], wrong: "-2" },
      { id: "q", input: "number", accepted: [-8], wrong: "8" },
      { id: "c", input: "number", accepted: [8], wrong: "-9" },
    ],
    explanation: t`$(x + 1)^2 + (y - 4)^2 = 9$ expands to $x^2 + 2x + 1 + y^2 - 8y + 16 = 9$, so $x^2 + y^2 + 2x - 8y + 8 = 0$.`,
    hints: ["Expand both brackets and collect the constants."],
  });

  chk(fromExpanded(4, -6, 20).r2, -7);
  for (const [D, E, F] of [[4, -6, 12], [-2, 0, -3], [0, 8, 7]]) chk(Math.sign(fromExpanded(D, E, F).r2), 1);
  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: "Which of these equations does NOT represent a circle?",
    options: [
      [t`$x^2 + y^2 + 4x - 6y + 20 = 0$`, t`Correct: completing the square gives $(x + 2)^2 + (y - 3)^2 = -7$, and $r^2$ cannot be negative.`],
      [t`$x^2 + y^2 + 4x - 6y + 12 = 0$`, t`$r^2 = 4 + 9 - 12 = 1$: a circle of radius 1.`],
      [t`$x^2 + y^2 - 2x - 3 = 0$`, t`$r^2 = 1 + 0 + 3 = 4$: a circle of radius 2.`],
      [t`$x^2 + y^2 + 8y + 7 = 0$`, t`$r^2 = 0 + 16 - 7 = 9$: a circle of radius 3.`],
    ],
    answer: "A",
    explanation: t`For $x^2 + y^2 + 2gx + 2fy + c = 0$, $r^2 = g^2 + f^2 - c$. For the first equation $r^2 = 4 + 9 - 20 = -7 < 0$, so no real circle exists.`,
    hints: [t`Work out $g^2 + f^2 - c$ for each.`],
  });

  chk(on([2, -1], [5, 3]), 25);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The point $(k, 3)$, where $k > 2$, lies on the circle $(x - 2)^2 + (y + 1)^2 = 25$. Find $k$.`,
    value: 5, prefix: "k =", wrong: [-1, 7],
    explanation: t`$(k - 2)^2 + 16 = 25$, so $(k - 2)^2 = 9$, $k - 2 = \pm 3$, $k = 5$ or $k = -1$. Since $k > 2$, $k = 5$.`,
    hints: [t`Substitute $y = 3$ and solve for $k$.`],
  });

  same(fromExpanded(0, 6, 0), { a: -0, b: -3, r2: 9 });
  same(fromExpanded(6, -8, 0), { a: -3, b: 4, r2: 25 });
  same(fromExpanded(-8, 6, 0), { a: 4, b: -3, r2: 25 });
  b.match({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "Match each circle with its centre.",
    pairs: [
      [t`$(x - 3)^2 + y^2 = 4$`, t`$(3, 0)$`],
      [t`$x^2 + y^2 + 6y = 0$`, t`$(0, -3)$`],
      [t`$x^2 + y^2 + 6x - 8y = 0$`, t`$(-3, 4)$`],
      [t`$x^2 + y^2 - 8x + 6y = 0$`, t`$(4, -3)$`],
    ],
    explanation: t`For $x^2 + y^2 + 2gx + 2fy + c = 0$ the centre is $(-g, -f)$: halve the coefficients of $x$ and $y$ and change their signs.`,
  });

  same(fromExpanded(-4, 6, -12), { a: 2, b: -3, r2: 25 });
  b.num({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`The circle $x^2 + y^2 - 4x + 6y + k = 0$ has radius 5. Find the value of $k$.`,
    value: -12, prefix: "k =", wrong: [12, -38],
    explanation: t`$(x - 2)^2 + (y + 3)^2 = 4 + 9 - k = 13 - k$. Radius 5 means $13 - k = 25$, so $k = -12$.`,
    hints: [t`Complete the square, then set the right-hand side equal to $5^2$.`],
  });

  for (const pt of [[2, 0], [8, 0]]) chk(on([5, 5], pt), 34);
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`A circle passes through $(2, 0)$ and $(8, 0)$, and its centre lies on the line $y = x$. Its equation is $(x - a)^2 + (y - b)^2 = k$. Find $a$, $b$ and $k$.`,
    template: "a = {{blank:a}}, b = {{blank:b}}, k = {{blank:k}}",
    blanks: [
      { id: "a", input: "number", accepted: [5], wrong: "4" },
      { id: "b", input: "number", accepted: [5], wrong: "0" },
      { id: "k", input: "number", accepted: [34], wrong: "9" },
    ],
    explanation: t`The centre is on the perpendicular bisector of the chord, $x = 5$, and on $y = x$, so it is $(5, 5)$. Then $r^2 = (5 - 2)^2 + (5 - 0)^2 = 9 + 25 = 34$.`,
    hints: ["The perpendicular bisector of a chord passes through the centre."],
  });

  chk(on([3, -1], [7, 2]), 25); chk(on([3, -1], [-2, -1]), 25);
  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 3,
    stem: t`A circle has centre $(3, -1)$ and passes through $(7, 2)$. Show that it also passes through $(-2, -1)$.`,
    points: [
      t`M1 finds $r^2 = (7 - 3)^2 + (2 + 1)^2 = 25$.`,
      t`M1 writes the equation $(x - 3)^2 + (y + 1)^2 = 25$ (or finds the distance from the centre to $(-2, -1)$).`,
      t`A1 shows $(-2 - 3)^2 + (-1 + 1)^2 = 25$ and concludes that the point lies on the circle.`,
    ],
    modelAnswer: t`$$
r^2 = (7 - 3)^2 + (2 - (-1))^2 = 16 + 9 = 25
$$

The circle is $(x - 3)^2 + (y + 1)^2 = 25$. At $(-2, -1)$:

$$
(-2 - 3)^2 + (-1 + 1)^2 = 25 + 0 = 25
$$

so $(-2, -1)$ lies on the circle.`,
    explanation: "Find r² from the known point, then substitute the new point.",
    hints: ["Find the equation of the circle first."],
  });

  {
    const c = fromExpanded(-8, 2, 8);
    same(c, { a: 4, b: -1, r2: 9 });
    chk(on([4, -1], [4, 2]), 9);
    same([2 * 4 - 4, 2 * -1 - 2], [4, -4]);
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
      stem: t`The circle $C$ has equation $x^2 + y^2 - 8x + 2y + 8 = 0$.`,
      parts: [
        P.fib({ label: "(a)", marks: 3, stem: t`Find the centre and the radius of $C$.`, template: "centre ({{blank:a}}, {{blank:b}}), radius {{blank:r}}",
          blanks: [{ id: "a", input: "number", accepted: [4], wrong: "-4" }, { id: "b", input: "number", accepted: [-1], wrong: "1" }, { id: "r", input: "number", accepted: [3], wrong: "9" }],
          explanation: t`$(x - 4)^2 - 16 + (y + 1)^2 - 1 + 8 = 0$, so $(x - 4)^2 + (y + 1)^2 = 9$: centre $(4, -1)$, radius 3.` }),
        P.proof({ label: "(b)", marks: 1, stem: t`Show that the point $P(4, 2)$ lies on $C$.`,
          points: [t`B1 substitutes: $(4 - 4)^2 + (2 + 1)^2 = 9$ (or $16 + 4 - 32 + 4 + 8 = 0$) and concludes.`],
          modelAnswer: t`$$
(4 - 4)^2 + (2 + 1)^2 = 0 + 9 = 9 = r^2
$$

so $P$ lies on $C$.`,
          explanation: "Substitute the coordinates into the equation." }),
        P.fib({ label: "(c)", marks: 2, stem: t`$PQ$ is a diameter of $C$. Find the coordinates of $Q$.`, template: "Q({{blank:x}}, {{blank:y}})",
          blanks: [{ id: "x", input: "number", accepted: [4], wrong: "-4" }, { id: "y", input: "number", accepted: [-4], wrong: "0.5" }],
          explanation: t`The centre $(4, -1)$ is the midpoint of $PQ$: $Q = (2 \times 4 - 4, 2 \times (-1) - 2) = (4, -4)$.` }),
      ],
      explanation: "Complete the square for the centre and radius; the centre is the midpoint of any diameter.",
      hints: [t`$x^2 - 8x = (x - 4)^2 - 16$.`, "For (c), go from P to the centre, then the same step again."],
    });
  }

  {
    const A = [1, 2], B = [7, 2], C = [5, 6];
    same([(B[0] + C[0]) / 2, (B[1] + C[1]) / 2], [6, 4]);
    chk((C[1] - B[1]) / (C[0] - B[0]), -2);
    chk(0.5 * 4 + 1, 3);
    for (const pt of [A, B, C]) chk(on([4, 3], pt), 10);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
      stem: t`A circle passes through the points $A(1, 2)$, $B(7, 2)$ and $C(5, 6)$.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: t`The perpendicular bisector of $AB$ has equation $x = h$. Find $h$.`, value: 4, prefix: "h =", wrong: [3], explanation: t`$AB$ is horizontal with midpoint $(4, 2)$, so its perpendicular bisector is $x = 4$.` }),
        P.fib({ label: "(b)", marks: 2, stem: t`Find the equation of the perpendicular bisector of $BC$ in the form $y = mx + c$.`, template: "m = {{blank:m}}, c = {{blank:c}}",
          blanks: [{ id: "m", input: "number", accepted: [0.5], wrong: "-2" }, { id: "c", input: "number", accepted: [1], wrong: "16" }],
          explanation: t`Midpoint of $BC$: $(6, 4)$. Gradient of $BC = \frac{6 - 2}{5 - 7} = -2$, so the bisector has gradient $\frac{1}{2}$: $y - 4 = \frac{1}{2}(x - 6)$, $y = \frac{1}{2}x + 1$.` }),
        P.fib({ label: "(c)", marks: 2, stem: t`Hence find the centre of the circle.`, template: "({{blank:x}}, {{blank:y}})",
          blanks: [{ id: "x", input: "number", accepted: [4], wrong: "6" }, { id: "y", input: "number", accepted: [3], wrong: "4" }],
          explanation: t`Both bisectors pass through the centre: $x = 4$ gives $y = \frac{1}{2}(4) + 1 = 3$. Centre $(4, 3)$.` }),
        P.num({ label: "(d)", marks: 2, stem: t`The equation of the circle is $(x - 4)^2 + (y - 3)^2 = k$. Find $k$.`, value: 10, prefix: "k =", wrong: [Math.sqrt(10)],
          explanation: t`$k = r^2 = (1 - 4)^2 + (2 - 3)^2 = 9 + 1 = 10$. Check with $C$: $1 + 9 = 10$.` }),
      ],
      explanation: "The centre of a circle lies on the perpendicular bisector of every chord; two bisectors fix it.",
      hints: ["A horizontal chord has a vertical perpendicular bisector.", "Substitute x = 4 into the second bisector."],
    });
  }

  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Which is the equation of the circle with centre $(0, -3)$ and radius 2?`,
    options: [
      [t`$x^2 + (y + 3)^2 = 4$`, t`Correct: $(x - 0)^2 + (y - (-3))^2 = 2^2$.`],
      [t`$x^2 + (y - 3)^2 = 4$`, t`This has centre $(0, 3)$: the sign of $b$ is reversed.`],
      [t`$x^2 + (y + 3)^2 = 2$`, t`The right-hand side is $r^2 = 4$, not $r$.`],
      [t`$(x + 3)^2 + y^2 = 4$`, t`This has centre $(-3, 0)$: the coordinates are swapped.`],
    ],
    answer: "A",
    explanation: t`$(x - a)^2 + (y - b)^2 = r^2$ with $a = 0$, $b = -3$, $r = 2$ gives $x^2 + (y + 3)^2 = 4$.`,
  });

  b.card("FORMULA", "Circle with centre (a, b), radius r", t`$(x - a)^2 + (y - b)^2 = r^2$ (in the List of formulas)`);
  b.card("FORMULA", t`Centre and radius of $x^2 + y^2 + 2gx + 2fy + c = 0$`, t`Centre $(-g, -f)$, radius $\sqrt{g^2 + f^2 - c}$.`);
  b.card("CONCEPT", "Finding the centre and radius", "Complete the square in x and in y separately.");
  b.card("CONCEPT", "Circle from the ends of a diameter", "Centre = midpoint; radius = half the length of the diameter.");
  b.card("CONCEPT", "Circle through three points", "The centre is where the perpendicular bisectors of two chords meet.");
  b.card("CONCEPT", "Inside, on or outside", t`Compare $(x - a)^2 + (y - b)^2$ with $r^2$: less = inside, equal = on, greater = outside.`);
  b.card("FACT", "When is an expanded equation a circle?", t`Equal coefficients of $x^2$ and $y^2$, no $xy$ term, and $g^2 + f^2 - c > 0$.`);
  b.card("FACT", "Right angle in a semicircle", "If angle BAC = 90°, then BC is a diameter of the circle through A, B and C.");
  b.card("DEFINITION", "Circle", "The set of points at a fixed distance (radius) from a fixed point (centre).");
});
