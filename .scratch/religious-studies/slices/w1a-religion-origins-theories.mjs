// W1a: theories of the origin of religion (frs.religion.origins-theories).
import { concept, P, source, levels } from "../lib.mjs";

concept("frs.religion.origins-theories", { file: "religion/origins-theories", keyPrefix: "religion.origins-theories" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which scholar is associated with the theory of **animism**?",
    options: [
      ["E. B. Tylor, who wrote Primitive Culture in 1871", "Correct: Tylor suggested that religion began with belief in souls and spirits."],
      ["Émile Durkheim, who wrote about the social role of the sacred", "Durkheim is linked with the social theory and totems, not animism."],
      ["Sigmund Freud, who wrote about wishes and illusions", "Freud is linked with the psychological theory."],
      ["Karl Marx, who wrote about religion and unequal societies", "Marx is linked with religion and the social order."],
    ],
    answer: "A",
    explanation: "Edward Burnett Tylor used **animism** for belief in spirits or souls in people, animals, plants and natural things, and proposed that religion began there.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "According to Durkheim, what does a clan worship when it honours its totem?",
    options: [
      ["Society itself, which the totem stands for as a symbol", "Correct: in Durkheim's theory the sacred stands for the group."],
      ["The ghost of a single ancestor of the whole human race", "Durkheim did not argue that one shared ancestor was worshipped."],
      ["A powerful being who is known only through dreams and shadows", "That is closer to Tylor's explanation, built on dreams and souls."],
      ["The wish of each person for a protecting father in the sky", "That is Freud's idea of wish-fulfilment, not Durkheim's."],
    ],
    answer: "A",
    explanation: "Durkheim argued that the power felt at gatherings is really the power of society, and that the totem is a symbol of the clan. Religion therefore expresses and strengthens unity.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which statement best describes the **psychological theory** of Sigmund Freud?",
    options: [
      ["Religion meets a human wish for protection, like a child's need for a parent", "Correct: Freud called belief based on wishing an illusion."],
      ["Religion is the result of fear of the sun, storms and rivers in nature", "That is the fear and wonder explanation, not Freud's."],
      ["Religion is a system that helps owners keep workers poor and obedient", "That is a simplified version of the Marxist view."],
      ["Religion began when early people thought spirits lived in animals and plants", "That is Tylor's animism."],
    ],
    answer: "A",
    explanation: "Freud saw religion as arising from helplessness and the wish for a powerful, caring father. He called it an illusion, meaning a belief based on wishing, not necessarily a false one.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which of these is the account of religious origins that **the religions themselves** give?",
    options: [
      ["Revelation, in which God makes himself or his will known to people", "Correct: Judaism, Christianity and Islam teach that they began through revelation."],
      ["Projection, in which people place their own wishes onto an imagined being", "Projection is Freud's theory, offered by an outsider."],
      ["Animism, in which early people explained dreams and the death of relatives", "Animism is Tylor's theory, offered by an outsider."],
      ["Social control, in which leaders invent beliefs to keep the people obedient", "That is a critic's view and not the account of any religion."],
    ],
    answer: "A",
    explanation: "Revelation is the believers' (insiders') account. The scholars' theories are outsiders' attempts to explain religion through human life and society.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Chipo's class discusses a mukwerera ceremony. Tatenda says that it shows how a community's unity is expressed and strengthened when everyone gathers. Which theory is closest to his explanation?",
    options: [
      ["Durkheim's social theory", "Correct: Durkheim saw ritual as expressing and strengthening the unity of the group."],
      ["Freud's psychological theory", "Freud focused on individual wishes for protection, not on group unity."],
      ["Tylor's animism", "Tylor focused on belief in spirits and souls, not on unity."],
      ["Marx's view of religion", "Marx saw religion as comforting the oppressed and defending the social order."],
    ],
    answer: "A",
    hints: ["Which thinker said religion expresses the unity of the group?"],
    explanation: "Tatenda's explanation is **sociological**. It matches Durkheim's idea that religion strengthens the bonds of a society.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which is a fair **criticism** of Tylor's theory of animism?",
    options: [
      ["It assumes religion developed from simple to complex stages, without support", "Correct: many scholars reject the idea of a simple-to-complex ladder."],
      ["It claims that all religions began with belief in one God who made the world", "Tylor said the opposite: that belief in many spirits came first."],
      ["It ignores the fact that spirits are mentioned in some of the world's religions", "The theory is based on belief in spirits, so it does not ignore them."],
      ["It was written by a believer in revelation who wished to defend a religion", "Tylor was an outside scholar who looked for natural causes."],
    ],
    answer: "A",
    hints: ["Think about the idea that religion moved from 'simple' beliefs to 'advanced' ones."],
    explanation: "Tylor's ladder of development has been challenged, and he treated religion as a mistake of early reasoning. Many believers also reject the label animism.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement about the **theories** of the origin of religion is best supported?",
    options: [
      ["No single theory is accepted by all scholars, and each has limits", "Correct: each theory has strengths and criticisms."],
      ["Durkheim's theory has been proved correct and the other theories are now disproved", "No theory has been proved to the satisfaction of all scholars."],
      ["The theories show that God does not exist, since they explain religion without God", "A theory about origins does not decide whether God exists."],
      ["The theories were written by believers and so tell us how each religion began", "Most were written by outsiders, and they are not the religions' own accounts."],
    ],
    answer: "A",
    hints: ["Can a theory about how religion began settle whether a religion is true?"],
    explanation: "Theories explain human behaviour. They cannot settle whether a religion's claims are true, and no theory is accepted by all scholars.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which criticism is made of **Marx's** view of religion?",
    options: [
      ["It overlooks religious groups that have worked against injustice", "Correct: religion has sometimes challenged unfair systems, not only supported them."],
      ["It claims that religion has no effect at all on how people live", "Marx said religion had a large effect, by comforting the oppressed."],
      ["It says that religion is created by each person's dreams and shadows", "That is nearer to Tylor's explanation of animism."],
      ["It explains religion only through a child's need for its parents", "That is Freud's theory of wish-fulfilment."],
    ],
    answer: "A",
    hints: ["Think of churches, mosques or spirit mediums that opposed an unfair system."],
    explanation: "Marx stressed that religion comforts the suffering and supports the existing order, but critics point to religious groups that have challenged injustice.",
  });
  b.tf({
    d: 2, skill: "RECALL", daily: true,
    stem: "A theory of the origin of religion is an explanation that can be discussed and challenged; it is not a proven fact.",
    answer: true,
    explanation: "True. Theories are offered with reasons and evidence and can be criticised. None of the origin theories is accepted by all scholars.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Because Marx and Freud wrote theories explaining religion in terms of human life, they proved that no religion is true.",
    answer: false,
    explanation: "False. A theory about why people have religion cannot show whether a religion's teachings are true or false. Believers also reject several of these theories.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each thinker with the central idea of his theory.",
    pairs: [
      ["Tylor", "Belief in spirits in people and nature (animism)"],
      ["Durkheim", "Religion expresses the unity of society, with totems as symbols"],
      ["Freud", "Religion meets a wish for protection, as a child needs a parent"],
      ["Marx", "Religion comforts the suffering and supports an unequal order"],
    ],
    explanation: "Tylor: animism. Durkheim: society and the sacred. Freud: wish-fulfilment and projection. Marx: religion, comfort and the social order.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Muslims believe that the Qur'an was given to the Prophet Muhammad through {{blank:a}}. In the religions' own accounts, this idea of God making his will known is called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Jibril"], choices: ["Jibril", "Moses", "Abraham", "Uthman"] },
      { id: "b", accepted: ["revelation"], choices: ["revelation", "projection", "animism", "totemism"] },
    ],
    explanation: "Muslims believe that the angel **Jibril** brought the Qur'an to the Prophet Muhammad. The believers' account of origins is **revelation**.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which scholar wrote *The Elementary Forms of Religious Life* (1912) and argued that religion expresses the unity of society? Give his surname.",
    accepted: ["Durkheim", "Émile Durkheim", "Emile Durkheim"],
    wrong: ["Tylor", "Freud"],
    explanation: "**Émile Durkheim** argued that the sacred stands for society itself and that religion binds a group together.",
  });
  b.manualShort({
    d: 1, skill: "RECALL", marks: 3,
    stem: "Name **three** thinkers who put forward theories about the origin or purpose of religion and state the main idea of any one of them.",
    points: ["Names three thinkers from: Tylor, Durkheim, Freud, Marx, Müller", "Gives the main idea of one of them accurately", "Names all three correctly (full marks for names and idea)"],
    modelAnswer: "Tylor, Durkheim and Freud. Tylor suggested that religion began with belief in spirits in people and nature, which he called animism.",
    explanation: "Award one mark for naming three, one for each correct idea up to the total of three.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** differences between a believer's account of the origin of religion and a scholar's theory.",
    points: [
      "Identifies: believers describe revelation or creation by God; a scholar looks for natural causes in human life",
      "Develops: e.g. Muslims say the Qur'an was revealed to the Prophet Muhammad, whereas Durkheim explains religion through society",
      "Identifies: a believer's account rests on faith; a theory rests on reasoning and evidence",
      "Develops: a theory can be tested and criticised by other scholars, but faith is not tested in this way",
    ],
    modelAnswer: "A believer explains the origin of religion through revelation or creation by God, for example Muslims believe the Qur'an was revealed to the Prophet Muhammad, but a scholar such as Durkheim looks for causes in society. Also, a believer's account rests on faith, whereas a theory rests on reasoning and evidence and can be criticised by other scholars.",
    hints: ["Think about what each account rests on: faith or reasoning."],
    explanation: "Two marks for each difference: identify and develop.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Give **one** strength and **one** criticism of Durkheim's social theory of religion.",
    points: [
      "Strength: explains why religion unites groups and why rituals and festivals matter",
      "Develops with an example (e.g. a totem or a rain ceremony that gathers a community)",
      "Criticism: does not explain personal religious experience, or relied on few cases, or does not fit religions in which God is beyond the group",
      "Develops the criticism with a reason",
    ],
    modelAnswer: "A strength is that it explains why religion unites groups: rituals such as a rain ceremony gather the whole community and strengthen its bonds. A criticism is that it does not explain the personal side of religion, because many people pray and feel close to God alone, and not only as part of a group.",
    hints: ["What does the theory explain well, and what does it leave out?"],
    explanation: "Credit a strength and a criticism, each developed.",
  });
  b.struct({
    d: 3, skill: "UNDERSTANDING",
    stem: source("Source A", "a conversation between two fictional learners in a Mutare school, 2026",
      "Farai: \"My teacher says that a scholar named Tylor believed that religion began when early people thought spirits lived in nature.\"\nAisha: \"But my family believes that religion began when God made himself known to the prophets. Which is right?\"\nFarai: \"I think the question is different. The scholar is explaining why people have religion; your family is saying how their religion began.\"") +
      "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "What name is given to Tylor's explanation, in which early people believed that spirits live in nature?",
        options: [
          ["Animism", "Correct: Tylor used animism for belief in spirits in people and things."],
          ["Revelation", "Revelation is God making himself known, as believers teach."],
          ["Totemism", "Totemism concerns a clan's bond with a totem."],
          ["Projection", "Projection is a term from Freud's theory."],
        ],
        answer: "A",
        explanation: "Tylor's theory is called **animism**.",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "State **two** different ways, shown in Source A, in which the origin of religion is explained.",
        points: ["A scholar's theory (Tylor's animism: spirits in nature)", "A believer's account (revelation: God making himself known to the prophets)"],
        modelAnswer: "Tylor's theory of animism, which says religion began with belief in spirits in nature, and Aisha's family's belief that God made himself known to the prophets.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain why Farai says the two explanations answer different questions.",
        points: [
          "The scholar offers a theory about why people have religion, based on reasoning about human life",
          "The believer gives a religious account of how the religion began, based on faith in revelation",
          "So they do not directly contradict each other: one is an outsider's theory, the other an insider's belief",
        ],
        modelAnswer: "The scholar is trying to explain, by reasoning about human life, why people have religion. Aisha's family is giving a religious account, based on faith, of how their religion began. They are therefore different kinds of explanation, an outsider's theory and an insider's belief, and neither cancels the other.",
      }),
    ],
    hints: ["In (c), ask what each speaker is trying to explain."],
    explanation: "A source contrasting an outsider's theory with an insider's account.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "Answer the questions on theories of the origin of religion.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Outline **two** theories of the origin of religion.",
        points: [
          "Names a theory and thinker (e.g. animism, Tylor)",
          "States its central idea (e.g. religion began with belief in spirits in people and nature)",
          "Names a second theory and thinker (e.g. Durkheim's social theory, Freud's psychological theory)",
          "States its central idea (e.g. religion expresses the unity of society / meets a wish for protection)",
        ],
        modelAnswer: "Tylor's theory of animism says that religion began with belief in spirits in people, animals and nature. Durkheim's social theory says that religion expresses the unity of society, with the totem as a symbol of the clan.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Social theories of religion explain religion better than psychological ones.\" Assess this view.",
        points: [
          ["Social theory (Durkheim) explains why religion unites groups, rituals, totems and festivals", 2],
          ["Psychological theory (Freud) explains personal comfort in suffering, fear and death", 2],
          ["Each leaves something out: Durkheim ignores private experience; Freud ignores community and moral teaching; believers reject both as outsiders' views", 2],
          ["Supported judgement (e.g. neither is enough alone; they explain different sides)", 2],
        ],
        levels: levels(8),
        modelAnswer: "Durkheim's social theory explains many things well. It shows why religions bring groups together, why totems and ceremonies matter and why festivals are shared. In Zimbabwe, a mukwerera ceremony or a family's totem bonds can be understood this way.\n\nFreud's psychological theory explains something else: why individuals pray in times of fear, illness and death, and find comfort in belief in a protector. It does well on personal religion where Durkheim does not.\n\nHowever, each has limits. Durkheim does not explain private experience, and Freud does not explain moral teaching or community life. Many believers also reject both theories, as they say religion begins in revelation. I therefore conclude that neither is better in every case: the social theory explains the group side and the psychological theory the personal side, and they are most useful when combined.",
      }),
    ],
    hints: ["In (b), say what each type of theory explains and what it leaves out before you decide."],
    explanation: "Outline two theories (a) and assess two types of theory against each other (b).",
  });

  b.card("DEFINITION", "Animism (Tylor)", "Belief that spirits or souls are present in people, animals, plants and natural things. Tylor suggested that religion began here (Primitive Culture, 1871).");
  b.card("DEFINITION", "Revelation", "In religions that teach it, God making himself or his will known to people, for example through a prophet or a scripture. It is the religions' own account of their origin.");
  b.card("DEFINITION", "Projection (Freud)", "The human tendency to place wishes and fears onto an imagined being, so that religion reflects human needs.");
  b.card("FACT", "Who argued that religion expresses the unity of society, with totems as symbols of the clan?", "Émile Durkheim (The Elementary Forms of Religious Life, 1912).");
  b.card("FACT", "Which thinker called religion an illusion that meets a wish for protection?", "Sigmund Freud (The Future of an Illusion, 1927). An illusion is a belief based on wishing; it does not have to be false.");
  b.card("FACT", "What was Marx's view of religion in society?", "That it comforts people in an unjust society but may stop them changing the conditions that cause suffering.");
  b.card("CONCEPT", "Why is a theory of the origin of religion different from a believer's account?", "A theory is an outsider's explanation based on reasoning and evidence and open to criticism; a believer's account rests on faith in revelation or creation.");
  b.card("CONCEPT", "Give one strength and one criticism of Tylor's animism.", "Strength: explains why belief in spirits and ancestors is so common. Criticism: assumes religion developed from simple to complex stages, which evidence does not support.");
  b.card("CONCEPT", "What is the fear and wonder explanation of the origin of religion?", "The suggestion that awe and fear of nature (sun, storms, death) led people to honour the powers behind it.");
});
