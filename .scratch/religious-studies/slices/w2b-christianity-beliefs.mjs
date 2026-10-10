// W2b: Christian beliefs.
import { concept, P, source, ref, levels } from "../lib.mjs";
import { mc, ms, pm } from "../tables/w2b-helpers.mjs";

concept("frs.christianity.beliefs", { file: "christianity/beliefs", keyPrefix: "christianity.beliefs" }, (b) => {
  mc(b, 1, "RECALL", "What do Christians mean by the Trinity?",
    ["One God in three persons: Father, Son and Holy Spirit", "Correct: this is the Christian teaching about God."],
    [["Three separate gods who rule different parts of the world", "Christians believe in one God, not three gods."],
     ["The three parts of the Bible: Law, Prophets and Gospels", "That is not what the Trinity means."],
     ["The three days between the crucifixion and the resurrection", "That is the period before Easter Sunday."]],
    "The **Trinity** is the belief in one God known as three persons: Father, Son and Holy Spirit.");
  mc(b, 2, "UNDERSTANDING", "What is the incarnation?",
    ["The belief that God became human in Jesus", "Correct: the word means \"in flesh\"."],
    [["The belief that Jesus rose from the dead on the third day", "That is the resurrection."],
     ["The belief that the Spirit came upon the disciples at Pentecost", "That belongs to the coming of the Holy Spirit."],
     ["The belief that Jesus will return at the end of time", "That is the second coming."]],
    "The **incarnation** is the belief that God became a human being in Jesus Christ (John 1:14).", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What does the word grace mean in Christian teaching?",
    ["God's free and undeserved love and favour", "Correct: salvation is understood as a gift."],
    [["A prayer said before a meal at home", "That is also called grace in everyday language, but not the sense used here."],
     ["A reward paid for keeping all the commandments", "Grace is a gift, not something earned."],
     ["A punishment sent for serious sin", "Grace is the opposite of punishment."]],
    "**Grace** is God's free and undeserved love. Christians believe salvation is received as a gift of grace.");
  mc(b, 3, "APPLICATION", "A Catholic pupil says, \"My aunt prays for her late husband, because we believe he may be in a state of purification before heaven.\" Which Catholic teaching is she describing?",
    ["Purgatory", "Correct: Catholics teach purgatory as purification before heaven."],
    [["The Trinity", "The Trinity is the teaching about God as Father, Son and Spirit."],
     ["The incarnation", "The incarnation is God becoming human."],
     ["The atonement", "The atonement is the belief that Jesus' death restored humanity to God."]],
    "**Purgatory** is a Catholic teaching. Most Protestants do not accept it.", { hints: ["Which teaching concerns purification after death?"] });
  mc(b, 3, "APPLICATION", "Which line from the Apostles' Creed supports belief in life after death?",
    ["The resurrection of the body and life everlasting", "Correct: it states belief in life after death."],
    [["I believe in God the Father almighty, creator of heaven", "This line states belief in God as creator."],
     ["Conceived by the Holy Spirit, born of the Virgin Mary", "This line concerns the birth of Jesus."],
     ["Suffered under Pontius Pilate, was crucified and buried", "This line concerns the crucifixion."]],
    "The line about the **resurrection of the body and the life everlasting** states belief in life after death.", { hints: ["Look for the line about life that does not end."] });
  mc(b, 3, "ANALYSIS", "Which statement about Christian beliefs is accurate?",
    ["Christians share central beliefs but differ on some, such as purgatory", "Correct: Catholics teach purgatory and most Protestants do not."],
    [["All Christians agree on every single belief in exactly the same way in all churches", "Denominations differ on some beliefs."],
     ["Christians believe that Jesus was only a human teacher", "Christians believe that Jesus is fully God and fully human."],
     ["Christianity teaches that salvation is earned by good works alone", "Christians teach that salvation is a gift of grace, with works as the result."]],
    "Christians hold central beliefs together (Trinity, incarnation, resurrection) but differ on others, including **purgatory**.", { hints: ["Look for the option that shows both agreement and difference."] });
  mc(b, 4, "ANALYSIS", "Which reason best explains why the resurrection is central to Christian belief?",
    ["Christians believe it shows victory over death and gives hope of life after death", "Correct: Paul wrote that faith is empty without it (1 Corinthians 15)."],
    [["It is the event that the Gospels place at the start of the ministry in Galilee", "The resurrection comes at the end of the Gospel story."],
     ["It proves that Christians should not take part in worship on Sundays", "Sunday worship celebrates the resurrection."],
     ["It records the creation of the world in six days in the book of Genesis", "That is in Genesis, not the resurrection."]],
    "Christians believe the resurrection shows victory over death and gives hope of life after death. Paul says faith is empty without it (1 Corinthians 15).", { hints: ["Think of what the resurrection shows about death."] });

  b.tf({ d: 1, skill: "RECALL", stem: "The Nicene Creed developed from the Council of Nicaea and was completed at a later council at Constantinople.", answer: true,
    explanation: "True. The creed took its present form after the Council of Constantinople, later in the fourth century." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Most Protestant churches teach the doctrine of purgatory.", answer: false,
    explanation: "False. Purgatory is a Catholic teaching; most Protestants do not accept it." });

  b.match({ d: 3, skill: "UNDERSTANDING",
    stem: "Match each Christian term with its meaning.",
    pairs: [["Incarnation", "God became human in Jesus"], ["Atonement", "Jesus' death puts right humanity's relationship with God"], ["Salvation", "being saved from sin and restored to God"], ["Second coming", "the return of Christ at the end of time"]],
    hints: ["Think of flesh, being at one, being saved and returning."],
    explanation: "Incarnation: God in human form. Atonement: restoring the relationship. Salvation: being saved. Second coming: Christ's return." });

  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct words.",
    template: "Christians believe in one God in three persons: {{blank:a}}, Son and {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["Father"], choices: ["Father", "Mother", "Prophet", "Angel"] }, { id: "b", accepted: ["Holy Spirit"], choices: ["Holy Spirit", "Messenger", "Apostle", "Saint"] }],
    explanation: "The persons of the Trinity are **Father**, Son and **Holy Spirit**." });
  b.fib({ d: 3, skill: "UNDERSTANDING", stem: "Choose the correct words.",
    template: "Christians believe that salvation is received by {{blank:a}}, which is shown in good works, and by God's {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["faith"], choices: ["faith", "birth", "payment", "travel"] }, { id: "b", accepted: ["grace"], choices: ["grace", "law", "anger", "silence"] }],
    hints: ["It is a gift, received by trust."],
    explanation: "Salvation comes through **faith** and God's **grace**; good works show the faith." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the creed that developed from the Council of Nicaea.",
    accepted: ["Nicene Creed", "The Nicene Creed", "Nicene"], wrong: ["Apostles Creed", "Athanasian"],
    explanation: "The **Nicene Creed** developed from Nicaea (325) and was completed at Constantinople (381)." });

  ms(b, 3, "UNDERSTANDING", 3, "State **three** Christian beliefs about Jesus.",
    ["He is the Son of God, fully God and fully human (incarnation)", "He died on the cross to restore humanity to God (atonement)", "He rose from the dead on the third day (resurrection)", "He will return at the end of time (second coming)", "He is the Messiah (Christ)"],
    "Christians believe that Jesus is the Son of God, who became human in the incarnation. They believe he died on the cross to restore humanity to God and rose again on the third day.",
    "One mark for each belief, to a maximum of three.", ["Think of the incarnation, the atonement and the resurrection."]);
  ms(b, 3, "UNDERSTANDING", 4, "Describe what Christians believe about the Holy Spirit.",
    [["The Holy Spirit is the third person of the Trinity", 1], ["The Spirit came upon the disciples at Pentecost (Acts 2)", 1], ["The Spirit guides, strengthens and teaches believers", 1], ["The Spirit produces qualities such as love, joy and peace (Galatians 5:22-23)", 1]],
    "The Holy Spirit is the third person of the Trinity. The Spirit came upon the disciples at Pentecost and continues to guide, strengthen and teach believers, producing qualities such as love, joy and peace.",
    "One mark for each point.", ["Say who the Spirit is, when the Spirit came, and what the Spirit does."]);
  ms(b, 4, "ANALYSIS", 6, "Explain **two** reasons why the Trinity is important to Christians.",
    [["It describes who God is: one God in three persons", 1], ["Developed: it shapes worship, for example baptism in the name of the Father, Son and Holy Spirit and prayers addressed to each person", 2], ["It shows that God is a relationship of love", 1], ["Developed: Christians believe that this love is the model for their relationships in the Church and family", 2]],
    "The Trinity is important because it describes who God is, one God in three persons, and it shapes worship, for example baptism in the name of the Father, Son and Holy Spirit. It also shows that God is a relationship of love, which Christians see as a model for relationships in the Church and the family.",
    "Two reasons, each stated and developed.", ["One reason about worship, one about love and relationships."]);

  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "a notice for a baptism preparation class in a fictional church in Chinhoyi, 2026",
      "Candidates will be baptised in the name of the Father, the Son and the Holy Spirit. In the class we will study the creed together. We will talk about creation, about Jesus who became human, about his death and resurrection, and about the life of the Church."
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({ label: "(a)", stem: "Which belief does baptism \"in the name of the Father, the Son and the Holy Spirit\" express?",
        options: [["The Trinity", "Correct: it names the three persons."], ["Purgatory", "This is a Catholic teaching about life after death."], ["The second coming", "This is the return of Christ."], ["The Council of Nicaea", "This is a historical event, not a belief expressed in baptism."]],
        answer: "A", explanation: "The Trinity is expressed by naming the Father, Son and Holy Spirit (Matthew 28:19)." }),
      pm({ label: "(b)", marks: 3, stem: "Using Source A, state **three** beliefs the class will study.",
        points: ["Creation (God as creator)", "Jesus who became human", "His death and resurrection, or the life of the Church"],
        modelAnswer: "The class will study creation, Jesus who became human, and his death and resurrection, together with the life of the Church." }),
      pm({ label: "(c)", marks: 4, stem: "Explain why Christians recite a creed in worship.",
        points: [["It states the main beliefs in a short form", 1], ["It unites the congregation in one shared statement", 1], ["It helps believers to learn and remember the faith", 1], ["It links the church today with the early Church (Nicaea, Constantinople)", 1]],
        modelAnswer: "A creed states the main beliefs in a short form and unites the congregation in one shared statement. It helps believers learn and remember the faith, and it links the church today with the early Church of Nicaea and Constantinople." }),
    ],
    hints: ["In (c) think of shared belief, teaching and history."],
    explanation: "Source A links baptism to the Trinity; (c) asks why a creed is used." });
  b.struct({ d: 4, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "Farai says: \"All Christians believe exactly the same things.\" Nokuthula, who is Catholic, says that she and her Methodist friend share most beliefs but not all.",
    parts: [
      pm({ label: "(a)", marks: 4, stem: "Outline **two** beliefs that Catholics and Protestants share.",
        points: [["One God in three persons (the Trinity)", 1], ["Jesus is the Son of God and rose from the dead", 1], ["The Bible is the word of God", 1], ["Salvation through God's grace", 1]],
        modelAnswer: "Catholics and Protestants both believe in one God in three persons, the Trinity, and that Jesus is the Son of God who rose from the dead." }),
      pm({ label: "(b)", marks: 4, stem: "Explain **one** belief on which Catholics and Protestants differ.",
        points: [["Purgatory: Catholics teach a state of purification after death, and pray for the dead", 2], ["Most Protestants do not accept this; they teach that those who trust in Christ go to be with God", 2]],
        modelAnswer: "On purgatory, Catholics teach that some who die in God's friendship are purified before heaven, and they pray for the dead. Most Protestants do not accept this teaching and believe that those who trust in Christ go to be with God." }),
      pm({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 220 }, stem: "Assess the view that the differences between Christian groups matter less than what they share.",
        points: [["For: all share belief in God, Jesus, the Bible, the Trinity and the resurrection, and they work together in ecumenical bodies", 2], ["Against: differences in authority, sacraments and teaching affect worship and daily practice, and some are sensitive for believers", 2], ["A supported judgement", 2]],
        levels: levels(6),
        modelAnswer: "The shared beliefs are the core of Christianity: God, Jesus, the Bible and the resurrection, and churches work together in ecumenical bodies. However, differences in authority, sacraments and teaching affect how people worship and live, and many believers regard them as important. On balance the shared faith is the foundation, but the differences still matter to those who hold them." }),
    ],
    hints: ["Give shared beliefs, give differences that matter, then judge."],
    explanation: "A balanced answer compares what is shared and what differs, and weighs them." });

  b.card("DEFINITION", "What is the **Trinity**?", "The belief in one God in three persons: Father, Son and Holy Spirit.");
  b.card("DEFINITION", "What is the **incarnation**?", "The belief that God became human in Jesus Christ.", "John 1:14.");
  b.card("DEFINITION", "What is **grace**?", "God's free and undeserved love and favour; Christians believe salvation is a gift of grace.");
  b.card("DEFINITION", "What is the **atonement**?", "The belief that Jesus' death on the cross put right the relationship between God and humanity.");
  b.card("FACT", "Name the two main Christian creeds.", "The Apostles' Creed and the Nicene Creed.");
  b.card("FACT", "What is purgatory, and who teaches it?", "A state of purification after death before heaven; a Catholic teaching that most Protestants do not accept.");
  b.card("FACT", "Which passage gives the Trinitarian baptism formula?", "Matthew 28:19: baptising in the name of the Father, the Son and the Holy Spirit.");
  b.card("CONCEPT", "Why is the resurrection central to Christian belief?", "Christians believe it shows victory over death and gives hope of life after death.", "1 Corinthians 15.");
  b.card("CONCEPT", "What is the second coming?", "The belief that Christ will return at the end of time to judge and bring God's Kingdom in its fullness.", "Acts 1:11.");
});
