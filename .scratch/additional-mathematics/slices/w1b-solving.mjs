// W1b: amath.quadratics.solving
import { concept, P, t, chk, same, quad, poly, sfStr, steps, money } from "../lib.mjs";

concept("amath.quadratics.solving", { file: "quadratics/solving", keyPrefix: "quadratics.solving" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "Which of these equations is a quadratic equation in $x$?",
    options: [
      [t`$x(x - 4) = 9$`, "Correct: expanding gives $x^2 - 4x - 9 = 0$, with highest power 2."],
      [t`$4x - 9 = 2x$`, "The highest power of $x$ is 1: this is a linear equation."],
      [t`$x^3 = 4x^2$`, "The highest power of $x$ is 3: this is a cubic equation."],
      [t`$\frac{4}{x} = 9$`, "Multiplying by $x$ gives $4 = 9x$, which is linear."],
    ],
    answer: "A",
    explanation: t`A quadratic equation can be written as $ax^2 + bx + c = 0$ with $a \neq 0$. Expand and rearrange before deciding: $x(x - 4) = 9$ becomes $x^2 - 4x - 9 = 0$.`,
  });

  same(poly.rationalRoots(poly.mul([1, -3], [2, 5])), [-2.5, 3]);
  b.mcq({
    d: 1, skill: "UNDERSTANDING", calculator: false,
    stem: t`Solve $(x - 3)(2x + 5) = 0$.`,
    options: [
      [t`$x = 3$ or $x = -\frac{5}{2}$`, t`Correct: $x - 3 = 0$ gives $x = 3$ and $2x + 5 = 0$ gives $x = -\frac{5}{2}$.`],
      [t`$x = -3$ or $x = \frac{5}{2}$`, "Both signs are reversed: set each bracket equal to zero and solve."],
      [t`$x = 3$ or $x = -5$`, "From $2x + 5 = 0$ you must also divide by 2."],
      [t`$x = 3$ or $x = -\frac{2}{5}$`, t`The fraction is upside down: $2x = -5$ gives $x = -\frac{5}{2}$.`],
    ],
    answer: "A",
    explanation: t`By the zero-product rule, $x - 3 = 0$ or $2x + 5 = 0$, so $x = 3$ or $x = -\frac{5}{2}$.`,
  });

  same(poly.rationalRoots([1, -2, -24]), [-4, 6]);
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Solve $x^2 - 2x - 24 = 0$. Give the roots in ascending order.`,
    template: "x = {{blank:a}} or x = {{blank:b}}",
    blanks: [
      { id: "a", input: "number", accepted: [-4], wrong: "4" },
      { id: "b", input: "number", accepted: [6], wrong: "-6" },
    ],
    explanation: t`Two numbers with product $-24$ and sum $-2$ are $-6$ and $4$, so $(x - 6)(x + 4) = 0$ and $x = -4$ or $x = 6$.`,
  });

  same(poly.rationalRoots([1, 3, -40]), [-8, 5]);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Find the positive root of $x^2 + 3x - 40 = 0$.`,
    value: 5, prefix: "x =", wrong: [8, -8],
    explanation: t`$(x + 8)(x - 5) = 0$, so $x = -8$ or $x = 5$. The positive root is $x = 5$.`,
  });

  same(poly.rationalRoots([2, -7, 3]), [0.5, 3]);
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Solve $2x^2 = 7x - 3$.`,
    options: [
      [t`$x = \frac{1}{2}$ or $x = 3$`, "Correct: $2x^2 - 7x + 3 = (2x - 1)(x - 3) = 0$."],
      [t`$x = -\frac{1}{2}$ or $x = -3$`, "These are the roots of $2x^2 + 7x + 3 = 0$: the signs were not changed when the terms were moved across."],
      [t`$x = 1$ or $x = 6$`, "These are the roots of $x^2 - 7x + 6 = 0$: the coefficient 2 was dropped."],
      [t`$x = 2$ or $x = \frac{1}{3}$`, "These come from $(x - 2)(3x - 1)$, which expands to $3x^2 - 7x + 2$, not $2x^2 - 7x + 3$."],
    ],
    answer: "A",
    explanation: t`Rearrange first: $2x^2 - 7x + 3 = 0$. Then $(2x - 1)(x - 3) = 0$, so $x = \frac{1}{2}$ or $x = 3$.`,
  });

  // x^2 + 10x + 18 = (x + 5)^2 - 7
  const cs = quad.completeSquare(1, 10, 18);
  chk(cs.p, 5); chk(cs.q, -7);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`By completing the square, solve $x^2 + 10x + 18 = 0$. Write the roots in the form $x = p \pm \sqrt{q}$, where $p$ and $q$ are integers.`,
    template: "p = {{blank:p}}, q = {{blank:q}}",
    blanks: [
      { id: "p", input: "number", accepted: [-5], wrong: "5" },
      { id: "q", input: "number", accepted: [7], wrong: "43" },
    ],
    explanation: t`$x^2 + 10x = (x + 5)^2 - 25$, so $(x + 5)^2 - 7 = 0$, $(x + 5)^2 = 7$ and $x = -5 \pm \sqrt{7}$. So $p = -5$, $q = 7$.`,
    hints: [t`Half of 10 is 5: start with $(x + 5)^2$.`, t`$(x + 5)^2 = x^2 + 10x + 25$, so subtract 25.`],
  });

  const r6 = quad.roots(3, -7, 1);
  chk(r6[1], (7 + Math.sqrt(37)) / 6);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Solve $3x^2 - 7x + 1 = 0$ and give the **larger** root correct to 3 significant figures.`,
    value: r6[1], prefix: "x =", wrong: [sfStr(r6[0]), sfStr((-7 + Math.sqrt(37)) / 6)],
    explanation: t`$a = 3$, $b = -7$, $c = 1$, so $b^2 - 4ac = 49 - 12 = 37$ and $x = \dfrac{7 \pm \sqrt{37}}{6}$. The larger root is $\dfrac{7 + \sqrt{37}}{6} = ${sfStr(r6[1])}$ (3 s.f.); the smaller is $${sfStr(r6[0])}$.`,
    workedSolution: steps(t`$a = 3$, $b = -7$, $c = 1$.`, t`$b^2 - 4ac = (-7)^2 - 4(3)(1) = 37$.`, t`$x = \dfrac{-(-7) \pm \sqrt{37}}{2(3)} = \dfrac{7 \pm \sqrt{37}}{6}$.`, t`Larger root: $x = ${sfStr(r6[1])}$ (3 s.f.).`),
    hints: ["Use the quadratic formula; $-b$ is $+7$.", "The larger root uses the + sign."],
  });

  const r7 = quad.roots(2, 5, -4);
  chk(r7[0], (-5 - Math.sqrt(57)) / 4);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Solve $2x^2 + 5x - 4 = 0$ and give the **negative** root correct to 3 significant figures.`,
    value: r7[0], prefix: "x =", wrong: [sfStr(r7[1]), sfStr((-5 - Math.sqrt(57)) / 2)],
    explanation: t`$b^2 - 4ac = 25 + 32 = 57$, so $x = \dfrac{-5 \pm \sqrt{57}}{4}$. The negative root is $\dfrac{-5 - \sqrt{57}}{4} = ${sfStr(r7[0])}$. Dividing by 2 instead of $2a = 4$ gives $${sfStr((-5 - Math.sqrt(57)) / 2)}$, which is wrong.`,
    workedSolution: steps(t`$a = 2$, $b = 5$, $c = -4$.`, t`$b^2 - 4ac = 25 - 4(2)(-4) = 57$.`, t`$x = \dfrac{-5 \pm \sqrt{57}}{4}$.`, t`Negative root: $x = \dfrac{-5 - 7.5498\ldots}{4} = ${sfStr(r7[0])}$ (3 s.f.).`),
    hints: ["The denominator is $2a$, which is 4 here.", "Take the minus sign to get the negative root."],
  });

  chk(quad.disc(1, -6, 4), 20);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the exact roots of $x^2 - 6x + 4 = 0$.`,
    options: [
      [t`$3 \pm \sqrt{5}$`, t`Correct: $x = \frac{6 \pm \sqrt{20}}{2} = \frac{6 \pm 2\sqrt{5}}{2} = 3 \pm \sqrt{5}$.`],
      [t`$-3 \pm \sqrt{5}$`, t`The sign of $-b$ is wrong: $b = -6$, so $-b = 6$.`],
      [t`$3 \pm 2\sqrt{5}$`, t`Only the 6 was divided by 2; the surd term $2\sqrt{5}$ must be halved too.`],
      [t`$6 \pm 2\sqrt{5}$`, t`This forgets to divide by $2a = 2$.`],
    ],
    answer: "A",
    explanation: t`$b^2 - 4ac = 36 - 16 = 20$ and $\sqrt{20} = 2\sqrt{5}$, so $x = \dfrac{6 \pm 2\sqrt{5}}{2} = 3 \pm \sqrt{5}$. Check: the sum of the roots is 6 and the product is $9 - 5 = 4$.`,
    hints: ["Simplify $\\sqrt{20}$ first.", "Divide every term of the numerator by 2."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`The equation $x^2 = 5x$ has only one solution, $x = 5$.`,
    answer: false,
    explanation: t`False. $x^2 - 5x = 0$ gives $x(x - 5) = 0$, so $x = 0$ or $x = 5$. Dividing both sides by $x$ loses the root $x = 0$.`,
  });

  same(poly.rationalRoots(poly.sub(poly.mul([1, 0], [1, 4]), poly.mul([3], [1, 4]))), [-4, 3]);
  b.fib({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`Solve $x(x + 4) = 3(x + 4)$. Give both roots in ascending order.`,
    template: "x = {{blank:a}} or x = {{blank:b}}",
    blanks: [
      { id: "a", input: "number", accepted: [-4], wrong: "3" },
      { id: "b", input: "number", accepted: [3], wrong: "4" },
    ],
    explanation: t`Do not divide by $x + 4$. Instead $x(x + 4) - 3(x + 4) = 0$, so $(x + 4)(x - 3) = 0$ and $x = -4$ or $x = 3$.`,
    hints: [t`Bring everything to one side and take out the common factor $(x + 4)$.`],
  });

  // 6/x - 6/(x+1) = 1 -> x^2 + x - 6 = 0
  for (const x of [2, -3]) chk(6 / x - 6 / (x + 1), 1);
  same(poly.rationalRoots([1, 1, -6]), [-3, 2]);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Solve $\dfrac{6}{x} - \dfrac{6}{x + 1} = 1$ and give the **positive** solution.`,
    value: 2, prefix: "x =", wrong: [3, -3],
    explanation: t`Multiply by $x(x + 1)$: $6(x + 1) - 6x = x(x + 1)$, so $6 = x^2 + x$ and $x^2 + x - 6 = 0$. Then $(x + 3)(x - 2) = 0$, giving $x = -3$ or $x = 2$. The positive solution is $x = 2$.`,
    hints: [t`Multiply every term by $x(x + 1)$.`, t`You should reach $x^2 + x - 6 = 0$.`],
  });

  // Truck: 300/v - 300/(v + 15) = 1 -> v^2 + 15v - 4500 = 0
  same(poly.rationalRoots([1, 15, -4500]), [-75, 60]);
  chk(300 / 60 - 300 / 75, 1);
  b.calc({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`A delivery truck makes a 300 km journey from Harare at an average speed of $v$ km/h. If its average speed were 15 km/h greater, the journey would take 1 hour less. Form an equation in $v$ and solve it to find $v$.`,
    value: 60, unit: "km/h", prefix: "v =", wrong: [75, -75],
    explanation: t`Time $= \frac{300}{v}$ at the actual speed and $\frac{300}{v + 15}$ at the faster speed, so $\frac{300}{v} - \frac{300}{v + 15} = 1$. Multiplying by $v(v + 15)$: $300(v + 15) - 300v = v(v + 15)$, so $v^2 + 15v - 4500 = 0$, $(v + 75)(v - 60) = 0$ and $v = 60$ (a speed cannot be negative).`,
    workedSolution: steps(t`Times: $\frac{300}{v}$ h and $\frac{300}{v + 15}$ h.`, t`$\frac{300}{v} - \frac{300}{v + 15} = 1$.`, t`$300(v + 15) - 300v = v(v + 15)$, so $4500 = v^2 + 15v$.`, t`$v^2 + 15v - 4500 = 0$, so $(v + 75)(v - 60) = 0$.`, t`$v = 60$ km/h; reject $v = -75$.`),
    hints: ["Time = distance ÷ speed. Write both times in terms of $v$.", "The slower journey takes longer: subtract the faster time from the slower time to get 1."],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each equation with its solutions.",
    pairs: [
      [t`$x^2 - 16 = 0$`, t`$x = -4$ or $x = 4$`],
      [t`$x^2 - 16x = 0$`, t`$x = 0$ or $x = 16$`],
      [t`$x^2 + 8x + 16 = 0$`, t`$x = -4$ only (repeated)`],
      [t`$x^2 - 8x + 16 = 0$`, t`$x = 4$ only (repeated)`],
    ],
    explanation: t`$x^2 - 16 = (x - 4)(x + 4)$; $x^2 - 16x = x(x - 16)$; $x^2 + 8x + 16 = (x + 4)^2$; $x^2 - 8x + 16 = (x - 4)^2$.`,
  });

  same(poly.rationalRoots([1, -11, 24]), [3, 8]);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`The roots of $x^2 - 11x + 24 = 0$ are $\alpha$ and $\beta$. Solve the equation and find $\alpha + \beta$.`,
    value: 11, wrong: [-11, 24],
    explanation: t`$(x - 3)(x - 8) = 0$, so the roots are 3 and 8 and their sum is 11. In general the roots of $x^2 + bx + c = 0$ add up to $-b$.`,
  });

  // x = 2 is a root of x^2 - 5x + c = 0 -> c = 6, other root 3
  chk(poly.eval([1, -5, 6], 2), 0);
  same(poly.rationalRoots([1, -5, 6]), [2, 3]);
  b.fib({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`One root of $x^2 - 5x + c = 0$ is $x = 2$. Find the value of $c$ and the other root.`,
    template: "c = {{blank:c}}, other root x = {{blank:r}}",
    blanks: [
      { id: "c", input: "number", accepted: [6], wrong: "-6" },
      { id: "r", input: "number", accepted: [3], wrong: "-3" },
    ],
    explanation: t`Substitute $x = 2$: $4 - 10 + c = 0$, so $c = 6$. Then $x^2 - 5x + 6 = (x - 2)(x - 3) = 0$, so the other root is $x = 3$.`,
    hints: ["A root satisfies the equation: substitute $x = 2$."],
  });

  b.manualShort({
    d: 3, skill: "EVALUATION", calculator: false, marks: 2,
    stem: t`Farai solves $(x - 1)(x + 2) = 10$ by writing "$x - 1 = 10$ or $x + 2 = 10$, so $x = 11$ or $x = 8$". Explain his mistake and give the correct solutions.`,
    points: [
      "States that the zero-product rule only works when the product equals zero (here it equals 10).",
      t`Rearranges to $x^2 + x - 12 = 0$, $(x + 4)(x - 3) = 0$ and gives $x = -4$ or $x = 3$.`,
    ],
    modelAnswer: t`If $PQ = 10$ there is no reason for either factor to be 10, so the rule only applies to a product equal to 0. Expand: $x^2 + x - 2 = 10$, so $x^2 + x - 12 = 0$, $(x + 4)(x - 3) = 0$, $x = -4$ or $x = 3$.`,
    explanation: t`Always rearrange so that one side is zero before factorising. Check: $(3 - 1)(3 + 2) = 10$ and $(-4 - 1)(-4 + 2) = 10$.`,
    hints: ["What does the zero-product rule need on the right-hand side?"],
  });

  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 3,
    stem: t`Show that the roots of $x^2 - 2kx + k^2 - 9 = 0$ are $x = k + 3$ and $x = k - 3$, where $k$ is a constant.`,
    points: [
      t`M1 recognises $x^2 - 2kx + k^2 = (x - k)^2$ (or uses the formula with $b^2 - 4ac = 36$).`,
      t`M1 reaches $(x - k)^2 = 9$, so $x - k = \pm 3$.`,
      t`A1 states both roots $x = k + 3$ and $x = k - 3$ with no errors.`,
    ],
    modelAnswer: t`$$
