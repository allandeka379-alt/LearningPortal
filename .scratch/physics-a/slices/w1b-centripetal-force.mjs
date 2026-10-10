// W1b: aphys.circular.centripetal-force — a = v²/r = rω², F = mv²/r, horizontal and vertical circles.
import { concept, P, t, chk, DATA, sfStr, dpStr, sciTex, rad, deg, pctUnc, mean, halfRange, table } from "../lib.mjs";

const g = DATA.g;
concept("aphys.circular.centripetal-force", { file: "circular/centripetal-force", keyPrefix: "circular.centripetal-force" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "An object moves in a circle at constant speed. In which direction is its acceleration?",
    options: [
      ["towards the centre of the circle", "Correct: centripetal means centre-seeking."],
      ["along the tangent, in the direction of motion", "The speed is constant, so there is no acceleration along the tangent."],
      ["away from the centre of the circle", "There is no outward acceleration; this is the 'centrifugal' misconception."],
      ["there is no acceleration because the speed is constant", "The direction of the velocity changes, so there is an acceleration."],
    ],
    answer: "A",
    explanation: "Velocity changes direction continuously; the change points towards the centre, so a = v²/r towards the centre.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A car travels round a flat, unbanked bend at constant speed. Which force provides the centripetal force?",
    options: [
      ["sideways friction between the tyres and the road", "Correct: it is the only horizontal force towards the centre."],
      ["the weight of the car", "Weight is vertical; it cannot point towards the centre of a horizontal circle."],
      ["the normal contact force of the road", "On a flat road this is vertical, balancing the weight."],
      ["the forward driving force of the engine", "That acts along the direction of motion, balancing resistance."],
    ],
    answer: "A",
    explanation: "On a flat bend only friction acts sideways towards the centre. If the road is slippery, friction may be too small and the car skids outwards relative to the bend.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A car goes round the same bend at twice its previous speed. By what factor does the centripetal force needed change?",
    options: [
      ["×4", "Correct: F = mv²/r, so doubling v multiplies F by 4."],
      ["×2", "F depends on v², not v."],
      ["×½", "A faster car needs a larger force, not a smaller one."],
      ["×8", "There is no v³ dependence."],
    ],
    answer: "A",
    explanation: "F ∝ v² at fixed mass and radius. This is why speed limits on sharp bends matter: the friction needed quadruples when the speed doubles.",
    hints: ["Look at how F depends on v."],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "A stone is whirled in a horizontal circle on a string. The string breaks. How does the stone move immediately afterwards (seen from above)?",
    options: [
      ["in a straight line along the tangent to the circle at that point", "Correct: with no resultant horizontal force it keeps its velocity (Newton's first law)."],
      ["radially outwards, away from the centre", "No outward force acts; this is the centrifugal misconception."],
      ["in a smaller circle, because it keeps its angular speed", "Without the tension nothing makes it turn."],
      ["along a spiral that slowly widens", "No force acts horizontally to curve its path."],
    ],
    answer: "A",
    explanation: "The tension was the only horizontal force. Without it, the stone continues with the velocity it had: along the tangent.",
    hints: ["Which way was the stone moving at the instant the string broke?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A mass on a string is whirled in a vertical circle at a speed that varies slightly around the circle. Where is the tension in the string greatest, and why?",
    options: [
      ["At the bottom, because the tension must balance the weight and also provide mv²/r upwards.", "Correct: T − mg = mv²/r there, and the speed is also largest at the bottom."],
      ["At the top, because the weight and tension both act towards the centre.", "At the top the weight helps provide mv²/r, so the tension needed is smallest."],
      ["At the side, because the tension is horizontal there.", "At the side the weight is perpendicular to the string and the tension equals mv²/r only."],
      ["It is the same everywhere, because the radius is constant.", "The weight's component along the string changes around the circle."],
    ],
    answer: "A",
    explanation: "Bottom: T = mg + mv²/r (largest). Top: T = mv²/r − mg (smallest). The string is most likely to break at the bottom.",
    hints: ["Write 'resultant towards centre = mv²/r' at the top and the bottom."],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: t`A conical pendulum moves in a horizontal circle of radius $r$ at angular speed $\omega$, with the string at angle $\theta$ to the vertical. Which relationship is correct?`,
    options: [
      [t`$\tan\theta = \dfrac{r\omega^2}{g}$`, t`Correct: $T\sin\theta = mr\omega^2$ and $T\cos\theta = mg$.`],
      [t`$\sin\theta = \dfrac{r\omega^2}{g}$`, t`Dividing the two equations gives $\tan\theta$, not $\sin\theta$.`],
      [t`$\tan\theta = \dfrac{g}{r\omega^2}$`, "This inverts the ratio: the horizontal component goes on top."],
      [t`$\cos\theta = \dfrac{r\omega^2}{g}$`, "Cos θ relates the vertical component of tension to the weight."],
    ],
    answer: "A",
    explanation: t`Horizontally $T\sin\theta = mr\omega^2$; vertically $T\cos\theta = mg$. Dividing: $\tan\theta = r\omega^2/g$.`,
    hints: ["Resolve the tension horizontally and vertically."],
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: t`A $0.50\ \text{kg}$ ball on a string moves in a horizontal circle of radius $0.80\ \text{m}$ at $4.0\ \text{m s}^{-1}$ on a smooth table. Calculate the tension in the string, in N.`,
    value: (0.5 * 16) / 0.8, unit: "N", wrong: [(0.5 * 4) / 0.8, 0.5 * 16 * 0.8],
    explanation: t`$T = \dfrac{mv^2}{r} = \dfrac{0.50 \times 4.0^2}{0.80} = ${(0.5 * 16) / 0.8}\ \text{N}$.`,
  });
  {
    const rpm = 3500, r = 0.1;
    const w = (rpm * 2 * Math.PI) / 60;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A centrifuge spins at $3500$ revolutions per minute. Calculate the centripetal acceleration of a sample $0.10\ \text{m}$ from the axis, in $\text{m s}^{-2}$, to three significant figures.`,
      value: r * w * w, unit: "m/s²", wrong: [r * (rpm / 60) ** 2, r * rpm * rpm],
      explanation: t`$\omega = \dfrac{3500 \times 2\pi}{60} = ${sfStr(w, 4)}\ \text{rad s}^{-1}$; $a = r\omega^2 = 0.10 \times ${sfStr(w, 4)}^2 = ${sciTex(r * w * w)}\ \text{m s}^{-2}$, more than a thousand times $g$.`,
      hints: ["Convert rev/min to rad/s first.", "a = rω²."],
    });
  }
  {
    const mu = 0.7, r = 40;
    const v = Math.sqrt(mu * g * r);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`On a dry flat road the maximum sideways friction on a car is $0.70$ times its weight. Calculate the maximum speed at which it can take a bend of radius $40\ \text{m}$ without skidding, in $\text{m s}^{-1}$, to three significant figures.`,
      value: v, unit: "m/s", wrong: [mu * g * r, Math.sqrt(g * r)],
      explanation: t`1. Friction provides the centripetal force: $\dfrac{mv^2}{r} = 0.70mg$.
2. $m$ cancels: $v = \sqrt{0.70gr} = \sqrt{0.70 \times 9.81 \times 40} = ${sfStr(v, 3)}\ \text{m s}^{-1}$.
3. The mass cancels, so a loaded truck has the same limiting speed (if its friction is still 0.70 of its weight).`,
      hints: ["Set the maximum friction equal to mv²/r."],
    });
  }
  {
    const r = 150, v = 25;
    const th = deg(Math.atan((v * v) / (r * g)));
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A highway bend of radius $150\ \text{m}$ is to be banked so that vehicles travelling at $25\ \text{m s}^{-1}$ need no sideways friction. Calculate the angle of banking, in degrees, to three significant figures.`,
      value: th, unit: "°", wrong: [deg(Math.atan((r * g) / (v * v))), deg(Math.asin(Math.min(1, (v * v) / (r * g))))],
      explanation: t`1. Vertically: $N\cos\theta = mg$. Horizontally: $N\sin\theta = \dfrac{mv^2}{r}$.
2. Dividing: $\tan\theta = \dfrac{v^2}{rg} = \dfrac{625}{150 \times 9.81} = ${dpStr((v * v) / (r * g), 4)}$.
3. $\theta = ${sfStr(th, 3)}^\circ$.`,
      hints: ["Resolve the normal force vertically and horizontally.", "Divide to get tan θ."],
    });
  }
  {
    const r = 15;
    const v = Math.sqrt(g * r);
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A road passes over the top of a hump that is part of a vertical circle of radius $15\ \text{m}$. Calculate the speed at which a car would just lose contact with the road at the top, in $\text{m s}^{-1}$, to three significant figures.`,
      value: v, unit: "m/s", wrong: [g * r, Math.sqrt(2 * g * r)],
      explanation: t`1. At the top: $mg - N = \dfrac{mv^2}{r}$.
2. Contact is lost when $N = 0$: $v^2 = gr$.
3. $v = \sqrt{9.81 \times 15} = ${sfStr(v, 3)}\ \text{m s}^{-1}$. At this speed the passengers feel weightless.`,
      hints: ["What is the normal force when contact is just lost?"],
    });
  }
  {
    const m = 0.35, r = 0.9, v = 6;
    const T = m * g + (m * v * v) / r;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A $0.35\ \text{kg}$ mass on a string is whirled in a vertical circle of radius $0.90\ \text{m}$. At the lowest point its speed is $6.0\ \text{m s}^{-1}$. Calculate the tension in the string at that point, in N, to three significant figures.`,
      value: T, unit: "N", wrong: [(m * v * v) / r - m * g, (m * v * v) / r],
      explanation: t`1. At the bottom the centre is above: $T - mg = \dfrac{mv^2}{r}$.
2. $T = 0.35 \times 9.81 + \dfrac{0.35 \times 6.0^2}{0.90} = ${sfStr(m * g, 3)} + ${sfStr((m * v * v) / r, 3)} = ${sfStr(T, 3)}\ \text{N}$.
3. Subtracting the weight would be correct at the top, not the bottom.`,
      hints: ["At the bottom, tension acts towards the centre and weight away from it."],
    });
  }
  {
    const L = 1.2, Tp = 1.8;
    const w = (2 * Math.PI) / Tp;
    const th = deg(Math.acos(g / (L * w * w)));
    b.calc({
      d: 5, skill: "ANALYSIS", calculator: true,
      stem: t`A conical pendulum has a string of length $1.20\ \text{m}$ and goes round once every $1.80\ \text{s}$. Calculate the angle between the string and the vertical, in degrees, to three significant figures.`,
      value: th, unit: "°", wrong: [deg(Math.asin(Math.min(1, g / (L * w * w)))), deg(Math.atan(g / (L * w * w)))],
      explanation: t`1. $\omega = 2\pi/1.80 = ${sfStr(w, 4)}\ \text{rad s}^{-1}$.
2. Horizontally $T\sin\theta = m(L\sin\theta)\omega^2$, so $T = mL\omega^2$.
3. Vertically $T\cos\theta = mg$, so $\cos\theta = \dfrac{g}{L\omega^2} = \dfrac{9.81}{1.20 \times ${sfStr(w * w, 4)}} = ${dpStr(g / (L * w * w), 4)}$.
4. $\theta = ${sfStr(th, 3)}^\circ$.`,
      hints: ["The radius of the circle is L sin θ.", "Show that T = mLω², then use the vertical balance."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The centripetal force on an object in uniform circular motion does work on it.",
    answer: false,
    explanation: "False. The force is always perpendicular to the velocity, so W = Fs cos 90° = 0. That is why the speed stays constant.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each motion with the force that provides the centripetal force.",
    pairs: [
      ["the Moon orbiting the Earth", "gravitational pull of the Earth"],
      ["a conker whirled on a string in a horizontal circle", "horizontal component of the tension"],
      ["a car on a flat roundabout", "friction between tyres and road"],
      ["a train on a banked curve at its design speed", "horizontal component of the normal contact force"],
    ],
    explanation: "Centripetal force is never a new force: it is the resultant of real forces towards the centre.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "A force of constant magnitude that is always {{blank:a}} to the velocity changes the {{blank:b}} of motion but not the {{blank:c}}, producing uniform circular motion.",
    blanks: [
      { id: "a", accepted: ["perpendicular"], choices: ["perpendicular", "parallel", "opposite"] },
      { id: "b", accepted: ["direction"], choices: ["direction", "speed", "mass"] },
      { id: "c", accepted: ["speed"], choices: ["speed", "direction", "velocity"] },
    ],
    explanation: "A perpendicular force does no work, so it cannot change the speed; it turns the velocity.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why an object moving in a circle at constant speed is accelerating, and state the direction of the acceleration.",
    points: [
      "Velocity is a vector (has direction).",
      "The direction of motion changes continuously, so the velocity changes; a change in velocity is an acceleration.",
      "The acceleration (and resultant force) is directed towards the centre of the circle.",
    ],
    modelAnswer: "Velocity is a vector. Although the speed is constant, the direction of motion changes continuously, so the velocity changes and the object accelerates. The acceleration is directed towards the centre of the circle.",
    explanation: "Speed constant, direction changing, so velocity changing.",
    hints: ["Is velocity a scalar or a vector?"],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: t`A car of mass $m$ travels at speed $v$ round a bend of radius $r$ banked at angle $\theta$, with no sideways friction. Show that $\tan\theta = \dfrac{v^2}{rg}$.`,
    points: [
      t`Forces: weight $mg$ (down) and normal contact force $N$ perpendicular to the road surface (at $\theta$ to the vertical).`,
      t`Vertically, no acceleration: $N\cos\theta = mg$.`,
      t`Horizontally, the component of $N$ provides the centripetal force: $N\sin\theta = \dfrac{mv^2}{r}$.`,
      t`Dividing: $\tan\theta = \dfrac{v^2}{rg}$.`,
    ],
    modelAnswer: t`Only the weight and the normal force act. The normal force is perpendicular to the banked surface, at $\theta$ to the vertical. Vertically $N\cos\theta = mg$; horizontally $N\sin\theta = mv^2/r$ towards the centre. Dividing the second equation by the first gives $\tan\theta = v^2/(rg)$.`,
    explanation: "Resolve the normal force; its horizontal component is the centripetal force.",
    hints: ["Which force has a horizontal component towards the centre?"],
  });
  // Practice structured: whirling bung experiment (12 marks)
  {
    const M = 0.200, m = 0.025, r = 0.60;
    const t20 = [10.8, 11.2, 10.9, 11.1];
    const tm = mean(t20), dt = halfRange(t20);
    const T = tm / 20;
    const w = (2 * Math.PI) / T;
    const Freq = m * r * w * w;
    const W = M * g;
    const pctF = pctUnc(0.01, r) + 2 * pctUnc(dt, tm);
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Tatenda whirls a rubber bung of mass $25\ \text{g}$ in a horizontal circle on a string that passes through a smooth vertical tube. A $200\ \text{g}$ mass hangs from the lower end of the string, so the tension equals its weight. A marker keeps the radius at $(0.60 \pm 0.01)\ \text{m}$. The times for 20 revolutions are $${t20.join("$ s, $")}$ s. (Assume the string is horizontal.)`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the mean period, in s, to three significant figures.", value: T, unit: "s", wrong: [tm], explanation: t`$T = ${sfStr(tm, 3)}/20 = ${sfStr(T, 3)}\ \text{s}$.` }),
        P.num({ label: "(b)", marks: 2, stem: t`Calculate the angular speed, in $\text{rad s}^{-1}$, to three significant figures.`, value: w, unit: "rad/s", wrong: [1 / T], explanation: t`$\omega = 2\pi/T = ${sfStr(w, 3)}\ \text{rad s}^{-1}$.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Calculate the centripetal force needed, $mr\omega^2$, in N, to three significant figures.`, value: Freq, unit: "N", wrong: [m * r * w], explanation: t`$F = 0.025 \times 0.60 \times ${sfStr(w, 3)}^2 = ${sfStr(Freq, 3)}\ \text{N}$.` }),
        P.num({ label: "(d)", marks: 1, stem: "Calculate the tension provided by the hanging mass, in N, to three significant figures.", value: W, unit: "N", wrong: [M], explanation: t`$T = Mg = 0.200 \times 9.81 = ${sfStr(W, 3)}\ \text{N}$.` }),
        P.num({ label: "(e)", marks: 2, stem: t`Calculate the percentage uncertainty in $mr\omega^2$, using half the range of the timings and the uncertainty in $r$ (the mass of the bung is exact), to two significant figures.`, value: pctF, sf: 2, unit: "%", wrong: [pctUnc(0.01, r) + pctUnc(dt, tm)], explanation: t`$\omega \propto 1/T$, and $\omega^2$ doubles the timing uncertainty: $2 \times \dfrac{${dpStr(dt, 2)}}{${sfStr(tm, 3)}} \times 100 = ${sfStr(2 * pctUnc(dt, tm), 2)}\%$. Radius: $${sfStr(pctUnc(0.01, r), 2)}\%$. Total $${sfStr(pctF, 2)}\%$.` }),
        P.manual({ label: "(f)", marks: 2, stem: "Comment on whether the results support F = mrω², using your answers to (c), (d) and (e).", points: [t`The two forces differ by about $${sfStr((Math.abs(W - Freq) / W) * 100, 2)}\%$.`, t`${Math.abs(W - Freq) / W * 100 < pctF ? "This is within" : "This is larger than"} the uncertainty of about $${sfStr(pctF, 2)}\%$, so the results ${Math.abs(W - Freq) / W * 100 < pctF ? "support" : "do not fully support"} the relationship (friction at the tube would also cause a difference).`], modelAnswer: t`$mr\omega^2 = ${sfStr(Freq, 3)}\ \text{N}$ and $Mg = ${sfStr(W, 3)}\ \text{N}$ differ by about $${sfStr((Math.abs(W - Freq) / W) * 100, 2)}\%$, ${Math.abs(W - Freq) / W * 100 < pctF ? "within" : "more than"} the ${sfStr(pctF, 2)}% uncertainty, so the results ${Math.abs(W - Freq) / W * 100 < pctF ? "support" : "do not fully support"} $F = mr\omega^2$.` }),
        P.manual({ label: "(g)", marks: 2, stem: "Explain why the string cannot be exactly horizontal, and how this affects the analysis.", points: ["The bung's weight must be supported by a vertical component of the tension, so the string slopes downwards from the tube.", "Then the radius of the circle is less than the string length from the tube, and only the horizontal component of tension provides mr ω² (the tension also overcomes friction at the tube)."], modelAnswer: "The string must slope down so that a vertical component of the tension supports the bung's weight. The true radius is then smaller than the measured length and only the horizontal component of the tension provides the centripetal force; friction at the tube also changes the effective tension." }),
      ],
      explanation: "The weight of the hanging mass provides the tension; F = mrω² can be compared with it within the experimental uncertainty.",
      hints: ["ω = 2π/T.", "Percentage uncertainty in ω² is twice that in T."],
    });
  }

  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the force that provides the centripetal force on a satellite in a circular orbit around the Earth.",
    accepted: ["gravitational force", "gravity", "gravitational pull", "weight", "the gravitational force", "gravitational attraction", "the Earth's gravitational pull"],
    wrong: ["centrifugal force"],
    explanation: "The Earth's **gravitational force** on the satellite points towards the Earth's centre and provides the centripetal force (the gravitation topic develops this).",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "When a car turns sharply to the left, the passengers seem to be thrown to the right. Explain what is really happening.",
    points: [
      "There is no outward (centrifugal) force acting on the passengers.",
      "By Newton's first law each passenger tends to keep moving in a straight line (along the tangent) as the car turns.",
      "The car turns beneath them until the door, seat belt or seat pushes them towards the centre of the bend, providing their centripetal force.",
    ],
    modelAnswer: "No force pushes the passengers outwards. They tend to continue in a straight line (Newton's first law) while the car turns left beneath them, so they move towards the right-hand side of the car until the door, seat or seat belt pushes them towards the centre of the bend, providing the centripetal force they need.",
    explanation: "The sensation of being thrown outwards is inertia: the inward push of the car is the real force.",
    hints: ["Which way would a passenger move if no force acted on them?"],
  });
  {
    const r = 0.25, rpm = 1200, m = 0.2;
    const w = (rpm * 2 * Math.PI) / 60;
    const a = r * w * w;
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`The drum of a washing machine has radius $0.25\ \text{m}$ and spins at $1200$ revolutions per minute during the spin cycle. Its curved wall has many small holes.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: t`Calculate the angular speed of the drum, in $\text{rad s}^{-1}$, to three significant figures.`, value: w, unit: "rad/s", wrong: [rpm / 60], explanation: t`$f = 1200/60 = 20\ \text{Hz}$; $\omega = 2\pi f = ${sfStr(w, 3)}\ \text{rad s}^{-1}$.` }),
        P.num({ label: "(b)", marks: 2, stem: t`Calculate the centripetal acceleration of clothes pressed against the wall, in $\text{m s}^{-2}$, to three significant figures.`, value: a, unit: "m/s²", wrong: [r * w], explanation: t`$a = r\omega^2 = 0.25 \times ${sfStr(w, 4)}^2 = ${sciTex(a)}\ \text{m s}^{-2}$.` }),
        P.num({ label: "(c)", marks: 1, stem: t`Calculate the force the wall exerts on a $0.20\ \text{kg}$ wet towel, in N, to three significant figures.`, value: m * a, unit: "N", wrong: [m * g], explanation: t`$F = ma = 0.20 \times ${sciTex(a)} = ${sciTex(m * a)}\ \text{N}$.` }),
        P.num({ label: "(d)", marks: 1, stem: "Calculate the ratio of this acceleration to g, to three significant figures.", value: a / g, wrong: [a], explanation: t`$${sciTex(a)}/9.81 = ${sfStr(a / g, 3)}$.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain how the spinning drum removes water from the clothes.", points: ["The wall pushes the clothes inwards, providing their centripetal force, but nothing provides a large enough inward force on water at a hole.", "So the water continues in a straight line along the tangent and leaves through the holes."], modelAnswer: "The wall provides the inward force that keeps the clothes moving in a circle. Where there is a hole, nothing pushes the water inwards, so it carries on in a straight line along the tangent and leaves the drum through the hole." }),
      ],
      explanation: "ω = 2πf; a = rω²; F = ma; water at the holes has no inward force and leaves along the tangent.",
      hints: ["Convert rev/min to rad/s.", "a = rω²."],
    });
  }

  b.card("FORMULA", "Centripetal acceleration", t`$a = \dfrac{v^2}{r} = r\omega^2$, towards the centre`);
  b.card("FORMULA", "Centripetal force", t`$F = \dfrac{mv^2}{r} = mr\omega^2$`);
  b.card("CONCEPT", "Why is uniform circular motion accelerated?", "The direction of the velocity changes continuously, so the velocity changes.");
  b.card("CONCEPT", "Why does the speed stay constant?", "The force is perpendicular to the velocity, so it does no work.");
  b.card("CONCEPT", "What is the centripetal force?", "The resultant of real forces (tension, friction, gravity, normal force) towards the centre; not an extra force.");
  b.card("FORMULA", "Banked track at design speed", t`$\tan\theta = \dfrac{v^2}{rg}$`);
  b.card("FORMULA", "Top of a hump: speed at which contact is lost", t`$v = \sqrt{gr}$`);
  b.card("FACT", "Vertical circle: where is tension largest?", "At the bottom: T = mg + mv²/r.");
  b.card("FACT", "If the string breaks, the object moves…", "…along the tangent, in a straight line (Newton's first law).");
});
