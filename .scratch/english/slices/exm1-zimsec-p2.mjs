// Slice EXM1: ZIMSEC O-Level English Paper 2 (full reading paper, 50 marks: Section A comprehension + summary 40,
// Section B language in context 10). Original passages.
import { concept, P, ZIM } from "../lib.mjs";

const C = [
  "eng.reading.explicit-meaning",
  "eng.reading.inference",
  "eng.reading.vocabulary-in-context",
  "eng.reading.own-words",
  "eng.reading.writers-craft",
  "eng.reading.tone-attitude",
  "eng.summary.writing",
  "eng.summary.selecting-points",
];
const SECS = 7200;
const HINTS = [
  "Read the whole passage once for the story or argument, then again with the questions beside you.",
  "Section A answers come from the passage; in Section B, use the passage only as context for the language task.",
  "In the summary, select relevant points first, then write them in your own words in continuous prose.",
];
const INSTR = "Read the passage carefully and then answer **all** the questions. **Section A** (questions (a) to (n)) carries 40 marks; **Section B** (questions (o) to (t)) carries 10 marks.";
const EXPRESSION = (wordsMax) => [
  `Expression: written in continuous prose in the candidate's own words as far as possible, clearly linked, accurate, and within ${wordsMax} words`,
  3,
  [
    "3: fluent continuous prose, consistently own words, accurate, within the limit",
    "2: mostly own words with some lifting, generally accurate",
    "1: heavy lifting or note form, or frequent errors",
    "0: copied sentences, a list, or far over the limit",
  ],
];

const FLOOD = `${INSTR}

**The River That Came at Night**

**[1]** The rain had been falling for three days when Tinashe first heard the river. It was not the usual murmur that drifted across the fields on summer evenings, but a deep, steady growl, like a lorry climbing a hill that never ended. His grandmother, who had lived beside the Musengezi all her seventy years, put down the pot she was scrubbing and listened with her head on one side. "Pack the blankets," she said quietly. "And the school books. Wrap them in plastic."

**[2]** Tinashe was fifteen and thought himself too old to be frightened, but his hands shook as he tied the bundles. Their homestead stood on a low rise a kilometre from the riverbank: three round huts, a granary on stilts and a kitchen garden that his grandmother guarded more fiercely than any treasure. In all the floods she remembered, the water had never climbed past the edge of the garden. Still, she made him carry the bags of seed maize up the ladder into the granary, and she hung the chickens' basket from the highest roof beam.

**[3]** The water came after midnight. Tinashe woke to a hissing sound and swung his feet off the mat into cold water that reached his ankles. By the light of the paraffin lamp he saw it pouring under the door, brown and swirling, carrying leaves, a plastic cup and the broken handle of a hoe. Within minutes it was at his knees. His grandmother was already awake, sitting upright on her bed with her walking stick across her lap, as calm as if she were waiting for a bus.

**[4]** "We go to the granary," she said. Getting her there was the hardest thing Tinashe had ever done. The yard had become a river, and the current tugged at his legs like a dog worrying a rope. He went first with the lamp held high, then came back for her, and she leaned on his shoulder and on her stick, step after careful step, scolding the water under her breath as though it were a disobedient child. At the ladder he lifted her, more easily than he had expected, for she was as light as a bundle of dry grass. They spent the rest of the night among the seed bags, listening to the walls of the kitchen hut dissolve and fall, one wet thud at a time.

**[5]** Dawn showed them a world Tinashe did not recognise. Where the fields had been, there was a sheet of moving brown water, broken only by the tops of trees and the roofs of the nearest homesteads. A goat stood on one of those roofs, bleating indignantly. The garden had vanished. His grandmother looked at the place where it had been for a long time and said nothing at all, and that silence frightened him more than the water had.

**[6]** Help came in the middle of the morning. Two young men from the next village, the Chiweshe brothers, paddled towards them in a dugout canoe, steering around fences and the drowned tops of maize plants. They had been on the water since sunrise, ferrying neighbours to the primary school on the hill, the only building for miles that stood on high ground. Tinashe's grandmother refused to leave until they had taken the seed maize too. "Without seed," she told the brothers firmly, "there is no next year." The brothers looked at each other, then laughed and made room for the bags.

**[7]** The school had become a village. Families slept in the classrooms on desks pushed together, women cooked in the yard on fires of broken branches, and the headmaster, Mr Gwatidzo, kept a register of every person who arrived, as carefully as he kept the attendance book in term time. When a truck from the district office came on the fourth day with maize meal, beans and blankets, it was his register that made sure each family received its share.

**[8]** The water took nearly two weeks to go down. When Tinashe and his grandmother finally walked home, the mud sucked at their feet and the air smelt of rotting leaves. Two of the huts were still standing; the kitchen was a heap of red earth. His grandmother walked slowly to where the garden had been, bent down and pushed a finger into the soil. Then she straightened up, and for the first time since the flood, she smiled.

**[9]** "The river has brought us new soil," she said. "Fetch the seed."`;

const MARKET = `${INSTR}

**Dawn at Mbare Musika**

**[1]** My aunt, Mainini Rudo, has sold tomatoes at Mbare Musika for as long as I can remember, and in the August holiday she finally agreed to take me with her. "You will see Harare before Harare is awake," she promised. At half past three she shook me from sleep, and by four we were squeezed into the back of a pick-up truck with twenty crates of tomatoes, three other traders and a cockerel in a cardboard box that nobody claimed.

**[2]** The market announced itself long before we reached it. First came the smell: diesel, wood smoke and the sweet, heavy scent of ripe fruit. Then came the noise, a low roar made of a thousand separate sounds: engines idling, porters shouting for the road to be cleared, radios tuned to different stations, the slap of sandals on wet concrete. When the truck finally stopped, the darkness was crowded with moving shapes, as busy as an anthill that someone has kicked.

**[3]** Lorries from every corner of the country were being unloaded under the yellow glare of a few tall lamps. There were cabbages from Nyanga stacked like green cannonballs, sacks of potatoes, bananas from the Honde Valley still wrapped in their leaves, and mountains of oranges glowing like coals. Porters with wooden push-carts threaded between the lorries at astonishing speed, each cart loaded so high that only the pusher's legs could be seen beneath it. One of them, a thin young man in a torn football shirt, winked at me as he passed, steadying a dozen sacks of onions with one hand.

**[4]** Mainini Rudo's place is a square of concrete between a woman who sells dried fish and a man who sells nothing but chillies. She swept it with a bundle of twigs, spread a sheet of plastic and began to build a pyramid of tomatoes, choosing each one with the care of a jeweller arranging stones. The firmest and reddest went on the outside; the soft ones were hidden at the back, to be sold cheaply at the end of the day. "People buy with their eyes first," she told me, "and with their money second."

**[5]** By five o'clock the buyers had arrived: owners of small shops in the high-density suburbs, women who sell vegetables at street corners, cooks from boarding schools with long lists, and a few early housewives who wanted the best prices. Bargaining here is not a quarrel but a kind of song. The buyer names an insulting price; the seller clutches her chest as though wounded; the buyer turns to walk away; the seller calls him back with a smile. I watched my aunt do it fifty times that morning and never once lose her temper or her profit.

**[6]** The sky turned from black to grey and then to a pale, washed pink above the bus terminus. With the light came colour: the bright headscarves of the women traders, the blue plastic of the crates, the red of my aunt's tomatoes, which seemed to glow brighter as the sun rose. Small boys moved through the crowd selling boiled eggs and sweet tea from flasks, and a preacher with a loud-hailer stood on an upturned crate, competing for attention with a man selling cellphone covers.

**[7]** By eight o'clock I was exhausted. My feet ached, my hands smelt of tomato leaves and my ears rang. But my aunt was only beginning to relax. She counted her money twice, wrapped it in a handkerchief and tucked it deep inside her blouse. Then she bought two buns and two bottles of orange drink from a passing vendor and handed one of each to me.

**[8]** "Now you have seen where your food comes from," she said. I looked around at the trampled cabbage leaves, the tired porters resting on their empty carts and the traders already packing up, and I thought of the plates of sadza and relish that appear on tables all over the city every evening as if by magic. It is not magic, I realised. It is this: thousands of people working in the dark while the rest of us sleep.`;

const VLEI = `${INSTR}

**The Sponge Beneath the City**

**[1]** Walk across an open, grassy area of Harare in the middle of the rainy season and your shoes may sink into soft, wet ground. Many people regard such places as wasteland, useful only for growing a little rice or maize, or as empty plots waiting for houses. In fact, they are among the most valuable pieces of land a city has. They are wetlands, known locally as vleis or matoro (vlei comes from an Afrikaans word for a shallow, marshy hollow), and they do work for the city that no machine could do as cheaply.

**[2]** A wetland behaves like a giant sponge. During the rains, its thick grasses and deep, spongy soils soak up water and hold it, instead of letting it rush away in floods. Over the following months the stored water seeps slowly downwards into the rocks below, refilling the underground supplies that feed boreholes and wells, and sideways into streams that keep flowing long after the last storm. In a city where many households rely on boreholes when the taps run dry, this slow release is not a luxury; it is a lifeline.

**[3]** Wetlands also clean water. As it trickles through reeds and grasses, mud settles out, and many pollutants are trapped or broken down by plants and tiny organisms in the soil. Harare's main water supply comes from lakes downstream of the city, so every wetland that filters dirty runoff before it reaches the rivers makes the work of the water treatment plants a little easier and a little cheaper.

**[4]** There are other benefits too. Wetlands are home to frogs, birds and insects that are rarely seen elsewhere in the city, and they provide quiet green spaces in crowded suburbs. They also reduce flooding in low-lying areas by slowing the flow of storm water, giving drains and rivers time to cope. For people living nearby, they have long been a source of thatching grass, reeds for mats and, in small amounts, food from carefully tended gardens.

**[5]** Yet wetlands around many growing towns are disappearing. Some have been drained and built on, because flat, open land near roads and services is attractive to developers. Others are being dug up for bricks, or used as dumping grounds for rubbish and building rubble. Large-scale cultivation, with deep ploughing and heavy use of fertiliser, also damages the spongy soils on which a wetland depends. Once that soil has been compacted or covered, it rarely recovers.

**[6]** The results of this loss are not always seen at once, which is part of the problem. A family who buys a house built on a drained vlei may notice nothing in the first dry season. Then the rains come, water rises through the floor, cracks appear in the walls and the toilet backs up. Some families have been forced to leave homes they spent years saving for. Further away, residents notice that their borehole runs dry earlier each year, without realising that the cause may be a wetland that was covered with concrete several kilometres up the slope.

**[7]** Protecting wetlands does not mean keeping people out of them. It means using them wisely. Communities can harvest grass and reeds without destroying the roots, grow small gardens on the edges rather than in the wettest centre, and keep rubbish and rubble out. Residents' associations can organise clean-up days and report illegal dumping to the council. Town planners can mark wetlands clearly on maps and refuse permission to build on them. Schools can adopt a nearby vlei, record the birds and plants that live there and teach younger children why it matters.

**[8]** It is easy to admire a dam, with its tall concrete wall and wide blue lake. It is harder to admire a patch of soggy grass. But the humble wetland quietly stores, cleans and releases water every day of the year, asking nothing in return. If we fill it with bricks and rubbish, we will discover its value only when the taps and boreholes run dry, and by then it may be too late.`;

