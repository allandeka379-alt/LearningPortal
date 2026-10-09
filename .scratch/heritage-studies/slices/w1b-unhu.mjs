// W1b: Unhu/Ubuntu/Vumunhu (her.culture.unhu).
import { concept, P, source, levels } from "../lib.mjs";

concept("her.culture.unhu", { file: "culture/unhu", keyPrefix: "culture.unhu" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement best explains the meaning of **Unhu/Ubuntu/Vumunhu**?",
    options: [
      ["A person becomes fully human through good relationships with others", "Correct: the core idea is being human through other people."],
      ["A person becomes respected mainly by gathering wealth and cattle", "Wealth may bring status, but Unhu is about character and relationships, not possessions."],
      ["A person should obey every instruction given by an older person, without question", "Unhu includes respect for elders, but it is not blind obedience: honesty and justice are also part of it."],
      ["A person should look after personal needs before anyone else's", "This describes individualism, the opposite of the communal outlook of Unhu."],
    ],
    answer: "A",
    explanation: "Unhu (Shona), Ubuntu (Ndebele) and Vumunhu name one idea: a person's humanity is shown and completed through respectful, caring relationships with other people.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A shopkeeper in Mutare gives Farai US\\$5 too much change. Farai walks back and returns it. Which attribute of Unhu does he show **most clearly**?",
    options: [
      ["integrity", "Correct: he does the right thing even though nobody would have known."],
      ["hospitality", "Hospitality is welcoming visitors and strangers; Farai is not hosting anyone."],
      ["tolerance", "Tolerance is accepting people who differ from you; that is not what the story is about."],
      ["humility", "Humility is not boasting or looking down on others; returning money is about honesty."],
    ],
    answer: "A",
    explanation: "Integrity means being honest and doing right when nobody is watching. Returning money that no one would have missed is a classic example.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A family in Hwange welcomes a stranded traveller, gives her a meal and a place to sleep, and asks nothing in return. Which attribute of Unhu is this?",
    options: [
      ["hospitality", "Correct: welcoming and caring for a visitor or stranger is hospitality."],
      ["integrity", "Integrity is about honesty and consistency of character, not welcoming guests."],
      ["humility", "Humility is modesty; the story is about welcoming a stranger."],
      ["discipline", "Discipline is self-control and following rules; it does not describe the family's welcome."],
    ],
    answer: "A",
    explanation: "Hospitality, welcoming visitors and strangers with food and shelter, is one of the best-known attributes of Unhu across Zimbabwe's communities.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which behaviour shows a **lack** of Unhu?",
    options: [
      ["Laughing at a classmate who stammers when reading aloud", "Correct: mocking someone's difficulty shows a lack of compassion and respect."],
      ["Helping an elderly neighbour carry water from the borehole", "This shows compassion and respect: it is Unhu in action."],
      ["Sharing a lunch with a classmate who has brought none", "This shows sharing and compassion, both attributes of Unhu."],
      ["Greeting visitors politely when they arrive at your home", "This shows respect and hospitality."],
    ],
    answer: "A",
    explanation: "A person with Unhu respects others and feels for those who struggle. Mocking a classmate's stammer is the opposite: it humiliates instead of supporting.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "The proverbs *munhu munhu nekuda kwevanhu* and *umuntu ngumuntu ngabantu* both mean that …",
    options: [
      ["a person is a person because of other people", "Correct: both proverbs express the heart of Unhu/Ubuntu."],
      ["a child belongs only to the father's family", "This is about lineage, not the meaning of these proverbs."],
      ["an elder's word must always be obeyed", "The proverbs are about humanity through others, not obedience."],
      ["a visitor should be served before the family", "This is a hospitality custom, not what these proverbs say."],
    ],
    answer: "A",
    explanation: "The Shona and Ndebele proverbs say the same thing: we become fully human through our relationships with others.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which reason **best** explains why Unhu is important for national unity?",
    options: [
      ["It teaches tolerance and respect for people of other groups and views", "Correct: tolerance and respect let people of different languages, faiths and opinions live peacefully together."],
      ["It teaches that each family should keep entirely to itself", "That would divide people; Unhu encourages oneness."],
      ["It requires all citizens to speak the same home language", "Unhu does not require one language; Zimbabwe recognises 16 official languages."],
      ["It makes sure that every citizen of the country belongs to the same faith", "Unhu respects people of every faith; it does not require one religion."],
    ],
    answer: "A",
    hints: ["Think about what allows people who are different to live together peacefully."],
    explanation: "National unity depends on people accepting one another despite differences. Tolerance and respect, attributes of Unhu, make that possible.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Chipo is the best runner in her school in Marondera. After winning a race she thanks her coach, congratulates the other runners and does not boast. Which attribute does she show?",
    options: [
      ["humility", "Correct: not boasting and honouring others after success is humility."],
      ["hospitality", "Hospitality is welcoming guests; there are no guests in the story."],
      ["integrity", "Integrity is honesty and consistency; the key behaviour here is modesty."],
      ["sharing", "Sharing means letting others use what you have; she is being modest, not sharing goods."],
    ],
    answer: "A",
    hints: ["What is the opposite of boasting?"],
    explanation: "Humility means not boasting or looking down on others. Thanking the coach and congratulating rivals shows a modest attitude to success.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Read the statement: *\"Unhu has disappeared in towns.\"* Which piece of evidence would **most weaken** this statement?",
    options: [
      ["Burial societies in Harare suburbs where members support bereaved families", "Correct: this shows communal support, an attribute of Unhu, alive in towns."],
      ["Many young people in towns spend hours on social media each day", "This might be used to support the statement, not weaken it."],
      ["Some residents of town flats do not know the names of their nearest neighbours", "This supports the statement that Unhu is weaker in towns."],
      ["Rents in towns are higher than the cost of living in rural areas", "Rents are about the economy, not about whether people show Unhu."],
    ],
    answer: "A",
    hints: ["To weaken a claim you need evidence that points the other way."],
    explanation: "To weaken the claim you need an example of Unhu still working in towns. Burial societies, church groups and neighbourhood fundraising show sharing and compassion in urban life.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Unhu, Ubuntu and Vumunhu are names in different languages for the same basic idea.",
    answer: true,
    explanation: "True. Unhu (Shona), Ubuntu (Ndebele) and Vumunhu name one shared value: being human through others.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A person with Unhu will do anything an elder tells them, even if it is wrong.",
    answer: false,
    explanation: "False. Respect for elders is part of Unhu, but so are honesty and justice. A person with Unhu politely refuses to do wrong.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each attribute of Unhu with the behaviour that shows it.",
    pairs: [
      ["compassion", "visiting and helping a sick neighbour"],
      ["honesty", "owning up to breaking a window"],
      ["tolerance", "welcoming a pupil of a different faith"],
      ["oneness", "a village repairing a borehole together"],
    ],
    explanation: "Compassion acts on another's suffering; honesty tells the truth; tolerance accepts difference; oneness is working together as one group.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "The Ndebele word for Unhu is {{blank:a}}, and the value is shown mainly through a person's {{blank:b}} with other people.",
    blanks: [
      { id: "a", accepted: ["Ubuntu"], choices: ["Ubuntu", "Ilima", "Amadlozi", "Lobola"] },
      { id: "b", accepted: ["relationships"], choices: ["relationships", "possessions", "qualifications", "appearance"] },
    ],
    explanation: "Ubuntu is the Ndebele term (ilima is a work party, amadlozi are ancestral spirits, lobola is bride wealth). Unhu is judged by how a person relates to others.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the attribute of Unhu that means *not boasting or looking down on other people*.",
    accepted: ["humility", "humbleness", "being humble", "modesty"],
    wrong: ["honesty", "respect"],
    explanation: "**Humility** (being humble) is the attribute. Honesty is telling the truth; respect is treating others as valuable.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "State **four** attributes of Unhu/Ubuntu/Vumunhu.",
    points: [
      "Any one of: respect, integrity, honesty, humility",
      "A second attribute from the list (respect, integrity, honesty, humility, tolerance, oneness, compassion, hospitality, sharing)",
      "A third different attribute",
      "A fourth different attribute",
    ],
    modelAnswer: "Respect, honesty, compassion, hospitality.",
    explanation: "One mark for each correct attribute; *state* needs no explanation.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways in which Unhu benefits a family.",
    points: [
      "Identifies respect between generations",
      "Explains that children who respect parents and elders listen to advice, so the family stays united",
      "Identifies compassion or sharing among family members",
      "Explains that members support one another in illness, death or hardship, so no one is left alone",
    ],
    modelAnswer: "Unhu teaches respect between generations: children who respect parents and elders listen to their advice, so the family stays united and disputes are settled calmly. It also teaches compassion and sharing: family members support one another during illness, death or hardship, so nobody faces trouble alone.",
    hints: ["Each way needs a named attribute and what it achieves."],
    explanation: "Each way earns 1 mark for the idea and 1 for the developed explanation.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Suggest **two** ways a school could encourage Unhu among its pupils, and explain how each would help.",
    points: [
      "Suggests a practical activity, e.g. a peer-tutoring or buddy scheme for new pupils",
      "Explains how it builds an attribute, e.g. compassion and humility as stronger pupils help others",
      "Suggests a second activity, e.g. a community service day at a children's home or clinic",
      "Explains how it builds an attribute, e.g. sharing and oneness with the community",
    ],
    modelAnswer: "The school could start a buddy scheme in which older pupils help new pupils settle in; this builds compassion and humility because pupils learn to care for others rather than look down on them. It could also hold a community service day, for example cleaning a clinic yard or visiting a children's home, which teaches sharing and oneness with the wider community.",
    hints: ["Think of activities in which pupils must help or work with others."],
    explanation: "Credit any sensible activity linked to a named attribute of Unhu and explained.",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: source("Source A", "a short report in a fictional school newsletter from Chinhoyi, 2026",
      "When Form 2 pupil Tafadzwa lost his father in July, his classmates noticed he had stopped eating at break. Without being asked, they took turns sharing their lunch with him. The community service club collected money for his school fees, and two Form 4 pupils helped him catch up on missed work. His teacher said the class had shown the true meaning of Ubuntu.") +
      "\n\nRead Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "Which attribute of Unhu is shown when the classmates take turns giving Tafadzwa part of their lunch?",
        options: [
          ["sharing", "Correct: giving others part of what you have is sharing."],
          ["integrity", "Integrity is honesty when nobody is watching; this is about giving."],
          ["humility", "Humility is not boasting; the act described is giving food."],
          ["tolerance", "Tolerance is accepting difference; the classmates are giving food, not accepting a difference."],
        ],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** other actions in the source that show Unhu.",
        points: ["The community service club collecting money for his school fees", "Two Form 4 pupils helping him catch up on missed work"],
        modelAnswer: "The community service club collected money for his fees; two Form 4 pupils helped him catch up on work.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain how the pupils' actions might benefit Tafadzwa **and** the school community.",
        points: [
          "Tafadzwa: his basic needs (food, fees) are met so he can stay in school",
          "Tafadzwa: he feels supported and less alone in his grief",
          "School community: pupils learn compassion and oneness, which strengthens trust and unity among them",
        ],
        modelAnswer: "Tafadzwa's basic needs are met, so he can stay in school and keep learning. He also feels supported and less alone while he grieves. The school community benefits because pupils learn compassion and oneness, which builds trust and unity among them.",
      }),
    ],
    hints: ["In (c), give at least one benefit to Tafadzwa and one to the school as a whole."],
    explanation: "A source-based practice item: identify attributes in the account, then explain the benefits at more than one level.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "This question is about Unhu in modern Zimbabwe.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe **two** examples from modern life (in towns, at work or online) that show Unhu is still practised.",
        points: [
          ["Describes one example, e.g. burial societies or church groups supporting bereaved families with money and help", 2],
          ["Describes a second example, e.g. online fundraising for a sick neighbour's hospital bill, or workplace collections for colleagues", 2],
        ],
        modelAnswer: "In many towns, burial societies collect small monthly contributions and support members' families with money, food and help when someone dies. Online, people share appeals and contribute money for a neighbour's hospital bill, showing compassion and sharing with people they may never have met.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Unhu is dying out among young Zimbabweans.\" How far do you agree?",
        points: [
          ["For: individualism, urban life and media influence; some young people show less respect for elders or for others online", 2],
          ["For: decline of extended-family living and communal work in some areas", 2],
          ["Against: young people still volunteer, share and support each other (school clubs, youth groups, online fundraising, care for elderly relatives)", 2],
          ["Supported judgement, e.g. Unhu is changing its form rather than dying out", 2],
        ],
        levels: levels(8),
        modelAnswer: "Some evidence supports the statement. Urban life, the media and social media encourage individualism, and some young people show less respect for elders or insult others online. Fewer families live together in extended households, and communal work parties are less common in towns.\n\nHowever, there is strong evidence on the other side. Young people volunteer in school clubs and youth groups, share with classmates in need, care for elderly relatives and help raise money online for people who are ill. Many of these actions show compassion, sharing and oneness.\n\nOverall I disagree with the statement to a large extent. Unhu is not dying out; it is changing its form, from the village work party to the school club and the online appeal. Families, schools and communities still need to teach it, because the pressures against it are real.",
      }),
    ],
    hints: ["In (b), give evidence on both sides before you judge."],
    explanation: "A practice evaluative item: describe modern examples, then weigh the claim with evidence on both sides and a supported conclusion.",
  });

  b.card("DEFINITION", "Unhu / Ubuntu / Vumunhu", "Being human through others: a person's humanity is shown and completed through respectful, caring relationships with other people.");
  b.card("FACT", "What is the Ndebele word for Unhu?", "Ubuntu");
  b.card("FACT", "Name six attributes of Unhu.", "Any six of: respect, integrity, honesty, humility, tolerance, oneness, compassion, hospitality, sharing.");
  b.card("DEFINITION", "Integrity", "Being honest and consistent: doing what is right even when nobody is watching.");
  b.card("DEFINITION", "Hospitality", "Welcoming and caring for visitors and strangers, for example with food, water and a place to rest.");
  b.card("CONCEPT", "Why is Unhu important for national unity?", "It teaches tolerance and respect, so people of different languages, faiths, regions and views can live together peacefully.");
  b.card("CONCEPT", "Is Unhu the same as obeying elders?", "No. Respect for elders is part of Unhu, but so are honesty and justice; a person with Unhu politely refuses to do wrong.");
  b.card("FACT", "Give the Shona proverb that expresses Unhu.", "Munhu munhu nekuda kwevanhu: a person is a person because of other people.");
  b.card("CONCEPT", "How does Unhu act as a safety net in a community?", "Sharing and oneness mean neighbours support a household in need, for example during a funeral, illness or drought.");
});
