// W2b: the early Church and the spread of Christianity.
import { concept, P, source, ref, levels } from "../lib.mjs";
import { mc, ms, pm } from "../tables/w2b-helpers.mjs";

concept("frs.christianity.early-church", { file: "christianity/early-church", keyPrefix: "christianity.early-church" }, (b) => {
  mc(b, 1, "RECALL", "Which event do Christians remember at Pentecost?",
    ["The coming of the Holy Spirit on the disciples", "Correct: Acts 2 tells of the Spirit coming on the disciples in Jerusalem."],
    [["The birth of Jesus in Bethlehem", "That is celebrated at Christmas."],
     ["The raising of Lazarus from the dead in Bethany", "That is a miracle recorded in John 11."],
     ["The baptism of Jesus in the river Jordan", "That is remembered at Epiphany in many churches."]],
    "At **Pentecost** (Acts 2) Christians remember the coming of the Holy Spirit. It is often called the birthday of the Church.");
  mc(b, 2, "UNDERSTANDING", "Who was Saul, who became the apostle Paul?",
    ["A Pharisee who first opposed the Christians", "Correct: he met the risen Jesus on the road to Damascus (Acts 9)."],
    [["A fisherman from Galilee who was one of the twelve", "That describes Peter, not Paul."],
     ["The Roman governor who ordered the crucifixion", "That was Pontius Pilate."],
     ["The emperor who ended the persecution of Christians", "That was Constantine, in the fourth century."]],
    "**Saul** was a Pharisee from Tarsus who persecuted Christians until his conversion (Acts 9). He became known as **Paul**.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What did the Council of Jerusalem (Acts 15) decide?",
    ["Gentile believers did not have to be circumcised", "Correct: non-Jews could join without keeping the whole Jewish law."],
    [["All Christians must keep every Jewish food law", "The council decided against requiring the full law of Gentiles."],
     ["The Bible would be limited to the four Gospels", "The canon was settled much later, and not at this meeting."],
     ["Sunday would replace Saturday as the only day of worship", "That was not the question at the Council."]],
    "At the Council of Jerusalem the apostles decided that **Gentile believers need not be circumcised**. This opened the Church to all nations.");
  mc(b, 3, "APPLICATION", "A history teacher in Mutare tells the class that in 313 CE two emperors gave Christians freedom of worship and the return of their property. Which event is she describing?",
    ["The Edict of Milan", "Correct: Constantine and Licinius issued it in 313 CE."],
    [["The Council of Nicaea", "Nicaea met in 325 CE to deal with the teaching of Arius."],
     ["The Council of Jerusalem", "That meeting is described in Acts 15 and dealt with Gentile believers."],
     ["The Great Schism", "That split in the Church came in 1054."]],
    "The **Edict of Milan** (313 CE) gave Christians freedom of worship. Christianity became the official religion later, in 380.", { hints: ["Which edict is dated 313?"] });
  mc(b, 3, "APPLICATION", "Which of these places was a centre of early African Christianity?",
    ["Alexandria in Egypt", "Correct: it was a centre of Christian learning in the early centuries."],
    [["Great Zimbabwe in Mashonaland", "Christianity reached this region much later, with Portuguese and later missionaries."],
     ["Antioch in Asia Minor", "Antioch was an early centre, but it is not in Africa."],
     ["Rome in Italy", "Rome was an early centre, but it is in Europe."]],
    "**Alexandria** in Egypt, **Carthage** in North Africa and **Aksum** in Ethiopia were early African centres.", { hints: ["Choose the African city that was an early centre of learning."] });
  mc(b, 3, "ANALYSIS", "Which statement about the spread of Christianity in Africa is accurate?",
    ["Christianity reached Egypt, North Africa and Ethiopia centuries before missions to Zimbabwe", "Correct: African churches such as the Ethiopian Orthodox Church are among the oldest."],
    [["Christianity came to the continent of Africa for the first time with nineteenth-century missionaries", "Christianity was present in Africa in the early centuries."],
     ["Christianity was brought to Ethiopia by the Portuguese in the sixteenth century", "Aksum adopted Christianity in the fourth century, under King Ezana."],
     ["Christianity spread only among the Roman soldiers who lived in North Africa", "Egyptians, Berbers and others became Christians, and the Church there produced leading writers."]],
    "Christianity is present in Africa from the early centuries, in Egypt, North Africa and Aksum. The Ethiopian church is one of the oldest in the world.", { hints: ["Think of Alexandria, Carthage and Aksum."] });
  mc(b, 4, "ANALYSIS", "Which reason best explains why the Council of Jerusalem was important for the growth of Christianity?",
    ["It allowed non-Jews to join without first adopting the Jewish law", "Correct: this made the faith open to every nation."],
    [["It ended all persecution of Christians in the Roman Empire", "Persecution continued until the fourth century."],
     ["It chose Rome as the capital of the Christian world", "The council did not decide on a capital city."],
     ["It produced the Nicene Creed to settle the teaching of Arius", "That creed came from Nicaea in 325 and Constantinople in 381."]],
    "By ruling that Gentiles need not be circumcised, the council made Christianity open to people of every nation, not only to Jews.", { hints: ["Ask what barrier the decision removed for Gentiles."] });

  b.tf({ d: 1, skill: "RECALL", stem: "According to Acts 2, Peter preached at Pentecost and about three thousand people were baptised.", answer: true,
    explanation: "True. Acts 2 says that Peter explained that Jesus was the Messiah and many were baptised that day." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "The Council of Nicaea in 325 CE accepted the teaching of Arius that the Son was created and not equal to the Father.", answer: false,
    explanation: "False. The council rejected the teaching of Arius and affirmed that the Son shares the same being as the Father." });

  b.match({ d: 3, skill: "UNDERSTANDING",
    stem: "Match each person with their role in the early Church or in its history.",
    pairs: [["Peter", "leader of the apostles who preached at Pentecost"], ["Paul", "apostle to the Gentiles who made missionary journeys"], ["Constantine", "emperor who supported the Church after the Edict of Milan"], ["Ezana", "king of Aksum who adopted Christianity in the fourth century"]],
    hints: ["Think of Acts, Rome and Ethiopia."],
    explanation: "Peter: Pentecost. Paul: journeys and letters. Constantine: Milan, Nicaea. Ezana: Aksum." });

  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct words.",
    template: "On the road to {{blank:a}}, Saul met the risen Jesus, and his story is told in Acts chapter {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["Damascus"], choices: ["Damascus", "Jericho", "Emmaus", "Rome"] }, { id: "b", accepted: ["9"], choices: ["2", "9", "15", "28"] }],
    explanation: "Saul's conversion on the road to **Damascus** is in Acts **9**." });
  b.fib({ d: 3, skill: "UNDERSTANDING", stem: "Choose the correct words.",
    template: "The emperor {{blank:a}} issued the Edict of Milan in {{blank:b}} CE.",
    blanks: [{ id: "a", accepted: ["Constantine"], choices: ["Constantine", "Nero", "Diocletian", "Augustus"] }, { id: "b", accepted: ["313"], choices: ["70", "313", "1054", "1517"] }],
    hints: ["He later called the Council of Nicaea."],
    explanation: "**Constantine** (with Licinius) issued the Edict of Milan in **313** CE." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the Council held in 325 CE that rejected the teaching of Arius.",
    accepted: ["Nicaea", "Council of Nicaea", "Nicea", "First Council of Nicaea"], wrong: ["Jerusalem", "Milan"],
    explanation: "The **Council of Nicaea** met in 325 CE. The Nicene Creed grew out of its debate." });

  ms(b, 3, "UNDERSTANDING", 3, "Outline **three** events of Pentecost as told in Acts 2.",
    ["The disciples were gathered together in Jerusalem", "A sound like wind and signs like fire appeared and they were filled with the Holy Spirit", "They spoke in languages that visitors from many lands understood", "Peter preached that Jesus was the Messiah who had risen", "About three thousand people were baptised"],
    "The disciples were together in Jerusalem when the Holy Spirit came upon them, with a sound like wind and signs like fire. They spoke in languages that visitors understood, and Peter preached, after which about three thousand people were baptised.",
    "One mark for each event, to a maximum of three.", ["Say where they were, what happened, and what followed."]);
  ms(b, 3, "UNDERSTANDING", 4, "Describe the conversion of Saul (Paul) as told in Acts 9.",
    [["Saul was travelling to Damascus to arrest Christians", 1], ["A light from heaven struck him down and the risen Jesus spoke to him", 1], ["He was blind for a time and a believer named Ananias was sent to him", 1], ["He was baptised and began to preach that Jesus is the Son of God", 1]],
    "Saul was travelling to Damascus to arrest Christians when a light from heaven struck him down and the risen Jesus spoke to him. He was blind for a time until a believer named Ananias came to him. He was then baptised and began to preach that Jesus is the Son of God.",
    "One mark for each stage.", ["Say why he travelled, what happened on the road, and what followed."]);
  ms(b, 4, "ANALYSIS", 6, "Explain **two** reasons why Christianity spread so quickly in the first three centuries.",
    [["The missionary work of apostles such as Paul", 1], ["Developed: Paul travelled through Asia Minor and Europe, founded churches and wrote letters, which carried the Gospel to Gentiles", 2], ["The courage of martyrs under persecution", 1], ["Developed: believers who died rather than give up their faith impressed others, so the Church kept growing", 2]],
    "Christianity spread because of missionary work such as that of Paul, who travelled through Asia Minor and Europe, founded churches and wrote letters that carried the Gospel to Gentiles. It also spread because of the courage of martyrs: believers who died rather than give up their faith impressed others, so the Church kept growing.",
    "Two reasons, each stated (1) and developed (2 across the reason).", ["Think of missionary journeys and of the witness of martyrs; develop each."]);

  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "an extract from a fictional school history project in Gweru, 2026",
      "Early Christians were suspected because they would not worship the emperor. Some were put to death. Early in the fourth century the emperors gave freedom of worship. Later bishops met at Nicaea to settle a dispute about Christ. Long before missionaries came to Zimbabwe, the Church was strong in Alexandria, Carthage and Aksum."
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({ label: "(a)", stem: "Which was the reason given in Source A for suspicion of early Christians?",
        options: [["They would not worship the emperor", "Correct: Source A says this."], ["They refused to pay any taxes to Rome", "Source A does not say this."], ["They came from the city of Alexandria", "Source A does not link suspicion with Alexandria."], ["They were soldiers in the Roman army", "Source A does not say this."]],
        answer: "A", explanation: "Source A says early Christians were suspected because they would not worship the emperor." }),
      pm({ label: "(b)", marks: 3, stem: "Using Source A, state **three** facts about the early Church.",
        points: ["Christians were suspected and some were put to death", "Early in the fourth century the emperors gave freedom of worship", "The bishops at Nicaea settled a dispute about Christ, or the Church was strong in Africa (Alexandria, Carthage, Aksum)"],
        modelAnswer: "Source A says that early Christians were suspected and some were put to death, that the emperors gave freedom of worship early in the fourth century, and that the bishops met at Nicaea to settle a dispute about Christ." }),
      pm({ label: "(c)", marks: 4, stem: "Explain why the Edict of Milan was important for Christians.",
        points: [["It gave Christians freedom to worship", 1], ["It ended the threat of arrest for being Christian", 1], ["It returned property that had been taken from the churches", 1], ["It let the Church grow openly and prepared the way for Constantine's support", 1]],
        modelAnswer: "The Edict of Milan gave Christians freedom to worship, so they were no longer in danger of arrest for being Christians, and property taken from the churches was returned. It let the Church grow openly and prepared the way for the emperor's support." }),
    ],
    hints: ["In (c) think of freedom, safety and property."],
    explanation: "Source A summarises the period; (c) asks why 313 mattered." });
  b.struct({ d: 4, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "Thandeka says: \"Paul was the most important person in the early Church after Jesus.\" Her classmate Themba replies: \"Peter, and the ordinary believers who met in homes, mattered just as much.\"",
    parts: [
      pm({ label: "(a)", marks: 4, stem: "Outline **two** journeys or activities of Paul as told in Acts.",
        points: [["First journey with Barnabas to Cyprus and Galatia (Acts 13-14)", 1], ["Second journey with Silas through Asia Minor to Philippi, Athens and Corinth (Acts 15-18)", 1], ["Third journey, including a long stay at Ephesus (Acts 18-21)", 1], ["Journey to Rome as a prisoner (Acts 27-28)", 1]],
        modelAnswer: "On his first journey Paul travelled with Barnabas to Cyprus and Galatia and many Gentiles believed. On his second journey he went with Silas to Philippi, Athens and Corinth, so the Gospel entered Europe." }),
      pm({ label: "(b)", marks: 4, stem: "Explain why Paul's letters are important to Christians.",
        points: [["They form a large part of the New Testament", 1], ["Developed: Christians read them in worship and use them for teaching about faith and conduct", 1], ["They explain that salvation comes through faith in Jesus", 1], ["Developed: they guided the first churches in matters such as unity and love, and still guide churches today", 1]],
        modelAnswer: "Paul's letters form a large part of the New Testament, and Christians read them in worship and use them to teach about faith and conduct. They explain that salvation comes through faith in Jesus, and they guided the first churches in matters such as unity and love, as they still do today." }),
      pm({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 220 }, stem: "Assess the view that Paul was the most important person in the spread of early Christianity.",
        points: [["For: his journeys, churches and letters took the Gospel to Gentiles in Asia Minor and Europe", 2], ["Against: Peter led the first community, and many ordinary believers, merchants and martyrs spread the faith; the Council of Jerusalem was a joint decision", 2], ["A supported judgement", 2]],
        levels: levels(6),
        modelAnswer: "Paul was very important: his journeys founded churches in Asia Minor and Europe and his letters taught the first Christians. However, Peter led the early community, the Council of Jerusalem was a joint decision, and ordinary believers and martyrs also spread the faith. On balance Paul was one of the most important figures, but the spread of Christianity depended on many people." }),
    ],
    hints: ["Give the case for Paul, the case for others, then judge."],
    explanation: "A balanced answer gives Paul's contribution and the part played by others." });

  b.card("DEFINITION", "What is **Pentecost** for Christians?", "The festival remembering the coming of the Holy Spirit on the disciples in Jerusalem (Acts 2), fifty days after Easter; the birthday of the Church.");
  b.card("DEFINITION", "What is a **martyr**?", "A person who dies rather than give up their faith.");
  b.card("FACT", "What happened to Saul on the road to Damascus?", "A light struck him down and the risen Jesus spoke to him; he became the apostle Paul.", "Acts 9.");
  b.card("FACT", "What did the Council of Jerusalem decide?", "Gentile believers did not have to be circumcised.", "Acts 15.");
  b.card("FACT", "What did the Edict of Milan do, and when?", "In 313 CE it gave Christians freedom of worship and the return of property.", "Constantine and Licinius.");
  b.card("FACT", "Why was the Council of Nicaea called?", "To settle a dispute about the nature of Christ; it rejected the teaching of Arius (325 CE).");
  b.card("FACT", "Name three early centres of African Christianity.", "Alexandria (Egypt), Carthage (North Africa) and Aksum (Ethiopia).");
  b.card("FACT", "Which Ethiopian king adopted Christianity in the fourth century?", "Ezana of Aksum, helped by Frumentius.");
  b.card("CONCEPT", "Why did Christians suffer persecution under Rome?", "They refused to worship the emperor and the Roman gods, which made them seem disloyal.");
});
