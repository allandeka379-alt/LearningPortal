// W4a: Religion and sexuality. Reviewer notes: the age of consent (18) follows the BRIEF reference facts; the Education
// Amendment Act 2020 (no exclusion of pregnant girls) should be checked against the current text by a reviewer.
import { concept, P, source, levels, ref } from "../lib.mjs";

concept("frs.ethics.sexuality", { file: "ethics/sexuality", keyPrefix: "ethics.sexuality" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the meaning of chastity?",
    options: [
      ["Keeping sexual relations for marriage", "Correct: refraining from sex before marriage."],
      ["Giving a gift to the family of the bride", "That describes roora or lobola, not chastity."],
      ["Being faithful to a husband or wife in marriage", "That is fidelity, which is a different term."],
      ["Fasting in the month of Ramadan every year", "Fasting is the pillar of Sawm."],
    ],
    answer: "A",
    explanation: "**Chastity** means keeping sexual relations for marriage. **Fidelity** is faithfulness within marriage.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which number should a young person in Zimbabwe call to speak to Childline Zimbabwe?",
    options: [
      ["116", "Correct: the Childline number."],
      ["999", "This is not the Childline number given in the lesson."],
      ["160", "This is not the Childline number given in the lesson."],
      ["211", "This is not the Childline number given in the lesson."],
    ],
    answer: "A",
    explanation: "Childline Zimbabwe can be reached on **116**. A child can also tell a trusted adult, go to a clinic, or report to the police Victim Friendly Unit.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which Islamic term means sex outside marriage, which the Qur'an warns Muslims not to approach?",
    options: [
      ["Zina", "Correct: unlawful sex."],
      ["Nikah", "Nikah is the marriage contract, the lawful setting for sex."],
      ["Zakat", "Zakat is the giving of a share of wealth."],
      ["Hajj", "Hajj is the pilgrimage to Makkah."],
    ],
    answer: "A",
    explanation: "**Zina** is unlawful sex. **Nikah** is marriage, the lawful setting.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which text do Jews and Christians both use when teaching that a man joins his wife in marriage?",
    options: [
      [ref("Genesis", 2, 24), "Correct: the man leaves his parents and joins his wife."],
      [ref("Exodus", 12), "This chapter describes the first Passover."],
      [ref("Acts", 2), "This chapter describes Pentecost."],
      [ref("Qur'an", 30, 21), "This is a verse of the Qur'an, which Jews and Christians do not use."],
    ],
    answer: "A",
    explanation: `**${ref("Genesis", 2, 24)}** is part of the Torah and the Christian Old Testament, so both religions use it.`,
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which statement about the Christian view of the body is taught in 1 Corinthians 6:18-20?",
    options: [
      ["The body is the temple of the Holy Spirit and should be honoured", "Correct: this is the teaching."],
      ["The body is unimportant because only the soul matters", "The passage teaches respect for the body."],
      ["The body belongs to the ancestors of the family and not to the person", "This is not the teaching of the passage."],
      ["The body should be kept hidden away from the community", "This is not the teaching of the passage."],
    ],
    answer: "A",
    explanation: "In **1 Corinthians 6:18-20** Paul teaches that the body is the temple of the Holy Spirit, and Christians use the passage when teaching chastity.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Nyasha, aged 16, is told by an older man that he will buy her gifts if she keeps their friendship secret. Which action is best supported by the lesson?",
    options: [
      ["Tell a trusted adult, or call Childline on 116", "Correct: this is the advice for any child who is being pressured."],
      ["Keep the friendship secret because the gifts are generous", "Secrecy and gifts are warning signs, and the law protects children under 18."],
      ["Accept the gifts but avoid talking to her parents about them", "This leaves her at risk."],
      ["Wait until she is older to tell someone about what happened", "She should speak early, not wait."],
    ],
    answer: "A",
    hints: ["Remember who a child should tell if an adult pressures them."],
    explanation: "A young person who is pressured by an adult should tell a **trusted adult** or call **Childline on 116**; the law protects children under 18.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which practice, once described as tradition, is now widely condemned as harmful to girls?",
    options: [
      ["Pledging a girl in marriage to settle a family debt (kuzvarira)", "Correct: it harms the girl and child marriage is illegal."],
      ["Giving advice to a girl about respect from her aunt or grandmother", "Guidance in itself is not harmful."],
      ["Paying roora or lobola to join two families through marriage", "Roora and lobola are not condemned in the same way as pledging a girl."],
      ["Letting a girl continue schooling after she has had a baby", "The law supports this."],
    ],
    answer: "A",
    hints: ["Look for the practice in which a girl is given away without her choice."],
    explanation: "**Kuzvarira** harms girls and is condemned. Marriage of a child is illegal, since the minimum age for marriage is 18 (section 78).",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which reason best explains why religions, schools and parents often give the same advice about waiting for marriage?",
    options: [
      ["It protects health, education and the family, and is religious teaching", "Correct: it links religious and practical reasons."],
      ["It is the only reason that is given in any of the four religions today", "Other reasons, such as respect and the sacredness of marriage, are also given."],
      ["It makes pregnancy impossible, so no other advice is needed by young people", "Advice about respect and health is still needed."],
      ["It has exactly the same meaning in every religion and in every denomination", "Views and practice differ within and between religions."],
    ],
    answer: "A",
    hints: ["Look for the answer that joins a religious reason with a practical one."],
    explanation: "Religions teach chastity because they regard sex as a gift linked with marriage, and schools and parents also point to the effects on **health, education and family life**.",
  });
  b.tf({
    d: 2, skill: "RECALL", daily: true,
    stem: "In Zimbabwe, the law protects children under 18 from sexual contact, even if a child seems to agree.",
    answer: true,
    explanation: "True. The age of consent to sex was raised to 18, so the law protects children under 18.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Sexual abuse is the fault of the child who is abused.",
    answer: false,
    explanation: "False. Abuse is never the child's fault. The abuser is responsible, and the child should tell a trusted adult.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each text with the religion or religions that use it.",
    pairs: [["Genesis 2:24 and Exodus 20:14", "Judaism and Christianity"], ["Qur'an 30:21", "Islam"], ["Hebrews 13:4", "Christianity"], ["Elders' guidance and roora/lobola", "Indigenous Religion"]],
    explanation: "Genesis and Exodus are used by Jews and Christians; Qur'an 30:21 by Muslims; Hebrews 13:4 by Christians; elders' guidance and roora/lobola by Indigenous Religion.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Faithfulness to a husband or wife is called {{blank:a}}; the minimum age for marriage in the Constitution of Zimbabwe is {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["fidelity"], choices: ["chastity", "fidelity", "stewardship", "tithing"] },
      { id: "b", accepted: ["18"], choices: ["16", "18", "21", "14"] },
    ],
    explanation: "**Fidelity** is faithfulness in marriage. The minimum age for marriage is **18** (section 78).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What is the name for a payment that joins two families in marriage among the Shona? (one word)",
    accepted: ["Roora", "Lobola", "Rovora"],
    wrong: ["Mutupo", "Bira"],
    explanation: "**Roora** (Shona; lobola in Ndebele) is the bride wealth that joins two families.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "Identify **three** people or places a young person can go to for help if they are being abused.",
    points: ["A trusted adult, such as a parent, teacher or religious leader", "Childline Zimbabwe, by calling 116", "A clinic, or the police Victim Friendly Unit"],
    modelAnswer: "A young person can tell a trusted adult, call Childline Zimbabwe on 116, or go to a clinic or the police Victim Friendly Unit.",
    explanation: "One mark for each place or person.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the teaching of Islam about sex and marriage.",
    points: [["Marriage (nikah) is the lawful setting for sex", 1], ["Spouses are described as a source of tranquillity, love and mercy (Qur'an 30:21)", 1], ["Sex outside marriage (zina) is forbidden", 1], ["Muslims are advised not to approach zina, which includes avoiding situations that lead to it, and modesty is stressed (Qur'an 17:32)", 1]],
    modelAnswer: "In Islam marriage (nikah) is the lawful setting for sex, and spouses are described as a source of tranquillity, love and mercy (Qur'an 30:21). Sex outside marriage (zina) is forbidden. Muslims are advised not to approach zina, which includes avoiding situations that lead to it, and modesty is stressed (Qur'an 17:32).",
    hints: ["Give the lawful setting, the purpose of marriage and the warning about zina."],
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain **two** effects of teenage pregnancy on a young person.",
    points: [
      ["Interruption of education", 1],
      ["Developed: the girl may leave school, which limits her work opportunities, although the law says that she must be allowed to continue", 2],
      ["Health risks and stigma", 1],
      ["Developed: a young body faces more risks in pregnancy and birth, and a girl may be shamed by the community, so support from a clinic and family is needed", 2],
    ],
    modelAnswer: "Teenage pregnancy may interrupt education: the girl may leave school, which limits her work opportunities, although the law says that she must be allowed to continue. It also brings health risks and stigma. A young body faces more risks in pregnancy and birth, and a girl may be shamed by the community, so support from a clinic and family is needed.",
    hints: ["Give one effect on education and one effect on health or social life."],
    explanation: "Two effects, each stated (1) and developed (2).",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "an extract from a fictional youth-camp talk at a church in Chinhoyi, 2026",
      "The leader told the young people: \"Your body is a gift and you are valuable. Waiting for marriage is a way of respecting yourself and the person you will marry. If anyone pressures you, or touches you in a way that makes you afraid, it is not your fault. Tell a trusted adult, or call Childline on 116.\" The leader also reminded them that the law protects every child under the age of eighteen."
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "According to Source A, what number can a child call for help?",
        options: [
          ["116", "Correct: the Childline number."],
          ["161", "The source gives a different number."],
          ["611", "The source gives a different number."],
          ["112", "The source gives a different number."],
        ],
        answer: "A", explanation: "The leader says that a child can call Childline on 116.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Using Source A, state **three** pieces of advice given by the leader.",
        points: ["The body is a gift and a person is valuable", "Waiting for marriage is a way of respecting yourself and your future partner", "If a child is pressured or frightened it is not the child's fault, and the child should tell a trusted adult or call Childline"],
        modelAnswer: "The leader says that the body is a gift and a person is valuable, that waiting for marriage is a way of respecting yourself and your future partner, and that a child who is pressured or frightened should tell a trusted adult or call Childline.",
      }),
      P.manual({
        label: "(c)", marks: 4, stem: "Explain how the talk in Source A shows Christian teaching about the body and about marriage.",
        points: [["It links to the teaching that the body is a gift and the temple of the Holy Spirit (1 Corinthians 6:18-20)", 1], ["It teaches respect for oneself", 1], ["It teaches chastity before marriage, so that marriage is honoured (Hebrews 13:4)", 1], ["It also protects young people by saying that abuse is never the child's fault and giving help", 1]],
        modelAnswer: "The talk reflects the teaching that the body is a gift and the temple of the Holy Spirit (1 Corinthians 6:18-20), so a young person should respect it. It teaches chastity before marriage so that marriage is honoured (Hebrews 13:4). It also protects young people by saying that abuse is never the child's fault and by giving places to find help.",
      }),
    ],
    hints: ["In (c) link the leader's words to a Bible passage."],
    explanation: "The source combines religious teaching with safety advice.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1200,
    stem: "Themba says: \"Religious teaching about waiting for marriage is old-fashioned and does not help young people today.\" Fatima says: \"Religious teaching gives young people guidance and protects them.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Outline **two** religious teachings about sex and marriage.",
        points: [["A first teaching, with the religion or source", 2, ["Christianity: chastity before marriage and faithfulness in marriage (Hebrews 13:4)", "Islam: zina is forbidden and marriage is the lawful setting (Qur'an 17:32)", "Judaism: sex is holy in marriage and adultery is forbidden (Exodus 20:14)", "Indigenous Religion: chastity before marriage; roora/lobola joins families"]], ["A second teaching, from a different religion", 2]],
        modelAnswer: "In Christianity, unmarried people are taught chastity and married people fidelity, as in Hebrews 13:4. In Islam, sex outside marriage (zina) is forbidden, and marriage is the lawful setting for sex (Qur'an 17:32).",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 220 },
        stem: "Discuss the views of Themba and Fatima.",
        points: [
          ["Themba: some young people say that the teaching is hard to follow because of peer pressure, media messages and pressure of modern life", 2],
          ["Developed: some feel that the teaching is not always explained or that a young person can feel judged", 1],
          ["Fatima: guidance helps young people avoid pregnancy, disease and exploitation, and gives them respect for themselves and others", 2],
          ["Developed: religions also teach compassion and support for young people who have difficulties, such as a pregnant girl", 1],
          ["A supported conclusion, for example that guidance works best when it is explained and accompanied by health education and support", 2],
        ],
        levels: levels(8),
        modelAnswer: "Themba's view reflects the pressure many young people feel from friends, social media and modern life, and some feel that the teaching is not always explained, or that they are judged. These are real difficulties.\n\nFatima's view is that religious guidance protects young people from pregnancy, disease and exploitation, and teaches respect for oneself and others. Religions also teach compassion for a young person who is in difficulty, such as a pregnant girl. I think the guidance is helpful, but it works best when it is explained in a caring way and accompanied by health education and support.",
        explanation: "Level marking: both views developed and a supported conclusion.",
      }),
    ],
    hints: ["In (b) give a reason on each side and then judge."],
    explanation: "Practice question on the value of religious guidance on sexuality.",
  });

  b.card("DEFINITION", "What is chastity?", "Keeping sexual relations for marriage.");
  b.card("DEFINITION", "What is fidelity?", "Faithfulness to a husband or wife in marriage.");
  b.card("FACT", "Which Qur'an verse warns Muslims not to approach zina?", "Qur'an 17:32.");
  b.card("FACT", "Which Bible verse teaches that a man joins his wife in marriage?", "Genesis 2:24.");
  b.card("FACT", "Which number do you call to reach Childline Zimbabwe?", "116.", "Also: a trusted adult, a clinic, the police Victim Friendly Unit.");
  b.card("FACT", "What does the law say about the age of consent and minimum age for marriage in Zimbabwe?", "The law protects children under 18; the minimum age for marriage is 18 (section 78).");
  b.card("CONCEPT", "Why is sexual abuse never the fault of the child?", "The abuser is responsible; the child should tell a trusted adult.");
  b.card("CONCEPT", "What do all four religions teach about the dignity of persons?", "Every person has dignity, and bullying, hatred and violence against any person are wrong.");
});
