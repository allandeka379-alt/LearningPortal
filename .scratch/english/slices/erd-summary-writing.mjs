// Slice ERD: summary — writing a summary in continuous prose.
// Practice summary marks avoid the reserved EXTENDED_RESPONSE values (15/20/30/40) and STRUCTURED (20/40).
import { concept, P } from "../lib.mjs";

const TREES = `Read the article.

**The tree project**

**[1]** When Zvamagwaro Secondary School was built in 1985, the builders cleared almost every tree from the site, leaving only one old baobab near the gate. For years the school was a place of dust and glare. Three years ago the Environment Club decided to change that and planted two hundred indigenous seedlings donated by a local nursery.

**[2]** The effects have surprised even the club's members. The young trees already shade the paths, so pupils no longer queue for lunch in the full sun. In the windy months, a row of msasa trees along the western fence breaks the force of the wind and keeps dust out of the classrooms. The science teacher reports that classrooms near the trees are noticeably cooler in the afternoons, which helps pupils to concentrate.

**[3]** The trees have also become a place for learning. Biology classes use them to study leaf shapes, insects and the life cycles of plants. The Agriculture class has learned to raise seedlings and now sells them to parents, raising money for garden tools. Last term a group of Form 2 pupils counted fourteen different kinds of bird in the school grounds, compared with three before the project began.

**[4]** Perhaps the greatest change has been in the way pupils feel about their school. Litter has fallen, because pupils who have watered a tree for three years do not want to see rubbish at its roots, and many say they are proud of the grounds. Visitors often comment on how attractive the school looks, and the head says that more parents now ask about places for their children.

**[5]** There have been setbacks, of course. Goats ate the first seedlings, and a dry year killed nearly forty trees. The club now protects young trees with wire cages and waters them with recycled water from the kitchen.

**[6]** The members hope that within ten years the trees will be tall enough to shade the sports field. They have also planted ten mazhanje trees, which should bear fruit within five years and give pupils a free, healthy snack.`;

const ACADEMY = `Read the article.

**[1]** The Sunrise Football Academy in Chitungwiza began eight years ago on a stony patch of ground with one ball and eleven boys. Today it trains over a hundred boys and girls, and three former players have signed for professional clubs.

**[2]** Its founder, Mr Isaac Zhou, a former goalkeeper, believes the first reason for its success is discipline. Players who arrive late do not play that day, whoever they are. Just as important is school: every player must show his or her school report each term, and anyone whose marks fall is given extra lessons by volunteer teachers before returning to the pitch.

**[3]** The coaches are all former players from the area who give their time free. Because they grew up in the same streets, the children trust them.

**[4]** Parents are involved too. Mothers take turns to cook a meal after Saturday training, so that no child plays on an empty stomach, and fathers have built goalposts and a fence.

**[5]** The academy also plays matches against teams from other provinces, which teaches players to cope with pressure and travel. Mr Zhou remembers one away game in Masvingo when his team lost 6–0. "The boys cried all the way home," he laughs. "The next year we won."

**[6]** Finally, the academy treats girls and boys equally: they train on the same pitch, at the same times, with the same coaches.`;

const BUS = `Read the passage.

> The school's old bus has become more trouble than it is worth. It breaks down at least once a month, often far from any town, leaving teams stranded on the way to matches. Spare parts for such an old model have to be ordered from abroad, so repairs take weeks. It uses so much diesel that every trip costs far more than it did when the bus was new. Its windows no longer close properly, and pupils arrive soaked when it rains. The driver, Mr Banda, who has driven it for fifteen years, jokes that he knows every bolt by name. Worse, the seat belts at the back are broken, which worries parents. Finally, the bus cannot pass its annual roadworthiness test without expensive work, and the head fears it may soon be taken off the road altogether.`;

