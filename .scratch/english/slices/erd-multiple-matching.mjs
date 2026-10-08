// Slice ERD: reading skills — multiple matching (Cambridge 0510 only, so tagged ESL). Practice sets use 5-8 statements.
import { concept, ESL } from "../lib.mjs";

const HOBBIES = `Four young people talk about a hobby they have taken up. For each statement, choose the correct person.

**Person 1 — Chido.** I took up chess last year after my grandfather taught me during the school holidays. At first I lost every game, and I almost gave up. Now I play in the school team, and last month we reached the provincial semi-final. The best thing is that it has improved my concentration in class.

**Person 2 — Tatenda.** Photography started for me when I won a small camera in a radio competition. I mostly take pictures of birds near the dam. It is an expensive hobby, because good lenses cost a lot, so I am saving money from selling vegetables. One day I'd like to sell my photographs to magazines.

**Person 3 — Rumbi.** I joined a choir because my best friend was a member and I didn't want to be left out. I'm not a strong singer, to be honest, and I still get nervous before concerts. But the people are so friendly that I look forward to every practice.

**Person 4 — Nkosi.** I build model cars from wire and bottle tops. Nobody taught me; I just watched older boys at the market and copied them. I sell some to tourists at the craft market, and the money helps to pay my school fees. It costs almost nothing, because the materials are things other people throw away.`;

const TRIPS = `Four pupils wrote short reviews of class weekend trips for the school magazine. For each statement, choose the correct text.

**Text A.** Our class spent a weekend in Nyanga. The cold surprised us: we had packed for summer and spent the first night shivering. The waterfalls were spectacular, though, and the climb up the mountain was the highlight. I would go again, but next time with a warm jacket.

**Text B.** Kariba was hot, as everyone had warned us. We took a boat trip at sunset and saw elephants swimming between islands, which I will never forget. Sadly, the food at the lodge was disappointing: the same rice and stew every night.

**Text C.** In Hwange National Park we went on a game drive at dawn. Our guide knew so much about animal tracks that I have decided to become a wildlife guide myself. We didn't see any lions, which upset the others, but I didn't mind.

**Text D.** We stayed in a guest house in the Bvumba mountains. It rained the whole weekend, so we spent most of the time indoors playing cards. Even so, the owner's homemade scones and jam made up for it, and the mist over the forest was beautiful.`;

const JOBS = `Four teenagers describe their part-time work. For each statement, choose the correct person.

**Person 1 — Farai.** On Saturdays I help my aunt at her hair salon in Chitungwiza. I sweep, wash towels and sometimes plait simple styles. She pays me a little, but what I really value is learning how to run a business.

**Person 2 — Sekai.** I give extra maths lessons to two primary pupils in my street. Their parents pay me in maize meal rather than cash, which my mother appreciates. Explaining fractions to ten-year-olds has made me understand them better myself.

**Person 3 — Joseph.** I work at a car wash near the bus terminus during the holidays. The work is tiring and the manager is strict about time, but the tips from drivers are good. I am saving for a bicycle.

**Person 4 — Melody.** I sell freezits from our fridge to children walking home from school. It was my own idea, and I keep a careful record of what I spend and earn. My only worry is load-shedding: when the power goes off, the freezits melt.`;

const CLUBS = `Four school clubs have put notices on the board. For each statement, choose the correct text.

**Text A — Debate Club.** We meet on Tuesdays. Members research a topic each week and argue for or against it. No experience is needed; shy speakers are especially welcome, since the club's purpose is to build confidence. Our team competes against other schools every term.

**Text B — Environment Club.** We plant trees around the school, run the recycling bins and visit the wetland once a month to count birds. Members must bring their own gloves. At the moment we are looking for someone who can take photographs for our noticeboard.

**Text C — Drama Club.** Rehearsals are on Wednesday and Friday afternoons. This term we are writing our own play about a family in a rural village. You don't have to act: we also need people to make costumes and paint scenery.

**Text D — Chess Club.** Members play on Thursdays at lunchtime in Room 12. Boards are provided by the school. Beginners are coached by senior members, and players who reach a high enough standard may be chosen for national tournaments.`;

