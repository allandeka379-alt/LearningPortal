// W1a: socialisation in the home (her.socialisation.home).
import { concept, P, source, levels } from "../lib.mjs";

concept("her.socialisation.home", { file: "socialisation/home", keyPrefix: "socialisation.home" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement best defines **socialisation**?",
    options: [
      ["The lifelong process of learning the norms, values and skills of society", "Correct: socialisation is how a person learns to live and work with others, and it continues throughout life."],
      ["Spending free time with friends at parties, clubs and sports events", "That is socialising (meeting people), not socialisation (learning the ways of society)."],
      ["The rules and punishments that a school uses to keep order among learners", "School rules are one tool of one agent, the school; they are not the whole process."],
      ["Passing a family's land and property on to its children after a death", "That is inheritance, a different topic."],
    ],
    answer: "A",
    explanation: "Socialisation is the lifelong process by which a person learns the norms, values, language, skills and roles of their society.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which agent of socialisation is usually the **first** in a child's life?",
    options: [
      ["The family", "Correct: a baby first learns language, care and manners at home."],
      ["The school", "A child usually starts school only after several years at home."],
      ["The peer group", "Friends of the same age become important later, mostly from school age."],
      ["The mass media", "Children meet radio, television and phones, but the family comes first and filters them."],
    ],
    answer: "A",
    explanation: "The family is the first (primary) agent of socialisation: it shapes the child before any other agent.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In Shona families the father's sister (**vatete**) often advises girls on growing up and marriage. What is her title in **Ndebele**?",
    options: [
      ["ubabakazi", "Correct: ubabakazi is the paternal aunt in Ndebele, the same relative as vatete in Shona."],
      ["umalume", "Umalume is the maternal uncle (the mother's brother), sekuru in Shona."],
      ["ugogo", "Ugogo is a grandmother in Ndebele (ambuya in Shona)."],
      ["umama", "Umama is mother in Ndebele (amai in Shona)."],
    ],
    answer: "A",
    explanation: "Paternal aunt: vatete (Shona) / ubabakazi (Ndebele). Maternal uncle: sekuru (Shona) / umalume (Ndebele).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of these is an example of **primary** socialisation?",
    options: [
      ["A toddler learning to say thank you by copying her mother", "Correct: early learning within the family is primary socialisation."],
      ["A Form 2 learner learning the rules of the school's debate club", "This happens at school: secondary socialisation."],
      ["A new nurse learning how her hospital ward is run", "Learning at the workplace is secondary socialisation."],
      ["A teenager copying a hairstyle seen on a music video", "Learning from the media is secondary socialisation."],
    ],
    answer: "A",
    explanation: "Primary socialisation takes place in early childhood, mainly in the family. Later learning from school, peers, work and the media is secondary socialisation.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Tafadzwa's grandmother tells him a folk tale every evening about a greedy hare that loses everything. What is she **mainly** doing?",
    options: [
      ["Passing on values such as honesty through oral tradition", "Correct: folk tales carry the family's values and heritage to children."],
      ["Teaching him a practical work skill for adult life", "A story about a hare teaches values, not a practical skill such as herding."],
      ["Enforcing a sanction for something he did wrong today", "A bedtime story is not a punishment; sanctions follow bad behaviour."],
      ["Preparing him for the formal curriculum taught at secondary school", "The story is part of home learning and heritage, not the school syllabus."],
    ],
    answer: "A",
    explanation: "Grandparents socialise children through folk tales, proverbs and family history, which teach values and keep heritage alive.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Rudo's parents never shout at visitors and always share food with neighbours. Without being told, Rudo now does the same. Which **method** of socialisation does this show?",
    options: [
      ["Role modelling (learning by example)", "Correct: Rudo copies what her parents do, not what they say."],
      ["Direct instruction from her parents", "Instruction means being told what to do; here she was not told."],
      ["A sanction for poor behaviour", "Nobody punished Rudo; she imitated good behaviour."],
      ["Participation in household production", "Participation means learning a task by doing it with adults, such as farming."],
    ],
    answer: "A",
    hints: ["Notice the words 'without being told'. How did Rudo learn?"],
    explanation: "Children learn a great deal by copying the people they live with. This is role modelling, one of the main methods of socialisation in the home.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which reason **best** explains why the family is described as the most important agent of socialisation in early childhood?",
    options: [
      ["The child spends most time there and depends completely on its members", "Correct: time, dependence and emotional closeness make the family's influence strong and lasting."],
      ["The family is the only agent that has written rules and examinations", "The school, not the family, has written rules and examinations."],
      ["Family members are trained and paid by the state to teach children", "Parents and relatives are not trained or paid by the state for this."],
      ["Young children are not affected at all by any other agent at such an early age", "Other agents (such as the media) can reach young children, but the family is the strongest."],
    ],
    answer: "A",
    hints: ["Think about where a baby spends its time and who it relies on."],
    explanation: "The family comes first, the child spends most of its time there, and the child depends on family members for everything, so early learning at home is deep and lasting.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Chipo's parents work in another country, and she lives with her elderly grandmother, who is often unwell. Which statement **best** describes the effect on Chipo's socialisation?",
    options: [
      ["Other relatives, the school and the community may need to fill gaps the home cannot", "Correct: when the home is limited, the extended family and other agents often support the child."],
      ["Chipo cannot be socialised at all because both of her parents are absent", "Grandparents and others still socialise her; socialisation does not stop."],
      ["Her socialisation has now become entirely the responsibility of the national government", "The state provides services, but relatives and the community remain the main support."],
      ["She will learn only from the media because no adult is at home with her", "Her grandmother is at home and the school and community also socialise her."],
    ],
    answer: "A",
    hints: ["Who else in a Zimbabwean community helps to bring up a child?"],
    explanation: "Absent parents, illness or poverty can weaken the home as an agent. The extended family, the school, religious groups and the community often step in.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Socialisation ends when a person becomes an adult.",
    answer: false,
    explanation: "False. Socialisation is lifelong: adults keep learning new roles at work, in marriage, as parents and in the community (secondary socialisation).",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In Shona, the word **sekuru** can be used for a grandfather and also for the mother's brother.",
    answer: true,
    explanation: "True. Sekuru is used for a grandfather and for a maternal uncle. In Ndebele the maternal uncle is umalume.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each family member with a role they commonly play in socialisation.",
    pairs: [
      ["Grandmother", "Tells folk tales and teaches family history"],
      ["Paternal aunt (vatete / ubabakazi)", "Advises girls on growing up and marriage"],
      ["Older sister", "Looks after younger children and acts as a role model"],
      ["Mother", "Is usually a child's first teacher of language"],
    ],
    explanation: "Roles vary between families, but these are the roles most commonly described for each relative.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "Learning in early childhood within the family is called {{blank:a}} socialisation. Learning later from the school, peers and media is called {{blank:b}} socialisation.",
    blanks: [
      { id: "a", accepted: ["primary"], choices: ["primary", "secondary", "formal", "national"] },
      { id: "b", accepted: ["secondary"], choices: ["primary", "secondary", "formal", "national"] },
    ],
    explanation: "Primary socialisation happens first, in the family; secondary socialisation continues through other agents throughout life.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "The accepted rule \"children greet elders first\" is a {{blank:a}}. The belief behind it, that elders deserve honour, is a {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["norm"], choices: ["norm", "value", "sanction", "totem"] },
      { id: "b", accepted: ["value"], choices: ["norm", "value", "sanction", "totem"] },
    ],
    hints: ["A norm is a rule of behaviour; a value is the belief about what is good."],
    explanation: "Norms are accepted rules of behaviour; values are the beliefs that lie behind them. Greeting elders first is a norm; respect for elders is the value.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the **Ndebele** word for the maternal uncle (the mother's brother).",
    accepted: ["umalume", "malume"],
    wrong: ["ubabakazi", "sekuru"],
    explanation: "The maternal uncle is **umalume** in Ndebele and **sekuru** in Shona.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "List **three** agents of socialisation other than the family.",
    points: ["The school", "Peers (friends of the same age)", "Any one of: the community, religious groups, the media, the workplace"],
    modelAnswer: "The school, peers and religious groups.",
    explanation: "One mark for each correct agent. Accept the community, religious groups, the media (or ICT) or the workplace.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways in which grandparents socialise children.",
    points: [
      "Identifies storytelling (folk tales, proverbs or family history)",
      "Develops: this teaches values such as honesty and keeps the family's heritage alive",
      "Identifies teaching totems, praise poetry or customs",
      "Develops: this gives the child a sense of identity and belonging to a clan",
    ],
    modelAnswer: "Grandparents tell folk tales and proverbs in the evening, which teach children values such as honesty and kindness and pass on the family's heritage. They also teach children their totem and praise poetry, which helps them know which clan they belong to and gives them a sense of identity.",
    hints: ["For each way, say what they do and then why it matters."],
    explanation: "Two marks per way: one for identifying it and one for explaining its effect.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Suggest **two** things a community could do to support the socialisation of children in child-headed households.",
    points: [
      "Suggests a practical step, e.g. relatives, neighbours or church members visit regularly and act as mentors",
      "Explains how it helps, e.g. the children have adults to guide their behaviour and values",
      "Suggests a second step, e.g. the school or community gives counselling, school fees support or life-skills clubs",
      "Explains how it helps, e.g. the children stay in school and learn skills and norms they would have learned from parents",
    ],
    modelAnswer: "Relatives, neighbours or members of a religious group could visit the children every week and act as mentors, so the children still have adults to guide their behaviour and values. The school could also link them with a counsellor and a life-skills club, which helps them stay in school and learn the skills and norms that parents would normally teach.",
    hints: ["What does a parent normally provide that is now missing? Who else could provide it?"],
    explanation: "Credit realistic, practical suggestions, each explained (problem solving).",
  });
  b.struct({
    d: 3, skill: "UNDERSTANDING",
    stem: source("Source A", "an extract from a fictional pupil's diary, Gweru, 2026", "This holiday I stayed with my grandparents. Every evening Ambuya told us stories by the fire. Sekuru made me help him repair the cattle pen and showed me how to count the herd. When I forgot to greet a visitor, my aunt scolded me, but the next day she praised me for fetching water without being asked.") + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which method of socialisation is shown when the aunt praises the writer for fetching water?",
        options: [
          ["A reward for good behaviour", "Correct: praise encourages the child to repeat the behaviour."],
          ["A sanction for poor behaviour", "The scolding was the sanction; the praise is a reward."],
          ["Direct instruction from an adult", "Nobody told the writer to fetch water."],
          ["Learning from folk tales", "The folk tales are told by Ambuya in the evening."],
        ],
        answer: "A",
        explanation: "Rewards (praise) and sanctions (scolding) are both used in the source.",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** skills or values the writer learned from Sekuru.",
        points: ["A practical skill: repairing a cattle pen or counting cattle", "A value such as hard work or responsibility for family property"],
        modelAnswer: "How to repair a cattle pen and count the herd, and the value of hard work.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain why stories told by the fire are an important part of socialisation.",
        points: ["They teach values such as honesty, kindness and respect", "They pass on the family's history and heritage to the next generation", "They build closeness between grandparents and children, so the lessons are remembered"],
        modelAnswer: "Folk tales teach values such as honesty and respect through the fate of the characters. They also pass on the family's history and heritage, and because the children sit close to their grandmother, they remember the lessons.",
      }),
    ],
    hints: ["In (c), think about what the stories teach and what they keep alive."],
    explanation: "The source shows several family members socialising one child through work, stories, sanctions and rewards.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: "Answer the questions on the family as an agent of socialisation.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "Define **primary socialisation**.",
        points: ["Learning in early childhood", "mainly within the family / home"],
        modelAnswer: "The first learning in early childhood, mainly within the family, of language, manners and values.",
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Describe the roles of the paternal aunt and the maternal uncle in socialisation.",
        points: [
          "Vatete/ubabakazi advises girls (and boys) on growing up, behaviour and marriage",
          "She helps resolve family disputes or speaks for the family at ceremonies",
          "Sekuru/umalume advises boys (and girls) and guides them on responsibility",
          "He takes part in family ceremonies and decisions",
        ],
        modelAnswer: "The paternal aunt (vatete or ubabakazi) advises the children, especially girls, on growing up, good behaviour and marriage, and she helps to settle disputes in the family. The maternal uncle (sekuru or umalume) guides the children, especially boys, on responsibility and growing up, and plays a role in family ceremonies and decisions.",
      }),
      P.manual({
        label: "(c)", marks: 6, type: "EXTENDED_RESPONSE",
        stem: "\"The family is still the most important agent of socialisation in Zimbabwe today.\" How far do you agree?",
        points: [
          ["For: the family comes first and its lessons (language, values, identity) last for life", 2],
          ["Against: the school, peers and media (especially phones) now take much of young people's time and influence", 2],
          ["Supported judgement, e.g. still the foundation, but its influence is shared and depends on the home's circumstances", 2],
        ],
        levels: levels(6),
        modelAnswer: "The family is still very important. It is the first agent, and the language, values, totem and identity a child learns at home usually last for life.\n\nHowever, its influence is now shared. Children spend long hours at school and with peers, and phones and television bring other role models into the home. Where parents work away or a child heads the household, the family's role is weaker still.\n\nOverall, the family remains the foundation of socialisation, but it is no longer the only strong influence, so it is the most important agent mainly in early childhood.",
      }),
    ],
    hints: ["In (c), give one side, then the other, then a judgement."],
    explanation: "Define (a), describe roles (b), and weigh the family against other agents (c).",
  });

  b.card("DEFINITION", "Socialisation", "The lifelong process of learning the norms, values, language, skills and roles of society so that a person can live and work with others.");
  b.card("DEFINITION", "Agent of socialisation", "A person, group or institution that teaches an individual how to behave in society: family, school, peers, community, religious groups, media.");
  b.card("DEFINITION", "Primary socialisation", "Learning in early childhood, mainly within the family: language, personal care, manners and family values.");
  b.card("DEFINITION", "Secondary socialisation", "Later, lifelong learning outside the home through the school, peers, religion, community, workplace and media.");
  b.card("FACT", "Paternal aunt in Shona and Ndebele?", "Vatete (Shona); ubabakazi (Ndebele).");
  b.card("FACT", "Maternal uncle in Shona and Ndebele?", "Sekuru (Shona); umalume (Ndebele).");
  b.card("CONCEPT", "Name five methods the family uses to socialise children.", "Instruction, example (role modelling), rewards and sanctions, stories/songs/proverbs, and participation in work.");
  b.card("CONCEPT", "Why is the family the most important agent in early childhood?", "It comes first, the child spends most time there and depends on its members completely, so early lessons last for life.");
  b.card("CONCEPT", "Norm or value: 'children greet elders first'?", "A norm (a rule of behaviour). The value behind it is respect for elders.");
});
