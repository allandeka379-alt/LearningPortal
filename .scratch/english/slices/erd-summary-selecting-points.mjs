// Slice ERD: summary — selecting points.
import { concept, P } from "../lib.mjs";

const WATER = `Read the article.

**Making every litre count**

**[1]** Bulawayo has long been known as a city that must be careful with water. Its supply depends on dams that fill only in good rainy seasons, and in dry years the city council rations water by area.

**[2]** Families have learned many ways to make every litre count. The most common is to collect the water used for washing vegetables and rinsing dishes and pour it on the garden. Many households keep a bucket in the shower to catch the cold water that runs before the hot water arrives. Others have stopped using a hosepipe altogether and wash their cars with a single bucket.

**[3]** In the toilet, a two-litre bottle filled with sand and placed in the cistern reduces the amount of water used for every flush. During severe shortages, some families simply agree not to flush after every use.

**[4]** Leaks waste more water than most people realise. A tap that drips steadily can waste a surprising amount over a year, so careful families check their taps and pipes every month and replace worn washers at once.

**[5]** Gardeners have changed their habits too. They water early in the morning or in the evening, when less water is lost to evaporation, and they cover the soil with grass cuttings or dry leaves to keep it moist. Some have replaced thirsty lawns with indigenous plants that survive on rainfall alone.

**[6]** Finally, many homes now catch rain. Gutters lead from the roof into drums or tanks, and the water is used for gardens and cleaning during the dry months. One grandmother in Nkulumane says her two drums carried her vegetable garden through a whole winter.

**[7]** Not everyone can afford tanks or new washers, and some residents argue that the council should do more to repair burst water mains.`;

const ext = (text) => `Read the extract.\n\n> ${text}`;