x^2 - 2kx + k^2 - 9 = 0
$$

$$
(x - k)^2 - 9 = 0
$$

$$
(x - k)^2 = 9
$$

$$
x - k = \pm 3
$$

So $x = k + 3$ or $x = k - 3$.`,
    explanation: t`The first three terms form a perfect square, so completing the square is immediate. With the formula: $b^2 - 4ac = 4k^2 - 4(k^2 - 9) = 36$ and $x = \frac{2k \pm 6}{2} = k \pm 3$.`,
    hints: [t`Look for a perfect square in $x^2 - 2kx + k^2$.`],
  });

  // Struct 1: garden (x + 5)(2x - 3) = 57 -> 2x^2 + 7x - 72 = 0 -> x = 4.5
  same(poly.sub(poly.mul([1, 5], [2, -3]), [57]), [2, 7, -72]);
  const g = quad.roots(2, 7, -72);
  same(g, [-8, 4.5]);
  const perim = 2 * (4.5 + 5 + (2 * 4.5 - 3));
  chk(perim, 31);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: t`A rectangular vegetable garden in Masvingo is $(x + 5)$ m long and $(2x - 3)$ m wide. Its area is $57\ \text{m}^2$.`,
    parts: [
      P.proof({ label: "(a)", marks: 2, stem: t`Show that $2x^2 + 7x - 72 = 0$.`,
        points: [t`M1 forms $(x + 5)(2x - 3) = 57$ and expands to $2x^2 + 7x - 15$.`, t`A1 rearranges to $2x^2 + 7x - 72 = 0$ with no errors.`],
        modelAnswer: t`$$
