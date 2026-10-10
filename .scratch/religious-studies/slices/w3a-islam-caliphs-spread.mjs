// W3a: The caliphs and the spread of Islam.
import { concept, P, source, levels } from "../lib.mjs";

concept("frs.islam.caliphs-spread", { file: "islam/caliphs-spread", keyPrefix: "islam.caliphs-spread" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who was the first caliph after the death of the Prophet Muhammad?",
    options: [
      ["Abu Bakr", "Correct: the Companions chose him in 632 CE."],
      ["Umar", "Umar was the second caliph."],
      ["Uthman", "Uthman was the third caliph."],
      ["Ali", "Ali was the fourth caliph."],
    ],
    answer: "A",
    explanation: "**Abu Bakr** became the first caliph in 632 CE. The order is Abu Bakr, Umar, Uthman, Ali.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does the word **caliph** (khalifah) mean?",
    options: [
      ["Successor", "Correct: the successor to the Prophet as leader of the community."],
      ["Prophet", "A prophet receives revelation; a caliph does not."],
      ["Pilgrim", "A pilgrim on the Hajj is a hajji."],
      ["Prayer leader", "The prayer leader is the imam."],
    ],
    answer: "A",
    explanation: "A **caliph** is a successor: the leader of the Muslim community after the Prophet.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which caliph ordered a standard written copy of the Qur'an to be sent to the main cities?",
    options: [
      ["Uthman", "Correct: this made the text the same everywhere."],
      ["Abu Bakr", "Abu Bakr first had the Qur'an gathered into one collection."],
      ["Umar", "Umar is remembered for expansion and organising government."],
      ["Ali", "Ali's time as caliph was a period of civil conflict."],
    ],
    answer: "A",
    explanation: "**Uthman** had a standard text copied and sent to the main cities. **Abu Bakr** earlier had the Qur'an gathered into one collection.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What was the original disagreement between Sunni and Shi'a Muslims about?",
    options: [
      ["Who should lead the Muslim community after the Prophet", "Correct: it began as a dispute about leadership."],
      ["Whether Muslims should pray five times each day at set times", "Both groups keep prayer; they pray on a similar pattern."],
      ["Whether the Qur'an is the word of God revealed to the Prophet", "Both groups accept the Qur'an."],
      ["Whether the Hajj should be made to Makkah once in a lifetime", "Both groups make the Hajj to Makkah."],
    ],
    answer: "A",
    explanation: "Sunni and Shi'a began as a disagreement over **leadership**: Sunni accepted the choice of Companions; Shi'a held that Ali and his descendants should lead.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which port on the coast of present-day Mozambique was linked to the gold trade of the Zimbabwe plateau?",
    options: [
      ["Sofala", "Correct: gold and ivory were shipped from there."],
      ["Mombasa", "Mombasa is on the coast of Kenya."],
      ["Timbuktu", "Timbuktu is in West Africa, at the end of Saharan trade routes."],
      ["Alexandria", "Alexandria is a port in Egypt."],
    ],
    answer: "A",
    explanation: "**Sofala** was the port through which gold and ivory from the plateau reached the Indian Ocean trade.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Tafadzwa reads that Muslim traders carried Islam to West Africa by crossing the Sahara. Which statement best fits this evidence?",
    options: [
      ["Islam spread in West Africa partly through trade and learning", "Correct: traders and teachers carried the faith along the routes."],
      ["Islam reached West Africa only after every ruler was defeated in battle", "Many rulers and merchants accepted Islam by choice."],
      ["The Sahara trade was begun by Muslims who had never left Arabia", "Caravan trade crossed the Sahara before Islam."],
      ["West African rulers refused all contact with Muslim traders and scholars", "Contact with Muslim traders was common."],
    ],
    answer: "A",
    hints: ["Think of who travelled the caravan routes and what they brought."],
    explanation: "Islam reached West Africa partly through **trade, teaching and example**, as well as by Muslim rule in North Africa.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why is the death of Husayn at Karbala in 680 CE especially remembered by Shi'a Muslims?",
    options: [
      ["He was a grandson of the Prophet, the son of Ali, and his death is mourned on Ashura", "Correct: he is a central figure in Shi'a devotion."],
      ["He was the first caliph and his death ended the rule of the caliphs", "Abu Bakr was the first caliph."],
      ["He was the muezzin who gave the first call to prayer in Madinah", "That was Bilal."],
      ["He wrote out the standard copy of the Qur'an for Uthman in Madinah", "That is not his role in the tradition."],
    ],
    answer: "A",
    hints: ["Remember whose son he was and which day is observed."],
    explanation: "**Husayn**, son of Ali and grandson of the Prophet, died at Karbala; Shi'a Muslims mourn him on Ashura.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement about the spread of Islam is the most accurate?",
    options: [
      ["It spread by several means, including rule in some regions and trade in others", "Correct: the routes and causes differed by region."],
      ["It spread only where armies went, and nowhere else in the world at any time", "Trade and teaching carried Islam to many regions."],
      ["It spread by trade alone, and no state ever came under Muslim rule at all", "Muslim rule did extend over large areas."],
      ["It reached southern Africa through a single route in a single century of history", "It reached Africa along several routes over many centuries."],
    ],
    answer: "A",
    hints: ["Avoid answers that use the words only, alone or single."],
    explanation: "The spread of Islam had **several causes**; absolute statements such as \"only by war\" or \"only by trade\" are inaccurate.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Ali, the fourth caliph, was the cousin and son-in-law of the Prophet Muhammad.",
    answer: true,
    explanation: "True. Ali was the Prophet's cousin and married his daughter Fatimah.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Sunni and Shi'a Muslims have completely different holy books.",
    answer: false,
    explanation: "False. Both accept the same Qur'an and the Five Pillars; they differ mainly over leadership after the Prophet and some practices.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each caliph with what he is remembered for.",
    pairs: [["Abu Bakr", "kept the community united; the Qur'an gathered into one collection"], ["Umar", "expansion and organising the government of new lands"], ["Uthman", "a standard written text of the Qur'an sent to the main cities"], ["Ali", "cousin and son-in-law of the Prophet; a time of civil conflict"]],
    explanation: "Abu Bakr: unity and the collection. Umar: expansion. Uthman: the standard text. Ali: cousin of the Prophet and a time of conflict.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The first caliph was {{blank:a}}, and the standard copy of the Qur'an was ordered by {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Abu Bakr"], choices: ["Abu Bakr", "Umar", "Uthman", "Ali"] },
      { id: "b", accepted: ["Uthman"], choices: ["Abu Bakr", "Umar", "Uthman", "Ali"] },
    ],
    explanation: "**Abu Bakr** was the first caliph and **Uthman** ordered the standard Qur'an.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What is the name for the region of the East African coast where Muslim traders from Arabia and Persia built towns such as Kilwa?",
    accepted: ["Swahili coast", "The Swahili coast", "Swahili", "East African coast"],
    wrong: ["Sahara", "Sofala"],
    explanation: "The **Swahili coast** is the East African coastline where African and Arab influences blended.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "Identify **three** places or regions to which Islam spread in Africa.",
    points: ["North Africa (Egypt and the north coast)", "West Africa across the Sahara trade routes", "The East African (Swahili) coast"],
    modelAnswer: "Islam spread to North Africa, including Egypt, to West Africa across the Sahara trade routes, and to the East African Swahili coast.",
    explanation: "One mark for each region.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how the Sunni and Shi'a division began.",
    points: [["After the Prophet died, the community had to choose a leader", 1], ["Most Muslims accepted the choice of senior Companions; they are Sunni", 1], ["Others believed that Ali and his descendants should lead; they are the Shi'a", 1], ["The difference began as political and later affected religious practice", 1]],
    modelAnswer: "When the Prophet died, the community had to choose a leader. Most Muslims accepted the choice of the senior Companions, and they are the Sunni. Others believed that Ali and his descendants should lead, and they are the Shi'a. The difference began over leadership and later affected some religious practices.",
    hints: ["Start with the Prophet's death, then give each group's view."],
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain **two** ways in which trade helped Islam to spread in Africa.",
    points: [
      ["Muslim merchants carried their faith along trade routes, such as across the Sahara or by sea to the Swahili coast", 1],
      ["Developed: local rulers and traders met Muslims, saw their honesty and learning, and some accepted Islam", 2],
      ["Trading towns grew where Muslims settled, with mosques and teachers", 1],
      ["Developed: such towns, like Kilwa, became centres of Muslim learning and life, spreading the faith to nearby peoples", 2],
    ],
    modelAnswer: "Muslim merchants carried their faith along trade routes, such as across the Sahara and by sea to the Swahili coast. Local rulers and traders met them, saw their honesty and learning, and some accepted Islam. Trading towns grew where Muslims settled, with mosques and teachers, and towns such as Kilwa became centres of Muslim life that spread the faith to nearby peoples.",
    hints: ["Give two ways and develop each with an example."],
    explanation: "Two ways, each stated (1) and developed (2).",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "a notice (described in words) from a fictional mosque community in Harare, 2026",
      "A notice board outside a mosque lists the community's history. It says that families of Malawian, Mozambican and Indian origin settled in Zimbabwe in the last century and built the first mosque in the city, and that in recent years many Zimbabweans have also joined. It lists a madrasah for children on Saturday mornings and a charity that supports orphans."
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "According to Source A, what does the madrasah do?",
        options: [
          ["It teaches children on Saturdays", "Correct: the notice gives the day and the group."],
          ["It sells food to pilgrims on the Hajj", "The notice does not say this."],
          ["It trains adults to become caliphs", "Caliphs are not trained in madrasahs."],
          ["It collects rent from the community", "The notice does not say this."],
        ],
        answer: "A", explanation: "The notice says the madrasah is for children on Saturday mornings.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Using Source A, state **three** facts about the Muslim community.",
        points: ["Families of Malawian, Mozambican and Indian origin settled in Zimbabwe and built the first mosque", "Many Zimbabweans have joined the community in recent years", "It runs a madrasah for children and a charity that supports orphans"],
        modelAnswer: "Families of Malawian, Mozambican and Indian origin built the first mosque, many Zimbabweans have joined in recent years, and the community runs a madrasah for children and a charity for orphans.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain how the mosque community in Source A serves the wider society.",
        points: [["It educates children through the madrasah", 1], ["It supports orphans through its charity", 1], ["Muslims are guaranteed freedom to practise their religion by section 60 of the Constitution, so such services can be offered openly", 1]],
        modelAnswer: "The community educates children through the madrasah and supports orphans through its charity. Because section 60 of the Constitution protects freedom of religion, Muslims can offer these services openly.",
      }),
    ],
    hints: ["In (c) link services to the needs of people, not only to Muslims."],
    explanation: "The source shows the origins, the growth and the services of a Muslim community.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1200,
    stem: "Tendai says: \"Islam spread mostly because of armies.\" Aisha replies: \"In Africa, trade and teaching were just as important.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Outline **two** achievements of the caliph Umar.",
        points: [["Muslim rule spread across Syria, Egypt and Persia during his time", 1], ["He organised the government of the new lands", 1], ["He is credited with fixing the start of the Islamic calendar at the Hijrah", 1], ["He led the community for about ten years (634-644 CE)", 1]],
        modelAnswer: "Muslim rule spread across Syria, Egypt and Persia in his time, and he organised the government of the new lands. He is also credited with fixing the start of the Islamic calendar at the Hijrah.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain why Uthman's standard copy of the Qur'an was important.",
        points: [["It meant Muslims in all the cities recited the same text", 2], ["It protected the Qur'an from differences in recitation or copying as the community grew", 2]],
        modelAnswer: "Uthman's standard copy meant that Muslims in all the cities recited the same text. This protected the Qur'an from differences in recitation or copying as the community grew.",
      }),
      P.manual({
        label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 280 },
        stem: "Assess the view that Islam spread in Africa mainly through armies.",
        points: [["For: Muslim rule extended over Egypt and North Africa in the century after the Prophet", 2], ["Against: along the Sahara and the Swahili coast traders, teachers and example carried Islam", 2], ["Link: the routes and causes differed by region, and in many places rulers chose to accept Islam", 2], ["A supported judgement", 2]],
        levels: levels(8),
        modelAnswer: "In North Africa the growth of Muslim rule in the century after the Prophet shows that armies and governors were part of the story. But in West Africa and on the Swahili coast, traders, teachers and example carried Islam, and rulers often chose to accept it. The causes differed by region, so a single explanation is not enough. I conclude that armies were important in North Africa, but across most of the continent trade and teaching were at least as important.",
      }),
    ],
    hints: ["Treat the regions separately before reaching a judgement."],
    explanation: "A strong answer treats regions separately and rejects a single cause.",
  });

  b.card("DEFINITION", "What is a **caliph**?", "A successor to the Prophet as leader of the Muslim community.");
  b.card("FACT", "Who were the four rightly guided caliphs?", "Abu Bakr, Umar, Uthman and Ali, in that order.");
  b.card("FACT", "What did Uthman do for the Qur'an?", "He ordered a standard written copy to be sent to the main cities.");
  b.card("FACT", "What did Abu Bakr do for the Qur'an?", "He had it gathered into one written collection.");
  b.card("CONCEPT", "How did the Sunni and Shi'a division begin?", "As a disagreement about who should lead the community after the Prophet: Sunni accepted the choice of Companions; Shi'a held that Ali and his descendants should lead.");
  b.card("FACT", "How did Islam reach West Africa?", "Mainly through the trans-Saharan trade, merchants and scholars, as well as Muslim rule in North Africa.");
  b.card("FACT", "What was Sofala?", "A port in present-day Mozambique through which gold and ivory from the Zimbabwe plateau were exported.", "Arab-Swahili traders took part in this trade.");
  b.card("FACT", "Which section of the 2013 Constitution protects freedom of religion?", "Section 60 (freedom of conscience, including religion).");
  b.card("FACT", "What is Ashura?", "A day on which many Muslims fast, and which Shi'a Muslims also keep as mourning for Husayn.", "Sunni and Shi'a emphasise different meanings.");
});
