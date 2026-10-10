// W3b: Indigenous education and religion (Topic 7.1).
import { concept, P, source, levels } from "../lib.mjs";

concept("frs.education.indigenous-education", { file: "education/indigenous-education", keyPrefix: "education.indigenous-education" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is indigenous education?",
    options: [
      ["Informal learning within the family and community", "Correct: it was informal and based in daily life."],
      ["Teaching in a mission school run by a church mission", "That is mission or formal education."],
      ["Lessons given only by chiefs and headmen at a royal court", "Teachers were parents, relatives and the whole community, not only chiefs."],
      ["Study for written examinations at a college", "Indigenous education had no written examinations."],
    ],
    answer: "A",
    explanation: "**Indigenous education** is the informal, community-based preparation of children for adult life in traditional society.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who were the main teachers of a child in traditional Shona and Ndebele society?",
    options: [
      ["Parents, aunts, uncles and elders", "Correct: the family and community taught."],
      ["Missionary teachers sent out from other countries", "Missionaries came later, bringing formal schools."],
      ["Government inspectors visiting the village schools", "Inspectors belong to the modern school system."],
      ["University lecturers living in the town", "There were no universities in traditional society."],
    ],
    answer: "A",
    explanation: "Children learnt from **parents, grandparents, aunts, uncles and the wider community**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which method of indigenous education is shown when a girl learns to cook by helping her mother at the fire?",
    options: [
      ["Participation, or learning by doing", "Correct: she takes a real share of the task."],
      ["Learning from a written textbook", "Traditional society used no textbooks."],
      ["Sitting an examination at the end of term", "Skills were learnt through use, not examined."],
      ["Listening to a radio lesson", "This is a modern method."],
    ],
    answer: "A",
    hints: ["The girl is working alongside an adult."],
    explanation: "Learning to cook by helping is **participation**: children took part in real work.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why were proverbs and folk tales useful in indigenous education?",
    options: [
      ["They carried values and wisdom in easily remembered form", "Correct: oral teaching needs memorable forms."],
      ["They replaced the need for children to learn practical skills", "Skills were still learnt by doing."],
      ["They were the only way in which religion was ever taught", "Religion was also taught by rituals, taboos and example."],
      ["They were written down and used to test the learners", "There was no writing; they were spoken."],
    ],
    answer: "A",
    explanation: "Proverbs and tales packed **values and wisdom** into memorable sayings and stories.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of these was part of the religious content of indigenous education?",
    options: [
      ["Respect for God and the ancestors, and taboos", "Correct: religion and morality were taught together."],
      ["Reading the Bible in English every single morning", "That belongs to mission education."],
      ["Memorising the Five Pillars of Islam", "That belongs to Islamic education."],
      ["Learning the Torah in a synagogue school", "That belongs to Jewish education."],
    ],
    answer: "A",
    explanation: "Children learnt to respect **God and the ancestors** and to observe **taboos**.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Nokuthula's grandmother tells her a tale at the fire in which a greedy character is punished. What is the main purpose of the tale in indigenous education?",
    options: [
      ["To teach a moral lesson in an enjoyable way", "Correct: the story carries the value of generosity."],
      ["To prepare her for a written test the next day", "There were no written tests."],
      ["To give her a qualification for formal employment", "Indigenous education gave no certificates."],
      ["To replace the need to learn any practical skills", "Practical skills were learnt in other ways."],
    ],
    answer: "A",
    hints: ["Think of the purpose of a story with a moral."],
    explanation: "Folk tales **taught moral lessons** through stories children enjoyed and remembered.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which statement best describes a limitation of indigenous education?",
    options: [
      ["Knowledge was oral, so it could be lost", "Correct: without writing, knowledge depended on memory."],
      ["Children were not taught any values, manners or respect", "Values were central."],
      ["Only the children of chiefs were taught", "Every child took part."],
      ["It was too expensive for most families to afford", "It was based in the home and cost little."],
    ],
    answer: "A",
    hints: ["Think about what happens to knowledge that is not written down."],
    explanation: "Because there was **no writing**, knowledge relied on memory and could be lost.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which conclusion is best supported by the strengths and limitations of indigenous education?",
    options: [
      ["Its values and skills remain useful beside modern schooling", "Correct: the two kinds of education complement each other."],
      ["It should replace all formal schooling in every Zimbabwean community", "Its limitations show why written and scientific knowledge are also needed."],
      ["It had no value at all because it was not written down", "It prepared children effectively for their society."],
      ["It was identical to mission education in methods and teachers", "The methods and settings were different."],
    ],
    answer: "A",
    hints: ["Weigh the strengths against the limitations."],
    explanation: "A balanced judgement says the **two kinds of education can complement each other**.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In traditional society, religion was learnt as a separate subject in a classroom.",
    answer: false,
    explanation: "False. Religion was learnt through daily life, ritual, taboos, tales and example, together with morality and skills.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Grandparents and aunts had an important teaching role in indigenous education.",
    answer: true,
    explanation: "True. Grandparents told stories and gave advice, and aunts such as the vatete guided girls about marriage and family life.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each method of indigenous education with an example.",
    pairs: [
      ["Observation", "A boy watches his father repair a hut"],
      ["Folk tale", "A grandmother tells a story with a moral at the fire"],
      ["Proverb", "A short saying such as one about cooperation"],
      ["Participation", "A girl helps sift grain for the family meal"],
    ],
    explanation: "Observation is watching; folk tales are stories; proverbs are sayings; participation is taking part in real work.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Indigenous education is {{blank:a}} education, passed on by speaking in an {{blank:b}} tradition.",
    blanks: [
      { id: "a", accepted: ["informal"], choices: ["formal", "informal", "written", "foreign"] },
      { id: "b", accepted: ["oral"], choices: ["oral", "printed", "digital", "mission"] },
    ],
    explanation: "It was **informal** and based on the **oral** tradition.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What is the Shona word for a folk tale?",
    accepted: ["ngano", "ngano dzekare"],
    wrong: ["tsumo", "rwiyo"],
    explanation: "A folk tale is **ngano** in Shona (izinganekwane in Ndebele).",
  });
  b.manualShort({
    d: 1, skill: "RECALL", marks: 3,
    stem: "State **three** methods used in indigenous education.",
    points: ["Observation and imitation", "Participation (learning by doing)", "Folk tales, proverbs, songs, riddles or initiation"],
    modelAnswer: "Three methods were observation and imitation, participation by helping with real work, and folk tales and proverbs.",
    explanation: "One mark for each method.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the religious content of indigenous education.",
    points: [
      ["Children learnt about God as creator (Mwari, uMlimo or uNkulunkulu)", 1],
      ["They learnt to respect the ancestral spirits and how to take part in family ceremonies", 1],
      ["They learnt the taboos and what they protect", 1],
      ["Morality and religion were taught together, through daily life, stories and rituals", 1],
    ],
    modelAnswer: "Children learnt about God as creator and respected the ancestral spirits, taking part in family ceremonies. They learnt the taboos and what they protect. Religion and morality were taught together through daily life, stories and rituals.",
    hints: ["Think of God, ancestors, taboos and how it was taught."],
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain **two** strengths of indigenous education.",
    points: [
      ["It was practical and relevant", 1],
      ["Developed: children learnt skills they would use daily, so they became useful members of the family and community", 2],
      ["It taught values and respect", 1],
      ["Developed: religion and morals were taught together, so young people grew into responsible adults who respected elders and the community", 2],
    ],
    modelAnswer: "It was practical and relevant. Children learnt skills such as farming, herding and cooking that they would use daily, so they became useful members of the family and community. It also taught values and respect. Religion and morals were taught together, so young people grew into responsible adults who respected elders and the community.",
    hints: ["Choose two strengths and for each give the reason why it mattered."],
    explanation: "Two strengths, each stated (1) and developed (2).",
  });

  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "an account by a fictional student at a school in Gweru, 2026",
      "In the holidays I stay with my grandmother in the village. Each evening we sit by the fire and she tells stories about Tsuro the hare. After the story she asks what the hare did wrong. At the dare my uncle teaches my brother how to mend a plough, and I learn to cook sadza and to greet elders correctly. Nobody gives us marks, but we know if we have done it well."
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which method of indigenous education is shown when the grandmother tells a story and asks what the hare did wrong?",
        options: [
          ["Folk tale", "Correct: the story carries a moral lesson."],
          ["Examination", "There is no test in the source."],
          ["Textbook study", "No book is used."],
          ["Mission schooling", "Nothing in the source suggests a mission school."],
        ],
        answer: "A", explanation: "The grandmother uses a **folk tale** and a question to teach a value.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "From Source A, identify **three** things the young people are learning.",
        points: ["Moral lessons from stories", "Practical skills such as mending a plough and cooking", "Respect for elders, including how to greet them"],
        modelAnswer: "They are learning moral lessons from stories, practical skills such as mending a plough and cooking, and respect for elders, including how to greet them.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain why learning in this way may be called education even though there is no school.",
        points: [["It has teachers: the grandmother and uncle", 1], ["It has content and methods: skills, values, stories and practice", 1], ["It prepares the young for adult life and the learners know if they have done well", 1]],
        modelAnswer: "It has teachers, the grandmother and uncle. It has content and methods, such as skills, values, stories and practice. It prepares the young for adult life, and the learners know when they have done well.",
      }),
    ],
    hints: ["In (c) show that the features of education are present: teachers, content, methods and purpose."],
    explanation: "Indigenous education was informal but had teachers, content and methods.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1200,
    stem: "Two students debate. Farai says: \"Indigenous education was complete; we do not need to add anything to it.\" Chipo says: \"It taught values well, but it could not give us all the knowledge we need today.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Outline **two** aims of indigenous education.",
        points: [["To prepare children to earn a living and survive (skills)", 1], ["To teach respect, values and good manners", 1], ["To pass on history, customs and identity", 1], ["To teach religion and prepare for adult roles", 1]],
        modelAnswer: "One aim was to prepare children to earn a living through skills. Another was to teach respect and values, and to pass on history and identity.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain **one** limitation of indigenous education.",
        points: [["No writing: knowledge relied on memory", 1], ["Developed: knowledge could be lost when elders died or be passed on unchanged", 1], ["Little scientific or outside knowledge, and no certificates", 1], ["Developed: young people could not easily find employment in a modern economy", 1]],
        modelAnswer: "A limitation was that knowledge was oral, so it relied on memory and could be lost when elders died. It also gave no qualifications, so young people could not easily find employment in a modern economy.",
      }),
      P.manual({
        label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 280 },
        stem: "Assess the view that indigenous education is still valuable in Zimbabwe today.",
        points: [["For: teaches values, respect and identity that families still wish to pass on", 2], ["For: practical skills, proverbs and stories remain relevant and cost nothing", 2], ["Against or limits: written, scientific and technical knowledge is needed in a modern economy", 2], ["A supported judgement", 2]],
        levels: levels(8),
        modelAnswer: "Indigenous education is still valuable because it teaches values, respect and identity that families still wish to pass on, and its stories, proverbs and practical skills remain useful at no cost. However, a modern economy also needs reading, writing, science and technology, which it could not offer. I conclude that it is most valuable when it complements formal schooling.",
      }),
    ],
    hints: ["Consider what indigenous education does well and what only schools can offer."],
    explanation: "A strong answer weighs strengths and limitations and judges how the two systems fit together.",
  });

  b.card("DEFINITION", "What is **indigenous education**?", "The informal, community-based preparation of children for adult life in traditional society, through watching and taking part.");
  b.card("DEFINITION", "What is **oral tradition**?", "Knowledge such as history, stories and proverbs passed on by speaking and remembering.");
  b.card("FACT", "Who were the teachers in indigenous education?", "Parents, grandparents, aunts, uncles, elders and the whole community.");
  b.card("FACT", "Name four methods of indigenous education.", "Observation, participation, folk tales and proverbs (also songs, riddles and initiation).");
  b.card("FACT", "What is a folk tale called in Shona and in Ndebele?", "Ngano (Shona); izinganekwane (Ndebele).");
  b.card("FACT", "Name four areas of content in indigenous education.", "Practical skills, values, history and identity, and religion.");
  b.card("CONCEPT", "Why was religion not a separate subject in traditional education?", "Religion and morality were part of daily life, taught through ritual, taboos, stories and example.");
  b.card("CONCEPT", "Give two strengths of indigenous education.", "It was practical and relevant, and it taught values and unity at no cost.");
  b.card("CONCEPT", "Give two limitations of indigenous education.", "Knowledge relied on memory and could be lost, and it offered no qualifications or outside scientific knowledge.");
});
