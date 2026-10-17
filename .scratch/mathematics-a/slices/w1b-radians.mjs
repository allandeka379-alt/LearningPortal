// W1b: amaths.trig.radians-arcs-sectors
import { concept, P, t, chk, same, rnd, sf, quad, deg, rad, root, ZP } from "../lib.mjs";

const { sin, cos, tan, PI, sqrt, acos } = Math;

concept("amaths.trig.radians-arcs-sectors", { file: "trig/radians-arcs-sectors", keyPrefix: "trig.radians-arcs-sectors" }, (b) => {
  chk(deg((3 * PI) / 4), 135);
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`What is $\frac{3\pi}{4}$ radians in degrees?`,
    options: [
      [t`$135^\circ$`, t`Correct: $\frac{3}{4} \times 180^\circ = 135^\circ$.`],
      [t`$270^\circ$`, t`This uses $\pi = 360^\circ$; in fact $\pi$ radians is $180^\circ$.`],
      [t`$67.5^\circ$`, t`This halves the answer: $\pi$ radians is $180^\circ$, not $90^\circ$.`],
      [t`$2.36^\circ$`, t`$2.36$ is the angle in radians as a decimal, not in degrees.`],
    ],
    answer: "A",
    explanation: t`Multiply by $\frac{180}{\pi}$: $\frac{3\pi}{4} \times \frac{180}{\pi} = 135^\circ$.`,
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: t`Convert $40^\circ$ to radians, correct to 3 significant figures.`,
    value: rad(40), unit: "rad", wrong: [40 * 180 / PI, 0.4],
    explanation: t`$40 \times \frac{\pi}{180} = \frac{2\pi}{9} = 0.698$ radians.`,
  });

  chk(9 * 1.4, 12.6);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`A sector of a circle has radius 9 cm and angle 1.4 radians. Find the length of its arc.`,
    value: 12.6, unit: "cm", wrong: [56.7, 30.6],
    explanation: t`$s = r\theta = 9 \times 1.4 = 12.6$ cm. (56.7 is the area; 30.6 is the perimeter.)`,
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Find the area of a sector of a circle of radius 7 cm with angle 0.8 radians.`,
    value: 0.5 * 49 * 0.8, unit: "cm²", wrong: [39.2, 5.6],
    explanation: t`$A = \frac{1}{2}r^2\theta = \frac{1}{2} \times 49 \times 0.8 = 19.6$ cm$^2$. (Forgetting the $\frac{1}{2}$ gives 39.2.)`,
  });

  chk(0.5 * 36 * (PI / 3), 6 * PI);
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`A sector has radius 6 cm and angle $\frac{\pi}{3}$. What is its exact area?`,
    options: [
      [t`$6\pi$ cm$^2$`, t`Correct: $\frac{1}{2} \times 36 \times \frac{\pi}{3} = 6\pi$.`],
      [t`$2\pi$ cm$^2$`, t`This is the arc length, $6 \times \frac{\pi}{3}$, not the area.`],
      [t`$12\pi$ cm$^2$`, t`The $\frac{1}{2}$ in $\frac{1}{2}r^2\theta$ has been left out.`],
      [t`$\pi^2$ cm$^2$`, t`This squares the angle instead of the radius: only $r$ is squared.`],
    ],
    answer: "A",
    explanation: t`$A = \frac{1}{2}r^2\theta = \frac{1}{2} \times 6^2 \times \frac{\pi}{3} = 6\pi$ cm$^2$.`,
  });

  const seg = 50 * (1.1 - sin(1.1));
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A chord of a circle of radius 10 cm subtends an angle of 1.1 radians at the centre. Find the area of the minor segment, correct to 3 significant figures.`,
    value: seg, unit: "cm²", wrong: [50 * (1.1 - sin(rad(1.1))), 55],
    explanation: t`Segment = sector − triangle $= \frac{1}{2} \times 100 \times 1.1 - \frac{1}{2} \times 100 \times \sin 1.1 = 55 - 44.56 = 10.4$ cm$^2$. (Degree mode gives $\sin 1.1° = 0.0192$ and about $54.0$.)`,
    hints: [t`Area of the triangle is $\frac{1}{2}r^2\sin\theta$.`, "Use radian mode."],
  });

  chk((26 - 16) / 8, 1.25); chk(0.5 * 64 * 1.25, 40);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "A sector of a circle has radius 8 cm and perimeter 26 cm. Find the angle of the sector and its area.",
    template: "angle = {{blank:a}} radians, area = {{blank:b}} cm²",
    blanks: [
      { id: "a", input: "number", accepted: [1.25], wrong: "3.25" },
      { id: "b", input: "number", accepted: [40], wrong: "104" },
    ],
    explanation: t`$2r + r\theta = 26 \Rightarrow 16 + 8\theta = 26 \Rightarrow \theta = 1.25$. Area $= \frac{1}{2} \times 64 \times 1.25 = 40$ cm$^2$. (3.25 forgets the two radii in the perimeter.)`,
    hints: ["The perimeter includes the two radii as well as the arc."],
  });

  // arc 15, area 75 → r = 10, θ = 1.5
  chk((2 * 75) / 15, 10); chk(15 / 10, 1.5);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "A sector has arc length 15 cm and area 75 cm². Find the angle of the sector in radians.",
    value: 1.5, unit: "rad", wrong: [0.2, 5],
    explanation: t`$A = \frac{1}{2}r \cdot s$, so $75 = \frac{1}{2}r \times 15$ and $r = 10$. Then $\theta = \frac{s}{r} = \frac{15}{10} = 1.5$ radians.`,
    hints: [t`Area $= \frac{1}{2}r^2\theta = \frac{1}{2}r(r\theta) = \frac{1}{2}rs$.`],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`An angle of 1 radian is greater than $60^\circ$.`,
    answer: false,
    explanation: t`$1 \text{ rad} = \frac{180^\circ}{\pi} \approx 57.3^\circ$, which is less than $60^\circ$. (In fact $60^\circ = \frac{\pi}{3} \approx 1.047$ rad.)`,
  });

  chk(4 * PI + 6 * sqrt(3), 6 * (2 * PI / 3) + 2 * 6 * sin(PI / 3));
  b.expr({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`A chord $PQ$ of a circle with centre $O$ and radius 6 cm subtends an angle of $\frac{2\pi}{3}$ at $O$. Find the exact perimeter of the minor segment, in the form $a\pi + b\sqrt{3}$. Type π as pi and √ as sqrt, e.g. 2pi+5sqrt3.`,
    accepted: ["4π+6√3", "6√3+4π", "4π+√108", "2(2π+3√3)"],
    wrong: ["4π+6", "4π+3√3"],
    explanation: t`Arc $= 6 \times \frac{2\pi}{3} = 4\pi$. Chord $= 2 \times 6\sin\frac{\pi}{3} = 6\sqrt{3}$. Perimeter $= 4\pi + 6\sqrt{3}$ cm.`,
    hints: [t`The chord is $2r\sin\frac{\theta}{2}$.`],
  });

  chk(0.5 * 36 * (2 * PI / 3 - sin(2 * PI / 3)), 12 * PI - 9 * sqrt(3));
  b.expr({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`For the same circle (radius 6 cm, chord subtending $\frac{2\pi}{3}$ at the centre), find the exact area of the minor segment in the form $a\pi - b\sqrt{3}$. Type π as pi and √ as sqrt.`,
    accepted: ["12π-9√3", "-9√3+12π", "3(4π-3√3)"],
    wrong: ["12π-18√3", "12π-9"],
    explanation: t`Sector $= \frac{1}{2} \times 36 \times \frac{2\pi}{3} = 12\pi$. Triangle $= \frac{1}{2} \times 36 \times \sin\frac{2\pi}{3} = 18 \times \frac{\sqrt{3}}{2} = 9\sqrt{3}$. Segment $= 12\pi - 9\sqrt{3}$ cm$^2$.`,
    hints: [t`$\sin\frac{2\pi}{3} = \frac{\sqrt{3}}{2}$.`],
  });

  const tangReg = 12.5 * (tan(1) - 1);
  b.calc({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`$OA$ is a radius of a circle with centre $O$ and radius 5 cm. The tangent at $A$ meets the line $OB$ at $T$, where $B$ is on the circle and angle $AOT = 1$ radian. Find the area of the region bounded by $AT$, $TB$ and the arc $AB$, correct to 3 significant figures.`,
    value: tangReg, unit: "cm²", wrong: [12.5 * tan(1), 0.5 * 25 * (1 - sin(1))],
    explanation: t`Triangle $OAT$ is right-angled at $A$ with $AT = 5\tan 1 = 7.787$, so its area is $\frac{1}{2} \times 5 \times 7.787 = 19.47$. Sector $OAB = \frac{1}{2} \times 25 \times 1 = 12.5$. Region $= 19.47 - 12.5 = 6.97$ cm$^2$.`,
    hints: ["The tangent at A is perpendicular to OA.", "Region = triangle OAT − sector OAB."],
  });

  // trough: radius 0.5 m, water 0.2 m deep → θ = 2 arccos(0.6)
  const th = 2 * acos(0.6);
  const water = 0.125 * (th - sin(th));
  chk(sin(th), 0.96);
  b.calc({
    d: 5, skill: "ANALYSIS", calculator: true,
    stem: "A horizontal cylindrical water tank at a borehole in Masvingo has a circular cross-section of radius 0.5 m. The water in it is 0.2 m deep at the lowest point. Find the area of the cross-section of the water, in m², correct to 3 significant figures.",
    value: water, unit: "m²", wrong: [0.125 * (th - sin(rad(th))), 0.2 * 0.8],
    explanation: t`The water surface is a chord $0.5 - 0.2 = 0.3$ m from the centre. Half-angle $\alpha = \cos^{-1}\frac{0.3}{0.5} = 0.9273$, so the chord subtends $\theta = 2\alpha = 1.8546$ radians. Segment area $= \frac{1}{2}(0.5)^2(\theta - \sin\theta) = 0.125(1.8546 - 0.96) = 0.112$ m$^2$.`,
    hints: ["The centre is 0.3 m above the water surface.", t`Find half the angle with $\cos\alpha = \frac{0.3}{0.5}$.`],
  });

  // ZIMSEC small angles
  for (const x of [0.01, 0.001]) chk((sin(3 * x) * tan(2 * x)) / (1 - cos(4 * x)), 0.75, 2e-4);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false, applies: ZP,
    stem: t`Using small-angle approximations, $\dfrac{\sin 3x \tan 2x}{1 - \cos 4x}$ is approximately equal to which value when $x$ is small?`,
    options: [
      [t`$\frac{3}{4}$`, t`Correct: numerator $\approx 3x \cdot 2x = 6x^2$, denominator $\approx 1 - (1 - 8x^2) = 8x^2$.`],
      [t`$\frac{3}{8}$`, t`This uses $1 - \cos 4x \approx 16x^2$, forgetting to halve $(4x)^2$.`],
      [t`$\frac{3}{2}$`, t`This takes $\frac{(4x)^2}{2}$ as $4x^2$: square $4x$ first, giving $16x^2$, then halve.`],
      [t`$6$`, t`The denominator is not $x^2$: $1 - \cos 4x \approx 8x^2$.`],
    ],
    answer: "A",
    explanation: t`$\sin 3x \approx 3x$, $\tan 2x \approx 2x$, $\cos 4x \approx 1 - \frac{16x^2}{2} = 1 - 8x^2$. So the expression $\approx \frac{6x^2}{8x^2} = \frac{3}{4}$.`,
    hints: [t`$\cos\theta \approx 1 - \frac{\theta^2}{2}$ with $\theta = 4x$.`],
  });

  chk(1 - 0.01 / 2, 0.995);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, applies: ZP,
    stem: t`Use the small-angle approximation for $\cos x$ to estimate $\cos 0.1$ (0.1 radians). Give the value of the approximation to 3 decimal places.`,
    value: 0.995, dp: 3, wrong: [0.9, 1],
    explanation: t`$\cos x \approx 1 - \frac{x^2}{2} = 1 - \frac{0.01}{2} = 0.995$. (The calculator value is $0.99500$ to 5 d.p.: the approximation is excellent.)`,
  });

  b.match({
    d: 2, skill: "RECALL", calculator: false,
    stem: "Match each angle in degrees with the same angle in radians.",
    pairs: [
      [t`$30^\circ$`, t`$\frac{\pi}{6}$`],
      [t`$45^\circ$`, t`$\frac{\pi}{4}$`],
      [t`$120^\circ$`, t`$\frac{2\pi}{3}$`],
      [t`$270^\circ$`, t`$\frac{3\pi}{2}$`],
    ],
    explanation: t`Multiply by $\frac{\pi}{180}$: $30^\circ = \frac{\pi}{6}$, $45^\circ = \frac{\pi}{4}$, $120^\circ = \frac{2\pi}{3}$, $270^\circ = \frac{3\pi}{2}$.`,
  });

  // sector equals circle of radius r/2: ½r²θ = π r²/4 → θ = π/2
  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`A sector of a circle of radius $r$ has the same area as a whole circle of radius $\frac{r}{2}$. What is the angle of the sector?`,
    options: [
      [t`$\frac{\pi}{2}$`, t`Correct: $\frac{1}{2}r^2\theta = \pi\left(\frac{r}{2}\right)^2 = \frac{\pi r^2}{4}$ gives $\theta = \frac{\pi}{2}$.`],
      [t`$\frac{\pi}{4}$`, t`This forgets the $\frac{1}{2}$ in the sector formula.`],
      [t`$\pi$`, t`This uses $\pi\frac{r^2}{2}$ for the small circle: $\left(\frac{r}{2}\right)^2 = \frac{r^2}{4}$.`],
      [t`$\frac{\pi}{8}$`, t`This halves the correct angle twice; solve $\frac{1}{2}\theta = \frac{\pi}{4}$ carefully.`],
    ],
    answer: "A",
    explanation: t`$\frac{1}{2}r^2\theta = \frac{\pi r^2}{4} \Rightarrow \theta = \frac{\pi}{2}$.`,
    hints: ["Write both areas in terms of r and cancel r²."],
  });

  b.proof({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 3,
    stem: t`A chord $AB$ of a circle with centre $O$ and radius $r$ subtends an angle $\theta$ radians at $O$. Show that the area of the minor segment is $\frac{1}{2}r^2(\theta - \sin\theta)$.`,
    points: [
      t`M1 sector area $\frac{1}{2}r^2\theta$.`,
      t`M1 triangle $OAB$ area $\frac{1}{2}r \cdot r\sin\theta$ (two sides and the included angle).`,
      t`A1 subtracts and factorises to $\frac{1}{2}r^2(\theta - \sin\theta)$.`,
    ],
    modelAnswer: t`$$
\text{segment} = \text{sector } OAB - \text{triangle } OAB
$$

$$
= \frac{1}{2}r^2\theta - \frac{1}{2}r^2\sin\theta = \frac{1}{2}r^2(\theta - \sin\theta)
$$`,
    explanation: t`The triangle has two sides $r$ with included angle $\theta$, so its area is $\frac{1}{2}ab\sin C = \frac{1}{2}r^2\sin\theta$.`,
    hints: ["Segment = sector − triangle."],
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: "Explain what is meant by an angle of 1 radian, and why π radians equals 180°.",
    points: [
      "1 radian is the angle at the centre of a circle subtended by an arc whose length equals the radius.",
      "The circumference 2πr contains 2π arcs of length r, so a full turn (360°) is 2π radians and π radians is 180°.",
    ],
    modelAnswer: "An arc equal in length to the radius subtends 1 radian at the centre. A whole circle has circumference 2πr = 2π × r, so it contains 2π such arcs: 360° = 2π rad, hence π rad = 180°.",
    explanation: "The radian is defined by lengths, not by dividing a circle into 360 parts.",
  });

  // Struct (12): r = 10, θ = 0.8
  const AB = 20 * sin(0.4);
  const tri = 50 * sin(0.8);
  const segA = 40 - tri;
  chk(AB, sqrt(200 - 200 * cos(0.8)));
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
    stem: t`The diagram (described) shows a sector $OAB$ of a circle with centre $O$ and radius 10 cm, with angle $AOB = 0.8$ radians. The chord $AB$ is drawn, and the region between the chord and the arc is shaded.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Find the length of the chord AB, correct to 3 significant figures.", value: AB, unit: "cm", wrong: [8, 20 * sin(0.8)],
        explanation: t`$AB = 2 \times 10\sin 0.4 = 7.79$ cm (or by the cosine rule, $AB^2 = 200 - 200\cos 0.8$).` }),
      P.num({ label: "(b)", marks: 2, stem: "Find the perimeter of the shaded region.", value: 8 + AB, unit: "cm", wrong: [28, 8],
        explanation: t`Arc $= 10 \times 0.8 = 8$; perimeter $= 8 + 7.788 = 15.8$ cm.` }),
      P.num({ label: "(c)", marks: 2, stem: "Find the area of triangle OAB.", value: tri, unit: "cm²", wrong: [50 * sin(rad(0.8)), 40],
        explanation: t`$\frac{1}{2} \times 10 \times 10 \times \sin 0.8 = 35.9$ cm$^2$ (radian mode).` }),
      P.num({ label: "(d)", marks: 2, stem: "Find the area of the shaded region.", value: segA, unit: "cm²", wrong: [40, 40 + tri],
        explanation: t`Sector $= \frac{1}{2} \times 100 \times 0.8 = 40$; shaded $= 40 - 35.868 = 4.13$ cm$^2$.` }),
      P.num({ label: "(e)", marks: 2, stem: "Find the shaded area as a percentage of the area of the sector.", value: (segA / 40) * 100, unit: "%", wrong: [89.7, 4.13],
        explanation: t`$\frac{4.132}{40} \times 100 = 10.3\%$.` }),
      P.proof({ label: "(f)", marks: 2, stem: t`For a different angle $\theta$, the shaded area is one quarter of the sector area. Show that $\sin\theta = \frac{3}{4}\theta$.`,
        points: [t`M1 forms $\frac{1}{2}r^2(\theta - \sin\theta) = \frac{1}{4} \times \frac{1}{2}r^2\theta$.`, t`A1 cancels $\frac{1}{2}r^2$ and rearranges to $\sin\theta = \frac{3}{4}\theta$.`],
        modelAnswer: t`$$
