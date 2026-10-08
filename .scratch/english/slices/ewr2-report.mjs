// Slice EWR2: reports.
import { concept } from "../lib.mjs";

const br = (...l) => l.join("\\\n");

concept("eng.functional.report", { file: "functional/report", keyPrefix: "functional.report" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which section of a report states **what was investigated and why**?",
    options: [
      ["The introduction (terms of reference)", "Correct: the introduction sets out the purpose and scope of the report."],
      ["The recommendations at the end", "Recommendations suggest actions; they do not state the purpose."],
      ["The findings under sub-headings", "Findings present the facts discovered."],
      ["The signature and the writer's position", "These identify the writer, not the purpose."],
    ],
    answer: "A",
    explanation: "Report order: title → To/From/Date → **introduction (terms of reference)** → procedure → findings → conclusion → recommendations → signature.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Which sentence belongs in the **findings** section of a report on the school library?",
    options: [
      ["Forty of the reference books were found to be damaged or out of date.", "Correct: an objective fact discovered during the investigation."],
      ["It is recommended that new reference books be purchased next term.", "This is a recommendation, which belongs at the end."],
      ["Sadly, our poor library is a disgrace and nobody seems to care.", "Emotional opinion has no place in an objective report."],
      ["This report was requested by the Head at the staff meeting.", "This belongs in the introduction (terms of reference)."],
    ],
    answer: "A",
    explanation: "**Findings** are facts. Keep purpose in the introduction and suggested actions in the recommendations.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which recommendation is written in the **correct style** for a formal report?",
    options: [
      ["It is recommended that a watering roster be drawn up for each class.", "Correct: impersonal, formal and specific."],
      ["I reckon you lot should sort out who waters the trees, honestly.", "Slang and a personal, chatty tone are unsuitable."],
      ["Why don't we all just water the trees whenever we feel like it?", "A rhetorical suggestion suits a friend, not a report."],
      ["Watering the trees is the most important thing in the whole world.", "Exaggerated opinion, not a practical recommendation."],
    ],
    answer: "A",
    explanation: "Recommendations use impersonal formal phrasing: *It is recommended that…*, *The committee should…*, *Consideration should be given to…*.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How is a report **different** from an article?",
    options: [
      ["A report uses headings and ends with recommendations for a specific reader.", "Correct: reports are organised for a decision-maker; articles are for general readers."],
      ["A report always tells events in the order they happened, like a story.", "Reports group facts by topic under headings, not in story order."],
      ["A report is lively and personal, with a catchy headline to attract readers.", "That describes an article."],
      ["A report has no title, but an article must always have a title.", "Both have titles; a report's title states its subject plainly."],
    ],
    answer: "A",
    explanation: "Reports: specific reader, headings, objective style, recommendations. Articles: general readers, headline, flowing paragraphs, lively tone.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "A report finds that *the tuck shop runs out of bread by 10 a.m.* Which recommendation **follows logically** from this finding?",
    options: [
      ["The tuck shop should order more bread or arrange a second delivery.", "Correct: it directly addresses the problem found."],
      ["The school should build a new hall for assemblies and prize-giving.", "This has nothing to do with the bread shortage."],
      ["Learners should be punished for buying bread too early in the day.", "Punishing customers does not solve a supply problem."],
      ["The report should be sent to every parent at the school by email.", "This concerns distribution, not the finding."],
    ],
    answer: "A",
    hints: ["What exactly is the problem?", "A good recommendation solves the problem found."],
    explanation: "Every recommendation should respond to a finding. Check that each one can be traced back to a fact in the report.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why is the **passive voice** (*Twenty learners were interviewed*) common in reports?",
    options: [
      ["It keeps the focus on the facts rather than on the writer.", "Correct: impersonal structures make the report sound objective."],
      ["It makes sentences shorter than the active voice always does.", "Passive sentences are often longer; brevity is not the reason."],
      ["It hides mistakes so the reader cannot check the information.", "Reports aim to be transparent, not to hide information."],
      ["It is the only grammatically correct form in formal writing.", "The active voice is also correct in formal writing."],
    ],
    answer: "A",
    hints: ["Who is the subject of a passive sentence?", "Think about the word objective."],
    explanation: "The passive puts the action or finding first (*It was found that…*, *Seedlings were counted*), which keeps the report impersonal and objective.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "True or false? A report should include a To, From and Date section near the top.",
    answer: true,
    explanation: "True. These lines tell the reader who the report is for, who wrote it (with position) and when.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "True or false? The conclusion of a report is the place to introduce new facts that were not in the findings.",
    answer: false,
    explanation: "False. The conclusion sums up the findings briefly; new facts belong in the findings section.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each sentence with the section of a report where it belongs.",
    pairs: [
      ["This report reviews the Form 4 trip to Great Zimbabwe, as requested by the Head.", "Introduction"],
      ["Members of the club interviewed the bus driver and both teachers.", "Procedure"],
      ["The bus left forty minutes late because of a flat tyre.", "Findings"],
      ["The vehicle should be inspected on the day before any future trip.", "Recommendations"],
    ],
    explanation: "Purpose → introduction; how information was gathered → procedure; facts → findings; actions → recommendations.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct formal phrase for each gap in a report.",
    template: "{{blank:a}} that most learners skip breakfast. It is therefore {{blank:b}} that the school offer porridge before lessons.",
    blanks: [
      { id: "a", accepted: ["It was found"], choices: ["It was found", "I kind of saw", "Guess what, we found", "Shockingly I learnt"] },
      { id: "b", accepted: ["recommended"], choices: ["recommended", "reckoned", "hoped and prayed", "begged"] },
    ],
    explanation: "Report phrases: *It was found that…* for findings, *It is recommended that…* for recommendations.",
  });

  b.ext({
    d: 3, skill: "CREATION", marks: 16, secs: 1900,
    stem: "As Head Boy or Head Girl, you were asked by the Head to investigate why many learners arrive late on Monday mornings. Write a **report** (about 230 words) using these notes:\n\n- survey of 60 late-comers over three Mondays\n- most travel by kombi from Chitungwiza; fewer kombis early on Mondays\n- some help parents at market stalls on Sunday nights\n- first lesson on Mondays is assembly; some think it does not matter\n\nInclude a conclusion and at least three recommendations.",
    wordLimit: { min: 200, max: 250 },
    points: [
      ["Correct format: title, To/From/Date, introduction, findings under headings, conclusion, numbered recommendations, signature", 4],
      ["All four notes used as findings", 4],
      ["At least three practical recommendations, each linked to a finding", 3],
      ["Objective, impersonal, concise style", 2],
      ["Accurate spelling, grammar and punctuation", 3],
    ],
    levels: [
      [4, 13, 16, "Full format; every note used; linked recommendations; objective and accurate."],
      [3, 9, 12, "Format mostly correct; most notes used; generally objective and accurate."],
      [2, 5, 8, "Format weak or notes missing; style sometimes chatty; frequent errors."],
      [1, 0, 4, "Little sense of a report."],
    ],
    hints: ["Turn each note into a finding with its own sub-heading.", "Write one recommendation per problem."],
    modelAnswer: `**Model answer:**\n\n**REPORT ON LATE ARRIVAL ON MONDAY MORNINGS**\n\n${br("**To:** The Head, Seke 1 High School", "**From:** Simbarashe Gore, Head Boy", "**Date:** 20 March 2026")}\n\n**1. Introduction**\\\nAs requested by the Head, this report investigates why many learners arrive late on Monday mornings and suggests how the problem may be reduced.\n\n**2. Procedure**\\\nPrefects recorded and questioned all sixty learners who arrived after 7.15 a.m. on three consecutive Mondays.\n\n**3. Findings**\n\n*3.1 Transport.* Most late-comers travel by kombi from Chitungwiza. They reported that fewer kombis operate early on Monday mornings, so queues at the ranks are long.\n\n*3.2 Family work.* Several learners help their parents at market stalls late on Sunday evenings and find it difficult to wake up early.\n\n*3.3 Attitudes.* Because the first period on Monday is assembly, some learners believe that arriving late does not affect their learning.\n\n**4. Conclusion**\\\nLateness on Mondays is caused mainly by transport difficulties, late Sunday work and the belief that assembly is unimportant.\n\n**5. Recommendations**\n\n1. Learners from Chitungwiza should be encouraged to leave home fifteen minutes earlier on Mondays.\n2. Parents should be informed, through the newsletter, of the effect of late Sunday work.\n3. Assembly should include important notices and recognition of achievements so that it is seen as worthwhile.\n4. Late-comers should be recorded each Monday and the results reviewed after one term.\n\n*S. Gore*\\\nSimbarashe Gore, Head Boy`,
    explanation: "The model turns each note into a finding, keeps facts separate from recommendations and links every recommendation to a cause.",
  });
  b.ext({
    d: 3, skill: "CREATION", marks: 12, secs: 1400,
    stem: "You are the secretary of the Geography Club. Write a short **report** (about 170 words) to your teacher, Mrs Mpofu, on the club's visit to Lake Mutirikwi. Include: purpose of the visit, two things members learnt, one problem during the trip and two recommendations for future trips.",
    wordLimit: { min: 150, max: 180 },
    points: [
      ["Report format with title, To/From/Date and headings", 3],
      ["Purpose, two learning points and one problem stated objectively", 4],
      ["Two recommendations linked to the problem or the learning", 2],
      ["Formal, concise style and accurate language", 3],
    ],
    hints: ["Keep the trip's events out of story order: group them under headings.", "What problem could happen on a lake trip?"],
    modelAnswer: "**Plan:**\n- Title: **REPORT ON THE GEOGRAPHY CLUB VISIT TO LAKE MUTIRIKWI**; To: Mrs Mpofu; From: club secretary; Date.\n- Introduction: purpose: to study how a dam is used for irrigation and fishing (a topic on water resources).\n- Findings: (1) members learnt how the dam supplies water to irrigation canals in the Lowveld; (2) members observed a fishing cooperative and how catches are recorded; (3) problem: the bus arrived at the dam wall late, so the guided talk was cut short.\n- Recommendations: confirm transport times in writing the day before; prepare questions in advance so a shorter talk is still useful.\n\n**Opening:** **1. Introduction.** The purpose of the visit on 12 May was to observe how Lake Mutirikwi is used for irrigation and fishing, a topic in the Form 4 Geography course. Twenty-two members and two teachers took part.",
    explanation: "A short report still needs format, objective findings grouped by topic and recommendations that answer the findings.",
  });
  b.ext({
    d: 4, skill: "CREATION", marks: 16, secs: 1900,
    stem: "The Student Representative Council carried out a survey on the school's library. Use the table to write a **report** (about 230 words) to the Head with findings and recommendations.\n\n| Survey question (120 learners) | Yes | No |\n|---|---|---|\n| Do you use the library at least once a week? | 38 | 82 |\n| Is the library open at times that suit you? | 30 | 90 |\n| Can you find the books you need for your subjects? | 45 | 75 |\n| Would you use a library study area after lessons? | 101 | 19 |",
    wordLimit: { min: 200, max: 250 },
    points: [
      ["Report format with headings and To/From/Date", 3],
      ["All four rows interpreted accurately in words (fractions or numbers, comparisons)", 5],
      ["Recommendations follow logically from the data", 3],
      ["Objective style with no invented data", 2],
      ["Accurate language", 3],
    ],
    levels: [
      [4, 13, 16, "Accurate, well-organised interpretation of all data with logical recommendations."],
      [3, 9, 12, "Most data used accurately; sensible recommendations."],
      [2, 5, 8, "Data partly used or misread; weak recommendations."],
      [1, 0, 4, "Data largely ignored."],
    ],
    hints: ["Describe the data: fewer than a third, most, a large majority.", "What do the opening hours and the study area answers suggest together?"],
    modelAnswer: "**Plan:**\n- Title, To: The Head, From: SRC Secretary, Date.\n- Introduction: SRC survey of 120 learners on library use.\n- Findings: (1) use: only 38 (under a third) visit weekly; (2) opening hours: 90 of 120 (three quarters) say the hours do not suit them; (3) books: 75 (well over half) cannot find what they need; (4) study area: 101 (a large majority) would use one after lessons.\n- Conclusion: low use seems linked to opening times and stock rather than lack of interest, since demand for a study area is high.\n- Recommendations: open until 5 p.m. on weekdays; ask subject teachers for lists of needed books; set up a supervised after-school study area.\n\n**Opening:** **1. Introduction.** In February the Student Representative Council surveyed 120 learners to find out how they use the school library and what would encourage them to use it more. This report presents the findings and makes recommendations.",
    explanation: "Interpreting data means translating numbers into accurate comparisons in words (*three quarters*, *a large majority*) and drawing conclusions that the numbers support.",
  });

  b.card("DEFINITION", "Report", "A formal, factual document for a specific reader, with findings under headings and recommendations.");
  b.card("CONCEPT", "Report layout", "Title → To/From/Date → introduction (terms of reference) → procedure → findings → conclusion → recommendations → signature and position.");
  b.card("DEFINITION", "Terms of reference", "The statement of what the report investigates, for whom and why.");
  b.card("DEFINITION", "Findings", "The facts discovered, stated objectively under headings or numbered points.");
  b.card("CONCEPT", "Golden rule for recommendations", "Each recommendation must answer a finding.");
  b.card("VOCABULARY", "Report phrases", "The purpose of this report is to…; It was found that…; The majority of respondents…; It is recommended that…");
  b.card("CONCEPT", "Report style", "Objective, impersonal (passive voice), concise, formal; no story order, no emotional language.");
  b.card("CONCEPT", "Report versus article", "Report: specific reader, headings, objective, recommendations. Article: general readers, headline, lively paragraphs.");
});
