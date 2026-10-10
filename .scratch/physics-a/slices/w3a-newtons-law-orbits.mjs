// W3a: aphys.gravitation.newtons-law-orbits — F = Gm1m2/r², spheres as point masses, circular orbits, T² ∝ r³,
// mass of a planet from a moon's orbit, geostationary orbits.
import { concept, P, t, chk, DATA, sfStr, dpStr, sciTex, sciPlain, linFit, table } from "../lib.mjs";

const G = DATA.G;
const ME = 6.0e24, RE = 6.4e6;
const vOrb = (M, r) => Math.sqrt((G * M) / r);
const period = (M, r) => 2 * Math.PI * Math.sqrt(r ** 3 / (G * M));

concept("aphys.gravitation.newtons-law-orbits", { file: "gravitation/newtons-law-orbits", keyPrefix: "gravitation.newtons-law-orbits" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement of Newton's law of gravitation is correct?",
    options: [
      ["Two point masses attract with a force proportional to the product of their masses and inversely proportional to the square of their separation.", "Correct: F = Gm₁m₂/r²."],
      ["Two point masses attract with a force proportional to the sum of their masses and inversely proportional to the square of their separation.", "The force depends on the product of the masses, not their sum."],
      ["Two point masses attract with a force proportional to the product of their masses and inversely proportional to their separation.", "The force is inversely proportional to the square of the separation."],
      ["Two point masses attract with a force proportional to the product of their masses and to the square of their separation.", "The force decreases, not increases, with separation."],
    ],
    answer: "A",
    explanation: "F = Gm₁m₂/r²: product of masses, inverse square of the separation of the (point) masses.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "The masses of two small spheres are both doubled and the distance between their centres is also doubled. What happens to the gravitational force between them?",
    options: [
      ["It stays the same.", "Correct: ×4 from the masses, ÷4 from the distance."],
      ["It doubles.", "This uses r instead of r² in the denominator."],
      ["It becomes four times larger.", "This ignores the increase in separation."],
      ["It halves.", "The product of the masses rises by four, not two."],
    ],
    answer: "A",
    explanation: "F ∝ m₁m₂/r²: (2 × 2)/2² = 1, so the force is unchanged.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which combination of properties must a geostationary satellite have?",
    options: [
      ["period 24 hours, orbit above the Equator, moving west to east", "Correct: it must keep pace with the Earth's rotation above one point."],
      ["period 24 hours, orbit passing over both poles, moving west to east", "A polar orbit carries the satellite over different points as the Earth turns."],
      ["period 12 hours, orbit above the Equator, moving east to west", "It must match the Earth's 24-hour rotation in the same direction."],
      ["period 24 hours, orbit above the Equator, moving east to west", "Moving opposite to the Earth's spin, it would cross the sky twice a day."],
    ],
    answer: "A",
    explanation: "Geostationary: 24-hour period, equatorial orbit, west to east (same sense as the Earth's rotation).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A satellite is moved from a low circular orbit to a higher circular orbit around the Earth. Which statement is correct?",
    options: [
      ["Its orbital speed decreases and its period increases.", "Correct: v = √(GM/r) falls and T ∝ r^(3/2) rises."],
      ["Its orbital speed increases and its period increases.", "A larger orbit needs a smaller centripetal acceleration, so the speed is lower."],
      ["Its orbital speed decreases and its period decreases.", "The path is longer and the speed lower, so the period must increase."],
      ["Its orbital speed and its period are both unchanged.", "Both depend on the orbital radius."],
    ],
    answer: "A",
    explanation: "From GMm/r² = mv²/r, v = √(GM/r): larger r, smaller v. T² ∝ r³: larger r, longer T.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Moon P orbits a planet at four times the orbital radius of moon Q. What is the ratio (period of P)/(period of Q)?",
    options: [
      ["8", "Correct: T ∝ r^(3/2), and 4^(3/2) = 8."],
      ["4", "This assumes T ∝ r."],
      ["16", "This assumes T ∝ r²."],
      ["64", "This is the ratio of r³, which equals the ratio of T², not of T."],
    ],
    answer: "A",
    explanation: "T² ∝ r³, so T_P/T_Q = (r_P/r_Q)^(3/2) = 4^(3/2) = 8.",
    hints: ["Take the square root of the ratio of r³."],
  });
  {
    const r = RE + 5.0e5, v = vOrb(ME, r);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`The Earth has mass $6.0 \times 10^{24}\ \text{kg}$ and radius $6.4 \times 10^{6}\ \text{m}$. What is the speed of a satellite in a circular orbit $500\ \text{km}$ above the surface?`,
      options: [
        [t`$${sciTex(v)}\ \text{m s}^{-1}$`, "Correct: v = √(GM/r) with r = 6.9 × 10⁶ m."],
        [t`$${sciTex(vOrb(ME, 5.0e5))}\ \text{m s}^{-1}$`, "This uses the height (500 km) as the orbital radius."],
        [t`$${sciTex(vOrb(ME, RE))}\ \text{m s}^{-1}$`, "This is the speed for an orbit at the Earth's surface."],
        [t`$${sciTex((G * ME) / r)}\ \text{m s}^{-1}$`, "This is v², not v: the square root has been missed."],
      ],
      answer: "A",
      explanation: t`$r = 6.4 \times 10^{6} + 5.0 \times 10^{5} = 6.9 \times 10^{6}\ \text{m}$; $v = \sqrt{GM/r} = ${sciTex(v)}\ \text{m s}^{-1}$.`,
      hints: ["Add the height to the Earth's radius."],
    });
  }
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "The moons of a planet move in circular orbits. Which graph of their data gives a straight line through the origin with gradient 4π²/GM, where M is the planet's mass?",
    options: [
      ["(period)² against (orbital radius)³", "Correct: T² = (4π²/GM) r³."],
      ["(orbital radius)³ against (period)²", "This gives a straight line of gradient GM/4π², the reciprocal."],
      ["period against orbital radius", "T ∝ r^(3/2), so this graph is curved."],
      ["(orbital speed)² against orbital radius", "v² = GM/r, so this is a curve, not a straight line through the origin."],
    ],
    answer: "A",
    explanation: "T² = (4π²/GM)r³: plotting T² (y) against r³ (x) gives a line through the origin with gradient 4π²/GM.",
    hints: ["Rearrange T² = (4π²/GM) r³ into the form y = mx."],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Two satellites of masses 500 kg and 2000 kg move in the same circular orbit around the Earth. How do their orbital speeds compare?",
    options: [
      ["The speeds are equal.", "Correct: the satellite's mass cancels in GMm/r² = mv²/r."],
      ["The 2000 kg satellite is twice as fast.", "The larger gravitational force is exactly matched by the larger mass needing more centripetal force."],
      ["The 500 kg satellite is twice as fast.", "Speed in a given orbit does not depend on the satellite's mass."],
      ["The 2000 kg satellite is four times as fast.", "Neither speed depends on the satellite's mass."],
    ],
    answer: "A",
    explanation: "GMm/r² = mv²/r gives v = √(GM/r): independent of m.",
  });
  // Numerical
  {
    const m1 = 160, m2 = 0.75, r = 0.21;
    const F = (G * m1 * m2) / (r * r);
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: t`In a laboratory version of Cavendish's experiment, a $160\ \text{kg}$ lead sphere and a $0.75\ \text{kg}$ lead sphere have their centres $0.21\ \text{m}$ apart. Calculate the gravitational force between them, in N, to two significant figures.`,
      value: F, sf: 2, unit: "N", wrong: [(G * m1 * m2) / r],
      explanation: t`$F = \dfrac{Gm_1m_2}{r^2} = \dfrac{6.67 \times 10^{-11} \times 160 \times 0.75}{0.21^2} = ${sciTex(F, 2)}\ \text{N}$. The force is tiny, which is why the experiment needs a sensitive torsion balance. Forgetting to square $r$ gives $${sciTex((G * m1 * m2) / r, 2)}\ \text{N}$.`,
    });
  }
  {
    const GM = 3.99e14, R = 6.38e6, h = 8.0e5;
    const r = R + h, T = 2 * Math.PI * Math.sqrt(r ** 3 / GM);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A weather satellite moves in a circular orbit $800\ \text{km}$ above the Earth's surface. For the Earth, the product $GM = 3.99 \times 10^{14}\ \text{N m}^2\,\text{kg}^{-1}$ and the radius is $6.38 \times 10^{6}\ \text{m}$. Calculate the period of the orbit, in minutes, to three significant figures.`,
      value: T / 60, unit: "min", wrong: [T, (2 * Math.PI * Math.sqrt(h ** 3 / GM)) / 60],
      explanation: t`1. $r = 6.38 \times 10^{6} + 8.0 \times 10^{5} = ${sciTex(r)}\ \text{m}$.
2. $T = 2\pi\sqrt{\dfrac{r^3}{GM}} = 2\pi\sqrt{\dfrac{(${sciTex(r)})^3}{3.99 \times 10^{14}}} = ${sfStr(T, 3)}\ \text{s}$.
3. $T = ${sfStr(T, 3)}/60 = ${sfStr(T / 60, 3)}\ \text{min}$.`,
      hints: ["T² = 4π²r³/GM.", "Convert seconds to minutes at the end."],
    });
  }
  {
    const r = 1.22e9, Td = 15.95, T = Td * 86400;
    const M = (4 * Math.PI ** 2 * r ** 3) / (G * T * T);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Saturn's largest moon moves in a nearly circular orbit of radius $1.22 \times 10^{9}\ \text{m}$ with a period of $15.95$ days. Calculate the mass of Saturn, in kg, to three significant figures.`,
      value: M, unit: "kg", wrong: [(4 * Math.PI ** 2 * r ** 3) / (G * Td * Td), (4 * Math.PI ** 2 * r ** 2) / (G * T * T)],
      explanation: t`1. $T = 15.95 \times 86\,400 = ${sciTex(T)}\ \text{s}$.
2. Gravity provides the centripetal force: $\dfrac{GMm}{r^2} = mr\left(\dfrac{2\pi}{T}\right)^2$, so $M = \dfrac{4\pi^2r^3}{GT^2}$.
3. $M = \dfrac{4\pi^2 \times (1.22 \times 10^{9})^3}{6.67 \times 10^{-11} \times (${sciTex(T)})^2} = ${sciTex(M)}\ \text{kg}$.
4. Leaving $T$ in days gives an answer about $10^{10}$ times too large.`,
      hints: ["Convert days to seconds.", "M = 4π²r³/GT²."],
    });
  }
  {
    const M = 6.42e23, T = 24.6 * 3600;
    const r = Math.cbrt((G * M * T * T) / (4 * Math.PI ** 2));
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`Mars has mass $6.42 \times 10^{23}\ \text{kg}$ and rotates once every $24.6$ hours. A communications satellite is to stay above one point on the Martian equator. Calculate the radius of its orbit, in m, to three significant figures.`,
      value: r, unit: "m", wrong: [Math.sqrt((G * M * T * T) / (4 * Math.PI ** 2)), Math.cbrt((G * M * 24.6 * 24.6) / (4 * Math.PI ** 2))],
      explanation: t`1. The period must equal the rotation period: $T = 24.6 \times 3600 = ${sciTex(T)}\ \text{s}$.
2. $r^3 = \dfrac{GMT^2}{4\pi^2} = \dfrac{6.67 \times 10^{-11} \times 6.42 \times 10^{23} \times (${sciTex(T)})^2}{4\pi^2}$.
3. $r = ${sciTex(r)}\ \text{m}$ (take the cube root, not the square root).`,
      hints: ["The period equals one Martian day.", "Cube root."],
    });
  }
  {
    const TA = 1.8, rA = 4.2e8, rB = 6.7e8;
    const TB = TA * (rB / rA) ** 1.5;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Two moons orbit the same planet. Moon A has orbital radius $4.2 \times 10^{8}\ \text{m}$ and period $1.8$ days. Moon B has orbital radius $6.7 \times 10^{8}\ \text{m}$. Calculate the period of moon B, in days, to two significant figures.`,
      value: TB, sf: 2, unit: "days", wrong: [TA * (rB / rA), TA * (rB / rA) ** 3],
      explanation: t`$T^2 \propto r^3$, so $T_B = T_A\left(\dfrac{r_B}{r_A}\right)^{3/2} = 1.8 \times \left(\dfrac{6.7}{4.2}\right)^{1.5} = ${sfStr(TB, 2)}\ \text{days}$. No conversion is needed because only a ratio is used.`,
      hints: ["Use the ratio form of T² ∝ r³."],
    });
  }
  // Uncertainty
  {
    const pr = 1.0, pT = 0.5;
    const pM = 3 * pr + 2 * pT;
    chk(pM, 4.0);
    b.num({
      d: 3, skill: "EVALUATION", calculator: true,
      stem: t`A planet's mass is calculated from a moon's orbit using $M = \dfrac{4\pi^2r^3}{GT^2}$. The orbital radius is known to $\pm 1.0\%$ and the period to $\pm 0.5\%$. Calculate the percentage uncertainty in $M$, to two significant figures.`,
      value: pM, sf: 2, unit: "%", wrong: [pr + pT, 3 * pr - 2 * pT],
      explanation: t`Percentage uncertainties are multiplied by the powers and added (even for a quotient): $3 \times 1.0\% + 2 \times 0.5\% = ${sfStr(pM, 2)}\%$. Subtracting the term for $T$ because it is in the denominator is a common error.`,
      hints: ["r is cubed and T is squared."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The gravitational force that the Earth exerts on the Moon is larger than the force the Moon exerts on the Earth, because the Earth is more massive.",
    answer: false,
    explanation: "False. The two forces form a Newton's third law pair: equal in size and opposite in direction. The Moon accelerates more because its mass is smaller.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each feature with the type of orbit it describes best.",
    pairs: [
      ["receiving dishes can stay fixed in one direction", "geostationary orbit"],
      ["detailed photographs of the ground and short signal delay", "low orbit"],
      ["passes over every part of the Earth as the planet turns beneath it", "polar orbit"],
      ["period equals one sidereal day but the orbit is tilted to the Equator", "geosynchronous (not geostationary) orbit"],
    ],
    explanation: "Geostationary: fixed in the sky. Low orbit: close, so high resolution and little delay. Polar: covers the whole surface over many orbits. A tilted 24-hour orbit is geosynchronous but drifts north and south, so it is not geostationary.",
    hints: ["Geostationary orbits must be above the Equator."],
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements about circular orbits.",
    template: "For a satellite in a circular orbit, the {{blank:a}} force provides the centripetal force. The square of the period is proportional to the {{blank:b}} of the orbital radius. The orbital speed {{blank:c}} as the radius increases.",
    blanks: [
      { id: "a", accepted: ["gravitational"], choices: ["gravitational", "frictional", "electric"] },
      { id: "b", accepted: ["cube"], choices: ["cube", "square", "square root"] },
      { id: "c", accepted: ["decreases"], choices: ["decreases", "increases", "stays the same"] },
    ],
    explanation: "GMm/r² = mv²/r; T² = (4π²/GM)r³; v = √(GM/r) decreases with r.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: t`A satellite of mass $m$ moves in a circular orbit of radius $r$ around a planet of mass $M$. Show that the period $T$ is given by $T^2 = \dfrac{4\pi^2}{GM}r^3$.`,
    points: [
      "The gravitational force provides the centripetal force (it is the only force acting).",
      t`$\dfrac{GMm}{r^2} = \dfrac{mv^2}{r}$ (or $= mr\omega^2$).`,
      t`$v = \dfrac{2\pi r}{T}$ (or $\omega = 2\pi/T$) substituted.`,
      t`Rearranged correctly to $T^2 = \dfrac{4\pi^2r^3}{GM}$ (the satellite's mass cancels).`,
    ],
    modelAnswer: "Gravity provides the centripetal force: GMm/r² = mv²/r. The speed is v = 2πr/T, so GM/r = 4π²r²/T². Rearranging, T² = (4π²/GM) r³; m has cancelled.",
    explanation: "Equate the forces, substitute v = 2πr/T, rearrange.",
    hints: ["Which force keeps the satellite moving in a circle?"],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why all geostationary satellites orbit at the same height, and compare their usefulness with that of satellites in low orbits.",
    points: [
      "A geostationary satellite must have a period of 24 hours (equal to the Earth's rotation period).",
      "Since T² ∝ r³ (for the Earth's mass), a fixed period fixes the radius, so the height is the same for all (about 36 000 km).",
      "Geostationary: fixed receiving dishes, continuous coverage of a wide area (communications, television, weather).",
      "Low orbit: closer, so more detailed images and shorter signal delay, but each satellite is visible only briefly (tracking or many satellites needed).",
    ],
    modelAnswer: "A geostationary satellite must orbit with the Earth's rotation period of 24 hours. Because T² is proportional to r³ for orbits around the Earth, this period corresponds to only one radius, about 4.2 × 10⁷ m, so they are all at the same height. They allow fixed dishes and continuous coverage of a hemisphere, which suits television, communications and weather monitoring. Low-orbit satellites are much closer, so they give detailed images and shorter delays, but they cross the sky in minutes, so they must be tracked or used in large numbers.",
    explanation: "Fixed period → fixed radius via T² ∝ r³; compare coverage, delay and detail.",
    hints: ["What fixes the period, and how is the period linked to the radius?"],
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 2,
    stem: "State Newton's law of gravitation, and explain why it can be applied to the Earth and the Moon although they are not point masses.",
    points: [
      "Two point masses attract with a force proportional to the product of the masses and inversely proportional to the square of their separation.",
      "A uniform sphere (approximately the Earth or Moon) acts as a point mass at its centre for points outside it, so r is the distance between centres.",
    ],
    modelAnswer: "Any two point masses attract each other with a force proportional to the product of their masses and inversely proportional to the square of their separation. The Earth and Moon are nearly uniform spheres, and a uniform sphere behaves as if its mass were concentrated at its centre, so the law applies with r measured between the centres.",
    explanation: "Statement plus the point-mass property of spheres.",
  });
  // Practice structured: moons of a planet
  {
    const M = 5.68e26;
    const rs = [1.86e8, 2.38e8, 2.95e8, 3.77e8, 5.27e8];
    const scatter = [0.004, -0.003, 0.002, -0.004, 0.003];
    const Ts = rs.map((r, i) => Number(((period(M, r) / 86400) * (1 + scatter[i])).toFixed(3)));
    const X = rs.map((r) => (r / 1e8) ** 3);
    const Y = Ts.map((d) => d * d);
    const fit = linFit(X, Y);
    // gradient in day^2 per (1e8 m)^3 -> SI: s^2 m^-3
    const gradSI = (fit.m * 86400 ** 2) / 1e24;
    const Mfit = (4 * Math.PI ** 2) / (G * gradSI);
    const row = 2;
    const tab = table(["Moon", t`$r\,/\,10^{8}\ \text{m}$`, t`$T\,/\,\text{days}$`], rs.map((r, i) => [String.fromCharCode(65 + i), dpStr(r / 1e8, 2), Ts[i].toFixed(3)]));
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`The table gives the orbital radius $r$ and period $T$ of five moons of a giant planet. The orbits are circular.

${tab}`,
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: "State the graph you would plot to test whether T² ∝ r³, and what it would look like if the relationship holds.", points: ["Plot T² against r³ (or lg T against lg r).", "A straight line through the origin (or, for lg-lg, a straight line of gradient 1.5)."], modelAnswer: "Plot T² on the y-axis against r³ on the x-axis. If T² ∝ r³ the points lie on a straight line through the origin. (Alternatively, lg T against lg r gives a straight line of gradient 1.5.)" }),
        P.group({ label: "(b)", stem: t`For moon ${String.fromCharCode(65 + row)}, calculate:`, parts: [
          P.num({ label: "(i)", marks: 1, stem: t`$T^2$, in $\text{days}^2$, to three significant figures`, value: Y[row], wrong: [2 * Ts[row]], explanation: t`$${Ts[row].toFixed(3)}^2 = ${sfStr(Y[row], 3)}\ \text{days}^2$.` }),
          P.num({ label: "(ii)", marks: 1, stem: t`$r^3$, in units of $10^{24}\ \text{m}^3$, to three significant figures`, value: X[row], wrong: [3 * (rs[row] / 1e8)], explanation: t`$${dpStr(rs[row] / 1e8, 2)}^3 = ${sfStr(X[row], 3)}$, i.e. $${sfStr(X[row], 3)} \times 10^{24}\ \text{m}^3$.` }),
        ] }),
        P.num({ label: "(c)", marks: 3, stem: t`The gradient of the graph of $T^2$ (in $\text{days}^2$) against $r^3$ (in $10^{24}\ \text{m}^3$) is found from the best-fit line. Determine this gradient, to three significant figures.`, value: fit.m, tol: 0.01, wrong: [1 / fit.m], explanation: t`Using two points far apart on the best-fit line (close to the first and last data points): gradient $\approx \dfrac{${sfStr(Y[4], 3)} - ${sfStr(Y[0], 3)}}{${sfStr(X[4], 3)} - ${sfStr(X[0], 3)}} = ${sfStr(fit.m, 3)}\ \text{days}^2$ per $10^{24}\ \text{m}^3$.` }),
        P.num({ label: "(d)", marks: 2, stem: t`Convert the gradient to SI units ($\text{s}^2\,\text{m}^{-3}$), to three significant figures.`, value: gradSI, tol: gradSI * 0.06, answer: sciPlain(gradSI), wrong: [fit.m * 86400 / 1e24], explanation: t`Multiply by $86\,400^2$ (days² to s²) and divide by $10^{24}$: $${sfStr(fit.m, 3)} \times \dfrac{86\,400^2}{10^{24}} = ${sciTex(gradSI)}\ \text{s}^2\,\text{m}^{-3}$.` }),
        P.num({ label: "(e)", marks: 2, stem: t`The gradient equals $4\pi^2/GM$. Calculate the mass of the planet, in kg, to three significant figures.`, value: Mfit, tol: Mfit * 0.07, unit: "kg", answer: sciPlain(Mfit), wrong: [(G * gradSI) / (4 * Math.PI ** 2)], explanation: t`$M = \dfrac{4\pi^2}{G \times \text{gradient}} = \dfrac{4\pi^2}{6.67 \times 10^{-11} \times ${sciTex(gradSI)}} = ${sciTex(Mfit)}\ \text{kg}$.` }),
        P.manual({ label: "(f)", marks: 2, stem: "Explain why the masses of the moons cannot be found from these data.", points: ["The moon's mass m appears on both sides of GMm/r² = mr(2π/T)² and cancels.", "So T and r depend only on the planet's mass M (any moon at that radius has that period)."], modelAnswer: "In GMm/r² = mr(2π/T)² the moon's mass m cancels, so the period at a given radius depends only on the planet's mass; the orbital data contain no information about m." }),
      ],
      explanation: "T² = (4π²/GM)r³: the gradient of T² against r³ gives M = 4π²/(G × gradient) once converted to SI units.",
      hints: ["Square each period and cube each radius.", "1 day = 86 400 s."],
    });
  }
  {
    const MP = 5.98e24, RP = 6.37e6, T = 86160;
    const r = Math.cbrt((G * MP * T * T) / (4 * Math.PI ** 2));
    const v = (2 * Math.PI * r) / T;
    const tDelay = (2 * (r - RP)) / DATA.c;
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A company plans a television satellite to serve southern Africa from a geostationary orbit. The Earth has mass $5.98 \times 10^{24}\ \text{kg}$ and radius $6.37 \times 10^{6}\ \text{m}$; its rotation period (one sidereal day) is $86\,160\ \text{s}$.`,
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: "State two conditions, other than its period, that the orbit must satisfy.", points: ["It must be in the plane of the Equator (directly above the Equator).", "The satellite must move from west to east (the same direction as the Earth's rotation)."], modelAnswer: "The orbit must lie above the Equator, and the satellite must travel from west to east, in the same direction as the Earth rotates." }),
        P.num({ label: "(b)", marks: 3, stem: "Calculate the orbital radius, in m, to three significant figures.", value: r, unit: "m", wrong: [Math.sqrt((G * MP * T * T) / (4 * Math.PI ** 2))], explanation: t`$r^3 = \dfrac{GMT^2}{4\pi^2} = \dfrac{6.67 \times 10^{-11} \times 5.98 \times 10^{24} \times 86\,160^2}{4\pi^2}$, so $r = ${sciTex(r)}\ \text{m}$.` }),
        P.num({ label: "(c)", marks: 1, stem: t`Calculate the orbital speed, in $\text{km s}^{-1}$, to two significant figures.`, value: v / 1000, sf: 2, unit: "km/s", wrong: [(2 * Math.PI * (r - RP)) / T / 1000], explanation: t`$v = 2\pi r/T = ${sfStr(v, 4)}\ \text{m s}^{-1} \approx ${sfStr(v / 1000, 2)}\ \text{km s}^{-1}$.` }),
        P.num({ label: "(d)", marks: 2, stem: "A signal travels from a transmitter on the Equator directly below the satellite up to the satellite and back down. Calculate the time taken, in s, to two significant figures.", value: tDelay, sf: 2, unit: "s", wrong: [(2 * r) / DATA.c], explanation: t`Distance $= 2(r - R) = 2 \times ${sciTex(r - RP)}\ \text{m}$; $t = \dfrac{${sciTex(2 * (r - RP))}}{3.00 \times 10^{8}} = ${sfStr(tDelay, 2)}\ \text{s}$. Using $r$ instead of the height gives too long a time.` }),
      ],
      explanation: "Geostationary: equatorial, west to east, T = 24 h; r from T² = 4π²r³/GM; delay from the height.",
      hints: ["The signal travels the height above the surface, not r.", "Cube root."],
    });
  }

  b.card("DEFINITION", "**Newton's law of gravitation**", "Two point masses attract with a force proportional to the product of their masses and inversely proportional to the square of their separation.");
  b.card("FORMULA", "Gravitational force", t`$F = \dfrac{Gm_1m_2}{r^2}$, $r$ between centres`);
  b.card("CONCEPT", "Spheres as point masses", "For outside points, a uniform sphere acts as if all its mass were at its centre.");
  b.card("FORMULA", "Orbital speed", t`$\dfrac{GMm}{r^2} = \dfrac{mv^2}{r} \Rightarrow v = \sqrt{\dfrac{GM}{r}}$`);
  b.card("FORMULA", "Period and radius", t`$T^2 = \dfrac{4\pi^2}{GM}r^3$, so $T^2 \propto r^3$`);
  b.card("FORMULA", "Mass from a moon's orbit", t`$M = \dfrac{4\pi^2r^3}{GT^2}$ (the moon's mass cancels)`);
  b.card("DEFINITION", "**Geostationary orbit**", "Equatorial orbit, west to east, period 24 hours: the satellite stays above one point on the Equator.");
  b.card("FACT", "Geostationary radius", t`About $4.2 \times 10^{7}\ \text{m}$ from the Earth's centre (about $36\,000\ \text{km}$ up)`);
  b.card("CONCEPT", "Geostationary versus low orbit", "Geostationary: fixed dishes, wide continuous coverage, long delay. Low: detailed images, short delay, needs tracking or many satellites.");
});
