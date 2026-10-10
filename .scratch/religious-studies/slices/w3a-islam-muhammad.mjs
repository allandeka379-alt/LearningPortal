// W3a: Pre-Islamic Arabia and the life of the Prophet Muhammad.
import { concept, P, source, levels } from "../lib.mjs";

concept("frs.islam.muhammad", { file: "islam/muhammad", keyPrefix: "islam.muhammad" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which city was the Prophet Muhammad born, according to Muslim tradition?",
    options: [
      ["Makkah", "Correct: he was born in Makkah, about 570 CE."],
      ["Madinah", "Madinah is where the Muslims migrated in 622 CE and where he died."],
      ["Jerusalem", "Jerusalem is not the Prophet's birthplace."],
      ["Cairo", "Cairo was not part of the story of his early life."],
    ],
    answer: "A",
    explanation: "The Prophet Muhammad was born in **Makkah** about 570 CE.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What name is given to the migration of the Prophet and his followers from Makkah to Madinah in 622 CE?",
    options: [
      ["The Hijrah", "Correct: the migration that begins the Islamic calendar."],
      ["The Hajj", "The Hajj is the pilgrimage to Makkah."],
      ["The Mi'raj", "The Mi'raj is the Night Journey ascension in Muslim tradition."],
      ["The Zakat", "Zakat is obligatory giving, one of the Five Pillars."],
    ],
    answer: "A",
    explanation: "The **Hijrah** (622 CE) is the migration to Madinah and marks year 1 of the Islamic calendar.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Who was the first person to accept the Prophet's message, according to Muslim tradition?",
    options: [
      ["Khadijah, his wife", "Correct: she believed him after the experience at Hira."],
      ["Abu Bakr, his friend", "Abu Bakr was among the first men to accept Islam."],
      ["Bilal, who became muezzin", "Bilal was an early Muslim, tortured for his faith."],
      ["Umar, a later caliph", "Umar accepted Islam some years later."],
    ],
    answer: "A",
    explanation: "Muslims honour **Khadijah** as the first person to accept Islam; she comforted the Prophet after the first revelation.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why do Muslims count the years of their calendar from the Hijrah?",
    options: [
      ["It marked the start of a free Muslim community", "Correct: in Madinah Muslims could live openly under their own agreements."],
      ["It was the year the Prophet was born in Makkah", "His birth is not the starting point of the calendar."],
      ["It was the year in which the first revelation came to him", "The first revelation was about 610 CE, years earlier."],
      ["It was the year in which the Ka'bah was first built", "Muslims place the building of the Ka'bah much earlier, with Ibrahim."],
    ],
    answer: "A",
    explanation: "The calendar begins with the **Hijrah** because it marked the start of the Muslim community in Madinah, not because of his birth or the first revelation.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which title, meaning \"the trustworthy\", was given to Muhammad before his mission?",
    options: [
      ["Al-Amin", "Correct: he was known for honesty."],
      ["Al-Fatihah", "Al-Fatihah is the opening surah of the Qur'an."],
      ["Al-Qadr", "Al-Qadr refers to divine decree or the Night of Power."],
      ["Al-Adha", "Al-Adha is part of the name of the festival Eid al-Adha."],
    ],
    answer: "A",
    explanation: "**Al-Amin** means \"the trustworthy\" and refers to his honesty in trade.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Chipo is told that Bilal was an enslaved man who was tortured for becoming a Muslim and later became the first muezzin. What does this show about early Islam?",
    options: [
      ["It taught that rich and poor, free and enslaved are equal before God", "Correct: Bilal was honoured by the community."],
      ["It allowed only the leading men of the Quraysh to become Muslims", "Early Muslims included poor, enslaved and women members."],
      ["It avoided any conflict with the leaders of Makkah in its early years", "The early Muslims were opposed and persecuted."],
      ["It forbade the free and the enslaved to pray together in the same row", "Muslims pray side by side, regardless of status."],
    ],
    answer: "A",
    hints: ["Think of why Quraysh leaders disliked the message and who joined first."],
    explanation: "Bilal's story shows the teaching of **equality before God**, which attracted the poor and angered some of the powerful.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which statement about the community in Madinah is supported by Muslim tradition?",
    options: [
      ["The Prophet built a mosque there and arranged an agreement with other groups", "Correct: the mosque and the agreement were central."],
      ["The Muslims in Madinah were at peace and faced no conflict with Makkah", "Battles such as Badr and Uhud were fought."],
      ["The Muslims left Madinah in the same year and returned to Makkah", "They stayed in Madinah for about eight years."],
      ["The Prophet appointed no mosque or place of prayer for the Muslims there", "A mosque was one of his first acts."],
    ],
    answer: "A",
    hints: ["Recall the first buildings and agreements made after the Hijrah."],
    explanation: "In Madinah the Prophet built a **mosque** and arranged an **agreement** between Muslims, Jews and others, while conflict with Makkah continued for years.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which reason, according to Muslim tradition, best explains why some Quraysh leaders opposed the Prophet's message?",
    options: [
      ["It rejected the tribal gods and challenged their trade, status and authority", "Correct: the shrine brought pilgrims and income."],
      ["It asked the Quraysh to leave Makkah and give up all trade for ever", "The Prophet did not ask them to give up trade."],
      ["It taught that only the Quraysh could become members of the community", "The message was open to everyone."],
      ["It replaced the Ka'bah with a new shrine built in the town of Madinah", "The Ka'bah remained the centre of Muslim worship."],
    ],
    answer: "A",
    hints: ["Think about what the shrine and the tribal gods gave to the leaders."],
    explanation: "The message of **Tawhid** and equality challenged the gods whose shrine brought pilgrims and wealth, and the authority of the clan leaders.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Muslims believe that the first revelation came to the Prophet Muhammad in the cave of Hira.",
    answer: true,
    explanation: "True. About 610 CE the angel Jibril brought the first revelation in the cave of Hira, remembered on Laylat al-Qadr.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Muslims believe that the Prophet Muhammad was God.",
    answer: false,
    explanation: "False. Muslims believe the Prophet Muhammad was God's last messenger, a human being who is respected but not worshipped.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with their role in the story of the Prophet.",
    pairs: [["Khadijah", "the Prophet's wife and first Muslim"], ["Jibril", "the angel who brought the revelation"], ["Abu Bakr", "the friend who accompanied him on the Hijrah"], ["Bilal", "the first muezzin, once enslaved"]],
    explanation: "Khadijah: first to accept Islam. Jibril: angel of revelation. Abu Bakr: companion on the Hijrah. Bilal: first muezzin.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Hijrah took place in {{blank:a}} CE, and the Prophet returned to Makkah in {{blank:b}} CE.",
    blanks: [
      { id: "a", accepted: ["622"], choices: ["570", "610", "622", "632"] },
      { id: "b", accepted: ["630"], choices: ["624", "630", "632", "661"] },
    ],
    explanation: "The Hijrah was in **622 CE**; the return to Makkah was in **630 CE**; the Prophet died in 632 CE.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What is the name of the shrine in Makkah that Muslims believe was built by Ibrahim and his son Ismail?",
    accepted: ["Ka'bah", "Kaaba", "Ka'ba", "Kabah", "The Ka'bah", "The Kaaba"],
    wrong: ["Hira", "Madinah"],
    explanation: "The **Ka'bah** is the cube-shaped shrine in Makkah towards which Muslims face in prayer.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "Identify **three** features of Arabian society before Islam.",
    points: ["Society was organised by tribes, with loyalty to the tribe first", "Many people worshipped tribal gods and images around the Ka'bah", "Makkah was a trading town, and the poor and enslaved had few protections (or newborn girls were sometimes killed)"],
    modelAnswer: "Society was organised by tribes. Many Arabs worshipped tribal gods and images around the Ka'bah. Makkah was a trading town where the poor and enslaved had few protections.",
    explanation: "One mark for each feature.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe what Muslims believe happened to the Prophet in the cave of Hira.",
    points: [["He was spending time alone in thought about 610 CE", 1], ["The angel Jibril appeared to him", 1], ["He was told to recite, and this was the first revelation", 1], ["He was afraid, went home to Khadijah, and she comforted and believed him", 1]],
    modelAnswer: "About 610 CE the Prophet was alone in the cave of Hira. The angel Jibril appeared and told him to recite, which Muslims believe was the first revelation of the Qur'an. He was afraid and went home to Khadijah, who comforted him and believed him.",
    hints: ["Say where, who appeared, what was said and what he did next."],
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain **two** reasons why the Hijrah is important to Muslims.",
    points: [
      ["It saved the Muslims from persecution in Makkah", 1],
      ["Developed: in Madinah they could worship openly and build a community with a mosque and agreements", 2],
      ["It began the Islamic calendar", 1],
      ["Developed: Muslims count their years from 622 CE, so every date reminds them of the birth of the community", 2],
    ],
    modelAnswer: "The Hijrah saved the Muslims from persecution in Makkah, and in Madinah they could worship openly and build a community with a mosque and agreements with other groups. It also began the Islamic calendar, so Muslims count their years from 622 CE, which reminds them every day of the birth of their community.",
    hints: ["Choose two reasons and develop each in a full sentence."],
    explanation: "Two reasons, each stated (1) and developed (2).",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "a conversation between two fictional students in a school in Mutare, 2026",
      "Tendai: My Muslim friend Yusuf says his calendar is in year 1448, not 2026. How can that be?\nYusuf: Muslims begin counting from 622 CE, when the Prophet and his companions moved from Makkah to Madinah. That journey is the Hijrah.\nTendai: Did the Prophet go alone?\nYusuf: No. Abu Bakr travelled with him, and the other Muslims followed in groups."
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "According to Source A, from which event do Muslims count their years?",
        options: [
          ["The Hijrah", "Correct: Yusuf says the count begins with the move to Madinah."],
          ["The first Hajj", "The source does not mention the Hajj."],
          ["The birth of the Prophet", "Yusuf does not say this."],
          ["The return to Makkah", "That was in 630 CE, not the starting point."],
        ],
        answer: "A", explanation: "Yusuf says the count begins with the move from Makkah to Madinah, the Hijrah.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Using Source A and your own knowledge, state **three** facts about the Hijrah.",
        points: ["It was the move from Makkah to Madinah", "It took place in 622 CE", "Abu Bakr travelled with the Prophet and the other Muslims followed in groups"],
        modelAnswer: "The Hijrah was the move from Makkah to Madinah in 622 CE. Abu Bakr travelled with the Prophet, and the other Muslims followed in groups.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain why the Muslims left Makkah for Madinah.",
        points: [["They were persecuted by Quraysh leaders who opposed the message", 1], ["The people of Madinah invited the Prophet to settle their disputes and welcomed the Muslims", 1], ["They could worship freely and build a community", 1]],
        modelAnswer: "The Muslims were persecuted by Quraysh leaders who opposed the message. The people of Madinah invited the Prophet to help settle their disputes and welcomed the Muslims, so they could worship freely and build a community.",
      }),
    ],
    hints: ["In (c) give the push from Makkah and the pull of Madinah."],
    explanation: "The source gives the date and the companion; your own knowledge adds the reasons.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1200,
    stem: "Nokuthula says: \"The Hijrah was the most important event in the life of the Prophet.\" Her classmate Aisha, who is Muslim, says: \"The first revelation was more important, because without it there would be no Islam.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Outline **two** events that took place in Madinah after the Hijrah.",
        points: [["A mosque was built for the community", 1], ["An agreement was made between Muslims, Jewish tribes and others", 1], ["Battles such as Badr (624 CE) and Uhud (625 CE) were fought with Makkah", 1], ["The treaty of Hudaybiyyah was made in 628 CE", 1]],
        modelAnswer: "A mosque was built for the community, and an agreement was made between Muslims, Jewish tribes and others. Later there were battles with Makkah such as Badr and Uhud, and a treaty was signed at Hudaybiyyah in 628 CE.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain why the Prophet is called al-Amin.",
        points: [["He was known in Makkah as a trader of great honesty", 2], ["People trusted him with their goods and with settling disputes, so the title meant \"the trustworthy\"", 2]],
        modelAnswer: "Al-Amin means \"the trustworthy\". The Prophet was known in Makkah as a trader of great honesty, and people trusted him with their goods and to settle disputes.",
      }),
      P.manual({
        label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 280 },
        stem: "Assess the view that the Hijrah was more important than the first revelation in the story of Islam.",
        points: [["For the first revelation: it began the Qur'an and the mission, and everything else follows from it", 2], ["For the Hijrah: it saved the community, created a state with a mosque and laws, and began the calendar", 2], ["Link: the revelation gave the message, and the Hijrah gave the community the freedom to live by it", 2], ["A supported judgement", 2]],
        levels: levels(8),
        modelAnswer: "The first revelation was the beginning of the mission, since it began the Qur'an and without it nothing else would follow. On the other hand, the Hijrah saved a persecuted community, created a society in Madinah with a mosque and agreements, and began the Islamic calendar. The two events are linked, for the revelation gave the message and the Hijrah gave the Muslims the freedom to live by it. I conclude that the revelation came first and is the foundation, but the Hijrah turned a small group into a community.",
      }),
    ],
    hints: ["Weigh the two events, then show how one depends on the other."],
    explanation: "A strong answer balances both views and notes that the events are connected.",
  });

  b.card("DEFINITION", "What was the **Jahiliyyah**?", "The Muslim term for the period in Arabia before Islam, \"the time of ignorance\" of God's guidance.");
  b.card("DEFINITION", "What is the **Hijrah**?", "The migration of the Prophet and his followers from Makkah to Madinah in 622 CE; it begins the Islamic calendar.");
  b.card("FACT", "When and where was the Prophet Muhammad born?", "About 570 CE in Makkah.");
  b.card("FACT", "Who was Khadijah?", "The Prophet's first wife, a businesswoman, and the first person to accept Islam.");
  b.card("FACT", "Where did the first revelation come, and through whom?", "In the cave of Hira, about 610 CE, through the angel Jibril.", "Remembered on Laylat al-Qadr.");
  b.card("FACT", "What does **al-Amin** mean?", "The trustworthy: the title the Prophet was given for his honesty.");
  b.card("FACT", "Who was Bilal?", "An enslaved man who became an early Muslim, was tortured for his faith and became the first muezzin.");
  b.card("FACT", "In which year did the Prophet return to Makkah?", "630 CE; he died in 632 CE.");
  b.card("CONCEPT", "Why did some Quraysh leaders oppose the Prophet?", "The message challenged the tribal gods whose shrine brought trade and pilgrims, and it taught that all people are equal before God.");
});
