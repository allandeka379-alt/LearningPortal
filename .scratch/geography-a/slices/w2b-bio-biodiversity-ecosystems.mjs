// W2b: bio.biodiversity-ecosystems (ZIMSEC only; items are tagged to ZIMSEC automatically).
// Computed with simpson(): site A [30,25,20,15,10] D 0.775; site B [70,15,8,5,2] D 0.478; four equal species D 0.75; [97,1,1,1] D 0.059;
// quadrat counts [2,6,0,3,5,1,4,0,7,2] total 30, density 3.0, frequency 80%.
import { concept, P, geographyLevels, chk, rnd, sum, simpson } from "../lib.mjs";
import { mc, tbl } from "../tables/w2b-_q.mjs";

const SPECIES = ["Msasa", "Mutondo", "Bushwillow", "Acacia", "Sickle bush"];
const A = [30, 25, 20, 15, 10];
const B = [15, 8, 5, 2, 70];
const sA = simpson(A);
const sB = simpson(B);
chk(sA.N, 100);
const dA = rnd(sA.D, 3, 0.775, "dA");
const dB = rnd(sB.D, 3, 0.478, "dB");
const sumA = rnd(sA.sumFrac2, 3, 0.225, "sumA");
const dEq = rnd(simpson([25, 25, 25, 25]).D, 2, 0.75, "dEq");
const dDom = rnd(simpson([97, 1, 1, 1]).D, 2, 0.06, "dDom");
const TABAB = tbl(["Species", "Site A (protected woodlot)", "Site B (grazed and cut area)"], SPECIES.map((s, i) => [s, A[i], B[i]]).concat([["Total", sum(A), sum(B)]]));

const Q = [2, 6, 0, 3, 5, 1, 4, 0, 7, 2];
const qTotal = chk(sum(Q), 30);
const density = chk(qTotal / 10, 3);
const freq = chk((Q.filter((x) => x > 0).length / Q.length) * 100, 80);
const QTAB = tbl(["Quadrat", ...Q.map((_, i) => i + 1)], [["Plants counted", ...Q]]);

// Cover
const coverMean = chk((40 + 55 + 25 + 60 + 70) / 5, 50);

