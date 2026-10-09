// W3a: expropriation of land and resources in colonial Zimbabwe (her.colonisation.expropriation).
import { concept, P, source, table, levels } from "../lib.mjs";

concept("her.colonisation.expropriation", { file: "colonisation/expropriation", keyPrefix: "colonisation.expropriation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which year was the **Land Apportionment Act** passed?",
    options: [
      ["1930", "Correct."],
      ["1951", "This is the year of the Native Land Husbandry Act."],
      ["1969", "This is the year of the Land Tenure Act."],
      ["1894", "This is when the first reserves (Gwaai and Shangani) were set up."],
    ],
    answer: "A",
    explanation: "Land Apportionment Act 1930; Native Land Husbandry Act 1951; Land Tenure Act 1969.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does **expropriation** mean?",
    options: [
      ["Taking property from its owners without consent or fair payment", "Correct."],
      ["Buying land from a willing seller at the market price agreed", "That is a voluntary sale, not expropriation."],
      ["Sharing out a dead person's property among the family heirs", "That is inheritance."],
      ["Moving cattle to better grazing land during the dry season", "That is a herding practice."],
    ],
    answer: "A",
    explanation: "Expropriation is taking property, usually by a state or company, without the owners' consent or fair compensation.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which law introduced **destocking** and individual plots in the African reserves?",
    options: [
      ["The Native Land Husbandry Act (1951)", "Correct: it limited cattle numbers and gave individual plots."],
      ["The Land Apportionment Act (1930)", "This Act divided the land by race; it did not set cattle limits."],
      ["The Land Tenure Act (1969)", "This Act replaced the 1930 Act and split land into roughly equal halves."],
      ["The Legal Age of Majority Act (1982)", "This post-independence Act concerned the age of majority."],
    ],
    answer: "A",
    explanation: "The Native Land Husbandry Act of 1951 imposed destocking, individual plots and conservation works in the reserves.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why did the colonial government require Africans to pay taxes **in cash**?",
    options: [
      ["To force men to work for wages on settler farms and mines", "Correct: cash could only be earned through wage labour or sales."],
      ["Because Africans had asked to be paid for their grain in money", "Africans did not request this; the aim was labour."],
      ["To fund schools in the reserves for all African children", "Very little was spent on African education."],
      ["Because cattle were too valuable to accept as payment", "The aim was to create a need for cash, and so for labour."],
    ],
    answer: "A",
    explanation: "Cash taxes (hut tax, later poll tax) pushed men into wage labour, supplying cheap workers.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What were the **Native Purchase Areas** created under the 1930 Act?",
    options: [
      ["Areas where a small number of Africans could buy farms", "Correct."],
      ["Areas reserved for European settlers to purchase farms", "Those were European areas."],
      ["Markets where Africans sold grain to the government", "Purchase Areas were land, not markets."],
      ["Mining areas bought by companies from the BSAC", "These were not mining areas."],
    ],
    answer: "A",
    explanation: "Native Purchase Areas allowed a few Africans to buy farms, but they were a small share of the land.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did many Africans see the **conservation rules** of the Native Land Husbandry Act as unfair?",
    options: [
      ["The overcrowding they targeted had been caused by land alienation", "Correct: the real cause was too little land."],
      ["The rules were applied only to European commercial farmers", "The rules were applied in the African reserves."],
      ["Contour ridges were unknown and could not be built by hand", "Ridges were built by hand; the issue was the cause of erosion."],
      ["The Act gave every young man more land than he could farm", "Many young men received no land at all."],
    ],
    hints: ["Why were the reserves overcrowded in the first place?"],
    answer: "A",
    explanation: "Erosion in the reserves came from crowding people onto too little land; the Act punished the victims rather than the cause.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A man in a 1920s reserve has grain but no cash. A new tax must be paid in money. What is he **most likely** to do?",
    options: [
      ["Leave home to work for wages on a mine or farm", "Correct: this was the intended effect of the tax."],
      ["Pay the tax in grain at the district office", "Only cash was accepted."],
      ["Buy a farm in a European area with his grain", "Africans could not own land in European areas."],
      ["Ask the chief to pay the tax for the whole village", "Each man was liable for his own tax."],
    ],
    hints: ["What could he do to earn cash?"],
    answer: "A",
    explanation: "Cash taxes created migrant labour: men left home to earn wages.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement **best** explains why land became a central grievance in the liberation struggle?",
    options: [
      ["Laws kept the best land for a minority and crowded Africans onto poor land", "Correct: this links the laws to their effect."],
      ["Settlers paid fair prices for land and Africans later regretted selling it", "Land was alienated, not bought at fair prices."],
      ["The reserves had the best rainfall but too few roads to reach markets", "Reserves were mostly on drier, poorer land."],
      ["Africans were not interested in farming until after independence came", "Africans had farmed for centuries."],
    ],
    hints: ["Think of both the laws and their effects."],
    answer: "A",
    explanation: "Racial land laws gave a small minority the best land and left the majority overcrowded, poor and angry.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Land Tenure Act replaced the Land Apportionment Act.",
    answer: true,
    explanation: "True. The Land Tenure Act (1969) replaced the Land Apportionment Act (1930) and divided land into roughly equal European and African areas.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Under colonial game laws, Africans were free to hunt wild animals anywhere without a licence.",
    answer: false,
    explanation: "False. Game laws made hunting by Africans illegal without a licence, turning a traditional source of food into \"poaching\".",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each law or event with its date.",
    pairs: [
      ["Gwaai and Shangani reserves set up", "1894"],
      ["Land Apportionment Act", "1930"],
      ["Native Land Husbandry Act", "1951"],
      ["Land Tenure Act", "1969"],
    ],
    explanation: "1894 reserves; 1930 LAA; 1951 NLHA; 1969 LTA.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each resource with the way it was taken or controlled under colonial rule.",
    pairs: [
      ["Land", "Divided by race; best areas given to settlers"],
      ["Cattle", "Seized after 1893-94; later reduced by destocking"],
      ["Minerals", "Rights held by the Company, then claims issued to settlers and companies"],
      ["Wildlife", "Hunting by Africans banned without a licence"],
    ],
    explanation: "Expropriation covered every major resource, not only land.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "Forced labour was often called {{blank:a}} in Shona. In the late 1960s Chief Rekayi {{blank:b}} resisted removal from his people's land in the Nyanga area.",
    blanks: [
      { id: "a", accepted: ["chibharo"], choices: ["chibharo", "nhimbe", "zunde", "roora"] },
      { id: "b", accepted: ["Tangwena"], choices: ["Tangwena", "Makoni", "Mapondera", "Chingaira"] },
    ],
    explanation: "Chibharo means forced labour. Chief Rekayi Tangwena resisted eviction in the Nyanga area.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What were the reserves for Africans renamed in the 1960s? (three words)",
    accepted: ["Tribal Trust Lands", "Tribal Trust Land", "TTLs", "TTL"],
    wrong: ["Native Purchase Areas"],
    explanation: "Reserves became **Tribal Trust Lands**; today they are communal lands.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State **three** resources, other than land, that were taken or controlled by the colonial state, settlers or companies.",
    points: ["Cattle", "Minerals / mines", "Forests / timber, or wildlife, or labour"],
    modelAnswer: "Cattle, minerals and wildlife.",
    explanation: "One mark each: cattle, minerals, forests, wildlife or labour.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** effects of land alienation on indigenous communities.",
    points: [
      "Overcrowding in the reserves",
      "Developed: too many people and cattle on poor land led to soil erosion, poverty and hunger",
      "Migrant labour",
      "Developed: men left to work on mines and farms, so women carried more farm work and family life was disrupted",
    ],
    modelAnswer: "Moving people onto small, dry reserves caused overcrowding, so the soil was overgrazed and eroded, and families became poorer and sometimes went hungry. Because families could no longer live from the land, many men left to work on mines and farms, so women had to do more of the farm work and family life was disrupted.",
    hints: ["Give the effect, then say what followed from it."],
    explanation: "Two marks per developed effect.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain how the Native Land Husbandry Act (1951) contributed to the growth of African nationalism.",
    points: [
      "Destocking took cattle, a family's wealth and draught power",
      "Developed: rural people, who had little political voice, turned to nationalist leaders",
      "Many young men were left without land",
      "Developed: landless youth moved to towns and joined nationalist movements",
    ],
    modelAnswer: "The Act forced families to sell cattle, which were their wealth and draught power, so rural people became angry and supported nationalist leaders who opposed the Act. It also left many young men without land, and they moved to towns where they joined nationalist movements. Resistance was so strong that the Act was abandoned in the early 1960s.",
    hints: ["Who lost out under the Act, and what did they do?"],
    explanation: "Two marks per developed point.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: source("Source A", "an account by a fictional elderly woman from a communal area near Lupane, recorded in 2026", `When I was a girl we lived near a river where the soil was dark and the cattle were fat. Then men came with papers and said the land now belonged to a farmer. We were taken in lorries to a place where the soil was sand and the water was far. My father went to work on a mine and came home once a year. We were many families on little land, and soon the grass was finished.`),
    parts: [
      P.mcq({
        label: "(a)", stem: "Which colonial process does Source A **mainly** describe?",
        options: [
          ["Land alienation and removal to a reserve", "Correct: the family was moved from fertile land to a reserve."],
          ["The Pioneer Column's march to Fort Salisbury", "The source describes a forced move, not the column."],
          ["The fast-track land reform programme", "That happened after 2000 and redistributed land to Africans."],
          ["A drought caused by low rainfall over many years", "The move was caused by people, not by drought."],
        ],
        answer: "A",
        explanation: "The family lost fertile land to a settler farmer and was moved to a sandy, dry area.",
      }),
      P.fib({
        label: "(b)",
        stem: "Complete the sentence using the source.",
        template: "The father's work on a mine is an example of {{blank:a}} labour.",
        blanks: [{ id: "a", accepted: ["migrant"], choices: ["migrant", "voluntary", "communal", "child"] }],
        explanation: "He worked far from home and returned once a year: migrant labour.",
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Using the source and your own knowledge, explain **two** effects of the move on the family.",
        points: [
          "Poorer land and far-off water",
          "Developed: harder to grow food, so the family became poorer",
          "Overcrowding (\"many families on little land\")",
          "Developed: overgrazing — \"the grass was finished\" — so cattle and soil suffered",
        ],
        modelAnswer: "The family moved to sandy soil with water far away, so it was harder to grow enough food and they became poorer. The area was overcrowded, with many families on little land, so the grass was overgrazed and their cattle and soil suffered.",
      }),
    ],
    hints: ["Quote the source, then explain."],
    explanation: "Reading a source on land alienation.",
  });
  b.struct({
    d: 4, skill: "EVALUATION",
    stem: "Study the table of colonial land laws.\n\n" + table(["Law", "Main provision"], [
      ["Land Apportionment Act", "Land divided into European areas, reserves, purchase areas and unassigned land"],
      ["Native Land Husbandry Act", "Destocking, individual plots and conservation works in the reserves"],
      ["Land Tenure Act", "Land split into roughly equal European and African areas"],
    ]),
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe how the Land Apportionment Act affected African families.",
        points: [
          "Africans could not own land in European areas",
          "Many families were moved to reserves",
          "Reserves were on poorer, drier land",
          "Reserves became overcrowded",
        ],
        modelAnswer: "Africans were no longer allowed to own land in European areas, so many families were moved to the reserves. The reserves were on poorer, drier land and soon became overcrowded.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"The Land Tenure Act was fairer than the Land Apportionment Act.\" How far do you agree?",
        points: [
          ["For: on paper it divided land into roughly equal halves", 2],
          ["Against: Africans were the great majority, so equal halves were not equal shares per person", 2],
          ["Against: Europeans kept most of the fertile, high-rainfall land; evictions continued (e.g. the Tangwena people)", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "On paper the Land Tenure Act looked fairer, because it divided the land into roughly equal European and African areas.\n\nHowever, Africans were the great majority of the population, so an equal split gave each settler far more land than each African. Europeans also kept most of the fertile, high-rainfall land, while African areas were mainly dry and overcrowded. Evictions continued, as the Tangwena people's struggle in the Nyanga area showed.\n\nI therefore largely disagree: the 1969 Act changed the proportions on paper but kept the same inequality, and it became a major grievance in the liberation struggle.",
      }),
    ],
    hints: ["Compare land per person, not just total area."],
    explanation: "Comparing two land laws.",
  });

  b.card("DEFINITION", "Expropriation", "Taking property from its owners, usually by the state or a company, without consent or fair compensation.");
  b.card("DEFINITION", "Land alienation", "The taking of land from indigenous communities and giving it to settlers, companies or the state.");
  b.card("FACT", "Year of the Land Apportionment Act?", "1930.");
  b.card("FACT", "Year of the Native Land Husbandry Act?", "1951 (destocking, individual plots, conservation works).");
  b.card("FACT", "Year of the Land Tenure Act?", "1969 (roughly equal European and African areas; replaced the 1930 Act).");
  b.card("FACT", "First reserves set up after the 1893-94 war?", "The Gwaai and Shangani reserves (1894).");
  b.card("DEFINITION", "Chibharo", "Forced labour under colonial rule.");
  b.card("CONCEPT", "Why were taxes demanded in cash?", "To force African men to work for wages on settler farms and mines.");
  b.card("CONCEPT", "Why were the reserves eroded?", "Too many people and cattle were crowded onto too little, poor land.");
});
