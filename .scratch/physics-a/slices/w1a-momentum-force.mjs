// W1a: dynamics.momentum-force — momentum, force as rate of change of momentum, impulse, jets and rockets.
import { concept, P, t as raw, chk, sfStr, dpStr, sciTex, table, DATA } from "../lib.mjs";

// String.raw keeps "\n" literally: turn \n (not followed by a lower-case letter, so \nu and \neq survive) into a newline.
const t = (s, ...v) => raw(s, ...v).replace(/\\n(?![a-z])/g, "\n");

const K = "aphys.dynamics.momentum-force";
const g = DATA.g;

concept(K, { file: "dynamics/momentum-force", keyPrefix: "dynamics.momentum-force" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is a correct unit for linear momentum?",
    options: [
      ["N s", "Correct: 1 N s = 1 kg m s⁻², multiplied by s = 1 kg m s⁻¹."],
      [t`$\text{N s}^{-1}$`, "This would be force per unit time, not momentum."],
      [t`$\text{kg m s}^{-2}$`, "This is the newton, the unit of force (rate of change of momentum)."],
      ["J s", "The joule second is the unit of the Planck constant, not momentum."],
    ],
    answer: "A",
    explanation: t`Momentum $p = mv$ has units $\text{kg m s}^{-1}$. Since $F\Delta t = \Delta p$, the newton second is equivalent: $\text{N s} = \text{kg m s}^{-2} \times \text{s} = \text{kg m s}^{-1}$.`,
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: t`What is the momentum of a $0.45\ \text{kg}$ football moving at $20\ \text{m s}^{-1}$?`,
    options: [
      [t`$9.0\ \text{kg m s}^{-1}$`, "Correct: p = mv = 0.45 × 20."],
      [t`$90\ \text{kg m s}^{-1}$`, "This is the kinetic energy in joules, ½mv², not the momentum."],
      [t`$44\ \text{kg m s}^{-1}$`, "This divides the speed by the mass."],
      [t`$4.5\ \text{kg m s}^{-1}$`, "There is no ½ in the momentum formula."],
    ],
    answer: "A",
    explanation: t`$p = mv = 0.45 \times 20 = 9.0\ \text{kg m s}^{-1}$ in the direction of motion. (Its kinetic energy is $\tfrac{1}{2}mv^2 = 90\ \text{J}$.)`,
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How does an airbag reduce the force on a driver's head in a collision?",
    options: [
      ["It increases the time taken for the head to stop, so for the same change in momentum the force is smaller.", "Correct: F = Δp/Δt, with Δp fixed by the mass and speed."],
      ["It reduces the change in momentum of the head, so that the force needed to stop it is smaller.", "The head still goes from its speed to rest: Δp is the same."],
      ["It reduces the time taken for the head to stop, so the rate of change of momentum is smaller.", "A shorter stopping time would make the rate of change of momentum, and the force, larger."],
      ["It increases the impulse on the head, which spreads the force and so reduces it.", "The impulse equals the change in momentum, which is unchanged."],
    ],
    answer: "A",
    explanation: t`The head must lose the same momentum whatever happens. Spreading this over a longer time reduces $F = \Delta p/\Delta t$.`,
  });
  {
    const dp = 0.2 * (6 + 8);
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: t`A $0.20\ \text{kg}$ ball hits a wall at $8.0\ \text{m s}^{-1}$ and rebounds along the same line at $6.0\ \text{m s}^{-1}$. What is the change in momentum of the ball?`,
      options: [
        [t`$${sfStr(dp, 2)}\ \text{N s}$ away from the wall`, "Correct: 0.20 × (6.0 − (−8.0)) = 2.8 N s, in the direction of the rebound."],
        [t`$0.40\ \text{N s}$ away from the wall`, "This subtracts the speeds and ignores the reversal of direction."],
        [t`$${sfStr(dp, 2)}\ \text{N s}$ towards the wall`, "The change is in the direction of the rebound, because the wall pushed the ball back."],
        [t`$1.6\ \text{N s}$ away from the wall`, "This is only the initial momentum; the final momentum must be added because it is reversed."],
      ],
      answer: "A",
      explanation: t`Away from the wall positive: $u = -8.0$, $v = +6.0\ \text{m s}^{-1}$. $\Delta p = 0.20(6.0 - (-8.0)) = ${sfStr(dp, 2)}\ \text{N s}$ away from the wall.`,
      hints: ["Give the velocities opposite signs."],
    });
  }
  {
    const imp = 80 * 0.02 + 0.5 * 80 * 0.01;
    chk(imp, 2);
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: t`A force-time graph for a collision shows the force constant at $80\ \text{N}$ for $0.020\ \text{s}$ and then falling steadily to zero over a further $0.010\ \text{s}$. What is the impulse of the force?`,
      options: [
        [t`$2.0\ \text{N s}$`, "Correct: rectangle 1.6 N s + triangle 0.4 N s."],
        [t`$2.4\ \text{N s}$`, "This treats the whole 0.030 s as a rectangle at 80 N."],
        [t`$1.6\ \text{N s}$`, "This leaves out the triangular part as the force falls."],
        [t`$1.2\ \text{N s}$`, "This treats the whole graph as one triangle."],
      ],
      answer: "A",
      explanation: t`Impulse $=$ area under the graph: $80 \times 0.020 + \tfrac{1}{2} \times 80 \times 0.010 = 1.6 + 0.4 = 2.0\ \text{N s}$.`,
      hints: ["Split the area into a rectangle and a triangle."],
    });
  }
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: t`Water from a hose leaves the nozzle at $1.5\ \text{kg s}^{-1}$ and $8.0\ \text{m s}^{-1}$ and hits a wall horizontally, coming to rest without bouncing back. What is the force of the water on the wall?`,
    options: [
      [t`$12\ \text{N}$`, "Correct: rate of change of momentum = 1.5 kg s⁻¹ × 8.0 m s⁻¹."],
      [t`$24\ \text{N}$`, "This would be the force if the water bounced straight back at the same speed."],
      [t`$5.3\ \text{N}$`, "This divides the speed by the mass flow rate."],
      [t`$48\ \text{N}$`, "This uses ½ × 1.5 × 8.0², the kinetic energy delivered per second (a power in W)."],
    ],
    answer: "A",
    explanation: t`Each second $1.5\ \text{kg}$ of water loses $8.0\ \text{m s}^{-1}$: $F = \dfrac{\Delta p}{\Delta t} = 1.5 \times 8.0 = 12\ \text{N}$.`,
    hints: ["Find the momentum lost by the water each second."],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: t`Crushed stone falls vertically onto a horizontal conveyor belt at $50\ \text{kg s}^{-1}$. The belt moves at a constant $2.0\ \text{m s}^{-1}$. What extra horizontal force must the belt's motor provide because of the stone landing on it (ignore friction)?`,
    options: [
      [t`$100\ \text{N}$`, "Correct: each second 50 kg is given 2.0 m s⁻¹ of horizontal velocity."],
      [t`$25\ \text{N}$`, "This divides the mass rate by the speed."],
      [t`$0\ \text{N}$`, "The belt moves at constant speed, but the stone's momentum keeps increasing, which needs a force."],
      [t`$490\ \text{N}$`, "This is the weight of 50 kg, a vertical force supported by the belt, not the horizontal driving force."],
    ],
    answer: "A",
    explanation: t`$F = \dfrac{\Delta p}{\Delta t} = \dfrac{\Delta m}{\Delta t}\,v = 50 \times 2.0 = 100\ \text{N}$. This is a case where the mass changes, so $F = ma$ ($a = 0$) would wrongly give zero.`,
    hints: ["The belt moves at constant speed, but what is happening to the momentum on it?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A truck and a motorbike have the same momentum. Which statement is correct?",
    options: [
      ["The motorbike has more kinetic energy.", "Correct: Eₖ = p²/2m, so for equal p the smaller mass has more kinetic energy."],
      ["The truck has more kinetic energy.", "With equal momentum, the larger mass has the smaller speed and less kinetic energy."],
      ["They have equal kinetic energies.", "Kinetic energy depends on p²/2m, which differs for different masses."],
      ["The motorbike has the smaller speed.", "Equal momentum means the lighter motorbike must be faster."],
    ],
    answer: "A",
    explanation: t`$E_k = \tfrac{1}{2}mv^2 = \dfrac{p^2}{2m}$. For the same $p$, a smaller $m$ gives a larger $E_k$.`,
    hints: ["Write the kinetic energy in terms of p and m."],
  });

  // Numerical and calculation items
  b.num({
    d: 2, skill: "APPLICATION",
    stem: t`A force of $25\ \text{N}$ acts on a trolley for $0.40\ \text{s}$. Calculate the impulse, in N s.`,
    value: 10, unit: "N s", wrong: [62.5, 25],
    explanation: t`Impulse $= F\Delta t = 25 \times 0.40 = 10\ \text{N s}$, equal to the trolley's change in momentum.`,
  });
  {
    const F = (0.16 * 28) / 0.12;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Rudo catches a $0.16\ \text{kg}$ cricket ball travelling at $28\ \text{m s}^{-1}$, drawing her hands back so that it stops in $0.12\ \text{s}$. Calculate the average force on her hands, in N.`,
      value: F, unit: "N", wrong: [0.16 * 28, (0.5 * 0.16 * 28 ** 2) / 0.12],
      explanation: t`1. $\Delta p = 0.16 \times 28 = 4.48\ \text{N s}$.\n2. $F = \dfrac{\Delta p}{\Delta t} = \dfrac{4.48}{0.12} = ${sfStr(F, 3)}\ \text{N}$.\n\nIf she stopped it in $0.012\ \text{s}$ without giving, the force would be ten times larger.`,
      hints: ["Find the change in momentum, then divide by the time."],
    });
  }
  {
    const imp = 0.5 * 900 * 9e-3;
    const v = imp / 0.43;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A $0.43\ \text{kg}$ football at rest is kicked. The force on it rises steadily from zero to $900\ \text{N}$ and falls steadily back to zero, the contact lasting $9.0\ \text{ms}$ in total. Calculate the speed of the ball as it leaves the boot, in $\text{m s}^{-1}$.`,
      value: v, unit: "m/s", wrong: [(900 * 9e-3) / 0.43, imp],
      explanation: t`1. Impulse $=$ area of the triangle $= \tfrac{1}{2} \times 900 \times 9.0 \times 10^{-3} = ${sfStr(imp, 3)}\ \text{N s}$.\n2. $v = \dfrac{\Delta p}{m} = \dfrac{${sfStr(imp, 3)}}{0.43} = ${sfStr(v, 3)}\ \text{m s}^{-1}$.\n\nUsing the peak force for the whole time doubles the answer.`,
      hints: ["The impulse is the area of a triangle.", "Impulse = change in momentum = mv."],
    });
  }
  {
    const m = 0.06;
    const dp = m * (4 + 5);
    const Fnet = dp / 0.015;
    const Ffloor = Fnet + m * g;
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A $0.060\ \text{kg}$ ball hits the floor vertically at $5.0\ \text{m s}^{-1}$ and rebounds at $4.0\ \text{m s}^{-1}$. It is in contact with the floor for $0.015\ \text{s}$. Calculate the average force exerted **by the floor** on the ball, in N.`,
      value: Ffloor, unit: "N", wrong: [Fnet, (m * 1) / 0.015],
      explanation: t`1. Upwards positive: $\Delta p = 0.060(4.0 - (-5.0)) = ${sfStr(dp, 2)}\ \text{N s}$ upwards.\n2. Resultant force $= ${sfStr(dp, 2)}/0.015 = ${sfStr(Fnet, 3)}\ \text{N}$ upwards.\n3. Resultant $=$ floor force $-$ weight, so floor force $= ${sfStr(Fnet, 3)} + 0.060 \times 9.81 = ${sfStr(Ffloor, 3)}\ \text{N}$.\n\nThe weight is small here, but the rate of change of momentum gives the **resultant** force.`,
      hints: ["The change of momentum gives the resultant force.", "The resultant is the floor's push minus the weight."],
    });
  }
  {
    const F = 150 * 2.6e3;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A rocket engine ejects exhaust gas at $150\ \text{kg s}^{-1}$ with a speed of $2.6 \times 10^{3}\ \text{m s}^{-1}$ relative to the rocket. Calculate the thrust, in N.`,
      value: F, sf: 2, unit: "N", wrong: [2.6e3 / 150],
      explanation: t`1. Thrust $=$ rate of change of momentum of the gas.\n2. $F = \dfrac{\Delta m}{\Delta t}v = 150 \times 2.6 \times 10^{3}$.\n3. $F = ${sciTex(F, 2)}\ \text{N}$ (Newton's third law: the gas pushes the rocket forwards with this force).`,
      hints: ["Momentum given to the gas each second = mass per second × speed."],
    });
  }
  {
    const F = 0.9 * (10 + 10);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true, daily: true,
      stem: t`A jet of water strikes a flat plate at $0.90\ \text{kg s}^{-1}$ and $10\ \text{m s}^{-1}$ and bounces straight back at the same speed. Calculate the force on the plate, in N.`,
      value: F, unit: "N", wrong: [0.9 * 10],
      explanation: t`Each second $0.90\ \text{kg}$ changes velocity from $+10$ to $-10\ \text{m s}^{-1}$: $\Delta p$ per second $= 0.90 \times 20 = ${F}\ \text{N}$. A jet that stops without bouncing would exert only $9.0\ \text{N}$.`,
      hints: ["The velocity change on rebounding is 20 m s⁻¹, not 10."],
    });
  }

  b.tf({
    d: 1, skill: "RECALL",
    stem: "Momentum is a scalar quantity.",
    answer: false,
    explanation: "False. Momentum = mass × velocity, and velocity is a vector, so momentum is a vector in the direction of motion.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A car's crumple zone reduces the force in a crash by reducing the impulse on the car.",
    answer: false,
    explanation: "False. The impulse (change in momentum) is fixed by the car's mass and speed. The crumple zone increases the stopping time, which reduces the force.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each quantity with its expression.",
    pairs: [
      ["momentum", t`$mv$`],
      ["impulse", t`$F\Delta t$`],
      ["resultant force", t`$\dfrac{\Delta p}{\Delta t}$`],
      ["kinetic energy", t`$\dfrac{p^2}{2m}$`],
    ],
    explanation: t`Impulse $= F\Delta t = \Delta p$; force is the rate of change of momentum; $E_k = \tfrac{1}{2}mv^2 = p^2/2m$.`,
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statement.",
    template: "Impulse is equal to the change in {{blank:a}} of an object and is given by the area under a {{blank:b}} graph.",
    blanks: [
      { id: "a", accepted: ["momentum"], choices: ["momentum", "velocity", "kinetic energy"] },
      { id: "b", accepted: ["force-time"], choices: ["force-time", "velocity-time", "displacement-time"] },
    ],
    explanation: "Impulse = FΔt = Δp, the area under a force-time graph.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Starting from Newton's second law in the form \"force equals rate of change of momentum\", show that $F = ma$ for an object of constant mass.",
    points: [
      t`$F = \dfrac{\Delta p}{\Delta t} = \dfrac{\Delta(mv)}{\Delta t}$`,
      t`With $m$ constant: $F = m\dfrac{\Delta v}{\Delta t} = ma$ (since $a = \Delta v/\Delta t$)`,
    ],
    modelAnswer: t`$F = \dfrac{\Delta(mv)}{\Delta t}$. If the mass does not change, it can be taken outside: $F = m\dfrac{\Delta v}{\Delta t}$, and $\Delta v/\Delta t$ is the acceleration, so $F = ma$.`,
    explanation: "The key step is that m is constant, so only v changes.",
    hints: ["Write p = mv and note what stays constant."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain, in terms of momentum, why a fielder draws her hands back as she catches a fast cricket ball.",
    points: [
      "The ball's change in momentum (from mv to zero) is the same however it is caught",
      "Moving the hands back increases the time over which the ball is stopped",
      "Force = rate of change of momentum (Δp/Δt), so a longer time means a smaller force on the hands (less pain or injury)",
    ],
    modelAnswer: "The ball must lose all its momentum, mv, whatever she does. By drawing her hands back she makes the ball stop over a longer time. Since the force equals the rate of change of momentum, Δp/Δt, the same change spread over a longer time needs a smaller force, so her hands are hurt less.",
    explanation: "Fixed Δp, longer Δt, smaller F.",
    hints: ["What stays the same, and what does she change?"],
  });

  // Practice structured 1: force sensor data for a kick.
  {
    const ts = [0, 2, 4, 6, 8, 10, 12];
    const Fs = [0, 150, 380, 460, 300, 120, 0];
    const imp = 2e-3 * (150 + 380 + 460 + 300 + 120);
    const m = 0.42;
    const v = imp / m;
    const Favg = imp / 0.012;
    chk(imp, 2.82, 1e-9);
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true, examStyle: true,
      stem: t`A force sensor connected to a data logger records the force on a $0.42\ \text{kg}$ ball, initially at rest, as it is kicked. Readings are taken every $2.0\ \text{ms}$.\n\n${table([t`$t\,/\,\text{ms}$`, ...ts.map(String)], [[t`$F\,/\,\text{N}$`, ...Fs.map(String)]])}`,
      parts: [
        P.num({ label: "(a)", marks: 3, stem: "Estimate the impulse on the ball by finding the area under the force-time graph, treating it as straight-line segments between the readings, in N s.", value: imp, unit: "N s", tol: 0.05, wrong: [460 * 0.012, 0.5 * 460 * 0.012], explanation: t`With straight lines between points (trapezium rule), area $= 2.0 \times 10^{-3} \times (150 + 380 + 460 + 300 + 120) = ${sfStr(imp, 3)}\ \text{N s}$. A triangle using the peak, $\tfrac{1}{2} \times 460 \times 0.012 = 2.76\ \text{N s}$, is a rough check.` }),
        P.num({ label: "(b)", marks: 2, stem: t`Calculate the speed of the ball as it leaves the foot, in $\text{m s}^{-1}$.`, value: v, unit: "m/s", wrong: [imp * m], explanation: t`$v = \dfrac{\text{impulse}}{m} = \dfrac{${sfStr(imp, 3)}}{0.42} = ${sfStr(v, 3)}\ \text{m s}^{-1}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the average force on the ball during the contact, in N.", value: Favg, unit: "N", wrong: [460], explanation: t`$F_{\text{avg}} = \dfrac{${sfStr(imp, 3)}}{0.012} = ${sfStr(Favg, 3)}\ \text{N}$, about half the peak force of 460 N.` }),
        P.mcq({ label: "(d)", stem: "The same kick is given to a softer ball of the same mass, which leaves the foot at the same speed. How does its force-time graph compare?", options: [["Longer contact time, lower peak force, same area", "Correct: the same impulse spread over more time."], ["Same contact time, lower peak force, smaller area", "The same final speed needs the same impulse (area)."], ["Shorter contact time, higher peak force, same area", "A softer ball deforms more, so contact lasts longer."], ["Longer contact time, same peak force, larger area", "A larger area would give a larger final speed."]], answer: "A", explanation: "Equal mass and speed means equal Δp, so equal area; a softer ball stays in contact longer, so the force is lower." }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain why the peak force is much larger than the average force.", points: ["The force is not constant: it rises from zero to a maximum and falls back to zero", "The average is the impulse divided by the whole contact time, which includes the times of small force at the start and end"], modelAnswer: "The force varies during the kick, rising from zero to about 460 N and back to zero. The average force is the total impulse divided by the whole 12 ms, which includes the start and end when the force is small, so it is much less than the peak." }),
        P.manual({ label: "(f)", marks: 2, stem: "Suggest one limitation of these readings and an improvement.", points: ["Limitation: readings every 2.0 ms give only five non-zero points, so the true peak and shape between readings (and the start/end times) may be missed", "Improvement: increase the sampling rate of the data logger (e.g. a reading every 0.1 ms), or repeat kicks and average"], modelAnswer: "With a reading only every 2.0 ms, the graph is defined by just five non-zero points, so the true peak force and the exact shape and duration of the contact are uncertain. Setting the data logger to sample much faster, for example every 0.1 ms, would capture the shape properly." }),
      ],
      explanation: t`Impulse $\approx ${sfStr(imp, 3)}\ \text{N s}$ (area under the graph), so the ball leaves at $${sfStr(v, 3)}\ \text{m s}^{-1}$; the average force is $${sfStr(Favg, 3)}\ \text{N}$.`,
      hints: ["Area of each strip = width × average height.", "Impulse = change in momentum."],
    });
  }

  // Practice structured 2: crash test and seat belts.
  {
    const m = 950;
    const u = 13.4;
    const p = m * u;
    const F = p / 0.11;
    const md = 70;
    const sd = 0.35;
    const td = (2 * sd) / u;
    const Fd = (md * u) / td;
    console.log("crash", p, F, td, Fd);
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true, examStyle: true,
      stem: t`In a crash test a $950\ \text{kg}$ car travelling at $13.4\ \text{m s}^{-1}$ hits a rigid barrier and comes to rest in $0.11\ \text{s}$. A $70\ \text{kg}$ test dummy wearing a seat belt is brought to rest uniformly over a distance of $0.35\ \text{m}$ relative to the ground.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: t`Calculate the momentum of the car before the crash, in $\text{kg m s}^{-1}$.`, value: p, unit: "N s", explanation: t`$p = 950 \times 13.4 = ${sfStr(p, 3)}\ \text{kg m s}^{-1}$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the average force exerted by the barrier on the car, in N.", value: F, unit: "N", wrong: [p * 0.11], explanation: t`$F = \dfrac{\Delta p}{\Delta t} = \dfrac{${sfStr(p, 3)}}{0.11} = ${sciTex(F, 3)}\ \text{N}$.` }),
        P.num({ label: "(c)", marks: 3, stem: "Calculate the average force of the seat belt on the dummy, in N.", value: Fd, unit: "N", wrong: [(md * u) / 0.11], explanation: t`Stopping time from $s = \tfrac{1}{2}(u + v)t$: $t = \dfrac{2 \times 0.35}{13.4} = ${sfStr(td, 3)}\ \text{s}$. $F = \dfrac{70 \times 13.4}{${sfStr(td, 3)}} = ${sciTex(Fd, 3)}\ \text{N}$ (about ${Math.round(Fd / (md * g))} times the dummy's weight).` }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain how an airbag, inflating in front of the dummy, reduces the force on its head.", points: ["The head's change in momentum (from 70-kg-body speed to rest) is fixed / the same", "The airbag increases the time (and distance) over which the head stops, so F = Δp/Δt is smaller (and the force is spread over a larger area)"], modelAnswer: "The head must lose the same momentum whatever stops it. The airbag cushions the head and deflates, making it stop over a longer time and distance, so the rate of change of momentum, and hence the force, is smaller; it also spreads the force over a larger area." }),
      ],
      explanation: t`The car's momentum, $${sfStr(p, 3)}\ \text{kg m s}^{-1}$, is lost in $0.11\ \text{s}$: $F = ${sciTex(F, 3)}\ \text{N}$. The dummy stops in $${sfStr(td, 3)}\ \text{s}$, so the belt force is $${sciTex(Fd, 3)}\ \text{N}$.`,
      hints: ["F = Δp/Δt.", "For uniform deceleration, find the stopping time from s = ½(u + v)t."],
    });
  }

  // Flashcards
  b.card("DEFINITION", "Linear momentum", "Mass × velocity, p = mv: a vector, in kg m s⁻¹ (N s).");
  b.card("DEFINITION", "Newton's second law (momentum form)", "The resultant force equals the rate of change of momentum, in the direction of the change.");
  b.card("DEFINITION", "Impulse", "Force × time for which it acts; equal to the change in momentum and to the area under a force-time graph.");
  b.card("FORMULA", "Force from momentum change", t`$F = \dfrac{\Delta p}{\Delta t} = \dfrac{mv - mu}{\Delta t}$`);
  b.card("CONCEPT", "How does F = ma follow from F = Δp/Δt?", t`For constant mass, $\Delta(mv)/\Delta t = m\,\Delta v/\Delta t = ma$.`);
  b.card("CONCEPT", "Why do crumple zones, airbags and seat belts work?", "They increase the stopping time for the same change in momentum, so the force is smaller.");
  b.card("FORMULA", "Force from a jet that stops at a wall", t`$F = \dfrac{\Delta m}{\Delta t}v$ (doubled if the jet bounces straight back at the same speed)`);
  b.card("CONCEPT", "Change in momentum of a rebounding ball", t`$m(v + u)$ in size (speeds), directed along the rebound: the momenta add because the direction reverses.`);
  b.card("FORMULA", "Kinetic energy in terms of momentum", t`$E_k = \dfrac{p^2}{2m}$`);
});
