// Slice EXM2: Cambridge 0500 Paper 1 Question 1 (Text A comprehension, STRUCTURED, 20 marks, FLE). Original texts.
import { concept, P, FLE } from "../lib.mjs";

const C = ["eng.reading.explicit-meaning", "eng.reading.inference", "eng.reading.vocabulary-in-context", "eng.reading.own-words", "eng.reading.writers-craft"];
const SECS = 2100;
const HINTS = [
  "Read Text A once for the overall story, then again with the questions beside you: they follow the order of the text.",
  "Let the marks guide you: a 2-mark question needs two separate points; an 'own words' question must change the key words.",
  "For the final question, quote short phrases and explain what each one suggests: quotation alone earns nothing.",
];
const EXPLAIN =
  "Paper 1 Question 1 moves from explicit meaning (finding details) through implicit meaning (what is suggested) to the writer's use of language. Short, precise answers score best on the early parts; the last part rewards quoting brief evidence and explaining its effect.";

// ---------------------------------------------------------------------------------------------------------------------
const MARKET = `Read Text A carefully, and then answer the questions that follow.

**Text A: The tomato stall**

*In this story, fourteen-year-old Rudo spends a day helping her aunt at a market in Harare.*

**[1]** Rudo had imagined Mbare Musika many times, but nothing had prepared her for the noise. At half past four in the morning, long before the sky had decided what colour to be, the market was already roaring. Lorries from Mutoko groaned into the yard with their engines coughing, porters shouted for space as they pushed barrows piled higher than their heads, and somewhere a radio was playing a sungura song to nobody in particular. Aunt Chipo walked through it all as calmly as if she were crossing her own kitchen.

**[2]** "Stay close and keep your eyes open," she said, without looking back. Rudo held on to the corner of her aunt's wrapper the way she had not done since she was six.

**[3]** The stall was a wooden table under a sheet of blue plastic, wedged between a woman who sold dried kapenta and a young man with a mountain of cabbages. Aunt Chipo had already bought ten crates of tomatoes from a farmer she had known for twenty years, and now she began to sort them with quick, certain hands: the firm red ones at the front, the soft ones in a basin underneath for the women who made relish and wanted a bargain, and the green ones in a box at the back. "Never hide the bad ones under the good," she told Rudo. "A customer you cheat once is a customer you never see again."

**[4]** By six o'clock the buyers had arrived. Rudo had thought selling would be simple: a person asks the price, you tell them, they pay. Instead, every sale was a small performance. A woman in a church uniform picked up a tomato, frowned at it as if it had insulted her mother, and offered half the price. Aunt Chipo laughed, put her hand on her heart and named a figure only a little lower than the first. They argued pleasantly for a minute, and the woman left with two kilograms and a promise to come back on Friday. Rudo realised that both of them had enjoyed it.

**[5]** At about nine, Aunt Chipo went to collect change from a friend at the other end of the market and left Rudo in charge. Almost at once a tall man in a smart jacket stopped at the table. He spoke fast, picked out the best tomatoes himself and pressed a folded note into her hand. Only when he had disappeared into the crowd did Rudo unfold it and see that it was worth far less than the tomatoes he had taken. Her face burned. She felt as if every trader in Mbare had watched her being made a fool of.

**[6]** When her aunt returned, Rudo confessed at once, staring at the ground. She waited for the scolding. Instead, Aunt Chipo looked at the note, sighed, and tucked it into the tin with the rest of the money. "Then you have paid your school fees for the market," she said. "Everyone pays them once. The clever ones pay them only once."

**[7]** That afternoon, as the crowd thinned and the sun pressed down on the blue plastic, Rudo sold the last of the soft tomatoes to an old man who counted out his coins with great care. She counted them with equal care in front of him, and handed back two that were too many. He looked at her for a long moment, then smiled. "Your aunt has taught you well," he said. Rudo did not correct him, but she knew that the lesson had really come from the man in the smart jacket.`;

const STORM = `Read Text A carefully, and then answer the questions that follow.

**Text A: Waiting for the rain**

*In this extract from a memoir, the writer remembers the summer storms of childhood visits to a grandfather's homestead.*

**[1]** Every December of my childhood, my parents drove us from Harare to my grandfather's homestead near Gutu, and every December I waited for the first big storm as other children wait for Christmas. In the city, rain simply happened; you noticed it when you got wet. At Sekuru's place it announced itself hours in advance, and the whole homestead prepared for it like a village preparing for an important visitor.

**[2]** The signs came first in the animals. By early afternoon the chickens would stop scratching in the yard and stand about in sulky groups under the granary. The cattle in the kraal turned their backs to the east. Even Shumba, my grandfather's old dog, who spent most days asleep in the dust, would get up, sniff the air and go to lie under the bed in the main hut, where nobody was allowed to disturb him.

**[3]** Then the sky itself began to change. The flat, white heat of the morning thickened into something heavy and yellowish, and in the east a wall of cloud rose above the hills, dark at the bottom and piled up into brilliant white towers at the top. My grandfather would stand at the edge of the yard with his hands behind his back, studying it like a teacher reading a doubtful essay. "Forty minutes," he would announce. I never once saw him wrong by more than five.

**[4]** Those forty minutes were a frenzy. My grandmother called the orders and we children ran. Washing was snatched off the line, the maize spread out to dry was swept into sacks, the goats were chased into their pen, and the big clay pots were rolled under the eaves so that they would fill with rainwater. My cousin Tafara and I were in charge of the firewood, which had to be carried into the kitchen hut before it got wet, and we competed furiously to see who could carry the bigger load.

**[5]** And then, suddenly, there was nothing left to do. We sat on the low wall of the kitchen hut and listened. The birds had gone silent. A single gust of wind, cold as water from a well, ran across the yard and lifted the dust in a small brown spiral. Far away, thunder rolled like empty drums being dragged across a wooden floor. The smell arrived before the rain did: the rich, almost sweet smell of dry earth receiving its first drops.

**[6]** When the rain came, it came all at once, drumming so loudly on the iron roof of the storeroom that we had to shout to hear each other. Within minutes the yard was a shallow lake and the path to the fields had become a small brown river. My grandfather would stand in the doorway, watching his fields drink, and for once he did not look stern at all.

**[7]** I live in a flat now, in a city far from Gutu, and storms there are just weather. But when I smell rain on hot ground, I am nine years old again, sitting on that wall with my knees pulled up to my chin, waiting.`;

