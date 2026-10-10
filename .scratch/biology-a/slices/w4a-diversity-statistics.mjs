// W4a: Simpson's index of diversity and correlation (Pearson, Spearman) (Cambridge A Level only).
import { concept, P, t, chk, table, dpStr, sfStr, simpson, spearman, pearson, ranks, SPEARMAN_CRIT_05 } from "../lib.mjs";

const SIMPSON_F = t`$D = 1 - \sum \left(\dfrac{n}{N}\right)^2$`;
const SPEAR_F = t`$r_s = 1 - \dfrac{6 \sum D^2}{n^3 - n}$`;
const minus = (x) => (x < 0 ? `−${-x}` : String(x));

concept("abio.biodiversity.diversity-statistics", { file: "biodiversity/diversity-statistics", keyPrefix: "biodiversity.diversity-statistics" }, (b) => {
  const calc = (o) => b.calc({ ...o, workedSolution: o.workedSolution ?? o.explanation });

  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does a value of Simpson's index of diversity close to 1 indicate?",
    options: [
      ["A community of high diversity", "Correct: D = 1 − Σ(n/N)² approaches 1 when many species are evenly represented."],
      ["A community dominated by a single species", "Domination by one species gives D close to 0."],
      ["A community containing exactly one species", "One species gives D = 0."],
      ["A community with a strong correlation between species", "Simpson's index is not a correlation."],
    ],
    answer: "A",
    explanation: "D near 1: high diversity (many species, evenly represented).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Two samples each contain 100 insects of the same four species. In which sample is Simpson's index of diversity highest?",
    options: [
      ["25, 25, 25, 25", "Correct: perfect evenness gives D = 0.75."],
      ["70, 10, 10, 10", "One species dominates, so D is lower."],
      ["40, 40, 10, 10", "More even than 70 : 10 : 10 : 10 but less even than 25s."],
      ["97, 1, 1, 1", "Almost all one species: D is close to 0."],
    ],
    answer: "A",
    explanation: "With equal richness, the most even sample has the highest D (here 1 − 4 × 0.0625 = 0.75).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why do ecologists use Simpson's index rather than simply counting the number of species?",
    options: [
      ["It takes account of the evenness of abundance as well as richness", "Correct."],
      ["It is the only measure that needs no counting of individuals", "Simpson's index needs counts of individuals of each species."],
      ["It always gives a larger number than the number of species", "D is always less than 1."],
      ["It shows whether the diversity of a site is correlated with an abiotic factor", "That needs a correlation test."],
    ],
    answer: "A",
    explanation: "Species richness ignores how individuals are shared among species; D combines richness and evenness.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A student recorded the abundance of a lichen on tree trunks on a five-point scale (rare to abundant) and the distance of each tree from a road. Which test should be used?",
    options: [
      ["Spearman's rank correlation, because abundance is on an ordinal scale", "Correct: ordinal data can be ranked but are not normally distributed measurements."],
      ["Pearson's correlation, because both variables are recorded for each tree", "Pearson needs both variables continuous and normally distributed."],
      ["The t-test, because two variables were measured", "The t-test compares two means; it does not test a relationship."],
      ["The chi-squared test, because the data are in categories", "χ² compares observed and expected counts, not a relationship along a gradient."],
    ],
    answer: "A",
    explanation: "An abundance scale is ordinal; Spearman's rank test is appropriate.",
    hints: ["Can a five-point abundance scale be normally distributed?"],
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "In a set of data, three values are tied for the 4th, 5th and 6th places. What rank is given to each?",
    options: [["5", "Correct: the mean of 4, 5 and 6."], ["4", "Ties are not all given the lowest rank."], ["6", "Ties are not all given the highest rank."], ["4.5", "This is the mean of only two of the three ranks."]],
    answer: "A",
    explanation: "Tied values share the mean of the ranks they occupy: (4 + 5 + 6) ÷ 3 = 5.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "For 10 quadrats, Spearman's rank correlation between soil pH and the number of a heather-like shrub is −0.81. The critical value for n = 10 at p = 0.05 is 0.648. What is the correct conclusion?",
    options: [
      ["There is a significant negative correlation", "Correct: 0.81 > 0.648 and the sign is negative."],
      ["There is no significant correlation because r is negative", "The size of rs is compared, not its sign."],
      ["There is a significant positive correlation", "The negative sign shows a negative correlation."],
      ["Increasing soil pH has been shown to kill the shrub", "Correlation does not show cause."],
    ],
    answer: "A",
    explanation: "|−0.81| > 0.648: reject the null hypothesis; the shrub is less abundant where pH is higher.",
    hints: ["Ignore the sign when comparing with the critical value."],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Along a transect, a significant positive correlation is found between light intensity and the number of grass plants. Which statement is the most valid?",
    options: [
      ["Grass numbers and light intensity vary together, but other factors may be responsible", "Correct: correlation does not establish cause."],
      ["Higher light intensity causes more grass plants to grow", "A field correlation cannot show cause; soil water or grazing may also vary."],
      ["More grass plants cause the light intensity to increase", "Reversing cause is equally unsupported."],
      ["The correlation must be due to chance, because field data in ecology are always variable", "Significant means unlikely to be due to chance."],
    ],
    answer: "A",
    explanation: "Correlation shows association; a controlled experiment would be needed to show cause.",
    hints: ["What else changes along a transect from woodland to open ground?"],
  });

  // Calculation: Simpson's index
  const cnt = [35, 22, 15, 8, 5, 5];
  const s = simpson(cnt);
  calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A pitfall-trap survey in miombo woodland caught beetles of six species: ${cnt.join(", ")} individuals. Using ${SIMPSON_F}, calculate Simpson's index of diversity to three significant figures.`,
    value: s.D, sf: 3, wrong: [sfStr(s.sumFrac2, 3)],
    explanation: t`1. $N = ${s.N}$.
2. $(n/N)^2$: ${s.rows.map((r) => dpStr(r.frac2, 4)).join(", ")}.
3. $\sum (n/N)^2 = ${dpStr(s.sumFrac2, 4)}$.
4. $D = 1 - ${dpStr(s.sumFrac2, 4)} = ${sfStr(s.D, 3)}$.
Giving $\sum (n/N)^2$ (${sfStr(s.sumFrac2, 3)}) without subtracting from 1 is a common error.`,
    hints: ["Find N first.", "Remember to subtract the sum from 1."],
  });
  // Numerical: rs from ΣD²
  const sumD2 = 32, nP = 9;
  const rsv = 1 - (6 * sumD2) / (nP ** 3 - nP);
  calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `For ${nP} pairs of values, ΣD² = ${sumD2}. Using ${SPEAR_F}, calculate rs to three significant figures.`,
    value: rsv, sf: 3, wrong: [sfStr(1 - (6 * sumD2) / nP ** 3, 3)],
    explanation: t`$r_s = 1 - \dfrac{6 \times ${sumD2}}{${nP}^3 - ${nP}} = 1 - \dfrac{${6 * sumD2}}{${nP ** 3 - nP}} = ${sfStr(rsv, 3)}$. Using $n^3$ alone (729) in the denominator gives a wrong value.`,
    hints: ["n³ − n = 729 − 9."],
  });
  // Numerical: tied rank
  const tie = [4.2, 3.1, 5.6, 3.1, 7.0, 3.1, 6.4];
  const rk = ranks(tie);
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: `Rank these values, giving 1 to the smallest: ${tie.join(", ")}. What rank is given to each value of 3.1?`,
    value: rk[1], wrong: [1, 2.5],
    explanation: `The three values of 3.1 occupy ranks 1, 2 and 3, so each gets (1 + 2 + 3) ÷ 3 = ${rk[1]}.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A correlation coefficient of −0.9 shows a stronger relationship than one of +0.5.",
    answer: true,
    explanation: "True. Strength depends on the size (0.9 > 0.5); the sign gives only the direction.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Two communities with the same number of species must have the same Simpson's index of diversity.",
    answer: false,
    explanation: "False. D also depends on evenness: the same species can be shared very unevenly.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each correlation coefficient with its description.",
    pairs: [
      ["+1", "Perfect positive correlation"],
      ["−1", "Perfect negative correlation"],
      ["0", "No correlation"],
      ["+0.3 (critical value 0.7)", "Weak positive correlation, not significant"],
    ],
    explanation: "Sign gives direction; size gives strength; significance comes from comparing with the critical value.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Pearson's coefficient tests for a {{blank:a}} relationship between two variables that are normally distributed. Spearman's coefficient uses the {{blank:b}} of the data.",
    blanks: [
      { id: "a", accepted: ["linear"], choices: ["linear", "causal", "random"] },
      { id: "b", accepted: ["ranks"], choices: ["ranks", "means", "squares"] },
    ],
    explanation: "Pearson: linear relationship, normal data. Spearman: ranks.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "State the term for how evenly the individuals in a community are distributed among its species.",
    accepted: ["species evenness", "evenness"],
    wrong: ["species richness"],
    explanation: "Species evenness. Richness is the number of species.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why Simpson's index of diversity is higher in a community where species are evenly represented than in one dominated by one species.",
    points: [
      "The index is 1 − Σ(n/N)²",
      "A dominant species has a large n/N, and squaring makes its term very large, so Σ(n/N)² is large",
      "So D is small when one species dominates; with even numbers each term is small and D is close to 1",
    ],
    modelAnswer: "D = 1 − Σ(n/N)². When one species dominates, its n/N is large and squaring makes its contribution very large, so Σ(n/N)² is large and D is small. When species are evenly represented, each n/N is small, the squares are smaller still, Σ(n/N)² is small and D is close to 1.",
    explanation: "Squaring exaggerates dominant species.",
    hints: ["What happens when you square 0.8 compared with 0.2?"],
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "Give three reasons why Pearson's correlation would be appropriate for testing whether leaf area is related to stomatal density on 15 leaves.",
    points: [
      "Both variables are continuous / measured quantitatively",
      "Both are likely to be normally distributed",
      "A scatter graph suggests a linear relationship / there are at least 5 (15) pairs measured on the same leaves",
    ],
    modelAnswer: "Leaf area and stomatal density are both continuous measurements, both are likely to be normally distributed, and there are 15 pairs of values from the same leaves, with a scatter graph that would show whether the relationship is linear.",
    explanation: "Pearson: continuous, normal, linear, paired.",
    hints: ["Think about the data type, the distribution and the shape of the relationship."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "A study near Hwange found a significant negative correlation between the number of elephants using a waterhole and the diversity of trees around it. Suggest an explanation, and explain why the study does not prove that elephants reduce tree diversity.",
    points: [
      "Elephants browse, push over and debark trees, damaging preferred species / so a few resistant species dominate",
      "This lowers evenness (and perhaps richness), giving a lower Simpson's index",
      "Correlation does not show cause: other factors (soil, rainfall, fire, other herbivores, distance from water) may affect both",
      "An experiment such as fenced exclosures compared with open plots would test cause",
    ],
    modelAnswer: "Elephants browse, debark and push over trees, which may kill preferred species and leave a few tolerant species dominant, lowering evenness and so the Simpson's index. However, a correlation only shows that the two vary together. Soil type, rainfall, fire or other herbivores might affect both elephant numbers and tree diversity. Comparing fenced exclosures, where elephants cannot browse, with similar open plots would test whether elephants cause the change.",
    explanation: "Suggest a mechanism, then separate correlation from cause.",
    hints: ["What would an experiment need to change and control?"],
  });

  // Practice structured 1: Simpson's comparison
  const siteA = [42, 3, 2, 2, 1];
  const siteB = [14, 12, 10, 8, 6];
  const SA = simpson(siteA);
  const SB = simpson(siteB);
  chk(SA.N, 50); chk(SB.N, 50);
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `Rudo sampled invertebrates by kick-sampling at two sites on a river near Bulawayo: site A just below a sewage outflow and site B upstream.\n\n${table(["Species", "Site A", "Site B"], ["Sludge worm", "Midge larva", "Water louse", "Mayfly nymph", "Stonefly nymph"].map((nm, i) => [nm, String(siteA[i]), String(siteB[i])]))}\n\nThe formula is ${SIMPSON_F}.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate Simpson's index of diversity for site A, to three significant figures.", value: SA.D, sf: 3, wrong: [sfStr(SA.sumFrac2, 3)], explanation: t`$\sum (n/N)^2 = ${dpStr(SA.sumFrac2, 4)}$; $D = ${sfStr(SA.D, 3)}$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate Simpson's index of diversity for site B, to three significant figures.", value: SB.D, sf: 3, wrong: [sfStr(SB.sumFrac2, 3)], explanation: t`$\sum (n/N)^2 = ${dpStr(SB.sumFrac2, 4)}$; $D = ${sfStr(SB.D, 3)}$.` }),
      P.manual({
        label: "(c)", marks: 2, stem: "Compare the diversity at the two sites, using the data.",
        points: [
          `Site B has higher diversity (${sfStr(SB.D, 3)}) than site A (${sfStr(SA.D, 3)})`,
          "Both sites have the same richness (5 species), but site A is dominated by sludge worms (42 of 50) so evenness is low",
        ],
        modelAnswer: `Site B is more diverse (D = ${sfStr(SB.D, 3)}) than site A (D = ${sfStr(SA.D, 3)}). Both have five species, but at site A 42 of the 50 animals are sludge worms, so the community is very uneven.`,
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Suggest an explanation for the difference.",
        points: [
          "Sewage decomposition by bacteria lowers the dissolved oxygen concentration below the outflow",
          "Sludge worms tolerate low oxygen and thrive (food from organic matter), whereas mayfly and stonefly nymphs need well-oxygenated water",
        ],
        modelAnswer: "Bacteria decomposing the sewage use up dissolved oxygen below the outflow. Sludge worms tolerate low oxygen and feed on the organic matter, so they increase, while mayfly and stonefly nymphs, which need well-oxygenated water, are scarce.",
      }),
    ],
    explanation: "Calculate D for both sites, compare richness and evenness, and link to oxygen levels.",
    hints: ["N = 50 at each site."],
    calculator: true,
  });

  // Practice structured 2: Spearman along a slope
  const alt = [1200, 1350, 1500, 1650, 1800, 1950, 2100, 2250, 2400];
  const cover = [62, 55, 58, 41, 37, 39, 26, 21, 15];
  const sp = spearman(alt, cover);
  b.struct({
    d: 5, skill: "ANALYSIS",
    stem: `Farai measured the percentage cover of a shrub in quadrats at different altitudes on a mountain in the Eastern Highlands.\n\n${table(["Altitude / m", ...alt.map(String)], [["Percentage cover / %", ...cover.map(String)]])}\n\nThe formula is ${SPEAR_F}.`,
    parts: [
      P.manual({ label: "(a)", marks: 1, stem: "State the null hypothesis.", points: ["There is no correlation between altitude and the percentage cover of the shrub"], modelAnswer: "There is no correlation between altitude and percentage cover of the shrub." }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain why Spearman's rank correlation is more suitable here than Pearson's.", points: ["Percentage cover is an estimate / not normally distributed (ordinal-like)", "The relationship need not be linear; Spearman tests any consistent (monotonic) trend, using 5-20 pairs (here 9)"], modelAnswer: "Percentage cover is an estimate that is unlikely to be normally distributed, and the relationship need not be linear; Spearman's test uses ranks and works for any consistent trend with 5 to 20 pairs, here 9." }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate ΣD².", value: sp.sumD2, wrong: [0], explanation: `Ranks of cover: ${sp.rows.map((r) => r.ry).join(", ")}; D² values: ${sp.rows.map((r) => r.d2).join(", ")}; total ${sp.sumD2}.` }),
      P.num({ label: "(d)", marks: 2, stem: "Calculate rs to three significant figures.", value: sp.rs, sf: 3, explanation: t`$r_s = 1 - \dfrac{6 \times ${sp.sumD2}}{9^3 - 9} = 1 - \dfrac{${6 * sp.sumD2}}{720} = ${sfStr(sp.rs, 3)}$.` }),
      P.manual({
        label: "(e)", marks: 2, stem: `The critical value for 9 pairs at p = 0.05 is ${SPEARMAN_CRIT_05[9]}. State your conclusion.`,
        points: [`|rs| (${sfStr(Math.abs(sp.rs), 3)}) is greater than ${SPEARMAN_CRIT_05[9]}, so the correlation is significant; reject the null hypothesis`, "It is a negative correlation: cover decreases as altitude increases"],
        modelAnswer: `rs = ${sfStr(sp.rs, 3)}; its size is greater than the critical value of ${SPEARMAN_CRIT_05[9]}, so there is a significant negative correlation and the null hypothesis is rejected: shrub cover falls as altitude rises.`,
      }),
      P.manual({
        label: "(f)", marks: 3, stem: "Suggest three abiotic factors that change with altitude and might explain the trend.",
        points: ["Lower temperature / frost at higher altitude", "Thinner, poorer or shallower soils / more exposure to wind", "Different rainfall, mist or light (UV) intensity"],
        modelAnswer: "Temperature falls with altitude and frost is more frequent; soils are often shallower and poorer and sites more exposed to wind; rainfall, mist and light intensity also change.",
      }),
    ],
    explanation: "Rank both variables, find ΣD², calculate rs and compare its size with the critical value.",
    hints: ["Rank each variable separately, 1 for the smallest.", "n³ − n = 729 − 9 = 720."],
    calculator: true,
  });
  if (!sp.significant || sp.rs > 0) throw new Error("expected significant negative");

  b.card("FORMULA", "Simpson's index of diversity", "D = 1 − Σ(n/N)²; ranges from 0 (one species) towards 1 (high diversity).");
  b.card("DEFINITION", "Species richness", "The number of different species in a community.");
  b.card("DEFINITION", "Species evenness", "How evenly individuals are distributed among the species present.");
  b.card("FORMULA", "Spearman's rank correlation coefficient", "rs = 1 − 6ΣD² / (n³ − n), where D is the difference in ranks of each pair.");
  b.card("CONCEPT", "Pearson or Spearman?", "Pearson: continuous, normally distributed data with a linear relationship. Spearman: ranked or non-normal data, any consistent trend.");
  b.card("CONCEPT", "Tied ranks", "Tied values share the mean of the ranks they occupy (e.g. tied 3rd and 4th both get 3.5).");
  b.card("CONCEPT", "Correlation and causation", "A significant correlation shows variables change together; it does not show that one causes the other.");
  b.card("CONCEPT", "Concluding a correlation test", "Compare the size of the coefficient with the critical value for n pairs at p = 0.05; if larger, the correlation is significant.");
});
