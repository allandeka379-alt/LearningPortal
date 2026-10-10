// W3b: Gender, gender roles and stereotypes (Topic 8.1).
import { concept, P, source, levels } from "../lib.mjs";

concept("frs.gender.concepts", { file: "gender/concepts", keyPrefix: "gender.concepts" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is meant by gender?",
    options: [
      ["The roles and expectations a society attaches to being female or male", "Correct: gender is socially learned."],
      ["The biological differences between females and males in reproduction", "That describes sex."],
      ["The number of children that a woman has during her lifetime", "That is fertility, not gender."],
      ["The rule that only men may lead in public meetings of a village", "That is one possible gender role, not the meaning of gender."],
    ],
    answer: "A",
    explanation: "**Gender** is the set of roles and expectations a society attaches to being female or male.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement is about sex rather than gender?",
    options: [
      ["Only women can give birth", "Correct: this is a biological fact."],
      ["Women should do all the cooking", "This is a gender role."],
      ["Men are better leaders than women", "This is a stereotype."],
      ["Girls should not study science", "This is a stereotype."],
    ],
    answer: "A",
    explanation: "Giving birth is a **biological** difference (sex); the other statements are social expectations (gender).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which example is a gender stereotype?",
    options: [
      ["\"Boys do not cry\"", "Correct: a fixed idea about how boys should behave."],
      ["A school admits both girls and boys to the science class", "This is equal treatment, not a stereotype."],
      ["A clinic offers separate wards for men and women", "A separate ward is a practical arrangement, not a stereotype."],
      ["A hospital hires nurses of both sexes after interviews", "This is fair recruitment."],
    ],
    answer: "A",
    explanation: "A **stereotype** is a fixed, oversimplified idea about women or men.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is patriarchy?",
    options: [
      ["A system in which men hold most of the power and authority", "Correct: in the family, community and institutions."],
      ["A system in which women hold most of the power and authority", "That is matriarchy."],
      ["A system in which women and men share power in every situation equally", "That would be equality."],
      ["A system in which elders of both sexes make rules for the young", "That describes the authority of elders, not patriarchy."],
    ],
    answer: "A",
    explanation: "**Patriarchy** is a system in which men hold most of the power.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the difference between gender equality and gender equity?",
    options: [
      ["Equality is the same rights; equity is fairness that may differ", "Correct: equity can mean extra help to reach equal outcomes."],
      ["Equality is for women only; equity is for men only", "Both ideas concern everyone."],
      ["Equality is fairness that may differ; equity is the same rights", "This reverses the definitions."],
      ["There is no difference in meaning; the words are the same", "They have different meanings in this topic."],
    ],
    answer: "A",
    explanation: "**Equality** is the same rights and opportunities; **equity** is fairness that may involve different treatment.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", daily: true,
    stem: "A school starts a bursary for girls because many girls in the district leave school early. Which idea does this show?",
    options: [
      ["Gender equity working towards equality", "Correct: different help to reach equal opportunity."],
      ["Gender stereotyping of boys' abilities", "The bursary is a response to a barrier, not a stereotype."],
      ["Patriarchy in school management", "The bursary is not a way of increasing men's power."],
      ["Sex discrimination in the Constitution", "The Constitution allows measures to promote equality."],
    ],
    answer: "A",
    hints: ["The bursary treats girls differently in order to reach equal opportunity."],
    explanation: "Giving extra help to remove a barrier is **equity** that aims at equality.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which agent of socialisation is shown when an advert shows only women washing clothes?",
    options: [
      ["The media", "Correct: adverts teach expectations about roles."],
      ["The family", "The advert is not part of the family."],
      ["The school", "The advert is not part of the school."],
      ["The courts", "Courts do not produce adverts."],
    ],
    answer: "A",
    hints: ["Where is the advert shown?"],
    explanation: "Adverts are part of the **media**, which teaches gender expectations.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which conclusion about gender roles is best supported by the fact that cooking is done by men in some societies and by women in others?",
    options: [
      ["Many gender roles are learned and vary between societies", "Correct: they are not fixed by biology."],
      ["All gender roles are fixed by biology and cannot change", "Differences between societies show otherwise."],
      ["Gender roles are identical in all societies at every time", "The example shows that they vary."],
      ["Gender roles are decided only by the government of each country", "Family, religion and custom also shape them."],
    ],
    answer: "A",
    hints: ["Think about what variation between societies shows."],
    explanation: "Variation between societies shows that many roles are **learned**.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Sex is learned from society, while gender is a biological fact.",
    answer: false,
    explanation: "False. Sex is biological; gender is learned from society.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Section 56 of the Constitution of Zimbabwe protects equality and non-discrimination.",
    answer: true,
    explanation: "True. Section 56 says that everyone is equal before the law and may not be unfairly discriminated against, including because of sex or gender.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Gender stereotype", "A fixed idea about what women or men are like"],
      ["Gender role", "Tasks a society expects of a person because of their sex"],
      ["Patriarchy", "A system in which men hold most of the power"],
      ["Gender-based violence", "Harm done to someone because of their gender"],
    ],
    explanation: "Each term has its own meaning; learn the definitions.",
  });
  b.fib({
    d: 3, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Section {{blank:a}} of the Constitution promotes gender balance, and section {{blank:b}} sets out the rights of women.",
    blanks: [
      { id: "a", accepted: ["17"], choices: ["17", "56", "60", "80"] },
      { id: "b", accepted: ["80"], choices: ["17", "56", "60", "80"] },
    ],
    hints: ["Section 56 is about equality and non-discrimination in general."],
    explanation: "Section **17** (gender balance) and section **80** (rights of women).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What word describes a fixed, oversimplified idea about what women or men are like?",
    accepted: ["stereotype", "gender stereotype", "a stereotype"],
    wrong: ["patriarchy", "equity"],
    explanation: "It is a **stereotype**.",
  });
  b.manualShort({
    d: 1, skill: "RECALL", marks: 3,
    stem: "State **three** agents that teach children gender roles.",
    points: ["Family", "School", "Religion, media or peers"],
    modelAnswer: "Three agents are the family, the school and the media (or religion or peers).",
    explanation: "One mark for each agent.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain the difference between sex and gender.",
    points: [
      ["Sex is biological: the physical differences between females and males", 1],
      ["Example: only women can give birth", 1],
      ["Gender is the roles and expectations a society attaches to being female or male, and is learned", 1],
      ["Example: who cooks or who leads a meeting differs between societies and changes over time", 1],
    ],
    modelAnswer: "Sex is biological: the physical differences between females and males, for example only women can give birth. Gender is the roles and expectations a society attaches to being female or male, and it is learned. For example, who cooks or who leads a meeting differs between societies and changes over time.",
    hints: ["Define each term and give an example."],
    explanation: "Each definition earns a mark, each example a mark.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain **two** ways in which gender stereotypes can harm young people.",
    points: [
      ["They limit the subjects or careers a young person chooses", 1],
      ["Developed: a girl who believes science is for boys may not study it and so loses opportunities", 2],
      ["They limit how young people express their feelings", 1],
      ["Developed: a boy who thinks men must not cry may hide his pain and not seek help", 2],
    ],
    modelAnswer: "Stereotypes limit the subjects or careers a young person chooses. A girl who believes science is for boys may not study it and so loses opportunities. They also limit how young people express their feelings. A boy who thinks men must not cry may hide his pain and not seek help.",
    hints: ["Think about education, careers and emotions."],
    explanation: "Two harms, each stated and developed.",
  });

  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "an extract from a fictional school magazine in Bulawayo, 2026",
      "At home I am expected to cook and wash while my brother plays football. At school my teacher gives the girls and boys the same duties. At church the women prepare tea and the men count the offering. On the radio, adverts show women in the kitchen and men in offices. I wonder who decides these things."
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which agent of socialisation gives the girl and boy the same duties in Source A?",
        options: [
          ["School", "Correct: the teacher gives the same duties."],
          ["Family", "At home the duties differ."],
          ["Church", "At church the duties differ."],
          ["Media", "The radio adverts show different roles."],
        ],
        answer: "A", explanation: "The school gives the same duties to girls and boys.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Using Source A, identify **three** agents that teach gender roles.",
        points: ["Family (cooking and washing for the girl)", "Religion or church (women prepare tea, men count offering)", "Media (radio adverts)"],
        modelAnswer: "The family, the church and the radio adverts (media) all teach gender roles in the source.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain how the unequal duties at home may affect the girl.",
        points: [["She has less time for study or play", 1], ["She may come to believe that household work is only for girls", 1], ["This may limit her opportunities and confidence in future", 1]],
        modelAnswer: "She has less time for study or play than her brother. She may come to believe that household work is only for girls. This may limit her opportunities and confidence in the future.",
      }),
    ],
    hints: ["In (c) think of time, belief and opportunity."],
    explanation: "The source shows several agents teaching different roles.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1200,
    stem: "Tafadzwa says: \"Gender roles come from nature and should not change.\" Chipo says: \"Most gender roles are learned and can change.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Outline **two** ways in which religion may teach gender roles.",
        points: [["Through teachings and sacred stories about women and men", 1], ["Through leadership roles in worship and ceremonies", 1], ["Through rules about dress, marriage and family", 1], ["Through the example of religious teachers and the community", 1]],
        modelAnswer: "Religion may teach gender roles through teachings and sacred stories about women and men, and through the leadership roles allowed in worship and ceremonies.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain **one** way in which the Constitution of Zimbabwe protects gender equality.",
        points: [["Section 56 says everyone is equal before the law and may not be unfairly discriminated against because of sex or gender", 2], ["Section 80 says women have equal dignity and opportunities, and laws or customs infringing women's rights are void (or section 17: the State must promote gender balance)", 2]],
        modelAnswer: "Section 56 says that everyone is equal before the law and may not be treated unfairly because of sex or gender, so a person cannot be denied a job or an education because of being a woman or a man.",
      }),
      P.manual({
        label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 280 },
        stem: "Assess the view that gender roles are fixed by nature.",
        points: [["For: there are biological differences, such as childbirth and breastfeeding", 2], ["Against: many roles vary between societies and change over time, such as who cooks, farms or leads", 2], ["Against: family, school, religion and media teach roles, which shows they are learned", 2], ["A supported judgement", 2]],
        levels: levels(8),
        modelAnswer: "Some differences are biological: only women give birth and breastfeed. However, most gender roles are not fixed by nature. Who cooks, farms or leads differs between societies and has changed over time, and children learn their roles from family, school, religion and media. I conclude that biology explains only a small part, and most gender roles are learned and can change.",
      }),
    ],
    hints: ["Separate biological differences from social expectations."],
    explanation: "A strong answer separates sex from gender and uses evidence of variation and change.",
  });

  b.card("DEFINITION", "What is **sex**?", "The biological differences between females and males.");
  b.card("DEFINITION", "What is **gender**?", "The roles, behaviours and expectations a society attaches to being female or male; it is learned.");
  b.card("DEFINITION", "What is a **gender stereotype**?", "A fixed, oversimplified idea about what women or men are like or should do.");
  b.card("DEFINITION", "What is **patriarchy**?", "A system in which men hold most power and authority.");
  b.card("DEFINITION", "What is **gender-based violence**?", "Harm done to a person because of their gender or unequal power between the genders.");
  b.card("CONCEPT", "What is the difference between gender equality and equity?", "Equality is the same rights and opportunities; equity is fair treatment that may differ to reach equal outcomes.");
  b.card("FACT", "Which sections of the Constitution deal with gender?", "Section 17 (gender balance), section 56 (equality and non-discrimination), section 80 (rights of women).");
  b.card("FACT", "Name four agents that teach gender roles.", "Family, religion, school and media (also peers).");
  b.card("CONCEPT", "Why are gender roles said to be learned?", "They vary between societies and change over time, and children learn them from family, school, religion and media.");
});
