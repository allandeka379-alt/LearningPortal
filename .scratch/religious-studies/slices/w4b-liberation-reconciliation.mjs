// W4b: Religion, reconciliation and healing after the struggle (Topic 13.4).
// Reviewer notes: Unity Accord 22 December 1987; NPRC created by section 251 of the 2013 Constitution (outline only; check the
// NPRC Act before adding detail); the CCJP's 1997 report on the 1980s disturbances and the 2006 church discussion document
// "The Zimbabwe We Want" are named in the lesson only (check titles and dates); Qur'an 42:40 and 49:10 and Matthew 18:21-22
// are paraphrased in the lesson; no praise or blame of any living politician.
import { concept, P, source, levels } from "../lib.mjs";
import { mc, pmc, ms } from "../tables/w4b-helpers.mjs";

concept("frs.liberation.reconciliation", { file: "liberation/reconciliation", keyPrefix: "liberation.reconciliation" }, (b) => {
  mc(b, 1, "RECALL", "What does **reconciliation** mean?",
    ["Restoring relationships between people or groups that were in conflict", "Correct: so that they can live and work together again."],
    [["Punishing the leaders of one side so that the other side is satisfied", "That is punishment; reconciliation restores relationships."],
     ["Moving families to new areas so that former enemies do not meet", "That is separation, not reconciliation."],
     ["Ending a church service with a closing prayer and a blessing", "That is not what reconciliation means."]],
    "**Reconciliation** is restoring relationships between people or groups that were in conflict.");
  mc(b, 1, "RECALL", "On which date was the Unity Accord signed?",
    ["22 December 1987", "Correct: the Unity Accord was signed on 22 December 1987."],
    [["18 April 1980", "That is the date of independence."],
     ["10 December 1948", "That is the date of the Universal Declaration of Human Rights."],
     ["14 May 1948", "That is the date the State of Israel was proclaimed."]],
    "The **Unity Accord** was signed on 22 December 1987.");
  mc(b, 2, "UNDERSTANDING", "Which section of the Constitution of Zimbabwe (2013) created the National Peace and Reconciliation Commission?",
    ["Section 251", "Correct: section 251."],
    [["Section 60", "Section 60 protects freedom of conscience, including religion."],
     ["Section 81", "Section 81 concerns the rights of children."],
     ["Section 78", "Section 78 concerns marriage rights."]],
    "**Section 251** of the Constitution created the NPRC.");
  mc(b, 2, "UNDERSTANDING", "Why do many families hold *kurova guva* or *umbuyiso* for a relative who died in the war?",
    ["To bring the spirit home so that it joins the family ancestors", "Correct: it restores the link between the living and the dead."],
    [["To announce a wedding between two families after the war", "That would be a marriage ceremony."],
     ["To collect fees for the repair of the village school", "That is not the purpose of the ceremony."],
     ["To select a new chief for the area in place of the former one", "Chiefs are chosen by other customs."]],
    "These ceremonies **bring the spirit home** to join the family ancestors, so that the living and the dead can be at peace.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which religious practice or belief supports forgiveness after conflict?",
    ["Christian teaching to forgive many times (Matthew 18:21-22)", "Correct: Jesus teaches that forgiveness has no narrow limit."],
    [["The commandment to keep the Sabbath day holy (Exodus 20:8)", "That concerns rest and worship, not forgiveness."],
     ["The Christian celebration of Pentecost described in Acts 2", "That concerns the coming of the Holy Spirit."],
     ["The call of Abraham to leave his own country (Genesis 12:1)", "That concerns the call of Abraham."]],
    "Matthew 18:21-22 teaches Christians to **forgive many times**.", { daily: true });
  mc(b, 3, "APPLICATION", "A church in a fictional town runs counselling and skills training for former fighters and welcomes them into its congregation. Which contribution is this?",
    ["Support for the reintegration of ex-combatants", "Correct: counselling and training help former fighters return to community life."],
    [["A cleansing rite performed only by traditional elders", "The church is offering counselling and training, not a traditional rite."],
     ["The creation of a Commission by section 251 of the Constitution", "The Commission is created by law, not by a church."],
     ["A military alliance between the church and an army group", "Counselling and training are not a military alliance."]],
    "Counselling, training and welcome help ex-combatants **return to community life**.",
    { hints: ["Think about what is being offered to the former fighters."] });
  mc(b, 3, "ANALYSIS", "Study Source A.\n\n" + source("Source A", "an extract from a fictional local newspaper, Mutoko, 2026",
    "On Saturday the village held a healing day. The pastor led a prayer for those who died in the war, and the elders brewed beer and spoke to the ancestors. Families from three churches and from households that follow the old customs sat together under the big tree. One mother said, \"I did not think I would ever eat with them again.\"") + "\n\nWhich statement is best supported by Source A?",
    ["People of different religious backgrounds took part in the same event", "Correct: churches and households that follow the old customs sat together."],
    [["Only one religious tradition was allowed to attend the event", "The source shows more than one tradition."],
     ["The event ended all disagreements between the families for ever", "The source does not say this; it quotes one mother."],
     ["Traditional elders took no part in the day at all", "The elders brewed beer and spoke to the ancestors."]],
    "The source shows **different traditions** taking part together in a healing day.",
    { hints: ["Look at who is named as taking part."] });
  mc(b, 4, "EVALUATION", "Which judgement about the role of religion in post-war healing is best supported?",
    ["Religions helped through rites and forgiveness, but healing is unfinished", "Correct: it recognises both the help and the limits."],
    [["Religion solved every problem of the war within a few years", "Many questions remain unanswered."],
     ["Religion had no effect on how families coped with their losses", "Rituals and teaching helped many families."],
     ["Only one religion could help people to heal after the conflict", "Several religions contributed."]],
    "Religion **helped** through teaching, rites and relief, but healing is not complete and many families still seek answers.",
    { hints: ["Choose the answer that recognises achievement and unfinished work."] });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "The National Peace and Reconciliation Commission was created by the Unity Accord of 1987.",
    answer: false,
    explanation: "False. The NPRC was created by section 251 of the Constitution of 2013. The Unity Accord was signed in 1987.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Both churches and traditional leaders can play a part in healing after conflict.",
    answer: true,
    explanation: "True. Churches teach forgiveness and give relief, and elders perform cleansing and bring-home rites.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each teaching or practice with its meaning for reconciliation.",
    pairs: [
      ["Matthew 18:21-22", "Christians are taught to forgive many times"],
      ["Qur'an 49:10", "Believers are told to make peace between their brothers"],
      ["Yom Kippur", "A day of repentance and making amends in Judaism"],
      ["Kurova guva/umbuyiso", "A rite that brings the spirit of a dead person home to the ancestors"],
    ],
    explanation: "Each belongs to a religion's contribution to forgiveness, peace or healing.",
  });
  b.fib({
    d: 3, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Unity Accord was signed on {{blank:a}} 1987, and section {{blank:b}} of the 2013 Constitution created the NPRC.",
    blanks: [
      { id: "a", accepted: ["22 December"], choices: ["22 December", "18 April", "4 March", "10 December"] },
      { id: "b", accepted: ["251"], choices: ["251", "60", "81", "56"] },
    ],
    hints: ["Remember the key fact box."],
    explanation: "**22 December** 1987, and section **251**.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the Shona name for the ceremony that brings the spirit of a dead person home to join the ancestors.",
    accepted: ["kurova guva", "kurovaguva", "kurova-guva", "kurova"],
    wrong: ["bira"],
    explanation: "It is **kurova guva** (Ndebele: *umbuyiso*).",
  });

  ms(b, 1, "RECALL", 3, "State **three** ways in which religious organisations helped after the war.",
    ["Taught forgiveness and peace", "Gave relief and helped refugees and ex-combatants to resettle", "Held prayers and memorial services, or documented abuses"],
    "They taught forgiveness and peace, gave relief and helped refugees and ex-combatants to resettle, and held prayers and memorial services.",
    "One mark for each way.");
  ms(b, 3, "UNDERSTANDING", 4, "Describe how Indigenous Religion helps families to heal after a violent death.",
    ["It is believed that a person who died violently or without a proper burial may be restless", "Families hold ceremonies to bring home the spirit (kurova guva/umbuyiso)", "Remains are buried or reburied with respect", "Cleansing rites remove spiritual disorder and help fighters and families to be at peace"],
    "It is believed that a person who died violently or without a proper burial may be restless, so families hold ceremonies such as kurova guva or umbuyiso to bring home the spirit. Remains are buried or reburied with respect, and cleansing rites remove spiritual disorder and help fighters and families to be at peace.",
    "One mark for each point.",
    ["Think of the belief, the ceremony, the burial and the cleansing."]);
  ms(b, 4, "ANALYSIS", 6, "Explain **two** reasons why reconciliation after a long conflict can be difficult.",
    [["Families have lost relatives and still grieve", 1], ["Developed: some do not know where their relatives are buried, and anger and sorrow make forgiveness hard", 2],
     ["Questions about what happened have not always been answered", 1], ["Developed: without acknowledgement of the truth, trust is not restored and old divisions can continue", 2]],
    "Families have lost relatives and still grieve, and some do not know where their relatives are buried, so anger and sorrow make forgiveness hard. Questions about what happened have not always been answered, and without acknowledgement of the truth trust is not restored and old divisions can continue.",
    "Two reasons, each stated and developed.",
    ["Think of grief, and of the need for truth."]);

  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "an extract from a fictional community newsletter, Chinhoyi, 2026",
      "The Chinhoyi Interfaith Group will hold a day of remembrance and healing at the community hall. Church choirs will sing, a pastor and an imam will pray, and elders will speak about bringing home the spirits of those who died in the war. Counsellors from the clinic will be present. All families are welcome to share a meal.") + "\n\nStudy Source A and answer the questions.",
    parts: [
      pmc("(a)", "Which feature of the day in Source A is a ceremony from Indigenous Religion?",
        ["Elders speaking about bringing home the spirits of the dead", "Correct: bringing home the spirits is an Indigenous Religion rite."],
        [["Church choirs singing hymns of praise to God", "That is a Christian activity."],
         ["Counsellors from the clinic giving advice to families", "That is health support."],
         ["A pastor and an imam praying together in the hall", "That is Christian and Muslim prayer."]],
        "Bringing home the spirits is an Indigenous Religion rite."),
      P.manual({
        label: "(b)", marks: 3, stem: "Using Source A, identify **three** ways in which the organisers help people to heal.",
        points: ["Prayers by a pastor and an imam", "Elders speak about bringing home the spirits of those who died", "Counsellors from the clinic are present, or a meal is shared by all families"],
        modelAnswer: "A pastor and an imam pray, elders speak about bringing home the spirits of those who died, and counsellors from the clinic are present while all families share a meal.",
      }),
      P.manual({
        label: "(c)", marks: 4, stem: "Explain why an interfaith event of this kind can help reconciliation.",
        points: [["People of different religions meet, pray and share food together, which builds trust", 2], ["Each tradition offers something different, such as prayer, rites for the dead and counselling, so more people feel their grief is respected", 2]],
        modelAnswer: "People of different religions meet, pray and share food together, which builds trust. Each tradition offers something different, such as prayer, rites for the dead and counselling, so more people feel that their grief is respected.",
      }),
    ],
    hints: ["In (c) think about who comes together and what each offers."],
    explanation: "The source shows religions cooperating in healing.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1200,
    stem: "Two fictional students disagree. Rudo says: \"Religion has done a great deal to heal the country after the struggle.\" Farai says: \"Healing needs the truth and justice that only the state can provide, so religion can do little.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Outline **two** ways in which churches promoted reconciliation.",
        points: [["They taught forgiveness and peace, for example Matthew 18:21-22", 2], ["They gave relief and support to refugees, returning families and ex-combatants", 2]],
        modelAnswer: "They taught forgiveness and peace, for example from Matthew 18:21-22. They also gave relief and support to refugees, returning families and ex-combatants.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain **one** way in which Indigenous Religion helps communities to heal.",
        points: [["Ceremonies such as kurova guva or umbuyiso bring the spirits of the dead home", 1], ["Developed: families feel that the dead are at peace and that they are linked again with the ancestors", 1], ["Cleansing rites remove spiritual disorder after violence", 1], ["Developed: those who fought or suffered can return to community life without shame", 1]],
        modelAnswer: "Ceremonies such as kurova guva or umbuyiso bring the spirits of the dead home, so families feel that the dead are at peace and are linked again with the ancestors. Cleansing rites also remove spiritual disorder after violence, so those who fought or suffered can return to community life without shame.",
      }),
      P.manual({
        label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 280 },
        stem: "Assess how far religion has helped national healing since independence.",
        points: [["For: teaching forgiveness, relief and resettlement, counselling, prayer and memorials", 2], ["For: Indigenous Religion rites, interfaith events and calls for dialogue", 2], ["Against or limits: unresolved questions, grief that has no ceremony, divisions in religious bodies, and the need for law, truth and justice from the state (section 251, the NPRC)", 2], ["A supported judgement", 2]],
        levels: levels(8),
        modelAnswer: "Religion has helped in several ways. It has taught forgiveness, given relief and counselling, held prayers and memorials, and offered rites that bring home the spirits of the dead. Interfaith events and calls for dialogue have also brought people together. However, many questions remain unanswered, some families still have no ceremony for their grief, religious bodies do not always agree, and healing also needs truth and justice from the state, such as the work of the NPRC under section 251. I conclude that religion has done much for individual and community healing, but national healing needs religion, law and honest dialogue together.",
      }),
    ],
    hints: ["Consider both what religion has done and what only the state or the law can do."],
    explanation: "A strong answer weighs religious contributions against their limits and reaches a supported judgement.",
  });

  b.card("DEFINITION", "What is **reconciliation**?", "Restoring relationships between people or groups that were in conflict, so that they can live and work together again.");
  b.card("DEFINITION", "What is a **cleansing ritual** in Indigenous Religion?", "A ceremony by elders to remove spiritual disorder after a violent death or war, so that the living and the dead can be at peace.");
  b.card("FACT", "On what date was the Unity Accord signed?", "22 December 1987.");
  b.card("FACT", "Which section of the 2013 Constitution created the NPRC?", "Section 251 (the National Peace and Reconciliation Commission).");
  b.card("FACT", "Which Christian text teaches forgiveness many times?", "Matthew 18:21-22.");
  b.card("FACT", "What are the Shona and Ndebele names for the bring-home ceremony?", "Kurova guva (Shona) and umbuyiso (Ndebele).");
  b.card("CONCEPT", "How did churches help after the war?", "They taught forgiveness, gave relief and counselling, helped resettlement, held memorials and documented abuses.");
  b.card("CONCEPT", "Why do families bring home the spirit of a relative who died in the war?", "It is believed that a person who died violently or was not properly buried may be restless; the rite lets the spirit join the ancestors.");
  b.card("CONCEPT", "Why is healing after conflict not finished?", "Some families still seek answers and burial places, and healing also needs truth and justice.");
});
