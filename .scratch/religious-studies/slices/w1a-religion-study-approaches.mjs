// W1a: key concepts for studying religion (frs.religion.study-approaches).
import { concept, P, source, levels } from "../lib.mjs";

concept("frs.religion.study-approaches", { file: "religion/study-approaches", keyPrefix: "religion.study-approaches" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **monotheism**?",
    options: [
      ["Belief in one God, the creator of all", "Correct: Judaism, Christianity and Islam are monotheistic."],
      ["Belief in many gods and goddesses", "That is polytheism."],
      ["Belief that there is no God at all", "That is atheism."],
      ["Belief that God and the universe are one", "That is pantheism."],
    ],
    answer: "A",
    explanation: "**Monotheism** is belief in one God. Judaism, Christianity and Islam are monotheistic religions.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How does **agnosticism** differ from atheism?",
    options: [
      ["Agnostics say we cannot know if God exists; atheists say there is none", "Correct: agnosticism is about what can be known, atheism is a denial."],
      ["Agnostics say that there are many gods, while atheists say that there is only one", "Belief in many gods is polytheism; neither term means that."],
      ["Agnostics follow a particular religion, while atheists belong to no group at all", "Agnosticism is not a religion with a membership."],
      ["Agnostics worship their ancestors, while atheists worship the universe itself", "Neither term describes worship of ancestors or of the universe."],
    ],
    answer: "A",
    explanation: "An **atheist** believes there is no God. An **agnostic** holds that it is not possible to know. Neither is a religion.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which word describes belief that God and the universe are one and the same?",
    options: [
      ["Pantheism", "Correct: pantheism holds that God and the world are identical."],
      ["Henotheism", "Henotheism is devotion to one god among others that are believed to exist."],
      ["Secularism", "Secularism concerns the independence of public life from religion."],
      ["Monotheism", "Monotheism is belief in one God who is distinct from creation."],
    ],
    answer: "A",
    explanation: "**Pantheism** holds that God is identical with the universe and nature.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is an example of **special revelation**?",
    options: [
      ["Muslims' belief that the Qur'an was revealed to the Prophet Muhammad", "Correct: knowledge of God given through a prophet and a scripture."],
      ["A person sensing wonder at the beauty of a mountain at sunrise", "That is closer to general revelation, through nature."],
      ["A scholar comparing the festivals of three religions in a university library", "That is the comparative approach, not revelation."],
      ["A council of elders making a rule about when the fields are to be rested each week", "A rule of the community is not by itself a revelation."],
    ],
    answer: "A",
    explanation: "**Special revelation** is knowledge of God given through prophets, visions or scriptures; **general revelation** is knowledge through nature, conscience or reason.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Nokuthula describes the Jewish festival of Pesach by saying, \"Jews remember the Exodus from Egypt and eat special foods at a family meal.\" Which approach is she using?",
    options: [
      ["The phenomenological approach, describing it as its followers do", "Correct: she describes the practice and its meaning without judging it."],
      ["A confessional approach, urging the class to join the festival and its religion", "She is describing, not urging anyone to join."],
      ["A proselytising approach, trying to persuade her classmates to change belief", "Nothing in her statement tries to change anyone's belief."],
      ["A secular approach, arguing that no religion should have public holidays", "She is describing a festival, not arguing about public life."],
    ],
    answer: "A",
    hints: ["Is she describing, or arguing and persuading?"],
    explanation: "Describing a practice as its followers understand it, without judgement, is the **phenomenological** approach.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A Christian says: \"The Trinity means that God is one, yet known as Father, Son and Holy Spirit.\" How would the student of religion describe this belief?",
    options: [
      ["As monotheism, since Christians understand God to be one", "Correct: Christians teach one God in three persons."],
      ["As polytheism, since three names are used for the divine", "Christians do not teach three gods."],
      ["As atheism, since the belief cannot be explained simply", "The belief affirms God, so it is not atheism."],
      ["As pantheism, since God is said to be present in all things", "The Trinity does not mean that God and the world are identical."],
    ],
    answer: "A",
    hints: ["How many Gods do Christians say there are?"],
    explanation: "Christians understand the Trinity as one God in three persons, so it is described as monotheism.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why is it best to avoid calling Indigenous Religion simply \"ancestor worship\"?",
    options: [
      ["Believers honour ancestors as intermediaries, so the label misrepresents them", "Correct: many believers distinguish honouring ancestors from worshipping God."],
      ["Indigenous Religion has no beliefs about ancestors, and the label is therefore wrong", "Beliefs about ancestors are central to Indigenous Religion."],
      ["Indigenous Religion teaches that ancestors are gods equal to Mwari in every way", "The usual teaching is that Mwari is supreme and ancestors intercede."],
      ["The label is correct for every religion in the world, so it tells us nothing special", "The label is not accurate for every religion, and it is also unfair."],
    ],
    answer: "A",
    hints: ["Who do believers say is the supreme God, and what is the ancestors' role?"],
    explanation: "Many believers say that Mwari (uMlimo, uNkulunkulu) is supreme and that ancestors are honoured as intermediaries. A fair description uses the terms believers use, such as veneration of the ancestors.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement best explains the value of using **both** insider and outsider perspectives?",
    options: [
      ["Insiders explain meaning to believers; outsiders compare and notice patterns", "Correct: the two perspectives supply different and useful information."],
      ["Insiders are always right and outsiders must be ignored in every kind of study", "Both perspectives are useful; neither is always right."],
      ["Outsiders are always right and the accounts of insiders cannot be used as evidence", "Insiders know what practices mean to believers."],
      ["Both perspectives give exactly the same information, so only one need be used", "They add different things, which is why both are valuable."],
    ],
    answer: "A",
    hints: ["What can an insider tell you that an outsider cannot, and the reverse?"],
    explanation: "Insiders (emic) give meaning from within; outsiders (etic) can compare and spot patterns. Good study uses both.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Atheism is a religion with its own scriptures and places of worship.",
    answer: false,
    explanation: "False. Atheism is the belief that there is no God. It is a position on God, not a religion.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A secular state can still protect the freedom of its citizens to practise their religions.",
    answer: true,
    explanation: "True. Secularism means public life does not depend on or favour one religion. It does not prevent the state from protecting freedom of religion.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Polytheism", "Belief in many gods"],
      ["Pantheism", "God and the universe are one"],
      ["Emic perspective", "The view of a believer describing their own religion"],
      ["Etic perspective", "The view of an outside observer or scholar"],
    ],
    explanation: "Polytheism: many gods. Pantheism: God and the universe are one. Emic: insider's view. Etic: outsider's view.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Judaism, Christianity and Islam are {{blank:a}} religions. Knowledge of God given through a prophet or a scripture is called {{blank:b}} revelation.",
    blanks: [
      { id: "a", accepted: ["monotheistic"], choices: ["monotheistic", "polytheistic", "pantheistic", "secular"] },
      { id: "b", accepted: ["special"], choices: ["special", "general", "natural", "social"] },
    ],
    explanation: "They are **monotheistic** (one God). Revelation through prophets and scriptures is **special** revelation.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What term describes the view that it is not possible to know whether God exists?",
    accepted: ["agnosticism", "agnostic"],
    wrong: ["atheism", "secularism"],
    explanation: "**Agnosticism** is the view that we cannot know whether God exists.",
  });
  b.manualShort({
    d: 1, skill: "RECALL", marks: 3,
    stem: "State **three** types of belief about the divine.",
    points: ["Monotheism (belief in one God)", "Polytheism (belief in many gods)", "Any one of: henotheism, pantheism, atheism, agnosticism"],
    modelAnswer: "Monotheism (belief in one God), polytheism (belief in many gods) and pantheism (God and the universe are one).",
    explanation: "One mark for each type correctly named.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain the difference between **general** and **special** revelation, with one example of each.",
    points: [
      "General revelation: knowledge of God through nature, conscience or reason",
      "Example: seeing God's work in creation, such as a beautiful landscape",
      "Special revelation: knowledge given through prophets, visions or scriptures",
      "Example: the Torah revealed to Moses, or the Qur'an to the Prophet Muhammad",
    ],
    modelAnswer: "General revelation is knowledge of God that comes through nature, conscience or reason, for example believers who see God's work in the beauty of creation. Special revelation is knowledge given through prophets, visions or scriptures, for example the Torah given to Moses at Sinai or the Qur'an revealed to the Prophet Muhammad.",
    hints: ["One kind comes through the world around us, the other through chosen people or scripture."],
    explanation: "One mark for each meaning and one for each example.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Explain why this subject is described as non-confessional and non-proselytising.",
    points: [
      "It teaches about several religions without asking learners to hold any belief (non-confessional)",
      "It describes beliefs fairly as the beliefs of their followers",
      "It does not try to persuade learners to change their religion (non-proselytising)",
      "It respects freedom of conscience and religion, as in section 60 of the Constitution of Zimbabwe",
    ],
    modelAnswer: "The subject is non-confessional because it teaches about Indigenous Religion, Judaism, Christianity and Islam without asking learners to believe any of them, and it describes each fairly as the belief of its followers. It is non-proselytising because it does not try to persuade learners to change their religion, which respects freedom of conscience and religion in section 60 of the Constitution.",
    hints: ["Think of what learners are asked to do, and what they are not asked to do."],
    explanation: "Credit clear statements of both terms, linked to freedom of conscience.",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: source("Source A", "a conversation between two fictional learners in Gweru, 2026",
      "Tendai: \"Our family honours the ancestors and believes that Mwari made the world. My uncle says that the ancestors speak to Mwari for us.\"\nMiriam: \"My family keeps Shabbat and believes in one God. We do not know everything about God, but we trust the Torah.\"\nThe teacher: \"Let us describe what each family believes without deciding who is right.\"") +
      "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which term best describes belief in one God, as Miriam's family holds?",
        options: [
          ["Monotheism", "Correct: belief in one God."],
          ["Polytheism", "That is belief in many gods."],
          ["Atheism", "That is the belief that there is no God."],
          ["Pantheism", "That is the belief that God and the universe are one."],
        ],
        answer: "A",
        explanation: "Belief in one God is **monotheism**.",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** different beliefs about the divine in Source A.",
        points: ["Belief that Mwari made the world and the ancestors speak to Mwari (Indigenous Religion)", "Belief in one God, trusting the Torah (Judaism)"],
        modelAnswer: "Tendai's family believes Mwari made the world and that the ancestors speak to Mwari, and Miriam's family believes in one God and trusts the Torah.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain why the teacher asks the learners to describe the beliefs without deciding who is right.",
        points: [
          "The subject is non-confessional: it aims to understand, not to judge or convert",
          "Describing fairly respects each learner's freedom of conscience and religion",
          "Understanding beliefs first (the phenomenological approach) allows learners to compare them accurately",
        ],
        modelAnswer: "The subject is non-confessional, so the aim is to understand beliefs and not to judge or convert. Describing them fairly respects each learner's freedom of conscience, and understanding each belief first, as the phenomenological approach does, lets learners compare them accurately.",
      }),
    ],
    hints: ["In (c), think of what a fair study of religion tries to do."],
    explanation: "A source applying the key concepts to two families' beliefs.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "Answer the questions on studying religion.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Distinguish between **monotheism** and **polytheism**, giving an example of each.",
        points: [
          "Monotheism: belief in one God",
          "Example: Islam, Judaism or Christianity",
          "Polytheism: belief in many gods",
          "Example: ancient Greek religion (or Hinduism as it is sometimes described)",
        ],
        modelAnswer: "Monotheism is belief in one God, as in Islam, Judaism and Christianity. Polytheism is belief in many gods, as in ancient Greek religion.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"A person who does not belong to a religion cannot study that religion fairly.\" How far do you agree?",
        points: [
          ["Against: outsiders can describe religions accurately using the phenomenological and comparative approaches, setting aside their own opinions", 2],
          ["For: insiders know what rituals and symbols mean to believers; outsiders may miss meaning or misjudge", 2],
          ["Both perspectives are valuable: emic and etic views complement each other; example (e.g. a class listening to a Muslim classmate on Ramadan)", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "I do not agree that an outsider cannot study a religion fairly. Using the phenomenological approach, a student can describe a religion as its followers see it and set aside personal opinions, and the comparative approach lets an outsider notice patterns across religions.\n\nHowever, insiders do bring something valuable. A Muslim learner can explain what fasting in Ramadan means to her family in a way a textbook cannot, and an outsider might miss such meanings or misjudge a practice.\n\nOverall, fair study depends on method and attitude more than on belonging. The best approach combines both views: listening to insiders and applying the care and accuracy of an outsider.",
      }),
    ],
    hints: ["In (b), say what insiders know and what outsiders can do."],
    explanation: "Distinguish key terms (a) and assess insider and outsider study of religion (b).",
  });

  b.card("DEFINITION", "Monotheism and polytheism", "Monotheism: belief in one God (Judaism, Christianity, Islam). Polytheism: belief in many gods (e.g. ancient Greek religion).");
  b.card("DEFINITION", "Atheism and agnosticism", "Atheism: the belief that there is no God. Agnosticism: the view that we cannot know whether God exists.");
  b.card("DEFINITION", "Pantheism", "The belief that God is identical with the universe and nature.");
  b.card("DEFINITION", "Secularism", "Organising public life, such as government and law, so that it does not depend on or favour any one religion. A secular state can still protect religious freedom.");
  b.card("DEFINITION", "General and special revelation", "General: knowledge of God through nature, conscience or reason. Special: knowledge given through a prophet, vision or scripture.");
  b.card("FACT", "What do emic and etic mean in the study of religion?", "Emic: the insider's perspective (a believer). Etic: the outsider's perspective (a scholar or observer).");
  b.card("FACT", "Name three approaches used to study religion in this subject.", "Phenomenological (describe as followers see it), comparative (compare religions) and multi-faith (study several religions with equal respect).");
  b.card("CONCEPT", "Why is the Christian belief in the Trinity still called monotheism?", "Christians teach that God is one, in three persons: Father, Son and Holy Spirit. They do not teach three gods.");
  b.card("CONCEPT", "Why does this subject describe beliefs as 'Muslims believe…'?", "It is non-confessional and non-proselytising: it describes beliefs fairly as the beliefs of followers, without judging them or asking learners to change their own.");
});
