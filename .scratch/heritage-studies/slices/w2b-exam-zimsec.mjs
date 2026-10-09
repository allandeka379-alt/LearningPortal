// W2b exam-format items: ZIMSEC Paper 2 Section A (STRUCTURED 10: 2 + 3 + 5, UNDERSTANDING) x4 and Section B essays
// (STRUCTURED 20: 8 + 12, EVALUATION) x3. Part structure is our convention (reviewer to check against recent papers).
import { concept, P, source, levels, EXAM, checkExam } from "../lib.mjs";

const A = EXAM.ZIM_P2A;
const B = EXAM.ZIM_P2B;
const secA = { skill: A.skill, secs: A.secs, examStyle: true, paper: "Paper 2" };
const secB = { skill: B.skill, secs: B.secs, examStyle: true, paper: "Paper 2" };

concept("her.precolonial.political-structures", { file: "exam/w2b-zimsec", keyPrefix: "exam.w2b-zimsec" }, (b) => {
  // ---------------- Section A ----------------
  // A1. Chieftainship.
  b.struct({
    ...secA, d: 3,
    concepts: ["her.precolonial.political-structures"],
    stem: "This question is about chieftainship.",
    parts: checkExam(A, [
      P.fib({
        label: "(a)",
        stem: "Complete the statements.",
        template: "In the Shona hierarchy of traditional leaders, the headman of a ward is the {{blank:a}} and the village head is the {{blank:b}}.",
        blanks: [
          { id: "a", accepted: ["sadunhu"], choices: ["sadunhu", "sabhuku", "svikiro", "mambo"] },
          { id: "b", accepted: ["sabhuku"], choices: ["sadunhu", "sabhuku", "svikiro", "mambo"] },
        ],
        explanation: "Mambo → ishe → sadunhu (headman) → sabhuku (village head).",
      }),
      P.match({
        label: "(b)",
        stem: "Match each term with its meaning.",
        pairs: [
          ["Regalia", "Objects and dress that show a leader's office"],
          ["Zunde raMambo", "The chief's field and granary for the needy"],
          ["Customary law", "Rules passed down by tradition and applied by chiefs"],
        ],
        explanation: "Key terms of chieftainship.",
      }),
      P.manual({
        label: "(c)", marks: 5,
        stem: "Explain the significance of chieftainship in Zimbabwean communities.",
        points: [
          ["Chiefs settle disputes under customary law, so justice is quick, cheap and close to home", 2],
          ["Chiefs allocate communal land fairly, so every family has a place to live and farm", 2],
          "Any one further point: lead ceremonies and preserve culture; link with the ancestors; welfare through Zunde raMambo; help development; recognised in Chapter 15",
        ],
        modelAnswer: "Chiefs settle disputes under customary law, so people get justice quickly and cheaply, close to home, from leaders who know the families. They allocate communal land fairly, so every family has somewhere to live and farm. They also lead ceremonies such as mukwerera / ukucela izulu, which preserve culture and unite the community.",
        explanation: "Two marks for each developed point, one for a further point.",
      }),
    ]),
    hints: ["In (c), say what chiefs do and why it matters to the community."],
    explanation: "Section A item on chieftainship.",
  });

  // A2. Iron Age contributions.
  b.struct({
    ...secA, d: 3,
    concepts: ["her.precolonial.iron-age-contributions", "her.precolonial.early-iron-age", "her.precolonial.great-zimbabwe-mutapa"],
    stem: "This question is about the contributions of Iron Age communities.",
    parts: checkExam(A, [
      P.fib({
        label: "(a)",
        stem: "Complete the statements.",
        template: "The name Zimbabwe comes from dzimba dza {{blank:a}}. The main grain crops of Early Iron Age farmers were sorghum and {{blank:b}}.",
        blanks: [
          { id: "a", accepted: ["mabwe"], choices: ["mabwe", "mombe", "vanhu", "mvura"] },
          { id: "b", accepted: ["millets"], choices: ["millets", "maize", "wheat", "rice"] },
        ],
        explanation: "Dzimba dza mabwe: houses of stone. Sorghum and millets were the Iron Age staples.",
      }),
      P.match({
        label: "(b)",
        stem: "Match each Iron Age contribution with how it continues today.",
        pairs: [
          ["Mining", "Modern mines opened on ancient workings"],
          ["Stone building", "Tourism at Great Zimbabwe and Khami"],
          ["Political structures", "Chiefs recognised in Chapter 15 of the Constitution"],
        ],
        explanation: "Each contribution survives in a modern form.",
      }),
      P.manual({
        label: "(c)", marks: 5,
        stem: "Explain the significance of Iron Age contributions to farming and religion in Zimbabwe today.",
        points: [
          ["Small grains (sorghum, millets) are still grown and promoted as drought-tolerant crops, protecting food security in dry areas", 2],
          ["Belief in Mwari and the ancestors continues; ceremonies such as bira, kurova guva / umbuyiso and mukwerera / ukucela izulu are still held", 2],
          "Any one further point: cattle remain wealth and are used for roora / lobola and ploughing; granaries and seed storage; spirit mediums still respected",
        ],
        modelAnswer: "Iron Age farmers grew sorghum and millets, which are still grown and promoted as drought-tolerant crops, helping families in dry areas to have enough food. Many families still believe in Mwari and respect the ancestors, holding ceremonies such as bira and mukwerera / ukucela izulu. Cattle also remain important as wealth and for roora / lobola.",
        explanation: "Two marks for each developed point, one for a further point.",
      }),
    ]),
    hints: ["In (c), link each contribution to its use today."],
    explanation: "Section A item on Iron Age contributions.",
  });

  // A3. Treaties and concessions.
  b.struct({
    ...secA, d: 3,
    concepts: ["her.colonisation.colonisation"],
    stem: "This question is about the treaties that led to the colonisation of Zimbabwe.",
    parts: checkExam(A, [
      P.fib({
        label: "(a)",
        stem: "Complete the statements.",
        template: "The Rudd Concession was signed on 30 October {{blank:a}}. The Royal Charter was granted to the British {{blank:b}} Company.",
        blanks: [
          { id: "a", accepted: ["1888"], choices: ["1888", "1887", "1889", "1890"] },
          { id: "b", accepted: ["South Africa"], choices: ["South Africa", "East India", "Matabeleland", "Zambezi"] },
        ],
        explanation: "Rudd Concession: 30 October 1888. Royal Charter: British South Africa Company, 1889.",
      }),
      P.match({
        label: "(b)",
        stem: "Match each treaty with its main term.",
        pairs: [
          ["Grobler Treaty (1887)", "Friendship between Lobengula and the Transvaal"],
          ["Moffat Treaty (1888)", "No dealings with other foreign powers without British approval"],
          ["Rudd Concession (1888)", "Exclusive rights to all metals and minerals"],
        ],
        explanation: "Grobler: Transvaal friendship. Moffat: British sphere. Rudd: mineral rights.",
      }),
      P.manual({
        label: "(c)", marks: 5,
        stem: "Explain why the Rudd Concession was important in the colonisation of Zimbabwe.",
        points: [
          ["Rhodes used it to obtain the Royal Charter (1889), which gave the BSAC power to govern, make laws and keep police", 2],
          ["Its wide wording ('do all things necessary') was used to justify sending the Pioneer Column and occupying land in 1890", 2],
          "Any one further point: it excluded rival concession seekers; verbal promises left out, so Lobengula repudiated it; led to conflict in 1893",
        ],
        modelAnswer: "Rhodes used the Rudd Concession to obtain the Royal Charter in 1889, which gave the British South Africa Company the power to govern, make laws and keep a police force. Its wide wording, allowing the grantees to do all things necessary to win the minerals, was used to justify sending the Pioneer Column to occupy Mashonaland in 1890. It also shut out rival concession seekers.",
        explanation: "Two marks for each developed point, one for a further point.",
      }),
    ]),
    hints: ["In (c), follow the steps from the concession to occupation."],
    explanation: "Section A item on treaties and concessions.",
  });

  // A4. Spirit mediums in 1896-97.
  b.struct({
    ...secA, d: 3,
    concepts: ["her.colonisation.first-chimurenga", "her.colonisation.first-chimurenga-heroes"],
    stem: "This question is about the role of spirit mediums in the First Chimurenga/Umvukela.",
    parts: checkExam(A, [
      P.fib({
        label: "(a)",
        stem: "Complete the statements.",
        template: "The medium of the Nehanda spirit in 1896-97 was Charwe {{blank:a}}. Nehanda and Kaguvi were executed in April {{blank:b}}.",
        blanks: [
          { id: "a", accepted: ["Nyakasikana"], choices: ["Nyakasikana", "Gumboreshumba", "Chingaira", "Mutota"] },
          { id: "b", accepted: ["1898"], choices: ["1898", "1896", "1893", "1890"] },
        ],
        explanation: "Charwe Nyakasikana; executed April 1898.",
      }),
      P.match({
        label: "(b)",
        stem: "Match each spirit medium or religious leader with the area most linked to him or her.",
        pairs: [
          ["Mbuya Nehanda", "The Mazowe area"],
          ["Sekuru Kaguvi", "Central Mashonaland, west of Salisbury"],
          ["Mkwati", "The Mwari shrines in the Matobo Hills"],
        ],
        explanation: "Nehanda: Mazowe. Kaguvi: west of Salisbury. Mkwati: Matobo Hills.",
      }),
      P.manual({
        label: "(c)", marks: 5,
        stem: "Describe the role played by spirit mediums in the First Chimurenga/Umvukela.",
        points: [
          ["Inspired people by saying the ancestors were angry at the newcomers and the disasters they had brought, calling on them to fight", 2],
          ["Encouraged and instructed chiefs to join the rising (e.g. Kaguvi sent messages to chiefs)", 2],
          "Any one further point: Mkwati linked the Ndebele and Shona risings; rituals raised morale; their example inspired the Second Chimurenga",
        ],
        modelAnswer: "Spirit mediums inspired people by telling them that the ancestors were angry at the newcomers and the disasters they had brought, and they called on them to fight. Kaguvi and Nehanda encouraged and instructed chiefs to join the rising. Mkwati, linked with the Mwari shrines, is believed to have connected the Ndebele and Shona risings.",
        explanation: "Two marks for each developed point, one for a further point.",
      }),
    ]),
    hints: ["In (c), describe what the mediums did and how it affected the risings."],
    explanation: "Section A item on spirit mediums in 1896-97.",
  });

  // ---------------- Section B ----------------
  // B1. Foreign agents.
  b.struct({
    ...secB, d: 4,
    concepts: ["her.colonisation.foreign-agents", "her.colonisation.colonisation"],
    stem: "This question is about the foreign groups that came to Zimbabwe before colonisation.",
    parts: checkExam(B, [
      P.manual({
        label: "(a)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "Describe the activities of missionaries, explorers, traders and hunters in nineteenth-century Zimbabwe.",
        points: [
          ["Missionaries: LMS at Inyati (1859) and Hope Fountain; preached, opened schools and clinics, translated, advised the king", 2],
          ["Explorers: Livingstone (Victoria Falls, 1855) and Mauch (gold reports in the 1860s); travelled, mapped and wrote books", 2],
          ["Traders: exchanged guns, cloth and beads for ivory and cattle at Bulawayo", 2],
          ["Hunters: Selous and Hartley hunted elephants for ivory and learned the routes and land", 2],
        ],
        modelAnswer: "Missionaries of the London Missionary Society opened Inyati mission in 1859 with Mzilikazi's permission, and later Hope Fountain. They preached, opened schools and clinics, translated, and advised and wrote letters for the king.\n\nExplorers travelled through the region and wrote about it. David Livingstone reached the Victoria Falls in 1855, and the geologist Karl Mauch reported gold in the 1860s. They drew maps and wrote books.\n\nTraders came to Bulawayo to exchange guns, cloth and beads for ivory and cattle.\n\nHunters such as Frederick Selous and Henry Hartley hunted elephants for ivory and learned the routes and the land.",
        explanation: "Two marks for each developed point.",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE",
        stem: "\"Missionaries did more than any other group to prepare the way for the colonisation of Zimbabwe.\" Discuss.",
        points: [
          ["For: reports home spread knowledge of the land; some writings justified intervention; teaching weakened loyalty to traditional leaders among converts", 3],
          ["For: acted as interpreters, advisers and witnesses: John Smith Moffat (Moffat Treaty), Charles Helm (Rudd Concession)", 3],
          ["Against: concession seekers (Rudd, Maguire, Thompson) played the most direct role; explorers publicised minerals; hunters and traders gave knowledge of routes; Selous guided the column", 3],
          ["Supported judgement weighing direct and indirect roles", 3],
        ],
        levels: levels(12),
        modelAnswer: "Missionaries did much to prepare the way for colonisation. Their reports and letters spread knowledge of the land, its people and its resources in Britain, and some described African societies unfavourably, which helped to justify intervention. Among their few converts, mission teaching weakened loyalty to traditional beliefs and leaders.\n\nMissionaries also helped directly with treaties. John Smith Moffat arranged the Moffat Treaty of 1888, which placed Matabeleland in the British sphere, and Charles Helm interpreted and witnessed the Rudd Concession.\n\nHowever, other groups were also important. Concession seekers played the most direct role: Rudd, Maguire and Thompson obtained the Rudd Concession for Rhodes, which led to the Royal Charter and the occupation. Explorers such as Livingstone and Mauch publicised the land and its gold, attracting investors. Hunters and traders gathered knowledge of routes and the Ndebele army, and the hunter Selous guided the Pioneer Column.\n\nIn conclusion, missionaries laid important groundwork over many years, but concession seekers took the decisive step. The statement is therefore only partly true: colonisation resulted from all these groups together, with concession seekers playing the most direct part.",
        explanation: "Level 4 (10-12): both sides developed with examples and a supported judgement.",
      }),
    ]),
    hints: ["In (b), separate direct and indirect roles."],
    explanation: "Section B essay on the role of foreign agents in colonisation.",
  });

  // B2. First Chimurenga: causes and results.
  b.struct({
    ...secB, d: 4,
    concepts: ["her.colonisation.first-chimurenga", "her.colonisation.anglo-ndebele-war"],
    stem: "This question is about the First Chimurenga/Umvukela.",
    parts: checkExam(B, [
      P.manual({
        label: "(a)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "Explain the causes of the First Chimurenga/Umvukela.",
        points: [
          ["Loss of land and cattle: settlers took the best land; Ndebele cattle seized after 1893; people moved to reserves", 2],
          ["Forced labour and hut tax, collected harshly, often with beatings by Company police", 2],
          ["Natural disasters: rinderpest (1896), drought and locusts, blamed on the newcomers; cattle shot to stop rinderpest", 2],
          ["Loss of authority of chiefs and izinduna / the Jameson Raid left few police / Ndebele wish to restore their state", 2],
        ],
        modelAnswer: "Africans had lost much of their land to settlers, and after the war of 1893 the Company seized most Ndebele cattle, so many people were poor and angry.\n\nThe Company forced Africans to work for settlers and mines and charged a hut tax, which was collected harshly; the Company's police often beat people.\n\nIn 1896 rinderpest killed huge numbers of cattle, and drought and locusts destroyed crops. Many people blamed the newcomers, and the Company's shooting of cattle to stop the disease added to the anger.\n\nFinally, chiefs and izinduna had lost their authority, the Ndebele wanted to restore their kingdom, and the failed Jameson Raid had taken many Company police out of the country, showing that the Company could be defeated.",
        explanation: "Two marks for each developed point.",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE",
        stem: "\"The results of the First Chimurenga/Umvukela were entirely negative for the African people.\" How far do you agree?",
        points: [
          ["Agree: military defeat; heavy loss of life; crops, cattle and villages destroyed; hunger", 3],
          ["Agree: leaders executed (Nehanda and Kaguvi, April 1898; Makoni 1897); more land taken; Company rule continued", 3],
          ["Disagree: Britain supervised the Company more closely; a more organised Native Department; promises to Ndebele leaders at the Matobo indabas; lasting legacy that inspired the Second Chimurenga", 3],
          ["Supported judgement weighing short-term and long-term results", 3],
        ],
        levels: levels(12),
        modelAnswer: "In the short term the results were very negative for Africans. The risings were defeated, many people were killed, and villages, crops and cattle were destroyed, causing hunger. Leaders such as Chief Makoni were executed in 1897, and Mbuya Nehanda and Sekuru Kaguvi were executed in April 1898. Settlers continued to take land, and Company rule continued.\n\nHowever, not all the results were negative. The risings showed Britain how harsh Company rule was, and the British government increased its supervision of the Company, while a more organised Native Department was set up. In Matabeleland, Rhodes's indabas in the Matobo Hills ended the fighting with promises to Ndebele leaders. Most importantly, the memory of 1896-97 became a lasting symbol of resistance. The nationalists of the 1960s and 1970s called their war the Second Chimurenga and drew inspiration from Nehanda and Kaguvi.\n\nIn conclusion, the immediate results were mostly negative, but the long-term legacy was positive as a source of identity and inspiration. I therefore disagree that the results were entirely negative.",
        explanation: "Level 4 (10-12): both sides developed with examples and a supported judgement.",
      }),
    ]),
    hints: ["In (b), consider short-term and long-term results."],
    explanation: "Section B essay on the causes and results of the First Chimurenga/Umvukela.",
  });

  // B3. Heritage of the pre-colonial states.
  b.struct({
    ...secB, d: 4,
    concepts: ["her.precolonial.great-zimbabwe-mutapa", "her.precolonial.rozvi-ndebele", "her.precolonial.iron-age-contributions"],
    stem: "This question is about the pre-colonial states of Zimbabwe and their heritage.",
    parts: checkExam(B, [
      P.manual({
        label: "(a)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "Describe the political and economic organisation of Great Zimbabwe.",
        points: [
          ["A king ruled with chiefs, advisers and relatives; subject chiefs paid tribute", 2],
          ["Rulers had religious authority, linked with the ancestors and ceremonies (the Hill Complex)", 2],
          ["Economy based on cattle, crop farming and crafts (iron, copper, soapstone, weaving)", 2],
          ["Gold mining and ivory, traded through the coast (Sofala, Kilwa) for beads, cloth and Asian pottery", 2],
        ],
        modelAnswer: "Great Zimbabwe was ruled by a king, helped by chiefs, advisers and relatives. Subject chiefs paid tribute in cattle, grain and other goods.\n\nThe rulers also had religious authority. They were linked with the ancestors and led ceremonies, probably on the Hill Complex.\n\nThe economy rested on cattle, the main form of wealth, and on crop farming, together with crafts such as iron and copper working, soapstone carving and weaving.\n\nThe rulers controlled gold mining and ivory hunting, and traded gold and ivory through coastal towns such as Sofala and Kilwa for glass beads, cloth and Chinese and Persian pottery.",
        explanation: "Two marks for each developed point.",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE",
        stem: "To what extent is the heritage of the pre-colonial states still important in Zimbabwe today?",
        points: [
          ["Important: Great Zimbabwe and Khami are World Heritage Sites; tourism; the country's name and the Zimbabwe Bird on the flag", 3],
          ["Important: traditional leadership (chiefs, headmen, village heads) recognised in Chapter 15; belief in Mwari and ancestors; mining on ancient workings; small grains", 3],
          ["Limits: the states themselves have gone; Parliament, councils and courts hold most power; modern farming, mining and medicine have replaced old methods; many urban young people know little of this history", 3],
          ["Supported judgement", 3],
        ],
        levels: levels(12),
        modelAnswer: "The heritage of the pre-colonial states is still important in many ways. Great Zimbabwe and Khami are UNESCO World Heritage Sites that attract tourists and researchers. The country takes its name from dzimba dza mabwe, and the Zimbabwe Bird from Great Zimbabwe is on the national flag and coat of arms, so this heritage shapes national identity.\n\nPolitical and religious traditions also continue. The hierarchy of chiefs, headmen and village heads grew from pre-colonial systems and is recognised in Chapter 15 of the Constitution. Many families still believe in Mwari and respect the ancestors. Many modern mines began on ancient workings, and small grains first grown by Iron Age farmers are promoted in dry areas.\n\nHowever, the states themselves have gone. Parliament, councils and courts now hold most power, and modern methods have replaced old ones in farming, mining and medicine. Many young people in towns know little about this history.\n\nOverall, the heritage remains important, especially for identity, culture and rural life, even though its economic and political role has been reduced. It is therefore still important to a large extent.",
        explanation: "Level 4 (10-12): both sides developed with examples and a supported judgement.",
      }),
    ]),
    hints: ["In (b), weigh identity and culture against economic and political change."],
    explanation: "Section B essay on the heritage of the pre-colonial states.",
  });
});
