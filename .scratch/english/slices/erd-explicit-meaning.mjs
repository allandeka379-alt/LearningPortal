// Slice ERD: reading skills — explicit meaning (skimming, scanning, recall).
import { concept, P } from "../lib.mjs";

const LIBRARY = `Read the news report and answer the question.

> Pupils at Mukwati Secondary School near Chinhoyi will no longer have to share one dictionary between five. On Saturday the school opened a new library, built over eight months by parents who gave up their weekends to mould bricks and lay the roof. The library holds just over 1,200 books, most of them donated by a former pupil, Mrs Tendai Gumbo, who now teaches in Bulawayo. The head, Mr Peter Moyo, said the room would open from 7 a.m. until 5 p.m. on weekdays and that Form 4 pupils would be allowed to borrow two books at a time. A computer corner will be added next year.`;

const BUS = `Read the extract and answer the question.

> Tariro had never travelled alone before. Her aunt put her on the 6.30 bus at Mbare with a cooler box of sadza and chicken, a blanket and strict instructions to sit near the driver. The bus was crowded with traders carrying bundles of blankets and crates of tomatoes. Near Kwekwe a tyre burst with a crack like a gunshot, and the passengers waited for almost two hours under a msasa tree while the driver and the conductor changed it. A woman selling boiled eggs shared her shade and her stories. By the time the bus crawled into Bulawayo the streetlights were on, and Tariro's cousin Simba was waving from the pavement, holding a torch.`;

const NOTICE = `Read the notice and answer the question.

> **KUWADZANA CLEAN-UP DAY**
>
> Join your neighbours on Saturday 14 March from 8 a.m. to 12 noon. Meet at the shopping centre car park next to the clinic. Gloves, rakes and refuse bags will be provided by the residents' association, but please bring your own drinking water and a hat. Children under 12 must come with an adult. Refreshments will be served at the end, and the street with the most volunteers will win a new refuse bin. For more information, call the association secretary, Mr Kudakwashe Mlambo, on any weekday evening.`;

const MARKET = `Read the blog post and answer the questions.

**Saturdays at Sakubva**

**[1]** Every Saturday, before the sun has cleared the hills around Mutare, my grandmother, Mbuya Chari, and I load her wheelbarrow with bananas, avocados and bundles of covo. We leave home at half past four, because the best places at Sakubva Market go to whoever arrives first. The walk takes forty minutes, and in winter the cold bites through my jersey until we reach the warm smell of the roasting-maize sellers at the gate.

**[2]** Mbuya has sold at the same corner for twenty-two years. Her stall is nothing more than a sheet of plastic on two crates, but her customers know where to find her. Many of them are cross-border traders who buy in bulk and resell in Mozambique. They argue over prices with a smile, and Mbuya always adds one extra banana "for the road", which she says is the secret of her business.

**[3]** My job is to keep the money tin and to write every sale in an exercise book. At first I found it boring, but last term I used the figures for a Commerce project. I discovered that avocados earned Mbuya almost twice as much as bananas, even though she carried fewer of them. She was surprised, and now she brings more avocados when they are in season.

**[4]** By eleven o'clock the heat rises and the crowds thin out. Mbuya counts the money twice, folds the plastic sheet and buys bread and sugar for the week. On the way home she tells me stories about the market in the old days, when traders came with ox-carts and the whole place was lit by paraffin lamps on Friday nights.

**[5]** I do not know whether I will sell at Sakubva when I am older. I want to study accounting at university. But I think the market has already taught me the first lesson of accounting: write everything down, and the numbers will tell you the truth.`;

