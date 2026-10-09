// W4b: amath.distributions.normal-parameters (ZIMSEC only)
import { concept, P, t, chk, invPhi, Phi, phiTable, sfStr, normalProb } from "../lib.mjs";

concept("amath.distributions.normal-parameters", { file: "distributions/normal-parameters", keyPrefix: "distributions.normal-parameters" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: true,
    stem: t`$X \sim N(\mu, \sigma^2)$ and $P(X < x) = 0.95$. Which value of $z = \dfrac{x - \mu}{\sigma}$ should be used?`,
    options: [
      ["1.645", t`Correct: $\Phi(1.645) = 0.95$.`],
      ["0.95", "0.95 is the probability; the equation needs the z-value from the tables."],
      ["1.96", t`$\Phi(1.96) = 0.975$, not 0.95.`],
      ["−1.645", "The area to the left is above 0.5, so x is above the mean and z is positive."],
    ],
    answer: "A",
    explanation: t`Look for 0.95 inside the table: $\Phi(1.645) = 0.95$, so $z = 1.645$.`,
  });

  {
    chk(phiTable(1.5), 0.9332);
    const mu = 30 - 1.5 * 4;
    chk(mu, 24);
    b.num({
      d: 2, skill: "APPLICATION", calculator: true, daily: true,
      stem: t`$X \sim N(\mu, 16)$ and $P(X < 30) = 0.9332$. Find $\mu$.`,
      value: mu, wrong: [6, 36],
      explanation: t`$\Phi(1.5) = 0.9332$, so $\frac{30 - \mu}{4} = 1.5$, $30 - \mu = 6$ and $\mu = 24$. The answer 36 adds instead of subtracting.`,
    });
  }

  {
    chk(1 - phiTable(1), 0.1587, 1e-9);
    const s = (62 - 50) / 1;
    b.num({
      d: 2, skill: "APPLICATION", calculator: true, daily: true,
      stem: t`$X \sim N(50, \sigma^2)$ and $P(X > 62) = 0.1587$. Find $\sigma$.`,
      value: s, wrong: [144, 6],
      explanation: t`The area to the left of 62 is $1 - 0.1587 = 0.8413 = \Phi(1)$, so $z = 1$. $\frac{62 - 50}{\sigma} = 1$ gives $\sigma = 12$. 144 is the variance.`,
    });
  }

  {
    const z = invPhi(0.2), mu = 20 - z * 3;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`$X \sim N(\mu, 9)$ and $P(X < 20) = 0.2$. Find $\mu$, correct to 3 significant figures.`,
      value: mu, tol: 0.06, answer: sfStr(mu, 3), wrong: [20 + z * 3, 20 - z * 9],
      explanation: t`The area to the left is below 0.5, so $z$ is negative: $\Phi(0.8416) = 0.8$ gives $z = -0.8416$. $\frac{20 - \mu}{3} = -0.8416$, so $\mu = 20 + 2.525 = 22.5$. A positive $z$ gives 17.5, which would put most of the distribution below 20.`,
      hints: ["Is 20 above or below the mean?"],
    });
  }

  {
    const z = invPhi(0.35), s = 5 / -z;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`$X \sim N(75, \sigma^2)$ and $P(X < 70) = 0.35$. Find $\sigma$, correct to 3 significant figures.`,
      value: s, tol: 0.1, answer: sfStr(s, 3), wrong: [5 / 0.35, -s],
      explanation: t`$\Phi(0.385) = 0.65$, so $P(Z < -0.385) = 0.35$ and $z = -0.385$. $\frac{70 - 75}{\sigma} = -0.385$, so $\sigma = \frac{5}{0.385} = ${sfStr(s, 3)}$. Dividing by 0.35 (the probability) gives 14.3.`,
      hints: ["The area to the left is 0.35, below 0.5: z is negative."],
    });
  }

  {
    const z1 = invPhi(0.05), z2 = invPhi(0.9);
    const s = 30 / (z2 - z1), mu = 40 - z1 * s;
    chk(Phi((40 - mu) / s), 0.05, 1e-9); chk(1 - Phi((70 - mu) / s), 0.1, 1e-9);
    b.fib({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`$X \sim N(\mu, \sigma^2)$, $P(X < 40) = 0.05$ and $P(X > 70) = 0.1$. Find $\mu$ and $\sigma$, each correct to 3 significant figures.`,
      template: "μ = {{blank:m}}, σ = {{blank:s}}",
      blanks: [
        { id: "m", input: "number", accepted: [Number(sfStr(mu, 3))], tolerance: 0.1, wrong: "55" },
        { id: "s", input: "number", accepted: [Number(sfStr(s, 3))], tolerance: 0.03, wrong: "15" },
      ],
      explanation: t`$40 = \mu - 1.645\sigma$ and $70 = \mu + 1.282\sigma$. Subtracting: $30 = 2.927\sigma$, so $\sigma = ${sfStr(s, 4)}$ and $\mu = 40 + 1.645 \times ${sfStr(s, 4)} = ${sfStr(mu, 4)}$. So $\mu \approx ${sfStr(mu, 3)}$ and $\sigma \approx ${sfStr(s, 3)}$.`,
      hints: ["Write two equations of the form x = μ + zσ.", "Subtract them to eliminate μ."],
    });
  }

  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`For a normal random variable $X$, $P(X < 20) = 0.15$ and $P(X > 50) = 0.15$. What is the mean of $X$?`,
    options: [
      ["35", "Correct: equal tails mean 20 and 50 are equally far from the mean, so μ is half-way."],
      ["30", "30 is not half-way between 20 and 50."],
      ["15", "15 is the distance from each value to the mean, not the mean itself."],
      ["It cannot be found without knowing σ", "Symmetry alone fixes the mean here."],
    ],
    answer: "A",
    explanation: t`The normal curve is symmetrical about $\mu$. Equal tail areas below 20 and above 50 put $\mu$ midway: $\frac{20 + 50}{2} = 35$. (Then $\sigma = \frac{15}{1.036} \approx 14.5$.)`,
    hints: ["Use the symmetry of the normal curve."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`$X$ is normally distributed and $P(X > 80) = 0.3$. Then 80 is greater than the mean of $X$.`,
    answer: true,
    explanation: t`True. Less than half the area lies above 80, so 80 is to the right of the peak at $\mu$. Its $z$-value is positive (about 0.524).`,
  });

  b.tf({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`$X \sim N(\mu, \sigma^2)$ and $P(X < x) = 0.4$. Then $\dfrac{x - \mu}{\sigma}$ is positive.`,
    answer: false,
    explanation: t`False. The area to the left of $x$ is less than 0.5, so $x$ is below the mean and $z = \frac{x - \mu}{\sigma}$ is negative (about $-0.253$).`,
    hints: ["Where is the mean in relation to x?"],
  });

  {
    const s = 1.5 / invPhi(0.95);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "Sacks of potatoes from a farm in Nyanga have masses that are normally distributed with mean 20 kg. 5% of the sacks weigh more than 21.5 kg. Find the standard deviation of the masses, correct to 3 significant figures.",
      value: s, unit: "kg", tol: 0.002, answer: sfStr(s, 3), wrong: [1.5 / 1.96, 1.5 / 0.05],
      explanation: t`$P(X > 21.5) = 0.05$ means $\Phi(z) = 0.95$, so $z = 1.645$. $\frac{21.5 - 20}{\sigma} = 1.645$, so $\sigma = \frac{1.5}{1.645} = ${sfStr(s, 3)}$ kg. Using 1.96 (the two-tailed 5% value) gives 0.765.`,
      hints: ["Only the upper tail has 5%: use 1.645, not 1.96."],
    });
  }

  {
    const z = 2.326, mu = 500 + z * 4;
    chk(mu, 509.304, 1e-9);
    b.num({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: "A machine at a dairy in Marondera fills bottles with milk. The volume is normally distributed with standard deviation 4 ml. Find the least mean volume the machine should be set to so that only 1% of bottles contain less than 500 ml. Give your answer correct to 4 significant figures.",
      value: mu, sf: 4, wrong: [500 - z * 4, 500 + 1.96 * 4],
      explanation: t`$P(X < 500) = 0.01$, so $z = -2.326$ ($\Phi(2.326) = 0.99$). $\frac{500 - \mu}{4} = -2.326$ gives $\mu = 500 + 9.304 = 509.3$ ml. A mean of 490.7 would make most bottles under-filled.`,
      hints: ["500 ml must be well below the mean: z is negative."],
    });
  }

  b.match({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: t`$X \sim N(\mu, \sigma^2)$. Match each statement with the value of $z = \dfrac{x - \mu}{\sigma}$.`,
    pairs: [
      [t`$P(X < x) = 0.975$`, "1.96"],
      [t`$P(X > x) = 0.975$`, "−1.96"],
      [t`$P(X < x) = 0.95$`, "1.645"],
      [t`$P(X > x) = 0.95$`, "−1.645"],
      [t`$P(X < x) = 0.5$`, "0"],
    ],
    explanation: t`$\Phi(1.96) = 0.975$ and $\Phi(1.645) = 0.95$. When the given area is to the right, $x$ is below the mean and $z$ is negative. Half the area below $x$ means $x = \mu$.`,
  });

  b.manualShort({
    d: 3, skill: "EVALUATION", calculator: false, marks: 2,
    stem: t`Tatenda is told that $X \sim N(40, \sigma^2)$ and $P(X > 34) = 0.84$. He writes $\frac{34 - 40}{\sigma} = 0.994$ and gets $\sigma = -6.04$. Explain his mistake and give the correct equation.`,
    points: [
      t`A standard deviation cannot be negative; 34 is below the mean (more than half the area is above it), so $z$ must be negative.`,
      t`Correct equation: area to the left of 34 is $1 - 0.84 = 0.16$, so $z = -0.994$ and $\frac{34 - 40}{\sigma} = -0.994$, giving $\sigma = 6.04$.`,
    ],
    modelAnswer: t`Since $P(X > 34) = 0.84 > 0.5$, the value 34 is below the mean and its $z$-value is negative. The area to the left is 0.16, so $z = -0.994$ and $\frac{34 - 40}{\sigma} = -0.994$, which gives $\sigma \approx 6.04$ (positive, as it must be).`,
    explanation: "A sketch of the bell curve shows which side of the mean the value lies.",
    hints: ["Can a standard deviation be negative?"],
  });

  {
    const z1 = invPhi(0.9), z2 = invPhi(0.2);
    chk(z1, 1.282, 1e-3); chk(z2, -0.842, 1e-3);
    b.proof({
      d: 4, skill: "APPLICATION", calculator: true, marks: 3,
      stem: t`$X \sim N(\mu, \sigma^2)$, $P(X > 67) = 0.1$ and $P(X < 46) = 0.2$. Show that $\mu + 1.282\sigma = 67$ and $\mu - 0.842\sigma = 46$.`,
      points: [
        t`B1 states $\Phi(1.282) = 0.9$, so $\frac{67 - \mu}{\sigma} = 1.282$ (area to the left of 67 is 0.9).`,
        t`B1 states $\Phi(0.842) = 0.8$, so $\frac{46 - \mu}{\sigma} = -0.842$ (46 is below the mean).`,
        t`A1 rearranges both to the given forms.`,
      ],
      modelAnswer: t`$$
P(X < 67) = 0.9 \Rightarrow \frac{67 - \mu}{\sigma} = 1.282 \Rightarrow \mu + 1.282\sigma = 67
$$

$$
P(X < 46) = 0.2 \Rightarrow \frac{46 - \mu}{\sigma} = -0.842 \Rightarrow \mu - 0.842\sigma = 46
$$`,
      explanation: "Each probability gives one equation x = μ + zσ.",
      hints: ["Convert each probability to an area to the left first."],
    });
  }

  {
    const z1 = invPhi(0.9), z2 = invPhi(0.2);
    const s = 0.3 / (z1 - z2), mu = 8.2 - z1 * s;
    chk(Phi((7.9 - mu) / s), 0.2, 1e-9);
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true, examStyle: true,
      stem: "The lengths of bolts made by a machine in Harare are normally distributed. 10% of the bolts are longer than 8.2 cm and 20% are shorter than 7.9 cm.",
      parts: [
        P.proof({ label: "(a)", marks: 2, stem: t`Write down two equations connecting the mean $\mu$ and the standard deviation $\sigma$.`,
          points: [t`B1 $\frac{8.2 - \mu}{\sigma} = 1.282$, i.e. $\mu + 1.282\sigma = 8.2$.`, t`B1 $\frac{7.9 - \mu}{\sigma} = -0.842$, i.e. $\mu - 0.842\sigma = 7.9$.`],
          modelAnswer: t`$$
\mu + 1.282\sigma = 8.2, \qquad \mu - 0.842\sigma = 7.9
$$`,
          explanation: t`$\Phi(1.282) = 0.9$ and $\Phi(0.842) = 0.8$.` }),
        P.num({ label: "(b)", marks: 3, stem: t`Find $\sigma$, correct to 3 significant figures.`, value: s, unit: "cm", tol: 0.001, answer: sfStr(s, 3), wrong: [0.3 / (z1 + z2)],
          explanation: t`Subtract: $2.124\sigma = 0.3$, so $\sigma = ${sfStr(s, 3)}$ cm.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Find $\mu$, correct to 3 significant figures.`, value: mu, unit: "cm", tol: 0.005, answer: sfStr(mu, 3), wrong: [8.05],
          explanation: t`$\mu = 8.2 - 1.282 \times ${sfStr(s, 4)} = ${sfStr(mu, 4)} \approx ${sfStr(mu, 3)}$ cm.` }),
        P.num({ label: "(d)", marks: 2, stem: "Find the probability that a bolt chosen at random is between 7.9 cm and 8.2 cm long.", value: 0.7, wrong: [0.3, 0.1],
          explanation: t`No tables are needed: $1 - 0.1 - 0.2 = 0.7$.` }),
      ],
      explanation: "Each tail probability gives an equation x = μ + zσ; solve them simultaneously.",
      hints: ["Shorter than 7.9 cm with probability 0.2: z is negative.", "Subtract the equations to find σ."],
    });
  }

  {
    const z1 = invPhi(0.3), z2 = invPhi(0.85);
    const s = 10 / (z2 - z1), mu = 55 - z1 * s;
    const r = normalProb(mu, s, 60);
    b.struct({
      d: 5, skill: "ANALYSIS", calculator: true, examStyle: true,
      stem: "The masses of eggs from a poultry farm in Chegutu are normally distributed. 30% of the eggs weigh less than 55 g and 15% weigh more than 65 g.",
      parts: [
        P.num({ label: "(a)", marks: 3, stem: t`Find the standard deviation $\sigma$, correct to 3 significant figures.`, value: s, unit: "g", tol: 0.03, answer: sfStr(s, 3), wrong: [10 / (z2 + z1)],
          explanation: t`$55 = \mu - 0.524\sigma$ and $65 = \mu + 1.036\sigma$. Subtracting: $1.560\sigma = 10$, so $\sigma = ${sfStr(s, 3)}$ g.` }),
        P.num({ label: "(b)", marks: 2, stem: t`Find the mean $\mu$, correct to 3 significant figures.`, value: mu, unit: "g", tol: 0.06, answer: sfStr(mu, 3), wrong: [60],
          explanation: t`$\mu = 55 + 0.524 \times ${sfStr(s, 4)} = ${sfStr(mu, 4)} \approx ${sfStr(mu, 3)}$ g.` }),
        P.num({ label: "(c)", marks: 2, stem: "Find the probability that an egg weighs more than 60 g, correct to 3 significant figures.", value: r.exact, tol: 0.006, wrong: [1 - r.exact],
          explanation: t`$z = \frac{60 - ${sfStr(mu, 4)}}{${sfStr(s, 4)}} = ${((60 - mu) / s).toFixed(3)}$, so $P = 1 - \Phi(${((60 - mu) / s).toFixed(2)}) \approx ${sfStr(r.exact, 3)}$.` }),
      ],
      explanation: "Form two equations from the tail probabilities, solve for σ and μ, then standardise for the new probability.",
      hints: [t`$\Phi(0.524) = 0.7$ and $\Phi(1.036) = 0.85$.`],
    });
  }

  // flashcards
  b.card("FORMULA", "Linking x, μ, σ and z", t`$x = \mu + z\sigma$, from $z = \dfrac{x - \mu}{\sigma}$`);
  b.card("CONCEPT", "Reverse normal method", "Turn the probability into an area to the left, read z from the table (negative if the area is below 0.5), then solve (x − μ)/σ = z.");
  b.card("CONCEPT", "Two unknowns", "Two probabilities give two equations μ + zσ = x; subtract them to find σ, then substitute for μ.");
  b.card("FACT", "Common inverse values", t`$\Phi(1.282) = 0.9$, $\Phi(1.645) = 0.95$, $\Phi(1.96) = 0.975$, $\Phi(2.326) = 0.99$.`);
  b.card("CONCEPT", "Sign of z", "A value below the mean has a negative z. If σ comes out negative, a sign is wrong.");
  b.card("CONCEPT", "Equal tails", "If P(X < a) = P(X > b), then the mean is half-way between a and b.");
  b.card("CONCEPT", "Right-hand tail given", t`For $P(X > x) = p$, look up $1 - p$ in the table.`);
  b.card("FACT", "Filling machines", "To keep under-filling rare, the mean must be set above the stated amount: μ = stated amount + zσ.");
});
