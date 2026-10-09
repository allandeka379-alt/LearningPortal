// W1b: norms and values at home, school and in the community (her.culture.norms-values).
import { concept, P, source, levels } from "../lib.mjs";

concept("her.culture.norms-values", { file: "culture/norms-values", keyPrefix: "culture.norms-values" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of the following is a **value** rather than a norm?",
    options: [
      ["honesty", "Correct: honesty is a belief about what is good, so it is a value."],
      ["wearing school uniform", "This is a rule of behaviour at school: a norm."],
      ["greeting elders first", "This is an accepted way of behaving: a norm that shows the value of respect."],
      ["raising a hand to speak", "This is a classroom rule of behaviour: a norm."],
    ],
    answer: "A",
    explanation: "A value is a belief about what is important (honesty, respect, hard work). A norm is a rule of behaviour that puts a value into practice.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "An accepted, often unwritten, rule of behaviour in a group is called a …",
    options: [
      ["norm", "Correct: a norm is a standard of behaviour expected in a group."],
      ["value", "A value is a belief about what is important, not the rule of behaviour itself."],
      ["totem", "A totem is a clan symbol, usually an animal, that marks identity."],
      ["sanction", "A sanction is the reward or punishment used to make people keep norms."],
    ],
    answer: "A",
    explanation: "Norms are the accepted rules of behaviour; values are the beliefs behind them; sanctions enforce them.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A head teacher praises a pupil at assembly for returning a lost phone. This praise is an example of …",
    options: [
      ["a positive sanction", "Correct: a reward that encourages people to keep a norm is a positive sanction."],
      ["a negative sanction", "A negative sanction punishes; praise rewards."],
      ["a school value", "Honesty is the value; the praise is the way it is rewarded."],
      ["a form of socialisation through the media", "The praise happens at school, not through the media."],
    ],
    answer: "A",
    explanation: "Sanctions can reward (positive: praise, prizes, trust) or punish (negative: scolding, detention, fines).",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Standing when the head teacher enters the hall is a norm that mainly expresses which value?",
    options: [
      ["respect", "Correct: standing is a sign of respect for a person in authority."],
      ["punctuality", "Punctuality is being on time; standing does not concern time."],
      ["sharing", "Sharing is letting others use what you have; it is not shown by standing."],
      ["hard work", "Hard work is effort in tasks; standing is a sign of respect."],
    ],
    answer: "A",
    explanation: "Many norms of courtesy (standing, greeting first, kneeling, clapping) express the value of respect.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a norm of the **community** rather than of the school?",
    options: [
      ["Attending a neighbour's funeral to support the family", "Correct: this is expected of community members."],
      ["Handing in homework to the class teacher on the due date", "This is a school norm."],
      ["Wearing a tie with the uniform", "This is a school dress norm."],
      ["Lining up for assembly by class", "This is a school routine."],
    ],
    answer: "A",
    explanation: "Community norms include attending funerals, joining communal work and respecting sacred places; school norms concern uniform, work and routines.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which statement **best** explains why some norms change over time?",
    options: [
      ["People judge them against values and the law, and drop those that cause harm", "Correct: values such as fairness, and the law, are used to decide which norms should change."],
      ["Norms change only when a new government is elected and Parliament passes new laws", "Most norms are not made by government; families and communities change them."],
      ["Norms change because values never matter to young people", "This is an unsupported generalisation; values are what guide change."],
      ["Norms must change every year so that people do not get bored", "Norms are not changed on a timetable; they change for reasons."],
    ],
    answer: "A",
    hints: ["Think about what people use to decide whether a custom is fair."],
    explanation: "Norms that harm people or break the law (for example keeping girls out of school) are challenged using values such as fairness and rights.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Nokuthula keeps the school rule against cheating even when the teacher leaves the room. This shows that she has …",
    options: [
      ["internalised the norm", "Correct: she keeps the norm because she believes in it, not out of fear of sanctions."],
      ["received a negative sanction", "Nothing in the story punishes her."],
      ["rejected the school's values", "She is following the school's value of honesty."],
      ["been socialised mainly by her peers", "The story does not say who taught her; it shows she has made the norm her own."],
    ],
    answer: "A",
    hints: ["Why does someone keep a rule when nobody is watching?"],
    explanation: "The goal of socialisation is internalisation: people keep norms because they believe in them, so sanctions are not always needed.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A council fines households that dump rubbish in a stream. Which further step would **most** help the community keep the norm without needing fines?",
    options: [
      ["Teaching residents why clean water matters for everyone's health", "Correct: when people understand and accept the value, they keep the norm willingly."],
      ["Doubling the fine for the next offence", "This strengthens the negative sanction but does not build the value."],
      ["Moving the stream's channel further away from the homes of all residents", "This is impractical and does not change behaviour."],
      ["Telling households to report their neighbours secretly", "This may enforce the rule but can damage trust; it does not build the value."],
    ],
    answer: "A",
    hints: ["Norms last longest when people believe in the value behind them."],
    explanation: "Sanctions work, but norms last when people internalise the value. Education about health and the environment does that.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Detention after school is an example of a negative sanction.",
    answer: true,
    explanation: "True. Detention is a punishment used to discourage breaking school norms.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The same value, such as respect, can be shown through different norms at home, at school and in the community.",
    answer: true,
    explanation: "True. Respect may mean kneeling to serve an elder at home, listening to a teacher at school and attending a neighbour's funeral in the community.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each norm with the value it mainly expresses.",
    pairs: [
      ["arriving at school before the bell", "punctuality"],
      ["sharing food with a neighbour after a good harvest", "sharing"],
      ["joining others to repair a community road", "cooperation"],
      ["owning up to a mistake", "honesty"],
    ],
    explanation: "Each norm is a visible behaviour; the value is the belief that makes it important.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentence.",
    template: "Respect is a {{blank:a}}, while greeting elders first is a {{blank:b}} that shows it.",
    blanks: [
      { id: "a", accepted: ["value"], choices: ["value", "norm", "sanction", "totem"] },
      { id: "b", accepted: ["norm"], choices: ["norm", "value", "sanction", "totem"] },
    ],
    explanation: "Values are beliefs; norms are the behaviour that shows them.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What name is given to the lifelong process by which people learn the norms and values of their society?",
    accepted: ["socialisation", "socialization"],
    wrong: ["sanction", "education"],
    explanation: "**Socialisation**: families, schools, peers, religion and the media all take part.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Distinguish between a norm and a value, giving an example of each.",
    points: [
      "Defines a value as a belief about what is important or good",
      "Gives an example of a value, e.g. respect, honesty",
      "Defines a norm as an accepted rule or standard of behaviour in a group",
      "Gives an example of a norm, e.g. greeting elders, wearing uniform",
    ],
    modelAnswer: "A value is a belief about what is important or good, for example respect. A norm is an accepted rule of behaviour in a group that puts a value into practice, for example greeting elders first.",
    explanation: "One mark for each definition and one for each matching example.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Explain **three** reasons why norms and values are important in a community.",
    points: [
      "Order: people know what to expect",
      "so there is less conflict and disputes are fewer",
      "Cooperation: shared values of sharing and unity",
      "make communal work and mutual help possible",
      "Heritage: norms carry customs and beliefs",
      "from one generation to the next, giving identity and belonging",
    ],
    modelAnswer: "Norms bring order: people know how they are expected to behave, so there is less conflict. Values such as sharing and unity make cooperation possible, so the community can work together on projects and help those in need. Norms also pass on heritage: customs, language and beliefs are handed down, giving people a sense of identity and belonging.",
    hints: ["Each reason needs a point and a developed 'so that' explanation."],
    explanation: "Two marks per reason: one for the point and one for the development. Protection of vulnerable people and development are also creditworthy.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Many pupils at a fictional school in Gwanda arrive late. Suggest **two** ways the school could encourage punctuality, explaining how each would work.",
    points: [
      "Suggests a positive sanction, e.g. praising or rewarding classes with the best attendance record",
      "Explains that rewards encourage pupils to want to be on time",
      "Suggests teaching the value or removing a cause, e.g. explaining what late pupils miss or talking to parents about transport problems",
      "Explains that pupils who understand the value keep the norm willingly",
    ],
    modelAnswer: "The school could reward the class with the best punctuality record each month, which gives pupils a reason to arrive on time. It could also talk to pupils and parents about what late-comers miss and why being on time matters, so pupils accept the value and keep the norm willingly.",
    hints: ["Think of both rewards and education, not only punishment."],
    explanation: "Credit any sensible strategy with an explanation of how it changes behaviour.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: source("Source A", "results of a survey of 80 Form 2 pupils at a fictional school in Kariba, 2026; figures invented for this question",
      "Question: Who taught you most about how to behave?\n\n| Main teacher of behaviour | Number of pupils |\n| --- | --- |\n| Parents and grandparents | 38 |\n| Teachers | 16 |\n| Friends | 14 |\n| Church or mosque | 8 |\n| Television and the internet | 4 |\n| **Total** | **80** |") +
      "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "Which agent did the largest number of pupils name?",
        options: [
          ["parents and grandparents", "Correct: 38 of the 80 pupils."],
          ["teachers", "Teachers were named by 16 pupils."],
          ["friends", "Friends were named by 14 pupils."],
          ["television and the internet", "Only 4 pupils named the media."],
        ],
        answer: "A",
      }),
      P.short({
        label: "(b)", marks: 1,
        stem: "How many pupils named an agent **other than** the family?",
        accepted: ["42", "forty-two", "forty two"],
        wrong: ["38"],
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain **two** reasons why the family may be the most important teacher of norms and values.",
        points: [
          "The family is the first agent of socialisation",
          "so children learn norms before they meet teachers or peers",
          "Children spend much time with family and copy their behaviour",
          "and are corrected daily through praise and scolding (sanctions)",
        ],
        modelAnswer: "The family is the first agent of socialisation, so children learn greeting, sharing and respect long before they start school. Children also spend a great deal of time with parents and grandparents and copy their behaviour, and they are corrected every day through praise and scolding.",
      }),
    ],
    hints: ["For (b), subtract the family's number from the total."],
    explanation: "A data-based practice item: read the table, calculate, then explain the role of the family.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "This question is about how norms are kept.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe **two** ways in which norms are enforced in a community.",
        points: [
          ["Positive sanctions: praise, reward or trust for those who keep norms", 2],
          ["Negative sanctions: scolding, apology, fines at a traditional court or exclusion for those who break them", 2],
        ],
        modelAnswer: "Norms are enforced by positive sanctions: people who keep them are praised, rewarded or trusted with responsibility. They are also enforced by negative sanctions: a person who breaks a norm may be scolded, made to apologise or fined at a traditional court.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Punishment is the best way to make young people keep norms.\" How far do you agree?",
        points: [
          ["For: negative sanctions deter rule-breaking and show that norms are serious", 2],
          ["Against: punishment may cause resentment or only work when someone is watching", 2],
          ["Against: example, praise and explanation help young people internalise values", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "Punishment has a place. Negative sanctions such as detention or a scolding deter rule-breaking and show that a norm is taken seriously, especially when the behaviour harms others.\n\nHowever, punishment has limits. Young people who are only afraid of punishment may keep the rule when watched but break it in secret, and harsh punishment can cause resentment. Example, praise and explanation work differently: when a young person understands why honesty or respect matters and sees adults living by it, the norm becomes their own.\n\nI therefore disagree to a large extent. Punishment is useful as a last step, but the best way to make norms last is for young people to internalise the values behind them through example and explanation, backed by praise.",
      }),
    ],
    hints: ["In (b), consider what happens when nobody is watching."],
    explanation: "A practice evaluative item weighing sanctions against internalisation.",
  });

  b.card("DEFINITION", "Value", "A belief about what is important, good or worth protecting, e.g. respect, honesty, hard work.");
  b.card("DEFINITION", "Norm", "An accepted, often unwritten, rule of behaviour in a group, e.g. greeting elders first.");
  b.card("DEFINITION", "Sanction", "A reward (positive) or punishment (negative) used to encourage people to keep norms.");
  b.card("FACT", "Give two positive and two negative sanctions.", "Positive: praise, a prize or being trusted. Negative: a scolding, detention or a fine.");
  b.card("CONCEPT", "How are norms and values linked?", "Values are the beliefs; norms are the rules of behaviour that put them into practice (respect → greeting elders).");
  b.card("FACT", "Name three norms of the school.", "For example: wearing uniform, arriving on time, not cheating in tests, raising a hand to speak.");
  b.card("CONCEPT", "What does it mean to internalise a norm?", "To keep it because you believe it is right, not out of fear of punishment.");
  b.card("CONCEPT", "Why can norms change?", "People judge them against values and the law; norms that cause harm or deny rights are dropped or changed.");
  b.card("FACT", "Name three reasons norms and values matter.", "Order and peace; cooperation; identity and the passing on of heritage (also protection of the vulnerable).");
});
