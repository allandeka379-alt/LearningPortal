// Slice EWR1: Cambridge 0500 Paper 2 Section B compositions (ESSAY, 40 marks, FLE): 4 descriptive, 4 narrative.
import { concept, compositionLevels, FLE } from "../lib.mjs";

const POINTS = {
  descriptive: [
    ["Content: a vivid, convincing description with well-chosen sensory detail and imagery that creates a clear atmosphere; events are kept small", 8],
    ["Structure: a deliberate organisation (spatial, chronological, zoom or contrast) with a strong opening and a closing image", 8],
    ["Style: precise, ambitious vocabulary and varied sentence structures used for effect", 12],
    ["Accuracy: secure grammar, spelling and punctuation, including complex sentences", 12],
  ],
  narrative: [
    ["Content: an engaging story with convincing characters, a clear conflict and details that create tension or interest", 8],
    ["Structure: a well-shaped plot with controlled pace, a clear climax and an effective, satisfying ending", 8],
    ["Style: precise, ambitious vocabulary and varied sentence structures used for effect, including well-handled dialogue", 12],
    ["Accuracy: secure grammar, spelling and punctuation, including the punctuation of speech", 12],
  ],
};
const HINTS = {
  descriptive: ["Choose a structure (spatial, chronological, zoom or contrast) before you write.", "Use several senses, precise verbs and fresh imagery; do not let it become a story."],
  narrative: ["Plan one main event with a conflict, a climax and a resolution.", "Control pace: slow down at the climax and use summary for less important time."],
};

