// Slice EXM2: Cambridge 0500 Paper 1 Question 2 (Text B: selective summary 15 + attitudes 5; STRUCTURED, 20 marks, FLE).
// Original texts; fictional people.
import { concept, P, FLE } from "../lib.mjs";

const C = ["eng.summary.selecting-points", "eng.summary.writing", "eng.reading.own-words", "eng.reading.tone-attitude", "eng.reading.fact-opinion-argument"];
const SECS = 2100;
const HINTS = [
  "Read the summary question first, then underline only the ideas in Text B that answer it: leave out examples, names and stories.",
  "Group related ideas and rewrite them in your own words, in continuous prose of no more than 120 words.",
  "For part (b), name each attitude or opinion precisely and point to the words in the text that show it.",
];
const EXPLAIN =
  "Question 2(a) rewards selecting the relevant ideas (10 content marks) and expressing them concisely in your own words (5 writing marks). Question 2(b) tests whether you can identify opinions and attitudes and support them from the text.";

const SUMMARY_STEM = (focus) =>
  `**Question 2**\n\n**(a)** ${focus}\n\nYou must use continuous writing (not note form) and use your own words as far as possible.\n\nYour summary should not be more than **120 words**.\n\n*Up to 10 marks are available for the content of your answer and up to 5 marks for the quality of your writing.*`;

const WRITING_POINTS = [
  ["Writing (2 marks): the summary is concise and focused: it includes only relevant ideas, leaves out examples, names, quotations and stories, and does not repeat points", 2],
  ["Writing (2 marks): it is in your own words: the key phrases of the text are rephrased rather than copied (a few unavoidable single words are fine)", 2],
  ["Writing (1 mark): it is continuous, well-organised prose (not notes or a list) with related ideas grouped together, and it is no longer than 120 words", 1],
];
const CONTENT = (ideas) => ["Content (up to 10 marks): one mark for each different relevant idea from the list below, to a maximum of 10. An idea counts once, however it is worded", 10, ideas];
const SUMMARY_EXPLAIN =
  "Content marks come from relevant ideas, not from length: a focused answer can include ten or more ideas within 120 words by grouping them. Writing marks reward concision, own words and organisation. Leave out the illustrations (a named person's story, examples, quotations).";

// ---------------------------------------------------------------------------------------------------------------------
const BEES = `Read Text B carefully, and then answer Question 2 on this page.

**Text B: Sweet returns**

*This article from a farming magazine looks at beekeeping on small farms.*

**[1]** Ask most people in Zimbabwe what they think of bees and they will tell you about being stung. Ask Mai Sibanda, who farms three hectares near Gokwe, and she will tell you that bees changed her family's life. Six years ago she put up her first hive, a hollow log hung in a mukwa tree on the edge of her fields. Today she manages twenty-two hives, and she believes every small farmer should keep at least a few.

**[2]** Her first argument is money. Honey sells well in local markets and in town, and it does not go bad, so a farmer can keep it until the price is good rather than selling in a hurry, as she must with tomatoes. Beeswax, which many beginners throw away, can be sold to people who make candles, polish and soap. "Nothing from the hive is rubbish," she says.

**[3]** Bees also cost very little to keep. Unlike cattle or goats, they do not need to be fed, dipped or herded, and they find their own water. A hive can be made from local materials, and once it is in place it needs attention only every few weeks, which leaves the farmer free for other work. Because the bees forage on wild flowers, beekeeping does not take any land away from crops.

**[4]** In fact, the crops benefit. Bees carry pollen from flower to flower as they feed, and many crops, including sunflowers, pumpkins, beans and fruit trees, produce more when bees visit them. Mai Sibanda noticed that her sunflower heads were fuller in the seasons after she began beekeeping, and her neighbours, whose fields border hers, say the same.

**[5]** There are less obvious advantages too. Elephants, which raid crops in parts of the district, dislike bees, and some farmers now hang hives on wires along their field boundaries to keep them away. Because a hive is worthless without the trees and flowers around it, beekeepers have a reason to protect the bush rather than cut it down for firewood. Honey itself is a nourishing food for children, and in many homes it is used to soothe a sore throat.

**[6]** None of this means that beekeeping is easy. Bees can be aggressive when they are disturbed, and a beginner without a veil and gloves will soon regret it. Honey badgers break into hives, and fires set to clear land can destroy a whole colony. In a year of drought there are fewer flowers and much less honey. Mai Sibanda admits that she lost four of her first six hives through her own mistakes.

**[7]** Her advice is to start small and learn from others. She now runs a beekeepers' group of fifteen farmers who share equipment, sell their honey together for a better price and visit each other's hives to solve problems. Young people in the group have learned to make hives and sell them, which has given some of them a business of their own. "Bees are patient teachers," she says. "They punish carelessness, but they reward people who pay attention."`;

