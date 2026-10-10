// W1a: functions of religion (frs.religion.functions).
import { concept, P, source, levels } from "../lib.mjs";

concept("frs.religion.functions", { file: "religion/functions", keyPrefix: "religion.functions" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In religious studies, what is meant by the **functions** of religion?",
    options: [
      ["What religion does, or is used to do, for individuals and society", "Correct: functions are the roles and effects of religion."],
      ["The ceremonies held at a place of worship on holy days of the year", "Those are rituals or festivals, one of the things religion does."],
      ["The set of rules that each state makes about religion in its own country", "That would be the law on religion, not its functions."],
      ["The list of scriptures that a religion has chosen to treat as its holy books", "That describes a canon of scripture, not functions."],
    ],
    answer: "A",
    explanation: "A **function** of religion is what it does for people and society, such as giving comfort, teaching morality or bringing people together.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A community follows zviera (taboos) that forbid cutting trees at a sacred grove. Which function of religion does this show?",
    options: [
      ["Social control, because beliefs and taboos discourage harmful behaviour", "Correct: taboos guide behaviour and protect shared resources."],
      ["Rites of passage, because the community is marking a change of life stage", "No change of life stage is being marked."],
      ["Welfare, because the community is giving food to the needy people nearby", "No help for the needy is mentioned."],
      ["Education, because the school is teaching children to read and to write", "The example is about community rules and not a school."],
    ],
    answer: "A",
    explanation: "Taboos are an example of **social control**: they discourage behaviour that harms people or the environment.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A mosque in Harare collects zakat and uses it to help families who cannot afford food. Which function of religion is **most** clearly shown?",
    options: [
      ["Welfare, meaning practical care for the needy", "Correct: zakat is a duty that supports people in need."],
      ["Legitimising the authority of a ruler or a government", "Nothing in the example concerns rulers or governments."],
      ["Marking a rite of passage such as marriage or initiation", "The example is about giving, not a life-stage ceremony."],
      ["Creating a conflict between two groups in the community", "Zakat is a form of help, not a cause of conflict."],
    ],
    answer: "A",
    explanation: "Religious groups often provide **welfare**. Zakat is one of the Five Pillars of Islam and is used to help people in need.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of these is a function of religion **for the individual**?",
    options: [
      ["Giving comfort and hope to a person who is grieving", "Correct: comfort in grief is an individual function."],
      ["Holding together the many families of a whole village", "That is social cohesion, a function for the community."],
      ["Supporting a ruler's claim to lead a country or a chiefdom", "That is legitimising authority, a function for the nation."],
      ["Running schools and clinics for the people of a district", "That is a service for the community, not the individual."],
    ],
    answer: "A",
    explanation: "For the individual, religion provides meaning, identity, comfort and moral guidance. For society it provides cohesion, control, welfare and more.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Sipho's family moves from a rural area to Bulawayo. At their new church they are welcomed, given food and introduced to other families. Which TWO functions of religion are shown most clearly?",
    options: [
      ["Belonging in a community, and welfare", "Correct: they are welcomed into a community and given practical help."],
      ["Fundamentalism and exploitation", "Nothing in the example shows strict intolerance or misuse of followers."],
      ["Social control and legitimising authority", "Neither rules for behaviour nor support for a ruler is described."],
      ["Conflict and resistance to change", "The example shows welcome and help, not conflict."],
    ],
    answer: "A",
    hints: ["What did the church give the family: a place, and what else?"],
    explanation: "Welcoming newcomers shows **identity and belonging**, and giving food shows **welfare**.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which statement gives the most balanced view of the functions of religion?",
    options: [
      ["Religion can comfort and guide people, but it can also be misused to divide", "Correct: it recognises both positive functions and negative effects."],
      ["Religion only ever helps people, and all of its effects on society are positive", "This ignores the cases in which religion is misused."],
      ["Religion is always harmful, because it divides people into groups against each other", "This ignores the many ways it helps, such as care for the needy."],
      ["Religion has no real effect on society, because beliefs are only private matters", "Religion clearly affects education, welfare, ceremonies and values."],
    ],
    answer: "A",
    hints: ["Look for the statement that gives both sides."],
    explanation: "A balanced answer includes positive functions (comfort, cohesion, welfare) and negative effects (conflict, exploitation, harmful practices) and notes that these depend on how religion is used.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A newspaper article describes a religious leader who tells followers to pay large sums of money for healing and warns that those who refuse will be cursed. Which negative effect of religion does the article illustrate?",
    options: [
      ["Exploitation of followers by a religious leader who demands money", "Correct: followers are pressed to give money, with a threat if they refuse."],
      ["Social cohesion among all the members of a faith", "Pressure to pay does not build unity; it harms followers."],
      ["A rite of passage that marks a change of life stage", "No life-stage ceremony is described."],
      ["Education provided by a religious body to its young members", "The article is about payment, not about teaching."],
    ],
    answer: "A",
    hints: ["Who gains in the situation described?"],
    explanation: "Using religious authority to take money by threats is **exploitation**. Many religious leaders and bodies condemn such behaviour, and it must not be taken as typical of a faith.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement about the **negative effects** of religion is best supported?",
    options: [
      ["They arise when some people misuse religion, not from a whole faith", "Correct: harm comes from how beliefs are used, and religions also teach against these harms."],
      ["They show that every religion is harmful, so none can help society in any way", "This ignores the many positive functions such as welfare and education."],
      ["They only happen in one religion, which is the cause of all conflict today", "No single religion is the cause of all harm, and conflicts have many causes."],
      ["They prove that no believer can ever hold a view that differs from the leader", "Believers can and do disagree with leaders."],
    ],
    answer: "A",
    hints: ["Is the problem the religion as a whole, or the way some people use it?"],
    explanation: "Negative effects (conflict, exploitation, harmful practices) are linked to how some people use religion. They do not describe a whole faith, and religions also condemn them.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A rite of passage is a ceremony that marks a change in a person's life, such as birth, marriage or death.",
    answer: true,
    explanation: "True. Religions mark life stages with ceremonies such as naming, initiation, baptism, marriage and funerals.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Saying that religion gives comfort to people who are grieving means that the beliefs it teaches must be true.",
    answer: false,
    explanation: "False. A function describes what religion does for people. It does not decide whether a belief is true or false.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each example with the function of religion it best shows.",
    pairs: [
      ["A congregation raises money for orphans in its district", "Welfare"],
      ["A funeral service with prayers for a bereaved family", "Comfort and a rite of passage"],
      ["Taboos that protect a river from being polluted", "Social control"],
      ["A village gathers for a rain ceremony", "Social cohesion"],
    ],
    explanation: "Care for orphans is welfare; funeral prayers give comfort and mark death as a rite of passage; taboos discourage harm (social control); a shared ceremony binds the community (cohesion).",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "The bonds that hold a society together are called social {{blank:a}}. Ways of encouraging people to follow the rules are called social {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["cohesion"], choices: ["cohesion", "control", "change", "welfare"] },
      { id: "b", accepted: ["control"], choices: ["control", "cohesion", "welfare", "mobility"] },
    ],
    explanation: "**Social cohesion** is unity and belonging; **social control** is the way rules are encouraged and harm discouraged.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What word describes a strict insistence on a narrow reading of a religion's teachings, sometimes with intolerance of other views?",
    accepted: ["fundamentalism"],
    wrong: ["cohesion", "tolerance"],
    explanation: "**Fundamentalism** is the term used for a strict, narrow reading of a religion's teachings. Writers use it differently, so define it when you use it.",
  });
  b.manualShort({
    d: 1, skill: "RECALL", marks: 3,
    stem: "State **three** functions of religion for individuals.",
    points: ["Gives meaning and purpose to life", "Gives comfort and hope in difficulty (e.g. in grief or illness)", "Any one of: identity and belonging; moral guidance; self-discipline and character"],
    modelAnswer: "Religion gives people meaning and purpose, comfort in times of grief or illness, and moral guidance about right and wrong.",
    explanation: "One mark for each function correctly stated.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways in which religion contributes to social cohesion.",
    points: [
      "Identifies: shared beliefs and rituals bring people together",
      "Develops: e.g. a village gathering for mukwerera, or a congregation worshipping together, creates a sense of belonging",
      "Identifies: religious bodies run activities that bring people of different families together",
      "Develops: e.g. a mosque or church programme for the needy, or a youth group, builds friendships and cooperation",
    ],
    modelAnswer: "Shared beliefs and rituals bring people together; for example, a village that gathers for mukwerera shares a common purpose and feels it belongs together. Religious bodies also run activities such as youth groups and care for the needy, which bring families together and build friendships and cooperation.",
    hints: ["Think about gatherings, shared worship and shared service."],
    explanation: "Two marks for each way: identify and develop.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Explain why a balanced description of the functions of religion must include negative effects as well as positive ones.",
    points: [
      "Religion has been used to cause harm, e.g. in conflict, exploitation of followers or harmful practices",
      "Giving only positive functions would be incomplete or unfair, as it ignores real cases of misuse",
      "Balance also shows that harm comes from how some people use religion, and that religions themselves teach against it",
      "Credits an example such as a leader who takes money from followers, or child marriage that is illegal in Zimbabwe",
    ],
    modelAnswer: "A balanced description must include negative effects, because religion has sometimes been used to cause harm, for example by leaders who take money from followers or by practices such as child marriage, which is illegal in Zimbabwe. Leaving these out would make the account incomplete. Balance also shows that the harm comes from how some people use religion, and that religions themselves teach against such misuse.",
    hints: ["Would an account with only good points be complete or fair?"],
    explanation: "Credit reasons for balance, supported by an example.",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: source("Source A", "a report in a fictional community newsletter, Masvingo, 2026",
      "After the floods, members of a local church, a mosque and a village group together cooked meals for families who had lost their homes. A church elder said, \"Our faiths teach us to look after our neighbours.\" The imam added that the work had helped families in the district to know each other better. A traditional leader thanked everyone for their work and reminded the volunteers to respect the river and the land.") +
      "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which function of religion is shown **most clearly** by the volunteers cooking meals for families who lost their homes?",
        options: [
          ["Welfare and care for those in need", "Correct: the groups gave practical help to people in difficulty."],
          ["Legitimising the authority of a ruler", "Nothing in the source supports a ruler."],
          ["Marking a rite of passage", "No life-stage ceremony is described."],
          ["Resistance to social change", "The volunteers acted to help, not to resist change."],
        ],
        answer: "A",
        explanation: "Cooking meals for families in need is **welfare**, a practical outcome of religious teaching about caring for others.",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** religious groups or traditions that worked together in Source A.",
        points: ["A church (Christians)", "A mosque (Muslims), or a traditional leader (Indigenous Religion)"],
        modelAnswer: "The church (Christians) and the mosque (Muslims).",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain how Source A shows that religion can strengthen unity in a district.",
        points: [
          "People of different faiths worked together for one purpose",
          "The imam says that the work helped families to know each other better",
          "Shared teaching about caring for neighbours gave them a common aim",
        ],
        modelAnswer: "People from a church, a mosque and a village group worked together to help families, which shows religion bringing different groups together. The imam says that families came to know each other better, and the shared teaching about caring for neighbours gave everyone a common aim.",
      }),
    ],
    hints: ["In (c), look at who worked together and what the imam says."],
    explanation: "A source showing welfare and cohesion across several faiths.",
  });
  b.struct({
    d: 4, skill: "EVALUATION",
    stem: "Answer the questions on the functions of religion.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe **two** ways in which religion helps the family.",
        points: [
          "Marks family milestones through rites of passage (e.g. naming, marriage, funerals)",
          "Developed with an example from a named religion",
          "Teaches values and moral guidance to children, or gives families a supportive community",
          "Developed with an example (e.g. Sunday school, madrasa classes or teaching by elders)",
        ],
        modelAnswer: "Religion marks important moments in family life, such as naming ceremonies, marriages and funerals, which bring relatives together. It also teaches children values such as honesty and respect, for example in Sunday school, madrasa classes or through teaching by elders.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Religion does more good than harm in society.\" Discuss, referring to more than one religion.",
        points: [
          ["Good: comfort, moral guidance, welfare, education and cohesion, with examples from more than one religion", 2],
          ["Harm: conflict, exploitation, fundamentalism or harmful practices, with at least one example", 2],
          ["Notes that harm arises from the misuse of religion by some, and religions often teach against it", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "In many respects religion does a great deal of good. Churches, mosques and Indigenous Religion communities offer comfort in grief, teach values such as honesty and respect, and help the needy: zakat supports poor families, church groups run feeding programmes, and elders keep communities together through ceremonies.\n\nHowever, religion can also be misused. Some leaders take money from followers, some groups refuse to listen to other views, and religion has been used to defend harmful practices such as child marriage. Disagreements between groups have sometimes added to conflict.\n\nThese harms usually come from how some people use religion, and religions themselves teach against them. On balance, I think religion does more good than harm, because its welfare, education and moral guidance reach so many people, but the harm is real and needs to be challenged.",
      }),
    ],
    hints: ["In (b), give examples from at least two religions on each side."],
    explanation: "Describe family functions (a) and discuss the overall effect of religion (b).",
  });

  b.card("DEFINITION", "Function of religion", "What religion does, or is used to do, for individuals and society.");
  b.card("DEFINITION", "Social cohesion", "The bonds that hold a society together, giving a sense of belonging and shared values.");
  b.card("DEFINITION", "Social control", "The ways a society encourages people to follow its rules and discourages harmful behaviour, for example through taboos and teachings.");
  b.card("FACT", "Name four functions of religion for the individual.", "Meaning and purpose, identity and belonging, comfort and hope, moral guidance (also self-discipline).");
  b.card("FACT", "Name four functions of religion for society.", "Social cohesion, social control, welfare, education (also health, rites of passage, legitimising authority, social change).");
  b.card("FACT", "Which pillar of Islam is an example of welfare?", "Zakat, giving to help people in need.");
  b.card("CONCEPT", "Why does a balanced answer include negative effects of religion?", "Because religion has also been misused, for example for exploitation, conflict or harmful practices; the harm comes from how some people use it, and religions teach against it.");
  b.card("CONCEPT", "How do zviera (taboos) act as social control?", "They discourage harmful behaviour and protect shared resources, such as sacred groves and rivers.");
  b.card("CONCEPT", "Does a function of religion show that its beliefs are true?", "No. A function describes what religion does for people. It does not decide whether any belief is true or false.");
});
