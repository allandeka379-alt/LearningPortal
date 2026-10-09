// W2a exam-format items: ZIMSEC Paper 1 (Section A 13 marks, Section B 12 marks) on logarithms and straight lines, and
// Cambridge 0606 Paper 1 (8 marks, no calculator) and Paper 2 (10 marks, calculator) on logarithms, straight lines,
// the linear law, circles and circular measure. Every value is computed and checked below.
import { concept, P, t, chk, same, quad, lg, ln, logb, sfStr, table, ZIM, CAM } from "../lib.mjs";

const Q = (k) => `amath.${k}`;
const dist = ([x1, y1], [x2, y2]) => Math.hypot(x2 - x1, y2 - y1);
const grad = ([x1, y1], [x2, y2]) => (y2 - y1) / (x2 - x1);
const on = ([a, b], [x, y]) => (x - a) ** 2 + (y - b) ** 2;
const fixed = (x, n) => Number(x.toFixed(n));

// ---------------------------------------------------------------------------------------------------------------------
concept(Q("logs.laws"), { file: "exam/w2a-zimsec", keyPrefix: "exam.w2a-zimsec", applies: ZIM }, (b) => {
  // Z1 (13, Section A): logarithms
  {
    chk(logb(2, 48) - logb(2, 3), 4);
    const xb = (lg(20) / lg(3) + 1) / 2;
    chk(3 ** (2 * xb - 1), 20, 1e-9);
    same(quad.roots(1, 0, -25), [-5, 5]);
    chk(logb(3, 5 + 4) + logb(3, 5 - 4), 2);
    const l35 = 0.8451 - 0.301, l140 = 0.301 + 0.8451 + 1;
    chk(l35, 0.5441, 1e-12); chk(l140, 2.1461, 1e-12);
    chk(Math.abs(lg(3.5) - l35) < 0.0005 ? 1 : 0, 1); chk(Math.abs(lg(140) - l140) < 0.0005 ? 1 : 0, 1);
    b.struct({
      d: 4, marks: 13, secs: 90 * 13, skill: "APPLICATION", examStyle: true, calculator: true, paper: "Paper 1",
      concepts: [Q("logs.laws"), Q("logs.equations")],
      stem: t`In this question $\log$ means $\log_{10}$ unless another base is shown.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: t`Without using a calculator, evaluate $\log_2 48 - \log_2 3$.`, value: 4, wrong: [16, 45],
          explanation: t`$\log_2 \frac{48}{3} = \log_2 16 = 4$.` }),
        P.num({ label: "(b)", marks: 3, stem: t`Solve the equation $3^{2x - 1} = 20$, giving $x$ correct to 3 significant figures.`, value: xb, prefix: "x =", wrong: [sfStr((lg(20) / lg(3) - 1) / 2)],
          explanation: t`$(2x - 1)\log 3 = \log 20$, so $2x - 1 = \frac{\log 20}{\log 3} = 2.7268$, $2x = 3.7268$ and $x = ${sfStr(xb)}$ (3 s.f.).` }),
        P.group({ label: "(c)", stem: t`Consider the equation $\log_3 (x + 4) + \log_3 (x - 4) = 2$.`, parts: [
          P.num({ label: "(i)", marks: 3, stem: "Solve the equation.", value: 5, prefix: "x =", wrong: [-5],
            explanation: t`$\log_3 [(x + 4)(x - 4)] = 2$, so $x^2 - 16 = 9$, $x^2 = 25$ and $x = \pm 5$. Only $x = 5$ is valid.` }),
          P.manual({ label: "(ii)", marks: 1, stem: t`Explain why $x = -5$ is not a solution.`,
            points: [t`States that $x = -5$ gives $\log_3(-1)$ and $\log_3(-9)$, logarithms of negative numbers, which are undefined.`],
            modelAnswer: t`At $x = -5$, $x + 4 = -1$ and $x - 4 = -9$; logarithms of negative numbers are not defined, so $x = -5$ is rejected.`,
            explanation: "A logarithm needs a positive argument." }),
        ] }),
        P.group({ label: "(d)", stem: t`Given that $\log 2 = 0.3010$ and $\log 7 = 0.8451$, find, without using the log key on a calculator, correct to 3 decimal places,`, parts: [
          P.num({ label: "(i)", marks: 2, stem: t`$\log 3.5$,`, value: l35, dp: 3, wrong: [0.1761],
            explanation: t`$3.5 = \frac{7}{2}$: $\log 3.5 = 0.8451 - 0.3010 = 0.5441 = 0.544$ (3 d.p.).` }),
          P.num({ label: "(ii)", marks: 2, stem: t`$\log 140$.`, value: l140, dp: 3, wrong: [1.1461],
            explanation: t`$140 = 2 \times 7 \times 10$: $\log 140 = 0.3010 + 0.8451 + 1 = 2.1461 = 2.146$ (3 d.p.).` }),
        ] }),
      ],
      explanation: "Combine logarithms with the laws, take logarithms to bring an index down, check that every logarithm is defined, and build logarithms of other numbers from known ones.",
      hints: ["Quotient law for (a).", t`For (c), $(x + 4)(x - 4) = 3^2$.`, t`For (d)(ii), $\log 10 = 1$.`],
    });
  }

  // Z2 (13, Section A): straight lines and the normal
  {
    const A = [-3, 4], B = [5, 0], C = [3, 6], D = [1, 2];
    chk(grad(A, B), -0.5);
    chk(A[0] + 2 * A[1], 5); chk(B[0] + 2 * B[1], 5); chk(D[0] + 2 * D[1], 5);
    chk(grad(A, B) * 2, -1); chk(2 * C[0], C[1]); chk(2 * D[0], D[1]);
    chk(dist(C, D), 2 * Math.sqrt(5)); chk(dist(A, B), 4 * Math.sqrt(5));
    const area = 0.5 * dist(A, B) * dist(C, D);
    chk(area, 20);
    b.struct({
      d: 4, marks: 13, secs: 90 * 13, skill: "APPLICATION", examStyle: true, calculator: false, paper: "Paper 1",
      concepts: [Q("coordinate.parallel-perpendicular"), Q("coordinate.lines")],
      stem: t`The points $A(-3, 4)$, $B(5, 0)$ and $C(3, 6)$ are the vertices of a triangle.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: t`Find the gradient of $AB$.`, value: -0.5, wrong: [-2, 0.5], explanation: t`$\frac{0 - 4}{5 - (-3)} = -\frac{4}{8} = -\frac{1}{2}$.` }),
        P.num({ label: "(b)", marks: 2, stem: t`The equation of $AB$ can be written as $x + 2y = k$. Find $k$.`, value: 5, prefix: "k =", wrong: [-5, 2.5],
          explanation: t`$y - 0 = -\frac{1}{2}(x - 5)$, so $2y = -x + 5$ and $x + 2y = 5$.` }),
        P.fib({ label: "(c)", marks: 2, stem: t`Find the equation of the normal to $AB$ that passes through $C$, in the form $y = mx + c$.`, template: "m = {{blank:m}}, c = {{blank:c}}",
          blanks: [{ id: "m", input: "number", accepted: [2], wrong: "-0.5" }, { id: "c", input: "number", accepted: [0], wrong: "7.5" }],
          explanation: t`Perpendicular gradient: $-1 \div \left(-\frac{1}{2}\right) = 2$. $y - 6 = 2(x - 3)$, so $y = 2x$.` }),
        P.fib({ label: "(d)", marks: 3, stem: t`The normal meets $AB$ at $D$. Find the coordinates of $D$.`, template: "D({{blank:x}}, {{blank:y}})",
          blanks: [{ id: "x", input: "number", accepted: [1], wrong: "3" }, { id: "y", input: "number", accepted: [2], wrong: "6" }],
          explanation: t`Substitute $y = 2x$ into $x + 2y = 5$: $5x = 5$, so $x = 1$ and $y = 2$.` }),
        P.fib({ label: "(e)", marks: 2, stem: t`Find the length of $CD$ in the form $p\sqrt{5}$.`, template: "p = {{blank:p}}",
          blanks: [{ id: "p", input: "number", accepted: [2], wrong: "4" }],
          explanation: t`$CD = \sqrt{(3 - 1)^2 + (6 - 2)^2} = \sqrt{20} = 2\sqrt{5}$.` }),
        P.num({ label: "(f)", marks: 3, stem: t`Find the area of triangle $ABC$.`, value: area, unit: "units²", wrong: [40, 10],
          explanation: t`$AB = \sqrt{8^2 + 4^2} = \sqrt{80} = 4\sqrt{5}$, and $CD$ is the perpendicular height. Area $= \frac{1}{2} \times 4\sqrt{5} \times 2\sqrt{5} = 20$.` }),
      ],
      explanation: "A normal is perpendicular to the line; its foot D gives the perpendicular height CD of the triangle on base AB.",
      hints: ["Perpendicular gradients multiply to −1.", "Solve the two line equations simultaneously for D.", "Area = ½ × base AB × height CD."],
    });
  }

  // Z3 (12, Section B): change of base and simultaneous logarithmic equations
  {
    const x = 27, y = 9;
    chk(logb(3, x) - logb(9, y), 2); chk(x * y, 243); chk(x, 9 * Math.sqrt(y));
    for (const v of [5, 0.4, 30]) chk(logb(9, v), 0.5 * logb(3, v));
    chk(logb(y, x), 1.5); chk(logb(3, (x * x) / y), 4);
    b.struct({
      d: 5, marks: 12, secs: 90 * 12, skill: "ANALYSIS", examStyle: true, calculator: false, paper: "Paper 1",
      concepts: [Q("logs.laws"), Q("logs.equations")],
      stem: t`The positive numbers $x$ and $y$ satisfy the simultaneous equations $\log_3 x - \log_9 y = 2$ and $xy = 243$.`,
      parts: [
        P.proof({ label: "(a)", marks: 2, stem: t`Show that $\log_9 y = \frac{1}{2}\log_3 y$.`,
          points: [t`M1 changes base: $\log_9 y = \frac{\log_3 y}{\log_3 9}$.`, t`A1 uses $\log_3 9 = 2$ to reach the result.`],
          modelAnswer: t`$$
\log_9 y = \frac{\log_3 y}{\log_3 9} = \frac{\log_3 y}{2} = \frac{1}{2}\log_3 y
$$`,
          explanation: "Change of base to base 3." }),
        P.proof({ label: "(b)", marks: 2, stem: t`Hence show that $x = 9\sqrt{y}$.`,
          points: [t`M1 writes $\log_3 x - \log_3 y^{\frac{1}{2}} = 2$, so $\log_3 \frac{x}{\sqrt{y}} = 2$.`, t`A1 converts to index form: $\frac{x}{\sqrt{y}} = 3^2 = 9$, so $x = 9\sqrt{y}$.`],
          modelAnswer: t`$$
\log_3 x - \frac{1}{2}\log_3 y = 2 \Rightarrow \log_3 x - \log_3 \sqrt{y} = 2
$$

$$
\log_3 \frac{x}{\sqrt{y}} = 2 \Rightarrow \frac{x}{\sqrt{y}} = 9 \Rightarrow x = 9\sqrt{y}
$$`,
          explanation: "Power law, quotient law, then index form." }),
        P.num({ label: "(c)", marks: 3, stem: t`Use $xy = 243$ to find the value of $y$.`, value: y, prefix: "y =", wrong: [27, 81],
          explanation: t`$9\sqrt{y} \times y = 243$, so $y^{\frac{3}{2}} = 27$ and $y = 27^{\frac{2}{3}} = 9$.` }),
        P.num({ label: "(d)", marks: 1, stem: t`Find the value of $x$.`, value: x, prefix: "x =", wrong: [9], explanation: t`$x = 9\sqrt{9} = 27$ (check: $27 \times 9 = 243$).` }),
        P.num({ label: "(e)", marks: 2, stem: t`Find the exact value of $\log_y x$.`, value: 1.5, wrong: [3, 2 / 3], explanation: t`$\log_9 27 = \frac{\log_3 27}{\log_3 9} = \frac{3}{2}$.` }),
        P.num({ label: "(f)", marks: 2, stem: t`Find the value of $\log_3 \left(\dfrac{x^2}{y}\right)$.`, value: 4, wrong: [81, 6], explanation: t`$\frac{27^2}{9} = 81 = 3^4$, so the value is 4.` }),
      ],
      explanation: "Change of base turns base-9 logarithms into base-3 ones; the laws then combine everything into a single logarithm, which converts to an index equation.",
      hints: [t`$\log_3 9 = 2$.`, t`$\frac{1}{2}\log_3 y = \log_3 \sqrt{y}$.`, t`$y^{\frac{3}{2}} = 27$ means $y = 27^{\frac{2}{3}}$.`],
    });
  }

  // Z4 (12, Section B): a logarithmic function and its inverse
  {
    const f = (x) => logb(2, x + 4), fi = (x) => 2 ** x - 4;
    chk(f(0), 2); chk(f(-3), 0);
    for (const x of [-3.5, 0, 12]) chk(fi(f(x)), x);
    chk(f(28), 5);
    same(quad.roots(1, 4, -32), [-8, 4]); chk(f(4) + logb(2, 4), 5);
    b.struct({
      d: 4, marks: 12, secs: 90 * 12, skill: "ANALYSIS", examStyle: true, calculator: false, paper: "Paper 1",
      concepts: [Q("logs.graphs"), Q("logs.equations"), Q("logs.laws")],
      stem: t`The function $f$ is defined by $f(x) = \log_2 (x + 4)$ for $x > -4$.`,
      parts: [
        P.fib({ label: "(a)", marks: 2, stem: t`Find the coordinates of the points where the graph of $y = f(x)$ meets the axes.`, template: "x-axis: ({{blank:x}}, 0); y-axis: (0, {{blank:y}})",
          blanks: [{ id: "x", input: "number", accepted: [-3], wrong: "-4" }, { id: "y", input: "number", accepted: [2], wrong: "4" }],
          explanation: t`$f(x) = 0$ when $x + 4 = 1$, so $x = -3$. $f(0) = \log_2 4 = 2$.` }),
        P.num({ label: "(b)", marks: 1, stem: t`State the equation of the asymptote of the graph of $y = f(x)$.`, value: -4, prefix: "x =", wrong: [4], explanation: t`$x + 4 = 0$ gives $x = -4$.` }),
        P.expr({ label: "(c)", marks: 2, stem: t`Find $f^{-1}(x)$. Type powers with ^, e.g. 3^x+1.`, accepted: ["2^x-4", "-4+2^x", "2^(x)-4", "f^-1(x)=2^x-4", "y=2^x-4"], wrong: ["2^(x-4)", "2^x+4"],
          explanation: t`$y = \log_2 (x + 4)$ gives $x + 4 = 2^y$, so $f^{-1}(x) = 2^x - 4$.` }),
        P.num({ label: "(d)", marks: 1, stem: t`State the equation of the asymptote of the graph of $y = f^{-1}(x)$.`, value: -4, prefix: "y =", wrong: [0], explanation: t`$2^x \to 0$ as $x \to -\infty$, so $y \to -4$.` }),
        P.manual({ label: "(e)", marks: 3, stem: t`Describe the sketch of $y = f(x)$ and $y = f^{-1}(x)$ on the same axes.`,
          points: [
            t`$y = f(x)$: increasing, through $(-3, 0)$ and $(0, 2)$, approaching $x = -4$ from the right.`,
            t`$y = f^{-1}(x)$: increasing, through $(0, -3)$ and $(2, 0)$, approaching $y = -4$ as $x \to -\infty$.`,
            t`The two curves are reflections of each other in the line $y = x$.`,
          ],
          modelAnswer: t`The log curve rises from $-\infty$ beside the dashed line $x = -4$, crosses the axes at $(-3, 0)$ and $(0, 2)$ and then rises slowly. Its inverse rises from just above the dashed line $y = -4$, crosses at $(0, -3)$ and $(2, 0)$ and then climbs steeply. Each is the mirror image of the other in $y = x$.`,
          explanation: "Intercepts swap coordinates and asymptotes swap orientation under reflection in y = x." }),
        P.num({ label: "(f)", marks: 1, stem: t`Solve $f(x) = 5$.`, value: 28, prefix: "x =", wrong: [6, 36], explanation: t`$x + 4 = 2^5 = 32$, so $x = 28$.` }),
        P.num({ label: "(g)", marks: 2, stem: t`Solve the equation $f(x) + \log_2 x = 5$.`, value: 4, prefix: "x =", wrong: [-8],
          explanation: t`$\log_2 [x(x + 4)] = 5$, so $x^2 + 4x - 32 = 0$, $(x + 8)(x - 4) = 0$. $x = -8$ is rejected ($\log_2(-8)$ is undefined), so $x = 4$.` }),
      ],
      explanation: "Features of a logarithmic graph come from its argument; the inverse is an exponential function whose graph is the reflection in y = x.",
      hints: [t`$\log_2 1 = 0$ and $\log_2 4 = 2$.`, t`For (c), $x + 4 = 2^y$.`, "For (g), combine the logarithms and reject any value that makes a logarithm undefined."],
    });
  }

  // Z5 (12, Section B): perpendicular bisector and a kite
  {
    const A = [1, 1], C = [7, 9], M = [4, 5], B = [0, 8], D = [12, -1];
    same([(A[0] + C[0]) / 2, (A[1] + C[1]) / 2], M);
    chk(grad(A, C), 4 / 3);
    for (const p of [M, B, D]) chk(3 * p[0] + 4 * p[1], 32);
    chk(dist(A, B), dist(C, B)); chk(dist(A, D), dist(C, D));
    chk(dist(A, C), 10); chk(dist(B, D), 15);
    const area = 0.5 * 10 * 15;
    b.struct({
      d: 4, marks: 12, secs: 90 * 12, skill: "ANALYSIS", examStyle: true, calculator: false, paper: "Paper 1",
      concepts: [Q("coordinate.parallel-perpendicular"), Q("coordinate.lines")],
      stem: t`The points $A(1, 1)$ and $C(7, 9)$ are opposite vertices of a kite $ABCD$. The other diagonal $BD$ lies on the perpendicular bisector of $AC$.`,
      parts: [
        P.fib({ label: "(a)", marks: 2, stem: t`Find the midpoint $M$ of $AC$.`, template: "M({{blank:x}}, {{blank:y}})",
          blanks: [{ id: "x", input: "number", accepted: [4], wrong: "3" }, { id: "y", input: "number", accepted: [5], wrong: "4" }],
          explanation: t`$\left(\frac{1 + 7}{2}, \frac{1 + 9}{2}\right) = (4, 5)$.` }),
        P.num({ label: "(b)", marks: 1, stem: t`Find the gradient of $AC$. You may type a fraction.`, value: 4 / 3, wrong: [0.75, -0.75], explanation: t`$\frac{9 - 1}{7 - 1} = \frac{8}{6} = \frac{4}{3}$.` }),
        P.num({ label: "(c)", marks: 2, stem: t`The perpendicular bisector of $AC$ has equation $3x + 4y = k$. Find $k$.`, value: 32, prefix: "k =", wrong: [27],
          explanation: t`Gradient $-\frac{3}{4}$ through $(4, 5)$: $y - 5 = -\frac{3}{4}(x - 4)$, $4y - 20 = -3x + 12$, so $3x + 4y = 32$.` }),
        P.num({ label: "(d)", marks: 1, stem: t`The vertex $B$ lies on the $y$-axis. Find its $y$-coordinate.`, value: 8, prefix: "y =", wrong: [32], explanation: t`$x = 0$: $4y = 32$, $y = 8$, so $B = (0, 8)$.` }),
        P.num({ label: "(e)", marks: 1, stem: t`The vertex $D$ has coordinates $(12, d)$. Find $d$.`, value: -1, prefix: "d =", wrong: [1], explanation: t`$36 + 4d = 32$, so $d = -1$.` }),
        P.proof({ label: "(f)", marks: 2, stem: t`Show that $AB = CB$ and $AD = CD$.`,
          points: [t`M1 finds $AB = \sqrt{1 + 49} = \sqrt{50}$ and $CB = \sqrt{49 + 1} = \sqrt{50}$.`, t`A1 finds $AD = \sqrt{121 + 4} = \sqrt{125}$ and $CD = \sqrt{25 + 100} = \sqrt{125}$.`],
          modelAnswer: t`$$
AB = \sqrt{(0 - 1)^2 + (8 - 1)^2} = \sqrt{50}, \qquad CB = \sqrt{(0 - 7)^2 + (8 - 9)^2} = \sqrt{50}
$$

$$
AD = \sqrt{(12 - 1)^2 + (-1 - 1)^2} = \sqrt{125}, \qquad CD = \sqrt{(12 - 7)^2 + (-1 - 9)^2} = \sqrt{125}
$$

Two pairs of adjacent sides are equal, so $ABCD$ is a kite.`,
          explanation: "Use the distance formula for the four sides." }),
        P.num({ label: "(g)", marks: 3, stem: t`Hence find the area of the kite.`, value: area, unit: "units²", wrong: [150, 37.5],
          explanation: t`$AC = \sqrt{36 + 64} = 10$ and $BD = \sqrt{144 + 81} = 15$. The diagonals are perpendicular, so the area is $\frac{1}{2} \times 10 \times 15 = 75$.` }),
      ],
      explanation: "Every point of the perpendicular bisector of AC is equidistant from A and C, which is why B and D give a kite; its area is half the product of the perpendicular diagonals.",
      hints: [t`The perpendicular gradient is $-\frac{3}{4}$.`, "Substitute x = 0 for B and x = 12 for D.", "Area of a kite = ½ × d₁ × d₂."],
    });
  }
});