const GRAINS = `Read Text B carefully, and then answer Question 2 on this page.

**Text B: The return of the small grains**

*This newspaper feature looks at why some farmers and families are going back to traditional grains.*

**[1]** For most of the last century, maize was king on Zimbabwean farms. It filled the fields, the granaries and the cooking pots, and many families came to think of sadza made from anything else as old-fashioned food from their grandparents' day. Seed companies concentrated on maize, and the old grains slowly disappeared from many fields. Now, in villages from Binga to Buhera, sorghum, pearl millet and finger millet are making a quiet comeback, and the farmers who grow them say there are good reasons.

**[2]** The first is the weather. Maize needs steady rain at the right moments, and when the rains arrive late or stop in the middle of the season, a whole crop can wilt. Small grains are tougher. Their roots go deep, they can survive dry spells that would kill maize, and they ripen quickly, so a farmer who plants them has a far better chance of harvesting something in a poor year. "Maize is a gamble," says Mr Ndlovu, who farms near Plumtree. "Sorghum is insurance."

**[3]** Small grains also store well. Weevils that destroy maize in the granary have a much harder time with the hard little seeds of millet, and farmers report that grain kept in a well-sealed granary can last for several seasons. In a district where hunger often comes in the months before harvest, a store of grain that keeps for years is precious.

**[4]** Then there is health. Nutritionists point out that millet and sorghum contain more fibre and minerals than refined maize meal, and that they release their energy slowly, which keeps people feeling full for longer. In towns, doctors sometimes recommend them to patients who need to watch their blood sugar. Some urban supermarkets have started to stock millet meal, and young professionals in Harare have begun to order "grandmother's sadza" in restaurants.

**[5]** Not everyone is convinced. Small grains are hard work. Birds love them, so children are sent to the fields to scare away flocks of quelea in the weeks before harvest. Grinding them by hand is slow, and some hammer mills will not process them. Because fewer farmers grow them, good seed can also be hard to find in local shops. Many younger people also say plainly that they prefer the taste and texture of white maize sadza.

**[6]** There are signs that these problems can be overcome. Plant breeders have developed varieties with bitter husks or drooping heads that birds find less attractive. In parts of Masvingo Province, farmers have clubbed together to buy small machines that remove the husks, which saves hours of pounding. Schools that grow sorghum in their gardens are also teaching children to cook it in new ways, from porridge with peanut butter to biscuits for the tuck shop.

**[7]** Mr Ndlovu does not think maize will disappear, and he does not want it to. "I am not against maize," he says. "I am against putting all our hope in one crop. A farmer who grows several things sleeps better at night." In a country where the rains are becoming harder to predict, that sounds less like old-fashioned thinking and more like common sense.`;

