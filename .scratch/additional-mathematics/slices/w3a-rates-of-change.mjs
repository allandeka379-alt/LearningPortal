// W3a: amath.calculus.rates-of-change
import { concept, P, t, chk, checkDeriv, sfStr } from "../lib.mjs";

const PI = Math.PI;

concept("amath.calculus.rates-of-change", { file: "calculus/rates-of-change", keyPrefix: "calculus.rates-of-change" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`The radius $r$ of a circle and its area $A$ both change with time $t$. Which statement connects their rates of change?`,
    options: [
      [t`$\dfrac{dA}{dt} = \dfrac{dA}{dr} \times \dfrac{dr}{dt}$`, "Correct: the chain rule, in which the dr 'cancels'."],
      [t`$\dfrac{dA}{dt} = \dfrac{dr}{dA} \times \dfrac{dr}{dt}$`, t`The first derivative is upside down; this does not give $\frac{dA}{dt}$.`],
      [t`$\dfrac{dA}{dt} = \dfrac{dA}{dr} + \dfrac{dr}{dt}$`, "Connected rates multiply; they do not add."],
      [t`$\dfrac{dA}{dt} = \dfrac{dA}{dr} \div \dfrac{dr}{dt}$`, t`Dividing gives $\frac{dA}{dr} \times \frac{dt}{dr}$, which is not $\frac{dA}{dt}$.`],
    ],
    answer: "A",
    explanation: t`Chain rule: $\dfrac{dA}{dt} = \dfrac{dA}{dr} \times \dfrac{dr}{dt}$.`,
  });

  {
    const dQ = (t) => 10 * t + 2;
    checkDeriv((t) => 5 * t * t + 2 * t, dQ, [1, 3]);
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: false,
      stem: t`The amount of water, $Q$ litres, in a drum $t$ minutes after filling starts is $Q = 5t^2 + 2t$. Find the rate at which $Q$ is increasing when $t = 3$.`,
      value: dQ(3), wrong: [51, 17],
      explanation: t`$\frac{dQ}{dt} = 10t + 2 = 32$ litres per minute at $t = 3$. The value 51 is $Q$ itself at $t = 3$, not its rate of change.`,
    });
  }

  {
    const v = 2 * 6 * 0.2;
    chk(v, 2.4);
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: false,
      stem: t`The side of a square metal plate expands at 0.2 cm/s when heated. Find the rate at which the area is increasing when the side is 6 cm.`,
      value: v, unit: "cm²/s", wrong: [1.2, 7.2],
      explanation: t`$A = x^2$, $\frac{dA}{dx} = 2x = 12$ at $x = 6$. $\frac{dA}{dt} = 12 \times 0.2 = 2.4$ cm²/s. Using $\frac{dA}{dx} = x$ gives 1.2.`,
    });
  }

  {
    const v = 2 * PI * 8 * 0.5;
    chk(v, 8 * PI);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`The radius of a circular oil spill on Lake Kariba increases at 0.5 m/min. Find the rate at which the area of the spill is increasing when the radius is 8 m. Give your answer correct to 3 significant figures.`,
      value: v, wrong: [sfStr(PI * 64 * 0.5), sfStr(2 * PI * 8)],
      explanation: t`$A = \pi r^2$, $\frac{dA}{dr} = 2\pi r = 16\pi$. $\frac{dA}{dt} = 16\pi \times 0.5 = 8\pi = ${sfStr(v)}$ m²/min. Using the area $\pi r^2$ instead of its derivative gives $${sfStr(PI * 32)}$.`,
      hints: [t`Differentiate $A = \pi r^2$ with respect to $r$ first.`],
    });
  }

  {
    const v = 12 / (2 * PI * 3);
    chk(v, 2 / PI);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`The area of a circle is increasing at 12 cm²/s. Find the rate at which the radius is increasing when the radius is 3 cm, correct to 3 significant figures.`,
      value: v, unit: "cm/s", wrong: [sfStr(12 * 6 * PI), sfStr(12 / (9 * PI))],
      explanation: t`$\frac{dA}{dr} = 2\pi r = 6\pi$. From $\frac{dA}{dt} = \frac{dA}{dr} \times \frac{dr}{dt}$: $12 = 6\pi \frac{dr}{dt}$, so $\frac{dr}{dt} = \frac{2}{\pi} = ${sfStr(v)}$ cm/s. Multiplying instead of dividing gives $${sfStr(72 * PI)}$.`,
      hints: ["Here the rate of the area is given: divide by dA/dr."],
    });
  }

  {
    const v = 4 * PI * 36 * 0.1;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`The radius of a spherical ball of dough is increasing at 0.1 cm/s as it rises. Find the rate of increase of its volume when the radius is 6 cm, correct to 3 significant figures. ($V = \frac{4}{3}\pi r^3$.)`,
      value: v, unit: "cm³/s", wrong: [sfStr((4 / 3) * PI * 216 * 0.1)],
      explanation: t`$\frac{dV}{dr} = 4\pi r^2 = 144\pi$. $\frac{dV}{dt} = 144\pi \times 0.1 = 14.4\pi = ${sfStr(v)}$ cm³/s. Using $V$ itself instead of $\frac{dV}{dr}$ gives $${sfStr((4 / 3) * PI * 21.6)}$.`,
      hints: [t`$\frac{d}{dr}\left(\frac{4}{3}\pi r^3\right) = 4\pi r^2$.`],
    });
  }

  {
    const v = 9 / (3 * 9);
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`The volume of a cube is increasing at 9 cm³/s. Find the rate at which the length of each edge is increasing when the edge is 3 cm. Give your answer as a fraction or to 3 significant figures.`,
      value: v, unit: "cm/s", wrong: [1, 243],
      explanation: t`$V = x^3$, $\frac{dV}{dx} = 3x^2 = 27$. $9 = 27 \frac{dx}{dt}$, so $\frac{dx}{dt} = \frac{1}{3}$ cm/s. Using $\frac{dV}{dx} = x^2 = 9$ gives 1.`,
      hints: [t`$\frac{dV}{dt} = \frac{dV}{dx} \times \frac{dx}{dt}$.`],
    });
  }

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`Water leaks from a tank, so its volume $V$ is decreasing. Then $\dfrac{dV}{dt}$ is negative.`,
    answer: true,
    explanation: t`True. A decreasing quantity has a negative rate of change; a leak of 5 cm³/s means $\frac{dV}{dt} = -5$.`,
  });

  {
    const v = 12 * 4 * 0.05;
    chk(v, 2.4);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`The edge of a cube increases at 0.05 cm/s. Its surface area is $S = 6x^2$. Find the rate of increase of $S$ when the edge $x$ is 4 cm.`,
      options: [
        [t`$2.4$ cm²/s`, t`Correct: $\frac{dS}{dx} = 12x = 48$, and $48 \times 0.05 = 2.4$.`],
        [t`$4.8$ cm²/s`, t`This uses $\frac{dS}{dx} = 24x$ (or doubles the rate); $\frac{d}{dx}6x^2 = 12x$.`],
        [t`$0.6$ cm²/s`, t`This uses $\frac{dS}{dx} = 3x$, not $12x$.`],
        [t`$960$ cm²/s`, t`This divides by $0.05$ instead of multiplying.`],
      ],
      answer: "A",
      explanation: t`$\frac{dS}{dt} = \frac{dS}{dx} \times \frac{dx}{dt} = 12(4)(0.05) = 2.4$ cm²/s.`,
      hints: [t`Differentiate $6x^2$.`],
    });
  }

  {
    const v = (3 * 4 - 2) * 3;
    chk(v, 30);
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`A point moves along the curve $y = x^3 - 2x$ so that its $x$-coordinate increases at 3 units per second. Find the rate at which its $y$-coordinate is changing when $x = 2$.`,
      value: v, wrong: [10, 12],
      explanation: t`$\frac{dy}{dx} = 3x^2 - 2 = 10$ at $x = 2$. $\frac{dy}{dt} = 10 \times 3 = 30$ units per second. The value 10 is $\frac{dy}{dx}$ only.`,
      hints: [t`$\frac{dy}{dt} = \frac{dy}{dx} \times \frac{dx}{dt}$.`],
    });
  }

  {
    const v = (2 * Math.exp(0)) * -0.1;
    chk(v, -0.2);
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`A point moves along the curve $y = \mathrm{e}^{2x}$ so that $x$ is decreasing at 0.1 units per second. Find $\dfrac{dy}{dt}$ at the instant when $x = 0$.`,
      value: v, wrong: [0.2, -0.1],
      explanation: t`$\frac{dy}{dx} = 2\mathrm{e}^{2x} = 2$ at $x = 0$, and $\frac{dx}{dt} = -0.1$ (decreasing). $\frac{dy}{dt} = 2 \times (-0.1) = -0.2$. Forgetting that $x$ decreases gives $+0.2$.`,
      hints: ["A decreasing quantity has a negative rate."],
    });
  }

  {
    // cone radius 2, height 6 (vertex down): r = h/3, V = pi h^3 / 27
    for (const h of [1, 4]) chk((1 / 3) * PI * (h / 3) ** 2 * h, (PI * h ** 3) / 27);
    const dVdh = (PI * 36) / 9;
    const v = -3 / dVdh;
    chk(v, -3 / (4 * PI));
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Water drains out of a conical funnel (vertex at the bottom) at 3 cm³/s. When the depth of water is $h$ cm, the volume is $V = \dfrac{\pi h^3}{27}$ cm³. Find the rate of change of the depth when $h = 6$, correct to 3 significant figures.`,
      value: v, unit: "cm/s", wrong: [sfStr(-v), sfStr(-3 * dVdh)],
      explanation: t`$\frac{dV}{dh} = \frac{3\pi h^2}{27} = \frac{\pi h^2}{9} = 4\pi$ at $h = 6$. $\frac{dV}{dt} = -3$ (draining), so $\frac{dh}{dt} = \frac{-3}{4\pi} = ${sfStr(v)}$ cm/s: the depth falls at about $${sfStr(-v)}$ cm/s.`,
      hints: ["Draining means dV/dt is negative.", "Divide the volume rate by dV/dh."],
    });
  }

  {
    const v = 8 / (8 * PI * 4);
    chk(v, 1 / (4 * PI));
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`The surface area of a spherical soap bubble, $S = 4\pi r^2$, is increasing at 8 cm²/s. Find the rate at which the radius is increasing when the radius is 4 cm, correct to 3 significant figures.`,
      value: v, unit: "cm/s", wrong: [sfStr(8 / (4 * PI * 16)), sfStr(8 * 32 * PI)],
      explanation: t`$\frac{dS}{dr} = 8\pi r = 32\pi$. $8 = 32\pi \frac{dr}{dt}$, so $\frac{dr}{dt} = \frac{1}{4\pi} = ${sfStr(v)}$ cm/s. Dividing by $S = 64\pi$ instead of $\frac{dS}{dr}$ gives $${sfStr(8 / (64 * PI))}$.`,
      hints: [t`$\frac{dS}{dr} = 8\pi r$.`],
    });
  }

  {
    // V = 36 pi -> r = 3
    chk((4 / 3) * PI * 27, 36 * PI);
    const v = 8 * PI * 3 * 0.2;
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`The radius of a spherical balloon increases at 0.2 cm/s. Find the rate of increase of its surface area at the instant when its volume is $36\pi$ cm³. Give your answer correct to 3 significant figures.`,
      value: v, unit: "cm²/s", wrong: [sfStr(4 * PI * 9 * 0.2)],
      explanation: t`First the radius: $\frac{4}{3}\pi r^3 = 36\pi$ gives $r^3 = 27$, $r = 3$. $S = 4\pi r^2$, $\frac{dS}{dr} = 8\pi r = 24\pi$. $\frac{dS}{dt} = 24\pi \times 0.2 = 4.8\pi = ${sfStr(v)}$ cm²/s.`,
      hints: ["Use the volume to find r at that instant.", "Then differentiate the surface area formula."],
    });
  }

  {
    const dVdh = (h) => (PI * h * h) / 9;
    checkDeriv((h) => (PI * h ** 3) / 27, dVdh, [1, 3, 5]);
    chk(5 / dVdh(3), 5 / PI);
    const c = 5 / dVdh(6);
    chk(c, 5 / (4 * PI));
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
      stem: t`A container is an inverted right circular cone of radius 2 cm and height 6 cm (vertex at the bottom). Water is poured in at a constant rate of 5 cm³/s. When the depth of water is $h$ cm, the radius of the water surface is $r$ cm.`,
      parts: [
        P.proof({ label: "(a)", marks: 2, stem: t`Show that the volume of water is $V = \dfrac{\pi h^3}{27}$.`,
          points: [t`M1 uses similar triangles: $\frac{r}{h} = \frac{2}{6}$, so $r = \frac{h}{3}$.`, t`A1 substitutes into $V = \frac{1}{3}\pi r^2 h$ to reach $\frac{\pi h^3}{27}$.`],
          modelAnswer: t`$$
\frac{r}{h} = \frac{2}{6} \Rightarrow r = \frac{h}{3}
$$

$$
V = \frac{1}{3}\pi\left(\frac{h}{3}\right)^2 h = \frac{\pi h^3}{27}
$$`,
          explanation: "Similar triangles give r in terms of h." }),
        P.expr({ label: "(b)", marks: 3, stem: t`Find the exact rate at which the depth is increasing when $h = 3$. Type your answer in terms of π, for example 2/π.`, accepted: ["5/π", "5/pi", "5π^-1"],
          wrong: ["5π"], explanation: t`$\frac{dV}{dh} = \frac{\pi h^2}{9} = \pi$ at $h = 3$. $5 = \pi \frac{dh}{dt}$, so $\frac{dh}{dt} = \frac{5}{\pi}$ cm/s.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Find the rate at which the depth is increasing when $h = 6$, correct to 3 significant figures.`, value: c, unit: "cm/s", wrong: [sfStr(5 / PI)],
          explanation: t`$\frac{dV}{dh} = \frac{36\pi}{9} = 4\pi$. $\frac{dh}{dt} = \frac{5}{4\pi} = ${sfStr(c)}$ cm/s.` }),
      ],
      explanation: "Write the volume in terms of h alone, differentiate, and divide the inflow rate by dV/dh at each depth. The level rises more slowly as the cone widens.",
      hints: ["Use similar triangles for r in terms of h.", t`$\frac{dh}{dt} = \frac{dV/dt}{dV/dh}$.`],
    });
  }

  {
    const drdt = -20 / (4 * PI * 25);
    chk(drdt, -1 / (5 * PI));
    const dSdt = 8 * PI * 5 * drdt;
    chk(dSdt, -8);
    for (const r of [2, 7]) chk(8 * PI * r * (-20 / (4 * PI * r * r)), -40 / r);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: t`A spherical balloon is losing air so that its volume decreases at a constant 20 cm³/s. ($V = \frac{4}{3}\pi r^3$ and $S = 4\pi r^2$.)`,
      parts: [
        P.num({ label: "(a)", marks: 3, stem: t`Find $\dfrac{dr}{dt}$ when the radius is 5 cm, correct to 3 significant figures.`, value: drdt, unit: "cm/s", wrong: [sfStr(-drdt)],
          explanation: t`$\frac{dV}{dr} = 4\pi r^2 = 100\pi$. $-20 = 100\pi \frac{dr}{dt}$, so $\frac{dr}{dt} = -\frac{1}{5\pi} = ${sfStr(drdt)}$ cm/s.` }),
        P.num({ label: "(b)", marks: 3, stem: "Find the rate of change of the surface area at the same instant.", value: dSdt, unit: "cm²/s", wrong: [8],
          explanation: t`$\frac{dS}{dr} = 8\pi r = 40\pi$. $\frac{dS}{dt} = 40\pi \times \left(-\frac{1}{5\pi}\right) = -8$ cm²/s (decreasing).` }),
        P.proof({ label: "(c)", marks: 3, stem: t`Show that, at any instant, $\dfrac{dS}{dt} = -\dfrac{40}{r}$.`,
          points: [t`M1 finds $\frac{dr}{dt} = \frac{-20}{4\pi r^2}$.`, t`M1 uses $\frac{dS}{dt} = 8\pi r \times \frac{dr}{dt}$.`, t`A1 simplifies to $-\frac{40}{r}$.`],
          modelAnswer: t`$$
\frac{dr}{dt} = \frac{dV/dt}{dV/dr} = \frac{-20}{4\pi r^2} = -\frac{5}{\pi r^2}
$$

$$
\frac{dS}{dt} = \frac{dS}{dr} \times \frac{dr}{dt} = 8\pi r \times \left(-\frac{5}{\pi r^2}\right) = -\frac{40}{r}
$$`,
          explanation: "Chain the rates through r with r left as a letter." }),
      ],
      explanation: "The volume rate gives the radius rate through dV/dr; the radius rate gives the surface-area rate through dS/dr.",
      hints: ["Decreasing volume: dV/dt = −20.", "Work through the radius: V → r → S."],
    });
  }

  b.card("DEFINITION", "Rate of change", t`$\frac{dy}{dt}$: how fast $y$ changes with time; positive when increasing, negative when decreasing.`);
  b.card("FORMULA", "Connected rates", t`$\dfrac{dy}{dt} = \dfrac{dy}{dx} \times \dfrac{dx}{dt}$`);
  b.card("CONCEPT", "Method", "Write the given and required rates, find and differentiate the linking formula, apply the chain rule, then substitute.");
  b.card("CONCEPT", "When to substitute", "Differentiate first; substitute the instant's values (r = 10, h = 4) afterwards.");
  b.card("FACT", "Circle and sphere derivatives", t`$\frac{d}{dr}(\pi r^2) = 2\pi r$; $\frac{d}{dr}\left(\frac{4}{3}\pi r^3\right) = 4\pi r^2$; $\frac{d}{dr}(4\pi r^2) = 8\pi r$.`);
  b.card("CONCEPT", "Liquid in a cone", t`Use similar triangles to write $r$ in terms of $h$, so $V = \frac{1}{3}\pi r^2 h$ becomes a function of $h$ only.`);
  b.card("FACT", "Units of a rate", "Units of the changing quantity per unit of time: cm²/s, m³/min, cm/s.");
  b.card("CONCEPT", "Finding an unknown rate from a known one", t`If $\frac{dV}{dt}$ is known and $\frac{dr}{dt}$ is wanted: $\frac{dr}{dt} = \frac{dV}{dt} \div \frac{dV}{dr}$.`);
});
