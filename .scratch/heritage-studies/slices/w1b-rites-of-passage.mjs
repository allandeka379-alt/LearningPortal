// W1b: rites of passage and the age of consent (her.culture.rites-of-passage).
// Reviewer note: Venda (vhusha, murundu) and Remba (male circumcision) rites are named in outline only; please confirm.
// Age of consent: taught as "the law protects children under 18" (2024 amendment after a 2022 Constitutional Court
// ruling), with no Act named.
import { concept, P, source, levels } from "../lib.mjs";

concept("her.culture.rites-of-passage", { file: "culture/rites-of-passage", keyPrefix: "culture.rites-of-passage" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is the best definition of a **rite of passage**?",
    options: [
      ["A ceremony or teaching that marks a move from one stage of life to another", "Correct."],
      ["A ceremony held each year before the rains to ask God and the ancestors for rain", "That is a rain-making ceremony (mukwerera/ukucela izulu)."],
      ["A work party in which neighbours help one household", "That is nhimbe/ilima."],
      ["A meeting at which a family chooses an heir", "That is part of inheritance, not a rite of passage."],
    ],
    answer: "A",
    explanation: "Rites of passage mark life stages: birth, adolescence, marriage and death.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Under the Constitution of Zimbabwe, what is the minimum age of marriage?",
    options: [
      ["18", "Correct: section 78 says no person under 18 may marry."],
      ["16", "16 was the old minimum for girls under earlier marriage law; the Constitution sets 18."],
      ["21", "21 is not the marriage age; adulthood begins at 18."],
      ["14", "No one this young may marry."],
    ],
    answer: "A",
    explanation: "Section 78 sets 18 as the minimum age; the Constitutional Court confirmed in 2016 that child marriage is unconstitutional.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In many Shona families, who traditionally guides a girl at puberty?",
    options: [
      ["her paternal aunt (vatete)", "Correct: the vatete (ubabakazi in Ndebele) is the traditional adviser of girls."],
      ["her maternal uncle (sekuru)", "The sekuru (umalume) traditionally advises boys and plays ceremonial roles."],
      ["the village head", "The village head leads the community but does not give this private guidance."],
      ["a spirit medium", "A spirit medium is a religious figure, not the girl's adviser at puberty."],
    ],
    answer: "A",
    explanation: "The paternal aunt (vatete/ubabakazi) traditionally advises girls on growing up and later on marriage.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In which year did the Constitutional Court confirm that child marriage is unconstitutional?",
    options: [
      ["2016", "Correct."],
      ["2013", "2013 is when the Constitution was adopted."],
      ["1980", "1980 is the year of independence."],
      ["1987", "1987 is the year of the Unity Accord."],
    ],
    answer: "A",
    explanation: "The 2013 Constitution set the age at 18; in 2016 the Constitutional Court confirmed that no one under 18 may marry.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is the main purpose of rites of adolescence?",
    options: [
      ["To prepare young people for the responsibilities of adulthood", "Correct: they teach values, roles and identity."],
      ["To choose the community's next traditional leader", "Leaders are chosen by other customs."],
      ["To share the property of a dead relative", "That is inheritance (kugova nhaka)."],
      ["To celebrate the end of the harvest and thank the ancestors for food", "That is a harvest or thanksgiving ceremony."],
    ],
    answer: "A",
    explanation: "Rites of adolescence guide young people at puberty and teach adult values and responsibilities.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which reason **best** explains why the law sets 18 as the minimum age of marriage?",
    options: [
      ["Children are not mature enough, and early marriage harms their health and education", "Correct: the law protects children's health, schooling and rights."],
      ["Wedding and roora costs are usually lower when the couple are older and earning money", "Cost is not the reason for the law."],
      ["The Constitution requires everyone to marry at 18", "The law sets a minimum age; it does not require anyone to marry."],
      ["Traditional leaders cannot attend weddings of younger people", "This is not a reason given by the law."],
    ],
    hints: ["The law is about protecting children."],
    answer: "A",
    explanation: "Child marriage ends schooling, risks girls' health and exposes children to exploitation, so the law forbids it.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A 15-year-old girl tells her teacher that her family has arranged for her to marry. What should the teacher do?",
    options: [
      ["Report it to the police Victim Friendly Unit or child protection authorities", "Correct: the marriage would be illegal and the girl needs protection."],
      ["Say nothing, because marriage is a family matter", "The marriage would be illegal; the girl needs help."],
      ["Advise her to leave school and prepare for marriage", "This would harm her and break the law."],
      ["Ask the family to delay the wedding until the girl turns sixteen in a year's time", "No one under 18 may marry."],
    ],
    hints: ["Is this marriage lawful?"],
    answer: "A",
    explanation: "Child marriage is illegal. A teacher should help the child reach the police Victim Friendly Unit, child protection services or another trusted authority.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement about rites of passage today is the **most balanced**?",
    options: [
      ["They can give valuable guidance and identity, but harmful or unsafe practices must change", "Correct: this recognises both value and the need for change."],
      ["They are outdated and have no value for modern young people", "This ignores the guidance and identity they offer."],
      ["They should continue exactly as they were practised in the past, with no changes of any kind", "Some practices have carried risks or conflicted with children's rights."],
      ["They are found only among one ethnic group in Zimbabwe", "Many communities mark adolescence in different ways."],
    ],
    hints: ["A balanced view gives strengths and weaknesses."],
    answer: "A",
    explanation: "Rites of passage teach values and identity; unsafe practices and anything leading to child marriage must change.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In Zimbabwe a person becomes a legal adult at the age of 18.",
    answer: true,
    explanation: "True. The Legal Age of Majority Act of 1982 made 18 the age of majority.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Pledging a young girl in marriage (kuzvarira) is an accepted practice under Zimbabwean law.",
    answer: false,
    explanation: "False. Pledging girls and child marriage are harmful and illegal; no one under 18 may marry.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term with its meaning.",
    pairs: [
      ["adolescence", "the stage between childhood and adulthood"],
      ["initiation", "formal teaching of adult knowledge and roles, often in a group"],
      ["age of majority", "the age at which a person becomes a legal adult"],
      ["age of consent", "the age below which the law treats a person as a child who cannot agree to sex"],
    ],
    explanation: "Adulthood (majority), consent and marriage age are all set at 18 in Zimbabwe today.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Section {{blank:a}} of the Constitution says no person under the age of {{blank:b}} may marry.",
    blanks: [
      { id: "a", accepted: ["78"], choices: ["78", "81", "56", "4"] },
      { id: "b", accepted: ["18"], choices: ["18", "16", "21", "14"] },
    ],
    explanation: "Section 78 (marriage rights) sets 18. Section 81 is children's rights; section 56 equality; section 4 national symbols.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the Ndebele word for the paternal aunt who guides girls.",
    accepted: ["ubabakazi", "u-babakazi"],
    wrong: ["umalume"],
    explanation: "**Ubabakazi** in Ndebele, **vatete** in Shona. Umalume (sekuru) is the maternal uncle.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State **three** things young people are taught during rites of adolescence.",
    points: ["Changes of puberty / personal hygiene", "Behaviour and values, e.g. respect, self-control, Unhu", "Adult responsibilities / identity and culture"],
    modelAnswer: "Changes of puberty and hygiene; respect and self-control; their responsibilities as adults.",
    explanation: "One mark per item.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Explain **three** reasons why the law protects children under 18 from marriage and sexual activity.",
    points: [
      "Children are not mature physically or emotionally",
      "so they cannot make such decisions freely and safely",
      "Early pregnancy risks girls' health",
      "because their bodies are still developing",
      "Child marriage ends education",
      "limiting future work and income",
    ],
    modelAnswer: "Children are not yet mature, physically or emotionally, so they cannot make decisions about sex and marriage freely and safely. Early pregnancy is dangerous for girls whose bodies are still developing. Child marriage also usually ends a girl's education, limiting her future work and income. The law therefore places responsibility on adults.",
    hints: ["Think of maturity, health and education."],
    explanation: "Two marks per reason. Protection from exploitation and children's rights are also creditworthy.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Suggest **two** ways a community could keep the value of rites of passage while protecting children's rights.",
    points: [
      "Suggests involving health workers / trained personnel where a rite has health risks",
      "Explains that this keeps the tradition while making it safer",
      "Suggests teaching the law (no marriage under 18) as part of guidance, or timing rites in school holidays",
      "Explains that children keep their schooling and are protected from early marriage",
    ],
    modelAnswer: "The community could involve trained health workers wherever a rite carries health risks, so the tradition continues more safely. It could also include the law on the age of consent and marriage in the guidance given, and hold rites during school holidays, so children keep their schooling and are protected from early marriage.",
    hints: ["Think of safety, schooling and teaching the law."],
    explanation: "Credit any sensible suggestion that keeps the cultural value and protects rights.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: source("Source A", "a short article in a fictional youth magazine, 2026",
      "When I turned 13, my aunt came to stay with us for a week. We talked about growing up, about keeping myself and my body safe, and about respect. She said that if anyone ever pressured me, I should tell her or a teacher. She also said, \"Your school is your future.\" Some of my friends in town have nobody like that to talk to. — Thandeka, Form 2") +
      "\n\nRead Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "In indigenous terms, the aunt is most likely Thandeka's …",
        options: [
          ["ubabakazi (paternal aunt)", "Correct: the paternal aunt traditionally guides girls."],
          ["umalume (maternal uncle)", "Umalume is a male relative who advises boys."],
          ["indlalifa (heir)", "Indlalifa means heir."],
          ["isangoma (traditional healer)", "This is a healer, not a family adviser at puberty."],
        ],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** messages the aunt gave that protect Thandeka.",
        points: ["Keep herself and her body safe / tell a trusted adult if pressured", "Stay in school (school is her future)"],
        modelAnswer: "She should tell her aunt or a teacher if anyone pressures her; she should stay in school because it is her future.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain why Thandeka thinks some friends in town are at a disadvantage.",
        points: [
          "They have nobody like the aunt to guide them",
          "because urban families may live far from the extended family / traditional guidance is weaker in towns",
          "so they may lack information and a trusted adult to turn to when pressured",
        ],
        modelAnswer: "Her friends in town have no aunt or similar adult to guide them, because urban families often live far from the extended family and these customs are weaker in towns. As a result they may lack information and a trusted adult to turn to if they are pressured.",
      }),
    ],
    hints: ["In (c), link the friends' situation to urban life."],
    explanation: "A source-based practice item (6 marks) on guidance at adolescence.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "This question is about rites of passage and the law.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Explain **two** ways in which rites of adolescence benefit young people.",
        points: [
          ["Guidance from trusted elders at puberty, so young people understand changes and know whom to turn to", 2],
          ["Identity and belonging: they learn their culture and values and gain a new status with responsibilities", 2],
        ],
        modelAnswer: "Rites of adolescence give young people guidance from trusted elders at puberty, so they understand the changes they are going through and know whom to turn to. They also build identity and belonging, as young people learn their culture and values and take on a new status with adult responsibilities.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Laws alone cannot end child marriage in Zimbabwe.\" Discuss.",
        points: [
          ["Laws matter: section 78 and the 2016 Constitutional Court ruling make child marriage illegal and allow prosecution", 2],
          ["Limits: poverty, some customs, distance from police and courts, and lack of awareness keep it happening", 2],
          ["Other measures needed: education of girls, community and traditional leaders speaking out, guidance at adolescence, reporting channels", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "Laws are essential. Section 78 of the Constitution sets 18 as the minimum marriage age, and the Constitutional Court confirmed in 2016 that child marriage is unconstitutional. This allows police and courts to act and sends a clear message.\n\nHowever, laws alone have limits. Poverty pushes some families to marry off daughters, some customs still favour early marriage, and in remote areas police and courts are far away. Many people do not know the law or fear reporting relatives.\n\nOther measures are therefore needed: keeping girls in school, traditional and religious leaders speaking out, guidance from aunts and uncles that includes the law, and safe reporting channels such as the Victim Friendly Unit. I agree with the statement: the law is the foundation, but ending child marriage needs communities, families and schools to act with it.",
      }),
    ],
    hints: ["In (b), show what the law does and what else is needed."],
    explanation: "A practice evaluative item on the law and child marriage.",
  });

  b.card("DEFINITION", "Rite of passage", "A ceremony or teaching that marks a move from one stage of life to another.");
  b.card("DEFINITION", "Adolescence", "The stage between childhood and adulthood, beginning with puberty.");
  b.card("DEFINITION", "Initiation", "Formal teaching of adult knowledge, values and roles, often in a group and away from home for a time.");
  b.card("FACT", "What is the minimum age of marriage in Zimbabwe, and where is it set?", "18, in section 78 of the Constitution (confirmed by the Constitutional Court in 2016).");
  b.card("FACT", "At what age does a person become a legal adult in Zimbabwe?", "18 (Legal Age of Majority Act, 1982).");
  b.card("FACT", "Who traditionally guides girls and boys at puberty in many families?", "Girls: the paternal aunt (vatete/ubabakazi). Boys: uncles or grandfathers (sekuru/umalume).");
  b.card("CONCEPT", "Why does the law protect children under 18 from sex and marriage?", "They are not mature; early pregnancy risks health; child marriage ends education; adults can exploit them.");
  b.card("FACT", "Name two communities in Zimbabwe with formal initiation rites.", "For example the Venda (vhusha for girls, murundu for boys) and the Remba.");
  b.card("CONCEPT", "Where can a child at risk of child marriage get help?", "A trusted adult, a teacher, the police Victim Friendly Unit, a clinic or child protection services.");
});
