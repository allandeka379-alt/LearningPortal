// Slice EWR2: informal letters and emails.
import { concept } from "../lib.mjs";

const br = (...l) => l.join("\\\n");

concept("eng.functional.informal-letter", { file: "functional/informal-letter", keyPrefix: "functional.informal-letter" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which closing is suitable for an **informal letter to a cousin**?",
    options: [
      ["Love, Tanaka", "Correct: a warm close and your first name suit a relative."],
      ["Yours faithfully, T. Moyo", "Yours faithfully is for formal letters to an unnamed reader."],
      ["Yours sincerely, Mr T. Moyo", "This is a formal close with a title, unsuitable for family."],
      ["Regards, The Secretary", "A role title is for official correspondence."],
    ],
    answer: "A",
    explanation: "Informal closes: *Love*, *Best wishes*, *Take care*, *Your friend*, followed by your first name only.",
  });
  b.mcq({
    d: 2, skill: "EVALUATION", daily: true,
    stem: "Which is the **best opening** for an email replying to a friend who asked about your new school?",
    options: [
      ["Thanks for your message! You asked about my new school, so here's the news.", "Correct: warm, links to the friend's message and leads straight into the purpose."],
      ["How are you? I am fine. How is your family? My family is also fine, thank you.", "Repetitive questions waste words and say nothing about the school."],
      ["I am writing to inform you of the details regarding my new school.", "Too formal for a friend."],
      ["hi!! wat r u doing these days?? my skul is gr8 lol", "Text speak and missing capitals lose language marks."],
    ],
    answer: "A",
    explanation: "A good informal opening is short, friendly and links to the reader and the purpose. Avoid empty greetings, formal phrases and text speak.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A task says: *Write an email to your friend. In your email: say where you went, describe what you did, and explain why you would go again.* How should you organise the body?",
    options: [
      ["One developed paragraph for each of the three bullet points", "Correct: this ensures every point is covered and developed."],
      ["One long paragraph covering everything in any order", "Points may be missed or underdeveloped and the email is hard to follow."],
      ["Three bullet points copied with one word after each", "An email must be continuous prose, not notes."],
      ["Two paragraphs on the first point, as it is most important", "All three bullets carry content marks; none should be skipped."],
    ],
    answer: "A",
    explanation: "Give each bullet its own paragraph and develop it with details, reasons and feelings. Tick off each bullet as you write.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Which sentence best **suggests** something to a friend in an informal email?",
    options: [
      ["Why don't you join the athletics club with me next term?", "Correct: a friendly question is a natural way to suggest."],
      ["It is recommended that you join the athletics club next term.", "This is formal report language."],
      ["You are hereby instructed to join the athletics club next term.", "This is an official, commanding tone."],
      ["Athletics club membership is available to all eligible learners.", "This sounds like a notice, not a friend talking."],
    ],
    answer: "A",
    explanation: "Informal suggestions: *Why don't you…?*, *How about…?*, *If I were you, I'd…*, *You should definitely…*.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Read this sentence from an email to a friend.\n\n*\"The match was absolutely incredible: we were losing 2-0 at half-time, and then Kuda scored twice in five minutes!\"*\n\nWhich feature makes it effective in an informal email?",
    options: [
      ["It shares excitement with a vivid, specific detail and an exclamation.", "Correct: specific detail and enthusiasm make the email lively and personal."],
      ["It uses formal vocabulary that would suit a letter written to an examiner.", "The vocabulary is conversational, and the reader is a friend."],
      ["It avoids giving the reader any personal feelings at all.", "It clearly shows the writer's feelings."],
      ["It lists facts in the impersonal style of a report.", "A report would not use an exclamation or such enthusiasm."],
    ],
    answer: "A",
    hints: ["Look at the punctuation at the end.", "Is the detail general or specific?"],
    explanation: "Good informal writing shares feelings through **specific detail** and natural features such as exclamations, while staying grammatically correct.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Which sentence would earn the **most credit for language** in an informal email, while staying in register?",
    options: [
      ["If you come in August, we'll be able to watch the Harare marathon together.", "Correct: a correct conditional structure, natural contraction and a specific detail."],
      ["If u come in august we can watch the marathon together ok.", "Text speak (u), a missing capital and ok at the end lose marks."],
      ["Should you visit in August, it would be possible to observe the marathon.", "Accurate but far too formal for a friend."],
      ["You come August, we watch marathon, it will be nice for us.", "Missing words and broken grammar."],
    ],
    answer: "A",
    hints: ["Look for accurate grammar AND a friendly tone.", "Which one would sound natural from a friend?"],
    explanation: "Show range within the informal register: conditionals, relative clauses, precise vocabulary, contractions used correctly.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "True or false? Contractions such as *I'm* and *you'll* are acceptable in an informal email.",
    answer: true,
    explanation: "True. Contractions make writing sound natural and friendly; they suit informal letters and emails.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "True or false? If an informal email is lively and accurate, it can still reach the top band even if it leaves out one of the bullet points.",
    answer: false,
    explanation: "False. Content marks depend on covering every bullet point. Missing one limits your content mark however good the language is.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each purpose with a suitable informal phrase.",
    pairs: [
      ["Apologising for a late reply", "Sorry I haven't written for ages."],
      ["Giving advice", "If I were you, I'd talk to the coach first."],
      ["Closing warmly", "Can't wait to see you in December."],
      ["Introducing news", "Guess what happened at school on Friday?"],
    ],
    explanation: "Informal letters use friendly set phrases for each job: apologising, advising, introducing news and closing.",
  });
  b.fib({
    d: 2,
    stem: "Choose the best word for an informal email.",
    template: "It was {{blank:a}} to hear that you passed your driving test. {{blank:b}} done!",
    blanks: [
      { id: "a", accepted: ["great"], choices: ["great", "gratifying in the extreme", "hereby noted", "acknowledged"] },
      { id: "b", accepted: ["Well"], choices: ["Well", "Good", "Nice", "Fine"] },
    ],
    explanation: "*It was great to hear…* is warm and natural. The fixed expression of congratulation is **Well done!**",
  });

  b.ext({
    d: 2, skill: "CREATION", marks: 10, secs: 1000,
    stem: "Your friend Takudzwa is coming to stay with your family in Mutare for a week in the holidays. Write an **email** to him (about 120 words). In your email:\n\n- say how you will meet him when he arrives\n- describe one place you will visit together\n- tell him what he should bring.",
    wordLimit: { min: 100, max: 130 },
    points: [
      ["All three bullets covered, each with a developed detail", 4],
      ["Friendly greeting, opening and close in an informal register", 2],
      ["Conversational features (a question, contractions, feelings) used naturally", 2],
      ["Accurate spelling, grammar and punctuation", 2],
    ],
    modelAnswer: "Hi Taku,\n\nI'm so glad you can come! My dad and I will meet you at the bus terminus on Herbert Chitepo Street when your bus gets in. Just phone me when you pass Penhalonga so we're there in time.\n\nOne day we're going to hike up to Cecil Kop. The view over the city and across to Mozambique is amazing, and if we're lucky we'll see zebra and antelope on the way.\n\nPlease bring a warm jersey, because the evenings get cold up here, and some proper shoes for the hike. Don't worry about towels; Mum has plenty.\n\nSee you soon!\n\nTanaka",
    explanation: "Each bullet has its own short paragraph with a specific detail, and the tone is warm, with contractions and an exclamation.",
  });
  b.ext({
    d: 3, skill: "CREATION", marks: 12, secs: 1300,
    stem: "Your aunt in Bulawayo sent you a gift for your birthday. Write a **letter** to her (about 160 words). In your letter:\n\n- thank her and say what you liked about the gift\n- describe how you celebrated your birthday\n- invite her to visit and suggest something you could do together.",
    wordLimit: { min: 140, max: 170 },
    points: [
      ["All three bullets covered and developed", 4],
      ["Appropriate layout and informal but respectful register for an aunt", 3],
      ["Varied sentences and precise vocabulary", 3],
      ["Accurate spelling, grammar and punctuation", 2],
    ],
    hints: ["An aunt is family but older: warm and respectful.", "Make the thanks specific to the gift."],
    modelAnswer: `${br("15 Msasa Avenue", "Chinhoyi", "10 April 2026")}\n\nDear Tete Ruth,\n\nThank you so much for the beautiful dictionary you sent for my birthday. I've already used it every evening for my English homework, and I love the section on idioms at the back. Mr Banda, our English teacher, even borrowed it to show the class!\n\nMy birthday was quiet but really happy. Mum cooked rice and chicken, my favourite, and my best friends Ropa and Nyasha came round in the afternoon. We played music, ate far too much cake and laughed until it was dark.\n\nWhy don't you come and stay with us in the August holidays? We could visit Chinhoyi Caves together. I've been there twice, but I'd love to show you the Sleeping Pool, which is the deepest, clearest blue you've ever seen.\n\nPlease give my love to Sekuru and the children.\n\nWith love,\\\nTsitsi`,
    explanation: "The model thanks the aunt specifically, gives one paragraph to each bullet and keeps a warm but respectful tone suited to an older relative.",
  });
  b.ext({
    d: 4, skill: "CREATION", marks: 16, secs: 1800,
    stem: "Your friend has written to you saying that she is thinking of leaving school after Form 4 to sell clothes at a market. Write a **letter** in reply (about 230 words). In your letter:\n\n- show that you understand her reasons\n- explain your own view, with reasons\n- suggest one alternative she could consider.",
    wordLimit: { min: 200, max: 250 },
    points: [
      ["Bullet 1: her reasons acknowledged sympathetically", 3],
      ["Bullet 2: a clear view supported by at least two reasons", 4],
      ["Bullet 3: a realistic alternative suggested and explained", 3],
      ["Tone: friendly and tactful, persuasive without lecturing", 3],
      ["Accurate, varied language", 3],
    ],
    levels: [
      [4, 13, 16, "All bullets developed; tactful, persuasive and accurate."],
      [3, 9, 12, "All bullets covered; tone mostly suitable; generally accurate."],
      [2, 5, 8, "A bullet missing or tone unsuitable; frequent errors."],
      [1, 0, 4, "Little relevant content or unsuitable register."],
    ],
    hints: ["Begin by showing you have listened.", "Advice is easier to accept when it is kind."],
    modelAnswer: "**Plan:**\n- Greeting; thank her for trusting you with her plans.\n- Bullet 1: you understand: she enjoys selling, money is tight at home, she has a talent for fashion.\n- Bullet 2: your view: finish A-Level or a college course first; reasons: qualifications open doors if the market slows; skills in accounts and marketing would help the business.\n- Bullet 3: alternative: sell at weekends and in holidays while studying, or take a short course in fashion and design at a polytechnic.\n- Close: whatever she decides, you will support her; ask her to reply.\n\n**Opening paragraph:** Dear Shamiso, Thank you for your long letter and for being so honest about your plans. I could tell from every line how much thought you have put into this, and I know how hard things have been at home since your father lost his job. You have always had an eye for fashion, too: half our class still copies the way you tie your doek!",
    explanation: "Tactful informal persuasion starts with understanding, gives the writer's view with reasons and ends with a practical alternative, keeping the friendship central.",
  });

  b.card("DEFINITION", "Informal letter", "A personal letter or email to a friend or relative written in a friendly, conversational register.");
  b.card("CONCEPT", "Informal letter paragraph plan", "Short opening → one developed paragraph per bullet point → friendly close looking forward to a reply.");
  b.card("CONCEPT", "Informal greetings and closings", "Dear/Hi/Hello + first name; Love, Best wishes, Take care, Your friend + first name.");
  b.card("CONCEPT", "Features of conversational style", "Contractions, direct questions, exclamations, personal feelings, friendly phrases; still correct grammar and spelling.");
  b.card("FACT", "Cambridge 0510 Exercise 5 length", "Between 120 and 160 words (about 140); three bullet prompts to cover.");
  b.card("VOCABULARY", "Informal ways to suggest", "Why don't you…? How about…? If I were you, I'd… You should definitely…");
  b.card("CONCEPT", "Why content marks are lost in informal letters", "A bullet point is missed or only mentioned in passing instead of developed.");
  b.card("FACT", "Informal letters and text speak", "Never use u, gr8, lol and similar forms: they lose language marks.");
});
