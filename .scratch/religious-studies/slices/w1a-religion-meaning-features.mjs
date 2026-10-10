// W1a: meaning and features of religion (frs.religion.meaning-features).
import { concept, P, source, levels } from "../lib.mjs";

concept("frs.religion.meaning-features", { file: "religion/meaning-features", keyPrefix: "religion.meaning-features" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In the study of religion, what does the word **sacred** mean?",
    options: [
      ["Set apart by a community as holy and treated with special respect", "Correct: the sacred is what believers regard as holy, such as a shrine or a scripture."],
      ["Ordinary and used in everyday life, with no special meaning to believers", "That describes the profane, the opposite of the sacred."],
      ["Forbidden by law and punished by the courts of the country", "Sacred is a religious idea; it has nothing to do with legal bans."],
      ["Old and passed on from one generation to the next without change", "Tradition can be old, but age alone does not make something sacred."],
    ],
    answer: "A",
    explanation: "The scholar Émile Durkheim used **sacred** for what a community sets apart as holy, and **profane** for the ordinary, everyday world.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which of these is an example of a **ritual**?",
    options: [
      ["Washing before prayer, as Muslims do", "Correct: a fixed action with symbolic meaning is a ritual."],
      ["Reading the morning newspaper before leaving for school", "A habit with no religious meaning is not a ritual in this sense."],
      ["Walking to the shops on a Saturday afternoon", "An everyday activity with no symbolic religious meaning."],
      ["Wearing school uniform on weekdays", "Uniform is a school rule, not a religious ritual."],
    ],
    answer: "A",
    explanation: "A ritual is a set of actions performed in a fixed way with symbolic meaning. Washing before prayer (wudu) is a Muslim ritual; baptism and the pouring of beer to the ancestors are others.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A religious studies teacher says that the **myth** of creation told in a community is important to its members. What does the teacher mean by myth?",
    options: [
      ["A sacred story that explains how the world or a custom began", "Correct: in religious studies a myth is a traditional sacred story with deep meaning."],
      ["A story that every person in the world knows to be completely untrue", "In this subject, myth does not mean a false story."],
      ["A rule that tells believers which foods they may not eat", "That is a food law or a taboo, not a myth."],
      ["A song that is sung only by the leaders of a religious community", "A myth is a story, not a particular kind of song or a role."],
    ],
    answer: "A",
    explanation: "Scholars use **myth** for a sacred story that explains origins or meaning (for example, how death came into the world). It says nothing about whether the story is true or false.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is the best example of religion seen as a **way of life**?",
    options: [
      ["A family that rests on the Sabbath, prays at set times and follows food laws", "Correct: the religion shapes how they spend time, eat and behave every day."],
      ["A person who believes in God but never mentions it to anyone, and never prays", "That is belief only; the definition here is about daily practice."],
      ["A crowd of supporters that gathers to watch a football match on Sunday", "A crowd with no shared sacred beliefs is not a religion."],
      ["A village meeting that chooses a new headman by a vote", "A civic meeting is not a religious way of life."],
    ],
    answer: "A",
    explanation: "Seen as a way of life, religion guides everyday choices: when to rest, what to eat, how to dress and how to treat others.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which feature of religion is shown by a rabbi, a priest, an imam and a svikiro?",
    options: [
      ["Practitioners with special religious roles", "Correct: each is a person who has a special role in a religion."],
      ["Sacred places set apart for worship", "These are people, not places."],
      ["Symbols that stand for deeper meanings", "These are people with roles, not signs or objects."],
      ["Sacred texts that carry the teaching of a faith", "These are people; a text is a book or an oral tradition."],
    ],
    answer: "A",
    explanation: "Most religions have **practitioners**: rabbi (Judaism), priest or minister (Christianity), imam (Islam) and svikiro, n'anga or elders (Indigenous Religion).",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Nyasha visits her grandmother's home during a bira. She notices the beer pots, the mbira and the singing, and that relatives have travelled from Bulawayo to be there. Which feature of religion does the **relatives gathering together** best show?",
    options: [
      ["Community life and the sharing of belief", "Correct: relatives meeting to take part together show the community side of religion."],
      ["Doctrine, meaning the official teaching of a religion", "Doctrine means official teaching; attending a gathering is not teaching."],
      ["Myth, meaning a sacred story about origins", "A myth is a sacred story, not an act of gathering."],
      ["Profane, meaning the ordinary world outside religion", "Profane describes the ordinary world; the gathering is a religious event."],
    ],
    answer: "A",
    hints: ["Ask what the gathering of relatives tells you about the group that shares the belief."],
    explanation: "Religion is shared by a **community**. Gatherings such as the bira renew bonds between relatives as well as honouring the ancestors.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why do many scholars describe religion by listing its **features** instead of giving one definition?",
    options: [
      ["Religions differ so much that one short definition would leave some out", "Correct: a list of features lets us study very different religions fairly."],
      ["Scholars have decided that religion cannot really be studied at all, so lists are used", "Religion is studied widely; the difficulty is only in defining it."],
      ["Only a believer is permitted to say what a religion really is", "In this subject, outsiders and insiders both describe religion."],
      ["Every religion in the world has exactly the same set of beliefs", "Religions differ greatly in what they believe."],
    ],
    answer: "A",
    hints: ["Think about religions with a written scripture and religions without one."],
    explanation: "Because religions vary (some with founders and scriptures, some without), a single definition tends to leave something out. A list of features, such as beliefs, ritual, practitioners and moral code, works for all.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement about a definition that says religion is **only belief in a God** is best supported?",
    options: [
      ["It would leave out traditions that stress practice or community", "Correct: a narrow definition may not fit every religion."],
      ["It fits every religion in the world, including those with no single God, without exception", "Religions differ too much for one narrow definition to fit all."],
      ["It proves that religions without a single God cannot be studied or understood by scholars", "Such religions can be studied; the definition is simply too narrow."],
      ["It shows that all religions teach the same things about God", "A definition says nothing about whether religions agree."],
    ],
    answer: "A",
    hints: ["Which kinds of religion put more weight on what people do or on the group?"],
    explanation: "Belief in God is central to Judaism, Christianity and Islam, but a definition that mentions only belief may miss the importance of ritual, community and way of life in many traditions.",
  });
  b.tf({
    d: 2, skill: "RECALL", daily: true,
    stem: "In religious studies, the word **profane** means the ordinary, everyday world and does not mean evil.",
    answer: true,
    explanation: "True. Profane means not set apart as holy. A kitchen or a market is profane in this sense; it is not wicked.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Every religion has a single human founder and a written scripture.",
    answer: false,
    explanation: "False. Islam and Christianity have written scriptures and historic founding figures, but Indigenous Religion has no single founder and is passed on orally.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each feature of religion with an example.",
    pairs: [
      ["Sacred text", "The Qur'an"],
      ["Practitioner", "A spirit medium (svikiro)"],
      ["Symbol", "The cross"],
      ["Sacred place", "A synagogue"],
    ],
    explanation: "The Qur'an is Islam's scripture; a svikiro is an Indigenous Religion practitioner; the cross is a Christian symbol; a synagogue is a Jewish place of worship.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Smart's seven dimensions are one scholar's model; Durkheim divided the world into the {{blank:a}} and the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["sacred"], choices: ["sacred", "secular", "ancient", "divine"] },
      { id: "b", accepted: ["profane"], choices: ["profane", "wicked", "modern", "natural"] },
    ],
    explanation: "Durkheim contrasted the **sacred** (set apart as holy) with the **profane** (ordinary).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the scholar of religion who suggested that any religion can be studied through seven dimensions.",
    accepted: ["Ninian Smart", "Smart", "Ninian"],
    wrong: ["Durkheim", "Freud"],
    explanation: "**Ninian Smart** proposed seven dimensions (for example the ritual, mythic, doctrinal, ethical and social dimensions). They are one scholar's model, not an official list.",
  });
  b.manualShort({
    d: 1, skill: "RECALL", marks: 3,
    stem: "State **three** features that most religions have in common.",
    points: ["A belief or set of beliefs (e.g. about God or spirits)", "Worship, prayer or ritual", "Any one of: sacred places, objects or times; sacred texts or oral tradition; practitioners; a moral code; symbols; a community of believers"],
    modelAnswer: "Most religions have beliefs about God or spirits, they have worship and rituals, and they have a moral code that guides how believers live.",
    explanation: "One mark for each feature correctly named.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why scholars find it hard to give one definition of religion.",
    points: [
      "Identifies: religions differ greatly (e.g. with or without a founder or scripture)",
      "Develops: a definition based on one kind of religion leaves others out",
      "Identifies: religion involves belief, practice and community together",
      "Develops: a definition that stresses only one of these misses the others",
    ],
    modelAnswer: "Religions differ greatly. Islam has a written scripture, while Indigenous Religion is passed on orally, so a definition based on a scripture would leave out Indigenous Religion. Religion also includes belief, practice and community, and a definition that stresses only one of them, such as belief in God, would miss the importance of ritual and the group.",
    hints: ["Think of religions with and without a written scripture."],
    explanation: "Two marks for each reason: identify it, then develop it.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "A friend says, \"A religion has to have a building to worship in.\" Explain whether this is a fair description of religion, using one example.",
    points: [
      "States that this is not a fair or complete description (many religions have places set apart but worship can also take place outdoors or at home)",
      "Example: Indigenous Religion uses sacred places such as mountains, groves and the family home rather than only buildings",
      "Explains that what makes a religion is its beliefs, worship, practitioners, moral code and community, not only a building",
      "Credits a recognition that a building is one possible sacred place among others",
    ],
    modelAnswer: "This is not a complete description. Many religions have special buildings, such as churches and mosques, but a religion is defined by its beliefs, worship, practitioners, moral code and community. In Indigenous Religion, ceremonies such as mukwerera are held at sacred places like mountains and groves or at the family home, so a building is not essential.",
    hints: ["Where is a bira or a rain ceremony held?"],
    explanation: "Credit a clear judgement with a supporting example.",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: source("Source A", "a conversation between two fictional learners in a Harare school, 2026",
      "Tendai: \"On Saturday my family went to a ceremony at my grandfather's home. There was singing, the elders poured beer, and my aunt explained why we do it.\"\nAisha: \"At my mosque we wash before prayer, face Makkah and listen to the imam. Last week I learnt how our community looks after the poor.\"") +
      "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which feature of religion is shown by the elders pouring beer and by Aisha washing before prayer?",
        options: [
          ["Ritual", "Correct: both are actions performed in a fixed way with religious meaning."],
          ["Myth", "A myth is a sacred story, not an action."],
          ["Doctrine", "Doctrine is official teaching, not an action."],
          ["Symbol only", "Symbols stand for ideas; here the focus is the actions themselves."],
        ],
        answer: "A",
        explanation: "Pouring beer and washing before prayer are **rituals**: fixed actions with symbolic meaning.",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** practitioners or leaders mentioned or suggested in Source A.",
        points: ["Elders (who lead the ceremony)", "The imam (who leads prayer and teaching)"],
        modelAnswer: "The elders at the ceremony and the imam at the mosque.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain how Source A shows that religion has a moral and community side.",
        points: [
          "Aisha learns how the community looks after the poor, so the religion teaches a moral value of care for others",
          "The aunt explaining why the ceremony is done passes teaching on to the young, a community role",
          "The family and elders gathering shows religion as a shared community activity",
        ],
        modelAnswer: "Aisha's community teaches care for the poor, which is a moral teaching. Tendai's aunt explains the meaning of the ceremony, so the young learn their tradition, and the family and elders gather together, which shows that religion is a shared community activity.",
      }),
    ],
    hints: ["In (c), look for what each speaker learnt and who took part."],
    explanation: "A source linking ritual, practitioners, moral teaching and community.",
  });
  b.struct({
    d: 4, skill: "EVALUATION",
    stem: "Answer the questions on defining and describing religion.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Outline **two** ways in which scholars define religion.",
        points: [
          "As belief in the sacred, a God or supernatural powers",
          "Any one further angle: as a way of life, or as a community of believers who share beliefs and worship",
          "A brief example of the first way (e.g. belief in Mwari or in one God)",
          "A brief example of the second way (e.g. observing the Sabbath or Ramadan; a congregation)",
        ],
        modelAnswer: "Some scholars define religion as belief in the sacred or supernatural, for example belief in Mwari or in one God. Others see it as a way of life or a community, for example Jews who keep the Sabbath together or a congregation that worships together.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"The best way to understand religion is to study its features rather than to look for one definition.\" How far do you agree?",
        points: [
          ["For: the features (beliefs, ritual, texts, practitioners, moral code, symbols, community) apply to very different religions such as Islam and Indigenous Religion", 2],
          ["For: one definition tends to leave out some religions, e.g. those with no founder or written scripture", 2],
          ["Against: a definition gives a short, clear starting point and explains what makes a religion different from other groups; a list of features alone may not do this", 2],
          ["Supported judgement (e.g. both are useful: a definition to begin, features to study in detail)", 2],
        ],
        levels: levels(8),
        modelAnswer: "I largely agree. Religions differ so much that one definition leaves something out: a definition based on a scripture would not fit Indigenous Religion, which is passed on orally. A list of features such as beliefs, worship, practitioners, moral code and community can be applied fairly to Islam, Christianity, Judaism and Indigenous Religion alike.\n\nHowever, a definition has a use. It gives students a short, clear starting point and helps them tell a religion from other groups, such as a sports club, which also has members and rituals. A list of features alone could include things that are not religions.\n\nOverall, the features give the fuller picture, but a working definition is a helpful first step, so the best approach is to use both.",
      }),
    ],
    hints: ["In (b), give a reason for and a reason against, then decide."],
    explanation: "Outline definitions (a) and assess features against a single definition (b).",
  });

  b.card("DEFINITION", "Religion (as studied in this subject)", "A system of beliefs and practices, usually about the sacred or supernatural, shared by a community. There is no single agreed definition.");
  b.card("DEFINITION", "Sacred and profane", "Sacred: set apart as holy. Profane: ordinary, everyday, not set apart (it does not mean evil).", "Words used by Émile Durkheim.");
  b.card("DEFINITION", "Ritual", "A set of actions performed in a fixed way with symbolic meaning, such as baptism, wudu before prayer, or pouring beer to the ancestors.");
  b.card("DEFINITION", "Myth (in religious studies)", "A traditional sacred story that explains origins or meaning. It does not mean a false story.");
  b.card("DEFINITION", "Symbol", "An object, action or image that stands for something deeper, such as the cross, the crescent or a totem animal.");
  b.card("FACT", "Name the main features that most religions share.", "Beliefs, worship and ritual, sacred places/objects/times, sacred texts or oral tradition, practitioners, a moral code, symbols and community.");
  b.card("FACT", "Who proposed the seven dimensions of religion?", "Ninian Smart. They are one scholar's model for studying religion, not an official list.");
  b.card("CONCEPT", "Why do scholars list features instead of giving one definition?", "Religions differ so much (with or without founders and scriptures) that one short definition would leave some out. Features can be used for all.");
  b.card("CONCEPT", "Why do we write 'Muslims believe…' and not 'Islam is true'?", "This subject describes and understands beliefs fairly without judging or converting, so beliefs are reported as the beliefs of their followers.");
});
