// W3b: Religion, gender equality and gender-based violence (Topic 8.4).
// Reviewer notes: the Marriages Act 2022 is cited in outline only (minimum marriage age 18); check against the Act. Sensitive
// content: no graphic detail; help channels are Childline 116, the police Victim Friendly Unit, a clinic, a trusted adult.
import { concept, P, source, levels } from "../lib.mjs";

concept("frs.gender.equality-gbv", { file: "gender/equality-gbv", keyPrefix: "gender.equality-gbv" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is gender-based violence?",
    options: [
      ["Harm done to a person because of their gender or unequal power", "Correct: it includes physical, sexual, emotional and economic abuse."],
      ["A disagreement between two friends about a school sports match", "An ordinary disagreement is not GBV."],
      ["A law passed by Parliament about the minimum age of marriage", "That is a law, not violence."],
      ["A religious festival in which families give gifts to the poor", "That is a festival, not violence."],
    ],
    answer: "A",
    explanation: "**GBV** is harm done to a person because of their gender or unequal power between the genders.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which Act of 2007 makes domestic violence unlawful in Zimbabwe?",
    options: [
      ["The Domestic Violence Act", "Correct: it provides for protection orders and police action."],
      ["The Marriages Act", "The Marriages Act of 2022 deals with marriage, including the minimum age."],
      ["The Education Amendment Act", "That Act concerns schooling, from 2020."],
      ["The Constitution Amendment Act", "That is not the Act on domestic violence."],
    ],
    answer: "A",
    explanation: "The **Domestic Violence Act 2007** makes domestic violence unlawful.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which religious teaching can be used to encourage respect and kindness between spouses?",
    options: [
      ["Qur'an 30:21, on affection and mercy between spouses", "Correct: it supports respect in marriage."],
      ["Genesis 12:1, which tells Abraham to leave his own country", "This verse concerns the call of Abraham."],
      ["Exodus 20:8, which commands keeping the Sabbath day holy", "This concerns the Sabbath."],
      ["Acts 2:1, which describes the day of Pentecost for Christians", "This concerns Pentecost."],
    ],
    answer: "A",
    hints: ["Which verse is about married life?"],
    explanation: "**Qur'an 30:21** speaks of affection and mercy between spouses.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of these is a harmful practice that is unlawful in Zimbabwe?",
    options: [
      ["Marrying off a girl under 18", "Correct: the minimum age of marriage is 18."],
      ["Paying roora/lobola with the consent of both families", "Agreed lobola is lawful; harm arises when a person is forced."],
      ["Praying for a family at the beginning of a wedding", "Prayer is lawful and not harmful."],
      ["Giving a widow a share of her husband's estate by law", "This protects her rights."],
    ],
    answer: "A",
    explanation: "Child marriage is **harmful and unlawful** (Constitution, section 78).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the most helpful response of a religious leader to a member who reports being beaten at home?",
    options: [
      ["Treat it as serious, offer safety and refer to the authorities", "Correct: violence is wrong and survivors need help."],
      ["Tell the person to stay silent so that the family keeps its reputation", "Silence allows the violence to continue."],
      ["Say that the matter is private and that no help should be offered", "This leaves the survivor unprotected."],
      ["Advise the person that suffering is always required by religion", "Most religious teachings condemn violence."],
    ],
    answer: "A",
    hints: ["Which answer protects the person who is being harmed?"],
    explanation: "A caring leader **treats violence as serious and helps the survivor to safety**.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "An imam and a church minister hold a joint evening where they read from their scriptures on kindness in marriage and give out numbers for help. What does this show?",
    options: [
      ["Religions can work together to prevent GBV", "Correct: shared action on a shared problem."],
      ["Religions must always compete with one another", "The example shows cooperation."],
      ["Religious leaders have no part in community concerns", "The example shows them acting."],
      ["Only the police are able to address violence at home", "Communities and leaders also have roles."],
    ],
    answer: "A",
    hints: ["Think about what two different religions are doing together."],
    explanation: "Interfaith action shows how **religions can work together** against GBV.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why is it unfair to say that one religion alone causes GBV?",
    options: [
      ["GBV occurs in all societies; religions teach against it", "Correct: it is a human problem found everywhere."],
      ["GBV has never been recorded anywhere in the world at any time", "GBV is a worldwide problem."],
      ["GBV is caused only by people who have no religion at all", "It also occurs among believers."],
      ["GBV is a topic that no religion has ever spoken about in public", "Religions do speak about it."],
    ],
    answer: "A",
    hints: ["Think about how widespread GBV is."],
    explanation: "GBV occurs in **all societies**, and each religion contains teachings that support dignity.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which conclusion about religion and gender equality is best supported?",
    options: [
      ["Each religion has resources for equality, but practice differs", "Correct: leadership and interpretation matter."],
      ["Religion always promotes equality in every place and every situation", "Misuse and some customs hinder equality."],
      ["Religion always hinders equality in every place and every situation", "Many religious people work for equality."],
      ["Religion has no effect at all on how families treat their members", "Religion strongly influences family life."],
    ],
    answer: "A",
    hints: ["Choose the answer that recognises both sides."],
    explanation: "Religions contain **resources for dignity**, and results depend on how teachings are interpreted and applied.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Child marriage is lawful if a family says that it is part of their religion.",
    answer: false,
    explanation: "False. The Constitution sets 18 as the minimum age of marriage, and freedom of religion does not allow the denial of a child's rights.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Men and boys have no part to play in ending gender-based violence.",
    answer: false,
    explanation: "False. Men and boys are essential partners in prevention, and they can also be victims.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each source with what it contributes to gender equality or protection.",
    pairs: [
      ["Genesis 1:27", "Men and women are made in God's image"],
      ["Constitution, section 78", "Marriage requires consent and a minimum age of 18"],
      ["Domestic Violence Act 2007", "Protection orders and police action against domestic violence"],
      ["Childline Zimbabwe 116", "A helpline where children can ask for help"],
    ],
    explanation: "Each source supports equality or protection in a different way.",
  });
  b.fib({
    d: 3, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The {{blank:a}} Violence Act of 2007 makes domestic violence unlawful, and children may call Childline on {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Domestic"], choices: ["Domestic", "Education", "Marriage", "Land"] },
      { id: "b", accepted: ["116"], choices: ["116", "999", "112", "211"] },
    ],
    hints: ["Remember the key fact box for this lesson."],
    explanation: "The **Domestic** Violence Act 2007; Childline **116**.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What is the name of the harmful custom of promising a girl in marriage to settle a debt or gain favour?",
    accepted: ["pledging", "kuzvarira"],
    wrong: ["lobola", "roora"],
    explanation: "It is **pledging** (kuzvarira), which is harmful and unlawful.",
  });
  b.manualShort({
    d: 1, skill: "RECALL", marks: 3,
    stem: "State **three** harmful practices that affect women and girls.",
    points: ["Child marriage or pledging", "Forced marriage or wife inheritance without consent", "Virginity testing, or denial of inheritance and property grabbing"],
    modelAnswer: "Child marriage or pledging, forced marriage or wife inheritance without consent, and virginity testing or denial of inheritance are harmful practices.",
    explanation: "One mark for each practice.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how religious groups can help to reduce gender-based violence.",
    points: [
      ["Teach that violence is wrong and that men and women have equal worth", 1],
      ["Offer counselling and safe places to survivors", 1],
      ["Work with the police and clinics, and refer survivors for help", 1],
      ["Run campaigns and men's groups to teach respect and non-violence", 1],
    ],
    modelAnswer: "Religious groups can teach that violence is wrong and that men and women have equal worth. They can offer counselling and safe places to survivors, work with the police and clinics, and run campaigns and men's groups to teach respect and non-violence.",
    hints: ["Think of teaching, support, partnership and campaigns."],
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain **two** ways in which religious teachings or customs can hinder gender equality.",
    points: [
      ["Some verses or teachings are interpreted to justify male control", 1],
      ["Developed: women may be silenced or discouraged from leaving unsafe marriages, so violence continues", 2],
      ["Some harmful customs are defended as tradition", 1],
      ["Developed: child marriage or denial of inheritance removes girls' education and women's property, leaving them dependent", 2],
    ],
    modelAnswer: "Some verses or teachings are interpreted to justify male control, so women may be silenced or discouraged from leaving unsafe marriages and violence continues. Some harmful customs are also defended as tradition. Child marriage or denial of inheritance removes girls' education and women's property, leaving them dependent.",
    hints: ["Think of interpretation and of customs defended as tradition."],
    explanation: "Two ways, each stated and developed.",
  });

  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "an extract from a fictional newspaper report from Bindura, 2026",
      "Church and mosque leaders in Bindura have launched a joint campaign against gender-based violence. Leaders will teach in their congregations that violence is wrong, train volunteers as counsellors and give families the telephone numbers of the police Victim Friendly Unit and Childline. A women's fellowship will run a safe room at the church hall. One elder said: \"Some of us stayed silent in the past. We will not do so again.\""
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which action in Source A offers practical protection to survivors?",
        options: [
          ["The safe room at the church hall", "Correct: it offers a safe place."],
          ["The leaders' decision to stay silent", "The source says they will no longer be silent."],
          ["The sale of tickets for a fundraising concert", "No concert is mentioned."],
          ["The opening of a new school at the mosque", "No school is mentioned."],
        ],
        answer: "A", explanation: "The safe room is a practical protection for survivors.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Using Source A, identify **three** actions the religious leaders will take.",
        points: ["Teach in their congregations that violence is wrong", "Train volunteers as counsellors", "Give families the numbers of the Victim Friendly Unit and Childline, and run a safe room"],
        modelAnswer: "They will teach in their congregations that violence is wrong, train volunteers as counsellors, and give families the numbers of the Victim Friendly Unit and Childline while running a safe room.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain why the elder's remark about silence matters in preventing GBV.",
        points: [["Silence by religious leaders can suggest that violence is acceptable or private", 1], ["Speaking out shows that violence is wrong and encourages survivors to seek help", 1], ["It changes attitudes in the community and supports the law", 1]],
        modelAnswer: "Silence by religious leaders can suggest that violence is acceptable or a private matter. Speaking out shows that violence is wrong and encourages survivors to seek help. It also changes attitudes in the community and supports the law.",
      }),
    ],
    hints: ["In (c) think of the message that silence gives and the message that speaking gives."],
    explanation: "The source shows how religious leaders can move from silence to action.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1200,
    stem: "Two students disagree. Tafadzwa says: \"Religion is the main reason why gender inequality continues.\" Thandeka says: \"Religion is also one of the strongest forces for equality and for helping survivors.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Outline **two** laws or rights in Zimbabwe that protect women and girls from violence or harmful practices.",
        points: [["The Domestic Violence Act 2007 makes domestic violence unlawful", 2], ["The Constitution: section 78 (marriage at 18 and by free consent) or section 80 (rights of women)", 2]],
        modelAnswer: "The Domestic Violence Act 2007 makes domestic violence unlawful and provides for protection orders. Section 78 of the Constitution sets 18 as the minimum age of marriage and requires free consent.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain **one** way in which women's leadership in religion can promote gender equality.",
        points: [["Women leaders are role models who show that women can teach and lead", 1], ["Developed: girls and boys learn that women's voices are valued", 1], ["Women leaders can speak on women's concerns such as violence and inheritance", 1], ["Developed: this makes sure the concerns are heard and acted on in the congregation", 1]],
        modelAnswer: "Women leaders are role models who show that women can teach and lead, so girls and boys learn that women's voices are valued. They can also speak on women's concerns such as violence and inheritance, so these are heard and acted on in the congregation.",
      }),
      P.manual({
        label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 280 },
        stem: "Assess how far religions promote gender equality in Zimbabwe today.",
        points: [["For: teachings on equal worth and respect, women's leadership, women's groups and practical help", 2], ["For: religious leaders and interfaith campaigns against GBV", 2], ["Against or limits: misuse of teachings, harmful customs such as child marriage, women excluded from some leadership roles", 2], ["A supported judgement", 2]],
        levels: levels(8),
        modelAnswer: "Religions promote equality through teachings on equal worth and respect in marriage, through women's leadership and groups, and through counselling and campaigns against violence. However, some teachings are misused to justify male control, some customs such as child marriage persist under the name of tradition, and women are excluded from some leadership roles. I conclude that religions contain strong resources for equality and have done much to promote it, but their effect depends on how leaders and communities interpret and apply them.",
      }),
    ],
    hints: ["Consider both what religions do to help and how teachings can be misused."],
    explanation: "A strong answer weighs both sides across more than one religion and reaches a judgement.",
  });

  b.card("DEFINITION", "What is **gender-based violence (GBV)**?", "Harm done to a person because of their gender or unequal power between the genders; it violates human rights.");
  b.card("DEFINITION", "What is a **harmful practice**?", "A custom that damages the health, dignity or rights of a person, such as child marriage or virginity testing.");
  b.card("FACT", "Which Act of 2007 makes domestic violence unlawful in Zimbabwe?", "The Domestic Violence Act 2007.");
  b.card("FACT", "What is the minimum age of marriage in Zimbabwe?", "18 (Constitution, section 78; also the Marriages Act 2022).");
  b.card("FACT", "Where can a child or survivor find help?", "A trusted adult, a clinic, the police Victim Friendly Unit, or Childline Zimbabwe (116).");
  b.card("FACT", "Which Qur'an verse speaks of affection and mercy between spouses?", "Qur'an 30:21.");
  b.card("CONCEPT", "How can religious leaders help prevent GBV?", "Teach that violence is wrong, support survivors, work with the authorities and teach men and boys respect.");
  b.card("CONCEPT", "How can religion hinder gender equality?", "Teachings can be misused to justify male control, and harmful customs may be defended as tradition.");
  b.card("CONCEPT", "Why are men partners in ending GBV?", "Men and boys can change attitudes, share responsibility and protect others, and they can also be victims.");
});
