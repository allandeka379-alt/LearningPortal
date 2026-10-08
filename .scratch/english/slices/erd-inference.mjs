// Slice ERD: reading skills — inference.
import { concept, P } from "../lib.mjs";

const VISIT = `Read the extract and answer the question.

> Mai Farai had scrubbed the kitchen floor twice before breakfast. The best plates, the ones with the blue rim that usually stayed wrapped in newspaper, were already on the table, and she had sent her son to the shops for fizzy drinks even though it was only Tuesday. Every few minutes she stopped what she was doing to look down the dusty road towards the bus stop.`;

const SHOP = `Read the extract and answer the question.

> Mr Sibanda's shop had once been the busiest at the business centre. Now the shelves held a few tins of beans and a single bag of salt, the fridge stood unplugged in the corner with its door open, and the bell over the doorway had not rung all morning. Across the road, the new supermarket's car park was full.`;

const BOOTS = `Read the extract and answer the question.

> Simba laced up the football boots that his brother had left behind when he went to Johannesburg. They were a size too big, so he stuffed newspaper into the toes. Before the match he wiped the mud off them with his school jersey and held them for a moment, as if they might say something.`;

const LETTER = `Read the letter extract and answer the question.

> Dear Editor,
>
> Last month the council promised that the potholes on Fifth Street would be repaired "within two weeks". This morning I counted nineteen of them between the clinic and the school gate, and a kombi lost its exhaust pipe in one of them as I watched. I am sure the councillors drive very carefully on their own roads.
>
> Yours faithfully,
> R. Chikomo (Mrs)`;

const HOMECOMING = `Read the story extract and answer the questions.

**[1]** The letter from the hospital in Bulawayo arrived on a Friday, and by Saturday afternoon Rumbi's mother had sold two goats, borrowed her neighbour's suitcase and bought a bus ticket. She left before dawn on Sunday. "Look after your brothers," she said at the gate, pressing a folded note into Rumbi's hand. "Your grandmother will come on Wednesday." She did not say how long she would be away, and Rumbi did not ask.

**[2]** For the first two days Rumbi was too busy to think. She rose at five to light the fire, boiled water for the boys to wash, walked them to the primary school and ran the last kilometre to her own school so that the gate would not be closed in her face. In the evening she cooked, checked homework by candlelight and fell asleep sitting up.

**[3]** On Tuesday her younger brother, Tino, refused to eat. He pushed the plate away and said that Amai's sadza was softer. Rumbi felt something hot rise in her throat. She opened her mouth, then closed it again, scraped his food back into the pot and covered it with a plate for the morning.

**[4]** That night, after the boys were asleep, she unfolded the note for the first time. It held twenty US dollars and one line in her mother's careful handwriting: *For the days I cannot see.* Rumbi read it three times. Then she folded it smaller than before and slipped it into the pocket of her school uniform, where she could feel it all through the next day.

**[5]** When their grandmother's scotch cart creaked up the path on Wednesday, the boys ran to meet her. Rumbi stayed by the fire a moment longer, stirring a pot that did not need stirring.`;

