// W1b: amath.functions.composite
import { concept, P, t, chk, same, quad, sfStr } from "../lib.mjs";

/** Asserts two functions agree at several points. */
const agree = (f, g, label) => [-2.5, -1, 0, 0.7, 2, 3.5].forEach((x) => chk(f(x), g(x), 1e-9, `${label} at ${x}`));

concept("amath.functions.composite", { file: "functions/composite", keyPrefix: "functions.composite" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`What does $fg(x)$ mean?`,
    options: [
      [t`$f(g(x))$: apply $g$ first, then $f$`, "Correct: the function nearest to x acts first."],
      [t`$g(f(x))$: apply $f$ first, then $g$`, t`That is $gf(x)$.`],
      [t`$f(x) \times g(x)$`, "Composition is not multiplication."],
      [t`$f(x) + g(x)$`, "Composition is not addition."],
    ],
    answer: "A",
    explanation: t`$fg(x) = f(g(x))$. Work from the inside out: find $g(x)$, then put it into $f$.`,
  });

  const f2 = (x) => 3 * x - 1;
  const g2 = (x) => x * x;
  chk(f2(g2(2)), 11); chk(g2(f2(2)), 25);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Given $f(x) = 3x - 1$ and $g(x) = x^2$, find $fg(2)$.`,
    value: 11, wrong: [25, 20],
    explanation: t`$g(2) = 4$, then $f(4) = 12 - 1 = 11$.`,
  });

  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Given $f(x) = 3x - 1$ and $g(x) = x^2$, find $gf(2)$.`,
    value: 25, wrong: [11, 35],
    explanation: t`$f(2) = 5$, then $g(5) = 25$. Notice $gf(2) \neq fg(2) = 11$.`,
  });

  agree((x) => 2 * (x * x) + 4 - 4 + 4, (x) => 2 * x * x + 4, "fg");
  b.expr({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Given $f(x) = x + 4$ and $g(x) = 2x^2$, find $fg(x)$. Type your answer using ^ for powers, e.g. 3x^2+1.`,
    accepted: ["2x^2+4", "4+2x^2", "2(x^2+2)"],
    wrong: ["2(x+4)^2", "2x^2+16x+32"],
    explanation: t`$fg(x) = f(2x^2) = 2x^2 + 4$. (Applying $f$ first would give $gf(x) = 2(x + 4)^2$.)`,
  });

  agree((x) => 1 / (2 * x - 1), (x) => 1 / (2 * x - 1), "gf");
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Given $f(x) = 2x - 1$ and $g(x) = \dfrac{1}{x}$ ($x \neq 0$), find $gf(x)$.`,
    options: [
      [t`$\dfrac{1}{2x - 1}$`, t`Correct: $g(2x - 1) = \frac{1}{2x - 1}$.`],
      [t`$\dfrac{2}{x} - 1$`, t`This is $fg(x) = f\left(\frac{1}{x}\right)$: the order is reversed.`],
      [t`$\dfrac{2x - 1}{x}$`, t`This multiplies $f(x)$ by $g(x)$ instead of composing.`],
      [t`$\dfrac{1}{2x} - 1$`, "The whole of f(x) goes into the denominator, not just 2x."],
    ],
    answer: "A",
    explanation: t`$gf(x) = g(f(x)) = g(2x - 1) = \dfrac{1}{2x - 1}$, defined for $x \neq \frac{1}{2}$.`,
    hints: [t`$f$ acts first; replace $x$ in $g$ by $2x - 1$.`],
  });

  const f6 = (x) => 3 * x + 2;
  agree((x) => f6(f6(x)), (x) => 9 * x + 8, "f^2");
  b.expr({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Given $f(x) = 3x + 2$, find $f^2(x)$ in the form $ax + b$. Type your answer, e.g. 5x+7.`,
    accepted: ["9x+8", "8+9x"],
    wrong: ["9x^2+12x+4", "6x+4"],
    explanation: t`$f^2(x) = f(f(x)) = f(3x + 2) = 3(3x + 2) + 2 = 9x + 8$. It is not $[f(x)]^2 = 9x^2 + 12x + 4$.`,
    hints: [t`Replace $x$ in $3x + 2$ by $(3x + 2)$.`],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`For any two functions $f$ and $g$, $fg(x) = gf(x)$.`,
    answer: false,
    explanation: t`False. Usually the order matters: with $f(x) = x + 1$ and $g(x) = 2x$, $fg(x) = 2x + 1$ but $gf(x) = 2x + 2$.`,
  });

  // f(x) = x^2 - 3, g(x) = 2x + 1: fg(x) = (2x + 1)^2 - 3 = 6 -> x = 1, -2
  for (const x of [-2, 1]) chk((2 * x + 1) ** 2 - 3, 6);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Given $f(x) = x^2 - 3$ and $g(x) = 2x + 1$, solve $fg(x) = 6$. Give the solutions in ascending order.`,
    template: "x = {{blank:a}} or x = {{blank:b}}",
    blanks: [
      { id: "a", input: "number", accepted: [-2], wrong: "-1" },
      { id: "b", input: "number", accepted: [1], wrong: "3" },
    ],
    explanation: t`$fg(x) = (2x + 1)^2 - 3 = 6$, so $(2x + 1)^2 = 9$, $2x + 1 = \pm 3$, giving $x = 1$ or $x = -2$.`,
    hints: [t`$fg(x) = f(2x + 1) = (2x + 1)^2 - 3$.`],
  });

  const f9 = (x) => 5 * x - 2;
  chk(f9(f9(1.4)), 23);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Given $f(x) = 5x - 2$, solve $f^2(x) = 23$.`,
    value: 1.4, prefix: "x =", wrong: [5, 1],
    explanation: t`$f^2(x) = 5(5x - 2) - 2 = 25x - 12$. Then $25x - 12 = 23$, so $25x = 35$ and $x = 1.4$.`,
    hints: [t`Find $f(f(x))$ first.`],
  });

  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Given $f(x) = \mathrm{e}^x$ and $g(x) = 2x + 3$, find $fg(x)$.`,
    options: [
      [t`$\mathrm{e}^{2x + 3}$`, t`Correct: $f(2x + 3) = \mathrm{e}^{2x + 3}$.`],
      [t`$2\mathrm{e}^x + 3$`, t`This is $gf(x)$: $f$ was applied first.`],
      [t`$\mathrm{e}^{2x} + 3$`, "The whole of g(x), including the + 3, goes into the exponent."],
      [t`$(2x + 3)\mathrm{e}^x$`, "This multiplies the functions instead of composing them."],
    ],
    answer: "A",
    explanation: t`$fg(x) = f(g(x))$: replace $x$ in $\mathrm{e}^x$ by $2x + 3$.`,
  });

  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`$f(x) = \sqrt{x}$ for $x \geq 0$, and $g(x) = x - 4$ for $x \in \mathbb{R}$. What is the largest possible domain of $fg$?`,
    options: [
      [t`$x \geq 4$`, t`Correct: $fg(x) = \sqrt{x - 4}$ needs $x - 4 \geq 0$.`],
      [t`$x \geq 0$`, t`For $0 \leq x < 4$, $g(x)$ is negative and cannot go into $f$.`],
      [t`$x \geq -4$`, t`$x = -4$ gives $g(x) = -8$, which is outside the domain of $f$.`],
      [t`$x \in \mathbb{R}$`, t`$g(x)$ must be in the domain of $f$, i.e. $g(x) \geq 0$.`],
    ],
    answer: "A",
    explanation: t`The output of $g$ must be an allowed input of $f$: $x - 4 \geq 0$, so $x \geq 4$.`,
    hints: [t`Which outputs of $g$ can $f$ accept?`],
  });

  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`$f(x) = \mathrm{e}^x$ and $g(x) = 2x - 3$, both for $x \in \mathbb{R}$. The range of $gf$ is $gf(x) > m$. Find $m$.`,
    value: -3, prefix: "m =", wrong: [0, -1],
    explanation: t`$gf(x) = 2\mathrm{e}^x - 3$. Since $\mathrm{e}^x > 0$, $2\mathrm{e}^x - 3 > -3$, and every value above $-3$ is reached. So $m = -3$.`,
    hints: [t`Start from the range of $f$: $\mathrm{e}^x > 0$.`],
  });

  // fg(1) = gf(1) with f(x) = x^2, g(x) = 2x + k: (2 + k)^2 = 2 + k -> k = -2, -1
  for (const k of [-2, -1]) chk((2 + k) ** 2, 2 * 1 + k);
  same(quad.roots(1, 3, 2), [-2, -1]);
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`$f(x) = x^2$ and $g(x) = 2x + k$, where $k$ is a constant. Given that $fg(1) = gf(1)$, find the two possible values of $k$, in ascending order.`,
    template: "k = {{blank:a}} or k = {{blank:b}}",
    blanks: [
      { id: "a", input: "number", accepted: [-2], wrong: "2" },
      { id: "b", input: "number", accepted: [-1], wrong: "1" },
    ],
    explanation: t`$fg(1) = f(2 + k) = (2 + k)^2$ and $gf(1) = g(1) = 2 + k$. So $(2 + k)^2 = 2 + k$, i.e. $k^2 + 3k + 2 = 0$, $(k + 1)(k + 2) = 0$, giving $k = -2$ or $k = -1$.`,
    hints: [t`$f(1) = 1$ and $g(1) = 2 + k$.`, "Do not divide by (2 + k): it might be zero."],
  });

  b.match({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`$f(x) = x + 1$ and $g(x) = x^2$. Match each composite with its expression.`,
    pairs: [
      [t`$fg(x)$`, t`$x^2 + 1$`],
      [t`$gf(x)$`, t`$(x + 1)^2$`],
      [t`$f^2(x)$`, t`$x + 2$`],
      [t`$g^2(x)$`, t`$x^4$`],
    ],
    explanation: t`$fg(x) = g(x) + 1$; $gf(x) = (f(x))^2$; $ff(x) = (x + 1) + 1$; $gg(x) = (x^2)^2$.`,
  });

  b.manualShort({
    d: 3, skill: "EVALUATION", calculator: false, marks: 2,
    stem: t`$f(x) = x - 3$ for $x \in \mathbb{R}$, and $g(x) = \sqrt{x}$ for $x \geq 0$. Explain why $gf(1)$ is not defined.`,
    points: [t`Finds $f(1) = -2$.`, t`States that $-2$ is not in the domain of $g$ (a square root of a negative number is not real).`],
    modelAnswer: t`$f(1) = 1 - 3 = -2$, so $gf(1) = g(-2) = \sqrt{-2}$, which is not a real number. The output of $f$ is outside the domain of $g$.`,
    explanation: "A composite gf is defined only when f(x) lies in the domain of g.",
    hints: ["Work out f(1) first."],
  });

  agree((x) => 3 * (1 / (x + 2)), (x) => 3 / (x + 2), "gf16");
  b.expr({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Given $f(x) = \dfrac{1}{x + 2}$ ($x \neq -2$) and $g(x) = 3x$, find $gf(x)$. Type a fraction with /, e.g. 5/(x+1).`,
    accepted: ["3/(x+2)", "3/(2+x)", "3(x+2)^-1"],
    wrong: ["1/(3x+2)", "3x/(x+2)"],
    explanation: t`$gf(x) = g\left(\frac{1}{x + 2}\right) = \frac{3}{x + 2}$. (The other order gives $fg(x) = \frac{1}{3x + 2}$.)`,
    hints: [t`$f$ acts first; then multiply its output by 3.`],
  });

  const v17 = Math.log(2 * 2 + 1);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Given $f(x) = \ln(x + 1)$ for $x > -1$ and $g(x) = 2x$, find $fg(2)$, giving your answer correct to 3 significant figures.`,
    value: v17, wrong: [sfStr(2 * Math.log(3))],
    explanation: t`$g(2) = 4$, then $f(4) = \ln 5 = ${sfStr(v17)}$ (3 s.f.). The value $2\ln 3 = ${sfStr(2 * Math.log(3))}$ is $gf(2)$.`,
    hints: [t`Find $g(2)$ first.`],
  });

  // Struct 1: f(x) = 2x - 5, g(x) = x^2 + 1
  const sf1 = (x) => 2 * x - 5;
  const sg1 = (x) => x * x + 1;
  agree((x) => sf1(sg1(x)), (x) => 2 * x * x - 3, "fg s1");
  agree((x) => sg1(sf1(x)), (x) => 4 * x * x - 20 * x + 26, "gf s1");
  for (const x of [-3, 3]) chk(sf1(sg1(x)), 15);
  chk(sg1(sf1(2)), 2);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: t`The functions $f$ and $g$ are defined for all real $x$ by $f(x) = 2x - 5$ and $g(x) = x^2 + 1$.`,
    parts: [
      P.expr({ label: "(a)", marks: 2, stem: t`Find $fg(x)$, simplified. Type your answer, e.g. 3x^2-7.`, accepted: ["2x^2-3", "-3+2x^2"], wrong: ["4x^2-20x+26"],
        explanation: t`$fg(x) = 2(x^2 + 1) - 5 = 2x^2 - 3$.` }),
      P.expr({ label: "(b)", marks: 2, stem: t`Find $gf(x)$ in the form $ax^2 + bx + c$. Type your answer, e.g. 2x^2-3x+1.`, accepted: ["4x^2-20x+26", "26-20x+4x^2", "(2x-5)^2+1"], wrong: ["2x^2-3"],
        explanation: t`$gf(x) = (2x - 5)^2 + 1 = 4x^2 - 20x + 25 + 1 = 4x^2 - 20x + 26$.` }),
      P.fib({ label: "(c)", marks: 2, stem: t`Solve $fg(x) = 15$, giving the solutions in ascending order.`, template: "x = {{blank:a}} or x = {{blank:b}}",
        blanks: [{ id: "a", input: "number", accepted: [-3], wrong: "3" }, { id: "b", input: "number", accepted: [3], wrong: "9" }],
        explanation: t`$2x^2 - 3 = 15$, so $x^2 = 9$ and $x = \pm 3$.` }),
      P.num({ label: "(d)", marks: 1, stem: t`Find $gf(2)$.`, value: 2, wrong: [5], explanation: t`$f(2) = -1$ and $g(-1) = 2$.` }),
    ],
    explanation: "Substitute the inner function, in brackets, into the outer one; then solve or evaluate.",
    hints: [t`For $fg$, replace $x$ in $2x - 5$ by $(x^2 + 1)$.`, t`For $gf$, square $(2x - 5)$ carefully.`],
  });

  // Struct 2: f(x) = 6/(x + 2), x != -2; g(x) = x^2 + 1. fg = 6/(x^2 + 3), range 0 < fg <= 2; fg = 1 -> ±√3; gf = 10 -> x = 0, -4
  const sf2 = (x) => 6 / (x + 2);
  const sg2 = (x) => x * x + 1;
  agree((x) => sf2(sg2(x)), (x) => 6 / (x * x + 3), "fg s2");
  chk(sf2(sg2(0)), 2);
  for (const x of [-Math.sqrt(3), Math.sqrt(3)]) chk(sf2(sg2(x)), 1);
  for (const x of [-4, 0]) chk(sg2(sf2(x)), 10);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`The functions $f$ and $g$ are defined by $f(x) = \dfrac{6}{x + 2}$ for $x \neq -2$, and $g(x) = x^2 + 1$ for $x \in \mathbb{R}$.`,
    parts: [
      P.expr({ label: "(a)", marks: 2, stem: t`Find $fg(x)$, simplified. Type a fraction with /, e.g. 5/(x^2+4).`, accepted: ["6/(x^2+3)", "6/(3+x^2)"], wrong: ["6/(x^2+1)+2"],
        explanation: t`$fg(x) = \dfrac{6}{(x^2 + 1) + 2} = \dfrac{6}{x^2 + 3}$.` }),
      P.fib({ label: "(b)", marks: 2, stem: t`Find the range of $fg$.`, template: "{{blank:lo}} < fg(x) ≤ {{blank:hi}}",
        blanks: [{ id: "lo", input: "number", accepted: [0], wrong: "3" }, { id: "hi", input: "number", accepted: [2], wrong: "6" }],
        explanation: t`$x^2 + 3 \geq 3$, so $0 < \dfrac{6}{x^2 + 3} \leq 2$, with 2 reached at $x = 0$ and values approaching 0 as $x$ grows.` }),
      P.num({ label: "(c)", marks: 2, stem: t`Solve $fg(x) = 1$. The solutions are $x = \pm\sqrt{q}$; find $q$.`, value: 3, prefix: "q =", wrong: [5, 6],
        explanation: t`$\dfrac{6}{x^2 + 3} = 1$ gives $x^2 + 3 = 6$, $x^2 = 3$, $x = \pm\sqrt{3}$.` }),
      P.fib({ label: "(d)", marks: 2, stem: t`Solve $gf(x) = 10$, giving the solutions in ascending order.`, template: "x = {{blank:a}} or x = {{blank:b}}",
        blanks: [{ id: "a", input: "number", accepted: [-4], wrong: "4" }, { id: "b", input: "number", accepted: [0], wrong: "-2" }],
        explanation: t`$gf(x) = \dfrac{36}{(x + 2)^2} + 1 = 10$, so $(x + 2)^2 = 4$, $x + 2 = \pm 2$, $x = 0$ or $x = -4$.` }),
      P.manual({ label: "(e)", marks: 1, stem: t`Explain why $x = -2$ is excluded from the domain of $f$.`,
        points: [t`At $x = -2$ the denominator $x + 2$ is zero, and division by zero is undefined.`],
        modelAnswer: t`$f(-2) = \frac{6}{0}$, which is undefined.`, explanation: "Exclude values that make a denominator zero." }),
    ],
    explanation: t`The range of $g$ is $g(x) \geq 1$, which never reaches $-2$, so $fg$ is defined for all real $x$. Working with the inner expression, $x^2 + 3 \geq 3$, gives the range of $fg$.`,
    hints: [t`For (b), what is the least value of $x^2 + 3$?`, t`For (d), $gf(x) = \left(\frac{6}{x + 2}\right)^2 + 1$.`],
  });

  // Cards
  b.card("DEFINITION", t`$fg(x)$`, t`$f(g(x))$: apply $g$ first, then $f$.`);
  b.card("DEFINITION", t`$f^2(x)$`, t`$f(f(x))$, not $[f(x)]^2$.`);
  b.card("FACT", t`Is $fg = gf$ in general?`, "No: the order of composition usually matters.");
  b.card("CONCEPT", t`Condition for $fg$ to be defined`, t`The range of $g$ must lie within the domain of $f$.`);
  b.card("CONCEPT", t`Range of $fg$`, t`Apply $f$ to the range of $g$.`);
  b.card("CONCEPT", t`Evaluating $fg(3)$ quickly`, t`Inside out: find $g(3)$, then $f$ of that value.`);
  b.card("CONCEPT", t`Solving $fg(x) = k$`, t`Form $fg(x)$ as one expression, then solve the equation.`);
  b.card("FACT", t`$fg(x)$ for $f(x) = \mathrm{e}^x$, $g(x) = 2x + 1$`, t`$\mathrm{e}^{2x + 1}$`);
});