const SLEEP = `Read Text B carefully, and then answer Question 2 on this page.

**Text B: Why your brain wants you in bed**

*This article was written for a school health magazine.*

**[1]** If you have ever sat through a morning lesson feeling as though your head were full of wet sand, you are not alone. Lack of sleep is one of the most common, and most ignored, problems among secondary school students. Many of us treat sleep as wasted time, the thing we do when there is nothing more interesting left. Scientists who study the brain see it very differently.

**[2]** While you sleep, your brain is far from idle. It sorts through the events of the day, deciding what to keep and what to throw away, and it strengthens the memories of what you have learned. A student who revises until two in the morning and then sleeps for four hours may actually remember less than one who stops at ten and sleeps properly. Sleep also helps the body to repair itself and fight infection, and it affects mood: tired people are more irritable, more anxious and quicker to argue.

**[3]** Teenagers face a special difficulty. During adolescence the body clock shifts, so that teenagers naturally feel sleepy later at night than younger children or adults do. Health advisers generally recommend that teenagers aim for between eight and ten hours a night, but early school starts, long journeys and evening study mean that many get far less. Students who share a room with younger brothers and sisters may also find a quiet night hard to arrange.

**[4]** Our phones make it worse. The bright light from a screen tells the brain that it is still daytime, delaying the moment when we start to feel sleepy. Messages and videos keep the mind busy, and the habit of checking "just one more thing" can swallow an hour without our noticing. Some students play games under the blanket long after their parents think they are asleep. Many students also keep their phones beside their pillows, so that a single notification at midnight can wake them up.

**[5]** The good news is that small changes help. Try to go to bed and get up at roughly the same time every day, including weekends, because the body clock likes a routine. Put your phone away, ideally in another room, at least half an hour before you sleep, and do something calm instead, such as reading a printed book. Avoid tea, coffee and fizzy drinks containing caffeine in the evening. If you can, keep your room dark, quiet and cool.

**[6]** What you do during the day matters too. Exercise, even a brisk walk home from school, helps you fall asleep more easily, though hard exercise just before bed can have the opposite effect. Getting some daylight in the morning helps to set the body clock. And if you need a nap after school, keep it short, about twenty minutes, so that it does not stop you sleeping at night.

**[7]** Finally, plan your studying. Cramming late at night before a test feels productive, but it steals the very sleep your brain needs to store what you have just read. Spreading revision over several weeks, with a sensible bedtime, is less dramatic but far more effective. Sleep is not the enemy of hard work. It is what makes hard work pay off.`;

const MBIRA = `Read Text B carefully, and then answer Question 2 on this page.

**Text B: The keys to concentration**

*This magazine article describes a school mbira club.*

**[1]** On Thursday afternoons, a classroom at a secondary school in Chitungwiza fills with a sound that is older than any building in the town: the bright, rippling notes of a dozen mbira being played at once. The players are Form 2 and Form 3 students, and their teacher is Mr Gift Chiwara, a musician who has been making and playing the instrument since he was a boy in Murehwa. He started the club four years ago with three borrowed instruments. Today there is a waiting list.

**[2]** The mbira, a set of metal keys fixed to a wooden board and plucked with the thumbs and one finger, is often placed inside a large gourd that makes the sound fuller and louder. To an outsider it looks simple. "Everyone thinks that until they try," Mr Chiwara says, laughing. "The left thumb plays one pattern, the right thumb plays another, and the two must fit together like the two hands of someone weaving a basket."

**[3]** That challenge, he believes, is exactly what makes it valuable. Learning the interlocking patterns demands concentration and patience, and students who stick with it often find that they can focus better in other lessons too. Because the music is built on repetition with small changes, players learn to listen closely, noticing tiny differences in rhythm. "You cannot play mbira with half your mind," he says.

**[4]** The club also gives students a link to their own history. Mbira music has been played in Zimbabwe for centuries, at ceremonies, at gatherings and simply for pleasure, and many of the pieces the students learn were passed down by ear from one generation to the next. Some students have discovered that a grandparent or an uncle plays, and the instrument has become a way of starting conversations at home. One Form 3 girl, Tariro, now practises with her grandfather every Sunday afternoon.

**[5]** There are social benefits as well. Mbira is usually played in groups, with one player holding the basic pattern while another plays variations over it, often with singing and hosho rattles. Students who are shy in class find that they can take part without having to speak, and the older members teach the beginners. Mr Chiwara says that the club has become one of the friendliest places in the school.

**[6]** Practical lessons come too. Several students have learned to tune their own instruments by carefully adjusting the keys, and a few now help Mr Chiwara to make new ones from scrap metal and local hardwood, which keeps the cost low. Two former members earn money by playing at weddings and other celebrations.

**[7]** Not every student stays. Sore thumbs in the first weeks put some off, and others find that progress feels slow. Mr Chiwara does not hide this. "The first month is hard," he tells every newcomer. "The second month is less hard. By the third month, the mbira starts to talk back to you." For the students crowding into his classroom on Thursday afternoons, that conversation seems well worth the effort.`;

