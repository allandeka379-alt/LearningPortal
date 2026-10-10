// W3a: The Five Pillars, Zakat, Sawm and Hajj.
import { concept, P, source, levels } from "../lib.mjs";

// Zakat worked answers computed here, not by hand.
const RATE = 0.025;
const SAVINGS = 3000;
const ZAKAT = SAVINGS * RATE; // 75
const SAVINGS2 = 1600;
const ZAKAT2 = SAVINGS2 * RATE; // 40

concept("frs.islam.pillars-zakat-sawm-hajj", { file: "islam/pillars-zakat-sawm-hajj", keyPrefix: "islam.pillars-zakat-sawm-hajj" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which month of the Islamic calendar do Muslims fast?",
    options: [
      ["Ramadan", "Correct: the ninth month."],
      ["Dhul-Hijjah", "Dhul-Hijjah is the month of the Hajj."],
      ["Muharram", "Muharram is the first month, the Islamic New Year."],
      ["Shawwal", "Shawwal follows Ramadan and begins with Eid al-Fitr."],
    ],
    answer: "A",
    explanation: "Muslims fast in **Ramadan**, the ninth month of the Islamic calendar.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the name of the pilgrimage to Makkah?",
    options: [
      ["Hajj", "Correct: the fifth Pillar."],
      ["Zakat", "Zakat is obligatory giving."],
      ["Wudu", "Wudu is washing before prayer."],
      ["Iftar", "Iftar is the meal that breaks the fast."],
    ],
    answer: "A",
    explanation: "The **Hajj** is the pilgrimage to Makkah, the fifth Pillar.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is **sadaqah**?",
    options: [
      ["Voluntary charity given at any time", "Correct: unlike Zakat, it is not at a fixed rate."],
      ["Obligatory giving at a rate of 2.5 per cent", "That is Zakat."],
      ["The meal eaten before dawn in Ramadan", "That is suhoor."],
      ["The lesser pilgrimage made at any time of year", "That is Umrah."],
    ],
    answer: "A",
    explanation: "**Sadaqah** is voluntary charity; **Zakat** is obligatory.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of the following is exempt from fasting in Ramadan?",
    options: [
      ["A person who is seriously ill", "Correct: the sick are exempt and may make up the days or feed a poor person."],
      ["A student who has an examination", "An examination does not exempt a student."],
      ["A shopkeeper who is very busy", "Work does not exempt a person."],
      ["A healthy adult who dislikes fasting", "A preference is not a reason for exemption."],
    ],
    answer: "A",
    explanation: "The **sick**, travellers, young children, and pregnant, nursing or elderly people who cannot fast are exempt.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which rite of the Hajj involves walking seven times around the Ka'bah?",
    options: [
      ["Tawaf", "Correct: seven circuits of the Ka'bah."],
      ["Sa'i", "Sa'i is walking between Safa and Marwa."],
      ["Ihram", "Ihram is the state of purity and the dress of pilgrims."],
      ["Zamzam", "Zamzam is the well whose water pilgrims drink."],
    ],
    answer: "A",
    explanation: "**Tawaf** is seven circuits of the Ka'bah. **Sa'i** is seven journeys between Safa and Marwa.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Mthulisi has savings of US\\$4,000 that he has held for a full lunar year, and this is above the minimum level. According to the usual rate, how much Zakat does he pay?",
    options: [
      [`US\\$${(4000 * RATE).toLocaleString("en-US")}`, "Correct: 2.5 per cent of 4,000."],
      [`US\\$${(4000 * 0.25).toLocaleString("en-US")}`, "This takes 25 per cent instead of 2.5 per cent."],
      [`US\\$${(4000 * 0.1).toLocaleString("en-US")}`, "This takes ten per cent, as in a tithe."],
      [`US\\$${(4000 * 0.0025).toLocaleString("en-US")}`, "This takes 0.25 per cent, which is one tenth of the usual rate."],
    ],
    answer: "A",
    hints: ["Zakat is usually 2.5 per cent; multiply 4,000 by 0.025."],
    explanation: `Zakat is usually **2.5%** of qualifying savings: 4,000 x 0.025 = US\\$${4000 * RATE}.`,
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why do pilgrims on the Hajj wear simple white clothes in the state of ihram?",
    options: [
      ["It shows that rich and poor are equal before God", "Correct: all look alike."],
      ["It shows that pilgrims belong to the same nation", "Pilgrims come from every nation."],
      ["It is the uniform of the officials who guide the pilgrims", "It is the dress of the pilgrims themselves."],
      ["It protects them from the heat of the day and the cold of night", "The reason given is equality and purity, not climate."],
    ],
    answer: "A",
    hints: ["Think of what the clothing removes."],
    explanation: "Simple dress in **ihram** shows that status and wealth do not matter before God.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement best explains how Zakat and Sawm are linked?",
    options: [
      ["Both teach sympathy for the poor and the habit of sharing", "Correct: fasting brings hunger and Zakat brings giving."],
      ["Both are done only in the month of Dhul-Hijjah", "Fasting is in Ramadan."],
      ["Both are a duty only for people who live in Makkah", "They apply to Muslims everywhere."],
      ["Both are voluntary acts that Muslims may skip without penalty", "Both are Pillars."],
    ],
    answer: "A",
    hints: ["Recall what a person feels when fasting, and who benefits from Zakat."],
    explanation: "**Sawm** lets a Muslim feel hunger and **Zakat** shares wealth with those who go without, so both build care for the poor.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Muslims break their fast at sunset with a meal called iftar.",
    answer: true,
    explanation: "True. Many Muslims begin iftar with dates and water.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Every Muslim must make the Hajj every year.",
    answer: false,
    explanation: "False. The Hajj is required once in a lifetime for those who are physically and financially able.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each Hajj rite with what pilgrims do.",
    pairs: [["Tawaf", "walk seven times around the Ka'bah"], ["Sa'i", "walk seven times between Safa and Marwa"], ["Arafat", "stand in prayer on the plain from noon to sunset"], ["Mina", "throw pebbles at the pillars"]],
    explanation: "Tawaf: around the Ka'bah. Sa'i: Safa and Marwa. Arafat: standing in prayer. Mina: throwing pebbles.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Zakat is usually {{blank:a}} per cent of qualifying savings held for a lunar year, and Muslims fast during the month of {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["2.5"], choices: ["1", "2.5", "10", "25"] },
      { id: "b", accepted: ["Ramadan"], choices: ["Muharram", "Ramadan", "Shawwal", "Dhul-Hijjah"] },
    ],
    explanation: "Zakat is usually **2.5** per cent; fasting is in **Ramadan**.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What is the name of the Night of Power, which falls in the last ten nights of Ramadan?",
    accepted: ["Laylat al-Qadr", "Laylatul Qadr", "Lailat ul Qadr", "Laylat al Qadr", "Night of Power", "Lailatul Qadr"],
    wrong: ["Eid al-Fitr", "Ashura"],
    explanation: "**Laylat al-Qadr** is the Night of Power, remembered as the night of the first revelation.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "Identify **three** groups of people who may receive Zakat.",
    points: ["The poor", "The needy or those in debt", "Travellers in need (or those freeing people from bondage, or those serving God's cause)"],
    modelAnswer: "Zakat may be given to the poor, to the needy or those in debt, and to travellers in need.",
    explanation: "One mark for each group named in Qur'an 9:60.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe what Muslims do during the month of Ramadan.",
    points: [["Adults who are able fast from dawn to sunset, without food or drink", 1], ["They eat suhoor before dawn and break the fast with iftar at sunset", 1], ["They pray extra night prayers (taraweeh) and read the Qur'an", 1], ["They give to the poor and look for Laylat al-Qadr in the last ten nights", 1]],
    modelAnswer: "Adult Muslims who are able fast from dawn to sunset, without food or drink. They eat suhoor before dawn and break the fast with iftar at sunset. They pray extra night prayers and read the Qur'an, and they give to the poor and look for Laylat al-Qadr in the last ten nights.",
    hints: ["Cover the fast, the meals, extra worship and giving."],
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain **two** reasons why the Hajj is important to Muslims.",
    points: [
      ["It is a Pillar and a command of God for those who are able", 1],
      ["Developed: Muslims believe that completing it is an act of obedience and a chance to be forgiven", 2],
      ["It shows the unity and equality of Muslims", 1],
      ["Developed: pilgrims from every nation wear the same dress and perform the same rites together", 2],
    ],
    modelAnswer: "The Hajj is a Pillar and a command of God for those who are able, so completing it is an act of obedience and a chance to be forgiven. It also shows the unity and equality of Muslims, since pilgrims from every nation wear the same dress and perform the same rites together.",
    hints: ["Give one reason about obedience and one about unity."],
    explanation: "Two reasons, each stated (1) and developed (2).",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: `Farai has held savings of US\\$${SAVINGS2.toLocaleString("en-US")} for a lunar year. Calculate his Zakat at the usual rate and name **one** group who could receive it.`,
    points: [["Uses the rate of 2.5 per cent", 1], [`Calculates US\\$${ZAKAT2} (${SAVINGS2} x 0.025)`, 1], ["Names a recipient such as the poor, the needy, a person in debt or a traveller in need", 1]],
    modelAnswer: `At 2.5 per cent, Farai pays ${SAVINGS2} x 0.025 = US\\$${ZAKAT2}. It could be given to a poor family.`,
    hints: ["Multiply the savings by 0.025."],
    explanation: `2.5% of ${SAVINGS2} is US\\$${ZAKAT2}.`,
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "a notice (described in words) from a fictional mosque in Kariba, 2026",
      "The notice says that during Ramadan the mosque will provide a meal for everyone who is fasting, at sunset each evening, and invites people of all faiths to join if they wish. It says that on the last Friday the community will collect Zakat and distribute food parcels to families in need before the festival of Eid.",
      { described: true }
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "According to Source A, when will the mosque provide a meal?",
        options: [
          ["At sunset each evening during Ramadan", "Correct: this is iftar."],
          ["Before dawn each morning during Ramadan", "The source says sunset."],
          ["On the day of Eid only", "The source says each evening in Ramadan."],
          ["During the Hajj in Makkah", "The notice concerns the local mosque."],
        ],
        answer: "A", explanation: "The notice says the mosque will provide a meal at sunset each evening, the iftar.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Using Source A, state **three** things the mosque community does in Ramadan.",
        points: ["It provides a meal for those who are fasting at sunset", "It invites people of all faiths to join", "It collects Zakat and distributes food parcels to families in need"],
        modelAnswer: "The mosque provides a meal for those who are fasting at sunset, invites people of all faiths to join, and collects Zakat to distribute food parcels to families in need.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain how the activities in Source A show the purposes of Ramadan.",
        points: [["Fasting teaches self-control and sympathy for the hungry", 1], ["Sharing a meal builds community and generosity", 1], ["Giving Zakat before Eid ensures the poor can celebrate too", 1]],
        modelAnswer: "Fasting teaches self-control and sympathy for the hungry. Sharing the meal builds community and generosity, and giving Zakat before Eid ensures the poor can celebrate too.",
      }),
    ],
    hints: ["In (c) link each activity to a purpose of Ramadan."],
    explanation: "The source shows iftar, Zakat and Eid together.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1200,
    stem: "Nokuthula says: \"Fasting is the hardest Pillar.\" Yusuf says: \"The Hajj is harder, because of the cost and the effort.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Outline **two** rites of the Hajj.",
        points: [["Tawaf: walking seven times around the Ka'bah", 1], ["Sa'i: walking between Safa and Marwa, remembering Hajar", 1], ["Standing on the plain of Arafat", 1], ["Throwing pebbles at Mina or the sacrifice of an animal", 1]],
        modelAnswer: "Pilgrims walk seven times around the Ka'bah (tawaf) and walk between Safa and Marwa (sa'i), remembering Hajar. They also stand on the plain of Arafat and throw pebbles at Mina.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain why Muslims give Zakat.",
        points: [["It is a Pillar and a command of God, and wealth is a trust from God", 2], ["It purifies wealth and helps the poor, reducing hardship and greed", 2]],
        modelAnswer: "Zakat is a Pillar and a command of God, and Muslims believe wealth is a trust from God. It purifies wealth and helps the poor, reducing hardship and greed.",
      }),
      P.manual({
        label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 280 },
        stem: "Assess the view that Sawm is the Pillar that teaches Muslims the most about self-control.",
        points: [["For: fasting daily from dawn to sunset trains control of hunger, thirst and anger", 2], ["Against: regular prayer teaches discipline too, and Zakat teaches control of greed", 2], ["Link: the Pillars together shape the character of a Muslim", 2], ["A supported judgement", 2]],
        levels: levels(8),
        modelAnswer: "Sawm trains self-control by asking Muslims to resist hunger, thirst and anger from dawn to sunset for a month. Yet five daily prayers also teach discipline, and Zakat teaches control of greed. The Pillars work together to shape character. I conclude that Sawm teaches self-control most directly, but it is supported by the other Pillars.",
      }),
    ],
    hints: ["Compare Sawm with other Pillars before you judge."],
    explanation: "A strong answer compares Sawm with other Pillars and reaches a judgement.",
  });

  b.card("DEFINITION", "What is **Zakat**?", "Obligatory giving, usually 2.5 per cent of qualifying savings held for a lunar year.", "The word means purification.");
  b.card("DEFINITION", "What is **sadaqah**?", "Voluntary charity given at any time.");
  b.card("DEFINITION", "What is **Sawm**?", "Fasting from dawn to sunset in Ramadan.");
  b.card("FACT", "What are suhoor and iftar?", "Suhoor is the meal before dawn; iftar is the meal that breaks the fast at sunset.");
  b.card("FACT", "What is Laylat al-Qadr?", "The Night of Power, in the last ten nights of Ramadan, remembering the first revelation.");
  b.card("FACT", "In which month is the Hajj made?", "Dhul-Hijjah, the twelfth month.");
  b.card("FACT", "What are tawaf and sa'i?", "Tawaf: seven circuits of the Ka'bah. Sa'i: seven journeys between Safa and Marwa.");
  b.card("CONCEPT", "What is the meaning of the white ihram clothes?", "Equality and purity: rich and poor look the same before God.");
  b.card("CONCEPT", "What is Umrah?", "The lesser pilgrimage, which can be made at any time; it does not replace the Hajj.");
});
