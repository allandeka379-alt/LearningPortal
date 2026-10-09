// Slice ERD: reading skills — reading fiction (character, setting, plot, theme, style).
import { concept, P } from "../lib.mjs";

const ext = (text) => `Read the extract from a story and answer the question.\n\n> ${text}`;

const LAND = `Read the extract from a short story and answer the questions.

**[1]** The quarrel began, as most quarrels in the Mutasa family did, over a field. Sekuru Mutasa had farmed the long strip beside the river for forty years, and now his knees would no longer carry him down the slope. His elder son, Bernard, who drove a taxi in Harare and came home only at Christmas, wanted to rent the field to a tobacco grower from Rusape. His younger son, Tichaona, who had never left the village, wanted to plant it himself.

**[2]** "Rent brings cash," said Bernard, tapping the table with a finger that wore a gold ring. "Cash pays for medicine. Cash pays for school fees. What does a field of mealies pay for?"

**[3]** Tichaona said nothing for a long time. He looked at his father's hands, cracked and brown as the riverbank in October. "It paid for your school fees," he said at last.

**[4]** The old man listened to them both, his eyes half closed, as if he were listening to the weather. When he finally spoke, it was not to his sons but to his granddaughter, Nyasha, who had been sitting in the doorway pretending to read.

**[5]** "Child," he said, "go and tell your grandmother to put the kettle on. This will take longer than a field takes to grow."

**[6]** Nyasha went, but slowly. Behind her she heard Bernard's chair scrape back and Tichaona's voice, very quiet, saying something she could not catch. In the kitchen her grandmother was already pouring water into the kettle. She had heard it all before.`;

