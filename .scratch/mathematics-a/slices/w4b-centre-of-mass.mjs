// W4b: amaths.com.centre-of-mass (ZIMSEC only: Mechanics F6 6.7)
import { concept, P, t, chk, deg } from "../lib.mjs";
import { f3, f4, fd, NB, NBd, CB } from "../tables/w4b-kit.mjs";

const { atan } = Math;

concept("amaths.com.centre-of-mass", { file: "com/centre-of-mass", keyPrefix: "com.centre-of-mass" }, (b) => {
  // q01
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "Where is the centre of mass of a uniform triangular lamina?",
    options: [
      ["On each median, two-thirds of the way from the vertex", "Correct: the medians meet at the centroid, which divides each median 2 : 1 from the vertex."],
      ["On each median, halfway along it", "The midpoint of a median is not the centroid; the centroid is nearer the side than the vertex."],
      ["At the midpoint of the longest side", "The centre of mass lies inside the triangle, not on a side."],
      ["On each median, one-third of the way from the vertex", "This measures from the wrong end: it is one-third of the way from the SIDE."],
    ],
    answer: "A",
    explanation: t`The centre of mass of a uniform triangle is its centroid, where the medians meet, $\frac{2}{3}$ of the way along each median from the vertex. In coordinates it is the mean of the three vertices.`,
  });

  // q02
  b.tf({
    d: 1, skill: "RECALL", calculator: false,
    stem: "The centre of mass of a uniform hollow sphere is at the centre of the sphere, even though there is no material there.",
    answer: true,
    explanation: "By symmetry the centre of mass lies on every plane of symmetry, and these meet at the centre. The centre of mass need not be inside the material (a ring is another example).",
  });

  // q03 particles on a line
  const x3 = (4 * 0 + 6 * 0.5 + 10 * 1.4) / 20;
  chk(x3, 0.85, 1e-12);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`Particles of mass $4$ kg, $6$ kg and $10$ kg are fixed to a light rod at distances $0$ m, $0.5$ m and $1.4$ m from one end $A$. Find the distance of the centre of mass from $A$.`,
    value: x3, unit: "m", wrong: [f3((0 + 0.5 + 1.4) / 3), f3(17 / 10)],
    explanation: t`$\bar{x} = \frac{4(0) + 6(0.5) + 10(1.4)}{4 + 6 + 10} = \frac{17}{20} = 0.85$ m. (The plain mean of the distances, $0.633$ m, ignores the masses.)`,
  });

  // q04 particles in the plane
  const xb4 = (3 * 2 + 1 * -4 + 4 * 5) / 8, yb4 = (3 * 5 + 1 * 1 + 4 * -3) / 8;
  chk(xb4, 2.75, 1e-12); chk(yb4, 0.5, 1e-12);
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Particles of mass $3$ kg, $1$ kg and $4$ kg are at the points $(2, 5)$, $(-4, 1)$ and $(5, -3)$ respectively. Find the coordinates of their centre of mass.`,
    template: "x̄ = {{blank:x}}, ȳ = {{blank:y}}",
    blanks: [NB("x", xb4, 1), NB("y", yb4, 1)],
    explanation: t`Total mass $8$ kg. $\bar{x} = \frac{6 - 4 + 20}{8} = \frac{22}{8} = 2.75$; $\bar{y} = \frac{15 + 1 - 12}{8} = \frac{4}{8} = 0.5$.`,
  });

  // q05 triangle
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`A uniform triangular lamina has vertices at $(0, 0)$, $(9, 0)$ and $(3, 6)$, with distances in centimetres. Find the coordinates of its centre of mass.`,
    template: "({{blank:x}}, {{blank:y}})",
    blanks: [NB("x", 4, 6), NB("y", 2, 3)],
    explanation: t`The centre of mass of a uniform triangle is the mean of its vertices: $\left(\frac{0 + 9 + 3}{3}, \frac{0 + 0 + 6}{3}\right) = (4, 2)$.`,
  });

  // q06 rod + particle
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`A uniform rod $AB$ of length $2$ m and mass $3$ kg has a particle of mass $1$ kg attached at $A$. How far is the centre of mass of the system from $A$?`,
    options: [
      [t`$0.75$ m`, t`Correct: $\bar{x} = \frac{3(1) + 1(0)}{4} = 0.75$ m.`],
      [t`$1$ m`, "This is the centre of the rod alone; the particle at A pulls the centre of mass towards A."],
      [t`$1.25$ m`, "This moves the centre of mass towards B, away from the extra mass at A."],
      [t`$0.5$ m`, t`This averages $0$ and $1$ without weighting by mass.`],
    ],
    answer: "A",
    explanation: t`The rod's mass acts at its midpoint, $1$ m from $A$. $\bar{x} = \frac{3 \times 1 + 1 \times 0}{3 + 1} = 0.75$ m from $A$.`,
  });

  // q07 disc with hole
  const d7 = (16 * 5) / (100 - 16);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A uniform circular disc has centre $O$ and radius $10$ cm. A circular hole of radius $4$ cm is cut out; the centre of the hole is $5$ cm from $O$. Find the distance of the centre of mass of the remaining lamina from $O$, correct to 3 significant figures, and state on which side of $O$ it lies.`,
    value: d7, unit: "cm", wrong: [f3(80 / 116), f3(4 * 5 / 6)],
    explanation: t`Areas: disc $100\pi$, hole $16\pi$, remainder $84\pi$. Take moments about $O$ along the line through the hole's centre: $84\pi\,\bar{x} = 100\pi(0) - 16\pi(5)$, so $\bar{x} = -\frac{80}{84} = -${f3(d7)}$ cm. The centre of mass is $${f3(d7)}$ cm from $O$, on the OPPOSITE side to the hole. (Adding the hole's area, $116\pi$, is the usual error.)`,
    workedSolution: t`1. Disc: area $100\pi$ at $x = 0$. Hole: area $16\pi$ at $x = 5$. Remainder: $84\pi$.
