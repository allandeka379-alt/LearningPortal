// W1b: ahist.contact.missionaries-hunters-traders (ZIMSEC topic 3).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.contact.missionaries-hunters-traders", { file: "contact/missionaries-hunters-traders", keyPrefix: "contact.missionaries-hunters-traders" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which mission society opened the station at Inyati in 1859?",
    options: [
      ["The London Missionary Society", "Correct: the LMS settled at Inyati with the permission of Mzilikazi."],
      ["The Society of Jesus", "The Jesuits first came to Bulawayo in 1879."],
      ["The British South Africa Company", "This was a chartered company, not a mission society."],
      ["The Church Missionary Society of West Africa", "This society worked in West Africa, not at Inyati."],
    ],
    answer: "A",
    explanation: "The LMS opened Inyati in 1859 and Hope Fountain in 1870. The Jesuits came in 1879.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why did few Ndebele become Christians in the nineteenth century?",
    options: [
      ["The king saw no reason to abandon the beliefs on which the state rested", "Correct: Christianity did not suit the Ndebele system."],
      ["Missionaries were forbidden by law to preach anywhere in Matabeleland", "They were allowed to settle, although they won few converts."],
      ["There were no missionaries in Matabeleland until after the colonial occupation", "Missionaries settled at Inyati in 1859."],
      ["The Ndebele had already become Christians through earlier teaching in the south", "They had not."],
    ],
    answer: "A",
    explanation: "Missionaries lived on the king's sufferance, and the Ndebele state had its own religion and military system. The missionaries' importance lay elsewhere.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which German geologist reported on Great Zimbabwe in 1871?",
    options: [
      ["Karl Mauch", "Correct: he visited the ruins in 1871."],
      ["Frederick Selous", "Selous was a British hunter who came in 1871."],
      ["Robert Moffat", "Moffat was a missionary of the LMS."],
      ["Cecil John Rhodes", "Rhodes was a businessman and politician."],
    ],
    answer: "A",
    explanation: "Mauch was the German geologist who visited Great Zimbabwe in 1871 and wrongly linked it to a Near Eastern people.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "How did Lobengula usually deal with white hunters and traders who entered his land?",
    options: [
      ["He allowed them in only with his permission and made them pay for it", "Correct: the king controlled access and charged for it."],
      ["He drove all of them out of the country", "He let many in, because he valued the goods they brought."],
      ["He gave them the right to rule his people", "He kept political authority."],
      ["He refused to meet any visitor or trader at his court in Bulawayo", "He met them regularly."],
    ],
    answer: "A",
    hints: ["Think of a king who wanted guns and goods but did not want to lose control."],
    explanation: "Lobengula wanted guns, cloth and goods, so he admitted visitors on his terms, charged them for hunting and trading rights, and tried to play them against each other.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which statement best describes the effect of the missionaries on Ndebele independence?",
    options: [
      ["Some acted as interpreters and advisers whose actions helped British interests", "Correct: for example Helm and Moffat in 1888."],
      ["They had no contact with Lobengula or his advisers", "They lived at his court and translated for him."],
      ["They organised an Ndebele army to resist the settlers", "They did not do so."],
      ["They persuaded most of the Ndebele people to become Christian", "They won few converts."],
    ],
    answer: "A",
    hints: ["Think about who interpreted at the Rudd Concession."],
    explanation: "Missionaries such as Charles Helm and John Smith Moffat were interpreters and advisers. Whatever they intended, they helped British interests in 1888.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which was the main reason for the arrival of concession seekers at Lobengula's court in the 1880s?",
    options: [
      ["The belief that the land north of the Limpopo held great mineral wealth after the gold finds of 1886", "Correct: gold fever drove the rush."],
      ["The wish to buy cattle from the Ndebele in very large numbers for sale at the Cape", "Cattle were not the reason."],
      ["The spread of a new religion among the regiments of the king", "Concession seekers were not missionaries."],
      ["A British government order to appoint a resident ambassador to the king", "No such order existed."],
    ],
    answer: "A",
    hints: ["What was discovered in the Transvaal in 1886?"],
    explanation: "Gold on the Witwatersrand in 1886 raised hopes of a second field in Matabeleland and Mashonaland.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which view of the missionaries before 1890 is best supported by the evidence in this lesson?",
    options: [
      ["They won few converts, but their services as interpreters later mattered", "Correct: few converts, but interpreting and reporting had a political effect."],
      ["They were the only Europeans who brought any benefit to the Ndebele state", "Other Europeans also brought goods."],
      ["They were the direct and sole cause of the war of 1893 against the Ndebele", "The war had other causes."],
      ["They were hostile to every European government and refused to deal with any", "They worked with the Cape and Britain."],
    ],
    answer: "A",
    hints: ["Compare the number of converts with the political use of their services."],
    explanation: "Their religious success was slight. Their schools, languages and political services (interpreting and advising) were what had lasting effects.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which pair of effects of European hunters and traders on the Ndebele state is best supported?",
    options: [
      ["Guns and goods entered, elephant herds fell and the king relied on imports", "Correct: both economic and environmental effects."],
      ["The state grew richer and no longer needed to trade with anyone", "It became more dependent."],
      ["The Shona conquered the Ndebele with the help of the traders", "The Shona did not do so."],
      ["The state abolished its regiments and adopted a European-style army", "The regiments remained."],
    ],
    answer: "A",
    hints: ["What did the hunters take, and what did they bring?"],
    explanation: "Hunters and traders brought guns and cloth, took ivory, thinned the herds and made the king depend on supplies.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Jesuits reached Lobengula's court in 1879.",
    answer: true,
    explanation: "True. A party led by Father Henri Depelchin arrived in 1879.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Karl Mauch correctly explained that Great Zimbabwe was built by the ancestors of the Shona.",
    answer: false,
    explanation: "False. Mauch wrongly suggested a Near Eastern origin, perhaps the Queen of Sheba. Archaeology shows that Great Zimbabwe was built by the ancestors of the Shona.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "A concession was a grant of rights in the ruler's land, so concession seekers came to trade with the Ndebele on equal terms.",
    answer: false,
    hints: ["Think about what concession seekers later claimed in the ruler's name."],
    explanation: "False. A concession is a grant of rights, but concession seekers sought legal papers that would let them claim rights, and their position was not equal.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with his role.",
    pairs: [
      ["Robert Moffat", "A missionary of Kuruman and friend of Mzilikazi"],
      ["Karl Mauch", "A German geologist who visited Great Zimbabwe in 1871"],
      ["Frederick Selous", "A hunter who worked in Matabeleland and later guided the Pioneer Column"],
      ["Henri Depelchin", "The leader of the first Jesuit party at Bulawayo in 1879"],
    ],
    explanation: "These four names recur in questions on the nineteenth-century visitors.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each group with its main aim.",
    pairs: [
      ["Missionaries", "To spread Christianity and teach reading"],
      ["Hunters", "To obtain ivory and hides"],
      ["Traders", "To exchange goods such as cloth and guns for ivory and cattle products"],
      ["Concession seekers", "To obtain written rights to minerals and land"],
    ],
    hints: ["Think of what each group wanted from the king."],
    explanation: "The groups had different aims, although all depended on the king's permission.",
  });
  {
    const events = [
      "The LMS opens a mission at Inyati",
      "Mauch visits Great Zimbabwe",
      "The first Jesuits reach Bulawayo",
      "Gold is found on the Witwatersrand",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["The dates are 1859, 1871, 1879 and 1886."],
      explanation: "Inyati 1859; Mauch 1871; the Jesuits 1879; Witwatersrand gold 1886.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The London Missionary Society opened its first station in Matabeleland at {{blank:a}} in {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Inyati"], choices: ["Inyati", "Empandeni", "Tati", "Kuruman"] },
      { id: "b", accepted: ["1859"], choices: ["1829", "1859", "1879", "1888"] },
    ],
    explanation: "Inyati was opened in 1859 with Mzilikazi's permission. Empandeni was a Jesuit station of 1887.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which missionary of Kuruman first visited Mzilikazi in 1829 and remained his friend? Give his surname.",
    accepted: ["Moffat", "Robert Moffat"],
    wrong: ["Helm"],
    explanation: "**Robert Moffat**, of Kuruman, first met Mzilikazi in 1829.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the activities of the missionaries in Matabeleland before 1890.",
    points: ["Settled at Inyati (1859) and Hope Fountain (1870) with the king's permission", "Ran small schools and preached", "Wrote down Ndebele and Shona and produced the first books", "Interpreted and wrote letters for Lobengula"],
    modelAnswer: "The LMS settled at Inyati in 1859 and Hope Fountain in 1870 with the king's permission. They preached and ran small schools, wrote down Ndebele and Shona and produced the first books, and acted as interpreters and letter writers for Lobengula.",
    explanation: "One mark for each activity described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the Ndebele king allowed hunters and traders into his land.",
    points: [["He wanted guns, cloth and other goods that the traders brought", 2], ["He could control entry and charge for hunting, so he gained revenue and kept a hold over the visitors", 2]],
    hints: ["Think of what the king gained and how he kept control."],
    modelAnswer: "Lobengula wanted guns, cloth and other goods that the traders brought, and he used them to reward his regiments. By controlling entry and charging for hunting, he also gained revenue and kept the visitors under his authority.",
    explanation: "One mark for each reason and one for the development.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how the reports of Karl Mauch and other explorers helped to encourage European interest in the plateau.",
    points: [["They described ruins, gold and good land in the interior", 2], ["Their reports were published in Britain and South Africa and read by investors and officials, raising interest in the region", 2]],
    hints: ["Who read the reports?"],
    modelAnswer: "Explorers described ruins, gold and good land in the interior. Their reports were published and read by investors and officials in Britain and South Africa, who began to see the region as a place for mining and settlement.",
    explanation: "Credit reasons with development.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a letter from a fictional missionary at Inyati to his mission society, 1870s",
        "We are treated with courtesy by the king, but I cannot say that we have made any converts. The people listen politely and then return to their ways. I have been asked to write his letters, and I fear that the king may think we are his servants."),
      "",
      source("Source B", "a diary entry of a fictional European hunter, 1870s",
        "The king has given me leave to hunt in the country east of Bulawayo, and I paid him in cloth and powder. He sets rules, and I would be a fool to break them. He asked me many questions about the whites in the south."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A show about the success of the missionaries?", points: ["They had made no converts", "The people listened politely but kept their own ways"] }),
      P.manual({ label: "(b)", marks: 4, stem: "How far do Sources A and B show that the king controlled the visitors?", points: [["B shows he gave leave to hunt, charged payment and set rules", 2], ["A shows courtesy but also that the missionaries were used to write his letters; both agree he was in a position of authority", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources as evidence of the relationship between the Ndebele king and European visitors?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["Both are contemporary and from people who dealt with the king, and they agree he set the terms", 2], ["Each is limited: a letter to a mission society may stress failure, and a hunter's diary shows only one visit", 2], ["Own knowledge: Lobengula charged for hunting, missionaries acted as interpreters and the later concession seekers changed the balance", 2]], modelAnswer: "The sources are useful because both were written at the time by people who dealt with the king, and they agree that he set the terms. Source A shows that the missionaries made no converts and were used as letter writers; Source B shows hunters paying for leave and obeying rules. But each is limited: a letter to a mission society may stress failure, and a diary describes only one hunter's experience. My own knowledge supports them, since Lobengula charged for hunting and missionaries acted as interpreters. They do not show how the balance changed in the 1880s, when concession seekers arrived." }),
    ],
    hints: ["For (c), consider who wrote each source and what it leaves out."],
    explanation: "Both sources are invented: a missionary's letter and a hunter's diary.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the impact of European visitors on the Ndebele before 1888.",
    levels: levels(8),
    points: [
      ["Economic: guns, cloth and wagons entered; elephants reduced; the king depended on imports", 2],
      ["Political: visitors reported on the country, missionaries interpreted and advised, concession seekers sought rights", 2],
      ["Limits: few converts, and the Ndebele state kept its army, laws and king", 2],
      ["Judgement on the overall impact", 2],
    ],
    hints: ["Separate economic, political and social effects, and weigh them."],
    modelAnswer: "The impact was greater on the economy and on politics than on society. Guns, cloth and wagons entered and elephant herds fell, so the king came to depend on imports. Visitors reported on the country, missionaries interpreted and advised, and concession seekers sought rights that threatened independence. But there were few converts, and the state kept its army, laws and king until 1893. I conclude that the visitors did not change daily life much, but they prepared the way for colonisation.",
    explanation: "Credit explained effects and a supported judgement.",
  });

  b.card("DEFINITION", "What was a concession?", "A written grant from an African ruler giving a European rights to prospect, mine, trade or build in his land.");
  b.card("FACT", "When did the LMS open the mission at Inyati?", "1859, with the permission of Mzilikazi.");
  b.card("FACT", "When did the first Jesuits reach Lobengula's court?", "1879 (a party led by Father Henri Depelchin).");
  b.card("FACT", "Who reported on Great Zimbabwe in 1871?", "Karl Mauch, a German geologist, who wrongly linked it to a Near Eastern people.");
  b.card("FACT", "Who built Great Zimbabwe?", "The ancestors of the Shona, as archaeology shows.");
  b.card("FACT", "Which hunter later guided the Pioneer Column?", "Frederick Selous.");
  b.card("CONCEPT", "Why did the missionaries win few converts among the Ndebele?", "The king and regiments saw no need to give up their beliefs and way of life; the missionaries lived on the king's sufferance.");
  b.card("CONCEPT", "How did hunters and traders affect the Ndebele state?", "They brought guns and goods, reduced the elephant herds and made the king dependent on imports.");
  b.card("CONCEPT", "Why did concession seekers flock to Lobengula in the 1880s?", "Gold on the Witwatersrand in 1886 made the land north of the Limpopo seem rich in minerals.");
});
