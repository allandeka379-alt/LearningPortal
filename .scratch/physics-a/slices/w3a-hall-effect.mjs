// W3a: aphys.magnetism.hall-effect (Cambridge only) — origin of the Hall voltage, V_H = BI/(ntq), semiconductors
// versus metals, Hall probe use and calibration.
import { concept, P, t, chk, DATA, sfStr, dpStr, sciTex, sciPlain, rad, pctUnc, linFit, table } from "../lib.mjs";

const e = DATA.e;
const VH = (B, I, n, th) => (B * I) / (n * th * e);

concept("aphys.magnetism.hall-effect", { file: "magnetism/hall-effect", keyPrefix: "magnetism.hall-effect" }, (b) => {
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why does a steady Hall voltage develop across a current-carrying slice in a magnetic field, rather than growing without limit?",
    options: [
      ["Charge builds up until the electric force on each carrier balances the magnetic force.", "Correct: in equilibrium qE_H = Bqv."],
      ["The magnetic force does no work, so the carriers cannot move sideways at all.", "The carriers are deflected sideways at first; that is how the voltage arises."],
      ["The resistance of the slice increases until the current stops.", "The current continues; only the sideways drift stops."],
      ["The magnetic field is cancelled by the field of the moving carriers.", "The applied field remains; it is the electric force that balances the magnetic force."],
    ],
    answer: "A",
    explanation: "Carriers deflected to one face build up charge, creating a transverse electric field. When qE_H = Bqv the net sideways force is zero and V_H stays constant.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Why is a semiconductor, rather than a metal, used in a Hall probe?",
    options: [
      ["It has far fewer charge carriers per unit volume, so the Hall voltage is much larger.", "Correct: V_H ∝ 1/n."],
      ["It has far more charge carriers per unit volume, so the current is larger.", "Semiconductors have fewer carriers, and a larger n would reduce V_H."],
      ["Its carriers have a larger charge than electrons in metals.", "Carriers in both carry a charge of size e."],
      ["It is not affected by temperature, so readings are stable.", "Semiconductors are quite temperature-sensitive; the reason is the small n."],
    ],
    answer: "A",
    explanation: "V_H = BI/(ntq): small n means a large drift speed for a given current, so a large Hall voltage (millivolts rather than microvolts).",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A Hall probe slice is t thick (along the field) and d wide (across which V_H is measured). Which change alone doubles the Hall voltage?",
    options: [
      ["halving t", "Correct: V_H ∝ 1/t."],
      ["doubling d", "The width d cancels in the derivation."],
      ["halving d", "The width does not appear in V_H = BI/(ntq)."],
      ["doubling n", "V_H ∝ 1/n, so this halves the voltage."],
    ],
    answer: "A",
    explanation: "V_H = BI/(ntq): the thickness along the field appears; the width d cancels because V_H = Bvd while v ∝ 1/d.",
    hints: ["Which dimension survives the derivation?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A Hall probe gives its largest reading when held in a field. The probe is now rotated so that the normal to its face makes 60° with the field. What fraction of the largest reading is shown?",
    options: [
      ["0.50", "Correct: only B cos 60° = 0.5B is perpendicular to the face."],
      ["0.87", "This uses sin 60°; the angle is between the field and the normal."],
      ["0.25", "The reading depends on cos θ, not cos² θ."],
      ["0", "The reading is zero only when the field is parallel to the face (θ = 90°)."],
    ],
    answer: "A",
    explanation: "Only the component of B along the normal to the slice deflects the carriers across it: V_H ∝ B cos θ = B cos 60° = 0.5B.",
    hints: ["Which component of B is perpendicular to the slice?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Two slices of different semiconductors carry the same current in the same field. Their Hall voltages have the same size but opposite signs. What does this show?",
    options: [
      ["The charge carriers in one are negative and in the other positive.", "Correct: both kinds of carrier are pushed to the same face, so opposite charges collect there."],
      ["One slice is twice as thick as the other.", "Thickness changes the size of V_H, not its sign."],
      ["The currents in the slices are in opposite directions.", "The stem says the currents are the same."],
      ["One slice has twice the carrier density of the other.", "That would change the size, not the sign."],
    ],
    answer: "A",
    explanation: "Electrons moving one way and holes moving the other way (same current direction) are pushed towards the same face, so that face becomes negative in an n-type slice and positive in a p-type slice.",
    hints: ["Apply the left-hand rule to positive and negative carriers carrying the same current."],
  });
  {
    const B = 0.20, I = 0.040, n = 5.0e22, th = 0.40e-3;
    const V = VH(B, I, n, th);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A semiconductor slice $0.40\ \text{mm}$ thick, with $5.0 \times 10^{22}$ carriers per m³ (charge $e$), carries $40\ \text{mA}$ in a perpendicular field of $0.20\ \text{T}$. What is the Hall voltage?`,
      options: [
        [t`$${sfStr(V * 1e3, 2)}\ \text{mV}$`, "Correct: V_H = BI/(nte)."],
        [t`$${sfStr(VH(B, 40, n, th) * 1e3, 2)}\ \text{mV}$`, "The current was used in mA instead of A, giving a value 1000 times too large."],
        [t`$${sfStr(VH(B, I, n, 0.40) * 1e3 * 1e3, 2)}\ \mu\text{V}$`, "The thickness was used in mm instead of m."],
        [t`$${sfStr(((B * I) / (n * e)) * 1e6, 2)}\ \mu\text{V}$`, "The thickness was left out of the denominator, which also leaves the units wrong."],
      ],
      answer: "A",
      explanation: t`$V_H = \dfrac{0.20 \times 0.040}{5.0 \times 10^{22} \times 0.40 \times 10^{-3} \times 1.60 \times 10^{-19}} = ${sciTex(V, 2)}\ \text{V} = ${sfStr(V * 1e3, 2)}\ \text{mV}$.`,
      hints: ["Convert mm and mA to SI units."],
    });
  }
  // Numerical
  {
    const B = 0.80, I = 7.5, n = 8.5e28, th = 0.20e-3;
    const V = VH(B, I, n, th);
    b.num({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: t`A copper strip $0.20\ \text{mm}$ thick carries $7.5\ \text{A}$ in a field of $0.80\ \text{T}$ perpendicular to its face. Copper has $8.5 \times 10^{28}$ free electrons per m³. Calculate the Hall voltage, in V, to two significant figures.`,
      value: V, sf: 2, unit: "V", wrong: [VH(B, I, n, 0.20)],
      explanation: t`$V_H = \dfrac{BI}{nte} = \dfrac{0.80 \times 7.5}{8.5 \times 10^{28} \times 0.20 \times 10^{-3} \times 1.60 \times 10^{-19}} = ${sciTex(V, 2)}\ \text{V} = ${sfStr(V * 1e6, 2)}\ \mu\text{V}$: very small, which is why metals are not used in probes.`,
    });
  }
  {
    const B = 0.35, I = 15e-3, VHm = 2.6e-3, th = 0.30e-3;
    const n = (B * I) / (VHm * th * e);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A semiconductor slice $0.30\ \text{mm}$ thick carries $15\ \text{mA}$. In a perpendicular field of $0.35\ \text{T}$ the Hall voltage is $2.6\ \text{mV}$. Calculate the number of charge carriers per cubic metre, assuming each carries charge $e$, to two significant figures.`,
      value: n, sf: 2, wrong: [(B * 15) / (VHm * th * e)],
      explanation: t`1. $n = \dfrac{BI}{V_Hte}$.
2. $n = \dfrac{0.35 \times 15 \times 10^{-3}}{2.6 \times 10^{-3} \times 0.30 \times 10^{-3} \times 1.60 \times 10^{-19}} = ${sciTex(n, 2)}\ \text{m}^{-3}$.`,
      hints: ["Rearrange V_H = BI/(ntq) for n."],
    });
  }
  {
    const n = 3.0e22, th = 0.25e-3, wd = 5.0e-3, I = 20e-3;
    const v = I / (n * th * wd * e);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A Hall slice is $5.0\ \text{mm}$ wide and $0.25\ \text{mm}$ thick, with $3.0 \times 10^{22}$ carriers per m³ of charge $e$. It carries $20\ \text{mA}$. Calculate the drift speed of the carriers, in $\text{m s}^{-1}$, to three significant figures.`,
      value: v, unit: "m/s", wrong: [I / (n * th * th * e), I / (n * wd * e)],
      explanation: t`1. $A = dt = 5.0 \times 10^{-3} \times 0.25 \times 10^{-3} = ${sciTex(th * wd)}\ \text{m}^2$.
2. $v = \dfrac{I}{nAe} = \dfrac{20 \times 10^{-3}}{3.0 \times 10^{22} \times ${sciTex(th * wd)} \times 1.60 \times 10^{-19}} = ${sfStr(v, 3)}\ \text{m s}^{-1}$.`,
      hints: ["I = nAvq with A = width × thickness."],
    });
  }
  {
    const n = 3.0e22, th = 0.25e-3, wd = 5.0e-3, I = 20e-3, B = 0.12;
    const v = I / (n * th * wd * e);
    const E = B * v, V = E * wd;
    chk(V, VH(B, I, n, th), 1e-12);
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`For the slice in the previous question ($5.0\ \text{mm}$ wide, $0.25\ \text{mm}$ thick, $3.0 \times 10^{22}$ carriers per m³, $20\ \text{mA}$), placed in a field of $0.12\ \text{T}$, calculate the transverse electric field strength in the steady state, in $\text{V m}^{-1}$, to three significant figures.`,
      value: E, unit: "V/m", wrong: [V, B / v],
      explanation: t`1. Drift speed $v = ${sfStr(v, 3)}\ \text{m s}^{-1}$.
2. Steady state: $eE_H = Bev \Rightarrow E_H = Bv = 0.12 \times ${sfStr(v, 3)} = ${sfStr(E, 3)}\ \text{V m}^{-1}$.
3. Check: $V_H = E_Hd = ${sciTex(V)}\ \text{V}$, the same as $BI/(nte)$.`,
      hints: ["Balance eE against Bev."],
    });
  }
  // Uncertainty
  {
    const V = 3.9, dV = 0.1, I = 25, dI = 0.5, th = 0.20, dth = 0.01;
    const pct = pctUnc(dV, V) + pctUnc(dI, I) + pctUnc(dth, th);
    b.num({
      d: 3, skill: "EVALUATION", calculator: true,
      stem: t`A student calculates $B = V_Hnte/I$ for a known probe from $V_H = 3.9 \pm 0.1\ \text{mV}$, $I = 25.0 \pm 0.5\ \text{mA}$ and $t = 0.20 \pm 0.01\ \text{mm}$ ($n$ and $e$ taken as exact). Calculate the percentage uncertainty in $B$, to two significant figures.`,
      value: pct, sf: 2, unit: "%", wrong: [pctUnc(dth, th), pctUnc(dV, V) + pctUnc(dI, I)],
      explanation: t`$\dfrac{0.1}{3.9} \times 100 + \dfrac{0.5}{25.0} \times 100 + \dfrac{0.01}{0.20} \times 100 = ${sfStr(pctUnc(dV, V), 2)} + 2.0 + 5.0 = ${sfStr(pct, 2)}\%$. The thickness dominates, which is why probes are calibrated in a known field rather than relying on $t$.`,
      hints: ["Add the percentage uncertainties."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The Hall voltage across a slice is proportional to the magnetic flux density when the current is kept constant.",
    answer: true,
    explanation: "True. V_H = BI/(ntq): with I, n, t and q fixed, V_H ∝ B. This is why a calibrated Hall probe reads B directly.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each change to a Hall probe slice (everything else unchanged) with its effect on the Hall voltage.",
    pairs: [
      ["current doubled", "Hall voltage doubles"],
      ["carrier density doubled", "Hall voltage halves"],
      ["width of the slice doubled", "Hall voltage unchanged"],
      ["field reversed", "Hall voltage reverses sign"],
    ],
    explanation: "V_H = BI/(ntq): ∝ I, ∝ 1/n, independent of width d, and its sign follows the direction of B.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements about the Hall effect.",
    template: "In the steady state the {{blank:a}} force on each carrier balances the magnetic force. The Hall voltage is V_H = BI/(ntq), where t is the thickness {{blank:b}} the field. To measure B, the face of the probe is held {{blank:c}} to the field lines.",
    blanks: [
      { id: "a", accepted: ["electric"], choices: ["electric", "gravitational", "frictional"] },
      { id: "b", accepted: ["parallel to"], choices: ["parallel to", "perpendicular to"] },
      { id: "c", accepted: ["perpendicular"], choices: ["perpendicular", "parallel"] },
    ],
    explanation: "qE_H = Bqv; t is measured along B; the face must be perpendicular to B for the maximum reading.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "A thin metal slice carries a current in a magnetic field perpendicular to its face. Explain how a Hall voltage is produced across the slice.",
    points: [
      "The moving charge carriers (electrons) experience a magnetic force BQv perpendicular to both their velocity and the field.",
      "They are pushed to one side (edge) of the slice, which becomes negatively charged; the opposite edge is left positive.",
      "The separated charge creates an electric field across the slice, exerting a force on the carriers opposite to the magnetic force.",
      "Charge builds up until the electric force equals the magnetic force (qE = Bqv); the steady p.d. between the edges is the Hall voltage.",
    ],
    modelAnswer: "The electrons drifting through the slice feel a magnetic force BQv at right angles to their motion and to the field, so they are pushed towards one edge, which becomes negative while the other edge is left positive. This separation of charge sets up a transverse electric field that pushes the electrons the other way. Charge accumulates until the electric force equals the magnetic force, after which the electrons travel straight through and a steady p.d., the Hall voltage, exists between the edges.",
    explanation: "Deflection, charge separation, transverse field, balance.",
    hints: ["Why does the build-up of charge stop?"],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: t`Derive the expression $V_H = \dfrac{BI}{ntq}$ for a slice of width $d$ and thickness $t$, defining any extra symbols you use.`,
    points: [
      t`Steady state: electric force = magnetic force, $qE_H = Bqv$, with $v$ the drift speed.`,
      t`$E_H = V_H/d$, so $V_H = Bvd$.`,
      t`Current $I = nAvq$ with $A = dt$ (n = carriers per unit volume), so $v = I/(ndtq)$.`,
      t`Substituting: $V_H = Bd \cdot \dfrac{I}{ndtq} = \dfrac{BI}{ntq}$ ($d$ cancels).`,
    ],
    modelAnswer: t`In the steady state $qE_H = Bqv$, where $v$ is the drift speed. The field across the width is $E_H = V_H/d$, so $V_H = Bvd$. The current is $I = nAvq$ with $A = dt$ and $n$ the number of carriers per unit volume, giving $v = I/(ndtq)$. Substituting, $V_H = BdI/(ndtq) = BI/(ntq)$.`,
    explanation: "Force balance plus I = nAvq.",
    hints: ["Start with the balance of forces on one carrier."],
  });
  // Practice structured: calibrating and using a Hall probe
  {
    const Bs = [0.040, 0.080, 0.120, 0.160, 0.200];
    const noise = [0.03, -0.04, 0.02, 0.05, -0.03];
    const k = 1 / (2.0e22 * 0.20e-3 * e) * 25e-3 * 1e3; // mV per T
    const Vs = Bs.map((B, i) => Math.round((k * B + noise[i]) * 100) / 100);
    const fit = linFit(Bs, Vs);
    const Vread = 5.20, Bfound = (Vread - fit.c) / fit.m;
    const tab = table([t`$B\,/\,\text{T}$`, t`$V_H\,/\,\text{mV}$`], Bs.map((B, i) => [dpStr(B, 3), dpStr(Vs[i], 2)]));
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Thandeka calibrates a Hall probe, carrying a constant current, by placing it inside a solenoid whose flux density $B$ is known. Her results are:

${tab}`,
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: "State how the probe should be oriented inside the solenoid and why the current through the probe must be kept constant.", points: ["Face of the probe perpendicular to the solenoid's axis (field lines), rotated for maximum reading.", "V_H ∝ I as well as B; a constant current makes V_H depend on B alone."], modelAnswer: "The probe's face must be perpendicular to the axis of the solenoid, adjusted for the maximum reading; the current is kept constant because V_H is proportional to I as well as to B." }),
        P.num({ label: "(b)", marks: 2, stem: t`Plot $V_H$ against $B$ and determine the gradient of the best-fit line, in $\text{mV T}^{-1}$.`, value: fit.m, tol: 1.5, explanation: t`The best-fit line has gradient about $${sfStr(fit.m, 3)}\ \text{mV T}^{-1}$ and passes close to the origin.` }),
        P.num({ label: "(c)", marks: 2, stem: t`The probe is moved near a magnet and reads $5.20\ \text{mV}$. Use your line to determine $B$, in T, to two significant figures.`, value: Bfound, tol: 0.006, unit: "T", wrong: [5.20 * fit.m], explanation: t`$B = V_H/\text{gradient} \approx 5.20/${sfStr(fit.m, 3)} = ${sfStr(Bfound, 2)}\ \text{T}$.` }),
        P.num({ label: "(d)", marks: 2, stem: t`The probe's slice is $0.20\ \text{mm}$ thick and carries $25\ \text{mA}$. Use your gradient to estimate the carrier density $n$, in $\text{m}^{-3}$, to two significant figures.`, value: 25e-3 / (fit.m * 1e-3 * 0.20e-3 * e), sf: 2, tol: 1.0e21, wrong: [25 / (fit.m * 0.20e-3 * e)], explanation: t`Gradient $= \dfrac{I}{nte}$, so $n = \dfrac{I}{\text{gradient} \times te} = \dfrac{25 \times 10^{-3}}{${sfStr(fit.m, 3)} \times 10^{-3} \times 0.20 \times 10^{-3} \times 1.60 \times 10^{-19}} \approx ${sciTex(25e-3 / (fit.m * 1e-3 * 0.20e-3 * e), 2)}\ \text{m}^{-3}$ (gradient converted to V T⁻¹).` }),
      ],
      explanation: "V_H = (I/nte)B: a straight line through the origin; gradient I/(nte).",
      hints: ["The gradient is I/(nte).", "Convert mV to V."],
    });
  }
  {
    const B = 0.15, I = 30e-3, n = 1.2e22, th = 0.50e-3, wd = 3.0e-3;
    const V = VH(B, I, n, th), v = I / (n * th * wd * e);
    b.struct({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A rectangular slice of n-type semiconductor is $3.0\ \text{mm}$ wide and $0.50\ \text{mm}$ thick, with $1.2 \times 10^{22}$ free electrons per m³. It carries a current of $30\ \text{mA}$ along its length, and a field of $0.15\ \text{T}$ acts perpendicular to its broad face.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: t`Calculate the drift speed of the electrons, in $\text{m s}^{-1}$, to three significant figures.`, value: v, unit: "m/s", wrong: [I / (n * wd * wd * e)], explanation: t`$v = \dfrac{I}{nAe} = \dfrac{30 \times 10^{-3}}{1.2 \times 10^{22} \times (3.0 \times 10^{-3} \times 0.50 \times 10^{-3}) \times 1.60 \times 10^{-19}} = ${sfStr(v, 3)}\ \text{m s}^{-1}$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the Hall voltage, in mV, to three significant figures.", value: V * 1e3, unit: "mV", wrong: [VH(B, I, n, wd) * 1e3], explanation: t`$V_H = \dfrac{BI}{nte} = ${sfStr(V * 1e3, 3)}\ \text{mV}$ (or $Bvd$).` }),
        P.manual({ label: "(c)", marks: 2, stem: "The slice is replaced by one of the same size made of a metal. Explain why the Hall voltage becomes far too small to measure easily.", points: ["The metal has a much larger n (about 10⁶ to 10⁷ times larger).", "For the same current the drift speed is correspondingly smaller, so the magnetic force and V_H (∝ 1/n) are tiny (nanovolts)."], modelAnswer: "A metal has millions of times more free electrons per unit volume, so for the same current they drift millions of times more slowly; the magnetic force on each is tiny and V_H ∝ 1/n falls to nanovolts." }),
      ],
      explanation: "I = nAvq gives v; V_H = BI/(nte) = Bvd.",
      hints: ["A = width × thickness."],
    });
  }

  b.card("DEFINITION", "**Hall voltage**", "The p.d. across a current-carrying slice, perpendicular to both current and magnetic field, caused by sideways deflection of the charge carriers.");
  b.card("FORMULA", "Hall voltage", t`$V_H = \dfrac{BI}{ntq}$; $t$ = thickness along the field`);
  b.card("CONCEPT", "Steady state", t`Charge builds up until $qE_H = Bqv$; then $V_H = Bvd$.`);
  b.card("CONCEPT", "Semiconductor probes", "Small n gives large drift speed and a Hall voltage of millivolts; metals give microvolts.");
  b.card("CONCEPT", "Using a Hall probe", "Face perpendicular to B (maximum reading), constant current, calibrated in a known field.");
  b.card("FACT", "Sign of V_H", "Reveals the sign of the charge carriers (electrons or holes).");
  b.card("CONCEPT", "Probe at an angle", "Reads only the component B cos θ normal to its face.");
  b.card("FACT", "Uses of Hall sensors", "Measuring B, rotor position in brushless motors, wheel-speed and position sensors.");
});
