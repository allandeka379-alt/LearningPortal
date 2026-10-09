// W3a: amath.calculus.tangents-normals
import { concept, P, t, chk, same, checkDeriv, quad } from "../lib.mjs";

const XS = [0.7, 1.6, 2.9];

concept("amath.calculus.tangents-normals", { file: "calculus/tangents-normals", keyPrefix: "calculus.tangents-normals" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "The normal to a curve at a point P is the line through P that is …",
    options: [
      ["perpendicular to the tangent at P", "Correct: the normal is at right angles to the tangent."],
      ["parallel to the tangent at P", "A line through P parallel to the tangent is the tangent itself."],
      ["parallel to the y-axis", "Only when the tangent is horizontal is the normal vertical."],
      ["joining P to the origin", "That line has nothing to do with the direction of the curve."],
    ],
    answer: "A",
    explanation: t`The normal at $P$ passes through $P$ and is perpendicular to the tangent there, so its gradient is $-\frac{1}{m}$ where $m$ is the tangent's gradient.`,
  });

  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`The tangent to a curve at a point $P$ has gradient $\dfrac{2}{5}$. Find the gradient of the normal at $P$. Give your answer as a fraction or a decimal.`,
    value: -2.5, wrong: [-0.4, 2.5],
    explanation: t`Normal gradient $= -1 \div \frac{2}{5} = -\frac{5}{2}$. The value $-\frac{2}{5}$ changes only the sign; $\frac{5}{2}$ only inverts.`,
  });

  b.match({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "Match the gradient of each tangent with the gradient of the normal at the same point.",
    pairs: [
      [t`$2$`, t`$-\frac{1}{2}$`],
      [t`$-3$`, t`$\frac{1}{3}$`],
      [t`$\frac{1}{4}$`, t`$-4$`],
      [t`$-\frac{2}{5}$`, t`$\frac{5}{2}$`],
    ],
    explanation: t`The normal's gradient is the negative reciprocal $-\frac{1}{m}$: invert and change the sign. Check: $2 \times \left(-\frac{1}{2}\right) = -1$.`,
  });

  {
    const f = (x) => x * x + 3 * x, fp = (x) => 2 * x + 3;
    checkDeriv(f, fp, XS); chk(f(1), 4); chk(fp(1), 5); chk(5 * 1 - 1, 4);
    b.fib({
      d: 2, skill: "APPLICATION", calculator: false,
      stem: t`Find the equation of the tangent to the curve $y = x^2 + 3x$ at the point where $x = 1$, in the form $y = mx + c$.`,
      template: "m = {{blank:m}}, c = {{blank:c}}",
      blanks: [{ id: "m", input: "number", accepted: [5], wrong: "4" }, { id: "c", input: "number", accepted: [-1], wrong: "4" }],
      explanation: t`At $x = 1$, $y = 4$. $\frac{dy}{dx} = 2x + 3 = 5$. Tangent: $y - 4 = 5(x - 1)$, so $y = 5x - 1$.`,
    });
  }

  {
    const f = (x) => x ** 3 - 4 * x, fp = (x) => 3 * x * x - 4;
    checkDeriv(f, fp, XS); chk(f(2), 0); chk(fp(2), 8);
    // normal: y - 0 = -(1/8)(x - 2)  ->  8y = -x + 2  ->  x + 8y - 2 = 0
    chk(2 + 8 * 0 - 2, 0);
    b.fib({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`Find the equation of the normal to the curve $y = x^3 - 4x$ at the point where $x = 2$. Give it in the form $x + ay + b = 0$.`,
      template: "a = {{blank:a}}, b = {{blank:b}}",
      blanks: [{ id: "a", input: "number", accepted: [8], wrong: "-8" }, { id: "b", input: "number", accepted: [-2], wrong: "2" }],
      explanation: t`At $x = 2$, $y = 8 - 8 = 0$. $\frac{dy}{dx} = 3x^2 - 4 = 8$, so the normal has gradient $-\frac{1}{8}$. $y - 0 = -\frac{1}{8}(x - 2)$ gives $8y = -x + 2$, that is $x + 8y - 2 = 0$.`,
      hints: ["Find y at x = 2 first.", "Normal gradient = −1 ÷ tangent gradient."],
    });
  }

  {
    const f = (x) => 2 * x * x - 3 * x + 1, fp = (x) => 4 * x - 3;
    checkDeriv(f, fp, XS); chk(f(2), 3); chk(fp(2), 5);
    const xi = 2 - f(2) / fp(2);
    chk(xi, 1.4);
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`The tangent to the curve $y = 2x^2 - 3x + 1$ at the point where $x = 2$ meets the $x$-axis at $A$. Find the $x$-coordinate of $A$.`,
      value: xi, wrong: [2.6, 0.6],
      explanation: t`At $x = 2$: $y = 3$ and $\frac{dy}{dx} = 4x - 3 = 5$. Tangent: $y - 3 = 5(x - 2)$, so $y = 5x - 7$. On the $x$-axis, $0 = 5x - 7$, so $x = 1.4$. The value 2.6 comes from $y + 3$ instead of $y - 3$.`,
      hints: ["Find the tangent's equation, then put y = 0."],
    });
  }

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true, calculator: false,
    stem: t`If $\dfrac{dy}{dx} = 0$ at a point $P(a, b)$ on a curve, then the normal at $P$ is the vertical line $x = a$.`,
    answer: true,
    explanation: t`True. The tangent is horizontal ($y = b$), and a line perpendicular to a horizontal line is vertical, so the normal is $x = a$. (The formula $-\frac{1}{m}$ cannot be used when $m = 0$.)`,
  });

  {
    const fp = (x) => -6 / (x * x);
    checkDeriv((x) => 6 / x, fp, XS); chk(fp(2), -1.5);
    chk(3 * 2 + 2 * 3, 12);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`Which is the equation of the tangent to the curve $y = \dfrac{6}{x}$ at the point $(2, 3)$?`,
      options: [
        [t`$3x + 2y = 12$`, t`Correct: gradient $-\frac{3}{2}$; $y - 3 = -\frac{3}{2}(x - 2)$ gives $2y - 6 = -3x + 6$.`],
        [t`$2x - 3y = -5$`, t`This line has gradient $\frac{2}{3}$: it is the normal, not the tangent.`],
        [t`$3x - 2y = 0$`, t`This has gradient $+\frac{3}{2}$; the derivative $-\frac{6}{x^2}$ is negative.`],
        [t`$3x + 2y = 6$`, t`This has the right gradient but does not pass through $(2, 3)$.`],
      ],
      answer: "A",
      explanation: t`$\frac{dy}{dx} = -\frac{6}{x^2} = -\frac{3}{2}$ at $x = 2$. Tangent: $y - 3 = -\frac{3}{2}(x - 2)$, so $2y - 6 = -3x + 6$ and $3x + 2y = 12$.`,
      hints: [t`Write $\frac{6}{x}$ as $6x^{-1}$.`],
    });
  }

  {
    const f = (x) => x * x - 6 * x + 2;
    chk(2 * 5 - 6, 4); chk(f(5), -3);
    b.fib({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`Find the coordinates of the point on the curve $y = x^2 - 6x + 2$ at which the gradient is $4$.`,
      template: "({{blank:x}}, {{blank:y}})",
      blanks: [{ id: "x", input: "number", accepted: [5], wrong: "1" }, { id: "y", input: "number", accepted: [-3], wrong: "4" }],
      explanation: t`$\frac{dy}{dx} = 2x - 6 = 4$ gives $x = 5$; then $y = 25 - 30 + 2 = -3$. The $y$-coordinate comes from the curve, not from the gradient.`,
      hints: ["Set dy/dx equal to 4."],
    });
  }

  {
    const fp = (x) => 0.5 / Math.sqrt(x);
    checkDeriv(Math.sqrt, fp, XS); chk(fp(4), 0.25);
    const c = 2 + 4 * 4;
    chk(c, 18);
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`The normal to the curve $y = \sqrt{x}$ at the point $(4, 2)$ meets the $y$-axis at $B$. Find the $y$-coordinate of $B$.`,
      value: c, wrong: [1, -14],
      explanation: t`$\frac{dy}{dx} = \frac{1}{2\sqrt{x}} = \frac{1}{4}$ at $x = 4$, so the normal has gradient $-4$. $y - 2 = -4(x - 4)$ gives $y = -4x + 18$; on the $y$-axis $y = 18$. Using the tangent instead ($y = \frac{1}{4}x + 1$) gives 1.`,
      hints: ["Normal gradient = −1 ÷ (tangent gradient).", "On the y-axis, x = 0."],
    });
  }

  {
    const f = (x) => x ** 3 - 3 * x, fp = (x) => 3 * x * x - 3;
    checkDeriv(f, fp, XS);
    same(quad.roots(3, 0, -12), [-2, 2]);
    same([f(-2), f(2)], [-2, 2]);
    b.fib({
      d: 4, skill: "APPLICATION", calculator: false,
      stem: t`The tangents to the curve $y = x^3 - 3x$ at two points are parallel to the line $y = 9x$. Find the coordinates of both points, the one with the smaller $x$-coordinate first.`,
      template: "({{blank:a}}, {{blank:b}}) and ({{blank:c}}, {{blank:d}})",
      blanks: [
        { id: "a", input: "number", accepted: [-2], wrong: "-3" },
        { id: "b", input: "number", accepted: [-2], wrong: "-18" },
        { id: "c", input: "number", accepted: [2], wrong: "3" },
        { id: "d", input: "number", accepted: [2], wrong: "18" },
      ],
      explanation: t`Parallel means equal gradients: $3x^2 - 3 = 9$, so $x^2 = 4$ and $x = \pm 2$. Then $y = -8 + 6 = -2$ and $y = 8 - 6 = 2$. The points are $(-2, -2)$ and $(2, 2)$. Using the line $y = 9x$ for the $y$-values gives $\pm 18$, which are not on the curve.`,
      hints: ["The gradient of y = 9x is 9.", "A square root has two signs."],
    });
  }

  {
    // tangent to y = x^2 at (3, 9): y = 6x - 9; normal: y = -x/6 + 19/2
    chk(6 * 3 - 9, 9); chk(-3 / 6 + 9.5, 9);
    const area = 0.5 * (9.5 - -9) * 3;
    chk(area, 27.75);
    b.num({
      d: 4, skill: "ANALYSIS", calculator: false,
      stem: t`The tangent and the normal to the curve $y = x^2$ at the point $P(3, 9)$ meet the $y$-axis at $A$ and $B$. Find the exact area of triangle $APB$.`,
      value: area, dp: 2, unit: "units²", wrong: [27, 55.5],
      explanation: t`Gradient at $P$: $2x = 6$. Tangent: $y = 6x - 9$, so $A = (0, -9)$. Normal gradient $-\frac{1}{6}$: $y - 9 = -\frac{1}{6}(x - 3)$, so $y = -\frac{1}{6}x + 9.5$ and $B = (0, 9.5)$. Base $AB = 18.5$ on the $y$-axis; height = $x$-coordinate of $P$ = 3. Area $= \frac{1}{2} \times 18.5 \times 3 = 27.75$. Forgetting the $\frac{1}{2}$ gives 55.5.`,
      hints: ["Both A and B are on the y-axis, so AB is a vertical base.", "The height is the horizontal distance from P to the y-axis."],
    });
  }

  {
    const E = Math.E;
    chk(Math.exp(1), E);
    // tangent at (1, e): y - e = e(x - 1) -> y = ex, passes through origin
    chk(E * 0, 0);
    b.tf({
      d: 3, skill: "ANALYSIS", calculator: false,
      stem: t`The tangent to the curve $y = \mathrm{e}^x$ at the point $(1, \mathrm{e})$ passes through the origin.`,
      answer: true,
      explanation: t`True. The gradient at $x = 1$ is $\mathrm{e}^1 = \mathrm{e}$, so the tangent is $y - \mathrm{e} = \mathrm{e}(x - 1)$, which simplifies to $y = \mathrm{e}x$. When $x = 0$, $y = 0$.`,
      hints: [t`Find the tangent's equation and simplify.`],
    });
  }

  {
    const fp = (x) => -2 * Math.sin(x);
    checkDeriv((x) => 2 * Math.cos(x), fp, XS); chk(fp(Math.PI / 2), -2);
    b.expr({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`Find the equation of the tangent to the curve $y = 2\cos x$ at the point where $x = \dfrac{\pi}{2}$. Give your answer exactly in the form y = mx + c (type π or pi).`,
      accepted: ["y=-2x+π", "y=π-2x", "y=-2x+pi", "y=pi-2x"],
      wrong: ["y=-2x", "y=2x-π"],
      explanation: t`At $x = \frac{\pi}{2}$: $y = 2\cos\frac{\pi}{2} = 0$, and $\frac{dy}{dx} = -2\sin x = -2$. Tangent: $y - 0 = -2\left(x - \frac{\pi}{2}\right)$, so $y = -2x + \pi$.`,
      hints: [t`$\cos\frac{\pi}{2} = 0$ and $\sin\frac{\pi}{2} = 1$.`],
    });
  }

  {
    chk(1 + 2 * 2, 5);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`Which is the equation of the normal to the curve $y = x^2 + 1$ at the point $(1, 2)$?`,
      options: [
        [t`$x + 2y = 5$`, t`Correct: tangent gradient 2, normal gradient $-\frac{1}{2}$; $y - 2 = -\frac{1}{2}(x - 1)$.`],
        [t`$2x - y = 0$`, t`This line has gradient 2: it is the tangent, $y = 2x$.`],
        [t`$x - 2y = -3$`, t`This has gradient $+\frac{1}{2}$: the reciprocal was taken but the sign was not changed.`],
        [t`$2x + y = 4$`, t`This has gradient $-2$: the sign was changed but the gradient was not inverted.`],
      ],
      answer: "A",
      explanation: t`$\frac{dy}{dx} = 2x = 2$ at $x = 1$; the normal has gradient $-\frac{1}{2}$. $y - 2 = -\frac{1}{2}(x - 1)$ gives $2y - 4 = -x + 1$, so $x + 2y = 5$.`,
      hints: ["Check each option's gradient and whether it passes through (1, 2)."],
    });
  }

  {
    const f = (x) => x * x - 4 * x + 3;
    const x0 = 3;
    chk(2 * x0 - 4, 2); chk(f(x0), 0);
    const k = f(x0) - 2 * x0;
    chk(k, -6);
    b.num({
      d: 4, skill: "ANALYSIS", calculator: false,
      stem: t`The line $y = 2x + k$ is a tangent to the curve $y = x^2 - 4x + 3$. Find the value of the constant $k$.`,
      value: k, prefix: "k =", wrong: [6, 3],
      explanation: t`The tangent has gradient 2, so $2x - 4 = 2$ and $x = 3$. The point of contact is $(3, 0)$. Substituting into $y = 2x + k$: $0 = 6 + k$, so $k = -6$. (Check: $x^2 - 4x + 3 = 2x - 6$ gives $(x - 3)^2 = 0$, a repeated root.)`,
      hints: ["Find where the curve has gradient 2.", "That point lies on the line too."],
    });
  }

  {
    const f = (x) => x ** 3;
    // tangent at (1,1): y = 3x - 2 ; x^3 - 3x + 2 = (x - 1)^2 (x + 2)
    for (const x of [-3, 0.5, 4]) chk(x ** 3 - 3 * x + 2, (x - 1) ** 2 * (x + 2), 1e-9);
    chk(f(-2), -8); chk(3 * -2 - 2, -8);
    b.proof({
      d: 4, skill: "ANALYSIS", calculator: false, marks: 4,
      stem: t`Show that the tangent to the curve $y = x^3$ at the point $(1, 1)$ meets the curve again at the point $(-2, -8)$.`,
      points: [
        t`M1 finds the gradient $3x^2 = 3$ at $x = 1$.`,
        t`A1 obtains the tangent $y = 3x - 2$.`,
        t`M1 solves $x^3 = 3x - 2$, using the factor $(x - 1)^2$: $(x - 1)^2(x + 2) = 0$.`,
        t`A1 obtains $x = -2$, $y = -8$, and checks it lies on both.`,
      ],
      modelAnswer: t`$$
\frac{dy}{dx} = 3x^2 = 3 \text{ at } x = 1, \qquad y - 1 = 3(x - 1) \Rightarrow y = 3x - 2
$$

$$
x^3 = 3x - 2 \Rightarrow x^3 - 3x + 2 = 0 \Rightarrow (x - 1)^2(x + 2) = 0
$$

$$
x = -2: \quad y = 3(-2) - 2 = -8 = (-2)^3
$$`,
      explanation: "The point of contact gives a repeated root; the remaining factor gives the second intersection.",
      hints: [t`$x = 1$ is a double root of $x^3 - 3x + 2 = 0$.`],
    });
  }

  {
    const f = (x) => x * x - 4 * x + 5;
    chk(f(3), 2); chk(2 * 3 - 4, 2);
    // tangent y = 2x - 4 ; normal x + 2y = 7 -> y-intercepts -4 and 3.5
    chk(2 * 3 - 4, 2); chk(3 + 2 * 2, 7);
    const area = 0.5 * (3.5 - -4) * 3;
    chk(area, 11.25);
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
      stem: t`The point $P(3, 2)$ lies on the curve $y = x^2 - 4x + 5$.`,
      parts: [
        P.fib({ label: "(a)", marks: 2, stem: t`Find the equation of the tangent at $P$ in the form $y = mx + c$.`, template: "m = {{blank:m}}, c = {{blank:c}}",
          blanks: [{ id: "m", input: "number", accepted: [2], wrong: "5" }, { id: "c", input: "number", accepted: [-4], wrong: "2" }],
          explanation: t`$\frac{dy}{dx} = 2x - 4 = 2$ at $x = 3$. $y - 2 = 2(x - 3)$, so $y = 2x - 4$.` }),
        P.fib({ label: "(b)", marks: 2, stem: t`Find the equation of the normal at $P$ in the form $x + ay = b$.`, template: "a = {{blank:a}}, b = {{blank:b}}",
          blanks: [{ id: "a", input: "number", accepted: [2], wrong: "-2" }, { id: "b", input: "number", accepted: [7], wrong: "1" }],
          explanation: t`Normal gradient $-\frac{1}{2}$: $y - 2 = -\frac{1}{2}(x - 3)$, so $2y - 4 = -x + 3$ and $x + 2y = 7$.` }),
        P.num({ label: "(c)", marks: 3, stem: t`The tangent and the normal meet the $y$-axis at $A$ and $B$. Find the exact area of triangle $PAB$.`, value: area, dp: 2, unit: "units²", wrong: [22.5, 5.25],
          explanation: t`$A = (0, -4)$ and $B = (0, 3.5)$, so $AB = 7.5$. The height is the $x$-coordinate of $P$, 3. Area $= \frac{1}{2} \times 7.5 \times 3 = 11.25$.` }),
      ],
      explanation: "Point and gradient give the tangent; the negative reciprocal gives the normal; the y-intercepts give a vertical base.",
      hints: ["Normal gradient = −1 ÷ 2.", "Put x = 0 in each line for A and B."],
    });
  }

  {
    const f = (x) => x + 4 / x, fp = (x) => 1 - 4 / (x * x);
    checkDeriv(f, fp, XS); chk(f(1), 5); chk(fp(1), -3);
    // normal: y - 5 = (1/3)(x - 1) -> x - 3y + 14 = 0
    chk(1 - 15 + 14, 0);
    same(quad.roots(1, -7, 6), [1, 6]);
    chk(f(6), 20 / 3); chk((6 + 14) / 3, 20 / 3);
    chk(fp(6), 8 / 9);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
      stem: t`The curve $C$ has equation $y = x + \dfrac{4}{x}$, $x > 0$. The point $P$ on $C$ has $x$-coordinate $1$.`,
      parts: [
        P.proof({ label: "(a)", marks: 2, stem: t`Show that the gradient of $C$ at $P$ is $-3$.`,
          points: [t`M1 differentiates: $\frac{dy}{dx} = 1 - 4x^{-2}$.`, t`A1 substitutes $x = 1$ to get $1 - 4 = -3$.`],
          modelAnswer: t`$$
y = x + 4x^{-1} \Rightarrow \frac{dy}{dx} = 1 - 4x^{-2} = 1 - \frac{4}{x^2}, \qquad x = 1: \ 1 - 4 = -3
$$`,
          explanation: "Rewrite 4/x as a power, differentiate, substitute." }),
        P.fib({ label: "(b)", marks: 2, stem: t`Find the equation of the normal to $C$ at $P$ in the form $x + ay + b = 0$.`, template: "a = {{blank:a}}, b = {{blank:b}}",
          blanks: [{ id: "a", input: "number", accepted: [-3], wrong: "3" }, { id: "b", input: "number", accepted: [14], wrong: "-14" }],
          explanation: t`$P = (1, 5)$; normal gradient $\frac{1}{3}$. $y - 5 = \frac{1}{3}(x - 1)$ gives $3y - 15 = x - 1$, so $x - 3y + 14 = 0$.` }),
        P.group({ label: "(c)", stem: t`The normal meets $C$ again at the point $Q$.`, parts: [
          P.num({ label: "(i)", marks: 2, stem: t`Find the $x$-coordinate of $Q$.`, value: 6, prefix: "x =", wrong: [1],
            explanation: t`$x + \frac{4}{x} = \frac{x + 14}{3}$ gives $3x^2 + 12 = x^2 + 14x$, so $2x^2 - 14x + 12 = 0$, $x^2 - 7x + 6 = 0$, $(x - 1)(x - 6) = 0$. $x = 1$ is $P$, so $x = 6$.` }),
          P.num({ label: "(ii)", marks: 1, stem: t`Find the $y$-coordinate of $Q$. Give it as a fraction or correct to 3 significant figures.`, value: 20 / 3, wrong: [6],
            explanation: t`$y = 6 + \frac{4}{6} = \frac{20}{3}$.` }),
        ] }),
        P.num({ label: "(d)", marks: 2, stem: t`Find the gradient of $C$ at $Q$. Give it as a fraction or correct to 3 significant figures.`, value: fp(6), wrong: [-3],
          explanation: t`$1 - \frac{4}{36} = \frac{8}{9}$.` }),
      ],
      explanation: "Differentiate, form the normal, and solve the normal and curve simultaneously; the point P itself is one root.",
      hints: [t`Multiply $x + \frac{4}{x} = \frac{x + 14}{3}$ through by $3x$.`, "One root of the quadratic is x = 1 (the point P)."],
    });
  }

  b.card("DEFINITION", "Tangent", "The line touching the curve at P with the same gradient as the curve at P.");
  b.card("DEFINITION", "Normal", "The line through P perpendicular to the tangent at P.");
  b.card("FORMULA", "Line through a point", t`$y - y_1 = m(x - x_1)$`);
  b.card("FORMULA", "Normal gradient", t`$-\dfrac{1}{m}$, where $m$ is the tangent's gradient ($m_1 m_2 = -1$).`);
  b.card("CONCEPT", "Method for a tangent", "1. Point from the curve. 2. Gradient from dy/dx at that x. 3. y − y₁ = m(x − x₁).");
  b.card("FACT", "Horizontal tangent", t`If $\frac{dy}{dx} = 0$ at $(a, b)$: tangent $y = b$, normal $x = a$.`);
  b.card("CONCEPT", "Tangent parallel to a line", "Set dy/dx equal to the line's gradient and solve for x; there may be more than one point.");
  b.card("CONCEPT", "Where a tangent meets the curve again", "Solve line and curve simultaneously; the point of contact appears as a repeated root.");
  b.card("CONCEPT", "Triangle with base on an axis", "Area = ½ × base × height, where the height is the distance of the third vertex from that axis.");
});