const RADIO = `Read Text A carefully, and then answer the questions that follow.

**Text A: The radio**

*In this story, a teenage girl, Nyasha, tries to bring her grandmother's old radio back to life.*

**[1]** The radio had been silent for eleven days when Nyasha decided to fix it herself. It was a heavy brown box with a cracked dial and a handle mended with wire, and it had sat on the shelf in her grandmother's kitchen in Masvingo for longer than Nyasha had been alive. Every evening at eight, Gogo used to turn it on for the news and then for the request programme, humming along to songs she claimed to dislike. Since it had died, the kitchen felt like a room in which someone had stopped speaking in the middle of a sentence.

**[2]** "Leave it," Gogo said, when she found Nyasha with the back off and its insides spread across the table. "Old things die. I will manage." But she said it too quickly, and she did not look at the shelf.

**[3]** Nyasha knew nothing about radios. She knew, however, that Mr Mapfumo, who repaired phones under a tree near the bus terminus, could fix almost anything with a soldering iron and a great deal of muttering. On Saturday she carried the radio there in a maize-meal sack, its weight banging against her knees all the way. She told Gogo only that she was going to the shops with a friend.

**[4]** Mr Mapfumo was not encouraging. He turned the radio over, peered into it through glasses mended with tape, and made a sound like a kettle beginning to boil. "This is older than my marriage," he said. "Nobody makes these parts any more." Nyasha's heart sank. Then he looked at her face, sighed, and pushed a stool towards her with his foot. "Sit. If you want it fixed, you will watch, and you will hold things. I am not your servant."

**[5]** She sat on that stool for four hours. She held a torch while he poked at tiny wires; she fetched him tea from the kiosk; she learned that a resistor was not a kind of soldier and that the small burnt smell she noticed was not a disaster but a clue. At one point he found a loose connection, pressed it, and the radio gave a single crackle, like an old man clearing his throat, before falling silent again. They both laughed out loud. Twice he told her to go home, and twice she pretended not to hear.

**[6]** It was nearly dark when he finally screwed the back on and turned the dial. For a moment there was only hissing. Then, faintly, a voice reading the football results swam up out of the noise, and Nyasha found that she was clapping like a small child.

**[7]** Mr Mapfumo would accept only half of the money she had saved. "The other half is your payment for being a good assistant," he said gruffly, and turned away to his phones before she could thank him.

**[8]** That evening Nyasha said nothing. She simply put the radio back on its shelf and switched it on at eight. Gogo, who was stirring the sadza, went very still. Then, without turning round, she began to hum.`;

const KARIBA = `Read Text A carefully, and then answer the questions that follow.

**Text A: Patience**

*In this extract from a memoir, the writer describes a fishing trip on Lake Kariba with an uncle.*

**[1]** My uncle Tonderai believed that anyone who slept past four o'clock in the morning at Kariba was wasting the lake. On the first day of my visit he shook me awake in the dark, handed me a mug of sweet tea and a jersey that smelled of fish, and walked down to the harbour without waiting to see if I followed. I followed. At thirteen, I had not yet learned to argue with Uncle Tonde.

**[2]** His boat was called *Patience*, a name I thought was a joke until I had spent a morning in it. It was a narrow, flat-bottomed thing, painted blue a long time ago and patched in so many places that it looked like a map of somewhere that did not exist. The engine started on the fourth pull, with a cough and a cloud of blue smoke, and we puttered out past the moored kapenta rigs, their lights still burning like a small floating town.

**[3]** Out on the open water the darkness was enormous. There was no line between the lake and the sky; the stars went down to my feet and seemed to carry on underneath the boat. I held on to the sides and tried not to think about how deep the water was, or about the crocodiles my cousins had described in loving detail the night before. Uncle Tonde cut the engine, and the silence that followed was so complete that I could hear the water talking quietly against the hull.

**[4]** He showed me how to bait a hook with a small fish without spearing my own thumb, which took me several attempts, and how to let the line out slowly so that it sank where the bream fed among the drowned trees. Then he leaned back and said nothing at all. I waited for something to happen. Nothing did. After twenty minutes I asked whether we should move somewhere else. "The fish know where we are," he said. "Give them time to make up their minds."

**[5]** The sun came up behind the hills on the Zambian shore so slowly that I did not notice it beginning. First the sky turned the colour of weak tea, then of ripe pawpaw, and suddenly the dead trees standing in the water were black against a sheet of gold. A fish eagle called from somewhere above us, a wild, high cry that seemed to come from the beginning of the world. I forgot about my line entirely.

**[6]** That was, of course, the moment the fish took it. The rod nearly jumped out of my hands. Uncle Tonde did not move to help; he only said, "Slowly. Let him tire himself," while I wound and stopped and wound again, my arms aching. When at last I lifted the bream into the boat, it was smaller than my hand had promised, but it shone like a coin, and I have never been so proud of anything.

**[7]** We caught six fish that morning, five of them his. On the way back, he let me steer. I understood the name of the boat then. It was not a joke at all. It was advice.`;

