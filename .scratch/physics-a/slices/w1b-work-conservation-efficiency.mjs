// W1b: aphys.energy.work-conservation-efficiency — work, conservation of energy, efficiency.
import { concept, P, t, chk, DATA, sfStr, dpStr, sciTex, rad, pctUnc, table } from "../lib.mjs";

const g = DATA.g;
concept("aphys.energy.work-conservation-efficiency", { file: "energy/work-conservation-efficiency", keyPrefix: "energy.work-conservation-efficiency" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is the correct definition of work done by a force?",
    options: [
      ["The product of the force and the displacement in the direction of the force", "Correct: only displacement along the force counts."],
      ["The product of the force and the total distance travelled by the object", "Distance travelled in any direction is not enough; it must be displacement along the force."],
      ["The rate at which the force transfers energy", "That is power."],
      ["The force multiplied by the perpendicular distance from a pivot", "That is the moment of a force."],
    ],
    answer: "A",
    explanation: "Work done = force × displacement of the point of application in the direction of the force (W = Fs cos θ).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A car travels at constant speed along a straight, level road. Which force does no work on the car?",
    options: [
      ["The normal contact force of the road", "Correct: it is perpendicular to the displacement."],
      ["The forward driving force", "It acts along the displacement, so it does positive work."],
      ["Air resistance", "It acts opposite to the displacement, so it does negative work."],
      ["Rolling friction opposing the motion", "It acts opposite to the displacement, so it does negative work."],
    ],
    answer: "A",
    explanation: "Work = Fs cos θ. The normal force is vertical and the displacement horizontal, so θ = 90° and cos θ = 0. The car's weight also does no work on a level road.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of these is equivalent to the joule?",
    options: [
      [t`$\text{kg m}^2\,\text{s}^{-2}$`, "Correct: J = N m = kg m s⁻² × m."],
      [t`$\text{kg m s}^{-2}$`, "This is the newton."],
      [t`$\text{kg m}^2\,\text{s}^{-3}$`, "This is the watt (J s⁻¹)."],
      [t`$\text{kg m}^{-1}\,\text{s}^{-2}$`, "This is the pascal."],
    ],
    answer: "A",
    explanation: t`$1\ \text{J} = 1\ \text{N} \times 1\ \text{m} = \text{kg m s}^{-2} \times \text{m} = \text{kg m}^2\,\text{s}^{-2}$. Check with $\tfrac{1}{2}mv^2$: $\text{kg} \times (\text{m s}^{-1})^2$, the same.`,
  });
  {
    const F = 200, s = 15, th = 30;
    const W = F * s * Math.cos(rad(th));
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: t`A force of $200\ \text{N}$ acting at $30^\circ$ above the horizontal pulls a box $15\ \text{m}$ along a level floor. How much work does the force do?`,
      options: [
        [`${sfStr(W / 1000, 3)} kJ`, "Correct: 200 × 15 × cos 30°."],
        [`${sfStr((F * s * Math.sin(rad(th))) / 1000, 3)} kJ`, "This uses sin 30°, the component perpendicular to the motion."],
        [`${sfStr((F * s) / 1000, 3)} kJ`, "This ignores the angle: only the horizontal component does work."],
        [`${sfStr((F * s) / Math.cos(rad(th)) / 1000, 3)} kJ`, "This divides by cos 30° instead of multiplying."],
      ],
      answer: "A",
      explanation: t`$W = Fs\cos\theta = 200 \times 15 \times \cos 30^\circ = ${sfStr(W, 3)}\ \text{J} = ${sfStr(W / 1000, 3)}\ \text{kJ}$.`,
      hints: ["Which component of the force is along the floor?"],
    });
  }
  {
    const inp = 1.5, use = 0.9;
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: t`A water pump is supplied with $1.5\ \text{kJ}$ of energy and does $0.90\ \text{kJ}$ of useful work lifting water. What is its efficiency?`,
      options: [
        ["60%", "Correct: 0.90 ÷ 1.5 × 100%."],
        ["167%", "This divides input by output; efficiency can never exceed 100%."],
        ["40%", "This is the fraction wasted, not the efficiency."],
        ["0.60%", "0.60 is the ratio; as a percentage it is 60%."],
      ],
      answer: "A",
      explanation: t`Efficiency $= \dfrac{\text{useful output}}{\text{total input}} = \dfrac{0.90}{1.5} = ${use / inp} = ${(use / inp) * 100}\%$.`,
      hints: ["Useful output ÷ total input."],
    });
  }
  {
    const Fm = 40, x = 0.2;
    chk(0.5 * Fm * x, 4);
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: t`The force on a spring increases uniformly from zero to $40\ \text{N}$ while it is compressed by $0.20\ \text{m}$. How much work is done compressing it?`,
      options: [
        ["4.0 J", "Correct: the area under the force-compression graph is a triangle: ½ × 40 × 0.20."],
        ["8.0 J", "This uses the maximum force for the whole compression (rectangle, not triangle)."],
        ["200 J", "This divides the force by the compression."],
        ["0.80 J", "This treats 40 N as the spring constant in ½kx²; k is 40/0.20 = 200 N m⁻¹."],
      ],
      answer: "A",
      explanation: t`Work done = area under the force-displacement graph $= \tfrac{1}{2} \times 40 \times 0.20 = 4.0\ \text{J}$. The force is not constant, so $Fs$ with the maximum force overestimates it.`,
      hints: ["Work done = area under the force-displacement graph."],
    });
  }
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A block slides down a rough slope at constant speed. Which statement is correct?",
    options: [
      ["The loss of gravitational potential energy equals the work done against friction.", "Correct: kinetic energy is constant, so all the GPE lost goes into work against friction (thermal energy)."],
      ["The loss of gravitational potential energy equals the gain in kinetic energy.", "The speed is constant, so there is no gain in kinetic energy."],
      ["No work is done on the block because its speed is constant.", "Gravity does positive work and friction does an equal negative work; the net work is zero, but each force does work."],
      ["The total energy of the block and slope decreases as it slides.", "Energy is conserved: it is transferred to the thermal store of the block and the slope."],
    ],
    answer: "A",
    explanation: "Constant speed: no change in kinetic energy, so the resultant force is zero and the net work done is zero. Gravity's positive work (the GPE lost) equals the work done against friction, which heats the surfaces.",
    hints: ["What happens to kinetic energy at constant speed?"],
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: t`A machine is supplied with $600\ \text{J}$ and gives out $450\ \text{J}$ of useful energy. Calculate its efficiency, in %.`,
    value: (450 / 600) * 100, unit: "%", wrong: [(600 / 450) * 100, 25],
    explanation: t`Efficiency $= \dfrac{450}{600} \times 100\% = ${(450 / 600) * 100}\%$.`,
  });
  {
    const F = 85, s = 12, th = 40;
    const W = F * s * Math.cos(rad(th));
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Rudo drags a bag of maize $12\ \text{m}$ across a floor with a rope at $40^\circ$ to the horizontal. The tension in the rope is $85\ \text{N}$. Calculate the work done by the tension, in J, to three significant figures.`,
      value: W, unit: "J", wrong: [F * s * Math.sin(rad(th)), F * s],
      explanation: t`$W = Fs\cos\theta = 85 \times 12 \times \cos 40^\circ = ${sfStr(W, 3)}\ \text{J}$.`,
      hints: ["Use the component of the tension along the floor."],
    });
  }
  {
    const eff = 0.82, inp = 5.0e6;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`The motor of a maize mill has an efficiency of 82%. In one session it is supplied with $5.0\ \text{MJ}$ of electrical energy. Calculate the useful energy output, in J.`,
      value: eff * inp, unit: "J", wrong: [inp / eff, (1 - eff) * inp],
      explanation: t`1. Useful output = efficiency × input.
2. $= 0.82 \times 5.0 \times 10^{6} = ${sciTex(eff * inp, 2)}\ \text{J}$.
3. The remaining $${sciTex((1 - eff) * inp, 2)}\ \text{J}$ is dissipated as thermal energy and sound.`,
      hints: ["Convert 82% to 0.82 and MJ to J."],
    });
  }
  {
    const m = 25, L = 4.0, h = 0.9, F = 95;
    const Wd = F * L, gpe = m * g * h;
    const f = (Wd - gpe) / L;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A $25\ \text{kg}$ sack is pulled at constant speed up a ramp $4.0\ \text{m}$ long that rises $0.90\ \text{m}$, by a force of $95\ \text{N}$ parallel to the ramp. Calculate the average friction force on the sack, in N, to three significant figures.`,
      value: f, unit: "N", wrong: [(Wd - gpe) / h, F],
      explanation: t`1. Work done by the pull $= 95 \times 4.0 = ${Wd}\ \text{J}$.
2. Gain in GPE $= mgh = 25 \times 9.81 \times 0.90 = ${sfStr(gpe, 4)}\ \text{J}$.
3. Work against friction $= ${Wd} - ${sfStr(gpe, 4)} = ${sfStr(Wd - gpe, 4)}\ \text{J}$.
4. Friction $= \dfrac{${sfStr(Wd - gpe, 4)}}{4.0} = ${sfStr(f, 3)}\ \text{N}$ (divide by the distance along the ramp, not by the height).`,
      hints: ["Work done by the pull = gain in GPE + work against friction.", "Friction acts along the 4.0 m ramp."],
    });
  }
  {
    const m = 2.0, L = 3.0, h = 1.5, f = 3.5;
    const v = Math.sqrt((2 * (m * g * h - f * L)) / m);
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A $2.0\ \text{kg}$ block is released from rest at the top of a slope $3.0\ \text{m}$ long and $1.5\ \text{m}$ high. A constant friction force of $3.5\ \text{N}$ acts on it. Calculate its speed at the bottom, in $\text{m s}^{-1}$, to three significant figures.`,
      value: v, unit: "m/s", wrong: [Math.sqrt(2 * g * h), Math.sqrt((2 * (m * g * h - f * h)) / m)],
      explanation: t`1. Energy: loss of GPE = gain in KE + work against friction.
2. $mgh = 2.0 \times 9.81 \times 1.5 = ${sfStr(m * g * h, 4)}\ \text{J}$; work against friction $= 3.5 \times 3.0 = ${f * L}\ \text{J}$.
3. $\tfrac{1}{2}mv^2 = ${sfStr(m * g * h, 4)} - ${f * L} = ${sfStr(m * g * h - f * L, 4)}\ \text{J}$.
4. $v = \sqrt{\dfrac{2 \times ${sfStr(m * g * h - f * L, 4)}}{2.0}} = ${sfStr(v, 3)}\ \text{m s}^{-1}$. Without friction it would be $${sfStr(Math.sqrt(2 * g * h), 3)}\ \text{m s}^{-1}$.`,
      hints: ["Friction acts over the length of the slope, 3.0 m.", "Loss of GPE = gain in KE + work against friction."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "When friction opposes the motion of an object, the work done by friction on the object is negative.",
    answer: true,
    explanation: t`True. Friction acts at $180^\circ$ to the displacement, so $W = Fs\cos 180^\circ = -Fs$: it transfers energy away from the object's kinetic store, to thermal energy.`,
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A well-designed real motor can have an efficiency of 100%.",
    answer: false,
    explanation: "False. Some energy is always dissipated (resistance in the windings heats them, friction in the bearings, sound), so a real machine is always less than 100% efficient.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each force with the work it does in the situation described.",
    pairs: [
      ["Tension in a string whirling a stone in a horizontal circle at constant speed", "zero work"],
      ["A crane's cable lifting a load upwards", "positive work"],
      ["Air resistance on a falling ball", "negative work"],
      ["Weight of a ball thrown upwards, while it rises", "negative work, transferring kinetic energy to gravitational potential energy"],
    ],
    explanation: "Perpendicular force: zero work. Force along the motion: positive. Force against the motion: negative. Gravity on a rising ball does negative work while the ball gains GPE.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the principle of conservation of energy.",
    template: "Energy cannot be {{blank:a}} or destroyed; it can only be {{blank:b}} from one store to another, so the total energy of a closed system stays {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["created"], choices: ["created", "transferred", "measured"] },
      { id: "b", accepted: ["transferred"], choices: ["transferred", "created", "lost"] },
      { id: "c", accepted: ["constant"], choices: ["constant", "zero", "increasing"] },
    ],
    explanation: "Energy is conserved in every process; wasted energy is dissipated to the surroundings, not destroyed.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the SI unit of work.",
    accepted: ["joule", "joules", "J", "newton metre"],
    explanation: "The **joule**: the work done when a 1 N force moves its point of application 1 m in the direction of the force.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 2,
    stem: "Define work done by a force.",
    points: ["Force × displacement (of its point of application)…", "…in the direction of the force."],
    modelAnswer: "Work done is the product of the force and the displacement of its point of application in the direction of the force.",
    explanation: "\"Distance\" alone, without \"in the direction of the force\", does not earn the second mark.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "A kombi brakes from speed to rest on a level road. Describe the energy transfers, and explain how the principle of conservation of energy applies.",
    points: [
      "Kinetic energy of the kombi decreases to zero.",
      "Work done by friction in the brakes (and with the road / air) transfers it mainly to thermal energy of the brake discs and pads (and a little sound).",
      "The thermal energy gained (plus sound) equals the kinetic energy lost, so total energy is constant; it is dissipated to the surroundings as the brakes cool.",
    ],
    modelAnswer: "The kombi's kinetic energy falls to zero. Friction between pads and discs does work that transfers this energy mainly to thermal energy in the brakes, with a little sound. The energy gained by the brakes and surroundings equals the kinetic energy lost, so the total is unchanged; it spreads into the surroundings as the brakes cool and cannot easily be reused.",
    explanation: "Name the stores, the mechanism (work done by friction) and the conservation statement.",
    hints: ["Which store empties? Which store fills?"],
  });

  // Practice structured: a mine hoist (12 marks)
  {
    const m = 1200, h = 45, t1 = 30, Pin = 25e3;
    const Ein = Pin * t1, gpe = m * g * h;
    const eff = (gpe / Ein) * 100;
    const dm = 20, dh = 0.5, dP = 0.5e3;
    const pct = pctUnc(dm, m) + pctUnc(dh, h) + pctUnc(dP, Pin);
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A hoist at a mine raises a cage of total mass $1200\ \text{kg}$ through a vertical height of $45\ \text{m}$ at constant speed in $30\ \text{s}$. The electrical power input to the hoist motor is $25\ \text{kW}$.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the gain in gravitational potential energy of the cage, in J, to three significant figures.", value: gpe, unit: "J", wrong: [m * h], explanation: t`$mgh = 1200 \times 9.81 \times 45 = ${sciTex(gpe)}\ \text{J}$.` }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate the electrical energy supplied in 30 s, in J.", value: Ein, unit: "J", wrong: [Pin / t1], explanation: t`$E = Pt = 25\,000 \times 30 = ${sciTex(Ein, 2)}\ \text{J}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the efficiency of the hoist, in %, to three significant figures.", value: eff, unit: "%", wrong: [(Ein / gpe) * 100], explanation: t`$\dfrac{${sciTex(gpe)}}{${sciTex(Ein, 2)}} \times 100\% = ${sfStr(eff, 3)}\%$.` }),
        P.manual({ label: "(d)", marks: 2, stem: "Describe, in words, where the rest of the energy goes.", points: ["Thermal energy in the motor windings (resistance) and in bearings / pulleys (friction).", "Sound, and thermal energy from air resistance on the cage / friction of the cage guides."], modelAnswer: "The rest is dissipated: heating of the motor windings by their resistance, friction in the bearings, pulleys and cage guides, air resistance and sound, all ending as thermal energy of the surroundings." }),
        P.num({ label: "(e)", marks: 3, stem: t`The mass is known to $\pm 20\ \text{kg}$, the height to $\pm 0.5\ \text{m}$ and the power to $\pm 0.5\ \text{kW}$; the time is exact. Calculate the percentage uncertainty in the efficiency, to two significant figures.`, value: pct, sf: 2, unit: "%", wrong: [pctUnc(dm, m) + pctUnc(dh, h)],
          explanation: t`Efficiency $= mgh/(Pt)$, so the percentage uncertainties add: $\dfrac{20}{1200} \times 100 + \dfrac{0.5}{45} \times 100 + \dfrac{0.5}{25} \times 100 = ${sfStr(pctUnc(dm, m), 2)} + ${sfStr(pctUnc(dh, h), 2)} + ${sfStr(pctUnc(dP, Pin), 2)} = ${sfStr(pct, 2)}\%$.` }),
        P.manual({ label: "(f)", marks: 2, stem: "The cage is now raised at the same constant speed carrying extra miners. State and explain whether you expect the efficiency to increase, decrease or stay the same.", points: ["Increase (likely).", "The useful output rises with the load while some losses (friction in bearings, fixed losses in the motor) stay roughly the same, so a larger fraction of the input is useful."], modelAnswer: "It is likely to increase: the useful energy grows in proportion to the load, while some losses, such as bearing friction and fixed losses in the motor, change less, so a larger fraction of the energy supplied is useful." }),
      ],
      explanation: "Useful output = mgh; input = Pt; efficiency = output ÷ input; percentage uncertainties add for a product or quotient.",
      hints: ["Input energy = power × time.", "Efficiency = mgh ÷ (Pt)."],
    });
  }
  // Practice structured: force-displacement data (8 marks)
  {
    const s = [0, 0.1, 0.2, 0.3, 0.4, 0.5];
    const F = [0, 18, 36, 54, 54, 54];
    const W = 0.5 * 54 * 0.3 + 54 * 0.2;
    chk(W, 18.9, 1e-9);
    const tab = table([t`$s\,/\,\text{m}$`, t`$F\,/\,\text{N}$`], s.map((x, i) => [x.toFixed(1), String(F[i])]));
    const v = Math.sqrt((2 * W) / 0.6);
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A catapult pushes a $0.60\ \text{kg}$ trolley from rest along a smooth horizontal track. The force on the trolley varies with displacement $s$ as shown. The force rises uniformly at first and is then constant.

${tab}`,
      parts: [
        P.manual({ label: "(a)", marks: 1, stem: "Describe the shape of the force-displacement graph.", points: ["A straight line through the origin up to 0.30 m (54 N), then a horizontal line at 54 N to 0.50 m."], modelAnswer: "A straight line from the origin to (0.30 m, 54 N), then a horizontal line at 54 N up to 0.50 m." }),
        P.num({ label: "(b)", marks: 3, stem: "Calculate the work done on the trolley over the 0.50 m, in J.", value: W, unit: "J", wrong: [54 * 0.5], explanation: t`Area = triangle + rectangle $= \tfrac{1}{2} \times 54 \times 0.30 + 54 \times 0.20 = 8.1 + 10.8 = ${W}\ \text{J}$.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Calculate the trolley's speed after $0.50\ \text{m}$, in $\text{m s}^{-1}$, to three significant figures, assuming all the work becomes kinetic energy.`, value: v, unit: "m/s", wrong: [Math.sqrt(W / 0.6)], explanation: t`$\tfrac{1}{2}mv^2 = ${W}$, so $v = \sqrt{2 \times ${W} / 0.60} = ${sfStr(v, 3)}\ \text{m s}^{-1}$.` }),
        P.manual({ label: "(d)", marks: 2, stem: "The measured speed is lower than this. Suggest two reasons.", points: ["Friction in the wheels / with the track (track not perfectly smooth) and air resistance do negative work.", "Some energy remains in the catapult (its moving parts / elastic band) or is dissipated as thermal energy and sound; the track may slope slightly upwards."], modelAnswer: "Friction at the wheels and air resistance do negative work on the trolley, and some energy stays in the catapult's moving parts or is dissipated as heat and sound in the elastic material." }),
      ],
      explanation: "Work done by a varying force is the area under the force-displacement graph; with no losses it all becomes kinetic energy.",
      hints: ["Split the area into a triangle and a rectangle.", "Work done = gain in kinetic energy."],
    });
  }

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "A solar panel drives an electric pump that lifts borehole water into a tank. Describe the energy transfers from sunlight to the water in the tank, and explain why the overall efficiency is low.",
    points: [
      "Light (radiant) energy → electrical energy in the panel → kinetic energy of the motor and pump → gravitational potential energy of the water (and some kinetic energy).",
      "At every stage some energy is dissipated: much of the light heats the panel; resistance heats wires and windings; friction in bearings and the pipe.",
      "Overall efficiency = product of the stage efficiencies, so it is much lower than any single stage.",
    ],
    modelAnswer: "Light energy is transferred to electrical energy by the panel, then by the motor to kinetic energy of the pump, and finally to gravitational potential energy of the water raised into the tank. Energy is dissipated at every stage: most of the light heats the panel, the wires and windings are heated by their resistance, and friction acts in the bearings and pipe. The overall efficiency is the product of the stage efficiencies, so it is low.",
    explanation: "Each conversion wastes some energy; efficiencies of stages in series multiply.",
    hints: ["List each stage of the chain.", "What happens to the overall efficiency when several stages are in series?"],
  });

  b.card("DEFINITION", "**Work done**", "Force × displacement of its point of application in the direction of the force.");
  b.card("FORMULA", "Work done by a force at angle θ to the displacement", t`$W = Fs\cos\theta$`);
  b.card("DEFINITION", "**The joule**", "The work done when a force of 1 N moves its point of application 1 m in the direction of the force.");
  b.card("DEFINITION", "**Principle of conservation of energy**", "Energy cannot be created or destroyed, only transferred between stores; the total in a closed system is constant.");
  b.card("FORMULA", "Efficiency", "useful energy (or power) output ÷ total energy (or power) input × 100%");
  b.card("CONCEPT", "Work done by a varying force?", "The area under the force-displacement graph.");
  b.card("FACT", "Work done by a force perpendicular to the motion?", "Zero, e.g. the normal force on a car on a level road.");
  b.card("CONCEPT", "Energy equation for pushing a load up a rough slope at constant speed", "Work done by the push = gain in GPE + work done against friction.");
  b.card("FACT", "Unit of work in SI base units", t`$\text{kg m}^2\,\text{s}^{-2}$`);
});