const MBIRA = `${INSTR}

**The Keys of Sekuru Mukanya**

**[1]** Kundai was sent to his grandfather's village near Mutoko for the long December holiday as a punishment, though nobody called it that. His end-of-year report had been poor, he had twice been caught sneaking out to watch football at the shopping centre when he should have been studying, and his mother had finally run out of patience. "Your Sekuru needs help," she said, packing his bag. "And you need to learn to finish something."

**[2]** Sekuru Mukanya was a maker of mbira. In a corner of his yard, under a thatched shelter, stood a workbench made from an old door, an anvil worn smooth by fifty years of hammering, and rows of tools hanging from nails in a straight line, each one in its proper place. Customers came from Harare and even from across the border to buy his instruments, but he made no more than one a month. "An mbira is not a bag of sweets," he would say. "It is a voice. You cannot hurry a voice."

**[3]** For the first week, Kundai was not allowed to touch the keys at all. He swept the shelter, fetched water, sorted scraps of metal into tins and watched. He watched his grandfather choose a block of mukwa wood, turning it over and over in his hands and tapping it with his knuckles as though he were knocking on a door to see who was at home. He watched him heat a strip of metal in the charcoal fire until it glowed orange, then beat it flat with slow, even blows that rang across the yard like a clock striking.

**[4]** By the second week Kundai was bored and restless. One afternoon, while Sekuru was resting, he decided to make a key himself. How difficult could it be? He heated a piece of metal, hammered it as fast as he could and filed it roughly into shape. When he fitted it to an old practice board and plucked it, it gave a dull, flat buzz, like a fly trapped in a tin. Behind him, his grandfather cleared his throat.

**[5]** Kundai waited for the anger he was used to at home. It did not come. Instead, Sekuru picked up the ruined key, weighed it in his palm and smiled. "Fast hands," he said, "but deaf ears. Sit." For the rest of the afternoon he taught Kundai to listen: to the different notes made by thick and thin metal, by long and short keys, and to the tiny changes that came from a single stroke of the file. "The metal tells you when it is ready," he said. "Your job is to be quiet enough to hear it."

**[6]** After that, the days changed shape. Kundai rose early without being called. He learned to keep the fire at an even heat, to strike with the weight of the hammer rather than the strength of his arm, and to test each key again and again against his grandfather's. His fingers blistered, then hardened. Some evenings, as the light faded, Sekuru would play the finished instruments, and the old songs drifted across the yard while the chickens settled in the trees and the smoke of cooking fires hung over the village.

**[7]** On the last day of the holiday, Sekuru handed him a small mbira. It was plain, with only twelve keys, and the wood still smelt of the oil it had been rubbed with. "Your keys," his grandfather said. "Your instrument." Kundai stared at it. He had made every one of those keys himself, and he had not even known that his grandfather was building the board for them. When he plucked the first note, it was clear and warm, and it seemed to go on ringing long after his thumb had left the metal.

**[8]** Back in Harare, his mother noticed the difference before he had even unpacked: he hung his school uniform on a hanger without being asked. In the new term his marks did not leap overnight, but they climbed steadily, one subject at a time. When a teacher asked the class to write about someone who had changed their life, Kundai did not have to think for long. He wrote about an old man, an anvil and a voice that cannot be hurried.`;

const PHONE = `${INSTR}

**The World in Your Pocket**

**[1]** Not long ago, a teenager in a Zimbabwean town might have shared a single family phone, used mainly for calls and the occasional text message. Today, for many young people, a smartphone is the first thing they reach for in the morning and the last thing they put down at night. It is their alarm clock, their radio, their camera, their library and their meeting place. Few inventions have entered daily life so quickly, and few have caused so many arguments between parents and children.

**[2]** The benefits are real. A student at a rural school with only a handful of textbooks can now look up the meaning of a word, watch a video explaining photosynthesis or download revision notes. Families separated by work in different towns, or across borders, can speak every day and share photographs of a new baby or a wedding. Young people selling clothes, snacks or hairdressing services advertise to hundreds of customers through messaging groups at almost no cost. When schools have had to close for a time, some teachers have even sent lessons and homework to their classes through group chats. For a teenager who feels lonely or different, an online community of people with the same interests can be a genuine comfort.

**[3]** Yet the same device that opens doors can also trap its owner. Many apps are designed to hold attention for as long as possible: each notification, each new message, each like on a photograph gives a small burst of pleasure, and the hand reaches for the phone again and again. Students who sit down to study with a phone beside them often find, an hour later, that they have read two pages and scrolled through two hundred posts. Teachers complain of pupils who cannot concentrate on a single task for more than a few minutes.

**[4]** Sleep is another casualty. Light from a screen late at night tells the brain that it is still daytime, making it harder to fall asleep, and a conversation that continues past midnight leaves a student yawning through the next morning's lessons. A tired student learns less, remembers less and is more easily irritated, and one poor night's sleep can easily become a poor week.

**[5]** There are darker dangers too. Cruel messages, embarrassing photographs and rumours can spread through a school in minutes, and, unlike playground teasing, they follow the victim home and stay online long after the moment has passed. Strangers may pretend to be friends in order to gain a young person's trust. False stories presented as news travel faster than the truth. And data bundles are not cheap: some young people spend money meant for transport or lunch on airtime.

**[6]** What, then, should be done? Banning phones completely is neither practical nor wise, since they are now part of how the world communicates, learns and works. A better approach is to learn to use them deliberately. Simple habits make a large difference: switching off notifications while studying, leaving the phone in another room at night and setting aside regular phone-free times for meals and conversation. Before sharing anything, it is worth asking three questions. Is it true? Is it kind? Would I be happy for my grandmother to see it?

**[7]** Parents and schools have a part to play as well. Rather than simply confiscating phones, they can talk openly with young people about the risks, teach them to recognise false information and make sure they know whom to tell if they are bullied or threatened. Schools can agree clear rules with parents, such as keeping phones switched off during lessons. Adults can also set an example. A father who scolds his daughter for using her phone at the supper table, while answering his own messages, should not be surprised when his words have little effect.

**[8]** The smartphone is a tool, as powerful and as neutral as fire. Fire can cook our food or burn down our house. Whether the phone serves us or rules us depends less on the device than on the choices we make each time we pick it up.`;