\frac{1}{2}r^2(\theta - \sin\theta) = \frac{1}{4} \cdot \frac{1}{2}r^2\theta
$$

$$
\theta - \sin\theta = \frac{1}{4}\theta \Rightarrow \sin\theta = \frac{3}{4}\theta
$$`,
        explanation: "Cancel the common factor ½r² before rearranging." }),
    ],
    explanation: "Chord from the isosceles triangle, perimeter = arc + chord, segment = sector − triangle.",
    hints: ["Use radian mode throughout.", t`Chord $= 2r\sin\frac{\theta}{2}$.`],
  });

  // Struct (13): r = 8, angle AOB = π/3, tangent at A meets OB extended at T
  const AT = 8 * sqrt(3);
  chk(8 * tan(PI / 3), AT); chk(8 / cos(PI / 3), 16);
  const shaded = 32 * sqrt(3) - (32 * PI) / 3;
  const per = AT + 8 + (8 * PI) / 3;
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`$OAB$ is a sector of a circle with centre $O$, radius 8 cm and angle $AOB = \frac{\pi}{3}$. The tangent to the circle at $A$ meets $OB$ produced at $T$. The region $R$ is bounded by $AT$, $TB$ and the arc $AB$.`,
    parts: [
      P.proof({ label: "(a)", marks: 2, stem: t`Show that $AT = 8\sqrt{3}$ cm and $OT = 16$ cm.`,
        points: [t`M1 uses the right angle $OAT$ (tangent ⟂ radius): $AT = 8\tan\frac{\pi}{3}$.`, t`A1 $AT = 8\sqrt{3}$ and $OT = \frac{8}{\cos\frac{\pi}{3}} = 16$.`],
        modelAnswer: t`Angle $OAT = \frac{\pi}{2}$ because the tangent is perpendicular to the radius.

