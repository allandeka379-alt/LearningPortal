// W2a: amath.circular.radians (Cambridge only)
import { concept, P, t, chk, same, quad, rad, deg, money } from "../lib.mjs";

concept("amath.circular.radians", { file: "circular/radians", keyPrefix: "circular.radians" }, (b) => {
  chk(rad(90), Math.PI / 2);
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`Write $90^\circ$ in radians.`,
    options: [
      [t`$\frac{\pi}{2}$`, t`Correct: $90 \times \frac{\pi}{180} = \frac{\pi}{2}$.`],
      [t`$\frac{\pi}{4}$`, t`$\frac{\pi}{4}$ is $45^\circ$.`],
      [t`$2\pi$`, t`$2\pi$ is a full turn, $360^\circ$.`],
      [t`$90\pi$`, t`Multiply by $\frac{\pi}{180}$, not by $\pi$.`],
    ],
    answer: "A",
    explanation: t`$\pi$ rad $= 180^\circ$, so $90^\circ = \frac{\pi}{2}$ rad.`,
  });

  chk(deg((3 * Math.PI) / 4), 135);
  b.num({
    d: 2, skill: "RECALL", daily: true, calculator: false,
    stem: t`Convert $\dfrac{3\pi}{4}$ radians to degrees.`,
    value: 135, unit: "°", wrong: [0.75, 45],
    explanation: t`$\frac{3\pi}{4} \times \frac{180}{\pi} = \frac{3 \times 180}{4} = 135^\circ$.`,
  });

  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: t`Convert $50^\circ$ to radians, correct to 3 significant figures.`,
    value: rad(50), unit: "rad", wrong: [2865, 0.278],
    explanation: t`$50 \times \frac{\pi}{180} = \frac{5\pi}{18} = 0.873$ rad (3 s.f.).`,
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: t`Convert $1.5$ radians to degrees, correct to 1 decimal place.`,
    value: deg(1.5), unit: "°", wrong: [0.0262, 270],
    explanation: t`$1.5 \times \frac{180}{\pi} = 85.9^\circ$ (1 d.p.).`,
  });

  for (const [d, r] of [[30, Math.PI / 6], [45, Math.PI / 4], [120, (2 * Math.PI) / 3], [270, (3 * Math.PI) / 2]]) chk(rad(d), r);
  b.match({
    d: 2, skill: "RECALL", calculator: false,
    stem: "Match each angle in degrees with its exact value in radians.",
    pairs: [
      [t`$30^\circ$`, t`$\frac{\pi}{6}$`],
      [t`$45^\circ$`, t`$\frac{\pi}{4}$`],
      [t`$120^\circ$`, t`$\frac{2\pi}{3}$`],
      [t`$270^\circ$`, t`$\frac{3\pi}{2}$`],
    ],
    explanation: t`Multiply by $\frac{\pi}{180}$ and simplify: $\frac{30}{180} = \frac{1}{6}$, $\frac{45}{180} = \frac{1}{4}$, $\frac{120}{180} = \frac{2}{3}$, $\frac{270}{180} = \frac{3}{2}$.`,
  });

  chk(5 * 0.8, 4);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`A sector has radius 5 cm and angle 0.8 radians. Find its arc length.`,
    value: 4, unit: "cm", wrong: [10, 6.25],
    explanation: t`$s = r\theta = 5 \times 0.8 = 4$ cm.`,
  });

  chk(0.5 * 100 * 0.6, 30);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`A sector has radius 10 cm and angle 0.6 radians. Find its area.`,
    value: 30, unit: "cm²", wrong: [60, 6],
    explanation: t`$A = \frac{1}{2}r^2\theta = \frac{1}{2} \times 100 \times 0.6 = 30$ cm$^2$. Forgetting the half gives 60.`,
  });

  chk(0.5 * 36 * (Math.PI / 4), (9 * Math.PI) / 2);
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Find the exact area of a sector with radius 6 cm and angle $\frac{\pi}{4}$.`,
    options: [
      [t`$\frac{9\pi}{2}$ cm$^2$`, t`Correct: $\frac{1}{2} \times 36 \times \frac{\pi}{4} = \frac{9\pi}{2}$.`],
      [t`$\frac{3\pi}{2}$ cm$^2$`, t`This is the arc length $r\theta$, in cm.`],
      [t`$9\pi$ cm$^2$`, t`The factor $\frac{1}{2}$ has been left out.`],
      [t`$\frac{9\pi}{4}$ cm$^2$`, t`This halves twice: $\frac{1}{2} \times 36 \times \frac{\pi}{4}$ is $\frac{36\pi}{8}$.`],
    ],
    answer: "A",
    explanation: t`$A = \frac{1}{2}r^2\theta = \frac{1}{2}(6^2)\left(\frac{\pi}{4}\right) = \frac{36\pi}{8} = \frac{9\pi}{2}$ cm$^2$.`,
  });

  chk(14 / 8, 1.75);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`An arc of length 14 cm is cut from a circle of radius 8 cm. Find the angle at the centre in radians.`,
    value: 1.75, unit: "rad", wrong: [112, 0.571],
    explanation: t`$\theta = \frac{s}{r} = \frac{14}{8} = 1.75$ radians.`,
    hints: [t`Rearrange $s = r\theta$.`],
  });

  chk(Math.sqrt((2 * 75) / 1.5), 10);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`A sector has area 75 cm$^2$ and angle 1.5 radians. Find its radius.`,
    value: 10, unit: "cm", wrong: [100, 7.07],
    explanation: t`$\frac{1}{2}r^2(1.5) = 75$ gives $0.75r^2 = 75$, $r^2 = 100$ and $r = 10$ cm.`,
    hints: [t`Substitute into $A = \frac{1}{2}r^2\theta$ and solve for $r^2$.`],
  });

  chk(2 * 7.5 + 7.5 * 2, 30);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Find the perimeter of a sector with radius 7.5 cm and angle 2 radians.`,
    value: 30, unit: "cm", wrong: [15, 22.5],
    explanation: t`Perimeter $= 2r + r\theta = 15 + 15 = 30$ cm. The arc alone is 15 cm.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`The formula $A = \frac{1}{2}r^2\theta$ for the area of a sector gives the correct answer when $\theta$ is measured in degrees.`,
    answer: false,
    explanation: t`False. The formula comes from $\frac{\theta}{2\pi} \times \pi r^2$, which needs $\theta$ in radians. In degrees the area is $\frac{\theta}{360} \times \pi r^2$.`,
  });

  {
    const rs = quad.roots(1, -14, 48);
    same(rs, [6, 8]);
    chk(16 / 6, 8 / 3); chk((28 - 16) / 8, 1.5);
    chk(0.5 * 64 * 1.5, 48); chk(2 * 8 + 8 * 1.5, 28);
  }
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`A sector has perimeter 28 cm and area 48 cm$^2$. Its angle $\theta$ is less than 2 radians. Find the radius and the angle.`,
    template: "r = {{blank:r}} cm, θ = {{blank:th}} radians",
    blanks: [{ id: "r", input: "number", accepted: [8], wrong: "6" }, { id: "th", input: "number", accepted: [1.5], wrong: "2.67" }],
    explanation: t`$2r + r\theta = 28$ gives $r\theta = 28 - 2r$. Then $\frac{1}{2}r(r\theta) = 48$: $\frac{1}{2}r(28 - 2r) = 48$, so $14r - r^2 = 48$, $r^2 - 14r + 48 = 0$, $(r - 6)(r - 8) = 0$. $r = 6$ gives $\theta = \frac{16}{6} \approx 2.67 > 2$, rejected; $r = 8$ gives $\theta = \frac{12}{8} = 1.5$.`,
    hints: [t`Write $r\theta$ from the perimeter, then use $A = \frac{1}{2}r(r\theta)$.`, "Check which solution satisfies θ < 2."],
  });

  const wiper = 0.5 * (55 ** 2 - 10 ** 2) * 2.2;
  chk(wiper, 3217.5);
  b.calc({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`The rubber blade of a kombi windscreen wiper stretches from 10 cm to 55 cm from the pivot. The wiper turns through 2.2 radians. Find the area of windscreen cleaned, correct to 3 significant figures.`,
    value: wiper, unit: "cm²", wrong: [0.5 * 45 ** 2 * 2.2, 0.5 * 55 ** 2 * 2.2],
    explanation: t`The cleaned region is a large sector minus a small one: $\frac{1}{2}(55^2)(2.2) - \frac{1}{2}(10^2)(2.2) = \frac{1}{2}(3025 - 100)(2.2) = 3217.5 \approx 3220$ cm$^2$ (3 s.f.). Using a radius of $55 - 10 = 45$ cm gives 2230 cm$^2$, which is wrong.`,
    hints: ["Subtract the small sector from the large sector."],
  });

  chk(12 * ((5 * Math.PI) / 6), 10 * Math.PI);
  b.expr({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the exact arc length of a sector with radius 12 cm and angle $\frac{5\pi}{6}$. Give your answer in terms of π (type pi or π), without units.`,
    accepted: ["10π", "10pi", "10*π", "π10"],
    wrong: ["60π", "5π"],
    explanation: t`$s = r\theta = 12 \times \frac{5\pi}{6} = 10\pi$ cm.`,
    hints: [t`$s = r\theta$ with $\theta$ in radians.`],
  });

  chk(0.3 * 50, 15);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`A wheel of radius 0.3 m turns through 50 radians as Tatenda pushes his bicycle along a straight road without slipping. How far does the bicycle move?`,
    options: [
      [t`15 m`, t`Correct: the distance equals the arc length $r\theta = 0.3 \times 50$.`],
      [t`2.25 m`, t`This is $\frac{1}{2}r^2\theta$, an area, not a distance.`],
      [t`94.2 m`, t`This multiplies 15 by $2\pi$: the angle is already in radians.`],
      [t`0.262 m`, t`This treats 50 as degrees.`],
    ],
    answer: "A",
    explanation: t`Rolling without slipping, the distance moved equals the arc length on the rim: $s = 0.3 \times 50 = 15$ m.`,
    hints: ["The road length covered equals the arc of the rim that touches it."],
  });

  for (const [r, A] of [[4, 10], [7.5, 31]]) { const th = (2 * A) / (r * r); chk(2 * r + r * th, 2 * r + (2 * A) / r); }
  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 3,
    stem: t`A sector has radius $r$ and area $A$. Show that its perimeter is $2r + \dfrac{2A}{r}$.`,
    points: [
      t`M1 uses $A = \frac{1}{2}r^2\theta$ to obtain $\theta = \frac{2A}{r^2}$.`,
      t`M1 uses perimeter $= 2r + r\theta$.`,
      t`A1 substitutes to reach $2r + \frac{2A}{r}$.`,
    ],
    modelAnswer: t`$$
A = \frac{1}{2}r^2\theta \Rightarrow \theta = \frac{2A}{r^2}
$$

$$
\text{perimeter} = 2r + r\theta = 2r + r \times \frac{2A}{r^2} = 2r + \frac{2A}{r}
$$`,
    explanation: "Eliminate θ between the area formula and the perimeter.",
    hints: ["Make θ the subject of the area formula first."],
  });

  {
    const r = 120, th = 0.9;
    const arc = r * th, area = 0.5 * r * r * th, per = 2 * r + arc, cost = per * 2.5;
    chk(arc, 108); chk(area, 6480); chk(per, 348); chk(cost, 870);
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
      stem: t`A maize field near Chinhoyi is in the shape of a sector of a circle with radius 120 m and angle 0.9 radians.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Find the length of the curved edge of the field.", value: arc, unit: "m", wrong: [108 * 2], explanation: t`$s = 120 \times 0.9 = 108$ m.` }),
        P.num({ label: "(b)", marks: 2, stem: "Find the area of the field.", value: area, unit: "m²", wrong: [12960], explanation: t`$A = \frac{1}{2} \times 120^2 \times 0.9 = \frac{1}{2} \times 14\,400 \times 0.9 = 6480$ m$^2$.` }),
        P.num({ label: "(c)", marks: 1, stem: "Find the perimeter of the field.", value: per, unit: "m", wrong: [228], explanation: t`$2 \times 120 + 108 = 348$ m.` }),
        P.num({ label: "(d)", marks: 2, stem: t`Fencing costs ${money(2.5)} per metre. Find the cost, in dollars, of fencing the whole perimeter.`, value: cost, wrong: [270], explanation: t`$348 \times 2.50 = 870$, so the fence costs ${money(870)}.` }),
      ],
      explanation: "Arc s = rθ, area ½r²θ, perimeter 2r + rθ, with θ in radians.",
      hints: ["The perimeter includes both straight edges.", "Multiply the perimeter by the cost per metre."],
    });
  }

  {
    const r = 9, th = (2 * Math.PI) / 3;
    chk(r * th, 6 * Math.PI); chk(0.5 * r * r * th, 27 * Math.PI);
    chk(deg(th), 120);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
      stem: t`A sector $OAB$ of a circle with centre $O$ has arc length $6\pi$ cm and area $27\pi$ cm$^2$.`,
      parts: [
        P.proof({ label: "(a)", marks: 3, stem: t`Show that the radius of the sector is 9 cm.`,
          points: [t`M1 writes $r\theta = 6\pi$ and $\frac{1}{2}r^2\theta = 27\pi$.`, t`M1 combines them: $\frac{1}{2}r(r\theta) = \frac{1}{2}r(6\pi) = 27\pi$.`, t`A1 obtains $3\pi r = 27\pi$, so $r = 9$.`],
          modelAnswer: t`$$
r\theta = 6\pi, \qquad \frac{1}{2}r^2\theta = 27\pi
$$

$$
\frac{1}{2}r(r\theta) = \frac{1}{2}r(6\pi) = 3\pi r = 27\pi \Rightarrow r = 9
$$`,
          explanation: "Area = ½ × radius × arc length." }),
        P.num({ label: "(b)", marks: 2, stem: t`The angle $AOB$ is $k\pi$ radians. Find the exact value of $k$ as a fraction.`, value: 2 / 3, prefix: "k =", wrong: [1.5],
          explanation: t`$\theta = \frac{6\pi}{9} = \frac{2\pi}{3}$, so $k = \frac{2}{3}$.` }),
        P.num({ label: "(c)", marks: 1, stem: t`Write angle $AOB$ in degrees.`, value: 120, unit: "°", wrong: [60], explanation: t`$\frac{2\pi}{3} \times \frac{180}{\pi} = 120^\circ$.` }),
        P.fib({ label: "(d)", marks: 1, stem: t`The perimeter of the sector is $(a + b\pi)$ cm. Find $a$ and $b$.`, template: "a = {{blank:a}}, b = {{blank:b}}",
          blanks: [{ id: "a", input: "number", accepted: [18], wrong: "9" }, { id: "b", input: "number", accepted: [6], wrong: "27" }],
          explanation: t`$2r + s = 18 + 6\pi$.` }),
      ],
      explanation: "Using A = ½rs links the area and arc length directly; then θ = s/r.",
      hints: [t`$\frac{1}{2}r^2\theta = \frac{1}{2}r(r\theta)$.`, t`$\theta = \frac{s}{r}$.`],
    });
  }

  chk(0.5 * 16 * 1.5, 12); chk(16 * 0.75, 12); chk(0.5 * 4 * 6, 12); chk(4 * 3, 12);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`A sector of a circle of radius 4 cm has area 12 cm$^2$. Find the angle of the sector in radians.`,
    options: [
      [t`$1.5$`, t`Correct: $\frac{1}{2}(16)\theta = 12$ gives $\theta = 1.5$.`],
      [t`$0.75$`, t`This solves $r^2\theta = 12$: the factor $\frac{1}{2}$ is missing.`],
      [t`$6$`, t`This solves $\frac{1}{2}r\theta = 12$: the radius must be squared.`],
      [t`$3$`, t`This solves $r\theta = 12$, the arc-length formula.`],
    ],
    answer: "A",
    explanation: t`$A = \frac{1}{2}r^2\theta$: $12 = \frac{1}{2} \times 16 \times \theta = 8\theta$, so $\theta = 1.5$ radians.`,
    hints: [t`Substitute into $A = \frac{1}{2}r^2\theta$.`],
  });

  b.card("DEFINITION", "Radian", "The angle subtended at the centre by an arc equal in length to the radius.");
  b.card("FACT", "π radians", t`$\pi$ rad $= 180^\circ$; 1 rad $\approx 57.3^\circ$.`);
  b.card("FORMULA", "Degrees ↔ radians", t`To radians: $\times \frac{\pi}{180}$. To degrees: $\times \frac{180}{\pi}$.`);
  b.card("FORMULA", "Arc length", t`$s = r\theta$ ($\theta$ in radians). Not in the List of formulas.`);
  b.card("FORMULA", "Sector area", t`$A = \frac{1}{2}r^2\theta$ ($\theta$ in radians). Not in the List of formulas.`);
  b.card("FORMULA", "Perimeter of a sector", t`$2r + r\theta$`);
  b.card("FACT", "Exact radian values", t`$30^\circ = \frac{\pi}{6}$, $45^\circ = \frac{\pi}{4}$, $60^\circ = \frac{\pi}{3}$, $90^\circ = \frac{\pi}{2}$.`);
  b.card("CONCEPT", "Area from radius and arc", t`$A = \frac{1}{2}rs$, since $\frac{1}{2}r^2\theta = \frac{1}{2}r(r\theta)$.`);
  b.card("FACT", "Calculator mode", "Use radian mode for trigonometric functions of angles in radians.");
});
