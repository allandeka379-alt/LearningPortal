// W1b: aphys.energy.power — power, the watt, P = Fv, vehicles, lifting, pumps, efficiency.
import { concept, P, t, chk, DATA, sfStr, dpStr, sciTex, pctUnc, mean, halfRange } from "../lib.mjs";

const g = DATA.g;
concept("aphys.energy.power", { file: "energy/power", keyPrefix: "energy.power" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement defines power?",
    options: [
      ["The work done per unit time", "Correct: power is the rate of doing work (or of transferring energy)."],
      ["The work done per unit distance", "Work per unit distance is a force."],
      ["The energy transferred per unit mass", "This is a specific energy (J kg⁻¹), not power."],
      ["The force multiplied by the time for which it acts", "Force × time is impulse (change of momentum)."],
    ],
    answer: "A",
    explanation: "Power = work done ÷ time taken = rate of energy transfer, in watts (J s⁻¹).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is the watt expressed in SI base units?",
    options: [
      [t`$\text{kg m}^2\,\text{s}^{-3}$`, "Correct: J s⁻¹ = kg m² s⁻² × s⁻¹."],
      [t`$\text{kg m}^2\,\text{s}^{-2}$`, "This is the joule; a watt is a joule per second."],
      [t`$\text{kg m s}^{-3}$`, "This is N s⁻¹; power needs N m s⁻¹."],
      [t`$\text{kg m}^2\,\text{s}^{-1}$`, "This is J s, the unit of the Planck constant, not power."],
    ],
    answer: "A",
    explanation: t`$\text{W} = \text{J s}^{-1} = \text{kg m}^2\,\text{s}^{-2}\,\text{s}^{-1} = \text{kg m}^2\,\text{s}^{-3}$. $P = Fv$ gives the same: $\text{kg m s}^{-2} \times \text{m s}^{-1}$.`,
  });
  {
    const Pw = 36e3, v = 30;
    b.mcq({
      d: 3, skill: "APPLICATION", daily: true,
      stem: t`A car travels at a constant $30\ \text{m s}^{-1}$ on a level road. The useful power output of its engine is $36\ \text{kW}$. What is the total resistive force on the car?`,
      options: [
        ["1200 N", "Correct: at constant speed driving force = resistive force = P/v."],
        [t`$1.08 \times 10^{6}\ \text{N}$`, "This multiplies P by v instead of dividing."],
        ["0 N", "The resultant force is zero, but the resistive force is balanced by the driving force, which is not zero."],
        ["40 N", "This uses 36 for the power instead of 36 000 W."],
      ],
      answer: "A",
      explanation: t`$F = \dfrac{P}{v} = \dfrac{36\,000}{30} = ${Pw / v}\ \text{N}$. At constant velocity this driving force equals the total resistive force.`,
      hints: ["Use P = Fv.", "Convert kW to W."],
    });
  }
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "A car accelerates along a level road with its engine at constant maximum power. Why does it eventually reach a top speed?",
    options: [
      ["The driving force P/v decreases as speed increases while air resistance increases, until they are equal.", "Correct: then the resultant force and the acceleration are zero."],
      ["The engine's power decreases as the car speeds up.", "The power is constant here; it is the driving force that falls."],
      ["The car's kinetic energy reaches a maximum value set by the engine.", "Kinetic energy has no such limit; the limit comes from the force balance."],
      ["Air resistance becomes larger than the driving force, so the car stops accelerating.", "If resistance exceeded the driving force the car would decelerate; at top speed they are equal."],
    ],
    answer: "A",
    explanation: "With P constant, F = P/v falls as v rises; air resistance grows with speed. When driving force = resistive force the resultant is zero and the speed stays constant at its maximum.",
    hints: ["Rearrange P = Fv for F."],
  });
  {
    const m = 500, v = 0.4;
    const Pw = m * g * v;
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: t`A crane lifts a $500\ \text{kg}$ load vertically at a constant $0.40\ \text{m s}^{-1}$. What useful power does it develop?`,
      options: [
        [`${sfStr(Pw / 1000, 3)} kW`, "Correct: P = Fv = mgv."],
        ["0.200 kW", "This uses the mass instead of the weight (g is missing)."],
        [`${sfStr((m * g) / v / 1000, 3)} kW`, "This divides the weight by the speed instead of multiplying."],
        [`${sfStr(Pw / 2 / 1000, 3)} kW`, "There is no factor of ½: the speed is constant."],
      ],
      answer: "A",
      explanation: t`At constant speed the lifting force equals the weight, $mg = ${sfStr(m * g, 4)}\ \text{N}$. $P = Fv = ${sfStr(m * g, 4)} \times 0.40 = ${sfStr(Pw, 3)}\ \text{W}$.`,
      hints: ["The force needed equals the weight."],
    });
  }
  {
    const eff = 0.75, out = 1.5;
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: t`An electric motor has an efficiency of 75%. Its useful output power is $1.5\ \text{kW}$. What is its input power?`,
      options: [
        ["2.0 kW", "Correct: input = output ÷ efficiency = 1.5 ÷ 0.75."],
        ["1.1 kW", "This multiplies the output by the efficiency; the input must be larger than the output."],
        ["0.50 kW", "This is the wasted power, not the input power."],
        ["0.38 kW", "This is 25% of the output, not the input."],
      ],
      answer: "A",
      explanation: t`Efficiency $= \dfrac{P_{\text{out}}}{P_{\text{in}}}$, so $P_{\text{in}} = \dfrac{1.5}{0.75} = ${out / eff}\ \text{kW}$. The wasted power is $0.5\ \text{kW}$.`,
      hints: ["The input power must be bigger than the output power."],
    });
  }
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: t`An ox pulls a plough with a horizontal force of $350\ \text{N}$ at a steady $1.2\ \text{m s}^{-1}$. Calculate the power it develops, in W.`,
    value: 350 * 1.2, unit: "W", wrong: [350 / 1.2],
    explanation: t`$P = Fv = 350 \times 1.2 = ${350 * 1.2}\ \text{W}$.`,
  });
  {
    const m = 55, h = 3.6, tt = 4.5;
    const Pw = (m * g * h) / tt;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Chipo, mass $55\ \text{kg}$, runs up a flight of stairs of vertical height $3.6\ \text{m}$ in $4.5\ \text{s}$. Calculate the average useful power she develops in raising herself, in W, to three significant figures.`,
      value: Pw, unit: "W", wrong: [(m * h) / tt, m * g * h],
      explanation: t`$P = \dfrac{mgh}{t} = \dfrac{55 \times 9.81 \times 3.6}{4.5} = ${sfStr(Pw, 3)}\ \text{W}$. Only the vertical height counts, not the length of the staircase.`,
      hints: ["Find the gain in GPE, then divide by the time."],
    });
  }
  {
    const m = 12000, s = 1 / 25, v = 15, R = 3500;
    const F = R + m * g * s;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A bus of mass $12\,000\ \text{kg}$ climbs a straight road that rises $1\ \text{m}$ for every $25\ \text{m}$ travelled along the road, at a constant $15\ \text{m s}^{-1}$. The resistive forces total $3500\ \text{N}$. Calculate the useful power output of the engine, in W, to three significant figures.`,
      value: F * v, unit: "W", wrong: [R * v, m * g * s * v],
      explanation: t`1. Component of weight down the slope $= mg\sin\theta = 12\,000 \times 9.81 \times \tfrac{1}{25} = ${sfStr(m * g * s, 4)}\ \text{N}$.
2. Driving force $= 3500 + ${sfStr(m * g * s, 4)} = ${sfStr(F, 4)}\ \text{N}$.
3. $P = Fv = ${sfStr(F, 4)} \times 15 = ${sciTex(F * v)}\ \text{W}$.
4. Leaving out the slope term gives only the power against resistance.`,
      hints: ["The engine must balance resistance and the weight component down the slope.", "Then use P = Fv."],
    });
  }
  {
    const m = 1100, Pw = 45e3, v = 15, R = 900;
    const a = (Pw / v - R) / m;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A car of mass $1100\ \text{kg}$ is travelling at $15\ \text{m s}^{-1}$ on a level road with its engine delivering a useful power of $45\ \text{kW}$. The resistive force is $900\ \text{N}$. Calculate its acceleration at this instant, in $\text{m s}^{-2}$, to three significant figures.`,
      value: a, unit: "m/s²", wrong: [Pw / v / m, (Pw / v + R) / m],
      explanation: t`1. Driving force $F = P/v = 45\,000/15 = ${Pw / v}\ \text{N}$.
2. Resultant force $= ${Pw / v} - 900 = ${Pw / v - R}\ \text{N}$.
3. $a = \dfrac{${Pw / v - R}}{1100} = ${sfStr(a, 3)}\ \text{m s}^{-2}$.
4. Forgetting the resistance gives too large an acceleration.`,
      hints: ["Driving force = P/v.", "Use the resultant force in F = ma."],
    });
  }
  {
    const lpm = 120, h = 18, Pin = 600;
    const mps = lpm / 60;
    const Pu = mps * g * h;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`An electric pump lifts $120$ litres of water per minute through a vertical height of $18\ \text{m}$ into a tank. Its electrical input power is $600\ \text{W}$. Taking the mass of 1 litre of water as $1.0\ \text{kg}$, calculate the efficiency of the pump, in %, to three significant figures.`,
      value: (Pu / Pin) * 100, unit: "%", wrong: [((lpm * g * h) / Pin) * 100, ((mps * h) / Pin) * 100],
      explanation: t`1. Mass lifted per second $= 120/60 = ${mps}\ \text{kg s}^{-1}$.
2. Useful power $= (m/t)gh = ${mps} \times 9.81 \times 18 = ${sfStr(Pu, 4)}\ \text{W}$.
3. Efficiency $= \dfrac{${sfStr(Pu, 4)}}{600} \times 100\% = ${sfStr((Pu / Pin) * 100, 3)}\%$.
4. Using 120 kg per second (not converting minutes) gives an impossible efficiency above 100%.`,
      hints: ["Convert litres per minute to kg per second.", "Useful power = (mass per second) × g × h."],
    });
  }
  {
    const Pw = 75e3, k = 0.8;
    const v = (Pw / k) ** (1 / 3);
    b.num({
      d: 5, skill: "ANALYSIS", calculator: true,
      stem: t`The total resistive force on a car is $F = kv^2$, with $k = 0.80\ \text{N s}^2\,\text{m}^{-2}$. The maximum useful power of its engine is $75\ \text{kW}$. Calculate its top speed on a level road, in $\text{m s}^{-1}$, to three significant figures.`,
      value: v, unit: "m/s", wrong: [Math.sqrt(Pw / k), Pw / k],
      explanation: t`At top speed the driving force equals the resistance, so $P = Fv = kv^2 \times v = kv^3$. $v = \left(\dfrac{75\,000}{0.80}\right)^{1/3} = ${sfStr(v, 3)}\ \text{m s}^{-1}$. Taking a square root instead (from $P = kv^2$) forgets that power is force × velocity.`,
      hints: ["At top speed, driving force = kv².", "P = Fv, so P = kv³."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "When a car moves at constant speed on a level road, the useful power output of its engine is zero.",
    answer: false,
    explanation: "False. The resultant force is zero, but the engine still provides a driving force equal to the resistive forces, so P = Fv is not zero; the energy is dissipated against air resistance and friction.",
  });
  b.tf({
    d: 2, skill: "RECALL",
    stem: "The kilowatt-hour is a unit of energy, not of power.",
    answer: true,
    explanation: t`True. $1\ \text{kW h} = 1000\ \text{W} \times 3600\ \text{s} = 3.6 \times 10^{6}\ \text{J}$.`,
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each quantity with a correct unit.",
    pairs: [
      ["power", t`$\text{J s}^{-1}$`],
      ["energy supplied by an electricity company", "kW h"],
      ["work done", "N m"],
      ["driving force", t`$\text{W s m}^{-1}$`],
    ],
    explanation: t`Power: $\text{J s}^{-1}$ (W). Energy bills: kW h. Work: N m (J). Force: from $F = P/v$, $\text{W}/(\text{m s}^{-1}) = \text{W s m}^{-1}$, which equals the newton.`,
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the derivation of P = Fv.",
    template: "Power is work done divided by {{blank:a}}. Work done is force × {{blank:b}} in the direction of the force, and displacement divided by time is {{blank:c}}, so P = Fv.",
    blanks: [
      { id: "a", accepted: ["time"], choices: ["time", "distance", "mass"] },
      { id: "b", accepted: ["displacement"], choices: ["displacement", "velocity", "time"] },
      { id: "c", accepted: ["velocity"], choices: ["velocity", "acceleration", "momentum"] },
    ],
    explanation: "P = W/t = F × s/t = Fv.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the SI unit equal to one joule per second.",
    accepted: ["watt", "watts", "W"],
    explanation: "The **watt** (W): 1 W = 1 J s⁻¹.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 3,
    stem: t`Show that the power developed by a force $F$ whose point of application moves at velocity $v$ in the direction of the force is $P = Fv$.`,
    points: [
      t`Power = work done ÷ time: $P = \dfrac{W}{t}$.`,
      t`Work done $W = Fs$ (displacement in the direction of the force), so $P = \dfrac{Fs}{t}$.`,
      t`$s/t = v$, so $P = Fv$.`,
    ],
    modelAnswer: t`Power is work done per unit time, $P = W/t$. The work done is $Fs$, where $s$ is the displacement in the direction of the force, so $P = Fs/t$. Since $s/t$ is the velocity $v$, $P = Fv$.`,
    explanation: "Combine the definitions of power, work and velocity.",
    hints: ["Start from the definition of power."],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 3,
    stem: "A lorry's engine delivers constant maximum power as it climbs a long, steady hill. Explain why its speed is lower on the hill than its top speed on level ground.",
    points: [
      "On the hill the engine must also provide a force to balance the component of weight down the slope (mg sin θ), as well as the resistive forces.",
      "So the total driving force needed at any speed is larger.",
      "With P = Fv fixed, a larger F means a smaller v at which the forces balance.",
    ],
    modelAnswer: "On the hill the driving force must balance the weight component mg sin θ as well as air and rolling resistance, so a larger force is needed at every speed. With the power fixed, P = Fv means the speed at which the forces balance is lower.",
    explanation: "Top speed is where P/v equals the total opposing force; a hill adds to that force.",
    hints: ["What extra force must the engine overcome on a slope?"],
  });

  // Practice structured: measuring a student's power on stairs (12 marks)
  {
    const m = 62.0, step = 0.175, n = 20;
    const h = step * n;
    const times = [5.42, 5.18, 5.65, 5.31, 5.24];
    const tm = mean(times), dt = halfRange(times);
    const Pw = (m * g * h) / tm;
    const pct = pctUnc(0.5, m) + pctUnc(0.002 * n, h) + pctUnc(dt, tm);
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Tatenda measures his own power by running up a staircase of $${n}$ steps. He measures one step as $(${step * 100}\ \pm 0.2)\ \text{cm}$ high. His mass is $(${m.toFixed(1)} \pm 0.5)\ \text{kg}$. A friend times five runs: $${times.join("$, $")}\ \text{s}$.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the vertical height of the staircase, in m.", value: h, unit: "m", wrong: [step], explanation: t`$${n} \times 0.175 = ${dpStr(h, 2)}\ \text{m}$.` }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate the mean time, in s, to three significant figures.", value: tm, unit: "s", wrong: [times[0]], explanation: t`Mean $= ${sfStr(tm, 3)}\ \text{s}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate his average useful power, in W, to three significant figures.", value: Pw, unit: "W", wrong: [(m * h) / tm], explanation: t`$P = \dfrac{mgh}{t} = \dfrac{${m} \times 9.81 \times ${dpStr(h, 2)}}{${sfStr(tm, 3)}} = ${sfStr(Pw, 3)}\ \text{W}$.` }),
        P.num({ label: "(d)", marks: 3, stem: "Using half the range for the time, and the uncertainty in one step multiplied by the number of steps for the height, calculate the percentage uncertainty in the power, to two significant figures.", value: pct, sf: 2, unit: "%", wrong: [pctUnc(dt, tm)],
          explanation: t`Height: $\Delta h = ${n} \times 0.2\ \text{cm} = 4\ \text{cm}$, so $\dfrac{0.04}{${dpStr(h, 2)}} \times 100 = ${sfStr(pctUnc(0.002 * n, h), 2)}\%$. Mass: $${sfStr(pctUnc(0.5, m), 2)}\%$. Time: half-range $= ${dpStr(dt, 3)}\ \text{s}$, $${sfStr(pctUnc(dt, tm), 2)}\%$. Total $= ${sfStr(pct, 2)}\%$.` }),
        P.manual({ label: "(e)", marks: 1, stem: "Identify the largest source of uncertainty.", points: [t`The time (about $${sfStr(pctUnc(dt, tm), 2)}\%$), from reaction time in starting and stopping the stop-watch and variation between runs.`], modelAnswer: t`The timing, about $${sfStr(pctUnc(dt, tm), 2)}\%$, from the friend's reaction time and the variation between runs.` }),
        P.manual({ label: "(f)", marks: 2, stem: "Suggest two improvements to the method.", points: ["Use light gates (or a video with a timer) at the bottom and top of the stairs to remove reaction time.", "Measure the total height directly with a long tape or measure several steps (all steps differ slightly); use a taller staircase so the time is longer."], modelAnswer: "Time the run with light gates at the bottom and top, or with video, to remove reaction time; measure the total vertical height directly with a tape measure rather than multiplying one step, and use a taller staircase so the time and height are larger." }),
        P.manual({ label: "(g)", marks: 2, stem: "Explain why the power calculated is less than the total power output of his muscles.", points: ["His muscles also give him kinetic energy (he is moving at the top and his legs and arms accelerate and decelerate).", "Muscles are inefficient: much of the chemical energy is transferred to thermal energy (and work is done against friction / air resistance)."], modelAnswer: "The calculation only includes the gain in potential energy. His muscles also give kinetic energy to his body and limbs, and they transfer much of the chemical energy to thermal energy, so the total power is larger." }),
      ],
      explanation: "Useful power = mgh/t; percentage uncertainties of m, h and t add.",
      hints: ["Height = steps × step height.", "Percentage uncertainties add for a product or quotient."],
    });
  }
  // Practice structured: an electric car (8 marks)
  {
    const m = 1600, v = 20, R = 650, Pmax = 80e3, effM = 0.9;
    const Pres = R * v;
    const aAt = (Pmax / v - R) / m;
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`An electric car of mass $1600\ \text{kg}$ travels on a level road. At $20\ \text{m s}^{-1}$ the total resistive force is $650\ \text{N}$. Its motor can deliver a maximum useful power of $80\ \text{kW}$ and is 90% efficient.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: t`Calculate the useful power needed to keep the car moving at a constant $20\ \text{m s}^{-1}$, in W.`, value: Pres, unit: "W", wrong: [R / v], explanation: t`$P = Fv = 650 \times 20 = ${Pres}\ \text{W}$.` }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate the electrical power drawn from the battery at this speed, in W, to three significant figures.", value: Pres / effM, unit: "W", wrong: [Pres * effM], explanation: t`$P_{\text{in}} = \dfrac{${Pres}}{0.90} = ${sfStr(Pres / effM, 3)}\ \text{W}$.` }),
        P.num({ label: "(c)", marks: 3, stem: t`Calculate the maximum acceleration the car can have at $20\ \text{m s}^{-1}$, in $\text{m s}^{-2}$, to three significant figures.`, value: aAt, unit: "m/s²", wrong: [Pmax / v / m], explanation: t`Driving force at full power $= 80\,000/20 = ${Pmax / v}\ \text{N}$; resultant $= ${Pmax / v} - 650 = ${Pmax / v - R}\ \text{N}$; $a = ${Pmax / v - R}/1600 = ${sfStr(aAt, 3)}\ \text{m s}^{-2}$.` }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain why the maximum acceleration is smaller at higher speeds.", points: ["The maximum driving force P/v decreases as v increases.", "The resistive force increases with speed, so the resultant force (and acceleration) falls."], modelAnswer: "At full power the driving force is P/v, which falls as speed rises, while the resistive force rises with speed, so the resultant force and hence the acceleration both decrease." }),
      ],
      explanation: "Use P = Fv for the driving force and F = ma for the resultant force; input power = output ÷ efficiency.",
      hints: ["Driving force = P/v.", "Efficiency links output and input power."],
    });
  }

  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 3,
    stem: "Explain why a kombi uses more fuel per kilometre when driven at 120 km/h than at 80 km/h on the same level road.",
    points: [
      "Air resistance increases with speed (roughly with v²), so the driving force needed at constant speed is larger.",
      "Work done per kilometre = driving force × 1000 m, so more energy is needed per kilometre.",
      "That energy comes from the fuel (the engine also needs power P = Fv, which rises even faster), so fuel use per kilometre increases.",
    ],
    modelAnswer: "At constant speed the driving force equals the resistive force, and air resistance grows rapidly with speed. The work done per kilometre is this force × 1000 m, so more energy, and therefore more fuel, is needed for each kilometre at 120 km/h. The engine's power, Fv, increases even faster than the force.",
    explanation: "Energy per kilometre = resistive force × distance, and resistance rises with speed.",
    hints: ["At constant speed, what does the driving force equal?"],
  });

  b.card("DEFINITION", "**Power**", "Work done per unit time; the rate of energy transfer.");
  b.card("DEFINITION", "**The watt**", "One joule per second; kg m² s⁻³ in base units.");
  b.card("FORMULA", "Power of a force moving at velocity v", t`$P = Fv$`);
  b.card("CONCEPT", "Derivation of P = Fv", "P = W/t = F × s/t = Fv.");
  b.card("CONCEPT", "Vehicle at constant speed on a level road", "Driving force = total resistive force; power output = resistive force × speed.");
  b.card("CONCEPT", "Condition for top speed at full power", "P_max / v = total resistive force, so the resultant force is zero.");
  b.card("FORMULA", "Useful power of a pump lifting water", "(mass of water per second) × g × height (+ kinetic energy given per second)");
  b.card("FACT", "1 kW h in joules", t`$3.6 \times 10^{6}\ \text{J}$`);
  b.card("FORMULA", "Efficiency using power", "useful power output ÷ total power input × 100%");
});
