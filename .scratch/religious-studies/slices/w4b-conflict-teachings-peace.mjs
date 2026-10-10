// W4b: Religious teachings on peace and conflict (Topic 15.2).
// Reviewer notes: Isaiah 2:4 and Micah 4:3, Matthew 5:9, 5:38-48 and 18:21-22, Psalm 34:14, Proverbs 15:1, Romans 12:18 and
// Qur'an 2:256 and 49:9-10 are paraphrased; the just war criteria are given in outline (Augustine, Aquinas); jihad is described as
// striving with armed defence under strict conditions, and extremism as rejected by the great majority of Muslims. Please have
// a Muslim scholar and a Jewish reviewer check the wording of the Islamic and Jewish sections. All sources are fictional.
import { concept, P, source, levels } from "../lib.mjs";
import { mc, pmc, ms } from "../tables/w4b-helpers.mjs";

concept("frs.conflict.teachings-peace", { file: "conflict/teachings-peace", keyPrefix: "conflict.teachings-peace" }, (b) => {
  mc(b, 1, "RECALL", "Which word do Muslims use in their greeting to wish peace upon one another?",
    ["Salaam", "Correct: as-salaamu alaykum means peace be upon you."],
    [["Shalom", "Shalom is the Hebrew word for peace used by Jews."],
     ["Tzedakah", "Tzedakah is Jewish righteous giving."],
     ["Kashrut", "Kashrut is the Jewish set of food laws."]],
    "Muslims greet one another with **salaam** (peace).");
  mc(b, 1, "RECALL", "Which passage speaks of nations beating their swords into ploughshares?",
    ["Isaiah 2:4", "Correct: a vision of peace in the Hebrew Bible."],
    [["Matthew 5:9", "This blesses the peacemakers."],
     ["Qur'an 49:9-10", "These verses concern making peace between believers."],
     ["Exodus 20:12", "This is the commandment to honour parents."]],
    "**Isaiah 2:4** (also Micah 4:3) speaks of swords turned into ploughshares.");
  mc(b, 2, "UNDERSTANDING", "What does the Islamic term *sulh* mean?",
    ["Reconciliation or settlement between disputing parties", "Correct: sulh is encouraged in disputes."],
    [["The pilgrimage to Makkah made once in a lifetime by those able", "That is the Hajj."],
     ["The fast during the month of Ramadan from dawn to sunset", "That is sawm."],
     ["The giving of a share of wealth to the poor each year", "That is zakat."]],
    "**Sulh** means reconciliation or settlement.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which view holds that violence and war are always wrong?",
    ["Pacifism", "Correct: pacifists reject violence."],
    [["The just war tradition", "The just war tradition allows force under strict conditions."],
     ["Stewardship", "Stewardship concerns care of creation."],
     ["Ecumenism", "Ecumenism concerns unity between churches."]],
    "**Pacifism** holds that violence and war are always wrong.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What does the word *jihad* mean in Islam?",
    ["Striving, including the inner struggle to live well", "Correct: jihad means striving."],
    [["The pilgrimage to Makkah in the month of Dhul-Hijjah", "That is the Hajj."],
     ["The charity of a share of savings given to the needy", "That is zakat."],
     ["The fast kept during the month of Ramadan each year", "That is sawm."]],
    "**Jihad** means striving; it includes the inner struggle and the struggle for justice.");
  mc(b, 3, "APPLICATION", "Two families, one following Indigenous Religion and one Muslim, quarrel over a boundary, and the headman invites both to the dare. Which practice does this illustrate?",
    ["Elders in Indigenous Religion settling disputes", "Correct: the dare is where elders hear disputes."],
    [["The Christian just war tradition and its conditions for war", "No war is involved."],
     ["The Islamic pillar of zakat and giving to the needy", "No giving is described."],
     ["The Jewish festival of Purim and the story of Esther", "No festival is involved."]],
    "The **dare** is where elders settle disputes and restore relationships.",
    { hints: ["Think about the headman's role."] });
  mc(b, 3, "ANALYSIS", "Study Source A.\n\n" + source("Source A", "an extract from a statement by a fictional interfaith group, Mutare, 2026",
    "We believe that peace is more than the absence of fighting. A district is at peace when every family has food, land and safety, when disputes are settled fairly and when neighbours trust one another. We ask all believers to work for that peace.") + "\n\nWhich understanding of peace does Source A express?",
    ["Peace includes justice and well-being, not only no fighting", "Correct: it lists food, land, safety and fair settlement."],
    [["Peace means only that there is no fighting at the present moment", "The source says peace is more than the absence of fighting."],
     ["Peace is the responsibility of governments and not of believers", "The source asks all believers to work for peace."],
     ["Peace is possible only among people who share one religion", "The group is interfaith."]],
    "The statement describes peace as **justice and well-being**, not only the absence of fighting.",
    { hints: ["Look at the first sentence."] });
  mc(b, 4, "EVALUATION", "Which judgement about religious teachings on peace is best supported?",
    ["They shape values, but conflicts also have political causes", "Correct: teachings help, but are not the only factor."],
    [["They ended all conflict wherever they have been taught", "Conflicts continue where teachings are known."],
     ["They have no effect on how believers treat other people", "Many believers act on them."],
     ["They are all the same, so no religion has its own emphasis or terms", "Each religion has its own terms and emphases."]],
    "Teachings **shape values** and guide action, but conflicts also have political and economic causes, so teachings alone are not enough.",
    { hints: ["Choose the answer that recognises influence and limits."] });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "As-Salam (the Source of Peace) is one of the names of God in Islam.",
    answer: true,
    explanation: "True. As-Salam is one of the names of God used by Muslims.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "All Christians hold the same view on whether war can ever be justified.",
    answer: false,
    explanation: "False. Some Christians are pacifists and others support the just war tradition, though most agree that war is an evil.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each reference with its teaching about peace.",
    pairs: [
      ["Isaiah 2:4", "Nations will turn swords into ploughshares"],
      ["Matthew 5:9", "Those who make peace are blessed"],
      ["Matthew 18:21-22", "Forgive again and again"],
      ["Qur'an 49:9-10", "Make peace between believers who fight"],
    ],
    explanation: "Each reference gives a teaching on peace or forgiveness.",
  });
  b.fib({
    d: 3, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "In Judaism the word for peace is {{blank:a}}, and in Islam the word for reconciliation is {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["shalom"], choices: ["shalom", "salaam", "rugare", "ukuthula"] },
      { id: "b", accepted: ["sulh"], choices: ["sulh", "zakat", "hajj", "sawm"] },
    ],
    hints: ["Remember the definitions in the lesson."],
    explanation: "**Shalom** in Judaism and **sulh** in Islam.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the Arabic word for peace used in the Muslim greeting.",
    accepted: ["salaam", "salam", "as-salaam", "assalam", "salaam alaykum"],
    wrong: ["shalom"],
    explanation: "The word is **salaam**.",
  });

  ms(b, 1, "RECALL", 3, "State **three** words for peace used by believers in Zimbabwe, and the religion or language of each.",
    ["Shalom (Judaism)", "Salaam (Islam)", "Rugare (Shona) or ukuthula (Ndebele)"],
    "Shalom in Judaism, salaam in Islam, and rugare in Shona or ukuthula in Ndebele.",
    "One mark for each word with its religion or language.");
  ms(b, 3, "UNDERSTANDING", 4, "Describe the Christian teaching on how believers should respond to enemies and to those who wrong them.",
    ["Jesus taught that peacemakers are blessed (Matthew 5:9)", "He told his followers to love their enemies and not to take revenge (Matthew 5:38-48)", "Believers are to forgive again and again (Matthew 18:21-22)", "Paul urged believers to live at peace with everyone as far as possible (Romans 12:18)"],
    "Jesus taught that peacemakers are blessed and told his followers to love their enemies and not to take revenge. Believers are to forgive again and again, and Paul urged them to live at peace with everyone as far as possible.",
    "One mark for each point.",
    ["Think of the Sermon on the Mount, forgiveness and Paul."]);
  ms(b, 4, "ANALYSIS", 6, "Explain **two** ways in which Islamic teaching encourages peace.",
    [["Muslims greet one another with salaam, and As-Salam is a name of God", 1], ["Developed: the daily greeting reminds believers that peace is a religious value and a duty to others", 2],
     ["Qur'an 49:9-10 teaches that believers who fight should be reconciled (sulh)", 1], ["Developed: Muslims are encouraged to act as peacemakers, and to settle disputes with justice in families and communities", 2]],
    "Muslims greet one another with salaam, and As-Salam is a name of God, so the daily greeting reminds believers that peace is a religious value and a duty to others. Qur'an 49:9-10 teaches that believers who fight should be reconciled, so Muslims are encouraged to act as peacemakers and to settle disputes with justice in families and communities.",
    "Two ways, each stated and developed.",
    ["Think of the greeting and of reconciliation."]);

  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "a poster for a school peace club, described in words; invented for this question",
      "The poster shows three paths. The first is headed \"Forgive\" and says that holding on to anger hurts the person who carries it. The second is headed \"Talk\" and says that most quarrels can be settled by listening. The third is headed \"Ask the elders\" and invites pupils to bring serious disputes to a trusted adult. At the bottom are the words \"Rugare, ukuthula, shalom, salaam, peace\".", { described: true }) + "\n\nStudy Source A and answer the questions.",
    parts: [
      pmc("(a)", "Which word on the poster is the Ndebele word for peace?",
        ["Ukuthula", "Correct: ukuthula is Ndebele."],
        [["Runyararo", "Runyararo is Shona."],
         ["Shalom", "Shalom is Hebrew."],
         ["Salaam", "Salaam is Arabic."]],
        "Ukuthula is the Ndebele word for peace."),
      P.manual({
        label: "(b)", marks: 3, stem: "Using Source A, identify **three** ways the poster suggests that pupils can deal with conflict.",
        points: ["Forgive, because holding on to anger hurts the person who carries it", "Talk and listen, because most quarrels can be settled in this way", "Bring serious disputes to a trusted adult or to the elders"],
        modelAnswer: "Pupils can forgive, because holding on to anger hurts the person who carries it. They can talk and listen, because most quarrels can be settled in this way. They can bring serious disputes to a trusted adult or to the elders.",
      }),
      P.manual({
        label: "(c)", marks: 4, stem: "Explain how the religions of Zimbabwe support the advice on the poster.",
        points: [["Christianity teaches forgiveness (Matthew 18:21-22) and peacemaking (Matthew 5:9)", 2], ["Islam teaches sulh, Judaism shalom and Indigenous Religion the role of elders in settling disputes, so the advice to talk and to ask the elders has religious support", 2]],
        modelAnswer: "Christianity teaches forgiveness in Matthew 18:21-22 and peacemaking in Matthew 5:9. Islam teaches sulh, Judaism teaches shalom and Indigenous Religion teaches the role of elders in settling disputes, so the advice to talk and to ask the elders has religious support.",
      }),
    ],
    hints: ["In (c) match each piece of advice to a religious teaching."],
    explanation: "The poster draws on the shared vocabulary and practices of peace in the religions.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1200,
    stem: "Two fictional students disagree. Tafadzwa says: \"If everyone followed their religion's teachings on peace, there would be no more conflict.\" Nyasha says: \"Religious teachings on peace help, but conflicts also come from land, power and injustice.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Outline **two** Christian views about war.",
        points: [["Pacifism: violence and war are always wrong, and conflicts should be resolved without them", 2], ["Just war: as a last resort, force may be used to defend the innocent if conditions such as just cause and proportion are met", 2]],
        modelAnswer: "Pacifists hold that violence and war are always wrong and that conflicts should be resolved without them. Supporters of the just war tradition hold that, as a last resort, force may be used to defend the innocent if conditions such as just cause and proportion are met.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain **one** way in which Indigenous Religion promotes peace.",
        points: [["Unhu teaches respect, hospitality and sharing of problems", 1], ["Developed: people learn to treat others with dignity and to settle quarrels before they grow", 1], ["Elders settle disputes at the dare or inkundla and use ceremonies of reconciliation", 1], ["Developed: relationships between people, and with the ancestors, are restored", 1]],
        modelAnswer: "Unhu teaches respect, hospitality and sharing of problems, so people learn to treat others with dignity and to settle quarrels before they grow. Elders also settle disputes at the dare or inkundla and use ceremonies of reconciliation, so relationships between people, and with the ancestors, are restored.",
      }),
      P.manual({
        label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 280 },
        stem: "Assess how far religious teachings on peace are enough to end conflict.",
        points: [["For: teachings on peace, forgiveness and reconciliation shape values and guide behaviour in all four religions", 2], ["For: believers act as mediators, run interfaith groups and support reconciliation", 2], ["Against or limits: conflicts have political, economic and social causes; believers interpret teachings differently, and some misuse religion; justice and fair laws are also needed", 2], ["A supported judgement", 2]],
        levels: levels(8),
        modelAnswer: "Religious teachings on peace are powerful. Judaism, Christianity, Islam and Indigenous Religion all teach peace, forgiveness and reconciliation, and these teachings shape values and guide behaviour. Believers act as mediators, run interfaith groups and support reconciliation. However, many conflicts have political, economic and social causes, believers interpret teachings differently, and some misuse religion, so justice and fair laws are also needed. I conclude that religious teachings on peace are an important foundation, but they are not enough on their own to end conflict.",
      }),
    ],
    hints: ["Consider the strength of the teachings and what else is needed in (c)."],
    explanation: "A strong answer weighs the influence of religious teachings against other causes of conflict.",
  });

  b.card("DEFINITION", "What is **pacifism**?", "The belief that violence and war are always wrong and that conflicts should be resolved without them.");
  b.card("DEFINITION", "What is **sulh**?", "The Islamic term for reconciliation or settlement between disputing parties.");
  b.card("FACT", "Which passages speak of swords turned into ploughshares?", "Isaiah 2:4 and Micah 4:3.");
  b.card("FACT", "Which verse says, in effect, that peacemakers are blessed?", "Matthew 5:9.");
  b.card("FACT", "Which verses tell believers to make peace between groups of believers who fight?", "Qur'an 49:9-10.");
  b.card("FACT", "What are the words for peace in Judaism, Islam, Shona and Ndebele?", "Shalom, salaam, rugare (also runyararo) and ukuthula.");
  b.card("CONCEPT", "What does jihad mean?", "Striving, including the inner struggle to live well; armed defence is allowed only under strict conditions.");
  b.card("CONCEPT", "What is the role of elders in Indigenous Religion in peace-making?", "They settle disputes at the dare or inkundla and use ceremonies to restore relationships with people and ancestors.");
  b.card("CONCEPT", "What are the two main Christian views on war?", "Pacifism (violence is always wrong) and just war (force as a last resort under strict conditions).");
});
