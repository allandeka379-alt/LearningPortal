// W2b: Christianity in Zimbabwe.
// Reviewer notes: dates for Silveira (1561) and the LMS at Inyati (1859) are well established; founding dates of the Apostolic
// churches are given only as "1930s"; ZAOGA 1960 (Ezekiel Guti). No membership figures are given.
import { concept, P, source, ref, levels } from "../lib.mjs";
import { mc, ms, pm } from "../tables/w2b-helpers.mjs";

concept("frs.christianity.zimbabwe", { file: "christianity/zimbabwe", keyPrefix: "christianity.zimbabwe" }, (b) => {
  mc(b, 1, "RECALL", "Which Portuguese Jesuit visited the court of the Mutapa in 1561?",
    ["Gonçalo da Silveira", "Correct: he baptised members of the court and was killed the same year."],
    [["Robert Moffat of the LMS", "Moffat was a missionary of the London Missionary Society who knew Mzilikazi."],
     ["Johane Marange", "Marange founded an Apostolic church in the 1930s."],
     ["Ezekiel Guti", "Guti founded ZAOGA in 1960."]],
    "**Gonçalo da Silveira**, a Portuguese Jesuit, reached the Mutapa court in 1561 and was killed the same year.");
  mc(b, 2, "UNDERSTANDING", "Where did the London Missionary Society open a mission station in 1859?",
    ["Inyati", "Correct: with the permission of King Mzilikazi."],
    [["Chishawasha", "Chishawasha was a Jesuit mission, started in the 1890s."],
     ["Great Zimbabwe", "Great Zimbabwe is an ancient stone-built site, not an LMS station."],
     ["Mutare", "Mutare is a city in the east, where the Methodists and Anglicans later worked."]],
    "The LMS opened its station at **Inyati** in the Ndebele kingdom in **1859**.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What is an African Independent (Initiated) Church?",
    ["A church founded by Africans that uses African forms of worship", "Correct: many in Zimbabwe are called Apostolic churches."],
    [["A church founded by a European missionary society", "That describes a mission church, not an AIC."],
     ["A church that is not part of the Christian religion", "AICs are Christian churches."],
     ["A church run by the government of Zimbabwe", "AICs are independent of the state."]],
    "An **AIC** is founded and led by Africans and combines the Christian faith with African song, dance, prophecy and healing.");
  mc(b, 3, "APPLICATION", "Which of these was an effect of mission schools that historians often point to?",
    ["They trained teachers, nurses and future leaders", "Correct: many nationalist leaders attended mission schools."],
    [["They ended all other forms of education in the country", "Other education existed and the missions never replaced all of it."],
     ["They made all Africans give up their ancestral customs completely", "Some customs continued, and this is one of the debated points."],
     ["They were free from any link with colonial rule or its laws", "Missions were linked to colonisation in various ways."]],
    "Mission schools **trained teachers, nurses and future leaders**. Historians also note links with colonisation and the criticism of African customs.", { hints: ["Choose the effect that most historians agree on."] });
  mc(b, 3, "APPLICATION", "Which church was founded by Ezekiel Guti in 1960?",
    ["ZAOGA (Zimbabwe Assemblies of God Africa)", "Correct: it is a Zimbabwean Pentecostal church."],
    [["The Zion Christian Church of the Lekganyane family", "ZCC began in South Africa under the Lekganyane family."],
     ["The London Missionary Society of the Protestant churches", "The LMS was a British missionary society that began in 1795 and came to Inyati in 1859."],
     ["The Salvation Army of the late nineteenth century", "The Salvation Army is a church founded in England and came to Zimbabwe in the 1890s."]],
    "**ZAOGA** was founded by Ezekiel Guti in 1960.", { hints: ["It is a Pentecostal church that began in Zimbabwe."] });
  mc(b, 3, "ANALYSIS", "Which statement about missionaries in Zimbabwe is fair and balanced?",
    ["They brought schools and clinics and also had links with colonial rule", "Correct: it gives both benefits and criticisms."],
    [["They brought only benefits and no one has ever criticised them", "Historians and believers have raised criticisms."],
     ["They did nothing for education or health in the areas where they worked", "Mission schools and clinics were a major part of their work."],
     ["They all opposed colonial rule from the day they arrived", "Many missionaries supported or accepted colonial rule."]],
    "A fair answer gives **both sides**: benefits (education, health, translation) and criticisms (links to colonisation and criticism of African customs).", { hints: ["Look for the option that gives both sides."] });
  mc(b, 4, "ANALYSIS", "Which reason best explains why African Independent Churches began to grow in the twentieth century?",
    ["Africans wanted leadership roles, African music in worship and prayer for healing", "Correct: these needs were often not met in mission churches."],
    [["Missionaries decided to close all their churches and then leave the country", "Mission churches continued and grew."],
     ["The government made it illegal for Africans to worship in a mission church", "There was no such law."],
     ["Africans wanted to leave the Christian religion for good", "AIC members remain Christian."]],
    "AICs grew because Africans wanted **leadership roles**, **African forms of worship** and **prayer for healing**.", { hints: ["Think of what mission churches often did not offer."] });

  b.tf({ d: 1, skill: "RECALL", stem: "The Constitution of Zimbabwe (2013) protects freedom of conscience, including the freedom to practise religion.", answer: true,
    explanation: "True. Section 60 protects freedom of conscience, which includes religion." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "The Silveira mission to the Mutapa court in 1561 established a church that lasted until the twentieth century.", answer: false,
    explanation: "False. Silveira was killed the same year and the mission did not last." });

  b.match({ d: 3, skill: "UNDERSTANDING",
    stem: "Match each church or person with the correct description.",
    pairs: [["Johane Masowe", "founded a movement in the 1930s; followers pray in open-air sites"], ["Johane Marange", "founded the African Apostolic Church near Mutare"], ["Zion Christian Church", "began in South Africa; has many members in Zimbabwe"], ["Apostolic Faith Mission", "a Pentecostal church that came from South Africa in the early twentieth century"]],
    hints: ["Think of wilderness, Marange near Mutare, the Lekganyane family and early Pentecostalism."],
    explanation: "Masowe: open-air worship. Marange: African Apostolic Church. ZCC: South African origin. AFM: early Pentecostal." });

  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct words.",
    template: "The {{blank:a}} opened a station at Inyati in {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["London Missionary Society"], choices: ["London Missionary Society", "Salvation Army", "Jesuits", "Dutch Reformed Church"] }, { id: "b", accepted: ["1859"], choices: ["1561", "1859", "1890", "1960"] }],
    explanation: "The **London Missionary Society** opened its station at Inyati in **1859**." });
  b.fib({ d: 3, skill: "UNDERSTANDING", stem: "Choose the correct words.",
    template: "Mission stations usually ran a church, a {{blank:a}} and often a {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["school"], choices: ["school", "market", "police post", "mine"] }, { id: "b", accepted: ["clinic"], choices: ["clinic", "casino", "factory", "airfield"] }],
    hints: ["Think of education and health."],
    explanation: "Mission stations often had a church, a **school** and a **clinic** or hospital." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the Ndebele king who gave the London Missionary Society permission to settle at Inyati.",
    accepted: ["Mzilikazi", "King Mzilikazi", "Mzilikazi kaMashobane"], wrong: ["Lobengula", "Mutapa"],
    explanation: "King **Mzilikazi** gave permission for the LMS to settle at Inyati." });

  ms(b, 3, "UNDERSTANDING", 3, "State **three** ways in which the missions helped people in Zimbabwe.",
    ["They ran schools that taught reading, writing and trades", "They ran clinics and hospitals, especially in rural areas", "They trained teachers, nurses and clergy", "They translated the Bible into African languages and wrote down the languages", "They taught farming and building skills"],
    "The missions ran schools that taught reading, writing and trades, ran clinics and hospitals in rural areas, and translated the Bible into African languages.",
    "One mark for each way, to a maximum of three.", ["Think of education, health and language."]);
  ms(b, 3, "UNDERSTANDING", 4, "Describe the work of Gonçalo da Silveira in 1561.",
    [["He was a Portuguese Jesuit priest who travelled to the court of the Mutapa", 1], ["He was received with honour and baptised members of the court", 1], ["Advisers persuaded the ruler that he was a danger", 1], ["He was killed the same year and the mission did not last", 1]],
    "Gonçalo da Silveira was a Portuguese Jesuit who travelled to the court of the Mutapa in 1561. He was received with honour and baptised members of the court, but advisers persuaded the ruler that he was a danger and he was killed the same year, so the mission did not last.",
    "One mark for each point.", ["Say who he was, what he did, why it ended and when."]);
  ms(b, 4, "ANALYSIS", 6, "Explain **two** reasons why African Independent Churches attract members.",
    [["They offer worship that uses African music, dance and drumming", 1], ["Developed: members feel that the faith is expressed in their own culture, so worship feels at home", 2], ["They give leadership roles and a strong sense of community", 1], ["Developed: members find belonging, spiritual care and discipline, and ordinary people can become leaders", 2]],
    "African Independent Churches attract members because they offer worship with African music, dance and drumming, so members feel that the faith is expressed in their own culture. They also give a strong sense of community and open leadership roles, so members find belonging and spiritual care and ordinary people can become leaders.",
    "Two reasons, each stated and developed.", ["One reason about worship style, one about community and leadership."]);

  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "an extract from a fictional school history project in Masvingo, 2026",
      "In 1859 the London Missionary Society opened a station at Inyati. Later missions built schools and clinics across the country. Some people welcomed the education. Others said that the missionaries criticised ancestral customs and came with the colonisers. In the twentieth century Africans began churches of their own."
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({ label: "(a)", stem: "According to Source A, what did later missions build across the country?",
        options: [["Schools and clinics", "Correct: Source A says this."], ["Railway lines and mines", "Source A does not mention these."], ["Palaces for the chiefs", "Source A does not mention these."], ["Markets and banks", "Source A does not mention these."]],
        answer: "A", explanation: "Source A says later missions built schools and clinics." }),
      pm({ label: "(b)", marks: 3, stem: "Using Source A, state **three** views about the missionaries.",
        points: ["Some people welcomed the education they brought", "Others said missionaries criticised ancestral customs", "Others said missionaries came with the colonisers"],
        modelAnswer: "Source A says that some people welcomed the education the missionaries brought, that others said they criticised ancestral customs, and that others said they came with the colonisers." }),
      pm({ label: "(c)", marks: 4, stem: "Explain why Africans began their own churches in the twentieth century.",
        points: [["They wanted leadership roles that mission churches often reserved for Europeans", 1], ["They wanted worship that used African music and dance", 1], ["They wanted prayer for healing and prophecy", 1], ["They wanted the Bible read in their own languages and ideas", 1]],
        modelAnswer: "Africans began their own churches because they wanted leadership roles that mission churches often reserved for Europeans, and worship that used African music and dance. They also wanted prayer for healing and prophecy, and the Bible read in their own languages and ideas." }),
    ],
    hints: ["In (c) think of leadership, worship style and healing."],
    explanation: "Source A gives views on missions; (c) asks why Africans founded churches." });
  b.struct({ d: 4, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "Rudo says: \"Missionaries were good for Zimbabwe because they brought schools and clinics.\" Her teacher says: \"Historians also note that many missionaries accepted colonial rule and criticised African customs.\"",
    parts: [
      pm({ label: "(a)", marks: 4, stem: "Outline **two** missions that came to Zimbabwe after 1890.",
        points: [["Jesuits (Catholic) at Chishawasha", 1], ["Methodists, in the east", 1], ["Anglicans in the eastern highlands", 1], ["Dutch Reformed Church near Masvingo", 1], ["Salvation Army, Seventh-day Adventists or the Brethren in Christ", 1]],
        modelAnswer: "The Jesuits, who are Catholics, opened a mission at Chishawasha. The Dutch Reformed Church also opened a mission near Masvingo." }),
      pm({ label: "(b)", marks: 4, stem: "Explain how the missions affected education in Zimbabwe.",
        points: [["Mission schools taught reading, writing and trades to many who had no other schools", 2], ["They produced teachers, nurses and leaders; however, the education was sometimes limited and did not treat Africans equally", 2]],
        modelAnswer: "Mission schools taught reading, writing and trades to many people who had no other schools, and they produced teachers, nurses and leaders. However, the education was sometimes limited and did not treat Africans equally." }),
      pm({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 220 }, stem: "Assess the view that the work of the missionaries was good for Zimbabwe.",
        points: [["For: schools, hospitals, Bible translation and the training of leaders", 2], ["Against: links with colonisation, criticism of African religion and customs, and European control of churches", 2], ["A supported judgement", 2]],
        levels: levels(6),
        modelAnswer: "The missionaries brought schools and hospitals, translated the Bible into African languages and trained teachers and leaders. However, they were linked with colonisation, criticised ancestral religion and customs, and kept control of the churches in European hands. On balance their work brought lasting benefits in education and health, but it also had costs, and the verdict depends on which effects are weighed most." }),
    ],
    hints: ["Give the benefits, the criticisms, and then a judgement."],
    explanation: "A balanced answer weighs benefits against criticisms and reaches a judgement." });

  b.card("DEFINITION", "What is a **mission station**?", "A settlement set up by a church to spread Christianity, usually with a church, a school and often a clinic.");
  b.card("DEFINITION", "What is an **African Independent Church**?", "A church founded by Africans that combines Christian faith with African forms of worship, prophecy and healing.");
  b.card("FACT", "Who visited the Mutapa court in 1561?", "Gonçalo da Silveira, a Portuguese Jesuit, who was killed the same year.");
  b.card("FACT", "When and where did the LMS open a station in the Ndebele kingdom?", "At Inyati in 1859, with the permission of King Mzilikazi.");
  b.card("FACT", "Name four missions that came after the 1890s.", "For example Jesuits, Methodists, Anglicans, Dutch Reformed, Salvation Army, Seventh-day Adventists, Brethren in Christ.");
  b.card("FACT", "Who founded ZAOGA, and when?", "Ezekiel Guti, in 1960.");
  b.card("FACT", "Name two Apostolic leaders from the 1930s.", "Johane Masowe and Johane Marange.");
  b.card("CONCEPT", "Why is the link between missions and colonisation debated?", "Missions brought education and health, but many missionaries came with the colonisers or accepted colonial rule and criticised African customs.");
  b.card("CONCEPT", "Why did Africans found their own churches?", "To have leadership roles, African forms of worship and prayer for healing.");
});
