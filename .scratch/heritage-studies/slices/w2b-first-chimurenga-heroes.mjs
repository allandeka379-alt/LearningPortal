// W2b: heroes and heroines of the First Chimurenga/Umvukela (her.colonisation.first-chimurenga-heroes).
import { concept, P, source, table, levels } from "../lib.mjs";

concept("her.colonisation.first-chimurenga-heroes", { file: "colonisation/first-chimurenga-heroes", keyPrefix: "colonisation.first-chimurenga-heroes" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What was the name of the medium of the **Nehanda** spirit during the First Chimurenga?",
    options: [
      ["Charwe Nyakasikana", "Correct: she carried the Nehanda spirit."],
      ["Gumboreshumba", "Gumboreshumba was the medium of Kaguvi."],
      ["Mkwati", "Mkwati was linked with the Mwari shrines."],
      ["Chingaira", "Chingaira was Chief Makoni."],
    ],
    answer: "A",
    explanation: "Mbuya Nehanda: Charwe Nyakasikana. Sekuru Kaguvi: Gumboreshumba.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "When were Mbuya Nehanda and Sekuru Kaguvi **executed**?",
    options: [
      ["April 1898", "Correct."],
      ["March 1896", "The Matabeleland rising began in March 1896."],
      ["September 1890", "The Pioneer Column arrived in September 1890."],
      ["April 1980", "Zimbabwe became independent on 18 April 1980."],
    ],
    answer: "A",
    explanation: "Both were captured in late 1897 and executed in April 1898.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which leader is believed to have **linked** the Ndebele and Shona risings through the Mwari shrines?",
    options: [
      ["Mkwati", "Correct: he was associated with the Mwari shrines in the Matobo Hills."],
      ["Mashayamombe", "Mashayamombe led resistance from his stronghold in Mashonaland."],
      ["Lobengula", "Lobengula died in early 1894, before the risings."],
      ["Cecil Rhodes", "Rhodes led the Company side."],
    ],
    answer: "A",
    explanation: "Mkwati's link with the Mwari shrines connected Matabeleland and Mashonaland.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which chief led armed resistance from caves and hills in the **east** and was executed in 1897?",
    options: [
      ["Makoni (Chingaira)", "Correct: he led resistance in the Makoni area."],
      ["Mashayamombe", "Mashayamombe's stronghold was south-west of Salisbury."],
      ["Mzilikazi", "Mzilikazi died in 1868."],
      ["Changamire Dombo of the Rozvi", "Dombo founded the Rozvi state in the 1600s."],
    ],
    answer: "A",
    explanation: "Chief Makoni (Chingaira) was captured and executed in 1897.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is an example of **commemoration**?",
    options: [
      ["Unveiling a statue of Mbuya Nehanda in Harare", "Correct: a statue honours her memory."],
      ["Collecting hut tax from every village in the district each year", "This was a cause of the risings, not commemoration."],
      ["Signing the Rudd Concession", "This was a treaty of 1888."],
      ["Building a laager of wagons", "A laager was a defensive position."],
    ],
    answer: "A",
    explanation: "Commemoration honours memory through statues, names, songs and ceremonies.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did fighters in the Second Chimurenga draw inspiration from Nehanda and Kaguvi?",
    options: [
      ["They saw their struggle as continuing the resistance of 1896-97", "Correct: the 1896-97 leaders were symbols of resistance."],
      ["Nehanda and Kaguvi personally trained the guerrillas", "Nehanda and Kaguvi died in 1898."],
      ["The Lancaster House Agreement named them as leaders", "The agreement of 1979 did not name them."],
      ["They had won the First Chimurenga militarily", "The risings were defeated militarily."],
    ],
    hints: ["Why was the later war called the Second Chimurenga?"],
    answer: "A",
    explanation: "The nationalists presented their war as the continuation of the First Chimurenga.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What does Mbuya Nehanda's place in history show about **women** in the struggle against colonial rule?",
    options: [
      ["Women could hold leading roles and great authority", "Correct: Nehanda was a highly respected leader."],
      ["Women were not allowed to take part in the risings", "Women took part in many ways."],
      ["Only women fought in 1896-97", "Men and women both took part."],
      ["Women led only the Ndebele regiments", "Regiments were led by izinduna."],
    ],
    hints: ["Think about her authority as a medium."],
    answer: "A",
    explanation: "Nehanda's authority shows that women played leading roles.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A learner writes a speech for a school play and puts invented words into Nehanda's mouth, presenting them as her real words. What is the **best** advice?",
    options: [
      ["Make clear the words are imagined, or keep to known facts", "Correct: invented words must not be presented as real."],
      ["Add a date to make the words seem more authentic", "Adding a date would make the problem worse."],
      ["Claim the words come from a government document", "This would be presenting an invented source as real."],
      ["Remove all mention of Nehanda from the play", "She can be included accurately; she need not be removed."],
    ],
    hints: ["What separates history from fiction?"],
    answer: "A",
    explanation: "Honour real leaders accurately: label imagined words as imagined and rely on evidence.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Gumboreshumba was the medium of the Kaguvi spirit.",
    answer: true,
    explanation: "True. Sekuru Kaguvi's medium was Gumboreshumba.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Lobengula was one of the leaders of the 1896 rising in Matabeleland.",
    answer: false,
    explanation: "False. Lobengula died in early 1894; the 1896 rising was led by izinduna, members of the royal family and religious leaders such as Mkwati.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each leader with his or her role.",
    pairs: [
      ["Mbuya Nehanda", "Spirit medium who encouraged resistance in the Mazowe area"],
      ["Sekuru Kaguvi", "Spirit medium who spread the call to fight in central Mashonaland"],
      ["Mkwati", "Linked with the Mwari shrines in the Matobo Hills"],
      ["Mashayamombe", "Chief who held out in his stronghold until killed in 1897"],
    ],
    explanation: "Each leader played a different role in the risings.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "A statue of Mbuya Nehanda was unveiled in Harare in {{blank:a}}. A person who suffers or is killed for a cause and is honoured for it is called a {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["2021"], choices: ["2021", "1980", "1898", "1965"] },
      { id: "b", accepted: ["martyr"], choices: ["martyr", "medium", "concession seeker", "settler"] },
    ],
    explanation: "Statue: 2021. Martyr: someone honoured for suffering or dying for a cause.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What is the Shona word for a spirit medium?",
    accepted: ["svikiro", "masvikiro"],
    wrong: ["sabhuku", "nganga"],
    explanation: "**Svikiro** (plural masvikiro).",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Identify **four** heroes or heroines of the First Chimurenga/Umvukela.",
    points: ["Mbuya Nehanda (Charwe Nyakasikana)", "Sekuru Kaguvi (Gumboreshumba)", "Mkwati", "Chief Mashayamombe / Chief Makoni / an Ndebele leader"],
    modelAnswer: "Mbuya Nehanda, Sekuru Kaguvi, Mkwati and Chief Makoni.",
    explanation: "One mark per correctly named leader.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain the role played by **Mbuya Nehanda** in the First Chimurenga.",
    points: [
      "As medium of a highly respected spirit she had great authority",
      "She encouraged people in the Mazowe area to resist Company rule",
      "She was regarded by many as a leader of the rising in her area",
      "Her capture and execution (April 1898) made her a symbol / martyr who inspired later generations",
    ],
    modelAnswer: "As the medium of Nehanda, Charwe Nyakasikana had great authority. She encouraged people in the Mazowe area to resist Company rule and was regarded by many as a leader of the rising there. After her capture she was executed in April 1898, and she became a symbol who inspired later generations.",
    hints: ["Authority, action and legacy."],
    explanation: "One mark per point.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Suggest **two** ways in which your school could honour the heroes and heroines of the First Chimurenga accurately.",
    points: [
      "Suggests e.g. a research project or display using reliable sources",
      "Explains: learners learn what each leader really did, avoiding myths",
      "Suggests e.g. naming a house or building, or a commemoration on a national day",
      "Explains: with an accurate plaque or talk, it keeps their memory alive and builds identity",
    ],
    modelAnswer: "Learners could research the leaders using reliable books and museum information and make a display, so that they learn what each leader actually did. The school could name a house or building after a leader and put up an accurate plaque, which keeps their memory alive and builds pride.",
    hints: ["Research and commemoration."],
    explanation: "Credit realistic suggestions, each explained.",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: source("Source A", "a programme for a fictional Heroes Day event at a school in Bindura, 2026",
      "Programme: 1. Poem about Mbuya Nehanda and Sekuru Kaguvi by Form 3. 2. Talk by a guest from the local museum on the leaders of the First Chimurenga, including Mkwati and Chief Makoni. 3. Song from the liberation war. 4. Learners' display: \"From the First Chimurenga to independence\"."),
    parts: [
      P.mcq({
        label: "(a)", stem: "Which item in Source A **links** the First Chimurenga with the liberation war?",
        options: [
          ["The display \"From the First Chimurenga to independence\"", "Correct: it connects the two struggles."],
          ["The talk by the local museum guest on the leaders of the risings", "The talk is about the First Chimurenga only."],
          ["The poem by Form 3", "The poem is about the two mediums."],
          ["The list of leaders' names", "Names alone do not make the link."],
        ],
        answer: "A",
        explanation: "The display shows the line from 1896-97 to 1980.",
      }),
      P.short({
        label: "(b)", marks: 1,
        stem: "Name **one** spirit medium mentioned in Source A.",
        accepted: ["Mbuya Nehanda", "Nehanda", "Sekuru Kaguvi", "Kaguvi", "Mkwati"],
        wrong: ["Makoni"],
        explanation: "Nehanda, Kaguvi and Mkwati are named; Makoni was a chief.",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Explain **three** reasons why events like the one in Source A are important.",
        points: [
          "Build national identity", "Developed: learners share a history of resistance from 1896 to 1980",
          "Inspire values", "Developed: courage, sacrifice and love of the land",
          "Teach accurate history / recognise women and indigenous religion", "Developed: a museum speaker gives evidence; Nehanda shows women's leadership",
        ],
        modelAnswer: "Such events build national identity, because learners see a shared history of resistance from 1896 to independence. They teach values such as courage, sacrifice and love of the land. With a museum speaker, learners hear accurate history, and the attention to Nehanda shows that women held leading roles.",
      }),
    ],
    hints: ["Think about identity, values and learning."],
    explanation: "Applying understanding of commemoration to a school programme.",
  });
  b.struct({
    d: 4, skill: "EVALUATION",
    stem: "Answer the questions on the leaders of the First Chimurenga/Umvukela.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe the roles played by **two** chiefs or Ndebele leaders in the risings.",
        points: ["Mashayamombe led armed resistance from his fortified stronghold", "and held out until he was killed in 1897", "Makoni (Chingaira) / Ndebele izinduna led resistance from caves and hills / led regiments", "e.g. Makoni was executed in 1897; izinduna negotiated with Rhodes at the indabas"],
        modelAnswer: "Chief Mashayamombe led armed resistance from his fortified stronghold south-west of Salisbury and held out until he was killed in 1897. Chief Makoni (Chingaira) led resistance in the east from caves and hills and was executed in 1897.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Spirit mediums were the most important leaders of the First Chimurenga/Umvukela.\" How far do you agree?",
        points: [
          ["For: Nehanda, Kaguvi and Mkwati inspired and encouraged risings; gave religious authority", 2],
          ["Against: chiefs such as Mashayamombe and Makoni and Ndebele izinduna led the fighting and strongholds", 2],
          ["Debate: Ranger stressed mediums' coordination; Cobbing and Beach stressed local chiefs", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "Spirit mediums were very important. Nehanda, Kaguvi and Mkwati gave the risings religious authority, telling people that the ancestors wanted the newcomers gone, and they encouraged chiefs to join. Mkwati is believed to have linked the Ndebele and Shona risings.\n\nHowever, chiefs and izinduna led the actual fighting. Mashayamombe and Makoni organised strongholds and held out for many months, and Ndebele leaders commanded regiments and negotiated with Rhodes. Historians disagree: Terence Ranger argued that mediums coordinated the risings, while Julian Cobbing and David Beach argued that leadership was more local.\n\nOverall, I agree only partly. Mediums were the most important source of inspiration, but chiefs and izinduna were equally important as military leaders.",
      }),
    ],
    hints: ["In (b), compare inspiration with military leadership."],
    explanation: "Describe (a) and evaluate (b) the roles of the leaders.",
  });

  b.card("FACT", "Medium of Mbuya Nehanda in 1896-97?", "Charwe Nyakasikana.");
  b.card("FACT", "Medium of Sekuru Kaguvi in 1896-97?", "Gumboreshumba.");
  b.card("FACT", "When were Nehanda and Kaguvi executed?", "April 1898.");
  b.card("FACT", "Who was Mkwati?", "A leader linked with the Mwari shrines in the Matobo Hills, believed to have linked the Ndebele and Shona risings.");
  b.card("FACT", "Two Shona chiefs who led resistance in 1896-97?", "Mashayamombe (killed 1897) and Makoni / Chingaira (executed 1897).");
  b.card("DEFINITION", "Commemoration", "Honouring the memory of a person or event through monuments, names, songs or ceremonies.");
  b.card("DEFINITION", "Martyr", "A person who suffers or is killed for a cause and is honoured for it.");
  b.card("CONCEPT", "Why remember the heroes of 1896-97?", "National identity, inspiration for the Second Chimurenga, recognition of women and indigenous religion, values of courage and sacrifice.");
  b.card("FACT", "How is Mbuya Nehanda commemorated?", "A statue in Harare (2021), the Mbuya Nehanda Maternity Hospital, songs, poems and school lessons.");
});
