// Slice EWR1: informative and expository writing.
import { concept } from "../lib.mjs";

concept("eng.composition.informative", { file: "composition/informative", keyPrefix: "composition.informative" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the main purpose of **informative (expository)** writing?",
    options: [
      ["To explain a topic or process clearly to the reader", "Correct: expository writing informs and explains."],
      ["To entertain the reader with an exciting plot", "That is the main purpose of narrative writing."],
      ["To persuade the reader to accept the writer's view", "That is argumentative writing."],
      ["To paint a vivid picture of a single scene", "That is descriptive writing."],
    ],
    answer: "A",
    explanation: "Informative writing explains facts, processes, causes and effects clearly, logically and neutrally.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which organising pattern best suits the title *\"The causes and effects of veld fires\"*?",
    options: [
      ["Cause and effect", "Correct: the title asks why veld fires start and what follows from them."],
      ["Spatial description", "This moves through a place and suits descriptive writing."],
      ["Plot with a climax", "This is a narrative structure."],
      ["Dialogue between characters", "Dialogue belongs in stories, not in explanations."],
    ],
    answer: "A",
    explanation: "Match the pattern to the title: **sequence** for processes, **categories** for types, **cause and effect** for why and what follows, **problem and solution** for difficulties and remedies.",
  });
  b.mcq({
    d: 2, skill: "EVALUATION", daily: true,
    stem: "Which sentence has the **neutral tone** suited to an informative composition about wetlands?",
    options: [
      ["Wetlands store rainwater and release it slowly into streams.", "Correct: a calm, factual explanation."],
      ["Only a fool would ever build a house on a precious wetland!", "Insulting, emotive language is out of place in informative writing."],
      ["I absolutely love wetlands more than any other place on earth.", "This expresses personal feeling instead of explaining."],
      ["Wetlands are just useless muddy places full of frogs and reeds.", "This is a dismissive opinion, not information."],
    ],
    answer: "A",
    explanation: "Informative writing uses a **neutral, objective** tone. Facts and explanations, not insults or strong personal feelings.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "These paragraph topics come from a plan for *\"How to prepare for examinations\"*. Which order is **most logical**?\n\n*(1) Revising actively with past questions and flashcards (2) Making a revision timetable early in the term (3) Looking after sleep and food in the final week (4) Collecting notes and finding the gaps in them*",
    options: [
      ["2, 4, 1, 3", "Correct: plan the time, gather and check notes, revise actively, then manage the final week."],
      ["1, 2, 3, 4", "Active revision cannot come before the timetable and notes are ready."],
      ["3, 1, 4, 2", "The final week cannot come first in a process that runs through the term."],
      ["4, 3, 2, 1", "The timetable should come before the other stages, not after sleep and food."],
    ],
    answer: "A",
    hints: ["This is a sequence: what comes earliest in the term?", "What must be ready before active revision can start?"],
    explanation: "A **process** composition follows time order. Planning (timetable) → preparing material (notes) → doing the work (active revision) → final preparation (rest and food).",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Which sentence is **most suitable** as evidence in an examination composition about the dangers of drug abuse?",
    options: [
      ["Drugs can damage the brain and lead young people to drop out of school.", "Correct: a general, accurate statement the writer can honestly make."],
      ["A 2019 study found that exactly 46.7 per cent of all learners use drugs.", "An invented, precise statistic is unconvincing and dishonest."],
      ["Every single person who tries a drug once becomes addicted forever.", "This is an exaggeration that is not true and weakens credibility."],
      ["My uncle's neighbour's friend says drugs are not too bad really.", "Hearsay is weak, and the claim is irresponsible."],
    ],
    answer: "A",
    hints: ["Which statement could you honestly know to be true without looking it up?"],
    explanation: "In an exam, write what you know: accurate general statements, clear explanations and realistic examples. Never invent statistics, dates or studies.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is the best way to **define a term** inside an informative composition?",
    options: [
      ["Mulching, covering the soil with dry grass, keeps it moist.", "Correct: a brief definition in your own words, built into the sentence."],
      ["Mulching is a word that is used by many people.", "This says nothing about what mulching means."],
      ["Look up mulching in a dictionary if you do not know the word.", "The writer, not the reader, should define the term."],
      ["Mulching is mulching, as every farmer will tell you.", "This repeats the word instead of defining it."],
    ],
    answer: "A",
    explanation: "Define key terms briefly the first time you use them, in your own words, often within the sentence.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each title to the organising pattern that suits it best.",
    pairs: [
      ["How to start a small poultry project", "sequence (process)"],
      ["The main kinds of pollution in towns", "categories"],
      ["Why young people leave rural areas, and what follows", "cause and effect"],
      ["Reducing litter at our school", "problem and solution"],
    ],
    explanation: "Choosing the pattern first gives every paragraph a clear job: one step, one category, one cause or effect, or one solution.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Choose the best signpost for each gap in this paragraph about a borehole committee.",
    template: "{{blank:a}}, the committee collects a small monthly fee from each household. {{blank:b}}, this money pays for spare parts when the pump breaks. {{blank:c}}, the borehole keeps working instead of standing idle for months.",
    blanks: [
      { id: "a", accepted: ["Firstly"], choices: ["Firstly", "In contrast", "However", "Finally"] },
      { id: "b", accepted: ["Secondly"], choices: ["Nevertheless", "Secondly", "On the other hand", "In conclusion"] },
      { id: "c", accepted: ["As a result"], choices: ["For instance", "In contrast", "As a result", "Despite this"] },
    ],
    hints: ["The first two sentences are steps in a process.", "The last sentence states a consequence."],
    explanation: "**Firstly** and **Secondly** mark stages; **As a result** introduces the consequence. Contrast signposts (*However*, *In contrast*) would mislead the reader because nothing is being contrasted.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "True or false? In an informative composition, it is acceptable to include a short real-life example, as long as the piece remains an explanation rather than a story.",
    answer: true,
    feedbackTrue: "Right: a brief example helps explanation; a full plot would change the type of writing.",
    explanation: "Examples make explanations concrete. Keep them brief and relevant, so that the composition does not turn into a narrative.",
  });
  b.ext({
    d: 2, skill: "CREATION", marks: 10, secs: 900,
    stem: "Write one **informative paragraph** (80-110 words) explaining **one** way households can save electricity. Include a topic sentence, an explanation and an example, in a neutral tone.",
    wordLimit: { min: 80, max: 110 },
    points: [
      ["A clear topic sentence naming one method", 2],
      ["An explanation of how or why it saves electricity", 3],
      ["A realistic everyday example", 2],
      ["Neutral tone; no invented statistics; accurate language", 3],
    ],
    modelAnswer: "One of the simplest ways to save electricity is to switch off appliances at the wall rather than leaving them on standby. Many televisions, decoders and chargers continue to draw a small current even when they appear to be off, and over a month these small amounts add up. A family can reduce this waste by plugging the television and decoder into one adaptor and switching it off before going to bed. The habit costs nothing, takes only a few seconds and, over time, lowers the household's electricity bill.",
    explanation: "The model states one method, explains why it works, gives a practical example and keeps a neutral tone without made-up figures.",
  });
  b.ext({
    d: 3, skill: "CREATION", marks: 12, secs: 1200,
    stem: "Write a **plan** with an **introduction** (plan: 5 paragraph headings with details; introduction: 60-90 words) for an informative composition titled *\"The importance of preserving our heritage sites\"*.",
    wordLimit: { max: 220 },
    points: [
      ["The plan has five logical paragraphs suited to an informative title (for example categories of importance)", 4],
      ["Each heading has specific supporting details", 3],
      ["The introduction explains what heritage sites are and previews the main points", 3],
      ["Neutral tone and accurate language", 2],
    ],
    hints: ["Think of different kinds of importance: history, identity, education, income.", "Define heritage sites briefly in the introduction."],
    modelAnswer: "**Plan:** (1) Introduction: what heritage sites are; examples such as Great Zimbabwe, the Khami ruins and rock-art shelters in the Matobo hills. (2) History: they record how earlier communities built, traded and lived. (3) Identity: they connect people to their ancestors and give national pride. (4) Education: learners and researchers study them first-hand. (5) Income: tourism creates jobs for guides, craftspeople and lodges. Conclusion: how communities and visitors can protect them (no graffiti, no removal of stones, support for local museums).\n\n**Introduction:** Heritage sites are places that hold the story of a people: buildings, ruins, rock paintings and sacred landscapes left by earlier generations. Zimbabwe is rich in such places, from the stone walls of Great Zimbabwe to the painted shelters of the Matobo hills. Preserving them matters for several reasons: they record our history, strengthen our identity, support education and bring income to local communities.",
    explanation: "A categories pattern (history, identity, education, income) gives each paragraph a clear job, and the introduction defines the term and previews the points.",
  });
  b.essay({
    d: 4, skill: "CREATION", marks: 25, secs: 2700,
    stem: "Write an informative composition (300-350 words) titled **\"How young people can manage their money wisely\"**.",
    wordLimit: { min: 300, max: 350 },
    points: [
      ["Relevance: practical, accurate information on managing money", 4],
      ["A clear organising pattern with one idea per paragraph", 4],
      ["Each idea explained with realistic examples; terms such as budget or interest briefly defined", 6],
      ["Neutral, helpful tone; no invented statistics", 3],
      ["A conclusion that summarises the key points", 2],
      ["Accurate, varied language", 6],
    ],
    hints: ["Think about earning, budgeting, saving, spending and borrowing.", "Define budget and interest briefly."],
    modelAnswer: "**Model answer:**\n\nMany young people in Zimbabwe handle money long before they finish school, whether it is pocket money, earnings from holiday jobs or profit from selling airtime and snacks. Managing it wisely is a skill that can protect them from debt and help them reach their goals.\n\nThe first step is to make a budget, a simple plan that shows how much money comes in and how it will be spent. Writing down income and expenses for one month often reveals surprising leaks, such as small daily purchases of sweets or data bundles that add up to a large sum.\n\nThe second step is to save regularly. A good habit is to put aside a fixed part of every amount received before spending anything, rather than saving whatever is left at the end, which is usually nothing. Savings can be kept in a bank or mobile savings account, or in a savings club run by people the saver knows and trusts.\n\nThird, young people should learn to tell needs from wants. A need, such as school transport, must be paid for; a want, such as a new pair of fashionable shoes, can wait until enough has been saved. Waiting a week before buying something expensive often shows whether it is truly wanted.\n\nFinally, borrowing should be approached with great care. Interest is the extra money a borrower pays for using someone else's money, and loans taken quickly through a phone can become expensive if they are not repaid on time. Before borrowing, a young person should know exactly how much must be paid back, and when.\n\nIn summary, a budget, regular saving, a clear sense of needs and wants, and careful borrowing give young people control over their money. These habits, learnt early, last a lifetime and make every future goal, from college fees to a first home, easier to reach.",
    explanation: "The model follows a clear sequence of habits, defines *budget*, *need/want* and *interest*, uses realistic examples and keeps a neutral, helpful tone without invented figures.",
  });

  b.card("DEFINITION", "Expository (informative) writing", "Writing that explains a topic or process clearly, logically and neutrally.");
  b.card("DEFINITION", "Neutral tone", "A calm, objective voice without strong personal opinion or emotive language.");
  b.card("DEFINITION", "Signposting", "Words that guide the reader through the structure: firstly, next, another cause, as a result, in summary.");
  b.card("CONCEPT", "Four organising patterns for informative writing", "Sequence (process); categories; cause and effect; problem and solution.");
  b.card("CONCEPT", "Evidence in an exam explanation", "Write what you know: accurate general statements, explanations, everyday examples; never invent statistics.");
  b.card("CONCEPT", "Defining terms", "Define a key term briefly, in your own words, the first time you use it.", "Mulching, covering the soil with dry grass, keeps it moist.");
  b.card("CONCEPT", "Turning a title into a question", "\"The importance of wetlands\" → Why are wetlands important? Every paragraph should answer it.");
  b.card("CONCEPT", "Informative vs narrative", "A brief example helps an explanation; a full plot turns it into a story and loses relevance.");
  b.card("CONCEPT", "Conclusion of an informative composition", "Summarise the key points and stress the importance or benefit; no new information.");
});
