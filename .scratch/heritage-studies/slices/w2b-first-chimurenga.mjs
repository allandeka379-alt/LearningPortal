// W2b: the First Chimurenga/Umvukela, 1896-97 (her.colonisation.first-chimurenga).
import { concept, P, source, sources, table, levels } from "../lib.mjs";

concept("her.colonisation.first-chimurenga", { file: "colonisation/first-chimurenga", keyPrefix: "colonisation.first-chimurenga" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "When did the rising in **Matabeleland** begin?",
    options: [
      ["March 1896", "Correct: the Ndebele rose first, in late March 1896."],
      ["June 1896", "Most Shona communities rose from June 1896."],
      ["July 1893", "This was the Victoria incident."],
      ["April 1898", "Nehanda and Kaguvi were executed in April 1898."],
    ],
    answer: "A",
    explanation: "Matabeleland: March 1896. Mashonaland: June 1896.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which cattle disease swept through the country in 1896?",
    options: [
      ["Rinderpest", "Correct: it killed very large numbers of cattle."],
      ["Foot rot", "This is not the 1896 epidemic."],
      ["Anthrax", "Anthrax was not the epidemic of 1896."],
      ["Locusts", "Locusts are insects that destroyed crops, not a cattle disease."],
    ],
    answer: "A",
    explanation: "Rinderpest, with drought and locusts, added to people's suffering and anger.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How did the **Jameson Raid** help to cause the risings?",
    options: [
      ["It took many Company police out of the country and showed the Company could fail", "Correct: the country was left weakly defended."],
      ["It gave the Ndebele new land and cattle in the Transvaal after the raid failed", "The raid gave the Ndebele nothing."],
      ["It introduced the hut tax for the first time", "The hut tax was a separate Company policy."],
      ["It brought rinderpest into Matabeleland", "Rinderpest spread through southern Africa independently."],
    ],
    answer: "A",
    explanation: "The failed raid into the Transvaal (1895-96) left few police in the country.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why did the **hut tax** cause anger?",
    options: [
      ["It forced people to work for settlers or sell cattle and crops to pay", "Correct: it was collected harshly and pushed people into wage labour."],
      ["It was paid by settlers to African chiefs", "The tax was paid by Africans to the Company."],
      ["It was used to build schools in every village", "This was not how the tax was used or seen."],
      ["It was charged only on settlers' houses and shops in the new towns", "It was charged on African huts."],
    ],
    answer: "A",
    explanation: "Hut tax was a heavy burden collected forcefully, sometimes by seizing property.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Where did Ndebele fighters gather in strongholds during the 1896 rising?",
    options: [
      ["In the Matobo Hills", "Correct: they used caves and boulders as strongholds."],
      ["At Great Zimbabwe", "Great Zimbabwe was not the Ndebele stronghold."],
      ["On the shores of Lake Kariba", "Lake Kariba did not exist until the dam was built in the 1950s."],
      ["In the Chimanimani mountains", "The Ndebele strongholds were in the Matobo Hills."],
    ],
    answer: "A",
    explanation: "The Matobo Hills gave the Ndebele strong defensive positions.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which was a reason for the **defeat** of the risings?",
    options: [
      ["There was no single command for the whole country", "Correct: communities often fought separately."],
      ["The Company had no reinforcements", "Reinforcements came from South Africa and Britain."],
      ["The fighters refused all advice from the spirit mediums", "Mediums inspired and encouraged many fighters."],
      ["The risings began after the Company had left", "The Company remained in control."],
    ],
    hints: ["Think about how the fighters were organised."],
    answer: "A",
    explanation: "Divided command, superior weapons, reinforcements and starvation tactics led to defeat.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "How did the fighting in **Matabeleland** largely end in 1896?",
    options: [
      ["Through indabas between Rhodes and Ndebele leaders in the Matobo Hills", "Correct: negotiation ended most of the fighting."],
      ["Through the capture, trial and execution of Mbuya Nehanda in Salisbury", "Nehanda was in Mashonaland and was executed in 1898."],
      ["Through the arrival of the Pioneer Column", "The column arrived in 1890."],
      ["Through a ruling of the Berlin Conference", "The Berlin Conference was in 1884-85."],
    ],
    hints: ["Rhodes went into the hills to talk."],
    answer: "A",
    explanation: "Rhodes's indabas in the Matobo Hills led to the end of most fighting in Matabeleland.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement about the **coordination** of the risings is **best supported** by historians?",
    options: [
      ["It is debated: some stress mediums' links, others local leadership", "Correct: this is a historians' debate."],
      ["A single king commanded both Ndebele and Shona fighters", "There was no single commander for the whole country."],
      ["The risings were planned in London by British officials", "The risings were against the Company, not planned by Britain."],
      ["There was no fighting at all in Mashonaland", "There was fierce fighting in Mashonaland from June 1896."],
    ],
    hints: ["Is there one agreed answer?"],
    answer: "A",
    explanation: "Ranger argued for coordination by mediums; later historians such as Cobbing and Beach stressed local leadership.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Mbuya Nehanda and Sekuru Kaguvi were executed in April 1898.",
    answer: true,
    explanation: "True. They were captured in late 1897, tried and executed in April 1898.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The Shona rose against the Company before the Ndebele did.",
    answer: false,
    explanation: "False. The Ndebele rose in March 1896; most Shona communities rose from June 1896.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each cause of the risings with how it affected people.",
    pairs: [
      ["Rinderpest", "Killed cattle, the main form of wealth"],
      ["Hut tax", "Forced people into wage labour"],
      ["Brutal police", "Beat and abused people in villages"],
      ["Loss of land", "Moved people to reserves or made them tenants"],
    ],
    explanation: "Each grievance added to anger against Company rule.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "The 1896-97 risings are called Chimurenga in Shona and {{blank:a}} in Ndebele. The medium linked with the Mwari shrines who is believed to have connected the Ndebele and Shona risings was {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Umvukela"], choices: ["Umvukela", "Inxwala", "Mfecane", "Ilima"] },
      { id: "b", accepted: ["Mkwati"], choices: ["Mkwati", "Lobengula", "Selous", "Mutota"] },
    ],
    explanation: "Chimurenga / Umvukela; Mkwati was linked to the Mwari shrines.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What name did nationalists give to the liberation war that led to independence in 1980? (two words)",
    accepted: ["Second Chimurenga", "the Second Chimurenga", "Second Umvukela"],
    wrong: ["First Chimurenga"],
    explanation: "The **Second Chimurenga**.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Outline **four** causes of the First Chimurenga/Umvukela.",
    points: ["Loss of land / cattle", "Forced labour / hut tax", "Brutal police / loss of authority of chiefs", "Natural disasters (rinderpest, drought, locusts) / the Jameson Raid"],
    modelAnswer: "Loss of land and cattle, forced labour, hut tax and rinderpest.",
    explanation: "One mark per cause.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Explain the role played by spirit mediums in the First Chimurenga/Umvukela.",
    points: [
      "Inspired people", "Developed: told them the ancestors were angry with the newcomers and called on them to fight",
      "Organised and encouraged chiefs", "Developed: Kaguvi and Nehanda gave instructions and urged chiefs to join",
      "Link between areas / morale", "Developed: Mkwati linked the Mwari shrines and the risings; rituals gave courage",
    ],
    modelAnswer: "Spirit mediums inspired people by saying the ancestors were angry at the newcomers and the disasters they had brought, and they called on people to fight. Kaguvi and Nehanda gave instructions and encouraged chiefs to join. Mkwati, linked with the Mwari shrines, is believed to have connected the Ndebele and Shona risings, and mediums' rituals raised fighters' courage.",
    hints: ["Inspiration, organisation, links."],
    explanation: "Two marks per developed role.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** reasons why the Shona risings lasted longer than the Ndebele rising.",
    points: [
      "Many separate chiefdoms fought from fortified hills and caves",
      "Developed: each stronghold had to be taken one by one, which took time",
      "No negotiated settlement in Mashonaland like the Matobo indabas",
      "Developed: fighting continued until leaders were killed or captured in 1897",
    ],
    modelAnswer: "In Mashonaland many separate chiefdoms fought from fortified hills and caves, so Company forces had to capture each stronghold one by one. There was also no negotiated settlement like Rhodes's indabas in the Matobo Hills, so fighting continued until leaders such as Mashayamombe, Makoni, Kaguvi and Nehanda were killed or captured in 1897.",
    hints: ["Strongholds and negotiation."],
    explanation: "Two marks per developed reason.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: sources([
      source("Source A", "an imagined diary entry by a fictional settler in Bulawayo, April 1896",
        "We are all in the laager. Every farm for miles is deserted. The rinderpest has taken half the cattle, and the people say we brought it. We should have listened when the police warned that the tax was being collected too harshly."),
      source("Source B", "an imagined account by a fictional Shona elder, told to his grandchildren in 1930",
        "Our cattle had died, our land was taken and the police beat our fathers for the tax. When the word came from the svikiro that the ancestors wanted the strangers gone, the young men took up their guns and spears."),
    ]),
    parts: [
      P.mcq({
        label: "(a)", stem: "Which cause of the rising is mentioned in **both** sources?",
        options: [
          ["Harsh collection of tax", "Correct: Source A mentions harsh tax collection; Source B mentions beatings for the tax."],
          ["The Jameson Raid", "Neither source mentions it."],
          ["Locusts", "Neither source mentions locusts."],
          ["The Victoria incident of 1893", "Neither source mentions it."],
        ],
        answer: "A",
        explanation: "Both sources link the rising to harsh tax collection.",
      }),
      P.tf({
        label: "(b)",
        stem: "Source B suggests that a spirit medium played a part in starting the rising.",
        answer: true,
        explanation: "True. The word came from the svikiro (spirit medium).",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Using both sources and your own knowledge, explain **three** causes of the First Chimurenga/Umvukela.",
        points: [
          "Natural disasters / rinderpest", "Developed: cattle died and people blamed the settlers (Sources A and B)",
          "Hut tax and brutal police", "Developed: tax collected harshly; police beat people (Sources A and B)",
          "Loss of land / role of mediums", "Developed: land taken (Source B); mediums called for action",
        ],
        modelAnswer: "Rinderpest killed many cattle, and people blamed the settlers for the disaster (Sources A and B). The hut tax was collected harshly, and the police beat people who could not pay, causing deep anger (Sources A and B). Land had been taken by settlers (Source B), and when spirit mediums said the ancestors wanted the strangers gone, people took up arms.",
      }),
    ],
    hints: ["Use evidence from each source and add your own knowledge."],
    explanation: "Using two imagined sources to explain the causes of the risings.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "Answer the questions on the results of the First Chimurenga/Umvukela.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe **two** reasons why the risings were defeated.",
        points: ["Superior weapons", "Maxim guns, rifles and dynamite against older guns and spears", "Divided command / starvation tactics / reinforcements", "e.g. communities fought separately; crops burnt and caves besieged; troops came from South Africa"],
        modelAnswer: "The Company had superior weapons: Maxim guns, rifles and dynamite against older guns and spears. The fighters had no single command, and the Company burnt crops and besieged caves until people starved.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"The First Chimurenga/Umvukela was a complete failure.\" Discuss.",
        points: [
          ["For: military defeat; many deaths; leaders executed; more land lost", 2],
          ["Against: forced changes in Company rule and closer British supervision; promises to Ndebele leaders after the indabas", 2],
          ["Against: legacy: inspired the Second Chimurenga; symbol of national resistance", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "In military terms the risings failed. The Company won, many Africans were killed, villages and crops were destroyed, and leaders such as Nehanda and Kaguvi were executed in 1898. Settlers continued to take land.\n\nHowever, the risings were not a complete failure. They showed Britain that the Company's rule was harsh, so the British government supervised it more closely, and a more organised Native Department was set up. In Matabeleland, Rhodes's indabas led to promises to Ndebele leaders. Above all, the memory of 1896-97 inspired the nationalists, who called their war the Second Chimurenga.\n\nOverall, the risings failed in the short term but succeeded in the long term as a source of inspiration and national identity, so the statement is not accurate.",
      }),
    ],
    hints: ["Consider short-term and long-term results."],
    explanation: "Describe (a) and evaluate (b) the results of the risings.",
  });

  b.card("FACT", "When did the Ndebele and Shona risings begin?", "Matabeleland: March 1896. Mashonaland: June 1896.");
  b.card("DEFINITION", "Chimurenga / Umvukela", "Shona / Ndebele words for uprising or struggle; the First Chimurenga was 1896-97.");
  b.card("DEFINITION", "Hut tax", "A Company tax on every African hut that forced people into wage labour.");
  b.card("DEFINITION", "Rinderpest", "A deadly cattle disease that swept through the region in 1896.");
  b.card("FACT", "How did the Jameson Raid help cause the risings?", "It removed many Company police from the country and showed the Company could fail.");
  b.card("FACT", "How did fighting in Matabeleland largely end?", "Through indabas between Rhodes and Ndebele leaders in the Matobo Hills (1896).");
  b.card("CONCEPT", "The coordination debate?", "Ranger: mediums coordinated the risings. Cobbing and Beach: more local, led mainly by chiefs. Both views must be weighed.");
  b.card("CONCEPT", "Why were the risings defeated?", "Superior weapons, reinforcements, divided command, starvation tactics and natural disasters.");
  b.card("CONCEPT", "Long-term result of the First Chimurenga?", "It inspired the nationalists, who called the liberation war the Second Chimurenga.");
});
