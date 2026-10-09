// W2a: amath.logs.equations
import { concept, P, t, chk, same, quad, logb, ln, lg, sfStr } from "../lib.mjs";

concept("amath.logs.equations", { file: "logs/equations", keyPrefix: "logs.equations" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`Which is a correct first step in solving $7^x = 30$?`,
    options: [
      [t`$x\lg 7 = \lg 30$`, t`Correct: take logarithms of both sides and bring the index down with the power law.`],
      [t`$x = \lg 30 - \lg 7$`, t`The power law multiplies by $x$; dividing, not subtracting, then isolates $x$.`],
      [t`$x = \dfrac{30}{7}$`, t`This treats $7^x$ as $7x$. The unknown is an index.`],
      [t`$\lg x = \dfrac{30}{7}$`, t`The logarithm is taken of both sides of the equation, not of $x$.`],
    ],
    answer: "A",
    explanation: t`$\lg 7^x = \lg 30$ gives $x\lg 7 = \lg 30$, so $x = \dfrac{\lg 30}{\lg 7}$.`,
  });

  const x2 = ln(50) / ln(3);
  chk(3 ** x2, 50, 1e-9);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: t`Solve $3^x = 50$, giving $x$ correct to 3 significant figures.`,
    value: x2, prefix: "x =", wrong: [16.7, 1.27],
    explanation: t`$x = \dfrac{\ln 50}{\ln 3} = 3.56$ (3 s.f.). The value 16.7 is $\frac{50}{3}$ (dividing the numbers); 1.27 is $\ln \frac{50}{3}$.`,
  });

  chk(4 ** -1.5, 1 / 8);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Without using a calculator, solve $4^{x} = \dfrac{1}{8}$.`,
    value: -1.5, prefix: "x =", wrong: [1.5, -2],
    explanation: t`Write both sides as powers of 2: $2^{2x} = 2^{-3}$, so $2x = -3$ and $x = -\frac{3}{2}$.`,
  });

  const x4 = (ln(90) / ln(6) + 1) / 2;
  chk(6 ** (2 * x4 - 1), 90, 1e-8);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Solve $6^{2x - 1} = 90$, giving $x$ correct to 3 significant figures.`,
    value: x4, prefix: "x =", wrong: [sfStr((ln(90) / ln(6) - 1) / 2), sfStr(ln(90) / ln(6) / 2)],
    explanation: t`$(2x - 1)\ln 6 = \ln 90$, so $2x - 1 = \dfrac{\ln 90}{\ln 6} = 2.5114\ldots$ Then $2x = 3.5114\ldots$ and $x = 1.76$ (3 s.f.).`,
    hints: [t`Take logarithms, then treat $2x - 1$ as one quantity.`],
  });

  const x5 = (3 * ln(2)) / (ln(5) - ln(2));
  chk(5 ** x5, 2 ** (x5 + 3), 1e-8);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Solve $5^{x} = 2^{x + 3}$, giving $x$ correct to 3 significant figures.`,
    value: x5, prefix: "x =", wrong: [sfStr(ln(2) / (ln(5) - ln(2)))],
    explanation: t`$x\ln 5 = (x + 3)\ln 2 = x\ln 2 + 3\ln 2$. So $x(\ln 5 - \ln 2) = 3\ln 2$ and $x = \dfrac{3\ln 2}{\ln 2.5} = 2.27$ (3 s.f.). Forgetting to multiply $\ln 2$ by 3 gives $0.756$.`,
    hints: ["Take logarithms, expand the bracket, then collect the terms in x on one side."],
  });

  chk(Math.exp(3 * (ln(11) / 3)), 11);
  b.expr({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Solve $\mathrm{e}^{3x} = 11$, giving the exact value of $x$. Type ln for the natural logarithm, e.g. ln(5)/4.`,
    accepted: ["ln(11)/3", "(ln(11))/3", "(1/3)ln(11)", "1/3ln(11)", "ln(11)/(3)", "(1/3)*ln(11)", "x=ln(11)/3", "x=(1/3)ln(11)", "ln(11^(1/3))", "ln(cbrt(11))"],
    wrong: ["ln(11/3)", "ln(8)"],
    explanation: t`Take $\ln$ of both sides: $3x = \ln 11$, so $x = \dfrac{\ln 11}{3}$ ($\approx 0.799$). Note that $\dfrac{\ln 11}{3} \neq \ln \dfrac{11}{3}$.`,
    hints: [t`$\ln(\mathrm{e}^{3x}) = 3x$.`],
  });

  const x7 = (Math.exp(4) - 2) / 3;
  chk(ln(3 * x7 + 2), 4);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Solve $\ln(3x + 2) = 4$, giving $x$ correct to 3 significant figures.`,
    value: x7, prefix: "x =", wrong: [sfStr((Math.exp(4) + 2) / 3), 0.667],
    explanation: t`Index form: $3x + 2 = \mathrm{e}^4 = 54.598\ldots$, so $3x = 52.598\ldots$ and $x = 17.5$ (3 s.f.). Check: $\ln(54.598) = 4$.`,
    hints: [t`$\ln y = 4$ means $y = \mathrm{e}^4$.`],
  });

  chk(logb(2, 3 + 5) - logb(2, 3 - 2), 3);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Solve $\log_2 (x + 5) - \log_2 (x - 2) = 3$.`,
    value: 3, prefix: "x =", wrong: [-3, 1],
    explanation: t`$\log_2 \dfrac{x + 5}{x - 2} = 3$, so $\dfrac{x + 5}{x - 2} = 8$. Then $x + 5 = 8x - 16$, $7x = 21$ and $x = 3$. Check: $\log_2 8 - \log_2 1 = 3 - 0 = 3$, and both logarithms are defined.`,
    hints: ["Use the quotient law to make a single logarithm.", t`Then $\dfrac{x + 5}{x - 2} = 2^3$.`],
  });

  same(quad.roots(1, -4, -5), [-1, 5]);
  chk(logb(5, 5) + logb(5, 1), 1);
  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`Solve $\log_5 x + \log_5 (x - 4) = 1$.`,
    options: [
      [t`$x = 5$ only`, t`Correct: $x^2 - 4x - 5 = 0$ gives $x = 5$ or $x = -1$, and $x = -1$ is rejected.`],
      [t`$x = 5$ or $x = -1$`, t`$x = -1$ makes $\log_5(-1)$ and $\log_5(-5)$ undefined, so it must be rejected.`],
      [t`$x = -1$ only`, t`At $x = -1$ the logarithms are undefined; $x = 5$ works.`],
      [t`$x = 4.5$ only`, t`This solves $x + (x - 4) = 5$: the product law multiplies $x(x - 4)$.`],
    ],
    answer: "A",
    explanation: t`$\log_5 [x(x - 4)] = 1$, so $x^2 - 4x = 5$, $(x - 5)(x + 1) = 0$. Reject $x = -1$ (logarithm of a negative number); check $x = 5$: $\log_5 5 + \log_5 1 = 1$.`,
    hints: ["Combine the logarithms, then check each root in the original equation."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`The equation $3^x = -9$ has no real solution.`,
    answer: true,
    explanation: t`True. A positive base raised to any real power is positive, so $3^x > 0$ for all $x$ and can never equal $-9$. (Taking logarithms would need $\lg(-9)$, which is undefined.)`,
  });

  chk(logb(3, 81) + logb(9, 81), 6);
  b.num({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`Solve $\log_3 x + \log_9 x = 6$.`,
    value: 81, prefix: "x =", wrong: [729, 9],
    explanation: t`$\log_9 x = \frac{1}{2}\log_3 x$, so $\frac{3}{2}\log_3 x = 6$, $\log_3 x = 4$ and $x = 3^4 = 81$. Check: $4 + 2 = 6$.`,
    hints: [t`Change $\log_9 x$ to base 3: $\log_9 x = \dfrac{\log_3 x}{\log_3 9}$.`],
  });

  {
    const ys = quad.roots(3, 5, -100);
    same(ys, [-20 / 3, 5]);
    const y = 5, x = 5 + 3 * y;
    chk(lg(x) + lg(y), 2); chk(x - 3 * y, 5);
  }
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Solve the simultaneous equations $\log_{10} x + \log_{10} y = 2$ and $x - 3y = 5$.`,
    template: "x = {{blank:x}}, y = {{blank:y}}",
    blanks: [
      { id: "x", input: "number", accepted: [20], wrong: "-15" },
      { id: "y", input: "number", accepted: [5], wrong: "-6.67" },
    ],
    explanation: t`The first equation gives $xy = 100$. Substitute $x = 5 + 3y$: $3y^2 + 5y - 100 = 0$, $(3y + 20)(y - 5) = 0$, so $y = 5$ or $y = -\frac{20}{3}$. Reject the negative value (logarithm undefined). Then $x = 20$.`,
    hints: [t`$\log_{10} x + \log_{10} y = 2$ means $xy = 10^2$.`, "Substitute for x and solve the quadratic in y; reject any value that makes a logarithm undefined."],
  });

  const tv = ln(5000 / 12000) / ln(0.85);
  chk(12000 * 0.85 ** tv, 5000, 1e-6);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Farai buys a kombi for US\$12 000. Its value after $t$ years is modelled by $V = 12\,000 \times 0.85^t$ dollars. Find, correct to 3 significant figures, the value of $t$ (in years) when the kombi is worth US\$5 000.`,
    value: tv, wrong: [sfStr(ln(0.85) / ln(5 / 12))],
    explanation: t`$0.85^t = \frac{5000}{12000} = \frac{5}{12}$, so $t = \dfrac{\ln(5/12)}{\ln 0.85} = 5.39$ years (3 s.f.). Both logarithms are negative, so $t$ is positive.`,
    hints: [t`Divide by 12 000 first.`],
  });
  const th = ln(2) / 0.02;
  chk(80 * Math.exp(-0.02 * th), 40);
  b.calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: t`The mass, $m$ grams, of a radioactive substance after $t$ days is $m = 80\mathrm{e}^{-0.02t}$. Find the time taken for the mass to halve, correct to 3 significant figures.`,
    value: th, wrong: [sfStr(ln(40) / 0.02), -34.7],
    explanation: t`Half the mass is 40 g: $80\mathrm{e}^{-0.02t} = 40$, so $\mathrm{e}^{-0.02t} = 0.5$, $-0.02t = \ln 0.5$ and $t = \dfrac{\ln 2}{0.02} = 34.7$ days (3 s.f.).`,
    hints: [t`Set $m = 40$ and isolate $\mathrm{e}^{-0.02t}$.`, t`$\ln 0.5 = -\ln 2$.`],
  });

  chk(10 ** 2.5, 316.22776601683796);
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: t`Solve $\log_{10} x = 2.5$, giving $x$ correct to 3 significant figures.`,
    options: [
      [t`$316$`, t`Correct: $x = 10^{2.5} = 316.2\ldots$`],
      [t`$0.398$`, t`This is $\log_{10} 2.5$; you need the inverse, $10^{2.5}$.`],
      [t`$25.0$`, t`This multiplies $10 \times 2.5$; the logarithm is an index.`],
      [t`$12.2$`, t`This is $\mathrm{e}^{2.5}$; the base here is 10.`],
    ],
    answer: "A",
    explanation: t`Index form: $x = 10^{2.5} = 316$ (3 s.f.).`,
  });

  same(quad.roots(1, 3, -10), [-5, 2]);
  b.mcq({
    d: 3, skill: "EVALUATION", calculator: false,
    stem: t`Tendai solves $\log_{10} x + \log_{10} (x + 3) = 1$. He reaches $(x + 5)(x - 2) = 0$. Which conclusion is correct?`,
    options: [
      [t`$x = 2$ only; $x = -5$ makes the logarithms undefined`, "Correct: both logarithms need positive arguments."],
      [t`$x = -5$ or $x = 2$; both satisfy the quadratic equation`, "Satisfying the quadratic is not enough: log(−5) does not exist."],
      [t`$x = -5$ only; logarithms of negatives are negative`, "Logarithms of negative numbers are undefined, not negative."],
      [t`no solution; a log equation cannot give a quadratic`, "Combining logarithms often leads to a quadratic; here x = 2 works."],
    ],
    answer: "A",
    explanation: t`$x(x + 3) = 10$ gives $x^2 + 3x - 10 = 0$, so $x = -5$ or $x = 2$. Only $x = 2$ is valid: $\log 2 + \log 5 = \log 10 = 1$.`,
    hints: ["Substitute each value into the original equation."],
  });

  const xs = ln(3) / ln(5 / 9);
  chk(3 ** (2 * xs + 1), 5 ** xs, 1e-9);
  chk(xs, ln(3) / (ln(5) - 2 * ln(3)));
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`An equation is $3^{2x + 1} = 5^x$.`,
    parts: [
      P.proof({ label: "(a)", marks: 3, stem: t`Show that $x = \dfrac{\ln 3}{\ln \frac{5}{9}}$.`,
        points: [t`M1 takes logarithms: $(2x + 1)\ln 3 = x\ln 5$.`, t`M1 collects the $x$ terms: $x(\ln 5 - 2\ln 3) = \ln 3$.`, t`A1 uses $2\ln 3 = \ln 9$ and the quotient law to reach the given result.`],
        modelAnswer: t`$$
(2x + 1)\ln 3 = x\ln 5
$$

$$
2x\ln 3 + \ln 3 = x\ln 5
$$

$$
\ln 3 = x(\ln 5 - 2\ln 3) = x(\ln 5 - \ln 9) = x\ln \frac{5}{9}
$$

$$
x = \frac{\ln 3}{\ln \frac{5}{9}}
$$`,
        explanation: "Take logarithms, expand, collect the x terms and combine the logarithms." }),
      P.num({ label: "(b)", marks: 2, stem: t`Hence find $x$, correct to 3 significant figures.`, value: xs, prefix: "x =", wrong: [sfStr(-xs)],
        explanation: t`$\ln \frac{5}{9} < 0$, so $x = \dfrac{1.0986}{-0.5878} = ${sfStr(xs)}$ (3 s.f.).` }),
    ],
    explanation: "Taking logarithms turns the exponential equation into a linear equation in x.",
    hints: [t`$\ln 3^{2x + 1} = (2x + 1)\ln 3$.`, t`$\ln \frac{5}{9}$ is negative, so $x$ is negative.`],
  });

  {
    const A = 600;
    const k = ln(1.5) / 5;
    chk(A * Math.exp(5 * k), 900);
    const T = ln(2400 / 600) / k;
    chk(A * Math.exp(k * T), 2400, 1e-6);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: t`The number of impala, $P$, in a conservancy near Hwange is modelled by $P = A\mathrm{e}^{kt}$, where $t$ is the time in years after the first count. The first count was 600 and five years later the count was 900.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: t`State the value of $A$.`, value: 600, prefix: "A =", wrong: [900], explanation: t`At $t = 0$, $P = A\mathrm{e}^0 = A$, so $A = 600$.` }),
        P.proof({ label: "(b)", marks: 2, stem: t`Show that $k = \frac{1}{5}\ln 1.5$.`,
          points: [t`M1 substitutes $t = 5$, $P = 900$: $600\mathrm{e}^{5k} = 900$, so $\mathrm{e}^{5k} = 1.5$.`, t`A1 takes $\ln$: $5k = \ln 1.5$, giving the result.`],
          modelAnswer: t`$$
600\mathrm{e}^{5k} = 900 \Rightarrow \mathrm{e}^{5k} = 1.5
$$

$$
5k = \ln 1.5 \Rightarrow k = \frac{1}{5}\ln 1.5
$$`,
          explanation: "Use the second count, isolate the exponential, then take ln." }),
        P.num({ label: "(c)", marks: 1, stem: t`Find $k$ correct to 3 significant figures.`, value: k, prefix: "k =", wrong: [0.3], explanation: t`$k = \frac{\ln 1.5}{5} = 0.0811$ (3 s.f.).` }),
        P.num({ label: "(d)", marks: 3, stem: t`Find the time taken for the population to reach 2400, correct to 3 significant figures.`, value: T, wrong: [sfStr(ln(2400) / k)],
          explanation: t`$600\mathrm{e}^{kt} = 2400$ gives $\mathrm{e}^{kt} = 4$, so $t = \dfrac{\ln 4}{k} = \dfrac{5\ln 4}{\ln 1.5} = ${sfStr(T)}$ years (3 s.f.). Use the exact $k$, not the rounded one.` }),
      ],
      explanation: "Use the two data points to find A and k, then solve the exponential equation for t with logarithms.",
      hints: [t`$\mathrm{e}^0 = 1$.`, t`For (d), divide by 600 before taking logarithms.`],
    });
  }

  b.card("FORMULA", t`Solution of $a^x = b$`, t`$x = \dfrac{\lg b}{\lg a} = \dfrac{\ln b}{\ln a} = \log_a b$`);
  b.card("FACT", t`$\mathrm{e}^x = k$`, t`$x = \ln k$ (only for $k > 0$).`);
  b.card("FACT", t`$\ln x = k$`, t`$x = \mathrm{e}^{k}$`);
  b.card("CONCEPT", "Different bases, e.g. $2^{x+1} = 3^x$", "Take logarithms, expand, collect the terms in x, factorise out x and divide.");
  b.card("CONCEPT", "Solving a logarithmic equation", "Combine into a single logarithm, convert to index form, solve, then check every root.");
  b.card("CONCEPT", "Rejecting a root", "Reject any value that makes the argument of a logarithm zero or negative, and say why.");
  b.card("FORMULA", "Exponential growth and decay", t`$N = N_0 r^t$ (fixed percentage per period) or $N = N_0\mathrm{e}^{kt}$ ($k > 0$ growth, $k < 0$ decay).`);
  b.card("FACT", "Half-life from $m = m_0\\mathrm{e}^{-kt}$", t`$t = \dfrac{\ln 2}{k}$`);
  b.card("CONCEPT", t`$\dfrac{\lg 40}{\lg 5}$ versus $\lg 8$`, "They are different: divide the logarithms, not the numbers inside them.");
});