concept("eng.summary.writing", { file: "summary/writing", keyPrefix: "summary.writing" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **continuous prose**?",
    options: [
      ["complete sentences joined in a paragraph", "Correct: a summary is written this way unless notes are asked for."],
      ["a numbered list of brief notes", "That is note form."],
      ["a set of bullet points under headings", "That is note form, not continuous prose."],
      ["a poem with lines that do not rhyme", "That is free verse."],
    ],
    answer: "A",
    explanation: "**Continuous prose** = full sentences in a paragraph. Unless the task asks for notes, a summary must be in continuous prose.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Which is the **best** opening for a summary of the ways families save water?",
    options: [
      ["Families reuse kitchen water on their gardens.", "Correct: it starts directly with a point."],
      ["This passage is about saving water in Bulawayo.", "This uses words without giving any point."],
      ["I am going to summarise the ways of saving water.", "An introduction like this wastes words."],
      ["Water is very important for every family's life.", "This is a general comment, not a point from the passage."],
    ],
    answer: "A",
    explanation: "Start with a point. Introductions such as *This passage is about…* use up the word limit and earn nothing.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Notes: *water early or late · cover soil to keep moisture · grow indigenous plants.* Which sentence combines all three most concisely?",
    options: [
      ["Gardeners water at cool times, cover the soil and grow hardy indigenous plants.", "Correct: three points in one fluent sentence."],
      ["Gardeners water early. They also cover the soil. They grow indigenous plants too.", "Three short sentences are less fluent and repeat the subject."],
      ["Gardeners water early or late and they also do other good things in gardens.", "This loses two points."],
      ["Gardeners grow indigenous plants because these are very beautiful to look at.", "This adds a reason not in the notes and loses two points."],
    ],
    answer: "A",
    explanation: "Combine points with a list or clauses to save words and improve fluency, without losing any point.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "True or false: a summary should end with a conclusion giving your opinion of the ideas.",
    answer: false,
    explanation: "False. A summary reports the passage's points only. Opinions and conclusions waste words and may move you over the limit.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "True or false: points written after the word limit has been reached may not be credited.",
    answer: true,
    explanation: "True. Examiners may stop reading at the limit. Keep within it by cutting words, not points.",
  });
  b.fib({
    d: 2, skill: "APPLICATION",
    stem: "Choose the linking words that join the points logically.",
    template: "Families store rainwater {{blank:a}} they can water gardens in the dry months, {{blank:b}} not everyone can afford tanks. Leaks are fixed quickly, {{blank:c}} taps are checked monthly.",
    blanks: [
      { id: "a", accepted: ["so that"], choices: ["so that", "although", "however", "for example"] },
      { id: "b", accepted: ["although"], choices: ["although", "so that", "because", "therefore"] },
      { id: "c", accepted: ["and"], choices: ["and", "although", "unless", "but"] },
    ],
    explanation: "*so that* shows purpose; *although* shows contrast; *and* adds a further point.",
  });
  b.manualShort({
    d: 3, skill: "CREATION",
    stem: "Combine these notes into **one** sentence of no more than 25 words, in your own words.\n\n*Notes: academy strict about lateness · insists on schoolwork · volunteer teachers help players with falling marks*",
    marks: 3,
    points: [
      "Includes strictness about lateness / punctuality",
      "Includes the insistence on schoolwork and the extra help from volunteer teachers",
      "One grammatical sentence of 25 words or fewer, fluently linked",
    ],
    modelAnswer: "The academy punishes lateness, demands good school results and arranges free lessons for players whose marks drop.",
    hints: ["Use a list with commas and *and*."],
    explanation: "Combining points into a single list-sentence saves words: three points in seventeen words.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION",
    stem: "This sentence in a candidate's summary is lifted from the passage. Rewrite it in your own words.\n\n*Players who arrive late do not play that day, whoever they are.*",
    marks: 2,
    points: [
      "Keeps the meaning: latecomers miss that day's game / are left out",
      "Applies to everyone / no exceptions, expressed without lifting the key words",
    ],
    modelAnswer: "Anyone who is late is left out of that day's game, with no exceptions.",
    hints: ["Change *arrive late*, *do not play* and *whoever they are*."],
    explanation: "Own words show understanding: *latecomers miss the game, no matter who they are*.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Your summary is 20 words over the limit. What should you do **first**?",
    options: [
      ["Cut unnecessary words and merge sentences, keeping every point", "Correct: cut words, not points."],
      ["Delete the last two points to save twenty words", "Points carry the marks; cut padding first."],
      ["Leave it, because a longer summary shows more effort", "Points beyond the limit may not be credited."],
      ["Change the summary into a list of notes instead", "A summary must be continuous prose."],
    ],
    answer: "A",
    hints: ["Which parts of a summary carry the marks?"],
    explanation: "Remove padding (adjectives, repetition, introductions), merge sentences with lists or clauses, and keep every point.",
  });
  b.match({
    d: 3, skill: "ANALYSIS",
    stem: "Match each fault in a summary with the best fix.",
    pairs: [
      ["opens with *This passage is about…*", "start directly with a point"],
      ["includes the story of the grandmother's drums", "leave out examples"],
      ["copies whole sentences from the passage", "rewrite key words in your own words"],
      ["writes the points as bullet points", "join them in continuous prose"],
      ["ends with *I think these are good ideas*", "remove personal opinions"],
    ],
    hints: ["For each fault, ask what a summary should contain instead."],
    explanation: "Each fault costs marks or words: introductions, examples, lifting, note form and opinions.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which version of a summary point uses a suitable **neutral, third-person** style?",
    options: [
      ["Families repair leaking taps promptly.", "Correct: neutral, third person, concise."],
      ["You should always fix your leaking taps.", "This gives advice to the reader (second person)."],
      ["I think people ought to fix their taps.", "This adds a personal opinion."],
      ["Fix those dripping taps right now, please!", "This is an instruction, not a summary."],
    ],
    answer: "A",
    explanation: "Summaries report the passage neutrally in the third person; they do not advise or instruct the reader.",
  });
  b.struct({
    d: 4, skill: "CREATION", examStyle: true, secs: 1800,
    stem: TREES,
    parts: [
      P.mcq({
        label: "(a)",
        stem: "Which paragraph contains **no** benefits of the trees?",
        options: [
          ["paragraph 5", "Correct: it describes setbacks and how the club protects the trees."],
          ["paragraph 2", "Paragraph 2 gives shade, windbreak and cooler classrooms."],
          ["paragraph 4", "Paragraph 4 gives less litter, pride and a better reputation."],
          ["paragraph 6", "Paragraph 6 gives future shade and fruit."],
        ],
        answer: "A",
        explanation: "Paragraph 5 describes problems (goats, drought) and solutions; it contains no benefits. Paragraph 1 is background.",
      }),
      P.mcq({
        label: "(b)",
        stem: "Which detail in paragraph 3 is an **example** and should be left out of the summary?",
        options: [
          ["fourteen kinds of bird compared with three", "Correct: it is evidence for the point that the trees attract birds."],
          ["Biology classes study leaves and insects there", "This is the point that the trees are a teaching resource."],
          ["seedlings are sold to parents for tools money", "This is the point about raising money."],
          ["the trees have become a place for learning", "This is the topic sentence introducing the points."],
        ],
        answer: "A",
        explanation: "The figures support the point; in the summary write simply that the trees attract many more birds.",
      }),
      P.manual({
        label: "(c)",
        type: "EXTENDED_RESPONSE",
        marks: 14,
        wordLimit: { max: 120 },
        stem: "Summarise the benefits that the trees bring, or are expected to bring, to the school. Write one paragraph of continuous prose, **no more than 120 words**, using your own words as far as possible.",
        points: [
          ["Content: one mark for each relevant point, up to 10", 10, [
            "shade on the paths / no queuing in the sun",
            "windbreak along the fence",
            "less dust in classrooms",
            "cooler classrooms",
            "better concentration",
            "a resource for outdoor (Biology) lessons",
            "seedlings sold to raise money for tools",
            "attract many more birds",
            "less litter / pupils proud of the grounds",
            "attractive school impresses visitors / more parents ask for places",
            "future: shade for the sports field",
            "future: free, healthy fruit",
          ]],
          ["Own words: key ideas re-expressed, little lifting", 2],
          ["Concise, fluent continuous prose within 120 words; no examples, introduction or opinion", 2],
        ],
        modelAnswer: "The trees shade the school paths and, along the western fence, block the wind and keep dust out of classrooms, which are also cooler, helping pupils concentrate. They give Biology classes a living resource for outdoor lessons, while Agriculture pupils raise and sell seedlings to buy tools. Many more kinds of birds now visit. Pupils who have cared for the trees take pride in the grounds and drop less litter, and visitors admire the school, increasing interest from parents of new pupils. In future the trees should shade the sports field and supply free, healthy fruit. (96 words)",
      }),
    ],
    hints: ["Use paragraphs 2, 3, 4 and 6; leave out background, setbacks and figures.", "Combine related points into one sentence."],
    explanation: "Twelve benefits are available (ten score). Paragraph 1 is background, paragraph 5 describes setbacks, and the bird count and the two hundred seedlings are details. Expression marks reward own words and concise, linked prose.",
  });
  b.ext({
    d: 4, skill: "CREATION", examStyle: true, secs: 1500,
    stem: `${ACADEMY}\n\nSummarise the reasons for the academy's success. Write one paragraph of **no more than 100 words**, using your own words as far as possible.`,
    marks: 12,
    wordLimit: { max: 100 },
    points: [
      ["Content: one mark for each relevant point, up to 8", 8, [
        "strict discipline: latecomers do not play",
        "players must keep up their schoolwork / show reports",
        "volunteer teachers give extra lessons to players whose marks fall",
        "unpaid coaches are former local players",
        "children trust the coaches because they share the same background",
        "mothers provide a meal after training so no one plays hungry",
        "fathers built goalposts and a fence",
        "matches against teams from other provinces build experience of pressure and travel",
        "girls and boys treated equally (same pitch, times and coaches)",
      ]],
      ["Own words: key ideas re-expressed, little lifting", 2],
      ["Concise, fluent continuous prose within 100 words; no anecdotes (the Masvingo match) or statistics", 2],
    ],
    modelAnswer: "The academy succeeds partly through strict discipline: late players miss that day's game. It insists that players keep up at school, and volunteer teachers coach anyone whose marks drop. Its unpaid coaches are former local players whom the children trust. Parents cook meals after Saturday training so nobody plays hungry and have built goalposts and a fence. Matches against teams from other provinces teach players to handle pressure and travel, and girls and boys receive identical training. (77 words)",
    hints: ["Leave out the history in paragraph 1 and the story of the 6-0 defeat.", "Group the parents' contributions in one sentence."],
    explanation: "Nine possible points (eight score). The founding story, the number of players and the Masvingo anecdote are background or examples.",
  });
  b.ext({
    d: 3, skill: "CREATION", secs: 1200,
    stem: `${BUS}\n\nSummarise the problems with the school bus. Write one paragraph of **no more than 70 words**, in your own words.`,
    marks: 10,
    wordLimit: { max: 70 },
    points: [
      "breaks down often, stranding teams far from help",
      "parts must be imported, so repairs are slow",
      "uses a lot of fuel, so trips are expensive",
      "windows do not close, so pupils get wet in rain",
      "broken rear seat belts worry parents (safety)",
      "cannot pass its yearly roadworthiness test without costly repairs / may be taken off the road",
      ["Own words and no irrelevant detail (e.g. the driver's joke)", 2],
      ["Concise, fluent continuous prose within 70 words", 2],
    ],
    modelAnswer: "The bus breaks down often, stranding teams far from help, and because parts must be imported, repairs take weeks. It is extremely costly to run, as it burns so much fuel. Rain comes in through windows that will not close, and broken rear seat belts make parents anxious. It also needs costly repairs to pass its yearly safety inspection and could soon be banned. (64 words)",
    hints: ["Six problems; one sentence in the passage is irrelevant."],
    explanation: "Six problems score one mark each; Mr Banda's joke is irrelevant. The remaining marks reward own words and concise, fluent prose.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Which word from a passage about a village water project may be **kept** in an own-words summary?",
    options: [
      ["borehole", "Correct: it has no simple equivalent and is a precise term."],
      ["insufficient", "This can be replaced with not enough."],
      ["commenced", "This can be replaced with began."],
      ["deteriorated", "This can be replaced with got worse."],
    ],
    answer: "A",
    hints: ["Which word has no simpler, accurate replacement?"],
    explanation: "Keep words with no simple equivalent (borehole, mazhanje, msasa); change ordinary key words (insufficient, commenced, deteriorated).",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Two candidates summarise the bus passage. A writes 64 words with six points in own words. B writes 95 words with six points, including the driver's joke, and copies three sentences. Which is true?",
    options: [
      ["A scores higher: same content, but concise, relevant and own words", "Correct: B loses expression marks and goes over the limit."],
      ["B scores higher because the summary is longer", "Length is not rewarded; B is over the 70-word limit."],
      ["Both score the same because they have six points each", "Expression marks differ: B lifts and adds irrelevant detail."],
      ["B scores higher because the joke adds human interest", "The joke is irrelevant to the problems."],
    ],
    answer: "A",
    hints: ["Think about the word limit and the expression marks."],
    explanation: "Content can be equal, but expression marks reward own words, relevance and concision within the limit.",
  });

  b.card("DEFINITION", "Continuous prose", "Complete sentences joined in a paragraph, not notes or bullet points.", undefined);
  b.card("CONCEPT", "Start with a point", "Never begin 'This passage is about…'. The first sentence should already earn a mark.", undefined);
  b.card("CONCEPT", "Combine points", "Use lists, relative clauses, participles and linking words to fit several points in one sentence.", undefined);
  b.card("CONCEPT", "Cut words, not points", "If over the limit, remove padding and repetition and merge sentences; keep every point.", undefined);
  b.card("FACT", "What a summary never contains", "Introductions, conclusions, opinions, examples, anecdotes, quotations and repetition.", undefined);
  b.card("CONCEPT", "Own words in summaries", "Change key words; keep only words with no simple equivalent (borehole, msasa).", undefined);
  b.card("CONCEPT", "Neutral third person", "Report the passage: 'Families repair leaks', not 'You should fix your taps'.", undefined);
  b.card("FACT", "Quick word count", "Count the words in three typical lines, find the average and multiply by the number of lines.", undefined);
  b.card("CONCEPT", "How summaries are marked", "Content (one mark per relevant point) plus expression (own words, concise, fluent, within the limit).", undefined);
});
