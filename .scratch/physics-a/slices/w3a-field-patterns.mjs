// W3a: aphys.magnetism.field-patterns — magnetic fields, patterns of a wire, flat coil and solenoid, direction
// rules, iron cores, forces between parallel conductors. B-formulae items are tagged ZIM (requirement to be confirmed).
import { concept, P, t, chk, ZIM, sfStr, sciTex, sciPlain, pctUnc, table } from "../lib.mjs";

const mu0 = 4 * Math.PI * 1e-7;
const Bw = (I, r) => (mu0 * I) / (2 * Math.PI * r);

concept("aphys.magnetism.field-patterns", { file: "magnetism/field-patterns", keyPrefix: "magnetism.field-patterns" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which describes the magnetic field lines around a long straight wire carrying a steady current?",
    options: [
      ["concentric circles centred on the wire, getting further apart with distance", "Correct: circular lines, weaker further out."],
      ["straight lines radiating outwards from the wire", "Radial lines describe the electric field of a charged wire, not the magnetic field of a current."],
      ["straight lines parallel to the wire", "The field circles round the wire; it has no component along it."],
      ["concentric circles centred on the wire, equally spaced at all distances", "The field weakens with distance, so the circles spread out."],
    ],
    answer: "A",
    explanation: "The field of a long straight current is a set of concentric circles in planes perpendicular to the wire, spreading out as the field weakens with distance.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A long straight wire lies in the plane of the page and carries a current vertically up the page. What is the direction of its magnetic field at a point just to the right of the wire?",
    options: [
      ["into the page", "Correct: right-hand grip with the thumb up the page; on the right, the fingers go into the page."],
      ["out of the page", "This is the direction just to the left of the wire."],
      ["up the page, parallel to the current", "The field circles round the wire; it is never parallel to the current."],
      ["to the right, away from the wire", "The magnetic field of a wire is not radial."],
    ],
    answer: "A",
    explanation: "Right-hand grip rule: thumb up the page along the current; the fingers curl out of the page on the left and into the page on the right.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which statement about the magnetic field of a long current-carrying solenoid is correct?",
    options: [
      ["Inside, away from the ends, the field is uniform and along the axis.", "Correct: parallel, equally spaced lines inside."],
      ["Inside, the field is zero because the contributions of the turns cancel.", "The contributions inside add; they cancel mainly outside."],
      ["The field is strongest just outside the solenoid, half-way along.", "Outside the field is weak; it is strongest inside."],
      ["Inside, the field lines are circles around the axis.", "Circles around a single wire add up to straight lines along the axis inside a solenoid."],
    ],
    answer: "A",
    explanation: "Inside a long solenoid, away from the ends, the field is uniform and parallel to the axis; outside it resembles that of a bar magnet and is much weaker.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Two long parallel wires carry currents in opposite directions. What happens to the wires?",
    options: [
      ["They repel with forces of equal size.", "Correct: antiparallel currents repel; the forces are a third-law pair."],
      ["They attract with forces of equal size.", "Parallel (same-direction) currents attract; opposite currents repel."],
      ["They repel, the wire with the larger current feeling the larger force.", "The forces are a Newton's third law pair, so they are equal in size."],
      ["There is no force because the two magnetic fields cancel.", "Each wire sits in the field of the other, so each feels a force."],
    ],
    answer: "A",
    explanation: "Opposite currents repel, same-direction currents attract. The force on each wire is produced by the other's field and the two forces are equal and opposite.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Two long parallel wires P and Q carry currents of 2.0 A and 6.0 A in the same direction. Which statement about the forces on them is correct?",
    options: [
      ["They attract, and the force on P equals the force on Q in size.", "Correct: same direction attracts; Newton's third law pair."],
      ["They attract, and the force on Q is three times the force on P.", "Each force is proportional to the product of both currents, so they are equal."],
      ["They repel, and the force on P equals the force on Q in size.", "Currents in the same direction attract."],
      ["They attract, and the force on P is three times the force on Q.", "P is in Q's stronger field but carries a smaller current; the product is the same for both."],
    ],
    answer: "A",
    explanation: "The force on P is B_Q × I_P × L and the force on Q is B_P × I_Q × L. Since B is proportional to the current making it, both are proportional to I_P × I_Q: the forces are equal and opposite, as Newton's third law requires.",
    hints: ["Each force depends on the field of one wire and the current in the other."],
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Why is soft iron, rather than steel, used for the core of an electromagnet in a relay?",
    options: [
      ["It is magnetised strongly and loses its magnetism when the current is switched off.", "Correct: the relay must release when the current stops."],
      ["It keeps its magnetism after the current is switched off.", "That describes steel, which would keep the relay closed."],
      ["It has a lower resistance than steel, so a larger current flows.", "The core is not part of the circuit; its magnetic properties matter."],
      ["It is not a ferrous material, so it does not affect the field.", "Iron is ferrous; it increases the field greatly."],
    ],
    answer: "A",
    explanation: "Soft iron magnetises easily (greatly increasing B) and demagnetises as soon as the current stops, so the electromagnet can be switched on and off.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Looking at one face of a flat circular coil, you see the current flowing anticlockwise. What is the direction of the magnetic field at the centre of the coil?",
    options: [
      ["along the axis, towards you", "Correct: right-hand grip for a coil: fingers anticlockwise, thumb towards you; this face is a north pole."],
      ["along the axis, away from you", "This would be the case for a clockwise current."],
      ["in the plane of the coil, towards the top", "At the centre the field is along the axis, perpendicular to the plane of the coil."],
      ["zero, because opposite sides of the coil cancel", "Opposite sides of the loop give fields in the same direction at the centre."],
    ],
    answer: "A",
    explanation: "Curl the fingers of the right hand with the current (anticlockwise as seen); the thumb points towards you. The face you are looking at is a north pole.",
    hints: ["Use the right-hand grip rule for a coil."],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Two long parallel wires each carry a current out of the page. What is the magnetic flux density at a point exactly midway between them if the currents are equal?",
    options: [
      ["zero, because the two fields there are equal and opposite", "Correct: each field is perpendicular to the line joining the wires, and they point in opposite directions."],
      ["twice the field of one wire, pointing along the line joining the wires", "The magnetic field of a wire is not along the line from the wire."],
      ["twice the field of one wire, perpendicular to the line joining the wires", "For currents in the same direction the two fields are opposite at the midpoint."],
      ["zero, because magnetic fields between parallel conductors always cancel", "Away from the midpoint, or for opposite currents, they do not cancel."],
    ],
    answer: "A",
    explanation: "Using the right-hand grip rule, the left wire's field at the midpoint points up the page and the right wire's points down; with equal currents and distances they cancel. (For opposite currents they would add.)",
    hints: ["Find the direction of each field at the midpoint separately."],
  });
  // Numerical (ZIM extension formulae)
  {
    const I = 15, r = 0.030, B = Bw(I, r);
    b.num({
      d: 2, skill: "APPLICATION", calculator: true, applies: ZIM,
      stem: t`Using $B = \mu_0 I/(2\pi r)$ with $\mu_0 = 4\pi \times 10^{-7}\ \text{H m}^{-1}$, calculate the magnetic flux density $3.0\ \text{cm}$ from a long straight wire carrying $15\ \text{A}$, in µT, to three significant figures.`,
      value: B * 1e6, unit: "µT", wrong: [Bw(I, 3.0) * 1e6, (mu0 * I) / r * 1e6],
      explanation: t`$B = \dfrac{4\pi \times 10^{-7} \times 15}{2\pi \times 0.030} = ${sciTex(B)}\ \text{T} = ${sfStr(B * 1e6, 3)}\ \mu\text{T}$. Leaving $r$ in cm gives a value 100 times too small.`,
    });
  }
  {
    const N = 600, L = 0.25, I = 1.2, n = N / L, B = mu0 * n * I;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true, applies: ZIM,
      stem: t`A solenoid $25\ \text{cm}$ long has $600$ turns and carries $1.2\ \text{A}$. Using $B = \mu_0 nI$ with $\mu_0 = 4\pi \times 10^{-7}\ \text{H m}^{-1}$, calculate the flux density inside it, in mT, to three significant figures.`,
      value: B * 1e3, unit: "mT", wrong: [mu0 * N * I * 1e3, mu0 * (N / 25) * I * 1e3],
      explanation: t`1. Turns per unit length: $n = 600/0.25 = ${n}\ \text{m}^{-1}$.
2. $B = \mu_0 nI = 4\pi \times 10^{-7} \times ${n} \times 1.2 = ${sciTex(B)}\ \text{T} = ${sfStr(B * 1e3, 3)}\ \text{mT}$.
3. Using the total number of turns instead of turns per metre, or the length in cm, are the usual errors.`,
      hints: ["n is turns per metre."],
    });
  }
  {
    const I1 = 4.0, I2 = 4.0, r = 0.020, L = 2.0;
    const F = Bw(I1, r) * I2 * L;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true, applies: ZIM,
      stem: t`Two long parallel conductors $2.0\ \text{cm}$ apart each carry $4.0\ \text{A}$ in the same direction. Using $B = \mu_0 I/(2\pi r)$ and $F = BIL$, calculate the force on a $2.0\ \text{m}$ length of one conductor, in N, to three significant figures, and state whether it is attractive or repulsive.`,
      value: F, unit: "N", wrong: [Bw(I1, r) * I2, 2 * F],
      explanation: t`1. Field of one wire at the other: $B = \dfrac{4\pi \times 10^{-7} \times 4.0}{2\pi \times 0.020} = ${sciTex(Bw(I1, r))}\ \text{T}$.
2. $F = BIL = ${sciTex(Bw(I1, r))} \times 4.0 \times 2.0 = ${sciTex(F)}\ \text{N}$.
3. Same-direction currents: attractive. Do not double the force: each wire feels ${sciTex(F)} N.`,
      hints: ["Find the field of one wire at the position of the other."],
    });
  }
  {
    const I = 12;
    const rs = [0.02, 0.04];
    const ratio = Bw(I, rs[0]) / Bw(I, rs[1]);
    b.num({
      d: 2, skill: "UNDERSTANDING", daily: true,
      stem: "The magnetic flux density near a long straight wire is inversely proportional to the distance from the wire. A Hall probe is moved from 2.0 cm to 4.0 cm from the wire. By what factor does the reading decrease?",
      value: ratio, wrong: [4],
      explanation: "B ∝ 1/r, so doubling r halves B: the reading falls by a factor of 2 (not 4, which would be an inverse-square law).",
    });
    chk(ratio, 2, 1e-9);
  }
  // Practical / uncertainty
  {
    const B = 60.0, dB = 2.0, r = 4.0, dr = 0.2;
    const pct = pctUnc(dB, B) + pctUnc(dr, r);
    b.num({
      d: 3, skill: "EVALUATION", calculator: true,
      stem: t`A student tests $B \propto 1/r$ near a wire by calculating $Br$. At $r = 4.0 \pm 0.2\ \text{cm}$ the Hall probe reads $B = 60.0 \pm 2.0\ \mu\text{T}$. Calculate the percentage uncertainty in $Br$, to two significant figures.`,
      value: pct, sf: 2, unit: "%", wrong: [pctUnc(dr, r), pctUnc(dB, B)],
      explanation: t`For a product the percentage uncertainties add: $\dfrac{2.0}{60.0} \times 100 + \dfrac{0.2}{4.0} \times 100 = ${sfStr(pctUnc(dB, B), 2)} + ${sfStr(pctUnc(dr, r), 2)} = ${sfStr(pct, 2)}\%$. The distance dominates; measure $r$ to the centre of the wire and the centre of the probe's sensor.`,
      hints: ["Add percentage uncertainties for a product."],
    });
  }
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Magnetic field lines can cross each other where two fields overlap.",
    answer: false,
    explanation: "False. At any point the resultant field has only one direction, so field lines never cross.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each current arrangement with its magnetic field pattern.",
    pairs: [
      ["long straight wire", "concentric circles round the wire"],
      ["long solenoid", "uniform, parallel lines inside; like a bar magnet outside"],
      ["flat circular coil", "circles round each side, straight along the axis at the centre"],
      ["two parallel wires with opposite currents", "fields add between the wires, which repel"],
    ],
    explanation: "Wire: circles; solenoid: uniform inside; flat coil: axial at the centre; opposite currents: fields reinforce between the wires and the wires repel.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements about direction rules.",
    template: "The direction of the magnetic field round a current is given by the {{blank:a}} grip rule. Two parallel wires carrying currents in the same direction {{blank:b}}. A core of {{blank:c}} greatly increases the field of a solenoid.",
    blanks: [
      { id: "a", accepted: ["right-hand"], choices: ["right-hand", "left-hand"] },
      { id: "b", accepted: ["attract"], choices: ["attract", "repel"] },
      { id: "c", accepted: ["soft iron"], choices: ["soft iron", "copper", "aluminium"] },
    ],
    explanation: "Right-hand grip rule; same-direction currents attract; soft iron is ferromagnetic and greatly increases B.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Two long, straight, parallel wires carry currents in the same direction. Explain why they attract each other, and why the forces on the two wires are equal in size even when the currents are different.",
    points: [
      "Each current produces a magnetic field (circles round it), so each wire lies in the field of the other.",
      "At the second wire the field of the first is perpendicular to the second wire, so there is a force on it (F = BIL).",
      "Applying the right-hand grip rule and Fleming's left-hand rule shows each force is directed towards the other wire: attraction.",
      "The forces form a Newton's third law pair (each is proportional to I₁I₂), so they are equal in size and opposite in direction.",
    ],
    modelAnswer: "Each wire is surrounded by a circular magnetic field, so each lies in the other's field, at right angles to it. A current-carrying conductor in a perpendicular field feels a force; the right-hand grip rule gives the field and Fleming's left-hand rule shows that the force on each wire points towards the other, so they attract. The force on wire 2 is B₁I₂L and on wire 1 is B₂I₁L; since B₁ ∝ I₁ and B₂ ∝ I₂ both are proportional to I₁I₂. They are a Newton's third law pair: equal and opposite.",
    explanation: "Field of one at the other; left-hand rule; third-law pair.",
    hints: ["Find the field of wire 1 at wire 2, then use Fleming's left-hand rule."],
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe the magnetic field pattern of a long solenoid carrying a steady current, including how you would find its direction.",
    points: [
      "Inside: straight, parallel, equally spaced lines along the axis (uniform field), weaker near the ends.",
      "Outside: like a bar magnet, lines leaving one end and returning to the other; much weaker.",
      "Direction: right-hand grip rule for coils — fingers curl with the current, thumb points along the field inside (towards the north-pole end).",
    ],
    modelAnswer: "Inside the solenoid the field lines are straight, parallel and equally spaced along the axis, so the field is uniform (it falls to about half at the ends). Outside, the field is weak and has the shape of a bar magnet's field, the lines leaving one end and returning to the other. Curling the right-hand fingers in the direction of the current, the thumb points along the field inside, towards the north pole.",
    explanation: "Uniform inside, bar-magnet outside, right-hand grip.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Explain how a relay allows a small current in one circuit to switch on a large current in a second circuit, such as the motor of a borehole pump.",
    points: [
      "A small current in the coil (wound on a soft-iron core) magnetises the core, making an electromagnet.",
      "The electromagnet attracts a soft-iron armature, which closes the contacts in the second (high-current) circuit.",
      "When the small current stops, the soft iron loses its magnetism and a spring opens the contacts; the two circuits are electrically separate.",
    ],
    modelAnswer: "The control current flows in a coil wound on a soft-iron core, which becomes a strong electromagnet. It pulls a pivoted soft-iron armature towards it, pushing together the contacts of the motor circuit, so the large pump current flows. When the control current stops, the core demagnetises and a spring pulls the armature back, opening the contacts. The two circuits are not electrically connected.",
    explanation: "Electromagnet pulls an armature that closes the second circuit.",
    hints: ["What does the soft-iron core do when the current stops?"],
  });
  // Practice structured: Hall-probe survey of the field near a wire
  {
    const I = 20;
    const rs = [0.010, 0.020, 0.030, 0.050];
    const Bs = rs.map((r) => Bw(I, r) * 1e6);
    const tab = table([t`$r\,/\,\text{cm}$`, t`$B\,/\,\mu\text{T}$`], rs.map((r, i) => [sfStr(r * 100, 2), sfStr(Bs[i], 3)]));
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Farai uses a Hall probe to measure the flux density $B$ at distances $r$ from a long vertical wire carrying a steady $20\ \text{A}$ current upwards. His results are:

${tab}`,
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: "Describe the shape of the field lines round the wire and state their direction when viewed from above.", points: ["Concentric circles centred on the wire, in horizontal planes.", "Anticlockwise when viewed from above (right-hand grip rule, current upwards)."], modelAnswer: "Concentric horizontal circles centred on the wire, getting further apart with distance; anticlockwise when viewed from above." }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate B × r for the first and last rows and hence state the value of B × r, in µT cm, to three significant figures.", value: Bs[0] * 1.0, wrong: [Bs[0]], explanation: t`$${sfStr(Bs[0], 3)} \times 1.0 = ${sfStr(Bs[0], 3)}$ and $${sfStr(Bs[3], 3)} \times 5.0 = ${sfStr(Bs[3] * 5, 3)}$: the product is constant, $${sfStr(Bs[0], 3)}\ \mu\text{T cm}$, so $B \propto 1/r$.` }),
        P.manual({ label: "(c)", marks: 2, stem: "Describe the straight-line graph you would plot to confirm that B is inversely proportional to r, and what it would look like.", points: ["Plot B against 1/r.", "A straight line through the origin confirms B ∝ 1/r."], modelAnswer: "Plot B on the y-axis against 1/r on the x-axis; a straight line through the origin confirms that B is inversely proportional to r." }),
        P.num({ label: "(d)", marks: 1, stem: t`The current is increased to $30\ \text{A}$. Predict the reading at $r = 2.0\ \text{cm}$, in µT, to three significant figures.`, value: Bs[1] * 1.5, unit: "µT", wrong: [Bs[1]], explanation: t`$B \propto I$: $${sfStr(Bs[1], 3)} \times \dfrac{30}{20} = ${sfStr(Bs[1] * 1.5, 3)}\ \mu\text{T}$.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain how Farai should orient the Hall probe, and suggest why he should take each reading twice, once with the current reversed.", points: ["The flat face of the probe must be perpendicular to the field lines (tangential field), i.e. the probe face contains the radius from the wire; rotate for maximum reading.", "Reversing the current reverses B from the wire but not the Earth's field (or any background field); averaging the magnitudes removes the background."], modelAnswer: "The probe's face must be perpendicular to the circular field lines, so he rotates it for the maximum reading. The Earth's field adds to the reading; reversing the current reverses only the wire's field, so averaging the two magnitudes cancels the Earth's contribution." }),
      ],
      explanation: "B ∝ I/r near a long wire: B × r constant; plot B against 1/r.",
      hints: ["Multiply each B by its r.", "B is proportional to the current."],
    });
  }

  // Practice structured: busbars in a switchboard
  {
    const I1 = 400, I2 = 400, r = 0.050, L = 1.5;
    const B = Bw(I1, r), F = B * I2 * L;
    const Fsc = F * 25 ** 2;
    b.struct({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`In a mine's switchboard two long, straight, parallel copper busbars $5.0\ \text{cm}$ apart carry the outgoing and return currents to a motor, $400\ \text{A}$ each, in opposite directions. A length of $1.5\ \text{m}$ runs between supports.`,
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: "State whether the busbars attract or repel, and explain your answer using the field of one busbar at the other.", points: ["Repel.", "The field of one bar at the other is perpendicular to it; by Fleming's left-hand rule (opposite currents) the force on each bar is away from the other."], modelAnswer: "They repel: each bar lies in the circular field of the other, at right angles to it, and for opposite currents Fleming's left-hand rule gives a force on each bar directed away from the other." }),
        P.num({ label: "(b)", marks: 2, stem: t`Using $B = \mu_0 I/(2\pi r)$ and $F = BIL$ with $\mu_0 = 4\pi \times 10^{-7}\ \text{H m}^{-1}$, calculate the force on the $1.5\ \text{m}$ length of one busbar, in N, to three significant figures.`, value: F, unit: "N", wrong: [B * I2], explanation: t`$B = \dfrac{4\pi \times 10^{-7} \times 400}{2\pi \times 0.050} = ${sciTex(B)}\ \text{T}$; $F = BIL = ${sciTex(B)} \times 400 \times 1.5 = ${sfStr(F, 3)}\ \text{N}$.` }),
        P.num({ label: "(c)", marks: 1, stem: "During a short circuit both currents rise to 25 times their normal value. Calculate the new force, in N, to three significant figures.", value: Fsc, unit: "N", wrong: [F * 25], explanation: t`$F \propto I_1I_2$, so the force rises by $25^2 = 625$: $${sfStr(F, 3)} \times 625 = ${sfStr(Fsc, 3)}\ \text{N}$.` }),
        P.manual({ label: "(d)", marks: 1, stem: "Suggest why the busbars must be firmly clamped to insulating supports.", points: ["Fault currents produce very large forces (proportional to I²) that could bend the bars or bring them into contact / break supports."], modelAnswer: "In a short circuit the force grows with the square of the current and becomes large enough to bend the bars or break their supports, so they must be held rigidly." }),
      ],
      explanation: "Opposite currents repel; F = BIL with B = μ₀I/(2πr), so F ∝ I₁I₂.",
      hints: ["Both currents increase, so the force increases by the square of the factor."],
      applies: ZIM,
    });
  }

  b.card("DEFINITION", "**Magnetic field**", "A region in which a moving charge, a current-carrying conductor or a magnetic pole experiences a force.");
  b.card("CONCEPT", "Field of a long straight wire", "Concentric circles round the wire, further apart with distance; right-hand grip rule gives the direction.");
  b.card("CONCEPT", "Field of a solenoid", "Uniform inside (parallel, equally spaced lines along the axis); bar-magnet pattern outside.");
  b.card("CONCEPT", "Right-hand grip rule", "Wire: thumb along current, fingers show field. Coil: fingers with current, thumb shows field inside (north end).");
  b.card("CONCEPT", "Parallel conductors", "Same-direction currents attract; opposite currents repel; the forces are equal and opposite (third-law pair).");
  b.card("FACT", "Soft-iron core", "Greatly increases B and loses its magnetism when the current stops, so it suits electromagnets and relays.");
  b.card("FACT", "Sizes of B", "Earth's field: a few × 10⁻⁵ T; fridge magnet: about 10⁻² T; MRI: 1.5 T or more.");
  b.card("FORMULA", "Extension formulae (ZIMSEC to be confirmed)", t`Wire: $B = \dfrac{\mu_0 I}{2\pi r}$; solenoid: $B = \mu_0 nI$; $\mu_0 = 4\pi \times 10^{-7}\ \text{H m}^{-1}$`, undefined, { applies: ZIM });
});