const MOVING = `Four young people describe moving from the countryside to a city. For each statement, choose the correct person.

**Person 1 — Tinashe.** When my family moved from Gokwe to Harare, I expected to love the city straight away. In fact, for the first three months I hated it. The noise of the kombis kept me awake, and nobody greeted anyone in the street. What changed things was joining a football team: suddenly I had twenty friends. Now when I visit Gokwe, I find it far too quiet.

**Person 2 — Ropafadzo.** I came to Bulawayo to board at a school with a proper science laboratory, while my parents stayed behind in Tsholotsho. I miss my mother's cooking more than anything; nothing in the city tastes the same. Still, I know I made the right choice: I have just been chosen to represent the province at the national science fair.

**Person 3 — Kelvin.** Moving to Mutare was my father's decision, because of his new job, and I was angry with him for weeks. I had to leave my best friend behind. What I didn't expect was how much I would enjoy the mountains around the city. Every weekend I go hiking with my younger sister, and we have climbed every peak we can see from our house.

**Person 4 — Nyasha.** Honestly, I adapted to Gweru very quickly. My older cousins already lived there and showed me everything: which kombi to take, where to buy cheap stationery, which shops to avoid. The only thing I struggle with is the cost of living. In the village we grew our own food, but here we pay for every tomato.`;

const PEOPLE = (names) => names.map((n, i) => `Person ${i + 1} (${n})`);
const TEXTS = ["Text A", "Text B", "Text C", "Text D"];