(x + 5)(2x - 3) = 57
$$

$$
2x^2 - 3x + 10x - 15 = 57
$$

$$
2x^2 + 7x - 72 = 0
$$`,
        explanation: "Area = length × width; expand and collect terms." }),
      P.num({ label: "(b)", marks: 2, stem: t`Solve the equation to find the value of $x$ for the garden.`, value: 4.5, prefix: "x =", wrong: [-8],
        explanation: t`$b^2 - 4ac = 49 + 576 = 625 = 25^2$, so $x = \frac{-7 \pm 25}{4}$: $x = 4.5$ or $x = -8$. Reject $x = -8$ because the width $2x - 3$ would be negative.` }),
      P.manual({ label: "(c)", marks: 1, stem: t`Explain why the other root of the equation is rejected.`,
        points: [t`States that $x = -8$ makes a length or width negative ($x + 5 = -3$, $2x - 3 = -19$), which is impossible.`],
        modelAnswer: t`If $x = -8$ the length would be $-3$ m, and a length cannot be negative.`, explanation: "Lengths must be positive." }),
      P.num({ label: "(d)", marks: 2, stem: "Find the perimeter of the garden.", value: perim, unit: "m", wrong: [15.5, 57],
        explanation: t`Length $= 9.5$ m, width $= 6$ m, perimeter $= 2(9.5 + 6) = 31$ m.` }),
    ],
    explanation: t`Form the equation from the area, solve it with the formula or by factorising ($(2x - 9)(x + 8) = 0$), reject the negative root and use $x = 4.5$.`,
    hints: ["Area of a rectangle = length × width.", t`$2x^2 + 7x - 72 = (2x - 9)(x + 8)$.`],
  });

  // Struct 2: 240/x - 240/(x + 2) = 10 -> x^2 + 2x - 48 = 0 -> x = 6
  same(poly.rationalRoots([1, 2, -48]), [-8, 6]);
  chk(240 / 6 - 240 / 8, 10);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`Nyasha shares ${money(240)} equally among $x$ friends. If there were 2 more friends, each would receive ${money(10)} less.`,
    parts: [
      P.proof({ label: "(a)", marks: 3, stem: t`Show that $x^2 + 2x - 48 = 0$.`,
        points: [t`M1 writes the two shares as $\frac{240}{x}$ and $\frac{240}{x + 2}$.`, t`M1 forms $\frac{240}{x} - \frac{240}{x + 2} = 10$ and multiplies through by $x(x + 2)$.`, t`A1 simplifies $480 = 10x^2 + 20x$ to $x^2 + 2x - 48 = 0$.`],
        modelAnswer: t`$$