concept("eng.reading.explicit-meaning", { file: "reading/explicit-meaning", keyPrefix: "reading.explicit-meaning" }, (b) => {
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "What is **scanning**?",
    options: [
      ["Looking quickly through a text for one particular word, name or number", "Correct: scanning hunts for a specific item without reading every word."],
      ["Reading a whole text quickly to find out its general topic", "That is skimming: reading for the gist."],
      ["Reading every sentence slowly and making notes on each one", "That is close or intensive reading, not scanning."],
      ["Working out an idea that the writer only suggests but never states directly", "That is inference, which finds implicit meaning."],
    ],
    answer: "A",
    explanation: "**Scanning** = searching for a specific detail (a name, date, number or key word). **Skimming** = reading quickly for the gist. Use skimming first, then scanning for each question.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which question asks for **explicit** (directly stated) information?",
    options: [
      ["At what time did the bus leave Mbare?", "Correct: a time is a fact the passage would state directly."],
      ["Why do you think Tariro felt nervous?", "This asks you to infer a feeling from clues."],
      ["What does the writer's tone suggest?", "Tone is worked out from word choice: an inference skill."],
      ["Is the aunt a caring person? Explain.", "This asks for a judgement supported by evidence."],
    ],
    answer: "A",
    explanation: "Explicit questions ask *who, what, where, when, how many*: the answer is printed in the passage. Questions with *suggest*, *why do you think* or *explain* usually need inference.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: `${LIBRARY}\n\nHow long did it take the parents to build the library?`,
    accepted: ["eight months", "8 months", "over eight months", "over 8 months", "eight", "8"],
    model: "eight months",
    wrong: ["eight weeks", "a year"],
    explanation: "The report says the library was *built over eight months*. Scan for words linked to time and building.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: `${LIBRARY}\n\nWho donated most of the books?`,
    options: [
      ["Mrs Tendai Gumbo", "Correct: most of the books were donated by this former pupil."],
      ["Mr Peter Moyo", "Mr Moyo is the head who announced the opening hours."],
      ["The parents", "The parents built the library; the report does not say they gave books."],
      ["Teachers in Bulawayo", "Mrs Gumbo teaches in Bulawayo, but no Bulawayo teachers donated books."],
    ],
    answer: "A",
    explanation: "Scan for *donated*: *most of them donated by a former pupil, Mrs Tendai Gumbo*.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: `${LIBRARY}\n\nAt what time does the library close on weekdays?`,
    accepted: ["5 p.m.", "5 pm", "5pm", "5", "five", "five pm", "five p.m.", "five o'clock", "5 o'clock", "17:00", "17h00", "1700", "at 5 pm", "at 5 p.m.", "at five"],
    model: "5 p.m.",
    wrong: ["7 a.m.", "12 noon"],
    explanation: "The library opens *from 7 a.m. until 5 p.m.*, so it closes at **5 p.m.** Read carefully: 7 a.m. is the opening time.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: `${LIBRARY}\n\nTrue or false: the library already has a computer corner.`,
    answer: false,
    explanation: "False. *A computer corner **will be added next year*** — it does not exist yet. Watch the tense of the verb when you retrieve details.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: `${BUS}\n\nHow long did the passengers wait while the tyre was changed?`,
    options: [
      ["Almost two hours", "Correct: the text says almost two hours."],
      ["Exactly two hours", "The word almost means a little less than two hours, not exactly two."],
      ["About half an hour", "This is much shorter than the time stated."],
      ["Over three hours", "This is longer than the time stated."],
    ],
    answer: "A",
    explanation: "Copy quantities precisely, including words such as *almost*, *about* and *over*, which change the meaning.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: `${BUS}\n\nNear which town did the tyre burst?`,
    accepted: ["Kwekwe", "near Kwekwe"],
    wrong: ["Bulawayo", "Mbare"],
    explanation: "Scan for capital letters: *Near Kwekwe a tyre burst*. Mbare is where the journey started and Bulawayo where it ended.",
  });
  b.mcq({
    d: 2, skill: "RECALL", multiple: true,
    stem: `${BUS}\n\nWhich **two** things did Tariro's aunt give her for the journey? Select two.`,
    options: [
      ["A cooler box of food", "Correct: a cooler box of sadza and chicken."],
      ["A blanket", "Correct: the blanket is listed with the cooler box."],
      ["A torch", "Simba was holding the torch in Bulawayo."],
      ["Boiled eggs", "A woman on the journey was selling boiled eggs."],
      ["A crate of tomatoes", "The traders on the bus carried crates of tomatoes."],
    ],
    answer: ["A", "B"],
    explanation: "The aunt gave her *a cooler box of sadza and chicken, a blanket and strict instructions*. The torch and the eggs belong to other people in the extract.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: `${BUS}\n\nTrue or false: the bus reached Bulawayo before dark.`,
    answer: false,
    explanation: "False. *The streetlights were on* when the bus arrived, so it was already dark. Sometimes an explicit detail (streetlights on) answers a question worded differently.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: `${NOTICE}\n\nMatch each question with the detail the notice gives.`,
    pairs: [["Where do volunteers meet?", "the shopping centre car park"], ["When does the clean-up end?", "12 noon"], ["What can a street win?", "a new refuse bin"], ["Whom should you call?", "Mr Kudakwashe Mlambo"]],
    explanation: "Scan the notice for each detail: the meeting place (*car park next to the clinic*), the end time (*to 12 noon*), the prize (*a new refuse bin*) and the contact (*the association secretary, Mr Kudakwashe Mlambo*).",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: `${NOTICE}\n\nWhich item must volunteers bring for themselves?`,
    options: [
      ["Drinking water", "Correct: please bring your own drinking water and a hat."],
      ["Gloves", "Gloves are provided by the residents' association."],
      ["Refuse bags", "Refuse bags are provided by the association."],
      ["Rakes", "Rakes are provided by the association."],
    ],
    answer: "A",
    explanation: "The notice contrasts what is **provided** (gloves, rakes, refuse bags) with what to **bring** (drinking water and a hat). The word *but* signals the change.",
  });
  b.fib({
    d: 1, skill: "RECALL",
    stem: `${NOTICE}\n\nComplete the sentence with the detail from the notice.`,
    template: "Children under {{blank:a}} must come with an adult.",
    blanks: [{ id: "a", accepted: ["12"], choices: ["10", "12", "14", "16"] }],
    explanation: "The notice says *Children under 12 must come with an adult*.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: `${BUS}\n\nA question asks: *Where did the passengers wait?* Which is the **best** answer?`,
    options: [
      ["Under a msasa tree", "Correct: short, exact and taken from the text."],
      ["Near Kwekwe a tyre burst with a crack like a gunshot", "This copies the wrong sentence: it says where the tyre burst, not where people waited."],
      ["Inside the crowded bus with the traders", "The text says they waited under a tree, not inside the bus."],
      ["In Bulawayo, with her cousin Simba", "This is where the journey ended, not where they waited."],
    ],
    answer: "A",
    hints: ["Find the sentence that describes the waiting.", "Copy only the words that answer *where*."],
    explanation: "A recall answer should be **short and exact**: *under a msasa tree*. Copying a nearby sentence or adding detail from another part of the extract loses the mark.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A question says: *From paragraph 2, give **two** reasons why the meeting was cancelled.* A candidate writes four reasons, two from paragraph 2 and two from paragraph 4. What is the most likely result?",
    options: [
      ["Marks may be lost: extra or out-of-paragraph answers are not credited", "Correct: examiners mark the number asked for, from the place named."],
      ["Full marks plus a bonus for giving extra reasons", "There are no bonus marks for extra reasons."],
      ["Full marks, because the four answers include the two correct ones", "Examiners usually mark only the first answers given, and wrong extras can cancel right ones."],
      ["No marks at all, because the answer is too long to read", "Length alone does not remove marks; the problem is irrelevant extra answers."],
    ],
    answer: "A",
    hints: ["Look at the limiting words: which paragraph, and how many reasons?"],
    explanation: "Obey the **limiting words**: the paragraph named and the number of points. Choose the best two from paragraph 2 and stop.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION",
    stem: `${LIBRARY}\n\nA candidate answered the question *How many books does the library hold?* like this:\n\n*The library holds just over 1,200 books, most of them donated by a former pupil, Mrs Tendai Gumbo, who now teaches in Bulawayo.*\n\nRewrite the answer so that it is short and precise.`,
    marks: 2,
    points: [
      "Gives the number with its qualifier: just over 1,200 (books)",
      "Leaves out the irrelevant detail about the donor and Bulawayo",
    ],
    modelAnswer: "Just over 1,200 books.",
    hints: ["Which words actually answer *how many*?"],
    explanation: "A precise answer gives only what the question asks: **just over 1,200 books**. Keep *just over* — it is part of the fact. Everything about the donor is excess lifting.",
  });
  b.struct({
    d: 3, skill: "UNDERSTANDING", examStyle: true, secs: 900,
    stem: MARKET,
    parts: [
      P.short({
        label: "(a)",
        stem: "From paragraph 1, at what time do the writer and Mbuya leave home?",
        accepted: ["half past four", "half past four in the morning", "4.30", "4:30", "4.30 am", "4:30 am", "4.30 a.m.", "4:30 a.m.", "at half past four", "at 4.30", "04:30", "0430"],
        model: "half past four",
        wrong: ["forty minutes"],
        explanation: "*We leave home at half past four.* The forty minutes is how long the walk takes.",
      }),
      P.short({
        label: "(b)",
        stem: "From paragraph 2, for how long has Mbuya sold at the same corner?",
        accepted: ["twenty-two years", "twenty two years", "22 years", "22", "twenty-two", "twenty two", "for twenty-two years", "for 22 years"],
        model: "twenty-two years",
        wrong: ["two years"],
        explanation: "*Mbuya has sold at the same corner for twenty-two years.*",
      }),
      P.mcq({
        label: "(c)",
        stem: "From paragraph 2, who are many of Mbuya's customers?",
        options: [
          ["Traders who resell her produce in Mozambique", "Correct: cross-border traders who buy in bulk."],
          ["Tourists visiting the hills around Mutare", "Tourists are not mentioned."],
          ["The roasting-maize sellers at the market gate", "They are other sellers mentioned in paragraph 1."],
          ["Pupils from the writer's Commerce class", "The Commerce class is mentioned only in paragraph 3."],
        ],
        answer: "A",
        explanation: "*Many of them are cross-border traders who buy in bulk and resell in Mozambique.*",
      }),
      P.mcq({
        label: "(d)",
        stem: "From paragraph 3, what is the writer's job at the stall?",
        options: [
          ["Keeping the money tin and recording each sale", "Correct: keep the money tin and write every sale in an exercise book."],
          ["Arguing with customers over the prices", "The customers argue over prices; it is not the writer's job."],
          ["Pushing the wheelbarrow to and from home", "Both of them load the wheelbarrow; it is not given as the writer's job."],
          ["Adding an extra banana for each customer", "That is Mbuya's habit, described in paragraph 2."],
        ],
        answer: "A",
        explanation: "*My job is to keep the money tin and to write every sale in an exercise book.*",
      }),
      P.manual({
        label: "(e)",
        marks: 2,
        stem: "From paragraph 3, what did the writer discover from the figures, and what has Mbuya changed as a result?",
        points: [
          "Discovery: avocados earned almost twice as much as bananas (even though she carried fewer)",
          "Change: Mbuya now brings more avocados (when they are in season)",
        ],
        modelAnswer: "Avocados earned almost twice as much as bananas, so Mbuya now brings more avocados in season.",
      }),
      P.manual({
        label: "(f)",
        marks: 2,
        stem: "From paragraph 4, name **two** things Mbuya does when the crowds thin out.",
        points: [
          "Any one of: counts the money twice / folds the plastic sheet / buys bread and sugar for the week",
          "A second, different detail from the same list",
        ],
        modelAnswer: "She counts the money twice and folds the plastic sheet.",
      }),
      P.short({
        label: "(g)",
        stem: "From paragraph 4, what lit the market on Friday nights in the old days?",
        accepted: ["paraffin lamps", "paraffin lamp", "by paraffin lamps", "lamps"],
        model: "paraffin lamps",
        wrong: ["ox-carts"],
        explanation: "*The whole place was lit by paraffin lamps on Friday nights.*",
      }),
      P.short({
        label: "(h)",
        stem: "From paragraph 5, what does the writer want to study at university?",
        accepted: ["accounting", "accountancy", "accounts"],
        wrong: ["commerce"],
        explanation: "*I want to study accounting at university.* Commerce was the school subject of the project.",
      }),
    ],
    hints: ["Each question names a paragraph: answer from that paragraph only.", "Keep recall answers short and exact."],
    explanation: "Every answer here is stated in the blog. Find the named paragraph, scan for the key word in the question (leave, corner, customers, job, discovered, thin out, lit, study) and copy only the words that answer it.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", examStyle: true,
    stem: `${MARKET}\n\nAccording to paragraph 1, why do the writer and Mbuya leave home so early?`,
    options: [
      ["The best places at the market go to those who arrive first", "Correct: this is the reason stated after because."],
      ["The walk to the market usually takes them more than two hours", "The walk takes forty minutes."],
      ["Mbuya wants to avoid the heat of the late morning sun", "The heat is mentioned in paragraph 4, not as a reason for leaving early."],
      ["They need to buy roasted maize before it is sold out", "The roasting-maize sellers are only mentioned as a warm smell."],
    ],
    answer: "A",
    hints: ["Look for the word *because* in paragraph 1."],
    explanation: "Reasons are often signalled by *because*, *so*, *since* or *as*. Here: *because the best places at Sakubva Market go to whoever arrives first*.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `${MARKET}\n\nWhich statement is **directly stated** in the blog, rather than suggested?`,
    options: [
      ["Mbuya counts her money twice before leaving the market.", "Correct: paragraph 4 states this in so many words."],
      ["Mbuya's regular customers are fond of her friendly manner.", "This is suggested by the smiles and extra banana, but not stated."],
      ["The writer is proud of the Commerce project.", "Pride may be implied, but the blog never says it."],
      ["Mbuya earns more money now than she did before.", "This is likely but not stated; the blog says only that she brings more avocados."],
    ],
    answer: "A",
    hints: ["Can you point to the exact words in the text for the answer?"],
    explanation: "Explicit information can be pointed to in the words of the text. The other options may be reasonable **inferences**, but the blog does not state them.",
  });

  b.card("DEFINITION", "What is **explicit** information?", "Information the text states directly in its words: you can point to it.", "Who, what, where, when, how many questions usually ask for explicit information.");
  b.card("DEFINITION", "What is **skimming**?", "Reading a whole text quickly to get the gist: the topic and the main idea of each paragraph.", "Skim once before you look at the questions.");
  b.card("DEFINITION", "What is **scanning**?", "Searching a text quickly for one particular item, such as a name, number, date or key word.", "Numbers and capital letters are easy to scan for.");
  b.card("CONCEPT", "Key words and limiting words in a question", "Key words say what is wanted (reason, place, time); limiting words say where (paragraph 2) and how much (two points).", "Underline both before you answer.");
  b.card("CONCEPT", "How long should a recall answer be?", "Short and exact: often a phrase. One mark usually means one detail.", "A padded answer can hide the correct detail.");
  b.card("CONCEPT", "What is excessive lifting?", "Copying a whole sentence or more from the passage when only part of it answers the question.", "Copy only the words that answer the question.");
  b.card("FACT", "Questions follow the order of the passage", "Comprehension questions usually work through the passage from beginning to end.", "Use this to narrow down where to look.");
  b.card("CONCEPT", "Precision with numbers and qualifiers", "Keep words such as almost, about, over and just under: they are part of the fact.", "Almost two hours is not two hours.");
  b.card("CONCEPT", "Answer from the text, not general knowledge", "The answer must come from the passage, even if you know something different from real life.", undefined);
});
