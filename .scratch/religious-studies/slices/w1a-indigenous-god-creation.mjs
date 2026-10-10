// W1a: the concept of God and creation in Indigenous Religion (frs.indigenous.god-creation).
// Reviewer notes: meanings of Dzivaguru and Chikara are not examined (regional and disputed); Musikavanhu, Nyadenga,
// uNkulunkulu and uSimakade glosses are the commonly given ones.
import { concept, P, source, levels } from "../lib.mjs";

concept("frs.indigenous.god-creation", { file: "indigenous/god-creation", keyPrefix: "indigenous.god-creation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which Shona name for God is commonly explained as meaning \"creator of people\"?",
    options: [
      ["Musikavanhu", "Correct: it is commonly explained as God who creates people."],
      ["Nyadenga", "Nyadenga is commonly explained as owner of the sky or heavens."],
      ["uSimakade", "uSimakade is a Ndebele name meaning the eternal one."],
      ["uNkulunkulu", "uNkulunkulu is a Ndebele name, meaning the great one."],
    ],
    answer: "A",
    explanation: "**Musikavanhu** is commonly explained as \"creator of people\". Nyadenga is \"owner of the sky\"; uSimakade is \"the eternal one\".",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which attribute of God is shown by the Shona name **Nyadenga**, commonly explained as \"owner of the sky\"?",
    options: [
      ["God as the ruler of the sky and the heavens", "Correct: the name points to God's rule over the sky and heavens."],
      ["God as the one who made the first reed bed", "The reed bed belongs to a different account and is not shown by this name."],
      ["God as an ancestor of one particular clan", "God is not an ancestor of a clan; the Supreme Being is above the ancestors."],
      ["God as a spirit that enters a medium during a bira", "Spirit possession involves ancestral or territorial spirits, not this name."],
    ],
    answer: "A",
    explanation: "**Nyadenga** (owner of the sky) expresses God's rule over the heavens. Each name for God stresses a different attribute.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Where are the best-known Mwari shrines, Njelele and Matonjeni, found?",
    options: [
      ["In the Matopo (Matobo) Hills near Bulawayo", "Correct: the Matopo Hills are the home of the Mwari shrines."],
      ["On the shores of Lake Kariba in the Zambezi valley", "That area has other sacred sites, but not these shrines."],
      ["On the Nyanga mountains of the eastern highlands", "The Mwari shrines are not in the eastern highlands."],
      ["Near the city of Mutare on the eastern border", "Njelele and Matonjeni are not near Mutare."],
    ],
    answer: "A",
    explanation: "Njelele and Matonjeni are in the **Matopo Hills** of south-western Zimbabwe. Communities send petitions there, especially about rain.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In Indigenous Religion, who is believed to carry a family's requests to God?",
    options: [
      ["The ancestors, who act as intermediaries with God", "Correct: the ancestral spirits pass requests to God."],
      ["Visitors from other villages who have been hired to pray", "Intermediaries are the ancestors, not hired visitors."],
      ["Chiefs, who can speak to God without the help of the ancestors", "Chiefs lead the community, but the ancestors are the intermediaries."],
      ["No one, since God is never approached in Indigenous Religion", "God is approached, usually through the ancestors."],
    ],
    answer: "A",
    explanation: "The family ancestors (midzimu/amadlozi) are **intermediaries** who carry requests to Mwari.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "After a long drought, a community near Gwanda sends a delegation with gifts to a shrine in the Matopo Hills. Which belief about God does this action best show?",
    options: [
      ["God is the giver of rain and is concerned with the whole community", "Correct: a request for rain is made to God as provider."],
      ["God has no interest in the lives or the needs of people", "The delegation acts because God is believed to care."],
      ["God can be approached only by individuals and never by communities", "The delegation shows a community approaching God."],
      ["God is the same as the ancestors of one particular family", "God is supreme and is not an ancestor of a single family."],
    ],
    answer: "A",
    hints: ["Why would a community send gifts to a shrine in a drought?"],
    explanation: "Seeking rain at the shrine shows belief in God as **provider and rain-giver**, who is concerned for the whole community.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What do creation narratives (myths) in Indigenous Religion mainly do?",
    options: [
      ["Express beliefs about God, people and duties through sacred stories", "Correct: myths carry belief and meaning."],
      ["Provide a scientific explanation that competes with laboratory research", "Myths are sacred narratives, not scientific accounts."],
      ["Record the exact dates when the first villages were built", "They are not historical records of dates."],
      ["Describe the laws passed by Parliament about religion", "They have nothing to do with laws made by Parliament."],
    ],
    answer: "A",
    hints: ["What does a myth carry, according to the lesson on the nature of IR?"],
    explanation: "A creation myth is a sacred narrative that expresses what a community believes about God, people and how they should live.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement best describes the way God is understood as both **transcendent** and **immanent** in Indigenous Religion?",
    options: [
      ["God is above human reach yet active in rain, harvest and daily life", "Correct: God is both beyond the world and present in it."],
      ["God is only far away and has nothing to do with what happens on earth", "That would be transcendence alone, but believers also see God as active."],
      ["God lives only inside the bodies of the spirit mediums who speak for him", "That is not the common belief; mediums speak for spirits, not God himself."],
      ["God is only a name for the combined power of all the ancestors of a people", "God is supreme and is not just a name for the ancestors."],
    ],
    answer: "A",
    hints: ["Think of a God who is great and distant but also gives rain."],
    explanation: "**Transcendent** (beyond) and **immanent** (present) together describe God as supreme yet active in rain, harvest and daily life.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which is the best response to the claim that \"Africans had no idea of a supreme God until missionaries arrived\"?",
    options: [
      ["It is inaccurate: Indigenous Religion has its own names for God", "Correct: those names and beliefs existed before missionaries came."],
      ["It is accurate, since there are no traditional names for God in any African language at all", "There are many traditional names for God."],
      ["It is accurate, since belief in God can only come from a written scripture", "A religion can have belief in God without a written scripture."],
      ["It cannot be properly discussed, since no evidence of earlier beliefs can be found at all", "Oral tradition, names, shrines and prayers all provide evidence."],
    ],
    answer: "A",
    hints: ["What evidence do names, shrines and prayers give?"],
    explanation: "The names, prayers, shrines and sayings of Indigenous Religion show belief in a Supreme Being long before missionaries arrived. A fair study describes this belief respectfully.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Mwari is a Shona name for the Supreme Being in Indigenous Religion.",
    answer: true,
    explanation: "True. Mwari is the most widespread Shona name for God and is also used by other peoples, such as the Kalanga.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In Indigenous Religion, the ancestors are equal to Mwari in power.",
    answer: false,
    explanation: "False. Mwari is supreme. The ancestors are honoured intermediaries who carry requests but are not equal to God.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each name for God with its commonly given meaning.",
    pairs: [
      ["Musikavanhu", "Creator of people"],
      ["Nyadenga", "Owner of the sky"],
      ["uSimakade", "The eternal one"],
      ["uNkulunkulu", "The great one"],
    ],
    explanation: "Musikavanhu: creator of people. Nyadenga: owner of the sky. uSimakade: the eternal one. uNkulunkulu: the great one.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "In a widely told southern African story about the origin of death, God sent the {{blank:a}} with a message of life, but the {{blank:b}} arrived first with a message of death.",
    blanks: [
      { id: "a", accepted: ["chameleon"], choices: ["chameleon", "lizard", "eagle", "hare"] },
      { id: "b", accepted: ["lizard"], choices: ["lizard", "chameleon", "snake", "hyena"] },
    ],
    explanation: "In many versions the **chameleon** carries the message of life but is slow, and the **lizard** arrives first with the message of death. Versions differ from place to place.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the Ndebele name for God, which is also linked with the voice of the shrines in the Matopo Hills.",
    accepted: ["uMlimo", "Mlimo", "umlimo"],
    wrong: ["Nyadenga", "Musikavanhu"],
    explanation: "**uMlimo** is a Ndebele name for God, also connected with the voice at the Matopo shrines. Another Ndebele name is uNkulunkulu.",
  });
  b.manualShort({
    d: 1, skill: "RECALL", marks: 3,
    stem: "State **three** names for God in the Indigenous Religion of Zimbabwe.",
    points: ["Mwari", "Musikavanhu (or Nyadenga or Dzivaguru)", "uMlimo (or uNkulunkulu or uSimakade)"],
    modelAnswer: "Mwari, Musikavanhu and uNkulunkulu.",
    explanation: "One mark for each name correctly stated.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** attributes of God in Indigenous Religion.",
    points: [
      "Identifies: God is the creator (e.g. Musikavanhu)",
      "Develops: God made the earth and people, and so is the source of life",
      "Identifies: God is provider and rain-giver",
      "Develops: harvests depend on God's gift of rain, so communities pray and make offerings in drought",
    ],
    modelAnswer: "God is the creator, shown in the name Musikavanhu, which means creator of people, so God is the source of life. God is also the provider and rain-giver, so in a drought communities pray and make offerings, asking God for rain.",
    hints: ["Think of the names Musikavanhu and the rain ceremonies."],
    explanation: "Two marks for each attribute: identify and develop.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain why many believers approach God through the ancestors instead of directly.",
    points: [
      "God is great and supreme, so it is respectful to approach through intermediaries",
      "Similar to how a person approaches a chief through elders or the headman",
      "The ancestors know the family and understand its needs",
      "The ancestors are close to the living through family ties, and can pass the request upward",
    ],
    modelAnswer: "God is great and supreme, so many believers think it respectful to approach God through intermediaries, just as a person approaches a chief through elders. The ancestors also know the family and understand its needs, and because of family ties they are close to the living and can pass their requests upward.",
    hints: ["Compare the way people approach a chief."],
    explanation: "One mark for each valid point, up to four.",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: source("Source A", "a description written by a fictional Form 4 learner from Matabeleland South, 2026",
      "My grandfather says that uNkulunkulu made the people and the land. In the dry season the elders of our area took gifts and a request for rain to the hills where Mwari is believed to speak. They were careful to behave respectfully on the way. When the rains came, the community held a thanksgiving, and my grandfather told us a story about the chameleon and the lizard to explain why people die.") +
      "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which belief about God is shown by the elders taking a request for rain to the hills?",
        options: [
          ["God is the giver of rain and harvest", "Correct: the request is made to God as provider."],
          ["God is a spirit that lives in a single family", "The request is made by the community to God."],
          ["God cannot be asked for anything", "Believers ask God for rain."],
          ["God is the same as a territorial spirit", "God is supreme and distinct from spirits."],
        ],
        answer: "A",
        explanation: "Asking for rain shows belief in God as **provider and rain-giver**.",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** names or titles for God that appear in Source A.",
        points: ["uNkulunkulu", "Mwari"],
        modelAnswer: "uNkulunkulu and Mwari.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain how the story of the chameleon and the lizard helps the community.",
        points: [
          "It is a sacred narrative that explains the origin of death",
          "It helps people to speak about a hard fact of life and to teach the young",
          "It passes on beliefs about God and the world through oral tradition",
        ],
        modelAnswer: "The story is a sacred narrative that explains how death came into the world. It helps the community to speak about a hard fact of life, and the grandfather uses it to teach the young, passing on beliefs by oral tradition.",
      }),
    ],
    hints: ["In (c), ask what the story explains and how it is passed on."],
    explanation: "A source on names of God, requests for rain and creation narratives.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "Answer the questions on God in Indigenous Religion.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe **two** ways in which people communicate with God in Indigenous Religion.",
        points: [
          "Through the ancestors, who act as intermediaries",
          "Developed (e.g. offerings and prayers at a family ceremony such as a bira)",
          "Through the Mwari shrines in the Matopo Hills, where communities send petitions",
          "Developed (e.g. messengers carry gifts and requests for rain)",
        ],
        modelAnswer: "People speak to God through the ancestors, who are intermediaries, by making offerings and prayers at family ceremonies such as a bira. Communities also send messengers with gifts and requests, for example for rain, to the Mwari shrines in the Matopo Hills.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"The ancestors are more important than God in Indigenous Religion.\" How far do you agree?",
        points: [
          ["For: daily religious life centres on the ancestors (bira, offerings, family rituals) because they are close and active in family life", 2],
          ["Against: God is supreme, creator and rain-giver; the ancestors are intermediaries who depend on God; communities turn to the shrines in great need", 2],
          ["The two work together: a chain from family ancestors, to territorial spirits, to Mwari; believers see them as parts of one system", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "I do not agree that the ancestors are more important than God, although they may seem more present in daily life. Families turn to their ancestors for most needs, and ceremonies such as the bira are centred on them, because they are close and know the family.\n\nHowever, believers hold that Mwari is supreme: the creator, provider and rain-giver. The ancestors are intermediaries who carry requests to God, and in times of great need, such as long droughts, communities send petitions to the Mwari shrines in the Matopo Hills.\n\nThe two belong to one system. The ancestors are closest to the living, and God is supreme above them. I therefore conclude that the ancestors are more visible in daily practice, but God is more important in belief.",
      }),
    ],
    hints: ["In (b), say why the ancestors seem important and who is supreme."],
    explanation: "Describe communication with God (a) and assess the importance of the ancestors and God (b).",
  });

  b.card("DEFINITION", "Supreme Being (in Indigenous Religion)", "The highest God, creator and ruler of the world, known by names such as Mwari, Musikavanhu, uMlimo and uNkulunkulu.");
  b.card("DEFINITION", "Transcendent and immanent", "Transcendent: beyond the world and above human reach. Immanent: present and active in the world. Believers describe God as both.");
  b.card("DEFINITION", "Intermediary", "A being who carries requests between people and God. In Indigenous Religion the ancestors are intermediaries.");
  b.card("FACT", "What does Musikavanhu mean?", "Creator of people (a Shona name for God).");
  b.card("FACT", "What does Nyadenga mean, and what does uSimakade mean?", "Nyadenga: owner of the sky (Shona). uSimakade: the eternal one (Ndebele).");
  b.card("FACT", "Where are the Mwari shrines Njelele and Matonjeni?", "In the Matopo (Matobo) Hills near Bulawayo. Communities send petitions there, especially for rain.");
  b.card("CONCEPT", "Name three attributes of God in Indigenous Religion.", "Creator, provider and rain-giver, supreme and eternal; transcendent yet active; source of moral order.");
  b.card("CONCEPT", "What is the story of the chameleon and the lizard about?", "A widely told southern African story about the origin of death: God sends the chameleon with a message of life, but the lizard arrives first with the message of death.");
  b.card("CONCEPT", "Why do many believers approach God through the ancestors?", "God is great and supreme, so it is respectful to use intermediaries; the ancestors know the family and are close to the living.");
});
