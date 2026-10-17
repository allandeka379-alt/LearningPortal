// W4b: threats to biodiversity and conservation strategies (both boards; ZIMSEC Form 6, Cambridge A Level only).
import { concept, P, t, chk, table, pctChange, dpStr, CAM } from "../lib.mjs";

concept("abio.conservation.threats-strategies", { file: "conservation/threats-strategies", keyPrefix: "conservation.threats-strategies" }, (b) => {
  const calc = (o) => b.calc({ ...o, workedSolution: o.workedSolution ?? o.explanation });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is generally regarded as the greatest single cause of species extinction today?",
    options: [
      ["Habitat loss and degradation", "Correct."],
      ["Competition between native species", "Competition among natives is normal and rarely causes extinction."],
      ["Natural disasters such as volcanic eruptions", "These are rare and local."],
      ["Predation by native carnivores", "Native predators coexist with their prey."],
    ],
    answer: "A",
    explanation: "**Habitat loss** (clearing, fragmentation, degradation) is the leading cause.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why are seeds dried before they are stored at low temperature in a seed bank?",
    options: [
      ["Ice crystals would form in wet seeds and damage the cells", "Correct: drying also slows metabolism."],
      ["Drying kills the embryo so that it cannot germinate in storage", "The embryo must stay alive."],
      ["Water would let the seeds photosynthesise in the store", "Seeds do not photosynthesise."],
      ["Dry seeds are lighter, so more can be stored", "Mass is not the reason."],
    ],
    answer: "A",
    explanation: "Low water content prevents freezing damage and slows respiration and enzyme activity, so seeds stay viable for longer.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is an example of an ex situ conservation method?",
    options: [
      ["Storing seeds of rare plants in a seed bank", "Correct: outside the natural habitat."],
      ["Declaring a national park around a river valley", "This conserves in the natural habitat (in situ)."],
      ["Banning fishing within a marine park", "A marine park is in situ conservation."],
      ["Removing invasive plants from a wetland", "Habitat management is in situ."],
    ],
    answer: "A",
    explanation: "Ex situ = away from the natural habitat: zoos, botanic gardens, seed banks, frozen zoos.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A pharmaceutical company screens rainforest plants for anticancer compounds. Which reason for maintaining biodiversity does this illustrate?",
    options: [
      ["Medicinal", "Correct: a potential source of drugs."],
      ["Aesthetic", "Aesthetic reasons concern beauty and enjoyment."],
      ["Ethical", "Ethical reasons concern a right to exist or duty to protect."],
      ["Ecological", "Ecological reasons concern interactions and ecosystem services."],
    ],
    answer: "A",
    explanation: "Searching for drugs from natural compounds is a **medicinal** reason (also economic).",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why are large mammals that produce one young every few years especially vulnerable to hunting?",
    options: [
      ["Their populations replace lost individuals only slowly", "Correct: low reproductive rate."],
      ["They have more alleles, so they are more variable", "Genetic variation is not the reason."],
      ["They are always found at very high population densities", "Large mammals are usually at low density."],
      ["They cannot move between different habitats at all", "Many large mammals are very mobile."],
    ],
    answer: "A",
    explanation: "With a long gestation and few young, a population recovers slowly, so even moderate hunting can exceed the birth rate.",
    hints: ["Compare the birth rate with the death rate from hunting."],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A mountain frog lives only in cool streams near the summit of a mountain. Why is climate change a particular threat to it?",
    options: [
      ["As temperatures rise there is no higher, cooler ground to move to", "Correct: its suitable habitat shrinks and disappears."],
      ["Warmer water holds more oxygen, so the frog is poisoned", "Warmer water holds less oxygen, not more."],
      ["Rising temperature increases its genetic diversity too quickly", "Temperature does not increase genetic diversity."],
      ["Climate change makes predators from lowland areas go extinct first", "This is not a general expectation."],
    ],
    answer: "A",
    explanation: "Species near summits can move only upwards; when the coolest zone warms, their niche no longer exists.",
    hints: ["Where can it move as conditions warm?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Restoring an old gold mine dump near Kwekwe by covering it with topsoil and planting native grasses and trees is an example of which conservation approach?",
    options: [
      ["Reclamation", "Correct: restoring a damaged habitat."],
      ["Preservation", "Preservation protects an undamaged area as it is."],
      ["Captive breeding", "Captive breeding concerns animals in zoos."],
      ["Ex situ storage", "Storage is in seed banks or frozen zoos."],
    ],
    answer: "A",
    explanation: "**Reclamation** restores degraded land so that it supports a community again.",
    hints: ["Was the area damaged before the work?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A zoo holds 12 individuals of an endangered antelope, all descended from three founders. What would most increase the long-term success of a reintroduction?",
    options: [
      ["Adding unrelated animals or frozen sperm from other populations", "Correct: raises genetic diversity."],
      ["Breeding the healthiest pair repeatedly to produce many calves", "This increases inbreeding."],
      ["Releasing all 12 into a small fenced area together at once", "Too few animals with low diversity."],
      ["Selecting only animals that are tame and used to people", "Tameness reduces survival in the wild."],
    ],
    answer: "A",
    explanation: "With three founders, genetic diversity is low; bringing in new alleles from other populations (or a frozen zoo) reduces inbreeding depression and improves adaptability.",
    hints: ["What do three founders mean for the gene pool?"],
  });
  b.mcq({
    d: 4, skill: "UNDERSTANDING", applies: CAM,
    stem: "Embryos of an endangered wild cat are produced by IVF and placed into the uterus of a domestic cat. What is this final step called?",
    options: [
      ["Embryo transfer into a surrogate", "Correct: interspecific surrogacy."],
      ["Artificial insemination of a host", "Artificial insemination places sperm, not embryos."],
      ["Cloning by somatic cell transfer", "No nucleus has been transferred."],
      ["Storage of embryos in a frozen zoo", "The embryos are being implanted, not stored."],
    ],
    answer: "A",
    explanation: "Placing embryos in a female of a related common species is **embryo transfer** into a **surrogate** mother.",
    hints: ["Who carries the pregnancy?"],
  });

  b.tf({
    d: 1, skill: "RECALL", applies: CAM,
    stem: "Frozen zoos store sperm, eggs, embryos and tissue samples in liquid nitrogen.",
    answer: true,
    explanation: "True: at about −196 °C, preserving genetic material for future breeding.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In situ conservation keeps species in their natural habitats, where natural selection continues to act.",
    answer: true,
    explanation: "True. This is an important advantage over ex situ methods.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each conservation facility with its main role.",
    pairs: [
      ["Seed bank", "Stores dried seeds at low temperature"],
      ["Botanic garden", "Grows and propagates rare plants"],
      ["Zoo", "Runs captive breeding programmes for animals"],
      ["Marine park", "Restricts fishing to let fish stocks recover"],
      ["National park", "Protects large areas of land habitat"],
    ],
    explanation: "Each facility has a distinct role in conservation.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "A small, isolated population loses alleles by genetic {{blank:a}}, and mating between relatives, called {{blank:b}}, increases the proportion of {{blank:c}} individuals.",
    blanks: [
      { id: "a", accepted: ["drift"], choices: ["drift", "flow", "engineering"] },
      { id: "b", accepted: ["inbreeding"], choices: ["inbreeding", "outbreeding", "hybridisation"] },
      { id: "c", accepted: ["homozygous"], choices: ["homozygous", "heterozygous", "polyploid"] },
    ],
    explanation: "Drift and inbreeding both reduce genetic diversity and raise homozygosity.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the term for a strip of habitat that links two isolated patches, allowing animals to move between them.",
    accepted: ["wildlife corridor", "corridor", "habitat corridor", "green corridor", "ecological corridor"],
    wrong: ["buffer zone"],
    explanation: "A **wildlife corridor** allows movement and gene flow between fragments.",
  });

  // Numerical: seed viability (new data)
  const sown = 80, germ = 58;
  const pctG = (germ / sown) * 100;
  b.num({
    d: 2, skill: "APPLICATION",
    stem: `A seed bank sowed ${sown} stored seeds of a rare *Aloe* species and ${germ} germinated. Calculate the percentage germination. Give your answer to one decimal place.`,
    value: pctG, dp: 1, unit: "%", wrong: [Math.round(((sown - germ) / sown) * 1000) / 10],
    explanation: `${germ} ÷ ${sown} × 100 = ${dpStr(pctG, 1)}%. ${dpStr(((sown - germ) / sown) * 100, 1)}% is the percentage that failed.`,
  });
  // Calculation: population decline
  const n1 = 640, n2 = 229;
  const pc = pctChange(n1, n2);
  calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Illustrative survey counts of an endangered vulture species in a district fell from ${n1} birds to ${n2} birds over 15 years. Calculate the percentage decrease. Give your answer to one decimal place.`,
    value: -pc, dp: 1, unit: "%", wrong: [Math.round(((n1 - n2) / n2) * 1000) / 10],
    explanation: t`1. Decrease $= ${n1} - ${n2} = ${n1 - n2}$ birds.
2. Percentage decrease $= \dfrac{${n1 - n2}}{${n1}} \times 100 = ${dpStr(-pc, 1)}\%$.
3. Dividing by the final count (${n2}) gives ${dpStr(((n1 - n2) / n2) * 100, 1)}%, which is wrong.`,
    hints: ["Use the starting count as the base."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how the introduction of a non-native predator can cause the extinction of a native species.",
    points: [
      "Native prey has not evolved defences / behaviour against the new predator",
      "Predator may have no natural enemies or competitors, so its numbers rise quickly",
      "Death rate of the prey exceeds its birth rate, so the prey population falls",
      "Small populations then lose genetic diversity / suffer chance events, leading to extinction",
    ],
    modelAnswer: "The native prey has evolved without this predator, so it lacks escape behaviour or other defences. In its new range the predator may have no natural enemies, so its population grows rapidly. The prey's death rate exceeds its birth rate and its population falls. Once small, it loses genetic diversity and is vulnerable to chance events, so it may become extinct.",
    explanation: "Link to defences, predator numbers, birth and death rates and small-population risks.",
    hints: ["Why are native species not adapted?"],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Outline four reasons for maintaining biodiversity, naming the type of reason in each case.",
    points: [
      "Ecological: species interact in food webs / provide services such as pollination, nutrient cycling, water purification",
      "Economic: food, timber, tourism, wild crop relatives with useful alleles",
      "Medicinal: source of drugs, many species untested",
      "Aesthetic or ethical: enjoyment of nature / species have a right to exist, duty to future generations",
    ],
    modelAnswer: "Ecologically, species are linked in food webs and provide services such as pollination and nutrient cycling. Economically, biodiversity supplies food, timber and tourism income, and wild relatives of crops carry alleles for breeding. Medicinally, many drugs come from natural compounds and most species are untested. Ethically, many people believe all species have a right to exist and that we should pass them on to future generations.",
    explanation: "Name the type and give a specific example.",
    hints: ["Ecological, economic, medicinal, aesthetic, ethical."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Evaluate the role of zoos in conserving endangered animal species.",
    points: [
      "Captive breeding increases numbers and studbooks maintain genetic diversity",
      "Provide animals for reintroduction / research / education and fundraising",
      "But captive populations are small, may lose genetic diversity and wild behaviour (hunting, avoiding predators)",
      "Reintroduction fails unless habitat is protected and threats such as poaching are removed; zoos complement in situ conservation",
    ],
    modelAnswer: "Zoos breed endangered species in captivity, using studbooks to pair unrelated animals and keep genetic diversity, and can supply animals for reintroduction. They fund research and educate the public. However, captive populations are small, and animals may lose behaviours needed in the wild, such as finding food or avoiding predators. Reintroduction succeeds only if suitable protected habitat exists and the original threats are removed, so zoos support, but cannot replace, in situ conservation.",
    explanation: "Give strengths and limitations, then conclude.",
    hints: ["Consider genetics, behaviour and habitat."],
  });

  // Practice structured: assisted reproduction (Cambridge detail)
  b.struct({
    d: 4, skill: "APPLICATION", applies: CAM,
    stem: "Only four females of a rare species of antelope remain in a reserve, and the single adult male is closely related to all of them. A frozen zoo holds sperm collected from wild males of the species decades ago. A common, related antelope species lives nearby.",
    parts: [
      P.manual({
        label: "(a)", marks: 3, stem: "Outline how IVF and embryo transfer could be used to produce more calves of the rare species.",
        points: ["Give a rare female hormones to stimulate release of several eggs, and collect the eggs", "Fertilise the eggs in the laboratory with thawed frozen sperm (IVF) and culture the embryos", "Transfer the embryos into the uteri of rare or surrogate females (or freeze some for later)"],
        modelAnswer: "A rare female is given hormones so that several eggs mature; these are collected. The eggs are fertilised in the laboratory with thawed sperm from the frozen zoo, and the embryos are grown for a few days. The embryos are then transferred into the uteri of females, either of the rare species or of a surrogate species, or frozen for later.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Explain why using surrogate females of the common species could increase the number of calves born.",
        points: ["Each rare female can provide many eggs/embryos but can carry only one pregnancy at a time", "Surrogates carry the extra embryos, so more calves are born per year from the few rare females"],
        modelAnswer: "Each of the four rare females can supply many eggs, but can carry only one calf at a time and has a long gestation. Surrogate females of the common species carry the extra embryos, so many more rare calves can be born each year.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain the advantage of using the frozen sperm rather than the male in the reserve.",
        points: ["The reserve male is related to the females, so offspring would be inbred / more homozygous for harmful recessive alleles", "Frozen sperm from unrelated wild males adds new alleles, increasing genetic diversity"],
        modelAnswer: "Mating with the related male would cause inbreeding, increasing homozygosity for harmful recessive alleles. Sperm from unrelated wild males adds new alleles to the population, increasing genetic diversity.",
      }),
      P.mcq({
        label: "(d)", stem: "Which is a limitation of these methods for conserving the species?",
        options: [
          ["They do not address the loss of habitat that endangered it", "Correct: threats must be removed too."],
          ["They always produce clones identical to their mothers", "IVF produces genetically varied offspring."],
          ["They reduce genetic diversity in every case", "Using unrelated sperm increases diversity."],
          ["They can only be used on plant species", "They are used on mammals."],
        ],
        answer: "A",
        explanation: "Assisted reproduction increases numbers but does not remove the causes of decline.",
      }),
    ],
    explanation: "Assisted reproduction increases offspring and genetic diversity, but habitat protection is still needed.",
    hints: ["Think about how many pregnancies one female can carry."],
  });
  const yrs = [0, 5, 10, 15, 20];
  const inside = [210, 236, 268, 295, 330];
  const outside = [190, 152, 118, 86, 61];
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `Illustrative counts of a ground-nesting bird were made inside a fenced reserve, where predators introduced by people are removed, and in similar habitat outside the reserve.\n\n${table(["Year", ...yrs.map(String)], [["Inside reserve", ...inside.map(String)], ["Outside reserve", ...outside.map(String)]])}`,
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the percentage change in the population outside the reserve between year 0 and year 20. Give your answer to one decimal place, with a negative sign for a decrease.",
        value: pctChange(outside[0], outside[4]), dp: 1, unit: "%", wrong: [Math.round(pctChange(outside[4], outside[0]) * 10) / 10],
        explanation: `(${outside[4]} − ${outside[0]}) ÷ ${outside[0]} × 100 = ${dpStr(pctChange(outside[0], outside[4]), 1)}%.`,
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Compare the trends inside and outside the reserve.",
        points: ["Inside, the population increases steadily from 210 to 330", "Outside, it decreases steadily from 190 to 61 (to about a third of its starting size)"],
        modelAnswer: "Inside the reserve the population rose steadily from 210 to 330 over 20 years, while outside it fell steadily from 190 to 61.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Suggest an explanation for the difference.",
        points: ["Introduced predators eat eggs/chicks of ground-nesting birds, which have no defences against them", "Removing predators inside the reserve raises breeding success so births exceed deaths"],
        modelAnswer: "Introduced predators take eggs and chicks from ground nests, and the birds have not evolved defences against them. Inside the reserve the predators are removed, so more chicks survive and births exceed deaths.",
      }),
    ],
    explanation: "Management (predator removal) inside the reserve reverses the decline.",
    hints: ["What is different inside the fence?"],
    calculator: true,
  });

  b.card("FACT", "Four causes of extinction", "Climate change; competition (often from introduced species); hunting by humans; degradation and loss of habitats.");
  b.card("CONCEPT", "Five reasons for maintaining biodiversity", "Ecological, economic, medicinal, aesthetic and ethical.");
  b.card("DEFINITION", "In situ versus ex situ conservation", "In situ: in the natural habitat (parks, reserves). Ex situ: outside it (zoos, botanic gardens, seed banks, frozen zoos).");
  b.card("FACT", "How are seeds stored in a seed bank?", "Dried to low water content and kept cold (about −20 °C); tested regularly for germination.");
  b.card("FACT", "What is a frozen zoo?", "A store of sperm, eggs, embryos and tissue in liquid nitrogen (about −196 °C).", undefined, { applies: CAM });
  b.card("CONCEPT", "Assisted reproduction in endangered mammals", "IVF, embryo transfer and surrogacy (often a related common species) produce more offspring from few females.", undefined, { applies: CAM });
  b.card("DEFINITION", "Preservation, management and reclamation", "Keeping areas untouched; actively managing habitats and populations; restoring damaged habitats.");
  b.card("CONCEPT", "Extinction vortex", "Small population → inbreeding and drift → lower fitness → even smaller population.");
  b.card("CONCEPT", "Limitations of zoos", "Small populations, loss of genetic diversity and wild behaviour; need protected habitat for reintroduction.");
});
