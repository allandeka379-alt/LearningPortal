// W3a exam-format items: Paper 1 (Religions, topic 5 Islam) x5 and Paper 2 (Contemporary issues, topic 10 Religion and
// Disability) x2 structured essay questions, 25 marks = (a) 15 + (b) 10. Plans from EXAM in lib.mjs; the paper structure is
// our convention (reviewer to check against the syllabus assessment section and recent ZIMSEC papers).
import { concept, P, levels, EXAM, checkExam } from "../lib.mjs";

const p1 = { skill: EXAM.ZIM_P1.skill, applies: EXAM.ZIM_P1.applies, secs: EXAM.ZIM_P1.secs, examStyle: true, paper: "Paper 1" };
const p2 = { skill: EXAM.ZIM_P2.skill, applies: EXAM.ZIM_P2.applies, secs: EXAM.ZIM_P2.secs, examStyle: true, paper: "Paper 2" };

concept("frs.islam.muhammad", { file: "exam/w3a-zimsec", keyPrefix: "exam.w3a-zimsec" }, (b) => {
  // 1. Paper 1: the life of the Prophet.
  b.struct({
    ...p1, d: 4,
    concepts: ["frs.islam.muhammad"],
    stem: "This question is about the life of the Prophet Muhammad.",
    parts: checkExam(EXAM.ZIM_P1, [
      P.manual({
        label: "(a)", marks: 15, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 },
        stem: "Describe the life of the Prophet Muhammad from his birth to the Hijrah.",
        points: [
          ["He was born in Makkah about 570 CE into the Quraysh, and was orphaned young, being cared for by his grandfather and then his uncle Abu Talib", 2],
          ["He worked in the caravan trade and was known as al-Amin, the trustworthy", 2],
          ["He married Khadijah, a respected businesswoman, who supported him", 2],
          ["About 610 CE, in the cave of Hira, the angel Jibril brought the first revelation; Khadijah comforted and believed him", 2],
          ["He preached the oneness of God (Tawhid), justice and care for the poor; the first Muslims included Khadijah, Ali, Abu Bakr and Zayd", 2],
          ["Quraysh leaders opposed him because he rejected the tribal gods and challenged their trade and authority; Muslims such as Bilal were persecuted", 2],
          ["Some Muslims migrated to Abyssinia; Khadijah and Abu Talib died about 619 CE", 2],
          ["In 622 CE he and Abu Bakr migrated to Madinah (the Hijrah) after the people of Madinah invited him", 1],
        ],
        modelAnswer: "According to Muslim tradition, Muhammad was born in Makkah about 570 CE into the Quraysh. He was orphaned young and cared for first by his grandfather and then by his uncle Abu Talib. He worked in the caravan trade and was known as al-Amin, the trustworthy. He married Khadijah, a respected businesswoman, who supported him throughout his mission.\n\nAbout 610 CE, in the cave of Hira, the angel Jibril brought the first revelation, and Khadijah comforted and believed him. He preached the oneness of God, justice and care for the poor, and the first Muslims included Khadijah, Ali, Abu Bakr and Zayd. Quraysh leaders opposed him because he rejected the tribal gods and challenged their trade and authority, and Muslims such as Bilal were persecuted. Some Muslims migrated to Abyssinia, and about 619 CE Khadijah and Abu Talib died. In 622 CE, after the people of Madinah invited him, he and Abu Bakr migrated there. This was the Hijrah.",
        explanation: "Two marks for each developed stage, in order, with dates and names; one mark for the Hijrah itself. Credit any accurate account.",
      }),
      P.manual({
        label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 300 },
        stem: "Explain the significance of the Hijrah for Muslims today.",
        points: [
          ["It saved the persecuted Muslims and began a free community in Madinah", 2],
          ["It marks year 1 of the Islamic calendar, which Muslims use for festivals and worship", 2],
          ["It shows trust in God and willingness to sacrifice home and property for faith", 2],
          ["In Madinah the Prophet built a mosque and made agreements with other groups, providing a model of community life", 2],
          ["It reminds Muslims of the value of religious freedom and of support for refugees and those in need", 2],
        ],
        levels: levels(10),
        modelAnswer: "The Hijrah is significant because it saved the persecuted Muslims and began a free community in Madinah. Muslims count their years from 622 CE, so every date and festival reminds them of it.\n\nIt also shows trust in God and willingness to give up home and property for faith. In Madinah the Prophet built a mosque and made agreements with other groups, and Muslims regard this as a model of community life. The Hijrah also reminds Muslims of the value of religious freedom and of the duty to support those who must flee, so it still speaks to believers today.",
        explanation: "Level marking: developed reasons linked to Muslim practice and belief reach the top levels.",
      }),
    ]),
    hints: ["In (a) put the stages in order with names and dates. In (b) link each reason to Muslim life today."],
    explanation: "A Paper 1 style question: (a) describe the life up to the Hijrah, (b) explain the significance of the Hijrah.",
  });

  // 2. Paper 1: the Qur'an and Hadith.
  b.struct({
    ...p1, d: 4,
    concepts: ["frs.islam.quran-hadith"],
    stem: "This question is about the Qur'an and the Hadith.",
    parts: checkExam(EXAM.ZIM_P1, [
      P.manual({
        label: "(a)", marks: 15, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 },
        stem: "Describe how the Qur'an was revealed and how it was preserved.",
        points: [
          ["Muslims believe it is the word of God, revealed to the Prophet through the angel Jibril", 2],
          ["The first revelation came about 610 CE in the cave of Hira, and the rest came over about 23 years", 2],
          ["The revelations came in parts, in answer to events and questions; the Prophet recited each part to his Companions", 2],
          ["Many Companions memorised it, and scribes wrote it on palm leaves, leather and flat stones", 2],
          ["After the Prophet's death, Abu Bakr had the written parts and memories gathered into one collection", 2],
          ["Uthman had a standard copy made and sent to the main cities, so Muslims used the same text", 2],
          ["Today it is kept in Arabic, recited and memorised by many, and a translation is understood as giving only the meaning", 2],
          ["It has 114 surahs, beginning with Al-Fatihah", 1],
        ],
        modelAnswer: "Muslims believe that the Qur'an is the word of God, revealed to the Prophet Muhammad through the angel Jibril. The first revelation came about 610 CE in the cave of Hira, and the rest came over about twenty-three years, in parts, in answer to events and questions in the community. The Prophet recited each part to his Companions.\n\nMany Companions memorised it, and scribes wrote it on palm leaves, leather and flat stones. After the Prophet's death, Abu Bakr had the written parts and the memories gathered into one collection. Later Uthman had a standard copy made and sent to the main cities, so that Muslims everywhere used the same text. Today the Qur'an is kept in Arabic and recited and memorised by many Muslims, and a translation is understood as giving only its meaning. It has 114 surahs, beginning with Al-Fatihah.",
        explanation: "Two marks for each developed stage of revelation and preservation; one mark for the structure.",
      }),
      P.manual({
        label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 300 },
        stem: "Explain why the Qur'an and the Hadith are important to Muslims today.",
        points: [
          ["The Qur'an is the word of God and the first source of authority for belief and conduct", 2],
          ["It is recited in daily prayer, and Al-Fatihah is said in every cycle, so it shapes worship", 2],
          ["The Hadith record the Sunnah, the Prophet's example, which Muslims follow as the best model", 2],
          ["The Hadith explain details the Qur'an does not give, such as how to pray", 2],
          ["Together they are the sources of Sharia, guiding family life, business and morality", 2],
        ],
        levels: levels(10),
        modelAnswer: "The Qur'an is important because Muslims believe it is the word of God and the first source of authority for belief and conduct. It is recited in daily prayer, and Al-Fatihah is said in every cycle, so it shapes worship.\n\nThe Hadith record the Sunnah, the Prophet's example, which Muslims follow as the best model for living. They also explain details that the Qur'an does not give, such as how to pray. Together the Qur'an and the Hadith are the sources of Sharia, so they guide family life, business and morality.",
        explanation: "Level marking: developed reasons linked to Muslim practice reach the top levels.",
      }),
    ]),
    hints: ["In (a) give revelation first and preservation second, in order. In (b) cover both the Qur'an and the Hadith."],
    explanation: "A Paper 1 style question: (a) describe revelation and preservation, (b) explain the importance of the Qur'an and the Hadith.",
  });

  // 3. Paper 1: Salah.
  b.struct({
    ...p1, d: 4,
    concepts: ["frs.islam.pillars-shahadah-salah"],
    stem: "This question is about Salah, the Muslim prayer.",
    parts: checkExam(EXAM.ZIM_P1, [
      P.manual({
        label: "(a)", marks: 15, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 },
        stem: "Describe how Muslims prepare for and perform the daily prayer (Salah).",
        points: [
          ["Muslims pray five times a day: Fajr (dawn), Dhuhr (midday), Asr (afternoon), Maghrib (sunset) and Isha (night)", 2],
          ["The muezzin gives the adhan, the call to prayer", 2],
          ["Worshippers perform wudu, washing hands, mouth, face, arms and feet; body, clothes and place must be clean", 2],
          ["They face the qiblah, the direction of the Ka'bah in Makkah, often on a prayer mat", 2],
          ["Each prayer is made of cycles (rak'ahs): standing and reciting Al-Fatihah and a passage of the Qur'an", 2],
          ["They bow from the waist, stand again and then prostrate with the forehead on the ground", 2],
          ["They sit, recite a closing blessing and end by turning the head to the right and left in greeting", 2],
          ["On Friday at midday, Muslims gather for Jumu'ah at the mosque, with a sermon (khutbah)", 1],
        ],
        modelAnswer: "Muslims pray five times a day: at dawn (Fajr), midday (Dhuhr), in the afternoon (Asr), at sunset (Maghrib) and at night (Isha). The muezzin gives the adhan, the call to prayer. Worshippers prepare by performing wudu, washing the hands, mouth, face, arms and feet, and the body, clothes and place of prayer must be clean. They face the qiblah, the direction of the Ka'bah in Makkah, often on a prayer mat.\n\nEach prayer is made up of cycles called rak'ahs. The worshipper stands and recites Al-Fatihah and a passage from the Qur'an, bows from the waist, stands again, and then prostrates with the forehead on the ground. The worshipper sits, recites a closing blessing, and ends by turning the head to the right and left in greeting. On Friday at midday Muslims gather for Jumu'ah at the mosque, where the imam gives a sermon.",
        explanation: "Two marks for each developed stage of preparation and performance; one mark for Jumu'ah.",
      }),
      P.manual({
        label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 300 },
        stem: "Explain the significance of Salah for Muslims.",
        points: [
          ["It is one of the Five Pillars and a command of God, so it is an act of obedience", 2],
          ["Praying five times a day keeps God in mind throughout the day", 2],
          ["It teaches discipline, since prayer must be performed at set times", 2],
          ["Rich and poor stand shoulder to shoulder, showing equality and unity; all face the same direction", 2],
          ["Prostration shows humility before God, and prayer helps keep a person from wrongdoing (Qur'an 29:45)", 2],
        ],
        levels: levels(10),
        modelAnswer: "Salah is significant because it is one of the Five Pillars and a command of God, so it is an act of obedience. Praying five times a day keeps God in mind throughout the day and teaches discipline, because each prayer must be made at its time.\n\nIn congregational prayer rich and poor stand shoulder to shoulder and all face the same direction, which shows equality and unity. Prostration shows humility before God, and the Qur'an teaches that prayer helps to keep a person away from wrongdoing. For these reasons Salah is central to Muslim life.",
        explanation: "Level marking: developed reasons linked to features of the prayer reach the top levels.",
      }),
    ]),
    hints: ["In (a) put the steps in order and use the correct terms. In (b) link each reason to a feature of Salah."],
    explanation: "A Paper 1 style question: (a) describe preparation and performance, (b) explain the significance of Salah.",
  });

  // 4. Paper 1: Zakat, Sawm and Hajj.
  b.struct({
    ...p1, d: 4,
    concepts: ["frs.islam.pillars-zakat-sawm-hajj"],
    stem: "This question is about the Hajj, Zakat and Sawm.",
    parts: checkExam(EXAM.ZIM_P1, [
      P.manual({
        label: "(a)", marks: 15, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 },
        stem: "Describe the main rites of the Hajj.",
        points: [
          ["The Hajj is the pilgrimage to Makkah in Dhul-Hijjah, once in a lifetime for those who are able (Qur'an 3:97)", 2],
          ["Pilgrims enter ihram, a state of purity; men wear two white unsewn cloths and women dress simply, which shows equality", 2],
          ["Tawaf: they walk seven times around the Ka'bah", 2],
          ["Sa'i: they walk seven times between Safa and Marwa, remembering Hajar's search for water for her son", 2],
          ["They stand in prayer on the plain of Arafat from noon to sunset, the high point of the Hajj", 2],
          ["At Muzdalifah and Mina they gather pebbles and throw them at the pillars, rejecting evil in memory of Ibrahim", 2],
          ["An animal is sacrificed and shared with the poor (Eid al-Adha), the hair is cut or shaved, and pilgrims make a farewell tawaf", 2],
          ["Many pilgrims drink water from the well of Zamzam", 1],
        ],
        modelAnswer: "The Hajj is the pilgrimage to Makkah in the month of Dhul-Hijjah, which every Muslim who is able must make once in a lifetime. Pilgrims enter ihram, a state of purity, in which men wear two white unsewn cloths and women dress simply. This shows equality.\n\nPilgrims walk seven times around the Ka'bah (tawaf) and seven times between Safa and Marwa (sa'i), remembering Hajar's search for water for her son. They stand in prayer on the plain of Arafat from noon to sunset, which is the high point of the Hajj. At Muzdalifah and Mina they gather pebbles and throw them at the pillars, rejecting evil in memory of Ibrahim. An animal is sacrificed and shared with the poor, the hair is cut or shaved and the pilgrims make a farewell tawaf. Many also drink water from the well of Zamzam.",
        explanation: "Two marks for each developed rite in order; one mark for Zamzam.",
      }),
      P.manual({
        label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 300 },
        stem: "Explain why Zakat and Sawm are important in the life of a Muslim.",
        points: [
          ["Both are Pillars and commands of God, so they are acts of obedience", 2],
          ["Zakat (usually 2.5% of qualifying savings held for a year) purifies wealth and teaches that wealth is a trust from God", 2],
          ["Zakat helps the poor and reduces hardship and greed", 2],
          ["Sawm teaches self-control and God-consciousness by fasting from dawn to sunset in Ramadan", 2],
          ["Sawm lets Muslims feel the hunger of the poor, and strengthens family and community life", 2],
        ],
        levels: levels(10),
        modelAnswer: "Zakat and Sawm are important because both are Pillars of Islam and commands of God, so they are acts of obedience. Zakat, usually 2.5 per cent of qualifying savings held for a year, purifies wealth and teaches Muslims that wealth is a trust from God. It helps the poor and reduces hardship and greed.\n\nSawm, fasting from dawn to sunset in Ramadan, teaches self-control and God-consciousness. It lets Muslims feel the hunger of the poor and strengthens family and community life as people break the fast together. Together the two Pillars shape how a Muslim uses wealth and time.",
        explanation: "Level marking: developed reasons linked to Muslim practice reach the top levels.",
      }),
    ]),
    hints: ["In (a) follow the order of the rites and use the names. In (b) give reasons for both Zakat and Sawm."],
    explanation: "A Paper 1 style question: (a) describe the Hajj, (b) explain the importance of Zakat and Sawm.",
  });

  // 5. Paper 1: Muslim rites of passage.
  b.struct({
    ...p1, d: 4,
    concepts: ["frs.islam.rites-passage"],
    stem: "This question is about rites of passage in Islam.",
    parts: checkExam(EXAM.ZIM_P1, [
      P.manual({
        label: "(a)", marks: 15, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 },
        stem: "Describe what happens at a Muslim funeral and burial.",
        points: [
          ["Muslims believe death is the passing to the life after, and those near the dying may recite the Shahadah", 2],
          ["At the news of a death, Muslims say a phrase meaning that we belong to God and to God we return (Qur'an 2:156)", 2],
          ["The funeral takes place as soon as possible, usually within a day", 2],
          ["Ghusl: the body is washed with respect by people of the same sex (or by a spouse)", 2],
          ["Kafan: the body is wrapped in plain white cloth, showing equality", 2],
          ["Janazah: the community prays for the dead, standing, without bowing or prostration", 2],
          ["Burial: the body is placed on its right side in a simple grave facing Makkah; cremation is not allowed", 2],
          ["Mourning lasts three days (four months and ten days for a widow); neighbours bring food", 1],
        ],
        modelAnswer: "Muslims believe that death is the passing to the life after, and those near the dying may recite the Shahadah. At the news of a death Muslims say a phrase meaning that we belong to God and to God we return. The funeral takes place as soon as possible, usually within a day.\n\nThe body is washed with respect (ghusl) by people of the same sex, or by a spouse, and wrapped in plain white cloth (kafan), which shows equality. The community then performs the janazah prayer, standing in rows without bowing or prostration. The body is buried in a simple grave, on its right side facing Makkah; cremation is not allowed. Mourning lasts three days, or four months and ten days for a widow, and neighbours bring food for the family.",
        explanation: "Two marks for each developed stage; one mark for mourning. Credit any accurate account in a sensible order.",
      }),
      P.manual({
        label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 300 },
        stem: "Explain what Muslim rites of passage at birth, marriage and death teach about Muslim beliefs.",
        points: [
          ["Whispering the adhan to the newborn shows that life begins with God and the Shahadah", 2],
          ["Aqiqah, the naming and sharing of meat, teaches thanks to God and generosity to the poor", 2],
          ["Marriage as a contract with consent, mahr and witnesses teaches responsibility, justice and equal dignity of partners", 2],
          ["The plain white shroud and prompt burial teach equality before God", 2],
          ["The funeral prayer and burial facing Makkah express belief in the afterlife and the Day of Judgement", 2],
        ],
        levels: levels(10),
        modelAnswer: "The rites at birth teach that life begins with God. The adhan is whispered to the newborn so that the first words heard are about God, and the aqiqah teaches thanks to God and generosity, since meat is shared with the poor.\n\nMarriage as a contract with consent, mahr and witnesses teaches responsibility, justice and the dignity of both partners. At death the plain white shroud and prompt burial teach equality before God, and the funeral prayer and burial facing Makkah express belief in the afterlife and the Day of Judgement. So each rite expresses a core Muslim belief.",
        explanation: "Level marking: reasons that link rites to beliefs reach the top levels.",
      }),
    ]),
    hints: ["In (a) give the stages in order with the Arabic terms. In (b) link each rite to a belief."],
    explanation: "A Paper 1 style question: (a) describe a funeral and burial, (b) explain what the rites teach about beliefs.",
  });

  // 6. Paper 2: religious attitudes to disability.
  b.struct({
    ...p2, d: 5,
    concepts: ["frs.disability.religious-teachings", "frs.disability.concepts-causes"],
    stem: "This question is about religious attitudes towards disability.",
    parts: checkExam(EXAM.ZIM_P2, [
      P.manual({
        label: "(a)", marks: 15, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 },
        stem: "Describe the teachings and attitudes towards people with disabilities in **two** religions you have studied.",
        points: [
          ["Indigenous Religion: the extended family must care for all members, based on unhu/ubuntu", 2],
          ["Indigenous Religion: some beliefs linked disability to spirits or witchcraft, leading in some families to blame or hiding of children, although elders also teach care", 2],
          ["Judaism: Leviticus 19:14 forbids insulting a deaf person or putting an obstacle before a blind person", 2],
          ["Judaism: every person is made in the image of God; charity (tzedakah) and care are valued", 2],
          ["Christianity: Jesus is reported to have healed blind, deaf and paralysed people (e.g. Mark 10:46-52), showing compassion", 2],
          ["Christianity: John 9:1-3 rejects the idea that disability is a punishment for sin, and 1 Corinthians 12 teaches that every part of the body is needed", 2],
          ["Islam: all are equal before God, and Surah 80 teaches that a blind man seeking guidance must not be turned away", 2],
          ["Islam: duty of care for those in need through Zakat and sadaqah, with adjustments for those unable to fast or go on the Hajj", 1],
        ],
        modelAnswer: "In Indigenous Religion the extended family must care for all its members, based on unhu or ubuntu. Some beliefs linked disability to spirits or witchcraft and, in some families, led to blame or hiding of children, although elders also teach that every child must be cared for.\n\nIn Christianity, Jesus is reported to have healed blind, deaf and paralysed people, such as Bartimaeus (Mark 10:46-52), which Christians see as a sign of compassion. In John 9:1-3 Jesus said that neither the blind man nor his parents had sinned, so many Christians reject the idea that disability is a punishment. In 1 Corinthians 12 Paul teaches that every part of the body is needed. Judaism forbids insulting a deaf person or putting an obstacle before a blind person (Leviticus 19:14), and Islam teaches that all are equal before God, as in Surah 80, where a blind man seeking guidance must not be turned away.",
        explanation: "Two marks for each developed teaching or attitude; credit any two religions. One mark for the final point. A candidate answering on two religions should earn most marks from four developed points on each.",
      }),
      P.manual({
        label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 300 },
        stem: "To what extent do religious teachings help people with disabilities in Zimbabwe today?",
        points: [
          ["Help: teachings of dignity and equality (Leviticus 19:14, John 9, Surah 80, unhu/ubuntu) encourage respect", 2],
          ["Help: churches, mosques and other bodies have started schools, centres and clinics and give charity", 2],
          ["Limits: some beliefs about curses, witchcraft or punishment have caused blame and hiding of children", 2],
          ["Limits: some places of worship are inaccessible and charity can become pity", 2],
          ["A supported judgement, perhaps that religion helps most when teaching is applied with knowledge and rights-based inclusion", 2],
        ],
        levels: levels(10),
        modelAnswer: "Religious teachings help in several ways. Teachings of dignity and equality, such as Leviticus 19:14, John 9, Surah 80 and unhu or ubuntu, encourage respect, and churches, mosques and other bodies have started schools and clinics and give charity.\n\nHowever, some beliefs about curses, witchcraft or punishment have caused blame and led to children being hidden, and some places of worship are inaccessible. Charity can also become pity instead of respect for rights. I conclude that religious teachings help to a large extent, but only where leaders correct myths and put inclusion into practice.",
        explanation: "Level marking: more than one view, ideally from more than one religion, with a supported conclusion, reaches the top levels.",
      }),
    ]),
    hints: ["In (a) choose two religions and give a text and a meaning for each. In (b) give help and limits, then judge."],
    explanation: "A Paper 2 style question: (a) describe attitudes in two religions, (b) assess how far religious teaching helps.",
  });

  // 7. Paper 2: inclusion of people with disabilities.
  b.struct({
    ...p2, d: 5,
    concepts: ["frs.disability.inclusion-rights"],
    stem: "This question is about the inclusion of people with disabilities.",
    parts: checkExam(EXAM.ZIM_P2, [
      P.manual({
        label: "(a)", marks: 15, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 },
        stem: "Explain how schools and places of worship can include people with disabilities.",
        points: [
          ["Build ramps, wide doors and accessible toilets so that people who use wheelchairs can enter", 2],
          ["Provide Braille, large print or a reader for learners and worshippers who are blind or have low vision", 2],
          ["Use sign language or interpreters, and written notes, for people who are deaf", 2],
          ["Train teachers and leaders, and allow extra time or other adjustments in learning", 2],
          ["Give people with disabilities real roles, such as reading, singing, teaching or helping", 2],
          ["Teach that disability is not a punishment and challenge myths and stigma", 2],
          ["Link actions to rights: Constitution sections 22, 56 and 83 and the right to education (section 75)", 2],
          ["Protect against abuse and neglect, for example by reporting to a trusted adult, the police Victim Friendly Unit or Childline on 116", 1],
        ],
        modelAnswer: "Schools and places of worship can include people with disabilities by removing physical barriers. They can build ramps, wide doors and accessible toilets so that people who use wheelchairs can enter. They can provide Braille, large print or a reader for people who are blind or have low vision, and sign language, interpreters or written notes for people who are deaf.\n\nThey can train teachers and leaders and allow extra time or other adjustments in learning. They can give people with disabilities real roles, such as reading, singing, teaching or helping, and teach that disability is not a punishment while challenging myths and stigma. These actions give effect to rights in the Constitution, sections 22, 56, 75 and 83. They should also protect people from abuse and neglect and encourage reporting to a trusted adult, the police Victim Friendly Unit or Childline on 116.",
        explanation: "Two marks for each developed way (state it and say how it removes a barrier); one mark for the protection point.",
      }),
      P.manual({
        label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 300 },
        stem: "How far can religious organisations improve the lives of people with disabilities?",
        points: [
          ["They have started special schools, centres and clinics and can raise funds", 2],
          ["Their teaching of dignity can change attitudes and challenge myths among many believers", 2],
          ["They can make worship and community life accessible and welcoming", 2],
          ["Limits: buildings may be inaccessible, some leaders repeat myths, and charity can become pity; laws and the State must also act", 2],
          ["A supported judgement on how far, balancing religion's influence against the need for rights, law and government", 2],
        ],
        levels: levels(10),
        modelAnswer: "Religious organisations can improve lives to a considerable extent. They have started special schools, centres and clinics and can raise funds, and their teaching of dignity can change the attitudes of many believers and challenge myths. They can also make worship and community life accessible and welcoming.\n\nHowever, there are limits. Buildings may be inaccessible, some leaders still repeat myths, and charity can become pity. Laws and the State must also act to protect rights. I conclude that religious organisations can do a great deal, especially by changing attitudes, but they cannot replace government action and the enforcement of rights.",
        explanation: "Level marking: more than one view and a supported conclusion reach the top levels.",
      }),
    ]),
    hints: ["In (a) give ways and say what barrier each removes. In (b) weigh what religion can do against what only law and the State can do."],
    explanation: "A Paper 2 style question: (a) explain ways of including people with disabilities, (b) assess how far religious organisations can help.",
  });
});
