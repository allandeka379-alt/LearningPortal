// W2a: amath.circular.compound-shapes (Cambridge only)
import { concept, P, t, chk, sfStr } from "../lib.mjs";

const seg = (r, th) => 0.5 * r * r * (th - Math.sin(th));
const chord = (r, th) => 2 * r * Math.sin(th / 2);

concept("amath.circular.compound-shapes", { file: "circular/compound-shapes", keyPrefix: "circular.compound-shapes" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`A chord $AB$ subtends an angle $\theta$ radians at the centre $O$ of a circle of radius $r$. Which expression gives the area of the minor segment?`,
    options: [
      [t`$\frac{1}{2}r^2(\theta - \sin\theta)$`, t`Correct: sector $\frac{1}{2}r^2\theta$ minus triangle $\frac{1}{2}r^2\sin\theta$.`],
      [t`$\frac{1}{2}r^2(\sin\theta - \theta)$`, t`This is negative for $0 < \theta < \pi$: the subtraction is the wrong way round.`],
      [t`$\frac{1}{2}r^2(\theta - \cos\theta)$`, t`The triangle's area uses $\sin\theta$, from $\frac{1}{2}ab\sin C$.`],
      [t`$r^2(\theta - \sin\theta)$`, t`Both the sector and the triangle carry a factor $\frac{1}{2}$.`],
    ],
    answer: "A",
    explanation: t`Segment = sector $-$ triangle $= \frac{1}{2}r^2\theta - \frac{1}{2}r^2\sin\theta = \frac{1}{2}r^2(\theta - \sin\theta)$, with $\theta$ in radians.`,
  });

  const c2 = chord(8, 1);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: t`A chord subtends an angle of 1 radian at the centre of a circle of radius 8 cm. Find the length of the chord, correct to 3 significant figures.`,
    value: c2, unit: "cm", wrong: [sfStr(2 * 8 * Math.sin(1)), sfStr(2 * 8 * Math.sin((0.5 * Math.PI) / 180))],
    explanation: t`Chord $= 2r\sin\frac{\theta}{2} = 16\sin 0.5 = ${sfStr(c2)}$ cm (3 s.f.). Using $\sin 1$ instead of $\sin 0.5$ gives $13.5$; degree mode gives $0.140$.`,
  });

  const tri3 = 0.5 * 81 * Math.sin(0.7);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: t`A sector $OAB$ has radius 9 cm and angle 0.7 radians. Find the area of triangle $OAB$, correct to 3 significant figures.`,
    value: tri3, unit: "cm²", wrong: [28.35, sfStr(81 * Math.sin(0.7))],
    explanation: t`Area $= \frac{1}{2}ab\sin C = \frac{1}{2} \times 9 \times 9 \times \sin 0.7 = ${sfStr(tri3)}$ cm$^2$ (3 s.f.). The value 28.35 is the sector area $\frac{1}{2}r^2\theta$.`,
  });

  const s4 = seg(12, 1.1);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A chord of a circle of radius 12 cm subtends 1.1 radians at the centre. Find the area of the minor segment, correct to 3 significant figures.`,
    value: s4, unit: "cm²", wrong: [79.2, sfStr(0.5 * 144 * (1.1 - Math.sin((1.1 * Math.PI) / 180)))],
    explanation: t`$\frac{1}{2}(144)(1.1 - \sin 1.1) = 72(1.1 - 0.8912) = ${sfStr(s4)}$ cm$^2$ (3 s.f.). 79.2 is the sector alone; a calculator in degree mode gives about 77.8.`,
    hints: ["Segment = sector − triangle.", "Use radian mode."],
  });

  const p5 = 4 * 2 + chord(4, 2);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A minor segment is cut from a circle of radius 4 cm by a chord that subtends 2 radians at the centre. Find the perimeter of the segment, correct to 3 significant figures.`,
    value: p5, unit: "cm", wrong: [16, sfStr(8 + 8 * Math.sin(2))],
    explanation: t`Arc $= 4 \times 2 = 8$ cm; chord $= 2 \times 4 \times \sin 1 = 6.731$ cm. Perimeter $= 8 + 6.731 = ${sfStr(p5)}$ cm (3 s.f.). The value 16 adds two radii instead of the chord.`,
    hints: ["The boundary of a segment is the arc and the chord."],
  });

  chk(seg(4, Math.PI / 2), 4 * Math.PI - 8);
  b.expr({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the exact area of the minor segment of a circle of radius 4 cm cut off by a chord that subtends a right angle at the centre. Type pi or π, e.g. 2π-3.`,
    accepted: ["4π-8", "4pi-8", "-8+4π", "-8+4pi", "4(π-2)", "4(pi-2)"],
    wrong: ["4π", "8π-8"],
    explanation: t`Sector: $\frac{1}{2}(16)\left(\frac{\pi}{2}\right) = 4\pi$. Triangle: $\frac{1}{2}(4)(4) = 8$. Segment $= 4\pi - 8$ cm$^2$.`,
    hints: [t`A right angle is $\frac{\pi}{2}$ radians, and the triangle is right-angled.`],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "The perimeter of a minor segment equals its arc length plus two radii.",
    answer: false,
    explanation: "False. A segment is bounded by the arc and the chord. Arc plus two radii is the perimeter of the sector.",
  });

  chk(chord(10, (2 * Math.PI) / 3), 10 * Math.sqrt(3));
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`A chord subtends an angle of $\frac{2\pi}{3}$ at the centre of a circle of radius 10 cm. Find the exact length of the chord.`,
    options: [
      [t`$10\sqrt{3}$ cm`, t`Correct: $2 \times 10 \times \sin\frac{\pi}{3} = 20 \times \frac{\sqrt{3}}{2}$.`],
      [t`$5\sqrt{3}$ cm`, t`This is half the chord, $r\sin\frac{\theta}{2}$.`],
      [t`$10$ cm`, t`A chord equal to the radius subtends $\frac{\pi}{3}$, not $\frac{2\pi}{3}$.`],
      [t`$20$ cm`, t`That is the diameter, subtending $\pi$.`],
    ],
    answer: "A",
    explanation: t`Chord $= 2r\sin\frac{\theta}{2} = 20\sin\frac{\pi}{3} = 10\sqrt{3}$ cm.`,
    hints: [t`$\sin\frac{\pi}{3} = \frac{\sqrt{3}}{2}$.`],
  });

  const th9 = Math.acos((25 + 25 - 49) / 50);
  chk(Math.cos(th9), 0.02);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`In triangle $OAB$, $OA = OB = 5$ cm and $AB = 7$ cm. Find angle $AOB$ in radians, correct to 3 significant figures.`,
    value: th9, unit: "rad", wrong: [sfStr((th9 * 180) / Math.PI)],
    explanation: t`Cosine rule: $\cos(\angle AOB) = \dfrac{25 + 25 - 49}{2 \times 5 \times 5} = 0.02$, so $\angle AOB = ${sfStr(th9)}$ radians (3 s.f.). The value 88.9 is the same angle in degrees.`,
    hints: [t`$\cos O = \dfrac{OA^2 + OB^2 - AB^2}{2 \times OA \times OB}$.`, "Set the calculator to radians."],
  });

  {
    const area = 36 - 9 * Math.PI;
    chk(36 - 0.25 * Math.PI * 36, area);
  }
  b.expr({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`$ABCD$ is a square of side 6 cm. An arc of a circle with centre $A$ and radius 6 cm joins $B$ to $D$. Find the exact area of the part of the square outside the sector $ABD$. Type pi or π.`,
    accepted: ["36-9π", "36-9pi", "-9π+36", "-9pi+36", "9(4-π)", "9(4-pi)"],
    wrong: ["36-36π", "9π"],
    explanation: t`The sector has angle $\frac{\pi}{2}$: area $\frac{1}{2}(36)\left(\frac{\pi}{2}\right) = 9\pi$. The region is the square minus the sector: $36 - 9\pi$ cm$^2$.`,
    hints: [t`The angle at $A$ is $\frac{\pi}{2}$.`],
  });

  b.match({
    d: 2, skill: "RECALL", calculator: false,
    stem: t`A circle has centre $O$ and radius $r$; the chord $AB$ subtends $\theta$ radians at $O$ (with $\theta < \pi$). Match each region with its area.`,
    pairs: [
      [t`minor sector $OAB$`, t`$\frac{1}{2}r^2\theta$`],
      [t`triangle $OAB$`, t`$\frac{1}{2}r^2\sin\theta$`],
      ["minor segment", t`$\frac{1}{2}r^2(\theta - \sin\theta)$`],
      ["major sector", t`$\frac{1}{2}r^2(2\pi - \theta)$`],
    ],
    explanation: t`The major sector has angle $2\pi - \theta$. The segment is the sector minus the triangle.`,
  });

  const per13 = 10 + 5 * (2 * Math.PI - 1.2);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A circle has radius 5 cm. Two radii make an angle of 1.2 radians, dividing the circle into a minor sector and a major sector. Find the perimeter of the major sector, correct to 3 significant figures.`,
    options: [
      [t`${sfStr(per13)} cm`, t`Correct: $10 + 5(2\pi - 1.2)$.`],
      [t`16.0 cm`, t`This is the minor sector: $10 + 5 \times 1.2$.`],
      [t`${sfStr(5 * (2 * Math.PI - 1.2))} cm`, "This is the major arc alone; add the two radii."],
      [t`${sfStr(10 + 10 * Math.PI)} cm`, t`This uses the whole circumference: the minor arc must be removed.`],
    ],
    answer: "A",
    explanation: t`Major arc $= 5(2\pi - 1.2) = ${sfStr(5 * (2 * Math.PI - 1.2))}$ cm. Perimeter $= 5 + 5 + ${sfStr(5 * (2 * Math.PI - 1.2))} = ${sfStr(per13)}$ cm (3 s.f.).`,
    hints: [t`The major sector's angle is $2\pi - 1.2$.`],
  });

  const maj = Math.PI * 36 - seg(6, 1);
  b.calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: t`A chord of a circle of radius 6 cm subtends 1 radian at the centre. Find the area of the major segment, correct to 3 significant figures.`,
    value: maj, unit: "cm²", wrong: [sfStr(0.5 * 36 * (2 * Math.PI - 1)), sfStr(seg(6, 1))],
    explanation: t`Minor segment $= \frac{1}{2}(36)(1 - \sin 1) = 2.853$ cm$^2$. Major segment $=$ circle $-$ minor segment $= 36\pi - 2.853 = ${sfStr(maj)}$ cm$^2$ (3 s.f.). The major sector alone is 95.1 cm$^2$.`,
    hints: ["Find the minor segment first.", "Subtract it from the area of the whole circle."],
  });

  {
    const th = Math.acos((25 + 25 - 81) / 50);
    chk(Math.cos(th), -0.62);
    b.proof({
      d: 4, skill: "ANALYSIS", calculator: true, marks: 2,
      stem: t`The points $A$ and $B$ lie on a circle with centre $O$ and radius 5 cm, and $AB = 9$ cm. Show that angle $AOB = ${sfStr(th, 4)}$ radians, correct to 4 significant figures.`,
      points: [t`M1 uses the cosine rule: $\cos(\angle AOB) = \frac{5^2 + 5^2 - 9^2}{2(5)(5)} = -0.62$ (or $\sin\frac{\theta}{2} = 0.9$).`, t`A1 obtains $\angle AOB = ${th.toFixed(5)}\ldots$, which rounds to the given value.`],
      modelAnswer: t`$$
\cos(\angle AOB) = \frac{25 + 25 - 81}{50} = -0.62
$$

$$
\angle AOB = \cos^{-1}(-0.62) = ${th.toFixed(5)}\ldots = ${sfStr(th, 4)} \text{ (4 s.f.)}
$$`,
      explanation: "A 'show that' to a given accuracy needs more figures than the given value.",
      hints: ["Use the cosine rule in triangle OAB."],
    });
  }

  {
    const r = 8, th = 0.8;
    const AC = r * Math.tan(th), OC = r / Math.cos(th), BC = OC - r;
    const per = AC + BC + r * th;
    const area = 0.5 * r * AC - 0.5 * r * r * th;
    chk(Math.hypot(r, AC), OC);
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
      stem: t`The sector $OAB$ has centre $O$, radius 8 cm and angle $AOB = ${th}$ radians. The tangent to the arc at $A$ meets the line $OB$ extended at $C$. The region $R$ is bounded by $AC$, $CB$ and the arc $AB$. Give answers correct to 3 significant figures.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: t`Find the length $AC$.`, value: AC, unit: "cm", wrong: [sfStr(r * Math.sin(th))], explanation: t`Angle $OAC = \frac{\pi}{2}$, so $AC = 8\tan ${th} = ${sfStr(AC)}$ cm.` }),
        P.num({ label: "(b)", marks: 2, stem: t`Find the length $BC$.`, value: BC, unit: "cm", wrong: [sfStr(OC)], explanation: t`$OC = \frac{8}{\cos ${th}} = ${sfStr(OC)}$ cm, so $BC = OC - 8 = ${sfStr(BC)}$ cm.` }),
        P.num({ label: "(c)", marks: 1, stem: t`Find the perimeter of $R$.`, value: per, unit: "cm", wrong: [sfStr(AC + BC)], explanation: t`$AC + BC + \text{arc } AB = ${sfStr(AC)} + ${sfStr(BC)} + ${r * th} = ${sfStr(per)}$ cm.` }),
        P.num({ label: "(d)", marks: 2, stem: t`Find the area of $R$.`, value: area, unit: "cm²", wrong: [sfStr(0.5 * r * AC)], explanation: t`Triangle $OAC$: $\frac{1}{2}(8)(${sfStr(AC)}) = ${sfStr(0.5 * r * AC)}$; sector: $\frac{1}{2}(64)(${th}) = ${0.5 * 64 * th}$. Area of $R = ${sfStr(area)}$ cm$^2$.` }),
      ],
      explanation: "The tangent at A is perpendicular to OA, so triangle OAC is right-angled at A; R is that triangle minus the sector.",
      hints: [t`Angle $OAC = 90^\circ$.`, "Area of R = triangle OAC − sector OAB.", "Keep full values of AC and OC."],
    });
  }

  {
    const s = 6;
    const tri = 0.25 * Math.sqrt(3) * s * s;
    chk(tri, 9 * Math.sqrt(3));
    const sg = seg(s, Math.PI / 3);
    chk(sg, 6 * Math.PI - 9 * Math.sqrt(3));
    chk(tri + 3 * sg, 18 * Math.PI - 18 * Math.sqrt(3));
    chk(3 * s * (Math.PI / 3), 6 * Math.PI);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
      stem: t`$ABC$ is an equilateral triangle of side 6 cm. Three arcs are drawn: arc $BC$ with centre $A$, arc $CA$ with centre $B$ and arc $AB$ with centre $C$, each of radius 6 cm. The shape $S$ is bounded by the three arcs.`,
      parts: [
        P.proof({ label: "(a)", marks: 1, stem: t`Explain why each arc subtends an angle of $\frac{\pi}{3}$ at its centre.`,
          points: [t`B1 states that each angle of an equilateral triangle is $60^\circ = \frac{\pi}{3}$ radians, and each arc joins the other two vertices.`],
          modelAnswer: t`Arc $BC$ has centre $A$ and ends $B$ and $C$, so it subtends angle $BAC$, which is $60^\circ = \frac{\pi}{3}$ in an equilateral triangle. The same holds for the other two arcs.`,
          explanation: "Equilateral triangles have three 60° angles." }),
        P.expr({ label: "(b)", marks: 1, stem: t`Find the exact length of one arc. Type pi or π.`, accepted: ["2π", "2pi", "2*π"], wrong: ["6π"], explanation: t`$6 \times \frac{\pi}{3} = 2\pi$ cm.` }),
        P.expr({ label: "(c)", marks: 1, stem: t`Find the exact perimeter of $S$. Type pi or π.`, accepted: ["6π", "6pi", "6*π"], wrong: ["18+6π"], explanation: t`Three arcs: $3 \times 2\pi = 6\pi$ cm. There are no straight edges on the boundary.` }),
        P.proof({ label: "(d)", marks: 3, stem: t`Show that the area of one of the segments between the triangle and an arc is $6\pi - 9\sqrt{3}$ cm$^2$.`,
          points: [t`M1 finds the sector area $\frac{1}{2}(36)\left(\frac{\pi}{3}\right) = 6\pi$.`, t`M1 finds the triangle area $\frac{1}{2}(6)(6)\sin\frac{\pi}{3} = 9\sqrt{3}$.`, t`A1 subtracts to reach $6\pi - 9\sqrt{3}$.`],
          modelAnswer: t`$$
\text{sector} = \frac{1}{2} \times 6^2 \times \frac{\pi}{3} = 6\pi
$$

$$
\text{triangle } ABC = \frac{1}{2} \times 6 \times 6 \times \sin\frac{\pi}{3} = 18 \times \frac{\sqrt{3}}{2} = 9\sqrt{3}
$$

$$
\text{segment} = 6\pi - 9\sqrt{3}
$$`,
          explanation: "Segment = sector − triangle; here the triangle is the equilateral triangle ABC itself." }),
        P.fib({ label: "(e)", marks: 3, stem: t`Hence find the exact area of $S$ in the form $a\pi + b\sqrt{3}$.`, template: "a = {{blank:a}}, b = {{blank:b}}",
          blanks: [{ id: "a", input: "number", accepted: [18], wrong: "6" }, { id: "b", input: "number", accepted: [-18], wrong: "-27" }],
          explanation: t`$S$ = triangle + three segments $= 9\sqrt{3} + 3(6\pi - 9\sqrt{3}) = 18\pi - 18\sqrt{3}$ cm$^2$.` }),
      ],
      explanation: "The shape is the equilateral triangle plus three equal segments; its boundary is three equal arcs.",
      hints: [t`Each angle of the triangle is $\frac{\pi}{3}$.`, "Area of S = triangle + 3 segments."],
    });
  }

  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true, calculator: false,
    stem: t`$AB$ is a chord of a circle with centre $O$ and radius $r$. Which gives the perimeter of the minor segment cut off by $AB$?`,
    options: [
      [t`arc $AB$ + chord $AB$`, "Correct: the segment is bounded by the arc and the chord only."],
      [t`arc $AB$ + $2r$`, "This is the perimeter of the sector OAB."],
      [t`chord $AB$ + $2r$`, "This is the perimeter of triangle OAB."],
      [t`arc + chord + $2r$`, "The radii are inside the sector, not on the segment's boundary."],
    ],
    answer: "A",
    explanation: "A segment lies between a chord and its arc, so its boundary is the arc plus the chord. The radii OA and OB are not part of it.",
  });

  b.card("FORMULA", "Area of a segment", t`$\frac{1}{2}r^2(\theta - \sin\theta)$, $\theta$ in radians (sector − triangle).`);
  b.card("FORMULA", "Length of a chord", t`$2r\sin\frac{\theta}{2}$`);
  b.card("FORMULA", "Area of triangle OAB in a sector", t`$\frac{1}{2}r^2\sin\theta$ (from $\frac{1}{2}ab\sin C$, in the List of formulas).`);
  b.card("CONCEPT", "Perimeter of a segment", "Arc + chord (not arc + two radii).");
  b.card("CONCEPT", "Major sector", t`Angle $2\pi - \theta$: area $\frac{1}{2}r^2(2\pi - \theta)$, arc $r(2\pi - \theta)$.`);
  b.card("CONCEPT", "Finding the angle at the centre", "Use right-angled trigonometry (half the isosceles triangle) or the cosine rule, in radians.");
  b.card("FACT", "Tangent in compound shapes", "A tangent is perpendicular to the radius at the point of contact: look for right-angled triangles.");
  b.card("CONCEPT", "Compound shapes", "Split into sectors, segments, triangles and rectangles; for the perimeter, follow only the outer boundary.");
  b.card("FACT", "Calculator mode", t`Segments and chords need $\sin\theta$ with $\theta$ in radians: use radian mode.`);
});