concept("eng.reading.fiction", { file: "reading/fiction", keyPrefix: "reading.fiction" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the **setting** of a story?",
    options: [
      ["Where and when the story takes place", "Correct: place, time and social world."],
      ["The main message or idea of the story", "That is the theme."],
      ["The sequence of events in the story", "That is the plot."],
      ["The person who tells the story", "That is the narrator."],
    ],
    answer: "A",
    explanation: "**Setting** = place, time and social world. It creates atmosphere and can shape events.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term with its meaning.",
    pairs: [
      ["plot", "the sequence of connected events"],
      ["theme", "an idea the story explores"],
      ["climax", "the moment of greatest tension"],
      ["narrator", "the voice that tells the story"],
      ["conflict", "the struggle that drives the plot"],
    ],
    explanation: "These are the basic tools for discussing any story.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: ext("*When the plate of roasted mealies came round, Farai took the two biggest cobs, then looked over his shoulder to see whether anyone had noticed.*") + "\n\nWhat does this suggest about Farai?",
    options: [
      ["He is greedy and knows he is doing wrong", "Correct: he takes the biggest and checks whether he was seen."],
      ["He is generous and shares his food", "He takes the biggest cobs for himself."],
      ["He is shy and afraid of other people", "Looking round shows guilt, not shyness."],
      ["He is ill and needs extra food", "Nothing suggests illness."],
    ],
    answer: "A",
    explanation: "Writers **show** character through action: taking the biggest cobs (greed) and checking over his shoulder (awareness of guilt, slyness).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "*I had never seen my mother cry until the morning the letter came.* From which **point of view** is this told?",
    options: [
      ["first person", "Correct: the narrator uses I and is a character in the story."],
      ["third person", "Third person uses he, she or they."],
      ["second person", "Second person addresses you."],
      ["the writer's own view", "A first-person narrator is a character, not necessarily the writer."],
    ],
    answer: "A",
    explanation: "A **first-person** narrator (*I*) tells the story from inside it, giving closeness but a limited view.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "True or false: *Family* is a theme, but *family loyalty can demand painful sacrifices* is only a topic.",
    answer: false,
    explanation: "False — the other way round. *Family* is a topic; *family loyalty can demand painful sacrifices* is a theme, because it states an idea about the topic.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: ext("*The homestead stood alone at the end of a sandy track, its thatch grey with age. In the evenings the only sound was the creak of the windmill, turning slowly whether there was water to pump or not.*") + "\n\nWhat atmosphere does the setting create?",
    options: [
      ["lonely and in decline", "Correct: isolation, old thatch and a useless windmill."],
      ["lively and full of hope", "Nothing suggests activity or hope."],
      ["dangerous and violent", "The scene is quiet, not violent."],
      ["busy and prosperous", "The windmill may have no water to pump: decline, not prosperity."],
    ],
    answer: "A",
    hints: ["Look at *alone*, *grey with age* and the windmill turning *whether there was water … or not*."],
    explanation: "Setting builds atmosphere: isolation (*alone*), age (*grey*) and pointless effort (the windmill) suggest loneliness and decline.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct stage of plot for each description.",
    template: "Characters and setting are introduced: {{blank:a}}. The conflict reaches its highest point: {{blank:b}}. The conflict is settled: {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["exposition"], choices: ["exposition", "climax", "resolution", "rising action"] },
      { id: "b", accepted: ["climax"], choices: ["climax", "exposition", "falling action", "resolution"] },
      { id: "c", accepted: ["resolution"], choices: ["resolution", "rising action", "climax", "exposition"] },
    ],
    explanation: "Exposition → rising action → climax → falling action → resolution.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A girl must decide whether to tell the head that her best friend stole exam papers. Which kind of conflict is this mainly?",
    options: [
      ["internal: a struggle within her own mind", "Correct: her loyalty fights her honesty."],
      ["external: a person against nature", "No natural force is involved."],
      ["external: a person against society", "The struggle is mainly her own choice."],
      ["no conflict, only a description", "A hard choice is a conflict."],
    ],
    answer: "A",
    hints: ["Where is the struggle taking place?"],
    explanation: "**Internal conflict** happens inside a character (loyalty vs honesty). External conflict sets a character against others, nature or society.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 1200,
    stem: LAND,
    parts: [
      P.mcq({
        label: "(a)",
        stem: "What is the main conflict in the extract?",
        options: [
          ["The two sons disagree about the future of the field", "Correct: rent it out or farm it."],
          ["Sekuru Mutasa refuses to let anyone use the field", "He has not yet given his view."],
          ["A tobacco grower tries to take the field by force", "The grower is only a possible tenant."],
          ["Nyasha wants to leave the village for Harare", "Nyasha's wishes are not mentioned."],
        ],
        answer: "A",
        explanation: "Bernard wants to rent the field for cash; Tichaona wants to farm it himself.",
      }),
      P.manual({
        label: "(b)",
        marks: 2,
        stem: "How does the writer present Bernard in paragraph 2? Refer to **one** detail.",
        points: [
          "Bernard is practical / money-minded / confident or a little showy",
          "Detail: repeats *cash*, taps the table, wears a gold ring",
        ],
        modelAnswer: "As money-minded and self-assured: he keeps repeating \"cash\" and taps the table with a finger wearing a gold ring.",
      }),
      P.manual({
        label: "(c)",
        marks: 2,
        stem: "In paragraph 3, Tichaona replies *It paid for your school fees*. Explain what he means and why this is a powerful answer.",
        points: [
          "Meaning: the field's crops paid for Bernard's education",
          "Power: it reminds Bernard of what he owes the land / turns his own argument against him",
        ],
        modelAnswer: "The mealies from the field once paid for Bernard's schooling, so the reply turns Bernard's question against him and reminds him of his debt to the land.",
      }),
      P.short({
        label: "(d)",
        stem: "In paragraph 3, the father's hands are compared to the riverbank. Which **month** is named in the comparison?",
        accepted: ["October"],
        wrong: ["Christmas"],
        explanation: "*cracked and brown as the riverbank in October* — at the end of the dry season.",
      }),
      P.manual({
        label: "(e)",
        marks: 2,
        stem: "What does Sekuru Mutasa's remark *This will take longer than a field takes to grow* suggest about him?",
        points: [
          "He is wise / patient / calm, not rushed into deciding",
          "He knows the quarrel is serious or long-standing and will not be settled quickly (gentle humour)",
        ],
        modelAnswer: "He is patient and wise: with dry humour he signals that the quarrel is deep and will not be solved quickly.",
      }),
      P.manual({
        label: "(f)",
        marks: 2,
        stem: "Suggest **one** theme the extract explores. Express it as an idea and support it.",
        points: [
          "A theme stated as an idea, e.g. tension between tradition / the land and money / the city; the generation gap; family duty",
          "Support from the extract, e.g. Bernard's cash vs Tichaona's farming; the grandmother has heard it all before",
        ],
        modelAnswer: "Money and the city can pull people away from the land that raised them: Bernard values cash, while Tichaona reminds him the field paid for his schooling.",
      }),
      P.mcq({
        label: "(g)",
        stem: "Why does the writer end with the grandmother who *had heard it all before*?",
        options: [
          ["It suggests the quarrel is an old one that keeps returning", "Correct: the repeated quarrel shows a deep, unresolved conflict."],
          ["It shows that the grandmother is deaf", "Heard it all before means familiarity, not deafness."],
          ["It reveals that the field has already been sold to a neighbour", "Nothing suggests a sale."],
          ["It introduces a new conflict about the kettle", "The kettle is a domestic detail, not a conflict."],
        ],
        answer: "A",
        explanation: "The calm, knowing ending suggests a long-running family pattern, linking back to *as most quarrels in the Mutasa family did*.",
      }),
    ],
    hints: ["Characters are shown through speech, actions and details.", "State a theme as an idea, not a single word."],
    explanation: "The extract sets a land-versus-cash conflict between two brothers, presents them through details (the gold ring, the silence) and hints at wider themes of family, tradition and change.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: `${LAND}\n\nWhy might the writer show the quarrel partly through Nyasha's eyes in paragraph 6?`,
    options: [
      ["It shows the effect of the quarrel on the next generation", "Correct: a child overhearing adds another viewpoint and wider stakes."],
      ["It proves that Nyasha is the main character of the whole novel", "One paragraph does not establish this."],
      ["It explains how the tobacco grower will use the field", "The grower is not discussed in paragraph 6."],
      ["It shows that Nyasha agrees with her uncle Bernard", "She cannot even hear the words clearly."],
    ],
    answer: "A",
    hints: ["What does a child witnessing a family quarrel add?"],
    explanation: "Moving the viewpoint to Nyasha widens the story: the quarrel affects the future generation, and her partial hearing adds suspense.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of these is a **minor** character's typical role?",
    options: [
      ["To support the plot or reveal something about a major character", "Correct: minor characters have supporting roles."],
      ["To be the central person whose choices drive the whole story forward", "That is a major character (protagonist)."],
      ["To narrate every event from beginning to end", "A narrator may or may not be a minor character."],
      ["To change completely by the end of the story", "Change is typical of major (dynamic) characters."],
    ],
    answer: "A",
    explanation: "**Minor** characters help the plot along or show us something about the major characters.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS",
    stem: ext("*Every morning Mai Tendai swept the yard twice, though there was nobody left to see it. Her children's rooms stood ready, beds made, as if the buses from Harare might still bring them home.*") + "\n\nWhat do these details suggest about Mai Tendai? Give **two** points.",
    marks: 2,
    points: [
      "She is lonely / misses her children, who have left",
      "She keeps hoping they will return / holds on to routine or the past (rooms ready, sweeping for no one)",
    ],
    modelAnswer: "She is lonely now her children have gone, and she still hopes they will come back, keeping their rooms ready.",
    hints: ["Why would someone sweep for *nobody*?"],
    explanation: "Characterisation through action: routine for no one shows loneliness; ready rooms show hope or denial.",
  });
  b.manualShort({
    d: 4, skill: "CREATION", examStyle: true,
    stem: "Write a short paragraph (80-120 words) recommending a novel or story you have read to a classmate. Include the title and author, a brief, spoiler-free outline, one character or theme with an example, and your personal response.",
    marks: 4,
    points: [
      "Title and author named; brief outline without retelling everything or spoiling the end",
      "One character or theme discussed",
      "A specific example from the book to support the point",
      "A personal response with a reason (why the classmate should read it)",
    ],
    modelAnswer: "In this novel, a girl from a mining town sets out to find the brother who vanished after a strike. I admired how the writer shows her stubborn courage: when the bus driver refuses to take her without a ticket, she walks forty kilometres rather than turn back. The book made me think about how far loyalty can push a person. If you like stories where ordinary people do brave things, you should borrow it from the library.",
    hints: ["Avoid retelling the whole plot; focus on one point with an example."],
    explanation: "A good recommendation is brief, specific and personal: one supported point is better than a long plot summary. (Your answer should name a real title and author you have read.)",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Which sentence about a story is the **best** analysis rather than retelling?",
    options: [
      ["The writer shows Tendai's fear through his shaking hands and short replies.", "Correct: it identifies a method of characterisation with evidence."],
      ["Tendai went to the river and then he came back home late.", "This only retells events."],
      ["The story is about Tendai and it is very good and interesting.", "This is vague and gives no evidence."],
      ["At the very end of the story Tendai finally meets his long-lost father again.", "This summarises the plot without analysis."],
    ],
    answer: "A",
    hints: ["Which sentence explains *how* the writer creates an effect?"],
    explanation: "Analysis explains **how** the writer presents something (actions, speech) with evidence; retelling only says what happened.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "True or false: the opinions of a first-person narrator are always the writer's own opinions.",
    answer: false,
    hints: ["Is a narrator the same as the author?"],
    explanation: "False. A first-person narrator is a character created by the writer. The narrator may be mistaken, biased or quite unlike the writer.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "Write the word, beginning with **d**, for a character who changes or develops during a story.",
    accepted: ["dynamic", "a dynamic character", "dynamic character"],
    model: "dynamic",
    wrong: ["static"],
    explanation: "A **dynamic** character changes (for example learns a lesson); a **static** character stays the same.",
  });

  b.card("DEFINITION", "Characterisation","How a writer presents a character: description, actions, speech, thoughts and others' reactions.", undefined);
  b.card("DEFINITION", "Major and minor characters", "Major characters drive the story and usually change; minor characters support the plot or reveal others.", undefined);
  b.card("DEFINITION", "Setting", "Where and when a story happens, including its social world; it creates atmosphere.", undefined);
  b.card("FACT", "Stages of plot", "Exposition → rising action → climax → falling action → resolution.", undefined);
  b.card("DEFINITION", "Internal and external conflict", "Internal: a struggle within a character's mind. External: against another person, nature or society.", undefined);
  b.card("CONCEPT", "Topic vs theme", "A topic is a word (family); a theme is an idea about it (family loyalty can demand sacrifice).", undefined);
  b.card("DEFINITION", "First- and third-person narrators", "First person uses I and is inside the story; third person uses he/she/they from outside.", undefined);
  b.card("CONCEPT", "Show, don't tell", "Writers reveal character through actions and details rather than stating qualities directly.", "Taking the biggest cobs and checking who saw → greedy and sly.");
  b.card("CONCEPT", "Writing about a book you have read", "Title and author, brief spoiler-free outline, one supported point on character or theme, personal response with reasons.", undefined);
});
