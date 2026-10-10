// W4a: socio-economic importance of the five kingdoms (ZIMSEC only, Form 6).
import { concept, P, table } from "../lib.mjs";

concept("abio.biodiversity.economic-importance", { file: "biodiversity/economic-importance", keyPrefix: "biodiversity.economic-importance" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which organism is used to make bread rise?",
    options: [["Yeast", "Correct: CO₂ from fermentation raises the dough."], ["*Rhizobium*", "*Rhizobium* fixes nitrogen in legume nodules."], ["*Penicillium*", "*Penicillium* produces penicillin."], ["*Lactobacillus*", "Lactic acid bacteria sour milk; they do not raise bread."]],
    answer: "A",
    explanation: "Yeast (a fungus) ferments sugars, producing carbon dioxide that makes dough rise.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why do farmers who grow groundnuts often need less nitrogen fertiliser for the next crop?",
    options: [
      ["Bacteria in the root nodules fix nitrogen into ammonium compounds", "Correct: *Rhizobium*."],
      ["Groundnut leaves absorb nitrogen gas directly from the air through their stomata", "Plants cannot use N₂ directly."],
      ["Fungi on the roots convert nitrates into nitrogen gas", "Converting nitrate to N₂ (denitrification) would remove nitrogen."],
      ["Groundnuts release nitrogen when they photosynthesise", "Photosynthesis releases oxygen, not nitrogen."],
    ],
    answer: "A",
    explanation: "*Rhizobium* in legume nodules converts N₂ to ammonium, enriching the soil when roots and residues decay.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which disease of cattle is caused by a protoctist carried by tsetse flies?",
    options: [["Nagana (trypanosomiasis)", "Correct: caused by *Trypanosoma*."], ["Anthrax", "Anthrax is caused by a bacterium."], ["Foot-and-mouth disease (FMD)", "This is caused by a virus."], ["Tuberculosis", "TB is caused by a bacterium."]],
    answer: "A",
    explanation: "*Trypanosoma*, carried by tsetse flies, causes nagana in cattle and sleeping sickness in people.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "In which kingdom does *Schistosoma*, the cause of bilharzia, actually belong?",
    options: [["Animalia", "Correct: it is a parasitic flatworm."], ["Protoctista", "It is multicellular, so it is not a protoctist, although the syllabus lists it there."], ["Fungi", "It has no hyphae or chitin walls."], ["Prokaryotae", "It is eukaryotic."]],
    answer: "A",
    explanation: "*Schistosoma* is a blood fluke, a flatworm in the kingdom Animalia.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Mouldy groundnuts from a damp store are dangerous to eat even after cooking. What is the reason?",
    options: [
      ["The mould *Aspergillus* may have produced aflatoxins, which survive cooking", "Correct."],
      ["Cooking releases antibiotics made by the mould, which poison the people who eat them", "Antibiotics are not the hazard here."],
      ["The groundnuts have been infected by *Rhizobium*", "*Rhizobium* lives in root nodules and is harmless."],
      ["The fungus turns the oil in the nuts into ethanol", "Fungal spoilage does not work this way."],
    ],
    answer: "A",
    explanation: "*Aspergillus flavus* can produce heat-stable aflatoxins that damage the liver.",
    hints: ["Which fungus grows on damp stored grain and nuts?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Sewage and fertiliser run into a lake, causing an algal bloom. Why do many fish then die?",
    options: [
      ["Decomposing dead algae use up the dissolved oxygen", "Correct: bacteria respiring on dead algae deplete oxygen."],
      ["The algae eat the fish eggs", "Algae are producers, not predators."],
      ["The algae produce so much oxygen that the fish are poisoned by it", "Excess oxygen is not the cause of death."],
      ["The algae make the water too cold", "Algae do not lower the temperature."],
    ],
    answer: "A",
    explanation: "When the bloom dies, aerobic bacteria decompose it and use up oxygen, so fish suffocate.",
    hints: ["What happens when the algae die?"],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement best explains why the kapenta fishery on Lake Kariba depends on protoctists?",
    options: [
      ["Kapenta eat zooplankton, which feed on algae that are the producers of the lake", "Correct: the food chain begins with photosynthetic protoctists."],
      ["Kapenta are protoctists that photosynthesise near the surface", "Kapenta are fish (animals)."],
      ["Protoctists fix nitrogen in the water for the kapenta to absorb through their gills", "Fish do not absorb nitrogen this way."],
      ["Protoctists cause diseases that keep kapenta numbers low", "This would harm, not support, the fishery."],
    ],
    answer: "A",
    explanation: "Algae → zooplankton → kapenta: the fishery rests on the photosynthesis of algae.",
    hints: ["Trace the food chain back to the producer."],
  });

  b.num({
    d: 2, skill: "RECALL",
    stem: "In alcoholic fermentation by yeast, one molecule of glucose is converted to ethanol and carbon dioxide. How many molecules of carbon dioxide are produced from one molecule of glucose?",
    value: 2, wrong: [6, 1],
    explanation: "C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂: two molecules of CO₂. (Six would be produced by aerobic respiration.)",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Penicillin, the first widely used antibiotic, is produced by a fungus.",
    answer: true,
    explanation: "True. Penicillin comes from the mould *Penicillium*.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "All organisms in the kingdom Prokaryotae are harmful to people.",
    answer: false,
    explanation: "False. Many bacteria are useful, for example in nitrogen fixation, decomposition, sour milk and insulin production.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each organism with its importance to people.",
    pairs: [
      ["*Vibrio cholerae*", "Causes cholera, spread in contaminated water"],
      ["*Plasmodium*", "Causes malaria, carried by *Anopheles* mosquitoes"],
      ["*Saccharomyces* (yeast)", "Ferments sugar in baking and brewing"],
      ["Lactic acid bacteria", "Ferment milk to sour milk (*amasi*) and yoghurt"],
      ["*Penicillium*", "Source of the antibiotic penicillin"],
    ],
    explanation: "Each organism's role follows from its biology.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    stem: "Match each economic activity in Zimbabwe with the kingdom of the organism that it mainly depends on.",
    pairs: [
      ["Kapenta fishing on Lake Kariba", "Animalia"],
      ["Timber from pine plantations in the Eastern Highlands", "Plantae"],
      ["Brewing traditional sorghum beer", "Fungi"],
      ["Making sour milk (*amasi*)", "Prokaryotae"],
    ],
    explanation: "Kapenta: animals; pine: plants; brewing: yeast (fungi); sour milk: lactic acid bacteria (prokaryotes).",
    hints: ["Which organism does the work in each case?"],
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Bacteria and fungi that break down dead organic matter are called {{blank:a}}. Mosquitoes that carry *Plasmodium* between people are called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["decomposers"], choices: ["decomposers", "producers", "vectors"] },
      { id: "b", accepted: ["vectors"], choices: ["vectors", "decomposers", "producers"] },
    ],
    explanation: "Decomposers recycle nutrients; vectors carry pathogens.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the genus of bacterium that lives in the root nodules of legumes and fixes nitrogen.",
    accepted: ["Rhizobium"],
    wrong: ["Nitrosomonas"],
    explanation: "*Rhizobium*.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe two beneficial and two harmful effects of fungi on people in Zimbabwe.",
    points: [
      "Benefit: yeast ferments sugars in baking (CO₂ raises bread) and brewing (ethanol), e.g. sorghum beer",
      "Benefit: decomposition recycles nutrients / penicillin from *Penicillium* / edible mushrooms for food and income",
      "Harm: moulds spoil food such as bread and stored grain; *Aspergillus* produces aflatoxins in groundnuts and maize",
      "Harm: fungal diseases of crops (e.g. rusts) reduce yields / fungal infections of people",
    ],
    modelAnswer: "Yeast ferments sugar, producing carbon dioxide that raises bread and ethanol in brewing, such as sorghum beer. Fungi also decompose dead plant matter, recycling nutrients, and edible mushrooms provide food and income. On the harmful side, moulds spoil bread and stored grain, and *Aspergillus* on damp groundnuts and maize can produce aflatoxins that damage the liver. Rusts and other fungal diseases reduce crop yields.",
    explanation: "Two benefits, two harms, each with an example.",
    hints: ["Think of the kitchen, the field and the store."],
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Explain how malaria affects the economy of communities in the lowveld.",
    points: [
      "Illness causes people to miss work, reducing farm output and income",
      "Children miss school, affecting education",
      "Families and the health system spend money on treatment, prevention (nets, spraying) and care",
    ],
    modelAnswer: "Adults with malaria miss days of work, so farm output and income fall. Children miss school. Families spend money on treatment, and the health system spends on drugs, bed nets and spraying, money that could be used elsewhere.",
    explanation: "Health effects become economic effects.",
    hints: ["Think about work, school and costs."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Discuss the benefits and drawbacks to Zimbabwe of large populations of wild animals in national parks.",
    points: [
      "Benefit: tourism brings foreign currency and jobs (guides, lodges)",
      "Benefit: regulated hunting and community programmes bring income to rural areas / conserve biodiversity and ecosystems",
      "Drawback: human-wildlife conflict: elephants raid crops, predators kill livestock, people may be injured",
      "Drawback: large elephant populations can damage woodland; wildlife can carry diseases to livestock (e.g. buffalo and foot-and-mouth) / costs of protection against poaching",
    ],
    modelAnswer: "Wildlife attracts tourists, bringing foreign currency and jobs in lodges and guiding, and regulated hunting and community programmes bring income to rural areas while conserving ecosystems. On the other hand, elephants raid crops and predators kill livestock near park boundaries, high elephant densities can damage woodland, buffalo can carry foot-and-mouth disease to cattle, and protecting animals from poaching is costly.",
    explanation: "Balance benefits with costs.",
    hints: ["Consider tourism, communities, conflict and costs."],
  });

  // Practice structured 1: bacteria and fermentation
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "A small dairy near Gweru makes sour milk (*amasi*) by adding a starter culture of lactic acid bacteria to pasteurised milk and keeping it warm for about a day.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Explain how the bacteria sour and thicken the milk.", points: ["Bacteria ferment lactose to lactic acid", "Lower pH causes milk proteins (casein) to coagulate, thickening the milk"], modelAnswer: "The bacteria ferment lactose, the sugar in milk, to lactic acid. The fall in pH makes the milk protein casein coagulate, so the milk sours and thickens." }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain why the milk is pasteurised first and then kept warm.", points: ["Pasteurising kills most bacteria already present, including pathogens and spoilage organisms, so only the starter culture grows", "Warmth gives the optimum temperature for the bacteria's enzymes, so fermentation is faster"], modelAnswer: "Pasteurisation kills most bacteria already in the milk, including pathogens and spoilage organisms, so only the starter culture grows. Keeping it warm gives a temperature near the optimum for the bacteria's enzymes, speeding fermentation." }),
      P.manual({ label: "(c)", marks: 2, stem: "Suggest why sour milk keeps longer than fresh milk.", points: ["Low pH / acid inhibits the growth of most spoilage bacteria and pathogens", "The lactic acid bacteria have used much of the sugar / outcompete other microorganisms"], modelAnswer: "The acidity inhibits most spoilage bacteria and pathogens, and the lactic acid bacteria have used much of the sugar and outcompete other microorganisms." }),
      P.manual({ label: "(d)", marks: 2, stem: "Give two other ways in which bacteria are economically important, one beneficial and one harmful.", points: ["Beneficial: nitrogen fixation by *Rhizobium* / decomposition / sewage treatment / insulin from GM bacteria", "Harmful: diseases such as cholera, TB or anthrax / food spoilage"], modelAnswer: "Beneficial: *Rhizobium* in legume nodules fixes nitrogen, reducing fertiliser costs. Harmful: *Vibrio cholerae* causes cholera in contaminated water supplies." }),
    ],
    explanation: "Fermentation, conditions and wider importance of bacteria.",
    hints: ["What does lactic acid do to proteins?"],
  });

  // Practice structured 2: importance of plants and animals in an area
  b.struct({
    d: 4, skill: "EVALUATION",
    stem: "A rural district on the edge of the Zambezi valley has miombo woodland, a river with tilapia, tsetse flies in some areas, and fields of maize, cotton and groundnuts. Mosquitoes breed in pools after the rains.\n\n" + table(["Organism", "Kingdom"], [["Miombo trees", "Plantae"], ["Tilapia", "Animalia"], ["Tsetse fly", "Animalia"], ["*Trypanosoma*", "Protoctista"], ["*Rhizobium* in groundnut nodules", "Prokaryotae"]]),
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Describe three ways in which the miombo woodland is important to the people of the district.", points: ["Firewood and building poles / timber", "Food and income: fruits, honey, edible caterpillars (mopane worms where mopane grows), mushrooms / grazing for livestock", "Carbon sink and soil protection: absorbs CO₂, roots and litter reduce soil erosion, protect water supply"], modelAnswer: "The woodland provides firewood and poles for building, food and income such as honey, wild fruits and mushrooms, and grazing for livestock. It also stores carbon, and its roots and leaf litter protect the soil from erosion." }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain why tsetse flies limit cattle farming in parts of the district.", points: ["Tsetse flies are vectors of *Trypanosoma*", "Which causes nagana in cattle, leading to illness, poor growth and death"], modelAnswer: "Tsetse flies carry *Trypanosoma*, which causes nagana in cattle, leading to weight loss, illness and death, so cattle cannot be kept profitably where tsetse are common." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain how *Rhizobium* benefits farmers who rotate groundnuts with maize.", points: ["*Rhizobium* fixes N₂ into ammonium in groundnut nodules", "Residues release nitrogen to the soil, so the following maize crop needs less fertiliser (saving money)"], modelAnswer: "*Rhizobium* in groundnut nodules fixes nitrogen gas into ammonium compounds. When the roots and residues decompose, the nitrogen enriches the soil, so the following maize crop needs less bought fertiliser." }),
      P.manual({ label: "(d)", marks: 1, stem: "Name the organism, not in the table, that causes malaria in the district.", points: ["*Plasmodium* (carried by *Anopheles* mosquitoes)"], modelAnswer: "*Plasmodium*, carried by female *Anopheles* mosquitoes." }),
    ],
    explanation: "Link each organism to benefits and harms for people.",
    hints: ["Think about fuel, food, income and health."],
  });

  b.card("FACT", "Yeast in baking and brewing", "Ferments sugar to ethanol and CO₂: CO₂ raises bread; ethanol in beer.");
  b.card("FACT", "Lactic acid bacteria", "Ferment milk sugar to lactic acid, making sour milk (amasi) and yoghurt.");
  b.card("FACT", "Rhizobium", "Fixes nitrogen in legume root nodules (groundnuts, soya beans), reducing fertiliser needs.");
  b.card("FACT", "Plasmodium", "Protoctist that causes malaria; vector: female Anopheles mosquito.");
  b.card("FACT", "Trypanosoma", "Protoctist that causes sleeping sickness in people and nagana in cattle; vector: tsetse fly.");
  b.card("FACT", "Schistosoma", "Parasitic flatworm (Animalia) causing bilharzia; larvae develop in freshwater snails.");
  b.card("FACT", "Aspergillus flavus", "Mould on damp stored groundnuts and maize that can produce liver-damaging aflatoxins.");
  b.card("CONCEPT", "Importance of animals to Zimbabwe's economy", "Tourism, food (cattle, kapenta, mopane worms), leather, regulated hunting, pollination; also pests and vectors.");
});
