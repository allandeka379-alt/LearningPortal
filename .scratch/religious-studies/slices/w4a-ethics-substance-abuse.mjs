// W4a: Religion and drug and substance abuse.
import { concept, P, source, levels, ref } from "../lib.mjs";

concept("frs.ethics.substance-abuse", { file: "ethics/substance-abuse", keyPrefix: "ethics.substance-abuse" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What name is given in Shona to the drug crystal meth?",
    options: [
      ["Mutoriro", "Correct: the local name for crystal meth."],
      ["Mutupo", "Mutupo is the totem."],
      ["Mukwerera", "Mukwerera is the rain-making ceremony."],
      ["Mushonga", "Mushonga means medicine."],
    ],
    answer: "A",
    explanation: "**Mutoriro** is the local name for crystal meth. Mutupo is the totem and mukwerera a rain ceremony.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does the word khamr mean in Islam?",
    options: [
      ["Intoxicants", "Correct: substances that cloud the mind."],
      ["Charity and giving", "Charity is zakat or sadaqah."],
      ["Pilgrimage to Makkah", "Pilgrimage is Hajj."],
      ["Fasting in Ramadan", "Fasting is sawm."],
    ],
    answer: "A",
    explanation: "**Khamr** means intoxicants, which Islam forbids.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which Bible verse tells Christians not to get drunk with wine but to be filled with the Spirit?",
    options: [
      [ref("Ephesians", 5, 18), "Correct: this verse contrasts drunkenness with being filled with the Spirit."],
      [ref("Genesis", 12, "1-3"), "This passage is the call of Abraham."],
      [ref("Matthew", 5, "3-12"), "This passage is the Beatitudes."],
      [ref("Acts", 2), "This chapter describes Pentecost."],
    ],
    answer: "A",
    explanation: `**${ref("Ephesians", 5, 18)}** warns against drunkenness.`,
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In Indigenous Religion, what is the attitude to traditional beer?",
    options: [
      ["It is used in rituals and shared by elders, but drunkenness is condemned", "Correct: use in ritual with moderation."],
      ["It is forbidden in all circumstances because it displeases the ancestors", "Beer is used in rituals such as bira."],
      ["It is welcomed in any amount because it pleases the ancestors", "Drunkenness is condemned."],
      ["It is used only by children because it is considered weak", "Beer is used by elders in ritual."],
    ],
    answer: "A",
    explanation: "Beer has a place in **rituals** such as bira and kurova guva/umbuyiso, but drunkenness is condemned because it breaks unhu/ubuntu.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which Christian group is an example of a church that teaches complete abstinence from alcohol?",
    options: [
      ["The Seventh-day Adventist Church", "Correct: members are taught to abstain."],
      ["A church that teaches moderate drinking and condemns drunkenness", "This is a different Christian view."],
      ["A synagogue that uses wine for the Shabbat blessing", "A synagogue is Jewish, and wine is used in blessings."],
      ["A shrine that brews beer for the ancestors at a bira", "A shrine is part of Indigenous Religion."],
    ],
    answer: "A",
    explanation: "The **Seventh-day Adventist Church**, the Salvation Army and many Pentecostal and African Independent Churches teach abstinence; other churches teach moderation.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Yusuf says: \"I avoid alcohol and all drugs because of Qur'an 5:90.\" Which statement explains his view?",
    options: [
      ["Muslims must avoid intoxicants, and scholars extend this to other drugs", "Correct: the prohibition covers other intoxicants."],
      ["The verse allows any amount of alcohol provided it is taken on a feast day", "The verse says to avoid intoxicants."],
      ["The verse is about Hajj and the rules of the pilgrimage to Makkah", "The verse concerns intoxicants and gambling."],
      ["The verse says that only drinking inside the mosque itself is forbidden", "The prohibition is general."],
    ],
    answer: "A",
    hints: ["Recall what khamr means and how scholars apply the verse."],
    explanation: "**Qur'an 5:90** tells believers to avoid intoxicants; scholars apply it to other drugs that cloud the mind.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which effect of substance abuse is an effect on the family rather than on the individual?",
    options: [
      ["Fee money is spent on drugs and the home is troubled by quarrels", "Correct: the family suffers."],
      ["The user's liver and lungs are damaged by long use of the substance", "This is an effect on the individual."],
      ["The user cannot stop using the substance even though it causes harm", "This is addiction, an effect on the individual."],
      ["The user loses concentration in class and fails school examinations", "This is mainly an effect on the individual."],
    ],
    answer: "A",
    hints: ["Choose the effect that happens to relatives, not only to the user."],
    explanation: "Effects on the **family** include quarrels, violence, loss of money and trust; damage to the liver and addiction are effects on the individual.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which approach to a young person who is addicted best matches what religious leaders and health workers teach?",
    options: [
      ["Offer compassion, refer to a health worker and support recovery", "Correct: compassion plus treatment."],
      ["Reject the person until the problem has gone away on its own", "Rejection makes recovery harder."],
      ["Treat the problem only as a punishment and expect no further help", "Addiction is also a health problem."],
      ["Hide the problem from the family and hope that it will pass", "Hiding it delays help."],
    ],
    answer: "A",
    hints: ["Look for the response that joins compassion and professional help."],
    explanation: "Religious leaders and health workers both say that a person with an addiction needs **compassion, treatment and support**, not rejection.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Islam forbids intoxicants.",
    answer: true,
    explanation: "True. The Qur'an (2:219 and 5:90) tells Muslims to avoid khamr, and scholars apply this to other intoxicating drugs.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "All Christian churches teach the same view on drinking alcohol.",
    answer: false,
    explanation: "False. Some churches teach moderation and condemn drunkenness, while others teach complete abstinence.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each religion with its teaching on alcohol and drugs.",
    pairs: [["Indigenous Religion", "Beer in ritual, but drunkenness is condemned"], ["Judaism", "Wine in blessings, with moderation stressed"], ["Christianity", "Churches differ between moderation and abstinence"], ["Islam", "Intoxicants are forbidden"]],
    explanation: "Each religion has its own teaching, as shown in the lesson table.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Help given to a person to stop using substances and rebuild life is called {{blank:a}}; the harmful use of alcohol or drugs is called substance {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["rehabilitation"], choices: ["rehabilitation", "initiation", "pilgrimage", "revelation"] },
      { id: "b", accepted: ["abuse"], choices: ["abuse", "stewardship", "fasting", "worship"] },
    ],
    explanation: "**Rehabilitation** is the help given; **substance abuse** is the harmful use.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which Shona word describes the traditional beer used in rituals such as a bira? (one word)",
    accepted: ["Doro", "Utshwala"],
    wrong: ["Mutupo", "Bira"],
    explanation: "**Doro** (Shona) or utshwala (Ndebele) is the traditional beer.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "Identify **three** causes of drug and substance abuse among young people.",
    points: ["Peer pressure", "Stress, unemployment or poverty", "Problems at home, curiosity or easy availability"],
    modelAnswer: "Causes include peer pressure, stress, unemployment or poverty, and problems at home, curiosity or easy availability.",
    explanation: "One mark for each cause.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** effects of substance abuse on the family.",
    points: [
      ["A first effect, for example quarrels and violence", 1],
      ["Developed: the home becomes unsafe and children may be frightened or neglected", 1],
      ["A second effect, for example loss of money", 1],
      ["Developed: money for food and school fees is spent on substances, so the family becomes poorer", 1],
    ],
    modelAnswer: "Substance abuse can cause quarrels and violence, so the home becomes unsafe and children may be frightened or neglected. It can also cause loss of money, because money for food and school fees is spent on substances and the family becomes poorer.",
    hints: ["Give an effect, then say what it does to family life."],
    explanation: "One mark for each effect and one for developing it.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain **two** ways in which a religious community can help to reduce substance abuse.",
    points: [
      ["Prevention through teaching and activities", 1],
      ["Developed: sermons, scripture clubs and youth sport keep young people informed and busy, so they are less likely to join peers in using drugs", 2],
      ["Support and referral for those who are addicted", 1],
      ["Developed: leaders listen without rejecting, refer the person to a health worker and help the family, so recovery is more likely", 2],
    ],
    modelAnswer: "A religious community can teach prevention. Sermons, scripture clubs and youth sport keep young people informed and busy, so they are less likely to join peers in using drugs. It can also support and refer those who are addicted. Leaders listen without rejecting, refer the person to a health worker and help the family, so recovery is more likely.",
    hints: ["Give one way that prevents and one way that helps people already affected."],
    explanation: "Two ways, each stated (1) and developed (2).",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "an extract from a fictional newspaper report from Gweru, 2026",
      "Parents, church leaders and teachers met on Saturday to discuss the misuse of cough syrup and crystal meth among young people. An imam said that Islam forbids intoxicants because they harm the mind and the body. A pastor said that his church would open its hall for sport on Saturdays and would help families to find a counsellor. A local elder said that traditional beer was never meant for young people and that drunkenness brings shame on a family."
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "According to Source A, what did the pastor say his church would open for sport on Saturdays?",
        options: [
          ["Its hall", "Correct: the source says the church hall."],
          ["Its school", "The source does not say this."],
          ["Its clinic", "The source does not say this."],
          ["Its farm", "The source does not say this."],
        ],
        answer: "A", explanation: "The pastor said that the church would open its hall for sport on Saturdays.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Using Source A, state **three** responses suggested at the meeting.",
        points: ["The imam explained that Islam forbids intoxicants because they harm mind and body", "The pastor offered the church hall for sport and help in finding a counsellor", "The elder said traditional beer was not for young people and drunkenness brings shame"],
        modelAnswer: "The imam explained that Islam forbids intoxicants because they harm the mind and body. The pastor offered the church hall for sport and help in finding a counsellor, and the elder said traditional beer was never meant for young people and drunkenness brings shame.",
      }),
      P.manual({
        label: "(c)", marks: 4, stem: "Explain how Source A shows that different religions can work together on a community problem.",
        points: [["A Muslim, a Christian and an Indigenous Religion elder are all present", 1], ["Each uses teaching from his own tradition: Islam on intoxicants, Christianity on caring for the young, unhu on shame", 1], ["They agree that substance abuse harms individuals, families and society", 1], ["Together their actions (teaching, sport, counselling) have more effect than one group alone", 1]],
        modelAnswer: "The meeting brought together an imam, a pastor and an elder. Each used teaching from his own tradition: Islam on intoxicants, Christianity on care for the young and unhu on shame. They agreed that substance abuse harms individuals, families and society, and together their actions of teaching, sport and counselling have more effect than one group alone.",
      }),
    ],
    hints: ["In (c) name the three speakers and what each contributed."],
    explanation: "The source shows religious cooperation on a social problem.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1200,
    stem: "Rudo says: \"Religious teaching is the best way to protect young people from drugs.\" Farai says: \"Young people also need counselling and health services.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Outline **two** religious teachings about drugs or alcohol.",
        points: [["A first teaching, with the religion or source", 2, ["Islam: intoxicants are forbidden (Qur'an 5:90)", "Christianity: do not get drunk with wine (Ephesians 5:18); the body is a temple", "Judaism: moderation; Proverbs 20:1", "Indigenous Religion: drunkenness is condemned"]], ["A second teaching, from a different religion", 2]],
        modelAnswer: "In Islam intoxicants are forbidden, according to Qur'an 5:90, and scholars apply this to other drugs. In Christianity believers are told not to get drunk with wine (Ephesians 5:18), and some churches teach complete abstinence.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 220 },
        stem: "Discuss the views of Rudo and Farai.",
        points: [
          ["Rudo: religion gives values, community, discipline and a sense of purpose", 2],
          ["Developed: respected leaders can influence young people, and religious groups run youth activities", 1],
          ["Limits: not all young people attend religious groups, and teaching alone does not treat addiction", 2],
          ["Farai: counselling and health services treat addiction and mental health problems, and religious bodies often work with them", 1],
          ["A supported conclusion, for example that the two work best together", 2],
        ],
        levels: levels(8),
        modelAnswer: "Rudo is right that religion gives values, community and a sense of purpose, and respected leaders can influence young people. Religious groups also run youth activities that keep young people busy. However, not all young people belong to a religious group, and teaching alone does not treat addiction.\n\nFarai is right that counselling and health services treat addiction and mental health problems, and religious bodies often work with them. I think the two work best together: religion offers values and support, and health services offer treatment.",
        explanation: "Level marking: both views developed and a supported conclusion.",
      }),
    ],
    hints: ["In (b) give a strength and a limit for each view."],
    explanation: "Practice question on the role of religion and professional services.",
  });

  b.card("DEFINITION", "What is substance abuse?", "The harmful or excessive use of alcohol, drugs or other substances that damages health, relationships or work.");
  b.card("DEFINITION", "What is rehabilitation?", "Help given to a person to stop using substances and rebuild health, relationships and a future.");
  b.card("FACT", "What is mutoriro?", "The local name for crystal meth, a powerful and harmful stimulant.");
  b.card("FACT", "Which two Qur'an verses warn against intoxicants?", "Qur'an 2:219 and 5:90.", "Khamr means intoxicants.");
  b.card("FACT", "Which verse tells Christians not to get drunk with wine?", "Ephesians 5:18.");
  b.card("CONCEPT", "How does Indigenous Religion treat traditional beer?", "It is used in rituals such as bira and shared by elders, but drunkenness is condemned.");
  b.card("CONCEPT", "Do all Christian churches teach the same view on alcohol?", "No. Some teach moderation and condemn drunkenness; some teach complete abstinence.");
  b.card("CONCEPT", "Name three effects of substance abuse on society.", "Crime, road accidents, unemployment and strain on health services.");
});
