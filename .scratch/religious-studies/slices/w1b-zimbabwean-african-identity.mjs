// W1b: Religion, Zimbabwean identity and African identity.
import { concept, P, source, levels } from "../lib.mjs";

concept("frs.family.zimbabwean-african-identity", { file: "family/zimbabwean-african-identity", keyPrefix: "family.zimbabwean-african-identity" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **Africanisation** of a religion?",
    options: [
      ["Adapting a religion to African languages, music and ways of life", "Correct: for example, hymns in Shona and Ndebele."],
      ["Removing all African customs from a religion so that it matches its foreign origin", "That is the opposite of Africanisation."],
      ["Making a religion the official state religion of every African country", "Africanisation is about adaptation, not state religion."],
      ["Stopping the spread of any religion that did not begin in Africa itself", "Africanisation does not oppose the spread of religions."],
    ],
    answer: "A",
    explanation: "Africanisation means that a religion that came from outside is shaped by African languages, music, leaders and ways of life.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which site is a World Heritage cultural landscape linked to Mwari shrines?",
    options: [
      ["The Matobo Hills", "Correct: inscribed in 2003."],
      ["Lake Kariba", "Lake Kariba is a large artificial lake on the Zambezi, not a landscape linked to Mwari shrines."],
      ["The Eastern Highlands", "The Eastern Highlands are a mountain range and are not the site of the Mwari shrines."],
      ["Hwange National Park", "Hwange is a wildlife park."],
    ],
    answer: "A",
    explanation: "The Matobo Hills were inscribed on the UNESCO World Heritage List in 2003 as a cultural landscape.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which pair of spirit mediums is honoured in Zimbabwe's history for their leadership in the First Chimurenga?",
    options: [
      ["Nehanda and Kaguvi", "Correct: both were spirit mediums and leaders of the resistance."],
      ["Lobengula and Mzilikazi", "These were Ndebele kings, not spirit mediums in the uprisings."],
      ["Mutota and Matope", "These were rulers of the Mutapa state in the fifteenth century."],
      ["Gatsi Rusere and Mavhura", "These were rulers of the Mutapa state in the seventeenth century, a different period."],
    ],
    answer: "A",
    explanation: "Nehanda (Charwe Nyakasikana) and Kaguvi were spirit mediums and leaders of the First Chimurenga, executed in 1898.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which feature of many African Independent Churches shows Africanisation of Christianity?",
    options: [
      ["Worship in African languages with drumming and communal singing", "Correct: African forms of worship."],
      ["A rule that only European leaders may serve as bishops or ministers", "That would be the opposite of Africanisation."],
      ["The banning of all African music and dance from every church service", "AICs use music and dance."],
      ["The use of Latin as the only language of prayer and preaching in services", "Africanisation uses local languages."],
    ],
    answer: "A",
    explanation: "AICs use African languages, music and leadership.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Nokuthula uses her Ndebele name at work and says it tells her family's story. What does this show?",
    options: [
      ["A name can express personal and cultural identity", "Correct: a name links a person with family and community."],
      ["Names have no connection with the identity of a person or a family", "A name often expresses identity."],
      ["A person must use only one name in every setting throughout life", "People may use different names in different settings."],
      ["Using an African name is required by the Constitution of Zimbabwe", "The Constitution does not require African names; it protects cultural choice."],
    ],
    answer: "A",
    explanation: "Names carry meaning and link a person with family, community and wider heritage.",
    hints: ["What does the name say about Nokuthula's family?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which statement about Zimbabwe as a multi-faith nation is supported by the Constitution?",
    options: [
      ["It protects freedom of conscience, including the right to practise and change one's religion", "Correct: section 60."],
      ["It names one religion as the official religion that all citizens must follow", "The Constitution does not name an official state religion."],
      ["It forbids people to change from one religion to another without government permission", "Section 60 protects the right to change religion."],
      ["It allows traditional leaders to decide which religion each family must follow", "Religion is a matter of each person's conscience."],
    ],
    answer: "A",
    explanation: "Section 60 protects freedom of conscience, and section 56 protects equality and non-discrimination.",
    hints: ["Think of section 60."],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement is the best judgement about religion and national identity?",
    options: [
      ["Several religions contribute to national identity, and respect for all is part of it", "Correct: a balanced and inclusive view."],
      ["Only one religion can express a true national identity, and the others weaken it", "This ranks religions and ignores the multi-faith nation."],
      ["Religion has no connection with national identity because identity depends only on language", "Religion is one of several contributors."],
      ["National identity requires every citizen to follow the same religious rituals each year", "This conflicts with freedom of conscience."],
    ],
    answer: "A",
    explanation: "A balanced answer recognises the contributions of IR, Christianity, Islam and Judaism and the value of mutual respect.",
    hints: ["Avoid statements that rank religions or say 'only'."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Zimbabwe's 2013 Constitution names one religion as the official religion of the country.",
    answer: false,
    explanation: "False. The Constitution does not name an official state religion. Section 60 protects freedom of conscience.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Many African communities share beliefs in a supreme being, respect for ancestors and ubuntu.",
    answer: true,
    explanation: "True. These are widely described features of African religious thought, though details differ between peoples.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each contribution to identity with an example.",
    pairs: [["Heritage site", "the Matobo Hills cultural landscape"], ["Language", "Shona and Ndebele words for God and the ancestors"], ["Value", "ubuntu: a person is a person through other people"], ["National figure", "Nehanda (Charwe Nyakasikana)"]],
    explanation: "IR contributes to identity through sites, language, values and figures.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Matobo Hills were inscribed on the UNESCO World Heritage List in {{blank:a}} as a {{blank:b}} landscape.",
    blanks: [
      { id: "a", accepted: ["2003"], choices: ["1986", "2003", "1999", "2013"] },
      { id: "b", accepted: ["cultural"], choices: ["cultural", "military", "industrial", "marine"] },
    ],
    explanation: "2003; cultural landscape. Great Zimbabwe and Khami were inscribed in 1986.",
    hints: ["It was in the early 2000s."],
  });
  b.fib({
    d: 3, skill: "RECALL",
    stem: "Choose the correct section numbers.",
    template: "Section {{blank:a}} of the Constitution protects equality and non-discrimination, and section {{blank:b}} protects freedom of conscience.",
    blanks: [
      { id: "a", accepted: ["56"], choices: ["22", "56", "78", "251"] },
      { id: "b", accepted: ["60"], choices: ["17", "60", "81", "83"] },
    ],
    explanation: "Section 56 (equality) and section 60 (conscience).",
    hints: ["Both are in the Declaration of Rights."],
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which Nguni saying means \"a person is a person through other people\"?",
    accepted: ["umuntu ngumuntu ngabantu", "Umuntu ngumuntu ngabantu"],
    wrong: ["chara chimwe"],
    explanation: "**Umuntu ngumuntu ngabantu** expresses ubuntu.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State **three** ways in which Indigenous Religion contributes to Zimbabwean identity.",
    points: ["Heritage and sacred sites such as the Matobo Hills", "Languages and names for God and the ancestors", "Values such as ubuntu, or national figures such as Nehanda and Kaguvi"],
    modelAnswer: "Heritage and sacred sites such as the Matobo Hills; Shona and Ndebele words and names; and values such as ubuntu.",
    explanation: "One mark for each way.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe **two** ways in which Christianity has been Africanised in Zimbabwe.",
    points: [["African Independent Churches were founded by Africans and use African forms of worship (drumming, dance, communal singing)", 2], ["Mainline churches use Shona and Ndebele hymns, African leaders and local music", 2]],
    modelAnswer: "African Independent Churches were started by Africans and use drumming, dance and communal singing in worship. Mainline churches also use Shona and Ndebele hymns and local music and have African leaders.",
    hints: ["One way for AICs and one way for mainline churches."],
    explanation: "Two marks for each described way.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why respect for different religions is important in a multi-faith nation like Zimbabwe.",
    points: [
      ["The Constitution protects freedom of conscience and equality", 1],
      ["Developed: every citizen has the right to practise or change religion without discrimination, so respect protects rights", 1],
      ["It promotes peace and unity", 1],
      ["Developed: people who understand one another's beliefs are less likely to quarrel, and can cooperate in burial societies and school committees", 1],
      ["It enriches national identity", 1],
      ["Developed: each religion contributes values, art and community life, so a nation that respects all of them draws on more", 1],
    ],
    modelAnswer: "The Constitution protects freedom of conscience and equality, so every citizen has the right to practise or change religion without discrimination; respect protects those rights. Respect also promotes peace and unity, because people who understand one another's beliefs are less likely to quarrel and can cooperate in burial societies and school committees. It enriches national identity too, since each religion contributes values, art and community life.",
    hints: ["Give three reasons: rights, peace, enrichment."],
    explanation: "Three developed reasons.",
  });

  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "a speech by a fictional head girl at a school assembly, Gweru, 2026",
      "In our school we have Christian, Muslim, Jewish and Indigenous Religion families. At our heritage day we sang in Shona and Ndebele, a member of our community read a prayer, and our grandparents told us how our names came to us. I felt proud to be Zimbabwean and African, and proud that we respect one another's beliefs."
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which idea does the head girl express?",
        options: [
          ["Respect for different beliefs is part of national identity", "Correct: she is proud that people respect one another's beliefs."],
          ["Only the religion of the grandparents should be taught in the school", "She values all faiths."],
          ["Heritage day should be held without any religious or cultural activities", "The day includes songs, prayer and stories."],
          ["Names have no connection with identity in a modern school community", "She says names tell family stories."],
        ],
        answer: "A", explanation: "She values the school's different faiths and her national and African identity.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "State **three** ways in which identity was expressed on the heritage day.",
        points: ["Singing in Shona and Ndebele", "A prayer read by a member of the community", "Grandparents explaining how names came to the family"],
        modelAnswer: "Singing in Shona and Ndebele; a prayer; grandparents explaining the names.",
      }),
      P.manual({
        label: "(c)", marks: 4, stem: "Explain **two** reasons why the head girl may feel proud to be both Zimbabwean and African.",
        points: [["Shared languages and names link her to Zimbabwe and to wider African culture", 2], ["Respect for different beliefs and shared values such as ubuntu link her to both the nation and Africa", 2]],
        modelAnswer: "The languages and names used at the heritage day link her to Zimbabwe and to a wider African culture. The respect for different beliefs and shared values such as ubuntu also link her to the nation and to African traditions.",
      }),
    ],
    hints: ["Use languages and names, and respect and values."],
    explanation: "The source links identity with language, names and respect for different beliefs.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "Themba says: \"Only Indigenous Religion expresses true African identity.\" Aisha says: \"Christianity and Islam are also part of African identity.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Give **two** features of Indigenous Religion that are shared with many African communities.",
        points: [["Belief in a supreme being who made the world", 2], ["Respect for ancestors and a strong sense of community (ubuntu)", 2]],
        modelAnswer: "Belief in a supreme being who made the world, and respect for ancestors together with a strong sense of community (ubuntu).",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain **two** ways in which Christianity or Islam has become part of African life.",
        points: [["African Independent Churches and local hymns in African languages show Christianity in African forms", 2], ["Islam has been present in Africa from the seventh century and spread along trade routes, with local communities using local languages", 2]],
        modelAnswer: "African Independent Churches and hymns in African languages show Christianity in African forms. Islam has been present in Africa since the seventh century, spreading along trade routes, and local communities use local languages as well as Arabic.",
      }),
      P.manual({
        label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 220 },
        stem: "To what extent does Indigenous Religion alone express African identity?",
        points: [["For: IR is rooted in African languages, ancestors and communities", 2], ["Against: Christianity and Islam have lived in Africa for centuries and are part of many Africans' identities", 2], ["A supported judgement", 2]],
        levels: levels(6),
        modelAnswer: "Indigenous Religion is deeply rooted in African languages, ancestors and communities, so it expresses African identity strongly. However, Christianity and Islam have also lived in Africa for centuries, have been Africanised, and are part of many Africans' identity. It is therefore not the only expression: African identity is shaped by several religions as well as by shared values such as ubuntu.",
      }),
    ],
    hints: ["Give evidence for Themba's and Aisha's views."],
    explanation: "A balanced answer values IR without ranking religions.",
  });

  b.card("DEFINITION", "What is **Africanisation** of a religion?", "Adapting a religion that came from outside to African languages, music, leaders and ways of life.");
  b.card("FACT", "When were the Matobo Hills inscribed as a World Heritage cultural landscape?", "2003.");
  b.card("FACT", "Who were Nehanda and Kaguvi?", "Spirit mediums and leaders in the 1896-97 uprisings; executed in 1898.");
  b.card("FACT", "What does \"umuntu ngumuntu ngabantu\" mean?", "A person is a person through other people (ubuntu).");
  b.card("CONCEPT", "Name three ways IR contributes to Zimbabwean identity.", "Heritage sites, languages, values (ubuntu), national figures, ceremonies.");
  b.card("CONCEPT", "What do many African communities share in belief?", "A supreme being, respect for ancestors and a strong sense of community.");
  b.card("FACT", "Which sections of the 2013 Constitution protect equality and freedom of conscience?", "Section 56 (equality and non-discrimination) and section 60 (freedom of conscience and religion).");
  b.card("CONCEPT", "What is a multi-faith nation?", "A country whose people follow many religions and whose laws allow them to live together with respect.");
});
