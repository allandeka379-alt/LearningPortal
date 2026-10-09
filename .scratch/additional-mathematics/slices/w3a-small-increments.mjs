// W3a: amath.calculus.small-increments
import { concept, P, t, chk, checkDeriv, sfStr } from "../lib.mjs";

const PI = Math.PI;

concept("amath.calculus.small-increments", { file: "calculus/small-increments", keyPrefix: "calculus.small-increments" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`$y$ is a function of $x$. When $x$ changes by a small amount $\delta x$, which expression approximates the change $\delta y$ in $y$?`,
    options: [
      [t`$\dfrac{dy}{dx} \times \delta x$`, "Correct: the gradient times the small step."],
      [t`$\dfrac{dy}{dx} \div \delta x$`, t`Dividing by $\delta x$ would make $\delta y$ huge for a tiny step.`],
      [t`$y \times \delta x$`, "The change depends on the gradient, not on the value of y."],
      [t`$\dfrac{dy}{dx} + \delta x$`, "The gradient and the step multiply; they do not add."],
    ],
    answer: "A",
    explanation: t`Near a point the curve is close to its tangent, so $\frac{\delta y}{\delta x} \approx \frac{dy}{dx}$ and $\delta y \approx \frac{dy}{dx}\,\delta x$.`,
  });

  chk(10 * 0.02, 0.2);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Given $y = x^2$, use calculus to find the approximate change in $y$ when $x$ increases from 5 to 5.02.`,
    value: 0.2, wrong: [0.0004, 25.2],
    explanation: t`$\frac{dy}{dx} = 2x = 10$ at $x = 5$; $\delta x = 0.02$. $\delta y \approx 10 \times 0.02 = 0.2$. The value 25.2 is the approximate new value of $y$, not the change.`,
  });

  {
    const v = 12 * -0.02;
    chk(v, -0.24);
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: false,
      stem: t`Given $y = 4x^3$, use calculus to find the approximate change in $y$ when $x$ decreases from 1 to 0.98.`,
      value: v, wrong: [0.24, -0.08],
      explanation: t`$\frac{dy}{dx} = 12x^2 = 12$ at $x = 1$; $\delta x = 0.98 - 1 = -0.02$. $\delta y \approx 12 \times (-0.02) = -0.24$. Forgetting that $x$ decreases gives $+0.24$.`,
    });
  }

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "The radius of a circle increases by 1%. What is the approximate percentage increase in its area?",
    options: [
      ["2%", t`Correct: $\delta A \approx 2\pi r \times 0.01r = 0.02\pi r^2$, which is 2% of $A$.`],
      ["1%", t`The area depends on $r^2$, so its percentage change is about twice that of $r$.`],
      ["π%", t`$\pi$ cancels when the change is divided by $A = \pi r^2$.`],
      ["4%", "That would need the area to depend on the fourth power of r."],
    ],
    answer: "A",
    explanation: t`For $y = kx^n$, a small $k\%$ change in $x$ gives about $nk\%$ change in $y$. With $A = \pi r^2$, $n = 2$: about 2%.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`In the approximation $\delta y \approx \dfrac{dy}{dx}\,\delta x$, the result $\delta y$ is the approximate new value of $y$.`,
    answer: false,
    explanation: t`False. $\delta y$ is the approximate **change** in $y$. The approximate new value is the original $y$ plus $\delta y$.`,
  });

  {
    const v = 2 * PI * 6 * 0.04;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`The radius of a circular metal disc increases from 6 cm to 6.04 cm when heated. Use calculus to estimate the increase in its area, correct to 3 significant figures.`,
      value: v, unit: "cm²", wrong: [sfStr(PI * 36 * 0.04)],
      explanation: t`$A = \pi r^2$, $\frac{dA}{dr} = 2\pi r = 12\pi$. $\delta A \approx 12\pi \times 0.04 = 0.48\pi = ${sfStr(v)}$ cm². Multiplying the area itself by 0.04 gives $${sfStr(PI * 1.44)}$.`,
      hints: [t`$\delta r = 0.04$.`],
    });
  }

  chk(2 * 2 + 3, 7);
  b.expr({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Given $y = x^2 + 3x$, find the approximate change in $y$ as $x$ increases from 2 to $2 + p$, where $p$ is small. Give your answer in terms of $p$, for example 4p.`,
    accepted: ["7p", "δy=7p", "7*p"],
    wrong: ["10+7p", "7"],
    explanation: t`$\frac{dy}{dx} = 2x + 3 = 7$ at $x = 2$, and $\delta x = p$. So $\delta y \approx 7p$. The value $10 + 7p$ is the approximate new value of $y$.`,
    hints: ["Evaluate dy/dx at x = 2, then multiply by p."],
  });

  {
    checkDeriv((x) => 2 / (x * x), (x) => -4 / x ** 3, [0.5, 1, 2]);
    b.expr({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`Given $y = \dfrac{2}{x^2}$, find the approximate change in $y$ as $x$ increases from 1 to $1 + h$, where $h$ is small. Give your answer in terms of $h$.`,
      accepted: ["-4h", "δy=-4h", "-4*h"],
      wrong: ["4h", "-2h"],
      explanation: t`$y = 2x^{-2}$, $\frac{dy}{dx} = -4x^{-3} = -4$ at $x = 1$. $\delta y \approx -4h$: $y$ decreases by about $4h$.`,
      hints: ["Rewrite as a negative power before differentiating."],
    });
  }

  {
    const v = 7 + 0.7 / 14;
    chk(v, 7.05);
    chk(Math.abs(Math.sqrt(49.7) - v) < 0.005 ? 1 : 0, 1);
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`Use calculus, with $y = \sqrt{x}$ and $x = 49$, to find an approximate value of $\sqrt{49.7}$. Give your answer to 2 decimal places.`,
      value: v, dp: 2, wrong: [7.7, 7.35],
      explanation: t`$\frac{dy}{dx} = \frac{1}{2\sqrt{x}} = \frac{1}{14}$ at $x = 49$; $\delta x = 0.7$. $\delta y \approx \frac{0.7}{14} = 0.05$, so $\sqrt{49.7} \approx 7 + 0.05 = 7.05$. Adding 0.7 directly gives 7.7.`,
      hints: ["Start from √49 = 7.", t`$\delta x = 0.7$.`],
    });
  }

  {
    const v = 2 + 0.12 / 12;
    chk(v, 2.01);
    chk(Math.abs(Math.cbrt(8.12) - v) < 0.0005 ? 1 : 0, 1);
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`Use calculus, with $y = x^{\frac{1}{3}}$, to find an approximate value of $\sqrt[3]{8.12}$. Give your answer to 2 decimal places.`,
      value: v, dp: 2, wrong: [2.12, 2.04],
      explanation: t`$\frac{dy}{dx} = \frac{1}{3}x^{-\frac{2}{3}} = \frac{1}{3 \times 4} = \frac{1}{12}$ at $x = 8$; $\delta x = 0.12$. $\delta y \approx \frac{0.12}{12} = 0.01$, so $\sqrt[3]{8.12} \approx 2.01$.`,
      hints: [t`$8^{\frac{2}{3}} = 4$.`],
    });
  }

  {
    // V = 4/3 pi r^3; dr = 0.02 r -> dV = 4 pi r^2 * 0.02 r = 0.08 pi r^3 -> 6%
    chk((4 * PI * 0.02) / ((4 / 3) * PI) * 100, 6);
    b.num({
      d: 4, skill: "ANALYSIS", calculator: false,
      stem: t`The radius of a sphere is increased by 2%. Use calculus to find the approximate percentage increase in its volume.`,
      value: 6, unit: "%", wrong: [2, 0.06],
      explanation: t`$V = \frac{4}{3}\pi r^3$, $\frac{dV}{dr} = 4\pi r^2$, $\delta r = 0.02r$. $\delta V \approx 4\pi r^2 \times 0.02r = 0.08\pi r^3$. Then $\frac{\delta V}{V} = \frac{0.08\pi r^3}{\frac{4}{3}\pi r^3} = 0.06$, which is 6%. The answer 2 ignores the cube; 0.06 is the fraction, not the percentage.`,
      hints: [t`Write $\delta r = 0.02r$ and keep $r$ as a letter.`, t`Divide $\delta V$ by $V$.`],
    });
  }

  {
    const v = 10 * Math.exp(0) * 0.03;
    chk(v, 0.3);
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`Given $y = 5\mathrm{e}^{2x}$, use calculus to estimate the change in $y$ when $x$ increases from 0 to 0.03.`,
      value: v, wrong: [0.15, 5.3],
      explanation: t`$\frac{dy}{dx} = 10\mathrm{e}^{2x} = 10$ at $x = 0$. $\delta y \approx 10 \times 0.03 = 0.3$. Forgetting the factor 2 gives 0.15; 5.3 is the approximate new value.`,
      hints: [t`$\frac{d}{dx}\mathrm{e}^{2x} = 2\mathrm{e}^{2x}$.`],
    });
  }

  {
    const v = Math.cos(PI / 6) * 0.02;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Given $y = \sin x$, use calculus to estimate the change in $y$ when $x$ increases from $\dfrac{\pi}{6}$ to $\dfrac{\pi}{6} + 0.02$. Give your answer correct to 3 significant figures.`,
      value: v, wrong: [0.01],
      explanation: t`$\frac{dy}{dx} = \cos x = \frac{\sqrt{3}}{2}$ at $x = \frac{\pi}{6}$. $\delta y \approx \frac{\sqrt{3}}{2} \times 0.02 = 0.01\sqrt{3} = ${sfStr(v)}$. Using $\sin\frac{\pi}{6} = \frac{1}{2}$ in place of the derivative gives 0.01.`,
      hints: ["Work in radians.", t`$\cos\frac{\pi}{6} = \frac{\sqrt{3}}{2}$.`],
    });
  }

  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: "The edge of a cube is reduced by 1%. What is the approximate percentage change in its volume?",
    options: [
      ["A decrease of 3%", t`Correct: $V = x^3$, so $\delta V \approx 3x^2(-0.01x) = -0.03x^3$.`],
      ["A decrease of 1%", t`Volume depends on $x^3$, so the percentage change is about three times as large.`],
      ["An increase of 3%", "The edge decreases, so the volume decreases too."],
      ["A decrease of 6%", t`6% would come from the surface area coefficient 6 in $S = 6x^2$, not from the volume.`],
    ],
    answer: "A",
    explanation: t`$\frac{\delta V}{V} \approx \frac{-0.03x^3}{x^3} = -0.03$: about a 3% decrease.`,
    hints: [t`For $y = x^n$, the percentage change is about $n$ times that of $x$.`],
  });

  {
    // T = 2 pi sqrt(l/g): dT/dl = pi / sqrt(l g); dl = 0.02 l -> dT/T = 0.01
    const g = 9.8;
    for (const l of [0.5, 2]) {
      const T = 2 * PI * Math.sqrt(l / g);
      chk(((PI / Math.sqrt(l * g)) * 0.02 * l) / T, 0.01, 1e-12);
    }
    b.proof({
      d: 4, skill: "ANALYSIS", calculator: false, marks: 3,
      stem: t`The time of one swing of a pendulum of length $l$ is $T = 2\pi\sqrt{\dfrac{l}{g}}$, where $g$ is a constant. Show that a 2% increase in $l$ produces an increase of approximately 1% in $T$.`,
      points: [
        t`M1 writes $T = \frac{2\pi}{\sqrt{g}}l^{\frac{1}{2}}$ and differentiates: $\frac{dT}{dl} = \frac{\pi}{\sqrt{g}}l^{-\frac{1}{2}}$.`,
        t`M1 uses $\delta l = 0.02l$: $\delta T \approx \frac{\pi}{\sqrt{g}}l^{-\frac{1}{2}} \times 0.02l = \frac{0.02\pi}{\sqrt{g}}l^{\frac{1}{2}}$.`,
        t`A1 divides by $T$: $\frac{\delta T}{T} = 0.01$, which is 1%.`,
      ],
      modelAnswer: t`$$
T = \frac{2\pi}{\sqrt{g}}\,l^{\frac{1}{2}} \Rightarrow \frac{dT}{dl} = \frac{\pi}{\sqrt{g}}\,l^{-\frac{1}{2}}
$$

$$
\delta T \approx \frac{\pi}{\sqrt{g}}\,l^{-\frac{1}{2}} \times 0.02\,l = \frac{0.02\pi}{\sqrt{g}}\,l^{\frac{1}{2}}
$$

$$
\frac{\delta T}{T} \approx \frac{0.02\pi l^{\frac{1}{2}} / \sqrt{g}}{2\pi l^{\frac{1}{2}} / \sqrt{g}} = 0.01 = 1\%
$$`,
      explanation: t`$T$ is proportional to $l^{\frac{1}{2}}$, so the percentage change in $T$ is about half that in $l$.`,
      hints: [t`Treat $\frac{2\pi}{\sqrt{g}}$ as a constant.`],
    });
  }

  {
    const f = (x) => x ** 3 - 4 * x;
    const fp = (x) => 3 * x * x - 4;
    checkDeriv(f, fp, [1, 3]);
    chk(fp(3), 23); chk(23 * 0.02, 0.46);
    const exact = f(3.02) - f(3);
    chk(exact, 0.463608, 1e-9);
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
      stem: t`A curve has equation $y = x^3 - 4x$.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: t`Find $\dfrac{dy}{dx}$ when $x = 3$.`, value: 23, wrong: [15], explanation: t`$3x^2 - 4 = 27 - 4 = 23$.` }),
        P.num({ label: "(b)", marks: 2, stem: t`Use calculus to estimate the change in $y$ when $x$ increases from 3 to 3.02.`, value: 0.46, wrong: [15.46],
          explanation: t`$\delta y \approx 23 \times 0.02 = 0.46$.` }),
        P.expr({ label: "(c)", marks: 2, stem: t`Find, in terms of $p$, the approximate change in $y$ when $x$ decreases from 3 to $3 - p$, where $p$ is small.`, accepted: ["-23p", "δy=-23p", "-23*p"],
          wrong: ["23p"], explanation: t`$\delta x = -p$, so $\delta y \approx 23 \times (-p) = -23p$.` }),
        P.num({ label: "(d)", marks: 1, stem: "Find the exact change in y when x increases from 3 to 3.02, correct to 4 decimal places.", value: exact, dp: 4, wrong: [0.46],
          explanation: t`$y(3.02) - y(3) = (27.543608 - 12.08) - 15 = 0.463608 = 0.4636$ (4 d.p.), close to the estimate 0.46.` }),
      ],
      explanation: "Evaluate the derivative at the original point and multiply by the small change; a decrease gives a negative δx.",
      hints: [t`$\delta y \approx \frac{dy}{dx}\,\delta x$.`, "A decrease of p means δx = −p."],
    });
  }

  {
    // cone with h = 3r: V = (1/3) pi r^2 (3r) = pi r^3
    for (const r of [1, 4]) chk((1 / 3) * PI * r * r * (3 * r), PI * r ** 3);
    chk(3 * 16 * 0.05, 2.4);
    chk(3 * 1.25, 3.75); chk(1.5 / 3, 0.5);
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, calculator: false,
      stem: t`A solid cone has height three times its base radius, so its volume is $V = \pi r^3$ cm³ when the radius is $r$ cm.`,
      parts: [
        P.fib({ label: "(a)", marks: 1, stem: t`Write $\dfrac{dV}{dr}$ in the form $k\pi r^2$.`, template: "k = {{blank:k}}",
          blanks: [{ id: "k", input: "number", accepted: [3], wrong: "1" }], explanation: t`$\frac{d}{dr}(\pi r^3) = 3\pi r^2$.` }),
        P.expr({ label: "(b)", marks: 2, stem: t`Use calculus to estimate the increase in volume when the radius increases from 4 cm to 4.05 cm. Give your answer in terms of π, for example 1.5π.`, accepted: ["2.4π", "2.4pi", "12π/5", "12pi/5", "(12/5)π"],
          wrong: ["0.8π"], explanation: t`$\frac{dV}{dr} = 48\pi$ at $r = 4$; $\delta V \approx 48\pi \times 0.05 = 2.4\pi$ cm³.` }),
        P.num({ label: "(c)", marks: 2, stem: "The radius is increased by 1.25%. Find the approximate percentage increase in the volume.", value: 3.75, unit: "%", wrong: [1.25],
          explanation: t`$\delta V \approx 3\pi r^2 \times 0.0125r = 0.0375\pi r^3$, which is 3.75% of $V$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Find the approximate percentage increase in the radius that would increase the volume by 1.5%.", value: 0.5, unit: "%", wrong: [4.5],
          explanation: t`The volume changes by about 3 times the percentage change in $r$, so $r$ changes by $\frac{1.5}{3} = 0.5\%$.` }),
      ],
      explanation: "Because V is proportional to r³, small percentage changes in V are about three times those in r.",
      hints: [t`$\delta r = 0.0125r$ for a 1.25% increase.`],
    });
  }

  b.card("FORMULA", "Small increments", t`$\delta y \approx \dfrac{dy}{dx} \times \delta x$`, "Not in Cambridge's List of formulas.");
  b.card("DEFINITION", t`$\delta x$`, t`A small change in $x$ (new value minus old value); one symbol, not $\delta \times x$.`);
  b.card("CONCEPT", "Where to evaluate dy/dx", "At the ORIGINAL value of x, the known point.");
  b.card("FORMULA", "Approximate value", t`$f(a + \delta x) \approx f(a) + f'(a)\,\delta x$`);
  b.card("FORMULA", "Percentage change", t`$\dfrac{\delta y}{y} \times 100\%$; with a $k\%$ change in $x$, use $\delta x = \frac{k}{100}x$.`);
  b.card("FACT", "Power rule for percentages", t`If $y = kx^n$, a small $p\%$ change in $x$ gives about an $np\%$ change in $y$.`);
  b.card("CONCEPT", "Change versus new value", t`$\delta y$ is the change; the new value is $y + \delta y$.`);
  b.card("FACT", "Accuracy of the estimate", t`It improves as $\delta x$ gets smaller, because the chord approaches the tangent.`);
});
