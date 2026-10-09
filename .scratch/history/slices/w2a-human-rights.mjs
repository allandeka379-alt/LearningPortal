// Slice W2a: human rights and children's rights and responsibilities (ZIMSEC topic 15.3).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.constitution.human-rights", { file: "constitution/human-rights", keyPrefix: "constitution.human-rights" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Up to what age is a person a child under the Constitution of Zimbabwe?",
    options: [
      ["Under 18", "Correct: as in the UN Convention on the Rights of the Child."],
      ["Under 16", "Sixteen is not the constitutional definition."],
      ["Under 21", "Twenty-one is not the definition."],
      ["Under 12", "Twelve is far too young."],
    ],
    answer: "A",
    explanation: "A child is a person **under 18**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of these is a civil and political right?",
    options: [
      ["Freedom of expression", "Correct: a civil and political right."],
      ["The right to education", "This is a social right."],
      ["The right to fair pay", "This is an economic right."],
      ["The right to health care", "This is a social right."],
    ],
    answer: "A",
    explanation: "**Freedom of expression** is a civil and political right; education, fair pay and health care are economic and social rights.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of these is a responsibility of a child rather than a right?",
    options: [
      ["Respecting the rights of other pupils", "Correct: a duty that comes with rights."],
      ["Having a name and a birth certificate from the state", "This is a right."],
      ["Being protected from child labour", "This is a right."],
      ["Receiving education", "This is a right (attending school is a responsibility)."],
    ],
    answer: "A",
    explanation: "**Respecting others' rights** is a responsibility; the others are rights.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "When was the UN Convention on the Rights of the Child adopted?",
    options: [
      ["1989", "Correct: on 20 November 1989."],
      ["1948", "1948 is the year of the UDHR."],
      ["1981", "1981 is the year of the African Charter on Human and Peoples' Rights."],
      ["2013", "2013 is the year of Zimbabwe's Constitution."],
    ],
    answer: "A",
    explanation: "The **CRC** was adopted on 20 November **1989**.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which right can never be limited under the Constitution of Zimbabwe?",
    options: [
      ["Freedom from torture", "Correct: it may not be limited at all."],
      ["Freedom of movement", "This can be limited, for example in an epidemic."],
      ["Freedom of assembly", "This can be limited for public order and safety."],
      ["Freedom of expression", "This can be limited, for example to prevent hate speech."],
    ],
    answer: "A",
    hints: ["Some rights protect a person's body and dignity absolutely."],
    explanation: "**Freedom from torture** (like freedom from slavery and the right to a fair trial) may not be limited.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A town bans public gatherings during an outbreak of cholera. Which reason for limiting rights does this use?",
    options: [
      ["Public health", "Correct: limiting assembly to stop disease spreading."],
      ["National security", "There is no threat from a foreign power here."],
      ["Protecting a person's reputation", "This relates to limits on expression."],
      ["Preventing child labour", "This is not related to gatherings."],
    ],
    answer: "A",
    hints: ["What is the danger in this situation?"],
    explanation: "Rights may be limited when fair and necessary to protect **public health**.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which is the strongest evidence that a right exists in law but is not fully enjoyed in practice?",
    options: [
      ["Some children still marry before 18", "Correct: despite the 2016 court ruling."],
      ["The Constitution lists children's rights", "This shows the right exists in law."],
      ["Zimbabwe ratified the CRC", "This is a legal commitment."],
      ["The UDHR has 30 articles", "This is a fact about the document."],
    ],
    answer: "A",
    hints: ["Look for a gap between law and reality."],
    explanation: "Although the Constitutional Court ruled in 2016 that no one may marry before 18, **child marriage still occurs** in some areas.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Universal Declaration of Human Rights has 30 articles.",
    answer: true,
    explanation: "True. Its first article states that all human beings are born free and equal in dignity and rights.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Under the Constitution, a child's best interests are paramount in every matter concerning the child.",
    answer: true,
    explanation: "True. The best interests of the child come first.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each situation with the child's right it involves.",
    pairs: [
      ["A baby is registered at the district office", "Right to a name and birth registration"],
      ["A girl of 13 is sent to work in a factory", "Right to protection from child labour"],
      ["A boy is vaccinated at a clinic", "Right to health care"],
      ["A judge decides who will care for an orphan", "Best interests of the child"],
    ],
    explanation: "Each situation involves a right in the Constitution's section on children.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "Constitutional Court rules against child marriage",
      "Universal Declaration of Human Rights",
      "Constitution of Zimbabwe with a Declaration of Rights",
      "UN Convention on the Rights of the Child",
    ],
    right: POS,
    rightIndex: [3, 0, 2, 1],
    hints: ["The UDHR came first, soon after the Second World War."],
    explanation: "UDHR 1948; CRC 1989; Constitution 2013; court ruling 2016.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Declaration of Rights is Chapter 4 of the {{blank:a}}. The UDHR was adopted by the UN {{blank:b}} in 1948.",
    blanks: [
      { id: "a", accepted: ["Constitution"], choices: ["Constitution", "Education Act", "Lancaster House Agreement", "Unity Accord"] },
      { id: "b", accepted: ["General Assembly"], choices: ["General Assembly", "Security Council", "Secretariat", "Trusteeship Council"] },
    ],
    explanation: "Chapter 4 of the **Constitution**; the **General Assembly** adopted the UDHR on 10 December 1948.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the independent commission set up to promote and protect human rights in Zimbabwe.",
    accepted: ["Zimbabwe Human Rights Commission", "Human Rights Commission", "ZHRC"],
    wrong: ["Zimbabwe Electoral Commission"],
    explanation: "The **Zimbabwe Human Rights Commission** (ZHRC).",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 5,
    stem: "List **five** rights of children under the Constitution of Zimbabwe.",
    points: [
      "Name and birth registration.",
      "Family or parental care.",
      "Education / health care / nutrition / shelter.",
      "Protection from exploitation, child labour and abuse.",
      "Not to be recruited into armed forces / best interests paramount / equal treatment.",
    ],
    modelAnswer: "The right to a name and birth registration; to family care; to education; to protection from child labour and abuse; to have their best interests treated as paramount.",
    explanation: "One mark per right (different rights).",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Explain why some human rights may be limited, giving **three** examples.",
    points: [
      "Identifies an example (e.g. expression limited to prevent hate speech).",
      "Explains: protects the rights/dignity of others.",
      "Identifies an example (e.g. movement or assembly limited in an epidemic).",
      "Explains: protects public health/safety.",
      "Identifies an example (e.g. liberty removed after conviction).",
      "Explains: prevents crime / enforces the law; limits must be fair, reasonable and necessary.",
    ],
    hints: ["For each example, say whose interests the limit protects."],
    modelAnswer: "Freedom of expression may be limited to stop hate speech or false statements, because these damage the rights and dignity of others. Freedom of movement and assembly may be limited during an epidemic to protect public health. The right to liberty is limited when a court sends a convicted person to prison, to prevent crime. Such limits are allowed only when they are fair, reasonable and necessary in a democratic society.",
    explanation: "Two marks per explained example.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "Assess the government's efforts to promote children's rights in Zimbabwe.",
    points: [
      "Effort: constitutional protection of children's rights; ratification of the CRC.",
      "Effort: expansion of education after 1980 / help with fees for vulnerable children.",
      "Effort: immunisation and child health programmes; 2016 ruling against child marriage.",
      "Limit: economic problems restrict free education and health care.",
      "Limit: child marriage, child labour and gaps in birth registration persist in some areas.",
      "Supported judgement.",
    ],
    hints: ["Give efforts and limits, then judge."],
    modelAnswer: "The government has done much on paper and in practice. The Constitution protects children's rights, and Zimbabwe ratified the CRC in 1990. Education expanded rapidly after 1980, and vulnerable children have been helped with fees. Immunisation campaigns improved child health, and in 2016 the Constitutional Court ruled that no one may marry before 18. However, economic difficulties have made free education and health care hard to provide for all, and child marriage, child labour and gaps in birth registration persist in some areas. Overall the legal framework is strong, but the rights are not yet fully enjoyed in practice.",
    explanation: "One mark per point, including the judgement.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the source and answer the questions.\n\n${source("Source A", "a report by a fictional district child protection committee in Matabeleland North, 2019", "This year 64 children were helped to obtain birth certificates, and two girls aged 15 were returned to school after their planned marriages were stopped. However, many families cannot afford school fees, and some children herd cattle or work in gardens during school hours. The clinic reports good immunisation rates.")}`,
    hints: ["Separate achievements from problems, then test the report against your own knowledge."],
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Identify **three** achievements reported in Source A.", points: [
        "Children helped to obtain birth certificates.",
        "Planned child marriages stopped / girls returned to school.",
        "Good immunisation rates.",
      ], explanation: "Three achievements from the source." }),
      P.manual({ label: "(b)", marks: 3, stem: "Which children's rights does the report suggest are not fully protected? Explain your answer.", points: [
        "Right to education (families cannot afford fees).",
        "Right to protection from child labour (herding cattle during school hours).",
        "Explanation linking poverty to these problems.",
      ], explanation: "Rights linked to evidence in the source." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "How far does Source A show that government efforts to protect children's rights have been successful? Use the source and your own knowledge.", points: [
        "Success shown: birth registration and stopping child marriage (fits 2016 ruling).",
        "Success shown: immunisation (fits national programmes with UNICEF/WHO).",
        "Limits shown: fees and child labour.",
        "Own knowledge: economic problems limit free education and health care nationally.",
        "Provenance: one district; a committee may stress its own achievements.",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "The source shows some success. Children were helped to get birth certificates, two child marriages were stopped, in line with the Constitutional Court's 2016 ruling, and immunisation rates were good, which fits national immunisation programmes run with UNICEF and the WHO.\n\nBut it also shows limits: many families cannot pay school fees, and some children work during school hours, so the rights to education and to protection from child labour are not fully enjoyed. From my own knowledge, economic problems have made free education and health care hard to provide across the country.\n\nThe report covers one district, and a committee may stress its own achievements. Overall it shows partial success: legal protection and some services work, but poverty limits children's rights in practice.", explanation: "Both sides with judgement." }),
    ],
    explanation: "Source-based practice question on children's rights (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer all parts.",
    hints: ["In (b), compare the two documents point by point."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Outline **four** responsibilities of children.", points: [
        "Respect parents, elders and teachers.",
        "Attend school and work hard.",
        "Respect the rights of others (no bullying).",
        "Obey the law / care for health and environment / help in the community.",
      ], explanation: "Four responsibilities." }),
      P.manual({ label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", stem: "How far does the Constitution of Zimbabwe go beyond the Universal Declaration of Human Rights in protecting rights?", points: [
        ["Similar: both list civil and political rights (life, liberty, expression, fair trial, vote).", 2],
        ["Similar: both list social rights (education, health, standard of living).", 2],
        ["Beyond: the Constitution is binding law enforceable in courts; the UDHR is a declaration.", 2],
        ["Beyond: specific groups (children, women, elderly, disabled, veterans), environmental rights, limitation rules and the ZHRC.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(10), modelAnswer: "The two documents protect many of the same rights. Both include civil and political rights such as life, liberty, freedom of expression, a fair trial and the right to vote, and both include social rights such as education, health and an adequate standard of living. The Constitution's Declaration of Rights clearly draws on the tradition the UDHR began in 1948.\n\nIn several ways the Constitution goes further. It is binding law: a person can go to court, including the Constitutional Court, to enforce it, whereas the UDHR is a declaration. It has detailed sections for children, women, the elderly, persons with disabilities and veterans, environmental rights, and rules on when rights may be limited. It also sets up the Zimbabwe Human Rights Commission.\n\nOverall the Constitution goes well beyond the UDHR in enforceability and detail, though how fully its rights are enjoyed depends on resources and enforcement.", explanation: "Similarities, differences and a judgement." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("DEFINITION", "Human rights", "Basic rights and freedoms that belong to every person because they are human, without discrimination.");
  b.card("FACT", "When was the UDHR adopted?", "10 December 1948, by the UN General Assembly (30 articles).");
  b.card("FACT", "When was the UN Convention on the Rights of the Child adopted?", "20 November 1989.");
  b.card("DEFINITION", "Child (Constitution of Zimbabwe)", "A person under the age of 18.");
  b.card("CONCEPT", "Name five children's rights in the Constitution.", "Name and birth registration; family care; education, health care, nutrition and shelter; protection from exploitation and abuse; best interests paramount.");
  b.card("CONCEPT", "Name five responsibilities of children.", "Respect parents and elders; attend school; respect others' rights; obey the law; care for health and the environment.");
  b.card("DEFINITION", "Limitation of rights", "A legal restriction on a right, allowed only when fair, reasonable and necessary, e.g. for public health or the rights of others.");
  b.card("FACT", "What did the Constitutional Court rule in 2016?", "That no one may marry before the age of 18.");
  b.card("CONCEPT", "Name two rights that may never be limited.", "Freedom from torture and freedom from slavery (also the right to a fair trial).");
});
