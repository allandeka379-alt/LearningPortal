// Slice EWR1: ZIMSEC Paper 1 Section A compositions (ESSAY, 30 marks, ZIM).
import { concept, compositionLevels, ZIM } from "../lib.mjs";

const C = {
  narrative: "eng.composition.narrative",
  descriptive: "eng.composition.descriptive",
  informative: "eng.composition.informative",
  argumentative: "eng.composition.argumentative",
  discursive: "eng.composition.discursive",
};
const CONTENT = {
  narrative: "Content: a relevant story with a clear plot (conflict, climax, resolution), convincing characters and an ending that clearly answers the title",
  descriptive: "Content: a vivid, relevant description with sensory detail, precise imagery and a consistent atmosphere; any events are kept small",
  informative: "Content: accurate, relevant information explained clearly with realistic examples; no invented facts or statistics",
  argumentative: "Content: a clear position kept throughout, developed reasons supported by examples, and a counter-argument that is fairly stated and rebutted",
  discursive: "Content: both sides of the issue developed fairly with examples, leading to a reasoned conclusion",
};
const HINTS = {
  narrative: ["Plan one main event with a problem, a climax and a resolution.", "Start close to the problem; make sure the title is central."],
  descriptive: ["Choose a structure (spatial, chronological or zoom) before you write.", "Aim for at least three senses and end on an image."],
  informative: ["Choose a pattern: sequence, categories, cause and effect, or problem and solution.", "Write only what you know; explain each point with an example."],
  argumentative: ["Decide your position first and state it in the introduction.", "Plan three reasons and one counter-argument with a rebuttal."],
  discursive: ["Draw two columns, for and against, with at least two points each.", "Keep your own verdict for a reasoned conclusion."],
};

