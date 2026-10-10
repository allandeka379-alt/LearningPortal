// W3b: Religion and the establishment of educational institutions (Topic 7.2).
import { concept, P, source, levels } from "../lib.mjs";

concept("frs.education.institutions", { file: "education/institutions", keyPrefix: "education.institutions" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a mission school?",
    options: [
      ["A school started and run by a church or missionary society", "Correct: it usually stood next to a mission station."],
      ["A school started by the government for civil servants' children", "That describes a government school."],
      ["A school that teaches only the skills of herding and farming", "Mission schools taught reading and arithmetic as well."],
      ["A school run only by Muslim teachers in a mosque compound", "That would be a madrasah, not a mission school."],
    ],
    answer: "A",
    explanation: "A **mission school** was started by a church or missionary society, usually beside a mission station.",
  });
  b.mcq({
    d: 1, skill: "RECALL", daily: false,
    stem: "Which society opened the Inyati mission in Matabeleland in 1859?",
    options: [
      ["London Missionary Society", "Correct: the LMS opened Inyati and later Hope Fountain."],
      ["The Salvation Army Mission Board", "The Salvation Army did not found Inyati."],
      ["The Seventh-day Adventist Church", "Adventists are linked with Solusi, not Inyati."],
      ["The United Methodist Church", "The Methodists are linked with Old Mutare and Waddilove."],
    ],
    answer: "A",
    explanation: "Inyati was opened by the **London Missionary Society** in 1859.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which pair of institutions was founded by Catholic (Jesuit) missions?",
    options: [
      ["Chishawasha and Kutama", "Correct: both are Catholic (Jesuit) missions."],
      ["Waddilove and Old Mutare", "These are Methodist institutions."],
      ["Dadaya and Waddilove", "Dadaya is a Church of Christ mission and Waddilove is Methodist."],
      ["Inyati and Hope Fountain", "These are London Missionary Society missions."],
    ],
    answer: "A",
    hints: ["Think of the Jesuits near Harare and in Zvimba."],
    explanation: "**Chishawasha** and **Kutama** are Catholic (Jesuit) missions.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which university in Mutare was founded by the United Methodist Church?",
    options: [
      ["Africa University", "Correct: it stands near the old Methodist mission at Old Mutare."],
      ["Catholic University of Zimbabwe", "That university is in Harare and is linked to the Catholic bishops."],
      ["Solusi University", "Solusi is an Adventist university near Bulawayo."],
      ["University of Zimbabwe", "That is a state university in Harare."],
    ],
    answer: "A",
    explanation: "**Africa University** in Mutare is a United Methodist university.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why did Protestant missionaries in particular place such importance on teaching people to read?",
    options: [
      ["So that converts could read the Bible for themselves", "Correct: literacy and scripture went together."],
      ["So that people could pay their taxes to the colonial state", "That was not the missionaries' religious aim."],
      ["So that traditional leaders could be removed from their positions", "Mission schools did not aim to remove chiefs."],
      ["So that children would no longer need to help at home", "Reading in order to read scripture was the reason given."],
    ],
    answer: "A",
    hints: ["What book was central to Protestant Christianity?"],
    explanation: "Missionaries wanted converts to be able to **read the Bible**.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", daily: true,
    stem: "Tafadzwa trained as a nurse at a mission hospital and now works in a rural clinic. Which contribution of religious institutions does her story show?",
    options: [
      ["Building human resource capacity", "Correct: the training supplied skilled workers for the nation."],
      ["Reducing the number of schools in the country", "Church institutions increased the number of schools."],
      ["Replacing traditional healers by law", "Training nurses did not involve any law of this kind."],
      ["Ending all costs of education for families", "Church institutions often charged fees."],
    ],
    answer: "A",
    hints: ["What does a trained nurse add to a country?"],
    explanation: "Training nurses, teachers and others **builds human resource capacity**.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which statement about the colonial period is supported by the history of mission education?",
    options: [
      ["The government left much African education to mission bodies", "Correct: missions supplied many of the schools for Africans."],
      ["The government built nearly all schools for African children", "Missions, not the state, provided many schools."],
      ["Missionaries were forbidden to open schools in Zimbabwe", "Missions were free to open and run schools."],
      ["Mission schools taught only the national language of England", "They taught reading, arithmetic, religion and skills."],
    ],
    answer: "A",
    hints: ["Who ran many of the schools for African children, and who paid grants?"],
    explanation: "In colonial times much African education was left to **mission bodies**, with grants from the government.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A student says: \"Mission schools did nothing but harm.\" Which reply is best supported by evidence?",
    options: [
      ["They gave real benefits as well as drawbacks, so the claim is too simple", "Correct: balanced evidence includes both."],
      ["They gave no benefits to anyone, so the claim is correct", "Literacy, training and leaders came from mission schools."],
      ["They were identical to indigenous education, so the claim is wrong", "They differed in method, place and teachers."],
      ["They were closed by the churches themselves before 1980", "Many church schools continue today."],
    ],
    answer: "A",
    hints: ["Weigh the benefits against the criticisms."],
    explanation: "The evidence shows **benefits and drawbacks**, so a one-sided claim is too simple.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Mission stations often included a school, a church and a clinic.",
    answer: true,
    explanation: "True. Many missions combined worship, education and health care.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A madrasah is a Jewish school where children learn Hebrew.",
    answer: false,
    explanation: "False. A madrasah is a Muslim school, where children learn to read the Qur'an and study Islam.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each institution with its founding church or body.",
    pairs: [
      ["Dadaya", "Church of Christ"],
      ["Waddilove", "Methodist Church"],
      ["Solusi University", "Seventh-day Adventist Church"],
      ["Catholic University of Zimbabwe", "Catholic bishops of Zimbabwe"],
    ],
    explanation: "Dadaya: Church of Christ. Waddilove: Methodist. Solusi: Seventh-day Adventist. Catholic University: the Catholic bishops.",
  });
  b.fib({
    d: 3, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Inyati was opened in {{blank:a}} by the London {{blank:b}} Society.",
    blanks: [
      { id: "a", accepted: ["1859"], choices: ["1759", "1859", "1959", "1980"] },
      { id: "b", accepted: ["Missionary"], choices: ["Missionary", "Medical", "Military", "Mining"] },
    ],
    hints: ["Remember the key fact box for this lesson."],
    explanation: "Inyati was opened in **1859** by the **London Missionary Society**.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What name is given to a Muslim school where children learn to read the Qur'an?",
    accepted: ["madrasah", "madrasa", "madrassa", "madrasah school"],
    wrong: ["synagogue", "seminary"],
    explanation: "It is called a **madrasah**.",
  });
  b.manualShort({
    d: 1, skill: "RECALL", marks: 3,
    stem: "Give **three** reasons why religious organisations founded schools.",
    points: ["To teach people to read the scriptures", "To train pastors, evangelists and teachers", "To serve the community and share their faith and values"],
    modelAnswer: "Religious organisations founded schools to teach people to read the scriptures, to train pastors and teachers, and to serve the community and share their faith and values.",
    explanation: "One mark for each reason.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how mission institutions helped to build the nation's human resource capacity.",
    points: [
      ["They trained teachers, nurses and clergy", 1],
      ["Developed: these trained people worked in schools and clinics, raising literacy and health", 1],
      ["They offered education in rural areas where few other schools existed", 1],
      ["Developed: pupils went on to become leaders and professionals in business, government and the churches", 1],
    ],
    modelAnswer: "Mission institutions trained teachers, nurses and clergy, who then worked in schools and clinics and raised literacy and health. They also offered education in rural areas where few other schools existed, so pupils went on to become leaders and professionals in business, government and the churches.",
    hints: ["Give a type of worker, then say what the country gained."],
    explanation: "Two points, each stated and developed.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain **two** criticisms that have been made of mission education during the colonial period.",
    points: [
      ["The curriculum often stressed religion, discipline and practical training suited to the colonial economy", 1],
      ["Developed: this limited the academic opportunities of African pupils compared with those in schools for settlers", 2],
      ["Some mission schools looked down on African customs and languages", 1],
      ["Developed: children were sometimes discouraged from speaking home languages or taking part in traditional practices, which weakened some cultural knowledge", 2],
    ],
    modelAnswer: "One criticism is that the curriculum often stressed religion, discipline and practical training suited to the colonial economy. This limited the academic opportunities of African pupils compared with those in schools for settlers. Another is that some mission schools looked down on African customs and languages, so children were sometimes discouraged from speaking home languages or taking part in traditional practices, which weakened some cultural knowledge.",
    hints: ["Think about the curriculum and about attitudes to local culture."],
    explanation: "Two criticisms, each stated (1) and developed (2). Credit any accurate criticism with development.",
  });

  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "an extract from a fictional school history booklet for a mission school in Masvingo Province, 2026",
      "Our school was started by a church mission. The first building was a chapel that was used as a classroom on weekdays. The missionaries taught reading, writing, arithmetic and farming, and later opened a small clinic. Today the church is the school's responsible authority, and the school admits pupils of every faith."
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "According to Source A, who is the school's responsible authority today?",
        options: [
          ["The church", "Correct: the source says so."],
          ["The local clinic committee", "The clinic is mentioned as part of the mission, not as an authority."],
          ["The missionary society overseas", "The source does not say this."],
          ["The Ministry of Defence of Zimbabwe", "The source does not mention it."],
        ],
        answer: "A", explanation: "The source says the church is the responsible authority.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Using Source A, identify **three** things the mission provided.",
        points: ["A chapel used as a classroom", "Teaching in reading, writing, arithmetic and farming", "A small clinic"],
        modelAnswer: "The mission provided a chapel used as a classroom, teaching in reading, writing, arithmetic and farming, and a small clinic.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain why a mission station often combined a school, a church and a clinic.",
        points: [["Missionaries saw education and health care as service to the community", 1], ["These services drew people to the station and helped to spread the faith", 1], ["Few other schools or clinics existed in rural areas, so the mission met a real need", 1]],
        modelAnswer: "Missionaries saw education and health care as a service to the community. The services also drew people to the station and helped to spread the faith. Few other schools or clinics existed in rural areas, so the mission met a real need.",
      }),
    ],
    hints: ["In (c) think of both religious and practical reasons."],
    explanation: "The source shows how mission stations joined worship, teaching and health care.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1200,
    stem: "In a class discussion about the history of schools in Zimbabwe, Sipho says: \"We should be grateful to the churches for our schools.\" Thandeka says: \"Churches also used schools to serve their own aims, and the benefits were not shared equally.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Name **two** institutions founded by religious bodies in Zimbabwe, and state the church or body that founded each.",
        points: [["A correct institution, such as Inyati, with its correct founding body (London Missionary Society)", 2], ["A second correct institution and founding body, such as Africa University (United Methodist Church)", 2]],
        modelAnswer: "Inyati was founded by the London Missionary Society. Africa University in Mutare was founded by the United Methodist Church.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain **one** way in which religious bodies contributed to education in Zimbabwe.",
        points: [["They built schools, colleges and universities", 1], ["Developed: this made education available in rural areas and trained many teachers and nurses", 1], ["They recorded local languages and produced books and teaching materials", 1], ["Developed: this helped literacy in Shona and Ndebele and preserved language knowledge", 1]],
        modelAnswer: "Religious bodies built schools, colleges and universities, which made education available in rural areas and trained many teachers and nurses.",
      }),
      P.manual({
        label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 280 },
        stem: "Assess the extent to which religious organisations have helped Zimbabwe to develop its human resources.",
        points: [["For: schools, colleges and universities trained teachers, nurses, clergy and leaders", 2], ["For: they reached rural areas and, today, work with government as responsible authorities", 2], ["Against or limits: the colonial curriculum limited opportunities; fees and denominational bias could exclude some", 2], ["A supported judgement", 2]],
        levels: levels(8),
        modelAnswer: "Religious organisations have helped greatly: schools, colleges and universities trained teachers, nurses, clergy and leaders, and they reached rural areas where few other schools existed. Today they work with government as responsible authorities. However, during the colonial period the curriculum limited opportunities for Africans, and fees or denominational preferences could exclude some children. I conclude that the contribution has been large, although its benefits were not always equal.",
      }),
    ],
    hints: ["Give benefits and limits, then weigh them in a short conclusion."],
    explanation: "A strong answer balances the contribution with the criticisms and judges how far the contribution was helpful.",
  });

  b.card("DEFINITION", "What is a **mission school**?", "A school started and run by a church or missionary society, usually beside a mission station.");
  b.card("DEFINITION", "What is **human resource capacity**?", "The skills, knowledge and training of a country's people, which it needs for its economy and public services.");
  b.card("DEFINITION", "What is a **madrasah**?", "A Muslim school where children learn to read the Qur'an and study Islam.");
  b.card("FACT", "Which society opened Inyati in 1859?", "The London Missionary Society.");
  b.card("FACT", "Which churches founded Chishawasha, Kutama, Waddilove and Dadaya?", "Chishawasha and Kutama: Catholic (Jesuit). Waddilove: Methodist. Dadaya: Church of Christ.");
  b.card("FACT", "Name three church universities in Zimbabwe.", "Africa University (United Methodist), the Catholic University of Zimbabwe, and Solusi University (Seventh-day Adventist).");
  b.card("CONCEPT", "Why did missionaries found schools?", "To teach converts to read scripture, train local helpers, serve communities and share their faith.");
  b.card("CONCEPT", "How did mission schools build human resource capacity?", "They trained teachers, nurses, clergy and leaders, many of whom served their communities and nation.");
  b.card("CONCEPT", "What criticism is made of mission education in the colonial period?", "Its curriculum was often limited and suited to the colonial economy, and some schools looked down on African customs.");
});
