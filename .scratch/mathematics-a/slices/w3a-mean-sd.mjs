// W3a: amaths.data.mean-sd
import { concept, P, t, chk, same, mean, sd, variance, freqStats, grouped, sum, table, sfStr } from "../lib.mjs";

const N = (id, x, wrong, marks) => ({ id, input: "number", accepted: [x], wrong, ...(marks ? { marks } : {}) });
const D3 = (id, x, wrong, marks) => ({ id, input: "number", accepted: [sfStr(x, 3)], tolerance: 0.5 * 10 ** -(2 - Math.floor(Math.log10(Math.abs(x)))), wrong, ...(marks ? { marks } : {}) });
const ineq = (v, [a, b]) => t`$${a} \le ${v} < ${b}$`;
/** Sums from n, mean and sd. */
const sums = (n, m, s) => ({ sx: n * m, sxx: n * (s * s + m * m) });

concept("amaths.data.mean-sd", { file: "data/mean-sd", keyPrefix: "data.mean-sd" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "The masses of a group of calves are measured in kilograms. In what units is the variance of the masses measured?",
    options: [
      ["kg²", "Correct: the variance is a mean of squared deviations, so its units are squared."],
      ["kg", "This is the unit of the standard deviation, the square root of the variance."],
      ["no units", "Variance has units: the square of the data's units."],
      ["kg per calf", "Variance is not a rate; it is measured in squared units of the data."],
    ],
    answer: "A",
    explanation: t`$\sigma^2 = \frac{\sum (x - \bar{x})^2}{n}$ has units of $\text{kg}^2$; taking the square root gives the standard deviation in kg.`,
  });

  const sacks = [47.2, 49.8, 50.3, 48.6, 51.1];
  const sdS = sd(sacks);
  b.num({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: "The masses, in kg, of 5 sacks of sugar beans are 47.2, 49.8, 50.3, 48.6 and 51.1. Find the standard deviation of the masses, to 3 significant figures.",
    value: sdS, unit: "kg", wrong: [Number(sfStr(Math.sqrt(variance(sacks) * 5 / 4), 3)), Number(sfStr(variance(sacks), 3))],
    explanation: t`$\bar{x} = \frac{${Number(sum(sacks).toFixed(1))}}{5} = ${mean(sacks)}$; $\sum x^2 = ${sum(sacks.map((x) => x * x)).toFixed(2)}$; $\sigma^2 = \frac{\sum x^2}{5} - \bar{x}^2 = ${sfStr(variance(sacks), 3)}$, so $\sigma = ${sfStr(sdS, 3)}$ kg. (${sfStr(Math.sqrt(variance(sacks) * 5 / 4), 3)} uses the divisor 4; ${sfStr(variance(sacks), 3)} is the variance.)`,
  });
  chk(mean(sacks), 49.4, 1e-9);

  chk(9908 / 16 - (392 / 16) ** 2, 19);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`For 16 values, $\sum x = 392$ and $\sum x^2 = 9908$. Find the variance.`,
    value: 19, wrong: [618.75, 4.36],
    explanation: t`$\bar{x} = \frac{392}{16} = 24.5$. Variance $= \frac{9908}{16} - 24.5^2 = 619.25 - 600.25 = 19$. (4.36 is the standard deviation, $\sqrt{19}$.)`,
  });

  const eggs = freqStats([[2, 5], [3, 10], [4, 14], [5, 8], [6, 5]]);
  chk(eggs.n, 42); chk(eggs.sumfx, 166); chk(eggs.sumfx2, 714);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`The numbers of eggs in 42 nests of guinea fowl are recorded.

${table(["Eggs", 2, 3, 4, 5, 6], [["Nests", 5, 10, 14, 8, 5]])}

Calculate the standard deviation of the number of eggs per nest, to 3 significant figures.`,
    value: eggs.sd, wrong: [Number(sfStr(eggs.variance, 3)), 1.41],
    explanation: t`$\sum fx = 166$, $\bar{x} = \frac{166}{42} = ${sfStr(eggs.mean, 4)}$. $\sum fx^2 = 714$. $\sigma^2 = \frac{714}{42} - \bar{x}^2 = ${sfStr(eggs.variance, 3)}$, so $\sigma = ${sfStr(eggs.sd, 3)}$. (1.41 is the sd of the five values 2 to 6, ignoring the frequencies.)`,
    hints: ["Find Σfx and Σfx² first.", "Divide by Σf = 42, not by 5."],
  });
  chk(sd([2, 3, 4, 5, 6]), Math.SQRT2);

  const tk = grouped([[0, 4, 8], [4, 8, 15], [8, 12, 19], [12, 20, 9]]);
  chk(tk.n, 51);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`The times, $t$ minutes, that 51 learners took to complete a puzzle are summarised below.

${table(["Time t (min)", ineq("t", [0, 4]), ineq("t", [4, 8]), ineq("t", [8, 12]), ineq("t", [12, 20])], [["Frequency", 8, 15, 19, 9]])}

Calculate an estimate of the standard deviation of the times, in minutes, to 3 significant figures.`,
    value: tk.sd, unit: "min", wrong: [Number(sfStr(tk.variance, 3)), Number(sfStr(Math.sqrt(tk.sumfx2 / tk.n), 3))],
    explanation: t`Mid-points 2, 6, 10, 16. $\sum fx = ${tk.sumfx}$, $\sum fx^2 = ${tk.sumfx2}$. $\bar{x} = ${sfStr(tk.mean, 4)}$, $\sigma^2 = \frac{${tk.sumfx2}}{51} - \bar{x}^2 = ${sfStr(tk.variance, 3)}$, $\sigma \approx ${sfStr(tk.sd, 3)}$ minutes.`,
    hints: ["Use class mid-points as x.", "σ² = Σfx²/Σf − x̄²."],
  });

  const m6 = 120 + -54 / 24;
  const v6 = 1059 / 24 - (-54 / 24) ** 2;
  chk(m6, 117.75); chk(Math.sqrt(v6), 6.25);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`The masses, $x$ grams, of 24 tomatoes are summarised by $\sum (x - 120) = -54$ and $\sum (x - 120)^2 = 1059$. Find the mean and the standard deviation of the masses.`,
    template: "mean = {{blank:m}} g, standard deviation = {{blank:s}} g",
    blanks: [{ id: "m", input: "number", accepted: ["117.75"], tolerance: 0.005, wrong: "122.25" }, { id: "s", input: "number", accepted: ["6.25"], tolerance: 0.005, wrong: "6.64" }],
    explanation: t`$\bar{y} = \frac{-54}{24} = -2.25$, so $\bar{x} = 120 - 2.25 = 117.75$ g. $\sigma^2 = \frac{1059}{24} - (-2.25)^2 = 44.125 - 5.0625 = 39.0625$, so $\sigma = 6.25$ g. (6.64 is $\sqrt{44.125}$, forgetting to subtract $\bar{y}^2$.)`,
    hints: ["Work with y = x − 120 first.", "Add 120 back to the mean only."],
  });

  chk(sums(12, 8.5, 2).sxx, 915);
  b.num({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`A set of 12 values has mean 8.5 and standard deviation 2. Find $\sum x^2$.`,
    value: 915, wrong: [867, 48],
    explanation: t`$\sigma^2 = \frac{\sum x^2}{n} - \bar{x}^2 \Rightarrow \sum x^2 = n(\sigma^2 + \bar{x}^2) = 12(4 + 72.25) = 915$. (867 is $12 \times 72.25$, which leaves out the variance.)`,
    hints: [t`Rearrange $\sigma^2 = \frac{\sum x^2}{n} - \bar{x}^2$.`],
  });

  const B = sums(15, 1.62, 0.08), G = sums(25, 1.55, 0.05);
  const mBG = (B.sx + G.sx) / 40;
  const vBG = (B.sxx + G.sxx) / 40 - mBG * mBG;
  chk(mBG, 1.57625);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: "In a netball and basketball club in Mutare, the 15 boys have mean height 1.62 m with standard deviation 0.08 m, and the 25 girls have mean height 1.55 m with standard deviation 0.05 m. Find the standard deviation of the heights of all 40 members, in metres, to 3 significant figures.",
    value: Math.sqrt(vBG), unit: "m", wrong: [0.0613, 0.065],
    explanation: t`Boys: $\sum x = 24.3$, $\sum x^2 = 15(0.0064 + 2.6244) = ${Number(B.sxx.toFixed(4))}$. Girls: $\sum x = 38.75$, $\sum x^2 = 25(0.0025 + 2.4025) = ${Number(G.sxx.toFixed(4))}$. Combined mean $= \frac{63.05}{40} = 1.57625$; $\sigma^2 = \frac{${Number((B.sxx + G.sxx).toFixed(4))}}{40} - 1.57625^2 = ${sfStr(vBG, 3)}$, so $\sigma = ${sfStr(Math.sqrt(vBG), 3)}$ m. (0.0613 is the weighted mean of the two standard deviations, which ignores the difference between the means.)`,
    hints: [t`For each group, $\sum x = n\bar{x}$ and $\sum x^2 = n(\sigma^2 + \bar{x}^2)$.`, "Add the totals, then use the formula for all 40."],
  });
  chk((15 * 0.08 + 25 * 0.05) / 40, 0.06125);

  const v9 = [7, 11, 13, 10, 9];
  chk(mean(v9), 10); chk(sd(v9), 2);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The values $7, 11, 13, x$ and $9$ have mean 10. Find $x$ and the standard deviation of the five values.`,
    template: "x = {{blank:x}}, standard deviation = {{blank:s}}",
    blanks: [N("x", 10, "12"), N("s", 2, "4")],
    explanation: t`$\frac{40 + x}{5} = 10 \Rightarrow x = 10$. Deviations from 10: $-3, 1, 3, 0, -1$; squares add to $20$; $\sigma^2 = \frac{20}{5} = 4$, so $\sigma = 2$. (4 is the variance.)`,
    hints: ["Use the mean to find x first."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "If 10 is added to every value in a data set, the standard deviation increases by 10.",
    answer: false,
    explanation: "Adding a constant moves every value and the mean by the same amount, so each deviation from the mean is unchanged. The standard deviation stays the same.",
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "A data set has mean 12 and standard deviation 3. Every value is multiplied by 4. What are the new mean and standard deviation?",
    options: [
      ["mean 48, standard deviation 12", "Correct: multiplying by 4 multiplies every value, every deviation and so the standard deviation by 4."],
      ["mean 48, standard deviation 3", "The deviations from the mean are also multiplied by 4, so the spread changes."],
      ["mean 48, standard deviation 48", "Only the variance is multiplied by 16 = 4² (from 9 to 144); the sd is multiplied by 4."],
      ["mean 16, standard deviation 7", "This adds 4 instead of multiplying by 4."],
    ],
    answer: "A",
    explanation: t`If $y = kx$ then $\bar{y} = k\bar{x}$ and $\sigma_y = |k|\sigma_x$; the variance is multiplied by $k^2$.`,
  });

  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`For 10 values, $\sum x = 60$ and $\sum x^2 = 400$. Tendai writes "variance $= \frac{400 - 6^2}{10} = 36.4$". What is the correct variance?`,
    options: [
      ["4, because 400 ÷ 10 − 6² = 40 − 36", "Correct: divide Σx² by n first, then subtract the square of the mean."],
      ["36.4, as Tendai's working is correct", "He subtracted the squared mean before dividing by n."],
      ["40, because 400 ÷ 10 = 40", "This is the mean of the squares; the square of the mean must still be subtracted."],
      ["2, because √(40 − 36) = 2", "2 is the standard deviation; the question asks for the variance."],
    ],
    answer: "A",
    explanation: t`$\sigma^2 = \frac{\sum x^2}{n} - \bar{x}^2 = \frac{400}{10} - 6^2 = 40 - 36 = 4$.`,
    hints: ["The formula is 'mean of the squares minus square of the mean'."],
  });

  b.match({
    d: 2, skill: "RECALL", calculator: false,
    stem: "Match each quantity with its formula.",
    pairs: [
      ["variance from totals", t`$\dfrac{\sum x^2}{n} - \bar{x}^2$`],
      [t`mean from coded totals, $y = x - a$`, t`$a + \dfrac{\sum (x - a)}{n}$`],
      [t`$\sum x^2$ from $n$, $\bar{x}$ and $\sigma$`, t`$n(\sigma^2 + \bar{x}^2)$`],
      ["standard deviation of a frequency table", t`$\sqrt{\dfrac{\sum fx^2}{\sum f} - \bar{x}^2}$`],
    ],
    explanation: "These four formulas cover raw totals, coded totals, rebuilding totals for combining groups, and frequency tables.",
  });

  chk(-36 / 12 + 20, 17);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`For 12 values of $x$, $\sum (x - 20) = -36$. Find the mean of $x$.`,
    value: 17, wrong: [-3, 23],
    explanation: t`$\bar{x} = 20 + \frac{-36}{12} = 20 - 3 = 17$. (23 adds 3 instead of subtracting it; $-3$ is the mean of $x - 20$.)`,
  });

  b.mcq({
    d: 3, skill: "EVALUATION", calculator: false,
    stem: "Two bakeries in Harare weigh samples of their 'one-kilogram' loaves. Bakery P: mean 1004 g, standard deviation 9 g. Bakery Q: mean 1011 g, standard deviation 4 g. Which statement is correct?",
    options: [
      ["Q's loaves are heavier on average and more consistent in mass.", "Correct: Q has the larger mean and the smaller standard deviation."],
      ["P's loaves are more consistent because their mean is nearer 1000 g.", "Consistency is judged by the standard deviation, which is smaller for Q."],
      ["Q's loaves are heavier on average but less consistent in mass.", "A smaller standard deviation (4 g) means more consistent, not less."],
      ["P and Q are equally consistent, as both standard deviations are under 10 g.", "4 g and 9 g are clearly different spreads."],
    ],
    answer: "A",
    explanation: "Compare location with the means (1011 g against 1004 g) and spread with the standard deviations (4 g against 9 g).",
    hints: ["Which measure describes consistency?"],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: "Two groups have standard deviations 3 and 4, but their means are 20 and 30. Explain why the standard deviation of the two groups combined is greater than 4.",
    points: [
      "The combined data are measured from one overall mean, which lies between 20 and 30.",
      "Values in both groups are now far from this mean (the gap between the group means adds to the spread), so the combined sd exceeds both group sds.",
    ],
    modelAnswer: "When the groups are combined, deviations are measured from the overall mean, which lies between 20 and 30. Most values in each group are then a long way from it because the group means differ by 10, so the spread is larger than within either group: the combined standard deviation is more than 4.",
    explanation: "Combined variance = (mean of the within-group variances, weighted) + (spread of the group means about the overall mean).",
    hints: ["From which mean are deviations measured after combining?"],
  });

  const n17 = 9, s17 = 230 - 31, q17 = 5600 - 31 * 31;
  const sd17 = Math.sqrt(q17 / n17 - (s17 / n17) ** 2);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`For 10 values, $\sum x = 230$ and $\sum x^2 = 5600$. One value, 31, is removed. Find the standard deviation of the remaining 9 values, to 3 significant figures.`,
    value: sd17, wrong: [Number(sfStr(Math.sqrt(5600 / 10 - 23 ** 2), 3)), Number(sfStr(q17 / n17 - (s17 / n17) ** 2, 3))],
    explanation: t`New totals: $\sum x = 199$, $\sum x^2 = 5600 - 961 = 4639$. $\sigma^2 = \frac{4639}{9} - \left(\frac{199}{9}\right)^2 = ${sfStr(q17 / n17 - (s17 / n17) ** 2, 3)}$, so $\sigma = ${sfStr(sd17, 3)}$. (${sfStr(Math.sqrt(5600 / 10 - 23 ** 2), 3)} is the sd of the original 10 values.)`,
    hints: ["Subtract the value from Σx and its square from Σx²."],
  });

  // Struct 12: cooking-oil machines
  const nA = 30, cA = 27, cA2 = 246;
  const mA = 750 + cA / nA, vA = cA2 / nA - (cA / nA) ** 2;
  chk(mA, 750.9); chk(vA, 7.39);
  const Bv = [748, 752, 755, 746, 751, 749, 753, 750];
  const mB = mean(Bv), vB = variance(Bv);
  chk(mB, 750.5);
  const sxA = nA * mA, sxxA = nA * (vA + mA * mA);
  const sxB = sum(Bv), sxxB = sum(Bv.map((x) => x * x));
  const mAll = (sxA + sxB) / 38, vAll = (sxxA + sxxB) / 38 - mAll * mAll;
  chk(sxxA, cA2 + 2 * 750 * cA + nA * 750 * 750, 1e-6);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: "A factory in Harare fills bottles with cooking oil. The volumes, x ml, in a sample of 30 bottles from machine A are summarised by Σ(x − 750) = 27 and Σ(x − 750)² = 246. The volumes in a sample of 8 bottles from machine B are 748, 752, 755, 746, 751, 749, 753 and 750 ml.",
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: "Find the mean and the standard deviation of the volumes for machine A (standard deviation to 3 significant figures).", template: "mean {{blank:m}} ml, sd {{blank:s}} ml",
        blanks: [{ id: "m", input: "number", accepted: ["750.9"], tolerance: 0.05, wrong: "777", marks: 1 }, D3("s", Math.sqrt(vA), "2.86", 2)],
        explanation: t`$\bar{x} = 750 + \frac{27}{30} = 750.9$ ml. $\sigma^2 = \frac{246}{30} - 0.9^2 = 8.2 - 0.81 = 7.39$, so $\sigma = ${sfStr(Math.sqrt(vA), 3)}$ ml. (2.86 forgets to subtract $0.9^2$.)` }),
      P.fib({ label: "(b)", marks: 3, stem: "Find the mean and the standard deviation of the volumes for machine B (standard deviation to 3 significant figures).", template: "mean {{blank:m}} ml, sd {{blank:s}} ml",
        blanks: [{ id: "m", input: "number", accepted: ["750.5"], tolerance: 0.05, wrong: "750", marks: 1 }, D3("s", Math.sqrt(vB), sfStr(Math.sqrt(vB * 8 / 7), 3), 2)],
        explanation: t`Using $y = x - 750$: $-2, 2, 5, -4, 1, -1, 3, 0$, so $\sum y = 4$ and $\sum y^2 = 60$. $\bar{x} = 750 + 0.5 = 750.5$ ml; $\sigma^2 = \frac{60}{8} - 0.5^2 = 7.25$, $\sigma = ${sfStr(Math.sqrt(vB), 3)}$ ml.` }),
      P.num({ label: "(c)", marks: 4, stem: "Find the standard deviation of the volumes of all 38 bottles, to 3 significant figures.", value: Math.sqrt(vAll), wrong: [Number(sfStr((Math.sqrt(vA) + Math.sqrt(vB)) / 2, 3)), Number(sfStr(vAll, 3))],
        explanation: t`Coded totals with $y = x - 750$: A gives $\sum y = 27$, $\sum y^2 = 246$; B gives $\sum y = 4$, $\sum y^2 = 60$. All 38: $\sum y = 31$, $\sum y^2 = 306$. $\sigma^2 = \frac{306}{38} - \left(\frac{31}{38}\right)^2 = ${sfStr(vAll, 3)}$, so $\sigma = ${sfStr(Math.sqrt(vAll), 3)}$ ml.` }),
      P.manual({ label: "(d)", marks: 2, stem: "Compare the performance of the two machines.",
        points: ["Machine A fills slightly more on average (750.9 ml against 750.5 ml).", "The standard deviations are almost equal (about 2.72 ml for A and 2.69 ml for B), so the machines are about equally consistent."],
        modelAnswer: "Machine A puts slightly more oil in each bottle on average (750.9 ml against 750.5 ml). The standard deviations (about 2.72 ml for A and 2.69 ml for B) are almost equal, so the machines are about equally consistent; B's sample of 8 is small, so this comparison is not reliable." }),
    ],
    explanation: "Coded totals keep the arithmetic small; combine the groups by adding their coded totals.",
    hints: ["Code machine B's volumes with y = x − 750 too.", "Add Σy and Σy² across the two machines."],
  });
  const yB = Bv.map((x) => x - 750);
  chk(sum(yB), 4); chk(sum(yB.map((y) => y * y)), 60); chk(vB, 7.25);
  chk(vAll, 306 / 38 - (31 / 38) ** 2, 1e-9);
  same([sfStr(Math.sqrt(vA), 3), sfStr(Math.sqrt(vB), 3)], ["2.72", "2.69"]);

  // Struct 5: frequency table
  const lv = freqStats([[1, 4], [2, 10], [3, 15], [4, 9], [5, 2]]);
  chk(lv.n, 40); chk(lv.sumfx, 115); chk(lv.sumfx2, 373);
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, calculator: true,
    stem: t`The number of rooms, $x$, in each of 40 houses in a new suburb of Chitungwiza is recorded.

