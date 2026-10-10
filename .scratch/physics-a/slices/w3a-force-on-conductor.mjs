// W3a: aphys.magnetism.force-on-conductor — F = BIL sin θ, Fleming's left-hand rule, definition of B and the tesla,
// current balance, d.c. motor and moving-coil meter.
import { concept, P, t, chk, DATA, sfStr, dpStr, sciTex, rad, pctUnc, linFit, table } from "../lib.mjs";

const g = DATA.g;

concept("aphys.magnetism.force-on-conductor", { file: "magnetism/force-on-conductor", keyPrefix: "magnetism.force-on-conductor" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement defines magnetic flux density?",
    options: [
      ["the force per unit current per unit length on a straight conductor at right angles to the field", "Correct: B = F/(IL) with the wire perpendicular to the field."],
      ["the force per unit charge on a stationary charge placed in the field", "A stationary charge feels no magnetic force; this resembles electric field strength."],
      ["the force on a conductor of unit length carrying a current parallel to the field", "A conductor parallel to the field feels no force."],
      ["the magnetic flux passing through a coil of unit length", "Flux density is flux per unit area, not per unit length, and it is defined here by the force."],
    ],
    answer: "A",
    explanation: "B is the force per unit current per unit length on a long straight conductor placed at right angles to the field: B = F/(IL).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is the tesla expressed in SI base units?",
    options: [
      [t`$\text{kg s}^{-2}\,\text{A}^{-1}$`, "Correct: N A⁻¹ m⁻¹ = kg m s⁻² A⁻¹ m⁻¹."],
      [t`$\text{kg m s}^{-2}\,\text{A}^{-1}$`, "This is N A⁻¹; the per-metre has been left out."],
      [t`$\text{kg m}^{2}\,\text{s}^{-2}\,\text{A}^{-1}$`, "This is J A⁻¹ (multiplying by a metre instead of dividing)."],
      [t`$\text{kg s}^{-1}\,\text{A}^{-1}$`, "The newton contains s⁻², not s⁻¹."],
    ],
    answer: "A",
    explanation: t`$B = \dfrac{F}{IL}$: $\dfrac{\text{kg m s}^{-2}}{\text{A m}} = \text{kg s}^{-2}\,\text{A}^{-1}$.`,
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A horizontal wire runs from west to east and carries a current towards the east. The magnetic field is vertically downwards. What is the direction of the force on the wire?",
    options: [
      ["horizontal, towards the north", "Correct: field down, current east: Fleming's left-hand rule gives a force to the north."],
      ["horizontal, towards the south", "This would follow from the right hand or from reversing one of field or current."],
      ["vertically upwards", "The force is perpendicular to the field, so it cannot be vertical here."],
      ["horizontal, towards the east", "The force is perpendicular to the current, not along it."],
    ],
    answer: "A",
    explanation: t`Fleming's left-hand rule: first finger down (field), second finger east (current), thumb north. Check with vectors: $\vec F = I\vec L \times \vec B$, east × down = north.`,
    hints: ["First finger: field; second finger: current; thumb: force."],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A straight wire carrying a current lies in a uniform magnetic field. For which arrangement is the force on the wire zero?",
    options: [
      ["the wire parallel to the field lines", "Correct: θ = 0, so sin θ = 0."],
      ["the wire at right angles to the field lines", "This gives the maximum force, BIL."],
      ["the wire at 45° to the field lines", "sin 45° ≠ 0, so there is a force of about 0.71 BIL."],
      ["the wire at right angles to the field, with the current reversed", "Reversing the current reverses the force; it does not remove it."],
    ],
    answer: "A",
    explanation: "F = BIL sin θ, with θ the angle between the current and the field: the force is zero only when they are parallel (or antiparallel).",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "The current in a wire at right angles to a uniform magnetic field is doubled and the flux density is halved. The wire is then turned so that it makes 30° with the field. How does the new force compare with the original force?",
    options: [
      ["It is half the original force.", "Correct: 2 × ½ × sin 30° = 0.5."],
      ["It is equal to the original force.", "The change of angle reduces the force by sin 30°."],
      ["It is 0.87 times the original force.", "This uses cos 30° instead of sin 30°."],
      ["It is twice the original force.", "Doubling I and halving B cancel; the angle then halves the force."],
    ],
    answer: "A",
    explanation: "F = BIL sin θ: new/old = (½)(2)(sin 30°)/(sin 90°) = 0.5.",
    hints: ["Use F = BIL sin θ with θ between the wire and the field."],
  });
  {
    const B = 0.15, I = 2.5, L = 0.080;
    const F = B * I * L;
    b.mcq({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: t`A wire $8.0\ \text{cm}$ long lies at right angles to a field of $0.15\ \text{T}$ and carries $2.5\ \text{A}$. What is the force on it?`,
      options: [
        [t`$${sfStr(F, 2)}\ \text{N}$`, "Correct: F = BIL."],
        [t`$${sfStr(B * I * 8.0, 2)}\ \text{N}$`, "The length was left in centimetres."],
        [t`$${sfStr((B * L) / I, 2)}\ \text{N}$`, "The current must multiply, not divide."],
        [t`$${sfStr(B * I, 3)}\ \text{N}$`, "This is the force per metre; it must be multiplied by the length."],
      ],
      answer: "A",
      explanation: t`$F = BIL = 0.15 \times 2.5 \times 0.080 = ${sciTex(F, 2)}\ \text{N}$.`,
    });
  }
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why does a simple d.c. motor need a split-ring commutator?",
    options: [
      ["to reverse the current in the coil every half turn so the torque keeps the same rotational sense", "Correct: without it the coil would oscillate about the vertical position."],
      ["to make the current alternating so that the coil rotates faster", "The supply is d.c.; the commutator reverses the coil current to keep the torque in one sense, not to raise the speed."],
      ["to keep the magnetic field radial and of the same strength at every angle of the coil", "A radial field comes from curved pole pieces, not the commutator."],
      ["to prevent sparking and overheating at the brushes as the coil spins round","The commutator's job is to reverse the current, not to cool the brushes."],
    ],
    answer: "A",
    explanation: "After the coil passes the position where its plane is perpendicular to the field, the forces would turn it back. Reversing the current at that moment reverses the forces, so the torque continues in the same sense.",
    hints: ["What would happen to the coil after half a turn without it?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "In a moving-coil meter, the coil turns in a radial magnetic field between curved pole pieces. What is the main reason for using a radial field?",
    options: [
      ["the torque on the coil for a given current is the same at every angle, giving a linear scale", "Correct: the field is always in the plane of the coil."],
      ["the coil experiences no force when it is at rest, so the pointer cannot drift from zero", "The coil always feels a couple when it carries a current."],
      ["it makes the hairspring torque proportional to the current", "The spring torque is proportional to the angle; the radial field makes the magnetic torque independent of angle."],
      ["it stops eddy currents from being induced in the soft-iron core and heating it","Eddy currents (which help damping) are unrelated to the reason for the radial shape."],
    ],
    answer: "A",
    explanation: "With a radial field the plane of the coil is always parallel to the field, so the torque NBILw does not depend on angle. Balanced against a spring torque ∝ angle, the deflection is proportional to the current.",
    hints: ["Compare with a uniform field, where the torque depends on the angle of the coil."],
  });
  // Numerical
  {
    const B = 0.35, I = 6.0, L = 0.20, th = 40;
    const F = B * I * L * Math.sin(rad(th));
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: t`A straight wire $20\ \text{cm}$ long carries $6.0\ \text{A}$ at $40^\circ$ to a uniform magnetic field of $0.35\ \text{T}$. Calculate the force on the wire, in N, to three significant figures.`,
      value: F, unit: "N", wrong: [B * I * L * Math.cos(rad(th)), B * I * L],
      explanation: t`$F = BIL\sin\theta = 0.35 \times 6.0 \times 0.20 \times \sin 40^\circ = ${sfStr(F, 3)}\ \text{N}$. Using $\cos 40^\circ$ gives ${sfStr(B * I * L * Math.cos(rad(th)), 3)} N.`,
    });
  }
  {
    const dm = 1.46e-3, I = 5.0, L = 0.060;
    const B = (dm * g) / (I * L);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A magnet stands on a top-pan balance. A rigid horizontal wire is clamped so that $6.0\ \text{cm}$ of it lies between the poles at right angles to the field, without touching the magnet. When a current of $5.0\ \text{A}$ is switched on, the balance reading increases by $1.46\ \text{g}$. Calculate the flux density between the poles, in T, to three significant figures.`,
      value: B, unit: "T", wrong: [(dm * 1000 * g) / (I * L), dm / (I * L)],
      explanation: t`1. The wire pushes on the magnet with a force equal and opposite to the force on the wire (Newton's third law): $F = \Delta m\,g = 1.46 \times 10^{-3} \times 9.81 = ${sciTex(dm * g)}\ \text{N}$.
2. $B = \dfrac{F}{IL} = \dfrac{${sciTex(dm * g)}}{5.0 \times 0.060} = ${sfStr(B, 3)}\ \text{T}$.
3. Forgetting to convert grams to kilograms gives a value 1000 times too large; forgetting $g$ gives a mass, not a force.`,
      hints: ["Convert the reading change to a force with F = Δm g."],
    });
  }
  {
    const N = 120, B = 0.30, I = 0.25, len = 0.050, w = 0.040;
    const T = N * B * I * len * w;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A rectangular motor coil of $120$ turns is $5.0\ \text{cm}$ long and $4.0\ \text{cm}$ wide. It carries $0.25\ \text{A}$ in a uniform field of $0.30\ \text{T}$. Its long sides are perpendicular to the field and its plane is parallel to the field. Calculate the torque on the coil, in N m, to two significant figures.`,
      value: T, sf: 2, unit: "N m", wrong: [B * I * len * w, N * B * I * len * w * 2],
      explanation: t`1. Force on each long side: $F = NBIL = 120 \times 0.30 \times 0.25 \times 0.050 = ${sfStr(N * B * I * len, 2)}\ \text{N}$.
2. The forces on the two sides are equal and opposite, $0.040\ \text{m}$ apart: torque of a couple $= F \times w$.
3. Torque $= ${sfStr(N * B * I * len, 2)} \times 0.040 = ${sciTex(T, 2)}\ \text{N m}$. Forgetting $N$ gives an answer 120 times too small; multiplying by $2w$ double-counts the couple.`,
      hints: ["Torque of a couple = one force × perpendicular distance between them."],
    });
  }
  {
    const m = 0.012, L = 0.25, B = 0.080;
    const I = (m * g) / (B * L);
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A horizontal copper rod of mass $12\ \text{g}$ and length $25\ \text{cm}$ is held by light flexible leads in a uniform horizontal magnetic field of $0.080\ \text{T}$ at right angles to the rod. Calculate the current needed for the magnetic force to support the whole weight of the rod, in A, to three significant figures.`,
      value: I, unit: "A", wrong: [(12 * g) / (B * L), m / (B * L)],
      explanation: t`1. Weight: $mg = 0.012 \times 9.81 = ${sfStr(m * g, 3)}\ \text{N}$.
2. $BIL = mg \Rightarrow I = \dfrac{mg}{BL} = \dfrac{${sfStr(m * g, 3)}}{0.080 \times 0.25} = ${sfStr(I, 3)}\ \text{A}$.
3. The current must flow in the direction for which Fleming's left-hand rule gives an upward force; reversing it would double the tension in the leads instead.`,
      hints: ["Set BIL equal to mg."],
    });
  }
  // Uncertainty
  {
    const dm = 1.12, ddm = 0.02, I = 3.5, dI = 0.1, L = 5.5, dL = 0.1;
    const pct = pctUnc(ddm, dm) + pctUnc(dI, I) + pctUnc(dL, L);
    b.num({
      d: 3, skill: "EVALUATION", calculator: true,
      stem: t`In a current-balance experiment $B = \Delta m\,g/(IL)$. The readings are $\Delta m = 1.12 \pm 0.02\ \text{g}$, $I = 3.5 \pm 0.1\ \text{A}$ and $L = 5.5 \pm 0.1\ \text{cm}$. Calculate the percentage uncertainty in $B$, to two significant figures.`,
      value: pct, sf: 2, unit: "%", wrong: [pctUnc(ddm, dm), pctUnc(dI, I) - pctUnc(ddm, dm) - pctUnc(dL, L)],
      explanation: t`Percentage uncertainties add for products and quotients: $\dfrac{0.02}{1.12} \times 100 + \dfrac{0.1}{3.5} \times 100 + \dfrac{0.1}{5.5} \times 100 = ${sfStr(pctUnc(ddm, dm), 2)} + ${sfStr(pctUnc(dI, I), 2)} + ${sfStr(pctUnc(dL, L), 2)} = ${sfStr(pct, 2)}\%$ ($g$ is taken as exact). The current contributes most.`,
      hints: ["All three measured quantities contribute."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Reversing both the current in a wire and the direction of the magnetic field reverses the force on the wire.",
    answer: false,
    explanation: "False. Reversing either one reverses the force; reversing both leaves the force in the original direction.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each finger of Fleming's left-hand rule, or device, with what it represents or relies on.",
    pairs: [
      ["first finger", "magnetic field (N to S)"],
      ["second finger", "conventional current"],
      ["thumb", "force (motion)"],
      ["split-ring commutator", "reversing the coil current every half turn"],
    ],
    explanation: "Left hand: First = Field, seCond = Current, thuMb = Motion. The commutator keeps a d.c. motor turning one way.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements.",
    template: "The force on a conductor in a magnetic field is F = BIL × {{blank:a}}, where the angle is between the current and the field. One tesla equals one newton per {{blank:b}} per metre. A moving-coil meter uses a {{blank:c}} field so that its scale is linear.",
    blanks: [
      { id: "a", accepted: ["sin θ"], choices: ["sin θ", "cos θ", "tan θ"] },
      { id: "b", accepted: ["ampere"], choices: ["ampere", "coulomb", "volt"] },
      { id: "c", accepted: ["radial"], choices: ["radial", "uniform", "alternating"] },
    ],
    explanation: "F = BIL sin θ; 1 T = 1 N A⁻¹ m⁻¹; a radial field makes the torque independent of angle.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 2,
    stem: "Define the tesla.",
    points: [
      "The uniform flux density that produces a force of 1 N on each metre of a long straight conductor carrying a current of 1 A…",
      "…placed at right angles to the field.",
    ],
    modelAnswer: "One tesla is the uniform magnetic flux density that exerts a force of 1 N per metre on a long straight wire carrying a current of 1 A at right angles to the field.",
    explanation: "1 T = 1 N A⁻¹ m⁻¹, with the wire perpendicular to the field.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 5,
    stem: "Describe how you would use a top-pan balance, a U-shaped magnet, a rigid straight wire and an ammeter to determine the flux density between the poles of the magnet. Include how you would analyse the results.",
    points: [
      "Magnet on the balance; wire clamped horizontally between the poles at right angles to the field, not touching the magnet; length L in the field measured with a ruler (pole-face width).",
      "Zero (tare) the balance with no current; switch on the current I (from a variable supply, measured with the ammeter) and record the change in reading Δm.",
      "Force on magnet equals force on wire (Newton's third law): F = Δm g.",
      "Repeat for several currents (and with the current reversed, averaging magnitudes).",
      "Plot F (or Δm g) against I: straight line through origin; gradient = BL, so B = gradient/L.",
    ],
    modelAnswer: "Stand the magnet on the balance and clamp the rigid wire horizontally between the poles at right angles to the field, so it does not touch the magnet; measure the length of wire in the field (the width of the pole faces). Tare the balance, pass a current I measured by the ammeter and record the change in reading Δm. By Newton's third law the force on the magnet equals the force on the wire, F = Δm g. Repeat for about six currents, each also reversed, averaging the magnitudes. Plot F against I: a straight line through the origin with gradient BL, so B = gradient ÷ L.",
    explanation: "F = Δm g = BIL; plot F against I; gradient = BL.",
    hints: ["Why does the balance reading change at all?"],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "A rectangular coil carrying a current is free to turn in a uniform magnetic field. Explain why there is a torque on it when its plane is parallel to the field, and why the torque falls to zero as the coil turns until its plane is perpendicular to the field.",
    points: [
      "The two sides perpendicular to the field carry opposite currents, so they feel equal and opposite forces (F = NBIL) — a couple.",
      "When the plane is parallel to the field the forces act perpendicular to the plane, a full coil-width apart, giving maximum torque.",
      "As the coil turns the forces stay the same but the perpendicular distance between their lines of action decreases; when the plane is perpendicular to the field the forces act along the same line (in the plane of the coil), so the torque is zero.",
    ],
    modelAnswer: "The two sides of the coil that are perpendicular to the field carry currents in opposite directions, so they feel equal and opposite forces NBIL: a couple. With the plane parallel to the field these forces are a full coil-width apart, giving the maximum torque. As the coil rotates, the forces do not change but the perpendicular distance between their lines of action shrinks; when the plane is perpendicular to the field the forces act along the same line and the torque is zero.",
    explanation: "Torque of a couple = force × perpendicular distance.",
    hints: ["The forces stay perpendicular to the field as the coil turns."],
  });
  // Practice structured: current balance data with a graph
  {
    const I = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0];
    const L = 0.040, Btrue = 0.085;
    const noise = [0.01, -0.01, 0.01, 0.00, -0.02, 0.01];
    const dmg = I.map((x, i) => Math.round(((Btrue * x * L) / g * 1000 + noise[i]) * 100) / 100);
    const fit = linFit(I, dmg);
    const B = ((fit.m / 1000) * g) / L;
    const tab = table([t`$I\,/\,\text{A}$`, t`$\Delta m\,/\,\text{g}$`], I.map((x, i) => [dpStr(x, 1), dpStr(dmg[i], 2)]));
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Rudo measures the change $\Delta m$ in the reading of a top-pan balance supporting a magnet when a current $I$ passes through a horizontal wire held at right angles to the field between its poles. The length of wire in the field is $4.0\ \text{cm}$.

${tab}`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: t`Calculate the force on the wire when $I = 1.5\ \text{A}$, in N, to two significant figures.`, value: dmg[2] * 1e-3 * g, sf: 2, unit: "N", wrong: [dmg[2] * g], explanation: t`$F = \Delta m\,g = ${dpStr(dmg[2], 2)} \times 10^{-3} \times 9.81 = ${sciTex(dmg[2] * 1e-3 * g, 2)}\ \text{N}$.` }),
        P.num({ label: "(b)", marks: 2, stem: t`Plot $\Delta m$ against $I$ and determine the gradient of the best-fit line, in $\text{g A}^{-1}$.`, value: fit.m, tol: 0.012, explanation: t`A best-fit line through the six points has a gradient of about $${dpStr(fit.m, 3)}\ \text{g A}^{-1}$, passing very close to the origin.` }),
        P.num({ label: "(c)", marks: 2, stem: "Use your gradient to determine B, in T.", value: B, tol: 0.0035, unit: "T", wrong: [fit.m / L], explanation: t`Gradient $= BL/g$ (in kg A⁻¹), so $B = \dfrac{${dpStr(fit.m, 3)} \times 10^{-3} \times 9.81}{0.040} \approx ${sfStr(B, 2)}\ \text{T}$.` }),
        P.manual({ label: "(d)", marks: 1, stem: "State what feature of the graph shows that the force is proportional to the current.", points: ["A straight line passing through the origin."], modelAnswer: "The points lie on a straight line through the origin." }),
        P.manual({ label: "(e)", marks: 2, stem: "Suggest two reasons why the readings may be inaccurate and how each could be reduced.", points: ["The wire heats up and its length/position may shift, or the current drifts: switch on only briefly; use a rheostat to keep I steady.", "The field is not uniform near the edges of the poles, so the effective length is uncertain: use wider pole pieces or a longer magnet; or the balance resolution (0.01 g) is a large fraction of the smallest readings: use larger currents or a more sensitive balance."], modelAnswer: t`The wire warms and the current drifts, so switch on only while reading and adjust a rheostat to keep I steady. The field spreads beyond the pole faces, so the effective length is not exactly 4.0 cm; use larger pole pieces (or find the effective length by calibration). Also, 0.01 g resolution is a large fraction of ${dpStr(dmg[0], 2)} g, so use larger currents.` }),
      ],
      explanation: "F = Δm g = BIL; gradient of Δm against I is BL/g.",
      hints: ["Convert grams to kilograms before multiplying by g."],
    });
    chk(Math.abs(B - Btrue) < 0.003 ? 1 : 0, 1);
  }
  {
    const N = 80, B = 0.25, I = 0.40, len = 0.060, w = 0.030;
    const F = N * B * I * len, Tmax = F * w, T30 = Tmax * Math.cos(rad(30));
    b.struct({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A model motor has a rectangular coil of $80$ turns, $6.0\ \text{cm}$ long and $3.0\ \text{cm}$ wide, in a uniform field of $0.25\ \text{T}$. The current in the coil is $0.40\ \text{A}$; the long sides stay perpendicular to the field as the coil turns.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the force on one long side of the coil, in N, to two significant figures.", value: F, sf: 2, unit: "N", wrong: [B * I * len], explanation: t`$F = NBIL = 80 \times 0.25 \times 0.40 \times 0.060 = ${sfStr(F, 2)}\ \text{N}$.` }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate the maximum torque on the coil, in N m, to two significant figures.", value: Tmax, sf: 2, unit: "N m", wrong: [F * len], explanation: t`Torque $= F \times w = ${sfStr(F, 2)} \times 0.030 = ${sciTex(Tmax, 2)}\ \text{N m}$ (plane parallel to the field).` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the torque when the plane of the coil has turned through 30° from the parallel position, in N m, to three significant figures.", value: T30, unit: "N m", wrong: [Tmax * Math.sin(rad(30))], explanation: t`The perpendicular distance between the forces is now $w\cos 30^\circ$: torque $= ${sciTex(Tmax, 2)} \times \cos 30^\circ = ${sciTex(T30)}\ \text{N m}$.` }),
        P.manual({ label: "(d)", marks: 1, stem: "State the torque when the plane of the coil is perpendicular to the field, and explain what the commutator does at this position.", points: ["Zero torque; the commutator reverses the current so that the torque continues in the same sense after this position."], modelAnswer: "The torque is zero; the split-ring commutator reverses the current here so that once the coil's momentum carries it past, the torque keeps turning it the same way." }),
      ],
      explanation: "F = NBIL on each side; torque = F × perpendicular separation.",
      hints: ["Find the perpendicular distance between the two forces."],
    });
  }

  b.card("DEFINITION", "**Magnetic flux density**", "The force per unit current per unit length on a long straight conductor at right angles to the field.");
  b.card("DEFINITION", "**Tesla**", "1 T is the flux density giving a force of 1 N on each metre of a wire carrying 1 A at right angles to the field (1 T = 1 N A⁻¹ m⁻¹).");
  b.card("FORMULA", "Force on a conductor", t`$F = BIL\sin\theta$, $\theta$ between current and field`);
  b.card("CONCEPT", "Fleming's left-hand rule", "First finger: field; second finger: conventional current; thumb: force (motion).");
  b.card("CONCEPT", "Current balance", "F = Δm g = BIL; plot F against I; B = gradient/L.");
  b.card("CONCEPT", "Torque on a coil", "Opposite sides feel equal, opposite forces NBIL: a couple; maximum when the plane is parallel to the field.");
  b.card("FACT", "Commutator", "Reverses the coil current every half turn so a d.c. motor keeps turning the same way.");
  b.card("FACT", "Radial field in a meter", "Torque is independent of angle, so deflection ∝ current: a linear scale.");
});
