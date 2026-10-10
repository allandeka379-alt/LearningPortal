// W3a: amaths.normal.inverse-parameters (z from invPhi; each answer also computed with z rounded to 3 d.p., as from tables)
import { concept, P, t, chk, invPhi, Phi, round, sfStr, dpFor, halfUnit } from "../lib.mjs";

const S3 = (x) => sfStr(x, 3);
const zt = (p) => round(invPhi(p), 3); // table value to 3 d.p.
/** Tolerance accepting the calculator value and the 3-d.p.-z value, plus half a unit in the 3rd s.f. */
const tolOf = (exact, table) => Number((Math.abs(exact - table) + halfUnit(dpFor(exact, 3))).toPrecision(2));

concept("amaths.normal.inverse-parameters", { file: "normal/inverse-parameters", keyPrefix: "normal.inverse-parameters" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`Which value of $z$ satisfies $\Phi(z) = 0.95$?`,
    options: [
      ["1.645", t`Correct: 95% of the standard normal distribution lies below 1.645.`],
      ["1.960", t`$\Phi(1.960) = 0.975$; 1.960 cuts off 2.5% in each tail.`],
      ["0.8289", t`This is $\Phi(0.95)$, reading the table the wrong way round.`],
      ["−1.645", t`$\Phi(-1.645) = 0.05$, the lower tail.`],
    ],
    answer: "A",
    explanation: t`$\Phi^{-1}(0.95) = 1.645$, one of the critical values printed in MF19.`,
  });
  chk(zt(0.95), 1.645); chk(round(Phi(0.95), 4), 0.8289); chk(zt(0.975), 1.96);

  // find x above
  const x1 = 48 + 7 * invPhi(0.8), x1t = 48 + 7 * zt(0.8);
  b.num({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: t`$X \sim \mathrm{N}(48, 7^2)$. Find the value of $a$ such that $\mathrm{P}(X < a) = 0.8$, correct to 3 significant figures.`,
    value: x1, tol: tolOf(x1, x1t), wrong: [Number(S3(48 - 7 * invPhi(0.8))), Number(S3(48 + 7 * 0.8))],
    explanation: t`$\Phi^{-1}(0.8) = ${zt(0.8)}$. $\frac{a - 48}{7} = ${zt(0.8)}$, so $a = 48 + 7 \times ${zt(0.8)} = ${S3(x1)}$. ($${S3(48 + 7 * 0.8)}$ uses the probability 0.8 as if it were $z$.)`,
  });

  // find x below
  const x2 = 250 - 12 * invPhi(0.93), x2t = 250 - 12 * zt(0.93);
  b.num({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: "The masses of potatoes from a farm in Nyanga are normally distributed with mean 250 g and standard deviation 12 g. Find the mass below which 7% of the potatoes lie, correct to 3 significant figures.",
    value: x2, tol: tolOf(x2, x2t), wrong: [Number(S3(250 + 12 * invPhi(0.93)))],
    explanation: t`7% below means 93% above: $z = -\Phi^{-1}(0.93) = -${zt(0.93)}$. $m = 250 - 12 \times ${zt(0.93)} = ${S3(x2)}$ g. ($${S3(250 + 12 * invPhi(0.93))}$ has the wrong sign: it is above the mean.)`,
    hints: ["The value is below the mean, so z is negative."],
  });

  // find sigma
  const s3v = (95 - 80) / invPhi(0.96), s3t = 15 / zt(0.96);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`$X \sim \mathrm{N}(80, \sigma^2)$ and $\mathrm{P}(X > 95) = 0.04$. Find $\sigma$, correct to 3 significant figures.`,
    value: s3v, tol: tolOf(s3v, s3t), wrong: [Number(S3(15 / 0.96)), Number(S3((15 / invPhi(0.96)) ** 2))],
    explanation: t`$\mathrm{P}(X < 95) = 0.96$, so $\frac{95 - 80}{\sigma} = ${zt(0.96)}$ and $\sigma = \frac{15}{${zt(0.96)}} = ${S3(s3v)}$. ($${S3(15 / 0.96)}$ divides by the probability instead of the $z$ value.)`,
    hints: [t`Find $z$ with $\Phi(z) = 0.96$.`],
  });

  // find mu
  const m4 = 25 + 3 * invPhi(0.9), m4t = 25 + 3 * zt(0.9);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "The masses of newborn calves on a ranch near Gwanda are normally distributed with standard deviation 3 kg. Ten per cent of the calves weigh less than 25 kg. Find the mean mass, correct to 3 significant figures.",
    value: m4, tol: tolOf(m4, m4t), unit: "kg", wrong: [Number(S3(25 - 3 * invPhi(0.9)))],
    explanation: t`$\frac{25 - \mu}{3} = -${zt(0.9)}$, so $\mu = 25 + 3 \times ${zt(0.9)} = ${S3(m4)}$ kg. ($${S3(25 - 3 * invPhi(0.9))}$ kg has the wrong sign: the mean must be above 25 kg.)`,
    hints: ["25 kg is below the mean, so z = −1.282."],
  });

  // both parameters
  const zA = invPhi(0.9), zB = invPhi(0.75);
  const sig = (130 - 105) / (zA + zB), mu = 130 - zA * sig;
  const sigT = 25 / (zt(0.9) + zt(0.75)), muT = 130 - zt(0.9) * sigT;
  chk(Phi((105 - mu) / sig), 0.25, 1e-9); chk(1 - Phi((130 - mu) / sig), 0.1, 1e-9);
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: "The times taken by learners at a school in Mutare to run a cross-country course are normally distributed. 25% of learners take less than 105 minutes and 10% take more than 130 minutes. Find the mean and the standard deviation of the times, each correct to 3 significant figures.",
    template: "mean {{blank:m}} minutes; standard deviation {{blank:s}} minutes",
    blanks: [
      { id: "m", input: "number", accepted: [S3(mu)], tolerance: tolOf(mu, muT), wrong: S3(130 - 25 / 2) },
      { id: "s", input: "number", accepted: [S3(sig)], tolerance: tolOf(sig, sigT), wrong: S3(25 / (zA - zB)) },
    ],
    explanation: t`$\frac{105 - \mu}{\sigma} = -${zt(0.75)}$ and $\frac{130 - \mu}{\sigma} = ${zt(0.9)}$. So $105 = \mu - ${zt(0.75)}\sigma$ and $130 = \mu + ${zt(0.9)}\sigma$. Subtracting: $25 = ${(zt(0.75) + zt(0.9)).toFixed(3)}\sigma$, $\sigma = ${S3(sig)}$; then $\mu = 130 - ${zt(0.9)} \times ${sfStr(sig, 4)} = ${S3(mu)}$. (A standard deviation of ${S3(25 / (zA - zB))} comes from giving both $z$ values the same sign.)`,
    hints: ["Write two equations of the form x = μ + zσ.", "The z for 105 is negative."],
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`$X \sim \mathrm{N}(\mu, \sigma^2)$ and $\mathrm{P}(X < 40) = 0.3$. Which equation is correct?`,
    options: [
      [t`$\frac{40 - \mu}{\sigma} = -0.524$`, t`Correct: 40 is below the mean, and $\Phi(0.524) = 0.7$.`],
      [t`$\frac{40 - \mu}{\sigma} = 0.524$`, "The sign is wrong: less than 30% lie below 40, so 40 is below the mean."],
      [t`$\frac{40 - \mu}{\sigma} = 0.3$`, "0.3 is a probability, not a z value."],
      [t`$\frac{40 - \mu}{\sigma} = -0.3$`, "0.3 is a probability, not a z value."],
    ],
    answer: "A",
    explanation: t`$\Phi(z) = 0.3 < 0.5$, so $z < 0$: $z = -\Phi^{-1}(0.7) = -${zt(0.7)}$.`,
  });
  chk(zt(0.7), 0.524);

  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`$X \sim \mathrm{N}(\mu, 16)$ and $\mathrm{P}(X > 30) = 0.5$. What is $\mu$?`,
    options: [
      ["30", "Correct: half the distribution lies above the mean, so μ = 30."],
      ["34", "This adds one standard deviation; z for a probability of 0.5 is 0."],
      ["14", "This subtracts the variance from 30."],
      ["32", "This adds half the standard deviation; z = 0 here."],
    ],
    answer: "A",
    explanation: t`$\Phi(z) = 0.5$ gives $z = 0$, so $\frac{30 - \mu}{4} = 0$ and $\mu = 30$.`,
    hints: ["Which z value has Φ(z) = 0.5?"],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`If $\mathrm{P}(X > a) = 0.2$ for $X \sim \mathrm{N}(\mu, \sigma^2)$, then $a$ is greater than $\mu$.`,
    answer: true,
    explanation: t`Only 20% lie above $a$, less than the 50% above $\mu$, so $a > \mu$ (here $a = \mu + 0.842\sigma$).`,
  });
  chk(zt(0.8), 0.842);

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "The interquartile range of any normal distribution is about 1.35 standard deviations.",
    answer: true,
    explanation: t`The quartiles are $\mu \pm 0.6745\sigma$, so the IQR is $1.349\sigma \approx 1.35\sigma$.`,
  });
  chk(round(2 * invPhi(0.75), 3), 1.349);

  // IQR -> sigma
  const s5 = 18 / (2 * invPhi(0.75)), s5t = 18 / (2 * zt(0.75));
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "The marks in a large examination are normally distributed with interquartile range 18 marks. Find the standard deviation of the marks, correct to 3 significant figures.",
    value: s5, tol: tolOf(s5, s5t), wrong: [9, Number(S3(18 / invPhi(0.75)))],
    explanation: t`The quartiles are $\mu \pm ${zt(0.75)}\sigma$, so $2 \times ${zt(0.75)}\sigma = 18$ and $\sigma = \frac{18}{${(2 * zt(0.75)).toFixed(3)}} = ${S3(s5)}$. ($${S3(18 / invPhi(0.75))}$ forgets the factor 2.)`,
    hints: ["Upper quartile: Φ(z) = 0.75."],
  });

  // percentage symmetrical interval
  const k6 = 4.2 * invPhi(0.95), k6t = 4.2 * zt(0.95);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`$X \sim \mathrm{N}(20, 4.2^2)$. Find the value of $k$ such that $\mathrm{P}(20 - k < X < 20 + k) = 0.9$, correct to 3 significant figures.`,
    value: k6, tol: tolOf(k6, k6t), wrong: [Number(S3(4.2 * invPhi(0.9)))],
    explanation: t`The middle 90% leaves 5% in each tail, so $\frac{k}{4.2} = \Phi^{-1}(0.95) = 1.645$ and $k = ${S3(k6)}$. ($${S3(4.2 * invPhi(0.9))}$ puts all 10% in one tail.)`,
    hints: ["Split the remaining 10% equally between the two tails."],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`Match each condition on $X \sim \mathrm{N}(\mu, \sigma^2)$ with the value of $\frac{a - \mu}{\sigma}$.`,
    pairs: [
      [t`$\mathrm{P}(X < a) = 0.975$`, "1.960"],
      [t`$\mathrm{P}(X > a) = 0.975$`, "−1.960"],
      [t`$\mathrm{P}(X > a) = 0.1$`, "1.282"],
      [t`$\mathrm{P}(X < a) = 0.1$`, "−1.282"],
    ],
    explanation: t`Convert to an area on the left: $\mathrm{P}(X < a) = 0.975 \Rightarrow z = 1.960$; $\mathrm{P}(X > a) = 0.975 \Rightarrow \Phi(z) = 0.025 \Rightarrow z = -1.960$; and similarly for 0.1.`,
  });

  b.manualShort({
    d: 3, marks: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`Explain why, when finding $\mu$ and $\sigma$ from two given probabilities, the two $z$ values usually have opposite signs, and say what it means if both are positive.`,
    points: ["Opposite signs when one given value is below the mean and the other above (e.g. 'x% less than a', 'y% more than b').", "Both positive means both values are above the mean (e.g. 'less than a' with probability over 0.5); the equations still work, but the signs must follow the sketch."],
    modelAnswer: "A lower tail probability below 0.5 puts its value below the mean (negative z) while an upper tail probability below 0.5 puts its value above the mean (positive z). If both given values are above the mean, for example P(X < a) = 0.7 and P(X > b) = 0.1, both z values are positive; a sketch shows which sign each takes.",
    explanation: "The sign of z follows from where the value lies relative to the mean.",
    hints: ["Sketch both values on one curve."],
  });

  // structured practice (5 marks)
  const zz = zt(0.88);
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, calculator: true,
    stem: t`A machine at a mill in Bulawayo fills bags with maize meal. The masses are normally distributed with mean 10.0 kg and standard deviation $\sigma$ kg. 12% of bags contain less than 9.4 kg.`,
    parts: [
      P.num({ label: "(a)", marks: 3, stem: "Find σ, correct to 3 significant figures.", value: 0.6 / invPhi(0.88), tol: tolOf(0.6 / invPhi(0.88), 0.6 / zz), wrong: [Number(S3(0.6 / 0.88))],
        explanation: t`$\frac{9.4 - 10}{\sigma} = -${zz}$, so $\sigma = \frac{0.6}{${zz}} = ${S3(0.6 / invPhi(0.88))}$ kg.` }),
      P.num({ label: "(b)", marks: 2, stem: "Find the probability that a bag contains more than 10.5 kg, correct to 3 significant figures.", value: 1 - Phi(0.5 / (0.6 / invPhi(0.88))), tol: 0.002, wrong: [Number(S3(Phi(0.5 / (0.6 / invPhi(0.88)))))],
        explanation: t`$z = \frac{10.5 - 10}{${S3(0.6 / invPhi(0.88))}} = ${(0.5 / (0.6 / invPhi(0.88))).toFixed(3)}$; $1 - \Phi(${(0.5 / (0.6 / invPhi(0.88))).toFixed(2)}) = ${S3(1 - Phi(0.5 / (0.6 / invPhi(0.88))))}$.` }),
    ],
    explanation: "Find σ from the given percentage, then use it forwards.",
    hints: ["9.4 kg is below the mean: z is negative."],
  });

  // structured practice (14 marks)
  const zL = invPhi(0.92), zU = invPhi(0.8);
  const sg = (64 - 40) / (zL + zU), m = 40 + zL * sg; // P(X<40)=0.08, P(X>64)=0.2
  const sgT = 24 / (zt(0.92) + zt(0.8)), mT = 40 + zt(0.92) * sgT;
  chk(Phi((40 - m) / sg), 0.08, 1e-9); chk(1 - Phi((64 - m) / sg), 0.2, 1e-9);
  const pMid = Phi((60 - m) / sg) - Phi((50 - m) / sg);
  const top5 = m + invPhi(0.95) * sg;
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: "The marks in a Form 6 Statistics test taken by learners across Masvingo province are modelled by a normal distribution. 8% of learners scored less than 40 marks and 20% scored more than 64 marks.",
    parts: [
      P.proof({ label: "(a)", marks: 3, stem: t`Show that $\mu - ${zt(0.92)}\sigma = 40$ and $\mu + ${zt(0.8)}\sigma = 64$.`,
        points: [t`M1 uses $\Phi^{-1}(0.92) = ${zt(0.92)}$ with a negative sign for 40.`, t`M1 uses $\Phi^{-1}(0.8) = ${zt(0.8)}$ for 64.`, "A1 rearranges both standardisations to the given equations."],
        modelAnswer: t`$$
\mathrm{P}(X < 40) = 0.08 \Rightarrow \frac{40 - \mu}{\sigma} = -${zt(0.92)} \Rightarrow \mu - ${zt(0.92)}\sigma = 40
$$
$$
\mathrm{P}(X > 64) = 0.2 \Rightarrow \frac{64 - \mu}{\sigma} = ${zt(0.8)} \Rightarrow \mu + ${zt(0.8)}\sigma = 64
$$` }),
      P.fib({ label: "(b)", marks: 4, stem: "Hence find μ and σ, each correct to 3 significant figures.", template: "μ = {{blank:m}}; σ = {{blank:s}}",
        blanks: [
          { id: "m", input: "number", accepted: [S3(m)], tolerance: tolOf(m, mT), wrong: "52", marks: 2 },
          { id: "s", input: "number", accepted: [S3(sg)], tolerance: tolOf(sg, sgT), wrong: S3(24 / (zL - zU)), marks: 2 },
        ],
        explanation: t`Subtracting: $${(zt(0.92) + zt(0.8)).toFixed(3)}\sigma = 24$, so $\sigma = ${S3(sg)}$; $\mu = 40 + ${zt(0.92)} \times ${sfStr(sg, 4)} = ${S3(m)}$.` }),
      P.num({ label: "(c)", marks: 3, stem: "Find the proportion of learners scoring between 50 and 60 marks, correct to 3 significant figures.", value: pMid, tol: 0.003, wrong: [Number(S3(Phi((60 - m) / sg)))],
        explanation: t`$z_1 = \frac{50 - ${sfStr(m, 4)}}{${sfStr(sg, 4)}} = ${((50 - m) / sg).toFixed(3)}$, $z_2 = \frac{60 - ${sfStr(m, 4)}}{${sfStr(sg, 4)}} = ${((60 - m) / sg).toFixed(3)}$. Proportion $= \Phi(z_2) - \Phi(z_1) = ${S3(pMid)}$.` }),
      P.num({ label: "(d)", marks: 3, stem: "A distinction is awarded to the top 5% of learners. Find the least mark (to 3 significant figures) needed for a distinction according to the model.", value: top5, tol: 0.15, wrong: [Number(S3(m - invPhi(0.95) * sg))],
        explanation: t`$\frac{d - \mu}{\sigma} = 1.645$, so $d = ${sfStr(m, 4)} + 1.645 \times ${sfStr(sg, 4)} = ${S3(top5)}$ marks.` }),
      P.manual({ label: "(e)", marks: 1, stem: "Give one reason why a normal model for test marks can only be approximate.",
        points: ["Marks are discrete (whole numbers) and bounded (0 to 100), whereas the normal distribution is continuous and unbounded."],
        modelAnswer: "Marks are whole numbers between 0 and the maximum, but a normal variable is continuous and can take any value, including impossible ones above the maximum or below 0." }),
    ],
    explanation: "Two percentages give two equations in μ and σ; then use the model forwards and backwards.",
    hints: ["40 is below the mean and 64 is above it.", "Eliminate μ by subtracting the equations."],
  });

  b.card("FORMULA", "Inverse normal equation", t`$\dfrac{x - \mu}{\sigma} = z$, where $\Phi(z)$ is the area to the left of $x$.`);
  b.card("FACT", "Critical values", t`$\Phi^{-1}(0.9) = 1.282$, $\Phi^{-1}(0.95) = 1.645$, $\Phi^{-1}(0.975) = 1.960$, $\Phi^{-1}(0.99) = 2.326$`, "Printed in MF19.");
  b.card("CONCEPT", "Sign of z", "A value below the mean has a negative z; sketch to decide.");
  b.card("CONCEPT", "Upper tail given", t`$\mathrm{P}(X > a) = p \Rightarrow \Phi(z) = 1 - p$.`);
  b.card("CONCEPT", "Two unknowns", t`Write $x_1 = \mu + z_1\sigma$ and $x_2 = \mu + z_2\sigma$; subtract to find $\sigma$, then substitute for $\mu$.`);
  b.card("FACT", "Quartiles of a normal distribution", t`$\mu \pm 0.674\sigma$; IQR $\approx 1.35\sigma$.`);
  b.card("CONCEPT", "Symmetric interval", t`Middle $c$% means $\frac{100 - c}{2}$% in each tail.`);
  b.card("CONCEPT", "Accuracy", "Keep z to 3 or 4 d.p. and σ to at least 4 s.f. before substituting back.");
});
