// W4a: Religious organisations and enterprise. All organisations in stems are fictional or generic.
import { concept, P, source, levels, ref } from "../lib.mjs";

concept("frs.enterprise.religious-projects", { file: "enterprise/religious-projects", keyPrefix: "enterprise.religious-projects" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a mukando (round)?",
    options: [
      ["A savings club in which members take turns to receive pooled contributions", "Correct: the meaning of mukando."],
      ["A ceremony held to bring home the spirit of a dead person after the burial", "That is kurova guva or umbuyiso."],
      ["A fast observed by Muslims throughout the whole month of Ramadan each year", "That is Sawm."],
      ["A school run by a church for the children of its own members only", "That is not the meaning of mukando."],
    ],
    answer: "A",
    explanation: "A **mukando (round)** is a savings club in which members take turns to receive the pooled contributions.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is an income-generating project?",
    options: [
      ["A project, such as a farm or shop, run to earn money", "Correct: for example to pay school fees for orphans."],
      ["A service held every week to worship God in a building", "That is a worship service."],
      ["A gift given to the poor after the end of a fast", "That is a charitable gift, not a project."],
      ["A group that studies scripture on one evening a week", "That is a study group."],
    ],
    answer: "A",
    explanation: "An **income-generating project** is run to earn money for a purpose, such as paying for the work of a church or for orphans' school fees.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of these is an example of a project run by religious organisations that serves a rural community?",
    options: [
      ["A mission clinic that treats patients of all faiths", "Correct: a health project."],
      ["A private casino owned by an individual", "Not a religious project."],
      ["A ceremony held once a year to remember the ancestors", "A ceremony is not an enterprise project."],
      ["A law passed by Parliament on school fees", "This is government action."],
    ],
    answer: "A",
    explanation: "Mission **clinics and hospitals** are religious projects that serve rural communities.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which Bible passage records that the apostle Paul supported himself as a tentmaker?",
    options: [
      [ref("Acts", 18, 3), "Correct: Paul worked with Aquila and Priscilla."],
      [ref("Genesis", 2, 24), "This verse is about marriage."],
      [ref("Exodus", 20, "13"), "This verse is a commandment about killing."],
      [ref("Mark", 10, "46-52"), "This passage describes Jesus healing a blind man."],
    ],
    answer: "A",
    explanation: `**${ref("Acts", 18, 3)}** says that Paul worked as a tentmaker, an example of honest enterprise.`,
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In Islam, what is a waqf?",
    options: [
      ["Property whose income is permanently set aside for charity", "Correct: an endowment."],
      ["A fast observed from dawn to sunset throughout the month of Ramadan", "That is sawm."],
      ["A pilgrimage to the sacred city of Makkah once in a lifetime", "That is Hajj."],
      ["A prayer led by an imam in the mosque on Friday afternoon", "That is Jumu'ah prayer."],
    ],
    answer: "A",
    explanation: "A **waqf** is an endowment whose income is permanently used for charity, for example for schools or the poor.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A congregation's poultry project keeps records, a council checks them monthly, and the profit is reported at the annual meeting. Which problem does this practice help to prevent?",
    options: [
      ["Lack of accountability and misuse of funds", "Correct: openness protects against misuse."],
      ["The need for any kind of income for the church", "The project earns income."],
      ["The use of church land for farming projects", "This is not a problem it addresses."],
      ["The teaching of religion to children in the church", "This is not a problem it addresses."],
    ],
    answer: "A",
    hints: ["Think about checking and reporting."],
    explanation: "Records, checks and reports promote **accountability** and reduce the risk that funds are misused.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which situation is an example of commercialisation of religion?",
    options: [
      ["A leader sells miracle items at very high prices to poor members", "Correct: faith is turned into business."],
      ["A church uses profit from a farm to pay school fees for orphans", "This is a use of profit for service."],
      ["A mosque runs a savings club to help members in emergencies", "This is a service to members."],
      ["A synagogue uses a community fund to give interest-free loans", "This is a service to those in need."],
    ],
    answer: "A",
    hints: ["Look for the example in which religion is used mainly to make money."],
    explanation: "**Commercialisation** means turning faith into a business, for example by selling items or services at high prices to the poor.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement best assesses religious enterprise projects?",
    options: [
      ["They give valuable services and income, but need honesty and openness to avoid harm", "Correct: benefits and risks."],
      ["They are always harmful because religion should have nothing at all to do with money", "Many projects serve communities."],
      ["They are never a problem, because religious leaders cannot make any mistakes", "Problems such as mismanagement occur."],
      ["They are useful only to the members of the same religious group that runs them", "Many serve people of all faiths."],
    ],
    answer: "A",
    hints: ["Look for the answer that includes both benefits and risks."],
    explanation: "Religious enterprise gives **services and income**, but without openness and fairness it can lead to mismanagement and exploitation.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Mission schools and clinics are examples of projects run by religious organisations.",
    answer: true,
    explanation: "True. Mission schools, clinics and hospitals are among the best-known religious projects.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Only churches run enterprise projects; mosques and other groups do not.",
    answer: false,
    explanation: "False. Mosques, synagogues and Indigenous Religion communities also run projects, such as savings clubs, waqf endowments and the zunde ramambo.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each project with the way it serves people.",
    pairs: [["Skills centre", "Trains young people to earn a living"], ["Mission hospital", "Gives health care to rural patients"], ["Burial society", "Helps members to meet funeral costs"], ["Church farm", "Supplies food and gives work"]],
    explanation: "Each project serves a need as described in the lesson table.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Meeting one's own needs through one's own work is called {{blank:a}}; an endowment in Islam whose income is used for charity is a {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["self-reliance"], choices: ["self-reliance", "pilgrimage", "initiation", "revelation"] },
      { id: "b", accepted: ["waqf"], choices: ["waqf", "tithe", "bira", "sukkah"] },
    ],
    explanation: "**Self-reliance**; a **waqf**.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which book of the Bible praises a capable woman who buys a field and sells garments? (one word)",
    accepted: ["Proverbs"],
    wrong: ["Genesis", "Acts"],
    explanation: "**Proverbs** 31 describes the capable woman (verses 16 and 24).",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "Identify **three** types of enterprise project run by religious organisations.",
    points: ["Schools", "Hospitals or clinics", "Farms, skills centres, savings clubs, publishing or transport"],
    modelAnswer: "Religious organisations run schools, hospitals or clinics, and farms, skills centres, savings clubs, publishing or transport.",
    explanation: "One mark for each type.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways in which a religious organisation's farm can serve its community.",
    points: [
      ["It supplies food", 1],
      ["Developed: the harvest can feed members, schools and clinics, and surplus can be sold", 1],
      ["It gives work and income", 1],
      ["Developed: unemployed people can earn a living and profits can pay for orphans' school fees", 1],
    ],
    modelAnswer: "A farm supplies food: the harvest can feed members, schools and clinics, and the surplus can be sold. It also gives work and income, so unemployed people can earn a living and profits can pay for orphans' school fees.",
    hints: ["Think of food and of jobs."],
    explanation: "One mark for each way and one for developing it.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain **two** problems that can arise in religious enterprise projects, and how each could be reduced.",
    points: [
      ["Mismanagement or misuse of funds", 1],
      ["Developed: without records and checks money can be lost; keeping records and holding audits reduces the risk", 2],
      ["Exploitation of followers", 1],
      ["Developed: members may be pressed to work for nothing or give beyond their means; fair pay and a council including members help to prevent this", 2],
    ],
    modelAnswer: "One problem is mismanagement or misuse of funds. Without records and checks money can be lost, so keeping records and holding audits reduces the risk. Another is exploitation of followers. Members may be pressed to work for nothing or to give beyond their means, so fair pay and a council that includes members help to prevent this.",
    hints: ["Give each problem and a way to reduce it."],
    explanation: "Two problems, each stated (1) and developed with a remedy (2).",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "an extract from a fictional newspaper report from Bindura, 2026",
      "A women's group linked to a mosque in Bindura has started a sewing project. Members contributed a small amount each month to buy two sewing machines, and the group now makes school uniforms for sale. \"We keep a book of every payment,\" said the treasurer, Aisha. \"Part of the profit goes to a fund that helps any member who has a funeral or an illness in the family.\""
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "According to Source A, what does the group make for sale?",
        options: [
          ["School uniforms", "Correct: the group makes school uniforms."],
          ["Wooden furniture", "The source does not say this."],
          ["Bread and flour", "The source does not say this."],
          ["School exercise books", "The source does not say this."],
        ],
        answer: "A", explanation: "The group makes school uniforms for sale.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Using Source A, state **three** features of the sewing project.",
        points: ["Members contributed a small amount each month to buy two sewing machines", "A book of every payment is kept", "Part of the profit goes to a fund for members who have a funeral or illness"],
        modelAnswer: "Members contributed a small amount each month to buy two sewing machines, a book of every payment is kept, and part of the profit goes to a fund for members who have a funeral or illness.",
      }),
      P.manual({
        label: "(c)", marks: 4, stem: "Explain how the project in Source A shows good practice in a religious organisation's enterprise.",
        points: [["Members contribute together, which builds self-reliance", 1], ["Accurate records are kept, which shows accountability", 1], ["Profit is used to help members in need, which serves the community", 1], ["The project provides skills, work and uniforms for sale, benefiting others", 1]],
        modelAnswer: "Members contribute together, which builds self-reliance. Accurate records are kept, which shows accountability. Profit is used to help members in need, which serves the community, and the project provides skills, work and uniforms for sale.",
      }),
    ],
    hints: ["In (c) look at the records, the fund and the contribution of members."],
    explanation: "The source shows self-reliance, accountability and service together.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1200,
    stem: "Thandeka says: \"Religious organisations should run enterprise projects, because they serve the community.\" Mthulisi says: \"Religious organisations should concentrate on worship and leave business to others.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Outline **two** enterprise projects run by religious organisations.",
        points: [["A first project, with how it serves people", 2, ["A mission clinic giving health care", "A school giving education", "A farm supplying food and income", "A savings club helping members in emergencies"]], ["A second project, with how it serves people", 2]],
        modelAnswer: "A mission clinic gives health care to patients of all faiths in rural areas. A savings club (mukando) helps members to meet emergencies such as a funeral without falling into debt.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 220 },
        stem: "Discuss the views of Thandeka and Mthulisi.",
        points: [
          ["Thandeka: projects provide services that meet needs, such as schools and clinics", 2],
          ["Developed: income from projects supports the religious work and gives jobs", 1],
          ["Mthulisi: business can distract from worship, and can lead to mismanagement or exploitation of members", 2],
          ["Developed: if leaders become focused on profit, the organisation may lose trust", 1],
          ["A supported conclusion, for example that projects are valuable with honesty, accountability and a clear purpose", 2],
        ],
        levels: levels(8),
        modelAnswer: "Thandeka is right that projects provide services that meet real needs, such as schools and clinics, and income from projects supports the religious work and gives jobs.\n\nMthulisi is right that business can distract from worship, and can lead to mismanagement or exploitation of members. If leaders become focused on profit, the organisation may lose trust. I think projects are valuable when they are run honestly and openly with a clear purpose of serving the community, so the answer depends on how they are managed.",
        explanation: "Level marking: both views developed, with examples, and a supported conclusion.",
      }),
    ],
    hints: ["In (b) give benefits and risks before judging."],
    explanation: "Practice question on the role of religious organisations in enterprise.",
  });

  b.card("DEFINITION", "What is a mukando (round)?", "A savings club in which members contribute regularly and take turns to receive the pooled money.");
  b.card("DEFINITION", "What is self-reliance?", "Meeting one's own needs through one's own work and resources.");
  b.card("DEFINITION", "What is a waqf?", "An Islamic endowment: property whose income is set aside permanently for charity.");
  b.card("FACT", "Which Bible passage says Paul worked as a tentmaker?", "Acts 18:3.");
  b.card("FACT", "Which chapter of Proverbs praises a capable woman who buys a field and sells garments?", "Proverbs 31 (verses 16 and 24).");
  b.card("CONCEPT", "Name four types of project run by religious organisations.", "Schools, hospitals and clinics, farms, skills centres (also publishing, transport, savings schemes).");
  b.card("CONCEPT", "What is commercialisation of religion?", "Turning faith into a business, for example by selling religious items or services at high prices to the poor.");
  b.card("CONCEPT", "Name two ways to reduce misuse of funds in a religious project.", "Keep honest records and hold audits or checks by a council that includes members.");
});
