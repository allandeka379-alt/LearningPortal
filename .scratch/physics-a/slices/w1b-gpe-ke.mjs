// W1b: aphys.energy.gpe-ke — ΔEp = mgΔh and Ek = ½mv², derivations and energy problems.
import { concept, P, t, chk, DATA, sfStr, dpStr, sciTex, rad, pctUnc, mean, halfRange } from "../lib.mjs";

const g = DATA.g;
concept("aphys.energy.gpe-ke", { file: "energy/gpe-ke", keyPrefix: "energy.gpe-ke" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: t`The derivation of $E_K = \tfrac{1}{2}mv^2$ uses $W = Fs$ and $F = ma$. Which equation of motion completes it?`,
    options: [
      [t`$v^2 = u^2 + 2as$`, t`Correct: with $u = 0$, $as = \tfrac{1}{2}v^2$, so $W = mas = \tfrac{1}{2}mv^2$.`],
      [t`$v = u + at$`, "This introduces time, which is not in W = Fs."],
      [t`$s = ut + \tfrac{1}{2}at^2$`, "This also needs t; it can be used only with extra steps."],
      [t`$s = \tfrac{(u + v)}{2}t$`, "This links s and t, not s and a directly."],
    ],
    answer: "A",
    explanation: t`$W = Fs = mas$; from $v^2 = 0 + 2as$, $as = v^2/2$, so $W = \tfrac{1}{2}mv^2$.`,
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A car's speed doubles. By what factor does its kinetic energy increase?",
    options: [
      ["4", "Correct: Ek ∝ v², and 2² = 4."],
      ["2", "This would be true if Ek were proportional to v."],
      ["8", "Ek depends on v², not v³."],
      ["√2", "This inverts the relationship."],
    ],
    answer: "A",
    explanation: t`$E_K = \tfrac{1}{2}mv^2$, so doubling $v$ multiplies $E_K$ by $2^2 = 4$, and the braking distance at a given braking force also by 4.`,
  });
  {
    const h = 5.0;
    const v = Math.sqrt(2 * g * h);
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: t`A ball is dropped from rest from a height of $5.0\ \text{m}$. Ignoring air resistance, what is its speed just before it hits the ground?`,
      options: [
        [t`$${sfStr(v, 3)}\ \text{m s}^{-1}$`, "Correct: v = √(2gh)."],
        [t`$${sfStr(2 * g * h, 3)}\ \text{m s}^{-1}$`, "This is v², not v: the square root was not taken."],
        [t`$${sfStr(Math.sqrt(g * h), 3)}\ \text{m s}^{-1}$`, "This loses the factor 2 from ½mv² = mgh."],
        [t`$${sfStr(g * h, 3)}\ \text{m s}^{-1}$`, "This multiplies g by h; it has the wrong unit (m² s⁻²)."],
      ],
      answer: "A",
      explanation: t`$mgh = \tfrac{1}{2}mv^2 \Rightarrow v = \sqrt{2gh} = \sqrt{2 \times 9.81 \times 5.0} = ${sfStr(v, 3)}\ \text{m s}^{-1}$.`,
      hints: ["Equate the loss of GPE to the gain of KE."],
    });
  }
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A ball falls freely from rest. A graph is plotted of its kinetic energy against its height above the ground. Which description is correct?",
    options: [
      ["A straight line with a negative gradient of magnitude mg", "Correct: Ek = mg(H − h), linear in h."],
      ["A curve that gets steeper as the height decreases", "Ek against time curves; against height it is linear."],
      ["A straight line through the origin with gradient mg", "This is the GPE against height graph."],
      ["A horizontal line, because energy is conserved", "The total energy is constant; Ek alone changes."],
    ],
    answer: "A",
    explanation: t`$E_K = mg(H - h) = mgH - mgh$: a straight line of gradient $-mg$ against height $h$, reaching $mgH$ at the ground. Against time it is a parabola because $v = gt$.`,
    hints: ["Write Ek in terms of the starting height H and the height h."],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Two balls of masses m and 3m are dropped together from the same height. Air resistance is negligible. Which statement is correct just before they land?",
    options: [
      ["They have the same speed; the heavier ball has three times the kinetic energy.", "Correct: v = √(2gh) does not depend on mass; Ek = ½mv² does."],
      ["The heavier ball is faster and has nine times the kinetic energy.", "Both balls have the same acceleration g, so they reach the same speed."],
      ["They have the same speed and the same kinetic energy.", "Kinetic energy is proportional to mass at the same speed."],
      ["The lighter ball is faster, because it needs less energy to move.", "With no air resistance both fall with acceleration g."],
    ],
    answer: "A",
    explanation: "mgh = ½mv² gives v = √(2gh), independent of mass. The kinetic energies are in the ratio of the masses, 1 : 3.",
    hints: ["Does m cancel in mgh = ½mv²?"],
  });
  b.mcq({
    d: 4, skill: "APPLICATION",
    stem: t`A block slides from rest down a smooth slope of length $L$ inclined at angle $\theta$ to the horizontal. What is its speed at the bottom?`,
    options: [
      [t`$\sqrt{2gL\sin\theta}$`, t`Correct: the height fallen is $L\sin\theta$.`],
      [t`$\sqrt{2gL\cos\theta}$`, t`$L\cos\theta$ is the horizontal distance, not the height.`],
      [t`$\sqrt{2gL}$`, "This treats the slope length as the vertical height."],
      [t`$\sqrt{gL\sin\theta}$`, "The factor 2 from ½mv² is missing."],
    ],
    answer: "A",
    explanation: t`Height fallen $\Delta h = L\sin\theta$. With no friction, $mgL\sin\theta = \tfrac{1}{2}mv^2$, so $v = \sqrt{2gL\sin\theta}$, the same as falling vertically through the same height.`,
    hints: ["Find the vertical height of the slope."],
  });
  {
    const m = 1200, u = 10, v = 20;
    const W = 0.5 * m * (v * v - u * u);
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: t`A car of mass $1200\ \text{kg}$ accelerates from $10\ \text{m s}^{-1}$ to $20\ \text{m s}^{-1}$. What is the gain in its kinetic energy?`,
      options: [
        [t`$${sciTex(W, 2)}\ \text{J}$`, "Correct: ½ × 1200 × (20² − 10²)."],
        [t`$${sciTex(0.5 * m * (v - u) ** 2, 2)}\ \text{J}$`, "This squares the change in speed, ½m(v − u)², which is not the change in kinetic energy."],
        [t`$${sciTex(0.5 * m * v * v, 2)}\ \text{J}$`, "This is the final kinetic energy, not the gain."],
        [t`$${sciTex(m * (v - u), 2)}\ \text{J}$`, "This is the change in momentum (in N s), not an energy."],
      ],
      answer: "A",
      explanation: t`$\Delta E_K = \tfrac{1}{2}m(v^2 - u^2) = \tfrac{1}{2} \times 1200 \times (400 - 100) = ${sciTex(W, 2)}\ \text{J}$.`,
      hints: ["Work out each kinetic energy and subtract."],
    });
  }
  {
    const m = 65, h = 350;
    b.num({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: t`A hiker of mass $65\ \text{kg}$ climbs a path in the Chimanimani mountains, gaining $350\ \text{m}$ in height. Calculate her gain in gravitational potential energy, in J, to three significant figures.`,
      value: m * g * h, unit: "J", wrong: [m * h],
      explanation: t`$\Delta E_P = mg\Delta h = 65 \times 9.81 \times 350 = ${sciTex(m * g * h)}\ \text{J}$. Only the vertical gain matters, not the length of the path.`,
    });
  }
  {
    const h = 3.2;
    const v = Math.sqrt(2 * g * h);
    b.num({
      d: 3, skill: "APPLICATION", daily: true, calculator: true,
      stem: t`A diver steps off a platform $3.2\ \text{m}$ above the water. Ignoring air resistance, calculate her speed as she reaches the water, in $\text{m s}^{-1}$, to three significant figures.`,
      value: v, unit: "m/s", wrong: [2 * g * h, Math.sqrt(g * h)],
      explanation: t`$v = \sqrt{2gh} = \sqrt{2 \times 9.81 \times 3.2} = ${sfStr(v, 3)}\ \text{m s}^{-1}$.`,
      hints: ["Loss of GPE = gain of KE; the mass cancels."],
    });
  }
  {
    const m = 70, L = 120, th = 15, f = 45;
    const h = L * Math.sin(rad(th));
    const KE = m * g * h - f * L;
    const v = Math.sqrt((2 * KE) / m);
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A $70\ \text{kg}$ sand-boarder starts from rest at the top of a dune slope $120\ \text{m}$ long, inclined at $15^\circ$ to the horizontal. The average resistive force on him is $45\ \text{N}$. Calculate his speed at the bottom, in $\text{m s}^{-1}$, to three significant figures.`,
      value: v, unit: "m/s", wrong: [Math.sqrt(2 * g * h), Math.sqrt((2 * (m * g * L * Math.cos(rad(th)) - f * L)) / m)],
      explanation: t`1. Height fallen $= 120\sin 15^\circ = ${sfStr(h, 4)}\ \text{m}$; loss of $E_P = 70 \times 9.81 \times ${sfStr(h, 4)} = ${sfStr(m * g * h, 4)}\ \text{J}$.
2. Work against resistance $= 45 \times 120 = ${f * L}\ \text{J}$.
3. $E_K = ${sfStr(m * g * h, 4)} - ${f * L} = ${sfStr(KE, 4)}\ \text{J}$.
4. $v = \sqrt{2 \times ${sfStr(KE, 4)} / 70} = ${sfStr(v, 3)}\ \text{m s}^{-1}$ (without resistance, $${sfStr(Math.sqrt(2 * g * h), 3)}\ \text{m s}^{-1}$).`,
      hints: ["Height = slope length × sin 15°.", "Resistance acts over the full 120 m."],
    });
  }
  {
    const m = 2.0e4, h = 150, u = 15, v = 25;
    const E = m * g * h - 0.5 * m * (v * v - u * u);
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A haulage truck of mass $2.0 \times 10^{4}\ \text{kg}$ descends a long hill, dropping $150\ \text{m}$ in height. Its speed increases from $15\ \text{m s}^{-1}$ to $25\ \text{m s}^{-1}$. Calculate the energy dissipated by its brakes and resistive forces, in J, to three significant figures.`,
      value: E, unit: "J", wrong: [m * g * h - 0.5 * m * (v - u) ** 2, m * g * h],
      explanation: t`1. Loss of $E_P = 2.0 \times 10^{4} \times 9.81 \times 150 = ${sciTex(m * g * h)}\ \text{J}$.
2. Gain in $E_K = \tfrac{1}{2} \times 2.0 \times 10^{4} \times (25^2 - 15^2) = ${sciTex(0.5 * m * (v * v - u * u), 2)}\ \text{J}$.
3. Dissipated $= ${sciTex(m * g * h)} - ${sciTex(0.5 * m * (v * v - u * u), 2)} = ${sciTex(E)}\ \text{J}$, mostly as thermal energy in the brakes.`,
      hints: ["Loss of GPE = gain in KE + energy dissipated.", "Gain in KE uses v² − u², not (v − u)²."],
    });
  }
  {
    const v = 2.4;
    const h = (v * v) / (2 * g);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A child on a swing moves through the lowest point at $2.4\ \text{m s}^{-1}$. Ignoring air resistance, how high above the lowest point does she rise, in m, to three significant figures?`,
      value: h, unit: "m", wrong: [v / (2 * g), (v * v) / g],
      explanation: t`$\tfrac{1}{2}mv^2 = mgh \Rightarrow h = \dfrac{v^2}{2g} = \dfrac{2.4^2}{2 \times 9.81} = ${sfStr(h, 3)}\ \text{m}$.`,
      hints: ["All the kinetic energy becomes potential energy at the top of the swing."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A ball moving at 5 m/s to the left has the same kinetic energy as an identical ball moving at 5 m/s to the right.",
    answer: true,
    explanation: "True. Kinetic energy depends on v², a scalar; it has no direction. (Their momenta are opposite, because momentum is a vector.)",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "ΔEp = mgΔh gives the change in potential energy of a rocket rising from the ground to a height of 2000 km.",
    answer: false,
    explanation: "False. mgΔh assumes g is constant, which is true only for heights much smaller than the Earth's radius (6400 km). Over 2000 km, g falls noticeably; the radial-field expression −GMm/r must be used.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each quantity with its expression.",
    pairs: [
      ["kinetic energy", t`$\tfrac{1}{2}mv^2$`],
      ["change in gravitational potential energy near the Earth", t`$mg\Delta h$`],
      ["speed after falling from rest through height h (no resistance)", t`$\sqrt{2gh}$`],
      ["change in kinetic energy from speed u to v", t`$\tfrac{1}{2}m(v^2 - u^2)$`],
    ],
    explanation: "These follow from Ek = ½mv², ΔEp = mgΔh and energy conservation.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the derivation of the change in gravitational potential energy.",
    template: "To lift a mass m at constant speed, a force equal to its {{blank:a}}, mg, is needed. This force moves through a {{blank:b}} displacement Δh, so the work done, which is stored as potential energy, is {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["weight"], choices: ["weight", "mass", "momentum"] },
      { id: "b", accepted: ["vertical"], choices: ["vertical", "horizontal", "total"] },
      { id: "c", accepted: ["mgΔh"], choices: ["mgΔh", "½mv²", "mΔh"] },
    ],
    explanation: "Work done = force × displacement in the direction of the force = mg × Δh.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the energy a mass has because of its position in a gravitational field.",
    accepted: ["gravitational potential energy", "gravitational potential", "potential energy", "GPE", "gravitational energy"],
    explanation: "**Gravitational potential energy**; near the Earth's surface its change is mgΔh.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: t`A constant resultant force $F$ accelerates a body of mass $m$ from rest through a displacement $s$. Derive the expression $E_K = \tfrac{1}{2}mv^2$ for its kinetic energy when its speed is $v$.`,
    points: [
      t`Work done on the body $W = Fs$.`,
      t`Newton's second law: $F = ma$, so $W = mas$.`,
      t`From $v^2 = u^2 + 2as$ with $u = 0$: $as = \tfrac{1}{2}v^2$.`,
      t`So $W = \tfrac{1}{2}mv^2$, the kinetic energy gained.`,
    ],
    modelAnswer: t`The work done on the body is $W = Fs$. By Newton's second law $F = ma$, so $W = mas$. Since it starts from rest, $v^2 = 2as$, so $as = v^2/2$. Therefore $W = \tfrac{1}{2}mv^2$, which is its kinetic energy.`,
    explanation: "Each principle used is a marking point.",
    hints: ["Start from W = Fs.", "Use an equation of motion without t."],
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 3,
    stem: t`Show that the change in gravitational potential energy of a mass $m$ raised through a height $\Delta h$ near the Earth's surface is $mg\Delta h$, and state one assumption.`,
    points: [
      t`The force needed (at constant speed) equals the weight, $mg$.`,
      t`Work done $= \text{force} \times \text{displacement in its direction} = mg\Delta h$, stored as gravitational potential energy.`,
      t`Assumption: $g$ is constant over the height $\Delta h$ (uniform field, $\Delta h$ much smaller than the Earth's radius).`,
    ],
    modelAnswer: t`Raising the mass at constant speed needs an upward force equal to its weight $mg$. This force moves through $\Delta h$ in its own direction, so the work done is $mg\Delta h$, which is stored as gravitational potential energy. This assumes $g$ is constant over $\Delta h$.`,
    explanation: "Work done by a force equal to the weight over the height gives the energy stored.",
    hints: ["What force is needed to lift the mass at constant speed?"],
  });

  // Practice structured: trolley on a ramp with light gate (12 marks)
  {
    const m = 0.800, Lr = 1.50, h = 0.150, card = 0.050;
    const times = [0.0318, 0.0313, 0.0322]; // s
    const tm = mean(times);
    const v = card / tm;
    const ke = 0.5 * m * v * v, pe = m * g * h;
    const pctT = pctUnc(halfRange(times), tm);
    const pctKE = 2 * (pctUnc(0.0005, card) + pctT) + pctUnc(0.005, m);
    chk(((pe - ke) / pe) * 100 > pctKE ? 1 : 0, 1);
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Tendai releases a trolley of mass $0.800\ \text{kg}$ from rest on a ramp. It travels $1.50\ \text{m}$ down the ramp, falling a vertical height of $0.150\ \text{m}$, and then a card of width $5.0\ \text{cm}$ on the trolley passes through a light gate. Three runs give blocking times of $${times[0]}\ \text{s}$, $${times[1]}\ \text{s}$ and $${times[2]}\ \text{s}$.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the mean blocking time, in s, to three significant figures.", value: tm, unit: "s", wrong: [times[0]], explanation: t`Mean $= ${sfStr(tm, 3)}\ \text{s}$.` }),
        P.num({ label: "(b)", marks: 2, stem: t`Calculate the speed of the trolley at the light gate, in $\text{m s}^{-1}$, to three significant figures.`, value: v, unit: "m/s", wrong: [5 / tm], explanation: t`$v = 0.050 / ${sfStr(tm, 3)} = ${sfStr(v, 3)}\ \text{m s}^{-1}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the kinetic energy of the trolley at the light gate, in J, to three significant figures.", value: ke, unit: "J", wrong: [0.5 * m * v], explanation: t`$E_K = \tfrac{1}{2} \times 0.800 \times ${sfStr(v, 3)}^2 = ${sfStr(ke, 3)}\ \text{J}$.` }),
        P.num({ label: "(d)", marks: 1, stem: "Calculate the loss of gravitational potential energy, in J, to three significant figures.", value: pe, unit: "J", wrong: [m * g * Lr], explanation: t`$mgh = 0.800 \times 9.81 \times 0.150 = ${sfStr(pe, 3)}\ \text{J}$ (the vertical height, not the ramp length).` }),
        P.num({ label: "(e)", marks: 1, stem: "Calculate the average resistive force on the trolley along the ramp, in N, to two significant figures.", value: (pe - ke) / Lr, sf: 2, unit: "N", wrong: [(pe - ke) / h], explanation: t`$\dfrac{${sfStr(pe, 3)} - ${sfStr(ke, 3)}}{1.50} = ${sfStr((pe - ke) / Lr, 2)}\ \text{N}$.` }),
        P.num({ label: "(f)", marks: 3, stem: t`The card width is known to $\pm 0.5\ \text{mm}$, the mass to $\pm 5\ \text{g}$, and the time uncertainty is half the range of the three readings. Calculate the percentage uncertainty in the kinetic energy, to two significant figures.`, value: pctKE, sf: 2, unit: "%", wrong: [pctUnc(0.0005, card) + pctT + pctUnc(0.005, m)],
          explanation: t`Percentage uncertainty in $v$ = card ($${sfStr(pctUnc(0.0005, card), 2)}\%$) + time ($${sfStr(pctT, 2)}\%$). $E_K \propto mv^2$, so $\%E_K = \%m + 2 \times \%v = ${sfStr(pctUnc(0.005, m), 2)} + 2 \times ${sfStr(pctUnc(0.0005, card) + pctT, 2)} = ${sfStr(pctKE, 2)}\%$.` }),
        P.manual({ label: "(g)", marks: 2, stem: "Hence comment on whether the difference between the loss of potential energy and the gain in kinetic energy is significant.", points: [t`The difference is $${sfStr(((pe - ke) / pe) * 100, 2)}\%$ of the potential energy lost.`, t`This is larger than the uncertainty (about $${sfStr(pctKE, 2)}\%$), so the difference is significant: energy really is dissipated by friction/air resistance.`], modelAnswer: t`The kinetic energy is about $${sfStr(((pe - ke) / pe) * 100, 2)}\%$ less than the potential energy lost, more than the $${sfStr(pctKE, 2)}\%$ uncertainty in $E_K$, so the difference is real: resistive forces dissipate energy.` }),
      ],
      explanation: "Speed from card width ÷ time; Ek = ½mv² (percentage uncertainty in v counts twice); the energy deficit gives the average resistive force.",
      hints: ["Use the mean time.", "Ek depends on v², so double the percentage uncertainty in v."],
    });
  }
  // Practice structured: hydro-electric scheme (illustrative values, 8 marks)
  {
    const Q = 150, h = 80, rho = 1000, eff = 0.88;
    const Pin = Q * rho * g * h;
    const Pout = eff * Pin;
    const vj = Math.sqrt(2 * g * h);
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`In a hydro-electric scheme (illustrative values), $150\ \text{m}^3$ of water flows through the turbines each second after falling a vertical height of $80\ \text{m}$. The density of water is $1000\ \text{kg m}^{-3}$.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the gravitational potential energy lost by the water each second, in W, to three significant figures.", value: Pin, unit: "W", wrong: [Q * h * g], explanation: t`Mass per second $= 150 \times 1000 = 1.5 \times 10^{5}\ \text{kg}$; $mgh$ per second $= 1.5 \times 10^{5} \times 9.81 \times 80 = ${sciTex(Pin)}\ \text{W}$.` }),
        P.num({ label: "(b)", marks: 2, stem: "The overall efficiency of conversion to electrical energy is 88%. Calculate the electrical power output, in W, to three significant figures.", value: Pout, unit: "W", wrong: [Pin / eff], explanation: t`$0.88 \times ${sciTex(Pin)} = ${sciTex(Pout)}\ \text{W}$ (about $${sfStr(Pout / 1e6, 3)}\ \text{MW}$).` }),
        P.num({ label: "(c)", marks: 2, stem: t`If no energy were transferred to the turbines, calculate the speed the water would reach after falling $80\ \text{m}$, in $\text{m s}^{-1}$, to three significant figures.`, value: vj, unit: "m/s", wrong: [2 * g * h], explanation: t`$v = \sqrt{2gh} = \sqrt{2 \times 9.81 \times 80} = ${sfStr(vj, 3)}\ \text{m s}^{-1}$.` }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain why the power output depends on both the flow rate and the height through which the water falls.", points: ["The energy released per kilogram of water is gh, so it is proportional to the height fallen.", "The power is energy per second = (mass per second) × gh, so it is also proportional to the mass (volume) flowing per second."], modelAnswer: "Each kilogram of water releases gh joules, so the energy per kilogram is proportional to the height. Power is the energy per second, so it equals the mass flowing per second times gh; doubling either the flow rate or the height doubles the power." }),
      ],
      explanation: "Power from falling water = (mass per second) × g × h; the electrical output is this multiplied by the efficiency.",
      hints: ["Mass per second = density × volume per second.", "Energy per second is power."],
    });
  }

  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 3,
    stem: "A ball is dropped onto a concrete floor. Each bounce reaches a lower height than the one before. Explain this in terms of energy.",
    points: [
      "As it falls, gravitational potential energy is transferred to kinetic energy (and as it rises, back to GPE).",
      "During each impact some kinetic energy is transferred to thermal energy and sound in the ball and floor (the collision is not perfectly elastic); air resistance also does work.",
      "So it leaves the floor with less kinetic energy than it arrived with, and mgh = remaining kinetic energy gives a lower height.",
    ],
    modelAnswer: "Falling, the ball's gravitational potential energy becomes kinetic energy. In each impact some of that kinetic energy is dissipated as thermal energy and sound because the collision is not perfectly elastic, and air resistance also removes energy. It rebounds with less kinetic energy, and since that becomes mgh at the top, the height reached is lower each time.",
    explanation: "Energy is conserved overall but dissipated at each impact, so less returns to gravitational potential energy.",
    hints: ["Where does energy go during the impact?"],
  });

  b.card("FORMULA", "Change in gravitational potential energy (uniform field)", t`$\Delta E_P = mg\Delta h$`);
  b.card("FORMULA", "Kinetic energy", t`$E_K = \tfrac{1}{2}mv^2$`);
  b.card("CONCEPT", "Derivation of ΔEp = mgΔh in one line", "Work done = force × displacement = weight mg × vertical height Δh, stored as potential energy.");
  b.card("CONCEPT", "Derivation of Ek = ½mv² in one line", "W = Fs = mas and v² = 2as from rest, so W = ½mv².");
  b.card("FORMULA", "Speed after falling from rest through h (no resistance)", t`$v = \sqrt{2gh}$, independent of mass`);
  b.card("CONCEPT", "Energy equation with resistive forces", "Loss of Ep = gain in Ek + work done against resistive forces.");
  b.card("FACT", "Effect of doubling speed on kinetic energy", "Ek is multiplied by 4 (Ek ∝ v²).");
  b.card("FACT", "When is mgΔh not valid?", "When g changes over Δh: heights comparable with the Earth's radius (satellites, rockets).");
});
