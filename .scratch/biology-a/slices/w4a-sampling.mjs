// W4a: sampling to assess distribution and abundance (Cambridge A Level only).
import { concept, P, t, chk, table, dpStr, sfStr, mean, sum, lincoln } from "../lib.mjs";

const LIN_F = t`$N = \dfrac{n_1 \times n_2}{m_2}$`;

concept("abio.biodiversity.sampling", { file: "biodiversity/sampling", keyPrefix: "biodiversity.sampling" }, (b) => {
  const calc = (o) => b.calc({ ...o, workedSolution: o.workedSolution ?? o.explanation });

  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Why are quadrats placed at random coordinates rather than chosen by the investigator?",
    options: [
      ["To avoid bias, so the samples represent the whole area", "Correct."],
      ["To make sure that every species present in the area is found and recorded", "Random sampling does not guarantee finding rare species."],
      ["To reduce the number of quadrats that must be sampled", "Randomness does not reduce the sample size needed."],
      ["To show how a species changes along a gradient", "That needs systematic sampling along a transect."],
    ],
    answer: "A",
    explanation: "Random coordinates give each point an equal chance of selection, removing investigator bias.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which measure is most suitable for recording the abundance of a creeping grass that forms a continuous mat?",
    options: [
      ["Percentage cover in each quadrat", "Correct: individual plants cannot be separated."],
      ["Number of individual plants per m²", "Individuals of a mat-forming grass cannot be counted."],
      ["Lincoln index from marked plants", "Mark-release-recapture is for mobile animals."],
      ["Number of plants touching a line transect", "A line transect records presence, not abundance."],
    ],
    answer: "A",
    explanation: "Percentage cover is used when individuals cannot be counted.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the advantage of a belt transect over a line transect?",
    options: [
      ["It measures abundance at each point, not just presence", "Correct: quadrats along the line give density or cover."],
      ["It is quicker to carry out in the field", "A belt transect is slower."],
      ["It samples the area at random", "Transects sample systematically."],
      ["It estimates the population size of mobile animals such as grasshoppers", "That is mark-release-recapture."],
    ],
    answer: "A",
    explanation: "Quadrats placed along the line allow density, frequency or percentage cover to be recorded.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which is an assumption of the mark-release-recapture method?",
    options: [
      ["Marked animals mix randomly with the unmarked population", "Correct."],
      ["The population grows rapidly through births between the two samples", "The population must be closed: no significant births or deaths."],
      ["Marked animals are easier for predators to find", "Marking must not affect survival."],
      ["The second sample is always bigger than the first", "Sample sizes need not differ."],
    ],
    answer: "A",
    explanation: "Random mixing, harmless lasting marks, a closed population and equal catchability are assumed.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Some paint marks wash off beetles in heavy rain between the two samples. How does this affect the Lincoln index estimate?",
    options: [
      ["The population is overestimated", "Correct: m₂ is too small, so n₁n₂/m₂ is too large."],
      ["The population is underestimated", "Fewer recaptures make the estimate larger, not smaller."],
      ["There is no effect, because n₁ is unchanged", "m₂ is reduced, which changes N."],
      ["The index cannot be calculated at all", "It can be calculated, but it is inaccurate."],
    ],
    answer: "A",
    explanation: "Lost marks reduce the counted m₂, increasing N = n₁n₂/m₂.",
    hints: ["m₂ is in the denominator."],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which investigation is best carried out with a belt transect?",
    options: [
      ["How plant species change from a riverbank up the valley side", "Correct: a gradient of conditions."],
      ["The mean density of a weed in a uniform maize field", "A uniform area is sampled randomly."],
      ["The number of tilapia in a farm dam", "Fish need mark-release-recapture."],
      ["The diversity of night-flying insects attracted to a light trap", "A light trap is a capture method, not a transect."],
    ],
    answer: "A",
    explanation: "Transects measure change along an environmental gradient.",
    hints: ["Is there a gradient?"],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Small mammals caught in baited traps often return to the traps for the food (they become 'trap-happy'). How does this affect a population estimate by the Lincoln index?",
    options: [
      ["The population is underestimated, because too many marked animals are recaptured", "Correct: m₂ is too large."],
      ["The population is overestimated, because the bait attracts extra unmarked animals", "Extra unmarked animals raise n₂ only; trap-happy marked animals raise m₂ more."],
      ["The estimate is unaffected, because all animals take bait equally", "Trap-happiness means marked animals are more likely to be caught."],
      ["The estimate is unaffected, because n₁ and n₂ both rise equally", "m₂ is the value that is biased."],
    ],
    answer: "A",
    explanation: "If marked animals are more catchable, m₂ is inflated and N = n₁n₂/m₂ is too small.",
    hints: ["Which value is biased: n₁, n₂ or m₂?"],
  });

  // Lincoln index calculation
  const L1 = { n1: 60, n2: 45, m2: 9 };
  const NL = lincoln(L1.n1, L1.n2, L1.m2);
  chk(NL, 300);
  calc({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: `Rudo netted ${L1.n1} grasshoppers in a sorghum field, marked them and released them. The next day she caught ${L1.n2}, of which ${L1.m2} were marked. Using ${LIN_F}, estimate the population.`,
    value: NL, unit: "individuals", wrong: [(L1.n1 * L1.m2) / L1.n2],
    explanation: t`$N = \dfrac{${L1.n1} \times ${L1.n2}}{${L1.m2}} = \dfrac{${L1.n1 * L1.n2}}{${L1.m2}} = ${NL}$ grasshoppers.`,
  });
  // density
  const q = [3, 0, 5, 2, 4, 1, 6, 0, 3, 2, 4, 2];
  const side = 0.5;
  const dens = mean(q) / (side * side);
  calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Twelve 0.5 m × 0.5 m quadrats placed at random contained these numbers of a thistle: ${q.join(", ")}. Calculate the density of thistles per m².`,
    value: dens, unit: "per m²", wrong: [mean(q), mean(q) / side],
    explanation: t`1. Mean per quadrat $= ${sum(q)} \div 12 = ${mean(q)}$.
