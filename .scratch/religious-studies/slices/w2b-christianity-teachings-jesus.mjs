// W2b: the teachings of Jesus.
import { concept, P, source, ref, levels } from "../lib.mjs";
import { mc, ms, pm } from "../tables/w2b-helpers.mjs";

concept("frs.christianity.teachings-jesus", { file: "christianity/teachings-jesus", keyPrefix: "christianity.teachings-jesus" }, (b) => {
  mc(b, 1, "RECALL", "Where in the Gospels is the Sermon on the Mount found?",
    ["Matthew 5-7", "Correct: Matthew 5-7 contains the Beatitudes, the Lord's Prayer and the Golden Rule."],
    [["Mark 4-6, with the parable of the Sower", "Mark 4 contains the parable of the Sower, but not the Sermon on the Mount."],
     ["Luke 15-17", "Luke 15 contains parables of lost things; the Sermon on the Mount is in Matthew."],
     ["John 1-3", "John opens with the Word and the call of the first disciples."]],
    "The **Sermon on the Mount** is in **Matthew 5-7**.");
  mc(b, 2, "UNDERSTANDING", "What is a parable?",
    ["A short story from everyday life that carries a spiritual meaning", "Correct: Jesus used farming, family and travel to teach."],
    [["A prayer of thanks recited by the whole congregation", "A parable is a story, not a prayer."],
     ["A list of laws given to a nation by a prophet", "Laws are different from the stories Jesus told."],
     ["A song of praise sung in a church service", "A hymn or chorus is sung; a parable is told."]],
    "A **parable** is a story from daily life with a deeper meaning. Examples are the Sower and the Lost Sheep.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which parable teaches that a neighbour is anyone in need, whatever their group?",
    ["The Good Samaritan", "Correct: a Samaritan helps the wounded man when others pass by."],
    [["The Sower", "The Sower is about how people respond to God's word."],
     ["The Lost Sheep", "The Lost Sheep is about God's care for each person."],
     ["The Prodigal Son and his brother", "The Prodigal Son is about forgiveness and welcome."]],
    "The **Good Samaritan** (Luke 10:25-37) answers the question \"Who is my neighbour?\".");
  mc(b, 3, "APPLICATION", "Nokuthula tells her cousin that God, like a shepherd who leaves ninety-nine sheep to look for one, cares for each person. Which parable is she using?",
    ["The Lost Sheep (Luke 15:1-7)", "Correct: the shepherd searches until the lost sheep is found."],
    [["The Sower (Mark 4:1-20)", "The Sower involves seed and soils, not a flock."],
     ["The Good Samaritan (Luke 10:25-37)", "This is a story of a traveller and a helper on a road."],
     ["The Prodigal Son (Luke 15:11-32)", "This is a story of a family and a returning son."]],
    "The **Lost Sheep** shows that God values each person and rejoices when someone returns.", { hints: ["Which story has a shepherd and a flock?"] });
  mc(b, 3, "APPLICATION", "A Form 2 class agrees to treat each other as they would like to be treated. Which teaching of Jesus does this match?",
    ["The Golden Rule in Matthew 7:12", "Correct: do for others what you would want them to do for you."],
    [["The Lord's Prayer in Matthew 6:9-13", "The Lord's Prayer is a model prayer, not a rule for treating people."],
     ["The Beatitudes in Matthew 5:3-12", "The Beatitudes describe blessed people rather than state one rule."],
     ["The parable of the Sower in Mark 4:1-20", "This parable is about responding to God's word."]],
    "The **Golden Rule** (Matthew 7:12) is the teaching that we should treat others as we would want to be treated.", { hints: ["Think of the saying that sums up how to treat others."] });
  mc(b, 3, "ANALYSIS", "Which statement best explains why Jesus joined two commandments in the passage about the greatest commandment?",
    ["He showed that love of God and love of neighbour belong together", "Correct: the two commands from the Jewish scriptures form the centre of his teaching."],
    [["He wanted to replace the whole Jewish law with a single new rule", "He says elsewhere that he came to fulfil the law, not abolish it."],
     ["He meant that only people of one nation should be treated as neighbours", "The Good Samaritan shows that the neighbour is anyone in need."],
     ["He taught that obedience is less important than public prayer", "He taught that sincere love is central; he criticised show in prayer."]],
    "Jesus joined Deuteronomy 6:4-5 and Leviticus 19:18, so that love of God and love of neighbour belong together.", { hints: ["He quotes two commands from the Jewish scriptures."] });
  mc(b, 4, "ANALYSIS", "Which reading of the parable of the Prodigal Son is supported by Luke 15:11-32?",
    ["The father welcomes the returning son, and the elder brother is warned against bitterness", "Correct: both the father's welcome and the elder son's complaint are part of the story."],
    [["The younger son is punished harshly for wasting his share of the family property", "The father runs to welcome him and holds a feast."],
     ["The elder brother is praised for refusing to join the celebration", "The story ends with the father urging him to rejoice."],
     ["The parable teaches that wealth is the reward of the faithful son", "The story is about forgiveness and welcome, not wealth as a reward."]],
    "In Luke 15:11-32 the father welcomes his son, and the elder brother's anger shows the risk of bitterness. Christians read the father as God.", { hints: ["Look at what the father does and at what he says to the elder son."] });

  b.tf({ d: 1, skill: "RECALL", stem: "The Lord's Prayer is found in the Sermon on the Mount in Matthew 6.", answer: true,
    explanation: "True. The Lord's Prayer is in Matthew 6:9-13." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Jesus said that he had come to abolish the law and the prophets.", answer: false,
    explanation: "False. In Matthew 5:17-20 he says he came to fulfil the law and the prophets." });

  b.match({ d: 3, skill: "UNDERSTANDING",
    stem: "Match each parable with its meaning for Christians.",
    pairs: [["The Good Samaritan", "love your neighbour, whoever is in need"], ["The Prodigal Son", "God forgives and welcomes those who return"], ["The Lost Sheep", "God values every person and rejoices at their return"], ["The Sower", "people respond to God's word in different ways"]],
    hints: ["Think of the setting of each story: road, family, flock, field."],
    explanation: "Good Samaritan: neighbourly love. Prodigal Son: forgiveness. Lost Sheep: God's care. Sower: different responses." });

  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct words.",
    template: "The first blessings of the Sermon on the Mount are called the {{blank:a}}, and they are found in Matthew chapter {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["Beatitudes"], choices: ["Beatitudes", "Commandments", "Parables", "Epistles"] }, { id: "b", accepted: ["5"], choices: ["1", "5", "10", "28"] }],
    explanation: "The **Beatitudes** are in Matthew 5:3-12." });
  b.fib({ d: 3, skill: "UNDERSTANDING", stem: "Choose the correct words.",
    template: "A tax collector who promised to give half his possessions to the poor after Jesus stayed at his house was {{blank:a}}, in {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["Zacchaeus"], choices: ["Zacchaeus", "Nicodemus", "Bartimaeus", "Lazarus"] }, { id: "b", accepted: ["Luke 19:1-10"], choices: ["Luke 19:1-10", "Mark 4:1-20", "Matthew 6:9-13", "John 20:1-18"] }],
    hints: ["He climbed a tree to see Jesus."],
    explanation: "**Zacchaeus** is in Luke 19:1-10. He repaid those he had cheated and gave to the poor." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the prayer that Jesus taught his followers, found in Matthew 6.",
    accepted: ["Lord's Prayer", "The Lord's Prayer", "Our Father", "the Our Father"], wrong: ["Hail Mary", "Creed"],
    explanation: "The **Lord's Prayer** (also called the Our Father) is found in Matthew 6:9-13." });

  ms(b, 3, "UNDERSTANDING", 3, "State **three** teachings from the Sermon on the Mount.",
    ["Blessed are the merciful, peacemakers and those who hunger for justice (Beatitudes)", "Love your enemies and pray for those who persecute you", "Treat others as you would want them to treat you (Golden Rule)", "Pray sincerely, using the Lord's Prayer as a model", "Do not put your trust in wealth or be anxious about daily needs"],
    "The Sermon on the Mount teaches that the merciful and the peacemakers are blessed, that believers should love their enemies, and that they should treat others as they would want to be treated.",
    "One mark for each teaching, to a maximum of three.", ["Think of the Beatitudes, love for enemies and the Golden Rule."]);
  ms(b, 3, "UNDERSTANDING", 4, "Describe the parable of the Good Samaritan.",
    [["A traveller on the road from Jerusalem to Jericho was robbed and left half dead", 1], ["A priest and a Levite saw him and passed by on the other side", 1], ["A Samaritan, from a group the Jews despised, helped him, bandaged his wounds and paid for his care", 1], ["Jesus asked who was the neighbour, and the answer was the one who showed mercy (Luke 10:25-37)", 1]],
    "A traveller was robbed and left half dead on the road. A priest and a Levite passed by, but a Samaritan, who belonged to a group the Jews despised, bandaged his wounds and paid for his care. Jesus asked which of the three was the neighbour, and the answer was the one who showed mercy.",
    "One mark for each stage of the story.", ["Tell the story in order: the robbery, those who passed by, the helper, the question."]);
  ms(b, 4, "ANALYSIS", 6, "Explain **two** lessons that Christians learn from the parable of the Prodigal Son.",
    [["God forgives those who return to him", 1], ["Developed: the father runs to welcome the son and holds a feast, so Christians believe that no one is too far gone to be forgiven", 2], ["Believers should not be bitter when others are forgiven", 1], ["Developed: the elder brother's anger shows the danger of pride, so Christians are urged to rejoice in the reconciliation of others", 2]],
    "Christians learn that God forgives those who return to him: the father runs to welcome the son and holds a feast, so they believe no one is too far gone to be forgiven. They also learn not to be bitter when others are forgiven, because the elder brother's anger shows the danger of pride and the need to rejoice when others are reconciled.",
    "Two lessons, each stated (1) and developed (2 across the lesson).", ["One lesson about God's forgiveness, one about the elder brother; develop each."]);

  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "a letter in a fictional church newsletter in Bulawayo, 2026",
      "Last month our youth group visited a children's home in Hwange. A younger member said that we should not decide who is worth helping, because anyone in need is a neighbour. Another reminded us that after a quarrel we should forgive again and again, not keep count."
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({ label: "(a)", stem: "Which parable teaches that a neighbour is anyone in need?",
        options: [[ref("Luke", 10, "25-37"), "Correct: the Good Samaritan."], [ref("Mark", 4, "1-20"), "This is the parable of the Sower."], [ref("Luke", 15, "11-32"), "This is the parable of the Prodigal Son."], [ref("Matthew", 6, "9-13"), "This is the Lord's Prayer."]],
        answer: "A", explanation: "The Good Samaritan (Luke 10:25-37) answers who our neighbour is." }),
      pm({ label: "(b)", marks: 3, stem: "Using Source A, state **three** ideas about how Christians should treat people.",
        points: ["Anyone in need is a neighbour, whoever they are", "Do not decide who is worth helping", "Forgive again and again"],
        modelAnswer: "Source A says that anyone in need is a neighbour, that Christians should not decide who is worth helping, and that they should forgive again and again." }),
      pm({ label: "(c)", marks: 4, stem: "Explain why Christians think that forgiveness is important.",
        points: [["Jesus taught forgiveness again and again (Matthew 18:21-35)", 1], ["In the Lord's Prayer believers ask God to forgive as they forgive others", 1], ["Forgiveness restores broken relationships in families and communities", 1], ["Christians believe that God forgives them, so they should forgive others", 1]],
        modelAnswer: "Jesus taught that forgiveness should be given again and again, and in the Lord's Prayer believers ask God to forgive them as they forgive others. Forgiveness restores broken relationships in families and communities, and Christians believe that because God forgives them, they should forgive others." }),
    ],
    hints: ["In (c) think of Jesus' teaching, the Lord's Prayer and the effect on relationships."],
    explanation: "Source A reflects the parable of the Good Samaritan and the teaching on forgiveness." });
  b.struct({ d: 5, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "Tafadzwa says: \"The teaching of Jesus about loving enemies is too hard to follow in a world with crime and conflict.\" Yusuf, a Muslim friend, says that his faith also teaches mercy and forgiveness, and that people of different religions can agree on some values.",
    parts: [
      pm({ label: "(a)", marks: 4, stem: "Outline **two** teachings of Jesus about enemies or forgiveness.",
        points: [["Love your enemies and pray for those who persecute you (Matthew 5:43-48)", 1], ["Forgive again and again, not just once (Matthew 18:21-35)", 1], ["Treat others as you would want to be treated (Matthew 7:12)", 1], ["Do not judge hypocritically (Matthew 7:1-5)", 1]],
        modelAnswer: "Jesus taught believers to love their enemies and pray for those who persecute them. He also taught that forgiveness should be given again and again, and not just once." }),
      pm({ label: "(b)", marks: 4, stem: "Explain how a Christian could follow the teaching to love enemies in a school or community.",
        points: [["Respond to bullying without revenge, for example by reporting it and praying for the bully", 2], ["Seek reconciliation, for example by offering to talk and to forgive after a quarrel", 2]],
        modelAnswer: "A Christian could respond to bullying without revenge, for example by reporting it and praying for the bully. A Christian could also seek reconciliation by offering to talk and to forgive after a quarrel, so that the relationship is repaired." }),
      pm({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 220 }, stem: "Assess the view that the teachings of Jesus are too hard to follow today.",
        points: [["For: love for enemies, forgiving repeatedly and not seeking revenge are difficult in a world of crime and conflict", 2], ["Against: many Christians do practise forgiveness and reconciliation, for example in families and in church work for peace", 2], ["A supported judgement", 2]],
        levels: levels(6),
        modelAnswer: "The teaching is hard because loving an enemy or forgiving repeatedly goes against the wish for revenge, especially after crime or conflict. However, many Christians do practise forgiveness and reconciliation, in families and in church work for peace, and Christians believe that God's help makes it possible. On balance the teaching is demanding but not impossible, and Christians see the difficulty as part of its purpose." }),
    ],
    hints: ["Give a reason it is hard, evidence that people do follow it, then judge."],
    explanation: "A balanced answer shows both the difficulty and examples of Christians who practise the teaching." });

  b.card("DEFINITION", "What is the **Kingdom of God**?", "The rule of God in the world and in people's lives, announced by Jesus in Mark 1:14-15.");
  b.card("DEFINITION", "What is a **parable**?", "A short story from daily life that carries a spiritual or moral meaning.");
  b.card("FACT", "Where is the Sermon on the Mount?", "Matthew 5-7. It includes the Beatitudes (5:3-12), the Lord's Prayer (6:9-13) and the Golden Rule (7:12).");
  b.card("FACT", "What is the Golden Rule?", "Treat others as you would want them to treat you.", "Matthew 7:12.");
  b.card("FACT", "Which parable answers \"Who is my neighbour?\"", "The Good Samaritan.", "Luke 10:25-37.");
  b.card("CONCEPT", "What does the Prodigal Son teach?", "That God forgives and welcomes those who return, and that others must not be bitter.", "Luke 15:11-32.");
  b.card("CONCEPT", "What does the Lost Sheep teach?", "That God values each person and rejoices when one who is lost is found.", "Luke 15:1-7.");
  b.card("FACT", "What are the two parts of the greatest commandment?", "Love God with all your heart, soul, mind and strength; and love your neighbour as yourself.", "Mark 12:28-34.");
  b.card("FACT", "Who was Zacchaeus?", "A chief tax collector who welcomed Jesus, promised to give half his possessions to the poor and to repay those he cheated.", "Luke 19:1-10.");
});