concept("eng.composition.descriptive", { file: "composition/exam-0500", keyPrefix: "composition.exam-0500", applies: FLE }, (b) => {
  const comp = (type, task, modelAnswer, d = 4) =>
    b.essay({
      d, skill: "CREATION", marks: 40, secs: 4400, examStyle: true, paper: "Paper 2", concepts: [`eng.composition.${type}`],
      stem: `**Paper 2, Section B: Composition.** Write about **400 words** (the word limit is shown with the answer box).\n\n${task}`,
      wordLimit: { min: 350, max: 450 },
      points: POINTS[type],
      levels: compositionLevels(40),
      modelAnswer,
      hints: HINTS[type],
      explanation: "The composition is marked for content and structure together with style and accuracy. Compare your writing with each point and the level descriptors, then with the model.",
    });

  // Descriptive 1 (full model).
  comp("descriptive", "**Describe a market at the moment it opens in the early morning.**", `**Model answer:**

At half past four, the market is still a skeleton. Steel frames stand in rows under the dim orange streetlights, roofless and bare, and the only sound is the cough of a lorry reversing towards the gate, its brake lights painting the wet tarmac red.

Then, almost without warning, the market begins to assemble itself. Tarpaulins are flung over frames with a sound like the beating of enormous wings. Crates thud onto counters. A woman in a thick woollen hat drags a sack of onions across the concrete, and the papery skins whisper against the floor. Somewhere a radio crackles into life, a presenter's voice too cheerful for the hour.

The cold has a smell of its own: diesel, damp cardboard and the green, bitter scent of freshly cut cabbages stacked in leaning towers. Near the entrance, a man fans a brazier until it glows, and the first smoke curls upward, carrying the promise of roasting maize.

Light arrives slowly. The sky behind the bus terminus turns from ink to grey to the colour of weak tea, and the stalls begin to show their true colours: pyramids of tomatoes as red as warning lights, bunches of bananas still tinged with green, bright plastic basins stacked like upturned drums. The vendors arrange their goods with the care of artists, turning each tomato so that its best side faces the aisle.

At one stall, an old man sits on an upturned crate, sorting green chillies into small heaps with fingers that move faster than his eyes. He does not look up. He has done this ten thousand times. Beside him, his granddaughter, perhaps eight years old, writes prices in chalk on a scrap of board, her tongue caught between her teeth in concentration.

By six, the first customers drift in: a cook from a nearby hotel with a long list, two nurses coming off a night shift, buying bread and bananas with tired, careful hands. Greetings fly across the aisles, half-shouted, half-sung. Prices are called out, questioned, laughed at, agreed.

Then, as if a switch has been thrown, the sun clears the rooftops. Light pours down the aisles, steam rises from the wet concrete, and the market, fully awake now, roars into the day.`, 4);

  // Descriptive 2 (plan + opening).
  comp("descriptive", "**Describe a crowd of people waiting for important news.**", `**Plan (zoom structure):**
1. **Wide view:** a crowd outside a school gate on the morning results are posted; the low hum of voices; heat already rising.
2. **The group:** parents in work clothes; learners in clusters; the movement of people shifting from foot to foot.
3. **Sounds and smells:** whispered prayers, nervous laughter, a vendor's call; dust, sweat and roasted groundnuts.
4. **Close-up:** one girl twisting a bracelet round and round her wrist; her mother's hand resting on her shoulder.
5. **The moment:** a teacher appears with a sheet of paper; the crowd surges forward; silence like a held breath.
6. **Pulling back (closing image):** shouts and embraces scattered through the crowd, and one boy walking away alone, slowly folding his phone into his pocket.

**Opening paragraph:** The crowd had gathered long before the gate was due to open, and now it pressed against the fence like water against a dam. Nobody spoke loudly. Voices rose and fell in a low, restless murmur, the sound of hundreds of people trying to talk about anything except the one thing they were all thinking about.`);

  // Descriptive 3 (plan + opening).
  comp("descriptive", "**Describe an old building and the people who pass by it during one day.**", `**Plan (chronological, dawn to night):**
1. **Dawn:** the building itself: peeling paint, a rusted sign, a fig tree growing out of a crack in the wall; pigeons on the ledges.
2. **Morning:** workers hurrying past without a glance; a street sweeper who greets the building as if it were an old friend.
3. **Midday:** a vendor setting out sunglasses on the steps; the building's shadow as the only shade; schoolchildren dawdling.
4. **Afternoon:** an elderly man who stops, looks up at a particular window and remembers; detail of his face.
5. **Evening:** light fading across the stone; the noise of traffic; a couple sheltering in the doorway from a sudden shower.
6. **Night (closing image):** the building dark and empty except for a single light flickering on the top floor.

**Opening paragraph:** The building on the corner has been dying for years, but it does so with dignity. Its paint, once a confident yellow, hangs from the walls in long curls like the bark of a eucalyptus, and above the arched doorway the faded letters of a name nobody remembers still cling to the stone. A fig tree has pushed its way out of a crack near the roof and leans over the street, as if it, too, is watching the people go by.`);

  // Descriptive 4 (plan + opening).
  comp("descriptive", "**Describe a place that is completely different at night from how it is during the day.**", `**Plan (contrast structure):**
1. **Day:** a school playground at noon; noise, colour, dust, games, a bell.
2. **Transition:** the last learners leave; the caretaker locks the gate; the light changes.
3. **Night, wide view:** the playground silent under moonlight; long shadows of goalposts; the classroom windows black.
4. **Night, sounds and senses:** crickets, a distant dog, the creak of a swing moving in the breeze; the cold metal of the gate.
5. **Night, close-up:** a forgotten jersey on a bench, damp with dew; a chalk hopscotch grid fading.
6. **Closing image:** dawn light touching the top of the flagpole, and the first footsteps of the day.

**Opening paragraph:** At noon, the playground is the loudest place in the world. Two hundred voices rise at once from the dusty ground, footballs thud against the walls, skipping ropes slap the earth in a steady rhythm and somewhere, always, someone is shouting a name that nobody answers. The sun bleaches everything: the white lines of the netball court, the faded blue of the benches, the dust that hangs in the air like smoke.`);

  // Narrative 1 (full model).
  comp("narrative", "**Write a story with the title \"The Key\".**", `**Model answer:**

The key arrived in an envelope with no letter, no return address and my name spelled wrongly. It was old and heavy, made of dark iron, with a bow shaped like a leaf. My mother turned it over in her hands for a long time and then said, very quietly, "That's your grandfather's."

I had never met my grandfather. He had left the family before I was born, and in our house his name was spoken the way people step around a hole in the road. All I knew was that he had once kept a shop in a small town near the border, and that the shop had closed.

"Where does it go?" I asked.

My mother didn't answer. She put the key on the shelf above the stove and went outside to take in the washing, although it wasn't dry.

For a week, the key sat there. At night I lay awake thinking about it. On Saturday, I took it down, put it in my pocket and caught the early bus.

The town was smaller than I had imagined: one main street, a fuel station, a church with a tin roof that blazed in the sun. An old woman selling bananas outside the post office looked at me for a long moment before I had even spoken. "You have his eyes," she said, and pointed down the road.

The shop stood at the far end, its windows painted over, its door chained. I pulled the key from my pocket. My hand was shaking. It slid into the lock as if it had been waiting. One turn. A stiff click. The door swung inward on a breath of dust.

Inside, everything was covered with sheets, like furniture in a house where someone has died. I pulled one away. Beneath it was a wooden counter, and on the counter, stacked neatly, were letters. Dozens of them. Every one was addressed to my mother, every one was stamped, and not one had been posted.

I read the first standing up. I read the next twenty sitting on the dusty floor. He had written every month for sixteen years: about the weather, about the shop, about how sorry he was, and about how he could never find the courage to walk to the post office.

When I got home that evening, I didn't say anything. I simply put the bundle of letters on the kitchen table, beside the key. My mother sat down slowly. She picked up the first envelope, and for the first time in my life I watched her read my grandfather's handwriting.`, 4);

  // Narrative 2 (full model).
  comp("narrative", "**Write a story that begins: \"Nobody had opened the gate for twenty years.\"**", `**Model answer:**

Nobody had opened the gate for twenty years. The padlock had rusted into a single lump of orange metal, and a creeper with small white flowers had woven itself through the bars so thoroughly that the gate seemed to be held shut by the garden itself.

Every morning on our way to school, Farai and I walked past it. Every morning, Farai said, "One day I'm going in," and every morning I told him not to be stupid.

The house beyond the gate belonged to Mrs Ncube, or had done. Some said she had moved to England; others that she had died and nobody had noticed. The grown-ups did not like to talk about it, which made us talk about it all the more.

Then, on the last day of the term, the gate was open.

We stopped so suddenly that a cyclist swerved around us, swearing. The padlock lay on the ground, cut cleanly through. The creeper had been pulled away in long, torn strands, and fresh footprints led up the overgrown path towards the house.

"Thieves," I whispered.

Farai was already walking through.

I followed, because I always followed. The grass came up to our knees and was full of grasshoppers that sprang away from us with a dry clicking. The house was bigger than it looked from the road, with a wide veranda and shutters hanging at strange angles. The front door stood ajar.

From inside came a sound: a slow, steady scraping, like something heavy being dragged across a floor.

Farai looked at me. For the first time, he did not look brave.

The scraping stopped. Footsteps approached the door. I grabbed Farai's sleeve and was turning to run when a voice called out, "Well, don't just stand there. Come and help me with this piano."

In the doorway stood a tiny, white-haired woman in a gardening hat, holding a crowbar.

Her name, she told us over a glass of warm orange squash, was Mrs Ncube. She had lived for twenty years with her daughter in Manchester, and when her daughter married, she had decided it was time to come home. "I lost the key to that padlock before I even left," she said cheerfully. "A man with a hacksaw solved the problem in about four seconds."

We spent the first week of the holidays clearing her garden. By the end of it, the gate had a new coat of green paint and no padlock at all. Mrs Ncube said she had kept it closed long enough.`, 4);

  // Narrative 3 (plan + opening).
  comp("narrative", "**Write a story in which a character has to make a difficult choice.**", `**Plan:**
1. **Opening:** Rutendo, a talented runner, is selected for a national athletics trial in the capital on the same day as her younger brother's operation at the provincial hospital.
2. **Build-up:** her coach insists this is the only chance this year; her mother says she must go; her brother, frightened, asks her to stay.
3. **Rising tension:** the night before; the packed bag by the door; she cannot sleep; she listens to her brother's breathing in the next room.
4. **Climax:** at the bus terminus, the bus to the capital is boarding; across the road, the kombi to the hospital; she stands between them; the conductor calls the last call.
5. **Resolution:** she runs for the kombi; at the hospital she holds her brother's hand as he goes into theatre.
6. **Ending:** a few weeks later, the coach visits with news of another trial; her brother, recovering, insists on coming to watch.

**Opening paragraph:** The letter from the athletics association arrived on the same day as the appointment card from the hospital, and Rutendo laid them side by side on the kitchen table as if they were two cards in a game she did not know how to play. Both had the same date printed on them: the fourteenth of March.`);

  // Narrative 4 (plan + opening).
  comp("narrative", "**Write a story with the title \"The Return\".**", `**Plan:**
1. **Opening:** a young man, Tafadzwa, steps off a bus in his home village after eight years working abroad; nothing looks quite as he remembers.
2. **Build-up:** he left after a quarrel with his father, who wanted him to stay and farm; they have not spoken since.
3. **Rising tension:** he walks the familiar path; children do not recognise him; his old school has a new block; he grows more anxious.
4. **Flashback:** the night he left, his father standing in the doorway, silent.
5. **Climax:** he reaches the homestead; his father, older and thinner, is mending a fence and does not look up at first.
6. **Resolution and ending:** his father hands him the other end of the wire without a word; together they finish the fence; the story ends with the sound of the wire being twisted tight.

**Opening paragraph:** The bus left him at the growth point in a cloud of red dust and diesel smoke, and by the time it had cleared, Tafadzwa was the only person standing at the stop. He set down his suitcase and looked around. The tuck shop had a new coat of paint. The old baobab beside it had lost a branch. Everything was where it had always been, and nothing was quite the same.`);
});
