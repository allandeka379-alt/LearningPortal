import { concept, P, t } from "../lib.mjs";

const steps = (...lines) => lines.join("\n");
const r = (x, n = 3) => Number(x.toPrecision(n));

// =====================================================================================================================
concept("phys.motion.speed-velocity", {
  file: "motion/speed-velocity",
  keyPrefix: "motion.speed",
  objectives: { cambridge: ["1.2.1", "1.2.3"], zimsec: ["2.1.1"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "What is meant by the **speed** of an object?",
    options: [["The distance travelled per unit time", "Correct."], ["The distance travelled in a given direction", "That describes displacement."], ["The change in velocity per unit time", "That is acceleration."], ["The time taken per unit distance", "Upside down."]],
    answer: "A", explanation: "Speed is distance travelled per unit time: v = s/t." });

  q.num({ d: 2, skill: "APPLICATION", daily: true,
    stem: t`A sprinter runs $100\ \text{m}$ in $12.5\ \text{s}$. Calculate her average speed.`,
    value: 8, answer: "8.0", unit: "m/s", wrong: [1250, 0.125, 12.5],
    explanation: t`$v = \dfrac{s}{t} = \dfrac{100}{12.5} = 8.0\ \text{m/s}$.` });

  q.num({ d: 2, skill: "APPLICATION", daily: true,
    stem: t`Convert $54\ \text{km/h}$ into metres per second.`,
    value: 15, unit: "m/s", wrong: [194.4, 54, 5.4],
    explanation: t`Divide by 3.6: $54 \div 3.6 = 15\ \text{m/s}$.` });

  q.num({ d: 2, skill: "APPLICATION",
    stem: t`A car on a highway moves at $25\ \text{m/s}$. What is this speed in km/h?`,
    value: 90, unit: "km/h", wrong: [6.94, 25, 2.5],
    explanation: t`Multiply by 3.6: $25 \times 3.6 = 90\ \text{km/h}$.` });

  q.num({ d: 3, skill: "APPLICATION",
    stem: t`How long does a cyclist moving at a steady $8.0\ \text{m/s}$ take to ride $2.4\ \text{km}$?`,
    value: 300, unit: "s", wrong: [0.3, 19200, 3.33],
    explanation: t`$t = \dfrac{s}{v} = \dfrac{2400\ \text{m}}{8.0\ \text{m/s}} = 300\ \text{s}$ (5 minutes).`,
    hints: ["Convert the distance to metres first.", "Rearrange v = s/t to t = s/v."] });

  q.num({ d: 3, skill: "APPLICATION",
    stem: t`A train travels at a steady $15\ \text{m/s}$ for $2.0$ minutes. How far does it travel?`,
    value: 1800, unit: "m", wrong: [30, 8, 7.5],
    explanation: t`$t = 2.0 \times 60 = 120\ \text{s}$; $s = vt = 15 \times 120 = 1800\ \text{m}$.`,
    hints: ["Change the minutes into seconds."] });

  q.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: t`A bus travels $45\ \text{km}$ at an average speed of $90\ \text{km/h}$, then a further $45\ \text{km}$ on a rough road at $30\ \text{km/h}$.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the total time for the journey, in hours.", value: 2, answer: "2.0", unit: "h", wrong: [1.5, 3], explanation: t`$\dfrac{45}{90} + \dfrac{45}{30} = 0.5 + 1.5 = 2.0\ \text{h}$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the average speed for the whole journey.", value: 45, unit: "km/h", wrong: [60, 120], explanation: t`$\dfrac{90\ \text{km}}{2.0\ \text{h}} = 45\ \text{km/h}$.` }),
      P.manual({ label: "(c)", marks: 1, stem: "Explain why the answer to (b) is not 60 km/h, the average of 90 km/h and 30 km/h.",
        points: ["The bus spends longer (1.5 h) at the slower speed than at the faster speed (0.5 h), so the average is weighted towards 30 km/h"] }),
    ],
    explanation: "Average speed = total distance ÷ total time = 90 km ÷ 2.0 h = 45 km/h. The bus spends three times as long on the slow stage, so the simple average of the speeds is wrong.",
    hints: ["Find the time for each stage separately.", "Average speed = total distance ÷ total time."] });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "Which statement about speed and velocity is correct?",
    options: [["Velocity is speed in a given direction.", "Correct."], ["Speed and velocity are the same quantity.", "Velocity also has a direction."], ["Speed is a vector and velocity is a scalar.", "The other way round."], ["Velocity is always larger than speed.", "Their sizes are equal for straight-line motion; velocity adds a direction."]],
    answer: "A", explanation: "Velocity = speed in a stated direction, so velocity is a vector and speed a scalar." });

  q.tf({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A car going round a bend at a steady 40 km/h has a constant velocity.",
    answer: false, explanation: "Its speed is constant but its direction keeps changing, so its velocity changes." });

  q.struct({ d: 3, skill: "APPLICATION",
    stem: t`A dog runs $80\ \text{m}$ due east along a straight path and then $60\ \text{m}$ due west back along the same path.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "What distance has the dog run?", value: 140, unit: "m", wrong: [20, 100], explanation: "80 + 60 = 140 m." }),
      P.num({ label: "(b)", marks: 1, stem: "What is the size of the dog's displacement from its starting point?", value: 20, unit: "m", wrong: [140, 100], explanation: "80 − 60 = 20 m (towards the east)." }),
    ],
    explanation: "Distance adds every metre run (140 m); displacement is the straight-line change in position: 20 m east.",
    hints: ["Displacement only cares where the dog ends up compared with where it started."] });

  q.num({ d: 3, skill: "APPLICATION",
    stem: t`A ticker-tape timer makes 50 dots per second. A section of tape containing 10 spaces between dots measures $12.0\ \text{cm}$. What was the average speed of the trolley during that section?`,
    value: 0.6, answer: "0.60", unit: "m/s", wrong: [60, 1.2, 0.012],
    explanation: t`10 spaces take $10 \times 0.02 = 0.20\ \text{s}$; speed $= \dfrac{0.120\ \text{m}}{0.20\ \text{s}} = 0.60\ \text{m/s}$.`,
    hints: ["Each space takes 1/50 s = 0.02 s.", "Convert 12.0 cm to metres."] });

  q.short({ d: 2, skill: "RECALL", daily: true,
    stem: "Which quantity is defined as speed in a given direction?",
    accepted: ["velocity", "the velocity"], wrong: ["acceleration", "displacement"],
    explanation: "Velocity is speed in a given direction." });

  q.match({ d: 2, skill: "RECALL",
    stem: "Match each quantity with its description.",
    pairs: [["Distance", "Total length of the path travelled"], ["Displacement", "Straight-line distance from start to finish, with direction"], ["Speed", "Distance travelled per unit time"], ["Velocity", "Speed in a given direction"]],
    explanation: "Distance and speed are scalars; displacement and velocity are the matching vectors." });

  q.fib({ d: 1, skill: "RECALL",
    stem: "Complete the definition.",
    template: "Average speed = total {{blank:a}} travelled ÷ total {{blank:b}} taken.",
    blanks: [{ id: "a", input: "select", choices: ["distance", "time", "velocity"], accepted: ["distance"], wrong: "time" }, { id: "b", input: "select", choices: ["distance", "time", "velocity"], accepted: ["time"], wrong: "distance" }],
    explanation: "Average speed is total distance ÷ total time." });

  q.struct({ d: 4, skill: "APPLICATION", examStyle: true,
    stem: t`A commuter omnibus travels $18\ \text{km}$ in $15$ minutes, waits at a rank for $5$ minutes, then travels a further $27\ \text{km}$ in $20$ minutes.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the average speed for the first stage in km/h.", value: 72, unit: "km/h", wrong: [1.2, 270], explanation: t`$15\ \text{min} = 0.25\ \text{h}$; $\dfrac{18}{0.25} = 72\ \text{km/h}$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the average speed for the whole trip, including the wait, in km/h.", value: 67.5, answer: "67.5", unit: "km/h", tol: 0.5, wrong: [77.1, 1.125], explanation: t`Total $45\ \text{km}$ in $40\ \text{min} = \tfrac{2}{3}\ \text{h}$: $45 \div \tfrac{2}{3} = 67.5\ \text{km/h}$.` }),
      P.num({ label: "(c)", marks: 1, stem: "Convert your answer to (b) into m/s.", value: 18.75, answer: "18.8", unit: "m/s", wrong: [243, 67.5], explanation: t`$67.5 \div 3.6 = 18.75 \approx 18.8\ \text{m/s}$.` }),
    ],
    explanation: "Average speed includes every minute of the trip, waiting time too: 45 km in 40 min = 67.5 km/h = 18.8 m/s.",
    hints: ["Convert minutes to hours by dividing by 60.", "The waiting time counts in the total time."] });

  q.num({ d: 3, skill: "APPLICATION",
    stem: t`A card $5.0\ \text{cm}$ long on a trolley passes through a light gate, blocking the beam for $0.040\ \text{s}$. Calculate the speed of the trolley.`,
    value: 1.25, answer: "1.25", unit: "m/s", wrong: [125, 0.8, 0.002],
    explanation: t`$v = \dfrac{0.050\ \text{m}}{0.040\ \text{s}} = 1.25\ \text{m/s}$.`,
    hints: ["Speed = length of card ÷ time the beam is blocked.", "Use metres."] });

  q.card("DEFINITION", "Define **speed**.", "The distance travelled per unit time.");
  q.card("FORMULA", "What is the equation for speed?", "v = s / t (speed = distance ÷ time).");
  q.card("DEFINITION", "Define **velocity**.", "Speed in a given direction (a vector).");
  q.card("CONCEPT", "What is the difference between distance and displacement?", "Distance: total path length (scalar). Displacement: straight-line change in position with direction (vector).");
  q.card("FORMULA", "How is average speed calculated?", "Total distance travelled ÷ total time taken.");
  q.card("CONCEPT", "How do you convert km/h to m/s?", "Divide by 3.6. (Multiply by 3.6 to go from m/s to km/h.)");
  q.card("FACT", "A ticker-tape timer makes 50 dots per second. What is the time between dots?", "0.02 s.");
  q.card("CONCEPT", "Can an object at constant speed have a changing velocity?", "Yes: if its direction changes, e.g. going round a bend.");
  q.card("FACT", "What is the SI unit of speed?", "Metres per second, m/s.");
});

