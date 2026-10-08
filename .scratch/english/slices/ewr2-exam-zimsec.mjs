// Slice EWR2: ZIMSEC Paper 1 Section B guided compositions (EXTENDED_RESPONSE, 20 marks, ZIM).
import { concept, compositionLevels, ZIM } from "../lib.mjs";

const br = (...l) => l.join("\\\n");
const ND = "eng.functional.notes-and-data";
const FORMAT = {
  "formal-letter": "Format: both addresses, date, salutation, subject line, matching close (faithfully/sincerely), signature and name",
  "informal-letter": "Format: writer's address and date, friendly greeting and close, first name only",
  speech: "Format: salutation to the audience in order of rank, speech-like opening, signposted points, closing thanks",
  report: "Format: title; To, From (with position), Date; introduction, findings under headings, conclusion, numbered recommendations; signature and position",
  article: "Format: headline (and by-line), an engaging introduction, organised paragraphs or sub-headings, a strong conclusion",
  memo: "Format: MEMORANDUM heading; To, From, Date, Subject; purpose, numbered points, action required with deadline; initials; no salutation or close",
};
const REGISTER = {
  "formal-letter": "Register and tone: formal, polite and firm, suited to the reader",
  "informal-letter": "Register and tone: warm and conversational but correct, suited to a friend or relative",
  speech: "Register and tone: direct address, persuasive devices and a tone suited to the occasion and listeners",
  report: "Register and tone: objective, impersonal and concise",
  article: "Register and tone: lively and engaging for general readers, without slang",
  memo: "Register and tone: brief, direct and courteous",
};
const HINTS = {
  "formal-letter": ["Number the notes and give each a paragraph or sentence.", "Unknown name: Yours faithfully; named reader: Yours sincerely."],
  "informal-letter": ["Use every note, but make it sound like a real letter to a friend.", "A short friendly opening, then the notes, then a warm close."],
  speech: ["Greet the audience in order of rank.", "Signpost each note as a point and end with an appeal and thanks."],
  report: ["Turn each note or figure into a finding under a sub-heading.", "Every recommendation should follow from a finding."],
  article: ["Start with a hook, not with the first note.", "Describe the figures accurately and use them to support your points."],
  memo: ["Fill every line of the heading block.", "One numbered point per note; end with the action required."],
};