concept("eng.reading.explicit-meaning", { file: "exam/fle-p1q1", keyPrefix: "exam.fle-p1q1", applies: FLE }, (b) => {
  // =================================================================================================================
  // Item 1: The tomato stall (fiction)
  b.struct({
    d: 3, skill: "ANALYSIS", examStyle: true, secs: SECS, concepts: C, hints: HINTS, explanation: EXPLAIN,
    stem: MARKET,
    parts: [
      P.short({
        label: "(a)",
        stem: "**Question 1**\n\nFrom paragraph 1, give the name of the place the lorries had come from.",
        accepted: ["Mutoko", "from Mutoko"],
        keywords: { all: ["mutoko"] },
        model: "Mutoko",
        wrong: ["Mbare"],
        explanation: "*Lorries from Mutoko groaned into the yard.* Mbare is where the market is, not where the lorries came from.",
      }),
      P.short({
        label: "(b)",
        stem: "From paragraph 3, how many crates of tomatoes had Aunt Chipo bought?",
        accepted: ["ten", "10", "ten crates", "10 crates", "ten crates of tomatoes", "10 crates of tomatoes"],
        model: "ten",
        wrong: ["twenty"],
        explanation: "*Ten crates of tomatoes.* Twenty is the number of years she had known the farmer.",
      }),
      P.manual({
        label: "(c)",
        marks: 2,
        stem: "Using your own words, explain how Aunt Chipo arranged the tomatoes on her stall (paragraph 3).",
        points: [
          "One arrangement in own words, e.g. the best / ripest, undamaged tomatoes were displayed where buyers saw them first (*firm red ones at the front*)",
          "A second, different arrangement, e.g. the over-ripe / bruised ones were kept below in a dish for cheap sale to cooks, OR the unripe ones were kept behind / out of sight",
        ],
        modelAnswer: "She put the best, ripest tomatoes where customers would see them first, kept the over-ripe ones underneath in a dish to sell cheaply to cooks, and kept the unripe ones behind everything else.",
        explanation: "Two separate arrangements earn the two marks. Change the key words (*firm*, *soft*, *green*) rather than copying them.",
      }),
      P.mcq({
        label: "(d)",
        stem: "In paragraph 3, the stall was **wedged** between two other traders. What does **wedged** mean here?",
        options: [
          ["squeezed tightly", "Correct: the stall was pressed into a narrow space with traders close on either side."],
          ["hidden carefully", "Nothing suggests the stall was hidden; it is simply crowded in."],
          ["fastened firmly", "Wedged is about tight space, not about being tied or fixed down."],
          ["placed proudly", "There is no idea of pride; the word stresses lack of room."],
        ],
        answer: "A",
        explanation: "A wedge is pushed into a narrow gap, so **wedged** means forced into a tight space. It helps show how crowded the market is.",
      }),
      P.mcq({
        label: "(e)",
        stem: "In paragraph 4, why does the writer call every sale **a small performance**?",
        options: [
          ["Buyer and seller each played a part, as if in a show.", "Correct: the frowning, laughing and hand on the heart are acted, and both sides enjoy the game."],
          ["Customers stood and watched Aunt Chipo sort her tomatoes.", "The customers are taking part in the bargaining, not watching her work."],
          ["Each sale was judged and scored by the traders around them.", "No one judges the sales; the word refers to the acting involved."],
          ["Selling tomatoes was tiring work that left Rudo exhausted.", "Tiredness is not mentioned in paragraph 4; the point is the play-acting."],
        ],
        answer: "A",
        explanation: "Bargaining is shown as theatre: the woman pretends to be offended, Aunt Chipo pretends to be wounded, and *both of them had enjoyed it*.",
      }),
      P.manual({
        label: "(f)",
        marks: 2,
        stem: "The woman in the church uniform frowned at a tomato *as if it had insulted her mother* (paragraph 4). What does this comparison suggest about her?",
        points: [
          "She acts / pretends to be deeply displeased or offended by the tomato (an exaggerated, comic reaction)",
          "She does this as a bargaining trick, to persuade Aunt Chipo to lower the price",
        ],
        modelAnswer: "It suggests she is pretending to be hugely offended by the tomato, as if it were a personal insult, so that Aunt Chipo will feel she must lower the price.",
        explanation: "The comparison is deliberately over the top: a tomato cannot insult anyone. The exaggeration shows that her disgust is an act, part of the game of bargaining.",
      }),
      P.manual({
        label: "(g)",
        marks: 3,
        stem: "Using your own words, explain what the writer means by each of the words in *italics* as they are used in the text:\n\n1. Lorries *groaned* into the yard (paragraph 1)\n2. with quick, *certain* hands (paragraph 3)\n3. Rudo *confessed* at once (paragraph 6)",
        points: [
          "groaned: made a low, heavy noise as if straining / struggling under their loads",
          "certain: confident / sure / skilled, without hesitating",
          "confessed: admitted (owned up to) what had happened / her mistake",
        ],
        modelAnswer: "1. made a deep, strained noise as if struggling 2. confident and sure 3. owned up to her mistake",
        explanation: "Explain the meaning in context: *certain* here describes hands that work without hesitation, not something that is definitely true.",
      }),
      P.mcq({
        label: "(h)",
        stem: "Why did Rudo's face **burn** in paragraph 5?",
        options: [
          ["She was ashamed at having been tricked.", "Correct: she feels everyone has watched her being *made a fool of*."],
          ["The sun was beating down on the stall.", "The heat of the sun is mentioned only in paragraph 7, and *burned* here is about her feelings."],
          ["She was angry with her aunt for leaving.", "She blames herself, not her aunt; she later confesses at once."],
          ["She had chased the man through the crowd.", "She does not chase him; she only discovers the trick after he has gone."],
        ],
        answer: "A",
        explanation: "A burning face is a sign of embarrassment or shame. The next sentence confirms it: she felt the whole market had watched her being fooled.",
      }),
      P.manual({
        label: "(i)",
        marks: 2,
        stem: "Explain what Aunt Chipo means when she says, *Then you have paid your school fees for the market* (paragraph 6).",
        points: [
          "The money lost is the price of a lesson: Rudo has learned something about trading (to check money / not to be rushed) by being cheated",
          "Every trader makes this mistake once; what matters is learning from it and not repeating it (*The clever ones pay them only once*)",
        ],
        modelAnswer: "She means that the lost money is the cost of Rudo's education as a trader: she has learned to check payments. Everyone is cheated once, but a sensible trader learns from it and is never cheated the same way again.",
        explanation: "The metaphor compares a costly mistake to school fees: you pay, and in return you learn. Aunt Chipo turns Rudo's failure into a lesson instead of scolding her.",
      }),
      P.manual({
        label: "(j)",
        marks: 2,
        stem: "In paragraph 7, Rudo counts the old man's coins *with equal care in front of him* and hands two back. What does this show about how she has changed during the day?",
        points: [
          "She now checks money carefully / is no longer careless with payments (she has learned from being cheated)",
          "She is honest and fair with customers, following her aunt's rule not to cheat (and wins the customer's respect / trust)",
        ],
        modelAnswer: "She has become careful, checking every payment openly after being cheated that morning, and she is scrupulously honest, returning the extra coins just as her aunt would never cheat a customer.",
        explanation: "The scene mirrors paragraph 5: this time Rudo is in control, careful and honest. She credits the lesson to the man who cheated her.",
      }),
      P.manual({
        label: "(k)",
        marks: 4,
        stem: "How does the writer convey the noise and activity of the market in paragraph 1?\n\nSupport your answer with words and phrases from the text and explain their effect.",
        points: [
          ["A relevant quotation with explanation, e.g. *the market was already roaring*: a metaphor making the market sound like a huge animal, loud and alive even before dawn", 1],
          ["A second, e.g. lorries *groaned* / *engines coughing*: personifies the vehicles as tired, struggling creatures, adding heavy mechanical noise", 1],
          ["A third, e.g. porters *shouted for space* / barrows *piled higher than their heads*: suggests crowding, urgency and overloaded movement", 1],
          ["A fourth, e.g. the long sentence listing sounds one after another, or the radio playing *to nobody in particular* (no one has time to listen), or the contrast with Aunt Chipo crossing it *as calmly as if she were crossing her own kitchen*", 1],
        ],
        modelAnswer: "The writer says the market was 'already roaring', a metaphor that makes it sound like a great beast, loud and alive before the sun is even up. The lorries 'groaned' with 'engines coughing', as if they were exhausted creatures straining under their loads. Porters 'shouted for space' with barrows 'piled higher than their heads', which suggests crowding and constant, urgent movement. The sentence itself piles one noise on another, and the radio playing 'to nobody in particular' shows that everyone is too busy to listen. Against all this, Aunt Chipo walks 'as calmly as if she were crossing her own kitchen', which makes the chaos seem even greater to Rudo.",
        explanation: "Each mark needs a quotation AND an explanation of what it suggests. Choose different techniques (metaphor, personification, listing, contrast) to show range.",
      }),
    ],
  });

  // =================================================================================================================
  // Item 2: Waiting for the rain (memoir)
  b.struct({
    d: 3, skill: "ANALYSIS", examStyle: true, secs: SECS, concepts: C, hints: HINTS, explanation: EXPLAIN,
    stem: STORM,
    parts: [
      P.short({
        label: "(a)",
        stem: "**Question 1**\n\nFrom paragraph 1, in which month did the family visit the grandfather's homestead?",
        accepted: ["December", "in December", "every December"],
        keywords: { all: ["december"] },
        model: "December",
        wrong: ["January"],
        explanation: "*Every December of my childhood.*",
      }),
      P.short({
        label: "(b)",
        stem: "From paragraph 2, what was the name of the grandfather's dog?",
        accepted: ["Shumba"],
        keywords: { all: ["shumba"] },
        model: "Shumba",
        wrong: ["Tafara"],
        explanation: "*Even Shumba, my grandfather's old dog.* Tafara is the writer's cousin.",
      }),
      P.manual({
        label: "(c)",
        marks: 2,
        stem: "Give **two** ways in which the animals showed that a storm was coming (paragraph 2).",
        points: [
          "Any one of: the chickens stopped scratching and gathered (in a bad mood) under the granary / the cattle turned their backs to the east / the old dog woke up, sniffed the air and hid under the bed",
          "A second, different sign from the same list",
        ],
        modelAnswer: "The chickens stopped scratching and huddled under the granary, and the cattle turned their backs to the east.",
        explanation: "Three signs are given; any two separate ones earn the marks.",
      }),
      P.mcq({
        label: "(d)",
        stem: "In paragraph 2, the chickens stood about in **sulky** groups. What does **sulky** mean?",
        options: [
          ["silent and bad-tempered", "Correct: sulky describes someone who is quietly in a bad mood, a comic human touch for the chickens."],
          ["frightened and noisy", "Sulky behaviour is quiet, not noisy."],
          ["tired and sleepy", "Sulking is about mood, not tiredness."],
          ["hungry and restless", "They have stopped scratching for food; sulky does not mean hungry."],
        ],
        answer: "A",
        explanation: "To sulk is to be silently resentful. The writer gives the chickens a human mood, suggesting the oppressive feeling before a storm.",
      }),
      P.mcq({
        label: "(e)",
        stem: "In paragraph 4, the writer says *Those forty minutes were a* **frenzy**. What does **frenzy** mean?",
        options: [
          ["a time of wild, hurried activity", "Correct: the list of jobs done at speed shows a burst of frantic activity."],
          ["a time of quiet, nervous waiting", "The waiting comes later, in paragraph 5; paragraph 4 is all action."],
          ["a time of angry family quarrels", "The children compete, but nobody quarrels."],
          ["a time of cheerful songs and games", "There is energy and competition, but no singing or games."],
        ],
        answer: "A",
        explanation: "The rest of the paragraph explains the word: washing *snatched*, maize *swept*, goats *chased*, children who *ran*.",
      }),
      P.manual({
        label: "(f)",
        marks: 2,
        stem: "The grandfather studied the sky *like a teacher reading a doubtful essay* (paragraph 3). What does this comparison suggest about him?",
        points: [
          "He examines the sky carefully / closely / seriously, judging it",
          "He has the knowledge and authority of an expert (and a slightly stern or critical manner), which is why his forecast is so accurate",
        ],
        modelAnswer: "It suggests that he examines the sky closely and critically, the way a teacher checks work he suspects, and that he reads the weather with an expert's authority, which is why he is never more than five minutes wrong.",
        explanation: "A teacher with a *doubtful* essay reads slowly and critically. The comparison stresses both his care and his expertise.",
      }),
      P.manual({
        label: "(g)",
        marks: 3,
        stem: "Using your own words, explain what the writer means by each of the words in *italics* as they are used in the text:\n\n1. *brilliant* white towers (paragraph 3)\n2. Washing was *snatched* off the line (paragraph 4)\n3. he did not look *stern* at all (paragraph 6)",
        points: [
          "brilliant: very bright / dazzling / shining",
          "snatched: grabbed / pulled quickly (in a hurry)",
          "stern: strict / severe / serious-looking",
        ],
        modelAnswer: "1. dazzlingly bright 2. pulled off quickly in a hurry 3. strict and severe",
        explanation: "In context *brilliant* is about brightness, not cleverness, and *snatched* stresses speed.",
      }),
      P.mcq({
        label: "(h)",
        stem: "What does the final paragraph suggest about the writer's feelings now?",
        options: [
          ["The writer misses those storms and that time.", "Correct: a smell takes the writer straight back to childhood, *waiting*, which shows fond longing."],
          ["The writer is glad to have left the countryside.", "Nothing suggests relief; the memory is treasured."],
          ["The writer has been afraid of storms ever since.", "The memory is of excitement and anticipation, not fear."],
          ["The writer finds city storms more exciting now.", "City storms are *just weather*: less special, not more exciting."],
        ],
        answer: "A",
        explanation: "The contrast between storms that are *just weather* now and the vivid memory of waiting on the wall reveals nostalgia.",
      }),
      P.manual({
        label: "(i)",
        marks: 2,
        stem: "According to paragraph 1, how was rain at Sekuru's homestead different from rain in the city?",
        points: [
          "In the city it went unnoticed / just happened: you only became aware of it when you got wet",
          "At the homestead it gave warning hours before it came and everyone got ready for it, as for an important guest (it was an event)",
        ],
        modelAnswer: "In the city nobody paid attention to rain until it soaked them, but at the homestead it signalled its arrival hours ahead and everyone prepared for it as if an honoured guest were coming.",
        explanation: "The answer needs both sides of the contrast. The simile of the *important visitor* shows how much the rain mattered to a farming family.",
      }),
      P.manual({
        label: "(j)",
        marks: 2,
        stem: "At the end of paragraph 6 the grandfather *for once did not look stern at all*. What does this suggest about him, and why does he look different at this moment?",
        points: [
          "He is usually serious / strict / severe in appearance",
          "He is relieved or happy because the rain is soaking his fields: his crops will grow (*watching his fields drink*)",
        ],
        modelAnswer: "It suggests that he normally looks severe, but now he is relieved and contented because the rain is soaking into his fields and his crops will grow.",
        explanation: "*For once* tells you sternness is normal for him. *Watching his fields drink* explains the change: the rain matters to his livelihood.",
      }),
      P.manual({
        label: "(k)",
        marks: 4,
        stem: "How does the writer create a feeling of tense waiting in paragraph 5?\n\nSupport your answer with words and phrases from the text and explain their effect.",
        points: [
          ["A relevant quotation with explanation, e.g. *suddenly, there was nothing left to do* / *We sat … and listened*: the sudden stillness after the rush makes everyone wait and listen", 1],
          ["A second, e.g. *The birds had gone silent*: an eerie silence, as if nature is holding its breath", 1],
          ["A third, e.g. the gust *cold as water from a well* / the dust *in a small brown spiral*: a sudden chill and movement warn that something is coming", 1],
          ["A fourth, e.g. thunder *like empty drums being dragged across a wooden floor*: a distant, rumbling, slightly threatening sound; or *The smell arrived before the rain did*: the senses anticipate the storm", 1],
        ],
        modelAnswer: "After the rush of paragraph 4, 'suddenly, there was nothing left to do', so the children can only sit and listen, and the stillness itself builds suspense. 'The birds had gone silent' makes it seem as if the whole world is holding its breath. A gust 'cold as water from a well' brings a sudden chill, a sharp physical warning, and the dust rising 'in a small brown spiral' shows the wind stirring. The thunder rolling 'like empty drums being dragged across a wooden floor' is distant but heavy and ominous. Finally 'the smell arrived before the rain did', so the reader, like the children, senses the storm before it breaks.",
        explanation: "Tension in description comes from stillness, silence and small warning signs. Each mark needs a quotation and a comment on its effect.",
      }),
    ],
  });

  // =================================================================================================================
  // Item 3: The radio (fiction)
  b.struct({
    d: 3, skill: "ANALYSIS", examStyle: true, secs: SECS, concepts: C, hints: HINTS, explanation: EXPLAIN,
    stem: RADIO,
    parts: [
      P.short({
        label: "(a)",
        stem: "**Question 1**\n\nFrom paragraph 1, for how many days had the radio been silent?",
        accepted: ["eleven", "11", "eleven days", "11 days", "for eleven days", "for 11 days"],
        model: "eleven",
        wrong: ["four"],
        explanation: "*The radio had been silent for eleven days.*",
      }),
      P.short({
        label: "(b)",
        stem: "From paragraph 3, where did Mr Mapfumo do his repairs?",
        accepted: ["under a tree near the bus terminus", "near the bus terminus", "under a tree", "by the bus terminus", "at the bus terminus", "the bus terminus", "under a tree by the bus terminus", "under a tree at the bus terminus"],
        keywords: { any: ["terminus", "tree"], minAny: 1 },
        model: "under a tree near the bus terminus",
        wrong: ["in a shop in the market"],
        explanation: "*Mr Mapfumo, who repaired phones under a tree near the bus terminus.*",
      }),
      P.manual({
        label: "(c)",
        marks: 2,
        stem: "In paragraph 2 Gogo says, *I will manage.* Give **two** details which show that she does not really mean it.",
        points: [
          "She says it too quickly (as if she does not want to think about it)",
          "She does not look at the shelf (where the radio used to stand), avoiding her feelings",
        ],
        modelAnswer: "She says it too quickly, and she avoids looking at the shelf where the radio used to be.",
        explanation: "The narrator gives two clues straight after her words; both reveal that she misses the radio more than she admits.",
      }),
      P.mcq({
        label: "(d)",
        stem: "In paragraph 4, what does the writer mean by *Mr Mapfumo was not* **encouraging**?",
        options: [
          ["He did not give her much hope.", "Correct: he says the radio is ancient and that nobody makes the parts any more."],
          ["He did not want to be paid at all.", "Payment comes up only in paragraph 7."],
          ["He did not understand her request.", "He understands perfectly; he simply doubts the radio can be mended."],
          ["He did not have time to look at it.", "He does look at it, turning it over and peering inside."],
        ],
        answer: "A",
        explanation: "To encourage someone is to give them hope or confidence; his comments make Nyasha's *heart sink*.",
      }),
      P.mcq({
        label: "(e)",
        stem: "In paragraph 7, Mr Mapfumo speaks **gruffly**. What does **gruffly** mean?",
        options: [
          ["in a rough, deep voice", "Correct: gruff speech sounds rough or abrupt, often hiding kinder feelings."],
          ["in a loud, cheerful voice", "Gruff is not cheerful; it is rough and short."],
          ["in a soft, nervous voice", "Gruff is the opposite of soft."],
          ["in a slow, puzzled voice", "There is no puzzlement in what he says."],
        ],
        answer: "A",
        explanation: "**Gruffly** means roughly or abruptly. His gruff manner hides a generous act, which is why he turns away before she can thank him.",
      }),
      P.manual({
        label: "(f)",
        marks: 2,
        stem: "Since the radio had died, *the kitchen felt like a room in which someone had stopped speaking in the middle of a sentence* (paragraph 1). Explain what this comparison suggests.",
        points: [
          "The silence feels sudden / unfinished / unnatural: something is missing from the kitchen",
          "The radio had been like a voice or member of the household (a companion to Gogo), so its loss brings sadness / emptiness",
        ],
        modelAnswer: "The silence feels sudden and incomplete, as if something has been cut off. The radio had been like a person talking in the kitchen every evening, so without it the room feels empty and sad.",
        explanation: "A sentence broken off in the middle leaves you waiting for the rest; the comparison makes the radio almost a person and the silence a loss.",
      }),
      P.manual({
        label: "(g)",
        marks: 3,
        stem: "Using your own words, explain what the writer means by each of the words in *italics* as they are used in the text:\n\n1. a great deal of *muttering* (paragraph 3)\n2. he *peered* into it (paragraph 4)\n3. *faintly*, a voice … swam up (paragraph 6)",
        points: [
          "muttering: talking / grumbling quietly to himself, under his breath",
          "peered: looked closely and with effort (as if hard to see)",
          "faintly: weakly / very quietly / only just able to be heard",
        ],
        modelAnswer: "1. grumbling quietly to himself 2. looked very closely, straining to see 3. barely audibly",
        explanation: "Give the meaning in context: *faintly* describes a sound that can hardly be heard, which fits the voice emerging from the hiss.",
      }),
      P.mcq({
        label: "(h)",
        stem: "Why did Nyasha **pretend not to hear** when Mr Mapfumo told her to go home (paragraph 5)?",
        options: [
          ["She was determined to stay until it worked.", "Correct: she had sat for hours and would not leave without the radio mended."],
          ["She was too tired to carry the sack home.", "Tiredness is not mentioned; she chooses to stay."],
          ["She was afraid Gogo would be angry with her.", "Nothing suggests she feared her grandmother."],
          ["She could not hear him over the market noise.", "She *pretended* not to hear, so she did hear him."],
        ],
        answer: "A",
        explanation: "*Pretended* is the key word: she heard him but chose to stay, which shows her determination.",
      }),
      P.manual({
        label: "(i)",
        marks: 2,
        stem: "What impression does the writer give of Mr Mapfumo's character in paragraphs 4 and 7?",
        points: [
          "On the surface he seems gruff / grumpy / unwelcoming, e.g. *I am not your servant*, *he said gruffly*",
          "In fact he is kind / generous / soft-hearted, e.g. he helps after seeing her face, accepts only half the money, turns away to avoid being thanked",
        ],
        modelAnswer: "He seems grumpy and rough on the surface ('I am not your servant'), but he is really kind and generous: he agrees to help after seeing her face and accepts only half her money, turning away so she cannot thank him.",
        explanation: "The writer creates a contrast between his manner and his actions. Each mark needs a quality supported by a detail.",
      }),
      P.manual({
        label: "(j)",
        marks: 2,
        stem: "In paragraph 8, Gogo *went very still* and then *began to hum*. Explain what these reactions suggest about her feelings.",
        points: [
          "Going still shows she is surprised / deeply moved when she hears the radio again",
          "Humming shows her happiness that her old evening routine has returned (she does not turn round, perhaps hiding her emotion)",
        ],
        modelAnswer: "She freezes because she is surprised and moved to hear the radio again; then she hums, just as she used to, showing quiet happiness that her evenings are back to normal, though she keeps her back turned to hide her emotion.",
        explanation: "Neither character says anything: the writer shows feelings through actions. Humming links back to paragraph 1 and completes the story.",
      }),
      P.manual({
        label: "(k)",
        marks: 4,
        stem: "How does the writer convey Nyasha's experience at Mr Mapfumo's stall in paragraphs 5 and 6?\n\nSupport your answer with words and phrases from the text and explain their effect.",
        points: [
          ["A relevant quotation with explanation, e.g. *She sat on that stool for four hours* / *Twice he told her to go home, and twice she pretended not to hear*: shows her patience and determination (repetition stresses it)", 1],
          ["A second, e.g. *a resistor was not a kind of soldier* / the burnt smell *not a disaster but a clue*: gentle humour shows her learning and her growing understanding", 1],
          ["A third, e.g. the radio's crackle *like an old man clearing his throat*: personification gives a flash of hope, and *They both laughed out loud* shows a shared bond", 1],
          ["A fourth, e.g. a voice *swam up out of the noise*: the metaphor shows the sound slowly emerging, and *clapping like a small child* shows her pure, unselfconscious joy", 1],
        ],
        modelAnswer: "The writer stresses Nyasha's patience: she 'sat on that stool for four hours', and the repetition in 'twice he told her to go home, and twice she pretended not to hear' shows her stubborn determination. Gentle humour, such as learning that 'a resistor was not a kind of soldier', shows how much she is learning. The radio's crackle 'like an old man clearing his throat' makes it seem briefly alive, giving her hope, and the shared laughter shows a bond growing between her and Mr Mapfumo. When the voice 'swam up out of the noise', the metaphor captures the sound slowly emerging, and 'clapping like a small child' conveys her pure, unguarded joy.",
        explanation: "Choose varied evidence (repetition, humour, personification, metaphor, simile) and explain what each shows about her experience.",
      }),
    ],
  });

  // =================================================================================================================
  // Item 4: Patience (memoir)
  b.struct({
    d: 3, skill: "ANALYSIS", examStyle: true, secs: SECS, concepts: C, hints: HINTS, explanation: EXPLAIN,
    stem: KARIBA,
    parts: [
      P.short({
        label: "(a)",
        stem: "**Question 1**\n\nFrom paragraph 2, what was the name of the uncle's boat?",
        accepted: ["Patience", "the Patience"],
        keywords: { all: ["patience"] },
        model: "Patience",
        wrong: ["Kariba"],
        explanation: "*His boat was called Patience.*",
      }),
      P.short({
        label: "(b)",
        stem: "From paragraph 7, how many fish did the writer and the uncle catch altogether that morning?",
        accepted: ["six", "6", "six fish", "6 fish"],
        model: "six",
        wrong: ["five"],
        explanation: "*We caught six fish that morning, five of them his*: five were the uncle's, so the total is six.",
      }),
      P.manual({
        label: "(c)",
        marks: 2,
        stem: "Give **two** details from paragraph 1 which show that Uncle Tonde expected to be obeyed.",
        points: [
          "Any one of: he woke the writer in the dark / before four without asking / he walked to the harbour without waiting to see if the writer followed / the writer had *not yet learned to argue* with him",
          "A second, different detail from the same list",
        ],
        modelAnswer: "He shook the writer awake in the dark without asking, and he walked off to the harbour without even checking that the writer was following.",
        explanation: "Two separate details from paragraph 1 earn the marks.",
      }),
      P.mcq({
        label: "(d)",
        stem: "In paragraph 2, they passed the **moored** kapenta rigs. What does **moored** mean?",
        options: [
          ["tied up in one place", "Correct: a moored boat is fastened so that it does not drift away."],
          ["drifting with the wind", "Moored boats are fixed, not drifting."],
          ["sinking very slowly", "Nothing suggests the rigs were sinking."],
          ["sailing out at speed", "The rigs are still, like *a small floating town*."],
        ],
        answer: "A",
        explanation: "To **moor** a boat is to secure it with ropes or an anchor. The still rigs with their lights look like a town on the water.",
      }),
      P.mcq({
        label: "(e)",
        stem: "In paragraph 3, the writer could hear the water *talking quietly against the* **hull**. What is the **hull**?",
        options: [
          ["the main body of the boat", "Correct: the hull is the boat's body, the part that sits in the water."],
          ["the edge of the shore", "They are out on open water, far from the shore."],
          ["the floor of the lake", "The water laps against the boat, not the lake bed."],
          ["the end of the rod", "The fishing rod has not yet been used in paragraph 3."],
        ],
        answer: "A",
        explanation: "Water lapping against the **hull** (the boat's body) is the only sound in the silence, which the writer turns into gentle *talking*.",
      }),
      P.manual({
        label: "(f)",
        marks: 2,
        stem: "The boat was *patched in so many places that it looked like a map of somewhere that did not exist* (paragraph 2). Explain what this description suggests.",
        points: [
          "The patches of different shapes / colours look like countries or regions on a map",
          "The boat is very old / battered / much repaired (but still in use, cared for)",
        ],
        modelAnswer: "The many patches, all different shapes, look like the countries on a map, which shows that the boat is very old and has been repaired again and again.",
        explanation: "The image is humorous and precise: it helps you picture the patchwork and tells you about the boat's long, hard life.",
      }),
      P.manual({
        label: "(g)",
        marks: 3,
        stem: "Using your own words, explain what the writer means by each of the words in *italics* as they are used in the text:\n\n1. the darkness was *enormous* (paragraph 3)\n2. the silence … was so *complete* (paragraph 3)\n3. my arms *aching* (paragraph 6)",
        points: [
          "enormous: huge / vast / seemed to stretch without limit",
          "complete: total / absolute (no other sound at all)",
          "aching: sore / painful (from effort)",
        ],
        modelAnswer: "1. vast and seemingly endless 2. total, with no sound at all 3. sore and tired from the effort",
        explanation: "Use different words with the same meaning in context: *complete* silence is total silence.",
      }),
      P.mcq({
        label: "(h)",
        stem: "What does Uncle Tonde's reply, *Give them time to make up their minds* (paragraph 4), show about him?",
        options: [
          ["He believes that fishing needs patience.", "Correct: he is content to wait for the fish to come, which links to the boat's name."],
          ["He thinks the fish are too clever to catch.", "He expects to catch fish; he simply waits."],
          ["He wants to go back home as soon as possible.", "He is relaxed and in no hurry at all."],
          ["He has forgotten where the fish usually feed.", "He knows exactly where they feed, among the drowned trees."],
        ],
        answer: "A",
        explanation: "His calm, humorous reply shows a fisherman who knows that waiting is part of the skill, the lesson the writer understands at the end.",
      }),
      P.manual({
        label: "(i)",
        marks: 2,
        stem: "Why does the writer *forget about the line entirely* in paragraph 5?",
        points: [
          "The writer is absorbed in / amazed by the beauty of the sunrise (the changing colours, the trees against gold)",
          "The fish eagle's wild cry adds to the sense of wonder, so fishing no longer seems important",
        ],
        modelAnswer: "The writer is so captivated by the slow, beautiful sunrise turning the water gold, and by the wild cry of the fish eagle, that catching a fish suddenly seems unimportant.",
        explanation: "The whole paragraph builds a sense of wonder; the short final sentence shows its effect on the writer.",
      }),
      P.manual({
        label: "(j)",
        marks: 2,
        stem: "Explain what the writer means at the end of the text: *It was not a joke at all. It was advice.*",
        points: [
          "At first the writer thought the name was a joke / funny (an old, slow boat called *Patience*)",
          "Now the writer understands that fishing (and perhaps life) needs patience: waiting for the fish and landing it slowly, so the name tells you how to fish",
        ],
        modelAnswer: "The writer first thought the name was a joke, but after the long wait and the slow struggle to land the bream, the writer realises that patience is exactly what fishing needs: the name is a piece of advice.",
        explanation: "The ending links back to paragraph 2. The writer's view of the name changes because of what the morning taught.",
      }),
      P.manual({
        label: "(k)",
        marks: 4,
        stem: "How does the writer convey the beauty of the sunrise in paragraph 5?\n\nSupport your answer with words and phrases from the text and explain their effect.",
        points: [
          ["A relevant quotation with explanation, e.g. *so slowly that I did not notice it beginning*: the gradual, almost magical change", 1],
          ["A second, e.g. the sky the colour of *weak tea*, then *ripe pawpaw*: everyday comparisons that show the colours deepening and warming", 1],
          ["A third, e.g. the dead trees *black against a sheet of gold*: dramatic contrast; *sheet of gold* makes the water seem precious and shining", 1],
          ["A fourth, e.g. the fish eagle's *wild, high cry that seemed to come from the beginning of the world*: a sense of something ancient and awe-inspiring; or *I forgot about my line entirely* shows its power over the writer", 1],
        ],
        modelAnswer: "The sun rises 'so slowly that I did not notice it beginning', which makes the change seem gradual and almost magical. The colours are compared to 'weak tea' and then 'ripe pawpaw', homely images that show the sky deepening from pale to rich orange. 'Black against a sheet of gold' creates a striking contrast, and the metaphor of gold makes the lake seem precious and dazzling. The fish eagle's 'wild, high cry that seemed to come from the beginning of the world' adds sound and a feeling of ancient wildness, so it is no surprise that the writer 'forgot about my line entirely'.",
        explanation: "Notice how the writer moves from slow change to colour, contrast and sound. Explain the effect of each image, not just its technique.",
      }),
    ],
  });
});
