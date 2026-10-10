// W1a: amaths.algebra.indices-variation (ZIMSEC only) — laws of indices, exponential equations, variation.
import { concept, P, t, chk, same, quad, round } from "../lib.mjs";

concept("amaths.algebra.indices-variation", { file: "algebra/indices-variation", keyPrefix: "algebra.indices-variation" }, (b) => {
  chk(16 ** -0.75, 1 / 8, 1e-12);
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`What is the value of $16^{-\frac{3}{4}}$?`,
    options: [
      [t`$\frac{1}{8}$`, t`Correct: $\sqrt[4]{16} = 2$, $2^{3} = 8$, and the negative index gives the reciprocal.`],
      [t`$-8$`, "A negative index means a reciprocal, not a negative number."],
      [t`$8$`, "This is 16 to the power 3/4; the minus sign has been ignored."],
      [t`$-12$`, "The index has been multiplied by 16; an index is not a multiplier."],
    ],
    answer: "A",
    explanation: t`$16^{-\frac{3}{4}} = \dfrac{1}{\left(\sqrt[4]{16}\right)^{3}} = \dfrac{1}{2^{3}} = \dfrac{1}{8}$. Take the root (denominator) first, then the power (numerator), then the reciprocal.`,
  });

  chk(8 ** (2 / 3), 4, 1e-12);
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Simplify $\left(8x^{6}\right)^{\frac{2}{3}}$.`,
    options: [
      [t`$4x^{4}$`, t`Correct: $8^{\frac{2}{3}} = 4$ and $\left(x^{6}\right)^{\frac{2}{3}} = x^{4}$.`],
      [t`$\frac{16}{3}x^{4}$`, "The 8 has been multiplied by 2/3 instead of being raised to the power 2/3."],
      [t`$4x^{6}$`, "The index 2/3 applies to x⁶ as well as to 8."],
      [t`$8x^{4}$`, "The index applies to every factor in the bracket, including the 8."],
    ],
    answer: "A",
    explanation: t`The index applies to each factor: $8^{\frac{2}{3}} = \left(\sqrt[3]{8}\right)^{2} = 4$ and $\left(x^{6}\right)^{\frac{2}{3}} = x^{6 \times \frac{2}{3}} = x^{4}$.`,
  });

  const v3 = 32 ** 0.6 * 4 ** -0.5;
  chk(v3, 4, 1e-12);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Without using a calculator, evaluate $32^{\frac{3}{5}} \times 4^{-\frac{1}{2}}$.`,
    value: v3, wrong: [16, -4],
    explanation: t`$32^{\frac{3}{5}} = \left(\sqrt[5]{32}\right)^{3} = 2^{3} = 8$ and $4^{-\frac{1}{2}} = \frac{1}{2}$, so the product is $8 \times \frac{1}{2} = 4$. In powers of 2: $2^{3} \times 2^{-1} = 2^{2} = 4$.`,
  });

  // 4^(x+1) = 8^x  -> 2x + 2 = 3x -> x = 2
  chk(4 ** 3, 8 ** 2);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Solve the equation $4^{x+1} = 8^{x}$.`,
    value: 2, prefix: "x =", wrong: [1, -2],
    explanation: t`Write both sides as powers of 2: $2^{2(x+1)} = 2^{3x}$. Equate indices: $2x + 2 = 3x$, so $x = 2$. Check: $4^{3} = 64 = 8^{2}$.`,
  });

  // 25^x = 125^(2 - x) -> 2x = 6 - 3x -> x = 6/5
  const x5 = 6 / 5;
  chk(25 ** x5, 125 ** (2 - x5), 1e-9);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Solve $25^{x} = 125^{2 - x}$. Give your answer as an exact fraction or decimal.`,
    value: x5, answer: "6/5", prefix: "x =", wrong: [6, 2],
    explanation: t`$25^{x} = 5^{2x}$ and $125^{2-x} = 5^{3(2-x)} = 5^{6 - 3x}$. Equate indices: $2x = 6 - 3x$, so $5x = 6$ and $x = \frac{6}{5} = 1.2$.`,
    hints: ["Write 25 and 125 as powers of 5.", "Expand 3(2 − x) carefully before equating the indices."],
  });

  same(quad.roots(1, -10, 9), [1, 9]);
  for (const x of [0, 2]) chk(3 ** (2 * x) - 10 * 3 ** x + 9, 0);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Use the substitution $y = 3^{x}$ to solve $3^{2x} - 10\left(3^{x}\right) + 9 = 0$.`,
    template: "Smaller solution x = {{blank:a}}; larger solution x = {{blank:b}}",
    blanks: [
      { id: "a", input: "number", accepted: [0], wrong: 1 },
      { id: "b", input: "number", accepted: [2], wrong: 9 },
    ],
    explanation: t`With $y = 3^{x}$: $y^{2} - 10y + 9 = 0$, so $(y - 1)(y - 9) = 0$ and $y = 1$ or $y = 9$. Then $3^{x} = 1$ gives $x = 0$ and $3^{x} = 9$ gives $x = 2$. (A common slip is to stop at the values of $y$.)`,
    hints: [t`$3^{2x} = \left(3^{x}\right)^{2} = y^{2}$.`, "After solving for y, solve 3ˣ = y for each value."],
  });

  // 4^x − 3(2^(x+1)) − 16 = 0 -> y² − 6y − 16 = 0 -> y = 8 or −2 -> x = 3
  same(quad.roots(1, -6, -16), [-2, 8]);
  chk(4 ** 3 - 3 * 2 ** 4 - 16, 0);
  b.calc({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Solve the equation $4^{x} - 3\left(2^{x+1}\right) - 16 = 0$, explaining why any other root of your quadratic is rejected.`,
    value: 3, prefix: "x =", wrong: [8, -1],
    explanation: t`Let $y = 2^{x}$. Then $4^{x} = y^{2}$ and $2^{x+1} = 2y$, so $y^{2} - 6y - 16 = 0$, giving $(y - 8)(y + 2) = 0$. $2^{x} = 8$ gives $x = 3$. $2^{x} = -2$ is impossible because $2^{x} > 0$ for all real $x$, so that root is rejected.`,
    workedSolution: [
      t`1. Let $y = 2^{x}$: $4^{x} = \left(2^{2}\right)^{x} = y^{2}$ and $2^{x+1} = 2 \times 2^{x} = 2y$.`,
      t`2. The equation becomes $y^{2} - 6y - 16 = 0$.`,
      t`3. Factorise: $(y - 8)(y + 2) = 0$, so $y = 8$ or $y = -2$.`,
      t`4. $2^{x} = 8 = 2^{3}$ gives $x = 3$.`,
      t`5. $2^{x} = -2$ has no solution since $2^{x} > 0$; reject it.`,
    ].join("\n"),
    hints: [t`Write $2^{x+1}$ as $2 \times 2^{x}$.`, "A power of 2 can never be negative."],
  });

  b.tf({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`For $a > 0$, $\left(a^{m}\right)^{n} = a^{m+n}$.`,
    answer: false,
    explanation: t`False. A power of a power multiplies the indices: $\left(a^{m}\right)^{n} = a^{mn}$. Adding indices is the rule for $a^{m} \times a^{n}$.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`For $x > 0$, $x^{\frac{1}{2}} \times x^{-\frac{3}{2}} = \dfrac{1}{x}$.`,
    answer: true,
    explanation: t`True. $x^{\frac{1}{2}} \times x^{-\frac{3}{2}} = x^{\frac{1}{2} - \frac{3}{2}} = x^{-1} = \dfrac{1}{x}$.`,
  });

  // y = k/x², y = 5 at x = 4 -> k = 80; x = 10 -> 0.8
  const k10 = 5 * 16;
  chk(k10 / 100, 0.8, 1e-12);
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`$y$ varies inversely as the square of $x$, and $y = 5$ when $x = 4$. Find $y$ when $x = 10$.`,
    options: [
      [t`$0.8$`, t`Correct: $y = \frac{80}{x^{2}}$, so $y = \frac{80}{100} = 0.8$.`],
      [t`$2$`, t`This uses inverse variation with $x$, not $x^{2}$: $y = \frac{20}{x}$.`],
      [t`$31.25$`, t`This is direct variation with $x^{2}$: $y = \frac{5}{16}x^{2}$.`],
      [t`$12.5$`, t`This is direct variation with $x$: $y = \frac{5}{4}x$.`],
    ],
    answer: "A",
    explanation: t`$y = \dfrac{k}{x^{2}}$; $5 = \dfrac{k}{16}$ gives $k = 80$. When $x = 10$, $y = \dfrac{80}{100} = 0.8$.`,
  });

  // d = k√h; d = 18 at h = 25 -> k = 3.6; h = 64 -> 28.8
  const k11 = 18 / Math.sqrt(25);
  const d11 = k11 * Math.sqrt(64);
  chk(d11, 28.8, 1e-12);
  b.num({
    d: 3, skill: "APPLICATION", daily: true, calculator: true,
    stem: t`The distance $d$ km that Chipo can see to the horizon from a lookout in the Eastern Highlands varies as the square root of her height $h$ m above the plain. From a height of 25 m she can see 18 km. How far can she see from a height of 64 m? Give your answer to 3 significant figures.`,
    value: d11, unit: "km", wrong: [46.08, 11.25],
    explanation: t`$d = k\sqrt{h}$: $18 = k\sqrt{25} = 5k$, so $k = 3.6$. At $h = 64$: $d = 3.6 \times 8 = 28.8$ km. (Using $d = kh$ gives $46.1$ km; inverting the ratio gives $11.25$ km.)`,
    hints: ["Write d = k√h and find k from the first pair of values."],
  });

  // C = a + k n: 200 -> 330, 500 -> 690 -> k = 1.2, a = 90; n = 750 -> 990
  const k12 = (690 - 330) / (500 - 200);
  const a12 = 330 - 200 * k12;
  chk(k12, 1.2, 1e-12);
  chk(a12, 90, 1e-9);
  const c12 = a12 + 750 * k12;
  chk(c12, 990, 1e-9);
  b.fib({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: t`The cost, $C$ US dollars, of printing $n$ revision booklets for a school in Gweru is partly constant and partly varies as $n$. Printing 200 booklets costs US\$330 and printing 500 booklets costs US\$690.`,
    template: t`The constant (fixed) part is US\$ {{blank:a}}, the cost per booklet is US\$ {{blank:k}}, and 750 booklets cost US\$ {{blank:c}}.`,
    blanks: [
      { id: "a", input: "number", accepted: [a12], wrong: 0 },
      { id: "k", input: "number", accepted: [k12], wrong: 1.65 },
      { id: "c", input: "number", accepted: [c12], wrong: 1237.5 },
    ],
    explanation: t`$C = a + kn$. From $330 = a + 200k$ and $690 = a + 500k$: subtract to get $360 = 300k$, so $k = 1.2$; then $a = 330 - 240 = 90$. For $n = 750$: $C = 90 + 900 = 990$. Using $C = kn$ alone ($k = 1.65$) ignores the fixed charge.`,
    hints: ["Partial variation: C = a + kn has two constants.", "Subtract the two equations to eliminate a."],
  });

  chk(2 * 0.5 ** 2, 0.5);
  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`$y$ varies jointly as $x$ and the square of $z$. If $x$ is doubled and $z$ is halved, $y$ is multiplied by`,
    options: [
      [t`$\frac{1}{2}$`, t`Correct: $2 \times \left(\frac{1}{2}\right)^{2} = \frac{1}{2}$.`],
      [t`$1$`, "The square on z has been ignored: doubling and halving would then cancel."],
      [t`$2$`, "Halving z has been treated as having no effect."],
      [t`$\frac{1}{4}$`, "The doubling of x has been left out."],
    ],
    answer: "A",
    explanation: t`$y = kxz^{2}$. New $y = k(2x)\left(\frac{z}{2}\right)^{2} = \frac{2}{4}kxz^{2} = \frac{1}{2}y$.`,
    hints: ["Write y = kxz² and replace x by 2x and z by z/2."],
  });

  // P ∝ v³, v up 10% -> factor 1.331 -> 33.1%
  const pct14 = (1.1 ** 3 - 1) * 100;
  chk(pct14, 33.1, 1e-9);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`The power output $P$ of a wind pump on a farm near Masvingo varies as the cube of the wind speed $v$. Find the percentage increase in $P$ when $v$ increases by 10%. Give your answer to 3 significant figures.`,
    value: pct14, unit: "%", wrong: [30, 10, 21],
    explanation: t`$P = kv^{3}$. The new power is $k(1.1v)^{3} = 1.331kv^{3}$, so $P$ is multiplied by $1.331$: an increase of $33.1\%$. (30% wrongly multiplies the 10% by 3.)`,
    hints: ["Replace v by 1.1v.", "Percentage changes multiply through a power; they do not simply add."],
  });

  b.proof({
    d: 3, skill: "ANALYSIS", marks: 3, calculator: false,
    stem: t`Show that $2^{n+3} - 2^{n+1}$ is divisible by 6 for every positive integer $n$.`,
    points: [
      t`M1 takes out the common factor $2^{n+1}$ (or $2^{n}$)`,
      t`A1 obtains $2^{n+1}(4 - 1) = 3 \times 2^{n+1}$`,
      t`A1 writes it as $6 \times 2^{n}$ and concludes that it is divisible by 6`,
    ],
    modelAnswer: [
      "$$",
      t`2^{n+3} - 2^{n+1} = 2^{n+1}\left(2^{2} - 1\right)`,
      "$$",
      "$$",
      t`= 3 \times 2^{n+1} = 3 \times 2 \times 2^{n} = 6 \times 2^{n}`,
      "$$",
      t`Since $2^{n}$ is an integer for every positive integer $n$, the expression is 6 times an integer, so it is divisible by 6.`,
    ].join("\n"),
    explanation: t`Factorise using $2^{n+3} = 2^{n+1} \times 2^{2}$; the bracket $(4 - 1) = 3$ and one factor 2 from $2^{n+1}$ give the 6.`,
    hints: [t`$2^{n+3} = 2^{2} \times 2^{n+1}$.`],
  });

  chk(8 ** (2 / 3), 4, 1e-12);
  chk(8 ** (-1 / 3), 0.5, 1e-12);
  chk(8 ** (4 / 3), 16, 1e-12);
  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each power of 8 with its value.",
    pairs: [[t`$8^{\frac{2}{3}}$`, t`$4$`], [t`$8^{-\frac{1}{3}}$`, t`$\frac{1}{2}$`], [t`$8^{0}$`, t`$1$`], [t`$8^{\frac{4}{3}}$`, t`$16$`]],
    explanation: t`$\sqrt[3]{8} = 2$, so $8^{\frac{2}{3}} = 2^{2} = 4$, $8^{-\frac{1}{3}} = \frac{1}{2}$, $8^{0} = 1$ and $8^{\frac{4}{3}} = 2^{4} = 16$.`,
  });

  chk((Math.sqrt(3) + 1 / Math.sqrt(3)) ** 2, 3 + 2 + 1 / 3, 1e-12);
  b.expr({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Expand and simplify $\left(x^{\frac{1}{2}} + x^{-\frac{1}{2}}\right)^{2}$, writing your answer as a sum of three terms in $x$ (use 1/x for $x^{-1}$).`,
    accepted: ["x+2+1/x", "x+1/x+2", "2+x+1/x", "1/x+x+2", "x+2+x^-1", "x+x^-1+2", "x+2+x^(-1)"],
    wrong: ["x+1/x", "x+1+1/x"],
    explanation: t`$\left(x^{\frac{1}{2}} + x^{-\frac{1}{2}}\right)^{2} = x + 2x^{\frac{1}{2}}x^{-\frac{1}{2}} + x^{-1} = x + 2 + \dfrac{1}{x}$, because $x^{\frac{1}{2}} \times x^{-\frac{1}{2}} = x^{0} = 1$. Forgetting the middle term gives $x + \frac{1}{x}$.`,
    hints: [t`$(a + b)^{2} = a^{2} + 2ab + b^{2}$.`, t`$x^{\frac{1}{2}} \times x^{-\frac{1}{2}} = x^{0}$.`],
  });

  // 8^x = 1/4 -> 3x = -2
  chk(8 ** (-2 / 3), 0.25, 1e-12);
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Solve $8^{x} = \dfrac{1}{4}$.`,
    options: [
      [t`$x = -\frac{2}{3}$`, t`Correct: $2^{3x} = 2^{-2}$, so $3x = -2$.`],
      [t`$x = \frac{2}{3}$`, t`This solves $8^{x} = 4$; the reciprocal needs a negative index.`],
      [t`$x = -\frac{3}{2}$`, "The indices have been divided the wrong way round: 3x = −2, not −2x = 3."],
      [t`$x = -2$`, t`$8^{-2} = \frac{1}{64}$; the base 8 must be written as $2^{3}$ first.`],
    ],
    answer: "A",
    explanation: t`$8^{x} = 2^{3x}$ and $\frac{1}{4} = 2^{-2}$. Equating indices: $3x = -2$, so $x = -\frac{2}{3}$.`,
  });

  // stopping distance d = a u + b u², u = 10 -> 13, u = 20 -> 36
  const A17 = 0.8, B17 = 0.05;
  chk(A17 * 10 + B17 * 100, 13, 1e-12);
  chk(A17 * 20 + B17 * 400, 36, 1e-12);
  const d17 = A17 * 24 + B17 * 576;
  chk(d17, 48, 1e-12);
  const u17 = quad.roots(B17, A17, -50)[1];
  chk(B17 * u17 * u17 + A17 * u17, 50, 1e-9);
  b.struct({
    examStyle: true, d: 4, skill: "APPLICATION", calculator: true,
    stem: t`The stopping distance $d$ m of a kombi on the Harare–Bulawayo road is partly proportional to its speed $u$ m/s and partly proportional to $u^{2}$, so $d = au + bu^{2}$. At $u = 10$ the stopping distance is 13 m, and at $u = 20$ it is 36 m.`,
    parts: [
      P.fib({
        label: "(a)", marks: 2, stem: "Find the constants.",
        template: "a = {{blank:a}}, b = {{blank:b}}",
        blanks: [{ id: "a", input: "number", accepted: [A17], wrong: 1.3 }, { id: "b", input: "number", accepted: [B17], wrong: 0.09 }],
        explanation: t`$10a + 100b = 13$ and $20a + 400b = 36$. Doubling the first: $20a + 200b = 26$; subtracting gives $200b = 10$, $b = 0.05$, then $10a = 13 - 5 = 8$, $a = 0.8$.`,
      }),
      P.num({
        label: "(b)", marks: 1, stem: "Find the stopping distance at 24 m/s.",
        value: d17, unit: "m", wrong: [31.2],
        explanation: t`$d = 0.8(24) + 0.05(576) = 19.2 + 28.8 = 48$ m.`,
      }),
      P.num({
        label: "(c)", marks: 2, stem: "Find the greatest speed at which the kombi can stop within 50 m, to 3 significant figures.",
        value: u17, unit: "m/s", wrong: [-40.6],
        explanation: t`$0.05u^{2} + 0.8u - 50 = 0$, i.e. $u^{2} + 16u - 1000 = 0$, so $u = \dfrac{-16 + \sqrt{256 + 4000}}{2} = 24.62\ldots \approx 24.6$ m/s (the negative root is rejected).`,
      }),
    ],
    explanation: t`Partial variation with two terms needs two equations: $a = 0.8$, $b = 0.05$. Then $d(24) = 48$ m and $d = 50$ gives the quadratic $u^{2} + 16u - 1000 = 0$ with positive root $u \approx 24.6$ m/s.`,
    hints: ["Substitute each pair of values into d = au + bu² to get two simultaneous equations.", "For (c) solve a quadratic in u and reject the negative root."],
  });

  // 2^(2x+3) − 33(2^x) + 4 = 0 -> 8y² − 33y + 4 = 0 -> y = 1/8, 4 -> x = −3, 2
  same(quad.roots(8, -33, 4), [0.125, 4]);
  for (const x of [-3, 2]) chk(2 ** (2 * x + 3) - 33 * 2 ** x + 4, 0, 1e-12);
  b.struct({
    examStyle: true, d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Let $y = 2^{x}$.`,
    parts: [
      P.expr({
        label: "(a)", marks: 1, stem: t`Write $2^{2x+3}$ in terms of $y$.`,
        accepted: ["8y^2", "8y²", "8*y^2"], wrong: ["2y^2+3", "y^5"],
        explanation: t`$2^{2x+3} = 2^{3} \times \left(2^{x}\right)^{2} = 8y^{2}$.`,
      }),
      P.fib({
        label: "(b)", marks: 2, stem: t`Hence solve $2^{2x+3} - 33\left(2^{x}\right) + 4 = 0$.`,
        template: "Smaller solution x = {{blank:a}}; larger solution x = {{blank:b}}",
        blanks: [{ id: "a", input: "number", accepted: [-3], wrong: 0.125 }, { id: "b", input: "number", accepted: [2], wrong: 4 }],
        explanation: t`$8y^{2} - 33y + 4 = 0$ factorises as $(8y - 1)(y - 4) = 0$, so $y = \frac{1}{8}$ or $y = 4$, giving $x = -3$ or $x = 2$.`,
      }),
      P.proof({
        label: "(c)", marks: 1, stem: t`Explain why the equation $2^{2x+3} + 33\left(2^{x}\right) + 4 = 0$ has no real solutions.`,
        points: [t`B1 every term is positive for all real $x$ (since $2^{x} > 0$), so the left side is always positive and cannot equal 0`],
        modelAnswer: t`For every real $x$, $2^{x} > 0$, so $8y^{2} > 0$ and $33y > 0$. The left side is $8y^{2} + 33y + 4 > 4 > 0$, so it is never zero. (Equivalently, the roots $y = -\frac{1}{8}$ and $y = -4$ of $8y^{2} + 33y + 4 = 0$ are negative, and $2^{x}$ cannot be negative.)`,
      }),
    ],
    explanation: t`The substitution $y = 2^{x}$ turns the equation into $8y^{2} - 33y + 4 = 0$, with roots $y = \frac{1}{8}$ and $4$, so $x = -3$ or $2$. With $+33$ every term is positive, so there is no solution.`,
    hints: [t`$2^{2x+3} = 2^{3} \times 2^{2x}$.`, "Solve for y, then solve 2ˣ = y."],
  });

  b.card("FORMULA", t`Laws of indices for products, quotients and powers`, t`$a^{m}a^{n} = a^{m+n}$, $\;a^{m} \div a^{n} = a^{m-n}$, $\;\left(a^{m}\right)^{n} = a^{mn}$.`);
  b.card("DEFINITION", t`What do $a^{0}$, $a^{-n}$ and $a^{\frac{m}{n}}$ mean?`, t`$a^{0} = 1$, $\;a^{-n} = \dfrac{1}{a^{n}}$, $\;a^{\frac{m}{n}} = \left(\sqrt[n]{a}\right)^{m}$ (root first, then power).`);
  b.card("CONCEPT", "How do you solve an equation such as 9ˣ = 27^(x − 1)?", "Write both sides as powers of the same base (3^(2x) = 3^(3x − 3)) and equate the indices.");
  b.card("CONCEPT", t`How do you solve an equation containing $a^{2x}$ and $a^{x}$?`, t`Let $y = a^{x}$ so that $a^{2x} = y^{2}$; solve the quadratic in $y$, then solve $a^{x} = y$. Reject $y \leq 0$ because $a^{x} > 0$.`);
  b.card("DEFINITION", "Partial variation", t`$y$ is partly constant and partly varies as $x$: $y = a + kx$. Two constants, so two pieces of data are needed.`);
  b.card("DEFINITION", "Joint variation", t`$y$ varies jointly as $x$ and $z$: $y = kxz$. With inverse variation as well, e.g. $y = \dfrac{kx^{2}}{\sqrt{z}}$.`);
  b.card("FACT", "If y ∝ x³ and x increases by 10%, by what factor does y change?", "1.1³ = 1.331, an increase of 33.1%. Percentage changes multiply through powers.");
  b.card("CONCEPT", "Three steps for any variation problem", "1. Write the equation with a constant. 2. Use the data to find the constant(s). 3. Use the equation to answer the question.");
});
