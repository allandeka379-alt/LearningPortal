// W3a: aphys.gravitation.field-strength — field of force, g = F/m, field lines, g = GM/r², variation with r.
import { concept, P, t, chk, DATA, sfStr, dpStr, sciTex, sciPlain, gField, linFit, table, fracUnc } from "../lib.mjs";

const G = DATA.G;
const ME = 6.0e24, RE = 6.4e6;

concept("aphys.gravitation.field-strength", { file: "gravitation/field-strength", keyPrefix: "gravitation.field-strength" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement defines gravitational field strength at a point?",
    options: [
      ["the gravitational force per unit mass on a small test mass placed at the point", "Correct: g = F/m."],
      ["the gravitational force on any object placed at the point", "This is a force, not a force per unit mass; it depends on the object's mass."],
      ["the work done per unit mass in bringing a small mass from infinity to the point", "This defines gravitational potential, not field strength."],
      ["the acceleration of any object placed at the point, whatever forces act on it", "Only the gravitational force counts; other forces change the acceleration but not g."],
    ],
    answer: "A",
    explanation: "Gravitational field strength is force per unit mass, g = F/m, on a small test mass (one too small to disturb the field).",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: t`Which unit is equivalent to the unit of gravitational field strength, $\text{N kg}^{-1}$?`,
    options: [
      [t`$\text{m s}^{-2}$`, "Correct: N = kg m s⁻², so N kg⁻¹ = m s⁻²."],
      [t`$\text{kg m s}^{-2}$`, "This is the newton itself."],
      [t`$\text{J kg}^{-1}$`, "This is the unit of gravitational potential (m² s⁻²)."],
      [t`$\text{N m}^{2}\,\text{kg}^{-2}$`, "This is the unit of the gravitational constant G."],
    ],
    answer: "A",
    explanation: t`$1\ \text{N kg}^{-1} = 1\ (\text{kg m s}^{-2})\,\text{kg}^{-1} = 1\ \text{m s}^{-2}$, which is why $g$ is also the free-fall acceleration.`,
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A satellite is moved from a distance 2R to a distance 4R from the centre of a planet of radius R. By what factor does the gravitational field strength at the satellite change?",
    options: [
      ["It becomes one quarter of its value.", "Correct: g ∝ 1/r²; doubling r divides g by 4."],
      ["It becomes one half of its value.", "This assumes g ∝ 1/r rather than 1/r²."],
      ["It becomes one sixteenth of its value.", "This compares 4R with R, not with 2R."],
      ["It becomes one ninth of its value.", "This uses the change in height above the surface (R to 3R)."],
    ],
    answer: "A",
    explanation: "g₂/g₁ = (r₁/r₂)² = (2R/4R)² = 1/4.",
  });
  {
    const ratio = 2 / 2 ** 2;
    chk(ratio, 0.5);
    b.mcq({
      d: 2, skill: "APPLICATION",
      stem: "Planet X has twice the mass and twice the radius of the Earth. What is the gravitational field strength at its surface, as a fraction of that at the Earth's surface?",
      options: [
        ["0.5", "Correct: g ∝ M/R², so 2/2² = 0.5."],
        ["1", "This assumes the mass and radius effects cancel; R is squared."],
        ["2", "This ignores the larger radius."],
        ["0.25", "This ignores the larger mass."],
      ],
      answer: "A",
      explanation: "g = GM/R²: the mass doubles (×2) and R² quadruples (÷4), giving 2/4 = 0.5 of the Earth's value.",
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which description of the gravitational field lines in a laboratory on the Earth's surface is correct?",
    options: [
      ["parallel, vertical and equally spaced, pointing downwards", "Correct: over a small region the radial field is almost uniform."],
      ["radial, spreading out as they go downwards towards the floor", "Radial lines converge towards the centre; over a laboratory the convergence is negligible."],
      ["parallel and equally spaced, pointing upwards away from the Earth", "Gravitational field lines point towards the mass producing the field."],
      ["closer together near the ceiling than near the floor", "The field is very slightly stronger near the floor, and over a laboratory it is effectively uniform."],
    ],
    answer: "A",
    explanation: "Near the surface, over distances small compared with the Earth's radius, the field is uniform: parallel, equally spaced lines pointing towards the centre.",
  });
  {
    const gM = gField(7.35e22, 1.74e6);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`The Moon has mass $7.35 \times 10^{22}\ \text{kg}$ and radius $1.74 \times 10^{6}\ \text{m}$. What is the gravitational field strength at its surface?`,
      options: [
        [t`$${sfStr(gM, 3)}\ \text{N kg}^{-1}$`, "Correct: g = GM/R²."],
        [t`$${sciTex((G * 7.35e22) / 1.74e6)}\ \text{N kg}^{-1}$`, "This divides by R instead of R², which gives the magnitude of the potential, not the field."],
        [t`$${sfStr(gM * 2, 3)}\ \text{N kg}^{-1}$`, "This uses the Moon's radius as a diameter."],
        [t`$${sfStr(gM / 4, 3)}\ \text{N kg}^{-1}$`, "This uses the diameter as the distance from the centre."],
      ],
      answer: "A",
      explanation: t`$g = \dfrac{6.67 \times 10^{-11} \times 7.35 \times 10^{22}}{(1.74 \times 10^{6})^2} = ${sfStr(gM, 3)}\ \text{N kg}^{-1}$, about one sixth of the Earth's value.`,
      hints: ["Square the radius."],
    });
  }
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "For points outside a uniform spherical planet, which graph is a straight line through the origin?",
    options: [
      ["g against 1/r²", "Correct: g = GM × (1/r²), gradient GM."],
      ["g against r²", "g decreases as r increases, so this graph slopes downwards and is curved."],
      ["g against 1/r", "g ∝ 1/r², so this graph is curved."],
      ["g against r", "This is a decreasing curve, not a straight line."],
    ],
    answer: "A",
    explanation: "Comparing g = GM(1/r²) with y = mx: plotting g against 1/r² gives a straight line through the origin of gradient GM.",
    hints: ["Rewrite g = GM/r² in the form y = mx."],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "On the line joining the centres of the Earth and the Moon there is a point where the resultant gravitational field is zero. Where is it?",
    options: [
      ["much closer to the Moon than to the Earth", "Correct: the Moon's smaller mass needs a smaller distance to give an equal field."],
      ["exactly halfway between the two centres", "This would only be true for equal masses."],
      ["much closer to the Earth than to the Moon", "Near the Earth, the Earth's field is far stronger than the Moon's."],
      ["beyond the Moon, on the side away from the Earth", "There the two fields point the same way (towards the Earth and Moon), so they add."],
    ],
    answer: "A",
    explanation: "Between the bodies the fields are opposite. Equal magnitudes need GM_E/x² = GM_M/(d − x)²; with M_M ≈ M_E/81, the point is about 0.9d from the Earth.",
    hints: ["Which body's field is weaker at a given distance?"],
  });
  // Numerical
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: t`Mars has mass $6.42 \times 10^{23}\ \text{kg}$ and radius $3.39 \times 10^{6}\ \text{m}$. Calculate the gravitational field strength at its surface, in $\text{N kg}^{-1}$, to three significant figures.`,
    value: gField(6.42e23, 3.39e6), unit: "N/kg", wrong: [G * 6.42e23 / 3.39e6, gField(6.42e23, 3.39e6 / 2)],
    explanation: t`$g = \dfrac{GM}{R^2} = \dfrac{6.67 \times 10^{-11} \times 6.42 \times 10^{23}}{(3.39 \times 10^{6})^2} = ${sfStr(gField(6.42e23, 3.39e6), 3)}\ \text{N kg}^{-1}$. Forgetting to square $R$ gives a huge value; treating $R$ as a diameter gives four times the answer.`,
  });
  {
    const h = 3.5e5, gh = gField(ME, RE + h);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A space station orbits $350\ \text{km}$ above the Earth's surface. The Earth has mass $6.0 \times 10^{24}\ \text{kg}$ and radius $6.4 \times 10^{6}\ \text{m}$. Calculate the gravitational field strength at the station, in $\text{N kg}^{-1}$, to three significant figures.`,
      value: gh, unit: "N/kg", wrong: [gField(ME, h), gField(ME, RE)],
      explanation: t`1. Distance from the centre: $r = 6.4 \times 10^{6} + 3.5 \times 10^{5} = ${sciTex(RE + h)}\ \text{m}$.
2. $g = \dfrac{GM}{r^2} = \dfrac{6.67 \times 10^{-11} \times 6.0 \times 10^{24}}{(${sciTex(RE + h)})^2}$.
3. $g = ${sfStr(gh, 3)}\ \text{N kg}^{-1}$. Using $r = 350\ \text{km}$ (the height) gives ${sfStr(gField(ME, h), 3)} N kg⁻¹, which is absurd.`,
      hints: ["Measure r from the centre of the Earth."],
    });
  }
  {
    const r = Math.SQRT2 * RE, h = r - RE;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`Calculate the height above the Earth's surface at which the gravitational field strength is half its value at the surface. The Earth's radius is $6.4 \times 10^{6}\ \text{m}$. Give your answer in m, to three significant figures.`,
      value: h, unit: "m", wrong: [RE, 2 * RE - RE, r],
      explanation: t`1. $\dfrac{g}{g_0} = \left(\dfrac{R}{r}\right)^2 = \dfrac{1}{2}$, so $r = \sqrt{2}\,R = ${sciTex(r)}\ \text{m}$.
2. Height $h = r - R = ${sciTex(r)} - 6.4 \times 10^{6} = ${sciTex(h)}\ \text{m}$.
3. Giving $r$ instead of the height, or assuming $g \propto 1/r$ (which gives a height of $R$), are the common errors.`,
      hints: ["g ∝ 1/r².", "Height = r − R."],
    });
  }
  {
    const g0 = 3.71, R = 3.39e6, M = (g0 * R * R) / G;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A lander measures the free-fall acceleration at the surface of a planet as $3.71\ \text{m s}^{-2}$. The planet's radius is $3.39 \times 10^{6}\ \text{m}$. Calculate the mass of the planet, in kg, to three significant figures.`,
      value: M, unit: "kg", wrong: [(g0 * R) / G, (g0 * R * R) / 9.81],
      explanation: t`1. $g = \dfrac{GM}{R^2} \Rightarrow M = \dfrac{gR^2}{G}$.
2. $M = \dfrac{3.71 \times (3.39 \times 10^{6})^2}{6.67 \times 10^{-11}} = ${sciTex(M)}\ \text{kg}$.`,
      hints: ["Rearrange g = GM/R² for M."],
    });
  }
  {
    const g0 = 9.81, R = RE;
    const rho = (3 * g0) / (4 * Math.PI * G * R);
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Show that the mean density $\rho$ of a uniform spherical planet is $\rho = \dfrac{3g}{4\pi GR}$, and use it to calculate the mean density of the Earth, in $\text{kg m}^{-3}$, to three significant figures. Take $g = 9.81\ \text{N kg}^{-1}$ and $R = 6.4 \times 10^{6}\ \text{m}$.`,
      value: rho, unit: "kg/m³", wrong: [(3 * g0) / (4 * Math.PI * G * R * R), g0 / (G * R)],
      explanation: t`1. $M = \rho \times \tfrac{4}{3}\pi R^3$.
2. $g = \dfrac{GM}{R^2} = \dfrac{G\rho \tfrac{4}{3}\pi R^3}{R^2} = \tfrac{4}{3}\pi G\rho R$, so $\rho = \dfrac{3g}{4\pi GR}$.
3. $\rho = \dfrac{3 \times 9.81}{4\pi \times 6.67 \times 10^{-11} \times 6.4 \times 10^{6}} = ${sciTex(rho)}\ \text{kg m}^{-3}$.
4. This is about twice the density of surface rock, so the Earth's core must be much denser than its crust.`,
      hints: ["Volume of a sphere = (4/3)πR³."],
    });
  }
  // Uncertainty
  {
    const pg = 0.5, pR = 1.5;
    const pM = pg + 2 * pR;
    chk(fracUnc([[1, 0.005, 1], [1, 0.015, 2]]) * 100, pM, 1e-9);
    b.num({
      d: 3, skill: "EVALUATION", calculator: true,
      stem: t`A planet's mass is found from $M = gR^2/G$. The surface field strength $g$ is known to $\pm 0.5\%$ and the radius $R$ to $\pm 1.5\%$; $G$ is taken as exact. Calculate the percentage uncertainty in $M$.`,
      value: pM, dp: 1, unit: "%", wrong: [pg + pR, pg * 2 * pR],
      explanation: t`For a product with a power, add the percentage uncertainties multiplied by the powers: $0.5\% + 2 \times 1.5\% = ${dpStr(pM, 1)}\%$. Forgetting the power of 2 on $R$ gives $2.0\%$. The radius dominates the uncertainty.`,
      hints: ["R is squared, so its percentage uncertainty counts twice."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Two objects of different mass released together at the same point near the Moon's surface fall with the same acceleration, if there is no atmosphere.",
    answer: true,
    explanation: "True. The acceleration is g = GM/r², which does not depend on the falling object's mass.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each quantity with its SI unit.",
    pairs: [
      ["gravitational field strength", t`$\text{N kg}^{-1}$`],
      ["gravitational constant G", t`$\text{N m}^2\,\text{kg}^{-2}$`],
      ["gravitational force", "N"],
      ["mass of a planet", "kg"],
    ],
    explanation: "g = F/m in N kg⁻¹; G = Fr²/(m₁m₂) in N m² kg⁻²; force in N; mass in kg.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements about gravitational fields.",
    template: "Gravitational field strength is the force per unit {{blank:a}} on a small test mass. Outside a uniform sphere the field strength is inversely proportional to the {{blank:b}} of the distance from the centre. Close to the Earth's surface the field is approximately {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["mass"], choices: ["mass", "charge", "volume"] },
      { id: "b", accepted: ["square"], choices: ["square", "cube", "square root"] },
      { id: "c", accepted: ["uniform"], choices: ["uniform", "radial", "zero"] },
    ],
    explanation: "g = F/m; g = GM/r² (inverse square); near the surface the field lines are parallel and equally spaced, so the field is uniform.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 2,
    stem: "Define gravitational field strength, and state whether it is a scalar or a vector quantity.",
    points: [
      "Force per unit mass acting on a small (test) mass placed at the point.",
      "A vector, directed towards the mass producing the field.",
    ],
    modelAnswer: "Gravitational field strength at a point is the gravitational force per unit mass on a small test mass placed at that point. It is a vector, pointing towards the mass that produces the field.",
    explanation: "Force per unit mass; vector.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: t`Starting from Newton's law of gravitation, derive an expression for the gravitational field strength $g$ at a distance $r$ from the centre of a uniform sphere of mass $M$ (outside the sphere).`,
    points: [
      "The sphere acts as a point mass at its centre for points outside it.",
      t`Force on a small test mass $m$: $F = \dfrac{GMm}{r^2}$.`,
      t`$g = F/m$, so $g = \dfrac{GM}{r^2}$ (independent of $m$).`,
    ],
    modelAnswer: "For points outside, the sphere behaves as a point mass M at its centre. A small test mass m at distance r feels a force F = GMm/r². Field strength is force per unit mass, so g = F/m = GM/r², which does not depend on the test mass.",
    explanation: "Point mass; Newton's law; divide by m.",
    hints: ["Field strength is force per unit mass."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why the gravitational field strength may be treated as constant for a stone falling down the 100 m gorge below the Victoria Falls, but not for a rocket climbing to 2000 km.",
    points: [
      t`$g = GM/r^2$ with $r$ measured from the Earth's centre (about $6.4 \times 10^{6}\ \text{m}$).`,
      "100 m is a tiny fraction of r (about 0.002%), so g changes by a negligible amount (about 0.003%).",
      "2000 km is about 30% of r, so g changes greatly (to roughly 60% of its surface value): it must be calculated from GM/r².",
    ],
    modelAnswer: "g = GM/r², where r is measured from the Earth's centre, about 6400 km away. A 100 m drop changes r by about 0.002%, so g changes by only about 0.003%, which is negligible. Climbing 2000 km increases r by about a third, so g falls to roughly 0.6 of its surface value and cannot be treated as constant.",
    explanation: "Compare the height change with the radius.",
    hints: ["Compare each height with the Earth's radius."],
  });
  // Practice structured: g against distance from a probe
  {
    const M = 4.87e24, R = 6.05e6;
    const ks = [1.0, 1.5, 2.0, 2.5, 3.0, 4.0];
    const rs = ks.map((k) => k * R);
    const gs = rs.map((r) => Number(sfStr(gField(M, r), 3)));
    const X = rs.map((r) => 1 / (r * r));
    const fit = linFit(X, gs);
    const Mfit = fit.m / G;
    const tab = table([t`$r\,/\,10^{6}\ \text{m}$`, t`$g\,/\,\text{N kg}^{-1}$`], rs.map((r, i) => [sfStr(r / 1e6, 3), String(gs[i])]));
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A space probe approaching a planet of radius $6.05 \times 10^{6}\ \text{m}$ records the gravitational field strength $g$ at several distances $r$ from the planet's centre.

${tab}`,
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: "Use two rows of the table to show that the data are consistent with an inverse-square law.", points: [t`Choose two rows with $r$ in the ratio 1 : 2 (e.g. ${sfStr(rs[0] / 1e6, 3)} and ${sfStr(rs[2] / 1e6, 3)}).`, t`$g$ falls by a factor of 4 (${gs[0]} → ${gs[2]}), as $g \propto 1/r^2$ predicts (or $gr^2$ is constant).`], modelAnswer: t`Doubling $r$ from ${sfStr(rs[0] / 1e6, 3)} to ${sfStr(rs[2] / 1e6, 3)} × 10⁶ m reduces $g$ from ${gs[0]} to ${gs[2]} N kg⁻¹, a factor of 4, so $g \propto 1/r^2$. Equivalently, $gr^2$ is the same for each row.` }),
        P.num({ label: "(b)", marks: 1, stem: t`Calculate $gr^2$ for the row $r = ${sfStr(rs[3] / 1e6, 3)} \times 10^{6}\ \text{m}$, in $\text{N m}^2\,\text{kg}^{-1}$, to three significant figures.`, value: gs[3] * rs[3] ** 2, wrong: [gs[3] * rs[3]], answer: sciPlain(gs[3] * rs[3] ** 2), explanation: t`$${gs[3]} \times (${sfStr(rs[3] / 1e6, 4)} \times 10^{6})^2 = ${sciTex(gs[3] * rs[3] ** 2)}\ \text{N m}^2\,\text{kg}^{-1}$.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Using $gr^2 = GM$, calculate the mass of the planet, in kg, to three significant figures.`, value: Mfit, unit: "kg", tol: 0.02e24, answer: sciPlain(Mfit), wrong: [fit.m * G], explanation: t`$M = \dfrac{gr^2}{G} = \dfrac{${sciTex(fit.m)}}{6.67 \times 10^{-11}} = ${sciTex(Mfit)}\ \text{kg}$.` }),
        P.num({ label: "(d)", marks: 1, stem: t`Calculate the field strength at $r = 8.0R$, in $\text{N kg}^{-1}$, to two significant figures.`, value: gs[0] / 64, sf: 2, unit: "N/kg", wrong: [gs[0] / 8, gs[0] / 16], explanation: t`$g = ${gs[0]}/8.0^2 = ${sfStr(gs[0] / 64, 2)}\ \text{N kg}^{-1}$. Dividing by 8 assumes $g \propto 1/r$.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Describe the graph of g against r for r from R to 4R, and state what graph would give a straight line.", points: ["A curve falling steeply at first and then more gradually, approaching zero but never reaching it (inverse square).", "g against 1/r² gives a straight line through the origin of gradient GM."], modelAnswer: "g falls from 8.87 N kg⁻¹ at the surface, steeply at first and then more slowly, tending towards zero. Plotting g against 1/r² gives a straight line through the origin whose gradient is GM." }),
      ],
      explanation: "g = GM/r², so gr² = GM is constant; M = gr²/G.",
      hints: ["If g ∝ 1/r², what happens to g when r doubles?", "gr² should be the same in every row."],
    });
  }
  {
    const g0 = 9.78, RE2 = 6.38e6, h = 1200;
    const ME2 = (g0 * RE2 * RE2) / G, g1 = gField(ME2, RE2 + h);
    const pct = ((g0 - g1) / g0) * 100;
    b.struct({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A surveyor measures the gravitational field strength at a borehole site near Masvingo as $9.78\ \text{N kg}^{-1}$, and then measures it again at the top of a hill $1.20\ \text{km}$ higher. Take the radius of the Earth at the site as $6.38 \times 10^{6}\ \text{m}$.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Use the reading at the borehole site to calculate the mass of the Earth, in kg, to three significant figures.", value: ME2, unit: "kg", wrong: [(g0 * RE2) / G], explanation: t`$M = \dfrac{gR^2}{G} = \dfrac{9.78 \times (6.38 \times 10^{6})^2}{6.67 \times 10^{-11}} = ${sciTex(ME2)}\ \text{kg}$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the percentage decrease in g between the site and the hill-top, to two significant figures.", value: pct, sf: 2, unit: "%", wrong: [(h / RE2) * 100], explanation: t`$\dfrac{g_1}{g_0} = \left(\dfrac{R}{R + h}\right)^2$; percentage decrease $= ${sfStr(pct, 2)}\%$ (about twice $h/R$, because $r$ is squared).` }),
        P.manual({ label: "(c)", marks: 2, stem: "Suggest why the change in g with height is ignored in most calculations, and why a surveyor searching for dense ore bodies cannot ignore it.", points: ["The change (a few hundredths of a per cent) is far smaller than the uncertainty of ordinary measurements, so g is treated as uniform.", "Ore bodies change g by similarly tiny amounts, so the surveyor must correct each reading for its height (and measure g very precisely)."], modelAnswer: "A change of a few hundredths of a per cent is far below the precision of ordinary experiments, so near the surface g is treated as uniform. Dense ore bodies change g by only tiny amounts too, so the surveyor must correct every reading for its height to see the ore's effect." }),
      ],
      explanation: "g = GM/r²; a small height change h gives a fractional change of about 2h/R.",
      hints: ["Use r = R + h for the hill-top."],
    });
  }

  b.card("DEFINITION", "**Gravitational field**", "A region of space in which a mass experiences a force because of its mass.");
  b.card("DEFINITION", "**Gravitational field strength**", "The gravitational force per unit mass on a small test mass placed at the point (a vector, towards the attracting mass).");
  b.card("FORMULA", "Field strength from force", t`$g = F/m$, unit $\text{N kg}^{-1} = \text{m s}^{-2}$`);
  b.card("FORMULA", "Field of a point mass or uniform sphere", t`$g = \dfrac{GM}{r^2}$, $r$ from the centre`);
  b.card("FACT", "Gravitational constant", t`$G = 6.67 \times 10^{-11}\ \text{N m}^2\,\text{kg}^{-2}$`);
  b.card("CONCEPT", "Inverse-square law", "Doubling the distance from the centre divides g by four; g against 1/r² is a straight line through the origin.");
  b.card("CONCEPT", "Radial and uniform fields", "Radial: lines converge on the centre of the mass. Near the surface: parallel, equally spaced lines (uniform field).");
  b.card("CONCEPT", "Why g is constant near the surface", "Height changes of metres or kilometres are tiny compared with the Earth's radius (6400 km), so r and g hardly change.");
  b.card("FACT", "Satellite at height h", "Use r = R + h in g = GM/r², never h alone.");
});
