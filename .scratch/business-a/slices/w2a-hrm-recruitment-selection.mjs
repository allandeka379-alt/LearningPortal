// W2a: hrm.recruitment-selection
import { concept, P, chk, r2, money } from "../lib.mjs";
import { mc } from "../tables/w2a-lib.mjs";

concept("abus.hrm.recruitment-selection", { file: "hrm/recruitment-selection", keyPrefix: "hrm.recruitment-selection" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which document sets out the **duties and responsibilities** of a job?",
    ok: ["Job description", "Correct: it describes the job, not the person."],
    bad: [["Person specification", "This describes the qualities needed in the post holder."], ["Curriculum vitae", "A CV is written by the applicant to describe themselves."], ["Reference", "A reference is a former employer's opinion of the applicant."]],
    explanation: "The job description lists the title, duties, reporting line and conditions; the person specification describes the person wanted.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What is **selection**?",
    ok: ["Choosing the best of the applicants", "Correct: selection follows recruitment."],
    bad: [["Finding people and attracting them to apply", "That describes recruitment, which comes first."], ["Training new staff after they are appointed", "That is induction or training."], ["Dismissing staff who cannot do the job", "That is dismissal, not selection."]],
    explanation: "Recruitment attracts applicants; selection chooses the best of them.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is an **advantage of internal recruitment**?",
    ok: ["It is usually cheaper and quicker", "Correct: no external advertising is needed and the person knows the business."],
    bad: [["It brings in new skills and fresh ideas", "This is an advantage of external recruitment."], ["It gives the widest possible choice of candidates", "Internal recruitment limits the choice to current staff."], ["It never creates another vacancy", "Promoting someone leaves their old job to be filled."]],
    explanation: "Internal recruitment saves advertising and induction costs, and rewards loyal staff.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of the following is normally included in an **employment contract**?",
    ok: ["Pay, hours and the notice period", "Correct: these are standard terms of the job."],
    bad: [["The employer's profit forecast", "A contract states the terms of employment, not the employer's forecasts."], ["The names of other employees' families", "These have no place in a contract."], ["A list of the firm's suppliers", "Suppliers are unrelated to the terms of employment."]],
    explanation: "A contract sets out terms such as job title, pay, hours, holidays and notice.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional hotel in Victoria Falls needs a chef at short notice. Which source of candidates is most likely to give the **quickest** result?",
    ok: ["Promoting the sous-chef already employed", "Correct: the person is known, available and needs little induction."],
    bad: [["Training a school leaver for three years", "A trainee would take years to do the work."], ["Advertising abroad and waiting for work permits", "This is slow and uncertain."], ["Closing the kitchen until a chef is found", "This loses guests and revenue."]],
    hints: ["Think about speed and induction."],
    explanation: "Internal promotion avoids advertising and induction delays.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional haulage company in Beitbridge is appointing a lorry driver. Which selection method would give the **most direct evidence** of the candidate's ability?",
    ok: ["A practical driving test on a public road", "Correct: it measures the skill the job needs."],
    bad: [["Reading the candidate's school report", "A school report says little about driving skill."], ["Asking the candidate's friends for opinions", "Friends' opinions are informal and unreliable."], ["Counting the candidate's years of schooling", "Years of schooling do not show driving ability."]],
    hints: ["Which method tests the actual skill?"],
    explanation: "Where the job depends on a particular skill, a test of that skill is the strongest evidence.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Why can references be a weak guide when selecting a candidate?",
    ok: ["They are usually favourable towards the candidate", "Correct: writers rarely want to harm a former colleague."],
    bad: [["They are written by the candidate", "A reference is written by someone else, such as a former employer."], ["They are always refused by former employers", "Employers usually agree to provide references."], ["They tell the firm the candidate's exact salary", "References do not necessarily state pay."]],
    hints: ["Who writes a reference, and what do they want?"],
    explanation: "References are useful but are usually positive and may not reflect the candidate's present ability.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A fictional school production unit has one vacancy for a skilled bakery supervisor. Which is the best reason to use several selection methods instead of an interview alone?",
    ok: ["Together they are more reliable", "Correct: each method shows something the others cannot."],
    bad: [["Interviews are always inaccurate", "Interviews are useful but not enough alone."], ["More methods cost nothing extra", "More methods take time and money."], ["Candidates dislike a single method", "Dislike of a method is not the reason."]],
    hints: ["What does an interview not show about a baker's skill?"],
    explanation: "Combining a practical test, an interview and references gives a more reliable basis for the decision than any one of them.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A person specification describes the duties of the job and to whom the post holder reports.",
    answer: false,
    explanation: "False. That is the job description. The person specification describes the qualifications, skills and qualities wanted in the post holder.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "Promoting an existing employee to fill a vacancy can create a new vacancy that also has to be filled.",
    answer: true,
    explanation: "True. The promoted person leaves a post that must be filled, internally or externally.",
    hints: ["What happens to the old job?"],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each method to a description.",
    pairs: [["Employment agency", "Finds and often screens candidates for a fee"], ["Online recruitment", "Advertising on websites or social media with wide, low-cost reach"], ["Assessment centre", "A series of tests, tasks and interviews over a day or more"], ["Reference", "A former employer's opinion of a candidate"]],
    explanation: "Each is a method of recruitment or selection with its own purpose.",
  });

  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "{{blank:a}} attracts people to apply for a vacancy, while {{blank:b}} chooses the best candidate from those who apply.",
    blanks: [
      { id: "a", accepted: ["Recruitment"], choices: ["Recruitment", "Selection", "Induction"] },
      { id: "b", accepted: ["selection"], choices: ["recruitment", "selection", "dismissal"] },
    ],
    explanation: "Recruitment comes before selection.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the document that describes the qualifications, skills and personal qualities needed by the person who will do a job.",
    accepted: ["person specification", "personnel specification", "job specification", "person spec", "employee specification"],
    explanation: "The person specification describes the person wanted; the job description describes the job.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "State **one** method of external recruitment.",
    accepted: ["job advertisement", "advertisement", "advertising", "newspaper advertisement", "employment agency", "agency", "online recruitment", "internet", "website", "social media", "word of mouth", "job centre", "recruitment agency", "headhunting", "college visit", "notice board"],
    explanation: "Accept advertisements, employment agencies, online recruitment and word of mouth.",
  });

  const salary = 8500, feePct = 12;
  const fee = r2((salary * feePct) / 100);
  chk(fee, 1020);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: fee, calculator: true, daily: true, wrong: [salary + fee, 1200],
    stem: "A fictional engineering firm in Bulawayo uses an employment agency to fill a post. The agency charges a fee of 12% of the first-year salary, and the salary offered is US\\$8,500. Calculate the agency's fee.",
    hints: ["Take 12% of the salary."],
    explanation: "12% of US\\$8,500 = 8,500 × 0.12 = US\\$1,020. Adding the fee to the salary (9,520) is not what was asked.",
  });
  const adv = 150, interviews = 5, perInterview = 30;
  const inHouse = r2(adv + interviews * perInterview);
  const diff = r2(fee - inHouse);
  chk(inHouse, 300); chk(diff, 720);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: diff, calculator: true, wrong: [inHouse, fee],
    stem: "For the same post the firm could recruit in-house instead. This would cost an advertisement of US\\$150 and five interviews, each costing US\\$30 of manager time. The agency's fee is US\\$1,020. By how much is the agency route more expensive than the in-house route?",
    hints: ["Find the in-house cost first."],
    explanation: "In-house cost = 150 + (5 × 30) = 300. The agency costs 1,020, so it is 1,020 − 300 = US\\$720 more expensive. Giving 300 or 1,020 stops before the comparison.",
    workedSolution: "1. In-house cost = 150 + (5 × 30) = US\\$300.\n2. Agency fee = US\\$1,020.\n3. Difference = 1,020 − 300 = US\\$720.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain the difference between a job description and a person specification.",
    points: ["A job description sets out the duties, responsibilities and conditions of the job", "A person specification sets out the qualifications, skills and qualities wanted in the post holder", "The job description is used to attract applicants and the person specification to shortlist and choose between them"],
    modelAnswer: "A job description sets out the duties, responsibilities and conditions of the job. A person specification sets out the qualifications, skills and qualities wanted in the post holder. The first helps applicants to understand the job; the second is used to shortlist and choose between them.",
    hints: ["One describes the job, the other the person."],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional bakery in Masvingo needs a new sales assistant. Explain **two** advantages of recruiting someone from outside the business.",
    points: ["It gives a wider choice of candidates than promoting a current employee", "Application: the bakery may find someone with sales experience from another shop", "A new person may bring fresh ideas", "Application: a new assistant may suggest new ways to display or promote bread"],
    modelAnswer: "External recruitment gives a wider choice of candidates, so the bakery may find someone with sales experience from another shop. A new person may also bring fresh ideas, such as new ways to display or promote its bread.",
    hints: ["Link each advantage to the bakery."],
    explanation: "Two advantages, each applied.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A fictional private clinic in Harare must appoint a senior nurse. Assess whether it should rely mainly on an interview to select the best candidate.",
    points: ["An interview shows communication, attitude and fit with the team", "A senior nurse also needs clinical skills, which an interview shows only partly", "References and proof of qualifications give evidence of competence and honesty", "A practical test or scenario exercise shows how the candidate would act", "Interviews can be biased by first impressions", "Judgement with a reason: use the interview with references and a practical test"],
    modelAnswer: "An interview shows communication and attitude and how the candidate would fit the team. But a senior nurse also needs clinical skills, which an interview shows only partly, and interviewers can be swayed by first impressions. References and proof of qualifications give evidence of competence and honesty, and a practical scenario would show how the candidate acts. The clinic should therefore use the interview together with references and a practical test.",
    hints: ["What does an interview not show for this post?"],
    explanation: "One point per mark; the judgement needs a reason.",
  });

  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A fictional business: Mupfumi Furniture of Mutare needs a new workshop supervisor. The owner can promote a skilled worker, Tendai, or advertise externally. An advertisement would cost US\\$200 and interviews US\\$40 for each of six candidates. Tendai would need training costing US\\$150, and his old job would also have to be filled.",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: 200 + 6 * 40, wrong: [200, 240], stem: "Calculate the cost of recruiting externally (advertisement and interviews).", explanation: "200 + (6 × 40) = 200 + 240 = US\\$440." }),
      P.mcq({ label: "(b)", marks: 1, stem: "Which of the following is a disadvantage of promoting Tendai?", options: [["His old job also has to be filled", "Correct: promotion creates a new vacancy."], ["He knows nothing about the business", "He is an employee, so he knows the business."], ["The owner will have to advertise first", "Internal promotion does not require external advertising."], ["He can never be trained", "He can be trained."]], answer: "A", explanation: "Internal promotion leaves a gap behind." }),
      P.manual({ label: "(c)", marks: 6, stem: "Evaluate whether Mupfumi Furniture should appoint Tendai or recruit externally.", points: ["Promotion costs less: US\\$150 for training compared with US\\$440", "Tendai already knows the workshop and the staff, so there is less risk", "Promotion rewards loyalty and motivates other workers", "His old job must still be filled, which adds a cost", "External recruitment gives a wider choice and may bring new skills", "Judgement with a reason: appoint Tendai if he meets the person specification, because it is cheaper and lower risk"], modelAnswer: "Promoting Tendai costs less, since training costs US\\$150 against US\\$440 for external recruitment, and he already knows the workshop and the staff, so the risk is lower. Promotion also rewards loyalty and motivates others. However, his old job must be filled, and an external candidate might bring wider skills. If Tendai meets the person specification, he should be appointed because it is cheaper and lower risk.", hints: ["Compare costs and risk, then give a condition."], explanation: "Cost and risk compared; justified choice." }),
    ],
    hints: ["Add the advertisement cost to the total interview cost."],
    explanation: "External recruitment costs US\\$440; promotion costs US\\$150 plus filling his old job.",
  });

  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: "A fictional business: Sunrise Safaris in Victoria Falls has a vacancy for a tour guide. The job description states that the guide leads groups of up to twelve visitors for six hours, reports to the operations manager and works weekends. The person specification asks for a guiding certificate, fluency in English and one other language, first-aid training and a friendly manner. Forty people applied; the shortlist has five.",
    parts: [
      P.match({ label: "(a)", marks: 3, stem: "Classify each item as part of the job description or the person specification.", pairs: [["Leads groups of up to twelve visitors", "Job description"], ["Holds a guiding certificate", "Person specification"], ["Reports to the operations manager", "Job description"]], explanation: "Duties and reporting lines belong to the job; certificates and qualities belong to the person." }),
      P.manual({ label: "(b)", marks: 4, stem: "Analyse two selection methods that Sunrise Safaris could use to choose between the five shortlisted candidates.", points: ["An interview shows English fluency, manner and attitude", "Application: the interviewer can see how friendly and confident the guide is with visitors", "A practical test, such as leading a short walk, shows guiding skill directly", "Application: the company can check how well the candidate explains the site to a group"], modelAnswer: "An interview would show how fluent and friendly the guide is, which matters because the job is dealing with visitors. A practical test, such as leading a short walk, would show guiding skill directly, because the company can see how well the candidate explains the site to a group.", hints: ["For each method say what it shows for this job."], explanation: "Two methods applied to the post." }),
      P.manual({ label: "(c)", marks: 7, stem: "Evaluate how important references and qualifications are in choosing a tour guide compared with how well the candidate performs in a practical test.", points: [["Qualifications show certificated knowledge, which the person specification requires", 1], ["The first-aid training is essential for safety, so it cannot be waived", 2], ["References show reliability, honesty and the record in previous jobs", 1], ["A practical test shows real performance but only on one occasion, and candidates may be nervous", 1], ["A candidate with all the qualifications may still be a poor guide", 1], ["Judgement with a reason: use qualifications to shortlist and the test to decide among those who qualify", 1]], levels: [[3, 6, 7, "Weighs qualifications, references and the test against the needs of the job; a justified judgement"], [2, 3, 5, "Explains the value of two or three methods with some application"], [1, 1, 2, "Lists methods with little judgement"]], modelAnswer: "Qualifications show certificated knowledge, and the first-aid training is essential for safety, so it cannot be waived. References show reliability and past record. But a candidate with every qualification may still be a poor guide, and a practical test shows how the candidate performs with a group, although only on one occasion and nerves can affect it. Sunrise Safaris should use qualifications and references to decide who is eligible and the practical test to choose between those who qualify.", hints: ["Which factors are essential and which help to choose between candidates?"], explanation: "Essential requirements first, then the evidence of performance." }),
    ],
    hints: ["Duties and conditions belong to the job; qualifications and qualities belong to the person."],
    explanation: "Classify the items; the interview and practical test give different evidence; qualifications are essential but performance decides between candidates.",
  });

  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "A fictional business: Dube & Sons Hardware of Gweru has two shops. The owner, Thandeka Dube, wants a manager for a third shop. She has an experienced supervisor, Farai, in the first shop, and an external candidate, Nyasha, who currently manages a larger hardware chain in Harare and asks a higher salary. Thandeka has also noticed that her staff turnover has risen since the last internal promotion went to a friend of the family. The contract she offers must state the pay, hours, duties and notice.",
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Explain two reasons why a written contract of employment is important to Dube & Sons Hardware.", points: ["It sets out pay, hours, duties and notice, so both sides know what is expected", "Application: the new manager and the owner can refer to it if there is a disagreement over hours or pay", "It protects the employer from claims about what was promised", "Application: it records the notice that Nyasha or Farai must give if they leave"], modelAnswer: "A contract sets out pay, hours, duties and notice, so both sides know what is expected, and the owner and the manager can refer to it if they disagree about hours or pay. It also protects the business from claims about what was promised and records the notice the manager must give on leaving.", hints: ["Think about clarity, protection and evidence."], explanation: "Two reasons, each applied." }),
      P.manual({ label: "(b)", marks: 11, stem: "Evaluate whether Thandeka should appoint Farai or Nyasha as manager of the third shop.", points: [["Farai knows the business, the staff and the customers, so risk is lower and induction is shorter", 2], ["Promoting Farai would reward loyalty and motivate other staff", 1], ["His old supervisor post would need to be filled", 1], ["Nyasha has experience of a larger chain and may bring new ideas and methods", 2], ["Her higher salary raises costs and may upset current managers", 1], ["The earlier promotion of a family friend has raised turnover, so a visibly fair process matters for morale", 1], ["Use tests, references and a structured interview for both to reduce the risk of bias", 1], ["Judgement with a reason and condition, for example appoint Farai if he performs well in a test, otherwise Nyasha", 2]], levels: [[3, 8, 11, "Compares both candidates and the consequences for cost, risk and staff morale using the case; considers how to choose fairly; a justified recommendation with a condition"], [2, 4, 7, "Explains the advantages of both candidates with some use of the case; judgement weakly supported"], [1, 1, 3, "Lists features of internal and external recruitment with little application"]], modelAnswer: "Farai knows the business, the staff and the customers, so the risk is lower and the induction is shorter. Promoting him would also reward loyalty and show other staff that they can progress, although his supervisor post would then need to be filled. Nyasha has experience of a larger chain and may bring new ideas, but her higher salary raises costs and may upset current managers. Because turnover has risen since the last promotion went to a friend of the family, Thandeka must show that the choice is fair. She should use the same tests, references and structured interview for both. Farai should be appointed if he performs well in the tests, because he is lower risk and cheaper; otherwise Nyasha would be the better choice.", hints: ["Compare cost, risk, motivation and fairness, then decide with a condition."], explanation: "Weighs internal against external appointment using the case and gives a conditional recommendation." }),
    ],
    hints: ["Note how the earlier promotion affected morale."],
    explanation: "Contract benefits; a structured, fair comparison of an internal and an external candidate.",
  });

  b.card("DEFINITION", "Recruitment", "Finding and attracting suitable candidates to apply for a vacancy.");
  b.card("DEFINITION", "Selection", "Choosing the best candidate from those who have applied.");
  b.card("DEFINITION", "Job description", "The title, main duties, responsibilities, reporting line and conditions of a job.");
  b.card("DEFINITION", "Person specification", "The qualifications, skills, experience and personal qualities needed by the person who will do the job.");
  b.card("FACT", "Internal against external recruitment", "Internal: cheaper, faster, lower risk, motivates staff, but small choice and a new vacancy. External: wider choice and fresh ideas, but costly, slower and riskier.");
  b.card("FACT", "External recruitment methods", "Job advertisements, employment agencies, online recruitment and word of mouth.");
  b.card("FACT", "Selection methods", "CVs and application forms, interviews, references, tests and assessment centres; the best method depends on the post.");
  b.card("FACT", "Contents of an employment contract", "Parties, job title and duties, place of work, pay, hours, holidays, notice, probation, disciplinary and grievance procedures.");
  b.card("FACT", "ZIMSEC detail: job advertisement", "Job title, employer, duties, essential qualifications, pay, how to apply and closing date.", undefined, { applies: ["zimsec"] });
});
