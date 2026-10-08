// Slice ERD: reading skills — extended response to reading (writing in role). Cambridge 0500 only, so tagged FLE.
// Practice marks avoid the reserved values (EXTENDED_RESPONSE 15/20/30/40; STRUCTURED 20/40).
import { concept, P, FLE, compositionLevels } from "../lib.mjs";

const FERRY = `Read the story and answer the questions.

**The last crossing**

**[1]** Every evening for twenty years, Mr Gilbert Sibanda had rowed the last passengers across the river to the township on the far bank. The nearest bridge was fourteen kilometres downstream, so his small wooden boat saved workers, schoolchildren and market women a long walk.

**[2]** That Thursday the water was already high and brown when his son, Lindani, came to help him tie up the boat. Upstream, it had rained for three days. "Not tonight, Baba," Lindani said. But on the bank stood a young nurse from the clinic, holding a cooler box. A baby in the township needed the medicine inside it before morning.

**[3]** Mr Sibanda looked at the river for a long time. Then he handed Lindani the second oar. Halfway across, a floating branch struck the boat and spun it round; the nurse held the cooler box against her chest and did not make a sound. Lindani rowed until his arms burned. When they reached the far side, the nurse ran up the bank without looking back.

**[4]** The next morning the council put up a sign forbidding all crossings until the water fell. Mr Sibanda read it twice, nodded, and went home to mend his nets. He did not mention the night before, and neither did Lindani. But at the clinic, someone had written the ferryman's name on the noticeboard, with the words *Thank you* underneath.`;

const LIBRARY = `Read the article.

**[1]** Twice a month a blue lorry rumbles along the dirt roads of Mudzi district. Its sides fold open to reveal shelves of books, and within minutes a queue of children forms. The mobile library was started by a group of retired teachers who noticed that rural schools had textbooks but almost no storybooks.

**[2]** The driver, Mr Peter Chinyama, is also the librarian. He knows which pupils like adventure stories and which prefer poetry, and he keeps a waiting list for the most popular titles. "The hardest part," he says, "is driving away when a child is still choosing."

**[3]** The lorry is now old, and its gearbox has broken down twice this year. Each repair costs money the group does not have. The teachers hope that schools in towns will collect old storybooks and raise funds for a new vehicle.`;

const DRYER = `Read the article.

> Tsitsi Marime, a Form 3 pupil from Chegutu, entered a national young inventors' competition with a solar fruit dryer made from an old cupboard, a sheet of glass and black paint. Every summer her grandmother's mangoes rotted because the family could not eat or sell them fast enough. Tsitsi's first two designs failed: one let in flies, and the other became so hot that the fruit burned. The third, with a mesh screen and vents that open and close, worked. She came second out of eighty entries and won a laptop. Now neighbours bring their mangoes to dry, and her grandmother sells dried mango at the market. Tsitsi wants to study engineering, but she worries about the cost of university.`;

