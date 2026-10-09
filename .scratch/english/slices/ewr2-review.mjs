// Slice EWR2: reviews.
import { concept } from "../lib.mjs";

concept("eng.functional.review", { file: "functional/review", keyPrefix: "functional.review" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What are the **two main jobs** of a review?",
    options: [
      ["To describe the subject briefly and evaluate it", "Correct: a review informs readers and gives a justified opinion."],
      ["To retell the whole story and reveal the ending", "Retelling the ending gives away spoilers and is not evaluation."],
      ["To complain to the owners and demand a refund", "That is the purpose of a letter of complaint."],
      ["To list the facts under headings with recommendations to a head", "That describes a report."],
    ],
    answer: "A",
    explanation: "A review **describes** (enough for readers to understand) and **evaluates** (strengths, weaknesses, recommendation).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is a **spoiler**?",
    options: [
      ["A detail that gives away a surprise or the ending", "Correct: spoilers ruin the experience for people who have not seen or read it."],
      ["A negative opinion about a book or film", "A negative opinion is criticism, not a spoiler."],
      ["A star rating given at the very start of a book review", "A rating summarises the reviewer's verdict."],
      ["A quotation from one of the actors in a film", "A quotation is not necessarily a spoiler."],
    ],
    answer: "A",
    explanation: "A **spoiler** reveals the ending or a key surprise. Reviews describe the set-up without giving the ending away.",
  });
  b.mcq({
    d: 2, skill: "EVALUATION",
    stem: "Which sentence gives the **best-supported opinion** in a book review?",
    options: [
      ["The novel is gripping because every chapter ends with an unanswered question.", "Correct: an opinion (gripping) with a specific reason."],
      ["The novel is very good and I liked it very much indeed.", "An opinion with no reason or example."],
      ["The novel has twenty-four chapters and three hundred pages.", "A fact, not an evaluation."],
      ["The novel is simply the best book that has ever been written by anyone in the world.", "An exaggerated claim with no support."],
    ],
    answer: "A",
    explanation: "Support every opinion with a **reason** and, where possible, a specific **example** from the work.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which tense is normally used to **describe the plot** of a film in a review?",
    options: [
      ["The present tense: The film follows a young farmer…", "Correct: reviews describe plots in the present tense."],
      ["The future tense: The film will follow a young farmer…", "The future tense is not used for describing an existing work."],
      ["The past perfect: The film had followed a young farmer…", "The past perfect describes an earlier past, not a plot summary."],
      ["The conditional: The film would follow a young farmer…", "The conditional suggests something hypothetical."],
    ],
    answer: "A",
    explanation: "Plots and features are described in the **present tense** (*The story follows…*, *The museum displays…*). Your visit can be in the past (*We waited…*).",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Which is the most effective **concluding sentence** for a review of a school play?",
    options: [
      ["Despite a slow start, it is a funny, moving production that families should not miss.", "Correct: balanced verdict and a clear recommendation for a named audience."],
      ["The play finished at nine o'clock and then everyone went home.", "A fact with no verdict or recommendation."],
      ["In the end, the main character discovers that the thief was really her own older brother.", "This is a spoiler and gives no recommendation."],
      ["I do not really know what to say about it, so that is all.", "Weak and gives readers no guidance."],
    ],
    answer: "A",
    hints: ["What do readers want to know at the end?", "Avoid revealing the ending."],
    explanation: "End with an overall **verdict** and a **recommendation**, ideally naming who would enjoy it.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "*\"While the acting is excellent, the story is predictable.\"*\n\nWhat does this sentence show about the review?",
    options: [
      ["It gives a balanced judgement, noting a strength and a weakness.", "Correct: While links a strength with a weakness."],
      ["It reveals the ending and so contains a spoiler.", "Calling the story predictable does not reveal what happens."],
      ["It is purely factual and contains no opinion about the film at all.", "Excellent and predictable are both opinions."],
      ["It recommends the film strongly to every reader.", "There is no recommendation in this sentence."],
    ],
    answer: "A",
    hints: ["Look at the word While.", "How many opinions are there?"],
    explanation: "Linking words such as *while*, *although* and *however* help a review weigh strengths against weaknesses: a **balanced** judgement.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "True or false? A review should end with a recommendation.",
    answer: true,
    explanation: "True. Readers use a review to decide, so the verdict and recommendation are essential.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "True or false? A good review summarises the whole plot of a novel, including the ending, so readers know exactly what happens.",
    answer: false,
    explanation: "False. Summarising the ending creates spoilers. Give a short outline of the set-up and spend most words evaluating.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each sentence from a restaurant review with its purpose.",
    pairs: [
      ["The restaurant is on the first floor of a shopping centre in Gweru.", "Description"],
      ["The grilled bream was fresh, perfectly cooked and full of flavour.", "Strength"],
      ["Sadly, the music was so loud that we could hardly talk.", "Weakness"],
      ["I would recommend it for a birthday treat with friends.", "Recommendation"],
    ],
    explanation: "A review moves from description to evaluation (strengths and weaknesses) to recommendation.",
  });
  b.fib({
    d: 2,
    stem: "Choose the best evaluative words.",
    template: "The film is {{blank:a}} filmed, but the middle section {{blank:b}}, and some viewers may lose interest.",
    blanks: [
      { id: "a", accepted: ["beautifully"], choices: ["beautifully", "beautiful", "beauty", "beautify"] },
      { id: "b", accepted: ["drags"], choices: ["drags", "dragging", "dragged on to", "drag"] },
    ],
    explanation: "An adverb modifies the participle *filmed*: **beautifully** filmed. The subject *the middle section* is singular, so the present-tense verb is **drags**.",
  });

  b.ext({
    d: 3, skill: "CREATION", marks: 12, secs: 1300,
    stem: "Your school drama club recently performed a play. Write a **review** of it for the school website (about 150 words). Describe the play briefly without spoilers, comment on two strengths and one weakness, and make a recommendation. (You may invent the play.)",
    wordLimit: { min: 130, max: 160 },
    points: [
      ["Title and a hook; brief description without spoilers", 3],
      ["Two strengths, each with a reason or example", 3],
      ["One weakness, fairly explained", 2],
      ["Clear recommendation for a named audience", 2],
      ["Lively, accurate language with evaluative vocabulary", 2],
    ],
    hints: ["Strengths might be acting, costumes, music or humour.", "Who should come to the next performance?"],
    modelAnswer: "**\"The Borrowed Bicycle\": Laughter and Lessons in the School Hall**\n\nIf you missed the drama club's play on Friday, you missed the funniest evening of the term.\n\n*The Borrowed Bicycle* follows Tafara, a Form 2 boy who borrows his uncle's bicycle without asking and spends a chaotic day trying to return it before anyone notices. The set-up is simple, but the comedy builds cleverly.\n\nThe acting was the highlight. Tanaka, who played Tafara, had perfect timing, and the hall roared every time he hid the bicycle somewhere even more ridiculous. The costumes were also impressive: the uncle's enormous hat got its own round of applause.\n\nMy only criticism is the sound. Actors at the back of the stage were hard to hear, especially during the busy market scene.\n\nOverall, this is a warm, funny production with a gentle message about honesty. Bring your family to the repeat performance on parents' day; you will not regret it.",
    explanation: "The model hooks the reader, describes the set-up without revealing the ending, gives two supported strengths and one fair weakness, and recommends the play to families.",
  });
  b.ext({
    d: 3, skill: "CREATION", marks: 10, secs: 1000,
    stem: "Write a short **review** (about 120 words) of a place in Zimbabwe you have visited (a park, museum, market or tourist site) for a youth magazine. Include what it offers, one strength, one weakness and who should visit.",
    wordLimit: { min: 100, max: 130 },
    points: [
      ["Title and essential description of what the place offers", 3],
      ["One strength and one weakness, each with a reason", 3],
      ["Recommendation naming a suitable audience", 2],
      ["Accurate, engaging language", 2],
    ],
    hints: ["Think about facilities, prices, access and atmosphere.", "Keep the description to two or three sentences."],
    modelAnswer: "**Plan:** title: *Matobo National Park: Rocks, Rhinos and Rock Art*; description: granite hills, game drives, ancient paintings in caves, a short drive south of Bulawayo; strength: the guided walk to rock-art shelters, with knowledgeable guides who explain the paintings; weakness: the gravel roads are rough and some sites are hard to reach without a high vehicle; recommendation: families and school groups who enjoy history and walking; go early in the day.\n\n**Opening:** Few places in Zimbabwe feel as ancient as the Matobo hills. Huge granite boulders balance on one another as if placed by giants, and in the caves between them, paintings made long ago still glow red and yellow on the rock.",
    explanation: "A place review gives the essential facts, balances a strength with a weakness and recommends it to a specific group of visitors.",
  });
  b.ext({
    d: 4, skill: "CREATION", marks: 16, secs: 1800,
    stem: "Write a **review** (about 230 words) of a book you have read (a set text, a novel or a non-fiction book) for your school magazine. Include: what kind of book it is and what it is about (no spoilers), two strengths with examples, one weakness and a recommendation.",
    wordLimit: { min: 200, max: 250 },
    points: [
      ["Title, author and genre given; a hooking introduction", 2],
      ["Concise description of the set-up and themes without spoilers", 3],
      ["Two strengths supported with specific examples from the book", 4],
      ["A fair weakness and a balanced overall verdict", 2],
      ["Clear recommendation for a named audience", 2],
      ["Accurate language with a range of evaluative vocabulary", 3],
    ],
    levels: [
      [4, 13, 16, "Engaging, balanced, well-supported review with a clear recommendation; accurate."],
      [3, 9, 12, "Clear review with some support; recommendation given; generally accurate."],
      [2, 5, 8, "Mostly retelling or unsupported opinions; frequent errors."],
      [1, 0, 4, "Little evaluation."],
    ],
    hints: ["Do not retell the whole plot.", "Name a type of reader who would enjoy it."],
    modelAnswer: "**Plan:**\n- Title: the book's name, author and genre in the opening line; star rating optional.\n- Introduction: a hook, such as the question the book makes you ask, or a striking first impression.\n- Description (3-4 sentences): main character, setting and central problem; stop before the climax.\n- Strength 1: e.g. vivid setting, with a specific scene.\n- Strength 2: e.g. a believable main character, with an example of a choice they make.\n- Weakness: e.g. a slow opening or too many minor characters.\n- Verdict and recommendation: who would enjoy it (readers who like adventure, history, family stories) and why.\n\n**Example opening paragraph:** Some books you read; others you live in for a week. For me, this novel was the second kind. Set in a village during a long drought, it follows a fourteen-year-old girl who must decide whether to leave school to help her family, and it made me think harder about my own choices than any book I have read this year.",
    explanation: "A book review is mostly evaluation: a short spoiler-free description, supported strengths, a fair weakness and a recommendation for specific readers.",
  });

  b.card("DEFINITION", "Review", "A text that describes and evaluates a book, film, event or place and ends with a recommendation.");
  b.card("DEFINITION", "Spoiler", "A detail that gives away a surprise or the ending.");
  b.card("CONCEPT", "Review structure", "Title → hook and essential facts → short description → strengths → weaknesses → verdict and recommendation.");
  b.card("CONCEPT", "Opinions in reviews", "Support every opinion with a reason and a specific example.");
  b.card("FACT", "Tense for describing a plot", "The present tense: The story follows…");
  b.card("VOCABULARY", "Positive review words", "gripping, moving, beautifully filmed, full of flavour, well worth a visit, a must-read.");
  b.card("VOCABULARY", "Negative review words", "predictable, disappointing, overpriced, the pace drags, let down by…");
  b.card("CONCEPT", "Balanced judgement", "Mention strengths and weaknesses, linked with while, although or however, before the verdict.");
});
