// W2b: the Bible.
// Reviewer notes: book counts are standard (Protestant 66 = 39 + 27; Catholic 73 = 46 + 27). The Orthodox canon varies by church and is not counted.
import { concept, P, source, ref, levels } from "../lib.mjs";
import { mc, ms, pm } from "../tables/w2b-helpers.mjs";

concept("frs.christianity.bible", { file: "christianity/bible", keyPrefix: "christianity.bible" }, (b) => {
  mc(b, 1, "RECALL", "How many books are in the New Testament?",
    ["27", "Correct: the New Testament has 27 books, from Matthew to Revelation."],
    [["39", "Thirty-nine is the number of books in the Protestant Old Testament."],
     ["66", "Sixty-six is the total for the Protestant Bible."],
     ["12", "Twelve is the number of books of history in the Old Testament."]],
    "The New Testament has **27** books, from Matthew to Revelation.");
  mc(b, 2, "UNDERSTANDING", "Which of these is a book of the Old Testament law (Pentateuch)?",
    ["Deuteronomy", "Correct: Genesis to Deuteronomy are the five books of the Law."],
    [["The letter to the Romans", "Romans is a letter in the New Testament."],
     ["Isaiah", "Isaiah is one of the prophets."],
     ["Acts", "Acts is the New Testament history of the early Church."]],
    "The **Pentateuch** (Law) is Genesis, Exodus, Leviticus, Numbers and **Deuteronomy**.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What is the canon of the Bible?",
    ["The list of books accepted as scripture", "Correct: the word means a rule or measure."],
    [["A translation of the Bible into a local language", "That is a version, not the canon."],
     ["A prayer said before reading the Bible aloud", "That is not what canon means."],
     ["The main hymn book used by one congregation", "That is a hymnal."]],
    "The **canon** is the list of books accepted as scripture by a community.");
  mc(b, 3, "APPLICATION", "Chipo notices that her Catholic friend's Bible has Tobit and Wisdom, which her Methodist Bible does not. Which explains this?",
    ["Catholic Bibles include deuterocanonical books that Protestants call the Apocrypha", "Correct: the Old Testament canon differs between churches."],
    [["Protestants have removed these books because they were written recently", "Reasons for the difference relate to which canon each church accepts."],
     ["Catholics have added these books to the New Testament", "They belong to the Old Testament."],
     ["The Methodist Bible is only a short summary of the Catholic Bible", "Both are full Bibles."]],
    "The Catholic Bible includes the **deuterocanonical** books; Protestants call them the **Apocrypha**.", { hints: ["The difference is in the Old Testament, not the New."] });
  mc(b, 3, "APPLICATION", "In a church in Masvingo, the preacher reads the story of the Good Samaritan, explains it and then asks members to help a neighbour. Which use of the Bible is this?",
    ["Reading in worship, followed by application to daily life", "Correct: the Bible is read, explained and put into practice."],
    [["Translation of the text into a new language", "Nothing is being translated."],
     ["Choosing which books belong to the canon", "The canon was decided long ago."],
     ["Debating the number of books in the Old Testament", "The number of books is not the subject here."]],
    "Reading in worship, a sermon and practical action show how Christians **use the Bible** in worship and daily life.", { hints: ["Look at what happens after the reading."] });
  mc(b, 3, "ANALYSIS", "Which statement about the way Christians read the Bible is accurate?",
    ["Some read it literally and others read it in context as teaching", "Correct: both approaches exist among Christians."],
    [["All Christians read every passage in exactly the same literal way", "Christians differ in how they read scripture."],
     ["No Christians treat the Bible as inspired by God", "Christians generally believe it is inspired."],
     ["Christians have never discussed how the Bible should be interpreted", "Interpretation is widely discussed."]],
    "Christians believe the Bible is inspired but differ over **literal** and **contextual** reading.", { hints: ["Choose the option that allows for different views."] });
  mc(b, 4, "ANALYSIS", "Which reason best explains why translating the Bible into Shona and Ndebele matters?",
    ["People can read and hear scripture in their mother tongue and interpret it themselves", "Correct: translation supports understanding and literacy."],
    [["It makes it unnecessary for Christians to meet together for public worship", "Christians still meet to worship, and the Bible is read in worship."],
     ["It removes all differences of interpretation and teaching between the churches", "Differences remain even with translations."],
     ["It proves that one language is more sacred to God than all the others", "Christianity does not treat one language as sacred in that way."]],
    "Translation allows people to read and hear scripture in their **mother tongue** and to interpret it for themselves; it also supported literacy.", { hints: ["Think of access and understanding."] });

  b.tf({ d: 1, skill: "RECALL", stem: "The Protestant Bible has 66 books.", answer: true,
    explanation: "True. 39 are in the Old Testament and 27 in the New Testament." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "The Old Testament was written mainly in Greek and the New Testament mainly in Hebrew.", answer: false,
    explanation: "False. The Old Testament was written mainly in Hebrew and the New Testament in Greek." });

  b.match({ d: 3, skill: "UNDERSTANDING",
    stem: "Match each group of books with an example.",
    pairs: [["The Law (Pentateuch)", "Genesis"], ["Wisdom and poetry", "Psalms"], ["The Gospels", "Luke"], ["The letters", "Romans"]],
    hints: ["Think of the first book, a book of songs, a life of Jesus and a letter of Paul."],
    explanation: "Genesis is Law. Psalms is poetry. Luke is a Gospel. Romans is a letter of Paul." });

  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct words.",
    template: "The Old Testament was written mainly in {{blank:a}} and the New Testament in {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["Hebrew"], choices: ["Hebrew", "Greek", "Latin", "Arabic"] }, { id: "b", accepted: ["Greek"], choices: ["Greek", "Hebrew", "Aramaic only", "Shona"] }],
    explanation: "Old Testament: **Hebrew**. New Testament: **Greek**." });
  b.fib({ d: 3, skill: "UNDERSTANDING", stem: "Choose the correct words.",
    template: "The Catholic Bible has {{blank:a}} books, and the extra Old Testament books are called {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["73"], choices: ["27", "39", "66", "73"] }, { id: "b", accepted: ["deuterocanonical"], choices: ["deuterocanonical", "epistles", "gospels", "pentateuch"] }],
    hints: ["The Protestant Bible has 66; the Catholic Bible has seven more."],
    explanation: "The Catholic Bible has **73** books, including the **deuterocanonical** books." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the last book of the Bible.",
    accepted: ["Revelation", "The Book of Revelation", "Revelation of John", "Apocalypse"], wrong: ["Malachi", "Jude"],
    explanation: "**Revelation** is the last book of the New Testament and of the Bible." });

  ms(b, 3, "UNDERSTANDING", 3, "State **three** ways in which Christians use the Bible.",
    ["It is read aloud and explained in worship", "It is studied in Bible study groups and Sunday schools", "Individuals read it daily and learn verses by heart", "It is used in baptism, weddings and funerals", "Believers look to it for guidance in decisions"],
    "Christians read and explain the Bible in worship, study it in Bible study groups and Sunday schools, and read it daily for guidance in their decisions.",
    "One mark for each way, to a maximum of three.", ["Think of worship, study and daily life."]);
  ms(b, 3, "UNDERSTANDING", 4, "Describe the structure of the New Testament.",
    [["It has 27 books", 1], ["The four Gospels tell the story of Jesus", 1], ["Acts tells of the early Church", 1], ["The letters give advice to the churches, and Revelation uses symbols about the end of time", 1]],
    "The New Testament has 27 books. The four Gospels tell the story of Jesus, Acts tells of the early Church, the letters give advice to the churches, and Revelation uses symbols to speak about the end of time.",
    "One mark for each point.", ["Name the groups of books in order."]);
  ms(b, 4, "ANALYSIS", 6, "Explain **two** reasons why Bible translation is important to Christians.",
    [["People can understand the scriptures in their own language", 1], ["Developed: they can read and hear the Bible in their mother tongue in worship and at home, so the faith feels close to their culture", 2], ["It supports literacy and learning", 1], ["Developed: Bible translation led to the writing of languages and to schools, so people learned to read and write", 2]],
    "Translation matters because people can understand the scriptures in their own language: they can read and hear the Bible in their mother tongue in worship and at home. It also supports literacy and learning, since Bible translation led to the writing of languages and to schools where people learned to read and write.",
    "Two reasons, each stated and developed.", ["One reason about understanding, one about literacy."]);

  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "a notice from a fictional Bible study group in Gweru, 2026",
      "Tuesday evening Bible study. This week we read one of the Gospels (Mark) and one of the letters (Romans). Bring your Bible in any language. Members who use Catholic Bibles may like to share how their canon differs. Everyone is welcome."
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({ label: "(a)", stem: "Which of the books in Source A is a Gospel?",
        options: [["Mark", "Correct: Mark is one of the four Gospels."], ["Romans", "Romans is a letter."], ["Genesis", "Genesis is in the Old Testament, and it is not mentioned in Source A."], ["Psalms", "Psalms is in the Old Testament and is not mentioned in Source A."]],
        answer: "A", explanation: "Mark is one of the four Gospels. Romans is a letter of Paul." }),
      pm({ label: "(b)", marks: 3, stem: "Using Source A, state **three** things about the Bible study group.",
        points: ["It meets on Tuesday evening", "It reads a Gospel (Mark) and a letter (Romans)", "Members may bring a Bible in any language, or Catholic members may share how their canon differs"],
        modelAnswer: "Source A says that the group meets on Tuesday evening, reads Mark and Romans, and welcomes Bibles in any language, including Catholic Bibles." }),
      pm({ label: "(c)", marks: 4, stem: "Explain why Christians meet to study the Bible together.",
        points: [["To understand the meaning of difficult passages through discussion", 1], ["To learn how to apply the teaching to daily life", 1], ["To grow in faith and pray together", 1], ["To build fellowship and support in the church", 1]],
        modelAnswer: "Christians study the Bible together to understand the meaning of difficult passages through discussion and to learn how to apply the teaching to daily life. They also grow in faith through prayer and build fellowship and support in the church." }),
    ],
    hints: ["In (c) think of understanding, application and fellowship."],
    explanation: "Source A describes a study group; (c) asks why Christians study together." });
  b.struct({ d: 4, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "Tatenda says: \"The Bible must be read word for word, exactly as it is written.\" Thandeka replies: \"It has to be read in its context, and the meaning drawn out.\"",
    parts: [
      pm({ label: "(a)", marks: 4, stem: "Outline **two** groups of books in the Old Testament.",
        points: [["The Law (Genesis to Deuteronomy)", 1], ["History (for example Joshua, Judges, Kings)", 1], ["Wisdom and poetry (for example Psalms and Proverbs)", 1], ["The Prophets (for example Isaiah and Jeremiah)", 1]],
        modelAnswer: "The Law consists of the first five books, Genesis to Deuteronomy. The Prophets include books such as Isaiah and Jeremiah, who called the people back to God and to justice." }),
      pm({ label: "(b)", marks: 4, stem: "Explain what Christians mean when they say that the Bible is inspired.",
        points: [["They believe that God guided the human writers of scripture", 2], ["Therefore it is a source of authority for belief and conduct, though they differ on how far the human writers' context matters", 2]],
        modelAnswer: "Christians mean that God guided the human writers of scripture. Because of this the Bible is a source of authority for belief and conduct, although Christians differ on how far the human writers' language and context should shape the way it is read." }),
      pm({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 220 }, stem: "Assess the view that the Bible should be read literally.",
        points: [["For: literal reading respects the text as the word of God and gives clear authority", 2], ["Against: the Bible has poetry, parables and history, written in context, so meaning requires interpretation; Christians themselves differ", 2], ["A supported judgement", 2]],
        levels: levels(6),
        modelAnswer: "A literal reading respects the Bible as the word of God and gives clear authority to its teaching. However, the Bible contains poetry, parables and history written in particular contexts, so reading it requires interpretation, and Christians themselves differ. On balance most Christians read some passages literally and others according to their form and context." }),
    ],
    hints: ["Give the case for literal reading, the case for interpretation, then judge."],
    explanation: "A balanced answer recognises that Christians differ and weighs both approaches." });

  b.card("DEFINITION", "What is the **canon** of the Bible?", "The list of books accepted as scripture by a religious community.");
  b.card("DEFINITION", "What are the **deuterocanonical books**?", "Extra Old Testament books accepted by Catholics and Orthodox (for example Tobit, Wisdom, 1 Maccabees); Protestants call them the Apocrypha.");
  b.card("FACT", "How many books are in the Protestant Bible?", "66: 39 in the Old Testament and 27 in the New Testament.");
  b.card("FACT", "How many books are in the Catholic Bible?", "73, including the deuterocanonical books.");
  b.card("FACT", "What are the four Gospels?", "Matthew, Mark, Luke and John.");
  b.card("FACT", "In which languages were the Testaments mainly written?", "Old Testament: Hebrew. New Testament: Greek.");
  b.card("FACT", "What is the Pentateuch?", "The first five books of the Bible: Genesis, Exodus, Leviticus, Numbers, Deuteronomy.");
  b.card("CONCEPT", "Why does translation matter?", "People can read and hear scripture in their mother tongue, and translation supported literacy.");
  b.card("CONCEPT", "How do Christians differ in reading the Bible?", "Some read it literally; others read it in context, treating poetry and parables symbolically.");
});
