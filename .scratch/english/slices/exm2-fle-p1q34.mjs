// Slice EXM2: Cambridge 0500 Paper 1 Questions 3 and 4 (Text C: short answers 10 + language task 10 = Q3; extended
// response in role 20 = Q4; STRUCTURED, 40 marks, FLE). Original texts; fictional people.
import { concept, P, FLE } from "../lib.mjs";

const C = ["eng.reading.extended-response", "eng.reading.writers-craft", "eng.reading.inference", "eng.reading.vocabulary-in-context", "eng.reading.own-words", "eng.functional.journal-interview"];
const SECS = 4200;
const HINTS = [
  "Answer the short Question 3 parts briefly, then plan the language task: pick three or four powerful phrases from EACH named paragraph.",
  "In the language task, explain what each choice means AND what it suggests or makes the reader feel; naming a technique earns little on its own.",
  "For Question 4, cover all three bullet points, use plenty of details from Text C in your own words, and develop them in the voice of your role.",
];
const EXPLAIN =
  "Question 3 tests close reading (short answers, 10 marks) and the writer's use of language (the language task, 10 marks). Question 4 is an extended response in role: 10 marks for using and developing ideas from Text C, 10 for the quality of your writing.";

const LANG_STEM = (paraA, focusA, paraB, focusB) =>
  `Re-read paragraphs ${paraA} and ${paraB}.\n\n- Paragraph ${paraA}: ${focusA}\n- Paragraph ${paraB}: ${focusB}\n\nExplain how the writer uses language to convey meaning and to create effect in these paragraphs. Choose **three or four** examples of words and phrases from **each** paragraph to support your answer. Your choices should include imagery.\n\nWrite about **two hundred to two hundred and fifty words**.`;
const LANG_POINTS = (paraA, choicesA, paraB, choicesB) => [
  [`Paragraph ${paraA}: selects at least three relevant, precise words or short phrases (not whole sentences), such as those listed`, 2, choicesA],
  [`Paragraph ${paraB}: selects at least three relevant, precise words or short phrases, such as those listed`, 2, choicesB],
  ["Explains the meaning of each choice accurately in its context", 2],
  ["Explains the effect of the choices: what the images and words suggest and how they create the impression (not just naming techniques)", 3],
  ["Covers both paragraphs with reasonable balance, in about 200-250 words", 1],
];
const Q4_POINTS = (bullets, textIdeas, developments, form) => [
  ["Reading: addresses all three bullet points of the task, giving each reasonable weight", 3, bullets],
  ["Reading: uses a good range of relevant ideas and details from Text C, in your own words, such as those listed", 4, textIdeas],
  ["Reading: develops the ideas with sensible inferences, explanations or judgements that go beyond the text but stay consistent with it, such as those listed", 3, developments],
  [`Writing: the voice and register suit the role and audience, and the conventions of the form are followed (${form})`, 4],
  ["Writing: well structured, with an engaging opening, logically sequenced paragraphs and an effective ending", 3],
  ["Writing: precise, varied vocabulary and sentence structures; accurate spelling, punctuation and grammar", 3],
];
const Q4_TAIL = "\n\nBase your answer on what you have read in Text C, but be careful to use your own words. Address each of the three bullet points.\n\nWrite about **two hundred and fifty to three hundred words**.\n\n*Up to 10 marks are available for the content of your answer and up to 10 marks for the quality of your writing.*";

// ---------------------------------------------------------------------------------------------------------------------
const WATERHOLE = `Read Text C carefully, and then answer Questions 3 and 4.

**Text C: The waterhole**

*In this story, Tsitsi, a trainee wildlife guide, spends her first afternoon in a hide (a shelter for watching animals) at a waterhole in Hwange National Park.*

**[1]** The hide was a long, low hut of sun-greyed timber dug half into the earth beside the waterhole, and from inside it the world shrank to a single slot of light at the height of Tsitsi's eyes. Mr Mlambo, the senior guide, had told her to bring water, a notebook and "a great deal of silence". She had brought the first two. The third, she was discovering, was harder to carry.

**[2]** For the first hour nothing happened, and it happened very slowly. The heat pressed down on the iron roof until it ticked and creaked like an old man's knees. A pair of doves bickered in the dead tree on the far bank. The water itself, a brown pan no bigger than a football pitch, lay flat and blank, and the mud around its edges had dried into cracked plates that curled at the corners like stale bread. Tsitsi shifted on the bench, wrote *3.15 p.m. Doves (2)* in her notebook, and felt foolish.

**[3]** "You are watching the water," Mr Mlambo murmured, without turning his head. "Watch the edges. Animals do not arrive. They appear."

**[4]** She did not understand him until, a few minutes later, a piece of the bush on the left simply detached itself and became a kudu bull. He stood at the treeline for a long time, his great spiral horns tilted back, his ears turning like dishes searching for a signal. Every muscle in his body seemed to be asking a question. Then, step by careful step, he walked to the water, drank for a few seconds, lifted his dripping muzzle to stare straight at the slot in the hide, and was gone again in three bounds.

**[5]** The elephants came at five. Tsitsi heard them before she saw them: a deep, soft rumble that she felt in the bench beneath her rather than in her ears, and then the crack of a branch. They came out of the mopane in a long grey line, the old matriarch at the front, swinging her trunk from side to side like a blind woman's stick, the smallest calves almost invisible between the legs of their mothers. At the water's edge the line broke apart in a sudden rush. The young ones charged in, squealing, and the adults waded after them, sucking up trunkfuls of water and pouring it into their mouths with a sound like a bath emptying. One calf lay down in the shallows and rolled, kicking its legs in the air, until an aunt pushed it upright with her foot.

**[6]** For twenty minutes Tsitsi did not write a single word. She forgot the heat, the hard bench and her notebook. She found she was smiling so widely that her face ached.

**[7]** When the herd had drifted away into the dusk, Mr Mlambo stood up and stretched. "Well?" he said.

**[8]** Tsitsi looked down at her page. Under *Doves (2)* she had written nothing at all. "I'm sorry," she said. "I didn't record anything."

**[9]** The old guide laughed quietly. "Good," he said. "Tomorrow you will learn to watch and write at the same time. Today you needed to learn to watch."`;

