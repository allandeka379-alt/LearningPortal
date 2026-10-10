// W2b: Christian denominations.
import { concept, P, source, ref, levels } from "../lib.mjs";
import { mc, ms, pm } from "../tables/w2b-helpers.mjs";

concept("frs.christianity.denominations", { file: "christianity/denominations", keyPrefix: "christianity.denominations" }, (b) => {
  mc(b, 1, "RECALL", "In which year did the Great Schism divide the Catholic and Orthodox churches?",
    ["1054", "Correct: Rome and Constantinople excommunicated each other in 1054."],
    [["313", "313 is the year of the Edict of Milan."],
     ["1517", "1517 is the year Luther published the Ninety-five Theses."],
     ["1948", "1948 is the year the World Council of Churches was founded."]],
    "The **Great Schism** was in **1054**, between the Church of Rome and the Church of Constantinople.");
  mc(b, 2, "UNDERSTANDING", "Who began the Reformation in 1517 by publishing ninety-five points for debate?",
    ["Martin Luther", "Correct: his protest began the Reformation."],
    [["John Wesley", "Wesley founded the Methodist movement in the eighteenth century."],
     ["John Calvin", "Calvin led reform in Geneva, but Luther began the Reformation."],
     ["Ignatius of Antioch", "He was a bishop and martyr in the early Church."]],
    "**Martin Luther**, a German monk, started the Reformation in 1517.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "How many sacraments do the Catholic and Orthodox churches keep?",
    ["Seven", "Correct: they keep seven sacraments."],
    [["Two", "Two is the usual number among most Protestant churches."],
     ["Twelve", "Twelve is the number of the apostles, not of sacraments."],
     ["Five", "Five does not match the number kept by Catholics or Orthodox."]],
    "Catholic and Orthodox churches keep **seven** sacraments; most Protestant churches keep two (baptism and Holy Communion).");
  mc(b, 3, "APPLICATION", "Rudo's church has a pastor, a lively service with drums, and prayer for healing, and teaches about the gifts of the Holy Spirit. Which type of church is it likely to be?",
    ["Pentecostal", "Correct: these are features of the Pentecostal movement."],
    [["Orthodox", "Orthodox worship is liturgical, with chanting and icons."],
     ["Roman Catholic", "Catholic worship centres on the Mass led by a priest."],
     ["Church of England", "Anglican services are usually liturgical, with set prayers."]],
    "Emphasis on the Holy Spirit, healing and lively worship marks **Pentecostal** churches.", { hints: ["Which movement stresses the Holy Spirit and spiritual gifts?"] });
  mc(b, 3, "APPLICATION", "Farai says his church is led by the pope and by bishops. Which church is it?",
    ["The Roman Catholic Church", "Correct: the pope is the leader of the Catholic Church."],
    [["The Methodist Church", "Methodists are led by ministers and conferences, not by a pope."],
     ["A Baptist church in Zimbabwe", "Baptists stress the authority of each local congregation."],
     ["An Apostolic church", "Apostolic churches have their own prophets and leaders."]],
    "The pope is the head of the **Roman Catholic Church**.", { hints: ["Which church recognises the bishop of Rome as its leader?"] });
  mc(b, 3, "ANALYSIS", "Which statement about the differences between churches is fair and accurate?",
    ["Churches differ on authority and sacraments yet share belief in God, Jesus and the Bible", "Correct: it reports differences and common ground without ranking."],
    [["The churches share nothing at all and hold no common beliefs about God or Jesus", "They share central beliefs such as belief in God and in Jesus."],
     ["Only the largest church in each country is truly Christian in the eyes of God, and the others are not", "A Religious Studies answer does not rank churches in this way."],
     ["All churches worship in exactly the same way in every country", "Forms of worship differ widely."]],
    "Churches differ in authority, sacraments, worship and leadership, but they share central beliefs, so the fair answer gives both.", { hints: ["A fair answer states differences and similarities."] });
  mc(b, 4, "ANALYSIS", "Which reason best explains why many Christians support the ecumenical movement?",
    ["They believe division weakens the Church's witness and hinders joint action for the poor", "Correct: this reflects the aims of bodies such as the World Council of Churches."],
    [["They want all churches to give up their own forms of worship completely", "Ecumenism seeks co-operation, not the loss of all distinct worship."],
     ["They believe that only one church has any authority from God to teach", "This would be opposed to the aims of ecumenism."],
     ["They think the Bible has no influence on how Christians should act", "Ecumenical bodies use the Bible to support their work."]],
    "Ecumenism rests on the belief that divided churches weaken the witness of the Church and that churches can act together on health, education and peace.", { hints: ["Think of the prayer for unity in John 17 and of joint action."] });

  b.tf({ d: 1, skill: "RECALL", stem: "The Church of England was established in the 1530s after King Henry VIII broke with the pope.", answer: true,
    explanation: "True. The Church of England grew into the worldwide Anglican communion." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "The Zimbabwe Council of Churches and the Zion Christian Church are the same organisation.", answer: false,
    explanation: "False. The Zimbabwe Council of Churches is an ecumenical body of churches; the Zion Christian Church is a church." });

  b.match({ d: 3, skill: "UNDERSTANDING",
    stem: "Match each group with a feature that describes it.",
    pairs: [["Roman Catholic", "led by the pope, seven sacraments"], ["Orthodox", "self-governing churches that honour the Patriarch of Constantinople"], ["Baptist", "believers' baptism and local congregational authority"], ["African Independent Church", "founded by Africans, with prophecy, song and dance"]],
    hints: ["Think of leadership, patriarchs, baptism and African origin."],
    explanation: "Catholic: pope. Orthodox: patriarchs. Baptist: believers' baptism. AIC: African-founded worship." });

  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct words.",
    template: "The German monk {{blank:a}} began the {{blank:b}} in 1517.",
    blanks: [{ id: "a", accepted: ["Martin Luther"], choices: ["Martin Luther", "John Wesley", "Constantine", "Paul"] }, { id: "b", accepted: ["Reformation"], choices: ["Reformation", "Great Schism", "Pentecost", "Exodus"] }],
    explanation: "**Martin Luther** began the **Reformation** in 1517." });
  b.fib({ d: 3, skill: "UNDERSTANDING", stem: "Choose the correct words.",
    template: "The World Council of Churches, founded in {{blank:a}}, is an example of {{blank:b}}, the movement for Christian unity.",
    blanks: [{ id: "a", accepted: ["1948"], choices: ["1054", "1517", "1948", "2013"] }, { id: "b", accepted: ["ecumenism"], choices: ["ecumenism", "schism", "monasticism", "persecution"] }],
    hints: ["It was founded soon after the Second World War."],
    explanation: "The World Council of Churches was founded in **1948** and is a main body of **ecumenism**." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the English king who broke with the pope and began the Church of England in the 1530s.",
    accepted: ["Henry VIII", "King Henry VIII", "Henry the Eighth", "Henry 8"], wrong: ["Edward", "George"],
    explanation: "**Henry VIII** broke with the pope and established the Church of England." });

  ms(b, 3, "UNDERSTANDING", 3, "State **three** causes of the Great Schism of 1054.",
    ["Disagreement about the authority of the bishop of Rome (the pope)", "A dispute about a phrase in the Nicene Creed", "Differences of language, custom and culture between the Greek East and the Latin West", "The distance and slow communication between Rome and Constantinople"],
    "The Great Schism was caused by disagreement about the pope's authority, a dispute about a phrase in the Nicene Creed, and differences of language and custom between East and West.",
    "One mark for each cause, to a maximum of three.", ["Think of authority, doctrine and culture."]);
  ms(b, 3, "UNDERSTANDING", 4, "Describe how the Reformation began.",
    [["By the sixteenth century many Christians believed the Church needed reform", 1], ["In 1517 Martin Luther published ninety-five points criticising practices such as the sale of indulgences", 1], ["He stressed salvation by faith and grace, and the authority of the Bible", 1], ["His ideas spread and led to the Protestant churches", 1]],
    "By the sixteenth century many Christians believed the Church needed reform. In 1517 Martin Luther published ninety-five points criticising practices such as the sale of indulgences, and he stressed salvation by faith and grace and the authority of the Bible. His ideas spread and led to the Protestant churches.",
    "One mark for each point.", ["Say why, when, who, what he taught and the result."]);
  ms(b, 4, "ANALYSIS", 6, "Explain **two** ways in which Catholic and Protestant churches differ.",
    [["Authority: Catholics accept the pope as head of the Church and give weight to tradition", 1], ["Developed: Protestants stress the Bible alone as the final authority, so they have no pope and organise differently", 2], ["Sacraments: Catholics keep seven sacraments", 1], ["Developed: most Protestants keep two, baptism and Holy Communion, because they believe only these were set up by Jesus", 2]],
    "Catholics accept the pope as head of the Church and give weight to tradition, whereas Protestants stress the Bible as the final authority, so they have no pope and organise differently. Catholics keep seven sacraments, while most Protestants keep two, baptism and Holy Communion, because they believe only these were instituted by Jesus.",
    "Two differences, each stated and developed.", ["One difference about authority, one about sacraments."]);

  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "a conversation between two fictional students, Tendai and Nokuthula, in a Gweru school, 2026",
      "Tendai: My church is Catholic and the pope is our leader. We keep seven sacraments.\nNokuthula: Mine is Methodist. We have two, baptism and communion. But we both pray the Lord's Prayer, and our ministers sometimes lead joint services."
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({ label: "(a)", stem: "Which of these is a Protestant church?",
        options: [["The Methodist Church", "Correct: Methodists belong to the Protestant family."], ["The Roman Catholic Church", "This is the Catholic Church, led by the pope."], ["The Greek Orthodox Church", "This is an Orthodox church."], ["The Church of Rome in 1054", "This is a church before the Reformation."]],
        answer: "A", explanation: "Methodists follow the teaching of John Wesley and belong to the Protestant family." }),
      pm({ label: "(b)", marks: 3, stem: "Using Source A, state **three** differences or similarities between the students' churches.",
        points: ["Tendai's church has the pope as its leader", "Catholics keep seven sacraments while Methodists keep two", "Both pray the Lord's Prayer, or hold joint services"],
        modelAnswer: "Source A shows that Tendai's church has the pope as its leader, that Catholics keep seven sacraments while Methodists keep two, and that both pray the Lord's Prayer." }),
      pm({ label: "(c)", marks: 4, stem: "Explain why churches hold joint services or work together.",
        points: [["They share central beliefs, such as belief in Jesus and the Bible", 1], ["Jesus prayed for his followers to be one (John 17)", 1], ["Joint action can help the poor, for example food relief", 1], ["It shows unity and gives a stronger witness to society", 1]],
        modelAnswer: "Churches work together because they share central beliefs such as belief in Jesus and the Bible, and because Jesus prayed that his followers would be one. Joint action can help the poor, for example through food relief, and it gives a stronger witness to society." }),
    ],
    hints: ["In (c) think of shared belief, the prayer for unity and practical action."],
    explanation: "Source A shows differences and common ground; (c) asks why churches co-operate." });
  b.struct({ d: 4, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "Chipo says: \"Christian denominations are a weakness, because they divide believers.\" Her classmate Thandeka says: \"Different traditions help different people to worship in ways that suit them.\"",
    parts: [
      pm({ label: "(a)", marks: 4, stem: "Outline **two** features of Pentecostal churches.",
        points: [["Emphasis on the work of the Holy Spirit and spiritual gifts", 1], ["Lively, spontaneous worship with music and prayer", 1], ["Prayer for healing", 1], ["Rapid growth in Africa", 1]],
        modelAnswer: "Pentecostal churches emphasise the work of the Holy Spirit and spiritual gifts. Their worship is lively and spontaneous, with music and prayer for healing." }),
      pm({ label: "(b)", marks: 4, stem: "Explain how African Independent Churches differ from missionary-founded churches.",
        points: [["They were founded by Africans, not by European missionary societies", 2], ["They include African forms of worship such as song, dance, prophecy and healing, which make the faith feel at home", 2]],
        modelAnswer: "African Independent Churches were founded by Africans and not by European missionary societies. They include African forms of worship such as song, dance, prophecy and healing, which help believers to feel that the faith is at home in their own culture." }),
      pm({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 220 }, stem: "Assess the view that denominations weaken Christianity.",
        points: [["For: divisions can cause rivalry, confuse believers and weaken the Church's joint witness", 2], ["Against: different traditions suit different cultures and personalities; churches also co-operate through ecumenical bodies", 2], ["A supported judgement", 2]],
        levels: levels(6),
        modelAnswer: "Divisions can cause rivalry and confusion, and they may weaken the Church's joint witness. However, different traditions suit different cultures and personalities, and churches co-operate through bodies such as the Zimbabwe Council of Churches. On balance, denominations bring both strengths and weaknesses; their effect depends on whether the churches respect and work with one another." }),
    ],
    hints: ["Give the case for weakness, the case for strength, then judge."],
    explanation: "A balanced answer gives both views and a judgement." });

  b.card("DEFINITION", "What is a **denomination**?", "A particular church or group of churches within Christianity, such as the Catholic or Methodist Church.");
  b.card("DEFINITION", "What is **ecumenism**?", "The movement for unity and co-operation among Christians of different churches.");
  b.card("FACT", "What was the Great Schism?", "The split in 1054 between the Church of Rome (Catholic) and the Church of Constantinople (Orthodox).");
  b.card("FACT", "Who began the Reformation and when?", "Martin Luther, in 1517, by publishing ninety-five points for debate.");
  b.card("FACT", "How many sacraments do Catholics and most Protestants keep?", "Catholics and Orthodox: seven. Most Protestants: two (baptism and Holy Communion).");
  b.card("FACT", "Who founded the Church of England?", "King Henry VIII, who broke with the pope in the 1530s.");
  b.card("FACT", "Name the three ecumenical bodies in Zimbabwe.", "The Zimbabwe Council of Churches, the Zimbabwe Catholic Bishops' Conference and the Evangelical Fellowship of Zimbabwe.");
  b.card("CONCEPT", "What marks a Pentecostal church?", "Emphasis on the Holy Spirit, healing, spiritual gifts and lively worship.");
  b.card("CONCEPT", "What is an African Independent Church?", "A church founded by Africans that combines Christian faith with African forms of worship such as song, dance, prophecy and healing.");
});
