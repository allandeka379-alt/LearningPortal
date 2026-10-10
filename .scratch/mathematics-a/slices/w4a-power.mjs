// W4a: amaths.energy.power
import { concept, P, t, chk, ZM } from "../lib.mjs";
import { f3, N } from "../tables/w4a-kit.mjs";

const { sqrt } = Math;

concept("amaths.energy.power", { file: "energy/power", keyPrefix: "energy.power" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "Which of these is equal to one watt?",
    options: [
      [t`One joule per second`, "Correct: power is the rate of doing work."],
      ["One newton per metre", "N/m is a unit of stiffness (as in a spring constant)."],
      ["One joule per metre", "J/m is equivalent to a newton, a unit of force."],
      ["One newton second", "N s is the unit of momentum and impulse."],
    ],
    answer: "A",
    explanation: t`$1$ W $= 1$ J s$^{-1}$; also $P = Fv$ gives N × m s$^{-1}$ = J s$^{-1}$.`,
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`A water pump does $18\,000$ J of work in one minute. Find its average power.`,
    value: 300, unit: "W", wrong: [18000],
    explanation: t`Average power $= \frac{18\,000}{60} = 300$ W. (Time must be in seconds.)`,
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`The driving force of a car's engine is $1500$ N when the car is travelling at $20$ m s$^{-1}$. Find the power of the engine in kilowatts.`,
    value: 30, unit: "kW", wrong: [30000, 75],
    explanation: t`$P = Fv = 1500 \times 20 = 30\,000$ W $= 30$ kW.`,
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`The greatest power of a car's engine is $45$ kW. The resistance to motion on a level road is a constant $1800$ N. Find the greatest speed of the car on this road.`,
    value: 25, unit: "m/s", wrong: [0.025, 40],
    explanation: t`At the greatest speed the acceleration is zero, so $\frac{45\,000}{v} = 1800$ and $v = 25$ m s$^{-1}$. (Using $45$ instead of $45\,000$ gives $0.025$.)`,
  });

  const a5 = (30000 / 15 - 800) / 1200;
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`A car of mass $1200$ kg travels along a level road against a constant resistance of $800$ N. Its engine works at $30$ kW. Find the acceleration of the car at the instant when its speed is $15$ m s$^{-1}$.`,
    value: a5, unit: "m/s²", wrong: [30000 / 15 / 1200, (30000 / 15 + 800) / 1200],
    explanation: t`Driving force $= \frac{30\,000}{15} = 2000$ N. N2L: $2000 - 800 = 1200a$, so $a = ${a5}$ m s$^{-2}$.`,
    hints: ["Find the driving force from P = Fv first."],
  });

  const v6 = 20000 / (500 + 900 * 10 / 15);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A car of mass $900$ kg climbs a hill inclined at $\alpha$ to the horizontal, where $\sin\alpha = \frac{1}{15}$. Its engine works at $20$ kW and the resistance to motion is a constant $500$ N. Taking $g = 10$ m s$^{-2}$, find the greatest speed of the car up the hill, correct to 3 significant figures.`,
    value: v6, unit: "m/s", wrong: [40, 20000 / 600],
    explanation: t`Weight component down the hill: $900 \times 10 \times \frac{1}{15} = 600$ N. At the greatest speed: $\frac{20\,000}{v} = 500 + 600$, so $v = ${f3(v6)}$ m s$^{-1}$. (Forgetting the hill gives $40$.)`,
    hints: ["Going uphill, mg sin α acts like an extra resistance."],
  });

  const P7 = 250 * 9.8 * 0.6;
  b.num({
    d: 3, skill: "APPLICATION", calculator: false, applies: ZM,
    stem: t`An electric hoist on a building site lifts a load of mass $250$ kg vertically at a steady $0.6$ m s$^{-1}$. Taking $g = 9.8$ m s$^{-2}$, find the power output of the hoist.`,
    value: P7, unit: "W", wrong: [250 * 0.6, 250 * 9.8],
    explanation: t`Steady speed: tension $=$ weight $= 2450$ N. $P = Fv = 2450 \times 0.6 = ${P7}$ W.`,
    hints: ["At a steady speed the lifting force equals the weight."],
  });

  const v8 = 60000 / (4000 - 8000 * 10 * 0.02);
  b.calc({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`A lorry of mass $8000$ kg travels down a straight hill inclined at $\alpha$ to the horizontal, where $\sin\alpha = 0.02$. The engine works at $60$ kW and the resistance to motion is a constant $4000$ N. Taking $g = 10$ m s$^{-2}$, find the greatest speed of the lorry down the hill.`,
    value: v8, unit: "m/s", wrong: [60000 / 4000, 60000 / 5600],
    explanation: t`Weight component down the hill: $8000 \times 10 \times 0.02 = 1600$ N, which now HELPS the engine. At the greatest speed: $\frac{60\,000}{v} + 1600 = 4000$, so $v = \frac{60\,000}{2400} = ${v8}$ m s$^{-1}$.`,
    hints: ["Going downhill, the weight component acts in the direction of motion."],
  });

  const R9 = 32000 / 40, m9 = (32000 / 16 - R9) / 1.2;
  chk(m9, 1000);
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`A car's engine works at a constant $32$ kW. On a level road its greatest speed is $40$ m s$^{-1}$, and when its speed is $16$ m s$^{-1}$ its acceleration is $1.2$ m s$^{-2}$. Assuming the resistance is constant, find the resistance and the mass of the car.`,
    template: "Resistance = {{blank:r}} N, mass = {{blank:m}} kg",
    blanks: [N("r", R9, "1280"), N("m", m9, "1667")],
    explanation: t`At the greatest speed: $R = \frac{32\,000}{40} = 800$ N. At $16$ m s$^{-1}$: driving force $= 2000$ N, so $2000 - 800 = 1.2m$ and $m = ${m9}$ kg.`,
    hints: ["Use the greatest speed to find the resistance first."],
  });

  const v10 = sqrt(27000 / 30);
  chk(v10, 30);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`A motorcycle's engine works at a constant $27$ kW. The resistance to its motion is $30v$ N, where $v$ m s$^{-1}$ is its speed. Find its greatest speed on a level road.`,
    value: v10, unit: "m/s", wrong: [900],
    explanation: t`At the greatest speed: $\frac{27\,000}{v} = 30v$, so $v^2 = 900$ and $v = 30$ m s$^{-1}$.`,
    hints: ["Set the driving force P/v equal to the resistance 30v."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "When a car moves at its greatest speed along a level road, its driving force equals the resistance to motion.",
    answer: true,
    explanation: "At the greatest speed the acceleration is zero, so by Newton's first law the forces along the road balance.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "A car whose engine works at a constant power, against a constant resistance, moves with constant acceleration.",
    answer: false,
    explanation: t`The driving force $\frac{P}{v}$ falls as the speed rises, so the acceleration decreases. The constant-acceleration formulae cannot be used.`,
  });

  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: "A car moves on a level road against a constant resistance. If the maximum power of its engine were doubled, what would happen to its greatest speed?",
    options: [
      ["It would double", "Correct: v_max = P / resistance, so it is proportional to P."],
      ["It would increase by a factor of √2", "That would be true if the resistance were proportional to the speed."],
      ["It would stay the same", "More power means a larger driving force at every speed."],
      ["It would halve", "Increasing the power cannot reduce the greatest speed."],
    ],
    answer: "A",
    explanation: t`$\frac{P}{v_{\max}} = R$ gives $v_{\max} = \frac{P}{R}$.`,
    hints: ["Write v_max in terms of P and the resistance."],
  });

  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`A car moves at $72$ km h$^{-1}$ with a driving force of $900$ N. What is the power of its engine?`,
    options: [
      [t`$18$ kW`, t`Correct: $72$ km h$^{-1}$ $= 20$ m s$^{-1}$, and $900 \times 20 = 18\,000$ W.`],
      [t`$64.8$ kW`, "This uses 72 without converting km/h to m/s."],
      [t`$12.5$ W`, "This divides the force by the speed instead of multiplying."],
      [t`$1.8$ kW`, "This is ten times too small: 72 km/h is 20 m/s, not 2 m/s."],
    ],
    answer: "A",
    explanation: t`$72 \times \frac{1000}{3600} = 20$ m s$^{-1}$; $P = Fv = 18\,000$ W.`,
    hints: ["Convert the speed to m/s first."],
  });

  b.match({
    d: 2, skill: "RECALL", calculator: false,
    stem: "Match each quantity with its formula.",
    pairs: [
      ["Power of a force F at speed v", t`$Fv$`],
      ["Average power", t`$\dfrac{\text{work done}}{\text{time}}$`],
      ["Driving force of an engine of power P", t`$\dfrac{P}{v}$`],
      ["Greatest speed on a level road", t`$\dfrac{P}{\text{resistance}}$`],
    ],
    explanation: "All of these come from power = rate of doing work.",
  });

  b.proof({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 3,
    stem: t`A constant force $F$ acts on a body in its direction of motion. Show that the rate at which the force does work is $Fv$, where $v$ is the speed of the body.`,
    points: [
      t`M1 in a time $\delta t$ the body moves $\delta s$, so the work done is $F\,\delta s$.`,
      t`M1 rate of working $= \frac{F\,\delta s}{\delta t}$.`,
      t`A1 as $\delta t \to 0$, $\frac{\delta s}{\delta t} \to \frac{\mathrm{d}s}{\mathrm{d}t} = v$, so $P = Fv$.`,
    ],
    modelAnswer: t`$$
\delta W = F\,\delta s
$$
$$
P = \lim_{\delta t \to 0}\frac{\delta W}{\delta t} = F\lim_{\delta t \to 0}\frac{\delta s}{\delta t} = F\frac{\mathrm{d}s}{\mathrm{d}t} = Fv
$$`,
    explanation: "Power is the rate of doing work; the work in a small interval is force × small distance.",
    hints: ["Consider the work done in a short time δt."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: "A car accelerates from rest along a level road with its engine at full power. Explain why its acceleration decreases and why it reaches a greatest speed.",
    points: [
      "At constant power the driving force is P/v, which decreases as the speed increases, while the resistance stays the same (or grows).",
      "So the resultant force and the acceleration fall; when the driving force has fallen to equal the resistance, the acceleration is zero and the speed stops increasing.",
    ],
    modelAnswer: "With P fixed, the driving force F = P/v gets smaller as v increases. The resultant force F − R, and so the acceleration, decreases. Eventually F = R, the acceleration is zero, and the car travels at its greatest speed P/R.",
    explanation: "Greatest speed: driving force = total resistance.",
    hints: ["What happens to P/v as v increases?"],
  });

  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Tendai, of mass $60$ kg, runs up a flight of stairs, rising $12$ m vertically in $15$ s. Taking $g = 10$ m s$^{-2}$, find the average power he develops in raising his body (ignore any change in his kinetic energy).`,
    value: 60 * 10 * 12 / 15, unit: "W", wrong: [60 * 12 / 15, 60 * 10 * 12],
    explanation: t`Work done against gravity $= 60 \times 10 \times 12 = 7200$ J. Average power $= \frac{7200}{15} = ${60 * 10 * 12 / 15}$ W.`,
    hints: ["Average power = work done ÷ time."],
  });

  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`A borehole pump in Masvingo raises $500$ kg of water through a height of $8$ m every minute. Taking $g = 10$ m s$^{-2}$ and ignoring kinetic energy, what is its average useful power, to 3 significant figures?`,
    options: [
      [t`$667$ W`, t`Correct: $\frac{500 \times 10 \times 8}{60} = 667$ W.`],
      [t`$40$ kW`, "This is the work done in one minute (40 000 J), not the power."],
      [t`$66.7$ W`, "This omits g: the force needed is the weight, 5000 N."],
      [t`$4000$ W`, t`This uses $\frac{40\,000}{10}$: the time is $60$ s, not $10$ s.`],
    ],
    answer: "A",
    explanation: "Work = mgh = 40 000 J each minute; divide by 60 s.",
  });

  // Struct 5: car on a level road
  const vmax = 40000 / 1000, a20 = (40000 / 16 - 1000) / 1200, v20 = 40000 / (1000 + 1200 * 0.5);
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: t`A car of mass $1200$ kg moves along a level road. Its engine works at a constant $40$ kW, and the resistance to motion is a constant $1000$ N.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Find the greatest speed of the car.", value: vmax, unit: "m/s", wrong: [0.04], explanation: t`$\frac{40\,000}{v} = 1000$, $v = ${vmax}$ m s$^{-1}$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Find the acceleration of the car when its speed is 16 m/s.", value: a20, unit: "m/s²", wrong: [40000 / 16 / 1200], explanation: t`$F = \frac{40\,000}{16} = 2500$ N; $2500 - 1000 = 1200a$, so $a = ${a20}$ m s$^{-2}$.` }),
      P.num({ label: "(c)", marks: 2, stem: "Find the speed of the car when its acceleration is 0.5 m/s².", value: v20, unit: "m/s", wrong: [40000 / 600], explanation: t`$\frac{40\,000}{v} - 1000 = 1200 \times 0.5 = 600$, so $\frac{40\,000}{v} = 1600$ and $v = ${v20}$ m s$^{-1}$.` }),
    ],
    explanation: "Driving force P/v together with Newton's second law links speed and acceleration at any instant.",
    hints: ["Driving force = P / v.", "At the greatest speed, the acceleration is zero."],
  });

  // Struct 12: lorry on a level road and a hill, with an energy part
  const R = 90000 / 30, W = 6000 * 10 / 40, vh = 90000 / (R + W), ah = (90000 / 12 - R - W) / 6000;
  const dist = (90000 * 60 - 0.5 * 6000 * (18 * 18 - 12 * 12)) / (R + W);
  chk(dist, 1080); chk(ah, 0.5);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`A lorry of mass $6000$ kg has an engine that works at a constant $90$ kW. The resistance to motion is a constant $R$ N. On a level road the greatest speed of the lorry is $30$ m s$^{-1}$. Take $g = 10$ m s$^{-2}$.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Find R.", value: R, unit: "N", wrong: [3], explanation: t`$\frac{90\,000}{30} = R$, so $R = ${R}$ N.` }),
      P.num({ label: "(b)", marks: 2, stem: "The lorry climbs a hill inclined at α to the horizontal, where sin α = 1/40. Find its greatest speed up the hill.", value: vh, unit: "m/s", wrong: [30], explanation: t`Weight component $= 6000 \times 10 \times \frac{1}{40} = ${W}$ N. $\frac{90\,000}{v} = ${R} + ${W}$, so $v = ${vh}$ m s$^{-1}$.` }),
      P.num({ label: "(c)", marks: 3, stem: "Find the acceleration of the lorry up the hill at the instant when its speed is 12 m/s.", value: ah, unit: "m/s²", wrong: [(7500 - R) / 6000], explanation: t`$F = \frac{90\,000}{12} = 7500$ N; $7500 - ${R} - ${W} = 6000a$, so $a = ${ah}$ m s$^{-2}$.` }),
      P.num({ label: "(d)", marks: 3, stem: "In one minute on the hill, the lorry's speed increases from 12 m/s to 18 m/s. Use the work–energy principle to find the distance it travels in this minute.", value: dist, unit: "m", wrong: [90000 * 60 / (R + W)], explanation: t`Work by engine $= 90\,000 \times 60 = 5\,400\,000$ J. Gain in KE $= \frac{1}{2}(6000)(18^2 - 12^2) = 540\,000$ J. Work against resistance and gravity $= (${R} + ${W})d = 4500d$. So $5\,400\,000 = 540\,000 + 4500d$ and $d = ${dist}$ m.` }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain why the constant-acceleration formulae could not be used in part (d).", points: ["At constant power the driving force P/v changes as the speed changes.", "So the resultant force, and hence the acceleration, is not constant (it decreases from 0.5 m/s²)."],
        modelAnswer: "The engine works at constant power, so the driving force 90 000/v falls as the lorry speeds up. The resultant force and the acceleration therefore decrease during the minute, so the suvat formulae, which need constant acceleration, do not apply; the energy method does not need the acceleration.",
        explanation: "Work done = power × time is valid even when the force changes." }),
    ],
    explanation: "Power links force and speed at an instant; work = power × time links energy over an interval.",
    hints: ["Greatest speed: driving force = total resistance.", "In (d), work done by the engine = power × time."],
  });

  b.card("DEFINITION", "Power", t`The rate of doing work; unit watt, $1$ W $= 1$ J s$^{-1}$.`);
  b.card("FORMULA", "Average power", t`$\dfrac{\text{work done}}{\text{time taken}}$`);
  b.card("FORMULA", "Power of a moving force", t`$P = Fv$ (force along the motion).`);
  b.card("FORMULA", "Driving force of an engine", t`$F = \dfrac{P}{v}$ — convert kW to W first.`);
  b.card("CONCEPT", "Greatest speed", t`Acceleration zero: $\frac{P}{v_{\max}}$ equals the total resistance (add $mg\sin\alpha$ uphill, subtract it downhill).`);
  b.card("CONCEPT", "Acceleration at an instant", t`$\frac{P}{v} - \text{resistance} \mp mg\sin\alpha = ma$.`);
  b.card("FACT", "Constant power", "The driving force falls as the speed rises, so the acceleration is not constant: do not use suvat.");
  b.card("CONCEPT", "Power and energy together", "Work done by an engine of constant power P in time t is Pt; use it in the work–energy principle.");
  b.card("FACT", "Speed conversion", t`$1$ km h$^{-1}$ $= \frac{1000}{3600}$ m s$^{-1}$; e.g. $72$ km h$^{-1}$ $= 20$ m s$^{-1}$.`);
});
