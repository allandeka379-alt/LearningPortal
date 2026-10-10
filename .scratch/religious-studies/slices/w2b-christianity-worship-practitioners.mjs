// W2b: Christian worship, leaders and places of worship.
import { concept, P, source, ref, levels } from "../lib.mjs";
import { mc, ms, pm } from "../tables/w2b-helpers.mjs";

concept("frs.christianity.worship-practitioners", { file: "christianity/worship-practitioners", keyPrefix: "christianity.worship-practitioners" }, (b) => {
  mc(b, 1, "RECALL", "Who is the head of the Roman Catholic Church?",
    ["The pope", "Correct: the pope is the bishop of Rome and leader of the Catholic Church."],
    [["The elder", "An elder helps to lead a congregation in many Protestant churches."],
     ["The evangelist", "An evangelist preaches the Gospel to those outside the church."],
     ["The deacon", "A deacon assists in worship and serves the needy."]],
    "The **pope** is the head of the Catholic Church.");
  mc(b, 2, "UNDERSTANDING", "What is a liturgy?",
    ["A set order of worship with fixed prayers and readings", "Correct: liturgical churches follow a fixed order."],
    [["A spontaneous service led by the Spirit with no fixed order", "That describes charismatic worship."],
     ["A pilgrimage to Jerusalem or Bethlehem", "A pilgrimage is a journey to a holy place."],
     ["A group of Christians studying the Bible at home", "That is a Bible study or house group."]],
    "A **liturgy** is a fixed order of worship, as in Catholic, Orthodox and Anglican churches.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What does the dove symbolise in Christian art?",
    ["The Holy Spirit", "Correct: based on the Spirit coming down like a dove at the baptism of Jesus (Mark 1:10)."],
    [["The suffering of Jesus", "That is more often shown by the cross or crucifix."],
     ["The authority of the pope", "The pope's authority is not shown by the dove."],
     ["The twelve disciples", "The twelve are not shown by a dove."]],
    "The **dove** is a symbol of the Holy Spirit.");
  mc(b, 3, "APPLICATION", "Nyasha visits a church where the service has a long period of singing, testimonies, a sermon and prayer for the sick, with no fixed order of prayers. Which form of worship is this?",
    ["Charismatic", "Correct: spontaneous, led by the Spirit, with healing."],
    [["Liturgical, with a set order", "Liturgical services follow a fixed order."],
     ["Orthodox", "Orthodox worship follows a set liturgy with chanting."],
     ["Silent", "The service in the question includes singing and speaking."]],
    "Spontaneous singing, testimonies and prayer for healing mark **charismatic** worship.", { hints: ["Which form is spontaneous and Spirit-led?"] });
  mc(b, 3, "APPLICATION", "A visitor sees an empty cross on the wall of a Baptist church and a figure of Jesus on the cross in a Catholic church. What are these symbols called?",
    ["A cross and a crucifix", "Correct: an empty cross and a cross with the figure of Jesus."],
    [["A crucifix and a cross", "The order is reversed."],
     ["A vestment and a stole", "These are clothing worn by clergy."],
     ["A font and a lectern", "These are items of furniture."]],
    "An empty **cross** and a **crucifix** (with the figure of Jesus) are the two symbols.", { hints: ["One has the figure of Jesus and one does not."] });
  mc(b, 3, "ANALYSIS", "Which statement about worship in apostolic churches is accurate and respectful?",
    ["It often includes open-air services, white robes, song and prophecy", "Correct: these are common features."],
    [["It is not really Christian worship because it differs from mission churches", "AIC worship is Christian worship in an African form."],
     ["It never uses the Bible in any part of the service", "Apostolic services use the Bible."],
     ["It is the same as Catholic worship in every respect", "The two differ in form, leadership and setting."]],
    "Apostolic worship often features **open-air sites**, **white robes**, **song** and **prophecy**.", { hints: ["Choose the description that is accurate and respectful."] });
  mc(b, 4, "ANALYSIS", "Which reason best explains why many Christians value symbols such as the cross in worship?",
    ["Symbols remind believers of the Gospel and help them to express and share their faith", "Correct: they are visible reminders of belief."],
    [["Symbols replace the need for scripture, prayer and teaching in the church", "Symbols support rather than replace scripture and prayer."],
     ["Symbols are required by law in every church in Zimbabwe", "There is no such legal requirement."],
     ["Symbols show that the church building is the property of the pope", "Symbols do not show papal ownership."]],
    "Symbols remind believers of the **Gospel** and help them to **express and share their faith**.", { hints: ["Think of what a symbol does for the believer."] });

  b.tf({ d: 1, skill: "RECALL", stem: "A pastor is the leader of a congregation in many Protestant and Pentecostal churches.", answer: true,
    explanation: "True. The pastor preaches, leads worship and cares for the members." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "All Christians must worship in a church building, because worship in the open air is not permitted.", answer: false,
    explanation: "False. Many Christians worship in halls, homes and open-air sites; apostolic churches often worship outdoors." });

  b.match({ d: 3, skill: "UNDERSTANDING",
    stem: "Match each leader with the church or role connected with them.",
    pairs: [["Pope", "head of the Catholic Church"], ["Priest", "celebrates the Eucharist in Catholic, Orthodox and Anglican churches"], ["Deacon", "assists in worship and serves the poor and sick"], ["Prophet", "receives and speaks messages believed to come from God in AICs"]],
    hints: ["Think of the highest leader, the Eucharist, service, and prophecy."],
    explanation: "Pope: Catholic head. Priest: Eucharist. Deacon: service. Prophet: AIC messages." });

  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct words.",
    template: "A robe worn by clergy in liturgical churches is called a {{blank:a}}, and the symbol of a fish was used by early Christians as a {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["vestment"], choices: ["vestment", "font", "pulpit", "chorus"] }, { id: "b", accepted: ["code"], choices: ["code", "weapon", "calendar", "law"] }],
    explanation: "Clergy wear **vestments**. The fish was an early Christian **code**: the Greek word *ichthys*." });
  b.fib({ d: 3, skill: "UNDERSTANDING", stem: "Choose the correct words.",
    template: "Members of apostolic churches often wear {{blank:a}} garments and may worship in the {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["white"], choices: ["white", "red", "black", "yellow"] }, { id: "b", accepted: ["open air"], choices: ["open air", "mine", "market", "bank"] }],
    hints: ["Think of purity and the sky."],
    explanation: "Many apostolic churches wear **white** robes and worship in the **open air**." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the part of a church from which a minister usually preaches.",
    accepted: ["Pulpit", "The pulpit"], wrong: ["Font", "Altar"],
    explanation: "The **pulpit** is where the sermon is preached. The font is used for baptism and the altar for the Eucharist." });

  ms(b, 3, "UNDERSTANDING", 3, "State **three** elements that are found in most Christian services.",
    ["Hymns or choruses", "Bible readings", "A sermon", "Prayers", "An offering", "A blessing"],
    "Most Christian services include hymns, Bible readings and a sermon. They also contain prayers, an offering and a blessing.",
    "One mark for each element, to a maximum of three.", ["Think of singing, scripture and teaching."]);
  ms(b, 3, "UNDERSTANDING", 4, "Describe the dress and symbols of an apostolic church.",
    [["Members wear white robes, often with a sash or belt", 1], ["White stands for purity", 1], ["Members may cover their heads or remove their shoes at holy places", 1], ["Services are often held in the open air, on hills or in fields", 1]],
    "Members of apostolic churches wear white robes, often with a sash. White stands for purity. In many of these churches members cover their heads or remove their shoes at holy places, and services are often held in the open air on hills or in fields.",
    "One mark for each point.", ["Describe the clothing, its meaning and the place."]);
  ms(b, 4, "ANALYSIS", 6, "Explain **two** reasons why the sermon is important in Christian worship.",
    [["It explains the Bible reading", 1], ["Developed: the preacher links the passage to daily life, so believers learn how to apply scripture", 2], ["It teaches the faith and encourages believers", 1], ["Developed: it gives guidance and encouragement for the week, and unites the congregation in one message", 2]],
    "The sermon explains the Bible reading: the preacher links the passage to daily life, so believers learn how to apply scripture. It also teaches the faith and encourages believers, giving guidance for the week and uniting the congregation in one message.",
    "Two reasons, each stated and developed.", ["One reason about explaining the Bible, one about teaching and encouragement."]);

  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "a description of a worship service in a fictional church in Gwanda, 2026",
      "On Sunday at nine the people gather. The elders lead the singing, and a choir sings a hymn. A reading from the Gospel of Luke is followed by a sermon from the pastor, who explains it. The people pray together, an offering is taken for the needy, and the pastor gives a blessing.",
      { described: false }
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({ label: "(a)", stem: "Who explains the reading in Source A?",
        options: [["The pastor", "Correct: Source A says the pastor gives the sermon."], ["The pope", "The pope is not mentioned in Source A."], ["The deacon", "The deacon is not mentioned in Source A."], ["The choir", "The choir sings a hymn but does not preach."]],
        answer: "A", explanation: "The pastor preaches the sermon." }),
      P.manual({ label: "(b)", marks: 3, stem: "Using Source A, state **three** parts of the service.",
        points: ["Singing led by the elders and a choir hymn", "A Gospel reading followed by a sermon", "Prayer, an offering for the needy and a blessing"],
        modelAnswer: "The service includes singing and a hymn, a reading from the Gospel followed by a sermon, and prayer, an offering for the needy and a blessing." }),
      P.manual({ label: "(c)", marks: 4, stem: "Explain why Christians take an offering for the needy during worship.",
        points: [["Jesus taught care for the poor (Matthew 25:31-46)", 1], ["Giving is an act of worship and thanks to God", 1], ["It helps the church to support those in need, such as orphans and the sick", 1], ["It reminds the congregation to share what they have", 1]],
        modelAnswer: "Christians take an offering for the needy because Jesus taught care for the poor, and because giving is an act of thanks and worship to God. It helps the church to support those in need, such as orphans and the sick, and reminds the congregation to share what they have." }),
    ],
    hints: ["In (c) think of Jesus' teaching, thanks to God and practical help."],
    explanation: "Source A describes a service; (c) asks why an offering is taken." });
  b.struct({ d: 4, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "Sipho says: \"Worship in a church building with fixed prayers is more serious than lively worship in the open air.\" Rudo, who attends an apostolic church, disagrees.",
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Outline **two** features of liturgical worship.",
        points: [["A fixed order of prayers and readings", 1], ["Clergy wearing vestments", 1], ["The use of a lectionary and formal music", 1], ["Catholic, Orthodox and Anglican churches follow it", 1]],
        modelAnswer: "Liturgical worship follows a fixed order of prayers and readings. The clergy wear vestments." }),
      P.manual({ label: "(b)", marks: 4, stem: "Explain why many African Independent Churches worship in the open air.",
        points: [["They feel closer to God in the open air and in nature", 2], ["It allows large gatherings, with song and dance, and reflects the way that many African peoples had worshipped at sacred outdoor places", 2]],
        modelAnswer: "Many members feel closer to God in the open air and in nature. It also allows large gatherings with song and dance, and it fits the long African tradition of worshipping at outdoor sacred places." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 220 }, stem: "Assess the view that worship is more meaningful when it follows a fixed order.",
        points: [["For: a fixed order gives stability, shared prayer and a link with the Church's long history", 2], ["Against: spontaneous worship allows members to express themselves, to feel the Spirit and to take part fully", 2], ["A supported judgement", 2]],
        levels: levels(6),
        modelAnswer: "A fixed order gives stability and shared prayers, and it links the church with its long history. However, spontaneous worship allows members to express themselves, to feel the Spirit at work and to take part fully. On balance, meaning depends on the believer and the tradition; neither form is more serious in itself." }),
    ],
    hints: ["Give the case for fixed order, the case for spontaneous worship, then judge."],
    explanation: "A balanced answer values both styles and gives a judgement." });

  b.card("DEFINITION", "What is a **liturgy**?", "A set order of worship with fixed prayers and readings, as in Catholic, Orthodox and Anglican churches.");
  b.card("DEFINITION", "What are **vestments**?", "Special clothes worn by clergy to lead worship, such as the alb, stole and chasuble.");
  b.card("FACT", "What is the difference between a cross and a crucifix?", "A cross is empty; a crucifix has the figure of Jesus on it.");
  b.card("FACT", "Which symbol stands for the Holy Spirit?", "The dove.", "Mark 1:10.");
  b.card("FACT", "Which leaders celebrate the Eucharist in Catholic, Orthodox and Anglican churches?", "Priests.");
  b.card("FACT", "Which leaders speak messages believed to come from God in AICs?", "Prophets.");
  b.card("FACT", "Why do apostolic churches wear white?", "White stands for purity and the clothing of heaven.");
  b.card("CONCEPT", "What is charismatic worship?", "Spontaneous worship that stresses the Holy Spirit's gifts, such as healing and speaking in tongues.");
  b.card("CONCEPT", "What does the fish symbol mean?", "An early Christian code: the Greek word ichthys stood for Jesus Christ, Son of God, Saviour.");
});
