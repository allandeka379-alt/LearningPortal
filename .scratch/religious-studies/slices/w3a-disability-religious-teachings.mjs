// W3a: Religious teachings and attitudes towards disability.
import { concept, P, source, levels, ref } from "../lib.mjs";

concept("frs.disability.religious-teachings", { file: "disability/religious-teachings", keyPrefix: "disability.religious-teachings" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: `Which Jewish text forbids insulting a deaf person or putting an obstacle in front of a blind person?`,
    options: [
      [ref("Leviticus", 19, 14), "Correct: a command in the Torah."],
      [ref("Genesis", 12, "1-3"), "This passage is the call of Abraham."],
      [ref("Exodus", 20), "This chapter contains the Ten Commandments."],
      [ref("Deuteronomy", 6, "4-9"), "This passage is the Shema."],
    ],
    answer: "A",
    explanation: `**${ref("Leviticus", 19, 14)}** commands respect for people who are deaf or blind. The Shema is Deuteronomy 6:4-9.`,
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In Surah 80 ('Abasa), according to Muslim tradition, whom did the Prophet turn away from?",
    options: [
      ["A blind man seeking guidance", "Correct: the revelation corrected this."],
      ["A merchant who came to sell goods", "Not the story of the surah."],
      ["A child who asked for food", "Not the story of the surah."],
      ["A traveller who asked for directions", "Not the story of the surah."],
    ],
    answer: "A",
    explanation: "Muslim tradition says the revelation gently corrected the Prophet for turning away from a **blind man** who came seeking guidance.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which value in Zimbabwean life teaches that the extended family must care for all its members, including those with disabilities?",
    options: [
      ["Unhu/ubuntu", "Correct: a person is a person through other people."],
      ["Mukwerera", "Mukwerera is the rain-making ceremony."],
      ["Kurova guva", "Kurova guva is the ceremony to bring home the spirit of a dead person."],
      ["Roora", "Roora is bride wealth."],
    ],
    answer: "A",
    explanation: "**Unhu/ubuntu** teaches that people belong to one another, so a family member in need must be cared for.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What do many Christians learn from John 9:1-3?",
    options: [
      ["Disability is not a punishment for sin", "Correct: Jesus said neither the man nor his parents had sinned."],
      ["Disability always shows that a person has little faith", "Not the lesson of the passage."],
      ["Disability can only be explained by the actions of ancestors", "Not the lesson of the passage."],
      ["Disability should be hidden from visitors to the family home", "Not the lesson of the passage."],
    ],
    answer: "A",
    explanation: "In **John 9:1-3**, Jesus answers that neither the blind man nor his parents sinned; many Christians read this as rejecting the idea that disability is a punishment.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which idea about disability is taught by Surah 80 ('Abasa)?",
    options: [
      ["No one should be turned away because of disability", "Correct: the blind man was sincere."],
      ["Only wealthy people may come to speak with the Prophet", "The surah says the opposite."],
      ["People with disabilities should avoid the leaders of the community", "The surah says the opposite."],
      ["A person who is blind cannot be a Muslim", "Not taught in Islam."],
    ],
    answer: "A",
    explanation: "Surah 80 teaches that no one should be turned away or treated with less respect because of disability or poverty.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Rachel, who is Jewish, is asked how her faith treats a classmate who is deaf. Which response is best supported by the Torah?",
    options: [
      ["Leviticus 19:14 says that a person who is deaf must not be insulted", "Correct: the command protects the vulnerable."],
      ["Leviticus 19:14 says that a person who is deaf cannot join the community", "The verse says the opposite."],
      ["Leviticus 19:14 says that deafness shows that God is angry with a family", "The verse does not say this."],
      ["Leviticus 19:14 says that deafness is a reason to avoid contact with a person", "The verse says the opposite."],
    ],
    answer: "A",
    hints: ["Recall the two examples in the verse: a deaf person and a blind person."],
    explanation: "**Leviticus 19:14** forbids insulting a deaf person or putting an obstacle before a blind one.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which statement best describes attitudes to disability in Indigenous Religion?",
    options: [
      ["Strong family care, though some beliefs led to blame", "Correct: both are part of the picture."],
      ["Every family has always cared for every child with a disability without any blame", "Some families have hidden or blamed."],
      ["Indigenous Religion teaches that persons with disabilities must be sent away from the village", "This is not its teaching."],
      ["Indigenous Religion has no teaching about caring for relatives of any kind", "Care of kin is central."],
    ],
    answer: "A",
    hints: ["Give both the value of care and the harmful beliefs."],
    explanation: "A fair account says that **kin care** is central but that some beliefs about the spirit world have caused blame or secrecy.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which action by a place of worship best shows that its teaching about dignity is put into practice?",
    options: [
      ["Building a ramp and providing large-print books for members who need them", "Correct: teaching leads to action."],
      ["Preaching about dignity while holding services in a hall with only steps", "Words and action do not match."],
      ["Asking members with disabilities to attend only on days when few people come", "This excludes them."],
      ["Telling members with disabilities that they must wait for a miracle before taking part", "This sets conditions."],
    ],
    answer: "A",
    hints: ["Choose the answer where teaching and action agree."],
    explanation: "Teaching about **dignity** is shown in practice when buildings and materials are made accessible.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In Islam, people with disabilities are equal before God.",
    answer: true,
    explanation: "True. Islam teaches that all people are equal before God and are judged on faith and deeds.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "All major religions teach that disability is a punishment from God.",
    answer: false,
    explanation: "False. Judaism, Christianity and Islam each have teachings that reject blaming or neglecting people with disabilities, and Christians point to John 9:1-3.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each text or teaching with its religion.",
    pairs: [["Leviticus 19:14", "Judaism"], ["John 9:1-3", "Christianity"], ["Surah 80 ('Abasa)", "Islam"], ["Unhu/ubuntu and care of kin", "Indigenous Religion"]],
    explanation: "Leviticus: Judaism. John 9: Christianity. Surah 80: Islam. Unhu/ubuntu: Indigenous Religion.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "In {{blank:a}} 9:1-3 Jesus said that neither the blind man nor his parents had {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["John"], choices: ["Genesis", "John", "Leviticus", "Acts"] },
      { id: "b", accepted: ["sinned"], choices: ["sinned", "prayed", "travelled", "healed"] },
    ],
    explanation: "In **John** 9:1-3 Jesus said that neither had **sinned**.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which Shona word, with the Ndebele ubuntu, expresses the value that a person is a person through other people?",
    accepted: ["Unhu", "Hunhu"],
    wrong: ["Roora", "Mutupo"],
    explanation: "**Unhu** (also hunhu) is the Shona word; the Ndebele word is ubuntu.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "Identify **three** ways in which a Christian church can show care for people with disabilities.",
    points: ["Running schools, homes or clinics for people with disabilities", "Building ramps or providing sign-language interpreters", "Providing Braille or large-print books, or teaching that disability is not a punishment"],
    modelAnswer: "A church can run schools, homes or clinics for people with disabilities, build ramps or provide sign-language interpreters, and provide Braille or large-print books while teaching that disability is not a punishment.",
    explanation: "One mark for each way.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe what Muslims learn from the story in Surah 80 ('Abasa).",
    points: [["According to tradition, a blind man came to the Prophet seeking guidance", 1], ["The Prophet was speaking with community leaders and frowned and turned away", 1], ["The revelation gently corrected him", 1], ["Muslims learn that no one should be neglected because of disability or poverty", 1]],
    modelAnswer: "According to tradition, a blind man came to the Prophet seeking guidance while he was speaking with community leaders. The Prophet frowned and turned away, and the revelation gently corrected him. Muslims learn that no one should be neglected because of disability or poverty.",
    hints: ["Tell the story in order and then give the lesson."],
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain **two** ways in which religious teaching can both support and stigmatise people with disabilities.",
    points: [
      ["It can support through teaching of dignity and care", 1],
      ["Developed: texts such as Leviticus 19:14 and Surah 80 teach respect, and religious groups run schools and clinics", 2],
      ["It can stigmatise when it is misused to blame", 1],
      ["Developed: if believers say that disability is a punishment or a curse, families may be shamed and children hidden", 2],
    ],
    modelAnswer: "Religion can support people with disabilities through teaching of dignity and care: texts such as Leviticus 19:14 and Surah 80 teach respect, and religious groups run schools and clinics. It can stigmatise when it is misused to blame: if believers say that disability is a punishment or a curse, families may be shamed and children hidden.",
    hints: ["Give one way religion supports and one way it may stigmatise."],
    explanation: "Two ways, each stated (1) and developed (2).",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "an extract from a fictional church newsletter in Bulawayo, 2026",
      "Last Sunday our youth group studied the story of the man born blind. We learned that Jesus said neither the man nor his parents had sinned, and that the man's life showed God's work. Our youth leader then asked what we can do. Together we have asked the church council for a ramp, and we have started printing the weekly notices in large print for members with low vision."
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "According to Source A, what did the youth group ask the church council to provide?",
        options: [
          ["A ramp", "Correct: they asked for a ramp."],
          ["A new choir", "The source does not say this."],
          ["A larger hall", "The source does not say this."],
          ["A sign-language class", "The source does not say this."],
        ],
        answer: "A", explanation: "The youth group asked the church council for a ramp.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Using Source A, state **three** things the youth group did or learned.",
        points: ["They studied the story of the man born blind", "They learned that Jesus said neither the man nor his parents had sinned", "They asked for a ramp and began printing notices in large print"],
        modelAnswer: "They studied the story of the man born blind and learned that Jesus said neither the man nor his parents had sinned. They then asked for a ramp and began printing the notices in large print.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain how the youth group's actions in Source A put Christian teaching into practice.",
        points: [["They accepted the teaching that disability is not a punishment", 1], ["They acted on the belief that every member of the body of Christ is needed", 1], ["They removed barriers by asking for a ramp and printing large-print notices", 1]],
        modelAnswer: "They accepted the teaching that disability is not a punishment. They acted on the belief that every member of the body of Christ is needed, and removed barriers by asking for a ramp and printing large-print notices.",
      }),
    ],
    hints: ["In (c) link the Bible teaching and the action."],
    explanation: "The source links John 9 with practical action.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1200,
    stem: "Farai says: \"Religions have done more to harm people with disabilities than to help them.\" Aisha says: \"Religions have taught respect and run many services for people with disabilities.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Outline **two** teachings about disability from Judaism, Christianity or Islam.",
        points: [["A first teaching about disability, stated with the religion or text it comes from", 2, ["Judaism: do not insult a deaf person or put an obstacle before a blind person (Leviticus 19:14)", "Christianity: Jesus said neither the blind man nor his parents had sinned (John 9:1-3)", "Islam: Surah 80 teaches that a blind man seeking guidance should not be turned away"]], ["A second teaching, from a different religion or text", 2, ["Any of the teachings listed for the first point, from a different religion"]]],
        modelAnswer: "Judaism teaches that a deaf person must not be insulted and no obstacle may be put before a blind person (Leviticus 19:14). Christianity points to John 9:1-3, where Jesus said neither the blind man nor his parents had sinned.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain why some families in the past hid children with disabilities.",
        points: [["Some believed the disability showed a curse, witchcraft or the displeasure of ancestors", 2], ["They feared shame and blame from neighbours, and lacked knowledge about real causes and support", 2]],
        modelAnswer: "Some families believed the disability showed a curse, witchcraft or the displeasure of ancestors. They feared shame and blame from neighbours and lacked knowledge about real causes and support.",
      }),
      P.manual({
        label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 280 },
        stem: "Assess the view that religions have done more to help than to harm people with disabilities.",
        points: [["Help: teachings of dignity (Leviticus 19:14, Surah 80, John 9) and the work of schools, homes and clinics", 2], ["Harm: myths of punishment or witchcraft, hiding children, inaccessible buildings", 2], ["Link: the teachings are mostly supportive; harm arises from misuse and ignorance, and religious leaders can correct it", 2], ["A supported judgement", 2]],
        levels: levels(8),
        modelAnswer: "Religions have helped by teaching dignity, as in Leviticus 19:14, Surah 80 and John 9, and by running schools, homes and clinics. They have also harmed where believers have spread myths of punishment or witchcraft, hidden children, or kept buildings inaccessible. However, the teachings are mostly supportive, and harm arises from misuse and ignorance, which religious leaders can correct. I conclude that religion has done more to help than to harm, but only when it is applied with knowledge and respect.",
      }),
    ],
    hints: ["Give examples of help and harm from more than one religion, then judge."],
    explanation: "A strong answer balances help and harm, using examples from more than one religion.",
  });

  b.card("FACT", "What does Leviticus 19:14 command?", "Do not insult a deaf person or put an obstacle before a blind person.", "Judaism.");
  b.card("FACT", "What does John 9:1-3 teach many Christians about disability?", "That it is not a punishment for sin: Jesus said neither the man nor his parents had sinned.");
  b.card("FACT", "What lesson do Muslims draw from Surah 80 ('Abasa)?", "That no one should be turned away or treated with less respect because of disability or poverty.");
  b.card("DEFINITION", "What are **unhu** and **ubuntu**?", "Shona and Ndebele words for the value that a person is a person through other people, and so family must care for its members.");
  b.card("DEFINITION", "What is **stigma**?", "A mark of shame attached to a person by others, leading to unfair treatment.");
  b.card("CONCEPT", "How can Indigenous Religion both support and stigmatise people with disabilities?", "It supports through family care and kin duty; it has stigmatised where disability was blamed on witchcraft or spirits and children were hidden.");
  b.card("FACT", "Which passage compares the Church to a body of many parts?", "1 Corinthians 12:12-26.", "Every part is needed; the weaker parts deserve special honour.");
  b.card("CONCEPT", "Why does Judaism teach respect for people with disabilities?", "Every person is made in the image of God, and the Torah forbids taking advantage of the weak (Leviticus 19:14).");
  b.card("CONCEPT", "How can a place of worship show its teaching about dignity?", "By making buildings and materials accessible, welcoming people with disabilities and rejecting myths.");
});
