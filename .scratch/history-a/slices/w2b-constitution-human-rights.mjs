// W2b: ahist.constitution.human-rights (ZIMSEC only).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.constitution.human-rights", { file: "constitution/human-rights", keyPrefix: "constitution.human-rights" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What are human rights?",
    options: [
      ["Basic freedoms and protections that belong to every person because they are human", "Correct: they are universal."],
      ["Privileges that a government may give only to its own loyal supporters", "Rights are not privileges given by a government."],
      ["Rules that apply only to adults who own property in the towns", "Rights apply to all people."],
      ["Laws that tell people how much tax they must pay each year", "That describes a duty, not a right."],
    ],
    answer: "A",
    explanation: "Human rights are universal freedoms and protections that belong to every person.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which chapter of the 2013 Constitution of Zimbabwe contains the Declaration of Rights?",
    options: [
      ["Chapter 4", "Correct: it lists the rights and freedoms."],
      ["Chapter 1, on founding provisions and national symbols", "Chapter 1 deals with founding provisions."],
      ["Chapter 9, on the courts and the Constitutional Court", "The courts are in Chapter 8."],
      ["Chapter 14, on provincial and local government", "That chapter deals with devolution."],
    ],
    answer: "A",
    explanation: "The Declaration of Rights is Chapter 4 of the 2013 Constitution.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which international document of 1948 set a common standard of human rights for all peoples?",
    options: [
      ["The Universal Declaration of Human Rights", "Correct: adopted on 10 December 1948."],
      ["The African Charter on Human and Peoples' Rights", "That was adopted in 1981."],
      ["The Treaty of Versailles of 1919", "That treaty ended the First World War."],
      ["The Berlin Conference's General Act of 1885", "That concerned the partition of Africa."],
    ],
    answer: "A",
    explanation: "The UDHR was adopted by the UN General Assembly on 10 December 1948.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING", daily: true,
    stem: "What does the Constitution say about the limitation of rights?",
    options: [
      ["Rights may be limited by a law only if it is fair, reasonable and necessary", "Correct: limits must meet this test."],
      ["Rights may be set aside by any official whenever it is convenient to do so", "Limits must be set by law and justified."],
      ["Rights can never be limited in any circumstance, whatever the danger to others", "Most rights can be limited under the test."],
      ["Rights belong only to citizens who pay tax and may not be claimed by others", "The Declaration applies broadly."],
    ],
    answer: "A",
    hints: ["Think of limits that are justified in a democratic society."],
    explanation: "A limit must be in law and be fair, reasonable, necessary and justifiable in a democratic society; a few rights cannot be limited.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What is the main role of the Zimbabwe Human Rights Commission (ZHRC)?",
    options: [
      ["To promote awareness of rights and investigate and recommend action on violations", "Correct: it is an independent commission."],
      ["To draw up the national budget and set rates of tax for each province and council", "That is the work of the Treasury and Parliament."],
      ["To run the national elections and count the votes in every constituency of the country", "That is the work of the Electoral Commission."],
      ["To command the army and decide when the country should go to war with its neighbours", "That is a function of the executive."],
    ],
    answer: "A",
    hints: ["It is one of the independent commissions in Chapter 12."],
    explanation: "The ZHRC promotes rights, monitors and investigates violations, and recommends improvements.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "How does the 2013 Declaration of Rights differ from that of the Lancaster House constitution of 1979?",
    options: [
      ["It is longer and includes social rights such as education, health care and water", "Correct: it widened the rights protected."],
      ["It is shorter and removes the rights to life, liberty and a fair trial from citizens", "These rights remain in the 2013 text."],
      ["It protects only the rights of citizens who belong to the governing political party", "The rights apply to all people."],
      ["It has no connection with international law, with treaties or with the courts", "Courts must consider international law."],
    ],
    answer: "A",
    hints: ["Think about which kinds of rights were added."],
    explanation: "The 2013 Declaration is longer and includes economic, social and cultural rights and the rights of particular groups.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement about rights and responsibilities is best supported?",
    options: [
      ["Rights are linked to duties such as respecting others, but duties are no excuse to deny rights", "Correct: both points are made."],
      ["Responsibilities cancel rights, so a person who breaks any rule at all loses every right", "Rights are not cancelled in this way."],
      ["Only rights matter, and no citizen has any duty to anyone else in the country", "Duties are part of the framework."],
      ["Duties apply to governments only, and individuals have no obligations at all to others", "Individuals also have duties."],
    ],
    answer: "A",
    hints: ["Choose the statement that links rights and duties without cancelling rights."],
    explanation: "Rights and duties are linked; the African Charter lists duties of individuals, but duties cannot be used as an excuse to deny rights.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which point best supports the view that the 2013 Constitution strengthened the protection of children's rights?",
    options: [
      ["Courts set 18 as the minimum age of marriage, and the law banned exclusion for pregnancy", "Correct: both are concrete legal developments."],
      ["The Constitution was approved by voters in a referendum held in March 2013 across the country", "This shows how it was adopted, not protection of children."],
      ["The Declaration of Rights is placed in Chapter 4 of the Constitution, near its beginning", "Its position shows structure, not effect."],
      ["Zimbabwe is a member of both the African Union and the United Nations organisation", "Membership does not itself show protection."],
    ],
    answer: "A",
    hints: ["Look for evidence of change that protects children."],
    explanation: "The 2016 Constitutional Court judgment and the 2020 Education Act amendment are specific protections for children.",
  });
  b.tf({
    d: 1, skill: "RECALL", stem: "The African Charter on Human and Peoples' Rights was adopted by the OAU in 1981.", answer: true,
    explanation: "The Charter was adopted in 1981 and entered into force in 1986.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true, stem: "All the rights in the Declaration of Rights can be limited in any circumstance by an ordinary law.", answer: false,
    explanation: "A few rights, such as freedom from torture, cannot be limited, and limits must be fair, reasonable and necessary.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING", stem: "Zimbabwean courts must take international law into account when interpreting the Declaration of Rights.", answer: true,
    hints: ["Think about the UDHR and the African Charter."],
    explanation: "The Constitution directs courts to consider international law and treaties to which Zimbabwe is a party.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each document or body to its description.",
    pairs: [
      ["UDHR", "The 1948 UN declaration setting a common standard of rights"],
      ["African Charter", "The 1981 OAU document that includes rights and duties of individuals"],
      ["ZHRC", "The independent commission that promotes and monitors human rights"],
      ["Declaration of Rights", "The chapter of the Constitution that lists rights and freedoms"],
    ],
    explanation: "These are the key documents and bodies.",
  });
  {
    const events = [
      "The Universal Declaration of Human Rights is adopted",
      "The African Charter on Human and Peoples' Rights is adopted",
      "Zimbabwe ratifies the Convention on the Rights of the Child",
      "The new Constitution is approved in a referendum",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["The dates are 1948, 1981, 1990 and 2013."],
      explanation: "1948; 1981; 1990; March 2013.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Universal Declaration of Human Rights was adopted in {{blank:a}} by the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["1948"], choices: ["1919", "1945", "1948", "1981"] },
      { id: "b", accepted: ["UN General Assembly"], choices: ["UN General Assembly", "League of Nations", "Commonwealth", "SADC Summit"] },
    ],
    explanation: "The UDHR was adopted by the UN General Assembly on 10 December 1948.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "In which year did a referendum approve the current Constitution of Zimbabwe?",
    accepted: ["2013"],
    wrong: ["1980"],
    explanation: "The referendum was held on 16 March 2013.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe four rights protected in the Declaration of Rights of the 2013 Constitution.",
    points: ["The right to life", "Equality and freedom from discrimination", "Freedom of expression, assembly and association", "The right to education / health care / a fair trial"],
    modelAnswer: "The Declaration protects the right to life and equality and freedom from discrimination. It protects freedom of expression, assembly and association, and it guarantees economic and social rights such as education and health care, as well as the right to a fair trial.",
    explanation: "One mark for each right described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why responsibilities are important alongside human rights.",
    points: [["My use of a right must not harm the rights of others, so everyone has a duty to respect others' freedom and dignity", 2], ["Duties such as obeying the law, paying taxes and taking part in the community keep society peaceful and allow the state to protect rights", 2]],
    hints: ["Think about how one person's rights affect another's."],
    modelAnswer: "A person's use of a right must not harm other people's rights, so everyone has a duty to respect the freedom and dignity of others. Duties such as obeying the law, paying taxes and taking part in the community keep society peaceful and allow the state to protect rights.",
    explanation: "Credit developed reasons.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how the rights of children are protected in Zimbabwe.",
    points: [["The Constitution gives children rights to education, protection from abuse and exploitation, and says their best interests are paramount", 2], ["International instruments such as the Convention on the Rights of the Child and the African children's charter, court judgments on the minimum age of marriage and laws on schooling provide further protection", 2]],
    hints: ["Give a constitutional protection and a legal or international one."],
    modelAnswer: "The Constitution gives children the right to education and protection from abuse and exploitation, and says their best interests are paramount. Zimbabwe has also ratified the Convention on the Rights of the Child and the African children's charter, and court judgments on the minimum age of marriage and laws against excluding pregnant pupils add protection.",
    explanation: "Credit developed protections.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a statement by a fictional spokesperson for a human rights organisation, 2016",
        "The Constitution promises freedom of assembly and expression, yet many laws written before 2013 remain unchanged, and people who gather peacefully are sometimes arrested. The promise on paper is generous. What we need is the will to apply it."),
      "",
      source("Source B", "a statement by a fictional government official at a seminar, 2016",
        "Our Constitution is among the most progressive in Africa. Every right is guaranteed, and where limits exist they are lawful and necessary for peace and order. Alignment of old laws with the new Constitution takes time, and the courts remain open to anyone who believes a right has been violated."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What criticism does Source A make?", points: ["Many laws from before 2013 have not been changed", "People who gather peacefully are sometimes arrested / the will to apply rights is lacking"] }),
      P.manual({ label: "(b)", marks: 2, stem: "How does Source B defend the record on rights?", points: ["The Constitution is progressive and guarantees every right", "Limits are lawful; alignment takes time; the courts are open to complaints"] }),
      P.manual({ label: "(c)", marks: 4, stem: "How far do the sources agree about the protection of human rights?", type: "EXTENDED_RESPONSE", levels: levels(4), points: [["Agree that the Constitution is generous and that old laws must be aligned with it", 1], ["Disagree on practice: A says rights are not applied, B says limits are lawful and the courts provide redress", 1], ["Provenance: A is from a human rights organisation and B from a government official, each defending a position", 1], ["Own knowledge: laws have been slow to change, and views on practice differ", 1]], modelAnswer: "The sources agree that the Constitution is generous and that old laws must be brought into line with it. They disagree about practice. Source A, from a human rights organisation, says that rights are not applied and that peaceful gatherings are restricted, while Source B, from a government official, says that limits are lawful and the courts are open. Each has a reason to emphasise its own position. My own knowledge suggests that the alignment of laws was slow, and views of the practice differ." }),
    ],
    hints: ["For (c), consider what the sources share before you consider where they differ."],
    explanation: "Both sources are invented: a human rights spokesperson and a government official.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 12, wordLimit: { min: 200, max: 450 },
    stem: "To what extent are human rights protected in Zimbabwe?",
    levels: levels(12),
    points: [
      ["Legal framework: Chapter 4 of the 2013 Constitution, limits on limitation, enforcement through the courts", 3],
      ["International instruments and institutions: UDHR, African Charter, CRC, ZHRC and other commissions", 2],
      ["Examples of progress: age of marriage, education for pregnant girls, access to information, social rights", 2],
      ["Criticisms: laws not aligned, restrictions on assembly and expression, arrests, uneven awareness, resource limits; the government's response", 3],
      ["Supported judgement", 2],
    ],
    hints: ["Separate the written framework from practice and weigh both."],
    modelAnswer: "Human rights are protected strongly in law but unevenly in practice. Chapter 4 of the 2013 Constitution lists a wide range of civil, political, economic and social rights, allows limits only where fair, reasonable and necessary, and lets people go to court. Zimbabwe has accepted instruments such as the UDHR, the African Charter and the Convention on the Rights of the Child, and has created the Human Rights Commission and other independent bodies. There has been progress, for example in setting the minimum age of marriage at 18 and in protecting pregnant pupils' schooling. But human rights groups and others say that older laws were slow to be aligned, that assembly and expression are restricted, and that violations have occurred around elections, while the government says that restrictions are lawful and necessary and that the courts are open. Social rights also depend on resources. I conclude that the legal framework is strong, but how fully it is applied is disputed and varies across rights and places.",
    explanation: "Credit framework, institutions, progress, criticisms and a supported judgement.",
  });
  b.ext({
    d: 4, skill: "ANALYSIS", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the importance of the Zimbabwe Human Rights Commission and the courts in protecting human rights.",
    levels: levels(8),
    points: [
      ["ZHRC: independent, promotes awareness, monitors, investigates and recommends", 2],
      ["Courts: Constitutional Court and others hear claims, set precedents such as the minimum age of marriage", 2],
      ["Limits: recommendations may not be binding, resources, public awareness, executive compliance", 2],
      ["Judgement on their importance", 2],
    ],
    hints: ["Compare the powers of a commission with those of a court."],
    modelAnswer: "The Human Rights Commission and the courts both play important roles. The Commission is independent and promotes awareness, monitors violations, investigates complaints and recommends action. The courts, especially the Constitutional Court, can enforce rights and have set important precedents, such as the minimum age of marriage. But the Commission's recommendations may not be binding, both bodies depend on resources and public awareness, and their effect depends on the compliance of other state institutions. I conclude that the courts have the stronger powers but the Commission fills an important gap in promotion and investigation.",
    explanation: "Credit explained roles, limits and a judgement.",
  });

  b.card("DEFINITION", "What are human rights?", "Basic freedoms and protections that belong to every person because they are human; they are universal.");
  b.card("DEFINITION", "What is the Declaration of Rights?", "The chapter of a constitution listing the rights and freedoms of individuals and groups; Chapter 4 of the 2013 Constitution of Zimbabwe.");
  b.card("DEFINITION", "What is a responsibility (duty) in relation to rights?", "An obligation that goes with a right, such as respecting others' rights, obeying the law and paying taxes.");
  b.card("FACT", "When was the Universal Declaration of Human Rights adopted?", "10 December 1948, by the UN General Assembly.");
  b.card("FACT", "What is the African Charter on Human and Peoples' Rights?", "A regional human rights document adopted by the OAU in 1981 (in force 1986); it includes individual duties.");
  b.card("FACT", "What does the Zimbabwe Human Rights Commission do?", "It is an independent commission that promotes awareness of rights, monitors and investigates violations and recommends improvements.");
  b.card("FACT", "When was the current Constitution of Zimbabwe approved?", "In a referendum on 16 March 2013; signed into law in May 2013.");
  b.card("CONCEPT", "When may a right be limited under the 2013 Constitution?", "Only by a law that is fair, reasonable, necessary and justifiable in a democratic society; a few rights cannot be limited.");
  b.card("CONCEPT", "Why do people disagree on how well rights are protected in Zimbabwe?", "The framework is strong, but critics point to unaligned laws and restrictions, while the government stresses lawful limits and open courts.");
});