const BUS = `Read Text C carefully, and then answer Questions 3 and 4.

**Text C: The long way home**

*In this story, Farai, a Form 4 student, is travelling by bus from Harare to Mutare for the school holidays when the bus breaks down.*

**[1]** The bus had been grumbling since Marondera, and just past Rusape, with a final shudder and a smell of hot metal, it gave up. It rolled to a stop on the gravel at the side of the road, and for a moment sixty-odd passengers sat in perfect silence, as though waiting for the engine to apologise. Then everyone began to speak at once.

**[2]** Farai, squeezed into a window seat beside a woman with a live chicken in a basket, pressed her forehead to the glass. Outside, the afternoon was white with heat. There was no village in sight, only a straight grey road, a line of msasa trees and a hill shaped like a sleeping dog. Her phone showed one bar of signal, then none. Her mother was expecting her at six.

**[3]** The driver, a heavy, unhurried man called Mr Banda, climbed down, lifted the engine cover and disappeared into it up to his waist. The conductor, a young man named Tich who had spent the whole journey shouting cheerful insults at other buses, suddenly became very serious. He walked up and down the aisle saying, "Ten minutes, ten minutes," in a voice that nobody believed, least of all himself.

**[4]** Ten minutes became an hour. The bus became an oven. Passengers spilled out onto the verge and arranged themselves in the thin shade of the trees according to some mysterious rule: the old men on a log, the young men in a noisy cluster round the engine offering advice nobody had asked for, the mothers with babies under the biggest tree. Farai found herself sitting on her suitcase next to the chicken woman, who introduced herself as Mbuya Rhoda and immediately offered her a boiled egg.

**[5]** It was strange how quickly the crowd became a kind of village. A man produced a bag of oranges and passed them round. Someone's radio found a station playing old jit songs, and two grandmothers began to dance, slowly and with great dignity, on the gravel. A schoolteacher from Nyanga organised the children into a game of rounders with a tennis ball and a stick. When a lorry stopped and its driver lent Mr Banda a spanner of exactly the right size, everyone cheered as if he had scored a goal in a cup final.

**[6]** Mbuya Rhoda, it turned out, had been travelling this road for forty years. She told Farai about the time the bus had broken down in a thunderstorm and the passengers had slept in a church, and about the year a baby had been born in the back row between Rusape and Odzi. "A breakdown is not the end of the world," she said, peeling an orange in one long spiral. "It is only the world slowing down so that you notice it."

**[7]** The sun was sliding behind the sleeping-dog hill when the engine finally coughed, caught and roared. The passengers poured back on board, laughing, swapping phone numbers, passing babies and bags from hand to hand. Tich leaned out of the door and banged the side of the bus twice, the way a rider might pat a tired horse.

**[8]** Farai reached Mutare three hours late. Her mother had been worried sick. But that night, telling the story at the kitchen table, Farai found that she could not stop smiling, and when her mother asked whether it had been a terrible journey, she was surprised to hear herself say no.`;

const RACE = `Read Text C carefully, and then answer Questions 3 and 4.

**Text C: The last hill**

*In this story, Rutendo, a Form 3 student from a rural school, runs in a national schools cross-country championship.*

**[1]** The starting line was a strip of white lime across a rugby field in Gweru, and Rutendo had never seen so many expensive running shoes in her life. Around her, girls from big town schools bounced on their toes in matching tracksuits, their coaches murmuring last instructions and handing them bottles of coloured drinks. Rutendo wore the school's only pair of spikes, borrowed from the Form 4 girl who had broken her wrist in June, and they were half a size too big. She had stuffed the toes with newspaper.

**[2]** At home in Mhondoro she trained on the dirt road to the business centre, running before school while the mist still lay in the vleis, with her younger brother pedalling beside her on an old bicycle and calling out the time from their father's watch. There were no tracks, no coaches and no coloured drinks. There were hills, though. Her teacher, Mr Gumbo, who had driven her to Gweru in the school's ancient pick-up, had told her to remember them. "They have hills here too," he said. "But you have more."

**[3]** The gun cracked and a hundred and twenty girls surged forward like water released from a dam. Rutendo was swallowed at once. Elbows jabbed her ribs; someone trod on her heel and nearly tore off a spike. By the end of the first lap she was somewhere near the back, gasping in a cloud of red dust, and a voice in her head was explaining, very reasonably, that girls like her did not win races like this.

**[4]** She ran anyway. Slowly, patiently, she began to pass people: a girl who had started too fast and was now walking with her hands on her hips, then two runners arguing about who had pushed whom, then a whole knot of matching tracksuits labouring up the first slope. Her breathing settled into the rhythm she knew from the Mhondoro road. Her legs remembered what they had been taught by a thousand mornings.

**[5]** The final lap ended with a long climb, a rutted track that twisted up between thorn bushes to the finish on the ridge. As Rutendo reached the bottom of it, she could count the runners ahead of her: seven. The leaders were already halfway up, their bright vests flickering between the bushes like birds. The hill rose in front of her like a wall. Her chest burned and her legs had turned to wet clay. Then she heard, from somewhere on the slope, a hoarse, unmistakable voice: "More hills, Rutendo! You have more hills!"

**[6]** She did not remember the climb afterwards, only pieces of it: the taste of dust, a thorn scratching her arm, the newspaper in her shoe working loose, the back of a yellow vest growing larger and larger until it was beside her and then behind. She passed four girls on that hill. At the top she was third, and she crossed the line with her arms flailing and her mouth wide open, and fell onto the grass.

**[7]** Mr Gumbo arrived a minute later, red-faced and wheezing from his run up the side of the slope. He did not say anything at first. He just stood over her, shaking his head and grinning, and then he took off his hat and fanned her face with it.

**[8]** "Third in the country," he said at last. "From Mhondoro. In borrowed shoes."

**[9]** Rutendo lay on her back and looked up at the enormous blue sky. She was thinking that next year, she would bring her own.`;

const RUINS = `Read Text C carefully, and then answer Questions 3 and 4.

**Text C: Stones that speak**

*In this account, a student describes a visit to Great Zimbabwe, near Masvingo, with a group of friends.*

**[1]** We set off from the camp at half past five, while the sky was still the colour of ash, because our guide, Mr Mutasa, had promised that the Hill Complex at sunrise was something we would remember all our lives. Five of us had come on the trip, school friends who had all grown up seeing a soapstone bird on the national flag, but none of us had ever been to the place it came from. We were, I think, expecting a few old walls.

**[2]** The path up the hill is narrow and steep, cut between enormous granite boulders, and in places it squeezes through gaps so tight that you have to turn sideways. Mr Mutasa climbed it like a man walking to his own kitchen, talking all the way. He explained that the builders had used the boulders rather than fighting them, fitting their walls between and around the great rocks so that it was hard to tell where nature stopped and human work began. Panting behind him, my friend Tapiwa muttered that the builders must have had stronger legs than us.

**[3]** At the top, we stopped talking. The sun came up over the hills to the east and poured into the valley below like honey into a bowl, and there, in the middle of it, lay the Great Enclosure: a vast curving wall of grey stone, its top edged with a zigzag pattern, so smooth and so certain that it looked as if it had grown out of the ground. Mist hung over the grass. A pair of hornbills flapped heavily across the valley. For a long moment, nobody reached for a phone.

**[4]** Later, we walked down to the Enclosure itself, and up close it was even more astonishing. The walls are made of thousands of granite blocks, each one shaped by hand and laid without any mortar at all, and yet they have stood for centuries. In places they are taller than a house and so thick at the base that two people could walk along the top side by side. Inside, a narrow passage runs between two high walls, and near its end stands the conical tower, solid all the way through, whose purpose people still argue about. I put my hand flat against the stone. It was already warm from the sun, and rough, and I thought about the hands that had shaped that block, and the ones that had lifted it into place.

**[5]** In the small museum we saw the famous birds, carved from soapstone and standing on tall columns, with eyes that seemed to watch us from very far away. Mr Mutasa told us that some had been taken out of the country long ago and returned only after many years, and that their homecoming had been celebrated. I had always thought of history as something in a textbook. Standing there, I understood that for some people it is a kind of family.

**[6]** On the drive back to Masvingo, we were quieter than usual. Tapiwa, who had complained about the path all morning, was looking at his photographs. "We learn about other countries' castles and pyramids at school," he said at last. "Why don't we come here?"

**[7]** Nobody had an answer. But I have been thinking about his question ever since, and I have decided that next time I come, I will not be bringing only four friends. I will bring my whole class.`;

