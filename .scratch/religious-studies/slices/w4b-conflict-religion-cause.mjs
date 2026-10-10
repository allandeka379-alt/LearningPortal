// W4b: Religion as a source of conflict and of peace-building (Topic 15.4).
// Reviewer notes: examples are given in outline only and only where well established: the Crusades (first call 1095, Pope Urban II),
// the Northern Ireland Troubles (about 1968-1998; Good Friday Agreement 1998), persecution of Jews in Europe ending in the Holocaust
// (1941-45, about six million murdered by the Nazi regime, the brief's wording). The ZHOCD is described as an umbrella group of church
// bodies (check its current membership before adding detail). No religion is ranked or stereotyped; extremists are described as a
// small minority rejected by most believers.
import { concept, P, source, levels } from "../lib.mjs";
import { mc, pmc, ms } from "../tables/w4b-helpers.mjs";

concept("frs.conflict.religion-cause", { file: "conflict/religion-cause", keyPrefix: "conflict.religion-cause" }, (b) => {
  mc(b, 1, "RECALL", "Which term means refusing to respect people who hold different beliefs or treating them unfairly because of their religion?",
    ["Religious intolerance", "Correct: intolerance is a refusal to respect other beliefs."],
    [["Interfaith dialogue and cooperation", "Interfaith dialogue is respectful conversation between religions."],
     ["Reconciliation", "Reconciliation is restoring relationships."],
     ["Stewardship", "Stewardship is care of the environment."]],
    "**Religious intolerance** is refusing to respect people of other beliefs.");
  mc(b, 1, "RECALL", "In which year did Pope Urban II call for a military expedition to the Holy Land, beginning the Crusades?",
    ["1095", "Correct: 1095."],
    [["313", "In 313 the Edict of Milan was issued."],
     ["1054", "In 1054 the Great Schism divided the Church."],
     ["1517", "In 1517 Luther published the Ninety-five Theses."]],
    "Pope Urban II called for the first Crusade in **1095**.");
  mc(b, 2, "UNDERSTANDING", "Which statement best describes the Northern Ireland Troubles?",
    ["A conflict mainly about national identity and political power", "Correct: religion was a label, but politics and fairness were central."],
    [["A war fought only over the correct interpretation of one holy book", "The conflict was mainly political."],
     ["A dispute between two countries over the ownership of a river", "It was not a river dispute."],
     ["A conflict that began and ended within one single church building", "It involved whole communities."]],
    "The Troubles were mainly about **national identity and political power**, with religion as a label of the two communities.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What is interfaith dialogue?",
    ["Respectful talk and cooperation between different religions", "Correct: it builds understanding and joint action."],
    [["A rule that all people in a country must follow one religion", "That would be the opposite of dialogue."],
     ["A contest in which religions compete to win the most converts", "Dialogue is not a contest."],
     ["A law that forbids people to speak about their own beliefs", "Dialogue encourages people to speak."]],
    "**Interfaith dialogue** is respectful conversation and cooperation between people of different religions.");
  mc(b, 2, "UNDERSTANDING", "What is the Zimbabwe Heads of Christian Denominations (ZHOCD)?",
    ["An umbrella group of church bodies working together", "Correct: it brings several church bodies together."],
    [["A government ministry that licenses places of worship", "It is a church group, not a ministry."],
     ["A student association of Muslim schools and colleges", "It is a Christian church group."],
     ["A council of chiefs that hears land disputes in the districts", "It is not a council of chiefs."]],
    "The **ZHOCD** is an umbrella group of church bodies working together on national issues.", { daily: true });
  mc(b, 3, "APPLICATION", "Rumours threaten a small mosque in a fictional town. An interfaith council visits the families, appeals for calm on radio and stands together outside the mosque. Which peace-building method is this?",
    ["Mediation and public appeals for calm by religious leaders", "Correct: religious leaders acted together to prevent violence."],
    [["Competition between religions for the largest number of converts", "The leaders were cooperating."],
     ["Misuse of scripture to justify an attack on a group", "The leaders worked to prevent attack."],
     ["A military campaign led by one religious group against another", "No military action is described."]],
    "Leaders of different religions used **mediation and public appeals** to prevent violence.",
    { hints: ["Think about what the leaders did and whom they worked with."] });
  mc(b, 3, "ANALYSIS", "Study Source A.\n\n" + source("Source A", "an extract from a fictional newspaper editorial, Mutare, 2026",
    "Two groups in a local congregation have fought over who owns the church building and who should lead the church. Some readers say that religion is the cause of the trouble. But the quarrel is about property and leadership, and in other towns the same denomination has worked well with its neighbours.") + "\n\nWhich statement is best supported by Source A?",
    ["A dispute within a religious group can be about property", "Correct: the editorial says the quarrel is about property and leadership."],
    [["Every religious group is always in conflict with its neighbours", "The editorial says that other congregations work well with neighbours."],
     ["The dispute shows that one religion is more violent than the others", "The source makes no such claim."],
     ["Religion plays no part in any dispute inside a congregation", "The dispute is between groups in a congregation."]],
    "The source shows a dispute **within** a religious group about property and leadership.",
    { hints: ["Look for what the editorial says the quarrel is about."] });
  mc(b, 4, "EVALUATION", "Which conclusion about religion and conflict is best supported?",
    ["Religion can deepen or reduce conflict, and is rarely the only cause", "Correct: it is usually mixed with politics, land and fairness."],
    [["Religion is always the sole cause of every war in the history of the world", "Most conflicts have several causes."],
     ["Religion has never contributed in any way to peace-making", "Many religious leaders and groups have worked for peace."],
     ["One religion is peaceful and all the others are violent", "Every religion has been misused and has produced peacemakers."]],
    "Religion can **deepen or reduce** conflict, and it is **rarely the only cause**.",
    { hints: ["Choose the answer that avoids blaming one religion and recognises other causes."] });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "Extremists represent the views of the great majority of believers in their religion.",
    answer: false,
    explanation: "False. Extremists are a very small minority and are rejected by the great majority of believers.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Fundamentalism and extremism always mean exactly the same thing.",
    answer: false,
    explanation: "False. Fundamentalism is used for a strict or literal approach to scripture, and many strict believers are peaceful; extremism means willingness to harm others to impose views.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Religious intolerance", "Refusing to respect people who hold different beliefs"],
      ["Extremism", "Willingness to harm others to impose rigid views"],
      ["Interfaith dialogue", "Respectful conversation and cooperation between religions"],
      ["ZHOCD", "An umbrella group of church bodies in Zimbabwe"],
    ],
    explanation: "Each term belongs to the discussion of religion, conflict and peace.",
  });
  b.fib({
    d: 3, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Good Friday Agreement of {{blank:a}} set up a peace settlement for {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["1998"], choices: ["1998", "1095", "1948", "1980"] },
      { id: "b", accepted: ["Northern Ireland"], choices: ["Northern Ireland", "Zimbabwe", "Botswana", "Zambia"] },
    ],
    hints: ["Remember the key fact box."],
    explanation: "The Good Friday Agreement of **1998** concerned **Northern Ireland**.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What name is given to the murder of about six million Jews by the Nazi regime between 1941 and 1945?",
    accepted: ["the Holocaust", "Holocaust", "Shoah", "the Shoah"],
    wrong: ["Exodus"],
    explanation: "It is the **Holocaust** (in Hebrew, the *Shoah*).",
  });

  ms(b, 1, "RECALL", 3, "State **three** ways in which religion can contribute to conflict.",
    ["Intolerance of other beliefs", "Extremism, or misuse of scripture", "Competition for converts, disputes within a religion or persecution of a group"],
    "Intolerance of other beliefs, extremism or misuse of scripture, and disputes within a religion or persecution of a group.",
    "One mark for each way.");
  ms(b, 3, "UNDERSTANDING", 4, "Describe how interfaith dialogue helps to build peace.",
    ["People of different religions meet and learn about each other's beliefs", "This removes fear and stereotypes", "They work together on projects such as caring for orphans or cleaning a town", "Leaders can speak and act together to calm tension and prevent violence"],
    "People of different religions meet and learn about each other's beliefs, which removes fear and stereotypes. They work together on projects such as caring for orphans or cleaning a town, and leaders can speak and act together to calm tension and prevent violence.",
    "One mark for each point.",
    ["Think of understanding, joint action and calming tension."]);
  ms(b, 4, "ANALYSIS", 6, "Explain **two** reasons why religion is seldom the only cause of a conflict.",
    [["Conflicts usually involve politics, land and resources", 1], ["Developed: people may use a religious label to describe a fight that is really about power, so the religious difference is only part of the story", 2],
     ["Religious communities are mixed with ethnic and economic groups", 1], ["Developed: unfair treatment in jobs, housing or rights adds to division, as in Northern Ireland, so the conflict cannot be explained by belief alone", 2]],
    "Conflicts usually involve politics, land and resources, and people may use a religious label to describe a fight that is really about power, so the religious difference is only part of the story. Religious communities are also mixed with ethnic and economic groups, and unfair treatment in jobs, housing or rights adds to division, as in Northern Ireland, so the conflict cannot be explained by belief alone.",
    "Two reasons, each stated and developed.",
    ["Think of politics, land and fairness."]);

  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "a statement read on a fictional local radio station, Bulawayo, 2026",
      "We are a pastor, an imam, a rabbi and an elder who follows the old customs. We have heard rumours that people of one faith are to blame for a quarrel in the market. We ask everyone to remain calm and to wait for the facts. Our faiths are different, but each of them teaches that we must treat our neighbours justly.") + "\n\nStudy Source A and answer the questions.",
    parts: [
      pmc("(a)", "How many different religious traditions are represented by the speakers in Source A?",
        ["Four", "Correct: Christian, Muslim, Jewish and Indigenous Religion."],
        [["One", "The speakers are from four traditions."],
         ["Two", "The speakers are from four traditions."],
         ["Three", "The speakers are from four traditions."]],
        "The pastor, imam, rabbi and elder represent four traditions."),
      P.manual({
        label: "(b)", marks: 3, stem: "Using Source A, identify **three** things that the speakers ask or say.",
        points: ["They ask everyone to remain calm", "They ask people to wait for the facts", "They say that each of their faiths teaches that neighbours must be treated justly"],
        modelAnswer: "They ask everyone to remain calm, they ask people to wait for the facts, and they say that each of their faiths teaches that neighbours must be treated justly.",
      }),
      P.manual({
        label: "(c)", marks: 4, stem: "Explain why a joint statement by leaders of different religions can help to prevent conflict.",
        points: [["It shows that the religions stand together, so rumours that blame one group are less likely to be believed", 2], ["Leaders are trusted by their communities, so their calls for calm and justice carry weight", 2]],
        modelAnswer: "It shows that the religions stand together, so rumours that blame one group are less likely to be believed. Leaders are trusted by their communities, so their calls for calm and justice carry weight.",
      }),
    ],
    hints: ["In (c) think of trust and of unity."],
    explanation: "The source shows religions acting together to prevent conflict.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1200,
    stem: "Two fictional students disagree. Farai says: \"Religion causes more conflict than it prevents.\" Chipo says: \"Religion is seldom the only cause of conflict, and it also does a great deal to build peace.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Outline **two** ways in which religion can contribute to conflict.",
        points: [["Intolerance and persecution of people because of their beliefs", 2], ["Extremism or the misuse of scripture to justify hatred or violence", 2]],
        modelAnswer: "Intolerance and persecution can cause people to be treated badly because of their beliefs. Extremism or the misuse of scripture can be used to justify hatred or violence.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain **one** way in which religions build peace.",
        points: [["Religions teach forgiveness, justice and respect for neighbours", 1], ["Developed: believers learn to settle quarrels peacefully and to treat people of other faiths fairly", 1], ["Leaders from different religions meet in interfaith councils and the ZHOCD", 1], ["Developed: they speak with one voice for calm and cooperate to help people in need", 1]],
        modelAnswer: "Religions teach forgiveness, justice and respect for neighbours, so believers learn to settle quarrels peacefully and to treat people of other faiths fairly. Leaders from different religions also meet in interfaith councils and the ZHOCD, so they speak with one voice for calm and cooperate to help people in need.",
      }),
      P.manual({
        label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 280 },
        stem: "Assess whether religion does more to cause conflict than to build peace.",
        points: [["Conflict: intolerance, extremism, competition for converts, disputes within religions, misuse of scripture and persecution, as in the Crusades or the persecution of Jews", 2], ["Peace: teaching of forgiveness and justice, interfaith dialogue, the ZHOCD and interfaith councils, mediation and relief", 2], ["Religion is seldom the only cause, because politics, land and fairness are usually involved; no religion should be blamed as a whole", 2], ["A supported judgement", 2]],
        levels: levels(8),
        modelAnswer: "Religion can contribute to conflict through intolerance, extremism, competition for converts, disputes within religions, misuse of scripture and persecution, as in the Crusades or the persecution of Jews in Europe. However, all religions also teach forgiveness and justice, and believers build peace through interfaith dialogue, the ZHOCD and interfaith councils, mediation and relief. Religion is seldom the only cause of conflict, because politics, land and fairness are usually involved, and no religion should be blamed as a whole. I conclude that religion does not simply cause more conflict than peace; it has the power to do either, depending on how it is understood and used.",
      }),
    ],
    hints: ["Give both sides in (c) and remember that religion is seldom the only cause."],
    explanation: "A strong answer weighs religion's role in conflict and in peace-building and avoids blaming any one religion.",
  });

  b.card("DEFINITION", "What is **religious intolerance**?", "Refusing to respect people who hold different beliefs, or treating them unfairly because of their religion.");
  b.card("DEFINITION", "What is **extremism**?", "Holding rigid, one-sided views and being willing to harm others to impose them; rejected by the great majority of believers.");
  b.card("DEFINITION", "What is **interfaith dialogue**?", "Respectful conversation and cooperation between people of different religions.");
  b.card("FACT", "When did Pope Urban II call for the first Crusade?", "1095.");
  b.card("FACT", "When was the Good Friday Agreement signed?", "1998 (it set up a peace settlement for Northern Ireland).");
  b.card("FACT", "What is the ZHOCD?", "The Zimbabwe Heads of Christian Denominations, an umbrella group of church bodies working together on national issues.");
  b.card("CONCEPT", "Name six ways in which religion can contribute to conflict.", "Intolerance, extremism, competition for converts, disputes within a religion, misuse of scripture and persecution.");
  b.card("CONCEPT", "Why is religion seldom the only cause of conflict?", "Conflicts usually involve politics, land, power and fairness as well; religion often supplies the label or the dividing line.");
  b.card("CONCEPT", "How do religions build peace?", "By teaching forgiveness and respect, interfaith dialogue, interfaith councils and the ZHOCD, mediation, education and relief.");
});
