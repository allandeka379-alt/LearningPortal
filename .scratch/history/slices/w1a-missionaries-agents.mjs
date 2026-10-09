// W1a: hist.contact.missionaries-agents (ZIMSEC 6.2).
import { concept, P, source, sources, timeline, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.contact.missionaries-agents", { file: "contact/missionaries-agents", keyPrefix: "contact.missionaries-agents" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which missionary society opened the mission at **Inyati** in 1859?",
    options: [
      ["The London Missionary Society", "Correct: the LMS opened Inyati with Mzilikazi's permission."],
      ["The Jesuit Zambezi Mission", "The Jesuits arrived in Lobengula's kingdom in 1879."],
      ["The Dutch Reformed Church", "The DRC opened Morgenster in 1891."],
      ["The Seventh-day Adventist Church", "The Adventists came after the occupation, at Solusi."],
    ],
    answer: "A",
    explanation: "The LMS opened Inyati in 1859 and Hope Fountain in 1870.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Through whose friendship with Mzilikazi was the LMS allowed to work in the Ndebele state?",
    options: [
      ["Robert Moffat", "Correct: Robert Moffat of Kuruman was Mzilikazi's friend."],
      ["David Livingstone, the explorer of the Zambezi", "Livingstone was Moffat's son-in-law, but the friendship with Mzilikazi was Moffat's."],
      ["Cecil Rhodes, the founder of the Company", "Rhodes came much later and was not a missionary."],
      ["Charles Helm of Hope Fountain", "Helm worked under Lobengula in the 1880s."],
    ],
    answer: "A",
    explanation: "Robert Moffat's friendship with Mzilikazi opened the way for the Inyati mission (1859).",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Where did the Dutch Reformed Church open its mission in 1891?",
    options: [
      ["Morgenster", "Correct: Morgenster, near Fort Victoria (Masvingo)."],
      ["Inyati, north-east of Bulawayo", "Inyati was the LMS mission of 1859."],
      ["Empandeni, south-west of Bulawayo", "Empandeni was a Jesuit mission (1887)."],
      ["Hope Fountain, near Bulawayo", "Hope Fountain was an LMS mission (1870)."],
    ],
    answer: "A",
    explanation: "Morgenster was the Dutch Reformed Church's mission near Fort Victoria, opened after the occupation.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of these was a **challenge** faced by the early missionaries in Matabeleland?",
    options: [
      ["Very few people converted", "Correct: the LMS made very few converts in its first decades."],
      ["The British government ordered them to leave", "No such order was given; the king controlled their activities."],
      ["They were forbidden to learn African languages", "Missionaries had to learn the languages; the difficulty was doing so."],
      ["There were too many converts for the churches to hold", "The problem was the opposite: very few converts."],
    ],
    answer: "A",
    explanation: "Challenges included few converts, royal control, disease, language, distance and the strength of African religion.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What role did the LMS missionary **Charles Helm** play in 1888?",
    options: [
      ["He interpreted for Lobengula at the Rudd Concession", "Correct: he interpreted and witnessed it and assured the king about unwritten promises."],
      ["He led the Pioneer Column to Fort Salisbury", "The column was guided by Selous and led by Johnson and Pennefather in 1890."],
      ["He opened the first Jesuit school at Empandeni", "Helm was LMS (Protestant); Empandeni was Jesuit."],
      ["He discovered gold at Tati and started a great gold rush", "Karl Mauch's reports of gold (1867) led to the Tati rush."],
    ],
    answer: "A",
    hints: ["The event in question was signed at Lobengula's capital in October 1888."],
    explanation: "Helm interpreted and witnessed the Rudd Concession; he told Lobengula of verbal promises that were not in the written text.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "How did the explorer **Karl Mauch** help to prepare the way for colonisation?",
    options: [
      ["He reported gold north of the Limpopo", "Correct: his reports in 1867 led to a gold rush to Tati and spread the idea of rich goldfields."],
      ["He signed a treaty with Lobengula on behalf of the Transvaal", "That was Pieter Grobler (1887)."],
      ["He founded the Inyati mission", "Inyati was founded by the LMS in 1859."],
      ["He commanded the Company's police in 1890", "Mauch was a geologist and traveller, not a police commander."],
    ],
    answer: "A",
    hints: ["Mauch was a German geologist."],
    explanation: "Mauch's gold reports (1867) and his false Sheba theory about Great Zimbabwe fed European interest in the region's supposed riches.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which reason **best** explains why the LMS made few converts among the Ndebele before 1893?",
    options: [
      ["Converting could look like disloyalty to the king", "Correct: the king and regiments dominated life, so conversion carried a high social cost."],
      ["The missionaries never preached in the local language", "Missionaries learned and preached in Sindebele."],
      ["The Ndebele had already converted to Islam", "There is no evidence of this; the Ndebele kept their own religion."],
      ["The British South Africa Company banned missions in Matabeleland", "The Company was formed in 1889, and it encouraged missions."],
    ],
    answer: "A",
    hints: ["Who controlled the lives of young men in the Ndebele state?"],
    explanation: "The political and social system centred on the king, the regiments and cattle, and on Ndebele religion, made conversion costly. Missions grew fast only after 1893.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement about the missionaries' role in colonisation is **best** supported?",
    options: [
      ["Some helped colonisation directly, but concession seekers were decisive", "Correct: e.g. Moffat's treaty and Helm's interpreting helped, but Rhodes's agents and money were decisive."],
      ["Missionaries planned and led the conquest of Zimbabwe", "The conquest was led by the Company; missionaries did not lead it."],
      ["Missionaries had no connection at all with colonisation", "John Smith Moffat and Charles Helm were directly involved in treaties and concessions."],
      ["Missionaries opposed every European activity in the region at the time", "Many supported British rule, believing it would help their work."],
    ],
    answer: "A",
    hints: ["Avoid the options with absolute words."],
    explanation: "Missionaries were agents of colonisation in some ways, but the concession seekers backed by Rhodes and the British government were decisive.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Jesuit Zambezi Mission arrived in Lobengula's kingdom in 1879.",
    answer: true,
    explanation: "True. The Jesuits reached Bulawayo in 1879 and later opened Empandeni (1887).",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "All mission stations in Zimbabwe were founded after the Pioneer Column arrived in 1890.",
    answer: false,
    explanation: "False. Inyati (1859), Hope Fountain (1870) and the Jesuit mission (1879) came before 1890; many others followed after it.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each mission with the church that founded it.",
    pairs: [
      ["Inyati", "London Missionary Society"],
      ["Empandeni", "Jesuits (Catholic)"],
      ["Morgenster", "Dutch Reformed Church"],
      ["Solusi", "Seventh-day Adventists"],
    ],
    explanation: "Inyati and Hope Fountain (LMS); Empandeni (Jesuit); Morgenster (DRC); Solusi (Adventist).",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each agent of colonisation with how they prepared the way.",
    pairs: [
      ["Frederick Selous", "Hunter who later guided the Pioneer Column"],
      ["David Livingstone", "Explorer whose travels drew British attention to central Africa"],
      ["John Smith Moffat", "Missionary who negotiated a treaty with Lobengula"],
      ["Charles Rudd", "Concession seeker for Rhodes"],
    ],
    hints: ["One was a hunter, one an explorer, one a missionary and one a businessman's agent."],
    explanation: "Each type of agent contributed: hunters (routes), explorers (publicity), missionaries (trust and treaties), concession seekers (legal claims).",
  });
  {
    const t = timeline([
      ["1859", "The LMS opens Inyati"],
      ["1870", "The LMS opens Hope Fountain"],
      ["1879", "The Jesuit Zambezi Mission arrives"],
      ["1891", "The Dutch Reformed Church opens Morgenster"],
    ]);
    const order = [3, 1, 0, 2];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these mission foundations in chronological order.",
      pairs: order.map((i) => t.events[i][1]),
      right: POS,
      rightIndex: order,
      hints: ["The two LMS stations came first.", "One mission came after the occupation of Mashonaland."],
      explanation: "Inyati (1859), Hope Fountain (1870), the Jesuits (1879), Morgenster (1891).",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The LMS opened a second mission near Bulawayo at {{blank:a}}. The hunter who guided the Pioneer Column was {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Hope Fountain"], choices: ["Hope Fountain", "Morgenster", "Old Mutare", "Solusi"] },
      { id: "b", accepted: ["Selous"], choices: ["Selous", "Livingstone", "Mauch", "Helm"] },
    ],
    explanation: "Hope Fountain (LMS, 1870); Frederick Courteney Selous guided the Pioneer Column in 1890.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the Scottish missionary-explorer who saw the Victoria Falls in 1855.",
    accepted: ["David Livingstone", "Livingstone", "Dr Livingstone", "Dr David Livingstone"],
    wrong: ["Robert Moffat", "Selous"],
    explanation: "**David Livingstone** saw the falls in November 1855 and named them after Queen Victoria; his travels drew British attention to central Africa.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe **four** activities of missionaries in Zimbabwe.",
    points: [
      "Evangelism: preaching, building churches, translating the Bible and hymns",
      "Education: teaching reading, writing and arithmetic; schools",
      "Health: treating the sick, clinics and hospitals",
      "Agriculture and crafts / acting as interpreters and advisers to rulers",
    ],
    modelAnswer: "Missionaries preached and built churches, translating parts of the Bible and hymns into African languages. They opened schools that taught reading, writing and arithmetic. They treated the sick and later built clinics and hospitals. They introduced new crops, the plough and building skills, and acted as interpreters and advisers to rulers such as Lobengula.",
    explanation: "One mark per activity.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 5,
    stem: "Describe the challenges faced by early missionaries in Zimbabwe.",
    points: [
      "Few converts, especially among the Ndebele",
      "Control by the king, who limited their activities",
      "Disease such as malaria",
      "Language barriers and misunderstanding of African culture",
      "Distance and transport by ox-wagon / competition and lack of money / strength of African religion",
    ],
    hints: ["Think of political, health, cultural and practical problems."],
    modelAnswer: "Early missionaries made very few converts, especially in Matabeleland. The king controlled where they could work and what they could do. Malaria and other diseases killed missionaries and their families. They had to learn new languages and often misunderstood African customs. Supplies came by ox-wagon over long distances, money was short, and African religion remained strong.",
    explanation: "One mark per challenge.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain the impact of missionary activities on African societies in Zimbabwe.",
    points: [
      ["Positive: education and literacy (later nationalist leaders educated at mission schools); written African languages", 2],
      ["Positive: health care and new farming methods", 2],
      ["Negative: undermined African religion and customs, divided communities, and some missionaries helped colonisation (treaties, land from the Company)", 2],
    ],
    hints: ["Give both benefits and harm, each explained."],
    modelAnswer: "Missionaries spread literacy and education; many later nationalist leaders were educated in mission schools, and African languages were written down. They also brought medical care and new farming methods such as the plough. On the other hand, they condemned many African religious practices and customs, dividing communities between converts and others, and some missionaries helped colonisation, for example through the Moffat Treaty and the Rudd Concession, and missions received land from the Company.",
    explanation: "Balance positive and negative impacts with explanation.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      sources([
        source("Source A", "a letter from a fictional missionary at a station in Matabeleland to his society in London, 1885",
          "After many years we count only a handful of believers. The young men belong to the king's regiments and dare not be seen at our services. Only when the power of the regiments is broken will the gospel take root here."),
        source("Source B", "a speech by a fictional Ndebele induna to a missionary, as later recalled by the missionary's son",
          "You may teach our children letters, and your medicine is good. But do not ask our young men to leave the king's service, for the nation stands on them."),
      ]),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "According to Source A, why did the mission have few converts?", points: ["Young men belonged to the king's regiments", "They were afraid to be seen at services"] }),
      P.manual({ label: "(b)", marks: 4, stem: "What can be inferred from Source B about Ndebele attitudes to the missionaries?", points: [["They valued some things missionaries offered: education and medicine", 2], ["They resisted anything that weakened the king and regiments, which held the nation together", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How far do the sources suggest that missionaries welcomed the destruction of Ndebele power? Use your own knowledge.", type: "EXTENDED_RESPONSE", points: [["Source A suggests yes: the missionary hopes the regiments' power will be broken", 2], ["Source B shows Ndebele awareness of this threat but says nothing about missionaries' wishes; it is recalled second-hand", 2], ["Own knowledge and judgement: e.g. some missionaries (Helm, J. S. Moffat) helped treaties and concessions and many welcomed British rule, but not all; missions grew after 1893", 2]], levels: levels(6), modelAnswer: "Source A strongly suggests that this missionary wanted Ndebele power destroyed, since he writes that the gospel will take root only when the regiments' power is broken; he was writing privately to his society, so he had no reason to hide his view. Source B shows that the Ndebele understood the threat, but it does not tell us what missionaries wanted, and it was recalled second-hand by the missionary's son. Own knowledge supports Source A in part: John Smith Moffat negotiated the Moffat Treaty and Charles Helm interpreted the Rudd Concession, and missions grew quickly after the conquest of 1893. However, one letter cannot show that all missionaries welcomed conquest, so the sources suggest it was true of some missionaries rather than all." }),
    ],
    hints: ["Which source tells us about missionaries' wishes, and which about Ndebele attitudes?"],
    explanation: "Inference from both sources plus own knowledge: some missionaries hoped for the end of Ndebele power, and some helped bring it about.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer all parts about European agents of colonisation.",
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Identify **four** types of European agent of colonisation, giving an example of each.", points: ["Missionaries (e.g. Robert or John Smith Moffat, Charles Helm)", "Hunters (e.g. Selous)", "Explorers (e.g. Livingstone, Mauch)", "Concession seekers (e.g. Rudd, Maguire, Thompson) / traders"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Explain how hunters and explorers prepared the way for colonisation.", points: [["They mapped routes and reported on the land, wildlife and people (e.g. Selous later guided the Pioneer Column)", 2], ["Reports of gold (Mauch, 1867) and of fertile land drew settlers and investors; Livingstone's travels drew British attention", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "\"Concession seekers were the most important agents of colonisation in Zimbabwe.\" How far do you agree?", type: "EXTENDED_RESPONSE", points: [["For: the Rudd Concession (1888) gave Rhodes the legal claim he used to win the Royal Charter and occupy Mashonaland", 2], ["Against: missionaries had the king's trust and helped with treaties; hunters and explorers spread the gold myth and guided the column", 2], ["Supported judgement", 2]], levels: levels(6), modelAnswer: "Concession seekers were very important. Rudd, Maguire and Thompson obtained the Rudd Concession in 1888, which Rhodes used to obtain the Royal Charter in 1889 and send the Pioneer Column in 1890. However, they built on the work of others. Missionaries had gained the king's trust over decades, John Smith Moffat negotiated the Moffat Treaty and Charles Helm interpreted the concession. Explorers and hunters such as Mauch spread the idea of rich goldfields, and Selous guided the column. Concession seekers were the most important because they turned interest into a legal claim, but they depended on the earlier agents." }),
    ],
    hints: ["In (c), think about which agent turned interest into a legal claim."],
    explanation: "A strong answer weighs each type of agent and judges which was decisive.",
  });

  b.card("FACT", "When and where did the LMS open its first lasting mission in Zimbabwe?", "Inyati, 1859, with Mzilikazi's permission.");
  b.card("FACT", "When did the Jesuit Zambezi Mission arrive in Lobengula's kingdom?", "1879 (Empandeni opened in 1887).");
  b.card("FACT", "Which church founded Morgenster mission?", "The Dutch Reformed Church (1891).");
  b.card("DEFINITION", "What is an **agent of colonisation**?", "A person or group whose activities prepared the way for colonial rule (missionaries, hunters, traders, explorers, concession seekers).");
  b.card("CONCEPT", "Name four activities of missionaries.", "Evangelism, education, health care, agriculture and crafts (also interpreting for rulers).");
  b.card("CONCEPT", "Why did early missionaries make few converts among the Ndebele?", "Royal control, the regiment system, Ndebele religion, and the social cost of converting.");
  b.card("FACT", "What did Charles Helm do in 1888?", "Interpreted and witnessed the Rudd Concession for Lobengula.");
  b.card("FACT", "What did Karl Mauch report in 1867?", "Gold north of the Limpopo, leading to a gold rush to Tati.");
  b.card("FACT", "Who guided the Pioneer Column?", "The hunter Frederick Courteney Selous.");
  b.card("CONCEPT", "One positive and one negative impact of missionaries?", "Positive: education and health care. Negative: undermined African culture and some helped colonisation.");
});
