// W4a: Cambridge-only exam-format items: PLANNING (Paper 5 question 1: a transect from a footpath) and four
// CAM_P5_ANALYSIS items (Paper 5 question 2: t-test; Spearman's rank; Simpson's index; SD, SE and 95% CI error bars).
import { concept, P, t, chk, table, dpStr, sfStr, EXAM, checkExam, CAM, mean, sd, sum, tTest, spearman, simpson, ci95, SPEARMAN_CRIT_05 } from "../lib.mjs";

const A = (k) => `abio.${k}`;
const P5 = { examStyle: true, skill: EXAM.CAM_P5_ANALYSIS.skill, secs: EXAM.CAM_P5_ANALYSIS.secs, applies: EXAM.CAM_P5_ANALYSIS.applies, paper: "Cambridge Paper 5" };

concept(A("skills.planning-evaluation"), { file: "exam/w4a-cambridge", keyPrefix: "exam.w4a-cambridge", applies: CAM }, (b) => {
  // ---------------------------------------------------------------- PL: belt transect from a footpath (Cambridge P5 Q1)
  const len = 20, step = 2;
  const nQ = len / step + 1;
  chk(nQ, 11);
  b.struct({
    d: 4, examStyle: true, skill: EXAM.PLANNING.skill, secs: EXAM.PLANNING.secs, applies: CAM, paper: "Cambridge Paper 5",
    concepts: [A("skills.planning-evaluation"), A("biodiversity.sampling")],
    stem: "A well-used footpath crosses a grassy area of a school sports field in Bulawayo. Tatenda notices a low-growing, trampling-tolerant plant (plantain) that seems commonest close to the path. He wants to test the hypothesis: *the abundance of plantain decreases with distance from the footpath because trampling is less intense further away*. He has tape measures, a 0.5 m × 0.5 m quadrat divided into 25 squares, a soil penetrometer (a weighted rod whose depth of penetration measures how compacted the soil is), a metre rule and random number tables.",
    parts: checkExam(EXAM.PLANNING, [
      P.manual({ label: "(a)", marks: 1, stem: "Make a prediction based on the hypothesis, in terms of the variables measured.", points: ["Percentage cover (or frequency) of plantain decreases as distance from the path increases (as soil compaction decreases)"], modelAnswer: "The percentage cover of plantain will be highest beside the path and decrease with distance from it, as the soil becomes less compacted." }),
      P.manual({ label: "(b)", marks: 2, stem: "Identify the independent and dependent variables and how each would be measured.", points: ["Independent: distance from the edge of the path, measured with a tape, at regular intervals (e.g. every 2 m to 20 m)", "Dependent: abundance of plantain: percentage cover estimated from the number of the 25 squares more than half covered (× 4) / or frequency or count"], modelAnswer: "The independent variable is distance from the path edge, measured with a tape at 2 m intervals from 0 to 20 m. The dependent variable is the abundance of plantain, recorded as percentage cover: the number of the 25 squares in the quadrat more than half covered, multiplied by 4." }),
      P.manual({ label: "(c)", marks: 4, stem: "Describe how Tatenda should carry out the investigation.", points: [
        "Lay a tape at right angles to the path from its edge (belt transect)",
        "Place the quadrat at regular intervals along the tape (e.g. every 2 m) and record plantain cover in each",
        "Measure soil compaction with the penetrometer at each quadrat (drop from a fixed height, measure depth; several readings, mean)",
        "Repeat with several transects (e.g. five) at positions along the path chosen with random numbers; calculate mean cover at each distance",
      ], modelAnswer: "He should lay a tape at right angles to the path, starting at its edge, and place the quadrat every 2 m along it, recording the percentage cover of plantain from the number of squares more than half covered. At each quadrat he should drop the penetrometer from the same height three times and record the mean depth of penetration as a measure of compaction. He should repeat this with five transects at positions along the path chosen with random numbers, and calculate the mean cover at each distance." }),
      P.num({ label: "(d)", marks: 1, stem: `How many quadrats are needed on one transect if quadrats are placed every ${step} m from 0 m to ${len} m?`, value: nQ, wrong: [len / step], explanation: `${len} ÷ ${step} + 1 = ${nQ} (including the quadrat at 0 m).` }),
      P.manual({ label: "(e)", marks: 2, stem: "Suggest two other variables that might affect plantain abundance and how their effect could be reduced.", points: ["Soil moisture / shade / soil type or pH: choose transects on the same type of ground away from trees, measure and record them", "Grazing, mowing or watering of the field: sample on one day / in an area mown in the same way / time of year"], modelAnswer: "Shade from trees and differences in soil moisture or type could affect plantain, so transects should be placed on open ground of the same soil, away from trees, with moisture recorded. The whole field should have been mown in the same way, and all transects sampled on the same day." }),
      P.manual({ label: "(f)", marks: 1, stem: "Give one safety precaution.", points: ["Wash hands after handling soil / wear gloves (soil may contain pathogens or animal droppings); watch for people using the path or sports equipment; low risk"], modelAnswer: "Wear gloves or wash hands after handling soil, and keep clear of people using the path; the risk is low." }),
      P.manual({ label: "(g)", marks: 4, stem: "Explain how Tatenda should analyse his results to test the hypothesis.", points: [
        "Calculate mean percentage cover (and mean penetration depth) at each distance",
        "Plot mean cover against distance (and against compaction) on a scatter graph / line graph with error bars",
        "Use Spearman's rank correlation (percentage cover not normally distributed) between distance (or compaction) and cover",
        "Null hypothesis: no correlation; compare rs with the critical value at p = 0.05 for the number of pairs; significant negative correlation supports the hypothesis (but does not prove trampling is the cause)",
      ], modelAnswer: "He should calculate the mean percentage cover and mean penetration depth at each distance and plot cover against distance, and cover against compaction, with error bars. Because percentage cover estimates are not normally distributed, he should use Spearman's rank correlation, with the null hypothesis that there is no correlation between distance and cover. If rs is negative and larger in size than the critical value at p = 0.05 for the number of pairs, there is a significant negative correlation, which supports the hypothesis, although correlation alone does not prove that trampling is the cause." }),
    ]),
    explanation: "Plan a belt transect with an abiotic measurement, replication, control of other variables and a correlation test.",
    hints: ["Which kind of sampling suits a gradient?", "Which correlation test suits percentage cover?"],
  });

  // ---------------------------------------------------------------- AN1: t-test (mopane worm length on two host sites)
  const s1 = [84.5, 89.0, 81.5, 93.0, 87.5, 86.0, 90.5, 83.5];
  const s2 = [78.5, 76.0, 83.0, 77.5, 73.0, 80.5, 76.5, 79.5];
  const r = tTest(s1, s2);
  const ss2 = sum(s2.map((x) => (x - r.mean2) ** 2));
  b.struct({
    ...P5, d: 5,
    concepts: [A("evolution.t-test"), A("skills.descriptive-statistics")],
    stem: `Mopane worms (caterpillars of an emperor moth) are collected for food. Sipho measured the body lengths of final-stage caterpillars collected from mopane trees at two sites: site 1 on deep, moist soil and site 2 on shallow, stony soil.\n\n${table(["Site", "Body length / mm"], [["1", s1.map((x) => x.toFixed(1)).join(", ")], ["2", s2.map((x) => x.toFixed(1)).join(", ")]])}\n\nFor site 1, the mean is ${dpStr(r.mean1, 3)} mm and the standard deviation is ${dpStr(r.s1, 2)} mm.\n\nThe formulae are $s = \\sqrt{\\dfrac{\\sum (x - \\bar{x})^2}{n - 1}}$ and $t = \\dfrac{|\\bar{x}_1 - \\bar{x}_2|}{\\sqrt{\\dfrac{s_1^2}{n_1} + \\dfrac{s_2^2}{n_2}}}$.\n\n${table(["Degrees of freedom", "12", "13", "14", "15", "16"], [["t at p = 0.05", "2.18", "2.16", "2.14", "2.13", "2.12"]])}`,
    parts: checkExam(EXAM.CAM_P5_ANALYSIS, [
      P.manual({ label: "(a)", marks: 2, stem: "Explain why a t-test is suitable for these data.", points: ["Comparing the means of two (independent) samples", "Body length is continuous data, likely normally distributed with similar standard deviations"], modelAnswer: "The investigation compares the means of two independent samples, and body length is continuous data that is likely to be roughly normally distributed with similar spread at both sites." }),
      P.manual({ label: "(b)", marks: 1, stem: "State the null hypothesis.", points: ["There is no significant difference between the mean body lengths of caterpillars from the two sites; any difference is due to chance"], modelAnswer: "There is no significant difference between the mean body lengths of caterpillars from sites 1 and 2; any difference is due to chance." }),
      P.num({ label: "(c)", marks: 1, stem: "Calculate the mean body length at site 2, in mm, to three significant figures.", value: r.mean2, sf: 3, unit: "mm", explanation: `${dpStr(sum(s2), 1)} ÷ 8 = ${dpStr(r.mean2, 4)} = ${sfStr(r.mean2, 3)} mm.` }),
      P.num({ label: "(d)", marks: 2, stem: `Σ(x − x̄)² for site 2 is ${dpStr(ss2, 2)} mm². Calculate the standard deviation for site 2, in mm, to two decimal places.`, value: r.s2, dp: 2, unit: "mm", wrong: [dpStr(Math.sqrt(ss2 / 8), 2)], explanation: t`$\sqrt{${ss2} \div 7} = ${dpStr(r.s2, 2)}$ mm.` }),
      P.num({ label: "(e)", marks: 2, stem: "Calculate t, to three significant figures.", value: r.t, sf: 3, explanation: t`$t = \dfrac{${dpStr(r.mean1, 3)} - ${r.mean2}}{\sqrt{${dpStr(r.s1, 2)}^2/8 + ${dpStr(r.s2, 2)}^2/8}} = ${sfStr(r.t, 3)}$.` }),
      P.num({ label: "(f)", marks: 1, stem: "State the degrees of freedom.", value: r.df, wrong: [7, 15], explanation: "8 + 8 − 2 = 14." }),
      P.manual({ label: "(g)", marks: 2, stem: "Use your value of t to reach a conclusion.", points: [`t (${sfStr(r.t, 3)}) is greater than the critical value of ${r.crit} at 14 degrees of freedom`, "So the difference is significant (p < 0.05); reject the null hypothesis: caterpillars from site 1 are longer"], modelAnswer: `t = ${sfStr(r.t, 3)} is greater than ${r.crit}, the critical value for 14 degrees of freedom at p = 0.05, so the difference is significant and the null hypothesis is rejected: caterpillars from site 1 are significantly longer.` }),
      P.manual({ label: "(h)", marks: 3, stem: "Evaluate the investigation and suggest how the conclusion that soil type affects caterpillar size could be tested further.", points: [
        "Only 8 caterpillars per site / one site of each soil type: small sample, may not be representative",
        "Other variables differ between sites (tree size, leaf quality, temperature, predators, collection date, caterpillar age/stage)",
        "Sample more sites of each soil type at random, at the same date and stage / measure leaf nitrogen or water content; correlation does not show cause",
      ], modelAnswer: "With only eight caterpillars from one site of each soil type, the samples may not be representative. Other variables, such as tree size, leaf quality, temperature, predators and the exact stage or collection date of the caterpillars, may differ between the sites. To test the idea further, caterpillars should be sampled at random from several sites of each soil type at the same stage and date, and leaf quality measured; even then a difference between sites does not prove that soil is the cause." }),
      P.manual({ label: "(i)", marks: 1, stem: "Suggest one further measurement that would help to explain the difference.", points: ["Water / nitrogen / protein content of the mopane leaves at each site (or leaf size, tree height)"], modelAnswer: "The water or nitrogen content of mopane leaves at each site." }),
    ]),
    explanation: "Justify the t-test, calculate the mean, SD and t, compare with the critical value and evaluate the field method.",
    hints: ["Divide by n − 1 for the standard deviation.", "df = n₁ + n₂ − 2."],
    calculator: true,
  });
  if (!r.significant) throw new Error("expected significant");

  // ---------------------------------------------------------------- AN2: Spearman's rank (bare ground and grass cover)
  const dist = [1.5, 3, 4.5, 6, 7.5, 9, 10.5, 12, 13.5, 15];
  const bare = [63, 51, 57, 42, 46, 13, 36, 29, 4, 4];
  const sp = spearman(dist, bare);
  const crit = SPEARMAN_CRIT_05[10];
  b.struct({
    ...P5, d: 5,
    concepts: [A("biodiversity.diversity-statistics"), A("biodiversity.sampling")],
    stem: `Rudo investigated grazing pressure around a cattle drinking trough in a communal area. She estimated the percentage of bare ground in quadrats at different distances from the trough.\n\n${table(["Distance from trough / m", ...dist.map(String)], [["Bare ground / %", ...bare.map(String)]])}\n\nThe formula is $r_s = 1 - \\dfrac{6 \\sum D^2}{n^3 - n}$. The critical value of $r_s$ for 10 pairs at p = 0.05 is ${crit}.`,
    parts: checkExam(EXAM.CAM_P5_ANALYSIS, [
      P.manual({ label: "(a)", marks: 2, stem: "Explain why Spearman's rank correlation is more appropriate than Pearson's correlation for these data.", points: ["Percentage bare ground is an estimate / not normally distributed", "Testing for a correlation (relationship) between two variables that need not be linear, with 5-20 pairs (here 10)"], modelAnswer: "Percentage bare ground is an estimate that is unlikely to be normally distributed, and the relationship need not be linear; Spearman's test uses ranks and is suitable for 5 to 20 pairs, here 10." }),
      P.manual({ label: "(b)", marks: 1, stem: "State the null hypothesis.", points: ["There is no correlation between distance from the trough and the percentage of bare ground"], modelAnswer: "There is no correlation between distance from the trough and percentage bare ground." }),
      P.group({ label: "(c)", stem: "The two values of 4% are tied.", parts: [
        P.num({ label: "(i)", marks: 1, stem: "State the rank given to each value of 4% (rank 1 = smallest).", value: 1.5, wrong: [1, 2], explanation: "They occupy ranks 1 and 2, so each gets 1.5." }),
        P.num({ label: "(ii)", marks: 2, stem: "Calculate ΣD².", value: sp.sumD2, dp: 1, explanation: `D² values: ${sp.rows.map((x) => x.d2).join(", ")}; total ${sp.sumD2}.` }),
      ] }),
      P.num({ label: "(d)", marks: 2, stem: "Calculate rs, to three significant figures.", value: sp.rs, sf: 3, explanation: t`$r_s = 1 - \dfrac{6 \times ${sp.sumD2}}{1000 - 10} = 1 - \dfrac{${6 * sp.sumD2}}{990} = ${sfStr(sp.rs, 3)}$.` }),
      P.manual({ label: "(e)", marks: 2, stem: "State your conclusion.", points: [`The size of rs (${sfStr(Math.abs(sp.rs), 3)}) is greater than ${crit}: significant; reject the null hypothesis`, "Negative correlation: bare ground decreases with distance from the trough"], modelAnswer: `rs = ${sfStr(sp.rs, 3)}; its size is greater than ${crit}, so there is a significant negative correlation: the percentage of bare ground decreases as distance from the trough increases. The null hypothesis is rejected.` }),
      P.manual({ label: "(f)", marks: 2, stem: "Suggest an explanation for the correlation, and explain why it does not prove the cause.", points: ["Cattle concentrate near the trough: more grazing and trampling remove vegetation and compact soil", "Correlation only shows the variables change together; other factors (soil type, slope, water splashing) could vary with distance"], modelAnswer: "Cattle gather near the trough, so grazing and trampling remove plants and compact the soil, leaving more bare ground. However, a correlation shows only that the variables change together; soil type, slope or water spilt from the trough could also vary with distance." }),
      P.manual({ label: "(g)", marks: 3, stem: "Evaluate the reliability of Rudo's data and suggest improvements.", points: [
        "One quadrat per distance / one transect only: may not be representative",
        "Percentage cover estimates are subjective / two readings of 9% suggest limited precision",
        "Repeat transects in several directions from the trough (and at other troughs), use a gridded quadrat, calculate means / measure grazing (dung counts) or soil compaction",
      ], modelAnswer: "There is only one quadrat at each distance along a single line, so the data may not represent the whole area, and estimates of percentage cover are subjective. Rudo should run transects in several directions from the trough and at other troughs, use a gridded quadrat to improve her estimates, take means at each distance and measure grazing pressure directly, for example by counting dung." }),
    ]),
    explanation: "Choose and justify Spearman's test, rank with ties, calculate rs and interpret without claiming cause.",
    hints: ["Rank each variable separately.", "n³ − n = 990 for n = 10."],
    calculator: true,
  });
  if (!sp.significant) throw new Error("expected significant");

  // ---------------------------------------------------------------- AN3: Simpson's index (miombo and pine plantation)
  const nat = [12, 10, 9, 8, 7, 6, 5, 3];
  const pine = [38, 9, 4, 2, 1];
  const S1 = simpson(nat);
  const S2 = simpson(pine);
  b.struct({
    ...P5, d: 4,
    concepts: [A("biodiversity.diversity-statistics"), A("biodiversity.sampling")],
    stem: `Students compared ground beetles in natural miombo woodland and in a nearby pine plantation in the Eastern Highlands. At each site, ten pitfall traps were set for three nights in the same week, and the beetles were identified to species and released.\n\n${table(["Site", "Numbers of each species caught"], [["Miombo woodland", nat.join(", ")], ["Pine plantation", pine.join(", ")]])}\n\nSimpson's index of diversity is $D = 1 - \\sum \\left(\\dfrac{n}{N}\\right)^2$.`,
    parts: checkExam(EXAM.CAM_P5_ANALYSIS, [
      P.num({ label: "(a)", marks: 1, stem: "State the species richness of the miombo woodland sample.", value: nat.length, wrong: [S1.N], explanation: `${nat.length} species.` }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate Simpson's index for the miombo woodland, to three significant figures.", value: S1.D, sf: 3, wrong: [sfStr(S1.sumFrac2, 3)], explanation: t`$N = ${S1.N}$; $\sum (n/N)^2 = ${dpStr(S1.sumFrac2, 4)}$; $D = ${sfStr(S1.D, 3)}$.` }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate Simpson's index for the pine plantation, to three significant figures.", value: S2.D, sf: 3, wrong: [sfStr(S2.sumFrac2, 3)], explanation: t`$N = ${S2.N}$; $\sum (n/N)^2 = ${dpStr(S2.sumFrac2, 4)}$; $D = ${sfStr(S2.D, 3)}$.` }),
      P.manual({ label: "(d)", marks: 2, stem: "Compare the diversity of the two sites.", points: [`Miombo diversity is much higher (D = ${sfStr(S1.D, 3)}) than pine (D = ${sfStr(S2.D, 3)})`, "Miombo has more species (8 v 5) and they are more evenly represented; one species dominates the plantation (38 of 54)"], modelAnswer: `The miombo woodland is much more diverse (D = ${sfStr(S1.D, 3)}) than the pine plantation (D = ${sfStr(S2.D, 3)}). It has more species, 8 compared with 5, and they are much more evenly represented, whereas one species makes up 38 of the 54 beetles in the plantation.` }),
      P.manual({ label: "(e)", marks: 2, stem: "Suggest reasons for the difference in diversity.", points: ["Plantation is a monoculture of one introduced tree: fewer food sources / microhabitats / niches", "Acidic pine needle litter / less undergrowth / different microclimate suits only a few species"], modelAnswer: "The plantation is a monoculture of an introduced tree, so it offers fewer kinds of food and microhabitats, and its acidic needle litter and sparse undergrowth suit only a few beetle species, one of which becomes dominant." }),
      P.manual({ label: "(f)", marks: 3, stem: "Evaluate the method used to compare the two sites.", points: [
        "Strength: same number of traps, same nights and same week at both sites (standardised effort)",
        "Pitfall traps catch only active ground-dwelling beetles / more active species over-represented; trap placement may not be random",
        "Small total catch and a single week: repeat in different seasons, more traps placed randomly, and replicate sites of each habitat",
      ], modelAnswer: "Sampling effort was standardised: the same number of traps for the same nights in the same week at each site. However, pitfall traps catch only beetles active on the ground, and very active species are over-represented, so the sample may not reflect true abundances. The catches were small and taken in one week from one site of each habitat; more traps placed at random, repeated in different seasons and at other woodlands and plantations, would make the comparison more reliable." }),
      P.manual({ label: "(g)", marks: 3, stem: "The students concluded that converting miombo woodland to pine plantation reduces beetle diversity. Discuss how far the data support this conclusion.", points: [
        "Supports: much lower D in the plantation, with fewer species and one dominant species",
        "But only one site of each type and one week: cannot generalise / no statistical test of the difference",
        "Other differences between sites (altitude, soil, history, distance) are not controlled; the plantation may not have been miombo before; correlation of habitat with D does not prove cause",
      ], modelAnswer: "The data are consistent with the conclusion, because the plantation has a much lower D, fewer species and one dominant species. However, only one site of each type was sampled in one week, and no test of significance was possible, so the result may not apply generally. The sites may also differ in altitude, soil or history, and the plantation land may not have been miombo before planting, so the data alone cannot show that conversion caused the difference." }),
    ]),
    explanation: "Calculate D for both sites, compare richness and evenness, and evaluate the sampling and the conclusion.",
    hints: ["Find N for each site first.", "Subtract Σ(n/N)² from 1."],
    calculator: true,
  });
  if (!(S1.D > S2.D)) throw new Error("expected miombo more diverse");

  // ---------------------------------------------------------------- AN4: SD, SE and 95% CI error bars (maize cob length)
  const g1 = [18.4, 20.1, 17.6, 19.3, 21.0, 18.8, 19.7, 17.9, 20.4, 18.2, 19.0, 20.6];
  const g2 = [16.9, 17.8, 15.6, 18.1, 16.2, 17.3, 16.6, 15.9, 17.0, 16.4, 17.6, 16.0];
  const c1 = ci95(g1);
  const c2 = ci95(g2);
  const s1g = sd(g1);
  b.struct({
    ...P5, d: 4,
    concepts: [A("skills.descriptive-statistics"), A("skills.planning-evaluation")],
    stem: `Chipo compared the lengths of maize cobs from plots given manure (M) and plots given no fertiliser (N) in a school garden in Chinhoyi. She measured 12 cobs from each treatment.\n\n${table(["Treatment", "Cob length / cm"], [["M", g1.map((x) => x.toFixed(1)).join(", ")], ["N", g2.map((x) => x.toFixed(1)).join(", ")]])}\n\nFor treatment N, the mean is ${dpStr(c2.mean, 2)} cm, the standard error is ${dpStr(c2.se, 3)} cm and the 95% confidence interval is ${dpStr(c2.lower, 2)} to ${dpStr(c2.upper, 2)} cm.\n\nThe formulae are $s = \\sqrt{\\dfrac{\\sum (x - \\bar{x})^2}{n - 1}}$, $SE = \\dfrac{s}{\\sqrt{n}}$ and 95% CI $= \\bar{x} \\pm 2 \\times SE$.`,
    parts: checkExam(EXAM.CAM_P5_ANALYSIS, [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the mean cob length for treatment M, in cm, to two decimal places.", value: c1.mean, dp: 2, unit: "cm", explanation: `${dpStr(sum(g1), 1)} ÷ 12 = ${dpStr(c1.mean, 2)} cm.` }),
      P.num({ label: "(b)", marks: 2, stem: `Σ(x − x̄)² for M is ${dpStr(sum(g1.map((x) => (x - c1.mean) ** 2)), 2)}. Calculate the standard deviation for M, in cm, to three significant figures.`, value: s1g, sf: 3, unit: "cm", wrong: [sfStr(Math.sqrt(sum(g1.map((x) => (x - c1.mean) ** 2)) / 12), 3)], explanation: t`$\sqrt{${dpStr(sum(g1.map((x) => (x - c1.mean) ** 2)), 2)} \div 11} = ${sfStr(s1g, 3)}$ cm.` }),
      P.num({ label: "(c)", marks: 1, stem: "Calculate the standard error for M, in cm, to three significant figures.", value: c1.se, sf: 3, unit: "cm", explanation: t`$${sfStr(s1g, 4)} \div \sqrt{12} = ${sfStr(c1.se, 3)}$ cm.` }),
      P.group({ label: "(d)", stem: "Calculate the 95% confidence interval for M, in cm, to two decimal places.", parts: [
        P.num({ label: "(i)", marks: 1, stem: "Lower limit.", value: c1.lower, dp: 2, unit: "cm", explanation: `${dpStr(c1.mean, 2)} − 2 × ${dpStr(c1.se, 4)} = ${dpStr(c1.lower, 2)} cm.` }),
        P.num({ label: "(ii)", marks: 1, stem: "Upper limit.", value: c1.upper, dp: 2, unit: "cm", explanation: `${dpStr(c1.mean, 2)} + 2 × ${dpStr(c1.se, 4)} = ${dpStr(c1.upper, 2)} cm.` }),
      ] }),
      P.manual({ label: "(e)", marks: 2, stem: "Describe what a bar chart of the two means with 95% CI error bars would show.", points: [`Bar for M (${dpStr(c1.mean, 2)} cm) taller than N (${dpStr(c2.mean, 2)} cm), with error bars from ${dpStr(c1.lower, 2)} to ${dpStr(c1.upper, 2)} and ${dpStr(c2.lower, 2)} to ${dpStr(c2.upper, 2)} cm`, "The error bars do not overlap (a clear gap between the bars)"], modelAnswer: `The bar for M (${dpStr(c1.mean, 2)} cm) would be taller than that for N (${dpStr(c2.mean, 2)} cm). The error bars would run from ${dpStr(c1.lower, 2)} to ${dpStr(c1.upper, 2)} cm and from ${dpStr(c2.lower, 2)} to ${dpStr(c2.upper, 2)} cm, so they would not overlap.` }),
      P.manual({ label: "(f)", marks: 2, stem: "What can Chipo conclude from the error bars?", points: ["The 95% CIs do not overlap, so the difference in mean cob length is likely to be significant / not due to chance", "Manure is associated with longer cobs; a t-test would confirm significance"], modelAnswer: "Because the 95% confidence intervals do not overlap, the difference between the mean cob lengths is likely to be significant rather than due to chance, so manured plots produced longer cobs; a t-test would confirm this." }),
      P.manual({ label: "(g)", marks: 2, stem: "Explain why error bars showing ±2 SE are more useful here than error bars showing ±1 SD.", points: ["SD shows the spread of individual cobs, not the precision of the mean / SD bars often overlap even when means differ significantly", "± 2SE is the 95% CI for the mean, so non-overlap indicates a likely significant difference"], modelAnswer: "SD bars show how much individual cobs vary, not how precisely each mean is known, and they often overlap even when means differ significantly. ± 2SE bars are 95% confidence intervals for the means, so whether they overlap gives a guide to significance." }),
      P.manual({ label: "(h)", marks: 3, stem: "Evaluate the design of Chipo's investigation.", points: [
        "Strength: 12 cobs per treatment, enough to calculate SD and SE",
        "Cobs may come from only one plot per treatment / plots not randomly assigned / plots may differ in soil, water, shade",
        "Improve: several replicate plots of each treatment, randomly assigned; same variety, planting date, watering; choose cobs at random (e.g. the top cob of randomly chosen plants)",
      ], modelAnswer: "Measuring 12 cobs per treatment allows the standard deviation and standard error to be calculated. However, if each treatment was a single plot, differences in soil, water or shade between the plots could explain the result, and the cobs may not have been chosen at random. Several replicate plots of each treatment should be randomly assigned, with the same variety, planting date and watering, and cobs chosen at random, such as the top cob of randomly selected plants." }),
    ]),
    explanation: "Mean, SD, SE and 95% CI; interpret non-overlapping confidence intervals and evaluate the design.",
    hints: ["Divide by n − 1 = 11 for s.", "SE = s/√12."],
    calculator: true,
  });
  if (!(c1.lower > c2.upper)) throw new Error("expected non-overlap");
});
