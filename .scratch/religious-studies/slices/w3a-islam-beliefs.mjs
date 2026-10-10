// W3a: Muslim beliefs, the articles of faith.
import { concept, P, source, levels } from "../lib.mjs";

concept("frs.islam.beliefs", { file: "islam/beliefs", keyPrefix: "islam.beliefs" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does the Arabic word **Islam** mean?",
    options: [
      ["Submission to the will of God", "Correct: and also peace."],
      ["Pilgrimage to Makkah", "Pilgrimage is Hajj."],
      ["The recited word of God, revealed to Muhammad", "That describes the Qur'an."],
      ["The day of judgement", "That is Yawm al-Qiyamah."],
    ],
    answer: "A",
    explanation: "**Islam** means submission to the will of God, and also peace. A **Muslim** is one who submits.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the term for the oneness of God in Islam?",
    options: [
      ["Tawhid", "Correct: belief in one God."],
      ["Shirk", "Shirk is associating partners with God."],
      ["Zakat", "Zakat is obligatory giving."],
      ["Wudu", "Wudu is ritual washing before prayer."],
    ],
    answer: "A",
    explanation: "**Tawhid** is the oneness of God. Its opposite, **shirk**, is the greatest wrong in Islam.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which angel do Muslims believe brought the revelation of the Qur'an to the Prophet Muhammad?",
    options: [
      ["Jibril", "Correct: Jibril (Gabriel) brought the revelations."],
      ["Mika'il", "Mika'il is associated with rain and sustenance."],
      ["Israfil", "Israfil is said to blow the trumpet at the end of time."],
      ["Bilal", "Bilal was a Companion and muezzin, not an angel."],
    ],
    answer: "A",
    explanation: "**Jibril** (Gabriel) brought the revelation to the prophets, including the Qur'an to Muhammad.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What do Muslims mean when they call Muhammad the \"seal of the prophets\"?",
    options: [
      ["He is the last prophet, and no prophet comes after him", "Correct: based on Qur'an 33:40."],
      ["He is the first prophet sent by God to humankind", "Muslims regard Adam as the first prophet."],
      ["He is the only prophet that Muslims respect and honour", "Muslims honour all the prophets."],
      ["He is a prophet only for the people of Makkah and Madinah", "Muslims believe his message is for all people."],
    ],
    answer: "A",
    explanation: "**Seal of the prophets** means the last prophet; Muslims also honour Adam, Nuh, Ibrahim, Musa, Isa and others.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of these is a revealed book that Muslims believe was given to Dawud (David)?",
    options: [
      ["The Zabur", "Correct: the Psalms in Muslim tradition."],
      ["The Tawrat", "The Tawrat was revealed to Musa."],
      ["The Injil", "The Injil was revealed to Isa."],
      ["The Hadith", "The Hadith is a record of the Prophet's sayings and actions, not a book of revelation."],
    ],
    answer: "A",
    explanation: "The **Zabur** is the book revealed to Dawud. The Tawrat is to Musa, the Injil to Isa and the Qur'an to Muhammad.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Ibrahim, a Muslim student, says: \"God knows everything that will happen, but I am still responsible for my choices.\" Which article of faith is he describing?",
    options: [
      ["Divine decree (al-Qadr)", "Correct: God's knowledge and decree alongside human free will."],
      ["The Day of Judgement", "The Last Day concerns judgement, though responsibility links to it."],
      ["Belief in the angels", "Angels record deeds but the statement is about decree."],
      ["Belief in the revealed books", "The books are about guidance, not about fate."],
    ],
    answer: "A",
    hints: ["Look for the idea of God's knowledge together with free will."],
    explanation: "**Al-Qadr** is the belief that God knows and has power over everything, while people choose and are responsible.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "How does belief in the Day of Judgement affect the daily life of many Muslims?",
    options: [
      ["It encourages honesty and charity, since they will answer to God", "Correct: accountability shapes behaviour."],
      ["It leads them to avoid all contact with people of other religions", "Islam teaches justice and kindness towards all."],
      ["It means they do not need to pray, since judgement is decided already", "Prayer is a Pillar for all Muslims."],
      ["It requires them to give up all work and live apart from society", "Islam does not teach withdrawal from society."],
    ],
    answer: "A",
    hints: ["Think of belief leading to action."],
    explanation: "Belief that all will be **judged** encourages honest and charitable living.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement about Muslim and Christian beliefs about Isa (Jesus) is accurate?",
    options: [
      ["Muslims honour Isa as a prophet but do not hold that he is the son of God", "Correct: a point of difference described respectfully."],
      ["Muslims do not believe that Isa existed and do not mention him in the Qur'an", "The Qur'an mentions Isa and his mother Maryam."],
      ["Muslims and Christians hold identical beliefs about the nature of Isa", "They differ about his nature."],
      ["Muslims regard Isa as the last of the prophets after Muhammad", "Muhammad is the seal of the prophets."],
    ],
    answer: "A",
    hints: ["Remember that Muslims honour Isa but differ from Christians on his status."],
    explanation: "The Qur'an honours **Isa** as a prophet born to Maryam; Muslims do not teach that he is the son of God, which is a difference from Christian belief.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Muslims believe that there are six articles of faith.",
    answer: true,
    explanation: "True: God, angels, books, prophets, the Last Day and al-Qadr.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Muslims believe that Allah is a different God from the God of Jews and Christians.",
    answer: false,
    explanation: "False. Allah is the Arabic word for God, and Muslims believe in the God of Ibrahim, Musa and Isa; they differ from Jews and Christians in what they believe about God, not in believing in a different God.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term with its meaning.",
    pairs: [["Tawhid", "the oneness of God"], ["Shirk", "associating partners with God"], ["Jannah", "paradise"], ["Al-Qadr", "divine decree"]],
    explanation: "Tawhid: oneness. Shirk: partners with God. Jannah: paradise. Al-Qadr: divine decree.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Tawrat was revealed to {{blank:a}}, the Injil to {{blank:b}}, and the Qur'an to Muhammad.",
    blanks: [
      { id: "a", accepted: ["Musa"], choices: ["Ibrahim", "Musa", "Dawud", "Isa"] },
      { id: "b", accepted: ["Isa"], choices: ["Ibrahim", "Musa", "Dawud", "Isa"] },
    ],
    explanation: "Tawrat to **Musa**, Zabur to Dawud, Injil to **Isa**, Qur'an to Muhammad.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What is the Arabic name for hell in Islam?",
    accepted: ["Jahannam", "Jahanam", "Jahannum"],
    wrong: ["Jannah", "Shirk"],
    explanation: "**Jahannam** is hell; **Jannah** is paradise.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State **three** of the six articles of faith in Islam.",
    points: ["Belief in one God (Allah)", "Belief in the angels, the revealed books or the prophets", "Belief in the Day of Judgement, or in divine decree (al-Qadr)"],
    modelAnswer: "Muslims believe in one God, in the angels, the revealed books and the prophets, and in the Day of Judgement and divine decree.",
    explanation: "One mark for each article.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe what Muslims believe about the prophets.",
    points: [["God sent prophets to every people", 1], ["Prophets include Adam, Nuh, Ibrahim, Musa and Isa", 1], ["Muhammad is the last prophet, the seal of the prophets", 1], ["All prophets are respected and none is worshipped", 1]],
    modelAnswer: "Muslims believe that God sent prophets to every people, including Adam, Nuh, Ibrahim, Musa and Isa. Muhammad is the last, the seal of the prophets. All prophets are respected, but none is worshipped.",
    hints: ["Say who, how many peoples, who is last and how they are treated."],
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain **two** ways in which belief in one God (Tawhid) affects Muslim life.",
    points: [
      ["Muslims worship God alone and make no images of God", 1],
      ["Developed: because nothing can be equal to God, mosques have no pictures or statues, and shirk is the greatest wrong", 2],
      ["The Shahadah begins with belief in one God", 1],
      ["Developed: every Muslim declares this belief, and it is repeated in the call to prayer and in daily prayer", 2],
    ],
    modelAnswer: "Muslims worship God alone and make no images of God. Because nothing can be equal to God, mosques have no pictures or statues and shirk is the greatest wrong. The Shahadah also begins with belief in one God, so every Muslim declares this belief, and it is repeated in the call to prayer and in daily prayer.",
    hints: ["Link the belief to worship and to the Shahadah."],
    explanation: "Two ways, each stated (1) and developed (2).",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "a conversation between two fictional students in a school in Marondera, 2026",
      "Farai: Do Muslims worship the Prophet Muhammad?\nAisha: No. We worship only God, whom we call Allah. The Prophet is our final messenger, and we honour him, but he is not worshipped.\nFarai: And what about Jesus?\nAisha: We call him Isa, and we respect him as a prophet. We believe the Qur'an is the final revelation, and that we will all answer to God on the Day of Judgement."
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "According to Source A, whom do Muslims worship?",
        options: [
          ["God alone", "Correct: Aisha says Muslims worship only God."],
          ["The Prophet Muhammad", "Aisha says the Prophet is honoured but not worshipped."],
          ["The prophet Isa", "Aisha says Isa is respected as a prophet."],
          ["The angels", "The source does not mention worship of angels."],
        ],
        answer: "A", explanation: "Aisha says Muslims worship only God, whom they call Allah.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Using Source A, state **three** Muslim beliefs.",
        points: ["Muslims worship God alone", "Muhammad is the final messenger but is not worshipped, and Isa is a respected prophet", "The Qur'an is the final revelation and all will answer to God on the Day of Judgement"],
        modelAnswer: "Muslims worship God alone. Muhammad is the final messenger and Isa is a respected prophet, but neither is worshipped. The Qur'an is the final revelation, and all will answer to God on the Day of Judgement.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain why Muslims say that the Prophet Muhammad is the final messenger.",
        points: [["They believe he received the last revelation, the Qur'an", 1], ["Qur'an 33:40 calls him the seal of the prophets", 1], ["So no further prophet is expected, though earlier prophets such as Isa are respected", 1]],
        modelAnswer: "Muslims believe that he received the last revelation, the Qur'an. Qur'an 33:40 calls him the seal of the prophets, so no further prophet is expected, though earlier prophets such as Isa are respected.",
      }),
    ],
    hints: ["In (c) link the Qur'an and the phrase seal of the prophets."],
    explanation: "The source shows worship of God alone, respect for the prophets and the final Qur'an.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1200,
    stem: "Miriam, a Jewish student, notes that Muslims and Jews both believe in one God. Yusuf, a Muslim student, replies: \"Belief in one God is the most important belief in Islam, but it cannot stand without the other five.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Outline **two** things Muslims believe about the angels.",
        points: [["They are beings created by God from light", 1], ["They obey God completely and cannot disobey", 1], ["Jibril brought the revelations to the prophets", 1], ["Some angels record each person's deeds", 1]],
        modelAnswer: "Angels are beings created by God from light, who obey God completely. Jibril brought the revelations to the prophets, and some angels record each person's deeds.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain what Muslims mean by al-Qadr (divine decree).",
        points: [["God knows and has power over everything that happens", 2], ["People still have free will and are responsible for their choices, so Muslims are encouraged to act and to trust God", 2]],
        modelAnswer: "Al-Qadr means that God knows and has power over everything that happens. People still have free will and are responsible for their choices, so Muslims are encouraged both to act and to trust God.",
      }),
      P.manual({
        label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 280 },
        stem: "Assess the view that Tawhid is the most important of the six articles of faith.",
        points: [["For: all other beliefs depend on belief in one God, and shirk is the greatest wrong", 2], ["Against: the angels, books, prophets, Last Day and Qadr shape how Muslims live and are listed together in the Qur'an", 2], ["Link: the articles form a whole; revelation comes from God through angels and prophets, and judgement is God's", 2], ["A supported judgement", 2]],
        levels: levels(8),
        modelAnswer: "Tawhid is the foundation, because all other beliefs depend on belief in one God and shirk is the greatest wrong. On the other hand, the angels, books, prophets, Last Day and Qadr shape how Muslims live, and Qur'an 2:285 lists them together. The articles form a whole: revelation comes from God through angels and prophets, and judgement belongs to God. I conclude that Tawhid is the most important because the others rest on it, but it is expressed through all six.",
      }),
    ],
    hints: ["Give both views, then show how the articles connect."],
    explanation: "A strong answer weighs Tawhid against the others and notes that they belong together.",
  });

  b.card("DEFINITION", "What does **Islam** mean?", "Submission to the will of God, and also peace.");
  b.card("DEFINITION", "What is **Tawhid**?", "The oneness of God: the central belief of Islam.");
  b.card("DEFINITION", "What is **shirk**?", "Associating partners with God; the greatest wrong in Islam.");
  b.card("FACT", "What are the six articles of faith?", "God (Allah), the angels, the revealed books, the prophets, the Day of Judgement, and divine decree (al-Qadr).");
  b.card("FACT", "Which four books do Muslims name as revealed?", "The Tawrat (Musa), the Zabur (Dawud), the Injil (Isa) and the Qur'an (Muhammad).");
  b.card("FACT", "Which angel brought the Qur'an to the Prophet?", "Jibril (Gabriel).");
  b.card("CONCEPT", "What does \"seal of the prophets\" mean?", "The last prophet: Muslims believe Muhammad is the final prophet (Qur'an 33:40).");
  b.card("FACT", "What are Jannah and Jahannam?", "Paradise and hell, the two destinations after the Day of Judgement.");
  b.card("CONCEPT", "What does al-Qadr teach about human choice?", "God knows and has power over everything, yet people have free will and are responsible for their choices.");
});
