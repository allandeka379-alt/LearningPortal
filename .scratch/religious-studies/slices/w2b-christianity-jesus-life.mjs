// W2b: the life of Jesus (as the Gospels record it).
import { concept, P, source, ref, levels } from "../lib.mjs";
import { mc, ms, pm } from "../tables/w2b-helpers.mjs";

concept("frs.christianity.jesus-life", { file: "christianity/jesus-life", keyPrefix: "christianity.jesus-life" }, (b) => {
  mc(b, 1, "RECALL", "Which four books of the New Testament are the Gospels?",
    ["Matthew, Mark, Luke and John", "Correct: these four tell the good news about Jesus."],
    [["Acts, Romans, Hebrews and James", "These are the book of Acts and some letters, not Gospels."],
     ["Genesis, Exodus, Psalms and Isaiah", "These are books of the Old Testament."],
     ["Peter, Paul, Timothy and Titus", "These are names of apostles and companions; some have letters named after them, but none of the four is a Gospel."]],
    "The Gospels are **Matthew, Mark, Luke and John**. The word means \"good news\".");
  mc(b, 2, "UNDERSTANDING", "In which town, according to Matthew and Luke, was Jesus born?",
    ["Bethlehem", "Correct: both birth narratives place the birth in Bethlehem."],
    [["Nazareth", "Nazareth is where Mary and Joseph lived and where Jesus grew up."],
     ["Jerusalem", "Jerusalem was the capital, where Jesus was later crucified."],
     ["Capernaum", "Capernaum was a town in Galilee where Jesus later taught."]],
    "Both Gospel accounts say that Jesus was born in **Bethlehem**; he grew up in Nazareth.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which Jewish group in the time of Jesus wanted to drive out the Romans, if necessary by force?",
    ["The Zealots", "Correct: they supported armed resistance to Rome."],
    [["The Pharisees", "The Pharisees stressed strict keeping of the Torah and did not take up arms against Rome."],
     ["The Sadducees", "The Sadducees were priestly families who co-operated with Rome."],
     ["The Essenes", "The Essenes lived in withdrawn communities."]],
    "The **Zealots** wanted to end Roman rule by force. The Pharisees, Sadducees and Essenes took other positions.");
  mc(b, 3, "APPLICATION", "At a Christmas service in Mutare, a reader describes angels appearing to shepherds near Bethlehem. Which Gospel is being read?",
    ["Luke 2:1-20", "Correct: Luke tells of the shepherds and the manger."],
    [["Matthew 2:1-12", "Matthew tells of the wise men who followed a star."],
     ["Mark 1:9-11", "This passage is the baptism of Jesus."],
     ["John 20:1-18", "This passage is the discovery of the empty tomb."]],
    "The shepherds are in **Luke 2**. Matthew tells of the wise men.", { hints: ["Which Gospel mentions the census and the manger?"] });
  mc(b, 3, "APPLICATION", "Rudo reads that Jesus refused three temptations in the wilderness by answering with the scriptures. Which passage is she reading?",
    ["Matthew 4:1-11", "Correct: this is the account of the three temptations."],
    [["Mark 11:1-11, the entry into Jerusalem", "This passage is the entry into Jerusalem."],
     ["Luke 1:26-38", "This passage is the announcement to Mary."],
     ["Mark 16:1-8", "This passage is the empty tomb."]],
    "The three temptations (bread, the Temple, the kingdoms) are in **Matthew 4:1-11**.", { hints: ["It follows the baptism and lasts forty days."] });
  mc(b, 3, "ANALYSIS", "Which statement about the Gospel accounts of the birth of Jesus is accurate?",
    ["Matthew and Luke each include details that the other does not", "Correct: shepherds appear only in Luke, and wise men and Herod only in Matthew."],
    [["Matthew and Luke give exactly the same details in the same order", "The two accounts differ, for example in who visits the child."],
     ["Only one of the four Gospels says that Jesus was born in Bethlehem", "Both Matthew and Luke say so; Mark and John do not tell of the birth."],
     ["The Gospels agree that the wise men visited the shepherds on the night", "No Gospel says that the two groups met."]],
    "Matthew and Luke tell of the birth with different details; each adds something the other omits. Mark and John begin with the baptism and ministry.",
    { hints: ["Think of which Gospel has the shepherds and which has the wise men."] });
  mc(b, 4, "ANALYSIS", "Which reason best explains why Christians give so much importance to the resurrection of Jesus?",
    ["They believe it shows that death is not the end and that his work was approved by God", "Correct: it supports belief in life after death and in the truth of his mission."],
    [["It is the date on which the Gospels say that Jesus was born in Bethlehem", "The resurrection is not the birth of Jesus; that is celebrated at Christmas."],
     ["It is the only miracle that the Gospels record for the time in Galilee", "The Gospels record many miracles, and the resurrection happened after his death."],
     ["It proves that all religions teach exactly the same about life after death", "Religions differ on this; a Religious Studies answer does not claim they agree."]],
    "For Christians the resurrection is the centre of their faith: they believe it shows victory over death and gives hope of life after death. It is celebrated at Easter and on every Sunday.",
    { hints: ["Say what Christians believe it shows about death and about Jesus."] });

  b.tf({ d: 1, skill: "RECALL", stem: "According to the Gospels, Jesus was baptised by John the Baptist in the river Jordan.", answer: true,
    explanation: "True. See Mark 1:9-11. The Gospels say the Spirit came down like a dove." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "The Pharisees, Sadducees and Zealots were Christian groups in Rome.", answer: false,
    explanation: "False. They were Jewish groups in Palestine in the time of Jesus, with different views on the law and on Roman rule." });

  b.match({ d: 3, skill: "UNDERSTANDING",
    stem: "Match each Jewish group in the time of Jesus with its description.",
    pairs: [["Pharisees", "strict keepers of the Torah and its interpretation"], ["Sadducees", "priestly families who ran the Temple"], ["Zealots", "wanted to end Roman rule by force"], ["Essenes", "lived in withdrawn, strict communities"]],
    hints: ["Think of the Temple, the synagogue, the sword and the desert."],
    explanation: "Pharisees: Torah and teaching. Sadducees: Temple and priests. Zealots: armed resistance. Essenes: withdrawn communities." });

  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct words.",
    template: "Jesus was born in {{blank:a}} and grew up in {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["Bethlehem"], choices: ["Bethlehem", "Nazareth", "Jerusalem", "Jericho"] }, { id: "b", accepted: ["Nazareth"], choices: ["Nazareth", "Bethlehem", "Egypt", "Capernaum"] }],
    explanation: "He was born in **Bethlehem** and grew up in **Nazareth**, in Galilee." });
  b.fib({ d: 3, skill: "UNDERSTANDING", stem: "Choose the correct words.",
    template: "The meal that Jesus shared with his disciples before his arrest is called the {{blank:a}}, and the governor who ordered his crucifixion was {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["Last Supper"], choices: ["Last Supper", "Passover lamb", "Pentecost meal", "Sabbath feast"] }, { id: "b", accepted: ["Pontius Pilate"], choices: ["Pontius Pilate", "King Herod", "Caiaphas", "Augustus"] }],
    hints: ["The meal is the origin of the Eucharist.", "The governor was Roman."],
    explanation: "The **Last Supper** (Mark 14:22-25) gave rise to the Eucharist. **Pontius Pilate** was the Roman governor." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the disciple who betrayed Jesus.",
    accepted: ["Judas Iscariot", "Judas"], wrong: ["Peter", "Thomas"],
    explanation: "**Judas Iscariot** betrayed Jesus to the authorities, according to the Gospels." });

  ms(b, 3, "UNDERSTANDING", 3, "Outline **three** events in the ministry of Jesus in Galilee.",
    ["He called disciples such as Simon (Peter) and Andrew, who left their nets (Mark 1:16-20)", "He healed the sick, for example the paralysed man (Mark 2:1-12)", "He calmed a storm on the lake (Mark 4:35-41)", "He fed a crowd with five loaves and two fish (Mark 6:30-44)", "He taught about the Kingdom of God (Mark 1:14-15)"],
    "In Galilee Jesus called disciples such as Peter and Andrew, healed a paralysed man, and calmed a storm on the lake. He also taught about the Kingdom of God.",
    "One mark for each event, to a maximum of three.", ["Think of calling, healing, nature miracles and teaching."]);
  ms(b, 3, "UNDERSTANDING", 4, "Describe what happened at the Last Supper and why Christians remember it.",
    [["Jesus shared a meal with his disciples on the night before his arrest", 1], ["He took bread and wine and spoke of his body and of a new covenant (Mark 14:22-25)", 1], ["Christians remember it in the Eucharist, Holy Communion or Lord's Supper", 1], ["It reminds them of his death and of the forgiveness they believe it brings", 1]],
    "On the night before his arrest Jesus shared a meal with his disciples. He took bread and wine and spoke of his body and a new covenant. Christians remember this in the Eucharist, which recalls his death and the forgiveness they believe it brings.",
    "One mark for each point.", ["Say what happened, then link it to a service today."]);
  ms(b, 4, "ANALYSIS", 6, "Explain **two** reasons why the miracles of Jesus matter to Christians.",
    [["They show the power of God at work in Jesus (signs of the Kingdom)", 1], ["Developed: Christians see healings and the calming of the storm as proof that God has power over illness and nature, which strengthens trust", 2], ["They show the compassion of Jesus for the sick, the hungry and the outcast", 1], ["Developed: this gives Christians an example, so they care for the sick and poor through hospitals, clinics and feeding schemes", 2]],
    "The miracles matter because Christians see them as signs of God's power at work in Jesus: the healings and the calming of the storm show power over illness and nature, which strengthens trust in God. They also show the compassion of Jesus for the sick and the hungry, which gives Christians an example, so they care for the sick and poor through hospitals and feeding schemes.",
    "Two reasons, each stated (1) and developed (2 across the reason).", ["One reason about power, one about compassion; develop each."]);

  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "a notice in a fictional church bulletin in Masvingo, 2026",
      "Holy Week at St Luke's Fellowship. On Palm Sunday we carry branches and sing as we remember the entry into Jerusalem. On Thursday evening we share bread and wine. On Friday we read the story of the trial and crucifixion. On Sunday morning we gather at dawn to celebrate that the tomb was found empty."
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({ label: "(a)", stem: "Which Gospel passage tells of the entry into Jerusalem?",
        options: [[ref("Mark", 11, "1-11"), "Correct: Jesus rides a donkey into the city."], [ref("Mark", 1, "9-11"), "This is the baptism of Jesus."], [ref("Mark", 4, "35-41"), "This is the calming of the storm."], [ref("Mark", 16, "1-8"), "This is the empty tomb."]],
        answer: "A", explanation: "The entry into Jerusalem is Mark 11:1-11." }),
      pm({ label: "(b)", marks: 3, stem: "Using Source A, state **three** events of the last week of Jesus that the fellowship remembers.",
        points: ["The entry into Jerusalem (Palm Sunday)", "The sharing of bread and wine (the Last Supper)", "The trial and crucifixion, or the empty tomb on Sunday morning"],
        modelAnswer: "The fellowship remembers the entry into Jerusalem, the sharing of bread and wine at the Last Supper, and the trial and crucifixion, followed by the empty tomb." }),
      pm({ label: "(c)", marks: 4, stem: "Explain why Christians remember the resurrection on Sunday morning.",
        points: [["They believe that Jesus rose on the third day, which was a Sunday", 1], ["It is the central belief of Christianity, showing that death is not the end", 1], ["It gives hope of life after death", 1], ["Sunday became the weekly day of worship, the Lord's Day", 1]],
        modelAnswer: "Christians believe that Jesus rose on the third day, a Sunday. It is the central belief of their faith because it shows that death is not the end and gives hope of life after death, and for this reason Sunday became the weekly day of worship." }),
    ],
    hints: ["In (c) link the day to the belief and to weekly worship."],
    explanation: "Source A names the events; (c) asks why the Sunday resurrection matters." });
  b.struct({ d: 4, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "Farai, a Christian, says: \"The life of Jesus gives Christians an example to follow.\" Aisha, a Muslim classmate, says: \"I respect Jesus (Isa) as a prophet, but the Muslim account of his end differs from the Christian one.\"",
    parts: [
      pm({ label: "(a)", marks: 4, stem: "Outline **two** events from the birth or childhood of Jesus in the Gospels.",
        points: [["An angel told Mary she would bear a son (Luke 1:26-38)", 1], ["He was born in Bethlehem and shepherds visited (Luke 2)", 1], ["Wise men followed a star to find him (Matthew 2)", 1], ["The family fled to Egypt and later settled in Nazareth (Matthew 2)", 1]],
        modelAnswer: "An angel told Mary that she would bear a son, and Jesus was born in Bethlehem, where shepherds visited him. Wise men also followed a star to find the child, and the family fled to Egypt before settling in Nazareth." }),
      pm({ label: "(b)", marks: 4, stem: "Explain how the baptism and temptations of Jesus prepared him for his public work, according to the Gospels.",
        points: [["At his baptism the Spirit came down and he was declared God's Son, marking the start of his work (Mark 1:9-11)", 2], ["In the wilderness he refused three temptations and stayed faithful to God, so he was ready to teach and serve", 2]],
        modelAnswer: "At his baptism the Spirit came down and a voice declared him God's Son, which marked the start of his public work. In the wilderness he refused three temptations by answering with the scriptures, so he showed that he would stay faithful to God before he began to teach and serve." }),
      pm({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 220 }, stem: "Assess the view that the life of Jesus gives Christians an example to follow.",
        points: [["For: his compassion for the sick and outcast, his service and his forgiveness are followed in Christian charity and care", 2], ["Other view: Christians also believe he is the Son of God who died for sin, so he is more than an example and some things he did cannot be imitated", 2], ["A supported judgement", 2]],
        levels: levels(6),
        modelAnswer: "Many Christians follow Jesus' example by caring for the sick, forgiving others and serving the poor, as hospitals, schools and feeding schemes run by churches show. However, Christians also believe that he is the Son of God who died for the sin of the world, so his life is more than an example. On balance his life is an example for Christians, but not only an example." }),
    ],
    hints: ["Give evidence for the view, a point on the other side, then your judgement."],
    explanation: "A balanced answer shows how Christians follow his example and that, for them, he is more than an example." });

  b.card("DEFINITION", "What is a **Gospel**?", "A book of the New Testament that tells the good news about Jesus: Matthew, Mark, Luke or John.");
  b.card("DEFINITION", "What do **Messiah** and **Christ** mean?", "Both mean \"anointed one\": Messiah is Hebrew and Christ is Greek. Christians believe Jesus is the Messiah.");
  b.card("FACT", "Name the four Jewish groups in the time of Jesus.", "Pharisees, Sadducees, Zealots and Essenes.");
  b.card("FACT", "Where was Jesus born and where did he grow up?", "Born in Bethlehem; grew up in Nazareth, in Galilee.", "Matthew 1-2; Luke 1-2.");
  b.card("FACT", "Where is the baptism of Jesus told?", "Mark 1:9-11 (also in Matthew, Luke and John). John the Baptist baptised him in the Jordan.");
  b.card("FACT", "How many disciples did Jesus choose, and name two.", "Twelve; for example Peter (Simon) and Andrew, James and John.", "Mark 1:16-20.");
  b.card("FACT", "What happened at the Last Supper?", "Jesus shared bread and wine with his disciples and spoke of his body and a new covenant.", "Mark 14:22-25; origin of the Eucharist.");
  b.card("FACT", "Which Roman governor ordered the crucifixion?", "Pontius Pilate.");
  b.card("CONCEPT", "Why is the resurrection central to Christianity?", "Christians believe it shows that death is not the end and that Jesus is the Son of God; it is celebrated at Easter and on every Sunday.");
});
