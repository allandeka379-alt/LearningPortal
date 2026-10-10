// W1b: aphys.skills.planning — planning an investigation (Cambridge P5 Q1 style; ZIMSEC planning to be confirmed).
import { concept, P, t, chk, sfStr, dpStr, pctUnc, lg, gradient } from "../lib.mjs";

concept("aphys.skills.planning", { file: "skills/planning", keyPrefix: "skills.planning" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In a planned investigation, what is the independent variable?",
    options: [
      ["The quantity deliberately changed in regular steps by the experimenter", "Correct: it is chosen and set by the experimenter."],
      ["The quantity measured for each setting of the experiment", "That is the dependent variable."],
      ["A quantity kept constant so that the test is fair", "That is a control variable."],
      ["The quantity calculated from the gradient of the final graph", "That is a derived constant, found from the analysis."],
    ],
    answer: "A",
    explanation: "The independent variable is changed deliberately; the dependent variable is measured; control variables are kept constant; constants come from the analysis.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A student needs the diameter of a copper wire, which is about 0.3 mm, for a resistivity plan. Which instrument is most suitable?",
    options: [
      ["micrometer screw gauge, reading to 0.01 mm", "Correct: about 3% uncertainty in a 0.3 mm diameter, and it should be read at several points."],
      ["metre rule, reading to 1 mm", "1 mm is larger than the diameter itself: over 300% uncertainty."],
      ["vernier calipers, reading to 0.1 mm", "0.1 mm in 0.3 mm is about 33%: far too imprecise."],
      ["travelling microscope across the wire's length", "A microscope can measure small lengths, but it is not the standard choice here and the description measures along the wire, not across it."],
    ],
    answer: "A",
    explanation: "Choose the instrument whose resolution gives a small percentage uncertainty: 0.01 mm in 0.3 mm is about 3%. Measure at several places along the wire and in two perpendicular directions, then average.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why should a student time 20 oscillations of a pendulum rather than one?",
    options: [
      ["The reaction-time uncertainty becomes a much smaller fraction of the time measured.", "Correct: the same ±0.2 s on 20T instead of on T reduces the percentage uncertainty twentyfold."],
      ["The pendulum swings more regularly after the first few oscillations.", "The period of a pendulum does not change in this way; the reason is the timing uncertainty."],
      ["It removes the systematic error caused by a stop-watch running slow.", "A slow stop-watch gives the same fractional error however many oscillations are timed."],
      ["It allows the amplitude to decrease, which makes the period larger.", "For small amplitudes the period hardly depends on amplitude."],
    ],
    answer: "A",
    explanation: t`The reaction-time uncertainty (about $\pm 0.2\ \text{s}$) is the same whatever is timed. Over 20 oscillations it is spread across 20 periods, so the percentage uncertainty in $T$ falls by a factor of 20.`,
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: t`A plan tests the suggestion that the flow rate $Q$ of water from a tank depends on the depth $h$ of water as $Q = k\sqrt{h}$, where $k$ is a constant. Which graph would confirm this, and how is $k$ found?`,
    options: [
      [t`$Q$ against $\sqrt{h}$: a straight line through the origin with gradient $k$`, t`Correct: $Q = k h^{1/2}$ is of the form $y = mx$ with $x = \sqrt{h}$.`],
      [t`$Q$ against $h$: a straight line through the origin with gradient $k$`, t`$Q$ is not proportional to $h$, so this graph would be a curve.`],
      [t`$Q^2$ against $h$: a straight line through the origin with gradient $k$`, t`This graph is straight, but its gradient is $k^2$, not $k$.`],
      [t`$\lg Q$ against $h$: a straight line with gradient $\lg k$`, t`A lg–linear graph suits an exponential, not a power law.`],
    ],
    answer: "A",
    explanation: t`With the power known, plot the power directly: $Q$ against $h^{1/2}$ is a straight line through the origin of gradient $k$. (A lg–lg graph would also work, with gradient 0.5 and intercept $\lg k$.)`,
    hints: ["Write the relationship as y = mx.", "Which quantity is multiplied by k?"],
  });
  {
    const tb = 2e-3, div = 4.0;
    const f = 1 / (tb * div);
    chk(f, 125);
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: t`An oscilloscope trace of a signal shows one complete cycle across $4.0$ horizontal divisions. The time-base setting is $2.0\ \text{ms per division}$. What is the frequency of the signal?`,
      options: [
        ["125 Hz", "Correct: T = 4.0 × 2.0 ms = 8.0 ms, f = 1/T = 125 Hz."],
        ["500 Hz", "This uses one division (2.0 ms) as the period."],
        ["250 Hz", "This takes half the cycle (two divisions) as the period."],
        ["0.125 Hz", "The period was left in milliseconds: 1/8.0 = 0.125, but T = 0.0080 s."],
      ],
      answer: "A",
      explanation: t`$T = 4.0 \times 2.0\ \text{ms} = 8.0\ \text{ms} = 8.0 \times 10^{-3}\ \text{s}$; $f = 1/T = ${f}\ \text{Hz}$.`,
      hints: ["Period = number of divisions × time-base.", "Convert ms to s before taking 1/T."],
    });
  }
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "A plan investigates how the terminal velocity of steel balls in glycerol depends on their diameter. Which statement about a control variable would earn credit?",
    options: [
      ["Keep the temperature of the glycerol constant, because its viscosity changes with temperature; check it with a thermometer.", "Correct: a named variable, a reason, and a method of keeping it constant."],
      ["Keep all the other variables the same throughout, so that it is a fair test of the effect of diameter.", "Too vague: no variable is named and no method is given."],
      ["Keep the diameter of the balls constant by measuring each one with a micrometer before it is dropped.", "Diameter is the independent variable; it is changed, not controlled."],
      ["Keep the terminal velocity constant by timing over the same distance.", "Terminal velocity is the dependent variable; it is measured, not controlled."],
    ],
    answer: "A",
    explanation: "A control mark needs the named variable and how it is kept constant (and ideally why). Viscosity of glycerol falls sharply as it warms, so its temperature must be controlled.",
    hints: ["Which option names a quantity that is neither changed nor measured?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: t`A plan tests $T^2 = \dfrac{4\pi^2}{k}(m + M)$ by plotting $T^2$ against $m$. Which expression gives the constant $M$?`,
    options: [
      [t`$M = \dfrac{y\text{-intercept}}{\text{gradient}}$`, t`Correct: intercept $= 4\pi^2M/k$ and gradient $= 4\pi^2/k$; dividing cancels $4\pi^2/k$.`],
      [t`$M = y\text{-intercept}$`, t`The intercept is $4\pi^2M/k$, not $M$ itself.`],
      [t`$M = \dfrac{\text{gradient}}{y\text{-intercept}}$`, t`This is $1/M$.`],
      [t`$M = \dfrac{4\pi^2}{\text{gradient}}$`, t`This gives $k$, not $M$.`],
    ],
    answer: "A",
    explanation: t`$T^2 = \dfrac{4\pi^2}{k}m + \dfrac{4\pi^2M}{k}$. Gradient $= 4\pi^2/k$; intercept $= 4\pi^2M/k$. So $M = \text{intercept}/\text{gradient}$ and $k = 4\pi^2/\text{gradient}$. (Equivalently, $M$ is minus the intercept on the $m$-axis.)`,
    hints: ["Expand the bracket.", "Write the gradient and intercept separately."],
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A plan loads a thin steel wire with masses until it breaks. Which safety precaution is most relevant?",
    options: [
      ["Wear safety goggles and place a box of sand under the masses.", "Correct: a snapping wire can whip into the eyes, and falling masses can injure feet."],
      ["Wear a laboratory coat to protect clothing.", "Not linked to the main hazards of this experiment."],
      ["Switch off the mains supply before adding masses.", "There is no electrical supply in this experiment."],
      ["Use tongs to handle the wire after loading.", "Tongs are for hot objects or radioactive sources; the wire is not hot."],
    ],
    answer: "A",
    explanation: "Safety marks need a precaution linked to a real hazard of the stated experiment: eye protection for a snapping wire, and a sand tray (or keeping feet clear) for falling masses.",
  });
  {
    const yg = 0.5, divs = 3.2;
    b.num({
      d: 2, skill: "APPLICATION", daily: true,
      stem: t`On an oscilloscope screen the peak of a sinusoidal trace is $3.2$ divisions above the centre line. The Y-gain is $0.50\ \text{V per division}$. What is the peak voltage, in V?`,
      value: yg * divs, unit: "V", wrong: [divs / yg, 2 * yg * divs],
      explanation: t`Peak voltage $= 3.2 \times 0.50 = ${dpStr(yg * divs, 1)}\ \text{V}$. Measuring from the trough to the peak (6.4 divisions) would give the peak-to-peak value, $3.2\ \text{V}$.`,
    });
  }
  {
    const T20 = 25.6, dt = 0.2;
    const p = pctUnc(dt, T20);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Twenty oscillations take $25.6\ \text{s}$, with an uncertainty of $\pm 0.2\ \text{s}$ from reaction time. Calculate the percentage uncertainty in the period, to two significant figures.`,
      value: p, sf: 2, unit: "%", wrong: [pctUnc(dt, T20 / 20), dt * 100],
      explanation: t`Percentage uncertainty in $T$ = percentage uncertainty in $20T$ $= \dfrac{0.2}{25.6} \times 100 = ${sfStr(p, 2)}\%$. Dividing by 20 changes $T$ and $\Delta T$ equally, so the percentage is unchanged; dividing 0.2 s by one period ($1.28\ \text{s}$) gives a wrong 16%.`,
      hints: ["Dividing by 20 does not change a percentage uncertainty."],
    });
  }
  {
    const w = 0.05, tt = 0.0213;
    const v = w / tt;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A card of width $5.0\ \text{cm}$ on a trolley blocks a light gate for $0.0213\ \text{s}$. Calculate the speed of the trolley, in $\text{m s}^{-1}$, to three significant figures.`,
      value: v, unit: "m/s", wrong: [5 / tt, tt / w],
      explanation: t`$v = \dfrac{\text{card width}}{\text{time}} = \dfrac{0.050}{0.0213} = ${sfStr(v, 3)}\ \text{m s}^{-1}$. Using 5.0 instead of 0.050 m gives a speed 100 times too large.`,
      hints: ["Convert the width to metres."],
    });
  }
  {
    const grad = 0.82, icpt = 0.066;
    const M = icpt / grad;
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`For the relationship $T^2 = \dfrac{4\pi^2}{k}(m + M)$, a graph of $T^2/\text{s}^2$ against $m/\text{kg}$ has gradient $0.82\ \text{s}^2\,\text{kg}^{-1}$ and $y$-intercept $0.066\ \text{s}^2$. Calculate $M$, in kg, to three significant figures.`,
      value: M, unit: "kg", wrong: [icpt, grad / icpt],
      explanation: t`1. Gradient $= 4\pi^2/k$ and intercept $= 4\pi^2M/k$.
2. $M = \dfrac{\text{intercept}}{\text{gradient}} = \dfrac{0.066}{0.82} = ${sfStr(M, 3)}\ \text{kg}$.
3. (For completeness, $k = 4\pi^2/0.82 = ${sfStr((4 * Math.PI ** 2) / grad, 3)}\ \text{N m}^{-1}$.)`,
      hints: ["Write the gradient and the intercept in terms of k and M.", "Divide one by the other."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A preliminary experiment is used to choose a suitable range and interval for the independent variable.",
    answer: true,
    explanation: "True. A quick trial shows over what range the dependent variable changes measurably and helps choose at least six well-spread values.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: t`To test $v = kr^{\,n}$ with $n$ unknown, a plan should plot $v$ against $r$ and check for a straight line through the origin.`,
    answer: false,
    explanation: t`False. Unless $n = 1$, $v$ against $r$ is a curve. With $n$ unknown, plot $\lg v$ against $\lg r$: gradient $n$, intercept $\lg k$.`,
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each measurement with the most suitable instrument.",
    pairs: [
      ["Diameter of a 0.5 mm wire", "micrometer screw gauge"],
      ["Time for a ball to pass through a beam", "light gate connected to a timer or data logger"],
      ["Period of a 50 Hz alternating p.d.", "oscilloscope (time base)"],
      ["Internal diameter of a 15 mm pipe", "vernier calipers"],
    ],
    explanation: "Micrometer for sub-millimetre diameters; light gate for very short times; oscilloscope for the period of a rapidly changing p.d.; vernier calipers (with their internal jaws) for internal diameters of a few centimetres.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct terms.",
    template: "In an investigation the {{blank:a}} variable is changed in steps, the {{blank:b}} variable is measured, and {{blank:c}} variables are kept constant.",
    blanks: [
      { id: "a", accepted: ["independent"], choices: ["independent", "dependent", "control"] },
      { id: "b", accepted: ["dependent"], choices: ["independent", "dependent", "control"] },
      { id: "c", accepted: ["control"], choices: ["independent", "dependent", "control"] },
    ],
    explanation: "Independent: changed. Dependent: measured. Control: kept constant (and the plan says how).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the device that, connected to a sensor, records readings automatically at set time intervals.",
    accepted: ["data logger", "datalogger", "data-logger"],
    wrong: ["oscilloscope"],
    explanation: "A **data logger** stores readings from a sensor (light gate, thermistor probe, voltage or motion sensor) at a chosen rate, so fast or long experiments can be recorded without reading by eye.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Tatenda plans to investigate how the speed of a trolley at the bottom of a ramp depends on the height from which it is released. Identify the independent and dependent variables and two control variables, saying how each control is kept constant.",
    points: [
      "Independent variable: vertical height of the release point above the bottom of the ramp.",
      "Dependent variable: speed at the bottom (e.g. card width ÷ time through a light gate).",
      "Control: the same trolley (mass), checked on a balance, or the same ramp surface.",
      "Control: the same distance along the ramp to the light gate / same release method (released from rest, not pushed), or the same card width.",
    ],
    modelAnswer: "The independent variable is the vertical height of the release point; the dependent variable is the speed at the bottom, found from the card width divided by the time it blocks a light gate. Controls: use the same trolley (same mass, checked on a balance) on the same ramp surface, and always release it from rest with the light gate at the same place at the bottom.",
    explanation: "Credit needs both variables named precisely and controls with a method, not \"keep everything the same\".",
    hints: ["Which quantity does Tatenda choose?"],
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Describe how two light gates and a data logger can be used to find the acceleration of a ball falling through a measured height.",
    points: [
      "Two light gates one above the other, a measured distance apart (metre rule), both connected to the data logger.",
      "The logger records the time the ball blocks each beam (giving each speed as diameter ÷ time) and the time between the gates.",
      "Acceleration = (v₂ − v₁) / time between the gates (or use v₂² = v₁² + 2as with the measured separation).",
    ],
    modelAnswer: "Clamp two light gates vertically above one another a measured distance apart and connect both to a data logger. Drop the ball through both beams. The logger records how long the ball blocks each beam, so each speed is the ball's diameter divided by that time, and the time between the gates. The acceleration is the change in speed divided by the time between the gates.",
    explanation: "Light gates give speeds at two points and the time between them, so the acceleration follows without reaction-time errors.",
    hints: ["Each gate gives a speed if you know the ball's diameter."],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: t`The sag $y$ at the free end of a loaded wooden strip is suggested to depend on its length $L$ as $y = \dfrac{4WL^3}{Ebd^3}$, where $W$, $b$ and $d$ are kept constant. Explain how a graph can be used to test this relationship and to find $E$.`,
    points: [
      t`Plot $y$ against $L^3$.`,
      "The relationship is valid if the graph is a straight line through the origin.",
      t`Gradient $= \dfrac{4W}{Ebd^3}$.`,
      t`$E = \dfrac{4W}{bd^3 \times \text{gradient}}$.`,
    ],
    modelAnswer: t`Plot $y$ against $L^3$. If the relationship is correct the graph is a straight line through the origin with gradient $4W/(Ebd^3)$, so $E = 4W/(bd^3 \times \text{gradient})$. (A graph of $\lg y$ against $\lg L$ with gradient 3 would also test it.)`,
    explanation: "With the power known, plot the power directly; the constant follows from the gradient by rearranging.",
    hints: ["Which quantity varies? Which are constant?"],
  });

  // Practice structured: solar cell and lamp distance (12 marks)
  {
    const p1 = [lg(0.2), lg(48.0)], p2 = [lg(0.5), lg(8.1)];
    const n = gradient(p1, p2);
    b.struct({
      d: 4, skill: "EVALUATION", calculator: true,
      stem: t`Thandeka suggests that the current $I$ from a small solar cell connected to a low-resistance ammeter depends on its distance $d$ from a lamp as $I = kd^{\,n}$, where $k$ and $n$ are constants. Plan an investigation to test the suggestion.`,
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: "State the independent and dependent variables and one control variable with how it is kept constant.",
          points: ["Independent: distance d from lamp filament to solar cell; dependent: current I.", "Control: lamp power (constant p.d. across the lamp, monitored with a voltmeter) or the angle of the cell (face perpendicular to the line to the lamp) or background light (darkened room)."],
          modelAnswer: "Independent: distance d from the filament to the cell. Dependent: current I. Control: keep the lamp's p.d. constant, checked with a voltmeter, so its power does not change." }),
        P.manual({ label: "(b)", marks: 3, stem: "Describe the arrangement and the method.",
          points: ["Lamp and cell on the bench on the same axis, with a metre rule along the line between them; the cell connected directly to a milliammeter (or microammeter).", "Measure d from the filament to the cell face (set square to line up), read I; change d.", "At least six values of d (e.g. 0.15 m to 0.60 m), repeat each and average."],
          modelAnswer: "Place the lamp and the solar cell on the bench facing each other with a metre rule along the line joining them; connect the cell to a milliammeter. Measure d from the filament to the face of the cell using a set square, record I, then change d. Take at least six distances from 0.15 m to 0.60 m and repeat each set, averaging the currents." }),
        P.manual({ label: "(c)", marks: 2, stem: "Explain how you would analyse the results to test the suggestion and find n and k.",
          points: [t`Plot $\lg I$ against $\lg d$; valid if a straight line.`, t`$n$ = gradient; $k = 10^{\text{intercept}}$.`],
          modelAnswer: t`$\lg I = n\lg d + \lg k$, so plot $\lg I$ against $\lg d$. A straight line confirms the suggestion; the gradient is $n$ and $k = 10^{y\text{-intercept}}$.` }),
        P.num({ label: "(d)", marks: 2, stem: t`In a trial, $I = 48.0\ \text{mA}$ at $d = 0.200\ \text{m}$ and $I = 8.1\ \text{mA}$ at $d = 0.500\ \text{m}$. Assuming $I = kd^{\,n}$, calculate $n$ to two significant figures.`, value: n, sf: 2, wrong: [-(48 / 8.1) / 2.5],
          explanation: t`$n = \dfrac{\lg 8.1 - \lg 48.0}{\lg 0.500 - \lg 0.200} = \dfrac{${dpStr(p2[1] - p1[1], 3)}}{${dpStr(p2[0] - p1[0], 3)}} = ${sfStr(n, 2)}$. This is close to $-2$, as expected for an inverse-square fall in intensity.` }),
        P.manual({ label: "(e)", marks: 1, stem: "State one safety precaution.", points: ["The lamp becomes hot: do not touch it and allow it to cool before moving it (or avoid looking directly at a bright lamp)."], modelAnswer: "The lamp gets hot: do not touch it, and let it cool before moving it." }),
        P.manual({ label: "(f)", marks: 2, stem: "Give two further details that would improve the reliability of the results.",
          points: ["Darkened room / take a background reading with the lamp off and subtract it.", "Wait for the reading to settle (or keep the cell temperature steady by not leaving it close to the lamp for long); check the zero of the meter."],
          modelAnswer: "Work in a darkened room and subtract the reading with the lamp off; allow the reading to settle and avoid heating the cell by leaving it near the lamp, and check the meter's zero before starting." }),
      ],
      explanation: "A complete plan: variables and controls, a workable method, a lg–lg analysis and safety.",
      hints: ["Take logs of both sides for the analysis.", "Use two points to estimate n in (d)."],
    });
  }
  // Practice structured: measurements with sensors (8 marks)
  {
    const tb = 5e-3, ndiv = 3.6;
    const T = tb * ndiv, f = 1 / T;
    const gate = 0.0186, card = 0.025;
    const v = card / gate;
    const pctCard = pctUnc(0.001, card), pctT = pctUnc(0.0002, gate);
    b.struct({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "Nyasha is planning two measurements with electronic instruments.",
      parts: [
        P.num({ label: "(a)", marks: 2, stem: t`A microphone connected to an oscilloscope shows a sound wave with one cycle across $3.6$ divisions at a time base of $5.0\ \text{ms div}^{-1}$. Calculate the frequency of the sound, in Hz, to three significant figures.`, value: f, unit: "Hz", wrong: [1 / ndiv, 1 / tb],
          explanation: t`$T = 3.6 \times 5.0\ \text{ms} = ${dpStr(T * 1000, 1)}\ \text{ms}$; $f = 1/T = ${sfStr(f, 3)}\ \text{Hz}$.` }),
        P.manual({ label: "(b)", marks: 1, stem: "Suggest how the period could be read more precisely from the screen.", points: ["Measure across several complete cycles (e.g. 3 cycles) and divide by the number of cycles (or adjust the time base so one cycle fills most of the screen)."], modelAnswer: "Measure the length of several complete cycles and divide by the number of cycles." }),
        P.num({ label: "(c)", marks: 2, stem: t`A card of width $(2.50 \pm 0.10)\ \text{cm}$ passes through a light gate in $(0.0186 \pm 0.0002)\ \text{s}$. Calculate the speed in $\text{m s}^{-1}$ to three significant figures.`, value: v, unit: "m/s", wrong: [2.5 / gate], explanation: t`$v = 0.0250 / 0.0186 = ${sfStr(v, 3)}\ \text{m s}^{-1}$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the percentage uncertainty in this speed, to two significant figures.", value: pctCard + pctT, sf: 2, unit: "%", wrong: [pctCard],
          explanation: t`$\dfrac{0.10}{2.50} \times 100 = ${sfStr(pctCard, 2)}\%$ and $\dfrac{0.0002}{0.0186} \times 100 = ${sfStr(pctT, 2)}\%$; for a quotient add them: $${sfStr(pctCard + pctT, 2)}\%$.` }),
        P.manual({ label: "(e)", marks: 1, stem: "State which measurement contributes most to the uncertainty and one way to reduce it.", points: ["The card width (4%); measure it with vernier calipers (or use a wider card)."], modelAnswer: "The card width dominates (4%): measure it with vernier calipers to ±0.01 cm, or use a wider card." }),
      ],
      explanation: "Oscilloscope periods come from divisions × time base; light-gate speeds from width ÷ time, with percentage uncertainties adding for a quotient.",
      hints: ["Period = divisions × time base.", "Percentage uncertainties add for a quotient."],
    });
  }

  b.card("DEFINITION", "**Independent variable**", "The quantity the experimenter deliberately changes, in regular steps.");
  b.card("DEFINITION", "**Dependent variable**", "The quantity measured for each value of the independent variable.");
  b.card("DEFINITION", "**Control variable**", "A quantity that could affect the result and is kept constant, with a stated method of keeping it constant.");
  b.card("CONCEPT", "What are the six mark areas of a planning answer?", "Defining the problem (variables), method and arrangement, measurements and instruments, control, analysis (graph and constant), safety; plus additional detail.");
  b.card("CONCEPT", "Why use a preliminary experiment?", "To choose a suitable range and interval for the independent variable and check the dependent variable changes measurably.");
  b.card("FORMULA", "Oscilloscope: period and peak voltage", "Period = horizontal divisions for one cycle × time-base setting; peak p.d. = vertical divisions × Y-gain.");
  b.card("FACT", "Instrument for a wire diameter of under 1 mm?", "Micrometer screw gauge (0.01 mm), several readings along the wire in perpendicular directions.");
  b.card("CONCEPT", "What does a good safety statement contain?", "A specific hazard of this experiment and a specific precaution, e.g. goggles because a loaded wire may snap; sand tray for falling masses.");
  b.card("CONCEPT", "How do you write the analysis for a plan?", "State the graph (axes), the shape that confirms the relationship, and the expression for the constant in terms of the gradient or intercept.");
});