concept("ageo.bio.biodiversity-ecosystems", { file: "bio/biodiversity-ecosystems", keyPrefix: "bio.biodiversity-ecosystems" }, (b) => {
  mc(b, 1, "RECALL", "What does **species richness** measure?", [
    ["The number of different species in an area", "Correct: richness counts species, not individuals."],
    ["How equally individuals are shared between species", "That describes evenness."],
    ["The total mass of plants in an area", "That is biomass."],
    ["The number of individuals of one species per m²", "That is density."],
  ], "**Species richness** is the number of species present.");
  mc(b, 1, "RECALL", "In Simpson's diversity index, what does a value close to 1 indicate?", [
    ["High diversity", "Correct: many species with no single species dominating."],
    ["Very low diversity", "A value close to 0 indicates this."],
    ["Only one species is present", "That gives a value of 0."],
    ["The sample was too small to use", "Sample size is not shown by the index."],
  ], "With D = 1 − Σ(n/N)², values near **1** mean high diversity.");
  mc(b, 2, "UNDERSTANDING", "Why should quadrats be placed using random numbers?", [
    ["To avoid bias in choosing where to sample", "Correct: it prevents choosing typical-looking spots."],
    ["To make the counting of plants quicker", "Random placement does not speed counting."],
    ["To make sure every species is included in each quadrat", "Random placement cannot guarantee this."],
    ["To reduce the number of quadrats needed to zero", "Random sampling still needs enough quadrats."],
  ], "Random sampling avoids **bias**.");
  mc(b, 2, "UNDERSTANDING", "Why do late dry-season veld fires damage biodiversity more than early burns?", [
    ["They burn hotter and kill seedlings and young trees", "Correct: dry fuel makes intense fires."],
    ["They start more slowly and spread less far", "Late fires spread faster and further."],
    ["They add more nutrients to the soil than early fires", "Intense fires lose nutrients and harm soil life."],
    ["They only burn dead grass and leave woody plants unharmed", "Hot fires also kill woody plants."],
  ], "Late-season fires burn **hotter** because the fuel is very dry.");
  mc(b, 3, "APPLICATION", "Two woodlands each have six species. Woodland X has the individuals shared equally. In woodland Y one species makes up 90% of the individuals. Which statement is correct?", [
    ["X has the higher Simpson's index because it is more even", "Correct: richness is equal, but evenness differs."],
    ["Y has the higher Simpson's index because one species is abundant", "Dominance by one species lowers the index."],
    ["Both have the same index because richness is the same", "The index also depends on evenness."],
    ["The index cannot be calculated without knowing the area", "The index uses counts, not area."],
  ], "Equal richness but greater **evenness** gives a higher index.", { hints: ["Simpson's index uses both richness and evenness."] });
  mc(b, 3, "ANALYSIS", "Which change is most likely to reduce plant diversity in a communal woodland near a town?", [
    ["Heavy cutting for firewood and repeated burning", "Correct: removes trees and seedlings and favours a few tough species."],
    ["The creation of a fire committee and firebreaks", "These protect the vegetation."],
    ["The planting of indigenous trees in a woodlot", "This should increase diversity."],
    ["The introduction of a community wildlife scheme", "This should encourage protection."],
  ], "Repeated cutting and burning favour a few hardy species such as **sickle bush**.", { hints: ["Which activity removes many species and favours a few?"] });
  b.tf({ d: 1, skill: "RECALL", stem: "Simpson's diversity index is calculated as D = 1 − Σ(n/N)².", answer: true,
    feedbackTrue: "Correct: that is the formula used in this lesson.",
    feedbackFalse: "Not so: subtract the sum of squared proportions from 1.",
    explanation: "Square each proportion, add the squares and subtract from 1." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Two sites with the same number of species must have the same Simpson's diversity index.", answer: false,
    feedbackFalse: "Correct: the index also depends on how evenly the individuals are shared.",
    feedbackTrue: "Not so: evenness also matters.",
    explanation: "Equal richness with different evenness gives different indices." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "The number of individuals per square metre is the {{blank:a}}. The percentage of quadrats in which a species occurs is its {{blank:b}}. Spreading quadrats using random numbers reduces {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["density"], choices: ["density", "frequency", "richness"] },
      { id: "b", accepted: ["frequency"], choices: ["frequency", "density", "evenness"] },
      { id: "c", accepted: ["bias"], choices: ["bias", "evenness", "cover"] },
    ], explanation: "Density, frequency and bias." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each threat to a suitable response.",
    pairs: [
      ["Veld fires", "Fire committees and firebreaks"],
      ["Poaching", "Anti-poaching patrols and community scouts"],
      ["Loss of indigenous trees near a school", "A school woodlot with indigenous species"],
      ["Low local income from wildlife", "Community schemes such as CAMPFIRE"],
    ], explanation: "Each response targets the cause of the threat." });
  b.num({ d: 2, skill: "APPLICATION", daily: true, calculator: true, dp: 3,
    stem: `Illustrative counts of woody plants at a protected woodlot (Site A):\n\n${TABAB}\n\nFor Site A, the sum of (n/N)² is 0.225. Calculate Simpson's diversity index D = 1 − Σ(n/N)², to 3 decimal places.`,
    hints: ["Subtract the sum from 1."],
    value: dA, wrong: [0.225, 0.275],
    explanation: "D = 1 − 0.225 = **0.775**. The value 0.225 is the sum, before subtracting from 1." });
  b.calc({ d: 4, skill: "ANALYSIS", calculator: true, dp: 3,
    stem: `Use the table of counts:\n\n${TABAB}\n\nCalculate Simpson's diversity index D = 1 − Σ(n/N)² for Site B, to 3 decimal places.`,
    hints: ["Divide each count by N = 100, then square it.", "Add the five squares, then subtract from 1."],
    value: dB, wrong: [0.522, 0.7],
    explanation: "1. Proportions: 0.15, 0.08, 0.05, 0.02 and 0.70.\n2. Squares: 0.0225 + 0.0064 + 0.0025 + 0.0004 + 0.4900 = 0.5218.\n3. D = 1 − 0.5218 = **0.478**.\n4. The value 0.522 is the sum, before subtracting from 1." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, dp: 2,
    stem: "A woodland has four tree species with 25 individuals of each (N = 100). Calculate Simpson's diversity index, to 2 decimal places.",
    hints: ["Each proportion is 0.25.", "Four squares of 0.0625 add to 0.25."],
    value: dEq, wrong: [0.25, 1],
    explanation: "Each (n/N)² = 0.25² = 0.0625. Sum = 4 × 0.0625 = 0.25. D = 1 − 0.25 = **0.75**." });
  b.short({ d: 1, skill: "RECALL", stem: "Name the square frame used to mark out a sample area when counting plants.",
    accepted: ["quadrat", "a quadrat", "quadrats"], wrong: ["transect"],
    explanation: "A **quadrat** marks out a sample area." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the community-based wildlife programme begun in Zimbabwe in the late 1980s, known by an acronym of eight letters.",
    accepted: ["campfire", "CAMPFIRE", "the campfire programme"], wrong: ["greenpeace"],
    explanation: "**CAMPFIRE** is the Communal Areas Management Programme for Indigenous Resources." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how you would use quadrats to compare plant diversity in two areas of woodland.",
    hints: ["Cover where to place them, how many to use and what to record."],
    points: [
      "Choose the two areas and mark out the same size of quadrat in each.",
      "Place the quadrats at random (using random-number coordinates) to avoid bias.",
      "Use enough quadrats, such as 10 or more in each area, until new species stop appearing.",
      "In each quadrat identify and count every species, then calculate density, frequency and Simpson's index for each area and compare.",
    ],
    modelAnswer: "Use the same quadrat size in both areas and place them at random using random-number coordinates. Use enough quadrats (at least ten per area) until no new species appear. In each quadrat identify and count every species, then calculate density, frequency and Simpson's index and compare the two areas.",
    explanation: "Standard, randomised, repeated sampling and calculation." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why encroachment by settlement and farming reduces biodiversity.",
    hints: ["Think about habitat, fragmentation and disturbance."],
    points: [
      "Clearing natural vegetation for fields and homes destroys habitats and the species that live there.",
      "The remaining habitat is split into small, isolated patches, so animals cannot move and populations become small.",
      "People bring disturbance such as fire, grazing, hunting and woodcutting, which lowers species numbers further.",
    ],
    modelAnswer: "Clearing land for farming and homes destroys habitats. The remaining woodland is fragmented into small patches so animals cannot move between them, and people add disturbance through fire, grazing and woodcutting, which reduces species numbers.",
    explanation: "Habitat loss, fragmentation and disturbance." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4,
    stem: `Illustrative counts of woody plants (data invented for this exercise):\n\n${TABAB}\n\nSite A has D = 0.775 and Site B has D = 0.478. Interpret these results.`,
    hints: ["Say which site is more diverse, then use the counts to explain why."],
    points: [
      "Site A has the higher diversity (0.775 compared with 0.478).",
      "Both sites have the same richness (five species).",
      "Site B is dominated by sickle bush, which makes up 70% of the individuals, compared with 10% at site A, so evenness is low.",
      "Cutting and grazing at B may favour sickle bush, an invader, so protection at A keeps a more balanced woodland.",
    ],
    modelAnswer: "Site A is more diverse (0.775 compared with 0.478) even though both have five species. At Site B sickle bush makes up 70% of the individuals, compared with 10% at Site A, so Site B is uneven. Cutting and grazing at B probably favour sickle bush, while protection at A keeps a balanced woodland.",
    explanation: "Interpret the index using richness, evenness and a likely cause." });

  b.struct({ d: 4, skill: "ANALYSIS",
    stem: `A class compared two woodlands in a rural district: Site A, a protected woodlot, and Site B, a communal grazing area where trees are cut for fuel. They counted woody plants in randomly placed quadrats (illustrative data, invented for this exercise).\n\n${TABAB}`,
    hints: ["Use D = 1 − Σ(n/N)².", "Think about which species benefits from disturbance."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate Simpson's diversity index for Site A, to 3 decimal places.", value: dA, dp: 3, wrong: [0.225, 0.77],
        explanation: "Σ(n/N)² = 0.225, so D = 1 − 0.225 = 0.775." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate Simpson's diversity index for Site B, to 3 decimal places.", value: dB, dp: 3, wrong: [0.522, 0.7],
        explanation: "Σ(n/N)² = 0.5218, so D = 1 − 0.5218 = 0.478." }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which statement is supported by the results?", options: [
        ["Site A is more diverse than Site B", "Correct: 0.775 is higher than 0.478."],
        ["Site B is more diverse because sickle bush is common", "Dominance by one species lowers diversity."],
        ["Both sites have the same diversity as they have five species", "The index also depends on evenness."],
        ["Site A has fewer species than Site B", "Both have five species."],
      ], answer: "A", explanation: "A higher index means higher diversity." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why Site B has lower diversity than Site A.",
        points: [
          "Cutting for fuel removes the large trees such as msasa and mutondo and the shade they provide.",
          "Grazing and repeated burning kill the seedlings of many species.",
          "Sickle bush thrives in disturbed ground, so it spreads and dominates, which lowers evenness.",
        ],
        modelAnswer: "Cutting for fuel removes large trees, and grazing and burning kill the seedlings of many species. Sickle bush thrives on disturbed land, so it spreads and makes up most of the individuals, which lowers evenness and diversity.",
        explanation: "Disturbance removes many species and favours a few invaders." }),
    ], explanation: "Calculate the index for two sites, interpret it and explain the difference." });

  b.struct({ d: 3, skill: "ANALYSIS",
    stem: `A pupil placed ten 1 m × 1 m quadrats at random in a school grassland and counted the plants of one grass species in each (illustrative data, invented for this exercise).\n\n${QTAB}`,
    hints: ["Density = total plants ÷ total area.", "Frequency = quadrats where the species occurs ÷ total quadrats × 100."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the density of the grass, in plants per m².", value: density, dp: 1, wrong: [30, 0.3],
        explanation: "Total = 30 plants in 10 m², so density = 3.0 plants per m²." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the frequency of the grass, as a percentage of quadrats.", value: freq, unit: "%", dp: 0, wrong: [20, 30],
        explanation: "The grass occurs in 8 of the 10 quadrats (two quadrats have none), so frequency = 80%." }),
      P.manual({ label: "(c)", marks: 2, stem: "Suggest two ways the pupil could make the results more reliable.",
        points: [
          "Use more quadrats so that the sample represents the whole grassland.",
          "Repeat the survey in different seasons or on other days, and use random-number coordinates to place the quadrats.",
        ],
        modelAnswer: "Use more quadrats so the sample better represents the grassland, and repeat the survey in another season while choosing the positions with random-number coordinates.",
        explanation: "A larger, random, repeated sample is more reliable." }),
    ], explanation: "Calculate density and frequency and improve the method." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Evaluate the effectiveness of the measures used to conserve tropical ecosystems in Zimbabwe against veld fires, poaching and encroachment.",
    hints: ["Choose at least three measures and give a strength and a weakness for each.", "End with a judgement."],
    points: [
      "Fire committees and firebreaks reduce uncontrolled burning and are cheap, but need annual maintenance and enforcement.",
      "Protected areas run by ZimParks safeguard large habitats and species, but depend on funding and enough rangers.",
      "Anti-poaching patrols and penalties deter poachers, but are costly and cannot cover every area.",
      "Community schemes such as CAMPFIRE give local people income from wildlife and so encourage protection, but benefit sharing can be unfair and income varies.",
      "School and community woodlots restore indigenous trees and educate pupils, but trees need protection from livestock, fire and drought.",
      "Transfrontier parks allow animal movement across borders, but depend on cooperation between governments.",
      "Encroachment is hard to stop where there is land pressure and poverty, so measures need to provide alternatives such as fuel or farmland.",
      "Judgement: the measures work best in combination, led by community involvement and adequate funding; none works well alone.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Fire committees and firebreaks reduce uncontrolled burning cheaply, but need yearly maintenance and enforcement. Protected areas run by ZimParks safeguard large habitats, but need funds and enough rangers. Anti-poaching patrols deter poachers but are costly and cannot cover every area. Community schemes such as CAMPFIRE give local people income from wildlife, which encourages protection, although benefit sharing can be unfair. Encroachment is hard to stop while land and fuel are scarce, so alternatives are needed. I conclude that the measures work best in combination, led by community involvement and enough funding; none works well alone.",
    wordLimit: { max: 300 }, explanation: "Evaluate each measure by effect, cost and support, then judge." });

  b.card("DEFINITION", "Biodiversity", "The variety of life in an area: variety of species, of genes within species and of habitats.");
  b.card("DEFINITION", "Species richness and evenness", "Richness: the number of species. Evenness: how equally individuals are shared between species.");
  b.card("FORMULA", "Simpson's diversity index", "D = 1 − Σ(n/N)², where n is the number of one species and N is the total; 0 = no diversity, near 1 = very high.");
  b.card("FORMULA", "Density and frequency", "Density = individuals ÷ area sampled. Frequency = quadrats containing the species ÷ total quadrats × 100.");
  b.card("CONCEPT", "Quadrat sampling steps", "Choose sites, place quadrats at random, use enough quadrats, record species and counts, calculate density, frequency and Simpson's index.");
  b.card("FACT", "Threats to tropical ecosystems", "Commercial logging, veld fires, poaching and encroachment.");
  b.card("FACT", "CAMPFIRE", "A community-based programme (Communal Areas Management Programme for Indigenous Resources, from the late 1980s) giving rural people income from wildlife.");
  b.card("FACT", "Great Limpopo Transfrontier Park", "Created by a treaty signed in 2002 between Mozambique, South Africa and Zimbabwe; links protected areas so animals can move.");
  b.card("CONCEPT", "Evaluating a conservation measure", "Give the strengths and limits (cost, enforcement, community support) and reach a judgement.");
});
