// Slice EWR2: articles.
import { concept } from "../lib.mjs";

concept("eng.functional.article", { file: "functional/article", keyPrefix: "functional.article" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **headline**?",
    options: [
      ["The short, eye-catching title of an article", "Correct: the headline attracts readers and signals the topic."],
      ["The writer's name printed under the title", "That is the by-line."],
      ["The final paragraph that sums up the article", "That is the conclusion."],
      ["The greeting at the start of a formal letter", "That is the salutation."],
    ],
    answer: "A",
    explanation: "Article format: **headline** (title) → optional **strapline** (summary line) → **by-line** (writer's name) → introduction → body → conclusion.",
  });
  b.mcq({
    d: 2, skill: "EVALUATION", daily: true,
    stem: "Which is the **most effective headline** for a school magazine article about a successful clean-up of the local river?",
    options: [
      ["Clean Water, Clear Future: Form 4s Rescue the Mukuvisi", "Correct: alliteration and a specific, positive message grab attention."],
      ["An article about the clean-up of the river by our class", "This describes the task rather than attracting readers."],
      ["Dear readers, please read what we did at the river", "This is not a headline; it addresses readers like a letter."],
      ["River. Rubbish. Cleaning. Learners. School. Weekend.", "A list of words with no clear message."],
    ],
    answer: "A",
    explanation: "Good headlines are short, specific and catchy: alliteration, wordplay, a question or a strong verb.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which opening sentence best **hooks** readers of an article on teenagers and sleep?",
    options: [
      ["Be honest: when did you last sleep a full eight hours before an exam?", "Correct: a direct question involves the reader at once."],
      ["This article is going to be all about teenagers and their sleeping habits.", "Announcing the topic is dull and wastes the opening."],
      ["Sleep is a thing that all people and animals do every night.", "A vague general statement does not grab attention."],
      ["I am writing to inform you of the importance of sleep.", "This is a formal letter opening, not an article hook."],
    ],
    answer: "A",
    explanation: "Hooks: a question to the reader, a vivid scene, a short anecdote or a surprising (true) fact. Avoid announcing *This article is about…*.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which feature shows that a text is an **article** rather than a **formal letter**?",
    options: [
      ["It has a headline and a by-line instead of addresses and a salutation.", "Correct: these are the format features of an article."],
      ["It has the writer's address and the full date in the top right-hand corner.", "Those are features of a letter."],
      ["It ends with Yours faithfully and the writer's full name.", "That is a formal letter close."],
      ["It has To, From and Date lines above the first paragraph.", "Those belong to a memo or report."],
    ],
    answer: "A",
    explanation: "Articles: headline, (strapline), by-line, paragraphs, no greeting or close. Letters: addresses, salutation, close.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Read this sentence from an article.\n\n*\"The hall was packed, the music was loud and the dancers were ready. Then the lights went out.\"*\n\nWhy is the **short final sentence** effective?",
    options: [
      ["It creates a sudden twist that makes readers want to continue.", "Correct: the contrast with the long first sentence creates surprise and suspense."],
      ["It gives a full explanation of why the power failed that night.", "No explanation is given; that is what makes readers curious."],
      ["It shows the writer could not think of any more details.", "The brevity is deliberate, not a lack of ideas."],
      ["It makes the article more formal and impersonal in style.", "The effect is dramatic and engaging, not formal."],
    ],
    answer: "A",
    hints: ["Compare the length of the two sentences.", "What question does the reader now want answered?"],
    explanation: "A short sentence after a long one adds **punch**: it surprises the reader and creates suspense, a useful technique in articles.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Which sentence is **lively but still appropriate** for a school magazine article?",
    options: [
      ["The final whistle blew, and the crowd erupted in a roar that shook the stands.", "Correct: vivid verbs and detail create energy without slang."],
      ["The match was totally lit and everyone went crazy, no cap.", "Slang (lit, no cap) is not acceptable in a school magazine."],
      ["The match concluded and spectators expressed approval in an orderly manner.", "Accurate but dull and stiff for a lively article."],
      ["Match finished. Crowd happy. Good game. Everybody went home.", "Note form is not continuous writing."],
    ],
    answer: "A",
    hints: ["Lively does not mean slang.", "Look for strong verbs and specific detail."],
    explanation: "Liveliness comes from precise verbs, sensory detail and varied sentences, not from slang.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "True or false? An article for a school magazine should begin with *Dear Editor*.",
    answer: false,
    explanation: "False. *Dear Editor* begins a letter to a newspaper. An article starts with a headline and goes straight into the introduction.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "True or false? Sub-headings can help to organise a longer article.",
    answer: true,
    explanation: "True. Sub-headings break a longer article into clear sections and show the examiner your organisation.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each part of an article with its example.",
    pairs: [
      ["Headline", "Small Seeds, Big Dreams"],
      ["Strapline", "How one garden fed a whole hostel this term"],
      ["By-line", "By Tendai Mupfumira, Form 3"],
      ["Call to action", "So why not start a garden at your school?"],
    ],
    explanation: "Headline (catchy title), strapline (one-line summary), by-line (writer), call to action (ending that urges readers to do something).",
  });
  b.fib({
    d: 2,
    stem: "Choose the best word to complete the article's conclusion.",
    template: "The message is {{blank:a}}: if every learner picks up one piece of litter a day, our school will {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["clear"], choices: ["clear", "clearly", "clearing", "cleared"] },
      { id: "b", accepted: ["shine"], choices: ["shine", "shines", "shone", "shining"] },
    ],
    explanation: "*The message is clear* (adjective after *is*). After the modal *will*, use the base form: *will shine*.",
  });

  b.ext({
    d: 3, skill: "CREATION", marks: 16, secs: 1900,
    stem: "Write an **article** (about 240 words) for your school magazine about your school's Sports Day. Use these notes:\n\n- held at the school grounds; four houses competed\n- highlight: the girls' 4 x 100 m relay\n- parents ran a food stall to raise funds for new kit\n- a problem: heat; a first-aid tent was set up\n- the winning house and what the captain said",
    wordLimit: { min: 220, max: 260 },
    points: [
      ["Headline and by-line; an introduction that hooks the reader", 3],
      ["All five notes used and developed with detail", 5],
      ["Lively, engaging style (quotation, varied sentences, vivid verbs) without slang", 3],
      ["Organised paragraphs (sub-headings optional) and a strong conclusion", 2],
      ["Accurate spelling, grammar and punctuation", 3],
    ],
    levels: [
      [4, 13, 16, "Engaging, well organised, every note developed; accurate."],
      [3, 9, 12, "Mostly lively and organised; notes used; generally accurate."],
      [2, 5, 8, "Dull or disorganised; notes missing; frequent errors."],
      [1, 0, 4, "Little sense of an article."],
    ],
    hints: ["Start with the most exciting moment, not the morning assembly.", "Invent a plausible quotation from the captain."],
    modelAnswer: "**Model answer:**\n\n**Hot Day, Hotter Finish: Msasa House Takes the Crown**\n\nBy Rufaro Chari, Form 4\n\nWith fifty metres to go, Msasa's anchor runner was third. Then she found another gear. The crowd rose, the noise doubled, and by the time she crossed the line the girls' 4 x 100 m relay had become the story of the day.\n\nOur annual Sports Day brought all four houses (Msasa, Mopane, Munhondo and Mukwa) to the school grounds for a morning of races, jumps and throws. From the first heat of the 100 m, the competition was fierce.\n\n**Feeding the fans**\n\nBehind the stands, parents ran a busy food stall selling boiled mealies, buns and freezits. Every cent will go towards new kit for the school teams, and judging by the queues, the netball players may soon have matching bibs.\n\n**Beating the heat**\n\nThe sun was relentless. By eleven o'clock, several athletes were feeling dizzy, but the first-aid tent set up by the Red Cross club near the finishing line handled every case calmly, and nobody was seriously unwell.\n\n**And the winner is…**\n\nAt the final count, Msasa House were champions, with that dramatic relay deciding the result. Their captain, Tinotenda, could hardly speak. \"We trained at six every morning,\" she said, \"and today it paid off.\"\n\nNext year's Sports Day is already being talked about. If you have never taken part, make this the year you join your house team. You might just be the anchor everyone remembers.",
    explanation: "The model opens with the most exciting moment, uses sub-headings, a quotation and varied sentences, covers every note and ends with a call to action.",
  });
  b.ext({
    d: 3, skill: "CREATION", marks: 12, secs: 1400,
    stem: "Write an **article** (about 170 words) for a youth magazine titled **\"Five minutes a day: small habits that make a big difference\"**, giving readers three practical habits.",
    wordLimit: { min: 150, max: 180 },
    points: [
      ["Headline used; an engaging opening that speaks to young readers", 3],
      ["Three practical habits, each explained with a reason or example", 4],
      ["Lively, friendly tone without slang; a memorable ending", 2],
      ["Accurate language", 3],
    ],
    hints: ["Think of study, health and money habits.", "Use the second person (you) to involve readers."],
    modelAnswer: "**Plan:** hook: \"What can you do in five minutes? Scroll through a few posts, or change your life?\"; habit 1: plan tomorrow tonight (write three tasks before bed); habit 2: drink a glass of water and stretch on waking; habit 3: write down every amount you spend that day; conclusion: small steps repeated daily add up; challenge readers to try one for a week.\n\n**Opening:** What can you do in five minutes? Scroll past a dozen videos you will have forgotten by lunchtime, probably. Or you could start a habit that quietly changes the way you study, feel and spend. Here are three that take no longer than a song on the radio.",
    explanation: "A magazine article for young readers uses a hook, direct address and practical, explained advice, and ends with a challenge or memorable thought.",
  });
  b.ext({
    d: 4, skill: "CREATION", marks: 16, secs: 1900,
    stem: "Write an **article** (about 240 words) for a local newspaper's youth page arguing that every secondary school in your district should have a **school garden**. Give at least three reasons and answer one objection.",
    wordLimit: { min: 220, max: 260 },
    points: [
      ["Headline, by-line and an introduction stating the view", 3],
      ["At least three developed reasons with realistic examples", 5],
      ["One objection fairly stated and answered", 2],
      ["Persuasive, engaging tone suited to newspaper readers", 3],
      ["Accurate language", 3],
    ],
    levels: [
      [4, 13, 16, "Persuasive, well-supported, objection handled; accurate and engaging."],
      [3, 9, 12, "Clear view with reasons; objection present; generally accurate."],
      [2, 5, 8, "Thin reasons or no objection; frequent errors."],
      [1, 0, 4, "Little relevant content."],
    ],
    hints: ["Reasons: nutrition, practical learning, income, environment.", "Objection: water shortages or time taken from lessons."],
    modelAnswer: "**Plan:**\n- Headline: *Grow Your Own Future: Why Every School Needs a Garden*; by-line.\n- Introduction: picture a school where lunch grows behind the classrooms; state the view.\n- Reason 1: nutrition: fresh vegetables for boarders or a feeding scheme.\n- Reason 2: practical learning: Agriculture and Science come alive; skills useful at home.\n- Reason 3: income and responsibility: surplus sold to staff and the community; learners manage records.\n- Objection: water is scarce; answer: drip irrigation, mulching and harvesting rainwater from roofs.\n- Conclusion: call on school development committees to set aside land this season.\n\n**Opening:** Picture this: it is lunchtime at a rural secondary school, and the covo and tomatoes on the learners' plates were picked that morning, fifty metres away, by the learners themselves. It sounds like a dream, but it is already happening in a few schools. It should be happening in every one.",
    explanation: "A persuasive article combines article format with argument: a clear view, developed reasons, a fair objection answered and a call to action.",
  });

  b.card("DEFINITION", "Article", "A piece for a magazine, newspaper or website that informs, entertains or persuades general readers.");
  b.card("CONCEPT", "Article layout", "Headline → strapline (optional) → by-line → hooking introduction → developed paragraphs (sub-headings) → conclusion or call to action.");
  b.card("DEFINITION", "Strapline", "A one-line summary under the headline.");
  b.card("DEFINITION", "By-line", "The line naming the writer: By Tariro Mhlanga, Form 4.");
  b.card("CONCEPT", "Ways to hook a reader", "A direct question, a vivid scene, a short anecdote or a surprising but true fact.");
  b.card("CONCEPT", "Lively without slang", "Use strong verbs, precise detail, quotations and varied sentence lengths; avoid slang and text speak.");
  b.card("FACT", "Should an article begin Dear Editor?", "No. That is a letter. An article starts with a headline.");
  b.card("CONCEPT", "Good headline techniques", "Alliteration, wordplay, a question, a strong verb; keep it short and specific.");
});
