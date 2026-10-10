// W1a: amaths.functions.logarithms — laws of logarithms, a^x = b, a^x < b, log equations (ZIMSEC Pure F5; Cambridge P2/P3, no change of base).
import { concept, P, t, chk, same, quad, ZP } from "../lib.mjs";

const L = Math.log;

concept("amaths.functions.logarithms", { file: "functions/logarithms", keyPrefix: "functions.logarithms" }, (b) => {
  chk(Math.log2(64), 6, 1e-12);
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`What is the value of $\log_{2} 64$?`,
    options: [
      [t`$6$`, t`Correct: $2^{6} = 64$.`],
      [t`$32$`, "64 ÷ 2 is not a logarithm; the logarithm is the power."],
      [t`$8$`, t`$8^{2} = 64$, so 8 is the square root of 64, not the power of 2.`],
      [t`$5$`, t`$2^{5} = 32$, not 64.`],
    ],
    answer: "A",
    explanation: t`$\log_{2} 64 = n$ means $2^{n} = 64$, and $2^{6} = 64$, so $n = 6$.`,
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true, calculator: false,
    stem: t`Express $\log a + \log b - \log c$ as a single logarithm.`,
    options: [
      [t`$\log\dfrac{ab}{c}$`, "Correct: add for a product, subtract for a quotient."],
      [t`$\log(a + b - c)$`, "The laws turn products into sums, not sums into sums."],
      [t`$\dfrac{\log ab}{\log c}$`, "Subtracting logarithms gives the logarithm of a quotient, not a quotient of logarithms."],
      [t`$\log(ab - c)$`, t`$-\log c$ divides by $c$; it does not subtract $c$.`],
    ],
    answer: "A",
    explanation: t`$\log a + \log b = \log(ab)$, and $\log(ab) - \log c = \log\dfrac{ab}{c}$.`,
  });

  chk(L(81) / L(3) + L(1 / 9) / L(3), 2, 1e-12);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Evaluate $\log_{3} 81 + \log_{3}\frac{1}{9}$ without a calculator.`,
    value: 2, wrong: [6, 9],
    explanation: t`$\log_{3} 81 = 4$ (since $3^{4} = 81$) and $\log_{3}\frac{1}{9} = -2$ (since $3^{-2} = \frac{1}{9}$). The sum is $2$. (Equivalently $\log_{3}\left(81 \times \frac{1}{9}\right) = \log_{3} 9 = 2$.)`,
  });

  chk(3 * Math.log10(2) + Math.log10(5) - Math.log10(4), 1, 1e-12);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the exact value of $3\lg 2 + \lg 5 - \lg 4$.`,
    options: [
      [t`$1$`, t`Correct: $\lg\frac{8 \times 5}{4} = \lg 10 = 1$.`],
      [t`$\lg 6$`, t`$3\lg 2$ is $\lg 8$, not $\lg 6$ ($3 \times 2$).`],
      [t`$\lg 9$`, "The logarithms have been combined as a sum of numbers (2 + 3 + 5 − 4) inside one log."],
      [t`$10$`, t`$\lg 10 = 1$; 10 is the number whose logarithm is required.`],
    ],
    answer: "A",
    explanation: t`$3\lg 2 = \lg 8$. Then $\lg 8 + \lg 5 - \lg 4 = \lg\dfrac{40}{4} = \lg 10 = 1$.`,
    hints: ["Apply the power law first."],
  });

  const x5 = L(40) / L(3);
  b.num({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: t`Solve $3^{x} = 40$, giving your answer to 3 significant figures.`,
    value: x5, prefix: "x =", wrong: [13.3, 1.60],
    explanation: t`$x\ln 3 = \ln 40$, so $x = \dfrac{\ln 40}{\ln 3} = \dfrac{3.6889}{1.0986} = 3.3578\ldots \approx 3.36$.`,
  });

  const x6 = L(2) / (L(4) - L(7));
  chk((2 * x6 - 1) * L(2), x6 * L(7), 1e-12);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Solve $2^{2x - 1} = 7^{x}$, giving your answer to 3 significant figures.`,
    value: x6, prefix: "x =", wrong: [1.24, -0.356],
    explanation: t`$(2x - 1)\ln 2 = x\ln 7$, so $x(2\ln 2 - \ln 7) = \ln 2$ and $x = \dfrac{\ln 2}{\ln\frac{4}{7}} = \dfrac{0.69315}{-0.55962} = -1.2386\ldots \approx -1.24$.`,
    workedSolution: [
      t`1. Take $\ln$ of both sides: $(2x - 1)\ln 2 = x\ln 7$.`,
      t`2. Expand: $2x\ln 2 - \ln 2 = x\ln 7$.`,
      t`3. Collect: $x(2\ln 2 - \ln 7) = \ln 2$, i.e. $x\ln\frac{4}{7} = \ln 2$.`,
      t`4. $x = \dfrac{\ln 2}{\ln\frac{4}{7}} = -1.2386\ldots \approx -1.24$.`,
    ].join("\n"),
    hints: ["Take ln of both sides and keep the brackets.", "Collect the terms in x on one side."],
  });

  const x7 = (L(1.75) / L(3) - 1) / 2;
  chk(4 * 3 ** (2 * x7 + 1), 7, 1e-9);
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`Solve the inequality $4 \times 3^{2x + 1} < 7$, giving the boundary value to 3 significant figures.`,
    template: "x < {{blank:a}}",
    blanks: [{ id: "a", input: "number", accepted: [x7], tolerance: 0.0005, wrong: 0.255 }],
    explanation: t`$3^{2x + 1} < 1.75$, so $(2x + 1)\ln 3 < \ln 1.75$ (no reversal: $\ln 3 > 0$). Then $2x + 1 < 0.50938$, so $x < -0.24531 \approx -0.245$.`,
    hints: ["Divide by 4 first.", "ln 3 is positive, so the inequality keeps its direction."],
  });

  const n8 = L(2) / L(1.08);
  chk(Math.ceil(n8), 10);
  chk(1.08 ** 9 < 2 ? 1 : 0, 1);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`Rudo invests money at 8% compound interest per year, so after $n$ years it has been multiplied by $1.08^{n}$. Find the least whole number of years after which her money has more than doubled.`,
    value: 10, prefix: "n =", wrong: [9, 13],
    explanation: t`$1.08^{n} > 2 \Rightarrow n > \dfrac{\ln 2}{\ln 1.08} = 9.006\ldots$, so the least whole number is $n = 10$. Check: $1.08^{9} = 1.999 < 2$ and $1.08^{10} = 2.159 > 2$.`,
    hints: ["Solve 1.08ⁿ > 2 with logarithms.", "Round up: 9.006 years is not yet 9 whole years' worth of doubling."],
  });

  chk(Math.log(81) / Math.log(3), 4, 1e-12);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Solve $\log_{3}(2x + 1) = 4$.`,
    value: 40, prefix: "x =", wrong: [5.5, 1.5],
    explanation: t`Index form: $2x + 1 = 3^{4} = 81$, so $x = 40$.`,
  });

  same(quad.roots(1, -6, -16), [-2, 8]);
  chk(Math.log2(8) + Math.log2(2), 4);
  b.calc({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Solve $\log_{2} x + \log_{2}(x - 6) = 4$.`,
    value: 8, prefix: "x =", wrong: [-2, 11],
    explanation: t`$\log_{2}\big[x(x - 6)\big] = 4$, so $x^{2} - 6x = 16$, $x^{2} - 6x - 16 = 0$ and $(x - 8)(x + 2) = 0$. $x = -2$ is rejected because $\log_{2}(-2)$ is undefined. So $x = 8$; check: $\log_{2} 8 + \log_{2} 2 = 3 + 1 = 4$.`,
    hints: ["Combine the two logarithms into one.", "Reject any value that makes an argument negative."],
  });

  same(quad.roots(1, -9, 18), [3, 6]);
  for (const x of [3, 6]) chk(2 * Math.log10(x) - Math.log10(x - 2), Math.log10(9), 1e-12);
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Solve $2\lg x - \lg(x - 2) = \lg 9$.`,
    template: "x = {{blank:a}} or x = {{blank:b}} (smaller first)",
    blanks: [{ id: "a", input: "number", accepted: [3], wrong: -3 }, { id: "b", input: "number", accepted: [6], wrong: -6 }],
    explanation: t`$\lg\dfrac{x^{2}}{x - 2} = \lg 9$, so $x^{2} = 9(x - 2)$, i.e. $x^{2} - 9x + 18 = 0$ and $(x - 3)(x - 6) = 0$. Both make every argument positive, so both are valid.`,
    hints: ["Use the power law, then the quotient law.", "Equal logarithms have equal arguments."],
  });

  b.tf({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`$\log(x + y) = \log x + \log y$ for all positive $x$ and $y$.`,
    answer: false,
    explanation: t`False. The law is $\log(xy) = \log x + \log y$. For example $\lg(5 + 5) = 1$ but $\lg 5 + \lg 5 = \lg 25 \approx 1.40$.`,
  });

  b.tf({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`When solving $0.6^{n} < 0.05$ by taking natural logarithms, the inequality sign must be reversed when dividing by $\ln 0.6$.`,
    answer: true,
    explanation: t`True. $\ln 0.6 < 0$ because $0.6 < 1$. From $n\ln 0.6 < \ln 0.05$, dividing by a negative number gives $n > \dfrac{\ln 0.05}{\ln 0.6} \approx 5.86$.`,
    hints: ["Is ln 0.6 positive or negative?"],
  });

  b.match({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "Match each logarithm with its value.",
    pairs: [[t`$\log_{2} 8$`, t`$3$`], [t`$\log_{5} 1$`, t`$0$`], [t`$\log_{4} 2$`, t`$\frac{1}{2}$`], [t`$\log_{10} 0.01$`, t`$-2$`]],
    explanation: t`$2^{3} = 8$; $5^{0} = 1$; $4^{\frac{1}{2}} = 2$; $10^{-2} = 0.01$.`,
  });

  const v15 = L(30) / L(5);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true, applies: ZP,
    stem: t`Use the change of base formula to evaluate $\log_{5} 30$, giving your answer to 3 significant figures.`,
    value: v15, wrong: [6, 0.473],
    explanation: t`$\log_{5} 30 = \dfrac{\ln 30}{\ln 5} = \dfrac{3.4012}{1.6094} = 2.1133\ldots \approx 2.11$. (Inverting the fraction gives 0.473.)`,
    hints: [t`$\log_{a} x = \dfrac{\ln x}{\ln a}$.`],
  });

  chk(L(36) / L(4), L(6) / L(2), 1e-12);
  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: false, applies: ZP,
    stem: t`Solve $\log_{4} x = \log_{2} 6$.`,
    options: [
      [t`$x = 36$`, t`Correct: $\log_{4} x = \frac{\log_{2} x}{2}$, so $\log_{2} x = 2\log_{2} 6 = \log_{2} 36$.`],
      [t`$x = 6$`, "The bases differ, so the arguments are not equal."],
      [t`$x = 12$`, "The base change doubles the logarithm, which squares x; it does not double x."],
      [t`$x = \sqrt{6}$`, "The change of base has been applied the wrong way round."],
    ],
    answer: "A",
    explanation: t`Change to base 2: $\log_{4} x = \dfrac{\log_{2} x}{\log_{2} 4} = \dfrac{\log_{2} x}{2}$. So $\log_{2} x = 2\log_{2} 6 = \log_{2} 36$, and $x = 36$. Check: $\log_{4} 36 = \log_{4} 6^{2} = 2\log_{4} 6 = \log_{2} 6$.`,
    hints: ["Write log₄ x in base 2."],
  });

  b.proof({
    d: 3, skill: "UNDERSTANDING", marks: 3, calculator: false,
    stem: t`Prove that $\log_{a}(xy) = \log_{a} x + \log_{a} y$ for positive $x$, $y$ and $a \neq 1$.`,
    points: [
      t`M1 lets $\log_{a} x = p$ and $\log_{a} y = q$, so $x = a^{p}$ and $y = a^{q}$`,
      t`M1 multiplies: $xy = a^{p}a^{q} = a^{p + q}$`,
      t`A1 converts back: $\log_{a}(xy) = p + q = \log_{a} x + \log_{a} y$`,
    ],
    modelAnswer: [
      t`Let $p = \log_{a} x$ and $q = \log_{a} y$, so that $x = a^{p}$ and $y = a^{q}$. Then`,
      "$$",
      t`xy = a^{p} \times a^{q} = a^{p + q}`,
      "$$",
      t`so, by the definition of a logarithm,`,
      "$$",
      t`\log_{a}(xy) = p + q = \log_{a} x + \log_{a} y.`,
      "$$",
    ].join("\n"),
    explanation: "Each law of logarithms is a law of indices written in logarithm form.",
    hints: ["Write x and y as powers of a."],
  });

  const x18 = (2 * L(3)) / (L(5) - L(3));
  chk(5 ** x18, 3 ** (x18 + 2), 1e-6);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the exact solution of $5^{x} = 3^{x + 2}$.`,
    options: [
      [t`$x = \dfrac{\ln 9}{\ln\frac{5}{3}}$`, t`Correct: $x\ln 5 = (x + 2)\ln 3$ gives $x(\ln 5 - \ln 3) = 2\ln 3$.`],
      [t`$x = \dfrac{\ln 9}{\ln 2}$`, t`$\ln 5 - \ln 3 = \ln\frac{5}{3}$, not $\ln 2$.`],
      [t`$x = \dfrac{\ln 3}{\ln\frac{5}{3}}$`, t`The bracket $(x + 2)$ multiplies $\ln 3$ by 2 as well.`],
      [t`$x = \dfrac{\ln\frac{5}{3}}{\ln 9}$`, "The fraction is upside down."],
    ],
    answer: "A",
    explanation: t`$x\ln 5 = x\ln 3 + 2\ln 3$, so $x(\ln 5 - \ln 3) = 2\ln 3$ and $x = \dfrac{\ln 9}{\ln\frac{5}{3}} \approx 4.30$.`,
    hints: ["Take ln of both sides and expand the bracket."],
  });

  const a19 = 2000 * 1.06 ** 5;
  const n19 = L(2.5) / L(1.06);
  chk(Math.ceil(n19), 16);
  b.struct({
    examStyle: true, d: 4, skill: "APPLICATION", calculator: true,
    stem: t`Tatenda invests US\$2000 at 6% compound interest per year. After $n$ whole years the investment is worth $A$ US dollars, where $A = 2000 \times 1.06^{n}$.`,
    parts: [
      P.num({
        label: "(a)", marks: 1, stem: "Find the value after 5 years, to 3 significant figures.",
        value: a19, wrong: [2600],
        explanation: t`$2000 \times 1.06^{5} = 2676.45\ldots \approx$ US\$2680.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Find the least number of whole years after which the investment is worth more than US$5000.".replace("US$", "US\\$"),
        value: 16, prefix: "n =", wrong: [15],
        explanation: t`$1.06^{n} > 2.5 \Rightarrow n > \dfrac{\ln 2.5}{\ln 1.06} = 15.73$, so $n = 16$.`,
      }),
      P.proof({
        label: "(c)", marks: 1, stem: "Explain why the answer to (b) is not obtained by rounding 15.73 to the nearest whole number.",
        points: ["B1 after 15 years the value is still below US$5000 (n must exceed 15.73), so the next whole number, 16, is needed".replace("US$", "US\\$")],
        modelAnswer: t`The condition is $n > 15.73$. After 15 years, $2000 \times 1.06^{15} \approx 4793 < 5000$; only after 16 years ($\approx 5081$) is it exceeded. So $n$ must be rounded up, not to the nearest integer.`,
      }),
    ],
    explanation: t`$A = 2000 \times 1.06^{n}$: after 5 years about US\$2680. $1.06^{n} > 2.5$ gives $n > 15.73$, so 16 whole years.`,
    hints: ["Divide by 2000 before taking logarithms.", "Interest is added only at the end of each whole year."],
  });
  chk(Math.round(2000 * 1.06 ** 15), 4793);
  chk(Math.round(2000 * 1.06 ** 16), 5081);

  same(quad.roots(1, -9, 14), [2, 7]);
  for (const x of [2, 7]) chk(L(x * x + 5) / L(3), 2 + L(x - 1) / L(3), 1e-12);
  b.struct({
    examStyle: true, d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`The variables $x$ and $y$, with $x > 1$, satisfy $\log_{3} y = 2 + \log_{3}(x - 1)$ and $y = x^{2} + 5$.`,
    parts: [
      P.expr({
        label: "(a)", marks: 2, stem: "Express y in terms of x without logarithms.",
        accepted: ["y=9(x-1)", "y=9x-9", "9(x-1)", "9x-9"], wrong: ["y=2(x-1)", "y=x+1"],
        explanation: t`$\log_{3} y - \log_{3}(x - 1) = 2$, so $\log_{3}\dfrac{y}{x - 1} = 2$ and $\dfrac{y}{x - 1} = 3^{2} = 9$: $y = 9(x - 1)$.`,
      }),
      P.fib({
        label: "(b)", marks: 2, stem: "Hence find the two possible values of x.",
        template: "x = {{blank:a}} or x = {{blank:b}} (smaller first)",
        blanks: [{ id: "a", input: "number", accepted: [2], wrong: -2 }, { id: "b", input: "number", accepted: [7], wrong: -7 }],
        explanation: t`$x^{2} + 5 = 9x - 9 \Rightarrow x^{2} - 9x + 14 = 0 \Rightarrow (x - 2)(x - 7) = 0$. Both satisfy $x > 1$.`,
      }),
      P.num({
        label: "(c)", marks: 1, stem: "Find the value of y when x takes its larger value.",
        value: 54, wrong: [49],
        explanation: t`$y = 7^{2} + 5 = 54$ (check: $9(7 - 1) = 54$).`,
      }),
    ],
    explanation: t`Combining the logarithms gives $y = 9(x - 1)$; with $y = x^{2} + 5$ this gives $x = 2$ or $7$, so $(x, y) = (2, 9)$ or $(7, 54)$.`,
    hints: ["Bring the log terms together and use the quotient law.", "2 = log₃ 9."],
  });

  b.card("DEFINITION", "Logarithm", t`$\log_{a} x = n \iff a^{n} = x$ (for $a > 0$, $a \neq 1$, $x > 0$).`);
  b.card("FORMULA", "Product and quotient laws", t`$\log_{a}(xy) = \log_{a} x + \log_{a} y$; $\;\log_{a}\frac{x}{y} = \log_{a} x - \log_{a} y$.`);
  b.card("FORMULA", "Power law", t`$\log_{a}\left(x^{k}\right) = k\log_{a} x$.`);
  b.card("FACT", "Special values", t`$\log_{a} a = 1$, $\log_{a} 1 = 0$, $\log_{a}\frac{1}{a} = -1$.`);
  b.card("CONCEPT", t`How to solve $a^{f(x)} = b^{g(x)}$`, t`Take $\ln$ (or $\lg$) of both sides: $f(x)\ln a = g(x)\ln b$; expand and collect the $x$ terms.`);
  b.card("CONCEPT", "When does an inequality reverse while solving with logarithms?", t`When you divide by the logarithm of a number between 0 and 1 (negative), e.g. $\ln 0.8 < 0$.`);
  b.card("FORMULA", "Change of base (ZIMSEC; excluded by Cambridge)", t`$\log_{a} x = \dfrac{\log_{b} x}{\log_{b} a}$, e.g. $\log_{3} 20 = \dfrac{\ln 20}{\ln 3}$.`, undefined, { applies: ZP });
  b.card("CONCEPT", "Checking logarithmic equations", "Substitute each root into the original equation and reject any that makes an argument zero or negative.");
});