// ---------------------------------------------------------------------------------------------------------------------
concept(Q("circle.line-tangents"), { file: "exam/w2a-cambridge", keyPrefix: "exam.w2a-cambridge", applies: CAM }, (b) => {
  // C1 (8, Paper 1): circle, centre and radius, tangent
  {
    const C = [5, -2], Pt = [8, 2];
    chk(25 + 4 - 4, 25); chk(on(C, Pt), 25);
    chk(grad(C, Pt), 4 / 3);
    chk(3 * Pt[0] + 4 * Pt[1], 32); chk(4 * 8, 32);
    b.struct({
      d: 4, marks: 8, secs: 90 * 8, skill: "APPLICATION", examStyle: true, calculator: false, paper: "Paper 1",
      concepts: [Q("circle.line-tangents"), Q("circle.equation")],
      stem: t`The circle $C$ has equation $x^2 + y^2 - 10x + 4y + 4 = 0$. The point $P(8, 2)$ lies on $C$.`,
      parts: [
        P.fib({ label: "(a)", marks: 3, stem: t`Find the coordinates of the centre of $C$ and the radius of $C$.`, template: "centre ({{blank:a}}, {{blank:b}}), radius {{blank:r}}",
          blanks: [{ id: "a", input: "number", accepted: [5], wrong: "-5" }, { id: "b", input: "number", accepted: [-2], wrong: "2" }, { id: "r", input: "number", accepted: [5], wrong: "25" }],
          explanation: t`$(x - 5)^2 - 25 + (y + 2)^2 - 4 + 4 = 0$, so $(x - 5)^2 + (y + 2)^2 = 25$: centre $(5, -2)$, radius 5.` }),
        P.num({ label: "(b)", marks: 3, stem: t`The tangent to $C$ at $P$ has equation $3x + 4y = k$. Find $k$.`, value: 32, prefix: "k =", wrong: [24, 14],
          explanation: t`Gradient of radius $= \frac{2 - (-2)}{8 - 5} = \frac{4}{3}$, so the tangent has gradient $-\frac{3}{4}$: $y - 2 = -\frac{3}{4}(x - 8)$, $4y - 8 = -3x + 24$, so $3x + 4y = 32$.` }),
        P.num({ label: "(c)", marks: 2, stem: t`The tangent meets the $y$-axis at $T$. Find the $y$-coordinate of $T$.`, value: 8, prefix: "y =", wrong: [32], explanation: t`$x = 0$: $4y = 32$, so $y = 8$.` }),
      ],
      explanation: "Complete the square for the centre and radius; the tangent is perpendicular to the radius at the point of contact.",
      hints: [t`$x^2 - 10x = (x - 5)^2 - 25$.`, "The tangent's gradient is the negative reciprocal of the radius's gradient."],
    });
  }

  // C2 (8, Paper 1): exact perimeter and area with radian measure
  {
    const r = 12, th = Math.PI / 3;
    const OC = r * Math.cos(th), AC = r * Math.sin(th);
    chk(OC, 6); chk(AC, 6 * Math.sqrt(3));
    const per = AC + (r - OC) + r * th;
    chk(per, 6 + 6 * Math.sqrt(3) + 4 * Math.PI);
    const area = 0.5 * r * r * th - 0.5 * OC * AC;
    chk(area, 24 * Math.PI - 18 * Math.sqrt(3));
    b.struct({
      d: 4, marks: 8, secs: 90 * 8, skill: "APPLICATION", examStyle: true, calculator: false, paper: "Paper 1",
      concepts: [Q("circular.compound-shapes"), Q("circular.radians")],
      stem: t`The sector $OAB$ has centre $O$, radius 12 cm and angle $AOB = \frac{\pi}{3}$ radians. The point $C$ lies on $OB$ and $AC$ is perpendicular to $OB$. The region $R$ is bounded by $AC$, $CB$ and the arc $AB$.`,
      parts: [
        P.proof({ label: "(a)", marks: 2, stem: t`Show that $AC = 6\sqrt{3}$ cm and $OC = 6$ cm.`,
          points: [t`M1 uses the right angle at $C$: $AC = 12\sin\frac{\pi}{3}$ and $OC = 12\cos\frac{\pi}{3}$.`, t`A1 uses $\sin\frac{\pi}{3} = \frac{\sqrt{3}}{2}$ and $\cos\frac{\pi}{3} = \frac{1}{2}$ to reach both results.`],
          modelAnswer: t`$$
AC = 12\sin\frac{\pi}{3} = 12 \times \frac{\sqrt{3}}{2} = 6\sqrt{3}, \qquad OC = 12\cos\frac{\pi}{3} = 12 \times \frac{1}{2} = 6
$$`,
          explanation: "Triangle OCA is right-angled at C with hypotenuse OA = 12." }),
        P.fib({ label: "(b)", marks: 3, stem: t`Find the exact perimeter of $R$ in the form $p + q\sqrt{3} + s\pi$.`, template: "p = {{blank:p}}, q = {{blank:q}}, s = {{blank:s}}",
          blanks: [{ id: "p", input: "number", accepted: [6], wrong: "12" }, { id: "q", input: "number", accepted: [6], wrong: "12" }, { id: "s", input: "number", accepted: [4], wrong: "2" }],
          explanation: t`$CB = 12 - 6 = 6$; arc $AB = 12 \times \frac{\pi}{3} = 4\pi$. Perimeter $= 6\sqrt{3} + 6 + 4\pi$.` }),
        P.fib({ label: "(c)", marks: 3, stem: t`Find the exact area of $R$ in the form $u\pi + v\sqrt{3}$.`, template: "u = {{blank:u}}, v = {{blank:v}}",
          blanks: [{ id: "u", input: "number", accepted: [24], wrong: "12" }, { id: "v", input: "number", accepted: [-18], wrong: "-36" }],
          explanation: t`Sector $= \frac{1}{2}(144)\left(\frac{\pi}{3}\right) = 24\pi$; triangle $OCA = \frac{1}{2}(6)(6\sqrt{3}) = 18\sqrt{3}$. Area of $R = 24\pi - 18\sqrt{3}$.` }),
      ],
      explanation: "Region R is the sector minus the right-angled triangle OCA; its boundary is AC, CB and the arc.",
      hints: [t`$\sin\frac{\pi}{3} = \frac{\sqrt{3}}{2}$, $\cos\frac{\pi}{3} = \frac{1}{2}$.`, "Area of R = sector OAB − triangle OCA."],
    });
  }

  // C3 (8, Paper 1): linear law with exact values
  {
    const n = (7 - 3) / (3 - 1), c = 3 - n * 1;
    chk(n, 2); chk(c, 1);
    const A = 10 ** c;
    chk(A, 10);
    chk(lg(A * 100 ** n), 5); chk(A * 10 ** n, 1000);
    b.struct({
      d: 4, marks: 8, secs: 90 * 8, skill: "APPLICATION", examStyle: true, calculator: false, paper: "Paper 1",
      concepts: [Q("coordinate.linear-law"), Q("logs.laws")],
      stem: t`The variables $x$ and $y$ satisfy $y = Ax^n$, where $A$ and $n$ are constants. The graph of $\lg y$ against $\lg x$ is a straight line passing through the points $(1, 3)$ and $(3, 7)$.`,
      parts: [
        P.proof({ label: "(a)", marks: 1, stem: t`Show that $\lg y = n\lg x + \lg A$.`,
          points: [t`B1 takes logarithms and uses the product and power laws: $\lg y = \lg A + \lg x^n = n\lg x + \lg A$.`],
          modelAnswer: t`$$
\lg y = \lg (Ax^n) = \lg A + n\lg x
$$`,
          explanation: "Laws of logarithms." }),
        P.num({ label: "(b)", marks: 2, stem: t`Find $n$.`, value: n, prefix: "n =", wrong: [0.5, 4], explanation: t`Gradient $= \frac{7 - 3}{3 - 1} = 2$.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Find $A$.`, value: A, prefix: "A =", wrong: [1], explanation: t`$3 = 2(1) + \lg A$, so $\lg A = 1$ and $A = 10$.` }),
        P.num({ label: "(d)", marks: 1, stem: t`Find $y$ when $x = 100$.`, value: 10 * 100 ** 2, prefix: "y =", wrong: [5, 2000], explanation: t`$y = 10 \times 100^2 = 100\,000$ (or $\lg y = 2(2) + 1 = 5$).` }),
        P.num({ label: "(e)", marks: 2, stem: t`Find $x$ when $y = 1000$.`, value: 10, prefix: "x =", wrong: [1, 100], explanation: t`$\lg 1000 = 3 = 2\lg x + 1$, so $\lg x = 1$ and $x = 10$.` }),
      ],
      explanation: "On a graph of lg y against lg x, the gradient is n and the intercept is lg A.",
      hints: [t`The intercept is $\lg A$, so $A = 10^{\text{intercept}}$.`, t`Use $\lg y = 2\lg x + 1$ for (d) and (e).`],
    });
  }

  // C4 (8, Paper 1): two circles touching, common tangent
  {
    const C1 = [0, 0], C2 = [6, 8];
    chk(dist(C1, C2), 10);
    const T = [3, 4];
    chk(on(C1, T), 25); chk(on(C2, T), 25);
    chk(3 * T[0] + 4 * T[1], 25); chk(grad(C1, C2) * (-3 / 4), -1);
    b.struct({
      d: 4, marks: 8, secs: 90 * 8, skill: "ANALYSIS", examStyle: true, calculator: false, paper: "Paper 1",
      concepts: [Q("circle.two-circles"), Q("circle.line-tangents"), Q("circle.equation")],
      stem: t`The circles $C_1$ and $C_2$ have equations $x^2 + y^2 = 25$ and $x^2 + y^2 - 12x - 16y + 75 = 0$.`,
      parts: [
        P.proof({ label: "(a)", marks: 3, stem: t`Show that the circles touch externally.`,
          points: [t`M1 completes the square for $C_2$: $(x - 6)^2 + (y - 8)^2 = 25$.`, t`M1 finds the distance between centres $(0, 0)$ and $(6, 8)$: $\sqrt{36 + 64} = 10$.`, t`A1 compares with $r_1 + r_2 = 5 + 5 = 10$ and concludes.`],
          modelAnswer: t`$$
(x - 6)^2 + (y - 8)^2 = 36 + 64 - 75 = 25
$$

Centres $(0, 0)$ and $(6, 8)$, radii 5 and 5.

$$
d = \sqrt{6^2 + 8^2} = 10 = 5 + 5 = r_1 + r_2
$$

so the circles touch externally.`,
          explanation: "Compare the distance between the centres with the sum of the radii." }),
        P.fib({ label: "(b)", marks: 2, stem: t`Find the coordinates of the point of contact.`, template: "({{blank:x}}, {{blank:y}})",
          blanks: [{ id: "x", input: "number", accepted: [3], wrong: "6" }, { id: "y", input: "number", accepted: [4], wrong: "8" }],
          explanation: t`Equal radii, so the point of contact is the midpoint of the centres: $(3, 4)$.` }),
        P.num({ label: "(c)", marks: 3, stem: t`The common tangent at the point of contact has equation $3x + 4y = k$. Find $k$.`, value: 25, prefix: "k =", wrong: [24, 7],
          explanation: t`The line of centres has gradient $\frac{4}{3}$; the tangent is perpendicular to it, gradient $-\frac{3}{4}$, through $(3, 4)$: $3x + 4y = 9 + 16 = 25$.` }),
      ],
      explanation: "Touching circles: distance between centres = sum of radii; the common tangent at the contact point is perpendicular to the line of centres.",
      hints: [t`$x^2 - 12x = (x - 6)^2 - 36$.`, "The contact point lies on the line of centres."],
    });
  }

  // C5 (10, Paper 2): exponential decay model and its graph
  {
    const T = (t) => 20 + 70 * Math.exp(-0.04 * t);
    chk(T(0), 90);
    const t50 = ln(7 / 3) / 0.04;
    chk(T(t50), 50, 1e-9);
    b.struct({
      d: 4, marks: 10, secs: 90 * 10, skill: "APPLICATION", examStyle: true, calculator: true, paper: "Paper 2",
      concepts: [Q("logs.equations"), Q("logs.graphs")],
      stem: t`Chipo pours a cup of tea in a room at constant temperature. The temperature of the tea, $\theta$ °C, $t$ minutes later is modelled by $\theta = 20 + 70\mathrm{e}^{-0.04t}$.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Find the temperature of the tea when it is poured.", value: 90, wrong: [70, 20], explanation: t`$t = 0$: $\theta = 20 + 70 = 90$ °C.` }),
        P.num({ label: "(b)", marks: 2, stem: "Find the temperature after 10 minutes, correct to 3 significant figures.", value: T(10), wrong: [sfStr(20 + 70 * Math.exp(-4))],
          explanation: t`$20 + 70\mathrm{e}^{-0.4} = ${sfStr(T(10))}$ °C.` }),
        P.num({ label: "(c)", marks: 3, stem: "Find the time taken for the temperature to fall to 50 °C, correct to 3 significant figures.", value: t50, wrong: [sfStr(ln(50 / 70) / -0.04)],
          explanation: t`$70\mathrm{e}^{-0.04t} = 30$, so $\mathrm{e}^{-0.04t} = \frac{3}{7}$ and $t = \frac{\ln(7/3)}{0.04} = ${sfStr(t50)}$ minutes.` }),
        P.num({ label: "(d)", marks: 1, stem: "State the temperature that the tea approaches after a long time.", value: 20, wrong: [0], explanation: t`$\mathrm{e}^{-0.04t} \to 0$, so $\theta \to 20$ °C (room temperature).` }),
        P.manual({ label: "(e)", marks: 3, stem: t`Describe the graph of $\theta$ against $t$ for $t \geq 0$.`,
          points: [t`Starts at $(0, 90)$.`, "Decreasing throughout, falling more and more slowly (decay curve).", t`Approaches the horizontal asymptote $\theta = 20$ without reaching it.`],
          modelAnswer: t`The curve starts at $(0, 90)$ and decreases, steeply at first and then more gently, getting ever closer to the dashed line $\theta = 20$ but never reaching it.`,
          explanation: "A curve of the form a + ke^(−nt) decays from a + k towards a." }),
      ],
      explanation: "Isolate the exponential term, then take natural logarithms; the constant term gives the asymptote.",
      hints: [t`Subtract 20 and divide by 70 before taking $\ln$.`, t`$\mathrm{e}^{-0.04t} \to 0$ as $t$ grows.`],
    });
  }

  // C6 (10, Paper 2): sector, chord and segment
  {
    const r = 9, th = 1.3;
    const arc = r * th, ch = 2 * r * Math.sin(th / 2), sg = 0.5 * r * r * (th - Math.sin(th));
    const r2 = Math.sqrt((2 * 100) / th);
    chk(0.5 * r2 * r2 * th, 100, 1e-9);
    b.struct({
      d: 4, marks: 10, secs: 90 * 10, skill: "APPLICATION", examStyle: true, calculator: true, paper: "Paper 2",
      concepts: [Q("circular.compound-shapes"), Q("circular.radians")],
      stem: t`The points $A$ and $B$ lie on a circle with centre $O$ and radius 9 cm, and angle $AOB = 1.3$ radians. Give answers correct to 3 significant figures.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: t`Find the length of the minor arc $AB$.`, value: arc, unit: "cm", wrong: [5.85], explanation: t`$9 \times 1.3 = 11.7$ cm.` }),
        P.num({ label: "(b)", marks: 2, stem: t`Find the length of the chord $AB$.`, value: ch, unit: "cm", wrong: [sfStr(2 * r * Math.sin(th))], explanation: t`$2 \times 9 \times \sin 0.65 = ${sfStr(ch)}$ cm.` }),
        P.num({ label: "(c)", marks: 1, stem: "Find the perimeter of the minor segment.", value: arc + ch, unit: "cm", wrong: [sfStr(arc + 18)], explanation: t`Arc + chord $= 11.7 + ${sfStr(ch)} = ${sfStr(arc + ch)}$ cm.` }),
        P.num({ label: "(d)", marks: 3, stem: "Find the area of the minor segment.", value: sg, unit: "cm²", wrong: [52.65], explanation: t`$\frac{1}{2}(81)(1.3 - \sin 1.3) = 40.5(1.3 - 0.9636) = ${sfStr(sg)}$ cm$^2$.` }),
        P.num({ label: "(e)", marks: 1, stem: t`Write angle $AOB$ in degrees, correct to 1 decimal place.`, value: (th * 180) / Math.PI, unit: "°", wrong: [234], explanation: t`$1.3 \times \frac{180}{\pi} = 74.5^\circ$.` }),
        P.num({ label: "(f)", marks: 2, stem: "A different sector, also with angle 1.3 radians, has area 100 cm². Find its radius.", value: r2, unit: "cm", wrong: [sfStr(Math.sqrt(100 / 1.3))], explanation: t`$\frac{1}{2}r^2(1.3) = 100$, so $r^2 = \frac{200}{1.3}$ and $r = ${sfStr(r2)}$ cm.` }),
      ],
      explanation: "Arc rθ, chord 2r sin(θ/2), segment ½r²(θ − sin θ), all with θ in radians.",
      hints: ["Use radian mode.", "Segment = sector − triangle."],
    });
  }

  // C7 (10, Paper 2): linear law from data, y = Ab^x
  {
    const xs = [1, 2, 3, 4, 5];
    const ys = xs.map((x) => Number((2.5 * 1.6 ** x).toPrecision(3)));
    same(ys, [4, 6.4, 10.2, 16.4, 26.2]);
    const lys = ys.map((y) => lg(y));
    const m = (1.418 - 0.602) / 4, c = 0.602 - m;
    chk(m, 0.204, 1e-12); chk(c, 0.398, 1e-12);
    chk(Math.abs(lys[0] - 0.602) < 0.0005 && Math.abs(lys[4] - 1.418) < 0.0005 ? 1 : 0, 1);
    const B = 10 ** m, A = 10 ** c, x50 = (lg(50) - c) / m;
    b.struct({
      d: 5, marks: 10, secs: 90 * 10, skill: "ANALYSIS", examStyle: true, calculator: true, paper: "Paper 2",
      concepts: [Q("coordinate.linear-law"), Q("logs.equations")],
      stem: t`Tendai records the number of seedlings, $y$ (in hundreds), that have germinated in a nursery $x$ days after planting. He believes that $y = Ab^x$, where $A$ and $b$ are constants.

${table(["$x$", "$1$", "$2$", "$3$", "$4$", "$5$"], [["$y$", "$4.00$", "$6.40$", "$10.2$", "$16.4$", "$26.2$"]])}`,
      parts: [
        P.fib({ label: "(a)", marks: 2, stem: t`Find $\lg y$ for $x = 2$ and for $x = 4$, correct to 3 decimal places.`, template: "x = 2: lg y = {{blank:a}}; x = 4: lg y = {{blank:b}}",
          blanks: [{ id: "a", input: "number", accepted: [fixed(lys[1], 3)], tolerance: 0.0005, wrong: "0.6" }, { id: "b", input: "number", accepted: [fixed(lys[3], 3)], tolerance: 0.0005, wrong: "2.797" }],
          explanation: t`$\lg 6.40 = ${fixed(lys[1], 3)}$ and $\lg 16.4 = ${fixed(lys[3], 3)}$.` }),
        P.proof({ label: "(b)", marks: 1, stem: t`Show that $\lg y = x\lg b + \lg A$.`,
          points: [t`B1 takes logarithms: $\lg y = \lg A + \lg b^x = x\lg b + \lg A$.`],
          modelAnswer: t`$$
\lg y = \lg (Ab^x) = \lg A + x\lg b
$$`,
          explanation: "Product and power laws." }),
        P.group({ label: "(c)", stem: t`The points $(1, 0.602)$ and $(5, 1.418)$ lie on the line of best fit of $\lg y$ against $x$. Find, correct to 3 significant figures,`, parts: [
          P.num({ label: "(i)", marks: 2, stem: t`the value of $b$,`, value: B, prefix: "b =", wrong: [0.204], explanation: t`Gradient $\lg b = \frac{1.418 - 0.602}{5 - 1} = 0.204$, so $b = 10^{0.204} = ${sfStr(B)}$.` }),
          P.num({ label: "(ii)", marks: 2, stem: t`the value of $A$.`, value: A, prefix: "A =", wrong: [0.398], explanation: t`$0.602 = 0.204(1) + \lg A$, so $\lg A = 0.398$ and $A = 10^{0.398} = ${sfStr(A)}$.` }),
        ] }),
        P.num({ label: "(d)", marks: 3, stem: "Use the model to estimate the number of days after which y = 50, correct to 3 significant figures.", value: x50, wrong: [sfStr(50 / (A * B))],
          explanation: t`$\lg 50 = 0.204x + 0.398$, so $x = \frac{1.699 - 0.398}{0.204} = ${sfStr(x50)}$ days.` }),
      ],
      explanation: "Plotting lg y against x straightens y = Ab^x: the gradient is lg b and the intercept is lg A.",
      hints: [t`Gradient $= \lg b$, intercept $= \lg A$.`, t`For (d), solve $\lg 50 = 0.204x + 0.398$.`],
    });
  }
});