concept("eng.reading.inference", { file: "reading/inference", keyPrefix: "reading.inference" }, (b) => {
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "What does it mean to make an **inference** when reading?",
    options: [
      ["To work out what the text suggests from clues", "Correct: an inference is a reasoned conclusion about an unstated meaning."],
      ["To copy the sentence that answers the question", "That is retrieval of explicit information."],
      ["To give the meaning of a difficult word", "That is vocabulary in context."],
      ["To shorten the main points of the passage", "That is summary writing."],
    ],
    answer: "A",
    explanation: "Inference = reaching a reasonable conclusion about something the text **implies**, using clues in the wording, and supporting it with evidence.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which question word or phrase most clearly signals an **inference** question?",
    options: [
      ["What does this suggest about…", "Correct: suggest asks for an implied meaning."],
      ["Name the town where…", "This asks for an explicit fact."],
      ["How many people were…", "This asks for a stated number."],
      ["Copy the phrase that…", "This asks you to retrieve words from the text."],
    ],
    answer: "A",
    explanation: "Inference signals: *suggest, imply, what impression, why do you think, what does this show, how can you tell*.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: `${VISIT}\n\nWhat can you infer from the extract?`,
    options: [
      ["Mai Farai is expecting an important visitor", "Correct: cleaning, best plates, special drinks and watching the road all point to a visitor."],
      ["Mai Farai is preparing to move house", "Nothing suggests packing or leaving; she is setting the table."],
      ["Mai Farai is angry with her son", "She sends him to the shops, but nothing shows anger."],
      ["Mai Farai is waiting for a delivery of plates", "The plates are already hers; they were stored in newspaper."],
    ],
    answer: "A",
    explanation: "Collect the clues: scrubbing twice, the best plates, fizzy drinks on an ordinary Tuesday, and looking towards the **bus stop**. Together they suggest someone special is arriving by bus.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS",
    stem: `${VISIT}\n\nGive **two** pieces of evidence that show the visit is unusual or special.`,
    marks: 2,
    points: [
      "One clue: the best plates (usually wrapped in newspaper) are out / floor scrubbed twice",
      "A second, different clue: fizzy drinks bought though it is only Tuesday / she keeps looking towards the bus stop",
    ],
    modelAnswer: "She has taken out the best plates that usually stay wrapped in newspaper, and she has bought fizzy drinks even though it is only Tuesday.",
    hints: ["Which things does she do that she would not do on an ordinary day?"],
    explanation: "Good evidence points to details that are out of the ordinary: the best plates (*usually stayed wrapped*), fizzy drinks *even though it was only Tuesday*, scrubbing *twice*.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: `${SHOP}\n\nWhat is the most reasonable inference about Mr Sibanda's shop?`,
    options: [
      ["It is losing customers to the new supermarket", "Correct: empty shelves, no customers and a full supermarket car park."],
      ["It has been closed down by the council", "The shop is still open with goods on the shelves."],
      ["Mr Sibanda is too lazy to look after it", "Nothing in the extract suggests why, apart from the competition."],
      ["It will soon be the busiest shop again", "Every clue points the other way."],
    ],
    answer: "A",
    explanation: "A strong inference uses all the clues and goes no further: *once the busiest*, almost empty shelves, the silent bell and the full car park *across the road* suggest the supermarket has taken his customers.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: `${SHOP}\n\nTrue or false: the extract states directly that Mr Sibanda has no money.`,
    answer: false,
    explanation: "False. The extract never states this. You might infer that business is poor, but a statement about his money would go beyond the evidence.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: `${SHOP}\n\nWhat does the detail *the fridge stood unplugged in the corner with its door open* most suggest?`,
    options: [
      ["There is nothing cold left to sell, so it is not worth running", "Correct: an empty, switched-off fridge shows the shop has stopped stocking chilled goods."],
      ["Mr Sibanda is cleaning the fridge to sell it the next day", "No clue mentions cleaning or selling the fridge."],
      ["There has been a power cut across the business centre", "The supermarket is busy, and unplugged means switched off at the wall, not a power cut."],
      ["The fridge is new and has not been delivered properly", "The shop is old and declining; nothing suggests a new fridge."],
    ],
    answer: "A",
    hints: ["Why would a shopkeeper unplug a fridge and leave it open?"],
    explanation: "An unplugged fridge with its door open is empty and not in use: another sign of a shop that can no longer afford to stock goods.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: `${BOOTS}\n\nWhat does the extract suggest about Simba's feelings towards his brother?`,
    options: [
      ["He misses him and treasures the boots as a link to him", "Correct: he cares for the boots and holds them as if they might speak."],
      ["He is angry that his brother left him old boots", "He looks after the boots carefully, which suggests affection, not anger."],
      ["He is glad his brother has gone to Johannesburg", "Nothing in his actions shows gladness about the departure."],
      ["He wants to sell the boots to buy a new pair", "He stuffs the toes to make them fit, so he plans to keep using them."],
    ],
    answer: "A",
    hints: ["Look at the last sentence: why would someone hold boots *as if they might say something*?"],
    explanation: "Clues: he wears boots that do not fit, cleans them with his own jersey, and holds them *as if they might say something*. These suggest he misses his brother and values the boots because they were his.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS",
    stem: `${BOOTS}\n\nWhy do you think Simba wears boots that are a size too big? Give a reason and support it from the extract.`,
    marks: 2,
    points: [
      "Reason: they belonged to his brother and remind him of him / he may have no other boots",
      "Support: e.g. he stuffs paper into the toes to make them fit, cleans them carefully, holds them as if they might speak",
    ],
    modelAnswer: "Because they were his brother's and make him feel close to him: he even wipes them with his jersey and holds them as if they might say something.",
    hints: ["What is special about these particular boots?"],
    explanation: "An inference answer has two parts: the conclusion (they were his brother's, and he wants to keep that link) and the evidence that supports it.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: `${LETTER}\n\nWhat does Mrs Chikomo imply in the sentence *I am sure the councillors drive very carefully on their own roads*?`,
    options: [
      ["The councillors' own roads are repaired while Fifth Street is ignored", "Correct: the sarcasm suggests the councillors look after themselves."],
      ["The councillors are careful drivers who obey the rules", "Taken literally this is praise, but the context shows she is being sarcastic."],
      ["The councillors should drive more slowly on Fifth Street", "Her complaint is about repairs, not speed."],
      ["The councillors do not own cars of their own", "She suggests they have their own roads, not that they lack cars."],
    ],
    answer: "A",
    hints: ["Is she really praising the councillors?"],
    explanation: "This is **sarcasm**: the words seem polite, but after a complaint about broken promises they imply that councillors care about their own roads and not about residents'.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: `${LETTER}\n\nTrue or false: the letter suggests that the council did not keep its promise.`,
    answer: true,
    explanation: "True. The repair was promised *within two weeks* a month ago, yet she counted nineteen potholes this morning.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each clue with the feeling it most strongly suggests.",
    pairs: [
      ["She smiled and kept checking her watch.", "impatience"],
      ["He would not look up from his plate.", "shame"],
      ["She hugged the letter to her chest.", "joy"],
      ["He clenched his fists and said nothing.", "anger"],
    ],
    explanation: "Actions are clues: checking a watch → impatience; avoiding eye contact → shame; hugging a letter → joy; clenched fists → anger held back.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the word that best names the feeling suggested.\n\n*\"Fine,\" said Tawanda, staring at his shoes. \"Take my bicycle. Again.\"*",
    template: "Tawanda feels {{blank:a}}.",
    blanks: [{ id: "a", accepted: ["reluctant"], choices: ["reluctant", "delighted", "frightened", "grateful"] }],
    explanation: "He agrees, but he avoids eye contact and adds *Again*: he is **reluctant** (unwilling but agreeing), and tired of being asked.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "An article asking readers to support a bursary fund describes a girl who walks twelve kilometres to school each day. What is the writer's most likely **purpose** in including this detail?",
    options: [
      ["To make readers sympathise and want to donate", "Correct: a vivid individual case appeals to the reader's feelings."],
      ["To give directions to the girl's school", "The distance is not given to help anyone travel."],
      ["To show that walking is good exercise", "That is not the point of a bursary appeal."],
      ["To criticise the girl for living so far away", "The tone of an appeal is sympathetic, not critical."],
    ],
    answer: "A",
    explanation: "Ask *why did the writer include this?* In an appeal, a single person's hardship is used to **arouse sympathy** and persuade readers to act.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 1200,
    stem: HOMECOMING,
    parts: [
      P.manual({
        label: "(a)",
        marks: 2,
        stem: "From paragraph 1, what can you infer about the letter from the hospital? Give one detail that supports your answer.",
        points: [
          "Inference: it brought serious or urgent news (someone close to the mother was ill)",
          "Support: she sold two goats / left within two days / borrowed a suitcase / did not know how long she would be away",
        ],
        modelAnswer: "It brought serious, urgent news, because she sold two goats and left for Bulawayo within two days.",
      }),
      P.mcq({
        label: "(b)",
        stem: "In paragraph 1, why does Rumbi probably not ask how long her mother will be away?",
        options: [
          ["She senses that her mother does not know or cannot bear to say", "Correct: the silence on both sides suggests an answer neither wants to face."],
          ["She is not interested in when her mother returns", "Everything later shows how much she misses her mother."],
          ["She already knows the exact date of her return", "No date is given anywhere in the extract."],
          ["Her mother has told her never to ask questions", "There is no such rule in the extract."],
        ],
        answer: "A",
        explanation: "*She did not say … and Rumbi did not ask*: the matching silences suggest that both feel the uncertainty and avoid it.",
      }),
      P.manual({
        label: "(c)",
        marks: 2,
        stem: "Paragraph 2 says that Rumbi *ran the last kilometre to her own school so that the gate would not be closed in her face*. What does this suggest about her situation? Explain.",
        points: [
          "She is under pressure / has too many duties and too little time",
          "Explanation: caring for her brothers makes her late, yet she still tries hard not to miss school",
        ],
        modelAnswer: "She has too much to do: taking the boys to school first makes her nearly late, but she runs because she does not want to miss her own lessons.",
      }),
      P.manual({
        label: "(d)",
        marks: 2,
        stem: "In paragraph 3, Rumbi *opened her mouth, then closed it again*. What does this suggest about her feelings and about her as a person?",
        points: [
          "Feeling: she is hurt or angry (something hot rose in her throat) at Tino's complaint",
          "Character: she controls her temper / is patient and understanding with her brother",
        ],
        modelAnswer: "She is hurt and angry at Tino's words, but she holds back, which shows she is patient and understands that he misses their mother too.",
      }),
      P.manual({
        label: "(e)",
        marks: 2,
        stem: "In paragraph 4, what does the line *For the days I cannot see* suggest about the mother, and why does Rumbi keep the note in her pocket?",
        points: [
          "Mother: she is caring and planned ahead / expects to be away a long time and worries about the children",
          "Pocket: the note comforts Rumbi / makes her feel close to her mother",
        ],
        modelAnswer: "The mother cares deeply and expects a long absence, so she left money for the days she will miss. Rumbi keeps the note close because it comforts her and links her to her mother.",
      }),
      P.mcq({
        label: "(f)",
        stem: "In paragraph 5, Rumbi stirs *a pot that did not need stirring*. What does this most suggest?",
        options: [
          ["She is hiding emotion and needs a moment alone", "Correct: the pointless task gives her time to compose herself."],
          ["She is worried that the food will burn", "The pot did not need stirring, so this is not her real reason."],
          ["She does not like her grandmother very much", "Nothing suggests dislike; she has carried a heavy load alone."],
          ["She wants to finish cooking before she greets anyone", "The narrator stresses that the stirring was unnecessary."],
        ],
        answer: "A",
        explanation: "An unnecessary action is a clue that a character is covering a feeling, here perhaps relief and the tiredness of the last few days.",
      }),
    ],
    hints: ["For each part, find the clue, say what it shows, and support your answer.", "Your inferences must be supported by the words of the extract."],
    explanation: "Each question asks for an unstated meaning: urgency (the sale of goats), uncertainty (silence), pressure (running to school), self-control (closing her mouth), love (the note) and hidden emotion (the needless stirring).",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "*When the results were pinned up, Nyasha read the list twice, then walked to the toilets with her face turned to the wall.* Which inference is **best supported**?",
    options: [
      ["Nyasha was upset or embarrassed by her results", "Correct: hiding her face is a clue to distress; the inference stays close to the evidence."],
      ["Nyasha had failed every subject and would leave", "This goes far beyond the evidence."],
      ["Nyasha was feeling unwell and needed to rest", "Reading the list twice links her reaction to the results."],
      ["Nyasha was looking for a friend in the toilets", "Nothing suggests she was looking for anyone."],
    ],
    answer: "A",
    hints: ["A good inference is the most likely meaning, not the most dramatic."],
    explanation: "Keep inferences **reasonable**: the clues support distress about the results, but not a dramatic story the text never hints at.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: "Read the extract and answer the question.\n\n> The new teacher wrote her name on the board in large, careful letters, then turned and smiled at the class. Nobody smiled back. In the back row, Kuda leaned his chair against the wall and began to whistle softly.\n\nWhat impression do you get of the class's attitude to the new teacher? Support your answer with **two** details.",
    marks: 3,
    points: [
      "Impression: the class is unwelcoming / unfriendly / testing or challenging her",
      "Detail 1: nobody smiled back",
      "Detail 2: Kuda leans his chair back and whistles (showing disrespect)",
    ],
    modelAnswer: "The class seems unwelcoming and ready to test her: nobody returns her smile, and Kuda leans back on his chair and whistles as if she were not there.",
    hints: ["What do the pupils do, and not do, after she smiles?"],
    explanation: "State the impression first, then support it. The silence and Kuda's whistling are deliberate signs of a cold, challenging attitude.",
  });

  b.card("DEFINITION", "What is an **inference**?", "A reasonable conclusion drawn from clues in a text about something it suggests but does not state.", undefined);
  b.card("CONCEPT", "The four-step inference method", "Clue → meaning of the clue → inference → evidence.", "Find the clue, say what it shows, state the conclusion, support it with brief quotation.");
  b.card("CONCEPT", "Where writers hide clues", "Actions, speech, appearance, setting, word choice and what is left out.", undefined);
  b.card("FACT", "Words that signal an inference question", "suggest, imply, what impression, why do you think, what does this show, how can you tell", undefined);
  b.card("CONCEPT", "Strong versus weak inference", "A strong inference is the most likely meaning the clues support; a weak one is a guess or goes beyond the evidence.", "'She was upset' (supported) vs 'She would leave school' (wild).");
  b.card("VOCABULARY", "Precise feeling words", "anxious, resentful, relieved, ashamed, humiliated, reluctant, bitter, nostalgic", "Better than 'happy', 'sad' or 'bad'.");
  b.card("CONCEPT", "Inferring purpose in non-fiction", "Ask why the writer included a detail: to persuade, inform, warn, criticise, entertain or make readers sympathise.", undefined);
  b.card("CONCEPT", "Cautious language for inferences", "suggests, implies, seems, probably, perhaps", "These show you are interpreting, not stating facts.");
  b.card("CONCEPT", "Sarcasm as a clue", "When polite or positive words follow a complaint, the writer may mean the opposite.", "'I am sure the councillors drive carefully on their own roads.'");
});
