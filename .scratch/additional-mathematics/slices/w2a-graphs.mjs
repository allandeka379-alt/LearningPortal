// W2a: amath.logs.graphs
import { concept, P, t, chk, ln, root } from "../lib.mjs";

concept("amath.logs.graphs", { file: "logs/graphs", keyPrefix: "logs.graphs" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`What is the equation of the asymptote of the curve $y = \mathrm{e}^x$?`,
    options: [
      [t`$y = 0$`, t`Correct: $\mathrm{e}^x \to 0$ as $x \to -\infty$ but is never zero.`],
      [t`$x = 0$`, t`$x = 0$ is the asymptote of $y = \ln x$, the inverse curve.`],
      [t`$y = 1$`, t`The curve passes through $(0, 1)$; it does not approach $y = 1$.`],
      [t`$y = x$`, t`$y = x$ is the mirror line between $\mathrm{e}^x$ and $\ln x$, not an asymptote.`],
    ],
    answer: "A",
    explanation: t`As $x$ becomes large and negative, $\mathrm{e}^x$ gets closer and closer to 0 without reaching it, so the $x$-axis, $y = 0$, is the asymptote.`,
  });

  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`For every base $a > 1$, the curve $y = \log_a x$ passes through which point?`,
    options: [
      [t`$(1, 0)$`, t`Correct: $\log_a 1 = 0$ for every base.`],
      [t`$(0, 1)$`, t`$(0, 1)$ is on $y = a^x$; the logarithm is not defined at $x = 0$.`],
      [t`$(a, 0)$`, t`At $x = a$, $\log_a a = 1$, so the point is $(a, 1)$.`],
      [t`$(0, 0)$`, t`$\log_a 0$ is undefined: the curve never meets the $y$-axis.`],
    ],
    answer: "A",
    explanation: t`$a^0 = 1$, so $\log_a 1 = 0$: every curve $y = \log_a x$ crosses the $x$-axis at $(1, 0)$.`,
  });

  chk(5 * Math.exp(0) + 3, 8);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Find the $y$-coordinate of the point where the curve $y = 5\mathrm{e}^{2x} + 3$ meets the $y$-axis.`,
    value: 8, prefix: "y =", wrong: [3, 5],
    explanation: t`At $x = 0$: $y = 5\mathrm{e}^0 + 3 = 5 + 3 = 8$.`,
  });

  b.num({
    d: 2, skill: "UNDERSTANDING", daily: true, calculator: false,
    stem: t`The curve $y = 6 - 2\mathrm{e}^{-3x}$ has a horizontal asymptote. State its equation.`,
    value: 6, prefix: "y =", wrong: [4, -2],
    explanation: t`As $x \to \infty$, $\mathrm{e}^{-3x} \to 0$, so $y \to 6$. The asymptote is $y = 6$. (The value 4 is the $y$-intercept, $6 - 2$.)`,
  });

  b.num({
    d: 2, skill: "UNDERSTANDING", daily: true, calculator: false,
    stem: t`State the equation of the vertical asymptote of $y = \ln(2x + 7)$.`,
    value: -3.5, prefix: "x =", wrong: [3.5, -7],
    explanation: t`The argument must be positive: $2x + 7 > 0$, so $x > -3.5$. The asymptote is where $2x + 7 = 0$: $x = -3.5$.`,
  });

  const x6 = ln(9 / 4);
  chk(4 * Math.exp(x6) - 9, 0);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Find the $x$-coordinate of the point where $y = 4\mathrm{e}^{x} - 9$ crosses the $x$-axis, correct to 3 significant figures.`,
    value: x6, prefix: "x =", wrong: [1.61, 2.25],
    explanation: t`$4\mathrm{e}^x = 9$, so $\mathrm{e}^x = \frac{9}{4}$ and $x = \ln 2.25 = 0.811$ (3 s.f.). The value 2.25 forgets to take $\ln$; 1.61 is $\ln 5$ from $\mathrm{e}^x = 9 - 4$.`,
    hints: [t`Put $y = 0$ and isolate $\mathrm{e}^x$.`],
  });

  const yInt7 = 2 * ln(5);
  chk(2 * ln(5 - 4), 0);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`The curve $y = 2\ln(5 - x)$ meets the $x$-axis at $A$ and the $y$-axis at $B$. Find the $x$-coordinate of $A$ and the $y$-coordinate of $B$ (correct to 3 significant figures).`,
    template: "A: x = {{blank:a}}\n\nB: y = {{blank:b}}",
    blanks: [
      { id: "a", input: "number", accepted: [4], wrong: "5" },
      { id: "b", input: "number", accepted: [Number(yInt7.toFixed(3))], tolerance: 0.005, wrong: "1.61" },
    ],
    explanation: t`At $A$, $\ln(5 - x) = 0$, so $5 - x = 1$ and $x = 4$. At $B$, $y = 2\ln 5 = 3.22$ (3 s.f.).`,
    hints: [t`$\ln u = 0$ when $u = 1$.`],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`The graphs of $y = \mathrm{e}^x$ and $y = \ln x$ are reflections of each other in the line $y = x$.`,
    answer: true,
    explanation: t`True. $\mathrm{e}^x$ and $\ln x$ are inverse functions, and the graph of an inverse function is the reflection of the original in $y = x$.`,
  });

  b.tf({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`The curve $y = 2\mathrm{e}^{x} + 1$ crosses the $x$-axis.`,
    answer: false,
    explanation: t`False. $2\mathrm{e}^x > 0$ for all $x$, so $y > 1$ everywhere; the curve stays above its asymptote $y = 1$ and never reaches the $x$-axis.`,
    hints: [t`What is the smallest value $2\mathrm{e}^x$ can approach?`],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each curve with the equation of its asymptote.",
    pairs: [
      [t`$y = \mathrm{e}^{x} - 3$`, t`$y = -3$`],
      [t`$y = \ln(x - 3)$`, t`$x = 3$`],
      [t`$y = 3 - \mathrm{e}^{-x}$`, t`$y = 3$`],
      [t`$y = \ln(x + 3)$`, t`$x = -3$`],
    ],
    explanation: t`Exponential curves have horizontal asymptotes $y = a$ (the constant added). Logarithmic curves have vertical asymptotes where the argument is zero: $x - 3 = 0$ and $x + 3 = 0$.`,
  });

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`Which description fits the curve $y = 2\mathrm{e}^{-x}$?`,
    options: [
      [t`decreasing, through $(0, 2)$, asymptote $y = 0$`, t`Correct: a negative index gives decay, and $x = 0$ gives $y = 2$.`],
      [t`increasing, through $(0, 2)$, asymptote $y = 0$`, t`$\mathrm{e}^{-x}$ gets smaller as $x$ increases.`],
      [t`decreasing, through $(0, 1)$, asymptote $y = 2$`, t`The 2 multiplies; it does not shift the curve up.`],
      [t`decreasing, through $(2, 0)$, asymptote $x = 0$`, t`This mixes up the axes; the curve never meets the $x$-axis.`],
    ],
    answer: "A",
    explanation: t`$y = 2\mathrm{e}^{-x}$ is $y = \mathrm{e}^x$ reflected in the $y$-axis and stretched by factor 2: it passes through $(0, 2)$ and decreases towards $y = 0$.`,
    hints: [t`Put $x = 0$, then think about large positive $x$.`],
  });

  for (const x of [2.5, 4, 9]) chk(ln(Math.exp(x) + 2 - 2), x);
  b.expr({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The function $f$ is defined by $f(x) = \mathrm{e}^{x} + 2$ for all real $x$. Find $f^{-1}(x)$. Type ln for the natural logarithm, e.g. ln(x+1).`,
    accepted: ["ln(x-2)", "ln(-2+x)", "f^-1(x)=ln(x-2)", "y=ln(x-2)"],
    wrong: ["ln(x)-2", "ln(x+2)"],
    explanation: t`$y = \mathrm{e}^x + 2$ gives $\mathrm{e}^x = y - 2$, so $x = \ln(y - 2)$. Hence $f^{-1}(x) = \ln(x - 2)$, for $x > 2$.`,
    hints: [t`Make $x$ the subject of $y = \mathrm{e}^x + 2$.`],
  });

  {
    const f = (x) => 3 * ln(x + 1), g = (x) => Math.exp(x / 3) - 1;
    for (const x of [0.5, 2, 7]) chk(g(f(x)), x);
  }
  b.expr({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`The function $g$ is defined by $g(x) = 3\ln(x + 1)$ for $x > -1$. Find $g^{-1}(x)$. Type e^(...) for the exponential, e.g. e^(x/2)+5.`,
    accepted: ["e^(x/3)-1", "-1+e^(x/3)", "e^(1/3x)-1", "e^((1/3)x)-1", "exp(x/3)-1", "e^(x/3)+(-1)"],
    wrong: ["e^(3x)-1", "e^(x-1)/3"],
    explanation: t`$y = 3\ln(x + 1)$ gives $\ln(x + 1) = \frac{y}{3}$, so $x + 1 = \mathrm{e}^{y/3}$. Hence $g^{-1}(x) = \mathrm{e}^{x/3} - 1$, for all real $x$.`,
    hints: [t`Divide by 3 before exponentiating.`],
  });

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`The function $h$ is defined by $h(x) = \ln(x - 1)$ for $x > 1$. What is the range of $h^{-1}$?`,
    options: [
      [t`$h^{-1}(x) > 1$`, t`Correct: the range of the inverse is the domain of $h$.`],
      [t`$h^{-1}(x) > 0$`, t`$h^{-1}(x) = \mathrm{e}^x + 1$, which is always greater than 1, not just 0.`],
      [t`all real numbers`, t`That is the domain of $h^{-1}$ (the range of $h$), not its range.`],
      [t`$h^{-1}(x) \geq 1$`, t`$\mathrm{e}^x + 1$ never equals 1, so the inequality is strict.`],
    ],
    answer: "A",
    explanation: t`Domain and range swap for an inverse. $h$ has domain $x > 1$, so $h^{-1}(x) = \mathrm{e}^x + 1$ has range $h^{-1}(x) > 1$.`,
    hints: ["Domain and range swap between a function and its inverse."],
  });

  {
    const f = (x) => Math.exp(x) - x - 2;
    const r1 = root(f, -2, -1), r2 = root(f, 1, 2);
    chk(Math.exp(r1), r1 + 2, 1e-9); chk(Math.exp(r2), r2 + 2, 1e-9);
    // e^x - x - 2 has its minimum at x = 0 (value -1), so exactly two roots.
    chk(f(0), -1);
  }
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`By sketching $y = \mathrm{e}^x$ and $y = x + 2$ on the same axes, state the number of real solutions of the equation $\mathrm{e}^x = x + 2$.`,
    value: 2, wrong: [1, 0],
    explanation: t`At $x = 0$ the line ($y = 2$) is above the curve ($y = 1$). Far to the left the curve is just above 0 while the line is negative (below the curve); far to the right the curve rises much faster than the line. So the line crosses the curve once for $x < 0$ and once for $x > 0$: two solutions (about $x = -1.84$ and $x = 1.15$).`,
    hints: ["Compare the two graphs at x = 0, far to the left and far to the right."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 4,
    stem: t`Describe the sketch you would draw of $y = 3^x$ and $y = \log_3 x$ on the same axes. Give the key features of each curve and how they are related.`,
    points: [
      t`$y = 3^x$: passes through $(0, 1)$, increasing, horizontal asymptote $y = 0$.`,
      t`$y = \log_3 x$: passes through $(1, 0)$, increasing, defined only for $x > 0$.`,
      t`$y = \log_3 x$ has vertical asymptote $x = 0$ (the $y$-axis).`,
      t`The curves are reflections of each other in $y = x$ (for example $(1, 3)$ and $(3, 1)$).`,
    ],
    modelAnswer: t`$y = 3^x$ rises from just above the negative $x$-axis through $(0, 1)$ and $(1, 3)$, getting steeper; its asymptote is $y = 0$. $y = \log_3 x$ rises from $-\infty$ close to the $y$-axis through $(1, 0)$ and $(3, 1)$, getting flatter; its asymptote is $x = 0$. They are mirror images in $y = x$.`,
    explanation: "An exponential function and the logarithm to the same base are inverse functions, so every feature reflects in y = x.",
    hints: ["Swap the coordinates of each key point to get the other curve."],
  });

  {
    const f = (x) => 2 * Math.exp(x) - 5;
    const xi = ln(2.5);
    chk(f(0), -3); chk(f(xi), 0);
    for (const x of [-2, 0.4, 3]) chk(ln((f(x) + 5) / 2), x);
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
      stem: t`The function $f$ is defined by $f(x) = 2\mathrm{e}^{x} - 5$ for all real $x$.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: t`Find the $y$-intercept of the graph of $y = f(x)$.`, value: -3, prefix: "y =", wrong: [-5], explanation: t`$f(0) = 2 - 5 = -3$.` }),
        P.num({ label: "(b)", marks: 1, stem: t`State the equation of the asymptote of the graph.`, value: -5, prefix: "y =", wrong: [5], explanation: t`$2\mathrm{e}^x \to 0$ as $x \to -\infty$, so $y \to -5$.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Find the $x$-intercept, correct to 3 significant figures.`, value: xi, prefix: "x =", wrong: [2.5], explanation: t`$2\mathrm{e}^x = 5$, so $x = \ln 2.5 = 0.916$ (3 s.f.).` }),
        P.expr({ label: "(d)", marks: 2, stem: t`Find $f^{-1}(x)$. Type ln(...) e.g. ln((x+1)/4).`, accepted: ["ln((x+5)/2)", "ln((5+x)/2)", "ln(x+5)-ln(2)", "ln(x+5)-ln2", "ln(0.5x+2.5)", "ln(0.5(x+5))", "ln(x/2+5/2)"], wrong: ["ln((x-5)/2)", "ln(x+5)/2"],
          explanation: t`$y = 2\mathrm{e}^x - 5$ gives $\mathrm{e}^x = \frac{y + 5}{2}$, so $f^{-1}(x) = \ln\left(\frac{x + 5}{2}\right)$, for $x > -5$.` }),
      ],
      explanation: "Put x = 0 for the y-intercept, let x → −∞ for the asymptote, put y = 0 for the x-intercept, and rearrange y = f(x) for the inverse.",
      hints: [t`$\mathrm{e}^0 = 1$.`, t`For (d), isolate $\mathrm{e}^x$ before taking $\ln$.`],
    });
  }

  {
    const g = (x) => ln(3 * x - 2), gi = (x) => (Math.exp(x) + 2) / 3;
    chk(g(1), 0);
    for (const x of [0.8, 1.5, 6]) chk(gi(g(x)), x);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
      stem: t`The function $g$ is defined by $g(x) = \ln(3x - 2)$ for $x > \frac{2}{3}$.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: t`State the equation of the vertical asymptote of $y = g(x)$. You may type a fraction.`, value: 2 / 3, prefix: "x =", wrong: [-2 / 3], explanation: t`$3x - 2 = 0$ gives $x = \frac{2}{3}$.` }),
        P.num({ label: "(b)", marks: 1, stem: t`Find the $x$-intercept of $y = g(x)$.`, value: 1, prefix: "x =", wrong: [0], explanation: t`$3x - 2 = 1$ gives $x = 1$.` }),
        P.expr({ label: "(c)", marks: 2, stem: t`Find $g^{-1}(x)$. Type e^x for the exponential, e.g. (e^x-1)/5.`, accepted: ["(e^x+2)/3", "(2+e^x)/3", "e^x/3+2/3", "2/3+e^x/3", "(1/3)(e^x+2)", "1/3(e^x+2)"], wrong: ["(e^x-2)/3", "e^(x+2)/3"],
          explanation: t`$\mathrm{e}^y = 3x - 2$, so $x = \frac{\mathrm{e}^y + 2}{3}$ and $g^{-1}(x) = \frac{\mathrm{e}^x + 2}{3}$.` }),
        P.num({ label: "(d)", marks: 1, stem: t`State the equation of the horizontal asymptote of $y = g^{-1}(x)$. You may type a fraction.`, value: 2 / 3, prefix: "y =", wrong: [0], explanation: t`$\mathrm{e}^x \to 0$ as $x \to -\infty$, so $y \to \frac{2}{3}$; it is the reflection of $x = \frac{2}{3}$ in $y = x$.` }),
        P.manual({ label: "(e)", marks: 2, stem: t`Describe how the graphs of $y = g(x)$ and $y = g^{-1}(x)$ are related, referring to their intercepts.`,
          points: [t`States that each graph is the reflection of the other in $y = x$.`, t`States that the $x$-intercept $(1, 0)$ of $g$ corresponds to the $y$-intercept $(0, 1)$ of $g^{-1}$.`],
          modelAnswer: t`The graph of $g^{-1}$ is the reflection of the graph of $g$ in the line $y = x$: coordinates swap, so $(1, 0)$ on $g$ becomes $(0, 1)$ on $g^{-1}$, and the asymptote $x = \frac{2}{3}$ becomes $y = \frac{2}{3}$.`,
          explanation: "Reflection in y = x swaps x- and y-coordinates." }),
      ],
      explanation: "Find the features of the logarithmic graph from its argument, then reflect each one in y = x for the inverse.",
      hints: [t`The argument $3x - 2$ must be positive.`, t`$\ln u = 0$ when $u = 1$.`],
    });
  }

  b.card("FACT", t`Key features of $y = \mathrm{e}^x$`, t`Through $(0, 1)$; increasing; always positive; asymptote $y = 0$.`);
  b.card("FACT", t`Key features of $y = \ln x$`, t`Only for $x > 0$; through $(1, 0)$; increasing slowly; asymptote $x = 0$.`);
  b.card("CONCEPT", t`Asymptote of $y = k\mathrm{e}^{nx} + a$`, t`$y = a$ (the curve never crosses it).`);
  b.card("CONCEPT", t`Asymptote of $y = k\ln(ax + b)$`, t`$ax + b = 0$, i.e. $x = -\frac{b}{a}$.`);
  b.card("CONCEPT", t`$x$-intercept of $y = k\ln(ax + b)$`, t`Where $ax + b = 1$, since $\ln 1 = 0$.`);
  b.card("FACT", t`$\mathrm{e}^x$ and $\ln x$`, t`Inverse functions: graphs are reflections in $y = x$; $\mathrm{e}^{\ln x} = x$ and $\ln \mathrm{e}^x = x$.`);
  b.card("CONCEPT", "Reflecting in y = x", "Intercepts swap coordinates; a vertical asymptote x = c becomes a horizontal asymptote y = c.");
  b.card("FACT", t`$y = \mathrm{e}^{-x}$`, t`Decay curve: through $(0, 1)$, decreasing towards $y = 0$; reflection of $\mathrm{e}^x$ in the $y$-axis.`);
  b.card("CONCEPT", "Sketch checklist", "Shape, intercepts as coordinates, asymptote drawn dashed and labelled with its equation.");
});