\frac{240}{x} - \frac{240}{x + 2} = 10
$$

$$
240(x + 2) - 240x = 10x(x + 2)
$$

$$
480 = 10x^2 + 20x
$$

$$
x^2 + 2x - 48 = 0
$$`,
        explanation: "Each share is the total divided by the number of friends." }),
      P.num({ label: "(b)", marks: 2, stem: "Solve the equation to find the number of friends.", value: 6, prefix: "x =", wrong: [8, -8],
        explanation: t`$(x + 8)(x - 6) = 0$, so $x = 6$ (the number of friends cannot be $-8$).` }),
      P.num({ label: "(c)", marks: 1, stem: "How much does each friend receive?", value: 40, unit: undefined, prefix: "US$", wrong: [30],
        explanation: t`$240 \div 6 = 40$, so each friend receives ${money(40)}. (With 8 friends each would get ${money(30)}, which is ${money(10)} less.)` }),
    ],
    explanation: "Write each share in terms of $x$, form the equation, clear the fractions, solve and interpret.",
    hints: ["The share with more friends is smaller.", "Multiply every term by $x(x + 2)$."],
  });

  // Cards
  b.card("FORMULA", t`The quadratic formula for $ax^2 + bx + c = 0$`, t`$x = \dfrac{-b \pm \sqrt{b^2 - 4ac}}{2a}$`, "In Cambridge's List of formulas; learn it for ZIMSEC.");
  b.card("CONCEPT", "First step before factorising a quadratic equation", t`Rearrange so that one side is zero: $ax^2 + bx + c = 0$.`, "The zero-product rule only works for a product equal to 0.");
  b.card("FACT", t`Why must you not divide $x^2 = 3x$ by $x$?`, t`You lose the root $x = 0$. Factorise: $x(x - 3) = 0$.`);
  b.card("CONCEPT", t`$(x + p)^2 = k$ with $k > 0$ gives …`, t`$x = -p \pm \sqrt{k}$ (two roots: remember $\pm$).`);
  b.card("FACT", "Quick test: will a quadratic factorise over the integers?", t`Only if $b^2 - 4ac$ is a perfect square (0, 1, 4, 9, …).`);
  b.card("CONCEPT", t`Clearing $\dfrac{a}{x} + \dfrac{b}{x + k} = c$`, t`Multiply **every** term by $x(x + k)$, then rearrange and check no root makes a denominator zero.`);
  b.card("FACT", t`Sum and product of the roots of $x^2 + bx + c = 0$`, t`Sum $= -b$, product $= c$: a quick check of your answers.`);
  b.card("CONCEPT", "Interpreting roots in a word problem", "Reject roots that are impossible (negative lengths, times or numbers of people) and say why.");
  b.card("DEFINITION", "Root of an equation", "A value of the unknown that makes the equation true.");
});
