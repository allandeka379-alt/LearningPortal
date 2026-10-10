// W4b: ecosystems, niches and the levels of biodiversity (both boards; ZIMSEC Form 6, Cambridge A Level only).
import { concept, P, t, chk, table, sum, simpson, sfStr, CAM } from "../lib.mjs";

concept("abio.ecology.levels-organisation", { file: "ecology/levels-organisation", keyPrefix: "ecology.levels-organisation" }, (b) => {
  const calc = (o) => b.calc({ ...o, workedSolution: o.workedSolution ?? o.explanation });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which term describes all the organisms of one species living in the same area at the same time?",
    options: [
      ["A population", "Correct: one species, one area, one time."],
      ["A community", "A community contains all the species in the area."],
      ["An ecosystem", "An ecosystem also includes the abiotic environment."],
      ["A habitat", "A habitat is the place where an organism lives."],
    ],
    answer: "A",
    explanation: "A **population** is all the individuals of one species in an area at one time, able to interbreed.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which statement best describes the niche of the African fish eagle at Lake Kariba?",
    options: [
      ["It catches live fish near the surface and nests in tall trees", "Correct: this describes its role, food and position."],
      ["It lives in the lake shore woodland and open water of the lake", "This is its habitat, the place where it lives."],
      ["It belongs to the community of all living things in the lake", "This states membership of a community, not a role."],
      ["It forms one interbreeding group with the other eagles there", "This describes a population."],
    ],
    answer: "A",
    explanation: "A niche is the **role** of a species: what it feeds on, where it feeds and nests, and how it interacts with other species.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which list includes only the components of an ecosystem?",
    options: [
      ["The community together with soil, water, light and temperature", "Correct: biotic and abiotic components."],
      ["All the populations of plants and animals living in the area", "This is a community: the abiotic part is missing."],
      ["All the individuals of one species and the place where they live", "This is a population and its habitat."],
      ["The soil, water, light and temperature of an area of land", "These are abiotic factors only."],
    ],
    answer: "A",
    explanation: "An ecosystem = community (all living organisms) + abiotic environment, interacting.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Two sites each contain eight species of grass. Which feature would give one site a higher species diversity than the other?",
    options: [
      ["Its individuals are spread more evenly among the eight species", "Correct: higher evenness with equal richness."],
      ["One of its eight species makes up most of the plants present", "Dominance by one species lowers evenness and diversity."],
      ["Its plants are taller and have a greater total biomass", "Biomass is not a measure of diversity."],
      ["It has the same eight species as the other site", "Identical species lists do not raise diversity."],
    ],
    answer: "A",
    explanation: "With equal **richness**, the site with greater **evenness** (relative abundance spread more equally) has the higher species diversity.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Zebra graze on short grasses and giraffe browse leaves high in acacia trees in the same savanna. Which conclusion is correct?",
    options: [
      ["They share a habitat but occupy different niches", "Correct: same place, different roles."],
      ["They share a niche but occupy different habitats", "They live in the same place and feed differently."],
      ["They form a single population because they live together", "A population contains one species only."],
      ["They must compete strongly, so one will be excluded", "Their niches differ, so competition for food is slight."],
    ],
    answer: "A",
    explanation: "Same savanna = same habitat; different foods and feeding heights = different niches, so both can coexist.",
    hints: ["Is a niche a place or a role?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which of the following is a measure of genetic diversity within a species?",
    options: [
      ["The number of different alleles at a locus in a population", "Correct: variety of alleles."],
      ["The number of different species found in a quadrat", "That is species richness."],
      ["The number of habitats used by the species in a country", "That relates to habitat diversity."],
      ["The number of individuals of the species in each square metre", "That is population density."],
    ],
    answer: "A",
    explanation: "Genetic diversity is the variety of alleles within a species, measured as the number of alleles or the proportion of heterozygous loci.",
    hints: ["Genetic diversity is about genes and alleles, not species."],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A population of a rare frog in the Eastern Highlands has very low genetic diversity. Why is it at greater risk of extinction than a population with high genetic diversity?",
    options: [
      ["It is less likely to contain individuals able to survive a new disease", "Correct: little variation for selection to act on."],
      ["It has a lower mutation rate, so it cannot produce any new alleles", "Mutation rate does not depend on diversity."],
      ["It will have more heterozygous individuals that carry harmful alleles", "Low diversity means more homozygotes, not more heterozygotes."],
      ["Its niche will be wider, so it will meet more competition from others", "Genetic diversity does not set niche width in this way."],
    ],
    answer: "A",
    explanation: "With few alleles there may be no resistant or tolerant individuals when conditions change; inbreeding also raises homozygosity for harmful recessive alleles.",
    hints: ["Natural selection needs variation."],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Two species of insect-eating bird live in the same forest. Over many generations the bill length of one species becomes shorter and that of the other longer where they live together, but not where each lives alone. What is the best explanation?",
    options: [
      ["Selection reduced overlap in their niches by favouring different prey sizes", "Correct: competition favours divergence in niche."],
      ["Each bird changed its bill length during its life by using it more", "Acquired changes are not inherited."],
      ["The two species interbred, producing hybrids with intermediate bills", "Hybrids would make bills more similar, not more different."],
      ["The forest habitat changed, so both species left their niches", "This would not produce the divergence only where they coexist."],
    ],
    answer: "A",
    explanation: "Where niches overlap, competition means individuals that use different prey sizes survive and reproduce better; the niches diverge (character displacement). This follows from the competitive exclusion principle.",
    hints: ["The change happens only where the two species meet."],
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "A community includes the abiotic factors of an area as well as the organisms.",
    answer: false,
    explanation: "False. A community is all the living populations; adding the abiotic environment makes an ecosystem.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Two sites can have the same species richness but different species diversity.",
    answer: true,
    explanation: "True. Diversity also depends on evenness: a site dominated by one species has lower diversity.",
  });

  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term with its description.",
    pairs: [
      ["Habitat", "The place where an organism lives"],
      ["Niche", "The role of a species in its ecosystem"],
      ["Community", "All the populations of different species in an area"],
      ["Ecosystem", "A community interacting with its abiotic environment"],
      ["Population", "All the individuals of one species in an area"],
    ],
    explanation: "Habitat is a place; niche is a role; population is one species; community is all species; ecosystem adds the abiotic environment.",
  });

  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "Biodiversity is assessed at three levels. Species diversity combines species {{blank:a}}, the number of species present, with species {{blank:b}}, how equally individuals are spread among them. The variety of {{blank:c}} within a species is its genetic diversity.",
    blanks: [
      { id: "a", accepted: ["richness"], choices: ["richness", "evenness", "density"] },
      { id: "b", accepted: ["evenness"], choices: ["richness", "evenness", "density"] },
      { id: "c", accepted: ["alleles"], choices: ["alleles", "habitats", "species"] },
    ],
    explanation: "Richness (number of species), evenness (relative abundance) and alleles (genetic diversity).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the term for the number of different species present in a community.",
    accepted: ["species richness", "richness"],
    wrong: ["species evenness"],
    explanation: "**Species richness** is the count of species; evenness describes their relative abundance.",
  });

  // Numerical: percentage of a dominant species (different data from the lesson)
  const grass = [138, 12, 9, 15, 26];
  const tot = sum(grass);
  chk(tot, 200);
  const pctDom = (grass[0] / tot) * 100;
  b.num({
    d: 2, skill: "APPLICATION",
    stem: `Farai counted grass plants of five species in quadrats on a heavily grazed area near Gweru.\n\n${table(["Species", "A", "B", "C", "D", "E"], [["Number of plants", ...grass.map(String)]])}\n\nCalculate the percentage of all the plants that belong to species A. Give your answer to the nearest whole number.`,
    value: pctDom, dp: 0, unit: "%", wrong: [rndPct(grass[0] / 5)],
    explanation: `Total = ${tot}; ${grass[0]} ÷ ${tot} × 100 = ${pctDom}%. Dividing by the number of species instead of the number of plants is a common slip.`,
  });
  function rndPct(x) { return Math.round(x); }

  // Simpson's index (Cambridge only) on new data
  const site = [12, 10, 9, 11, 8];
  const sx = simpson(site);
  calc({
    d: 4, skill: "APPLICATION", applies: CAM, calculator: true,
    stem: t`A student counted beetles of five species in pitfall traps in the Matobo hills: 12, 10, 9, 11 and 8. Simpson's index of diversity is $D = 1 - \sum \left(\dfrac{n}{N}\right)^2$. Calculate $D$ to three significant figures.`,
    value: sx.D, sf: 3, wrong: [Number(sfStr(sx.sumFrac2, 3))],
    explanation: t`1. $N = ${sx.N}$.
2. $\sum (n/N)^2 = ${sx.rows.map((r) => t`(${r.n}/${sx.N})^2`).join(" + ")} = ${sfStr(sx.sumFrac2, 3)}$.
3. $D = 1 - ${sfStr(sx.sumFrac2, 3)} = ${sfStr(sx.D, 3)}$: close to 1, so diversity is high because the species are evenly represented. Forgetting to subtract from 1 gives ${sfStr(sx.sumFrac2, 3)}.`,
    hints: ["Find N first.", "Square each proportion, add, then subtract from 1."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain the difference between the habitat and the niche of the hippopotamus in the Zambezi river.",
    points: [
      "Habitat: the place it lives, the river (pools) and its banks",
      "Niche: its role, including grazing on grass at night on the river banks",
      "Niche also includes its interactions / effect on the ecosystem, e.g. dung adding nutrients to the water, or tolerance (needs water to keep its skin moist during the day)",
    ],
    modelAnswer: "The habitat of the hippopotamus is where it lives: the deep pools of the river and the grassy banks nearby. Its niche is its role: it rests in water by day and grazes grass on the banks at night, and its dung adds nutrients to the river, supporting fish and invertebrates.",
    explanation: "Habitat = address; niche = job, including food, position, timing and interactions.",
    hints: ["Habitat is a place; niche includes food, behaviour and interactions."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why genetic diversity within a crop species such as sorghum is valuable.",
    points: [
      "Different alleles give variation in characteristics such as drought tolerance, disease resistance or yield",
      "If conditions change (a new disease or drier climate), some plants are likely to survive",
      "Plant breeders can use these alleles to produce new varieties by selective breeding",
      "A genetically uniform crop could be wiped out by a single pest or pathogen",
    ],
    modelAnswer: "Genetic diversity means many different alleles, giving variation in features such as drought tolerance, resistance to disease and grain quality. When the climate becomes drier or a new pathogen arrives, some varieties are likely to survive. Breeders can transfer these useful alleles into new varieties by selective breeding. A genetically uniform crop could be destroyed by a single disease.",
    explanation: "Link the variety of alleles to survival and to breeding.",
    hints: ["Think about a new disease arriving."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "A student states: \"Site X has 12 species of bird and Site Y has 9, so Site X has greater biodiversity.\" Evaluate this statement.",
    points: [
      "Site X has higher species richness",
      "But species diversity also depends on evenness / relative abundance, which is not given",
      "Biodiversity also includes ecosystem / habitat diversity and genetic diversity, not given",
      "Only one group (birds) was counted / sampling effort may differ, so the conclusion is not valid on these data",
    ],
    modelAnswer: "Site X does have the greater species richness of birds. However, species diversity also depends on evenness, and if one species dominates Site X its diversity could be lower than that of Y. Biodiversity also includes habitat and genetic diversity, which were not measured, and only birds were counted, possibly with different sampling effort. The statement is not supported by these data alone.",
    explanation: "Richness alone is not diversity.",
    hints: ["What else, besides the number of species, determines diversity?"],
  });

  // Practice structured: two vleis
  const v1 = [40, 35, 38, 42, 45];
  const v2 = [160, 10, 12, 8, 10];
  chk(sum(v1), 200); chk(sum(v2), 200);
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: `Tatenda counted the plants of five sedge and grass species in quadrats in two wetlands (vleis) near Masvingo. Vlei 1 is fenced; Vlei 2 is grazed by cattle and partly drained.\n\n${table(["Species", "P", "Q", "R", "S", "T"], [["Vlei 1 (number)", ...v1.map(String)], ["Vlei 2 (number)", ...v2.map(String)]])}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "State the species richness of Vlei 2.", value: 5, wrong: [200], explanation: "Five species are present." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the percentage of plants in Vlei 2 that are species P.", value: (v2[0] / 200) * 100, unit: "%", wrong: [32], explanation: "160 ÷ 200 × 100 = 80%." }),
      P.manual({
        label: "(c)", marks: 2, stem: "Compare the species diversity of the two vleis, using the data.",
        points: ["Both have the same richness (5 species, 200 plants)", "Vlei 1 more even (35-45 of each) while P dominates Vlei 2 (160 of 200), so Vlei 1 has higher diversity"],
        modelAnswer: "Both vleis have five species and 200 plants, so richness is equal. In Vlei 1 each species has 35 to 45 plants, so evenness is high; in Vlei 2 species P has 160 of the 200 plants, so evenness and diversity are much lower. Vlei 1 has the higher species diversity.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Suggest two reasons for the difference, using the information given.",
        points: ["Grazing: cattle eat palatable species, leaving an unpalatable or grazing-tolerant species (P) to dominate", "Drainage: drier soil favours species tolerant of drier conditions / removes niches for wetland species"],
        modelAnswer: "Cattle may graze the more palatable species, so a tolerant or unpalatable species such as P takes over. Partial drainage makes the soil drier, removing the niches of species that need waterlogged soil.",
      }),
    ],
    explanation: "Equal richness, different evenness: grazing and drainage change the community.",
    hints: ["Look at how evenly the 200 plants are spread in each vlei."],
  });
  b.struct({
    d: 4, skill: "APPLICATION",
    stem: "A conservation scientist describes the area around Lake Kariba: \"The lake, the shoreline grassland and the mopane woodland each support different organisms. The kapenta in the lake were introduced from Lake Tanganyika. The elephants of the nearby woodland move between Zimbabwe and Zambia.\"",
    parts: [
      P.short({
        label: "(a)", marks: 1, stem: "Name the ecological level that is described by \"all the kapenta fish in Lake Kariba\".",
        accepted: ["population", "a population"], wrong: ["community"],
        explanation: "One species, one area, one time: a population.",
      }),
      P.mcq({
        label: "(b)", stem: "Which level of biodiversity is shown by the lake, shoreline grassland and mopane woodland?",
        options: [
          ["Ecosystem and habitat diversity", "Correct: different ecosystems in one area."],
          ["Species evenness within one community", "Evenness compares abundances of species."],
          ["Genetic diversity of the organisms present", "Genetic diversity is within a species."],
          ["Species richness of the area as a whole", "Richness counts species, not ecosystems."],
        ],
        answer: "A",
        explanation: "Several distinct ecosystems in one region show ecosystem (habitat) diversity.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why movement of elephants between Zimbabwe and Zambia helps to maintain genetic diversity.",
        points: ["Animals from different populations interbreed, bringing in new alleles (gene flow)", "Reduces inbreeding / loss of alleles by genetic drift in each smaller population"],
        modelAnswer: "Elephants moving between the countries breed with animals of other populations, adding new alleles (gene flow). This reduces inbreeding and the loss of alleles by chance that happens in small, isolated populations.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "The introduced kapenta now support a large fishery. Suggest how the introduction of a new species might affect the niches of fish already in the lake.",
        points: ["Kapenta feed on zooplankton, so they may compete with native fish that eat plankton", "Native species may be forced into narrower niches / reduced numbers, or the kapenta may become food for predators such as tigerfish, changing their niches"],
        modelAnswer: "Kapenta feed on zooplankton, so native plankton-feeding fish may face competition and be restricted to a narrower niche or decline. At the same time kapenta provide a new food source for predators such as tigerfish.",
      }),
    ],
    explanation: "Apply the terms to a real ecosystem.",
    hints: ["A population is one species; ecosystem diversity is about different ecosystems."],
  });

  b.card("DEFINITION", "Define **population**.", "All the organisms of one species living in the same area at the same time, able to interbreed.");
  b.card("DEFINITION", "Define **community**.", "All the populations of different species living and interacting in the same area at the same time.");
  b.card("DEFINITION", "Define **ecosystem**.", "A relatively self-contained, interacting community of organisms together with its abiotic environment.");
  b.card("DEFINITION", "Define **niche**.", "The role of a species in its ecosystem: its food, position, tolerances and interactions with other species.");
  b.card("CONCEPT", "Habitat versus niche", "Habitat is the place (address); niche is the role (job). Two species can share a habitat but not a niche.");
  b.card("CONCEPT", "Three levels of biodiversity", "Ecosystem and habitat diversity; species diversity (richness and evenness); genetic diversity within species.");
  b.card("DEFINITION", "Species richness and species evenness", "Richness: number of species. Evenness: how equally individuals are spread among the species.");
  b.card("CONCEPT", "Why does genetic diversity matter?", "Allows adaptation to new diseases or climate; reduces inbreeding depression; supplies alleles for breeding crops and livestock.");
  b.card("FACT", "Competitive exclusion principle", "Two species cannot occupy exactly the same niche in the same habitat for long: one outcompetes the other.");
});