concept("eng.composition.narrative", { file: "composition/exam-zimsec", keyPrefix: "composition.exam-zimsec", applies: ZIM }, (b) => {
  const zim = (type, title, modelAnswer, d = type === "argumentative" || type === "discursive" ? 4 : 3) =>
    b.essay({
      d, skill: "CREATION", marks: 30, secs: 3300, examStyle: true, paper: "Paper 1", concepts: [C[type]],
      stem: `**Paper 1, Section A: Composition.** Write a composition of about **400 words** on the following topic (the word limit is shown with the answer box).\n\n**${title}**`,
      wordLimit: { min: 350, max: 450 },
      points: [
        [CONTENT[type], 10],
        ["Organisation: a planned composition with an effective introduction and conclusion, unified paragraphs and smooth links", 6],
        ["Style: varied, precise vocabulary and sentence structures suited to the type of writing", 6],
        ["Accuracy: correct grammar, spelling and punctuation; errors are few and do not obscure meaning", 8],
      ],
      levels: compositionLevels(30),
      modelAnswer,
      hints: HINTS[type],
      explanation: `Examiners judge content and relevance, organisation, style and accuracy together. Compare your composition with the points and the level descriptors, then with the model.`,
    });

  // 1. Narrative (full model).
  zim("narrative", "The day the borehole ran dry", `**Model answer:**

Nobody in our village noticed the first warning. On a Tuesday in October, the borehole handle at Chikomo began to squeak, a thin complaining note that we children copied in our games. By Friday, the water came out the colour of weak tea. On Saturday morning, it did not come out at all.

I was fourteen and it was my job to fetch water before school. When I reached the borehole that morning, a queue of women and children already stood beside it with empty containers, staring at the pump as if it were a sick relative. Mai Sibanda, who chaired the water committee, pumped until her arms shook. Nothing. Only a dry cough of air from the spout.

"The river," someone said quietly. Everyone knew what that meant: a walk of nearly two hours each way, down a rocky path, to a river that was itself shrinking in the heat.

For the next week, the whole village rose before dawn. My younger brother Tinashe and I carried a twenty-litre container between us, swapping hands every few minutes. My shoulders burned. At school I fell asleep over my history book, and Mr Gumbo, who usually shouted, simply let me rest.

The worst moment came on the eighth day. Tinashe slipped on the path, and the container rolled away from us, bouncing off the rocks and splitting open. We watched our morning's water soak into the red earth in seconds. My brother began to cry. I wanted to cry too, but I picked up the broken container and said, "Tomorrow we start earlier."

That evening, Mai Sibanda called a meeting under the muchakata tree. The pump, she explained, needed a part that cost more than the committee had, because many families had stopped paying their small monthly contribution. There was a long, uncomfortable silence. Then my father stood up, put two notes on the table, and sat down without a word. One by one, others followed.

Three days later, a mechanic arrived from Murehwa with the new part. When the first gush of clean water splashed into Mai Sibanda's bucket, the whole crowd cheered as if our team had won a cup final.

I still fetch water every morning. Now, though, I never complain about the squeak of the handle. I have learnt that a borehole belongs to everybody, and that if nobody looks after it, everybody walks.`);

  // 2. Narrative (plan + opening).
  zim("narrative", "Write a story that ends with the words: \"…and from that day, I always counted my change.\"", `**Plan:**
1. **Opening:** Saturday errand; my mother gives me money to buy groceries and pay a bill at the shops in Sakubva; warns me to be careful.
2. **Build-up:** I am in a hurry to meet friends for football; I rush through the grocery shop, the bill payment and a stop to buy airtime.
3. **Problem:** at the till I hand over a large note, take the change without looking and run.
4. **Climax:** at home my mother counts the change; it is far short; I retrace my steps with her; the cashier denies everything; the shop owner checks the till slip, which shows the amount I was owed.
5. **Resolution:** the owner refunds the money and apologises; my mother says nothing on the walk home, which is worse than shouting; I give up football that afternoon to help her.
6. **Ending:** reflection on trust and care with money, closing with the given words.

**Opening paragraph:** My mother folded the notes twice and pressed them into my palm as if she were handing me something alive. "Sugar, cooking oil, the electricity token, and bring back every cent," she said. I nodded without really listening. Across the road, my friends were already kicking a ball against the wall of the tuck shop, and the match would not wait for me.`);

  // 3. Narrative (plan + opening).
  zim("narrative", "A promise I made to my grandmother", `**Plan:**
1. **Opening:** my grandmother, the keeper of family stories in Gutu, falls ill; she asks me to learn the history of our totem and the names of our ancestors.
2. **Build-up:** I promise, but I am more interested in my phone and in school friends; weeks pass.
3. **Problem:** a message: Gogo is weaker; I realise I have learnt nothing.
4. **Climax:** I travel to her on the next bus, sit beside her bed with a notebook and she tells me the stories through the night; I record them on my phone and write them down.
5. **Resolution:** she recovers enough to correct my spelling of the names; at the family gathering at Christmas I recite the lineage, to the surprise of my uncles.
6. **Ending:** I keep the notebook; the promise has become my own wish to keep our heritage alive.

**Opening paragraph:** Gogo did not ask for much in her life, so when she reached for my hand and held it with the strength of someone much younger, I knew that what she was about to ask mattered. "When I am gone," she said, "who will remember where we come from?" The smell of woodsmoke filled the small kitchen, and outside a hen scratched in the dust. I was fifteen. I made the promise as easily as people make promises they have not yet understood.`);

  // 4. Descriptive (plan + opening).
  zim("descriptive", "Describe a wedding celebration in your community", `**Plan (chronological, one day):**
1. **Early morning:** relatives arriving from Harare and Bulawayo; pots on open fires; the smell of woodsmoke and boiling meat.
2. **Mid-morning:** the yard transformed; plastic chairs in rows, a canopy decorated in the couple's colours; the hum of a generator.
3. **The arrival of the bride:** ululation rising like a wave; aunts dancing ahead of her; dust lifted by stamping feet.
4. **Close-up:** the bride's grandmother, wrapped in a new zambia cloth, wiping tears with the corner of it.
5. **Afternoon:** the meal; sadza and rice, chicken and beef stew, the clatter of plates; children darting between tables.
6. **Evening (closing image):** the music fading, chairs stacked, a single string of lights swaying in the breeze.

**Opening paragraph:** Long before the sun cleared the gum trees, the homestead was awake. Three black pots squatted over fires at the edge of the yard, their lids rattling, and the smell of woodsmoke and simmering beef drifted across the fields so that even the neighbours' dogs came to sit hopefully at the fence. Aunts in matching headscarves moved between the fires and the kitchen hut, calling instructions to one another over the hiss of the flames.`);

  // 5. Descriptive (full model).
  zim("descriptive", "Describe the scene at a clinic on a busy morning", `**Model answer:**

By seven o'clock the queue at Chipadze Clinic already curls around the building like a long, patient snake. Mothers sit on the low concrete wall with babies tied to their backs, old men lean on walking sticks, and a few young men stand apart, scrolling through their phones and pretending not to be unwell.

The air is still cool, and it carries a mixture of smells: the sharp sting of disinfectant drifting from the open door, the sweetness of the frangipani tree by the gate, and the smoke of a cooking fire from the houses across the road. Somewhere a baby cries, a thin, hungry wail, and its mother hums softly until it stops.

Inside, the waiting room is a narrow corridor of wooden benches, polished smooth by years of waiting. Posters on the walls show smiling families washing their hands and children opening their mouths for vaccines. A ceiling fan turns slowly, more for show than for comfort. Every few minutes a door opens, a nurse in a crisp white uniform calls out a name, and a whole bench shuffles one place along, like beads sliding on a string.

At the registration desk, a clerk with reading glasses perched on the end of her nose writes in a thick ledger. Her pen scratches steadily. She does not look up when she speaks, but her voice is kind: "Card? Date of birth? Sit, please, Mbuya."

Near the window, a small boy of about six sits beside his grandmother with a bandage wrapped around his hand. He studies the poster of a giant mosquito with great seriousness, then looks at his own arm, as if checking that no such creature is hiding there.

As the morning wears on, the sun climbs over the roof and the benches outside become hot to the touch. Women open umbrellas against the glare. A vendor arrives with a cooler box of frozen drinks and freezits, and children who have been silent for hours suddenly come to life, tugging at their mothers' sleeves.

By noon the queue is shorter, but it has not disappeared. New people arrive as others leave, clutching small brown envelopes of tablets and the relief of having been seen. Outside the gate, the old man with the walking stick pauses in the shade of the frangipani, unfolds his prescription, reads it slowly and then, very carefully, puts it in his breast pocket and pats it twice.`);

  // 6. Descriptive (plan + opening).
  zim("descriptive", "Describe the first heavy rains of the season in your area", `**Plan (chronological: before, during, after):**
1. **The waiting:** weeks of heat; cracked fields; cattle standing in thin shade; everyone watching the sky.
2. **The build-up:** purple clouds banking in the west; a sudden cool wind; dust devils; women rushing to take in washing.
3. **The first drops:** fat drops striking the dust and raising tiny puffs; the smell of wet earth.
4. **The downpour:** the drumming on corrugated-iron roofs; water pouring off eaves; children shrieking and dancing in it.
5. **After:** streams of red water in the paths; frogs calling; the air washed clean.
6. **Closing image:** next morning, my grandfather oiling the plough in the doorway, smiling at the dark, soaked fields.

**Opening paragraph:** For six weeks the sky had been a hard, empty blue, and the land beneath it had cracked into a pattern like the skin of an old hand. The cattle stood with their heads lowered in the thin shade of the mopane trees, too tired even to flick away the flies. Every evening, the old men gathered at the edge of the fields and looked west, and every evening they walked home without a word.`);

  // 7. Informative (full model).
  zim("informative", "How a community can protect its wetlands", `**Model answer:**

Wetlands, known in many parts of Zimbabwe as vleis or matoro, are areas of low ground where the soil stays waterlogged for much of the year. They may look like nothing more than patches of reeds and grass, yet they quietly support whole communities. They store rainwater like a sponge and release it slowly into streams and wells during the dry season, filter dirt from the water and provide grazing, reeds for thatching and homes for birds and fish. Unfortunately, many wetlands are being damaged. A community can protect them in several practical ways.

The first step is to understand why the wetland matters. Many people simply do not know that the spring which feeds their well depends on the vlei above it. Community meetings, school lessons and talks by agricultural extension officers can explain this link. When people understand that draining a wetland may dry up their own water supply, they are far more willing to protect it.

Secondly, communities should agree on where building and cultivation are allowed. Houses, roads and deep drainage ditches can destroy a wetland permanently, because they let the water run off instead of soaking in. Local leaders, together with the council, can mark the wetland boundaries and refuse to allocate stands inside them.

A third way is to farm and graze carefully. Some gardening at the edge of a wetland can be sustainable, but ploughing the centre or burning the reeds destroys the plants that hold the soil together. Rotating grazing areas and keeping cattle away during the wettest months allows the grass to recover.

Fourthly, waste must be kept out. Plastic bags, bottles and household rubbish thrown into a vlei block the flow of water and poison fish and birds. Regular clean-up days, organised by schools, churches and youth groups, and bins placed near shopping centres can reduce this problem.

Finally, communities can restore damaged areas. Blocking small drainage channels with stones and planting indigenous grasses and trees on the edges helps water soak back into the ground. Within a few seasons, birds and frogs often return, a clear sign that the wetland is healing.

In summary, protecting a wetland depends on knowledge, clear rules, careful farming, clean surroundings and restoration. None of these steps is expensive, but together they ensure that the vlei continues to provide water long after the rains have stopped.`);

  // 8. Informative (plan + opening).
  zim("informative", "The dangers of drug and substance abuse among young people, and how they can be avoided", `**Plan (cause and effect, then solutions):**
1. **Introduction:** what drug and substance abuse means (using substances such as illegal drugs, strong alcohol or cough mixtures in harmful ways); why young people are at risk.
2. **Health dangers:** damage to the brain, liver and lungs; risk of addiction; mental illness.
3. **Social and educational dangers:** poor concentration, dropping out of school, conflict at home, crime to pay for drugs.
4. **Why young people start:** peer pressure, boredom, stress, easy availability.
5. **How it can be avoided:** saying no with confidence; choosing friends carefully; sport, clubs and church youth groups; talking to trusted adults and counsellors; community action against dealers.
6. **Conclusion:** prevention is easier than recovery; everyone has a role.

**Opening paragraph:** Drug and substance abuse means using substances such as illegal drugs, strong home-brewed alcohol or medicines like cough mixtures in ways that harm the body and mind. Across Zimbabwe, teachers, parents and health workers have become increasingly worried about young people who start using such substances, often out of curiosity or under pressure from friends. Understanding the dangers is the first step towards avoiding them.`);

  // 9. Informative (plan + opening).
  zim("informative", "How to start and run a small business while you are still at school", `**Plan (sequence):**
1. **Introduction:** why a small business teaches responsibility and money skills; the importance of balancing it with studies.
2. **Choosing an idea:** something you can do in spare time with little money: freezits, baking, selling airtime, repairing phones, growing vegetables.
3. **Starting capital and planning:** saving or borrowing a small amount from family; working out costs and selling price; a simple notebook budget.
4. **Running it:** keeping records of every sale and purchase; separating business money from pocket money; good customer service.
5. **Balancing school and business:** set working hours; never trade during lessons; ask parents' and school's permission.
6. **Growing and conclusion:** reinvest profit; save part of it; the skills last a lifetime.

**Opening paragraph:** Many successful business people in Zimbabwe began with something very small: a cooler box of freezits, a tray of buns or a few packets of seeds. Running a small business while still at school can teach lessons that no textbook can, from handling money to keeping promises to customers. However, it must be done carefully, so that studies do not suffer.`);

  // 10. Argumentative (full model).
  zim("argumentative", "\"Boys and girls should share household chores equally.\" Do you agree?", `**Model answer:**

In many homes, the day begins with a familiar scene: a girl sweeping the yard, fetching water and preparing breakfast, while her brother sleeps for another hour. Few people stop to ask whether this is fair. I firmly believe that boys and girls should share household chores equally, because it is just, it prepares both for adult life and it gives girls the same chance to succeed at school.

The first reason is simple fairness. A family is a team, and in a team every member contributes. When one child carries most of the work only because she is a girl, she learns that her time matters less than her brother's. A brother who washes the dishes is not doing his sister a favour; he is doing his share.

Secondly, sharing chores prepares both boys and girls for independent life. Young men who leave home for college or work in Harare or Johannesburg often discover that they cannot cook a simple meal or wash their own clothes. A boy who has learnt to cook sadza, iron a shirt and keep a room clean will look after himself and, later, will be a more helpful partner and parent.

The third and perhaps most important reason is education. A girl who spends three hours every afternoon on chores has far less time and energy for homework than a brother who spends those hours resting or playing football. Over the years, this difference can affect examination results and future careers. When chores are shared, both children have time to study.

Some people argue that boys already have their own duties, such as herding cattle or repairing fences, and that tradition has given each gender its proper role. It is true that boys in many rural homes work hard outdoors. However, sharing does not mean abandoning these tasks; it means dividing all the work, indoor and outdoor, fairly. Traditions have always changed over time, and a tradition that leaves girls exhausted and behind at school is one worth changing.

In conclusion, equal sharing of household chores is fair, practical and good for education. It costs nothing but a change of habit. If every family made that change, we would raise a generation of capable young men and confident young women, and our homes would be happier for it.`);

  // 11. Argumentative (plan + opening).
  zim("argumentative", "\"Mobile money has done more good than harm in Zimbabwe.\" Do you agree?", `**Plan (agree):**
1. **Introduction:** a vendor at a rural market accepting payment by phone; thesis: mobile money has done far more good than harm.
2. **Reason 1 (convenience and safety):** people no longer carry large amounts of cash; less risk of theft; payments at any time.
3. **Reason 2 (inclusion):** people far from banks can send, receive and save money; families in towns support relatives in rural areas instantly.
4. **Reason 3 (small business):** vendors, farmers and transport operators can receive payment from customers anywhere.
5. **Counter-argument:** charges, fraud and scams, network failures; rebuttal: these are reasons to regulate and educate, not to abandon the service; learning to protect PINs and check messages reduces fraud.
6. **Conclusion:** restate; call for financial education so that everyone benefits safely.

**Opening paragraph:** At a small market near Mount Darwin, a woman selling tomatoes no longer has to worry about having change. Her customers simply send the money to her phone, and she checks the message before handing over the bag. Scenes like this are now so common that it is easy to forget how recently they were impossible. Although mobile money has brought some problems, I firmly believe it has done far more good than harm in Zimbabwe.`);

  // 12. Discursive (full model).
  zim("discursive", "Should traditional foods replace fast foods in school tuck shops? Discuss.", `**Model answer:**

Walk past any school tuck shop at break time and you will see a crowd of learners buying chips, fizzy drinks, sweets and packets of crisps. In recent years, some parents and teachers have suggested that these foods should be replaced by traditional foods such as roasted groundnuts, boiled maize, sweet potatoes and mahewu. The idea has supporters and critics, and both sides raise important points.

Supporters argue, first, that traditional foods are healthier. Groundnuts, sweet potatoes and maize provide energy, protein and fibre, while many fast foods are high in fat, salt and sugar. Learners who eat a filling, nourishing snack are more likely to concentrate in afternoon lessons than those who have eaten only sweets and a fizzy drink.

A second argument in favour is that traditional foods support local farmers and protect our heritage. When a tuck shop buys groundnuts and sweet potatoes from nearby growers, money stays in the community. At the same time, young people who eat these foods every day are less likely to see them as old-fashioned, so an important part of Zimbabwean culture is kept alive.

On the other hand, critics point out that learners enjoy fast foods and may simply refuse to buy anything else. If sales fall, the tuck shop, which often raises money for school projects, could lose income. Some learners might also buy unhealthy snacks from vendors outside the gate instead, so the change would achieve little.

Critics also raise practical problems. Traditional foods such as boiled maize and sweet potatoes must be cooked fresh and do not keep as long as packaged snacks, which means more work for the tuck shop staff and a greater risk of waste. Supplies may be uneven, especially in a drought year.

Weighing these arguments, it seems that completely replacing fast foods would be difficult, but a gradual change is both possible and desirable. A tuck shop could begin by offering traditional foods alongside a smaller range of fast foods, perhaps at lower prices, and by involving learners in choosing and promoting them. In this way, schools can improve learners' health and support local farmers without driving customers away. Change that learners choose for themselves is more likely to last than change imposed on them.`);

  // 13. Discursive (plan + opening).
  zim("discursive", "Has technology brought families closer together or pushed them apart? Discuss.", `**Plan (point-by-point):**
1. **Introduction:** a family at supper with every member on a phone versus a grandmother video-calling her grandson abroad; the question has two sides.
2. **Communication:** closer: relatives far away in other cities or countries stay in daily contact through calls and messages; apart: family members at home talk less to each other face to face.
3. **Time together:** closer: families watch films or play games together; apart: separate screens in separate rooms; meals interrupted by notifications.
4. **Generations:** closer: young people teach grandparents to use phones, creating shared moments; apart: a gap between those who use technology and those who cannot; elders feel left out.
5. **Conclusion:** technology itself is neutral; it brings closer those who are far and can distance those who are near; families can set simple rules such as phone-free meals.

**Opening paragraph:** In one house in Kadoma, a family eats supper in silence, each face lit by the glow of a phone. In another, a grandmother laughs at her grandson's face on a small screen as he shows her the snow outside his flat in a cold country far away. Both scenes are made possible by the same technology. Whether that technology has brought families closer or pushed them apart is a question with more than one answer.`);

  // 14. Discursive (plan + opening).
  zim("discursive", "Should young people leave rural areas to look for work in towns? Discuss.", `**Plan (block):**
1. **Introduction:** every year many school leavers board buses to towns; parents and leaders disagree about whether this is wise.
2. **For (opportunity):** more jobs, colleges and training in towns; wider experience.
3. **For (support for families):** money sent home pays school fees and builds homes in the village.
4. **Against (hardship in towns):** unemployment, high rent and transport costs, risk of crime and loneliness.
5. **Against (loss to rural areas):** fields left to the elderly; skills and energy lost; opportunities in farming, irrigation schemes and rural trade ignored.
6. **Conclusion:** the decision depends on preparation; leaving with skills and a plan can work, but rural areas also offer real opportunities that deserve a closer look.

**Opening paragraph:** Every January, the long-distance buses leaving rural growth points are crowded with young people carrying bags, certificates and hopes. Some will find work in Harare or Bulawayo; others will return months later, disappointed. Parents, community leaders and young people themselves disagree about whether moving to town is the best way to build a future, and there are strong arguments on both sides.`);
});