$$
AT = OA\tan\frac{\pi}{3} = 8\sqrt{3} \qquad OT = \frac{OA}{\cos\frac{\pi}{3}} = \frac{8}{\frac{1}{2}} = 16
$$`,
        explanation: "Right-angled triangle OAT with angle π/3 at O." }),
      P.num({ label: "(b)", marks: 2, stem: "Find the area of triangle OAT, correct to 3 significant figures.", value: 32 * sqrt(3), unit: "cm²", wrong: [64 * sqrt(3), 32],
        explanation: t`$\frac{1}{2} \times 8 \times 8\sqrt{3} = 32\sqrt{3} = 55.4$ cm$^2$.` }),
      P.expr({ label: "(c)", marks: 3, stem: "Find the exact area of R in the form a√3 − bπ/3. Type π as pi and √ as sqrt, e.g. 5sqrt3-7pi/3.",
        accepted: ["32√3-32π/3", "32√3-(32π)/3", "32√3-32/3π", "(96√3-32π)/3", "32(√3-π/3)"],
        wrong: ["32√3-64π/3", "32√3-32π"],
        explanation: t`Sector $= \frac{1}{2} \times 64 \times \frac{\pi}{3} = \frac{32\pi}{3}$. $R = 32\sqrt{3} - \frac{32\pi}{3}$ cm$^2$ (about $21.9$).` }),
      P.num({ label: "(d)", marks: 3, stem: "Find the perimeter of R, correct to 3 significant figures.", value: per, unit: "cm", wrong: [AT + (8 * PI) / 3, AT + 16 + (8 * PI) / 3],
        explanation: t`$TB = OT - OB = 16 - 8 = 8$; arc $AB = 8 \times \frac{\pi}{3} = 8.378$; perimeter $= 13.856 + 8 + 8.378 = 30.2$ cm.` }),
      P.num({ label: "(e)", marks: 1, stem: "Find angle ATO in radians, correct to 3 significant figures.", value: PI / 6, unit: "rad", wrong: [30],
        explanation: t`Angles in triangle $OAT$: $\pi - \frac{\pi}{2} - \frac{\pi}{3} = \frac{\pi}{6} = 0.524$ rad.` }),
      P.num({ label: "(f)", marks: 2, stem: "Find the ratio (area of R) : (area of sector OAB) as a single number, correct to 3 significant figures.", value: shaded / ((32 * PI) / 3), wrong: [1.65, 0.395],
        explanation: t`$\frac{32\sqrt{3} - \frac{32\pi}{3}}{\frac{32\pi}{3}} = \frac{3\sqrt{3}}{\pi} - 1 = 0.654$.` }),
    ],
    explanation: "Tangent ⟂ radius gives a right-angled triangle; R = triangle − sector; its perimeter is AT + TB + arc AB.",
    hints: ["Angle OAT is a right angle.", "TB = OT − OB."],
  });

  b.card("DEFINITION", "Radian", "The angle at the centre of a circle subtended by an arc equal in length to the radius; π rad = 180°.");
  b.card("FORMULA", "Arc length (θ in radians)", t`$s = r\theta$`);
  b.card("FORMULA", "Sector area (θ in radians)", t`$A = \frac{1}{2}r^2\theta = \frac{1}{2}rs$`);
  b.card("FORMULA", "Segment area", t`$\frac{1}{2}r^2(\theta - \sin\theta)$`, "Sector minus triangle.");
  b.card("FORMULA", "Chord subtending θ", t`$2r\sin\frac{\theta}{2}$`);
  b.card("FACT", "Degrees to radians", t`Multiply by $\frac{\pi}{180}$; radians to degrees: multiply by $\frac{180}{\pi}$.`);
  b.card("FACT", "Small-angle approximations", t`$\sin x \approx x$, $\tan x \approx x$, $\cos x \approx 1 - \frac{x^2}{2}$, $x$ small and in radians.`, undefined, { applies: ZP });
  b.card("CONCEPT", "Calculator mode", "Use radian mode whenever the angle is in radians, e.g. sin θ in the segment formula.");
  b.card("CONCEPT", "Two facts about a sector", "Form two equations (perimeter 2r + rθ, area ½r²θ) and solve; reject any θ > 2π.");
});
