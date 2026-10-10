// W1b: ZIMSEC Paper 3 free-response items (format assumed, see BRIEF): elasticity, fluids, circular motion.
import { concept, P, t, chk, ZIM, DATA, EXAM, checkExam, sfStr, dpStr, sciTex, rad, deg } from "../lib.mjs";

const g = DATA.g;
const A = (k) => `aphys.${k}`;
const area = (d) => (Math.PI * d * d) / 4;

concept(A("solids.stress-strain-young"), { file: "exam/w1b-zimsec", keyPrefix: "exam.w1b-zimsec", applies: ZIM }, (b) => {
  const plan = { examStyle: true, skill: EXAM.ZIM_P3_FREE.skill, secs: EXAM.ZIM_P3_FREE.secs, applies: EXAM.ZIM_P3_FREE.applies, paper: "ZIMSEC P3", calculator: true };

  // Z1: elasticity of a copper wire.
  {
    const L = 2.0, d = 0.7e-3, F = 50, x = 2.2e-3;
    const Aw = area(d), s = F / Aw, e = x / L, E = s / e;
    const En = 0.5 * F * x, u = 0.5 * s * e;
    b.struct({
      ...plan, d: 4,
      concepts: [A("solids.stress-strain-young"), A("solids.elastic-plastic-energy"), A("solids.hookes-law")],
      stem: t`A copper wire of original length $2.00\ \text{m}$ and diameter $0.70\ \text{mm}$ hangs vertically from a rigid support. A load of $50\ \text{N}$ produces an extension of $2.2\ \text{mm}$. The wire obeys Hooke's law over this range.`,
      parts: checkExam(EXAM.ZIM_P3_FREE, [
        P.manual({ label: "(a)", marks: 5, stem: "State Hooke's law, and define tensile stress, tensile strain and the Young modulus.", points: [
          "Hooke's law: extension is directly proportional to the load (force)…",
          "…provided the limit of proportionality is not exceeded.",
          "Tensile stress: tensile force per unit cross-sectional area.",
          "Tensile strain: extension per unit original length.",
          "Young modulus: tensile stress ÷ tensile strain (within the limit of proportionality).",
        ], modelAnswer: "Hooke's law: the extension of a body is directly proportional to the load, provided the limit of proportionality is not exceeded. Tensile stress is the tensile force per unit cross-sectional area. Tensile strain is the extension per unit original length. The Young modulus is the ratio of tensile stress to tensile strain within the limit of proportionality." }),
        P.manual({ label: "(b)", marks: 5, stem: t`Show that the energy stored in a stretched wire obeying Hooke's law is $\tfrac{1}{2}Fx$, and hence that the energy stored per unit volume is $\tfrac{1}{2}\sigma\varepsilon$.`, points: [
          "Work done in stretching = area under the force-extension graph.",
          "Hooke's law: the graph is a straight line through the origin, so the area is a triangle.",
          t`Energy $= \tfrac{1}{2} \times F \times x$.`,
          t`Volume of the wire $= AL$.`,
          t`Energy per unit volume $= \dfrac{\tfrac{1}{2}Fx}{AL} = \tfrac{1}{2}\dfrac{F}{A}\dfrac{x}{L} = \tfrac{1}{2}\sigma\varepsilon$.`,
        ], modelAnswer: t`The energy stored equals the work done, the area under the force-extension graph. For a wire obeying Hooke's law this is a straight line through the origin, so the area is a triangle, $\tfrac{1}{2}Fx$. The volume is $AL$, so the energy per unit volume is $\tfrac{1}{2}Fx/(AL) = \tfrac{1}{2}(F/A)(x/L) = \tfrac{1}{2}\sigma\varepsilon$.` }),
        P.group({ label: "(c)", stem: "Calculate, to three significant figures:", parts: [
          P.num({ label: "(i)", marks: 2, stem: "the stress in the wire, in Pa", value: s, unit: "Pa", wrong: [F / (Math.PI * d * d)], explanation: t`$A = \pi(0.35 \times 10^{-3})^2 = ${sciTex(Aw)}\ \text{m}^2$; $\sigma = 50/${sciTex(Aw)} = ${sciTex(s)}\ \text{Pa}$.` }),
          P.num({ label: "(ii)", marks: 1, stem: "the strain", value: e, wrong: [2.2 / 2], explanation: t`$\varepsilon = 2.2 \times 10^{-3}/2.00 = ${sciTex(e)}$.` }),
          P.num({ label: "(iii)", marks: 2, stem: "the Young modulus of copper, in Pa", value: E, unit: "Pa", wrong: [e / s], explanation: t`$E = \sigma/\varepsilon = ${sciTex(E)}\ \text{Pa}$.` }),
        ] }),
        P.group({ label: "(d)", stem: "Calculate:", parts: [
          P.num({ label: "(i)", marks: 2, stem: "the energy stored in the wire, in J, to three significant figures", value: En, unit: "J", wrong: [F * x], explanation: t`$\tfrac{1}{2}Fx = \tfrac{1}{2} \times 50 \times 2.2 \times 10^{-3} = ${sciTex(En)}\ \text{J}$.` }),
          P.num({ label: "(ii)", marks: 2, stem: t`the energy stored per unit volume, in $\text{J m}^{-3}$, to three significant figures`, value: u, wrong: [s * e], explanation: t`$\tfrac{1}{2}\sigma\varepsilon = ${sciTex(u)}\ \text{J m}^{-3}$ (check: $${sciTex(En)} / (${sciTex(Aw)} \times 2.00) = ${sciTex(En / (Aw * L))}$).` }),
          P.num({ label: "(iii)", marks: 1, stem: "a second identical wire is hung beside the first and the 50 N load is shared equally between them; calculate the new extension, in mm", value: (x / 2) * 1000, unit: "mm", wrong: [x * 2 * 1000], explanation: t`Each wire now carries 25 N, so each extends half as much: $1.1\ \text{mm}$ (the combination is twice as stiff).` }),
        ] }),
      ]),
      explanation: "Definitions, the area-under-graph argument for strain energy, then σ = F/A, ε = x/L, E = σ/ε, Ep = ½Fx and ½σε.",
      hints: ["Area of the wire = πd²/4 with d in metres.", "Energy per unit volume = ½ × stress × strain."],
    });
  }

  // Z2: density, pressure and upthrust.
  {
    const a = 0.5, bb = 0.3, c = 0.2, rho = 680, rw = 1000;
    const V = a * bb * c, m = rho * V, W = m * g;
    const dsub = (rho / rw) * c;
    const pB = rw * g * dsub;
    const U = rw * g * V;
    const Tcord = U - W;
    const acc = (U - W) / m;
    b.struct({
      ...plan, d: 4,
      concepts: [A("forces.density-pressure-upthrust"), A("forces.equilibrium")],
      stem: t`A rectangular block of wood measures $0.50\ \text{m} \times 0.30\ \text{m} \times 0.20\ \text{m}$ and has density $${rho}\ \text{kg m}^{-3}$. It floats in fresh water (density $1000\ \text{kg m}^{-3}$) with its largest face horizontal.`,
      parts: checkExam(EXAM.ZIM_P3_FREE, [
        P.manual({ label: "(a)", marks: 5, stem: "Define density and pressure, state Archimedes' principle, and state the conditions for a floating object to be in equilibrium.", points: [
          "Density: mass per unit volume.",
          "Pressure: normal force per unit area.",
          "Archimedes: the upthrust on an object in a fluid equals the weight of fluid displaced.",
          "Equilibrium: no resultant force (upthrust = weight)…",
          "…and no resultant torque (the upthrust and weight act along the same vertical line).",
        ], modelAnswer: "Density is mass per unit volume; pressure is normal force per unit area. Archimedes' principle: the upthrust on a body in a fluid equals the weight of fluid it displaces. A floating object is in equilibrium when there is no resultant force (upthrust equals weight) and no resultant torque (upthrust and weight act along the same vertical line)." }),
        P.manual({ label: "(b)", marks: 5, stem: t`Derive the expression $p = \rho g h$ for the pressure due to a liquid at depth $h$, and explain why the upthrust on a fully submerged block does not change as it is lowered deeper.`, points: [
          t`Column of liquid of area $A$, height $h$: volume $Ah$, mass $\rho A h$.`,
          t`Weight $\rho A h g$ acts on area $A$.`,
          t`$p = \rho A h g / A = \rho g h$.`,
          "When lowered deeper, the pressures on the top and bottom faces both increase by the same amount.",
          "So the pressure difference, and therefore the upthrust (ρgV), is unchanged (incompressible water and block).",
        ], modelAnswer: t`A column of liquid of cross-sectional area $A$ and height $h$ has volume $Ah$, mass $\rho Ah$ and weight $\rho Ahg$, which rests on the area $A$, so $p = \rho g h$. When a submerged block is lowered, the pressure on its top and bottom faces rises by the same amount, so the difference between them, and the upthrust $\rho g V$, does not change.` }),
        P.group({ label: "(c)", stem: "For the floating block, calculate:", parts: [
          P.num({ label: "(i)", marks: 1, stem: "its weight, in N, to three significant figures", value: W, unit: "N", wrong: [m], explanation: t`$m = 680 \times ${sfStr(V, 2)} = ${sfStr(m, 3)}\ \text{kg}$; $W = mg = ${sfStr(W, 3)}\ \text{N}$.` }),
          P.num({ label: "(ii)", marks: 2, stem: "the depth of the block below the water surface, in m, to three significant figures", value: dsub, unit: "m", wrong: [c - dsub], explanation: t`Upthrust = weight: $1000 \times g \times (0.50 \times 0.30 \times d) = ${sfStr(W, 3)}$, so $d = ${sfStr(dsub, 3)}\ \text{m}$ (that is $0.68 \times 0.20$).` }),
          P.num({ label: "(iii)", marks: 2, stem: "the pressure due to the water on the bottom face, in Pa, to three significant figures", value: pB, unit: "Pa", wrong: [rw * g * c], explanation: t`$p = \rho g d = 1000 \times 9.81 \times ${sfStr(dsub, 3)} = ${sfStr(pB, 3)}\ \text{Pa}$ (check: $p \times$ area $= ${sfStr(pB * a * bb, 3)}\ \text{N}$ = weight).` }),
        ] }),
        P.group({ label: "(d)", stem: "The block is now held completely under water by a vertical cord tied to the bottom of the pond.", parts: [
          P.num({ label: "(i)", marks: 2, stem: "Calculate the upthrust on the block, in N, to three significant figures.", value: U, unit: "N", wrong: [W], explanation: t`$U = \rho g V = 1000 \times 9.81 \times ${sfStr(V, 2)} = ${sfStr(U, 3)}\ \text{N}$.` }),
          P.num({ label: "(ii)", marks: 1, stem: "Calculate the tension in the cord, in N, to three significant figures.", value: Tcord, unit: "N", wrong: [U + W], explanation: t`Upwards $U$ = downwards $W + T$: $T = ${sfStr(U, 3)} - ${sfStr(W, 3)} = ${sfStr(Tcord, 3)}\ \text{N}$.` }),
          P.num({ label: "(iii)", marks: 2, stem: t`The cord is cut. Ignoring water resistance (and the water that moves with the block), calculate the initial acceleration of the block, in $\text{m s}^{-2}$, to three significant figures.`, value: acc, unit: "m/s²", wrong: [Tcord / (rw * V)], explanation: t`Resultant force $= ${sfStr(Tcord, 3)}\ \text{N}$ upwards; $a = ${sfStr(Tcord, 3)}/${sfStr(m, 3)} = ${sfStr(acc, 3)}\ \text{m s}^{-2}$. (In reality drag and the moving water make it smaller.)` }),
        ] }),
      ]),
      explanation: "Floating: upthrust = weight, so the depth is (ρ_wood/ρ_water) × height. Fully submerged: upthrust = ρ_water gV, and the cord supplies the difference.",
      hints: ["Upthrust = weight of water displaced.", "When held under, the cord pulls down: U = W + T."],
    });
  }

  // Z3: banked bends and a loop-the-loop.
  {
    const r = 120, th = 18, m = 1300;
    const v = Math.sqrt(r * g * Math.tan(rad(th)));
    const N = (m * g) / Math.cos(rad(th));
    const R = 8.0, hmin = 2.5 * R, hrel = 25, mr = 65;
    const vb2 = 2 * g * hrel;
    const Nb = mr * g + (mr * vb2) / R;
    b.struct({
      ...plan, d: 5,
      concepts: [A("circular.centripetal-force"), A("circular.angular-speed"), A("energy.gpe-ke")],
      stem: t`Circular motion on roads and at a fairground.`,
      parts: checkExam(EXAM.ZIM_P3_FREE, [
        P.manual({ label: "(a)", marks: 4, stem: "Define the radian and angular speed, and explain why a body moving in a circle at constant speed has an acceleration towards the centre.", points: [
          "Radian: angle subtended at the centre of a circle by an arc equal in length to the radius.",
          "Angular speed: rate of change of angular displacement (angle turned per unit time).",
          "Velocity is a vector whose direction changes continuously, so the body accelerates.",
          "The change in velocity (and so the acceleration) is directed towards the centre.",
        ], modelAnswer: "A radian is the angle subtended at the centre of a circle by an arc equal in length to the radius. Angular speed is the rate of change of angular displacement. In circular motion the velocity's direction changes continuously, so there is an acceleration; the change in velocity points towards the centre, so the acceleration is centripetal." }),
        P.manual({ label: "(b)", marks: 6, stem: t`A car travels round a bend of radius $r$ banked at angle $\theta$. Show that the speed at which no sideways friction is needed satisfies $\tan\theta = \dfrac{v^2}{rg}$. Explain what extra force is needed, and in which direction, if the car travels faster than this speed.`, points: [
          t`Forces: weight $mg$ and normal force $N$ perpendicular to the road, at $\theta$ to the vertical.`,
          t`Vertically: $N\cos\theta = mg$.`,
          t`Horizontally: $N\sin\theta = mv^2/r$ (provides the centripetal force).`,
          t`Dividing: $\tan\theta = v^2/(rg)$.`,
          t`At a higher speed, a larger centripetal force $mv^2/r$ is needed than the normal force's component can give.`,
          "Friction acts down the slope (towards the inside of the bend) to provide the extra; if it is not enough the car slides up and outwards.",
        ], modelAnswer: t`Only the weight and the normal force act. Vertically $N\cos\theta = mg$; horizontally $N\sin\theta = mv^2/r$. Dividing gives $\tan\theta = v^2/(rg)$. At a higher speed more centripetal force is needed, so friction must act down the slope, towards the centre; if the maximum friction is too small the car slides outwards.` }),
        P.group({ label: "(c)", stem: t`A bend of radius $${r}\ \text{m}$ is banked at $${th}^\circ$. Calculate, to three significant figures:`, parts: [
          P.num({ label: "(i)", marks: 2, stem: t`the speed at which no sideways friction is needed, in $\text{m s}^{-1}$`, value: v, unit: "m/s", wrong: [Math.sqrt(r * g * Math.sin(rad(th)))], explanation: t`$v = \sqrt{rg\tan\theta} = \sqrt{${r} \times 9.81 \times \tan ${th}^\circ} = ${sfStr(v, 3)}\ \text{m s}^{-1}$.` }),
          P.num({ label: "(ii)", marks: 2, stem: t`the normal contact force on a $${m}\ \text{kg}$ car at this speed, in N`, value: N, unit: "N", wrong: [m * g * Math.cos(rad(th))], explanation: t`$N = \dfrac{mg}{\cos\theta} = \dfrac{${m} \times 9.81}{\cos ${th}^\circ} = ${sciTex(N)}\ \text{N}$ (larger than the weight).` }),
          P.num({ label: "(iii)", marks: 1, stem: t`the car's angular speed about the centre of the bend, in $\text{rad s}^{-1}$`, value: v / r, unit: "rad/s", wrong: [r / v], explanation: t`$\omega = v/r = ${sfStr(v / r, 3)}\ \text{rad s}^{-1}$.` }),
        ] }),
        P.group({ label: "(d)", stem: t`A roller-coaster car runs without friction round a vertical loop of radius $${R}\ \text{m}$, starting from rest at a height $h$ above the bottom of the loop.`, parts: [
          P.num({ label: "(i)", marks: 1, stem: t`Calculate the minimum speed at the top of the loop for the car to stay on the track, in $\text{m s}^{-1}$, to three significant figures.`, value: Math.sqrt(g * R), unit: "m/s", wrong: [g * R], explanation: t`At the top, with zero normal force, $mg = mv^2/R$: $v = \sqrt{gR} = ${sfStr(Math.sqrt(g * R), 3)}\ \text{m s}^{-1}$.` }),
          P.num({ label: "(ii)", marks: 2, stem: "Calculate the minimum starting height h, in m.", value: hmin, unit: "m", wrong: [2 * R], explanation: t`Energy: $mgh = mg(2R) + \tfrac{1}{2}m(gR)$, so $h = 2R + R/2 = 2.5R = ${hmin}\ \text{m}$.` }),
          P.num({ label: "(iii)", marks: 2, stem: t`The car starts from $h = ${hrel}\ \text{m}$. Calculate the normal contact force on a $${mr}\ \text{kg}$ rider at the bottom of the loop, in N, to three significant figures.`, value: Nb, unit: "N", wrong: [(mr * vb2) / R], explanation: t`$v^2 = 2gh = ${sfStr(vb2, 4)}\ \text{m}^2\,\text{s}^{-2}$; $N = mg + \dfrac{mv^2}{R} = ${sfStr(mr * g, 4)} + ${sfStr((mr * vb2) / R, 4)} = ${sciTex(Nb)}\ \text{N}$, about ${sfStr(Nb / (mr * g), 2)} times the rider's weight.` }),
        ] }),
      ]),
      explanation: "Banked track: N cos θ = mg, N sin θ = mv²/r. Loop: v ≥ √(gR) at the top, energy conservation gives h ≥ 2.5R; at the bottom N = mg + mv²/R.",
      hints: ["Resolve the normal force for the banked bend.", "Use energy conservation between the start and the top of the loop."],
    });
  }
});
