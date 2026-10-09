// Slice ERD: reading skills — tone, mood and the writer's attitude.
import { concept, P } from "../lib.mjs";

const ext = (text) => `Read the extract and answer the question.\n\n> ${text}`;

const MALL = `Read the opinion piece from a school magazine and answer the questions.

**Progress, they call it**

**[1]** Last Saturday I walked past the place where Mbuya Moyo's vegetable stall used to stand. For as long as I can remember, she sat there under a faded umbrella, calling every child "my grandchild" and slipping us a guava when our mothers were not looking. Now there is a fence, a billboard and a picture of a shining glass building. *Coming soon: a world-class shopping experience.*

**[2]** I am told I should be grateful. The new mall, we are promised, will bring jobs, air-conditioning and a cinema. How wonderful. Perhaps the cinema will show a film about the twenty vendors who were moved to a muddy lot behind the bus rank, where no customer ever goes.

**[3]** I do not deny that our town needs work for young people. My own brother has been searching for a job for two years. If the mall employs local people at fair wages, I will be the first to cheer. But a town is more than a place to buy things. It is the people who know your name.

**[4]** So, by all means, build your glass palace. Just remember who was standing on that ground before you came.`;

concept("eng.reading.tone-attitude", { file: "reading/tone-attitude", keyPrefix: "reading.tone-attitude" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the **tone** of a piece of writing?",
    options: [
      ["The writer's voice: the feeling with which it is written", "Correct: tone is the manner or attitude in the writer's voice."],
      ["The main sequence of events that happens in a story or play", "That is the plot."],
      ["The time and the place in which a story is set", "That is the setting."],
      ["The number of paragraphs the text contains", "Length has nothing to do with tone."],
    ],
    answer: "A",
    explanation: "**Tone** = the writer's voice (angry, playful, sarcastic). **Mood** = the atmosphere the reader feels. **Attitude** = the writer's opinion of the subject.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which word describes a tone that looks back on the past **fondly and with longing**?",
    options: [
      ["nostalgic", "Correct: nostalgia is a fond longing for the past."],
      ["sarcastic", "Sarcasm mocks; it is not fond longing."],
      ["indignant", "Indignant means angry at unfairness."],
      ["objective", "Objective means neutral and factual."],
    ],
    answer: "A",
    explanation: "**Nostalgic** = remembering the past with affection and some sadness that it has gone.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: ext("*Nineteen potholes. Nineteen! And the council calls this a road?*") + "\n\nWhich word best describes the tone?",
    options: [
      ["indignant", "Correct: the repetition, exclamation and question show anger at unfairness."],
      ["nostalgic", "There is no fond looking back at the past."],
      ["affectionate", "Nothing is warm or loving here."],
      ["detached", "The writer is clearly emotionally involved."],
    ],
    answer: "A",
    explanation: "Punctuation and sentence type create tone: the repeated number, the exclamation mark and the rhetorical question sound **indignant** (angry at something unjust) and sarcastic.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each sentence with its tone.",
    pairs: [
      ["Oh, brilliant — the only bus breaks down on exam day.", "sarcastic"],
      ["Those long holidays at Gogo's were the best days of my life.", "nostalgic"],
      ["The meeting will begin at 10 a.m. in the main hall.", "matter-of-fact"],
      ["Our netball team has made history — what a season!", "celebratory"],
    ],
    explanation: "*Brilliant* used about a disaster is sarcastic; fond memories are nostalgic; a plain notice is matter-of-fact; excited praise with an exclamation is celebratory.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "True or false: **tone** and **mood** always mean the same thing.",
    answer: false,
    explanation: "False. Tone is the writer's voice; mood is the atmosphere the reader feels. A calm, matter-of-fact tone can create a terrifying mood in a ghost story.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the tone word that fits each extract.",
    template: "*The council has finally unveiled its long-awaited market, a bright new home for traders.* The tone is {{blank:a}}. *The council has finally dumped its overdue market on traders: a concrete box with no shade.* The tone is {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["approving"], choices: ["approving", "scornful", "fearful", "nostalgic"] },
      { id: "b", accepted: ["scornful"], choices: ["scornful", "approving", "grateful", "playful"] },
    ],
    explanation: "Word choice shows attitude: *unveiled*, *long-awaited* and *bright* are positive (approving); *dumped*, *overdue* and *concrete box* are negative (scornful).",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: ext("*When I was a boy, the river behind our homestead ran so clear that you could count the pebbles. Now my grandchildren stand on its bank and see only brown water and plastic bottles.*") + "\n\nWhat is the writer's attitude to the changes to the river?",
    options: [
      ["regretful and saddened", "Correct: fond memories contrast with the polluted present."],
      ["amused and light-hearted", "Nothing in the extract is treated as funny."],
      ["excited and hopeful", "The present is described negatively, with no sign of hope."],
      ["neutral and uninterested", "The contrast shows strong feeling, not indifference."],
    ],
    answer: "A",
    hints: ["Compare the way the past and the present are described."],
    explanation: "The clear water *you could count the pebbles* (fond memory) contrasts with *only brown water and plastic bottles*: the writer **regrets** what has been lost.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: ext("*What a wonderful idea to close the only clinic in the ward. Now the sick can enjoy a healthy forty-kilometre walk to the next one.*") + "\n\nWhat is the writer's real attitude to the clinic closure?",
    options: [
      ["strongly critical, using sarcasm", "Correct: wonderful and enjoy a healthy walk mean the opposite."],
      ["genuinely pleased with the decision", "The praise is ironic: no one would welcome a long walk when sick."],
      ["unsure whether it is a good idea", "The tone is mocking and certain, not doubtful."],
      ["grateful that people will get exercise", "This takes the sarcasm literally."],
    ],
    answer: "A",
    hints: ["Would a sick person really enjoy a long walk?"],
    explanation: "**Sarcasm**: positive words (*wonderful*, *enjoy*, *healthy*) describe something harmful, which shows strong criticism.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS",
    stem: ext("*The first week at boarding school was an adventure: midnight feasts, new friends, the thrill of the dining hall bell. By the third week the adventure had worn thin. I counted the days on the back of my exercise book.*") + "\n\nHow does the tone change? Support each tone with evidence.",
    marks: 3,
    points: [
      "First tone identified: excited / enthusiastic / thrilled",
      "Second tone identified: weary / homesick / disappointed",
      "Evidence for the change, e.g. thrill / adventure contrasted with worn thin / counted the days",
    ],
    modelAnswer: "It moves from excited (\"an adventure\", \"the thrill of the dining hall bell\") to weary and homesick (\"worn thin\", counting the days).",
    hints: ["Find the word that marks the turning point in the middle."],
    explanation: "A tone-shift answer names **two** tones and gives evidence for each. *By the third week* marks the turn.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which tone word is the most **precise**?",
    options: [
      ["resentful", "Correct: it names a specific feeling of bitterness at unfair treatment."],
      ["negative", "Too general: many tones are negative."],
      ["bad", "Too vague to describe tone."],
      ["emotional", "Too broad: almost every tone is emotional."],
    ],
    answer: "A",
    explanation: "Examiners reward **precise** tone words: *resentful*, *nostalgic*, *indignant*, *scornful*, rather than *negative*, *bad* or *sad*.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 900,
    stem: MALL,
    parts: [
      P.mcq({
        label: "(a)",
        stem: "Which word best describes the writer's attitude to Mbuya Moyo in paragraph 1?",
        options: [
          ["affectionate", "Correct: the fond memories of guavas and being called grandchild."],
          ["resentful", "The writer resents the mall, not Mbuya Moyo."],
          ["indifferent", "The detailed, warm memory shows strong feeling."],
          ["critical", "Nothing she did is criticised."],
        ],
        answer: "A",
        explanation: "Details such as *calling every child \"my grandchild\"* and *slipping us a guava* show warmth and affection.",
      }),
      P.manual({
        label: "(b)",
        marks: 2,
        stem: "In paragraph 2, the writer says *How wonderful.* What tone is this, and how can you tell?",
        points: [
          "Tone: sarcastic / ironic",
          "Evidence: the next sentence mocks the cinema and points to the vendors moved to a muddy lot, so the praise is not meant",
        ],
        modelAnswer: "It is sarcastic: straight after it, the writer suggests a film about the vendors pushed onto a muddy lot, showing the praise is not sincere.",
      }),
      P.manual({
        label: "(c)",
        marks: 2,
        stem: "Paragraph 3 is calmer than paragraph 2. Explain how the writer's attitude to the mall is shown to be balanced here.",
        points: [
          "Admits the town needs jobs for young people (brother has searched for two years)",
          "Would welcome the mall if it employs local people at fair wages, but insists a town is about people, not shopping",
        ],
        modelAnswer: "The writer admits that jobs are badly needed and would cheer if locals got fair wages, but still argues that a town is about its people.",
      }),
      P.mcq({
        label: "(d)",
        stem: "In paragraph 4, the writer calls the mall a *glass palace*. What does this suggest about the writer's attitude?",
        options: [
          ["The mall seems grand but out of touch with ordinary people", "Correct: palace suggests luxury for the few."],
          ["The writer admires the beauty of the planned building", "The phrase is mocking in context, not admiring."],
          ["The mall will be built by the royal family", "Palace is used figuratively."],
          ["The writer fears the glass will break easily", "Fragility is not the point of the phrase."],
        ],
        answer: "A",
        explanation: "*Glass palace* mocks the grandness of the mall and suggests it belongs to a different, richer world from the vendors'.",
      }),
      P.manual({
        label: "(e)",
        marks: 3,
        stem: "Sum up the writer's overall attitude to the new mall. Support your answer with **two** brief quotations.",
        points: [
          "Overall attitude: critical / resentful but not totally opposed (accepts the need for jobs)",
          "Quotation supporting the critical view, e.g. \"How wonderful\", \"glass palace\", \"muddy lot\"",
          "Quotation supporting the balanced or conditional view, e.g. \"I will be the first to cheer\", \"Just remember who was standing on that ground\"",
        ],
        modelAnswer: "The writer is critical and resentful (\"How wonderful\", \"glass palace\") but not completely opposed, since \"I will be the first to cheer\" if locals get fair jobs.",
      }),
    ],
    hints: ["Look for sarcasm: praise that is not meant.", "Notice where the writer becomes calmer and more balanced."],
    explanation: "The writer's attitude is mainly critical and sarcastic towards the mall, affectionate towards Mbuya Moyo and the displaced vendors, and conditionally open to the jobs it might bring.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", examStyle: true,
    stem: `${MALL}\n\nWhat is the effect of the italic sentence *Coming soon: a world-class shopping experience* at the end of paragraph 1?`,
    options: [
      ["Its glossy advertising language contrasts with the lost stall", "Correct: the billboard slogan sounds empty beside the warm memory."],
      ["It shows that the writer is excited about shopping at the new mall", "The surrounding text shows regret, not excitement."],
      ["It gives the opening date of the new shopping mall", "No date is given."],
      ["It tells readers where to find Mbuya Moyo now", "It is a billboard advertisement, not directions."],
    ],
    answer: "A",
    hints: ["Who wrote the words on the billboard, and how do they sound next to the memory of Mbuya Moyo?"],
    explanation: "Quoting the billboard's slick slogan right after the memory of Mbuya Moyo creates an ironic contrast and shows the writer's scorn for the developers' language.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: ext("*The house was silent. Somewhere a tap dripped. The candle threw long, shaking shadows across the walls, and Farai realised the back door, which he had locked, was standing open.*") + "\n\nWhich word best describes the **mood** created?",
    options: [
      ["tense", "Correct: silence, shaking shadows and the open door create suspense."],
      ["joyful", "Nothing in the scene is cheerful."],
      ["peaceful", "The open door he had locked makes it unsettling, not peaceful."],
      ["comic", "Nothing is treated as funny."],
    ],
    answer: "A",
    hints: ["How do you feel as the reader when the locked door is found open?"],
    explanation: "**Mood** is what the reader feels. Silence, a dripping tap, *shaking shadows* and the unexplained open door build a **tense**, uneasy mood.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS",
    stem: ext("*Our new head boy, Tatenda, arrived on his first day with polished shoes, a speech already learned by heart and a list of rules for the prefects — rules that he himself, we noticed, did not seem to need to follow.*") + "\n\nWhat is the writer's attitude to Tatenda? Give one piece of evidence.",
    marks: 2,
    points: [
      "Attitude: mocking / critical / mildly sarcastic (sees him as self-important or hypocritical)",
      "Evidence: the rules he did not seem to need to follow / the speech learned by heart and polished shoes suggesting he is showing off",
    ],
    modelAnswer: "Gently mocking and critical: the writer notes that Tatenda made rules for others which \"he himself … did not seem to need to follow\".",
    hints: ["Look at the comment after the dash."],
    explanation: "The aside after the dash (*rules that he himself … did not seem to need to follow*) reveals the writer's amused criticism of Tatenda as self-important and hypocritical.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Write the tone word, beginning with **n**, that means *looking back on the past with fondness and longing*.",
    accepted: ["nostalgic", "nostalgia"],
    model: "nostalgic",
    wrong: ["nervous"],
    explanation: "**Nostalgic** (adjective) / **nostalgia** (noun).",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "True or false: in a story, the narrator's tone can be amused even when a character in the scene is angry.",
    answer: true,
    explanation: "True. The character's feelings and the narrator's (writer's) tone are different things. Always check whose attitude the question asks about.",
  });

  b.card("DEFINITION", "Tone","The writer's or speaker's voice: the feeling or manner in which something is said.", "angry, playful, sarcastic, respectful");
  b.card("DEFINITION", "Mood", "The atmosphere a text creates and the feeling it produces in the reader.", "tense, peaceful, gloomy, joyful");
  b.card("DEFINITION", "Attitude", "The writer's opinion of, or feelings towards, the subject.", "approving, critical, doubtful, nostalgic");
  b.card("DEFINITION", "Sarcasm and irony", "Irony says the opposite of what is meant; sarcasm uses irony sharply to mock or criticise.", "'What a wonderful idea to close the only clinic.'");
  b.card("VOCABULARY", "Positive tone words", "admiring, affectionate, enthusiastic, hopeful, nostalgic, respectful, humorous, celebratory", undefined);
  b.card("VOCABULARY", "Negative tone words", "bitter, critical, sarcastic, scornful, resentful, indignant, alarmed, despairing", undefined);
  b.card("VOCABULARY", "Neutral or mixed tone words", "objective, factual, detached, reflective, cautious, ambivalent, matter-of-fact", undefined);
  b.card("CONCEPT", "Three clues to tone", "Word choice (connotations), punctuation and sentence type, and what the writer chooses to include.", undefined);
  b.card("CONCEPT", "Attitude answer pattern", "Name the attitude precisely → quote briefly → explain how the quotation shows it.", undefined);
});
