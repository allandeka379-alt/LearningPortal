// W3a: The Qur'an, Hadith and Sunnah.
import { concept, P, source, levels, ref } from "../lib.mjs";

concept("frs.islam.quran-hadith", { file: "islam/quran-hadith", keyPrefix: "islam.quran-hadith" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "How many surahs (chapters) are there in the Qur'an?",
    options: [
      ["114", "Correct: the Qur'an has 114 surahs."],
      ["99", "Ninety-nine is the number of the beautiful names of God."],
      ["30", "Thirty is the number of parts (juz) into which the Qur'an is divided."],
      ["5", "Five is the number of Pillars and of daily prayers."],
    ],
    answer: "A",
    explanation: "The Qur'an has **114 surahs**, each made of ayat (verses).",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is the first surah of the Qur'an?",
    options: [
      ["Al-Fatihah", "Correct: \"the Opening\"."],
      ["Al-Ikhlas", "Al-Ikhlas (Surah 112) is a short surah on the oneness of God."],
      ["Al-Baqarah", "Al-Baqarah (Surah 2) is the longest surah and comes second."],
      ["Al-Qadr", "Al-Qadr (Surah 97) is about the Night of Power."],
    ],
    answer: "A",
    explanation: "**Al-Fatihah**, \"the Opening\", is the first surah and is recited in every cycle of the daily prayer.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is a **hafiz**?",
    options: [
      ["A Muslim who has memorised the whole Qur'an", "Correct: many Muslim children learn this in madrasahs."],
      ["A Muslim who has completed the Hajj pilgrimage", "That person is a hajji."],
      ["A Muslim who leads prayer in the mosque", "That is the imam."],
      ["A Muslim who gives the call to prayer", "That is the muezzin."],
    ],
    answer: "A",
    explanation: "A **hafiz** has memorised the whole Qur'an. A hajji has made the Hajj, an imam leads prayer and a muezzin calls to prayer.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the **Sunnah**?",
    options: [
      ["The example of the Prophet, preserved in the Hadith", "Correct: it is the way of the Prophet."],
      ["The first chapter of the Qur'an, recited in every prayer", "That is Al-Fatihah."],
      ["The standard copy of the Qur'an sent to the cities", "That was made under Uthman."],
      ["The pilgrimage made to Makkah each year", "That is the Hajj."],
    ],
    answer: "A",
    explanation: "The **Sunnah** is the example of the Prophet; the **Hadith** are the reports in which it is recorded.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which caliph first had the written parts of the Qur'an and the memories of the Companions gathered into one collection?",
    options: [
      ["Abu Bakr", "Correct: after the Prophet's death."],
      ["Uthman", "Uthman had a standard copy made and sent to the main cities."],
      ["Umar", "Umar is credited with suggesting the gathering, but the collection was made under Abu Bakr."],
      ["Ali", "Ali was the fourth caliph."],
    ],
    answer: "A",
    explanation: "**Abu Bakr** had the Qur'an gathered into one collection; **Uthman** later had a standard text copied and sent out.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Nyasha sees her Muslim friend wrap the Qur'an in a cloth and place it on a high shelf. What does this practice show?",
    options: [
      ["Respect for what Muslims hold to be God's word", "Correct: the book is treated with honour."],
      ["A belief that the book is a god to be worshipped", "Muslims worship God alone, not the book."],
      ["A rule that only scholars may read the Qur'an", "Every Muslim is encouraged to read it."],
      ["A fear that the Qur'an will be damaged by sunlight", "The reason is respect, not damage."],
    ],
    answer: "A",
    hints: ["Ask what the book is for Muslims."],
    explanation: "Muslims show **respect** for the Qur'an because they believe it is the word of God; it is not worshipped.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why do Muslims use the Hadith as well as the Qur'an?",
    options: [
      ["The Hadith show how the Prophet applied it, such as how to pray", "Correct: the Qur'an does not give every detail."],
      ["The Hadith replace the Qur'an when a command is difficult", "The Hadith rank below the Qur'an."],
      ["The Hadith are the first revelation and the Qur'an came after", "The Qur'an is the revelation."],
      ["The Hadith are used only by scholars and have no use in daily life", "They guide daily practice."],
    ],
    answer: "A",
    hints: ["Think of the details that the Qur'an itself does not set out."],
    explanation: "The Qur'an commands prayer, and the **Hadith** record how the Prophet prayed; they explain and apply the Qur'an but rank below it.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement about the arrangement of the Qur'an is correct?",
    options: [
      ["The surahs run roughly from longest to shortest, not by date", "Correct: Makkan and Madinan surahs are mixed."],
      ["The surahs are arranged in the exact order in which they were revealed", "The order is not chronological."],
      ["The shortest surahs come first and the longest come last", "The arrangement is roughly the reverse."],
      ["The surahs are arranged by the names of the prophets they mention", "They are not arranged this way."],
    ],
    answer: "A",
    hints: ["Remember that Al-Fatihah is short but comes first by a special rule."],
    explanation: "The surahs are arranged roughly by length, longest first, apart from the opening surah; Makkan and Madinan surahs are mixed.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Muslims believe that the Qur'an was revealed to the Prophet over about 23 years.",
    answer: true,
    explanation: "True. The revelation came in parts from about 610 CE until near the end of the Prophet's life.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Muslims regard a translation of the Qur'an into English as the Qur'an itself.",
    answer: false,
    explanation: "False. Muslims hold that the Qur'an is the Arabic text; a translation is an attempt to give its meaning.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term with its meaning.",
    pairs: [["Surah", "a chapter of the Qur'an"], ["Ayah", "a verse of the Qur'an"], ["Hadith", "a report of what the Prophet said, did or approved"], ["Hafiz", "one who has memorised the Qur'an"]],
    explanation: "Surah: chapter. Ayah: verse. Hadith: report of the Prophet. Hafiz: memoriser.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The two most trusted Sunni Hadith collections are by {{blank:a}} and by {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Bukhari"], choices: ["Bukhari", "Uthman", "Ibrahim", "Bilal"] },
      { id: "b", accepted: ["Muslim"], choices: ["Muslim", "Musa", "Marwa", "Mika'il"] },
    ],
    explanation: "**Sahih al-Bukhari** and **Sahih Muslim**, compiled in the ninth century CE.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What name do Muslims give to the rules of reciting the Qur'an correctly?",
    accepted: ["Tajwid", "Tajweed", "Tajwīd"],
    wrong: ["Tawhid", "Wudu"],
    explanation: "**Tajwid** is the set of rules for correct recitation.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "Identify **three** ways in which Muslims show respect for the Qur'an.",
    points: ["They make wudu before touching the Arabic text", "They keep it in a high, clean place or wrapped in cloth", "They memorise and recite it correctly, or place it on a stand when reading"],
    modelAnswer: "Muslims make wudu before touching the Arabic text, keep it in a high, clean place wrapped in cloth, and memorise it or recite it correctly.",
    explanation: "One mark for each way.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how the Qur'an was preserved after the Prophet's death.",
    points: [["It had been memorised by many Companions during the Prophet's life", 1], ["It had been written on palm leaves, leather and flat stones", 1], ["Abu Bakr had it gathered into one collection", 1], ["Uthman had a standard copy made and sent to the main cities", 1]],
    modelAnswer: "Many Companions had memorised the Qur'an and parts were written on palm leaves, leather and stones. Abu Bakr had it gathered into one collection, and Uthman had a standard copy made and sent to the main cities.",
    hints: ["Give the order: memory, writing, Abu Bakr, Uthman."],
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain **two** reasons why the Hadith are important to Muslims.",
    points: [
      ["They record the Sunnah, the example of the Prophet", 1],
      ["Developed: Muslims believe the Prophet is the best model for living, so his actions guide daily behaviour", 2],
      ["They explain details that the Qur'an does not give", 1],
      ["Developed: the Qur'an commands prayer and fasting, and the Hadith show how the Prophet performed them", 2],
    ],
    modelAnswer: "The Hadith record the Sunnah, the example of the Prophet. Muslims believe he is the best model for living, so his actions guide their daily behaviour. They also explain details that the Qur'an does not give: the Qur'an commands prayer and fasting, and the Hadith show how the Prophet performed them.",
    hints: ["Give a reason about example and a reason about detail."],
    explanation: "Two reasons, each stated (1) and developed (2).",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "a description (in words) of a lesson at a fictional madrasah in Gweru, 2026",
      "A group of children sit in rows on a carpet. Each child has a copy of the Qur'an on a small wooden stand. The teacher recites a verse in Arabic and the children repeat it. Afterwards the teacher explains the meaning in English and tells the children that the Prophet taught Muslims to be kind to their neighbours, and she says that this is found in the Hadith.",
      { described: true }
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "According to Source A, where do the children place their copies of the Qur'an?",
        options: [
          ["On small wooden stands", "Correct: the source says each copy is on a stand."],
          ["On the floor beside them", "The source does not say this."],
          ["In a bag under the chair", "The source does not say this."],
          ["On the teacher's table", "The source does not say this."],
        ],
        answer: "A", explanation: "The source says each child has a copy on a small wooden stand.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Using Source A, state **three** things the children learn in the lesson.",
        points: ["To recite verses of the Qur'an in Arabic by repeating after the teacher", "The meaning of the verses in English", "That the Hadith teach kindness to neighbours"],
        modelAnswer: "The children learn to recite verses of the Qur'an in Arabic by repeating after the teacher, learn their meaning in English, and learn from the Hadith that the Prophet taught kindness to neighbours.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain why Muslim children learn to recite the Qur'an in Arabic.",
        points: [["Muslims believe the Qur'an in Arabic is the word of God, and a translation gives only the meaning", 1], ["Prayer is performed in Arabic, so children need to recite the text", 1], ["Recitation is an act of worship and keeps the text the same everywhere", 1]],
        modelAnswer: "Muslims believe the Qur'an in Arabic is the word of God and that a translation gives only the meaning. Prayer is performed in Arabic, so children need to recite the text. Recitation is also an act of worship and keeps the text the same everywhere.",
      }),
    ],
    hints: ["In (c) think of belief, prayer and unity."],
    explanation: "The source shows recitation, explanation and the Hadith used together.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1200,
    stem: "Tendai says: \"The Qur'an is enough for a Muslim; the Hadith are not needed.\" Yusuf answers: \"Without the Hadith we would not know how to pray.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Outline **two** features of the structure of the Qur'an.",
        points: [["It has 114 surahs, each made of ayat", 1], ["Surahs are arranged roughly from longest to shortest", 1], ["Surahs are described as Makkan or Madinan according to when they were revealed", 1], ["The first surah is Al-Fatihah", 1]],
        modelAnswer: "The Qur'an has 114 surahs made of ayat, arranged roughly from longest to shortest, and the first is Al-Fatihah. Surahs are called Makkan or Madinan according to when they were revealed.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain why Al-Fatihah is important in Muslim worship.",
        points: [["It is recited in every cycle (rak'ah) of the daily prayer", 2], ["It praises God and asks for guidance, so it sums up the relationship between a Muslim and God", 2]],
        modelAnswer: "Al-Fatihah is recited in every cycle of the daily prayer. It praises God and asks for guidance, so it sums up the relationship between a Muslim and God.",
      }),
      P.manual({
        label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 280 },
        stem: "Assess the view that the Qur'an is more important than the Hadith to Muslims.",
        points: [["For: the Qur'an is the word of God and the first source of authority; the Hadith rank below it", 2], ["Against: the Hadith explain how to apply the Qur'an, for example how to pray and fast", 2], ["Link: the two work together, and the Sunnah is the Prophet's living example of the Qur'an", 2], ["A supported judgement", 2]],
        levels: levels(8),
        modelAnswer: "The Qur'an is more important in authority because Muslims believe it is the word of God, and the Hadith rank below it. However, the Hadith explain how to apply the Qur'an, for example how to pray and fast, so Muslims need both. The Sunnah is the Prophet's example of living by the Qur'an. I conclude that the Qur'an has greater authority, but the Hadith are needed for daily practice.",
      }),
    ],
    hints: ["Separate authority from practical use before you judge."],
    explanation: "A strong answer separates authority from use and shows how the two work together.",
  });

  b.card("DEFINITION", "What is the **Qur'an**?", "The holy book of Islam, which Muslims believe is the word of God revealed to the Prophet Muhammad through Jibril.", "The word means recitation.");
  b.card("DEFINITION", "What is a **hafiz**?", "A Muslim who has memorised the whole Qur'an.");
  b.card("DEFINITION", "What is the **Hadith**?", "A report of what the Prophet said, did or approved.");
  b.card("DEFINITION", "What is the **Sunnah**?", "The example of the Prophet, known through the Hadith.");
  b.card("FACT", "How many surahs does the Qur'an have, and which is first?", "114 surahs; the first is Al-Fatihah.");
  b.card("FACT", "Who gathered the Qur'an into one collection and who sent a standard copy to the cities?", "Abu Bakr gathered it; Uthman sent a standard copy.");
  b.card("FACT", "Which two Hadith collections do Sunni Muslims trust most?", "Sahih al-Bukhari and Sahih Muslim.", "Compiled in the ninth century CE.");
  b.card("CONCEPT", "What is the difference between Makkan and Madinan surahs?", "Makkan surahs were revealed before the Hijrah and stress belief and judgement; Madinan surahs came after it and deal more with community life and law.");
  b.card("CONCEPT", "Why do Muslims need the Hadith as well as the Qur'an?", "The Hadith show how the Prophet applied the Qur'an, for example how to pray, which the Qur'an does not set out in detail.");
});
