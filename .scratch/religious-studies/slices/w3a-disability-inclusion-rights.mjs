// W3a: Religion, inclusion and the rights of people with disabilities.
// Reviewer notes: check the Disabled Persons Act (1992) details and any recent amendment; named religious institutions are
// deliberately left out because founding bodies were not verified; Constitution sections 22, 56, 75 and 83 paraphrased.
import { concept, P, source, levels } from "../lib.mjs";

concept("frs.disability.inclusion-rights", { file: "disability/inclusion-rights", keyPrefix: "disability.inclusion-rights" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which section of the Constitution of Zimbabwe is mainly about the rights of persons with disabilities?",
    options: [
      ["Section 83", "Correct: it sets out measures for persons with disabilities."],
      ["Section 60", "Section 60 is freedom of conscience and religion."],
      ["Section 78", "Section 78 is about marriage rights."],
      ["Section 17", "Section 17 is about gender balance."],
    ],
    answer: "A",
    explanation: "**Section 83** (with the national objective in section 22) concerns persons with disabilities. Section 60 is freedom of religion.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is a form of reasonable accommodation for a learner who is blind?",
    options: [
      ["Notes in Braille", "Correct: it removes a barrier to reading."],
      ["Lessons in a hall with steps only", "This creates a barrier."],
      ["A louder bell at the end of lessons", "This does not help reading."],
      ["Extra homework to complete at home", "This does not remove the barrier."],
    ],
    answer: "A",
    explanation: "**Braille** notes remove a barrier for a learner who is blind; other examples are large print and a reader.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What does inclusive education mean?",
    options: [
      ["Learners with disabilities learn in ordinary schools with support", "Correct: with accommodations."],
      ["Learners with disabilities stay at home until they are old enough to work", "This is exclusion."],
      ["Learners with disabilities are always taught in a separate building", "Separate schooling is not the definition."],
      ["Learners with disabilities may attend only on days when classes are small", "This is partial exclusion."],
    ],
    answer: "A",
    explanation: "**Inclusive education** brings learners with disabilities into ordinary classrooms with the support they need.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What does section 56 of the Constitution of Zimbabwe guarantee?",
    options: [
      ["Equality and freedom from unfair discrimination", "Correct: it includes disability as a ground."],
      ["The right to marry at any age", "Section 78 sets the minimum age at 18."],
      ["The right to own land in every district", "Not the subject of section 56."],
      ["The right to ignore the laws of the country", "No constitution allows this."],
    ],
    answer: "A",
    explanation: "**Section 56** guarantees equality and forbids unfair discrimination, including on grounds of disability.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of the following would make worship more inclusive for a member who is deaf?",
    options: [
      ["A sign-language interpreter or a printed service sheet", "Correct: it removes the communication barrier."],
      ["A louder choir and a larger sound system for the hall", "This does not help a person who is deaf."],
      ["A shorter service held on Sundays only", "This does not address the barrier."],
      ["A rule that visitors should sit at the back of the hall", "This does not address the barrier."],
    ],
    answer: "A",
    explanation: "A **sign-language interpreter** or printed text removes the barrier for a member who is deaf.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Tatenda's mosque has steps at the only entrance and a member who uses a wheelchair cannot enter. Which response best applies the right to participation?",
    options: [
      ["Install a ramp and a wide door so that the member can enter with everyone else", "Correct: the barrier is removed."],
      ["Ask the member to pray at home, since the building is old and cannot be changed", "This excludes the member."],
      ["Tell the member that the steps are a test of patience in his faith", "This places the problem on the person."],
      ["Wait until the member's family can pay for a different mosque to be built", "This delays participation."],
    ],
    answer: "A",
    hints: ["Which answer removes the barrier now and keeps the member with the community?"],
    explanation: "A **ramp** and wide door remove the barrier and respect the right to take part in worship.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why can laws alone fail to change the lives of people with disabilities?",
    options: [
      ["Schools, communities and religious groups must put rights into practice", "Correct: law needs action."],
      ["Laws are never written down, so nobody can know what they say or find them", "Laws are written and published."],
      ["People with disabilities are not covered by the law of the country at all", "They are covered by it."],
      ["Laws are meant to apply only to religious organisations and not to schools", "They apply to everyone."],
    ],
    answer: "A",
    hints: ["Think about the gap between a right in law and daily life."],
    explanation: "Rights in law become real only when **schools, communities and religious groups** put them into practice.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement best explains why inclusion is about rights and not only charity?",
    options: [
      ["People with disabilities have equal rights, so barriers should be removed, not only pitied", "Correct: charity alone leaves unequal rights."],
      ["Charity is illegal in Zimbabwe, and only government may give help", "Charity is not illegal."],
      ["People with disabilities do not need help from anyone in their communities", "Support and accommodations are needed."],
      ["Rights apply only to adults and children have only a right to charity", "Children have rights too."],
    ],
    answer: "A",
    hints: ["Contrast pity with equality."],
    explanation: "Inclusion means **equal rights** and removing barriers; pity alone treats people as objects of help.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The UN Convention on the Rights of Persons with Disabilities was adopted in 2006.",
    answer: true,
    explanation: "True. The Convention says that persons with disabilities have the same human rights as everyone else.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Inclusive worship means giving people with disabilities a seat at the back and no other role.",
    answer: false,
    explanation: "False. Inclusive worship removes barriers and welcomes people with disabilities into the full life of the community.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each adjustment with the barrier it removes.",
    pairs: [["Ramp", "steps for a wheelchair user"], ["Braille or large print", "text that cannot be read by a person with low vision"], ["Sign-language interpreter", "speech that cannot be heard"], ["Extra time in tests", "pressure on a learner who needs longer"]],
    explanation: "Each adjustment removes a particular barrier.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Section {{blank:a}} of the Constitution sets out the rights of persons with disabilities, and section {{blank:b}} guarantees equality.",
    blanks: [
      { id: "a", accepted: ["83"], choices: ["22", "56", "75", "83"] },
      { id: "b", accepted: ["56"], choices: ["22", "56", "75", "83"] },
    ],
    explanation: "Section **83** concerns persons with disabilities; section **56** guarantees equality.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What number can a child call in Zimbabwe to report abuse to Childline?",
    accepted: ["116", "Childline 116"],
    wrong: ["999", "100"],
    explanation: "**Childline Zimbabwe** can be reached on 116; other help channels include the police Victim Friendly Unit and a clinic.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "Identify **three** ways in which a school can include learners with disabilities.",
    points: ["Build ramps and accessible toilets", "Provide Braille, large print or sign-language support", "Train teachers and encourage classmates to include everyone"],
    modelAnswer: "A school can build ramps and accessible toilets, provide Braille, large print or sign-language support, and train teachers and encourage classmates to include everyone.",
    explanation: "One mark for each way.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how religious organisations have helped people with disabilities in Zimbabwe.",
    points: [["Many special schools and centres began as church or mission projects", 1], ["Some run clinics and rehabilitation centres", 1], ["Religious groups give charity and raise funds", 1], ["They teach dignity and can speak against myths and stigma", 1]],
    modelAnswer: "Many special schools and centres began as church or mission projects, and some run clinics and rehabilitation centres. Religious groups give charity and raise funds, and they teach dignity and can speak against myths and stigma.",
    hints: ["Cover schools, health care, funds and teaching."],
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain **two** challenges that religious organisations face in including people with disabilities.",
    points: [
      ["Some buildings are not accessible", 1],
      ["Developed: old churches or mosques with steps and narrow doors keep wheelchair users out, and rebuilding costs money", 2],
      ["Some leaders and members still repeat myths", 1],
      ["Developed: if disability is called a punishment or a curse, families are shamed and people stay away from worship", 2],
    ],
    modelAnswer: "Some buildings are not accessible: old churches or mosques with steps and narrow doors keep wheelchair users out, and rebuilding costs money. Some leaders and members still repeat myths, and if disability is called a punishment or a curse, families are shamed and people stay away from worship.",
    hints: ["Give one challenge about buildings and one about attitudes."],
    explanation: "Two challenges, each stated (1) and developed (2).",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "an extract from a fictional community notice in Gweru, 2026",
      "The inter-faith youth forum met last Saturday. Members from a church, a mosque and a synagogue agreed to visit each place of worship and check access. They noted that the church has a ramp, the mosque has steps at the only entrance, and the synagogue has no large-print prayer books. They will ask the leaders of each community to make changes and will share their findings with the local council."
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "According to Source A, which place of worship has steps at the only entrance?",
        options: [
          ["The mosque", "Correct: the forum noted steps at the mosque."],
          ["The church", "The church has a ramp."],
          ["The synagogue", "The synagogue lacks large-print prayer books."],
          ["The council office", "The council office is not mentioned as a place of worship."],
        ],
        answer: "A", explanation: "The forum found that the mosque has steps at the only entrance.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Using Source A, state **three** findings of the youth forum.",
        points: ["The church has a ramp", "The mosque has steps at the only entrance", "The synagogue has no large-print prayer books"],
        modelAnswer: "The church has a ramp, the mosque has steps at the only entrance, and the synagogue has no large-print prayer books.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain how the forum's plan in Source A promotes inclusion.",
        points: [["It identifies barriers in each place of worship", 1], ["It asks leaders to make changes, such as a ramp or large-print books", 1], ["Members of different religions work together and share findings with the council", 1]],
        modelAnswer: "The forum identifies barriers in each place of worship and asks leaders to make changes, such as a ramp or large-print books. Members of different religions work together and share their findings with the council.",
      }),
    ],
    hints: ["In (c) link finding, action and cooperation."],
    explanation: "The source shows an access audit and shared action.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1200,
    stem: "Mthulisi says: \"Laws are enough to protect people with disabilities.\" Nyasha says: \"Laws help, but communities and religious groups must also change attitudes.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Outline **two** rights of persons with disabilities in the Constitution of Zimbabwe.",
        points: [["A first right, stated accurately with the section or its meaning", 2, ["Equality and freedom from unfair discrimination (section 56)", "The State must promote the dignity and participation of persons with disabilities (section 22)", "The State must take measures for self-reliance, protection from abuse and access to education and care (section 83)"]], ["A second right, different from the first", 2, ["Any other right listed for the first point"]]],
        modelAnswer: "The Constitution guarantees equality and freedom from unfair discrimination (section 56). It also says that the State must promote the dignity and participation of persons with disabilities (section 22) and take measures to protect them from abuse and help them to learn and become self-reliant (section 83).",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain why accessible buildings are important for inclusion.",
        points: [["Barriers such as steps keep people with physical disabilities out of school and worship", 2], ["Ramps and wide doors allow equal participation, which is a right and a sign of dignity", 2]],
        modelAnswer: "Barriers such as steps keep people with physical disabilities out of school and worship. Ramps and wide doors allow equal participation, which is a right and a sign of dignity.",
      }),
      P.manual({
        label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 280 },
        stem: "Assess the view that laws are the most important way of protecting the rights of people with disabilities.",
        points: [["For: laws set standards, give rights and allow people to claim them", 2], ["Against: laws do not remove myths or barriers on their own; communities and religious groups carry out change", 2], ["Link: laws and attitudes work together; religious teaching about dignity supports the law", 2], ["A supported judgement", 2]],
        levels: levels(8),
        modelAnswer: "Laws set standards, give rights and allow people to claim them, so they are important. However, laws do not remove myths or barriers on their own, and communities, schools and religious groups carry out change by building ramps, teaching dignity and challenging stigma. Laws and attitudes work together, and religious teaching about dignity supports the law. I conclude that laws are essential but not the most important way on their own.",
      }),
    ],
    hints: ["Weigh the power of law against the need for changed attitudes."],
    explanation: "A strong answer weighs law against practice and concludes that both are needed.",
  });

  b.card("DEFINITION", "What is **inclusion**?", "Making sure people with disabilities can take part fully in school, worship and community life on an equal basis.");
  b.card("DEFINITION", "What is a **reasonable accommodation**?", "A sensible adjustment, such as a ramp or sign-language interpreter, that removes a barrier.");
  b.card("FACT", "What do sections 22 and 83 of the Constitution of Zimbabwe concern?", "Section 22: a national objective to promote the dignity and participation of persons with disabilities. Section 83: the State's measures for their rights.");
  b.card("FACT", "What does section 56 of the Constitution guarantee?", "Equality and freedom from unfair discrimination, including on grounds of disability.");
  b.card("FACT", "When was the UN Convention on the Rights of Persons with Disabilities adopted?", "2006.");
  b.card("CONCEPT", "What is inclusive education?", "Learners with disabilities learning in ordinary schools with the support they need.");
  b.card("CONCEPT", "Name three ways to make worship inclusive.", "Ramps and accessible toilets, sign-language interpretation or Braille/large-print materials, and a welcoming attitude with real roles.");
  b.card("FACT", "Who can a child call to report abuse in Zimbabwe?", "Childline Zimbabwe on 116, the police Victim Friendly Unit, a clinic or a trusted adult.");
  b.card("CONCEPT", "Why is inclusion about rights and not only charity?", "People with disabilities have equal rights, so barriers should be removed and not only pitied or helped by gifts.");
});
