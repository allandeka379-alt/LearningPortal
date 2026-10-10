// W4b: Religion and social responsibility (Topic 14.3).
// Reviewer notes: zakat is described as usually 2.5% of qualifying savings held for a lunar year (the brief's wording); tithe
// as a tenth (Malachi 3:10, Leviticus 27:30 not cited); Leviticus 19:9-10, Deuteronomy 24:19-21, Matthew 25:35-40, Mark 12:31,
// Romans 13:1-7 and Qur'an 2:177 and 9:60 are paraphrased. The Zunde raMambo practice is described in general terms; check the
// wording on its revival against recent government policy before publication. No statistics.
import { concept, P, source, levels } from "../lib.mjs";
import { mc, pmc, ms } from "../tables/w4b-helpers.mjs";

concept("frs.rights.social-responsibility", { file: "rights/social-responsibility", keyPrefix: "rights.social-responsibility" }, (b) => {
  mc(b, 1, "RECALL", "What does the Jewish term *tzedakah* mean?",
    ["Righteous giving to help people in need", "Correct: tzedakah is a duty of justice and generosity."],
    [["A day of fasting and prayer for the forgiveness of sins", "That describes Yom Kippur."],
     ["A festival at which candles are lit for eight nights in winter", "That describes Hanukkah."],
     ["A prayer shawl worn by men at morning prayers in the synagogue", "That describes the tallit."]],
    "**Tzedakah** is righteous giving to help people in need.");
  mc(b, 1, "RECALL", "Which pillar of Islam is the duty to give a share of wealth to the needy?",
    ["Zakat", "Correct: zakat."],
    [["Sawm", "Sawm is fasting in Ramadan."],
     ["Salah", "Salah is the five daily prayers."],
     ["Hajj", "Hajj is the pilgrimage to Makkah."]],
    "**Zakat** is the pillar of giving to the needy.");
  mc(b, 2, "UNDERSTANDING", "What is the Zunde raMambo (Shona) or Isiphala seNkosi (Ndebele)?",
    ["A communal field or granary kept to help the vulnerable", "Correct: the community works it for orphans, the old and families hit by drought."],
    [["A private garden used by the chief's own family alone", "It is communal and benefits the vulnerable."],
     ["A shrine of the Mwari cult in the Matopo Hills of Matabeleland", "That describes Njelele and Matonjeni."],
     ["A school started by missionaries in the early years of colonial rule", "It is not a school."]],
    "The **Zunde raMambo/Isiphala seNkosi** is a communal field or granary that supports the vulnerable.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What portion does the tithe represent in Christian teaching?",
    ["A tenth", "Correct: a tithe is a tenth."],
    [["A fifth", "A fifth is not a tithe."],
     ["A half", "A half is not a tithe."],
     ["A hundredth", "A hundredth is not a tithe."]],
    "A **tithe** is a tenth.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which is an example of volunteering?",
    ["A pupil helps at a church-run feeding scheme without pay", "Correct: volunteering is giving time and skills without payment."],
    [["A nurse works her normal paid shift in a mission clinic", "This is paid employment."],
     ["A shop owner sells goods at a profit to customers", "This is trade."],
     ["A person pays a fine after being summoned to a court", "This is not voluntary service."]],
    "**Volunteering** is giving time and skills without payment.");
  mc(b, 3, "APPLICATION", "At harvest, Farai's family brings a share of their grain to the headman's granary, which is used to feed orphans and the old in the district. Which practice is this?",
    ["The Zunde raMambo or Isiphala seNkosi", "Correct: it is a communal store for the vulnerable."],
    [["The Islamic duty of zakat at the end of Ramadan", "Zakat is a Muslim duty with its own rules."],
     ["The Jewish rest from work on Shabbat each week", "Shabbat is a day of rest."],
     ["The Christian celebration of Easter in the spring", "Easter is a Christian festival."]],
    "A communal grain store for orphans and the old is the **Zunde raMambo/Isiphala seNkosi**.",
    { hints: ["Think about who the grain is for."] });
  mc(b, 3, "ANALYSIS", "Study Source A.\n\n" + source("Source A", "an extract from the report of a fictional parish, Masvingo, 2026",
    "Our feeding scheme serves meals to pupils at the local school, and volunteers visit the sick at home. Offerings from the congregation pay for bursaries. However, the number of families who ask us for help is greater than we can serve, and we are asking the council and other groups to work with us.") + "\n\nWhich statement is best supported by Source A?",
    ["The parish helps many people but cannot meet every need alone", "Correct: needs are greater than its resources."],
    [["The parish has solved all of the community's problems", "The source says the need is greater than the parish can serve."],
     ["The parish refuses to work with the council or other groups", "The parish is asking to work with them."],
     ["The parish helps only members of its own congregation", "The source mentions pupils at the local school."]],
    "The parish gives valuable help, but **demand is greater than its resources**.",
    { hints: ["Look at the last sentence of the source."] });
  mc(b, 4, "EVALUATION", "Which judgement about the welfare work of religious organisations is best supported?",
    ["They are important partners, but cannot meet every need on their own", "Correct: they work best with the state and the community."],
    [["They can replace the state in every part of public service", "Resources and reach are limited."],
     ["They do nothing of value for people outside their own membership", "Many serve everyone in the community."],
     ["They are the only organisations that care for the poor", "Government, NGOs and communities also care."]],
    "Religious organisations are **important partners** with the state and the community, but they cannot meet every need alone.",
    { hints: ["Choose the answer that recognises both value and limits."] });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "In Islam, zakat is only voluntary charity and is not one of the Five Pillars.",
    answer: false,
    explanation: "False. Zakat is one of the Five Pillars. Voluntary charity is called sadaqah.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Religions teach respect for just laws, and believers may work peacefully to change laws they think are unjust.",
    answer: true,
    explanation: "True. Good citizenship includes obeying just laws and using peaceful means to seek change where laws are thought to be unjust.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Tzedakah", "Jewish righteous giving to help those in need"],
      ["Zakat", "A pillar of Islam: a share of wealth given to the needy"],
      ["Tithe", "A Christian offering of a tenth"],
      ["Zunde raMambo", "A communal field kept to help the vulnerable"],
    ],
    explanation: "Each term belongs to a different religion's tradition of giving.",
  });
  b.fib({
    d: 3, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "In Islam the compulsory giving to the needy is called {{blank:a}}, and in Judaism righteous giving is called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["zakat"], choices: ["zakat", "sawm", "hajj", "salah"] },
      { id: "b", accepted: ["tzedakah"], choices: ["tzedakah", "kashrut", "Purim", "Shabbat"] },
    ],
    hints: ["Remember the key fact box."],
    explanation: "**Zakat** in Islam and **tzedakah** in Judaism.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the Shona name for the communal field kept by the chief to help the needy.",
    accepted: ["zunde raMambo", "zunde ramambo", "zunde ra mambo", "zunde remambo", "zunde"],
    wrong: ["tzedakah"],
    explanation: "It is the **Zunde raMambo** (Ndebele: *Isiphala seNkosi*).",
  });

  ms(b, 1, "RECALL", 3, "State **three** examples of welfare work done by religious organisations.",
    ["Orphanages and care for orphans", "Mission hospitals and clinics, or homes for the elderly", "Feeding schemes, disaster relief or education bursaries"],
    "Religious organisations run orphanages, mission hospitals and clinics, and feeding schemes and disaster relief.",
    "One mark for each example.");
  ms(b, 3, "UNDERSTANDING", 4, "Describe how the Zunde raMambo/Isiphala seNkosi works.",
    ["The chief and council set aside a field", "The community works the field together", "The harvest is stored in a granary", "It is used to feed orphans, the old, people with disabilities and families hit by drought"],
    "The chief and council set aside a field which the community works together. The harvest is stored in a granary and is used to feed orphans, the old, people with disabilities and families hit by drought.",
    "One mark for each point.",
    ["Think of the field, the work, the store and the use."]);
  ms(b, 4, "ANALYSIS", 6, "Explain **two** reasons why good citizens pay taxes and protect public property.",
    [["Taxes pay for schools, clinics and roads", 1], ["Developed: if people do not pay, public services cannot be provided for everyone, including the poor", 2],
     ["Public property belongs to the community", 1], ["Developed: damage to water points or buildings harms everyone and is expensive to repair, so protecting it shows respect and responsibility", 2]],
    "Taxes pay for schools, clinics and roads, and if people do not pay, public services cannot be provided for everyone, including the poor. Public property belongs to the community, and damage to water points or buildings harms everyone and is expensive to repair, so protecting it shows respect and responsibility.",
    "Two reasons, each stated and developed.",
    ["Think of what taxes pay for and who owns public property."]);

  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "an extract from a fictional newsletter of an interfaith group, Bulawayo, 2026",
      "This term our members collected blankets for a children's home, helped repaint a clinic waiting room and ran a soup kitchen on Saturdays. Muslim families gave zakat for the fund, Christian families gave offerings and Jewish families gave tzedakah. All volunteers wore the same yellow shirts.") + "\n\nStudy Source A and answer the questions.",
    parts: [
      pmc("(a)", "Which Muslim duty is mentioned in Source A?",
        ["Zakat", "Correct: Muslim families gave zakat."],
        [["Hajj", "Hajj is not mentioned."],
         ["Sawm", "Sawm is not mentioned."],
         ["Salah", "Salah is not mentioned."]],
        "Zakat is the Muslim duty mentioned."),
      P.manual({
        label: "(b)", marks: 3, stem: "Using Source A, identify **three** activities of the interfaith group.",
        points: ["Collected blankets for a children's home", "Helped repaint a clinic waiting room", "Ran a soup kitchen on Saturdays"],
        modelAnswer: "They collected blankets for a children's home, helped repaint a clinic waiting room and ran a soup kitchen on Saturdays.",
      }),
      P.manual({
        label: "(c)", marks: 4, stem: "Explain why it is valuable for members of different religions to work together in this way.",
        points: [["They combine resources and volunteers, so they can help more people", 2], ["They show respect between religions and build trust in the community", 2]],
        modelAnswer: "They combine resources and volunteers, so they can help more people. They also show respect between religions and build trust in the community.",
      }),
    ],
    hints: ["In (c) think of both the practical gain and the gain in relationships."],
    explanation: "The source shows religions sharing a common social responsibility.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1200,
    stem: "Two fictional students disagree. Tendai says: \"Religious organisations do more for the poor than anyone else.\" Rudo says: \"Religious organisations help, but the poor also need the state, the community and fair laws.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Outline **two** religious teachings about giving to those in need.",
        points: [["Judaism: tzedakah is a duty, and the Torah asks that part of the harvest be left for the poor (Leviticus 19:9-10)", 2], ["Islam: zakat is a pillar, paid to the poor and other recipients (Qur'an 9:60); or Christianity: tithes and offerings and caring for the least (Matthew 25:35-40)", 2]],
        modelAnswer: "In Judaism tzedakah is a duty, and the Torah asks that part of the harvest be left for the poor (Leviticus 19:9-10). In Islam zakat is a pillar, paid to the poor and other recipients (Qur'an 9:60).",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain **one** way in which the Zunde raMambo/Isiphala seNkosi shows social responsibility.",
        points: [["The community works the chief's field together", 1], ["Developed: it shows sharing and unity, and that the community is responsible for its members", 1], ["The harvest feeds orphans, the old and drought-hit families", 1], ["Developed: the weak are protected and not left to suffer alone", 1]],
        modelAnswer: "The community works the chief's field together, which shows sharing and unity and that the community is responsible for its members. The harvest feeds orphans, the old and drought-hit families, so the weak are protected and not left to suffer alone.",
      }),
      P.manual({
        label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 280 },
        stem: "Assess how far religious organisations meet the needs of the poor in Zimbabwe.",
        points: [["For: orphanages, mission hospitals and clinics, feeding schemes, bursaries and disaster relief", 2], ["For: the giving teachings of several religions and volunteers who give time", 2], ["Against or limits: need is greater than resources, some help is limited to members, and the state, NGOs and communities also have duties; fair laws and jobs are needed", 2], ["A supported judgement", 2]],
        levels: levels(8),
        modelAnswer: "Religious organisations meet many needs. They run orphanages, mission hospitals and clinics, feeding schemes and bursaries, and they give relief after disasters, supported by the giving teachings of several religions and by volunteers. However, the need is often greater than their resources, some help is limited to members, and the state, NGOs and communities also have duties, while the poor also need jobs and fair laws. I conclude that religious organisations are important partners that meet many needs, but they cannot meet them all alone.",
      }),
    ],
    hints: ["Give both achievements and limits in (c), then decide."],
    explanation: "A strong answer weighs religious welfare work against its limits and reaches a supported judgement.",
  });

  b.card("DEFINITION", "What is **social responsibility**?", "The duty to act for the benefit of the community and society, not only oneself.");
  b.card("DEFINITION", "What is **good citizenship**?", "Obeying just laws, paying taxes, respecting others' rights, protecting public property and taking part in community life.");
  b.card("FACT", "What is **tzedakah**?", "Jewish righteous giving, a duty to help people in need.");
  b.card("FACT", "What is **zakat**?", "The pillar of Islam of giving a share of wealth to the needy, usually 2.5% of qualifying savings held for a lunar year.");
  b.card("FACT", "What is a **tithe**?", "A Christian offering of a tenth, with other offerings, to support the church and the poor.");
  b.card("FACT", "What is the Zunde raMambo (Shona) or Isiphala seNkosi (Ndebele)?", "A communal field or granary kept by the chief to help orphans, the old and families in need.");
  b.card("CONCEPT", "Name three kinds of welfare work by religious organisations.", "Orphanages, mission hospitals and clinics, feeding schemes, homes for the elderly and disaster relief.");
  b.card("CONCEPT", "Why do good citizens pay taxes and protect public property?", "Taxes pay for public services, and public property belongs to the whole community.");
  b.card("CONCEPT", "May a believer ever oppose a law?", "Religions teach respect for just laws; believers may work peacefully to change laws they think are unjust.");
});