2. Disc = remainder + hole: $100\pi(0) = 84\pi\bar{x} + 16\pi(5)$.
3. $\bar{x} = -\frac{80}{84} = -${f3(d7)}$ cm: $${f3(d7)}$ cm from $O$, away from the hole.`,
    hints: ["Area is proportional to mass for a uniform lamina; π cancels.", "The hole counts as negative area."],
  });

  // q08 house shape
  const yb8 = (60 * 3 + 30 * 8) / 90;
  chk(yb8, 14 / 3, 1e-12);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`A uniform lamina is made of a rectangle $10$ cm wide and $6$ cm tall, with an isosceles triangle of base $10$ cm and height $6$ cm on top of it, the triangle's base along the top edge of the rectangle. Find the height of the centre of mass above the bottom edge, in centimetres correct to 3 significant figures.`,
    value: yb8, unit: "cm", wrong: [f3((60 * 3 + 30 * 10) / 90), 5.5],
    explanation: t`Rectangle: area $60$, centre $3$ cm up. Triangle: area $\frac{1}{2}(10)(6) = 30$, centroid $\frac{1}{3}$ of its height above its base, i.e. $6 + 2 = 8$ cm up. $\bar{y} = \frac{60(3) + 30(8)}{90} = \frac{420}{90} = ${f3(yb8)}$ cm. (Putting the triangle's centroid $\frac{2}{3}$ of the way up, at $10$ cm, measures from the wrong end of the median.)`,
    hints: ["The triangle's centroid is one-third of its height above its base.", "Use areas as masses."],
  });

  // q09 rectangle hung from a corner
  const a9 = deg(atan(10 / 15));
  b.num({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: t`A uniform rectangular sign $ABCD$, with $AB = 30$ cm and $BC = 20$ cm, hangs freely from the corner $A$. Find the angle between $AB$ and the vertical, in degrees correct to 1 decimal place.`,
    value: a9, unit: "°", wrong: [fd(90 - a9, 1)],
    explanation: t`The centre of mass $G$ is the centre of the rectangle, $15$ cm along $AB$ and $10$ cm across. Hanging from $A$, $AG$ is vertical, so the angle between $AB$ and $AG$ is $\tan^{-1}\frac{10}{15} = ${fd(a9, 1)}°$. ($${fd(90 - a9, 1)}°$ is the angle with the horizontal, or between $AD$ and the vertical.)`,
  });

  // q10 house shape hung from a bottom corner
  const a10 = deg(atan(yb8 / 5));
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`The lamina of the previous question (a $10$ cm by $6$ cm rectangle with an isosceles triangle of height $6$ cm on its top edge) is hung freely from one of its bottom corners. Find the angle between the bottom edge and the vertical, in degrees correct to 1 decimal place.`,
    value: a10, unit: "°", wrong: [fd(90 - a10, 1), fd(deg(atan(yb8 / 10)), 1)],
    explanation: t`By symmetry $G$ is $5$ cm along the bottom edge from the corner, and $${f3(yb8)}$ cm above it. Hanging from that corner, the line to $G$ is vertical, so the bottom edge makes $\tan^{-1}\frac{${f4(yb8)}}{5} = ${fd(a10, 1)}°$ with the vertical. (Using $10$ cm, the whole edge, instead of $5$ cm gives $${fd(deg(atan(yb8 / 10)), 1)}°$.)`,
    hints: ["G lies on the axis of symmetry.", "The line from the corner to G is vertical."],
  });

  // q11 slide or topple: cube, μ = 0.8
  const sl11 = deg(atan(0.8));
  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: t`A uniform cube rests on a rough plank, the coefficient of friction being $0.8$. The plank is slowly tilted. What happens first?`,
    options: [
      [t`It slides, when the angle reaches $${fd(sl11, 1)}°$`, t`Correct: sliding needs $\tan\theta > 0.8$, i.e. $\theta > ${fd(sl11, 1)}°$; toppling needs $\tan\theta > 1$, i.e. $\theta > 45°$.`],
      [t`It topples, when the angle reaches $45°$`, t`Toppling would happen at $45°$, but the cube slides earlier, at $${fd(sl11, 1)}°$.`],
      [t`It topples, when the angle reaches $${fd(sl11, 1)}°$`, "That angle is the sliding condition, tan θ = μ, not the toppling condition."],
      [t`It slides and topples at the same moment`, t`That would need $\mu = 1$ exactly; here $0.8 < 1$.`],
    ],
    answer: "A",
    explanation: t`Slide: $\tan\theta = \mu = 0.8$, $\theta = ${fd(sl11, 1)}°$. Topple: $G$ is above the lower edge when $\tan\theta = \frac{\text{half width}}{\text{half height}} = 1$, $\theta = 45°$. The smaller angle comes first, so the cube slides.`,
    hints: ["Compare tan θ = μ with tan θ = (half width)/(half height)."],
  });

  // q12 cylinder: topple angle and least μ
  const a12 = deg(atan(0.4));
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`A uniform solid cylinder of radius $0.2$ m and height $1$ m stands on its flat end on a rough plane. The plane is slowly tilted. Find the angle at which the cylinder would topple (degrees, 1 decimal place), and the least coefficient of friction for which it topples before it slides.`,
    template: "toppling angle = {{blank:a}}°, least μ = {{blank:m}}",
    blanks: [NBd("a", a12, 1, fd(deg(atan(0.2)), 1)), NB("m", 0.4, 0.2)],
    explanation: t`$G$ is on the axis, $0.5$ m above the base and $0.2$ m (the radius) from the lowest point of the base. It topples when $\tan\theta = \frac{0.2}{0.5} = 0.4$, $\theta = ${fd(a12, 1)}°$. To topple first, it must not slide before this angle: $\mu > \tan\theta = 0.4$. (Using the full height gives $\tan\theta = 0.2$.)`,
    hints: ["G is halfway up the axis.", "It topples first if the sliding angle (tan θ = μ) is larger."],
  });

  // q13 match
  b.match({
    d: 2, skill: "RECALL", calculator: false,
    stem: "Match each uniform body with the position of its centre of mass.",
    pairs: [
      ["Rod", "Its midpoint"],
      ["Circular hoop", "The centre of the circle"],
      ["Rectangular lamina", "The intersection of the diagonals"],
      ["Solid cylinder", "The midpoint of its axis"],
    ],
    explanation: "All four follow from symmetry: the centre of mass lies on every line or plane of symmetry of a uniform body.",
  });

  // q14
  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Cutting a hole that is not at the centre of a uniform disc does not change the position of the disc's centre of mass.",
    answer: false,
    explanation: "Removing mass on one side moves the centre of mass towards the other side. Only a hole centred at the centre of the disc (keeping the symmetry) leaves it unchanged.",
  });

  // q15 proof: square of side 2a with corner triangle removed
  const a = 1;
  const xb15 = (4 * a * a * a - 0.5 * a * a * (5 * a / 3)) / (3.5 * a * a);
  chk(xb15, 19 / 21, 1e-12);
  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 5,
    stem: t`A uniform square lamina $OABC$ has side $2a$, with $O$ at the origin, $A$ at $(2a, 0)$ and $C$ at $(0, 2a)$. The triangle cut off by the line joining the midpoints of $AB$ and $BC$ is removed. Show that the centre of mass of the remaining lamina is at $\left(\frac{19a}{21}, \frac{19a}{21}\right)$.`,
    points: [
      "B1 square: area 4a², centre (a, a); triangle: vertices (2a, a), (2a, 2a), (a, 2a), area a²/2.",
      "B1 triangle centre of mass (5a/3, 5a/3) (mean of vertices).",
      "M1 remaining area 7a²/2 and a moment equation with the triangle subtracted.",
      "A1 x̄ = (4a³ − 5a³/6)/(7a²/2) = 19a/21.",
      "B1 ȳ = x̄ by symmetry about the line y = x (stated).",
    ],
    modelAnswer: t`Square: area $4a^2$, centre $(a, a)$. Removed triangle: vertices $(2a, a)$, $(2a, 2a)$, $(a, 2a)$, area $\frac{1}{2}a^2$, centre $\left(\frac{5a}{3}, \frac{5a}{3}\right)$. Remaining area $\frac{7a^2}{2}$.
$$
\frac{7a^2}{2}\,\bar{x} = 4a^2(a) - \frac{a^2}{2}\cdot\frac{5a}{3} = 4a^3 - \frac{5a^3}{6} = \frac{19a^3}{6}
$$
$$
\bar{x} = \frac{19a^3}{6} \times \frac{2}{7a^2} = \frac{19a}{21}
$$
The lamina is symmetrical about $y = x$, so $\bar{y} = \bar{x} = \frac{19a}{21}$.`,
    explanation: "Whole = remainder + removed piece; use symmetry for the second coordinate and say so.",
    hints: ["The removed triangle's centre of mass is the mean of its vertices."],
  });

  // q16 explain
  b.manualShort({
    d: 3, skill: "EVALUATION", calculator: false, marks: 2,
    stem: "A scotch cart is loaded with bags of maize stacked high. Explain, using the idea of centre of mass, why it is more likely to tip over when crossing a sloping field than when it is loaded with the same bags spread low.",
    points: [
      "Stacking high raises the centre of mass of the loaded cart.",
      "On a slope the vertical through a higher G passes outside the lower wheel (the base) at a smaller angle of slope, so the weight has a toppling moment about the lower wheel sooner.",
    ],
    modelAnswer: "The cart tips about its lower wheel when the vertical line through its centre of mass passes outside the wheel base. The higher G is, the smaller the slope angle needed for this (tan θ = half the wheel base ÷ height of G). Loading the bags low keeps G low, so a steeper slope is needed before it tips.",
    explanation: "Toppling depends on where the vertical through G falls relative to the base.",
    hints: ["Where does the vertical line through G meet the ground?"],
  });

  // q17 struct 5: L-shaped framework of two rods
  const xb17 = (1.4 * 0.35) / 2.3, yb17 = (0.9 * 0.25) / 2.3;
  const a17 = deg(atan(yb17 / xb17));
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, calculator: true,
    stem: t`A framework is made of two uniform rods joined at right angles at $O$: $OA$ of length $0.7$ m and mass $1.4$ kg, and $OB$ of length $0.5$ m and mass $0.9$ kg. Take $OA$ along the $x$-axis and $OB$ along the $y$-axis.`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: "Find the coordinates of the centre of mass of the framework, correct to 3 significant figures.", template: "({{blank:x}}, {{blank:y}}) m",
        blanks: [NB("x", xb17, 0.35, 2), NB("y", yb17, 0.25, 1)],
        explanation: t`Rod $OA$: mass $1.4$ at $(0.35, 0)$; rod $OB$: mass $0.9$ at $(0, 0.25)$; total $2.3$ kg. $\bar{x} = \frac{1.4(0.35)}{2.3} = ${f3(xb17)}$, $\bar{y} = \frac{0.9(0.25)}{2.3} = ${f3(yb17)}$.` }),
      P.num({ label: "(b)", marks: 2, stem: "The framework hangs freely from O. Find the angle between OA and the vertical, in degrees correct to 1 decimal place.", value: a17, unit: "°", wrong: [fd(90 - a17, 1)],
        explanation: t`$OG$ is vertical; angle between $OA$ and $OG$ is $\tan^{-1}\frac{0.225}{0.49} = ${fd(a17, 1)}°$ (the ratio of the moments; $2.3$ cancels).` }),
    ],
    explanation: "Each rod's mass acts at its midpoint; then G hangs vertically below the point of suspension.",
    hints: ["Each rod's centre of mass is its midpoint.", "When hanging from O, OG is vertical."],
  });

  // q18 struct 13: rectangle 16 × 9 with corner triangle removed, suspension, slide/topple
  const xb18 = (144 * 8 - 18 * 14) / 126, yb18 = (144 * 4.5 - 18 * 7) / 126;
  chk(xb18, 50 / 7, 1e-12); chk(yb18, 29 / 7, 1e-12);
  const a18c = deg(atan(yb18 / xb18));
  const top18 = deg(atan(xb18 / yb18)), sl18 = deg(atan(0.9));
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`A uniform lamina is made from a rectangle $OABC$ with $O$ at the origin, $A(16, 0)$, $B(16, 9)$ and $C(0, 9)$ (units cm), by cutting off the right-angled triangle with vertices $(10, 9)$, $(16, 9)$ and $(16, 3)$.`,
    parts: [
      P.proof({ label: "(a)", marks: 4, stem: t`Show that the centre of mass of the lamina is at a distance $\frac{50}{7}$ cm from $OC$.`,
        points: ["B1 rectangle: area 144, centre (8, 4.5).", "B1 triangle: area 18, centre (14, 7).", "M1 126x̄ = 144(8) − 18(14).", "A1 x̄ = 900/126 = 50/7."],
        modelAnswer: t`Rectangle: area $16 \times 9 = 144$, centre $(8, 4.5)$. Triangle: area $\frac{1}{2}(6)(6) = 18$, centre $\left(\frac{10 + 16 + 16}{3}, \frac{9 + 9 + 3}{3}\right) = (14, 7)$. Remaining area $126$.
$$
126\bar{x} = 144(8) - 18(14) = 1152 - 252 = 900
$$
$$
\bar{x} = \frac{900}{126} = \frac{50}{7} \text{ cm}
$$`,
        explanation: "Subtract the removed triangle's area and moment." }),
      P.num({ label: "(b)", marks: 2, stem: "Find the distance of the centre of mass from OA, correct to 3 significant figures.", value: yb18, unit: "cm", wrong: [f3((144 * 4.5 + 18 * 7) / 162)],
        explanation: t`$126\bar{y} = 144(4.5) - 18(7) = 648 - 126 = 522$, so $\bar{y} = \frac{29}{7} = ${f3(yb18)}$ cm.` }),
      P.num({ label: "(c)", marks: 3, stem: "The lamina hangs freely from O. Find the angle between OA and the vertical, in degrees correct to 1 decimal place.", value: a18c, unit: "°", wrong: [fd(top18, 1)],
        explanation: t`$OG$ is vertical; $\tan^{-1}\frac{29/7}{50/7} = \tan^{-1}\frac{29}{50} = ${fd(a18c, 1)}°$.` }),
      P.fib({ label: "(d)", marks: 4, stem: "The lamina stands in a vertical plane with OA on a line of greatest slope of a rough inclined plane, O being the lower end. The coefficient of friction is 0.9 and the angle of the plane is slowly increased. Find the angle at which it would slide and the angle at which it would topple (degrees, 1 d.p.), and say which happens first.",
        template: "slides at {{blank:s}}°, topples at {{blank:t}}°; first it {{blank:f}}",
        blanks: [NBd("s", sl18, 1, fd(deg(atan(1 / 0.9)), 1), 1), NBd("t", top18, 1, fd(a18c, 1), 2), CB("f", ["slides", "topples"], "slides", 1)],
        explanation: t`Slide: $\tan\theta = 0.9$, $\theta = ${fd(sl18, 1)}°$. Topple about $O$: $G$ is $\frac{50}{7}$ up the slope and $\frac{29}{7}$ from it, so it is above $O$ when $\tan\theta = \frac{50}{29}$, $\theta = ${fd(top18, 1)}°$. Sliding happens first.` }),
    ],
    explanation: "A composite lamina question builds from the centre of mass to suspension and to sliding versus toppling.",
    hints: ["Treat the triangle as negative area.", "For toppling about O, compare the distances of G along and perpendicular to the slope."],
  });

  // ---------------------------------------------------------------- cards
  b.card("DEFINITION", "Centre of mass", "The point at which the whole mass of a body can be taken to be concentrated; in a uniform gravitational field it coincides with the centre of gravity.");
  b.card("FORMULA", "Centre of mass of particles", t`$\bar{x} = \dfrac{\sum m x}{\sum m}$, $\bar{y} = \dfrac{\sum m y}{\sum m}$`);
  b.card("FACT", "Uniform triangular lamina", t`Two-thirds of the way along each median from the vertex: $\left(\frac{x_1 + x_2 + x_3}{3}, \frac{y_1 + y_2 + y_3}{3}\right)$.`);
  b.card("FACT", "Uniform rod, hoop, disc, rectangle, cylinder, sphere", "Midpoint of the rod; centre of the hoop or disc; intersection of the rectangle's diagonals; midpoint of the cylinder's axis; centre of the sphere (solid or hollow).");
  b.card("CONCEPT", "Lamina with a piece removed", "Whole = remainder + removed piece: subtract the removed area and its moment.");
  b.card("CONCEPT", "Body suspended freely from a point P", "It hangs with its centre of mass G vertically below P; the line PG is vertical.");
  b.card("FORMULA", "Sliding on a rough plane", t`Slides when $\tan\theta > \mu$.`);
  b.card("FORMULA", "Toppling of a block (width w down the slope, height h, G at the centre)", t`Topples about the lower edge when $\tan\theta > \dfrac{w}{h}$; the smaller critical angle happens first.`);
  b.card("CONCEPT", "Using symmetry for centres of mass", "The centre of mass of a uniform body lies on every line (or plane) of symmetry: state it to find one coordinate without calculation.");
});
