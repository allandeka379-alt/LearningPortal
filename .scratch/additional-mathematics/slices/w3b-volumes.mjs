// W3b: amath.calculus.volumes-of-revolution (ZIMSEC only)
import { concept, P, t, chk, same, integrate, quad } from "../lib.mjs";

const { PI, exp, sqrt } = Math;
const V = (f, a, b) => PI * integrate((x) => f(x) ** 2, a, b, 4000);

concept("amath.calculus.volumes-of-revolution", { file: "calculus/volumes-of-revolution", keyPrefix: "calculus.volumes-of-revolution" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`The region under the curve $y = f(x)$ between $x = a$ and $x = b$ is rotated through $360°$ about the $x$-axis. Which expression gives the volume of the solid formed?`,
    options: [
      [t`$\pi\displaystyle\int_a^b y^2\,dx$`, "Correct: each slice is a disc of radius y and area πy²."],
      [t`$\pi\displaystyle\int_a^b y\,dx$`, "The radius y must be squared: a disc has area πy²."],
      [t`$2\pi\displaystyle\int_a^b y\,dx$`, "2πy is the circumference of a slice, not its area."],
      [t`$\pi\displaystyle\int_a^b x^2\,dx$`, "The radius of each disc is the height y of the curve, not x."],
    ],
    answer: "A",
    explanation: t`A thin slice of thickness $\delta x$ is a disc of radius $y$, volume $\pi y^2\,\delta x$. Summing gives $V = \pi\int_a^b y^2\,dx$.`,
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`A region under a curve $y = f(x)$ is rotated through $360°$ about the $x$-axis. What shape is the cross-section of the solid at right angles to the $x$-axis at a point $x$?`,
    options: [
      [t`A circle of radius $y$`, "Correct: every point at height y traces a circle about the axis."],
      [t`A circle of radius $x$`, t`The distance from the axis is $y$; $x$ only says where the slice is.`],
      [t`A square of side $y$`, "Rotation about an axis always produces circular cross-sections."],
      [t`A semicircle of radius $y$`, "A full turn of 360° gives a whole circle; 180° would give half."],
    ],
    answer: "A",
    explanation: t`The point $(x, y)$ on the curve is a distance $y$ from the $x$-axis, so it sweeps out a circle of radius $y$. This is why the formula contains $\pi y^2$.`,
  });

  b.tf({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`The volume of revolution can be found as $\left(\pi\displaystyle\int_a^b y\,dx\right)^2$.`,
    answer: false,
    explanation: t`False. Each slice's radius is squared inside the integral: $V = \pi\int_a^b y^2\,dx$. Squaring the area integral gives a different, meaningless number.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`If the region being rotated lies below the $x$-axis, $\pi\displaystyle\int_a^b y^2\,dx$ comes out negative.`,
    answer: false,
    explanation: t`False. $y^2 \geq 0$ for every $y$, so the integral (with $a < b$) is never negative. A region below the axis gives the same solid as its mirror image above the axis.`,
  });

  {
    const v = V((x) => 3 * x, 0, 2);
    chk(v / PI, 24, 1e-8);
    b.num({
      d: 2, skill: "APPLICATION", calculator: false, daily: true,
      stem: t`The region under $y = 3x$ from $x = 0$ to $x = 2$ is rotated through $360°$ about the $x$-axis. The volume of the solid is $k\pi$ cubic units. Find $k$.`,
      value: 24, wrong: [6, 8],
      explanation: t`$V = \pi\int_0^2 9x^2\,dx = \pi\Big[3x^3\Big]_0^2 = 24\pi$. Check with the cone formula: radius 6, height 2, $\frac{1}{3}\pi(36)(2) = 24\pi$. The answer 6 forgets to square $y$.`,
    });
  }

  {
    const v = V((x) => sqrt(x), 0, 6);
    chk(v / PI, 18, 1e-8);
    b.num({
      d: 2, skill: "APPLICATION", calculator: false, daily: true,
      stem: t`The region under $y = \sqrt{x}$ from $x = 0$ to $x = 6$ is rotated through $360°$ about the $x$-axis. The volume is $k\pi$ cubic units. Find $k$.`,
      value: 18, wrong: [36, 4 * sqrt(6)],
      explanation: t`$y^2 = x$, so $V = \pi\int_0^6 x\,dx = \pi\Big[\frac{x^2}{2}\Big]_0^6 = 18\pi$. The answer 36 forgets to divide by 2.`,
    });
  }

  {
    const v = V((x) => x * x, 0, 2);
    chk(v / PI, 32 / 5, 1e-8);
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`The region bounded by $y = x^2$, the $x$-axis and the line $x = 2$ is rotated through $360°$ about the $x$-axis. The volume is $k\pi$ cubic units. Find $k$, as a fraction or a decimal.`,
      value: 32 / 5, wrong: [8 / 3, 16],
      explanation: t`$y^2 = x^4$, so $V = \pi\int_0^2 x^4\,dx = \pi\Big[\frac{x^5}{5}\Big]_0^2 = \frac{32}{5}\pi = 6.4\pi$. The answer $\frac{8}{3}$ forgets to square $y$.`,
      hints: [t`$(x^2)^2 = x^4$.`],
    });
  }

  {
    const v = V((x) => x + 1, 0, 3);
    chk(v / PI, 21, 1e-8);
    chk(PI * integrate((x) => x * x + 1, 0, 3) / PI, 12, 1e-8);
    chk(PI * integrate((x) => x + 1, 0, 3) / PI, 7.5, 1e-8);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`The region under $y = x + 1$ from $x = 0$ to $x = 3$ is rotated through $360°$ about the $x$-axis. Find the exact volume of the solid.`,
      options: [
        [t`$21\pi$`, t`Correct: $\pi\Big[\frac{(x + 1)^3}{3}\Big]_0^3 = \pi\left(\frac{64}{3} - \frac{1}{3}\right) = 21\pi$.`],
        [t`$12\pi$`, t`$(x + 1)^2$ was squared term by term as $x^2 + 1$.`],
        [t`$\frac{64\pi}{3}$`, t`The lower limit gives $\frac{1}{3}$, not 0, because $(0 + 1)^3 = 1$.`],
        [t`$\frac{15\pi}{2}$`, t`$y$ was not squared: this is $\pi\int_0^3 (x + 1)\,dx$.`],
      ],
      answer: "A",
      explanation: t`$V = \pi\int_0^3 (x + 1)^2\,dx = \pi\int_0^3 (x^2 + 2x + 1)\,dx = \pi(9 + 9 + 3) = 21\pi$ cubic units.`,
      hints: [t`$(x + 1)^2 = x^2 + 2x + 1$, not $x^2 + 1$.`],
    });
  }

  {
    const v = V((x) => x * x + 2, 0, 1);
    chk(v / PI, integrate((x) => x ** 4 + 4 * x * x + 4, 0, 1), 1e-8);
    b.mcq({
      d: 2, skill: "APPLICATION", calculator: false,
      stem: t`The region under $y = x^2 + 2$ from $x = 0$ to $x = 1$ is rotated through $360°$ about the $x$-axis. Which integral gives the volume?`,
      options: [
        [t`$\pi\displaystyle\int_0^1 (x^4 + 4x^2 + 4)\,dx$`, t`Correct: $(x^2 + 2)^2 = x^4 + 4x^2 + 4$.`],
        [t`$\pi\displaystyle\int_0^1 (x^4 + 4)\,dx$`, t`The middle term $2 \times x^2 \times 2 = 4x^2$ is missing.`],
        [t`$\pi\displaystyle\int_0^1 (x^2 + 2)\,dx$`, t`$y$ has not been squared; this is $\pi$ times the area.`],
        [t`$\pi\displaystyle\int_0^1 (x^4 + 2x^2 + 4)\,dx$`, t`The middle term of $(x^2 + 2)^2$ is $2 \times x^2 \times 2 = 4x^2$, not $2x^2$.`],
      ],
      answer: "A",
      explanation: t`$V = \pi\int_0^1 y^2\,dx$ with $y^2 = (x^2 + 2)^2 = x^4 + 4x^2 + 4$.`,
    });
  }

  {
    const v = V((x) => exp(x / 2), 0, 3);
    chk(v, PI * (exp(3) - 1), 1e-8);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`The region under $y = e^{\frac{x}{2}}$ from $x = 0$ to $x = 3$ is rotated through $360°$ about the $x$-axis. Find the volume of the solid, correct to 3 significant figures.`,
      value: v, unit: "units³", wrong: [PI * exp(3), 2 * PI * (exp(1.5) - 1)],
      explanation: t`$y^2 = \left(e^{\frac{x}{2}}\right)^2 = e^{x}$, so $V = \pi\int_0^3 e^{x}\,dx = \pi\Big[e^x\Big]_0^3 = \pi(e^3 - 1) \approx 60.0$. Forgetting $e^0 = 1$ gives 63.1; not squaring $y$ gives 21.9.`,
      hints: [t`$\left(e^{\frac{x}{2}}\right)^2 = e^{x}$.`],
    });
  }

  {
    const v = V((x) => 1 / x, 1, 3);
    chk(v, (2 * PI) / 3, 1e-8);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`The region under $y = \dfrac{1}{x}$ from $x = 1$ to $x = 3$ is rotated through $360°$ about the $x$-axis. Find the volume of the solid, correct to 3 significant figures.`,
      value: v, unit: "units³", wrong: [PI * Math.log(3), (4 * PI) / 3],
      explanation: t`$y^2 = x^{-2}$, so $V = \pi\int_1^3 x^{-2}\,dx = \pi\Big[-\frac{1}{x}\Big]_1^3 = \pi\left(-\frac{1}{3} + 1\right) = \frac{2\pi}{3} \approx 2.09$. Not squaring $y$ gives $\pi\ln 3 \approx 3.45$.`,
      hints: [t`$\int x^{-2}\,dx = -x^{-1}$.`],
    });
  }

  {
    const v = V((x) => 2 * sqrt(x), 0, 4);
    chk(v / PI, 32, 1e-8);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`The region under $y = 2\sqrt{x}$ from $x = 0$ to $x = 4$ is rotated through $360°$ about the $x$-axis. Find the exact volume.`,
      options: [
        [t`$32\pi$`, t`Correct: $y^2 = 4x$ and $\pi\int_0^4 4x\,dx = \pi\Big[2x^2\Big]_0^4 = 32\pi$.`],
        [t`$16\pi$`, t`Only $\sqrt{x}$ was squared: $(2\sqrt{x})^2 = 4x$, not $2x$.`],
        [t`$\frac{32\pi}{3}$`, t`$y$ was not squared: this is $\pi\int_0^4 2\sqrt{x}\,dx$.`],
        [t`$64\pi$`, t`The integral of $4x$ is $2x^2$, not $4x^2$.`],
      ],
      answer: "A",
      explanation: t`$V = \pi\int_0^4 (2\sqrt{x})^2\,dx = \pi\int_0^4 4x\,dx = \pi\Big[2x^2\Big]_0^4 = 32\pi$ cubic units.`,
      hints: [t`$(2\sqrt{x})^2 = 4x$.`],
    });
  }

  {
    const v = V((x) => 1 / (x + 1), 0, 3);
    chk(v / PI, 0.75, 1e-8);
    b.num({
      d: 4, skill: "APPLICATION", calculator: false,
      stem: t`The region under $y = \dfrac{1}{x + 1}$ from $x = 0$ to $x = 3$ is rotated through $360°$ about the $x$-axis. The volume is $k\pi$ cubic units. Find $k$, as a fraction or a decimal.`,
      value: 0.75, wrong: [Math.log(4), -0.75],
      explanation: t`$y^2 = (x + 1)^{-2}$, so $V = \pi\Big[-(x + 1)^{-1}\Big]_0^3 = \pi\left(-\frac{1}{4} + 1\right) = \frac{3}{4}\pi$. Not squaring $y$ leads to $\ln 4$.`,
      hints: [t`$\int (x + 1)^{-2}\,dx = -(x + 1)^{-1}$.`],
    });
  }

  {
    // y = k√x from 0 to 2 has volume 50π → 2k² = 50 → k = 5
    chk(V((x) => 5 * sqrt(x), 0, 2) / PI, 50, 1e-8);
    b.num({
      d: 4, skill: "ANALYSIS", calculator: false,
      stem: t`The region under $y = k\sqrt{x}$, where $k > 0$, from $x = 0$ to $x = 2$ is rotated through $360°$ about the $x$-axis. The volume of the solid is $50\pi$. Find $k$.`,
      value: 5, wrong: [25, 12.5],
      explanation: t`$V = \pi\int_0^2 k^2x\,dx = \pi k^2\Big[\frac{x^2}{2}\Big]_0^2 = 2k^2\pi$. So $2k^2 = 50$, $k^2 = 25$ and $k = 5$ (as $k > 0$). The answer 25 is $k^2$.`,
      hints: [t`$(k\sqrt{x})^2 = k^2x$.`],
    });
  }

  b.match({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Before integrating a volume, $y^2$ is written out. Match each curve with $y^2$.`,
    pairs: [
      [t`$y = 3\sqrt{x}$`, t`$y^2 = 9x$`],
      [t`$y = 2x$`, t`$y^2 = 4x^2$`],
      [t`$y = e^{2x}$`, t`$y^2 = e^{4x}$`],
      [t`$y = x - 1$`, t`$y^2 = x^2 - 2x + 1$`],
    ],
    explanation: t`Square every factor: $(3\sqrt{x})^2 = 9x$, $(2x)^2 = 4x^2$, $(e^{2x})^2 = e^{4x}$, and expand $(x - 1)^2$ fully.`,
  });

  {
    // cone by rotation of y = (r/h) x
    const r = 2.5, h = 4;
    chk(V((x) => (r / h) * x, 0, h), (PI * r * r * h) / 3, 1e-8);
    b.proof({
      d: 4, skill: "ANALYSIS", calculator: false, marks: 4,
      stem: t`The region under the line $y = \dfrac{r}{h}x$ from $x = 0$ to $x = h$, where $r$ and $h$ are positive constants, is rotated through $360°$ about the $x$-axis. Show that the volume of the cone formed is $\dfrac{1}{3}\pi r^2h$.`,
      points: [
        t`M1 writes $V = \pi\int_0^h \frac{r^2}{h^2}x^2\,dx$.`,
        t`M1 integrates: $\pi\frac{r^2}{h^2}\Big[\frac{x^3}{3}\Big]_0^h$.`,
        t`M1 substitutes the limits: $\pi\frac{r^2}{h^2} \times \frac{h^3}{3}$.`,
        t`A1 simplifies to $\frac{1}{3}\pi r^2h$.`,
      ],
      modelAnswer: t`$$
V = \pi\int_0^h \left(\frac{r}{h}x\right)^2 dx = \pi\frac{r^2}{h^2}\int_0^h x^2\,dx
$$

$$
= \pi\frac{r^2}{h^2}\Big[\frac{x^3}{3}\Big]_0^h = \pi\frac{r^2}{h^2} \times \frac{h^3}{3}
$$

$$
= \frac{1}{3}\pi r^2h
$$`,
      explanation: t`The line passes through the origin and $(h, r)$, so rotating it gives a cone of radius $r$ and height $h$.`,
      hints: [t`$\frac{r}{h}$ is a constant: take $\frac{r^2}{h^2}$ outside the integral.`],
    });
  }

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: t`Explain why the formula for a volume of revolution about the $x$-axis contains $\pi y^2$.`,
    points: [
      t`Explains that a thin slice at right angles to the axis is (approximately) a disc/cylinder of radius $y$.`,
      t`States that its volume is $\pi y^2\,\delta x$, so summing the slices and letting $\delta x \to 0$ gives $\pi\int y^2\,dx$.`,
    ],
    modelAnswer: t`Cut the solid into thin slices of thickness $\delta x$. Each slice is almost a disc whose radius is the height $y$ of the curve, so its volume is about $\pi y^2\,\delta x$. Adding the slices and letting $\delta x \to 0$ gives $V = \pi\int_a^b y^2\,dx$.`,
    explanation: "Volume of a cylinder = πr² × thickness, with r = y.",
    hints: ["What shape is a thin slice of the solid?"],
  });

  {
    // y = 3x − x², 0..3: V = 81π/10
    same(quad.roots(-1, 3, 0), [0, 3]);
    const v = V((x) => 3 * x - x * x, 0, 3);
    chk(v / PI, 8.1, 1e-8);
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
      stem: t`The region $R$ is enclosed by the curve $y = 3x - x^2$ and the $x$-axis. $R$ is rotated through $360°$ about the $x$-axis.`,
      parts: [
        P.fib({ label: "(a)", marks: 2, stem: t`Find the $x$-coordinates of the points where the curve meets the $x$-axis, in ascending order.`, template: "x = {{blank:a}} and x = {{blank:b}}",
          blanks: [{ id: "a", input: "number", accepted: [0], wrong: "-3" }, { id: "b", input: "number", accepted: [3], wrong: "-3" }],
          explanation: t`$3x - x^2 = x(3 - x) = 0$ gives $x = 0$ or $x = 3$.` }),
        P.fib({ label: "(b)", marks: 1, stem: t`Expand $y^2$ in the form $9x^2 + px^3 + x^4$.`, template: "p = {{blank:p}}",
          blanks: [{ id: "p", input: "number", accepted: [-6], wrong: "-3" }],
          explanation: t`$(3x - x^2)^2 = 9x^2 - 6x^3 + x^4$.` }),
        P.num({ label: "(c)", marks: 3, stem: t`The volume of the solid is $k\pi$ cubic units. Find $k$, as a fraction or a decimal.`, value: 8.1, wrong: [4.5, 27],
          explanation: t`$V = \pi\Big[3x^3 - \frac{3x^4}{2} + \frac{x^5}{5}\Big]_0^3 = \pi\left(81 - \frac{243}{2} + \frac{243}{5}\right) = \frac{81}{10}\pi$. The answer 4.5 is the area of $R$, not the volume.` }),
      ],
      explanation: "Find the limits, expand y², integrate and keep π as a factor.",
      hints: [t`$3^4 = 81$ and $3^5 = 243$.`],
    });
  }

  {
    // y = e^x + 1, 0..1: V = π(½e² + 2e − 3/2)
    const v = V((x) => exp(x) + 1, 0, 1);
    chk(v, PI * (exp(2) / 2 + 2 * exp(1) - 1.5), 1e-8);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: t`The region under the curve $y = e^{x} + 1$ from $x = 0$ to $x = 1$ is rotated through $360°$ about the $x$-axis.`,
      parts: [
        P.fib({ label: "(a)", marks: 2, stem: t`Expand $y^2$ in the form $e^{px} + qe^{x} + 1$.`, template: "p = {{blank:p}}, q = {{blank:q}}",
          blanks: [{ id: "p", input: "number", accepted: [2], wrong: "1" }, { id: "q", input: "number", accepted: [2], wrong: "0" }],
          explanation: t`$(e^{x} + 1)^2 = e^{2x} + 2e^{x} + 1$.` }),
        P.fib({ label: "(b)", marks: 3, stem: t`Show that the volume is $\pi\left(ae^2 + be + c\right)$ and find the constants. Type fractions or decimals.`, template: "a = {{blank:a}}, b = {{blank:b}}, c = {{blank:c}}",
          blanks: [
            { id: "a", input: "number", accepted: ["1/2"], tolerance: 0.001, wrong: "1" },
            { id: "b", input: "number", accepted: [2], wrong: "1" },
            { id: "c", input: "number", accepted: ["-3/2"], tolerance: 0.001, wrong: "1" },
          ],
          explanation: t`$\pi\Big[\frac{1}{2}e^{2x} + 2e^{x} + x\Big]_0^1 = \pi\left(\frac{1}{2}e^2 + 2e + 1\right) - \pi\left(\frac{1}{2} + 2\right) = \pi\left(\frac{1}{2}e^2 + 2e - \frac{3}{2}\right)$.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Find the volume correct to 3 significant figures.`, value: v, unit: "units³", wrong: [PI * (exp(2) / 2 + 2 * exp(1) + 1)],
          explanation: t`$\pi(3.6945 + 5.4366 - 1.5) = \pi(7.6311) \approx 24.0$. Forgetting the lower limit gives 31.8.` }),
      ],
      explanation: "Expand the square, integrate each exponential, and remember that the lower limit gives e⁰ = 1, not 0.",
      hints: [t`$\int e^{2x}\,dx = \frac{1}{2}e^{2x}$.`, t`At $x = 0$: $\frac{1}{2} + 2 + 0 = \frac{5}{2}$.`],
    });
  }

  b.card("FORMULA", "Volume of revolution about the x-axis", t`$V = \pi\int_a^b y^2\,dx$`, "ZIMSEC only; rotation through 360°.");
  b.card("CONCEPT", "Why πy²?", "Each thin slice is a disc of radius y and thickness δx, volume πy²δx; summing the slices gives the integral.");
  b.card("FACT", "Expand y² first", t`$(x^2 + 1)^2 = x^4 + 2x^2 + 1$, not $x^4 + 1$.`);
  b.card("FACT", "Squaring an exponential", t`$(e^{ax})^2 = e^{2ax}$`);
  b.card("FACT", "Regions below the x-axis", t`Volumes are never negative: $y^2 \geq 0$.`);
  b.card("CONCEPT", "Checking with a cone", t`Rotating $y = \frac{r}{h}x$ from 0 to $h$ gives $\frac{1}{3}\pi r^2h$, the cone formula.`);
  b.card("CONCEPT", "Checking with a sphere", t`Rotating $y = \sqrt{r^2 - x^2}$ from $-r$ to $r$ gives $\frac{4}{3}\pi r^3$.`);
  b.card("FACT", "Exact answers", t`"In terms of $\pi$": keep $\pi$ outside the integral and write e.g. $\frac{206\pi}{15}$.`);
});
