// W3b: Negative impacts of religion on education (Topic 7.4).
import { concept, P, source, levels } from "../lib.mjs";

concept("frs.education.negative-impact", { file: "education/negative-impact", keyPrefix: "education.negative-impact" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is pledging (kuzvarira)?",
    options: [
      ["Promising or giving a girl in marriage to settle a debt or gain favour", "Correct: it is harmful and unlawful."],
      ["Paying school fees on behalf of a relative who is an orphan", "That is support for education, not pledging."],
      ["Making a promise during a religious service to keep a fast", "That is a religious vow, not pledging."],
      ["Giving cattle to a family as part of agreed bride wealth payment", "Bride wealth (roora/lobola) is a different custom."],
    ],
    answer: "A",
    explanation: "**Pledging (kuzvarira)** is the promising of a girl in marriage; it is harmful and unlawful.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the minimum age of marriage under section 78 of the Constitution of Zimbabwe?",
    options: [
      ["18 years", "Correct: no one under 18 may marry."],
      ["12 years", "This is far below the legal age."],
      ["16 years", "Sixteen is below the constitutional minimum."],
      ["21 years", "Twenty-one is not the constitutional minimum."],
    ],
    answer: "A",
    explanation: "Section 78 sets the minimum age of marriage at **18**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which section of the Constitution protects every child's right to basic state-funded education?",
    options: [
      ["Section 75", "Correct: the right to education."],
      ["Section 60", "Section 60 protects freedom of conscience and religion."],
      ["Section 17", "Section 17 concerns gender balance."],
      ["Section 251", "Section 251 concerns the National Peace and Reconciliation Commission."],
    ],
    answer: "A",
    hints: ["Remember the key facts of the previous lesson."],
    explanation: "**Section 75** protects the right to education.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of these is an example of gender bias in education?",
    options: [
      ["A family pays fees for a son but keeps a daughter at home", "Correct: the children are treated unequally."],
      ["A family pays fees for all of its children equally each year", "That treats children equally."],
      ["A school admits boys and girls and teaches them in the same classes", "That is equal treatment."],
      ["A church gives a bursary to an orphan, whether girl or boy", "That is equal support."],
    ],
    answer: "A",
    explanation: "Choosing to educate a son but not a daughter is **gender bias**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is child marriage harmful to education?",
    options: [
      ["The girl is usually withdrawn from school and loses opportunities", "Correct: it ends her schooling."],
      ["The girl is given extra lessons paid for by her new family", "Child marriage usually ends schooling, not adds to it."],
      ["The girl is allowed to continue school with no effect on learning", "Child marriage usually brings school to an end."],
      ["The girl is trained as a teacher by her relatives instead", "This is not what usually happens."],
    ],
    answer: "A",
    explanation: "Child marriage usually **ends a girl's schooling** and harms her rights and health.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A congregation's annual ceremony falls in term time, and children miss a week of school. Which solution is most in line with the lesson?",
    options: [
      ["Teachers and elders agree to hold the main ceremony in the holidays", "Correct: dialogue and flexibility protect both."],
      ["The school bans the ceremony and punishes the families concerned", "This would deny freedom of religion."],
      ["The congregation keeps the children at home for the whole term", "This would deny the right to education."],
      ["The government closes every school in the area for the ceremony", "This is not a practical solution."],
    ],
    answer: "A",
    hints: ["Which answer respects both the right to education and freedom of religion?"],
    explanation: "Dialogue and flexible dates can respect **both education and religion**.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", daily: true,
    stem: "Which statement about negative impacts of religion on education is most accurate?",
    options: [
      ["They come from particular practices, and many members of the same religion reject them", "Correct: avoid blaming a whole religion."],
      ["They come from every religion in the same way and to the same degree", "This overgeneralises."],
      ["They come only from Indigenous Religion and from no other religion", "No single religion is the only source."],
      ["They are the main effect religion has had on education in Zimbabwe", "Religion has contributed greatly to education as well."],
    ],
    answer: "A",
    hints: ["Think about fairness to all communities."],
    explanation: "The problems arise from **particular beliefs or practices**, not whole religions.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which approach to child marriage is likely to be most effective in keeping girls in school?",
    options: [
      ["Combining law enforcement, bursaries and the support of religious leaders", "Correct: it tackles legal, economic and cultural causes."],
      ["Relying on the law alone and never speaking with parents or leaders", "Law alone does not remove poverty or beliefs."],
      ["Leaving each family to decide with no involvement from anyone else", "This ignores the rights of the child."],
      ["Closing all boarding schools run by religious organisations", "This would not address the causes of child marriage."],
    ],
    answer: "A",
    hints: ["Think about the causes: law, poverty and belief."],
    explanation: "A **combined approach** deals with legal, economic and cultural causes.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Child marriage and pledging are lawful when a family's religion allows them.",
    answer: false,
    explanation: "False. The Constitution sets 18 as the minimum age for marriage, and pledging is harmful and unlawful.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Most religious leaders in Zimbabwe oppose education for children.",
    answer: false,
    explanation: "False. Most religious leaders support education; the problems come from particular practices in some communities.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each problem with a suitable solution.",
    pairs: [
      ["Child marriage", "Report to the police Victim Friendly Unit or Childline (116)"],
      ["Poverty that forces girls out of school", "Bursaries and fee relief"],
      ["Ceremony clashing with school time", "Dialogue to agree on dates in the holidays"],
      ["Gender bias in the family", "Awareness campaigns on the equal worth of girls and boys"],
    ],
    explanation: "Each problem has a matching solution: law and reporting, financial help, dialogue, and awareness.",
  });
  b.fib({
    d: 3, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Section {{blank:a}} of the Constitution protects the right to education, and section {{blank:b}} sets the minimum age of marriage at 18.",
    blanks: [
      { id: "a", accepted: ["75"], choices: ["60", "75", "78", "81"] },
      { id: "b", accepted: ["78"], choices: ["60", "75", "78", "81"] },
    ],
    hints: ["Section 81 concerns the rights of children in general."],
    explanation: "Section **75** (education) and section **78** (marriage).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What is the national Childline helpline number in Zimbabwe?",
    accepted: ["116", "childline 116"],
    wrong: ["999", "112"],
    explanation: "Childline Zimbabwe can be reached on **116**.",
  });
  b.manualShort({
    d: 1, skill: "RECALL", marks: 3,
    stem: "State **three** beliefs or practices that can keep children from getting an education.",
    points: ["Child marriage or pledging", "Gender bias in favour of educating boys", "Religious ceremonies or activities that clash with school time, or refusal of schooling"],
    modelAnswer: "Child marriage or pledging, gender bias in favour of educating boys, and religious ceremonies that clash with school time can keep children from getting an education.",
    explanation: "One mark for each.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how a clash between religious and scientific views can affect a pupil's learning.",
    points: [
      ["A pupil may find a scientific idea hard to accept if it seems to contradict family teaching", 1],
      ["Developed: the pupil may lose interest in the subject or feel torn between school and home", 1],
      ["A teacher who ridicules belief may make the pupil feel unwelcome", 1],
      ["Developed: respectful teaching explains both views and lets the pupil ask questions", 1],
    ],
    modelAnswer: "A pupil may find a scientific idea hard to accept if it seems to contradict family teaching, and may lose interest in the subject or feel torn between school and home. A teacher who ridicules belief may make the pupil feel unwelcome, so respectful teaching explains both views and lets the pupil ask questions.",
    hints: ["Think about the pupil's feelings and the teacher's approach."],
    explanation: "Two points, each stated and developed.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Suggest and explain **two** ways in which communities and religious leaders can help to keep girls in school.",
    points: [
      ["Religious leaders can teach that girls and boys have equal worth and that education is a duty", 1],
      ["Developed: parents who respect their leaders are more likely to send daughters to school", 2],
      ["Communities can provide bursaries and report child marriage to the authorities", 1],
      ["Developed: this removes poverty pressure and protects the girl under the law", 2],
    ],
    modelAnswer: "Religious leaders can teach that girls and boys have equal worth and that education is a duty. Parents who respect their leaders are more likely to send daughters to school. Communities can also provide bursaries and report child marriage to the authorities. This removes the pressure of poverty and protects the girl under the law.",
    hints: ["Choose two actions and say how each works."],
    explanation: "Two suggestions, each stated and developed.",
  });

  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "an extract from a fictional community meeting report in Gwanda, 2026",
      "Three girls from the village did not return to school last term. One was promised in marriage to settle a family debt, one was told that her brothers' fees must be paid first, and one stays at home for the long seasonal ceremony. The headmaster, the chief and the pastor agreed to visit the families. The pastor said: \"Our faith teaches that every child is precious and should learn.\""
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which negative impact is shown by the girl who was promised in marriage to settle a debt?",
        options: [
          ["Pledging", "Correct: this is kuzvarira."],
          ["Compulsory worship", "The source does not mention worship."],
          ["A clash of science and faith", "The source does not mention this."],
          ["Excessive school fees", "Fees are not mentioned for this girl."],
        ],
        answer: "A", explanation: "Promising a girl in marriage to settle a debt is **pledging**.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Using Source A, identify **three** reasons why the girls did not return to school.",
        points: ["One was promised in marriage to settle a debt", "One was told her brothers' fees must be paid first (gender bias)", "One stays at home for a long seasonal ceremony"],
        modelAnswer: "One girl was promised in marriage to settle a debt, one was told her brothers' fees must be paid first, and one stays at home for a long seasonal ceremony.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain how the headmaster, the chief and the pastor could help the families.",
        points: [["Talk to the families about the value of education and the girls' rights", 1], ["The pastor can show that faith teaches that every child should learn", 1], ["They can report the pledging to the authorities and help to find a bursary", 1]],
        modelAnswer: "They could talk to the families about the value of education and the girls' rights. The pastor can show that faith teaches that every child should learn. They can report the pledging to the authorities and help to find a bursary.",
      }),
    ],
    hints: ["In (c) think of dialogue, religious teaching and practical help."],
    explanation: "The source shows three different barriers and three community leaders who can help.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1200,
    stem: "Two students discuss child marriage. Chipo says: \"The law is enough to end it.\" Mthulisi says: \"The law matters, but it will not work unless religious leaders and families change their attitudes.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Outline **two** laws or rights that protect a child's education and safety.",
        points: [["Section 75 of the Constitution protects the right to education", 1], ["Section 78 sets the minimum age of marriage at 18", 1], ["Section 81 protects children's rights, including from abuse and exploitation", 1], ["The Education Amendment Act 2020 supports free and compulsory basic education", 1]],
        modelAnswer: "Section 75 of the Constitution protects the right to education, and section 78 sets the minimum age of marriage at 18.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain **one** reason why child marriage continues in some communities even though it is unlawful.",
        points: [["Poverty: families may see a marriage or a pledge as a way to settle debts or gain money", 1], ["Developed: the girl is then seen as an economic solution, not as a child with rights", 1], ["Customary beliefs about the role of girls", 1], ["Developed: communities may think a girl's education matters less than marriage, and laws may be unknown or hard to enforce", 1]],
        modelAnswer: "Poverty is one reason: families may see a marriage or pledge as a way to settle debts or gain money. The girl is then seen as an economic solution, not as a child with rights.",
      }),
      P.manual({
        label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 280 },
        stem: "Assess the view that religious leaders can do more than the law to protect girls' education.",
        points: [["For: religious leaders are trusted and can change attitudes and beliefs in a community", 2], ["For: they can teach the equal worth of girls, support bursaries and welcome girls back to school", 2], ["Against or limits: the law can punish offenders and set a clear standard; some leaders may support harmful practices", 2], ["A supported judgement", 2]],
        levels: levels(8),
        modelAnswer: "Religious leaders are trusted by many families and can change attitudes in ways that the law cannot. They can teach the equal worth of girls, support bursaries and welcome girls back to school. However, the law sets a clear standard and can punish those who force a child into marriage, and some leaders may themselves support harmful practices. I conclude that religious leaders and the law work best together: the law protects, and leaders change hearts.",
      }),
    ],
    hints: ["Weigh what leaders can do against what only the law can do."],
    explanation: "A strong answer compares the power of belief and persuasion with the power of law and reaches a judgement.",
  });

  b.card("DEFINITION", "What is **pledging (kuzvarira)**?", "The harmful and unlawful custom of promising or giving a girl in marriage, often to settle a debt.");
  b.card("DEFINITION", "What is **child marriage**?", "A marriage in which one or both partners is under 18; the Constitution (section 78) sets 18 as the minimum age.");
  b.card("DEFINITION", "What is **gender bias** in education?", "Treating boys and girls unequally, for example by keeping daughters out of school.");
  b.card("FACT", "What does section 75 of the Constitution protect?", "The right to basic state-funded education.");
  b.card("FACT", "What does section 78 of the Constitution set?", "The minimum age of marriage: 18.");
  b.card("FACT", "Which helpline can a child call in Zimbabwe?", "Childline Zimbabwe, 116.");
  b.card("CONCEPT", "Name four ways beliefs and practices can harm education.", "Refusal of schooling, child marriage and pledging, gender bias, and clashes of views or activities with school.");
  b.card("CONCEPT", "Why should we not blame a whole religion for these problems?", "They come from particular practices; most members and leaders of the same religion support education.");
  b.card("CONCEPT", "Suggest three ways of addressing negative impacts on education.", "Dialogue and awareness, enforcing the law, and bursaries; also religious leaders' support and flexible school arrangements.");
});
