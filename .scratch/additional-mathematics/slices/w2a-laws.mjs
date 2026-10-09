// W2a: amath.logs.laws
import { concept, P, t, chk, logb, lg, ln } from "../lib.mjs";

concept("amath.logs.laws", { file: "logs/laws", keyPrefix: "logs.laws" }, (b) => {
  chk(3 ** 4, 81);
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`Which statement is the logarithmic form of $3^4 = 81$?`,
    options: [
      [t`$\log_3 81 = 4$`, t`Correct: the base 3 stays the base and the index 4 becomes the logarithm.`],
      [t`$\log_4 81 = 3$`, t`This swaps the base and the index: $4^3 = 64$, not 81.`],
      [t`$\log_{81} 3 = 4$`, t`This would mean $81^4 = 3$, which is false.`],
      [t`$\log_3 4 = 81$`, t`This would mean $3^{81} = 4$: the logarithm is the index, not the answer of the power.`],
    ],
    answer: "A",
    explanation: t`$a^c = b \iff \log_a b = c$. With $a = 3$, $c = 4$, $b = 81$: $\log_3 81 = 4$.`,
  });

  chk(logb(2, 128), 7);
  b.num({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`Without using a calculator, find the value of $\log_2 128$.`,
    value: 7, wrong: [64, 6],
    explanation: t`$2^7 = 128$, so $\log_2 128 = 7$.`,
  });

  chk(logb(6, 1 / 216), -3);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Without using a calculator, find the value of $\log_6 \dfrac{1}{216}$.`,
    value: -3, wrong: [3, 36],
    explanation: t`$216 = 6^3$, so $\frac{1}{216} = 6^{-3}$ and $\log_6 \frac{1}{216} = -3$.`,
  });

  chk(logb(16, 8), 0.75);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Without using a calculator, find the exact value of $\log_{16} 8$. You may type a fraction such as 2/5 or a decimal.`,
    value: 0.75, wrong: [2, 0.5],
    explanation: t`Write both as powers of 2: $16^c = 8$ means $2^{4c} = 2^3$, so $4c = 3$ and $\log_{16} 8 = \frac{3}{4}$.`,
  });

  chk(lg(4) + lg(25), 2);
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Find the exact value of $\log_{10} 4 + \log_{10} 25$.`,
    options: [
      [t`$2$`, t`Correct: $\log_{10} (4 \times 25) = \log_{10} 100 = 2$.`],
      [t`$\log_{10} 29$`, t`The product law multiplies the numbers: $\log x + \log y = \log xy$, not $\log (x + y)$.`],
      [t`$100$`, t`$4 \times 25 = 100$ is the number inside the logarithm; the value of $\log_{10} 100$ is 2.`],
      [t`$1$`, t`$\log_{10} 10 = 1$, but here the product is 100, which is $10^2$.`],
    ],
    answer: "A",
    explanation: t`Product law: $\log_{10} 4 + \log_{10} 25 = \log_{10} 100 = \log_{10} 10^2 = 2$.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`For all positive $x$ and $y$, $\log_a (x + y) = \log_a x + \log_a y$.`,
    answer: false,
    explanation: t`False. The product law is $\log_a (xy) = \log_a x + \log_a y$. For example, $\log_2 (4 + 4) = \log_2 8 = 3$, while $\log_2 4 + \log_2 4 = 2 + 2 = 4$. A logarithm of a sum does not split.`,
  });

  chk(2 * lg(6) + lg(5) - lg(3), lg(60));
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Write $2\log_{10} 6 + \log_{10} 5 - \log_{10} 3$ as a single logarithm in the form $\log_{10} k$.`,
    template: "k = {{blank:k}}",
    blanks: [{ id: "k", input: "number", accepted: [60], wrong: "8" }],
    explanation: t`$2\log 6 = \log 36$; then $\log 36 + \log 5 - \log 3 = \log \frac{36 \times 5}{3} = \log 60$, so $k = 60$.`,
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each statement in index form with the same statement in logarithmic form.",
    pairs: [
      [t`$7^0 = 1$`, t`$\log_7 1 = 0$`],
      [t`$10^{-2} = 0.01$`, t`$\log_{10} 0.01 = -2$`],
      [t`$\mathrm{e}^3 = y$`, t`$\ln y = 3$`],
      [t`$81^{\frac{1}{2}} = 9$`, t`$\log_{81} 9 = \frac{1}{2}$`],
    ],
    explanation: t`In each case the base stays the base and the index becomes the value of the logarithm: $a^c = b \iff \log_a b = c$.`,
  });

  chk(logb(3, 54) - logb(3, 2), 3);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Without using a calculator, evaluate $\log_3 54 - \log_3 2$.`,
    value: 3, wrong: [27, 52],
    explanation: t`Quotient law: $\log_3 54 - \log_3 2 = \log_3 \frac{54}{2} = \log_3 27 = 3$.`,
    hints: ["Combine the two logarithms into one first."],
  });

  chk(logb(7, 40), 3 * logb(7, 2) + logb(7, 5));
  chk(logb(7, 0.4), logb(7, 2) - logb(7, 5));
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Given that $\log_a 2 = p$ and $\log_a 5 = q$, express $\log_a 40$ and $\log_a 0.4$ in terms of $p$ and $q$.`,
    template: "log_a 40 = {{blank:a}}p + {{blank:b}}q\n\nlog_a 0.4 = {{blank:c}}p + {{blank:d}}q",
    blanks: [
      { id: "a", input: "number", accepted: [3], wrong: "4" },
      { id: "b", input: "number", accepted: [1], wrong: "1" },
      { id: "c", input: "number", accepted: [1], wrong: "-1" },
      { id: "d", input: "number", accepted: [-1], wrong: "1" },
    ],
    explanation: t`$40 = 2^3 \times 5$, so $\log_a 40 = 3p + q$. $0.4 = \frac{2}{5}$, so $\log_a 0.4 = p - q$ (coefficients $1$ and $-1$).`,
    hints: ["Write each number as a product or quotient of powers of 2 and 5.", t`$0.4 = \frac{4}{10} = \frac{2}{5}$.`],
  });

  const v6 = ln(20) / ln(6);
  chk(v6, lg(20) / lg(6));
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Use the change of base rule to find $\log_6 20$, correct to 3 significant figures.`,
    value: v6, wrong: [0.598, 3.33],
    explanation: t`$\log_6 20 = \dfrac{\ln 20}{\ln 6} = \dfrac{2.9957}{1.7918} = 1.67$ (3 s.f.). Check: $6^{1.67} \approx 19.9$. The wrong value $0.598$ comes from $\frac{\ln 6}{\ln 20}$ (fraction upside down); $3.33$ from $\frac{20}{6}$.`,
    hints: [t`$\log_a b = \dfrac{\ln b}{\ln a}$: the number goes on top, the base underneath.`],
  });

  for (const x of [2, 7.5, 0.3]) chk(logb(8, x), logb(2, x) / 3);
  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`For $x > 0$, which expression is equal to $\log_8 x$?`,
    options: [
      [t`$\frac{1}{3}\log_2 x$`, t`Correct: $\log_8 x = \frac{\log_2 x}{\log_2 8} = \frac{\log_2 x}{3}$.`],
      [t`$3\log_2 x$`, t`The factor is inverted: dividing by $\log_2 8 = 3$ gives one third, not three times.`],
      [t`$\log_2 \frac{x}{3}$`, t`The 3 divides the logarithm, not the number inside it.`],
      [t`$\log_2 x - 3$`, t`Change of base divides by $\log_2 8$; it does not subtract it.`],
    ],
    answer: "A",
    explanation: t`Change to base 2: $\log_8 x = \dfrac{\log_2 x}{\log_2 8} = \dfrac{\log_2 x}{3}$.`,
    hints: [t`$8 = 2^3$.`],
  });

  chk(logb(27, 81), 4 / 3);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Without using a calculator, find the exact value of $\log_{27} 81$. You may type a fraction.`,
    value: 4 / 3, wrong: [0.75, 3],
    explanation: t`$27 = 3^3$ and $81 = 3^4$. Then $27^c = 81$ gives $3^{3c} = 3^4$, so $c = \frac{4}{3}$.`,
    hints: ["Write both numbers as powers of 3."],
  });

  chk(4 ** 1.5, 8);
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Given that $\log_4 y = 1.5$, find $y$.`,
    options: [
      [t`$8$`, t`Correct: $y = 4^{1.5} = (\sqrt{4})^3 = 8$.`],
      [t`$6$`, t`This multiplies $4 \times 1.5$; the logarithm is an index, so $y = 4^{1.5}$.`],
      [t`$16$`, t`$16 = 4^2$, which would need $\log_4 y = 2$.`],
      [t`$2.5$`, t`This adds $1 + 1.5$; convert to index form instead.`],
    ],
    answer: "A",
    explanation: t`Index form: $y = 4^{1.5} = 4^{\frac{3}{2}} = 2^3 = 8$.`,
  });

  chk(logb(2, 6) + logb(2, 12) - 2 * logb(2, 3), 3);
  b.num({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`Without using a calculator, evaluate $\log_2 6 + \log_2 12 - 2\log_2 3$.`,
    value: 3, wrong: [8, 6],
    explanation: t`$2\log_2 3 = \log_2 9$. Then $\log_2 \dfrac{6 \times 12}{9} = \log_2 8 = 3$.`,
    hints: ["Move the coefficient 2 inside first (power law).", "Then use the product and quotient laws together."],
  });

  chk(Math.log(Math.E ** 2 / 5), 2 - Math.log(5));
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Which expression is equal to $\ln \left(\dfrac{\mathrm{e}^2}{5}\right)$?`,
    options: [
      [t`$2 - \ln 5$`, t`Correct: $\ln \mathrm{e}^2 - \ln 5 = 2 - \ln 5$.`],
      [t`$\dfrac{2}{\ln 5}$`, t`A logarithm of a quotient is a difference of logarithms, not a quotient.`],
      [t`$2\ln 5$`, t`This multiplies instead of using the quotient law.`],
      [t`$\ln 2 - \ln 5$`, t`$\ln \mathrm{e}^2 = 2$, not $\ln 2$: $\ln$ and $\mathrm{e}$ undo each other.`],
    ],
    answer: "A",
    explanation: t`Quotient law: $\ln \frac{\mathrm{e}^2}{5} = \ln \mathrm{e}^2 - \ln 5 = 2\ln \mathrm{e} - \ln 5 = 2 - \ln 5$, since $\ln \mathrm{e} = 1$.`,
  });

  for (const [a, x] of [[2, 9], [5, 0.3], [10, 47]]) chk(logb(a, x), 1 / logb(x, a));
  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 3,
    stem: t`Prove that $\log_a b = \dfrac{1}{\log_b a}$, where $a$ and $b$ are positive numbers other than 1.`,
    points: [
      t`M1 lets $\log_a b = c$ and writes $a^c = b$.`,
      t`M1 takes logarithms to base $b$: $c\log_b a = \log_b b = 1$.`,
      t`A1 divides by $\log_b a$ to reach $c = \frac{1}{\log_b a}$, the given result.`,
    ],
    modelAnswer: t`Let $\log_a b = c$. Then

