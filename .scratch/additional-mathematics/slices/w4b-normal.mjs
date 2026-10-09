// W4b: amath.distributions.normal (ZIMSEC only)
import { concept, P, t, chk, phiTable, Phi, invPhi, normalProb, dpStr, sfStr } from "../lib.mjs";

const NP = (mu, s, lo, hi) => normalProb(mu, s, lo ?? -Infinity, hi ?? Infinity);
const T = (z) => phiTable(z).toFixed(4);

concept("amath.distributions.normal", { file: "distributions/normal", keyPrefix: "distributions.normal" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`$X \sim N(30, 25)$. What is the standard deviation of $X$?`,
    options: [
      ["5", t`Correct: the second number is the variance, so $\sigma = \sqrt{25} = 5$.`],
      ["25", "25 is the variance; take its square root."],
      ["30", "30 is the mean."],
      ["625", "This squares the variance instead of square-rooting it."],
    ],
    answer: "A",
    explanation: t`In $N(\mu, \sigma^2)$ the second parameter is the variance. $\sigma^2 = 25$, so $\sigma = 5$.`,
  });

  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "Which statement about a normal distribution is false?",
    options: [
      ["The curve meets the horizontal axis at 3 standard deviations from the mean.", "Correct (this is the false statement): the curve approaches the axis but never touches it."],
      ["The curve is symmetrical about the mean.", "True: the bell is symmetrical about μ."],
      ["The mean, median and mode are equal.", "True, because of the symmetry."],
      ["About 95% of values lie within 2 standard deviations of the mean.", "True: about 95% lie within μ ± 2σ."],
    ],
    answer: "A",
    explanation: "Almost all (99.7%) of the area lies within 3 standard deviations, but the curve never actually reaches the axis.",
  });

  {
    const r = NP(0, 1, undefined, 0.83);
    chk(phiTable(0.83), 0.7967);
    b.num({
      d: 2, skill: "APPLICATION", calculator: true, daily: true,
      stem: t`$Z \sim N(0, 1)$. Find $P(Z < 0.83)$, correct to 4 decimal places.`,
      value: r.exact, tol: r.tol, answer: T(0.83), wrong: [1 - 0.7967],
      explanation: t`Read directly from the table: $\Phi(0.83) = 0.7967$.`,
    });
  }

  {
    const r = NP(0, 1, 1.47);
    chk(1 - phiTable(1.47), 0.0708, 1e-9);
    b.num({
      d: 2, skill: "APPLICATION", calculator: true, daily: true,
      stem: t`$Z \sim N(0, 1)$. Find $P(Z > 1.47)$, correct to 4 decimal places.`,
      value: r.exact, tol: r.tol, answer: "0.0708", wrong: [0.9292],
      explanation: t`$P(Z > 1.47) = 1 - \Phi(1.47) = 1 - 0.9292 = 0.0708$. 0.9292 is the area to the left.`,
    });
  }

  {
    const r = NP(0, 1, undefined, -1.08);
    chk(1 - phiTable(1.08), 0.1401, 1e-9);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`$Z \sim N(0, 1)$. Find $P(Z < -1.08)$, correct to 4 decimal places.`,
      value: r.exact, tol: r.tol, answer: "0.1401", wrong: [0.8599],
      explanation: t`By symmetry $P(Z < -1.08) = P(Z > 1.08) = 1 - \Phi(1.08) = 1 - 0.8599 = 0.1401$.`,
      hints: ["Sketch the curve: the area left of a negative z is a small tail."],
    });
  }

  {
    const r = NP(0, 1, -1.3, 0.42);
    chk(phiTable(0.42) - (1 - phiTable(1.3)), 0.566, 1e-9);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`$Z \sim N(0, 1)$. Find $P(-1.3 < Z < 0.42)$, correct to 4 decimal places.`,
      value: r.exact, tol: r.tol, answer: "0.5660", wrong: [0.6628 - 0.9032, 0.6628 + 0.0968],
      explanation: t`$\Phi(0.42) - P(Z < -1.3) = 0.6628 - (1 - 0.9032) = 0.6628 - 0.0968 = 0.5660$.`,
      hints: [t`$P(Z < -1.3) = 1 - \Phi(1.3)$.`],
    });
  }

  {
    const r = NP(72, 6, undefined, 80);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`The marks in a district Mathematics test are modelled by $X \sim N(72, 36)$. Find the probability that a candidate chosen at random scored less than 80, correct to 3 significant figures.`,
      value: r.exact, tol: r.tol, wrong: [1 - r.exact, Phi(8 / 36)],
      explanation: t`$\sigma = 6$, $z = \frac{80 - 72}{6} = 1.33$. $P(Z < 1.33) = ${T(1.33)}$ (a calculator gives ${sfStr(r.exact, 4)}), about 0.908 or 0.909. Using 36 as $\sigma$ gives $z = 0.22$.`,
      hints: ["Take the square root of 36 first."],
    });
  }

  {
    const r = NP(1.65, 0.08, 1.77);
    chk(1 - phiTable(1.5), 0.0668, 1e-9);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`The heights, in metres, of adult men in a town are modelled by $N(1.65, 0.0064)$. Find the probability that a man chosen at random is taller than 1.77 m, correct to 3 significant figures.`,
      value: r.exact, tol: r.tol, wrong: [0.9332, 1 - Phi(0.12 / 0.0064)],
      explanation: t`$\sigma = \sqrt{0.0064} = 0.08$. $z = \frac{1.77 - 1.65}{0.08} = 1.5$. $P(Z > 1.5) = 1 - 0.9332 = 0.0668$.`,
      hints: [t`$\sqrt{0.0064} = 0.08$.`],
    });
  }

  {
    const r = NP(250, 8, 240, 262);
    chk(phiTable(1.5) - (1 - phiTable(1.25)), 0.8276, 1e-9);
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`The mass, in grams, of sugar in a packet is $X \sim N(250, 64)$. Find the probability that a packet chosen at random contains between 240 g and 262 g, correct to 3 significant figures.`,
      value: r.exact, tol: r.tol, wrong: [0.9332 - 0.8944, 0.9332 + 0.1056],
      explanation: t`$\sigma = 8$. $z_1 = \frac{240 - 250}{8} = -1.25$, $z_2 = \frac{262 - 250}{8} = 1.5$. $P = \Phi(1.5) - [1 - \Phi(1.25)] = 0.9332 - 0.1056 = 0.8276 \approx 0.828$. Subtracting $\Phi(1.25)$ directly gives 0.0388, which ignores the negative sign of $z_1$.`,
      hints: ["Standardise both boundaries.", "One z-value is negative: use symmetry."],
    });
  }

  {
    const z = invPhi(0.8);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`$Z \sim N(0, 1)$. Find the value of $z$ such that $P(Z < z) = 0.8$, correct to 2 decimal places.`,
      value: z, dp: 2, wrong: [-0.84, 0.79],
      explanation: t`Look inside the table for 0.8: $\Phi(0.84) = 0.7995$ and $\Phi(0.85) = 0.8023$, so $z \approx 0.84$ (more precisely 0.8416). As the probability is above 0.5, $z$ is positive.`,
      hints: ["Read the table backwards: find 0.8 in the body of the table."],
    });
  }

  {
    const z = invPhi(0.9), x = 120 + z * 15;
    b.num({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`The time, in minutes, that a minibus takes from Harare to Kadoma is $X \sim N(120, 225)$. Find the time that is exceeded by only 10% of journeys, correct to 3 significant figures.`,
      value: x, unit: "min", tol: 0.6, answer: sfStr(x, 3), wrong: [120 - z * 15, 120 + z * 225],
      explanation: t`$P(X > x) = 0.1$, so $P(X < x) = 0.9$ and $z = 1.282$. $\sigma = 15$, so $x = 120 + 1.282 \times 15 = 139.2 \approx 139$ minutes. Using $-1.282$ gives 101 minutes, the time exceeded by 90% of journeys.`,
      hints: ["Exceeded by 10% means 90% are below it.", t`$x = \mu + z\sigma$.`],
    });
  }

  {
    const z = invPhi(0.25), x = 65 + z * 7;
    b.num({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`$X \sim N(65, 49)$. Find $x$ such that $P(X < x) = 0.25$, correct to 3 significant figures.`,
      value: x, tol: 0.06, answer: sfStr(x, 3), wrong: [65 - z * 7, 65 + z * 49],
      explanation: t`$\Phi(0.674) = 0.75$, so $P(Z < -0.674) = 0.25$ and $z = -0.674$ (negative, because the area to the left is below 0.5). $x = 65 - 0.674 \times 7 = 60.3$. Using $+0.674$ gives 69.7, the upper quartile.`,
      hints: ["The area to the left is less than 0.5, so z is negative."],
    });
  }

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`If $X \sim N(\mu, \sigma^2)$, then $P(X < \mu) = 0.5$.`,
    answer: true,
    explanation: t`True. The normal curve is symmetrical about $\mu$, so half the area lies on each side of the mean.`,
  });

  b.tf({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`If $X \sim N(40, 9)$, about 95% of the values of $X$ lie between 34 and 46.`,
    answer: true,
    explanation: t`True. $\sigma = 3$, and about 95% of values lie within 2 standard deviations of the mean: $40 \pm 6$, from 34 to 46.`,
  });

  {
    const p = 1 - phiTable(2);
    chk(p, 0.0228, 1e-9);
    const e = 500 * p;
    chk(e, 11.4, 1e-9);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "The masses of bags of maize meal are normally distributed with mean 10.1 kg and standard deviation 0.05 kg. A shop in Chitungwiza buys 500 bags. About how many of them would be expected to weigh less than 10 kg?",
      options: [
        ["11", t`Correct: $z = \frac{10 - 10.1}{0.05} = -2$, $P = 0.0228$, and $500 \times 0.0228 \approx 11$.`],
        ["23", "This uses P = 0.0456, the probability of being more than 2 standard deviations away on either side."],
        ["489", "This is the number expected to weigh more than 10 kg."],
        ["114", "This uses 0.228 instead of 0.0228: the decimal point has slipped."],
      ],
      answer: "A",
      explanation: t`$P(X < 10) = P(Z < -2) = 1 - \Phi(2) = 0.0228$. Expected number $= 500 \times 0.0228 = 11.4$, about 11 bags.`,
      hints: ["Find the probability for one bag, then multiply by 500."],
    });
  }

  {
    const p1 = phiTable(1), p0 = 0.5;
    chk(p1, 0.8413); chk(2 * p1 - 1, 0.6826, 1e-9);
    b.match({
      d: 2, skill: "APPLICATION", calculator: false,
      stem: t`$Z \sim N(0, 1)$ and $\Phi(1) = 0.8413$. Match each probability with its value.`,
      pairs: [
        [t`$P(Z < 1)$`, "0.8413"],
        [t`$P(Z > 1)$`, "0.1587"],
        [t`$P(-1 < Z < 1)$`, "0.6826"],
        [t`$P(Z < 0)$`, String(p0)],
      ],
      explanation: t`$P(Z > 1) = 1 - 0.8413$; $P(-1 < Z < 1) = 0.8413 - 0.1587 = 0.6826$ (the "68%" rule); $P(Z < 0) = 0.5$ by symmetry.`,
    });
  }

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 3,
    stem: t`$X \sim N(80, 25)$. Describe the sketch of the probability density curve of $X$ that you would draw, giving key values on the horizontal axis.`,
    points: [
      t`A symmetrical bell-shaped curve with its highest point (peak) at $x = 80$.`,
      t`Almost all of the area between $80 - 3 \times 5 = 65$ and $80 + 3 \times 5 = 95$ (with 75 and 85, 70 and 90 marking 1 and 2 standard deviations).`,
      "The tails get closer and closer to the horizontal axis but never touch it.",
    ],
    modelAnswer: "A bell-shaped curve, symmetrical about the vertical line x = 80 where it peaks. The standard deviation is 5, so the curve is spread out from about 65 to 95 (three standard deviations each side), with 75 and 85 one standard deviation away. The tails approach the horizontal axis without touching it.",
    explanation: t`$\sigma = \sqrt{25} = 5$.`,
    hints: ["The standard deviation is the square root of 25."],
  });

  {
    const pA = NP(180, 20, 214), pB = NP(180, 20, 165, 195), z = invPhi(0.85), h = 180 + 20 * z;
    chk(1 - phiTable(1.7), 0.0446, 1e-9); chk(2 * phiTable(0.75) - 1, 0.5468, 1e-9);
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true, examStyle: true,
      stem: t`At a research station near Chinhoyi, the heights of maize plants, in cm, eight weeks after planting are modelled by $X \sim N(180, 400)$.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Find the probability that a plant chosen at random is taller than 214 cm, correct to 3 significant figures.", value: pA.exact, tol: pA.tol, wrong: [0.9554],
          explanation: t`$\sigma = 20$, $z = \frac{214 - 180}{20} = 1.7$, $P = 1 - 0.9554 = 0.0446$.` }),
        P.num({ label: "(b)", marks: 3, stem: "Find the probability that a plant is between 165 cm and 195 cm tall, correct to 3 significant figures.", value: pB.exact, tol: pB.tol, wrong: [0.7734 - 0.5, 0.7734],
          explanation: t`$z_1 = -0.75$, $z_2 = 0.75$. $P = 0.7734 - (1 - 0.7734) = 0.7734 - 0.2266 = 0.5468 \approx 0.547$.` }),
        P.num({ label: "(c)", marks: 1, stem: "The station has 600 plants. Estimate how many are taller than 214 cm.", value: 600 * pA.exact, tol: 0.5, answer: "27", wrong: [573],
          explanation: t`$600 \times 0.0446 = 26.8$, about 27 plants.` }),
        P.num({ label: "(d)", marks: 3, stem: "The tallest 15% of plants are selected for seed. Find the least height of a selected plant, correct to 3 significant figures.", value: h, tol: 0.5, answer: sfStr(h, 3), wrong: [180 - 20 * z, 180 + 400 * z],
          explanation: t`$P(X > h) = 0.15$, so $\Phi(z) = 0.85$ and $z = 1.036$. $h = 180 + 1.036 \times 20 = 200.7 \approx 201$ cm.` }),
      ],
      explanation: "Take σ = √400 = 20, standardise, use the tables both ways, and multiply by 600 for an expected number.",
      hints: [t`$\sigma = \sqrt{400}$.`, "Top 15% means 85% are below the cut-off."],
    });
  }

  {
    const pA = NP(210, 12, undefined, 200), pB = NP(210, 12, 230), z = invPhi(0.8), tt = 210 + 12 * z;
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true, examStyle: true,
      stem: t`The journey time, in minutes, of a kombi from Harare to Mutare is modelled by $X \sim N(210, 144)$.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Find the probability that a journey takes less than 200 minutes, correct to 3 significant figures.", value: pA.exact, tol: pA.tol, wrong: [1 - pA.exact],
          explanation: t`$\sigma = 12$, $z = \frac{200 - 210}{12} = -0.83$. $P(Z < -0.83) = 1 - ${T(0.83)} = ${dpStr(1 - phiTable(0.83), 4)}$ (calculator: ${sfStr(pA.exact, 3)}).` }),
        P.num({ label: "(b)", marks: 2, stem: "Find the probability that a journey takes more than 230 minutes, correct to 3 significant figures.", value: pB.exact, tol: pB.tol, wrong: [1 - pB.exact],
          explanation: t`$z = \frac{230 - 210}{12} = 1.67$. $P = 1 - ${T(1.67)} = ${dpStr(1 - phiTable(1.67), 4)}$ (calculator: ${sfStr(pB.exact, 3)}).` }),
        P.num({ label: "(c)", marks: 3, stem: "Find the time t such that 80% of journeys take less than t minutes, correct to 3 significant figures.", value: tt, unit: "min", tol: 0.15, answer: sfStr(tt, 3), wrong: [210 - 12 * z],
          explanation: t`$\Phi(z) = 0.8$ gives $z = 0.8416$. $t = 210 + 0.8416 \times 12 = 220.1 \approx 220$ minutes.` }),
      ],
      explanation: "Standardise with σ = 12 and use the tables forwards for probabilities and backwards for t.",
      hints: [t`$\sigma = \sqrt{144} = 12$.`],
    });
  }

  // flashcards
  b.card("DEFINITION", t`$N(\mu, \sigma^2)$`, t`A normal distribution with mean $\mu$ and **variance** $\sigma^2$; the standard deviation is $\sigma$.`);
  b.card("FORMULA", "Standardising", t`$Z = \dfrac{X - \mu}{\sigma}$`);
  b.card("FACT", "68–95–99.7 rule", "About 68%, 95% and 99.7% of a normal distribution lie within 1, 2 and 3 standard deviations of the mean.");
  b.card("FORMULA", "Greater than", t`$P(Z > a) = 1 - \Phi(a)$`);
  b.card("FORMULA", "Negative z", t`$\Phi(-a) = 1 - \Phi(a)$`);
  b.card("FORMULA", "Between two values", t`$P(a < Z < b) = \Phi(b) - \Phi(a)$`);
  b.card("CONCEPT", "Reverse use of the tables", t`Probability → read $z$ from inside the table → $x = \mu + z\sigma$. If the area to the left is below 0.5, $z$ is negative.`);
  b.card("FACT", "Useful z-values", t`$\Phi(1.645) = 0.95$, $\Phi(1.96) = 0.975$, $\Phi(2.576) = 0.995$.`);
  b.card("CONCEPT", "Properties of the normal curve", "Bell-shaped, symmetrical about the mean; mean = median = mode; the tails never touch the axis.");
});