2. Quadrat area $= 0.5 \times 0.5 = 0.25$ m².
3. Density $= ${mean(q)} \div 0.25 = ${dens}$ per m².
Forgetting to divide by the area gives ${mean(q)}; dividing by 0.5 (the side) gives ${mean(q) / side}.`,
    hints: ["Find the area of one quadrat."],
  });
  const freq = (q.filter((x) => x > 0).length / q.length) * 100;
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: `Using the same twelve quadrats (${q.join(", ")} thistles), calculate the species frequency of the thistle as a percentage, to three significant figures.`,
    value: freq, unit: "%", sf: 3, wrong: [10],
    explanation: `Present in ${q.filter((x) => x > 0).length} of 12 quadrats: ${q.filter((x) => x > 0).length} ÷ 12 × 100 = ${sfStr(freq, 3)}%.`,
  });
  // total population from density
  const dd = 7.5, len = 60, wid = 35;
  calc({
    d: 3, skill: "APPLICATION",
    stem: `The mean density of a sedge in a vlei is ${dd} plants per m². The vlei is a rectangle ${len} m by ${wid} m. Estimate the total number of sedge plants.`,
    value: dd * len * wid, unit: "individuals", wrong: [dd * (len + wid) * 2],
    explanation: t`1. Area $= ${len} \times ${wid} = ${len * wid}$ m².