concept("eng.reading.extended-response", { file: "exam/fle-p1q34", keyPrefix: "exam.fle-p1q34", applies: FLE }, (b) => {
  // =================================================================================================================
  // Item 1: The waterhole
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: SECS, concepts: C, hints: HINTS, explanation: EXPLAIN,
    stem: WATERHOLE,
    parts: [
      P.short({
        label: "(a)",
        stem: "**Question 3**\n\nFrom paragraph 4, what was the first animal to come and drink at the waterhole?",
        accepted: ["kudu", "a kudu", "the kudu", "kudu bull", "a kudu bull", "the kudu bull", "a bull kudu"],
        keywords: { all: ["kudu"] },
        model: "a kudu bull",
        wrong: ["doves"],
        explanation: "The doves stay in the tree; the first animal to drink is *a kudu bull*.",
      }),
      P.short({
        label: "(b)",
        stem: "From paragraph 5, out of what kind of trees did the elephants come?",
        accepted: ["mopane", "the mopane", "mopane trees", "the mopane trees", "mopane woodland", "mopane bush", "from the mopane"],
        keywords: { all: ["mopane"] },
        model: "mopane",
        wrong: ["msasa"],
        explanation: "*They came out of the mopane in a long grey line.*",
      }),
      P.mcq({
        label: "(c)",
        stem: "In paragraph 2, a pair of doves **bickered** in the dead tree. What does **bickered** mean?",
        options: [
          ["argued over small things", "Correct: to bicker is to quarrel in a petty, repetitive way, the only small sound in a still scene."],
          ["sang sweetly to each other", "Bickering is quarrelling, not singing."],
          ["slept side by side quietly", "Bickering involves noise and disagreement."],
          ["fed hungrily on seeds", "Nothing is said about feeding."],
        ],
        answer: "A",
        explanation: "**Bicker** means to argue about trivial things. The doves' petty squabbling emphasises that nothing important is happening.",
      }),
      P.mcq({
        label: "(d)",
        stem: "In paragraph 5, what is the **matriarch**?",
        options: [
          ["the female leader of the herd", "Correct: a matriarch is an older female who leads a family group; she walks at the front."],
          ["the largest male of the herd", "Matriarch comes from the Latin for mother; it is a female."],
          ["the youngest calf of the herd", "She is described as *old* and at the front."],
          ["a stranger from another herd", "She leads this herd's line out of the trees."],
        ],
        answer: "A",
        explanation: "A **matriarch** is a woman (or female animal) who heads a family. Elephant herds are led by an experienced older female.",
      }),
      P.manual({
        label: "(e)",
        marks: 2,
        stem: "Mr Mlambo told Tsitsi to bring *a great deal of silence*. Explain what the writer means by *The third, she was discovering, was harder to carry* (paragraph 1).",
        points: [
          "The third item is silence, which (unlike water and a notebook) is not an object you can carry: the writer is playing with the idea",
          "Tsitsi is finding it difficult to stay quiet / still / patient in the hide",
        ],
        modelAnswer: "The third thing is silence, which cannot really be carried like water or a notebook. The joke shows that Tsitsi is finding it hard to stay quiet, still and patient.",
        explanation: "The humour comes from treating silence as an object in a list. What it reveals is Tsitsi's restlessness.",
      }),
      P.manual({
        label: "(f)",
        marks: 2,
        stem: "Using your own words, explain what Mr Mlambo means when he says, *Animals do not arrive. They appear* (paragraph 3).",
        points: [
          "Animals come cautiously / silently out of the cover of the bush, so you do not see them approaching",
          "They seem to be suddenly there, so a watcher must look at the edges of the clearing, not the open water",
        ],
        modelAnswer: "Wild animals do not walk in openly; they move silently and carefully through the bush, so they seem to be there all of a sudden. That is why she should watch the edges, where they will first show themselves.",
        explanation: "The kudu in paragraph 4 illustrates his point: *a piece of the bush … simply detached itself and became a kudu bull*.",
      }),
      P.manual({
        label: "(g)",
        marks: 2,
        stem: "Why does Mr Mlambo say *Good* when Tsitsi admits that she *didn't record anything* (paragraphs 8 and 9)?",
        points: [
          "Her empty page shows that she was completely absorbed in watching the elephants",
          "He believes watching is the first / most important skill for a guide; recording can be learned later (*Tomorrow …*)",
        ],
        modelAnswer: "Her empty page proves she was totally absorbed in what she saw. For him, learning to watch properly matters most, and writing notes at the same time can be learned the next day.",
        explanation: "Tsitsi expects criticism, but the guide values her wonder: *Today you needed to learn to watch.*",
      }),
      P.manual({
        label: "(h)",
        type: "EXTENDED_RESPONSE",
        marks: 10,
        wordLimit: { min: 200, max: 250 },
        stem: LANG_STEM(2, "the long, empty first hour in the hide", 5, "the arrival of the elephants at the waterhole"),
        points: LANG_POINTS(
          2,
          [
            "*nothing happened, and it happened very slowly*: a humorous paradox; even emptiness seems to drag",
            "*heat pressed down*: heat as a heavy weight, oppressive",
            "roof *ticked and creaked like an old man's knees*: small, stiff, tired sounds; age and slowness",
            "doves *bickered*: only petty, trivial noise",
            "water *flat and blank*: lifeless, like an empty page",
            "mud *cracked plates that curled … like stale bread*: dry, old, left too long",
            "*felt foolish*: her disappointment and self-consciousness",
          ],
          5,
          [
            "*deep, soft rumble … felt in the bench*: vast size and power sensed through the body",
            "*crack of a branch*: sudden sharp sound, strength",
            "*long grey line*: orderly, solemn procession",
            "matriarch *swinging her trunk … like a blind woman's stick*: careful testing of the way, age and experience",
            "*line broke apart in a sudden rush*: change of pace, excitement",
            "*charged in, squealing*: playful energy of the young",
            "*sound like a bath emptying*: homely, comic, huge quantities of water",
            "calf *rolled, kicking its legs in the air* / aunt *pushed it upright with her foot*: childlike play, family care",
          ],
        ),
        modelAnswer:
          "In paragraph 2 the writer creates boredom with gentle humour. 'Nothing happened, and it happened very slowly' is a paradox: even the emptiness seems to drag. The heat 'pressed down', as if it were a heavy weight, and the roof 'ticked and creaked like an old man's knees', a simile suggesting stiffness and age, as if time itself were tired. The only life is two doves that 'bickered', a petty sound. The water lies 'flat and blank', like an empty page, and the mud curls 'like stale bread', something dry and left too long. No wonder Tsitsi 'felt foolish'.\n\nParagraph 5 bursts with life. The elephants are first a 'deep, soft rumble' that Tsitsi feels 'in the bench', which conveys their enormous size and power. They emerge in a 'long grey line', solemn and orderly, led by the matriarch 'swinging her trunk … like a blind woman's stick', an image of careful, experienced testing of the way. Then 'the line broke apart in a sudden rush': the pace changes as the young ones 'charged in, squealing', full of childish excitement. Drinking makes 'a sound like a bath emptying', a homely comparison that makes the reader smile, and the calf that 'rolled, kicking its legs in the air' until 'an aunt pushed it upright' shows a playful, caring family. The contrast between the two paragraphs mirrors Tsitsi's change from boredom to wonder.",
        explanation: "Strong answers choose short, precise phrases from each paragraph, explain what they mean, and then explore what they suggest. Linking the two paragraphs (dead stillness versus overflowing life) shows overview.",
      }),
      P.manual({
        label: "(i)",
        type: "EXTENDED_RESPONSE",
        marks: 20,
        wordLimit: { min: 250, max: 300 },
        stem:
          "**Question 4**\n\nImagine you are Tsitsi. That evening you write a **journal entry** about your first afternoon in the hide.\n\nIn your journal entry you should:\n\n- describe what you expected and how you felt during the first hour\n- explain what you saw and what Mr Mlambo taught you\n- reflect on what kind of guide you hope to become and how the afternoon has changed you." +
          Q4_TAIL,
        points: Q4_POINTS(
          ["Expectations and feelings in the first hour", "What she saw and what Mr Mlambo taught her", "Reflection on the guide she hopes to become and how she has changed"],
          [
            "Told to bring water, a notebook and silence; staying silent was harder than expected",
            "The heat, the hard bench and the creaking roof; only two quarrelling doves",
            "Writing *Doves (2)* and feeling foolish",
            "Advice to watch the edges because animals appear rather than arrive",
            "The kudu emerging from the bush, its turning ears and wary stare at the hide, then vanishing",
            "Feeling the elephants' rumble before seeing them; the matriarch leading the line",
            "Calves charging in, squealing; adults drinking; the rolling calf pushed up by an aunt",
            "Forgetting the heat and notebook, smiling until her face ached",
            "Apologising for recording nothing; Mr Mlambo's *Good* and his explanation",
          ],
          [
            "She had probably imagined constant action, like a wildlife film, and was impatient or disappointed",
            "She realises that patience and stillness are skills a guide must practise",
            "She understands the animals' caution and the need to respect them / keep the hide silent",
            "She now trusts and admires Mr Mlambo's way of teaching",
            "She hopes to pass on the same wonder to visitors, or plans to practise taking notes while watching tomorrow",
          ],
          "e.g. first person, past and present tenses, a date or time, private and reflective tone, feelings as well as events",
        ),
        modelAnswer:
          "**Tuesday night, staff quarters**\n\nI thought today would be like a wildlife programme: lions, drama, something happening every minute. Mr Mlambo told me to bring water, a notebook and 'a great deal of silence'. The first two were easy. The silence nearly defeated me.\n\nFor an hour nothing moved except two doves squabbling in a dead tree. The roof creaked in the heat, the bench grew harder and harder, and I wrote 'Doves (2)' in my notebook and felt ridiculous. I was secretly wondering whether I had chosen the wrong career.\n\nThen Mr Mlambo told me to stop staring at the water and watch the edges, because animals don't arrive, they appear. Minutes later a kudu bull seemed to grow out of the bushes. He stood frozen for ages, ears swivelling, then crept down, drank, stared straight at our hide and vanished. I finally understood: everything out here is listening.\n\nAt five the elephants came. I felt their rumble through the bench before I saw them. The old female led them out of the mopane, testing the ground with her trunk, and then the calves rushed into the water squealing. One rolled on its back like a toddler until its aunt shoved it up with her foot. I smiled so much my cheeks hurt, and I forgot my notebook completely.\n\nWhen I confessed that I had written nothing, I expected a lecture. Instead he laughed and said, 'Good. Today you needed to learn to watch.'\n\nI want to be that kind of guide: patient, quiet, able to make visitors see what I saw today, and humble enough to let the animals set the pace. Tomorrow I will learn to write and watch at once. Tonight I just want to remember.",
        explanation: "The best answers use many details from Text C but transform them into Tsitsi's private voice, and go beyond the text, for example explaining what she had expected and what kind of guide she now wants to be.",
      }),
    ],
  });

  // =================================================================================================================
  // Item 2: The long way home
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: SECS, concepts: C, hints: HINTS, explanation: EXPLAIN,
    stem: BUS,
    parts: [
      P.short({
        label: "(a)",
        stem: "**Question 3**\n\nFrom paragraph 1, just past which town did the bus break down?",
        accepted: ["Rusape", "past Rusape", "just past Rusape", "near Rusape"],
        keywords: { all: ["rusape"] },
        model: "Rusape",
        wrong: ["Marondera"],
        explanation: "*Just past Rusape … it gave up.* The bus had been *grumbling since Marondera*.",
      }),
      P.short({
        label: "(b)",
        stem: "From paragraph 4, what did Mbuya Rhoda offer Farai?",
        accepted: ["a boiled egg", "boiled egg", "an egg", "egg", "a hard-boiled egg"],
        keywords: { all: ["egg"] },
        model: "a boiled egg",
        wrong: ["an orange"],
        explanation: "She *immediately offered her a boiled egg*. The oranges came from another passenger.",
      }),
      P.mcq({
        label: "(c)",
        stem: "In paragraph 4, the passengers *spilled out onto the* **verge**. What is the **verge**?",
        options: [
          ["the strip of land beside a road", "Correct: the verge is the edge of the road, where they sit under the trees."],
          ["the steps up into the bus door", "They leave the bus and move away from it."],
          ["the middle of the tarred road", "They are on the gravel and in the shade of trees, not in the road."],
          ["the flat roof of the broken bus", "Passengers are not on the roof."],
        ],
        answer: "A",
        explanation: "A **verge** is the edge or border of a road. *Spilled out* suggests the passengers overflowing from the hot bus.",
      }),
      P.mcq({
        label: "(d)",
        stem: "In paragraph 5, two grandmothers dance *slowly and with great* **dignity**. What does **dignity** suggest about the way they dance?",
        options: [
          ["calm, graceful and self-respecting", "Correct: dignity is a serious, composed manner, which makes the dancing on gravel both touching and gently funny."],
          ["wild, careless and very noisy", "Dignity is the opposite of wild or careless."],
          ["shy, nervous and rather awkward", "Dignified people are composed, not nervous."],
          ["hurried, clumsy and comical", "They dance *slowly*, and dignity is not clumsy."],
        ],
        answer: "A",
        explanation: "**Dignity** means a calm, serious, self-respecting manner. The grandmothers turn a roadside wait into a graceful celebration.",
      }),
      P.manual({
        label: "(e)",
        marks: 2,
        stem: "How does the conductor, Tich, change in paragraph 3, and what does this suggest about the situation?",
        points: [
          "He changes from cheerful and joking (*shouting cheerful insults at other buses*) to very serious",
          "This suggests the breakdown is serious / he does not know how long it will take (*a voice that nobody believed, least of all himself*)",
        ],
        modelAnswer: "He stops being the cheerful joker who insulted other buses and becomes very serious, which suggests the breakdown is worse than he admits: even he does not believe his promise of 'ten minutes'.",
        explanation: "A sudden change in a cheerful character signals trouble; the detail *least of all himself* shows he is only pretending to be confident.",
      }),
      P.manual({
        label: "(f)",
        marks: 2,
        stem: "Using your own words, explain what Mbuya Rhoda means when she says, *It is only the world slowing down so that you notice it* (paragraph 6).",
        points: [
          "A delay forces people to stop hurrying (it is not a disaster)",
          "It gives them the chance to pay attention to / appreciate the people and the place around them (as the passengers do on the roadside)",
        ],
        modelAnswer: "She means that a delay stops us rushing, and that gives us a chance to look around and appreciate the people and places we would normally hurry past.",
        explanation: "Her wise, calm view is borne out by the story: the breakdown creates friendships and memories.",
      }),
      P.manual({
        label: "(g)",
        marks: 2,
        stem: "What does the final paragraph suggest about how Farai's feelings about the journey have changed?",
        points: [
          "At the time she was anxious / frustrated (no signal, her mother expecting her, three hours late)",
          "Looking back, she sees it as an enjoyable / memorable experience, and is surprised by her own positive feelings (*could not stop smiling*, *surprised to hear herself say no*)",
        ],
        modelAnswer: "During the breakdown she was worried about being late and unable to phone, but afterwards she realises she enjoyed it: she cannot stop smiling and is surprised to find it was not a terrible journey after all.",
        explanation: "Her surprise at her own answer shows that she has absorbed Mbuya Rhoda's lesson without noticing.",
      }),
      P.manual({
        label: "(h)",
        type: "EXTENDED_RESPONSE",
        marks: 10,
        wordLimit: { min: 200, max: 250 },
        stem: LANG_STEM(4, "the discomfort of the long wait and the way the passengers arrange themselves", 5, "the crowd turning into a community"),
        points: LANG_POINTS(
          4,
          [
            "*Ten minutes became an hour*: short sentence, ironic echo of Tich's promise; time dragging",
            "*The bus became an oven*: metaphor, unbearable heat",
            "*Passengers spilled out*: like liquid overflowing, crowded and relieved",
            "*thin shade*: little relief from the heat",
            "*according to some mysterious rule*: humorous, people naturally sort themselves",
            "*noisy cluster … offering advice nobody had asked for*: gentle mockery of the young men",
            "*immediately offered her a boiled egg*: instant, unasked-for kindness",
          ],
          5,
          [
            "*the crowd became a kind of village*: metaphor, strangers become a community",
            "*passed them round*: sharing",
            "*two grandmothers began to dance, slowly and with great dignity, on the gravel*: joy, humour, contrast with the setting",
            "*organised the children into a game of rounders*: people taking care of each other",
            "*a spanner of exactly the right size*: luck, help from strangers",
            "*cheered as if he had scored a goal in a cup final*: hyperbole/simile, shared celebration",
          ],
        ),
        modelAnswer:
          "In paragraph 4 the writer uses short, blunt sentences to show the wait growing worse. 'Ten minutes became an hour' ironically echoes Tich's empty promise, and 'The bus became an oven' is a metaphor that makes the heat seem unbearable, as if the passengers were being cooked. They 'spilled out', like liquid overflowing a pot, which suggests crowding and the relief of escaping. Yet the 'thin shade' offers little comfort. The writer adds humour: people sit 'according to some mysterious rule', as if society organises itself, and the young men give 'advice nobody had asked for', a gently mocking phrase. Mbuya Rhoda 'immediately' offers an egg, a first sign of kindness.\n\nIn paragraph 5 the mood changes completely. The metaphor 'the crowd became a kind of village' shows strangers turning into a community. Oranges are 'passed round', suggesting easy sharing, and two grandmothers dance 'slowly and with great dignity, on the gravel', a touching and amusing picture of joy in an unlikely place. A teacher 'organised the children', showing people taking responsibility for one another. Finally, when a lorry driver lends 'exactly the right size' spanner, everyone 'cheered as if he had scored a goal in a cup final'. This exaggerated simile captures the shared excitement and unity of the crowd. Together the paragraphs move from discomfort to celebration.",
        explanation: "Comment on how word choices create the impressions: discomfort and humour in paragraph 4, warmth and celebration in paragraph 5. Explaining a shift between paragraphs shows understanding of the whole text.",
      }),
      P.manual({
        label: "(i)",
        type: "EXTENDED_RESPONSE",
        marks: 20,
        wordLimit: { min: 250, max: 300 },
        stem:
          "**Question 4**\n\nImagine you are Tich, the conductor. The next day you write a **report** for the manager of the bus company about the breakdown.\n\nIn your report you should:\n\n- explain what happened and the problems the passengers faced\n- describe how the passengers and the crew dealt with the delay\n- suggest what the company should do to prevent breakdowns, or to handle them better, in future." +
          Q4_TAIL,
        points: Q4_POINTS(
          ["What happened and the passengers' problems", "How passengers and crew dealt with the delay", "Suggestions for preventing or handling breakdowns"],
          [
            "The engine had been struggling since Marondera and failed just past Rusape",
            "Sixty-odd passengers stranded in great heat; the bus too hot to sit in",
            "No village nearby; no phone signal, so people could not tell families",
            "The delay lasted hours; the bus reached Mutare about three hours late",
            "The driver worked on the engine; the conductor tried to reassure passengers",
            "Passengers sat in the shade; mothers with babies under the biggest tree",
            "Food was shared (eggs, oranges); music and dancing; a teacher organised games for the children",
            "A passing lorry driver lent the right spanner, which allowed the repair",
          ],
          [
            "The engine's warning signs should have been acted on earlier (regular servicing, checks before long trips)",
            "Buses should carry a full tool kit and spare parts, so that crews do not depend on strangers",
            "Carry drinking water / a first-aid kit for passengers stranded in heat",
            "A way of contacting the depot (e.g. a radio or a list of signal points) and of sending a relief bus",
            "Thank or recognise the passengers' patience; perhaps compensation or a discount for the delay",
          ],
          "e.g. a title, addressed to the manager, headings or clear sections, factual and formal register, recommendations at the end",
        ),
        modelAnswer:
          "**Report on the breakdown of the Harare–Mutare service**\n\n**To:** The Operations Manager\n**From:** T. Moyo, Conductor\n\n**What happened**\nThe engine had been labouring since Marondera, and shortly after Rusape it failed completely. Sixty-three passengers were stranded at the roadside for about three hours. Conditions were difficult: the afternoon was extremely hot, the bus quickly became unbearable to sit in, there was no village nearby and no mobile signal, so nobody could tell their families about the delay. We eventually reached Mutare three hours late.\n\n**How the delay was handled**\nThe driver, Mr Banda, worked on the engine throughout. I am afraid I told passengers the repair would take ten minutes, which was not honest, and I apologise. However, the passengers behaved admirably. They moved into the shade, with mothers and babies given the best spot. Food and fruit were shared, one passenger organised games for the children, and a radio kept spirits up. The repair was only possible because a passing lorry driver lent us the correct spanner, which we did not have.\n\n**Recommendations**\n1. The engine showed warning signs long before it failed. All buses should be serviced regularly and checked before long routes.\n2. Every bus should carry a complete tool kit and common spare parts, so that crews are not dependent on luck.\n3. Buses should carry drinking water and a first-aid kit for passengers stranded in the heat.\n4. Crews need a reliable way of contacting the depot so that a relief bus can be sent.\n5. I suggest a letter of thanks, or a discount on their next journey, for the passengers whose patience made a difficult day manageable.\n\nT. Moyo",
        explanation: "A report needs a clear, factual structure and a formal register. The strongest answers use the details from Text C and go further, for example recommending servicing and tool kits because the story shows what was missing.",
      }),
    ],
  });

  // =================================================================================================================
  // Item 3: The last hill
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: SECS, concepts: C, hints: HINTS, explanation: EXPLAIN,
    stem: RACE,
    parts: [
      P.short({
        label: "(a)",
        stem: "**Question 3**\n\nFrom paragraph 1, in which town was the championship held?",
        accepted: ["Gweru", "in Gweru"],
        keywords: { all: ["gweru"] },
        model: "Gweru",
        wrong: ["Mhondoro"],
        explanation: "*A rugby field in Gweru.* Mhondoro is Rutendo's home area.",
      }),
      P.short({
        label: "(b)",
        stem: "From paragraph 6, in what position did Rutendo finish the race?",
        accepted: ["third", "3rd", "3", "third place", "3rd place", "in third place", "came third", "she came third", "she was third"],
        model: "third",
        wrong: ["seventh"],
        explanation: "*At the top she was third.* Seven was the number of runners ahead of her at the foot of the hill.",
      }),
      P.mcq({
        label: "(c)",
        stem: "In paragraph 3, the runners **surged** forward. What does **surged** mean?",
        options: [
          ["rushed forward powerfully", "Correct: a surge is a sudden powerful forward movement, like the water from a dam in the simile."],
          ["walked forward nervously", "The pace is sudden and forceful, not cautious."],
          ["fell over one another", "There is pushing, but surged means moving forward with force."],
          ["stood still in shock", "The gun has fired; they move at once."],
        ],
        answer: "A",
        explanation: "**Surge** suggests a powerful, sudden rush. The simile *like water released from a dam* reinforces it.",
      }),
      P.mcq({
        label: "(d)",
        stem: "In paragraph 4, a group of runners was **labouring** up the first slope. What does **labouring** mean?",
        options: [
          ["moving with great effort", "Correct: they are struggling, which is why Rutendo can overtake them."],
          ["chatting happily together", "Labouring means hard effort, not chatting."],
          ["running very fast and easily", "If they were fast she could not pass them."],
          ["stopping to rest and drink", "They are still moving, though slowly."],
        ],
        answer: "A",
        explanation: "**Labour** is hard work. The town runners struggle on the hill where Rutendo is strong.",
      }),
      P.manual({
        label: "(e)",
        marks: 2,
        stem: "Give **two** details from paragraph 1 which show that Rutendo had fewer advantages than the other runners.",
        points: [
          "Any one of: she wore borrowed spikes / the school's only pair / they were too big and stuffed with newspaper / she had no coach giving instructions or drinks (while others had matching tracksuits, coaches, expensive shoes, coloured drinks)",
          "A second, different detail",
        ],
        modelAnswer: "Her spikes were borrowed and half a size too big, so she had stuffed newspaper in the toes, while the other girls had expensive shoes and coaches handing them drinks.",
        explanation: "Any two separate details showing the difference in resources earn the marks.",
      }),
      P.manual({
        label: "(f)",
        marks: 2,
        stem: "Explain what Mr Gumbo means when he says, *They have hills here too. But you have more* (paragraph 2).",
        points: [
          "Rutendo has trained on many more hills (on the Mhondoro road) than the town runners",
          "So she will be stronger on the climbs than her rivals: hills are her advantage / he is giving her confidence",
        ],
        modelAnswer: "He means that because she has trained on hilly roads every day at home, she has far more experience of climbing than the town girls, so the hills will be her advantage.",
        explanation: "The words return in paragraph 5 as a rallying cry, which shows how important this idea is to the story.",
      }),
      P.manual({
        label: "(g)",
        marks: 2,
        stem: "In paragraph 3, *a voice in her head was explaining, very reasonably, that girls like her did not win races like this*. What does this suggest about Rutendo's feelings at this point?",
        points: [
          "She doubts herself / feels she does not belong among the richer, better-equipped town runners",
          "The doubt seems logical and convincing (*very reasonably*), so it is hard to resist: she is close to giving up",
        ],
        modelAnswer: "She is full of self-doubt and feels that a poor rural girl does not belong in this race; the doubt sounds so sensible that it threatens to make her give up.",
        explanation: "*Very reasonably* is ironic: the voice sounds sensible but is wrong, as the rest of the story proves.",
      }),
      P.manual({
        label: "(h)",
        type: "EXTENDED_RESPONSE",
        marks: 10,
        wordLimit: { min: 200, max: 250 },
        stem: LANG_STEM(3, "the chaos and difficulty of the start of the race", 5, "the challenge of the final hill and Rutendo's exhaustion"),
        points: LANG_POINTS(
          3,
          [
            "*The gun cracked*: sharp, sudden sound",
            "*surged forward like water released from a dam*: simile of an overwhelming, unstoppable force",
            "*Rutendo was swallowed at once*: metaphor, she disappears, helpless and small",
            "*Elbows jabbed her ribs* / *trod on her heel and nearly tore off a spike*: physical violence, discomfort, the borrowed shoe at risk",
            "*gasping in a cloud of red dust*: breathlessness, choking, being left behind",
            "*a voice … very reasonably*: personified self-doubt, ironic",
          ],
          5,
          [
            "*rutted track that twisted up between thorn bushes*: rough, painful, difficult route",
            "*bright vests flickering between the bushes like birds*: leaders far ahead, light and hard to catch",
            "*The hill rose in front of her like a wall*: simile, seemingly impossible obstacle",
            "*Her chest burned*: pain, effort",
            "*legs had turned to wet clay*: metaphor, heavy, weak, shapeless",
            "*a hoarse, unmistakable voice*: Mr Gumbo's effort and loyalty; turning point",
          ],
        ),
        modelAnswer:
          "In paragraph 3 the writer makes the start feel chaotic and overwhelming. 'The gun cracked' is abrupt and sharp, and the runners 'surged forward like water released from a dam', a simile suggesting an unstoppable flood. Rutendo 'was swallowed at once', a metaphor that makes her seem tiny and helpless, as if the crowd had eaten her. The verbs are violent: elbows 'jabbed' and someone 'trod on her heel and nearly tore off a spike', reminding us how fragile her borrowed equipment is. 'Gasping in a cloud of red dust' conveys breathlessness and being left behind, and her doubt becomes a voice speaking 'very reasonably', which makes it sound convincing and dangerous.\n\nIn paragraph 5 the challenge becomes physical and enormous. The 'rutted track that twisted up between thorn bushes' sounds rough and painful. The leaders' 'bright vests flickering between the bushes like birds' make them seem light, quick and almost impossible to catch. The simile 'The hill rose in front of her like a wall' presents the climb as a barrier, and her exhaustion is vivid: 'Her chest burned' and her legs 'had turned to wet clay', a metaphor for heavy, weak, shapeless limbs. Then a 'hoarse, unmistakable voice' cuts through: hoarse because Mr Gumbo has been shouting and running, unmistakable because it is the voice of someone who believes in her. It marks the turning point.",
        explanation: "Choose short, precise quotations and say what each suggests about Rutendo's experience. Comparing the start and the climb shows how the writer builds tension towards the climax.",
      }),
      P.manual({
        label: "(i)",
        type: "EXTENDED_RESPONSE",
        marks: 20,
        wordLimit: { min: 250, max: 300 },
        stem:
          "**Question 4**\n\nImagine you are a journalist writing for the schools page of a national newspaper. After the race you **interview** Rutendo. Write the words of the interview.\n\nIn your interview you should ask Rutendo about:\n\n- how she trained and the difficulties she faced before the race\n- what happened during the race and how she felt\n- her hopes for the future and her advice to young athletes from rural schools." +
          Q4_TAIL,
        points: Q4_POINTS(
          ["Training and difficulties before the race", "Events of the race and her feelings", "Future hopes and advice to rural athletes"],
          [
            "Training before school on the dirt road in Mhondoro, in the morning mist",
            "Her brother cycling beside her calling out times from their father's watch",
            "No track, coach or sports drinks; borrowed spikes too big, stuffed with newspaper",
            "Mr Gumbo drove her in the old pick-up and told her she had more hills",
            "The crowded, rough start; being near the back after the first lap; self-doubt",
            "Gradually overtaking tired runners; finding her home rhythm",
            "Seven runners ahead at the foot of the final hill; burning chest, heavy legs",
            "Mr Gumbo's shout; passing four girls on the hill; finishing third and collapsing",
          ],
          [
            "Her feelings about competing against well-equipped town schools (nervous, out of place, then proud)",
            "What third place means for her school or community",
            "Hopes for next year: her own shoes, a higher place, a scholarship or national team",
            "Advice: train on hills, be patient and pace yourself, ignore the voice of doubt, value supportive teachers",
            "A point the journalist develops, e.g. the need for equipment or sponsorship for rural schools",
          ],
          "e.g. a short introduction, questions and answers clearly set out, a friendly professional interviewer and a natural, personal voice for Rutendo",
        ),
        modelAnswer:
          "*A rural runner stunned the national cross-country championship in Gweru on Saturday. We spoke to Rutendo, a Form 3 student from Mhondoro.*\n\n**Congratulations on third place! How did you prepare?**\nThank you! I trained every morning before school on the dirt road to our business centre. My little brother rode beside me on an old bicycle, shouting out my times from our father's watch. We have no track and no coach, but we have a lot of hills.\n\n**What difficulties did you face?**\nEquipment, mostly. I ran in the school's only spikes, borrowed from an injured Form 4 girl. They were too big, so I filled the toes with newspaper. On the start line, surrounded by girls in matching tracksuits, I felt I didn't belong.\n\n**What happened when the race started?**\nIt was chaos. I was pushed, elbowed and nearly lost a shoe. After one lap I was near the back, choking on dust, and part of me said I had no chance. But I kept going, found my usual rhythm and started passing people.\n\n**And the final hill?**\nSeven girls were ahead and my legs felt like mud. Then I heard Mr Gumbo shouting, 'You have more hills!' I don't really remember the climb. I passed four girls and just fell over at the finish.\n\n**What next?**\nNext year I want to come back in my own shoes and finish higher. I'd love to run for Zimbabwe one day.\n\n**Any advice for athletes from rural schools?**\nDon't believe the voice that says you can't win. Train on the hills you have, start patiently, and listen to the teachers who believe in you. And schools, please help us find proper shoes!",
        explanation: "An interview must sound like two real voices. Use the details from Text C and develop them: Rutendo can reveal feelings and hopes that the story only hints at.",
      }),
    ],
  });

  // =================================================================================================================
  // Item 4: Stones that speak
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: SECS, concepts: C, hints: HINTS, explanation: EXPLAIN,
    stem: RUINS,
    parts: [
      P.short({
        label: "(a)",
        stem: "**Question 3**\n\nFrom paragraph 5, what material were the famous birds carved from?",
        accepted: ["soapstone", "from soapstone", "soap stone"],
        keywords: { all: ["soapstone"] },
        model: "soapstone",
        wrong: ["granite"],
        explanation: "*Carved from soapstone.* Granite is the material of the walls.",
      }),
      P.short({
        label: "(b)",
        stem: "From paragraph 3, what kind of birds flew across the valley at sunrise?",
        accepted: ["hornbills", "hornbill", "a pair of hornbills", "two hornbills", "pair of hornbills"],
        keywords: { all: ["hornbill"] },
        model: "hornbills",
        wrong: ["eagles"],
        explanation: "*A pair of hornbills flapped heavily across the valley.*",
      }),
      P.mcq({
        label: "(c)",
        stem: "In paragraph 4, up close the Enclosure was *even more* **astonishing**. What does **astonishing** mean?",
        options: [
          ["extremely surprising and impressive", "Correct: the writer is amazed by the size and skill of the walls."],
          ["rather dull and ordinary to see", "The whole paragraph expresses amazement, not boredom."],
          ["slightly frightening and gloomy", "Nothing in the description is frightening."],
          ["badly damaged and falling apart", "The walls *have stood for centuries*."],
        ],
        answer: "A",
        explanation: "**Astonishing** means so surprising that it amazes. *Even more* shows the amazement growing from the first view in paragraph 3.",
      }),
      P.mcq({
        label: "(d)",
        stem: "In paragraph 3, why does the writer say that *nobody reached for a phone*?",
        options: [
          ["They were too amazed by the view to think of it.", "Correct: the stillness shows they were overwhelmed by the sight; the moment mattered more than a photo."],
          ["Their phones had no signal on top of the hill.", "Signal is not mentioned, and photos need no signal."],
          ["Mr Mutasa had told them not to take any photos.", "There is no such rule; Tapiwa later looks at his photographs."],
          ["They were too tired after the climb to move.", "They are silent from wonder, not exhaustion."],
        ],
        answer: "A",
        explanation: "For teenagers, not reaching for a phone is a sign of complete absorption: *At the top, we stopped talking.*",
      }),
      P.manual({
        label: "(e)",
        marks: 2,
        stem: "Using your own words, explain how the builders made use of the boulders on the hill (paragraph 2).",
        points: [
          "They worked with the rocks rather than removing / struggling against them",
          "They built their walls into the gaps and around the rocks, so that natural and built parts blend together (it is hard to see where one ends)",
        ],
        modelAnswer: "Instead of clearing the huge rocks away, the builders incorporated them, slotting their walls into the spaces between and around them so that the natural stone and the human building merge.",
        explanation: "Own words: replace *rather than fighting them* and *where nature stopped and human work began* with your own expressions.",
      }),
      P.manual({
        label: "(f)",
        marks: 2,
        stem: "*We were, I think, expecting a few old walls* (paragraph 1). What does this sentence suggest about the friends' expectations, and how does the rest of the text show that these expectations were wrong?",
        points: [
          "They expected something unremarkable / boring / unimpressive",
          "They are amazed instead: e.g. they fall silent at the top, find the Enclosure *astonishing*, are quiet on the drive back, the writer wants to bring the whole class",
        ],
        modelAnswer: "It suggests they expected something dull and unimpressive. Instead they are struck silent by the view, find the walls astonishing, and the writer decides to bring the whole class next time.",
        explanation: "The understatement *a few old walls* sets up the contrast with the wonder that follows.",
      }),
      P.manual({
        label: "(g)",
        marks: 2,
        stem: "Explain what the writer means by *for some people it is a kind of family* (paragraph 5).",
        points: [
          "History is personal and emotional, not just facts in a textbook: it connects people to their ancestors / identity",
          "People feel about the returned birds as they would about family members coming home (their homecoming was celebrated)",
        ],
        modelAnswer: "The writer realises that history can be personal: it links people to their ancestors and identity, so the birds' return felt like relatives coming home.",
        explanation: "The sentence contrasts *something in a textbook* with *a kind of family*: distant facts versus living connection.",
      }),
      P.manual({
        label: "(h)",
        type: "EXTENDED_RESPONSE",
        marks: 10,
        wordLimit: { min: 200, max: 250 },
        stem: LANG_STEM(3, "the view from the top of the hill at sunrise", 4, "the walls of the Great Enclosure seen up close"),
        points: LANG_POINTS(
          3,
          [
            "*we stopped talking*: short sentence, awe",
            "sun *poured into the valley below like honey into a bowl*: simile, slow, warm, golden, rich",
            "*vast curving wall*: size and grace",
            "*so smooth and so certain*: repetition, confidence and perfection of the craft",
            "*as if it had grown out of the ground*: natural, belonging, timeless",
            "*Mist hung over the grass* / hornbills *flapped heavily*: stillness, slow peaceful movement",
            "*nobody reached for a phone*: absorption",
          ],
          4,
          [
            "*even more astonishing*: amazement grows",
            "*thousands of granite blocks, each one shaped by hand*: scale and human labour",
            "*without any mortar at all, and yet they have stood for centuries*: skill and endurance",
            "*taller than a house* / *two people could walk along the top side by side*: familiar comparisons for size",
            "*solid all the way through, whose purpose people still argue about*: mystery",
            "*warm from the sun, and rough*: touch, the stone feels alive",
            "*the hands that had shaped that block*: imagined connection with the builders",
          ],
        ),
        modelAnswer:
          "In paragraph 3 the short sentence 'At the top, we stopped talking' shows awe before anything is described. The sun 'poured into the valley below like honey into a bowl', a simile suggesting slow, golden, rich light filling the landscape, something sweet and precious. The Great Enclosure is a 'vast curving wall', combining size with grace, and the repetition in 'so smooth and so certain' conveys confident perfection. 'As if it had grown out of the ground' makes the building seem natural and timeless, as if it belongs to the earth. The mist that 'hung' and the hornbills that 'flapped heavily' add stillness and slow movement, and 'nobody reached for a phone' shows complete absorption.\n\nIn paragraph 4 the impression changes from beauty to admiration for human skill. 'Even more astonishing' shows the wonder growing. 'Thousands of granite blocks, each one shaped by hand' stresses the enormous labour, and 'without any mortar at all, and yet they have stood for centuries' highlights the builders' skill and the walls' endurance. Everyday comparisons, 'taller than a house' and wide enough for 'two people' to walk side by side, help the reader picture the scale. The tower 'whose purpose people still argue about' adds mystery. Finally, the stone feels 'warm from the sun, and rough', almost alive, and the writer imagines 'the hands that had shaped that block', creating a personal link with the builders.",
        explanation: "Paragraph 3 creates awe through imagery of light and stillness; paragraph 4 creates admiration through scale, touch and the idea of human hands. Explain effects, not just techniques.",
      }),
      P.manual({
        label: "(i)",
        type: "EXTENDED_RESPONSE",
        marks: 20,
        wordLimit: { min: 250, max: 300 },
        stem:
          "**Question 4**\n\nImagine you are Tapiwa. When you return to school, you write an **article** for the school magazine persuading students and teachers that every class should visit Great Zimbabwe.\n\nIn your article you should:\n\n- describe what you saw and experienced during the visit\n- explain what students can learn there that they cannot learn from a textbook\n- suggest how a class trip could be organised and why it would be worth the effort." +
          Q4_TAIL,
        points: Q4_POINTS(
          ["What he saw and experienced", "What can be learned there but not from a textbook", "How a trip could be organised and why it is worth it"],
          [
            "Early start in the dark; the steep, narrow path between huge granite boulders",
            "Walls built into and around the boulders, so nature and building blend",
            "The sunrise view of the Great Enclosure from the hill, the mist and the hornbills; everyone silent",
            "The huge walls of hand-shaped granite blocks with no mortar, standing for centuries",
            "The narrow passage and the solid conical tower whose purpose is still debated",
            "The soapstone birds in the museum; some taken abroad and later returned and celebrated",
            "A knowledgeable guide; his own complaints about the climb; his question about castles and pyramids",
          ],
          [
            "Seeing and touching the stone gives a sense of the builders' skill and labour that a picture cannot",
            "Pride in Zimbabwe's own history and identity rather than only studying other countries",
            "Links to subjects such as History, Geography or Art (building methods, landscape, carving)",
            "Practical plans: travel to Masvingo, camping, booking a guide, fundraising, an early start for sunrise",
            "Persuasive judgement, e.g. a short trip near home is affordable and would be remembered for life",
          ],
          "e.g. a headline, an engaging opening that addresses readers, persuasive techniques (direct address, rhetorical questions), a lively but appropriate register",
        ),
        modelAnswer:
          "**Forget the pyramids: our greatest wonder is three hours away**\n\nBe honest: when you hear 'Great Zimbabwe', do you imagine a few crumbling walls? So did I, until our trip last month.\n\nWe started climbing the Hill Complex at half past five, squeezing sideways between boulders bigger than buses. I complained all the way, but our guide pointed out something amazing: the builders didn't clear the rocks, they built around them, so you cannot tell where nature ends and human work begins. Then the sun rose, flooding the valley with golden light, and below us lay the Great Enclosure, a vast curved wall so perfect it looked as if it had grown there. Five teenagers, and not one of us touched a phone.\n\nUp close, it is even more impressive. Every one of thousands of granite blocks was shaped by hand and laid without mortar, yet the walls have stood for centuries. When I put my palm against the warm stone, I thought about the people who lifted it. No textbook diagram can give you that feeling. And in the museum, standing before the soapstone birds that were once taken abroad and brought home, I understood that this history is ours, part of who we are.\n\nWe study castles and pyramids in other countries. Why not our own wonder, only a few hours' drive away?\n\nHere is my proposal. Each class could visit once, travelling by school bus to Masvingo and camping nearby to save money. A sponsored walk could cover the guide's fee. Go at sunrise; it is worth the early start.\n\nOne morning at Great Zimbabwe will teach you more about our past than a term of notes. Let's make sure nobody leaves this school without seeing it.",
        explanation: "A persuasive article combines vivid details from Text C with arguments and practical suggestions that go beyond it. Address readers directly and keep a lively but appropriate register.",
      }),
    ],
  });
});