concept("eng.reading.explicit-meaning", { file: "exam/zimsec-p2", keyPrefix: "exam.zimsec-p2", applies: ZIM }, (b) => {
  // =================================================================================================================
  // Item 1: narrative, flood in Muzarabani district.
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: SECS, concepts: C,
    stem: FLOOD,
    hints: HINTS,
    explanation: "A full Paper 2: Section A tests retrieval, vocabulary in context, own words, inference, figurative language, the writer's attitude and summary skills (40 marks); Section B tests language structures using sentences drawn from the passage (10 marks). Answer every question in order and keep an eye on the marks: they show how many points are needed.",
    parts: [
      P.short({
        label: "(a)",
        stem: "**Section A**\n\nFrom paragraph 1, for how long had it been raining when Tinashe first heard the river?",
        accepted: ["three days", "3 days", "for three days", "for 3 days", "three", "3"],
        model: "three days",
        wrong: ["seventy years"],
        explanation: "*The rain had been falling for three days.*",
      }),
      P.short({
        label: "(b)",
        stem: "What is the name of the river beside which the grandmother had lived?",
        accepted: ["musengezi", "the musengezi", "musengezi river", "the musengezi river"],
        model: "the Musengezi",
        wrong: ["Zambezi"],
        explanation: "Paragraph 1: she *had lived beside the Musengezi all her seventy years*.",
      }),
      P.manual({
        label: "(c)",
        marks: 2,
        stem: "From paragraphs 1 and 2, state **two** things the grandmother did or ordered to protect the family's belongings before the flood arrived.",
        points: [
          "Any one of: had the blankets packed / had the school books wrapped in plastic / had the seed maize carried up into the granary / hung the chickens' basket from the highest roof beam",
          "A second, different precaution from the same list",
        ],
        modelAnswer: "She had the seed maize carried up into the granary and hung the chickens' basket from the highest roof beam.",
        explanation: "Four precautions are given; any two separate ones earn the marks.",
      }),
      P.mcq({
        label: "(d)",
        stem: "In paragraph 4, the current tugged at Tinashe's legs *like a dog worrying a rope*. What does **worrying** mean here?",
        options: [
          ["pulling and shaking at", "Correct: a dog *worrying* something grips it and tugs it repeatedly, just as the current pulled at his legs."],
          ["feeling anxious about", "This is the everyday meaning, but a dog does not feel anxious about a rope."],
          ["barking angrily at", "Barking involves no contact; the current was physically tugging."],
          ["running away from", "The image is of something gripping and pulling, not escaping."],
        ],
        answer: "A",
        explanation: "Context decides meaning: the verb *tugged* shows that *worrying* means pulling and shaking something with the teeth.",
      }),
      P.mcq({
        label: "(e)",
        stem: "In paragraph 5, a goat stood on a roof *bleating indignantly*. What does **indignantly** mean?",
        options: [
          ["in an annoyed, offended way", "Correct: indignant means angry at being treated unfairly, which gives the goat a comic air of complaint."],
          ["in a weak, exhausted way", "Indignant has nothing to do with tiredness."],
          ["in a hungry, eager way", "Hunger is not part of the meaning."],
          ["in a soft, gentle way", "Indignation is a strong, irritated feeling, not a gentle one."],
        ],
        answer: "A",
        explanation: "**Indignant** describes anger at unfair treatment. The writer gives the stranded goat a human sense of grievance, a moment of humour in a grim scene.",
      }),
      P.mcq({
        label: "(f)",
        stem: "Why did the grandmother's silence in paragraph 5 frighten Tinashe more than the water had?",
        options: [
          ["It showed that the loss had shaken even her.", "Correct: she had been calm and talkative throughout; her silence showed how deeply the loss of the garden hurt."],
          ["It meant that she was too ill to speak to him.", "There is no suggestion that she was ill."],
          ["It showed that she was angry with him for something.", "Nothing suggests she blamed Tinashe."],
          ["It meant that she wanted to be left alone at dawn.", "She does not ask to be alone; the point is what her silence reveals."],
        ],
        answer: "A",
        explanation: "Until then she had been calm, practical and even scolding the water. Her silence at the sight of the lost garden shows how much it meant to her, and Tinashe senses the seriousness of their situation.",
      }),
      P.manual({
        label: "(g)",
        marks: 3,
        stem: "Using your **own words**, explain how the headmaster, Mr Gwatidzo, helped the people who came to the school (paragraph 7).",
        points: [
          "He wrote down / recorded the name of everyone who came (own words for *kept a register of every person who arrived*)",
          "He did it thoroughly / with great care (own words for *as carefully as he kept the attendance book*)",
          "His list made it possible to share the relief food and blankets fairly, so that every family got what it was owed",
        ],
        modelAnswer: "He wrote down the name of every person who came to shelter at the school and did so very thoroughly. Later, when supplies arrived, his list was used to share them out fairly so that no family was left without its portion.",
        explanation: "Own-words answers must change the key words (*register*, *carefully*, *received its share*) while keeping the meaning.",
      }),
      P.manual({
        label: "(h)",
        marks: 2,
        stem: "Why did the grandmother refuse to leave without the seed maize? Explain fully.",
        points: [
          "The seed was needed to plant crops once the flood was over",
          "Without it the family would have no harvest / no food the following season (so it was their future)",
        ],
        modelAnswer: "She needed the seed to plant again after the flood; without it there would be no harvest and nothing to eat the following year.",
        explanation: "Her words *Without seed there is no next year* show that the seed stood for the family's survival.",
      }),
      P.manual({
        label: "(i)",
        marks: 3,
        stem: "In paragraph 4 the grandmother is described as *as light as a bundle of dry grass*.\n\nName the figure of speech used and explain what it suggests about her and about Tinashe's feelings at that moment.",
        points: [
          "Names it as a simile (comparison using *as … as*)",
          "Suggests she is thin / frail / old and weak (dry grass weighs almost nothing and breaks easily)",
          "Suggests Tinashe's surprise, and perhaps tenderness or worry, at how fragile she is (*more easily than he had expected*)",
        ],
        modelAnswer: "It is a simile. Comparing her to dry grass shows how thin and frail she has become with age, and the phrase 'more easily than he had expected' shows Tinashe's surprise and growing protectiveness as he realises how fragile she is.",
        explanation: "Figurative-language questions need the name of the device, its meaning in context, and its effect on the reader or character.",
      }),
      P.manual({
        label: "(j)",
        marks: 2,
        stem: "What is the writer's attitude towards the grandmother? Support your answer with **one** detail from the passage.",
        points: [
          "Attitude: admiring / respectful (presents her as calm, brave, wise or determined)",
          "Supporting detail, e.g. she sat calmly *as if she were waiting for a bus*; she insisted on saving the seed; she smiled at the new soil and planned to plant again",
        ],
        modelAnswer: "The writer admires her: she stays calm while the water rises, sitting 'as if she were waiting for a bus'.",
        explanation: "Attitude answers need an accurate word for the attitude plus evidence. *Admiration* fits because every detail shows her strength.",
      }),
      P.manual({
        label: "(k)",
        marks: 2,
        stem: "Explain why the grandmother smiles at the end of the passage.",
        points: [
          "She realises the flood has left fresh / rich / fertile soil on her garden",
          "So the garden will grow well again: she feels hope for the future instead of loss",
        ],
        modelAnswer: "She sees that the flood has covered the garden with rich new soil, so the land will be more fertile and she feels hopeful about planting again.",
        explanation: "Her words *The river has brought us new soil* turn the disaster into a new beginning.",
      }),
      P.short({
        label: "(l)",
        stem: "Where were the Chiweshe brothers taking the people they rescued?",
        accepted: ["to the primary school", "the primary school", "primary school", "the school on the hill", "to the school", "the school", "school", "to the primary school on the hill", "the primary school on the hill"],
        keywords: { all: ["school"] },
        model: "to the primary school on the hill",
        wrong: ["to the district office"],
        explanation: "Paragraph 6: *ferrying neighbours to the primary school on the hill*.",
      }),
      P.manual({
        label: "(m)",
        marks: 5,
        stem: "Give **one** word or short phrase (of not more than seven words) which has the same meaning as each of the following words as it is used in the passage:\n\n1. **vanished** (paragraph 5)\n2. **ferrying** (paragraph 6)\n3. **firmly** (paragraph 6)\n4. **register** (paragraph 7)\n5. **dissolve** (paragraph 4)",
        points: [
          "vanished: disappeared / gone / was no longer there",
          "ferrying: carrying across (water) / transporting (by boat) / taking",
          "firmly: decisively / with determination / in a way that allowed no argument",
          "register: list / record (of names)",
          "dissolve: crumble / break down / melt away / fall apart",
        ],
        modelAnswer: "1. disappeared 2. transporting by boat 3. decisively 4. list of names 5. crumble",
        explanation: "The meaning must fit the passage: *register* here is a written list of people, not a tone of voice.",
      }),
      P.manual({
        label: "(n)",
        type: "EXTENDED_RESPONSE",
        marks: 15,
        wordLimit: { max: 150 },
        stem: "**Summary.** Using material from paragraphs 3 to 8, summarise what happened to Tinashe and his grandmother from the moment the water entered the hut until they returned home.\n\nYour summary must be in continuous writing (not note form) and must not be longer than **150 words**. Use your own words as far as possible.",
        points: [
          "Water entered the hut after midnight",
          "It rose quickly (to knee height)",
          "Tinashe guided / helped his grandmother through the flooded yard",
          "He lifted her into the granary",
          "They spent the night there while the kitchen hut collapsed",
          "At dawn the fields and the garden were under water / gone",
          "Two brothers rescued them by canoe in the middle of the morning",
          "The grandmother insisted that the seed maize be taken too",
          "They were taken to the primary school on high ground",
          "They sheltered at the school with other families",
          "Relief food and blankets were shared out fairly using the headmaster's list",
          "They returned home after nearly two weeks to find the kitchen destroyed (but two huts standing)",
          EXPRESSION(150),
        ],
        modelAnswer: "Soon after midnight the flood poured into the hut and quickly rose to Tinashe's knees. He guided his grandmother across the swirling yard and helped her up into the granary, where they spent the night listening to the kitchen hut collapse. At daybreak the fields and the garden had disappeared under water. In the middle of the morning two brothers reached them in a canoe, and the grandmother would not go until her seed was also loaded. They were taken to the primary school on the hill, which had become a shelter for many families. There the headmaster's careful list ensured that food and blankets from the district office were shared fairly. After almost two weeks the water went down and they walked back to find that two huts survived but the kitchen had been destroyed.",
        explanation: "Content marks come from relevant points in sequence (1 mark each); expression marks reward continuous, accurate prose in your own words. Leave out descriptive details such as the goat on the roof.",
      }),
      P.fib({
        label: "(o)",
        stem: "**Section B**\n\nComplete each sentence with the correct form of the word in brackets.",
        template: "(i) Tinashe was amazed by the {{blank:b1}} (calm) of his grandmother.   (ii) The flood caused great {{blank:b2}} (destroy) in the district.",
        blanks: [
          { id: "b1", accepted: ["calmness", "calm"], wrong: "calmly" },
          { id: "b2", accepted: ["destruction"], wrong: "destroy" },
        ],
        explanation: "Both gaps follow *the* or an adjective, so a **noun** is needed: *calm* → **calmness** (the noun *calm* is also correct), *destroy* → **destruction**.",
      }),
      P.fib({
        label: "(p)",
        stem: "Choose the correct verb form to complete each sentence.",
        template: "(i) By the time they reached Tinashe's homestead, the brothers {{blank:t1}} on the water since sunrise.   (ii) The water {{blank:t2}} steadily while they waited among the seed bags.",
        blanks: [
          { id: "t1", accepted: ["had been"], choices: ["had been", "have been", "are", "will be"] },
          { id: "t2", accepted: ["was rising"], choices: ["was rising", "has risen", "is rising", "rises"] },
        ],
        explanation: "1. An action continuing up to a past moment takes the **past perfect**: *had been*. 2. An action in progress in the past, interrupted or accompanied by another, takes the **past continuous**: *was rising*.",
      }),
      P.manual({
        label: "(q)",
        marks: 2,
        stem: "Rewrite the following in **reported speech**, beginning with the words given.\n\n*\"Without seed,\" she told the brothers firmly, \"there is no next year.\"*\n\nShe told the brothers firmly that …",
        points: [
          "Backshifts the verb: *is* → *was* / *would be* (and removes the quotation marks)",
          "Changes the time reference: *next year* → *the following year* / *the next year*",
        ],
        modelAnswer: "She told the brothers firmly that without seed there would be no following year.",
        explanation: "In reported speech after a past reporting verb, tenses move back and time words change: *next year* becomes *the following year*.",
      }),
      P.mcq({
        label: "(r)",
        stem: "Which sentence is correctly punctuated?",
        options: [
          ["\"Pack the blankets,\" she said quietly.", "Correct: the comma goes inside the closing quotation mark and *she* continues the sentence in lower case."],
          ["\"Pack the blankets.\" she said quietly.", "A full stop inside the quotation ends the sentence too early; a comma is needed before *she said*."],
          ["\"Pack the blankets\" she said quietly.", "A comma is needed inside the closing quotation mark before *she said*."],
          ["Pack the blankets, \"she said quietly.\"", "The quotation marks must surround the words spoken, not the reporting clause."],
        ],
        answer: "A",
        explanation: "Direct speech: open the quotation marks, put the comma before the closing marks, and continue with a lower-case reporting clause.",
      }),
      P.fib({
        label: "(s)",
        stem: "Choose the correct preposition to complete each sentence.",
        template: "(i) Their homestead stood {{blank:p1}} a low rise a kilometre from the river.   (ii) The brothers paddled {{blank:p2}} them in a dugout canoe.",
        blanks: [
          { id: "p1", accepted: ["on"], choices: ["on", "into", "under", "onto"] },
          { id: "p2", accepted: ["towards"], choices: ["towards", "among", "onto", "beneath"] },
        ],
        explanation: "A building stands **on** raised ground; movement in the direction of someone is **towards** them.",
      }),
      P.mcq({
        label: "(t)",
        stem: "Choose the correct form to complete the sentence.\n\n*The bags of seed maize ___ into the canoe by the brothers.*",
        options: [
          ["were loaded", "Correct: a plural subject (*bags*) receiving the action needs the plural passive *were loaded*."],
          ["was loaded", "The subject is *bags* (plural), not *maize*, so *was* does not agree."],
          ["were loading", "This is active continuous: the bags did not do the loading."],
          ["have loaded", "This is active: it would mean the bags loaded something."],
        ],
        answer: "A",
        explanation: "With *by the brothers* the sentence is **passive**: be + past participle, agreeing with the plural subject *bags*.",
      }),
    ],
  });

  // =================================================================================================================
  // Item 2: descriptive, Mbare Musika at dawn.
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: SECS, concepts: C,
    stem: MARKET,
    hints: HINTS,
    explanation: "A descriptive passage rewards close attention to the senses, imagery and the narrator's feelings. In the summary, keep only the activities of the people at work and leave out the descriptive colour.",
    parts: [
      P.short({
        label: "(a)",
        stem: "**Section A**\n\nAt what time did Mainini Rudo wake the narrator?",
        accepted: ["half past three", "3.30", "3:30", "at half past three", "at 3.30", "at 3:30", "3.30 am", "3:30 am", "3.30 a.m.", "half past three in the morning", "0330"],
        model: "half past three",
        wrong: ["four o'clock"],
        explanation: "*At half past three she shook me from sleep.* By four they were already on the truck.",
      }),
      P.short({
        label: "(b)",
        stem: "What was inside the cardboard box that nobody claimed?",
        accepted: ["a cockerel", "cockerel", "a rooster", "rooster", "a chicken", "chicken", "a cock"],
        keywords: { any: ["cockerel", "rooster", "chicken", "cock"] },
        model: "a cockerel",
        wrong: ["tomatoes"],
        explanation: "Paragraph 1: *a cockerel in a cardboard box that nobody claimed*.",
      }),
      P.manual({
        label: "(c)",
        marks: 2,
        stem: "From paragraph 2, name **two** smells that told the narrator they were near the market.",
        points: [
          "Any one of: diesel / wood smoke / the (sweet, heavy) scent of ripe fruit",
          "A second, different smell from the same list",
        ],
        modelAnswer: "Diesel and wood smoke.",
        explanation: "*First came the smell: diesel, wood smoke and the sweet, heavy scent of ripe fruit.* The other details in the paragraph are sounds.",
      }),
      P.mcq({
        label: "(d)",
        stem: "In paragraph 3, porters *threaded between the lorries*. What does **threaded** mean here?",
        options: [
          ["moved skilfully in and out of narrow gaps", "Correct: like a thread passing through cloth, the porters wove through tight spaces between lorries."],
          ["sewed sacks together with strong string", "This is the literal sense of thread, which does not fit porters pushing carts."],
          ["pushed roughly past people in their way", "The word suggests skill and precision, not roughness."],
          ["walked slowly in a long, straight line", "They moved *at astonishing speed* and not in a straight line."],
        ],
        answer: "A",
        explanation: "**Threaded** is used figuratively: the porters wove their carts through narrow gaps as a thread passes through cloth.",
      }),
      P.mcq({
        label: "(e)",
        stem: "In paragraph 5, the buyer *names an insulting price*. What kind of price is this?",
        options: [
          ["one that is far too low to be fair", "Correct: the buyer offers so little that the seller can pretend to be hurt."],
          ["one that is far too high to accept", "The buyer wants to pay less, so the opening price is low, not high."],
          ["one that is exactly the usual amount", "A normal price would not be called insulting."],
          ["one that is spoken in a rude voice", "Insulting describes the size of the offer, not the tone of voice."],
        ],
        answer: "A",
        explanation: "In bargaining, the buyer begins with an offer so low that it insults the seller's goods; the seller then acts wounded.",
      }),
      P.mcq({
        label: "(f)",
        stem: "Why did Mainini Rudo hide the soft tomatoes at the back of her pile?",
        options: [
          ["To make her display look as attractive as possible", "Correct: *People buy with their eyes first*, so the best tomatoes go where buyers see them."],
          ["To keep them in the shade until they ripened fully", "Soft tomatoes are already ripe; shade is not mentioned."],
          ["To save them for the family's own evening meal", "They were *to be sold cheaply at the end of the day*."],
          ["To stop the porters from stealing them in the dark", "Theft is not mentioned anywhere in the passage."],
        ],
        answer: "A",
        explanation: "Her saying *People buy with their eyes first* explains the arrangement: the firmest, reddest fruit attracts buyers.",
      }),
      P.manual({
        label: "(g)",
        marks: 3,
        stem: "Using your **own words**, explain how bargaining takes place at the market, as described in paragraph 5.",
        points: [
          "The buyer begins by offering a ridiculously low amount (own words for *names an insulting price*)",
          "The seller pretends to be hurt or shocked (own words for *clutches her chest as though wounded*)",
          "The buyer pretends to leave, and the seller invites him back in a friendly way so that they settle on a price",
        ],
        modelAnswer: "The customer starts by offering far less than the goods are worth. The trader acts as if she has been deeply hurt. The customer then makes as if to go, but the trader cheerfully calls him back and they reach an agreement.",
        explanation: "Each step of the *song* is one mark; use new words for *insulting*, *clutches her chest* and *calls him back*.",
      }),
      P.manual({
        label: "(h)",
        marks: 2,
        stem: "What do paragraphs 4 and 5 suggest about Mainini Rudo as a trader? Give **two** qualities.",
        points: [
          "One quality with support, e.g. careful / painstaking: she arranges each tomato *with the care of a jeweller*; OR shrewd / understands customers: *People buy with their eyes first*",
          "A second quality with support, e.g. patient / good-humoured: she bargains fifty times *and never once* loses her temper; OR successful / business-like: never loses her profit",
        ],
        modelAnswer: "She is careful, arranging each tomato like a jeweller, and she is patient and good-humoured, bargaining all morning without losing her temper or her profit.",
        explanation: "Inference questions need a quality (an adjective) backed by a detail from the passage.",
      }),
      P.manual({
        label: "(i)",
        marks: 3,
        stem: "In paragraph 2 the darkness is described as *as busy as an anthill that someone has kicked*.\n\nIdentify the figure of speech and explain why it is effective.",
        points: [
          "Identifies a simile",
          "Explains the comparison: the crowd moves in great numbers, rushing in all directions, like disturbed ants",
          "Explains the effect: it conveys frantic, almost chaotic energy / makes the people seem tiny and countless in the dark",
        ],
        modelAnswer: "It is a simile. When an anthill is kicked, thousands of ants rush in every direction at once; the comparison shows the market as crowded and frantic, and makes the people in the darkness seem countless and tiny.",
        explanation: "For full marks, name the device, explain the comparison, and say what impression it creates.",
      }),
      P.manual({
        label: "(j)",
        marks: 2,
        stem: "What is the narrator's attitude towards the market workers at the end of the passage? Support your answer with a quotation.",
        points: [
          "Attitude: admiration / respect / gratitude for their hard work",
          "Quotation, e.g. *thousands of people working in the dark while the rest of us sleep* / *It is not magic*",
        ],
        modelAnswer: "The narrator now respects them, realising that city meals depend on 'thousands of people working in the dark while the rest of us sleep'.",
        explanation: "The final paragraph moves from tiredness to a new understanding: food does not appear *as if by magic*.",
      }),
      P.manual({
        label: "(k)",
        marks: 2,
        stem: "Explain what Mainini Rudo means when she says, *\"People buy with their eyes first, and with their money second.\"*",
        points: [
          "Customers are first attracted by how the goods look",
          "Only after that do they decide to pay, so a good display brings sales",
        ],
        modelAnswer: "Customers are drawn by what they see before they think about paying, so an attractive display is what makes them spend their money.",
        explanation: "The saying explains why she puts the best tomatoes on the outside.",
      }),
      P.short({
        label: "(l)",
        stem: "From paragraph 6, what was the preacher standing on?",
        accepted: ["an upturned crate", "a crate", "upturned crate", "crate", "an upside-down crate", "on an upturned crate", "on a crate"],
        keywords: { all: ["crate"] },
        model: "an upturned crate",
        wrong: ["a lorry"],
        explanation: "*a preacher with a loud-hailer stood on an upturned crate*.",
      }),
      P.manual({
        label: "(m)",
        marks: 5,
        stem: "Give **one** word or short phrase (of not more than seven words) which has the same meaning as each of the following words as it is used in the passage:\n\n1. **announced** (paragraph 2)\n2. **idling** (paragraph 2)\n3. **clutches** (paragraph 5)\n4. **exhausted** (paragraph 7)\n5. **trampled** (paragraph 8)",
        points: [
          "announced: made its presence known / revealed itself / signalled",
          "idling: running without moving / ticking over",
          "clutches: grips / grabs / holds tightly",
          "exhausted: very tired / worn out",
          "trampled: crushed under feet / stepped on / flattened by walking",
        ],
        modelAnswer: "1. made itself known 2. running while standing still 3. grips tightly 4. worn out 5. crushed underfoot",
        explanation: "Your word must fit the sentence in the passage: *idling* engines are running but the vehicles are not moving.",
      }),
      P.manual({
        label: "(n)",
        type: "EXTENDED_RESPONSE",
        marks: 15,
        wordLimit: { max: 150 },
        stem: "**Summary.** Using material from paragraphs 3 to 7, summarise the work done by the different people at the market.\n\nYour summary must be in continuous writing (not note form) and must not be longer than **150 words**. Use your own words as far as possible.",
        points: [
          "Lorries bring produce from all over the country",
          "The produce is unloaded before daybreak / under lamps",
          "Porters move goods between the lorries on push-carts",
          "They carry very heavy loads at speed",
          "Traders clean their selling places",
          "They lay out sheets and pile up their produce",
          "They put the best produce in front to attract buyers",
          "They keep damaged produce back to sell cheaply later",
          "Shopkeepers, street vendors, school cooks and housewives come to buy",
          "Buyers and sellers bargain over prices",
          "Boys sell food and tea to the people at the market / vendors sell small goods",
          "When trading slows, traders count and put away their takings / pack up",
          EXPRESSION(150),
        ],
        modelAnswer: "Before dawn, lorries from all parts of the country are emptied under a few lamps. Porters push loaded carts between the vehicles, moving huge piles of sacks remarkably quickly. Each trader cleans her space, spreads out plastic and arranges her goods, placing the finest at the front to catch customers' attention and keeping bruised items aside to sell cheaply later. From five o'clock, small shopkeepers, street vendors, boarding-school cooks and housewives arrive, and buyers and traders haggle in a familiar routine until they agree a price. Meanwhile boys move through the crowd selling eggs and tea, and other vendors offer small goods. As the morning goes on and business eases, the traders count their earnings carefully, store them safely and start to pack up.",
        explanation: "Select the *work* (actions) and drop decoration such as the colour of the crates, the oranges *glowing like coals* or the preacher. One mark per relevant point, plus up to 3 marks for expression.",
      }),
      P.fib({
        label: "(o)",
        stem: "**Section B**\n\nComplete each sentence with the correct form of the word in brackets.",
        template: "(i) The porters moved with astonishing {{blank:b1}} (swift).   (ii) My aunt's {{blank:b2}} (patient) with difficult buyers impressed me.",
        blanks: [
          { id: "b1", accepted: ["swiftness"], wrong: "swiftly" },
          { id: "b2", accepted: ["patience"], wrong: "patiently" },
        ],
        explanation: "After *with astonishing* and after the possessive *aunt's*, nouns are needed: *swift* → **swiftness**, *patient* → **patience**.",
      }),
      P.fib({
        label: "(p)",
        stem: "Choose the correct verb form to complete each sentence.",
        template: "(i) Mainini Rudo {{blank:t1}} tomatoes at Mbare Musika for many years.   (ii) When we arrived, the porters {{blank:t2}} the lorries.",
        blanks: [
          { id: "t1", accepted: ["has sold"], choices: ["has sold", "is selling", "sells", "will sell"] },
          { id: "t2", accepted: ["were unloading"], choices: ["were unloading", "have unloaded", "unload", "are unloading"] },
        ],
        explanation: "1. *for many years* up to now needs the **present perfect**: *has sold*. 2. An action already in progress when another happened needs the **past continuous**: *were unloading*.",
      }),
      P.manual({
        label: "(q)",
        marks: 2,
        stem: "Rewrite the following in **reported speech**, beginning with the words given.\n\n*\"You will see Harare before Harare is awake,\" she promised me.*\n\nShe promised me that …",
        points: [
          "Changes the pronoun and backshifts the modal: *you will* → *I would*",
          "Backshifts the second verb: *is awake* → *was awake* (no quotation marks)",
        ],
        modelAnswer: "She promised me that I would see Harare before Harare was awake.",
        explanation: "After the past reporting verb *promised*, *will* becomes *would* and *is* becomes *was*; *you* becomes *I* because the narrator is now reporting.",
      }),
      P.mcq({
        label: "(r)",
        stem: "Which sentence uses commas correctly?",
        options: [
          ["The market sold cabbages, potatoes, bananas and oranges.", "Correct: commas separate the items, and *and* joins the last two."],
          ["The market sold, cabbages, potatoes, bananas and oranges.", "No comma is used between a verb and its object."],
          ["The market sold cabbages potatoes, bananas and, oranges.", "A comma is missing after *cabbages*, and none belongs after *and*."],
          ["The market, sold cabbages, potatoes, bananas and oranges.", "A comma must not separate the subject from its verb."],
        ],
        answer: "A",
        explanation: "In a list, put commas between the items; no comma goes between the subject and verb or between a verb and its object.",
      }),
      P.fib({
        label: "(s)",
        stem: "Choose the correct preposition to complete each sentence.",
        template: "(i) Her place was a square of concrete {{blank:p1}} a fish seller and a chilli seller.   (ii) She tucked the money deep {{blank:p2}} her blouse.",
        blanks: [
          { id: "p1", accepted: ["between"], choices: ["between", "along", "across", "through"] },
          { id: "p2", accepted: ["inside"], choices: ["inside", "onto", "above", "across"] },
        ],
        explanation: "**Between** is used for a position with one thing on each side; **inside** shows a position within something.",
      }),
      P.mcq({
        label: "(t)",
        stem: "Choose the word that best completes the sentence.\n\n*___ my feet ached, I stayed at the market until the end.*",
        options: [
          ["Although", "Correct: *although* introduces a contrast: aching feet, yet the narrator stayed."],
          ["Because", "Aching feet are not a reason for staying."],
          ["Unless", "*Unless* means *if not*, which makes no sense here."],
          ["So that", "*So that* introduces a purpose, not a contrast."],
        ],
        answer: "A",
        explanation: "Concession clauses (*although*, *even though*) show that the main action happens in spite of something.",
      }),
    ],
  });

  // =================================================================================================================
  // Item 3: expository, urban wetlands.
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: SECS, concepts: C,
    stem: VLEI,
    hints: HINTS,
    explanation: "An expository passage is built from points and examples. Track the structure (benefits, threats, effects, solutions) and you will find answers and summary points quickly.",
    parts: [
      P.short({
        label: "(a)",
        stem: "**Section A**\n\nFrom paragraph 1, give **one** local name for a wetland.",
        accepted: ["vlei", "vleis", "matoro", "a vlei"],
        model: "vlei",
        wrong: ["wasteland"],
        explanation: "*They are wetlands, known locally as vleis or matoro.*",
      }),
      P.short({
        label: "(b)",
        stem: "To what does the writer compare a wetland in paragraph 2?",
        accepted: ["a sponge", "sponge", "a giant sponge", "giant sponge", "a big sponge"],
        keywords: { all: ["sponge"] },
        model: "a giant sponge",
        wrong: ["a dam"],
        explanation: "*A wetland behaves like a giant sponge.* The dam appears in paragraph 8 as a contrast.",
      }),
      P.manual({
        label: "(c)",
        marks: 2,
        stem: "According to paragraph 2, where does the water stored in a wetland go during the months after the rains? Give **two** places.",
        points: [
          "Down into the rocks below / underground, refilling the supplies for boreholes and wells",
          "Sideways into streams, which keep flowing after the rains",
        ],
        modelAnswer: "It sinks down into the rocks to refill underground supplies for boreholes, and it flows sideways into streams.",
        explanation: "The water seeps *downwards into the rocks below … and sideways into streams*.",
      }),
      P.mcq({
        label: "(d)",
        stem: "In paragraph 2 the stored water *seeps slowly downwards*. What does **seeps** mean?",
        options: [
          ["flows gradually through small openings", "Correct: to seep is to pass slowly through soil or tiny gaps."],
          ["rushes out suddenly in large amounts", "That is the opposite: the passage contrasts seeping with water that would *rush away*."],
          ["dries up and disappears into the air", "That would be evaporation, not seeping."],
          ["is pumped up from under the ground", "Pumping is done at boreholes; seeping happens naturally."],
        ],
        answer: "A",
        explanation: "**Seep** describes slow movement of liquid through small spaces, which fits the idea of slow release.",
      }),
      P.mcq({
        label: "(e)",
        stem: "In paragraph 8 the writer refers to *the humble wetland*. What does **humble** mean here?",
        options: [
          ["ordinary and unimpressive in appearance", "Correct: the wetland is just *a patch of soggy grass* compared with an impressive dam."],
          ["polite and respectful towards others", "This sense applies to people's behaviour, not to land."],
          ["dangerous and difficult to cross", "Danger is not suggested in this paragraph."],
          ["proud of its value and importance", "Humble is the opposite of proud."],
        ],
        answer: "A",
        explanation: "**Humble** contrasts with the tall concrete dam: the wetland looks modest but does valuable work.",
      }),
      P.mcq({
        label: "(f)",
        stem: "Why does the writer mention, in paragraph 3, that Harare's water supply comes from lakes downstream of the city?",
        options: [
          ["To show that wetlands affect the water people drink", "Correct: wetlands filter runoff before it reaches the rivers that feed those lakes."],
          ["To explain why there are no wetlands near the lakes", "The passage does not say where else wetlands are."],
          ["To argue that the city should build another dam", "Building dams is not proposed."],
          ["To show that wetlands are no longer needed today", "The point is that wetlands are still very valuable."],
        ],
        answer: "A",
        explanation: "Cleaner water reaching the lakes makes treatment *easier and cheaper*: the wetlands protect the city's drinking water.",
      }),
      P.manual({
        label: "(g)",
        marks: 3,
        stem: "Using your **own words**, explain **three** reasons why wetlands around growing towns are disappearing (paragraph 5).",
        points: [
          "They are being dried out and used for housing/building because developers want flat land close to roads and services",
          "They are dug up to make bricks / turned into places for dumping waste and rubble",
          "Intensive farming (deep ploughing and too much fertiliser) harms the soil the wetland needs",
        ],
        modelAnswer: "Builders find the flat land near roads attractive, so the water is removed and houses are put up; people also dig there for brick-making or dump their waste and rubble; and large-scale farming with deep ploughing and lots of fertiliser spoils the spongy soil.",
        explanation: "Credit each reason once, in your own words (*drained* → dried out; *dumping grounds* → places where waste is thrown).",
      }),
      P.manual({
        label: "(h)",
        marks: 2,
        stem: "The writer says that the results of losing wetlands *are not always seen at once, which is part of the problem*. Explain why this makes the problem worse.",
        points: [
          "The damage appears later or far away, so people do not connect it with the lost wetland",
          "So they do not see a reason to protect wetlands and the destruction continues",
        ],
        modelAnswer: "Because flooding or dry boreholes appear later and in other places, people do not link them to the wetland, so they see no reason to stop the destruction.",
        explanation: "Paragraph 6's examples (the house that floods later; the borehole kilometres away) show cause and effect separated in time and place.",
      }),
      P.manual({
        label: "(i)",
        marks: 3,
        stem: "In paragraph 2 the writer says that the slow release of water *is not a luxury; it is a lifeline*.\n\nName the figure of speech in *it is a lifeline* and explain what the writer means and why the image is effective.",
        points: [
          "Identifies a metaphor",
          "Meaning: the stored water is essential for survival (not an optional extra) for households with boreholes",
          "Effect: a lifeline is what saves someone from drowning or disaster, so the image stresses how vital and urgent wetlands are; the contrast with *luxury* sharpens the point",
        ],
        modelAnswer: "It is a metaphor. A lifeline is the rope that keeps someone alive, so the writer means the water from wetlands is essential, not optional, for families who depend on boreholes. Setting it against 'luxury' makes the reader see how serious losing it would be.",
        explanation: "Name the device, explain the literal comparison, then explain its effect in context.",
      }),
      P.manual({
        label: "(j)",
        marks: 2,
        stem: "What is the writer's attitude towards wetlands? Support your answer with **one** detail from the passage.",
        points: [
          "Attitude: values / admires them and is concerned / worried about their loss (protective)",
          "Supporting detail, e.g. *among the most valuable pieces of land*; *quietly stores, cleans and releases water … asking nothing in return*; *by then it may be too late*",
        ],
        modelAnswer: "The writer values wetlands highly and is worried about their loss, calling them 'among the most valuable pieces of land a city has'.",
        explanation: "The writer argues for wetlands throughout and ends with a warning, showing appreciation and concern.",
      }),
      P.manual({
        label: "(k)",
        marks: 2,
        stem: "Why does the writer compare a dam with a wetland in paragraph 8?",
        points: [
          "A dam looks impressive and is admired, while a wetland looks unimportant",
          "To show that people undervalue wetlands even though they do equally valuable work with water",
        ],
        modelAnswer: "A dam is impressive to look at, while a wetland is just soggy grass, yet both store water; the contrast shows that people overlook wetlands because they do not look important.",
        explanation: "The contrast exposes a mistake in how people judge value: by appearance rather than by function.",
      }),
      P.short({
        label: "(l)",
        stem: "From paragraph 7, which **two** materials can communities harvest from wetlands without destroying the roots?",
        accepted: ["grass and reeds", "reeds and grass", "grass reeds", "thatching grass and reeds"],
        keywords: { all: ["grass", "reeds"] },
        model: "grass and reeds",
        wrong: ["bricks and rubble"],
        explanation: "*Communities can harvest grass and reeds without destroying the roots.* Both are needed for the mark.",
      }),
      P.manual({
        label: "(m)",
        marks: 5,
        stem: "Give **one** word or short phrase (of not more than seven words) which has the same meaning as each of the following words as it is used in the passage:\n\n1. **regard** (paragraph 1)\n2. **tended** (paragraph 4)\n3. **drained** (paragraph 5)\n4. **compacted** (paragraph 5)\n5. **adopt** (paragraph 7)",
        points: [
          "regard: consider / view / think of",
          "tended: looked after / cared for",
          "drained: had the water removed / dried out",
          "compacted: pressed down hard / squashed tightly",
          "adopt: take responsibility for / take care of",
        ],
        modelAnswer: "1. consider 2. looked after 3. had its water removed 4. pressed down hard 5. take responsibility for",
        explanation: "*Adopt* here does not mean taking a child into a family; schools take on the care of a vlei.",
      }),
      P.manual({
        label: "(n)",
        type: "EXTENDED_RESPONSE",
        marks: 15,
        wordLimit: { max: 150 },
        stem: "**Summary.** Using material from paragraphs 2, 3, 4 and 7 only, summarise the benefits that wetlands provide and the ways in which people can protect them.\n\nYour summary must be in continuous writing (not note form) and must not be longer than **150 words**. Use your own words as far as possible.",
        points: [
          "Wetlands absorb and store rainwater, which reduces flooding",
          "They release the water slowly over the dry months",
          "They refill underground water used by boreholes and wells",
          "They keep streams flowing after the rains",
          "They clean / filter the water by trapping mud and pollutants",
          "This makes water treatment easier and cheaper",
          "They provide homes for wildlife and green spaces for residents",
          "They supply grass, reeds and some food",
          "Protection: harvest grass and reeds without damaging the roots",
          "Grow gardens only on the edges and keep rubbish and rubble out",
          "Planners should mark wetlands on maps and refuse building permission",
          "Schools can adopt wetlands, record their wildlife and teach children about them",
          EXPRESSION(150),
        ],
        modelAnswer: "Wetlands soak up rain and hold it, which limits flooding, and then let it out gradually during the dry season. Some of this water sinks underground and replenishes the supplies that boreholes and wells depend on, while the rest keeps streams running. As water passes through the plants, dirt and harmful substances are removed, so treating the city's water costs less. Wetlands also shelter frogs, birds and insects, give crowded suburbs peaceful open spaces and provide thatching grass, reeds and a little food. To protect them, residents should cut grass and reeds without pulling up the roots, keep their gardens to the outer parts and stop dumping waste there. Planners should show wetlands on official maps and refuse to allow building, and schools can take charge of a nearby vlei, recording its wildlife and educating younger pupils.",
        explanation: "The question has two halves (benefits and protection); a good summary covers both and leaves out the threats and examples in paragraphs 5 and 6.",
      }),
      P.fib({
        label: "(o)",
        stem: "**Section B**\n\nComplete each sentence with the correct form of the word in brackets.",
        template: "(i) Wetlands are extremely {{blank:b1}} (value) to the city.   (ii) The {{blank:b2}} (protect) of wetlands is everyone's responsibility.",
        blanks: [
          { id: "b1", accepted: ["valuable"], wrong: "value" },
          { id: "b2", accepted: ["protection"], wrong: "protecting" },
        ],
        explanation: "1. After *extremely*, an **adjective** is needed: *valuable*. 2. After *The* and before *of*, a **noun** is needed: *protection*.",
      }),
      P.fib({
        label: "(p)",
        stem: "Choose the correct verb form to complete each sentence.",
        template: "(i) If the wetland is built on, the boreholes nearby {{blank:t1}} dry.   (ii) Ever since the vlei was covered with concrete, our borehole {{blank:t2}} dry every October.",
        blanks: [
          { id: "t1", accepted: ["will run"], choices: ["will run", "would run", "ran", "had run"] },
          { id: "t2", accepted: ["has run"], choices: ["has run", "is running", "will run", "run"] },
        ],
        explanation: "1. A real possibility (*If* + present) takes **will** in the main clause. 2. *Ever since* + a past point needs the **present perfect**: *has run*.",
      }),
      P.manual({
        label: "(q)",
        marks: 2,
        stem: "Rewrite the following in **reported speech**, beginning with the words given.\n\n*The planner said, \"We will not allow anyone to build here.\"*\n\nThe planner said that …",
        points: [
          "Changes pronoun and backshifts the modal: *we will* → *they would*",
          "Changes the place word: *here* → *there* (no quotation marks)",
        ],
        modelAnswer: "The planner said that they would not allow anyone to build there.",
        explanation: "Reported speech after a past reporting verb: *will* → *would*, *we* → *they*, *here* → *there*.",
      }),
      P.mcq({
        label: "(r)",
        stem: "Which sentence uses apostrophes correctly?",
        options: [
          ["The city's wetlands store water for its boreholes.", "Correct: *city's* shows possession by one city; *its* (no apostrophe) is the possessive pronoun."],
          ["The citys' wetlands store water for it's boreholes.", "*citys'* is not a word, and *it's* means *it is*."],
          ["The city's wetlands store water for it's boreholes.", "*it's* means *it is*; the possessive is *its*."],
          ["The cities wetlands store water for its' boreholes.", "*cities* needs an apostrophe to show possession, and *its'* does not exist."],
        ],
        answer: "A",
        explanation: "Singular possession: *'s*. The possessive pronoun **its** never takes an apostrophe; *it's* = *it is* / *it has*.",
      }),
      P.fib({
        label: "(s)",
        stem: "Choose the correct preposition to complete each sentence.",
        template: "(i) The water seeps slowly downwards {{blank:p1}} the rocks below.   (ii) Many households rely {{blank:p2}} boreholes when the taps run dry.",
        blanks: [
          { id: "p1", accepted: ["into"], choices: ["into", "onto", "off", "above"] },
          { id: "p2", accepted: ["on"], choices: ["on", "at", "of", "with"] },
        ],
        explanation: "Movement to the inside of something takes **into**; the verb *rely* is always followed by **on** (or *upon*).",
      }),
      P.mcq({
        label: "(t)",
        stem: "Choose the word that correctly completes the sentence.\n\n*Wetlands, ___ often look like wasteland, are very valuable.*",
        options: [
          ["which", "Correct: *which* introduces a relative clause about things."],
          ["who", "*Who* refers to people, not places."],
          ["whose", "*Whose* shows possession, and no noun follows it here."],
          ["what", "*What* cannot introduce a relative clause after a noun."],
        ],
        answer: "A",
        explanation: "Non-defining relative clauses about things use **which**, set off by commas.",
      }),
    ],
  });

  // =================================================================================================================
  // Item 4: narrative, an mbira maker's apprentice near Mutoko.
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: SECS, concepts: C,
    stem: MBIRA,
    hints: HINTS,
    explanation: "In a narrative about change, look for contrasts between how a character behaves at the start and at the end; they supply inference answers and summary points.",
    parts: [
      P.short({
        label: "(a)",
        stem: "**Section A**\n\nNear which town is Sekuru Mukanya's village?",
        accepted: ["mutoko", "near mutoko", "mutoko town"],
        model: "Mutoko",
        wrong: ["Harare"],
        explanation: "Paragraph 1: *his grandfather's village near Mutoko*.",
      }),
      P.short({
        label: "(b)",
        stem: "From paragraph 2, how many mbira did Sekuru make in a month?",
        accepted: ["one", "1", "one mbira", "only one", "no more than one", "one a month", "not more than one"],
        model: "one",
        wrong: ["twelve"],
        explanation: "*He made no more than one a month.*",
      }),
      P.manual({
        label: "(c)",
        marks: 2,
        stem: "From paragraph 1, give **two** reasons why Kundai was sent to his grandfather's village.",
        points: [
          "Any one of: his end-of-year report was poor / he sneaked out to watch football instead of studying / his mother wanted him to learn to finish something / Sekuru needed help",
          "A second, different reason from the same list",
        ],
        modelAnswer: "His school report was poor, and he had sneaked out to watch football when he should have been studying.",
        explanation: "The first two reasons explain the *punishment*; the mother's words add two more.",
      }),
      P.mcq({
        label: "(d)",
        stem: "In paragraph 4, Kundai was *bored and restless*. What does **restless** mean?",
        options: [
          ["unable to keep still or settle down", "Correct: restless describes someone who cannot relax or stay still."],
          ["very tired and in need of sleep", "This is a common confusion; restless does not mean needing rest."],
          ["rude and disobedient to adults", "Restless describes a state of mind, not rudeness."],
          ["confused about what to do next", "He knew what he wanted to do: make a key."],
        ],
        answer: "A",
        explanation: "**Restless** means unable to rest or keep still, which explains why he tries to make a key himself.",
      }),
      P.mcq({
        label: "(e)",
        stem: "In paragraph 6, Kundai's *fingers blistered, then hardened*. What does **blistered** mean?",
        options: [
          ["developed painful swellings of skin", "Correct: blisters are raised bubbles on the skin caused by rubbing or heat."],
          ["became numb with the morning cold", "Numbness is a different effect; the hardening shows rubbing and heat."],
          ["were stained dark by the oil and soot", "Stains do not *harden*; blisters heal into hard skin."],
          ["were cut deeply by the sharp metal", "Deep cuts are not described."],
        ],
        answer: "A",
        explanation: "Repeated hammering and filing raise blisters, which later toughen into hard skin: a sign of hard work.",
      }),
      P.mcq({
        label: "(f)",
        stem: "Why did Kundai expect his grandfather to be angry in paragraph 5?",
        options: [
          ["He was used to being scolded at home.", "Correct: *Kundai waited for the anger he was used to at home.*"],
          ["Sekuru had shouted at him the day before.", "Sekuru never shouts at him in the passage."],
          ["He had broken one of Sekuru's best tools.", "He ruined a piece of metal, not a tool."],
          ["The ruined key belonged to a customer.", "It was his own attempt on a practice board."],
        ],
        answer: "A",
        explanation: "The words *the anger he was used to at home* show that he expected the same reaction as from his mother.",
      }),
      P.manual({
        label: "(g)",
        marks: 3,
        stem: "Using your **own words**, explain what Sekuru taught Kundai about listening in paragraph 5.",
        points: [
          "Different thicknesses and lengths of metal produce different sounds",
          "Even a very small amount of filing alters the sound",
          "He must be silent / patient and attentive so that he can tell when the key sounds right",
        ],
        modelAnswer: "He showed him that thick or thin and long or short keys each give a different note, that one small stroke of the file can change the sound, and that he must stay calm and pay close attention to recognise when the key is right.",
        explanation: "Rephrase *thick and thin metal*, *a single stroke of the file* and *quiet enough to hear it*.",
      }),
      P.manual({
        label: "(h)",
        marks: 2,
        stem: "What does the description of Sekuru's workshop in paragraph 2 suggest about him? Give **two** points.",
        points: [
          "He is orderly / disciplined / careful: tools hang *in a straight line, each one in its proper place*",
          "He is very experienced / dedicated to his craft: the anvil is *worn smooth by fifty years of hammering* (or: he takes pride in quality, making only one a month)",
        ],
        modelAnswer: "He is orderly, since every tool hangs in its proper place, and he is deeply experienced, as the anvil has been worn smooth by fifty years of work.",
        explanation: "Details of a setting often reveal character: neatness suggests discipline; long use suggests dedication.",
      }),
      P.manual({
        label: "(i)",
        marks: 3,
        stem: "In paragraph 3, Sekuru taps the wood *as though he were knocking on a door to see who was at home*.\n\nIdentify the figure of speech and explain what it shows about the way Sekuru works.",
        points: [
          "Identifies a simile",
          "Meaning: he is testing the wood by its sound, listening for its quality inside",
          "Effect: it suggests he treats the wood as if it had life or a voice inside it, showing respect and patient attention",
        ],
        modelAnswer: "It is a simile. He taps the block to hear what sound it gives, as a visitor knocks to find out who is inside; this suggests he treats the wood as something living with a voice of its own, and shows his patient, respectful way of working.",
        explanation: "The image links to Sekuru's belief that an mbira *is a voice*.",
      }),
      P.manual({
        label: "(j)",
        marks: 2,
        stem: "What is the writer's attitude towards Sekuru Mukanya? Support your answer with **one** detail from the passage.",
        points: [
          "Attitude: admiring / respectful (presents him as wise, patient and skilled)",
          "Supporting detail, e.g. he smiles instead of getting angry at the ruined key; customers come from across the border; his sayings about patience",
        ],
        modelAnswer: "The writer admires him as wise and patient: instead of scolding Kundai over the ruined key, he smiles and teaches him to listen.",
        explanation: "A sympathetic, admiring portrait: every detail shows skill, calm and wisdom.",
      }),
      P.manual({
        label: "(k)",
        marks: 2,
        stem: "Explain the meaning of the last words of the passage, *a voice that cannot be hurried*.",
        points: [
          "They repeat Sekuru's saying that an mbira is a voice that cannot be hurried",
          "They show that Kundai has learned that good work takes patience, a lesson he now applies to his schoolwork and life",
        ],
        modelAnswer: "The phrase echoes Sekuru's saying about the mbira; it shows that Kundai has taken the lesson to heart and now understands that anything worthwhile, including his studies, needs patience.",
        explanation: "An echo of an earlier line at the end of a story usually signals the lesson the character has learned.",
      }),
      P.short({
        label: "(l)",
        stem: "How many keys did the small mbira given to Kundai have?",
        accepted: ["twelve", "12", "twelve keys", "12 keys", "only twelve", "only 12"],
        model: "twelve",
        wrong: ["fifty"],
        explanation: "Paragraph 7: *It was plain, with only twelve keys.*",
      }),
      P.manual({
        label: "(m)",
        marks: 5,
        stem: "Give **one** word or short phrase (of not more than seven words) which has the same meaning as each of the following words as it is used in the passage:\n\n1. **sneaking** (paragraph 1)\n2. **ruined** (paragraph 5)\n3. **plain** (paragraph 7)\n4. **steadily** (paragraph 8)\n5. **settled** (paragraph 6)",
        points: [
          "sneaking: going secretly / slipping out quietly",
          "ruined: spoilt / useless / badly made",
          "plain: simple / undecorated",
          "steadily: gradually and continuously / at a regular rate",
          "settled: came to rest / made themselves comfortable (for the night)",
        ],
        modelAnswer: "1. slipping out secretly 2. spoilt 3. undecorated 4. gradually but continuously 5. came to rest for the night",
        explanation: "*Plain* here describes the instrument, so *simple* or *undecorated* fits; it does not mean *flat land*.",
      }),
      P.manual({
        label: "(n)",
        type: "EXTENDED_RESPONSE",
        marks: 15,
        wordLimit: { max: 150 },
        stem: "**Summary.** Using material from paragraphs 3 to 8, summarise what Kundai learned during his stay with his grandfather and how his behaviour changed as a result.\n\nYour summary must be in continuous writing (not note form) and must not be longer than **150 words**. Use your own words as far as possible.",
        points: [
          "At first he had to watch and do simple tasks before touching the work",
          "He grew impatient and made a key in a hurry",
          "He learned that rushing produced a poor result",
          "He learned to listen to the different notes metal makes",
          "He learned that tiny changes alter the sound / to be quiet and attentive",
          "He began to get up early without being told",
          "He learned to control the heat of the fire",
          "He learned to use the hammer's weight rather than force",
          "He kept testing his keys / persevered despite blistered fingers",
          "He finished all the keys of his own instrument",
          "At home he became tidy and responsible without being asked",
          "His school marks improved steadily",
          EXPRESSION(150),
        ],
        modelAnswer: "During his first week Kundai only did chores and observed his grandfather. Growing impatient, he hurried to make a key on his own, and its dull sound taught him that haste spoils work. Sekuru then showed him how the size of the metal and the smallest touch of the file change a note, and that he had to stay silent and attentive. From then on he got up early without being called, learned to keep the fire evenly hot and to let the hammer's weight do the work, and checked each key repeatedly, even when his fingers blistered. By the end of the holiday he had completed every key of his own mbira. Back home he looked after his things without being told, and his marks rose gradually.",
        explanation: "The summary traces change, so keep the order of events and leave out description such as the songs at dusk.",
      }),
      P.fib({
        label: "(o)",
        stem: "**Section B**\n\nComplete each sentence with the correct form of the word in brackets.",
        template: "(i) Kundai's {{blank:b1}} (impatient) almost ruined his first key.   (ii) Sekuru filed every key with great {{blank:b2}} (precise).",
        blanks: [
          { id: "b1", accepted: ["impatience"], wrong: "impatiently" },
          { id: "b2", accepted: ["precision", "preciseness"], wrong: "precisely" },
        ],
        explanation: "After a possessive (*Kundai's*) and after *great*, nouns are needed: **impatience**, **precision**.",
      }),
      P.fib({
        label: "(p)",
        stem: "Choose the correct verb form to complete each sentence.",
        template: "(i) By the end of the holiday, Kundai {{blank:t1}} every key himself.   (ii) While Sekuru {{blank:t2}}, Kundai decided to make a key.",
        blanks: [
          { id: "t1", accepted: ["had made"], choices: ["had made", "has made", "makes", "will make"] },
          { id: "t2", accepted: ["was resting"], choices: ["was resting", "has rested", "rests", "is resting"] },
        ],
        explanation: "1. *By* + a past time needs the **past perfect**: *had made*. 2. A background action in progress in the past takes the **past continuous**: *was resting*.",
      }),
      P.manual({
        label: "(q)",
        marks: 2,
        stem: "Rewrite the following in **reported speech**, beginning with the words given.\n\n*\"Your Sekuru needs help,\" his mother said to Kundai.*\n\nHis mother told Kundai that …",
        points: [
          "Changes the pronoun: *your* → *his*",
          "Backshifts the verb: *needs* → *needed* (no quotation marks)",
        ],
        modelAnswer: "His mother told Kundai that his Sekuru needed help.",
        explanation: "When reporting, change pronouns to fit the new speaker and move the present tense back to the past.",
      }),
      P.mcq({
        label: "(r)",
        stem: "Which sentence is correctly punctuated?",
        options: [
          ["Kundai learned three skills: firing, hammering and filing.", "Correct: a colon introduces a list after a complete clause."],
          ["Kundai learned three skills; firing, hammering and filing.", "A semicolon joins two complete clauses; it cannot introduce a list."],
          ["Kundai learned: three skills, firing, hammering and filing.", "A colon must not separate a verb from its object."],
          ["Kundai learned three skills, firing: hammering and filing.", "The colon breaks the list in the wrong place."],
        ],
        answer: "A",
        explanation: "Use a **colon** after a complete statement to introduce a list or explanation.",
      }),
      P.fib({
        label: "(s)",
        stem: "Choose the correct preposition to complete each sentence.",
        template: "(i) Customers came {{blank:p1}} Harare to buy his instruments.   (ii) He fitted the key {{blank:p2}} an old practice board.",
        blanks: [
          { id: "p1", accepted: ["from"], choices: ["from", "off", "at", "onto"] },
          { id: "p2", accepted: ["to"], choices: ["to", "from", "of", "off"] },
        ],
        explanation: "Origin takes **from**; you fit one part **to** another.",
      }),
      P.mcq({
        label: "(t)",
        stem: "In paragraph 1, Kundai's mother *had finally run out of patience*. What does the phrasal verb **run out of** mean?",
        options: [
          ["have no more of something left", "Correct: to run out of something is to use it all up."],
          ["leave a place in a great hurry", "That is the literal *run out*, without *of* and an object."],
          ["show something in large amounts", "This is the opposite meaning."],
          ["lose something by accident", "Patience is not lost by accident here; it has been used up."],
        ],
        answer: "A",
        explanation: "**Run out of** = have none left: her patience had been used up.",
      }),
    ],
  });

  // =================================================================================================================
  // Item 5: expository/discursive, young people and smartphones.
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: SECS, concepts: C,
    stem: PHONE,
    hints: HINTS,
    explanation: "A balanced expository passage sets benefits against problems and ends with advice. Questions on attitude reward recognising that balance; the summary asks for one side only, so select carefully.",
    parts: [
      P.short({
        label: "(a)",
        stem: "**Section A**\n\nFrom paragraph 1, name **one** thing a smartphone serves as for many young people.",
        accepted: ["alarm clock", "an alarm clock", "their alarm clock", "radio", "a radio", "their radio", "camera", "a camera", "their camera", "library", "a library", "their library", "meeting place", "a meeting place", "their meeting place"],
        keywords: { any: ["alarm", "radio", "camera", "library", "meeting"] },
        model: "an alarm clock",
        wrong: ["a family phone"],
        explanation: "*It is their alarm clock, their radio, their camera, their library and their meeting place.* Any one earns the mark.",
      }),
      P.short({
        label: "(b)",
        stem: "From paragraph 2, how do young people who sell goods and services advertise to their customers?",
        accepted: ["through messaging groups", "messaging groups", "on messaging groups", "in messaging groups", "via messaging groups", "using messaging groups", "through message groups", "message groups"],
        keywords: { all: ["groups"] },
        model: "through messaging groups",
        wrong: ["on the radio"],
        explanation: "*advertise to hundreds of customers through messaging groups at almost no cost*.",
      }),
      P.manual({
        label: "(c)",
        marks: 2,
        stem: "According to paragraph 2, state **two** ways in which a smartphone helps a student at a rural school with few textbooks.",
        points: [
          "Any one of: looking up the meaning of words / watching videos that explain topics (e.g. photosynthesis) / downloading revision notes / receiving lessons and homework from teachers through group chats",
          "A second, different way from the same list",
        ],
        modelAnswer: "The student can look up the meanings of words and watch videos explaining topics such as photosynthesis.",
        explanation: "Three ways are listed; any two earn the marks. Family calls and selling are other benefits, not for the student's studies.",
      }),
      P.mcq({
        label: "(d)",
        stem: "In paragraph 4, *Sleep is another casualty*. What does **casualty** mean here?",
        options: [
          ["something that suffers harm as a result", "Correct: like a person injured in an accident, sleep is damaged by phone use."],
          ["something that is done in a casual way", "*Casualty* is not related in meaning to *casual*."],
          ["a hospital department for emergencies", "This sense exists, but it makes no sense in the sentence."],
          ["a benefit gained by using technology", "The paragraph describes harm, not benefits."],
        ],
        answer: "A",
        explanation: "A **casualty** is a victim of an event; *another* links sleep to concentration as things harmed by phones.",
      }),
      P.mcq({
        label: "(e)",
        stem: "In paragraph 6 the writer advises young people *to use them deliberately*. What does **deliberately** mean here?",
        options: [
          ["by conscious choice and on purpose", "Correct: using the phone deliberately means deciding when and why to use it, as the habits that follow show."],
          ["as often as is possible each day", "The advice is to limit use, not increase it."],
          ["secretly, so adults cannot see", "Secrecy is not suggested."],
          ["without thinking about it at all", "This is the opposite: habitual, unthinking use is the problem."],
        ],
        answer: "A",
        explanation: "**Deliberately** = intentionally, with thought. The habits listed (switching off notifications, phone-free times) are conscious choices.",
      }),
      P.mcq({
        label: "(f)",
        stem: "Why does the writer describe the father at the supper table in paragraph 7?",
        options: [
          ["To show that adults must follow their own advice", "Correct: he scolds his daughter while doing the same thing, so his words have *little effect*."],
          ["To show that fathers are stricter than mothers", "Mothers are not mentioned."],
          ["To argue that phones should be banned at home", "The writer rejects a complete ban in paragraph 6."],
          ["To show that adults receive more messages", "The number of messages is not the point."],
        ],
        answer: "A",
        explanation: "The example illustrates *Adults can also set an example*: advice works only if adults practise it.",
      }),
      P.manual({
        label: "(g)",
        marks: 3,
        stem: "Using your **own words**, explain how many apps keep young people using their phones, according to paragraph 3.",
        points: [
          "They are made to keep a user's attention for as long as they can",
          "Every alert, message or like gives a little feeling of enjoyment / reward",
          "So users keep picking the phone up over and over",
        ],
        modelAnswer: "The apps are built to hold on to the user's interest for as long as possible. Each alert or approval of a post brings a quick moment of satisfaction, so people find themselves picking up the phone repeatedly.",
        explanation: "Change *designed to hold attention*, *burst of pleasure* and *again and again* into your own words.",
      }),
      P.manual({
        label: "(h)",
        marks: 2,
        stem: "According to paragraph 5, why are cruel messages online worse than playground teasing? Give **two** reasons.",
        points: [
          "They follow the victim home, so there is no escape",
          "They stay online long afterwards / spread through the whole school in minutes",
        ],
        modelAnswer: "The victim cannot escape them even at home, and they remain online long after the event, having spread through the school in minutes.",
        explanation: "The phrase *unlike playground teasing* signals the contrast.",
      }),
      P.manual({
        label: "(i)",
        marks: 3,
        stem: "In paragraph 8 the writer says the smartphone is *as powerful and as neutral as fire*.\n\nName the figure of speech and explain what the comparison suggests.",
        points: [
          "Identifies a simile",
          "Meaning: the phone is neither good nor bad in itself; it can help or harm",
          "Effect/explanation: like fire, which can cook food or burn a house, its result depends on how people use it; the familiar image makes the warning vivid",
        ],
        modelAnswer: "It is a simile. Fire can cook a meal or destroy a home, and the writer suggests the smartphone is the same: not good or bad in itself, but helpful or harmful depending on how we use it.",
        explanation: "The next sentence (*It can cook our food or burn down our house*) develops the comparison.",
      }),
      P.manual({
        label: "(j)",
        marks: 2,
        stem: "What is the writer's attitude towards smartphones? Support your answer with **one** detail from the passage.",
        points: [
          "Attitude: balanced / measured: sees real benefits as well as serious dangers (not wholly for or against)",
          "Supporting detail, e.g. *The benefits are real* together with *There are darker dangers too*; or *Banning phones completely is neither practical nor wise*",
        ],
        modelAnswer: "The writer is balanced, admitting that 'the benefits are real' but warns of the dangers, and argues for wise use rather than a ban.",
        explanation: "The structure (benefits, problems, advice) reveals a balanced, thoughtful attitude.",
      }),
      P.manual({
        label: "(k)",
        marks: 2,
        stem: "Why does the writer believe that banning phones completely is not a good idea?",
        points: [
          "Phones are now part of how the world communicates, learns and works",
          "So it is better to teach young people to use them wisely / deliberately",
        ],
        modelAnswer: "Phones are now central to how people communicate, learn and work, so young people should learn to use them sensibly rather than be denied them.",
        explanation: "Paragraph 6 gives the reason (*since …*) and the alternative (*A better approach …*).",
      }),
      P.short({
        label: "(l)",
        stem: "From paragraph 6, where does the writer suggest leaving the phone at night?",
        accepted: ["in another room", "another room", "in a different room", "a different room", "outside the bedroom", "in another room at night"],
        keywords: { all: ["room"] },
        model: "in another room",
        wrong: ["under the pillow"],
        explanation: "*leaving the phone in another room at night*.",
      }),
      P.manual({
        label: "(m)",
        marks: 5,
        stem: "Give **one** word or short phrase (of not more than seven words) which has the same meaning as each of the following words as it is used in the passage:\n\n1. **handful** (paragraph 2)\n2. **genuine** (paragraph 2)\n3. **irritated** (paragraph 4)\n4. **confiscating** (paragraph 7)\n5. **scolds** (paragraph 7)",
        points: [
          "handful: a small number / very few",
          "genuine: real / true / sincere",
          "irritated: annoyed / short-tempered",
          "confiscating: taking away (as a punishment) / seizing",
          "scolds: tells off / rebukes / criticises angrily",
        ],
        modelAnswer: "1. very few 2. real 3. annoyed 4. taking away as a punishment 5. tells off",
        explanation: "*Handful* here means a small number, not what fits in a hand.",
      }),
      P.manual({
        label: "(n)",
        type: "EXTENDED_RESPONSE",
        marks: 15,
        wordLimit: { max: 150 },
        stem: "**Summary.** Using material from paragraphs 3 to 5 only, summarise the problems that smartphones can cause young people.\n\nYour summary must be in continuous writing (not note form) and must not be longer than **150 words**. Use your own words as far as possible.",
        points: [
          "Apps are designed to keep them using the phone",
          "They keep checking for messages and likes",
          "They are distracted and get little studying done",
          "They find it hard to concentrate for long",
          "Screen light at night makes it harder to fall asleep",
          "Late-night chatting leaves them tired in class",
          "Tiredness reduces learning and memory and makes them irritable",
          "Cruel messages, embarrassing pictures and rumours spread quickly",
          "Online bullying follows victims home / stays online",
          "Strangers pretend to be friends to win their trust",
          "False news spreads quickly",
          "Money meant for transport or food is spent on data",
          EXPRESSION(150),
        ],
        modelAnswer: "Many apps are built to keep young people hooked, so they check their phones again and again for new messages and approval. As a result, study time is wasted and many struggle to concentrate for more than a few minutes. Sleep also suffers: screen light late at night keeps the brain alert, and conversations past midnight leave students drowsy in class, where they learn and remember less and lose their temper more easily. Phones also expose young people to cruelty, as hurtful messages, humiliating pictures and gossip spread rapidly and pursue victims even at home. Strangers may pose as friends to gain their confidence, and untrue stories circulate faster than facts. Finally, buying data can swallow money intended for bus fares or lunch.",
        explanation: "Keep to problems from paragraphs 3 to 5; the benefits in paragraph 2 and the advice in paragraphs 6 and 7 earn no marks here.",
      }),
      P.fib({
        label: "(o)",
        stem: "**Section B**\n\nComplete each sentence with the correct form of the word in brackets.",
        template: "(i) Too much screen time can harm a student's {{blank:b1}} (concentrate).   (ii) Many parents feel {{blank:b2}} (anxiety) about online bullying.",
        blanks: [
          { id: "b1", accepted: ["concentration"], wrong: "concentrating" },
          { id: "b2", accepted: ["anxious"], wrong: "anxiously" },
        ],
        explanation: "1. After a possessive, a **noun**: *concentration*. 2. After *feel*, an **adjective**: *anxious*.",
      }),
      P.fib({
        label: "(p)",
        stem: "Choose the correct verb form to complete each sentence.",
        template: "(i) Not long ago, a whole family {{blank:t1}} a single phone.   (ii) Ever since she bought a smartphone, Rudo {{blank:t2}} less sleep.",
        blanks: [
          { id: "t1", accepted: ["shared"], choices: ["shared", "has shared", "shares", "will share"] },
          { id: "t2", accepted: ["has had"], choices: ["has had", "had", "is having", "have"] },
        ],
        explanation: "1. *Not long ago* is a finished past time: **past simple** *shared*. 2. *Ever since* + a past event, continuing to now: **present perfect** *has had*.",
      }),
      P.manual({
        label: "(q)",
        marks: 2,
        stem: "Rewrite the following in **reported speech**, beginning with the words given.\n\n*The teacher said to us, \"Leave your phones in the box before the test begins.\"*\n\nThe teacher told us …",
        points: [
          "Uses *to* + infinitive for the command: *told us to leave* (no quotation marks)",
          "Changes pronoun and tense: *your* → *our*, *begins* → *began*",
        ],
        modelAnswer: "The teacher told us to leave our phones in the box before the test began.",
        explanation: "Reported commands use **told + object + to-infinitive**; pronouns and tenses shift as usual.",
      }),
      P.mcq({
        label: "(r)",
        stem: "Which sentence is correctly punctuated?",
        options: [
          ["She asked whether the story was true.", "Correct: an indirect question is a statement and ends with a full stop."],
          ["She asked whether the story was true?", "An indirect (reported) question does not take a question mark."],
          ["She asked, whether the story was true.", "No comma is needed before *whether* in reported speech."],
          ["She asked whether, the story was true?", "The comma is wrong and an indirect question ends with a full stop."],
        ],
        answer: "A",
        explanation: "Reported questions keep statement word order and end with a **full stop**, not a question mark.",
      }),
      P.fib({
        label: "(s)",
        stem: "Choose the correct preposition to complete each sentence.",
        template: "(i) Some young people spend their lunch money {{blank:p1}} airtime.   (ii) Victims of bullying should know whom to report it {{blank:p2}}.",
        blanks: [
          { id: "p1", accepted: ["on"], choices: ["on", "at", "by", "with"] },
          { id: "p2", accepted: ["to"], choices: ["to", "in", "on", "by"] },
        ],
        explanation: "You spend money **on** something, and you report something **to** someone.",
      }),
      P.mcq({
        label: "(t)",
        stem: "Choose the correct form to complete the sentence.\n\n*If you switch off notifications while studying, you ___ more work done.*",
        options: [
          ["will get", "Correct: a real possibility (*If* + present simple) takes *will* + verb."],
          ["would get", "*Would* belongs with *If* + past simple (an unreal situation)."],
          ["got", "The past simple does not fit a future result."],
          ["had got", "The past perfect belongs with the third conditional."],
        ],
        answer: "A",
        explanation: "First conditional: **If + present simple, will + base verb**.",
      }),
    ],
  });
});