2. Population $= ${dd} \times ${len * wid} = ${dd * len * wid}$ plants.`,
    hints: ["Density × area."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Mark-release-recapture is a suitable method for estimating the population of a tree species in a woodland.",
    answer: false,
    explanation: "False. Trees do not move; they are counted directly or in quadrats. Mark-release-recapture is for mobile animals.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The total percentage cover in a quadrat can be more than 100% when plants grow in layers.",
    answer: true,
    explanation: "True. Overlapping plants are each estimated, so the total can exceed 100%.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each organism with the most suitable method for estimating its abundance.",
    pairs: [
      ["Ground beetles in a grassland", "Pitfall traps with mark-release-recapture"],
      ["Mosses on a rock face", "Percentage cover in quadrats"],
      ["Limpet-like snails on rocks in a uniform habitat", "Counts in random quadrats"],
      ["Plants from a dam edge to dry ground", "Belt transect with quadrats at intervals"],
    ],
    explanation: "Mobile animals: MRR; spreading plants: cover; countable sessile animals: random quadrat counts; gradients: belt transect.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the method.",
    template: "To sample at random, lay out two tapes at right angles and use a random number {{blank:a}} to choose coordinates. Where conditions change across a habitat, sample {{blank:b}} along a transect instead.",
    blanks: [
      { id: "a", accepted: ["generator"], choices: ["generator", "key", "scale"] },
      { id: "b", accepted: ["systematically"], choices: ["systematically", "randomly", "occasionally"] },
    ],
    explanation: "Random number generator for coordinates; systematic sampling along a transect on a gradient.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the type of transect in which quadrats are placed at regular intervals along a line.",
    accepted: ["belt transect", "interrupted belt transect", "belt"],
    wrong: ["line transect"],
    explanation: "A belt transect (interrupted belt transect if there are gaps between quadrats).",
  });

  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Describe how you would use quadrats to estimate the density of a herb in a 20 m × 20 m area of uniform grassland.",
    points: [
      "Lay two tapes along two edges at right angles as axes",
      "Generate random coordinates (random number generator) and place a quadrat of known area (e.g. 0.25 m²) at each",
      "Count the herbs in each quadrat in a large number of quadrats (e.g. 20 or more / until the running mean levels off)",
      "Calculate the mean per quadrat and divide by the quadrat area to give density per m² (× 400 m² for the population)",
    ],
    modelAnswer: "Lay two tape measures at right angles along two edges of the area. Use a random number generator to produce coordinates and place a 0.25 m² quadrat at each. Count the herbs in each quadrat, sampling at least 20 quadrats or until the running mean changes little. Calculate the mean per quadrat and divide by 0.25 to give the density per m²; multiplying by 400 m² estimates the population.",
    explanation: "Random coordinates, known area, enough quadrats, mean ÷ area.",
    hints: ["Four steps: axes, coordinates, counting, calculating."],
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "Explain why the Lincoln index would give an unreliable estimate for a population of frogs sampled at a breeding pond during the rains.",
    points: [
      "Many frogs arrive at (or leave) the pond during breeding: immigration and emigration, so the population is not closed",
      "Marked frogs may not mix randomly with newcomers before the second sample",
      "Births / deaths (e.g. predation) may change numbers; marks on moist skin may be lost or harm the frogs",
    ],
    modelAnswer: "During the rains frogs move to and from the breeding pond, so the population is not closed and marked frogs may not mix evenly with newly arrived ones. Deaths from predation, and possible loss of marks from moist skin or harm caused by marking, also break the assumptions.",
    explanation: "Link each problem to an assumption.",
    hints: ["Think about which assumptions are broken."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "Suggest how a student could decide how many quadrats are needed to give a reliable estimate of the mean percentage cover of a grass.",
    points: [
      "Calculate a running (cumulative) mean after each additional quadrat",
      "Plot the running mean against the number of quadrats",
      "Enough quadrats have been used when the running mean levels off / changes very little with further quadrats",
    ],
    modelAnswer: "After each quadrat, calculate the mean of all the quadrats so far and plot this running mean against the number of quadrats. At first it fluctuates; when it levels off and further quadrats change it very little, enough quadrats have been sampled.",
    explanation: "Use a running mean.",
    hints: ["What happens to a running mean as the sample grows?"],
  });

  // Practice structured 1: mark-release-recapture
  const M = { n1: 84, n2: 70, m2: 14 };
  const NM = lincoln(M.n1, M.n2, M.m2);
  chk(NM, 420);
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: `Farai estimated the population of woodlice under logs in a plantation near Mutare. He caught ${M.n1} woodlice, marked each with a small dot of non-toxic paint on the underside, and released them. Three days later he caught ${M.n2} woodlice, ${M.m2} of which were marked. The formula is ${LIN_F}.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Estimate the population of woodlice.", value: NM, unit: "individuals", wrong: [(M.n1 * M.m2) / M.n2], explanation: t`$\dfrac{${M.n1} \times ${M.n2}}{${M.m2}} = ${NM}$.` }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain why the paint was put on the underside and why it must be non-toxic.", points: ["Underside: does not make woodlice more visible to predators (so survival not affected)", "Non-toxic: marking must not harm or kill them / alter behaviour, so they mix and are recaptured normally"], modelAnswer: "Paint on the underside does not make the woodlice more visible to predators, and non-toxic paint does not harm them or change their behaviour, so marked and unmarked woodlice survive and are caught equally." }),
      P.manual({ label: "(c)", marks: 2, stem: "Suggest why Farai waited three days before the second sample, and a problem with waiting much longer.", points: ["Three days allows marked woodlice to mix randomly back into the population", "Much longer: births, deaths, migration or moulting (losing marks) would break the closed-population assumption"], modelAnswer: "Waiting allows the marked woodlice to disperse and mix randomly with the rest. If he waited much longer, births, deaths and migration would change the population, and woodlice moult, so marks would be lost." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest how Farai could make the estimate more reliable.", points: ["Repeat the recapture on several occasions / repeat the whole procedure and take a mean", "Use larger samples / sample the whole area evenly"], modelAnswer: "He could repeat the procedure several times and calculate a mean estimate, and use larger samples collected from all parts of the plantation." }),
    ],
    explanation: "Calculate N and link the method to the assumptions.",
    hints: ["Multiply n₁ by n₂, then divide by m₂."],
    calculator: true,
  });

  // Practice structured 2: belt transect data
  const dist = [0, 4, 8, 12, 16, 20];
  const sedge = [68, 54, 31, 12, 4, 0];
  const grass = [5, 14, 30, 47, 58, 62];
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `Nyasha placed a 1 m² quadrat every 4 m along a belt transect running from the edge of a dam to dry grassland and estimated the percentage cover of two plants.\n\n${table(["Distance from water / m", ...dist.map(String)], [["Sedge cover / %", ...sedge.map(String)], ["Grass cover / %", ...grass.map(String)]])}`,
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Describe the distribution of the two species along the transect.", points: ["Sedge cover is highest at the water's edge (68%) and falls with distance to 0% at 20 m", "Grass cover increases from 5% at the edge to 62% at 20 m", "The two overlap / cross over between about 8 and 12 m"], modelAnswer: "Sedge cover is highest at the water's edge (68%) and decreases steadily to 0% at 20 m. Grass cover shows the opposite trend, rising from 5% to 62%. The two species overlap in the middle, crossing over between 8 m and 12 m." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the mean sedge cover, in %, over the six quadrats, to three significant figures.", value: mean(sedge), sf: 3, unit: "%", explanation: `${sum(sedge)} ÷ 6 = ${sfStr(mean(sedge), 3)}%.` }),
      P.manual({ label: "(c)", marks: 2, stem: "Suggest an explanation for the distribution of the sedge.", points: ["Soil water content / waterlogging is highest near the dam and falls with distance", "Sedge is adapted to (tolerates) waterlogged soil but is outcompeted by grass in drier soil"], modelAnswer: "Soil near the dam is waterlogged and becomes drier with distance. The sedge tolerates waterlogged soil, while in the drier soil further away the grass grows better and outcompetes it." }),
      P.manual({ label: "(d)", marks: 2, stem: "Name an abiotic factor Nyasha should measure at each quadrat and state how.", points: ["Soil moisture (or pH, or light intensity)", "Measured with a soil moisture probe / mass of soil before and after drying in an oven; pH meter or indicator; light meter"], modelAnswer: "Soil moisture, measured with a moisture probe, or by weighing a soil sample before and after drying it in an oven." }),
      P.manual({ label: "(e)", marks: 2, stem: "Evaluate the reliability of Nyasha's data and suggest one improvement.", points: ["Only one transect / one reading per distance, and percentage cover is subjective", "Repeat transects at several random points along the dam edge (and use a gridded quadrat / the same observer) and calculate means"], modelAnswer: "There is only one transect and one estimate at each distance, and percentage cover estimates are subjective, so the data may not be representative. She should repeat the transect at several randomly chosen points along the shore, use a gridded quadrat, and calculate mean cover at each distance." }),
      P.manual({ label: "(f)", marks: 2, stem: "State the statistical test Nyasha could use to see whether sedge cover is related to soil moisture, and why.", points: ["Spearman's rank correlation", "Percentage cover estimates are not normally distributed / testing for a relationship between two variables with 5-20 pairs"], modelAnswer: "Spearman's rank correlation, because she is looking for a relationship between two variables and percentage cover estimates are unlikely to be normally distributed." }),
    ],
    explanation: "Describe both trends with figures, link to an abiotic gradient and evaluate the method.",
    hints: ["Quote figures from both ends of the transect."],
  });

  b.card("FORMULA", "Lincoln index", "N = n₁ × n₂ ÷ m₂ (n₁ first catch marked; n₂ second catch; m₂ marked in second catch).");
  b.card("CONCEPT", "Assumptions of mark-release-recapture", "Random mixing; marks harmless and not lost; closed population; equal chance of capture.");
  b.card("DEFINITION", "Species frequency", "The percentage of quadrats in which a species is present.");
  b.card("DEFINITION", "Percentage cover", "The percentage of a quadrat's area covered by a species, seen from above.");
  b.card("CONCEPT", "Random or systematic sampling?", "Random coordinates in a uniform area; systematic sampling along a transect where conditions change.");
  b.card("CONCEPT", "Line versus belt transect", "Line: organisms touching the line (presence). Belt: quadrats at intervals (abundance).");
  b.card("CONCEPT", "Marks lost between samples", "m₂ too small, so the population is overestimated.");
  b.card("CONCEPT", "How many quadrats?", "Enough that the running mean levels off.");
});
