// W1a: dynamics.drag-terminal-velocity — friction, drag, terminal velocity, parachutes, top speed (qualitative + simple model).
import { concept, P, t as raw, chk, sfStr, dpStr, table, DATA } from "../lib.mjs";

// String.raw keeps "\n" literally: turn \n (not followed by a lower-case letter, so \nu and \neq survive) into a newline.
const t = (s, ...v) => raw(s, ...v).replace(/\\n(?![a-z])/g, "\n");

const K = "aphys.dynamics.drag-terminal-velocity";
const g = DATA.g;

concept(K, { file: "dynamics/drag-terminal-velocity", keyPrefix: "dynamics.drag-terminal-velocity" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which direction does the drag force on an object moving through air act?",
    options: [
      ["opposite to the object's velocity relative to the air", "Correct: drag always opposes the motion through the fluid."],
      ["vertically upwards, whatever the direction of motion", "Only for an object falling vertically does drag point straight up."],
      ["in the same direction as the object's velocity", "Drag resists motion; it never pushes an object along its path through still air."],
      ["vertically downwards, adding to the weight", "Drag is not a gravitational force; its direction depends on the motion."],
    ],
    answer: "A",
    explanation: "Drag (air resistance) acts opposite to the velocity of the object relative to the fluid, so it always slows the motion through the fluid.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A skydiver steps out of a hovering helicopter. What is her acceleration at the instant she leaves it?",
    options: [
      [t`$9.81\ \text{m s}^{-2}$ downwards`, "Correct: at zero speed there is no drag, so only her weight acts."],
      ["zero", "Her velocity is zero, but the resultant force (her weight) is not."],
      [t`less than $9.81\ \text{m s}^{-2}$ because of air resistance`, "Air resistance depends on speed and is zero at the start."],
      ["equal to her terminal velocity divided by the time to reach it", "That would be an average; at the start the acceleration is exactly g."],
    ],
    answer: "A",
    explanation: "At the start her speed is zero, so the drag is zero; the resultant force is her weight and the acceleration is g.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which statement about an object falling at terminal velocity is correct?",
    options: [
      ["The resultant force on it is zero, so its velocity is constant.", "Correct: drag balances weight."],
      ["No forces act on it, so its velocity is constant.", "Two forces act (weight and drag); they balance."],
      ["The drag is greater than its weight, so it does not speed up.", "If drag exceeded weight the object would slow down."],
      ["Its weight has decreased to zero, so it stops accelerating.", "The weight mg does not change during the fall."],
    ],
    answer: "A",
    explanation: "At terminal velocity drag = weight (ignoring upthrust), so the resultant force and the acceleration are zero: the velocity is constant.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which description fits the velocity-time graph of an object dropped from rest that reaches terminal velocity?",
    options: [
      ["A curve starting with gradient g whose gradient decreases until it becomes horizontal.", "Correct: the acceleration falls from g to zero as drag rises."],
      ["A straight line of gradient g that stops suddenly at the terminal velocity.", "The acceleration decreases gradually, not suddenly."],
      ["A curve whose gradient increases until it becomes vertical.", "The acceleration decreases, so the gradient decreases."],
      ["A horizontal line at the terminal velocity from the moment of release.", "The object starts from rest and needs time to speed up."],
    ],
    answer: "A",
    explanation: "The gradient of a v-t graph is the acceleration: g at the start, decreasing as drag grows, zero at terminal velocity (horizontal line).",
    hints: ["What is the acceleration at the start, and at the end?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "A skydiver falling at terminal velocity opens her parachute. Immediately afterwards, which statement is correct?",
    options: [
      ["She is still moving downwards but slowing down.", "Correct: drag now exceeds weight, so the acceleration is upwards while the velocity is still downwards."],
      ["She moves upwards for a moment before falling again.", "The resultant force is upwards, but her velocity remains downwards; she only slows."],
      ["She immediately falls at a new, lower constant speed.", "She needs time to slow down; drag decreases as she slows until it equals her weight."],
      ["She continues at the same speed because her weight is unchanged.", "The drag has increased greatly, so the forces are no longer balanced."],
    ],
    answer: "A",
    explanation: "Opening the parachute increases the area, so drag at that speed exceeds the weight. The resultant force is upwards and she decelerates, still moving down, until a new lower terminal velocity is reached.",
    hints: ["Distinguish the direction of the velocity from that of the acceleration."],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Two balls of exactly the same size and shape, one of steel and one of wood, are dropped from a high tower. Which reaches the higher terminal velocity, and why?",
    options: [
      ["The steel ball, because its larger weight is balanced only at a higher speed, where drag is larger.", "Correct: terminal velocity is where drag (same function of speed for both) equals weight."],
      ["The wooden ball, because it has less inertia and so it speeds up more easily as it falls.", "Its smaller weight is balanced by drag at a lower speed."],
      ["Neither: objects of identical size and shape always have equal terminal velocities.", "Same drag at the same speed, but different weights, so different terminal speeds."],
      ["The steel ball, because air resistance on steel is smaller than on wood.", "For identical size and shape the drag at a given speed is the same."],
    ],
    answer: "A",
    explanation: "Drag depends on size, shape and speed, which are the same for both balls. The steel ball's weight is larger, so drag must grow larger to balance it: its terminal velocity is higher.",
    hints: ["At terminal velocity, drag = weight. Which weight is bigger?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "For a falling object the drag force is proportional to the square of its speed. What is its acceleration when its speed is half of its terminal velocity?",
    options: [
      [t`$\tfrac{3}{4}g$`, "Correct: drag = ¼ of the weight, so the resultant is ¾ mg."],
      [t`$\tfrac{1}{2}g$`, "This assumes drag proportional to v (half the weight at half speed)."],
      [t`$\tfrac{1}{4}g$`, "This is the drag as a fraction of the weight, not the acceleration."],
      ["zero", "Zero acceleration occurs only at the terminal velocity."],
    ],
    answer: "A",
    explanation: t`At $v_t$, $kv_t^2 = mg$. At $v_t/2$, drag $= k(v_t/2)^2 = \tfrac{1}{4}mg$. Resultant $= mg - \tfrac{1}{4}mg = \tfrac{3}{4}mg$, so $a = \tfrac{3}{4}g$.`,
    hints: ["How does the drag at half speed compare with the drag at terminal velocity?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "The air resistance on a car is proportional to the square of its speed and is the only significant resistive force. To double the car's top speed, by what factor must the maximum driving force increase?",
    options: [
      ["4", "Correct: at top speed driving force = drag ∝ v², so doubling v needs four times the force."],
      ["2", "This assumes drag is proportional to v."],
      ["8", "8 is the factor for the power (force × velocity), not the force."],
      ["√2", "The force must increase more than the speed, not less."],
    ],
    answer: "A",
    explanation: t`At top speed $F = kv^2$. Doubling $v$ multiplies $F$ by 4; the power $Fv$ would rise by a factor of 8.`,
    hints: ["At top speed, driving force = drag."],
  });

  // Numerical and calculation items
  b.num({
    d: 2, skill: "APPLICATION",
    stem: t`A $70\ \text{kg}$ skydiver falls at terminal velocity. Calculate the drag force on her, in N. (Ignore upthrust.)`,
    value: 70 * g, unit: "N", wrong: [70, 0],
    explanation: t`At terminal velocity drag $=$ weight $= 70 \times 9.81 = ${sfStr(70 * g, 3)}\ \text{N}$.`,
  });
  {
    const a = g - 300 / 75;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true, daily: false,
      stem: t`A $75\ \text{kg}$ skydiver is falling, and at one instant the drag force on him is $300\ \text{N}$. Calculate his acceleration at that instant, in $\text{m s}^{-2}$.`,
      value: a, unit: "m/s²", wrong: [300 / 75, g + 300 / 75],
      explanation: t`1. Resultant force $= mg - D = 75 \times 9.81 - 300 = ${sfStr(75 * g - 300, 3)}\ \text{N}$ downwards.\n2. $a = \dfrac{${sfStr(75 * g - 300, 3)}}{75} = ${sfStr(a, 3)}\ \text{m s}^{-2}$.\n\n$300/75 = 4.0$ is the drag per kilogram, not the acceleration.`,
      hints: ["Find the resultant force first."],
    });
  }
  {
    const m = 0.002;
    const k = 1.6e-5;
    const vt = Math.sqrt((m * g) / k);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A hailstone of mass $2.0\ \text{g}$ falls through air. The drag force is $D = kv^2$ with $k = 1.6 \times 10^{-5}\ \text{kg m}^{-1}$. Calculate its terminal velocity, in $\text{m s}^{-1}$.`,
      value: vt, unit: "m/s", wrong: [Math.sqrt((2 * g) / k), (m * g) / k],
      explanation: t`1. At terminal velocity $kv_t^2 = mg$.\n2. $v_t = \sqrt{\dfrac{2.0 \times 10^{-3} \times 9.81}{1.6 \times 10^{-5}}} = ${sfStr(vt, 3)}\ \text{m s}^{-1}$.\n\nForgetting to convert grams to kilograms gives a value about 32 times too large; forgetting the square root gives over 1000.`,
      hints: ["Set drag equal to weight.", "Convert g to kg."],
    });
  }
  {
    const F = 3000;
    const k = 0.95;
    const v = Math.sqrt(F / k);
    const Pw = F * v;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A car's maximum driving force on a level road is $3000\ \text{N}$, and the total resistive force on it is $0.95v^2$ newtons, where $v$ is its speed in $\text{m s}^{-1}$. Calculate the power delivered to the wheels at top speed, in kW.`,
      value: Pw / 1000, unit: "kW", wrong: [v, (F * v) / 1000 / 2],
      explanation: t`1. At top speed driving force $=$ resistive force: $0.95v^2 = 3000$, so $v = ${sfStr(v, 3)}\ \text{m s}^{-1}$.\n2. $P = Fv = 3000 \times ${sfStr(v, 3)} = ${sfStr(Pw, 3)}\ \text{W} = ${sfStr(Pw / 1000, 3)}\ \text{kW}$.`,
      hints: ["At top speed, the forces balance.", "Power = force × velocity."],
    });
  }
  {
    const W = 0.0048;
    const bcoef = 0.012;
    const vt = W / bcoef;
    chk(vt, 0.4, 1e-12);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A small steel ball falls through thick oil, where the drag is proportional to speed: $D = bv$ with $b = 0.012\ \text{N s m}^{-1}$. The ball's weight minus the upthrust on it is $4.8 \times 10^{-3}\ \text{N}$. Calculate the terminal velocity, in $\text{m s}^{-1}$.`,
      value: vt, unit: "m/s", wrong: [Math.sqrt(W / bcoef)],
      explanation: t`At terminal velocity $bv_t = 4.8 \times 10^{-3}$, so $v_t = \dfrac{4.8 \times 10^{-3}}{0.012} = 0.40\ \text{m s}^{-1}$. (No square root: here drag is proportional to $v$, not $v^2$.)`,
      hints: ["Drag balances weight minus upthrust at terminal velocity."],
    });
  }

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "When a falling object reaches terminal velocity, no forces act on it.",
    answer: false,
    explanation: "False. Its weight and the drag still act; they are equal and opposite, so the resultant force is zero.",
  });
  b.tf({
    d: 4, skill: "ANALYSIS",
    stem: "Two parachutists use identical parachutes. The heavier parachutist will have the larger terminal velocity.",
    answer: true,
    explanation: "True. The same parachute gives the same drag at a given speed, so a larger weight is balanced only at a higher speed.",
    hints: ["At terminal velocity, drag = weight."],
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each stage of a skydive with what is happening to the forces.",
    pairs: [
      ["just after leaving the aircraft", "weight only; acceleration g"],
      ["speeding up during free fall", "drag increasing; acceleration decreasing"],
      ["falling at terminal velocity", "drag equals weight; zero acceleration"],
      ["just after the parachute opens", "drag greater than weight; slowing down"],
    ],
    explanation: "Drag grows with speed, so the acceleration falls from g to zero; the parachute's large area makes drag exceed weight until a lower terminal velocity is reached.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the explanation.",
    template: "As a falling ball speeds up, the drag on it {{blank:a}}, so its acceleration {{blank:b}}. At terminal velocity the resultant force is {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["increases"], choices: ["increases", "decreases", "stays the same"] },
      { id: "b", accepted: ["decreases"], choices: ["increases", "decreases", "stays the same"] },
      { id: "c", accepted: ["zero"], choices: ["zero", "equal to the weight", "upwards"] },
    ],
    explanation: "Drag rises with speed, the resultant force mg − D falls, so the acceleration falls to zero at terminal velocity.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "A ball bearing is released from rest in a tall tube of oil. Explain why it reaches a terminal velocity.",
    points: [
      "At first (zero speed) there is no drag; the resultant force is weight minus upthrust, so it accelerates",
      "As its speed increases, the drag (viscous force) increases",
      "So the resultant force, and hence the acceleration, decreases",
      "When drag + upthrust = weight, the resultant force is zero, the acceleration is zero and the velocity is constant (terminal velocity)",
    ],
    modelAnswer: "On release the ball's speed is zero, so there is no drag: the resultant force (weight minus upthrust) makes it accelerate. As it speeds up, the viscous drag increases, so the resultant downward force and the acceleration decrease. Eventually the drag plus the upthrust equals the weight; the resultant force is then zero, so the acceleration is zero and the ball moves at a constant terminal velocity.",
    explanation: "A step-by-step chain: speed up → more drag → less resultant → less acceleration → balance.",
    hints: ["Start from the moment of release, when the speed is zero."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe and explain the motion of a skydiver from the moment her parachute opens until she lands, assuming she was at terminal velocity before it opened.",
    points: [
      "Opening the parachute greatly increases the area, so the drag becomes larger than her weight: resultant force upwards",
      "She decelerates (still moving downwards); as her speed falls, the drag decreases, so the deceleration decreases",
      "When drag again equals weight she falls at a new, much lower terminal velocity until she lands",
    ],
    modelAnswer: "When the parachute opens, its large area makes the drag much bigger than her weight, so there is an upward resultant force and she slows down while still falling. As her speed decreases the drag decreases, so the deceleration gets smaller. When the drag has fallen to equal her weight, she falls at a new, lower terminal velocity, which she keeps until she lands.",
    explanation: "Same reasoning in reverse: too much drag → slow down → drag falls → balance at a lower speed.",
    hints: ["Compare drag and weight just after opening."],
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Give one situation in which friction is useful and one in which it is a nuisance, explaining each briefly.",
    points: [
      "Useful: e.g. between tyres and road (grip for driving, steering and braking) or shoes and ground (walking), because it provides the force needed",
      "Nuisance: e.g. in machine bearings or engines, because it transfers kinetic energy to internal energy (heating, wear) and wastes energy",
    ],
    modelAnswer: "Useful: friction between a kombi's tyres and the road provides the forward force for driving and the backward force for braking. Nuisance: friction in the moving parts of a maize mill transfers energy to internal energy, wasting energy, heating and wearing the parts, so they are lubricated.",
    explanation: "Friction provides grip but dissipates energy.",
  });

  // Practice structured 1: a skydive with a v² drag model.
  {
    const m = 65;
    const k = 0.2;
    const W = m * g;
    const a20 = g - (k * 400) / m;
    const vt = Math.sqrt(W / k);
    const k2 = 30;
    const vt2 = Math.sqrt(W / k2);
    console.log("drag skydive", W, a20, vt, vt2);
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true, examStyle: true,
      stem: t`Chipo, of mass $65\ \text{kg}$ including her equipment, makes a skydive. Before her parachute opens, the drag on her is modelled as $D = 0.20v^2$ (in N, with $v$ in $\text{m s}^{-1}$). With the parachute open the model becomes $D = 30v^2$. Take $g = 9.81\ \text{m s}^{-2}$ and ignore upthrust.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Calculate her weight, in N.", value: W, unit: "N", explanation: t`$65 \times 9.81 = ${sfStr(W, 3)}\ \text{N}$.` }),
        P.num({ label: "(b)", marks: 2, stem: t`Calculate her acceleration when she is falling at $20\ \text{m s}^{-1}$, in $\text{m s}^{-2}$.`, value: a20, unit: "m/s²", wrong: [(0.2 * 400) / 65], explanation: t`$D = 0.20 \times 20^2 = 80\ \text{N}$; $a = \dfrac{${sfStr(W, 3)} - 80}{65} = ${sfStr(a20, 3)}\ \text{m s}^{-2}$.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Calculate her terminal velocity before the parachute opens, in $\text{m s}^{-1}$.`, value: vt, unit: "m/s", wrong: [W / k], explanation: t`$0.20v_t^2 = ${sfStr(W, 3)}$, so $v_t = \sqrt{${sfStr(W, 3)}/0.20} = ${sfStr(vt, 3)}\ \text{m s}^{-1}$.` }),
        P.mcq({ label: "(d)", stem: "Which describes her acceleration while she speeds up towards this terminal velocity?", options: [["It is downwards and decreasing from g to zero.", "Correct: drag grows with speed."], ["It is constant at g until she reaches terminal velocity.", "Drag acts from the moment she moves, so the acceleration falls gradually."], ["It is downwards and increasing.", "The resultant force decreases as drag increases."], ["It is upwards and increasing.", "While she speeds up, the acceleration is downwards."]], answer: "A", explanation: "The resultant force mg − kv² decreases as v rises, so the acceleration falls from g towards zero." }),
        P.num({ label: "(e)", marks: 2, stem: t`Calculate her terminal velocity with the parachute open, in $\text{m s}^{-1}$.`, value: vt2, unit: "m/s", wrong: [W / k2], explanation: t`$30v^2 = ${sfStr(W, 3)}$, so $v = \sqrt{${sfStr(W, 3)}/30} = ${sfStr(vt2, 3)}\ \text{m s}^{-1}$.` }),
        P.manual({ label: "(f)", marks: 2, stem: "Explain why the model predicts a very large force on Chipo if the parachute opened instantly at her first terminal velocity, and why real parachutes are designed to open gradually.", points: [t`At $${sfStr(vt, 3)}\ \text{m s}^{-1}$ the new drag $30v^2$ would be tens of thousands of newtons, many times her weight: a huge deceleration (upward resultant force)`, "Opening gradually increases the area over a few seconds, so the drag (and the deceleration) stays smaller and safer"], modelAnswer: t`At $${sfStr(vt, 3)}\ \text{m s}^{-1}$, $30v^2$ would be about $${Math.round((30 * vt * vt) / 1000)}\ \text{kN}$, roughly ${Math.round((30 * vt * vt) / W)} times her weight, giving a dangerously large upward resultant force and deceleration. Parachutes open over a few seconds, so the area and the drag increase while she slows, keeping the force much smaller.` }),
        P.manual({ label: "(g)", marks: 2, stem: "Describe the velocity-time graph for the whole jump, from leaving the aircraft until just before landing.", points: [t`From zero, a curve with initial gradient $g$ flattening to a horizontal line at about $${sfStr(vt, 2)}\ \text{m s}^{-1}$`, t`When the parachute opens, a steep fall in velocity that curves into a new horizontal line at about $${sfStr(vt2, 2)}\ \text{m s}^{-1}$ (velocity stays positive/downwards throughout)`], modelAnswer: t`The graph rises from zero with gradient $g$, curves over and levels off at about $${sfStr(vt, 2)}\ \text{m s}^{-1}$. When the parachute opens it drops steeply, then curves to level off at a much lower terminal velocity of about $${sfStr(vt2, 2)}\ \text{m s}^{-1}$, which continues until landing. The velocity is downwards (positive) throughout.` }),
      ],
      explanation: t`Terminal velocity when $kv^2 = mg$: $${sfStr(vt, 3)}\ \text{m s}^{-1}$ in free fall, $${sfStr(vt2, 3)}\ \text{m s}^{-1}$ with the parachute; at $20\ \text{m s}^{-1}$ the acceleration is $${sfStr(a20, 3)}\ \text{m s}^{-2}$.`,
      hints: ["Resultant force = weight − drag.", "At terminal velocity drag = weight."],
    });
  }

  // Practice structured 2: ball bearing falling through oil.
  {
    const marks = ["0–10", "10–20", "20–30", "30–40", "40–50", "50–60"];
    const times = [0.62, 0.43, 0.38, 0.37, 0.37, 0.38];
    const vt = 0.1 / mean3([0.37, 0.37, 0.38]);
    function mean3(xs) {
      return (xs[0] + xs[1] + xs[2]) / 3;
    }
    console.log("oil vt", vt);
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true, examStyle: true,
      stem: t`Farai drops a steel ball bearing into a tall glass tube of glycerol. Rubber bands are placed around the tube every $10.0\ \text{cm}$, and he records the time the ball takes to travel between successive bands with a stop-watch.\n\n${table(["Interval / cm", ...marks], [[t`$t\,/\,\text{s}$`, ...times.map((x) => dpStr(x, 2))]])}`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: t`Calculate the average speed in the first interval, in $\text{m s}^{-1}$.`, value: 0.1 / 0.62, unit: "m/s", wrong: [10 / 0.62], explanation: t`$v = \dfrac{0.100\ \text{m}}{0.62\ \text{s}} = ${sfStr(0.1 / 0.62, 2)}\ \text{m s}^{-1}$ (convert cm to m).` }),
        P.mcq({ label: "(b)", stem: "From which band onwards is the ball moving at (very nearly) terminal velocity?", options: [["from the 20 cm band", "Correct: the times are then constant within the timing uncertainty (0.37–0.38 s)."], ["from the 10 cm band", "The time for 10–20 cm (0.43 s) is still noticeably longer: the ball is still speeding up."], ["from the release point", "The ball starts from rest, so it needs time to speed up."], ["only after the 50 cm band", "The times are already constant from 20 cm."]], answer: "A", explanation: "Equal times for equal distances mean constant velocity: from 20 cm the times are 0.38, 0.37, 0.37, 0.38 s." }),
        P.num({ label: "(c)", marks: 1, stem: t`Using the mean time for the 20–50 cm intervals, calculate the terminal velocity, in $\text{m s}^{-1}$.`, value: vt, unit: "m/s", explanation: t`Mean $= (0.38 + 0.37 + 0.37)/3 = 0.373\ \text{s}$; $v_t = 0.100/0.373 = ${sfStr(vt, 2)}\ \text{m s}^{-1}$.` }),
        P.manual({ label: "(d)", marks: 2, stem: "Suggest the main source of uncertainty in Farai's times and an improvement.", points: ["Times of about 0.4 s are comparable with reaction time, and judging when the ball passes a band involves parallax (eye not level with the band)", "Improvement: time over several intervals (e.g. 20 cm to 60 cm in one timing) or film the fall with a scale and timer and analyse frame by frame (or use light gates)"], modelAnswer: "Each time is only about 0.4 s, close to human reaction time, and judging the moment the ball passes a band depends on viewing angle (parallax). Timing the ball over 40 cm in one measurement, with the eye level with each band, or filming it next to a scale and analysing the video frame by frame, would reduce the uncertainty." }),
        P.manual({ label: "(e)", marks: 2, stem: "State one safety precaution for this experiment and explain why it is needed.", points: ["Precaution: clamp the tall tube securely in a stand and stand it in a tray (or remove the ball with a magnet rather than tipping the tube; wipe up spills at once)", "Reason: a tall glass tube can topple and break, and spilled glycerol makes the floor or bench slippery"], modelAnswer: "Clamp the tube firmly in a stand inside a tray. A tall, top-heavy glass tube can be knocked over and break, and any spilled glycerol, which makes the floor slippery, is then contained." }),
      ],
      explanation: t`The ball speeds up at first (0.62 s, 0.43 s for 10 cm) and reaches terminal velocity of about $${sfStr(vt, 2)}\ \text{m s}^{-1}$ from the 20 cm band.`,
      hints: ["Convert 10.0 cm to metres.", "Constant times for equal distances mean constant speed."],
    });
  }

  // Flashcards
  b.card("DEFINITION", "Drag", "A resistive force on an object moving through a fluid, acting opposite to its velocity relative to the fluid; increases with speed.");
  b.card("DEFINITION", "Terminal velocity", "The constant velocity reached when the resistive forces (and upthrust) balance the driving force or weight, so the resultant force is zero.");
  b.card("CONCEPT", "Acceleration of a falling object with air resistance", "Starts at g and decreases to zero as drag increases with speed.");
  b.card("CONCEPT", "v-t graph for reaching terminal velocity", "A curve starting with gradient g whose gradient falls until the graph is horizontal.");
  b.card("CONCEPT", "What happens when a parachute opens?", "Drag exceeds weight, so the parachutist decelerates (still moving down) to a lower terminal velocity.");
  b.card("FORMULA", "Terminal velocity with drag kv²", t`$v_t = \sqrt{\dfrac{mg}{k}}$`);
  b.card("CONCEPT", "Top speed of a vehicle", "Reached when the maximum driving force equals the total resistive force.");
  b.card("FACT", "Dependence of drag", "Drag increases with speed (roughly ∝ v at low speed in viscous fluids, ∝ v² for fast objects in air), with area and with fluid density; it depends on shape.");
  b.card("CONCEPT", "Energy and resistive forces", "Friction and drag transfer kinetic energy to internal energy (heating).");
});
