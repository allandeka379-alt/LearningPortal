// W3b: The role of religion in education and nation building (Topic 7.3).
import { concept, P, source, levels } from "../lib.mjs";

concept("frs.education.nation-building", { file: "education/nation-building", keyPrefix: "education.nation-building" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a responsible authority in the Zimbabwean school system?",
    options: [
      ["The body that owns or manages a school, such as a church", "Correct: it works with the Ministry of Education."],
      ["The inspector who marks the national examination scripts", "Marking is done by the examination board, not the responsible authority."],
      ["The pupil council elected each year by the whole school", "A pupil council is not the owner or manager of a school."],
      ["The parent who pays the largest amount of school fees", "Fees do not make a parent the responsible authority."],
    ],
    answer: "A",
    explanation: "A **responsible authority** owns or manages a school and works with the Ministry.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a bursary?",
    options: [
      ["Money given to pay a student's school or college fees", "Correct: it helps students who could not otherwise pay."],
      ["A building where pupils sleep at a boarding school", "That is a hostel or dormitory."],
      ["A prayer said at the start of a school assembly", "That is not a bursary."],
      ["A test taken at the end of primary school years", "That is an examination."],
    ],
    answer: "A",
    explanation: "A **bursary** pays fees for a student who needs help.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of these is a way in which a religious body supports education today?",
    options: [
      ["Paying fees for orphans through a bursary fund", "Correct: it keeps children in school."],
      ["Setting the national examination timetable for the whole country", "The Ministry and examination board do this."],
      ["Deciding which teachers the government will employ in all schools", "Employment is arranged with the Ministry, not decided by churches alone."],
      ["Removing all religious subjects from the school curriculum", "This is not a way religious bodies support education."],
    ],
    answer: "A",
    explanation: "Bursaries are one way religious bodies support education.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the purpose of chaplaincy in a school or college?",
    options: [
      ["To offer pastoral care, worship for those who wish, and counselling", "Correct: it supports students' wellbeing."],
      ["To teach mathematics and science to all the pupils in the school", "Chaplains do not replace subject teachers."],
      ["To decide which pupils are allowed to sit examinations each year", "This is not a chaplain's role."],
      ["To order pupils to join a church against their wishes in the school", "Freedom of conscience means no one should be compelled."],
    ],
    answer: "A",
    hints: ["Think of care and counselling."],
    explanation: "A chaplain gives **pastoral care** and, for those who wish, leads worship.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which section of the Constitution of Zimbabwe protects freedom of conscience, including religion?",
    options: [
      ["Section 60", "Correct: freedom of conscience and religion."],
      ["Section 75", "Section 75 protects the right to education."],
      ["Section 17", "Section 17 deals with gender balance."],
      ["Section 83", "Section 83 concerns persons with disabilities."],
    ],
    answer: "A",
    hints: ["It is the section that protects every person's right to hold and practise a belief."],
    explanation: "**Section 60** protects freedom of conscience; section 75 protects education.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Thandeka's parents are Muslim and she attends a church-run school. The school tells her she may take part in worship if she wishes but need not do so. Which principle does this show?",
    options: [
      ["Freedom of conscience and religion", "Correct: no pupil should be forced to give up their faith."],
      ["Compulsory worship for every pupil", "The school allows her not to take part."],
      ["Preference for pupils of one denomination", "The school admits her and respects her faith."],
      ["Removal of religion from public life", "The school still holds worship for those who wish it."],
    ],
    answer: "A",
    hints: ["The school invites but does not compel."],
    explanation: "This shows respect for **freedom of conscience and religion** (section 60).",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A community complains that a church school in its area has very high fees. Which criticism of religion in education does this show?",
    options: [
      ["Cost", "Correct: high fees may exclude poor families."],
      ["Proselytising", "That concerns pressure to change faith."],
      ["Mixing faith and science", "That concerns conflicts of ideas."],
      ["Lack of school buildings", "The complaint is about fees."],
    ],
    answer: "A",
    hints: ["Which word describes what families must pay?"],
    explanation: "High fees show the criticism of **cost**.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which conclusion best balances the contribution and the concerns about religion in education?",
    options: [
      ["Religious bodies contribute much, but must respect conscience and keep fees fair", "Correct: both the benefits and the safeguards are recognised."],
      ["Religious bodies should be removed from education altogether in every school", "This ignores their large contribution."],
      ["Religious bodies need no rules because their aims are always good", "Concerns about bias and cost show that rules are needed."],
      ["Religious bodies have no effect on the nation's education", "They run a large share of schools and colleges."],
    ],
    answer: "A",
    hints: ["Choose the answer that gives both sides."],
    explanation: "A balanced conclusion recognises **both the contribution and the need for safeguards**.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Church-run schools in Zimbabwe work in partnership with the government.",
    answer: true,
    explanation: "True. The government sets the curriculum and standards, and religious bodies act as responsible authorities.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Under the Constitution, a church school may force pupils of other faiths to join its church.",
    answer: false,
    explanation: "False. Section 60 protects freedom of conscience and religion; pupils may be invited to worship but not compelled.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each contribution with its effect on the nation.",
    pairs: [
      ["Running schools", "More school places, especially in rural areas"],
      ["Teacher training", "More qualified teachers in classrooms"],
      ["Bursaries", "More children able to stay in school"],
      ["Values education", "Young people with a sense of honesty and respect"],
    ],
    explanation: "Each contribution has a matching effect on the nation's education and values.",
  });
  b.fib({
    d: 3, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The right to education is protected by section {{blank:a}} of the Constitution, and freedom of conscience by section {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["75"], choices: ["17", "60", "75", "83"] },
      { id: "b", accepted: ["60"], choices: ["17", "60", "75", "83"] },
    ],
    hints: ["Remember the key fact box."],
    explanation: "Section **75** (education) and section **60** (conscience and religion).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What name is given to a religious leader who provides pastoral care in a school or college?",
    accepted: ["chaplain", "a chaplain", "school chaplain"],
    wrong: ["headmaster", "inspector"],
    explanation: "A **chaplain** gives pastoral care in a school or college.",
  });
  b.manualShort({
    d: 1, skill: "RECALL", marks: 3,
    stem: "State **three** ways in which religious bodies support education in Zimbabwe today.",
    points: ["Running schools and colleges", "Giving bursaries or scholarships", "Teaching values and moral education, or providing chaplaincy"],
    modelAnswer: "Religious bodies run schools and colleges, give bursaries and scholarships, and teach values and provide chaplaincy.",
    explanation: "One mark for each way.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how religious bodies help children with special educational needs.",
    points: [
      ["Some run schools, units or hostels for children with hearing, sight or learning needs", 1],
      ["Developed: this gives these children their right to education in a suitable place", 1],
      ["Some provide materials, fees or transport", 1],
      ["Developed: this reduces the cost to families and keeps children in school", 1],
    ],
    modelAnswer: "Some religious bodies run schools, units or hostels for children with hearing, sight or learning needs, which gives these children their right to education in a suitable place. Others provide materials, fees or transport, which reduces the cost to families and keeps children in school.",
    hints: ["Say what is provided and why it matters."],
    explanation: "Two points, each stated and developed.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain **two** criticisms that people make of religious involvement in education.",
    points: [
      ["Some church schools charge high fees or levies", 1],
      ["Developed: poor families may be unable to pay, so some children are excluded", 2],
      ["Some schools may favour members of their own denomination", 1],
      ["Developed: pupils of other faiths may feel unwelcome or be pressed to take part in worship, against freedom of conscience", 2],
    ],
    modelAnswer: "One criticism is that some church schools charge high fees or levies, so poor families may be unable to pay and some children are excluded. Another is that some schools may favour members of their own denomination, so pupils of other faiths may feel unwelcome or be pressed to take part in worship, which goes against freedom of conscience.",
    hints: ["Choose from cost, bias and proselytising, and say who is affected."],
    explanation: "Two criticisms, each stated and developed.",
  });

  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "an extract from a fictional newspaper report about a school in Chinhoyi, 2026",
      "A church-run primary school in Chinhoyi has opened a bursary fund with gifts from its congregation. Twenty-five orphans now attend school without paying fees. The school's chaplain also counsels pupils who have lost parents. A parent said: \"The fees at our church school are still high for many families, and I wish more places were available.\""
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which contribution of religious bodies is shown by the bursary fund in Source A?",
        options: [
          ["Support for children who cannot pay fees", "Correct: the fund helps orphans to attend."],
          ["Setting the national curriculum", "The government sets the curriculum."],
          ["Training teachers at a college", "This is not mentioned in the source."],
          ["Building a new university", "No university is mentioned."],
        ],
        answer: "A", explanation: "The bursary fund supports children who cannot pay fees.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Using Source A, identify **three** ways the church school helps its community.",
        points: ["It runs a bursary fund for orphans", "It provides a chaplain who counsels bereaved pupils", "It provides a school for the community's children"],
        modelAnswer: "The school runs a bursary fund for orphans, provides a chaplain who counsels bereaved pupils, and provides a school place for the community's children.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain the criticism made by the parent in Source A.",
        points: [["The parent says fees are high for many families", 1], ["Developed: some children may therefore be excluded, which goes against the right to education", 1], ["More places or lower fees could be offered, or more bursaries", 1]],
        modelAnswer: "The parent says fees are high for many families. This means some children may be excluded, which goes against the right to education. More places, lower fees or more bursaries could help.",
      }),
    ],
    hints: ["In (c) link the cost to the right to education."],
    explanation: "The source gives a benefit and a criticism.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1200,
    stem: "At a school debate, Nyasha says: \"Religion's role in education has helped build Zimbabwe.\" Tendai says: \"Religion in schools has divided pupils and favoured some families.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Outline **two** ways in which religious bodies support teachers and schools.",
        points: [["They run teacher training colleges", 1], ["They act as responsible authorities, managing and raising funds for schools", 1], ["They provide chaplaincy and counselling", 1], ["They give bursaries to help pupils stay in school", 1]],
        modelAnswer: "They run teacher training colleges and act as responsible authorities, managing schools and raising funds for them.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain how values education in religious schools can help to build the nation.",
        points: [["It teaches honesty, respect, responsibility and peace", 1], ["Developed: young people with these values are more likely to respect others and the law", 1], ["Religious Studies teaches respect for other faiths", 1], ["Developed: pupils of different backgrounds learn to live together, which builds unity", 1]],
        modelAnswer: "It teaches honesty, respect, responsibility and peace, so young people are more likely to respect others and the law. Religious Studies also teaches respect for other faiths, so pupils of different backgrounds learn to live together, which builds national unity.",
      }),
      P.manual({
        label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 280 },
        stem: "Assess the role of religion in education and nation building in Zimbabwe.",
        points: [["Contribution: schools, teacher training, bursaries, special-needs education", 2], ["Contribution: values education, chaplaincy and national unity", 2], ["Criticisms: cost, denominational bias, proselytising concerns", 2], ["A supported judgement", 2]],
        levels: levels(8),
        modelAnswer: "Religious bodies make a large contribution: they run schools, train teachers, give bursaries and support children with special needs, and they teach values and provide chaplaincy that strengthen unity. However, there are criticisms: some schools charge high fees, some favour their own denomination, and some are accused of pressing pupils to join a faith. Safeguards such as freedom of conscience and government standards answer many of these concerns. I conclude that religion has made a major contribution, provided that schools are fair and open to all.",
      }),
    ],
    hints: ["Give the contribution, the criticisms and a judgement that weighs them."],
    explanation: "A strong answer balances contributions and criticisms.",
  });

  b.card("DEFINITION", "What is **nation building**?", "Strengthening a country's unity, skills, values, economy and institutions so its people can live together in peace and progress.");
  b.card("DEFINITION", "What is a **responsible authority**?", "The body, such as a church, that owns or manages a school and works with the Ministry of Education.");
  b.card("DEFINITION", "What is a **bursary**?", "Money given to pay a student's school or college fees.");
  b.card("DEFINITION", "What is **chaplaincy**?", "Pastoral care, worship for those who wish, and counselling provided in a school or college by a religious leader.");
  b.card("FACT", "Which section of the Constitution protects the right to education?", "Section 75.");
  b.card("FACT", "Which section protects freedom of conscience and religion?", "Section 60.");
  b.card("FACT", "Name four ways religious bodies support education today.", "Running schools, training teachers, giving bursaries, teaching values (also special-needs support and chaplaincy).");
  b.card("CONCEPT", "Name three criticisms of religion in education.", "High cost, denominational bias, and concerns about proselytising.");
  b.card("CONCEPT", "How can Religious Studies help build the nation?", "It teaches respect for other faiths and shared values, so pupils from different backgrounds learn to live together.");
});
