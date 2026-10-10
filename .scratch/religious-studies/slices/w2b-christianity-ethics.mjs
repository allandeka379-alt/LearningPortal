// W2b: Christian moral teaching.
import { concept, P, source, ref, levels } from "../lib.mjs";
import { mc, ms, pm } from "../tables/w2b-helpers.mjs";

concept("frs.christianity.ethics", { file: "christianity/ethics", keyPrefix: "christianity.ethics" }, (b) => {
  mc(b, 1, "RECALL", "Where are the Ten Commandments found?",
    ["Exodus 20:1-17", "Correct: they were given to Moses at Sinai."],
    [["Matthew 5:3-12", "This is the Beatitudes."],
     ["Genesis 1:28-31", "This is the creation of humankind."],
     ["Acts 2:1-4", "This is the coming of the Holy Spirit."]],
    "The Ten Commandments are in **Exodus 20:1-17** (also Deuteronomy 5).");
  mc(b, 2, "UNDERSTANDING", "What is the Golden Rule?",
    ["Do for others what you would want them to do for you", "Correct: Matthew 7:12 sums up how to treat others."],
    [["Rest from all ordinary work on the seventh day of each week", "That is the Sabbath commandment."],
     ["Pay one tenth of all income to the church", "That is tithing."],
     ["Pray at set times each day facing a holy city", "That is not the Golden Rule."]],
    "The **Golden Rule** (Matthew 7:12) says to treat others as you would want to be treated.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What does the Christian word agape mean?",
    ["Self-giving love for others", "Correct: it is the love taught by Jesus."],
    [["The fear of God's judgement", "Agape is love, not fear."],
     ["The rules of a church community", "Agape is not a set of rules."],
     ["The place where a church is built", "Agape is not a place."]],
    "**Agape** is self-giving love for God and for others.");
  mc(b, 3, "APPLICATION", "Tafadzwa returns a wallet he found to the headmistress, although nobody saw him find it. Which Christian principle is he following?",
    ["Honesty, from the commandment not to steal", "Correct: he respects the property of others."],
    [["Stewardship of the natural environment and its resources", "Stewardship concerns the care of creation."],
     ["Fasting during the weeks before the festival of Easter", "Fasting is not the principle involved."],
     ["Tithing a tenth of income to the church", "Tithing is giving a portion of income."]],
    "He is following **honesty** and the commandment against stealing (Exodus 20:15).", { hints: ["Which commandment is relevant to taking another person's money?"] });
  mc(b, 3, "APPLICATION", "A church in Hwange runs a feeding scheme for orphans and quotes the parable of the sheep and the goats. Which Christian teaching is it applying?",
    ["Care for the poor as service to Christ", "Correct: feeding the hungry is service to him."],
    [["The doctrine of purgatory", "Purgatory is about life after death."],
     ["The date of Easter", "The date of Easter is not the issue."],
     ["The decision at the Council of Jerusalem", "That concerned Gentile believers."]],
    "Matthew 25:31-46 teaches **care for the poor** as service to Christ.", { hints: ["Think of what Jesus says about feeding the hungry."] });
  mc(b, 3, "ANALYSIS", "Which statement about Christian moral teaching is accurate?",
    ["Christians share many principles but differ on some contested questions", "Correct: churches give different weight to Bible, tradition and conscience."],
    [["All Christians hold exactly the same view on every moral question in all churches", "Christians differ on some questions."],
     ["Christian morality has no connection with the Bible", "The Bible is a main source."],
     ["Christians believe that conscience should always be ignored", "Many Christians value conscience as a guide."]],
    "Christians share core principles (love, justice, honesty) but **differ** on some contested questions.", { hints: ["Look for an answer that allows both agreement and difference."] });
  mc(b, 4, "ANALYSIS", "Which reason best explains why the Christian teaching on forgiveness is important in Zimbabwean communities?",
    ["It can repair broken relationships between families and neighbours", "Correct: forgiveness and reconciliation restore trust."],
    [["It teaches that wrongdoers should never be held to account", "Forgiveness does not mean ignoring wrongdoing."],
     ["It forbids Christians from taking part in any community activity", "Christians are called to serve their communities."],
     ["It removes the need for churches to teach honesty or justice", "Forgiveness goes together with honesty and justice."]],
    "**Forgiveness** and reconciliation repair relationships; they do not remove justice or accountability.", { hints: ["Think of what forgiveness does between people."] });

  b.tf({ d: 1, skill: "RECALL", stem: "Jesus summed up the commandments as love of God and love of neighbour.", answer: true,
    explanation: "True. See Mark 12:28-34." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "All Christian churches give the same weight to the Bible, tradition and conscience.", answer: false,
    explanation: "False. Catholics and Orthodox give weight to Church tradition and teaching; many Protestants emphasise the Bible; many stress conscience." });

  b.match({ d: 3, skill: "UNDERSTANDING",
    stem: "Match each teaching with its reference.",
    pairs: [["Golden Rule", "Matthew 7:12"], ["Ten Commandments", "Exodus 20:1-17"], ["Greatest commandment", "Mark 12:28-34"], ["Sheep and goats", "Matthew 25:31-46"]],
    hints: ["Think of the Sermon on the Mount, Sinai, the question about the first commandment and the last judgement."],
    explanation: "Golden Rule: Matthew 7:12. Ten Commandments: Exodus 20. Greatest commandment: Mark 12. Sheep and goats: Matthew 25." });

  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct words.",
    template: "The idea that humans are trusted to care for creation is called {{blank:a}}, and the inner sense of right and wrong is called {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["stewardship"], choices: ["stewardship", "schism", "liturgy", "atonement"] }, { id: "b", accepted: ["conscience"], choices: ["conscience", "creed", "canon", "covenant"] }],
    explanation: "**Stewardship** is care of creation; **conscience** is the inner sense of right and wrong." });
  b.fib({ d: 3, skill: "UNDERSTANDING", stem: "Choose the correct words.",
    template: "The prophet {{blank:a}} called for justice to flow like a river, and the letter of {{blank:b}} says that faith without good deeds is dead.",
    blanks: [{ id: "a", accepted: ["Amos"], choices: ["Amos", "Jonah", "Joshua", "Samuel"] }, { id: "b", accepted: ["James"], choices: ["James", "Jude", "Philemon", "Titus"] }],
    hints: ["The first is in a short Old Testament book of justice; the second is in a New Testament letter."],
    explanation: "**Amos** 5:24 and the letter of **James** 2:14-17." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the prayer in which Christians ask God to forgive them as they forgive others.",
    accepted: ["Lord's Prayer", "The Lord's Prayer", "Our Father"], wrong: ["Hail Mary", "Creed"],
    explanation: "The **Lord's Prayer** (Matthew 6:9-13) includes a request for forgiveness." });

  ms(b, 3, "UNDERSTANDING", 3, "State **three** sources of Christian moral teaching.",
    ["The Bible", "The teaching and example of Jesus", "The Church and its tradition", "Conscience guided by prayer and the Holy Spirit"],
    "Christians find moral guidance in the Bible, in the teaching and example of Jesus, and in the teaching of the Church or their conscience.",
    "One mark for each source, to a maximum of three.", ["Think of scripture, Jesus, Church and conscience."]);
  ms(b, 3, "UNDERSTANDING", 4, "Describe how the Ten Commandments are divided and give an example from each part.",
    [["The first group concerns duties to God", 1], ["Example: have no other gods, keep the Sabbath", 1], ["The second group concerns duties to other people", 1], ["Example: honour parents, do not murder, steal or give false evidence", 1]],
    "The first group of commandments concerns duties to God, for example having no other gods and keeping the Sabbath. The second group concerns duties to other people, for example honouring parents and not murdering or stealing.",
    "One mark for each point.", ["Name the two groups, then give an example of each."]);
  ms(b, 4, "ANALYSIS", 6, "Explain **two** reasons why Christians care for the poor.",
    [["Jesus taught that serving the needy is serving him (Matthew 25:31-46)", 1], ["Developed: Christians believe that feeding the hungry and visiting the sick is service to Christ himself, so charity is part of worship", 2], ["The prophets and James call for justice and say that faith needs deeds", 1], ["Developed: faith that does not help others is empty, so churches run schools, clinics and feeding schemes", 2]],
    "Christians care for the poor because Jesus taught that serving the needy is serving him: feeding the hungry and visiting the sick is service to Christ himself, so charity is part of worship. The prophets and the letter of James also say that faith needs good deeds, so churches run schools, clinics and feeding schemes.",
    "Two reasons, each stated and developed.", ["One reason from Jesus' teaching, one from the prophets and James."]);

  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "a letter in a fictional school magazine in Bindura, 2026",
      "Our class found that a classmate had lost his bus fare. We had to decide whether to ignore him or to help. We remembered the saying that we should treat others as we would want to be treated. Together we collected enough money. A friend who quarrelled with him last week also apologised, and the quarrel ended."
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({ label: "(a)", stem: "Which Christian teaching is described in the saying about treating others as we would want to be treated?",
        options: [["The Golden Rule", "Correct: Matthew 7:12."], ["The Lord's Prayer", "The Lord's Prayer is a prayer."], ["The Beatitudes", "These are blessings in the Sermon on the Mount."], ["The Nicene Creed", "This is a statement of belief."]],
        answer: "A", explanation: "The saying is the Golden Rule, Matthew 7:12." }),
      P.manual({ label: "(b)", marks: 3, stem: "Using Source A, state **three** things the pupils did.",
        points: ["They decided to help instead of ignoring their classmate", "They collected enough money for the bus fare", "A friend apologised and the quarrel ended"],
        modelAnswer: "The pupils decided to help instead of ignoring their classmate, collected enough money for his bus fare, and one friend apologised so that the quarrel ended." }),
      P.manual({ label: "(c)", marks: 4, stem: "Explain how Christian teaching could support the pupils' actions.",
        points: [["The Golden Rule asks Christians to treat others as they would want to be treated", 1], ["The parable of the Good Samaritan shows that anyone in need is a neighbour", 1], ["Jesus taught care for the needy (Matthew 25)", 1], ["Forgiveness and apology repair broken relationships", 1]],
        modelAnswer: "The Golden Rule asks Christians to treat others as they would want to be treated, and the parable of the Good Samaritan shows that anyone in need is a neighbour. Jesus taught care for the needy, and forgiveness and apology repair broken relationships." }),
    ],
    hints: ["In (c) link the actions to the Golden Rule, the Good Samaritan and forgiveness."],
    explanation: "Source A is a modern application of love and forgiveness." });
  b.struct({ d: 4, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "Nyasha says: \"Christians should only follow what the Bible says, not conscience.\" Tendai replies: \"Conscience, guided by prayer, is also a source of Christian morality.\"",
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Outline **two** teachings of Jesus about how Christians should treat others.",
        points: [["Love your neighbour as yourself (Mark 12:31)", 1], ["Love your enemies (Matthew 5:43-48)", 1], ["Treat others as you would want to be treated (Matthew 7:12)", 1], ["Forgive again and again (Matthew 18:21-35)", 1]],
        modelAnswer: "Jesus taught that Christians should love their neighbour as themselves. He also taught that they should treat others as they would want to be treated." }),
      P.manual({ label: "(b)", marks: 4, stem: "Explain the importance of conscience in Christian decision-making.",
        points: [["Conscience is the inner sense of right and wrong that many Christians believe God has given", 2], ["It helps believers apply the Bible to new situations, though it must be informed by scripture, prayer and the Church", 2]],
        modelAnswer: "Conscience is the inner sense of right and wrong that many Christians believe God has given. It helps believers apply the Bible to new situations, though it must be informed by scripture, prayer and the teaching of the Church." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 220 }, stem: "Assess the view that the Bible is the only reliable guide for Christian behaviour.",
        points: [["For: the Bible contains the commandments and the teaching of Jesus, and is the source of authority for many Christians", 2], ["Against: the Bible does not speak directly about every modern issue; Christians use church teaching, tradition, conscience and reason as well", 2], ["A supported judgement", 2]],
        levels: levels(6),
        modelAnswer: "The Bible contains the commandments and the teaching of Jesus, and many Christians treat it as the main authority. However, it does not speak directly to every modern issue, so Christians also use church teaching, tradition, conscience and reason. On balance the Bible is the foundation for most Christians, but they apply it with the help of other sources." }),
    ],
    hints: ["Give the case for the Bible alone, the case for other sources, then judge."],
    explanation: "A balanced answer shows the Bible as a main source, used with others." });

  b.card("DEFINITION", "What is **agape**?", "Self-giving love that seeks the good of others, the love taught by Jesus.");
  b.card("DEFINITION", "What is **stewardship**?", "The idea that humans are trusted by God to care for creation, resources and their own gifts.");
  b.card("FACT", "Where are the Ten Commandments?", "Exodus 20:1-17 (also Deuteronomy 5).");
  b.card("FACT", "Where is the Golden Rule?", "Matthew 7:12: treat others as you would want them to treat you.");
  b.card("FACT", "What are four sources of Christian moral teaching?", "The Bible, the teaching of Jesus, the Church and tradition, and conscience.");
  b.card("FACT", "What does Matthew 25:31-46 teach?", "That serving the hungry, the stranger and the sick is service to Christ himself.");
  b.card("FACT", "Which two prophets call for justice, and where?", "Amos (5:24) and Micah (6:8).");
  b.card("CONCEPT", "Why is forgiveness central to Christian ethics?", "Jesus taught forgiveness again and again; Christians ask God to forgive them as they forgive others, and forgiveness repairs relationships.");
  b.card("CONCEPT", "How do Christians differ in applying moral teaching?", "They share core principles such as love and justice but give different weight to the Bible, tradition and conscience, and differ on some contested questions.");
});
