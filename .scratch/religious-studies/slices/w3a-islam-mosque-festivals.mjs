// W3a: The mosque, leaders and Muslim festivals.
import { concept, P, source, levels } from "../lib.mjs";

concept("frs.islam.mosque-festivals", { file: "islam/mosque-festivals", keyPrefix: "islam.mosque-festivals" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the **mihrab** in a mosque?",
    options: [
      ["A niche in the wall showing the direction of the Ka'bah", "Correct: it marks the qiblah."],
      ["A tower from which the call to prayer was traditionally given", "That is the minaret."],
      ["A raised stand with steps from which the Friday sermon is given", "That is the minbar."],
      ["A room with taps where worshippers wash before prayer", "That is the ablution area."],
    ],
    answer: "A",
    explanation: "The **mihrab** is a niche that shows the qiblah. The minbar is the pulpit and the minaret is the tower.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which festival marks the end of Ramadan?",
    options: [
      ["Eid al-Fitr", "Correct: the festival of breaking the fast."],
      ["Eid al-Adha", "Eid al-Adha comes at the end of the Hajj."],
      ["Ashura", "Ashura is observed on 10 Muharram."],
      ["Mawlid an-Nabi", "Mawlid an-Nabi marks the Prophet's birthday."],
    ],
    answer: "A",
    explanation: "**Eid al-Fitr** marks the end of Ramadan, on 1 Shawwal.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What does Eid al-Adha remember?",
    options: [
      ["Ibrahim's willingness to sacrifice his son for God", "Correct: an animal was provided instead."],
      ["The first revelation of the Qur'an on the Night of Power", "That is remembered on Laylat al-Qadr."],
      ["The Prophet's migration from Makkah to Madinah in 622 CE", "That is remembered at the Islamic New Year."],
      ["The birth of the Prophet Muhammad in Makkah around 570 CE", "That is remembered at Mawlid an-Nabi by many Muslims."],
    ],
    answer: "A",
    explanation: "**Eid al-Adha** remembers Ibrahim's obedience; families sacrifice an animal and share the meat with the poor.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why do Muslim festivals move about eleven days earlier each year in the solar calendar?",
    options: [
      ["The Islamic calendar is lunar and about 354 days long", "Correct: the lunar year is shorter than the solar year."],
      ["The Islamic calendar is solar and has 365 days in each year", "It is a lunar, not solar, calendar."],
      ["The festivals are decided by a council that changes the date yearly", "Dates follow the moon, not a yearly decision."],
      ["The Islamic calendar adds an extra month to the year every eleven years", "It does not add extra months."],
    ],
    answer: "A",
    explanation: "The calendar follows the moon: twelve lunar months make about **354 days**, so festivals move earlier through the seasons.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Who leads the prayers in a mosque and usually gives the Friday sermon?",
    options: [
      ["The imam", "Correct: a trained leader, not a priest in Sunni Islam."],
      ["The muezzin", "The muezzin gives the call to prayer."],
      ["The qadi", "The qadi is a judge who applies Islamic law."],
      ["The hafiz", "The hafiz has memorised the Qur'an."],
    ],
    answer: "A",
    explanation: "The **imam** leads prayer and gives the sermon. The muezzin calls to prayer and the qadi judges.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Tendai visits a mosque and notices there are no pictures of people on the walls, only patterns and verses. What does this show?",
    options: [
      ["Islam forbids images of God and avoids images that could be worshipped", "Correct: art is calligraphy and geometry."],
      ["Muslims have no art and consider decoration a waste of the community's money", "Islamic art is rich in calligraphy and pattern."],
      ["The mosque is too new to have been decorated with pictures of people", "The absence of images is a matter of belief."],
      ["The building is a school and not a place of worship for the Muslim community", "A mosque may contain a school, but it is a place of worship."],
    ],
    answer: "A",
    hints: ["Think of the Muslim belief about God and images."],
    explanation: "Muslims believe God cannot be pictured, so mosques are decorated with **calligraphy and geometric patterns**.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which statement about Mawlid an-Nabi is accurate?",
    options: [
      ["Many Muslims observe it, while some do not", "Correct: practice differs."],
      ["All Muslims observe it as one of the two main festivals of the year", "Only Eid al-Fitr and Eid al-Adha are the two main festivals."],
      ["No Muslim observes it, because the Prophet's birthday is not known to anyone", "Many Muslims do observe it."],
      ["It is observed only by Shi'a Muslims, and Sunni Muslims never observe it", "Many Sunni Muslims observe it."],
    ],
    answer: "A",
    hints: ["Remember that practice varies within Islam."],
    explanation: "**Mawlid an-Nabi**, on 12 Rabi al-Awwal, is observed by many Muslims and not by others; the two Eids are the main festivals.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which pair of teachings is most clearly shown by sharing the meat of the Eid al-Adha sacrifice in three parts?",
    options: [
      ["Obedience to God and generosity to the poor", "Correct: Ibrahim's obedience and the duty to give."],
      ["Fear of the Prophet and loyalty to the tribe", "Not a teaching of the festival."],
      ["Self-denial in fasting and thanks for the first revelation", "Those belong to Ramadan."],
      ["Wealth for the family and independence from the community", "Sharing contradicts independence."],
    ],
    answer: "A",
    hints: ["Think of what the story remembers and who receives a share."],
    explanation: "The sacrifice remembers Ibrahim's **obedience**, and sharing with the poor expresses **generosity**.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Islamic calendar begins with the year of the Hijrah.",
    answer: true,
    explanation: "True. Year 1 is 622 CE, when the Prophet migrated from Makkah to Madinah.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In Sunni Islam the imam is a priest who stands between a person and God.",
    answer: false,
    explanation: "False. The imam leads prayer and teaches, but in Sunni Islam there is no priesthood between a person and God.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each leader or practitioner with their role.",
    pairs: [["Imam", "leads the prayer and gives the Friday sermon"], ["Muezzin", "gives the call to prayer"], ["Ulama", "scholars of the Qur'an, Hadith and law"], ["Qadi", "a judge who applies Islamic law"]],
    explanation: "Imam: leads prayer. Muezzin: the adhan. Ulama: scholars. Qadi: judge.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Eid al-Fitr falls on the first day of {{blank:a}}, and Eid al-Adha falls on the {{blank:b}} of Dhul-Hijjah.",
    blanks: [
      { id: "a", accepted: ["Shawwal"], choices: ["Muharram", "Ramadan", "Shawwal", "Rajab"] },
      { id: "b", accepted: ["tenth"], choices: ["first", "fifth", "tenth", "twentieth"] },
    ],
    explanation: "Eid al-Fitr is on 1 **Shawwal**; Eid al-Adha is on the **tenth** of Dhul-Hijjah.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What is the Arabic name for the raised stand with steps from which the imam gives the Friday sermon?",
    accepted: ["Minbar", "Mimbar", "The minbar"],
    wrong: ["Mihrab", "Minaret"],
    explanation: "The **minbar** is the stand for the sermon; the mihrab marks the qiblah.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "Identify **three** roles of the mosque in the Muslim community.",
    points: ["A place for the daily and Friday prayers", "A school (madrasah) where children learn the Qur'an", "A centre for weddings, funerals, charity or advice"],
    modelAnswer: "The mosque is a place for the daily and Friday prayers, a school where children learn the Qur'an, and a centre for weddings, funerals, charity and advice.",
    explanation: "One mark for each role.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how Muslims celebrate Eid al-Fitr.",
    points: [["They give zakat al-fitr before the Eid prayer so the poor can celebrate", 1], ["They attend a special congregational prayer in the morning", 1], ["They wear their best or new clothes and greet one another with \"Eid Mubarak\"", 1], ["They visit family and friends, exchange gifts and share a meal", 1]],
    modelAnswer: "Muslims give zakat al-fitr before the Eid prayer so that the poor can celebrate. They attend a special prayer in the morning, wear their best clothes and greet one another, then visit family and friends, exchange gifts and share a meal.",
    hints: ["Cover giving, prayer, dress and visiting."],
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain **two** reasons why Eid al-Adha is important to Muslims.",
    points: [
      ["It remembers Ibrahim's obedience to God", 1],
      ["Developed: his willingness to sacrifice his son, and the animal provided instead, shows complete trust in God", 2],
      ["It teaches generosity and sharing", 1],
      ["Developed: the meat of the sacrifice is divided so that the poor, relatives and the family all receive a share", 2],
    ],
    modelAnswer: "Eid al-Adha remembers Ibrahim's obedience to God. His willingness to sacrifice his son, and the animal provided instead, shows complete trust in God. It also teaches generosity, since the meat is divided so that the poor, relatives and the family all receive a share.",
    hints: ["Give one reason about the story and one about sharing."],
    explanation: "Two reasons, each stated (1) and developed (2).",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "a description (in words) of a mosque, written for this question; the mosque and town are fictional",
      "A mosque in a town in Manicaland has a large carpeted hall with no furniture. A niche in the front wall faces north. Beside it stands a short stepped stand used by the imam on Fridays. Outside the hall are taps and low stools, and a small tower stands at one corner. Two classrooms at the back hold the children's Qur'an classes on weekday afternoons.",
      { described: true }
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "According to Source A, what is the niche in the front wall?",
        options: [
          ["The mihrab, which shows the direction of prayer", "Correct: it faces the qiblah."],
          ["The minbar, which is used for the Friday sermon", "The minbar is the stepped stand beside it."],
          ["The minaret, which stands at one corner", "The minaret is the small tower."],
          ["The madrasah, where children learn the Qur'an", "The madrasah is the classrooms at the back."],
        ],
        answer: "A", explanation: "The niche is the mihrab; the stepped stand is the minbar and the tower is the minaret.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Using Source A, state **three** features of the mosque.",
        points: ["A large carpeted prayer hall without furniture", "A mihrab in the wall and a stepped minbar beside it", "Taps and stools outside for washing, a small tower, and classrooms for children"],
        modelAnswer: "The mosque has a large carpeted hall without furniture, a mihrab in the front wall with a stepped minbar beside it, and taps outside for washing. It also has a small tower and classrooms for children.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain the purpose of any **two** features described in Source A.",
        points: [["The mihrab shows the qiblah so that everyone faces Makkah", 1], ["The taps are for wudu, which prepares worshippers for prayer", 1], ["The classrooms teach children the Qur'an (or the minbar is used for the sermon)", 1]],
        modelAnswer: "The mihrab shows the qiblah so that everyone faces Makkah. The taps are for wudu, which prepares worshippers for prayer. The classrooms teach children the Qur'an.",
      }),
    ],
    hints: ["In (c) name the feature and say what it is for."],
    explanation: "The source describes the mihrab, minbar, minaret, ablution area and madrasah.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1200,
    stem: "Rudo says: \"Eid al-Fitr is more important than Eid al-Adha, because it celebrates a month of fasting.\" Yusuf says: \"Both are equally important, because each teaches something different.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Outline **two** features of the Islamic calendar.",
        points: [["It is lunar, with twelve months of 29 or 30 days", 1], ["A year is about 354 days, so festivals move about eleven days earlier each year", 1], ["A month begins with the sighting of the new moon", 1], ["Year 1 is the year of the Hijrah, 622 CE", 1]],
        modelAnswer: "The Islamic calendar is lunar, with twelve months of 29 or 30 days, so a year is about 354 days and festivals move about eleven days earlier each year. It counts from the Hijrah in 622 CE.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain why Muslims give zakat al-fitr before the Eid prayer.",
        points: [["It is a small gift of food or its value given for each member of the household", 2], ["It ensures that the poor can celebrate Eid and share in the joy, and purifies the fast", 2]],
        modelAnswer: "Zakat al-fitr is a small gift of food or its value for each member of the household. It ensures that the poor can celebrate Eid and share in the joy, and it purifies the fast.",
      }),
      P.manual({
        label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 280 },
        stem: "Assess the view that Eid al-Fitr and Eid al-Adha are equally important to Muslims.",
        points: [["Eid al-Fitr celebrates the end of Ramadan, thanks to God and generosity to the poor", 2], ["Eid al-Adha remembers Ibrahim's obedience, the Hajj and sharing the sacrifice", 2], ["Both include a special prayer, family gatherings and charity; both are the two main festivals", 2], ["A supported judgement", 2]],
        levels: levels(8),
        modelAnswer: "Eid al-Fitr celebrates the end of Ramadan with thanks to God and generosity to the poor. Eid al-Adha remembers Ibrahim's obedience and links to the Hajj, with the sacrifice shared. Both include a special prayer, family gatherings and charity, and both are the two main festivals. I conclude that they are equally important because each marks a different Pillar and teaches a different lesson.",
      }),
    ],
    hints: ["Say what each festival remembers, what they share, then judge."],
    explanation: "A strong answer compares the two Eids and reaches a supported judgement.",
  });

  b.card("DEFINITION", "What is a **mihrab**?", "A niche in the mosque wall showing the direction of the Ka'bah (qiblah).");
  b.card("DEFINITION", "What is a **minbar**?", "A raised stand with steps from which the imam gives the Friday sermon.");
  b.card("FACT", "Who is the **imam**, and who is the **muezzin**?", "The imam leads prayer and gives the sermon; the muezzin gives the call to prayer.");
  b.card("FACT", "How long is the Islamic year?", "About 354 days, since it is lunar; festivals move about eleven days earlier each year.");
  b.card("FACT", "Which festival marks the end of Ramadan?", "Eid al-Fitr, on 1 Shawwal.");
  b.card("FACT", "What does Eid al-Adha remember?", "Ibrahim's willingness to sacrifice his son in obedience to God.", "Held on 10 Dhul-Hijjah, at the end of the Hajj.");
  b.card("FACT", "What is Mawlid an-Nabi?", "The Prophet's birthday, on 12 Rabi al-Awwal, observed by many Muslims but not all.");
  b.card("FACT", "What is Ashura?", "The tenth of Muharram: many Sunni Muslims fast; Shi'a Muslims also mourn Husayn.");
  b.card("CONCEPT", "Why do mosques have no pictures of living beings?", "Muslims believe God cannot be pictured and avoid images that might be worshipped; mosques use calligraphy and patterns.");
});