concept("eng.reading.extended-response", { file: "reading/extended-response", keyPrefix: "reading.extended-response", applies: FLE }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In an extended response to reading, what does **writing in role** mean?",
    options: [
      ["Writing as a person from the text, in their voice", "Correct: you become the character or participant."],
      ["Writing a summary of the passage in your own words", "A summary does not take on a character's voice."],
      ["Writing a story with completely new characters", "The task is based on the text's people and events."],
      ["Writing your own opinion of the writer's style", "That is a critical response, not writing in role."],
    ],
    answer: "A",
    explanation: "You write as someone in or connected with the text, using their knowledge, feelings and voice, and basing your ideas on the passage.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In this task, what does it mean to **develop** an idea from the text?",
    options: [
      ["To expand and explain it in a way the text supports", "Correct: e.g. explain why something mattered to the character."],
      ["To copy it out word for word from the passage", "Copying is lifting, not developing."],
      ["To replace it with an invented, unrelated event", "Development must grow from the text, not replace it."],
      ["To leave it out because it is already in the text", "Using text details is essential."],
    ],
    answer: "A",
    explanation: "**Use** a detail, **develop** it (explain, expand, add consequence) and **interpret** it (what it shows about feelings or motives), always consistently with the text.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: `${FERRY}\n\nYou are writing Lindani's journal. Which sentence stays **in role**?`,
    options: [
      ["My arms are still aching from last night's rowing.", "Correct: first person, from Lindani's point of view."],
      ["Lindani's arms were aching after the crossing.", "This is third person: it breaks the role."],
      ["The writer shows that Lindani was very strong.", "This is literary comment, not Lindani's voice."],
      ["In paragraph 3 the boat is struck by a branch.", "This refers to the text as a text, not as lived experience."],
    ],
    answer: "A",
    explanation: "In role you write as *I*. Referring to *the writer* or *paragraph 3*, or describing yourself as *Lindani*, breaks the role.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: `${FERRY}\n\nWhich sentence in Lindani's journal **develops** a detail from the story most effectively?`,
    options: [
      ["When the branch spun us round, I saw Baba's face and knew he was afraid too.", "Correct: it uses the branch detail and interprets the father's feelings plausibly."],
      ["A branch hit the boat halfway across and spun it round in the water.", "This only repeats the text without development."],
      ["Then a crocodile leapt out and bit through the side of the boat.", "This invents a major event that is not in the text."],
      ["The river was brown and high, and the nurse had a cooler box.", "This lists details without explaining or interpreting them."],
    ],
    answer: "A",
    hints: ["Which sentence adds a plausible feeling to a real detail?"],
    explanation: "Good development **uses** a detail and adds interpretation (the father's fear) that fits the text. Retelling scores low; inventing new events loses reading marks.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each form with one of its key features.",
    pairs: [
      ["journal", "private reflection in the first person"],
      ["speech", "addresses the audience directly"],
      ["report", "factual tone and recommendations"],
      ["interview", "questions followed by answers"],
      ["article", "headline and engaging opening"],
    ],
    explanation: "Match your writing to the form: journals reflect privately; speeches address listeners; reports are factual and recommend; interviews use a question-and-answer layout; articles have a headline and hook.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "True or false: it is fine to spend almost the whole answer on the first bullet point if you write it well.",
    answer: false,
    explanation: "False. Each bullet carries reading marks. Aim for balance across all the bullet points.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "True or false: in an extended response you may add small details (such as what a character noticed) as long as they fit the text.",
    answer: true,
    explanation: "True. Plausible development is rewarded. What you must avoid is contradicting the text or inventing major new events.",
  });
  b.fib({
    d: 2, skill: "APPLICATION",
    stem: "Choose the opening that fits each form and audience.",
    template: "A speech to parents: {{blank:a}} A journal entry: {{blank:b}}",
    blanks: [
      { id: "a", accepted: ["Good evening, parents and guardians."], choices: ["Good evening, parents and guardians.", "Dear Diary, what a day!", "Yo, everybody, listen up!", "Report on the bicycle scheme"] },
      { id: "b", accepted: ["Thursday night. I can't sleep."], choices: ["Thursday night. I can't sleep.", "Ladies and gentlemen, thank you.", "To whom it may concern,", "Headline: River chaos"] },
    ],
    explanation: "A speech greets its audience politely; a journal is dated and personal. *Yo, everybody* is too informal for parents; *To whom it may concern* belongs to a formal letter.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: `${LIBRARY}\n\nYou are Mr Chinyama, writing a speech to town pupils. Which sentence best **interprets** his comment that the hardest part is *driving away when a child is still choosing*?`,
    options: [
      ["I hate leaving because I know it will be two weeks before that child can choose again.", "Correct: it explains the feeling, using the twice-a-month detail."],
      ["The hardest part is driving away when a child is still choosing a book.", "This repeats his words without interpretation."],
      ["Children in Mudzi do not like reading very much at all.", "This contradicts the queues and waiting lists."],
      ["Driving the lorry is difficult because the roads are tarred.", "The roads are dirt, and this misses the point of the comment."],
    ],
    answer: "A",
    hints: ["Why would it hurt to leave? Link it to how often the lorry comes."],
    explanation: "Interpretation explains what lies behind a detail: the lorry comes only twice a month, so leaving a child mid-choice means a long wait.",
  });
  b.manualShort({
    d: 3, skill: "CREATION",
    stem: `${FERRY}\n\nWrite **two or three sentences** as the nurse, describing the crossing. Use one detail from the text and develop it with your thoughts and feelings.`,
    marks: 3,
    points: [
      "Written in the first person as the nurse",
      "Uses a detail from the text (e.g. the branch, holding the cooler box, not making a sound)",
      "Develops it with plausible thoughts or feelings (e.g. fear for the medicine, trust in the ferryman)",
    ],
    modelAnswer: "When the branch hit us and the boat spun, I pressed the cooler box so hard against my chest that it hurt. I didn't scream; I think I was afraid that if I made a sound, the ferryman would turn back.",
    hints: ["Why might she have stayed silent?"],
    explanation: "Choose a real detail (holding the box, staying silent) and interpret it: her silence can be read as fear, determination or trust.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Which plan for a journal entry would earn the **lowest** reading marks?",
    options: [
      ["A retelling of every event in the order it happened", "Correct: retelling without development or interpretation scores low."],
      ["Events of the day, with the character's feelings about each", "This develops the events with interpretation."],
      ["Three bullets covered equally, each with reflection", "Balanced coverage with reflection is strong."],
      ["Key details, the reasons behind them and future hopes", "This uses, develops and interprets ideas."],
    ],
    answer: "A",
    hints: ["What do examiners reward beyond knowing the events?"],
    explanation: "Reading marks reward **development and interpretation**, not simply showing that you know what happened.",
  });
  b.struct({
    d: 4, skill: "CREATION", examStyle: true, secs: 1800,
    stem: FERRY,
    parts: [
      P.short({
        label: "(a)",
        stem: "From paragraph 1, how far away was the nearest bridge?",
        accepted: ["fourteen kilometres", "14 kilometres", "14 km", "fourteen km", "14km", "14", "fourteen", "fourteen kilometres downstream", "14 kilometres downstream"],
        model: "fourteen kilometres",
        wrong: ["twenty years"],
        explanation: "*The nearest bridge was fourteen kilometres downstream.*",
      }),
      P.manual({
        label: "(b)",
        marks: 2,
        stem: "From paragraphs 2 and 3, explain why Mr Sibanda decided to cross even though the river was dangerous.",
        points: [
          "A baby in the township needed the medicine before morning (a life might depend on it)",
          "He chose duty / others' need over his own safety (he looked at the river a long time, then handed over the oar)",
        ],
        modelAnswer: "A baby needed the medicine before morning, so after weighing the danger he put the child's life ahead of his own safety.",
      }),
      P.manual({
        label: "(c)",
        marks: 2,
        stem: "In paragraph 4, Mr Sibanda *read it twice, nodded, and went home to mend his nets*. What does this suggest about him?",
        points: [
          "He accepts the ban / knows the crossing was dangerous",
          "He is modest / quiet: he does not boast or talk about what he did",
        ],
        modelAnswer: "He accepts the council's decision calmly and does not boast about the risky crossing: he is a quiet, modest man.",
      }),
      P.manual({
        label: "(d)",
        type: "EXTENDED_RESPONSE",
        marks: 10,
        wordLimit: { min: 200, max: 300 },
        stem: "Imagine you are Lindani. That evening you write in your journal. Write about:\n\n- why you did not want to cross and what made your father decide\n- what happened during the crossing and how you felt\n- your thoughts about your father, the council's sign and the message on the clinic noticeboard.\n\nBase your journal on what you have read, but be careful not to copy from the passage. Write 200 to 300 words.",
        points: [
          ["Uses details from paragraphs 1-2 (high brown water, three days of rain, the nurse with medicine for a baby) to explain the decision", 2],
          ["Uses and develops the crossing (branch, boat spun round, burning arms, silent nurse) with Lindani's feelings", 2],
          ["Interprets: thoughts about his father's character and plausible reactions to the sign and the noticeboard", 2],
          ["Convincing voice of Lindani and journal form (first person, reflective)", 2],
          ["Well-organised, accurate English in own words", 2],
        ],
        levels: compositionLevels(10),
        modelAnswer: "Plan: (1) the high water after three days of rain; my fear; the nurse and the baby's medicine; Baba's long look at the river. (2) The branch, the spinning boat, my burning arms, the nurse's silence. (3) Baba's quiet courage; the sign — relief and pride mixed; the noticeboard — proof that it mattered.\n\nOpening: *Friday night. The council put up its sign this morning: no crossings until the water falls. If they had put it up a day earlier, Baba would never have rowed last night — or would he? I told him \"Not tonight\" when I saw the river, brown and fat after three days of rain upstream. Then I saw the nurse with her cooler box, and I knew from Baba's face that my words had already floated away.*",
      }),
    ],
    hints: ["For (d), cover all three bullets in balance.", "Develop details: what did Lindani notice, fear and understand?"],
    explanation: "Parts (a)-(c) check understanding of the story; part (d) rewards using, developing and interpreting its details in Lindani's voice.",
  });
  b.ext({
    d: 4, skill: "CREATION", examStyle: true, secs: 1800,
    stem: `${FERRY}\n\nImagine you are the nurse. A week later you write a letter to Mr Sibanda. In your letter you should:\n\n- describe what you remember about the crossing\n- explain why the journey was so important\n- tell him what has happened since and how you feel about what he did.\n\nBase your letter on what you have read, but be careful not to copy from the passage. Write 250 to 350 words.`,
    marks: 16,
    wordLimit: { min: 250, max: 350 },
    points: [
      ["Uses details of the crossing (high water, branch, spinning boat, holding the box, Lindani rowing) from the nurse's point of view", 3],
      ["Explains the importance: medicine needed by a baby before morning, no other way across (bridge far away)", 3],
      ["Develops plausibly what happened since (e.g. the baby's recovery, the noticeboard message) and her feelings, without contradicting the text", 2],
      ["Convincing voice and letter form (greeting, paragraphs, suitable sign-off, warm but respectful register)", 4],
      ["Well-organised, accurate and varied English in own words", 4],
    ],
    levels: compositionLevels(16),
    modelAnswer: "Dear Mr Sibanda,\n\nI am the nurse you rowed across the river last Thursday night. I have started this letter four times, because I do not know how to thank someone for something so brave, so I will simply tell you what I remember.\n\nI remember the colour of the water, brown and swollen, and how you stood looking at it while I waited. I was sure you would refuse, and I would not have blamed you. When you handed your son the oar, I nearly cried with relief. Then, halfway across, the branch struck us and the boat turned right round. I held the cooler box so tightly that my arms were bruised the next day. I did not scream; I think I was too frightened even to breathe. I only watched your son rowing and rowing, and I prayed.\n\nYou may not know why I could not wait for morning. Inside that box was medicine for a baby girl in the township who had been ill for two days. The bridge is so far downstream that by road I would not have reached her until the next afternoon, and the doctor told me she might not live that long. I ran up the bank without saying goodbye — please forgive me for that.\n\nI am happy to tell you that the baby is now feeding well and her fever has gone. Her mother wanted to know the name of the man who brought the medicine, and that is why your name is on our noticeboard. I hear the council has stopped all crossings until the water falls. I am glad, because no one should have to take such a risk again, but I will always be grateful that you took it once.\n\nWith deepest thanks to you and to Lindani,\n\nNurse Chipo Mhlanga",
    hints: ["Cover all three bullets; use details from every paragraph.", "Develop: what did the nurse feel, and what might have happened since?"],
    explanation: "A strong answer uses the story's details from the nurse's viewpoint, explains the urgency, develops the aftermath plausibly (the noticeboard message) and keeps a grateful, respectful letter voice throughout.",
  });
  b.ext({
    d: 4, skill: "CREATION", secs: 1500,
    stem: `${LIBRARY}\n\nImagine you are Mr Chinyama. You are invited to speak at a school assembly in Harare. Write your speech. In it you should:\n\n- explain what the mobile library does and why it was started\n- describe your work and what it means to you\n- explain the library's problems and what the pupils can do to help.\n\nBase your speech on what you have read, but be careful not to copy from the passage. Write 220 to 320 words.`,
    marks: 12,
    wordLimit: { min: 220, max: 320 },
    points: [
      ["Uses details: twice-monthly route in Mudzi, shelves in a lorry, started by retired teachers because rural schools lacked storybooks", 2],
      ["Develops his work: driver and librarian, knows pupils' tastes, waiting lists, the pain of leaving a child still choosing", 2],
      ["Explains the problems (old lorry, gearbox broken twice, no money) and makes clear, plausible requests (collect storybooks, raise funds)", 2],
      ["Speech voice and form: addresses the audience, persuasive devices, memorable ending", 3],
      ["Well-organised, accurate English in own words", 3],
    ],
    levels: compositionLevels(12),
    modelAnswer: "Plan: greeting and a picture of the queue of children; why the retired teachers began (textbooks but no storybooks); my double job, the waiting list, a child still choosing; the tired lorry and the gearbox; two requests — a storybook drive and a fundraising day; a closing image.\n\nOpening: *Good morning, everyone. Close your eyes for a moment and imagine a school with plenty of maths textbooks but not a single story — no adventures, no poems, nothing to read just for joy. That was what a few retired teachers found in Mudzi, and that is why, twice a month, I drive a blue lorry full of books along roads so dusty that the children hear me long before they see me.*",
    hints: ["Speak to your audience: use *you* and questions.", "End with a clear request."],
    explanation: "The speech must use the article's facts, develop the driver's feelings, and turn the problems into a persuasive appeal suited to listening pupils.",
  });
  b.ext({
    d: 3, skill: "CREATION", secs: 1200,
    stem: `${DRYER}\n\nYou are a reporter for your school magazine. Write an interview with Tsitsi. Include questions and her answers about:\n\n- the problem she wanted to solve and how her dryer works\n- the difficulties she met and how she overcame them\n- her feelings about the result and her hopes for the future.\n\nWrite 200 to 250 words.`,
    marks: 10,
    wordLimit: { min: 200, max: 250 },
    points: [
      ["Uses details of the problem (rotting mangoes) and the design (cupboard, glass, black paint)", 2],
      ["Develops the failures (flies, burned fruit) and the solution (mesh screen, adjustable vents)", 2],
      ["Interprets her feelings and hopes, including the worry about university costs", 2],
      ["Interview form: clear questions and answers in Tsitsi's voice", 2],
      ["Accurate English in own words", 2],
    ],
    levels: compositionLevels(10),
    modelAnswer: "Plan: Q1 why a fruit dryer (grandmother's mangoes rotting); Q2 how it works (cupboard, glass, black paint absorbs heat); Q3 what went wrong (flies; burned fruit) and how she fixed it (mesh, vents); Q4 how it felt to come second of eighty; Q5 the neighbours and grandmother's market sales; Q6 engineering dreams and the cost of university.\n\nOpening: *Reporter: Tsitsi, congratulations on second place. Why did you choose to build a fruit dryer?*\n*Tsitsi: Because every summer I watched my grandmother's mangoes go soft and brown under the tree. We couldn't eat them fast enough, and it broke her heart to throw them away.*",
    hints: ["Make the questions lead naturally to each part of the article."],
    explanation: "Interview answers should sound like a real teenager while using and developing the article's facts, especially her setbacks and worries.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which register suits a report to a school development committee?",
    options: [
      ["formal and factual, with clear headings", "Correct: a report is objective and organised."],
      ["chatty and full of slang and jokes", "This is far too informal for a committee."],
      ["private and emotional, like a diary", "A report is not a personal reflection."],
      ["poetic, with rhyme and rhythm", "Poetic style does not suit a report."],
    ],
    answer: "A",
    explanation: "**Register** must suit audience and form: reports are formal, factual and clearly organised, often ending with recommendations.",
  });

  b.card("DEFINITION", "Writing in role", "Writing as a particular person from the text, with their knowledge, feelings and voice.", undefined);
  b.card("CONCEPT", "Use, develop, interpret", "Use details from the text; develop them (explain, expand); interpret them (feelings, motives, consequences).", undefined);
  b.card("CONCEPT", "Cover every bullet", "Each bullet carries reading marks: give each roughly equal space.", undefined);
  b.card("CONCEPT", "Don't retell; don't invent", "Retelling scores low; major invented events lose marks. Develop plausibly from the text.", undefined);
  b.card("DEFINITION", "Register", "The level of formality and style suited to audience and form.", "speech to parents = formal; journal = personal");
  b.card("FACT", "Journal features", "Date, first person, private thoughts, reflection on events and feelings.", undefined);
  b.card("FACT", "Speech features", "Greets and addresses the audience, rhetorical questions, clear structure, memorable ending.", undefined);
  b.card("FACT", "Interview and report features", "Interview: clear questions and answers. Report: heading, factual tone, sub-headings, recommendations.", undefined);
  b.card("CONCEPT", "Stay in role", "Write 'I', not the character's name; never refer to 'the writer' or 'paragraph 3'.", undefined);
});
