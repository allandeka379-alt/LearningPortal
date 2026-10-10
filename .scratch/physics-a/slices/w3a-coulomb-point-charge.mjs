// W3a: aphys.efields.coulomb-point-charge — Coulomb's law, spheres as point charges, E = Q/4πε₀r², vector addition of
// fields along a line and at right angles, electric versus gravitational forces.
import { concept, P, t, chk, DATA, sfStr, dpStr, sciTex, sciPlain, coulombForce, linFit, table, deg } from "../lib.mjs";

const k = DATA.k_e, e = DATA.e;
const Ept = (Q, r) => (k * Q) / (r * r);

concept("aphys.efields.coulomb-point-charge", { file: "efields/coulomb-point-charge", keyPrefix: "efields.coulomb-point-charge" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement is Coulomb's law?",
    options: [
      ["The force between two point charges is proportional to the product of the charges and inversely proportional to the square of their separation.", "Correct."],
      ["The force between two point charges is proportional to the sum of the charges and inversely proportional to the square of their separation.", "The force depends on the product of the charges."],
      ["The force between two point charges is proportional to the product of the charges and inversely proportional to their separation.", "The dependence is on the inverse square of the separation; 1/r applies to potential."],
      ["The force between two point charges is always attractive and proportional to the product of their masses.", "Electric forces can repel, and depend on charge, not mass."],
    ],
    answer: "A",
    explanation: "Coulomb's law: F = Q₁Q₂/(4πε₀r²) for point charges; like charges repel, unlike attract.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "The separation of two point charges is halved and one of the charges is doubled. By what factor does the force between them change?",
    options: [
      ["8", "Correct: × 2 for the charge and × 4 for halving r."],
      ["4", "This includes only the change in separation."],
      ["1", "Both changes increase the force; they do not cancel."],
      ["16", "Only one charge is doubled, not both."],
    ],
    answer: "A",
    explanation: "F ∝ Q₁Q₂/r²: doubling one charge gives × 2; halving r gives × 4; total × 8.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A point charge +Q is a distance d from a point charge +4Q. Where on the line between them is the resultant electric field zero?",
    options: [
      ["d/3 from the +Q charge", "Correct: Q/x² = 4Q/(d − x)² gives d − x = 2x."],
      ["d/2 from the +Q charge", "The midpoint would need equal charges."],
      ["d/5 from the +Q charge", "This divides the gap in the ratio of the charges (1 : 4) instead of the ratio of their square roots."],
      ["2d/3 from the +Q charge", "This is closer to the larger charge, where its field is stronger."],
    ],
    answer: "A",
    explanation: "At the neutral point Q/x² = 4Q/(d − x)², so (d − x)/x = 2 and x = d/3, nearer the smaller charge.",
    hints: ["The neutral point is nearer the smaller charge.", "Take square roots."],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "A positive charge and a larger negative charge are fixed a short distance apart. Where on the straight line through them can the resultant electric field be zero?",
    options: [
      ["outside the pair, on the side of the smaller (positive) charge", "Correct: there the fields are opposite and the nearer, smaller charge can balance the larger, more distant one."],
      ["between the charges, nearer the positive charge", "Between unlike charges both fields point towards the negative charge, so they add."],
      ["outside the pair, on the side of the larger (negative) charge", "There the larger charge is also the nearer one, so its field always wins."],
      ["between the charges, exactly at the midpoint", "Between unlike charges the fields never cancel."],
    ],
    answer: "A",
    explanation: "Between unlike charges the fields add. Outside, the fields are opposite; cancellation needs the nearer charge to be the smaller one, so the point lies beyond the smaller charge.",
    hints: ["Draw the field direction from each charge in each region."],
  });
  {
    const Q = 6.0e-6, r = 0.50;
    const E = Ept(Q, r);
    b.mcq({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: t`What is the electric field strength $0.50\ \text{m}$ from a point charge of $6.0\ \mu\text{C}$ in air?`,
      options: [
        [t`$${sciTex(E)}\ \text{N C}^{-1}$`, "Correct: E = Q/(4πε₀r²)."],
        [t`$${sciTex((k * Q) / r)}\ \text{N C}^{-1}$`, "This divides by r, not r² (it is the potential in V)."],
        [t`$${sciTex(Q / (DATA.eps0 * r * r))}\ \text{N C}^{-1}$`, "The factor 4π has been left out."],
        [t`$${sciTex(Ept(6.0e-9, r))}\ \text{N C}^{-1}$`, "µC is 10⁻⁶ C, not 10⁻⁹ C."],
      ],
      answer: "A",
      explanation: t`$E = \dfrac{8.99 \times 10^{9} \times 6.0 \times 10^{-6}}{0.50^2} = ${sciTex(E)}\ \text{N C}^{-1}$.`,
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which statement correctly describes a difference between electric and gravitational forces between particles?",
    options: [
      ["Electric forces can be attractive or repulsive; gravitational forces are only attractive.", "Correct: there are two signs of charge but mass is always positive."],
      ["Electric forces follow an inverse-square law; gravitational forces follow an inverse law.", "Both are inverse-square laws."],
      ["Electric forces act only through a medium; gravitational forces act through a vacuum.", "Both act through a vacuum; the electric force is modified by a medium."],
      ["Electric forces between two protons are weaker than the gravitational forces between them.", "The electric force is about 10³⁶ times stronger."],
    ],
    answer: "A",
    explanation: "Both are inverse-square, both act across a vacuum. Electric forces can repel, depend on the medium (permittivity), and between particles are vastly stronger.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Measurements are made of the electric field strength E at distances r from a small charged sphere. Which graph should give a straight line through the origin?",
    options: [
      ["E against 1/r²", "Correct: E = (Q/4πε₀)(1/r²)."],
      ["E against 1/r", "E ∝ 1/r², so this is curved."],
      ["E against r²", "This is a decreasing curve, not a straight line."],
      ["1/E against r", "1/E ∝ r², so this is a parabola."],
    ],
    answer: "A",
    explanation: "E = (Q/4πε₀) × (1/r²): plotting E against 1/r² gives a straight line through the origin with gradient Q/4πε₀.",
    hints: ["Write E in the form y = mx."],
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: t`Which is a correct unit for the permittivity of free space $\varepsilon_0$?`,
    options: [
      [t`$\text{C}^2\,\text{N}^{-1}\,\text{m}^{-2}$`, "Correct: ε₀ = Q₁Q₂/(4πFr²); it is also F m⁻¹."],
      [t`$\text{N m}^2\,\text{C}^{-2}$`, "This is the unit of 1/(4πε₀)."],
      [t`$\text{N C}^{-1}$`, "This is the unit of electric field strength."],
      [t`$\text{C N}^{-1}\,\text{m}^{-1}$`, "Check the powers: rearranging Coulomb's law gives C² N⁻¹ m⁻²."],
    ],
    answer: "A",
    explanation: t`From $F = Q_1Q_2/4\pi\varepsilon_0r^2$: $\varepsilon_0 = Q_1Q_2/4\pi Fr^2$, unit $\text{C}^2\,\text{N}^{-1}\,\text{m}^{-2}$, equivalent to $\text{F m}^{-1}$.`,
  });
  // Numerical
  {
    const r = 5.3e-11;
    const F = coulombForce(e, e, r);
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: t`In a hydrogen atom the electron and proton are, on average, $5.3 \times 10^{-11}\ \text{m}$ apart. Calculate the size of the electric force between them, in N, to two significant figures.`,
      value: F, sf: 2, unit: "N", wrong: [(k * e * e) / r, (k * e) / (r * r)],
      explanation: t`$F = \dfrac{e^2}{4\pi\varepsilon_0r^2} = \dfrac{8.99 \times 10^{9} \times (1.60 \times 10^{-19})^2}{(5.3 \times 10^{-11})^2} = ${sciTex(F, 2)}\ \text{N}$ (attractive). Forgetting to square $e$ gives a value $10^{19}$ times too big.`,
    });
  }
  {
    const Q = 3.0e-6, R = 0.050, r = 0.25;
    const E = Ept(Q, r);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A metal sphere of radius $5.0\ \text{cm}$ on an insulating stand carries a charge of $+3.0\ \mu\text{C}$. Calculate the electric field strength at a point $25\ \text{cm}$ from the centre of the sphere, in $\text{N C}^{-1}$, to three significant figures.`,
      value: E, unit: "N/C", wrong: [Ept(Q, r - R), Ept(Q, r + R)],
      explanation: t`1. Outside the sphere it acts as a point charge at its centre, so $r = 0.25\ \text{m}$ (not $0.25 - 0.050$).
2. $E = \dfrac{Q}{4\pi\varepsilon_0r^2} = \dfrac{8.99 \times 10^{9} \times 3.0 \times 10^{-6}}{0.25^2} = ${sciTex(E)}\ \text{N C}^{-1}$, directed away from the sphere.`,
      hints: ["Measure r from the centre."],
    });
  }
  {
    const Q = 6.0e-9, dsep = 0.24;
    const E = 2 * Ept(Q, dsep / 2);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Charges of $+6.0\ \text{nC}$ and $-6.0\ \text{nC}$ are $24\ \text{cm}$ apart. Calculate the resultant electric field strength at the midpoint between them, in $\text{N C}^{-1}$, to three significant figures.`,
      value: E, unit: "N/C", wrong: [0, Ept(Q, dsep / 2), Ept(Q, dsep)],
      explanation: t`1. Each charge is $0.12\ \text{m}$ from the midpoint: $E_1 = E_2 = \dfrac{8.99 \times 10^{9} \times 6.0 \times 10^{-9}}{0.12^2} = ${sciTex(Ept(Q, dsep / 2))}\ \text{N C}^{-1}$.
2. Both fields point towards the negative charge (away from $+$, towards $-$), so they add.
3. $E = 2 \times ${sciTex(Ept(Q, dsep / 2))} = ${sciTex(E)}\ \text{N C}^{-1}$, towards the negative charge. Assuming the fields cancel (as they would for like charges) gives zero.`,
      hints: ["Draw the direction of each field at the midpoint."],
    });
  }
  {
    const Q1 = 3.0e-9, Q2 = 12e-9, d = 0.45;
    const x = d / (1 + Math.sqrt(Q2 / Q1));
    chk(x, 0.15, 1e-12);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A $+3.0\ \text{nC}$ charge and a $+12\ \text{nC}$ charge are $45\ \text{cm}$ apart. Calculate the distance from the $3.0\ \text{nC}$ charge to the point between them where the resultant field is zero, in cm.`,
      value: x * 100, sf: 2, unit: "cm", wrong: [(d / 5) * 100, (d / 2) * 100],
      explanation: t`$\dfrac{3.0}{x^2} = \dfrac{12}{(45 - x)^2} \Rightarrow \dfrac{45 - x}{x} = \sqrt{4} = 2$, so $x = 15\ \text{cm}$. Splitting the gap in the ratio of the charges (1 : 4) gives 9 cm, which ignores the squares.`,
      hints: ["Equate the two field strengths and take square roots."],
    });
  }
  {
    const ratio = (k * e * e) / (DATA.G * DATA.me * DATA.mp);
    b.num({
      d: 3, skill: "ANALYSIS", calculator: true,
      stem: "Calculate the ratio (electric force) ÷ (gravitational force) between an electron and a proton, using the data-sheet values. Give your answer to three significant figures.",
      value: ratio, wrong: [(k * e * e) / (DATA.G * DATA.mp * DATA.mp)],
      explanation: t`$\dfrac{F_E}{F_G} = \dfrac{e^2/4\pi\varepsilon_0}{Gm_em_p} = \dfrac{8.99 \times 10^{9} \times (1.60 \times 10^{-19})^2}{6.67 \times 10^{-11} \times 9.11 \times 10^{-31} \times 1.67 \times 10^{-27}} = ${sciTex(ratio)}$. The separation cancels because both forces are inverse-square. Using two proton masses gives the proton-proton value, about $10^{36}$.`,
      hints: ["The distance cancels.", "Use m_e for the electron and m_p for the proton."],
    });
  }
  {
    const E = 2.7e4, r = 0.30, Q = (E * r * r) / k;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A field meter placed $30\ \text{cm}$ from the centre of a charged dome on a Van de Graaff generator reads $2.7 \times 10^{4}\ \text{N C}^{-1}$, directed away from the dome. Calculate the charge on the dome, in C, to two significant figures.`,
      value: Q, sf: 2, unit: "C", wrong: [(E * r) / k, E * r * r * k],
      explanation: t`1. $E = \dfrac{Q}{4\pi\varepsilon_0r^2} \Rightarrow Q = 4\pi\varepsilon_0Er^2 = \dfrac{Er^2}{8.99 \times 10^{9}}$.
2. $Q = \dfrac{2.7 \times 10^{4} \times 0.30^2}{8.99 \times 10^{9}} = ${sciTex(Q, 2)}\ \text{C}$, positive because the field points away from the dome.`,
      hints: ["Rearrange E = Q/(4πε₀r²)."],
    });
  }
  // Uncertainty
  {
    const pE = 2.0, pr = 1.5, pQ = pE + 2 * pr;
    b.num({
      d: 3, skill: "EVALUATION", calculator: true,
      stem: t`The charge on a sphere is found from $Q = 4\pi\varepsilon_0Er^2$. The field strength $E$ is measured to $\pm 2.0\%$ and the distance $r$ to $\pm 1.5\%$. Calculate the percentage uncertainty in $Q$.`,
      value: pQ, sf: 2, unit: "%", wrong: [pE + pr, pE * pr],
      explanation: t`$\%Q = \%E + 2 \times \%r = 2.0 + 2 \times 1.5 = ${sfStr(pQ, 2)}\%$. The distance, though measured more precisely, contributes more because it is squared.`,
      hints: ["r is squared."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "For a point outside a charged conducting sphere, the field is the same as that of a point charge equal to the sphere's total charge placed at its centre.",
    answer: true,
    explanation: "True. The charge spreads uniformly over the surface, and outside the sphere it acts as a point charge at the centre, so r is measured from the centre.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each change with its effect on the force between two point charges.",
    pairs: [
      ["separation doubled", "force divided by 4"],
      ["both charges doubled", "force multiplied by 4"],
      ["one charge doubled and separation doubled", "force halved"],
      ["one charge reversed in sign", "attraction becomes repulsion, or the reverse"],
    ],
    explanation: "F ∝ Q₁Q₂/r²: 1/2² = 1/4; 2 × 2 = 4; 2/2² = 1/2; reversing a sign reverses the direction.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements about the field of a point charge.",
    template: "The field of an isolated positive point charge points radially {{blank:a}}. Its strength is inversely proportional to the {{blank:b}} of the distance. Between two like charges there is a {{blank:c}} point where the field is zero.",
    blanks: [
      { id: "a", accepted: ["outwards"], choices: ["outwards", "inwards", "sideways"] },
      { id: "b", accepted: ["square"], choices: ["square", "cube", "square root"] },
      { id: "c", accepted: ["neutral"], choices: ["neutral", "focal", "critical"] },
    ],
    explanation: "Field lines leave positive charges; E ∝ 1/r²; between like charges the opposing fields cancel at a neutral point.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: t`Use Coulomb's law to derive the expression for the electric field strength a distance $r$ from a point charge $Q$ in free space.`,
    points: [
      t`Place a small positive test charge $q$ at distance $r$: force $F = \dfrac{Qq}{4\pi\varepsilon_0r^2}$.`,
      t`Field strength is force per unit positive charge, $E = F/q$.`,
      t`$E = \dfrac{Q}{4\pi\varepsilon_0r^2}$, directed away from $Q$ if it is positive.`,
    ],
    modelAnswer: "A small positive test charge q at distance r from Q feels a force F = Qq/(4πε₀r²). Field strength is force per unit positive charge, so E = F/q = Q/(4πε₀r²), pointing away from Q if Q is positive.",
    explanation: "Coulomb's law divided by the test charge.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Compare the electric force and the gravitational force between two protons, giving two similarities and two differences.",
    points: [
      "Similarity: both are inverse-square laws (F ∝ 1/r²).",
      "Similarity: both are proportional to the product of the 'source' quantities (charges or masses) / both act along the line joining the centres / both act through a vacuum.",
      "Difference: the electric force here is repulsive (it can attract or repel); gravity is always attractive.",
      "Difference: the electric force is far larger (about 10³⁶ times) / it depends on the medium (permittivity), whereas gravity does not.",
    ],
    modelAnswer: "Both forces follow inverse-square laws and are proportional to the product of the relevant quantities (charges or masses), acting along the line joining the protons. However, the electric force between two protons is repulsive whereas gravity always attracts, and the electric force is about 10³⁶ times stronger; it is also affected by the medium between the charges, unlike gravity.",
    explanation: "Inverse-square and product laws; sign and size differ.",
    hints: ["Think about direction and size."],
  });
  // Practice structured: force against separation
  {
    const Q1 = 2.0e-8, Q2 = 1.5e-8;
    const rs = [0.040, 0.050, 0.060, 0.080, 0.100, 0.120];
    const scatter = [0.02, -0.03, 0.025, -0.02, 0.03, -0.025];
    const Fs = rs.map((r, i) => Number(((coulombForce(Q1, Q2, r) * 1e3) * (1 + scatter[i])).toFixed(3)));
    const X = rs.map((r) => 1 / (r * r));
    const fit = linFit(X, Fs.map((f) => f / 1e3));
    const Q1fit = fit.m / (k * Q2);
    const row = 3;
    const tab = table([t`$r\,/\,\text{m}$`, t`$F\,/\,\text{mN}$`], rs.map((r, i) => [r.toFixed(3), Fs[i].toFixed(3)]));
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Two small charged conducting spheres are used to test Coulomb's law. Sphere B carries a charge of $1.5 \times 10^{-8}\ \text{C}$. The force $F$ on B is measured with an electronic balance for several centre-to-centre separations $r$ from sphere A.

${tab}`,
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: "State the graph you would plot to test Coulomb's law, and what it should look like.", points: ["Plot F against 1/r² (or lg F against lg r).", "A straight line through the origin (or a line of gradient −2 on the lg-lg graph)."], modelAnswer: "Plot F against 1/r². If F ∝ 1/r² the points lie on a straight line through the origin. (Alternatively lg F against lg r should give a straight line of gradient −2.)" }),
        P.num({ label: "(b)", marks: 1, stem: t`Calculate $1/r^2$ for $r = ${rs[row].toFixed(3)}\ \text{m}$, in $\text{m}^{-2}$, to three significant figures.`, value: X[row], wrong: [1 / rs[row]], explanation: t`$1/0.080^2 = ${sfStr(X[row], 3)}\ \text{m}^{-2}$.` }),
        P.num({ label: "(c)", marks: 3, stem: t`The best-fit line of $F$ (in N) against $1/r^2$ (in $\text{m}^{-2}$) has a gradient equal to $\dfrac{Q_AQ_B}{4\pi\varepsilon_0}$. Determine the gradient, in $\text{N m}^2$.`, value: fit.m, tol: fit.m * 0.05, answer: sciPlain(fit.m), wrong: [fit.m * 1e3], explanation: t`From a large triangle on the best-fit line: gradient $\approx ${sciTex(fit.m)}\ \text{N m}^2$ (remember to convert mN to N).` }),
        P.num({ label: "(d)", marks: 2, stem: "Use your gradient to determine the charge on sphere A, in C, to two significant figures.", value: Q1fit, tol: Q1fit * 0.06, unit: "C", answer: sciPlain(Q1fit, 2), wrong: [fit.m / Q2], explanation: t`$Q_A = \dfrac{\text{gradient}}{(1/4\pi\varepsilon_0)Q_B} = \dfrac{${sciTex(fit.m)}}{8.99 \times 10^{9} \times 1.5 \times 10^{-8}} = ${sciTex(Q1fit, 2)}\ \text{C}$.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Sphere A rests on an insulating post on the balance pan, and B is held directly above it. The balance reading increases when B is brought closer. State whether the force between the spheres is attractive or repulsive, and what this shows about the charges.", points: ["The balance reading increases, so A is pushed down: the force between the spheres is repulsive.", "So the two charges have the same sign (both positive, as B is positive)."], modelAnswer: "If the balance supporting A reads more, A is being pushed down away from B, so the force is repulsive and the spheres carry charges of the same sign; since B is positive, A is positive too." }),
        P.manual({ label: "(f)", marks: 2, stem: "Suggest two reasons why the measured forces may not follow Coulomb's law exactly at the smallest separations.", points: ["At small separations the charges redistribute on the conducting spheres (induction), so they no longer act as point charges at their centres.", "Charge leaks away (into humid air or through the supports) during the experiment / the separation is hard to measure precisely to the centres."], modelAnswer: "When the spheres are close, their charges push each other to the far sides, so they no longer act as point charges at the centres. Also, charge leaks away into moist air or through the supports during the experiment, and the small separations are hard to measure precisely between centres." }),
      ],
      explanation: "F = (Q_AQ_B/4πε₀)(1/r²): the gradient of F against 1/r² gives Q_A.",
      hints: ["Convert mN to N before finding the gradient.", "Gradient = Q_A Q_B/(4πε₀)."],
    });
  }
  {
    const q1 = 5.0e-9, q2 = -5.0e-9, a = 0.050, bb = 0.050;
    // P at the corner of a right angle: q1 directly below P (distance a), q2 directly to the left of P (distance bb)
    const E1 = Ept(q1, a), E2 = Ept(Math.abs(q2), bb);
    const ER = Math.hypot(E1, E2);
    const ang = deg(Math.atan(E1 / E2));
    const Fp = e * ER;
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`Point P is $5.0\ \text{cm}$ directly above a charge of $+5.0\ \text{nC}$ and $5.0\ \text{cm}$ directly to the right of a charge of $-5.0\ \text{nC}$. The charges are in air.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: t`Calculate the magnitude of the field at P due to the $+5.0\ \text{nC}$ charge alone, in $\text{N C}^{-1}$, to three significant figures, and state its direction.`, value: E1, unit: "N/C", wrong: [(k * q1) / a], explanation: t`$E_1 = \dfrac{8.99 \times 10^{9} \times 5.0 \times 10^{-9}}{0.050^2} = ${sciTex(E1)}\ \text{N C}^{-1}$, vertically upwards (away from the positive charge).` }),
        P.manual({ label: "(b)", marks: 1, stem: t`State the magnitude and direction of the field at P due to the $-5.0\ \text{nC}$ charge.`, points: [t`Same magnitude, $${sciTex(E2)}\ \text{N C}^{-1}$, directed horizontally to the left (towards the negative charge).`], modelAnswer: t`$${sciTex(E2)}\ \text{N C}^{-1}$, horizontally to the left, towards the negative charge.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Calculate the magnitude of the resultant field at P, in $\text{N C}^{-1}$, to three significant figures.`, value: ER, unit: "N/C", wrong: [E1 + E2, 0], explanation: t`$E = \sqrt{E_1^2 + E_2^2} = \sqrt{2} \times ${sciTex(E1)} = ${sciTex(ER)}\ \text{N C}^{-1}$, pointing up and to the left at $${sfStr(ang, 2)}^\circ$ to the horizontal.` }),
        P.num({ label: "(d)", marks: 1, stem: "Calculate the size of the force on an electron placed at P, in N, to three significant figures.", value: Fp, unit: "N", wrong: [e * E1], explanation: t`$F = eE = 1.60 \times 10^{-19} \times ${sciTex(ER)} = ${sciTex(Fp)}\ \text{N}$, opposite to the field (down and to the right).` }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain why adding the two field strengths as numbers gives the wrong answer.", points: ["Field strength is a vector: the two fields at P are at right angles to each other.", "So they must be combined by vector addition (Pythagoras), giving √2 × E₁, not 2E₁."], modelAnswer: "Electric field strength is a vector, and at P the two fields act at right angles. They must be added as vectors using Pythagoras, giving √2 × E₁ rather than 2E₁." }),
      ],
      explanation: "Point-charge fields: E = Q/(4πε₀r²), away from + and towards −; combine at right angles with Pythagoras.",
      hints: ["Draw each field at P with its direction.", "Use Pythagoras for fields at right angles."],
    });
  }

  b.card("DEFINITION", "**Coulomb's law**", "The force between two point charges is proportional to the product of the charges and inversely proportional to the square of their separation.");
  b.card("FORMULA", "Coulomb's law", t`$F = \dfrac{Q_1Q_2}{4\pi\varepsilon_0r^2}$, $\dfrac{1}{4\pi\varepsilon_0} = 8.99 \times 10^{9}\ \text{m F}^{-1}$`);
  b.card("FORMULA", "Field of a point charge", t`$E = \dfrac{Q}{4\pi\varepsilon_0r^2}$`);
  b.card("CONCEPT", "Charged conducting sphere", "For outside points it acts as a point charge at its centre: measure r from the centre.");
  b.card("CONCEPT", "Adding fields", "Fields are vectors: add with signs along a line, with Pythagoras at right angles.");
  b.card("CONCEPT", "Neutral points", "Between like charges, nearer the smaller one; for unlike charges, outside the pair beyond the smaller charge.");
  b.card("FACT", "Electric versus gravitational", "For two protons F_E/F_G ≈ 1.2 × 10³⁶; the ratio does not depend on separation.");
  b.card("FACT", "Permittivity of free space", t`$\varepsilon_0 = 8.85 \times 10^{-12}\ \text{F m}^{-1}$`);
});
