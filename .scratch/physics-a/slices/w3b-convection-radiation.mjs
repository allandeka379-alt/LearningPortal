// W3b: aphys.matter.convection-radiation (ZIMSEC only) — natural and forced convection, thermal radiation, black body,
// Stefan-Boltzmann law (and net radiation), Wien's law qualitatively, solar heaters, flasks, greenhouses, heat sinks.
import { concept, P, t, DATA, chk, sfStr, dpStr, sciTex, toK, table, pctUnc } from "../lib.mjs";

const s = DATA.sigma;

concept("aphys.matter.convection-radiation", { file: "matter/convection-radiation", keyPrefix: "matter.convection-radiation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement about thermal radiation is correct?",
    options: [
      ["It is electromagnetic radiation, mainly infrared, and can cross a vacuum.", "Correct: no medium is needed."],
      ["It is carried by the bulk movement of warm air and so it needs a fluid.", "That is convection."],
      ["It is emitted only by bodies that are hotter than their surroundings.", "Every body above absolute zero emits; a cooler body simply absorbs more than it emits."],
      ["It travels through solids by vibrations passed between neighbouring atoms.", "That is conduction."],
    ],
    answer: "A",
    explanation: "Thermal radiation is electromagnetic, emitted by every body, and travels at the speed of light even through a vacuum.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In a thermosiphon solar water heater, why must the storage tank be above the collector panel?",
    options: [
      ["Warm water is less dense, so it rises from the panel into the tank by natural convection.", "Correct: the density difference drives the circulation without a pump."],
      ["Hot water is denser than cold water, so it would sink from the tank down into the panel.", "Warm water is less dense than cold water, not denser."],
      ["The tank must be closer to the Sun to absorb more radiation.", "The tank is insulated; the panel does the absorbing."],
      ["Water conducts heat upwards better than downwards.", "Conduction has no preferred direction; the circulation is convection."],
    ],
    answer: "A",
    explanation: "Heated water expands, becomes less dense and rises to the tank; colder, denser water sinks back to the panel.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which surface is the best emitter of thermal radiation at a given temperature?",
    options: [
      ["Matt black", "Correct: good absorbers are good emitters."],
      ["Polished silver", "Shiny surfaces reflect well and emit poorly."],
      ["Gloss white", "Light, smooth surfaces are poor emitters of infrared compared with matt black."],
      ["Polished aluminium", "Shiny metal surfaces are among the poorest emitters."],
    ],
    answer: "A",
    explanation: "A matt black surface is close to a black body: the best absorber and the best emitter.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "The thermodynamic temperature of a black body is doubled. Its surface area is unchanged. By what factor does the power it radiates increase?",
    options: [
      ["16", "Correct: P ∝ T⁴ and 2⁴ = 16."],
      ["4", "This would be P ∝ T²."],
      ["2", "Radiated power is not proportional to T."],
      ["8", "This would be P ∝ T³."],
    ],
    answer: "A",
    explanation: "P = σAT⁴, so doubling T multiplies P by 2⁴ = 16.",
    hints: ["Which power of T appears in the Stefan-Boltzmann law?"],
  });
  {
    const T1 = 27, T2 = 327;
    const f = (toK(T2) / toK(T1)) ** 4;
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A black body is heated from $27\ ^\circ\text{C}$ to $327\ ^\circ\text{C}$. By approximately what factor does the power it radiates increase?`,
      options: [
        [sfStr(f, 2), "Correct: (600/300)⁴ in kelvin."],
        [sfStr((T2 / T1) ** 4, 2), "This uses Celsius temperatures; the law needs kelvin."],
        [sfStr(toK(T2) / toK(T1), 2), "This is the ratio of temperatures, not of their fourth powers."],
        [sfStr((toK(T2) / toK(T1)) ** 2, 2), "The power depends on T⁴, not T²."],
      ],
      answer: "A",
      explanation: t`$\left(\dfrac{600}{300}\right)^4 = ${sfStr(f, 2)}$. With Celsius values the ratio would be absurdly large.`,
      hints: ["Convert both temperatures to kelvin first."],
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "As an electric stove plate is heated from room temperature until it glows orange, which statement about the radiation it emits is correct?",
    options: [
      ["The total power rises and the peak of the spectrum moves to shorter wavelengths.", "Correct: Stefan-Boltzmann and Wien together."],
      ["The total power rises and the peak of the spectrum moves towards longer wavelengths.", "Hotter bodies peak at shorter wavelengths (Wien)."],
      ["The total power is unchanged but the colour changes from red to orange.", "The power rises steeply, as T⁴."],
      ["It emits radiation only once it begins to glow.", "It emits infrared at all temperatures; glowing means some visible light is added."],
    ],
    answer: "A",
    explanation: "Power ∝ T⁴ rises; the peak wavelength is inversely proportional to T, so it moves towards the visible.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which feature of a vacuum flask mainly reduces energy transfer by radiation?",
    options: [
      ["The silvered surfaces of the walls", "Correct: they reflect infrared and are poor emitters."],
      ["The vacuum between the double walls", "The vacuum stops conduction and convection; radiation crosses a vacuum."],
      ["The stopper made of a poor conductor", "The stopper reduces conduction and convection through the top."],
      ["The thin glass of the walls", "Thin walls reduce conduction along the glass, not radiation."],
    ],
    answer: "A",
    explanation: "Radiation crosses the vacuum; silvering reflects it back and makes the hot wall a poor emitter.",
    hints: ["Which transfer can cross a vacuum?"],
  });
  {
    const A = 0.80, T = toK(37);
    b.num({
      d: 2, skill: "APPLICATION", calculator: true, daily: true,
      stem: t`A black body of surface area $0.80\ \text{m}^2$ is at $37\ ^\circ\text{C}$. Calculate the power it radiates, in W, to three significant figures. ($\sigma = 5.67 \times 10^{-8}\ \text{W m}^{-2}\ \text{K}^{-4}$)`,
      value: s * A * T ** 4, unit: "W", wrong: [s * A * 37 ** 4, s * A * T],
      explanation: t`$T = 310.15\ \text{K}$; $P = \sigma AT^4 = 5.67 \times 10^{-8} \times 0.80 \times 310.15^4 = ${sfStr(s * A * T ** 4, 3)}\ \text{W}$. Using $37$ instead of $310$ gives a tiny, wrong value.`,
    });
  }
  {
    const A = 1.2, T = toK(55), T0 = toK(25);
    const Pn = s * A * (T ** 4 - T0 ** 4);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A matt black radiator panel of surface area $1.2\ \text{m}^2$ is at $55\ ^\circ\text{C}$ in a room whose walls are at $25\ ^\circ\text{C}$. Treating the panel as a black body, calculate the net power it loses by radiation, in W, to two significant figures.`,
      value: Pn, sf: 2, unit: "W", wrong: [s * A * T ** 4, s * A * (T - T0) ** 4],
      explanation: t`1. $T = 328\ \text{K}$, $T_0 = 298\ \text{K}$.
2. $P_{\text{net}} = \sigma A(T^4 - T_0^4) = 5.67 \times 10^{-8} \times 1.2 \times (328^4 - 298^4)$.
3. $P_{\text{net}} = ${sfStr(Pn, 2)}\ \text{W}$. Note $(T - T_0)^4$ is not the same as $T^4 - T_0^4$.`,
      hints: ["Use kelvin.", "Net = emitted − absorbed."],
    });
  }
  {
    const P0 = 15, T = 380;
    const A = P0 / (s * T ** 4);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`An electronic component must lose $15\ \text{W}$ by radiation alone at $380\ \text{K}$. Ignoring radiation absorbed from the surroundings and treating its heat sink as a black body, calculate the surface area needed, in $\text{m}^2$, to two significant figures.`,
      value: A, sf: 2, unit: "m²", wrong: [P0 / (s * (380 - 273) ** 4)],
      explanation: t`$A = \dfrac{P}{\sigma T^4} = \dfrac{15}{5.67 \times 10^{-8} \times 380^4} = ${sfStr(A, 2)}\ \text{m}^2$. Real heat sinks rely mainly on convection, which is why they have fins and fans.`,
      hints: ["Rearrange P = σAT⁴ for A."],
    });
  }
  {
    const A1 = 2.0e-4, T1 = 1200, P2 = 0.5;
    const T2 = (P2 / (s * A1)) ** 0.25;
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A black-body radiator of area $2.0 \times 10^{-4}\ \text{m}^2$ emits $0.50\ \text{W}$. Calculate its temperature, in K, to three significant figures, ignoring absorption from the surroundings.`,
      value: T2, unit: "K", wrong: [Math.sqrt(P2 / (s * A1)), P2 / (s * A1)],
      explanation: t`1. $T^4 = \dfrac{P}{\sigma A} = \dfrac{0.50}{5.67 \times 10^{-8} \times 2.0 \times 10^{-4}} = ${sciTex(P2 / (s * A1))}\ \text{K}^4$.
2. $T = \left(${sciTex(P2 / (s * A1))}\right)^{1/4} = ${sfStr(T2, 3)}\ \text{K}$. Taking a square root instead of a fourth root gives a far too large value.`,
      hints: ["Rearrange for T⁴, then take the fourth root."],
    });
    chk(T1 > T2 ? 1 : 0, 1);
  }
  {
    // ratio of powers of two bodies
    const r1 = 0.10, r2 = 0.20, T1 = 600, T2 = 400;
    const ratio = (r2 / r1) ** 2 * (T2 / T1) ** 4;
    b.num({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Black sphere X has radius $0.10\ \text{m}$ and temperature $600\ \text{K}$. Black sphere Y has radius $0.20\ \text{m}$ and temperature $400\ \text{K}$. Calculate $\dfrac{P_Y}{P_X}$, the ratio of the powers they radiate, to three significant figures.`,
      value: ratio, wrong: [(r2 / r1) * (T2 / T1) ** 4, (r2 / r1) ** 2 * (T2 / T1)],
      explanation: t`$\dfrac{P_Y}{P_X} = \left(\dfrac{0.20}{0.10}\right)^2\left(\dfrac{400}{600}\right)^4 = 4 \times ${dpStr((T2 / T1) ** 4, 4)} = ${sfStr(ratio, 3)}$. Area depends on radius squared.`,
      hints: ["A = 4πr² for a sphere."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A body at the same temperature as its surroundings emits no thermal radiation.",
    answer: false,
    explanation: "False. It emits and absorbs at equal rates, so its net transfer is zero, but it is still emitting.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each feature with the main transfer it reduces or uses.",
    pairs: [
      ["Vacuum between the walls of a flask", "Stops conduction and convection"],
      ["Silvered inner walls of a flask", "Reduces radiation"],
      ["Fan blowing air over a heat sink", "Increases transfer by forced convection"],
      ["Glass cover of a solar collector", "Traps long-wavelength infrared and stops convection losses"],
    ],
    explanation: "Each feature targets particular transfers.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the explanation of natural convection.",
    template: "When part of a fluid is heated it expands, so its density {{blank:a}}. The cooler, {{blank:b}} fluid around it sinks and pushes the warm fluid {{blank:c}}, setting up a convection current.",
    blanks: [
      { id: "a", accepted: ["decreases"], choices: ["decreases", "increases"] },
      { id: "b", accepted: ["denser"], choices: ["denser", "less dense"] },
      { id: "c", accepted: ["upwards"], choices: ["upwards", "downwards"] },
    ],
    explanation: "Density differences under gravity drive natural convection.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the idealised body that absorbs all electromagnetic radiation falling on it.",
    accepted: ["black body", "a black body", "blackbody", "perfect black body"],
    explanation: "A **black body**: the perfect absorber and, at a given temperature, the best emitter.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how a greenhouse stays warmer than the air outside on a sunny day.",
    points: [
      "Glass transmits visible (short-wavelength) radiation from the Sun.",
      "Soil and plants absorb it, warm up and emit long-wavelength infrared (they are much cooler than the Sun).",
      "Glass absorbs (does not transmit) much of this long-wavelength infrared, so less energy escapes by radiation.",
      "The enclosed air cannot leave by convection, so warm air stays inside.",
    ],
    modelAnswer: "Sunlight, mostly visible and near infrared, passes through the glass and is absorbed by the soil and plants. Being much cooler than the Sun, they re-emit at long infrared wavelengths, which the glass largely absorbs instead of transmitting, so less energy escapes by radiation. The closed glasshouse also stops the warmed air from rising away by convection.",
    explanation: "Short wavelengths in, long wavelengths trapped, convection stopped.",
    hints: ["Compare the wavelengths emitted by the Sun and by the soil (Wien)."],
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Describe four design features of a heat sink for a power transistor and explain how each increases the rate of energy loss.",
    points: [
      "Made of a good conductor (e.g. aluminium or copper): energy conducted quickly from the component to the fins.",
      "Many thin fins: large surface area for convection and radiation.",
      "Matt black finish: a good emitter of thermal radiation.",
      "Fins vertical (spaced apart) or a fan: air can rise freely (natural convection) or is driven past (forced convection).",
    ],
    modelAnswer: "The sink is made of aluminium, a good conductor, so energy flows quickly from the transistor into the fins. Many thin fins give a large surface area for convection and radiation. A matt black finish makes it a good emitter. The fins are vertical and spaced so warm air rises freely between them, and a fan can be added for forced convection.",
    explanation: "Conduction in, then convection and radiation out over a large area.",
    hints: ["Think about the material, the shape, the colour and the air flow."],
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Distinguish between natural and forced convection, giving an example of each.",
    points: [
      "Natural: fluid moves because of density differences caused by temperature differences, e.g. a thermosiphon solar geyser or sea breeze.",
      "Forced: a pump or fan moves the fluid, e.g. a car radiator fan or a computer cooling fan.",
    ],
    modelAnswer: "In natural convection the fluid moves only because warmer fluid is less dense and rises, as in a thermosiphon solar water heater. In forced convection a fan or pump drives the fluid, as in a car's radiator or a laptop's cooling fan.",
    explanation: "Density-driven v. pump- or fan-driven.",
  });

  // Practice structured: cooling of a cup of tea (12 marks)
  {
    const A = 0.012, T = toK(85), T0 = toK(25), m = 0.25, c = 4200;
    const Pr = s * A * (T ** 4 - T0 ** 4);
    const rate = Pr / (m * c);
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Thandeka pours $0.25\ \text{kg}$ of tea at $85\ ^\circ\text{C}$ into a cup in a room at $25\ ^\circ\text{C}$. The exposed top surface of the tea has area $0.012\ \text{m}^2$. Treat this surface as a black body. The specific heat capacity of tea is $4200\ \text{J kg}^{-1}\ \text{K}^{-1}$; $\sigma = 5.67 \times 10^{-8}\ \text{W m}^{-2}\ \text{K}^{-4}$.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the net rate of energy loss by radiation from the top surface, in W, to two significant figures.", value: Pr, sf: 2, unit: "W", wrong: [s * A * T ** 4], explanation: t`$\sigma A(T^4 - T_0^4) = 5.67 \times 10^{-8} \times 0.012 \times (358^4 - 298^4) = ${sfStr(Pr, 2)}\ \text{W}$.` }),
        P.num({ label: "(b)", marks: 2, stem: t`If radiation from the top were the only loss, calculate the initial rate of fall of temperature, in $\text{K s}^{-1}$, to two significant figures.`, value: rate, sf: 2, wrong: [Pr / c], explanation: t`$\dfrac{\mathrm{d}\theta}{\mathrm{d}t} = \dfrac{P}{mc} = \dfrac{${sfStr(Pr, 3)}}{0.25 \times 4200} = ${sciTex(rate, 2)}\ \text{K s}^{-1}$.` }),
        P.manual({ label: "(c)", marks: 3, stem: "The measured initial rate of cooling is several times larger. Name and explain two other processes that remove energy from the tea.", points: ["Evaporation from the surface: the most energetic molecules escape, removing latent heat.", "Convection: air above the hot surface is warmed, becomes less dense and rises, carrying energy away.", "Conduction through the cup walls to the table and air (and radiation from the cup's sides)."], modelAnswer: "Evaporation removes the most energetic molecules and with them latent heat. Air warmed by the surface becomes less dense and rises, so convection carries energy away. Energy is also conducted through the cup's walls and base and radiated from its sides." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain why the rate of cooling decreases as the tea cools.", points: ["All the loss processes depend on the temperature difference between the tea and the room (or on T⁴ − T₀⁴).", "As the tea cools, the difference falls, so the rate of energy loss falls.", "Rate of temperature fall = P/(mc), so the temperature falls more slowly; it approaches room temperature gradually."], modelAnswer: "The rates of radiation, convection, conduction and evaporation all decrease as the tea gets closer to room temperature, because they depend on the temperature difference (radiation on T⁴ − T₀⁴). Since the rate of fall of temperature is P/(mc), the cooling slows, and the tea approaches 25 °C gradually." }),
        P.manual({ label: "(e)", marks: 2, stem: "Suggest two ways of keeping the tea hot for longer, with a reason for each.", points: ["A lid: stops evaporation and convection from the surface.", "An insulated (double-walled or vacuum) cup, or a shiny outer surface: reduces conduction and radiation from the sides."], modelAnswer: "Put a lid on the cup to stop evaporation and convection from the surface, and use an insulated double-walled cup (or one with a shiny outer surface) to reduce conduction and radiation through the sides." }),
      ],
      explanation: "Net radiation σA(T⁴ − T₀⁴) is only part of the loss; rate of cooling = P/(mc).",
      hints: ["Use kelvin in σA(T⁴ − T₀⁴).", "dθ/dt = P/(mc)."],
    });
  }
  // Practice structured: testing surfaces with a radiant heater (8 marks)
  {
    const surf = ["matt black", "gloss white", "polished aluminium", "dull grey"];
    const rise = [14.6, 6.2, 2.1, 10.8];
    const dT = 0.2;
    b.struct({
      d: 3, skill: "EVALUATION", calculator: true,
      stem: t`Nyasha paints four identical copper plates with different finishes. Each has a thermometer attached at the back. The plates are placed at the same distance from a radiant heater, and the temperature rise of each in 5 minutes is recorded (thermometer resolution ±0.2 K for each reading):

${table(["Finish", t`Temperature rise $/\ \text{K}$`], surf.map((x, i) => [x, dpStr(rise[i], 1)]))}`,
      parts: [
        P.manual({ label: "(a)", marks: 1, stem: "State the conclusion that can be drawn about the finishes.", points: ["Matt black absorbs radiation best, then dull grey, gloss white, and polished aluminium worst."], modelAnswer: "The matt black plate is the best absorber, followed by dull grey and gloss white; polished aluminium is the poorest absorber." }),
        P.num({ label: "(b)", marks: 2, stem: "The temperature rise of the polished plate is the difference of two readings, each ±0.2 K. Calculate the percentage uncertainty in its temperature rise, to two significant figures.", value: pctUnc(2 * dT, rise[2]), sf: 2, unit: "%", wrong: [pctUnc(dT, rise[2])], explanation: t`Uncertainty in a difference $= 0.2 + 0.2 = 0.4\ \text{K}$; $\dfrac{0.4}{2.1} \times 100 = ${sfStr(pctUnc(2 * dT, rise[2]), 2)}\%$.` }),
        P.manual({ label: "(c)", marks: 3, stem: "Identify three variables that must be controlled to make this a fair test.", points: ["Distance from the heater (and same angle/facing the heater).", "Same plate size, thickness and material (same mass and heat capacity), same starting temperature.", "Same heating time and heater power; shielded from draughts."], modelAnswer: "Keep each plate at the same distance from the heater and facing it at the same angle; use plates of the same size, thickness and starting temperature; and heat each for the same time with the same heater setting, away from draughts." }),
        P.manual({ label: "(d)", marks: 2, stem: "Suggest two improvements to the experiment.", points: ["Use a more sensitive thermometer / thermocouple or data logger to reduce the uncertainty in small rises.", "Repeat each plate several times (or heat all four together, symmetrically arranged) and average."], modelAnswer: "Use thermocouples with a data logger, which have a finer resolution, so the small rise of the polished plate has a smaller percentage uncertainty; and repeat each trial, or heat all four plates at once arranged symmetrically round the heater, and average." }),
      ],
      explanation: "A fair comparison of absorbers; the smallest rise has the largest percentage uncertainty.",
      hints: ["A difference of two readings has the uncertainties added."],
    });
  }

  b.card("DEFINITION", "**Convection**", "Transfer of thermal energy by the bulk movement of a fluid: natural (density differences) or forced (pump or fan).");
  b.card("DEFINITION", "**Thermal radiation**", "Electromagnetic radiation, mainly infrared, emitted by every body because of its temperature; needs no medium.");
  b.card("DEFINITION", "**Black body**", "An ideal body that absorbs all incident electromagnetic radiation; the best emitter at a given temperature.");
  b.card("FORMULA", "Stefan-Boltzmann law", t`$P = \sigma AT^4$, $\sigma = 5.67 \times 10^{-8}\ \text{W m}^{-2}\ \text{K}^{-4}$, $T$ in K`);
  b.card("FORMULA", "Net radiation", t`$P_{\text{net}} = \sigma A(T^4 - T_0^4)$`);
  b.card("CONCEPT", "Wien's law (qualitative)", "The hotter a black body, the shorter the wavelength at the peak of its spectrum.");
  b.card("CONCEPT", "Good absorbers and emitters", "Matt black: good absorber and good emitter. Shiny: good reflector, poor emitter.");
  b.card("CONCEPT", "Vacuum flask", "Vacuum: no conduction or convection. Silvering: reflects infrared, poor emitter. Stopper: reduces losses from the top.");
  b.card("CONCEPT", "Greenhouse effect in a glasshouse", "Glass transmits short-wavelength sunlight but absorbs long-wavelength infrared from the warm interior; convection is stopped.");
});