${table(["Rooms x", 1, 2, 3, 4, 5], [["Houses", 4, 10, 15, 9, 2]])}`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: t`Find $\sum fx$ and $\sum fx^2$.`, template: "Σfx = {{blank:a}}, Σfx² = {{blank:b}}",
        blanks: [N("a", 115, "15"), N("b", 373, "55")],
        explanation: t`$\sum fx = 4 + 20 + 45 + 36 + 10 = 115$; $\sum fx^2 = 4 + 40 + 135 + 144 + 50 = 373$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Find the standard deviation of the number of rooms, to 3 significant figures.", value: lv.sd, wrong: [Number(sfStr(lv.variance, 3)), 1.41],
        explanation: t`$\bar{x} = \frac{115}{40} = 2.875$; $\sigma^2 = \frac{373}{40} - 2.875^2 = ${sfStr(lv.variance, 4)}$; $\sigma = ${sfStr(lv.sd, 3)}$.` }),
      P.mcq({ label: "(c)", marks: 1, stem: "Each house has one extension room added. What is the new standard deviation of the number of rooms?",
        options: [[`${sfStr(lv.sd, 3)}, unchanged`, "Correct: adding 1 to every value does not change the spread."], [`${sfStr(lv.sd + 1, 3)}, one more`, "Adding a constant shifts the mean, not the standard deviation."], [`${sfStr(lv.sd * 2, 3)}, doubled`, "Nothing has been multiplied."], [`${sfStr(Math.sqrt(lv.variance + 1), 3)}, from variance + 1`, "The variance is unchanged as well."]],
        answer: "A", explanation: "Adding a constant to every value leaves the standard deviation unchanged." }),
    ],
    explanation: "Σfx and Σfx², then σ² = Σfx²/Σf − x̄².",
    hints: ["Multiply each x² by its frequency for Σfx²."],
  });

  b.card("FORMULA", "Variance (data)", t`$\sigma^2 = \dfrac{\sum (x - \bar{x})^2}{n} = \dfrac{\sum x^2}{n} - \bar{x}^2$`, "MF19 gives this; divisor n for data.");
  b.card("FORMULA", "Variance of a frequency table", t`$\sigma^2 = \dfrac{\sum fx^2}{\sum f} - \bar{x}^2$ (grouped data: $x$ = mid-points).`);
  b.card("FORMULA", "Coded data y = x − a", t`$\bar{x} = a + \dfrac{\sum (x - a)}{n}$; $\sigma_x = \sigma_y$.`);
  b.card("FORMULA", "Rebuilding totals", t`$\sum x = n\bar{x}$, $\sum x^2 = n(\sigma^2 + \bar{x}^2)$`);
  b.card("CONCEPT", "Combining two data sets", "Rebuild Σx and Σx² for each group, add them, then use the formulas for the combined n. Never average the sds.");
  b.card("FACT", "Linear changes", t`$y = x + c$: sd unchanged. $y = kx$: sd multiplied by $|k|$, variance by $k^2$.`);
  b.card("DEFINITION", "Standard deviation", "The square root of the variance: roughly the typical distance of a value from the mean, in the data's units.");
  b.card("CONCEPT", "Interpreting the sd", "A smaller standard deviation means the data are more consistent (less spread about the mean). Pair it with the mean.");
});
