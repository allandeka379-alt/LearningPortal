// W3b: amath.calculus.definite-integrals-area
import { concept, P, t, chk, same, integrate, quad, checkAntideriv } from "../lib.mjs";

const { exp, log, sin, cos, PI } = Math;
const I = (f, a, b) => integrate(f, a, b, 4000);

concept("amath.calculus.definite-integrals-area", { file: "calculus/definite-integrals-area", keyPrefix: "calculus.definite-integrals-area" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`$F(x)$ is an integral of $f(x)$. Which expression equals $\displaystyle\int_a^b f(x)\,dx$?`,
    options: [
      [t`$F(b) - F(a)$`, "Correct: upper limit minus lower limit."],
      [t`$F(a) - F(b)$`, "This subtracts the wrong way round and gives the negative of the answer."],
      [t`$F(b) + F(a)$`, "The values at the limits are subtracted, not added."],
      [t`$F(b - a)$`, "F is evaluated at each limit separately, not at their difference."],
    ],
    answer: "A",
    explanation: t`$\int_a^b f(x)\,dx = \Big[F(x)\Big]_a^b = F(b) - F(a)$. Any constant of integration cancels.`,
  });

  {
    const v = I((x) => 4 * x ** 3 + 1, 1, 2);
    chk(v, 16, 1e-9);
    b.num({
      d: 2, skill: "APPLICATION", calculator: false, daily: true,
      stem: t`Evaluate $\displaystyle\int_1^2 (4x^3 + 1)\,dx$.`,
      value: 16, wrong: [18, -16],
      explanation: t`$\Big[x^4 + x\Big]_1^2 = (16 + 2) - (1 + 1) = 18 - 2 = 16$. The answer 18 forgets to subtract the value at the lower limit.`,
    });
  }

  {
    chk(I((x) => x * x - 2 * x + 2, 0, 3), 6, 1e-9);
    b.num({
      d: 2, skill: "APPLICATION", calculator: false, daily: true,
      stem: t`Evaluate $\displaystyle\int_0^3 (x^2 - 2x + 2)\,dx$.`,
      value: 6, wrong: [5, 24],
      explanation: t`$\Big[\frac{x^3}{3} - x^2 + 2x\Big]_0^3 = (9 - 9 + 6) - 0 = 6$.`,
    });
  }

  {
    chk(I((x) => x ** 3, -2, 2), 0, 1e-9);
    b.tf({
      d: 2, skill: "UNDERSTANDING", calculator: false,
      stem: t`$\displaystyle\int_{-2}^{2} x^3\,dx = 0$, so the total area enclosed by $y = x^3$, the $x$-axis and the lines $x = -2$ and $x = 2$ is 0.`,
      answer: false,
      explanation: t`False. The integral is 0 because the part from $-2$ to $0$ (below the axis, integral $-4$) cancels the part from $0$ to $2$ (integral $4$). The total area is $4 + 4 = 8$ square units.`,
    });
  }

  b.tf({
    d: 2, skill: "RECALL", calculator: false,
    stem: t`$\displaystyle\int_b^a f(x)\,dx = -\int_a^b f(x)\,dx$.`,
    answer: true,
    explanation: t`True. Swapping the limits swaps the order of subtraction: $F(a) - F(b) = -\big(F(b) - F(a)\big)$.`,
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`For $a \leq x \leq b$ the curve $y = f(x)$ lies entirely below the $x$-axis. Which expression gives the area between the curve, the $x$-axis and the lines $x = a$ and $x = b$?`,
    options: [
      [t`$-\displaystyle\int_a^b f(x)\,dx$`, "Correct: the integral is negative below the axis, so its negative is the (positive) area."],
      [t`$\displaystyle\int_a^b f(x)\,dx$`, "This is negative, so it cannot be an area."],
      [t`$\displaystyle\int_0^b f(x)\,dx$`, "The limits are x = a and x = b, not 0 and b."],
      [t`$f(b) - f(a)$`, "This uses the function itself, not its integral."],
    ],
    answer: "A",
    explanation: t`Below the axis $y < 0$, so $\int_a^b f(x)\,dx < 0$. The area is its size, $-\int_a^b f(x)\,dx$.`,
  });

  {
    chk(I((x) => 9 - x * x, -3, 3), 36, 1e-9);
    same(quad.roots(-1, 0, 9), [-3, 3]);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`Find the area of the region enclosed by the curve $y = 9 - x^2$ and the $x$-axis.`,
      options: [
        [t`$36$`, "Correct: the integral from −3 to 3 of (9 − x²) is 18 − (−18) = 36."],
        [t`$18$`, "Only the value at the upper limit, F(3), was used; the lower limit gives −18, which must be subtracted."],
        [t`$0$`, t`The $x^3$ term was not divided by 3: $\Big[9x - x^3\Big]_{-3}^{3}$ gives 0.`],
        [t`$-36$`, "The limits were subtracted the wrong way round; an area cannot be negative."],
      ],
      answer: "A",
      explanation: t`The curve meets the axis where $x = \pm 3$ and is above it in between. Area $= \Big[9x - \frac{x^3}{3}\Big]_{-3}^{3} = (27 - 9) - (-27 + 9) = 18 + 18 = 36$ square units.`,
      hints: ["Solve 9 − x² = 0 for the limits."],
    });
  }

  {
    same(quad.roots(1, -5, 4), [1, 4]);
    const v = I((x) => x * x - 5 * x + 4, 1, 4);
    chk(v, -4.5, 1e-9);
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`Find the area of the region enclosed by the curve $y = x^2 - 5x + 4$ and the $x$-axis. Give your answer as a positive number.`,
      value: 4.5, wrong: [-4.5, 13.5],
      explanation: t`Roots: $(x - 1)(x - 4) = 0$. $\int_1^4 (x^2 - 5x + 4)\,dx = \Big[\frac{x^3}{3} - \frac{5x^2}{2} + 4x\Big]_1^4 = \left(\frac{64}{3} - 24\right) - \frac{11}{6} = -\frac{9}{2}$. The region is below the axis, so the area is $\frac{9}{2} = 4.5$ square units.`,
      hints: ["Find the roots first; between them this U-shaped curve is below the axis."],
    });
  }

  {
    const neg = I((x) => x ** 3, -1, 0);
    const pos = I((x) => x ** 3, 0, 2);
    chk(-neg + pos, 17 / 4, 1e-9);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`Find the total area enclosed by the curve $y = x^3$, the $x$-axis and the lines $x = -1$ and $x = 2$.`,
      options: [
        [t`$\frac{17}{4}$`, t`Correct: $\frac{1}{4}$ below the axis (from $-1$ to $0$) plus $4$ above it.`],
        [t`$\frac{15}{4}$`, t`This is $\int_{-1}^{2} x^3\,dx$: the part below the axis was subtracted instead of added.`],
        [t`$4$`, t`Only the part from $0$ to $2$ was counted.`],
        [t`$\frac{1}{4}$`, t`Only the part from $-1$ to $0$, below the axis, was counted.`],
      ],
      answer: "A",
      explanation: t`Split at the root $x = 0$. $\int_{-1}^{0} x^3\,dx = 0 - \frac{1}{4} = -\frac{1}{4}$ (area $\frac{1}{4}$); $\int_0^2 x^3\,dx = 4$. Total area $= \frac{1}{4} + 4 = \frac{17}{4}$.`,
      hints: ["Where does the curve cross the x-axis between the limits?"],
    });
  }

  {
    const v = I((x) => exp(3 * x), 0, 1);
    chk(v, (exp(3) - 1) / 3, 1e-9);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Evaluate $\displaystyle\int_0^1 e^{3x}\,dx$, giving your answer correct to 3 significant figures.`,
      value: v, wrong: [exp(3) / 3, 3 * (exp(3) - 1)],
      explanation: t`$\Big[\frac{1}{3}e^{3x}\Big]_0^1 = \frac{1}{3}e^{3} - \frac{1}{3}e^{0} = \frac{e^3 - 1}{3} = 6.36$. Forgetting that $e^0 = 1$ gives 6.70; multiplying by 3 gives 57.3.`,
      hints: [t`$e^0 = 1$, not 0.`],
    });
  }

  {
    const v = I((x) => sin(2 * x), 0, PI / 3);
    chk(v, 0.75, 1e-9);
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`Find the exact value of $\displaystyle\int_0^{\frac{\pi}{3}} \sin 2x\,dx$.`,
      value: 0.75, wrong: [0.25, -0.75],
      explanation: t`$\Big[-\frac{1}{2}\cos 2x\Big]_0^{\frac{\pi}{3}} = -\frac{1}{2}\cos\frac{2\pi}{3} + \frac{1}{2}\cos 0 = -\frac{1}{2}\left(-\frac{1}{2}\right) + \frac{1}{2} = \frac{3}{4}$. Taking $\cos\frac{2\pi}{3} = +\frac{1}{2}$ gives $\frac{1}{4}$.`,
      hints: [t`$\cos\frac{2\pi}{3} = -\frac{1}{2}$.`],
    });
  }

  {
    const v = I((x) => 2 / (2 * x - 1), 1, 5);
    chk(v, log(9), 1e-9);
    b.expr({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`Find the exact value of $\displaystyle\int_1^5 \frac{2}{2x - 1}\,dx$, giving your answer as a single logarithm, for example ln 7.`,
      accepted: ["ln9", "ln(9)", "2ln3", "2ln(3)", "log_e9"],
      wrong: ["2ln9", "ln8"],
      explanation: t`$\int \frac{2}{2x - 1}\,dx = \ln(2x - 1)$. So $\Big[\ln(2x - 1)\Big]_1^5 = \ln 9 - \ln 1 = \ln 9$ (or $2\ln 3$). Using $2\ln(2x - 1)$ forgets to divide by the coefficient 2.`,
      hints: [t`$\ln 1 = 0$.`],
    });
  }

  {
    chk(I((x) => (2 * x - 1) ** 3, 0, 2), 10, 1e-9);
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`Evaluate $\displaystyle\int_0^2 (2x - 1)^3\,dx$.`,
      value: 10, wrong: [20, 40],
      explanation: t`$\int (2x - 1)^3\,dx = \frac{(2x - 1)^4}{4 \times 2} = \frac{(2x - 1)^4}{8}$. So $\frac{3^4}{8} - \frac{(-1)^4}{8} = \frac{81 - 1}{8} = 10$. Forgetting to divide by 2 gives 20.`,
      hints: ["Divide by the new power 4 and by the coefficient of x, 2."],
    });
  }

  {
    // ∫_1^k (2x − 3) dx = 6 → k² − 3k − 4 = 0 → k = 4
    same(quad.roots(1, -3, -4), [-1, 4]);
    chk(I((x) => 2 * x - 3, 1, 4), 6, 1e-9);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`Given that $k > 1$ and $\displaystyle\int_1^k (2x - 3)\,dx = 6$, find the value of $k$.`,
      options: [
        [t`$4$`, t`Correct: $k^2 - 3k + 2 = 6$ gives $(k - 4)(k + 1) = 0$, and $k > 1$.`],
        [t`$-1$`, t`This root of the quadratic is rejected because $k > 1$.`],
        [t`$\frac{3 + \sqrt{33}}{2}$`, t`The lower limit was ignored: $k^2 - 3k = 6$.`],
        [t`$\frac{3 + \sqrt{41}}{2}$`, t`The value at the lower limit, $-2$, was added instead of subtracted: $k^2 - 3k - 2 = 6$.`],
      ],
      answer: "A",
      explanation: t`$\Big[x^2 - 3x\Big]_1^k = (k^2 - 3k) - (1 - 3) = k^2 - 3k + 2 = 6$, so $k^2 - 3k - 4 = (k - 4)(k + 1) = 0$. Since $k > 1$, $k = 4$.`,
      hints: ["Substitute the limits to get a quadratic in k."],
    });
  }

  b.match({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "Match each definite integral with its value.",
    pairs: [
      [t`$\displaystyle\int_0^1 x\,dx$`, t`$\frac{1}{2}$`],
      [t`$\displaystyle\int_0^3 x^2\,dx$`, t`$9$`],
      [t`$\displaystyle\int_0^1 4x^3\,dx$`, t`$1$`],
      [t`$\displaystyle\int_1^3 2\,dx$`, t`$4$`],
    ],
    explanation: t`$\Big[\frac{x^2}{2}\Big]_0^1 = \frac{1}{2}$; $\Big[\frac{x^3}{3}\Big]_0^3 = 9$; $\Big[x^4\Big]_0^1 = 1$; $\Big[2x\Big]_1^3 = 6 - 2 = 4$.`,
  });

  {
    // show ∫_1^4 (x + 2)/√x dx = 26/3
    checkAntideriv((x) => (2 / 3) * x ** 1.5 + 4 * Math.sqrt(x), (x) => (x + 2) / Math.sqrt(x), 1, 4);
    chk(I((x) => (x + 2) / Math.sqrt(x), 1, 4), 26 / 3, 1e-8);
    b.proof({
      d: 4, skill: "ANALYSIS", calculator: false, marks: 4,
      stem: t`Show that $\displaystyle\int_1^4 \frac{x + 2}{\sqrt{x}}\,dx = \frac{26}{3}$.`,
      points: [
        t`M1 splits the integrand: $x^{\frac{1}{2}} + 2x^{-\frac{1}{2}}$.`,
        t`M1 integrates correctly: $\frac{2}{3}x^{\frac{3}{2}} + 4x^{\frac{1}{2}}$.`,
        t`M1 substitutes both limits: $\left(\frac{16}{3} + 8\right) - \left(\frac{2}{3} + 4\right)$.`,
        t`A1 reaches $\frac{26}{3}$ with no errors.`,
      ],
      modelAnswer: t`$$
\frac{x + 2}{\sqrt{x}} = x^{\frac{1}{2}} + 2x^{-\frac{1}{2}}
$$

$$
\int_1^4 \left(x^{\frac{1}{2}} + 2x^{-\frac{1}{2}}\right)dx = \Big[\tfrac{2}{3}x^{\frac{3}{2}} + 4x^{\frac{1}{2}}\Big]_1^4
$$

$$
= \left(\tfrac{16}{3} + 8\right) - \left(\tfrac{2}{3} + 4\right) = \tfrac{40}{3} - \tfrac{14}{3} = \tfrac{26}{3}
$$`,
      explanation: "Divide each term by √x, integrate the powers, then substitute the limits.",
      hints: [t`$\frac{x}{\sqrt{x}} = x^{\frac{1}{2}}$ and $\frac{2}{\sqrt{x}} = 2x^{-\frac{1}{2}}$.`, t`$4^{\frac{3}{2}} = 8$.`],
    });
  }

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: t`Farai finds the area between $y = x^3 - 4x$ and the $x$-axis by working out $\displaystyle\int_{-2}^{2} (x^3 - 4x)\,dx$ and gets 0. Explain why this is not the area and how he should find it.`,
    points: [
      t`Explains that the curve crosses the axis at $x = 0$: one part is above and one below, so the positive and negative integrals cancel.`,
      t`States that he should integrate from $-2$ to $0$ and from $0$ to $2$ separately and add the sizes (the area is $4 + 4 = 8$).`,
    ],
    modelAnswer: t`The curve $y = x(x - 2)(x + 2)$ is above the axis for $-2 < x < 0$ and below it for $0 < x < 2$, so the two integrals ($4$ and $-4$) cancel. He should split at $x = 0$, find each integral separately and add their sizes: area $= 4 + 4 = 8$ square units.`,
    explanation: "A definite integral counts area below the axis as negative.",
    hints: ["Factorise x³ − 4x and find the roots."],
  });

  {
    // line y = x + 6 and curve y = x²
    same(quad.roots(1, -1, -6), [-2, 3]);
    const A = I((x) => x + 6 - x * x, -2, 3);
    chk(A, 125 / 6, 1e-9);
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
      stem: t`The line $y = x + 6$ meets the curve $y = x^2$ at the points $A$ and $B$.`,
      parts: [
        P.fib({ label: "(a)", marks: 2, stem: t`Find the $x$-coordinates of $A$ and $B$, in ascending order.`, template: "x = {{blank:a}} and x = {{blank:b}}",
          blanks: [{ id: "a", input: "number", accepted: [-2], wrong: "2" }, { id: "b", input: "number", accepted: [3], wrong: "-3" }],
          explanation: t`$x^2 = x + 6$ gives $x^2 - x - 6 = (x - 3)(x + 2) = 0$.` }),
        P.num({ label: "(b)", marks: 3, stem: t`Find the area of the region enclosed by the line and the curve, as an exact fraction or correct to 3 significant figures.`, value: A, wrong: [I((x) => x * x, -2, 3), -A],
          explanation: t`The line is above the curve between the roots (at $x = 0$: $6 > 0$). Area $= \Big[\frac{x^2}{2} + 6x - \frac{x^3}{3}\Big]_{-2}^{3} = \frac{27}{2} - \left(-\frac{22}{3}\right) = \frac{125}{6} \approx 20.8$ square units.` }),
      ],
      explanation: "Solve for the intersections, then integrate (upper − lower) between them.",
      hints: [t`At $x = -2$: $2 - 12 + \frac{8}{3} = -\frac{22}{3}$.`],
    });
  }

  {
    // y = x² and y = 8 − x²
    same(quad.roots(2, 0, -8), [-2, 2]);
    const A = I((x) => 8 - 2 * x * x, -2, 2);
    chk(A, 64 / 3, 1e-9);
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
      stem: t`The curves $y = x^2$ and $y = 8 - x^2$ enclose a region $R$.`,
      parts: [
        P.fib({ label: "(a)", marks: 2, stem: t`Find the $x$-coordinates of the points where the curves meet, in ascending order.`, template: "x = {{blank:a}} and x = {{blank:b}}",
          blanks: [{ id: "a", input: "number", accepted: [-2], wrong: "-4" }, { id: "b", input: "number", accepted: [2], wrong: "4" }],
          explanation: t`$x^2 = 8 - x^2$ gives $2x^2 = 8$, so $x = \pm 2$.` }),
        P.proof({ label: "(b)", marks: 1, stem: t`Explain why the area of $R$ is $\displaystyle\int_{-2}^{2} (8 - 2x^2)\,dx$.`,
          points: [t`States that $y = 8 - x^2$ is the upper curve (e.g. at $x = 0$: $8 > 0$) and subtracts: $(8 - x^2) - x^2 = 8 - 2x^2$.`],
          modelAnswer: t`Between $x = -2$ and $x = 2$ the curve $y = 8 - x^2$ is above $y = x^2$ (at $x = 0$ they give 8 and 0), so the height of the region is $(8 - x^2) - x^2 = 8 - 2x^2$.`,
          explanation: "Area between two curves = ∫ (upper − lower) dx." }),
        P.num({ label: "(c)", marks: 3, stem: t`Find the area of $R$, as an exact fraction or correct to 3 significant figures.`, value: A, wrong: [32 / 3, 16],
          explanation: t`$\Big[8x - \frac{2x^3}{3}\Big]_{-2}^{2} = \left(16 - \frac{16}{3}\right) - \left(-16 + \frac{16}{3}\right) = \frac{64}{3} \approx 21.3$ square units.` }),
      ],
      explanation: "Find the limits, decide which curve is on top, then integrate the difference.",
      hints: [t`Upper minus lower: $(8 - x^2) - x^2$.`],
    });
  }

  {
    // y = x³ − 2x² − 3x = x(x − 3)(x + 1)
    const f = (x) => x ** 3 - 2 * x * x - 3 * x;
    same([-1, 0, 3].map(f), [0, 0, 0]);
    const p1 = I(f, -1, 0);
    const p2 = I(f, 0, 3);
    chk(p1, 7 / 12, 1e-9);
    chk(p2, -45 / 4, 1e-9);
    chk(p1 - p2, 71 / 6, 1e-9);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
      stem: t`The curve $y = x^3 - 2x^2 - 3x$ meets the $x$-axis at three points.`,
      parts: [
        P.fib({ label: "(a)", marks: 2, stem: t`Factorise $x^3 - 2x^2 - 3x$ and hence give the three $x$-coordinates, in ascending order.`, template: "x = {{blank:a}}, {{blank:b}}, {{blank:c}}",
          blanks: [{ id: "a", input: "number", accepted: [-1], wrong: "1" }, { id: "b", input: "number", accepted: [0], wrong: "1" }, { id: "c", input: "number", accepted: [3], wrong: "-3" }],
          explanation: t`$x(x^2 - 2x - 3) = x(x - 3)(x + 1)$, so $x = -1, 0, 3$.` }),
        P.num({ label: "(b)", marks: 2, stem: t`Evaluate $\displaystyle\int_{-1}^{0} (x^3 - 2x^2 - 3x)\,dx$, as an exact fraction or correct to 3 significant figures.`, value: p1, wrong: [-p1],
          explanation: t`$F(x) = \frac{x^4}{4} - \frac{2x^3}{3} - \frac{3x^2}{2}$. $F(0) - F(-1) = 0 - \left(\frac{1}{4} + \frac{2}{3} - \frac{3}{2}\right) = \frac{7}{12}$.` }),
        P.num({ label: "(c)", marks: 3, stem: t`Find the total area enclosed by the curve and the $x$-axis, as an exact fraction or correct to 3 significant figures.`, value: p1 - p2, wrong: [p1 + p2, -p2],
          explanation: t`$F(3) - F(0) = \frac{81}{4} - 18 - \frac{27}{2} = -\frac{45}{4}$ (below the axis). Total area $= \frac{7}{12} + \frac{45}{4} = \frac{7}{12} + \frac{135}{12} = \frac{71}{6} \approx 11.8$ square units.` }),
      ],
      explanation: "Split the region at the middle root: one part is above the axis and the other below. Add the sizes.",
      hints: [t`The cubic has a positive $x^3$ term: above the axis between the first two roots, below between the last two.`],
    });
  }

  b.card("DEFINITION", "Definite integral", t`$\int_a^b f(x)\,dx = \Big[F(x)\Big]_a^b = F(b) - F(a)$, a number; the constant c cancels.`);
  b.card("FORMULA", "Area under a curve (above the x-axis)", t`$\int_a^b y\,dx$`);
  b.card("FACT", "Region below the x-axis", "The definite integral is negative; the area is its size (modulus).");
  b.card("CONCEPT", "Curve crossing the axis", "Split the integral at every root inside the interval and add the sizes of the parts; a single integral lets them cancel.");
  b.card("FORMULA", "Area between two graphs", t`$\int_a^b (y_{\text{upper}} - y_{\text{lower}})\,dx$, with $a$ and $b$ where the graphs meet.`);
  b.card("FACT", "Swapping the limits", t`$\int_b^a f(x)\,dx = -\int_a^b f(x)\,dx$`);
  b.card("FACT", "Joining intervals", t`$\int_a^b f(x)\,dx + \int_b^c f(x)\,dx = \int_a^c f(x)\,dx$`);
  b.card("CONCEPT", "Finding the limits", "Solve the equations of the boundaries simultaneously (or y = 0 for the x-axis); the solutions are the limits of integration.");
  b.card("FACT", "Exact answers", t`On non-calculator papers keep fractions, $\pi$, $e$ and $\ln$: e.g. $\int_1^5 \frac{2}{2x - 1}\,dx = \ln 9$.`);
});