// =====================================================================================================================
concept("phys.motion.acceleration", {
  file: "motion/acceleration",
  keyPrefix: "motion.accel",
  objectives: { cambridge: ["1.2.9", "1.2.12"], zimsec: ["2.1.1"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "What is meant by acceleration?",
    options: [["The change in velocity per unit time", "Correct."], ["The distance travelled per unit time", "That is speed."], ["The change in distance per unit velocity", "Not a physical definition."], ["How fast an object is moving", "That is speed."]],
    answer: "A", explanation: "Acceleration is the change in velocity per unit time: a = Δv/Δt." });

  q.mcq({ d: 1, skill: "RECALL",
    stem: "What is the SI unit of acceleration?",
    options: [["m/s", "That is the unit of speed."], ["m/s²", "Correct."], ["m s", "Not a unit of acceleration."], ["N", "That is force."]],
    answer: "B", explanation: "Velocity (m/s) divided by time (s) gives m/s²." });

  q.num({ d: 2, skill: "APPLICATION", daily: true,
    stem: t`A motorbike accelerates from rest to $24\ \text{m/s}$ in $6.0\ \text{s}$. Calculate its acceleration.`,
    value: 4, answer: "4.0", unit: "m/s²", wrong: [144, 0.25, 30],
    explanation: t`$a = \dfrac{v - u}{t} = \dfrac{24 - 0}{6.0} = 4.0\ \text{m/s}^2$.` });

  q.num({ d: 2, skill: "APPLICATION", daily: true,
    stem: t`A taxi slows from $20\ \text{m/s}$ to $8\ \text{m/s}$ in $4.0\ \text{s}$. Calculate its deceleration.`,
    value: 3, answer: "3.0", unit: "m/s²", wrong: [7, 2, 48],
    explanation: t`$a = \dfrac{8 - 20}{4.0} = -3.0\ \text{m/s}^2$, a deceleration of $3.0\ \text{m/s}^2$.` });

  q.num({ d: 3, skill: "APPLICATION",
    stem: t`A boy on a bicycle is moving at $3.0\ \text{m/s}$. He accelerates at $0.80\ \text{m/s}^2$ for $12\ \text{s}$. What is his final speed?`,
    value: 12.6, answer: "12.6", unit: "m/s", tol: 0.05, wrong: [9.6, 15.6, 0.75],
    explanation: t`$v = u + at = 3.0 + 0.80 \times 12 = 3.0 + 9.6 = 12.6\ \text{m/s}$.`,
    hints: ["Use v = u + at."] });

  q.num({ d: 3, skill: "APPLICATION",
    stem: t`A car accelerates uniformly at $1.6\ \text{m/s}^2$ from $5.0\ \text{m/s}$ to $29\ \text{m/s}$. How long does this take?`,
    value: 15, unit: "s", wrong: [38.4, 21.25, 18.1],
    explanation: t`$t = \dfrac{v - u}{a} = \dfrac{29 - 5.0}{1.6} = \dfrac{24}{1.6} = 15\ \text{s}$.`,
    hints: ["Rearrange a = (v − u)/t."] });

  q.tf({ d: 2, skill: "UNDERSTANDING",
    stem: "An object moving at a constant speed cannot be accelerating.",
    answer: false, explanation: "If its direction changes (for example on a roundabout), its velocity changes, so it is accelerating even at constant speed." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A car has a steady acceleration of 5 m/s². What does this mean?",
    options: [["It travels 5 m every second.", "That would be a speed of 5 m/s."], ["Its velocity increases by 5 m/s every second.", "Correct."], ["Its velocity is 5 m/s.", "Acceleration is not a velocity."], ["It takes 5 s to reach full speed.", "Acceleration does not say this."]],
    answer: "B", explanation: "An acceleration of 5 m/s² means the velocity changes by 5 m/s in each second." });

  q.struct({ d: 4, skill: "APPLICATION", examStyle: true,
    stem: t`An aircraft starts from rest on a runway and accelerates uniformly, reaching $75\ \text{m/s}$ after $30\ \text{s}$.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate its acceleration.", value: 2.5, answer: "2.5", unit: "m/s²", wrong: [2250, 0.4], explanation: t`$a = \dfrac{75}{30} = 2.5\ \text{m/s}^2$.` }),
      P.num({ label: "(b)", marks: 2, stem: "How long after starting did it reach $60\\ \\text{m/s}$?", value: 24, unit: "s", wrong: [150, 36], explanation: t`$t = \dfrac{60}{2.5} = 24\ \text{s}$.` }),
    ],
    explanation: "a = 75/30 = 2.5 m/s²; at that rate 60 m/s is reached after 60/2.5 = 24 s.",
    hints: ["The aircraft starts from rest, so u = 0."] });

  q.mcq({ d: 3, skill: "ANALYSIS",
    stem: "Which of these has the greatest acceleration?",
    options: [["A car going from 0 to 20 m/s in 10 s", "a = 2 m/s²."], ["A bus going from 10 m/s to 40 m/s in 10 s", "a = 3 m/s²."], ["A ball going from 30 m/s to 36 m/s in 1 s", "Correct: a = 6 m/s²."], ["A train going from 0 to 100 m/s in 40 s", "a = 2.5 m/s²."]],
    answer: "C", explanation: "Acceleration = change in velocity ÷ time: 2, 3, 6 and 2.5 m/s². The ball has the greatest.",
    hints: ["Work out (v − u)/t for each."] });

  q.fib({ d: 2, skill: "RECALL",
    stem: "Complete the equation for acceleration.",
    template: "a = (v − u) ÷ t, where u is the {{blank:a}} velocity and v is the {{blank:b}} velocity.",
    blanks: [{ id: "a", input: "select", choices: ["initial", "final", "average"], accepted: ["initial"], wrong: "final" }, { id: "b", input: "select", choices: ["initial", "final", "average"], accepted: ["final"], wrong: "initial" }],
    explanation: "u is the initial (starting) velocity and v the final velocity." });

  q.short({ d: 2, skill: "RECALL",
    stem: "What name is given to a negative acceleration, when an object slows down?",
    accepted: ["deceleration", "retardation", "a deceleration"], wrong: ["negative velocity"],
    explanation: "Slowing down is a deceleration (or retardation): a negative acceleration." });

  q.num({ d: 3, skill: "APPLICATION",
    stem: t`A ball rolling up a slope slows from $6.0\ \text{m/s}$ to $1.5\ \text{m/s}$ in $2.5\ \text{s}$. Calculate its acceleration, including its sign.`,
    value: -1.8, answer: "-1.8", unit: "m/s²", wrong: [1.8, 3, -3],
    explanation: t`$a = \dfrac{1.5 - 6.0}{2.5} = \dfrac{-4.5}{2.5} = -1.8\ \text{m/s}^2$ (a deceleration).`,
    hints: ["Final minus initial velocity is negative here."] });

  q.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: t`A $10\ \text{cm}$ card on a trolley passes through two light gates. It blocks the first gate for $0.050\ \text{s}$ and the second for $0.025\ \text{s}$. The trolley takes $0.60\ \text{s}$ to travel from the first gate to the second.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the speed at the first gate.", value: 2, answer: "2.0", unit: "m/s", wrong: [200, 0.5], explanation: t`$\dfrac{0.10}{0.050} = 2.0\ \text{m/s}$.` }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the speed at the second gate.", value: 4, answer: "4.0", unit: "m/s", wrong: [0.25, 400], explanation: t`$\dfrac{0.10}{0.025} = 4.0\ \text{m/s}$.` }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the acceleration of the trolley.", value: r(2 / 0.6), unit: "m/s²", wrong: [6.67, 1.2], explanation: t`$a = \dfrac{4.0 - 2.0}{0.60} = 3.3\ \text{m/s}^2$.` }),
    ],
    explanation: "Speeds 2.0 m/s and 4.0 m/s from card length ÷ time; a = (4.0 − 2.0)/0.60 = 3.3 m/s².",
    hints: ["Speed through a gate = card length ÷ time blocked.", "Then use a = (v − u)/t with the time between gates."] });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "A car drives round a roundabout at a constant speed of 20 km/h. Which statement is correct?",
    options: [["It is not accelerating because its speed is constant.", "Its direction changes, so its velocity changes."], ["It is accelerating because its direction keeps changing.", "Correct."], ["It is decelerating.", "Its speed is constant."], ["Its velocity is constant.", "Velocity includes direction, which is changing."]],
    answer: "B", explanation: "A change of direction is a change of velocity, so the car is accelerating." });

  q.card("DEFINITION", "Define **acceleration**.", "The change in velocity per unit time.");
  q.card("FORMULA", "What is the equation for acceleration?", "a = (v − u) / t, where u = initial velocity and v = final velocity.");
  q.card("FACT", "What is the unit of acceleration?", "Metres per second squared, m/s².");
  q.card("CONCEPT", "What does an acceleration of 4 m/s² mean?", "The velocity changes by 4 m/s every second.");
  q.card("DEFINITION", "What is a **deceleration**?", "A decrease in velocity: a negative acceleration.");
  q.card("FORMULA", "How do you find the final velocity from u, a and t?", "v = u + at.");
  q.card("CONCEPT", "Can an object accelerate without changing speed?", "Yes: changing direction changes velocity, so it is an acceleration.");
  q.card("CONCEPT", "On which graph is acceleration the gradient?", "The speed-time (velocity-time) graph.");
});