concept("eng.functional.formal-letter", { file: "functional/exam-zimsec", keyPrefix: "functional.exam-zimsec", applies: ZIM }, (b) => {
  const zim = (type, task, modelAnswer, d = 3) =>
    b.ext({
      d, skill: "CREATION", marks: 20, secs: 2400, examStyle: true, paper: "Paper 1",
      concepts: [`eng.functional.${type}`, ND],
      stem: `**Paper 1, Section B: Guided composition.** ${task}\n\nUse **all** the information given. Write about **300 words** (the word limit is shown with the answer box).`,
      wordLimit: { min: 250, max: 350 },
      points: [
        ["Content: every note or item of data used accurately and amplified into full, developed sentences; nothing contradicts the material", 8],
        [FORMAT[type], 4],
        [REGISTER[type], 3],
        ["Accuracy and organisation: correct grammar, spelling and punctuation; well-linked paragraphs", 5],
      ],
      levels: compositionLevels(20),
      modelAnswer,
      hints: HINTS[type],
      explanation: "Guided compositions are marked for using all the given material, the correct format, a suitable register and accurate, well-organised language. Tick each note in your answer, then compare with the model.",
    });

  // 1. Formal letter of complaint (full model).
  zim("formal-letter", `You live at 31 Musasa Crescent, Rujeko, Masvingo. Refuse has not been collected in your area for some time. Write a **letter of complaint** to the Town Clerk, City of Masvingo, P.O. Box 17, Masvingo. Use the following notes:

- no collection since 6 January (six weeks)
- bins overflowing; dogs scatter rubbish; flies and bad smell
- children play near rubbish heaps; fear of disease (diarrhoea, cholera)
- residents tried calling the council office; no response
- request: resume collections; clear existing heaps; give a schedule`, `**Model answer:**

${br("31 Musasa Crescent", "Rujeko", "Masvingo", "17 February 2026")}

${br("The Town Clerk", "City of Masvingo", "P.O. Box 17", "Masvingo")}

Dear Sir/Madam

**RE: UNCOLLECTED REFUSE IN MUSASA CRESCENT, RUJEKO**

I am writing on behalf of the residents of Musasa Crescent to complain about the failure to collect refuse in our area since 6 January, a period of six weeks.

Before January, the council truck called every Thursday without fail. Since then, residents have continued to place their bins at the gate as instructed, but nobody has come. The bins are now overflowing, and stray dogs tear open the bags at night, scattering rubbish along the road and into the drains. Flies have increased sharply, and on hot afternoons the smell is unbearable.

Of even greater concern is the risk to health. Young children play close to the heaps of rubbish on the open ground at the end of the crescent, and parents fear outbreaks of diarrhoea or even cholera, especially now that the rains have begun.

Residents have tried to raise the matter directly. Several of us have telephoned the council office on different days, but we have received no explanation and no promise of action.

I would therefore be grateful if the council could resume weekly collections immediately and arrange for the existing heaps to be cleared as a matter of urgency. I would also ask that residents be given a written collection schedule, so that bins are put out only on the correct day.

I look forward to your prompt response.

Yours faithfully

*T. Hove*

Tafadzwa Hove (Mr)`);

  // 2. Formal letter of request using a table (plan + opening).
  zim("formal-letter", `You are the secretary of the Netball Club at Chemhanza High School, P. Bag 3007, Hwedza. Write a **letter** to the Manager, Hwedza Hardware and Sports, P.O. Box 66, Hwedza, requesting sponsorship for equipment. Use the information below.

| Item needed | Quantity | Reason |
|---|---|---|
| Netballs | 6 | only two old balls; one punctured |
| Bibs (set of 7) | 2 sets | teams currently share faded bibs |
| First-aid kit | 1 | none at the court; injuries at practice |

Also mention: the team reached the district finals last year; the club will display the shop's name on a banner at matches and thank the company at prize-giving.`, `**Plan:**
- Layout: school address and date (top right); the Manager, Hwedza Hardware and Sports, P.O. Box 66, Hwedza; Dear Sir/Madam; **RE: REQUEST FOR SPONSORSHIP OF NETBALL EQUIPMENT**.
- Paragraph 1: purpose (request sponsorship) and who is writing.
- Paragraph 2: the club's success: district finals last year despite poor equipment.
- Paragraph 3: the items and reasons, amplified from the table: six netballs (only two old balls, one punctured); two sets of bibs (faded bibs shared between teams); one first-aid kit (no kit at the court, injuries at practice).
- Paragraph 4: what the shop will gain: its name on a banner at matches; public thanks at prize-giving.
- Paragraph 5: polite request for a reply and offer to visit; Yours faithfully; signature; name (Secretary, Netball Club).

**Opening paragraph:** I am writing on behalf of the Chemhanza High School Netball Club to ask whether your company would consider sponsoring some essential equipment for our teams. Last year our senior team reached the district finals, and we believe that with proper equipment we can go even further this season.`);

  // 3. Informal letter (plan + opening).
  zim("informal-letter", `Your cousin Nyasha, who lives in Bulawayo, will start Form 1 at your school next term and will stay with your family. Write a **letter** to her using these notes:

- school starts 13 January; you will travel together on the bus from the rank
- what to bring: uniform list, mosquito net, a torch
- school routine: assembly 7.15 a.m.; lessons end 4 p.m.; study 5-6 p.m.
- clubs she might enjoy: choir, Junior Farmers
- reassure her: teachers friendly; you will introduce her to your friends`, `**Plan:**
- Address and date (top right); *Dear Nyasha,*
- Opening: excitement that she is coming; quick question about her holidays.
- Paragraph 2: travel: school starts 13 January; meet at the rank and take the bus together.
- Paragraph 3: what to bring: everything on the uniform list, a mosquito net (mosquitoes in the rainy season), a torch (power cuts).
- Paragraph 4: routine: assembly 7.15 a.m., lessons until 4 p.m., study 5-6 p.m.
- Paragraph 5: clubs: choir (she loves singing) and Junior Farmers (the school garden).
- Paragraph 6: reassurance: friendly teachers; introducing her to friends; close warmly; *Love, Rumbi*.

**Opening paragraph:** Dear Nyasha, I can't believe that in just a few weeks you'll be living with us and walking to school with me every morning! Mum has already cleared the small bedroom for you, and my little brother keeps asking when you're coming. I hope you're enjoying the holidays and not worrying too much about Form 1.`);

  // 4. Speech (full model).
  zim("speech", `As Head Boy or Head Girl, you have been asked to give a **speech** at assembly about drug and substance abuse among young people in your community. Use the notes below:

- substances being misused: illicit alcohol, cough mixtures, marijuana
- reasons young people start: peer pressure, boredom, problems at home
- effects: poor health, dropping out of school, crime, family conflict
- where to get help: school counsellor, clinic, trusted adults, helplines
- appeal: say no; support friends; join clubs and sport`, `**Model answer:**

The Head, members of staff, prefects and fellow learners: good morning.

Last month, a young man from our community, not much older than many of us, was found unconscious behind the shops. He survived. Many do not. This morning I want to talk to you about drug and substance abuse, and about what each of us can do to stop it.

First, what are we talking about? In our community, the most misused substances are illicit alcohol, cough mixtures that are drunk for the wrong reasons, and marijuana. They are cheap, they are easy to find, and they are destroying lives.

Why do young people start? Sometimes it is peer pressure: a friend says, "Just try it." Sometimes it is boredom, long afternoons with nothing to do. And sometimes it is pain at home that a young person cannot talk about.

The effects, however, are the same for everyone. Health suffers: the body and the mind are damaged. Learners stop attending school and drop out. Some turn to crime to pay for their habit, and families are torn apart by arguments and broken trust.

If you or a friend is struggling, help is available. Speak to our school counsellor, visit the clinic, talk to a trusted adult, or call a helpline. Asking for help is not weakness; it is courage.

So, fellow learners, I ask three things of you today. Say no, firmly and without apology. Support your friends, even when they push you away. And fill your time with something better: join a club, play a sport, discover what you are good at.

We can be the generation that says no. Thank you for listening.`);

  // 5. Report using survey data (full model).
  zim("report", `You are the Secretary of the Student Representative Council. The SRC surveyed **150 learners** about the school tuck shop. Write a **report** to the Head presenting the findings and making recommendations. Use the information below.

| Question | Yes | No |
|---|---|---|
| Do you buy from the tuck shop at least three times a week? | 105 | 45 |
| Are the prices reasonable? | 60 | 90 |
| Is healthy food (fruit, nuts, maize) available? | 30 | 120 |
| Is the queue at break time too long? | 126 | 24 |

Additional comments from learners: shop opens late on some days; would like a second serving window.`, `**Model answer:**

**REPORT ON THE SCHOOL TUCK SHOP SURVEY**

${br("**To:** The Head, Mufakose High School", "**From:** Chiedza Marufu, SRC Secretary", "**Date:** 12 May 2026")}

**1. Introduction**\\
At the request of the Head, the Student Representative Council surveyed 150 learners in April to find out how the tuck shop is used and how it could be improved. This report presents the findings and recommendations.

**2. Findings**

*2.1 Use of the shop.* The tuck shop is used heavily: 105 learners (70 per cent) buy from it at least three times a week.

*2.2 Prices.* Only 60 learners considered the prices reasonable, while 90 (three fifths) did not.

*2.3 Healthy food.* Just 30 learners, one in five, said that healthy food such as fruit, nuts and roasted maize was available. The great majority, 120 learners, said it was not.

*2.4 Queues.* The most widespread complaint concerned queues: 126 learners (84 per cent) said the queue at break time was too long.

*2.5 Other comments.* Several learners reported that the shop opens late on some days, and many suggested opening a second serving window.

**3. Conclusion**\\
The tuck shop is an important service that most learners use regularly, but long queues, prices and the lack of healthy food are causing widespread dissatisfaction.

**4. Recommendations**

1. A second serving window should be opened at break time to shorten queues.
2. The shop should open on time every day, with a prefect checking the opening time.
3. Fruit, nuts and roasted maize should be stocked regularly.
4. Prices should be reviewed and compared with those of nearby shops.

*C. Marufu*\\
Chiedza Marufu, SRC Secretary`, 4);

  // 6. Report from notes (plan + opening).
  zim("report", `You are the Secretary of the Young Farmers Club at Mutoko High School. The Head has asked for a **report** on the club's vegetable garden project this year. Use these notes:

- started February; 12 beds of covo, rape, tomatoes and onions
- watered by a roster of 30 members; borehole water carried in buckets
- harvest sold to teachers and the boarding kitchen; money used to buy seed and a wheelbarrow
- problems: goats broke through the fence twice; borehole pump broken for two weeks in September
- suggestions: repair fence with wire mesh; install drip irrigation; extend to fruit trees`, `**Plan:**
- Title: **REPORT ON THE YOUNG FARMERS CLUB VEGETABLE GARDEN, 2026**; To: The Head; From: Secretary, Young Farmers Club; Date.
- 1. Introduction: purpose: to review the year's project as requested by the Head.
- 2. Findings: 2.1 Establishment (began February; 12 beds of covo, rape, tomatoes, onions); 2.2 Watering (roster of 30 members; borehole water carried in buckets); 2.3 Sales and use of funds (teachers and boarding kitchen; seed and a wheelbarrow bought); 2.4 Problems (goats broke through the fence twice; pump broken for two weeks in September, so some crops wilted).
- 3. Conclusion: a successful, self-funding project held back by security and water supply.
- 4. Recommendations: (1) wire-mesh fence; (2) drip irrigation to save water and labour; (3) extend to fruit trees next year.
- Signature, name and position.

**Opening:** **1. Introduction.** This report reviews the Young Farmers Club vegetable garden project for 2026, as requested by the Head, and makes recommendations for its improvement next year.`);

  // 7. Article from graph data (plan + opening).
  zim("article", `Write an **article** for your school magazine about reading habits at your school, using the information from a survey of **200 learners** described below.

*A bar graph shows the number of books (not textbooks) learners said they read in the past term: none, 64 learners; one or two books, 80; three to five books, 40; more than five books, 16.*

Also use these notes:
- most popular reasons for not reading: no time; few interesting books in the library; prefer phones
- library has new storybooks donated by a book charity
- suggestion: a class reading period once a week; a reading competition`, `**Plan:**
- Headline: *Turning the Page: Why Our School Must Read More*; by-line.
- Opening: hook (a question to readers about the last book they finished).
- Data paragraph: almost a third (64 of 200) read no books at all; the largest group (80, two fifths) read one or two; only 40 read three to five and just 16 (8 per cent) more than five, so fewer than three in ten read three or more.
- Reasons: no time; few interesting books; phones preferred: each discussed briefly.
- Good news: new storybooks donated by a book charity now in the library.
- Suggestions: a weekly class reading period; a reading competition with prizes for classes.
- Conclusion: call to action: borrow one new book this week.

**Opening paragraph:** When did you last finish a book that was not on a syllabus? If you cannot remember, you are not alone. A survey of 200 learners at our school last month revealed that almost a third of us read no books at all last term.`);

  // 8. Memo (plan + opening).
  zim("memo", `You are the Deputy Head of Nyanga High School. Write a **memo** to all teaching staff about the school's Speech and Prize-Giving Day. Use these notes:

- date: Friday 23 October; starts 10 a.m. in the main hall
- guest of honour: the Provincial Education Director
- form teachers: check that prize-winners are present and in full uniform by 9.30 a.m.
- Heads of Department: submit names of prize-winners to the office by Friday 9 October
- duties: Science department (sound system); Home Economics (refreshments); Art department (decoration of hall)
- staff meeting to finalise arrangements: Monday 19 October, 2 p.m.`, `**Plan:**
- **MEMORANDUM**; Nyanga High School.
- To: All teaching staff; From: Mr A. Nyamuzihwa, Deputy Head; Date: 1 October 2026; Subject: Speech and Prize-Giving Day, Friday 23 October.
- Purpose sentence: arrangements for the day, which begins at 10 a.m. in the main hall, with the Provincial Education Director as guest of honour.
- Numbered points: (1) Heads of Department submit prize-winners' names to the office by Friday 9 October; (2) form teachers ensure prize-winners are present and in full uniform by 9.30 a.m.; (3) departmental duties: Science (sound system), Home Economics (refreshments), Art (decoration of the hall).
- Action required: attend the staff meeting on Monday 19 October at 2 p.m. to finalise arrangements.
- Initials.

**Opening (after the heading block):** This memo sets out the arrangements for our Speech and Prize-Giving Day, which will be held on Friday 23 October, starting at 10 a.m. in the main hall. The guest of honour will be the Provincial Education Director.`);

  // 9. Formal letter to the editor from notes (plan + opening).
  zim("formal-letter", `Write a **letter to the editor** of a local newspaper about the dangerous condition of the footbridge over the river near your village, which learners use every day. Use these notes:

- wooden planks rotten; two planks missing; handrail broken on one side
- about 180 learners and many villagers cross daily
- during the rains the river floods; a learner nearly fell last week
- appeal to the Rural District Council and well-wishers; the community will provide labour
- sign as a concerned resident`, `**Plan:**
- Layout: your address (village, ward, district) and date; The Editor, name and address of the newspaper; Dear Sir/Madam (or Dear Editor); **RE: DANGEROUS FOOTBRIDGE AT [VILLAGE NAME]**.
- Paragraph 1: draw readers' attention to the danger.
- Paragraph 2: condition of the bridge: rotten planks, two missing, handrail broken on one side.
- Paragraph 3: who uses it: about 180 learners and many villagers daily.
- Paragraph 4: the rainy season: floods; a learner nearly fell last week.
- Paragraph 5: appeal to the Rural District Council and well-wishers for materials; the community will provide labour.
- Yours faithfully; signature; name, *Concerned resident*.

**Opening paragraph:** I wish to draw the attention of your readers, and of the Rural District Council, to the dangerous condition of the footbridge over the river near our village. Every school day, about a hundred and eighty learners cross this bridge, and every day they are taking a risk that no child should have to take.`);
});