$$
a^c = b
$$

Take logarithms to base $b$ of both sides:

$$
\log_b (a^c) = \log_b b \Rightarrow c\log_b a = 1
$$

$$
c = \frac{1}{\log_b a}, \quad \text{so} \quad \log_a b = \frac{1}{\log_b a}
$$`,
    explanation: "Convert to index form, then take logarithms to the other base; the power law brings the index down.",
    hints: ["Start by writing the logarithm in index form."],
  });

  {
    const xs = [3, 0.7, 11];
    for (const x of xs) {
      const y = 2.6;
      chk(logb(2, 8 * x * x), 3 + 2 * logb(2, x));
      chk(logb(2, x / (4 * Math.sqrt(y))), logb(2, x) - 2 - 0.5 * logb(2, y));
      chk(logb(4, x * y), (logb(2, x) + logb(2, y)) / 2);
    }
  }
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`It is given that $\log_2 x = p$ and $\log_2 y = q$, where $x > 0$ and $y > 0$.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: t`Express $\log_2 (8x^2)$ in the form $m + np$.`, template: "m = {{blank:m}}, n = {{blank:n}}",
        blanks: [{ id: "m", input: "number", accepted: [3], wrong: "8" }, { id: "n", input: "number", accepted: [2], wrong: "2" }],
        explanation: t`$\log_2 8 + \log_2 x^2 = 3 + 2p$.` }),
      P.fib({ label: "(b)", marks: 2, stem: t`Express $\log_2 \left(\dfrac{x}{4\sqrt{y}}\right)$ in the form $p + r + sq$.`, template: "r = {{blank:r}}, s = {{blank:s}}",
        blanks: [{ id: "r", input: "number", accepted: [-2], wrong: "2" }, { id: "s", input: "number", accepted: [-0.5], wrong: "0.5" }],
        explanation: t`$\log_2 x - \log_2 4 - \log_2 y^{\frac{1}{2}} = p - 2 - \frac{1}{2}q$, so $r = -2$ and $s = -\frac{1}{2}$.` }),
      P.proof({ label: "(c)", marks: 2, stem: t`Show that $\log_4 (xy) = \dfrac{p + q}{2}$.`,
        points: [t`M1 changes base: $\log_4 (xy) = \dfrac{\log_2 (xy)}{\log_2 4}$ with $\log_2 4 = 2$.`, t`A1 uses the product law to reach $\dfrac{p + q}{2}$.`],
        modelAnswer: t`$$
\log_4 (xy) = \frac{\log_2 (xy)}{\log_2 4} = \frac{\log_2 x + \log_2 y}{2} = \frac{p + q}{2}
$$`,
        explanation: "Change to base 2, then split the product." }),
    ],
    explanation: "Split each logarithm with the product, quotient and power laws, replace the logarithms of 2's powers by numbers, and change base 4 to base 2.",
    hints: [t`$\log_2 8 = 3$ and $\log_2 4 = 2$.`, t`$\sqrt{y} = y^{\frac{1}{2}}$.`],
  });

  {
    chk(3 * lg(2) + lg(12.5), 2);
    const v18 = 0.301 + 2 * 0.4771;
    chk(v18, 1.2552);
    const v15 = 0.4771 - 0.301;
    chk(v15, 0.1761);
    chk(Math.abs(lg(18) - v18) < 0.0005 ? 1 : 0, 1);
    chk(Math.abs(lg(1.5) - v15) < 0.0005 ? 1 : 0, 1);
  }
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: t`In this question, $\log$ means $\log_{10}$ and you must not use a calculator.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: t`State the value of $\log 0.0001$.`, value: -4, wrong: [4, -3], explanation: t`$0.0001 = 10^{-4}$.` }),
      P.num({ label: "(b)", marks: 2, stem: t`Write $3\log 2 + \log 12.5$ as a single logarithm and hence evaluate it.`, value: 2, wrong: [100],
        explanation: t`$3\log 2 = \log 8$, and $\log 8 + \log 12.5 = \log (8 \times 12.5) = \log 100 = 2$.` }),
      P.group({ label: "(c)", stem: t`Given that $\log 2 = 0.3010$ and $\log 3 = 0.4771$, find, correct to 3 decimal places,`, parts: [
        P.num({ label: "(i)", marks: 2, stem: t`$\log 18$,`, value: 1.2552, dp: 3, wrong: [0.7781], explanation: t`$18 = 2 \times 3^2$: $\log 18 = 0.3010 + 2(0.4771) = 1.2552 = 1.255$ (3 d.p.).` }),
        P.num({ label: "(ii)", marks: 2, stem: t`$\log 1.5$.`, value: 0.1761, dp: 3, wrong: [1.585], explanation: t`$1.5 = \frac{3}{2}$: $\log 1.5 = 0.4771 - 0.3010 = 0.1761 = 0.176$ (3 d.p.).` }),
      ] }),
    ],
    explanation: "Write each number as a product or quotient of 2s, 3s and 10s, then use the laws of logarithms.",
    hints: [t`$3\log 2 = \log 2^3$.`, t`$18 = 2 \times 9$.`],
  });

  b.card("DEFINITION", t`$\log_a b = c$ means …`, t`$a^c = b$ (with $a > 0$, $a \neq 1$, $b > 0$).`);
  b.card("FORMULA", "Product law", t`$\log_a (xy) = \log_a x + \log_a y$`);
  b.card("FORMULA", "Quotient law", t`$\log_a \left(\frac{x}{y}\right) = \log_a x - \log_a y$`);
  b.card("FORMULA", "Power law", t`$\log_a (x^n) = n\log_a x$`);
  b.card("FACT", t`$\log_a a$ and $\log_a 1$`, t`$\log_a a = 1$ and $\log_a 1 = 0$.`);
  b.card("FORMULA", "Change of base", t`$\log_a b = \dfrac{\log_c b}{\log_c a}$; in particular $\log_a b = \dfrac{1}{\log_b a}$.`, "Not in Cambridge's List of formulas.");
  b.card("DEFINITION", t`$\lg x$ and $\ln x$`, t`$\lg x = \log_{10} x$ (ZIMSEC writes $\log x$); $\ln x = \log_{\mathrm{e}} x$.`);
  b.card("CONCEPT", "Logarithm of a sum", t`$\log_a (x + y)$ cannot be split. Only products, quotients and powers can.`);
  b.card("FACT", t`$\log_{a^k} x$`, t`$\dfrac{1}{k}\log_a x$, e.g. $\log_9 x = \frac{1}{2}\log_3 x$.`);
});