// =====================================================================================================================
const Z = ["zimsec"];
concept("phys.motion.equations-of-motion", {
  file: "motion/equations-of-motion",
  keyPrefix: "motion.suvat",
  objectives: { zimsec: ["2.1.3"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL", applies: Z,
    stem: "Which equation of motion does not contain the time t?",
    options: [["v = u + at", "Contains t."], ["s = ut + ½at²", "Contains t."], ["v² = u² + 2as", "Correct."], ["s = ½(u + v)t", "Contains t."]],
    answer: "C", explanation: "v² = u² + 2as links velocities, acceleration and displacement without time." });

  q.num({ d: 2, skill: "APPLICATION", daily: true, applies: Z,
    stem: t`A trolley starts from rest and accelerates uniformly at $2.5\ \text{m/s}^2$ for $8.0\ \text{s}$. Find its final velocity.`,
    value: 20, unit: "m/s", wrong: [3.2, 10.5, 80],
    explanation: t`$v = u + at = 0 + 2.5 \times 8.0 = 20\ \text{m/s}$.` });

  q.num({ d: 3, skill: "APPLICATION", applies: Z,
    stem: t`A car moving at $4.0\ \text{m/s}$ accelerates uniformly at $3.0\ \text{m/s}^2$ for $6.0\ \text{s}$. How far does it travel in this time?`,
    value: 78, unit: "m", wrong: [132, 24, 42],
    explanation: t`$s = ut + \tfrac{1}{2}at^2 = 4.0 \times 6.0 + \tfrac{1}{2} \times 3.0 \times 6.0^2 = 24 + 54 = 78\ \text{m}$.`,
    hints: ["Use s = ut + ½at²."] });

  q.num({ d: 3, skill: "APPLICATION", applies: Z,
    stem: t`A stone accelerates uniformly from rest at $4.0\ \text{m/s}^2$ over a distance of $50\ \text{m}$. What is its final velocity?`,
    value: 20, unit: "m/s", wrong: [400, 14.1, 200],
    explanation: t`$v^2 = u^2 + 2as = 0 + 2 \times 4.0 \times 50 = 400$, so $v = 20\ \text{m/s}$.`,
    hints: ["No time is given: use v² = u² + 2as.", "Remember to take the square root."] });

  q.num({ d: 3, skill: "APPLICATION", applies: Z,
    stem: t`A minibus travelling at $24\ \text{m/s}$ brakes uniformly and stops in $48\ \text{m}$. Calculate the size of its deceleration.`,
    value: 6, answer: "6.0", unit: "m/s²", wrong: [0.5, 12, 3],
    explanation: t`$0 = 24^2 + 2a(48)$, so $a = -\dfrac{576}{96} = -6.0\ \text{m/s}^2$: a deceleration of $6.0\ \text{m/s}^2$.`,
    hints: ["It stops, so v = 0.", "Use v² = u² + 2as and solve for a."] });

  q.num({ d: 3, skill: "APPLICATION", applies: Z,
    stem: t`A cyclist speeds up uniformly from $8\ \text{m/s}$ to $20\ \text{m/s}$ in $7.0\ \text{s}$. How far does she travel in this time?`,
    value: 98, unit: "m", wrong: [196, 140, 84],
    explanation: t`$s = \dfrac{(u + v)}{2}t = \dfrac{8 + 20}{2} \times 7.0 = 14 \times 7.0 = 98\ \text{m}$.`,
    hints: ["Use the average velocity: s = ½(u + v)t."] });

  q.num({ d: 3, skill: "APPLICATION", applies: Z,
    stem: t`A stone falls from rest from the top of a cliff $45\ \text{m}$ high. Ignoring air resistance and taking $g = 10\ \text{m/s}^2$, how long does it take to reach the ground?`,
    value: 3, answer: "3.0", unit: "s", wrong: [9, 4.5, 2.12],
    explanation: t`$s = \tfrac{1}{2}gt^2$: $45 = 5t^2$, $t^2 = 9$, $t = 3.0\ \text{s}$.`,
    hints: ["From rest, s = ½gt²."] });

  q.struct({ d: 4, skill: "APPLICATION", applies: Z, examStyle: true,
    stem: t`A ball is thrown vertically upwards at $15\ \text{m/s}$. Take $g = 10\ \text{m/s}^2$ and ignore air resistance.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the maximum height the ball reaches.", value: 11.25, answer: "11.3", unit: "m", tol: 0.1, wrong: [22.5, 1.5], explanation: t`At the top $v = 0$: $0 = 15^2 - 2 \times 10 \times s$, so $s = \dfrac{225}{20} = 11.25\ \text{m}$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the time taken to reach the maximum height.", value: 1.5, answer: "1.5", unit: "s", wrong: [150, 0.67], explanation: t`$0 = 15 - 10t$, so $t = 1.5\ \text{s}$.` }),
    ],
    explanation: "Taking upwards as positive, a = −10 m/s² and v = 0 at the top: height = 225/20 = 11.25 m, time = 15/10 = 1.5 s.",
    hints: ["At the highest point the velocity is zero.", "Take upwards as positive, so a = −10 m/s²."] });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "When can the equations of motion be used?",
    options: [["Only when the acceleration is constant", "Correct."], ["Only when the velocity is constant", "Then a = 0; the equations still need constant acceleration, but they are not limited to this case."], ["For any motion at all", "They fail when the acceleration changes."], ["Only for falling objects", "They work for any uniform acceleration."]],
    answer: "A", explanation: "The equations of motion apply only to uniform (constant) acceleration." });

  q.tf({ d: 2, skill: "UNDERSTANDING", daily: true, applies: Z,
    stem: "The equations of motion can be used to find the speed of a skydiver just before she reaches terminal velocity.",
    answer: false, explanation: "Before terminal velocity her acceleration keeps changing (air resistance grows), so the uniform-acceleration equations do not apply." });

  q.struct({ d: 4, skill: "ANALYSIS", applies: Z, examStyle: true,
    stem: t`A car starts from rest and accelerates uniformly at $2.0\ \text{m/s}^2$ for $10\ \text{s}$. It then travels at a constant speed for $20\ \text{s}$, before braking uniformly to rest over $50\ \text{m}$.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "What is its maximum speed?", value: 20, unit: "m/s", wrong: [5, 40], explanation: t`$v = 0 + 2.0 \times 10 = 20\ \text{m/s}$.` }),
      P.num({ label: "(b)", marks: 2, stem: "How far does it travel while accelerating?", value: 100, unit: "m", wrong: [200, 20], explanation: t`$s = \tfrac{1}{2} \times 2.0 \times 10^2 = 100\ \text{m}$.` }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the size of the deceleration while braking.", value: 4, answer: "4.0", unit: "m/s²", wrong: [8, 0.4], explanation: t`$0 = 20^2 + 2a(50)$, $a = -4.0\ \text{m/s}^2$.` }),
      P.num({ label: "(d)", marks: 2, stem: "Calculate the total distance travelled.", value: 550, unit: "m", wrong: [150, 500], explanation: t`$100 + 20 \times 20 + 50 = 550\ \text{m}$.` }),
    ],
    explanation: "Stage 1: 100 m, reaching 20 m/s; stage 2: 20 m/s × 20 s = 400 m; stage 3: 50 m with a = −4.0 m/s². Total 550 m.",
    hints: ["Treat each stage separately.", "At constant speed, distance = speed × time."] });

  q.match({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "Match each phrase in a question with what it tells you.",
    pairs: [["\"starts from rest\"", "u = 0"], ["\"comes to rest\"", "v = 0"], ["\"is dropped\"", "u = 0 and a = g"], ["\"moves with uniform velocity\"", "a = 0"]],
    explanation: "Translate the words into suvat values before choosing an equation." });

  q.num({ d: 3, skill: "APPLICATION", applies: Z,
    stem: t`A stone dropped from rest into a well takes $2.0\ \text{s}$ to reach the water. Taking $g = 10\ \text{m/s}^2$, how far below the top is the water?`,
    value: 20, unit: "m", wrong: [40, 10, 5],
    explanation: t`$s = \tfrac{1}{2}gt^2 = \tfrac{1}{2} \times 10 \times 2.0^2 = 20\ \text{m}$.`,
    hints: ["Use s = ut + ½at² with u = 0."] });

  q.struct({ d: 4, skill: "APPLICATION", applies: Z,
    stem: t`A goods train accelerates uniformly from $10\ \text{m/s}$ to $30\ \text{m/s}$ over a distance of $800\ \text{m}$.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate its acceleration.", value: 0.5, answer: "0.50", unit: "m/s²", wrong: [0.025, 2], explanation: t`$30^2 = 10^2 + 2a(800)$: $a = \dfrac{800}{1600} = 0.50\ \text{m/s}^2$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the time this takes.", value: 40, unit: "s", wrong: [20, 80], explanation: t`$t = \dfrac{30 - 10}{0.50} = 40\ \text{s}$ (or $800 = \tfrac{10 + 30}{2}t$).` }),
    ],
    explanation: "v² = u² + 2as gives a = 0.50 m/s²; then t = (v − u)/a = 40 s.",
    hints: ["Use v² = u² + 2as first.", "Then use v = u + at."] });

  q.card("FORMULA", "Which equation links v, u, a and t?", "v = u + at.", undefined, { applies: Z });
  q.card("FORMULA", "Which equation links s, u, a and t?", "s = ut + ½at².", undefined, { applies: Z });
  q.card("FORMULA", "Which equation links v, u, a and s (no time)?", "v² = u² + 2as.", undefined, { applies: Z });
  q.card("FORMULA", "Which equation uses the average velocity?", "s = ½(u + v)t.", undefined, { applies: Z });
  q.card("CONCEPT", "When may the equations of motion be used?", "Only when the acceleration is uniform (constant).", undefined, { applies: Z });
  q.card("VOCABULARY", "What do s, u, v, a and t stand for?", "Displacement, initial velocity, final velocity, acceleration, time.", undefined, { applies: Z });
  q.card("CONCEPT", "What does 'dropped from rest' tell you?", "u = 0 and a = g (if air resistance is ignored).", undefined, { applies: Z });
  q.card("CONCEPT", "What is the velocity of a ball at the top of its flight?", "Zero (v = 0) for a ball thrown straight up.", undefined, { applies: Z });
});

