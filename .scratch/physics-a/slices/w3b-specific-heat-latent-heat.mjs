// W3b: aphys.thermal.specific-heat-latent-heat — ΔQ = mcΔθ, ΔQ = mL, electrical methods with loss corrections,
// method of mixtures, heating and cooling curves, energy and power problems.
import { concept, P, t, chk, sfStr, dpStr, sciTex, pctUnc, table, linFit } from "../lib.mjs";

concept("aphys.thermal.specific-heat-latent-heat", { file: "thermal/specific-heat-latent-heat", keyPrefix: "thermal.specific-heat-latent-heat" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the SI unit of specific latent heat?",
    options: [
      [t`$\text{J kg}^{-1}$`, "Correct: energy per unit mass."],
      [t`$\text{J kg}^{-1}\ \text{K}^{-1}$`, "That is the unit of specific heat capacity; there is no temperature change during a phase change."],
      [t`$\text{J K}^{-1}$`, "That is the unit of heat capacity of a whole object."],
      [t`$\text{W kg}^{-1}$`, "Latent heat is energy, not power, per unit mass."],
    ],
    answer: "A",
    explanation: "L = ΔQ/m, so J kg⁻¹.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "While a pure liquid boils at constant pressure, energy is supplied but its temperature does not rise. Where does the energy go?",
    options: [
      ["It increases the potential energy of the molecules as they separate.", "Correct: bonds are broken and work is done against the atmosphere; mean kinetic energy is unchanged."],
      ["It increases the mean kinetic energy of the molecules in the liquid.", "That would raise the temperature."],
      ["It is all lost to the surroundings as the vapour escapes.", "The energy is stored in the vapour as latent heat, released again on condensing."],
      ["It increases the specific heat capacity of the liquid.", "c is a property of the material, not something energy is stored in."],
    ],
    answer: "A",
    explanation: "Constant temperature means constant mean kinetic energy; the energy increases molecular potential energy.",
  });
  {
    const P0 = 1500, m = 0.50;
    b.mcq({
      d: 3, skill: "ANALYSIS",
      stem: t`A $0.50\ \text{kg}$ solid is heated by a $1.5\ \text{kW}$ heater with no energy losses. Its temperature rises at $3.0\ \text{K s}^{-1}$ while solid and at $1.5\ \text{K s}^{-1}$ once it has melted. Which statement is correct?`,
      options: [
        ["The specific heat capacity of the liquid is twice that of the solid.", "Correct: rate of rise = P/(mc), so halving the rate means c has doubled."],
        ["The specific heat capacity of the liquid is only half that of the solid.", "A smaller c would make the temperature rise faster, not slower."],
        ["The liquid has a lower melting point than the solid.", "Melting point is one temperature shared by both phases."],
        ["Energy is being lost faster once the substance has melted.", "The stem says there are no losses; the change is in c."],
      ],
      answer: "A",
      explanation: t`$c = \dfrac{P}{m(\Delta\theta/\Delta t)}$: solid $${P0 / (m * 3)}\ \text{J kg}^{-1}\ \text{K}^{-1}$, liquid $${P0 / (m * 1.5)}\ \text{J kg}^{-1}\ \text{K}^{-1}$.`,
      hints: ["dθ/dt = P/(mc)."],
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In an electrical experiment to find the specific heat capacity of an aluminium block, energy is lost to the surroundings. How does this affect the result?",
    options: [
      ["The value of c is too large, because the measured temperature rise is too small.", "Correct: c = VIt/(mΔθ) with Δθ too small."],
      ["The value of c is too small, because the measured temperature rise is too small.", "A smaller Δθ in the denominator gives a larger c."],
      ["The value of c is unaffected, because c depends only on the material.", "c is a property of aluminium, but the calculated value is affected."],
      ["The value of c is too small, because less energy is supplied by the heater.", "The heater supplies VIt regardless; the losses reduce the temperature rise."],
    ],
    answer: "A",
    explanation: "Part of VIt escapes, so Δθ is smaller than it would be, and c = VIt/(mΔθ) is overestimated.",
  });
  {
    const m1 = 0.30, T1 = 80, m2 = 0.50, T2 = 20;
    const Tf = (m1 * T1 + m2 * T2) / (m1 + m2);
    b.mcq({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: t`$0.30\ \text{kg}$ of water at $80\ ^\circ\text{C}$ is mixed with $0.50\ \text{kg}$ of water at $20\ ^\circ\text{C}$ in an insulated flask of negligible heat capacity. What is the final temperature?`,
      options: [
        [t`$${sfStr(Tf, 3)}\ ^\circ\text{C}$`, "Correct: 0.30(80 − θ) = 0.50(θ − 20)."],
        [t`$${sfStr((T1 + T2) / 2, 3)}\ ^\circ\text{C}$`, "The simple average ignores the different masses."],
        [t`$${sfStr((m2 * T1 + m1 * T2) / (m1 + m2), 3)}\ ^\circ\text{C}$`, "This weights each temperature by the wrong mass."],
        [t`$${sfStr(T1 - T2, 3)}\ ^\circ\text{C}$`, "This is the initial temperature difference, not the final temperature."],
      ],
      answer: "A",
      explanation: t`Same $c$ cancels: $\theta = \dfrac{0.30 \times 80 + 0.50 \times 20}{0.80} = ${sfStr(Tf, 3)}\ ^\circ\text{C}$.`,
    });
  }
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "In the two-power method for the specific latent heat of vaporisation of water, why is the experiment repeated at a second heater power for the same time?",
    options: [
      ["So that the unknown rate of energy loss cancels on subtracting", "Correct: P₁t − P₂t = (m₁ − m₂)L."],
      ["So that two values of L can be averaged", "Averaging is not the purpose; the loss term is eliminated algebraically."],
      ["So that the water boils faster at the higher power", "Both runs are taken only once the water is already boiling steadily."],
      ["So that the heat capacity of the container is found", "No temperature change occurs during steady boiling."],
    ],
    answer: "A",
    explanation: "With the same container and boiling temperature, the loss rate h is the same in both runs, so it cancels.",
    hints: ["Write Pt = mL + ht for each run."],
  });
  {
    const m = 180, c = 4200, dT = 38, P0 = 3000;
    const tt = (m * c * dT) / P0;
    b.num({
      d: 2, skill: "APPLICATION", calculator: true, daily: true,
      stem: t`A $3.0\ \text{kW}$ electric geyser heats $180\ \text{kg}$ of water from $17\ ^\circ\text{C}$ to $55\ ^\circ\text{C}$. Ignoring losses, calculate the time taken, in hours, to two significant figures. ($c = 4200\ \text{J kg}^{-1}\ \text{K}^{-1}$)`,
      value: tt / 3600, sf: 2, unit: "h", wrong: [tt, tt / 60],
      explanation: t`$t = \dfrac{mc\Delta\theta}{P} = \dfrac{180 \times 4200 \times 38}{3000} = ${sfStr(tt, 3)}\ \text{s} = ${sfStr(tt / 3600, 2)}\ \text{h}$.`,
    });
  }
  {
    const m = 0.045, L = 3.34e5, mw = 0.25, c = 4200, Ti = 28;
    const Tf = (mw * c * Ti - m * L) / ((mw + m) * c);
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`$45\ \text{g}$ of ice at $0\ ^\circ\text{C}$ is added to $250\ \text{g}$ of a drink (treat as water, $c = 4200\ \text{J kg}^{-1}\ \text{K}^{-1}$) at $28\ ^\circ\text{C}$ in an insulated cup. The specific latent heat of fusion of ice is $3.34 \times 10^{5}\ \text{J kg}^{-1}$. Calculate the final temperature, in °C, to three significant figures.`,
      value: Tf, unit: "°C", wrong: [(mw * c * Ti) / ((mw + m) * c), Ti - (m * L) / (mw * c)],
      explanation: t`1. Energy to melt the ice: $0.045 \times 3.34 \times 10^{5} = ${sfStr(m * L, 4)}\ \text{J}$.
2. Energy lost by the drink = energy to melt the ice + energy to warm the meltwater: $0.25 \times 4200 \times (28 - \theta) = ${sfStr(m * L, 4)} + 0.045 \times 4200 \times \theta$.
3. $29\,400 - 1050\,\theta = ${sfStr(m * L, 4)} + 189\,\theta$, so $\theta = ${sfStr(Tf, 3)}\ ^\circ\text{C}$. Forgetting to warm the meltwater gives $${sfStr(Ti - (m * L) / (mw * c), 3)}\ ^\circ\text{C}$.`,
      hints: ["The ice first melts, then the meltwater warms from 0 °C.", "Energy lost = energy gained."],
    });
  }
  {
    const V = 11.8, I = 4.15, tt = 600, m = 1.000, dT = 30.2;
    const c = (V * I * tt) / (m * dT);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A $1.000\ \text{kg}$ metal block is heated for $10.0$ minutes by a heater with a p.d. of $11.8\ \text{V}$ and a current of $4.15\ \text{A}$. Its temperature rises by $30.2\ \text{K}$. Calculate the specific heat capacity of the metal, in $\text{J kg}^{-1}\ \text{K}^{-1}$, to three significant figures.`,
      value: c, unit: "J/(kg K)", wrong: [(V * I * 10) / (m * dT), (V * I) / (m * dT)],
      explanation: t`$c = \dfrac{VIt}{m\Delta\theta} = \dfrac{11.8 \times 4.15 \times 600}{1.000 \times 30.2} = ${sfStr(c, 3)}\ \text{J kg}^{-1}\ \text{K}^{-1}$ (close to aluminium). Time must be in seconds.`,
      hints: ["Energy supplied = VIt with t in seconds."],
    });
  }
  {
    // two-power method
    const P1 = 72, P2 = 48, tt = 400, m1 = 10.62e-3, m2 = 6.38e-3;
    const L = ((P1 - P2) * tt) / (m1 - m2);
    const h = (P1 * tt - m1 * L) / tt;
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Water is kept boiling by an immersion heater. In $400\ \text{s}$, $10.62\ \text{g}$ boils away when the heater power is $72\ \text{W}$, and $6.38\ \text{g}$ boils away in the same time at $48\ \text{W}$. Calculate the specific latent heat of vaporisation, in $\text{J kg}^{-1}$, to three significant figures.`,
      value: L, unit: "J/kg", wrong: [(P1 * tt) / m1, (P2 * tt) / m2],
      explanation: t`1. $P_1t = m_1L + ht$ and $P_2t = m_2L + ht$.
2. Subtracting: $L = \dfrac{(P_1 - P_2)t}{m_1 - m_2} = \dfrac{24 \times 400}{4.24 \times 10^{-3}} = ${sciTex(L)}\ \text{J kg}^{-1}$.
3. The loss rate is $h = ${sfStr(h, 2)}\ \text{W}$. Using $P_1t/m_1$ alone gives $${sciTex((P1 * tt) / m1)}\ \text{J kg}^{-1}$, too large because of the losses.`,
      hints: ["Write an energy equation for each power and subtract."],
    });
    chk(h > 0 ? 1 : 0, 1);
  }
  {
    // cooling curve: latent heat of fusion of wax from cooling rate
    const m = 0.080, cl = 2900, rate = 0.050, plateau = 420;
    const Pl = m * cl * rate;
    const L = (Pl * plateau) / m;
    b.calc({
      d: 5, skill: "ANALYSIS", calculator: true,
      stem: t`$80\ \text{g}$ of molten wax ($c = 2900\ \text{J kg}^{-1}\ \text{K}^{-1}$ as a liquid) cools in a room. Just above its melting point its temperature falls at $0.050\ \text{K s}^{-1}$. It then stays at the melting point for $420\ \text{s}$ while it solidifies. Assuming the rate of energy loss is the same just above and at the melting point, calculate the specific latent heat of fusion of the wax, in $\text{J kg}^{-1}$, to two significant figures.`,
      value: L, sf: 2, unit: "J/kg", wrong: [Pl * plateau, cl * rate * plateau * m],
      explanation: t`1. Rate of energy loss just above the melting point: $mc\dfrac{\Delta\theta}{\Delta t} = 0.080 \times 2900 \times 0.050 = ${sfStr(Pl, 3)}\ \text{W}$.
2. Energy released while solidifying $= ${sfStr(Pl, 3)} \times 420 = ${sfStr(Pl * plateau, 3)}\ \text{J}$.
3. $L_f = \dfrac{${sfStr(Pl * plateau, 3)}}{0.080} = ${sciTex(L, 2)}\ \text{J kg}^{-1}$.`,
      hints: ["Use the cooling rate to find the power lost.", "That power continues during the flat section."],
    });
  }
  {
    // uncertainty: c from VIt/(mΔθ)
    const dTpct = pctUnc(0.5 + 0.5, 12.0), Vp = pctUnc(0.1, 6.0), Ip = pctUnc(0.05, 2.50), tp = pctUnc(2, 300), mp = pctUnc(0.001, 0.500);
    const tot = dTpct + Vp + Ip + tp + mp;
    b.num({
      d: 4, skill: "EVALUATION", calculator: true,
      stem: t`In an experiment to find $c = \dfrac{VIt}{m\Delta\theta}$: $V = 6.0 \pm 0.1\ \text{V}$, $I = 2.50 \pm 0.05\ \text{A}$, $t = 300 \pm 2\ \text{s}$, $m = 0.500 \pm 0.001\ \text{kg}$, and the temperature rise of $12.0\ \text{K}$ is the difference of two readings each $\pm 0.5\ \text{K}$. Calculate the percentage uncertainty in $c$, to two significant figures.`,
      value: tot, sf: 2, unit: "%", wrong: [tot - dTpct / 2, Vp + Ip + tp + mp],
      explanation: t`Percentages: $V$ ${sfStr(Vp, 2)}%, $I$ ${sfStr(Ip, 2)}%, $t$ ${sfStr(tp, 2)}%, $m$ ${sfStr(mp, 2)}%, $\Delta\theta$ $\dfrac{1.0}{12.0} \times 100 = ${sfStr(dTpct, 2)}\%$. Total $${sfStr(tot, 2)}\%$: the temperature rise dominates, so a larger rise (longer heating) would improve the result.`,
      hints: ["A difference of two readings has twice the uncertainty of one.", "Add the percentage uncertainties."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A scald from steam at 100 °C is usually worse than one from the same mass of water at 100 °C, because the steam releases its latent heat of vaporisation as it condenses on the skin.",
    answer: true,
    explanation: "True. Each kilogram of condensing steam gives about 2.3 MJ before the resulting water cools.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "A solid is heated at constant power from below its melting point until it boils. Match each part of the temperature-time graph with what it shows.",
    pairs: [
      ["First sloping section", "Solid warming: gradient P/(mc of the solid)"],
      ["First flat section", "Melting: energy supplied is mL of fusion"],
      ["Second sloping section", "Liquid warming: gradient P/(mc of the liquid)"],
      ["Second, longer flat section", "Boiling: energy supplied is mL of vaporisation"],
    ],
    explanation: "Flat sections are phase changes; their lengths are mL/P, and boiling's is longer because L_v > L_f.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the definition.",
    template: "Specific heat capacity is the energy required per unit {{blank:a}} to raise the temperature of a substance by one {{blank:b}}, without a change of {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["mass"], choices: ["mass", "volume", "time"] },
      { id: "b", accepted: ["kelvin"], choices: ["kelvin", "joule", "kilogram"] },
      { id: "c", accepted: ["phase"], choices: ["phase", "pressure", "volume"] },
    ],
    explanation: "c = ΔQ/(mΔθ).",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 5,
    stem: "Describe an electrical method to determine the specific heat capacity of a liquid such as cooking oil, stating the measurements, the equation used and two ways of reducing the effect of energy losses.",
    points: [
      "Known mass of oil (balance) in an insulated container/calorimeter with an immersion heater, stirrer and thermometer.",
      "Measure V and I (voltmeter and ammeter, or a joulemeter) and the heating time t with a stop-watch.",
      "Record the initial temperature and the highest final temperature, stirring throughout.",
      "c = (VIt − energy taken by the container)/(mΔθ).",
      "Reduce losses: lag the container and use a lid; or start below room temperature and finish the same amount above it; keep heating time short.",
    ],
    modelAnswer: "Weigh a mass m of oil into a lagged calorimeter with a lid, containing an immersion heater, a stirrer and a thermometer. Record the starting temperature, switch on, and measure the p.d. V, current I and heating time t. Stir continuously and record the highest temperature reached after switching off. Then c = (VIt − energy absorbed by the calorimeter)/(mΔθ). Losses are reduced by lagging and a lid, by starting a few degrees below room temperature and finishing the same amount above it, and by using a short heating time.",
    explanation: "Energy in = VIt; energy stored = mcΔθ (plus the container).",
    hints: ["What do you measure to find the energy supplied?"],
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "In an experiment to find the specific latent heat of fusion of ice with an immersion heater, a second funnel of ice without a heater is set up beside the first. Explain why, and how its result is used.",
    points: [
      "Ice also melts because energy flows in from the warmer room, not only from the heater.",
      "The control funnel (same ice, same time, no heater) measures the mass melted by the surroundings.",
      "Subtract this mass from the mass collected with the heater: L = VIt/(m_heater − m_control).",
    ],
    modelAnswer: "Some ice melts because energy flows in from the room, which would make the measured mass too large and L too small. The identical funnel without a heater, left for the same time, measures how much melts from the room alone. Subtracting its mass from the heater funnel's mass gives the mass melted by the heater's energy VIt, so L = VIt/(m₁ − m₂).",
    explanation: "A control removes the energy gained from the surroundings.",
    hints: ["Here energy flows INTO the ice from the room."],
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain, in terms of molecules, why the specific latent heat of vaporisation of a substance is much larger than its specific latent heat of fusion.",
    points: [
      "Melting only loosens the arrangement: each molecule keeps most of its neighbours (close spacing).",
      "Boiling separates the molecules completely, overcoming nearly all the attractive forces, so a much larger increase in potential energy.",
      "Boiling also involves a large increase in volume, so work is done against the atmosphere.",
    ],
    modelAnswer: "In melting the molecules stay about as close together as in the solid, so only some intermolecular bonds are broken. In boiling the molecules are separated completely, so far more energy is needed to increase their potential energy, and the large increase in volume also requires work to be done against atmospheric pressure.",
    explanation: "More bonds broken plus work against the atmosphere.",
  });

  // Practice structured: heating curve data (14 marks)
  {
    const P0 = 150, m = 0.40, step = 90;
    const ts = [0, 90, 180, 270, 360, 450, 540, 630, 720];
    // solid c = 1800, melting at 54 °C with L = 1.7e5 J/kg, liquid c = 2500 (illustrative paraffin-like values)
    const cs = 1800, cl = 2500, Lf = 1.7e5, Tm = 54, T0 = 26.0;
    const rateS = P0 / (m * cs), rateL = P0 / (m * cl);
    const tm = (Tm - T0) / rateS;
    const tp = (m * Lf) / P0;
    const Tof = (x) => (x <= tm ? T0 + rateS * x : x <= tm + tp ? Tm : Tm + rateL * (x - tm - tp));
    const Ts = ts.map((x) => Math.round(Tof(x) * 10) / 10);
    const tA = Math.round(tm), tB = Math.round(tm + tp);
    const Lcalc = (P0 * (tB - tA)) / m;
    const cS = (P0 * step) / (m * (Ts[1] - Ts[0])), cL = (P0 * step) / (m * (Ts[8] - Ts[7]));
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Sipho heats $0.40\ \text{kg}$ of a solid wax in a well-insulated container with a $150\ \text{W}$ heater and records its temperature:

${table([t`$t\,/\,\text{s}$`, t`$\theta\,/\,^\circ\text{C}$`], ts.map((x, i) => [String(x), dpStr(Ts[i], 1)]))}

Assume all the heater's energy goes into the wax.`,
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: "Describe the shape of the temperature-time graph and identify the melting point.", points: ["Temperature rises steadily (straight line), then is constant for a period, then rises steadily again with a smaller gradient.", t`The constant section is at the melting point, ${Tm} °C.`], modelAnswer: t`The temperature rises linearly, stays constant at ${Tm} °C while the wax melts, and then rises linearly again but less steeply.` }),
        P.num({ label: "(b)", marks: 3, stem: t`Use the readings at $t = 0$ and $t = 90\ \text{s}$ to calculate the specific heat capacity of the solid wax, in $\text{J kg}^{-1}\ \text{K}^{-1}$, to two significant figures.`, value: cS, sf: 2, unit: "J/(kg K)", wrong: [(P0 * step) / (Ts[1] - Ts[0])], explanation: t`$c = \dfrac{Pt}{m\Delta\theta} = \dfrac{150 \times 90}{0.40 \times ${dpStr(Ts[1] - Ts[0], 1)}} = ${sfStr(cS, 2)}\ \text{J kg}^{-1}\ \text{K}^{-1}$.` }),
        P.num({ label: "(c)", marks: 3, stem: t`A closer look shows the wax is at the melting point from $t = ${tA}\ \text{s}$ to $t = ${tB}\ \text{s}$. Calculate the specific latent heat of fusion, in $\text{J kg}^{-1}$, to two significant figures.`, value: Lcalc, sf: 2, unit: "J/kg", wrong: [P0 * (tB - tA), (P0 * tB) / m], explanation: t`Energy $= Pt = 150 \times ${tB - tA} = ${sfStr(P0 * (tB - tA), 3)}\ \text{J}$; $L = \dfrac{${sfStr(P0 * (tB - tA), 3)}}{0.40} = ${sciTex(Lcalc, 2)}\ \text{J kg}^{-1}$.` }),
        P.num({ label: "(d)", marks: 2, stem: t`Use the readings at $t = 630\ \text{s}$ and $t = 720\ \text{s}$ to calculate the specific heat capacity of the liquid wax, in $\text{J kg}^{-1}\ \text{K}^{-1}$, to two significant figures.`, value: cL, sf: 2, unit: "J/(kg K)", wrong: [cS], explanation: t`$c = \dfrac{150 \times 90}{0.40 \times ${dpStr(Ts[8] - Ts[7], 1)}} = ${sfStr(cL, 2)}\ \text{J kg}^{-1}\ \text{K}^{-1}$.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain why the temperature is constant while the wax melts.", points: ["The energy supplied increases the potential energy of the molecules (breaking intermolecular bonds / the solid structure).", "The mean kinetic energy of the molecules does not change, so the temperature does not change."], modelAnswer: "During melting the energy supplied breaks the solid structure, increasing the potential energy of the molecules; their mean kinetic energy, and so the temperature, stays the same." }),
        P.manual({ label: "(f)", marks: 2, stem: "In reality some energy is lost to the surroundings. State and explain the effect on the value of L in (c).", points: ["Less than Pt actually goes into melting the wax (so the plateau lasts longer).", "So the calculated L is larger than the true value."], modelAnswer: "Some of the heater's energy is lost during the plateau, so the wax receives less than Pt and takes longer to melt; the calculated L = Pt/m is therefore too large." }),
      ],
      explanation: "Sloping sections give c = P/(m × gradient); the flat section gives L = Pt/m.",
      hints: ["On a sloping section, c = PΔt/(mΔθ).", "On the flat section, L = PΔt/m."],
    });
    chk(Ts[2] === Tm && Ts[6] === Tm && Ts[7] > Tm ? 1 : 0, 1);
  }
  // Practice structured: solar geyser energy budget (8 marks)
  {
    const I = 800, A = 2.0, eff = 0.45, m = 150, c = 4200, hours = 5;
    const Pin = I * A * eff;
    const E = Pin * hours * 3600;
    const dT = E / (m * c);
    b.struct({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A solar geyser on a roof in Masvingo has a collector of area $2.0\ \text{m}^2$. Sunlight of intensity $800\ \text{W m}^{-2}$ falls on it for 5.0 hours, and $45\%$ of the incident energy is transferred to $150\ \text{kg}$ of water in the tank. ($c = 4200\ \text{J kg}^{-1}\ \text{K}^{-1}$)`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the useful power delivered to the water, in W.", value: Pin, unit: "W", wrong: [I * A], explanation: t`$P = 800 \times 2.0 \times 0.45 = ${Pin}\ \text{W}$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the energy delivered to the water in 5.0 hours, in J, to two significant figures.", value: E, sf: 2, unit: "J", wrong: [Pin * hours], explanation: t`$E = Pt = ${Pin} \times 5.0 \times 3600 = ${sciTex(E, 2)}\ \text{J}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the rise in temperature of the water, in K, to two significant figures.", value: dT, sf: 2, unit: "K", wrong: [E / c], explanation: t`$\Delta\theta = \dfrac{E}{mc} = \dfrac{${sciTex(E, 2)}}{150 \times 4200} = ${sfStr(dT, 2)}\ \text{K}$.` }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain why water is a good choice of liquid for storing the energy, and suggest one feature of the tank that keeps the water hot overnight.", points: ["Water has a high specific heat capacity, so it stores a lot of energy for a modest temperature rise (and is cheap and safe).", "Thick insulation (lagging) round the tank, reducing conduction (and convection) losses."], modelAnswer: "Water has a very high specific heat capacity, so it stores a large amount of energy for each kelvin of temperature rise, and it is cheap and safe. A thickly lagged tank reduces the energy lost overnight." }),
      ],
      explanation: "Useful power × time = mcΔθ.",
      hints: ["Convert hours to seconds."],
    });
  }

  b.card("DEFINITION", "**Specific heat capacity**", "Energy required per unit mass to raise the temperature by one kelvin, without a change of phase.");
  b.card("DEFINITION", "**Specific latent heat of fusion**", "Energy required per unit mass to change solid to liquid at constant temperature.");
  b.card("DEFINITION", "**Specific latent heat of vaporisation**", "Energy required per unit mass to change liquid to gas at constant temperature.");
  b.card("FORMULA", "Heating and phase change", t`$\Delta Q = mc\Delta\theta$; $\Delta Q = mL$`);
  b.card("FORMULA", "Two-power method", t`$L = \dfrac{(P_1 - P_2)t}{m_1 - m_2}$ (loss rate cancels)`);
  b.card("CONCEPT", "Heating curve", "Sloping sections: gradient = P/(mc). Flat sections: phase change, length = mL/P; boiling plateau longer than melting.");
  b.card("CONCEPT", "Effect of heat losses", "Measured Δθ too small (or extra mass/time needed), so the calculated c or L is too large.");
  b.card("CONCEPT", "Method of mixtures", "Energy lost by the hot body = energy gained by the cold body (+ container); remember to warm any meltwater.");
  b.card("FACT", "Water", "c ≈ 4200 J kg⁻¹ K⁻¹, L_f ≈ 3.3 × 10⁵ J kg⁻¹, L_v ≈ 2.26 × 10⁶ J kg⁻¹.");
});
