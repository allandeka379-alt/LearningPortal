// W3a: aphys.induction.flux-faraday — Φ = BA cos θ, the weber, flux linkage NΦ, Faraday's law, E = BLv, coils
// pushed into/out of fields, flux-linkage graphs, experiments on the factors affecting the e.m.f.
import { concept, P, t, chk, sfStr, dpStr, sciTex, sciPlain, rad, pctUnc, table } from "../lib.mjs";

concept("aphys.induction.flux-faraday", { file: "induction/flux-faraday", keyPrefix: "induction.flux-faraday" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement is Faraday's law of electromagnetic induction?",
    options: [
      ["The induced e.m.f. is equal to the rate of change of magnetic flux linkage.", "Correct: E = Δ(NΦ)/Δt."],
      ["The induced e.m.f. is proportional to the magnetic flux linkage.", "A large steady flux induces nothing; it is the rate of change that matters."],
      ["The induced current always opposes the change producing it.", "This is Lenz's law, which gives the direction."],
      ["The induced e.m.f. is equal to the product of flux density and area.", "BA is the flux itself, not the induced e.m.f."],
    ],
    answer: "A",
    explanation: "Faraday's law: the magnitude of the induced e.m.f. equals the rate of change of flux linkage. Lenz's law gives the direction.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which unit is equivalent to the weber?",
    options: [
      [t`$\text{T m}^2$`, "Correct: Φ = BA."],
      [t`$\text{T m}^{-2}$`, "Flux is B multiplied by area, not divided by it."],
      [t`$\text{V s}^{-1}$`, "From E = ΔΦ/Δt, Wb = V s, not V s⁻¹."],
      [t`$\text{N A}^{-1}\,\text{m}^{-1}$`, "This is the tesla, the unit of flux density."],
    ],
    answer: "A",
    explanation: "Φ = BA, so 1 Wb = 1 T m². From Faraday's law it is also 1 V s.",
  });
  {
    const B = 0.30, A = 0.050, th = 60;
    b.mcq({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: t`A flat loop of area $0.050\ \text{m}^2$ is in a uniform field of $0.30\ \text{T}$. The normal to the loop makes an angle of $60^\circ$ with the field. What is the flux through the loop?`,
      options: [
        [t`$${sciTex(B * A * Math.cos(rad(th)), 2)}\ \text{Wb}$`, "Correct: BA cos 60°."],
        [t`$${sciTex(B * A * Math.sin(rad(th)), 2)}\ \text{Wb}$`, "This uses sin 60°; the angle is between the field and the normal."],
        [t`$${sciTex(B * A, 2)}\ \text{Wb}$`, "This is the flux only when the field is along the normal."],
        [t`$${sfStr(B / A, 2)}\ \text{Wb}$`, "Flux is B times A, not B divided by A."],
      ],
      answer: "A",
      explanation: t`$\Phi = BA\cos\theta = 0.30 \times 0.050 \times \cos 60^\circ = ${sciTex(B * A * Math.cos(rad(th)), 2)}\ \text{Wb}$.`,
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A bar magnet is held stationary inside a coil connected to a sensitive meter. What does the meter show?",
    options: [
      ["zero, because the flux linkage is not changing", "Correct: no change of flux linkage, no induced e.m.f."],
      ["a steady reading, because there is a large flux through the coil", "Flux alone induces nothing; it must change."],
      ["a reading that increases with the strength of the magnet", "A stronger magnet only matters when it moves."],
      ["a reading that reverses every second", "Nothing changes, so nothing is induced."],
    ],
    answer: "A",
    explanation: "An e.m.f. is induced only while the flux linkage changes. With the magnet at rest, ΔΦ = 0, so E = 0.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "The magnet in a coil experiment is pushed in twice as fast, and the coil is replaced by one with three times as many turns. By what factor does the peak induced e.m.f. change?",
    options: [
      ["6", "Correct: twice the rate of change, three times the turns."],
      ["5", "The factors multiply; they do not add."],
      ["1.5", "Both changes increase the e.m.f.; the 2 does not divide."],
      ["3", "The faster motion doubles the rate of change of flux as well."],
    ],
    answer: "A",
    explanation: "E = NΔΦ/Δt: rate × 2 and N × 3 give E × 6.",
    hints: ["Which factors does E = NΔΦ/Δt depend on?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A graph of the flux linkage of a coil against time is a curve. How is the induced e.m.f. at a particular time found from the graph?",
    options: [
      ["from the gradient of the tangent to the curve at that time", "Correct: E = d(NΦ)/dt."],
      ["from the value of the flux linkage at that time", "The size of the flux linkage does not set the e.m.f."],
      ["from the area under the curve up to that time", "The area under an E–t graph gives a flux-linkage change, not the other way round."],
      ["from the flux linkage divided by the time", "This gives an average from t = 0, not the e.m.f. at the instant."],
    ],
    answer: "A",
    explanation: "The induced e.m.f. equals the rate of change of flux linkage: the gradient of the tangent to the NΦ–t graph at that instant.",
    hints: ["E is a rate of change."],
  });
  {
    const B = 4.0e-5, L = 30, v = 250;
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`An aircraft with a wingspan of $30\ \text{m}$ flies horizontally at $250\ \text{m s}^{-1}$ where the vertical component of the Earth's field is $4.0 \times 10^{-5}\ \text{T}$ and the horizontal component is $3.0 \times 10^{-5}\ \text{T}$. What e.m.f. is induced between its wing tips?`,
      options: [
        [t`$${sfStr(B * L * v, 2)}\ \text{V}$`, "Correct: E = BLv with the vertical component."],
        [t`$${sfStr(B * v, 2)}\ \text{V}$`, "The length of the conductor (the wingspan) is missing."],
        [t`$${sfStr((B * L) / v, 2)}\ \text{V}$`, "The speed must multiply, not divide."],
        [t`$${sfStr(3.0e-5 * L * v, 2)}\ \text{V}$`, "This uses the horizontal component, which horizontal wings moving horizontally do not cut."],
      ],
      answer: "A",
      explanation: t`$E = BLv = 4.0 \times 10^{-5} \times 30 \times 250 = ${sfStr(B * L * v, 2)}\ \text{V}$. Only the vertical component of the field is cut by wings moving horizontally.`,
      hints: ["Which component of the Earth's field do horizontal wings cut?"],
    });
  }
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "A flat coil is turned so that its plane is parallel to a uniform magnetic field. Which statement about the flux through it is correct?",
    options: [
      ["The flux is zero because no field lines pass through the coil.", "Correct: θ between B and the normal is 90°, so cos θ = 0."],
      ["The flux is a maximum because the field lines lie along the coil.", "Lines lying in the plane do not pass through it."],
      ["The flux is BA because the coil is fully inside the field.", "Being in the field is not enough; the field must cross the area."],
      ["The flux is BA/2 because half the lines pass each way.", "No lines cross the coil at all."],
    ],
    answer: "A",
    explanation: "Φ = BA cos θ with θ the angle between the field and the normal. With the plane parallel to B, θ = 90° and Φ = 0.",
    hints: ["Find the angle between the field and the normal to the coil."],
  });
  // Numerical
  {
    const N = 250, d = 0.040, B = 0.080, th = 25;
    const A = Math.PI * (d / 2) ** 2;
    const NPhi = N * B * A * Math.cos(rad(th));
    b.num({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: t`A circular coil of $250$ turns and diameter $4.0\ \text{cm}$ has its normal at $25^\circ$ to a uniform field of $0.080\ \text{T}$. Calculate the flux linkage, in Wb, to three significant figures.`,
      value: NPhi, unit: "Wb", wrong: [N * B * Math.PI * d * d * Math.cos(rad(th)), N * B * A * Math.sin(rad(th))],
      explanation: t`$A = \pi(0.020)^2 = ${sciTex(A)}\ \text{m}^2$; $N\Phi = NBA\cos\theta = 250 \times 0.080 \times ${sciTex(A)} \times \cos 25^\circ = ${sciTex(NPhi)}\ \text{Wb}$. Using the diameter as the radius gives four times the area.`,
    });
  }
  {
    const B = 0.25, L = 0.40, v = 3.5;
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: t`A metal rod $40\ \text{cm}$ long moves at $3.5\ \text{m s}^{-1}$ at right angles to its length and to a uniform field of $0.25\ \text{T}$. Calculate the e.m.f. between its ends, in V, to two significant figures.`,
      value: B * L * v, sf: 2, unit: "V", wrong: [B * 40 * v],
      explanation: t`$E = BLv = 0.25 \times 0.40 \times 3.5 = ${sfStr(B * L * v, 2)}\ \text{V}$.`,
    });
  }
  {
    const N = 400, A = 2.5e-4, B1 = 0.15, B2 = 0.045, dt = 0.060;
    const E = (N * A * (B1 - B2)) / dt;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A coil of $400$ turns and cross-sectional area $2.5\ \text{cm}^2$ lies with its plane perpendicular to a magnetic field. The field falls steadily from $0.15\ \text{T}$ to $0.045\ \text{T}$ in $60\ \text{ms}$. Calculate the induced e.m.f., in V, to three significant figures.`,
      value: E, unit: "V", wrong: [(N * A * B1) / dt, (N * 2.5 * (B1 - B2)) / dt],
      explanation: t`1. $A = 2.5\ \text{cm}^2 = 2.5 \times 10^{-4}\ \text{m}^2$.
2. $\Delta(N\Phi) = NA\Delta B = 400 \times 2.5 \times 10^{-4} \times (0.15 - 0.045) = ${sciTex(N * A * (B1 - B2))}\ \text{Wb}$.
3. $E = \dfrac{\Delta(N\Phi)}{\Delta t} = \dfrac{${sciTex(N * A * (B1 - B2))}}{0.060} = ${sfStr(E, 3)}\ \text{V}$.
4. Using the final field instead of the change, or cm² as m², are the usual errors.`,
      hints: ["Use the change in B.", "1 cm² = 10⁻⁴ m²."],
    });
  }
  {
    const N = 120, a = 0.050, B = 0.20, v = 0.25;
    const tIn = a / v;
    const E = N * B * a * v;
    chk(E, (N * B * a * a) / tIn, 1e-12);
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A square coil of $120$ turns and side $5.0\ \text{cm}$ is pushed at a steady $0.25\ \text{m s}^{-1}$ into a region of uniform field $0.20\ \text{T}$ with sharp edges, its plane perpendicular to the field and one side parallel to the edge of the field. Calculate the e.m.f. induced while the coil is entering the field, in V, to two significant figures.`,
      value: E, sf: 2, unit: "V", wrong: [B * a * v, N * B * a * a * v],
      explanation: t`1. Only the leading side (length $0.050\ \text{m}$) cuts the field: each turn has $E = BLv$.
2. $E = NBLv = 120 \times 0.20 \times 0.050 \times 0.25 = ${sfStr(E, 2)}\ \text{V}$.
3. Check with Faraday's law: flux linkage rises from 0 to $NBa^2 = ${sciTex(N * B * a * a)}\ \text{Wb}$ in $a/v = ${sfStr(tIn, 2)}\ \text{s}$, giving the same e.m.f. Once fully inside, the e.m.f. is zero.`,
      hints: ["How long does the coil take to enter the field?"],
    });
  }
  {
    const N = 300, A = 6.0e-4, I1 = 2.0, k = 0.045, dt = 0.020; // B = k I in the coil core region (T/A)
    const E = (N * A * k * I1) / dt;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A search coil of $300$ turns and area $6.0\ \text{cm}^2$ sits inside a long solenoid, its plane at right angles to the axis. The field in the solenoid is $0.045\ \text{T}$ for each ampere of current. The current of $2.0\ \text{A}$ is switched off and falls to zero in $20\ \text{ms}$. Calculate the average e.m.f. induced in the search coil, in V, to two significant figures.`,
      value: E, sf: 2, unit: "V", wrong: [(A * k * I1) / dt, (N * A * k) / dt],
      explanation: t`1. Initial field: $B = 0.045 \times 2.0 = ${sfStr(k * I1, 2)}\ \text{T}$.
2. Change of flux linkage: $NBA = 300 \times ${sfStr(k * I1, 2)} \times 6.0 \times 10^{-4} = ${sciTex(N * k * I1 * A, 2)}\ \text{Wb}$.
3. $E = ${sciTex(N * k * I1 * A, 2)}/0.020 = ${sfStr(E, 2)}\ \text{V}$.`,
      hints: ["Find the initial field from the current."],
    });
  }
  // Uncertainty / experiment
  {
    const B = 0.120, dB = 0.005, L = 0.300, dL = 0.002, v = 2.0, dv = 0.1;
    const pct = pctUnc(dB, B) + pctUnc(dL, L) + pctUnc(dv, v);
    b.num({
      d: 3, skill: "EVALUATION", calculator: true,
      stem: t`A student predicts the e.m.f. across a rod from $E = BLv$ using $B = 0.120 \pm 0.005\ \text{T}$, $L = 0.300 \pm 0.002\ \text{m}$ and $v = 2.0 \pm 0.1\ \text{m s}^{-1}$. Calculate the percentage uncertainty in $E$, to two significant figures.`,
      value: pct, sf: 2, unit: "%", wrong: [pctUnc(dv, v), pctUnc(dB, B) + pctUnc(dv, v)],
      explanation: t`$\dfrac{0.005}{0.120} \times 100 + \dfrac{0.002}{0.300} \times 100 + \dfrac{0.1}{2.0} \times 100 = ${sfStr(pctUnc(dB, B), 2)} + ${sfStr(pctUnc(dL, L), 2)} + 5.0 = ${sfStr(pct, 2)}\%$. The speed dominates; timing the rod with light gates would reduce it.`,
      hints: ["Percentage uncertainties add for a product."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Doubling the number of turns of a coil doubles the e.m.f. induced in it by the same changing magnetic field.",
    answer: true,
    explanation: "True. The same flux change occurs in each turn and the turns are in series, so E = NΔΦ/Δt doubles with N.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each quantity with its unit.",
    pairs: [
      ["magnetic flux", "Wb (T m²)"],
      ["magnetic flux density", "T"],
      ["rate of change of flux linkage", "V"],
      ["flux linkage", "Wb (Wb-turns)"],
    ],
    explanation: "Φ in Wb = T m²; B in T; d(NΦ)/dt in Wb s⁻¹ = V; NΦ in Wb, often called Wb-turns.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements.",
    template: "Magnetic flux is Φ = BA cos θ, where θ is the angle between the field and the {{blank:a}} to the area. Flux linkage is the flux multiplied by the number of {{blank:b}}. The induced e.m.f. equals the {{blank:c}} of change of flux linkage.",
    blanks: [
      { id: "a", accepted: ["normal"], choices: ["normal", "plane", "edge"] },
      { id: "b", accepted: ["turns"], choices: ["turns", "coils of wire per metre", "seconds"] },
      { id: "c", accepted: ["rate"], choices: ["rate", "square", "amount"] },
    ],
    explanation: "Φ = BA cos θ with θ to the normal; NΦ; E = Δ(NΦ)/Δt.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 2,
    stem: "Define magnetic flux and the weber.",
    points: [
      "Magnetic flux: product of the area and the component of the flux density perpendicular to the area (Φ = BA cos θ).",
      "1 Wb is the flux through 1 m² at right angles to a uniform field of 1 T (1 Wb = 1 T m²).",
    ],
    modelAnswer: "Magnetic flux through an area is the area multiplied by the component of the magnetic flux density perpendicular to it. One weber is the flux through an area of 1 m² normal to a uniform field of 1 T.",
    explanation: "Φ = BA cos θ; 1 Wb = 1 T m².",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: t`A rod of length $L$ moves at constant speed $v$ along rails, at right angles to a uniform field $B$, completing a circuit. Show that the induced e.m.f. is $E = BLv$.`,
    points: [
      t`In time $\Delta t$ the rod moves $v\Delta t$ and sweeps out area $\Delta A = Lv\Delta t$.`,
      t`The flux through the circuit changes by $\Delta\Phi = B\Delta A = BLv\Delta t$.`,
      t`Faraday's law: $E = \Delta\Phi/\Delta t = BLv$.`,
    ],
    modelAnswer: t`In a time $\Delta t$ the rod travels $v\Delta t$, increasing the area of the circuit by $Lv\Delta t$. The flux through the circuit increases by $BLv\Delta t$. By Faraday's law $E = \Delta\Phi/\Delta t = BLv$.`,
    explanation: "Area swept per second × B.",
    hints: ["What area does the rod sweep out in time Δt?"],
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Describe an experiment with a bar magnet, a coil and a sensitive centre-zero meter (or data logger) to show the factors that affect the size of an induced e.m.f. State what you would observe.",
    points: [
      "Connect the coil to the meter; push the magnet into the coil and pull it out: deflections in opposite directions; no deflection when the magnet is stationary.",
      "Move the magnet faster: larger (shorter) deflection, showing E depends on the rate of change of flux.",
      "Use a stronger magnet (or two magnets together): larger deflection.",
      "Use a coil with more turns (same speed): larger deflection; with a data logger, compare the peak e.m.f. (e.g. drop the magnet from a fixed height for a repeatable speed).",
    ],
    modelAnswer: "Connect a coil to a centre-zero galvanometer. Pushing a magnet in deflects the needle one way and pulling it out deflects it the other way; with the magnet still there is no deflection. Moving the magnet faster gives a larger, briefer deflection; a stronger magnet or a coil with more turns also gives a larger deflection. To make the speed repeatable, drop the magnet through the coil from a fixed height and record the e.m.f. with a data logger.",
    explanation: "Rate of change, strength of field, number of turns.",
    hints: ["Change one factor at a time."],
  });
  // Practice structured: flux linkage graph
  {
    const N = 300, A = 5.0e-4;
    const ts = [0, 0.2, 0.4, 0.6, 0.8, 0.9, 1.0];
    const Bt = [0, 0.06, 0.12, 0.12, 0.12, 0.06, 0];
    const NP = Bt.map((x) => N * A * x);
    const Erise = (NP[2] - NP[0]) / 0.4;
    const Efall = (NP[4] - NP[6]) / 0.2;
    const tab = table([t`$t\,/\,\text{s}$`, t`$B\,/\,\text{T}$`], ts.map((x, i) => [dpStr(x, 1), dpStr(Bt[i], 2)]));
    b.struct({
      d: 3, skill: "ANALYSIS", calculator: true,
      stem: t`A coil of $300$ turns and area $5.0 \times 10^{-4}\ \text{m}^2$ lies with its plane perpendicular to a magnetic field. The field changes as follows, varying linearly between the readings:

${tab}`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the maximum flux linkage of the coil, in Wb, to two significant figures.", value: NP[2], sf: 2, unit: "Wb", wrong: [A * Bt[2]], explanation: t`$N\Phi = NBA = 300 \times 0.12 \times 5.0 \times 10^{-4} = ${sciTex(NP[2], 2)}\ \text{Wb}$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the size of the induced e.m.f. between t = 0 and t = 0.4 s, in V, to two significant figures.", value: Erise, sf: 2, unit: "V", wrong: [NP[2]], explanation: t`$E = \dfrac{\Delta(N\Phi)}{\Delta t} = \dfrac{${sciTex(NP[2], 2)}}{0.40} = ${sfStr(Erise, 2)}\ \text{V}$.` }),
        P.manual({ label: "(c)", marks: 2, stem: "Describe the graph of induced e.m.f. against time from t = 0 to t = 1.0 s.", points: [t`Constant ${sfStr(Erise, 2)} V from 0 to 0.4 s; zero from 0.4 s to 0.8 s (flux constant).`, t`Constant ${sfStr(Efall, 2)} V of the opposite sign from 0.8 s to 1.0 s (flux falling twice as fast, so twice the e.m.f.).`], modelAnswer: t`A constant ${sfStr(Erise, 2)} V from 0 to 0.4 s, zero between 0.4 s and 0.8 s, and a constant ${sfStr(Efall, 2)} V in the opposite direction from 0.8 s to 1.0 s, because the flux falls in half the time it took to rise.` }),
        P.manual({ label: "(d)", marks: 1, stem: "Explain why the e.m.f. is zero between t = 0.4 s and t = 0.8 s even though the flux linkage is at its maximum.", points: ["The flux linkage is not changing; the e.m.f. depends on its rate of change, not its size."], modelAnswer: "The e.m.f. equals the rate of change of flux linkage, which is zero while the field is constant, however large the flux." }),
      ],
      explanation: "E = gradient of the NΦ–t graph.",
      hints: ["Find the flux linkage at each time first."],
    });
  }
  {
    const B = 0.050, L = 0.60, v = 5.0, R = 0.45;
    const E = B * L * v, I = E / R, F = B * I * L, Pw = F * v;
    chk(Pw, (E * E) / R, 1e-12);
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A copper rod $60\ \text{cm}$ long slides at a steady $5.0\ \text{m s}^{-1}$ along two parallel horizontal rails, at right angles to a uniform vertical field of $0.050\ \text{T}$. The rails are joined at one end, and the total resistance of the circuit is $0.45\ \Omega$.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the induced e.m.f., in V, to two significant figures.", value: E, sf: 2, unit: "V", wrong: [B * 60 * v], explanation: t`$E = BLv = 0.050 \times 0.60 \times 5.0 = ${sfStr(E, 2)}\ \text{V}$.` }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate the current in the circuit, in A, to three significant figures.", value: I, unit: "A", wrong: [E * R], explanation: t`$I = E/R = ${sfStr(E, 2)}/0.45 = ${sfStr(I, 3)}\ \text{A}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the magnetic force on the rod due to this current, in N, to three significant figures.", value: F, unit: "N", wrong: [B * I], explanation: t`$F = BIL = 0.050 \times ${sfStr(I, 3)} \times 0.60 = ${sciTex(F)}\ \text{N}$, opposing the motion.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the power needed to keep the rod moving at constant speed, in W, to three significant figures.", value: Pw, unit: "W", wrong: [F], explanation: t`$P = Fv = ${sciTex(F)} \times 5.0 = ${sciTex(Pw)}\ \text{W}$, equal to $E^2/R$: the work done becomes heat in the circuit.` }),
        P.manual({ label: "(e)", marks: 1, stem: "Explain what happens to the rod's speed if the pushing force is removed.", points: ["The magnetic force (opposing motion) remains while it moves, so the rod decelerates (slows down and stops), its kinetic energy becoming heat in the resistance."], modelAnswer: "The induced current still produces a force opposing the motion, so the rod slows down (ever more gently as the current falls) until it stops, its kinetic energy becoming heat." }),
      ],
      explanation: "E = BLv, I = E/R, F = BIL, P = Fv = E²/R.",
      hints: ["The force on the induced current opposes the motion."],
    });
  }

  b.card("DEFINITION", "**Magnetic flux**", "The product of an area and the component of the magnetic flux density perpendicular to it: Φ = BA cos θ.");
  b.card("DEFINITION", "**Weber**", "The flux through 1 m² at right angles to a uniform field of 1 T (1 Wb = 1 T m² = 1 V s).");
  b.card("DEFINITION", "**Flux linkage**", "The flux through a coil multiplied by its number of turns, NΦ.");
  b.card("DEFINITION", "**Faraday's law**", "The induced e.m.f. equals the rate of change of magnetic flux linkage.");
  b.card("FORMULA", "Faraday's law", t`$E = \dfrac{\Delta(N\Phi)}{\Delta t}$`);
  b.card("FORMULA", "Moving rod", t`$E = BLv$`);
  b.card("CONCEPT", "Ways to change flux linkage", "Change B (move a magnet, switch a current), change the area (moving rod), or change the angle (rotating coil).");
  b.card("CONCEPT", "Graphs", "E = gradient of the NΦ–t graph; area under the E–t graph = change in NΦ.");
  b.card("FACT", "Angle in Φ = BA cos θ", "θ is between the field and the normal to the coil; Φ = 0 when the plane is parallel to the field.");
});