// =====================================================================================================================
concept("phys.motion.graphs", {
  file: "motion/motion-graphs",
  keyPrefix: "motion.graphs",
  objectives: { cambridge: ["1.2.4", "1.2.6", "1.2.7"], zimsec: ["2.2.1", "2.2.2"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "On a distance-time graph, what does a horizontal (flat) line show?",
    options: [["The object is at rest.", "Correct: the distance is not changing."], ["The object moves at constant speed.", "That is a straight sloping line."], ["The object is accelerating.", "That is a curve getting steeper."], ["The object is moving backwards.", "The distance would decrease."]],
    answer: "A", explanation: "A flat line means the distance stays the same, so the object is not moving." });

  q.mcq({ d: 1, skill: "RECALL",
    stem: "On a speed-time graph, what does a horizontal line above the time axis show?",
    options: [["The object is at rest.", "Only a line ON the time axis shows rest."], ["The object moves at constant speed.", "Correct."], ["The object is accelerating uniformly.", "That is a sloping straight line."], ["The object is slowing down.", "That is a line sloping down."]],
    answer: "B", explanation: "The speed is not changing, so it is moving at a constant speed." });

  q.mcq({ d: 2, skill: "RECALL",
    stem: "What does the gradient of a distance-time graph represent?",
    options: [["Acceleration", "That is the gradient of a speed-time graph."], ["Speed", "Correct."], ["Distance travelled", "That is read from the y-axis."], ["Time taken", "That is read from the x-axis."]],
    answer: "B", explanation: "Gradient = change in distance ÷ change in time = speed." });

  q.mcq({ d: 2, skill: "RECALL",
    stem: "What does the area under a speed-time graph represent?",
    options: [["Acceleration", "That is the gradient."], ["Average speed", "Not the area."], ["Distance travelled", "Correct."], ["Time", "That is on the x-axis."]],
    answer: "C", explanation: "Area = speed × time = distance travelled." });

  q.num({ d: 2, skill: "APPLICATION", daily: true,
    stem: t`A distance-time graph for a runner is a straight line through the origin, reaching $240\ \text{m}$ at $16\ \text{s}$. What is the runner's speed?`,
    value: 15, unit: "m/s", wrong: [3840, 0.067, 256],
    explanation: t`Gradient $= \dfrac{240}{16} = 15\ \text{m/s}$.` });

  q.num({ d: 3, skill: "APPLICATION", daily: true,
    stem: t`A speed-time graph is a straight line from $0$ at $t = 0$ to $16\ \text{m/s}$ at $t = 8.0\ \text{s}$. How far does the object travel in these $8.0\ \text{s}$?`,
    value: 64, unit: "m", wrong: [128, 2, 24],
    explanation: t`Area of the triangle $= \tfrac{1}{2} \times 8.0 \times 16 = 64\ \text{m}$.`,
    hints: ["Find the area of the triangle under the line."] });

  q.num({ d: 3, skill: "APPLICATION",
    stem: t`On a speed-time graph a straight line rises from $4\ \text{m/s}$ at $t = 0$ to $20\ \text{m/s}$ at $t = 8.0\ \text{s}$. Calculate the acceleration.`,
    value: 2, answer: "2.0", unit: "m/s²", wrong: [2.5, 0.5, 96],
    explanation: t`Gradient $= \dfrac{20 - 4}{8.0} = 2.0\ \text{m/s}^2$.`,
    hints: ["Acceleration is the gradient of a speed-time graph."] });

  q.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: t`A trolley's speed-time graph has three straight sections: from rest it speeds up to $10\ \text{m/s}$ in $5.0\ \text{s}$; it then moves at $10\ \text{m/s}$ for $15\ \text{s}$; finally it slows uniformly to rest in $10\ \text{s}$.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the acceleration in the first section.", value: 2, answer: "2.0", unit: "m/s²", wrong: [50, 0.5], explanation: t`$\dfrac{10}{5.0} = 2.0\ \text{m/s}^2$.` }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the size of the deceleration in the last section.", value: 1, answer: "1.0", unit: "m/s²", wrong: [100, 10], explanation: t`$\dfrac{10}{10} = 1.0\ \text{m/s}^2$.` }),
      P.num({ label: "(c)", marks: 3, stem: "Calculate the total distance travelled.", value: 225, unit: "m", wrong: [300, 175], explanation: t`$\tfrac{1}{2}(5.0)(10) + 15(10) + \tfrac{1}{2}(10)(10) = 25 + 150 + 50 = 225\ \text{m}$.` }),
      P.num({ label: "(d)", marks: 1, stem: "Calculate the average speed for the whole journey.", value: 7.5, answer: "7.5", unit: "m/s", wrong: [10, 5], explanation: t`$\dfrac{225}{30} = 7.5\ \text{m/s}$.` }),
    ],
    explanation: "Gradients give 2.0 m/s² and −1.0 m/s²; the area (triangle + rectangle + triangle) gives 225 m; average speed = 225/30 = 7.5 m/s.",
    hints: ["Split the area into two triangles and a rectangle.", "The total time is 30 s."] });

  q.mcq({ d: 3, skill: "ANALYSIS",
    stem: "A distance-time graph is a curve that gets steeper as time goes on. What is the object doing?",
    options: [["Moving at constant speed", "That would be a straight line."], ["Speeding up", "Correct: the gradient (speed) is increasing."], ["Slowing down", "The curve would get less steep."], ["At rest", "That is a flat line."]],
    answer: "B", explanation: "The gradient of a distance-time graph is the speed; a steepening curve means increasing speed.",
    hints: ["What does the gradient of a distance-time graph represent?"] });

  q.tf({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A straight line sloping downwards on a speed-time graph shows the object moving backwards.",
    answer: false, explanation: "It shows the speed decreasing steadily: a constant deceleration. The object is still moving forwards until the line reaches zero." });

  q.match({ d: 3, skill: "UNDERSTANDING",
    stem: "Match each graph description with the motion it shows.",
    pairs: [["Distance-time: straight line sloping up", "Constant speed"], ["Distance-time: horizontal line", "At rest"], ["Speed-time: straight line sloping up", "Constant acceleration"], ["Speed-time: straight line sloping down to zero", "Constant deceleration to a stop"]],
    explanation: "Check the axes first: the same shape means different things on the two kinds of graph.",
    hints: ["Gradient of distance-time = speed; gradient of speed-time = acceleration."] });

  q.mcq({ d: 3, skill: "ANALYSIS", applies: ["cambridge"],
    stem: "A speed-time graph is a curve that rises steeply at first and then gets less and less steep. What does this show?",
    options: [["Constant acceleration", "That would be a straight line."], ["An acceleration that is decreasing", "Correct: the gradient is decreasing."], ["A deceleration", "The speed is still increasing."], ["Constant speed", "The speed is changing."]],
    answer: "B", explanation: "The speed keeps rising but the gradient (acceleration) gets smaller: a decreasing (changing) acceleration, as for a falling object approaching terminal velocity.",
    hints: ["Look at what happens to the gradient."] });

  q.num({ d: 3, skill: "APPLICATION",
    stem: t`On a speed-time graph a straight line goes from $5\ \text{m/s}$ at $t = 0$ to $17\ \text{m/s}$ at $t = 12\ \text{s}$. How far does the object travel in these $12\ \text{s}$?`,
    value: 132, unit: "m", wrong: [102, 204, 60],
    explanation: t`The area is a trapezium: $\dfrac{(5 + 17)}{2} \times 12 = 11 \times 12 = 132\ \text{m}$.`,
    hints: ["Split the area into a rectangle and a triangle, or use the trapezium rule."] });

  q.short({ d: 2, skill: "RECALL",
    stem: "What must you draw on a curved distance-time graph to find the speed at one particular instant?",
    accepted: ["tangent", "a tangent", "a tangent to the curve", "tangent line"], wrong: ["a straight line through the origin"],
    explanation: "The gradient of the tangent at that point gives the instantaneous speed." });

  q.num({ d: 2, skill: "APPLICATION",
    stem: "A cyclist's distance from home is recorded: 0 m at 0 s, 6 m at 2 s, 12 m at 4 s and 18 m at 6 s. What is her speed?",
    value: 3, answer: "3.0", unit: "m/s", wrong: [36, 0.33, 6],
    explanation: "The distance increases by 6 m every 2 s: speed = 3.0 m/s (a straight-line graph)." });

  q.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: "A learner's distance-time graph for a walk has three straight sections: 0 to 20 s, distance rises from 0 to 100 m; 20 s to 50 s, distance stays at 100 m; 50 s to 60 s, distance rises from 100 m to 250 m.",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the speed in the first section.", value: 5, answer: "5.0", unit: "m/s", wrong: [2000, 0.2], explanation: "100 m ÷ 20 s = 5.0 m/s." }),
      P.mcq({ label: "(b)", stem: "What is the learner doing between 20 s and 50 s?", options: [["Standing still", "Correct: the distance does not change."], ["Walking at constant speed", "The distance would increase."], ["Walking back home", "The distance would decrease."], ["Accelerating", "That needs a curve."]], answer: "A", explanation: "A flat line on a distance-time graph means at rest." }),
      P.num({ label: "(c)", marks: 1, stem: "Calculate the speed in the last section.", value: 15, unit: "m/s", wrong: [25, 2.5], explanation: "(250 − 100) m ÷ 10 s = 15 m/s." }),
      P.num({ label: "(d)", marks: 2, stem: "Calculate the average speed for the whole 60 s.", value: r(250 / 60), unit: "m/s", wrong: [10, 6.67], explanation: "250 m ÷ 60 s = 4.2 m/s." }),
    ],
    explanation: "Gradients give the speeds (5.0 m/s, rest, 15 m/s); average speed = total distance ÷ total time = 250/60 = 4.2 m/s.",
    hints: ["Speed = gradient of each straight section.", "Average speed uses the total time, including the rest."] });

  q.mcq({ d: 4, skill: "ANALYSIS",
    stem: "A ball is thrown straight up and caught again at the same height. Which describes its SPEED-time graph (speed, not velocity)?",
    options: [["A straight line falling to zero, then a straight line rising again", "Correct: speed decreases uniformly to zero at the top, then increases uniformly."], ["A horizontal line", "The speed changes."], ["A straight line rising throughout", "It slows down on the way up."], ["A curve rising to a maximum at the top", "The speed is smallest (zero) at the top."]],
    answer: "A", explanation: "Ignoring air resistance, the ball decelerates uniformly at g to zero speed at the top, then accelerates uniformly at g on the way down: a V shape.",
    hints: ["What is the speed at the highest point?"] });

  q.card("CONCEPT", "What is the gradient of a distance-time graph?", "The speed.");
  q.card("CONCEPT", "What is the gradient of a speed-time graph?", "The acceleration.");
  q.card("CONCEPT", "What does the area under a speed-time graph give?", "The distance travelled.");
  q.card("CONCEPT", "Flat line on a distance-time graph?", "The object is at rest.");
  q.card("CONCEPT", "Flat line (above zero) on a speed-time graph?", "Constant speed.");
  q.card("CONCEPT", "Curve getting steeper on a distance-time graph?", "The object is speeding up (accelerating).");
  q.card("CONCEPT", "Straight line sloping down on a speed-time graph?", "A constant deceleration.");
  q.card("CONCEPT", "How do you find the speed at one instant on a curved distance-time graph?", "Draw a tangent at that point and find its gradient.");
  q.card("FORMULA", "Area of a triangle under a speed-time graph?", "½ × base (time) × height (speed).");
  q.card("CONCEPT", "How should graph axes be labelled?", "Quantity and unit, e.g. 'time / s' and 'speed / m/s'.");
});

// =====================================================================================================================
concept("phys.motion.free-fall", {
  file: "motion/free-fall",
  keyPrefix: "motion.fall",
  objectives: { cambridge: ["1.2.8", "1.2.13"], zimsec: ["2.3.1", "2.3.2"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "What is the approximate acceleration of free fall near the Earth's surface?",
    options: [["0.98 m/s²", "Ten times too small."], ["9.8 m/s²", "Correct."], ["98 m/s²", "Ten times too big."], ["9.8 m/s", "Wrong unit: that is a speed."]],
    answer: "B", explanation: "g is about 9.8 m/s² near the Earth's surface." });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "A hammer and a feather are dropped together inside a tube from which all the air has been removed. What happens?",
    options: [["The hammer lands first.", "In a vacuum there is no air resistance to slow the feather."], ["The feather lands first.", "Nothing pushes the feather down faster."], ["They land together.", "Correct: both accelerate at g."], ["The feather floats.", "Without air the feather falls like everything else."]],
    answer: "C", explanation: "With no air resistance every object falls with the same acceleration g, whatever its mass." });

  q.num({ d: 2, skill: "APPLICATION", daily: true,
    stem: t`A coin is dropped from rest. Ignoring air resistance, how fast is it moving after $3.0\ \text{s}$? Take $g = 9.8\ \text{m/s}^2$.`,
    value: 29.4, answer: "29", unit: "m/s", wrong: [3.27, 88.2, 9.8],
    explanation: t`$v = u + gt = 0 + 9.8 \times 3.0 = 29.4 \approx 29\ \text{m/s}$.` });

  q.num({ d: 3, skill: "APPLICATION",
    stem: t`An object falls from rest without air resistance. How long does it take to reach a speed of $49\ \text{m/s}$? Take $g = 9.8\ \text{m/s}^2$.`,
    value: 5, answer: "5.0", unit: "s", wrong: [480, 0.2, 4.9],
    explanation: t`$t = \dfrac{v}{g} = \dfrac{49}{9.8} = 5.0\ \text{s}$.`,
    hints: ["The speed increases by 9.8 m/s every second."] });

  q.tf({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "When a falling object reaches terminal velocity, the resultant force on it is zero.",
    answer: true, explanation: "At terminal velocity the air resistance equals the weight, so the forces balance and the speed stays constant." });

  q.mcq({ d: 3, skill: "UNDERSTANDING",
    stem: "Why does the acceleration of a skydiver decrease as she falls before opening her parachute?",
    options: [["Her weight decreases as she falls.", "Her weight stays the same."], ["Air resistance increases with speed, so the resultant force decreases.", "Correct."], ["Gravity is weaker closer to the ground.", "The change over a few kilometres is tiny."], ["Her mass increases.", "Mass does not change."]],
    answer: "B", explanation: "As her speed rises, air resistance rises, so weight − air resistance (the resultant force) gets smaller, and so does her acceleration.",
    hints: ["Think about how the resultant force changes."] });

  q.mcq({ d: 3, skill: "UNDERSTANDING",
    stem: "A skydiver at terminal velocity opens her parachute. What happens immediately afterwards?",
    options: [["She moves upwards.", "She still moves down; she slows down."], ["She slows down because air resistance is now greater than her weight.", "Correct."], ["She speeds up.", "The extra air resistance acts upwards."], ["Her speed stays the same.", "The forces are no longer balanced."]],
    answer: "B", explanation: "The large parachute suddenly increases air resistance above her weight; the resultant force is upwards, so she decelerates until a new, lower terminal velocity is reached.",
    hints: ["Compare the air resistance with the weight just after the parachute opens."] });

  q.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: t`A skydiver of mass $80\ \text{kg}$ falls at a constant (terminal) velocity before opening her parachute. Take $g = 9.8\ \text{N/kg}$.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "What is the air resistance on her at terminal velocity?", value: 784, unit: "N", wrong: [80, 8.16], explanation: t`At terminal velocity air resistance $=$ weight $= mg = 80 \times 9.8 = 784\ \text{N}$.` }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain why her speed is constant.", points: ["The air resistance (upwards) equals her weight (downwards), so the resultant force is zero", "With no resultant force there is no acceleration, so the velocity stays constant"] }),
      P.mcq({ label: "(c)", stem: "Just after the parachute opens, which way does the resultant force on her act?", options: [["Upwards", "Correct: air resistance is now larger than the weight."], ["Downwards", "The weight is now smaller than the air resistance."], ["There is no resultant force", "The forces are unbalanced just after opening."], ["Horizontally", "Both forces are vertical."]], answer: "A", explanation: "Air resistance exceeds weight, so the resultant force is upwards and she decelerates." }),
    ],
    explanation: "Terminal velocity: air resistance = weight = 784 N, resultant force zero. Opening the parachute makes air resistance larger than the weight: resultant force upwards, so she slows.",
    hints: ["At terminal velocity the forces are balanced.", "Weight = mg."] });

  q.match({ d: 3, skill: "UNDERSTANDING",
    stem: "Match each stage of a skydive with the correct description of the forces.",
    pairs: [["Just after jumping", "Air resistance very small; acceleration about 9.8 m/s²"], ["Falling faster and faster", "Air resistance increasing; acceleration decreasing"], ["Terminal velocity", "Air resistance equals weight"], ["Just after the parachute opens", "Air resistance greater than weight"]],
    explanation: "The resultant force (weight − air resistance) controls the acceleration at each stage.",
    hints: ["Air resistance grows as speed grows."] });

  q.num({ d: 3, skill: "APPLICATION", applies: ["zimsec"],
    stem: t`To measure $g$, a learner drops a steel ball from rest through a height of $1.25\ \text{m}$. An electronic timer records a fall time of $0.505\ \text{s}$. Use $h = \tfrac{1}{2}gt^2$ to calculate $g$.`,
    value: r(2 * 1.25 / 0.505 ** 2), unit: "m/s²", wrong: [4.95, 2.48, 4.9],
    explanation: t`$g = \dfrac{2h}{t^2} = \dfrac{2.50}{0.505^2} = \dfrac{2.50}{0.255} = 9.80\ \text{m/s}^2$.`,
    hints: ["Rearrange h = ½gt² to g = 2h/t²."] });

  q.short({ d: 2, skill: "RECALL", daily: true,
    stem: "What name is given to the constant maximum velocity of an object falling through air, when air resistance balances its weight?",
    accepted: ["terminal velocity", "terminal speed"], wrong: ["free fall", "maximum acceleration"],
    explanation: "This is the terminal velocity." });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "A flat sheet of paper and an identical sheet crumpled into a tight ball are dropped together in air. What happens?",
    options: [["The flat sheet lands first because it is wider.", "Its larger area gives more air resistance, so it falls more slowly."], ["The crumpled ball lands first because it has less air resistance.", "Correct."], ["They land together because they have the same mass.", "This would be true only in a vacuum."], ["The crumpled ball lands first because it is heavier.", "Both have the same mass."]],
    answer: "B", explanation: "Same mass and weight, but the flat sheet meets much more air resistance, so it has a much smaller terminal velocity." });

  q.tf({ d: 2, skill: "UNDERSTANDING",
    stem: "Without air resistance, a heavy stone falls with a greater acceleration than a light stone.",
    answer: false, explanation: "Without air resistance all objects fall with the same acceleration, g." });

  q.mcq({ d: 3, skill: "ANALYSIS",
    stem: "Which describes the speed-time graph of a skydiver from jumping until she reaches terminal velocity (parachute still closed)?",
    options: [["A straight line sloping upwards", "That would be constant acceleration all the way."], ["A curve that starts steep and levels off to a horizontal line", "Correct."], ["A horizontal line", "She starts from rest."], ["A curve that gets steeper and steeper", "Her acceleration decreases, not increases."]],
    answer: "B", explanation: "The gradient (acceleration) starts at about 9.8 m/s² and decreases to zero as air resistance grows, so the curve levels off at terminal velocity.",
    hints: ["The gradient of a speed-time graph is the acceleration."] });

  q.num({ d: 3, skill: "APPLICATION",
    stem: t`A ball is dropped from rest. Its speed-time graph is a straight line through the origin with gradient $9.8\ \text{m/s}^2$. Using the area under the graph, how far does it fall in the first $2.0\ \text{s}$?`,
    value: 19.6, answer: "19.6", unit: "m", tol: 0.1, wrong: [39.2, 9.8, 4.9],
    explanation: t`After $2.0\ \text{s}$ the speed is $19.6\ \text{m/s}$; the area of the triangle $= \tfrac{1}{2} \times 2.0 \times 19.6 = 19.6\ \text{m}$.`,
    hints: ["Find the speed at 2.0 s first.", "The area is a triangle."] });

  q.card("FACT", "What is the acceleration of free fall near the Earth?", "About 9.8 m/s² (g); some questions use 10 m/s².");
  q.card("DEFINITION", "What is **free fall**?", "Falling under gravity alone, with no air resistance.");
  q.card("CONCEPT", "Do heavy objects fall faster in a vacuum?", "No: without air resistance all objects fall with the same acceleration g.");
  q.card("DEFINITION", "What is **terminal velocity**?", "The constant maximum velocity reached when air resistance equals the weight of a falling object.");
  q.card("CONCEPT", "Why does a falling object's acceleration decrease?", "Air resistance increases with speed, so the resultant force (weight − air resistance) decreases.");
  q.card("CONCEPT", "What is the resultant force at terminal velocity?", "Zero: air resistance balances the weight.");
  q.card("CONCEPT", "What happens when a skydiver opens the parachute?", "Air resistance becomes greater than the weight, so she decelerates to a lower terminal velocity.");
  q.card("CONCEPT", "Shape of the speed-time graph of a falling skydiver?", "A curve starting with gradient ≈ 9.8 m/s² that levels off at terminal velocity.");
  q.card("CONCEPT", "How can g be measured in the laboratory?", "Time a heavy ball falling a known height with light gates; use g = 2h/t² (ZIMSEC).");
});
