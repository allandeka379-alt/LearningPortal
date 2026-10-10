// W4b: IUCN, CITES and invasive alien species (Cambridge only, A Level).
import { concept, P, t, chk, table, pctChange, dpStr } from "../lib.mjs";

concept("abio.conservation.organisations-invasives", { file: "conservation/organisations-invasives", keyPrefix: "conservation.organisations-invasives" }, (b) => {
  const calc = (o) => b.calc({ ...o, workedSolution: o.workedSolution ?? o.explanation });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which organisation publishes the Red List of Threatened Species?",
    options: [
      ["The IUCN", "Correct: the International Union for Conservation of Nature."],
      ["CITES", "CITES regulates international trade."],
      ["The World Health Organization", "The WHO deals with human health."],
      ["The Food and Agriculture Organization", "The FAO deals with food and farming."],
    ],
    answer: "A",
    explanation: "The **IUCN** assesses species and publishes the Red List.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which three Red List categories are together described as \"threatened\"?",
    options: [
      ["Critically Endangered, Endangered and Vulnerable", "Correct."],
      ["Extinct, Extinct in the Wild and Critically Endangered", "Extinct species are no longer at risk; they are lost."],
      ["Endangered, Vulnerable and Near Threatened", "Near Threatened does not yet qualify as threatened."],
      ["Vulnerable, Near Threatened and Least Concern", "Least Concern species are not threatened."],
    ],
    answer: "A",
    explanation: "CR, EN and VU are the threatened categories.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What does CITES regulate?",
    options: [
      ["International trade in wild animals, plants and their products", "Correct."],
      ["Hunting of wild animals within each member country", "Domestic hunting is controlled by national law."],
      ["The size and location of national parks in each country", "CITES does not designate protected areas."],
      ["The release of genetically modified crops into the wild", "GMO release is covered by other agreements."],
    ],
    answer: "A",
    explanation: "CITES controls trade **between** countries so that it does not threaten species' survival.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A species is listed on CITES Appendix II. Which statement is correct?",
    options: [
      ["It may be traded internationally with an export permit", "Correct: permit shows trade is legal and sustainable."],
      ["No international trade of any kind is allowed", "That is closer to Appendix I, which still allows some non-commercial trade."],
      ["It is extinct in the wild and survives only in zoos", "That is an IUCN category, not a CITES appendix."],
      ["Only the country that listed it controls its trade", "That describes Appendix III."],
    ],
    answer: "A",
    explanation: "Appendix II: trade allowed under permit when it is legal and not detrimental to survival.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Grey squirrels introduced into Britain carry a virus that kills native red squirrels but rarely harms greys. Which reason for controlling invasive species does this illustrate?",
    options: [
      ["Spread of disease to native species", "Correct."],
      ["Hybridisation with a native relative", "Grey and red squirrels do not hybridise."],
      ["Predation on native species", "The squirrels are not preying on each other."],
      ["Economic damage to farm crops", "The example describes disease, not crop damage."],
    ],
    explanation: "Introduced species can carry pathogens to which natives have no resistance.",
    answer: "A",
    hints: ["What is the virus doing?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why do many introduced species spread rapidly in their new range?",
    options: [
      ["They have left behind their natural predators and parasites", "Correct."],
      ["They have lower rates of reproduction than native species", "Invasives usually reproduce rapidly."],
      ["They need very specialised conditions that are rare", "Narrow tolerance would limit spread."],
      ["They cannot compete with native species for food", "Invasives are often strong competitors."],
    ],
    answer: "A",
    explanation: "Free from enemies that controlled them at home, and often fast-breeding and tolerant, they increase quickly.",
    hints: ["What controls their numbers at home?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "An introduced duck interbreeds with a rare native duck, producing fertile hybrids. Why is this a threat to the native species?",
    options: [
      ["Its distinct gene pool is diluted until pure natives are lost", "Correct: genetic swamping by hybridisation."],
      ["The hybrids will always be sterile, so numbers fall", "The stem says the hybrids are fertile."],
      ["The native ducks will be eaten by the introduced ducks", "Ducks do not prey on one another."],
      ["The introduced duck transmits a fatal virus to them", "No disease is described."],
    ],
    answer: "A",
    explanation: "Repeated hybridisation replaces the native gene pool with a mixed one, so the native species may disappear as a distinct species.",
    hints: ["The hybrids are fertile."],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Before a beetle is released to control an invasive weed, scientists test whether it feeds on many native plant species. Why is this essential?",
    options: [
      ["The agent could itself become a pest of native plants", "Correct: host specificity must be shown."],
      ["The beetle might be killed by herbicides used on the weed", "This concerns integration, not the reason for host testing."],
      ["The weed might evolve to feed on the beetle instead", "Plants do not feed on beetles."],
      ["Native plants might become resistant to all beetles", "This is not the purpose of the tests."],
    ],
    answer: "A",
    explanation: "A biological control agent that is not host-specific could become invasive itself, attacking native or crop plants.",
    hints: ["What could go wrong after release?"],
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "The IUCN Red List category \"Least Concern\" means a species is not currently threatened.",
    answer: true,
    explanation: "True. Least Concern species are widespread and abundant.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "CITES makes it illegal to hunt an Appendix I species within the country where it lives.",
    answer: false,
    explanation: "False. CITES controls international trade; hunting within a country is controlled by that country's own laws.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each reason for controlling invasive species with an example.",
    pairs: [
      ["Competition", "A floating plant shading out native water plants"],
      ["Predation", "An introduced fish eating native fish species"],
      ["Disease", "An introduced squirrel carrying a fatal virus"],
      ["Hybridisation", "An introduced duck interbreeding with a native duck"],
      ["Economic cost", "A weed blocking irrigation canals and intakes"],
    ],
    explanation: "Each reason with a typical example.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "The IUCN places species in categories of extinction risk. A species surviving only in captivity is classed as Extinct in the {{blank:a}}. Where there is not enough information to assess risk, the species is classed as Data {{blank:b}}. CITES Appendix {{blank:c}} bans commercial international trade.",
    blanks: [
      { id: "a", accepted: ["Wild"], choices: ["Wild", "Zoo", "Range"] },
      { id: "b", accepted: ["Deficient"], choices: ["Deficient", "Missing", "Unknown"] },
      { id: "c", accepted: ["I"], choices: ["I", "II", "III"] },
    ],
    explanation: "Extinct in the Wild; Data Deficient; Appendix I.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the term for releasing a natural enemy, such as an insect, to reduce the population of an invasive plant.",
    accepted: ["biological control", "biocontrol", "biological pest control"],
    wrong: ["chemical control"],
    explanation: "**Biological control**.",
  });

  // Numerical: decline and category (new data)
  const a = 860, z = 129;
  const pc = pctChange(a, z);
  b.num({
    d: 3, skill: "APPLICATION",
    stem: `An illustrative survey of a frog species found ${a} mature adults; ten years later there were ${z}. Calculate the percentage decline. Give your answer to the nearest whole number.`,
    value: -pc, dp: 0, unit: "%", wrong: [Math.round((z / a) * 100)],
    explanation: `(${a} − ${z}) ÷ ${a} × 100 = ${dpStr(-pc, 0)}%. ${dpStr((z / a) * 100, 0)}% is the percentage remaining, not the decline. A decline of this size (at least about 80%) meets one criterion for Critically Endangered.`,
    hints: ["Divide the decrease by the starting number."],
  });
  const n1 = 25, n2 = 94;
  const pcInc = pctChange(n1, n2);
  calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `The area of a lake covered by an invasive floating plant was ${n1} hectares in March and ${n2} hectares in June. Calculate the percentage increase, to the nearest whole number.`,
    value: pcInc, dp: 0, unit: "%", wrong: [Math.round((n2 / n1) * 100)],
    explanation: t`1. Increase $= ${n2} - ${n1} = ${n2 - n1}$ hectares.
2. Percentage increase $= \dfrac{${n2 - n1}}{${n1}} \times 100 = ${dpStr(pcInc, 0)}\%$.
3. ${dpStr((n2 / n1) * 100, 0)}% is the June cover as a percentage of the March cover, not the increase.`,
    hints: ["Subtract first, then divide by the March value."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Outline the role of the IUCN in conservation.",
    points: [
      "Assesses the conservation status / extinction risk of species using standard criteria",
      "Publishes the Red List with categories such as CR, EN, VU",
      "Repeated assessments monitor trends / show whether conservation works",
      "Provides scientific advice to governments and CITES to set priorities, laws and protected areas",
    ],
    modelAnswer: "The IUCN gathers data from scientists and assesses each species' extinction risk against standard criteria such as rate of decline, range size and numbers of mature individuals. It publishes the Red List, placing species in categories such as Critically Endangered, Endangered and Vulnerable. Reassessments show trends and whether conservation is succeeding, and the IUCN advises governments and CITES so that resources and legal protection go to the most threatened species.",
    explanation: "Assess, publish, monitor, advise.",
    hints: ["What does the Red List do, and who uses it?"],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how CITES helps to protect endangered species, and give one limitation.",
    points: [
      "Lists species in appendices according to the threat from trade",
      "Appendix I: commercial international trade banned, reducing demand-driven killing",
      "Appendix II: trade only with permits showing it is legal and sustainable; customs check permits and seize illegal shipments",
      "Limitation: depends on national enforcement / illegal trade continues where profits are high / does not protect habitat",
    ],
    modelAnswer: "CITES places species in appendices according to how far trade threatens them. For Appendix I species commercial international trade is banned, removing legal markets; Appendix II species may be traded only with export permits showing the trade is legal and does not harm survival, and customs officers seize shipments without permits. However, CITES relies on each country to enforce it, illegal trade continues where profits are high, and it does nothing to protect habitat.",
    explanation: "How it works plus one limitation.",
    hints: ["Think about the appendices and enforcement."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Compare mechanical, chemical and biological methods of controlling an invasive water plant.",
    points: [
      "Mechanical (harvesting by hand or machine): no chemicals, but labour-intensive / costly and must be repeated; fragments may regrow",
      "Chemical (herbicide): fast over large areas, but may harm non-target organisms / contaminate water; dead plants decompose using oxygen",
      "Biological (host-specific insects): cheap and self-sustaining once established, but slow and rarely eradicates the plant",
      "Biological control needs thorough host-specificity testing; an integrated combination is often best",
    ],
    modelAnswer: "Mechanical removal uses no chemicals but is expensive and labour-intensive, must be repeated, and fragments left behind may regrow. Herbicides act quickly over large areas but can harm other organisms and drinking water, and the dead plants decompose, lowering oxygen. Biological control with host-specific insects is cheap and self-sustaining once established, but it is slow, rarely eliminates the weed, and the agent must be thoroughly tested first. Combining methods often works best.",
    explanation: "Advantages and disadvantages of each.",
    hints: ["Cost, speed, side effects."],
  });

  // Practice structured
  const yrs = [0, 2, 4, 6, 8];
  const cover = [3, 9, 27, 55, 70];
  const natives = [11, 10, 7, 4, 3];
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `After an ornamental shrub escaped into a nature reserve, ecologists recorded its percentage cover and the number of native plant species in a set of permanent quadrats.\n\n${table(["Years after first record", ...yrs.map(String)], [["Cover of shrub / %", ...cover.map(String)], ["Native plant species per quadrat (mean)", ...natives.map(String)]])}`,
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "Describe the change in shrub cover.",
        points: ["Cover increases from 3% to 70% over 8 years", "Rapid (roughly tripling every two years) at first, then slowing / levelling off after year 6"],
        modelAnswer: "Shrub cover rose from 3% to 70% over eight years. It roughly tripled every two years at first, then increased more slowly after year 6, from 55% to 70%.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Suggest an explanation for the change in the number of native species.",
        points: ["Natives fall from 11 to 3 as shrub cover rises", "Shrub outcompetes natives for light (shading), space, water or nutrients"],
        modelAnswer: "As the shrub spread, the number of native species fell from 11 to 3 per quadrat. The dense shrub probably shades out smaller native plants and competes for water, nutrients and space.",
      }),
      P.mcq({
        label: "(c)", stem: "When would control have been most likely to eradicate the shrub completely?",
        options: [
          ["Soon after it was first recorded", "Correct: small populations are easiest to eradicate."],
          ["When it reached its highest cover", "Eradication is hardest when the invader is widespread."],
          ["Once native species had disappeared", "By then much damage has been done."],
          ["Only after biological control was tested", "Waiting allows spread; early removal is better."],
        ],
        answer: "A",
        explanation: "Early detection and eradication while numbers are low is the most effective strategy.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Suggest two features of the shrub that may have made it a successful invader.",
        points: ["Rapid growth and reproduction / many seeds spread by birds", "No natural herbivores or diseases in the new range / tolerant of many conditions / toxic to grazers"],
        modelAnswer: "It may grow and reproduce rapidly, producing many seeds spread by birds, and in its new range it has no natural herbivores or diseases to hold it back.",
      }),
    ],
    explanation: "Invasives spread rapidly and outcompete natives; act early.",
    hints: ["How did cover change between each pair of surveys?"],
  });
  b.struct({
    d: 4, skill: "APPLICATION",
    stem: "A cycad species is known from three small populations in one mountain range. Plants are dug up and exported illegally to collectors overseas. Surveys show the number of mature plants fell by 60% in ten years.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Using the criterion that a decline of at least 50% (but under about 80%) over ten years meets Endangered, which category does the decline alone suggest?",
        options: [
          ["Endangered", "Correct: 60% lies between 50% and 80%."],
          ["Critically Endangered", "This needs a decline of about 80% or more."],
          ["Vulnerable", "60% exceeds the 50% threshold for Endangered."],
          ["Near Threatened", "The decline qualifies for a threatened category."],
        ],
        answer: "A",
        explanation: "60% ≥ 50% and < 80%: Endangered on this criterion.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Explain how listing the cycad on CITES Appendix I could help it.",
        points: ["Commercial international trade becomes illegal in all member countries", "Customs can seize plants without permits, reducing the market and the incentive to dig up wild plants"],
        modelAnswer: "On Appendix I, commercial international trade in the cycad is banned in all member countries. Customs officers can seize plants that lack permits, shrinking the overseas market and so the incentive to dig up wild plants.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Suggest two other measures that could help conserve the cycad.",
        points: ["Protect the sites (guards, legal protection, a reserve) / microchip or mark plants", "Propagate plants in botanic gardens and seed banks for reintroduction / supply legally propagated plants to reduce demand for wild ones"],
        modelAnswer: "The sites could be legally protected and guarded, with plants marked so stolen ones can be identified. Botanic gardens could propagate the cycad and store seed, supplying legally grown plants to collectors and providing stock for reintroduction.",
      }),
    ],
    explanation: "Red List category from decline; CITES and in situ/ex situ measures.",
    hints: ["Compare 60% with the thresholds given."],
  });

  b.card("DEFINITION", "What is the IUCN?", "International Union for Conservation of Nature: assesses extinction risk of species and publishes the Red List.");
  b.card("FACT", "IUCN Red List categories (most to least threatened)", "EX, EW, CR, EN, VU, NT, LC (plus DD, data deficient). CR, EN and VU are 'threatened'.");
  b.card("DEFINITION", "What is CITES?", "Convention on International Trade in Endangered Species of Wild Fauna and Flora: regulates international wildlife trade.");
  b.card("CONCEPT", "CITES appendices I, II and III", "I: commercial trade banned. II: trade with export permit if sustainable. III: protected in one country that asks for help.");
  b.card("DEFINITION", "Define **invasive alien species**.", "A species introduced by humans outside its natural range that spreads and harms native biodiversity or the economy.");
  b.card("CONCEPT", "Five reasons to control invasive species", "Competition, predation, disease, hybridisation and economic cost.");
  b.card("FACT", "Methods of controlling invasive species", "Prevention (biosecurity), early eradication, mechanical, chemical and biological control.");
  b.card("CONCEPT", "Why must biological control agents be tested?", "To show they are host-specific, so they will not attack native or crop species and become pests themselves.");
  b.card("CONCEPT", "IUCN versus CITES", "IUCN assesses and advises; CITES is a binding agreement controlling international trade.");
});