concept("eng.summary.selecting-points", { file: "summary/selecting-points", keyPrefix: "summary.selecting-points" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What earns most of the marks in a summary?",
    options: [
      ["the relevant points it includes", "Correct: content marks are usually one per relevant point."],
      ["the number of examples it contains", "Examples usually earn nothing."],
      ["the length of its introduction", "Introductions waste words."],
      ["the quotations copied from the text", "Copying loses own-words marks."],
    ],
    answer: "A",
    explanation: "Most summary marks are for **content**: one mark for each relevant point. Selection comes first.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "*Summarise the difficulties that the new teacher faced during her first term.* What is the **focus** of this task?",
    options: [
      ["the teacher's difficulties", "Correct: only difficulties count, and only the teacher's."],
      ["the pupils' difficulties", "The task is about the teacher."],
      ["the teacher's successes", "Successes are the opposite of the focus."],
      ["the school's history", "Background is not part of the focus."],
    ],
    answer: "A",
    explanation: "Underline the **focus** (difficulties), **whose** (the new teacher's) and **limits** (first term).",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: `${WATER}\n\nTask: *Summarise the ways in which families save water.* Which sentence contains a **relevant point**?`,
    options: [
      ["Others wash their cars with a single bucket.", "Correct: a way of saving water."],
      ["The supply depends on dams that fill in good seasons.", "This is background: a cause of shortage."],
      ["The council rations water by area in dry years.", "This is what the council does, not families."],
      ["Some residents want the council to fix burst mains.", "This is an opinion about the council, not a way families save water."],
    ],
    answer: "A",
    explanation: "Only details that answer the focus (*ways families save water*) are points. Background and complaints about the council are outside it.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: `${WATER}\n\nIn paragraph 6, the sentence about the grandmother in Nkulumane is best described as:`,
    options: [
      ["an example supporting the point about collecting rain", "Correct: it illustrates rain harvesting; it is not a new point."],
      ["a new and separate method that families use to save water", "It adds no new method; it shows the drums working."],
      ["the main point that the whole article is making", "It is a single anecdote."],
      ["a problem that families face with water", "It describes a success, not a problem."],
    ],
    answer: "A",
    hints: ["Does the sentence add a new method, or show one already mentioned?"],
    explanation: "Anecdotes and examples **illustrate** points. Leave them out of a summary; the point is *collect rainwater in drums or tanks*.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", multiple: true,
    stem: `${WATER}\n\nTask: *Summarise the ways families save water.* Which **two** sentences from paragraph 5 each contain a relevant point? Select two.`,
    options: [
      ["They water early in the morning or in the evening.", "Correct: a way of saving water."],
      ["Some have replaced thirsty lawns with indigenous plants.", "Correct: another way of saving water."],
      ["Gardeners have changed their habits too.", "This introduces the paragraph; it is not a method."],
      ["Less water is lost to evaporation at those times.", "This explains why the first method works; it is not a separate method."],
      ["The city depends on dams that fill in good years.", "This is not in paragraph 5 and is background."],
    ],
    answer: ["A", "B"],
    explanation: "Topic sentences and explanations of *why* a method works support points; they are not extra points. (Paragraph 5 also contains a third point, mulching the soil.)",
  });
  b.match({
    d: 3, skill: "ANALYSIS",
    stem: "Task: *Summarise the benefits of the school's trees.* Decide what each sentence is.",
    pairs: [
      "The trees shade the paths, so pupils no longer queue in the sun.",
      "Last term pupils counted fourteen bird species in the grounds.",
      "The school was built in 1985 on a cleared site.",
      "Goats ate the first seedlings.",
      "Shade along the paths means queues are no longer in full sun.",
    ],
    right: ["relevant point", "example or statistic", "background", "off-focus (a problem)", "repetition of a point"],
    rightIndex: [0, 1, 2, 3, 4],
    shuffle: false,
    hints: ["Which sentence says the same thing as an earlier one?"],
    explanation: "Only the first sentence earns a mark. The bird count is evidence; the building date is background; the goats are a setback, not a benefit; the last sentence repeats the first.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "True or false: a single sentence in a passage can contain two separate summary points.",
    answer: true,
    explanation: "True. *They water early … and cover the soil with grass cuttings* holds two points. Split them in your notes.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "True or false: statistics in a passage should always be included in a summary because they are facts.",
    answer: false,
    explanation: "False. Numbers usually **support** a point. Include a number only if it is itself the point the task asks for.",
  });
  b.fib({
    d: 2, skill: "APPLICATION",
    stem: "Task: *Summarise the advantages of cycling to school.* Classify each sentence.",
    template: "*Cycling saves the bus fare.* → {{blank:a}}. *My friend Tapiwa saved enough for new shoes in a term.* → {{blank:b}}. *Roads can be dangerous after dark.* → {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["relevant point"], choices: ["relevant point", "example", "off-focus"] },
      { id: "b", accepted: ["example"], choices: ["relevant point", "example", "off-focus"] },
      { id: "c", accepted: ["off-focus"], choices: ["relevant point", "example", "off-focus"] },
    ],
    explanation: "Saving the fare is an advantage (point); Tapiwa's shoes illustrate it (example); danger after dark is a disadvantage (off-focus).",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: ext("*The new borehole has changed life in the village. Women no longer walk four kilometres to the river each morning, so girls arrive at school on time. Fewer children suffer from stomach illnesses, because the water is clean. \"I can now grow tomatoes all year,\" says Mrs Shumba, whose garden is next to the pump.*") + "\n\nTask: *Summarise the benefits of the borehole.* How many separate benefits does the extract contain?",
    options: [
      ["four", "Correct: no long walk; girls on time; fewer stomach illnesses; year-round gardening."],
      ["two", "This misses at least two benefits."],
      ["six", "Some details (four kilometres, Mrs Shumba) are supporting details, not separate benefits."],
      ["one", "The extract lists several distinct benefits."],
    ],
    answer: "A",
    hints: ["Turn the quotation into a point: what does it show?"],
    explanation: "Points: (1) no long walk for water; (2) girls reach school on time; (3) fewer stomach illnesses (clean water); (4) gardens can be watered all year (from Mrs Shumba's words). *Four kilometres* and her name are details.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION",
    stem: ext("*Running a tuck shop taught the Form 3 club more than they expected. They learned to keep accurate records, because every missing dollar had to be explained to the treasurer. They discovered how to work as a team when two members fell ill during exams. Bargaining with suppliers at the wholesaler made the shyest members more confident, and planning stock each week taught them to think ahead. They even raised enough profit to buy a printer for the library.*") + "\n\nTask: *List, in note form, what the club members learned, leaving out anything that does not answer the question.",
    marks: 5,
    points: [
      "keep accurate records",
      "work as a team",
      "become more confident (bargaining)",
      "plan ahead / think ahead",
      "Does not include the printer (a result, not something learned); notes are brief and in own words where possible",
    ],
    modelAnswer: "1 keep accurate records; 2 teamwork; 3 confidence (through bargaining); 4 planning ahead. (Printer = result, not learning.)",
    hints: ["The question asks what they *learned*, not what they *achieved*."],
    explanation: "Four things were learned. The printer is an achievement, so it is outside the focus; the treasurer and the exams are supporting details.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", examStyle: true, secs: 1200,
    stem: `${WATER}\n\nYou are going to summarise **the ways in which families in Bulawayo save water**.`,
    parts: [
      P.mcq({
        label: "(a)",
        stem: "Which paragraph contains **no** point for this summary?",
        options: [
          ["paragraph 1", "Correct: it explains why water is short (background)."],
          ["paragraph 3", "Paragraph 3 contains the sand bottle and flushing less."],
          ["paragraph 5", "Paragraph 5 contains three gardening methods."],
          ["paragraph 6", "Paragraph 6 contains rain harvesting."],
        ],
        answer: "A",
        explanation: "Paragraphs 1 and 7 give background and complaints about the council: no ways families save water.",
      }),
      P.mcq({
        label: "(b)",
        stem: "Which detail from paragraph 4 is the relevant **point**?",
        options: [
          ["Families check taps and pipes and fix worn washers at once.", "Correct: the method of saving water."],
          ["Leaks waste more water than most people realise.", "This introduces the problem; it is not the method."],
          ["A dripping tap can waste a surprising amount in a year.", "This explains why the method matters."],
          ["Taps are checked by the council every month.", "The families check them, not the council."],
        ],
        answer: "A",
        explanation: "The method is *checking taps and pipes and repairing leaks promptly*; the rest explains why it matters.",
      }),
      P.manual({
        label: "(c)",
        marks: 10,
        stem: "List **ten** ways in which families save water. Write each point as a brief note in your own words.",
        points: [
          "pour used kitchen (vegetable / dish) water on the garden",
          "catch cold shower water in a bucket",
          "wash cars with a bucket, not a hosepipe",
          "put a sand-filled bottle in the toilet cistern",
          "flush less often in severe shortages",
          "check taps and pipes regularly and fix leaks / washers at once",
          "water gardens in the early morning or evening",
          "cover the soil (grass cuttings, dry leaves) to keep it moist",
          "grow indigenous plants that need only rain instead of lawns",
          "collect rainwater from roofs in drums or tanks",
        ],
        modelAnswer: "1 kitchen water reused on garden; 2 bucket catches cold shower water; 3 cars washed with bucket, no hose; 4 sand bottle in cistern; 5 fewer flushes in shortages; 6 leaks found and fixed monthly; 7 watering at cool times; 8 soil covered to hold moisture; 9 lawns replaced by indigenous plants; 10 rainwater stored in drums or tanks.",
      }),
    ],
    hints: ["Leave out background (paragraph 1), the grandmother's story and the complaints about the council.", "Some sentences contain two points."],
    explanation: "There are ten points across paragraphs 2-6. Paragraphs 1 and 7 contain none, and the grandmother's story is an example of rain harvesting.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "A candidate's notes for *Summarise the advantages of the new market* include: *1 more stalls; 2 roof keeps rain off; 3 traders stay dry in storms; 4 toilets for traders.* What is the problem?",
    options: [
      ["Points 2 and 3 are the same idea", "Correct: a roof keeping off rain and staying dry in storms make one point."],
      ["Point 1 is a disadvantage of the market", "More stalls is an advantage."],
      ["The notes should be full sentences", "Notes are meant to be brief."],
      ["Toilets cannot be an advantage", "Toilets for traders are a clear advantage."],
    ],
    answer: "A",
    hints: ["Do any two notes say the same thing in different words?"],
    explanation: "Repetition earns one mark, not two. Check that every note is a **distinct** idea.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: ext("*Some people say that keeping chickens in town is a nuisance, but for the Mpofu family in Mkoba it has been a blessing. The eggs give the children protein every morning, and the surplus is sold to neighbours, paying for school stationery. Chicken manure is dug into the vegetable beds, so the family no longer buys fertiliser. Looking after the birds has taught the youngest son, Thabo, responsibility: he has not missed a single morning feed in two years. The noise of the cockerel at dawn, however, has led to arguments with the family next door.*") + "\n\nTask: *Summarise the benefits of keeping chickens for the Mpofu family.* List the points in note form and say which sentence you left out because it is off-focus.",
    marks: 5,
    points: [
      "eggs provide protein for the children",
      "surplus eggs sold to pay for stationery",
      "manure used as fertiliser (saves money)",
      "children learn responsibility",
      "Identifies the cockerel noise / arguments with neighbours as off-focus (a drawback); does not count Thabo's two years as a separate point",
    ],
    modelAnswer: "1 eggs = protein for children; 2 extra eggs sold, pays for stationery; 3 manure fertilises vegetables, no need to buy fertiliser; 4 teaches responsibility. Left out: the cockerel's noise causing arguments (a disadvantage).",
    hints: ["The first sentence and the last sentence both mention problems."],
    explanation: "Four benefits. Thabo's record is an example of responsibility; the noise and arguments are a disadvantage, and the opening complaint is background.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Before underlining points, what should you do with the passage?",
    options: [
      ["Read it all through once for the gist", "Correct: points are often scattered, so read the whole text first."],
      ["Underline every sentence in the first paragraph", "Underlining before understanding leads to errors."],
      ["Count the words in each paragraph", "Counting words is for your own summary, not the passage."],
      ["Copy the sentences that sound most important", "Copying leads to lifting and irrelevant detail."],
    ],
    answer: "A",
    explanation: "Read the whole passage first; then go back and underline only what answers the focus.",
  });

  b.short({
    d: 2, skill: "UNDERSTANDING",
    stem: "*Using paragraphs 2 to 4, summarise the problems faced by the farmers.* Which **one word** in this task tells you the focus of the summary?",
    accepted: ["problems"],
    wrong: ["farmers"],
    explanation: "The focus word is **problems**: only difficulties count. *Farmers* says whose problems, and *paragraphs 2 to 4* sets the limits.",
  });

  b.card("DEFINITION", "Summary focus", "The aspect the question asks about: benefits, problems, reasons, ways, changes.", undefined);
  b.card("CONCEPT", "Dissect the question", "Underline the focus, whose/what, and limits (paragraphs, words, time).", undefined);
  b.card("DEFINITION", "Relevant point", "A distinct idea that directly answers the summary question; usually one mark each.", undefined);
  b.card("FACT", "What to leave out", "Examples, anecdotes, statistics, quotations, repetition, background, off-focus points and opinions.", undefined);
  b.card("CONCEPT", "Split and combine", "One sentence can hold two points; one point can be spread over two sentences.", undefined);
  b.card("CONCEPT", "Turn quotations into points", "Extract the idea from direct speech: 'I can grow tomatoes all year' → gardens watered year-round.", undefined);
  b.card("CONCEPT", "Numbered notes", "Write each point briefly, in your own words, and number them to check your total.", undefined);
  b.card("CONCEPT", "Check for repetition", "Two notes saying the same thing earn only one mark.", undefined);
  b.card("FACT", "Points are scattered", "Read the whole specified section; points often appear late in a paragraph or in an unexpected paragraph.", undefined);
});
