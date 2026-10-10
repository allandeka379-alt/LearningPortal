// W2b: Christian festivals and sacred days.
import { concept, P, source, ref, levels } from "../lib.mjs";
import { mc, ms, pm } from "../tables/w2b-helpers.mjs";

concept("frs.christianity.festivals", { file: "christianity/festivals", keyPrefix: "christianity.festivals" }, (b) => {
  mc(b, 1, "RECALL", "Which festival celebrates the resurrection of Jesus?",
    ["Easter", "Correct: Easter Sunday is the greatest Christian festival."],
    [["Christmas", "Christmas celebrates the birth of Jesus."],
     ["Pentecost", "Pentecost remembers the coming of the Holy Spirit."],
     ["Epiphany", "Epiphany remembers the visit of the wise men."]],
    "**Easter** celebrates the resurrection of Jesus.");
  mc(b, 2, "UNDERSTANDING", "How many days after Easter is Pentecost?",
    ["Fifty", "Correct: the word Pentecost comes from the Greek for fiftieth."],
    [["Forty", "Forty days after Easter is Ascension."],
     ["Seven", "Seven days after Easter is the Sunday after Easter."],
     ["Three", "Three days is the time between Good Friday and Easter Sunday."]],
    "**Pentecost** is fifty days after Easter; **Ascension** is forty days after Easter.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which Christians keep Saturday as the Sabbath?",
    ["Seventh-day Adventists", "Correct: they follow the commandment in Exodus 20:8-11."],
    [["Most Catholics in Zimbabwe", "Catholics worship on Sunday."],
     ["Methodists", "Methodists worship on Sunday."],
     ["Anglicans", "Anglicans worship on Sunday."]],
    "**Seventh-day Adventists** keep Saturday as the Sabbath. Most other Christians worship on Sunday.");
  mc(b, 3, "APPLICATION", "On a Wednesday in February, Sipho's church marks a cross in ashes on each forehead, a sign of sorrow for sin. Which day is this?",
    ["Ash Wednesday", "Correct: it marks the beginning of Lent."],
    [["Maundy Thursday", "This is the Thursday before Easter."],
     ["Good Friday", "This is the day of the crucifixion."],
     ["Palm Sunday", "This is the Sunday before Easter."]],
    "**Ash Wednesday** begins Lent, a time of prayer, fasting and repentance.", { hints: ["Which day begins the forty days of Lent?"] });
  mc(b, 3, "APPLICATION", "In a Harare church, worshippers carry palm branches and sing as they enter. Which event are they remembering?",
    ["Jesus entering Jerusalem on a donkey", "Correct: this is Palm Sunday (Mark 11:1-11)."],
    [["The coming of the Holy Spirit on the disciples", "That is Pentecost."],
     ["The visit of the wise men to the child", "That is Epiphany."],
     ["The raising of Jesus from the tomb", "That is Easter."]],
    "**Palm Sunday** remembers the entry into Jerusalem (Mark 11:1-11).", { hints: ["Palm branches were spread in front of Jesus."] });
  mc(b, 3, "ANALYSIS", "Which statement about the date of Christmas is accurate?",
    ["25 December was chosen by the Church; the Bible gives no birth date", "Correct: the date is a matter of Church tradition."],
    [["The Gospels state that Jesus was born on the day of 25 December", "The Gospels give no date."],
     ["All churches celebrate Christmas on exactly the same day each year", "Some Orthodox churches celebrate in January."],
     ["Christmas is the most important Christian festival of the year", "Easter is the most important."]],
    "The date of **25 December** was chosen by the Church; the Bible does not give a date.", { hints: ["Think of what the Gospels say about the date."] });
  mc(b, 4, "ANALYSIS", "Which reason best explains why Easter is more important to most Christians than Christmas?",
    ["The resurrection is the centre of the faith and gives hope of life after death", "Correct: the faith rests on the resurrection."],
    [["Easter is a public holiday in Zimbabwe and Christmas is not one", "Both Easter and Christmas are public holidays."],
     ["The Gospels say very little about the death and rising of Jesus at all", "The Gospels give much space to the last week."],
     ["Christmas is not mentioned anywhere at all in the New Testament", "The birth is told in Matthew and Luke."]],
    "Easter is central because Christians believe the **resurrection** is the centre of their faith and gives hope of life after death.", { hints: ["Think of what Christians believe the resurrection shows."] });

  b.tf({ d: 1, skill: "RECALL", stem: "Lent is the period of forty days before Easter, beginning on Ash Wednesday.", answer: true,
    explanation: "True. Lent is a time of prayer, fasting and repentance (Sundays are not counted)." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Ascension remembers the coming of the Holy Spirit on the disciples.", answer: false,
    explanation: "False. Ascension remembers Jesus being taken into heaven (Acts 1:9-11). The coming of the Spirit is Pentecost." });

  b.match({ d: 3, skill: "UNDERSTANDING",
    stem: "Match each festival with what Christians remember.",
    pairs: [["Christmas", "the birth of Jesus"], ["Good Friday", "the crucifixion of Jesus"], ["Ascension", "Jesus taken up into heaven"], ["Pentecost", "the coming of the Holy Spirit"]],
    hints: ["Think of birth, death, heaven and the Spirit."],
    explanation: "Christmas: birth. Good Friday: crucifixion. Ascension: heaven. Pentecost: Spirit." });

  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct words.",
    template: "Most Christians worship on {{blank:a}}, the {{blank:b}}, remembering the resurrection.",
    blanks: [{ id: "a", accepted: ["Sunday"], choices: ["Sunday", "Saturday", "Friday", "Monday"] }, { id: "b", accepted: ["Lord's Day"], choices: ["Lord's Day", "Sabbath", "Passover", "Epiphany"] }],
    explanation: "Christians worship on **Sunday**, the **Lord's Day**." });
  b.fib({ d: 3, skill: "UNDERSTANDING", stem: "Choose the correct words.",
    template: "The four Sundays before Christmas make up the season of {{blank:a}}, and the festival on 6 January that remembers the visit of the wise men is {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["Advent"], choices: ["Advent", "Lent", "Easter", "Pentecost"] }, { id: "b", accepted: ["Epiphany"], choices: ["Epiphany", "Ascension", "Pentecost", "Good Friday"] }],
    hints: ["The first is a season of waiting; the second means showing."],
    explanation: "**Advent** prepares for Christmas; **Epiphany** is on 6 January." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the Thursday before Easter on which Christians remember the Last Supper.",
    accepted: ["Maundy Thursday", "Holy Thursday", "Maundy"], wrong: ["Good Friday", "Ash Wednesday"],
    explanation: "**Maundy Thursday** (Holy Thursday) remembers the Last Supper." });

  ms(b, 3, "UNDERSTANDING", 3, "State **three** ways in which Christians observe Lent.",
    ["Fasting or giving up something", "More prayer and Bible reading", "Giving to the poor", "Repenting of sin and attending extra services", "Marking the forehead with ashes on Ash Wednesday"],
    "During Lent Christians fast or give up something, pray and read the Bible more, and give to the poor.",
    "One mark for each way, to a maximum of three.", ["Think of fasting, prayer and giving."]);
  ms(b, 3, "UNDERSTANDING", 4, "Describe how Christians observe Good Friday.",
    [["They remember the trial and crucifixion of Jesus", 1], ["Services are solemn, often with readings of the Passion account", 1], ["Many fast or follow the stations of the cross", 1], ["Some churches remove decorations or venerate the cross; many hold open-air services", 1]],
    "On Good Friday Christians remember the trial and crucifixion of Jesus. Services are solemn, with readings of the account of his death, and many fast or follow the stations of the cross. Some churches venerate the cross, and many hold open-air services.",
    "One mark for each point.", ["Describe the event remembered and what believers do."]);
  ms(b, 4, "ANALYSIS", 6, "Explain **two** reasons why Easter is the most important Christian festival.",
    [["It celebrates the resurrection, which is the central Christian belief", 1], ["Developed: Christians believe it shows victory over death and that Jesus is the Son of God, so their faith rests on it", 2], ["It gives hope of life after death and forgiveness", 1], ["Developed: the resurrection assures believers of eternal life, which comforts them in sorrow and shapes how they live", 2]],
    "Easter is the most important festival because it celebrates the resurrection, the central Christian belief. Christians believe it shows victory over death and that Jesus is the Son of God, so their faith rests on it. It also gives hope of life after death and forgiveness, which comforts believers in sorrow and shapes how they live.",
    "Two reasons, each stated and developed.", ["One reason about belief, one about hope."]);

  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "a notice in a fictional parish bulletin in Mutare, 2026",
      "Holy Week. Palm Sunday: procession with branches at 9 a.m. Maundy Thursday: Holy Communion at 6 p.m. Good Friday: reading of the passion and silent prayer at noon. Easter Sunday: dawn service at 5 a.m. with the lighting of candles. Our Easter gathering will be held on the open field behind the church."
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({ label: "(a)", stem: "According to Source A, what happens on Maundy Thursday?",
        options: [["Holy Communion is celebrated", "Correct: Source A says so."], ["A dawn service is held", "That is Easter Sunday."], ["A procession with branches takes place", "That is Palm Sunday."], ["There is silent prayer at noon", "That is Good Friday."]],
        answer: "A", explanation: "Source A says Holy Communion is celebrated on Maundy Thursday." }),
      P.manual({ label: "(b)", marks: 3, stem: "Using Source A, state **three** events of Holy Week that the parish observes.",
        points: ["Palm Sunday procession with branches", "Holy Communion on Maundy Thursday", "Reading of the passion on Good Friday, or the dawn service on Easter Sunday"],
        modelAnswer: "The parish holds a procession with branches on Palm Sunday, celebrates Holy Communion on Maundy Thursday, and reads the account of the passion on Good Friday before the dawn service on Easter Sunday." }),
      P.manual({ label: "(c)", marks: 4, stem: "Explain why the Easter service is held at dawn.",
        points: [["The Gospels say the women found the tomb empty early on the first day of the week", 1], ["Dawn symbolises new life and light after darkness", 1], ["The lighting of candles shows Christ as the light of the world", 1], ["It expresses the joy of the resurrection after the sorrow of Good Friday", 1]],
        modelAnswer: "The Gospels say that the women found the tomb empty early on the first day of the week, so a dawn service recalls that moment. Dawn symbolises new life and light after darkness, and the candles show Christ as the light of the world, expressing the joy of the resurrection after the sorrow of Good Friday." }),
    ],
    hints: ["In (c) think of the Gospel account, light and joy."],
    explanation: "Source A is a Holy Week programme; (c) asks about dawn." });
  b.struct({ d: 4, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "Chipo says: \"Christmas has become more about shopping than about faith.\" Her grandmother, a church elder, says that Christmas services and family gatherings keep its meaning alive.",
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Outline **two** ways in which Christians celebrate Christmas in Zimbabwe.",
        points: [["Attending special church services with carols and nativity plays", 1], ["Gathering with the extended family at the home", 1], ["Sharing a meal and visiting neighbours", 1], ["Giving gifts or food to those in need", 1]],
        modelAnswer: "Christians attend special church services with carols and nativity plays. Families also gather at the rural home and share a meal." }),
      P.manual({ label: "(b)", marks: 4, stem: "Explain why Christians celebrate the birth of Jesus.",
        points: [["They believe God became human in Jesus (the incarnation)", 2], ["It is the start of the Gospel story, which brings hope, joy and God's gift of salvation", 2]],
        modelAnswer: "Christians celebrate the birth of Jesus because they believe that God became human in him, which is the incarnation. It is also the start of the Gospel story, bringing hope, joy and, in their belief, God's gift of salvation." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 220 }, stem: "Assess the view that Christmas has lost its religious meaning.",
        points: [["For: commercial pressure, shopping and spending can overshadow worship; for some it is only a holiday", 2], ["Against: churches hold services, nativity plays and charity; families gather and many remember the birth of Jesus", 2], ["A supported judgement", 2]],
        levels: levels(6),
        modelAnswer: "Commercial pressure and spending can overshadow worship, and for some people Christmas is only a holiday. However, churches hold services and nativity plays, families gather and many Christians give to those in need, so the religious meaning remains for many. On balance the meaning has not been lost but is shared with other activities, and it depends on how people choose to celebrate." }),
    ],
    hints: ["Give the case that the meaning is lost, the case that it remains, then judge."],
    explanation: "A balanced answer weighs commercial influence against continued worship and charity." });

  b.card("DEFINITION", "What is **Lent**?", "The forty days before Easter (not counting Sundays), a time of prayer, fasting and repentance beginning on Ash Wednesday.");
  b.card("DEFINITION", "What is the **Lord's Day**?", "Sunday, the day Christians remember the resurrection and gather for worship.");
  b.card("FACT", "Name the days of Holy Week.", "Palm Sunday, Maundy Thursday, Good Friday, then Holy Saturday and Easter Sunday.");
  b.card("FACT", "When are Ascension and Pentecost?", "Ascension: forty days after Easter. Pentecost: fifty days after Easter.");
  b.card("FACT", "What does Epiphany remember?", "The visit of the wise men and the showing of Christ to the nations (6 January).", "Matthew 2.");
  b.card("FACT", "Which Christians keep Saturday as the Sabbath?", "Seventh-day Adventists.");
  b.card("CONCEPT", "Why is Easter the greatest Christian festival?", "It celebrates the resurrection, the centre of Christian faith, which Christians believe shows victory over death.");
  b.card("CONCEPT", "What does Advent prepare for?", "The birth of Jesus at Christmas, and in Christian belief the return of Christ.");
  b.card("FACT", "What is Palm Sunday?", "The Sunday before Easter, remembering Jesus' entry into Jerusalem.", "Mark 11:1-11.");
});