concept("eng.reading.multiple-matching", { file: "reading/multiple-matching", keyPrefix: "reading.multiple-matching", applies: ESL }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In a multiple-matching task, which statement is true?",
    options: [
      ["One text can be the answer to more than one statement", "Correct: texts are not used an equal number of times."],
      ["Each text must be used exactly once in the task", "A text may be used several times, or rarely."],
      ["The statements use the same words as the texts", "Statements usually paraphrase the texts."],
      ["You should match statements in the order of the texts", "Statements are not in the order of the texts."],
    ],
    answer: "A",
    explanation: "Each statement has one correct text, but a text can match several statements. Statements paraphrase ideas, so match meaning, not words.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is a **distractor** in a matching task?",
    options: [
      ["A detail in the wrong text that seems to match", "Correct: it shares a word or topic but not the exact idea."],
      ["A statement that matches none of the texts", "In these tasks every statement has a correct text."],
      ["A difficult word that is explained in a glossary", "That is a glossary entry, not a distractor."],
      ["The title printed above each of the texts", "Titles help you; they are not distractors."],
    ],
    answer: "A",
    explanation: "Distractors are planted details: the same topic or a shared word in a text that does **not** express the statement's idea.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING", secs: 420,
    stem: HOBBIES,
    pairs: [
      "learned the hobby without anyone teaching them",
      "hopes to earn money from the hobby in the future",
      "nearly gave up at the beginning",
      "started the hobby so as not to be left out by a friend",
      "says the hobby costs very little",
      "says the hobby has helped with schoolwork",
      "still feels anxious when performing",
    ],
    right: PEOPLE(["Chido", "Tatenda", "Rumbi", "Nkosi"]),
    rightIndex: [3, 1, 0, 2, 3, 0, 2],
    shuffle: false,
    hints: ["Nkosi already earns money; who only *hopes* to?", "Which person's hobby improves concentration in class?"],
    explanation: "Nkosi: *Nobody taught me*; *costs almost nothing*. Tatenda: *One day I'd like to sell my photographs* (future earnings; Nkosi earns now, a distractor). Chido: *I almost gave up*; *improved my concentration in class*. Rumbi: joined *because my best friend was a member*; *still get nervous before concerts*.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING", examStyle: true, secs: 420,
    stem: TRIPS,
    pairs: [
      "was not prepared for the weather",
      "was unhappy with the meals",
      "found inspiration for a future career",
      "had plans spoiled by rain but enjoyed the food",
      "was not upset by something that disappointed others",
      "says the best part involved physical effort",
      "remembers a sight of animals in the evening",
    ],
    right: TEXTS,
    rightIndex: [0, 1, 2, 3, 2, 0, 1],
    shuffle: false,
    hints: ["Two texts mention food: one positively, one negatively.", "Kariba was hot *as everyone had warned* — so that writer was prepared."],
    explanation: "A: packed for summer and shivered (unprepared); the climb was the highlight (effort). B: food *disappointing*; elephants *at sunset*. C: decided to become a wildlife guide; did not mind missing lions. D: rain all weekend but the scones *made up for it*.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING", secs: 360,
    stem: JOBS,
    pairs: [
      "is not paid in money",
      "is saving up for something in particular",
      "started the work on their own initiative",
      "values what they are learning more than the pay",
      "now understands a school subject better",
      "mentions a problem caused by power cuts",
    ],
    right: PEOPLE(["Farai", "Sekai", "Joseph", "Melody"]),
    rightIndex: [1, 2, 3, 0, 1, 3],
    shuffle: false,
    explanation: "Sekai is paid in maize meal and understands fractions better. Joseph is saving for a bicycle. Melody's business was her own idea, and load-shedding melts her freezits. Farai values learning to run a business more than the small pay.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING", secs: 420,
    stem: CLUBS,
    pairs: [
      "members must supply some of their own equipment",
      "offers roles for people who do not want to perform",
      "meets more than once a week",
      "is especially suitable for people who lack confidence",
      "needs someone with a particular skill at present",
      "new members are taught by older pupils",
      "competes against other schools regularly",
    ],
    right: TEXTS,
    rightIndex: [1, 2, 2, 0, 1, 3, 0],
    shuffle: false,
    hints: ["Which club meets on two days?", "Chess players *may be chosen* for tournaments: is that regular?"],
    explanation: "B: bring your own gloves; looking for a photographer. C: no need to act (costumes, scenery); rehearses Wednesday and Friday. A: shy speakers welcome; competes every term. D: beginners coached by senior members (its tournaments are only possible, not regular — a distractor for the last statement).",
  });
  b.match({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 540,
    stem: MOVING,
    pairs: [
      "disliked city life at first but later changed their mind",
      "moved mainly for educational reasons",
      "was upset with a parent about the move",
      "was shown how to get around by family members",
      "now finds their former home too peaceful",
      "has gained recognition since moving",
      "discovered an unexpected outdoor pleasure",
      "finds everyday expenses a problem",
    ],
    right: PEOPLE(["Tinashe", "Ropafadzo", "Kelvin", "Nyasha"]),
    rightIndex: [0, 1, 2, 3, 0, 1, 2, 3],
    shuffle: false,
    hints: ["Look for paraphrases: *recognition* may appear as being chosen for something.", "Who mentions paying for food, and who only misses home cooking?"],
    explanation: "Tinashe hated the city for three months, then found friends; Gokwe now seems *far too quiet*. Ropafadzo moved for a science laboratory and was chosen for the national science fair. Kelvin was angry with his father and discovered hiking. Nyasha's cousins showed her around, and she struggles with paying for every tomato (Ropafadzo misses home cooking but does not mention cost).",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which sentence from a text best matches the statement *This person was nervous beforehand*?",
    options: [
      ["My stomach was in knots the night before.", "Correct: a paraphrase of being nervous before the event."],
      ["I wasn't nervous at all, surprisingly.", "This says the opposite of the statement."],
      ["The others were nervous, but I wasn't.", "Someone else was nervous, not the writer."],
      ["I felt nervous only after it had finished.", "The feeling came afterwards, not beforehand."],
    ],
    answer: "A",
    explanation: "Match the **idea**, including its timing and who it belongs to. Sentences with the word *nervous* in them are distractors here.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Statement: *This person received help from a relative.* Which sentence matches?",
    options: [
      ["My uncle lent me the money for the course.", "Correct: an uncle is a relative who helped."],
      ["My neighbour drove me to the interview.", "A neighbour is not a relative."],
      ["I helped my cousin to fill in his forms.", "Here the writer helps the relative, not the reverse."],
      ["My family had no idea I had applied.", "The family did not help; they did not know."],
    ],
    answer: "A",
    hints: ["Check two things: is the helper a relative, and did they help the writer?"],
    explanation: "Distractors often reverse roles (*I helped my cousin*) or change the person (*neighbour*). Check every part of the statement.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: `${TRIPS}\n\nWhy is Text B **not** the answer to the statement *was not prepared for the weather*?`,
    options: [
      ["The writer had been warned about the heat", "Correct: as everyone had warned us shows they expected it."],
      ["The writer did not mention the weather", "Text B does mention that Kariba was hot."],
      ["The weather in Kariba was cold and wet", "The text says Kariba was hot."],
      ["The writer stayed inside all the weekend", "That was Text D, in the Bvumba."],
    ],
    answer: "A",
    hints: ["Read the whole first sentence of Text B."],
    explanation: "Text B mentions weather (a distractor), but *as everyone had warned us* shows the writer expected the heat. Text A is the one who packed for summer and shivered.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "True or false: if a statement and a text share an important word, the text must be the correct answer.",
    answer: false,
    explanation: "False. Shared words are often distractors. The text must express the **same idea** as the statement.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "True or false: in a matching task you should skim all the texts before you start matching statements.",
    answer: true,
    explanation: "True. A quick skim tells you what each text is about, so you know where to look for each statement.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Choose the phrase from a text that paraphrases each statement.",
    template: "*would recommend it to others* = {{blank:a}}. *found it harder than expected* = {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["anyone thinking of it should go for it"], choices: ["anyone thinking of it should go for it", "I would never do it again", "my friends recommended it to me", "it was not for everyone"] },
      { id: "b", accepted: ["I thought it would be easy, how wrong I was"], choices: ["I thought it would be easy, how wrong I was", "it was exactly as hard as I expected", "it was easier than I feared", "everyone said it was hard"] },
    ],
    hints: ["Who is recommending, and to whom?", "Compare what the writer expected with what happened."],
    explanation: "*Go for it* advises others (a recommendation). *I thought it would be easy — how wrong I was* contrasts the expectation with the harder reality.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: `${HOBBIES}\n\nWhy is Person 4 (Nkosi) **not** the answer to *hopes to earn money from the hobby in the future*?`,
    options: [
      ["He already earns money from it now", "Correct: the statement is about a future hope, not present earnings."],
      ["He does not sell anything he makes", "He sells model cars to tourists."],
      ["He says the hobby is too expensive", "He says it costs almost nothing."],
      ["He wants to give his hobby up soon", "He says nothing about giving it up."],
    ],
    answer: "A",
    hints: ["Look at the tense: hopes … in the future."],
    explanation: "Time matters in matching: Nkosi earns money **now**; Tatenda **hopes** to sell photographs one day.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS",
    stem: `${CLUBS}\n\nExplain why Text D is **not** the correct answer to the statement *competes against other schools regularly*, and give the correct text.`,
    marks: 2,
    points: [
      "Text D says players only *may be chosen* for tournaments: competition is possible, not regular",
      "Correct answer: Text A (the debate team competes against other schools every term)",
    ],
    modelAnswer: "Chess players only may be chosen for national tournaments, so it is not regular; the answer is Text A, whose team competes every term.",
    hints: ["Compare *may be chosen* with *every term*."],
    explanation: "The words *may* and *every term* make the difference: one is a possibility, the other a regular event.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "You are unsure about one statement and time is running out. What should you do?",
    options: [
      ["Make your best guess rather than leave it blank", "Correct: a blank cannot score; a sensible guess might."],
      ["Leave it blank so you do not lose marks", "There is no penalty for a wrong answer, so a blank wastes a chance."],
      ["Choose the text that you have used least so far", "Texts are not used equally, so this is not a reliable method."],
      ["Write two possible texts for the same statement", "Giving two answers usually earns nothing."],
    ],
    answer: "A",
    explanation: "Do the certain matches first, return to the difficult ones, and never leave a blank.",
  });

  b.card("DEFINITION", "Multiple matching", "A task in which each statement is matched to one of several texts or sections; a text may match more than one statement.", undefined);
  b.card("DEFINITION", "Distractor", "A detail in the wrong text that shares a word or topic with a statement but not its exact idea.", undefined);
  b.card("CONCEPT", "Match ideas, not words", "Statements paraphrase the texts. Look for the same meaning in different words.", "'nervous beforehand' = 'my stomach was in knots the night before'");
  b.card("CONCEPT", "Matching method", "Skim all texts → underline the key idea in each statement → find the paraphrase → check for distractors.", undefined);
  b.card("CONCEPT", "Watch for opposites and negatives", "'I wasn't nervous at all' does not match 'was nervous'.", undefined);
  b.card("CONCEPT", "Watch time and roles", "Earns now ≠ hopes to earn; 'I helped my cousin' ≠ 'received help from a relative'.", undefined);
  b.card("FACT", "Texts can repeat", "One text may answer several statements; another may answer only one.", undefined);
  b.card("CONCEPT", "Time management", "Do certain matches first, mark doubtful ones, return later, never leave a blank.", undefined);
}, );