concept("eng.summary.selecting-points", { file: "exam/fle-p1q2", keyPrefix: "exam.fle-p1q2", applies: FLE }, (b) => {
  // =================================================================================================================
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: SECS, concepts: C, hints: HINTS, explanation: EXPLAIN,
    stem: BEES,
    parts: [
      P.manual({
        label: "(a)",
        type: "EXTENDED_RESPONSE",
        marks: 15,
        wordLimit: { max: 120 },
        stem: SUMMARY_STEM("According to Text B, what are the **benefits** of keeping bees for small-scale farmers?"),
        points: [
          CONTENT([
            "Honey sells well / earns the farmer money",
            "Honey does not spoil, so it can be stored and sold when prices are good",
            "Wax can also be sold (for candles, polish, soap) / nothing from the hive is wasted",
            "Bees need no feeding, dipping or herding (unlike livestock)",
            "Bees find their own water",
            "Hives can be made cheaply from local materials",
            "Hives need attention only occasionally, leaving the farmer time for other work",
            "Beekeeping uses no crop land (bees feed on wild flowers)",
            "Bees pollinate crops, so yields increase (on neighbouring farms too)",
            "Hives along field edges keep crop-raiding elephants away",
            "Beekeepers have a reason to protect trees and wild plants (conservation)",
            "Honey is nourishing food for the family / children",
            "Honey can be used as a remedy (for sore throats)",
            "Farmers in a group can share equipment, solve problems together and sell together for a better price",
            "Young people can earn an income by making and selling hives",
          ]),
          ...WRITING_POINTS,
        ],
        modelAnswer:
          "Beekeeping brings in money: honey sells readily and keeps indefinitely, so it can be held back until prices rise, and the wax can be sold to craftspeople. Running costs are low, since bees need no feeding or herding and find their own water. Hives are cheap to build from local materials and need checking only occasionally, freeing the farmer for other tasks, and they occupy no cropland. Pollinating bees increase harvests, including those of neighbours. Hives along boundaries deter elephants, and beekeepers have a reason to conserve the bush. Honey also feeds children and eases sore throats. Farmers who join together can share tools and get better prices, while young members can earn a living making hives.",
        explanation: SUMMARY_EXPLAIN + " Here, the difficulties in paragraph 6 are not benefits and must be left out.",
        hints: ["Paragraphs 2 to 5 and 7 contain benefits; paragraph 6 is about problems.", "Leave out Mai Sibanda's own story (her first hive, her sunflowers, her lost hives)."],
      }),
      P.manual({
        label: "(b)",
        marks: 5,
        stem: "**(b)** What is Mai Sibanda's attitude towards beekeeping? Identify **five** different opinions or attitudes she shows in Text B and support each one with a detail from the text.",
        points: [
          ["One mark for each different attitude correctly identified and supported, to a maximum of 5", 5, [
            "Enthusiastic / convinced: she believes every small farmer should keep at least a few hives (paragraph 1)",
            "Sees it as profitable: *Her first argument is money* / she values every product: *Nothing from the hive is rubbish* (paragraph 2)",
            "Realistic / honest about its difficulties: she admits she lost four of her first six hives through her own mistakes (paragraph 6)",
            "Believes in caution and learning from others: her advice is to *start small and learn from others* (paragraph 7)",
            "Values co-operation: she runs a group of fifteen farmers who share equipment and sell together (paragraph 7)",
            "Respects bees / sees beekeeping as a discipline: *Bees are patient teachers … they punish carelessness* (paragraph 7)",
            "Grateful / sees it as life-changing: bees *changed her family's life* (paragraph 1)",
          ]],
        ],
        modelAnswer: "She is enthusiastic, believing every small farmer should keep hives. She sees beekeeping as profitable, insisting that nothing from the hive is rubbish. She is honest about its difficulties, admitting she lost four of her first six hives. She believes beginners should start small and learn from others, and she values co-operation, running a group that shares equipment. Finally, she respects bees as 'patient teachers' that reward care.",
        explanation: "Each mark needs a precise attitude (enthusiastic, realistic, co-operative …) AND evidence from the text. Five different attitudes are needed, not one attitude supported five times.",
      }),
    ],
  });

  // =================================================================================================================
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: SECS, concepts: C, hints: HINTS, explanation: EXPLAIN,
    stem: GRAINS,
    parts: [
      P.manual({
        label: "(a)",
        type: "EXTENDED_RESPONSE",
        marks: 15,
        wordLimit: { max: 120 },
        stem: SUMMARY_STEM("According to Text B, what are the **advantages** of growing and eating small grains, and how are the **problems** of growing and using them being overcome?"),
        points: [
          CONTENT([
            "They survive dry spells / drought better than maize (they are tougher)",
            "Their roots grow deep",
            "They ripen / mature quickly",
            "So farmers are more likely to harvest something in a poor season (they are a safeguard)",
            "They resist weevils / pests in storage",
            "They can be stored for several seasons, which protects against hunger before harvest",
            "They contain more fibre and minerals than refined maize meal",
            "They release energy slowly, keeping people full for longer",
            "They are recommended for people who must control their blood sugar",
            "They are increasingly sold / in demand in towns (supermarkets, restaurants)",
            "Growing several crops spreads the farmer's risk",
            "New varieties have been bred that birds find less attractive",
            "Farmers share machines that remove husks, saving the labour of pounding",
            "Schools are teaching children new ways to cook them",
          ]),
          ...WRITING_POINTS,
        ],
        modelAnswer:
          "Small grains are hardier than maize: deep-rooted and quick to mature, they withstand dry spells, so farmers can usually harvest something even in bad years. Pests attack them less in storage, and they keep for several seasons, guarding against hunger before harvest. They are also more nutritious than refined maize meal, richer in fibre and minerals, and they release energy gradually, so they suit people controlling blood sugar. Demand is growing in towns, and growing several crops spreads a farmer's risk. Their drawbacks are being tackled: new varieties discourage birds, farmers jointly buy machines that remove husks to save hours of pounding, and schools are teaching children appealing new recipes.",
        explanation: SUMMARY_EXPLAIN + " The question has two parts, so the best answers cover both advantages and solutions; the problems themselves (paragraph 5) earn nothing unless linked to how they are being solved.",
        hints: ["Advantages come in paragraphs 2 to 4 and 7; solutions to the problems are in paragraph 6.", "Leave out place names, Mr Ndlovu's quotations and the details of recipes."],
      }),
      P.manual({
        label: "(b)",
        marks: 5,
        stem: "**(b)** Text B presents several different attitudes towards small grains. Identify **five** different attitudes or opinions held by the people mentioned in the text (including the writer) and support each one with a detail from the text.",
        points: [
          ["One mark for each different attitude correctly identified and supported, to a maximum of 5", 5, [
            "Many families used to see small-grain sadza as old-fashioned food from their grandparents' day (paragraph 1)",
            "Mr Ndlovu sees small grains as security against bad weather: *Sorghum is insurance* (paragraph 2)",
            "Nutritionists / doctors view them positively as healthier than refined maize meal (paragraph 4)",
            "Young professionals in towns now find them fashionable / appealing: they order *grandmother's sadza* (paragraph 4)",
            "Some people find them too much hard work (bird scaring, slow grinding) (paragraph 5)",
            "Many younger people prefer the taste and texture of white maize sadza (paragraph 5)",
            "Mr Ndlovu is balanced: he is *not against maize* but against relying on one crop (paragraph 7)",
            "The writer approves: growing small grains seems *more like common sense* (paragraph 7)",
          ]],
        ],
        modelAnswer: "Many families used to regard small grains as old-fashioned. Mr Ndlovu sees sorghum as insurance against poor rains. Nutritionists consider them healthier than refined maize meal. Some young people prefer the taste of white maize sadza, while young professionals in Harare now find 'grandmother's sadza' fashionable. The writer approves, calling diversity 'common sense'.",
        explanation: "Opinions belong to people: identify who holds each view and what the view is, then point to the evidence. Notice how the writer's own view appears only in the last sentence.",
      }),
    ],
  });

  // =================================================================================================================
  b.struct({
    d: 3, skill: "ANALYSIS", examStyle: true, secs: SECS, concepts: C, hints: HINTS, explanation: EXPLAIN,
    stem: SLEEP,
    parts: [
      P.manual({
        label: "(a)",
        type: "EXTENDED_RESPONSE",
        marks: 15,
        wordLimit: { max: 120 },
        stem: SUMMARY_STEM("According to Text B, what can teenagers **do** to sleep better and to make sure their sleep supports their studying?"),
        points: [
          CONTENT([
            "Go to bed and get up at the same time every day",
            "Keep the same routine at weekends too",
            "Put the phone away / in another room before sleeping",
            "Stop using screens at least half an hour before bed",
            "Do something calm before sleeping (e.g. read a printed book)",
            "Avoid caffeine drinks (tea, coffee, fizzy drinks) in the evening",
            "Keep the bedroom dark, quiet and cool",
            "Avoid being woken by night-time notifications (do not keep the phone by the pillow)",
            "Take exercise during the day",
            "Avoid hard exercise just before bed",
            "Get daylight in the morning",
            "Keep after-school naps short (about twenty minutes)",
            "Avoid late-night cramming before tests",
            "Spread revision over several weeks and keep a sensible bedtime",
          ]),
          ...WRITING_POINTS,
        ],
        modelAnswer:
          "Teenagers should keep regular sleeping and waking times every day, weekends included, since the body clock depends on routine. Phones should be put away, preferably outside the bedroom, at least thirty minutes before bed, so that screen light and night-time alerts do not disturb them; a calm activity such as reading a paper book is better. Caffeine should be avoided in the evening, and the bedroom kept dark, quiet and cool. During the day, regular exercise and morning sunlight help, although vigorous exercise late in the evening does not, and naps should last only about twenty minutes. Finally, students should replace late-night cramming with revision spread over several weeks.",
        explanation: SUMMARY_EXPLAIN + " The question asks what teenagers can **do**, so the explanations of why sleep matters (paragraphs 2 and 3) are not needed.",
        hints: ["The practical advice is in paragraphs 4 to 7; paragraphs 2 and 3 explain why sleep matters.", "Turn instructions into a smooth paragraph, e.g. 'Teenagers should …'"],
      }),
      P.manual({
        label: "(b)",
        marks: 5,
        stem: "**(b)** What are the writer's attitudes and opinions about sleep and students' habits? Identify **five** different attitudes or opinions and support each one with a detail from Text B.",
        points: [
          ["One mark for each different attitude or opinion correctly identified and supported, to a maximum of 5", 5, [
            "Believes sleep is valuable and active, not wasted time: *your brain is far from idle* (paragraph 2)",
            "Disagrees with the common view of sleep as wasted time: *Scientists … see it very differently* (paragraph 1)",
            "Sympathetic / understanding towards tired students: *you are not alone*; teenagers face *a special difficulty* (paragraphs 1 and 3)",
            "Critical of phone habits: *Our phones make it worse* (paragraph 4)",
            "Optimistic / encouraging that change is possible: *The good news is that small changes help* (paragraph 5)",
            "Disapproves of late-night cramming: it *steals the very sleep your brain needs* (paragraph 7)",
            "Believes sleep and hard work go together: sleep *is what makes hard work pay off* (paragraph 7)",
            "Concerned that the problem is neglected: lack of sleep is among the *most ignored* problems (paragraph 1)",
          ]],
        ],
        modelAnswer: "The writer believes sleep is essential, arguing that the brain is 'far from idle', and rejects the idea that it is wasted time. The writer is sympathetic to students, telling them 'you are not alone', but critical of phones, which 'make it worse'. The writer is encouraging, saying 'small changes help', and disapproves of cramming because it 'steals' sleep.",
        explanation: "Attitude words must be precise: sympathetic, critical, encouraging, disapproving. Support each with a short quotation or close reference.",
      }),
    ],
  });

  // =================================================================================================================
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: SECS, concepts: C, hints: HINTS, explanation: EXPLAIN,
    stem: MBIRA,
    parts: [
      P.manual({
        label: "(a)",
        type: "EXTENDED_RESPONSE",
        marks: 15,
        wordLimit: { max: 120 },
        stem: SUMMARY_STEM("According to Text B, what **benefits** do students gain from learning to play the mbira?"),
        points: [
          CONTENT([
            "It develops concentration",
            "It develops patience / perseverance",
            "Students can focus better in other lessons",
            "It trains them to listen closely / notice small differences in rhythm",
            "It connects them with their history / culture",
            "They learn traditional pieces handed down over generations (helping to keep them alive)",
            "It gives them a way to talk to / spend time with older relatives",
            "They learn to play as part of a group (teamwork)",
            "Shy students can take part without speaking (it builds confidence)",
            "Older members gain experience of teaching beginners",
            "They make friends in a friendly, welcoming setting",
            "They learn to tune their own instruments",
            "They learn to make instruments cheaply from local / scrap materials",
            "They can earn money by performing at celebrations",
          ]),
          ...WRITING_POINTS,
        ],
        modelAnswer:
          "Mastering the instrument's interlocking patterns builds concentration and patience, which helps students focus in other subjects, and the repetitive music trains them to listen carefully for small changes in rhythm. The club connects them with their heritage, since they learn traditional pieces handed down orally, and it gives them a reason to talk with older relatives who play. Because mbira is played in groups, it teaches teamwork; shy students can take part without speaking, senior members gain experience in teaching beginners, and friendships grow. Students also acquire practical skills, learning to tune instruments and build them cheaply from scrap materials, and some can even earn money by performing at celebrations.",
        explanation: SUMMARY_EXPLAIN + " Description of the instrument (paragraph 2) and the difficulties (paragraph 7) are not benefits.",
        hints: ["Benefits are in paragraphs 3 to 6.", "Leave out Tariro's story and Mr Chiwara's quotations: turn them into general points."],
      }),
      P.manual({
        label: "(b)",
        marks: 5,
        stem: "**(b)** What are Mr Chiwara's attitudes towards the mbira and towards teaching it? Identify **five** different attitudes and support each one with a detail from Text B.",
        points: [
          ["One mark for each different attitude correctly identified and supported, to a maximum of 5", 5, [
            "Passionate / devoted to the instrument: he has made and played it since boyhood and started the club with borrowed instruments (paragraph 1)",
            "Good-humoured about its difficulty: he laughs at people who think it looks simple (paragraph 2)",
            "Believes the difficulty is what makes it worthwhile: *That challenge … is exactly what makes it valuable* (paragraph 3)",
            "Believes it demands total commitment: *You cannot play mbira with half your mind* (paragraph 3)",
            "Values it as heritage / a link to history (paragraph 4)",
            "Proud of the club as one of the friendliest places in the school (paragraph 5)",
            "Honest with students about the hard start: he *does not hide this* (paragraph 7)",
            "Encouraging / optimistic that perseverance is rewarded: *By the third month, the mbira starts to talk back to you* (paragraph 7)",
          ]],
        ],
        modelAnswer: "He is passionate about the mbira, having played it since boyhood. He believes its difficulty is what makes it valuable and that it demands full concentration ('You cannot play mbira with half your mind'). He is proud of the club as a friendly place, honest with beginners about the hard first month, and encouraging, promising that 'the mbira starts to talk back to you'.",
        explanation: "Name five different attitudes, each with evidence. Quotations from Mr Chiwara are good evidence, but the attitude itself must be stated in your own words.",
      }),
    ],
  });
});
