// W2a: amaths.integ.partial-fractions (ZIMSEC incl. improper -> applies ZP; Cambridge P3 proper only).
import { concept, P, t, chk, checkAntideriv, integrate, ZP } from "../lib.mjs";

const { log, atan, abs } = Math;
const I = (f, a, b, exact, label) => chk(integrate(f, a, b), exact, 1e-7 * Math.max(1, abs(exact)), label);
const ident = (f, g, label) => [0.37, 2.9, 5.6, 7.1, -0.4].forEach((x) => chk(f(x), g(x), 1e-9, label));

concept("amaths.integ.partial-fractions", { file: "integ/partial-fractions", keyPrefix: "integ.partial-fractions" }, (b) => {
  b.mcq({
    d: 1, skill: "UNDERSTANDING", calculator: false,
    stem: t`What is the best first step to find $\displaystyle\int\frac{x + 4}{(x - 2)(x + 1)}\,dx$?`,
    options: [
      ["Express the integrand in partial fractions", "Correct: each partial fraction then integrates to a logarithm."],
      ["Integrate the numerator and the denominator separately", "There is no such rule; the integral of a quotient is not the quotient of integrals."],
      [t`Write the answer as $\ln|(x - 2)(x + 1)| + c$`, "The numerator x + 4 is not the derivative of the denominator, so recognition does not apply."],
      ["Use the substitution u = x + 4", "This does not simplify the denominator at all."],
    ],
    answer: "A",
    explanation: t`$\dfrac{x + 4}{(x - 2)(x + 1)} = \dfrac{2}{x - 2} - \dfrac{1}{x + 1}$, which integrates to $2\ln|x - 2| - \ln|x + 1| + c$.`,
  });
  ident((x) => (x + 4) / ((x - 2) * (x + 1)), (x) => 2 / (x - 2) - 1 / (x + 1), "q1");

  ident((x) => 1 / (x * (x + 1)), (x) => 1 / x - 1 / (x + 1), "q2");
  const v2 = I((x) => 1 / (x * (x + 1)), 1, 2, log(4 / 3), "q2");
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: t`Evaluate $\displaystyle\int_{1}^{2}\frac{1}{x(x + 1)}\,dx$, correct to 3 significant figures.`,
    value: v2, wrong: [1.79, -0.288],
    explanation: t`$\dfrac{1}{x(x + 1)} = \dfrac{1}{x} - \dfrac{1}{x + 1}$. $\Big[\ln x - \ln(x + 1)\Big]_{1}^{2} = (\ln 2 - \ln 3) - (0 - \ln 2) = \ln\frac{4}{3} \approx 0.288$.`,
  });

  ident((x) => 3 / ((x - 1) * (x + 2)), (x) => 1 / (x - 1) - 1 / (x + 2), "q3");
  b.expr({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find $\displaystyle\int\frac{3}{(x - 1)(x + 2)}\,dx$. Type ln and |…|, with the constant, for example ln|x-4|-ln|x+3|+c.`,
    accepted: ["ln|x-1|-ln|x+2|+c", "-ln|x+2|+ln|x-1|+c", "ln|(x-1)/(x+2)|+c", "ln(x-1)-ln(x+2)+c", "ln((x-1)/(x+2))+c", "ln|x-1|-ln|x+2|+k", "ln|x-1|-ln|x+2|+C"],
    wrong: ["3ln|x-1|-3ln|x+2|+c"],
    explanation: t`$3 \equiv A(x + 2) + B(x - 1)$ gives $A = 1$, $B = -1$. So the integral is $\ln|x - 1| - \ln|x + 2| + c = \ln\left|\dfrac{x - 1}{x + 2}\right| + c$.`,
    hints: ["Find A and B by substituting x = 1 and x = −2."],
  });

  ident((x) => 4 / (x * x - 4), (x) => 1 / (x - 2) - 1 / (x + 2), "q4");
  I((x) => 4 / (x * x - 4), 3, 5, log(15 / 7), "q4");
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`$\displaystyle\int_{3}^{5}\frac{4}{x^{2} - 4}\,dx = \ln\frac{p}{q}$, where $\frac{p}{q}$ is a fraction in its lowest terms. Find $p$ and $q$.`,
    template: "p = {{blank:p}}, q = {{blank:q}}",
    blanks: [
      { id: "p", input: "number", accepted: [15], wrong: 3 },
      { id: "q", input: "number", accepted: [7], wrong: 5 },
    ],
    explanation: t`$\dfrac{4}{(x - 2)(x + 2)} = \dfrac{1}{x - 2} - \dfrac{1}{x + 2}$. $\Big[\ln\dfrac{x - 2}{x + 2}\Big]_{3}^{5} = \ln\frac{3}{7} - \ln\frac{1}{5} = \ln\frac{15}{7}$.`,
    hints: ["Factorise x² − 4.", "ln a − ln b = ln(a/b)."],
  });

  checkAntideriv((x) => log((x + 1) * (x + 2)), (x) => (2 * x + 3) / ((x + 1) * (x + 2)), 0, 2, "q5");
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Find $\displaystyle\int\frac{2x + 3}{(x + 1)(x + 2)}\,dx$.`,
    options: [
      [t`$\ln|(x + 1)(x + 2)| + c$`, t`Correct: the partial fractions are $\frac{1}{x + 1} + \frac{1}{x + 2}$ (equivalently, $2x + 3$ is the derivative of $x^{2} + 3x + 2$).`],
      [t`$\ln|x + 1| - \ln|x + 2| + c$`, "Both constants are +1; the second sign is wrong."],
      [t`$2\ln|x + 1| + 3\ln|x + 2| + c$`, "The numerator's coefficients are not the partial-fraction constants."],
      [t`$\dfrac{x^{2} + 3x}{(x + 1)(x + 2)} + c$`, "Only the numerator has been integrated."],
    ],
    answer: "A",
    explanation: t`$2x + 3 \equiv A(x + 2) + B(x + 1)$ gives $A = B = 1$, so the integral is $\ln|x + 1| + \ln|x + 2| + c$.`,
  });

  ident((x) => (x + 5) / ((x + 1) * (x + 3)), (x) => 2 / (x + 1) - 1 / (x + 3), "q6");
  const v6 = I((x) => (x + 5) / ((x + 1) * (x + 3)), 0, 1, log(3), "q6");
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Evaluate $\displaystyle\int_{0}^{1}\frac{x + 5}{(x + 1)(x + 3)}\,dx$, correct to 3 significant figures.`,
    value: v6, wrong: [1.67, 2.48],
    explanation: t`$\dfrac{x + 5}{(x + 1)(x + 3)} = \dfrac{2}{x + 1} - \dfrac{1}{x + 3}$. $\Big[2\ln(x + 1) - \ln(x + 3)\Big]_{0}^{1} = (2\ln 2 - \ln 4) - (0 - \ln 3) = \ln 3 \approx 1.10$.`,
    hints: ["A = 2 and B = −1.", "2 ln 2 = ln 4."],
  });

  ident((x) => x / (x + 1) ** 2, (x) => 1 / (x + 1) - 1 / (x + 1) ** 2, "q7");
  const v7 = I((x) => x / (x + 1) ** 2, 0, 1, log(2) - 0.5, "q7");
  b.num({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: t`Evaluate $\displaystyle\int_{0}^{1}\frac{x}{(x + 1)^{2}}\,dx$, correct to 3 significant figures.`,
    value: v7, wrong: [1.19, 0.693],
    explanation: t`$\dfrac{x}{(x + 1)^{2}} = \dfrac{1}{x + 1} - \dfrac{1}{(x + 1)^{2}}$. $\Big[\ln(x + 1) + \dfrac{1}{x + 1}\Big]_{0}^{1} = \ln 2 + \frac{1}{2} - 1 = \ln 2 - \frac{1}{2} \approx 0.193$. (1.19 has the wrong sign on the second term.)`,
    hints: ["The squared term integrates to a power, not a logarithm."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`$\displaystyle\int\frac{1}{(x - 1)(x - 2)}\,dx = \ln|x - 1| \times \ln|x - 2| + c$.`,
    answer: false,
    explanation: t`False. Split first: $\dfrac{1}{(x - 1)(x - 2)} = \dfrac{1}{x - 2} - \dfrac{1}{x - 1}$, so the integral is $\ln|x - 2| - \ln|x - 1| + c$. Logarithms are added or subtracted, never multiplied.`,
  });
  ident((x) => 1 / ((x - 1) * (x - 2)), (x) => 1 / (x - 2) - 1 / (x - 1), "q8");

  ident((x) => (2 * x * x + x + 2) / (x * (x * x + 1)), (x) => 2 / x + 1 / (x * x + 1), "q9");
  checkAntideriv((x) => 2 * log(x) + atan(x), (x) => (2 * x * x + x + 2) / (x * (x * x + 1)), 1, 3, "q9 integral");
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Given $\dfrac{2x^{2} + x + 2}{x(x^{2} + 1)} \equiv \dfrac{A}{x} + \dfrac{Bx + C}{x^{2} + 1}$, find $A$, $B$ and $C$, and hence state the integral.`,
    template: "A = {{blank:A}}, B = {{blank:B}}, C = {{blank:C}}; the integral is A ln|x| + C × {{blank:f}}(x) + c",
    blanks: [
      { id: "A", input: "number", accepted: [2], wrong: 1 },
      { id: "B", input: "number", accepted: [0], wrong: 1 },
      { id: "C", input: "number", accepted: [1], wrong: 2 },
      { id: "f", choices: ["tan⁻¹", "ln", "sin⁻¹", "sec"], accepted: ["tan⁻¹"] },
    ],
    explanation: t`$2x^{2} + x + 2 \equiv A(x^{2} + 1) + (Bx + C)x$. $x = 0$: $A = 2$. $x^{2}$: $2 = A + B$, $B = 0$. $x$: $C = 1$. So $\int = 2\ln|x| + \tan^{-1}x + c$.`,
    hints: ["Substitute x = 0 for A.", "Compare coefficients of x² and x."],
  });

  ident((x) => (x * x) / (x * x - 1), (x) => 1 + 0.5 / (x - 1) - 0.5 / (x + 1), "q10");
  const v10 = I((x) => (x * x) / (x * x - 1), 2, 3, 1 + 0.5 * log(1.5), "q10");
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true, applies: ZP,
    stem: t`Evaluate $\displaystyle\int_{2}^{3}\frac{x^{2}}{x^{2} - 1}\,dx$, correct to 3 significant figures.`,
    value: v10, wrong: [0.203, 1.41],
    explanation: t`Improper: $\dfrac{x^{2}}{x^{2} - 1} = 1 + \dfrac{1}{x^{2} - 1} = 1 + \dfrac{1}{2(x - 1)} - \dfrac{1}{2(x + 1)}$. $\Big[x + \tfrac{1}{2}\ln\tfrac{x - 1}{x + 1}\Big]_{2}^{3} = 1 + \tfrac{1}{2}\left(\ln\tfrac{1}{2} - \ln\tfrac{1}{3}\right) = 1 + \tfrac{1}{2}\ln\tfrac{3}{2} \approx 1.20$. (0.203 forgets the polynomial part 1.)`,
    hints: ["Divide first: the degrees are equal.", "Then split 1/(x² − 1)."],
  });

  checkAntideriv((x) => log(x + 2), (x) => 1 / (x + 2), 0, 1, "q11a");
  checkAntideriv((x) => -1 / (x + 2), (x) => 1 / (x + 2) ** 2, 0, 1, "q11b");
  checkAntideriv((x) => 0.5 * log(x * x + 2), (x) => x / (x * x + 2), 0, 1, "q11c");
  checkAntideriv((x) => 0.5 * log(2 * x + 1), (x) => 1 / (2 * x + 1), 0, 1, "q11d");
  b.match({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "Match each partial fraction with its integral (the + c is omitted).",
    pairs: [
      [t`$\dfrac{1}{x + 2}$`, t`$\ln|x + 2|$`],
      [t`$\dfrac{1}{(x + 2)^{2}}$`, t`$-\dfrac{1}{x + 2}$`],
      [t`$\dfrac{x}{x^{2} + 2}$`, t`$\tfrac{1}{2}\ln(x^{2} + 2)$`],
      [t`$\dfrac{1}{2x + 1}$`, t`$\tfrac{1}{2}\ln|2x + 1|$`],
    ],
    explanation: "Linear factors give logarithms (divide by the coefficient of x); a squared factor gives a power; x over a quadratic gives a logarithm by recognition.",
    hints: ["Only one of these is not a logarithm."],
  });

  ident((x) => 6 / ((x + 1) * (x + 4)), (x) => 2 / (x + 1) - 2 / (x + 4), "q12");
  const v12 = I((x) => 6 / ((x + 1) * (x + 4)), 0, 2, 2 * log(2), "q12");
  b.calc({
    d: 4, skill: "APPLICATION", calculator: true, unit: "units²",
    stem: t`Find the area of the region bounded by $y = \dfrac{6}{(x + 1)(x + 4)}$, the axes and the line $x = 2$, correct to 3 significant figures.`,
    value: v12, wrong: [4.16, 0.693],
    explanation: t`$\dfrac{6}{(x + 1)(x + 4)} = \dfrac{2}{x + 1} - \dfrac{2}{x + 4}$. Area $= \Big[2\ln\dfrac{x + 1}{x + 4}\Big]_{0}^{2} = 2\ln\frac{3}{6} - 2\ln\frac{1}{4} = 2\ln 2 \approx 1.39$.`,
    workedSolution: [
      t`1. $6 \equiv A(x + 4) + B(x + 1)$: $A = 2$, $B = -2$.`,
      t`2. Area $= \displaystyle\int_{0}^{2}\left(\frac{2}{x + 1} - \frac{2}{x + 4}\right)dx = \Big[2\ln(x + 1) - 2\ln(x + 4)\Big]_{0}^{2}$.`,
      t`3. $= (2\ln 3 - 2\ln 6) - (0 - 2\ln 4) = 2\ln\frac{3 \times 4}{6} = 2\ln 2 \approx 1.39$.`,
    ].join("\n"),
    hints: ["Split into partial fractions first.", "Collect the logarithms into one."],
  });

  checkAntideriv((x) => (1 / 6) * log(abs((x - 3) / (x + 3))), (x) => 1 / (x * x - 9), 4, 6, "q13");
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find $\displaystyle\int\frac{1}{x^{2} - 9}\,dx$ for $x > 3$.`,
    options: [
      [t`$\dfrac{1}{6}\ln\left(\dfrac{x - 3}{x + 3}\right) + c$`, t`Correct: $\frac{1}{x^{2} - 9} = \frac{1}{6}\left(\frac{1}{x - 3} - \frac{1}{x + 3}\right)$.`],
      [t`$\dfrac{1}{3}\tan^{-1}\dfrac{x}{3} + c$`, t`That is $\int\frac{1}{x^{2} + 9}\,dx$; here the sign is minus, so the denominator factorises.`],
      [t`$\ln(x^{2} - 9) + c$`, "The numerator is not the derivative 2x of the denominator."],
      [t`$\dfrac{1}{6}\ln\left(\dfrac{x + 3}{x - 3}\right) + c$`, "The fraction inside the logarithm is upside down, which changes the sign."],
    ],
    answer: "A",
    explanation: t`$1 \equiv A(x + 3) + B(x - 3)$ gives $A = \frac{1}{6}$, $B = -\frac{1}{6}$, so the integral is $\frac{1}{6}\ln(x - 3) - \frac{1}{6}\ln(x + 3) + c$.`,
    hints: ["x² − 9 = (x − 3)(x + 3)."],
  });

  ident((x) => (x + 1) / (x * (x - 1)), (x) => -1 / x + 2 / (x - 1), "q14");
  I((x) => (x + 1) / (x * (x - 1)), 2, 3, log(8 / 3), "q14");
  b.proof({
    d: 4, skill: "APPLICATION", marks: 4, calculator: false,
    stem: t`Show that $\displaystyle\int_{2}^{3}\frac{x + 1}{x(x - 1)}\,dx = \ln\frac{8}{3}$.`,
    points: [
      t`M1 writes $\dfrac{x + 1}{x(x - 1)} = \dfrac{A}{x} + \dfrac{B}{x - 1}$ and finds $A = -1$, $B = 2$`,
      t`M1 integrates to $\Big[-\ln x + 2\ln(x - 1)\Big]$`,
      t`M1 substitutes the limits: $(-\ln 3 + 2\ln 2) - (-\ln 2 + 0)$`,
      t`A1 combines to $3\ln 2 - \ln 3 = \ln\frac{8}{3}$`,
    ],
    modelAnswer: ["$$", t`\frac{x + 1}{x(x - 1)} = -\frac{1}{x} + \frac{2}{x - 1}`, "$$", "", "$$", t`\int_{2}^{3} = \Big[-\ln x + 2\ln(x - 1)\Big]_{2}^{3} = (-\ln 3 + 2\ln 2) - (-\ln 2) = 3\ln 2 - \ln 3 = \ln\frac{8}{3}`, "$$"].join("\n"),
    explanation: "Partial fractions, integrate to logarithms, then combine with the log laws.",
    hints: ["x + 1 ≡ A(x − 1) + Bx.", "3 ln 2 = ln 8."],
  });

  ident((x) => (3 * x + 2) / (x * x * (x + 1)), (x) => 1 / x + 2 / (x * x) - 1 / (x + 1), "q15");
  const v15 = I((x) => (3 * x + 2) / (x * x * (x + 1)), 1, 2, 2 * log(2) - log(3) + 1, "q15");
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`Given $\dfrac{3x + 2}{x^{2}(x + 1)} \equiv \dfrac{1}{x} + \dfrac{2}{x^{2}} - \dfrac{1}{x + 1}$, evaluate $\displaystyle\int_{1}^{2}\frac{3x + 2}{x^{2}(x + 1)}\,dx$, correct to 3 significant figures.`,
    value: v15, wrong: [0.288, 2.29],
    explanation: t`$\Big[\ln x - \dfrac{2}{x} - \ln(x + 1)\Big]_{1}^{2} = (\ln 2 - 1 - \ln 3) - (0 - 2 - \ln 2) = 2\ln 2 - \ln 3 + 1 \approx 1.29$. (0.288 omits the $\frac{2}{x^{2}}$ term.)`,
    hints: ["2/x² integrates to −2/x."],
  });

  // struct 5: (8x + 5)/((x+1)(2x+1)) = 3/(x+1) + 2/(2x+1); ∫₀¹ = ln 24
  ident((x) => (8 * x + 5) / ((x + 1) * (2 * x + 1)), (x) => 3 / (x + 1) + 2 / (2 * x + 1), "q16");
  const v16 = I((x) => (8 * x + 5) / ((x + 1) * (2 * x + 1)), 0, 1, log(24), "q16");
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
    stem: t`Let $f(x) = \dfrac{8x + 5}{(x + 1)(2x + 1)}$.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: t`Express $f(x)$ in the form $\dfrac{A}{x + 1} + \dfrac{B}{2x + 1}$.`, template: "A = {{blank:A}}, B = {{blank:B}}",
        blanks: [{ id: "A", input: "number", accepted: [3], wrong: -3 }, { id: "B", input: "number", accepted: [2], wrong: 1 }],
        explanation: t`$8x + 5 \equiv A(2x + 1) + B(x + 1)$. $x = -1$: $-3 = -A$, $A = 3$. $x = -\frac{1}{2}$: $1 = \frac{1}{2}B$, $B = 2$.` }),
      P.expr({ label: "(b)", marks: 2, stem: t`Hence find $\displaystyle\int_{0}^{1} f(x)\,dx$ in the form $\ln k$. Type it as, for example, ln12.`,
        accepted: ["ln24", "ln(24)", "ln 24"], wrong: ["ln72"],
        explanation: t`$\Big[3\ln(x + 1) + \ln(2x + 1)\Big]_{0}^{1} = 3\ln 2 + \ln 3 = \ln 8 + \ln 3 = \ln 24$. (ln 72 forgets to divide the second term by 2.)` }),
      P.num({ label: "(c)", marks: 1, stem: "Give the value of the integral correct to 3 significant figures.", value: v16, wrong: [4.28],
        explanation: t`$\ln 24 \approx 3.18$.` }),
    ],
    explanation: "Partial fractions, then logarithms combined into a single ln.",
    hints: ["Substitute x = −1 and x = −1/2.", "∫ 2/(2x + 1) dx = ln|2x + 1|."],
  });
  chk(log(72), 4.2767, 1e-4);

  // struct 5 ZP: (2x² − x + 3)/((x−1)(x+1)) = 2 + 2/(x−1) − 3/(x+1); ∫₂³
  ident((x) => (2 * x * x - x + 3) / ((x - 1) * (x + 1)), (x) => 2 + 2 / (x - 1) - 3 / (x + 1), "q17");
  const v17 = I((x) => (2 * x * x - x + 3) / ((x - 1) * (x + 1)), 2, 3, 2 - 4 * log(2) + 3 * log(3), "q17");
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: true, applies: ZP,
    stem: t`Let $g(x) = \dfrac{2x^{2} - x + 3}{(x - 1)(x + 1)}$.`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: t`Express $g(x)$ in the form $P + \dfrac{A}{x - 1} + \dfrac{B}{x + 1}$.`, template: "P = {{blank:P}}, A = {{blank:A}}, B = {{blank:B}}",
        blanks: [{ id: "P", input: "number", accepted: [2], wrong: 0 }, { id: "A", input: "number", accepted: [2], wrong: 4 }, { id: "B", input: "number", accepted: [-3], wrong: 3 }],
        explanation: t`Divide: $2x^{2} - x + 3 = 2(x^{2} - 1) + (5 - x)$, so $P = 2$. $5 - x \equiv A(x + 1) + B(x - 1)$: $x = 1$ gives $A = 2$; $x = -1$ gives $6 = -2B$, $B = -3$.` }),
      P.num({ label: "(b)", marks: 2, stem: t`Evaluate $\displaystyle\int_{2}^{3} g(x)\,dx$, correct to 3 significant figures.`, value: v17, wrong: [0.523],
        explanation: t`$\Big[2x + 2\ln(x - 1) - 3\ln(x + 1)\Big]_{2}^{3} = 2 + 2\ln 2 - 3\ln 4 + 3\ln 3 = 2 - 4\ln 2 + 3\ln 3 \approx 2.52$. (0.523 forgets the polynomial part.)` }),
    ],
    explanation: "ZIMSEC improper fraction: divide first, then split the proper remainder.",
    hints: ["The degrees are equal, so P is the ratio of the leading coefficients.", "Integrate the constant P too."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2, calculator: false,
    stem: t`Nyasha tries to integrate $\dfrac{1}{x^{2} + 4}$ by writing it as $\dfrac{A}{x - 2} + \dfrac{B}{x + 2}$. Explain why this cannot work and give the correct integral.`,
    points: [t`$x^{2} + 4$ has no real linear factors ($x^{2} - 4$ would), so these partial fractions do not exist`, t`$\int\frac{1}{x^{2} + 4}\,dx = \frac{1}{2}\tan^{-1}\frac{x}{2} + c$`],
    modelAnswer: "x² + 4 does not factorise into (x − 2)(x + 2); that is x² − 4. There are no real linear factors, so no partial fractions of that form. Instead use the standard integral: ∫ 1/(x² + 4) dx = (1/2) tan⁻¹(x/2) + c.",
    explanation: t`A sum of squares is irreducible; its integral is an inverse tangent.`,
    hints: ["Does x² + 4 = 0 have real roots?"],
  });

  b.card("CONCEPT", "Integrating a rational function", "Split into partial fractions (divide first if improper), then integrate each term.");
  b.card("FORMULA", "Linear partial fraction", t`$\displaystyle\int\frac{A}{ax + b}\,dx = \frac{A}{a}\ln|ax + b| + c$`);
  b.card("FORMULA", "Repeated-factor term", t`$\displaystyle\int\frac{B}{(ax + b)^{2}}\,dx = -\frac{B}{a(ax + b)} + c$`, "A power, not a logarithm.");
  b.card("CONCEPT", "Term over x² + k", t`$\dfrac{Bx + C}{x^{2} + k}$: $Bx$ part gives $\frac{B}{2}\ln(x^{2} + k)$; $C$ part gives an inverse tangent.`);
  b.card("FACT", t`$\displaystyle\int\frac{1}{x(x + 1)}\,dx$`, t`$\ln|x| - \ln|x + 1| + c = \ln\left|\dfrac{x}{x + 1}\right| + c$`);
  b.card("CONCEPT", "Answer in the form ln k", t`Turn coefficients into powers, then combine: $2\ln 3 + \ln 5 - \ln 7 = \ln\frac{45}{7}$.`);
  b.card("FACT", "Improper fractions in integration", "Divide first; the polynomial part integrates by the power rule.", undefined, { applies: ZP });
  b.card("FACT", "Cambridge scope", "Paper 3 only, proper fractions with linear, repeated linear or x² + c factors.");
});
