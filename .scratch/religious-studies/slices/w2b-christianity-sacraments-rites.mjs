// W2b: sacraments and rites of passage in Christianity.
import { concept, P, source, ref, levels } from "../lib.mjs";
import { mc, ms, pm } from "../tables/w2b-helpers.mjs";

concept("frs.christianity.sacraments-rites", { file: "christianity/sacraments-rites", keyPrefix: "christianity.sacraments-rites" }, (b) => {
  mc(b, 1, "RECALL", "How many sacraments do the Catholic and Orthodox churches keep?",
    ["Seven", "Correct: baptism, confirmation, Eucharist, reconciliation, anointing, marriage and ordination."],
    [["Two", "Two is the usual number among Protestant churches."],
     ["Three", "Three is not the number kept by either church."],
     ["Ten", "Ten is the number of the commandments, not of sacraments."]],
    "Catholic and Orthodox churches have **seven** sacraments. Most Protestant churches keep two.");
  mc(b, 2, "UNDERSTANDING", "Which two rites do most Protestant churches keep?",
    ["Baptism and Holy Communion", "Correct: these two were commanded by Jesus."],
    [["Confirmation and ordination", "These are among the Catholic and Orthodox sacraments."],
     ["Reconciliation and anointing of the sick", "These are also among the seven Catholic sacraments."],
     ["Marriage and funeral rites", "These are rites of passage, but they are not the two ordinances."]],
    "Most Protestants keep **baptism** and **Holy Communion** as ordinances.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What does water stand for in Christian baptism?",
    ["Washing away sin and new life", "Correct: water is the sign of cleansing and new life."],
    [["The wealth and power of the church", "Water does not signify wealth."],
     ["The rain sent by ancestors", "That is an idea from Indigenous Religion, not Christian baptism."],
     ["The forty days Jesus spent in the wilderness", "The wilderness is a different story."]],
    "In baptism, water stands for **cleansing from sin and new life**.");
  mc(b, 3, "APPLICATION", "A teenager in a Pentecostal church publicly declares her faith and is immersed in a pool. Which type of baptism is this?",
    ["Believers' baptism", "Correct: it follows a personal decision to follow Jesus."],
    [["Infant baptism", "Infant baptism is for babies, brought by their parents."],
     ["Confirmation", "Confirmation confirms baptismal promises later in life."],
     ["Anointing of the sick", "This is a rite for the seriously ill."]],
    "**Believers' baptism** follows a personal decision, usually with full immersion.", { hints: ["Look at who decides to be baptised."] });
  mc(b, 3, "APPLICATION", "In a Catholic church, a priest hears a woman confess her sins and pronounces forgiveness. Which sacrament is this?",
    ["Reconciliation", "Correct: it is also called confession or penance."],
    [["Confirmation of baptismal vows", "Confirmation confirms baptismal promises."],
     ["Ordination", "Ordination sets apart a person as deacon, priest or bishop."],
     ["Marriage", "Marriage is the vows of a couple."]],
    "**Reconciliation** (confession) is the sacrament in which sins are confessed to a priest and forgiveness is pronounced.", { hints: ["Which sacrament involves confessing sins?"] });
  mc(b, 3, "ANALYSIS", "Which statement about the Eucharist is accurate?",
    ["Churches remember the Last Supper but explain Christ's presence differently", "Correct: Catholics speak of transubstantiation, many Protestants of a memorial."],
    [["All churches teach exactly the same about the bread and wine used", "Churches differ on how they understand it."],
     ["It is a rite found only in the Catholic Church and nowhere else", "Most Christian churches have it, under different names."],
     ["It remembers the baptism of Jesus in the river Jordan by John", "It remembers the Last Supper."]],
    "All churches remember the **Last Supper** but differ on how Christ is present in the bread and wine.", { hints: ["Look for agreement and difference."] });
  mc(b, 4, "ANALYSIS", "Which reason best explains why some churches practise infant baptism while others practise believers' baptism?",
    ["They understand baptism differently: as entry into the Church or as a personal declaration", "Correct: the meaning given to baptism shapes who is baptised."],
    [["One group has no belief in Jesus, while the other group does", "Both groups are Christian and believe in Jesus."],
     ["The Bible forbids baptism for adults in all circumstances", "The Bible does not forbid adult baptism."],
     ["Infant baptism is required by law in Zimbabwe for all newborn children", "No such law exists."]],
    "Infant baptism stresses **entry into the Church** and the promises of parents; believers' baptism stresses **personal faith**.", { hints: ["Think of what baptism means to each group."] });

  b.tf({ d: 1, skill: "RECALL", stem: "The Eucharist goes back to the Last Supper of Jesus and his disciples.", answer: true,
    explanation: "True. See Mark 14:22-25 and 1 Corinthians 11:23-26." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Most Protestant churches keep seven sacraments.", answer: false,
    explanation: "False. Most Protestant churches keep two: baptism and Holy Communion. Catholic and Orthodox churches keep seven." });

  b.match({ d: 3, skill: "UNDERSTANDING",
    stem: "Match each sacrament or rite with its meaning.",
    pairs: [["Baptism", "entry into the Church, with water as the sign"], ["Eucharist", "sharing bread and wine in memory of the Last Supper"], ["Anointing of the sick", "oil and prayer for a seriously ill person"], ["Ordination", "setting apart a deacon, priest or bishop"]],
    hints: ["Think of water, bread and wine, oil, and clergy."],
    explanation: "Baptism: water. Eucharist: bread and wine. Anointing: oil. Ordination: clergy." });

  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct words.",
    template: "Baptism is carried out in the name of the Father, the {{blank:a}} and the {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["Son"], choices: ["Son", "Prophet", "Angel", "Apostle"] }, { id: "b", accepted: ["Holy Spirit"], choices: ["Holy Spirit", "Messenger", "Saint", "Disciple"] }],
    explanation: "The formula is in Matthew 28:19: the Father, the **Son** and the **Holy Spirit**." });
  b.fib({ d: 3, skill: "UNDERSTANDING", stem: "Choose the correct words.",
    template: "A service held some months or years after a burial to mark the grave with a stone is a {{blank:a}}, and the Christian funeral expresses hope in the {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["tombstone unveiling"], choices: ["tombstone unveiling", "baptism", "ordination", "confirmation"] }, { id: "b", accepted: ["resurrection"], choices: ["resurrection", "schism", "persecution", "incarnation"] }],
    hints: ["Think of a memorial for the dead and hope of life after death."],
    explanation: "A **tombstone unveiling** is held later; the funeral expresses hope in the **resurrection**." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the sacrament in which a young person confirms the promises made at baptism.",
    accepted: ["Confirmation", "Chrismation"], wrong: ["Ordination", "Marriage"],
    explanation: "In **confirmation** a young person confirms the baptismal promises. The Orthodox call the rite chrismation." });

  ms(b, 3, "UNDERSTANDING", 3, "State **three** things that happen at a Christian wedding.",
    ["Readings from the Bible", "The couple make their vows before God and the congregation", "Rings are exchanged", "The minister or priest blesses the marriage", "Hymns are sung and the families celebrate"],
    "At a Christian wedding there are readings from the Bible, the couple make vows before God and the congregation, and rings are exchanged before the blessing.",
    "One mark for each point, to a maximum of three.", ["Think of words, actions and blessing."]);
  ms(b, 3, "UNDERSTANDING", 4, "Describe how a Christian funeral takes place.",
    [["Friends and relatives gather and hymns are sung, sometimes through the night", 1], ["A service gives thanks for the life of the person and offers comfort", 1], ["The body is buried (or cremated) with prayers at the grave", 1], ["Hope in the resurrection is expressed; a memorial or tombstone unveiling may be held later", 1]],
    "Friends and relatives gather and sing hymns, sometimes through the night. A service gives thanks for the person's life and offers comfort, the body is buried with prayers at the grave, and hope in the resurrection is expressed. A memorial or tombstone unveiling may be held later.",
    "One mark for each point.", ["Describe the gathering, service, burial and later memorial."]);
  ms(b, 4, "ANALYSIS", 6, "Explain **two** reasons why baptism is important to Christians.",
    [["Jesus was baptised and commanded his followers to baptise (Matthew 28:19)", 1], ["Developed: Christians follow his example and obey his command, so baptism is an act of obedience", 2], ["It is the entry into the Church", 1], ["Developed: the person becomes a member of the Christian community and receives its support", 2]],
    "Baptism is important because Jesus was baptised and commanded his followers to baptise, so Christians follow his example and obey his command. It is also the entry into the Church: the person becomes a member of the Christian community and receives its support.",
    "Two reasons, each stated and developed.", ["One reason from the example of Jesus, one about entry into the Church."]);

  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "a letter in a fictional church newsletter in Masvingo, 2026",
      "Last Sunday our church baptised four people. Tendai, who is nine months old, was held by his godmother. Three teenagers were baptised in the river after telling us of their faith. Afterwards we shared Holy Communion with bread and grape juice in memory of the Last Supper."
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({ label: "(a)", stem: "Which type of baptism did the three teenagers receive?",
        options: [["Believers' baptism", "Correct: they spoke of their own faith."], ["Infant baptism", "This is for babies such as Tendai."], ["Confirmation", "This is a separate rite."], ["Anointing of the sick", "This is for the seriously ill."]],
        answer: "A", explanation: "The teenagers declared their faith, so it was believers' baptism." }),
      P.manual({ label: "(b)", marks: 3, stem: "Using Source A, state **three** things that happened at the service.",
        points: ["Four people were baptised", "Tendai, a baby, was held by his godmother, and three teenagers were baptised in the river", "Holy Communion was shared with bread and grape juice in memory of the Last Supper"],
        modelAnswer: "Four people were baptised, including a baby held by his godmother and three teenagers in the river, and afterwards the church shared Holy Communion with bread and grape juice in memory of the Last Supper." }),
      P.manual({ label: "(c)", marks: 4, stem: "Explain why Christians share Holy Communion.",
        points: [["Jesus shared bread and wine at the Last Supper and asked his followers to remember him", 1], ["It remembers his death and resurrection", 1], ["It unites the congregation as one body", 1], ["Many believe it gives spiritual strength and forgiveness", 1]],
        modelAnswer: "Christians share Holy Communion because Jesus shared bread and wine at the Last Supper and asked his followers to remember him. It recalls his death and resurrection, unites the congregation as one body, and many believe it gives spiritual strength and forgiveness." }),
    ],
    hints: ["In (c) think of the Last Supper, remembrance and unity."],
    explanation: "Source A shows baptism and communion; (c) asks why communion is shared." });
  b.struct({ d: 4, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "Themba says: \"Baptism should only be given to people who can choose it for themselves.\" Nokuthula replies: \"Baptising babies shows that the child belongs to God's family from the start.\"",
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Outline **two** differences between infant baptism and believers' baptism.",
        points: [["Infant baptism is for babies; believers' baptism is for people who have decided for themselves", 2], ["In infant baptism, parents and godparents make promises; in believers' baptism the person declares their own faith, usually by immersion", 2]],
        modelAnswer: "Infant baptism is for babies, while believers' baptism is for people who have decided for themselves. In infant baptism parents and godparents make promises, whereas in believers' baptism the person declares their own faith, usually by immersion." }),
      P.manual({ label: "(b)", marks: 4, stem: "Explain the meaning of the Eucharist for Catholics.",
        points: [["It remembers the Last Supper and the death and resurrection of Jesus", 2], ["Catholics believe the bread and wine become the body and blood of Christ, so it is the centre of worship and nourishes faith", 2]],
        modelAnswer: "The Eucharist remembers the Last Supper and the death and resurrection of Jesus. Catholics believe the bread and wine become the body and blood of Christ, so it is the centre of worship and nourishes their faith." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 220 }, stem: "Assess the view that baptism is only meaningful when the person chooses it.",
        points: [["For: baptism expresses personal faith and commitment, as in the Gospels' accounts of adults who repented and were baptised", 2], ["Against: infant baptism welcomes the child into the Church, and the family and congregation promise to teach the faith; confirmation follows later", 2], ["A supported judgement", 2]],
        levels: levels(6),
        modelAnswer: "Believers' baptism expresses personal faith and commitment, as in the accounts of adults who repented and were baptised. However, infant baptism welcomes the child into the Church, and the family and congregation promise to teach the faith, with confirmation following later. On balance both carry meaning for the churches that practise them; which seems more meaningful depends on whether personal decision or the community's promise is stressed." }),
    ],
    hints: ["Give the case for personal choice, the case for infant baptism, then judge."],
    explanation: "A balanced answer reports both practices fairly and weighs them." });

  b.card("DEFINITION", "What is a **sacrament**?", "A rite that Christians believe is an outward sign of God's grace.");
  b.card("DEFINITION", "What is the **Eucharist**?", "The sharing of bread and wine in memory of the Last Supper; also called the Mass, Holy Communion or the Lord's Supper.");
  b.card("FACT", "Name the seven sacraments of the Catholic Church.", "Baptism, confirmation, Eucharist, reconciliation, anointing of the sick, marriage and ordination.");
  b.card("FACT", "Which two rites do most Protestants keep?", "Baptism and Holy Communion.");
  b.card("FACT", "Which passage gives the baptismal formula?", "Matthew 28:19: in the name of the Father, the Son and the Holy Spirit.");
  b.card("CONCEPT", "How do infant and believers' baptism differ?", "Infant baptism: babies, with promises by parents and godparents. Believers' baptism: a personal declaration of faith, usually by immersion.");
  b.card("CONCEPT", "How do Catholics and many Protestants differ on the Eucharist?", "Catholics teach that the bread and wine become the body and blood of Christ; many Protestants see them as a memorial.");
  b.card("FACT", "What is a tombstone unveiling?", "A service held some time after burial, when the gravestone is revealed and the dead person is remembered.");
  b.card("CONCEPT", "What does a Christian funeral express?", "Thanks for the life of the person, comfort for the bereaved and hope in the resurrection.");
});
