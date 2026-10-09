// W4a: amath.mechanics.power (ZIMSEC only)
import { concept, P, t, chk, steps } from "../lib.mjs";

const g = 9.8;

concept("amath.mechanics.power", { file: "mechanics/power", keyPrefix: "mechanics.power" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "Which unit is used for power?",
    options: [
      ["The watt", "Correct: 1 W = 1 J of work done per second."],
      ["The joule", "The joule measures work or energy, not the rate of doing it."],
      ["The newton", "The newton measures force."],
      ["The newton second", "This is a unit of impulse, not power."],
    ],
    answer: "A",
    explanation: "Power = work ÷ time, so its unit is the joule per second, called the watt (W). 1 kW = 1000 W.",
  });

  b.tf({
    d: 1, skill: "UNDERSTANDING", calculator: false,
    stem: "When a car's engine works at a constant power, the driving force decreases as the car's speed increases.",
    answer: true,
    explanation: t`True. $P = Fv$, so $F = \frac{P}{v}$: with $P$ fixed, a larger $v$ means a smaller driving force.`,
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: "A machine does 2400 J of work in 8 s. Find its average power.",
    value: 2400 / 8, unit: "W", wrong: [2400 * 8],
    explanation: t`$P = \frac{W}{t} = \frac{2400}{8} = 300$ W.`,
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: "A lorry's engine produces a driving force of 2500 N while the lorry travels at 16 m/s. Find the power of the engine in kilowatts.",
    value: (2500 * 16) / 1000, unit: "kW", wrong: [2500 * 16, 2500 / 16],
    explanation: t`$P = Fv = 2500 \times 16 = 40\,000$ W $= 40$ kW.`,
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "A car's engine works at 24 kW. The resistance to motion on a level road is a constant 800 N. Find the car's maximum speed.",
    value: 24000 / 800, unit: "m/s", wrong: [0.03, 24 / 800],
    explanation: t`At maximum speed $F = 800$ N, so $v = \frac{24\,000}{800} = 30$ m s$^{-1}$. Forgetting to convert kW gives 0.03.`,
  });

  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "A car's engine works at 30 kW while the car moves at 20 m/s. What is the driving force?",
    options: [
      ["1500 N", "Correct: F = P ÷ v = 30 000 ÷ 20."],
      ["600 000 N", "This multiplies the power by the speed instead of dividing."],
      ["1.5 N", "This forgets to change 30 kW into 30 000 W."],
      ["0.67 N", "This divides the speed by the power in kW."],
    ],
    answer: "A",
    explanation: t`$P = Fv$ gives $F = \frac{P}{v} = \frac{30\,000}{20} = 1500$ N.`,
  });

  b.calc({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "A minibus of mass 1200 kg is driven along a level road with its engine working at 36 kW. The resistance to motion is 1000 N. Find the acceleration of the minibus when its speed is 20 m/s, correct to 3 significant figures.",
    value: (36000 / 20 - 1000) / 1200, unit: "m/s²", wrong: [36000 / 20 / 1200, (36000 - 1000) / 1200],
    explanation: t`Driving force $= \frac{36\,000}{20} = 1800$ N. N2L: $1800 - 1000 = 1200a$, so $a = \frac{800}{1200} = 0.667$ m s$^{-2}$. Leaving out the resistance gives 1.5.`,
    workedSolution: steps(
      t`$F = \frac{P}{v} = \frac{36\,000}{20} = 1800$ N.`,
      t`N2L: $1800 - 1000 = 1200a$.`,
      t`$a = 0.667$ m s$^{-2}$.`,
    ),
    hints: ["Find the driving force at this speed first.", "Resultant force = driving force − resistance."],
  });

  b.calc({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "A pump on a farm near Chinhoyi lifts 500 kg of water from a borehole through a height of 9 m in 90 s. Take g = 9.8 m/s². Find the useful power of the pump.",
    value: (500 * g * 9) / 90, unit: "W", wrong: [(500 * 9) / 90, 500 * g * 9],
    explanation: t`Work done $= mgh = 500 \times 9.8 \times 9 = 44\,100$ J. $P = \frac{44\,100}{90} = 490$ W.`,
    hints: ["The work done equals the potential energy given to the water."],
  });

  {
    const R = 48000 / 40;
    const a = (48000 / 25 - R) / 1000;
    chk(a, 0.72, 1e-12);
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: false,
      stem: "A car of mass 1000 kg has a maximum speed of 40 m/s on a level road when its engine works at 48 kW. Assuming the resistance is constant, find the car's acceleration when it is travelling at 25 m/s with the engine at the same power.",
      value: a, unit: "m/s²", wrong: [48000 / 25 / 1000, (48000 / 25 - 48000 / 40) / 40],
      explanation: t`At top speed the driving force equals the resistance: $R = \frac{48\,000}{40} = 1200$ N. At 25 m s$^{-1}$: $F = \frac{48\,000}{25} = 1920$ N. N2L: $1920 - 1200 = 1000a$, so $a = 0.72$ m s$^{-2}$.`,
      workedSolution: steps(
        t`Maximum speed: $R = \frac{P}{v_{\max}} = 1200$ N.`,
        t`At 25 m s$^{-1}$: $F = 1920$ N.`,
        t`$1920 - 1200 = 1000a$, $a = 0.72$ m s$^{-2}$.`,
      ),
      hints: ["Use the maximum speed to find the resistance."],
    });
  }

  {
    const comp = (1500 * g) / 15;
    const v = 45000 / (900 + comp);
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A car of mass 1500 kg climbs a straight hill inclined at $\theta$ to the horizontal, where $\sin\theta = \frac{1}{15}$. Its engine works at 45 kW and the resistance to motion is 900 N. Take g = 9.8 m/s². Find the car's maximum speed up the hill, correct to 3 significant figures.`,
      value: v, unit: "m/s", wrong: [45000 / 900, 45000 / comp],
      explanation: t`Weight component down the hill $= 1500 \times 9.8 \times \frac{1}{15} = 980$ N. At maximum speed $F = 900 + 980 = 1880$ N, so $v = \frac{45\,000}{1880} = 23.9$ m s$^{-1}$. Ignoring the hill gives 50 m s$^{-1}$.`,
      hints: ["Uphill, the forces against the car are the resistance and mg sin θ."],
    });
  }

  {
    const F = 3000 + (8000 * g) / 40;
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: false,
      stem: t`A lorry of mass 8000 kg travels at a steady 12 m/s up a road inclined at $\theta$ to the horizontal, where $\sin\theta = \frac{1}{40}$. The resistance to motion is 3000 N. Take g = 9.8 m/s². Find the power of the engine in kilowatts, correct to 3 significant figures.`,
      value: (F * 12) / 1000, unit: "kW", wrong: [(3000 * 12) / 1000, ((3000 - 1960) * 12) / 1000],
      explanation: t`Steady speed: driving force $= 3000 + 8000(9.8)\left(\frac{1}{40}\right) = 3000 + 1960 = 4960$ N. $P = 4960 \times 12 = 59\,520$ W $= 59.5$ kW.`,
      hints: ["Steady speed means zero acceleration.", "The driving force must balance the resistance and the weight component."],
    });
  }

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "A car is travelling at its maximum speed along a level road. Which statement is true?",
    options: [
      ["The driving force equals the resistance", "Correct: the acceleration is zero, so the forces along the road balance."],
      ["The driving force has fallen to zero", "A driving force is still needed to balance the resistance."],
      ["The driving force exceeds the resistance", "Then there would be a resultant force and the car would still accelerate."],
      ["The engine's power has fallen to zero", "The engine is working at its full power, P = Fv."],
    ],
    answer: "A",
    explanation: t`At maximum speed $a = 0$, so driving force = resistance and $v_{\max} = \frac{P}{R}$.`,
  });

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: "A car accelerates along a level road with its engine at constant power and constant resistance. Why does its acceleration decrease as its speed increases?",
    options: [
      ["The driving force P/v falls as v rises", "Correct: a smaller driving force with the same resistance means a smaller resultant force."],
      ["The resistance rises as the car speeds up", "The resistance is constant in this model; the change is in the driving force."],
      ["The car's mass rises as it speeds up", "The mass is constant."],
      ["The engine's power falls as v rises", "The power is constant; it is the force that changes."],
    ],
    answer: "A",
    explanation: t`$a = \frac{1}{m}\left(\frac{P}{v} - R\right)$, which gets smaller as $v$ grows and reaches 0 at $v = \frac{P}{R}$.`,
    hints: ["Write the driving force in terms of P and v."],
  });

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`A cyclist freewheels (no pedalling) down a hill inclined at $\theta$ at a constant speed. The resistance to motion is $R$ and the total mass is $m$. Which equation holds?`,
    options: [
      [t`$mg\sin\theta = R$`, "Correct: constant speed, so the weight component down the hill balances the resistance."],
      [t`$mg\cos\theta = R$`, "mg cos θ is perpendicular to the slope and is balanced by the normal reaction."],
      [t`$mg = R$`, "Only the component of the weight along the slope pulls the cyclist down it."],
      [t`$R = 0$`, "If there were no resistance the cyclist would speed up."],
    ],
    answer: "A",
    explanation: t`No driving force, zero acceleration: the only forces along the slope are $mg\sin\theta$ (down) and $R$ (up), so they are equal.`,
    hints: ["What forces act along the slope?"],
  });

  b.match({
    d: 2, skill: "RECALL", calculator: false,
    stem: "Match each quantity with the formula used to find it.",
    pairs: [
      ["Average power", t`$\dfrac{W}{t}$`],
      ["Power of a vehicle", t`$Fv$`],
      ["Maximum speed on a level road", t`$\dfrac{P}{R}$`],
      ["Driving force at speed v", t`$\dfrac{P}{v}$`],
    ],
    explanation: t`All four come from $P = \frac{W}{t}$ and $P = Fv$; at maximum speed $F = R$.`,
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: "Explain why a car whose engine works at a fixed power on a level road has a maximum speed.",
    points: [
      t`The driving force is $F = \frac{P}{v}$, so it decreases as the speed increases.`,
      "At the speed where the driving force falls to equal the resistance, the resultant force and the acceleration are zero, so the car cannot go faster.",
    ],
    modelAnswer: "With constant power the driving force is P/v, which gets smaller as the car speeds up. Eventually it equals the resistance; then the resultant force is zero, the acceleration is zero and the speed stops increasing. That speed is v = P/R.",
    explanation: "Combine P = Fv with Newton's second law.",
    hints: ["What happens to the driving force P/v as v increases?"],
  });

  {
    const vmax = 600000 / 25000;
    const a = (600000 / 15 - 25000) / 200000;
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
      stem: "A train of mass 200 000 kg travels on a straight level track. Its engine works at 600 kW and the resistance to motion is a constant 25 000 N.",
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Find the maximum speed of the train.", value: vmax, unit: "m/s", wrong: [600 / 25000],
          explanation: t`$v = \frac{600\,000}{25\,000} = 24$ m s$^{-1}$.` }),
        P.num({ label: "(b)", marks: 3, stem: "Find the acceleration of the train when its speed is 15 m/s.", value: a, unit: "m/s²", wrong: [600000 / 15 / 200000],
          explanation: t`$F = \frac{600\,000}{15} = 40\,000$ N; $40\,000 - 25\,000 = 200\,000a$, so $a = 0.075$ m s$^{-2}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Find the power, in kilowatts, needed to keep the train moving at a steady 18 m/s.", value: (25000 * 18) / 1000, unit: "kW", wrong: [600],
          explanation: t`Steady speed: $F = 25\,000$ N, so $P = 25\,000 \times 18 = 450\,000$ W $= 450$ kW.` }),
      ],
      explanation: "Use F = P/v for the driving force at each speed; at maximum or steady speed it equals the resistance.",
      hints: ["Convert kW to W.", "At a steady speed the acceleration is zero."],
    });
  }

  {
    const comp = (1000 * g) / 20;
    chk(comp, 490, 1e-9);
    const tot = 710 + comp;
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: t`A car of mass 1000 kg drives up a straight hill inclined at $\theta$ to the horizontal, where $\sin\theta = \frac{1}{20}$. The resistance to motion is a constant 710 N and the engine works at 36 kW. Take g = 9.8 m/s².`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Find the component of the car's weight acting down the hill.", value: comp, unit: "N", wrong: [1000 * g],
          explanation: t`$1000 \times 9.8 \times \frac{1}{20} = 490$ N.` }),
        P.num({ label: "(b)", marks: 2, stem: "Find the car's maximum speed up the hill.", value: 36000 / tot, unit: "m/s", wrong: [36000 / 710],
          explanation: t`At maximum speed $F = 710 + 490 = 1200$ N, so $v = \frac{36\,000}{1200} = 30$ m s$^{-1}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Find the car's acceleration up the hill when its speed is 16 m/s.", value: (36000 / 16 - tot) / 1000, unit: "m/s²", wrong: [(36000 / 16 - 710) / 1000],
          explanation: t`$F = \frac{36\,000}{16} = 2250$ N; $2250 - 1200 = 1000a$, so $a = 1.05$ m s$^{-2}$.` }),
        P.num({ label: "(d)", marks: 2, stem: "The car reaches the top of the hill travelling at 30 m/s and continues on a level road with the same power and resistance. Find its acceleration at that instant.", value: (36000 / 30 - 710) / 1000, unit: "m/s²", wrong: [0],
          explanation: t`$F = \frac{36\,000}{30} = 1200$ N, now opposed only by 710 N: $a = \frac{490}{1000} = 0.49$ m s$^{-2}$.` }),
        P.num({ label: "(e)", marks: 2, stem: "Find the maximum speed of the car on the level road, correct to 3 significant figures.", value: 36000 / 710, unit: "m/s", wrong: [30],
          explanation: t`$v = \frac{36\,000}{710} = 50.7$ m s$^{-1}$.` }),
      ],
      explanation: "On the hill the engine works against R + mg sin θ; on the level only against R, so the car accelerates again until P/v = R.",
      hints: ["Uphill: driving force − R − mg sin θ = ma.", "On the level the weight component disappears."],
    });
  }

  b.card("DEFINITION", "Power", "The rate of doing work. Unit: the watt (W), 1 W = 1 J/s; 1 kW = 1000 W.");
  b.card("FORMULA", "Average power", t`$P = \dfrac{W}{t}$`);
  b.card("FORMULA", "Power of a vehicle", t`$P = Fv$, where $F$ is the driving force and $v$ the speed.`);
  b.card("FORMULA", "Maximum speed on a level road", t`$v_{\max} = \dfrac{P}{R}$ (driving force = resistance).`);
  b.card("FORMULA", "Acceleration at speed v", t`$\dfrac{P}{v} - R = ma$ (level road).`);
  b.card("FORMULA", "Maximum speed uphill", t`$v_{\max} = \dfrac{P}{R + mg\sin\theta}$`);
  b.card("CONCEPT", "Constant power and driving force", "At constant power the driving force P/v falls as the speed rises, so the acceleration falls.");
  b.card("FACT", "Units in P = Fv", "Power in watts, force in newtons, speed in m/s: convert kW and km/h first.");
});
