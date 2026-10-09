// W2b: missionaries, explorers, traders, hunters, concession seekers and adventurers (her.colonisation.foreign-agents).
import { concept, P, source, table, levels } from "../lib.mjs";

concept("her.colonisation.foreign-agents", { file: "colonisation/foreign-agents", keyPrefix: "colonisation.foreign-agents" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which organisation opened **Inyati** mission in 1859?",
    options: [
      ["The London Missionary Society", "Correct: the LMS opened Inyati with Mzilikazi's permission."],
      ["The British South Africa Company", "The BSAC received its charter in 1889."],
      ["The Portuguese crown", "The Portuguese had been driven from the plateau long before."],
      ["The Dutch Reformed Church of the Transvaal", "Inyati was opened by the LMS."],
    ],
    answer: "A",
    explanation: "Inyati (1859) was the first permanent mission station in Zimbabwe, opened by the LMS.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which explorer reached and named the **Victoria Falls** in 1855?",
    options: [
      ["David Livingstone", "Correct: Livingstone reached Mosi-oa-Tunya in 1855."],
      ["Frederick Selous", "Selous was a hunter who later guided the Pioneer Column."],
      ["Charles Rudd", "Rudd was a concession seeker in 1888."],
      ["John Smith Moffat", "Moffat was a missionary and arranged the 1888 treaty."],
    ],
    answer: "A",
    explanation: "Livingstone reached the falls in November 1855 and named them after Queen Victoria.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is a **concession**?",
    options: [
      ["A written grant of rights, such as mining rights, given by a ruler", "Correct: concessions granted rights in return for payment."],
      ["A church service held at a mission station on a Sunday morning", "That is a religious service."],
      ["A map of routes drawn by an explorer", "Maps were made by explorers; they are not concessions."],
      ["A regiment of the Ndebele army", "A regiment is an ibutho."],
    ],
    answer: "A",
    explanation: "A concession grants rights, for example to minerals or land.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which group played the **most direct** role in colonisation by obtaining rights from Lobengula?",
    options: [
      ["Concession seekers", "Correct: they obtained written rights such as the Rudd Concession."],
      ["Explorers", "Explorers publicised the land; their role was mostly indirect."],
      ["Missionaries at Inyati", "Missionaries' role was mainly indirect, through influence and interpreting."],
      ["Hunters", "Hunters gathered information and ivory but did not obtain the key rights."],
    ],
    answer: "A",
    explanation: "Concession seekers obtained the documents later used to justify occupation.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which hunter later guided the Pioneer Column in 1890?",
    options: [
      ["Frederick Selous", "Correct: Selous knew the routes from years of hunting."],
      ["David Livingstone", "Livingstone died in 1873."],
      ["Karl Mauch", "Mauch was a geologist who reported gold."],
      ["Charles Helm", "Helm was a missionary at Hope Fountain."],
    ],
    answer: "A",
    explanation: "Selous's knowledge of the country made him the guide of the Pioneer Column.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "How did missionaries' **reports** help to prepare the way for colonisation?",
    options: [
      ["They spread knowledge of the land and its people in Europe", "Correct: reports raised interest and sometimes justified intervention."],
      ["They ordered the British army to invade Matabeleland at once", "Missionaries could not order the army."],
      ["They signed the Berlin Conference resolutions", "Missionaries did not sign the Berlin resolutions."],
      ["They sold land titles to the Pioneer Column members", "Missionaries did not sell land titles."],
    ],
    answer: "A",
    hints: ["Who read the reports?"],
    explanation: "Reports informed and influenced readers and investors in Europe; some described African societies unfavourably, helping to justify intervention.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A trader spends years at Bulawayo and learns the strength of the Ndebele regiments and the best routes. How could this **help colonisation**?",
    options: [
      ["His knowledge could guide later invaders and settlers", "Correct: information about routes and military strength was valuable to the colonisers."],
      ["It would make the Ndebele king and his regiments stronger", "Sharing it with outsiders would weaken, not strengthen, the king."],
      ["It would stop the Company from coming", "Knowledge of routes made occupation easier."],
      ["It would end the trade in guns", "Traders were among those who brought guns."],
    ],
    answer: "A",
    hints: ["Who would want to know about routes and regiments?"],
    explanation: "Traders and hunters gathered information that colonisers later used.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement **best** judges the role of missionaries in colonisation?",
    options: [
      ["Mostly indirect, through reports, influence and interpreting", "Correct: a balanced judgement of their role."],
      ["They were the only cause of colonisation", "Concession seekers, the Company and European rivalry were major causes."],
      ["They played no part at all in colonisation", "They interpreted and witnessed treaties and sent reports home."],
      ["They led the Pioneer Column into Mashonaland in 1890", "The column was led by Company officers and guided by Selous."],
    ],
    answer: "A",
    hints: ["Avoid extreme statements."],
    explanation: "Missionaries came mainly to spread Christianity; their role in colonisation was real but largely indirect.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Karl Mauch was a German geologist who reported gold in the region in the 1860s.",
    answer: true,
    explanation: "True. His reports encouraged prospectors; he also visited Great Zimbabwe in 1871.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The LMS missionaries at Inyati quickly converted most of the Ndebele to Christianity.",
    answer: false,
    explanation: "False. Missionaries made very few converts among the Ndebele before colonisation.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with the group to which he belonged.",
    pairs: [
      ["Robert Moffat", "Missionary"],
      ["David Livingstone", "Explorer"],
      ["Frederick Selous", "Hunter"],
      ["Charles Rudd", "Concession seeker"],
    ],
    explanation: "Moffat: LMS missionary; Livingstone: explorer; Selous: hunter; Rudd: concession seeker for Rhodes.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "The missionary {{blank:a}} arranged the treaty of February 1888 with Lobengula. The missionary Charles Helm interpreted the {{blank:b}} Concession.",
    blanks: [
      { id: "a", accepted: ["John Smith Moffat"], choices: ["John Smith Moffat", "David Livingstone", "Frederick Selous", "Karl Mauch"] },
      { id: "b", accepted: ["Rudd"], choices: ["Rudd", "Lippert", "Grobler", "Victoria"] },
    ],
    explanation: "John Smith Moffat: Moffat Treaty (1888). Charles Helm interpreted and witnessed the Rudd Concession.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the first permanent mission station in Zimbabwe, opened in 1859.",
    accepted: ["Inyati", "Inyathi", "Inyati Mission", "Inyathi Mission"],
    wrong: ["Hope Fountain"],
    explanation: "**Inyati** (1859), opened by the LMS.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Identify **four** groups of foreigners who came to Zimbabwe before colonisation.",
    points: ["Missionaries", "Explorers", "Traders / hunters", "Concession seekers / adventurers"],
    modelAnswer: "Missionaries, explorers, hunters and concession seekers.",
    explanation: "One mark per group.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways in which hunters and traders helped to prepare the way for colonisation.",
    points: [
      "Gathered knowledge of routes, water and the Ndebele army",
      "Developed: this information was later used by the colonisers / Selous guided the Pioneer Column",
      "Brought guns and European goods / depleted ivory",
      "Developed: created dependence on European goods and links with Europe",
    ],
    modelAnswer: "Hunters and traders learned the routes, water sources and strength of the Ndebele army, and this knowledge was later used by the colonisers; Selous guided the Pioneer Column. They also brought guns and European goods, creating demand and links with Europe.",
    hints: ["Information and goods."],
    explanation: "Two marks per developed way.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain why historians describe the role of missionaries as **mixed**.",
    points: [
      "Helped colonisation",
      "Developed: reports, interpreting treaties (Helm), weakening traditional beliefs",
      "Brought benefits used by later Zimbabweans",
      "Developed: schools, literacy and clinics; many later nationalists were educated at missions",
    ],
    modelAnswer: "Missionaries helped colonisation through their reports, by interpreting and witnessing treaties such as the Rudd Concession, and by weakening some traditional beliefs. However, they also brought schools, literacy and clinics, and many later Zimbabweans, including nationalists, were educated at mission schools. Their role therefore had both harmful and beneficial effects.",
    hints: ["Give both sides."],
    explanation: "Two marks per developed side.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: source("Source A", "an imagined letter from a fictional trader at Bulawayo to a friend in Cape Town, dated 1886",
      "The king's court is full of white men these days. The hunters talk of nothing but ivory, which grows scarcer each year. The missionaries say the king listens politely but few people come to church. Now new men arrive every month asking for papers to dig for gold. I fear the king will have no peace until someone gets what he wants."),
    parts: [
      P.mcq({
        label: "(a)", stem: "According to Source A, what were the **new men** asking for?",
        options: [
          ["Papers giving rights to dig for gold", "Correct: they were concession seekers."],
          ["Permission to build a church", "The missionaries are already present."],
          ["Cattle to take back to Cape Town", "The source does not say this."],
          ["Ivory for the king", "The hunters, not the new men, talk of ivory."],
        ],
        answer: "A",
        explanation: "Requests for mining rights describe concession seekers.",
      }),
      P.tf({
        label: "(b)",
        stem: "Source A suggests that the missionaries had converted many people at Bulawayo.",
        answer: false,
        explanation: "False. The source says few people came to church.",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Using Source A and your own knowledge, explain how **three** groups of foreigners put pressure on the Ndebele state.",
        points: [
          "Hunters",
          "Developed: over-hunted elephants for ivory, which was growing scarce",
          "Missionaries",
          "Developed: tried to change beliefs; later acted as interpreters for concession seekers",
          "Concession seekers",
          "Developed: arrived constantly demanding mining rights, leading to the Rudd Concession",
        ],
        modelAnswer: "Hunters killed so many elephants that ivory, an important resource, was becoming scarce. Missionaries tried to change people's beliefs and later acted as interpreters for concession seekers. Concession seekers arrived every month demanding rights to dig for gold, giving the king no peace, and this pressure led to the Rudd Concession of 1888.",
      }),
    ],
    hints: ["Use the three groups named in the letter."],
    explanation: "Interpreting an imagined source about foreign visitors at Bulawayo.",
  });
  b.struct({
    d: 4, skill: "EVALUATION",
    stem: "Answer the questions on the forerunners of colonialism.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe the role of explorers in preparing for colonisation.",
        points: ["Wrote books and reports about the land and peoples (e.g. Livingstone)", "Reported minerals such as gold (e.g. Mauch)", "Drew maps and showed routes into the interior", "Encouraged investors, prospectors and the idea of bringing trade and 'civilisation'"],
        modelAnswer: "Explorers such as Livingstone wrote books and reports about the land and peoples. Karl Mauch reported gold. They drew maps and showed routes into the interior, and their writings encouraged investors and prospectors to come.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Concession seekers were more important than missionaries in the colonisation of Zimbabwe.\" Discuss.",
        points: [
          ["For: concession seekers obtained the Rudd Concession, the basis for the Royal Charter and occupation", 2],
          ["Against: missionaries prepared the way over decades through reports, influence and interpreting (Moffat Treaty, Helm)", 2],
          ["Other groups also mattered: explorers, hunters and traders provided information; Selous guided the column", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "Concession seekers played the most direct role. Rudd, Maguire and Thompson obtained the Rudd Concession in 1888, which Rhodes used to gain the Royal Charter, and this led directly to the occupation of 1890.\n\nHowever, missionaries had prepared the way for decades. Their reports spread knowledge of the country, John Smith Moffat arranged the Moffat Treaty, which kept other powers away, and Charles Helm interpreted the Rudd Concession. Explorers, traders and hunters also supplied information, and Selous guided the Pioneer Column.\n\nOverall, concession seekers were more important in the final step, but they could not have succeeded without the groundwork laid by missionaries and others. The statement is therefore largely true, but colonisation was the result of all the groups together.",
      }),
    ],
    hints: ["In (b), compare direct and indirect roles."],
    explanation: "Describe (a) and evaluate (b) the roles of the forerunners.",
  });

  b.card("DEFINITION", "Concession", "A written grant of rights (e.g. to minerals or land) given by a ruler, usually for payment.");
  b.card("DEFINITION", "Forerunners of colonialism", "Missionaries, explorers, traders, hunters, concession seekers and adventurers whose activities prepared the way for colonial rule.");
  b.card("FACT", "First permanent mission station in Zimbabwe?", "Inyati, opened by the London Missionary Society in 1859.");
  b.card("FACT", "When did Livingstone reach the Victoria Falls?", "1855.");
  b.card("FACT", "Who guided the Pioneer Column?", "The hunter Frederick Selous.");
  b.card("FACT", "Who interpreted the Rudd Concession?", "The missionary Charles Helm.");
  b.card("CONCEPT", "How did explorers help colonisation?", "Their books, reports and maps publicised minerals and routes, attracting investors and prospectors.");
  b.card("CONCEPT", "Why did concession seekers play the most direct role?", "They obtained written rights (e.g. the Rudd Concession) used to justify the Charter and occupation.");
  b.card("CONCEPT", "Why is the missionaries' role called mixed?", "They aided colonisation (reports, interpreting) but also brought schools, literacy and clinics.");
});
