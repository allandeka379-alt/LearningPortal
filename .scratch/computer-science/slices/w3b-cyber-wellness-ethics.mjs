// Slice w3b: cyber-wellness and computer ethics, Unhu/Ubuntu/Vumunhu (comp.security.cyber-wellness-ethics, ZIMSEC only).
import { concept, P } from "../lib.mjs";

concept("comp.security.cyber-wellness-ethics", { file: "security/cyber-wellness-ethics", keyPrefix: "security.cyber-wellness-ethics" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is meant by **cyber-wellness**?",
    options: [
      ["The well-being of internet users who behave safely, responsibly and respectfully online", "Correct: cyber-wellness is about positive, safe and responsible online behaviour."],
      ["Software that removes viruses and spyware from a computer", "That is anti-malware software, a tool rather than a way of behaving."],
      ["The speed and reliability of a person's internet connection", "Connection quality is a technical matter, not well-being."],
      ["A national law that punishes people who commit crimes such as fraud or hacking using the internet", "Laws deal with crime; cyber-wellness is about personal behaviour and well-being."],
    ],
    answer: "A",
    explanation: "Cyber-wellness is the positive well-being of internet users: protecting yourself, behaving responsibly and respecting others online.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which feature is the best sign that data typed into a website will be **encrypted** while it is sent?",
    options: [
      ["The address begins with https and a padlock is shown", "Correct: HTTPS encrypts data between browser and server."],
      ["The page has many bright adverts and pop-ups", "Pop-ups are, if anything, a warning sign."],
      ["The site promises free prizes to every visitor", "Too-good-to-be-true offers suggest a scam."],
      ["The page loads quickly on a mobile phone", "Speed says nothing about encryption."],
    ],
    answer: "A",
    explanation: "The https prefix and padlock show that the connection is encrypted. They do not prove the site is honest, so other checks are still needed.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of these is an example of **cyber-bullying**?",
    options: [
      ["Repeatedly posting embarrassing edited photos of a classmate in a group chat", "Correct: deliberate, repeated use of technology to hurt someone."],
      ["Blocking a stranger who keeps sending friend requests to a classmate", "Blocking is a sensible safety action, not bullying."],
      ["Disagreeing politely with a friend's opinion in a comment", "Polite disagreement is not intended to hurt."],
      ["Sending a classmate the homework they missed", "This is helpful behaviour."],
    ],
    answer: "A",
    explanation: "Cyber-bullying is the deliberate, often repeated use of digital technology to threaten, embarrass or hurt someone.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Chipo receives threatening messages from an unknown account. What should she do **first**?",
    options: [
      ["Keep screenshots as evidence, block the account and tell a trusted adult", "Correct: keep evidence, block, report and get support."],
      ["Reply with threats of her own so the sender stops", "Retaliating usually makes bullying worse and may itself be bullying."],
      ["Delete all the messages so she never sees them again", "Deleting removes the evidence needed to report the bully."],
      ["Share the messages with the whole class on social media to shame the sender", "Spreading the messages widens the harm and identifies no one."],
    ],
    answer: "A",
    explanation: "The standard advice is: do not reply, keep evidence, block the bully, report to the platform and tell a trusted adult.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Which detail would let a stranger find her in person?"],
    stem: "Rudo is chatting with a new online friend. Which piece of information is it **most** important for her **not** to share?",
    options: [
      ["The name of her school and the time she walks home", "Correct: this lets a stranger locate her physically."],
      ["Her favourite type of music and the singers she follows", "General interests carry little risk."],
      ["The subjects she enjoys at school", "This does not identify where she is."],
      ["The name of a book she is reading", "This reveals almost nothing about her."],
    ],
    answer: "A",
    explanation: "Details that reveal where and when a person can be found (school, address, routine) are the most dangerous to share with someone met online.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    hints: ["Unhu/Ubuntu is about how we treat other people."],
    stem: "Which online action best shows the Unhu/Ubuntu/Vumunhu value of **respect for others**?",
    options: [
      ["Asking a friend's permission before posting a photo of them", "Correct: it respects the friend's privacy and dignity."],
      ["Posting a strong password on a sticky note by the computer", "This is poor security, not a value towards others."],
      ["Downloading a film from an unofficial site to save money", "This is piracy and disrespects the creators' rights."],
      ["Forwarding a rumour quickly so everyone knows", "Spreading rumours can harm a person's reputation."],
    ],
    answer: "A",
    explanation: "Unhu/Ubuntu values respect for others; online, that includes respecting their privacy by asking before sharing their image.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Look at the domain name and what is being asked for."],
    stem: "A message gives the link `http://zimbank-secure-login.xyz` and asks the user to confirm their PIN. Which is the **strongest** reason to treat the site as unsafe?",
    options: [
      ["It asks for a PIN and its domain is not the bank's official one", "Correct: genuine banks never ask for a PIN, and the domain only imitates the bank."],
      ["The address contains the word secure in the middle of it", "Using the word secure proves nothing either way; scammers often use it."],
      ["It is a link sent in a message", "Genuine organisations also send links; the domain and request matter more."],
      ["The address is written in lower-case letters", "Web addresses are normally lower case."],
    ],
    answer: "A",
    explanation: "A request for a PIN plus an imitation domain (and no https) are clear signs of a phishing site.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    hints: ["Think about how long online content lasts."],
    stem: "Tatenda deletes an offensive post an hour after publishing it. Why might it still harm his future job applications?",
    options: [
      ["Others may have copied or screenshotted it, so it stays in his digital footprint", "Correct: deletion does not remove copies made by others."],
      ["Deleted posts are always shown again after one year", "Platforms do not automatically republish deleted posts."],
      ["Employers can see every deleted post on any social media platform when they check applicants", "Employers do not have access to platforms' deleted data."],
      ["Deleting a post within a day is itself a criminal offence", "Deleting your own post is not illegal."],
    ],
    answer: "A",
    explanation: "Content can be screenshotted, shared and archived within minutes, so it can remain part of a person's digital footprint after deletion.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A website with a padlock and https in its address is guaranteed to be honest and safe to buy from.",
    answer: false,
    explanation: "False. HTTPS only shows the connection is encrypted. A scam site can also use HTTPS, so check the domain, contact details and the offer as well.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Cyber-bullying can reach a large audience quickly and can happen at any time of the day.",
    answer: true,
    explanation: "True. Unlike bullying in person, online bullying follows the victim home and can be shared widely in minutes.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each Unhu/Ubuntu value to the online behaviour that shows it.",
    pairs: [
      ["Honesty", "Not pretending to be someone else online"],
      ["Respect", "Using polite language in comments"],
      ["Responsibility", "Checking a story is true before sharing it"],
      ["Care for others", "Supporting a classmate who is being bullied"],
    ],
    explanation: "Honesty: no impersonation. Respect: polite language. Responsibility: checking before sharing. Care: supporting victims.",
  });
  b.match({
    d: 3, skill: "ANALYSIS",
    hints: ["Separate safe signs from warning signs."],
    stem: "Classify each feature of a website.",
    pairs: ["A misspelt version of a bank's name in the address", "A privacy policy and a physical contact address", "A countdown saying your account closes in ten minutes", "A valid certificate shown by a padlock"],
    right: ["Sign of a safe website", "Warning sign of an unsafe website"],
    rightIndex: [1, 0, 1, 0],
    explanation: "Misspelt domains and urgent countdowns are warning signs; a privacy policy, contact address and valid certificate are signs of a genuine site.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "The permanent trail of posts, photos and searches a person leaves online is their digital {{blank:a}}. The shared habits and values of people who spend time online are called cyber {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["footprint"], choices: ["footprint", "signature", "certificate", "profile"] },
      { id: "b", accepted: ["culture"], choices: ["culture", "crime", "security", "wellness"] },
    ],
    explanation: "Digital footprint; cyber culture.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "In a web address, what does the letter **s** at the end of `https` stand for?",
    accepted: ["secure", "secured"],
    wrong: ["safe"],
    explanation: "HTTPS is Hypertext Transfer Protocol Secure: the data is encrypted.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    hints: ["Give two good and two bad effects."],
    stem: "Outline **two** positive and **two** negative impacts of cyber culture on young people.",
    points: [
      "Positive: fast, cheap communication with family and friends",
      "Positive: access to learning resources / online communities / business opportunities",
      "Negative: addiction / too much screen time affecting sleep or schoolwork",
      "Negative: cyber-bullying / false information / loss of privacy / exposure to harmful content",
    ],
    explanation: "Cyber culture has benefits (communication, learning, community) and harms (addiction, bullying, misinformation, privacy loss).",
    modelAnswer: "Young people can talk cheaply to relatives abroad and find learning videos for their subjects. However, many spend so long online that their sleep and homework suffer, and group chats can be used for bullying and spreading rumours.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    hints: ["Who is harmed: the victim, the offender, society?"],
    stem: "A learner shares a private photo of a classmate without permission. Explain **three** effects of this unethical action.",
    points: [
      "Effect on the victim: embarrassment / distress / damage to reputation",
      "Effect on the offender: disciplinary action by the school / possible legal action / damaged reputation",
      "Effect on society or the school: loss of trust / fear of using online platforms / harmful culture spreads",
    ],
    explanation: "Unethical online acts affect the victim, the person who commits them and the wider community.",
    modelAnswer: "The classmate is embarrassed and may become anxious and avoid school. The learner who shared it may be suspended and could face legal action for invading privacy. Other learners lose trust in each other and become afraid to share anything online.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6,
    hints: ["Look at the address and the request for details.", "Advice: do not reply, keep evidence, block, report."],
    stem: "Nyasha, a Form 2 learner in Gweru, receives two messages on her phone.\n\n- Message 1, from an unknown number: *Congratulations! You have won a smartphone. Claim it at* `http://prize-zim.win` *by entering your name, address and mobile money PIN.*\n- Message 2, in a class group chat: an edited photo of Nyasha with an insulting caption, posted by a classmate and already shared several times.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which feature of Message 1 is the clearest sign of a scam?",
        options: [
          ["It asks for a mobile money PIN", "Correct: no genuine organisation asks for a PIN."],
          ["It mentions a smartphone", "Prizes may be genuine; the request for a PIN is the clear sign."],
          ["It is sent as a text message", "Genuine messages also arrive by text."],
          ["It uses the word congratulations", "This alone proves nothing."],
        ],
        answer: "A", explanation: "Requests for PINs or passwords are always a sign of a scam.",
      }),
      P.tf({ label: "(b)", stem: "The link in Message 1 uses an encrypted connection.", answer: false, explanation: "False: it begins with http, not https." }),
      P.manual({
        label: "(c)", marks: 2,
        stem: "State **two** things Nyasha should do about Message 2.",
        points: ["Keep evidence (screenshots) / do not reply or retaliate", "Block or report the classmate / tell a trusted adult or teacher"],
        modelAnswer: "She should take screenshots and not reply, then report it to her class teacher and a parent.",
      }),
      P.manual({
        label: "(d)", marks: 2,
        stem: "Explain how the classmate's behaviour goes against Unhu/Ubuntu/Vumunhu values.",
        points: ["Shows no respect for Nyasha's dignity / humiliates a member of the community", "Is dishonest (an edited photo) / causes harm instead of caring for others"],
        modelAnswer: "Unhu/Ubuntu means treating others with respect and care. Posting an edited, insulting photo humiliates Nyasha and spreads a false image of her, harming her instead of caring for her.",
      }),
    ],
    explanation: "(a) The PIN request. (b) False: http. (c) Keep evidence, block/report, tell an adult.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, marks: 5,
    hints: ["Separate features you can check from the offer itself.", "Who is affected by false information?"],
    stem: "Farai's school is starting a club to promote cyber-wellness.",
    parts: [
      P.match({
        label: "(a)", stem: "Classify each item as a feature of a safe website or a warning sign.",
        pairs: ["Contact details and a privacy policy", "Pop-ups that download files automatically"],
        right: ["Feature of a safe website", "Warning sign"],
        rightIndex: [0, 1],
        explanation: "Contact details and a privacy policy are signs of a genuine site; automatic downloads are a warning sign.",
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "A false story about a cholera outbreak at a school spreads on social media. Explain **three** effects of sharing false information like this.",
        points: [
          "Panic / fear among parents and learners",
          "Damage to the school's reputation / learners kept at home",
          "Loss of trust in genuine health information / real warnings ignored later",
        ],
        modelAnswer: "Parents panic and keep their children at home, so learning is lost. The school's reputation is damaged. When a real health warning is issued later, people may not believe it.",
      }),
    ],
    explanation: "(a) Contact details and privacy policy: safe; automatic downloads: warning sign.",
  });

  b.card("DEFINITION", "Cyber-wellness", "The positive well-being of internet users: behaving safely and responsibly online, protecting yourself and respecting others.");
  b.card("DEFINITION", "Cyber culture", "The shared habits, language, values and behaviour that develop among people who communicate online.");
  b.card("DEFINITION", "Cyber-bullying", "Deliberately and repeatedly using digital technology to threaten, embarrass, exclude or hurt someone.");
  b.card("DEFINITION", "Digital footprint", "The permanent trail of data (posts, photos, comments, searches) a person leaves online.");
  b.card("DEFINITION", "Computer ethics", "Moral principles guiding how people use computers and the internet: honesty, respect for privacy and for others' work.");
  b.card("CONCEPT", "Signs of a safe website", "https and a padlock; correct, official domain; contact details and a privacy policy; professional, up-to-date content.");
  b.card("CONCEPT", "Warning signs of an unsafe website", "http only or certificate warnings; misspelt or imitation domain; too-good-to-be-true offers; urgent demands; requests for PINs or passwords; automatic downloads.");
  b.card("FACT", "What to do about cyber-bullying", "Do not reply; keep evidence (screenshots); block; report to the platform; tell a trusted adult.");
  b.card("CONCEPT", "Unhu/Ubuntu/Vumunhu online", "Respect, honesty, responsibility and care for others: polite language, no impersonation, check before sharing, support victims.");
});
