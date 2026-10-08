// Slice EWR2: curriculum vitae and forms.
import { concept } from "../lib.mjs";

const br = (...l) => l.join("\\\n");

concept("eng.functional.cv-forms", { file: "functional/cv-forms", keyPrefix: "functional.cv-forms" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **referee** on a CV?",
    options: [
      ["A responsible adult who can describe your character and abilities", "Correct: a referee vouches for you, for example a teacher or employer."],
      ["The person who checks the spelling of your CV before you send it", "Proofreading is useful, but that is not what a referee is."],
      ["A relative who lives at the same address as you", "Relatives are not used as referees because they are not independent."],
      ["The official who decides whether you get the job", "That is the employer or selection panel."],
    ],
    answer: "A",
    explanation: "A **referee** is an independent adult (teacher, head, employer, community leader) who agrees to describe your character and abilities.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In the **Education** section of a CV, in what order should schools be listed?",
    options: [
      ["Most recent first", "Correct: readers want your latest and highest level of education first."],
      ["Oldest first, starting with crèche", "Oldest first buries the most relevant information."],
      ["In alphabetical order of school name", "Alphabetical order hides the timeline."],
      ["Only the primary school, with no dates", "Secondary education is most relevant, and dates are needed."],
    ],
    answer: "A",
    explanation: "Education and experience are listed in **reverse chronological order**: the most recent first, with dates.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which entry is the **best** for the Experience section of a CV?",
    options: [
      ["Shop assistant (holiday): served customers and recorded daily sales.", "Correct: specific role and concrete responsibilities."],
      ["I am a very good worker and everyone likes me a lot.", "Vague claims with no evidence; also not in CV style."],
      ["Worked somewhere in town for some time doing stuff.", "Vague and informal; no role, place or duties."],
      ["My hobbies are music, football and chatting with friends.", "Interests belong in a different section."],
    ],
    answer: "A",
    explanation: "CV entries should be specific: role, place, dates and concrete duties, written consistently (*served…*, *recorded…*).",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A form says: *Complete in BLOCK CAPITALS.* What does this instruction mean?",
    options: [
      ["Write every letter as a separate capital letter", "Correct: block capitals means clear, separate capitals throughout, for example MOYO."],
      ["Use a capital letter only at the start of each word", "That is ordinary capitalisation of names, not block capitals."],
      ["Use joined-up handwriting in dark blue or black ink", "Joined-up writing is the opposite of separate block letters."],
      ["Underline the most important words twice in pencil", "Underlining has nothing to do with block capitals."],
    ],
    answer: "A",
    explanation: "**Block capitals** = clear, separate capital letters: MOYO. Always follow form instructions exactly.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A form asks for *Previous work experience*, but you have none. What should you write?",
    options: [
      ["N/A", "Correct: N/A (not applicable) shows you read the question and it does not apply."],
      ["Nothing; leave the box blank", "A blank box looks as if you missed the question."],
      ["A made-up job to fill the space", "False information on a form is dishonest and can disqualify you."],
      ["Ask me later", "This is not a suitable answer on a form."],
    ],
    answer: "A",
    explanation: "Write **N/A** (not applicable) in sections that do not apply. Never leave required boxes blank or invent information.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Which email address is most suitable for a CV?",
    options: [
      ["t.chiweshe@example.com", "Correct: based on your name, simple and professional."],
      ["coolboy_lovesparties@example.com", "A playful address creates a poor impression with employers."],
      ["chiweshe.is.the.best.ever.123@example.com", "Boastful and too long; not professional."],
      ["dontemailme@example.com", "Unprofessional and contradicts its purpose."],
    ],
    answer: "A",
    hints: ["Imagine an employer reading it.", "Simple is best."],
    explanation: "Use a plain address based on your name. Employers judge every detail of a CV, including contact details.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A form gives the instruction: *Marital status: Single / Married (delete as appropriate)*. What should an unmarried applicant do?",
    options: [
      ["Cross out Married, leaving Single", "Correct: delete as appropriate means cross out the option that does not apply."],
      ["Cross out Single, leaving Married", "This deletes the option that applies, giving the wrong information."],
      ["Circle both options to be safe", "Circling both answers nothing."],
      ["Write Single in the margin and leave both", "This ignores the instruction to delete."],
    ],
    answer: "A",
    hints: ["Delete means cross out.", "Which word is NOT true for this person?"],
    explanation: "**Delete as appropriate**: cross out the option(s) that do not apply, leaving the true one visible.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "True or false? A school leaver's CV should normally fit on one page.",
    answer: true,
    explanation: "True. A concise, one-page CV is easier to read and shows you can select relevant information.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "True or false? Your mother or uncle is a good choice of referee because they know you best.",
    answer: false,
    explanation: "False. Referees must be independent: a teacher, a head, an employer or a community leader.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each detail with the CV section where it belongs.",
    pairs: [
      ["Fluent in English and Ndebele; able to use spreadsheets", "Skills"],
      ["2022 to 2025: Hwange High School, ZIMSEC O-Level", "Education"],
      ["Mr P. Moyo, Head, Hwange High School, 081 000 0000", "Referees"],
      ["Captain of the school volleyball team (2025)", "Achievements and interests"],
    ],
    explanation: "Skills (languages, computer), education (schools with dates), referees (name, position, contact), achievements (posts, prizes).",
  });
  b.fib({
    d: 2,
    stem: "Complete the form correctly. The applicant was born on 3 August 2009. The form says *Date of birth (DD/MM/YYYY)*.",
    template: "Date of birth: {{blank:a}}",
    blanks: [{ id: "a", accepted: ["03/08/2009"], choices: ["03/08/2009", "08/03/2009", "2009/08/03", "3 Aug 09"] }],
    explanation: "DD/MM/YYYY means two-digit day, two-digit month, four-digit year: **03/08/2009**.",
  });

  b.ext({
    d: 3, skill: "CREATION", marks: 12, secs: 1300,
    stem: "Use the details below to compile a **one-page CV** for Rutendo Gwatidzo, who is applying for a learnership as a laboratory assistant.\n\n*Rutendo was born on 22 January 2010. She lives at 8 Fourth Street, Dangamvura, Mutare (phone 071 000 0001; email r.gwatidzo@example.com). She attended Dangamvura Primary School (2016-2022) and Sakubva High School (2023-2026), where she wrote ZIMSEC O-Levels and expects good grades in Combined Science, Biology, Mathematics and English. She was the Science Club secretary in 2026 and helped the lab technician prepare apparatus every Friday in 2025 and 2026. She speaks English and Shona and can use a word processor. She won the Form 3 Science prize. Her Biology teacher, Mr T. Mudzingwa (Sakubva High School, 020 000 0002), and her netball coach, Mrs E. Sithole (Sakubva High School, 020 000 0003), have agreed to be referees. She enjoys netball and reading.*",
    wordLimit: { min: 120, max: 220 },
    points: [
      ["Name heading and complete personal details", 2],
      ["A short, specific profile linked to the learnership", 2],
      ["Education and experience in reverse chronological order with dates", 3],
      ["Skills, achievements and interests under suitable headings", 2],
      ["Two referees with positions and contacts", 1],
      ["Consistent, neat layout and accurate copying of details", 2],
    ],
    hints: ["Which experience is most relevant to a laboratory assistant post?", "Put Sakubva High School before the primary school."],
    modelAnswer: `**RUTENDO GWATIDZO**\n\n**Personal details**\\\n${br("Address: 8 Fourth Street, Dangamvura, Mutare", "Phone: 071 000 0001", "Email: r.gwatidzo@example.com", "Date of birth: 22 January 2010")}\n\n**Profile**\\\nCareful, reliable school leaver with a strong interest in science, seeking a learnership as a laboratory assistant.\n\n**Education**\\\n${br("2023 to 2026: Sakubva High School. ZIMSEC O-Level (results awaited): Combined Science, Biology, Mathematics, English Language.", "2016 to 2022: Dangamvura Primary School.")}\n\n**Experience**\\\n${br("2025 to 2026: Volunteer laboratory helper, Sakubva High School. Prepared apparatus for practical lessons every Friday with the laboratory technician.", "2026: Secretary, Science Club. Recorded minutes and organised meetings.")}\n\n**Skills**\\\n${br("Languages: English and Shona", "Computer: word processing")}\n\n**Achievements and interests**\\\nForm 3 Science prize; netball; reading.\n\n**Referees**\\\n${br("Mr T. Mudzingwa, Biology teacher, Sakubva High School, 020 000 0002", "Mrs E. Sithole, Netball coach, Sakubva High School, 020 000 0003")}`,
    explanation: "The model sorts every detail into its heading, lists the most recent first, highlights the most relevant experience (laboratory helper) and keeps a consistent layout.",
  });
  b.ext({
    d: 2, skill: "APPLICATION", marks: 10, secs: 900,
    stem: "You are registering for a community library card. Copy the headings below and complete the form for yourself (you may invent a realistic address; do not use real phone numbers). Follow every instruction.\n\n*Instructions: Use BLOCK CAPITALS except for the final sentence. Tick ONE box. Delete as appropriate.*\n\n- SURNAME:\n- FIRST NAME(S):\n- DATE OF BIRTH (DD/MM/YYYY):\n- ADDRESS:\n- STATUS: Learner / Adult (delete as appropriate)\n- PREFERRED BRANCH: ☐ Town centre ☐ Township ☐ Mobile library\n- PREVIOUS LIBRARY CARD NUMBER (if any):\n- In not more than 15 words, state why you would like a card:\n- SIGNATURE and DATE:",
    wordLimit: { max: 80 },
    points: [
      ["Block capitals used for every line except the final sentence", 2],
      ["Date in DD/MM/YYYY format", 1],
      ["Correct option deleted and exactly one box ticked", 2],
      ["N/A (or a number) entered for the previous card; no blank boxes", 2],
      ["Final sentence complete, relevant and within 15 words", 2],
      ["Signature and date included", 1],
    ],
    modelAnswer: `${br("SURNAME: DUBE", "FIRST NAME(S): SIPHO TAKUNDA", "DATE OF BIRTH (DD/MM/YYYY): 11/02/2010", "ADDRESS: 14 MAKOKOBA STREET, BULAWAYO", "STATUS: Learner / ~~Adult~~", "PREFERRED BRANCH: ☐ Town centre ☑ Township ☐ Mobile library", "PREVIOUS LIBRARY CARD NUMBER: N/A", "Why you would like a card: I want to borrow revision guides and novels for my O-Level studies. (14 words)", "SIGNATURE: S. T. Dube   DATE: 05/03/2026")}`,
    explanation: "Forms reward exact compliance: capitals where asked, one box ticked, the inapplicable option deleted, N/A rather than blanks, word limits kept and a signature with a date.",
  });
  b.ext({
    d: 4, skill: "CREATION", marks: 16, secs: 1800,
    stem: "Compile a **CV** for yourself (or for a realistic fictional school leaver) applying for a **holiday post at a busy pharmacy** in your nearest town, and write a **short covering note** (about 70 words) to go with it. Do not use real phone numbers.",
    wordLimit: { min: 200, max: 300 },
    points: [
      ["All CV headings present and correctly ordered", 4],
      ["Specific, relevant and honest entries (skills and experience linked to customer service and accuracy)", 4],
      ["Two suitable referees with positions", 2],
      ["Covering note: states the post, highlights one strength, requests an interview, in formal register", 3],
      ["Consistent layout and accurate language", 3],
    ],
    levels: [
      [4, 13, 16, "Complete, relevant, well laid out CV and an effective note; accurate."],
      [3, 9, 12, "Mostly complete and relevant; minor layout or language slips."],
      [2, 5, 8, "Headings missing or entries vague; weak note."],
      [1, 0, 4, "Little sense of a CV."],
    ],
    hints: ["Which of your experiences show reliability and care with details?", "The covering note is a very short formal letter."],
    modelAnswer: "**Plan:**\n- Heading: full name; personal details (address, example phone number, plain email, date of birth).\n- Profile: polite, accurate school leaver interested in health care, seeking holiday work in a pharmacy.\n- Education: current secondary school with O-Level subjects (most recent first); primary school.\n- Experience: e.g. helping at a family tuck shop (handling cash, serving customers); First Aid Club member; prefect duties.\n- Skills: languages; basic computer skills; careful record-keeping.\n- Achievements and interests: e.g. Biology prize, choir.\n- Referees: a Biology teacher and a church or club leader, with positions and contacts.\n\n**Covering note opening:** *Dear Sir/Madam, I wish to apply for the holiday post of shop assistant at your pharmacy. As my attached CV shows, I have experience serving customers and handling cash accurately in a family shop, and I hope to study pharmacy after A-Level.*",
    explanation: "A tailored CV selects details that suit the post (here, accuracy and customer care), and the covering note states the post, highlights one strength and asks for an interview.",
  });

  b.card("DEFINITION", "Curriculum vitae (CV)", "A short, organised summary of a person's details, education, skills, experience and referees.");
  b.card("CONCEPT", "CV headings in order", "Name → personal details → profile → education → skills → experience → achievements and interests → referees.");
  b.card("CONCEPT", "Reverse chronological order", "List education and experience with the most recent first.");
  b.card("DEFINITION", "Referee", "An independent adult (teacher, employer, community leader) who will describe your character; never a relative.");
  b.card("DEFINITION", "N/A", "Not applicable: written in a form section that does not apply to you, instead of leaving it blank.");
  b.card("DEFINITION", "Delete as appropriate", "Cross out the option(s) that do not apply, leaving the true one.");
  b.card("DEFINITION", "Block capitals", "Separate capital letters, LIKE THIS, used on forms for clarity.");
  b.card("CONCEPT", "Golden rule for forms", "Read every instruction first, then follow it exactly (capitals, ticks, date format, word limits, signature).");
});
