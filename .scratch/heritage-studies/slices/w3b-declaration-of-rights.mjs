// W3b: The Declaration of Rights (her.constitution.declaration-of-rights).
// Reviewer note: section numbers used: 44 (duty to respect), 56 (equality), 73 (environment), 75 (education),
// 76 (health care), 78 (marriage), 80-84 (groups), 85 (enforcement), 86 (limitation; rights that can never be limited).
import { concept, P, source, levels } from "../lib.mjs";

concept("her.constitution.declaration-of-rights", { file: "constitution/declaration-of-rights", keyPrefix: "constitution.declaration-of-rights" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which sections of the Constitution make up the Declaration of Rights?",
    options: [
      ["sections 44 to 87", "Correct: Chapter 4 runs from section 44 to section 87."],
      ["sections 1 to 6", "These are founding provisions in Chapter 1."],
      ["sections 35 to 43", "These deal with citizenship in Chapter 3."],
      ["sections 162 to 170", "These deal with the courts."],
    ],
    answer: "A",
    explanation: "The Declaration of Rights is Chapter 4, sections 44 to 87.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which independent commission receives and investigates complaints about human rights violations?",
    options: [
      ["the Zimbabwe Human Rights Commission", "Correct: it promotes, monitors and investigates human rights."],
      ["the Zimbabwe Electoral Commission", "ZEC runs elections."],
      ["the Zimbabwe Media Commission", "It deals with media matters, not all human rights complaints."],
      ["the Zimbabwe Anti-Corruption Commission", "It investigates corruption, not human rights complaints in general."],
    ],
    answer: "A",
    explanation: "The Zimbabwe Human Rights Commission (Chapter 12) promotes awareness, monitors rights and investigates complaints.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of the following is a right that can **never** be limited by any law?",
    options: [
      ["freedom from torture", "Correct: section 86 says this right can never be limited."],
      ["freedom of movement", "This can be limited, for example to stop a disease spreading."],
      ["freedom of assembly", "This can be limited by fair, general laws."],
      ["property rights", "This can be limited, for example for public purposes with compensation."],
    ],
    answer: "A",
    explanation: "Section 86 lists rights that can never be limited, including freedom from torture, human dignity, freedom from slavery, a fair trial and habeas corpus.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Under section 85, what may a person do if a right in the Declaration is infringed?",
    options: [
      ["approach a court for protection", "Correct: section 85 allows a person to approach a court."],
      ["take revenge on the person responsible", "Self-help or revenge is not lawful; courts decide."],
      ["ask Parliament to remove the right", "Parliament cannot simply remove a right; this would not protect the person."],
      ["nothing, because rights cannot be enforced", "Rights in Chapter 4 are enforceable."],
    ],
    answer: "A",
    explanation: "Section 85 lets any person, alone or through others, approach a court when a right is infringed or threatened.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A girl of 15 is being pressured to marry. Which right in the Declaration is **most directly** being violated?",
    options: [
      ["marriage rights: marriage needs free consent, at 18 or over", "Correct: section 78 sets 18 and free consent."],
      ["the right to vote in elections", "Voting is not the issue here."],
      ["freedom of the media", "This is not the issue."],
      ["the right to an environment that is not harmful to health", "Environmental rights are not the issue here."],
    ],
    answer: "A",
    explanation: "Section 78 says marriage requires free consent and sets 18 as the minimum age; child marriage is also a violation of children's rights.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A company dumps waste into a river that a village in Chinhoyi uses for drinking water. Which right is **most directly** affected?",
    options: [
      ["the right to an environment that is not harmful to health", "Correct: section 73 protects environmental rights."],
      ["the right to freedom of conscience", "Conscience concerns beliefs, not pollution."],
      ["the right to form and join a political party", "This is a political right, not the issue."],
      ["the right to habeas corpus", "Habeas corpus concerns detained persons."],
    ],
    hints: ["Think about what has been damaged."],
    answer: "A",
    explanation: "Section 73 gives every person the right to an environment that is not harmful to health or well-being.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statement **best** describes the duty that comes with the right to freedom of expression?",
    options: [
      ["Speaking freely without spreading hatred or lies that harm others", "Correct: rights are exercised with respect for others' rights."],
      ["Speaking only when a government official has given written permission", "This would destroy the freedom."],
      ["Never criticising anyone in public", "Fair criticism is part of freedom of expression."],
      ["Using only English when speaking in public", "The Constitution recognises sixteen languages."],
    ],
    answer: "A",
    hints: ["How can one person's freedom harm another?"],
    explanation: "Freedom of expression carries the duty not to incite violence, spread hate or damage others with falsehoods.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "To stop a dangerous disease spreading, a law bans gatherings of more than fifty people for six weeks, for everyone. Using section 86, which is the **best** judgement?",
    options: [
      ["It is likely to be justifiable: general, temporary and for an important purpose", "Correct: it meets the tests of section 86."],
      ["It is unlawful because no right may ever be limited", "Most rights may be limited fairly."],
      ["It is justifiable only if it is applied to the members of one religious group in the town", "A law targeting one group would be discriminatory."],
      ["It allows the police to torture people who break it", "Freedom from torture can never be limited."],
    ],
    answer: "A",
    hints: ["Check: general law, purpose, fairness and time."],
    explanation: "A limitation by a general law, for an important purpose, lasting only as long as needed, is likely to be fair, reasonable and justifiable.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Section 44 says that the state and every person must respect the rights in the Declaration of Rights.",
    answer: true,
    explanation: "True. Section 44 places a duty on the state, every person and every institution to respect, protect, promote and fulfil the rights.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Every right in the Declaration of Rights is absolute and can never be limited.",
    answer: false,
    explanation: "False. Most rights can be limited under section 86 by fair, general laws; only a few, such as freedom from torture, can never be limited.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each section of the Constitution with the right it protects.",
    pairs: [
      ["section 56", "equality and non-discrimination"],
      ["section 73", "environmental rights"],
      ["section 75", "education"],
      ["section 76", "health care"],
    ],
    extraRight: ["citizenship by descent"],
    explanation: "Section 56 equality; 73 environment; 75 education; 76 health care. Citizenship is in Chapter 3, not Chapter 4.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Complete the sentences about section 86.",
    template: "A right may be limited only by a law of {{blank:a}} application, and only as far as the limitation is fair, reasonable, necessary and {{blank:b}} in a democratic society.",
    blanks: [
      { id: "a", accepted: ["general"], choices: ["general", "secret", "temporary", "local"] },
      { id: "b", accepted: ["justifiable"], choices: ["justifiable", "profitable", "popular", "convenient"] },
    ],
    hints: ["A limitation must apply to everyone equally."],
    explanation: "Section 86: a law of general application, fair, reasonable, necessary and justifiable in a democratic society.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Identify **four** rights found in the Declaration of Rights.",
    points: [
      "Any one of: life; personal liberty; dignity; freedom from torture/slavery; equality; privacy; expression; assembly and association; conscience/religion; movement; political rights; fair hearing; property; environment; education; health care; food and water; marriage rights; language and culture",
      "A second different right",
      "A third different right",
      "A fourth different right",
    ],
    modelAnswer: "The right to life, freedom of expression, the right to education and the right to a fair hearing.",
    explanation: "One mark per correct right.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways in which rights in the Declaration of Rights are enforced.",
    points: [
      "Identifies the courts (section 85)",
      "Develops: any person can approach a court if a right is infringed, and the court can order it to be respected",
      "Identifies the Zimbabwe Human Rights Commission (or another commission)",
      "Develops: it receives and investigates complaints and recommends action, and educates people about rights",
    ],
    modelAnswer: "Under section 85, any person whose right is infringed can approach a court, which can order the right to be respected and give a remedy. The Zimbabwe Human Rights Commission receives and investigates complaints, recommends action and educates people about their rights.",
    hints: ["One way through the courts, one through a commission."],
    explanation: "One mark for each way and one for its development.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 6,
    stem: "Sipho is arrested in Gwanda and held for a week without being told why or taken to court. Identify **two** rights that have been violated and suggest **one** action that could be taken, explaining each.",
    points: [
      "Identifies: the right to be told the reason for arrest (rights of arrested and detained persons)",
      "Explains: an arrested person must be informed promptly of the reason so he can respond and seek help",
      "Identifies: the right to be brought before a court promptly / personal liberty",
      "Explains: detention without a court hearing removes liberty unlawfully",
      "Suggests: a lawyer or relative applies to the High Court (habeas corpus) or the matter is reported to the Zimbabwe Human Rights Commission",
      "Explains: the court can order his release or that he be brought before it; the commission can investigate",
    ],
    modelAnswer: "Sipho's right to be told promptly why he was arrested has been violated; he needs to know the reason in order to answer the charge and get help. His right to be brought before a court promptly, and so his personal liberty, has also been violated, because he has been held for a week without a hearing. A lawyer or relative can apply to the High Court for an order of habeas corpus, so that the court orders him to be brought before it or released; the case can also be reported to the Zimbabwe Human Rights Commission for investigation.",
    hints: ["Think of what must happen when a person is arrested."],
    explanation: "One mark for each right, one for each explanation, and two for a sensible action with its explanation.",
  });
  b.struct({
    d: 4, skill: "APPLICATION",
    stem: source("Source A", "a report in a fictional newspaper, Marondera, 2026",
      "Residents of a high-density suburb marched peacefully to the council offices to hand over a petition about burst sewer pipes. The march had been notified to the police in advance. A resident said the smell had made children ill. The council chairperson accepted the petition and promised repairs within a month. A local radio station broadcast interviews with both residents and councillors.") +
      "\n\nRead Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "Which right did the residents mainly exercise by marching to hand over a petition?",
        options: [
          ["the right to demonstrate and present petitions", "Correct: they marched peacefully and presented a petition."],
          ["the right to a fair trial", "No one was on trial."],
          ["the right to marry", "This is not relevant."],
          ["the right to apply for citizenship by registration", "This is not relevant."],
        ],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "Identify **three** other rights shown or affected in the source.",
        points: [
          "A clean, healthy environment (burst sewers)",
          "Health (children made ill) / health care",
          "Freedom of expression and the media (radio interviews) / freedom of assembly",
        ],
        modelAnswer: "The right to an environment that is not harmful to health, the right to health, and freedom of expression and of the media.",
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain how the residents and the council each showed responsibility in the source.",
        points: [
          "Residents marched peacefully and notified the police in advance",
          "showing that they exercised their rights lawfully and respected others",
          "The council accepted the petition and promised repairs",
          "showing accountability to residents and respect for their environmental rights",
        ],
        modelAnswer: "The residents marched peacefully and told the police in advance, which shows that they used their rights lawfully and without harming others. The council accepted the petition and promised repairs, which shows that it was accountable to residents and respected their right to a healthy environment.",
      }),
    ],
    hints: ["In (c), look for what each side did that was lawful and respectful."],
    explanation: "A source-based practice item on exercising and respecting rights.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "This question is about the limitation of rights.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Explain why rights in the Declaration of Rights may sometimes be limited.",
        points: [
          "To protect the rights of others (e.g. expression does not include inciting violence)",
          "To protect public health and safety (e.g. limits on movement during an outbreak)",
          "Limits must be by a general law and fair, reasonable, necessary and justifiable (section 86)",
          "Some rights can never be limited (torture, slavery, fair trial, dignity, habeas corpus)",
        ],
        modelAnswer: "Rights may be limited to protect the rights of others; for example, freedom of expression does not allow a person to incite violence. They may also be limited to protect public health and safety, such as restricting movement during a disease outbreak. Under section 86, a limitation must be made by a general law and be fair, reasonable, necessary and justifiable, and some rights, such as freedom from torture, can never be limited.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Allowing rights to be limited makes the Declaration of Rights weak.\" Discuss.",
        points: [
          ["For: limitations can be misused to silence critics or ban meetings; ordinary people may not be able to challenge them", 2],
          ["Against: section 86 sets strict tests; general law, purpose, proportionality; courts can strike down unfair limits", 2],
          ["Against: some rights can never be limited; limits protect other people's rights and public safety", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "Some people argue that allowing limits weakens the Declaration. Limits on assembly or expression could be used to stop peaceful protest or criticism, and ordinary citizens may not have the money or knowledge to challenge them in court.\n\nHowever, section 86 sets strict tests. A limit must be made by a law of general application and must be fair, reasonable, necessary and justifiable in a democratic society, and the courts can strike down limits that fail these tests. Some rights, such as freedom from torture and the right to a fair trial, can never be limited. Without any limits, one person's freedom could destroy another's, for example through hate speech or by spreading a disease.\n\nI disagree with the statement. Well-defined limits protect the rights of everyone and make the Declaration workable. The real risk lies in misuse, which is why independent courts, commissions and informed citizens are essential.",
      }),
    ],
    hints: ["In (b), weigh the danger of misuse against the tests in section 86."],
    explanation: "A practice evaluative item on the limitation of rights.",
  });

  b.card("FACT", "Which chapter and sections form the Declaration of Rights?", "Chapter 4, sections 44 to 87.");
  b.card("DEFINITION", "Fundamental human rights", "Basic entitlements every person has because he or she is human, such as life, equality and freedom of expression.");
  b.card("FACT", "What does section 85 provide?", "Any person may approach a court if a right in the Declaration is infringed or threatened.");
  b.card("FACT", "What tests must a limitation of rights meet under section 86?", "It must be by a law of general application and be fair, reasonable, necessary and justifiable in a democratic society.");
  b.card("FACT", "Name four rights that can never be limited.", "Any four of: life (except as in section 48), human dignity, freedom from torture, freedom from slavery, a fair trial, habeas corpus.");
  b.card("FACT", "Which sections protect specific groups?", "80 women, 81 children, 82 the elderly, 83 persons with disabilities, 84 veterans of the liberation struggle.");
  b.card("FACT", "Which sections protect education and health care?", "Section 75 (education) and section 76 (health care).");
  b.card("CONCEPT", "Give an example of a right and its duty.", "Freedom of expression carries the duty not to spread hate or lies that harm others.");
  b.card("CONCEPT", "Name three bodies that help enforce rights.", "The courts, the Zimbabwe Human Rights Commission and other independent commissions (also Parliament, the media, civil society).");
});
