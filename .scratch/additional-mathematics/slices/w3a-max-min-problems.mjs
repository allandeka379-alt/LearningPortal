// W3a: amath.calculus.max-min-problems (Cambridge only: tagged to the 0606 syllabus automatically)
import { concept, P, t, chk, same, checkDeriv, quad, sfStr } from "../lib.mjs";

concept("amath.calculus.max-min-problems", { file: "calculus/max-min-problems", keyPrefix: "calculus.max-min-problems" }, (b) => {
  {
    for (const x of [3, 7.5, 12]) chk(x * (20 - x), x * ((40 - 2 * x) / 2));
    b.mcq({
      d: 2, skill: "APPLICATION", calculator: false,
      stem: t`A rectangle has sides $x$ cm and $y$ cm and perimeter 40 cm. Which expression gives its area $A$ in terms of $x$ only?`,
      options: [
        [t`$A = x(20 - x)$`, t`Correct: $2x + 2y = 40$ gives $y = 20 - x$.`],
        [t`$A = x(40 - x)$`, t`This uses $x + y = 40$; the perimeter counts each side twice.`],
        [t`$A = x(40 - 2x)$`, t`This takes $y = 40 - 2x$, forgetting to halve.`],
        [t`$A = 2x + 2y$`, "That is the perimeter, and it still contains y."],
      ],
      answer: "A",
      explanation: t`Constraint: $2x + 2y = 40$, so $y = 20 - x$ and $A = xy = x(20 - x)$, a function of $x$ alone that can be differentiated.`,
    });
  }

  {
    const A = (x) => x * (18 - x);
    chk(18 - 2 * 9, 0); chk(A(9), 81);
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: false,
      stem: t`A rectangle has perimeter 36 cm. Find the greatest possible area of the rectangle.`,
      value: A(9), unit: "cm²", wrong: [9, 324],
      explanation: t`With sides $x$ and $18 - x$: $A = 18x - x^2$, $\frac{dA}{dx} = 18 - 2x = 0$ gives $x = 9$, and $\frac{d^2A}{dx^2} = -2 < 0$ (maximum). The rectangle is a 9 cm square with area 81 cm². The value 9 is the side, not the area.`,
    });
  }

  {
    chk(14 - 2 * 7, 0); chk(7 * 7, 49);
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: false,
      stem: t`Two positive numbers have a sum of 14. Find the greatest possible value of their product.`,
      value: 49, wrong: [7, 48],
      explanation: t`Let the numbers be $x$ and $14 - x$. $P = 14x - x^2$, $\frac{dP}{dx} = 14 - 2x = 0$ gives $x = 7$; $\frac{d^2P}{dx^2} = -2 < 0$, so a maximum. $P = 7 \times 7 = 49$.`,
    });
  }

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`When asked to "find the maximum area", the value of $x$ that solves $\dfrac{dA}{dx} = 0$ is the final answer.`,
    answer: false,
    explanation: "False. The x-value only tells you where the maximum occurs. Substitute it back into the expression for A to find the maximum area, and justify that it is a maximum.",
  });

  {
    const S = (x) => x * x + (10 - x) ** 2;
    checkDeriv(S, (x) => 4 * x - 20, [1, 4, 8]);
    chk(S(5), 50);
    b.fib({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`Two numbers $x$ and $y$ satisfy $x + y = 10$. Find the value of $x$ that makes $x^2 + y^2$ as small as possible, and the least value of $x^2 + y^2$.`,
      template: "x = {{blank:x}}; least value = {{blank:s}}",
      blanks: [{ id: "x", input: "number", accepted: [5], wrong: "10" }, { id: "s", input: "number", accepted: [50], wrong: "25" }],
      explanation: t`$S = x^2 + (10 - x)^2 = 2x^2 - 20x + 100$. $\frac{dS}{dx} = 4x - 20 = 0$ gives $x = 5$; $\frac{d^2S}{dx^2} = 4 > 0$, a minimum. $S = 25 + 25 = 50$.`,
      hints: ["Replace y by 10 − x.", "Expand before differentiating."],
    });
  }

  {
    const A = (x) => x * (200 - 2 * x);
    chk(200 - 4 * 50, 0); chk(A(50), 5000);
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`Tatenda fences a rectangular vegetable garden beside a straight river bank. The bank needs no fence; the other three sides use 200 m of fencing. Find the greatest area he can enclose.`,
      value: A(50), unit: "m²", wrong: [2500, 50],
      explanation: t`Let the two sides perpendicular to the river be $x$ m; the third side is $200 - 2x$ m. $A = 200x - 2x^2$, $\frac{dA}{dx} = 200 - 4x = 0$ gives $x = 50$, and $\frac{d^2A}{dx^2} = -4 < 0$. The garden is 50 m by 100 m: 5000 m². Fencing all four sides (a square of side 50) would give 2500 m².`,
      hints: ["Only three sides need fencing.", "Write the side parallel to the river in terms of x."],
    });
  }

  {
    const r = Math.cbrt(250 / Math.PI);
    const S = (r) => 2 * Math.PI * r * r + 1000 / r;
    checkDeriv(S, (r) => 4 * Math.PI * r - 1000 / (r * r), [2, 4, 6]);
    chk(4 * Math.PI * r - 1000 / (r * r), 0, 1e-9);
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A closed cylindrical tin has volume 500 cm³. Its total surface area is $S = 2\pi r^2 + \dfrac{1000}{r}$, where $r$ cm is the radius. Find the least possible surface area, correct to 3 significant figures.`,
      value: S(r), unit: "cm²", wrong: [sfStr(r)],
      explanation: t`$\frac{dS}{dr} = 4\pi r - \frac{1000}{r^2} = 0$ gives $r^3 = \frac{250}{\pi}$, so $r = ${sfStr(r)}$. $\frac{d^2S}{dr^2} = 4\pi + \frac{2000}{r^3} > 0$, a minimum. $S = 2\pi(${sfStr(r)})^2 + \frac{1000}{${sfStr(r)}} = ${sfStr(S(r))}$ cm² (3 s.f.). The value $${sfStr(r)}$ is the radius, not the area.`,
      hints: [t`Solve $4\pi r^3 = 1000$.`, "Keep the full value of r in your calculator when finding S."],
    });
  }

  {
    const S = (r) => Math.PI * r * r + (54 * Math.PI) / r;
    checkDeriv(S, (r) => 2 * Math.PI * r - (54 * Math.PI) / (r * r), [1, 2, 4]);
    chk(2 * Math.PI * 3 - (54 * Math.PI) / 9, 0);
    b.num({
      d: 4, skill: "APPLICATION", calculator: false,
      stem: t`An open cylindrical water trough (no lid) has volume $27\pi$ m³. Show that its surface area is $S = \pi r^2 + \dfrac{54\pi}{r}$, and find the radius $r$ that makes $S$ a minimum.`,
      value: 3, unit: "m", prefix: "r =", wrong: [27, 9],
      explanation: t`$\pi r^2 h = 27\pi$ gives $h = \frac{27}{r^2}$. Surface (base + curved side): $S = \pi r^2 + 2\pi r \cdot \frac{27}{r^2} = \pi r^2 + \frac{54\pi}{r}$. $\frac{dS}{dr} = 2\pi r - \frac{54\pi}{r^2} = 0$ gives $r^3 = 27$, $r = 3$. $\frac{d^2S}{dr^2} = 2\pi + \frac{108\pi}{r^3} > 0$, a minimum.`,
      hints: ["An open cylinder has one circular end only.", t`Use $V = \pi r^2 h$ to replace $h$.`],
    });
  }

  {
    const A = (r) => 0.5 * r * (40 - 2 * r);
    checkDeriv(A, (r) => 20 - 2 * r, [3, 8, 15]);
    chk(A(10), 100); chk((40 - 20) / 10, 2);
    b.fib({
      d: 4, skill: "ANALYSIS", calculator: false,
      stem: t`A piece of wire 40 cm long is bent into the shape of a sector of a circle with radius $r$ cm and angle $\theta$ radians. Find the value of $r$ that gives the greatest area, the corresponding value of $\theta$, and the greatest area.`,
      template: "r = {{blank:r}}, θ = {{blank:th}}, greatest area = {{blank:a}} cm²",
      blanks: [
        { id: "r", input: "number", accepted: [10], wrong: "20" },
        { id: "th", input: "number", accepted: [2], wrong: "1" },
        { id: "a", input: "number", accepted: [100], wrong: "200" },
      ],
      explanation: t`Perimeter: $2r + r\theta = 40$, so $r\theta = 40 - 2r$. Area $A = \frac{1}{2}r^2\theta = \frac{1}{2}r(40 - 2r) = 20r - r^2$. $\frac{dA}{dr} = 20 - 2r = 0$ gives $r = 10$; $\frac{d^2A}{dr^2} = -2 < 0$, a maximum. Then $10\theta = 20$, $\theta = 2$, and $A = 200 - 100 = 100$ cm².`,
      hints: [t`The perimeter of a sector is $2r + r\theta$.`, t`Area $= \frac{1}{2}r^2\theta = \frac{1}{2}r(r\theta)$.`],
    });
  }

  {
    const C = (x) => 3 * x + 75 / x;
    checkDeriv(C, (x) => 3 - 75 / (x * x), [2, 5, 9]);
    chk(C(5), 30);
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`The daily cost, in US dollars, of running a borehole pump at setting $x$ is $C = 3x + \dfrac{75}{x}$, for $x > 0$. Find the least daily cost.`,
      value: C(5), wrong: [5, 25],
      explanation: t`$\frac{dC}{dx} = 3 - \frac{75}{x^2} = 0$ gives $x^2 = 25$, so $x = 5$ (as $x > 0$). $\frac{d^2C}{dx^2} = \frac{150}{x^3} > 0$, a minimum. $C = 15 + 15 = 30$, so US\$30. The value 5 is the setting, not the cost.`,
      hints: ["Rewrite 75/x as 75x⁻¹ before differentiating."],
    });
  }

  {
    const A = (x) => (x * (60 - 3 * x)) / 2;
    checkDeriv(A, (x) => (60 - 6 * x) / 2, [2, 6, 14]);
    chk(A(10), 150);
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`Rudo has 60 m of fencing to make a rectangular goat pen divided into two equal parts by an extra fence parallel to one pair of sides. With the three parallel fences each $x$ m long and the other two sides $y$ m long, $3x + 2y = 60$. Find the greatest total area of the pen.`,
      value: A(10), unit: "m²", wrong: [10, 225],
      explanation: t`$y = \frac{60 - 3x}{2}$, so $A = xy = 30x - \frac{3}{2}x^2$. $\frac{dA}{dx} = 30 - 3x = 0$ gives $x = 10$, $y = 15$, and $A = 150$ m². The value 225 comes from ignoring the dividing fence ($2x + 2y = 60$).`,
      hints: ["Use the constraint to write y in terms of x."],
    });
  }

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`For Rudo's pen, $A = 30x - \frac{3}{2}x^2$ and $A = 150$ when $x = 10$. Which statement correctly justifies that 150 m² is a maximum?`,
    options: [
      [t`$\frac{d^2A}{dx^2} = -3 < 0$, so the stationary value is a maximum`, t`Correct: the second derivative of $30x - \frac{3}{2}x^2$ is $-3$.`],
      [t`$\frac{dA}{dx} = 0$ at $x = 10$, so it is a maximum`, "A zero gradient shows the point is stationary, not which kind of stationary point it is."],
      [t`$A = 150 > 0$, so the stationary value is a maximum`, "A positive area says nothing about whether it is a maximum or a minimum."],
      [t`$\frac{d^2A}{dx^2} = 3 > 0$, so the stationary value is a maximum`, "The sign is wrong, and a positive second derivative would mean a minimum."],
    ],
    answer: "A",
    explanation: t`$\frac{dA}{dx} = 30 - 3x$ and $\frac{d^2A}{dx^2} = -3$, which is negative, so $x = 10$ gives a maximum.`,
    hints: ["The nature comes from the second derivative (or a change of sign)."],
  });

  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 4,
    stem: t`A rectangle has a fixed perimeter $p$. Prove that its area is greatest when the rectangle is a square.`,
    points: [
      t`M1 lets the sides be $x$ and $\frac{p}{2} - x$, so $A = \frac{p}{2}x - x^2$.`,
      t`M1 differentiates: $\frac{dA}{dx} = \frac{p}{2} - 2x$, and sets it to 0: $x = \frac{p}{4}$.`,
      t`M1 shows $\frac{d^2A}{dx^2} = -2 < 0$, so it is a maximum.`,
      t`A1 notes the other side is $\frac{p}{2} - \frac{p}{4} = \frac{p}{4}$, so both sides are equal: a square.`,
    ],
    modelAnswer: t`Let one side be $x$. Then $2x + 2y = p$ gives $y = \frac{p}{2} - x$.

$$
A = x\left(\frac{p}{2} - x\right) = \frac{p}{2}x - x^2, \qquad \frac{dA}{dx} = \frac{p}{2} - 2x = 0 \Rightarrow x = \frac{p}{4}
$$

$$
\frac{d^2A}{dx^2} = -2 < 0 \Rightarrow \text{maximum}
$$

Then $y = \frac{p}{2} - \frac{p}{4} = \frac{p}{4} = x$, so the rectangle of greatest area is a square.`,
    explanation: "Treat p as a constant: the same method as a numerical problem, with letters.",
    hints: ["p is a constant, so differentiate with respect to x only."],
  });

  b.manualShort({
    d: 3, skill: "EVALUATION", calculator: false, marks: 2,
    stem: t`In a box problem, $V = x(30 - 2x)^2$ and $\frac{dV}{dx} = 0$ when $x = 5$ or $x = 15$. Explain why $x = 15$ must be rejected.`,
    points: [
      t`States that at $x = 15$ the base side $30 - 2x$ is 0 (and for $x > 15$ it would be negative).`,
      "Concludes that the box would have zero volume, so x = 15 is not a practical solution (it gives a minimum, V = 0).",
    ],
    modelAnswer: "When x = 15 the base has side 30 − 30 = 0, so there is no box and the volume is 0. That stationary value is a minimum, not the maximum required, so x = 15 is rejected.",
    explanation: "Check every stationary value against the physical situation.",
    hints: ["What is the length of the base when x = 15?"],
  });

  {
    const V = (x) => x * (16 - 2 * x) * (10 - 2 * x);
    const Vp = (x) => 12 * x * x - 104 * x + 160, Vpp = (x) => 24 * x - 104;
    checkDeriv(V, Vp, [1, 2.5, 4]); checkDeriv(Vp, Vpp, [1, 2.5, 4]);
    for (const x of [1, 3]) chk(V(x), 4 * x ** 3 - 52 * x * x + 160 * x);
    same(quad.roots(3, -26, 40), [2, 20 / 3]);
    chk(V(2), 144); chk(Vpp(2), -56);
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
      stem: t`An open box is made from a rectangular sheet of metal 16 cm by 10 cm by cutting a square of side $x$ cm from each corner and folding up the sides.`,
      parts: [
        P.proof({ label: "(a)", marks: 2, stem: t`Show that the volume of the box is $V = 4x^3 - 52x^2 + 160x$.`,
          points: [t`M1 writes $V = x(16 - 2x)(10 - 2x)$.`, t`A1 expands correctly to the given result.`],
          modelAnswer: t`$$
V = x(16 - 2x)(10 - 2x) = x(160 - 52x + 4x^2) = 4x^3 - 52x^2 + 160x
$$`,
          explanation: "Length 16 − 2x, width 10 − 2x, height x." }),
        P.num({ label: "(b)", marks: 3, stem: t`Find the value of $x$ for which $V$ has a stationary value that is possible for the box.`, value: 2, prefix: "x =", wrong: [20 / 3],
          explanation: t`$\frac{dV}{dx} = 12x^2 - 104x + 160 = 4(3x^2 - 26x + 40) = 4(3x - 20)(x - 2) = 0$, so $x = 2$ or $x = \frac{20}{3}$.` }),
        P.mcq({ label: "(c)", marks: 1, stem: t`Why is $x = \frac{20}{3}$ rejected?`,
          options: [
            [t`The width $10 - 2x$ would be negative`, t`Correct: $10 - \frac{40}{3} = -\frac{10}{3}$.`],
            [t`It is not a whole number`, "Lengths need not be whole numbers."],
            [t`The length $16 - 2x$ would be negative`, t`$16 - \frac{40}{3} = \frac{8}{3}$ is still positive.`],
            [t`It makes $\frac{dV}{dx}$ undefined`, t`$\frac{dV}{dx} = 0$ there; it is defined.`],
          ], answer: "A", explanation: t`$x$ must be less than 5, because the width is $10 - 2x$.` }),
        P.num({ label: "(d)", marks: 2, stem: t`Find the value of $\dfrac{d^2V}{dx^2}$ at your value of $x$, and hence state the nature of the stationary value.`, value: Vpp(2), wrong: [56],
          explanation: t`$\frac{d^2V}{dx^2} = 24x - 104 = -56 < 0$ at $x = 2$: a maximum.` }),
        P.num({ label: "(e)", marks: 1, stem: "Find the maximum volume of the box.", value: V(2), unit: "cm³", wrong: [160],
          explanation: t`$V = 2 \times 12 \times 6 = 144$ cm³.` }),
      ],
      explanation: "Model the volume, find the stationary values, reject the impossible one, justify the maximum and answer in context.",
      hints: [t`Factorise $3x^2 - 26x + 40$.`, "The width 10 − 2x must stay positive."],
    });
  }

  {
    const S = (x) => x * x + 128 / x;
    const Sp = (x) => 2 * x - 128 / (x * x), Spp = (x) => 2 + 256 / x ** 3;
    checkDeriv(S, Sp, [2, 3, 6]); checkDeriv(Sp, Spp, [2, 3, 6]);
    chk(Sp(4), 0); chk(Spp(4), 6); chk(S(4), 48); chk(32 / 16, 2);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
      stem: t`An open-topped water tank is a cuboid with a square base of side $x$ m and height $h$ m. Its volume is 32 m³.`,
      parts: [
        P.proof({ label: "(a)", marks: 3, stem: t`Show that the area of metal used, $S$ m², is given by $S = x^2 + \dfrac{128}{x}$.`,
          points: [t`M1 uses $x^2h = 32$ to write $h = \frac{32}{x^2}$.`, t`M1 writes $S = x^2 + 4xh$ (base and four sides, no top).`, t`A1 substitutes to reach $x^2 + \frac{128}{x}$.`],
          modelAnswer: t`$$
x^2 h = 32 \Rightarrow h = \frac{32}{x^2}
$$

$$
S = x^2 + 4xh = x^2 + 4x \times \frac{32}{x^2} = x^2 + \frac{128}{x}
$$`,
          explanation: "Constraint from the volume, then substitute into the area." }),
        P.num({ label: "(b)", marks: 3, stem: t`Find the value of $x$ for which $S$ is stationary.`, value: 4, prefix: "x =", wrong: [8],
          explanation: t`$\frac{dS}{dx} = 2x - \frac{128}{x^2} = 0$ gives $x^3 = 64$, so $x = 4$.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Find $\dfrac{d^2S}{dx^2}$ at this value of $x$, showing that $S$ is a minimum.`, value: Spp(4), wrong: [-2],
          explanation: t`$\frac{d^2S}{dx^2} = 2 + \frac{256}{x^3} = 2 + 4 = 6 > 0$: a minimum.` }),
        P.num({ label: "(d)", marks: 2, stem: "Find the least area of metal needed.", value: S(4), unit: "m²", wrong: [16],
          explanation: t`$S = 16 + \frac{128}{4} = 16 + 32 = 48$ m².` }),
        P.num({ label: "(e)", marks: 1, stem: "Find the height of the tank in this case.", value: 2, unit: "m", prefix: "h =", wrong: [8],
          explanation: t`$h = \frac{32}{16} = 2$ m.` }),
      ],
      explanation: "Use the volume to eliminate h, minimise the area, justify with the second derivative and answer in context.",
      hints: ["An open tank has a base and four sides but no top.", t`$x^3 = 64$.`],
    });
  }

  b.card("CONCEPT", "Optimisation method", "1. Variables and diagram. 2. Objective in one variable (use the constraint). 3. Derivative = 0. 4. Justify max/min. 5. Answer in context.");
  b.card("DEFINITION", "Constraint", "A fixed condition (fixed perimeter, fixed volume) used to eliminate one variable.");
  b.card("FACT", "Fixed perimeter rectangle", "The area is greatest when the rectangle is a square.");
  b.card("FORMULA", "Closed cylinder surface area", t`$S = 2\pi r^2 + 2\pi rh$; with volume $V$, $h = \frac{V}{\pi r^2}$.`, "Not in Cambridge's List of formulas.");
  b.card("FORMULA", "Sector", t`Perimeter $2r + r\theta$; area $\frac{1}{2}r^2\theta$ ($\theta$ in radians).`, "Not in Cambridge's List of formulas.");
  b.card("CONCEPT", "Rejecting a stationary value", "Reject values that make a length zero or negative, or lie outside the domain of the problem.");
  b.card("CONCEPT", "Answer the question asked", "'Find the maximum area' needs the area, not just the x that gives it; include units.");
  b.card("FACT", "Box from a square sheet of side a", t`Cutting squares of side $x$: $V = x(a - 2x)^2$, maximum at $x = \frac{a}{6}$.`);
});
