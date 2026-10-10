// W1b: aphys.circular.angular-speed — radians, angular displacement, ω = 2π/T = 2πf, v = rω.
import { concept, P, t, chk, sfStr, dpStr, sciTex, rad, deg, pctUnc, mean, halfRange, linFit, table } from "../lib.mjs";

concept("aphys.circular.angular-speed", { file: "circular/angular-speed", keyPrefix: "circular.angular-speed" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement defines one radian?",
    options: [
      ["The angle subtended at the centre of a circle by an arc equal in length to the radius", "Correct."],
      ["The angle subtended at the centre of a circle by an arc equal in length to the diameter", "An arc equal to the diameter subtends 2 rad."],
      ["One three-hundred-and-sixtieth of a complete turn", "That is one degree."],
      ["The angle turned through by a point on a wheel in one second", "That describes an angular speed, not a unit of angle."],
    ],
    answer: "A",
    explanation: "θ = s/r; when s = r, θ = 1 rad (about 57.3°).",
  });
  {
    const a = rad(120);
    b.mcq({
      d: 2, skill: "APPLICATION", daily: true,
      stem: t`What is $120^\circ$ in radians?`,
      options: [
        ["2.09 rad", "Correct: 120 × π/180 = 2π/3."],
        [t`$6.88 \times 10^{3}\ \text{rad}$`, "This multiplies by 180/π instead of π/180."],
        ["0.667 rad", "This divides 120 by 180 but forgets the factor π."],
        ["1.05 rad", "This is 60° in radians."],
      ],
      answer: "A",
      explanation: t`$120 \times \dfrac{\pi}{180} = \dfrac{2\pi}{3} = ${sfStr(a, 3)}\ \text{rad}$.`,
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the unit of angular speed in SI base units?",
    options: [
      [t`$\text{s}^{-1}$`, "Correct: the radian is a ratio of two lengths, so rad s⁻¹ reduces to s⁻¹."],
      [t`$\text{m s}^{-1}$`, "This is the unit of linear speed, v = rω."],
      [t`$\text{m s}^{-2}$`, "This is the unit of acceleration."],
      [t`$\text{s}$`, "This is the unit of the period, the reciprocal of what is needed."],
    ],
    answer: "A",
    explanation: "ω = Δθ/Δt; θ = s/r is dimensionless, so ω has the base unit s⁻¹ (written rad s⁻¹).",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Points P and Q are on a rotating disc; Q is twice as far from the axis as P. Which statement is correct?",
    options: [
      ["They have the same angular speed; Q has twice the linear speed of P.", "Correct: ω is shared by the rigid disc and v = rω."],
      ["Q has twice the angular speed and twice the linear speed of P.", "Every point of a rigid body turns through the same angle in the same time."],
      ["They have the same linear speed; Q has half the angular speed of P.", "Q travels a larger circle in the same time, so it moves faster."],
      ["They have the same angular speed and the same linear speed.", "v = rω, so the point further out moves faster."],
    ],
    answer: "A",
    explanation: "All points of a rigid rotating body have the same period and ω; linear speed is proportional to radius.",
    hints: ["Do both points complete a turn in the same time?"],
  });
  {
    const w = (2 * Math.PI) / 3600;
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: "What is the angular speed of the minute hand of a clock?",
      options: [
        [t`$${sciTex(w)}\ \text{rad s}^{-1}$`, "Correct: one revolution (2π rad) per 3600 s."],
        [t`$${sciTex((2 * Math.PI) / 43200)}\ \text{rad s}^{-1}$`, "This is the hour hand (one turn in 12 hours)."],
        [t`$${sciTex((2 * Math.PI) / 60)}\ \text{rad s}^{-1}$`, "This is the second hand (one turn in 60 s)."],
        [t`$${sciTex(1 / 3600)}\ \text{rad s}^{-1}$`, "This is the frequency in Hz; ω = 2πf."],
      ],
      answer: "A",
      explanation: t`$T = 60\ \text{min} = 3600\ \text{s}$; $\omega = 2\pi/T = ${sciTex(w)}\ \text{rad s}^{-1}$.`,
      hints: ["How long does the minute hand take for one turn, in seconds?"],
    });
  }
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: t`A wheel of radius $0.40\ \text{m}$ turns through $1.5\ \text{rad}$. How far does a point on its rim move along its circular path?`,
    options: [
      ["0.60 m", "Correct: s = rθ = 0.40 × 1.5."],
      ["0.27 m", "This divides the radius by the angle."],
      ["3.77 m", "This multiplies 1.5 by 2π × 0.40, treating 1.5 rad as 1.5 revolutions."],
      ["0.0105 m", "This converts 1.5 to radians as if it were in degrees."],
    ],
    answer: "A",
    explanation: t`$s = r\theta = 0.40 \times 1.5 = 0.60\ \text{m}$, with $\theta$ already in radians.`,
    hints: ["Use s = rθ."],
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: t`An electric fan turns at a frequency of $5.0\ \text{Hz}$. Calculate its angular speed, in $\text{rad s}^{-1}$, to three significant figures.`,
    value: 2 * Math.PI * 5, unit: "rad/s", wrong: [5, 5 / (2 * Math.PI)],
    explanation: t`$\omega = 2\pi f = 2\pi \times 5.0 = ${sfStr(2 * Math.PI * 5, 3)}\ \text{rad s}^{-1}$.`,
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: t`The tip of a fan blade is $0.25\ \text{m}$ from the axis. The fan turns at $120\ \text{rad s}^{-1}$. Calculate the speed of the tip, in $\text{m s}^{-1}$.`,
    value: 0.25 * 120, unit: "m/s", wrong: [120 / 0.25, 0.25 * 120 * 2 * Math.PI],
    explanation: t`$v = r\omega = 0.25 \times 120 = ${0.25 * 120}\ \text{m s}^{-1}$. There is no extra $2\pi$: ω is already in rad s⁻¹.`,
    hints: ["v = rω."],
  });
  {
    const rpm = 2900, r = 0.22;
    const w = (rpm * 2 * Math.PI) / 60;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`The rotor of a hammer mill used to grind maize turns at $2900$ revolutions per minute. The hammer tips are $0.22\ \text{m}$ from the axis. Calculate the speed of the hammer tips, in $\text{m s}^{-1}$, to three significant figures.`,
      value: w * r, unit: "m/s", wrong: [rpm * r, (rpm / 60) * r],
      explanation: t`1. $f = 2900/60 = ${sfStr(rpm / 60, 3)}\ \text{Hz}$.
2. $\omega = 2\pi f = ${sfStr(w, 4)}\ \text{rad s}^{-1}$.
3. $v = r\omega = 0.22 \times ${sfStr(w, 4)} = ${sfStr(w * r, 3)}\ \text{m s}^{-1}$.
4. Using the frequency instead of ω leaves out the factor $2\pi$.`,
      hints: ["Convert rev/min to rev/s, then to rad/s."],
    });
  }
  {
    const T = 27.3 * 24 * 3600, r = 3.84e8;
    const v = (2 * Math.PI * r) / T;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`The Moon orbits the Earth in a circle of radius $3.84 \times 10^{8}\ \text{m}$ with a period of $27.3$ days. Calculate its orbital speed, in $\text{m s}^{-1}$, to three significant figures.`,
      value: v, unit: "m/s", wrong: [(2 * Math.PI * r) / 27.3, (2 * Math.PI * r) / (27.3 * 24)],
      explanation: t`1. $T = 27.3 \times 24 \times 3600 = ${sciTex(T)}\ \text{s}$.
2. $\omega = 2\pi/T = ${sciTex((2 * Math.PI) / T)}\ \text{rad s}^{-1}$.
3. $v = r\omega = 3.84 \times 10^{8} \times ${sciTex((2 * Math.PI) / T)} = ${sciTex(v)}\ \text{m s}^{-1}$.`,
      hints: ["Convert the period to seconds.", "v = rω = 2πr/T."],
    });
  }
  {
    const w = 60, r = 0.32, tt = 5 * 60;
    const s = w * r * tt;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`The wheels of a car, radius $0.32\ \text{m}$, turn at a steady $60\ \text{rad s}^{-1}$ without slipping. Calculate the distance the car travels in $5.0$ minutes, in m, to three significant figures.`,
      value: s, unit: "m", wrong: [w * r * 5, w * tt],
      explanation: t`1. Speed $v = r\omega = 0.32 \times 60 = ${dpStr(w * r, 1)}\ \text{m s}^{-1}$.
2. Time $= 5.0 \times 60 = 300\ \text{s}$.
3. Distance $= ${dpStr(w * r, 1)} \times 300 = ${sciTex(s)}\ \text{m}$.`,
      hints: ["Find the car's speed from v = rω.", "Convert minutes to seconds."],
    });
  }
  {
    const th = (2 * Math.PI * 7) / 24;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Through what angle, in radians, does the Earth turn about its axis in $7.0$ hours? Take the rotation period as $24$ hours. Give your answer to three significant figures.`,
      value: th, unit: "rad", wrong: [(360 * 7) / 24, 7 / 24],
      explanation: t`$\theta = \omega t = \dfrac{2\pi}{24} \times 7.0 = ${sfStr(th, 3)}\ \text{rad}$ (that is $105^\circ$).`,
      hints: ["Fraction of a turn × 2π."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "All points on a rigid rotating disc have the same linear speed.",
    answer: false,
    explanation: "False. They share the same angular speed, but linear speed v = rω increases with distance from the axis.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each angle in degrees with its value in radians.",
    pairs: [
      [t`$90^\circ$`, t`$\pi/2$`],
      [t`$180^\circ$`, t`$\pi$`],
      [t`$270^\circ$`, t`$3\pi/2$`],
      [t`$45^\circ$`, t`$\pi/4$`],
    ],
    explanation: "Multiply degrees by π/180.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the relationships for uniform circular motion.",
    template: "Angular speed ω equals 2π divided by the {{blank:a}}, or 2π multiplied by the {{blank:b}}. The linear speed of a point at radius r is r multiplied by {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["period"], choices: ["period", "frequency", "radius"] },
      { id: "b", accepted: ["frequency"], choices: ["frequency", "period", "radius"] },
      { id: "c", accepted: ["ω"], choices: ["ω", "T", "f"] },
    ],
    explanation: "ω = 2π/T = 2πf; v = rω.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Give the SI unit of angular speed.",
    accepted: ["rad s⁻¹", "rad/s", "rad s^-1", "rad s-1", "radians per second", "radian per second", "s⁻¹", "s^-1"],
    explanation: "Angular speed is measured in **radians per second**, rad s⁻¹ (base unit s⁻¹).",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 2,
    stem: "Define the radian.",
    points: ["The angle subtended at the centre of a circle…", "…by an arc equal in length to the radius."],
    modelAnswer: "One radian is the angle subtended at the centre of a circle by an arc equal in length to the radius of the circle.",
    explanation: "Both \"at the centre\" and \"arc equal to the radius\" are needed.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 3,
    stem: t`Show that the linear speed $v$ of an object moving in a circle of radius $r$ at angular speed $\omega$ is $v = r\omega$.`,
    points: [
      t`In one period $T$ the object travels the circumference $2\pi r$, so $v = \dfrac{2\pi r}{T}$.`,
      t`$\omega = \dfrac{2\pi}{T}$ (one revolution is $2\pi$ rad).`,
      t`So $v = r \times \dfrac{2\pi}{T} = r\omega$ (or: $s = r\theta$, divide by $t$).`,
    ],
    modelAnswer: t`In one period the object moves a distance $2\pi r$, so $v = 2\pi r/T$. One revolution is $2\pi$ radians, so $\omega = 2\pi/T$. Substituting gives $v = r\omega$.`,
    explanation: "Distance per revolution over time per revolution, then ω = 2π/T.",
    hints: ["How far does the object travel in one period?"],
  });
  // Practice structured: timing a turntable (8 marks)
  {
    const t10 = [12.4, 12.1, 12.6, 12.2];
    const tm = mean(t10), dt = halfRange(t10);
    const T = tm / 10, w = (2 * Math.PI) / T;
    const r = 0.150;
    b.struct({
      d: 3, skill: "ANALYSIS", calculator: true,
      stem: t`Nyasha times 10 revolutions of a slowly rotating turntable four times: $${t10.join("$ s, $")}$ s. A coin sits $15.0\ \text{cm}$ from the centre.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the mean period of the turntable, in s, to three significant figures.", value: T, unit: "s", wrong: [tm], explanation: t`Mean of 10 revolutions $= ${sfStr(tm, 3)}\ \text{s}$, so $T = ${sfStr(T, 3)}\ \text{s}$.` }),
        P.num({ label: "(b)", marks: 2, stem: t`Calculate the angular speed, in $\text{rad s}^{-1}$, to three significant figures.`, value: w, unit: "rad/s", wrong: [1 / T], explanation: t`$\omega = 2\pi/T = ${sfStr(w, 3)}\ \text{rad s}^{-1}$.` }),
        P.num({ label: "(c)", marks: 1, stem: t`Calculate the speed of the coin, in $\text{m s}^{-1}$, to three significant figures.`, value: r * w, unit: "m/s", wrong: [15 * w], explanation: t`$v = r\omega = 0.150 \times ${sfStr(w, 3)} = ${sfStr(r * w, 3)}\ \text{m s}^{-1}$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Using half the range of the timings, calculate the percentage uncertainty in the angular speed, to two significant figures.", value: pctUnc(dt, tm), sf: 2, unit: "%", wrong: [pctUnc(dt, tm) * 10], explanation: t`Half-range $= ${dpStr(dt, 2)}\ \text{s}$; $\dfrac{${dpStr(dt, 2)}}{${sfStr(tm, 3)}} \times 100 = ${sfStr(pctUnc(dt, tm), 2)}\%$. $\omega \propto 1/T$, so it has the same percentage uncertainty as $T$ (and as the time for 10 turns).` }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain why timing 10 revolutions rather than 1 improves the result, and suggest one further improvement.", points: ["Reaction-time uncertainty is the same for any timing, so it is a smaller fraction of a longer time.", "Further improvement: time more revolutions (e.g. 20) / use a light gate or a marker and video / use a fiducial mark at the start-stop position."], modelAnswer: "The reaction-time error is roughly the same whatever is timed, so over 10 revolutions it is a much smaller percentage of the time. Timing 20 revolutions, or using a light gate with a flag on the turntable, would improve it further." }),
      ],
      explanation: "T from many revolutions; ω = 2π/T; v = rω; ω has the same percentage uncertainty as T.",
      hints: ["Divide the time for 10 revolutions by 10."],
    });
  }
  // Practice structured: speed against radius on a spinning disc (12 marks)
  {
    const r = [0.04, 0.08, 0.12, 0.16, 0.2];
    const v = [0.99, 2.03, 2.98, 4.05, 4.98];
    const fit = linFit(r, v);
    const tab = table([t`$r\,/\,\text{m}$`, t`$v\,/\,\text{m s}^{-1}$`], r.map((x, i) => [x.toFixed(2), v[i].toFixed(2)]));
    const w = fit.m;
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Small reflective markers are stuck to a spinning disc at different distances $r$ from its axis. A light-gate system measures the speed $v$ of each marker as it passes.

${tab}`,
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: "Describe the graph of v against r and state what it shows.", points: ["A straight line through the origin.", "v is directly proportional to r, so every marker has the same angular speed (v = rω)."], modelAnswer: "A straight line through the origin: v is proportional to r, as expected when all points share the same angular speed, v = rω." }),
        P.num({ label: "(b)", marks: 3, stem: t`Determine the angular speed of the disc from the gradient, in $\text{rad s}^{-1}$, to three significant figures.`, value: w, tol: 0.4, unit: "rad/s", wrong: [1 / w], explanation: t`Gradient $= \omega \approx ${sfStr(w, 3)}\ \text{rad s}^{-1}$ (e.g. $4.98/0.20$).` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the frequency of rotation, in Hz, to three significant figures.", value: w / (2 * Math.PI), tol: 0.07, unit: "Hz", wrong: [w], explanation: t`$f = \omega/2\pi = ${sfStr(w / (2 * Math.PI), 3)}\ \text{Hz}$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the number of revolutions per minute.", value: (w / (2 * Math.PI)) * 60, tol: 4, wrong: [w * 60], explanation: t`$${sfStr(w / (2 * Math.PI), 3)} \times 60 \approx ${sfStr((w / (2 * Math.PI)) * 60, 3)}$ revolutions per minute.` }),
        P.num({ label: "(e)", marks: 1, stem: t`Calculate the angle, in radians, the disc turns through in $0.50\ \text{s}$.`, value: w * 0.5, tol: 0.2, unit: "rad", wrong: [w * 0.5 * 2 * Math.PI], explanation: t`$\theta = \omega t = ${sfStr(w, 3)} \times 0.50 = ${sfStr(w * 0.5, 3)}\ \text{rad}$.` }),
        P.manual({ label: "(f)", marks: 2, stem: "Suggest why the readings near the axis are less reliable, and how the experiment could be improved.", points: ["Near the axis the speed (and the light-gate time difference) is small, so the percentage uncertainty in v is large / the marker's width is a larger fraction of its circular path.", "Use smaller markers / more readings at larger radii / repeat and average each reading."], modelAnswer: "Close to the axis the markers move slowly and their width is a larger fraction of their path, so v has a larger percentage uncertainty. Use narrower markers, take more readings at larger radii and repeat each one." }),
      ],
      explanation: "v = rω, so v against r is a straight line through the origin with gradient ω.",
      hints: ["The gradient of v against r is ω.", "f = ω/2π."],
    });
  }

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why the radian has no dimensions, and why measuring angles in radians makes the equation s = rθ possible without extra factors.",
    points: [
      "θ = arc length ÷ radius: a ratio of two lengths (m ÷ m), so it has no unit.",
      "By definition one radian corresponds to an arc of one radius, so the arc is simply r × θ (in degrees a factor π/180 would be needed).",
    ],
    modelAnswer: "An angle in radians is defined as arc length divided by radius, a ratio of two lengths, so it has no dimensions. Because one radian corresponds to an arc equal to the radius, the arc for θ radians is simply rθ; in degrees the formula would need a factor of π/180.",
    explanation: "The radian is defined as a ratio of lengths.",
  });

  b.card("DEFINITION", "**Radian**", "The angle subtended at the centre of a circle by an arc equal in length to the radius.");
  b.card("FORMULA", "Arc length", t`$s = r\theta$ ($\theta$ in radians)`);
  b.card("FACT", "Degrees to radians", t`Multiply by $\pi/180$; $360^\circ = 2\pi$ rad; $1\ \text{rad} \approx 57.3^\circ$.`);
  b.card("DEFINITION", "**Angular speed**", t`Rate of change of angular displacement, $\omega = \Delta\theta/\Delta t$, in $\text{rad s}^{-1}$.`);
  b.card("FORMULA", "Angular speed from period and frequency", t`$\omega = \dfrac{2\pi}{T} = 2\pi f$`);
  b.card("FORMULA", "Linear speed in circular motion", t`$v = r\omega$, along the tangent`);
  b.card("CONCEPT", "Points on a rigid rotating body", "Same angular speed ω; linear speed proportional to the distance from the axis.");
  b.card("FACT", "Revolutions per minute to rad s⁻¹", t`Multiply by $2\pi/60$.`);
});
