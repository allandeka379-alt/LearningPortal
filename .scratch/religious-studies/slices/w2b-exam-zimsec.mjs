// W2b exam-format items: Paper 1 (Religions, topics 1-5) structured essay questions on Christianity, 25 marks = (a) 15 + (b) 10.
// Plans from EXAM in lib.mjs; the paper structure is our convention (reviewer to check).
import { concept, EXAM, checkExam } from "../lib.mjs";
import { ex } from "../tables/w2b-helpers.mjs";

const p1 = { skill: EXAM.ZIM_P1.skill, applies: EXAM.ZIM_P1.applies, secs: EXAM.ZIM_P1.secs, examStyle: true, paper: "Paper 1" };

concept("frs.christianity.jesus-life", { file: "exam/w2b-zimsec", keyPrefix: "exam.w2b-zimsec" }, (b) => {
  // 1. Paper 1: the life of Jesus.
  b.struct({
    ...p1, d: 4,
    concepts: ["frs.christianity.jesus-life"],
    stem: "This question is about the life of Jesus as the Gospels record it.",
    parts: checkExam(EXAM.ZIM_P1, [
      ex("(a)", 15, "Describe the events of the last week of the life of Jesus, from the entry into Jerusalem to the resurrection.", [
        ["Jesus entered Jerusalem riding a donkey, and the crowds spread cloaks and branches before him (Mark 11:1-11); Christians remember this on Palm Sunday", 2],
        ["He taught in the Temple and clashed with the religious leaders, who began to plan how to arrest him", 2],
        ["At the Last Supper he shared bread and wine with his disciples and spoke of his body and a new covenant (Mark 14:22-25), the origin of the Eucharist", 2],
        ["He prayed in the garden of Gethsemane, where Judas Iscariot betrayed him and he was arrested", 2],
        ["He was questioned by the Jewish council (the Sanhedrin) and then brought before the Roman governor, Pontius Pilate", 2],
        ["Pilate gave the order and Jesus was crucified at Golgotha between two criminals; he died and was buried in a tomb", 2],
        ["On the third day the women found the tomb empty and were told that he had risen (Mark 16:1-8)", 2],
        ["The Gospels say the risen Jesus appeared to his disciples, and forty days later he ascended (Acts 1)", 1],
      ], "The last week of the life of Jesus began with his entry into Jerusalem, where he rode on a donkey while the crowds spread their cloaks and palm branches on the road (Mark 11). Christians remember this on Palm Sunday. He taught in the Temple and came into conflict with the religious leaders, who began to plan his arrest.\n\nOn the night before he died, Jesus shared the Last Supper with his twelve disciples. He took bread and wine and spoke of his body and of a new covenant, and Christians remember this in the Eucharist. He then prayed in the garden of Gethsemane, where he was betrayed by Judas Iscariot and arrested. He was questioned by the Jewish council and brought before the Roman governor, Pontius Pilate, who ordered his crucifixion. He was crucified at Golgotha between two criminals and was buried in a tomb.\n\nOn the third day the women who came to the tomb found it empty and were told that he had risen (Mark 16). According to the Gospels the risen Jesus appeared to his disciples, and after forty days he ascended into heaven (Acts 1).",
        "Two marks for each developed event in order, with the final mark for the appearances and the ascension. Credit any seven developed events. Gospel details differ; accept accounts from any Gospel."),
      ex("(b)", 10, "Explain the significance of the resurrection of Jesus for Christians today.", [
        ["It is the central Christian belief: Christians believe that God raised Jesus, which shows that his message and his mission were approved by God", 2],
        ["It shows victory over death and gives hope of life after death, which comforts believers at funerals and in bereavement (1 Corinthians 15)", 2],
        ["It is celebrated at Easter, the greatest festival, with services, dawn gatherings and special music", 2],
        ["It is the reason why Sunday, the day of the resurrection, is the weekly day of worship, so it shapes the life of the Church each week", 2],
        ["It gives believers courage and a reason to live as followers of Jesus, serving others and forgiving, trusting that evil and death do not have the last word", 2],
      ], "The resurrection is the most important belief in Christianity, because Christians believe that God raised Jesus from the dead, and that this shows that his message was approved by God. Paul wrote that if Christ had not been raised, then faith would be empty (1 Corinthians 15).\n\nIt is also significant because it gives believers hope of life after death. At a Christian funeral in Zimbabwe, the congregation sings of the resurrection and takes comfort from it. It is celebrated every year at Easter, the greatest festival, and every week on Sunday, the Lord's Day, when Christians gather to worship. Finally, it gives believers courage to live as followers of Jesus, to forgive and to serve others, trusting that evil and death do not have the last word.",
        "Level marking: developed explanation of several points of significance, linked to belief, worship and daily life, reaches the top levels. Do not penalise a candidate who writes in terms of Christian belief; the answer should not assert the resurrection as a fact."),
    ]),
    hints: ["In (a) put the events in order with places and names. In (b) link the resurrection to belief, worship and daily life."],
    explanation: "A Paper 1 style question: (a) describe the events of Holy Week, (b) explain the significance of the resurrection.",
  });

  // 2. Paper 1: parables of Jesus and love of neighbour.
  b.struct({
    ...p1, d: 4,
    concepts: ["frs.christianity.teachings-jesus"],
    stem: "This question is about the parables of Jesus.",
    parts: checkExam(EXAM.ZIM_P1, [
      ex("(a)", 15, "Describe the parable of the Good Samaritan and the parable of the Prodigal Son, and say what Christians learn from each.", [
        ["Good Samaritan: a lawyer asked Jesus what he must do to inherit eternal life and who his neighbour was (Luke 10:25-37)", 2],
        ["A traveller on the road from Jerusalem to Jericho was robbed, beaten and left half dead", 2],
        ["A priest and a Levite saw him and passed by on the other side; a Samaritan, from a group despised by the Jews, bandaged his wounds and paid for his care", 2],
        ["Lesson: a neighbour is anyone in need, whatever their race or religion, and love means practical help", 2],
        ["Prodigal Son: a younger son asked for his share of the property, wasted it and was reduced to feeding pigs (Luke 15:11-32)", 2],
        ["He returned in shame and his father ran to welcome him, put a robe and a ring on him, and held a feast", 2],
        ["The elder brother resented the celebration, but the father urged him to rejoice", 2],
        ["Lesson: God forgives those who return, and believers should not be bitter when others are forgiven", 1],
      ], "In the parable of the Good Samaritan (Luke 10), a lawyer asked Jesus who his neighbour was. Jesus told of a traveller who was robbed and left half dead on the road from Jerusalem to Jericho. A priest and a Levite saw him and passed by, but a Samaritan, who belonged to a group the Jews despised, bandaged his wounds, took him to an inn and paid for his care. Christians learn that a neighbour is anyone in need, and that love means practical help whatever a person's race or religion.\n\nIn the parable of the Prodigal Son (Luke 15), a younger son took his share of his father's property, wasted it and ended by feeding pigs. He returned in shame, but his father ran to welcome him, gave him a robe and a ring and held a feast. The elder brother was angry at the celebration, but the father urged him to join. Christians learn that God forgives those who return to him, and that believers should not be bitter when others are forgiven.",
        "Two marks for each developed point; the final mark for the lesson of the second parable. Credit accurate detail from the story and a lesson for each."),
      ex("(b)", 10, "How is the teaching of Jesus about love of neighbour relevant to Zimbabwe today?", [
        ["Care for the needy: churches run clinics, orphanages and feeding schemes, following the Good Samaritan and Matthew 25", 2],
        ["Breaking barriers: the Samaritan crossed boundaries of race, religion and class, which speaks to tribalism, xenophobia and prejudice", 2],
        ["Reconciliation and forgiveness: families and communities need to forgive after disputes and conflict (the Prodigal Son, Matthew 18)", 2],
        ["Personal life: pupils can apply the Golden Rule in schools, for example by resisting bullying and helping classmates in need", 2],
        ["A judgement: the teaching is demanding in a society with hardship and corruption, but many Christians show that it can be practised", 2],
      ], "The teaching on love of neighbour is relevant to Zimbabwe today in several ways. First, it calls Christians to care for the needy: church clinics, orphan care and feeding schemes follow the example of the Good Samaritan and the teaching of Matthew 25 that serving the hungry and the sick is service to Christ. Second, the Samaritan crossed boundaries of race and religion, which challenges tribalism, prejudice and hatred of foreigners.\n\nThird, the teaching on forgiveness, as in the Prodigal Son, is needed after disputes in families and communities. Fourth, pupils can apply the Golden Rule at school by resisting bullying and helping classmates in need. The teaching is demanding in a country with hardship and corruption, but many Christians show that it can be practised, so it remains relevant.",
        "Level marking: developed examples from Zimbabwe, each linked to a teaching or reference, with a view on relevance, reach the top levels."),
    ]),
    hints: ["In (a) tell each story in order and then give its lesson. In (b) give examples from Zimbabwe and link them to the teaching."],
    explanation: "A Paper 1 style question: (a) describe two parables and their lessons, (b) explain the relevance of love of neighbour.",
  });

  // 3. Paper 1: the early Church (Paul).
  b.struct({
    ...p1, d: 4,
    concepts: ["frs.christianity.early-church"],
    stem: "This question is about the apostle Paul and the spread of Christianity.",
    parts: checkExam(EXAM.ZIM_P1, [
      ex("(a)", 15, "Describe the conversion of Saul (Paul) and his missionary journeys.", [
        ["Saul was a Pharisee from Tarsus who persecuted the Christians and approved of the death of Stephen (Acts 7-8)", 2],
        ["He travelled to Damascus to arrest believers (Acts 9)", 2],
        ["A light from heaven struck him down and the risen Jesus spoke to him; he was blind for three days", 2],
        ["A believer named Ananias was sent to him; he regained his sight and was baptised, and began to preach that Jesus is the Son of God", 2],
        ["First journey (Acts 13-14): with Barnabas from Antioch to Cyprus and Galatia, where many Gentiles believed", 2],
        ["Second journey (Acts 15-18): with Silas through Asia Minor to Philippi, Athens and Corinth, where he founded churches", 2],
        ["Third journey (Acts 18-21) with a long stay in Ephesus; later he was arrested and taken to Rome (Acts 27-28), and he wrote letters to the churches", 3],
      ], "Saul was a Pharisee from Tarsus who persecuted the Christians and approved of the death of Stephen. He set out for Damascus to arrest believers there, but on the road a light from heaven struck him down and the risen Jesus spoke to him. He was blind for three days until a believer named Ananias came to him. He regained his sight, was baptised and began to preach that Jesus is the Son of God. He became known as Paul.\n\nPaul made three missionary journeys. On the first (Acts 13-14) he travelled with Barnabas to Cyprus and Galatia, and many Gentiles believed. On the second (Acts 15-18) he went with Silas through Asia Minor to Philippi, Athens and Corinth and founded churches. On the third (Acts 18-21) he spent a long time in Ephesus. He was later arrested in Jerusalem and sent to Rome (Acts 27-28), and he wrote letters to the churches that became part of the New Testament.",
        "Two marks for each developed point; three for the third journey, the arrest and the letters. Credit accurate detail from Acts."),
      ex("(b)", 10, "Explain the significance of the work of Paul for the spread of Christianity.", [
        ["He took the Gospel to the Gentiles, so Christianity became a faith for every nation and not only for Jews", 2],
        ["He founded churches in Asia Minor and Europe, which became centres from which the faith spread further", 2],
        ["His letters to the churches form a large part of the New Testament and still guide Christian belief and conduct", 2],
        ["He argued at the Council of Jerusalem (Acts 15) that Gentiles need not be circumcised, which opened the Church to all", 2],
        ["His courage and suffering for the faith (arrests, imprisonment, shipwreck) inspired later believers, though others such as Peter also shaped the early Church", 2],
      ], "Paul was significant because he took the Gospel to the Gentiles, so that Christianity became a faith for every nation and not only for the Jews. He founded churches in Asia Minor and Europe, such as those at Philippi and Corinth, which became centres from which the faith spread. At the Council of Jerusalem he supported the decision that Gentiles need not be circumcised, which opened the Church to all.\n\nHis letters form a large part of the New Testament and still guide Christian belief and conduct. His courage and suffering, in prison and shipwreck, inspired later believers. Other leaders such as Peter also shaped the early Church, but without Paul's journeys and letters the spread of Christianity would have been much slower.",
        "Level marking: developed explanation of several ways Paul affected the spread of the faith, with a brief judgement, reaches the top levels."),
    ]),
    hints: ["In (a) tell the conversion in order, then the three journeys. In (b) link each point to the spread of the faith."],
    explanation: "A Paper 1 style question: (a) describe Paul's conversion and journeys, (b) explain his significance.",
  });

  // 4. Paper 1: Christianity in Zimbabwe and the AICs.
  b.struct({
    ...p1, d: 4,
    concepts: ["frs.christianity.zimbabwe"],
    stem: "This question is about the coming of Christianity to Zimbabwe and African Independent Churches.",
    parts: checkExam(EXAM.ZIM_P1, [
      ex("(a)", 15, "Describe how Christianity came to Zimbabwe and the work of the early missions.", [
        ["In 1561 the Portuguese Jesuit Gonçalo da Silveira reached the court of the Mutapa and baptised members of the court", 2],
        ["Silveira was killed the same year, and the mission did not last", 2],
        ["In 1859 the London Missionary Society opened a station at Inyati in the Ndebele kingdom, with the permission of King Mzilikazi", 2],
        ["The first missionaries made few converts, but they began teaching reading and writing and translating parts of the Bible", 2],
        ["After the 1890s more missions arrived: Jesuits, Methodists, Anglicans, the Dutch Reformed Church, the Salvation Army, Seventh-day Adventists and the Brethren in Christ", 2],
        ["Missions built schools that taught reading, writing and trades, and trained teachers and leaders", 2],
        ["They built clinics and hospitals, translated the Bible into Shona and Ndebele, and taught farming and building skills; they were also linked with colonisation", 3],
      ], "Christianity first came to the interior in 1561, when the Portuguese Jesuit Gonçalo da Silveira reached the court of the Mutapa and baptised members of the court. He was killed the same year and the mission did not last. In 1859 the London Missionary Society opened a station at Inyati, in the Ndebele kingdom, with the permission of King Mzilikazi. The first missionaries made few converts, but they began teaching reading and writing and translating the Bible.\n\nAfter the 1890s many more missions arrived, including the Jesuits, Methodists, Anglicans, the Dutch Reformed Church, the Salvation Army, Seventh-day Adventists and the Brethren in Christ. They built schools that taught reading, writing and trades and trained teachers and leaders. They also built clinics and hospitals, translated the Bible into Shona and Ndebele and taught farming and building. At the same time they were linked with colonisation, and some criticised African customs.",
        "Two marks for each developed point; three for the final point on health, translation and the link with colonisation. Credit any seven developed points."),
      ex("(b)", 10, "Explain the significance of African Independent (Apostolic) Churches in Zimbabwe.", [
        ["They are led by Africans and give Africans leadership roles that were often reserved for Europeans in mission churches", 2],
        ["Their worship uses African music, drumming, dance and prophecy, so the faith feels at home in African culture", 2],
        ["They offer prayer for healing, spiritual care and discipline, which attracts many members", 2],
        ["They give a strong sense of community and belonging, with large gatherings at Easter and other times", 2],
        ["They are debated: critics raise concerns about the refusal of medical treatment in some cases and about leadership, while members value their spiritual care", 2],
      ], "African Independent Churches such as the Apostolic churches of Johane Masowe and Johane Marange are significant, first, because they are led by Africans, who hold leadership roles that were often reserved for Europeans in mission churches. Their worship uses African music, drumming, dance and prophecy, so that the faith feels at home in African culture.\n\nThey also offer prayer for healing, spiritual care and discipline, and give members a strong sense of belonging, with large gatherings at Easter and other times. Their significance is debated: critics raise concerns about the refusal of medical treatment in some cases and about leadership, while members value the spiritual care and community they receive. Whatever the view, they are an important part of Christianity in Zimbabwe today.",
        "Level marking: developed explanation of several points of significance, including a balanced view, reaches the top levels. Descriptions must be respectful."),
    ]),
    hints: ["In (a) go in order: Silveira, Inyati, the later missions and their work. In (b) give reasons for the importance of the AICs and a balanced view."],
    explanation: "A Paper 1 style question: (a) describe the coming of Christianity and the missions, (b) explain the significance of the AICs.",
  });

  // 5. Paper 1: sacraments.
  b.struct({
    ...p1, d: 4,
    concepts: ["frs.christianity.sacraments-rites"],
    stem: "This question is about the sacraments of baptism and the Eucharist.",
    parts: checkExam(EXAM.ZIM_P1, [
      ex("(a)", 15, "Describe the ceremony of baptism and the service of the Eucharist (Holy Communion) in the Christian churches.", [
        ["Baptism is the entry into the Church, based on the baptism of Jesus and the command in Matthew 28:19", 2],
        ["In infant baptism, parents and godparents bring the baby, make promises and the priest or minister pours or sprinkles water in the name of the Father, the Son and the Holy Spirit", 2],
        ["In believers' baptism (Baptist, Pentecostal and many AICs), a person who has decided to follow Jesus declares their faith and is usually immersed in water", 2],
        ["Water stands for washing away sin and for new life; some churches also give a candle or clothing, and the person is welcomed into the congregation", 2],
        ["The Eucharist goes back to the Last Supper (Mark 14:22-25); the minister or priest takes bread and wine, gives thanks and repeats the words of Jesus", 2],
        ["The congregation receives the bread and wine (or juice) in memory of the death of Jesus, often after prayers and readings", 2],
        ["Churches differ: Catholics teach that the bread and wine become the body and blood of Christ, while many Protestants see them as a memorial", 3],
      ], "Baptism is the rite of entry into the Church, based on the baptism of Jesus and his command to baptise in the name of the Father, the Son and the Holy Spirit (Matthew 28:19). In infant baptism the parents and godparents bring the baby, make promises on the child's behalf, and the priest or minister pours or sprinkles water. In believers' baptism, practised by Baptist, Pentecostal and many African Independent Churches, a person who has decided to follow Jesus declares his or her faith and is usually immersed in water. Water stands for washing away sin and for new life, and the person is welcomed into the congregation.\n\nThe Eucharist, also called Holy Communion or the Lord's Supper, goes back to the Last Supper (Mark 14). The priest or minister takes bread and wine, gives thanks and repeats the words of Jesus, and the congregation receives them in memory of his death. Churches understand it differently: Catholics teach that the bread and wine become the body and blood of Christ, while many Protestants see them as a memorial.",
        "Two marks for each developed point; three for the final point on denominational differences. Credit descriptions of any church's practice, naming the church."),
      ex("(b)", 10, "Explain the significance of baptism and Holy Communion to Christians.", [
        ["Baptism is the entry into the Church, so the person becomes a member of the Christian family and is supported by it", 2],
        ["Baptism follows the example and command of Jesus, so it is an act of obedience and of public commitment", 2],
        ["Water stands for forgiveness and new life, reminding believers that they have been cleansed and can begin again", 2],
        ["Holy Communion remembers the Last Supper and the death of Jesus, and renews the believer's relationship with him", 2],
        ["Sharing bread and wine unites the congregation as one body and strengthens the believer's faith for daily life", 2],
      ], "Baptism and Holy Communion are significant because Jesus himself was baptised and shared the Last Supper, and Christians follow his example and command. Baptism is the entry into the Church: the person becomes a member of the Christian family and is supported by it. The water stands for forgiveness and new life, so believers are reminded that they have been cleansed and can begin again.\n\nHoly Communion remembers the Last Supper and the death of Jesus, and renews the believer's relationship with him. Sharing the bread and wine unites the congregation as one body and strengthens the believer for daily life. For Catholics the Eucharist is also the central act of worship, while many Protestants stress the memorial and the personal faith of the participant.",
        "Level marking: developed explanation of significance for both rites, linking to belief, community and daily life, reaches the top levels."),
    ]),
    hints: ["In (a) describe both rites in order and name the churches. In (b) explain what each means to believers."],
    explanation: "A Paper 1 style question: (a) describe baptism and the Eucharist, (b) explain their significance.",
  });

  // 6. Paper 1: Christian festivals.
  b.struct({
    ...p1, d: 4,
    concepts: ["frs.christianity.festivals"],
    stem: "This question is about Christian festivals.",
    parts: checkExam(EXAM.ZIM_P1, [
      ex("(a)", 15, "Describe how Christians observe Holy Week and Easter.", [
        ["Palm Sunday remembers the entry into Jerusalem; congregations hold processions with palm branches and sing", 2],
        ["Maundy Thursday remembers the Last Supper; Holy Communion is celebrated, and in some churches feet are washed", 2],
        ["Good Friday remembers the crucifixion; services are solemn, with the reading of the account of the trial and death of Jesus, and many fast", 2],
        ["Some churches follow the stations of the cross, venerate the cross or hold open-air services", 2],
        ["Holy Saturday is a day of waiting, and many churches hold a vigil service with candles", 2],
        ["Easter Sunday celebrates the resurrection with joyful services, often at dawn, with hymns, flowers and baptisms", 2],
        ["In Zimbabwe many churches hold special conventions and open-air gatherings at Easter, including apostolic churches that gather for several days of prayer, preaching and song", 3],
      ], "Holy Week begins with Palm Sunday, which remembers the entry of Jesus into Jerusalem; congregations hold processions and sing with palm branches. On Maundy Thursday Christians remember the Last Supper and celebrate Holy Communion, and some churches wash feet. On Good Friday they remember the crucifixion with solemn services and readings of the account of the trial and death of Jesus, and many fast. Some churches follow the stations of the cross, venerate the cross or hold open-air services.\n\nHoly Saturday is a day of waiting, and many churches hold a vigil with candles. Easter Sunday celebrates the resurrection with joyful services, often at dawn, with hymns, flowers and sometimes baptisms. In Zimbabwe many churches hold conventions and open-air gatherings at Easter, and apostolic churches gather for several days of prayer, preaching and song.",
        "Two marks for each developed point; three for the final point on Zimbabwean observance. Credit any accurate account of observance, naming the church where practices differ."),
      ex("(b)", 10, "Explain why Easter is the most important festival for Christians.", [
        ["It celebrates the resurrection, which Christians believe shows that Jesus is the Son of God and that his work was approved by God", 2],
        ["It shows victory over death and gives hope of life after death, which comforts believers (1 Corinthians 15)", 2],
        ["It is linked with forgiveness: the death and resurrection of Jesus are understood as restoring the relationship between God and humans", 2],
        ["Every Sunday is a small Easter, so the resurrection shapes weekly worship, and baptism also recalls dying and rising with Christ", 2],
        ["It brings believers together in the largest gatherings of the year, strengthening community and faith, and so is more important than Christmas, which remembers the birth", 2],
      ], "Easter is the most important festival because it celebrates the resurrection, which Christians believe shows that Jesus is the Son of God and that his work was approved by God. It also shows victory over death and gives hope of life after death, which comforts believers at funerals (1 Corinthians 15).\n\nIt is linked with forgiveness, since the death and resurrection of Jesus are understood as restoring the relationship between God and humanity. It also shapes weekly worship, because every Sunday remembers the resurrection, and baptism recalls dying and rising with Christ. Finally, Easter brings believers together in some of the largest gatherings of the year. For these reasons Christians regard it as more important than Christmas, which remembers the birth of Jesus.",
        "Level marking: developed explanation of why Easter has priority, linked to belief, hope and worship, reaches the top levels."),
    ]),
    hints: ["In (a) go through the days in order and give one detail for each. In (b) link Easter to the resurrection, hope and weekly worship."],
    explanation: "A Paper 1 style question: (a) describe Holy Week and Easter, (b) explain why Easter is the most important festival.",
  });
});
